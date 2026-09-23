// JP-038 (layout 4)'s measure: each published section's content edges, so
// neighbouring sections can be compared with each other and with the frames.
// Needs `npm run dev` on :5173.
//
//   node scripts/inset.mjs [themes=Retro,Lime,Grunge] [card=4]
//
// Picks the template, the setup modal's header card (which lays out the whole
// page), publishes, and lays the published tab out at 1440, 768 and 390 with
// `setViewport` (Chrome for Testing will not take a real window to 390), and at
// 1600, where the surplus past 1440 has to widen every gutter alike. Per
// section it prints the root's padding and the first and last glyph's x off
// the root's edges — the leftmost / rightmost text on the section, which is the
// column the eye reads — in screen pixels, so the desktop zoom is included.
// Text that starts left of the root (a rail scrolled off the page) is skipped.
// Each width's line also prints the page's scrollWidth against its clientWidth.
import puppeteer from 'puppeteer-core'
import { chromeForTesting } from './headless-shell.mjs'

const [themesArg = 'Retro,Lime,Grunge', cardArg = '4'] = process.argv.slice(2)
const WIDTHS = [1600, 1440, 768, 390]
const base = process.env.BASE || 'http://localhost:5173'
const nap = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await puppeteer.launch({ executablePath: chromeForTesting(), headless: true, defaultViewport: null, args: ['--window-size=1600,900'] })

const read = (pop) => pop.evaluate(() => {
  const roots = [...document.querySelectorAll('[id]')].filter((el) => el.style.getPropertyValue('--ac'))
  const vw = document.documentElement.clientWidth
  return roots.map((root) => {
    const rr = root.getBoundingClientRect(), zoom = root.currentCSSZoom ?? 1
    let l = Infinity, r = -Infinity
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      if (!n.nodeValue.trim()) continue
      const el = n.parentElement, cs = getComputedStyle(el)
      if (cs.visibility === 'hidden' || +cs.opacity === 0) continue
      const range = document.createRange(); range.selectNodeContents(n)
      for (const b of range.getClientRects()) {
        if (!b.width || b.left < rr.left - 0.5 || b.right > rr.right + 0.5 || b.left > vw) continue
        l = Math.min(l, b.left); r = Math.max(r, b.right)
      }
    }
    const pad = parseFloat(getComputedStyle(root).paddingLeft) * zoom
    return { cat: root.id, w: Math.round(rr.width), pad: +pad.toFixed(1), left: +(l - rr.left).toFixed(1), right: +(rr.right - r).toFixed(1) }
  })
})

for (const theme of themesArg.split(',')) {
  const page = await browser.newPage()
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await page.goto(base, { waitUntil: 'load' })
  const click = async (fn, arg) => {
    const h = await page.waitForFunction(fn, {}, arg)
    await h.asElement().click()
    await nap(300)
  }
  await click((t) => [...document.querySelectorAll('button')].find((b) => b.getAttribute('aria-label') === t), theme)
  await click((t) => [...document.querySelectorAll('button')].find((b) => (b.getAttribute('aria-label') || '').startsWith(`Open the editor with the ${t}`)), theme)
  await click((n) => [...document.querySelectorAll('[role=dialog] button[aria-pressed]')][n - 1], +cardArg)
  await click(() => [...document.querySelectorAll('button')].find((b) => b.textContent.trim().startsWith('Use this header')))
  await click(() => [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Publish'))
  const popped = new Promise((r) => page.once('popup', r))
  await click(() => [...document.querySelectorAll('[role=dialog] button, [role=dialog] a')].find((b) => b.textContent.trim() === 'Open'))
  const pop = await popped
  await pop.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  for (const width of WIDTHS) {
    await pop.setViewport({ width, height: 900 })
    await nap(600)
    await pop.evaluate(() => document.fonts.ready)
    const sw = await pop.evaluate(() => `scrollWidth ${document.documentElement.scrollWidth} / clientWidth ${document.documentElement.clientWidth}`)
    console.log(`— ${theme} card ${cardArg} @ ${width} (${sw})`)
    for (const row of await read(pop)) console.log(`${row.cat.padEnd(13)} w ${row.w}  pad ${row.pad}  text left ${row.left}  right ${row.right}`)
  }
  await pop.close(); await page.close()
}
await browser.close()
