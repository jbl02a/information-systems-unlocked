import { SOURCES, DECKS } from '../data/topics'

// Where an item came from, on its face. Slides are the instructor's; "Textbook,
// not slides" is standard content we wrote without a class deck to check it
// against; "Our example" is ours. Never let a textbook or invented item read as
// the instructor's words (CLAUDE.md rule 5).
const CLS = {
  slides: 'text-ok border-ok-line bg-ok-soft',
  book: 'text-warn border-warn-line bg-warn-soft',
  ours: 'text-info border-info-line bg-info-soft',
}

export function refLabel(ref) {
  if (!ref) return ''
  const m = String(ref).match(/^(ch\d[ab])\s+(.+)$/)
  if (!m) return ref
  const d = DECKS[m[1]]
  return d ? `${d.date} deck, slide ${m[2].replace(/^s/, '').replace(/, s/g, ', ')}` : ref
}

// The slide reference is passed as `at`, not `ref`: React reserves `ref`, so a
// prop by that name never reaches the component.
export default function SourceBadge({ src, at: slideRef, className = '' }) {
  const s = SOURCES[src]
  if (!s) return null
  return (
    <span title={s.long}
      className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider border rounded-full px-2 py-0.5 ${CLS[src]} ${className}`}>
      {s.label}{src === 'slides' && slideRef ? <span className="normal-case font-semibold tracking-normal">· {refLabel(slideRef)}</span> : null}
    </span>
  )
}
