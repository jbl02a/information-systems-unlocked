/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Every color in the app resolves through these semantic tokens, whose
      // values are CSS variables defined in index.css for each theme. Components
      // never name a palette color, so light mode is a change of variables, not
      // a change of markup. RGB triplets so Tailwind's /opacity modifiers work.
      //
      // The text tiers, brightest first: strong (headings) > body (reading text)
      // > dim (secondary copy) > muted. `muted` is CHROME ONLY — uppercase
      // labels, pill badges, counters, back links. Anything he is meant to read
      // is body or dim. Content painted in the chrome tier is what made the
      // notes look washed out even when every color already passed AA.
      colors: {
        page: 'rgb(var(--c-page) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        surface2: 'rgb(var(--c-surface2) / <alpha-value>)',
        surface3: 'rgb(var(--c-surface3) / <alpha-value>)',
        sunken: 'rgb(var(--c-sunken) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        'line-soft': 'rgb(var(--c-line-soft) / <alpha-value>)',
        'line-strong': 'rgb(var(--c-line-strong) / <alpha-value>)',
        strong: 'rgb(var(--c-strong) / <alpha-value>)',
        body: 'rgb(var(--c-body) / <alpha-value>)',
        dim: 'rgb(var(--c-dim) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        'accent-strong': 'rgb(var(--c-accent-strong) / <alpha-value>)',
        'accent-soft': 'rgb(var(--c-accent-soft) / <alpha-value>)',
        'accent-line': 'rgb(var(--c-accent-line) / <alpha-value>)',
        brand: 'rgb(var(--c-brand) / <alpha-value>)',
        'brand-soft': 'rgb(var(--c-brand-soft) / <alpha-value>)',
        'brand-line': 'rgb(var(--c-brand-line) / <alpha-value>)',
        ok: 'rgb(var(--c-ok) / <alpha-value>)',
        'ok-soft': 'rgb(var(--c-ok-soft) / <alpha-value>)',
        'ok-line': 'rgb(var(--c-ok-line) / <alpha-value>)',
        bad: 'rgb(var(--c-bad) / <alpha-value>)',
        'bad-soft': 'rgb(var(--c-bad-soft) / <alpha-value>)',
        'bad-line': 'rgb(var(--c-bad-line) / <alpha-value>)',
        info: 'rgb(var(--c-info) / <alpha-value>)',
        'info-soft': 'rgb(var(--c-info-soft) / <alpha-value>)',
        'info-line': 'rgb(var(--c-info-line) / <alpha-value>)',
        warn: 'rgb(var(--c-warn) / <alpha-value>)',
        'warn-soft': 'rgb(var(--c-warn-soft) / <alpha-value>)',
        'warn-line': 'rgb(var(--c-warn-line) / <alpha-value>)',
        focus: 'rgb(var(--c-focus) / <alpha-value>)',
        'focus-soft': 'rgb(var(--c-focus-soft) / <alpha-value>)',
        'focus-line': 'rgb(var(--c-focus-line) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'tilt-left': 'tiltLeft 0.5s ease-out forwards',
        'tilt-right': 'tiltRight 0.5s ease-out forwards',
      },
      keyframes: {
        tiltLeft: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-10deg)' },
        },
        tiltRight: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(10deg)' },
        },
      },
    },
  },
  plugins: [],
}
