import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { useScrollTop } from '../lib/useScrollTop'
import Rich from '../components/Rich'
import SourceBadge from '../components/SourceBadge'
import { LESSONS, lessonById } from '../data/lessons'
import { QUESTIONS } from '../data/questions'
import { MATCHING_SETS } from '../data/matchingSets'
import { TOPICS_BY_PRIORITY, topicById, DECKS } from '../data/topics'

const EMPH = {
  blue: 'text-info', red: 'text-bad', orange: 'text-warn', green: 'text-ok',
}

function Table({ table }) {
  return (
    <div className="overflow-x-auto my-3 rounded-xl border border-line">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface2">
            {table.head.map((h, i) => (
              <th key={i} className="text-left px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-dim whitespace-nowrap"><Rich text={h} /></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((r, i) => (
            <tr key={i} className="border-t border-line-soft">
              {r.map((c, j) => (
                <td key={j} className={`px-3 py-2 align-top ${j === 0 ? 'text-strong font-medium' : 'text-body'}`}><Rich text={c} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// "Know this" items hide their answer until asked: a list of prompts he cannot
// check is worth little, and seeing the answer first is worth less.
function KnowItem({ item, open, onToggle }) {
  return (
    <li data-know className="rounded-xl bg-surface border border-focus-line p-3">
      <p className="text-sm text-strong leading-relaxed">
        {item.emph && <span className={`${EMPH[item.emph]} mr-1`} title={`In ${item.emph} on the slide`}>●</span>}
        <Rich text={item.q} />
      </p>
      {open ? (
        <div data-answer className="mt-2 pt-2 border-t border-focus-line">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-focus">Answer</p>
            <SourceBadge src={item.src} at={item.ref} />
          </div>
          <p className="text-sm text-body leading-relaxed"><Rich text={item.a} /></p>
          <button onClick={onToggle} className="mt-2 text-xs text-dim hover:text-strong">Hide answer</button>
        </div>
      ) : (
        <button data-show onClick={onToggle}
          className="mt-2 text-xs font-semibold text-focus border border-focus-line rounded-lg px-2.5 py-1 hover:bg-focus-soft">
          Show answer
        </button>
      )}
    </li>
  )
}

function KnowList({ items }) {
  const [open, setOpen] = useState(() => items.map(() => false))
  const allOpen = open.every(Boolean)
  return (
    <>
      <ul className="space-y-2">
        {items.map((f, i) => (
          <KnowItem key={i} item={f} open={open[i]} onToggle={() => setOpen(o => o.map((v, j) => (j === i ? !v : v)))} />
        ))}
      </ul>
      <button onClick={() => setOpen(items.map(() => !allOpen))} className="mt-3 text-xs text-dim hover:text-strong">
        {allOpen ? 'Hide all answers' : 'Show all answers'}
      </button>
    </>
  )
}

export function BookOnlyBanner({ topic }) {
  return (
    <div className="rounded-2xl border-2 border-warn-line bg-warn-soft p-4 mb-6">
      <p className="text-xs font-bold uppercase tracking-wider text-warn mb-1">Textbook only: no class slides yet</p>
      <p className="text-sm text-body leading-relaxed">
        {topic.label} is on the Test 2 syllabus, but no slide deck for it has come in. Everything on this page is{' '}
        <strong className="text-strong">standard textbook content</strong>, written from general knowledge of this
        textbook, not from your class and not checked against your 10th edition. Learn the ideas and the vocabulary;
        if your notes or book say it differently, they win. When the slides arrive, they replace this.
      </p>
    </div>
  )
}

export function LessonsIndex() {
  useScrollTop([])
  const { progress } = useProgress()
  const read = id => progress.misses?.[`LESSON-${id}`]?.last === 'right'
  const lessons = TOPICS_BY_PRIORITY.map(t => lessonById(t.id)).filter(Boolean)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-brand-soft border border-brand-line rounded-full px-4 py-1.5 text-sm text-brand font-medium mb-4">
          <span>📚</span><span>Read this before the questions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-strong mb-2">Notes</h1>
        <p className="text-dim">
          One lesson per Test 2 topic. The two with class slides come first, with every term the instructor set in
          color marked. Each ends with a &ldquo;know this&rdquo; list, answers hidden until you try.
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {lessons.map(l => {
          const t = topicById(l.topic)
          return (
            <Link key={l.id} to={`/notes/${l.id}`}
              className="block rounded-2xl border border-line bg-surface p-5 hover:border-brand hover:bg-surface2 transition-colors">
              <div className="flex items-start gap-4">
                <span className="text-3xl shrink-0">{l.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-strong">{l.title}</p>
                    {read(l.id) && <span className="text-[11px] rounded-full px-2 py-0.5 font-semibold border bg-ok-soft border-ok-line text-ok">Read</span>}
                  </div>
                  <p className="text-sm text-dim mt-0.5">{l.tagline}</p>
                  <div className="flex flex-wrap gap-2 mt-2 text-[11px]">
                    <span className={`rounded-full border px-2 py-0.5 font-semibold ${t.basis === 'slides' ? 'text-ok border-ok-line bg-ok-soft' : 'text-warn border-warn-line bg-warn-soft'}`}>
                      {t.basis === 'slides' ? `${t.chapter} · ${t.decks.length} class decks` : `${t.chapter} · textbook only`}
                    </span>
                    <span className="rounded-full bg-sunken border border-line px-2 py-0.5 text-dim">~{l.minutes} min</span>
                    <span className="rounded-full bg-sunken border border-line px-2 py-0.5 text-dim">{l.keyTerms.length} key terms</span>
                  </div>
                </div>
                <span className="text-brand font-bold shrink-0">→</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export function Lesson() {
  const { lessonId } = useParams()
  const lesson = lessonById(lessonId)
  const { record } = useProgress()
  useScrollTop([lessonId])

  if (!lesson) {
    return (
      <div className="max-w-xl mx-auto text-center">
        <p className="text-strong font-bold mb-3">No such lesson.</p>
        <Link to="/notes" className="text-brand">← Back to the notes</Link>
      </div>
    )
  }

  const t = topicById(lesson.topic)
  const qCount = QUESTIONS.filter(q => q.topic === lesson.topic).length
  const mCount = MATCHING_SETS.filter(m => m.topic === lesson.topic).length
  const order = TOPICS_BY_PRIORITY.map(x => x.id)
  const next = lessonById(order[order.indexOf(lesson.id) + 1])
  const anyEmph = lesson.keyTerms.some(k => k.emph) || lesson.knowThis.some(k => k.emph)

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/notes" className="text-xs text-dim hover:text-strong">← All notes</Link>

      <div className="mt-3 mb-6">
        <p className="text-4xl mb-2">{lesson.icon}</p>
        <h1 className="text-3xl font-extrabold text-strong">{lesson.title}</h1>
        <p className="text-dim mt-1">{lesson.tagline}</p>
        <p className="text-xs text-dim mt-2">
          {t.basis === 'slides'
            ? `${t.chapter} · from the ${t.decks.map(d => DECKS[d].date).join(' and ')} class decks`
            : `${t.chapter} · textbook only`}
        </p>
      </div>

      {t.basis !== 'slides' && <BookOnlyBanner topic={t} />}

      {lesson.sections.map((sec, i) => (
        <section key={i} className={`mb-7 ${sec.src === 'book' && t.basis === 'slides' ? 'rounded-2xl border border-warn-line p-4' : ''}`}>
          <div className="flex items-start gap-2 flex-wrap mb-2 pb-1 border-b border-line">
            <h2 className="text-lg font-bold text-strong flex-1 min-w-0">{sec.heading}</h2>
            <SourceBadge src={sec.src} at={sec.ref} className="mt-1" />
          </div>
          {sec.body && <p className="text-sm text-body leading-relaxed mb-3"><Rich text={sec.body} /></p>}
          {sec.bullets && (
            <ul className="space-y-1.5 mb-3">
              {sec.bullets.map((b, j) => (
                <li key={j} className="text-sm text-body leading-relaxed flex gap-2">
                  <span className="text-brand shrink-0">•</span>
                  <span><Rich text={b} /></span>
                </li>
              ))}
            </ul>
          )}
          {sec.table && <Table table={sec.table} />}
          {sec.callout && (
            <div className="rounded-xl border border-warn-line bg-warn-soft p-4 my-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-warn mb-1">👀 Watch for this</p>
              <p className="text-sm text-body"><Rich text={sec.callout} /></p>
            </div>
          )}
        </section>
      ))}

      {lesson.keyTerms.length > 0 && (
        <section className="mb-7">
          <h2 className="text-lg font-bold text-strong mb-2 pb-1 border-b border-line">Key terms</h2>
          {anyEmph && (
            <p className="text-xs text-dim mb-3">
              A colored <span className="text-info">●</span> means the instructor set the term in color on the slide
              (the decks use blue, red, orange and green).
            </p>
          )}
          <div className="space-y-2">
            {lesson.keyTerms.map((k, i) => (
              <div key={i} className="rounded-xl border border-line bg-surface p-3">
                <div className="flex items-start gap-2 flex-wrap">
                  <p className="text-sm font-bold text-strong flex-1 min-w-0">
                    {k.emph && <span className={`${EMPH[k.emph]} mr-1`} title={`In ${k.emph} on the slide`}>●</span>}{k.term}
                  </p>
                  <SourceBadge src={k.src} at={k.ref} />
                </div>
                <p className="text-sm text-body mt-1 leading-relaxed"><Rich text={k.def} /></p>
              </div>
            ))}
          </div>
        </section>
      )}

      {lesson.knowThis.length > 0 && (
        <section className="mb-7">
          <div className="rounded-2xl border border-focus-line bg-focus-soft p-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-focus mb-1">🎯 Know this</p>
            <p className="text-xs text-dim mb-3">
              {t.basis === 'slides'
                ? 'Our list, built from what the instructor defined and set in color. There is no instructor study guide for Test 2, so this is not one. Answer out loud first, then check.'
                : 'Our list of the core textbook ideas. Answer out loud first, then check.'}
            </p>
            <KnowList items={lesson.knowThis} />
          </div>
        </section>
      )}

      <div className="rounded-2xl border border-line bg-surface p-5 mb-6">
        <p className="font-bold text-strong text-sm mb-1">Now prove you have it</p>
        <p className="text-sm text-dim mb-3">
          {qCount} questions{mCount > 0 ? ` and ${mCount} matching sets` : ''} cover this topic.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link to={`/exam?scope=${lesson.topic}`}
            onClick={() => record(`LESSON-${lesson.id}`, true, { type: 'lesson', label: `Read: ${lesson.title}` })}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 text-white font-bold hover:opacity-90 text-center">
            Quiz me on this topic →
          </Link>
          <Link to={`/cards?deck=${lesson.topic}`} className="flex-1 py-2.5 rounded-xl bg-surface2 text-strong font-semibold hover:bg-surface3 text-center">
            Flashcards
          </Link>
        </div>
      </div>

      {next && (
        <Link to={`/notes/${next.id}`} className="block rounded-xl border border-line bg-surface p-4 hover:border-brand hover:bg-surface2 transition-colors">
          <p className="text-xs text-dim">Next</p>
          <p className="font-semibold text-strong text-sm">{next.icon} {next.title} →</p>
        </Link>
      )}
    </div>
  )
}
