// The proof for the panel field -> canvas box (plans/focus-box-qa-fixes.md, JP-165): the builder
// walked from the template picker to the editor under one template and layout, then every control of
// every section's panel clicked with a real mouse, and the blue box the builder draws read back.
// Needs `npm run dev` (or any served build): BASE= names it. Add or edit this file *before* starting
// the dev server, or run against a second port, since a file landing in scripts/ reloads Vite and a
// probe running then reads empty renders. Run sequentially, or in at most three processes: the panel
// of a heavy section (the map) mounts late under load.
//
//   node scripts/focus-probe.mjs --theme Retro --layout 1 --width 1440,768 --check
//   node scripts/focus-probe.mjs --theme Pop,Lime --layout 1,2 --cat header,bio --prime --check
//   OUT=/tmp/fp BASE=http://localhost:5175 node scripts/focus-probe.mjs --theme Grunge --layout 3 --prime
//
// Flags (comma lists run every combination, each in a fresh editor):
//   --theme    Retro | Lime | Grunge | Editorial | Pop        (default Retro)
//   --layout   1..4 (Retro also 5 and 6: the header alone, on page 1)  (default 1)
//   --width    1440 (the Desktop tab) | 768 (the Tablet tab) | 390 (the Mobile tab)  (default 1440)
//              The window stays 1440 wide in all three (at 820 or under the editor is the phone chrome).
//   --cat      only these sections (default: the whole page)
//   --prime    before a section's panel is walked, click its copy on the canvas until the inline
//              editor opens, then press Escape: the "most recent field clicked" is a canvas one (the
//              JP-165 report). Without it only panel fields are focused.
//   --check    exit 1 on any failing verdict
//
// Per control it records one of
//   ok               a box that covers the field's own copy, or no box on a control that has none
//   STALE            the box is the previous control's box and this field's copy is not what it covers
//   WRONG-NODE       a box that covers text not holding the field's copy (its first 12 characters,
//                    whitespace and case ignored; a clamp's `…` is let through)
//   BOX-ON-NONTEXT   a box on a select, switch or radio, which carry no copy
//   FOCUSF-OTHER-SECTION  the builder's focus belongs to another section
//   NO-PANEL         the section's panel never mounted a labelled field (a harness fault, not a pass)
//   shared line      a STALE the page cannot tell apart: two fields printed in one line (LEDGER below)
// What `ok` means: the box covered the field's copy. A box on the wrong one of two nodes that print
// the same words, or on a paragraph that merely holds the words, passes (JP-146's class has its own
// ranking in `findFieldNode`). A section the canvas gives no editable copy (nothing opens on a click)
// is *unprimed*: listed, not failing.
//
// A positive control runs first: the header's Title must draw a box, or the harness itself is broken
// (exit 2). One JSONL row per control goes to $OUT/focus-probe/<theme>-L<n>-<width>[-prime].jsonl and
// the last stdout line is `focus-probe: PASS` or `FAIL`.
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { headlessShell } from './headless-shell.mjs'

const args = process.argv.slice(2)
const flag = (name) => args.includes(`--${name}`)
const opt = (name, dflt) => { const i = args.indexOf(`--${name}`); return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : dflt }
const list = (v) => String(v).split(',').map((x) => x.trim()).filter(Boolean)
const themes = list(opt('theme', 'Retro'))
const layouts = list(opt('layout', '1')).map(Number)
const widths = list(opt('width', '1440')).map(Number)
const onlyCats = opt('cat') ? list(opt('cat')) : null
const prime = flag('prime')
const check = flag('check')
const base = process.env.BASE || 'http://localhost:5173'
const outDir = path.join(process.env.OUT || path.join(os.tmpdir(), 'encore-focus-probe'), 'focus-probe')
fs.mkdirSync(outDir, { recursive: true })
const wait = (ms) => new Promise((r) => setTimeout(r, ms))
const sq = (v) => String(v ?? '').replace(/\s+/g, '').toLowerCase()

// Two fields the page prints in one line, so a box on the line is each one's and reads as "the
// previous box": a row is a call, not a way to quiet the probe. One row per section and label.
const LEDGER = [
  { cat: 'media', label: /^Counter (count|total) label$/, why: "layout 3's counter prints `5 Featured / 5 Max` as one line (notes/media.md)" },
  { cat: 'bio', label: /^(Kicker|Location)$/, why: 'the role line `DJ · Live Act · Manchester, UK` prints both (the identity fields, CLAUDE.md)' },
]
const ledgered = (cat, label) => LEDGER.find((l) => l.cat === cat && l.label.test(label || ''))

// --- in the page ------------------------------------------------------------
function pageHelpers() {
  // The builder's `st` and focus state off the fiber tree: the hooks whose values have the shapes
  // `{ sections, removed }` and `{ sid, key, text, photo }`. `set` is the raw setter of `st`.
  window.__fh = () => {
    const root = document.getElementById('root')
    const key = Object.keys(root).find((k) => k.startsWith('__reactContainer$'))
    const stack = [root[key].stateNode.current]
    const out = {}
    while (stack.length) {
      const f = stack.pop()
      for (let h = f.memoizedState; h && typeof h === 'object' && 'next' in h; h = h.next) {
        const v = h.memoizedState
        if (v && typeof v === 'object' && Array.isArray(v.sections) && 'removed' in v) { out.st = v; out.set = (fn) => h.queue.dispatch(fn) }
        if (v && typeof v === 'object' && 'sid' in v && 'key' in v && 'text' in v && 'photo' in v) out.focusF = v
      }
      if (f.sibling) stack.push(f.sibling)
      if (f.child) stack.push(f.child)
    }
    return out
  }
  // The open panel's controls, in order, tagged `data-fp`. The top bar's device tabs are not the
  // panel's (clicking them moves the whole canvas under the walk), and a file input is a photo's:
  // photo-probe's. `labelled` counts the controls under a field's label.
  window.__controls = () => {
    const els = [...document.querySelectorAll('input, textarea, select, button[role=combobox], button[role=switch], button[role=radio]')]
      .filter((e) => !e.closest('[data-sid]') && !e.closest('[role=dialog]') && !e.closest('[data-inline-edit]') && !e.closest('[role=tablist]') && e.type !== 'file' && e.offsetParent !== null)
    return els.map((e, i) => {
      let w = e
      while (w && !(w.firstElementChild && w.firstElementChild.tagName === 'LABEL')) w = w.parentElement
      e.setAttribute('data-fp', i)
      return { i, label: w?.firstElementChild?.textContent ?? null, tag: e.tagName, type: e.type || e.getAttribute('role'), value: (e.value ?? '').slice(0, 80) }
    })
  }
  // The section's focus box, what it covers, and the builder's focus state.
  window.__box = (sid) => {
    const wrap = document.querySelector(`[data-sid="${sid}"]`)
    const f = window.__fh().focusF
    const focus = f ? { sid: f.sid, key: f.key, text: f.text } : null
    const boxes = wrap ? [...wrap.children].filter((e) => e.style.zIndex === '21' && e.style.border.includes('rgb(43, 107, 228)') && e.style.pointerEvents === 'none') : []
    if (!boxes.length) return { box: null, focus }
    const r = boxes[0].getBoundingClientRect()
    const pad = 5
    const inner = { l: r.left + pad, t: r.top + pad, r: r.right - pad, b: r.bottom - pad }
    const texts = []
    const w = document.createTreeWalker(wrap.firstElementChild, NodeFilter.SHOW_TEXT)
    for (let n = w.nextNode(); n; n = w.nextNode()) {
      if (!n.data.trim()) continue
      const range = document.createRange(); range.selectNodeContents(n)
      const q = range.getBoundingClientRect()
      if (!q.width) continue
      const cx = q.left + q.width / 2, cy = q.top + q.height / 2
      if (cx >= inner.l - 6 && cx <= inner.r + 6 && cy >= inner.t - 6 && cy <= inner.b + 6) texts.push(n.data.trim())
    }
    return { box: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)], covers: texts.join(' ').slice(0, 160), focus }
  }
}

// --- in Node ----------------------------------------------------------------
const browser = await puppeteer.launch({ executablePath: headlessShell(), headless: 'shell' })

async function openEditor(theme, layout, width) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.evaluateOnNewDocument(pageHelpers)
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(base, { waitUntil: 'load' })
  await (await page.waitForSelector(`button[aria-label="${theme}"][aria-pressed]`)).click()
  await (await page.waitForSelector(`button[aria-label^="Open the editor with the ${theme} template"]`)).click()
  await page.waitForSelector('[role=dialog] button[aria-pressed]')
  const cards = await page.$$('[role=dialog] button[aria-pressed]')
  // Retro's layouts 5 and 6 are reached from the layout picker on card 1's page; only the header's `arch` moves.
  const extra = layout > cards.length
  if (extra && !(theme === 'Retro' && layout <= 6)) throw new Error(`${theme}: the modal offers ${cards.length} cards, no layout ${layout}`)
  await cards[extra ? 0 : layout - 1].click()
  for (const h of await page.$$('button')) if ((await h.evaluate((el) => el.textContent.trim())).startsWith('Use this header')) { await h.click(); break }
  await wait(500)
  if (extra) {
    await page.evaluate((arch) => { const { set } = window.__fh(); set((s) => ({ ...s, sections: s.sections.map((x) => (x.cat === 'header' ? { ...x, arch } : x)) })) }, layout - 1)
    await wait(500)
  }
  if (width !== 1440) {
    if (width !== 768 && width !== 390) throw new Error('--width is 1440, 768 or 390')
    const name = width === 768 ? 'Tablet' : 'Mobile'
    let done = false
    for (const t of await page.$$('[role=tab]')) if ((await t.evaluate((e) => e.textContent.trim())) === name) { await t.click(); done = true }
    if (!done) throw new Error(`no ${name} tab`)
    await wait(700)
  }
  return { page, errors }
}

// A panel is mounted once its controls stop changing: the count is the same two reads running, and
// at least one stands under a field's label. A fixed wait passed sections whose panel had not mounted.
async function panelControls(page) {
  let last = -1, same = 0
  for (let i = 0; i < 60; i++) {
    const c = await page.evaluate(() => window.__controls())
    const n = c.filter((x) => x.label).length
    same = n === last ? same + 1 : 0
    last = n
    if (n > 0 && same >= 2) return c
    await wait(150)
  }
  return []
}

// Click copy on the section's canvas until the inline editor opens, then Escape (which reverts and closes it).
async function primeCanvas(page, sid) {
  for (let i = 0; i < 40; i++) {
    const t = await page.evaluate((sid, i) => {
      const root = document.querySelector(`[data-sid="${sid}"]`)?.firstElementChild
      if (!root) return { gone: true }
      const nodes = []
      const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
      for (let n = w.nextNode(); n; n = w.nextNode()) if (n.data.trim().length > 1 && !n.parentElement.closest('svg') && !n.parentElement.closest('textarea')) nodes.push(n)
      const n = nodes[i]
      if (!n) return { gone: true }
      n.parentElement.scrollIntoView({ block: 'center', behavior: 'instant' })
      const range = document.createRange(); range.selectNodeContents(n)
      const r = [...range.getClientRects()].find((q) => q.width > 2 && q.height > 2)
      if (!r) return { skip: true }
      const x = r.left + r.width / 2, y = r.top + r.height / 2
      if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) return { skip: true }
      const top = document.elementsFromPoint(x, y)[0]
      if (!top || !(top === n.parentElement || n.parentElement.contains(top) || top.contains(n.parentElement))) return { skip: true }
      return { x, y, text: n.data.trim().slice(0, 40) }
    }, sid, i)
    if (t.gone) return null
    if (t.skip) continue
    await page.mouse.click(t.x, t.y)
    await wait(250)
    if (await page.evaluate(() => !!document.querySelector('textarea[data-inline-edit]'))) {
      await page.keyboard.press('Escape')
      await wait(250)
      const left = await page.evaluate(() => (document.querySelector('textarea[data-inline-edit]') ? 'still-open' : window.__fh().focusF ? 'focusF-left' : 'clean'))
      return { text: t.text, afterEscape: left }
    }
  }
  return null
}

const verdictOf = (c, r, prev, cat) => {
  const isText = (c.tag === 'INPUT' && c.type !== 'checkbox') || c.tag === 'TEXTAREA'
  if (r.focus && r.focus.sid !== cat.id) return 'FOCUSF-OTHER-SECTION'
  if (!r.box) return 'ok'
  if (!isText) return 'BOX-ON-NONTEXT'
  const first = sq((c.value || '').split('\n')[0]).slice(0, 12)
  const covers = sq(r.covers)
  const wrong = !!first && !covers.includes(first) && !covers.includes('…')
  const stale = prev && JSON.stringify(prev.box) === JSON.stringify(r.box) && prev.label !== c.label
  if (wrong || stale) return ledgered(cat.cat, c.label) && !wrong ? 'shared line' : stale && !wrong ? 'STALE' : stale ? 'STALE+WRONG-NODE' : 'WRONG-NODE'
  return 'ok'
}

async function runCombo(theme, layout, width) {
  const tag = `${theme}-L${layout}-${width}${prime ? '-prime' : ''}`
  const sink = path.join(outDir, `${tag}.jsonl`)
  fs.writeFileSync(sink, '')
  const emit = (row) => fs.appendFileSync(sink, JSON.stringify(row) + '\n')
  const res = { tag, fail: 0, shared: 0, controls: 0, unprimed: [], noPanel: [], errors: [] }
  const { page, errors } = await openEditor(theme, layout, width)
  try {
    const secs = await page.evaluate(() => window.__fh().st.sections.map((s) => ({ id: s.id, cat: s.cat })))
    for (const sec of secs) {
      if (onlyCats && !onlyCats.includes(sec.cat)) continue
      await page.evaluate((id) => { window.__fh().set((s) => ({ ...s, selectedId: id })) }, sec.id)
      let primed = null
      if (prime) {
        await wait(250)
        primed = await primeCanvas(page, sec.id)
        if (!primed) res.unprimed.push(sec.cat)
        else if (primed.afterEscape !== 'clean') { res.fail++; emit({ tag, cat: sec.cat, verdict: `NOT-CLEAN (${primed.afterEscape})`, primed }) }
      }
      const ctrls = await panelControls(page)
      if (!ctrls.some((c) => c.label)) { res.fail++; res.noPanel.push(sec.cat); emit({ tag, cat: sec.cat, verdict: 'NO-PANEL' }); continue }
      let prev = null
      for (const c of ctrls) {
        const h = await page.$(`[data-fp="${c.i}"]`)
        if (!h) continue
        try { await h.evaluate((e) => e.scrollIntoView({ block: 'center' })); await h.click() } catch { await h.evaluate((e) => e.focus()) }
        await wait(300)
        const r = await page.evaluate((sid) => window.__box(sid), sec.id)
        const verdict = verdictOf(c, r, prev, sec)
        res.controls++
        if (verdict === 'shared line') res.shared++
        else if (verdict !== 'ok') res.fail++
        emit({ tag, cat: sec.cat, label: c.label, ctrl: `${c.tag}/${c.type}`, value: c.value, verdict, box: r.box, covers: r.covers, fkey: r.focus?.key, primed })
        prev = { box: r.box, label: c.label }
      }
    }
  } catch (e) { res.fail++; res.errors.push(String(e.message).slice(0, 200)) }
  if (errors.length) res.errors.push(...errors.slice(0, 3))
  await page.close()
  return res
}

// The positive control: the header's Title, focused in the panel, must draw a box.
async function positiveControl() {
  const { page } = await openEditor(themes[0], layouts[0], widths[0])
  await page.evaluate(() => { const { st, set } = window.__fh(); set((s) => ({ ...s, selectedId: st.sections.find((x) => x.cat === 'header').id })) })
  const ctrls = await panelControls(page)
  const title = ctrls.find((c) => c.label === 'Title')
  let ok = false
  if (title) {
    const h = await page.$(`[data-fp="${title.i}"]`)
    await h.click(); await wait(300)
    const sid = await page.evaluate(() => window.__fh().st.sections.find((x) => x.cat === 'header').id)
    ok = !!(await page.evaluate((sid) => window.__box(sid), sid)).box
  }
  await page.close()
  return ok
}

let fails = 0
if (!(await positiveControl())) { console.error('focus-probe: the positive control failed: the header Title drew no box. The harness is broken.'); await browser.close(); process.exit(2) }
for (const theme of themes) for (const layout of layouts) for (const width of widths) {
  let r
  try { r = await runCombo(theme, layout, width) } catch (e) { r = { tag: `${theme}-L${layout}-${width}`, fail: 1, shared: 0, controls: 0, unprimed: [], noPanel: [], errors: [String(e.message)] } }
  fails += r.fail
  console.log(`${r.tag}: ${r.controls} controls, ${r.fail} failing, ${r.shared} shared-line${r.unprimed.length ? `, unprimed: ${r.unprimed.join(',')}` : ''}${r.noPanel.length ? `, NO-PANEL: ${r.noPanel.join(',')}` : ''}${r.errors.length ? `, errors: ${r.errors.join(' | ')}` : ''}`)
}
await browser.close()
console.log(fails ? 'focus-probe: FAIL' : 'focus-probe: PASS')
if (check && fails) process.exit(1)
