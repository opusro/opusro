#!/usr/bin/env bash
#
# One-time setup of the opus.ro deploy pipeline on the IRD VPS `web`.
# Safe to re-run: it never overwrites the env file or an existing release tree.
#
#   ./deploy/bootstrap.sh          stage 1 — git repo, hooks, staging site
#   ./deploy/bootstrap.sh --live   stage 3 — enable opus.ro + www (AFTER DNS)
#
# Run it as the user that will own deploys. That user must be in the `docker`
# group and must be the one your laptop's SSH key authenticates as.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"

GIT_ROOT="${OPUS_GIT_ROOT:-/opt/web/git}"
SITES_ROOT="${OPUS_SITES_ROOT:-/opt/web/sites}"
ENV_FILE="${OPUS_ENV_FILE:-/opt/web/env/opus.env}"
CADDY_CONF_D="${OPUS_CADDY_CONF_D:-/opt/web/caddy/etc/conf.d}"
CADDY_CONTAINER="${OPUS_CADDY_CONTAINER:-web-caddy}"
NPM_CACHE_VOLUME="${OPUS_NPM_CACHE_VOLUME:-opus-npm-cache}"
NODE_IMAGE="${OPUS_NODE_IMAGE:-node:22-alpine}"

BARE_REPO="$GIT_ROOT/opus.ro.git"

WITH_LIVE=0
[ "${1:-}" = "--live" ] && WITH_LIVE=1

say() { printf '\033[1m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[33mwarning:\033[0m %s\n' "$*" >&2; }
fail() {
	printf '\033[31merror:\033[0m %s\n' "$*" >&2
	exit 1
}

# ---------------------------------------------------------------- preflight --

command -v docker >/dev/null 2>&1 || fail "docker not found in PATH"
docker info >/dev/null 2>&1 ||
	fail "cannot reach the docker daemon — add $(id -un) to the 'docker' group and re-login"
docker inspect "$CADDY_CONTAINER" >/dev/null 2>&1 ||
	fail "container '$CADDY_CONTAINER' not found — is the caddy compose project up?"
[ -d "$CADDY_CONF_D" ] ||
	fail "missing $CADDY_CONF_D — expected the shared conf.d used by eratic.ro"

# ------------------------------------------------------------------- layout --

say "creating directory layout"
mkdir -p "$GIT_ROOT" "$SITES_ROOT/opus/releases" "$SITES_ROOT/opus-dev/releases" \
	"$SITES_ROOT/.tmp" "$(dirname "$ENV_FILE")"

# ------------------------------------------------------- build-time secrets --

if [ -f "$ENV_FILE" ]; then
	say "keeping existing $ENV_FILE"
else
	say "creating $ENV_FILE template"
	cat >"$ENV_FILE" <<'EOF'
# Build-time environment for opus.ro, passed to the build container.
#
# docker --env-file does NOT strip quotes: write VALUE, never "VALUE".
# No spaces around '='. No inline comments after a value.
#
# VITE_GOOGLE_SCRIPT_URL is the Google Apps Script endpoint behind the email
# signup form. It is baked into the bundle at build time — if it is missing or
# wrong the form fails silently. Copy it from the repo's GitHub Actions secret
# of the same name.
VITE_GOOGLE_SCRIPT_URL=
EOF
	chmod 600 "$ENV_FILE"
fi

if ! grep -q '^VITE_GOOGLE_SCRIPT_URL=.\+' "$ENV_FILE"; then
	warn "VITE_GOOGLE_SCRIPT_URL is empty in $ENV_FILE — the signup form will not work until you set it"
fi

# ----------------------------------------------------------------- bare repo --

if [ -d "$BARE_REPO" ]; then
	say "keeping existing bare repo $BARE_REPO"
else
	say "creating bare repo $BARE_REPO"
	git init --bare --initial-branch=main "$BARE_REPO" >/dev/null
fi

say "installing post-receive hook"
install -m 0755 "$HERE/git/post-receive" "$BARE_REPO/hooks/post-receive"

# --------------------------------------------------------------- npm cache --

if docker volume inspect "$NPM_CACHE_VOLUME" >/dev/null 2>&1; then
	say "keeping existing npm cache volume $NPM_CACHE_VOLUME"
else
	say "creating npm cache volume $NPM_CACHE_VOLUME"
	docker volume create "$NPM_CACHE_VOLUME" >/dev/null
fi
# The volume is root-owned on creation; the build container runs as this user.
docker run --rm -v "$NPM_CACHE_VOLUME:/npm-cache" "$NODE_IMAGE" \
	chown -R "$(id -u):$(id -g)" /npm-cache

# ------------------------------------------------------------------- caddy --

say "installing caddy config into $CADDY_CONF_D"
install -m 0644 "$HERE/caddy/opus-common.caddy" "$CADDY_CONF_D/opus-common.caddy"
install -m 0644 "$HERE/caddy/opus-dev.caddy" "$CADDY_CONF_D/opus-dev.caddy"

if [ "$WITH_LIVE" -eq 1 ]; then
	say "installing production site (opus.ro, www.opus.ro)"
	install -m 0644 "$HERE/caddy/opus-live.caddy" "$CADDY_CONF_D/opus-live.caddy"
else
	say "skipping opus-live.caddy — re-run with --live once DNS points here"
fi

say "validating caddy config"
docker exec "$CADDY_CONTAINER" caddy validate --config /etc/caddy/Caddyfile ||
	fail "caddy config is invalid — nothing was reloaded, the running config is untouched"

say "reloading caddy (zero-downtime)"
docker exec "$CADDY_CONTAINER" caddy reload --config /etc/caddy/Caddyfile

# ------------------------------------------------------------------- done ---

cat <<EOF

$(say "bootstrap complete")

  bare repo   $BARE_REPO
  live root   $SITES_ROOT/opus/current
  staging     $SITES_ROOT/opus-dev/current
  env file    $ENV_FILE

On your laptop, add the remote and push staging first:

  git remote add vps web:$BARE_REPO
  git push vps main:dev

Then check https://dev.opus.ro/ — including a hard refresh of a deep link such
as https://dev.opus.ro/blog/ten-principles — before touching production DNS.
EOF
