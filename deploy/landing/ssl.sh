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
  - Uses certbot (webroot) to issue/renew certs for:
      - $LANDING_CANONICAL_DOMAIN
      - $LANDING_CANONICAL_WWW_DOMAIN
      - $LANDING_REDIRECT_DOMAIN
      - $LANDING_REDIRECT_WWW_DOMAIN
  - Enables HTTPS
  - Redirects any non-canonical host to https://$LANDING_CANONICAL_DOMAIN
  - Does NOT force http->https on the canonical host (http://$LANDING_CANONICAL_DOMAIN stays on http)

Prereq:
  DNS must point all four domains to this server IP.
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

  mkdir -p /var/www/certbot

  certbot certonly --webroot \\
    -w /var/www/certbot \\
    --cert-name '$LANDING_CANONICAL_DOMAIN' \\
    -d '$LANDING_CANONICAL_DOMAIN' \\
    -d '$LANDING_CANONICAL_WWW_DOMAIN' \\
    -d '$LANDING_REDIRECT_DOMAIN' \\
    -d '$LANDING_REDIRECT_WWW_DOMAIN' \\
    --agree-tos \\
    --email '$EMAIL' \\
    --non-interactive \\
    --keep-until-expiring

  mkdir -p /etc/letsencrypt/renewal-hooks/deploy
  cat > /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh <<'HOOK'
#!/usr/bin/env bash
set -euo pipefail
systemctl reload nginx
HOOK
  chmod +x /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh

  cat > /etc/nginx/sites-available/gitview-landing.conf <<'NGINX'
server {
  listen 80 default_server;
  listen [::]:80 default_server;

  server_name ${LANDING_CANONICAL_DOMAIN} _;

  location ^~ /.well-known/acme-challenge/ {
    root /var/www/certbot;
  }

  location / {
    proxy_pass http://127.0.0.1:${LANDING_PORT};
    proxy_http_version 1.1;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection \"upgrade\";
  }
}

server {
  listen 80;
  listen [::]:80;

  server_name ${LANDING_CANONICAL_WWW_DOMAIN} ${LANDING_REDIRECT_DOMAIN} ${LANDING_REDIRECT_WWW_DOMAIN};

  location ^~ /.well-known/acme-challenge/ {
    root /var/www/certbot;
  }

  location / {
    return 308 https://${LANDING_CANONICAL_DOMAIN}\$request_uri;
  }
}

server {
  listen 443 ssl http2 default_server;
  listen [::]:443 ssl http2 default_server;

  server_name ${LANDING_CANONICAL_DOMAIN} _;

  ssl_certificate /etc/letsencrypt/live/${LANDING_CANONICAL_DOMAIN}/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/${LANDING_CANONICAL_DOMAIN}/privkey.pem;

  ssl_session_timeout 1d;
  ssl_session_cache shared:SSL:10m;
  ssl_session_tickets off;

  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers off;

  resolver 1.1.1.1 8.8.8.8 valid=300s;
  resolver_timeout 5s;

  location ^~ /.well-known/acme-challenge/ {
    root /var/www/certbot;
  }

  location / {
    proxy_pass http://127.0.0.1:${LANDING_PORT};
    proxy_http_version 1.1;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection \"upgrade\";
  }
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;

  server_name ${LANDING_CANONICAL_WWW_DOMAIN} ${LANDING_REDIRECT_DOMAIN} ${LANDING_REDIRECT_WWW_DOMAIN};

  ssl_certificate /etc/letsencrypt/live/${LANDING_CANONICAL_DOMAIN}/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/${LANDING_CANONICAL_DOMAIN}/privkey.pem;

  ssl_session_timeout 1d;
  ssl_session_cache shared:SSL:10m;
  ssl_session_tickets off;

  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers off;

  return 308 https://${LANDING_CANONICAL_DOMAIN}\$request_uri;
}
NGINX

  ln -sf /etc/nginx/sites-available/gitview-landing.conf /etc/nginx/sites-enabled/gitview-landing.conf
  nginx -t
  systemctl reload nginx
  echo 'SSL complete.' >&2
"
