# Information Systems Unlocked

An interactive study tool for **Introduction to Information Systems** (textbook:
Rainer & Prince, *Introduction to Information Systems*, 10th ed.), built for one
student, a college freshman, for **Test 2**. Static React SPA, no backend, no
login, all state in the browser. A sibling of `accounting-unlocked`,
`Supply-chain-unlocked` and `macro-unlocked` in the same folder: code is COPIED
from them, never imported, and no repo depends on another.

**Read `docs/` before changing content.** `docs/sources.md` says which file every
fact came from and what is ours; `docs/phase-log.md` is the build history and the
open items; `docs/README.md` explains how to add a slide deck when one arrives.

## Commands

```bash
npm install
npx playwright install chromium   # once, for the browser checks
npm run dev
npm run build                     # no-sources gate + contrast gate + vite build
npm run verify                    # sources, progress migration, bank, contrast (node only)
npx vite preview --port 4715      # then, in another shell:
npm run themes                    # rendered contrast + 390px overflow, both themes
npm run browser                   # end-to-end properties, both themes, 390px
```

## Stack

React 18 · Vite 6 · Tailwind 3 · react-router-dom 6 · vite-plugin-pwa · Vercel from `main`.

## What Test 2 is, and what we do not know

- **Scope (syllabus):** ethics and privacy, hardware, software, acquiring
  information systems and applications, AI, information security. The syllabus
  lists topics, not chapters.
- **Formats (syllabus):** exams *"may consist of multiple-choice, true-false,
  matching, fill-in-the-blank and short answer questions"*. **May**, not will.
- **Not stated anywhere we have:** the format mix, the number of questions, how
  short answers are scored, and the date (the parent said "next week" on Oct 4).
- **Class material received:** the Chapter 3 decks (2) and the Chapter 4 decks
  (4, Parts 3–4 added 2026-10-08). The other
  four topics have no slides yet. See "Where content comes from".

## Where content comes from (the provenance rule)

Every lesson section, key term, know-this item, question, card and matching set
carries `src`:

| `src` | Meaning | Badge |
|---|---|---|
| `slides` | On the instructor's class slides; also carries `ref` (deck + slide) | Class slides |
| `book` | Standard textbook content, **not** from the class slides. Written from general knowledge of the Rainer & Prince text's earlier editions; not checked against the 10th edition | Textbook, not slides |
| `ours` | Our own example, built to practice an idea | Our example |

Topics carry `basis: 'slides' | 'book'` in `src/data/topics.js`. Slide items
outrank textbook items everywhere (rehearsal draw, study plan, notes order).
**When a deck arrives for a textbook-only topic, follow `docs/README.md`,
"Adding a slide deck": nothing gets restructured.**

## Non-obvious rules

1. **Never let the correct answer sit at a fixed position.** Multiple-choice
   items are authored `correctIndex: 0` and permuted at runtime
   (`src/lib/shuffle.js`, via `prepare()` in `src/lib/bank.js`). Matching rows AND
   choices both shuffle. The property to assert is **"answering A every time
   scores about 25%"**, and `npm run browser` asserts it in the built app: the
   accounting app shipped exactly this bug once and the student noticed.
   True/false keeps True and False roughly balanced (always-True ≈ 50%).
2. **Item IDs are load-bearing.** They key `misses`. `eth-07`, `sec-38` …;
   matching sets record as `MS-<id>`, cards as `CARD-<id>`, lessons as
   `LESSON-<topic>`. Never rename one: it orphans his history. Retire an item by
   deleting it (the session loader drops unknown ids); add new ones with new ids.
3. **Storage keys are namespaced** `information-systems-unlocked-*`, all built
   from `src/lib/storage.js`. The sibling apps share his browser.
4. **Course materials never enter git.** The decks live in
   `../information-systems materials/`. `.gitignore` blocks Office and PDF files,
   and `scripts/check-no-sources.mjs` fails the build if one is tracked anyway.
5. **Anything not from the slides is labeled, on its face.** Textbook items carry
   the "Textbook, not slides" badge, and textbook-only topics open with a banner.
   The know-this lists are **ours**, built from what the instructor defined and
   set in color: there is no instructor study guide for Test 2, and the UI never
   implies there is. The format mix is ours (`FormatNotice`). The test: if a
   reader could think the instructor told us something they did not, the wording
   is wrong.
6. **Emphasis is not red.** The decks use blue, red, orange and green
   (`docs/sources.md` has the map). `emph` records the color; never filter to red.
7. **Migrate progress, never assume it.** `src/lib/progressShape.js` folds any
   saved blob into the current shape and never throws; `npm run progress` proves
   it against corrupt and old saves. Every write to `misses` spreads the existing
   entry, because `hold` is set by him, not by grading.
8. **Only the rehearsal moves the best score** (`kind: 'exam'`). Topic and
   format drills are drills. Attempt history is capped per kind so drills can
   never evict a rehearsal.
9. **Short answers are self-marked, and say so.** We cannot grade prose. He reads
   the model answer and ticks each key point he made; credit is the share ticked,
   and it counts as right for the misses tracker only if every point is ticked.
   Short answers reveal on request in exam mode too, since there is no other way
   to mark them.
10. **Fill-in-the-blank forgives form, not meaning.** `src/lib/grade.js` ignores
    case, spacing, punctuation, apostrophe style, a leading article and singular
    vs plural. Anything else (a synonym) must be on the item's own `answers` list.
11. **Practice mode is the default and listed first**; exam mode is one tap away.
    The misses drill always explains as it goes.
12. **PWA updates are prompted, never forced** (`registerType: 'prompt'`), and
    `vercel.json` sets no-cache headers on `sw.js` so deploys are detected.
13. **Two themes, light is the default.** Every color goes through semantic
    tokens (`text-strong/body/dim/muted`, `bg-surface…`, `accent/brand/ok/bad/
    info/warn/focus`) defined per theme in `src/index.css`. Never name a palette
    color for text: `check-contrast.mjs` fails the build on one. Saturated CTA
    buttons keep literal `text-white` on `-700` or darker. **Content is never in
    the chrome tier**: `text-muted` is for labels, badges and counters only;
    anything he reads is `text-body` or `text-dim`.
14. **Contrast is checked twice**: at source (`npm run contrast`, in the build)
    and as rendered in a real browser in both themes (`npm run themes`), which
    is the only check that sees gradients and translucent layers.
15. **Native `<select>` popups inherit the control's background**, so selects
    are opaque (`bg-surface`) and `index.css` paints `select option`. Never give
    a `<select>` a `/opacity` background.
16. **Vercel Analytics stays invisible and cookieless.** `<Analytics />` is in
    `App.jsx`; nothing about it appears in the UI.

## House language: American English

Every word he reads, and every word in this repo, uses American spelling:
`practice` (noun and verb), `color`, `analyze`, `organize`, `center`,
`judgment`, `gray`, `labeled`, `behavior`. Sweep with a stem check:

```bash
grep -rhoiE "\b[a-z]{3,}is(e|ed|es|ing)\b" src/ docs/ scripts/ CLAUDE.md | sort -u
```

Not every `-ise` is British (`promise`, `premise`, `otherwise`, `exercise`,
`advertise`, `expertise`, `revise`). `emphasis` is already American. Never
"correct" text quoted from a slide or the syllabus.

## Pronouns

The instructor's pronouns have not been stated: write "the instructor", never
he or she.
