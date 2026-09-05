# 07 · Working

How the owner engages with this system from here on. The aim is that running
the studio's presence never feels like a second job: your inputs are decisions
and words, and everything else is files and a push.

---

## 1. Your part, in one paragraph

You decide, you write, you approve. You do not operate anything. When a tool
ships, you already wrote the changelog; it becomes a note in twenty minutes.
When you have something to say, you write it as a Markdown file with six lines
of frontmatter. When a choice is needed, the decisions document names it and
offers a default, so nothing waits on you unless you want it to.

## 2. The three touchpoints

**Decisions.** 06 · Decisions §2 lists what is open. Answer any of them in a
sentence, here in a session or as a comment on the summary artifact, and the
document is updated and the work proceeds. Anything you do not answer runs on
the default.

**Words.** Two kinds are yours to write or approve:

- *Notes.* You can write them yourself (a Markdown file in `notes/`, the
  frontmatter in 05 · Website §4), or ask for a draft from the material that
  already exists (a changelog entry, a decision record, a brief from the
  batch). Drafts come back for one pass of edits, then publish.
- *Fixed copy.* The one line per tool, the price line, the About screen, the
  App Store text. These change rarely and always start in 05 · Website §8.

**Review.** Each phase is a pull request on this repository plus an updated
summary artifact. You read the artifact for the shape and the PR for the
detail. Approving the PR is the publish button: the GitHub Pages workflow
deploys `main`.

## 3. Accounts only you can create

These need the company's identity or payment details, so they are yours. Each
takes under an hour. Nothing blocks on them: every phase has a default that
works without the account, and the buttons appear when the account exists.

| Account | For | Phase |
|---|---|---|
| Patreon creator page for OPUS (payout to Opusculum SRL) | Support buttons; the comment section under notes | 2 |
| Plausible (or GoatCounter) | Traffic counts without a banner | 1 |
| Buttondown (optional) | Notes by email, from the feed | 2 or later |
| App Store Connect changes: Loop free, retire the preset IAP, later add extras and a tip | Loop's new model | 2 |
| DNS for `loop.opus.ro`; keep `opusloop.co` registered | Loop's web home | 3 |
| Mail: `support@opus.ro` as an alias of `hello@opus.ro`; `c@opus.ro` stays private | One address | 2 |

## 4. A normal month

Nothing is scheduled. This is what tends to happen.

- **A release ships.** You paste the changelog into a note (or ask for it to
  be turned into one), skim it, push. The App Store text is the same words
  shortened. One Patreon post for comments, one YouTube or Instagram post if
  there is a recording. Twenty minutes.
- **Something is worth saying.** You write it, or you say "turn ADR-0016 into
  a note" and read the draft. An hour, spread out.
- **Someone writes in.** `hello@opus.ro`, one inbox. If a question comes up
  three times, it becomes a line on the tool's help page.
- **A patron comments.** On the Patreon post. You answer there, when you
  like. Nothing on the site changes.
- **You want numbers.** The counter's dashboard for the site; App Store
  Connect for the apps. No personal data anywhere.

## 5. A normal quarter

- One letter (`kind: letter`): what got made, what is in the works, what came
  in and went to. It can be short.
- Skim the quarter's public words against 02 · Brand §2 and §3. Fix anything
  that started preaching.

## 6. A normal year

- The plain account on the support page, Make Future's share included.
- Reread the story page. Still true? Update.
- Reread the principles (03 · Products §1) and question each one on purpose.
  Record any bend in the relevant `DECISIONS.md`.

## 7. Working with me

Each phase is one or a few sessions. The pattern that works:

1. You drop notes like the ones that shaped this revision: unordered,
   candid, in your own words.
2. I fold them into the documents first, so the change is recorded before it
   is built, and show you the diff in the artifact.
3. I build the phase on a branch, with the docs as the spec, and open a pull
   request.
4. You read the artifact, skim the PR, leave comments (on the artifact or the
   PR), or say "ship it".

What I need from you at each phase is in 06 · Decisions §3: mostly the
accounts in §3 above and any decision you want to take off its default. What I
never need from you is operating anything.

## 8. If you stop for a while

The system is built to survive that. Nothing expires, nothing nags, no
cadence was promised. The site keeps serving the last note. The feeds stay
valid. The support page keeps working. When you come back, you write the next
file.
