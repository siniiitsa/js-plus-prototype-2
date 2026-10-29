// The coverage proof for clicking a photo on the canvas (plans/photo-edit.md, Step 1): the
// builder walked from the template picker to the editor under one template and layout, then
// every `[data-photo]` node of every section clicked with a real mouse, what opened recorded,
// Escape pressed, and — once per photo slot — a fixture PNG pushed through the dialog and
// Applied, to see which key, index or row the write landed on. Needs `npm run dev` (or any
// served build) — BASE= names it. Another section stands selected before each walk, so every click is a
// first click (JP-154). The sibling of inline-probe.mjs, which does the same for text.
//
//   node scripts/photo-probe.mjs --theme Retro --layout 1 --width 1440,768 --check
//   node scripts/photo-probe.mjs --theme Pop,Grunge --layout 1 --cat header,gallery
//   OUT=/tmp/pp BASE=http://localhost:5175 node scripts/photo-probe.mjs --theme Lime --layout 3 --check
//
// Flags (comma lists run every combination, each in a fresh editor):
//   --theme    Retro | Lime | Grunge | Editorial | Pop        (default Retro)
//   --layout   1..4 (Retro also 5 and 6: the header alone, on page 1)  (default 1)
//   --width    1440 (the Desktop tab) | 768 (the Tablet tab)  (default 1440)
//              The window stays 1440 wide in both: at 820 or under the editor
//              turns into the phone chrome, where canvas photo editing is off.
//   --cat      only these sections (default: the whole page)
//   --blank    empty every photo slot first (single photos `null`, lists `[]`, track rows rewritten as a title and no
//              picture), so the
//              file-picker path and the append write are the ones walked
//   --every    take the write test (upload + Apply) on every node, not once per photo slot
//   --drop     drop the fixture file on each node instead of clicking it (a DragEvent with a File, at the same
//              aimed points). The drag must be cancelled over the node (else a real browser never sends the
//              drop), the crop dialog must open on the dropped picture ("Frame your photo"), Escape writes
//              nothing, and Apply writes only that slot, as a click's upload does. A text drag must not be
//              cancelled. Filled and (with --blank) empty slots alike: a drop never opens the file picker.
//   --check    exit 1 on any WRONG, NOT-RESTORED, MISSING or UNLEDGERED
//
// The universe is `photoSlots(sec, theme, true)`: every photo slot the layout reads, the
// ledger's (PHOTO_OFF) too with its reason. Per `[data-photo]` node it records one of
//   hit        a click opened the editor (a filled slot: the crop dialog on the slot's own
//              picture; an empty one: the file picker), Escape put `c` and the DOM back, and
//              — the first node of each slot — Apply wrote only that slot's key / index / row
//   WRONG      the click opened a slot the mark does not name, opened the editor on another
//              picture than the panel shows, opened anything for a mark the app excludes
//              (PHOTO_OFF, or a field the layout does not read), or the write touched
//              anything but its own slot
//   NOT-RESTORED  Escape left the dialog open, or `c` / the section's HTML differs
//   blocked    no point of the node's visible area opens it (text, a control or a solid
//              ground is on top everywhere the stack reaches it)
//   copy       the points tried all opened a text box: the node is under copy (not failing)
//   hidden     no point of the node is reachable (clipped, covered by another photo or
//              another section) — not clicked
// and, once the section is walked, every slot of the universe that no click hit:
//   MISSING    some node paints it and no click opened it. Fails --check.
//   not drawn  nothing paints it at this width. Fails --check as UNLEDGERED only if no width
//              draws it (run --width 1440,768) and PHOTO_OFF does not name it.
//   appended   a slot past the end of its list: the write is an append (the panel's Add tile).
//              Reported, not failing.
//   off        the slot is in PHOTO_OFF; its reason is printed. A click on its node opens nothing.
//   partial    a node some of whose visible area (a 12 x 12 grid, the app's own `photoFieldAt` asked at each
//              point) does not open it, with the first elements that stop it. Reported, not failing: the
//              question is whether the part that is lost is decoration or the picture.
//   dead spot  a node some slot's other node opens that no point of its own opens. Not failing.
// A positive control runs first: a click on a header photo must open the header's own slot and
// write it, or the harness itself is broken (exit 2).
//
// One JSONL row per click goes to $OUT/photo-probe/<theme>-L<n>-<width>.jsonl as it is taken,
// and the last stdout line is `photo-probe: PASS` or `photo-probe: FAIL`.
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import zlib from 'node:zlib'
import { headlessShell } from './headless-shell.mjs'

const args = process.argv.slice(2)
const flag = (name) => args.includes(`--${name}`)
const opt = (name, dflt) => { const i = args.indexOf(`--${name}`); return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : dflt }
const list = (v) => String(v).split(',').map((x) => x.trim()).filter(Boolean)
const themes = list(opt('theme', 'Retro'))
const layouts = list(opt('layout', '1')).map(Number)
const widths = list(opt('width', '1440')).map(Number)
const onlyCats = opt('cat') ? list(opt('cat')) : null
const every = flag('every')
const blank = flag('blank')
const drop = flag('drop')
const check = flag('check')
const base = process.env.BASE || 'http://localhost:5173'
const outRoot = process.env.OUT || path.join(os.tmpdir(), 'encore-photo-probe')
const outDir = path.join(outRoot, 'photo-probe')
fs.mkdirSync(outDir, { recursive: true })
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

// A 96 x 64 PNG of one colour, written by hand (no image library here): the fixture every
// write test uploads. Small, so the dialog bakes it fast.
function fixturePng(file) {
  const w = 96, h = 64
  const crcTable = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0 })
  const crc = (buf) => { let c = 0xffffffff; for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0 }
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
    const body = Buffer.concat([Buffer.from(type), data])
    const sum = Buffer.alloc(4); sum.writeUInt32BE(crc(body))
    return Buffer.concat([len, body, sum])
  }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 2
  const row = Buffer.concat([Buffer.from([0]), Buffer.concat(Array.from({ length: w }, (_, x) => Buffer.from([200, 40 + x, 120])))])
  const raw = Buffer.concat(Array.from({ length: h }, () => row))
  fs.writeFileSync(file, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]))
}
const FIXTURE = path.join(outRoot, 'fixture.png')
if (!fs.existsSync(FIXTURE)) fixturePng(FIXTURE)

// --- in the page ------------------------------------------------------------
// Defined once per document, before the app loads.
function pageHelpers() {
  // The builder's `st`, off the fiber tree (the memory's recipe): the hook whose
  // value has `sections` and `removed`. `set` is the raw setter.
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
  const rootOf = (sid) => document.querySelector(`[data-sid="${sid}"]`)?.firstElementChild
  window.__root = rootOf
  // A native file picker never opens in the probe: a script-driven `input.click()` on a file input is
  // recorded (and the input tagged, so the probe can hand it a file) instead.
  window.__picks = 0
  const click = HTMLElement.prototype.click
  HTMLElement.prototype.click = function () {
    if (this instanceof HTMLInputElement && this.type === 'file') {
      window.__picks++
      document.querySelectorAll('[data-probe-pick]').forEach((e) => e.removeAttribute('data-probe-pick'))
      this.setAttribute('data-probe-pick', '')
      return
    }
    return click.call(this)
  }
  const fnv = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) } return (h >>> 0).toString(16) + ':' + s.length }
  window.__fnv = fnv
  // A cheap fingerprint of a section's stored content and of what it draws.
  window.__fp = (sid) => {
    const { st } = window.__fh()
    const sec = st.sections.find((x) => x.id === sid)
    return { c: fnv(JSON.stringify(sec.c)), html: fnv(rootOf(sid).innerHTML) }
  }
  // The stored content of every section, to diff after a write: which keys changed where.
  window.__cs = () => JSON.parse(JSON.stringify(window.__fh().st.sections.map((s) => ({ id: s.id, c: s.c }))))
  window.__restore = (sid, c) => { const { set } = window.__fh(); set((s) => ({ ...s, sections: s.sections.map((x) => (x.id === sid ? { ...x, c } : x)) })) }
  const describe = (e) => {
    if (!e) return null
    const cs = getComputedStyle(e)
    return `${e.tagName.toLowerCase()}${e.id ? '#' + e.id : ''}${e.className && typeof e.className === 'string' ? '.' + e.className.split(/\s+/).slice(0, 3).join('.') : ''}[${cs.position}${cs.pointerEvents === 'none' ? ' pe:none' : ''}]`
  }
  // `node`'s rectangle as the page shows it: clipped by every ancestor up to the section root that
  // clips (an arch, a rounded well) and by the window.
  const visibleRect = (node, root) => {
    const r = node.getBoundingClientRect()
    let left = Math.max(r.left, 0), top = Math.max(r.top, 0), right = Math.min(r.right, innerWidth), bottom = Math.min(r.bottom, innerHeight)
    for (let el = node.parentElement; el && el !== root.parentElement; el = el.parentElement) {
      const cs = getComputedStyle(el)
      if (cs.overflowX === 'visible' && cs.overflowY === 'visible') continue
      const q = el.getBoundingClientRect()
      left = Math.max(left, q.left); top = Math.max(top, q.top); right = Math.min(right, q.right); bottom = Math.min(bottom, q.bottom)
    }
    return right - left > 1 && bottom - top > 1 ? { left, top, right, bottom } : null
  }
  // The photo nodes of a section: [{ i, mark }], in document order.
  window.__photos = (sid) => [...rootOf(sid).querySelectorAll('[data-photo]')].map((n, i) => ({ i, mark: n.getAttribute('data-photo') }))
  // Where to click node `i`, after it is scrolled to the middle: a grid of points over its visible rect,
  // centre first, keeping those where the node is in the stack and no other photo lies above it.
  window.__aimPhoto = (sid, i, n = 24) => {
    const root = rootOf(sid)
    const node = root.querySelectorAll('[data-photo]')[i]
    if (!node) return { gone: true }
    node.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' })
    const r = visibleRect(node, root)
    if (!r) return { hidden: 'no visible area' }
    const pts = []
    const cols = 7, rows = 7
    for (let a = 0; a < cols; a++) for (let b = 0; b < rows; b++) {
      pts.push({ x: r.left + (r.right - r.left) * (0.08 + 0.84 * (a / (cols - 1))), y: r.top + (r.bottom - r.top) * (0.08 + 0.84 * (b / (rows - 1))) })
    }
    const mx = (r.left + r.right) / 2, my = (r.top + r.bottom) / 2
    pts.unshift({ x: mx, y: my })
    pts.sort((p, q) => Math.hypot(p.x - mx, p.y - my) - Math.hypot(q.x - mx, q.y - my))
    const ok = []
    let firstBlocker = null, under = null
    for (const p of pts) {
      const all = document.elementsFromPoint(p.x, p.y)
      const stack = all.filter((e) => root.contains(e))
      const at = stack.findIndex((e) => e === node || node.contains(e))
      if (at < 0) { if (!firstBlocker) firstBlocker = describe(all[0]); continue }
      const above = stack.slice(0, at)
      const photoAbove = above.find((e) => e.closest('[data-photo]') && e.closest('[data-photo]') !== node)
      if (photoAbove) { under = photoAbove.closest('[data-photo]').getAttribute('data-photo'); continue }
      ok.push({ x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10, over: above.length ? describe(above[0]) : null })
      if (ok.length >= 6) break
    }
    if (!ok.length) return { hidden: under ? `under photo ${under}` : 'covered', over: firstBlocker }
    return { pts: ok, mark: node.getAttribute('data-photo') }
  }
  // How much of node `i` a click reaches: the app's own `photoFieldAt` asked at a grid of points over its
  // visible area (no mouse), counting the points where the node is in the stack with no other photo above it.
  // What stops the rest is named by the first element above the node that blocks one (a control, an svg, text,
  // a solid ground), which is the rule `blocksPhoto` applies.
  window.__cover = async (sid, i, themeName) => {
    const { st } = window.__fh()
    const sec = st.sections.find((x) => x.id === sid)
    const wrap = document.querySelector(`[data-sid="${sid}"]`)
    const root = wrap.firstElementChild
    const node = root.querySelectorAll('[data-photo]')[i]
    const mod = await import('/src/builder/EncoreBuilder.jsx')
    node.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' })
    const r = visibleRect(node, root)
    if (!r) return null
    const mark = node.getAttribute('data-photo')
    let total = 0, open = 0
    const by = {}
    const N = 12
    for (let a = 0; a < N; a++) for (let b = 0; b < N; b++) {
      const x = r.left + (r.right - r.left) * ((a + 0.5) / N), y = r.top + (r.bottom - r.top) * ((b + 0.5) / N)
      const stack = document.elementsFromPoint(x, y).filter((e) => root.contains(e))
      const at = stack.findIndex((e) => e === node || node.contains(e))
      if (at < 0) continue
      const above = stack.slice(0, at)
      if (above.some((e) => e.closest('[data-photo]') && e.closest('[data-photo]') !== node)) continue
      total++
      const hit = mod.photoFieldAt(sec, wrap, { x, y }, themeName)
      if (hit && hit.mark === mark) { open++; continue }
      const why = hit ? `opens ${hit.mark}` : (above.find((e) => e.matches('a,button,input,select,textarea,label,summary,[role=button],[role=tab],[role=link]') || e.closest('svg')
        || [...e.childNodes].some((n) => n.nodeType === 3 && n.data.trim()) || getComputedStyle(e).backgroundImage.includes('url(')
        || parseFloat((getComputedStyle(e).backgroundColor.match(/rgba?\(([^)]+)\)/)?.[1].split(/[ ,/]+/)[3]) ?? (getComputedStyle(e).backgroundColor === 'rgba(0, 0, 0, 0)' ? 0 : 1)) >= 0.9) ?? null)
      const key = hit ? `opens ${hit.mark}` : why ? describe(why) : 'text/other'
      by[key] = (by[key] ?? 0) + 1
    }
    return { mark, total, open, by }
  }
  // The universe, as the builder reads it now (what `photoSlots` lists).
  window.__slots = async (sid, themeName) => {
    const { st } = window.__fh()
    const sec = st.sections.find((x) => x.id === sid)
    const mod = await import('/src/builder/EncoreBuilder.jsx')
    return mod.photoSlots(sec, themeName, true).map((s) => ({ id: s.id, k: s.k, mark: s.mark, idx: s.idx ?? null, row: s.row ?? null, empty: s.empty, value: s.value ?? null, off: s.off ?? null }))
  }
  // The crop dialog, if one is up: its title and the picture it frames.
  window.__dialog = () => {
    const d = [...document.querySelectorAll('[role=dialog]')].find((e) => [...e.querySelectorAll('button')].some((b) => b.textContent.trim().startsWith('Apply')))
    if (!d) return null
    const img = d.querySelector('img')
    return { title: d.querySelector('h2')?.textContent.trim() ?? '', src: img ? img.getAttribute('src') : null, hasImg: !!img }
  }
  window.__abs = (u) => { try { return new URL(u, location.href).href } catch { return u } }
  window.__textBox = () => !!document.querySelector('textarea[data-inline-edit]')
  window.__clickText = (text) => { const b = [...document.querySelectorAll('[role=dialog] button')].find((x) => x.textContent.trim().startsWith(text)); if (b) b.click(); return !!b }
}

// --- in Node ----------------------------------------------------------------
const browser = await puppeteer.launch({ executablePath: headlessShell(), headless: 'shell' })

const byText = async (page, text, scope = 'button') => {
  for (const h of await page.$$(scope)) if ((await h.evaluate((el) => el.textContent.trim())).startsWith(text)) return h
  throw new Error(`no ${scope} "${text}"`)
}

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
  // The modal stops at four cards (`setupHeaderCount`); Retro's layouts 5 and 6 are reached as a user
  // reaches them, from the sidebar's layout picker, on the page card 1 laid out (see inline-probe.mjs).
  const extra = layout > cards.length
  if (extra && !(theme === 'Retro' && layout <= 6)) throw new Error(`${theme}: the modal offers ${cards.length} cards, no layout ${layout}`)
  await cards[extra ? 0 : layout - 1].click()
  await (await byText(page, 'Use this header')).click()
  await wait(500)
  if (extra) {
    await page.evaluate((arch) => { const { set } = window.__fh(); set((s) => ({ ...s, sections: s.sections.map((x) => (x.cat === 'header' ? { ...x, arch } : x)) })) }, layout - 1)
    await wait(500)
  }
  if (width !== 1440) {
    if (width !== 768) throw new Error('--width is 1440 or 768')
    await page.waitForSelector('[role=tab]')
    let done = false
    for (const t of await page.$$('[role=tab]')) if ((await t.evaluate((e) => e.textContent.trim())) === 'Tablet') { await t.click(); done = true }
    if (!done) throw new Error('no Tablet tab')
    await wait(700)
  }
  return { page, errors }
}

// Which keys of a section's content differ between two snapshots.
const diffKeys = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((k) => JSON.stringify(a[k]) !== JSON.stringify(b[k]))

async function runCombo(theme, layout, width) {
  const tag = `${theme}-L${layout}-${width}${blank ? '-blank' : ''}${drop ? '-drop' : ''}`
  const sink = path.join(outDir, `${tag}.jsonl`)
  fs.writeFileSync(sink, '')
  const emit = (row) => fs.appendFileSync(sink, JSON.stringify(row) + '\n')
  const { page, errors } = await openEditor(theme, layout, width)
  const res = { tag, theme, layout, width, hits: new Map(), wrong: [], nr: [], missing: [], notDrawn: [], dead: [], off: [], appended: [], partial: [], blocked: 0, hidden: 0, copy: 0, clicks: 0 }
  try {
    const info = await page.evaluate(async () => {
      const { st } = window.__fh()
      const data = await import('/src/builder/data.js')
      const mod = await import('/src/builder/EncoreBuilder.jsx')
      return { theme: data.THEMES[st.theme].name, sections: st.sections.map((s) => ({ id: s.id, cat: s.cat, arch: s.arch })), has: typeof mod.photoSlots }
    })
    if (info.has !== 'function') throw new Error('EncoreBuilder.jsx exports no photoSlots')
    const select = (sid) => page.evaluate((sid) => { const { set } = window.__fh(); set((s) => ({ ...s, selectedId: sid })) }, sid)
    // Every click and drop is the first one on its section (JP-154): another section stands selected.
    let cur = null // the section being walked: re-armed before every click and drop, so none is a second click
    // Selecting a section scrolls the canvas to it; the probe aimed at points on the section it is walking, so the scroll is put back.
    const selectOther = async (sec) => {
      cur = sec
      const other = (info.sections.find((s) => s.id !== sec.id && s.cat === (sec.cat === 'header' ? 'footer' : 'header')) ?? info.sections.find((s) => s.id !== sec.id)).id
      const sc = await page.evaluate(() => { const e = document.querySelector('[data-sid]'); let n = e; while (n && !(n.scrollHeight > n.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(n).overflowY))) n = n.parentElement; return n ? n.scrollTop : null })
      await select(other)
      await wait(450)
      if (sc != null) await page.evaluate((top) => { let n = document.querySelector('[data-sid]'); while (n && !(n.scrollHeight > n.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(n).overflowY))) n = n.parentElement; if (n) n.scrollTop = top }, sc)
      await wait(60)
    }

    if (blank) {
      for (const sec of info.sections) {
        const slots = await page.evaluate((sid, t) => window.__slots(sid, t), sec.id, info.theme)
        const c = {}
        for (const s of slots) if (s.idx != null) c[s.k] = []; else if (s.row == null) c[s.k] = null
        // Track art: the rows are the slots' (a seeded list's rows are not exported), each a plain title and no picture.
        const rows = slots.filter((s) => s.row != null)
        if (rows.length) c[rows[0].k] = rows.map((s) => ({ title: `Track ${s.row + 1}`, sub: 'Kai Mercer', image: null }))
        await page.evaluate((sid, c) => { const { set } = window.__fh(); set((st) => ({ ...st, sections: st.sections.map((x) => (x.id === sid ? { ...x, c: { ...x.c, ...c } } : x)) })) }, sec.id, c)
      }
      await wait(400)
    }

    // Close whatever a click left open (the crop dialog, a text box), then wait for it to go.
    async function settle() {
      for (let i = 0; i < 3; i++) {
        const open = await page.evaluate(() => !!window.__dialog() || window.__textBox())
        if (!open) return true
        await page.keyboard.press('Escape'); await wait(160)
      }
      return !(await page.evaluate(() => !!window.__dialog() || window.__textBox()))
    }

    // What a click at `pt` opens: the crop dialog (filled slot), the file picker (empty), a text box, or nothing.
    async function clickAt(pt) {
      const picks0 = await page.evaluate(() => window.__picks)
      if (cur) { await selectOther(cur); await wait(60) }
      await page.mouse.click(pt.x, pt.y)
      await wait(160)
      return page.evaluate((p0) => ({ dialog: window.__dialog(), picked: window.__picks > p0, text: window.__textBox() }), picks0)
    }

    // What a file dropped at `pt` does: the events a browser sends for a file dragged over the page, the drop
    // only if the dragover was cancelled with a drop effect. Returns what the dragover said and what opened.
    const FIXTURE_B64 = fs.readFileSync(FIXTURE).toString('base64')
    async function dropAt(pt, kind = 'file') {
      if (cur) { await selectOther(cur); await wait(60) }
      const r = await page.evaluate((pt, b64, kind) => {
        const dt = new DataTransfer()
        // A DataTransfer built by script ignores a write to dropEffect (only a real drag takes one): shadow it.
        let eff = 'none'
        Object.defineProperty(dt, 'dropEffect', { get: () => eff, set: (v) => { eff = v } })
        if (kind === 'file') dt.items.add(new File([Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))], 'drop.png', { type: 'image/png' }))
        else dt.setData('text/plain', 'some words')
        const el = document.elementFromPoint(pt.x, pt.y)
        if (!el) return { gone: true }
        const mk = (type) => new DragEvent(type, { bubbles: true, cancelable: true, clientX: pt.x, clientY: pt.y, dataTransfer: dt })
        el.dispatchEvent(mk('dragenter'))
        const over = mk('dragover')
        el.dispatchEvent(over)
        const allowed = over.defaultPrevented && dt.dropEffect !== 'none'
        if (allowed) el.dispatchEvent(mk('drop'))
        return { cancelled: over.defaultPrevented, effect: dt.dropEffect, allowed }
      }, pt, FIXTURE_B64, kind)
      await wait(300)
      const o = await page.evaluate(() => ({ dialog: window.__dialog(), text: window.__textBox() }))
      return { ...r, ...o, picked: false }
    }

    // The write test: with the editor open on a slot (the dialog up, or the picker's input tagged),
    // push the fixture through, Apply, and read which keys of which sections changed. Then put `c` back.
    async function writeTest(sec, slot, opened) {
      const before = await page.evaluate(() => window.__cs())
      if (opened.drop) {
        // Nothing to upload: the drop framed the fixture already.
      } else if (opened.picked) {
        const input = await page.$('input[data-probe-pick]')
        if (!input) return { error: 'the picker opened but its input is not in the page' }
        await input.uploadFile(FIXTURE)
      } else {
        const input = await page.$('[role=dialog] input[type=file]')
        if (!input) return { error: 'no file input inside the dialog' }
        await input.uploadFile(FIXTURE)
      }
      // The fixture is read, the frame restarts ("Frame your photo"), then Apply.
      let ready = false
      for (let i = 0; i < 25 && !ready; i++) {
        await wait(100)
        ready = await page.evaluate(() => { const d = window.__dialog(); return !!d && d.hasImg && /Frame your photo/.test(d.title) })
      }
      if (!ready) { await settle(); return { error: 'the dialog never showed the uploaded photo' } }
      const sw = await page.evaluate(() => window.__dialog()?.src)
      await page.evaluate(() => window.__clickText('Apply'))
      let closed = false
      for (let i = 0; i < 25 && !closed; i++) { await wait(100); closed = !(await page.evaluate(() => !!window.__dialog())) }
      await wait(150)
      const after = await page.evaluate(() => window.__cs())
      await page.evaluate((sid, c) => window.__restore(sid, c), sec.id, before.find((x) => x.id === sec.id).c)
      await wait(150)
      const changed = after.flatMap((a, i) => (a.id === sec.id ? [] : (JSON.stringify(a.c) !== JSON.stringify(before[i].c) ? [`${a.id} (another section)`] : [])))
      const mine = diffKeys(before.find((x) => x.id === sec.id).c, after.find((x) => x.id === sec.id).c)
      const bC = before.find((x) => x.id === sec.id).c, aC = after.find((x) => x.id === sec.id).c
      const problems = [...changed]
      if (!closed) problems.push('the dialog stayed open after Apply')
      if (mine.length !== 1 || mine[0] !== slot.k) problems.push(`changed keys ${JSON.stringify(mine)}, wanted [${slot.k}]`)
      let appended = false
      if (mine.includes(slot.k)) {
        const b = bC[slot.k], a = aC[slot.k]
        if (slot.idx != null) {
          // A seeded list (the key absent) is as long as the slots that show a picture; a stored one, its own length.
          const bl = Array.isArray(b) ? b : slot.sibs.filter((v) => v != null).map((v) => v)
          const al = Array.isArray(a) ? a : []
          const baseLen = bl.length
          if (slot.idx >= baseLen) {
            appended = true
            if (al.length !== baseLen + 1 || al[baseLen] === undefined || !String(al[baseLen]).startsWith('data:image')) problems.push(`past the end (${slot.idx} of ${baseLen}) did not append one photo`)
            for (let j = 0; j < baseLen; j++) if (JSON.stringify(al[j]) !== JSON.stringify(bl[j])) problems.push(`item ${j} changed`)
          } else {
            // A seeded list is resolved and rewritten whole: every other item must be what the slots showed.
            if (!Array.isArray(a) || a.length !== baseLen) problems.push(`list length ${a?.length}, wanted ${baseLen}`)
            else {
              a.forEach((v, j) => {
                if (j === slot.idx) { if (!String(v).startsWith('data:image')) problems.push(`item ${j} is not the upload`) }
                else if (JSON.stringify(v ?? null) !== JSON.stringify(bl[j] ?? null)) problems.push(`item ${j} changed`)
              })
            }
          }
        } else if (slot.row != null) {
          if (!Array.isArray(a)) problems.push('tracks is not a list')
          else {
            a.forEach((r, j) => {
              if (j === slot.row) {
                if (!String(r?.image).startsWith('data:image')) problems.push(`row ${j} has no uploaded image`)
                const rest = (o) => { const { image, ...x } = o ?? {}; return JSON.stringify(x) }
                const was = Array.isArray(b) ? b[j] : null
                if (was && rest(r) !== rest(was)) problems.push(`row ${j}'s other cells changed`)
              } else if (Array.isArray(b) && JSON.stringify(r) !== JSON.stringify(b[j])) problems.push(`row ${j} changed`)
            })
          }
        } else if (!String(a).startsWith('data:image')) problems.push(`${slot.k} is not the upload`)
      }
      void sw
      return { problems, appended, keys: mine }
    }

    // mark -> slot, each list slot carrying `sibs`: the values of its list's slots, by index, as the panel showed them.
    const withSibs = (slots) => new Map(slots.map((u) => [u.mark, { ...u, sibs: u.idx == null ? [] : slots.filter((x) => x.k === u.k).map((x) => x.value) }]))
    // One node: aim, click through its points until one opens something, check what opened, Escape, restore.
    async function walkNode(sec, nodeRow, slotBy, written) {
      const out = { result: 'hidden' }
      // Aim in the state the click is made in: the page lays out a few px differently with another section selected.
      await selectOther(sec)
      let aim = await page.evaluate((sid, i) => window.__aimPhoto(sid, i), sec.id, nodeRow.i)
      if (!(aim.gone || aim.hidden)) { await wait(100); aim = await page.evaluate((sid, i) => window.__aimPhoto(sid, i), sec.id, nodeRow.i) }
      if (aim.pts == null) return { result: 'hidden', why: aim.hidden ?? 'gone', over: aim.over }
      const slot = slotBy.get(nodeRow.mark)
      const fp0 = await page.evaluate((sid) => window.__fp(sid), sec.id)
      const sawText = []
      let opened = null, at = null
      for (const pt of aim.pts) {
        res.clicks++
        const o = drop ? await dropAt(pt) : await clickAt(pt)
        if (o.text) { sawText.push(pt); await settle(); continue }
        if (o.dialog || o.picked) { opened = o; at = pt; break }
        out.over = pt.over
      }
      if (!opened) {
        if (sawText.length === aim.pts.length) return { result: 'copy', pts: sawText.length }
        if (slot && !slot.off) return { result: 'blocked', over: out.over, tried: aim.pts.length }
        return { result: 'closed', off: slot?.off ?? 'not a slot', tried: aim.pts.length }
      }
      // Something opened.
      if (!slot || slot.off) {
        await settle()
        return { result: 'WRONG', why: `${slot ? 'PHOTO_OFF names it' : 'no slot reads it'}, and the click opened the editor`, at }
      }
      const fail = []
      if (drop) {
        // A drop frames the dropped file, whether the slot was filled or empty.
        if (!opened.dialog) fail.push('the drop opened no crop dialog')
        else {
          if (!/^Frame your photo$/.test(opened.dialog.title)) fail.push(`dialog title "${opened.dialog.title}"`)
          if (!String(opened.dialog.src ?? '').startsWith('data:image') && !String(opened.dialog.src ?? '').startsWith('blob:')) fail.push(`the dialog frames ${String(opened.dialog.src).slice(0, 60)}, not the dropped file`)
        }
        if (!opened.allowed) fail.push('the dialog opened without the dragover being cancelled')
      } else if (slot.empty) { if (!opened.picked) fail.push('an empty slot opened the crop dialog, not the file picker') }
      else {
        if (!opened.dialog) fail.push('a filled slot opened no crop dialog')
        else {
          if (!/^Edit photo$/.test(opened.dialog.title)) fail.push(`dialog title "${opened.dialog.title}"`)
          const want = await page.evaluate((v) => window.__abs(v), slot.value)
          const got = await page.evaluate((v) => window.__abs(v), opened.dialog.src ?? '')
          if (got !== want) fail.push(`the dialog frames ${String(opened.dialog.src).slice(0, 60)} but the panel shows ${String(slot.value).slice(0, 60)}`)
        }
      }
      // Escape: nothing written, nothing left open.
      let still = false
      let nr = null
      if (opened.dialog) {
        await page.keyboard.press('Escape'); await wait(200)
        still = await page.evaluate(() => !!window.__dialog())
        if (still) { await settle() }
        const fp1 = await page.evaluate((sid) => window.__fp(sid), sec.id)
        if (still || fp1.c !== fp0.c || fp1.html !== fp0.html) nr = { open: still, c: fp1.c === fp0.c, html: fp1.html === fp0.html }
      } else if (opened.picked) {
        const fp1 = await page.evaluate((sid) => window.__fp(sid), sec.id)
        if (fp1.c !== fp0.c || fp1.html !== fp0.html) nr = { open: false, c: fp1.c === fp0.c, html: fp1.html === fp0.html }
      }
      // The write: once per mark (every node with --every).
      let wrote = null
      if (!fail.length && !nr && (every || !written.has(slot.mark))) {
        written.add(slot.mark)
        const again = drop ? { ...(await dropAt(at)), drop: true } : await clickAt(at)
        if (again.dialog || again.picked) {
          wrote = await writeTest(sec, slot, again)
          if (wrote.error) fail.push(wrote.error)
          else if (wrote.problems.length) fail.push(...wrote.problems)
        } else fail.push('the second click at the same point opened nothing')
        await settle()
        const fp2 = await page.evaluate((sid) => window.__fp(sid), sec.id)
        if (fp2.c !== fp0.c) nr = { open: false, c: false, html: fp2.html === fp0.html, after: 'write' }
      }
      if (fail.length) return { result: 'WRONG', slot: slot.id, why: fail.join('; '), at }
      if (nr) return { result: 'NOT-RESTORED', slot: slot.id, restore: nr, at }
      const cover = await page.evaluate((sid, i, t) => window.__cover(sid, i, t), sec.id, nodeRow.i, info.theme)
      return { result: 'hit', slot: slot.id, empty: slot.empty, at, appended: !!wrote?.appended, wrote: !!wrote, cover }
    }

    // The positive control: a click on the header's photo must open the editor and write the header's slot.
    {
      const hd = info.sections.find((s) => s.cat === 'header')
      await selectOther(hd)
      await wait(300)
      const slots = await page.evaluate((sid, t) => window.__slots(sid, t), hd.id, info.theme)
      const slotBy = withSibs(slots.filter((s) => !s.off))
      const nodes = await page.evaluate((sid) => window.__photos(sid), hd.id)
      const pick = nodes.filter((n) => slotBy.has(n.mark)).sort((a, b) => (a.mark === 'image' ? -1 : 0) - (b.mark === 'image' ? -1 : 0))
      let ok = false, why = 'the header draws no photo'
      for (const n of pick) {
        const r = await walkNode(hd, n, slotBy, new Set())
        if (r.result === 'hit' && r.wrote) { ok = true; break }
        why = `${why.startsWith('the header') ? '' : `${why} | `}${n.mark}: ${r.result} ${r.why ?? ''}`
      }
      if (!ok) throw Object.assign(new Error(`positive control failed: a click on a header photo did not open and write its own slot (${theme} L${layout} ${width}: ${why})`), { control: true })
      if (drop) {
        // Negative control: a text drag over the photo is the page's own (not cancelled, nothing opens), and a
        // file drag over a point that is not a photo is cancelled with no effect (the browser must not open it).
        const aim = await page.evaluate((sid, i) => window.__aimPhoto(sid, i), hd.id, pick[0].i)
        const t = aim.pts?.[0] && await dropAt(aim.pts[0], 'text')
        if (!t || t.cancelled || t.dialog) throw Object.assign(new Error(`negative control failed: a text drag over a photo was ${t?.cancelled ? 'cancelled' : t?.dialog ? 'opened' : 'unaimed'}`), { control: true })
        // A control of the header (a nav link, the Book pill) hides every photo from a click, so from a drop.
        const off = await page.evaluate((sid) => {
          for (const a of document.querySelectorAll(`[data-sid="${sid}"] a, [data-sid="${sid}"] button`)) {
            const r = a.getBoundingClientRect()
            const pt = { x: r.left + r.width / 2, y: r.top + r.height / 2 }
            if (r.width > 4 && r.height > 4 && document.elementFromPoint(pt.x, pt.y)?.closest('a,button') === a) return pt
          }
          // Narrow, the nav collapses: a line of the header's own copy hides photos the same way.
          for (const el of document.querySelectorAll(`[data-sid="${sid}"] *`)) {
            const tn = [...el.childNodes].find((n) => n.nodeType === Node.TEXT_NODE && n.data.trim())
            if (!tn || el.closest('[data-photo]')) continue // an emptied photo's initials are the photo's own
            const rg = document.createRange(); rg.selectNodeContents(tn)
            const r = rg.getBoundingClientRect()
            const pt = { x: r.left + r.width / 2, y: r.top + r.height / 2 }
            if (r.width > 4 && r.height > 4 && document.elementFromPoint(pt.x, pt.y) === el) return pt
          }
          return null
        }, hd.id)
        if (!off) throw Object.assign(new Error('negative control: the header draws no link, button or copy to drop on'), { control: true })
        const f = await dropAt(off, 'file')
        if (!f.cancelled || f.allowed || f.dialog) throw Object.assign(new Error(`negative control failed: a file drag over a section corner was ${!f.cancelled ? 'not cancelled' : f.allowed ? 'allowed' : 'opened'}`), { control: true })
        await settle()
      }
      await settle()
    }

    for (const sec of info.sections) {
      if (onlyCats && !onlyCats.includes(sec.cat)) continue
      await selectOther(sec)
      await wait(300)
      const secRow = { sec: sec.cat, hits: 0, wrong: 0, nr: 0, blocked: 0, hidden: 0, copy: 0 }
      const universe = await page.evaluate((sid, t) => window.__slots(sid, t), sec.id, info.theme)
      // A list read from a seeded (absent) key: the write compares against what the slot saw.
      const slotBy = withSibs(universe)
      const nodes = await page.evaluate((sid) => window.__photos(sid), sec.id)
      const written = new Set()
      const seen = new Map() // mark -> { n, hit, blocked, hidden }
      for (const nd of nodes) {
        const row = { kind: 'click', sec: sec.cat, i: nd.i, mark: nd.mark }
        const r = await walkNode(sec, nd, slotBy, written)
        const e = seen.get(nd.mark) ?? { n: 0, hit: 0, blocked: 0, hidden: 0, copy: 0 }
        e.n++
        if (r.result === 'hit') {
          secRow.hits++; e.hit++
          const h = res.hits.get(r.slot) ?? { n: 0 }
          h.n++; res.hits.set(r.slot, h)
          if (r.appended) res.appended.push({ sec: sec.cat, id: r.slot })
          if (r.cover && r.cover.open < r.cover.total) res.partial.push({ sec: sec.cat, id: r.slot, i: nd.i, open: r.cover.open, total: r.cover.total, by: r.cover.by })
        } else if (r.result === 'WRONG') { secRow.wrong++; res.wrong.push({ sec: sec.cat, mark: nd.mark, slot: r.slot, why: r.why }) }
        else if (r.result === 'NOT-RESTORED') { secRow.nr++; res.nr.push({ sec: sec.cat, mark: nd.mark, slot: r.slot, ...r.restore }) }
        else if (r.result === 'blocked') { secRow.blocked++; e.blocked++; res.blocked++ }
        else if (r.result === 'hidden') { secRow.hidden++; e.hidden++; res.hidden++ }
        else if (r.result === 'copy') { secRow.copy++; e.copy++; res.copy++ }
        seen.set(nd.mark, e)
        emit({ ...row, ...r })
        await settle()
      }
      // The slots of this section that no click hit.
      for (const slot of universe) {
        if (res.hits.has(slot.id)) continue
        if (slot.off) { res.off.push({ sec: sec.cat, id: slot.id, why: slot.off }); continue }
        const e = seen.get(slot.mark)
        if (!e || e.hidden === e.n) { res.notDrawn.push({ sec: sec.cat, id: slot.id, mark: slot.mark }); continue }
        // Reachable somewhere, but no node opened it. Copy-covered alone is a miss too: the photo is under text everywhere.
        if (res.wrong.some((w) => w.slot === slot.id)) continue
        res.missing.push({ sec: sec.cat, id: slot.id, mark: slot.mark, why: `${e.n} node(s): ${e.blocked} blocked, ${e.copy} under copy, ${e.hidden} hidden` })
      }
      // A node blocked where another node of its own slot opened: a dead spot, reported.
      for (const [mark, e] of seen) {
        const slot = slotBy.get(mark)
        if (slot && !slot.off && e.blocked && res.hits.has(slot.id)) res.dead.push({ sec: sec.cat, id: slot.id, n: e.blocked })
      }
      for (const m of [...res.missing, ...res.notDrawn, ...res.off, ...res.dead].filter((x) => x.sec === sec.cat)) {
        emit({ kind: 'slot', ...m, result: res.missing.includes(m) ? 'MISSING' : res.off.includes(m) ? 'off' : res.dead.includes(m) ? 'dead spot' : 'not drawn' })
      }
      emit({ kind: 'section', ...secRow })
      console.log(`  ${sec.cat.padEnd(13)} ${String(secRow.hits).padStart(3)} hit  ${secRow.wrong} WRONG  ${secRow.nr} NOT-RESTORED  ${secRow.blocked} blocked  ${secRow.copy} copy  ${secRow.hidden} hidden`)
    }
  } finally {
    res.errors = errors
    await page.close()
  }
  return res
}

let failing = 0
// Per theme and layout, across the widths run: what was hit, ledgered or undrawn.
const acc = new Map()
for (const theme of themes) for (const layout of layouts) for (const width of widths) {
  console.log(`${theme} layout ${layout} @ ${width}`)
  let res
  for (let attempt = 0; attempt < 2 && !res; attempt++) {
    try { res = await runCombo(theme, layout, width) } catch (e) {
      if (e.control) { console.error(e.message); console.log('photo-probe: FAIL (positive control)'); await browser.close(); process.exit(2) }
      console.error(`  attempt ${attempt + 1}: ${e.message}`)
    }
  }
  if (!res) { failing++; console.log(`  photo-probe ${theme} L${layout} ${width}: did not complete`); continue }
  for (const w of res.wrong) console.log(`  WRONG        ${w.sec}  ${w.mark}${w.slot ? ` (${w.slot})` : ''}: ${w.why}`)
  for (const w of res.nr) console.log(`  NOT-RESTORED ${w.sec}  ${w.mark} ${JSON.stringify({ open: w.open, c: w.c, html: w.html })}`)
  for (const m of res.missing) console.log(`  MISSING      ${m.id}  — ${m.why}`)
  for (const m of res.notDrawn) console.log(`  not drawn    ${m.id}`)
  for (const m of res.dead) console.log(`  dead spot    ${m.id} ×${m.n}`)
  for (const m of res.partial) console.log(`  partial      ${m.id} node ${m.i}: ${m.open}/${m.total} points open — ${Object.entries(m.by).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, n]) => `${n}× ${k}`).join(', ')}`)
  for (const m of res.appended) console.log(`  appended     ${m.id}  (past the end of its list: the write appends)`)
  for (const m of res.off) console.log(`  off          ${m.id} — ${m.why}`)
  if (res.errors.length) console.log(`  page errors: ${[...new Set(res.errors)].slice(0, 3).join(' | ')}`)
  const bad = res.wrong.length + res.nr.length + res.missing.length
  if (bad) failing++
  const a = acc.get(`${theme}|${layout}`) ?? acc.set(`${theme}|${layout}`, { widths: [], hit: new Set(), off: new Set(), notDrawn: [] }).get(`${theme}|${layout}`)
  a.widths.push(width)
  for (const id of res.hits.keys()) a.hit.add(id)
  for (const m of res.off) a.off.add(m.id)
  a.notDrawn.push(new Map(res.notDrawn.map((m) => [m.id, m])))
  console.log(`photo-probe ${res.theme} L${res.layout} @${res.width}: ${res.hits.size} slots hit · ${res.wrong.length} WRONG · ${res.nr.length} NOT-RESTORED · ${res.missing.length} MISSING · ${res.notDrawn.length} not drawn · ${res.dead.length} dead spot · ${res.appended.length} appended · ${res.off.length} off · ${res.blocked} blocked · ${res.copy} copy · ${res.hidden} hidden · ${res.clicks} clicks`)
  fs.appendFileSync(path.join(outDir, `${res.tag}.jsonl`), JSON.stringify({ kind: 'summary', hits: [...res.hits].map(([slot, h]) => ({ slot, ...h })), wrong: res.wrong, nr: res.nr, missing: res.missing, notDrawn: res.notDrawn, dead: res.dead, appended: res.appended, partial: res.partial, off: res.off }) + '\n')
}
// The done test leaves nothing out silently: a slot no width draws, that no click reached and
// the ledger (PHOTO_OFF) does not name, fails --check. It needs both widths in one run.
for (const [key, a] of acc) {
  const [theme, layout] = key.split('|')
  if (blank) { console.log(`${theme} layout ${layout}: unledgered check skipped (--blank empties the lists, and an emptied list draws none of pricing's faces; the default run owns it)`); continue }
  if (!(a.widths.includes(1440) && a.widths.includes(768))) {
    console.log(`${theme} layout ${layout}: unledgered check skipped (it needs --width 1440,768)`)
    continue
  }
  const gone = [...a.notDrawn[0].values()].filter((m) => !a.hit.has(m.id) && !a.off.has(m.id) && a.notDrawn.every((w) => w.has(m.id)))
  if (!gone.length) continue
  failing++
  for (const m of gone) console.log(`  UNLEDGERED   ${m.id} — drawn at no width: add a PHOTO_OFF row with its reason`)
}
await browser.close()
console.log(`photo-probe: ${failing ? 'FAIL' : 'PASS'}`)
if (check && failing) process.exit(1)
