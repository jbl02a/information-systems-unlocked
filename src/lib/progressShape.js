// The saved-progress shape, and every pure transformation of it. Kept out of the
// React context so scripts/verify-progress.mjs can exercise the migration in
// node against hand-written old saves: his progress lives only on his device,
// and a bad migration is not recoverable.
//
// SHAPE (version 2)
//   v:      2
//   exam:   { attempts: [{ score, correct, total, label, kind, unit, date }],
//             best: { t2, t3 } }        one best score PER TEST (units)
//
// Version 1 (Test 2 only) had a bare-number `best` and attempts with no `unit`.
// Every one of them was a Test 2 attempt, so migrate() files them under 't2'.
//   misses: { [id]: { wrong, right, last: 'right'|'wrong', at, hold?, type?, label? } }
//
// `misses` holds every tracked thing, told apart by id prefix and `type`:
//   question ids (eth-01, sec-14 …)   type absent: re-servable by the exam drill
//   MS-<set>                          type 'match': a /matching set
//   CARD-<id>                         type 'card':  a flashcard he did not know
//   LESSON-<topic>                    type 'lesson': lesson marked as read
//
// A write to `misses` must SPREAD the existing entry: `hold` is set by him, not
// by grading, and rebuilding the object drops it (CLAUDE.md rule 7).

import { UNIT_IDS } from '../data/topics.js'

export const VERSION = 2
export const ATTEMPT_CAP = 10

export const emptyBest = () => Object.fromEntries(UNIT_IDS.map(u => [u, null]))

export function buildDefault() {
  return { v: VERSION, exam: { attempts: [], best: emptyBest() }, misses: {} }
}

const num = v => (typeof v === 'number' && Number.isFinite(v) ? v : 0)

function cleanMiss(m) {
  if (!m || typeof m !== 'object') return null
  const out = {
    ...m,
    wrong: num(m.wrong),
    right: num(m.right),
    last: m.last === 'right' || m.last === 'wrong' ? m.last : (num(m.wrong) > 0 ? 'wrong' : 'right'),
  }
  if ('hold' in m) out.hold = Boolean(m.hold)
  return out
}

/** Fold whatever is on disk into the current shape. Never throws. */
export function migrate(saved) {
  const base = buildDefault()
  if (!saved || typeof saved !== 'object') return base
  const attempts = (Array.isArray(saved.exam?.attempts) ? saved.exam.attempts : [])
    .filter(a => a && typeof a === 'object')
    .map(a => ({
      ...a,
      score: num(a.score), correct: num(a.correct), total: num(a.total),
      kind: a.kind === 'exam' ? 'exam' : 'drill',
      // Attempts saved before units existed were all Test 2.
      unit: UNIT_IDS.includes(a.unit) ? a.unit : 't2',
    }))
  const best = emptyBest()
  const raw = saved.exam?.best
  if (typeof raw === 'number') best.t2 = raw
  else if (raw && typeof raw === 'object') for (const u of UNIT_IDS) best[u] = typeof raw[u] === 'number' ? raw[u] : null
  const misses = {}
  if (saved.misses && typeof saved.misses === 'object' && !Array.isArray(saved.misses)) {
    for (const [id, m] of Object.entries(saved.misses)) {
      const c = cleanMiss(m)
      if (c) misses[id] = c
    }
  }
  return { v: VERSION, exam: { attempts: capAttempts(attempts), best }, misses }
}

/**
 * Keep the newest ATTEMPT_CAP of each kind PER UNIT, so drills never evict
 * rehearsals and a run of Test 3 work never pushes Test 2's history out.
 */
export function capAttempts(all) {
  const sorted = [...all].sort((a, b) => String(b.date).localeCompare(String(a.date)))
  const kept = []
  for (const u of UNIT_IDS) {
    const mine = sorted.filter(a => (a.unit ?? 't2') === u)
    kept.push(...mine.filter(a => a.kind === 'exam').slice(0, ATTEMPT_CAP))
    kept.push(...mine.filter(a => a.kind !== 'exam').slice(0, ATTEMPT_CAP))
  }
  return kept.sort((a, b) => String(b.date).localeCompare(String(a.date)))
}

/** Record one outcome, keeping every field grading does not own. */
export function withResult(misses, id, correct, extra = {}) {
  const entry = misses[id] || { wrong: 0, right: 0 }
  return {
    ...misses,
    [id]: {
      ...entry,
      ...extra,
      wrong: entry.wrong + (correct ? 0 : 1),
      right: entry.right + (correct ? 1 : 0),
      last: correct ? 'right' : 'wrong',
      at: new Date().toISOString(),
    },
  }
}

/**
 * Only a full rehearsal moves the best score, and only its own unit's; a drill's
 * denominator is not comparable. `unit` is the unit the attempt STARTED in.
 */
export function applyExam(prev, { score, correct, total, label, kind = 'drill', unit = 't2', results = [] }) {
  const attempt = { score, correct, total, label, kind, unit, date: new Date().toISOString() }
  const attempts = capAttempts([attempt, ...(prev.exam?.attempts || [])])
  const prevBest = { ...emptyBest(), ...(prev.exam?.best && typeof prev.exam.best === 'object' ? prev.exam.best : {}) }
  const best = kind === 'exam' ? { ...prevBest, [unit]: Math.max(score, prevBest[unit] ?? 0) } : prevBest
  let misses = { ...(prev.misses || {}) }
  for (const r of results) if (r?.id) misses = withResult(misses, r.id, r.correct)
  return { ...prev, exam: { attempts, best }, misses }
}
