# Phase log

What was built, push by push, and why. Each push updates this file in the same
commit, and the "Still open" section is always current.

## Phase 0 — The brief and the materials (2026-10-04)

The parent asked for a sibling to the accounting and supply-chain apps for
**Introduction to Information Systems, Test 2** (Rainer & Prince, 10th ed.). The
student made an 80 on Test 1 without a study site.

- **Materials:** four decks, Chapter 3 Ethics & Privacy (9/14, 9/16) and
  Chapter 4 Information Security (9/28, 9/30). No speaker notes, study guide,
  review slides or date in any of them. `docs/sources.md` has the full read.
- **Scope gap:** the syllabus lists six Test 2 topics. Hardware, software,
  acquiring information systems and AI have no decks. Asked how to handle them,
  the parent chose: build them, clearly labeled as textbook content, and make it
  easy to swap in class slides when they come. That decision is the provenance
  rule in `CLAUDE.md`.
- **Date:** "next week" (asked 2026-10-04). No file states it, so there is no
  countdown.
- **Formats:** the syllabus says exams "may" use five formats; the mix is unknown
  and every mix in the app is ours.

## Phase 1 — Notes and the question bank, deployed (2026-10-04)

The test is close, so the first push is the part he can study from today.

**What shipped**
- Copied the supply-chain app's machinery (theme tokens, PWA, contrast gate,
  theme audit, shuffle, exam session); rewrote everything course-specific.
- `src/data/topics.js`: the six topics with `basis` and decks, the source labels,
  and `priorityOf()`, which ranks slide items over textbook items.
- **Six lessons** (`/notes`): Ethics & Privacy and Information Security from the
  decks, with every colored term marked and slide references on every section;
  Hardware, Software, Acquiring IS and AI as textbook-only lessons behind a
  banner. Each ends with a "know this" list, answers hidden until revealed: **34
  items**, labeled as ours because there is no instructor study guide.
- **133 practice items** (`/exam`) in all five syllabus formats: 72 multiple
  choice, 30 true/false (14 true, 16 false), 14 fill in the blank, 9 matching,
  8 short answer. 79 test slide facts, 54 textbook facts. Every item is explained
  and carries its source badge.
- Practice mode by default, exam mode one tap away; topic drills, format drills,
  "drill what I missed", resume after reload, and a **40-item rehearsal** (70%
  from the slide-backed topics, 3 from each textbook topic; the mix is ours).
- Short answers are self-marked against 2–4 key points. Fill in the blank
  forgives case, spacing, punctuation, articles and plurals, plus a per-item
  alias list.
- Progress migrates on load (`src/lib/progressShape.js`) and lives under
  `information-systems-unlocked-*` keys.

**Verified:** `npm run verify` (progress 16, bank 106, contrast); `npm run themes`
(7 routes, both themes, AA, no overflow); `npm run browser` (42 checks, both
themes, 390px: A-every-time averaged 26–28%, always-True 47%, matching fails on
one swapped pair, reveals stay hidden, progress and an unfinished attempt survive
a reload).

## Still open

- **Matching surface** (`/matching`), **flashcards** (`/cards`), **cram sheet**
  (`/cram`, two pages) and the **points-per-minute study plan**: next pushes, in
  that order.
- **Slides for hardware, software, acquiring IS and AI.** Follow
  `docs/README.md`, "Adding a slide deck".
- **A possible Chapter 4 Part 3 deck** on security controls. Today those are
  textbook items in the security lesson.
- **The Test 2 date and format mix.** Test 1 itself, or his quiz questions, would
  show the real formats and upgrade the textbook topics.
