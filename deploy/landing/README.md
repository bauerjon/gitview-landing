# GitView landing deploy (Hetzner)

This repo is a Next.js app intended to serve the marketing site at `gitview.ai`, with `gitview.com` redirecting to it.

The deploy tooling mirrors the safety pattern used in the Teamster repo:

- Default mode is **dry-run** (prints what would run).
- Add `--apply` to actually run.
- `--apply` requires typing the server name unless `--no-confirm`.

## Server configs

Configs live in `deploy/landing/servers/*.env`.

## Bootstrap (fresh box)

Install system dependencies, configure `systemd`, configure `nginx`, and open firewall ports:

```bash
./deploy/landing/bootstrap.sh --server hetzner-landing-1
./deploy/landing/bootstrap.sh --server hetzner-landing-1 --apply
```

This sets up HTTP on port 80 (and makes the site reachable by IP).

## Deploy

```bash
./deploy/landing/deploy.sh --server hetzner-landing-1
./deploy/landing/deploy.sh --server hetzner-landing-1 --apply
```

## SSL (LetsEncrypt)

After DNS is pointing `gitview.ai`, `www.gitview.ai`, `gitview.com`, and `www.gitview.com` at the landing server, run:

```bash
./deploy/landing/ssl.sh --server hetzner-landing-1 --apply
```

## Control

```bash
./deploy/landing/control.sh --server hetzner-landing-1 status
./deploy/landing/control.sh --server hetzner-landing-1 logs

./deploy/landing/control.sh --server hetzner-landing-1 restart --apply
```
