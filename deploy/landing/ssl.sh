#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
# shellcheck disable=SC1091
source "$SCRIPT_DIR/_common.sh"

usage() {
  cat <<'USAGE'
Usage:
  ./deploy/landing/ssl.sh --server <name> [--apply] [--no-confirm] [--email <addr>]

What it does:
  - Uses certbot nginx plugin to issue/renew certs for:
      - $LANDING_DOMAIN
      - $LANDING_WWW_DOMAIN
  - Enables HTTPS and redirects HTTP -> HTTPS

Prereq:
  DNS must point both domains to this server IP.
USAGE
}

SERVER_NAME=""
APPLY=false
NO_CONFIRM=false
EMAIL="support@gitview.com"

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
    --email)
      EMAIL="$2"
      shift 2
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

if [[ "$APPLY" == "true" ]]; then
  confirm_apply
fi

remote bash -lc "set -euo pipefail
  nginx -t
  certbot --nginx \\
    -d '$LANDING_DOMAIN' \\
    -d '$LANDING_WWW_DOMAIN' \\
    --agree-tos \\
    --email '$EMAIL' \\
    --non-interactive \\
    --redirect
  systemctl reload nginx
  echo 'SSL complete.' >&2
"

