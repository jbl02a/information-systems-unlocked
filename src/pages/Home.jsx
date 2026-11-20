import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { useUnit } from '../context/UnitContext'
import { useScrollTop } from '../lib/useScrollTop'
import FormatNotice from '../components/FormatNotice'
import StudyPlan from '../components/StudyPlan'
import { questionsIn } from '../lib/bank'
import { MATCHING_SETS } from '../data/matchingSets'
import { CARDS } from '../data/cards'
import { topicsFor, unitOfTopic, unitById } from '../data/topics'

// Per-test wording. Everything else on the page is counted from the data.
const COPY = {
  t2: {
    intro: 'Built from the instructor’s Chapter 3 and 4 slide decks, including every term set in color, plus the four syllabus topics that have no slides yet, clearly labeled as textbook content.',
    notes: 'Six lessons, one per topic. The slide-backed chapters come first, each ending with a “know this” list whose answers stay hidden until you try.',
  },
  t3: {
    intro: 'Built from the instructor’s eight class decks since Test 2 (Chapters 5, 6, 7 and 9, data visualization and project management) and the assigned articles.',
    notes: 'Seven lessons, one per topic, in the order they were taught. Each ends with a “know this” list whose answers stay hidden until you try.',
  },
}

const basisNote = t => (t.basis === 'slides' ? `${t.chapter} · class slides` : t.basis === 'article' ? 'Assigned reading' : 'Textbook only · no slides yet')

// Teach first, then test: the notes lead the page.
export default function Home() {
  useScrollTop([])
  const { progress, needsWorkIds } = useProgress()
  const { unit } = useUnit()
  const U = unitById(unit)
  const copy = COPY[unit]
  const questions = questionsIn(unit)
  const sets = MATCHING_SETS.filter(s => unitOfTopic(s.topic) === unit)
  const cards = CARDS.filter(c => unitOfTopic(c.topic) === unit)
  const topics = topicsFor(unit)
  const best = progress.exam?.best?.[unit]
  const weak = needsWorkIds('q').filter(id => questions.some(q => q.id === id)).length
  const read = id => progress.misses?.[`LESSON-${id}`]?.last === 'right'

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8 pt-2">
        <div className="inline-flex items-center gap-2 bg-accent-soft border border-accent-line rounded-full px-4 py-1.5 text-sm text-accent font-medium mb-5">
          <span>🎯</span><span>Intro to Information Systems · {U.label}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-strong mb-4 leading-tight">
          Information systems, <span className="grad-text">unlocked</span>.
        </h1>
        <p className="text-dim max-w-xl mx-auto">{copy.intro}</p>
      </div>

      {/* Read first, then test. */}
      <Link to="/notes" data-home-notes className="block mb-4 group">
        <div className="rounded-2xl border border-line bg-gradient-to-br from-indigo-600/20 via-violet-600/20 to-purple-600/20 p-5 hover:border-brand transition-colors">
          <div className="flex items-center gap-4">
            <span className="text-4xl">📚</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-bold text-strong text-lg">Notes</h2>
                <span className="text-xs font-bold text-brand bg-brand-soft border border-brand-line px-2 py-0.5 rounded-full">start here</span>
              </div>
              <p className="text-sm text-dim">{copy.notes}</p>
            </div>
            <span className="text-brand font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Link>

      <div className="grid sm:grid-cols-2 gap-2 mb-6">
        {topics.map(t => (
          <Link key={t.id} to={`/notes/${t.id}`}
            className="rounded-xl border border-line bg-surface p-3 hover:border-brand hover:bg-surface2 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">{t.icon}</span>
              <p className="font-semibold text-strong text-sm flex-1">{t.label}</p>
              {read(t.id) && <span className="text-[10px] font-bold text-ok">READ</span>}
            </div>
            <p className={`text-[11px] font-semibold mt-1 ${t.basis === 'book' ? 'text-warn' : 'text-ok'}`}>{basisNote(t)}</p>
          </Link>
        ))}
      </div>

      <StudyPlan className="mb-6" />

      <Link to="/exam" className="block mb-8 group">
        <div className="rounded-2xl border border-line bg-gradient-to-br from-teal-600/20 via-cyan-600/20 to-blue-600/20 p-5 hover:border-accent transition-colors">
          <div className="flex items-center gap-4">
            <span className="text-4xl">📝</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-bold text-strong text-lg">Practice questions</h2>
                {best !== null && best !== undefined && (
                  <span className="text-xs font-bold text-ok bg-ok-soft border border-ok-line px-2 py-0.5 rounded-full">best {best}%</span>
                )}
                {weak > 0 && (
                  <span className="text-xs font-bold text-focus bg-focus-soft border border-focus-line px-2 py-0.5 rounded-full">{weak} to review</span>
                )}
              </div>
              <p className="text-sm text-dim">
                {questions.length} {U.label} questions in all five syllabus formats: multiple choice, true/false, fill
                in the blank, matching and short answer. Every one explained.
              </p>
            </div>
            <span className="text-accent-strong font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Link>

      <Link to="/matching" className="block mb-8 group">
        <div className="rounded-2xl border border-line bg-gradient-to-br from-amber-600/20 via-orange-600/20 to-rose-600/20 p-5 hover:border-warn transition-colors">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🔀</span>
            <div className="flex-1">
              <h2 className="font-bold text-strong text-lg">Matching</h2>
              <p className="text-sm text-dim">
                {sets.length} sets, {sets.reduce((n, s) => n + s.pairs.length, 0)} pairs, all or nothing. The test may include matching; these pairings are ours.
              </p>
            </div>
            <span className="text-warn font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Link>

      <Link to="/cards" className="block mb-8 group">
        <div className="rounded-2xl border border-line bg-gradient-to-br from-rose-600/20 to-pink-600/20 p-5 hover:border-focus transition-colors">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🃏</span>
            <div className="flex-1">
              <h2 className="font-bold text-strong text-lg">Quick cram cards</h2>
              <p className="text-sm text-dim">{cards.length} flashcards, one per key term. The ones you didn&rsquo;t know come back in their own deck.</p>
            </div>
            <span className="text-focus font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Link>

      <Link to="/cram" className="block mb-8 group">
        <div className="rounded-2xl border border-line bg-surface p-5 hover:border-line-strong transition-colors">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🖨️</span>
            <div className="flex-1">
              <h2 className="font-bold text-strong text-lg">Cram sheet</h2>
              <p className="text-sm text-dim">All {topics.length} {U.label} topics on two printed pages, for the night before.</p>
            </div>
            <span className="text-dim font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Link>

      <FormatNotice className="mb-6" />
    </div>
  )
}
