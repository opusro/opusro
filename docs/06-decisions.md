# 06 · Decisions

Settled, open, and the plan. Reopen a settled item by editing it here in the
same commit as the change.

---

## 1. Settled by the owner (2026-09-05)

| ID | Decision |
|---|---|
| D1 | The friends app is **Chéri**. Final. Trademark filing is a to-do, not a condition. |
| D2 | The city tool is **inOras** (intended final name), **not public yet**. Unnamed on every public surface until the owner releases the name. Status: in the works, a couple of months out. |
| D3 | **Traffic counts, yes; personal data, no; nothing that needs a consent banner.** A cookieless privacy-first counter, stated on `/privacy`. Pick between Plausible (paid, EU) and GoatCounter (free): see D3a below. |
| D8 | **Sarcasm retired.** Dry humour stays. |
| D9 | **Make Future is a lab, not a brand of OPUS.** Now at makefuture.ro; detached; meant to become an NGO; R&D, education, community. OPUS funds it. |
| D11 | **The founder is "C."** Bare minimum: name as C., role, years, city, once. Not hidden, not associated further. `c@opus.ro` is private. |
| D13 | **Origin story stays high-altitude** on the company side. |
| D15 | **Loop goes free.** Preset limit removed; extras (sounds, backgrounds) and a way to support the studio offered quietly; everyone who paid is thanked and gets all future extras. |
| D16 | **The blog comes back**, with a planned first batch of five to ten notes (05 · Website §9). Comments happen on Patreon posts or through a support button on the page, not in a widget. |
| D18 | **The principles are a current version, not stone**, questioned periodically, bendable when the whole stays sound, and **never stated explicitly in public materials**. |
| D20 | **The three circles** are the way the line is shown. |
| D21 | **Loop's web home moves under opus.ro** (page at `/loop`, PWA at `loop.opus.ro`); opusloop.co redirects after the associated-domains release. The PWA gets a polish pass. |

## 2. Still open, for the owner

Each with a recommendation and the default that applies if nothing is said.

### D3a · Which counter

- **Recommendation:** Plausible. Hosted in the EU, cookieless, no personal
  data, no banner needed, one 1 kB script, a dashboard that answers "how many
  people, from where, to which page". About €9 a month. GoatCounter is the
  free alternative with a plainer dashboard.
- **Default:** Plausible.

### D4 · Patronage provider

- **Recommendation:** Patreon first, because the owner wants a place for
  comments on notes and Patreon posts are exactly that. Every note carries a
  "talk about this" link to its Patreon post and a "support the studio" link to
  `opus.ro/support`. Add Stripe Payment Links behind the same URL later for
  people who do not want a Patreon account.
- **Default:** the support page goes live as text with the email as the only
  action, and the buttons are added when the account exists.
- **Needs from the owner:** a Patreon account for OPUS (creator page, tiers,
  payout to Opusculum SRL).

### D5 · The letter

- **Recommendation:** RSS and JSON Feed from day one; Buttondown forwarding
  the feed once anyone asks; tracking off.
- **Default:** feeds only.

### D7 · One email address

- **Recommendation:** `hello@opus.ro` everywhere; `support@opus.ro` an alias;
  the Loop app string changes at the next release.
- **Default:** as recommended.

### D10 · Open finances

- **Recommendation:** yes, at the level of totals, once a year on the support
  page, including Make Future's share.
- **Default:** the promise is in the copy; the first account is due a year
  after the support page goes live.

### D12 · Public repository

- **Recommendation:** yes, after the rebuild, once `_inspiration/` is out of
  the tree.
- **Default:** private.

### D14 · Language

- **Recommendation:** English for now; a Romanian story page if a Romanian
  audience appears (Chéri has an RO fast-follow planned; inOras will be
  Romanian by nature, so this comes back at its launch).
- **Default:** English.

### D17 · The Ten Principles post

- **Recommendation:** keep in the archive as an essay under its original date,
  stock images removed, one-line preface dating it, not linked prominently.
- **Default:** as recommended.

### D19 · Make Future's share

- **Recommendation:** a fixed percentage of studio income, decided once and
  shown in the yearly account. A number the owner is comfortable saying out
  loud.
- **Default:** undisclosed until the first yearly account.

### D22 · Loop's extras and legacy

- **Recommendation:** in App Store Connect, set the app free and retire the
  preset-unlock purchase; keep the entitlement code path so existing buyers
  are recognised; add a "thank you" state in Settings for anyone with a legacy
  or IAP purchase that grants all future extras. Ship the first extras only
  when they are genuinely good, not to have something to sell.
- **Default:** as recommended.

## 3. Plan

### Phase 1 · The new opus.ro (one working session) · built 2026-09-05

Rebuilt on Astro on the branch `claude/opus-brand-website-strategy-rhza61`;
deploys through the existing GitHub Pages workflow once merged to `main`.
Still to do from the owner's side: the counter account (D3a), then
`COUNTER.enabled = true` in `src/config.ts`. Loop's price line stays at
today's model until phase 2 ships.

- Tokens, layout, dictionary component, the three circles drawn.
- Pages: home, story (with C.), Loop (facts reflecting the coming free model,
  with the price line held until phase 2 ships), notes, support (text only),
  work, contact, privacy, 404, feeds, redirects.
- Notes 2 and 3 from the batch written and published (release and craft).
  Ten Principles archived per D17.
- Counter installed (D3a default) and named on `/privacy`.
- Removed: 1st°, "Coming April 2026", GA4, Google Fonts, Unsplash, dead
  dependencies and configuration.
- Chéri page built with `listed: false`. inOras absent by name.

### Phase 2 · Loop goes free; the money side goes live (two to three weeks, part-time)

- **Loop, the app:** App Store Connect pricing and IAP changes (owner);
  preset limit removed, legacy thanks state, `hello@opus.ro`, About screen in
  the family pattern, associated domains extended to `opus.ro` and
  `loop.opus.ro`, AASA served from all hosts (build, one release).
- **loopweb:** copy rewritten for free plus support; shared tokens applied;
  PWA polish pass (design, then build).
- **Support:** Patreon account created (owner); tiers written from the deck;
  buttons on `/support`; the letter provider if wanted.
- **Notes:** note 1 ("Loop is free now") published the day the release is
  live; note 7 with iOS 27; notes 4 or 8 next.
- **Housekeeping:** `support@` becomes an alias; `_inspiration/` moved out;
  repository public if D12 is yes.

### Phase 3 · Chéri public; Loop's web home moves (around Chéri's release)

- **Chéri:** page listed; App Store listing from the deck; About screen in the
  family pattern; note 4 ("Share, with, home") on release day; note 5 soon
  after.
- **Loop web:** one release cycle after phase 2's entitlement change, the PWA
  moves to `loop.opus.ro`, `opusloop.co` redirects permanently, AASA kept at
  the old host. loopweb folded into this repository as a second Astro site
  sharing tokens.
- **inOras:** page drafted with `listed: false` as soon as the owner wants to;
  accent chosen; listed the day the name is public.
- **Make Future:** the one line appears in the story and on the support page
  once makefuture.ro has something to point at.

### Phase 4 · inOras public; the first accounting

- inOras listed and launched with its first note.
- The first quarterly letter; the first yearly account on the support page,
  Make Future's share included.
- Principles reread and questioned on purpose (03 · Products §1).

How the owner works these phases day to day is in 07 · Working.
