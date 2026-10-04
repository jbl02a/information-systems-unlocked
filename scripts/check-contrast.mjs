// Minimum-brightness check, run for BOTH themes.
//
// The app is read at night on a phone and in daylight between classes, and
// gray-on-near-black — or gray-on-white — is the first thing that goes
// illegible. This enforces a floor rather than relying on taste: every semantic
// text token used in `src/` must clear WCAG AA (4.5:1) against the surfaces it
// is painted on, in light AND in dark.
//
// The floor is the rule. The light-mode toggle is not a substitute for it.
//
// It also fails on any raw palette color used for text (`text-slate-400` and
// friends). Those are theme-blind: they look right in the theme they were
// written for and wrong in the other one, which is exactly the bug this file
// exists to prevent. Saturated CTA buttons are the one exception — they keep a
// literal `text-white` in both themes, and are allowed below.
//
// Run: npm run contrast  (also runs as part of npm run build)

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const AA = 4.5
const AAA = 7

const lum = rgb => {
  const c = rgb.map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)]
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}
const norm = v => v.map(n => n / 255)

// ── Read both theme blocks straight out of index.css ────────────────────────
const css = readFileSync(fileURLToPath(new URL('../src/index.css', import.meta.url)), 'utf8')
  .replace(/\r\n/g, '\n')

function tokensIn(selector) {
  const at = css.indexOf(selector)
  if (at === -1) throw new Error(`check-contrast: no ${selector} block in index.css`)
  const body = css.slice(css.indexOf('{', at) + 1, css.indexOf('}', at))
  const out = {}
  for (const m of body.matchAll(/--c-([\w-]+)\s*:\s*(\d+)\s+(\d+)\s+(\d+)\s*;/g)) {
    out[m[1]] = [+m[2], +m[3], +m[4]]
  }
  return out
}

const THEMES = {
  light: tokensIn(":root[data-theme='light']"),
  dark: tokensIn(":root,\n:root[data-theme='dark']"),
}

// Which backgrounds a text token can realistically land on. Every token is
// checked against all of them, so it only passes if it passes everywhere.
const BACKGROUNDS = ['page', 'surface', 'surface2', 'sunken']

// Soft tinted panels carry their matching accent text — check those pairs too.
const ON_SOFT = [
  ['accent', 'accent-soft'], ['accent-strong', 'accent-soft'],
  ['brand', 'brand-soft'], ['ok', 'ok-soft'], ['bad', 'bad-soft'],
  ['info', 'info-soft'], ['warn', 'warn-soft'], ['focus', 'focus-soft'],
  ['body', 'accent-soft'], ['body', 'warn-soft'], ['body', 'focus-soft'],
  ['body', 'ok-soft'], ['body', 'bad-soft'], ['body', 'info-soft'],
  ['body', 'brand-soft'],
  ['strong', 'accent-soft'], ['strong', 'warn-soft'], ['strong', 'focus-soft'],
  ['dim', 'accent-soft'], ['dim', 'warn-soft'], ['dim', 'focus-soft'],
]

// ── What the components actually use ────────────────────────────────────────
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (['.jsx', '.js'].includes(extname(p))) out.push(p)
  }
  return out
}

const PALETTE = 'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose'
const RAW = new RegExp(`\\btext-(?:${PALETTE})-\\d{2,3}\\b`, 'g')
const TOKEN = /\btext-([a-z][\w-]*)\b/g

const usedTokens = new Map()
const rawHits = []

for (const file of walk(fileURLToPath(new URL('../src', import.meta.url)))) {
  const rel = file.split('/src/')[1]
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    for (const m of line.matchAll(RAW)) rawHits.push(`${rel}:${i + 1}  ${m[0]}`)
    for (const m of line.matchAll(TOKEN)) {
      const name = m[1]
      if (!THEMES.dark[name]) continue // sizes, alignment, and the like
      if (!usedTokens.has(name)) usedTokens.set(name, [])
      usedTokens.get(name).push(`${rel}:${i + 1}`)
    }
  })
}

// ── Check ───────────────────────────────────────────────────────────────────
const fails = []
const warns = []

for (const [themeName, t] of Object.entries(THEMES)) {
  const pairs = []
  for (const token of usedTokens.keys()) {
    for (const bg of BACKGROUNDS) pairs.push([token, bg])
  }
  for (const [fg, bg] of ON_SOFT) {
    if (usedTokens.has(fg)) pairs.push([fg, bg])
  }
  for (const [fg, bg] of pairs) {
    if (!t[fg] || !t[bg]) continue
    const r = ratio(norm(t[fg]), norm(t[bg]))
    const row = { theme: themeName, fg, bg, r }
    if (r < AA) fails.push(row)
    else if (r < AAA) warns.push(row)
  }
}

const fmt = x => `  ${x.theme.padEnd(5)} text-${x.fg.padEnd(14)} on ${x.bg.padEnd(12)} ${x.r.toFixed(2)}:1`

if (warns.length) {
  console.log(`contrast: ${warns.length} pair(s) between AA and AAA — acceptable, keep off long body text:`)
  warns.sort((a, b) => a.r - b.r).slice(0, 8).forEach(x => console.log(fmt(x)))
  if (warns.length > 8) console.log(`  ...and ${warns.length - 8} more`)
}

// Saturated CTA surfaces keep literal white text in both themes on purpose.
const badRaw = rawHits.filter(h => !/text-white/.test(h))
if (badRaw.length) {
  console.error(`\ncontrast: ${badRaw.length} raw palette color(s) used for text — these are theme-blind:`)
  badRaw.slice(0, 20).forEach(h => console.error(`  ${h}`))
  if (badRaw.length > 20) console.error(`  ...and ${badRaw.length - 20} more`)
  console.error('\nUse a semantic token: strong / body / dim / muted / accent / brand / ok / bad / info / warn / focus.')
}

if (fails.length) {
  console.error(`\ncontrast: ${fails.length} pair(s) below AA ${AA}:1:`)
  fails.sort((a, b) => a.r - b.r).forEach(x => {
    console.error(fmt(x))
    ;(usedTokens.get(x.fg) ?? []).slice(0, 4).forEach(h => console.error(`        ${h}`))
  })
  console.error('\nAdjust the token in src/index.css, for the theme that failed.')
}

if (fails.length || badRaw.length) process.exit(1)

console.log(`contrast: ${usedTokens.size} text tokens x ${BACKGROUNDS.length} surfaces x 2 themes, all >= AA`)
