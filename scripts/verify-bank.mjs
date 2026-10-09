// Structural and grading checks on the question bank, the lessons and the
// matching sets, run in node against the same modules the app imports.
//
// It asserts PROPERTIES, not "the test passed":
//   - answering A on every multiple-choice item scores about 25% after the shuffle
//   - always answering True scores about 50% on true/false (they are balanced)
//   - every fill-in-the-blank accepts its own answers and their reasonable
//     variants, and rejects an empty or wrong answer
//   - a matching item fails on one swapped pair
//   - every item names its topic, its source and an explanation
//
// Run: npm run bank

import { QUESTIONS, KINDS } from '../src/data/questions.js'
import { LESSONS } from '../src/data/lessons.js'
import { MATCHING_SETS } from '../src/data/matchingSets.js'
import { TOPICS, DECKS, SOURCES } from '../src/data/topics.js'
import { shuffleOptions } from '../src/lib/shuffle.js'
import { creditFor, blankCorrect, matchCorrect, normalizeBlank } from '../src/lib/grade.js'
import { rehearsal, prepare, REHEARSAL_SIZE } from '../src/lib/bank.js'

let pass = 0, fail = 0
const ok = (cond, msg, detail = '') => {
  if (cond) { pass++; console.log(`  ok   ${msg}`) }
  else { fail++; console.log(`  FAIL ${msg}${detail ? `  (${detail})` : ''}`) }
}
const topicIds = TOPICS.map(t => t.id)

console.log('\nEvery item')
{
  const ids = QUESTIONS.map(q => q.id)
  ok(new Set(ids).size === ids.length, `${ids.length} ids, all unique`)
  const prefix = { ethics: 'eth', security: 'sec', hardware: 'hw', software: 'sw', acquiring: 'acq', ai: 'ai' }
  ok(QUESTIONS.every(q => q.id.startsWith(prefix[q.topic] + '-')), 'every id carries its topic prefix')
  ok(QUESTIONS.every(q => topicIds.includes(q.topic)), 'every item belongs to a syllabus topic')
  ok(QUESTIONS.every(q => SOURCES[q.src]), 'every item says where its fact came from (src)')
  ok(QUESTIONS.every(q => KINDS[q.kind]), 'every item is one of the five kinds')
  ok(QUESTIONS.every(q => typeof q.explanation === 'string' && q.explanation.length > 15), 'every item has an explanation')
  const deckRef = /^ch\d[a-z] s/
  ok(QUESTIONS.filter(q => q.src === 'slides').every(q => deckRef.test(q.ref ?? '') && DECKS[q.ref.slice(0, 4)]),
    'every slide item cites a real deck and slide')
  // A textbook item on a textbook-only topic is the norm; a slide item on a
  // topic with no decks would be a contradiction.
  ok(QUESTIONS.filter(q => q.src === 'slides').every(q => TOPICS.find(t => t.id === q.topic).basis === 'slides'),
    'no item claims slides for a topic that has none')
  for (const t of TOPICS) {
    const n = QUESTIONS.filter(q => q.topic === t.id).length
    ok(n >= 10, `${t.label}: ${n} items`)
  }
  for (const k of Object.keys(KINDS)) {
    const n = QUESTIONS.filter(q => q.kind === k).length
    ok(n >= 5, `${KINDS[k].label}: ${n} items`)
  }
}

console.log('\nMultiple choice')
{
  const mc = QUESTIONS.filter(q => q.kind === 'mc')
  ok(mc.every(q => q.correctIndex === 0 && q.options.length === 4), `${mc.length} authored answer-first with four options`)
  ok(mc.every(q => new Set(q.options).size === 4), 'no duplicate options')
  // The property that caught a real bug in the sibling accounting app.
  let hits = 0, total = 0
  for (let r = 0; r < 600; r++) for (const q of mc) { total++; if (shuffleOptions(q).correctIndex === 0) hits++ }
  const rate = hits / total
  ok(rate > 0.22 && rate < 0.28, `answering A every time scores ${(rate * 100).toFixed(1)}%, about chance`)
  // The shuffle never loses the answer.
  ok(mc.every(q => { const s = shuffleOptions(q); return s.options[s.correctIndex] === q.options[0] }), 'the shuffle always keeps the right answer right')
}

console.log('\nTrue / false')
{
  const tf = QUESTIONS.filter(q => q.kind === 'tf')
  ok(tf.every(q => typeof q.answer === 'boolean'), `${tf.length} items, every answer a boolean`)
  const trues = tf.filter(q => q.answer).length
  const share = trues / tf.length
  ok(share >= 0.4 && share <= 0.6, `${trues} true, ${tf.length - trues} false: always answering True scores ${(share * 100).toFixed(0)}%`)
  for (const t of TOPICS) {
    const mine = tf.filter(q => q.topic === t.id)
    if (mine.length < 3) continue
    const s = mine.filter(q => q.answer).length / mine.length
    ok(s >= 0.25 && s <= 0.75, `${t.label}: ${mine.filter(q => q.answer).length} true of ${mine.length}`)
  }
}

console.log('\nFill in the blank')
{
  const bl = QUESTIONS.filter(q => q.kind === 'blank')
  ok(bl.every(q => q.prompt.includes('____') && Array.isArray(q.answers) && q.answers.length), `${bl.length} items, each with a blank and an answer list`)
  for (const q of bl) {
    const a = q.answers[0]
    const variants = [a, a.toUpperCase(), `  ${a}  `, `the ${a}`, `${a}.`, `${a}s`]
    ok(variants.every(v => blankCorrect(q, v)), `${q.id} accepts "${a}" in case, spacing, article, punctuation and plural variants`)
    ok(!blankCorrect(q, '') && !blankCorrect(q, 'zzzz'), `${q.id} rejects blank and wrong answers`)
  }
  ok(normalizeBlank('Moore’s') === normalizeBlank("Moore's"), 'curly and straight apostrophes are the same')
  ok(blankCorrect({ answers: ['device'] }, 'devices') && blankCorrect({ answers: ['box'] }, 'boxes'), 'plurals in -s and -es both accepted')
}

console.log('\nMatching')
{
  const items = [...QUESTIONS.filter(q => q.kind === 'match'), ...MATCHING_SETS]
  for (const m of items) {
    const right = Object.fromEntries(m.pairs.map(p => [p.left, p.right]))
    const swapped = { ...right, [m.pairs[0].left]: m.pairs[1].right, [m.pairs[1].left]: m.pairs[0].right }
    const lefts = m.pairs.map(p => p.left), rights = m.pairs.map(p => p.right)
    ok(new Set(lefts).size === lefts.length && new Set(rights).size === rights.length && m.pairs.length >= 3,
      `${m.id}: ${m.pairs.length} pairs, no duplicates on either side`)
    ok(matchCorrect(m, right) && !matchCorrect(m, swapped) && !matchCorrect(m, {}), `${m.id}: all right passes, one swapped pair fails, empty fails`)
  }
  // Both columns shuffle.
  const sample = QUESTIONS.find(q => q.kind === 'match' && q.pairs.length >= 4)
  const rows = new Set(), choices = new Set()
  for (let i = 0; i < 40; i++) { const s = prepare(sample); rows.add(s.rowOrder.join()); choices.add(s.choiceOrder.join()) }
  ok(rows.size > 5 && choices.size > 5, `rows (${rows.size}) and choices (${choices.size}) are both shuffled`)
}

console.log('\nShort answer')
{
  const sa = QUESTIONS.filter(q => q.kind === 'short')
  ok(sa.every(q => q.model && q.points.length >= 2 && q.points.length <= 4), `${sa.length} items, each with a model answer and 2–4 key points`)
  const q = sa[0]
  ok(creditFor(q, []) === 0 && creditFor(q, q.points.map((_, i) => i)) === 1 && creditFor(q, [0]) === 1 / q.points.length,
    'credit is the share of key points ticked')
}

console.log('\nThe rehearsal')
{
  let seed = 7
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  const r = rehearsal(rand)
  ok(r.length === REHEARSAL_SIZE, `draws ${REHEARSAL_SIZE} items`)
  ok(new Set(r.map(q => q.id)).size === r.length, 'no item twice')
  ok(TOPICS.every(t => r.some(q => q.topic === t.id)), 'every syllabus topic appears')
  const slideShare = r.filter(q => TOPICS.find(t => t.id === q.topic).basis === 'slides').length / r.length
  ok(slideShare >= 0.6, `${Math.round(slideShare * 100)}% from the two slide-backed topics`)
  const inSlideTopics = r.filter(q => TOPICS.find(t => t.id === q.topic).basis === 'slides')
  ok(inSlideTopics.every(q => q.src === 'slides'), 'within slide-backed topics, only slide items are drawn while any remain')
}

console.log('\nLessons')
{
  ok(TOPICS.every(t => LESSONS.some(l => l.topic === t.id)), 'every topic has a lesson')
  for (const l of LESSONS) {
    const t = TOPICS.find(x => x.id === l.topic)
    ok(l.sections.every(s => SOURCES[s.src]) && l.keyTerms.every(k => SOURCES[k.src]) && l.knowThis.every(k => SOURCES[k.src]),
      `${l.id}: every section, key term and know-this item is tagged with its source`)
    ok(l.knowThis.length >= 3 && l.knowThis.every(k => k.q && k.a), `${l.id}: ${l.knowThis.length} know-this items, each with an answer`)
    if (t.basis !== 'slides') ok([...l.sections, ...l.keyTerms, ...l.knowThis].every(x => x.src !== 'slides'), `${l.id}: claims no slides (none exist)`)
    else ok(l.sections.filter(s => s.src === 'slides').every(s => /^ch\d[a-z] s/.test(s.ref ?? '')), `${l.id}: every slide section cites its slides`)
  }
}

console.log('\nFlashcards')
{
  const { CARDS } = await import('../src/data/cards.js')
  const ids = CARDS.map(c => c.id)
  ok(new Set(ids).size === ids.length, `${ids.length} cards, every id unique (they key his misses)`)
  ok(CARDS.every(c => c.front && c.back && SOURCES[c.src]), 'every card has a front, a back and a source')
  ok(TOPICS.every(t => CARDS.some(c => c.topic === t.id)), 'every topic has cards')
}

console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
