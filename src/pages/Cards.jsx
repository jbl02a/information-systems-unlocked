import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { useScrollTop } from '../lib/useScrollTop'
import { shuffle } from '../lib/bank'
import Rich from '../components/Rich'
import SourceBadge from '../components/SourceBadge'
import { CARDS } from '../data/cards'
import { TOPICS_BY_PRIORITY, topicById } from '../data/topics'

const EMPH = { blue: 'text-info', red: 'text-bad', orange: 'text-warn', green: 'text-ok' }

// Quick cram: flip, then say honestly whether you knew it. "Didn't" puts the
// card on his misses list (type 'card') until a later "knew it" retires it.
export default function Cards() {
  const { progress, record } = useProgress()
  const [params, setParams] = useSearchParams()
  const deckId = params.get('deck') ?? params.get('topic') ?? ''
  const [reverse, setReverse] = useState(false)
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [tally, setTally] = useState({ knew: 0, didnt: 0 })
  useScrollTop([deckId])

  const misses = progress.misses || {}
  const missedIds = CARDS.filter(c => misses[c.id]?.last === 'wrong' || misses[c.id]?.hold).map(c => c.id)

  const DECKS = [
    { id: 'missed', label: `Ones I didn’t know (${missedIds.length})`, cards: CARDS.filter(c => missedIds.includes(c.id)) },
    { id: 'colored', label: 'Terms the instructor set in color', cards: CARDS.filter(c => c.emph) },
    ...TOPICS_BY_PRIORITY.map(t => ({ id: t.id, label: `${t.icon} ${t.label}`, cards: CARDS.filter(c => c.topic === t.id) })),
    { id: 'all', label: `Everything (${CARDS.length})`, cards: CARDS },
  ]
  const deck = DECKS.find(d => d.id === deckId)
  // Shuffle once per deck choice, so the order does not change under him mid-run.
  const order = useMemo(() => (deck ? shuffle(deck.cards) : []), [deckId]) // eslint-disable-line react-hooks/exhaustive-deps

  function choose(id) {
    setParams(id ? { deck: id } : {})
    setI(0); setFlipped(false); setTally({ knew: 0, didnt: 0 })
  }

  function mark(knew) {
    const c = order[i]
    record(c.id, knew, { type: 'card', label: `Card: ${c.front}` })
    setTally(t => ({ knew: t.knew + (knew ? 1 : 0), didnt: t.didnt + (knew ? 0 : 1) }))
    setFlipped(false)
    setI(n => n + 1)
  }

  // ── Choose a deck ────────────────────────────────────────────────────────
  if (!deck) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-strong mb-2">Quick Cram Cards</h1>
          <p className="text-dim">
            {CARDS.length} cards, one per key term. Flip, then say honestly whether you knew it. The ones you
            didn&rsquo;t know come back in their own deck.
          </p>
        </div>
        <div className="space-y-2">
          {DECKS.map(d => (
            <button key={d.id} data-deck={d.id} onClick={() => choose(d.id)} disabled={d.cards.length === 0}
              className="w-full text-left rounded-xl border border-line bg-surface p-4 hover:border-accent hover:bg-surface2 transition-colors disabled:opacity-50">
              <div className="flex items-center gap-3">
                <p className="font-semibold text-strong text-sm flex-1">{d.label}</p>
                <span className="text-xs text-dim">{d.cards.length} cards</span>
                <span className="text-accent-strong font-bold">→</span>
              </div>
              {topicById(d.id)?.basis === 'book' && <p className="text-xs text-warn mt-1">Textbook only: no class slides yet</p>}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ── Done ─────────────────────────────────────────────────────────────────
  if (i >= order.length) {
    return (
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-extrabold text-strong mb-2">Deck done</h1>
        <p data-tally className="text-dim mb-6">Knew {tally.knew} · didn&rsquo;t know {tally.didnt}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          {missedIds.length > 0 && (
            <button onClick={() => choose('missed')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-700 to-pink-700 text-white font-bold">
              Go again: the ones I didn&rsquo;t know →
            </button>
          )}
          <button onClick={() => choose('')} className="flex-1 py-3 rounded-xl bg-surface2 text-strong font-semibold hover:bg-surface3">All decks</button>
        </div>
      </div>
    )
  }

  // ── A card ───────────────────────────────────────────────────────────────
  const c = order[i]
  const front = reverse ? c.back : c.front
  const back = reverse ? c.front : c.back
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-3">
        <button onClick={() => choose('')} className="text-xs text-dim hover:text-strong">← Decks</button>
        <span className="text-sm text-dim">{i + 1} of {order.length}</span>
        <button onClick={() => { setReverse(r => !r); setFlipped(false) }} className="text-xs text-dim hover:text-strong">
          {reverse ? 'Show the term first' : 'Show the meaning first'}
        </button>
      </div>

      <button data-card onClick={() => setFlipped(f => !f)}
        className="w-full min-h-[14rem] rounded-2xl border-2 border-line bg-surface p-6 text-center hover:border-accent transition-colors">
        <div className="flex justify-center gap-1.5 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted">{topicById(c.topic)?.label}</span>
        </div>
        <p className={`${reverse ? 'text-base' : 'text-2xl font-extrabold'} text-strong`}>
          {!reverse && c.emph && <span className={`${EMPH[c.emph]} mr-1`} title={`In ${c.emph} on the slide`}>●</span>}
          <Rich text={front} />
        </p>
        {flipped ? (
          <div data-back className="mt-5 pt-4 border-t border-line">
            <p className={`${reverse ? 'text-xl font-extrabold' : 'text-base'} text-body leading-relaxed`}><Rich text={back} /></p>
            <div className="mt-3 flex justify-center"><SourceBadge src={c.src} at={c.ref} /></div>
          </div>
        ) : (
          <p className="mt-6 text-xs text-dim">Tap to flip</p>
        )}
      </button>

      {flipped && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button data-didnt onClick={() => mark(false)} className="py-3 rounded-xl bg-gradient-to-r from-rose-700 to-pink-700 text-white font-bold">Didn&rsquo;t know</button>
          <button data-knew onClick={() => mark(true)} className="py-3 rounded-xl bg-gradient-to-r from-green-700 to-emerald-700 text-white font-bold">Knew it</button>
        </div>
      )}

      <p className="text-center text-xs text-dim mt-4">
        Want the reason, not just the word? <Link to={`/notes/${c.topic}`} className="text-accent font-semibold">Read the notes</Link>.
      </p>
    </div>
  )
}
