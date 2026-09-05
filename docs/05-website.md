# 05 · Website

What opus.ro is today, what it becomes, the words on it, and the first batch of
notes.

---

## 1. Audit of the current site (2026-09-05)

The site is a React single-page application (Vite, framer-motion) with a home
screen and a blog route. Last real change: March 2026.

| Issue | Where | Why it matters |
|---|---|---|
| A tool called "1st°" with a Lorem ipsum description and "Launching soon" | `AppModal.jsx`, `Dock.jsx` | Placeholder text on a live company site; a retired name; a dead end |
| Blog icon disabled, reading "Coming April 2026" | `Dock.jsx` | It is September. A promise, missed, on the front page |
| The blog exists at `/blog` but is unreachable from home | `AppRoutes.jsx` | The one post is good and nobody can find it |
| Google Analytics 4 on every page | `index.html` | A Google request on every visit; more than the owner wants, and stated nowhere |
| Google Fonts request; Unsplash images in the post | `index.css`, `ten-principles.mdx` | Third-party requests; stock imagery |
| `og:image` points to a file that does not exist | `index.html` | Every share of opus.ro shows a broken preview |
| Meta keywords include "cynical", "ass.network" | `index.html` | Retired names, indexed |
| Single-page app | whole site | No HTML for crawlers or previews without JavaScript; RSS hand-edited |
| Two deploy configurations; unused `three` and `@react-three/*` dependencies; dead email-signup env var | repo | Confusing weight |
| The dock's content | `Dock.jsx`, `DockIcon.jsx` | A disabled icon on the front page; a modal with placeholder text behind another |

**Keep:** the palette, the near-black restraint, the mark expanding into two
dictionary entries, the thesis line, the rounded tile treatment for tool marks,
the homescreen metaphor itself (owner ruling 2026-09-05, D23), and the Ten
Principles post as an archived essay (see §9).

**Verdict.** Do not patch the SPA. Rebuild on the Astro pattern the owner
already runs; one session, every line above gone.

## 2. Information architecture

```
opus.ro
├── /                 Home: mark, thesis, the tools, latest notes, support line
├── /story            Why OPUS exists, the name, the three circles, how it stays alive, who
├── /loop             Tool page (template, 03 · Products §5); links to loop.opus.ro (PWA)
├── /cheri            Tool page; listed: false until there is something to show
├── /notes            All notes, newest first; filter by tool
│   └── /notes/<slug>
├── /support          Patronage: why, what it funds, how
├── /work             Design work for startups
├── /contact          One email, the doorways
├── /privacy          What this site does and does not do, in plain words
├── /rss.xml, /feed.json
└── /404
```

Redirects: `/blog` to `/notes`, `/blog/ten-principles` to
`/notes/ten-principles`. Astro's `redirects` config generates the small HTML
pages GitHub Pages needs.

Home has no navigation beyond the mark. Every other page has a one-line
header: mark left, "story · tools · notes · support · work" right, lowercase.
Footer everywhere: legal line, email, feeds, privacy.

## 3. Pages

**Home.** A homescreen (owner ruling 2026-09-05, D23). The front door reads
like the first screen of a phone or a Mac, as the previous site did: the brand
mark where the clock would be, opening into the dictionary on hover, focus or
tap; a grid of widgets; a dock of apps. The default view is simple and clean
and invites exploring; every piece of content is reached through the pattern
people already know for that kind of thing:

- **Notes widget** (wide): the latest note with its date and summary, then the
  next two as one-line rows. Tap: the notes.
- **Story widget** (square): the three circles as rings, the way an activity
  widget shows rings, with "Story" and the thesis beneath. Tap: the story.
- **In the works widget** (square): Chéri and "a third tool, for the city" as
  two quiet rows. Tap: the circles on the story page. Honest about status,
  never a date.
- **Dock:** Loop (and every listed tool), Work, Support, Contact. Tap an app
  and its icon morphs into the header of its page (native cross-document view
  transitions, no script). The dock magnifies under a pointer, as a dock does;
  widgets and icons catch the light where the pointer is, and on a phone the
  light follows the tilt of the device after the first touch.

Nothing on the screen is a dead end: an unlisted tool has no icon, and "in the
works" links to the story rather than to a page that does not exist yet. The
interaction is one small file, `public/home.js`, served from our own origin so
the Content-Security-Policy allows it; without it the screen is still and still
works. The footer below the screen carries the legal line, the email and the
feeds.

**Story.** The copy in §8. Warm, short, no manifesto. The three circles drawn.
"Who" is one paragraph naming C.

**Tool pages.** The template in 03 · Products §5, generated from the `tools`
collection.

**Notes.** Index with a kicker for tool and kind (release, decision, letter,
essay). Each note is a Markdown file; feeds carry full text. Every note ends
with one quiet line: "Talk about this on Patreon" (if chosen) and "Support the
studio", both plain links.

**Support.** The copy in §8. Provider buttons at the bottom, after the reader
knows what they are for. One sentence above them names what loads.

**Work.** Copy in §8. No form. No rate.

**Contact.** One address, two doorways, legal line.

**Privacy.** "This site loads nothing from anyone but us, except two things:
a traffic counter from [Plausible / GoatCounter], which counts visits without
cookies or personal data, and on the support page the button from [provider].
No cookies, no consent banner because there is nothing to consent to."

## 4. Content model

### `tools/`

```yaml
---
name: Loop
slug: loop
oneLine: A timer for practice. Set a duration, choose a sound or silence, begin.
circle: you with yourself
status: available            # available | in-the-works | imagined
listed: true
accent: '#7A9B58'
platforms: [iOS 18 and later, watchOS 11 and later, any browser]
price: Free. Extras are optional.
appStoreUrl: https://apps.apple.com/ro/app/loop-meditation-focus/id6756740657
webUrl: https://loop.opus.ro          # opusloop.co until the move
privacyUrl: /loop/privacy
helpUrl: /loop/help
facts:
  - Free. Extras are optional and never needed.
  - No account. There is nothing to sign up for.
  - Works offline. The timer, the sounds and your history live on your phone.
  - What leaves your phone: anonymous usage counts via TelemetryDeck. No identifiers. Nothing else.
  - Your files sync through your own iCloud Drive, not through us.
---

Body: "what it is for", three to five sentences.
```

The schema rejects `status: available` without `appStoreUrl` or `webUrl`, and
rejects any frontmatter string containing `!` or an em dash.

### `notes/`

```yaml
---
title: Loop is free now
summary: >-
  One or two sentences. Required. Meta description, listing blurb, feed text.
pubDate: 2026-09-20
kind: decision               # release | decision | letter | essay
tool: loop                   # optional
discussUrl: https://www.patreon.com/posts/...   # optional; the comment section
draft: false
---
```

### Site config

One file: identity (OPUS, `hello@opus.ro`, Opusculum SRL, Cluj-Napoca, since
2026), the doorways, the counter's origin, the support provider, and nav order
derived from `listed`.

## 5. Design system

Tokens from 02 · Brand §4 in one `tokens.css`. Components: `Dictionary`,
`Mark`, `ToolTile`, `Facts`, `NoteList`, `Feed` links, `Base` layout (CSP
meta, self-hosted fonts, prose styles imported once). Motion: the dictionary
expansion and page fades. Nothing else.

## 6. Technical notes

- Astro static output, `site: 'https://opus.ro'`.
- CSP as `<meta http-equiv>`: `default-src 'self'; img-src 'self' data:;
  style-src 'self' 'unsafe-inline'; script-src 'self' https://plausible.io;
  connect-src 'self' https://plausible.io; font-src 'self'; frame-ancestors
  'none'` (swap the counter's origin if GoatCounter), extended on `/support`
  for the provider.
- Fonts via Fontsource; force small font assets to stay files.
- Build step: fail if any output HTML contains `eratic`, an em dash, or `!`
  inside the tools collection's rendered text.
- Deploy: existing GitHub Pages workflow, `CNAME` kept.
- Remove: `netlify.toml`, `.env.example`, `three`, `@react-three/*`,
  `framer-motion`, `react-router-dom`, `@mdx-js/*`, the GA4 snippet, the
  Google Fonts import. Move `_inspiration/` out of the tree before the
  repository goes public (it contains an hourly rate and client details).

## 7. Loop's web home (loopweb) after the model change

opusloop.co needs copy and design refreshed for "free plus support", and the
PWA needs a delight pass. Order:

1. **Copy first (phase 2).** Hero: no price, no competitor framing. Something
   like "A timer for practice. Free, on your phone and in your browser." The
   options section drops "$4.99" and says "Free. Extras, if you want them."
   Footer: "Made by OPUS in Romania", linking to opus.ro.
2. **Tokens (phase 2).** Bring the shared palette and type into loopweb's
   Tailwind config so the two sites read as family before they share code.
3. **PWA polish (phase 2, design work).** The web player is the free tool on
   every device. It deserves: the same wheel feel and haptic-like feedback the
   app has where the browser allows, a proper installed-app experience
   (manifest, icons, offline), one-handed controls, the preset carousel, and
   the same honesty about what it stores (local storage only).
4. **Move (phase 3).** PWA to `loop.opus.ro`, page to `opus.ro/loop`,
   redirects, AASA served from all three hosts (04 · System §2).

## 8. Copy deck

Fixed text. Change here first, then everywhere. Warm, factual, no manifesto.

### Studio

- **Thesis:** We make tools for people, not for users.
- **Descriptor:** human experience design
- **Dictionary:** opus, n., Latin: a body of work; a creative composition. ·
  opus, adj., Romanian: opposite; against the grain.
- **Home paragraph:** OPUS is a small studio in Romania. We make a few tools
  for the parts of life that deserve care: your own quiet, your friends, your
  city. Each one is made to be complete, to stay out of the way, and to be
  yours.
- **Support line:** OPUS is supported by the people who use what we make. If
  something here is worth something to you, you can help keep it going.
- **Legal line:** OPUS is Opusculum SRL, a small studio in Cluj-Napoca,
  Romania. hello@opus.ro
- **Meta description:** OPUS is a small design studio in Romania making calm
  tools for people: Loop, a free timer for practice, and more in the works.

### Story page

> **We make tools for people, not for users.**
>
> OPUS is a small studio in Cluj-Napoca. We make a few tools, slowly, for the
> parts of life that deserve care. Each one starts with a real need, gets made
> until it is complete, and is then left to do its job quietly.
>
> **The name**
>
> [Dictionary component, full size.]
>
> Both are meant. The work, done the other way round.
>
> **Three circles**
>
> [The three circles, drawn.]
>
> Loop is for you with yourself: time, sound, silence.
> Chéri is for you with your people: friends, and the things between them.
> A third tool, about the city, is in the works.
>
> **Where it comes from**
>
> For nearly two decades the founder designed mobile products for other
> companies. In 2026 OPUS made its first tool of its own, and the studio stopped
> being a plan. Every tool since has come from something we needed and could
> not find made the way we wanted it.
>
> **How it stays alive**
>
> Loop is free. Chéri is paid for once. Nothing we make asks you for money
> every month, and nothing we make needs an account.
>
> The studio is kept going by the people who find the work valuable, and by
> design work we do for a small number of startups. Part of what we earn goes
> to Make Future, a small lab for the ideas we would like the future built on.
> [This last sentence appears once Make Future is real.]
>
> **Who**
>
> OPUS is C., a designer with nearly twenty years of mobile work behind him,
> and the people he makes things with. It is Opusculum SRL on paper.

### Tools

**Loop**
- One line: A timer for practice. Set a duration, choose a sound or silence, begin.
- What it is for: Loop is for the part of the day that is yours. Meditation,
  prayer, an hour of deep work, a long stretch, sleep. You set a length, pick
  a sound or none, and begin. There is no catalogue, no teacher, no course. If
  you have a recording you love, bring it. If you use Apple Music, play from
  there. It does one thing and then gets out of the way. The hope is that one
  day you will not need it at all.
- Price line: Free. Extras are optional. If you paid for Loop before it was
  free, thank you; everything we add is yours.
- App Store subtitle (keep): Meditation & Focus
- Facts: see §4.

**Chéri**
- One line: Friends, and the things between them. Remember what people love,
  keep gift ideas, share your things without keeping score.
- What it is for: Chéri is for tending friendships through things. What
  someone mentioned they love. The idea you had for them in a shop, saved in
  two taps. Which of your books is at whose house, and which of theirs is here.
  A birthday in three weeks, with time to act. It keeps the texture of a
  friendship without ever making it feel like a ledger.
- Price line: Yours once, €[24]. Give it to someone, if you like.
- Facts: No account, no server; nothing leaves your phone. Sharing between
  friends is a file you send through the share sheet. Complete on its own;
  better with Apple Intelligence on devices that have it. Everything you put in
  comes back out as plain text you can read without the app.

### Support page

> **Support the studio**
>
> Loop is free. Chéri is paid for once. Nothing we make will ever ask you for a
> monthly fee, and that is on purpose.
>
> It also means the studio has to be kept going some other way. That is what
> your support does: it buys the time to make the next tool this carefully, and
> to keep caring for the ones that exist.
>
> **What you get.** Our notes, by email, when there is something to say. Early
> builds to try when a tool is in the works. A place to talk with us about what
> we are making. Your name in the thanks, if you want it there. Once a year, a
> plain account of what came in and what it went to.
>
> **What it does not change.** The tools. Everyone gets the same Loop and the
> same Chéri. Supporting the studio is not a way to get more; it is a way to
> keep this going.
>
> [Provider buttons. One sentence above: "This is where the money goes:
> [Patreon], which loads its button from patreon.com. It is the only page on
> this site that does."]
>
> If one of our tools is already worth something to you, thank you. That is
> enough.

### Work page

> **Work with OPUS**
>
> We design mobile products for a small number of startups, the same way we
> make our own: from the person outwards, native to the platform, calm, and
> honest about money.
>
> It is not the right fit for every product. It is right for founders who want
> the people using their product to feel looked after, and who are willing to
> let that shape the business rather than the other way round.
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
> Elsewhere: YouTube · Instagram · Patreon
>
> OPUS is Opusculum SRL, a small studio in Cluj-Napoca, Romania.

### Status words

available · in the works · imagined

## 9. The first batch of notes

The owner wants the blog back with five to ten posts: some timely, some
evergreen, some about the tools and the work. These are briefs, ranked by how
ready the material is. Every one is written in the studio voice (02 · Brand
§2): first person plural, warm, no manifesto, at most one argument per piece
and made with humility. Each gets a Patreon post for comments and the support
line at the end.

| # | Title (working) | Kind | Timing | Source material | Length |
|---|---|---|---|---|---|
| 1 | **Loop is free now** | decision · loop | Timely, the day the free version ships | The owner's own reasoning: nobody needs a timer app; it should be a gateway to not needing one; what happens for people who paid. Honest about the earlier price. | 500 to 700 words |
| 2 | **Heart rate from any band** | release · loop | Timely, already shipped | `CHANGELOG.md` "Mind & Body heart rate can come from the Health app". Already prose; light edit. | 400 to 600 |
| 3 | **How the wheel feels** | essay · loop | Evergreen | `WheelTuning`, `WheelHaptics.Profile`: velocity-aware detents, the settle. A craft piece with a short recording. Shows care without saying "we care". | 600 to 900 |
| 4 | **Share, with, home** | decision · cheri | Timely near Chéri's release | Chéri PRD §2.4 and design spec §7: three words chosen instead of lend, borrow, due, and what they changed in the app. The principle shown through a design story, never stated as a rule. | 600 to 800 |
| 5 | **Your friends, as a folder of text files** | essay · cheri | Evergreen | Tech spec §6.5, the plain-text mirror. Why an app should hand you back your own data legibly. | 700 to 900 |
| 6 | **What we learned making a camera app for a rangefinder** | essay · work | Evergreen; needs Fjorden's permission | The Fjorden notes. The work page's best proof. | 800 to 1100 |
| 7 | **Made for iOS 27** | release · loop, cheri | Timely, September | Liquid Glass adoption; what changed in Loop's buttons and Chéri's ＋. Short, visual. | 400 to 600 |
| 8 | **The sounds in Loop** | essay · loop | Evergreen | White, pink, brown, dark noise; binaural beats; what each is and when people use them. Useful on its own, links to the free tool. | 700 to 900 |
| 9 | **How we work with a startup** | essay · work | Evergreen | The Work page, expanded: what we ask before saying yes, how a first month goes. Soft; no rate. | 600 to 800 |
| 10 | **A year of notes** (or the first letter) | letter | Quarterly | What got made, what is in the works, what came in and went to. The first one can be short. | 400 to 600 |

**Ten Principles.** The existing post is exactly the kind of explicit
principles list the owner now wants to avoid on the company side. Options:
keep it in the archive under its original date as an essay (it is honest about
its own moment), or retire it. Recommendation: keep, with the stock images
removed and a one-line preface dating it, and do not link it from anywhere
prominent. Owner's call (D17).

Publishing order for phase 1 and 2: 2 and 3 at launch of the new site (the
section opens with two real, un-preachy pieces); 1 when Loop goes free; 7 with
the iOS 27 release; the rest one every two or three weeks as they are ready.
