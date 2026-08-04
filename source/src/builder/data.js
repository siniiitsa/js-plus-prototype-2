// §4 — Static data module. Pure data plus four helpers; no React.
// Every literal here is normative: do not round, substitute or "improve".

/* ------------------------------------------------------------------ *
 * §4.1 THEMES — 5 templates
 * ------------------------------------------------------------------ */

export const THEMES = [
  {
    name: 'Retro',
    sub: 'Alfa Slab One · warm 70s',
    display: "'Alfa Slab One', serif",
    body: "'Karla', sans-serif",
    casing: 'lower',
    dls: '0px',
    radius: '14px',
    radiusSm: '10px',
    btnR: '999px',
    // §4.2 — [background, accent, text]
    sets: [
      ['#EAD7B8', '#C8461C', '#111111'], // soft beige · burnt orange · black (signature)
      ['#FBF6EA', '#C8461C', '#C8461C'], // off-white · burnt orange · orange
      ['#5B5E2E', '#D8A227', '#FBF6EA'], // olive · mustard · off-white
      ['#7A58A7', '#E973A5', '#FBF6EA'], // purple · pink · off-white
      ['#111111', '#D8A227', '#FBF6EA'], // black · mustard · off-white
    ],
    tags: ['#7A58A7', '#C8461C', '#D8A227', '#5B5E2E', '#E973A5', '#111111'],
  },
  {
    name: 'Lime',
    sub: 'Bebas Neue · dark acid',
    display: "'Bebas Neue', sans-serif",
    body: "'Archivo', sans-serif",
    casing: 'upper',
    dls: '0.02em',
    radius: '6px',
    radiusSm: '4px',
    btnR: '4px',
    sets: [
      ['#15180F', '#AFE335', '#F2FFD0'],
      ['#2E3928', '#AFE335', '#AFE335'],
      ['#AFE335', '#15180F', '#15180F'],
      ['#F2FFD0', '#15180F', '#15180F'],
      ['#F2FFD0', '#AFE335', '#15180F'],
    ],
    tags: ['#AFE335', '#2E3928', '#15180F', '#F2FFD0'],
  },
  {
    name: 'Grunge',
    sub: 'Special Elite · stamp red',
    display: "'Special Elite', monospace",
    body: "'Courier Prime', monospace",
    casing: 'upper',
    dls: '0.04em',
    radius: '0',
    radiusSm: '0',
    btnR: '0',
    sets: [
      ['#000000', '#DF262C', '#FFFFFF'],
      ['#171716', '#DF262C', '#DF262C'],
      ['#DF262C', '#000000', '#FFFFFF'],
      ['#FFFFFF', '#DF262C', '#000000'], // white paper · red stamp
      ['#171716', '#FFFFFF', '#FFFFFF'], // monochrome
    ],
    tags: ['#DF262C', '#171716', '#FFFFFF', '#000000'],
  },
  {
    name: 'Editorial',
    sub: 'Playfair Display · refined',
    display: "'Playfair Display', serif",
    body: "'Lora', serif",
    casing: 'title',
    dls: '-0.01em',
    radius: '2px',
    radiusSm: '2px',
    btnR: '2px',
    sets: [
      ['#F6F0E8', '#C86E52', '#141414'],
      ['#AA958A', '#F6F0E8', '#F6F0E8'],
      ['#141414', '#C86E52', '#F6F0E8'],
      ['#C86E52', '#F6F0E8', '#F6F0E8'],
      ['#E6B6A0', '#141414', '#141414'],
    ],
    tags: ['#C86E52', '#141414', '#AA958A', '#E6B6A0'],
  },
  {
    name: 'Pop',
    sub: 'Titan One · loud & bright',
    display: "'Titan One', sans-serif",
    body: "'Archivo', sans-serif",
    casing: 'upper',
    dls: '0.01em',
    radius: '20px',
    radiusSm: '14px',
    btnR: '999px',
    sets: [
      ['#FFFFFF', '#FF2DA0', '#6B2CFF'],
      ['#C6F200', '#FF2DA0', '#FF2DA0'],
      ['#FF2DA0', '#C6F200', '#FFFFFF'],
      ['#2563FF', '#00E0C4', '#FFFFFF'],
      ['#000000', '#FF2DA0', '#C6F200'],
    ],
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

export const TRACKS = [['Late Lights', '3:42'], ['Manchester at 3am', '5:08'],
  ['Slow Burn', '4:15'], ['Echo & The Floor', '6:21'], ['Roomtone', '3:57']]

export const TAGS = ['Default', 'Sold Out', 'New Release', 'Archive', 'Live', 'All Access']

export const TIERS = [
  { name: 'Club Set', price: '£450', blurb: '90-minute peak-time set',
    feats: ['90-minute set', 'Own decks & lights', 'Local travel included'] },
  { name: 'Full Night', price: '£850', blurb: 'Open to close, full rig', featured: true,
    feats: ['4-hour open-to-close', 'Full rig & engineer', 'Playlist consultation', 'Nationwide travel'] },
  { name: 'Private Event', price: '£1,200', blurb: 'Weddings & bespoke events',
    feats: ['Bespoke set design', 'MC & host option', 'Late licence cover'] },
]

export const QUOTES = [
  { q: 'The room did not sit down once. Kai read the crowd like a setlist.',
    who: 'Amara Okafor', role: 'Venue manager, Albert Hall' },
  { q: 'Booked for one night, kept for the whole season.',
    who: 'Dan Whitfield', role: 'The Warehouse Project' },
  { q: 'The only DJ our regulars ask for by name.',
    who: 'Priya Shah', role: 'Roomtone Club' },
]

export const CITIES = [
  { date: '14 Aug', city: 'Manchester', venue: 'Albert Hall',         status: 'Tickets'  },
  { date: '22 Aug', city: 'Leeds',      venue: 'Belgrave Music Hall', status: 'Tickets'  },
  { date: '05 Sep', city: 'London',     venue: 'XOYO',                status: 'Sold out' },
  { date: '19 Sep', city: 'Glasgow',    venue: 'Sub Club',            status: 'Tickets'  },
]

export const REP = [
  { genre: 'House',    items: ['Deep & rolling', 'Piano classics', 'UK garage crossover'] },
  { genre: 'Disco',    items: ['70s floor-fillers', 'Nu-disco edits', 'Rare groove'] },
  { genre: 'Classics', items: ['Motown & soul', 'Indie anthems', 'Last-dance ballads'] },
]

export const PINS = [{ x: '20%', y: '26%' }, { x: '40%', y: '54%' }, { x: '62%', y: '28%' },
                     { x: '74%', y: '64%' }, { x: '46%', y: '76%' }]

export const TITLES = { bio: 'About Kai', media: 'Latest Release', tags: 'Tags',
  audio: 'Selected Tracks', video: 'Live at Roomtone', pricing: 'Bookings & Rates',
  repertoire: 'Repertoire', gallery: 'On Camera', calendar: 'Availability',
  map: 'On the Road', testimonials: 'Word of Mouth', form: 'Book Kai', footer: '' }

export const DEFS = {
  heroSub:    'DJ & selector. Clubs, weddings and festivals across the North — nights built live, never off a playlist.',
  bioP1:      'Fifteen years behind the decks, from basement clubs in Manchester to festival main stages. Kai builds nights that move — reading rooms, not playlists, and never playing the same set twice.',
  bioP2:      'Residencies at Roomtone and The Warehouse Project. Available for clubs, weddings and private events across the UK.',
  statement:  'Rooms, not playlists.',
  videoDesc:  'Full closing set, recorded live. One hour of the room at its loudest.',
  pricingSub: 'Every booking includes a pre-event call and a request list.',
  calPara:    'August is filling fast. Highlighted dates are already booked — everything else is yours.',
  mapSub:     '12 dates · 8 cities · this season',
  formPara:   'Tell me about the night — date, venue, crowd. Replies within 24 hours.',
  copyright:  '© 2026 Kai Mercer · Built with Encore',
}

// Calendar highlighting (August)
export const BOOKED = [3, 4, 10, 11, 17, 24, 25]
export const HELD   = [12, 18]

/* ------------------------------------------------------------------ *
 * §4.7 Starting pages — [categoryId, layoutIndex, colourSetIndex]
 * ------------------------------------------------------------------ */

// "Theme Example" — a populated page the user can immediately edit.
export const EXAMPLE_PAGE = [
  ['header',       0, 0],
  ['bio',          0, 1],
  ['media',        0, 2],
  ['pricing',      0, 0],
  ['testimonials', 1, 3],
  ['form',         0, 1],
  ['footer',       0, 4],
]

// "Blank" — only the two mandatory sections.
export const BLANK_PAGE = [
  ['header', 0, 0],
  ['footer', 0, 4],
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
    { k: 'image',     l: 'Photo',            type: 'image' },
    { k: 'kicker',    l: 'Kicker',           d: 'DJ · Live Act' },
    { k: 'title',     l: 'Title' },                       // defaults to artistName — special-cased
    { k: 'subtitle',  l: 'Subtitle',         type: 'area', def: 'heroSub' },
    { k: 'location',  l: 'Location',         d: 'Manchester, UK' },
    { k: 'cta1',      l: 'Primary button',   d: 'Book Kai' },
    { k: 'cta2',      l: 'Secondary button', d: 'Listen' },
    { k: 'showTags',  l: 'Tag chips',        type: 'select', d: 'show', opts: SHOW_HIDE },
    { k: 'showBadge', l: 'Corner badge',     type: 'select', d: 'show', opts: SHOW_HIDE },
    { k: 'badgeText', l: 'Badge text',       d: 'Available for bookings' },
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
    { k: 'heading',   l: 'Heading', d: 'About Kai' },
    { k: 'statement', l: 'Statement (centred layout)', def: 'statement' },
    { k: 'para1',     l: 'Paragraph 1', type: 'area', def: 'bioP1' },
    { k: 'para2',     l: 'Paragraph 2', type: 'area', def: 'bioP2' },
  ],
  media: [
    { k: 'kicker',  l: 'Kicker', d: 'Latest release' },
    { k: 'track',   l: 'Featured track', d: 'Late Lights' },
    { k: 'heading', l: 'Heading (card row layout)', d: 'Latest Release' },
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
    { k: 'heading', l: 'Heading', d: 'Bookings & Rates' },
    { k: 'sub',     l: 'Subheading', def: 'pricingSub' },
    { k: 't1n', l: 'Tier 1 name',  d: 'Club Set' },
    { k: 't1p', l: 'Tier 1 price', d: '£450' },
    { k: 't2n', l: 'Tier 2 name',  d: 'Full Night' },
    { k: 't2p', l: 'Tier 2 price', d: '£850' },
    { k: 't3n', l: 'Tier 3 name',  d: 'Private Event' },
    { k: 't3p', l: 'Tier 3 price', d: '£1,200' },
  ],
  repertoire: [
    { k: 'heading', l: 'Heading', d: 'Repertoire' },
  ],
  gallery: [
    { k: 'heading', l: 'Heading', d: 'On Camera' },
  ],
  calendar: [
    { k: 'heading', l: 'Heading', d: 'Availability' },
    { k: 'para',    l: 'Paragraph', type: 'area', def: 'calPara' },
    { k: 'cta',     l: 'Button', d: 'Check a date' },
  ],
  map: [
    { k: 'heading', l: 'Heading', d: 'On the Road' },
    { k: 'sub',     l: 'Subline (full map layout)', def: 'mapSub' },
  ],
  testimonials: [
    { k: 'heading', l: 'Heading', d: 'Word of Mouth' },
    { k: 'quote',   l: 'Featured quote', type: 'area', d: QUOTES[0].q },
    { k: 'who',     l: 'Attribution', d: 'Amara Okafor' },
    { k: 'role',    l: 'Role', d: 'Venue manager, Albert Hall' },
  ],
  form: [
    { k: 'heading', l: 'Heading', d: 'Book Kai' },
    { k: 'para',    l: 'Paragraph', type: 'area', def: 'formPara' },
    { k: 'email',   l: 'Email address', d: 'bookings@kaimercer.co.uk' },
    { k: 'button',  l: 'Button', d: 'Send enquiry' },
  ],
  footer: [
    { k: 'copyright', l: 'Small print', def: 'copyright' },
  ],
}

/* ------------------------------------------------------------------ *
 * §4.9 Helpers
 * ------------------------------------------------------------------ */

// Luminance-based black/white picker. Threshold 0.58 — not 0.5.
export function contrast(hex) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.58 ? '#141414' : '#FFFFFF'
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
