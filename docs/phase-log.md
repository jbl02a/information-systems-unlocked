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

## Phase 6 — Test 3, and units (2026-11-20)

The parent added eight class decks taught since Test 2 (Chapters 5, 6, 7 and 9,
Data Visualization, Project Management), four assigned articles, the reading
list and four assignments, and said the next exam is coming up. No file gives
the date, format or coverage (`docs/sources.md`, "Test 3").

**Units, copied from accounting-unlocked.** The app had one test; it now has two.
- `topics.js` gains `UNITS` (`t2`, `t3`), each topic a `unit`, and
  `topicsFor(unit)` / `unitOfTopic()`. Test 3 is the default.
- `UnitContext` and `UnitSwitcher` sit under the nav: "Studying: Test 2 | Test 3",
  remembered per device, and `?unit=` on any URL wins. Opening a lesson, set or card
  deck from the other test switches to match.
- Every page shows only the active test: home, notes, questions, matching, cards,
  the study plan, the format notice and the cram sheet.
- **Progress v2.** `best` is per test (`{ t2, t3 }`), attempts carry `unit`, and the
  cap is per test and kind. A v1 save's best and attempts are filed under Test 2.
  A saved session remembers its test, so a resumed Test 3 rehearsal records
  against Test 3. "Clear list" clears only the active test's misses.
- No one-time "move to the new unit" flag was needed: no device had a remembered
  unit before this. **The next unit will need one** (accounting's rule 20).

**Content, all new ids:**

| Topic | Questions | Key terms / cards | Know-this | Matching sets |
|---|---|---|---|---|
| Data & Knowledge Mgmt (Ch. 5) | 61 | 42 | 11 | 5 |
| Telecommunications & Networking (Ch. 6) | 66 | 48 | 12 | 6 |
| Data Visualization | 25 | 17 | 8 | 3 |
| Project Management | 43 | 28 | 10 | 5 |
| E-Commerce (Ch. 7) | 53 | 32 | 12 | 5 |
| Social Computing (Ch. 9) | 33 | 25 | 11 | 4 |
| Assigned Articles | 33 | 20 | 8 | 4 |
| **Test 3** | **314** | **210** | **72** | **32 (160 pairs)** |

That is 189 multiple choice, 63 true/false, 28 fill in the blank, 16 matching and
18 short answer. 271 test slide facts and 33 test the articles; 9 are textbook
(terms the slides name but never define, labeled) and 1 is ours.

- **New source, `article`** ("Assigned article" badge), for the four articles.
  The rehearsal treats articles as class material, like slides.
- **Workflow.** Opus read nothing secondhand: five reading passes transcribed
  every slide, image and article. Writing passes then built one module per topic
  in `src/data/t3/`, each gated by `scripts/t3/check.mjs`, which checks:
  - shapes and ids
  - refs inside the deck's slide count
  - at least 80% class material
  - true/false 40–60% True
  - the right answer is not the longest option in more than 45% of items
  - American spelling
  - no instructor pronouns
  - quotes under 15 words

  An independent fact-check pass then compared every item with the transcripts
  (fixes listed in `sources.md`).
- **Grader:** fill in the blank now accepts -y / -ies plurals both ways
  (opportunity = opportunities).
- **Test 3 cram sheet** (`CramSheetT3.jsx`): every topic plus the articles on two
  printed pages.
- **Test 3 study plan:** every topic has class material, so the "less certain
  textbook" step is gone. The order is know-this lists, then the articles (short
  and closed), then key-term cards, then the rehearsal, then misses, then matching.

**Verified:**
- `npm run verify`: progress 19, seven topic checks, bank 356, contrast.
- `npm run themes`: 25 routes, both tests, both themes, AA and no overflow.
- `npm run browser`: 132 checks. Every property runs for Test 2 and Test 3 in both
  themes at 390px. Answering A every time stays at chance, and each test's drills
  serve only its own items. A blank Test 3 rehearsal records under Test 3 only.
  "Clear list" on Test 3 keeps Test 2's misses and holds. A Test 2-era save shows
  its best under Test 2. Both cram sheets print on 2 pages.

## Still open

- **The Test 3 date, format and coverage.** Nothing in the materials says. If the
  instructor gives a study guide or review, it outranks everything: add it as a
  source and rebuild the know-this lists from it.
- **Seven of the nine reading-list articles are not in the folder**, including
  the two Assignment 5 needs for Q5 (botnets) and Q7 (North Korean IT workers).
  Drop them in the materials folder and add them (`sources.md`, "The assigned
  articles").
- **Slides for hardware, software, acquiring IS and AI (Test 2).** Follow
  `docs/README.md`, "Adding a slide deck". Test 2 is past, so this is only
  worth doing if the final is cumulative.
- **The next unit** (a final?) needs a one-time move flag so devices that
  remember `t3` land on it (copy accounting-unlocked's `…-unit-moved-u4`).
