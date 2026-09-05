# 02 · Brand

How OPUS looks, sounds and names things. Everything public (website, App Store,
release notes, social posts, emails to people who write in) follows this.

---

## 1. Names

| Thing | Written as | Notes |
|---|---|---|
| The studio | **OPUS** | Capitals in the wordmark and in running text. Never "Opus" mid-sentence, never "OPUS Studio". |
| The company | Opusculum SRL | Legal lines only: footer, privacy pages, App Store seller name, invoices. Never in copy. |
| The descriptor | human experience design | Lowercase, under the mark. It is a descriptor, not a tagline. The tagline is the thesis (01 · Story). |
| The tools | Loop, Chéri, Agora | Bare names everywhere on opus.ro and in prose. "OPUS Loop" only where a store needs a namespace (the App Store display name already is "OPUS Loop"; keep it). |
| The people | the studio, we | Not "the team", not "our company". One person and collaborators is a studio. |
| The founder | by name on the story and work pages, once | See 04 · System §Boundaries for why the founder's specifics stay sparse on the company site. |

Retired names, never to appear publicly again: CyniCal, 1st°, 1st Degree,
ass.network, ASSN, civical, inoras, Minimus, Make Future as a brand. They may
live on as repository names and codenames.

## 2. Voice

The studio talks like a careful person who respects your time. Plain, warm,
honest, brief. Dry humour is welcome. Sarcasm is not: the sarcastic voice of the
CyniCal era is retired with the name, because Chéri's design law forbids guilt
and the company voice cannot contradict its own product.

Principles:

1. **Say the true thing plainly.** "Free with one preset. $4.99 once for as
   many as you like." Not "Unlock your full potential with Premium."
2. **State, do not sell.** Promises are statements of fact with the mechanism
   next to them: "No account. Nothing leaves your phone. There is no server to
   send it to."
3. **Name people.** Users are people. Customers are people. "For the people who
   use Loop", never "for our users".
4. **Fewer words than expected.** If a paragraph can be a sentence, it is a
   sentence. If a sentence can be cut, cut it.
5. **No pressure of any kind.** No urgency, no scarcity, no streaks, no guilt,
   no praise. Things are offered; nobody is pushed.
6. **Warm, not cute.** No mascots speaking, no emoji in copy, no jokes at the
   reader's expense.
7. **Consistent across surfaces.** The same one-liner for a tool on opus.ro,
   in the App Store subtitle, in the app's About screen, and in a post.

## 3. Vocabulary law

Extends Chéri's vocabulary law (design spec §7) to the whole studio.

**Use**

| Say | Instead of |
|---|---|
| people, someone, you | users, customers, consumers |
| tools, a tool | products, solutions, experiences, apps (fine in a technical sentence, avoid as the brand noun) |
| make, made | build, ship, deliver, launch (fine internally) |
| once, yours | unlock, premium, pro, upgrade |
| share, with, home | lend, borrow, due, overdue, owe, return (as an obligation) |
| notes, the letter | content, blog, newsletter (as brand nouns; "notes" and "the letter" are what we call ours) |
| in the works | coming soon, launching soon, stay tuned |
| support the studio | donate, tip, buy us a coffee, subscribe |
| a small studio in Romania | a Romanian startup, a boutique agency |

**Never**

- Exclamation marks. Anywhere. Including App Store copy and social posts.
- Em dashes. House rule across all repositories; use a full stop, a comma, or a colon.
- Guilt ("don't forget", "you haven't"), praise ("great job"), urgency ("only", "now", "before it's gone").
- Marketing adjectives: seamless, revolutionary, powerful, beautiful (about our own work), effortless, magical, delightful. Show it; do not say it.
- Growth words in public: engagement, growth, monetize, acquire, funnel, convert, retention.
- Superlatives and comparisons with competitors by name. We describe what we do, not what others do wrong. (The argument against subscriptions is made once, calmly, on the story page.)
- Dates as promises. "In the works" is the most precise we get about anything unreleased.
- Claims we cannot point at. Every privacy or data statement links to the mechanism that makes it true.

Numbers in copy are plain and complete: "$4.99 once", "€24 once", "iOS 18 and later".

## 4. Visual system

The current site's palette is right and is kept. What changes is discipline.

### Colour

**OPUS is black and white. Each tool brings one colour.**

| Token | Value | Use |
|---|---|---|
| ground | `#050505` | Page background |
| ink | `#FFFFFF` | Primary text, marks |
| ink-2 | `#888888` | Secondary text, descriptors |
| ink-3 | `#555555` | Meta, captions |
| hairline | `#1A1A1A` | Rules, borders |
| highlight | `rgba(255,255,255,0.04)` | Surfaces on hover |

Tool accents are used only on that tool's page and card, and only for one
thing per page (a link, a mark, a status glyph). Never as a background.

| Tool | Accent | Source |
|---|---|---|
| Loop | `#7A9B58` | `ColorTokens.swift`, `.accentGreen` |
| Chéri | warm dusty red (terracotta family) | Chéri design spec §2; final value from the asset catalog when fixed, must pass 4.5:1 on ground |
| Agora | undecided | Pick when the tool is real. Do not invent one for a placeholder. |

The studio itself never uses an accent. This is what makes three coloured tools
read as one family.

### Type

Two faces, both self-hosted, no third-party font requests.

- **Interface sans:** Inter (already in use). Body 17px on the web, line-height
  1.6 to 1.85 for reading.
- **Voice serif:** for the dictionary entries, the story lede, and pull
  quotes. The site currently falls back to Georgia italic; choose one face and
  ship it. Recommendation: Source Serif 4 (open licence, optical sizes, a
  genuine italic). Avoid Newsreader, which is eratic.ro's face; the two
  identities should not share a voice.
- Mono is for meta only (dates, tags, the dictionary "n." and "adj." labels).

The dictionary entry is a reusable component, not a one-off: a word, a part of
speech, a language, a meaning. It opens the brand mark and can open a tool page
("loop, n.").

### Marks

- The studio mark is the round O in `public/opusLogo.svg`. White on ground.
  No colour version.
- Tool marks are the app icons' glyphs, rendered inside the iOS icon shape
  (the 22.37% corner radius already in `Dock.css`). White glyph on a near-black
  tile on the studio site; the tool's own accent appears only on its page.
- Marks are never stretched, never given glows or shadows beyond the tile's own.

### Imagery

Only our own: screenshots and screen recordings of the tools, photographs we
took. No stock (the Unsplash images in the current "Ten Principles" post go).
Video is self-hosted and short. Illustration only when a tool already has an
illustrative language (Loop's line illustrations on opusloop.co) and only on
that tool's pages.

### Motion

Restrained and purposeful, the same law as Chéri's design spec §5: motion
explains a state change, never decorates; nothing longer than 350ms; springs
over eases; every animation has a reduced-motion equivalent that is a plain
fade. The brand mark's expand into the dictionary is the one signature motion
on the site and it earns its place. The macOS-dock magnification does not (see
05 · Website §Audit).

## 5. What OPUS is not

Kept from the 2025 identity notes because it is still true, and sharpened.

- Not an agency. It does design work for others, and says so plainly, but it
  is a studio with its own tools first.
- Not a startup. No venture money, no growth plan, no exit.
- Not a content company. No courses, no "ten tips", no channel with a posting
  schedule. Notes are written when there is something to say.
- Not trying to be big. Trying to be good, and to still be here.
- Not a person. The founder has his own place (eratic.ro) for his own opinions.
  OPUS speaks for the work.
