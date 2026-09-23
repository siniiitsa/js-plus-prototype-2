// Geometry-and-style digest of the preview harness, for proving a change moves
// nothing it should not. Needs `npm run dev` on :5173.
//
//   node scripts/digest.mjs <label> [themes=0,2,3,4] [cats=all]
//   WIDTHS=desktop EXTRA='&live=1' OUT=/tmp/digest node scripts/digest.mjs after 0
//   EXTRA="&cj=$(node -p 'encodeURIComponent(…)')" node scripts/digest.mjs blank 0,1,2 form
//
// Renders every cat × layout × width × theme and writes one file per render,
// one row per element under #root (skipping .seal-spin, a running animation),
// to $OUT/<label>/. Diff two labels with `cmp` per file: a rerun of an unchanged
// tree diffs to zero, so any differing file is a real change.
//
// Drives the chrome-headless-shell that chrome-devtools-mcp already caches in
// ~/.cache/puppeteer, so puppeteer-core downloads no browser.
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { headlessShell } from './headless-shell.mjs'

const [label, themesArg = '0,2,3,4', catsArg] = process.argv.slice(2)
if (!label) { console.error('usage: node scripts/digest.mjs <label> [themes] [cats]'); process.exit(1) }

// The layout count per category — sidebar layouts, not designs, so folded
// indices are digested too.
const CATS = { header: 6, bio: 4, media: 4, pricing: 4, repertoire: 4, gallery: 4, calendar: 4, map: 4, testimonials: 4, form: 4, footer: 1 }
const cats = catsArg ? catsArg.split(',') : Object.keys(CATS)
const themes = themesArg.split(',').map(Number)
const widths = (process.env.WIDTHS || 'desktop,tablet,mobile').split(',')
const extra = process.env.EXTRA || ''
const base = process.env.BASE || 'http://localhost:5173'
const jobs = []
for (const t of themes) for (const w of widths) for (const c of cats) for (let a = 0; a < CATS[c]; a++) jobs.push(`cat=${c}&arch=${a}&theme=${t}&w=${w}${extra}`)

const dir = path.join(process.env.OUT || path.join(os.tmpdir(), 'encore-digest'), label)
fs.mkdirSync(dir, { recursive: true })

function probe() {
  const root = document.getElementById('root'), rr = root.getBoundingClientRect(), rows = []
  const r1 = (v) => Math.round(v * 10) / 10
  const walk = (el) => {
    if (el.classList && el.classList.contains('seal-spin')) return
    const r = el.getBoundingClientRect(), cs = getComputedStyle(el)
    const txt = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.nodeValue).join('').slice(0, 40)
    rows.push([el.tagName, r1(r.x - rr.x), r1(r.y - rr.y), r1(r.width), r1(r.height), cs.backgroundColor, cs.backgroundImage.slice(0, 50),
      cs.color, cs.borderTopWidth, cs.borderTopColor, cs.borderRadius, cs.fontSize, cs.fontFamily, cs.fontWeight, cs.lineHeight,
      cs.letterSpacing, cs.textTransform, cs.transform, cs.boxShadow, cs.opacity, el.getAttribute('src')?.slice(0, 40) ?? '', txt].join('|'))
    for (const ch of el.children) walk(ch)
  }
  walk(root)
  return rows.join('\n')
}

const browser = await puppeteer.launch({ executablePath: headlessShell(), headless: 'shell' })
let i = 0
const worker = async () => {
  const page = await browser.newPage()
  await page.setViewport({ width: 1300, height: 900 })
  while (i < jobs.length) {
    const q = jobs[i++]
    // A Vite full reload (a dependency re-optimisation, an edit landing) can
    // navigate the page under the probe; take the render again rather than die.
    for (let attempt = 0; ; attempt++) {
      try {
        await page.goto(`${base}/preview.html?${q}`, { waitUntil: 'load' })
        await page.evaluate(() => document.fonts.ready)
        await new Promise((r) => setTimeout(r, 250))
        // A `&cj=` override is left out of the name (ENAMETOOLONG otherwise):
        // the content it seeds belongs in the label.
        fs.writeFileSync(path.join(dir, q.replace(/&cj=[^&]*/, '').replace(/[&=]/g, '_') + '.txt'), await page.evaluate(probe))
        break
      } catch (e) {
        if (attempt >= 2 || !/context was destroyed|navigat/i.test(e.message)) throw e
        await new Promise((r) => setTimeout(r, 1000))
      }
    }
  }
  await page.close()
}
await Promise.all(Array.from({ length: 6 }, worker))
await browser.close()
console.log(`${label}: ${jobs.length} renders → ${dir}`)
