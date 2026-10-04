# Testing

`npm run build` catches syntax, plus two gates: no course material tracked by
git, and every text token at AA contrast in both themes. Behavior is verified by
scripts that assert **properties**, not "the test passed".

## Node checks: `npm run verify`

| Script | Asserts |
|---|---|
| `check-no-sources.mjs` | No `.pptx/.pdf/.docx/…` or stray slide image is tracked by git |
| `verify-progress.mjs` | Migration never throws on corrupt or old saves, keeps `hold`, attempts and typed misses; a drill never moves the best score or evicts a rehearsal |
| `verify-bank.mjs` | Ids unique and topic-prefixed; every item has a source, a kind and an explanation; every slide item cites a real deck and slide, and none sits on a topic with no deck; **answering A on multiple choice ≈ 25%** after the shuffle; true/false balanced; every blank accepts its variants and rejects wrong answers; matching fails on one swapped pair; both matching columns shuffle; short-answer credit = share of points; the rehearsal draws 40, every topic, slide items first |
| `check-contrast.mjs` | Every text token against every surface, both themes |

## Browser checks (built app, real Chromium, 390px)

```bash
npm run build && npx vite preview --port 4715
npm run themes    # every route, both themes: rendered contrast ≥ AA, no overflow
npm run browser   # end-to-end properties, both themes
```

`verify-browser.mjs` asserts, in light and dark:

- answering **A on every multiple-choice question** in exam mode scores about
  25% (three runs, averaged);
- always answering **True** scores about half;
- a fill-in-the-blank accepts `"  The ANSWER.  "` and rejects a wrong answer;
- a matching item **fails on one swapped pair** and passes when all are right;
- short-answer credit follows the ticked points exactly;
- **know-this answers stay hidden** until clicked; one click reveals exactly one;
- attempt history, misses, and an **in-progress attempt survive a reload**, the
  attempt resuming at the same questions with the same option order;
- an older save loads and a corrupt one starts fresh, with no page errors;
- no horizontal overflow at 390px.

## Traps hit while building this

- **CSS `uppercase` changes `innerText`.** Assertions on styled labels must be
  case-insensitive.
- **React reserves the `ref` prop.** `SourceBadge` takes the slide reference as
  `at`; passed as `ref` it silently never arrives.
- **A plural rule that strips one ending is wrong half the time** ("devices" →
  "devic"). `grade.js` compares every candidate form instead.
- **`page.evaluate` runs in the browser**, so a node import such as `KEYS` must be
  passed in as an argument.
