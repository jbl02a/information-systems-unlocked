# Documentation

Written so a session with no memory of this project can pick it up cold.

| Document | What it covers |
|---|---|
| [`sources.md`](sources.md) | Every file the content came from, the emphasis-color map, what is textbook-only, and the oddities in the decks. **Read before changing content.** |
| [`phase-log.md`](phase-log.md) | What was built, push by push, why, and what is still open. |
| [`testing.md`](testing.md) | The properties that matter and the scripts that assert them. |

`CLAUDE.md` at the repo root holds the rules most likely to be broken by accident.

## The project in one paragraph

A college freshman made an 80 on Test 1 of Introduction to Information Systems
without a study site. Test 2 covers six syllabus topics, but only two of them
(Ethics & Privacy, Information Security) arrived with the instructor's slide
decks. So the app is built on a **provenance rule**: every fact is tagged
`slides`, `book` or `ours`, slide content outranks textbook content everywhere,
and the four textbook-only topics are labeled as such on every surface until
their slides arrive.

## The surfaces

| Route | What it is |
|---|---|
| `/` | Home: notes first (teach, then test), topics by source, the format notice |
| `/notes`, `/notes/:topic` | One lesson per topic, emphasized terms marked, a "know this" list with hidden answers |
| `/matching` | 18 sets, 80 pairs, all or nothing; the pairings are ours |
| `/exam` | 133 items in all five syllabus formats; practice (default) and exam mode; topic, format and misses drills; a 40-item rehearsal (our mix) |

Coming in later pushes: `/cards`, `/cram` and the study plan (see
`phase-log.md`).

## Adding a slide deck

When the instructor's slides arrive for a topic (say, AI):

1. **Read every slide from the raw XML**, colors included, and view the image-only
   slides. The extractor used for Chapters 3 and 4 is described in `sources.md`.
2. **`src/data/topics.js`:** add the deck to `DECKS` (`id`, `file`, `date`,
   `slides`, `topic`), list its id on the topic's `decks`, and set the topic's
   `basis` to `'slides'`.
3. **Author slide items** with `src: 'slides'` and `ref: '<deck> s<N>'`: lesson
   sections, key terms (with `emph` for colored runs), know-this items, questions,
   cards and matching sets. **New ids only.**
4. **Leave the textbook items in place.** Their ids key his history. They keep
   their badge and drop behind the slide items automatically: `priorityOf()` in
   `topics.js` ranks a textbook item on a slide-backed topic lowest, so the
   rehearsal draws slide items first. If a textbook item now contradicts the
   slides, the slides win: fix the item's wording (same id) or delete it.
5. **Update `docs/sources.md`** (the file, what was colored, anything odd) and
   `docs/phase-log.md`, then run `npm run verify`, `npm run themes` and
   `npm run browser`. `verify-bank` refuses a slide item on a topic with no deck
   and a slide item without a slide reference.

The same steps apply to an instructor study guide or review deck, which outranks
everything else: add it as a source, and build the know-this lists from it.
