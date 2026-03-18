# Design Philosophy — How OPUS Thinks About Building Things

---

## The Core Belief

Good design serves people. Not metrics, not investors, not growth charts. People. Every design decision at OPUS is filtered through one question: **does this make the human on the other side's life a little better, or does it just make our numbers look good?**

If the answer is numbers, we cut it.

---

## Principles

### 1. Don't Monetize Necessity, Monetize Delight

From the Minimus ecosystem philosophy: essential features should be free or one-time purchase. You don't charge people monthly for things they need. You charge once for things that are excellent, and you charge optionally for things that are delightful.

Subscriptions are appropriate when you're providing ongoing value (a service, fresh content, infrastructure). They're exploitative when you're charging rent on a tool someone already learned to use.

Opus Loop is $4.99 forever. CyniCal will follow the same model. The timer doesn't get worse if you stop paying.

### 2. Less Interface, More Experience

Every screen should have less on it than you expect. The goal isn't to show everything the app can do — it's to show only what matters right now.

Opus Loop during a meditation session: the time. Maybe not even that. CyniCal's friend list: names, scores, and the one thing you need to do next. Not dashboards. Not analytics. Not settings you'll never touch.

The best interface is the one you don't notice.

### 3. Capture Fast, Organize Later

Every product interaction should be saveable in under 3 seconds. A gift idea for Sarah? Type three words and you're done. A link that reminds you of Dan? Share extension, one tap. A meditation session? Open, tap, breathe.

Organization happens later, when you have time and context. The moment of inspiration or intention is too precious to interrupt with forms and categories.

### 4. Personality Over Polish

A product without personality is forgettable. CyniCal's sarcastic notifications, Opus Loop's deliberate minimalism, the octopus mascot that "cries and does multiple things at once" — these aren't gimmicks. They're what people remember. They're why someone opens your app instead of the competitor's.

Polish matters, but personality is what makes someone love a product instead of just using it.

### 5. Privacy Is Architecture, Not Policy

OPUS products have no backend. This isn't a privacy policy choice — it's an architectural decision. If there's no server, there's no data to breach, sell, or subpoena. If there's no account, there's no identity to track. If there's no analytics, there's no behavior to model.

Privacy-by-design means the temptation to be evil literally doesn't exist in the codebase.

### 6. Platform-Native, Not Cross-Platform

OPUS builds for iOS with SwiftUI and SwiftData. Not React Native. Not Flutter. Not "write once, run everywhere." The philosophy: if you're going to make something for the iPhone, make it feel like it belongs on the iPhone. Use the platform's design language. Integrate with the platform's services (Reminders, HealthKit, Widgets, ShareSheet). Feel native.

Cross-platform is a business optimization. Native is a craft decision.

### 7. Depth Over Breadth

An app that does one thing brilliantly beats an app that does ten things adequately. Opus Loop is a timer. Not a meditation course platform. Not a social mindfulness network. Not a wellness dashboard. A timer. With really good sounds.

CyniCal is a friend tracker. Not a social network. Not a CRM. Not a contacts replacement. A friend tracker. With really sharp notification copy.

Scope discipline is the hardest part of product design and the most important.

---

## Design Influences

### Clear App
Multiple references across the notes. Clear's minimalist approach to list management — gesture-driven, no chrome, pure content — is a touchstone for how OPUS products should feel. OPUS List is directly inspired by it.

### Apple's Design Language
Deep respect for Apple's platform conventions, with willingness to push within them. Liquid UI (iOS 26) as the latest evolution to embrace. Widgets, StandBy, ShareSheet — these aren't afterthoughts, they're first-class design surfaces.

### Bauhaus / Form Follows Function
From the OPUS x Alex research notes. The belief that form should emerge from function, not be applied on top of it. Decoration without purpose is noise. Structure with clarity is beauty.

### Atomic Design
Referenced in the context of music production (Atomic Design in Music.md) — the principle of building complex systems from simple, reusable components. Applies equally to UI design: atoms (buttons, labels) → molecules (input groups) → organisms (cards, sections) → templates → pages.

---

## The Anti-Patterns

Things OPUS deliberately avoids:

**Dark patterns:** No tricks. No "you'll lose your data if you unsubscribe." No hidden costs. No manipulative defaults.

**Engagement optimization:** No infinite scroll. No pull-to-refresh dopamine. No push notification spam. No "you haven't opened the app in 3 days!" guilt (except CyniCal, where guilt IS the feature — and it's about your friends, not the app).

**Feature bloat:** No "wouldn't it be cool if..." features without a clear user need. Every feature earns its place by solving a real problem.

**Tracking:** No analytics. No A/B testing. No user behavior modeling. Ship what you believe is right, listen to direct feedback, iterate on craft instinct.

---

## Source Notes
Minimus_Ecosystem_Complete.md, Minimus App.md, OPUS.ro.md, OPUS x Alex.md, Atomic Design in Music.md, Opus Loop Vision Documentation.md, CyniCal Friends.md, Freelance Product Design Tips & Tricks.md
