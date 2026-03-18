# 1st° — MVP Product Specification

*A social tool, not a social network.*

---

## Vision

1st° is a personal curation and relationship tool that helps you save the things you discover, organize them around the people you care about, and share curated bundles — without servers, algorithms, or social network dynamics.

It is the opposite of a social network. No feed controlled by a machine. No likes, no followers, no engagement metrics. Just you, the things that catch your eye, and the people you want to share them with.

The app works as a single-player tool forever. It never requires anyone else to install it. It has no backend, no accounts, no dependency on the company existing. Your data lives on your device and your iCloud. The emails you send live in your friends' inboxes. Everything is self-contained.

---

## Core Philosophy

**Anti-social-network.** Social networks promise connection but optimize for attention. 1st° optimizes for intention. Every share is deliberate. Every bundle is curated. There is no passive consumption — only active curation.

**Connection through disconnection.** The irony at the heart of 1st°: you become a better friend by stepping away from the platforms that claim to connect you. The app helps you maintain relationships without social networking — through small, intentional tools instead of massive, extractive platforms.

**No server dependency.** The app's utility must never depend on the company being alive. As long as the app is on your phone, it works. Emails you've sent exist forever. Data lives on-device + iCloud. There is no hosted page, no API endpoint, no subscription service that can be switched off.

**Capture fast, organize later.** The moment you see something interesting is not the moment to think about who it's for or how to categorize it. Capture the impulse in 2 taps. Think later.

**Finite over infinite.** Your feed has an end. Your items are countable. There is always a clear picture of what you've saved and what's been shared. This is the opposite of the infinite scroll.

---

## Target Users

Adults (25–45) who discover interesting things online throughout the day — articles, memes, videos, products, recipes, music — and want to share them with specific friends, but not by interrupting their day with individual messages. Instead, they want to collect, curate, and send a thoughtful bundle on their own schedule.

Secondary: gift-givers who want to track physical gift ideas year-round alongside digital content they save.

---

## Information Architecture

```
1st°
├── Tab 1: My Feed
│   ├── All saved items (card or list view, switchable)
│   ├── Filter: All / Gifts / Data
│   ├── Filter: All People / Specific Person / Unassigned
│   ├── Sort: Newest first (default) / Oldest first
│   ├── Search
│   ├── Select mode → Bundle flow
│   └── Quick capture (input bar or + button)
│
├── Tab 2: People
│   ├── Self card (pinned at top — your wishlist + personal archive)
│   ├── Friend list (sorted by activity / alphabetical)
│   ├── Search
│   └── Friend Profile (drill-in)
│       ├── Profile header (photo, name, next upcoming date)
│       ├── Stat pills (gifts, data, unsent, bundles sent, connections)
│       ├── Connections (2nd degree — partner, kids, parents, etc.)
│       │   └── Connection mini-profile (name, relationship, dates, tagged items)
│       ├── Dates (birthdays + custom dates for friend and all connections)
│       ├── Feed of items tagged to this person + connections (card/list)
│       ├── Filter: All / Gifts / Data / Unsent / By Connection
│       ├── Select mode → Bundle flow (scoped to this person)
│       └── Input bar (DM-style quick capture, directly to this person)
│
├── Bundle Composer (sheet, triggered from Feed or Friend Profile)
│   ├── Selected items preview
│   ├── Add/remove items
│   ├── Bundle name (optional)
│   ├── Personal note
│   ├── Recipients (select friends)
│   ├── Delivery format: Email / PDF / Copy link list
│   └── Send → opens iOS Mail composer (or share sheet for PDF)
│
├── Share Extension (system-wide capture)
│   ├── Content preview (auto-generated)
│   ├── Type picker: Gift or Data (mandatory)
│   ├── Person picker (optional, multi-select)
│   └── Save → lands in My Feed
│
└── Settings
    ├── Profile (your name, email — used as sender identity)
    ├── Appearance (card/list default, dark mode)
    └── About / Philosophy
```

---

## Tab 1: My Feed

### Purpose

My Feed is your personal curated collection — everything you've ever saved, displayed like a social media profile. It is YOUR wall. The accumulated evidence of your taste, curiosity, and generosity. Browsing it should feel like scrolling your own Instagram profile, except every item has intention behind it.

### Layout

The feed supports two display modes, switchable with a toggle:

**Card view (default).** Full-width vertical cards with rich previews: hero image, title, description snippet, source domain, type badge, and tagged people with names. Readable, informative, visually rich. Best for browsing and curating — the experience of reviewing items before bundling, or just enjoying what you've collected. This is the default because the richness of the previews is a core part of what makes the app feel good.

**List view.** A compact, dense list — like Mail or an RSS reader. Each row shows: source favicon/icon, title (single line, truncated), source domain, type badge, and tagged people as small avatar dots. Minimal vertical space per item. Best for scanning a large collection quickly, searching for something specific, or bulk-selecting items for a bundle. When you have 80 items and need to find the whiskey article from two weeks ago, list view gets you there fast.

### Filters and Sorting

At the top of the feed, below the view toggle:

- **Type filter:** All / Gifts / Data — segmented control, always visible.
- **Person filter:** "All People" dropdown that expands to let you pick a specific friend or "Unassigned" (items not tagged to anyone). When a person is selected, the feed shows only items tagged to them.
- **Sort:** Newest first (default). Oldest first as an option.
- **Search:** Full-text search across titles, descriptions, URLs, and notes.

### Select Mode (for Bundling)

A "Select" button in the navigation bar activates multi-select mode. Items show a checkbox overlay. A floating bottom bar appears showing the count of selected items and a "Bundle" action button. Tapping "Bundle" opens the Bundle Composer sheet.

### Quick Capture

A persistent "+" button (floating action or in the navigation bar) that opens a capture sheet:

1. Paste a URL → auto-generates preview → pick type (gift/data) → optionally tag person(s) → save.
2. Type a text note → pick type → optionally tag → save.
3. Add from clipboard (if a URL is detected on clipboard, offer one-tap capture).

### Empty State

First-time users see a warm, personality-driven empty state:

> "Nothing here yet. That's fine — your feed fills up as you save things you find interesting. Try the share button in Safari next time you see something worth keeping."

---

## Tab 2: People

### Purpose

Your manually-curated list of people you care about. Not imported from contacts, not suggested by an algorithm. You add each person deliberately. This is your inner circle — your 1st degree. And through them, you can track the people in *their* lives who matter to you — their kids, partners, parents, close friends. That's your 2nd degree.

### People List

Each row shows:

- **Photo** (user-provided, or initials fallback)
- **Name**
- **Preview line** — the title/description of the most recently tagged item, truncated. Like a message preview in the Messages app. If no items yet: "No items yet."
- **Unsent count badge** — if there are items tagged to this person (or any of their connections) that haven't been included in a sent bundle, show a small count badge. This is the "you have things to share with them" nudge.
- **Connections indicator** — if the friend has connections (kids, partner, etc.), a subtle indicator showing their count. E.g., a small "+3" or tiny avatar cluster.

### Sorting

- **By activity** (default): friends with the most recent tagged items or the most unsent items appear first. Friends with no items drift to the bottom. This naturally surfaces the people you're actively curating for.
- **Alphabetical:** toggle for when you're looking for a specific person.

### Upcoming Dates Banner

At the top of the People list (below the self card), a compact banner showing the next 1–3 upcoming dates across all friends and their connections. Examples:

- "Emma's birthday in 3 days (Sarah's daughter)"
- "Dan's birthday next Tuesday"
- "Sarah & Mike's anniversary in 2 weeks"

Tapping a date navigates to the relevant friend's profile with the dates section open. This banner is the first thing you see on the People tab — a gentle nudge that turns saved gift ideas into timely action.

### Self Card (Your Wishlist & Personal Archive)

The first entry in the People list is always **you**. Created automatically at first launch, pinned to the top, not deletable. Your self-card looks like any friend's profile — same layout, same feed, same stat pills, same bundle flow — but serves a different purpose.

**As a wishlist:** Tag gift ideas to yourself throughout the year. When someone asks "what do you want for your birthday?" → open your profile → select your gift items → bundle → email it to them. Your wishlist is always current because you've been adding to it organically. Same bundle composer, same HTML email, same PDF option. The recipient gets a beautiful, curated list of things you actually want — with links, images, and prices.

**As a personal archive:** Tag data items to yourself for things you want to keep but aren't meant for anyone else. Articles to read later, recipes to try, music to revisit. Your self-profile becomes a private bookmark collection displayed in the same visual language as everything else in the app.

**Visual treatment:** Your photo with a subtle "You" label or a distinct accent to differentiate it from friend entries. The stat pills on your self-profile emphasize the wishlist: "🎁 X wishlist items" instead of "X gifts."

**In the person picker (share extension, tagging, etc.):** "Me" appears as the first option, above your friends list. Tagging something to "Me" as a gift = adding it to your wishlist.

### Adding a Friend

Tap "+" → a simple form:

- Name (required)
- Photo (optional — camera, photo library, or skip)
- Birthday (optional — just month and day, with optional year for age calculation)

That's it. No phone number, no email, no relationship label (you know who they are to you). The friend's profile is enriched by the items you tag to them and the connections you add over time, not by a data entry form.

### Friend Profile (Drill-In)

Tapping a friend opens their profile — the DM-like view. This is the most important screen in the app after My Feed.

#### Profile Header

A compact, always-visible header at the top:

- **Photo + Name**
- **Next date** — if any upcoming date exists (their birthday, their kid's birthday, their anniversary), show the nearest one prominently: "Emma's birthday in 12 days" or "Birthday in 3 days". Tappable to open the dates view.
- **Stat pills** (tappable, horizontally scrollable):
  - 🎁 **X gifts** — count of gift-type items tagged to them or their connections
  - 📦 **X data** — count of data-type items tagged to them
  - ✉️ **X unsent** — count of items not yet included in a sent bundle (this is the key action driver)
  - 📬 **X bundles sent** — count of bundles you've sent to them (tapping opens sent bundle history)
  - 👥 **X connections** — count of 2nd degree connections (tapping opens connections list). Only shown if connections exist.

Tapping a stat pill filters the feed below to show only that category.

#### Connections (2nd Degree)

Accessible from the connections stat pill or a dedicated section on the profile. Shows the people in your friend's life that you've added:

Each connection shows:
- **Name** (e.g., "Emma")
- **Relationship to your friend** (e.g., "daughter," "husband," "mom," "best friend")
- **Next date** if any (e.g., "Birthday Apr 3")
- **Item count** — gifts or data tagged to this connection

Tapping a connection opens a mini-profile: their name, relationship, dates, and a feed of items tagged to them. This mini-profile uses the same card feed and input bar pattern as the main friend profile — just scoped to the connection.

**Adding a connection:** A "+" button on the connections list. Simple form:
- Name (required)
- Relationship to your friend (required — freeform with suggestions: "daughter," "son," "partner," "husband," "wife," "mom," "dad," "friend," etc.)
- Birthday or other date (optional)

**Why this matters:** Half the gifts you buy aren't for your direct friends — they're for their kids, partners, parents. "What should I get for Sarah's daughter Emma for her birthday?" is a question this app should answer. And the answer is right there: the gift ideas you tagged to Emma over the past year.

**Cross-connections:** A connection can optionally be linked to another friend in your People list. If Sarah's husband Mike is also your friend (a 1st degree entry), you can link the connection "Mike (Sarah's husband)" to the Person entry "Mike." This creates a visible relationship web without requiring a complex graph UI — it's just a subtle "Also: Mike in your People list" link on the connection.

#### Dates

Dates are tied to the friend and their connections. A dedicated dates section (accessible from the "next date" area on the profile header) shows all dates for this person and their circle:

- **Their birthday** (set when adding the friend, editable here)
- **Connection birthdays** (each connection can have dates)
- **Custom dates** — anniversaries, name days, kids' first day of school, surgery recovery check-in, anything meaningful. Each date has:
  - Label (freeform — "Anniversary," "Emma's birthday," "Surgery — check in after")
  - Date (month + day, optionally year)
  - Recurring (yes/no — birthdays recur, a surgery date doesn't)
  - Reminder (how far in advance to notify — 1 day, 3 days, 1 week, 2 weeks)

Dates surface throughout the app:
- On the friend's profile header as the "next date" line
- On the People list as a secondary indicator when a date is imminent
- As local push notifications at the configured reminder interval

#### Friend Feed

Below the header, a scrollable feed of all items tagged to this person AND their connections. Same card/list toggle as My Feed. Same filter options (All / Gifts / Data), plus additional filters: **Unsent** (items not yet bundled) and **By connection** (filter to see only items for Emma, only items for Mike, etc.).

Items are displayed newest first by default.

#### Bundle From Profile

A prominent action area when unsent items exist. Could be:

- A persistent banner below the stat pills: **"8 items unsent — Pack a bundle?"** Tapping enters select mode with unsent items pre-selected.
- Or: the same "Select" button as in My Feed, but here the scope is automatically limited to this person's items.

Either way, the flow leads to the Bundle Composer sheet, pre-populated with the selected items and this person as the recipient.

#### DM-Style Input Bar

A persistent input bar at the bottom of the friend profile, styled like a message composer:

- **Text field** — type or paste. If a URL is pasted, auto-detect and show a preview.
- **Type picker** — small segmented control or icon toggle next to the text field: Gift / Data. Defaults to Data.
- **Send/Save button** — saves the item, tagged to this person, in My Feed AND visible in this person's feed.

The input bar is the fastest path for "I'm thinking of Sarah and I want to save this for her right now." No navigation, no sheet, no extra taps.

#### Sent Bundles History

Accessible from the "X bundles sent" stat pill. A chronological list of bundles you've sent to this person:

- Bundle name (or "Untitled bundle — Mar 12")
- Number of items
- Date sent
- Tap to expand and see the items that were in that bundle

---

## The Card System

Cards are the atomic building block of the entire app. Every item you save is a card. Cards render identically everywhere — in My Feed, in a friend's profile feed, in the bundle composer preview, in sent bundle history. One component, many contexts.

### Card Anatomy

Every card has:

| Field | Required | Description |
|-------|----------|-------------|
| **Type** | Yes | `gift` or `data` — set at capture time, changeable later |
| **Content** | Yes | A URL, or freeform text if no URL |
| **Title** | Auto/Manual | Auto-extracted from URL metadata (og:title), or user-typed for text entries |
| **Description** | Auto | Auto-extracted from URL metadata (og:description). May be empty for text entries. |
| **Image** | Auto | Auto-extracted from URL metadata (og:image). Falls back to favicon or domain icon. May be empty. |
| **Source domain** | Auto | Extracted from URL (e.g., "youtube.com", "instagram.com", "amazon.com"). Empty for text entries. |
| **People tags** | Optional | Zero or more friends this item is tagged to. An item can be tagged to multiple people and/or their connections (2nd degree). |
| **Created date** | Auto | Timestamp of capture |
| **Sent status** | Per-person | For each tagged person: has this item been included in a bundle sent to them? Boolean per person-tag. |
| **Price** | Optional | For gift-type items. Freeform text or number. Shown as a badge on the card. |
| **Note** | Optional | A personal annotation. "Sarah mentioned she loves this brand." Shown below the preview on the card. |

### Card Display — List Mode

A single row, compact height (~60pt), showing:

- **Left:** Source favicon or platform icon (16×16 or 20×20)
- **Center:** Title (one line, bold, truncated) + source domain (secondary text, smaller)
- **Right:** Type badge (small gift/data icon) + tagged people as tiny avatar dots (max 2, "+N" overflow)
- If it's a gift with a price, the price appears as a subtle label next to the type badge

### Card Display — Card Mode

A full-width card showing:

```
┌──────────────────────────────────┐
│ ┌──────────────────────────────┐ │
│ │                              │ │
│ │       Preview Image          │ │
│ │                              │ │
│ └──────────────────────────────┘ │
│                                  │
│  Title of the Article or Item    │
│  Short description text that     │
│  gives you context...            │
│                                  │
│  youtube.com · Gift 🎁 · $45    │
│  → Sarah, Dan        3 days ago │
│                                  │
│  "She mentioned this brand"      │
│                                  │
└──────────────────────────────────┘
```

- **Hero image:** og:image, or a styled placeholder with favicon + domain.
- **Title:** bold, primary text.
- **Description:** secondary text, 2 lines max, truncated.
- **Metadata row:** source domain · type badge · price (if gift) — small, tertiary text.
- **People row:** avatar dots + names of tagged people · relative timestamp.
- **Note:** if present, shown in a distinct style (italic, or slightly indented with a quote-bar).

### Card Detail (Tap to Expand)

Tapping a card in either view opens a detail sheet:

- Full preview (image at full width, full title, full description)
- The source URL (tappable to open in Safari)
- Type: Gift / Data (editable — tap to switch)
- Tagged people and connections (editable — add/remove people and their connections)
- Price (editable, for gifts)
- Note (editable)
- Created date
- Sent history: "Sent to Sarah in 'Weekly finds' on Mar 12" / "Not yet sent"
- Actions: **Open URL** / **Edit** / **Delete**

### Platform-Specific Preview Enhancements

The `LinkPresentation` framework handles most URL metadata extraction. For key platforms, enhance the card with recognizable visual treatment:

| Platform | Enhancement |
|----------|-------------|
| YouTube / YouTube Shorts | Video thumbnail with duration badge, channel name |
| Instagram Reels/Posts | First frame or image, username |
| X (Twitter) | Tweet text preview, author handle, quote-tweet style card |
| Reddit | Post title, subreddit badge, vote count if available |
| Amazon / product links | Product image, price extraction, "Gift idea" suggestion |
| Spotify / Apple Music | Album art, song/playlist name, artist |
| Articles (generic) | Hero image, headline, publication name |
| Plain text (no URL) | Styled as a note card with the text as content |

These enhancements are progressive — basic metadata (og:image, og:title) works for any URL. Platform-specific parsing adds polish but isn't blocking.

---

## The Share Extension

The share extension is the primary capture mechanism. It must be the fastest path from "I found something interesting" to "it's saved in 1st°."

### Flow

1. User is in any app (Safari, Instagram, YouTube, X, Reddit, etc.)
2. Taps the iOS Share button → selects 1st° from the share sheet
3. The 1st° share extension opens as a compact sheet:

```
┌──────────────────────────────────┐
│  1st°                      Save  │
│                                  │
│  ┌──────────────────────────────┐│
│  │ Auto-preview of shared URL  ││
│  │ Title, image, domain        ││
│  └──────────────────────────────┘│
│                                  │
│  ┌─────────┐  ┌─────────┐       │
│  │  Gift   │  │  Data   │       │
│  │   🎁    │  │   📎    │       │
│  └─────────┘  └─────────┘       │
│                                  │
│  For: + Add people (optional)    │
│                                  │
└──────────────────────────────────┘
```

4. **Type selection (mandatory):** Two large, clear buttons — Gift or Data. One must be selected before saving. Default: Data (since most captures are links/content, not gift ideas).
5. **Person tagging (optional):** A "For:" row with a "+" button that opens a compact picker. "Me" appears first (tagging yourself = adding to your wishlist for gifts, or personal archive for data), followed by your friends in a searchable list. Selecting a friend reveals their connections as sub-options — so you can tag a gift directly to "Sarah → Emma (daughter)" in one step. Select zero, one, or multiple people/connections. Skipping is fine — the item lands in your feed unassigned.
6. **Save:** Tap "Save" (or the type button itself could act as save once selected). Extension dismisses. Done in 2–3 taps.

### What Gets Captured

The share extension receives the shared URL (and any shared text). It stores:

- The URL
- Any accompanying text (e.g., a quote selection from Safari)
- The type (gift/data) selected by the user
- The person tags (if any)
- A timestamp

Metadata extraction (title, image, description) happens asynchronously after save. The item appears in My Feed immediately with a loading placeholder that resolves into the full preview.

### Speed Target

The entire share extension interaction — from tapping 1st° in the share sheet to dismissing back to the source app — should take **under 4 seconds** in the common case (select type → save). Under 6 seconds if tagging a person.

---

## The Bundle Flow

Bundles are 1st°'s signature feature. A bundle is a curated package of items, assembled with intention, sent to one or more friends. It's a digital care package. A mixtape. The modern equivalent of clipping articles from a newspaper and mailing them to someone.

### Entry Points

Bundles can be created from two places:

1. **From My Feed:** Tap "Select" → pick items from your full collection → tap "Bundle."
2. **From a Friend Profile:** Tap the "X unsent" banner or enter select mode → pick items from that person's tagged items → tap "Bundle." The friend is auto-added as a recipient.

### Bundle Composer

A full-screen sheet with:

#### Selected Items Preview

A scrollable list of the items in this bundle. Each shows its card preview (image, title, domain). The user can:

- **Reorder** items by drag-and-drop (the order matters — it's the reading order for the recipient)
- **Remove** items with a swipe or tap on an "×"
- **Add more items** with a "+" button that opens a picker showing your feed (filtered to items not already in this bundle)

#### Bundle Details

- **Bundle name** (optional text field): "Weekly finds for Sarah" or "Memes from last week" or left blank (defaults to "Bundle — [date]")
- **Personal note** (optional text area): A message to the recipient. "Hey, been collecting these for you. The third one is wild." This appears at the top of the delivered bundle.

#### Recipients

- A row showing selected recipients as avatar chips. Tap "+" to add more from your friend list.
- If entered from a friend profile, that friend is pre-selected.
- Multiple recipients can be selected — the same bundle content goes to each.

#### Delivery Format

A segmented control or option list:

- **Email** (default, recommended): Generates a self-contained HTML email and opens the iOS Mail composer. The user sends it from their own email address.
- **PDF export:** Generates a styled PDF document of the bundle. Opens the iOS share sheet so the user can AirDrop it, save it to Files, or send via any channel.
- **Copy as text:** Generates a plain-text list of all URLs with titles. Copies to clipboard. For pasting into iMessage, WhatsApp, Telegram, etc.

#### Send Action

Tapping "Send" (for email) or "Export" (for PDF) or "Copy" (for text):

1. Generates the output format on-device (no server)
2. Opens the appropriate iOS system UI (Mail composer, share sheet, or copies to clipboard with confirmation)
3. After the user confirms sending in Mail (or dismisses the share sheet), the app:
   - Marks all items in the bundle as "sent" to each recipient
   - Saves the bundle in the sent history (for the sender's records)
   - Updates the unsent count on each recipient's profile

### Email Format

The generated email is a self-contained HTML email with inline CSS (no external stylesheets, no hosted images that depend on a server). Structure:

```
Subject: [Bundle name] — from [Your name] via 1st°

┌──────────────────────────────────────┐
│                                      │
│  [Your personal note, if provided]   │
│                                      │
│  ── ── ── ── ── ── ── ── ── ── ──   │
│                                      │
│  1. Article Title                    │
│     Short description...             │
│     ↗ nytimes.com                    │
│                                      │
│  2. YouTube Video Title              │
│     Channel name                     │
│     ↗ youtube.com/watch?v=...        │
│                                      │
│  3. Product Name — $45               │
│     Short description...             │
│     ↗ amazon.com/dp/...              │
│                                      │
│  ── ── ── ── ── ── ── ── ── ── ──   │
│                                      │
│  Curated with 1st° — a social tool,  │
│  not a social network.               │
│                                      │
└──────────────────────────────────────┘
```

**Key constraints:**

- All links are plain clickable URLs (no URL shorteners, no tracking, no redirects)
- No embedded images that require server hosting — use text-based formatting instead (titles, descriptions, source domains). If images are technically feasible as base64-encoded inline images without exceeding email client limits, include them; otherwise, prioritize clean text layout.
- The footer mentions 1st° with a subtle one-line description — this is the only organic growth mechanism. No hard sell, no "download the app" button. Just a quiet signature.
- The email must render well in Gmail, Apple Mail, Outlook, and any standards-compliant email client.

### PDF Format

A styled single-page (or multi-page) document:

- Bundle name as title
- Personal note below the title
- Each item as a card: title, description, URL, source domain
- Clean typography, generous whitespace
- Generated on-device using native iOS PDF rendering
- No external dependencies

---

## Data Model

### Core Entities

#### Item

The atomic unit of the app. Everything the user saves is an Item.

```
Item {
    id: UUID
    type: ItemType (gift | data)
    url: String? (optional — text-only items have no URL)
    title: String? (auto-extracted or user-entered)
    description: String? (auto-extracted)
    imageURL: String? (auto-extracted og:image — stored locally as cached image data)
    sourceDomain: String? (extracted from URL)
    note: String? (user annotation)
    price: String? (for gifts — freeform, e.g., "$45" or "around 50 euros")
    createdAt: Date
    updatedAt: Date

    // Relationships
    personTags: [PersonTag] (many — one per tagged 1st degree person, tracks sent status)
    connectionTags: [ConnectionTag] (many — one per tagged 2nd degree connection, tracks sent status)
    bundleItems: [BundleItem] (many — tracks which bundles this item has appeared in)
}
```

#### Person

A friend in the user's 1st degree circle (or the user themselves).

```
Person {
    id: UUID
    name: String
    photo: Data? (stored locally as image data)
    birthday: DateComponents? (month + day, optionally year for age calculation)
    isSelf: Bool (true for the auto-created self card — exactly one per app, not deletable)
    createdAt: Date

    // Relationships
    connections: [Connection] (many — 2nd degree people in this friend's life)
    dates: [ImportantDate] (many — custom dates beyond birthday)
    personTags: [PersonTag] (many — all items tagged to this person)
    recipientEntries: [BundleRecipient] (many — bundles sent to this person)
}

// Note: The Self person is created at first launch with isSelf = true.
// It always appears first in the People list and first in person pickers.
// Gift-type items tagged to Self = the user's wishlist.
// Data-type items tagged to Self = personal archive / read-later.
// The wishlist can be bundled and sent to others, just like any other bundle.
// No "relationship label" on Person — you know who your friends are.
```

#### Connection (2nd Degree)

A person in your friend's life. Not a top-level entry — always belongs to a Person.

```
Connection {
    id: UUID
    person: Person (the 1st degree friend this connection belongs to)
    name: String (e.g., "Emma")
    relationship: String (their relationship to your friend — "daughter", "husband", "mom", "best friend")
    birthday: DateComponents? (month + day, optionally year)
    linkedPerson: Person? (optional — if this connection is also a 1st degree friend in your People list)
    createdAt: Date

    // Relationships
    dates: [ImportantDate] (many — custom dates for this connection)
    connectionTags: [ConnectionTag] (many — items tagged to this connection)
}

// Example: Sarah (Person) has Connection "Emma" with relationship "daughter".
// Items can be tagged directly to Emma (a gift for Sarah's daughter).
// If Sarah's husband Mike is also in your People list, Connection "Mike"
// has linkedPerson pointing to the Mike Person entry.
```

#### ImportantDate

A date worth remembering, tied to a Person or a Connection.

```
ImportantDate {
    id: UUID
    person: Person? (the friend this date belongs to — nil if it belongs to a connection)
    connection: Connection? (the connection this date belongs to — nil if it belongs to a person)
    label: String (freeform — "Anniversary", "Name day", "Surgery — check in after", etc.)
    date: DateComponents (month + day, optionally year)
    isRecurring: Bool (birthdays recur, a surgery date doesn't)
    reminderAdvance: ReminderAdvance? (none | 1day | 3days | 1week | 2weeks)
    createdAt: Date
}

// Note: Birthdays are stored on the Person/Connection directly.
// ImportantDate handles everything ELSE — anniversaries, custom events, one-time dates.
// All dates (birthdays + ImportantDates) surface in the same UI and notification system.
```

#### PersonTag

The join entity between Item and Person. Tracks per-person sent status.

```
PersonTag {
    id: UUID
    item: Item
    person: Person
    taggedAt: Date
    isSent: Bool (has this item been included in a bundle sent to this person?)

    // Derived
    sentInBundle: Bundle? (the bundle that marked this as sent, if any)
}
```

#### ConnectionTag

The join entity between Item and Connection. Tracks per-connection sent status. Mirrors PersonTag but for 2nd degree.

```
ConnectionTag {
    id: UUID
    item: Item
    connection: Connection
    taggedAt: Date
    isSent: Bool (has this item been included in a bundle sent to this connection's parent person?)

    // Derived
    sentInBundle: Bundle? (the bundle that marked this as sent, if any)
}

// Note: Items tagged to a connection (e.g., a gift for Emma) are "sent"
// when included in a bundle to the connection's parent person (Sarah).
// The bundle goes to Sarah; it contains the gift for Emma.
```

#### Bundle

A curated package of items, sent to one or more people.

```
Bundle {
    id: UUID
    name: String? (optional user-provided name)
    note: String? (personal message to recipients)
    createdAt: Date
    sentAt: Date?
    deliveryFormat: DeliveryFormat (email | pdf | text)

    // Relationships
    bundleItems: [BundleItem] (ordered — the sequence of items in the bundle)
    recipients: [BundleRecipient] (one or more people)
}
```

#### BundleItem

Join entity between Bundle and Item. Tracks order.

```
BundleItem {
    id: UUID
    bundle: Bundle
    item: Item
    sortOrder: Int (position in the bundle)
}
```

#### BundleRecipient

Join entity between Bundle and Person.

```
BundleRecipient {
    id: UUID
    bundle: Bundle
    person: Person
}
```

### Key Queries the UI Needs

| Screen | Query |
|--------|-------|
| My Feed (all) | All Items, sorted by createdAt descending |
| My Feed (gifts only) | Items where type == gift |
| My Feed (data only) | Items where type == data |
| My Feed (unassigned) | Items with zero PersonTags AND zero ConnectionTags |
| My Feed (for specific person) | Items where PersonTags contains person X OR ConnectionTags contains a connection of person X |
| Friend Profile feed | Items tagged to this person OR any of their connections |
| Friend Profile (unsent) | Above, filtered to isSent == false |
| Friend Profile (by connection) | Items where ConnectionTags contains specific connection |
| Connection mini-profile | Items where ConnectionTags contains this connection |
| Friend list (sorted by activity) | People sorted by most recent PersonTag/ConnectionTag taggedAt |
| Unsent count for friend | Count of PersonTags + ConnectionTags where person/connection.person == X AND isSent == false |
| Bundle history for friend | Bundles where recipients contains this person |
| Bundle history (all) | All Bundles sorted by sentAt descending |
| Your wishlist | Items where PersonTags contains Self AND type == gift |
| Your personal archive | Items where PersonTags contains Self AND type == data |
| Upcoming dates (global) | All birthdays (Person + Connection) + ImportantDates, sorted by next occurrence |
| Upcoming dates (for friend) | Birthdays + ImportantDates for this person and all their connections |
| Connections for friend | Connections where person == X, sorted by name |

---

## Technical Architecture

### Platform

- **iOS 26+** (native SwiftUI)
- **Swift 6** with strict concurrency
- **Minimum deployment:** iOS 26

### Data Layer

- **SwiftData** for local persistence
- **CloudKit** (via SwiftData's built-in iCloud sync) for cross-device sync
- **No backend server** — zero server-side infrastructure
- **No user accounts** — the user's iCloud account is implicit identity

### Frameworks

| Framework | Purpose |
|-----------|---------|
| SwiftUI | All UI |
| SwiftData | Data persistence + iCloud sync |
| LinkPresentation | URL metadata extraction (LPMetadataProvider) |
| MessageUI | MFMailComposeViewController for sending HTML emails |
| PDFKit | On-device PDF generation for bundle export |
| UniformTypeIdentifiers | Share extension content type handling |
| CoreNFC | (v2 stretch) NFC-based friend verification |

### Share Extension Architecture

The share extension is a separate iOS App Extension target that shares a SwiftData container (App Group) with the main app.

**Flow:**

1. Extension receives URL/text from host app
2. Creates a new Item in the shared SwiftData container
3. User selects type and optionally tags people (reads Person list from shared container)
4. Saves and dismisses
5. Main app sees the new Item via SwiftData — no manual sync needed

**App Group:** Required for shared data container between main app and extension.

### Link Preview Pipeline

1. **Capture:** URL is saved immediately with minimal metadata (just the URL string)
2. **Extract:** `LPMetadataProvider` fetches og:title, og:description, og:image asynchronously
3. **Cache:** Extracted metadata + downloaded image are stored in the Item record
4. **Display:** Cards show a loading placeholder until metadata arrives, then animate to the full preview

For known platforms (YouTube, Instagram, X, Reddit, Amazon, Spotify), a secondary parser can extract platform-specific fields (video duration, tweet text, product price, etc.) from the metadata or URL patterns.

### Email Generation

The app generates HTML email strings on-device using a template engine (could be as simple as Swift string interpolation with a pre-designed HTML/CSS template). Key constraints:

- **Inline CSS only** — no `<link>` tags, no external stylesheets
- **Table-based layout** — for maximum email client compatibility
- **No JavaScript** — email clients strip it
- **Images:** Base64-encoded inline images if under size limits (most email clients support up to ~10MB total); otherwise, clean text-only layout with well-formatted titles, descriptions, and URLs
- **UTF-8 encoding** — supports emoji and international characters
- **Tested against:** Gmail (web + mobile), Apple Mail, Outlook

### PDF Generation

Using PDFKit or Core Graphics to render a styled document:

- Custom typography and layout
- Each item rendered as a styled card
- URLs included as tappable links in the PDF
- Generated as a temporary file, presented via UIActivityViewController

---

## App Personality & Copy Direction

### Positioning

1st° speaks with quiet confidence about what it isn't. Not preachy, not manifesto-heavy. Wry and self-aware. It knows social media is broken and doesn't need to shout about it — it just offers a better alternative and lets the product speak.

### Tonal Principles

- **Anti-social-network inversions:** Use familiar social media language, then subvert it.
- **Warm irreverence:** Witty but never mean. Confident but not arrogant.
- **Respect for the user's intelligence:** No hand-holding, no over-explaining, no patronizing tutorials.
- **Brevity:** Say it in fewer words. Then cut half of those.

### Example Copy

**Onboarding / First Launch:**

> "No account to create. No profile to fill out. No friends to find — you already know who they are."

**Empty Feed:**

> "Nothing saved yet. Next time you're scrolling and think 'Sarah would love this' — that's what the share button is for."

**Empty People List:**

> "No one here yet. Add someone you actually care about. Not your LinkedIn connections."

**Adding First Friend:**

> "Just a name and a face. That's all 1st° needs. Everything else, you'll add as you go."

**First Bundle Sent:**

> "Bundle sent. No algorithm decided who sees it. No engagement metrics. Just you, being thoughtful."

**Share Extension:**

> "Saved. It'll be in your feed when you're ready."

**Bundle Composer — Personal Note Placeholder:**

> "Say something. Or don't. The links speak for themselves."

**Email Footer:**

> "Curated with 1st° — a social tool, not a social network."

**About Screen:**

> "1st° helps you save things you find and share them with people you care about. No servers. No algorithms. No followers. No feeds controlled by machines. Just you, your taste, and your people.
>
> Your data lives on your device. The emails you send live in your friends' inboxes. If this app disappeared tomorrow, everything you've shared would still exist.
>
> Social networks promised to connect us. They optimized for attention instead. 1st° optimizes for intention."

### What 1st° Never Says

- "Share with your followers"
- "Trending" / "Popular" / "For you"
- "X people liked this"
- "Invite friends to unlock..."
- "Your weekly engagement report"
- Anything that implies an audience, a metric, or a growth incentive

---

## User Flows

### Flow 1: Capture from Safari

```
Safari → Share button → 1st° → [preview loads] → tap "Data" → Save
Time: ~3 seconds
Result: Item appears in My Feed, type: data, unassigned
```

### Flow 2: Capture for a Specific Person

```
Safari → Share button → 1st° → [preview loads] → tap "Gift" → tap "+ Sarah" → Save
Time: ~5 seconds
Result: Item appears in My Feed AND Sarah's profile, type: gift, tagged to Sarah
```

### Flow 3: Quick Capture from Friend Profile

```
1st° → People tab → tap Sarah → input bar → paste URL → [preview loads] → tap Gift/Data → Send
Time: ~5 seconds
Result: Item saved, tagged to Sarah, visible in both My Feed and Sarah's profile
```

### Flow 4: Browse and Bundle from My Feed

```
1st° → My Feed → browse → tap "Select" → tap items → tap "Bundle" →
[Composer] → write note → add recipients → tap "Email" →
[Mail composer opens] → Send
Time: ~2 minutes (depending on curation)
Result: HTML email sent from user's email, items marked as sent for each recipient
```

### Flow 5: Bundle from Friend Profile

```
1st° → People → tap Sarah → see "8 unsent" banner → tap →
[Select mode, 8 items pre-selected] → remove 2 → tap "Bundle" →
[Composer, Sarah pre-selected as recipient] → write note → tap "Email" →
[Mail composer] → Send
Time: ~1 minute
Result: 6 items bundled, sent to Sarah, marked as sent on her profile
```

### Flow 6: Browsing Your Feed

```
1st° → My Feed → browse in card view → scroll → tap interesting card →
[Detail sheet] → read full preview → tap "Open URL" → Safari opens →
come back → swipe detail sheet down → continue browsing
```

### Flow 7: Add to Your Wishlist

```
Amazon → Share button → 1st° → [preview loads with product image + price] → tap "Gift" → tap "+ Me" → Save
Time: ~4 seconds
Result: Item appears in My Feed AND your self-profile as a wishlist item
```

### Flow 8: Share Your Wishlist

```
1st° → People → tap your self-card → see "12 gifts" stat pill → tap →
[Feed filtered to your gift items] → tap "Select" → pick items → tap "Bundle" →
[Composer] → name: "Birthday wishlist" → note: "Any of these would be amazing" →
add Mom as recipient → tap "Email" → [Mail composer] → Send
Time: ~2 minutes
Result: Mom receives a beautifully formatted email with your curated wishlist
```

### Flow 9: Gift for a Friend's Child (2nd Degree)

```
Toy store website → Share button → 1st° → [preview loads] → tap "Gift" →
tap "+ Sarah" → see Sarah's connections → tap "Emma (daughter)" → Save
Time: ~6 seconds
Result: Item appears in My Feed, tagged to Sarah → Emma. Visible in Sarah's profile feed,
filterable to Emma's items. Gift ready for Emma's birthday.
```

### Flow 10: Add a Connection and Their Birthday

```
1st° → People → tap Sarah → connections stat pill → tap "+" →
Name: "Emma" → Relationship: "daughter" → Birthday: April 3 → Save
Result: Emma appears as a connection on Sarah's profile. Her birthday shows up
in Sarah's "next date" header and in date reminders.
```

### Flow 11: Date Reminder Triggers Gift Review

```
[Push notification: "Emma's birthday is in 7 days (Sarah's daughter)"] → tap →
Opens Sarah's profile, filtered to Emma's items →
See 3 gift ideas saved over the past year → select 1 → mark as "chosen" →
(go buy it)
```

### Flow 12: Editing a Card

```
1st° → My Feed → tap card → [Detail sheet] → tap "Edit" →
change type from Data to Gift → add price "$45" → tag "Mom" → Save
Result: Item updated everywhere it appears (feed, Mom's profile)
```

---

## v2 Roadmap

Features explicitly deferred from the MVP, in rough priority order:

### v2.0 — Deeper Relationships

- **Notes:** Plain text notes on friend profiles — things they mentioned, preferences, inside jokes. Displayed as note-type cards in their feed.
- **Check-in tracking:** Log when you last contacted someone. "Needs attention" sorting becomes data-driven instead of based on tagging activity.
- **Friend Score:** Relationship health metric (0–100) based on check-ins, items saved, bundles sent, dates remembered. Trend arrows. Named something irreverent.

### v2.1 — Enhanced Organization

- **Groups:** User-defined groups (family, college friends, work). A friend can be in multiple groups. Group-level bundling ("send this week's bundle to all of 'college friends'").
- **Tags/topics on items:** Beyond gift/data, let users add custom topic tags (#cooking, #design, #funny). Enables filtering by interest area.
- **Smart suggestions:** On-device ML that suggests which friend might like an item based on past tagging patterns. "This looks like something Dan would like — tag him?"

### v2.2 — Deeper Sharing

- **NFC friend verification:** Tap phones with another 1st° user to "verify" the connection. Adds a visual badge (like a blue checkmark) to their profile. Prerequisite for future two-way features.
- **In-app bundle receiving:** If both users have 1st°, bundles can be delivered in-app (appearing in the recipient's feed) in addition to email.
- **Bundle reactions:** Recipients can respond to bundles with simple reactions (not likes — something more intentional, like "loved the 3rd link" or "already seen this one").

### v2.3 — Platform Expansion

- **Widgets:** Small (next upcoming date), Medium (friends with unsent items), Large (weekly curation summary).
- **Siri Shortcuts:** "Save this for Sarah," "Who have I not sent a bundle to this month?"
- **Apple Reminders sync:** Birthday and date reminders synced bidirectionally.
- **StandBy / Lock Screen widgets.**

### v2.4 — Sarcastic Notifications (The CyniCal Legacy)

- **Notification copy library:** Personality-driven push notifications for check-in reminders, birthday alerts, unsent item nudges.
- **Configurable tone:** Let users choose their notification personality — gentle, witty, or full sarcasm.
- **Examples:**
  - "You've been saving things for Sarah for 3 weeks and haven't sent any of them. She'd probably like to see them."
  - "12 unsent items. That's not a stash, that's a hoard."
  - "It's been 47 days since you sent Dan anything. He's fine. Probably."

### Future — Colectiva Layer

- Physical inventory tracking (books, tools, gadgets)
- Lending/borrowing between friends
- 2nd-degree discovery ("Dan's friend has that book")
- May become a separate tab or a companion app

---

## What 1st° Is Not

**Not a social network.** No public profiles, no followers, no feed controlled by anyone but you. No network effects required for the app to be useful.

**Not a bookmarking app.** Bookmarking is solitary. 1st° is social by intention — you save things in the context of relationships, not folders. The organizational axis is people, not categories.

**Not a chat app.** 1st° doesn't replace iMessage or WhatsApp. The DM-like interface is a familiar input pattern, not a messaging system. You don't have conversations here — you curate.

**Not a contacts app.** Apple Contacts stores phone numbers. 1st° stores what you notice, what you save, and what you share. The human layer, not the data layer.

**Not a CRM.** No pipelines, no networking, no professional relationship management. This is for people you love, not people you need.

---

## Success Metrics

**For an indie app with no analytics infrastructure, success is measured by proxy:**

- **App Store ratings and reviews** — the personality and the bundle experience should drive word-of-mouth.
- **Email footer impressions** — every bundle sent includes the 1st° signature. Recipients who install the app are organic growth.
- **Personal satisfaction** — does the creator use it every day? Does it replace the impulse to send individual links via iMessage? Does it make sending a weekly email to friends feel easy and good?

**Qualitative signals that it's working:**

- Friends start replying to bundle emails with "these are great, keep them coming"
- The user's feed grows steadily (they're capturing more because it's easy)
- Unsent counts go down regularly (they're actually bundling and sharing)
- Friend profiles accumulate items over weeks and months (the scrapbook effect)

---

## Appendix: Design References

### Meta-Digital Skeuomorphism

The original iPhone used visual skeuomorphism — leather textures, glossy buttons, page-curl animations — to make a touchscreen feel familiar. 1st° uses *behavioral* skeuomorphism — patterns users already know from messaging apps, social media profiles, and email — to make curation and intentional sharing feel familiar.

| Familiar Pattern | 1st° Adaptation |
|------------------|-----------------|
| Messages app: conversation list | People tab: friend list with preview lines |
| Messages app: chat thread | Friend profile: scrollable card feed with input bar |
| Instagram profile: grid of posts | My Feed: card/list view of saved items (your curated wall) |
| Instagram/X: infinite scroll | My Feed: finite, countable, sortable |
| Email newsletter (Substack) | Bundle delivery via self-contained HTML email |
| Dating app: swipe to decide | (v2) Potential triage gesture for inbox processing |
| Social media "wall" / profile | My Feed IS your wall — your curated digital identity |
| Blue checkmark / verification | (v2) NFC tap to verify mutual 1st° connection |
| "Share" button → broadcast | Share extension → save privately, share intentionally |

### The Anti-Pattern Table

| Social Network Does This | 1st° Does This Instead |
|--------------------------|----------------------|
| Algorithmic feed | Your own curated collection |
| Likes / reactions | Intentional bundles sent to specific people |
| Followers / friend count | Manually added inner circle |
| Public profile | Private collection, shared only by your choice |
| Infinite scroll | Finite feed with a clear item count |
| Push for engagement | Pull when you're ready |
| Server-dependent | On-device, survives the company |
| Account required | No account, no identity beyond your email |
| Growth hacking | Organic — bundle recipients discover the app |

---

*1st° — Save what you find. Share what matters. No algorithm required.*
