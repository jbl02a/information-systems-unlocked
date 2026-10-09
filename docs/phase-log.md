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

## Phase 2 — Matching (2026-10-04)

**What shipped**
- `/matching`: **18 sets, 83 pairs**, grouped by topic with slide topics first,
  graded all or nothing, both columns shuffled, opaque selects.
- The page says plainly that **the pairings are ours**: the syllabus says the
  test "may" include matching and nothing about what or how it is scored. Each
  set's facts carry their source badge (12 from the slides, 6 textbook).
- A set records as `MS-<id>` with `type: 'match'`, so a failed set stays on his
  list until he clears it.

**Verified:** `npm run bank` 142 checks (every set: no duplicates, all-right
passes, one swapped pair fails, empty fails); `npm run themes` on the matching
routes; `npm run browser` 50 checks, including a swapped pair failing a set on
`/matching` and the miss then clear being recorded.

## Phase 3 — Quick cram cards (2026-10-04)

**What shipped**
- `/cards`: **88 flashcards**, one per lesson key term, so cards and notes can
  never disagree. Decks: the ones he didn't know, the terms set in color, each
  topic (slide topics first), or everything. Flip, then "knew it" or "didn't".
  A toggle shows the meaning first instead of the term.
- "Didn't know" records `CARD-<topic>-<term>` with `type: 'card'`; the
  "ones I didn't know" deck is built from those and empties as he gets them.
- Card ids derive from the term's wording. To reword a term without orphaning
  his history, give the key term a `cardId` with the old slug.

**Verified:** `npm run bank` 145 (card ids unique, every card sourced, every
topic covered); `npm run themes` on `/cards`; `npm run browser` 60 checks,
including the back staying hidden until flipped and a "didn't know" landing in
the missed deck.

## Phase 4 — Cram sheet and study plan (2026-10-04)

**What shipped**
- `/cram`: all six topics on **two Letter pages**, slide chapters first,
  textbook-only sections labeled in their headings.
- **Bug caught by rendering the PDF:** the section headings are white on a dark
  band, and browsers drop background colors when printing by default, so on
  paper they came out nearly invisible. They now force the band
  (`print-color-adjust: exact`) and carry a border as a fallback.
- The **points-per-minute study plan** on home, ordered by three stated
  properties: *certain* (the slides and colored terms are what the instructor
  taught and stressed), *cheap* (closed lists), *divisible* (matching is all or
  nothing, so it needs a block of time). The textbook-only topics sit at step 5
  because their content is likely but its emphasis is unknown.

**Verified:** `npm run verify`; `npm run themes` on 12 routes in both themes;
`npm run browser` 63 checks, including the cram sheet printing on 2 pages with
no app chrome and its headings forced to print.

## Phase 5 — Chapter 4 Parts 3 and 4 (2026-10-08)

The parent added two decks dated 10/7: **Part 3** (11 slides: alien software,
SCADA, cyberterrorism vs cyberwarfare) and **Part 4** (33 slides: how attacks
happen, education, the three control types, communications controls, auditing,
risk analysis and mitigation, cyber liability insurance, what to do after a
breach). Both were read from the raw XML, every colored run captured
(`docs/sources.md`). This is the case the app was built for, and it went by the
README's "Adding a slide deck" steps without restructuring anything:

- `topics.js`: `ch4c`, `ch4d` added to the security topic.
- **Lesson:** nine new slide sections; the textbook section shrank to the three
  points no slide covers. **+24 key terms** (so +24 cards) plus four textbook terms upgraded to slides, **+10 know-this.**
- **Questions:** `sec-54`–`sec-80`, 27 new slide items in all five formats.
  Four textbook items were now on the slides and were **upgraded in place, same
  ids**, so his history on them carries over.
- **Matching:** `S9`–`S11` (alien software & infrastructure attacks,
  communications controls, risk management & insurance).
- **Cram sheet:** the "Security controls (textbook, not slides)" block became
  "Controls & risk management" from Part 4. Still 2 printed pages.
- `verify-bank` only accepted deck ids ending in a or b (`/^ch\d[ab] s/`); it now
  accepts any letter.

Now: **160 questions** (110 slides, 50 textbook), **21 matching sets, 102
pairs**, **112 key terms / cards**, **44 know-this items**. `npm run verify`
157/157, `npm run themes` all routes AA in both themes, `npm run browser` 63/63.

## Still open

- **Slides for hardware, software, acquiring IS and AI.** Follow
  `docs/README.md`, "Adding a slide deck".
- **The Test 2 date and format mix.** Test 1 itself, or his quiz questions, would
  show the real formats and upgrade the textbook topics.
