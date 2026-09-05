# 04 · System

The online system OPUS runs on: which surfaces exist, what each is for, how
they connect, where the money comes from and goes, and the rhythm that keeps it
alive without becoming a second job. Designed for one person with collaborators.

---

## 1. Principles

1. **Own the place.** Everything canonical lives on a domain we own and in a
   git repository. Platforms (App Store, YouTube, Instagram, Patreon) are
   doorways to it, never the home of anything.
2. **One stack, one command.** Static sites from Markdown with Astro, deployed
   by one command, as eratic.ro already works. No CMS, no database, no admin
   panel. Publishing is writing a file.
3. **The work is the content.** Most notes come from things already written in
   the course of making: changelogs, decision records, design specs. A quiet
   month is a quiet month. (A planned first batch exists to reopen the notes
   properly; see §6.)
4. **One-way doors.** eratic.ro may mention OPUS. OPUS never links, names or
   points to eratic.ro. The two share no analytics, no mailing list, no
   accounts, no git identity.
5. **Everything can be dropped gracefully.** No public promise of a cadence.
   No empty section shown to the public; it stays unlisted until real.
6. **Few third-party requests, all stated.** Fonts, images, video and scripts
   are served from our own domains. The exceptions are the traffic counter and
   the support provider's button, each named on `/privacy`. A
   Content-Security-Policy enforces the list.
7. **Honesty over purity.** Where a constraint forces an exception (App Store
   rules, TelemetryDeck in Loop, the counter), the exception is stated in plain
   words where it applies.

## 2. The map

| Surface | Role | What lives there | Source of truth |
|---|---|---|---|
| **opus.ro** | The studio | Story, the tools, notes, support, work, contact, privacy. Feeds. | This repository, rebuilt (05 · Website) |
| **opus.ro/loop, loop.opus.ro** | Loop's home and its web version (PWA) | The tool page on opus.ro; the PWA on the subdomain; help, privacy, terms | This repository after phase 3; `chrisfertu/loopweb` until then |
| **opusloop.co** | Legacy | Redirects to the above once the app's associated domains include opus.ro. Kept registered for years. | DNS |
| **App Store** | The shop | Listings. Copy from the deck, one line per tool fixed. | 05 · Website §Copy deck |
| **hello@opus.ro** | The door | Every question, bug and thank-you. `support@` is an alias. `c@opus.ro` is the founder's business address and is never published. | Mail provider |
| **Notes and the letter** | The only push channel | Notes on opus.ro; delivered by email to people who asked. | RSS from opus.ro; a provider forwards it (§5) |
| **opus.ro/support** | Patronage | Why, what it funds, how. Provider links behind it; the URL never changes. | This repository |
| **Patreon (if chosen)** | Doorway and conversation | Notes cross-posted for comments; the community layer if wanted. Nothing exists only there. | Manual after publishing |
| **YouTube @opusro, Instagram opus.ro** | Doorways | Release recordings, images, pointing back. | Manual |
| **GitHub** | Code | Tool repositories (private); this repository (public later, D12). | Git |
| **makefuture.ro** | The lab | Experiments, R&D, education, community. A separate and, for now, somewhat imaginary entity meant to become a non-profit. OPUS is its first funder. | `chrisfertu/makefuture.io`, being moved |
| **eratic.ro** | The person | Essays, photographs. Pseudonymous. | Separate repository and server |

Three front-end stacks exist today. The target is one: Astro for opus.ro
now, loopweb folded in as a second site later (phase 3), eratic.ro separate on
purpose.

### Domains

- **opus.ro** is the studio. Tool pages at `opus.ro/loop`, `opus.ro/cheri`.
- **The owner does not like the `.co`** and Loop's web version deserves a home
  under the studio. Target: page at `opus.ro/loop`, PWA at `loop.opus.ro`
  (a subdomain keeps the PWA's own manifest, service worker and scope clean).
- **Order of operations, because the App Clip and universal links depend on
  `opusloop.co`'s `apple-app-site-association` file:**
  1. Ship a Loop release whose associated domains include `loop.opus.ro` and
     `opus.ro`, and whose App Clip invocation URLs are registered for both.
  2. Serve the AASA file from `loop.opus.ro` and `opus.ro` as well as
     `opusloop.co`.
  3. Wait one release cycle so most installs carry the new entitlement.
  4. Move the PWA to `loop.opus.ro`; redirect `opusloop.co/*` permanently;
     keep serving the AASA file at `opusloop.co` indefinitely.
- **New tools get a page on opus.ro first** and a domain only if a web feature
  needs one.
- **agoresti.ro** stays infrastructure for inOras's API.

## 3. Boundaries

### OPUS and eratic.ro

- **No links, no names.** The opus.ro build fails if any output HTML contains
  `eratic`. Cheap, and it makes the rule a mechanism.
- **No shared services.** Separate mail, DNS accounts where practical, no
  shared counter, separate lists, separate payment accounts.
- **Separate git identities and servers.** eratic commits as `eratic`; OPUS
  under the founder's normal identity. eratic.ro on its own VPS; opus.ro on
  GitHub Pages.
- **The founder on opus.ro is "C."** with role, years and city, once. Nothing
  more, on either the story or the work page. eratic's essays already carry
  details a determined reader could line up; the company side does not help.

### OPUS and Make Future

Make Future (makefuture.ro) is an experimental lab: playing with ideas the
future should be built on, for research, education and community. It is
detached from OPUS today and meant to become an NGO. The relationship is
financial: OPUS supports Make Future. On opus.ro this appears as one line, in
the story and on the support page, once Make Future has something to point at.
Until then, nothing. Make Future never appears as a brand of OPUS; it is a
thing OPUS funds.

### OPUS and clients

Design work appears under Work. Client names and screens only with written
permission. The principles apply to client work as far as the client allows,
shown through the work rather than stated.

## 4. The value exchange

Tools made without a business model inside them; a studio that has to be paid
for some other way. Three sources, one destination beyond the studio.

### Tools: free, or honest once

- **Loop is free.** Everything the tool needs is in the free tool. Extras
  (sound packs, background packs) are delight, offered quietly, never
  prompted during a session, never something the free tool is worse without.
  People who paid for Loop before it went free are thanked in the app and get
  every future extra included.
- **Chéri is paid once**, in the €19 to €29 band, giftable.
- **inOras** decides at listing time, within the same frame.
- Nothing inside a tool asks for money after the fact, except a quiet row in
  Settings: extras where they exist, and a way to support the studio.

### Studio: patrons

- **Funds:** the time to make tools this way and keep the shipped ones cared
  for, and Make Future's share.
- **Never buys:** features, early access others will not get, priority in
  support, influence over design decisions. The moment supporters get product
  advantages, the tool has a business model in it again.
- **Patrons get:** the notes, by email, when there is something to say; early
  builds to try (testing, and it says so); a place to talk with us about the
  notes (the Patreon post is the comment section, if Patreon is chosen); their
  name in the thanks if they want it; a plain yearly account of what came in
  and what it went to.
- **Where:** `opus.ro/support` is the only address anyone is given. Providers
  sit behind it and can change.
- **Provider** is the owner's call (D4). Trade-offs:

  | Provider | For | Against |
  |---|---|---|
  | Patreon | Known, has posts and comments (the "comment section" the owner wants), monthly by default | 8 to 12 percent plus payment fees; the relationship is theirs |
  | Ko-fi | One-off and monthly, low fee, simple | Less known in Europe |
  | Stripe Payment Links | We own everything, one-off and recurring | No comments, no community; we write our own thank-yous |

  Given the owner's wish for a place to comment on notes, Patreon is the
  natural first choice, with a support button on every note pointing at
  `opus.ro/support`. Stripe links can be added under the same URL later.

### Studio: design work

- On `opus.ro/work`: what OPUS does for startups, for whom, how, two or three
  named pieces with permission, the email. No rate card, no form.

### Make Future

- A fixed share of what the studio earns (support plus tools plus work) goes to
  Make Future. The share is the owner's number (D19). The yearly account on the
  support page shows it.

### App Store rules, in one paragraph

Apple's guideline 3.1.1 forbids steering people to buy digital features
outside the store, and treats developer tips as digital purchases. So: apps
link to `opus.ro` or their own page, never to `/support`; supporting the studio
from inside an app is a consumable in-app purchase in Settings; extras are
ordinary in-app purchases. Comment-section links to Patreon go on the website's
notes, not in the apps.

## 5. Tooling

| Need | Choice | Why |
|---|---|---|
| Site generator | Astro, static output | The eratic pattern; content collections with typed frontmatter; feeds built in |
| Hosting for opus.ro | GitHub Pages (already configured) | Zero operations. CSP goes in a `<meta>` tag since Pages sets no headers |
| Fonts | Self-hosted Fontsource packages | No Google Fonts request |
| Traffic counts | A cookieless, privacy-first counter that needs no consent banner. Recommendation: **Plausible** (EU-hosted, cookieless, no personal data, about €9 a month, one small script). Free alternative: **GoatCounter** (open source, hosted free for personal-scale sites). Both are stated on `/privacy` and allowed in the CSP. | The owner wants a feel for traffic, no personal data, and nothing that needs a banner. Both fit. Self-hosting Umami would need a server, and the only spare one is eratic's, which the boundary forbids |
| Email for the letter | Buttondown (RSS-to-email, Markdown, tracking off) or nothing at first | RSS first; email when anyone asks |
| Comments | Patreon posts, if Patreon is the provider; otherwise none | The owner's stated preference; no comment widget on the site (third-party, moderation, CSP) |
| Video | Self-hosted MP4 for short clips; YouTube linked, not embedded | Embeds bring third-party scripts |
| Email inbox | `hello@opus.ro`; `support@` alias; `c@opus.ro` private | One address on every surface |
| Source | This repository; public later (D12) | The repository is the proof behind the privacy page |

## 6. Rhythm

The rhythm is designed so that skipping it costs nothing and doing it costs
almost nothing, because the words mostly already exist.

### Reopening the notes: the first batch

The owner wants the blog back with a planned batch of five to ten posts: some
timely, some evergreen, some about the tools and the work. Briefs for that
batch are in 05 · Website §9. They are written over phases 1 and 2, published
two or three at a time so the section reads alive rather than dumped, and each
is cross-posted to Patreon (if chosen) as the place to comment.

### When a tool ships a version

1. The changelog prose becomes a note (`kind: release`, `tool: loop`).
2. Shortened for the App Store "What's New".
3. One post per doorway linking to the note; the Patreon post for comments.
4. The letter goes out by itself from the feed.

### When a decision is worth explaining

A decision record becomes a note (`kind: decision`), in first person, with
humility. Why Loop is free. Why Chéri has no "lend". Why there is no server.

### Quarterly, roughly

The letter to patrons (`kind: letter`): what got made, what is in the works,
what came in and went to. Reread 02 · Brand §2 and §3 against the quarter.

### Yearly

The plain account of money on the support page, Make Future's share included.
Reread the story page and the principles (03 · Products §1): question each one
on purpose; record any bend.

### Never

- A promised weekly or monthly anything on the company side.
- A post that exists only on a platform.
- A note written to fill a gap.

### Checklists

**A new version of a tool**

- [ ] Changelog prose in the studio voice, vocabulary checked
- [ ] Note on opus.ro with `tool:` set
- [ ] App Store "What's New" from the same text
- [ ] About screen still true (price, what it sends, address)
- [ ] Doorway posts; Patreon post for comments

**A new tool becomes public**

- [ ] Name cleared (classes 9 and 42) and released for public use by the owner
- [ ] One line fixed in the product entry
- [ ] Accent chosen, passes contrast on ground
- [ ] Tool page from the template, `listed: false` until real
- [ ] Privacy statement in plain words, including any exceptions
- [ ] App Store listing from the copy deck
- [ ] About screen in the family pattern; `hello@opus.ro`
- [ ] First note: what it is and why it exists
- [ ] Flip `listed: true`

**Adding a channel, service or platform**

- [ ] Can it be removed without breaking a page?
- [ ] Does it add a third-party request? If yes, is it on `/privacy` and in
      the CSP?
- [ ] Is the canonical copy on opus.ro?
- [ ] Does it touch eratic.ro in any way? If yes, stop.
