// §4 — Static data module. Pure data plus four helpers; no React.
// Every literal here is normative: do not round, substitute or "improve".

/* ------------------------------------------------------------------ *
 * §4.1 THEMES — 5 templates
 * ------------------------------------------------------------------ */

export const THEMES = [
  {
    name: 'Retro',
    sub: 'Fraunces · warm 70s',
    display: "'Fraunces', serif",
    // §10.2 — the Figma source names Soulway (display), Anton (label) and Inter
    // (body). Anton and Inter are Google Fonts and are used verbatim. Soulway is
    // commercial and cannot ship, so the display face is the nearest free stand-in:
    // Fraunces at its heaviest, softest, wonkiest instance — the same 70s Cooper-ish
    // slab with ball terminals. index.html asks Google for exactly one instance
    // (`opsz,wght,SOFT,WONK@144,900,100,1`), so the single @font-face it serves is
    // already soft/wonk at weight 900 and every `fontFamily: s.display` matches it
    // without naming a weight. Do NOT add more Fraunces weights to that link — a
    // second face would let the default 400 win and the display would go thin.
    label: "'Anton', sans-serif",
    body: "'Inter', sans-serif",
    // Passthrough, not title-casing. The §10.2 reference sets display copy as
    // typed ("Kai Mercer", "240 Songs") and reserves caps for the Anton labels,
    // which get them from textTransform instead.
    casing: 'title',
    dls: '0px',
    radius: '20px',
    radiusSm: '14px',
    btnR: '999px',
    bw: '2px',
    // §4.2 — [background, accent, text]
    palette: ['#EAD7B8', '#C8461C', '#111111'], // soft beige · burnt orange · black
    tags: ['#7A58A7', '#C8461C', '#D8A227', '#5B5E2E', '#E973A5', '#111111'],
  },
  {
    name: 'Lime',
    sub: 'Bebas Neue · dark acid',
    display: "'Bebas Neue', sans-serif",
    label: "'Archivo', sans-serif",
    body: "'Archivo', sans-serif",
    casing: 'upper',
    dls: '0.02em',
    radius: '6px',
    radiusSm: '4px',
    btnR: '4px',
    bw: '1.5px',
    palette: ['#15180F', '#AFE335', '#F2FFD0'], // near-black · acid lime · pale lime
    tags: ['#AFE335', '#2E3928', '#15180F', '#F2FFD0'],
  },
  {
    name: 'Grunge',
    sub: 'Special Elite · stamp red',
    display: "'Special Elite', monospace",
    label: "'Courier Prime', monospace",
    body: "'Courier Prime', monospace",
    casing: 'upper',
    dls: '0.04em',
    radius: '0',
    radiusSm: '0',
    btnR: '0',
    bw: '1.5px',
    palette: ['#000000', '#DF262C', '#FFFFFF'], // black · stamp red · white
    tags: ['#DF262C', '#171716', '#FFFFFF', '#000000'],
  },
  {
    name: 'Editorial',
    sub: 'Playfair Display · refined',
    display: "'Playfair Display', serif",
    label: "'Lora', serif",
    body: "'Lora', serif",
    casing: 'title',
    dls: '-0.01em',
    radius: '2px',
    radiusSm: '2px',
    btnR: '2px',
    bw: '1.5px',
    palette: ['#F6F0E8', '#C86E52', '#141414'], // warm paper · terracotta · near-black
    tags: ['#C86E52', '#141414', '#AA958A', '#E6B6A0'],
  },
  {
    name: 'Pop',
    sub: 'Titan One · loud & bright',
    display: "'Titan One', sans-serif",
    label: "'Archivo', sans-serif",
    body: "'Archivo', sans-serif",
    casing: 'upper',
    dls: '0.01em',
    radius: '20px',
    radiusSm: '14px',
    btnR: '999px',
    bw: '1.5px',
    palette: ['#FFFFFF', '#FF2DA0', '#6B2CFF'], // white · hot pink · violet
    tags: ['#C6F200', '#FF2DA0', '#2563FF', '#00E0C4', '#6B2CFF', '#FF1A1A', '#FFF600'],
  },
]

/* ------------------------------------------------------------------ *
 * §4.3 CATS — 14 section categories.
 * `n` is how many layout choices are offered to the user. Layouts are
 * always shown as "{name} layout {i+1}"; the internal identifiers in
 * the comments are never surfaced in the UI.
 * ------------------------------------------------------------------ */

export const CATS = [
  { id: 'header', name: 'Header', n: 6 },   // header count is theme-dependent — see headerVariants()
  { id: 'bio', name: 'Bio', n: 6 },
  { id: 'media', name: 'Media Player', n: 7 },
  // 3 → 4 with NVAR: layout 4 is the first design this category has had past
  // its Figma layout-3 row, and `pageLayout()` rests on designCount ≤
  // layoutCount, so the picker has to offer the row the fold names. This is
  // the first card the layout-4 pass adds to the picker (LAYOUT-4-PLAN.md,
  // open question 4) — it appears at the end of the Tags list and moves none
  // of the three above it.
  { id: 'tags', name: 'Tags', n: 4 },
  { id: 'audio', name: 'Audio Player', n: 10 },
  // 3 → 4 with NVAR, the Tags row's case again and the second (and last) card
  // this pass adds to the picker. Video is the one category whose NVAR went up
  // by two — 2 → 4 — so that `arch 3` names layout 4's design rather than
  // folding onto layout 2's; the Video list now offers four cards, the fourth
  // at the end, and none of the three above it moves.
  { id: 'video', name: 'Video', n: 4 },
  { id: 'pricing', name: 'Pricing', n: 8 },
  { id: 'repertoire', name: 'Repertoire', n: 7 },
  { id: 'gallery', name: 'Gallery', n: 4 },
  { id: 'calendar', name: 'Booking Calendar', n: 5 },
  { id: 'map', name: 'Events Map', n: 4 },
  { id: 'testimonials', name: 'Testimonials', n: 8 },
  { id: 'form', name: 'Enquiry Form', n: 6 },
  { id: 'footer', name: 'Footer', n: 1 },
]

export const catById = (id) => CATS.find((c) => c.id === id)
export const catName = (id) => catById(id)?.name ?? id

/* ------------------------------------------------------------------ *
 * §4.3a Nav targets.
 *
 * A published page's nav links scroll to the section they name, so a
 * link needs a section id as well as a label. `navSections` carries
 * `{ cat, label }` and a section id *is* its category: addSection()
 * refuses a category the page already has, so `cat` is unique per page
 * and reads honestly in a fragment — `#repertoire`, `#calendar`.
 *
 * The header's other two controls point at a section too, and so does
 * the fixed Music / Shows / Book triple, which names no category at
 * all. Each is a preference list resolved against the page: the first
 * candidate actually on it wins, and a label whose every candidate is
 * missing keeps its place in the design and simply does not link.
 * ------------------------------------------------------------------ */

export const NAV_MINIMAL = [
  ['Music', ['media', 'audio', 'video', 'repertoire']],
  ['Shows', ['map', 'calendar']],
  ['Book', ['form', 'calendar', 'pricing']],
]

export const CTA_TARGETS = {
  book: ['form', 'calendar', 'pricing'],
  listen: ['media', 'audio', 'video'],
}

export const firstPresent = (prefs, navSections) =>
  prefs.find((cat) => navSections.some((n) => n.cat === cat))

export const minimalNav = (navSections) =>
  NAV_MINIMAL.map(([label, prefs]) => ({ label, to: firstPresent(prefs, navSections) }))

/* ------------------------------------------------------------------ *
 * §4.4 NVAR — distinct rendered designs per category.
 * For everything except the header, more layout choices are offered
 * than there are designs; the rendered design is `arch % NVAR[cat]`.
 * ------------------------------------------------------------------ */

// `video` is 4 with a hole at index 2: its Figma pages supplied layouts 1, 2
// and 4 and never a 3, so `Video` folds `v2` onto its `v0` branch by hand
// (EncoreSection, "the one hand-fold in the file"). `audio` is the same gap
// read the other way — it has no layout-4 design at all — and stays 3, so its
// fourth picker card goes on folding onto layout 1 exactly as §4.4's comment
// on this file describes. Nothing forces that: the seeded page carries no
// audio section and addSection() opens a new one at `arch 0`, so no page can
// arrive at audio's index 3 except by the user picking that card.
export const NVAR = {
  header: 6, bio: 4, media: 4, tags: 4, audio: 3, video: 4, pricing: 4,
  repertoire: 4, gallery: 4, calendar: 4, map: 4, testimonials: 4, form: 4, footer: 1,
}

// Only Retro ships the photographic header treatment. The other four
// templates offer three flat layouts (§10.3) — their photographic
// designs do not exist yet.
export const headerFamily = (themeName) =>
  themeName === 'Retro' ? 'photographic' : 'flat'

export const headerVariants = (themeName) =>
  headerFamily(themeName) === 'photographic' ? 6 : 3

// How many layout choices a category offers under a given theme.
export const layoutCount = (catId, themeName) =>
  catId === 'header' ? headerVariants(themeName) : (catById(catId)?.n ?? 1)

// How many distinct designs a category actually renders under a theme.
export const designCount = (catId, themeName) =>
  catId === 'header' ? headerVariants(themeName) : NVAR[catId]

// §6.2 — the layout every other category takes when the header takes `i`.
// The page is one design: layouts 1, 2 and 3 of every section are one Figma
// page each, so the header's index *is* the page's index, and the setup modal's
// click is a page-wide write.
//
// Folded by designCount rather than by layoutCount for two reasons. It is never
// the larger of the two, so the result always names a row the layout picker can
// highlight; and `arch` reaches EncoreSection only through sectionVm's
// `d = arch % designCount`, so folding to the lowest index that renders a given
// design changes nothing on the page while leaving the sidebar reading "Bio
// layout 3" rather than "Bio layout 6" for the identical render. Negative-safe,
// sectionVm's own spelling, and `|| 1` for a category NVAR has no entry for —
// `layoutCount` ends the same way.
//
// "The lowest index that renders a given design" is `arch % NVAR` for thirteen
// of the fourteen categories and no longer for all of them: `video`'s Figma
// pages skipped layout 3, so its component folds `v2` onto `v0` by hand and
// two of its four indices render the same design. That costs this function
// nothing — the result still names a row the picker can highlight, which is
// the only property it promises — but it does mean the index this returns is
// not always the *lowest* one rendering that design.
export const pageLayout = (catId, i, themeName) => {
  const n = designCount(catId, themeName) || 1
  return ((i % n) + n) % n
}

/* ------------------------------------------------------------------ *
 * §4.4b Header layout names.
 *
 * "Header layout 4" tells nobody anything, and the header is the one
 * category a first-time user is asked to choose before they know the
 * editor. These are the names the compositions already carry in
 * EncoreSection's §10.2 comments, promoted to the UI. Every other
 * category keeps its number — its layouts are variations of one idea,
 * and the numbering is honest about the folding (§4.4).
 * ------------------------------------------------------------------ */

// [name, what it is] — index-aligned with HeaderV0…V5 / FlatHeader v0…v2.
const HEADER_NAMES = {
  photographic: [
    ['Hero', 'Full-bleed photo'],
    ['Feature spread', 'Photo beside the details'],
    ['Inset Hero', 'Framed photo on colour'],
    ['Stacked', 'Name stacked over the photo'],
    ['Overlay card', 'Details on a card'],
    ['Stage wide', 'Centred, wide'],
  ],
  flat: [
    ['Centred', 'Title, tags and buttons'],
    ['Split', 'Text beside an image'],
    ['Rule', 'Big title over a line'],
  ],
}

export const headerLayout = (themeName, i) =>
  HEADER_NAMES[headerFamily(themeName)][i] ?? [`Layout ${i + 1}`, '']

// The label a header section carries in the sidebar, the edit panel and the
// canvas overlay: the number is kept, because the layout picker still counts.
export const headerLayoutLabel = (themeName, i) =>
  `Header layout ${i + 1} · ${headerLayout(themeName, i)[0]}`

/* ------------------------------------------------------------------ *
 * §4.5 FLAG — category id → 2-letter view-model boolean key
 * ------------------------------------------------------------------ */

export const FLAG = {
  header: 'hd', bio: 'bi', media: 'me', tags: 'tg', audio: 'au', video: 'vi', pricing: 'pr',
  repertoire: 're', gallery: 'ga', calendar: 'ca', map: 'mp', testimonials: 'te',
  form: 'fo', footer: 'ft',
}

/* ------------------------------------------------------------------ *
 * §4.6 Demo content — the fictional DJ "Kai Mercer"
 * ------------------------------------------------------------------ */

// [name, duration, release]. The third element is used only by the §10.2
// floating-cards media design; the older designs destructure the first two.
export const TRACKS = [
  ['Late Lights',        '5:42', 'Single'],
  ['Manchester at 3am',  '6:18', 'Hidden Sessions Vol. 2'],
  ['Slow Burn',          '4:55', 'Single'],
  ['Echo & The Floor',   '7:01', 'Live at the Deaf Institute'],
  ['Roomtone',           '5:24', 'Hidden Sessions Vol. 2'],
]

// The audio behind the seeded tracks above, one per TRACKS row. Unlike the
// seeded photography this is *not* gated on Retro: it is what makes the
// published media player audible in every theme before the artist has typed
// anything. They are remote files — the double-clickable build plays them only
// online, and a page whose tracks carry no address at all is still the picture
// it always was.
export const TRACK_AUDIO = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
]

// The clock on the "now playing" card beside the track stack — a player caught
// mid-song, which is what the Figma frame draws. Only the editor canvas shows
// it: the published player's clock is its <audio> element's own (§10.2a), and
// the *track* named on the card is track one at both sizes, not `track` here,
// which survives only as the label for a section with no tracks left in it.
export const NOW_PLAYING = { track: 'Night Rain', at: '02:28', of: '04:22', pct: 34 }

// The other videos, listed in the panel beside the stage in the video
// section's layout 2 — used whenever the section carries no `videos` key of
// its own, which today is always: there is no structured editor for them yet
// (see LAYOUT-2-PLAN's open questions). Written in the row shape that editor
// will edit, GIGS-style, so adding it later changes nothing here or in
// sectionVm: one key, one shape, the delimiter-free strings the artist types.
// Only the artwork needs dressing, which RETRO_VIDEO_ART does under Retro.
//
// `sub` is the frame's channel line — where the video came from, not who made
// it — and `when` is the date the frame spends on a view count. Neither is a
// number about how many people watched: nothing on this page claims that.
export const VIDEOS = [
  { title: 'Manchester at 3am',  sub: 'Hidden Sessions', length: '03:50', when: 'April 2026' },
  { title: 'Disco Maghreb (edit)', sub: 'Single',        length: '04:12', when: 'March 2026' },
  { title: 'Slow Burn',          sub: 'Single',          length: '03:28', when: 'February 2026' },
  { title: 'Echo & The Floor',   sub: 'Live set',        length: '05:04', when: 'November 2025' },
  { title: 'Roomtone',           sub: 'Hidden Sessions', length: '02:57', when: 'October 2025' },
  { title: 'Field Day (live)',   sub: 'Festival',        length: '06:41', when: 'August 2025' },
]

// Where the video section's transport bar is caught. The section has no
// <video> element on either surface — it is still a picture (§12.7) — so the
// playhead is composed from the running time the artist typed rather than read
// off anything: VIDEO_MARK of it, formatted back. The fill under it takes the
// same fraction, so the two agree; the Figma frame's own 02:05 against a bar
// filled to 93% of 03:57 does not, and that disagreement is the one thing here
// not worth reproducing. A duration that will not parse gives '', and the bar
// renders empty rather than inventing a position for it.
export const VIDEO_MARK = 0.48
export const clockAt = (dur, frac) => {
  const m = /^\s*(\d{1,3}):([0-5]\d)\s*$/.exec(String(dur ?? ''))
  if (!m) return ''
  const at = Math.round((Number(m[1]) * 60 + Number(m[2])) * frac)
  return `${String(Math.floor(at / 60)).padStart(2, '0')}:${String(at % 60).padStart(2, '0')}`
}

export const TAGS = ['Default', 'Sold Out', 'New Release', 'Archive', 'Live', 'All Access']

// Pricing — the packages beside the section's filter row, and the seed for
// FIELDS.pricing's structured editor: used whenever the section carries no
// `tiers` key of its own. Already the row shape TiersField writes, GIGS-style,
// so the panel's seed resolver is the same expression sectionVm's is.
//
// `tags` is the raw comma string the artist would type, and it is what the
// Solo / Trio / Band selector above the cards is now built from — songTags()
// splits it and repChips() derives the row, exactly as for the repertoire, so
// the chips are the artist's rather than a constant. `feats` is one feature a
// line, joined here only to keep the seed readable.
export const TIERS = [
  { name: 'The House Party', price: '£450', tags: 'Solo',
    blurb: 'Birthdays, anniversaries, intimate gatherings.',
    feats: ['Solo DJ setup', 'Vinyl-only option', 'Requests welcome', 'Up to 50 mi travel'].join('\n') },
  { name: 'The Wedding Set', price: '£650', tags: 'Solo, Trio, Band',
    blurb: 'Ceremony, dinner, dance. One DJ for the whole day.',
    feats: ['Ceremony underscoring', 'Drinks + dinner ambience', 'Peak-time dance floor',
            'Custom first dance', 'PA + lighting'].join('\n') },
  { name: 'The Festival Set', price: '£1,200', tags: 'Trio, Band',
    blurb: 'High-energy set built for outdoor stages and big rooms.',
    feats: ['Tech rider provided', 'CDJ + vinyl combo', 'Visual sync available',
            'Extended encore', 'Festival-grade PA'].join('\n') },
]

// The suffix beside every card's price. A field rather than the literal the
// frame draws, because /event is one booking model among several.
export const PRICE_UNIT = '/event'

// The reviews the testimonials card pages through, in the row shape QuotesField
// edits — the GIGS and TIERS case, so its seed needs no dressing. `when` is the
// small line above the quote; `who` and `role` are printed twice by the §10.2
// card, once as the attribution and once as the two pills.
export const QUOTES = [
  { quote: '"Professional from the first email to the last encore."',
    who: 'Hannah L.', role: 'Private host', when: 'Reviewed 6 days ago' },
  { quote: 'The room did not sit down once. Kai read the crowd like a setlist.',
    who: 'Amara Okafor', role: 'Venue manager, Albert Hall', when: 'Reviewed 3 weeks ago' },
  { quote: 'Booked for one night, kept for the whole season.',
    who: 'Dan Whitfield', role: 'The Warehouse Project', when: 'Reviewed last month' },
]

export const CITIES = [
  { date: '14 Aug', city: 'Manchester', venue: 'Albert Hall',         status: 'Tickets'  },
  { date: '22 Aug', city: 'Leeds',      venue: 'Belgrave Music Hall', status: 'Tickets'  },
  { date: '05 Sep', city: 'London',     venue: 'XOYO',                status: 'Sold out' },
  { date: '19 Sep', city: 'Glasgow',    venue: 'Sub Club',            status: 'Tickets'  },
]

export const PINS = [{ x: '20%', y: '26%' }, { x: '40%', y: '54%' }, { x: '62%', y: '28%' },
                     { x: '74%', y: '64%' }, { x: '46%', y: '76%' }]

/* --- §10.2 demo content introduced by the Figma page ---------------- *
 * Mostly static like TRACKS / CITIES above: this is the picture of a
 * finished site, not editable copy, so most of it gets no FIELDS entry.
 * The exceptions are the lists the artist owns — SONGS (FIELDS.repertoire),
 * the media player's tracks, GIGS (FIELDS.map) and TIERS (FIELDS.pricing,
 * declared with the rest of §4.6 above) — which are seeds for a structured
 * editor rather than fixed copy.
 * ------------------------------------------------------------------- */

// Repertoire — the seeded song list, used whenever the section carries no
// `songs` key of its own. `tags` is the raw string as the artist would type
// it, comma-separated; songTags() below is what splits it, and repChips()
// is what turns the whole list into the section's filter row.
//
// The order is column-down, not the Figma frame's reading order: the desktop
// layout splits the page in half and runs each half down its own column, so
// songs 1–6 are the left column and 7–12 the right.
export const SONGS = [
  { title: 'Valerie',           artist: 'Amy Winehouse',     tags: 'Weddings, Pubs' },
  { title: 'Superstition',      artist: 'Stevie Wonder',     tags: 'Weddings' },
  { title: 'Uptown Funk',       artist: 'Bruno Mars',        tags: 'Weddings, Birthdays' },
  { title: 'Dancing Queen',     artist: 'ABBA',              tags: 'Weddings, Birthdays' },
  { title: 'Sex on Fire',       artist: 'Kings of Leon',     tags: 'Pubs' },
  { title: 'Crazy in Love',     artist: 'Beyoncé',           tags: 'Birthdays' },
  { title: 'Mr. Brightside',    artist: 'The Killers',       tags: 'Pubs, Birthdays' },
  { title: 'I Wanna Dance',     artist: 'Whitney Houston',   tags: 'Birthdays' },
  { title: 'September',         artist: 'Earth, Wind & Fire', tags: 'Weddings, Birthdays' },
  { title: "Don't Stop Me Now", artist: 'Queen',             tags: 'Pubs, Birthdays' },
  { title: 'Rather Be',         artist: 'Clean Bandit',      tags: 'Weddings' },
  { title: 'Valerie',           artist: 'Amy Winehouse',     tags: 'Pubs' },
]

// The chip that clears the filter. It is index 0 of the row and carries a null
// tag; repChips() skips a tag of the same name so an artist who writes "All" on
// a song — or on a pricing package — gets one chip here, not two.
export const REP_ALL = 'All'

// Events map — the upcoming-gigs list beside the map tile, and the seed for
// FIELDS.map's structured editor: used whenever the section carries no `gigs`
// key of its own. `link` is where the row's tickets go on the published page,
// normalised through extUrl() in sectionVm; the seeds carry none, so out of the
// box the rows stay the picture they have always been.
//
// One gig pairs with one pin, by index — PINS is five positions over the seeded
// Manchester raster and sectionVm hands each gig `PINS[i % PINS.length]`.
export const GIGS = [
  { venue: 'Hidden Warehouse',  city: 'Manchester',   time: '22:00', month: 'Jul', day: '12', link: '' },
  { venue: 'The Deaf Institute', city: 'Manchester',  time: '21:00', month: 'Jul', day: '25', link: '' },
  { venue: 'Private wedding',   city: 'Lake District', time: '19:00', month: 'Aug', day: '02', link: '' },
  { venue: 'Mint Lounge',       city: 'Manchester',   time: '23:00', month: 'Aug', day: '16', link: '' },
  { venue: 'Gorilla',           city: 'Manchester',   time: '23:00', month: 'Aug', day: '30', link: '' },
]
export const MAP_RADIUS = '12 mile radius'
export const MAP_BASE = 'Based in Manchester'
export const MAP_TERMS = '120 mi standard · further on request'

// Gallery — the media-source selector down the left of the section. The first
// row is the page's own strip of photographs and has no address; the other
// three carry the content key of the link the artist types, and become real
// outbound links on the published page (sectionVm resolves `k` through
// extUrl(), the same normalisation the media player's Soundcloud button gets).
export const GALLERY_SOURCES = [
  { l: 'Gallery' },
  { l: 'YouTube',   k: 'youtube' },
  { l: 'Instagram', k: 'instagram' },
  { l: 'TikTok',    k: 'tiktok' },
]

// Enquiry form — the split context panel and the field set beside it. All four
// of these were the section's content until it became the artist's: they are
// the *seeds* of FIELDS.form's promises, fields, types and message now, and
// nothing renders them directly.
export const FORM_PROMISES = ['Replies within 24 hrs', 'Free, no-obligation quote', 'Covers 120 mi from Manchester']
// Written in the row shape FormFieldsField edits and sectionVm reads — the
// GIGS/TIERS rule, so the panel's seed resolver needs no dressing.
export const FORM_FIELDS = [
  { label: 'Name',       placeholder: 'Full name',      kind: 'text' },
  { label: 'Email',      placeholder: 'you@email.com',  kind: 'email' },
  // Deliberately `text`, not a date kind: the native picker cannot be styled
  // onto the mustard panel, so a date is the artist's placeholder and nothing
  // more. `number` likewise never becomes type="number" — see EncoreSection.
  { label: 'Event date', placeholder: 'dd / mm / yyyy', kind: 'text' },
  { label: 'Guests',     placeholder: 'approx.',        kind: 'number' },
]
// The three kinds a row can be, in the { v, l } shape EditPanel's own select
// branch reads. Anything else sectionVm resolves to 'text'.
export const FORM_KINDS = [
  { v: 'text',   l: 'Text' },
  { v: 'email',  l: 'Email' },
  { v: 'number', l: 'Number' },
]
export const FORM_TYPES = ['Wedding', 'Event', 'Pub', 'Party', 'Other']
export const FORM_MESSAGE = 'Tell me about your event…'

// Footer — the sitemap either side of the rule, and the small print under it.
//
// Written in the { label, to } row shape LinksField edits, the GIGS / TIERS /
// QUOTES rule, so its seed resolver is a one-liner and needs no dressing. `to`
// is a section id (§4.3a), 'link' for a web address in the row's own `url`, or
// 'none'. The eight targets are the categories EXAMPLE_PAGE carries, so the
// seeded page publishes fully linked; on BLANK_PAGE every one of them resolves
// to nothing and the column is the picture it has always been, exactly as the
// header's nav is empty there.
//
// A flat list, not two columns: sectionVm does the halving, or a repeater row
// would have to carry which column it stands in.
export const FOOTER_LINKS = [
  { label: 'About',          to: 'bio' },
  { label: 'Top Tracks',     to: 'media' },
  { label: 'Media',          to: 'gallery' },
  { label: 'Repertoire',     to: 'repertoire' },
  { label: 'Shows/Coverage', to: 'map' },
  { label: 'Pricing',        to: 'pricing' },
  { label: 'Enquiries',      to: 'form' },
  { label: 'Reviews',        to: 'testimonials' },
]

// The per-row target select, in the { v, l } shape EditPanel's own select
// branch reads — FORM_KINDS' shape.
//
// Every category the page *can* carry rather than the ones it does: a Radix
// Select whose value names no item blanks its trigger, so a row pointing at a
// section the artist has since deleted must still read as what it points at,
// and a link can be aimed at a section that has not been added yet. Resolving
// it against the actual page is sectionVm's job — §4.3a, "a label whose every
// candidate is missing keeps its place in the design and simply does not link".
//
// 'none' and 'link' are non-empty sentinels because Radix refuses a SelectItem
// with an empty value; no category is named either of them.
export const FOOTER_TARGETS = [
  { v: 'none', l: 'Nothing' },
  ...CATS.filter((c) => c.id !== 'header' && c.id !== 'footer')
    .map((c) => ({ v: c.id, l: c.name })),
  { v: 'link', l: 'Web address' },
]

// Not a field: it is the platform's byline, not the artist's.
export const FOOTER_CREDIT = 'A JustPay Product'
// The frames' own hard break — see sectionVm, which is the other half of it.
export const FOOTER_STATEMENT = "Let's make\nyour night unforgettable."

// No `repertoire` entry: its heading counts the songs (see sectionVm), so a
// literal here would never be read.
// `tags` was 'Tags' and read by nothing: the category named no `heading` field
// and neither of its two invented flat layouts drew a title. Layout 3's frame
// heads its chip row "Genres", so the literal moves to that and `FIELDS.tags`
// gains the field that mirrors it. Layout 4's frame heads it the same way, at
// the two wider widths.
export const TITLES = { bio: 'Reads the room.', media: 'Five worth your ear.', tags: 'Genres',
  audio: 'Selected Tracks', video: 'Live at Roomtone', pricing: "Choose the set that's right for your night",
  gallery: 'See us in action', calendar: 'Availability',
  map: 'Manchester', testimonials: 'Word of Mouth', form: "Let's make your night unforgettable.", footer: '' }

export const DEFS = {
  heroSub:    'DJ & selector. Clubs, weddings and festivals across the North — nights built live, never off a playlist.',
  bioP1:      'DJ and selector based in Manchester. Five years of reading rooms — house, disco, soul, 80s — chosen by the room, not the algorithm.',
  bioP2:      'Residencies at Roomtone and The Warehouse Project. Available for clubs, weddings and private events across the UK.',
  statement:  'Reads the room.',
  videoDesc:  'Full closing set, recorded live. One hour of the room at its loudest.',
  pricingSub: 'Prices may vary by date, location, and length of set.',
  // §10.2 layout 3 heads the stack with a line under the title, where neither
  // earlier layout draws one — the frame's own sentence, kept as the seed so
  // the reference picture holds. Emptying it drops the line.
  //
  // The frame's paragraph is two sentences and this is the tail of the second.
  // "Four ways to book this act." is a count the artist never typed and goes
  // the way the video section's numbers did; "Choose by the kind of night
  // you're throwing" repeats TITLES.pricing's own words almost exactly, so
  // stacking it under the title stutters where the frame — whose title is the
  // single word "Pricing" — does not.
  pricingIntro: 'The quote covers the whole booking.',
  // §10.2 layout 2 stands a line of praise beside the plan, where layout 1 has
  // nothing of the sort — the frame's own sentence, kept as the seed so the
  // reference picture holds. Emptying it drops the line.
  pricingQuote: "“Kai read the room better than any DJ we'd worked with. We had him back twice that year.”",
  mapSub:     '12 dates · 8 cities · this season',
  // §10.2 layout 2 heads the testimonials with a line about who the reviews are
  // from, where layout 1 draws no head at all — the frame's own sentence, kept
  // as the seed so the reference picture holds. Emptying it drops the line.
  testiSub:   'Real words from couples, planners and venues across the North West.',
  formPara:   'Tell me about the night — date, venue, crowd. Replies within 24 hours.',
  copyright:  'C 2026 Kai Mercer',
}

// §10.2 scheduler — the date the calendar is cued to, and the time its enquiry
// line prints. One date does both jobs: CAL_OPEN names the month the grid opens
// on *and* the day it opens picked, the way the media player's card names track
// one before anything has been chosen. June 2025 starts on a Sunday, so the seed
// has no leading blanks, its grid runs 1..30, and the 12th is the Thursday the
// reference frame highlights — every number the retired CAL_LEAD / CAL_LENGTH /
// CAL_PICKED stated is now derived from this one string.
export const CAL_OPEN   = '2025-06-12'
export const CAL_TIME   = '9:00pm'
export const CAL_DAYS   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
// The dates the artist is already booked on, and cannot be enquired for. Empty
// on purpose: the frame draws a month in which every cell is identical but the
// pick, so an empty seed is the only one that reproduces it. It follows the
// gallery's three social addresses rather than GIGS and TIERS — absent and
// emptied both mean none, because there is nothing here to seed.
export const CAL_BOOKED = []
// How far ahead the calendar reaches, in months from CAL_OPEN's. The arrows
// wrap at both ends of it rather than clamping — see EncoreSection's Calendar.
export const CAL_SPAN   = 12

// §10.2 layouts 2 and 4 — the named slots. Where layout 1 draws a month and lets
// the visitor pick any unbooked day out of it, layout 2 draws a short list of
// named slots: a date, what the artist plays that night, and what it starts
// from. None of that is derivable — `booked` is the days the artist is *not*
// free, and inverting it would print every remaining day of June — so the list
// is seeded here in the row shape a repeater would edit, exactly as VIDEOS,
// GIGS and TIERS were seeded before their editors existed. The price is a row
// value like TIERS' `price`, not the video section's dropped view count: it is
// the thing the row is for, and the whole phrase is the artist's, so an emptied
// one drops its line rather than printing a bare "From".
//
// Slot one is CAL_OPEN, so the seeded page opens with that row already picked —
// `vm.calPick` lights it — and the reference picture matches the frame with no
// second field to keep in step.
export const CAL_SLOTS  = [
  { date: '2025-06-12', kind: 'Evening',  price: 'From £1,200' },
  { date: '2025-06-14', kind: 'Full day', price: 'From £2,400' },
  { date: '2025-06-20', kind: 'Late',     price: 'From £1,400' },
  { date: '2025-07-05', kind: 'Wedding',  price: 'From £2,800' },
]

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']
// The enquiry line names the weekday in full; CAL_DAYS heads the grid's columns.
export const DAY_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday']

/* ------------------------------------------------------------------ *
 * §4.7 Starting pages — [categoryId, layoutIndex]
 * ------------------------------------------------------------------ */

// "Theme Example" — a populated page the user can immediately edit.
// The eleven sections of the §10.2 reference page, in order.
export const EXAMPLE_PAGE = [
  ['header',       0],
  ['bio',          0],
  ['media',        0],
  ['gallery',      0],
  ['repertoire',   0],
  ['map',          0],
  ['pricing',      0],
  ['calendar',     0],
  ['form',         0],
  ['testimonials', 0],
  ['footer',       0],
]

// "Blank" — only the two mandatory sections.
export const BLANK_PAGE = [
  ['header', 0],
  ['footer', 0],
]

/* ------------------------------------------------------------------ *
 * §4.8 FIELDS — editable content per category
 * { k, l, type?, opts?, d?, def? }
 * ------------------------------------------------------------------ */

const SHOW_HIDE = [{ v: 'show', l: 'Show' }, { v: 'hide', l: 'Hide' }]

export const FIELDS = {
  // Every element appearing in any header layout is exposed. A layout that
  // does not consume a key simply ignores it, so swapping layouts never
  // silently discards copy the user typed.
  header: [
    { k: 'image',     l: 'Background photo', type: 'image',
      hint: 'Fills the header behind the type.' },
    { k: 'avatar',    l: 'Artist photo',     type: 'image',
      hint: 'The portrait card and the small round avatar.' },
    { k: 'kicker',    l: 'Kicker',           d: 'DJ · Live Act' },
    { k: 'title',     l: 'Title' },                       // defaults to artistName — special-cased
    { k: 'subtitle',  l: 'Subtitle',         type: 'area', def: 'heroSub' },
    { k: 'location',  l: 'Location',         d: 'Manchester, UK' },
    { k: 'cta1',      l: 'Primary button',   d: 'Book Now' },
    { k: 'cta2',      l: 'Secondary button', d: 'Listen' },
    { k: 'showTags',  l: 'Tag chips',        type: 'select', d: 'show', opts: SHOW_HIDE },
    { k: 'showBadge', l: 'Corner badge',     type: 'select', d: 'show', opts: SHOW_HIDE },
    { k: 'badgeText', l: 'Badge text',       d: 'Kai Mercer' },
    { k: 'navMode',   l: 'Navigation links', type: 'select', d: 'sections', opts: [
      { v: 'sections', l: 'Follow my sections' },
      { v: 'minimal',  l: 'Minimal (Music · Shows · Book)' },
    ] },
    { k: 'align',     l: 'Alignment',        type: 'select', d: 'left', opts: [
      { v: 'left',   l: 'Left' },
      { v: 'centre', l: 'Centre' },
    ] },
  ],
  bio: [
    { k: 'image',     l: 'Photo', type: 'image', hint: "Fills the bio's portrait card." },
    { k: 'heading',   l: 'Heading', d: 'Reads the room.' },
    { k: 'statement', l: 'Statement (centred layout)', def: 'statement' },
    { k: 'para1',     l: 'Paragraph 1', type: 'area', def: 'bioP1' },
    { k: 'para2',     l: 'Paragraph 2', type: 'area', def: 'bioP2' },
    // Layout 3's ID card draws a row of stats, and the frame's first one is
    // "Performing since: June 2021" — a date nobody typed, so the value is
    // dropped and the seat becomes this field instead. Deliberately without a
    // default: an unfilled page would otherwise publish a fabricated one, and
    // the column is simply not drawn while it is empty.
    { k: 'since',     l: 'Performing since',
      hint: 'The ID card’s first stat (layout 3) and the overlay card’s middle line (layout 4), where it reads “Performing since …”. Just the date, then. Left empty, neither is drawn.' },
  ],
  // The second list-shaped content type with a structured editor (see
  // `repertoire` below): `tracks` here is an array of { title, sub, image,
  // audio }, maintained by TracksField, and each row carries its own artwork
  // and its own sound file rather than drawing from a section-level array. An
  // absent key means the seeded TRACKS dressed in RETRO_TRACK_ART and
  // TRACK_AUDIO; an emptied array means no tracks. The `audio` category keeps
  // the *string* form of the same key — sectionVm reads both shapes.
  //
  // This is the one section with no `image` of its own. It had a "now-playing
  // sleeve" and a "now-playing track" while the player was a picture; now that
  // it plays, the card names and shows whatever track the player is on — track
  // one until a visitor picks another — and a second copy of that, editable
  // apart from the list, could only ever contradict it.
  media: [
    { k: 'tracks',  l: 'Tracks', type: 'tracks', max: 8,
      hint: 'Each row is one card in the stack, with its own artwork and audio file. '
          + "The player shows the track it is on, so track one's artwork is the sleeve." },
    { k: 'kicker',  l: 'Kicker', d: 'Top tracks' },
    { k: 'heading', l: 'Heading', d: 'Five worth your ear.' },
    { k: 'soundcloud', l: 'SoundCloud link', d: '',
      hint: 'Where the Soundcloud button goes on the published page. Leave empty and it stays a picture.' },
  ],
  // Layouts 3 and 4 head the row and layouts 1 and 2 do not, so the hint says
  // so (FIELDS.media.soundcloud's case): layout 1 writes its own "Browse by
  // tag" and layout 2 is a bare rule-bounded strip. Layout 4 draws the same
  // label, except on the phone — its 390 master hides the head frame outright.
  tags: [
    { k: 'heading', l: 'Heading', d: TITLES.tags,
      hint: 'The label above the chips in layouts 3 and 4 — layout 4 drops it on the phone. '
          + 'Layout 1 writes its own, and layout 2 has no head at all.' },
    { k: 'tags', l: 'Tags (comma-separated)', type: 'area', d: TAGS.join(', ') },
  ],
  audio: [
    { k: 'heading', l: 'Heading', d: 'Selected Tracks' },
    { k: 'tracks',  l: 'Tracks (one per line: Name — 3:42)', type: 'area',
      d: TRACKS.map(([n, dur]) => `${n} — ${dur}`).join('\n') },
  ],
  // The two photo slots reach the photographic layouts only — layout 1 and the
  // flat tail draw a play disc on a soft panel and no photograph at all — which
  // is the media player's Soundcloud case the other way round, and why both
  // hints say where they land. They no longer land in the same place: layout 4
  // is a full-bleed poster with no artist circle on it, so `image` reaches 2
  // and 4 and `avatar` is layout 2's alone. `avatar` is the header's own key,
  // on the header's own three states, so `defaultImage` seeds it with the same
  // §10.2 portrait.
  video: [
    { k: 'heading',     l: 'Heading', d: 'Live at Roomtone' },
    { k: 'description', l: 'Description', type: 'area', def: 'videoDesc' },
    { k: 'duration',    l: 'Duration', d: '04:18' },
    { k: 'image',       l: 'Poster', type: 'image',
      hint: 'Fills the player in layouts 2 and 4.' },
    { k: 'avatar',      l: 'Artist photo', type: 'image',
      hint: 'The circle beside your name, and beside every video in the list. Layout 2 only.' },
  ],
  // The fourth list-shaped content with a structured editor, and the one that
  // replaced a flattened key set (t1n/t1p/…) rather than a textarea: `tiers` is
  // an array of { name, price, tags, blurb, feats } maintained by TiersField.
  // It follows the `songs` rule — one key, one shape — so an absent key means
  // the seeded TIERS, an emptied array means no packages, and there is no null
  // sentinel. The tags are layout 1's filter row, the repertoire's rule; layout 2
  // names the packages themselves in its chip row and reads no tags at all.
  pricing: [
    { k: 'heading', l: 'Heading', d: "Choose the set that's right for your night",
      hint: 'Layouts 1, 2 and 3 only. Layout 4 is a stack of service rows and heads them with '
          + 'the package names alone, so it draws no title.' },
    { k: 'tiers',   l: 'Packages', type: 'tiers', max: 6,
      hint: 'Tags become the filter chips above the packages in layouts 1 and 3 — separate '
          + 'them with commas. Features are one to a line. Layout 2 shows one package at a '
          + 'time and names them in its own chip row, so it reads no tags. Layout 4 has no '
          + 'filter: it prints the tags and the features on the package itself.' },
    { k: 'unit',    l: 'Price unit', d: PRICE_UNIT,
      hint: 'Printed after the price in layouts 1, 2 and 3. Layout 4 stands it above the price '
          + 'instead, as the kind of booking being priced, and drops a leading slash.' },
    { k: 'intro',   l: 'Intro line', type: 'area', def: 'pricingIntro',
      hint: 'A line under the heading. Layout 3 only.' },
    { k: 'quote',   l: 'Quote', type: 'area', def: 'pricingQuote',
      hint: 'A line of praise beside the plan. Layout 2 only.' },
    { k: 'sub',     l: 'Small print', def: 'pricingSub' },
  ],
  // The other list-shaped content type with a structured editor rather than a
  // textarea (see `media` above): `songs` is an array of { title, artist, tags },
  // and SongsField in EncoreBuilder is the repeater that maintains it. An absent
  // key means the seeded SONGS; an emptied array means no songs listed.
  repertoire: [
    // No `d`: the heading falls back to the song count, in sectionVm and in
    // the panel alike, so it cannot claim 240 songs over a list of twelve.
    { k: 'heading', l: 'Heading' },
    { k: 'songs',   l: 'Songs', type: 'songs', max: 60,
      hint: 'Tags become the filter chips above the list — separate them with commas. Layout 4 draws no chips: it indexes the whole list A–Z instead.' },
  ],
  // The three social addresses follow the photos, and follow `media.soundcloud`
  // in shape: an empty default, normalised through extUrl() in sectionVm, and a
  // row that stays a picture until it is filled. GALLERY_SOURCES names the key
  // each row reads — change one, change both.
  //
  // They are also `media.soundcloud`'s case in the other sense: the source rows
  // are layout 1's, and none of the other three designs draws a row for them —
  // layout 2 has no room, layout 3 is a bare grid, and layout 4's Figma wrapper
  // carries layout 1's four rows as a `hidden` frame — so each hint says which
  // layout it edits, the video section's `image` and `avatar` rule the other
  // way round.
  gallery: [
    { k: 'images',  l: 'Photos', type: 'images', max: 7,
      hint: 'One per tile. Layout 1 shows the highlighted one in its viewer; layouts 2 and 4 show it as the large photo beside the others.' },
    { k: 'heading', l: 'Heading', d: 'See us in action' },
    { k: 'youtube',   l: 'YouTube link', d: '',
      hint: 'Where the YouTube row goes on the published page. Leave empty and it stays a picture. Layout 1 only.' },
    { k: 'instagram', l: 'Instagram link', d: '',
      hint: 'Where the Instagram row goes on the published page. Leave empty and it stays a picture. Layout 1 only.' },
    { k: 'tiktok',    l: 'TikTok link', d: '',
      hint: 'Where the TikTok row goes on the published page. Leave empty and it stays a picture. Layout 1 only.' },
  ],
  // `heading` heads the flat layout, layout 2's slot list and layout 4's whole
  // block — the scheduler frame draws no title — and every other key is read by
  // at least two designed layouts. `open` is the one date the section is built
  // from (in layouts 2 and 4 the slot it opens picked), `booked` the days it
  // will not take (in those two the slots it strikes through), `time` the hour
  // the foot line names and layout 4's own stat cell, and `cta` the label on
  // the pill beside that line, which was an unread key until the pill existed
  // and which layout 3 alone still leaves editing nothing.
  calendar: [
    { k: 'image',   l: 'Photo', type: 'image',
      hint: 'Fills the polaroid stack beside the month in layout 1, and the small disc on '
          + "layout 4's summary card. Layouts 2 and 3 draw no photograph." },
    { k: 'heading', l: 'Heading', d: 'Availability' },
    { k: 'open',    l: 'Opens on', type: 'date', d: CAL_OPEN,
      hint: 'The month the calendar opens on, and the date it opens picked. '
          + `It reaches ${CAL_SPAN} months from there.` },
    { k: 'booked',  l: 'Booked dates', type: 'booked',
      hint: 'Click a day to block it. A blocked day cannot be picked on the published page.' },
    { k: 'time',    l: 'Enquiry time', d: CAL_TIME,
      hint: 'Printed in the line along the foot of the panel, and on its own in '
          + "layout 4's summary card. Leave it empty and the line stops at the date." },
    { k: 'cta',     l: 'Button', d: 'Check a date' },
  ],
  // The third list-shaped content with a structured editor, after `repertoire`
  // and `media`: `gigs` is an array of { venue, city, time, month, day, link }
  // maintained by GigsField. It follows the `songs` rule rather than the
  // tracks' — one key, one shape — so an absent key means the seeded GIGS, an
  // emptied array means no gigs, and there is no null sentinel.
  map: [
    { k: 'gigs',    l: 'Upcoming gigs', type: 'gigs', max: 12,
      // The page size is PINS.length, not a literal — see vm.gigPage — except
      // in layout 4, whose whole list is a one-gig ticker. The cities are read
      // a second time in layout 3, where they derive the split list's filter
      // chips (vm.gigChips) the way the songs' tags derive the repertoire's —
      // so a row's city is a control there as well as a fact — and a third
      // time in layout 4, which counts them (vm.gigCityCount).
      hint: 'Each row is one show, and one pin on the map. A row with a tickets link becomes '
          + `a real link on the published page; the list pages ${PINS.length} at a time in `
          + "layouts 1–3 and one at a time in layout 4's ticker. "
          + 'Layout 3 also turns the cities into its filter chips, and layout 4 counts them.' },
    { k: 'heading', l: 'Heading', d: 'Manchester' },
    { k: 'radius',  l: 'Coverage badge', d: MAP_RADIUS },
    { k: 'base',    l: 'Based in',       d: MAP_BASE },
    { k: 'terms',   l: 'Travel terms',   d: MAP_TERMS },
    // Layout 3's foot pill, and the only layout that draws one: the split
    // list's frame closes with a "See all gigs" control that has nowhere on a
    // one-page site to go, so the seat takes the page's own Book Now instead
    // (the testimonials' layout-2 case). `map` is not in CTA_TARGETS.book, so
    // it needs no self-exclusion; an emptied label drops the pill, the footer's
    // rule rather than the calendar's, because here it is a block of its own.
    { k: 'cta',     l: 'Button (layout 3)', d: 'Book Now' },
    { k: 'sub',     l: 'Subline (full map layout)', def: 'mapSub' },
  ],
  testimonials: [
    { k: 'heading', l: 'Heading', d: 'Word of Mouth' },
    // Layout 2 was the first design to head this section, so both of the plain
    // strings below reached it alone — FIELDS.media.soundcloud's case the other
    // way up, hence the layout in each hint. Layout 3's bento wall then gave
    // `sub` a second seat: its stat card sets the sentence the frame fills with
    // a fabricated event count.
    { k: 'sub',     l: 'Intro line', def: 'testiSub',
      hint: 'The line under the heading in layout 2, and the sentence on the stat '
          + 'card in layout 3.' },
    // The seventh structured editor and the sixth repeater. Replaces a flattened
    // key set — quote/who/role reached one review of three, and nothing could
    // add a fourth — which is the pricing packages' case, not a textarea's.
    // Follows the `songs` rule: absent means the seeded QUOTES, [] means none.
    { k: 'quotes',  l: 'Reviews', type: 'quotes', max: 8,
      hint: 'Each row is one review. Layouts 1, 2 and 4 page through them; layout 3 '
          + 'gives each one a card on its wall, and a row with no name or role '
          + 'becomes a plain quote card there. The date line is the small type '
          + 'above the quote in layout 1 and sits beside the reviewer in layout 2, '
          + "whose selector takes the name's initials — layout 4 marks its card "
          + 'with the same initials; layouts 3 and 4 have no seat for the date.' },
    { k: 'cta',     l: 'Button', d: 'Book Now',
      hint: 'The pill under the card, which scrolls to wherever the page takes a '
          + 'booking. Emptying it drops the pill. Layout 2 only.' },
  ],
  form: [
    { k: 'image',    l: 'Portrait', type: 'image',
      hint: 'The round photo beside your name. Layouts 1 and 2 — layouts 3 and 4 draw no credit row.' },
    // Layout 2's stage shot. The section's two photographs are the artist and
    // the scene — the header's and the video section's pair the other way up,
    // this one's `image` having been the artist since layout 1 drew it as an
    // avatar. FIELDS.media.soundcloud's case: it reaches one layout, so the
    // hint says which.
    { k: 'photo',    l: 'Stage photo', type: 'image',
      hint: 'The big picture above the heading. Layout 2 only.' },
    { k: 'heading',  l: 'Heading', d: "Let's make your night unforgettable." },
    { k: 'para',     l: 'Paragraph', type: 'area', def: 'formPara',
      hint: 'The line under the heading in layout 3; the one under the card in layout 2.' },
    { k: 'promises', l: 'Promises', type: 'area', d: FORM_PROMISES.join('\n'),
      hint: 'One per line — the ticked list beside the form. Layout 3 runs them together '
          + 'as the one line under its button; layout 4 numbers them down its right-hand '
          + 'column, and with none it draws no column at all.' },
    // The sixth structured editor and the fifth repeater. Follows the `songs`
    // rule: an absent key means the seeded FORM_FIELDS, an emptied array means
    // no boxes at all, and there is no null sentinel.
    { k: 'fields',   l: 'Form fields', type: 'formFields', max: 8,
      hint: 'One box each — two to a row in layouts 1 and 4, one to a row in layouts 2 and 3, '
          + 'which set the label inside the box and draw no placeholder. An odd last box '
          + 'takes half a row in layout 1 and the whole of one in layout 4. The published '
          + 'form emails you what the visitor types.' },
    { k: 'types',    l: 'Event types', type: 'area', d: FORM_TYPES.join(', '),
      hint: 'Comma separated. The form opens on the first; empty hides the row. Layout 1 only.' },
    { k: 'message',  l: 'Message placeholder', d: FORM_MESSAGE, hint: 'Layouts 1 and 4.' },
    // Dead until the submit was made real — this is now what the form is for.
    { k: 'email',    l: 'Email address', d: 'bookings@kaimercer.co.uk',
      hint: 'Enquiries are mailed here: the button opens the visitor’s mail app with the form filled in. Empty leaves the button a picture.' },
    { k: 'button',   l: 'Button', d: 'Book Now' },
  ],
  footer: [
    { k: 'statement', l: 'Statement', type: 'area', d: FOOTER_STATEMENT },
    // The eighth structured editor and the seventh repeater — and the section's
    // whole sitemap, which was a constant no field could reach. Follows the
    // `songs` rule: an absent key means the seeded FOOTER_LINKS, an emptied
    // array means no links at all, and there is no null sentinel.
    { k: 'links',    l: 'Footer links', type: 'links', max: 10,
      hint: 'The list is halved into two columns, in order. A link scrolls to a section on the page, or opens a web address in a new tab.' },
    // Dead until the pill was given a target — the calendar's `cta`, which was
    // a field that edited nothing until it labelled that section's foot pill.
    { k: 'cta',      l: 'Button', d: 'Book Now',
      hint: 'Books at the enquiry form, the calendar or the pricing section — whichever the page carries. Empty drops the button.' },
    // The same key the header's seal takes: `vm.showBadge` already reads this
    // section's own content, so the footer's seal was hidable by nothing only
    // because no field here named it.
    { k: 'showBadge', l: 'Seal', type: 'select', opts: SHOW_HIDE, d: 'show' },
    { k: 'copyright', l: 'Small print', def: 'copyright' },
  ],
}

/* ------------------------------------------------------------------ *
 * §4.9 Helpers
 * ------------------------------------------------------------------ */

// Perceived luminance, 0..1.
export function lum(hex) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

// Luminance-based black/white picker. Threshold 0.58 — not 0.5.
export function contrast(hex) {
  return lum(hex) > 0.58 ? '#141414' : '#FFFFFF'
}

// Opaque blend of two hexes, `t` of the way from a to b. Used for the torn
// paper edges (§10.2), which must be opaque because they overlap the section
// boundary and cannot be an rgba() overlay.
export function mix(a, b, t) {
  const ch = (i) => {
    const x = parseInt(a.slice(i, i + 2), 16), y = parseInt(b.slice(i, i + 2), 16)
    return Math.round(x + (y - x) * t).toString(16).padStart(2, '0')
  }
  return `#${ch(1)}${ch(3)}${ch(5)}`
}

// Hex → rgba() string.
export function rgba(hex, a) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

// Theme casing transform. 'title' is a passthrough, not title-casing.
export function caseText(t, casing) {
  if (casing === 'lower') return String(t).toLowerCase()
  if (casing === 'upper') return String(t).toUpperCase()
  return t
}

export function fieldDefault(f) { return f.def ? DEFS[f.def] : (f.d != null ? f.d : '') }

// A user-typed outbound URL → an absolute one, or '' if the field is empty.
//
// Everything the artist types is meant to leave the page, so a schemeless
// "soundcloud.com/kai" gets https://. It cannot be left relative: the published
// tab carries a <base href> to the opener (§ Publish), so a relative href would
// resolve against the builder and load it over the page. mailto:/tel: and an
// explicit scheme are passed through untouched.
export function extUrl(v) {
  const t = String(v ?? '').trim()
  if (!t) return ''
  return /^[a-z][a-z0-9+.-]*:/i.test(t) || t.startsWith('//') ? t : `https://${t}`
}

// The enquiry form's submit, composed here for the reason enquiryLine() is:
// EncoreSection composes nothing. It cannot be resolved in sectionVm either —
// the values are the visitor's keystrokes, which sectionVm never sees — so
// sectionVm binds this over the section's address and labels and hands the
// closure down on the view-model.
//
// A mailto is the whole of the submit: there is no backend and never will be,
// and handing the enquiry to the visitor's own mail app is the one delivery
// that is genuinely front-end-only. The result is already absolute, so it does
// NOT go back through extUrl() — whose own comment above says a mailto: is
// passed through untouched. An empty address returns '', and the pill goes
// back to being the span it always was: the Soundcloud button's rule.
export function enquiryMailto(email, { type, fields, message, msgLabel }) {
  const to = String(email ?? '').trim()
  if (!to) return ''
  const body = [
    ...(fields || [])
      .filter((f) => String(f.value ?? '').trim())
      .map((f) => `${f.label || 'Detail'}: ${String(f.value).trim()}`),
    ...(String(message ?? '').trim() ? ['', `${msgLabel}:`, String(message).trim()] : []),
  ].join('\r\n')
  // No type row on a layout that draws no chips, and none on a page whose
  // artist deleted them: the clause is dropped rather than left dangling, the
  // calendar's trailing-" at " rule.
  const subject = type ? `${type} enquiry` : 'Enquiry'
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

// What the submit refuses to send. Index-aligned with the field list, so the
// section can mark the boxes it is missing without working anything out — the
// pin sectionVm pairs with a gig, again.
//
// Every box the artist put on the form is required: they chose to ask for it.
// An `email` row must also look like an address, since it is where a reply
// goes. A `number` row is required but not checked — "approx." invites "~150".
// The message is optional: the four boxes above it are the enquiry.
export function formErrors(fields, vals) {
  const f = (fields || []).map((fd, i) => {
    const v = String((vals || [])[i] ?? '').trim()
    if (!v) return true
    return fd.kind === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  })
  return { f, any: f.some(Boolean) }
}

// A tagged row's raw `tags` string → its trimmed, non-empty labels. Song-named
// for the list it was written for, but it reads nothing but the string: the
// pricing tiers' tags go through it too, and so does the enquiry form's
// comma-separated list of event types.
export function songTags(str) {
  return String(str ?? '').split(',').map((t) => t.trim()).filter(Boolean)
}

// A filter row over any list of `{ tags }` rows — the repertoire's songs and
// the pricing section's packages both: REP_ALL, then every tag any row carries,
// in first-seen order. Deduped case-insensitively but keeping the casing it was
// first typed in, so 'Weddings' and 'weddings' are one chip rather than two.
// `label` is what the chip prints; `tag` is the raw value it matches against,
// and is null on the All chip.
// A package's raw `feats` string → one feature a line. The tiers' second
// delimited field, and a line rather than a comma because a feature is a phrase
// ("Drinks + dinner ambience") where a tag is a word. The enquiry form's
// promises are the same shape and go through it too.
export function tierFeats(str) {
  return String(str ?? '').split('\n').map((t) => t.trim()).filter(Boolean)
}

export function repChips(songs) {
  const seen = new Map()
  ;(songs || []).forEach((sg) => songTags(sg && sg.tags).forEach((t) => {
    const k = t.toLowerCase()
    if (k !== REP_ALL.toLowerCase() && !seen.has(k)) seen.set(k, t)
  }))
  return [{ label: REP_ALL, tag: null }, ...[...seen.values()].map((t) => ({ label: t, tag: t }))]
}

/* ------------------------------------------------------------------ *
 * §4.10 The booking calendar's dates
 *
 * Every date the calendar handles is an ISO 'YYYY-MM-DD' string — what a
 * date input stores, what `c.booked` holds and what the section's `sel`
 * names — and every sum over one goes through `Date.UTC`. A local-time
 * Date built from those parts lands on the previous day west of
 * Greenwich, which would name the wrong weekday in the enquiry line.
 *
 * Nothing here reads the clock. The calendar opens on the date the artist
 * set, not on today, so a published page draws the same month whenever it
 * is opened — and the canvas's picture cannot drift off the reference
 * frame's June overnight.
 * ------------------------------------------------------------------ */

// The shape of one month's grid: the blank cells that lead it, and the days
// that follow. Day 0 of the next month is the last of this one.
export function monthSpan(y, m) {
  return {
    lead: new Date(Date.UTC(y, m, 1)).getUTCDay(),
    length: new Date(Date.UTC(y, m + 1, 0)).getUTCDate(),
  }
}

// 'YYYY-MM-DD' → { y, m, d }, `m` zero-based, or null if it is not one. A date
// that does not exist (31 June, 30 February) is rejected rather than rolled
// over, so an emptied or half-typed field falls back to the seed instead of
// silently opening the calendar on a month the artist did not choose.
export function parseDate(v) {
  const t = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(v ?? '').trim())
  if (!t) return null
  const y = +t[1], m = +t[2] - 1, d = +t[3]
  if (m < 0 || m > 11 || d < 1 || d > monthSpan(y, m).length) return null
  return { y, m, d }
}

export function isoDate(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

export function weekdayOf(y, m, d) {
  return new Date(Date.UTC(y, m, d)).getUTCDay()
}

export function monthLabel(y, m) {
  return `${MONTHS[m]} ${y}`
}

// The line along the foot of the scheduler panel, composed rather than stored:
// it has to follow the day the visitor picks, and the retired CAL_ENQUIRY could
// only ever name one. `enquiryLine(2025, 5, 12, '9:00pm')` reproduces that
// constant exactly, which is what keeps the seeded canvas on the frame.
//
// An emptied time drops its clause rather than printing a trailing " at " —
// the Soundcloud button's rule for a field the artist has not filled.
export function enquiryLine(y, m, d, time) {
  const t = String(time ?? '').trim()
  return `Enquiry for ${DAY_FULL[weekdayOf(y, m, d)]}, ${MONTHS[m]} ${d}`
    + (t ? ` at ${t}` : '')
}
