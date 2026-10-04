// Light and dark are two sets of CSS variables (see index.css); this decides which
// set is live. Same mechanism as the sibling History Unlocked app.
//
// The default is LIGHT. That is a deliberate choice, not a fallback: this is read
// in daylight, on a phone, between classes. A stored choice always wins, and the
// device preference is only consulted if he has never chosen — and even then only
// to opt him into dark, never out of the light default.
import { KEYS } from './storage'
const KEY = KEYS.theme

export function storedTheme() {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

export function prefersDark() {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch {
    return false
  }
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  // Keep the browser chrome (address bar, native form controls) in step with the page.
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'light' ? '#f7f8fb' : '#0b0b1a')
}

export function saveTheme(theme) {
  try { localStorage.setItem(KEY, theme) } catch { /* private mode; the session still works */ }
}

// Called before React renders so the first paint is already in the right theme —
// otherwise a light-mode user gets a dark flash on every load.
export function initTheme() {
  const theme = storedTheme() ?? (prefersDark() ? 'dark' : 'light')
  applyTheme(theme)
  return theme
}
