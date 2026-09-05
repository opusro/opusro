# 03 · Products

The product line as a coherent whole: the principles every tool keeps, the
three tools, how they are named and described, and what every tool's public
page carries.

---

## 1. Principles (current version)

Every OPUS tool keeps these. They are drawn from what the tools already do
(Chéri PRD §2, Loop's philosophy, the Ten Principles post) and stated once so
that no tool has to rediscover them.

**Two things the owner has settled about this list.**

- **It is a current version, not stone.** Each principle should be questioned
  from time to time, and one can be bent when the overall moral and principled
  standing stays solid. The test is not "does this break rule 4" but "would a
  thoughtful person who trusted us still trust us after this". Bending is
  recorded in `DECISIONS.md` of the tool concerned, with the reason, so the
  bend is a decision and not a drift. The list itself is reread once a year
  (04 · System §6).
- **It is internal.** These principles are rarely, if ever, stated explicitly
  in public materials. They are meant to be obvious through the way the tools
  are designed and presented end to end. Public copy states facts about a tool
  (what it costs, what it needs, what leaves the phone) and lets the feeling do
  the rest. Radical or explicitly stated principles are a risk: they get used
  against the company by semantics. See 02 · Brand §2.

1. **Person first, model after.** No feature exists to move a metric.
2. **Works without us.** If OPUS disappeared tomorrow, the tool keeps working.
   No accounts, no server of ours, local data first, the person's own iCloud
   for sync. Where a platform forces an exception, the tool's page states it
   as a fact.
3. **Free, or honest once.** No subscriptions, no ads, no affiliate links, no
   rent on a tool you already learned. Extras, where they exist, are delight
   (sounds, backgrounds, a way to support the studio), never necessity, and
   never nagged about.
4. **Calm by default.** The tool lives in the periphery and earns the centre of
   attention only for genuinely useful moments. No badges by default, no
   streaks, no guilt, no manufactured urgency.
5. **Your data is yours, legibly.** Full export always. A plain-text mirror
   where it makes sense.
6. **Complete without intelligence, complete offline.** AI enhances capable
   devices; the tool is whole without it. Every AI surface has a visible
   manual equivalent.
7. **Native.** Built with the platform's own materials. It belongs on the
   device. (The web versions, Loop's PWA first, keep the same feel.)
8. **Personality without manipulation.** A tool may have character. It never
   uses that character to pressure, shame or flatter.
9. **Fewer things, done fully.** Few features over broken magic (Chéri
   ADR-0030). No mocks, no placeholders, no "coming soon" inside a shipped
   tool.
10. **Privacy is architecture, and where it is not pure it is a stated fact.**
    The default is that nothing leaves the device because there is nowhere for
    it to go. Where a tool does send something (Loop's anonymous usage counts
    via TelemetryDeck), the tool's page says what, to whom, and why, in one
    plain paragraph. Stated as information, not as a vow.

## 2. The line

Three circles, widening (01 · Story). Each tool serves one.

### Loop · you with yourself

- **One line:** A timer for practice. Set a duration, choose a sound or
  silence, begin.
- **What it is for:** meditation, prayer, deep work, movement, sleep. A tool,
  not a service: no catalogue, no teacher, no content you did not choose.
- **Status:** available. iOS 18 and later, watchOS 11 and later, and a web
  version (PWA) that runs on any device. In the App Store since April 2026.
- **Price: free.** Owner decision, September 2026. The reasoning, in the
  owner's words: nobody actually needs a timer app, and Loop should be a
  gateway into not needing an app for your moments of inner peace or focus.
  It is hard to sell that and easy to give it away. Once people use it, they
  can be offered extras (sounds, backgrounds) and a way to support the studio.
  - **Today** the app is free with one preset and a $4.99 one-time purchase
    for unlimited presets, with 1.0 buyers unlocked automatically. Going free
    means: the preset limit goes; the existing purchase stays honoured;
    everyone who paid (1.0 or the IAP) is thanked in the app and gets every
    future extra included. Nobody who paid should feel foolish for it.
  - **Extras** are optional delight: sound packs, background packs. Never a
    feature that the free tool is worse without. Never a prompt during a
    session.
  - **Supporting the studio from inside the app** has to be an in-app purchase
    (a consumable tip), quietly in Settings. Linking out to a payment page from
    inside the app is an App Review risk (04 · System §4).
- **Home:** opusloop.co today, with the web player (PWA), help, privacy,
  terms. Moving under opus.ro (04 · System §2, D6).
- **What leaves the phone:** anonymous usage counts via TelemetryDeck (no
  identifiers); Mindful Minutes to Apple Health if turned on; your own files to
  your own iCloud Drive. Nothing to OPUS.
- **Accent:** green `#7A9B58`.
- **App Store name:** OPUS Loop. Subtitle today: "Meditation & Focus".

### Chéri · you with your people

- **Name: final.** Chéri. Trademark filing (EUIPO and USPTO, classes 9 and
  42) is a to-do, not a condition on using the name.
- **One line:** Friends, and the things between them. Remember what people
  love, keep gift ideas, share your things without keeping score.
- **What it is for:** tending friendships through things: what someone loves,
  the idea you had for them in a shop, which of your books is at whose house,
  the birthday in three weeks with runway to act.
- **Status:** in the works. Universal app (iPhone, iPad; Mac in the first
  major update), iOS 18 floor, shipping in the iOS 27 window.
- **Price:** yours once, in the €19 to €29 band (final at listing). Giftable
  through the App Store on purpose: a gifting app you can gift.
- **What leaves the phone:** nothing to OPUS; there is no server. Sharing
  between friends is a file you send through the system share sheet.
- **Vocabulary:** share / with / home. Never lend, borrow, due, overdue, owe.
  This is the origin of the studio-wide vocabulary (02 · Brand §3).
- **Accent:** warm dusty red, final value from the asset catalog.

### inOras · you with everyone

- **Name: inOras is the intended final name.** It cannot go public yet. Until
  the owner says so, the tool is unnamed on every public surface: "a third
  tool, about the city". Internally and in these documents it is inOras;
  "Agora", "civical" and "inoras" (lowercase) are codenames.
- **One line (working):** The individual and the city.
- **What it is for (working):** the software a citizen cannot refuse, made
  with the care usually reserved for software that competes for attention.
- **Status:** in the works, and in a good state. The owner expects a couple of
  months to public release. An API exists on its own server (agoresti.ro).
- **Public presence until then:** one sentence on the story page, no name, no
  page. It gets a page with `listed: false` as soon as the owner wants to draft
  it; it is listed on the day the name is public.
- **Accent:** undecided. Chosen when the page is drafted.

## 3. Naming rules

1. **One public name per tool, for life.** Codenames stay in repositories.
   The public never meets two names for one thing.
2. **Bare names in prose and on opus.ro.** "Loop", not "OPUS Loop". The store
   display name may carry the namespace (Loop's already does); decide per tool
   at listing time and never change it.
3. **A tool's one line is fixed text.** Identical on opus.ro, in the App
   Store, in the app's About screen and in any post. One source: the product
   entry in the website's content collection.
4. **Names are cleared before they are said.** Trademark search in classes 9
   and 42 before a name appears on any public surface.
5. **Retired, never to reappear publicly:** CyniCal, 1st°, 1st Degree,
   ass.network, ASSN, Agora, civical, Minimus.

## 4. Status vocabulary

Three states, in these words.

| State | Means | Appears |
|---|---|---|
| **available** | In the App Store (or on the web) now. | Full page, tile on home. |
| **in the works** | Being made; something real exists to show. | Page with what exists and no more; tile on home. If the name is not yet public, one sentence on the story page instead. |
| **imagined** | An idea we intend to make. | One sentence on the story page at most. |

- **No "coming soon" dead ends.** A tool with nothing to show has no page.
- **No dates in public.** "In the works" is as precise as the studio gets.
- **A `listed` flag, not a deletion.** A page can exist and be built without
  being linked. Flipping one flag lists it.

## 5. The tool page template

Same bones on every tool page, in this order. Warm, factual, unpreachy.

1. **Mark, name, one line.** The dictionary component may open it.
2. **What it is for.** Three to five sentences. The need, then the tool.
3. **The plain facts.** Short lines, each a fact with its mechanism, in the
   register of a good product label rather than a manifesto:
   - "Free. Extras are optional."
   - "No account. There is nothing to sign up for."
   - "Works offline. The timer, the sounds and your history live on your
     phone."
   - "What leaves your phone: anonymous usage counts via TelemetryDeck, and
     nothing else. Here is the list."
4. **Get it.** App Store, web version, platforms, price in plain words.
5. **Notes about it.** The studio's notes filtered to this tool.
6. **Privacy and help.** Links, and the one studio email.

Screens and recordings sit beside the text, never instead of it. A page reads
completely with images off.

## 6. Inside the tools

- **About screen:** "Made by OPUS in Romania." linking to opus.ro (not to the
  support page). The tool's one line. The plain fact of what it costs and what
  it sends, stated as information.
- **One support address.** `hello@opus.ro` everywhere; `support@opus.ro`
  stays as an alias. Loop's app string changes at the next release.
- **Release notes in one voice.** Loop's `CHANGELOG.md` is already honest
  prose. That is the source for the App Store "What's New", the note on
  opus.ro, and any post.

## 7. Consistency work (as of 2026-09-05)

| Where | What | Fix |
|---|---|---|
| opus.ro dock, modal | "1st°" with Lorem ipsum and "Launching soon" | Remove; Chéri gets a real page in phase 3 |
| opus.ro `index.html` | Keywords "cynical", "ass.network"; og:image pointing at a missing file | Remove; real image |
| Loop, App Store Connect | Free with one preset plus $4.99 IAP | Free; preset limit removed; paid users thanked and given future extras (phase 2) |
| opusloop.co | Copy and design built around "$4.99 once"; hero framed against subscriptions | Rewrite for free plus support; soften the competitor framing; refresh design to the shared tokens (phase 2) |
| Loop PWA (web player) | Works on any device; needs delight and polish | Design pass; move under opus.ro when the domain plan lands (phase 3) |
| Loop app vs sites | `support@opus.ro` vs `hello@opus.ro` | One address, one alias |
| Loop IAP copy | "unlock unlimited presets" | Goes away with the free model |
