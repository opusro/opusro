# 04 · System

The online system OPUS runs on: which surfaces exist, what each is for, how
they connect, where the money comes from, and the rhythm that keeps it alive
without becoming a second job. Designed for one person with collaborators,
optimised for being easy to keep true.

---

## 1. Principles

1. **Own the place.** Everything canonical lives on a domain we own and in a
   git repository. Platforms (App Store, YouTube, Instagram, Patreon) are
   doorways to it, never the home of anything. Nothing exists only on a
   platform.
2. **One stack, one command.** Static sites built from Markdown with Astro,
   deployed by one command, exactly as eratic.ro already works. No CMS, no
   database, no admin panel, no login. Publishing is writing a file. The owner
   already knows this stack and has written its runbooks; reuse that
   knowledge rather than learning a second system.
3. **The work is the content.** Notes come from things already written in the
   course of making: changelogs, decision records, design specs. There is no
   content calendar. A quiet month is a quiet month.
4. **One-way doors.** eratic.ro may mention OPUS. OPUS never links, names or
   points to eratic.ro. The two share no analytics, no mailing list, no
   accounts, no git identity. See §3.
5. **Everything can be dropped gracefully.** No public promise of a cadence.
   No section that shows an empty state to the public; it stays unlisted
   until real. No service whose removal would break a page.
6. **No third-party requests on our pages.** Fonts, images, video and scripts
   are served from our own domains. A reader's browser talks to us and nobody
   else. This is enforced with a Content-Security-Policy, not promised in a
   footer.
7. **Honesty over purity.** Where a constraint forces an exception (the App
   Store's rules, TelemetryDeck in Loop, a payment provider's script on the
   support page), the exception is stated in plain words on the page it
   affects.

## 2. The map

| Surface | Role | What lives there | Source of truth |
|---|---|---|---|
| **opus.ro** | The studio | Story, the tools, notes, support, work, contact, privacy. Feeds for notes. | This repository, rebuilt (05 · Website) |
| **opusloop.co** | Loop's own home | Web player, help, privacy, terms, the Apple app-site-association file | `chrisfertu/loopweb` |
| **App Store** | The shop | Listings for each tool. Copy comes from the copy deck, one line per tool fixed. | 05 · Website §Copy deck |
| **hello@opus.ro** | The door | Every question, every bug, every thank-you. One inbox. | Mail provider |
| **The letter** | The only push channel | Notes, delivered by email to people who asked. Never anything that is not already on opus.ro. | RSS from opus.ro; an email provider forwards it (§5) |
| **opus.ro/support** | Patronage | Why, what it funds, what it never buys, how. Provider links behind it. | This repository; the provider can change without the URL changing |
| **YouTube @opusro, Instagram opus.ro** | Doorways | Release recordings, design notes as images, pointing back. Nothing posted there that does not exist on the site. | Manual, after a note is published |
| **GitHub** | Code | Tool repositories (private), the site repository (could be public: it would be the mechanism behind the privacy claims). | Git |
| **eratic.ro** | The person | Essays, photographs, favourites, the weekly list. Pseudonymous. | `chrisfertu/eratic`, separately deployed on its own server |
| **makefuture.io** | The lab | Games and experiments. Unlisted; not a brand to maintain. | `chrisfertu/makefuture.io` |

Three stacks currently exist for one person: React/Vite (opus.ro), React/Vite/Tailwind
(opusloop.co), Astro (eratic.ro). The target is one: Astro for opus.ro now,
opusloop.co folded into the same repository later as a second site sharing
tokens and components but keeping its domain (05 · Website §Migration, phase 4).
eratic.ro stays a separate repository and server on purpose.

### Domains

- **opus.ro** is the studio. Tool pages live at `opus.ro/loop`, `opus.ro/cheri`.
- **opusloop.co** stays. The App Clip and universal links depend on the
  `apple-app-site-association` file at that domain; moving it means shipping
  an app update with new associated domains first, and then redirecting.
  Not worth doing until there is a reason. If it is ever done, the order is:
  add `opus.ro` to the app's associated domains, ship, wait a release cycle,
  then redirect `opusloop.co/*` to `opus.ro/loop/*` keeping the AASA file
  served from both.
- **New tools get a page on opus.ro first**, and a domain only if a web feature
  needs one (Loop's web player is such a feature). A domain is a maintenance
  cost forever; a page is a file.
- **agoresti.ro** exists for Agora's API. It stays infrastructure until the
  product is real.

## 3. Boundaries

### OPUS and eratic.ro

The owner's rule: the personal site may refer to the company; the company site
never links to the personal one. The mechanics that make it hold:

- **No links, no names.** opus.ro contains no link to eratic.ro, no mention of
  "eratic", and no link to any eratic feed. Check with a grep in the build:
  the site build fails if `eratic` appears in output HTML. (Cheap, and it turns
  the rule into a mechanism.)
- **No shared services.** Separate mail domains, separate DNS accounts if
  practical, no shared analytics (opus.ro has none anyway), separate
  newsletter lists if the letter exists, separate payment accounts.
- **Separate git identities.** eratic commits as `eratic <hello@eratic.ro>`
  already. OPUS repositories commit under the founder's normal identity.
  Never push to both from a session configured for one.
- **Separate servers.** eratic.ro runs on its own VPS. opus.ro deploys to
  GitHub Pages (or its own box). They never share a Caddy config, a
  certificate, or a release directory.
- **The asymmetry has a cost.** eratic.ro's essays already say things
  (eighteen years of mobile design, first own app in the App Store, Romanian,
  a Leica) that a determined reader can line up with the founder's name on
  opus.ro. eratic's own privacy doc accepts this: the goal is not anonymity
  against a determined adversary. The company side helps by keeping the
  founder's specifics sparse: name, role, years, city. No biography, no
  photographs of him, no personal anecdotes. Those belong on his side of the
  door if he wants them anywhere.

### OPUS and makefuture.io

Make Future was, in the 2025 notes, an umbrella mission above OPUS with a
foundation, a market, a gallery and a chat. Three brands for one person is two
too many. Recommendation (06 · Decisions): keep makefuture.io as an unlisted
playground for experiments and games, remove its "creative technology
collective" framing, and let the mission live as one paragraph in OPUS's story.
If a foundation ever becomes real, it gets its own documents then.

### OPUS and clients

Design work for startups appears on opus.ro under Work. Client names and
screens appear only with written permission. The constitution applies to
client work as far as the client allows, and the Work page says so: that is the
filter that brings the right clients.

## 4. The value exchange

The owner's aspiration is a studio supported the way an artist is: people who
value the work keep it going. The tools are made without a business model in
them. The design below keeps that true while being honest about the three
places money actually comes from.

### Tools: honest, once

- Each tool has one price, paid once, or is free. The price is what it costs to
  keep the tool alive and cared for, and the page says that in those words.
- Free tiers exist only where they are complete in themselves (Loop's one
  preset is a whole tool). A free tier that nags is a subscription with extra
  steps.
- Nothing inside a tool asks for money after the purchase, except a paid-upfront
  tool's quiet "give this to someone" row.

### Studio: patrons

- **What patronage funds:** the time to make tools without a model in them,
  and to keep the shipped ones cared for.
- **What it never buys:** features, early access to features that others will
  not get, priority in support, influence over the design law, a vote. The
  moment patrons get product advantages, the product has a business model in
  it again, and the whole thing inverts.
- **What patrons get:** the letter; early builds through TestFlight where a
  tool is in the works (this is testing, not privilege, and it says so); their
  name in the thanks on opus.ro if they want it there; once a year, a plain
  account of what came in and what it went to.
- **Where it lives:** `opus.ro/support` is the only address anyone is ever
  given. Behind it sit one or two providers. Providers change; the address
  does not.
- **Provider choice** is an owner decision (06 · Decisions). The trade-offs:

  | Provider | For | Against |
  |---|---|---|
  | Patreon | Known to everyone, has the community and posting features, monthly by default | 8 to 12 percent plus payment fees, the relationship is theirs, scripts on our page are theirs |
  | Ko-fi | One-off and monthly, low fee, simple | Less known in Europe, still a platform |
  | Liberapay | Non-profit run, recurring, EUR native, no platform fee | Small, austere, no community layer |
  | Stripe Payment Links | We own everything, one-off and recurring, no platform between | We write our own thank-you emails and our own patron list |

  Recommendation: Stripe Payment Links behind `opus.ro/support` if owning the
  relationship matters most; Patreon if the owner wants the community layer
  and accepts the fee. Not both at launch.

### Studio: design work

- Presented on `opus.ro/work` as what it is: OPUS designs mobile products for a
  small number of startups that want them made this way.
- The page carries the approach (the constitution, as it applies to client
  work), who it suits, two or three named pieces of past work with permission,
  and the email. No rate card; that conversation is private.

### App Store rules, in one paragraph

Apple's guideline 3.1.1 forbids an app from steering people to buy digital
features outside the store, and Apple treats developer "tips" as digital
purchases needing in-app purchase. Donations to a for-profit studio through a
link from inside an app are a review risk. So: apps link to `opus.ro` or to
their own tool page, never to `/support`. The support page is reached by people
reading the site. If an in-app way to support the studio is ever wanted, it is
a consumable in-app purchase (a tip jar) and it lives in Settings, quietly.

## 5. Tooling

| Need | Choice | Why |
|---|---|---|
| Site generator | Astro, static output | The eratic pattern; no client JavaScript unless a page asks; content collections with typed frontmatter; RSS and JSON Feed built in |
| Hosting for opus.ro | GitHub Pages (already configured) | Zero operations, free, deploy on push. The trade-off is that it cannot set HTTP headers, so the CSP goes in a `<meta>` tag. Fine for a static site. Alternative: the eratic-style VPS with Caddy if headers ever matter |
| Fonts | Self-hosted Fontsource packages | No Google Fonts request; the eratic setup already has the recipe including the small-asset inlining trap |
| Analytics | None | The values say so, and Apple's App Store Connect already gives download and sales numbers, which are the ones that matter. If page counts are ever wanted, a cookieless server-side counter, stated on `/privacy` |
| Email for the letter | Buttondown (RSS-to-email, Markdown, tracking optional and off) or nothing at first | RSS first; email is a convenience for people who ask. One list, opt-in, no pixels |
| Video | Self-hosted MP4 for short clips; YouTube as a doorway, linked not embedded | Embeds bring third-party scripts; the CSP would block them anyway |
| Email inbox | `hello@opus.ro` | One address on every surface; `support@opus.ro` becomes an alias |
| Patronage | See §4 | |
| Source | This repository, `opusro/opusro` | Consider making it public once rebuilt: the repository is the proof behind "no third-party requests" |

## 6. Rhythm

The rhythm is designed so that skipping it costs nothing and doing it costs
almost nothing, because the words already exist.

### When a tool ships a version

1. The release note is already written in the tool repository's `CHANGELOG.md`
   in the studio voice. Copy it into a note on opus.ro (`kind: release`,
   `tool: loop`). It appears on the tool's page and in the feed.
2. Shorten it for the App Store "What's New".
3. One post on each doorway (YouTube if there is a recording, Instagram if
   there is an image) linking to the note. Same words.
4. If the letter exists, it goes out by itself from the feed.

Time: twenty minutes, most of it already spent writing the changelog.

### When a decision is worth explaining

Some decisions in the tool repositories' `DECISIONS.md` files are interesting
to people outside: why Loop went from paid to free with one preset; why Chéri
has no "lend"; why there is no server. Each becomes a note (`kind: decision`).
No schedule. When one is worth it.

### Quarterly, roughly

The letter to patrons, as a note (`kind: letter`): what got made, what is in
the works, what came in and what it went to. This is also the moment to reread
02 · Brand §3 against everything published that quarter.

### Yearly

The plain account of money on the support page. A reread of the story page:
is it still true? Update the "as of" line in 03 · Products §7.

### Never

- A promised weekly or monthly anything on the company side. (eratic's `io` is
  weekly; that is the person's promise, not the studio's.)
- A post that exists only on a platform.
- A note written to fill a gap.

### Checklists

**A new version of a tool**

- [ ] Changelog prose in the studio voice, vocabulary law checked
- [ ] Note on opus.ro with `tool:` set
- [ ] App Store "What's New" from the same text
- [ ] About screen still true (price, promise, address)
- [ ] Doorway posts, linking to the note

**A new tool becomes public**

- [ ] Name cleared in classes 9 and 42
- [ ] One line fixed in the product entry
- [ ] Accent chosen, passes contrast on ground
- [ ] Tool page from the template, `listed: false` until real
- [ ] Privacy statement written in plain words, including law 10 exceptions
- [ ] App Store listing from the copy deck
- [ ] About screen in the family pattern
- [ ] `hello@opus.ro` in the app
- [ ] First note: what it is and why it exists
- [ ] Flip `listed: true`

**Adding a channel, service or platform**

- [ ] Can it be removed without breaking a page?
- [ ] Does it add a third-party request to our pages? If yes, is it stated on
      the page and on `/privacy`?
- [ ] Is the canonical copy of what it carries on opus.ro?
- [ ] Does it touch eratic.ro in any way? If yes, stop.
