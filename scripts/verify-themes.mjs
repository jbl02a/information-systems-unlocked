// DOM-level contrast audit, run in both themes against a real browser.
//
// `check-contrast.mjs` reads classes out of the source and can only see what the
// tokens are. This measures what actually *renders*, which is how the CTA
// buttons were caught: `from-teal-600 to-cyan-600` with white text had been
// below AA since the app was written, in dark mode too, and no source-level
// check could see it because the failing pair was a literal gradient and a
// literal `text-white`.
//
// It resolves gradient backgrounds by reading the color stops out of
// `background-image` and checking the text against every stop, and it skips
// nodes whose own color is transparent (`bg-clip-text` headings, which are
// their own gradient and are checked as such).
//
// Usage:
//   npm run build && npx vite preview --port 4715
//   node scripts/verify-themes.mjs            # BASE=... to point elsewhere
//
// Playwright is a devDependency (npx playwright install chromium once).
import { chromium } from 'playwright'
import { KEYS } from '../src/lib/storage.js'

const BASE = process.env.BASE ?? 'http://localhost:4715'
const AA = 4.5
const ROUTES = (process.env.ROUTES ?? '/,/notes,/notes/ethics,/notes/security,/notes/hardware,/notes/ai,/exam,/matching,/matching?set=S6,/cards,/cards?deck=security,/cram').split(',')

const audit = page => page.evaluate(AA => {
  const lum = c => {
    const a = c.map(v => v / 255).map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
  }
  const nums = s => (s.match(/[\d.]+/g) || []).map(Number)
  const parse = s => {
    const n = nums(s)
    return n.length >= 3 ? { c: n.slice(0, 3), a: n.length > 3 ? n[3] : 1 } : null
  }
  const over = (fg, bg) => fg.c.map((v, i) => v * fg.a + bg[i] * (1 - fg.a))
  const cr = (f, b) => {
    const [x, y] = [lum(f), lum(b)]
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
  }

  // The effective background behind a node. Translucent layers are COMPOSITED
  // over what is under them rather than read at full strength — a
  // `from-teal-600/20` wash is a faint tint on the page, not solid teal, and
  // treating it as solid is how an earlier version of this audit invented 106
  // failures that were not there.
  const backgrounds = el => {
    const chain = []
    for (let n = el; n; n = n.parentElement) {
      const st = getComputedStyle(n)
      const bc = parse(st.backgroundColor)
      const img = st.backgroundImage
      const grad = img && img !== 'none' && img.includes('gradient')
        ? [...img.matchAll(/rgba?\(([^)]+)\)/g)].map(m => parse(m[1])).filter(Boolean)
        : []
      chain.push({ bc, grad })
      if (bc && bc.a > 0.99 && !grad.length) break
    }
    const body = parse(getComputedStyle(document.body).backgroundColor)
    let bases = [body && body.a > 0.99 ? body.c : [255, 255, 255]]
    for (const layer of chain.reverse()) {
      if (layer.bc && layer.bc.a > 0) bases = bases.map(b => over(layer.bc, b))
      if (layer.grad.length) {
        // Judge a gradient on every stop, so a button is checked at its
        // lightest end as well as its darkest.
        bases = layer.grad.flatMap(stop => bases.map(b => over(stop, b)))
      }
      if (bases.length > 8) bases = bases.slice(0, 8)
    }
    return bases
  }

  // An emoji glyph is an image, not text; its contrast says nothing.
  const EMOJI_ONLY = /^[\p{Extended_Pictographic}\p{Emoji_Component}\s\u2190-\u21FF\u2022\u00b7]+$/u

  const out = []
  for (const el of document.querySelectorAll('p,li,span,td,th,h1,h2,h3,h4,a,button,label,div,option')) {
    const text = el.textContent.trim()
    if (!text || el.children.length) continue
    if (EMOJI_ONLY.test(text)) continue
    const st = getComputedStyle(el)
    if (st.visibility === 'hidden' || st.display === 'none') continue
    const fg = parse(st.color)
    if (!fg || fg.a < 0.9) continue // bg-clip-text heading; it is its own gradient
    for (const bg of backgrounds(el)) {
      const r = cr(fg.c, bg)
      if (r < AA) {
        out.push({
          r: +r.toFixed(2), fs: st.fontSize, weight: st.fontWeight,
          color: st.color, bg: `rgb(${bg.map(Math.round).join(', ')})`,
          text: text.slice(0, 40), cls: el.className.toString().slice(0, 70),
        })
      }
    }
  }
  return out
}, AA)

const browser = await chromium.launch()
let failures = 0

for (const theme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const page = await ctx.newPage()
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
  await page.evaluate(([k, t]) => localStorage.setItem(k, t), [KEYS.theme, theme])

  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(250)
    const active = await page.evaluate(() => document.documentElement.getAttribute('data-theme'))
    if (active !== theme) {
      console.error(`FAIL ${theme} ${route}: data-theme is "${active}"`)
      failures++
    }
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    if (over > 0) {
      console.error(`FAIL ${theme} ${route}: ${over}px horizontal overflow at 390px`)
      failures++
    }
    const bad = await audit(page)
    if (bad.length) {
      failures += bad.length
      console.error(`FAIL ${theme} ${route}: ${bad.length} below AA`)
      for (const x of bad.slice(0, 6)) {
        console.error(`   ${String(x.r).padStart(5)}:1  ${x.fs} ${x.weight}  ${x.color} on ${x.bg}  | ${x.text}`)
      }
    } else {
      console.log(`ok   ${theme.padEnd(5)} ${route.padEnd(11)} no text below AA, no overflow`)
    }
  }
  await ctx.close()
}

await browser.close()
if (failures) {
  console.error(`\n${failures} rendered contrast/layout failure(s).`)
  process.exit(1)
}
console.log('\nall routes clear AA in both themes')
