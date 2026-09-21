// Field-reach probe: which designs read a key. For each probe it renders the
// preview harness with and without a sentinel and reports the designs whose
// #root HTML moved — the measurement FIELDS' `in` and the identity hints are
// written from (CLAUDE.md, the FIELDS bullet; JP-042, JP-037). Needs
// `npm run dev` on :5173.
//
//   node scripts/reach.mjs [themes=0,1,2]
//
// A probe is { name, cats, param: 'cj' | 'who', value, base? }: `cj` types into
// the section's own content, `who` into the header's identity as every other
// section reads it. `base` is the comparison's other side, where an absent key
// is not it (showTags hidden against shown). A hit is reported as the renders
// of a design that moved out of its six (three widths × canvas and live).
import puppeteer from 'puppeteer-core'
import { headlessShell } from './headless-shell.mjs'

const themes = (process.argv[2] || '0,1,2').split(',').map(Number)
const CATS = { header: 6, bio: 4, media: 4, pricing: 4, repertoire: 4, gallery: 4, calendar: 4, map: 4, testimonials: 4, form: 4, footer: 1 }
const OTHERS = Object.keys(CATS).filter((c) => c !== 'header')
const Z = 'ZZSENTINEL'
const PROBES = [
  { name: 'who.kicker', cats: OTHERS, param: 'who', value: { kicker: Z } },
  { name: 'who.location', cats: OTHERS, param: 'who', value: { location: Z } },
  { name: 'who.tags', cats: OTHERS, param: 'who', value: { tags: Z } },
  { name: 'who.showTags=hide', cats: OTHERS, param: 'who', value: { showTags: 'hide' } },
  { name: 'header.tags', cats: ['header'], param: 'cj', value: { tags: Z } },
  { name: 'header.showTags=hide', cats: ['header'], param: 'cj', value: { showTags: 'hide' } },
  { name: 'header.heroCta', cats: ['header'], param: 'cj', value: { heroCta: Z } },
  { name: 'bio.credit', cats: ['bio'], param: 'cj', value: { credit: Z } },
  { name: 'bio.cta', cats: ['bio'], param: 'cj', value: { cta: Z } },
  { name: 'map.status', cats: ['map'], param: 'cj', value: { status: Z } },
  { name: 'map.updated', cats: ['map'], param: 'cj', value: { updated: Z } },
  { name: 'map.rings', cats: ['map'], param: 'cj', value: { rings: Z } },
  { name: 'map.expand', cats: ['map'], param: 'cj', value: { expand: Z } },
]
const base = process.env.BASE || 'http://localhost:5173'
const browser = await puppeteer.launch({ executablePath: headlessShell(), headless: 'shell' })
const html = async (page, q) => {
  for (let attempt = 0; ; attempt++) {
    try {
      await page.goto(`${base}/preview.html?${q}`, { waitUntil: 'load' })
      await new Promise((r) => setTimeout(r, 120))
      // useId differs between otherwise identical renders only if the tree does.
      return await page.evaluate(() => document.getElementById('root').innerHTML)
    } catch (e) {
      if (attempt >= 2 || !/context was destroyed|navigat/i.test(e.message)) throw e
      await new Promise((r) => setTimeout(r, 1000))
    }
  }
}
const jobs = []
for (const p of PROBES) for (const t of themes) for (const c of p.cats) for (let a = 0; a < CATS[c]; a++)
  for (const w of ['desktop', 'tablet', 'mobile']) for (const live of ['', '&live=1']) jobs.push({ p, t, c, a, w, live })
const hits = {}
let i = 0
const worker = async () => {
  const page = await browser.newPage()
  await page.setViewport({ width: 1300, height: 900 })
  while (i < jobs.length) {
    const { p, t, c, a, w, live } = jobs[i++]
    const q = `cat=${c}&arch=${a}&theme=${t}&w=${w}${live}`
    const enc = (v) => `&${p.param}=${encodeURIComponent(JSON.stringify(v))}`
    const moved = (await html(page, q + (p.base ? enc(p.base) : ''))) !== (await html(page, q + enc(p.value)))
    const k = `${p.name} | theme ${t} | ${c}`
    ;(hits[k] ??= {})[a] = ((hits[k] ?? {})[a] ?? 0) + (moved ? 1 : 0)
  }
  await page.close()
}
await Promise.all(Array.from({ length: 6 }, worker))
await browser.close()
for (const k of Object.keys(hits).sort()) {
  const row = Object.entries(hits[k]).filter(([, n]) => n).map(([a, n]) => `layout ${+a + 1}${n === 6 ? '' : ` (${n}/6)`}`)
  if (row.length) console.log(`${k}: ${row.join(', ')}`)
}
console.log(`${jobs.length * 2} renders`)
