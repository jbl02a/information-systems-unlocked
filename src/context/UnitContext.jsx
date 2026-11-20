import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { UNIT_IDS, DEFAULT_UNIT } from '../data/topics'
import { KEYS } from '../lib/storage'

// Which test he is studying for. A SWITCHER, NOT A SECOND COPY OF THE APP: the
// routes stay /notes, /exam, /matching, /cards, /cram, and every page shows the
// active unit's topics. Copied from accounting-unlocked's UnitContext (sibling
// apps copy, never import).
//
// Defaults to the test coming up next. His own choice, once made, is remembered;
// `?unit=t2` on any URL wins for that visit, so a link can point at one test.
//
// No "move forward once" flag is needed yet: units arrived together with Test 3,
// so no device has a remembered unit to move. The NEXT unit will need one (see
// accounting-unlocked's `…-unit-moved-u4`).
const UnitContext = createContext(null)

export function UnitProvider({ children }) {
  const [params, setParams] = useSearchParams()

  const [unit, setUnitState] = useState(() => {
    const fromUrl = params.get('unit')
    if (fromUrl && UNIT_IDS.includes(fromUrl)) return fromUrl
    try {
      const stored = localStorage.getItem(KEYS.unit)
      if (stored && UNIT_IDS.includes(stored)) return stored
    } catch { /* storage disabled */ }
    return DEFAULT_UNIT
  })

  useEffect(() => {
    try { localStorage.setItem(KEYS.unit, unit) } catch { /* storage disabled */ }
  }, [unit])

  const setUnit = useCallback(next => {
    if (!UNIT_IDS.includes(next)) return
    setUnitState(next)
    // Drop a stale ?unit= so the URL cannot contradict what is on screen.
    if (params.get('unit')) {
      const p = new URLSearchParams(params)
      p.delete('unit')
      setParams(p, { replace: true })
    }
  }, [params, setParams])

  return <UnitContext.Provider value={{ unit, setUnit }}>{children}</UnitContext.Provider>
}

export function useUnit() {
  const ctx = useContext(UnitContext)
  if (!ctx) throw new Error('useUnit must be used within UnitProvider')
  return ctx
}

// For pages that show one unit's item (/notes/:id): make the switch agree with the page.
export function useSyncUnit(itemUnit) {
  const { unit, setUnit } = useUnit()
  useEffect(() => {
    if (itemUnit && itemUnit !== unit) setUnit(itemUnit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemUnit])
}
