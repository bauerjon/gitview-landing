#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
# shellcheck disable=SC1091
source "$SCRIPT_DIR/_common.sh"

usage() {
  cat <<'USAGE'
Usage:
  ./deploy/landing/bootstrap.sh --server <name> [--apply] [--no-confirm]

What it does:
  - Installs nginx, certbot, node, and tooling on a fresh box
  - Creates a non-login `gitview` user
  - Creates a systemd service for the Next.js app (port 3001 default)
  - Configures nginx to proxy HTTP (port 80) to the app
  - Opens firewall ports (22/80/443) if ufw is available

Note:
  SSL issuance requires DNS to point to this host. Use ssl.sh after DNS is set.
USAGE
}

SERVER_NAME=""
APPLY=false
NO_CONFIRM=false

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

for cmd in ssh; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    die "$cmd is required"
  fi
done

if [[ "$APPLY" == "true" ]]; then
  confirm_apply
fi

echo "Server: $SERVER_NAME ($LANDING_USER@$LANDING_HOST)" >&2

remote bash -lc "set -euo pipefail
  export DEBIAN_FRONTEND=noninteractive

  if ! command -v apt-get >/dev/null 2>&1; then
    echo 'This bootstrap currently supports Debian/Ubuntu (apt-get).' >&2
    exit 1
  fi

  apt-get update
  apt-get install -y --no-install-recommends \\
    ca-certificates curl gnupg git rsync \\
    nginx \\
    certbot python3-certbot-nginx

  if ! id -u gitview >/dev/null 2>&1; then
    useradd --system --create-home --home-dir /opt/gitview-landing --shell /usr/sbin/nologin gitview
  fi

  mkdir -p '$LANDING_APP_DIR'
  chown -R gitview:gitview /opt/gitview-landing

  # Node.js (20.x) via NodeSource
  if ! command -v node >/dev/null 2>&1; then
    install -d -m 0755 /etc/apt/keyrings
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
    echo 'deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main' > /etc/apt/sources.list.d/nodesource.list
    apt-get update
    apt-get install -y nodejs
  fi

  corepack enable >/dev/null 2>&1 || true

  # systemd unit
  cat > /etc/systemd/system/'$LANDING_SYSTEMD_UNIT' <<UNIT
[Unit]
Description=GitView Landing (Next.js)
After=network.target

[Service]
Type=simple
User=gitview
WorkingDirectory=$LANDING_APP_DIR
Environment=NODE_ENV=production
Environment=PORT=$LANDING_PORT
Environment=HOSTNAME=127.0.0.1
Environment=NEXT_PUBLIC_APP_BASE_URL=$NEXT_PUBLIC_APP_BASE_URL
ExecStart=/usr/bin/env bash -lc 'corepack enable >/dev/null 2>&1 || true; corepack prepare pnpm@10.30.1 --activate >/dev/null 2>&1 || true; pnpm start -p $LANDING_PORT'
Restart=always
RestartSec=2

[Install]
WantedBy=multi-user.target
UNIT

  systemctl daemon-reload
  systemctl enable '$LANDING_SYSTEMD_UNIT' >/dev/null

  # nginx vhost (http only for now; ssl.sh will add certs later)
  mkdir -p /var/www/certbot

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

  server_name ${LANDING_CANONICAL_WWW_DOMAIN};

  location ^~ /.well-known/acme-challenge/ {
    root /var/www/certbot;
  }

  location / {
    return 308 http://${LANDING_CANONICAL_DOMAIN}\$request_uri;
  }
}

server {
  listen 80;
  listen [::]:80;

  server_name ${LANDING_REDIRECT_DOMAIN} ${LANDING_REDIRECT_WWW_DOMAIN};

  location ^~ /.well-known/acme-challenge/ {
    root /var/www/certbot;
  }

  location / {
    return 308 http://${LANDING_CANONICAL_DOMAIN}\$request_uri;
  }
}
NGINX

  rm -f /etc/nginx/sites-enabled/default || true
  ln -sf /etc/nginx/sites-available/gitview-landing.conf /etc/nginx/sites-enabled/gitview-landing.conf

  nginx -t
  systemctl restart nginx

  # firewall (optional)
  if command -v ufw >/dev/null 2>&1; then
    ufw allow OpenSSH || true
    ufw allow 80 || true
    ufw allow 443 || true
    ufw --force enable || true
  fi

  echo 'Bootstrap complete. Deploy the app next via deploy.sh.' >&2
"
