// Checks one Test 3 topic module (src/data/t3/<topic>.js) before it is merged
// into the bank. Written for the authoring agents; also run by `npm run t3`.
//
//   node scripts/t3/check.mjs data          one topic
//   node scripts/t3/check.mjs               every Test 3 topic present
//
// A module exports LESSON (one lesson), QUESTIONS and MATCHING_SETS, in the same
// shapes as src/data/lessons.js, questions.js and matchingSets.js.
import { existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { DECKS, ARTICLES, SOURCES, topicById } from '../../src/data/topics.js'
import { blankCorrect } from '../../src/lib/grade.js'
import { slug } from '../../src/data/cards.js'

export const SPEC = {
  data:      { q: 'dat', set: 'DK', min: 40 },
  networks:  { q: 'net', set: 'NW', min: 40 },
  dataviz:   { q: 'viz', set: 'DV', min: 18 },
  pm:        { q: 'pm',  set: 'PM', min: 30 },
  ecommerce: { q: 'ec',  set: 'EC', min: 28 },
  social:    { q: 'soc', set: 'SC', min: 20 },
  articles:  { q: 'art', set: 'AR', min: 20 },
}
const KINDS = ['mc', 'tf', 'blank', 'match', 'short']
// Words ending in -ise that are American too.
const OK_ISE = new Set(`promise promised promises promising premise premises otherwise exercise exercised exercises exercising
advertise advertised advertises advertising merchandising franchising revising supervising devising compromising
expertise revise revised enterprise enterprises franchise franchises merchandise compromise compromised compromises compromising
surprise surprised surprising precise concise devise devised supervise supervised televised improvise despise raise raised raises
raising praise noise poise cruise wise likewise clockwise rise arise arises arising demise disguise disguised bruise paradise treatise
excise incise`.split(/\s+/))
const PART = /^(?:([a-z0-9]+) )?s(\d+)(?:[–-]s?(\d+))?$/
const modPath = topic => fileURLToPath(new URL(`../../src/data/t3/${topic}.js`, import.meta.url))

export async function checkTopic(topic) {
  const errs = []
  const bad = m => errs.push(m)
  const spec = SPEC[topic]
  const t = topicById(topic)
  if (!spec || !t) return [`unknown topic ${topic}`]
  if (!existsSync(modPath(topic))) return [`missing src/data/t3/${topic}.js`]
  const { LESSON, QUESTIONS, MATCHING_SETS } = await import(pathToFileURL(modPath(topic)).href)
  if (!LESSON || !Array.isArray(QUESTIONS) || !Array.isArray(MATCHING_SETS)) return ['must export LESSON, QUESTIONS, MATCHING_SETS']

  // A source citation: slides need `deck sN[–M][, sK]` from this topic's decks
  // with every slide number inside its deck; articles need an ARTICLES id.
  const refOk = (src, ref, where) => {
    if (!SOURCES[src]) return bad(`${where}: src '${src}' is not one of ${Object.keys(SOURCES).join('/')}`)
    if (src === 'slides') {
      if (!ref) return bad(`${where}: a slides item needs ref`)
      const parts = String(ref).split(/,\s*/)
      if (!parts.every(p => PART.test(p))) return bad(`${where}: ref '${ref}' should look like 'ch5a s12', 'ch5a s3–7, s9' or 'ch5a s3, ch5b s4'`)
      let deck = null
      for (const p of parts) {
        const m = p.match(PART)
        if (m[1]) deck = m[1]
        if (!deck) { bad(`${where}: ref '${ref}' names no deck`); return }
        if (!t.decks.includes(deck)) bad(`${where}: deck '${deck}' is not one of this topic's decks (${t.decks.join(', ')})`)
        const max = DECKS[deck]?.slides ?? 0
        for (const n of [m[2], m[3]].filter(Boolean)) if (+n < 1 || +n > max) bad(`${where}: slide ${n} is outside ${deck} (1–${max})`)
      }
    } else if (src === 'article') {
      if (!ARTICLES[ref]) bad(`${where}: an article item needs ref = one of ${Object.keys(ARTICLES).join('/')}`)
    } else if (src === 'book' && topic === 'articles') {
      bad(`${where}: no textbook items in the articles topic`)
    }
  }
  const allText = []
  const txt = (s, where) => { if (typeof s === 'string') allText.push([s, where]) }

  // ── Questions ──
  const ids = QUESTIONS.map(q => q.id)
  if (new Set(ids).size !== ids.length) bad('question ids are not unique')
  for (const q of QUESTIONS) {
    const w = q.id ?? '(no id)'
    if (!new RegExp(`^${spec.q}-\\d{2,3}$`).test(q.id ?? '')) bad(`${w}: id must be '${spec.q}-NN'`)
    if (q.topic !== topic) bad(`${w}: topic must be '${topic}'`)
    if (!KINDS.includes(q.kind)) bad(`${w}: kind '${q.kind}'`)
    refOk(q.src, q.ref, w)
    if (typeof q.prompt !== 'string' || q.prompt.length < 10) bad(`${w}: prompt`)
    if (typeof q.explanation !== 'string' || q.explanation.length < 20) bad(`${w}: explanation too short`)
    txt(q.prompt, w); txt(q.explanation, w)
    if (q.kind === 'mc') {
      if (q.correctIndex !== 0) bad(`${w}: correctIndex must be 0 (shuffled at runtime)`)
      if (!Array.isArray(q.options) || q.options.length !== 4 || new Set(q.options).size !== 4) bad(`${w}: needs 4 distinct options`)
      q.options?.forEach(o => txt(o, w))
    }
    if (q.kind === 'tf' && typeof q.answer !== 'boolean') bad(`${w}: tf answer must be boolean`)
    if (q.kind === 'blank') {
      if ((q.prompt.match(/____/g) || []).length !== 1) bad(`${w}: blank prompt needs exactly one ____`)
      if (!Array.isArray(q.answers) || !q.answers.length) bad(`${w}: blank needs answers[]`)
      else {
        if (!blankCorrect(q, q.answers[0])) bad(`${w}: grader rejects its own answer`)
        const a0 = q.answers[0].toLowerCase()
        if (a0.length > 3 && q.prompt.toLowerCase().replace('____', ' ').includes(a0)) bad(`${w}: the prompt gives the answer away ('${q.answers[0]}')`)
      }
    }
    if (q.kind === 'match') {
      const Ls = q.pairs?.map(p => p.left) ?? [], R = q.pairs?.map(p => p.right) ?? []
      if (Ls.length < 3 || Ls.length > 6 || new Set(Ls).size !== Ls.length || new Set(R).size !== R.length) bad(`${w}: match needs 3–6 pairs, unique on both sides`)
      q.pairs?.forEach(p => { txt(p.left, w); txt(p.right, w) })
    }
    if (q.kind === 'short') {
      if (!q.model || !Array.isArray(q.points) || q.points.length < 2 || q.points.length > 4) bad(`${w}: short needs model and 2–4 points`)
      txt(q.model, w); q.points?.forEach(p => txt(p, w))
    }
  }
  const n = k => QUESTIONS.filter(q => q.kind === k).length
  if (QUESTIONS.length < spec.min) bad(`only ${QUESTIONS.length} questions; aim for at least ${spec.min}`)
  const floor = { tf: Math.max(4, Math.round(spec.min * 0.18)), blank: Math.max(2, Math.round(spec.min * 0.08)), match: 1, short: Math.max(1, Math.round(spec.min * 0.05)) }
  for (const [k, f] of Object.entries(floor)) if (n(k) < f) bad(`only ${n(k)} ${k} items; need at least ${f}`)
  if (n('mc') < QUESTIONS.length * 0.4) bad(`only ${n('mc')} mc items; at least 40% should be multiple choice`)
  const tf = QUESTIONS.filter(q => q.kind === 'tf')
  if (tf.length) {
    const share = tf.filter(q => q.answer).length / tf.length
    if (share < 0.4 || share > 0.6) bad(`true/false is ${Math.round(share * 100)}% True; keep it 40–60%`)
  }
  // The right answer must not be spottable by its length.
  const mc = QUESTIONS.filter(q => q.kind === 'mc' && q.options?.length === 4)
  const longest = mc.filter(q => q.options[0].length > Math.max(...q.options.slice(1).map(o => o.length))).length
  if (mc.length && longest / mc.length > 0.45) bad(`the right answer is the longest option in ${longest} of ${mc.length} mc items; a test-wise student can game that. Even out option lengths (under 45%)`)
  const fromClass = QUESTIONS.filter(q => q.src === 'slides' || q.src === 'article').length
  if (fromClass / QUESTIONS.length < 0.8) bad(`only ${fromClass} of ${QUESTIONS.length} items test class material; at least 80% should`)

  // ── Lesson ──
  const L = LESSON
  if (L.id !== topic || L.topic !== topic) bad(`LESSON.id and .topic must be '${topic}'`)
  for (const f of ['title', 'icon', 'tagline']) if (!L[f]) bad(`LESSON.${f} missing`)
  if (typeof L.minutes !== 'number') bad('LESSON.minutes must be a number')
  if (!Array.isArray(L.sections) || L.sections.length < 3) bad('LESSON needs at least 3 sections')
  L.sections?.forEach((s, i) => {
    const w = `section ${i + 1} '${s.heading}'`
    if (!s.heading) bad(`${w}: heading`)
    refOk(s.src, s.ref, w)
    if (!s.bullets && !s.body && !s.table) bad(`${w}: needs bullets, body or table`)
    if (s.table && (!Array.isArray(s.table.head) || !s.table.rows?.every(r => r.length === s.table.head.length))) bad(`${w}: every table row needs ${s.table?.head?.length} cells`)
    txt(s.body, w); txt(s.callout, w); s.bullets?.forEach(b => txt(b, w)); s.table?.rows?.flat().forEach(c => txt(c, w))
  })
  if (!Array.isArray(L.keyTerms) || L.keyTerms.length < 8) bad('LESSON needs at least 8 keyTerms')
  const slugs = (L.keyTerms ?? []).map(k => slug(k.term))
  if (new Set(slugs).size !== slugs.length) bad('two key terms share a card id (slug of the term)')
  L.keyTerms?.forEach(k => { if (!k.term || !k.def) bad(`key term ${k.term}: term and def`); refOk(k.src, k.ref, `key term '${k.term}'`); txt(k.def, k.term) })
  // The UI has a swatch for these four only (Lessons.jsx / Cards.jsx EMPH).
  for (const k of [...(L.keyTerms ?? []), ...(L.knowThis ?? [])]) {
    if (k.emph !== undefined && !['blue', 'red', 'orange', 'green'].includes(k.emph)) bad(`'${k.term ?? k.q}': emph must be blue, red, orange or green`)
    if (k.emph !== undefined && k.src !== 'slides') bad(`'${k.term ?? k.q}': emph only on slide items`)
  }
  if (!Array.isArray(L.knowThis) || L.knowThis.length < 5) bad('LESSON needs at least 5 knowThis items')
  L.knowThis?.forEach((k, i) => { if (!k.q || !k.a) bad(`knowThis ${i + 1}: q and a`); refOk(k.src, k.ref, `knowThis ${i + 1}`); txt(k.q, `knowThis ${i + 1}`); txt(k.a, `knowThis ${i + 1}`) })

  // ── Matching sets ──
  const setIds = MATCHING_SETS.map(m => m.id)
  if (new Set(setIds).size !== setIds.length) bad('matching set ids are not unique')
  if (MATCHING_SETS.length < 2) bad('at least 2 matching sets')
  for (const m of MATCHING_SETS) {
    const w = `set ${m.id}`
    if (!new RegExp(`^${spec.set}\\d{1,2}$`).test(m.id ?? '')) bad(`${w}: id must be '${spec.set}N'`)
    if (m.topic !== topic) bad(`${w}: topic`)
    refOk(m.src, m.ref, w)
    if (!m.title || !m.why) bad(`${w}: title and why`)
    const Ls = m.pairs?.map(p => p.left) ?? [], R = m.pairs?.map(p => p.right) ?? []
    if (Ls.length < 3 || Ls.length > 7 || new Set(Ls).size !== Ls.length || new Set(R).size !== R.length) bad(`${w}: 3–7 pairs, unique on both sides`)
    m.pairs?.forEach(p => { txt(p.left, w); txt(p.right, w) }); txt(m.why, w)
  }

  // ── Text sweeps ──
  for (const [s, w] of allText) {
    for (const m of s.matchAll(/\b([a-z]{3,}is(e|ed|es|ing))\b/gi)) if (!OK_ISE.has(m[1].toLowerCase())) bad(`${w}: British spelling? '${m[1]}'`)
    for (const m of s.matchAll(/\b(colour|behaviour|centre|organisation|analyse|favour|labelled|travelled|programmes?|catalogue|licence)(s|d|ing)?\b/gi)) bad(`${w}: British spelling '${m[0]}'`)
    if (/\b(professor|teacher)\b/i.test(s)) bad(`${w}: say 'the instructor'`)
    if (/instructor(’s|'s)?\s+(he|she|his|her|hers|him)\b/i.test(s)) bad(`${w}: no pronouns for the instructor`)
    if ((s.match(/\*\*/g) || []).length % 2) bad(`${w}: unbalanced ** bold markers`)
    if (/\bTODO\b|\bTBD\b|lorem/i.test(s)) bad(`${w}: placeholder text`)
    for (const m of s.matchAll(/[“"]([^”"]+)[”"]/g)) if (m[1].split(/\s+/).length > 15) bad(`${w}: a quotation of ${m[1].split(/\s+/).length} words; keep quotes under 15 words`)
  }
  return errs
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const topics = process.argv[2] ? [process.argv[2]] : Object.keys(SPEC).filter(t => existsSync(modPath(t)))
  let failed = 0
  for (const t of topics) {
    const errs = await checkTopic(t)
    if (errs.length) { failed++; console.log(`\n✗ ${t}: ${errs.length} problem(s)`); errs.forEach(e => console.log(`   - ${e}`)) }
    else console.log(`✓ ${t}`)
  }
  process.exit(failed ? 1 : 0)
}
