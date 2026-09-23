// JP-038's reproduction: the published tab's desktop gutter at the tester's six
// window widths. Needs `npm run dev` on :5173.
//
//   node scripts/gutter.mjs
//
// Opens the builder, picks the spotlit template, publishes, and resizes the
// real window the published tab lives in (Browser.setWindowBounds, not viewport
// emulation, which fires `resize` whatever the tab's state) — first with the
// published tab in front, then with the editor in front, reading the first
// padded section's padding-left while the tab is hidden and again once it is
// shown, in screen pixels. Expected past 1180: the page zoomed by
// k = min(clientWidth, 1440) / 1180, so 64k up to 1440 and 64k + the surplus
// past it (JP-038, reopened); below it the tablet frame's
// 40 + (clientWidth - 768) / 2. A hidden tab keeps the size it
// was hidden at and catches up when shown, so no width goes stale.
import puppeteer from 'puppeteer-core'
import { chromeForTesting } from './headless-shell.mjs'

const WIDTHS = [1170, 1280, 1440, 1600, 1760, 1910]
const base = process.env.BASE || 'http://localhost:5173'
const nap = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await puppeteer.launch({ executablePath: chromeForTesting(), headless: true, defaultViewport: null, args: ['--window-size=1440,900'] })
const page = (await browser.pages())[0]
await page.goto(base, { waitUntil: 'load' })

const press = async (test) => {
  const h = await page.waitForFunction((t) => [...document.querySelectorAll('button')].find((b) =>
    (b.getAttribute('aria-label') || '').startsWith(t) || b.textContent.trim().startsWith(t)), {}, test)
  await h.asElement().click()
  await nap(300)
}
await press('Open the editor')
await press('Use this header')
await press('Publish')
const popped = new Promise((r) => page.once('popup', r))
await press('Open')
const pop = await popped
await nap(500)

// The header's root carries no padding of its own (its compositions apply the
// gutter themselves), so the second section is the first that shows it.
const read = () => pop.evaluate(() => {
  const roots = [...document.querySelectorAll('[id]')].filter((el) => el.style.getPropertyValue('--ac'))
  const w = document.documentElement.clientWidth
  const k = w < 1180 ? 1 : Math.min(w, 1440) / 1180
  const want = w < 1180 ? 40 + Math.round((w - 768) / 2) : (64 + Math.max(0, Math.round((w / k - 1180) / 2))) * k
  // Screen pixels: the padding is in the page's own px, which the desktop
  // zoom draws `currentCSSZoom` times larger.
  const zoom = roots[1].currentCSSZoom ?? 1
  const got = parseFloat(getComputedStyle(roots[1]).paddingLeft) * zoom
  return `clientWidth ${w}, zoom ${zoom.toFixed(3)}, gutter ${got.toFixed(1)}px (expected ${want.toFixed(1)}px), ${document.visibilityState}`
})

const cdp = await browser.target().createCDPSession()
const { windowId } = await cdp.send('Browser.getWindowForTarget', { targetId: pop.target()._targetId })
for (const hidden of [false, true]) {
  console.log(hidden ? '— resized with the editor in front' : '— resized with the published tab in front')
  for (const width of WIDTHS) {
    if (hidden) { await page.bringToFront(); await nap(200) }
    await cdp.send('Browser.setWindowBounds', { windowId, bounds: { width, height: 900 } })
    await nap(400)
    if (hidden) { console.log(`${width} hidden: ${await read()}`); await pop.bringToFront(); await nap(400) }
    console.log(`${width}: ${await read()}`)
  }
}
await browser.close()
