# Deploying opus.ro on the IRD VPS

Push-to-deploy for opus.ro, with GitHub kept only as a code mirror.

```
laptop  --git push vps dev---->  dev.opus.ro   staging
        --git push vps main--->  opus.ro       live
        --git push origin ---->  GitHub        backup only
```

The build runs in a throwaway `node:22-alpine` container on the VPS, publishes
into a timestamped release directory, and flips a relative `current` symlink.
Caddy — the one already serving eratic.ro — serves the symlink. Nothing about
this depends on GitHub Actions.

## Why this also fixes HTTPS

`opus.ro` has no valid certificate today. The cause is not DNS and not this
repo: with GitHub Pages sourced from Actions, the custom domain lives in
**repository settings**, and it was never registered there, so GitHub never
provisioned a certificate while DNS was already sending visitors to GitHub's
IPs. Moving to Caddy sidesteps the setting entirely — Caddy obtains and renews
its own certificate from Let's Encrypt.

If you want the site healthy *right now* without migrating, that is a separate
two-minute fix in the GitHub UI: **Settings → Pages → Custom domain → `opus.ro`
→ Save**, wait for provisioning, then tick **Enforce HTTPS**. If the field is
already filled in, remove it and re-add it to re-trigger issuance. Do one or the
other — running half of each leaves the apex pointed somewhere that is not
serving a certificate.

## What this migration also gets you

`/blog/<slug>` currently 404s on a hard refresh. `netlify.toml` has an SPA
fallback rule, but the site is not on Netlify and GitHub Pages ignores that file.
The Caddy config here does the fallback properly.

---

## Prerequisites

- SSH access to the box as the user that will own deploys (`web` in your
  `~/.ssh/config`).
- That user is in the `docker` group: `sudo usermod -aG docker $USER`, then log
  out and back in.
- The Caddy compose project is up and the container is named `web-caddy`.

---

## Stage 1 — install the pipeline (staging only)

Get the `deploy/` directory onto the box once. Copying it from your laptop is
the method to use — it needs no GitHub credentials on the server, so it keeps
working after the repo goes private:

```sh
scp -rp deploy web:/tmp/opus-deploy
ssh web bash /tmp/opus-deploy/bootstrap.sh
```

`bootstrap.sh` locates its own directory, so it finds `caddy/` and `git/`
alongside it wherever you put them.

`bootstrap.sh` is idempotent. It creates:

| Path | Purpose |
|---|---|
| `/opt/web/git/opus.ro.git` | bare repo you push to, with the `post-receive` hook |
| `/opt/web/sites/opus/` | live release tree + `current` symlink |
| `/opt/web/sites/opus-dev/` | staging release tree + `current` symlink |
| `/opt/web/env/opus.env` | build-time environment (mode 0600) |
| `/opt/web/caddy/etc/conf.d/opus-common.caddy` | shared snippets |
| `/opt/web/caddy/etc/conf.d/opus-dev.caddy` | the `dev.opus.ro` site |

It deliberately does **not** install `opus-live.caddy` yet — see Stage 3.

Then, on your laptop:

```sh
git remote add vps web:/opt/web/git/opus.ro.git
git push vps main:dev          # publish current main to staging
```

## Stage 2 — verify staging

```sh
curl -I https://dev.opus.ro/
curl -I https://dev.opus.ro/blog/ten-principles     # must be 200, not 404
```

Check in a browser that the page renders, the blog list works, and a deep link
survives a hard refresh.

If `dev.opus.ro` does not resolve yet, the IRD delegation has not reached public
resolvers. The A record exists in the IRD zone; the old Cloudflare nameservers
are still cached with a 21600s NS TTL. Caddy retries ACME with backoff on its
own, so the certificate appears by itself once DNS lands — no action needed.

## Stage 3 — repoint the apex (the actual cutover)

Only once staging is confirmed good:

```sh
ird dns set opus.ro @ A 178.104.116.235
```

`ird dns set` replaces **every** value of that name+type, so this single command
retires all four GitHub Pages A records. That is intended.

> **Do not touch the MX record.** `opus.ro` runs Google Workspace. `c@opus.ro` is
> both the primary address and where IRD sends login codes — dropping it locks
> you out of mail *and* of IRD.

Optionally add `www` at the same time:

```sh
ird dns set opus.ro www A 178.104.116.235
```

The apex A TTL is already 300s, so a rollback propagates in about five minutes.

## Stage 4 — enable the live site

```sh
ssh web bash /tmp/opus-deploy/bootstrap.sh --live
```

This installs `opus-live.caddy` (`opus.ro` + `www.opus.ro` → 308 redirect),
validates, and reloads. Then from your laptop:

```sh
git push vps main
```

Verify:

```sh
curl -I https://opus.ro/
curl -I https://www.opus.ro/                        # 308 -> https://opus.ro/
curl -I https://opus.ro/blog/ten-principles         # 200
```

### Why the live config is held back until now

Caddy requests a certificate for every hostname in its config the moment that
config loads. While `opus.ro` still resolves to GitHub, those ACME challenges
are answered by GitHub rather than by this box, so every attempt fails. Beyond
the log noise, that burns Let's Encrypt's failed-validation rate limit and can
lock out issuance exactly when you need it for the real cutover.

## Stage 5 — clean up (only once you are confident)

Keep GitHub Pages deployable as a rollback for a few days first. When ready:

- **make the repository private** — see the ordering constraint below
- disable or delete `.github/workflows/deploy.yml`
- delete `public/CNAME` (and the vestigial `CNAME` at the repo root)
- delete the Cloudflare zone, which is the DNS-level rollback
- consider enabling DNSSEC — `ird dns dnssec opus.ro on` — but **only** after
  the delegation is visible on public resolvers

### Making the repository private

**Do this only after `opus.ro` is confirmed serving from the VPS.** GitHub Pages
on a private repository requires a paid plan; on GitHub Free, Pages is available
for public repositories only, so flipping visibility takes the Pages site down
the moment you save. That is harmless once DNS no longer points at GitHub, and
an outage if you do it first.

Nothing in this pipeline depends on the repository being public — the box is
pushed to directly over SSH and never talks to GitHub.

Two knock-on effects once private:

- **Actions minutes become metered.** They are unlimited for public repositories
  but draw on a monthly quota for private ones. Deleting the Pages workflow
  rather than merely disabling it avoids surprises.
- **`git clone` on the server needs credentials.** Nothing here does that — the
  `scp` in Stage 1 is why — but keep it in mind for any future tooling.

### Rollback

Point the apex back at Pages:

```sh
ird dns set opus.ro @ A 185.199.108.153 185.199.109.153 185.199.110.153 185.199.111.153
```

To roll back only the site content, without DNS, flip the symlink to a previous
release on the box:

```sh
cd /opt/web/sites/opus
ls releases/
ln -sfn releases/<previous> .current.tmp && mv -T .current.tmp current
```

No Caddy reload is needed — see below.

---

## How it works

**Release layout**, matching the convention eratic.ro already uses:

```
/opt/web/sites/opus/
    current -> releases/20260806-081824-48f5399     (relative symlink)
    releases/20260806-081824-48f5399/               (the built dist/)
```

**Atomic publish.** The hook creates the new symlink under a temporary name and
then `mv -T`s it over `current`, which is a `rename(2)` — readers see either the
old release or the new one, never a missing root. A plain `mv` would move the new
link *into* the directory the old one points at.

**No reload on deploy.** `/opt/web/sites` is bind-mounted into the container as a
directory (not a single path), and the symlink target is relative, so a flip is
visible to the running Caddy immediately. Only `conf.d` changes need
`docker exec web-caddy caddy reload --config /etc/caddy/Caddyfile`.

**Failure behaviour.** If the build fails, nothing is published: the previous
release stays live and the hook exits non-zero. Note that `post-receive` runs
*after* refs are updated, so the push itself still succeeds — the bare repo's
branch will point at a commit that was never deployed. Fix and push again.

**Branches.** `main` → `opus`, `dev` → `opus-dev`. Every other ref is ignored, so
you can push feature branches to the box freely.

**Pruning.** The 5 newest releases are kept (`OPUS_KEEP_RELEASES`). The live
release is never pruned, even if it falls outside that window.

### Build-time environment

`/opt/web/env/opus.env` is passed to the build container with `--env-file`.

Format is strict: `KEY=VALUE`, no quotes (docker does **not** strip them), no
spaces around `=`, no trailing comments.

`VITE_GOOGLE_SCRIPT_URL` is carried over from the GitHub Actions workflow, but
note that **nothing in the current source reads it** — the email signup form that
used it was removed in `929d996` ("Redesign home page as single-viewport digital
business card"). The plumbing is kept so the form works if it comes back; an
empty value breaks nothing today. If you restore the form, copy the real value
from the repo's Actions secret of the same name.

### Caching

| Path | `Cache-Control` |
|---|---|
| `/assets/*` | `max-age=31536000, immutable` (Vite fingerprints these) |
| images, video, fonts | `max-age=86400` (stable names, changeable content) |
| `/rss.xml` | `max-age=600` |
| everything else, incl. SPA routes | `max-age=0, must-revalidate` |

The last rule is written as "not the above" rather than matching `*.html` so that
a fallback route like `/blog/ten-principles` is covered regardless of whether
Caddy evaluates header matchers before or after `try_files` rewrites the path. A
stale HTML shell is the one genuinely damaging cache outcome — it keeps
referencing asset hashes that no longer exist after a deploy.

Missing files under `/assets/` return a real 404 rather than falling back to
`index.html`, so a bad asset reference surfaces as a 404 instead of a confusing
MIME-type error.

### Content-Security-Policy

Deliberately **not** set. eratic.ro's `default-src 'self'; script-src 'self'`
would break opus.ro twice: `index.html` loads Google Analytics from
`www.googletagmanager.com`, and it runs an inline `gtag()` block.

If you want one, add to the `opus-hardening` snippet:

```caddy
Content-Security-Policy "default-src 'self'; script-src 'self' https://www.googletagmanager.com 'sha256-<HASH>'; img-src 'self' data: https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com https://script.google.com; style-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'"
```

Compute `<HASH>` from the exact bytes between `<script>` and `</script>` of the
inline block in `index.html`:

```sh
printf '%s' "$INLINE_SCRIPT_BODY" | openssl dgst -sha256 -binary | openssl base64
```

The hash changes whenever that block is edited, and a stale hash silently
disables analytics — which is why this is opt-in rather than shipped by default.
Roll it out with `Content-Security-Policy-Report-Only` first.

### Staging is noindex

`dev.opus.ro` sends `X-Robots-Tag: noindex, nofollow`. To also password-protect
it, generate a hash and uncomment the `basic_auth` block in `opus-dev.caddy`:

```sh
docker exec web-caddy caddy hash-password --plaintext '<password>'
```

---

## Troubleshooting

**`cannot reach the docker daemon`** — the deploy user is not in the `docker`
group, or has not re-logged in since being added.

**`File to import not found: opus-site`** — `opus-common.caddy` is missing from
`conf.d`, or was renamed to something that sorts after the files using it. The
main Caddyfile's `import conf.d/*.caddy` expands alphabetically and Caddy
resolves snippet imports at parse time, so `opus-common` must sort first.

**Caddy will not reload** — validate first; a bad config is rejected and the
running config is left untouched:

```sh
docker exec web-caddy caddy validate --config /etc/caddy/Caddyfile
```

**No certificate for a hostname** — confirm that name resolves to this box.
Caddy cannot complete an ACME challenge for a name that points elsewhere.

**Check what is actually live**

```sh
readlink /opt/web/sites/opus/current
ls -t /opt/web/sites/opus/releases/
```

---

## What was verified, and where

Tested against a real Caddy 2.10.0 binary and the real production build, in a
sandbox — not on the VPS:

- both config stages validate (`caddy validate`)
- `/blog/ten-principles` returns 200 HTML via the SPA fallback
- every `Cache-Control` rule in the table above resolves as documented
- a missing `/assets/*` file returns 404, not a 200 HTML shell
- all five hardening headers are present and `Server` is stripped
- gzip negotiation works
- flipping the `current` symlink is served immediately with no reload
- the hook deploys `main` and `dev` to separate trees, ignores other refs,
  creates relative symlinks, passes `--env-file`/`--user`/the cache volume to
  the container, leaves the live symlink untouched when a build fails, cleans up
  its temp dirs, and prunes to `OPUS_KEEP_RELEASES` without deleting the live
  release

Not verifiable from the sandbox, so confirm these on the box: the real
`node:22-alpine` build (the image registry was unreachable, so the build step
was exercised with the same Node 22 and the real `npm run build`, not in the
container), ACME issuance, and anything DNS-dependent.
