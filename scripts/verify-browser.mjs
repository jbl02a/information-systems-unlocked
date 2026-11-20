// End-to-end checks in the BUILT app, in a real browser, at phone width (390px),
// in both themes. These assert the properties that have actually broken in the
// sibling apps, not "the page loads".
//
//   npm run build && npx vite preview --port 4715
//   npm run browser                      # BASE=... to point elsewhere
//
// Covered: answering A every time on multiple choice scores about 25%; always
// answering True scores about 50%; a fill-in-the-blank accepts a variant; a
// matching item fails on one swapped pair and passes when all are right;
// short-answer credit follows the ticked points; know-this answers stay hidden
// until clicked; progress and an in-progress attempt survive a reload; an old
// or corrupt save does not crash the app; no horizontal overflow.
//
// UNITS: everything above runs for Test 2 AND Test 3 (each sees only its own
// items), plus: a new device lands on Test 3; a Test 3 rehearsal moves only Test
// 3's best; "Clear list" on Test 3 leaves Test 2's misses alone; a Test 2-era
// save still shows its best under Test 2; both cram sheets print on two pages.
import { chromium } from 'playwright'
import { KEYS } from '../src/lib/storage.js'
import { QUESTIONS } from '../src/data/questions.js'
import { unitOfTopic } from '../src/data/topics.js'

const BASE = process.env.BASE ?? 'http://localhost:4715'
const BY_ID = Object.fromEntries(QUESTIONS.map(q => [q.id, q]))
let pass = 0, fail = 0
const ok = (c, m, d = '') => { if (c) { pass++; console.log(`  ok   ${m}`) } else { fail++; console.log(`  FAIL ${m}${d ? `  (${d})` : ''}`) } }

const browser = await chromium.launch()

async function fresh(theme, unit) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
  const page = await ctx.newPage()
  page.errors = []
  page.on('pageerror', e => page.errors.push(String(e)))
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
  await page.evaluate(([k, t, ku, u]) => { localStorage.clear(); localStorage.setItem(k, t); if (u) localStorage.setItem(ku, u) }, [KEYS.theme, theme, KEYS.unit, unit])
  return { ctx, page }
}

// What each test's run uses: a lesson for know-this, a topic to resume, a
// matching set with 4+ pairs, a card deck.
const PER_UNIT = {
  t2: { lesson: 'security', topic: 'ethics', set: 'S6', deck: 'security' },
  t3: { lesson: 'data', topic: 'pm', set: 'DK1', deck: 'data' },
}

async function overflow(page, label) {
  const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  ok(over <= 0, `${label}: no horizontal overflow`, `${over}px`)
}

const itemId = page => page.$eval('[data-item]', el => el.getAttribute('data-item'))

// Start a scope from /exam in a given mode.
async function startScope(page, scope, mode) {
  await page.goto(BASE + '/exam', { waitUntil: 'domcontentloaded' })
  await page.click(`[data-mode="${mode}"]`)
  await page.click(`[data-scope="${scope}"]`)
  await page.waitForSelector('[data-item]')
}

async function nextOrSubmit(page) {
  if (await page.$('[data-next]')) await page.click('[data-next]')
  else { await page.click('[data-submit]'); await page.waitForSelector('[data-score]') }
}

const score = async page => Number((await page.textContent('[data-score]')).replace('%', ''))

for (const [theme, unit] of [['light', 't3'], ['dark', 't3'], ['light', 't2'], ['dark', 't2']]) {
  console.log(`\n── ${unit}, ${theme} theme, 390px ──`)
  const U = PER_UNIT[unit]
  const { ctx, page } = await fresh(theme, unit)

  // 1. Answering A on every multiple-choice item scores about 25%.
  {
    const scores = []
    for (let run = 0; run < 3; run++) {
      await startScope(page, 'kind:mc', 'exam')
      for (;;) {
        await page.click('[data-option="0"]')
        if (await page.$('[data-submit]')) { await page.click('[data-submit]'); await page.waitForSelector('[data-score]'); break }
        await page.click('[data-next]')
      }
      scores.push(await score(page))
    }
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length
    ok(avg >= 18 && avg <= 32, `answering A on every multiple-choice question scores ${avg.toFixed(1)}% (runs: ${scores.join(', ')})`)
  }

  // 2. Always answering True scores about half.
  {
    await startScope(page, 'kind:tf', 'exam')
    for (;;) {
      await page.click('[data-tf="true"]')
      if (await page.$('[data-submit]')) { await page.click('[data-submit]'); await page.waitForSelector('[data-score]'); break }
      await page.click('[data-next]')
    }
    const s = await score(page)
    ok(s >= 35 && s <= 65, `always answering True scores ${s}%`)
  }

  // 3. Fill in the blank accepts a variant in practice mode.
  {
    await startScope(page, 'kind:blank', 'practice')
    const q = BY_ID[await itemId(page)]
    ok(unitOfTopic(q.topic) === unit, `the format drill serves only ${unit} items`, q.id)
    await page.fill('[data-blank]', `  The ${q.answers[0].toUpperCase()}.  `)
    await page.click('button:text-is("Check")')
    const fb = await page.textContent('[data-feedback]')
    ok(fb.includes('Correct'), `fill in the blank "${q.id}" accepts "The ${q.answers[0].toUpperCase()}."`)
    await page.click('[data-next]')
    await page.fill('[data-blank]', 'definitely not it')
    await page.click('button:text-is("Check")')
    ok((await page.textContent('[data-feedback]')).includes('Not quite'), 'a wrong blank is marked wrong')
  }

  // 4. Matching: one swapped pair fails the whole item; all right passes.
  {
    await startScope(page, 'kind:match', 'practice')
    const fill = async swap => {
      const q = BY_ID[await itemId(page)]
      const rows = await page.$$('[data-match-row]')
      const lefts = await Promise.all(rows.map(r => r.$eval('p', p => p.textContent)))
      const want = lefts.map(l => q.pairs.find(p => p.left === l).right)
      if (swap) [want[0], want[1]] = [want[1], want[0]]
      for (let i = 0; i < rows.length; i++) await (await rows[i].$('select')).selectOption(want[i])
      await page.click('button:text-is("Check")')
      return page.textContent('[data-feedback]')
    }
    ok((await fill(true)).includes('Not quite'), 'matching: one swapped pair fails the item')
    await overflow(page, 'matching item, revealed')
    await page.click('[data-next]')
    ok((await fill(false)).includes('Correct'), 'matching: every pair right passes')
  }

  // 5. Short answer: credit follows the ticked points.
  {
    await startScope(page, 'kind:short', 'exam')
    const q = BY_ID[await itemId(page)]
    await page.click('[data-reveal-model]')
    const boxes = await page.$$('[data-point] input')
    ok(boxes.length === q.points.length, `short answer shows its ${q.points.length} key points to tick`)
    await boxes[0].check()
    const n = await page.$$eval('[data-item]', () => 1)
    void n
    // Skip the rest and submit: credit should be 1/points on one item out of all.
    for (;;) {
      if (await page.$('[data-submit]')) { await page.click('[data-submit]'); await page.waitForSelector('[data-score]'); break }
      await page.click('[data-next]')
    }
    const total = QUESTIONS.filter(x => x.kind === 'short' && unitOfTopic(x.topic) === unit).length
    const expect = Math.round((1 / q.points.length) / total * 100)
    ok(await score(page) === expect, `ticking 1 of ${q.points.length} points on one short answer scores ${expect}% of the set`)
  }

  // 6. Know-this answers stay hidden until clicked.
  {
    await page.goto(BASE + `/notes/${U.lesson}`, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('[data-know]')
    const items = await page.$$('[data-know]')
    ok(items.length > 5 && (await page.$$('[data-answer]')).length === 0, `${items.length} know-this items, no answer visible on load`)
    await (await items[2].$('[data-show]')).click()
    ok((await page.$$('[data-answer]')).length === 1, 'Show answer reveals exactly one')
    await page.click('button:text-is("Show all answers")')
    ok((await page.$$('[data-answer]')).length === items.length, 'Show all answers reveals every one')
    await overflow(page, `/notes/${U.lesson}, all answers open`)
  }

  // 7. Progress and an in-progress attempt survive a reload.
  {
    const before = await page.evaluate(k => JSON.parse(localStorage.getItem(k)), KEYS.progress)
    await page.reload({ waitUntil: 'domcontentloaded' })
    const after = await page.evaluate(k => JSON.parse(localStorage.getItem(k)), KEYS.progress)
    ok(after.exam.attempts.length === before.exam.attempts.length && after.exam.attempts.length >= 5,
      `attempt history survives a reload (${after.exam.attempts.length} attempts)`)
    ok(Object.keys(after.misses).length > 0, `misses survive a reload (${Object.keys(after.misses).length} tracked)`)

    await startScope(page, U.topic, 'exam')
    const firstId = await itemId(page)
    const shownBefore = await page.$$eval('[data-option] span.flex-1', els => els.map(e => e.textContent)).catch(() => [])
    await nextOrSubmit(page)
    await page.reload({ waitUntil: 'domcontentloaded' })
    await page.waitForSelector('[data-resume]')
    await page.click('[data-resume]')
    await page.waitForSelector('[data-item]')
    await page.click('button:text-is("←")')
    ok(await itemId(page) === firstId, 'an in-progress attempt resumes after a reload, at the same questions')
    const shownAfter = await page.$$eval('[data-option] span.flex-1', els => els.map(e => e.textContent)).catch(() => [])
    ok(JSON.stringify(shownBefore) === JSON.stringify(shownAfter), 'and with the same option order it was answered against')
  }

  // 7b. /matching: one wrong pair fails the set; all right clears it; recorded.
  {
    const { MATCHING_SETS } = await import('../src/data/matchingSets.js')
    const set = MATCHING_SETS.find(s => s.id === U.set)
    await page.goto(BASE + '/matching', { waitUntil: 'domcontentloaded' })
    await page.click(`[data-set="${U.set}"]`)
    await page.waitForSelector('[data-match-row]')
    const fill = async swap => {
      const rows = await page.$$('[data-match-row]')
      const lefts = await Promise.all(rows.map(r => r.$eval('p', p => p.textContent)))
      const want = lefts.map(l => set.pairs.find(p => p.left === l).right)
      if (swap) [want[2], want[3]] = [want[3], want[2]]
      for (let i = 0; i < rows.length; i++) await (await rows[i].$('select')).selectOption(want[i])
      await page.click('[data-check]')
    }
    await fill(true)
    ok(await page.$('[data-match-result="wrong"]') !== null, '/matching: one swapped pair fails the whole set')
    await overflow(page, '/matching set, revealed')
    await page.click('[data-retry]')
    await fill(false)
    ok(await page.$('[data-match-result="right"]') !== null, '/matching: all pairs right clears the set')
    const rec = await page.evaluate(([k, id]) => JSON.parse(localStorage.getItem(k)).misses[`MS-${id}`], [KEYS.progress, U.set])
    ok(rec?.type === 'match' && rec.wrong === 1 && rec.right === 1 && rec.last === 'right', '/matching records the miss, then the clear', JSON.stringify(rec))
  }

  // 7c. Cards: the back stays hidden until flipped; "didn't" feeds the missed deck.
  {
    await page.goto(BASE + '/cards', { waitUntil: 'domcontentloaded' })
    await page.click(`[data-deck="${U.deck}"]`)
    await page.waitForSelector('[data-card]')
    ok(await page.$('[data-back]') === null, 'a card shows its front only until flipped')
    await page.click('[data-card]')
    ok(await page.$('[data-back]') !== null, 'tapping flips it')
    await page.click('[data-didnt]')
    await page.click('[data-card]'); await page.click('[data-knew]')
    const m = await page.evaluate(k => Object.entries(JSON.parse(localStorage.getItem(k)).misses).filter(([id]) => id.startsWith('CARD-')), KEYS.progress)
    ok(m.length === 2 && m.some(([, v]) => v.last === 'wrong' && v.type === 'card'), '"Didn\'t know" is recorded as a card miss')
    await page.goto(BASE + '/cards', { waitUntil: 'domcontentloaded' })
    ok((await page.textContent('[data-deck="missed"]')).includes('(1)'), 'the missed deck holds the one card he did not know')
    await overflow(page, '/cards')
  }

  // 8. The misses drill exists and starts.
  {
    await page.goto(BASE + '/exam', { waitUntil: 'domcontentloaded' })
    ok(Boolean(await page.$('[data-drill-misses]')), '"Drill what I missed" is offered after misses')
  }

  ok(page.errors.length === 0, 'no page errors', page.errors.slice(0, 2).join(' | '))
  await ctx.close()
}

// 8b. The cram sheet prints on at most two Letter pages, with no app chrome, and
// its section headings survive a browser's default "no background graphics".
{
  console.log('\n── cram sheet, printed ──')
  const fs = await import('node:fs')
  const os = await import('node:os')
  const path = await import('node:path')
  const ctx = await browser.newContext()
  const page = await ctx.newPage()
  for (const u of ['t2', 't3']) {
    await page.goto(BASE + `/cram?unit=${u}`, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('.cram-page')
    ok((await page.textContent('.cram-head h1')).includes(u === 't2' ? 'Test 2' : 'Test 3'), `?unit=${u} shows the ${u} sheet`)
    const file = path.join(os.tmpdir(), `is-cram-check-${u}.pdf`)
    await page.pdf({ path: file, format: 'Letter' })
    const pages = (fs.readFileSync(file, 'latin1').match(/\/Type\s*\/Page[^s]/g) || []).length
    ok(pages >= 1 && pages <= 2, `the ${u} cram sheet prints on ${pages} page(s), limit 2`)
  }
  await page.emulateMedia({ media: 'print' })
  const hidden = await page.evaluate(() => ['nav', 'footer.app-foot', '.no-print']
    .every(sel => [...document.querySelectorAll(sel)].every(el => getComputedStyle(el).display === 'none')))
  ok(hidden, 'printing hides the navbar, footer, toolbar and update prompt')
  const adjust = await page.$eval('.cram-section h2', el => getComputedStyle(el).printColorAdjust || getComputedStyle(el).webkitPrintColorAdjust)
  ok(adjust === 'exact', 'cram headings force their dark band to print', adjust)
  await ctx.close()
}

// 9. An old or corrupt save never crashes the app, and keeps what it can.
{
  console.log('\n── saved progress from elsewhere ──')
  const { ctx, page } = await fresh('light')
  await page.evaluate(k => localStorage.setItem(k, JSON.stringify({
    exam: { attempts: [{ score: 55, label: 'Rehearsal (40)', kind: 'exam', date: '2026-10-05' }], best: 55 },
    misses: { 'sec-03': { wrong: 1, right: 0, last: 'wrong' }, 'eth-11': { wrong: 0, right: 2, last: 'right', hold: true }, junk: 7 },
  })), KEYS.progress)
  await page.goto(BASE + '/exam', { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('h1')
  // A device with no remembered test opens on Test 3; the Test 2 best is not shown there.
  ok(await page.getAttribute('[aria-label="Test 3"]', 'aria-pressed') === 'true', 'a device with no remembered test lands on Test 3')
  ok(!(await page.isVisible('text=rehearsal: 55%')), 'the Test 2 best is not shown under Test 3')
  await page.click('[aria-label="Test 2"]')
  await page.waitForSelector('text=Best Test 2 rehearsal: 55%')
  ok(await page.isVisible('text=Best Test 2 rehearsal: 55%'), 'switching to Test 2: the Test 2-era save loads, best score kept')
  ok(Boolean(await page.$('[data-drill-misses]')), 'its misses and held question feed the Test 2 drill')

  // "Clear list" on Test 3 clears only Test 3's misses.
  await page.evaluate(k => {
    const p = JSON.parse(localStorage.getItem(k))
    p.misses['dat-01'] = { wrong: 1, right: 0, last: 'wrong' }
    localStorage.setItem(k, JSON.stringify(p))
  }, KEYS.progress)
  await page.goto(BASE + '/exam?unit=t3', { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('[data-drill-misses]')
  ok((await page.textContent('[data-drill-misses]')).includes('(1)'), 'Test 3 counts only its own miss')
  await page.click('button:text-is("Clear list")')
  const left = await page.evaluate(k => Object.keys(JSON.parse(localStorage.getItem(k)).misses), KEYS.progress)
  ok(!left.includes('dat-01') && left.includes('sec-03') && left.includes('eth-11'), '"Clear list" on Test 3 leaves Test 2 misses and holds alone', left.join(','))

  // A Test 3 rehearsal moves only Test 3's best.
  await page.click('[data-mode="exam"]')
  await page.click('[data-scope="rehearsal"]')
  await page.waitForSelector('[data-item]')
  const firstUnit = unitOfTopic(BY_ID[await itemId(page)].topic)
  for (;;) {
    if (await page.$('[data-submit]')) { await page.click('[data-submit]'); await page.waitForSelector('[data-score]'); break }
    await page.click('[data-next]')
  }
  const best = await page.evaluate(k => JSON.parse(localStorage.getItem(k)).exam.best, KEYS.progress)
  ok(firstUnit === 't3' && best.t3 === 0 && best.t2 === 55, 'a blank Test 3 rehearsal records 0 under Test 3 and leaves Test 2 at 55', JSON.stringify(best))
  const last = await page.evaluate(k => JSON.parse(localStorage.getItem(k)).exam.attempts[0], KEYS.progress)
  ok(last.unit === 't3' && last.kind === 'exam', 'the attempt is filed under Test 3', JSON.stringify(last))
  await page.evaluate(k => localStorage.setItem(k, '{not json'), KEYS.progress)
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
  ok(await page.isVisible('h1'), 'a corrupt save starts fresh instead of crashing')
  ok(page.errors.length === 0, 'no page errors', page.errors.slice(0, 2).join(' | '))
  await ctx.close()
}

await browser.close()
console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
