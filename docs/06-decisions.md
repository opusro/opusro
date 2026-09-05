# 06 · Decisions

Two lists. First, what only the owner can decide, each with a recommendation
and the default that applies if nothing is decided. Second, what these
documents settle, recorded so it is not relitigated.

---

## 1. Open, for the owner

### D1 · Chéri's public name

The PRD names it Chéri with trademark clearance pending. The live site still
says 1st°.

- **Recommendation:** commit to Chéri; remove 1st° from opus.ro now; say
  nothing public until clearance comes back. If Chéri fails clearance, choose
  once more and clear before saying it.
- **Default:** the tool has no public name and no page. The story page says
  "the next one".

### D2 · Agora: circle, name, and what it is

Everything written about Agora here is inferred from codenames and notes.

- **Recommendation:** confirm the circle ("you with everyone", the citizen and
  the city) or correct it; run a trademark search on Agora in classes 9 and 42
  before it appears anywhere; keep it "imagined" on the story page until there
  is something real.
- **Default:** one sentence on the story page, unnamed.

### D3 · Analytics on opus.ro

- **Recommendation:** remove Google Analytics entirely. App Store Connect
  already reports what matters. Add nothing for a year, then decide.
- **Default:** none.

### D4 · Patronage provider

Options and trade-offs in 04 · System §4.

- **Recommendation:** Stripe Payment Links behind `opus.ro/support` if owning
  the relationship matters most; Patreon if the community layer is wanted and
  the fee is accepted. One, not both, at launch.
- **Default:** the support page goes live as text with the email as the only
  action, and the provider is added when chosen. Nothing about the page changes
  later except the buttons.

### D5 · The letter

- **Recommendation:** RSS and JSON Feed from day one; Buttondown forwarding
  the feed to email once anyone asks for it; tracking off.
- **Default:** feeds only.

### D6 · Domains for tool pages

- **Recommendation:** tool pages live on opus.ro; opusloop.co stays as Loop's
  own site because the App Clip and universal links depend on it; new tools
  get a domain only when a web feature needs one.
- **Default:** as recommended.

### D7 · One email address

Loop's app uses `support@opus.ro`; the sites use `hello@opus.ro`.

- **Recommendation:** `hello@opus.ro` everywhere, `support@` kept as an alias
  forever. Change the app's string at the next release.
- **Default:** both keep working; the sites say `hello@`.

### D8 · Voice: retiring sarcasm

The 2025 identity notes describe the voice as "a little sarcastic", from the
CyniCal era. Chéri's design law forbids guilt and praise.

- **Recommendation:** retire sarcasm from the company voice. Dry humour stays.
- **Default:** as recommended; 02 · Brand §2 is written this way.

### D9 · Make Future

- **Recommendation:** not a brand. Keep makefuture.io as an unlisted playground
  for games and experiments; drop the "creative technology collective"
  framing; let the mission live in one paragraph of the story. Revisit only if
  a foundation becomes real.
- **Default:** as recommended; opus.ro does not mention it.

### D10 · Open finances

The support page promises a yearly plain account of what came in and what it
went to.

- **Recommendation:** do it, at the level of totals (support received, App
  Store income, what it paid for). It is the strongest possible proof of the
  thesis and it costs one paragraph a year.
- **Default:** the promise stays in the copy; the first account is due a year
  after the support page goes live.

### D11 · The founder on opus.ro

- **Recommendation:** name, role, years, city, once, on the story page. No
  biography, no photograph, no anecdotes. Everything personal lives on the
  other side of the one-way door.
- **Default:** as recommended.

### D12 · Making this repository public

- **Recommendation:** yes, after the rebuild, once `_inspiration/` (which
  contains an hourly rate and client details) is out of the tree. A public
  site repository is the mechanism behind "no third-party requests".
- **Default:** private.

### D13 · The origin story

The 2025 notes tell the personal story behind the meditation practice (a
family health crisis in 2020).

- **Recommendation:** the company version stays at the altitude of 01 · Story:
  the need was real, the tools served someone else, we made our own. The
  personal version, if told, is told by the founder in his own place, when he
  chooses.
- **Default:** as recommended.

### D14 · Language

opus.ro is English. The studio is Romanian.

- **Recommendation:** English only for now. A Romanian story page later if
  there is a Romanian audience for the tools (Chéri has an RO fast-follow in
  its plan).
- **Default:** English.

## 2. Settled by these documents

Recorded as decisions so they are not reopened casually. Reopen one by editing
this section in the same commit as the change.

| ID | Decision | Where |
|---|---|---|
| S1 | The thesis line is "We make tools for people, not for users." | 01 §1 |
| S2 | The dictionary treatment of the name is the brand's signature and survives every redesign. | 01, 02 §4 |
| S3 | The product line is three circles: self, people, everyone. A new tool must serve one and keep the constitution. | 01, 03 §2 |
| S4 | Ten laws form the product constitution; law 10 (state exceptions plainly) governs Loop's TelemetryDeck. | 03 §1 |
| S5 | One public name per tool, bare on opus.ro, namespaced only in stores. Retired names never reappear. | 03 §3, 02 §1 |
| S6 | Three status words: available, in the works, imagined. No dates, no "coming soon", `listed` flags instead of deletions. | 03 §4 |
| S7 | OPUS is black and white; each tool brings one accent, used on its own page only. | 02 §4 |
| S8 | The studio-wide vocabulary law extends Chéri's; no exclamation marks, no em dashes, no guilt, no praise, no growth words in public. | 02 §3 |
| S9 | opus.ro never links to, names or shares services with eratic.ro. The build fails if the output contains "eratic". | 04 §3 |
| S10 | Patronage funds time, never features. Apps link to opus.ro, never to /support. | 04 §4 |
| S11 | opus.ro is rebuilt as a static Astro site on the eratic pattern, deployed to GitHub Pages, with no third-party requests and no analytics. The SPA is not patched. | 05 §1, §6 |
| S12 | Notes come from the work (changelogs, decision records). No content calendar, no public cadence. | 04 §6 |
| S13 | One inbox, one address on every surface. | 04 §5 |

## 3. Plan

| Phase | Outcome | Depends on |
|---|---|---|
| 0 | These documents, committed. | Done |
| 1 | opus.ro rebuilt (05 §7 phase 1): home, story, Loop, notes, support as text, work, contact, privacy, feeds, redirects; GA4, Google Fonts, Unsplash, dead dependencies and dead configuration removed; 1st° and "Coming April 2026" gone. | D1 (to remove 1st°), D3 (default is fine), D11 |
| 2 | Support wired to a provider; letter provider if wanted; `hello@opus.ro` in the Loop app. | D4, D5, D7 |
| 3 | Chéri page built with `listed: false`; flipped on clearance and something to show; App Store listing from the deck. | D1 clearance, Chéri Stage 3 |
| 4 | `loopweb` folded into this repository as a second site sharing tokens; domain kept. | D6; only when two stacks hurt |
| 5 | Agora, when real. | D2 |
| yearly | The plain account on the support page; story page reread. | D10 |
