# infra/dev — the whole backend on one small droplet

The cheapest way to run Dhun's backend for development and testers: **one DigitalOcean
droplet, about $12 a month**, running everything in Docker, LiveKit included:

```
Caddy (HTTPS, automatic certificate)
 ├─ https://api-dev.dhunlive.com/v1/…   → api      (REST API)
 ├─ https://api-dev.dhunlive.com/admin  → api      (admin panel)
 ├─ wss://api-dev.dhunlive.com/ws       → gateway  (realtime)
 └─ wss://livekit-dev.dhunlive.com      → livekit  (room signalling)
livekit media: 7881/tcp, 7882/udp, straight to the droplet
worker · Postgres 16 · Valkey (Redis)
```

LiveKit is **self-hosted** here: no minute cap, and it rehearses the production plan
(self-hosted LiveKit, CLAUDE.md decision #5). One vCPU is enough for voice rooms with a
few testers; video rooms with several people publishing want the $24 size.

**This is not production.** The database lives on the droplet's disk with no managed
backups or failover. `NODE_ENV=staging` returns the sign-in code in the API response
(MSG91 is still blocked on DLT), so anyone who can reach it can sign in as any number. Use
it for testers and throwaway data. Production is the Terraform in `infra/envs/`.

## 1 · Create the droplet

DigitalOcean › **Create › Droplets**:

| Setting | Value |
|---|---|
| Region | **Bangalore (BLR1)** |
| Image | **Ubuntu 24.04 LTS** |
| Size | **Basic › Regular › $12/mo**: 1 vCPU, 2 GB, 50 GB SSD |
| Authentication | **SSH key** (add your public key). No password |
| Backups | Optional, +20%: weekly snapshots of the whole disk |

If the $12 size feels slow with real testers, resize to **2 vCPU / 4 GB ($24)** from the
dashboard; nothing else changes.

Then **Networking › Firewalls › Create**, attach it to the droplet:
inbound **TCP 22**, **TCP 80**, **TCP 443**, **UDP 443**, and LiveKit's media ports
**TCP 7881** and **UDP 7882**. Nothing else; 7880 (LiveKit signalling) stays closed and is
reached through Caddy. Leaving out 80/443 takes the whole API down.

## 2 · Point the name at it

Cloudflare › dhunlive.com › **DNS › Add record**: two **A** records, `api-dev` and
`livekit-dev`, both the droplet's IP, **Proxy status: DNS only** (grey cloud). Caddy gets its own certificate and needs the
traffic to reach it directly.

## 3 · Prepare the droplet

```bash
ssh root@<droplet-ip>

# Docker
curl -fsSL https://get.docker.com | sh

# 2 GB of swap: building the image on a 2 GB droplet needs it
fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab

# The code (the repo is public)
git clone https://github.com/dhunlive/dhun.git /opt/dhun
cd /opt/dhun/infra/dev
```

## 4 · Fill in the two env files

```bash
cp .env.example .env          # hostnames, database passwords, LiveKit keys
cp dev.env.example dev.env    # the backend's environment
openssl rand -hex 24          # twice: the two DB passwords
openssl rand -hex 32          # twice: JWT_SECRET and LIVEKIT_API_SECRET
echo "API$(openssl rand -hex 6)" # LIVEKIT_API_KEY
nano .env
nano dev.env
```

In `dev.env`, replace every `FILL`:
- the two passwords inside `DATABASE_URL` and `MIGRATION_DATABASE_URL`, matching `.env`;
- `JWT_SECRET`.

LiveKit's keys go in `.env` only: compose hands the same values to LiveKit and to the
backend, so they cannot drift apart.

Both files are git-ignored; they never leave the droplet.

## 5 · Start it

```bash
docker compose up -d --build      # first build takes a few minutes
docker compose ps                 # everything "running"; migrate "exited (0)"
curl https://api-dev.dhunlive.com/ready
# {"ok":true,"db":"up","redis":"up",...}
```

The first start creates the database, runs every migration, and applies
`backend/ops/roles.sql`, so the app connects as `dhun_app` and **cannot edit or delete
ledger entries** at the database level.

## 6 · Connect the rest

- **LiveKit webhooks** are already configured: the server posts to
  `https://{API_HOST}/v1/webhooks/livekit`, signed with the same key. Viewer counts and host
  hours come from them.
- **The app**: in `mobile/.env`, or a new `eas.json` profile for this server:
  ```
  EXPO_PUBLIC_API_URL=https://api-dev.dhunlive.com
  EXPO_PUBLIC_GATEWAY_URL=wss://api-dev.dhunlive.com/ws
  ```
- **A staff account** for the admin panel at `https://api-dev.dhunlive.com/admin`:
  ```bash
  docker compose run --rm api staff create --email you@dhunlive.com --name "Your name" --role ops_manager
  ```
  The password is generated and shown once.

## Day to day

| Task | Command (in `/opt/dhun/infra/dev`) |
|---|---|
| Update to the latest code | `git pull && docker compose up -d --build` |
| Logs | `docker compose logs -f api` (or `gateway`, `worker`, `livekit`) |
| Restart one process | `docker compose restart api` |
| Database shell | `docker compose exec postgres psql -U dhun dhun` |
| Back up the database | `docker compose exec -T postgres pg_dump -U dhun dhun \| gzip > dhun-$(date +%F).sql.gz` |
| Stop everything | `docker compose down` (data is kept; `down -v` deletes it) |

Errors also appear in the admin panel under **Events**.

## Tested

The whole stack was brought up locally from these files (2026-11-20): migrations and
grants applied, `/ready` up, a phone sign-in through Caddy, the admin login page, the
WebSocket upgrade on `/ws`, and `dhun_app` refused `UPDATE` on `ledger_entries`.

Deployed to the droplet the same day with self-hosted LiveKit: a `lk load-test` from
outside (2 audio publishers, 1 video, 2 subscribers, 25 s) received every track with 0%
packet loss, and all 15 webhooks reached the API with a 200.
