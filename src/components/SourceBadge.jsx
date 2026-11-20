import { SOURCES, DECKS, ARTICLES } from '../data/topics'

// Where an item came from, on its face. Slides are the instructor's; "Textbook,
// not slides" is standard content we wrote without a class deck to check it
// against; "Our example" is ours; "Assigned article" is one of the instructor's
// assigned readings (Test 3), summarized. Never let a textbook or invented item
// read as the instructor's words (CLAUDE.md rule 5).
const CLS = {
  slides: 'text-ok border-ok-line bg-ok-soft',
  article: 'text-ok border-ok-line bg-ok-soft',
  book: 'text-warn border-warn-line bg-warn-soft',
  ours: 'text-info border-info-line bg-info-soft',
}

// 'ch4a s17' → '9/28 deck, slide 17'. Also 'ch5a s3–7, s9', a reference across
// decks ('ch5a s30, ch5b s2'), and an article id ('fbi').
export function refLabel(ref) {
  if (!ref) return ''
  if (ARTICLES[ref]) return ARTICLES[ref].short
  const parts = String(ref).split(/,\s*(?=[a-z0-9]+ s\d)/)
  const out = parts.map(p => {
    const m = p.match(/^([a-z0-9]+)\s+(s.+)$/)
    const d = m && DECKS[m[1]]
    if (!d) return null
    const nums = m[2].replace(/^s/, '').replace(/, s/g, ', ').replace(/–s/g, '–')
    return `${d.date} deck, slide${/[–,-]/.test(nums) ? 's' : ''} ${nums}`
  })
  return out.every(Boolean) ? out.join('; ') : ref
}

// The slide reference is passed as `at`, not `ref`: React reserves `ref`, so a
// prop by that name never reaches the component.
export default function SourceBadge({ src, at: slideRef, className = '' }) {
  const s = SOURCES[src]
  if (!s) return null
  return (
    <span title={s.long}
      className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider border rounded-full px-2 py-0.5 ${CLS[src]} ${className}`}>
      {s.label}{(src === 'slides' || src === 'article') && slideRef ? <span className="normal-case font-semibold tracking-normal">· {refLabel(slideRef)}</span> : null}
    </span>
  )
}
