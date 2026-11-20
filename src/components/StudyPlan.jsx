import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { LESSONS } from '../data/lessons'
import { CARDS } from '../data/cards'
import { useUnit } from '../context/UnitContext'
import { unitOfTopic } from '../data/topics'

// The order answers one question: if he runs out of time, what should already be
// done? So it is sorted by POINTS PER MINUTE, not by the size of each pile.
//
// Three properties decide it, and they are stated in the UI so the reasoning is
// inspectable rather than trust-me:
//
//   CERTAIN    — the class slides are what the instructor chose to teach, and
//                the colored terms are what the instructor chose to stress. Those
//                points are the likeliest to be asked. The four textbook-only
//                topics are on the syllabus, but we cannot know what the
//                instructor will pull from them.
//   CHEAP      — a know-this list or a deck of colored terms is a closed list of
//                facts: minutes, not hours.
//   DIVISIBLE  — learn 5 of 19 facts and you keep 5 facts' worth. A matching set
//                is lumpy (one wrong pair fails it), so a half-finished one is
//                time spent for nothing.
//
// If you reorder this, say which property changed. Do not reorder by total points.
//
// TEST 3 changes the order because the facts changed: every Test 3 topic has
// class material, so there is no "less certain" textbook step to push last.
// What is left to rank is CHEAP vs EXPENSIVE: the know-this lists first (closed,
// divisible), then the four articles (a short, closed set of facts tied to an
// assignment he has done), then the key-term cards, then the rehearsal.
function stepsT2(best) {
  const slideKnow = LESSONS.filter(l => l.topic === 'ethics' || l.topic === 'security').reduce((n, l) => n + l.knowThis.length, 0)
  const colored = CARDS.filter(c => c.emph && unitOfTopic(c.topic) === 't2').length
  return [
    {
      n: 1, title: `The ${slideKnow} know-this items for Chapters 3 and 4`, to: '/notes/security', mins: '~25 min',
      tag: 'Certain, cheap, divisible',
      why: 'Built from what the instructor taught and stressed on the slides. A closed list you can say out loud and check, and every item you learn counts on its own.',
      cta: 'Start with Information Security',
    },
    {
      n: 2, title: `The ${colored} terms set in color`, to: '/cards?deck=colored', mins: '~10 min',
      tag: 'The instructor’s own emphasis',
      why: 'The colored runs on the slides are the clearest signal of what the instructor wanted remembered, including the IBM figures.',
      cta: 'Flip the colored terms',
    },
    {
      n: 3, title: 'A 40-question rehearsal, exam mode', to: '/exam', mins: '~35 min',
      tag: 'Stop guessing what is weak',
      why: 'All five formats, weighted toward the slide chapters. It earns nothing by itself; it tells you where the remaining time should go.',
      cta: best != null ? `Beat your ${best}%` : 'Take the rehearsal',
    },
    {
      n: 4, title: 'Drill what you missed', to: '/exam?scope=misses', mins: 'varies',
      tag: 'Your data, not our guess',
      why: 'Every question you got wrong, re-served with the reason after each. The only step driven by your own results.',
      cta: 'Drill my misses',
    },
    {
      n: 5, title: 'The four textbook-only topics', to: '/notes/hardware', mins: '~40 min',
      tag: 'Probably tested, but less certain',
      why: 'Hardware, software, acquiring IS and AI are on the syllabus, but with no slides we cannot know what the instructor will ask. Learn the core vocabulary in each; skim rather than memorize.',
      cta: 'Read Hardware first',
    },
    {
      n: 6, title: 'Matching and short answer', to: '/matching', mins: '~25 min',
      tag: 'Finish what you start',
      why: 'The syllabus says these formats may appear. A matching set is all or nothing, so give it a real block of time rather than the last five minutes; short answers are practice at writing the definition out.',
      cta: 'Open matching',
    },
  ]
}

function stepsT3(best) {
  const mine = LESSONS.filter(l => unitOfTopic(l.topic) === 't3')
  const know = mine.filter(l => l.topic !== 'articles').reduce((n, l) => n + l.knowThis.length, 0)
  const cards = CARDS.filter(c => unitOfTopic(c.topic) === 't3' && c.topic !== 'articles').length
  return [
    {
      n: 1, title: `The ${know} know-this items across the six class topics`, to: '/notes/data', mins: '~40 min',
      tag: 'Certain, cheap, divisible',
      why: 'Built from what the instructor defined and listed on the slides. Data management and networking are the two biggest decks, so start there.',
      cta: 'Start with Data & Knowledge Management',
    },
    {
      n: 2, title: 'The four assigned articles', to: '/notes/articles', mins: '~15 min',
      tag: 'Assigned, short, closed',
      why: 'A handful of facts per article, and they tie to the Cybersecurity assignment. Easy points to bank once.',
      cta: 'Read the articles lesson',
    },
    {
      n: 3, title: `The ${cards} key-term cards`, to: '/cards?deck=all', mins: '~20 min',
      tag: 'Fast vocabulary check',
      why: 'One card per term the slides define. Say the definition before you flip; the ones you miss come back in their own deck.',
      cta: 'Flip the Test 3 cards',
    },
    {
      n: 4, title: 'A 40-question rehearsal, exam mode', to: '/exam', mins: '~35 min',
      tag: 'Stop guessing what is weak',
      why: 'All five formats, drawn from every Test 3 topic in proportion to how much was taught. It tells you where the remaining time should go.',
      cta: best != null ? `Beat your ${best}%` : 'Take the rehearsal',
    },
    {
      n: 5, title: 'Drill what you missed', to: '/exam?scope=misses', mins: 'varies',
      tag: 'Your data, not our guess',
      why: 'Every Test 3 question you got wrong, re-served with the reason after each.',
      cta: 'Drill my misses',
    },
    {
      n: 6, title: 'Matching and short answer', to: '/matching', mins: '~25 min',
      tag: 'Finish what you start',
      why: 'The syllabus says these formats may appear. A matching set is all or nothing, so give it a real block of time rather than the last five minutes.',
      cta: 'Open matching',
    },
  ]
}

const THIRTY = {
  t2: 'Do step 1, then step 2 if there is time. They are the material the instructor actually taught and stressed.',
  t3: 'Do the know-this lists for the topics you feel least sure of, then the articles. Both are the instructor’s own material.',
}

export default function StudyPlan({ className = '' }) {
  const { progress } = useProgress()
  const { unit } = useUnit()
  const best = progress.exam?.best?.[unit]
  const STEPS = unit === 't3' ? stepsT3(best) : stepsT2(best)

  return (
    <div className={`rounded-2xl border border-accent-line bg-accent-soft p-5 ${className}`}>
      <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1">Short on time? Work down this list</p>
      <p className="text-sm text-body mb-1">
        Ordered by <strong className="text-strong">points per minute</strong>, not by which pile is biggest, so whatever
        you get through, you got the most score for the time.
      </p>
      <p className="text-xs text-dim mb-4">Certain and cheap first. Anything all-or-nothing needs a real block of time.</p>

      <ol className="space-y-2.5">
        {STEPS.map(s => (
          <li key={s.n} className="rounded-xl border border-line bg-surface p-3.5">
            <div className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-teal-700 text-white text-xs font-bold flex items-center justify-center">{s.n}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <p className="font-bold text-strong text-sm">{s.title}</p>
                  <span className="text-[11px] text-muted">{s.mins}</span>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-accent mt-0.5">{s.tag}</p>
                <p className="text-sm text-dim mt-1 leading-relaxed">{s.why}</p>
                <Link to={s.to} className="inline-block mt-2 text-xs font-semibold text-accent hover:opacity-80">{s.cta} →</Link>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-4 rounded-xl border border-warn-line bg-warn-soft p-3.5">
        <p className="text-xs font-bold uppercase tracking-wider text-warn mb-1">If you only have 30 minutes</p>
        <p className="text-sm text-body leading-relaxed">
          {THIRTY[unit]} Do not open a matching set with five minutes left: an unfinished set scores nothing.
        </p>
      </div>
    </div>
  )
}
