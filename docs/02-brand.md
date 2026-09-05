# 02 · Brand

How OPUS looks, sounds and names things. Everything public (website, App Store,
release notes, social posts, emails to people who write in) follows this.

---

## 1. Names

| Thing | Written as | Notes |
|---|---|---|
| The studio | **OPUS** | Capitals in the wordmark and in running text. Never "Opus" mid-sentence, never "OPUS Studio". |
| The company | Opusculum SRL | Legal lines only: footer, privacy pages, App Store seller name, invoices. Never in copy. |
| The descriptor | human experience design | Lowercase, under the mark. A descriptor, not a tagline. |
| The tools | Loop, Chéri, inOras | Bare names on opus.ro and in prose. "OPUS Loop" only where a store needs a namespace. inOras is not public yet: "a third tool, about the city" until the owner says otherwise. |
| The people | the studio, we | Not "the team", not "our company". |
| The founder | **C.** | The owner's choice: the bare minimum, no hiding, no association beyond what is necessary. "C." on the story and work pages, once each. No full name, no photograph, no biography. The personal business address is `c@opus.ro`; it is never published (the site uses `hello@opus.ro`). |
| The lab | Make Future, makefuture.ro | Mentioned on opus.ro only once the relationship (OPUS funds it) is real enough to point at. |

Retired names, never to appear publicly again: CyniCal, 1st°, 1st Degree,
ass.network, ASSN, Agora, civical, Minimus, "Make Future collective". They may
live on as repository names and codenames.

## 2. Voice

The studio talks like a careful person who respects your time. Plain, warm,
honest, brief. Dry humour is welcome. Sarcasm is not: the CyniCal-era voice is
retired with the name.

**The governing rule, from the owner: show, do not state.** Our principles are
never presented as a list, a manifesto or a set of promises. They are obvious
from the way the tools are designed and presented end to end. What a reader
should feel is delight, comfort, and a revived hope that good things can be
done with technology. What they should never feel is that they are being
lectured, recruited, or told what is wrong with everyone else.

In practice:

1. **Facts, not vows.** "Free. No account. Works offline." is information about
   a tool. "We will never track you" is a vow, and vows get audited by
   strangers. Write the first kind.
2. **Describe what we make, not what others do wrong.** No competitor named,
   no category condemned. The one argument we allow ourselves, about
   subscriptions, is made at most once, calmly, in a note, in first person.
3. **No "we believe", "we refuse", "we will never" on pages.** Notes (essays)
   may think out loud, in first person and with humility. Pages do not preach.
4. **Name people.** "For the people who use Loop", never "for our users".
5. **Fewer words than expected.** If a paragraph can be a sentence, it is a
   sentence.
6. **No pressure of any kind.** No urgency, no scarcity, no streaks, no guilt,
   no praise. Things are offered.
7. **Warm, not cute.** No mascots speaking, no emoji in copy, no jokes at the
   reader's expense.
8. **Consistent across surfaces.** The same one-liner for a tool on opus.ro,
   in the App Store, in the app's About screen, and in a post.

## 3. Vocabulary

Extends Chéri's vocabulary law (design spec §7) to the whole studio. Public
copy follows it; internal writing follows it where convenient.

**Prefer**

| Say | Instead of |
|---|---|
| people, someone, you | users, customers, consumers |
| tools, a tool | products, solutions, experiences |
| make, made | build, ship, deliver, launch (fine internally) |
| free, once, yours | unlock, premium, pro, upgrade |
| extras | add-ons, in-app purchases (fine in legal copy) |
| share, with, home | lend, borrow, due, overdue, owe |
| notes | content; "blog" is fine in conversation, "notes" is the section's name |
| in the works | coming soon, launching soon, stay tuned |
| support the studio | donate, tip (except where Apple requires the word), subscribe |
| a small studio in Romania | a Romanian startup, a boutique agency |

**Avoid in public**

- Exclamation marks.
- Em dashes (house rule across all repositories; a full stop, comma or colon
  instead).
- Guilt ("don't forget"), praise ("great job"), urgency ("only", "now").
- Marketing adjectives about our own work: seamless, revolutionary, powerful,
  beautiful, effortless, magical, delightful. Show it.
- Growth words: engagement, growth, monetize, acquire, funnel, convert.
- Competitors by name; categories condemned.
- Dates as promises.
- Principles as principles. Rules, laws, manifestos, "our values".

Numbers in copy are plain and complete: "free", "€24 once", "iOS 18 and later".

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

Tool accents appear only on that tool's page and tile, and only for one thing
per page. Never as a background.

| Tool | Accent | Source |
|---|---|---|
| Loop | `#7A9B58` | `ColorTokens.swift`, `.accentGreen` |
| Chéri | warm dusty red (terracotta family) | Chéri design spec §2; final value from the asset catalog, must pass 4.5:1 on ground |
| inOras | undecided | Chosen when its page is drafted |

The studio itself never uses an accent. That is what makes three coloured tools
read as one family, and it is how the three circles diagram works.

### Type

Two faces, both self-hosted, no third-party font requests.

- **Interface sans:** Inter (already in use). Body 17px on the web, line-height
  1.6 to 1.85 for reading.
- **Voice serif:** for the dictionary entries, the story lede, pull quotes.
  Recommendation: Source Serif 4 (open licence, optical sizes, a real italic).
  Avoid Newsreader, which is eratic.ro's face.
- Mono for meta only: dates, tags, the dictionary "n." and "adj." labels.

The dictionary entry is a reusable component: a word, a part of speech, a
language, a meaning. It opens the brand mark and can open a tool page.

### Marks

- The studio mark is the round O in `public/opusLogo.svg`. White on ground.
- Tool marks are the app icons' glyphs inside the iOS icon shape (22.37%
  corner radius). White glyph on a near-black tile on the studio site; the
  tool's accent appears only on its own page.

### Imagery

Only our own: screenshots and recordings of the tools, photographs we took. No
stock. Video self-hosted and short.

### Motion

Restrained, the same law as Chéri's design spec §5: motion explains a state
change, never decorates; nothing over 350ms; springs over eases; reduced-motion
gets a plain fade or nothing. On the homescreen (05 · Website §3) the motion
is the metaphor's own: the mark opening into the dictionary, the dock
magnifying under a pointer, the light on a tile following the pointer or the
tilt of the phone, and an icon morphing into the page it opens. Those are the
behaviours people expect of a homescreen, so they read as familiarity rather
than decoration. Reading pages animate nothing.

## 5. What OPUS is not (internal)

For our own clarity. Not for a page.

- Not an agency, though it does design work for others.
- Not a startup. No venture money, no growth plan, no exit.
- Not a content company. Notes are written when there is something to say.
- Not trying to be big. Trying to be good, and to still be here.
- Not a person. The founder has his own place for his own opinions. OPUS
  speaks for the work.
