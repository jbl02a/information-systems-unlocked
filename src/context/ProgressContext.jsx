import { createContext, useContext, useState, useEffect } from 'react'
import { KEYS } from '../lib/storage'
import { buildDefault, migrate, withResult, applyExam } from '../lib/progressShape'

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  // Migrate on load, never assume: whatever is on disk is folded into the
  // current shape (src/lib/progressShape.js), and a corrupt save starts fresh
  // rather than crashing the app.
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(KEYS.progress)
      return migrate(saved ? JSON.parse(saved) : null)
    } catch {
      return buildDefault()
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEYS.progress, JSON.stringify(progress))
    } catch {
      /* private browsing / storage disabled: progress just won't persist */
    }
  }, [progress])

  // `results` is [{ id, correct }] for every item in the attempt, so a "drill
  // only what I got wrong" mode can be built from it.
  function recordExam(attempt) {
    setProgress(prev => applyExam(prev, attempt))
  }

  // One graded outcome outside an exam attempt: a matching set, a flashcard, a
  // lesson read. `extra` carries `type` and `label` so the misses page can say
  // what it is and where to go back to.
  function record(id, correct, extra = {}) {
    if (!id) return
    setProgress(prev => ({ ...prev, misses: withResult(prev.misses || {}, id, correct, extra) }))
  }

  // `hold` is him saying "I got that right but I am not sure yet". It puts the
  // item back on the to-do list regardless of the last answer; clearing it
  // retires the item the way a right answer normally would.
  function setHold(id, hold) {
    if (!id) return
    setProgress(prev => {
      const misses = { ...(prev.misses || {}) }
      const entry = misses[id] || { wrong: 0, right: 0, last: 'right', at: new Date().toISOString() }
      misses[id] = { ...entry, hold: Boolean(hold) }
      return { ...prev, misses }
    })
  }

  const isHeld = id => Boolean(progress.misses?.[id]?.hold)

  /** Ids still needing work: last answer wrong, or held. Optionally one `type`. */
  function needsWorkIds(type) {
    return Object.entries(progress.misses || {})
      .filter(([, m]) => (type === undefined ? true : (m.type ?? 'q') === type))
      .filter(([, m]) => m.last === 'wrong' || m.hold)
      .map(([id]) => id)
  }

  function clearMisses(type) {
    setProgress(prev => {
      if (type === undefined) return { ...prev, misses: {} }
      const misses = Object.fromEntries(Object.entries(prev.misses || {}).filter(([, m]) => (m.type ?? 'q') !== type))
      return { ...prev, misses }
    })
  }

  function resetProgress() {
    setProgress(buildDefault())
  }

  return (
    <ProgressContext.Provider value={{ progress, recordExam, record, setHold, isHeld, needsWorkIds, clearMisses, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
