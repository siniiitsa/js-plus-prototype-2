// The end-of-pass whole-page published check (plans/lime/layout-1.md, "Learned
// on the end-of-pass sweep"): the builder walked from the template picker to
// the published tab, under one template, once per header card. Needs
// `npm run dev` on :5173 (or BASE= any served build).
//
//   node scripts/page-check.mjs [template=Grunge] [cards=0,1,2,3]
//
// The FIRST card in the list gets the full walk (so `Grunge 1,0,2,3` walks
// card 2): every nav link, Book Now, every other fragment link on the page,
// the media player, a generic control probe per section, the enquiry form's
// refused and filled submits, the footer, a tablet ↔ mobile resize walk, the
// burger at 390, and a 180px seam clip on the top of every section at 1440
// and 390. The other cards are only proved to render and publish: section
// ids, console errors and one full-page picture. Console warnings are kept
// apart from errors, unfiltered — React's text is a `%s` format string, so a
// filter on a word finds nothing (plans/grunge/layout-2.md, open question 1). Writes $OUT/<template>/ and prints a JSON
// report. Clicks are puppeteer's trusted CDP clicks, which is what gets past
// the popup blocker and starts audio.
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { headlessShell } from './headless-shell.mjs'

const [template = 'Grunge', cardsArg = '0,1,2,3'] = process.argv.slice(2)
const base = process.env.BASE || 'http://localhost:5173'
const dir = path.join(process.env.OUT || path.join(os.tmpdir(), 'encore-page-check'), template)
fs.mkdirSync(dir, { recursive: true })
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await puppeteer.launch({
  executablePath: headlessShell(), headless: 'shell',
  args: ['--autoplay-policy=no-user-gesture-required'],
})

const byText = async (page, text, scope = 'button') => {
  const hs = await page.$$(scope)
  for (const h of hs) if ((await h.evaluate((el) => el.textContent.trim())).startsWith(text)) return h
  throw new Error(`no ${scope} "${text}"`)
}

// Picker → editor → setup modal's card → Publish → Open. Returns the popup.
async function publish(card, errors, warnings = []) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  page.on('pageerror', (e) => errors.push(`editor: ${e.message}`))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`editor console: ${m.text()}`)
    if (m.type() === 'warn') warnings.push(`editor: ${m.text()} ${m.args().length > 1 ? '(args follow the format string)' : ''}`.trim())
  })
  await page.goto(base, { waitUntil: 'load' })
  await (await page.waitForSelector(`button[aria-label="${template}"][aria-pressed]`)).click()
  await (await page.waitForSelector(`button[aria-label^="Open the editor with the ${template} template"]`)).click()
  await page.waitForSelector('[role=dialog] button[aria-pressed]')
  const cards = await page.$$('[role=dialog] button[aria-pressed]')
  if (!cards[card]) throw new Error(`the modal offers ${cards.length} cards, no card ${card}`)
  await cards[card].click()
  await (await byText(page, 'Use this header')).click()
  await wait(400)
  await (await byText(page, 'Publish')).click()
  await wait(400)
  const popupP = new Promise((r) => page.once('popup', r))
  await (await byText(page, 'Open')).click()
  const popup = await popupP
  popup.on('pageerror', (e) => errors.push(`popup: ${e.message}`))
  popup.on('console', (m) => {
    if (m.type() === 'error') errors.push(`popup console: ${m.text()}`)
    if (m.type() === 'warn') warnings.push(`popup: ${m.text()}`)
  })
  await wait(1200)
  return { page, popup, cards: cards.length }
}

const resize = async (popup, width) => {
  await popup.setViewport({ width, height: 900 })
  await popup.evaluate(() => window.dispatchEvent(new Event('resize')))
  await wait(700)
}

const sections = (popup) => popup.evaluate(() => [...document.querySelectorAll('[id]')]
  .filter((el) => el.style.getPropertyValue('--ac'))
  .map((el) => { const r = el.getBoundingClientRect(); return { id: el.id, top: Math.round(r.top + scrollY), h: Math.round(r.height) } }))

async function seams(popup, width) {
  const secs = await sections(popup)
  await popup.evaluate(() => scrollTo(0, 0))
  for (const s of secs.slice(1)) {
    await popup.screenshot({
      path: path.join(dir, `seam_${width}_${s.id}.jpg`), type: 'jpeg', quality: 80, captureBeyondViewport: true,
      clip: { x: 0, y: Math.max(0, s.top - 90), width, height: 180 },
    })
  }
  await popup.screenshot({ path: path.join(dir, `page_${width}.jpg`), type: 'jpeg', quality: 60, fullPage: true })
  return secs
}

const report = { template, cards: {} }

const cardList = cardsArg.split(',').map(Number)
for (const card of cardList) {
  const errors = [], warnings = []
  const r = (report.cards[card] = { errors, warnings })
  let ctx
  try { ctx = await publish(card, errors, warnings) } catch (e) { r.failed = e.message; continue }
  const { page, popup } = ctx
  r.modalCards = ctx.cards
  r.title = await popup.title()
  r.url = popup.url()

  await resize(popup, 1440)

  if (card !== cardList[0]) {
    r.sections = (await sections(popup)).map((s) => s.id)
    await popup.screenshot({ path: path.join(dir, `card${card}_1440.jpg`), type: 'jpeg', quality: 60, fullPage: true })
    await resize(popup, 390)
    await popup.screenshot({ path: path.join(dir, `card${card}_390.jpg`), type: 'jpeg', quality: 60, fullPage: true })
    await popup.close(); await page.close()
    continue
  }

  await popup.evaluate(() => {
    window.__scrolled = []
    const orig = Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function (...a) { window.__scrolled.push(this.id || this.tagName); return orig.apply(this, a) }
    document.addEventListener('click', (e) => { if (e.target.closest?.('a[href^="mailto:"]')) e.preventDefault() }, true)
  })
  const scrolled = () => popup.evaluate(() => window.__scrolled.splice(0))

  r.sections1440 = await seams(popup, 1440)

  // Every fragment link in the header, the Book pill among them.
  r.nav = []
  const n = await popup.$$eval('#header a[href^="#"]', (as) => as.length)
  for (let i = 0; i < n; i++) {
    const a = (await popup.$$('#header a[href^="#"]'))[i]
    const label = await a.evaluate((el) => `${el.textContent.trim()} → ${el.getAttribute('href')}`)
    await a.click(); await wait(150)
    r.nav.push({ label, scrolled: await scrolled() })
  }

  // Every other fragment link on the page: the section pills, the calendar's
  // flow. Each should scroll to its id.
  r.anchors = []
  const an = await popup.$$eval('a[href^="#"]', (as) => as.filter((a) => !a.closest('#header, #footer')).length)
  for (let i = 0; i < an; i++) {
    const a = (await popup.$$('a[href^="#"]')).filter(Boolean)
    const h = (await Promise.all(a.map((el) => el.evaluate((x) => !x.closest('#header, #footer'))))).map((ok, k) => ok ? a[k] : null).filter(Boolean)[i]
    const label = await h.evaluate((el) => `${el.closest('[id]')?.id}: ${el.textContent.trim().slice(0, 24)} → ${el.getAttribute('href')}`)
    await h.evaluate((el) => el.scrollIntoView({ block: 'center' })); await scrolled()
    await h.click(); await wait(150)
    r.anchors.push({ label, scrolled: await scrolled() })
  }

  // The media player: one trusted click on a track, then what the element says.
  r.media = await (async () => {
    const audio = await popup.$('#media audio')
    if (!audio) return 'no <audio>'
    const before = await popup.$eval('#media', (el) => el.innerHTML)
    const pts = await popup.$$eval('#media *', (els) => els.filter((el) => getComputedStyle(el).cursor === 'pointer' && !el.children.length)
      .map((el) => { const b = el.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 + scrollY, a: b.width * b.height } }).filter((p) => p.a > 0).slice(0, 1))
    if (!pts[0]) return 'no clickable'
    await popup.evaluate((y) => scrollTo(0, y - 300), pts[0].y); await wait(200)
    await popup.mouse.click(pts[0].x, 300); await wait(1500)
    const st = await audio.evaluate((a) => ({ src: a.currentSrc || a.src, paused: a.paused, t: a.currentTime, err: a.error?.code ?? null }))
    return { ...st, moved: before !== await popup.$eval('#media', (el) => el.innerHTML) }
  })()
  await popup.$eval('#media audio', (a) => a.pause()).catch(() => {})

  // A generic probe: pointer-cursor leaves that are not links, a handful
  // clicked, the section's HTML compared. `false` is often an idempotent click.
  r.controls = {}
  for (const id of ['gallery', 'repertoire', 'map', 'pricing', 'calendar', 'testimonials']) {
    const out = (r.controls[id] = [])
    const count = await popup.$$eval(`#${id} *`, (els) => els.filter((el) => !el.children.length && getComputedStyle(el).cursor === 'pointer' && !el.closest('a[href]')
      && el.getBoundingClientRect().width * el.getBoundingClientRect().height > 0).length).catch(() => 0)
    const step = Math.max(1, Math.floor(count / 6))
    for (let k = 0; k < count && out.length < 6; k += step) {
      const before = await popup.$eval(`#${id}`, (el) => el.innerHTML)
      const pt = await popup.$$eval(`#${id} *`, (els, k) => {
        const el = els.filter((el) => !el.children.length && getComputedStyle(el).cursor === 'pointer' && !el.closest('a[href]')
          && el.getBoundingClientRect().width * el.getBoundingClientRect().height > 0)[k]
        if (!el) return null
        el.scrollIntoView({ block: 'center' })
        const b = el.getBoundingClientRect()
        return { x: b.x + b.width / 2, y: b.y + b.height / 2, what: (el.textContent || el.tagName).trim().slice(0, 24) }
      }, k)
      if (!pt) break
      await popup.mouse.click(pt.x, pt.y); await wait(150)
      out.push(`${pt.what || 'leaf'}: ${before !== await popup.$eval(`#${id}`, (el) => el.innerHTML)}`)
    }
    await scrolled()
  }

  // The enquiry form: a refused submit, then a filled one read off the href.
  r.form = await (async () => {
    const submit = () => popup.$('#form a[href^="mailto:"], #form a:not([href])')
    const inputs = await popup.$$('#form input, #form textarea')
    if (!inputs.length) return 'no inputs'
    // Refused: click the submit with every box empty and read the boxes' rings.
    const rings = () => popup.$$eval('#form input, #form textarea', (els) => els.map((el) => {
      const cs = getComputedStyle(el)
      return `${Math.round(el.getBoundingClientRect().height)} ${cs.boxShadow}`
    }))
    const ringsBefore = await rings()
    const s0 = await submit()
    if (s0) { await s0.evaluate((el) => el.scrollIntoView({ block: 'center' })); await s0.click(); await wait(200) }
    const ringsRefused = await rings()
    const hrefBefore = await popup.$$eval('#form a', (as) => as.map((a) => a.getAttribute('href')))
    for (const i of inputs) {
      const kind = await i.evaluate((el) => el.type)
      await i.evaluate((el) => el.scrollIntoView({ block: 'center' }))
      await i.type(kind === 'email' ? 'visitor@example.com' : 'Test 12')
    }
    const hrefs = await popup.$$eval('#form a', (as) => as.map((a) => a.getAttribute('href')).filter((h) => h?.startsWith('mailto:')))
    const s = await submit()
    if (s) { await s.evaluate((el) => el.scrollIntoView({ block: 'center' })); await s.click(); await wait(300) }
    return { inputs: inputs.length, ringsBefore, ringsRefused, hrefBefore, mailto: hrefs[0]?.slice(0, 200) ?? null, sentText: await popup.$eval('#form', (el) => el.innerText.slice(0, 200)) }
  })()

  // The footer's links and pill.
  r.footer = []
  const fn = await popup.$$eval('#footer a[href^="#"]', (as) => as.length)
  for (let i = 0; i < fn; i++) {
    const a = (await popup.$$('#footer a[href^="#"]'))[i]
    const label = await a.evaluate((el) => `${el.textContent.trim()} → ${el.getAttribute('href')}`)
    await a.evaluate((el) => el.scrollIntoView({ block: 'center' })); await scrolled()
    await a.click(); await wait(150)
    r.footer.push({ label, scrolled: await scrolled() })
  }
  // Resize walk for React's style-collision warnings: they fire on a re-render
  // that drops a longhand, and only a tablet ↔ mobile step shows every one
  // (plans/grunge/layout-2.md, open question 1).
  const w0 = warnings.length
  for (const w of [768, 390, 768, 1440, 390, 1440]) await resize(popup, w)
  r.resizeWarnings = warnings.slice(w0)
  await popup.close(); await page.close()

  // 390 in a fresh tab: NavMenu's open state survives a resize.
  const m = await publish(card, errors, warnings)
  await resize(m.popup, 390)
  r.sections390 = await seams(m.popup, 390)
  r.overflow390 = await m.popup.evaluate(() => document.documentElement.scrollWidth - innerWidth)
  r.burger = await (async () => {
    const before = await m.popup.$$eval('#header a[href^="#"]', (as) => as.length)
    // NavMenu's burger is a 26px span of three bars, not a button.
    await m.popup.evaluate(() => scrollTo(0, 0))
    const pt = await m.popup.$$eval('#header span', (els) => {
      const el = els.find((el) => getComputedStyle(el).cursor === 'pointer' && Math.round(el.getBoundingClientRect().width) === 26)
      if (!el) return null
      const b = el.getBoundingClientRect()
      return { x: b.x + b.width / 2, y: b.y + b.height / 2 }
    })
    if (!pt) return { before, note: 'no burger' }
    await m.popup.mouse.click(pt.x, pt.y); await wait(300)
    const after = await m.popup.$$eval('#header a[href^="#"]', (as) => as.length)
    await m.popup.screenshot({ path: path.join(dir, 'burger_390.jpg'), type: 'jpeg', quality: 70 })
    return { before, after }
  })()
  await m.popup.close(); await m.page.close()
}

await browser.close()
fs.writeFileSync(path.join(dir, 'report.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))
console.log(`→ ${dir}`)
