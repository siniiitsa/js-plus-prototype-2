// One JPEG per section from the preview harness, for before/after pictures.
// Needs `npm run dev` on :5173.
//
//   node scripts/shots.mjs <label> [theme=1] [arch=0] [width=desktop]
//
// Writes $OUT/<label>/<cat>.jpg (OUT defaults to the system temp dir), each the
// section root alone, in the harness's real fonts.
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { headlessShell } from './headless-shell.mjs'

const [label, theme = '1', arch = '0', w = 'desktop'] = process.argv.slice(2)
if (!label) { console.error('usage: node scripts/shots.mjs <label> [theme] [arch] [width]'); process.exit(1) }
const cats = ['header', 'bio', 'media', 'gallery', 'repertoire', 'map', 'pricing', 'calendar', 'form', 'testimonials', 'footer']
const base = process.env.BASE || 'http://localhost:5173'
const dir = path.join(process.env.OUT || path.join(os.tmpdir(), 'encore-shots'), label)
fs.mkdirSync(dir, { recursive: true })

const b = await puppeteer.launch({ executablePath: headlessShell(), headless: 'shell' })
const p = await b.newPage()
await p.setViewport({ width: 1300, height: 900 })
for (const c of cats) {
  await p.goto(`${base}/preview.html?cat=${c}&arch=${arch}&theme=${theme}&w=${w}`, { waitUntil: 'load' })
  await p.evaluate(() => document.fonts.ready)
  await new Promise((r) => setTimeout(r, 300))
  await (await p.$('#root > div')).screenshot({ path: path.join(dir, `${c}.jpg`), type: 'jpeg', quality: 70 })
}
await b.close()
console.log(`${label}: ${cats.length} shots → ${dir}`)
