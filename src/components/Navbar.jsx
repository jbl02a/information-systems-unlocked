import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { applyTheme, initTheme, saveTheme } from '../lib/theme'

// The links come from one list, so the navbar can never advertise a page the
// router does not have. The row SCROLLS on a narrow screen rather than hiding
// links, so nothing is buried on the phone he studies on; the theme and reset
// controls stay outside the scroller so they are always reachable.
export const NAV = [
  { to: '/notes', label: 'Notes', active: 'bg-indigo-700' },
  { to: '/exam', label: 'Questions', active: 'bg-teal-700' },
  { to: '/matching', label: 'Matching', active: 'bg-amber-700' },
  { to: '/cards', label: 'Cards', active: 'bg-rose-700' },
  { to: '/cram', label: 'Cram', active: 'bg-slate-700' },
]

export default function Navbar({ links = NAV }) {
  const location = useLocation()
  const { resetProgress } = useProgress()
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || initTheme())

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next); applyTheme(next); saveTheme(next)
  }

  const base = 'text-xs sm:text-sm px-2 sm:px-3 py-1.5 rounded-lg transition-colors font-medium whitespace-nowrap'
  const idle = 'text-dim hover:text-strong hover:bg-surface2'

  return (
    <nav className="border-b border-line bg-sunken backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-strong hover:text-accent transition-colors shrink-0">
          <span className="text-2xl" aria-hidden="true">💻</span>
          <span className="hidden lg:inline">Info Systems <span className="text-accent-strong">Unlocked</span></span>
          <span className="sr-only lg:hidden">Home</span>
        </Link>

        <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 sm:gap-2 w-max ml-auto">
            {links.map(l => (
              <Link key={l.to} to={l.to}
                className={`${base} ${location.pathname.startsWith(l.to) ? `${l.active} text-white` : idle}`}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <button
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          className="shrink-0 text-base leading-none px-2 py-1.5 rounded-lg hover:bg-surface2 transition-colors"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button
          onClick={() => { if (window.confirm('Reset all progress? This cannot be undone.')) resetProgress() }}
          className="shrink-0 text-xs text-dim hover:text-bad transition-colors"
          title="Reset progress"
        >
          Reset
        </button>
      </div>
    </nav>
  )
}
