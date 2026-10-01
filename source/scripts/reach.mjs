// Field-reach probe: which designs read a key. For each probe it renders the
// preview harness with and without a sentinel and reports the designs whose
// #root HTML moved — the measurement FIELDS' `in` and the identity hints are
// written from (CLAUDE.md, the FIELDS bullet; JP-042, JP-037). Needs
// `npm run dev` on :5173.
//
//   node scripts/reach.mjs [themes=0,1,2]    (theme 3 is Editorial)
//
// A probe is { name, cats, param: 'cj' | 'who' | 'tiers', value, base? }: `cj` types into
// the section's own content, `who` into the header's identity as every other
// section reads it. `base` is the comparison's other side, where an absent key
// is not it (showTags hidden against shown). A hit is reported as the renders
// of a design that moved out of its six (three widths × canvas and live).
import puppeteer from 'puppeteer-core'
import { headlessShell } from './headless-shell.mjs'

const themes = (process.argv[2] || '0,1,2').split(',').map(Number)
const CATS = { header: 6, bio: 4, media: 4, pricing: 4, repertoire: 4, gallery: 4, calendar: 4, map: 4, testimonials: 4, form: 4, footer: 1 }
const OTHERS = Object.keys(CATS).filter((c) => c !== 'header')
const Z = 'ZZSENTINEL'
const PROBES = [
  { name: 'who.kicker', cats: OTHERS, param: 'who', value: { kicker: Z } },
  { name: 'who.location', cats: OTHERS, param: 'who', value: { location: Z } },
  { name: 'who.tags', cats: OTHERS, param: 'who', value: { tags: Z } },
  { name: 'who.showTags=hide', cats: OTHERS, param: 'who', value: { showTags: 'hide' } },
  // The header's own `in` rows (the sweeps of Grunge and Editorial layout 1
  // measured their rows with these; each layout pass re-measures its card).
  { name: 'header.kicker', cats: ['header'], param: 'cj', value: { kicker: Z } },
  { name: 'header.subtitle', cats: ['header'], param: 'cj', value: { subtitle: Z } },
  { name: 'header.location', cats: ['header'], param: 'cj', value: { location: Z } },
  { name: 'header.cta2', cats: ['header'], param: 'cj', value: { cta2: Z } },
  { name: 'header.showBadge=hide', cats: ['header'], param: 'cj', value: { showBadge: 'hide' } },
  { name: 'header.badgeText', cats: ['header'], param: 'cj', value: { badgeText: Z } },
  { name: 'header.align=centre', cats: ['header'], param: 'cj', value: { align: 'centre' } },
  { name: 'header.tags', cats: ['header'], param: 'cj', value: { tags: Z } },
  { name: 'header.showTags=hide', cats: ['header'], param: 'cj', value: { showTags: 'hide' } },
  { name: 'header.heroCta', cats: ['header'], param: 'cj', value: { heroCta: Z } },
  // JP-059: the rest of layout 2's copy — the pill over the name, the two
  // cards under the photograph, and the bio card's pill.
  { name: 'header.availability', cats: ['header'], param: 'cj', value: { availability: Z } },
  { name: 'header.faceTitle', cats: ['header'], param: 'cj', value: { faceTitle: Z } },
  { name: 'header.faceBody', cats: ['header'], param: 'cj', value: { faceBody: Z } },
  { name: 'header.placeBody', cats: ['header'], param: 'cj', value: { placeBody: Z } },
  // JP-061: the layout-3 portrait card's line, which was the kicker's there.
  { name: 'header.cardLine', cats: ['header'], param: 'cj', value: { cardLine: Z } },
  { name: 'bio.credit', cats: ['bio'], param: 'cj', value: { credit: Z } },
  { name: 'bio.cta', cats: ['bio'], param: 'cj', value: { cta: Z } },
  { name: 'bio.tag', cats: ['bio'], param: 'cj', value: { tag: Z } },
  // JP-082: layout 4's Listen link, on the key the bio already read.
  { name: 'bio.cta2', cats: ['bio'], param: 'cj', value: { cta2: Z } },
  { name: 'map.status', cats: ['map'], param: 'cj', value: { status: Z } },
  { name: 'map.updated', cats: ['map'], param: 'cj', value: { updated: Z } },
  { name: 'map.rings', cats: ['map'], param: 'cj', value: { rings: Z } },
  { name: 'map.expand', cats: ['map'], param: 'cj', value: { expand: Z } },
  // JP-060: the coverage every design prints, once each — layouts 1–3 since
  // JP-077 took layout 4's wall to `stats`, which took `base` and `terms` too.
  { name: 'map.radius', cats: ['map'], param: 'cj', value: { radius: Z } },
  { name: 'map.base', cats: ['map'], param: 'cj', value: { base: Z } },
  { name: 'map.terms', cats: ['map'], param: 'cj', value: { terms: Z } },
  { name: 'map.stats', cats: ['map'], param: 'cj', value: { stats: [{ label: Z, value: Z, sub: Z }] } },
  // JP-054: layout 4's small-caps line, and the button whose default moved there.
  { name: 'form.sub', cats: ['form'], param: 'cj', value: { sub: Z } },
  { name: 'form.button', cats: ['form'], param: 'cj', value: { button: Z } },
  // JP-082: the message box's label, the one box label that was a literal.
  { name: 'form.messageLabel', cats: ['form'], param: 'cj', value: { messageLabel: Z } },
  // JP-079: layout 4's steps, and the promises they took the column from.
  { name: 'form.steps', cats: ['form'], param: 'cj', value: { steps: [{ title: Z, sub: Z }] } },
  { name: 'form.promises', cats: ['form'], param: 'cj', value: { promises: Z } },
  // JP-052: the calendar keys whose seats moved when layout 4's column became
  // the wizard's summary, and the Pricing packages it reads across sections.
  // `cta` is layout 4's Send Enquiry again since JP-082.
  { name: 'calendar.cta', cats: ['calendar'], param: 'cj', value: { cta: Z } },
  // Editorial layout 1, section 8: the scheduler's head, under each template.
  { name: 'calendar.heading', cats: ['calendar'], param: 'cj', value: { heading: Z } },
  { name: 'calendar.time', cats: ['calendar'], param: 'cj', value: { time: Z } },
  { name: 'calendar.open', cats: ['calendar'], param: 'cj', value: { open: '2026-11-05' } },
  { name: 'calendar.image', cats: ['calendar'], param: 'cj', value: { image: 'https://example.test/zz.jpg' } },
  { name: 'calendar.types', cats: ['calendar'], param: 'cj', value: { types: Z } },
  { name: 'calendar.slots', cats: ['calendar'], param: 'cj', value: { slots: [{ date: '2025-06-12', kind: Z, price: Z }] } },
  { name: 'tiers', cats: ['calendar'], param: 'tiers', value: [{ name: Z, price: Z }] },
  // JP-076: the address layout 4's Send Enquiry mails, read off the pills' href.
  { name: 'calendar.email', cats: ['calendar'], param: 'cj', value: { email: 'zq@example.test' } },
  // JP-046: layout 3's offer line beside the pricing capsule.
  { name: 'pricing.offer', cats: ['pricing'], param: 'cj', value: { offer: Z } },
  // JP-065: layout 3's stat card, its rating and the stars beside its faces.
  { name: 'testimonials.rating', cats: ['testimonials'], param: 'cj', value: { rating: Z } },
  { name: 'testimonials.stars', cats: ['testimonials'], param: 'cj', value: { stars: Z } },
  // JP-070: every package's pill, layout 4's row pill until then.
  { name: 'pricing.rowCta', cats: ['pricing'], param: 'cj', value: { rowCta: Z } },
  // JP-071: eight frame labels made fields — the bio's ID-card labels and its
  // Genres line, media's "● Popular", and layout 3's map and testimonials eyebrows.
  { name: 'bio.sinceLabel', cats: ['bio'], param: 'cj', value: { sinceLabel: Z } },
  { name: 'bio.roleLabel', cats: ['bio'], param: 'cj', value: { roleLabel: Z } },
  { name: 'bio.baseLabel', cats: ['bio'], param: 'cj', value: { baseLabel: Z } },
  { name: 'bio.aboutLabel', cats: ['bio'], param: 'cj', value: { aboutLabel: Z } },
  { name: 'bio.tagsLabel', cats: ['bio'], param: 'cj', value: { tagsLabel: Z } },
  { name: 'media.listLabel', cats: ['media'], param: 'cj', value: { listLabel: Z } },
  { name: 'map.kicker', cats: ['map'], param: 'cj', value: { kicker: Z } },
  { name: 'testimonials.kicker', cats: ['testimonials'], param: 'cj', value: { kicker: Z } },
  // JP-090: four more — the bio's reference line, the map's gig-list label and
  // the form's chip-row label, and layout 1's eyebrow on `map.kicker` above.
  { name: 'bio.refLabel', cats: ['bio'], param: 'cj', value: { refLabel: Z } },
  { name: 'map.listLabel', cats: ['map'], param: 'cj', value: { listLabel: Z } },
  { name: 'form.typeLabel', cats: ['form'], param: 'cj', value: { typeLabel: Z } },
  // JP-095 (a): layout 2's labels — pricing's eyebrow and features label, the
  // calendar's column labels, media's fan chip and its counter's two words —
  // and `testimonials.kicker` above, re-scoped to layout 2. The prompt prints
  // only while no day is cued, which the clockless canvas never is, so both
  // sides block the cued day (CAL_OPEN).
  { name: 'pricing.kicker', cats: ['pricing'], param: 'cj', value: { kicker: Z } },
  { name: 'pricing.featsLabel', cats: ['pricing'], param: 'cj', value: { featsLabel: Z } },
  { name: 'calendar.dateLabel', cats: ['calendar'], param: 'cj', value: { dateLabel: Z } },
  { name: 'calendar.availLabel', cats: ['calendar'], param: 'cj', value: { availLabel: Z } },
  { name: 'calendar.prompt', cats: ['calendar'], param: 'cj',
    base: { booked: ['2025-06-12'] }, value: { booked: ['2025-06-12'], prompt: Z } },
  { name: 'media.chipLabel', cats: ['media'], param: 'cj', value: { chipLabel: Z } },
  { name: 'media.countLabel', cats: ['media'], param: 'cj', value: { countLabel: Z } },
  { name: 'media.totalLabel', cats: ['media'], param: 'cj', value: { totalLabel: Z } },
  // JP-095 (b) · JP-096: layout 2's travel card — the two locations' labels and
  // captions, the stat row's labels and the two pills — and `map.kicker` and
  // `map.listLabel` above, re-scoped to layout 2. The home value is the header's
  // location now, so `map.base` and `who.location` above moved too.
  { name: 'map.homeLabel', cats: ['map'], param: 'cj', value: { homeLabel: Z } },
  { name: 'map.homeCaption', cats: ['map'], param: 'cj', value: { homeCaption: Z } },
  { name: 'map.venueLabel', cats: ['map'], param: 'cj', value: { venueLabel: Z } },
  { name: 'map.venueCaption', cats: ['map'], param: 'cj', value: { venueCaption: Z } },
  { name: 'map.radiusLabel', cats: ['map'], param: 'cj', value: { radiusLabel: Z } },
  { name: 'map.travelTimeLabel', cats: ['map'], param: 'cj', value: { travelTimeLabel: Z } },
  { name: 'map.feeLabel', cats: ['map'], param: 'cj', value: { feeLabel: Z } },
  { name: 'map.venueCta', cats: ['map'], param: 'cj', value: { venueCta: Z } },
  { name: 'map.routeCta', cats: ['map'], param: 'cj', value: { routeCta: Z } },
  // JP-066: a song's length and layout 3's set details. The length is a column
  // of `songs`, so both sides carry the same one-song list and only the length
  // differs; the sets key a live tag, or nothing could move.
  { name: 'repertoire.songs.length', cats: ['repertoire'], param: 'cj',
    base: { songs: [{ title: 'Song', artist: 'Artist', tags: 'Weddings', length: '' }] },
    value: { songs: [{ title: 'Song', artist: 'Artist', tags: 'Weddings', length: Z }] } },
  { name: 'repertoire.sets', cats: ['repertoire'], param: 'cj', value: { sets: { weddings: { mood: Z, length: Z } } } },
  // JP-070 (rest): layout 3's intro line, seeded with the frame's second sentence.
  { name: 'pricing.intro', cats: ['pricing'], param: 'cj', value: { intro: Z } },
  // JP-069: a gig's year, printed nowhere and read only as layout 3's weekday,
  // so both sides carry one gig and only a real year against none differs.
  { name: 'map.gigs.year', cats: ['map'], param: 'cj',
    base: { gigs: [{ venue: 'Venue', city: 'City', time: '22:00', month: 'Jul', day: '12', year: '', link: '' }] },
    value: { gigs: [{ venue: 'Venue', city: 'City', time: '22:00', month: 'Jul', day: '12', year: '2025', link: '' }] } },
]
const base = process.env.BASE || 'http://localhost:5173'
const browser = await puppeteer.launch({ executablePath: headlessShell(), headless: 'shell' })
const html = async (page, q) => {
  for (let attempt = 0; ; attempt++) {
    try {
      await page.goto(`${base}/preview.html?${q}`, { waitUntil: 'load' })
      await new Promise((r) => setTimeout(r, 120))
      // useId differs between otherwise identical renders only if the tree does.
      return await page.evaluate(() => document.getElementById('root').innerHTML)
    } catch (e) {
      if (attempt >= 2 || !/context was destroyed|navigat/i.test(e.message)) throw e
      await new Promise((r) => setTimeout(r, 1000))
    }
  }
}
const jobs = []
for (const p of PROBES) for (const t of themes) for (const c of p.cats) for (let a = 0; a < CATS[c]; a++)
  for (const w of ['desktop', 'tablet', 'mobile']) for (const live of ['', '&live=1']) jobs.push({ p, t, c, a, w, live })
const hits = {}
let i = 0
const worker = async () => {
  const page = await browser.newPage()
  await page.setViewport({ width: 1300, height: 900 })
  while (i < jobs.length) {
    const { p, t, c, a, w, live } = jobs[i++]
    const q = `cat=${c}&arch=${a}&theme=${t}&w=${w}${live}`
    const enc = (v) => `&${p.param}=${encodeURIComponent(JSON.stringify(v))}`
    const moved = (await html(page, q + (p.base ? enc(p.base) : ''))) !== (await html(page, q + enc(p.value)))
    const k = `${p.name} | theme ${t} | ${c}`
    ;(hits[k] ??= {})[a] = ((hits[k] ?? {})[a] ?? 0) + (moved ? 1 : 0)
  }
  await page.close()
}
await Promise.all(Array.from({ length: 6 }, worker))
await browser.close()
for (const k of Object.keys(hits).sort()) {
  const row = Object.entries(hits[k]).filter(([, n]) => n).map(([a, n]) => `layout ${+a + 1}${n === 6 ? '' : ` (${n}/6)`}`)
  if (row.length) console.log(`${k}: ${row.join(', ')}`)
}
console.log(`${jobs.length * 2} renders`)
