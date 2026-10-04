// The Test 2 topics, and what each one is built from.
//
// THE SCOPE comes from the syllabus, which lists TOPICS, not chapters: "ethics
// and privacy, hardware, software, acquiring information systems and
// applications, AI, information security". Only two of those six have class
// slide decks so far (received 2026-10-04):
//
//   Ethics & Privacy        Ch. 3   two decks (9/14, 9/16)
//   Information Security    Ch. 4   two decks (9/28, 9/30)
//
// The other four have NO class material yet. They are built from standard
// textbook content and labeled that way on every surface (`basis: 'book'`).
//
// BUILT TO BE UPGRADED. When a deck arrives for a book-only topic:
//   1. add it to DECKS below and list it on the topic's `decks`
//   2. flip the topic's `basis` to 'slides'
//   3. author slide items with `src: 'slides'` (lessons, questions, cards, sets)
// Nothing else changes. The textbook items stay, keep their ids (they key his
// misses history), and are automatically ranked below slide items everywhere:
// the rehearsal draws slide items first, the study plan and the notes index put
// slide topics first, and every textbook item keeps its badge. See
// docs/README.md, "Adding a slide deck".
//
// `src` on any item:
//   'slides' — on the instructor's class slides (most authoritative)
//   'book'   — standard content of this textbook, NOT from the class slides.
//              Written from general knowledge of the Rainer & Prince text's
//              earlier editions; not checked against his 10th edition.
//   'ours'   — our own example or wording, built to practice an idea

export const DECKS = {
  ch3a: { file: 'Chpt 3 Ethics and Privacy Part 1 9_14.pptx', date: '9/14', slides: 14, topic: 'ethics' },
  ch3b: { file: 'Chpt 3 Ethics and Privacy Part 2 9_16.pptx', date: '9/16', slides: 35, topic: 'ethics' },
  ch4a: { file: 'Chpt 4 Information Security Part 1 9_28.pptx', date: '9/28', slides: 35, topic: 'security' },
  ch4b: { file: 'Chpt 4 Information Security Part 2 9_30.pptx', date: '9/30', slides: 47, topic: 'security' },
}

export const TOPICS = [
  {
    id: 'ethics', label: 'Ethics & Privacy', chapter: 'Chapter 3', icon: '🕵️',
    basis: 'slides', decks: ['ch3a', 'ch3b'],
    blurb: 'The four kinds of ethical issue, tracking (cookies, beacons, apps), and the privacy laws.',
  },
  {
    id: 'security', label: 'Information Security', chapter: 'Chapter 4', icon: '🛡️',
    basis: 'slides', decks: ['ch4a', 'ch4b'],
    blurb: 'Breaches and their cost, threat vs vulnerability, human error, social engineering, deliberate attacks.',
  },
  {
    id: 'hardware', label: 'Hardware', chapter: 'Technology Guide 1 (earlier editions)', icon: '🖥️',
    basis: 'book', decks: [],
    blurb: 'The computer hierarchy, the CPU, memory and storage, input and output.',
  },
  {
    id: 'software', label: 'Software', chapter: 'Technology Guide 2 (earlier editions)', icon: '💾',
    basis: 'book', decks: [],
    blurb: 'System vs application software, operating systems, licensing, open source.',
  },
  {
    id: 'acquiring', label: 'Acquiring Information Systems', chapter: 'Chapter 13 (earlier editions)', icon: '🛒',
    basis: 'book', decks: [],
    blurb: 'Planning and justifying IT, buy vs lease vs build, the SDLC and its alternatives.',
  },
  {
    id: 'ai', label: 'Artificial Intelligence', chapter: 'Chapter 14 (earlier editions)', icon: '🤖',
    basis: 'book', decks: [],
    blurb: 'What AI is, machine learning and neural networks, what AI can do, generative AI.',
  },
]

export const SOURCES = {
  slides: { label: 'Class slides', long: 'On the instructor’s class slides' },
  book: { label: 'Textbook, not slides', long: 'Standard textbook content. No class slides cover it yet, so check it against your book' },
  ours: { label: 'Our example', long: 'Our own example, built to practice the idea' },
}

export function topicById(id) {
  return TOPICS.find(t => t.id === id) ?? null
}

/** Slide-backed topics first, then textbook-only ones, each in syllabus order. */
export const TOPICS_BY_PRIORITY = [
  ...TOPICS.filter(t => t.basis === 'slides'),
  ...TOPICS.filter(t => t.basis !== 'slides'),
]

/** How much an item counts when choosing what to serve: slides beat the book. */
export function priorityOf(item) {
  if (item.src === 'slides') return 2
  const t = topicById(item.topic)
  // A textbook item on a topic the class HAS covered by slides is lower still:
  // the instructor has shown what they chose to teach there.
  if (item.src === 'book' && t?.basis === 'slides') return 0.5
  return 1
}
