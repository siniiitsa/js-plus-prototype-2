// The two-build digest that proves a root `index.html` refresh (plans/lime/
// layout-1.md, "Learned on the end-of-pass sweep"). `digest.mjs` can only reach
// the dev server's harness, so this one walks the editor of a BUILT app: per
// theme, the picker's thumbnail, the big card, the setup modal's first card,
// then the Desktop / Tablet / Mobile tabs, digesting every section root on the
// canvas at each. `CARD=<n>` picks the setup modal's 0-based card instead of the
// first — the proof for a layout pass, whose seeded page is arch 0 and so
// cannot move (CARD=1 walks every theme's layout-2 page).
//
//   python3 -m http.server 8931 --bind 127.0.0.1        # at the repo root
//   node scripts/build-digest.mjs old 'http://127.0.0.1:8931/index.html?v=old'   # BEFORE the cp
//   node scripts/build-digest.mjs new http://127.0.0.1:8931/source/dist-standalone/index.html
//
// Both builds must come from one origin. Writes $OUT/<label>/theme_<i>_<tab>.txt
// plus modal.txt (how many header cards each theme's modal offers); diff the two
// labels with `cmp` per file.
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { headlessShell } from './headless-shell.mjs'

const [label, url] = process.argv.slice(2)
const card = Number(process.env.CARD || 0)
if (!label || !url) { console.error('usage: node scripts/build-digest.mjs <label> <url>'); process.exit(1) }
const dir = path.join(process.env.OUT || path.join(os.tmpdir(), 'encore-build-digest'), label)
fs.mkdirSync(dir, { recursive: true })
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

function probe() {
  const roots = [...document.querySelectorAll('*')].filter((el) => el.style?.getPropertyValue('--ac') && !el.closest('[role=dialog]'))
  if (!roots.length) return ''
  const o = roots[0].getBoundingClientRect(), rows = []
  const r1 = (v) => Math.round(v * 10) / 10
  const walk = (el) => {
    if (el.classList && el.classList.contains('seal-spin')) return
    const r = el.getBoundingClientRect(), cs = getComputedStyle(el)
    const txt = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.nodeValue).join('').slice(0, 40)
    rows.push([el.tagName, r1(r.x - o.x), r1(r.y - o.y), r1(r.width), r1(r.height), cs.backgroundColor, cs.backgroundImage.slice(0, 50),
      cs.color, cs.borderTopWidth, cs.borderTopColor, cs.borderRadius, cs.fontSize, cs.fontFamily, cs.fontWeight, cs.lineHeight,
      cs.letterSpacing, cs.textTransform, cs.transform, cs.boxShadow, cs.opacity, el.getAttribute('src')?.slice(0, 40) ?? '', txt].join('|'))
    for (const ch of el.children) walk(ch)
  }
  roots.forEach(walk)
  return `${roots.length} roots\n${rows.join('\n')}`
}

const browser = await puppeteer.launch({ executablePath: headlessShell(), headless: 'shell' })
const byText = async (page, text, scope) => {
  for (const h of await page.$$(scope)) if ((await h.evaluate((el) => el.textContent.trim())).startsWith(text)) return h
  throw new Error(`no ${scope} "${text}"`)
}
const modal = []
for (let t = 0; ; t++) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(url, { waitUntil: 'load' })
  await page.waitForSelector('button[aria-label][aria-pressed]')
  const thumbs = await page.$$('button[aria-label][aria-pressed]')
  if (t >= thumbs.length) { await page.close(); break }
  const name = await thumbs[t].evaluate((el) => el.getAttribute('aria-label'))
  await thumbs[t].click()
  await (await page.waitForSelector(`button[aria-label^="Open the editor with the ${name} template"]`)).click()
  await page.waitForSelector('[role=dialog] button[aria-pressed]')
  const cards = await page.$$('[role=dialog] button[aria-pressed]')
  modal.push(`${t} ${name}: ${cards.length} cards`)
  if (card) await cards[Math.min(card, cards.length - 1)].click()
  await (await byText(page, 'Use this header', 'button')).click()
  await wait(500)
  for (const tab of ['Desktop', 'Tablet', 'Mobile']) {
    await (await byText(page, tab, '[role=tab]')).click()
    await wait(700)
    await page.evaluate(() => document.fonts.ready)
    const out = await page.evaluate(probe)
    fs.writeFileSync(path.join(dir, `theme_${t}_${tab.toLowerCase()}.txt`), out)
    console.log(`${label} · ${name} · ${tab}: ${out.split('\n')[0]}, ${out.split('\n').length - 1} rows`)
  }
  await page.close()
}
fs.writeFileSync(path.join(dir, 'modal.txt'), modal.join('\n') + '\n')
console.log(modal.join('\n'))
await browser.close()
