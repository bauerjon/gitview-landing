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

## GitHub Actions (gitview.ai)

`.github/workflows/deploy-landing.yml` wraps that same `deploy.sh` path. It targets **Hetzner landing only** (`hetzner-landing-1` / `178.156.133.39`). It does not deploy teamster.

- Push to `main`/`master` is a **no-op** until repo variable `LANDING_AUTO_DEPLOY` is `true`.
- `workflow_dispatch` on `main`/`master` is the explicit first-deploy path after secrets are set.
- `workflow_dispatch` on any other ref is refused (does not SSH).

Required GitHub Environment secret (`landing`):

- `LANDING_SSH_PRIVATE_KEY` — private key that can SSH as `root` to `178.156.133.39` (same key local deploys use via `LANDING_SSH_KEY` in `servers/hetzner-landing-1.env`; never commit the key)

Flip it on: after `LANDING_SSH_PRIVATE_KEY` exists, either run Actions → Deploy landing → Run workflow on `main`, or set repo variable `LANDING_AUTO_DEPLOY=true`. Merging this workflow does not live-deploy.

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
