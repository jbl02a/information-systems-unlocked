// Choosing and laying out practice items. Pure functions, so the verification
// script exercises exactly what the app serves.
import { QUESTIONS } from '../data/questions.js'
import { TOPICS, priorityOf } from '../data/topics.js'
import { permutation, shuffleOptions } from './shuffle.js'

export function shuffle(arr, rand = Math.random) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const REHEARSAL_SIZE = 40

// The rehearsal's shape is OURS: the syllabus gives no size or mix. It leans on
// the two topics with class slides (the instructor's own emphasis) and samples
// every textbook-only topic, slide items first within each topic. When a deck
// arrives for a textbook topic, flipping its `basis` in topics.js moves it into
// the larger share automatically.
export function rehearsal(rand = Math.random, size = REHEARSAL_SIZE) {
  const slideTopics = TOPICS.filter(t => t.basis === 'slides')
  const bookTopics = TOPICS.filter(t => t.basis !== 'slides')
  const perBook = bookTopics.length ? 3 : 0
  const slideShare = size - perBook * bookTopics.length
  // Split the slide share in proportion to how much each slide topic has.
  const pool = t => QUESTIONS.filter(q => q.topic === t.id)
  const slideTotal = slideTopics.reduce((n, t) => n + pool(t).length, 0) || 1
  const quota = new Map()
  let assigned = 0
  slideTopics.forEach((t, i) => {
    const n = i === slideTopics.length - 1 ? slideShare - assigned : Math.round(slideShare * pool(t).length / slideTotal)
    quota.set(t.id, n); assigned += n
  })
  bookTopics.forEach(t => quota.set(t.id, perBook))
  const out = []
  for (const t of TOPICS) {
    // Highest priority first (slide items before textbook ones), random within a tier.
    const ranked = shuffle(pool(t), rand).sort((a, b) => priorityOf(b) - priorityOf(a))
    out.push(...ranked.slice(0, quota.get(t.id) ?? 0))
  }
  return shuffle(out, rand)
}

export function questionsFor(scope, rand = Math.random) {
  if (scope === 'rehearsal') return rehearsal(rand)
  if (scope === 'full') return shuffle(QUESTIONS, rand)
  if (scope?.startsWith('kind:')) return shuffle(QUESTIONS.filter(q => q.kind === scope.slice(5)), rand)
  return shuffle(QUESTIONS.filter(q => q.topic === scope), rand)
}

/**
 * The item as shown: mc options permuted, match rows and choices permuted.
 * `layout` replays a saved one (resume); otherwise a fresh one is drawn.
 */
export function prepare(item, layout) {
  if (item.kind === 'mc') return shuffleOptions(item, layout?.order)
  if (item.kind === 'match') {
    const n = item.pairs.length
    const ok = o => Array.isArray(o) && o.length === n
    return {
      ...item,
      rowOrder: ok(layout?.rows) ? layout.rows : permutation(n),
      choiceOrder: ok(layout?.choices) ? layout.choices : permutation(n),
    }
  }
  return item
}

/** What to save so a resumed attempt shows the same layout it was answered against. */
export function layoutOf(shown) {
  if (shown.kind === 'mc') return { order: shown.optionOrder }
  if (shown.kind === 'match') return { rows: shown.rowOrder, choices: shown.choiceOrder }
  return null
}
