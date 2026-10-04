// Fails the build if any course material is tracked by git.
//
// The instructor's slide decks and any textbook pages must never be
// committed — doing so republishes someone else's copyrighted work from a public
// git history, where deleting the file later does not remove it.
//
// .gitignore alone is not enough: it has no effect on a file that is already
// tracked, or one added with `git add -f`. This checks what git actually holds.
import { execSync } from 'node:child_process'

const BANNED = /\.(pdf|pptx?|docx?|xlsx?|key)$/i

// Slide images redrawn as SVG are fine; a screenshot of a slide is not. Images
// are allowed only under public/, which holds the app's own icons.
const SUSPECT_IMAGE = /\.(png|jpe?g|gif|webp|bmp|tiff?)$/i

let tracked
try {
  tracked = execSync('git ls-files', { encoding: 'utf8' }).split('\n').filter(Boolean)
} catch {
  // Not a git repo yet (fresh scaffold, CI checkout without history). Nothing to
  // check, and failing here would block the very first build.
  console.log('check-no-sources: not a git repository, skipping')
  process.exit(0)
}

const banned = tracked.filter(f => BANNED.test(f))
const images = tracked.filter(f => SUSPECT_IMAGE.test(f) && !f.startsWith('public/'))

if (banned.length || images.length) {
  console.error('\n  COURSE MATERIAL IS TRACKED BY GIT. Build stopped.\n')
  for (const f of banned) console.error(`    ${f}   <- source document, must not be committed`)
  for (const f of images) console.error(`    ${f}   <- image outside public/, is this a slide capture?`)
  console.error(`
  These belong in ../information-systems materials/, referenced by filename in docs/sources.md.

  To remove one that is already tracked:
    git rm --cached <file>

  If an image outside public/ is genuinely the app's own asset, move it into
  public/ rather than widening this check.
`)
  process.exit(1)
}

console.log(`check-no-sources: ok (${tracked.length} tracked files, no course material)`)
