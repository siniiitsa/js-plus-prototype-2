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
    // Figma's `font/ui` — the face `Label/XS` names (the chips, the day
    // numbers, the feature lines). Retro's mode sets it to Inter, the same face
    // as `body`, and spelled identically so a reader switched from `s.body` to
    // `s.ui` computes the byte-equal font-family. Themes without the key fall
    // back to `body` in sectionVm.
    ui: "'Inter', sans-serif",
    // The frames' small typewriter lines — kickers, the gallery's back link,
    // the gig list's label, sub-lines and date chips — are Space Mono, a Google
    // Font, so they are set in it verbatim. Themes without the key fall back to
    // `body` in sectionVm.
    mono: "'Space Mono', monospace",
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
    // Lime is the second template with a Figma variable mode ("1 · Primitives" →
    // Lime, "2 · Scheme" → Scheme 1), so every value below is that mode's, read
    // off the file rather than chosen. Bebas Neue is caps-only, which is why the
    // display and label faces need no casing of their own; Chakra Petch and
    // Inter set mixed case ("Sold Out", "Full name") and so casing is 'title'.
    display: "'Bebas Neue', sans-serif",
    label: "'Bebas Neue', sans-serif",
    ui: "'Chakra Petch', sans-serif",
    body: "'Inter', sans-serif",
    casing: 'title',
    // Every Lime text style states letterSpacing 0.
    dls: '0px',
    // radius/card, radius/control, radius/pill, border/thin — the same four
    // tokens Retro's 20 / 14 / 999 / 2 are.
    radius: '26px',
    radiusSm: '13px',
    btnR: '999px',
    bw: '2px',
    // radius/chip. Retro's is 8 and has no key: its chips write the literal.
    radiusChip: '6px',
    palette: ['#15180F', '#AFE335', '#F2FFD0'], // near-black · acid lime · pale lime
    // Scheme 1's tag1…tag7 backgrounds alternate between exactly these two, so
    // the seat system every `T.tags` reader walks has two seats here. Their
    // inks are not contrast()'s black and white, hence `sem.tagFg` beside them.
    tags: ['#2E3928', '#AFE335'],
    // The semantic colours the three-colour palette cannot derive — Scheme 1,
    // the scheme eight of the eleven layout-1 sections stand on. sectionVm
    // resolves them onto flat vm keys (`s.box1`, `s.glow`, …). Retro has no
    // `sem` and must not grow one: its branches write these as literals.
    sem: {
      box1: '#2E3928',                      // sem/box/1 — the olive band, the card fill
      box2: '#394732',                      // sem/box/2 — a raised card
      box3: '#101309',                      // sem/box/3 — a sunk well
      glow: '#A6E22E',                      // sem/glow
      activeBg: '#AFE335',                  // sem/active/bg
      activeFg: '#0D1F03',                  // sem/active/text — ink on lime, not contrast(ac)
      inactiveBg: '#2E3928',                // sem/inactive/bg
      inactiveFg: '#AFE335',                // sem/inactive/text
      inactiveLine: '#2E3928',              // sem/state/inactive/border
      stroke1: 'rgba(242, 255, 208, 0.15)', // sem/stroke/1 — hairlines
      stroke2: '#AFE335',                   // sem/stroke/2
      hl: '#C7FF3C',                        // sem/box/1/text — the highlight ink
      tagFg: ['#AFE335', '#0D1F03'],        // sem/tag/1/text, sem/tag/2/text — parallel to `tags`
    },
  },
  {
    name: 'Grunge',
    sub: 'Anton · stamp red',
    // Grunge is the third template with a Figma variable mode ("1 · Primitives"
    // → Static Youth, "2 · Scheme" → Scheme 1), so every value below is that
    // mode's. The exception is the display and label face: the mode names
    // Stones Crush, a commercial distressed caps grotesque that cannot ship, so
    // it is set in Anton — the nearest free silhouette, heavy and condensed,
    // without the distress (user call, 2026-09-21; Retro's Soulway → Fraunces
    // precedent). Anton has a lowercase where Stones Crush is all capitals, so
    // a Grunge block sets its display and label strings `textTransform:
    // 'uppercase'` per site; Chakra Petch and Inter set mixed case ("Sold Out",
    // "Full name"), which is why casing is 'title' and not 'upper'.
    display: "'Anton', sans-serif",
    label: "'Anton', sans-serif",
    // Anton's glyphs against Stones Crush's: set at 0.75 of the token, line
    // height divided back out (`faced` / `facedLh` in EncoreSection). A theme
    // with no key sets its face at the token (1).
    faceK: 0.75,
    ui: "'Chakra Petch', sans-serif",
    body: "'Inter', sans-serif",
    casing: 'title',
    // Every Static Youth text style states letterSpacing 0.
    dls: '0px',
    // radius/card, radius/control, radius/pill, border/thin, radius/chip.
    radius: '8px',
    radiusSm: '8px',
    btnR: '999px',
    bw: '2px',
    radiusChip: '4px',
    palette: ['#000000', '#DF262C', '#FFFFFF'], // black · stamp red · white
    // Scheme 1's tag1…tag7 alternate between exactly these two — Lime's two-seat
    // system — with their inks in `sem.tagFg`.
    tags: ['#1A1A1A', '#DF262C'],
    // Scheme 1, the scheme seven of the eleven layout-1 sections stand on (and
    // Scheme 4, which is Scheme 1 byte for byte in this mode). The header, the
    // media player, the events map and the enquiry form stand on Scheme 2
    // (`#171716` ground, `#000000` box1) and take its values as named literals.
    sem: {
      box1: '#1A1A1A',                      // sem/box/1
      box2: '#383838',                      // sem/box/2
      box3: '#0E0E0E',                      // sem/box/3
      glow: '#DF262C',                      // sem/glow
      activeBg: '#DF262C',                  // sem/active/bg
      // sem/active/text and sem/tag/2/text are Lime's inks (#15180F, #0D1F03),
      // leaked into this mode: a lime-tinted near-black nobody chose for a red
      // chip. Written as the mode states them, since they render as black
      // either way — plans/grunge/layout-1.md, open question 5.
      activeFg: '#15180F',
      inactiveBg: '#1A1A1A',                // sem/inactive/bg
      inactiveFg: '#FFFFFF',                // sem/inactive/text
      inactiveLine: '#1A1A1A',              // sem/state/inactive/border
      stroke1: 'rgba(255, 255, 255, 0.15)', // sem/stroke/1 — hairlines
      stroke2: '#FF0000',                   // sem/stroke/2 — pure red, not the accent; the header session checks it
      hl: '#FFFFFF',                        // sem/box/1/text
      tagFg: ['#FFFFFF', '#0D1F03'],        // sem/tag/1/text, sem/tag/2/text — parallel to `tags`
    },
  },
  {
    name: 'Editorial',
    sub: 'Noto Serif Display · paper & ink',
    // Editorial is the fourth template with a Figma variable mode ("1 ·
    // Primitives" → Sienna Vale, "2 · Scheme" → Scheme 1), so every value below
    // is that mode's. The exception is the display and label face: the mode
    // names FONTSPRING DEMO - Fisterra Fora, a demo-licence caps-only condensed
    // display serif that cannot ship, so it is set in Noto Serif Display at its
    // narrowest width (user call, 2026-09-24: substitute, "pick the closest").
    // index.html asks Google for exactly one instance — `wdth,wght@62.5,540..700`
    // — so the single face it serves is condensed whatever a site asks, and a
    // site that names no weight gets 540, the frame's stem to the pixel (.154
    // of the cap); the three Bold statements get 700. Its cap height is the
    // frame's within 1.4% (.715 against .725 of the em), so it takes no
    // `faceK`. Do NOT add a second Noto Serif Display entry to that link: the
    // default 400 would find a face of its own and the display would go wide
    // and thin (Retro's Fraunces rule). It has a lowercase where Fisterra Fora
    // is all capitals, so an Editorial block sets its display and label strings
    // `textTransform: 'uppercase'` per site, Grunge's rule; Chakra Petch and
    // Inter set mixed case ("Sold Out", "Full name"), hence casing 'title'.
    display: "'Noto Serif Display', serif",
    label: "'Noto Serif Display', serif",
    ui: "'Chakra Petch', sans-serif",
    body: "'Inter', sans-serif",
    casing: 'title',
    // Every Sienna Vale text style states letterSpacing 0.
    dls: '0px',
    // radius/card, radius/control, radius/pill, border/thin, radius/chip.
    radius: '16px',
    radiusSm: '6px',
    btnR: '999px',
    bw: '2px',
    radiusChip: '6px',
    // Scheme 1's bg / text1 / text2.
    palette: ['#F6F0E8', '#C86E52', '#141414'], // warm paper · terracotta · near-black
    // Scheme 1's tag1…tag7 alternate between exactly these two — Lime's
    // two-seat system — with their inks in `sem.tagFg`.
    tags: ['#E6B6A0', '#C86E52'],
    // Scheme 1, paper — the scheme five of the eleven layout-1 sections stand
    // on. Its stroke1 is opaque ink, not a 15% hairline: the frames' dashed
    // rules on paper are black.
    sem: {
      box1: '#FFF9F2',                      // sem/box/1
      box2: '#EDE6DC',                      // sem/box/2
      box3: '#141414',                      // sem/box/3
      glow: '#C86E52',                      // sem/glow
      activeBg: '#C86E52',                  // sem/active/bg
      activeFg: '#F6F0E8',                  // sem/active/text
      inactiveBg: '#F6F0E8',                // sem/inactive/bg
      inactiveFg: '#C86E52',                // sem/inactive/text
      inactiveLine: '#141414',              // sem/state/inactive/border
      stroke1: '#141414',                   // sem/stroke/1 — opaque
      stroke2: '#C86E52',                   // sem/stroke/2
      hl: '#141414',                        // sem/box/1/text
      tagFg: ['#141414', '#F6F0E8'],        // sem/tag/1/text, sem/tag/2/text — parallel to `tags`
    },
    // The other schemes the frames stand a whole section on (SCHEMES_OF), in
    // Scheme 1's shape: `palette` is [bg, text1, text2]. Scheme 2's accent is
    // paper, so its heads are paper on taupe; Schemes 2's and 3's inactive
    // ground is transparent, so an idle chip there is an outline only.
    schemes: {
      // Scheme 2, taupe — layout 1's media player and pricing, and layout 2's
      // media panel and calendar card.
      2: {
        palette: ['#AA958A', '#F6F0E8', '#141414'],
        // tag1 blush, tag2 paper, both inked black — read off the file; the
        // plan's table had the two seats the other way round.
        tags: ['#E6B6A0', '#F6F0E8'],
        sem: {
          box1: '#BAA499', box2: '#D0BCB2', box3: '#A18A7E', glow: '#E6B6A0',
          activeBg: '#E6B6A0', activeFg: '#141414',
          inactiveBg: 'rgba(170, 149, 138, 0)', inactiveFg: '#F6F0E8', inactiveLine: '#F6F0E8',
          stroke1: '#F6F0E8', stroke2: '#E6B6A0', hl: '#FFFFFF',
          tagFg: ['#141414', '#141414'],
        },
      },
      // Scheme 3, ink — layout 1's header, repertoire, enquiry form and
      // footer, and layout 2's pricing at 1440.
      3: {
        palette: ['#141414', '#C86E52', '#F6F0E8'],
        tags: ['#F6F0E8', '#C86E52'],
        sem: {
          box1: '#1D1D1D', box2: '#2A2A2A', box3: '#0E0E0E', glow: '#C86E52',
          activeBg: '#C86E52', activeFg: '#F6F0E8',
          inactiveBg: 'rgba(20, 20, 20, 0)', inactiveFg: '#F6F0E8', inactiveLine: '#F6F0E8',
          stroke1: 'rgba(246, 240, 232, 0.56)', stroke2: '#E6B6A0', hl: '#FFFFFF',
          tagFg: ['#141414', '#F6F0E8'],
        },
      },
      // Scheme 4, terracotta — layout 2's repertoire at 1440 and its enquiry
      // form. Its accent is paper and its active pair ink under terracotta, so
      // `pillBg` is ink here. tag1 ink, tag2 salmon — read off the file; layout
      // 1's plan had the two seats the other way round.
      4: {
        palette: ['#C86E52', '#F6F0E8', '#141414'],
        tags: ['#141414', '#EF9173'],
        sem: {
          box1: '#DA7C5E', box2: '#EF9173', box3: '#BE6346', glow: '#C86E52',
          activeBg: '#141414', activeFg: '#C86E52',
          inactiveBg: 'rgba(200, 110, 82, 0)', inactiveFg: '#F6F0E8', inactiveLine: '#F6F0E8',
          stroke1: 'rgba(246, 240, 232, 0.56)', stroke2: '#141414', hl: '#FFFFFF',
          tagFg: ['#C86E52', '#141414'],
        },
      },
    },
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

// Which Figma colour scheme a section stands on, where its frames stand it on
// one other than Scheme 1 — by template, then design index (`arch %
// designCount`), then category. The number names an entry of that template's
// `schemes` ({ palette, sem, tags }, Scheme 1's own shape), which sectionVm
// lays over the theme before it reads a colour, so every derived key follows
// the section's ground. A section with no entry stands on Scheme 1, the
// theme's own `palette` / `sem` / `tags`. An entry is a number at every width,
// or a [desktop, tablet, mobile] triple where the frames move the section
// between widths. The footer has one design, so its row is read at every page
// layout.
export const SCHEMES_OF = {
  // Sienna Vale's layout-1 page (964:58612…22), read off each section's
  // `explicitVariableModes`, identical at all three widths. Layouts 3 and 4
  // are later passes' to fill from their own walks.
  Editorial: {
    0: { header: 3, media: 2, repertoire: 3, pricing: 2, form: 3, footer: 3 },
    // Its layout-2 page (964:64598 · 986:15657 · 986:15676). The repertoire
    // and pricing move between widths; media and the calendar are Scheme 2
    // cards on the page's paper, which the root paints round them (`pageBg`).
    1: { media: 2, repertoire: [4, 1, 1], pricing: [3, 1, 1], calendar: 2, form: 4 },
  },
}

/* ------------------------------------------------------------------ *
 * §4.3 CATS — 11 section categories.
 * `n` is how many layout choices are offered to the user. Layouts are
 * always shown as "{name} layout {i+1}"; the internal identifiers in
 * the comments are never surfaced in the UI.
 *
 * A category has two words. `name` is the editor's — the sidebar, the
 * toasts, the layout names, the footer rows' target select — and `nav`
 * is the visitor's: what the published header's nav calls the section
 * (JP-033), and what FOOTER_LINKS seeds its rows from. Eight of the nine
 * are the words every frame's nav and footer draw; the calendar's is
 * ours, because no frame's nav lists it (§4.3a). The header and the
 * footer are never linked to, so they have none.
 * ------------------------------------------------------------------ */

export const CATS = [
  { id: 'header', name: 'Header', n: 6 },   // header count is theme-dependent — see headerVariants()
  { id: 'bio', name: 'Bio', nav: 'About', n: 6 },
  { id: 'media', name: 'Media Player', nav: 'Top Tracks', n: 7 },
  { id: 'pricing', name: 'Pricing', nav: 'Pricing', n: 8 },
  { id: 'repertoire', name: 'Repertoire', nav: 'Repertoire', n: 7 },
  { id: 'gallery', name: 'Gallery', nav: 'Media', n: 4 },
  { id: 'calendar', name: 'Booking Calendar', nav: 'Availability', n: 5 },
  { id: 'map', name: 'Events Map', nav: 'Shows/Coverage', n: 4 },
  { id: 'testimonials', name: 'Testimonials', nav: 'Reviews', n: 8 },
  { id: 'form', name: 'Enquiry Form', nav: 'Enquiries', n: 6 },
  { id: 'footer', name: 'Footer', n: 1 },
]

export const catById = (id) => CATS.find((c) => c.id === id)
export const catName = (id) => catById(id)?.name ?? id
export const navLabel = (id) => catById(id)?.nav ?? catName(id)

/* ------------------------------------------------------------------ *
 * §4.3a Nav targets.
 *
 * A published page's nav links scroll to the section they name, so a
 * link needs a section id as well as a label. `navSections` carries
 * `{ cat, label }` and a section id *is* its category: addSection()
 * refuses a category the page already has, so `cat` is unique per page
 * and reads honestly in a fragment — `#repertoire`, `#calendar`.
 *
 * The label is the **visitor's** word, `navLabel()`, never `catName()`
 * (JP-033: the nav used to print the sidebar's "Events Map" and "Enquiry
 * Form" on the published page). The list still follows the page's order
 * and presence; only the words are fixed. The frames' navs draw eight
 * and the seeded page gives nine: the calendar is on the page and in no
 * frame's nav, and a section the visitor cannot reach from the nav is
 * the worse defect, so it is listed as "Availability" — its own default
 * heading — and the ninth link is a named diff from the frames.
 * `navSectionsOf()` is the one builder, so the editor, the published
 * tab, the picker's previews and the harness cannot drift apart.
 *
 * The header's other two controls point at a section too, and so does
 * the fixed Music / Gigs / About triple, which names no category at
 * all (the words layouts 2 and 3 draw in every designed frame — JP-033;
 * Book went because its pill already stands beside the links). Each is
 * a preference list resolved against the page: the first candidate
 * actually on it wins. A pill whose every candidate is missing
 * keeps its place in the design and simply does not link. A *label* with
 * nothing to point at — a Minimal nav word, a footer row — is kept on the
 * canvas and left off the published page, where it would be a dead word.
 * ------------------------------------------------------------------ */

export const NAV_MINIMAL = [
  ['Music', ['media', 'repertoire']],
  ['Gigs', ['map', 'calendar']],
  ['About', ['bio']],
]

export const CTA_TARGETS = {
  book: ['form', 'calendar', 'pricing'],
  listen: ['media'],
}

// Category ids in page order → `navSections`. Ids, because its callers hold
// three shapes: section objects, pageOrder()'s ids and EXAMPLE_PAGE's tuples.
export const navSectionsOf = (cats) => cats
  .filter((cat) => cat !== 'header' && cat !== 'footer')
  .map((cat) => ({ cat, label: navLabel(cat) }))

export const firstPresent = (prefs, navSections) =>
  prefs.find((cat) => navSections.some((n) => n.cat === cat))

export const minimalNav = (navSections) =>
  NAV_MINIMAL.map(([label, prefs]) => ({ label, to: firstPresent(prefs, navSections) }))

// The header's navigation mode when the artist has not chosen one (JP-039,
// reopened; user call, 2026-09-23). Layouts 2 and 3 of Retro, Lime and Grunge
// draw Music / Gigs / About at every width (986:11848, 984:34438,
// 984:10740, 977:22532), so there the seeded header is Minimal and its frame's
// picture — at 768 the three fit the bar where the seeded nine fold to the
// burger. Everywhere else it follows the sections. `d` is the design index,
// `arch % designCount`. A stored value always wins, so a header moved back
// to layout 1 returns to its sections unless the artist picked Minimal.
// Editorial's cards 2 and 3 are placeholders, so they follow the sections
// until their passes fit them (plans/editorial/layout-1.md, open question 4).
export const navModeDefault = (themeName, d) =>
  (themeName === 'Retro' || themeName === 'Lime' || themeName === 'Grunge')
    && (d === 1 || d === 2) ? 'minimal' : 'sections'

// Bebas Neue's advance widths in em, capitals only — Lime's label face, which
// sets every nav label in caps — read off the loaded face with canvas
// measureText. Summed a character at a time they land within 1% of each
// measured label, and over rather than under, because the face all but lacks
// kerning. Lime's header nav sizes its one row of links from this
// (EncoreSection's NavBar), since EncoreSection has no effect to measure with.
const BEBAS_EM = {
  A: 0.401, B: 0.404, C: 0.383, D: 0.406, E: 0.363, F: 0.344, G: 0.391, H: 0.42, I: 0.192,
  J: 0.265, K: 0.414, L: 0.344, M: 0.538, N: 0.427, O: 0.4, P: 0.386, Q: 0.4, R: 0.403,
  S: 0.372, T: 0.364, U: 0.402, V: 0.382, W: 0.557, X: 0.406, Y: 0.394, Z: 0.362,
  ' ': 0.16, '&': 0.417, '·': 0.188, '/': 0.389, '-': 0.27, "'": 0.188, '.': 0.188,
  ',': 0.188, '!': 0.21, '?': 0.363, ':': 0.188, '(': 0.276, ')': 0.276, '+': 0.4,
}

// A label's width in ems of Bebas Neue; digits and anything unlisted take 0.4,
// the digits' own advance.
export const bebasEms = (text) =>
  [...String(text).toUpperCase()].reduce((w, ch) => w + (BEBAS_EM[ch] ?? 0.4), 0)

// Anton's, read the same way — Retro's label face, also set in caps. Retro's
// labels carry `labelStyle`'s 0.02em tracking, which CSS spends after every
// character, so it is folded into each advance here. Sums land within 1% of the
// measured label, and over. Only the tablet header's fit gate reads it
// (`vm.navFits`, JP-039).
const ANTON_EM = {
  A: 0.485, B: 0.479, C: 0.474, D: 0.493, E: 0.412, F: 0.399, G: 0.485, H: 0.499, I: 0.227,
  J: 0.466, K: 0.472, L: 0.397, M: 0.746, N: 0.498, O: 0.486, P: 0.472, Q: 0.494, R: 0.477,
  S: 0.461, T: 0.396, U: 0.474, V: 0.469, W: 0.712, X: 0.484, Y: 0.446, Z: 0.41,
  1: 0.331, ' ': 0.234, '&': 0.52, '·': 0.234, '/': 0.405, '-': 0.311, "'": 0.214, '.': 0.229,
  ',': 0.236, '!': 0.229, '?': 0.492, ':': 0.242, '(': 0.291, ')': 0.291, '+': 0.355,
}

// A label's width in ems of tracked Anton; the other digits and anything
// unlisted take 0.494, the digits' own advance. `track` is the tracking in
// ems: Retro's 0.02 by default, and 0 for Grunge, whose mode states none.
export const antonEms = (text, track = 0.02) =>
  [...String(text).toUpperCase()].reduce((w, ch) => w + (ANTON_EM[ch] ?? 0.494) + track, 0)

// Noto Serif Display's, at the one instance index.html serves (wdth 62.5, a
// site naming no weight clamped to 540) — Editorial's display and label face,
// standing in for the caps-only Fisterra Fora, so set in caps as well. Read
// off the rendered DOM in the harness, not canvas measureText, which sees
// neither the width axis nor an unloaded webfont. Untracked (Sienna Vale
// states 0). Summed a character at a time they land within 2.1% of each
// measured label ("Availability", the most kerned), and over, never under.
const NOTO_EM = {
  A: 0.588, B: 0.546, C: 0.52, D: 0.602, E: 0.513, F: 0.488, G: 0.599, H: 0.648, I: 0.311,
  J: 0.313, K: 0.587, L: 0.513, M: 0.758, N: 0.623, O: 0.617, P: 0.501, Q: 0.617, R: 0.554,
  S: 0.451, T: 0.511, U: 0.589, V: 0.552, W: 0.848, X: 0.565, Y: 0.534, Z: 0.51,
  ' ': 0.175, '&': 0.623, '·': 0.222, '/': 0.191, '-': 0.249, "'": 0.148, '.': 0.222,
  ',': 0.222, '!': 0.291, '?': 0.43, ':': 0.231, '(': 0.304, ')': 0.304, '+': 0.425,
}

// A label's width in ems of Noto Serif Display; digits and anything unlisted
// take 0.448, the digits' own advance.
export const notoEms = (text) =>
  [...String(text).toUpperCase()].reduce((w, ch) => w + (NOTO_EM[ch] ?? 0.448), 0)

// The same face at 700, which the served variable face reaches and the three
// hand-scaled Bold statements set (the form's, the testimonials', the
// footer's): the 540 table widened by the largest ratio measured in the
// harness on the seeded form statement's lines — LET'S MAKE 1.045, YOUR NIGHT
// 1.041, UNFORGETTABLE. 1.040 — so over, never under.
export const notoBoldEms = (text) => notoEms(text) * 1.045

/* ------------------------------------------------------------------ *
 * §4.4 NVAR — distinct rendered designs per category.
 * Every category offers at least as many layout choices as it has
 * designs; the rendered design is `arch % NVAR[cat]`. Seven of the
 * eleven still offer strictly more, and the layout-4 pass is what
 * stopped that being all of them: `gallery` and `map` now offer exactly
 * four and render four, joining the header and the footer, which have
 * always been level. The invariant `pageLayout()` rests on is the
 * inequality, never the surplus.
 * ------------------------------------------------------------------ */

export const NVAR = {
  header: 6, bio: 4, media: 4, pricing: 4,
  repertoire: 4, gallery: 4, calendar: 4, map: 4, testimonials: 4, form: 4, footer: 1,
}

// Retro ships the six photographic header compositions (§10.2). Lime's
// layout passes fit the first four of them in its own variable mode —
// header card N lays out the whole page as layout N, and Lime's page N is
// Retro's page-N components re-skinned — so its family is those four and
// no more. Grunge is the same four in a third mode (Static Youth), all four
// pages confirmed in the Figma file and all four fitted — Stacked last, in
// HeaderV3's widened Lime block — so its family is closed too. Editorial is
// the same four in a fourth mode (Sienna Vale), its four pages found in the
// file (plans/editorial/layout-1.md, *The Figma source*); Hero is fitted, in
// HeaderV0's Lime block widened, and the other three render Retro's
// compositions in its tokens until their own passes.
// Pop offers three flat layouts (§10.3); its designs do not exist yet.
export const headerFamily = (themeName) =>
  themeName === 'Retro' ? 'photographic' : themeName === 'Lime' ? 'lime'
    : themeName === 'Grunge' ? 'grunge' : themeName === 'Editorial' ? 'editorial' : 'flat'

const HEADER_COUNT = { photographic: 6, lime: 4, grunge: 4, editorial: 4, flat: 3 }

export const headerVariants = (themeName) => HEADER_COUNT[headerFamily(themeName)]

// §6.2 — how many header cards the setup modal offers. A card lays out the
// whole page, and only layouts 1–4 are a whole Figma page, so the modal stops
// at four: Retro's Overlay card and Stage wide have no page behind them and
// stay reachable from the sidebar's LayoutPicker alone, which still counts
// `layoutCount`.
const SETUP_HEADERS = 4

export const setupHeaderCount = (themeName) => Math.min(SETUP_HEADERS, headerVariants(themeName))

// How many layout choices a category offers under a given theme.
export const layoutCount = (catId, themeName) =>
  catId === 'header' ? headerVariants(themeName) : (catById(catId)?.n ?? 1)

// How many distinct designs a category actually renders under a theme.
export const designCount = (catId, themeName) =>
  catId === 'header' ? headerVariants(themeName) : NVAR[catId]

// §6.2 — the layout every other category takes when the header takes `i`.
// The page is one design: layouts 1, 2, 3 and 4 of every section are one Figma
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
const PHOTOGRAPHIC_NAMES = [
  ['Hero', 'Full-bleed photo'],
  ['Feature spread', 'Photo beside the details'],
  ['Inset Hero', 'Framed photo on colour'],
  ['Stacked', 'Name stacked over the photo'],
  ['Overlay card', 'Details on a card'],
  ['Stage wide', 'Centred, wide'],
]
const HEADER_NAMES = {
  photographic: PHOTOGRAPHIC_NAMES,
  // The same HeaderV0…V3, so the same names — sliced, not copied, so a rename
  // reaches every template.
  lime: PHOTOGRAPHIC_NAMES.slice(0, HEADER_COUNT.lime),
  grunge: PHOTOGRAPHIC_NAMES.slice(0, HEADER_COUNT.grunge),
  editorial: PHOTOGRAPHIC_NAMES.slice(0, HEADER_COUNT.editorial),
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
  header: 'hd', bio: 'bi', media: 'me', pricing: 'pr',
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
// What `blankRow()` asks of a TracksField row (the JP-051 sweep): a track with
// only a photograph, or only a sound file, is still a track.
export const TRACK_KEYS = ['title', 'sub', 'image', 'audio']

// The clock on the "now playing" card beside the track stack — a player caught
// mid-song, which is what the Figma frame draws. Only the editor canvas shows
// it: the published player's clock is its <audio> element's own (§10.2a), and
// the *track* named on the card is always one of the artist's, so there is no
// track here. A section with no tracks left draws neither: `sectionVm` stops
// the clock at 00:00 under an empty bar and names `vm.mediaEmpty` instead.
export const NOW_PLAYING = { at: '02:28', of: '04:22', pct: 34 }

// TAGS is a palette as much as a list: `vm.chips` is one colour seat per entry,
// and `s.chips[3].bg`, `s.chips[4 % n].bg` and friends are read as seats across
// the header, media, map and pricing. Its length and order must not change.
// The words the chip rows print are the artist's (JP-037): FIELDS.header.tags,
// seeded with TAG_LABELS and zipped onto these seats by index, wrapping
// (`vm.tagChips`). Five, not six: the Tags component draws five and carries
// its sixth chip as a hidden frame (read off the Lime layout-2 bio's
// instance; user call, 2026-09-21).
export const TAGS = ['Default', 'Sold Out', 'New Release', 'Archive', 'Live', 'All Access']
export const TAG_LABELS = 'Default, Sold Out, New Release, Archive, Live'

// JP-037 — layout 2's copy that was a literal in EncoreSection: the hero's
// pill, and the bio card's credit line and the pill beside it. Each is the
// frame's own text (964:64580, 964:64581 and Retro's 964:64638), the credit
// line lowercase as both frames type it.
export const HERO_CTA = 'Enquire about a date'
export const BIO_CREDIT = 'five years of rooms read & floors moved'
export const BIO_CTA = 'Book Now'

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

// Every key a package row carries — what `blankRow()` asks of it. A row is
// blank only when all five are, whichever of them a layout prints. The
// Featured tick (`featured`, JP-048) is left out, as FORM_FIELD_KEYS leaves out
// `kind`: it is a flag on a package, not content, so a ticked empty row is
// still blank.
export const TIER_KEYS = ['name', 'price', 'tags', 'blurb', 'feats']

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
  // The layout-3 bento wall's own two named reviews (964:68651), appended so
  // the wall draws the frame's five cells after its stat card (QA, 2026-09-15).
  { quote: 'Read the room perfectly. Highly professional!',
    who: 'Imran K.', role: 'Events Manager', when: 'Reviewed 2 months ago' },
  { quote: '"Booking again next year, no question."',
    who: 'Olivia B.', role: 'Wedding planner', when: 'Reviewed 3 months ago' },
]
// What `blankRow()` asks of a QuotesField row (the JP-051 sweep).
export const QUOTE_KEYS = ['quote', 'who', 'role', 'when']

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
// What `blankRow()` asks of a SongsField row (the JP-051 sweep).
export const SONG_KEYS = ['title', 'artist', 'tags']

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
// What `blankRow()` asks of a GigsField row (the JP-051 sweep).
export const GIG_KEYS = ['venue', 'city', 'time', 'month', 'day', 'link']
export const MAP_RADIUS = '12 mile radius'
export const MAP_BASE = 'Based in Manchester'
export const MAP_TERMS = '120 mi standard · further on request'
// Layout 3's map panel copy, the frame's own (964:68649), seeded and emptiable.
export const MAP_STATUS = 'In transit'
export const MAP_UPDATED = 'Updated 2m ago'
export const MAP_RINGS = '30mi, 60mi, 120mi'
export const MAP_EXPAND = 'Expand view'
// Layout 2's stat row: the frame's Travel time and Booking fee cells, seeded
// with its own copy. Max travel, the third cell, is MAP_RADIUS rather than a
// field of its own, so a seeded page cannot claim two different coverages.
// Pricing layout 2's credit row and the line beside its pill, seeded with the
// frame's own copy (964:64648).
export const PRICING_REVIEWS = '32 reviews'
export const PRICING_RATING = '4.9'
export const PRICING_CTA = 'Enquire about a date'
export const PRICING_NOTE = "3 dates open for Sept '26"
// Pricing layout 3's line beside the filter capsule, the frame's own copy
// (964:68648, and at 768 and 390 too). Dropped in Retro's fit as "a discount no
// field states"; a field states it now (JP-046), seeded and emptiable.
export const PRICING_OFFER = 'Save 15% on bundles'
export const MAP_TRAVEL_TIME = '~2 hrs'
export const MAP_FEE = '£1,200'

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
// Layout 4's own seed (JP-054, user call, 2026-09-24, reversing the 2026-09-23
// shared list): the editorial frame's five boxes, labels as the frame prints
// them (the branch upper-cases them) over the placeholders Lime's 964:72940
// types. Its sixth box, Message, is the `message` textarea and not a row. One
// `email` row, so FormFieldsField's guard holds. Chosen by layout only while the
// key is absent — FORM_BTN_4's rule, in sectionVm and EditPanel's formFieldsVal
// alike — so a list the artist has edited is theirs at every layout.
export const FORM_FIELDS_4 = [
  { label: 'Your name',  placeholder: 'Full name',       kind: 'text' },
  { label: 'Email',      placeholder: 'you@email.com',   kind: 'email' },
  { label: 'Event date', placeholder: 'dd / mm / yyyy',  kind: 'text' },
  { label: 'Event type', placeholder: 'Wedding, party…', kind: 'text' },
  { label: 'Location',   placeholder: 'Town / city',     kind: 'text' },
]
// What `blankRow()` asks of a box (JP-051): the two strings it can print. Not
// `kind`, which is a select that always holds a value, so asking it too would
// make no row blank. A box with only a placeholder is still a box; in layouts
// 2 and 3, which print the label alone, it falls back to the placeholder.
export const FORM_FIELD_KEYS = ['label', 'placeholder']
// The word the guarded email row — the form's only reply box, FormFieldsField's
// `lastEmail` — is labelled by when the artist empties its label. It never
// drops, or the form would have nowhere to be replied to; the seed's own word,
// so a box and its mailto body line read the same.
export const FORM_EMAIL_LABEL = 'Email'
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
// seeded page publishes fully linked. On BLANK_PAGE every one of them resolves
// to nothing: the canvas still draws the eight labels, and the published footer
// drops all of them and keeps the Book pill alone, just as the header's nav is
// empty there.
//
// A flat list, not two columns: sectionVm does the halving, or a repeater row
// would have to carry which column it stands in.
//
// The labels are seeded from navLabel(), the header nav's own words (JP-033),
// so the two lists agree on a fresh page; from there the rows are the artist's
// to reword, which the nav's are not. No `calendar` row: the frames' footers
// draw these eight, and a ninth would unbalance the two columns of four.
export const FOOTER_LINKS = ['bio', 'media', 'gallery', 'repertoire', 'map', 'pricing', 'form', 'testimonials']
  .map((to) => ({ label: navLabel(to), to }))
// What `blankRow()` asks of a LinksField row (the JP-051 sweep): the two strings
// it can print or follow. Not `to`, a select that always holds a value — 'none'
// on a new row — which is FORM_FIELD_KEYS' reason for leaving out `kind`. A row
// aimed at a section with its label emptied is therefore blank too: it prints
// nothing to click.
export const LINK_KEYS = ['label', 'url']

// The per-row target select, in the { v, l } shape EditPanel's own select
// branch reads — FORM_KINDS' shape.
//
// Every category the page *can* carry rather than the ones it does: a Radix
// Select whose value names no item blanks its trigger, so a row pointing at a
// section the artist has since deleted must still read as what it points at,
// and a link can be aimed at a section that has not been added yet. Resolving
// it against the actual page is sectionVm's job (§4.3a): the canvas keeps such
// a row, and the published footer leaves it out.
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
export const TITLES = { bio: 'Reads the room.', media: 'Five worth your ear.',
  pricing: "Choose the set that's right for your night",
  gallery: 'See us in action', calendar: 'Availability',
  map: 'Manchester', testimonials: 'Word of Mouth', form: "Let's make\nyour night unforgettable.", footer: '' }

export const DEFS = {
  heroSub:    'DJ & selector. Clubs, weddings and festivals across the North — nights built live, never off a playlist.',
  bioP1:      'DJ and selector based in Manchester. Five years of reading rooms — house, disco, soul, 80s — chosen by the room, not the algorithm.',
  bioP2:      'Residencies at Roomtone and The Warehouse Project. Available for clubs, weddings and private events across the UK.',
  since:      'June 2021',
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
  // §10.2 layout 2 heads the testimonials with a line about who the reviews are
  // from, where layout 1 draws no head at all — the frame's own sentence, kept
  // as the seed so the reference picture holds. Emptying it drops the line.
  testiSub:   'Real words from couples, planners and venues across the North West.',
  formPara:   'Tell me about the night — date, venue, crowd. Replies within 24 hours.',
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
// How far ahead the calendar reaches, in months from the opening month — the
// `open` field's, or on the published page and in the editor's BookedField
// today's when that is later (calStart). The
// arrows wrap at both ends of it rather than clamping — see EncoreSection's
// Calendar.
export const CAL_SPAN   = 12

// §10.2 layout 2 — the named slots. Where layout 1 draws a month and lets the
// visitor pick any unbooked day out of it, layout 2 draws a short list of named
// slots: a date, what the artist plays that night, and what it starts from.
// None of that is derivable — `booked` is the days the artist is *not* free,
// and inverting it would print every remaining day of June — so the list is the
// artist's, edited by SlotsField (JP-052), in the row shape `{ date, kind,
// price }`. The price is a row value like TIERS' `price`: it is the thing the
// row is for, and the whole phrase is the artist's, so an emptied one drops its
// line rather than printing a bare "From".
//
// The seed is **not** four dates. It is four day offsets from a base date
// (`slotSeed()`), because a hardcoded 2025 is past on every published page and
// every row would be dead (JP-052). The base is `open` on the canvas and in the
// editor — so slot one is CAL_OPEN, the seeded page opens with that row already
// picked, and the reference picture matches the frame (Jun 12 / 14 / 20 /
// Jul 05) — and max(open, today) by day on the published page, layout 1's F20
// rule. SlotsField writes the canvas's dates out on its first edit.
//
// Layout 4 read these rows too until JP-052, which found its right-hand column
// is the enquiry wizard's summary, not a slot list.
export const CAL_SLOTS  = [
  { after: 0,  kind: 'Evening',  price: 'From £1,200' },
  { after: 2,  kind: 'Full day', price: 'From £2,400' },
  { after: 8,  kind: 'Late',     price: 'From £1,400' },
  { after: 23, kind: 'Wedding',  price: 'From £2,800' },
]
// Every key a slot row carries — what `blankRow()` asks of it.
export const SLOT_KEYS = ['date', 'kind', 'price']
// The seeded slots, dated from `base` (a parsed date): the rows SlotsField
// edits and sectionVm reads when the key is absent.
export function slotSeed(base) {
  return CAL_SLOTS.map(({ after, kind, price }) => {
    const d = new Date(Date.UTC(base.y, base.m, base.d + after))
    return { date: isoDate(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()), kind, price }
  })
}

// Testimonials layout 2's own heading fallback — its frame's two-line display
// head, broken where the frame breaks it — and the stars its card prints in
// the corner. The shared `heading` default stays TITLES.testimonials for the
// other layouts; sectionVm and EditPanel both resolve this one for layout 2.
export const TESTI_HEADING_2 = 'Honest feedback\nfrom people who booked'
// The booking calendar's layout-3 heading, the composed page's "Book Me" over
// the card (964:68644). Layouts 1, 2 and 4 keep TITLES.calendar.
export const CAL_HEADING_3 = 'Book Me'
// Lime's and Grunge's layout-3 header kicker, the corner card's second line
// (964:68654, 964:68686). The other layouts, and Retro's layout 3, keep the
// field's 'DJ · Live Act'.
export const KICKER_3 = 'Performing since 2021'
// Layout 4's heads, each its composed page's own wrapper head over the section
// (QA, 2026-09-15): the Book Us panel (964:72839), the gallery's column
// (964:72784), the map band (964:72827) and the testimonials sheet. The other
// layouts keep the shared TITLES defaults; sectionVm and EditPanel both resolve
// these at layout 4 alone, the TESTI_HEADING_2 pattern.
export const CAL_HEADING_4 = 'Book Us'
export const GALLERY_HEADING_4 = 'Snaps from the night'
export const MAP_HEADING_4 = 'Distances we’ll Travel'
export const TESTI_HEADING_4 = 'Client success stories'
// The enquiry form's layout-4 copy (JP-054, user call, 2026-09-23): Retro's
// frame (964:72845) and Lime's (964:72940) both read *Contact Us* over
// *ENQUIRE* with a *Check Availability* pill, so these are per-layout
// defaults, not per-theme ones. The head joins HEADING_4; the button and the
// small-caps line under the head (`FIELDS.form.sub`, which reaches layout 4
// alone) resolve here in sectionVm and in EditPanel's fallback chain.
export const FORM_HEADING_4 = 'Contact Us'
export const FORM_BTN_4 = 'Check Availability'
export const FORM_SUB_4 = 'Enquire'
// The address every enquiry is mailed to, as the enquiry form seeds it. Named
// because two sections resolve it (JP-053): the form's own sectionVm, and the
// booking calendar's layout-4 wizard through pageEmail() below.
export const FORM_EMAIL = 'bookings@kaimercer.co.uk'
export const TESTI_STARS = '★★★★★'
// Booking calendar layout 4's wizard (964:72843): the event types its first
// step offers, the frame's own four. The calendar's own list rather than the
// enquiry form's FORM_TYPES, which is another section's content.
export const CAL_TYPES = ['Wedding', 'Birthday', 'Corporate', 'Festival']
// Pricing layout 4's row pill. Its frame reads "Star Enquiry", the typo
// CAL_SLOT_CTA already reads as this.
export const PRICING_ROW_CTA = 'Start Enquiry'
// Events map layout 4's panel note, beside "Travel & reach" (964:72830).
export const MAP_SPAN = 'Live · last 12 months'

// Enquiry form layout 2's card, seeded with its frame's own copy (964:64652):
// the price row, the bookings line, the submit's label and the line under it.
export const FORM_PRICE = '£1,200'
export const FORM_PRICE_UNIT = 'from / event'
export const FORM_BOOKINGS = '42 bookings'
export const FORM_CTA = 'Check Availability'
export const FORM_NOTE = 'No charge to enquire'
// Layout 3's eyebrow, the frame's own "AVAILABLE 2025 / 2026" (964:68650).
export const FORM_AVAILABLE = 'Available 2025 / 2026'

// Booking calendar layout 2's pill. Its frame reads "Star Enquiry", taken as a
// typo for this.
export const CAL_SLOT_CTA = 'Start Enquiry'

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

// §6.2 — the order the page takes when the setup modal's header takes layout
// `i`. `pageLayout` is half of "a card lays out the whole page"; this is the
// other half, because each Figma page stacks its sections in an order of its
// own. Layout 2's page (`964:58572`) reads the repertoire before the gallery
// and the events map after the calendar. Layout 3's row is its narrow pages'
// order (977:21117, 982:8748), which puts the repertoire between the media
// player and the calendar; at 1440 the calendar stands beside the bio and the
// player instead and the repertoire follows the columns — `pageRows` does that
// regrouping, so one order serves all three widths. A page with no row here
// takes layout 1's, which is EXAMPLE_PAGE's — true of layout 4's page.
const PAGE_ORDERS = [
  EXAMPLE_PAGE.map(([cat]) => cat),
  ['header', 'bio', 'media', 'repertoire', 'gallery', 'pricing', 'calendar', 'map',
    'form', 'testimonials', 'footer'],
  ['header', 'bio', 'media', 'repertoire', 'calendar', 'gallery', 'pricing', 'map',
    'form', 'testimonials', 'footer'],
]

export const pageOrder = (i) => PAGE_ORDERS[i] ?? PAGE_ORDERS[0]

// Layout 3's page is the one Figma page that does not stack every section. At
// 1440, Frame 299 (`964:68623`) stands the bio and the media player in an 858
// left column and the booking calendar, under its "Book Me", in a 405 right
// column beside them, 55 apart; both narrow pages stack the same sections.
//
// `pageRows` is that composition in page terms: at desktop, a calendar on
// layout 3 takes the right-hand column beside the run of sections above it
// that are a bio or a media player on layout 3 — looking past one repertoire
// on layout 3 between them, which is where the narrow pages seat it, and which
// then follows the composed row as it does at 1440. Anything else — a calendar
// with no such run above it, any other layout, a narrow width — is a row of
// its own, so moving a section out of the run is how the artist undoes it.
// The one cost: at desktop that repertoire draws below the calendar it sits
// above in the section list. Pure and index-based, so the editor canvas and
// the published tab group the same page the same way.
export const COLUMN_SPLIT = { left: 858, right: 405, gap: 55 }
const COLUMN_LEFT = ['bio', 'media']

export function pageRows(sections, themeName, wide) {
  const at3 = (x) => x.arch % designCount(x.cat, themeName) === 2
  const rows = []
  sections.forEach((x, i) => {
    if (wide && x.cat === 'calendar' && at3(x)) {
      const between = i > 0 && sections[i - 1].cat === 'repertoire' && at3(sections[i - 1])
      const end = between ? i - 1 : i
      let from = end
      while (from > 0 && COLUMN_LEFT.includes(sections[from - 1].cat) && at3(sections[from - 1])) from--
      if (from < end) {
        // Every section from `from` to just above the calendar pushed a plain
        // row of its own a moment ago.
        rows.splice(rows.length - (i - from))
        rows.push({ left: Array.from({ length: end - from }, (_, k) => from + k), right: i })
        if (between) rows.push({ i: i - 1 })
        return
      }
    }
    rows.push({ i })
  })
  return rows
}

// "Blank" — only the two mandatory sections.
export const BLANK_PAGE = [
  ['header', 0],
  ['footer', 0],
]

/* ------------------------------------------------------------------ *
 * §4.8 FIELDS — editable content per category
 * { k, l, type?, opts?, d?, def?, in? }
 *
 * `in` is the designs that read the key, 0-based like `arch % designCount`
 * (so layout 1 is 0). It is an array when every template reads the key in
 * the same designs, or an object keyed by template name when one differs —
 * `'*'` standing for any template the object does not name. A field with no
 * `in` is read by every design. EditPanel says so beside a field the section's
 * current design does not read; see fieldReach() below.
 *
 * `type: 'url'` is a plain text box that also says, on blur, why urlProblem()
 * refuses what was typed. The repeaters' address columns use the same input,
 * and `type: 'email'` is that input asking emailProblem() instead.
 * ------------------------------------------------------------------ */

const SHOW_HIDE = [{ v: 'show', l: 'Show' }, { v: 'hide', l: 'Hide' }]

// Pricing layout 2's card fields: the pill's label and the line beside it.
// Lime's own layout 2 draws both, as its frame does (JP-036) — its pill used
// to take no label, so it printed the section's static "Book Now".
const PRICING_CARD = [1]
// Its credit row under the quote, which Lime's layout 2 draws as well.
const PRICING_CREDIT = [1]

export const FIELDS = {
  // Every element appearing in any header layout is exposed. A layout that
  // does not consume a key simply ignores it, so swapping layouts never
  // silently discards copy the user typed — and the panel says so, off `in`.
  //
  // The header's `in` is always an object naming Retro, Lime, Grunge and
  // Editorial alone: they have different header families (six designs against
  // four, four and four — Grunge's row is measured over its four fitted cards,
  // none a placeholder since its layout-4 pass; Editorial's over one fitted
  // card and three placeholders, so each of its layout passes re-measures its
  // card), and Pop has a family of its own that is not designed, so it is left
  // unmarked rather than folded onto any list.
  header: [
    { k: 'image',     l: 'Background photo', type: 'image',
      hint: 'Fills the header behind the type.' },
    { k: 'avatar',    l: 'Artist photo',     type: 'image',
      hint: 'The portrait card and the small round avatar.' },
    // Kicker and Location are the artist's role and home town, so they also
    // reach the bio, the booking calendar and the enquiry form (F1,
    // headerIdentity); `in`, and the note it prints, speak for the header.
    // Their hints name where else each prints, and that reach is measured
    // (JP-042: a sentinel in `&who=`, every design × width × surface): the
    // kicker in all four bios and the form's credit row (layouts 1 and 2); the
    // location in bio layouts 1–3 and calendar layouts 1 and 4 — except Lime's,
    // Grunge's and Editorial's calendar layout 1, a block of its own with no
    // polaroid stamp.
    // Change a reader, change the hint.
    { k: 'kicker',    l: 'Kicker',           d: 'DJ · Live Act',
      in: { Retro: [0, 2, 3, 5], Lime: [0, 2, 3], Grunge: [0, 2, 3], Editorial: [0, 2, 3] },
      hint: 'Your role. The bio prints it too, and the enquiry form in layouts 1 and 2.' },
    { k: 'title',     l: 'Title' },                       // the artist's name, page-wide and required (NameInput) — special-cased
    { k: 'subtitle',  l: 'Subtitle',         type: 'area', def: 'heroSub',
      in: { Retro: [1, 4], Lime: [1], Grunge: [1], Editorial: [1] } },
    { k: 'location',  l: 'Location',         d: 'Manchester, UK',
      in: { Retro: [0, 1, 2, 3, 5], Lime: [0, 1, 2, 3], Grunge: [0, 1, 2, 3], Editorial: [0, 1, 2, 3] },
      hint: 'Where you are based. The bio prints it too in layouts 1 to 3, and the booking '
          + 'calendar in layouts 1 and 4 (in Lime, Grunge and Editorial, layout 4 only).' },
    { k: 'cta1',      l: 'Primary button',   d: 'Book Now' },
    // Layout 2's pill under the subtitle (JP-037). Its frame words it apart
    // from the nav's Book Now, so it is a field of its own. Emptied, no pill.
    { k: 'heroCta',   l: 'Hero button',      d: HERO_CTA,
      in: { Retro: [1], Lime: [1], Grunge: [1], Editorial: [1] },
      hint: 'The button under the subtitle. Left empty, it is not drawn.' },
    // Bio layout 4's Listen reads this key too; `in` speaks for the header.
    { k: 'cta2',      l: 'Secondary button', d: 'Listen',
      in: { Retro: [1, 2, 4], Lime: [1, 2], Grunge: [1, 2], Editorial: [1, 2] } },
    // The chips are the header's the way Kicker and Location are (JP-037,
    // headerIdentity): the bio prints the same list and honours the same
    // Show / Hide. An emptied list hides the row, as Hide does. The bio's
    // reach is measured (scripts/reach.mjs): layouts 2 and 4, and Lime's 3.
    { k: 'tags',      l: 'Tags',             type: 'area', d: TAG_LABELS,
      in: { Retro: [0, 2, 3, 4, 5], Lime: [0, 2, 3], Grunge: [0, 2, 3], Editorial: [0, 2, 3] },
      hint: 'Separate them with commas. The bio prints them too in layouts 2 and 4 '
          + '(in Lime and Grunge, layout 3 as well).' },
    { k: 'showTags',  l: 'Tag chips',        type: 'select', d: 'show', opts: SHOW_HIDE,
      in: { Retro: [0, 2, 3, 4, 5], Lime: [0, 2, 3], Grunge: [0, 2, 3], Editorial: [0, 2, 3] },
      hint: 'Hides the bio’s chips as well.' },
    { k: 'showBadge', l: 'Corner badge',     type: 'select', d: 'show', opts: SHOW_HIDE,
      in: { Retro: [0, 1, 3, 4, 5], Lime: [0, 3], Grunge: [0, 3], Editorial: [0, 1, 3] } },
    { k: 'badgeText', l: 'Badge text',                    // defaults to the artist's name — special-cased
      in: { Retro: [0, 1, 3, 4, 5], Lime: [3], Grunge: [0, 3], Editorial: [1, 3] } },
    { k: 'navMode',   l: 'Navigation links', type: 'select', d: 'sections', opts: [
      { v: 'sections', l: 'Follow my sections' },
      { v: 'minimal',  l: 'Minimal (Music · Gigs · About)' },
    ] },
    { k: 'align',     l: 'Alignment',        type: 'select', d: 'left', in: { Retro: [0], Lime: [0], Grunge: [0], Editorial: [0] }, opts: [
      { v: 'left',   l: 'Left' },
      { v: 'centre', l: 'Centre' },
    ] },
  ],
  bio: [
    { k: 'image',     l: 'Photo', type: 'image', hint: "Fills the bio's portrait card." },
    { k: 'heading',   l: 'Heading', d: 'Reads the room.', in: [0, 2, 3] },
    { k: 'para1',     l: 'Paragraph 1', type: 'area', def: 'bioP1' },
    { k: 'para2',     l: 'Paragraph 2', type: 'area', def: 'bioP2', in: [2, 3] },
    // Layout 2's foot row (JP-037): the frame's two-tone line, whose first
    // three words take the accent (`vm.bioCredit`), and the pill beside it.
    // Each drops when emptied, and the row with both.
    { k: 'credit',    l: 'Credit line', d: BIO_CREDIT, in: [1],
      hint: 'The line at the foot of the card. Its first three words take the accent colour.' },
    { k: 'cta',       l: 'Button', d: BIO_CTA, in: [1],
      hint: 'The button beside the credit line. Left empty, it is not drawn.' },
    // Layout 3's ID card draws a row of stats, and the frame's first one is
    // "Performing since: June 2021". Seeded with the frame's copy (QA,
    // 2026-09-15 — layout 2's price row and bookings line were the precedent),
    // so the seeded card draws the frame's three columns; emptied, the column
    // is not drawn.
    { k: 'since',     l: 'Performing since', def: 'since', in: [2, 3],
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
    { k: 'kicker',  l: 'Kicker', d: 'Top tracks', in: [0, 2] },
    { k: 'heading', l: 'Heading', d: 'Five worth your ear.' },
    // Retro's layout-1 frame (446:2265) draws the Soundcloud pill, and so does
    // Editorial's (964:58614), so there and on Pop an empty address leaves it a
    // picture — the rule the rest of the file calls the Soundcloud rule. Lime's
    // frame draws Book Now in
    // that seat (JP-034), and Grunge's does too (it shares Lime's block), so
    // under those two the seat is `cta` and the Soundcloud pill is drawn only
    // once it has somewhere to go.
    { k: 'soundcloud', l: 'SoundCloud link', type: 'url', d: '', in: [0],
      hint: 'Where the Soundcloud button goes on the published page. In Lime and Grunge the button '
          + 'appears once this is filled; in the other templates an empty one stays a picture.' },
    // Lime's and Grunge's layout 1 alone: their frames' Book Now pill, on the
    // page's booking target. `'*': []` and not an absent row — an uncovered
    // template is left unmarked by fieldReach, and no other template reads this.
    { k: 'cta', l: 'Button', d: 'Book Now', in: { Lime: [0], Grunge: [0], '*': [] },
      hint: 'Scrolls to your enquiry form, or the next place to book. Empty drops the button.' },
  ],
  // The fourth list-shaped content with a structured editor, and the one that
  // replaced a flattened key set (t1n/t1p/…) rather than a textarea: `tiers` is
  // an array of { name, price, tags, blurb, feats } maintained by TiersField.
  // It follows the `songs` rule — one key, one shape — so an absent key means
  // the seeded TIERS, an emptied array means no packages, and there is no null
  // sentinel. The tags are layout 1's filter row, the repertoire's rule; layout 2
  // names the packages themselves in its chip row and reads no tags at all.
  pricing: [
    { k: 'heading', l: 'Heading', d: "Choose the set that's right for your night", in: [0, 1, 2],
      hint: 'Layouts 1, 2 and 3 only. Layout 4 is a stack of service rows and heads them with '
          + 'the package names alone, so it draws no title.' },
    { k: 'tiers',   l: 'Packages', type: 'tiers', max: 6,
      hint: 'Tags become the filter chips above the packages in layouts 1 and 3 — separate '
          + 'them with commas. Features are one to a line. Layout 2 shows one package at a '
          + 'time and names them in its own chip row, so it reads no tags. Layout 4 has no '
          + 'filter: it prints the tags and the features on the package itself. Tick Featured '
          + 'to give a package layout 3’s FEATURED badge; with none ticked, it goes to the last '
          + 'package on show.' },
    { k: 'unit',    l: 'Price unit', d: PRICE_UNIT,
      hint: 'Printed after the price in layouts 1, 2 and 3. Layout 4 stands it above the price '
          + 'instead, as the kind of booking being priced, and drops a leading slash.' },
    { k: 'intro',   l: 'Intro line', type: 'area', def: 'pricingIntro', in: [2],
      hint: 'A line under the heading. Layout 3 only.' },
    { k: 'offer',   l: 'Offer line', d: PRICING_OFFER, in: [2],
      hint: 'A short line beside the filter chips, such as a discount. Layout 3 only. '
          + 'Empty it to drop the line.' },
    { k: 'quote',   l: 'Quote', type: 'area', def: 'pricingQuote', in: [1],
      hint: 'A line of praise beside the plan. Layout 2 only.' },
    // Layout 2's credit row under the quote and the line beside its pill, all
    // seeded with the frame's own copy. Every one is emptiable and drops what
    // it fills; the row goes when all three of its fields are empty. Lime's
    // layout 2 draws all five as well (the pill's label and its line since
    // JP-036). None of the five names a layout in its label: the "Not shown
    // in this layout" note is what knows the design. The hints say where
    // instead.
    { k: 'images',  l: 'Reviewer photos', type: 'images', max: 3, in: PRICING_CREDIT,
      hint: 'Small faces under the plan card’s quote.' },
    { k: 'reviews', l: 'Review count', d: PRICING_REVIEWS, in: PRICING_CREDIT,
      hint: 'In the credit row under the quote, after the stars.' },
    { k: 'rating',  l: 'Rating', d: PRICING_RATING, in: PRICING_CREDIT,
      hint: 'The five stars beside it are drawn while this is filled.' },
    // Named for its card rather than numbered, so it still reads apart from
    // the row button below.
    { k: 'cta',     l: 'Plan card button', d: PRICING_CTA, in: PRICING_CARD,
      hint: 'The pill under the price on layout 2’s plan card. Empty it to drop the pill.' },
    { k: 'note',    l: 'Line beside the plan card button', d: PRICING_NOTE, in: PRICING_CARD,
      hint: 'Layout 2 only. A phone stacks it under the pill.' },
    { k: 'rowCta',  l: 'Button (layout 4)', d: PRICING_ROW_CTA, in: [3],
      hint: 'The pill under the price on every package row.' },
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
  // layout it edits.
  gallery: [
    { k: 'images',  l: 'Photos', type: 'images', max: 7,
      hint: 'One per tile. Layout 1 shows the highlighted one in its viewer; layouts 2 and 4 show it as the large photo beside the others.' },
    { k: 'heading', l: 'Heading', d: 'See us in action' },
    { k: 'youtube',   l: 'YouTube link', type: 'url', d: '', in: [0],
      hint: 'Where the YouTube row goes on the published page. Leave empty and it stays a picture. Layout 1 only.' },
    { k: 'instagram', l: 'Instagram link', type: 'url', d: '', in: [0],
      hint: 'Where the Instagram row goes on the published page. Leave empty and it stays a picture. Layout 1 only.' },
    { k: 'tiktok',    l: 'TikTok link', type: 'url', d: '', in: [0],
      hint: 'Where the TikTok row goes on the published page. Leave empty and it stays a picture. Layout 1 only.' },
  ],
  // `heading` heads layout 2's slot list, layout 3's scheduler and layout 4's
  // whole block, and Lime's layout 1 as well — Retro's draws no title. `open`
  // is the one date the section is built from (in layout 2 the slot it opens
  // picked and the date the seeded slots count from, in layout 4 the date card
  // before the visitor types one), `booked` the days it will not take (in
  // layout 2 the slots it strikes through, in layout 4 a typed date the date
  // card refuses), `time` the hour the foot line names and layout 4's date
  // card, `cta` the label on layout 1's pill, and `slots` layout 2's list
  // (JP-052). `in` records each key's reach.
  calendar: [
    { k: 'image',   l: 'Photo', type: 'image', in: [0, 3],
      hint: 'Fills the polaroid stack beside the month in layout 1, and the small disc on '
          + "layout 4's summary card. Layouts 2 and 3 draw no photograph." },
    { k: 'heading', l: 'Heading', d: 'Availability', in: { Lime: [0, 1, 2, 3], Grunge: [0, 1, 2, 3], Editorial: [0, 1, 2, 3], '*': [1, 2, 3] } },
    { k: 'open',    l: 'Opens on', type: 'date', d: CAL_OPEN,
      hint: 'The month the calendar opens on, and the date it opens picked. '
          + `It reaches ${CAL_SPAN} months from there. On the published page, days `
          + "before today can't be picked, and a past date opens it on today's month." },
    { k: 'booked',  l: 'Booked dates', type: 'booked',
      hint: 'Click a day to block it. A blocked day cannot be picked on the published page, '
          + "and layout 4's date card refuses it when a visitor types it. "
          + 'The months here are the published ones, so they start at today when the opening '
          + 'date has passed.' },
    { k: 'time',    l: 'Enquiry time', d: CAL_TIME, in: [0, 3],
      hint: "Printed in layout 1's enquiry line, and on its own in layout 4's "
          + 'date card. Leave it empty and the line stops at the date.' },
    { k: 'cta',     l: 'Button (layout 1)', d: 'Check a date', in: [0] },
    { k: 'slots',   l: 'Dates on offer', type: 'slots', max: 8, in: [1],
      hint: 'The dates layout 2 lists, each with what you play and what it starts from.' },
    { k: 'slotCta', l: 'Button (layout 2)', d: CAL_SLOT_CTA, in: [1] },
    { k: 'types',   l: 'Event types', type: 'area', d: CAL_TYPES.join(', '), in: [3],
      hint: "The choices on the first step of layout 4's enquiry wizard, separated by commas." },
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
          + "layouts 1–3 (layout 3 shows one at a time on a phone) and one at a time in "
          + "layout 4's ticker. "
          + 'Layout 3 also turns the cities into its filter chips, and layout 4 counts them.' },
    { k: 'heading', l: 'Heading', d: 'Manchester' },
    { k: 'radius',  l: 'Coverage badge', d: MAP_RADIUS },
    { k: 'base',    l: 'Based in',       d: MAP_BASE },
    { k: 'terms',   l: 'Travel terms',   d: MAP_TERMS, in: [0, 1, 3] },
    { k: 'travelTime', l: 'Travel time (layout 2)', d: MAP_TRAVEL_TIME, in: [1] },
    { k: 'fee',        l: 'Booking fee (layout 2)', d: MAP_FEE, in: [1] },
    // Layout 3's foot pill, the frame's "See all gigs", and the only layout that
    // draws one. Live it lifts the pager and lists every gig under the current
    // filter; where the list is already one page it stays a picture (the
    // Soundcloud rule). An emptied label drops the pill.
    { k: 'cta',     l: 'Button (layout 3)', d: 'See all gigs', in: [2],
      hint: 'Lists every gig at once on the published page, when there is more than one page of them.' },
    // Layout 3's QA fields, which layout 2 reads as well since JP-040 (its fit
    // had dropped all four as claims). None names a layout in its label: the
    // "Not shown in this layout" note is what knows the design.
    { k: 'status',  l: 'Map tag', d: MAP_STATUS, in: [1, 2],
      hint: 'The tag above the featured gig. Layout 2 also prints it as the chip on every gig row.' },
    { k: 'updated', l: 'Map note', d: MAP_UPDATED, in: [1, 2] },
    { k: 'rings',   l: 'Ring labels', d: MAP_RINGS, in: [1, 2, 3],
      hint: 'Up to three, inner ring first, separated by commas.' },
    { k: 'expand',  l: 'Map link', d: MAP_EXPAND, in: [1, 2],
      hint: 'Opens directions to the gig the panel is showing, on the published page. Leave empty to hide it.' },
    { k: 'span',    l: 'Panel note (layout 4)', d: MAP_SPAN, in: [3],
      hint: 'Beside "Travel & reach" above the four stat cards. Leave empty to hide it.' },
  ],
  testimonials: [
    // A textarea, because layout 2's default breaks onto a second line.
    { k: 'heading', l: 'Heading', type: 'area', d: 'Word of Mouth', in: [1, 2, 3],
      hint: 'Layout 2 starts from its own two-line heading; a line break you type is kept there.' },
    // Layout 2 was the first design to head this section, so both of the plain
    // strings below reached it alone — FIELDS.media.soundcloud's case the other
    // way up, hence the layout in each hint. Layout 3's bento wall then gave
    // `sub` a second seat: its stat card sets the sentence the frame fills with
    // a fabricated event count.
    { k: 'sub',     l: 'Intro line', def: 'testiSub', in: [1, 2],
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
          + "above the quote in layout 1. Layout 2's selector takes the name's "
          + 'initials — layout 4 marks its card with the same initials; layouts 2, 3 '
          + 'and 4 have no seat for the date.' },
    { k: 'stars',   l: 'Stars (layout 2)', d: TESTI_STARS, in: [1],
      hint: 'Printed in the corner of the card, beside the reviewer. Empty it to drop them.' },
    { k: 'cta',     l: 'Button', d: 'Book Now', in: [1],
      hint: 'The pill under the card, which scrolls to wherever the page takes a '
          + 'booking. Emptying it drops the pill. Layout 2 only.' },
  ],
  form: [
    { k: 'image',    l: 'Portrait', type: 'image', in: [0, 1],
      hint: 'The round photo beside your name. Layouts 1 and 2 — layouts 3 and 4 draw no credit row.' },
    // Layout 2's stage shot. The section's two photographs are the artist and
    // the scene — the header's pair the other way up,
    // this one's `image` having been the artist since layout 1 drew it as an
    // avatar. FIELDS.media.soundcloud's case: it reaches one layout, so the
    // hint says which.
    { k: 'photo',    l: 'Stage photo', type: 'image', in: [1],
      hint: 'The big picture above the heading. Layout 2 only.' },
    // A textarea, because the default breaks after "Let's make" — layout 2
    // keeps the break, the others read it as a space.
    { k: 'heading',  l: 'Heading', type: 'area', d: "Let's make\nyour night unforgettable." },
    // Layout 4's small-caps line under the head, which printed the artist's
    // name until JP-054 gave it the frame's own word. Emptiable: it drops.
    { k: 'sub',      l: 'Line under the heading', d: FORM_SUB_4, in: [3],
      hint: 'Layout 4 only. Leave it empty to hide it.' },
    { k: 'para',     l: 'Paragraph', type: 'area', def: 'formPara', in: [2],
      hint: 'The line under the heading. Layout 3 only.' },
    { k: 'promises', l: 'Promises', type: 'area', d: FORM_PROMISES.join('\n'), in: [0, 1, 3],
      hint: 'One per line — the ticked list beside the form. Layout 4 numbers them down its '
          + 'right-hand column, and with none it draws no column at all.' },
    // The sixth structured editor and the fifth repeater. Follows the `songs`
    // rule: an absent key means the seeded FORM_FIELDS (FORM_FIELDS_4 at layout
    // 4, JP-054), an emptied array means no boxes at all, and there is no null
    // sentinel.
    { k: 'fields',   l: 'Form fields', type: 'formFields', max: 8,
      hint: 'One box each — two to a row in layouts 1 and 4 (layout 1 stacks them on a phone), '
          + 'one to a row in layouts 2 and 3, '
          + 'which set the label inside the box and draw no placeholder. An odd last box '
          + 'takes half a row in layout 1 and the whole of one in layout 4. The published '
          + 'form emails you what the visitor types. Layout 4 starts on its own five boxes '
          + 'until you edit them; after that your list shows in every layout.' },
    { k: 'types',    l: 'Event types', type: 'area', d: FORM_TYPES.join(', '), in: [0],
      hint: 'Comma separated. The form opens on the first; empty hides the row. Layout 1 only.' },
    { k: 'message',  l: 'Message placeholder', d: FORM_MESSAGE, in: [0, 3], hint: 'Layouts 1 and 4.' },
    // Dead until the submit was made real — this is now what the form is for.
    { k: 'email',    l: 'Email address', type: 'email', d: FORM_EMAIL,
      hint: 'Enquiries are mailed here: the button opens the visitor’s mail app with the form filled in, and so does the Booking Calendar’s layout-4 Send Enquiry. Empty leaves the button a picture. An address that isn’t valid also leaves the button a picture.' },
    { k: 'button',   l: 'Button', d: 'Book Now', in: [0, 3],
      hint: 'Layouts 1 and 4. Layout 4 starts from “Check Availability”.' },
    // Layouts 2 and 3's card — the same component in both frames. Every one is
    // emptiable and drops what it fills, except the button: it is the submit,
    // so an emptied label falls back to `button`.
    { k: 'price',     l: 'Price (layouts 2 and 3)', d: FORM_PRICE, in: [1, 2] },
    { k: 'priceUnit', l: 'Price note (layouts 2 and 3)', d: FORM_PRICE_UNIT, in: [1, 2] },
    { k: 'bookings',  l: 'Bookings line (layouts 2 and 3)', d: FORM_BOOKINGS, in: [1, 2],
      hint: 'The five stars before it are drawn while this is filled.' },
    { k: 'cta',       l: 'Button (layouts 2 and 3)', d: FORM_CTA, in: [1, 2] },
    { k: 'note',      l: 'Line under the button (layouts 2 and 3)', d: FORM_NOTE, in: [1, 2] },
    { k: 'available', l: 'Eyebrow (layout 3)', d: FORM_AVAILABLE, in: [2],
      hint: 'The small line above the heading. Leave it empty to hide it.' },
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
    { k: 'copyright', l: 'Small print' },                 // defaults to copyrightOf(name) — special-cased
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

// The footer's small print, off the artist's name. sectionVm and EditPanel both read it.
export const copyrightOf = (name) => `C 2026 ${name}`

// F1 — the artist's role and home town, as the header's Kicker and Location
// hold them: the one place either is typed. Raw, so an absent key still means
// "the seed" and an emptied one means "none" in every section sectionVm
// builds; the page's other sections have no field of their own for either.
// JP-037 added the tag chips, list and Show / Hide alike: the bio draws the
// header's row, so it reads the header's words and the header's switch.
export const headerIdentity = (sections) => {
  const c = sections.find((s) => s.cat === 'header')?.c ?? {}
  return { kicker: c.kicker, location: c.location, tags: c.tags, showTags: c.showTags }
}

// JP-052 — the page's packages, as the Pricing section holds them, for the
// booking calendar's layout-4 package card: the `identity` precedent, one
// section reading another's content through sectionVm's arguments. Resolved
// exactly as pricing's own sectionVm resolves `tierList` — an absent key is
// the seeded TIERS, blank rows are dropped — and `[]` with no pricing section
// on the page, which is the card's not-drawn state. Raw: the calendar cases.
export const pageTiers = (sections) => {
  const p = sections.find((s) => s.cat === 'pricing')
  if (!p) return []
  return (Array.isArray(p.c?.tiers) ? p.c.tiers : TIERS).filter((t) => !blankRow(t, TIER_KEYS))
}

// JP-053 — the address the page's enquiries go to, as the enquiry form holds
// it, for the booking calendar's layout-4 wizard, whose Send Enquiry mails the
// visitor's answers there: pageTiers()' cross-section read again. Resolved
// exactly as the form's own sectionVm resolves `vm.formEmail` — an absent key
// is the seed, and emailAddr() folds an empty or refused address to '' — and
// '' with no form section on the page, so the wizard's pills stay spans in
// both cases, the form's own no-address state.
export const pageEmail = (sections) => {
  const f = sections.find((s) => s.cat === 'form')
  if (!f) return ''
  return emailAddr(f.c?.email !== undefined ? f.c.email : FORM_EMAIL)
}

export function fieldDefault(f) { return f.def ? DEFS[f.def] : (f.d != null ? f.d : '') }

// Whether a section's current design reads field `f` — `design` being
// `arch % designCount`, never the raw `arch`. `f.in` is resolved per template,
// its `'*'` standing for any template it does not name; a template it does not
// cover at all is left unmarked (true), which is how Pop's header
// stays silent. Read by EditPanel alone: nothing on the canvas consults it,
// so a field the design ignores keeps its copy for the next layout.
const reachOf = (f, themeName) => (
  !f.in || Array.isArray(f.in) ? f.in : (f.in[themeName] ?? f.in['*'])
)
export function fieldReach(f, themeName, design) {
  const r = reachOf(f, themeName)
  return !r || r.includes(design)
}
// Whether *no* design of this template reads `f` — an empty row, as
// FIELDS.media.cta's `'*'` is. EditPanel then says "template" rather than
// "layout" (JP-036): switching layouts would never bring the field back.
export function fieldNowhere(f, themeName) {
  const r = reachOf(f, themeName)
  return !!r && r.length === 0
}

// Why a user-typed outbound address cannot be linked, or null if it can (an
// empty one included — empty is every seam's "no link", not a mistake).
//
// The rule is extUrl's, below, and lives here so the editor can say *why* under
// the input rather than the published page quietly dropping the link. Four
// schemes are real addresses — http, https, mailto, tel — and everything else
// (javascript:, data:, vbscript:, …) is refused: React 19 swaps a javascript:
// href for one that throws, so passing it through published a dead link.
// Whitespace or a control character anywhere inside is refused rather than
// %-encoded, since "not a url" is a sentence and not an address. A schemeless
// address needs a host with a dot in it, which is what refuses bare
// `localhost`; and `//host` is refused outright (F18: the published page is the
// artist's public site, and neither is an address a visitor can reach). A
// `host:port` is not a scheme — `example.com:8080/x` is schemeless. `web` drops
// mailto: and tel: from the four, for a track's audio: an <audio> cannot play
// either, and the no-audio row is the honest state.
const URL_SCHEMES = ['http', 'https', 'mailto', 'tel']
const URL_HOST = /^[^./:?#@\s]+(\.[^./:?#@\s]+)+$/
export function urlProblem(v, web = false) {
  const t = String(v ?? '').trim()
  if (!t) return null
  if (/[\s\x00-\x1f\x7f]/.test(t)) return 'An address can’t contain spaces.'
  if (t.startsWith('//')) return 'Start the address with https:// or the site’s name.'
  const m = /^([a-z][a-z0-9+.-]*):(.*)$/is.exec(t)
  const scheme = m?.[1].toLowerCase()
  if (web && m && scheme !== 'http' && scheme !== 'https'
      && (URL_SCHEMES.includes(scheme) || !/^\d/.test(m[2]))) {
    return 'This needs a web address — https://…'
  }
  if (m && !URL_SCHEMES.includes(scheme) && !/^\d/.test(m[2])) {
    return 'Only web, mailto: and tel: addresses can be linked.'
  }
  if (scheme === 'mailto') {
    // The query is a link's own business (?subject=…), and a mailto may name
    // several recipients; each must pass the check the enquiry form's is held to.
    const to = m[2].split('?')[0]
    return to && to.split(',').every((a) => !emailProblem(a)) ? null : EMAIL_PROBLEM
  }
  if (scheme === 'tel') return /\d/.test(m[2]) ? null : 'That phone number has no digits.'
  const http = scheme === 'http' || scheme === 'https'
  if (http && !m[2].startsWith('//')) return 'Write the address as https://…'
  const rest = http ? m[2].slice(2) : t
  const host = rest.split(/[/?#]/)[0].replace(/:\d*$/, '')
  if (!URL_HOST.test(host)) return 'That doesn’t look like a web address — e.g. soundcloud.com/you'
  try {
    new URL(http ? t : `https://${t}`)
  } catch {
    return 'That doesn’t look like a web address — e.g. soundcloud.com/you'
  }
  return null
}

// The one email test (JP-049): the enquiry form's own address, the address
// part of a mailto: link, and the visitor's email box all ask it, so the
// editor, the link rules and the published form accept the same addresses.
// null for empty or valid, else the reason, urlProblem()'s shape. One `@`,
// something before it with no `?` or `#`, and a host after it that URL_HOST
// would link, which refuses both too: either would split a composed mailto:
// href in the wrong place. A pasted `mailto:` is taken off first, so the
// artist can paste the link they already have.
const EMAIL_PROBLEM = 'That email address looks incomplete.'
export function emailProblem(v) {
  const t = String(v ?? '').trim().replace(/^mailto:/i, '')
  if (!t) return null
  const at = t.lastIndexOf('@')
  const local = t.slice(0, at)
  return at > 0 && !/[\s@?#]/.test(local) && URL_HOST.test(t.slice(at + 1)) ? null : EMAIL_PROBLEM
}

// A typed email address → the bare address, or '' if it is empty or
// emailProblem() refuses it — extUrl()'s shape, and '' is the enquiry form's
// existing no-address state.
export function emailAddr(v) {
  const t = String(v ?? '').trim().replace(/^mailto:/i, '')
  return emailProblem(t) ? '' : t
}

// A user-typed outbound URL → an absolute one, or '' if the field is empty or
// holds nothing urlProblem() above will link.
//
// '' is already every seam's "no link" state — the Soundcloud button stays a
// picture, the gallery hides the row, a gig row stays unlinked, an audio row is
// unplayable — so a refused address needs nothing downstream. Everything the
// artist types is meant to leave the page, so a schemeless "soundcloud.com/kai"
// gets https://. It cannot be left relative: the published tab carries a
// <base href> to the opener (§ Publish), so a relative href would resolve
// against the builder and load it over the page. An address with one of the
// four schemes is passed through as typed; `web` is urlProblem's.
export function extUrl(v, web = false) {
  const t = String(v ?? '').trim()
  if (!t || urlProblem(t, web)) return ''
  return /^(https?|mailto|tel):/i.test(t) ? t : `https://${t}`
}

// The events map's layout-2 Get Directions pill: a Google Maps route to the
// gig, from nothing the artist has to type beyond the venue and the city it
// already carries. Empty when both are, so the pill stays a picture.
export function directionsUrl(...parts) {
  const q = parts.map((p) => String(p ?? '').trim()).filter(Boolean).join(', ')
  return q ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}` : ''
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
// back to being the span it always was: the Soundcloud button's rule. The
// address arrives through emailAddr(), so one it refuses is empty here too.
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
    return fd.kind === 'email' && !!emailProblem(v)
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

// A repeater row the artist added and never filled in: every one of `keys`
// trims to empty (a missing key, a null row and a lone newline included). Such a
// row is not content, so `sectionVm` drops it before anything indexes the list
// and both surfaces render the page it would be without it (JP-048). The test is
// *every* key, never the ones a layout prints, so it cannot discard a word the
// artist typed: a package with only a price is still a package.
export function blankRow(row, keys) {
  return keys.every((k) => !String(row?.[k] ?? '').trim())
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
 * Nothing here reads the clock. The canvas opens on the date the artist set,
 * not on today, so its picture cannot drift off the reference frame's June
 * overnight. The published tab knows the date: PublishedPage reads it once
 * and hands `sectionVm` a `today` it honours only when live, which kills the
 * days before it and opens a past `open` on today's month instead. The
 * editor's BookedField reads it too, to page that same window (calStart).
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

// The enquiry wizard's typed date (JP-052): the visitor's own box, whose
// placeholder is `dd / mm / yyyy`, so day first, with slashes, dots or dashes
// and any spaces round them. An ISO date is taken too. Null for anything that
// is not a real day, `parseDate`'s rule.
export function parseDayFirst(v) {
  const s = String(v ?? '').trim()
  const iso = parseDate(s)
  if (iso) return iso
  const t = /^(\d{1,2})\s*[/.-]\s*(\d{1,2})\s*[/.-]\s*(\d{4})$/.exec(s)
  if (!t) return null
  const y = +t[3], m = +t[2] - 1, d = +t[1]
  if (m < 0 || m > 11 || d < 1 || d > monthSpan(y, m).length) return null
  return { y, m, d }
}

export function isoDate(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

// The day the calendar's CAL_SPAN window counts from (F20): `open`, or today
// once `open` has passed — max(open, today), read by month. `open` is parsed,
// `today` an ISO string or nothing, and with nothing it is `open`, which is
// how the canvas stays off the clock. The published section and BookedField
// both ask this, so the editor pages exactly the months a visitor can pick in.
export function calStart(open, today) {
  const now = parseDate(today)
  return now && isoDate(open.y, open.m, open.d) < isoDate(now.y, now.m, now.d) ? now : open
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
