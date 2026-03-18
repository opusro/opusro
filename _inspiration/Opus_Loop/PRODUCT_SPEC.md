# Opus Loop — Product Specification

---

## App Identity

- **Name:** Opus Loop
- **Price:** $4.99 (one-time purchase)
- **Platform:** iOS (native SwiftUI)
- **Target:** Experienced meditators tired of subscriptions
- **Made by:** OPUS, Romania

---

## Architecture

### Services Layer

- **AudioService** — Manages playback of background sounds (bundled, custom mp3, Apple Music), fade in/out, volume control
- **SettingsService** — User preferences, defaults, dark/light mode, title visibility
- **HealthService** — Apple Health integration for mindful minutes tracking

### Data

- Local storage + iCloud sync via CloudKit
- No server, no backend, no user accounts
- Statistics tracking per category (meditation, pomodoro, custom)

---

## Features

### Timer Engine

The core of the app. Shared across all three modes.

- **Duration picker** — Minutes/hours selection
- **Sound selector** — Choose from bundled sounds, custom mp3 uploads, or Apple Music library
- **Gong/bell** — Configurable interval (halfway mark, custom intervals, or off)
- **Continue playback** — Sound keeps playing after timer ends (for gentle transitions)
- **Fade control** — Smooth audio ramp up/down at session start/end
- **Sound/tone balance** — Mix between primary sound and gong volume

### Mode: Meditation

- Timer + ambient sound + gong
- Minimal UI during session (just the time remaining, or nothing)
- Session logging for personal stats

### Mode: Pomodoro / Deep Work

- Work interval + break interval cycling
- Background sound during work, optional sound during breaks
- Session count tracking

### Mode: Custom

- User-defined setup: any duration, any sound, any bell pattern
- Intended for yoga, stretching, physical activity, breathing exercises
- Save and name custom presets

### Sound Library

- **Bundled sounds** — Curated selection shipped with the app
- **Custom mp3 upload** — Import any audio file from Files app
- **Apple Music integration** — Play from your existing library
- **AI-generated library** — Concept for future: procedurally generated ambient soundscapes

### Settings

- Dark/light mode toggle
- Title visibility on timer screen
- Default duration per mode
- Gong preferences
- Apple Health sync toggle
- Sound library management

### Widgets

- Timer quick-start widget
- Last session summary
- Streak counter (optional, not gamified)

---

## Development Status

### Completed Phases (from Windsure review)

- **Foundation** — Project structure, service architecture, basic UI
- **Core Services** — AudioService, SettingsService, HealthService implemented

### Remaining Work

- Phase 1: Polish timer UX, sound library UI, custom mp3 import flow
- Phase 2: Apple Music integration, gong system refinement
- Phase 3: Widgets, health tracking, statistics views

### Known Gaps (from code review)

- Some features specified but not yet implemented
- Implementation roadmap documented with timelines
- Quality focus: the app should feel like it was made by someone who actually meditates

---

## Design Principles

1. **Less is more.** Every screen should have less on it than you expect. The app should feel like a deep breath, not a dashboard.
2. **Respect the practice.** No gamification, no streaks-as-pressure, no social features. Meditation isn't a competition.
3. **Sound quality matters.** Audio is 80% of the experience. Bundled sounds must be excellent. Custom upload must work flawlessly.
4. **One-time value.** The app must feel worth $4.99 from the first session and every session after. No "unlock premium" gates.

---

## Source Notes
OPUS Loop Vision Documentation.md, Opus Loop launch.md, TEMP Opus loop Windsure.md, Loop.md, Opus.md, OPUS Loop Website.md
