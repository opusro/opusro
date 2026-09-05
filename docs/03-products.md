# 03 · Products

The product line as a coherent whole: the laws every tool keeps, the three
tools, how they are named and described, and what every tool's public page
carries.

---

## 1. The constitution

Every OPUS tool keeps these. They are drawn from what the tools already do
(Chéri PRD §2, Loop's philosophy, the "Ten Principles" post) and stated once so
that no tool has to rediscover them. A feature, price or page that breaks one
is rejected regardless of what it would gain.

1. **Person first, model after.** No feature exists to move a metric. The
   question asked of every addition is whether it makes the person's life a
   little better or only makes a number look good.
2. **Works without us.** If OPUS disappeared tomorrow, the tool keeps working.
   No accounts, no server of ours, local data first, the person's own iCloud
   for sync. Where a platform forces an exception, the exception is stated on
   the tool's page.
3. **Honest, once.** One clear price, paid once, or nothing. No subscriptions,
   no ads, no affiliate links, no commissions, no rent on a tool you already
   learned. The price is what keeps the tool alive and cared for.
4. **Calm by default.** The tool lives in the periphery (widgets, Spotlight,
   complications) and earns the centre of attention only for genuinely useful
   moments. No badges by default, no streaks, no guilt, no manufactured
   urgency.
5. **Your data is yours, legibly.** Full export always. Where it makes sense,
   a plain-text mirror a person can read without the app.
6. **Complete without intelligence, complete offline.** AI features enhance
   capable devices; the tool is whole without them. Every AI surface has a
   visible manual equivalent. Nothing essential needs a network.
7. **Native.** Built for the platform with the platform's own materials. It
   should feel like it belongs on the device, not like it was ported there.
8. **Personality without manipulation.** A tool may have character. It may
   never use that character to pressure, shame or flatter.
9. **Fewer things, done fully.** Few features over broken magic (Chéri
   ADR-0030). No mocks, no placeholders, no "coming soon" inside a shipped
   tool.
10. **Privacy is architecture, and where it is not pure it is stated.** The
    default is that nothing leaves the device because there is nowhere for it
    to go. Where a tool does send something (Loop's anonymous usage counts via
    TelemetryDeck), the tool's page says exactly what, to whom, and why, in
    one plain paragraph.

Law 10 matters for coherence. The 2025 launch notes for Loop say "no tracking,
no analytics", and the shipped app uses TelemetryDeck. Both cannot be true. The
brand is honesty, so the copy changes, not the claim's direction: Loop's page
says it sends anonymous counts, lists them, and says why. Nobody who reads
that feels tricked. Someone who reads "no analytics" and later finds
TelemetryDeck does.

## 2. The line

Three circles, widening (01 · Story). Each tool serves one.

### Loop · you with yourself

- **One line:** A timer for practice. Set a duration, choose a sound or
  silence, begin.
- **What it is for:** meditation, prayer, deep work, movement, sleep. A tool,
  not a service: no catalogue, no teacher, no content you did not choose.
- **Status:** available. iOS 18 and later, watchOS 11 and later. In the App
  Store since April 2026.
- **Price:** free with one preset; $4.99 once for as many presets as you like.
  People who bought the original paid version keep everything.
- **Home:** opusloop.co (its own site: web player, help, privacy, terms).
- **What leaves the phone:** anonymous usage counts via TelemetryDeck (no
  identifiers); Mindful Minutes to Apple Health if turned on; your own files to
  your own iCloud Drive. Nothing to OPUS.
- **Accent:** green `#7A9B58`.
- **App Store name:** OPUS Loop. Subtitle today: "Meditation & Focus".

### Chéri · you with your people

- **One line:** Friends, and the things between them. Remember what people
  love, keep gift ideas, share your things without keeping score.
- **What it is for:** tending friendships through things: what someone loves,
  the idea you had for them in a shop, which of your books is at whose house,
  the birthday in three weeks with runway to act.
- **Status:** in the works. Universal app (iPhone, iPad; Mac in the first
  major update), iOS 18 floor, shipping in the iOS 27 window.
- **Price:** yours once, in the €19 to €29 band (final at listing). Giftable
  through the App Store, on purpose: a gifting app you can gift.
- **What leaves the phone:** nothing to OPUS; there is no server. Sharing
  between friends is a file you send yourself, through the system share sheet.
- **Vocabulary law:** share / with / home. Never lend, borrow, due, overdue,
  owe. This law is the origin of the studio-wide one (02 · Brand §3).
- **Accent:** warm dusty red, final value from the asset catalog.
- **Name:** trademark clearance pending (EUIPO and USPTO, classes 9 and 42).
  The name does not appear publicly until clearance. See 06 · Decisions.

### Agora · you with everyone

- **One line (provisional):** The individual and the city.
- **What it is for (provisional):** the software a citizen cannot refuse, made
  with the care usually reserved for software that competes for attention.
- **Status:** in the works, early. An API exists on its own server; nothing
  about the product is public.
- **Everything about Agora on this page is an inference** from the codenames
  and the founder's notes. It is here so the line reads whole. It appears
  nowhere public until the owner confirms the circle, the name (Agora is a
  crowded mark), and that there is something real to show.

## 3. Naming rules

1. **One public name per tool, for life.** Internal codenames stay in
   repositories. The public never meets two names for one thing.
2. **Bare names in prose and on opus.ro.** "Loop", not "OPUS Loop", not "Loop
   by OPUS". The studio is the context; the page already says OPUS.
3. **Namespaced only where a store needs it.** App Store display names may
   carry "OPUS" (Loop already does). Decide per tool at listing time and then
   never change it.
4. **A tool's one line is fixed text.** It appears identically on opus.ro, in
   the App Store subtitle or first sentence, in the app's About screen, and in
   any post. One source: the product entry in the website's content
   collection (05 · Website §Content).
5. **Names are cleared before they are said.** Trademark search in classes 9
   and 42 before a name appears on any public surface, including a "coming"
   label.

## 4. Status vocabulary

Exactly three states, in these words.

| State | Means | Appears |
|---|---|---|
| **available** | In the App Store now. | Full page, card on home, in the tools list. |
| **in the works** | Being made; something real exists to show (a screenshot, a design note, a TestFlight). | Page with what exists and no more. Card on home. |
| **imagined** | An idea we intend to make. | One sentence on the story page at most. No page, no card. |

Rules, taken from how eratic.ro keeps its unfinished sections:

- **No "coming soon" dead ends.** A tool that has nothing to show has no
  page. The current site's disabled dock icon reading "Coming April 2026" in
  September is exactly the failure this prevents.
- **No dates in public.** "In the works" is as precise as the studio gets.
  Release notes are written after, never before.
- **A `listed` flag, not a deletion.** A tool's page can exist in the
  repository and be built without being linked from anywhere. Flipping one
  flag lists it. Nothing has to be remembered or undone.

## 5. The tool page template

Every tool's page on opus.ro has the same bones, in this order. Same bones is
what makes the line read as a line.

1. **Mark, name, one line.** The dictionary component may open it
   ("loop, n.").
2. **What it is for.** Three to five sentences. The need, then the tool. No
   feature list.
3. **The promises it keeps.** The constitution made specific to this tool, as
   short factual lines with the mechanism beside each:
   - "No account. There is nothing to sign up for."
   - "Works offline. The timer, the sounds and your history live on your
     phone."
   - "$4.99 once for all presets. Nothing recurs."
   - "What leaves your phone: anonymous usage counts via TelemetryDeck, and
     nothing else. Here is the list."
4. **Get it.** App Store link, the tool's own site if it has one, platforms,
   price in plain words.
5. **Notes about it.** The studio's notes filtered to this tool: release
   notes, design decisions. Newest first.
6. **Privacy and help.** Links to the tool's privacy statement and help page
   (Loop's live on opusloop.co), and the one studio email.

Screens and recordings sit beside the text, never instead of it. A page must
read completely with images turned off.

## 6. Inside the tools

The tools present the studio the same way, so that someone who owns two of
them recognises the family.

- **About screen:** "Made by OPUS in Romania." linking to opus.ro (not to
  the support page; see 04 · System §Value exchange for the App Review reason).
  The tool's one line. The promise as a statement: "yours once, forever. No
  subscription, no ads, no tracking" for Chéri; Loop's equivalent stated as
  truly ("no account, no subscription, anonymous usage counts only").
- **One support address.** Loop's app uses `support@opus.ro`; the sites use
  `hello@opus.ro`. Pick one (recommendation: `hello@opus.ro`, with the other
  as an alias that keeps working) and use it everywhere.
- **Release notes in one voice.** Loop's `CHANGELOG.md` is already written as
  honest prose. That is the source for the App Store "What's New", for the
  note on opus.ro, and for the post. Written once, shortened as needed.

## 7. Consistency audit (as of 2026-09-05)

Things that currently contradict the above and need a change.

| Where | What | Fix |
|---|---|---|
| opus.ro dock, modal | Tool called "1st°" with Lorem ipsum description and "Launching soon" | Remove until the cleared name and something real exist |
| opus.ro `index.html` keywords | "cynical", "ass.network" | Remove |
| opus.ro `index.html` og:image | `/loopIcon.png`, a file that does not exist | Point at a real image (a studio card, not Loop's icon) |
| `_inspiration/Opus_Loop/LAUNCH_AND_MARKETING.md` | "no tracking, no analytics" | History; the live claim becomes law 10's plain statement |
| Loop app vs sites | `support@opus.ro` vs `hello@opus.ro` | One address, one alias |
| opusloop.co hero | "without a monthly sacrifice" | Fine, but check against the vocabulary law: no competitor-shaped framing beyond the story page. Owner's call; it is on the tool's own site |
| Loop IAP copy | "unlock unlimited presets" | Prefer "all presets, once" phrasing at the next copy pass; not urgent |
