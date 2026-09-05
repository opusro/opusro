# opus.ro

The website of OPUS, a small design studio in Cluj-Napoca, Romania.

A static Astro site, hosted on ird's IPFS infrastructure. No third-party
requests except the ones named on `/privacy`, fonts served from here.

## Two modes

**The public site is the holding page**: the mark, the dictionary, Loop on the
App Store, a contact card. Nothing else is in the build, so nothing else is
findable.

**The full site** (homescreen, story, tools, notes) is written locally and goes
public when the copy is ready. See [`docs/08-copy.md`](docs/08-copy.md) for the
inventory of every string and where it lives.

Working on it locally, start to finish: [`docs/09-local.md`](docs/09-local.md).
While `npm run dev` is running, **http://localhost:4321/map/** lists every
page, tool and note with the file it comes from.

```bash
npm install
npm run dev          # the FULL site at :4321, everything visible, drafts too
npm run dev:lan      # the same, reachable from your phone on the same wifi
npm run build:full   # build the full site into dist/
npm run preview      # look at whatever is in dist/

npm run build        # the HOLDING site, which is what the public gets
npm run dev:holding  # the holding page at :4321

npm run check        # type-check
npm run og           # regenerate the link-preview card after changing its words
```

## Publishing

A push to `main` publishes to opus.ro. Which site it publishes is the
`SITE_MODE` repository variable, `holding` by default. Set it to `full` when
the writing is done, under Settings, Secrets and variables, Actions.

To read a full draft on a real address first, run the workflow by hand from the
Actions tab and publish `full` to `dev.opus.ro`.

By hand, with the ird CLI signed in:

```bash
npm run build:full                       # or npm run build for the holding page
ird ipfs add ./dist                      # prints the CID
ird ipfs ipns publish opus.ro <cid>      # or dev.opus.ro
```

The workflow needs one secret, `IRD_API_KEY`, made with `ird keys create`.

## Where things are

| | |
|---|---|
| `docs/` | The brand and system reference. **Start with [`docs/README.md`](docs/README.md).** |
| `src/config.ts` | Identity, the mode switch, the counter, the support provider. Change things here and nowhere else. |
| `src/components/Holding.astro` | The public holding page. |
| `src/components/Homescreen.astro` | The full site's front door. |
| `src/content/tools/` | One Markdown file per tool. `listed: false` builds a page without linking it. |
| `src/content/notes/<year>/` | Notes. Plain Markdown, so the whole note travels in the feeds. |
| `src/styles/tokens.css` | Every value the design depends on. |
| `scripts/check-output.mjs` | Runs after every build: no mention of eratic, no em dashes, no unexpected scripts. |
| `scripts/prune-holding.mjs` | Reduces a holding build to the one page and refuses to finish if anything else survives. |
| `_inspiration/` | 2025 synthesis of the founder's notes. History, not law. Not deployed. |

## Adding a note

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

Drafts and future-dated notes show in `npm run dev` and never reach a build.
