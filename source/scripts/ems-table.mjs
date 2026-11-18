// Generates an advance-width table (and its pair kerning) for one of the
// display faces, in the shape data.js keeps them (BEBAS_EM, GLOOCK_EM and
// GLOOCK_KERN, now FRAUNCES_EM and FRAUNCES_KERN): every character's advance
// in em at 1000px, read off the rendered DOM in the loaded face, untracked,
// not canvas measureText (which cannot see an unloaded webfont), then every
// pair's width less its two advances. Needs `npm run dev` on :5173.
//
//   node scripts/ems-table.mjs Fraunces           # prints the two tables
//   node scripts/ems-table.mjs Fraunces --check   # sums a few names against the DOM
//
// Pair deltas tighter than -0.03em, and every positive one rounded toward zero,
// are kept, so a sum lands over a measured label and never under (the Gloock
// table's rule); the unlisted rest are dropped, which only widens the sum.
import puppeteer from 'puppeteer-core'
import { headlessShell } from './headless-shell.mjs'

const face = process.argv[2] || 'Fraunces'
const check = process.argv.includes('--check')
const base = process.env.BASE || 'http://localhost:5173'
const SINGLES = [...' !"#&\'()+,-./0123456789:?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz·–—‘’“”éèêëáàâäíìîïóòôöúùûüñçßøå']
// The pairs worth asking about: letters, digits and the punctuation a name carries.
const PAIR = [...' \'’.,-!?&0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz']

const browser = await puppeteer.launch({ executablePath: headlessShell(), headless: 'shell' })
const page = await browser.newPage()
await page.goto(`${base}/preview.html?cat=header&arch=0&theme=0&w=desktop`, { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)
const out = await page.evaluate(async (face, SINGLES, PAIR, check) => {
  // The face must be in use for the browser to fetch it: the header's own h1 is.
  await document.fonts.load(`1000px '${face}'`)
  const host = document.createElement('div')
  host.style.cssText = `position:fixed;left:0;top:0;visibility:hidden;font:400 1000px '${face}', serif;white-space:pre;letter-spacing:0;font-kerning:normal`
  document.body.appendChild(host)
  const w = (t) => { host.textContent = t; return host.getBoundingClientRect().width / 1000 }
  const adv = {}
  for (const ch of SINGLES) adv[ch] = +w(ch).toFixed(3)
  const kern = {}
  for (const a of PAIR) for (const b of PAIR) {
    const d = w(a + b) - w(a) - w(b)
    // toward zero for a positive one, as far as measured for a negative one
    const k = d > 0 ? Math.floor(d * 1000) / 1000 : Math.ceil(d * 1000) / 1000
    if (k <= -0.03 || k >= 0.03) kern[a + b] = +k.toFixed(3)
  }
  const sums = {}
  if (check) {
    for (const t of ['Kai Mercer', 'The most important thing', 'Hannah Montgomery', 'DJ Valentina Wolfe', 'Te Awanui Reeves-Tiwai', 'Wynne & the Waves'])
      sums[t] = { dom: +w(t).toFixed(3) }
  }
  return { adv, kern, sums }
}, face, SINGLES, PAIR, check)
await browser.close()

const esc = (k) => k.replace(/'/g, "\\'")
const advLines = []
let line = '  '
for (const [k, v] of Object.entries(out.adv)) {
  const item = `${/^[A-Za-z0-9]$/.test(k) ? k : `'${esc(k)}'`}: ${v}, `
  if ((line + item).length > 100) { advLines.push(line.trimEnd()); line = '  ' }
  line += item
}
advLines.push(line.trimEnd())
const kernLines = []
line = '  '
for (const [k, v] of Object.entries(out.kern)) {
  const item = `'${esc(k)}': ${v}, `
  if ((line + item).length > 100) { kernLines.push(line.trimEnd()); line = '  ' }
  line += item
}
kernLines.push(line.trimEnd())
const NAME = face.toUpperCase()
console.log(`const ${NAME}_EM = {\n${advLines.join('\n')}\n}\n`)
console.log(`const ${NAME}_KERN = {\n${kernLines.join('\n')}\n}`)
if (check) {
  const sum = (t) => {
    const chs = [...t]
    return chs.reduce((w, ch, i) => w + (out.adv[ch] ?? 0.7) + (i ? out.kern[chs[i - 1] + ch] ?? 0 : 0), 0)
  }
  console.error('\nname · DOM em · table em · over %')
  for (const [t, v] of Object.entries(out.sums)) console.error(`${t} · ${v.dom} · ${sum(t).toFixed(3)} · ${(((sum(t) / v.dom) - 1) * 100).toFixed(2)}`)
}
