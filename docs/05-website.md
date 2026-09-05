# 05 · Website

What opus.ro is today, what it becomes, and the words on it.

---

## 1. Audit of the current site (2026-09-05)

The site is a React single-page application (Vite, framer-motion) with a home
screen and a blog route. Last real change: March 2026. What a visitor meets:

**Home.** The OPUS mark with the descriptor "human experience design". On hover
or tap it expands into two dictionary entries (Latin and Romanian). Below, a
macOS-style dock with four icons: Loop, 1st°, Blog, Contact.

**What is wrong with it, concretely**

| Issue | Where | Why it matters |
|---|---|---|
| A tool called "1st°" with a Lorem ipsum description and "Launching soon" | `AppModal.jsx`, `Dock.jsx` | Placeholder text on a live company site; a retired name; a dead end |
| Blog icon disabled, reading "Coming April 2026" | `Dock.jsx` | It is September. A promise, missed, on the front page |
| The blog exists at `/blog` but is unreachable from the home page | `AppRoutes.jsx` | Hidden content; the one post ("Ten Principles") is good and nobody can find it |
| Google Analytics 4 loaded on every page | `index.html` | Contradicts "we make tools for people, not for users" and the tools' privacy stance. Consent mode still makes a request to Google on every load |
| Google Fonts request for Inter | `src/index.css` | Third-party request; CSP would block it |
| Unsplash images in the only post | `ten-principles.mdx` | Third-party requests, stock imagery, against 02 · Brand §4 |
| `og:image` points to `/loopIcon.png`, which does not exist | `index.html` | Every share of opus.ro shows a broken preview |
| Meta keywords include "cynical", "ass.network" | `index.html` | Retired names, indexed |
| Single-page app | whole site | No HTML for crawlers, feeds or link previews without JavaScript; RSS is a hand-edited file that must be kept in sync by hand |
| Two deploy configurations | `netlify.toml` and `.github/workflows/deploy.yml` | Only GitHub Pages is live; the other is confusing dead weight |
| `three`, `@react-three/fiber`, `@react-three/drei` in dependencies | `package.json` | Unused; a heavy download for nothing |
| 3.7 MB video served in a modal | `public/opusloop.mp4` | Fine as an idea, heavy as shipped |
| Email signup wiring in `.env.example` and CI | `VITE_GOOGLE_SCRIPT_URL` | Referenced nowhere in `src/`; dead configuration |
| `README.md` is one line | repo | A repository nobody can be onboarded into |
| The dock | `Dock.jsx`, `DockIcon.jsx` | A charming metaphor that hides everything behind clicks, gives crawlers nothing, has a disabled state on the front page, and spends the motion budget on magnification instead of on the one motion that matters (the dictionary) |

**What is right and must survive**

- The palette and the near-black restraint.
- The brand mark expanding into two dictionary entries. This is the identity.
- The "Ten Principles" post, minus its stock images and with its em dashes
  already gone.
- The thesis line in the meta description: "We make tools for people, not for
  users."
- The rounded-tile treatment for tool marks.

**Verdict.** Patching the SPA is throwaway work. The site is small (one screen,
one post), so rebuilding it on the Astro pattern the owner already runs for
eratic.ro is a one-session job and removes every issue in the table at once.

## 2. Information architecture

```
opus.ro
├── /                 Home: mark, thesis, the tools, latest notes, support line
├── /story            Why OPUS exists, the name, the three circles, how it stays alive, who
├── /loop             Tool page (template, 03 · Products §5)
├── /cheri            Tool page; built, listed: false until the name is cleared
├── /notes            All notes, newest first; filter by tool
│   └── /notes/<slug>
├── /support          Patronage: why, what it funds, what it never buys, how
├── /work             Design work for startups
├── /contact          One email, the doorways
├── /privacy          What this site does and does not do, in plain words
├── /rss.xml, /feed.json
└── /404
```

Redirects from the old site: `/blog` to `/notes`, `/blog/ten-principles` to
`/notes/ten-principles`. GitHub Pages does redirects with a small HTML page per
old path; Astro's `redirects` config generates them.

No header navigation on the home page beyond the mark. Every other page has a
one-line header: mark on the left, "story · tools · notes · support · work"
on the right, all lowercase. Footer everywhere: the legal line, the email,
feeds, privacy.

## 3. Pages

### Home

A doorway, not a destination. Above the fold: the mark with the dictionary
expansion (kept as the signature motion), the thesis line, and one paragraph.
Then the tools as a row of tiles with name, one line, status word. Then the
three latest notes as title and date. Then the support line. Then the footer.

Everything on it is reachable in one scroll on a phone. No dock, no modal.

### Story

Written in 01 · Story; the copy deck below is the page. Sections: the thesis,
the name (dictionary component, full size), where it comes from, the three
circles, how it stays alive, who (one short paragraph: the studio, the founder
by name and role, collaborators by first name where they agree, Cluj-Napoca).

### Tool pages

The template in 03 · Products §5. Generated from the `tools` content collection
so the one line, price, status and links exist once.

### Notes

An index of all notes, newest first, with a kicker for the tool and the kind
(release, decision, letter, essay). Each note is a Markdown file. RSS and JSON
Feed carry the full text. The "Ten Principles" post becomes the first note,
backdated to its original date.

### Support

The value exchange from 04 · System §4 in the site's voice. Provider buttons
sit at the bottom, after the reader knows what they are for. If a provider's
button needs its script, the page says so in one sentence above it, and the
CSP allows exactly that origin on exactly this page.

### Work

What OPUS does for others, for whom, how the approach applies, two or three
pieces with permission, the email. No form. No rate.

### Contact

One address. The two doorways (YouTube, Instagram) as plain links. The legal
line. That is all.

### Privacy

"This site makes no third-party requests, sets no cookies and keeps no
analytics. The one exception is the support page, which loads [provider]'s
button from [origin] so that payments work; that is the only page where your
browser talks to anyone but us. The web server keeps [no access log / a log
kept for N days]." State whichever is true for the host.

## 4. Content model

Two collections, typed with Astro's content schema. Frontmatter is the whole
authoring interface.

### `tools/`

```yaml
---
name: Loop
slug: loop
oneLine: A timer for practice. Set a duration, choose a sound or silence, begin.
circle: you with yourself
status: available            # available | in-the-works | imagined
listed: true                 # false = built, reachable, not linked anywhere
accent: '#7A9B58'
platforms: [iOS 18 and later, watchOS 11 and later]
price: Free with one preset. $4.99 once for as many as you like.
appStoreUrl: https://apps.apple.com/ro/app/loop-meditation-focus/id6756740657
siteUrl: https://opusloop.co
privacyUrl: https://opusloop.co/privacy
helpUrl: https://opusloop.co/support
promises:
  - No account. There is nothing to sign up for.
  - Works offline. The timer, the sounds and your history live on your phone.
  - "$4.99 once for all presets. Nothing recurs."
  - Nothing leaves your phone except anonymous usage counts via TelemetryDeck. No identifiers, no personal data.
  - Your files sync through your own iCloud Drive, not through us.
---

Body: "what it is for", three to five sentences, in Markdown.
```

The schema rejects `status: available` without `appStoreUrl`, and rejects any
frontmatter string containing `!` or an em dash. The vocabulary law becomes a
build failure, which is how eratic enforces its own rules.

### `notes/`

```yaml
---
title: Heart rate from the Health app, not just the Watch
summary: >-
  Mind & Body used to mean Apple Watch. It now means any band that writes to
  Health. What changed and why.
pubDate: 2026-08-10
kind: release                # release | decision | letter | essay
tool: loop                   # optional; filters onto the tool page
draft: false
---

Body in Markdown. Plain `.md` unless a note needs a component, so the whole
note travels in the feed.
```

### Site config

One file, as in eratic's `packages/core/src/config.ts`: identity (OPUS,
`hello@opus.ro`, Opusculum SRL, Cluj-Napoca, since 2026), the doorways, and
the nav order derived from `listed`. Nothing identity-shaped anywhere else.

## 5. Design system

Tokens from 02 · Brand §4 in one `tokens.css`. Components:

- `Dictionary` (word, part of speech, language, meaning; single or stacked)
- `Mark` (the studio O), `ToolTile` (icon tile, name, one line, status)
- `Promise` list, `NoteList`, `Feed` links
- `Base` layout (head with CSP meta, self-hosted fonts, prose styles imported
  once), `Prose` styles scoped under `.prose`

Motion: the dictionary expansion (hover or tap on the mark, reduced-motion
gets a fade), page fades. Nothing else animates.

No client JavaScript except the mark's toggle, and that degrades to showing
both entries when JavaScript is off.

## 6. Technical notes

- Astro static output; `site: 'https://opus.ro'`; `trailingSlash` consistent
  with the old URLs.
- CSP as a `<meta http-equiv>` since GitHub Pages sets no headers:
  `default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self'; frame-ancestors 'none'`,
  extended only on `/support` for the chosen provider.
- Fonts via Fontsource; force small font assets to stay files (the eratic
  `astro.mjs` recipe), or the CSP blocks one subset silently.
- Build step: fail if any output HTML contains `eratic`, an em dash, or
  `!` inside a `<h1>`/`<h2>`/`<p>` of the tools collection. Cheap grep, real
  guarantee.
- Deploy: existing GitHub Pages workflow, `CNAME` kept.
- Remove: `netlify.toml`, `.env.example`, `three`, `@react-three/*`,
  `framer-motion`, `react-router-dom`, `@mdx-js/*`, the GA4 snippet, the
  Google Fonts import, `_inspiration/` (move it to a private notes location or
  keep it out of the deployed tree; it is history and it contains an hourly
  rate and client details that do not belong in a public repository).

## 7. Migration

| Phase | What | Effort |
|---|---|---|
| 1 | Rebuild opus.ro on Astro: tokens, layout, home, story, Loop page, notes with the first note, support (text only until a provider is chosen), work, contact, privacy, feeds, redirects. Remove everything in §6. Deploy to Pages. | One working session |
| 2 | Choose the patronage provider and the letter provider (06 · Decisions). Wire `/support`. Unify the email address across Loop's app and sites. | An afternoon plus one Loop release |
| 3 | Chéri: page from the template with `listed: false`; flip when the name is cleared and there is something to show. App Store listing from the deck. | Half a day, when ready |
| 4 | Fold `loopweb` into this repository as a second Astro site sharing tokens, keeping `opusloop.co`, the web player and the AASA file. | One session; optional; only if maintaining two stacks starts to hurt |
| 5 | Agora, when it is real. | Later |

## 8. Copy deck

Fixed text. Change it here first, then everywhere.

### Studio

- **Thesis:** We make tools for people, not for users.
- **Descriptor:** human experience design
- **Dictionary:** opus, n., Latin: a body of work; a creative composition. ·
  opus, adj., Romanian: opposite; against the grain.
- **Home paragraph:** Most software is designed around a business model, and
  the person is fitted in afterwards. We start from the person and the real
  need, make the tool that serves it completely, and only then ask what honest
  arrangement can keep it alive. Sometimes that is a small price, paid once.
  Sometimes it is nothing. It is never a subscription, and it is never your
  attention sold on.
- **Support line:** OPUS is supported by the people who use what we make. If
  something here is worth something to you, you can help keep it going.
- **Legal line:** OPUS is Opusculum SRL, a small studio in Cluj-Napoca,
  Romania. hello@opus.ro
- **Meta description:** OPUS makes tools for people, not for users. A small
  design studio in Romania making calm, honest software: Loop, and more in the
  works.

### Story page

> **We make tools for people, not for users.**
>
> Most software is designed around a business model, and the person is fitted
> in afterwards. The subscription decides what the app nags you about. The
> engagement target decides what the feed shows you. The growth plan decides
> what you are asked to sign up for. The result is software that is technically
> brilliant and quietly not on your side.
>
> OPUS works the other way round. We start from a person and a real need,
> design the tool that serves it completely, and only then ask what honest
> arrangement can keep it alive. Sometimes that is a small price, paid once.
> Sometimes it is nothing. It is never a subscription, never an account you did
> not need, never your attention sold on.
>
> **The name**
>
> [Dictionary component, full size.]
>
> Both are meant. The work, done the other way round.
>
> **Where it comes from**
>
> For nearly two decades the founder designed mobile products for other
> companies, mostly in the United States and Scandinavia. That was an education
> in how good software is made, and in what it is usually made for. In 2026
> OPUS shipped its first tool of its own, and the studio stopped being a plan.
>
> The tools come from lived need. Loop exists because meditation stopped being
> optional and every app for it was built for someone else's business. The next
> one exists because we are bad at remembering who has our books and good at
> wanting to give people the right thing.
>
> **Three circles**
>
> You with yourself: Loop. Time, sound, silence.
> You with your people: [Chéri]. Friends, and the things between them.
> You with everyone: a third tool, about the city, that is not ready to be
> talked about.
>
> **How it stays alive**
>
> We do not fund the work by building the business model into the tools. So the
> money has to come from somewhere honest.
>
> The tools charge once, or nothing. The price is what it costs to keep a tool
> alive and cared for, and it never recurs.
>
> The studio is supported by the people who find the work valuable. That
> support funds the time to make tools this way. It never buys features or
> influence over how they are made. People who support us get our notes by
> email, early builds to try, a name in the thanks if they want one, and once a
> year a plain account of where the money went.
>
> The studio also designs for a small number of startups that want products
> made this way. That work is on this site as plainly as the tools are.
>
> **Who**
>
> OPUS is Catalin Fertu, a designer with nearly twenty years of mobile work
> behind him, and the people he makes things with. It is Opusculum SRL on
> paper, and a small studio in Cluj-Napoca, Romania, in practice.

### Tools

**Loop**
- One line: A timer for practice. Set a duration, choose a sound or silence, begin.
- What it is for: Loop is for the part of the day that is yours. Meditation,
  prayer, an hour of deep work, a long stretch, sleep. You set a length, pick
  a sound or none, and begin. There is no catalogue, no teacher, no course. If
  you have a recording you love, bring it. If you use Apple Music, play from
  there. The app does one thing and then gets out of the way.
- Price: Free with one preset. $4.99 once for as many as you like. People who
  bought the original paid version keep everything.
- App Store subtitle (keep): Meditation & Focus
- Promises: see §4 frontmatter example.

**Chéri** (held until the name is cleared)
- One line: Friends, and the things between them. Remember what people love,
  keep gift ideas, share your things without keeping score.
- What it is for: Chéri is for tending friendships through things. What someone
  mentioned they love. The idea you had for them in a shop, saved in two taps.
  Which of your books is at whose house, and which of theirs is here. A birthday
  in three weeks, with time to act. It keeps the texture of a friendship
  without ever making it feel like a debt.
- Price: Yours once, €[24]. No subscription, no ads, no tracking. Giftable.
- Promises: No account, no server, nothing leaves your phone. Sharing between
  friends is a file you send through the share sheet. Complete without AI;
  better with it on devices that have it. Everything you put in comes back out
  as plain text you can read without the app.

### Support page

> **Support the studio**
>
> OPUS makes tools without a business model inside them. No subscriptions, no
> ads, no accounts, nothing that sells your attention on. That is the whole
> point, and it means the work has to be paid for some other way.
>
> The tools charge once, or nothing. That covers keeping them alive. It does not
> cover the time to make the next one this way.
>
> That is what your support does. It buys time, and nothing else.
>
> **What it never buys.** Features. Early access to things others will not get.
> A vote on what gets made. The moment supporters get advantages inside a tool,
> the tool has a business model in it again.
>
> **What you get.** Our notes, by email, when there is something to say. Early
> builds to try when a tool is in the works. Your name in the thanks, if you
> want it there. Once a year, a plain account of what came in and what it went
> to.
>
> [Provider buttons, with one sentence above them naming the provider and what
> loads.]
>
> If a tool of ours is already worth something to you, thank you. That is
> enough.

### Work page

> **Work with OPUS**
>
> We design mobile products for a small number of startups that want them made
> the way we make our own: the person first, the model after, native to the
> platform, calm by default, honest about money.
>
> That approach is not for every product. It is for founders who already
> suspect that the standard playbook is what makes software feel like it is
> working against the people using it, and who want to see what the other way
> round looks like.
>
> We have designed and built camera apps, wallets and tools people use every
> day. [Two or three named pieces, with permission.]
>
> Write to hello@opus.ro with what you are making and where it is. We reply to
> everything.

### Contact page

> hello@opus.ro
>
> We read everything and reply to most of it.
>
> Elsewhere: YouTube · Instagram
>
> OPUS is Opusculum SRL, a small studio in Cluj-Napoca, Romania.

### Status words

available · in the works · imagined

### Footer

OPUS is Opusculum SRL, a small studio in Cluj-Napoca, Romania. · hello@opus.ro
· notes: RSS · JSON · privacy
