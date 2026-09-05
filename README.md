# opus.ro

The website of OPUS, a small design studio in Cluj-Napoca, Romania, that makes
tools for people, not for users.

A static Astro site. Client JavaScript only for the homescreen's feel, no
third-party requests except the ones named on `/privacy`, fonts served from
here. Hosted on ird's IPFS infrastructure: a push to `main` builds, pins the
site and points the `opus.ro` IPNS name at it.

## Where things are

| | |
|---|---|
| `docs/` | The brand and system reference. **Start with [`docs/README.md`](docs/README.md).** |
| `src/config.ts` | Identity, the one email, doorways, the support provider, the traffic counter. Change things here and nowhere else. |
| `src/content/tools/` | One Markdown file per tool. `listed: false` builds the page without linking it. |
| `src/content/notes/<year>/` | Notes. Plain Markdown so the whole note travels in the feeds. |
| `src/styles/tokens.css` | Every value the design depends on. |
| `scripts/check-output.mjs` | Runs after every build: no mention of eratic, no em dashes, no unexpected scripts. |
| `_inspiration/` | 2025 synthesis of the founder's notes. History, not law. Not deployed. |

## Publishing a note

Add a file:

```
src/content/notes/2026/<slug>.md
```

```yaml
---
title: Loop is free now
summary: One or two sentences. Required; it is the meta description and the feed text.
pubDate: 2026-09-20
kind: decision        # release | decision | letter | essay
tool: loop            # optional; puts the note on the tool's page
discussUrl: https://www.patreon.com/posts/...   # optional; the comment section
draft: false
---
```

Drafts and future-dated notes show in `npm run dev` and never deploy. Push to
`main` and the workflow publishes. By hand, with the ird CLI signed in:

```bash
npm run build
ird ipfs add ./dist                      # prints the CID
ird ipfs ipns publish opus.ro <cid>      # live within minutes
```

## Commands

```bash
npm install
npm run dev       # local preview at :4321
npm run check     # type-check
npm run build     # build to dist/ and run the output check
npm run og        # regenerate public/og.png after changing the words on it
```

## Two switches in `src/config.ts`

- `COUNTER.enabled`: the cookieless traffic counter. Off until the account
  exists. Turning it on adds the script, its CSP allowance and the sentence on
  `/privacy` together.
- `SUPPORT.provider` and `SUPPORT.url`: the patronage provider behind
  `/support`. Until set, the page offers the email.
