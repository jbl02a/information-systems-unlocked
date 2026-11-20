import { topicsFor } from '../data/topics'
import { useUnit } from '../context/UnitContext'

// What we know about the test, and what we do not. Shown on home and /exam.
//
// FACT (syllabus): "Exams will cover material from the book, slides, lectures,
// and/or any guest speaker presentations. Exams may consist of multiple-choice,
// true-false, matching, fill-in-the-blank and short answer questions."
// FACT (syllabus): Test 2 covers ethics and privacy, hardware, software,
// acquiring information systems and applications, AI, and information security.
//
// TEST 3: we have the class decks taught since Test 2 and the assigned articles,
// but no study guide, no topic list and no date. Its scope here is OUR reading
// of what was taught since Test 2, and the notice says so.
//
// NOT STATED for either test: the mix of formats, the number of questions, the
// date. "May" is not "will". The bank practices all five formats, and the
// rehearsal's mix is ours. Do not let this drift into "the test is N matching
// questions".
const FORMATS = ['Multiple choice', 'True / false', 'Matching', 'Fill in the blank', 'Short answer']

const BASIS = {
  slides: { label: 'class slides', cls: 'text-ok border-ok-line bg-ok-soft' },
  article: { label: 'assigned', cls: 'text-ok border-ok-line bg-ok-soft' },
  book: { label: 'textbook only', cls: 'text-warn border-warn-line bg-warn-soft' },
}

const COPY = {
  t2: {
    heading: 'What we know about Test 2',
    listHeading: 'The six topics on the syllabus',
    footer: 'Only Ethics & Privacy and Information Security have class slides so far. The other four are built from standard textbook content and labeled that way everywhere. When their slides arrive, they replace it.',
  },
  t3: {
    heading: 'What we know about Test 3',
    listHeading: 'What we think Test 3 covers',
    footer: 'No study guide or topic list for Test 3 is in the materials, so this list is ours: every class deck taught since Test 2 (10/19 to 11/18), plus the assigned articles in the folder. Every topic here is built from the instructor’s own material.',
  },
}

export default function FormatNotice({ className = '', unit: unitProp }) {
  const { unit: active } = useUnit()
  const unit = unitProp ?? active
  const copy = COPY[unit]
  return (
    <div className={`rounded-2xl border border-line bg-surface p-5 ${className}`}>
      <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">{copy.heading}</p>
      <p className="text-sm text-body leading-relaxed mb-3">
        The syllabus: exams <strong className="text-strong">&ldquo;may consist of multiple-choice, true-false,
        matching, fill-in-the-blank and short answer questions&rdquo;</strong>, covering &ldquo;material from the
        book, slides, lectures, and/or any guest speaker presentations.&rdquo;
      </p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {FORMATS.map(f => (
          <span key={f} className="text-xs font-semibold text-body bg-sunken border border-line rounded-lg px-2 py-1">{f}</span>
        ))}
      </div>
      <div className="rounded-xl border border-warn-line bg-warn-soft p-3 mb-3">
        <p className="text-xs font-bold uppercase tracking-wider text-warn mb-1">The mix is our guess</p>
        <p className="text-sm text-body leading-relaxed">
          &ldquo;May&rdquo; is not &ldquo;will&rdquo;. The syllabus does not say how many of each format, how many
          questions, or how they are scored, so <strong className="text-strong">every mix in this app is ours</strong>.
          The bank practices all five formats so none of them is a surprise.
        </p>
      </div>
      <p className="text-xs font-bold uppercase tracking-wider text-muted mb-1.5">{copy.listHeading}</p>
      <ul className="grid sm:grid-cols-2 gap-1.5">
        {topicsFor(unit).map(t => (
          <li key={t.id} className="text-sm text-body flex items-center gap-2">
            <span aria-hidden="true">{t.icon}</span>
            <span className="flex-1">{t.label}</span>
            <span className={`text-[10px] font-bold uppercase tracking-wider rounded-full border px-1.5 py-0.5 ${BASIS[t.basis].cls}`}>
              {BASIS[t.basis].label}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-dim mt-3 leading-relaxed">{copy.footer}</p>
    </div>
  )
}
