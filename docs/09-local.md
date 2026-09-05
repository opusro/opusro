# 09 · Working on the site locally

How to get the full site running on your Mac, change it, and show me what you
mean. The public site stays the holding page the whole time; nothing you do
here is visible to anyone until you decide otherwise.

---

## Once

```bash
# Node 22 or newer. Check with: node -v
brew install node        # or: nvm install 22 && nvm use 22

git clone https://github.com/opusro/opusro.git
cd opusro
npm install
```

## Every time

```bash
npm run dev
```

The full site is at **http://localhost:4321**. Everything is visible there,
including drafts and the unlisted Chéri page. Save a file and the browser
updates itself; you do not restart anything.

Two more, when you want them:

```bash
npm run dev:lan     # same thing, also reachable from your phone on the same wifi
npm run dev:holding # the holding page, to check what the public currently sees
```

## The map

**http://localhost:4321/map/** lists every page, tool and note with the file
each one comes from, and the shared pieces (identity, tokens, the mark). It
exists only while `npm run dev` is running and is in no build, so it cannot
reach the public site.

Start there. Click into anything, and the map tells you which file to open or
which file to name when you point me at it.

## What to open for what

| To change | Open |
|---|---|
| A page's words | `src/pages/<name>.astro`. The words are plain text between the tags |
| A tool's one line, price, facts | `src/content/tools/loop.md` or `cheri.md` |
| A note, or a new one | `src/content/notes/2026/<slug>.md` |
| The descriptor, the dictionary, the email | `src/config.ts` |
| Colour, type sizes, spacing | `src/styles/tokens.css` |
| How a note reads | `src/styles/prose.css` |

The full inventory, with a checkbox per string, is 08 · Copy.

## Writing a note

Add a file under `src/content/notes/2026/`:

```yaml
---
title: The title as it appears
summary: >-
  One or two sentences. Required. This is the listing blurb and what a feed
  reader shows.
pubDate: 2026-09-20
kind: essay          # release | decision | letter | essay
tool: loop           # optional; puts the note on that tool's page too
draft: true          # visible locally, never published
---

The body, in Markdown. A blank line makes a paragraph. ## makes a heading.
```

Delete a file and the note is gone, with nothing left behind. Set
`draft: false` and give it a date in the past when it is ready.

## Two rules the build enforces

`npm run build` fails, naming the file and line, if the output contains an em
dash or if a tool's public strings contain an exclamation mark. Everything else
about voice is yours.

## Pointing me at things

Any of these is enough, and the more specific the better:

- **A path**: "the story page, second paragraph" or `/notes/2026/how-the-wheel-feels/`.
- **A file**: "src/pages/support.astro, the What you get section".
- **A screenshot** with a scribble on it.
- **A comment on the preview artifact** I publish when you ask for one, then
  tell me here that you left it.

If you have rewritten something and want me to see it in context, either paste
the new text here or commit it on a branch and tell me the branch name.

## Seeing a draft on a real address

When a batch is ready to read away from your laptop:

```bash
npm run build:full
ird ipfs add ./dist                        # prints a CID
ird ipfs ipns publish dev.opus.ro <cid>    # live in a few minutes
```

Or ask me and I will publish it. **dev.opus.ro** is the full site; **opus.ro**
stays the holding page.

## Going public

One switch, when the words are yours: set the repository variable `SITE_MODE`
to `full` (GitHub, Settings, Secrets and variables, Actions), then push. The
next publish is the whole site.

## If something breaks

```bash
npm run check    # type errors, in plain language
rm -rf node_modules/.astro && npm run dev   # clears Astro's content cache
```

A page that will not load after you edited frontmatter is nearly always a
missing required field: every note needs `title`, `summary` and `pubDate`.
