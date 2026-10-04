// The progress model survives anything on disk. His history lives only on his
// device, so a migration that throws, or drops a `hold`, loses work for good.
//
// Run: npm run progress
import { migrate, buildDefault, applyExam, withResult, capAttempts, ATTEMPT_CAP } from '../src/lib/progressShape.js'

let pass = 0, fail = 0
const ok = (c, m, d = '') => { if (c) { pass++; console.log(`  ok   ${m}`) } else { fail++; console.log(`  FAIL ${m}${d ? `  (${d})` : ''}`) } }

console.log('\nMigration never throws and always yields the current shape')
for (const [name, input] of [
  ['nothing saved', null], ['a string', 'garbage'], ['an array', []], ['a number', 42],
  ['empty object', {}], ['misses is an array', { misses: [] }], ['exam is null', { exam: null }],
  ['attempts not an array', { exam: { attempts: 'x' } }],
]) {
  let out
  try { out = migrate(input) } catch (e) { out = e }
  ok(out && out.v === 1 && Array.isArray(out.exam?.attempts) && typeof out.misses === 'object' && !Array.isArray(out.misses),
    `${name}`, String(out))
}

console.log('\nNothing he did is lost')
{
  const old = {
    exam: { attempts: [{ score: 70, correct: 28, total: 40, label: 'Rehearsal (40)', kind: 'exam', date: '2026-10-05T10:00:00Z' }], best: 70 },
    misses: {
      'sec-03': { wrong: 2, right: 1, last: 'wrong', at: 'x' },
      'eth-11': { wrong: 1, right: 3, last: 'right', at: 'x', hold: true },
      'MS-S1': { wrong: 1, right: 0, last: 'wrong', type: 'match', label: 'Cookies' },
      'CARD-sec-ransomware': { wrong: 1, right: 0, last: 'wrong', type: 'card' },
      'bad-entry': 'not an object',
    },
  }
  const m = migrate(old)
  ok(m.exam.best === 70 && m.exam.attempts.length === 1, 'best score and attempt history kept')
  ok(m.misses['eth-11'].hold === true, 'a held question stays held')
  ok(m.misses['MS-S1'].type === 'match' && m.misses['CARD-sec-ransomware'].type === 'card', 'matching and card entries keep their type')
  ok(!('bad-entry' in m.misses), 'a corrupt entry is dropped instead of crashing')
  ok(JSON.stringify(migrate(m)) === JSON.stringify(m), 'migrating twice changes nothing')
}

console.log('\nGrading keeps fields it does not own')
{
  let misses = { 'eth-11': { wrong: 0, right: 1, last: 'right', hold: true } }
  misses = withResult(misses, 'eth-11', false)
  ok(misses['eth-11'].hold === true && misses['eth-11'].wrong === 1 && misses['eth-11'].last === 'wrong', 'a wrong answer keeps the hold')
}

console.log('\nOnly a rehearsal moves the best score')
{
  let p = buildDefault()
  p = applyExam(p, { score: 60, correct: 24, total: 40, label: 'Rehearsal', kind: 'exam' })
  p = applyExam(p, { score: 100, correct: 3, total: 3, label: 'Hardware', kind: 'drill' })
  ok(p.exam.best === 60, 'a 3-question drill at 100% leaves the best at 60')
  const many = Array.from({ length: 30 }, (_, i) => ({ kind: 'drill', score: 1, date: `2026-10-0${i % 9 + 1}T${String(i).padStart(2, '0')}:00:00Z` }))
  const kept = capAttempts([{ kind: 'exam', score: 70, date: '2026-01-01T00:00:00Z' }, ...many])
  ok(kept.some(a => a.kind === 'exam') && kept.filter(a => a.kind !== 'exam').length === ATTEMPT_CAP, 'a run of drills cannot evict a rehearsal')
}

console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
