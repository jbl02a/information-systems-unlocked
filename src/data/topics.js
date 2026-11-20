// The topics, the test each belongs to, and what each one is built from.
//
// UNITS. The app was built for Test 2 alone; Test 3 arrived on 2026-11-20 with
// eight class decks. Every topic now names its unit, and every page shows the
// active unit's topics only (src/context/UnitContext.jsx). Test 2's topics and
// items are untouched: their ids key his history.
//
// THE SCOPE comes from the syllabus, which lists TOPICS, not chapters: "ethics
// and privacy, hardware, software, acquiring information systems and
// applications, AI, information security". Only two of those six have class
// slide decks so far (received 2026-10-04):
//
//   Ethics & Privacy        Ch. 3   two decks (9/14, 9/16)
//   Information Security    Ch. 4   four decks (9/28, 9/30, and Parts 3–4 dated 10/7,
//                                   received 2026-10-08)
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
//   'article' — one of the instructor's assigned articles (Test 3); `ref` is
//              its id in ARTICLES below. We summarize; we never reproduce one.

export const DECKS = {
  ch3a: { file: 'Chpt 3 Ethics and Privacy Part 1 9_14.pptx', date: '9/14', slides: 14, topic: 'ethics' },
  ch3b: { file: 'Chpt 3 Ethics and Privacy Part 2 9_16.pptx', date: '9/16', slides: 35, topic: 'ethics' },
  ch4a: { file: 'Chpt 4 Information Security Part 1 9_28.pptx', date: '9/28', slides: 35, topic: 'security' },
  ch4b: { file: 'Chpt 4 Information Security Part 2 9_30.pptx', date: '9/30', slides: 47, topic: 'security' },
  ch4c: { file: 'Chpt 4 Information Security Part 3 10_7.pptx', date: '10/7', slides: 11, topic: 'security' },
  ch4d: { file: 'Chpt 4 Information Security Part 4 10_7.pptx', date: '10/7', slides: 33, topic: 'security' },
  // Test 3 (received 2026-11-20)
  ch5a: { file: 'Chpt 5 Data and Knowledge Management  Part 1 10_26.pptx', date: '10/26', slides: 38, topic: 'data' },
  ch5b: { file: 'Chpt 5 Data and Knowledge Management Part 2 10_28.pptx', date: '10/28', slides: 20, topic: 'data' },
  ch6a: { file: 'Chpt 6 Telecommunications and Networking 10_19.pptx', date: '10/19', slides: 33, topic: 'networks' },
  ch6b: { file: 'Chpt 6 Telecommunications and Networking Part 2 10_21.pptx', date: '10/21', slides: 29, topic: 'networks' },
  dv: { file: 'Data Visualization 11_2.pptx', date: '11/2', slides: 23, topic: 'dataviz' },
  pm: { file: 'Project Management 11_4.pptx', date: '11/4', slides: 50, topic: 'pm' },
  ch7: { file: 'Chpt 7 E-Commerce 11_16.pptx', date: '11/16', slides: 40, topic: 'ecommerce' },
  ch9: { file: 'Chpt 9 Social Computing 11_18.pptx', date: '11/18', slides: 26, topic: 'social' },
}

// The assigned articles that are IN the materials folder (Test 3). Articles.docx
// lists nine URLs; only two of those are in the folder, plus two more that the
// Cybersecurity assignment uses. The rest are listed in docs/sources.md as
// missing. Titles and dates as printed on the articles.
export const ARTICLES = {
  fbi: { file: 'Article FBI Hacked A Dark Web Shopper Plotting A Mail Bomb Hit.docx', short: 'FBI dark web mail bomb', title: 'How The FBI Hacked A Dark Web Shopper Plotting A Mail Bomb Hit', outlet: 'Forbes', year: 2017 },
  insider: { file: "You'll Never Need to Work Again Article.pdf", short: 'Criminals offer a reporter money', title: '“You’ll never need to work again”: Criminals offer reporter money to hack BBC', outlet: 'BBC', year: 2025 },
  ship: { file: 'Hero Ship Article.pdf', short: 'The cable repair ship', title: 'The “hero” ship fixing Africa’s internet blackouts', outlet: 'BBC', year: 2025 },
  crypto: { file: 'How Crypto criminals stole.docx', short: 'Crypto criminals', title: 'How crypto criminals stole $700 million from people, often using age-old tricks', outlet: 'BBC', year: 2026 },
}

// The two tests. Test 3 is the default: it is the one coming up.
export const UNITS = [
  {
    id: 't2', label: 'Test 2', title: 'Ethics, security, hardware, software, acquiring IS, AI',
    blurb: 'The six syllabus topics for Test 2. Two have class slides; four are textbook content, labeled.',
  },
  {
    id: 't3', label: 'Test 3', title: 'Data, networks, visualization, projects, e-commerce, social',
    blurb: 'Every topic taught since Test 2, from the instructor’s class decks, plus the assigned articles.',
  },
]
export const DEFAULT_UNIT = 't3'
export const UNIT_IDS = UNITS.map(u => u.id)
export const unitById = id => UNITS.find(u => u.id === id) ?? UNITS.find(u => u.id === DEFAULT_UNIT)

export const TOPICS = [
  {
    id: 'ethics', unit: 't2', label: 'Ethics & Privacy', chapter: 'Chapter 3', icon: '🕵️',
    basis: 'slides', decks: ['ch3a', 'ch3b'],
    blurb: 'The four kinds of ethical issue, tracking (cookies, beacons, apps), and the privacy laws.',
  },
  {
    id: 'security', unit: 't2', label: 'Information Security', chapter: 'Chapter 4', icon: '🛡️',
    basis: 'slides', decks: ['ch4a', 'ch4b', 'ch4c', 'ch4d'],
    blurb: 'Breaches and their cost, human error, social engineering, deliberate attacks, security controls, risk management.',
  },
  {
    id: 'hardware', unit: 't2', label: 'Hardware', chapter: 'Technology Guide 1 (earlier editions)', icon: '🖥️',
    basis: 'book', decks: [],
    blurb: 'The computer hierarchy, the CPU, memory and storage, input and output.',
  },
  {
    id: 'software', unit: 't2', label: 'Software', chapter: 'Technology Guide 2 (earlier editions)', icon: '💾',
    basis: 'book', decks: [],
    blurb: 'System vs application software, operating systems, licensing, open source.',
  },
  {
    id: 'acquiring', unit: 't2', label: 'Acquiring Information Systems', chapter: 'Chapter 13 (earlier editions)', icon: '🛒',
    basis: 'book', decks: [],
    blurb: 'Planning and justifying IT, buy vs lease vs build, the SDLC and its alternatives.',
  },
  {
    id: 'ai', unit: 't2', label: 'Artificial Intelligence', chapter: 'Chapter 14 (earlier editions)', icon: '🤖',
    basis: 'book', decks: [],
    blurb: 'What AI is, machine learning and neural networks, what AI can do, generative AI.',
  },
  // ── Test 3 ─────────────────────────────────────────────────────────────
  {
    id: 'data', unit: 't3', label: 'Data & Knowledge Management', chapter: 'Chapter 5', icon: '🗄️',
    basis: 'slides', decks: ['ch5a', 'ch5b'],
    blurb: 'Managing data, databases and the relational model, big data, data warehouses, knowledge management.',
  },
  {
    id: 'networks', unit: 't3', label: 'Telecommunications & Networking', chapter: 'Chapter 6', icon: '🌐',
    basis: 'slides', decks: ['ch6a', 'ch6b'],
    blurb: 'Network types and media, protocols, the Internet and the Web, and what networks are used for.',
  },
  {
    id: 'dataviz', unit: 't3', label: 'Data Visualization', chapter: 'Class deck (11/2)', icon: '📊',
    basis: 'slides', decks: ['dv'],
    blurb: 'Why visualize data, choosing the right chart, and the mistakes that mislead.',
  },
  {
    id: 'pm', unit: 't3', label: 'Project Management', chapter: 'Class deck (11/4)', icon: '📋',
    basis: 'slides', decks: ['pm'],
    blurb: 'What a project is, the triple constraint, the project life cycle and the tools that run it.',
  },
  {
    id: 'ecommerce', unit: 't3', label: 'E-Commerce', chapter: 'Chapter 7', icon: '🛍️',
    basis: 'slides', decks: ['ch7'],
    blurb: 'Types of e-commerce, business models, electronic payments, and the ethical and legal issues.',
  },
  {
    id: 'social', unit: 't3', label: 'Social Computing', chapter: 'Chapter 9', icon: '💬',
    basis: 'slides', decks: ['ch9'],
    blurb: 'Web 2.0, social networking, social commerce, and how businesses use social media.',
  },
  {
    id: 'articles', unit: 't3', label: 'Assigned Articles', chapter: 'Reading list', icon: '📰',
    basis: 'article', decks: [],
    blurb: 'The four assigned articles in the folder: the FBI’s dark web hack, the insider offer, the cable ship, and crypto theft.',
  },
]

export const SOURCES = {
  slides: { label: 'Class slides', long: 'On the instructor’s class slides' },
  book: { label: 'Textbook, not slides', long: 'Standard textbook content. No class slides cover it yet, so check it against your book' },
  ours: { label: 'Our example', long: 'Our own example, built to practice the idea' },
  article: { label: 'Assigned article', long: 'From one of the instructor’s assigned articles (summarized, not quoted at length)' },
}

export function topicById(id) {
  return TOPICS.find(t => t.id === id) ?? null
}

/** Class-material topics (slides, then assigned articles) first, then textbook-only ones. */
export const TOPICS_BY_PRIORITY = [
  ...TOPICS.filter(t => t.basis === 'slides'),
  ...TOPICS.filter(t => t.basis === 'article'),
  ...TOPICS.filter(t => t.basis === 'book'),
]

/** Topics built from the instructor's own material (slides or assigned articles). */
export const isClassMaterial = t => t?.basis === 'slides' || t?.basis === 'article'

/** One unit's topics, in priority order (slides first). */
export const topicsFor = unit => TOPICS_BY_PRIORITY.filter(t => t.unit === unit)

/** The unit an item (question, card, set, lesson) belongs to, through its topic. */
export const unitOfTopic = topicId => topicById(topicId)?.unit ?? 't2'

/** How much an item counts when choosing what to serve: slides beat the book. */
export function priorityOf(item) {
  if (item.src === 'slides' || item.src === 'article') return 2
  const t = topicById(item.topic)
  // A textbook item on a topic the class HAS covered by slides is lower still:
  // the instructor has shown what they chose to teach there.
  if (item.src === 'book' && t?.basis === 'slides') return 0.5
  return 1
}
