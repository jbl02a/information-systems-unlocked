import { UNITS } from '../data/topics'
import { useUnit } from '../context/UnitContext'

// One control under the nav bar, because it changes what every page below it
// shows. Copied from accounting-unlocked, restyled with this app's tokens (no
// palette color names for text — CLAUDE.md rule 13). The active pill is a
// saturated -700 surface with literal white, the one allowed exception.
export default function UnitSwitcher() {
  const { unit, setUnit } = useUnit()
  return (
    <div className="border-b border-line bg-surface no-print">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted shrink-0 mr-1">Studying</span>
        <div className="flex gap-1.5" role="group" aria-label="Which test">
          {UNITS.map(u => {
            const active = unit === u.id
            return (
              <button
                key={u.id}
                onClick={() => setUnit(u.id)}
                aria-pressed={active}
                aria-label={u.label}
                className={`text-xs px-3 py-1 rounded-full border transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-indigo-700 border-indigo-700 text-white font-semibold'
                    : 'border-line text-dim hover:text-strong hover:bg-surface2'
                }`}
              >
                {u.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
