#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
# shellcheck disable=SC1091
source "$SCRIPT_DIR/_common.sh"

usage() {
  cat <<'USAGE'
Usage:
  ./deploy/landing/deploy.sh --server <name> [--apply] [--no-confirm] [--ref <gitref>] [--local]

What it does:
  - Dry-run by default
  - With --apply:
      1) rsyncs code to the server
      2) runs pnpm install + pnpm build
      3) restarts the systemd unit
USAGE
}

SERVER_NAME=""
APPLY=false
NO_CONFIRM=false
REF="origin/main"
DEPLOY_LOCAL=false
REF_EXPLICIT=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --server)
      SERVER_NAME="$2"
      shift 2
      ;;
    --apply)
      APPLY=true
      shift
      ;;
    --no-confirm)
      NO_CONFIRM=true
      shift
      ;;
    --ref)
      REF="$2"
      REF_EXPLICIT=true
      shift 2
      ;;
    --local)
      DEPLOY_LOCAL=true
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown arg: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ -z "$SERVER_NAME" ]]; then
  echo "Missing --server" >&2
  usage
  exit 1
fi

load_server_config

for cmd in git rsync ssh; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    die "$cmd is required"
  fi
done

cd "$REPO_ROOT"

maybe_fetch_ref() {
  local -r ref="$1"
  if [[ "$ref" =~ ^origin/([^/]+)$ ]]; then
    local -r branch="${BASH_REMATCH[1]}"
    git fetch origin "$branch" >/dev/null 2>&1 || true
  fi
}

resolve_commit() {
  local -r ref="$1"
  git rev-parse --verify "${ref}^{commit}" 2>/dev/null
}

maybe_fetch_ref "$REF"
REF_SHA="$(resolve_commit "$REF" || true)"
if [[ -z "$REF_SHA" && "$REF_EXPLICIT" == "false" && "$REF" == "origin/main" ]]; then
  maybe_fetch_ref "origin/master"
  FALLBACK_SHA="$(resolve_commit origin/master || true)"
  if [[ -n "$FALLBACK_SHA" ]]; then
    if [[ "$APPLY" == "true" ]]; then
      die "Default ref origin/main does not exist on origin. Re-run with --ref origin/master (or create origin/main)."
    fi
    echo "Warning: origin/main not found on origin; using origin/master for this dry-run." >&2
    REF="origin/master"
    REF_SHA="$FALLBACK_SHA"
  fi
fi

if [[ -z "$REF_SHA" ]]; then
  die "Git ref not found: $REF (try --ref origin/master or another valid ref)"
fi

TEMP_DEPLOY_DIR=""
cleanup() {
  if [[ -n "$TEMP_DEPLOY_DIR" ]]; then
    rm -rf "$TEMP_DEPLOY_DIR"
  fi
}
trap cleanup EXIT

if [[ "$DEPLOY_LOCAL" == "true" ]]; then
  DEPLOY_DIR="$REPO_ROOT"
else
  TEMP_DEPLOY_DIR=$(mktemp -d -t gitview-landing-deploy.XXXXXX)
  git archive "$REF" | tar -x -C "$TEMP_DEPLOY_DIR"
  mkdir -p "$TEMP_DEPLOY_DIR/deploy/landing"
  rsync -a "$REPO_ROOT/deploy/landing/" "$TEMP_DEPLOY_DIR/deploy/landing/"
  DEPLOY_DIR="$TEMP_DEPLOY_DIR"
fi

REMOTE="${LANDING_USER}@${LANDING_HOST}:${LANDING_APP_DIR}/"

echo "Server:  $SERVER_NAME ($LANDING_USER@$LANDING_HOST)" >&2
echo "App dir: $LANDING_APP_DIR" >&2
echo "Ref:     $REF ($REF_SHA)" >&2
echo "Mode:    $([[ \"$APPLY\" == \"true\" ]] && echo apply || echo dry-run)" >&2

if [[ "$APPLY" == "true" ]]; then
  confirm_apply
fi

DEFAULT_EXCLUDES=(
  --exclude .git
  --exclude .env
  --exclude .env.*
  --exclude node_modules
  --exclude .next
)

run_cmd rsync -az --delete -e "$RSYNC_SSH" "${DEFAULT_EXCLUDES[@]}" "$DEPLOY_DIR/" "$REMOTE"

remote bash -lc "set -euo pipefail
  cd '$LANDING_APP_DIR'
  corepack enable >/dev/null 2>&1 || true
  if command -v corepack >/dev/null 2>&1; then
    corepack prepare pnpm@9.15.4 --activate >/dev/null 2>&1 || true
  fi
  pnpm install --frozen-lockfile
  pnpm build
  systemctl restart '$LANDING_SYSTEMD_UNIT'
  systemctl --no-pager --full status '$LANDING_SYSTEMD_UNIT' | sed -n '1,20p'
"

