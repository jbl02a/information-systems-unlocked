// Grading for every question kind, kept out of the pages so the verification
// script can run the same code the app does.

// Fill in the blank. Forgiven: case, surrounding space, punctuation, curly vs
// straight apostrophes, a leading article ("a firewall"), hyphens vs spaces, and
// a trailing plural "s"/"es". Anything else has to be on the item's own alias
// list, so "deliberate" can accept "intentional" without the grader guessing.
export function normalizeBlank(s) {
  let t = String(s ?? '')
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/'s\b/g, 's')
    .replace(/[-_/]/g, ' ')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  return t.replace(/^(a|an|the) /, '')
}

// The forms a normalized answer could take, with spaces removed ("bot net" =
// "botnet") and singular/plural both allowed. Stripping a plural is ambiguous
// ("devices" is "device" + s, "boxes" is "box" + es), so instead of guessing
// one singular we compare every candidate.
function forms(s) {
  const t = normalizeBlank(s).replace(/ /g, '')
  const out = new Set([t])
  if (t.length > 3 && t.endsWith('s') && !t.endsWith('ss')) out.add(t.slice(0, -1))
  if (t.length > 4 && t.endsWith('es')) out.add(t.slice(0, -2))
  return out
}

export function blankCorrect(item, given) {
  const g = forms(given)
  if (![...g][0]) return false
  return item.answers.some(a => [...forms(a)].some(f => g.has(f)))
}

// Matching: `given` maps the left label to the chosen right label. All or
// nothing: one wrong (or missing) pair fails the item.
export function matchCorrect(item, given) {
  return item.pairs.every(p => (given?.[p.left] ?? '') === p.right)
}

// Short answer: `given` is the set of key-point indexes he ticked.
export function shortCredit(item, given) {
  const ticked = Array.isArray(given) ? new Set(given).size : 0
  return item.points.length ? ticked / item.points.length : 0
}

/**
 * Credit for one answered item, 0..1. `item` is the item AS SHOWN (for mc, after
 * the option shuffle, so correctIndex is the shuffled position). `given` is
 * whatever the page stored for that item:
 *   mc     the chosen option index
 *   tf     true | false
 *   blank  the typed string
 *   match  { [left]: right }
 *   short  [indexes of ticked points]
 */
export function creditFor(item, given) {
  if (given === undefined || given === null) return 0
  switch (item.kind) {
    case 'mc': return given === item.correctIndex ? 1 : 0
    case 'tf': return given === item.answer ? 1 : 0
    case 'blank': return blankCorrect(item, given) ? 1 : 0
    case 'match': return matchCorrect(item, given) ? 1 : 0
    case 'short': return shortCredit(item, given)
    default: return 0
  }
}

/** Fully right, for the misses tracker. A short answer must hit every point. */
export function isFullyRight(item, given) {
  return creditFor(item, given) >= 0.999
}
