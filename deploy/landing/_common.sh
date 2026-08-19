#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
REPO_ROOT=$(cd "$SCRIPT_DIR/../.." && pwd)

usage_common_server() {
  echo "  --server <name>   Load config from: $SCRIPT_DIR/servers/<name>.env" >&2
}

die() {
  echo "$*" >&2
  exit 1
}

print_cmd() {
  printf '+'
  local arg
  for arg in "$@"; do
    printf ' %q' "$arg"
  done
  printf '\n'
}

run_cmd() {
  local -r apply="${APPLY:-false}"
  print_cmd "$@"
  if [[ "$apply" == "true" ]]; then
    "$@"
  fi
}

require_tty_or_no_confirm() {
  local -r no_confirm="${NO_CONFIRM:-false}"
  if [[ "$no_confirm" == "true" ]]; then
    return 0
  fi
  if [[ ! -t 0 ]]; then
    die "Refusing to run without a TTY. Re-run with --no-confirm if you really want to apply non-interactively."
  fi
}

confirm_apply() {
  local -r apply="${APPLY:-false}"
  local -r no_confirm="${NO_CONFIRM:-false}"
  local -r server_name="${SERVER_NAME:?SERVER_NAME required}"

  if [[ "$apply" != "true" ]]; then
    return 0
  fi
  if [[ "$no_confirm" == "true" ]]; then
    return 0
  fi

  require_tty_or_no_confirm

  echo "About to make changes on: $server_name ($LANDING_USER@$LANDING_HOST)" >&2
  local response=""
  read -r -p "Type '$server_name' to continue: " response </dev/tty
  if [[ "$response" != "$server_name" ]]; then
    die "Confirmation failed."
  fi
}

validate_safe_token() {
  local -r label="$1"
  local -r value="$2"
  local -r re="$3"
  if [[ ! "$value" =~ $re ]]; then
    die "Invalid $label: $value"
  fi
}

load_server_config() {
  SERVER_NAME="${SERVER_NAME:-}"
  if [[ -z "$SERVER_NAME" ]]; then
    die "Missing --server"
  fi

  local -r server_config="$SCRIPT_DIR/servers/$SERVER_NAME.env"
  if [[ ! -f "$server_config" ]]; then
    die "Server config not found: $server_config"
  fi

  # shellcheck disable=SC1090
  source "$server_config"

  # CI (GitHub Actions) writes a deploy key from secrets and points here.
  # Do not put key material in git; this is a path only.
  if [[ -n "${LANDING_SSH_KEY_FILE:-}" ]]; then
    LANDING_SSH_KEY="$LANDING_SSH_KEY_FILE"
  fi

  : "${LANDING_HOST:?LANDING_HOST is required}"
  : "${LANDING_USER:?LANDING_USER is required}"
  : "${LANDING_SSH_KEY:?LANDING_SSH_KEY is required}"
  : "${LANDING_APP_DIR:?LANDING_APP_DIR is required}"
  : "${LANDING_CANONICAL_DOMAIN:?LANDING_CANONICAL_DOMAIN is required}"
  : "${LANDING_CANONICAL_WWW_DOMAIN:?LANDING_CANONICAL_WWW_DOMAIN is required}"
  : "${LANDING_REDIRECT_DOMAIN:?LANDING_REDIRECT_DOMAIN is required}"
  : "${LANDING_REDIRECT_WWW_DOMAIN:?LANDING_REDIRECT_WWW_DOMAIN is required}"

  validate_safe_token "LANDING_USER" "$LANDING_USER" '^[a-z_][a-z0-9_-]*$'
  validate_safe_token "LANDING_HOST" "$LANDING_HOST" '^[0-9a-zA-Z.:-]+$'
  validate_safe_token "LANDING_APP_DIR" "$LANDING_APP_DIR" '^/[0-9A-Za-z._/-]+$'

  if [[ "${APPLY:-false}" == "true" && ! -r "$LANDING_SSH_KEY" ]]; then
    die "SSH key not readable: $LANDING_SSH_KEY"
  fi

  SSH_OPTIONS=(
    -i "$LANDING_SSH_KEY"
    -o StrictHostKeyChecking=accept-new
    -o ServerAliveInterval=15
    -o ServerAliveCountMax=4
  )
  RSYNC_SSH="ssh ${SSH_OPTIONS[*]}"

  true
}

remote() {
  local -r cmd="$1"
  shift || true
  run_cmd ssh "${SSH_OPTIONS[@]}" "${LANDING_USER}@${LANDING_HOST}" -- "$cmd" "$@"
}
