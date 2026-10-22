// The coverage proof for canvas inline editing (plans/inline-edit-all.md): the
// builder walked from the template picker to the editor under one template and
// layout, then every text node of every section clicked with a real mouse, a
// sentinel typed into the box that opens, Escape pressed, and what came of it
// recorded. Needs `npm run dev` (or any served build) — BASE= names it.
//
//   node scripts/inline-probe.mjs --theme Retro --layout 1 --width 1440,768 --check
//   node scripts/inline-probe.mjs --theme Pop,Grunge --layout 1 --cat bio,media
//   OUT=/tmp/ip BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Lime --layout 1 --check
//
// Flags (comma lists run every combination, each in a fresh editor):
//   --theme    Retro | Lime | Grunge | Editorial | Pop        (default Retro)
//   --layout   1..4 (Retro also 5 and 6: the header alone, on page 1)  (default 1)
//   --width    1440 (the Desktop tab) | 768 (the Tablet tab)  (default 1440)
//              The window stays 1440 wide in both: at 820 or under the editor
//              turns into the phone chrome, where inline editing is off.
//   --cat      only these sections (default: the whole page)
//   --check    exit 1 on any WRONG, NOT-RESTORED, MISSING or UNLEDGERED
//   --limit N  at most N text nodes per section (debugging)
//
// Per text node it records one of
//   hit        a box opened on its own slot (the box carries `data-inline-slot`,
//              an id the builder gives the slot: cat.key[row].col#item.part),
//              the sentinel typed into it landed on glyphs under the box, and
//              Escape put the section's content (`c`) and DOM back
//   WRONG      a box opened on a slot that does not print this node's copy (or the
//              text of the element on top of the click point: that is "unhit under
//              an overlay"), or the sentinel did not land under the box
//   NOT-RESTORED  Escape left a box open, or `c` / the section's HTML differs
//   unhit      no box (literal copy, panel-only fields, a repeat it cannot pair)
//   hidden     the node paints nothing the pointer can reach (clipped, covered
//              by another section) — not clicked
// and, once the section is walked, every slot of the *universe* — the fields the
// layout reads and the repeater cells, before any exclusion — that no click hit:
//   MISSING    some node prints it and no click reached it. Fails --check.
//   not drawn  nothing prints it at this width. Listed; fails --check as
//              UNLEDGERED only if no width draws it (run --width 1440,768) and
//              INLINE_OFF does not name it, so a gap is never left out silently.
//   paged      a row the layout does not draw, in a column whose earlier rows are hit
//              and whose later rows are all undrawn too (a pager, a carousel, as the
//              app's `prefixSlot` reads it). Not failing.
//   dead click a node that prints a hit slot's copy (the same words) and opens nothing, while another node of the
//              section opens it: `--check` counts the slot hit and cannot see the dead node. Not failing. Known
//              noise: the gallery's vertical `Gallery` wordmark, a row's own number (`12`), vertical type
//              (Retro layout 2's `Manchester, UK` rail), and punctuation (`·`, skipped).
//   off        the universe slot is in INLINE_OFF (or INLINE_HEAD: a row the app says the canvas does not draw);
//              its reason is printed. A head row some node does print (and no other row shares its words)
//              is MISSING instead: `drawnRows` is out of step with the section.
// A positive control runs first: the header's title must open its box, or the
// harness itself is broken (exit 2).
//
// One JSONL row per click goes to $OUT/inline-probe/<theme>-L<n>-<width>.jsonl as it
// is taken, and the last stdout line is `inline-probe: PASS` or `inline-probe: FAIL`.
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
const limit = Number(opt('limit', 0)) || Infinity
const check = flag('check')
const base = process.env.BASE || 'http://localhost:5173'
const outDir = path.join(process.env.OUT || path.join(os.tmpdir(), 'encore-inline-probe'), 'inline-probe')
fs.mkdirSync(outDir, { recursive: true })
const wait = (ms) => new Promise((r) => setTimeout(r, ms))
// A slot's column: `pricing.tiers[2].feats#1` → `pricing.tiers[].feats`.
const colKey = (id) => id.replace(/\[\d+\]/, '[]').replace(/#\d+/, '')
const SENTINEL = 'ZZQ'

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
  const squash = (v) => String(v).replace(/\s+/g, '').toLowerCase()
  window.__sq = squash
  const rootOf = (sid) => document.querySelector(`[data-sid="${sid}"]`)?.firstElementChild
  window.__root = rootOf
  // The text nodes a click can be aimed at, in document order. A seal's text is
  // one target per outermost svg (the ring turns; the whole disc is the target).
  window.__nodes = (sid) => {
    const root = rootOf(sid)
    const out = []
    const seenSvg = new Set()
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    for (let n = w.nextNode(); n; n = w.nextNode()) {
      if (!n.data.trim()) continue
      const el = n.parentElement
      if (!el || /^(SCRIPT|STYLE|TEXTAREA|TITLE)$/.test(el.tagName)) continue
      const svg = el.closest('svg')
      if (svg) {
        let o = svg
        while (o.parentElement?.closest('svg')) o = o.parentElement.closest('svg')
        if (seenSvg.has(o)) continue
        seenSvg.add(o)
        out.push({ n, el: o, svg: true })
      } else out.push({ n, el, svg: false })
    }
    return out
  }
  // Where to click `node`, after it is scrolled to the middle: the centre of its
  // first line's glyph box, which is what a hand aims at. null when it paints
  // nothing the pointer can reach.
  // `needle` aims at those words inside the node instead of its middle.
  window.__aim = (sid, i, expectText, needle) => {
    const t = window.__nodes(sid)[i]
    if (!t) return { gone: true }
    const text = t.svg ? t.el.textContent.trim().slice(0, 60) : t.n.data.trim()
    if (expectText != null && text !== expectText) return { moved: true, text }
    t.el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' })
    let r
    if (t.svg) { const b = t.el.getBoundingClientRect(); r = { left: b.left, top: b.top, width: b.width, height: b.height } }
    else {
      const range = document.createRange()
      const at = needle ? t.n.data.toLowerCase().indexOf(needle.toLowerCase()) : -1
      if (at >= 0) { range.setStart(t.n, at); range.setEnd(t.n, at + needle.length) } else range.selectNodeContents(t.n)
      r = [...range.getClientRects()].find((q) => q.width > 0.5 && q.height > 0.5)
      // A clamped title (`overflow: hidden; text-overflow: ellipsis`) has a range as wide as the
      // whole copy, whose middle is the clipped part. Aim at the part a clipping ancestor leaves.
      if (r) {
        const root = rootOf(sid)
        for (let e = t.el; e && e !== root.parentElement; e = e.parentElement) {
          const cs = getComputedStyle(e)
          if (cs.overflowX === 'visible' && cs.overflowY === 'visible') continue
          const b = e.getBoundingClientRect()
          const l = cs.overflowX === 'visible' ? r.left : Math.max(r.left, b.left), rt = cs.overflowX === 'visible' ? r.left + r.width : Math.min(r.left + r.width, b.right)
          const tp = cs.overflowY === 'visible' ? r.top : Math.max(r.top, b.top), bt = cs.overflowY === 'visible' ? r.top + r.height : Math.min(r.top + r.height, b.bottom)
          if (rt - l > 0.5 && bt - tp > 0.5) r = { left: l, top: tp, width: rt - l, height: bt - tp }
        }
      }
    }
    if (!r) return { hidden: 'no box', text }
    const x = r.left + r.width / 2, y = r.top + r.height / 2
    const root = rootOf(sid)
    if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) return { hidden: 'off-screen', text }
    const stack = document.elementsFromPoint(x, y).filter((e) => root.contains(e))
    const depth = stack.indexOf(t.el)
    if (depth < 0 && !t.svg && !stack.some((e) => t.el.contains(e))) {
      const outer = document.elementsFromPoint(x, y)[0]
      return { hidden: stack.length ? 'covered in section' : 'covered', text, over: describe(outer) }
    }
    const above = (depth < 0 ? stack.slice(0, stack.findIndex((e) => t.el.contains(e))) : stack.slice(0, depth))
      .filter((e) => !t.el.contains(e))
    return { x, y, text, svg: t.svg, over: above.length ? describe(above[0]) : null, overText: above.length ? above[0].textContent : null, pe: above.length ? getComputedStyle(above[0]).pointerEvents : null }
  }
  function describe(e) {
    if (!e) return null
    const cs = getComputedStyle(e)
    return `${e.tagName.toLowerCase()}${e.id ? '#' + e.id : ''}${e.className && typeof e.className === 'string' ? '.' + e.className.split(/\s+/).join('.') : ''}[${cs.position}${cs.pointerEvents === 'none' ? ' pe:none' : ''}]`
  }
  // The targets whose text holds `needle`, as indices into __nodes.
  window.__withText = (sid, needle) => window.__nodes(sid).flatMap((t, i) => (!t.svg && t.n.data.toLowerCase().includes(needle.toLowerCase()) ? [i] : []))
  window.__editor = () => {
    const ta = document.querySelector('textarea[data-inline-edit]')
    if (!ta) return null
    const r = ta.getBoundingClientRect()
    return { slot: ta.dataset.inlineSlot, label: ta.getAttribute('aria-label'), float: ta.hasAttribute('data-inline-float'), value: ta.value, rect: [r.left, r.top, r.width, r.height] }
  }
  // Did the sentinel land on glyphs under the box (or, for a seal, in its svg)?
  window.__landed = (sid, rect, float, sentinel) => {
    const root = rootOf(sid)
    const z = sentinel.toLowerCase()
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    for (let n = w.nextNode(); n; n = w.nextNode()) {
      if (!n.data.toLowerCase().includes(z)) continue
      if (float) { if (n.parentElement.closest('svg')) return true; continue }
      const range = document.createRange()
      range.selectNodeContents(n)
      const pad = 6
      for (const q of range.getClientRects()) {
        if (q.right >= rect[0] - pad && q.left <= rect[0] + rect[2] + pad && q.bottom >= rect[1] - pad && q.top <= rect[1] + rect[3] + pad) return true
      }
    }
    return false
  }
  // A cheap fingerprint of a section's stored content and of what it draws.
  const fnv = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) } return (h >>> 0).toString(16) + ':' + s.length }
  window.__fp = (sid) => {
    const { st } = window.__fh()
    const sec = st.sections.find((x) => x.id === sid)
    return { c: fnv(JSON.stringify(sec.c)), html: fnv(rootOf(sid).innerHTML) }
  }
  // How many nodes print `slot`'s copy (minimal elements of nonzero width; a part
  // slot's words inside a longer line count, less the nodes that are exactly some
  // other field's copy, `others`: an artist `Queen` is not "Dancing Queen").
  window.__printed = (sid, slot, others) => {
    const root = rootOf(sid)
    if (slot.marked) { const m = root.querySelector(`[data-inline="${slot.k}"]`); return m && m.getBoundingClientRect().width > 0 ? 1 : 0 }
    const wants = (slot.lines ?? []).map(squash)
    const part = squash(slot.text)
    const skip = new Set(others)
    const hits = [...root.querySelectorAll('*')].filter((e) => {
      if (!e.getBoundingClientRect().width) return false
      const q = squash(e.textContent)
      return wants.includes(q) || q === part || (slot.part && q.includes(part))
    })
    return hits.filter((h) => !hits.some((o) => o !== h && h.contains(o)) && !(slot.part && skip.has(squash(h.textContent)))).length
  }
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
  // reaches them, from the sidebar's layout picker, on the page card 1 laid out. What `pickHeader(i)`
  // would write for them is that page (`pageLayout` folds every body section to design 0 and
  // `pageOrder` to layout 1's), so only the header's `arch` moves.
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
    const tab = await page.$$('[role=tab]')
    let done = false
    for (const t of tab) if ((await t.evaluate((e) => e.textContent.trim())) === 'Tablet') { await t.click(); done = true }
    if (!done) throw new Error('no Tablet tab')
    await wait(700)
  }
  return { page, errors }
}

const inEditor = (page) => page.evaluate(async () => {
  const { st } = window.__fh()
  const mod = await import('/src/builder/EncoreBuilder.jsx')
  const data = await import('/src/builder/data.js')
  return { theme: data.THEMES[st.theme].name, selectedId: st.selectedId, sections: st.sections.map((s) => ({ id: s.id, cat: s.cat, arch: s.arch })), has: typeof mod.inlineSlots }
})

async function runCombo(theme, layout, width) {
  const tag = `${theme}-L${layout}-${width}`
  const sink = path.join(outDir, `${tag}.jsonl`)
  fs.writeFileSync(sink, '')
  const emit = (row) => fs.appendFileSync(sink, JSON.stringify(row) + '\n')
  const { page, errors } = await openEditor(theme, layout, width)
  const res = { tag, theme, layout, width, hits: new Map(), wrong: [], nr: [], missing: [], notDrawn: [], paged: [], dead: [], off: [], unhit: 0, hidden: 0, clicks: 0, covered: [] }
  try {
    const info = await inEditor(page)
    if (info.has !== 'function') throw new Error('EncoreBuilder.jsx exports no inlineSlots')
    const select = (sid) => page.evaluate((sid) => { const { set } = window.__fh(); set((s) => ({ ...s, selectedId: sid })) }, sid)

    // The positive control: the header's title, before anything else is tried.
    {
      const hd = info.sections.find((s) => s.cat === 'header')
      await select(hd.id)
      await wait(250)
      const ns = await page.evaluate((sid) => window.__nodes(sid).map((t, i) => ({ i, text: t.svg ? '' : t.n.data.trim(), size: parseFloat(getComputedStyle(t.el).fontSize) })), hd.id)
      // The name whole, or one of its words: Grunge's layout-3 title stands in two spans
      // (`Kai`, `Mercer`), and a click on either is on the h1 that prints the title.
      const cand = ns.filter((n) => ['kai mercer', 'kai', 'mercer'].includes(n.text.toLowerCase())).sort((a, b) => b.size - a.size)[0]
      let ok = false
      if (cand) {
        const aim = await page.evaluate((sid, i) => window.__aim(sid, i), hd.id, cand.i)
        if (aim.x != null) {
          await page.mouse.click(aim.x, aim.y)
          await wait(200)
          const ed = await page.evaluate(() => window.__editor())
          ok = !!ed && ed.slot === 'header.title'
          await page.keyboard.press('Escape')
          await wait(200)
        }
      }
      if (!ok) throw Object.assign(new Error(`positive control failed: a click on the header's title opened no header.title box (${theme} L${layout} ${width})`), { control: true })
    }

    const sq = (v) => String(v).replace(/\s+/g, '').toLowerCase()
    const hasWord = (v) => /[\p{L}\p{N}]/u.test(v)

    for (const sec of info.sections) {
      if (onlyCats && !onlyCats.includes(sec.cat)) continue
      await select(sec.id)
      await wait(250)
      const secRow = { sec: sec.cat, hits: 0, wrong: 0, nr: 0, unhit: 0, hidden: 0 }
      const universe = await page.evaluate(async (sid, themeName) => {
        const { st } = window.__fh()
        const sec = st.sections.find((x) => x.id === sid)
        const mod = await import('/src/builder/EncoreBuilder.jsx')
        const name = String(st.sections.find((x) => x.cat === 'header')?.c?.title ?? '').trim() || 'Kai Mercer'
        return mod.inlineSlots(sec, themeName, name, true).map((s) => ({ id: s.id, k: s.k, group: s.group, text: s.text, lines: s.lines, part: s.part, marked: !!s.marked, off: s.off ?? null, head: !!s.head }))
      }, sec.id, info.theme)
      const byId = new Map(universe.map((u) => [u.id, u]))
      const n = await page.evaluate((sid) => window.__nodes(sid).length, sec.id)
      const texts = await page.evaluate((sid) => window.__nodes(sid).map((t) => (t.svg ? t.el.textContent.trim().slice(0, 60) : t.n.data.trim())), sec.id)

      // One click at `aim`, and what came of it. With `want`, only a box on that
      // slot is typed into (any other is closed with Escape, untouched).
      async function clickAt(aim, row, want) {
        const before = await page.evaluate((sid) => window.__fp(sid), sec.id)
        await page.mouse.click(aim.x, aim.y)
        await wait(130)
        const ed = await page.evaluate(() => window.__editor())
        const stack = aim.over ? { over: aim.over, pe: aim.pe } : {}
        if (!ed) return { result: 'unhit', stack }
        if (want && ed.slot !== want) {
          await page.keyboard.press('Escape'); await wait(120)
          return { result: 'other', slot: ed.slot, stack }
        }
        await page.keyboard.type(SENTINEL)
        await wait(140)
        const ed2 = (await page.evaluate(() => window.__editor())) ?? ed
        const landed = (await page.evaluate((sid, rect, float, z) => window.__landed(sid, rect, float, z), sec.id, ed.rect, ed.float, SENTINEL))
          || (await page.evaluate((sid, rect, float, z) => window.__landed(sid, rect, float, z), sec.id, ed2.rect, ed2.float, SENTINEL))
        await page.keyboard.press('Escape')
        await wait(150)
        let still = await page.evaluate(() => window.__editor())
        if (still) { await page.keyboard.press('Escape'); await wait(150); still = await page.evaluate(() => window.__editor()) }
        const after = await page.evaluate((sid) => window.__fp(sid), sec.id)
        const restored = !still && after.c === before.c && after.html === before.html
        // The slot has to be one that prints this node's copy; a node that is only
        // punctuation (the `·` before an artist) is beside the words, not wrong.
        const u = byId.get(ed.slot)
        const q = sq(row.text)
        const prints = !hasWord(row.text) ? !!u : !!u && (sq(u.text).includes(q) || q.includes(sq(u.text)) || u.lines?.some((l) => sq(l).includes(q)))
        // The click point can sit inside this node's box with another slot's text on
        // top of it (a back card's title under the front card's, Editorial's wider
        // Gloock): the app answers for what is on top, which is right, so a slot that
        // prints exactly the covering element's text is "unhit under an overlay".
        const onTop = !prints && !!aim.overText && !!u && (sq(u.text) === sq(aim.overText) || !!u.lines?.some((l) => sq(l) === sq(aim.overText)))
        const result = !landed || (!prints && !onTop) ? 'WRONG' : !restored ? 'NOT-RESTORED' : onTop ? 'unhit' : 'hit'
        const out = { result, slot: ed.slot, label: ed.label, stack }
        if (!restored) out.restore = { open: !!still, c: after.c === before.c, html: after.html === before.html }
        if (result === 'WRONG') out.why = !prints ? (u ? `slot prints "${u.text.slice(0, 30)}"` : 'slot not in the universe') : 'the sentinel did not land under the box'
        // A box that would not close would swallow the next clicks.
        if (still) { await page.mouse.click(2, 2); await wait(150) }
        return out
      }
      const record = (r, row) => {
        if (r.result === 'hit') {
          secRow.hits++
          const h = res.hits.get(r.slot) ?? { label: r.label, n: 0 }
          h.n++; res.hits.set(r.slot, h)
        } else if (r.result === 'WRONG') { secRow.wrong++; res.wrong.push({ sec: sec.cat, text: row.text, slot: r.slot, why: r.why }) }
        else if (r.result === 'NOT-RESTORED') { secRow.nr++; res.nr.push({ sec: sec.cat, text: row.text, slot: r.slot, ...r.restore }) }
      }

      // Phase 1: every text node, clicked in the middle of its first line.
      const clicked = []
      for (let i = 0; i < Math.min(n, limit); i++) {
        const row = { kind: 'click', sec: sec.cat, i, text: texts[i].slice(0, 60) }
        res.clicks++
        let aim = await page.evaluate((sid, i, text) => window.__aim(sid, i, text), sec.id, i, texts[i])
        if (!(aim.gone || aim.moved || aim.hidden)) { await wait(100); aim = await page.evaluate((sid, i, text) => window.__aim(sid, i, text), sec.id, i, texts[i]) }
        if (aim.x == null) {
          res.hidden++; secRow.hidden++
          emit({ ...row, result: 'hidden', why: aim.hidden ?? (aim.moved ? 'node moved' : 'node gone'), over: aim.over })
          continue
        }
        const r = await clickAt(aim, row)
        if (r.result === 'unhit') {
          res.unhit++; secRow.unhit++
          if (aim.over) res.covered.push({ sec: sec.cat, text: row.text.slice(0, 40), ...r.stack })
        } else record(r, row)
        clicked.push({ text: row.text, result: r.result, slot: r.slot, covered: !!aim.over })
        emit({ ...row, result: r.result, slot: r.slot, label: r.label, ...r.stack, restore: r.restore, why: r.why })
      }

      // A node printing a slot's copy that opens nothing while another node of the section opens
      // it: the slot counts as hit, so `--check` cannot see the dead one. Reported, not failing.
      // Not counted: a node under another element (`covered`), and one with no word in it (`·`).
      const opened = new Map(clicked.filter((x) => x.result === 'hit').map((x) => [sq(x.text), x.slot]))
      for (const x of clicked) if (x.result === 'unhit' && !x.covered && hasWord(x.text) && opened.has(sq(x.text))) res.dead.push({ sec: sec.cat, id: opened.get(sq(x.text)), text: x.text.slice(0, 40) })
      for (const d of res.dead.filter((x) => x.sec === sec.cat)) emit({ kind: 'slot', ...d, result: 'dead click' })

      // Phase 2: a slot the page prints inside a longer line is reached by a click
      // on its own words, which the middle of the line is not. Aim at them.
      const walked = n <= limit
      for (const slot of universe) {
        if (!walked || res.hits.has(slot.id) || slot.off || !(slot.part || slot.lines?.length) || slot.marked) continue
        const needle = slot.text
        const idx = await page.evaluate((sid, nd) => window.__withText(sid, nd), sec.id, needle)
        for (const i of idx) {
          const aim = await page.evaluate((sid, i, nd) => window.__aim(sid, i, null, nd), sec.id, i, needle)
          if (aim.x == null) continue
          await wait(100)
          const aim2 = await page.evaluate((sid, i, nd) => window.__aim(sid, i, null, nd), sec.id, i, needle)
          if (aim2.x == null) continue
          const row = { kind: 'aimed', sec: sec.cat, i, text: needle.slice(0, 60) }
          const r = await clickAt(aim2, row, slot.id)
          emit({ ...row, want: slot.id, result: r.result, slot: r.slot, label: r.label, restore: r.restore, why: r.why })
          if (r.result === 'hit' || r.result === 'WRONG' || r.result === 'NOT-RESTORED') { record(r, row); if (r.result === 'hit') break }
        }
      }

      // The slots of this section that no click reached.
      const rowOf = (id) => Number((id.match(/\[(\d+)\]/) ?? [])[1] ?? -1)
      const printedOf = new Map()
      for (const slot of universe) {
        if (res.hits.has(slot.id)) { printedOf.set(slot.id, true); continue }
        // A row the app ledgered as not drawn (INLINE_HEAD) is checked too: a node that does print it means `drawnRows` is out of step with the section.
        if ((slot.off && !slot.head) || !walked) continue
        // The nth slot with these words is printed only if more than n nodes print them.
        const rank = universe.filter((x, j) => j < universe.indexOf(slot) && x.group === slot.group && sq(x.text) === sq(slot.text)).length
        const others = universe.filter((x) => x.group !== slot.group).flatMap((x) => [...(x.part ? [] : [sq(x.text)]), ...(x.lines ?? []).map(sq)])
        // A ledgered row whose words another row shares (the second *Valerie*) cannot be told from the first's drawn nodes: not checked.
        const twin = slot.head && universe.some((x) => x !== slot && x.group === slot.group && sq(x.text) === sq(slot.text))
        printedOf.set(slot.id, !twin && (await page.evaluate((sid, slot, others) => window.__printed(sid, slot, others), sec.id, slot, others)) > rank)
      }
      for (const slot of universe) {
        if (res.hits.has(slot.id)) continue
        if (slot.off && !(slot.head && printedOf.get(slot.id))) { res.off.push({ sec: sec.cat, id: slot.id, why: slot.off }); continue }
        if (!walked) continue
        const printed = printedOf.get(slot.id)
        // A row nothing prints is *paged* only when the layout draws the head of the
        // column (a pager, a carousel) — it is a suffix of its rows, as `prefixSlot`
        // reads it, and an earlier row is drawn. A gap with drawn rows after it is a
        // miss that only looks like paging (a clamp's `…`, a word-split span).
        const r = rowOf(slot.id)
        const paged = !printed && r >= 0 && [...res.hits.keys()].some((h) => colKey(h) === colKey(slot.id))
          && universe.every((x) => colKey(x.id) !== colKey(slot.id) || rowOf(x.id) < r || !printedOf.get(x.id))
        ;(printed ? res.missing : paged ? res.paged : res.notDrawn).push({ sec: sec.cat, id: slot.id, text: slot.text.slice(0, 40) })
      }
      for (const m of [...res.missing, ...res.notDrawn, ...res.paged, ...res.off].filter((x) => x.sec === sec.cat)) emit({ kind: 'slot', ...m, result: res.missing.includes(m) ? 'MISSING' : res.off.includes(m) ? 'off' : res.paged.includes(m) ? 'paged' : 'not drawn' })
      emit({ kind: 'section', ...secRow })
      console.log(`  ${sec.cat.padEnd(13)} ${String(secRow.hits).padStart(3)} hit  ${secRow.wrong} WRONG  ${secRow.nr} NOT-RESTORED  ${secRow.unhit} unhit  ${secRow.hidden} hidden`)
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
      if (e.control) { console.error(e.message); console.log('inline-probe: FAIL (positive control)'); await browser.close(); process.exit(2) }
      console.error(`  attempt ${attempt + 1}: ${e.message}`)
    }
  }
  if (!res) { failing++; console.log(`  inline-probe ${theme} L${layout} ${width}: did not complete`); continue }
  for (const w of res.wrong) console.log(`  WRONG        ${w.sec}  "${w.text}" opened ${w.slot}`)
  for (const w of res.nr) console.log(`  NOT-RESTORED ${w.sec}  "${w.text}" ${w.slot} ${JSON.stringify({ open: w.open, c: w.c, html: w.html })}`)
  for (const m of res.missing) console.log(`  MISSING      ${m.id}  "${m.text}"`)
  // The non-failing lists, one line per column.
  const grouped = (rows, label, why) => {
    const g = new Map()
    for (const m of rows) { const k = colKey(m.id); const e = g.get(k) ?? { n: 0, first: m, why: m.why }; e.n++; g.set(k, e) }
    for (const [k, e] of g) console.log(`  ${label.padEnd(12)} ${k}${e.n > 1 ? ` ×${e.n}` : ''}${e.first.text ? `  "${e.first.text}"` : ''}${why && e.why ? ` — ${e.why}` : ''}`)
  }
  grouped(res.notDrawn, 'not drawn')
  grouped(res.paged, 'paged')
  grouped(res.dead, 'dead click')
  grouped(res.off, 'off', true)
  if (res.errors.length) console.log(`  page errors: ${[...new Set(res.errors)].slice(0, 3).join(' | ')}`)
  const bad = res.wrong.length + res.nr.length + res.missing.length
  if (bad) failing++
  const a = acc.get(`${theme}|${layout}`) ?? acc.set(`${theme}|${layout}`, { widths: [], hit: new Set(), off: new Set(), notDrawn: [] }).get(`${theme}|${layout}`)
  a.widths.push(width)
  for (const id of res.hits.keys()) a.hit.add(id)
  for (const m of res.off) a.off.add(m.id)
  a.notDrawn.push(new Map(res.notDrawn.map((m) => [m.id, m])))
  console.log(`inline-probe ${res.theme} L${res.layout} @${res.width}: ${res.hits.size} slots hit · ${res.wrong.length} WRONG · ${res.nr.length} NOT-RESTORED · ${res.missing.length} MISSING · ${res.notDrawn.length} not drawn · ${res.paged.length} paged · ${res.dead.length} dead click · ${res.off.length} off · ${res.unhit} unhit · ${res.hidden} hidden · ${res.covered.length} unhit under an overlay`)
  fs.appendFileSync(path.join(outDir, `${res.tag}.jsonl`), JSON.stringify({ kind: 'summary', hits: [...res.hits].map(([slot, h]) => ({ slot, ...h })), wrong: res.wrong, nr: res.nr, missing: res.missing, notDrawn: res.notDrawn, paged: res.paged, dead: res.dead, off: res.off, covered: res.covered }) + '\n')
}
// The done test leaves nothing out silently: a slot no width draws, that no click
// reached and the ledger (INLINE_OFF) does not name, fails --check. It needs both
// widths in one run, since a field only one of them draws (`railLabel`, `sourceLabel`)
// is undrawn at the other.
for (const [key, a] of acc) {
  const [theme, layout] = key.split('|')
  if (!(a.widths.includes(1440) && a.widths.includes(768))) {
    console.log(`${theme} layout ${layout}: unledgered check skipped (it needs --width 1440,768)`)
    continue
  }
  const gone = [...a.notDrawn[0].values()].filter((m) => !a.hit.has(m.id) && !a.off.has(m.id) && a.notDrawn.every((w) => w.has(m.id)))
  if (!gone.length) continue
  failing++
  const g = new Map()
  for (const m of gone) { const k = colKey(m.id); const e = g.get(k) ?? { n: 0, first: m }; e.n++; g.set(k, e) }
  for (const [k, e] of g) console.log(`  UNLEDGERED   ${k}${e.n > 1 ? ` ×${e.n}` : ''}  "${e.first.text}" — drawn at no width: add an INLINE_OFF row with its reason`)
}
await browser.close()
console.log(`inline-probe: ${failing ? 'FAIL' : 'PASS'}`)
if (check && failing) process.exit(1)
