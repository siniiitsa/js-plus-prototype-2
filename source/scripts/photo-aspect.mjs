// What the image editor frames each photo with: for every photo slot of a page, the field's declared
// `aspect` (the fallback) against `photoAspectOf`, the shape of the field's largest photo on the canvas as
// drawn now (EncoreBuilder.jsx). The report is one line per slot; FAIL (--check) when a slot the canvas
// draws fell back to the declared aspect.
//
//   node scripts/photo-aspect.mjs --theme Pop,Retro --layout 1,2,3,4 --width 1440,768,390 --check
//
//   --theme   Retro | Lime | Grunge | Editorial | Pop   (default: all five)
//   --layout  1..4 (Retro also 5 and 6)                  (default 1,2,3,4)
//   --width   1440 (Desktop tab) | 768 (Tablet tab) | 390 (Mobile tab); the window stays 1440  (default 1440,768,390)
//   --cat     only these sections
//   --check   exit 1 on a FALLBACK of a slot that is drawn
// BASE= names the served build (default http://localhost:5173). Last stdout line: `photo-aspect: PASS` or `FAIL`.
import puppeteer from 'puppeteer-core'
import { headlessShell } from './headless-shell.mjs'

const args = process.argv.slice(2)
const opt = (name, dflt) => { const i = args.indexOf(`--${name}`); return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : dflt }
const list = (v) => String(v).split(',').map((x) => x.trim()).filter(Boolean)
const themes = list(opt('theme', 'Retro,Lime,Grunge,Editorial,Pop'))
const layouts = list(opt('layout', '1,2,3,4')).map(Number)
const widths = list(opt('width', '1440,768,390')).map(Number)
const onlyCats = opt('cat') ? list(opt('cat')) : null
const check = args.includes('--check')
const base = process.env.BASE || 'http://localhost:5173'
const wait = (ms) => new Promise((r) => setTimeout(r, ms))
const TAB = { 1440: 'Desktop', 768: 'Tablet', 390: 'Mobile' }

function pageHelpers() {
  window.__fh = () => {
    const root = document.getElementById('root')
    const key = Object.keys(root).find((k) => k.startsWith('__reactContainer$'))
    const stack = [root[key].stateNode.current]
    while (stack.length) {
      const f = stack.pop()
      for (let h = f.memoizedState; h && typeof h === 'object' && 'next' in h; h = h.next) {
        const v = h.memoizedState
        if (v && typeof v === 'object' && Array.isArray(v.sections) && 'removed' in v) return { st: v, set: (fn) => h.queue.dispatch(fn) }
      }
      if (f.sibling) stack.push(f.sibling)
      if (f.child) stack.push(f.child)
    }
    return null
  }
  window.__measure = async (themeName, only) => {
    const { st } = window.__fh()
    const mod = await import('/src/builder/EncoreBuilder.jsx')
    const out = []
    for (const sec of st.sections) {
      if (only && !only.includes(sec.cat)) continue
      const root = document.querySelector(`[data-sid="${sec.id}"]`)?.firstElementChild
      const seen = new Set()
      for (const slot of mod.photoSlots(sec, themeName)) {
        if (seen.has(slot.k)) continue
        seen.add(slot.k)
        const got = mod.photoAspectOf(root, slot.k, slot.aspect)
        const nodes = [...root.querySelectorAll(`[data-photo="${slot.k}"], [data-photo^="${slot.k}:"]`)]
        out.push({ cat: sec.cat, k: slot.k, declared: slot.aspect, got, fallback: got === slot.aspect, drawn: nodes.length })
      }
    }
    return out
  }
}

const browser = await puppeteer.launch({ executablePath: headlessShell(), headless: 'shell' })
const byText = async (page, text, scope = 'button') => {
  for (const h of await page.$$(scope)) if ((await h.evaluate((el) => el.textContent.trim())).startsWith(text)) return h
  throw new Error(`no ${scope} "${text}"`)
}
async function openEditor(theme, layout) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.evaluateOnNewDocument(pageHelpers)
  await page.goto(base, { waitUntil: 'load' })
  await (await page.waitForSelector(`button[aria-label="${theme}"][aria-pressed]`)).click()
  await (await page.waitForSelector(`button[aria-label^="Open the editor with the ${theme} template"]`)).click()
  await page.waitForSelector('[role=dialog] button[aria-pressed]')
  const cards = await page.$$('[role=dialog] button[aria-pressed]')
  const extra = layout > cards.length
  if (extra && !(theme === 'Retro' && layout <= 6)) throw new Error(`${theme}: no layout ${layout}`)
  await cards[extra ? 0 : layout - 1].click()
  await (await byText(page, 'Use this header')).click()
  await wait(500)
  if (extra) {
    await page.evaluate((arch) => { const { set } = window.__fh(); set((s) => ({ ...s, sections: s.sections.map((x) => (x.cat === 'header' ? { ...x, arch } : x)) })) }, layout - 1)
    await wait(500)
  }
  return page
}
const setDevice = async (page, width) => {
  await page.waitForSelector('[role=tab]')
  let done = false
  for (const t of await page.$$('[role=tab]')) if ((await t.evaluate((e) => e.textContent.trim())) === TAB[width]) { await t.click(); done = true }
  if (!done) throw new Error(`no ${TAB[width]} tab`)
  await wait(700)
}

const ratio = (a) => (a ? (a[0] / a[1]).toFixed(2) : '-')
let bad = 0
for (const theme of themes) for (const layout of layouts) {
  if (layout > 4 && theme !== 'Retro') continue
  const page = await openEditor(theme, layout)
  for (const width of widths) {
    await setDevice(page, width)
    const rows = await page.evaluate((t, o) => window.__measure(t, o), theme, onlyCats)
    for (const r of rows) {
      const tag = r.fallback ? (r.drawn ? 'FALLBACK' : 'not drawn') : 'ok'
      if (r.fallback && r.drawn) bad++
      console.log(`${theme} L${layout} ${String(width).padStart(4)}  ${r.cat}.${r.k}`.padEnd(40), `declared ${ratio(r.declared)}  frame ${ratio(r.got)}  ${tag}`)
    }
  }
  await page.close()
}
await browser.close()
console.log(bad ? `photo-aspect: FAIL (${bad})` : 'photo-aspect: PASS')
if (check && bad) process.exit(1)
