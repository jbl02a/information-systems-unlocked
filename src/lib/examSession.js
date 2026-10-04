// An in-progress attempt lives in React state, which dies with the tab. This
// keeps a snapshot in localStorage so a half-finished attempt can be resumed.
// Only item IDs and layouts are stored, never item text, so edits to the bank
// never resurrect stale wording; anything that no longer exists is dropped.
import { KEYS } from './storage'
const KEY = KEYS.session
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 14 // two weeks; older than that, start fresh

export function saveExamSession(session) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...session, savedAt: Date.now() }))
  } catch {
    /* storage full or blocked: resuming is a convenience, never a requirement */
  }
}

export function loadExamSession(validIds) {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const s = JSON.parse(raw)
    if (!s || !Array.isArray(s.ids) || s.ids.length === 0) return null
    if (typeof s.savedAt === 'number' && Date.now() - s.savedAt > MAX_AGE_MS) {
      clearExamSession()
      return null
    }
    const ids = s.ids.filter(id => validIds.includes(id))
    if (ids.length === 0) { clearExamSession(); return null }
    const keep = obj => Object.fromEntries(Object.entries(obj || {}).filter(([id]) => ids.includes(id)))
    const answers = keep(s.answers)
    return {
      ids,
      layouts: keep(s.layouts),
      answers,
      revealedIds: (s.revealedIds || []).filter(id => ids.includes(id)),
      index: Math.min(Math.max(0, Number(s.index) || 0), ids.length - 1),
      mode: s.mode === 'exam' ? 'exam' : 'practice',
      scopeLabel: typeof s.scopeLabel === 'string' ? s.scopeLabel : 'Practice',
      // Anything unrecognized is a drill: misclassifying a drill as a rehearsal
      // would inflate the best score.
      scopeKind: s.scopeKind === 'exam' ? 'exam' : 'drill',
      answeredCount: Object.keys(answers).length,
      savedAt: s.savedAt,
    }
  } catch {
    return null
  }
}

export function clearExamSession() {
  try { localStorage.removeItem(KEY) } catch { /* nothing to do */ }
}

export function describeAge(savedAt) {
  if (!savedAt) return ''
  const mins = Math.round((Date.now() - savedAt) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? '' : 's'} ago`
  const days = Math.round(hrs / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}
