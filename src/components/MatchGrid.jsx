// One matching item: each left-hand row gets a dropdown of the right-hand
// choices. BOTH columns arrive pre-shuffled from the caller (rowOrder and
// choiceOrder), so the layout can be saved and replayed on resume, and the drill
// is never a position game. All-or-nothing grading lives in src/lib/grade.js.
//
// The <select> is opaque (`bg-surface`) on purpose: a translucent one composites
// to gray-on-gray when the native option list opens (CLAUDE.md rule 12).
export default function MatchGrid({ pairs, rowOrder, choiceOrder, value = {}, onChange, revealed }) {
  const rows = rowOrder.map(i => pairs[i])
  const choices = choiceOrder.map(i => pairs[i].right)
  return (
    <div className="space-y-2">
      {rows.map(p => {
        const picked = value[p.left] ?? ''
        const wrong = revealed && picked !== p.right
        return (
          <div key={p.left} data-match-row className={`rounded-xl border p-3 ${
            !revealed ? 'border-line bg-surface' : wrong ? 'border-bad-line bg-bad-soft' : 'border-ok-line bg-ok-soft'}`}>
            <p className="text-sm font-semibold text-strong mb-2">{p.left}</p>
            <select
              value={picked}
              disabled={revealed}
              onChange={e => onChange({ ...value, [p.left]: e.target.value })}
              className="w-full rounded-lg bg-surface border border-line text-body text-sm px-2 py-2 disabled:opacity-80"
            >
              <option value="">— choose —</option>
              {choices.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {wrong && <p className="text-xs text-ok mt-1.5">Correct: {p.right}</p>}
          </div>
        )
      })}
    </div>
  )
}
