import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { useScrollTop } from '../lib/useScrollTop'
import FormatNotice from '../components/FormatNotice'
import { QUESTIONS } from '../data/questions'
import { TOPICS_BY_PRIORITY } from '../data/topics'

// Teach first, then test: the notes lead the page.
export default function Home() {
  useScrollTop([])
  const { progress, needsWorkIds } = useProgress()
  const best = progress.exam?.best
  const weak = needsWorkIds('q').filter(id => QUESTIONS.some(q => q.id === id)).length
  const read = id => progress.misses?.[`LESSON-${id}`]?.last === 'right'

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8 pt-2">
        <div className="inline-flex items-center gap-2 bg-accent-soft border border-accent-line rounded-full px-4 py-1.5 text-sm text-accent font-medium mb-5">
          <span>🎯</span><span>Intro to Information Systems · Test 2</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-strong mb-4 leading-tight">
          Information systems, <span className="grad-text">unlocked</span>.
        </h1>
        <p className="text-dim max-w-xl mx-auto">
          Built from the instructor&rsquo;s Chapter 3 and 4 slide decks, including every term set in color, plus
          the four syllabus topics that have no slides yet, clearly labeled as textbook content.
        </p>
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
              <p className="text-sm text-dim">
                Six lessons, one per topic. The slide-backed chapters come first, each ending with a &ldquo;know
                this&rdquo; list whose answers stay hidden until you try.
              </p>
            </div>
            <span className="text-brand font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Link>

      <div className="grid sm:grid-cols-2 gap-2 mb-6">
        {TOPICS_BY_PRIORITY.map(t => (
          <Link key={t.id} to={`/notes/${t.id}`}
            className="rounded-xl border border-line bg-surface p-3 hover:border-brand hover:bg-surface2 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">{t.icon}</span>
              <p className="font-semibold text-strong text-sm flex-1">{t.label}</p>
              {read(t.id) && <span className="text-[10px] font-bold text-ok">READ</span>}
            </div>
            <p className={`text-[11px] font-semibold mt-1 ${t.basis === 'slides' ? 'text-ok' : 'text-warn'}`}>
              {t.basis === 'slides' ? `${t.chapter} · class slides` : 'Textbook only · no slides yet'}
            </p>
          </Link>
        ))}
      </div>

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
                {QUESTIONS.length} questions in all five syllabus formats: multiple choice, true/false, fill in the
                blank, matching and short answer. Every one explained.
              </p>
            </div>
            <span className="text-accent-strong font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Link>

      <FormatNotice className="mb-6" />
    </div>
  )
}
