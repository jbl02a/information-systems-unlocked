import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { useScrollTop } from '../lib/useScrollTop'
import { prepare } from '../lib/bank'
import { matchCorrect } from '../lib/grade'
import MatchGrid from '../components/MatchGrid'
import SourceBadge from '../components/SourceBadge'
import { MATCHING_SETS, setById } from '../data/matchingSets'
import { TOPICS_BY_PRIORITY } from '../data/topics'

// A set clears only when every pair is right. That is the safe way to practice,
// not a quote: the syllabus says matching MAY appear and says nothing about how
// it is marked.
export default function Matching() {
  const { progress, record } = useProgress()
  const [params, setParams] = useSearchParams()
  const openId = params.get('set')
  const [shown, setShown] = useState(null)
  const [value, setValue] = useState({})
  const [result, setResult] = useState(null)
  useScrollTop([openId])

  const set = openId ? setById(openId) : null
  const statusOf = s => progress.misses?.[`MS-${s.id}`]

  function open(id) {
    const s = setById(id)
    setShown(s ? prepare({ ...s, kind: 'match' }) : null)
    setValue({}); setResult(null)
    setParams(id ? { set: id } : {})
  }

  function check() {
    const ok = matchCorrect(set, value)
    setResult({ ok, wrong: set.pairs.filter(p => value[p.left] !== p.right).length })
    record(`MS-${set.id}`, ok, { type: 'match', label: `Matching: ${set.title}` })
  }

  // ── One set ──────────────────────────────────────────────────────────────
  if (set) {
    const layout = shown?.id === set.id ? shown : prepare({ ...set, kind: 'match' })
    if (shown?.id !== set.id) setShown(layout)
    const allPicked = set.pairs.every(p => value[p.left])
    const idx = MATCHING_SETS.indexOf(set)
    const next = MATCHING_SETS[idx + 1]
    return (
      <div className="max-w-2xl mx-auto">
        <button onClick={() => open(null)} className="text-xs text-dim hover:text-strong mb-3">← All matching sets</button>
        <div className="rounded-xl bg-surface border border-line p-5 mb-5">
          <div className="flex flex-wrap gap-1.5 mb-2"><SourceBadge src={set.src} at={set.ref} /></div>
          <h1 className="text-xl font-extrabold text-strong mb-1">{set.title}</h1>
          <p className="text-sm text-dim">Match each item on the left to its partner. One wrong pair fails the set.</p>
        </div>

        <MatchGrid pairs={set.pairs} rowOrder={layout.rowOrder} choiceOrder={layout.choiceOrder}
          value={value} onChange={setValue} revealed={Boolean(result)} />

        {result && (
          <div data-match-result={result.ok ? 'right' : 'wrong'}
            className={`rounded-xl p-5 my-5 border ${result.ok ? 'bg-ok-soft border-ok-line' : 'bg-warn-soft border-warn-line'}`}>
            <p className="font-bold text-strong mb-2">{result.ok ? '✅ All correct: set cleared' : `📖 ${result.wrong} to fix, so the set is not cleared`}</p>
            <p className="text-sm text-body">{set.why}</p>
          </div>
        )}

        <div className="flex gap-3 mt-5">
          {!result ? (
            <button data-check onClick={check} disabled={!allPicked}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-700 to-orange-700 text-white font-bold hover:opacity-90 disabled:opacity-40">
              Check my answers
            </button>
          ) : (
            <>
              <button data-retry onClick={() => { setShown(null); setValue({}); setResult(null) }}
                className="flex-1 py-3 rounded-xl bg-surface2 text-strong font-semibold hover:bg-surface3">Try again</button>
              <button onClick={() => open(next ? next.id : null)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-700 to-orange-700 text-white font-bold hover:opacity-90">
                {next ? 'Next set →' : 'All sets'}
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  // ── Index ────────────────────────────────────────────────────────────────
  const cleared = MATCHING_SETS.filter(s => statusOf(s)?.last === 'right').length
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-strong mb-2">Matching</h1>
        <p className="text-dim">{MATCHING_SETS.length} sets, {MATCHING_SETS.reduce((n, s) => n + s.pairs.length, 0)} pairs. {cleared} cleared.</p>
      </div>

      <div className="rounded-2xl border border-warn-line bg-warn-soft p-4 mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-warn mb-1">These pairings are ours</p>
        <p className="text-sm text-body leading-relaxed">
          The syllabus says the test <strong className="text-strong">may</strong> include matching. It does not say
          what would be matched, or how a part-right answer is scored. We built these sets from the term-and-meaning
          material in the slides and the textbook topics, and grade them all or nothing, the safe way to practice.
          The facts carry their source badge; the arrangement is ours.
        </p>
      </div>

      {TOPICS_BY_PRIORITY.map(t => {
        const sets = MATCHING_SETS.filter(s => s.topic === t.id)
        if (!sets.length) return null
        return (
          <div key={t.id} className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">{t.icon} {t.label}</p>
            <div className="space-y-2">
              {sets.map(s => {
                const st = statusOf(s)
                return (
                  <button key={s.id} data-set={s.id} onClick={() => open(s.id)}
                    className="w-full text-left rounded-xl border border-line bg-surface p-4 hover:border-warn hover:bg-surface2 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-strong text-sm">{s.title}</p>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          <span className="text-xs text-dim">{s.pairs.length} pairs</span>
                          <SourceBadge src={s.src} />
                        </div>
                      </div>
                      {!st ? <span className="text-[11px] rounded-full px-2 py-0.5 font-semibold border bg-warn-soft border-warn-line text-warn">Not started</span>
                        : st.last === 'right' ? <span className="text-[11px] rounded-full px-2 py-0.5 font-semibold border bg-ok-soft border-ok-line text-ok">Cleared</span>
                        : <span className="text-[11px] rounded-full px-2 py-0.5 font-semibold border bg-bad-soft border-bad-line text-bad">Try again</span>}
                      <span className="text-warn font-bold">→</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      <p className="text-sm text-dim text-center">
        Matching also appears inside the <Link to="/exam" className="text-accent font-semibold">practice questions</Link>, mixed with the other formats.
      </p>
    </div>
  )
}
