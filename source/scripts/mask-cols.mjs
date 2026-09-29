// Checks a digest diff that should move masks and nothing else
// (plans/grunge/display-face.md, step 4). Takes two label directories that
// digest.mjs wrote, normalised through step 0's `sed`, and compares every
// differing row field by field. Each moved row must differ only in the four
// mask columns (20–23), must have had no mask before, must now carry the
// data-URI tile in both `maskImage` and `webkitMaskImage` at `0% 0%` with
// `maskSize` 4 × its `fontSize`, and must be a text tag. It also counts the
// `linear-gradient` mask rows (the Grain layers) on each side.
//
//   node scripts/mask-cols.mjs <before-dir> <after-dir>
//
// Prints the files and rows moved, any failures, and each render's moved
// `TAG@fontSize` set. Exits 1 if anything fails.
import fs from 'node:fs'

const [A, B] = process.argv.slice(2)
if (!B) { console.error('usage: node scripts/mask-cols.mjs <before-dir> <after-dir>'); process.exit(1) }
let files = 0, changedRows = 0, bad = [], bySite = {}, grad = [0, 0], newMask = 0
for (const f of fs.readdirSync(A)) {
  const a = fs.readFileSync(`${A}/${f}`, 'utf8').split('\n'), b = fs.readFileSync(`${B}/${f}`, 'utf8').split('\n')
  grad[0] += a.filter((r) => r.includes('linear-gradient') && r.split('|')[20]?.includes('gradient')).length
  grad[1] += b.filter((r) => r.includes('linear-gradient') && r.split('|')[20]?.includes('gradient')).length
  if (a.length !== b.length) { bad.push(`${f}: row count ${a.length} vs ${b.length}`); continue }
  let moved = false
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) continue
    moved = true; changedRows++
    const x = a[i].split('|'), y = b[i].split('|')
    if (x.length !== y.length) { bad.push(`${f}:${i} field count`); continue }
    const cols = x.map((v, k) => (v !== y[k] ? k : -1)).filter((k) => k >= 0)
    if (cols.some((k) => k < 20 || k > 23)) bad.push(`${f}:${i} cols ${cols}`)
    if (x[20] !== 'none' || x[21] !== 'none' || x[22] !== 'auto' || x[23] !== '0% 0%') bad.push(`${f}:${i} base had a mask: ${x.slice(20, 24)}`)
    if (!y[20].startsWith('url("data:image/svg+xml') || y[21] !== y[20]) bad.push(`${f}:${i} new mask ${y[20]}`)
    const fs_ = parseFloat(y[11]), m = y[22].split(' ').map(parseFloat)
    if (m.length !== 2 || m.some((v) => Math.abs(v - 4 * fs_) > 0.01)) bad.push(`${f}:${i} size ${y[22]} vs font ${y[11]}`)
    if (!['H1', 'H2', 'H3', 'P', 'SPAN'].includes(y[0])) bad.push(`${f}:${i} tag ${y[0]}`)
    if (y[23] !== '0% 0%') bad.push(`${f}:${i} pos ${y[23]}`)
    newMask++
    ;(bySite[f.replace(/_theme_\d_w_\w+\.txt/, '')] ??= new Set()).add(`${y[0]}@${y[11]}`)
  }
  if (moved) files++
}
console.log({ files, changedRows, newMask, gradientRows: grad, bad: bad.slice(0, 20), nbad: bad.length })
for (const [k, v] of Object.entries(bySite)) console.log(k, [...v].join(' '))
if (bad.length) process.exit(1)
