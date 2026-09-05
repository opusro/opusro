# 08 · Copy

Every user-facing string on opus.ro, where it lives, and whether it is yours
yet. The current text was drafted to get the structure standing; it is a
placeholder for your voice, not a proposal for it.

Rewrite in any order. Nothing here needs a developer: each row is a file you
can open, change and see with `npm run dev`.

## How to work on it

```bash
npm run dev          # the full site at :4321, everything visible
npm run build:full   # the full site into dist/, to check it builds
npm run build        # the holding site, which is what the public gets
```

The public site stays the holding page until you say otherwise
(05 · Website §10), so you can rewrite for as long as you like with nothing
half-written in the open.

## The rows

Mark each one done when the words are yours.

### The holding page (live now)

| What | Where | Done |
|---|---|---|
| The descriptor under the mark | `src/config.ts` · `SITE.descriptor` | ☐ |
| The two dictionary entries | `src/config.ts` · `DICTIONARY` | ☐ |
| "on the App Store" | `src/components/Holding.astro` | ☐ |
| The legal line and city | `src/config.ts` · `SITE.legal`, `SITE.city` | ☐ |
| What a link preview says | `src/config.ts` · `SITE.holdingDescription` | ☐ |
| The share card image | `scripts/make-og.mjs`, then `npm run og` | ☐ |

### The homescreen

| What | Where | Done |
|---|---|---|
| Widget labels and one-liners (Story, Support, Work) | `src/components/Homescreen.astro` | ☐ |
| Dock labels | `src/components/Homescreen.astro` | ☐ |
| The 404 page | `src/pages/404.astro` | ☐ |

### The pages

| What | Where | Done |
|---|---|---|
| Story: every paragraph | `src/pages/story.astro` | ☐ |
| In the works: both tools | `src/pages/wip.astro` | ☐ |
| Support: the whole page | `src/pages/support.astro` | ☐ |
| Work: the whole page | `src/pages/work.astro` | ☐ |
| Contact | `src/pages/contact.astro` | ☐ |
| Privacy | `src/pages/privacy.astro` | ☐ |
| Notes index lede | `src/pages/notes/index.astro` | ☐ |

### The tools

Each tool is one Markdown file: the one line, what it is for, the price line
and the plain facts.

| What | Where | Done |
|---|---|---|
| Loop | `src/content/tools/loop.md` | ☐ |
| Chéri | `src/content/tools/cheri.md` | ☐ |

### The notes

Whole pieces, not strings. Rewrite, replace or delete; a note you delete
leaves no trace on the site.

| Note | Where | Done |
|---|---|---|
| How the wheel feels | `src/content/notes/2026/how-the-wheel-feels.md` | ☐ |
| Loop 1.0.2 | `src/content/notes/2026/loop-1-0-2.md` | ☐ |
| Heart rate from any band (draft) | `src/content/notes/2026/heart-rate-from-any-band.md` | ☐ |
| Ten principles (archived, dated) | `src/content/notes/2026/ten-principles.md` | ☐ |

## Two rules the build enforces

Not style advice, mechanisms. `npm run build` fails if either is broken.

- No em dashes anywhere in the output.
- No exclamation marks in a tool's public strings.

Everything else about voice is in 02 · Brand, and that document is a
description of how you write, not a licence for anyone else to write for you.
If a line there does not sound like you, the document is wrong and should
change.
