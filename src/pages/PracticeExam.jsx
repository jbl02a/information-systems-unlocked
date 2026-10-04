import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import FormatNotice from '../components/FormatNotice'
import SourceBadge from '../components/SourceBadge'
import MatchGrid from '../components/MatchGrid'
import Rich from '../components/Rich'
import { useScrollTop } from '../lib/useScrollTop'
import { saveExamSession, loadExamSession, clearExamSession, describeAge } from '../lib/examSession'
import { questionsFor, prepare, layoutOf, shuffle, REHEARSAL_SIZE } from '../lib/bank'
import { creditFor, isFullyRight } from '../lib/grade'
import { QUESTIONS, KINDS } from '../data/questions'
import { TOPICS_BY_PRIORITY, topicById } from '../data/topics'

const BY_ID = Object.fromEntries(QUESTIONS.map(q => [q.id, q]))

const SCOPES = [
  { id: 'rehearsal', label: `Rehearsal (${REHEARSAL_SIZE})`, icon: '⏱️', kind: 'exam',
    blurb: 'A mix of all six topics, weighted toward the two with class slides. The mix is ours.' },
  { id: 'full', label: `Every question (${QUESTIONS.length})`, icon: '📚', kind: 'drill',
    blurb: 'The whole bank, every topic and every format.' },
]

// ── One item, any kind ──────────────────────────────────────────────────────
function KindBadge({ kind }) {
  return (
    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-brand border border-brand-line bg-brand-soft rounded-full px-2 py-0.5">
      {KINDS[kind]?.label}
    </span>
  )
}

function McBody({ q, value, revealed, onAnswer }) {
  return (
    <div className="space-y-3">
      {q.options.map((opt, i) => {
        const isAnswer = revealed && i === q.correctIndex
        const isWrong = revealed && value === i && i !== q.correctIndex
        const cls = isAnswer ? 'border-ok bg-ok-soft'
          : isWrong ? 'border-bad bg-bad-soft'
          : revealed ? 'border-line bg-surface opacity-70'
          : value === i ? 'border-accent bg-accent-soft'
          : 'border-line bg-surface hover:border-accent hover:bg-surface2'
        return (
          <button key={i} data-option={i} onClick={() => onAnswer(i, true)} disabled={revealed}
            className={`w-full text-left rounded-xl border p-3 transition-colors ${cls}`}>
            <div className="flex items-start gap-3">
              <span className="text-xs font-bold mt-0.5 shrink-0 text-muted">{'ABCD'[i]}</span>
              <span className="text-sm text-strong flex-1">{opt}</span>
              {isAnswer && <span className="text-ok">✓</span>}
              {isWrong && <span className="text-bad">✗</span>}
            </div>
          </button>
        )
      })}
    </div>
  )
}

function TfBody({ q, value, revealed, onAnswer }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[true, false].map(v => {
        const isAnswer = revealed && v === q.answer
        const isWrong = revealed && value === v && v !== q.answer
        const cls = isAnswer ? 'border-ok bg-ok-soft'
          : isWrong ? 'border-bad bg-bad-soft'
          : revealed ? 'border-line bg-surface opacity-70'
          : value === v ? 'border-accent bg-accent-soft'
          : 'border-line bg-surface hover:border-accent hover:bg-surface2'
        return (
          <button key={String(v)} data-tf={String(v)} onClick={() => onAnswer(v, true)} disabled={revealed}
            className={`rounded-xl border p-4 text-center font-bold text-strong transition-colors ${cls}`}>
            {v ? 'True' : 'False'} {isAnswer && '✓'}{isWrong && '✗'}
          </button>
        )
      })}
    </div>
  )
}

function BlankBody({ q, value, revealed, onAnswer, mode }) {
  const [text, setText] = useState(value ?? '')
  useEffect(() => { setText(value ?? '') }, [q.id]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      <input
        data-blank
        value={text}
        disabled={revealed}
        onChange={e => { setText(e.target.value); if (mode === 'exam') onAnswer(e.target.value, false) }}
        onKeyDown={e => { if (e.key === 'Enter' && text.trim() && mode === 'practice') onAnswer(text, true) }}
        placeholder="Type the missing word"
        autoComplete="off" autoCapitalize="off" spellCheck="false"
        className="w-full rounded-xl bg-surface border border-line text-strong px-4 py-3 text-base disabled:opacity-80"
      />
      {mode === 'practice' && !revealed && (
        <button onClick={() => onAnswer(text, true)} disabled={!text.trim()}
          className="mt-3 w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 text-white font-bold disabled:opacity-40">
          Check
        </button>
      )}
      {revealed && (
        <p className="text-sm text-body mt-2">Accepted: <strong className="text-strong">{q.answers.join(' · ')}</strong></p>
      )}
    </div>
  )
}

function MatchBody({ q, value, revealed, onAnswer, mode }) {
  const allPicked = q.pairs.every(p => value?.[p.left])
  return (
    <div>
      <MatchGrid pairs={q.pairs} rowOrder={q.rowOrder} choiceOrder={q.choiceOrder} value={value || {}}
        revealed={revealed} onChange={v => onAnswer(v, false)} />
      <p className="text-xs text-dim mt-2">All or nothing: one wrong pair and the whole item is wrong.</p>
      {mode === 'practice' && !revealed && (
        <button onClick={() => onAnswer(value || {}, true)} disabled={!allPicked}
          className="mt-3 w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 text-white font-bold disabled:opacity-40">
          Check
        </button>
      )}
    </div>
  )
}

// Short answer cannot be auto-graded, and the app does not pretend to. He writes
// (or says) his answer, opens the model answer, and ticks each key point he made.
function ShortBody({ q, value, revealed, onAnswer, onReveal }) {
  const [draft, setDraft] = useState('')
  useEffect(() => { setDraft('') }, [q.id])
  const ticked = new Set(Array.isArray(value) ? value : [])
  const toggle = i => {
    const next = new Set(ticked)
    next.has(i) ? next.delete(i) : next.add(i)
    onAnswer([...next].sort((a, b) => a - b), false)
  }
  return (
    <div>
      {!revealed ? (
        <>
          <textarea value={draft} onChange={e => setDraft(e.target.value)} rows={4}
            placeholder="Write your answer here (or say it out loud). Nothing here is graded."
            className="w-full rounded-xl bg-surface border border-line text-strong px-4 py-3 text-sm" />
          <button data-reveal-model onClick={() => { onAnswer([], false); onReveal() }}
            className="mt-3 w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 text-white font-bold">
            Show the model answer and mark yourself
          </button>
        </>
      ) : (
        <div className="rounded-xl border border-line bg-sunken p-4">
          {draft && (
            <div className="mb-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-1">What you wrote</p>
              <p className="text-sm text-body whitespace-pre-wrap">{draft}</p>
            </div>
          )}
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-1">Model answer</p>
          <p className="text-sm text-body leading-relaxed mb-3">{q.model}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Tick each key point your answer made</p>
          <div className="space-y-1.5">
            {q.points.map((pt, i) => (
              <label key={i} data-point={i} className="flex items-start gap-2.5 rounded-lg border border-line bg-surface p-2.5 cursor-pointer">
                <input type="checkbox" checked={ticked.has(i)} onChange={() => toggle(i)} className="mt-0.5 h-4 w-4 accent-teal-700" />
                <span className="text-sm text-body">{pt}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-dim mt-2">
            {ticked.size} of {q.points.length} points. Be honest: this is the only grader a short answer has.
          </p>
        </div>
      )}
    </div>
  )
}

function correctText(item) {
  switch (item.kind) {
    case 'mc': return item.options[item.correctIndex]
    case 'tf': return item.answer ? 'True' : 'False'
    case 'blank': return item.answers[0]
    case 'match': return item.pairs.map(p => `${p.left} → ${p.right}`).join(' · ')
    case 'short': return item.model
    default: return ''
  }
}

function givenText(item, given) {
  if (given === undefined || given === null) return null
  switch (item.kind) {
    case 'mc': return item.options[given]
    case 'tf': return given ? 'True' : 'False'
    case 'blank': return String(given)
    case 'match': return item.pairs.map(p => `${p.left} → ${given[p.left] || '—'}`).join(' · ')
    case 'short': return `${given.length} of ${item.points.length} key points`
    default: return null
  }
}

// ── The page ────────────────────────────────────────────────────────────────
export default function PracticeExam() {
  const [params] = useSearchParams()
  const { progress, recordExam, needsWorkIds, setHold, isHeld, clearMisses } = useProgress()
  const [stage, setStage] = useState('setup')
  const [mode, setMode] = useState('practice')
  const [scopeLabel, setScopeLabel] = useState('')
  const [scopeKind, setScopeKind] = useState('drill')
  const [items, setItems] = useState([])
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [revealedIds, setRevealedIds] = useState([])
  const [saved, setSaved] = useState(() => loadExamSession(QUESTIONS.map(q => q.id)))
  useScrollTop([stage, index])

  const best = progress.exam?.best
  const attempts = progress.exam?.attempts || []
  const weakIds = needsWorkIds('q').filter(id => BY_ID[id])

  useEffect(() => {
    const scope = params.get('scope')
    if (scope && stage === 'setup') {
      const t = topicById(scope)
      if (t) start(scope, t.label, 'drill')
      else if (scope === 'misses' && weakIds.length) startMisses()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (stage !== 'taking' || items.length === 0) return
    saveExamSession({
      ids: items.map(q => q.id),
      layouts: Object.fromEntries(items.map(q => [q.id, layoutOf(q)]).filter(([, l]) => l)),
      answers, revealedIds, index, mode, scopeLabel, scopeKind,
    })
  }, [stage, items, answers, revealedIds, index, mode, scopeLabel, scopeKind])

  function launch(list, label, kind, forcedMode) {
    if (list.length === 0) return
    setItems(list.map(q => prepare(q)))
    setScopeLabel(label); setScopeKind(kind)
    if (forcedMode) setMode(forcedMode)
    setIndex(0); setAnswers({}); setRevealedIds([]); setSaved(null); setStage('taking')
  }

  function start(scope, label, kind) {
    launch(questionsFor(scope), label, kind)
  }

  // A drill exists to fix a mistake, so it always explains as you go.
  function startMisses() {
    launch(shuffle(weakIds.map(id => BY_ID[id]).filter(Boolean)), 'What I missed', 'drill', 'practice')
  }

  function resume() {
    setItems(saved.ids.map(id => prepare(BY_ID[id], saved.layouts?.[id])))
    setAnswers(saved.answers); setRevealedIds(saved.revealedIds); setIndex(saved.index)
    setMode(saved.mode); setScopeLabel(saved.scopeLabel); setScopeKind(saved.scopeKind)
    setStage('taking')
  }

  const q = items[index]
  // Short answers reveal on request in either mode: they cannot be marked otherwise.
  const revealed = Boolean(q) && revealedIds.includes(q.id) && (mode === 'practice' || q.kind === 'short')
  const answered = items.filter(x => answers[x.id] !== undefined).length

  function answer(value, final) {
    setAnswers(p => ({ ...p, [q.id]: value }))
    if (final && mode === 'practice') setRevealedIds(p => (p.includes(q.id) ? p : [...p, q.id]))
  }
  const reveal = () => setRevealedIds(p => (p.includes(q.id) ? p : [...p, q.id]))

  function submit() {
    const credit = items.reduce((n, x) => n + creditFor(x, answers[x.id]), 0)
    const correct = items.filter(x => isFullyRight(x, answers[x.id])).length
    recordExam({
      score: Math.round((credit / items.length) * 100),
      correct, total: items.length, label: scopeLabel, kind: scopeKind,
      results: items.map(x => ({ id: x.id, correct: isFullyRight(x, answers[x.id]) })),
    })
    clearExamSession(); setSaved(null); setStage('results')
  }

  // ── Setup ─────────────────────────────────────────────────────────────────
  if (stage === 'setup') {
    const kinds = Object.keys(KINDS)
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-strong mb-2">Practice Questions</h1>
          <p className="text-dim">All five formats on the syllabus, every answer explained, every item labeled with where it came from.</p>
          {best !== null && best !== undefined && (
            <p className="mt-4 inline-block rounded-full bg-ok-soft border border-ok-line px-4 py-1.5 text-sm text-ok font-semibold">
              Best rehearsal: {best}%
            </p>
          )}
        </div>

        {weakIds.length > 0 && (
          <div className="rounded-2xl border border-focus-line bg-focus-soft p-5 mb-6">
            <p className="text-[10px] font-bold uppercase tracking-wider text-focus mb-1">Start here</p>
            <p className="font-bold text-strong">{weakIds.length} question{weakIds.length === 1 ? '' : 's'} to work on</p>
            <p className="text-sm text-dim mt-0.5">Everything you missed last time you saw it, with the reason straight after each one.</p>
            <div className="flex flex-col sm:flex-row gap-2 mt-3">
              <button data-drill-misses onClick={startMisses} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-700 to-pink-700 text-white font-bold hover:opacity-90">
                Drill what I missed ({weakIds.length}) →
              </button>
              <button onClick={() => clearMisses('q')} className="px-4 py-2.5 rounded-xl bg-surface2 text-dim text-sm font-semibold hover:bg-surface3">
                Clear list
              </button>
            </div>
          </div>
        )}

        {saved && (
          <div className="rounded-2xl border border-warn-line bg-warn-soft p-5 mb-6">
            <p className="font-bold text-strong">You have a set in progress</p>
            <p className="text-sm text-dim mt-0.5">
              {saved.scopeLabel}: {saved.answeredCount} of {saved.ids.length} answered, saved {describeAge(saved.savedAt)}.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mt-3">
              <button data-resume onClick={resume} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-700 to-orange-700 text-white font-bold hover:opacity-90">
                Resume →
              </button>
              <button onClick={() => { clearExamSession(); setSaved(null) }} className="px-4 py-2.5 rounded-xl bg-surface2 text-dim text-sm font-semibold hover:bg-surface3">
                Discard
              </button>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-line bg-surface p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-muted mb-1">How do you want to take it?</p>
          <div className="grid sm:grid-cols-2 gap-3 mt-2">
            {[
              { id: 'practice', title: 'Practice mode', desc: 'The answer and the reason after every question. Start here.' },
              { id: 'exam', title: 'Exam mode', desc: 'No feedback until you submit. Move here once practice is going well.' },
            ].map(m => (
              <button key={m.id} data-mode={m.id} onClick={() => setMode(m.id)}
                className={`text-left rounded-xl border p-4 transition-colors ${mode === m.id ? 'border-accent bg-accent-soft' : 'border-line bg-surface hover:border-accent'}`}>
                <p className="font-bold text-strong text-sm mb-1">{m.title} {mode === m.id && <span className="text-accent-strong">✓</span>}</p>
                <p className="text-xs text-dim">{m.desc}</p>
              </button>
            ))}
          </div>
          <p className="text-xs text-dim mt-3">Short answers show their model answer when you ask, in either mode, because you mark them yourself.</p>
        </div>

        <div className="space-y-3 mb-6">
          {SCOPES.map(s => (
            <button key={s.id} data-scope={s.id} onClick={() => start(s.id, s.label, s.kind)}
              className="w-full text-left rounded-2xl border border-line bg-surface p-5 hover:border-accent hover:bg-surface2 transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{s.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-strong">{s.label}</p>
                  <p className="text-sm text-dim">{s.blurb}</p>
                </div>
                <span className="text-accent-strong font-bold">→</span>
              </div>
            </button>
          ))}
        </div>

        <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">One topic</p>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {TOPICS_BY_PRIORITY.map(t => (
            <button key={t.id} data-scope={t.id} onClick={() => start(t.id, t.label, 'drill')}
              className="text-left rounded-xl border border-line bg-surface p-4 hover:border-accent hover:bg-surface2 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{t.icon}</span>
                <p className="font-semibold text-strong text-sm flex-1">{t.label}</p>
                <span className="text-xs text-muted">{QUESTIONS.filter(x => x.topic === t.id).length} Q</span>
              </div>
              <p className="text-xs text-dim">{t.basis === 'slides' ? `${t.chapter} · class slides` : `${t.chapter} · textbook only`}</p>
            </button>
          ))}
        </div>

        <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">One format</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {kinds.map(k => (
            <button key={k} data-scope={`kind:${k}`} onClick={() => start(`kind:${k}`, `${KINDS[k].label} only`, 'drill')}
              className="text-sm font-semibold text-body rounded-xl border border-line bg-surface px-3 py-2 hover:border-accent hover:bg-surface2">
              {KINDS[k].label} <span className="text-muted">({QUESTIONS.filter(x => x.kind === k).length})</span>
            </button>
          ))}
        </div>

        <FormatNotice className="mb-6" />

        {attempts.length > 0 && (
          <div className="rounded-2xl border border-line bg-surface p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Recent attempts</p>
            <div className="divide-y divide-line-soft">
              {attempts.slice(0, 6).map((a, i) => (
                <div key={i} className="py-2 flex items-center gap-3 text-sm">
                  <span className={`font-bold w-12 ${a.score >= 80 ? 'text-ok' : a.score >= 60 ? 'text-warn' : 'text-bad'}`}>{a.score}%</span>
                  <span className="text-body flex-1">
                    {a.label}
                    {a.kind === 'exam' && <span className="ml-1.5 text-[10px] text-accent font-semibold">REHEARSAL</span>}
                  </span>
                  <span className="text-muted text-xs">{a.correct}/{a.total}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // ── Results ───────────────────────────────────────────────────────────────
  if (stage === 'results') {
    const credit = items.reduce((n, x) => n + creditFor(x, answers[x.id]), 0)
    const score = Math.round((credit / items.length) * 100)
    const fully = items.filter(x => isFullyRight(x, answers[x.id])).length
    const present = [...new Set(items.map(x => x.topic))]
    const byTopic = present.map(id => {
      const qs = items.filter(x => x.topic === id)
      const t = topicById(id)
      return { id, ...t, got: qs.reduce((n, x) => n + creditFor(x, answers[x.id]), 0), total: qs.length }
    })
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-strong mb-1">{scopeLabel}</h1>
          <p data-score className="text-5xl font-black grad-text my-3">{score}%</p>
          <p className="text-dim">{fully} of {items.length} fully right{items.some(x => x.kind === 'short') ? ' (short answers count their ticked points)' : ''}</p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">By topic</p>
          <div className="space-y-3">
            {byTopic.map(s => {
              const pct = Math.round((s.got / s.total) * 100)
              return (
                <div key={s.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-body">{s.icon} {s.label}</span>
                    <span className={`font-semibold ${pct >= 80 ? 'text-ok' : pct >= 60 ? 'text-warn' : 'text-bad'}`}>{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface2 overflow-hidden">
                    <div className={`h-full rounded-full ${pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {fully < items.length && (
            <button onClick={startMisses} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-700 to-pink-700 text-white font-bold hover:opacity-90">
              Drill what I missed →
            </button>
          )}
          <button onClick={() => setStage('setup')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 text-white font-bold hover:opacity-90">
            Take another →
          </button>
        </div>

        <h2 className="font-bold text-strong mb-3">Full review</h2>
        <div className="space-y-4">
          {items.map((item, i) => {
            const given = answers[item.id]
            const right = isFullyRight(item, given)
            const g = givenText(item, given)
            return (
              <div key={item.id} className={`rounded-xl border p-4 ${right ? 'border-ok-line bg-ok-soft' : 'border-bad-line bg-bad-soft'}`}>
                <div className="flex items-start gap-2 mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${right ? 'text-ok' : 'text-bad'}`}>{right ? '✓' : '✗'} {i + 1}</span>
                  <p className="text-sm font-semibold text-strong flex-1">{item.prompt}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2"><KindBadge kind={item.kind} /><SourceBadge src={item.src} at={item.ref} /></div>
                <p className="text-sm text-ok mb-1">{correctText(item)}</p>
                {!right && g !== null && <p className="text-sm text-bad mb-1">You said: {g}</p>}
                {g === null && <p className="text-sm text-dim italic mb-1">skipped</p>}
                <p className="text-sm text-body leading-relaxed"><Rich text={item.explanation} /></p>
                {right && (
                  <button onClick={() => setHold(item.id, !isHeld(item.id))}
                    className={`mt-2 text-[11px] px-2.5 py-1 rounded-lg font-semibold border ${
                      isHeld(item.id) ? 'bg-warn-soft border-warn-line text-warn' : 'bg-surface border-line text-dim hover:bg-surface2'}`}>
                    {isHeld(item.id) ? '📌 Kept on your list (tap to retire)' : '📌 Not sure: keep it on my list'}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // ── Taking ────────────────────────────────────────────────────────────────
  const isLast = index === items.length - 1
  const value = answers[q.id]
  const t = topicById(q.topic)
  const right = revealed && isFullyRight(q, value)
  const Body = { mc: McBody, tf: TfBody, blank: BlankBody, match: MatchBody, short: ShortBody }[q.kind]

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-accent-strong font-semibold">Question {index + 1} of {items.length}</span>
          <span className="text-muted">{answered} answered · {mode === 'practice' ? 'practice' : 'exam'} mode</span>
        </div>
        <div className="h-1.5 rounded-full bg-surface2 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300"
            style={{ width: `${((index + 1) / items.length) * 100}%` }} />
        </div>
      </div>

      <div className="rounded-xl bg-surface border border-line p-5 mb-5" data-item={q.id} data-kind={q.kind}>
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-2">{t?.icon} {t?.label}</p>
        <div className="flex flex-wrap gap-1.5 mb-3"><KindBadge kind={q.kind} /><SourceBadge src={q.src} at={q.ref} /></div>
        <p className="font-semibold text-strong">{q.prompt}</p>
      </div>

      <div className="mb-5">
        <Body q={q} value={value} revealed={revealed} onAnswer={answer} onReveal={reveal} mode={mode} />
      </div>

      {revealed && q.kind !== 'short' && (
        <div data-feedback className={`rounded-xl p-5 mb-5 border ${right ? 'bg-ok-soft border-ok-line' : 'bg-warn-soft border-warn-line'}`}>
          <p className="font-bold text-strong mb-2">{right ? '✅ Correct' : '📖 Not quite'}</p>
          <p className="text-sm text-body"><Rich text={q.explanation} /></p>
          {right && (
            <div className="mt-4 pt-3 border-t border-line flex items-center gap-2 flex-wrap">
              {isHeld(q.id) ? (
                <>
                  <span className="text-xs text-warn font-semibold">📌 Kept on your list</span>
                  <button onClick={() => setHold(q.id, false)} className="text-xs px-3 py-1.5 rounded-lg bg-surface2 text-body font-semibold hover:bg-surface3">I've got this</button>
                </>
              ) : (
                <button onClick={() => setHold(q.id, true)} className="text-xs px-3 py-1.5 rounded-lg bg-warn-soft border border-warn-line text-warn font-semibold">
                  📌 Not sure yet: keep it on my list
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {revealed && q.kind === 'short' && (
        <div className="rounded-xl p-5 mb-5 border bg-surface border-line">
          <p className="text-sm text-body"><Rich text={q.explanation} /></p>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={() => setIndex(i => Math.max(0, i - 1))} disabled={index === 0}
          className="px-4 py-3 rounded-xl bg-surface2 text-strong font-semibold disabled:opacity-30 hover:bg-surface3">←</button>
        {!isLast ? (
          <button data-next onClick={() => setIndex(i => i + 1)} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 text-white font-bold hover:opacity-90">
            {value === undefined ? 'Skip for now →' : 'Next question →'}
          </button>
        ) : (
          <button data-submit onClick={submit} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-700 to-emerald-700 text-white font-bold hover:opacity-90">
            Submit &amp; see score →
          </button>
        )}
      </div>
      <button onClick={() => { clearExamSession(); setSaved(null); setStage('setup') }}
        className="w-full mt-4 text-xs text-muted hover:text-strong">Quit and start over</button>
    </div>
  )
}
