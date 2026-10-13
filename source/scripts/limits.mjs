// Character-cap probe (plans/char-limits.md): for each text field, repeater
// column and list item a section reads, the most characters of realistic prose
// that still draw the way the Figma frame does at all three widths. Needs
// `npm run dev` on :5173 (BASE overrides).
//
//   node scripts/limits.mjs <cat[,cat]> [--themes=0,1,2,3,4] [--keys=heading,tracks.title]
//                           [--widths=desktop,tablet,mobile] [--out=<file.jsonl>]
//   node scripts/limits.mjs <cats> --check     every cap in FIELDS re-rendered at the cap
//   node scripts/limits.mjs <cats> --seeds     every seed within its cap, no browser
//   node scripts/limits.mjs x --seed-list      the census's seed strings (census/seeds.json)
//
// A key is `heading`, `tracks.title` (a repeater column, row 0 of the seed),
// `tags[]` (a list's item, item 0) or `tags#` (a list's item count), or
// `who.kicker` / `who.title` (a header key as another section prints it, through
// &who= / &name=), or `who.seal` (the name on the section's seal ring).
//
// Each render is preview.html with &noclamp=1, the field's value a prose sample
// cut to N characters. Its seats are the smallest elements whose text holds the
// whole value (whitespace dropped, case folded; a list item, or every item of a
// list). Every sample opens with "Kestrel", a word no section prints. N fails
// when, at any seat:
//   lines  — a seat draws more lines than it is allowed: the Figma census's
//            count for the seed's box (plans/char-limits/census/) or, with no
//            census entry, the seed's own line count at that width;
//   box    — ink runs past an ancestor's box, or a box clips its text
//            (scrollWidth past clientWidth, an ellipsis), that a short value
//            did not;
//   page   — the section root scrolls sideways;
//   overlap — its ink meets a text, image or control box a short value's did not;
//   shrink — its font size falls below FLOOR (default: any shrink at all);
//   ring   — on a seal's ring (text on a circular path, set twice), a copy runs
//            off its path, meets the other copy or meets a new mark. Only the
//            seal's own probes read a ring (header `badgeText`, `who.seal`):
//            the page clamps the ring's copy of the name apart (sealCap), so
//            every other probe leaves ring seats alone, and the seal's probes
//            leave every other seat alone.
// The name (`title`, `who.title`) is allowed EXTRA_LINES past the frame's.
// Block fields (`type: 'area'`, the quote and blurb columns) skip `lines`.
// The cap is the largest passing N under all three samples, the minimum over
// the widths (and layout 3's composed desktop column, where the section has one).
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import { headlessShell } from './headless-shell.mjs'
import * as D from '../src/builder/data.js'

const argv = process.argv.slice(2)
const opt = (k, d) => { const a = argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d }
const flag = (k) => argv.includes(`--${k}`)
const cats = (argv.find((a) => !a.startsWith('--')) || '').split(',').filter(Boolean)
if (!cats.length) { console.error('usage: node scripts/limits.mjs <cat[,cat]> [--themes=] [--keys=] [--check|--seeds]'); process.exit(1) }
const themes = opt('themes', '0,1,2,3,4').split(',').map(Number)
const keysOnly = opt('keys', '') ? opt('keys', '').split(',') : null
const widths = opt('widths', 'desktop,tablet,mobile').split(',')
const out = opt('out', '')
const base = process.env.BASE || 'http://localhost:5173'
// The Figma census (plans/char-limits/census/, FRAMES.md): per template and
// layout, the line count each seed string's box draws at each width.
const CENSUS_DIR = new URL('../../plans/char-limits/census/', import.meta.url)
const alnum = (t) => String(t).toLowerCase().replace(/[^a-z0-9]/g, '')
const CENSUS_SEEDS = (() => { try { return JSON.parse(fs.readFileSync(new URL('seeds.json', CENSUS_DIR))) } catch { return [] } })()
const SEED_IDX = new Map(CENSUS_SEEDS.map((x, i) => [x, i]))
const CENSUS = {}
const SECTIONS = {
  header: ['Hea'], bio: ['Bio', 'Tag'], media: ['Med', 'Vid'], gallery: ['Gal'], repertoire: ['Rep'],
  map: ['Eve'], pricing: ['Pri'], calendar: ['Boo'], form: ['Enq'], testimonials: ['Tes'], footer: ['Foo', 'Com'],
}
const WIDTHS = ['desktop', 'tablet', 'mobile']
// The lines Figma draws the seed `seed` in, for section `cat` of template
// `themeName` at design `design` and width `w`: its own section's box, else
// any section's (layout 3's narrow frames nest the composed sections), else null.
function censusLines(cat, themeName, design, w, seed) {
  const i = SEED_IDX.get(alnum(seed))
  if (i === undefined) return null
  const file = `${themeName}-${design}`
  if (!(file in CENSUS)) {
    try {
      const j = JSON.parse(fs.readFileSync(new URL(`${file}.json`, CENSUS_DIR)))
      CENSUS[file] = Object.values(j).map((str) => {
        const m = new Map()
        for (const e of str.split(' ').filter(Boolean)) {
          const [, idx, sec, lines] = e.match(/^(\d+)([A-Za-z?]{1,3})(?::(\d+))?/)
          const key = `${idx}|${sec}`
          m.set(key, Math.max(m.get(key) ?? 0, lines ? +lines : 1))
        }
        return m
      })
    } catch { CENSUS[file] = null }
  }
  const m = CENSUS[file]?.[WIDTHS.indexOf(w)]
  if (!m) return null
  const own = (SECTIONS[cat] ?? []).map((sec) => m.get(`${i}|${sec}`)).filter((n) => n != null)
  if (own.length) return Math.max(...own)
  const any = [...m].filter(([k]) => k.startsWith(`${i}|`)).map(([, n]) => n)
  return any.length ? Math.max(...any) : null
}
// A shrink seat's floor, as a fraction of its short-value font size, and the
// lines a seat may take past the frame's: the artist's name (the h1, the nav
// brand, the layout-3 card name and every consumer's display of it) may take
// one line more than the frame and shrink to 75% of the seed's size (session 1,
// user call, 2026-10-13). Every other seat keeps the frame's lines and size.
const FLOOR = { title: 0.75, 'who.title': 0.75 }
const EXTRA_LINES = { title: 1, 'who.title': 1 }

const SAMPLES = [
  'Kestrel nights and golden hour sets for weddings, parties and late shows across the city and the coast, with live sax, warm vinyl and a dance floor that stays full until the very last song of the evening. Every booking is planned around your guests, your venue and the music you love most, from the first dance to the final encore and the taxi home.',
  'Kestrel Sound brings soulful house, disco classics and modern pop to every room it plays, reading the crowd from the opening record and building the night slowly towards a big finish. Ask about acoustic sets for ceremonies, drinks receptions and quiet dinners, or a full band with lights and staging for festival stages and summer parties outdoors.',
  'Kestrel Booking is open most weekends from early spring right through winter for private hire, corporate events and charity nights, with travel included across the north west and fair rates further afield. Send a date, a rough guest count and the kind of evening you have in mind, and you will hear back within a day with a quote and a short plan.',
]
// --check adds a fourth, all lower-case (the plan's "three samples and an
// all-lowercase one").
const RUN_SAMPLES = flag('check') ? [...SAMPLES, SAMPLES[0].toLowerCase()] : SAMPLES
const textOf = (si, n) => RUN_SAMPLES[si].slice(0, n).replace(/\s+$/, (m) => 'x'.repeat(m.length))

// The text columns of each repeater, and the lists among them.
const COLS = {
  songs: { title: {}, artist: {}, length: {}, tags: { list: ',' } },
  sets: { mood: {}, length: {} },
  tracks: { title: {}, sub: {} },
  gigs: { venue: {}, city: {}, time: {}, month: {}, day: {} },
  slots: { kind: {}, price: {} },
  stats: { label: {}, value: {}, sub: {} },
  steps: { title: {}, sub: {} },
  tiers: { name: {}, price: {}, tags: { list: ',' }, blurb: { block: true }, feats: { list: '\n' } },
  formFields: { label: {}, placeholder: {} },
  quotes: { who: {}, quote: { block: true }, role: {}, when: {} },
  links: { label: {} },
}
const LISTS = { tags: ',', types: ',', rings: ',', promises: '\n' }
const SKIP = new Set(['image', 'images', 'url', 'email', 'date', 'select', 'booked'])

// The seed rows a repeater's column is probed in, EditPanel's resolvers. Tracks
// take their artwork in the page (photos.js imports images), filled in later.
function seedRows(cat, f, themeName, design) {
  switch (f.type) {
    case 'songs': return D.SONGS
    case 'gigs': return D.GIGS
    case 'tiers': return D.tiersSeed(themeName, design)
    case 'quotes': return D.QUOTES
    case 'links': return D.FOOTER_LINKS
    case 'slots': return D.CAL_SLOTS
    case 'stats': return D.MAP_STATS_4
    case 'steps': return D.FORM_STEPS
    case 'formFields': return design === 3 ? D.FORM_FIELDS_4 : design === 1 || design === 2 ? D.FORM_FIELDS_CARD : D.FORM_FIELDS
    case 'sets': return D.repSetsOf({})
    case 'tracks': return D.TRACKS.map(([name, dur, rel], i) => ({ title: name, sub: `${rel} · ${dur}`, image: `@art${i}`, audio: D.TRACK_AUDIO[i] ?? '' }))
    default: return null
  }
}

// Every probe a section's fields make: { key, cat, f, col?, list?, mode, block }.
function probesOf(cat) {
  const ps = []
  for (const f of D.FIELDS[cat] ?? []) {
    if (SKIP.has(f.type)) continue
    if (COLS[f.type]) {
      for (const [col, spec] of Object.entries(COLS[f.type])) {
        if (spec.list) {
          ps.push({ key: `${f.k}.${col}[]`, cat, f, col, list: spec.list, mode: 'item' })
          ps.push({ key: `${f.k}.${col}#`, cat, f, col, list: spec.list, mode: 'count' })
        } else ps.push({ key: `${f.k}.${col}`, cat, f, col, mode: 'text', block: !!spec.block })
      }
      continue
    }
    if (f.type === 'tracks' || f.type === 'songs') continue
    const list = f.list ?? LISTS[f.k]
    if (list) {
      ps.push({ key: `${f.k}[]`, cat, f, list, mode: 'item' })
      ps.push({ key: `${f.k}#`, cat, f, list, mode: 'count' })
    } else ps.push({ key: f.k, cat, f, mode: 'text', block: f.type === 'area' })
  }
  // The header's keys as the other sections print them.
  if (cat !== 'header') {
    for (const k of ['kicker', 'location']) ps.push({ key: `who.${k}`, cat, who: k, mode: 'text' })
    ps.push({ key: 'who.tags[]', cat, who: 'tags', list: ',', mode: 'item' })
    ps.push({ key: 'who.tags#', cat, who: 'tags', list: ',', mode: 'count' })
    ps.push({ key: 'who.title', cat, who: 'title', mode: 'text' })
    ps.push({ key: 'who.seal', cat, who: 'title', mode: 'text', ring: true })
  }
  return keysOnly ? ps.filter((p) => keysOnly.includes(p.key)) : ps
}

// The seed string of a probe's value, as the panel resolves it (fieldSeed).
function seedOf(p, themeName, design) {
  if (p.who === 'title') return 'Kai Mercer'
  if (p.who) return { kicker: 'DJ · Live Act', location: D.FIELDS.header.find((f) => f.k === 'location')?.d ?? '', tags: D.TAG_LABELS }[p.who]
  if (p.col) {
    const rows = seedRows(p.cat, p.f, themeName, design)
    const r0 = Array.isArray(rows) ? rows[0] : rows && Object.values(rows)[0]
    return String(r0?.[p.col] ?? '')
  }
  const v = D.fieldSeed({ cat: p.cat, f: p.f, themeName, design, artistName: 'Kai Mercer', email: D.FORM_EMAIL })
  return Array.isArray(v) ? v.join(p.list === '\n' ? '\n' : ', ') : String(v ?? '')
}

// The query that sets a probe's value to `v` (the whole string for text, the
// list for item / count modes).
function queryOf(p, themeName, design, v) {
  if (p.who === 'title') return `&name=${encodeURIComponent(v)}`
  if (p.who) return `&who=${encodeURIComponent(JSON.stringify({ [p.who]: v }))}`
  if (p.col) {
    const rows = seedRows(p.cat, p.f, themeName, design)
    let next
    if (Array.isArray(rows)) next = rows.map((r, i) => (i === 0 ? { ...(Array.isArray(r) ? {} : r), [p.col]: v } : r))
    else { const [k0] = Object.keys(rows); next = { ...rows, [k0]: { ...rows[k0], [p.col]: v } } }
    return `&cj=${encodeURIComponent(JSON.stringify({ [p.f.k]: next }))}`
  }
  return `&cj=${encodeURIComponent(JSON.stringify({ [p.f.k]: v }))}`
}
// The value at length n: the text, a list whose item 0 is the text, or a list
// of n items cut from the seed's own (cycled).
function valueAt(p, seed, si, n) {
  if (p.mode === 'text') return textOf(si, n)
  const items = seed.split(p.list).map((t) => t.trim()).filter(Boolean)
  const j = p.list === ',' ? ', ' : '\n'
  if (p.mode === 'item') return [textOf(si, n), ...items.slice(1)].join(j)
  const pool = items.length ? items : ['Kestrel']
  return Array.from({ length: n }, (_, i) => (i === 0 ? `Kestrel ${pool[0]}`.slice(0, Math.max(7, pool[0].length)) : pool[i % pool.length])).join(j)
}

// The strings a value's seat must hold: the whole text, list item 0, or every
// item of the list — compared with all whitespace dropped and lower-cased, so a
// face split into word spans or cased in JS still matches.
const squash = (t) => String(t).replace(/\s+/g, '').toLowerCase()
function needlesOf(p, v) {
  if (p.mode === 'text') return [squash(v)]
  const items = v.split(p.list).map((t) => t.trim()).filter(Boolean)
  return p.mode === 'item' ? [squash(items[0] ?? '')] : [...new Set(items.map(squash))]
}

// In the page: the seats holding every needle (the smallest such elements) and
// their measurements.
function measure(needles) {
  const root = document.getElementById('root').firstElementChild
  const R = root.getBoundingClientRect()
  const squash = (t) => t.replace(/\s+/g, '').toLowerCase()
  const all = [...root.querySelectorAll('*')]
  const holds = (el) => { const t = squash(el.textContent); return needles.every((n) => t.includes(n)) }
  const seats = all.filter((el) => holds(el) && ![...el.children].some(holds))
    .filter((el) => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden')
  const textRects = (n) => {
    const rg = document.createRange(); rg.selectNodeContents(n)
    return [...rg.getClientRects()].filter((r) => r.width > 0.5 && r.height > 0.5)
  }
  const inkOf = (el) => {
    const rects = []
    const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
    for (let n; (n = tw.nextNode());) if (n.nodeValue.trim()) rects.push(...textRects(n))
    return rects
  }
  // Text, image and control boxes, for the overlap test: an element's own text
  // lines, or its box when it is a picture or a control.
  const others = []
  for (const el of all) {
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || cs.display === 'none') continue
    const own = [...el.childNodes].filter((n) => n.nodeType === 3 && n.nodeValue.trim())
    const pic = ['IMG', 'SVG', 'VIDEO', 'CANVAS', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(el.tagName.toUpperCase())
      || /url\(/.test(cs.backgroundImage)
    if (own.length) others.push({ el, rs: own.flatMap(textRects) })
    else if (pic) others.push({ el, rs: [el.getBoundingClientRect()] })
  }
  const hit = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left))
    * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)) > 2
  const pathOf = (el) => {
    const p = []
    for (let e = el; e && e !== root; e = e.parentElement) p.push([...e.parentElement.children].indexOf(e))
    return p.reverse().join('.')
  }
  // A seal's ring (text on a circular path, set twice): each copy's span along
  // the path and the spans of the marks turning with it, in path length.
  const ringOf = (el) => {
    const text = el.closest('text')
    const tps = text ? [...text.querySelectorAll('textPath')] : []
    if (!tps.length) return null
    const path = text.ownerSVGElement.querySelector(tps[0].getAttribute('href'))
    if (!path) return null
    const P = path.getTotalLength()
    const anchor = getComputedStyle(text).textAnchor
    const spans = tps.map((tp) => {
      const o = parseFloat(tp.getAttribute('startOffset') || '0') / 100 * P
      const L = tp.getComputedTextLength()
      const a = anchor === 'middle' ? o - L / 2 : anchor === 'end' ? o - L : o
      return [a, a + L]
    })
    const pts = Array.from({ length: 720 }, (_, i) => { const t = (i / 720) * P; const q = path.getPointAtLength(t); return [t, q.x, q.y] })
    const marks = []
    for (const m of text.parentElement.querySelectorAll('circle, line, path, rect, polygon')) {
      if (m.contains(text)) continue
      const b = m.getBBox()
      const cx = b.x + b.width / 2, cy = b.y + b.height / 2, r = Math.max(b.width, b.height) / 2
      let best = pts[0], bd = Infinity
      for (const q of pts) { const d = (q[1] - cx) ** 2 + (q[2] - cy) ** 2; if (d < bd) { bd = d; best = q } }
      if (Math.sqrt(bd) <= r + 12) marks.push([best[0] - r, best[0] + r])
    }
    return { P, spans, marks }
  }
  const res = seats.map((el) => {
    const ink = inkOf(el)
    const tops = []
    for (const r of ink) if (!tops.some((t) => Math.abs(t - r.top) < r.height / 2)) tops.push(r.top)
    const boxes = []
    for (let a = el; a && a !== root.parentElement; a = a.parentElement) {
      const b = a.getBoundingClientRect(), cs = getComputedStyle(a)
      const clips = /hidden|clip/.test(cs.overflowX + cs.overflowY)
      const past = ink.some((r) => r.left < b.left - 0.5 || r.right > b.right + 0.5 || r.top < b.top - 0.5 || r.bottom > b.bottom + 0.5)
      const cut = clips && (a.scrollWidth > a.clientWidth + 1 || a.scrollHeight > a.clientHeight + 1)
      if (past || cut) boxes.push(pathOf(a))
    }
    // Another copy of the value on a seal's ring is the ring test's, not this one's.
    const overlaps = others.filter((o) => !el.contains(o.el) && !o.el.contains(el)
      && !(o.el.closest('svg') && seats.includes(o.el))
      && o.rs.some((r) => ink.some((k) => hit(r, k)))).map((o) => pathOf(o.el))
    const w = Math.round(el.getBoundingClientRect().width)
    return { path: pathOf(el), lines: tops.length, fs: parseFloat(getComputedStyle(el).fontSize), w, boxes, overlaps,
      svg: !!el.closest('svg'), ring: ringOf(el) }
  })
  return { seats: res, page: root.scrollWidth > Math.ceil(R.width) + 1 }
}

const browser = await puppeteer.launch({ executablePath: headlessShell(), headless: 'shell' })
const pages = await Promise.all(Array.from({ length: 6 }, async () => {
  const pg = await browser.newPage(); await pg.setViewport({ width: 1300, height: 900 }); return pg
}))
async function render(pg, q, needles) {
  for (let attempt = 0; ; attempt++) {
    try {
      await pg.goto(`${base}/preview.html?${q}&noclamp=1`, { waitUntil: 'load' })
      await pg.evaluate(() => document.fonts.ready)
      // A render that throws leaves #root empty: that length fails as 'crash'.
      const drawn = await pg.waitForFunction(() => document.getElementById('root')?.firstElementChild, { timeout: 10000 })
        .then(() => true, () => false)
      if (!drawn) return { seats: [], page: false, crash: true }
      return await pg.evaluate(measure, needles)
    } catch (e) {
      if (attempt >= 2 || !/context was destroyed|navigat|detached/i.test(e.message)) throw e
      await new Promise((r) => setTimeout(r, 1000))
    }
  }
}
// The tracks' seeded artwork, per theme, out of photos.js in the page.
const ART = {}
async function artOf(themeName) {
  if (ART[themeName]) return ART[themeName]
  await pages[0].goto(`${base}/preview.html?cat=media&arch=0`, { waitUntil: 'load' })
  ART[themeName] = await pages[0].evaluate(async (t) => {
    const p = await import('/src/builder/photos.js'); return p.defaultTrackArt('media', t) ?? []
  }, themeName)
  return ART[themeName]
}
const dressArt = (q, art) => q.replace(/%22%40art(\d)%22/g, (_, i) => encodeURIComponent(JSON.stringify(art[+i] ?? null)))

// The designs a probe runs at: those that read the field (fieldReach), the
// header's shared keys only where the header draws them.
const designsOf = (p, themeName) => {
  const n = D.designCount(p.cat, themeName) || 1
  return Array.from({ length: n }, (_, a) => a).filter((a) => !p.f || D.fieldReach(p.f, themeName, a))
}
// The surfaces a design renders at: each width, plus layout 3's composed column.
const COLUMN = { bio: 'left', media: 'left', calendar: 'right' }
const surfacesOf = (cat, a) => widths.flatMap((w) => (w === 'desktop' && a === 2 && COLUMN[cat]
  ? [{ w, col: '' }, { w, col: COLUMN[cat] }] : [{ w, col: '' }]))

// One surface's verdict on length n: null for a pass, else the failing test.
function verdict(m, ref, allowed, p) {
  if (m.crash) return 'crash'
  if (!m.seats.length) return 'unseen'
  if (m.page && !ref.page) return 'page'
  const ringProbe = p.ring || p.key === 'badgeText'
  if (ringProbe && !m.seats.some((s) => s.ring)) return 'unseen'
  for (const [i, s] of m.seats.entries()) {
    const r = ref.seats[i] ?? ref.seats[0]
    // A seal's ring: no copy runs off its path, the copies never meet, and no
    // copy meets a mark it did not meet at the reference. Its seats take no
    // other test (their boxes are an arc's bounding box), and only the seal's
    // own probes read them.
    if (ringProbe !== !!(s.svg && s.ring)) continue
    if (s.svg) {
      if (!s.ring) continue
      const rr = (ref.seats.find((x) => x.path === s.path) ?? r).ring
      const meet = (a, b) => Math.min(a[1], b[1]) - Math.max(a[0], b[0]) > 0.3
      if (s.ring.spans.some((sp) => sp[0] < -0.5 || sp[1] > s.ring.P + 0.5)) return 'ring off-path'
      for (let a = 0; a < s.ring.spans.length; a++) for (let b = a + 1; b < s.ring.spans.length; b++) {
        if (meet(s.ring.spans[a], s.ring.spans[b])) return 'ring copies'
      }
      for (const [ci, sp] of s.ring.spans.entries()) for (const [mi, mk] of s.ring.marks.entries()) {
        if (meet(sp, mk) && !(rr?.spans[ci] && rr?.marks[mi] && meet(rr.spans[ci], rr.marks[mi]))) return 'ring mark'
      }
      continue
    }
    // A seat may keep the reference's own line count where that is more than
    // the census allows (a seed that already wraps is reported, not failed).
    const lim = allowed == null ? null : Math.max(allowed + (EXTRA_LINES[p.key] ?? 0), r.lines)
    if (!p.block && lim != null && s.lines > lim) return `lines ${s.lines}>${lim}`
    // A seat's own box is 'self' on both sides, so a value whose seat is a
    // word span inside the reference's seat (a one-word name in a two-word
    // h1) is not failed for the path having moved.
    const refBoxes = r.boxes.map((b) => (b === r.path ? 'self' : b))
    if (s.boxes.some((b) => !refBoxes.includes(b === s.path || b === r.path ? 'self' : b))) return 'box'
    if (s.overlaps.some((o) => !r.overlaps.includes(o))) return 'overlap'
    if (s.fs < r.fs * (FLOOR[p.key] ?? 1) - 0.01) return `shrink ${s.fs}<${r.fs}`
  }
  return null
}

// A seed's measure in the probe's unit: characters, its longest item, or items.
const seedLenOf = (p, seed) => (p.mode === 'text' ? seed.length
  : p.mode === 'item' ? Math.max(0, ...seed.split(p.list).map((x) => x.trim().length))
  : seed.split(p.list).filter((x) => x.trim()).length)

const rows = []
const jsonl = out ? fs.createWriteStream(out, { flags: 'a' }) : null
async function runProbe(pg, p, t) {
  const themeName = D.THEMES[t].name
  for (const a of designsOf(p, themeName)) {
    const seed = seedOf(p, themeName, a)
    const capNow = p.ring ? D.sealCap(p.cat, themeName, a)
      : p.who ? D.identityCap(p.who, [{ cat: p.cat, arch: a }], themeName)
      : p.col ? D.colCaps(p.f, themeName, a)?.[p.col] : D.fieldCap(p.f, themeName, a)
    const perSurface = {}
    let unseen = true
    for (const { w, col } of surfacesOf(p.cat, a)) {
      const qBase = `cat=${p.cat}&arch=${a}&theme=${t}&w=${w}${col ? `&column=${col}` : ''}`
      const art = p.f?.type === 'tracks' ? await artOf(themeName) : null
      const q = (v) => (art ? dressArt(qBase + queryOf(p, themeName, a, v), art) : qBase + queryOf(p, themeName, a, v))
      const at = (si, n) => { const v = valueAt(p, seed, si, n); return render(pg, q(v), needlesOf(p, v)) }
      // The reference every test is against: the seed's own render (the
      // frame's copy, so its look is the frame's), or a short value's where
      // the seed is empty or does not print.
      const sq = art ? dressArt(qBase + queryOf(p, themeName, a, seed), art) : qBase + queryOf(p, themeName, a, seed)
      const sm = seed.trim() ? await render(pg, sq, needlesOf(p, seed)) : null
      const ref = sm?.seats.length ? sm : await at(0, p.mode === 'count' ? 1 : 7)
      // A seal's probe needs a ring at the reference; any other, a seat.
      const seen = p.ring || p.key === 'badgeText' ? ref.seats.some((x) => x.ring) : ref.seats.length
      if (!seen) { perSurface[`${w}${col ? `/${col}` : ''}`] = { n: null, why: 'unseen' }; continue }
      unseen = false
      const censusSeed = p.mode === 'item' ? seed.split(p.list)[0].trim() : seed
      let allowed = p.mode === 'count' ? null : censusLines(p.cat, themeName, a, w, censusSeed)
      const fromCensus = allowed != null
      // With no census entry, the reference's own line count.
      if (allowed == null && !p.block) allowed = Math.max(...ref.seats.map((s) => s.lines))
      const seedW = sm?.seats.length ? Math.max(...sm.seats.map((s) => s.w)) : null
      const seedLines = sm?.seats.length ? Math.max(...sm.seats.filter((x) => !x.svg).map((x) => x.lines), 0) : null
      const ok = async (n) => {
        for (let si = 0; si < RUN_SAMPLES.length; si++) {
          if (p.mode === 'count' && si > 0) break
          if (verdict(await at(si, n), ref, allowed, p)) return false
        }
        return true
      }
      const label = `${w}${col ? `/${col}` : ''}`
      if (flag('check')) {
        if (capNow?.chars == null && capNow?.count == null) continue
        const n = p.mode === 'count' ? capNow.count : capNow.chars
        if (n == null) continue
        // A cap at the seed's own length is the frame's floor (its own string
        // fits where prose of that length may not): reported, not failed.
        perSurface[label] = { n, why: (await ok(n)) ? 'ok' : n <= seedLenOf(p, seed) ? 'floor' : 'FAIL' }
        continue
      }
      // Bisect: the largest n in [1, hi] that passes. The upper bound starts
      // near the seed and doubles to 400 (16 items).
      const top = p.mode === 'count' ? 16 : 400
      let lo = 1, hi = Math.min(top, Math.max(p.mode === 'count' ? 8 : 48, 2 * seedLenOf(p, seed)))
      while (await ok(hi)) {
        lo = hi
        if (hi >= top) break
        hi = Math.min(top, hi * 2)
      }
      if (lo >= top) { perSurface[label] = { n: top, why: 'open', allowed, census: fromCensus }; continue }
      while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (await ok(mid)) lo = mid; else hi = mid }
      // Confirm against non-monotonic wraps: step down until the length and
      // the two below it all pass (a longer value can fit where a shorter one
      // does not, when its widest word shrinks a fitted head).
      for (let first = true; lo > 1; lo--, first = false) {
        if ((first || (await ok(lo))) && (lo <= 2 || ((await ok(lo - 1)) && (await ok(lo - 2))))) break
      }
      const why = verdict(await at(0, lo + 1), ref, allowed, p)
      // How wide the seat has grown at the cap, against the seed's: a one-line
      // pill that passes every test at five times its frame width is a call for
      // the section's session, not a cap to take as read.
      const capM = await at(0, lo)
      const capW = capM.seats.length ? Math.max(...capM.seats.map((x) => x.w)) : null
      perSurface[label] = { n: lo, why: why ?? 'samples', allowed, census: fromCensus, seedLines,
        grow: seedW && capW ? +(capW / seedW).toFixed(2) : null }
    }
    const ns = Object.values(perSurface).map((s) => s.n).filter((n) => n != null)
    const row = { key: `${p.cat}.${p.key}`, theme: themeName, design: a, seedLen: seedLenOf(p, seed),
      cap: unseen ? null : ns.length ? Math.min(...ns) : null, surfaces: perSurface }
    rows.push(row)
    jsonl?.write(`${JSON.stringify(row)}\n`)
    const fmt = Object.entries(perSurface).map(([k, v]) => `${k} ${v.n ?? '–'}${v.why && v.why !== 'samples' ? ` (${v.why})` : ''}`
      + `${v.grow ? ` ×${v.grow}` : ''}${v.census && v.seedLines > v.allowed ? ` [seed ${v.seedLines} lines, frame ${v.allowed}]` : ''}`).join(' · ')
    console.log(`${row.key} | ${themeName} | layout ${a + 1} | seed ${row.seedLen} | cap ${row.cap ?? '–'} | ${fmt}`)
  }
}

if (flag('seed-list')) {
  // The strings the Figma census matches against (census/seeds.json): every
  // seed a field, column or list item can show, and each of its list items.
  const set = new Set()
  const add = (v) => {
    if (v == null) return
    if (Array.isArray(v)) return v.forEach(add)
    if (typeof v === 'object') return Object.values(v).forEach(add)
    if (typeof v !== 'string') return
    for (const part of [v, ...v.split(/,|\n/)]) { const a = alnum(part); if (a.length >= 3) set.add(a) }
  }
  for (const t of D.THEMES) for (const cat of Object.keys(D.FIELDS)) {
    const n = D.designCount(cat, t.name) || 1
    for (let d = 0; d < n; d++) for (const f of D.FIELDS[cat]) {
      add(D.fieldSeed({ cat, f, themeName: t.name, design: d, artistName: 'Kai Mercer', email: D.FORM_EMAIL }))
    }
    for (let d = 0; d < 4; d++) add(D.tiersSeed(t.name, d))
  }
  add([D.SONGS, D.GIGS, D.QUOTES, D.FOOTER_LINKS, D.CAL_SLOTS, D.MAP_STATS_4, D.FORM_STEPS, D.FORM_FIELDS,
    D.FORM_FIELDS_CARD, D.FORM_FIELDS_4, D.repSetsOf({}), D.TRACKS, 'Kai Mercer', 'DJ · Live Act', D.TAG_LABELS])
  console.log(JSON.stringify([...set]))
  process.exit(0)
}

if (flag('seeds')) {
  // No browser: every seed against its own cap.
  let bad = 0
  for (const cat of cats) for (const p of probesOf(cat)) for (const t of themes) {
    const themeName = D.THEMES[t].name
    for (const a of designsOf(p, themeName)) {
      const cap = p.ring ? D.sealCap(p.cat, themeName, a)
        : p.who ? D.identityCap(p.who, [{ cat: p.cat, arch: a }], themeName)
        : p.col ? D.colCaps(p.f, themeName, a)?.[p.col] : D.fieldCap(p.f, themeName, a)
      if (!cap) continue
      const seed = seedOf(p, themeName, a)
      if (D.capExcess(seed, p.mode === 'text' ? { chars: cap.chars } : { ...cap, list: p.list }) > 0) {
        bad++; console.log(`SEED OVER  ${cat}.${p.key} | ${themeName} | layout ${a + 1} | ${JSON.stringify(seed)} vs ${JSON.stringify(cap)}`)
      }
    }
  }
  console.log(`${bad} seeds over their caps`)
  await browser.close()
  process.exit(bad ? 1 : 0)
}

const jobs = []
for (const cat of cats) for (const p of probesOf(cat)) for (const t of themes) jobs.push({ p, t })
let next = 0
await Promise.all(pages.map(async (pg) => {
  while (next < jobs.length) { const { p, t } = jobs[next++]; await runProbe(pg, p, t) }
}))
await browser.close()
jsonl?.end()
if (flag('check')) {
  const fails = rows.filter((r) => Object.values(r.surfaces).some((s) => s.why === 'FAIL'))
  console.log(`${fails.length} capped fields fail at their cap`)
  process.exit(fails.length ? 1 : 0)
}
