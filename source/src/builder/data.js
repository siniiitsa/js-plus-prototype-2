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
  { id: 'tags', name: 'Tags', n: 3 },
  { id: 'audio', name: 'Audio Player', n: 10 },
  { id: 'video', name: 'Video', n: 3 },
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
 * §4.4 NVAR — distinct rendered designs per category.
 * For everything except the header, more layout choices are offered
 * than there are designs; the rendered design is `arch % NVAR[cat]`.
 * ------------------------------------------------------------------ */

export const NVAR = {
  header: 6, bio: 2, media: 2, tags: 2, audio: 3, video: 2, pricing: 2,
  repertoire: 2, gallery: 2, calendar: 2, map: 2, testimonials: 2, form: 2, footer: 1,
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
    ['Framed', 'Photo in a frame'],
    ['Gradient stage', 'Colour wash'],
    ['Polaroid', 'Photo card beside text'],
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

// The "now playing" card that sits beside the track stack.
export const NOW_PLAYING = { track: 'Night Rain', at: '02:28', of: '04:22', pct: 34 }

export const TAGS = ['Default', 'Sold Out', 'New Release', 'Archive', 'Live', 'All Access']

export const TIERS = [
  { name: 'The House Party', price: '£450', blurb: 'Birthdays, anniversaries, intimate gatherings.',
    feats: ['Solo DJ setup', 'Vinyl-only option', 'Requests welcome', 'Up to 50 mi travel'] },
  { name: 'The Wedding Set', price: '£650', blurb: 'Ceremony, dinner, dance. One DJ for the whole day.', featured: true,
    feats: ['Ceremony underscoring', 'Drinks + dinner ambience', 'Peak-time dance floor', 'Custom first dance', 'PA + lighting'] },
  { name: 'The Festival Set', price: '£1,200', blurb: 'High-energy set built for outdoor stages and big rooms.',
    feats: ['Tech rider provided', 'CDJ + vinyl combo', 'Visual sync available', 'Extended encore', 'Festival-grade PA'] },
]

// The Solo / Trio / Band selector above the pricing cards. Static: the
// preview is a picture of a website, not a working one (§12).
export const TIER_MODES = ['Solo', 'Trio', 'Band']

export const QUOTES = [
  { q: '"Professional from the first email to the last encore."',
    who: 'Hannah L.', role: 'Private host', when: 'Reviewed 6 days ago' },
  { q: 'The room did not sit down once. Kai read the crowd like a setlist.',
    who: 'Amara Okafor', role: 'Venue manager, Albert Hall', when: 'Reviewed 3 weeks ago' },
  { q: 'Booked for one night, kept for the whole season.',
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
 * Static like TRACKS / CITIES above: this is the picture of a finished
 * site, not editable copy, so none of it gets a FIELDS entry — with the
 * one exception of SONGS, which the artist owns (FIELDS.repertoire).
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
// a song gets one chip here, not two.
export const REP_ALL = 'All'

// The events map's pager is still a picture, so it keeps its static row.
export const PAGES = ['1', '2', '3', '…', '20']

// Events map — the upcoming-gigs list beside the map tile.
export const GIGS = [
  { venue: 'Hidden Warehouse',  city: 'Manchester',   time: '22:00', month: 'Jul', day: '12' },
  { venue: 'The Deaf Institute', city: 'Manchester',  time: '21:00', month: 'Jul', day: '25' },
  { venue: 'Private wedding',   city: 'Lake District', time: '19:00', month: 'Aug', day: '02' },
  { venue: 'Mint Lounge',       city: 'Manchester',   time: '23:00', month: 'Aug', day: '16' },
  { venue: 'Gorilla',           city: 'Manchester',   time: '23:00', month: 'Aug', day: '30' },
]
export const MAP_RADIUS = '12 mile radius'
export const MAP_BASE = 'Based in Manchester'
export const MAP_TERMS = '120 mi standard · further on request'

// Gallery — the media-source selector down the left of the section.
export const GALLERY_SOURCES = ['Gallery', 'YouTube', 'Instagram', 'TikTok']

// Enquiry form — the split context panel and the field set beside it.
export const FORM_PROMISES = ['Replies within 24 hrs', 'Free, no-obligation quote', 'Covers 120 mi from Manchester']
export const FORM_FIELDS = [
  { l: 'Name',       p: 'Full name' },
  { l: 'Email',      p: 'you@email.com' },
  { l: 'Event date', p: 'dd / mm / yyyy' },
  { l: 'Guests',     p: 'approx.' },
]
export const FORM_TYPES = ['Wedding', 'Event', 'Pub', 'Party', 'Other']
export const FORM_MESSAGE = 'Tell me about your event…'

// Footer — two link columns and the small print either side of the rule.
export const FOOTER_LINKS = [
  ['About', 'Top Tracks', 'Media', 'Repertoire'],
  ['Shows/Coverage', 'Pricing', 'Enquiries', 'Reviews'],
]
export const FOOTER_CREDIT = 'A JustPay Product'
// The frames' own hard break — see sectionVm, which is the other half of it.
export const FOOTER_STATEMENT = "Let's make\nyour night unforgettable."

// No `repertoire` entry: its heading counts the songs (see sectionVm), so a
// literal here would never be read.
export const TITLES = { bio: 'Reads the room.', media: 'Five worth your ear.', tags: 'Tags',
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
  calPara:    'August is filling fast. Highlighted dates are already booked — everything else is yours.',
  mapSub:     '12 dates · 8 cities · this season',
  formPara:   'Tell me about the night — date, venue, crowd. Replies within 24 hours.',
  copyright:  'C 2026 Kai Mercer',
}

// Calendar highlighting for the legacy list design (August)
export const BOOKED = [3, 4, 10, 11, 17, 24, 25]
export const HELD   = [12, 18]

// §10.2 scheduler — June 2025 starts on a Sunday, so there are no leading
// blanks and the grid runs 1..30. Day 12 is the selected Thursday.
export const CAL_MONTH   = 'June 2025'
export const CAL_DAYS    = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const CAL_LEAD    = 0
export const CAL_LENGTH  = 30
export const CAL_PICKED  = 12
export const CAL_ENQUIRY = 'Enquiry for Thursday, June 12 at 9:00pm'

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
      hint: 'The portrait card and the small round avatar. The Polaroid layout uses the background photo instead.' },
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
    { k: 'image',     l: 'Photo', type: 'image', hint: 'Fills the tilted portrait card.' },
    { k: 'heading',   l: 'Heading', d: 'Reads the room.' },
    { k: 'statement', l: 'Statement (centred layout)', def: 'statement' },
    { k: 'para1',     l: 'Paragraph 1', type: 'area', def: 'bioP1' },
    { k: 'para2',     l: 'Paragraph 2', type: 'area', def: 'bioP2' },
  ],
  media: [
    { k: 'images',  l: 'Artwork', type: 'images', max: 6,
      hint: 'Photos 1–5 are the track thumbnails, in order. Photo 6 is the large now-playing sleeve.' },
    { k: 'kicker',  l: 'Kicker', d: 'Top tracks' },
    { k: 'track',   l: 'Featured track', d: 'Late Lights' },
    { k: 'heading', l: 'Heading', d: 'Five worth your ear.' },
  ],
  tags: [
    { k: 'tags', l: 'Tags (comma-separated)', type: 'area', d: TAGS.join(', ') },
  ],
  audio: [
    { k: 'heading', l: 'Heading', d: 'Selected Tracks' },
    { k: 'tracks',  l: 'Tracks (one per line: Name — 3:42)', type: 'area',
      d: TRACKS.map(([n, dur]) => `${n} — ${dur}`).join('\n') },
  ],
  video: [
    { k: 'heading',     l: 'Heading', d: 'Live at Roomtone' },
    { k: 'description', l: 'Description', type: 'area', def: 'videoDesc' },
    { k: 'duration',    l: 'Duration', d: '04:18' },
  ],
  pricing: [
    { k: 'heading', l: 'Heading', d: "Choose the set that's right for your night" },
    { k: 'sub',     l: 'Small print', def: 'pricingSub' },
    { k: 't1n', l: 'Tier 1 name',  d: 'The House Party' },
    { k: 't1p', l: 'Tier 1 price', d: '£450' },
    { k: 't2n', l: 'Tier 2 name',  d: 'The Wedding Set' },
    { k: 't2p', l: 'Tier 2 price', d: '£650' },
    { k: 't3n', l: 'Tier 3 name',  d: 'The Festival Set' },
    { k: 't3p', l: 'Tier 3 price', d: '£1,200' },
  ],
  // The one list-shaped content type with a structured editor rather than a
  // textarea: `songs` is an array of { title, artist, tags }, and SongsField
  // in EncoreBuilder is the repeater that maintains it. An absent key means
  // the seeded SONGS; an emptied array means the artist has no songs listed.
  repertoire: [
    // No `d`: the heading falls back to the song count, in sectionVm and in
    // the panel alike, so it cannot claim 240 songs over a list of twelve.
    { k: 'heading', l: 'Heading' },
    { k: 'songs',   l: 'Songs', type: 'songs', max: 60,
      hint: 'Tags become the filter chips above the list — separate them with commas.' },
  ],
  gallery: [
    { k: 'images',  l: 'Photos', type: 'images', max: 7,
      hint: 'One per tile in the strip. The highlighted tile is the one shown in the large viewer.' },
    { k: 'heading', l: 'Heading', d: 'See us in action' },
  ],
  calendar: [
    { k: 'image',   l: 'Photo', type: 'image', hint: 'Fills the polaroid stack beside the month.' },
    { k: 'heading', l: 'Heading', d: 'Availability' },
    { k: 'para',    l: 'Paragraph', type: 'area', def: 'calPara' },
    { k: 'cta',     l: 'Button', d: 'Check a date' },
  ],
  map: [
    { k: 'heading', l: 'Heading', d: 'Manchester' },
    { k: 'sub',     l: 'Subline (full map layout)', def: 'mapSub' },
  ],
  testimonials: [
    { k: 'heading', l: 'Heading', d: 'Word of Mouth' },
    { k: 'quote',   l: 'Featured quote', type: 'area', d: QUOTES[0].q },
    { k: 'who',     l: 'Attribution', d: 'Hannah L.' },
    { k: 'role',    l: 'Role', d: 'Private host' },
  ],
  form: [
    { k: 'image',   l: 'Photo', type: 'image', hint: 'The avatar above the heading.' },
    { k: 'heading', l: 'Heading', d: "Let's make your night unforgettable." },
    { k: 'para',    l: 'Paragraph', type: 'area', def: 'formPara' },
    { k: 'email',   l: 'Email address', d: 'bookings@kaimercer.co.uk' },
    { k: 'button',  l: 'Button', d: 'Book Now' },
  ],
  footer: [
    { k: 'statement', l: 'Statement', type: 'area', d: FOOTER_STATEMENT },
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

// A song's raw `tags` string → its trimmed, non-empty labels.
export function songTags(str) {
  return String(str ?? '').split(',').map((t) => t.trim()).filter(Boolean)
}

// The repertoire filter row: REP_ALL, then every tag any song carries, in
// first-seen order. Deduped case-insensitively but keeping the casing it was
// first typed in, so 'Weddings' and 'weddings' are one chip rather than two.
// `label` is what the chip prints; `tag` is the raw value it matches against,
// and is null on the All chip.
export function repChips(songs) {
  const seen = new Map()
  ;(songs || []).forEach((sg) => songTags(sg && sg.tags).forEach((t) => {
    const k = t.toLowerCase()
    if (k !== REP_ALL.toLowerCase() && !seen.has(k)) seen.set(k, t)
  }))
  return [{ label: REP_ALL, tag: null }, ...[...seen.values()].map((t) => ({ label: t, tag: t }))]
}
