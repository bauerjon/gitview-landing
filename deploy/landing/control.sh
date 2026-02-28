#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
# shellcheck disable=SC1091
source "$SCRIPT_DIR/_common.sh"

usage() {
  cat <<'USAGE'
Usage:
  ./deploy/landing/control.sh --server <name> [--apply] [--no-confirm] <start|stop|restart|status|logs>
USAGE
}

SERVER_NAME=""
APPLY=false
NO_CONFIRM=false

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

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
    -h|--help)
      usage
      exit 0
      ;;
    start|stop|restart|status|logs)
      ACTION="$1"
      shift
      break
      ;;
    *)
      echo "Unknown arg: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ -z "${SERVER_NAME:-}" ]]; then
  echo "Missing --server" >&2
  usage
  exit 1
fi
if [[ -z "${ACTION:-}" ]]; then
  echo "Missing action" >&2
  usage
  exit 1
fi

load_server_config

if [[ "$APPLY" == "true" ]]; then
  confirm_apply
fi

case "$ACTION" in
  start)
    remote systemctl start "$LANDING_SYSTEMD_UNIT"
    ;;
  stop)
    remote systemctl stop "$LANDING_SYSTEMD_UNIT"
    ;;
  restart)
    remote systemctl restart "$LANDING_SYSTEMD_UNIT"
    ;;
  status)
    remote systemctl --no-pager --full status "$LANDING_SYSTEMD_UNIT"
    ;;
  logs)
    remote journalctl --no-pager -u "$LANDING_SYSTEMD_UNIT" -n 200
    ;;
esac

