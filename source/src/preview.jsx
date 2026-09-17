// Throwaway harness for fitting a section to its Figma frame. Renders one
// section at one canvas width with no editor chrome, so a screenshot lines up
// with the frame. Not part of the app; not committed.
//
//   /preview.html?cat=bio&arch=1&w=desktop
import { createRoot } from 'react-dom/client'
import './index.css'
import { sectionVm } from './builder/EncoreBuilder.jsx'
import EncoreSection from './builder/EncoreSection.jsx'

// A hand copy of EncoreBuilder's SIZES + RAMP + RAMP_REST + WIDE. Theme ramps
// (THEME_RAMP) are not copied: sectionVm lays them over this by `dev`.
const Z = {
  desktop: {
    dev: 'desktop',
    h1: '86px', h1b: '118px', h2: '46px', pad: '80px 64px', navGap: '64px',
    split: '1.05fr 1fr', g3: '1fr 1fr 1fr', g2: '1fr 1fr', canvasW: '1180px',
    dispXl: '105px', dispLg: '79px', dispSm: '33px', title: '20px',
    labelMd: '16px', labelXs: '14px', eyebrow: '12px', gPad: '46px', gGap: '36px',
    padY: '80px', padX: '64px', narrow: false,
    dispMd: '39px', list: '13px', labelLg: '20px', labelSm: '13px', bodyLg: '13px', bodyMd: '11px', bodySm: '10px', chip: '10px',
    surplus: '0px', heroH: 614,
  },
  tablet: {
    dev: 'tablet',
    h1: '60px', h1b: '78px', h2: '36px', pad: '56px 40px', navGap: '48px',
    split: '1fr 1fr', g3: '1fr 1fr 1fr', g2: '1fr 1fr', canvasW: '768px',
    dispXl: '77px', dispLg: '64px', dispSm: '34px', title: '22px',
    labelMd: '14px', labelXs: '14px', eyebrow: '13px', gPad: '32px', gGap: '28px',
    padY: '56px', padX: '40px', narrow: true,
    dispMd: '38px', list: '12px', labelLg: '16px', labelSm: '13px', bodyLg: '15px', bodyMd: '13px', bodySm: '12px', chip: '11px',
    surplus: '0px', heroH: 1024,
  },
  mobile: {
    dev: 'mobile',
    h1: '42px', h1b: '50px', h2: '29px', pad: '44px 22px', navGap: '36px',
    split: '1fr', g3: '1fr', g2: '1fr', canvasW: '390px',
    dispXl: '77px', dispLg: '40px', dispSm: '26px', title: '18px',
    labelMd: '14px', labelXs: '14px', eyebrow: '11px', gPad: '20px', gGap: '18px',
    padY: '44px', padX: '22px', narrow: true,
    dispMd: '30px', list: '13px', labelLg: '14px', labelSm: '12px', bodyLg: '15px', bodyMd: '13px', bodySm: '12px', chip: '11px',
    surplus: '0px', heroH: 844,
  },
}

const q = new URLSearchParams(location.search)
const cat = q.get('cat') || 'bio'
const arch = Number(q.get('arch') ?? 1)
const device = q.get('w') || 'desktop'
const themeIdx = Number(q.get('theme') ?? 0)

const navSections = [
  { cat: 'header', label: 'Header' }, { cat: 'bio', label: 'About' },
  { cat: 'media', label: 'Top tracks' }, { cat: 'pricing', label: 'Pricing' },
  { cat: 'calendar', label: 'Booking Calendar' }, { cat: 'form', label: 'Enquiries' },
]

// &n=8 fills the section's list-shaped content with n rows, to see a design
// hold at a count the seed does not reach (FIELDS.media.tracks allows 8). It
// fills the key the section under test actually reads — one entry per category
// whose layout 2 draws a list — so `&n=0` is also how an emptied list is seen.
const LIST = {
  // Every fourth title is long enough to make layout 3's row ellipsise one at
  // 390, where the master's own render hard-clips its shortest. No row can
  // ever show a running time under `&n=`: `sectionVm` gives an array-shaped
  // `c.tracks` row `dur === rel === sub`, because TracksField has no duration
  // column, and every layout drops the time where the two are equal. The
  // seeded five are the only duration check there is.
  media: (i) => ({
    title: i % 4 === 3 ? `Track number ${i + 1}, at about the length a real one runs to` : `Track ${i + 1}`,
    sub: 'Single',
  }),
  // Three tags cycling, so the chip row and the filter are exercised too — and
  // two rows that only layout 3 can see the point of, since it reads the tags as
  // a *grouping* rather than as a filter: every fifth song carries none, which
  // is what makes `repSets` append its All card, and every seventh carries two,
  // which is what puts one song in two set cards at once. Every fourth title and
  // artist are long enough to show the row's ellipsis on the 290px mobile card.
  repertoire: (i) => ({
    title: i % 4 === 3
      ? `Song number ${i + 1}, at about the length a real title runs to`
      : `Song number ${i + 1}`,
    artist: i % 4 === 3 ? `Artist number ${i + 1} and the Long Band Name` : `Artist ${i + 1}`,
    tags: i % 5 === 4 ? '' : i % 7 === 6 ? 'Weddings, Pubs' : ['Weddings', 'Pubs', 'Birthdays'][i % 3],
  }),
  // The gallery's list is its seven photograph slots, so a row is simply the
  // absence of a photograph: `&n=0` empties the array (every seat a
  // placeholder) and `&n=3` fills three, leaving slots 3-6 to fall back to the
  // section photo, which is layout 1's existing behaviour.
  gallery: () => null,
  // Two tags cycling, so layout 1's filter row still has something to filter,
  // and a feature count that is odd on half the rows — layout 2 lays them out
  // two to a grid row and the odd one trails a half-width cell.
  //
  // Every third feature is long enough to wrap. Layout 3's includes panel is a
  // single 248px column at 768 and two columns of a third of the measure at
  // 390, and "Feature 3" never came near either edge — a grid that clipped
  // rather than wrapped would have shipped unseen.
  pricing: (i) => ({
    name: `Package ${i + 1}`, price: `£${(i + 1) * 250}`,
    tags: ['Solo', 'Band'][i % 2],
    blurb: 'What this one covers, in a sentence that runs to about this length.',
    feats: Array.from({ length: 3 + (i % 2) }, (_, j) => (
      j % 3 === 2 ? `Feature ${j + 1}, spelled out at the length a real one runs to` : `Feature ${j + 1}`
    )).join('\n'),
  }),
  // The events map's gigs. Every other row carries a tickets address, so one
  // `live=1` render shows both sides of the outbound seam at once — the ↗ on
  // the rows that have one, and the Venue Link pill flipping between a span and
  // an anchor as a linked and an unlinked gig is featured.
  map: (i) => ({
    venue: `Venue number ${i + 1}`, city: ['Manchester', 'Leeds', 'Glasgow'][i % 3],
    time: i % 4 === 3 ? '' : `${19 + (i % 4)}:00`,
    month: ['Jul', 'Aug', 'Sep'][i % 3], day: String(4 + i * 2).padStart(2, '0'),
    link: i % 2 ? 'example.com/tickets' : '',
  }),
  // The calendar's slot list. Dates step a day at a time from CAL_OPEN, so the
  // first row is still the one `calPick` cues and every row parses.
  calendar: (i) => ({
    date: `2025-06-${String(12 + i).padStart(2, '0')}`,
    kind: ['Evening', 'Full day', 'Late', 'Wedding'][i % 4],
    price: `From £${(i + 1) * 400}`,
  }),
  // The enquiry form's boxes. All three kinds cycle, so one `live=1` render
  // exercises the whole submit seam at once: `formErrors` refuses an empty box
  // of any kind *and* a malformed address, `number` takes inputMode and not
  // type="number", and the composed mailto zips every label onto its value.
  // Every fourth label is long enough to test what a 999px pill does with one.
  form: (i) => ({
    label: i % 4 === 3 ? `Anything else about box ${i + 1}` : `Field ${i + 1}`,
    placeholder: `Placeholder ${i + 1}`,
    kind: ['text', 'email', 'number'][i % 3],
  }),
  // The testimonials' reviews. Every third row drops its role and its date, so
  // one render shows the card's foot with both halves, with the name alone and
  // with nothing at all; every fourth names an ampersanded couple, which is the
  // frame's own "Sarah & Tom" and the case that would mark the rail's tile
  // "S&" if `mark` split on whitespace alone; and every fifth has no name, so
  // the tile falls back to the row's number. The fifth drops its **role** too,
  // or the two would first empty together at row 15 — past `max: 8` — and
  // layout 3's bare cell (a review with no attribution at all, which is what
  // the bento wall's quote-only cards are) would never render.
  testimonials: (i) => ({
    quote: `Review number ${i + 1}. ${'They read the room and kept it moving. '.repeat(1 + (i % 3))}`,
    who: i % 5 === 4 ? '' : i % 4 === 3 ? `Sarah & Tom ${i + 1}` : `Reviewer ${i + 1}`,
    role: i % 3 === 2 || i % 5 === 4 ? '' : `Venue manager ${i + 1}`,
    when: i % 3 === 2 ? '' : `Reviewed ${i + 1} weeks ago`,
  }),
  // The footer's sitemap. The eighth of every eight rows is an address rather
  // than a section, so `live=1` renders one `target="_blank"` link; the rest
  // cycle through sections the harness's page carries. An odd count leaves the
  // second column one short, and `&n=0` is the pill standing alone.
  footer: (i) => ({
    label: `Link ${i + 1}`,
    to: ['bio', 'media', 'repertoire', 'map', 'pricing', 'calendar', 'form', 'link'][i % 8],
    url: i % 8 === 7 ? 'example.com' : '',
  }),
}
const KEY = {
  media: 'tracks', repertoire: 'songs', gallery: 'images',
  pricing: 'tiers', calendar: 'slots', map: 'gigs', form: 'fields', testimonials: 'quotes',
  footer: 'links',
}
const count = q.get('n') === null ? null : Number(q.get('n'))
const rows = count === null || !LIST[cat]
  ? null
  : Array.from({ length: count }, (_, i) => LIST[cat](i))
const c = rows === null
  ? {}
  : { [KEY[cat]]: rows }

// &booked=2025-06-14,2025-06-20 blocks those dates. It is the one calendar
// state neither seed shows — CAL_BOOKED is empty on purpose — and it reaches
// both layouts: the struck cell in the month, and the dead row in the slot list.
if (q.get('booked')) c.booked = q.get('booked').split(',')

// &open=2025-03-01 sets FIELDS.calendar.open, the one date the whole section is
// built from. CAL_OPEN's June 2025 starts on a Sunday and runs to five rows, so
// the seed is the one month that shows neither a leading blank nor a sixth row —
// both of which the grid has to draw, and layout 3 in particular, whose card
// height is the row count. March 2025 (lead 6, six rows) is the far end of it.
if (q.get('open')) c.open = q.get('open')

// &since=June%202021 fills FIELDS.bio.since, which has no default on purpose —
// so it is the only way to see the bio's layout-3 ID card at the three stat
// columns its frame draws, which is where its head row runs out of room.
if (q.get('since')) c.since = q.get('since')

// &promises=A|B|C fills FIELDS.form.promises, the enquiry form's other
// list-shaped content — a newline-delimited *string*, like `&tags=`' commas, so
// `&n=` (which fills `c.fields`) can never reach it. The pipes are the URL's:
// a raw newline in a query string is not worth the escaping. `&promises=` with
// nothing after it is the emptied state, which layout 3 renders as a card that
// ends on its pill and layout 4 as a form with no right-hand column at all.
if (q.get('promises') !== null) c.promises = q.get('promises').split('|').join('\n')

// &noimage=1 writes `null` to FIELDS.*.image, which is what Remove writes, so a
// full-bleed slot draws `Photo`'s `backdrop` instead of the seeded photograph.
// Neither seeded theme shows that empty state any other way.
if (q.get('noimage') === '1') c.image = null

// &cj=<url-encoded JSON> merges an object into `c`, last, so it wins over every
// key above. It is how arbitrary content is seen without a named parameter for
// each — a 40-character venue is `&cj=` + encodeURIComponent(JSON.stringify(
// { gigs: [{ venue: '…', city: 'Leeds' }] })). Rows it supplies are whole rows:
// nothing is merged into the seeded ones.
if (q.get('cj')) Object.assign(c, JSON.parse(q.get('cj')))

// &live=1 renders the section as the published page does, so the controls that
// are gated on `s.live` can be exercised with a real click here rather than by
// driving the editor and its popup.
// &column=left | right renders the section as layout 3's composed desktop row
// stands it (`pageRows` / `arrangeRows`): built with `sectionVm({ column })`,
// which drops its horizontal padding, in a wrapper the column's own width
// (684 / 323). Desktop only — the narrow frames never compose.
const column = device === 'desktop' ? q.get('column') || undefined : undefined
const s = sectionVm({
  // &name=Poppy%20Jaeggy is how a display slot is checked against descenders
  // and a longer string — the seeded "Kai Mercer" has neither.
  themeIdx, cat, arch, c, artistName: q.get('name') || 'Kai Mercer',
  Z: Z[device], mob: device === 'mobile', live: q.get('live') === '1', navSections,
  ...(column ? { column } : null),
})

createRoot(document.getElementById('root')).render(
  <div style={{ width: column ? s.contentW : Z[device].canvasW, margin: '0 auto' }}>
    <EncoreSection s={s} />
  </div>,
)
