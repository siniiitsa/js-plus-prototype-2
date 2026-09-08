// Throwaway harness for fitting a section to its Figma frame. Renders one
// section at one canvas width with no editor chrome, so a screenshot lines up
// with the frame. Not part of the app; not committed.
//
//   /preview.html?cat=bio&arch=1&w=desktop
import { createRoot } from 'react-dom/client'
import './index.css'
import { sectionVm } from './builder/EncoreBuilder.jsx'
import EncoreSection from './builder/EncoreSection.jsx'

const Z = {
  desktop: {
    h1: '86px', h1b: '118px', h2: '46px', pad: '80px 64px', navGap: '64px',
    split: '1.05fr 1fr', g3: '1fr 1fr 1fr', g2: '1fr 1fr', canvasW: '1180px',
    dispXl: '105px', dispLg: '79px', dispSm: '33px', title: '20px',
    labelMd: '16px', labelXs: '14px', eyebrow: '12px', gPad: '46px', gGap: '36px',
    padY: '80px', padX: '64px', narrow: false, surplus: '0px', heroH: 614,
  },
  tablet: {
    h1: '60px', h1b: '78px', h2: '36px', pad: '56px 40px', navGap: '48px',
    split: '1fr 1fr', g3: '1fr 1fr 1fr', g2: '1fr 1fr', canvasW: '768px',
    dispXl: '77px', dispLg: '64px', dispSm: '34px', title: '22px',
    labelMd: '14px', labelXs: '14px', eyebrow: '13px', gPad: '32px', gGap: '28px',
    padY: '56px', padX: '40px', narrow: true, surplus: '0px', heroH: 1024,
  },
  mobile: {
    h1: '42px', h1b: '50px', h2: '29px', pad: '44px 22px', navGap: '36px',
    split: '1fr', g3: '1fr', g2: '1fr', canvasW: '390px',
    dispXl: '77px', dispLg: '40px', dispSm: '26px', title: '18px',
    labelMd: '14px', labelXs: '14px', eyebrow: '11px', gPad: '20px', gGap: '18px',
    padY: '44px', padX: '22px', narrow: true, surplus: '0px', heroH: 844,
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
  media: (i) => ({ title: `Track ${i + 1}`, sub: 'Single' }),
  video: (i) => ({ title: `Video ${i + 1}`, sub: 'Live set', length: '03:50', when: 'April 2026' }),
  // Three tags cycling, so the chip row and the filter are exercised too.
  repertoire: (i) => ({
    title: `Song number ${i + 1}`, artist: `Artist ${i + 1}`,
    tags: ['Weddings', 'Pubs', 'Birthdays'][i % 3],
  }),
  // The gallery's list is its seven photograph slots, so a row is simply the
  // absence of a photograph: `&n=0` empties the array (every seat a
  // placeholder) and `&n=3` fills three, leaving slots 3-6 to fall back to the
  // section photo, which is layout 1's existing behaviour.
  gallery: () => null,
  // Two tags cycling, so layout 1's filter row still has something to filter,
  // and a feature count that is odd on half the rows — layout 2 lays them out
  // two to a grid row and the odd one trails a half-width cell.
  pricing: (i) => ({
    name: `Package ${i + 1}`, price: `£${(i + 1) * 250}`,
    tags: ['Solo', 'Band'][i % 2],
    blurb: 'What this one covers, in a sentence that runs to about this length.',
    feats: Array.from({ length: 3 + (i % 2) }, (_, j) => `Feature ${j + 1}`).join('\n'),
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
  // the tile falls back to the row's number.
  testimonials: (i) => ({
    quote: `Review number ${i + 1}. ${'They read the room and kept it moving. '.repeat(1 + (i % 3))}`,
    who: i % 5 === 4 ? '' : i % 4 === 3 ? `Sarah & Tom ${i + 1}` : `Reviewer ${i + 1}`,
    role: i % 3 === 2 ? '' : `Venue manager ${i + 1}`,
    when: i % 3 === 2 ? '' : `Reviewed ${i + 1} weeks ago`,
  }),
}
const KEY = {
  media: 'tracks', video: 'videos', repertoire: 'songs', gallery: 'images', pricing: 'tiers',
  calendar: 'slots', map: 'gigs', form: 'fields', testimonials: 'quotes',
}
const count = q.get('n') === null ? null : Number(q.get('n'))
const c = count === null || !LIST[cat]
  ? {}
  : { [KEY[cat]]: Array.from({ length: count }, (_, i) => LIST[cat](i)) }

// &booked=2025-06-14,2025-06-20 blocks those dates. It is the one calendar
// state neither seed shows — CAL_BOOKED is empty on purpose — and it reaches
// both layouts: the struck cell in the month, and the dead row in the slot list.
if (q.get('booked')) c.booked = q.get('booked').split(',')

// &live=1 renders the section as the published page does, so the controls that
// are gated on `s.live` can be exercised with a real click here rather than by
// driving the editor and its popup.
const s = sectionVm({
  themeIdx, cat, arch, c, artistName: 'Kai Mercer',
  Z: Z[device], mob: device === 'mobile', live: q.get('live') === '1', navSections,
})

createRoot(document.getElementById('root')).render(
  <div style={{ width: Z[device].canvasW, margin: '0 auto' }}>
    <EncoreSection s={s} />
  </div>,
)
