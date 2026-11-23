// §4 — Static data module. Pure data plus four helpers; no React.
// Every literal here is normative: do not round, substitute or "improve".

/* ------------------------------------------------------------------ *
 * §4.1 THEMES — 7 templates
 * ------------------------------------------------------------------ */

// Grunge's distress (plans/grunge/display-face.md, candidate A): a 240 × 240
// noise tile masked over Anton's display type, standing in for the wear
// Stones Crush carries in its outlines. A fine speck (0.5, seed 7) is lifted
// or lowered by a coarse field (0.03, seed 3), so the cuts cluster into
// scuffed patches and clean runs, then thresholded hard at R ≈ 0.25 into a
// binary alpha — 6.7% of the tile cut. Both seeds are pinned, so every render
// is the same, and `stitchTiles` makes the tile seamless. Declared above
// THEMES, which reads it.
const DISTRESS_SVG = "<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>"
  + "<filter id='n' x='0' y='0' width='100%' height='100%'>"
  + "<feTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='2' seed='7' stitchTiles='stitch'/>"
  + "<feColorMatrix values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 1' result='f'/>"
  + "<feTurbulence type='fractalNoise' baseFrequency='0.03' numOctaves='1' seed='3' stitchTiles='stitch'/>"
  + "<feColorMatrix values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 1' result='c'/>"
  + "<feComposite in='f' in2='c' operator='arithmetic' k1='0' k2='1' k3='1.2' k4='-0.6'/>"
  + "<feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  20 0 0 0 -4.5'/>"
  + "<feComponentTransfer><feFuncA type='discrete' tableValues='0 1'/></feComponentTransfer>"
  + "</filter><rect width='100%' height='100%' filter='url(#n)'/></svg>"

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
    // it is set in Anton — the nearest free silhouette, heavy and condensed
    // (user call, 2026-09-21; Retro's Soulway → Fraunces precedent) — with the
    // distress put back at display sizes by `distress` below (JP-056, option
    // C, user call, 2026-09-29). Anton has a lowercase where Stones Crush is all capitals, so
    // a Grunge block sets its display and label strings `textTransform:
    // 'uppercase'` per site; Chakra Petch and Inter set mixed case ("Sold Out",
    // "Full name"), which is why casing is 'title' and not 'upper'.
    display: "'Anton', sans-serif",
    label: "'Anton', sans-serif",
    // Anton's glyphs against Stones Crush's: set at 0.75 of the token, line
    // height divided back out (`faced` / `facedLh` in EncoreSection). A theme
    // with no key sets its face at the token (1).
    faceK: 0.75,
    // …and the distress Anton lacks, as a mask over the display type
    // (`distressed` in EncoreSection): the tile above, one per 4 em, so a
    // 121px head and a 39px one wear the same texture. The display keys and
    // `title` take it; `list` and the label keys stay clean, since it eats thin
    // strokes. A theme with no key gains no style.
    distress: { image: `url("data:image/svg+xml,${encodeURIComponent(DISTRESS_SVG)}")`, size: '4em 4em' },
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
    sub: 'Gloock · paper & ink',
    // Editorial is the fourth template with a Figma variable mode ("1 ·
    // Primitives" → Sienna Vale, "2 · Scheme" → Scheme 1), so every value below
    // is that mode's. The exception is the display and label face: the mode
    // names FONTSPRING DEMO - Fisterra Fora, a demo-licence caps-only condensed
    // display serif that cannot ship (no web licence has been bought), so it is
    // set in Gloock, picked over the renders against the frame
    // (plans/editorial/display-face.md, step 2, user call, 2026-10-05): the
    // closest free face in colour, contrast and tight fit, with wedge-bracketed
    // serifs; it has none of Fisterra's R and Q tails, flared stems or N–N
    // joins, and no free face on the list did. It replaces Noto Serif Display
    // (session 0's pick, 2026-09-24), which is no longer loaded. Gloock has one
    // weight, 400, and index.html asks Google for it alone (`family=Gloock`),
    // so the three statements the frames set Bold set it at 400 rather than
    // take a synthetic bold. Its cap is .750 of the em against the frame's
    // .725, so it is set at 0.967 of the token (`faced`). It has a lowercase
    // where Fisterra Fora is all capitals, so an Editorial block sets its
    // display and label strings `textTransform: 'uppercase'` per site,
    // Grunge's rule; Chakra Petch and Inter set mixed case ("Sold Out", "Full
    // name"), hence casing 'title'.
    display: "'Gloock', serif",
    label: "'Gloock', serif",
    faceK: 0.967,
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
    // The other schemes the frames stand a whole section on (SCHEMES_OF) or a
    // nested node on (`s.onScheme[n]`), in Scheme 1's shape: `palette` is [bg,
    // text1, text2]. Scheme 2's accent is paper, so its heads are paper on
    // taupe; Schemes 2's and 3's inactive ground is transparent, so an idle
    // chip there is an outline only.
    schemes: {
      // Scheme 2, taupe — layout 1's media player and pricing, layout 2's
      // media panel and calendar card, layout 3's gallery and footer (and,
      // nested, its audio card and middle repertoire set), and layout 4's
      // media band.
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
      // footer, layout 2's pricing at 1440, layout 3's header (its frame's
      // Scheme 8; SCHEMES_OF) and layout 4's header, bio, gallery and
      // repertoire — and, nested at layout 3, the third repertoire set,
      // pricing's featured row, the map's panel and the testimonials' ink
      // cells, and at layout 4 the map's viewport and the calendar's Back pill.
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
      // form, layout 3's map (and, nested, its first repertoire set and the
      // testimonials' terracotta cell), and layout 4's testimonials (and,
      // nested, the header's seal and the gallery's arrow discs). Its accent is paper and its active pair ink under terracotta, so
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
      // Scheme 5, blush — layout 3's header nav capsule, read through
      // `s.onScheme[5]`; no section is seated on it. The first Sienna Vale
      // scheme with a pure black (its active ground and second tag seat); its
      // accent is ink and its stroke1 opaque terracotta. Its tags 3–7 do not
      // strictly alternate (tag 4 is terracotta again), which the two-seat
      // system ignores, as in Schemes 2 and 3.
      5: {
        palette: ['#E6B6A0', '#141414', '#F6F0E8'],
        tags: ['#C86E52', '#000000'],
        sem: {
          box1: '#F7C7B1', box2: '#FFD9C7', box3: '#D8A994', glow: '#C86E52',
          activeBg: '#000000', activeFg: '#C86E52',
          inactiveBg: 'rgba(230, 182, 160, 0)', inactiveFg: '#F6F0E8', inactiveLine: 'rgba(246, 240, 232, 0.56)',
          stroke1: '#C86E52', stroke2: '#141414', hl: '#FFFFFF',
          tagFg: ['#141414', '#C86E52'],
        },
      },
    },
  },
  {
    name: 'Pop',
    sub: 'Titan One · loud & bright',
    // Pop is the fifth template with a Figma variable mode ("1 · Primitives" →
    // Pop, "2 · Scheme" → Scheme 1), so every value below is that mode's —
    // though only its header binds to it; the other ten frames were drawn in
    // raw values (plans/pop/layout-1.md, *Pop's Figma mode*). The exception is
    // the display and label face: the mode names Chunko Bold Demo, a
    // demo-licence heavy wide grotesque that cannot ship, so it is set in Titan
    // One (user call, 2026-10-02) — the one free face with Chunko's weight (its
    // stem is .388 of the cap against .385), its widths and its cap at once;
    // its corners are soft where Chunko's are squared. Its cap is .735 of the em
    // against Chunko's .720, so it is set at 0.98 of the token (`faced`), which
    // brings its widths to 1.2% of the frame's. Titan One has a lowercase where
    // the frames type every Chunko string in capitals, so a Pop block sets its
    // display and label strings `textTransform: 'uppercase'` per site,
    // Grunge's rule; Chakra Petch and Inter set mixed case ("Sold Out", "Full
    // name"), hence casing 'title'.
    display: "'Titan One', sans-serif",
    label: "'Titan One', sans-serif",
    faceK: 0.98,
    ui: "'Chakra Petch', sans-serif",
    // The eyebrows, ID lines, day names and gig times are Space Mono.
    mono: "'Space Mono', monospace",
    body: "'Inter', sans-serif",
    casing: 'title',
    // Every Pop text style states letterSpacing 0.
    dls: '0px',
    // radius/card, radius/control, radius/pill, border/thin, radius/chip.
    radius: '24px',
    radiusSm: '8px',
    btnR: '999px',
    bw: '2px',
    radiusChip: '8px',
    // Scheme 1's bg / text1 / text2.
    palette: ['#FFFFFF', '#FF2DA0', '#6B2CFF'], // white · hot pink · violet
    // Scheme 1's tag1…tag7 backgrounds — seven distinct hues, the first seat
    // system since Retro's that is not two alternating tags — with their inks
    // in `sem.tagFg`.
    tags: ['#C6F200', '#FF2DA0', '#2563FF', '#00E0C4', '#6B2CFF', '#FF1A1A', '#FFF600'],
    // Scheme 1, white — the scheme seven of the eleven layout-1 sections stand
    // on. Its active pair is the twins' turned round: the picked state is
    // black under white type and the idle one lime under black, so `pillBg` is
    // black here. `text3` is the frames' body ink (black), where `text2`, the
    // palette's `tx`, is violet.
    sem: {
      box1: '#F5F5F5',                      // sem/box/1
      box2: '#EBEBEB',                      // sem/box/2
      box3: '#000000',                      // sem/box/3
      glow: '#FF2DA0',                      // sem/glow
      activeBg: '#000000',                  // sem/active/bg
      activeFg: '#FFFFFF',                  // sem/active/text
      inactiveBg: '#C6F200',                // sem/inactive/bg
      inactiveFg: '#000000',                // sem/inactive/text
      inactiveLine: '#C6F200',              // sem/state/inactive/border
      stroke1: '#FF2DA0',                   // sem/stroke/1 — opaque pink
      stroke2: '#C6F200',                   // sem/stroke/2
      hl: '#141414',                        // sem/box/1/text
      text3: '#000000',                     // sem/text/3
      tagFg: ['#141414', '#F6F0E8', '#F6F0E8', '#000000', '#F6F0E8', '#F6F0E8', '#000000'], // sem/tag/1…7/text
    },
    // The other schemes a section (SCHEMES_OF) or a nested card (`s.onScheme[n]`)
    // stands on at layout 1, in Scheme 1's shape. Pop's frames bind no colour
    // outside the header, so each seat is the scheme whose ground the frame
    // paints, read off the census (plans/pop/layout-1.md, *Settled in session
    // 0*), and every tint matching no key is the section's named literal.
    // Unlike Sienna Vale's, Pop's nine schemes are nine grounds; 5, 8 and 9 (teal,
    // yellow, black) seat nothing at layout 1, and at layout 2, whose frames are
    // bound, 5 and 8 seat the media's fan card and list rows, nested; 9 none.
    // Layouts 3 and 4 are bound too, and seat 5 and 8 on nested nodes alone.
    // The section seats per layout are SCHEMES_OF.Pop's rows.
    schemes: {
      // Scheme 2, lime — the testimonials, and the gallery's source panel; at
      // layout 2 the media panel and the calendar card; at layout 3 the
      // calendar card and the gallery sheet; at layout 4 the media band.
      2: {
        palette: ['#C6F200', '#FF2DA0', '#6B2CFF'],
        tags: ['#FF2DA0', '#2563FF', '#00E0C4', '#6B2CFF', '#FF1A1A', '#FFF600', '#FFFFFF'],
        sem: {
          box1: '#D7FF23', box2: '#B7DD0D', box3: '#8CA51E', glow: '#FF2DA0',
          activeBg: '#FF2DA0', activeFg: '#FFFFFF',
          inactiveBg: '#FF2DA0', inactiveFg: '#FFFFFF', inactiveLine: '#FF2DA0',
          stroke1: '#6B2CFF', stroke2: '#FF2DA0', hl: '#141414', text3: '#000000',
          tagFg: ['#F6F0E8', '#F6F0E8', '#000000', '#F6F0E8', '#F6F0E8', '#000000', '#141414'],
        },
      },
      // Scheme 3, pink — the footer, the media player's card, pricing's third
      // card and the form's half; at layout 4 the header, the bio, the gallery
      // and the repertoire.
      3: {
        palette: ['#FF2DA0', '#C6F200', '#6B2CFF'],
        tags: ['#2563FF', '#00E0C4', '#6B2CFF', '#FF1A1A', '#FFF600', '#C6F200', '#F5F5F5'],
        sem: {
          box1: '#FF63B8', box2: '#F0138C', box3: '#C20A6F', glow: '#C6F200',
          activeBg: '#C6F200', activeFg: '#000000',
          inactiveBg: '#C6F200', inactiveFg: '#FFFFFF', inactiveLine: '#C6F200',
          stroke1: '#6B2CFF', stroke2: '#C6F200', hl: '#141414', text3: '#FFFFFF',
          tagFg: ['#F6F0E8', '#000000', '#F6F0E8', '#F6F0E8', '#000000', '#141414', '#000000'],
        },
      },
      // Scheme 4, blue — the booking calendar, by its ground and white type
      // only: its lime head, its #4F81FF panel and its discs are literals; at
      // layout 2 the enquiry form's band; at layout 3 the map's band; at
      // layout 4 the testimonials' sheet.
      4: {
        palette: ['#2563FF', '#00E0C4', '#FFF600'],
        tags: ['#00E0C4', '#6B2CFF', '#FF1A1A', '#FFF600', '#C6F200', '#FF2DA0', '#FFFFFF'],
        sem: {
          box1: '#3F76FF', box2: '#1553ED', box3: '#1044C7', glow: '#00E0C4',
          activeBg: '#00E0C4', activeFg: '#000000',
          inactiveBg: '#00E0C4', inactiveFg: '#FFFFFF', inactiveLine: '#00E0C4',
          stroke1: '#00E0C4', stroke2: '#FFF600', hl: '#FFFFFF', text3: '#FFFFFF',
          tagFg: ['#000000', '#F6F0E8', '#F6F0E8', '#000000', '#141414', '#F6F0E8', '#000000'],
        },
      },
      // Scheme 5, teal — layout 2's media: a fan card and a list row, read
      // through `s.onScheme[5]` (and layout 3's media rows and a testimonials
      // cell, layout 4's 390 seal and map ticker); no section is seated on it. Read off `2 ·
      // Scheme` through `Primitives → Pop` (plans/pop/layout-2.md, *Settled in
      // session 0*). Its accent is violet and its body ink yellow.
      5: {
        palette: ['#00E0C4', '#6B2CFF', '#FFF600'],
        tags: ['#6B2CFF', '#FF1A1A', '#FFF600', '#C6F200', '#FF2DA0', '#2563FF', '#FFFFFF'],
        sem: {
          box1: '#14F4D8', box2: '#0AC9B1', box3: '#06A893', glow: '#6B2CFF',
          activeBg: '#6B2CFF', activeFg: '#FFFFFF',
          inactiveBg: '#6B2CFF', inactiveFg: '#FFFFFF', inactiveLine: '#6B2CFF',
          stroke1: '#6B2CFF', stroke2: '#FFF600', hl: '#000000', text3: '#000000',
          tagFg: ['#F6F0E8', '#F6F0E8', '#000000', '#141414', '#F6F0E8', '#F6F0E8', '#000000'],
        },
      },
      // Scheme 6, violet — the repertoire, and the media's player, the map's
      // card, pricing's first card, the form's card and the testimonials' card;
      // at layout 3 the header.
      6: {
        palette: ['#6B2CFF', '#C6F200', '#FF2DA0'],
        tags: ['#FF1A1A', '#FFF600', '#C6F200', '#FF2DA0', '#2563FF', '#00E0C4', '#FFFFFF'],
        sem: {
          box1: '#8451FA', box2: '#5C22E6', box3: '#4612BE', glow: '#C6F200',
          activeBg: '#C6F200', activeFg: '#000000',
          inactiveBg: '#C6F200', inactiveFg: '#FFFFFF', inactiveLine: '#C6F200',
          stroke1: '#C6F200', stroke2: '#FF2DA0', hl: '#FFFFFF', text3: '#FFFFFF',
          tagFg: ['#F6F0E8', '#000000', '#141414', '#F6F0E8', '#F6F0E8', '#000000', '#000000'],
        },
      },
      // Scheme 7, red — the events map's gig panel.
      7: {
        palette: ['#FF1A1A', '#C6F200', '#6B2CFF'],
        tags: ['#FFF600', '#C6F200', '#FF2DA0', '#2563FF', '#00E0C4', '#6B2CFF', '#FFFFFF'],
        sem: {
          box1: '#FF5A5A', box2: '#E40606', box3: '#C20303', glow: '#C6F200',
          activeBg: '#C6F200', activeFg: '#000000',
          inactiveBg: '#C6F200', inactiveFg: '#F5F5F5', inactiveLine: '#C6F200',
          stroke1: '#C6F200', stroke2: '#6B2CFF', hl: '#FFFFFF', text3: '#FFFFFF',
          tagFg: ['#000000', '#141414', '#F6F0E8', '#F6F0E8', '#000000', '#F6F0E8', '#000000'],
        },
      },
      // Scheme 8, yellow — layout 2's media list, a row read through
      // `s.onScheme[8]`; no section is seated on it. Read with Scheme 5. Its
      // idle label is black where its active one is white.
      8: {
        palette: ['#FFF600', '#FF2DA0', '#6B2CFF'],
        tags: ['#C6F200', '#FF2DA0', '#2563FF', '#00E0C4', '#6B2CFF', '#FF1A1A', '#FFFFFF'],
        sem: {
          box1: '#FFFB96', box2: '#EEE60B', box3: '#D4CC04', glow: '#FF2DA0',
          activeBg: '#FF2DA0', activeFg: '#FFFFFF',
          inactiveBg: '#FF2DA0', inactiveFg: '#000000', inactiveLine: '#FF2DA0',
          stroke1: '#FF2DA0', stroke2: '#6B2CFF', hl: '#141414', text3: '#000000',
          tagFg: ['#141414', '#F6F0E8', '#F6F0E8', '#000000', '#F6F0E8', '#F6F0E8', '#000000'],
        },
      },
    },
  },
  // Lattice — the sixth template, from the Batch 2 file (JustPay — Batch 2,
  // ORILFywSzuadscu6RzskCW; plans/lattice/layout-1.md). That file reuses the
  // SAAS variable library, so its schemes are the library's: Scheme 1 is the
  // theme's own (the bio and the map stand on it), and the dark `#111` sections
  // (header, media, repertoire, pricing, form, footer) stand on Scheme 8, the
  // gallery and the calendar on 2 and the testimonials on 5 (SCHEMES_OF). Every
  // colour below was resolved through the alias chain off the library's
  // "2 · Scheme" collection, not off the frames' flat `get_variable_defs`.
  //
  // The faces: the frames' display family is "Lattice Display Medium", a
  // custom face the file names but does not carry. It is stood in by Archivo at
  // wdth 113, wght 500 (user call, 2026-11-19: measured on eight strings at
  // 0.993 of the frames' ink widths at wdth 112.5, 1.018 at 115), through the
  // `Archivo Lattice` alias that index.css pins to that instance, so a section
  // names no axis. `faceK` stays 1. The labels, the chips and every UI string are
  // Azeret Mono (font/label, font/ui), the body Archivo Regular (font/body).
  // The frames type every display and mono string in capitals through
  // `textCase`, so casing is 'title' and a block uppercases per site.
  {
    name: 'Lattice',
    sub: 'Archivo wide · mono grid',
    // The page's own ground (the gutter, the published document, the preview's scroller): the
    // frame's body is #111 although Scheme 1, which the bio and the map stand on, is #DADADA
    // (user call, 2026-11-20, the end-of-pass sweep). A theme without the key reads palette[0].
    pageGround: '#111111',
    display: "'Archivo Lattice', 'Archivo', sans-serif",
    label: "'Azeret Mono', monospace",
    ui: "'Azeret Mono', monospace",
    mono: "'Azeret Mono', monospace",
    body: "'Archivo', sans-serif",
    casing: 'title',
    // Display tracking is -0.01em and the mono labels' +0.04em, stated per site
    // (the text styles carry them; the theme key is the shared default).
    dls: '0px',
    // radius/card 20 and radius/chip 3, border/hairline 1 (Primitives mode
    // 187:0, read through the file). The frames' buttons are bracket-cornered
    // and square, and their chips 3, so btnR and radiusSm take the chip's 3
    // until a section reads its own control (radius/control and radius/pill are
    // not in this file's collection).
    radius: '20px',
    radiusSm: '3px',
    btnR: '3px',
    bw: '1px',
    radiusChip: '3px',
    // Scheme 1's bg / text1 / text2 — the grey the bio and the map stand on.
    palette: ['#DADADA', '#111111', '#111111'],
    // Scheme 1's tag1…tag7 backgrounds. tag/4/bg is the one token the file's
    // collection does not hold; every scheme's tag4 is inferred from its
    // tag/4/text (a light ink means a dark chip), except Scheme 8's, which is
    // the header's own Archive chip, #262626.
    tags: ['#5C939F', '#ED6D40', '#5C939F', '#262626', '#ED6D40', '#111111', '#111111'],
    // The semantic colours the palette cannot derive, Scheme 1's. The file's
    // collection holds box 1–3, active, stroke 1–2, text 3 and the tags; it
    // holds no glow, hl or inactive pair, which are inferred (glow the active
    // ground, hl the ink, the inactive pair the box and the ink) and are re-read
    // by the section that draws them.
    sem: {
      box1: '#E7E7E7',                      // sem/box/1
      box2: '#CFCFCF',                      // sem/box/2
      box3: '#C4C4C4',                      // sem/box/3
      glow: '#ED6D40',                      // inferred: sem/active/bg
      activeBg: '#ED6D40',                  // sem/active/bg
      activeFg: '#111111',                  // sem/active/text
      inactiveBg: '#E7E7E7',                // inferred: sem/box/1
      inactiveFg: '#111111',                // inferred: sem/text/1
      inactiveLine: '#E7E7E7',              // inferred: sem/box/1
      stroke1: '#111111',                   // sem/stroke/1
      stroke2: '#262626',                   // sem/stroke/2
      hl: '#111111',                        // inferred: sem/text/1
      text3: '#36626B',                     // sem/text/3 — the teal ink on the light grounds
      // sem/tag/1, /4 and /5 text are the three the file holds; the rest fall
      // to contrast().
      tagFg: ['#111111', undefined, undefined, '#F2F2F2', '#111111', undefined, undefined],
    },
    // Schemes 2–9 of the same collection, in Scheme 1's shape. A section is
    // seated on one through SCHEMES_OF.Lattice and a nested node reads
    // `s.onScheme[n]`; 3, 4, 6, 7 and 9 seat nothing at layout 1 but the pricing
    // cards (3 dark, 5 orange, 4 teal) and the chips read them. Each row is the
    // table of the 2026-11-19 read, so a later session need not re-read it.
    schemes: {
      // Scheme 2, #F2F2F2 — the gallery and the calendar.
      2: {
        palette: ['#F2F2F2', '#111111', '#111111'],
        tags: ['#ED6D40', '#5C939F', '#262626', '#ED6D40', '#111111', '#111111', '#5C939F'],
        sem: {
          box1: '#FAFAFA', box2: '#EBEBEB', box3: '#E0E0E0', glow: '#ED6D40',
          activeBg: '#ED6D40', activeFg: '#111111',
          inactiveBg: '#FAFAFA', inactiveFg: '#111111', inactiveLine: '#FAFAFA',
          stroke1: '#111111', stroke2: '#262626', hl: '#111111', text3: '#36626B',
          tagFg: ['#111111', undefined, undefined, '#111111', '#ECECEC', undefined, undefined],
        },
      },
      // Scheme 3, #262626 — the pricing's dark card.
      3: {
        palette: ['#262626', '#F2F2F2', '#F2F2F2'],
        tags: ['#5C939F', '#F2F2F2', '#ED6D40', '#111111', '#111111', '#5C939F', '#ED6D40'],
        sem: {
          box1: '#303030', box2: '#1E1E1E', box3: '#161616', glow: '#5C939F',
          activeBg: '#5C939F', activeFg: '#111111',
          inactiveBg: '#303030', inactiveFg: '#F2F2F2', inactiveLine: '#303030',
          stroke1: '#111111', stroke2: '#5C939F', hl: '#F2F2F2', text3: '#F2F2F2',
          tagFg: ['#111111', undefined, undefined, '#ECECEC', '#ECECEC', undefined, undefined],
        },
      },
      // Scheme 4, #5C939F teal — the pricing's teal card.
      4: {
        palette: ['#5C939F', '#111111', '#111111'],
        tags: ['#262626', '#ED6D40', '#111111', '#262626', '#5C939F', '#ED6D40', '#F2F2F2'],
        sem: {
          box1: '#6BA1AD', box2: '#528792', box3: '#4A7C86', glow: '#ED6D40',
          activeBg: '#ED6D40', activeFg: '#111111',
          inactiveBg: '#6BA1AD', inactiveFg: '#111111', inactiveLine: '#6BA1AD',
          stroke1: '#111111', stroke2: '#262626', hl: '#111111', text3: '#111111',
          tagFg: ['#F2F2F2', undefined, undefined, '#F2F2F2', '#111111', undefined, undefined],
        },
      },
      // Scheme 5, #ED6D40 orange — the testimonials, and the pricing's orange card.
      5: {
        palette: ['#ED6D40', '#111111', '#111111'],
        tags: ['#ED6D40', '#111111', '#111111', '#5C939F', '#F2F2F2', '#5C939F', '#262626'],
        sem: {
          box1: '#F07F57', box2: '#E25F31', box3: '#C4542C', glow: '#5C939F',
          activeBg: '#5C939F', activeFg: '#111111',
          inactiveBg: '#F07F57', inactiveFg: '#111111', inactiveLine: '#F07F57',
          stroke1: '#111111', stroke2: '#5C939F', hl: '#111111', text3: '#111111',
          tagFg: ['#111111', undefined, undefined, '#111111', '#111111', undefined, undefined],
        },
      },
      // Scheme 6, teal. Seats nothing at layout 1.
      6: {
        palette: ['#5C939F', '#111111', '#111111'],
        tags: ['#111111', '#111111', '#F2F2F2', '#ED6D40', '#5C939F', '#262626', '#ED6D40'],
        sem: {
          box1: '#6BA1AD', box2: '#528792', box3: '#3F6F79', glow: '#ED6D40',
          activeBg: '#ED6D40', activeFg: '#000000',
          inactiveBg: '#6BA1AD', inactiveFg: '#111111', inactiveLine: '#6BA1AD',
          stroke1: '#111111', stroke2: '#ED6D40', hl: '#111111', text3: '#111111',
          tagFg: ['#F2F2F2', undefined, undefined, '#111111', '#111111', undefined, undefined],
        },
      },
      // Scheme 7, orange. Seats nothing at layout 1.
      7: {
        palette: ['#ED6D40', '#111111', '#111111'],
        tags: ['#111111', '#5C939F', '#ED6D40', '#5C939F', '#262626', '#F2F2F2', '#111111'],
        sem: {
          box1: '#E7E7E7', box2: '#E25F31', box3: '#D8562A', glow: '#5C939F',
          activeBg: '#5C939F', activeFg: '#111111',
          inactiveBg: '#E7E7E7', inactiveFg: '#111111', inactiveLine: '#E7E7E7',
          stroke1: '#111111', stroke2: '#F2F2F2', hl: '#111111', text3: '#111111',
          tagFg: ['#F2F2F2', undefined, undefined, '#111111', '#F2F2F2', undefined, undefined],
        },
      },
      // Scheme 8, #111111 — the page's dark ground: the header, the media, the
      // repertoire, the pricing, the form and the footer. The header's resolved
      // mode (579:2).
      8: {
        palette: ['#111111', '#F2F2F2', '#F2F2F2'],
        tags: ['#5C939F', '#ED6D40', '#5C939F', '#262626', '#ED6D40', '#F2F2F2', '#F2F2F2'],
        sem: {
          box1: '#1B1B1B', box2: '#0B0B0B', box3: '#000000', glow: '#5C939F',
          activeBg: '#5C939F', activeFg: '#111111',
          inactiveBg: '#1B1B1B', inactiveFg: '#F2F2F2', inactiveLine: '#1B1B1B',
          stroke1: '#F2F2F2', stroke2: '#5C939F', hl: '#F2F2F2', text3: '#ED6D40',
          tagFg: ['#111111', undefined, undefined, '#F2F2F2', '#111111', undefined, undefined],
        },
      },
      // Scheme 9, grey like 1. Seats nothing.
      9: {
        palette: ['#DADADA', '#111111', '#111111'],
        tags: ['#ED6D40', '#5C939F', '#262626', '#ED6D40', '#111111', '#111111', '#5C939F'],
        sem: {
          box1: '#E7E7E7', box2: '#CFCFCF', box3: '#C4C4C4', glow: '#ED6D40',
          activeBg: '#ED6D40', activeFg: '#111111',
          inactiveBg: '#E7E7E7', inactiveFg: '#111111', inactiveLine: '#E7E7E7',
          stroke1: '#111111', stroke2: '#262626', hl: '#111111', text3: '#36626B',
          tagFg: ['#111111', undefined, undefined, '#111111', '#ECECEC', undefined, undefined],
        },
      },
    },
  },
  // Paperback — the seventh template, from the same Batch 2 file as Lattice
  // (JustPay — Batch 2, ORILFywSzuadscu6RzskCW; frames "Paperback Playful —
  // Claude Design"; plans/paperback/layout-1.md). The file's variable library
  // is the SAAS one again, so every colour below was resolved through the alias
  // chain off "2 · Scheme" with "1 · Primitives" at its Paperback mode (187:3),
  // never off the frames' flat `get_variable_defs`, which is node-dependent.
  // Scheme 1, pale yellow, is the theme's own (the header, the gallery and the
  // testimonials stand on it); the page itself is Scheme 2, white, which the
  // bio, media, repertoire, pricing, calendar and form stand on with their
  // cards (SCHEMES_OF.Paperback), and the map and the footer stand on 3,
  // indigo. `palette` is [bg, ac, tx] with ac the scheme's `sem/active/bg` (the
  // pink of Book now) and tx its `sem/text/2`.
  //
  // The faces: Bricolage Grotesque ExtraBold (font/display, tracking -3.5%) and
  // Figtree (font/label, font/body, Bold and SemiBold, tracking -1%), both free
  // Google Fonts, and a third no variable names, the script of the notes: Caveat
  // Bold, read off the text nodes (`script`, `s.script`). The frames type every
  // string in mixed case, so casing is 'title' and nothing uppercases.
  {
    name: 'Paperback',
    sub: 'Bricolage Grotesque · playful & bright',
    // The page's own ground (the gutter, the published document, the preview's scroller): white,
    // Scheme 2's, although the theme's own Scheme 1 is the pale yellow of the header band.
    pageGround: '#FFFFFF',
    display: "'Bricolage Grotesque', sans-serif",
    label: "'Figtree', sans-serif",
    ui: "'Figtree', sans-serif",
    body: "'Figtree', sans-serif",
    script: "'Caveat', cursive",
    casing: 'title',
    // Display strings track -0.035em and Figtree's -0.01em; stated per site (the text styles
    // carry them), so the shared default is 0.
    dls: '0px',
    // radius/card 24, radius/control 8, radius/chip 999, border/thin 2 (the Paperback mode).
    radius: '24px',
    radiusSm: '8px',
    btnR: '999px',
    bw: '2px',
    radiusChip: '999px',
    // Scheme 1's bg / sem/active/bg / sem/text/2.
    palette: ['#FAED8F', '#F8158F', '#0B0B0B'],
    // Scheme 1's tag1…tag7 backgrounds. tag/4/bg is the one token the file's collection does not
    // hold (the page binds tag/4/text alone); each scheme's tag4 is inferred from its tag/4/text
    // (a light ink means a dark chip, a dark ink a light one) and is re-read by the section that
    // draws it. Hot-pink #F8158F and magenta #FD48F2 are the `Live` / `Slow Burn` chips.
    tags: ['#9982DE', '#F8158F', '#F9A12B', '#0B0B0B', '#FD48F2', '#0B0B0B', '#0B0B0B'],
    // The semantic colours the palette cannot derive, Scheme 1's. The file holds box 1–3, active,
    // stroke 1, text 3 and the tags; it holds no glow, hl, stroke2 or inactive pair (inferred: glow
    // the active ground, hl the ink, stroke2 stroke1, the inactive pair the box and the ink), and
    // no `active/text` (white on pink, read off the Book now, Continue and Subscribe pills).
    sem: {
      box1: '#FFF6C2',                      // sem/box/1
      box2: '#FFD24A',                      // sem/box/2
      box3: '#F9C53A',                      // sem/box/3
      glow: '#F8158F',                      // inferred: sem/active/bg
      activeBg: '#F8158F',                  // sem/active/bg
      activeFg: '#FFFFFF',                  // read off the pills' text
      inactiveBg: '#FFF6C2',                // inferred: sem/box/1
      inactiveFg: '#0B0B0B',                // inferred: sem/text/1
      inactiveLine: '#FFF6C2',              // inferred: sem/box/1
      stroke1: '#0B0B0B',                   // sem/stroke/1
      stroke2: '#0B0B0B',                   // inferred: sem/stroke/1
      hl: '#0B0B0B',                        // inferred: sem/text/1
      text3: '#3B308F',                     // sem/text/3 — the indigo of the script notes
      tagFg: [undefined, undefined, undefined, '#FFFFFF', undefined, undefined, undefined],
    },
    // Schemes 2–9 of the same collection, in Scheme 1's shape. A section is seated on one through
    // SCHEMES_OF.Paperback and a nested node reads `s.onScheme[n]`. The table of the 2026-11-20 read.
    schemes: {
      // Scheme 2, #FFFFFF — the page: the bio, media, repertoire, pricing, calendar and form stand on it, with their cards.
      2: {
        palette: ['#FFFFFF', '#F8158F', '#0B0B0B'],
        tags: ['#F8158F', '#F9A12B', '#3B308F', '#FFFFFF', '#0B0B0B', '#0B0B0B', '#9982DE'],
        sem: {
          box1: '#FFFFFF', box2: '#FFDBFD', box3: '#A4F6F8', glow: '#F8158F',
          activeBg: '#F8158F', activeFg: '#FFFFFF',
          inactiveBg: '#FFFFFF', inactiveFg: '#0B0B0B', inactiveLine: '#FFFFFF',
          stroke1: '#0B0B0B', stroke2: '#0B0B0B', hl: '#0B0B0B', text3: '#3B308F',
          tagFg: [undefined, undefined, undefined, '#0B0B0B', undefined, undefined, undefined],
        },
      },
      // Scheme 3, #3B308F — the map and the footer (indigo).
      3: {
        palette: ['#3B308F', '#F9A12B', '#FFFFFF'],
        tags: ['#F9A12B', '#FFFFFF', '#FD48F2', '#2F2675', '#0B0B0B', '#9982DE', '#F8158F'],
        sem: {
          box1: '#4A3FA3', box2: '#2F2675', box3: '#231C5C', glow: '#F9A12B',
          activeBg: '#F9A12B', activeFg: '#0B0B0B',
          inactiveBg: '#4A3FA3', inactiveFg: '#F9A12B', inactiveLine: '#4A3FA3',
          stroke1: '#0B0B0B', stroke2: '#0B0B0B', hl: '#F9A12B', text3: '#FFFFFF',
          tagFg: [undefined, undefined, undefined, '#FFF2B3', undefined, undefined, undefined],
        },
      },
      // Scheme 4, #F9A12B — orange. Seats nothing at layout 1.
      4: {
        palette: ['#F9A12B', '#F8158F', '#0B0B0B'],
        tags: ['#3B308F', '#FD48F2', '#0B0B0B', '#0B0B0B', '#9982DE', '#F8158F', '#FFFFFF'],
        sem: {
          box1: '#FBB54E', box2: '#E8901C', box3: '#D07E12', glow: '#F8158F',
          activeBg: '#F8158F', activeFg: '#FFFFFF',
          inactiveBg: '#FBB54E', inactiveFg: '#0B0B0B', inactiveLine: '#FBB54E',
          stroke1: '#0B0B0B', stroke2: '#0B0B0B', hl: '#0B0B0B', text3: '#0B0B0B',
          tagFg: [undefined, undefined, undefined, '#FFF2B3', undefined, undefined, undefined],
        },
      },
      // Scheme 5, #F8158F — hot pink. Seats nothing at layout 1.
      5: {
        palette: ['#F8158F', '#F9A12B', '#0B0B0B'],
        tags: ['#FD48F2', '#0B0B0B', '#0B0B0B', '#FFFFFF', '#FFFFFF', '#F9A12B', '#3B308F'],
        sem: {
          box1: '#FB4FAE', box2: '#D90F7A', box3: '#A30A5A', glow: '#F9A12B',
          activeBg: '#F9A12B', activeFg: '#0B0B0B',
          inactiveBg: '#FB4FAE', inactiveFg: '#0B0B0B', inactiveLine: '#FB4FAE',
          stroke1: '#0B0B0B', stroke2: '#0B0B0B', hl: '#0B0B0B', text3: '#0B0B0B',
          tagFg: [undefined, undefined, undefined, '#0B0B0B', undefined, undefined, undefined],
        },
      },
      // Scheme 6, #9982DE — lilac. Seats nothing at layout 1 (the map card is a nested lilac).
      6: {
        palette: ['#9982DE', '#FD48F2', '#0B0B0B'],
        tags: ['#0B0B0B', '#0B0B0B', '#FFFFFF', '#FFFFFF', '#F9A12B', '#3B308F', '#FD48F2'],
        sem: {
          box1: '#AA96E6', box2: '#8A70D6', box3: '#6E55C2', glow: '#FD48F2',
          activeBg: '#FD48F2', activeFg: '#0B0B0B',
          inactiveBg: '#AA96E6', inactiveFg: '#0B0B0B', inactiveLine: '#AA96E6',
          stroke1: '#0B0B0B', stroke2: '#0B0B0B', hl: '#0B0B0B', text3: '#0B0B0B',
          tagFg: [undefined, undefined, undefined, '#0B0B0B', undefined, undefined, undefined],
        },
      },
      // Scheme 7, #FD48F2 — magenta. Seats nothing at layout 1.
      7: {
        palette: ['#FD48F2', '#9982DE', '#0B0B0B'],
        tags: ['#0B0B0B', '#9982DE', '#F8158F', '#FFFFFF', '#3B308F', '#FFFFFF', '#0B0B0B'],
        sem: {
          box1: '#FEB6FA', box2: '#F02FE0', box3: '#D81FC8', glow: '#9982DE',
          activeBg: '#9982DE', activeFg: '#0B0B0B',
          inactiveBg: '#FEB6FA', inactiveFg: '#0B0B0B', inactiveLine: '#FEB6FA',
          stroke1: '#0B0B0B', stroke2: '#0B0B0B', hl: '#0B0B0B', text3: '#0B0B0B',
          tagFg: [undefined, undefined, undefined, '#0B0B0B', undefined, undefined, undefined],
        },
      },
      // Scheme 8, #0B0B0B — black. Seats nothing at layout 1.
      8: {
        palette: ['#0B0B0B', '#F9A12B', '#FFFFFF'],
        tags: ['#9982DE', '#F8158F', '#F9A12B', '#1C1C1C', '#FD48F2', '#FFFFFF', '#FFFFFF'],
        sem: {
          box1: '#1C1C1C', box2: '#050505', box3: '#000000', glow: '#F9A12B',
          activeBg: '#F9A12B', activeFg: '#0B0B0B',
          inactiveBg: '#1C1C1C', inactiveFg: '#F9A12B', inactiveLine: '#1C1C1C',
          stroke1: '#FFFFFF', stroke2: '#FFFFFF', hl: '#F9A12B', text3: '#F8158F',
          tagFg: [undefined, undefined, undefined, '#FFFFFF', undefined, undefined, undefined],
        },
      },
      // Scheme 9, #FAED8F — pale yellow like 1. Seats nothing.
      9: {
        palette: ['#FAED8F', '#F8158F', '#0B0B0B'],
        tags: ['#F8158F', '#F9A12B', '#3B308F', '#FFFFFF', '#0B0B0B', '#0B0B0B', '#9982DE'],
        sem: {
          box1: '#FFF6C2', box2: '#FFD24A', box3: '#F9C53A', glow: '#F8158F',
          activeBg: '#F8158F', activeFg: '#FFFFFF',
          inactiveBg: '#FFF6C2', inactiveFg: '#0B0B0B', inactiveLine: '#FFF6C2',
          stroke1: '#0B0B0B', stroke2: '#0B0B0B', hl: '#0B0B0B', text3: '#3B308F',
          tagFg: [undefined, undefined, undefined, '#0B0B0B', undefined, undefined, undefined],
        },
      },
    },
  },
  // Headliner — the eighth template, from the same Batch 2 file as Lattice and Paperback
  // (JustPay — Batch 2, ORILFywSzuadscu6RzskCW; frames "Headliner Structured — Claude
  // Design", desktop 1:4478, tablet 1:15259, mobile 1:16314; plans/headliner/layout-1.md).
  // The look is brutalist and flat: square corners (a pill only on a chip), 1 px hairlines,
  // full-bleed bands with straight seams. The file's variable library is the SAAS one, and
  // its binding is partial and node-dependent, so every ground below was read off the
  // section's own node through `resolveForConsumer` (the collections are remote) and checked
  // against its `fills`: 2026-11-23, the table in the plan's *Settled in session 0*. Scheme 1,
  // sand, is the theme's own (the page, the gallery and the pricing stand on it); the bio, the
  // repertoire and the form stand on 2 (cream), the header, the media and the video on 3
  // (maroon), the calendar on 4 (amber), the testimonials on 5 (orange), the map on 6 (teal)
  // and the footer on 7 (ink) — SCHEMES_OF.Headliner. `palette` is [bg, ac, tx] with ac the
  // scheme's `sem/active/bg` and tx its `sem/text/2`. The file holds only twelve `sem` keys
  // a section (bg, active bg / text, tag 1 bg / text, tag 4 text, tag 5 bg / text, tag 7 bg,
  // text 1 / 2 / 3), so box 1–3, glow, the inactive pair, the strokes, `hl`, tags 2, 3, 4 and 6
  // are INFERRED (box 1–3 a step from the ground, glow the active ground, stroke the first
  // ink, tag 4 the dark or light chip its `text` implies) and are re-read by the section that
  // draws them. `text1` is new: maroon and ink set `sem/text/1` amber where `text/2` is cream.
  //
  // The faces: Anton (font/display, the labels), Inter Tight (font/ui, font/body) and a serif
  // no variable names, Fraunces Light (SOFT 0, WONK 1: user call 3, 2026-11-23, through the
  // `Fraunces Headliner` alias in index.css so Retro's single Black instance is untouched).
  // The frames upper-case their Anton by site, so casing is 'title' and a block uppercases.
  {
    name: 'Headliner',
    sub: 'Anton · maroon & orange',
    // The page's own ground: the sand of the page frame, Scheme 1's.
    pageGround: '#EEE3D1',
    display: "'Anton', sans-serif",
    label: "'Anton', sans-serif",
    ui: "'Inter Tight', sans-serif",
    body: "'Inter Tight', sans-serif",
    serif: "'Fraunces Headliner', 'Fraunces', serif",
    casing: 'title',
    dls: '0px',
    // border/hairline 1, radius/pill 999 (chips alone: every card, field, button, photo and
    // arrow is a right angle).
    radius: '0px',
    radiusSm: '0px',
    btnR: '0px',
    bw: '1px',
    radiusChip: '999px',
    // Scheme 1's bg / sem/active/bg / sem/text/2.
    palette: ['#EEE3D1', '#F85E34', '#1E1E1E'],
    // Scheme 1's tag seats: tag 1 #3B758B, tag 5 #48B469, tag 7 #1E1E1E are the file's; tag 4's
    // text is cream so its chip is inferred dark; tags 2, 3 and 6 are inferred from the palette.
    tags: ['#3B758B', '#F85E34', '#F8A351', '#1E1E1E', '#48B469', '#760000', '#1E1E1E'],
    sem: {
      box1: '#F8F2E7',                      // inferred: a step lighter than the sand
      box2: '#E6DAC4',                      // inferred
      box3: '#DCCFB6',                      // inferred
      glow: '#F85E34',                      // inferred: sem/active/bg
      activeBg: '#F85E34',                  // sem/active/bg
      activeFg: '#020202',                  // sem/active/text
      inactiveBg: '#F8F2E7',                // inferred: sem/box/1
      inactiveFg: '#1E1E1E',                // inferred: sem/text/1
      inactiveLine: '#F8F2E7',              // inferred: sem/box/1
      stroke1: '#1E1E1E',                   // inferred: sem/text/1 (the hairline)
      stroke2: '#1E1E1E',                   // inferred
      hl: '#1E1E1E',                        // inferred: sem/text/1
      text1: '#1E1E1E',                     // sem/text/1
      text3: '#760000',                     // sem/text/3 — the maroon `ABOUT` and eyebrows
      tagFg: ['#F8F2E7', undefined, undefined, '#F8F2E7', '#020202', undefined, undefined],
    },
    // Schemes 2–7 of the same collection, in Scheme 1's shape; a section is seated on one through
    // SCHEMES_OF.Headliner and a nested node reads `s.onScheme[n]`.
    schemes: {
      // Scheme 2, #F8F2E7 — cream: the bio, the repertoire and the form.
      2: {
        palette: ['#F8F2E7', '#F85E34', '#1E1E1E'],
        tags: ['#F85E34', '#3B758B', '#F8A351', '#EEE3D1', '#1E1E1E', '#760000', '#3B758B'],
        sem: {
          box1: '#EEE3D1', box2: '#E6DAC4', box3: '#DCCFB6', glow: '#F85E34',
          activeBg: '#F85E34', activeFg: '#020202',
          inactiveBg: '#EEE3D1', inactiveFg: '#1E1E1E', inactiveLine: '#EEE3D1',
          stroke1: '#1E1E1E', stroke2: '#1E1E1E', hl: '#1E1E1E', text1: '#1E1E1E', text3: '#760000',
          tagFg: ['#020202', undefined, undefined, '#020202', '#EEE3D1', undefined, undefined],
        },
      },
      // Scheme 3, #760000 — maroon: the header, the media and the video.
      3: {
        palette: ['#760000', '#F8A351', '#F8F2E7'],
        tags: ['#F8A351', '#F85E34', '#3B758B', '#1E1E1E', '#1E1E1E', '#48B469', '#F85E34'],
        sem: {
          box1: '#8A0F0F', box2: '#5E0000', box3: '#000000', glow: '#F8A351',
          activeBg: '#F8A351', activeFg: '#020202',
          inactiveBg: '#8A0F0F', inactiveFg: '#F8A351', inactiveLine: '#8A0F0F',
          stroke1: '#760000', stroke2: '#760000', hl: '#F8A351', text1: '#F8A351', text3: '#FBF8F2',
          tagFg: ['#1E1E1E', undefined, undefined, '#EEE3D1', '#EEE3D1', undefined, undefined],
        },
      },
      // Scheme 4, #F8A351 — amber: the calendar.
      4: {
        palette: ['#F8A351', '#F85E34', '#020202'],
        tags: ['#760000', '#F85E34', '#48B469', '#1E1E1E', '#3B758B', '#1E1E1E', '#F8F2E7'],
        sem: {
          box1: '#FAB36E', box2: '#E88F3D', box3: '#D07A2A', glow: '#F85E34',
          activeBg: '#F85E34', activeFg: '#020202',
          inactiveBg: '#FAB36E', inactiveFg: '#020202', inactiveLine: '#FAB36E',
          stroke1: '#020202', stroke2: '#020202', hl: '#020202', text1: '#020202', text3: '#1E1E1E',
          tagFg: ['#F8F2E7', undefined, undefined, '#EEE3D1', '#F8F2E7', undefined, undefined],
        },
      },
      // Scheme 5, #F85E34 — orange: the testimonials.
      5: {
        palette: ['#F85E34', '#F8A351', '#020202'],
        tags: ['#48B469', '#F8A351', '#3B758B', '#1E1E1E', '#F8F2E7', '#1E1E1E', '#760000'],
        sem: {
          box1: '#F97A52', box2: '#E04E25', box3: '#760000', glow: '#F8A351',
          activeBg: '#F8A351', activeFg: '#020202',
          inactiveBg: '#F97A52', inactiveFg: '#020202', inactiveLine: '#F97A52',
          stroke1: '#020202', stroke2: '#020202', hl: '#020202', text1: '#020202', text3: '#1E1E1E',
          tagFg: ['#020202', undefined, undefined, '#F8F2E7', '#1E1E1E', undefined, undefined],
        },
      },
      // Scheme 6, #3B758B — teal: the map.
      6: {
        palette: ['#3B758B', '#48B469', '#F8F2E7'],
        tags: ['#1E1E1E', '#F85E34', '#760000', '#F8F2E7', '#F8A351', '#EEE3D1', '#48B469'],
        sem: {
          box1: '#4A8499', box2: '#2F6075', box3: '#1E1E1E', glow: '#48B469',
          activeBg: '#48B469', activeFg: '#020202',
          inactiveBg: '#4A8499', inactiveFg: '#FBF8F2', inactiveLine: '#4A8499',
          stroke1: '#FBF8F2', stroke2: '#FBF8F2', hl: '#FBF8F2', text1: '#FBF8F2', text3: '#FBF8F2',
          tagFg: ['#EEE3D1', undefined, undefined, '#020202', '#1E1E1E', undefined, undefined],
        },
      },
      // Scheme 7, #1E1E1E — ink: the footer.
      7: {
        palette: ['#1E1E1E', '#F8A351', '#F8F2E7'],
        tags: ['#3B758B', '#F85E34', '#F8A351', '#2B2B2B', '#48B469', '#760000', '#F8F2E7'],
        sem: {
          box1: '#2B2B2B', box2: '#141414', box3: '#000000', glow: '#F8A351',
          activeBg: '#F8A351', activeFg: '#020202',
          inactiveBg: '#2B2B2B', inactiveFg: '#F8A351', inactiveLine: '#2B2B2B',
          stroke1: '#F8F2E7', stroke2: '#F8F2E7', hl: '#F8A351', text1: '#F8A351', text3: '#F85E34',
          tagFg: ['#F8F2E7', undefined, undefined, '#F8F2E7', '#020202', undefined, undefined],
        },
      },
    },
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
// between widths. The footer has one design, so its seat is read off the
// page's design (the header's) where that page's row names a footer, and off
// row 0 otherwise (sectionVm's head).
export const SCHEMES_OF = {
  // Sienna Vale's layout-1 page (964:58612…22), read off each section's
  // `explicitVariableModes`, identical at all three widths.
  Editorial: {
    0: { header: 3, media: 2, repertoire: 3, pricing: 2, form: 3, footer: 3 },
    // Its layout-2 page (964:64598 · 986:15657 · 986:15676). The repertoire
    // and pricing move between widths; media and the calendar are Scheme 2
    // cards on the page's paper, which the root paints round them (`pageBg`).
    1: { media: 2, repertoire: [4, 1, 1], pricing: [3, 1, 1], calendar: 2, form: 4 },
    // Its layout-3 page (964:68717 · 984:16811 · 984:16842), every seat the
    // same at all three widths. The header's frame is Scheme 8, which differs
    // from Scheme 3 only in tags 6 and 7 — seats the two-seat system never
    // reads — so it is seated on 3. The footer is layout 1's tree on taupe
    // here, where layouts 1 and 2 stand it on ink (row 0's 3).
    2: { header: 3, gallery: 2, map: 4, footer: 2 },
    // Its layout-4 page (964:73037 · 971:9537 · 977:13155), every seat the
    // same at all three widths. The footer is layout 1's on ink, row 0's 3,
    // so it has no entry.
    3: { header: 3, bio: 3, media: 2, gallery: 3, repertoire: 3, testimonials: 4 },
  },
  // Pop's layout-1 page (964:58624…34). Its frames bind no colour outside the
  // header, so a seat is the scheme whose ground the section paints, where the
  // census found its inks land too (plans/pop/layout-1.md, decision 4, user
  // call, 2026-10-02): the repertoire, the testimonials and the footer whole
  // but for Pop's own tints, the calendar by its ground and white type alone.
  // The same at all three widths.
  Pop: {
    0: { repertoire: 6, calendar: 4, testimonials: 2, footer: 3 },
    // Its layout-2 page (964:64560 · 986:17562 · 986:17581), whose frames are
    // bound, so these are read off `explicitVariableModes`, the same at all
    // three widths: the media panel (964:64564 · 986:17566 · 986:17585) and the
    // calendar card (964:64574 · 986:17576 · 986:17595) are Scheme 2 cards on
    // the page's white, which the root paints round them (`pageBg`), and the
    // form (964:64576 · 986:17578 · 986:17597) is a Scheme 4 band. The footer
    // keeps row 0's 3.
    1: { media: 2, calendar: 2, form: 4 },
    // Its layout-3 page (964:68750 · 984:15355 · 984:15386), bound too, the
    // same at all three widths but the header. The header's card (964:68751 ·
    // 984:15356 · 984:15387) is Scheme 6 at every width, while its root round
    // the card is Scheme 1 at 1440 and 6 narrow: it is seated on 6, and at
    // desktop the root paints the page's white round the card (`cardOnPage`;
    // plans/pop/layout-3.md, decision 1, user call, 2026-10-06). The calendar
    // (964:68774 · 984:15379 · 984:15410) is a Scheme 2 card on the white, as
    // at layout 2; the gallery (964:68776 · 984:15380 · 984:15411) a Scheme 2
    // sheet and the map (964:68778 · 984:15382 · 984:15413) a Scheme 4 band.
    // The footer's instances set Scheme 2 on a tree that binds nothing, so it
    // keeps row 0's 3.
    2: { header: 6, gallery: 2, map: 4 },
    // Its layout-4 page (964:73127 · 971:10835 · 977:14267), bound, every seat
    // the same at all three widths — Editorial's row 3 in shape. The header
    // (964:73128 · 971:10836 · 977:14268), the bio's Section (964:73129 ·
    // 971:10837 · 977:14269), the gallery's wrapper (964:73173 · 971:10859 ·
    // 977:14537) and the repertoire's Section (964:73215 · 971:10895 ·
    // 977:14574) stand on 3 (pink), the media's band (964:73158 · 971:10845 ·
    // 977:14400) on 2 (lime) and the testimonials (964:73244 · 971:10923 ·
    // 977:14603) on 4 (blue). The footer's instances state no scheme, so it
    // keeps row 0's 3.
    3: { header: 3, bio: 3, media: 2, gallery: 3, repertoire: 3, testimonials: 4 },
  },
  // Lattice's layout-1 page (1:306 · 1:8953 · 1:9934), read off each section's
  // `explicitVariableModes` in the file, the same at all three widths: the
  // bio and the map state Scheme 1 (the theme's own, so no entry); the gallery
  // and the calendar Scheme 2 (#F2F2F2); the testimonials Scheme 5 (orange);
  // and the six dark sections state none, so they resolve the page's Scheme 8
  // (579:2, #111111), as the header's `resolvedVariableModes` shows. `video`
  // has no frame; it is seated on 8 beside the media it follows. Layouts 2–4 of
  // Lattice have no frames yet and are placeholders (plans/lattice/layout-1.md,
  // *Open questions* 2), so they take row 0's seats: the dark and light bands
  // then fall where the page's do, and a header card's whole-page write reads
  // as one page.
  Lattice: {
    0: { header: 8, media: 8, video: 8, repertoire: 8, pricing: 8, form: 8, footer: 8, gallery: 2, calendar: 2, testimonials: 5 },
    1: { header: 8, media: 8, video: 8, repertoire: 8, pricing: 8, form: 8, footer: 8, gallery: 2, calendar: 2, testimonials: 5 },
    2: { header: 8, media: 8, video: 8, repertoire: 8, pricing: 8, form: 8, footer: 8, gallery: 2, calendar: 2, testimonials: 5 },
    3: { header: 8, media: 8, video: 8, repertoire: 8, pricing: 8, form: 8, footer: 8, gallery: 2, calendar: 2, testimonials: 5 },
  },
  // Paperback's layout-1 page (1:2316 · 1:10903 · 1:12137), read off each section's
  // `explicitVariableModes` through the file's "2 · Scheme" collection, the same at all three
  // widths: the header, the gallery and the testimonials state Scheme 1 (the theme's own, so no
  // entry: pale yellow), the map and the footer Scheme 3 (indigo), and the six others state
  // none, so they resolve the page's own Scheme 2 (white; the page frame's mode 187:7), each
  // with its card standing on it (media cyan, repertoire yellow, calendar blush, form indigo +
  // orange: the cards' colours are the scheme's box seats, or a nested node's). `video` has no
  // frame; it is seated beside the media it follows. Layouts 2–4 of Paperback have no frames and
  // are placeholders, so they take row 0's seats.
  Paperback: {
    0: { bio: 2, media: 2, video: 2, repertoire: 2, pricing: 2, calendar: 2, form: 2, map: 3, footer: 3 },
    1: { bio: 2, media: 2, video: 2, repertoire: 2, pricing: 2, calendar: 2, form: 2, map: 3, footer: 3 },
    2: { bio: 2, media: 2, video: 2, repertoire: 2, pricing: 2, calendar: 2, form: 2, map: 3, footer: 3 },
    3: { bio: 2, media: 2, video: 2, repertoire: 2, pricing: 2, calendar: 2, form: 2, map: 3, footer: 3 },
  },
  // Headliner's layout-1 page (1:4478 · 1:15259 · 1:16314), read off each section's node through
  // `resolveForConsumer` and checked against its `fills`, the same at all three widths: the
  // gallery and the pricing stand on Scheme 1 (the theme's own, sand, so no entry), the bio, the
  // repertoire and the form on 2 (cream), the header, the media and the video (which has no frame
  // and stands beside the media) on 3 (maroon), the calendar on 4 (amber), the testimonials on 5
  // (orange), the map on 6 (teal) and the footer on 7 (ink). Layouts 2–4 have no frames yet and are
  // placeholders, so they take row 0's seats, as Lattice's and Paperback's do.
  Headliner: {
    0: { header: 3, media: 3, video: 3, bio: 2, repertoire: 2, form: 2, calendar: 4, testimonials: 5, map: 6, footer: 7 },
    1: { header: 3, media: 3, video: 3, bio: 2, repertoire: 2, form: 2, calendar: 4, testimonials: 5, map: 6, footer: 7 },
    2: { header: 3, media: 3, video: 3, bio: 2, repertoire: 2, form: 2, calendar: 4, testimonials: 5, map: 6, footer: 7 },
    3: { header: 3, media: 3, video: 3, bio: 2, repertoire: 2, form: 2, calendar: 4, testimonials: 5, map: 6, footer: 7 },
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
  { id: 'bio', name: 'Bio', nav: 'About', n: 4 },
  { id: 'media', name: 'Media Player', nav: 'Top Tracks', n: 4 },
  // Layout-bound (plans/video.md, call 1): only the layout-2 and layout-4 Figma
  // pages draw a video, so the picker offers those two (`layoutChoices`), and
  // `noNav` keeps it out of the header's links, which the frames draw the same
  // with or without it (call 5). `n` is the design count: indices 0 and 2 are
  // the holes layouts 1 and 3 leave.
  { id: 'video', name: 'Video', n: 4, noNav: true },
  { id: 'pricing', name: 'Pricing', nav: 'Pricing', n: 4 },
  { id: 'repertoire', name: 'Repertoire', nav: 'Repertoire', n: 4 },
  { id: 'gallery', name: 'Gallery', nav: 'Media', n: 4 },
  { id: 'calendar', name: 'Booking Calendar', nav: 'Availability', n: 4 },
  { id: 'map', name: 'Events Map', nav: 'Shows/Coverage', n: 4 },
  { id: 'testimonials', name: 'Testimonials', nav: 'Reviews', n: 4 },
  { id: 'form', name: 'Enquiry Form', nav: 'Enquiries', n: 4 },
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
  .filter((cat) => cat !== 'header' && cat !== 'footer' && !catById(cat)?.noNav)
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
// Editorial's layouts 2 and 3 draw the three too (964:64599, 986:15658;
// 964:68718, 984:16812), so it joins them. Pop's layout 2 does (964:64561,
// 986:17563), so it joins at `d === 1`, and its layout 3 does (964:68751,
// 984:15356), so at `d === 2` too.
export const navModeDefault = () => 'sections'

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

// Gloock's, at its one weight (400) — Editorial's display and label face,
// standing in for the caps-only Fisterra Fora, so set in caps as well. Read
// off the rendered DOM (spans at 1000px in the loaded face, untracked: Sienna
// Vale states 0), not canvas measureText, which cannot see an unloaded
// webfont. The digits are proportional, so each is listed.
const GLOOCK_EM = {
  A: 0.684, B: 0.657, C: 0.742, D: 0.827, E: 0.606, F: 0.569, G: 0.825, H: 0.805, I: 0.317,
  J: 0.314, K: 0.733, L: 0.569, M: 0.95, N: 0.749, O: 0.878, P: 0.608, Q: 0.872, R: 0.669,
  S: 0.51, T: 0.694, U: 0.745, V: 0.683, W: 1.003, X: 0.707, Y: 0.639, Z: 0.57, 0: 0.657,
  1: 0.326, 2: 0.504, 3: 0.534, 4: 0.601, 5: 0.547, 6: 0.622, 7: 0.505, 8: 0.62, 9: 0.622,
  ' ': 0.215, '&': 0.764, '·': 0.231, '/': 0.253, '-': 0.308, "'": 0.191, '’': 0.221, '‘': 0.221,
  '"': 0.352, '“': 0.416, '”': 0.416, '.': 0.25, ',': 0.22, '!': 0.232, '?': 0.446, ':': 0.23,
  '(': 0.349, ')': 0.349, '+': 0.421, '#': 0.574, '–': 0.454, '—': 0.848,
}

// …and its pair kerning, read off the DOM the same way (a pair's width less
// its two advances; a triple leaves no residual, so it is pairwise). Gloock
// kerns hard — VA is −0.163em — so the advances alone ran up to 8% over a
// measured label (JULY, VALE). Every pair at −0.03em or tighter is kept, and
// every positive one, rounded toward zero: summed with the advances, each of
// 146 seeded labels and words lands 0–2.3% over its measured width ("PEOPLE"
// the most), never under.
const GLOOCK_KERN = {
  'AC': -0.073, 'AG': -0.073, 'AO': -0.073, 'AQ': -0.073, 'AT': -0.113, 'AU': -0.07, 'AV': -0.159,
  'AW': -0.159, 'AY': -0.149, 'BA': -0.037, 'BT': -0.054, 'BV': -0.069, 'BW': -0.069,
  'BY': -0.085, 'B?': -0.03, 'DA': -0.06, 'DM': -0.03, 'DN': -0.032, 'DT': -0.033, 'DV': -0.058,
  'DW': -0.058, 'DX': -0.069, 'DY': -0.088, 'D.': -0.073, 'D,': -0.073, 'FA': -0.107, 'F.': -0.08,
  'F,': -0.08, 'GV': -0.046, 'GW': -0.046, 'GY': -0.048, 'G.': -0.034, 'G,': -0.034, 'HY': -0.045,
  'IY': -0.045, 'KC': -0.092, 'KG': -0.092, 'KO': -0.092, 'KQ': -0.092, 'KU': -0.066,
  'KV': -0.088, 'KW': -0.088, 'KY': -0.11, 'LA': 0.002, 'LT': -0.12, 'LV': -0.124, 'LW': -0.124,
  'LY': -0.126, 'MT': -0.037, 'MV': -0.044, 'MW': -0.044, 'MY': -0.032, 'NC': -0.033,
  'NG': -0.033, 'NO': -0.033, 'NQ': -0.033, 'N’': 0.008, 'OA': -0.06, 'OM': -0.03, 'ON': -0.032,
  'OT': -0.033, 'OV': -0.058, 'OW': -0.058, 'OX': -0.069, 'OY': -0.088, 'O.': -0.073,
  'O,': -0.073, 'PA': -0.115, 'QA': -0.06, 'QM': -0.03, 'QN': -0.032, 'QT': -0.033, 'QV': -0.058,
  'QW': -0.058, 'QX': -0.069, 'QY': -0.088, 'Q.': -0.073, 'Q,': -0.073, 'RC': -0.058,
  'RG': -0.058, 'RO': -0.058, 'RQ': -0.058, 'RT': -0.036, 'RU': -0.057, 'RV': -0.078,
  'RW': -0.078, 'RY': -0.09, 'TA': -0.132, 'TC': -0.033, 'TG': -0.033, 'TO': -0.033, 'TQ': -0.033,
  'TZ': -0.033, 'T.': -0.11, 'T,': -0.11, 'UA': -0.082, 'UB': -0.034, 'UC': -0.041, 'UD': -0.034,
  'UE': -0.034, 'UF': -0.034, 'UG': -0.041, 'UJ': -0.035, 'UK': -0.034, 'UL': -0.034,
  'UM': -0.038, 'UN': -0.03, 'UO': -0.041, 'UP': -0.034, 'UQ': -0.041, 'UR': -0.034, 'UU': -0.032,
  'UV': -0.03, 'UW': -0.03, 'UZ': -0.042, 'VA': -0.163, 'VC': -0.069, 'VG': -0.069, 'VM': -0.033,
  'VO': -0.069, 'VQ': -0.069, 'VT': 0.004, 'V ': -0.05, 'WA': -0.163, 'WC': -0.069, 'WG': -0.069,
  'WM': -0.033, 'WO': -0.069, 'WQ': -0.069, 'WT': 0.004, 'W ': -0.05, 'YA': -0.133, 'YC': -0.085,
  'YG': -0.085, 'YO': -0.085, 'YQ': -0.085, 'YZ': -0.03, 'Y’': 0.018, '0.': -0.04, '0,': -0.04,
  '2)': -0.03, '37': -0.044, '3.': -0.04, '3,': -0.04, '3)': -0.046, '4.': -0.046, '4,': -0.046,
  '4)': -0.03, '5.': -0.04, '5,': -0.04, '5)': -0.05, '6.': -0.034, '6,': -0.034, '70': -0.034,
  '74': -0.103, '76': -0.038, '78': -0.034, '7-': -0.1, '7.': -0.12, '7,': -0.12, '87': -0.038,
  '8.': -0.03, '8,': -0.03, '9.': -0.064, '9,': -0.064, ' V': -0.035, ' W': -0.035, '-2': -0.04,
  '-7': -0.076, '’V': 0.013, '’W': 0.013, '.0': -0.04, '.2': 0.01, '.6': -0.05, '.7': -0.04,
  '.)': -0.03, ',0': -0.04, ',2': 0.01, ',6': -0.05, '? ': -0.035, '(4': -0.046, '(7': -0.03,
}

// A label's width in ems of Gloock, at the token (multiply by `faceK` for
// the set size, as `navFace` does). An accented capital takes its base
// letter's advance, and anything still unlisted takes 0.657, the widest digit.
export const gloockEms = (text) => {
  const chs = [...String(text).toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '')]
  return chs.reduce((w, ch, i) => w + (GLOOCK_EM[ch] ?? 0.657) + (i ? GLOOCK_KERN[chs[i - 1] + ch] ?? 0 : 0), 0)
}

// Titan One's — Pop's display and label face, standing in for Chunko Bold
// Demo, which the frames type in capitals throughout (the face itself draws a
// full lowercase, plans/pop/layout-1.md open question 12), so set in caps as
// well — read off the rendered DOM in the harness (spans at 100px in the
// loaded face, untracked: Pop's mode states 0), not canvas measureText. Titan One kerns a few capital pairs, so the sums
// land on most labels exactly and over on the rest — "AVAILABILITY" by 3.6%,
// "SHOWS/COVERAGE" by 1.3% — never under. The face is set at 0.98 of the
// token (`faced`), so a width in ems of the token is this sum × 0.98, which
// is what sectionVm's `navFace` takes.
const TITAN_EM = {
  A: 0.738, B: 0.705, C: 0.656, D: 0.731, E: 0.61, F: 0.586, G: 0.674, H: 0.727, I: 0.359,
  J: 0.41, K: 0.709, L: 0.544, M: 0.88, N: 0.734, O: 0.756, P: 0.707, Q: 0.746, R: 0.716,
  S: 0.654, T: 0.651, U: 0.726, V: 0.727, W: 1.016, X: 0.721, Y: 0.698, Z: 0.627,
  0: 0.726, 1: 0.453, 2: 0.614, 3: 0.609, 4: 0.618, 5: 0.611, 6: 0.662, 7: 0.539, 8: 0.659, 9: 0.662,
  ' ': 0.225, '&': 0.776, '·': 0.293, '/': 0.418, '-': 0.553, "'": 0.261, '.': 0.293,
  ',': 0.293, '!': 0.332, '?': 0.599, ':': 0.293, '(': 0.45, ')': 0.45, '+': 0.553,
  // The testimonials' quote marks (Pop's layout-1 card fits its quote with
  // this table), read off the DOM the same way.
  '"': 0.522, '“': 0.565, '”': 0.565,
}

// A label's width in ems of Titan One at its own size; anything unlisted takes
// 0.726, the widest digit's advance.
export const titanEms = (text) =>
  [...String(text).toUpperCase()].reduce((w, ch) => w + (TITAN_EM[ch] ?? 0.726), 0)

// Fraunces', at the one instance the page loads (`opsz,wght,SOFT,WONK@144,900,
// 100,1`) — Retro's display face. It is set as typed, so the table keeps both
// cases. Generated by `scripts/ems-table.mjs Fraunces` the way Gloock's was:
// spans at 1000px in the loaded face, untracked (Retro's `dls` is 0), then every
// pair's width less its two advances, kept when it is -0.03em or tighter or any
// positive one, rounded toward zero. Summed, a name lands within 0.5% of its
// measured width, a hair over on most and 0.02% under on two, so a fit that
// reads it carries its own 1% margin (`fitTitleSize`).
const FRAUNCES_EM = {
  0: 0.659, 1: 0.451, 2: 0.608, 3: 0.564, 4: 0.621, 5: 0.572, 6: 0.615, 7: 0.529, 8: 0.621,
  9: 0.623, ' ': 0.172, '!': 0.306, '"': 0.44, '#': 0.64, '&': 0.927, '\'': 0.22, '(': 0.334,
  ')': 0.329, '+': 0.492, ',': 0.288, '-': 0.34, '.': 0.29, '/': 0.439, ':': 0.285, '?': 0.582,
  A: 0.729, B: 0.713, C: 0.666, D: 0.768, E: 0.635, F: 0.599, G: 0.725, H: 0.815, I: 0.406,
  J: 0.545, K: 0.791, L: 0.605, M: 0.934, N: 0.754, O: 0.756, P: 0.694, Q: 0.746, R: 0.754,
  S: 0.594, T: 0.684, U: 0.723, V: 0.726, W: 1.093, X: 0.718, Y: 0.669, Z: 0.61, a: 0.506,
  b: 0.545, c: 0.465, d: 0.547, e: 0.478, f: 0.38, g: 0.511, h: 0.576, i: 0.288, j: 0.278, k: 0.57,
  l: 0.287, m: 0.852, n: 0.577, o: 0.523, p: 0.554, q: 0.534, r: 0.452, s: 0.431, t: 0.366,
  u: 0.553, v: 0.501, w: 0.778, x: 0.527, y: 0.514, z: 0.459, '·': 0.283, '–': 0.503, '—': 0.789,
  '‘': 0.253, '’': 0.254, '“': 0.505, '”': 0.503, 'é': 0.478, 'è': 0.478, 'ê': 0.478, 'ë': 0.478,
  'á': 0.506, 'à': 0.506, 'â': 0.506, 'ä': 0.506, 'í': 0.288, 'ì': 0.288, 'î': 0.288, 'ï': 0.288,
  'ó': 0.523, 'ò': 0.523, 'ô': 0.523, 'ö': 0.523, 'ú': 0.553, 'ù': 0.553, 'û': 0.553, 'ü': 0.553,
  'ñ': 0.577, 'ç': 0.465, 'ß': 0.675, 'ø': 0.523, 'å': 0.506,
}

const FRAUNCES_KERN = {
  '74': -0.05, '\'A': -0.082, '’A': -0.082, 'A\'': -0.057, 'A’': -0.057, 'AT': -0.037,
  'AV': -0.037, 'AW': -0.037, 'AY': -0.037, 'B\'': -0.04, 'B’': -0.04, 'FA': -0.037, 'L\'': -0.089,
  'L’': -0.09, 'TA': -0.037, 'Ta': -0.049, 'Tc': -0.05, 'Td': -0.05, 'Te': -0.049, 'Tg': -0.05,
  'To': -0.05, 'Tq': -0.049, 'VA': -0.037, 'Va': -0.074, 'Vc': -0.075, 'Vd': -0.075, 'Ve': -0.074,
  'Vg': -0.075, 'Vi': -0.049, 'Vm': -0.05, 'Vn': -0.05, 'Vo': -0.075, 'Vp': -0.05, 'Vq': -0.074,
  'Vr': -0.05, 'Vs': -0.049, 'Vu': -0.05, 'WA': -0.037, 'Wa': -0.074, 'Wc': -0.075, 'Wd': -0.075,
  'We': -0.074, 'Wg': -0.075, 'Wi': -0.049, 'Wm': -0.05, 'Wn': -0.05, 'Wo': -0.075, 'Wp': -0.05,
  'Wq': -0.074, 'Wr': -0.05, 'Ws': -0.049, 'Wu': -0.05, 'YA': -0.037, 'Ya': -0.074, 'Yc': -0.074,
  'Yd': -0.075, 'Ye': -0.074, 'Yg': -0.062, 'Yi': -0.049, 'Yj': -0.049, 'Ym': -0.049, 'Yn': -0.05,
  'Yo': -0.074, 'Yp': -0.05, 'Yq': -0.074, 'Yr': -0.05, 'Ys': -0.062, 'Yt': -0.049, 'Yu': -0.049,
  'Yv': -0.049, 'Yw': -0.05, 'Yx': -0.049, 'Yy': -0.05, 'Yz': -0.049, 'aY': -0.05, 'bY': -0.049,
  'cY': -0.05, 'eY': -0.05, 'hY': -0.049, 'iY': -0.05, 'kY': -0.049, 'mY': -0.049, 'nY': -0.05,
  'oY': -0.049, 'pY': -0.05, 'uY': -0.049, 'x\'': -0.035, 'x’': -0.035,
}

// A name's width in ems of Fraunces; accented letters take their base's advance
// (listed), and anything unlisted takes 0.7, a capital's average.
export const frauncesEms = (text) => {
  const chs = [...String(text)]
  return chs.reduce((w, ch, i) => w + (FRAUNCES_EM[ch] ?? 0.7) + (i ? FRAUNCES_KERN[chs[i - 1] + ch] ?? 0 : 0), 0)
}

// Lattice's display face: the `Archivo Lattice` alias (Archivo at wdth 113, wght
// 500, index.css), which stands in for the frames' "Lattice Display Medium".
// Generated by `scripts/ems-table.mjs "Archivo Lattice"` the way Fraunces' was:
// spans at 1000px in the loaded face, untracked, then every pair's width less its
// two advances. The frames type every display string in capitals, so the sum is
// taken over the upper-cased text (the lowercase advances stay for a caller that
// wants them). The face's own tracking (-0.01em) is the caller's.
const LATTICE_EM = {
  0: 0.664, 1: 0.603, 2: 0.659, 3: 0.665, 4: 0.644, 5: 0.664, 6: 0.666, 7: 0.622, 8: 0.671,
  9: 0.666, ' ': 0.269, '!': 0.291, '"': 0.398, '#': 0.66, '&': 0.804, '\'': 0.213, '(': 0.347,
  ')': 0.347, '+': 0.673, ',': 0.292, '-': 0.376, '.': 0.292, '/': 0.301, ':': 0.305, '?': 0.632,
  A: 0.8, B: 0.798, C: 0.841, D: 0.837, E: 0.775, F: 0.701, G: 0.909, H: 0.849, I: 0.305, J: 0.63,
  K: 0.787, L: 0.628, M: 0.976, N: 0.849, O: 0.908, P: 0.762, Q: 0.908, R: 0.82, S: 0.763,
  T: 0.709, U: 0.835, V: 0.756, W: 1.06, X: 0.8, Y: 0.757, Z: 0.733, a: 0.64, b: 0.649, c: 0.623,
  d: 0.649, e: 0.645, f: 0.352, g: 0.646, h: 0.638, i: 0.252, j: 0.25, k: 0.599, l: 0.252,
  m: 0.988, n: 0.638, o: 0.66, p: 0.649, q: 0.649, r: 0.384, s: 0.588, t: 0.368, u: 0.638,
  v: 0.575, w: 0.836, x: 0.597, y: 0.575, z: 0.563, '·': 0.377, '–': 0.565, '—': 1.13, '‘': 0.266,
  '’': 0.266, '“': 0.454, '”': 0.454, 'é': 0.645, 'è': 0.645, 'ê': 0.645, 'ë': 0.645, 'á': 0.64,
  'à': 0.64, 'â': 0.64, 'ä': 0.64, 'í': 0.252, 'ì': 0.252, 'î': 0.252, 'ï': 0.252, 'ó': 0.66,
  'ò': 0.66, 'ô': 0.66, 'ö': 0.66, 'ú': 0.638, 'ù': 0.638, 'û': 0.638, 'ü': 0.638, 'ñ': 0.638,
  'ç': 0.623, 'ß': 0.688, 'ø': 0.66, 'å': 0.64,
}

const LATTICE_KERN = {
  ' Y': -0.061, '\'.': -0.055, '\',': -0.055, '\'A': -0.112, '\'J': -0.099, '’A': -0.112,
  '’c': -0.066, '’d': -0.066, '’e': -0.066, '’g': -0.077, '’o': -0.066, '’q': -0.066, '’s': -0.066,
  '’z': -0.045, '-0': 0.039, '-1': 0.039, '-2': 0.039, '-3': 0.039, '-4': 0.039, '-5': 0.039,
  '-6': 0.039, '-V': -0.065, '-W': -0.065, '-X': -0.059, '-Y': -0.157, '-x': -0.035, '0-': 0.039,
  '1-': 0.039, '3-': 0.039, '4-': 0.039, '5-': 0.039, '7.': -0.13, '7,': -0.13, '7-': -0.04,
  '9-': 0.04, 'A\'': -0.112, 'A?': -0.035, 'AT': -0.11, 'AV': -0.044, 'AW': -0.045, 'AY': -0.093,
  'Ay': -0.032, 'D.': -0.032, 'D,': -0.032, 'DX': -0.043, 'F ': -0.032, 'F.': -0.06, 'F,': -0.06,
  'FA': -0.062, 'FJ': -0.081, 'FX': -0.032, 'FZ': -0.039, 'Fa': -0.035, 'Fc': -0.035, 'Fd': -0.035,
  'Fe': -0.035, 'Fo': -0.035, 'Fq': -0.035, 'K ': -0.043, 'K-': -0.069, 'KA': -0.055, 'KC': -0.063,
  'KG': -0.063, 'KJ': -0.039, 'KO': -0.063, 'KQ': -0.063, 'KT': -0.035, 'KV': -0.053, 'KW': -0.053,
  'KY': -0.053, 'Ka': -0.041, 'Kc': -0.041, 'Kd': -0.041, 'Ke': -0.041, 'Ko': -0.041, 'Kq': -0.041,
  'Ku': -0.041, 'Kv': -0.051, 'Kw': -0.051, 'Ky': -0.051, 'L\'': -0.131, 'L’': -0.131,
  'L-': -0.063, 'L?': -0.06, 'LC': -0.04, 'LG': -0.04, 'LO': -0.04, 'LQ': -0.04, 'LT': -0.124,
  'LU': -0.037, 'LV': -0.101, 'LW': -0.101, 'LX': -0.184, 'LY': -0.15, 'Lv': -0.04, 'Lw': -0.04,
  'Ly': -0.04, 'O.': -0.032, 'O,': -0.032, 'OX': -0.043, 'P ': -0.046, 'P.': -0.09, 'P,': -0.09,
  'PA': -0.06, 'PJ': -0.075, 'PX': -0.044, 'PZ': -0.03, 'Q.': -0.032, 'Q,': -0.032, 'QX': -0.043,
  'RJ': -0.035, 'SY': -0.037, 'T.': -0.05, 'T,': -0.05, 'TA': -0.11, 'TJ': -0.123, 'Ta': -0.09,
  'Tc': -0.09, 'Td': -0.09, 'Te': -0.09, 'Tm': -0.07, 'Tn': -0.07, 'To': -0.09, 'Tp': -0.07,
  'Tq': -0.09, 'Tr': -0.069, 'Ts': -0.09, 'Tt': -0.04, 'Tu': -0.07, 'Tv': -0.032, 'Tw': -0.032,
  'Tx': -0.032, 'Ty': -0.032, 'Tz': -0.032, 'V.': -0.172, 'V,': -0.172, 'V-': -0.065, 'VA': -0.044,
  'VJ': -0.096, 'Va': -0.052, 'Vc': -0.052, 'Vd': -0.052, 'Ve': -0.052, 'Vo': -0.052, 'Vq': -0.052,
  'Vs': -0.042, 'Vu': -0.042, 'Vx': -0.03, 'Vz': -0.035, 'W.': -0.172, 'W,': -0.172, 'W-': -0.065,
  'WA': -0.045, 'WJ': -0.096, 'Wa': -0.052, 'Wc': -0.052, 'Wd': -0.052, 'We': -0.052, 'Wo': -0.052,
  'Wq': -0.052, 'Ws': -0.042, 'Wu': -0.042, 'Wx': -0.03, 'Wz': -0.035, 'X-': -0.059, 'XC': -0.043,
  'XG': -0.043, 'XO': -0.043, 'XQ': -0.043, 'XY': -0.03, 'Xc': -0.037, 'Xd': -0.037, 'Xe': -0.037,
  'Xo': -0.037, 'Xq': -0.037, 'Xs': -0.032, 'Xt': -0.062, 'Xu': -0.03, 'Xv': -0.05, 'Xw': -0.05,
  'Xx': -0.05, 'Xy': -0.05, 'Y ': -0.061, 'Y.': -0.217, 'Y,': -0.217, 'Y-': -0.157, 'YA': -0.093,
  'YJ': -0.159, 'YS': -0.037, 'YX': -0.03, 'Ya': -0.117, 'Yc': -0.117, 'Yd': -0.117, 'Ye': -0.117,
  'Yf': -0.063, 'Yg': -0.104, 'Ym': -0.083, 'Yn': -0.083, 'Yo': -0.117, 'Yp': -0.083, 'Yq': -0.117,
  'Yr': -0.083, 'Ys': -0.105, 'Yt': -0.053, 'Yu': -0.082, 'Yv': -0.052, 'Yw': -0.052, 'Yx': -0.062,
  'Yz': -0.07, 'Z-': -0.088, 'bx': -0.03, 'f.': -0.068, 'f,': -0.068, 'ff': -0.035, 'k ': -0.035,
  'k-': -0.065, 'kc': -0.037, 'kd': -0.037, 'ke': -0.037, 'ko': -0.037, 'kq': -0.037, 'kx': -0.038,
  'ox': -0.03, 'px': -0.03, 'r.': -0.103, 'r,': -0.103, 'v.': -0.13, 'v,': -0.13, 'w.': -0.13,
  'w,': -0.13, 'x-': -0.035, 'xc': -0.03, 'xd': -0.03, 'xe': -0.03, 'xo': -0.03, 'xq': -0.03,
  'y.': -0.13, 'y,': -0.13,
}

// A string's width in ems of the Lattice display face at its own size, in capitals.
export const latticeEms = (text) => {
  const chs = [...String(text).toUpperCase()]
  return chs.reduce((w, ch, i) => w + (LATTICE_EM[ch] ?? 0.8) + (i ? LATTICE_KERN[chs[i - 1] + ch] ?? 0 : 0), 0)
}

// Paperback's display face: Bricolage Grotesque ExtraBold (800), the frames' `font/display`.
// Generated by `WEIGHT=800 node scripts/ems-table.mjs "Bricolage Grotesque" --check` the way
// Fraunces' and Lattice's were (spans at 1000px in the loaded face, untracked, optical size at its
// 96 ceiling; the sums land within 1% of the DOM at 113px, `Kai Mercer` 0.42% over). The frames
// type the header's name at -0.035em, which is the caller's (`titleFitK`'s face), and set display
// strings in mixed case, so the sum is over the text as typed.
const BRICOLAGE_EM = {
  0: 0.594, 1: 0.31, 2: 0.551, 3: 0.565, 4: 0.607, 5: 0.565, 6: 0.592, 7: 0.498, 8: 0.608,
  9: 0.603, ' ': 0.203, '!': 0.268, '"': 0.34, '#': 0.613, '&': 0.697, '\'': 0.174, '(': 0.303,
  ')': 0.303, '+': 0.486, ',': 0.193, '-': 0.313, '.': 0.246, '/': 0.349, ':': 0.25, '?': 0.396,
  A: 0.659, B: 0.608, C: 0.631, D: 0.621, E: 0.54, F: 0.51, G: 0.649, H: 0.637, I: 0.243, J: 0.323,
  K: 0.623, L: 0.46, M: 0.822, N: 0.694, O: 0.661, P: 0.586, Q: 0.659, R: 0.615, S: 0.585,
  T: 0.516, U: 0.627, V: 0.632, W: 0.915, X: 0.623, Y: 0.595, Z: 0.55, a: 0.543, b: 0.576,
  c: 0.539, d: 0.576, e: 0.537, f: 0.376, g: 0.549, h: 0.562, i: 0.234, j: 0.244, k: 0.541,
  l: 0.234, m: 0.86, n: 0.562, o: 0.567, p: 0.574, q: 0.574, r: 0.4, s: 0.517, t: 0.368, u: 0.557,
  v: 0.53, w: 0.799, x: 0.543, y: 0.539, z: 0.483, '·': 0.246, '–': 0.5, '—': 0.775, '‘': 0.193,
  '’': 0.193, '“': 0.382, '”': 0.382, 'é': 0.537, 'è': 0.537, 'ê': 0.537, 'ë': 0.537, 'á': 0.543,
  'à': 0.543, 'â': 0.543, 'ä': 0.543, 'í': 0.234, 'ì': 0.252, 'î': 0.234, 'ï': 0.234, 'ó': 0.567,
  'ò': 0.567, 'ô': 0.567, 'ö': 0.567, 'ú': 0.557, 'ù': 0.557, 'û': 0.557, 'ü': 0.557, 'ñ': 0.562,
  'ç': 0.539, 'ß': 0.638, 'ø': 0.567, 'å': 0.543,
}

const BRICOLAGE_KERN = {
  '41': -0.046, '47': -0.044, '74': -0.084, '\'.': -0.053, '\',': -0.074, '\'-': -0.082,
  '\'&': -0.062, '\'4': -0.072, '\'A': -0.086, '\'J': -0.056, '\'a': -0.031, '\'c': -0.035,
  '\'e': -0.035, '\'o': -0.034, '’.': -0.065, '’,': -0.095, '’-': -0.085, '’4': -0.092,
  '’A': -0.096, '’J': -0.053, '’a': -0.054, '’c': -0.06, '’d': -0.049, '’e': -0.06, '’g': -0.049,
  '’o': -0.056, '’q': -0.049, '’s': -0.039, '.\'': -0.054, '.’': -0.046, '.1': -0.04, '.7': -0.037,
  '.T': -0.079, '.V': -0.081, '.W': -0.052, '.Y': -0.11, '.v': -0.055, '.w': -0.046, ',\'': -0.074,
  ',’': -0.094, ',1': -0.041, ',7': -0.037, '-\'': -0.082, '-’': -0.084, '-1': -0.046,
  '-7': -0.068, '-J': -0.047, '-T': -0.091, '-V': -0.055, '-W': -0.03, '-X': -0.062, '-Y': -0.082,
  '-x': -0.062, '!G': -0.03, '?.': -0.061, '?,': -0.065, '?-': -0.037, '?A': -0.078, '?J': -0.064,
  '&\'': -0.086, '&’': -0.093, '&1': -0.054, '&7': -0.055, '&T': -0.101, '&V': -0.07, '&W': -0.047,
  '&Y': -0.104, '&v': -0.035, '&w': -0.03, '0A': -0.037, '0V': -0.032, '0X': -0.059, '0Y': -0.053,
  '2Y': -0.031, '4\'': -0.045, '4’': -0.043, '4T': -0.048, '4V': -0.047, '4W': -0.046,
  '4X': -0.042, '4Y': -0.052, '4f': -0.035, '4v': -0.044, '4w': -0.035, '4x': -0.041, '6V': -0.032,
  '6X': -0.039, '6Y': -0.045, '7.': -0.105, '7,': -0.096, '7-': -0.069, '7&': -0.07, '7A': -0.092,
  '7J': -0.06, '7a': -0.065, '7c': -0.07, '7d': -0.051, '7e': -0.07, '7g': -0.058, '7o': -0.068,
  '7q': -0.051, '7s': -0.045, '8V': -0.03, '8X': -0.031, '8Y': -0.037, '9A': -0.036, '9V': -0.031,
  '9X': -0.058, '9Y': -0.054, 'A\'': -0.086, 'A’': -0.07, 'A0': -0.035, 'A1': -0.05, 'A6': -0.035,
  'A7': -0.044, 'AC': -0.039, 'AG': -0.038, 'AO': -0.038, 'AQ': -0.035, 'AT': -0.088, 'AU': -0.035,
  'AV': -0.109, 'AW': -0.074, 'AY': -0.119, 'Ac': -0.031, 'Ae': -0.031, 'Af': -0.034, 'Ao': -0.03,
  'At': -0.044, 'Av': -0.086, 'Aw': -0.066, 'BV': -0.03, 'BY': -0.039, 'CX': -0.038, 'CY': -0.038,
  'D,': -0.03, 'DA': -0.038, 'DV': -0.035, 'DX': -0.068, 'DY': -0.056, 'F.': -0.074, 'F,': -0.096,
  'F&': -0.041, 'FA': -0.064, 'FJ': -0.068, 'Fa': -0.038, 'Fg': -0.031, 'GV': -0.031, 'GY': -0.048,
  'K0': -0.039, 'K6': -0.039, 'KC': -0.042, 'KG': -0.042, 'KO': -0.042, 'Kc': -0.035, 'Kd': -0.031,
  'Ke': -0.035, 'Ko': -0.036, 'Kq': -0.031, 'Kw': -0.031, 'L\'': -0.086, 'L’': -0.095,
  'L-': -0.049, 'L1': -0.044, 'L7': -0.039, 'LT': -0.108, 'LV': -0.097, 'LW': -0.056, 'LY': -0.119,
  'Lv': -0.065, 'Lw': -0.047, 'O,': -0.03, 'OA': -0.039, 'OV': -0.035, 'OX': -0.064, 'OY': -0.052,
  'P.': -0.093, 'P,': -0.095, 'P&': -0.054, 'PA': -0.069, 'PJ': -0.063, 'PX': -0.043, 'PY': -0.031,
  'QA': -0.033, 'QV': -0.035, 'QY': -0.052, 'Qj': 0.031, 'RY': -0.042, 'SX': -0.03, 'SY': -0.042,
  'T.': -0.079, 'T,': -0.082, 'T-': -0.091, 'T&': -0.071, 'T4': -0.092, 'TA': -0.088, 'TJ': -0.063,
  'Ta': -0.07, 'Tc': -0.076, 'Td': -0.061, 'Te': -0.076, 'Tg': -0.07, 'To': -0.074, 'Tq': -0.061,
  'Ts': -0.06, 'UA': -0.035, 'V.': -0.081, 'V,': -0.082, 'V-': -0.054, 'V&': -0.084, 'V0': -0.034,
  'V4': -0.069, 'V6': -0.034, 'V8': -0.03, 'VA': -0.109, 'VC': -0.035, 'VG': -0.037, 'VJ': -0.059,
  'VO': -0.036, 'VQ': -0.036, 'Va': -0.068, 'Vc': -0.062, 'Vd': -0.056, 'Ve': -0.062, 'Vg': -0.056,
  'Vm': -0.03, 'Vn': -0.03, 'Vo': -0.061, 'Vp': -0.03, 'Vq': -0.056, 'Vr': -0.03, 'Vs': -0.048,
  'W.': -0.052, 'W,': -0.051, 'W-': -0.03, 'W&': -0.059, 'W4': -0.04, 'WA': -0.074, 'WJ': -0.054,
  'Wa': -0.046, 'Wc': -0.038, 'Wd': -0.031, 'We': -0.038, 'Wg': -0.036, 'Wo': -0.036, 'Wq': -0.031,
  'Ws': -0.031, 'X-': -0.063, 'X0': -0.063, 'X4': -0.034, 'X6': -0.063, 'X8': -0.031, 'X9': -0.036,
  'XC': -0.068, 'XG': -0.066, 'XO': -0.066, 'XS': -0.034, 'Xc': -0.055, 'Xd': -0.051, 'Xe': -0.055,
  'Xo': -0.058, 'Xq': -0.051, 'Xs': -0.037, 'Xt': -0.038, 'Xu': -0.038, 'Xv': -0.04, 'Xw': -0.044,
  'Y.': -0.109, 'Y,': -0.096, 'Y-': -0.082, 'Y&': -0.097, 'Y0': -0.053, 'Y4': -0.102, 'Y6': -0.053,
  'Y8': -0.039, 'Y9': -0.034, 'YA': -0.119, 'YC': -0.054, 'YG': -0.058, 'YJ': -0.062, 'YO': -0.054,
  'YQ': -0.054, 'YS': -0.032, 'Ya': -0.093, 'Yc': -0.091, 'Yd': -0.081, 'Ye': -0.091, 'Yg': -0.085,
  'Ym': -0.047, 'Yn': -0.048, 'Yo': -0.088, 'Yp': -0.047, 'Yq': -0.081, 'Yr': -0.048, 'Ys': -0.077,
  'Yu': -0.043, 'Yx': -0.031, 'Yy': -0.041, 'Yz': -0.039, 'Z-': -0.049, 'a1': -0.03, 'a7': -0.059,
  'aT': -0.067, 'aV': -0.06, 'aW': -0.039, 'aY': -0.085, 'b7': -0.063, 'bT': -0.061, 'bV': -0.056,
  'bW': -0.031, 'bX': -0.049, 'bY': -0.081, 'bx': -0.038, 'c7': -0.052, 'cT': -0.062, 'cV': -0.054,
  'cW': -0.035, 'cX': -0.034, 'cY': -0.081, 'cx': -0.03, 'e7': -0.062, 'eT': -0.067, 'eV': -0.056,
  'eW': -0.036, 'eX': -0.033, 'eY': -0.085, 'ex': -0.03, 'f.': -0.059, 'f,': -0.054, 'f&': -0.06,
  'fA': -0.062, 'fJ': -0.063, 'gY': -0.041, 'h7': -0.048, 'hT': -0.057, 'hV': -0.055, 'hW': -0.035,
  'hY': -0.08, 'kY': -0.035, 'm7': -0.047, 'mT': -0.057, 'mV': -0.054, 'mW': -0.035, 'mY': -0.08,
  'n7': -0.048, 'nT': -0.057, 'nV': -0.055, 'nW': -0.035, 'nY': -0.08, 'o\'': -0.033, 'o1': -0.031,
  'o7': -0.069, 'oA': -0.03, 'oT': -0.074, 'oV': -0.061, 'oW': -0.036, 'oX': -0.058, 'oY': -0.088,
  'ov': -0.03, 'ox': -0.049, 'p7': -0.063, 'pT': -0.061, 'pV': -0.056, 'pW': -0.031, 'pX': -0.049,
  'pY': -0.081, 'px': -0.038, 'qV': -0.03, 'qY': -0.047, 'r.': -0.094, 'r,': -0.096, 'r&': -0.066,
  'r4': -0.038, 'rA': -0.071, 'rJ': -0.068, 'rX': -0.048, 'rY': -0.031, 's7': -0.051, 'sT': -0.062,
  'sV': -0.058, 'sW': -0.04, 'sY': -0.085, 't-': -0.041, 'tY': -0.037, 'uV': -0.03, 'uY': -0.047,
  'v.': -0.055, 'v,': -0.056, 'v&': -0.053, 'v4': -0.034, 'vA': -0.086, 'vJ': -0.061, 'vX': -0.04,
  'va': -0.032, 'vc': -0.03, 've': -0.03, 'vo': -0.03, 'w.': -0.045, 'w,': -0.043, 'w&': -0.042,
  'wA': -0.066, 'wJ': -0.045, 'wX': -0.043, 'x-': -0.059, 'x4': -0.039, 'xY': -0.031, 'xc': -0.051,
  'xd': -0.038, 'xe': -0.048, 'xo': -0.049, 'xq': -0.038, 'xs': -0.03, 'yY': -0.045, 'zY': -0.037,
}

// A string's width in ems of Bricolage Grotesque ExtraBold at its own size, untracked; anything
// unlisted takes 0.6, a capital's average.
export const bricolageEms = (text) => {
  const chs = [...String(text)]
  return chs.reduce((w, ch, i) => w + (BRICOLAGE_EM[ch] ?? 0.6) + (i ? BRICOLAGE_KERN[chs[i - 1] + ch] ?? 0 : 0), 0)
}

/* ------------------------------------------------------------------ *
 * Lattice's dot field (plans/lattice/layout-1.md, *Settled in section 1*).
 * The frames lay a dot canvas of the hero's own size over the photograph: 560
 * dots at 1440 x 750, 831 at 768 x 750 (a CROP at 0.6703, so 483 show) and 436 at
 * 390 x 750. It is NOT a regular lattice under a shear: the rows bow (the pitch
 * runs 106 to 114 along one row, the step 0.7 to 2.4), so each width is its own
 * set of centroids, read off the frame's 2x raster (connected components,
 * alpha-weighted) with the tablet's crop baked in. `p` is a path of
 * zero-length subpaths in quarter-pixel units (viewBox w x 4 by 3000), `r` the
 * stroke radius in css px and `o` the opacity; four buckets by dot area. Checked
 * against the rasters at 2x: ink mass 1.00 / 0.98 / 1.00, 8-px block correlation
 * .977 / .961 / .973.
 * ------------------------------------------------------------------ */
const LATTICE_DOTS = {
  desktop: { w: 1440, b: [
    { r: 0.9, o: 0.64, p: 'M1200 1h0M2371 1141h0M2171 1145h0M1971 1149h0M2775 1282h0M2974 1281h0M2576 1283h0M2377 1286h0M2179 1289h0M1980 1293h0M1781 1298h0M1582 1305h0M2580 1428h0M2779 1427h0M2977 1426h0M3176 1427h0M2383 1430h0M2185 1433h0M1987 1438h0M1789 1443h0M1590 1450h0M1391 1457h0M2781 1572h0M2979 1572h0M2584 1573h0M3177 1573h0M2387 1575h0M3376 1576h0M2189 1578h0M1992 1583h0M1795 1588h0M1597 1595h0M1399 1603h0M1200 1612h0M2783 1717h0M2981 1718h0M2586 1718h0M3178 1720h0M2390 1720h0M2193 1723h0M3377 1723h0M1996 1728h0M1799 1734h0M1602 1741h0M1404 1749h0M1206 1759h0M1007 1770h0M1 1846h0M2588 1864h0M2785 1863h0M2391 1866h0M2982 1864h0M3179 1866h0M2195 1869h0M3377 1870h0M1999 1874h0M3576 1875h0M1802 1880h0M1605 1887h0M1408 1896h0M1210 1906h0M1012 1918h0M2785 2010h0M2392 2012h0M2589 2010h0M2982 2011h0M3179 2014h0M2196 2015h0M3377 2018h0M2000 2020h0M3576 2024h0M1803 2026h0M1607 2034h0M1410 2043h0M1212 2053h0M1014 2066h0M2588 2157h0M2785 2157h0M2392 2159h0M2982 2159h0M2196 2162h0M3179 2162h0M1999 2167h0M3377 2167h0M1803 2173h0M1606 2181h0M1409 2190h0M1212 2201h0M1014 2214h0M2587 2305h0M2784 2305h0M2390 2306h0M2981 2307h0M2194 2309h0M3179 2311h0M1998 2314h0M3377 2316h0M1801 2321h0M1604 2329h0M1407 2339h0M1210 2350h0M1012 2363h0M2585 2453h0M2782 2454h0M2388 2455h0M2191 2458h0M2980 2456h0M3178 2460h0M1994 2463h0M3376 2466h0M1797 2469h0M1600 2478h0M1403 2488h0M1205 2500h0M2582 2603h0M2780 2604h0M2384 2604h0M2187 2607h0M2978 2606h0M1990 2612h0M3176 2611h0M1792 2619h0M1595 2627h0M1397 2638h0M1199 2650h0M2578 2754h0M2380 2755h0M2776 2755h0M2181 2758h0M2975 2758h0M1983 2762h0M0 2766h0M1785 2769h0M1587 2778h0M2573 2906h0M2374 2907h0M2175 2909h0M1976 2914h0M1777 2921h0M1578 2929h0' },
    { r: 0.93, o: 0.66, p: 'M2549 705h0M2345 708h0M2141 711h0M1937 715h0M2962 846h0M3166 845h0M2759 848h0M2557 850h0M2355 853h0M2152 856h0M1950 860h0M1747 864h0M1544 870h0M1341 875h0M2967 991h0M3169 991h0M3372 991h0M3575 992h0M2765 992h0M2564 994h0M2363 997h0M2162 1000h0M1961 1004h0M1760 1009h0M1559 1015h0M1357 1021h0M1154 1028h0M951 1035h0M3172 1136h0M2771 1137h0M2971 1136h0M3373 1137h0M2571 1139h0M3575 1139h0M3778 1141h0M1771 1154h0M1571 1159h0M1370 1166h0M1169 1174h0M967 1182h0M764 1191h0M3174 1282h0M3374 1283h0M3575 1285h0M3777 1289h0M3980 1293h0M1382 1312h0M1182 1320h0M981 1329h0M779 1339h0M576 1350h0M3375 1429h0M3575 1432h0M3776 1436h0M3978 1442h0M1192 1466h0M992 1476h0M791 1486h0M589 1498h0M3575 1579h0M3776 1584h0M3977 1591h0M4179 1598h0M1001 1623h0M801 1634h0M599 1647h0M397 1661h0M3576 1727h0M3775 1733h0M3976 1740h0M4178 1748h0M808 1782h0M607 1796h0M406 1811h0M3775 1882h0M3975 1890h0M4177 1899h0M813 1931h0M613 1945h0M412 1961h0M3775 2031h0M3975 2040h0M4176 2050h0M815 2079h0M615 2095h0M415 2112h0M3576 2173h0M3775 2181h0M3975 2191h0M4176 2202h0M815 2229h0M616 2245h0M415 2263h0M214 2283h0M3576 2323h0M3775 2332h0M3976 2342h0M4177 2355h0M813 2379h0M614 2395h0M413 2414h0M3575 2474h0M3775 2483h0M3976 2495h0M4178 2508h0M1007 2513h0M809 2529h0M609 2547h0M409 2566h0M208 2588h0M3376 2617h0M3575 2626h0M3776 2636h0M3977 2648h0M4180 2663h0M1001 2664h0M802 2680h0M602 2699h0M402 2719h0M3175 2763h0M3375 2770h0M3575 2779h0M1389 2788h0M3777 2790h0M1190 2801h0M3979 2803h0M992 2816h0M792 2833h0M592 2851h0M392 2872h0M2772 2907h0M2972 2911h0M3173 2916h0M3374 2923h0M3575 2933h0M1379 2940h0M3777 2945h0M1180 2953h0M980 2968h0M780 2985h0' },
    { r: 0.96, o: 0.69, p: 'M2938 263h0M2727 267h0M2517 270h0M2307 273h0M2097 277h0M1887 280h0M1677 284h0M1467 288h0M3363 405h0M3154 407h0M2945 410h0M2737 412h0M2528 415h0M2321 419h0M2113 422h0M1905 426h0M1697 430h0M1489 434h0M1281 438h0M1072 443h0M863 448h0M3783 550h0M3366 552h0M3574 551h0M3158 553h0M2951 555h0M2745 558h0M2539 561h0M2333 563h0M2127 567h0M1922 571h0M1716 575h0M1510 579h0M1303 584h0M1096 590h0M889 595h0M680 601h0M471 608h0M3574 698h0M3782 698h0M3162 699h0M3368 698h0M3990 698h0M2957 701h0M2753 703h0M1733 720h0M1528 725h0M1323 730h0M1118 736h0M912 742h0M705 749h0M497 756h0M288 764h0M3370 845h0M3575 845h0M3780 846h0M3987 847h0M4195 849h0M4404 852h0M1137 882h0M933 889h0M727 897h0M521 905h0M314 914h0M105 923h0M3779 993h0M3984 996h0M4191 999h0M4398 1003h0M747 1044h0M542 1053h0M336 1063h0M129 1074h0M3982 1144h0M4187 1149h0M4393 1154h0M4601 1160h0M560 1201h0M355 1213h0M149 1225h0M4184 1298h0M4389 1305h0M4595 1312h0M372 1362h0M167 1375h0M4181 1448h0M4385 1456h0M4591 1464h0M4798 1475h0M386 1512h0M182 1526h0M4383 1607h0M4587 1617h0M4794 1628h0M194 1677h0M4381 1758h0M4585 1770h0M4791 1782h0M4998 1797h0M203 1828h0M4379 1910h0M4583 1923h0M4788 1937h0M4995 1953h0M210 1979h0M6 1998h0M4379 2062h0M4582 2076h0M4787 2092h0M4994 2109h0M213 2131h0M10 2151h0M4379 2215h0M4582 2230h0M4787 2247h0M4994 2266h0M12 2304h0M4380 2369h0M4583 2385h0M4788 2403h0M4995 2424h0M212 2435h0M10 2458h0M4381 2523h0M4585 2541h0M4791 2560h0M4997 2582h0M6 2611h0M4383 2679h0M4588 2697h0M4794 2718h0M200 2741h0M4182 2818h0M4386 2835h0M4591 2855h0M4798 2877h0M190 2895h0M3981 2959h0M4185 2975h0M4390 2993h0' },
    { r: 1.01, o: 0.75, p: 'M984 2h0M768 5h0M551 8h0M333 11h0M115 14h0M5568 75h0M5340 79h0M5113 82h0M4889 86h0M4666 89h0M4445 93h0M4225 96h0M4007 99h0M3789 103h0M3573 106h0M3358 110h0M3143 113h0M2930 117h0M2717 120h0M2504 124h0M2291 127h0M2079 131h0M1867 135h0M1655 138h0M1442 142h0M1229 146h0M1016 149h0M802 153h0M588 157h0M373 161h0M156 165h0M5545 237h0M5319 238h0M5096 240h0M4874 241h0M4653 243h0M4435 245h0M4218 248h0M4002 250h0M3787 252h0M3573 255h0M3361 258h0M3149 261h0M1256 292h0M1045 296h0M834 301h0M621 305h0M408 310h0M194 315h0M4426 398h0M4642 397h0M4860 397h0M5079 397h0M5301 397h0M5524 397h0M5750 398h0M3997 400h0M4211 399h0M3785 401h0M3574 403h0M652 453h0M441 459h0M229 465h0M15 471h0M3993 549h0M4205 549h0M4418 549h0M4632 550h0M4847 551h0M5065 553h0M5284 555h0M5505 557h0M5729 560h0M260 615h0M48 622h0M4199 699h0M4410 701h0M4622 703h0M4836 706h0M5051 709h0M5269 713h0M5488 717h0M5710 722h0M78 773h0M4614 855h0M4826 860h0M5040 865h0M5255 870h0M5473 877h0M5693 884h0M4607 1008h0M4817 1013h0M5029 1020h0M5243 1027h0M5459 1036h0M5678 1045h0M4810 1167h0M5021 1175h0M5233 1185h0M5448 1195h0M5665 1206h0M4803 1321h0M5013 1331h0M5224 1341h0M5438 1353h0M5653 1367h0M5007 1486h0M5217 1498h0M5429 1513h0M5644 1528h0M5001 1641h0M5211 1655h0M5423 1671h0M5636 1689h0M5207 1813h0M5417 1831h0M5630 1850h0M5204 1971h0M5414 1990h0M5626 2011h0M5202 2129h0M5412 2150h0M5624 2173h0M5202 2287h0M5412 2310h0M5623 2335h0M5203 2446h0M5413 2471h0M5624 2497h0M5206 2606h0M5416 2632h0M5627 2661h0M5001 2741h0M5210 2767h0M5420 2794h0M5632 2825h0M5006 2901h0M5215 2928h0M5426 2957h0M5638 2989h0' },
  ] },
  tablet: { w: 768, b: [
    { r: 1.29, o: 0.64, p: 'M1151 1327h0M1309 1326h0M993 1329h0M835 1331h0M677 1335h0M519 1339h0M1155 1442h0M1312 1441h0M1470 1441h0M1628 1441h0M997 1444h0M840 1446h0M682 1450h0M525 1454h0M367 1459h0M209 1465h0M1315 1556h0M1472 1557h0M1001 1559h0M1157 1557h0M1630 1558h0M1788 1560h0M844 1561h0M687 1565h0M530 1570h0M372 1575h0M215 1581h0M57 1589h0M1159 1673h0M1316 1672h0M1473 1673h0M1003 1674h0M1630 1674h0M846 1677h0M1788 1677h0M690 1681h0M533 1685h0M376 1691h0M219 1698h0M62 1705h0M1161 1789h0M1317 1788h0M1474 1789h0M1004 1790h0M1631 1791h0M848 1793h0M1789 1794h0M692 1796h0M536 1801h0M379 1807h0M222 1814h0M65 1822h0M1161 1905h0M1318 1905h0M1005 1907h0M1474 1906h0M1631 1908h0M849 1909h0M1789 1911h0M693 1913h0M537 1918h0M380 1924h0M223 1931h0M66 1940h0M1161 2022h0M1317 2022h0M1005 2023h0M1474 2023h0M849 2026h0M1631 2026h0M693 2030h0M1789 2030h0M536 2035h0M380 2041h0M223 2048h0M66 2057h0M1004 2141h0M1160 2140h0M1317 2140h0M1473 2141h0M847 2143h0M1631 2144h0M691 2147h0M1788 2148h0M535 2152h0M378 2159h0M221 2166h0M64 2176h0M1002 2259h0M1158 2258h0M1315 2258h0M1472 2260h0M845 2261h0M1630 2263h0M688 2265h0M1788 2268h0M532 2270h0M375 2277h0M218 2285h0M61 2295h0M1156 2377h0M842 2380h0M999 2378h0M1313 2378h0M1471 2380h0M685 2384h0M1629 2383h0M528 2389h0M371 2396h0M213 2404h0M995 2498h0M1153 2497h0M1311 2498h0M837 2500h0M680 2504h0M522 2509h0M365 2516h0M990 2618h0M1307 2619h0M832 2620h0M674 2624h0' },
    { r: 1.32, o: 0.66, p: 'M967 869h0M1297 980h0M1459 979h0M1136 982h0M814 987h0M975 984h0M653 990h0M492 994h0M330 998h0M1623 1094h0M1784 1094h0M1142 1097h0M1302 1095h0M1462 1094h0M982 1099h0M822 1102h0M662 1105h0M502 1109h0M342 1113h0M181 1118h0M20 1124h0M1306 1210h0M1465 1210h0M1625 1210h0M1785 1210h0M1147 1212h0M1946 1212h0M829 1216h0M988 1214h0M670 1220h0M511 1224h0M352 1228h0M192 1234h0M32 1240h0M1468 1325h0M1627 1326h0M1786 1327h0M1946 1329h0M2107 1331h0M360 1344h0M201 1349h0M42 1356h0M1787 1443h0M1946 1445h0M2106 1449h0M50 1472h0M1946 1563h0M2106 1567h0M2266 1571h0M1947 1680h0M2105 1684h0M2265 1690h0M2426 1697h0M1947 1798h0M2105 1803h0M2265 1809h0M1947 1916h0M2105 1922h0M2264 1929h0M2424 1937h0M1947 2035h0M2105 2041h0M2264 2049h0M2425 2058h0M1947 2154h0M2105 2161h0M2265 2170h0M1946 2274h0M2106 2282h0M2265 2291h0M2426 2301h0M1787 2388h0M1946 2395h0M2106 2403h0M2266 2413h0M56 2414h0M1469 2500h0M1628 2504h0M1787 2510h0M1946 2517h0M207 2524h0M2106 2526h0M49 2534h0M1149 2618h0M1466 2621h0M1626 2626h0M515 2630h0M1786 2632h0M357 2636h0M1946 2639h0M199 2645h0M2107 2649h0M41 2655h0M984 2740h0M1144 2740h0M1304 2741h0M825 2742h0M1463 2744h0M666 2746h0M1624 2749h0M507 2751h0M1785 2755h0M348 2758h0M1946 2763h0M189 2767h0M30 2777h0M978 2863h0M1138 2863h0M818 2865h0M1299 2865h0M658 2869h0M1460 2868h0M498 2874h0M1622 2873h0M338 2881h0M178 2890h0M18 2900h0M809 2989h0M970 2987h0M648 2992h0M487 2998h0' },
    { r: 1.35, o: 0.69, p: 'M1271 518h0M1104 521h0M937 523h0M770 526h0M603 529h0M436 532h0M1777 628h0M1445 632h0M1611 630h0M1279 634h0M1113 636h0M948 639h0M783 642h0M617 645h0M452 648h0M287 651h0M121 655h0M1780 745h0M1945 744h0M1450 748h0M1614 746h0M1285 750h0M958 754h0M1122 752h0M794 757h0M631 760h0M467 763h0M303 767h0M139 771h0M1781 861h0M1945 861h0M2110 861h0M2276 861h0M1454 863h0M1618 862h0M1129 867h0M1292 865h0M805 872h0M643 875h0M480 879h0M318 882h0M155 887h0M1783 978h0M1946 978h0M1620 978h0M2109 979h0M2274 980h0M2439 982h0M169 1002h0M7 1007h0M1946 1095h0M2108 1096h0M2272 1098h0M2436 1101h0M2601 1104h0M2108 1214h0M2270 1216h0M2433 1220h0M2597 1224h0M2762 1229h0M2268 1335h0M2430 1339h0M2594 1344h0M2758 1350h0M2267 1453h0M2428 1458h0M2591 1464h0M2754 1471h0M2919 1479h0M2427 1577h0M2589 1584h0M2752 1592h0M2916 1601h0M2587 1705h0M2750 1714h0M2913 1724h0M2425 1817h0M2586 1826h0M2748 1836h0M2911 1847h0M2586 1947h0M2747 1958h0M2911 1970h0M2586 2069h0M2748 2080h0M2911 2094h0M2425 2179h0M2586 2191h0M2748 2204h0M2911 2218h0M2587 2314h0M2750 2328h0M2913 2343h0M2427 2424h0M2589 2438h0M2752 2452h0M2916 2469h0M2267 2536h0M2429 2548h0M2591 2562h0M2755 2578h0M2919 2595h0M2269 2660h0M2431 2673h0M2594 2688h0M2758 2704h0M2108 2773h0M2270 2785h0M2434 2799h0M2598 2814h0M1783 2880h0M1946 2889h0M2109 2899h0M2272 2911h0M2437 2925h0M1132 2987h0M1294 2989h0M1456 2993h0M1619 2998h0M326 3005h0M1782 3006h0' },
    { r: 1.44, o: 0.76, p: 'M3034 -2h0M2849 5h0M2666 11h0M2484 17h0M2302 22h0M2122 27h0M1943 32h0M1764 37h0M1587 42h0M1409 46h0M1233 49h0M1056 53h0M880 57h0M705 60h0M354 65h0M529 63h0M178 68h0M2 70h0M3018 124h0M2836 129h0M2656 134h0M2476 139h0M2298 144h0M2120 148h0M1943 152h0M1768 156h0M1592 160h0M1418 164h0M1243 168h0M1070 171h0M896 174h0M723 177h0M550 180h0M377 183h0M30 188h0M204 185h0M3004 249h0M2825 253h0M2646 257h0M2469 261h0M2293 265h0M2118 268h0M1944 272h0M1771 275h0M1598 278h0M1425 282h0M1254 285h0M1082 288h0M911 291h0M740 294h0M569 297h0M398 300h0M227 302h0M56 305h0M2991 374h0M2814 377h0M2638 379h0M2463 382h0M2116 388h0M2289 385h0M1944 390h0M1773 393h0M1602 396h0M1432 399h0M1263 402h0M1093 404h0M924 407h0M756 410h0M587 413h0M418 416h0M249 419h0M80 422h0M2979 498h0M2630 501h0M2804 499h0M2457 503h0M2114 507h0M2285 505h0M1945 509h0M1775 511h0M1439 516h0M1607 513h0M269 535h0M101 538h0M2452 623h0M2623 622h0M2795 622h0M2968 621h0M2113 625h0M2282 624h0M1945 627h0M2112 743h0M2279 743h0M2447 743h0M2616 743h0M2786 744h0M2958 744h0M2443 862h0M2610 863h0M2779 865h0M2949 867h0M2605 984h0M2773 986h0M2941 990h0M2767 1108h0M2935 1112h0M2928 1234h0M2923 1357h0M3078 1735h0M3076 1860h0M3075 1984h0M3075 2109h0M3076 2235h0M3078 2360h0M2923 2722h0M2763 2832h0M2929 2851h0M2602 2942h0M2768 2960h0M2935 2980h0' },
  ] },
  mobile: { w: 390, b: [
    { r: 0.89, o: 0.63, p: 'M1 640h0M518 1388h0M621 1387h0M414 1390h0M311 1392h0M1 1401h0M624 1462h0M727 1461h0M830 1461h0M521 1463h0M418 1465h0M315 1467h0M211 1470h0M108 1473h0M625 1537h0M728 1537h0M831 1537h0M934 1538h0M523 1539h0M420 1540h0M317 1543h0M215 1545h0M112 1549h0M9 1553h0M627 1613h0M729 1613h0M832 1613h0M935 1614h0M422 1616h0M524 1614h0M320 1618h0M217 1621h0M115 1625h0M12 1629h0M1558 1634h0M525 1690h0M628 1689h0M730 1689h0M833 1689h0M423 1692h0M935 1690h0M321 1694h0M1038 1692h0M219 1697h0M116 1701h0M14 1705h0M1558 1713h0M628 1765h0M730 1765h0M833 1766h0M424 1768h0M526 1766h0M935 1767h0M1039 1769h0M322 1770h0M219 1773h0M117 1777h0M15 1782h0M1558 1793h0M628 1842h0M730 1842h0M526 1842h0M833 1843h0M423 1844h0M935 1844h0M321 1847h0M1038 1847h0M219 1850h0M117 1854h0M14 1859h0M1558 1873h0M525 1919h0M627 1919h0M730 1919h0M832 1920h0M423 1921h0M935 1922h0M320 1923h0M218 1927h0M116 1931h0M13 1936h0M1558 1953h0M523 1997h0M626 1996h0M729 1996h0M831 1998h0M421 1998h0M935 2000h0M319 2001h0M216 2004h0M1038 2003h0M114 2008h0M11 2013h0M624 2074h0M419 2076h0M521 2074h0M727 2074h0M830 2076h0M316 2078h0M213 2082h0M111 2086h0M8 2091h0M519 2153h0M622 2152h0M416 2154h0M313 2157h0M210 2160h0M4 2170h0M0 2249h0' },
    { r: 0.92, o: 0.65, p: 'M716 1160h0M822 1159h0M611 1161h0M505 1162h0M400 1164h0M295 1166h0M189 1169h0M84 1171h0M720 1235h0M824 1234h0M930 1234h0M510 1238h0M615 1236h0M406 1239h0M301 1241h0M196 1244h0M92 1247h0M827 1310h0M931 1310h0M618 1311h0M722 1310h0M1036 1310h0M1141 1311h0M514 1313h0M410 1314h0M306 1317h0M202 1319h0M98 1322h0M725 1386h0M828 1386h0M932 1386h0M1037 1387h0M1141 1388h0M207 1395h0M104 1398h0M933 1462h0M1037 1463h0M1142 1464h0M1246 1466h0M5 1477h0M1038 1539h0M1142 1541h0M1246 1544h0M1351 1547h0M1038 1616h0M1142 1618h0M1246 1621h0M1350 1625h0M1142 1695h0M1246 1698h0M1350 1703h0M1142 1772h0M1246 1776h0M1350 1781h0M1142 1850h0M1246 1854h0M1350 1859h0M1038 1925h0M1142 1928h0M1246 1933h0M1350 1939h0M1142 2007h0M1246 2012h0M1350 2018h0M934 2078h0M1038 2082h0M1142 2086h0M1246 2092h0M1351 2098h0M725 2153h0M829 2155h0M933 2157h0M1037 2161h0M107 2164h0M1141 2166h0M1246 2172h0M516 2232h0M619 2232h0M412 2233h0M723 2232h0M309 2235h0M827 2234h0M932 2237h0M205 2239h0M1036 2241h0M102 2243h0M1141 2246h0M512 2312h0M616 2311h0M408 2313h0M721 2312h0M304 2315h0M825 2314h0M930 2318h0M200 2318h0M1035 2322h0M96 2323h0M508 2392h0M612 2392h0M403 2393h0M718 2393h0M298 2395h0M823 2395h0M193 2399h0M89 2403h0M502 2473h0M397 2474h0M186 2480h0' },
    { r: 0.95, o: 0.69, p: 'M589 859h0M480 861h0M371 863h0M812 932h0M921 930h0M704 933h0M595 935h0M487 937h0M379 938h0M271 940h0M163 943h0M55 945h0M1032 1006h0M1140 1005h0M816 1008h0M923 1007h0M708 1009h0M494 1012h0M601 1010h0M387 1014h0M280 1016h0M173 1018h0M66 1021h0M1033 1082h0M1140 1082h0M1248 1081h0M1357 1082h0M819 1083h0M926 1083h0M606 1086h0M713 1084h0M500 1087h0M394 1089h0M288 1091h0M182 1093h0M75 1096h0M1034 1158h0M928 1158h0M1141 1158h0M1248 1159h0M1355 1159h0M1035 1234h0M1141 1235h0M1247 1235h0M1354 1237h0M1462 1238h0M1247 1312h0M1353 1314h0M1460 1316h0M1247 1389h0M1352 1392h0M1458 1394h0M1351 1469h0M1457 1473h0M1456 1551h0M1455 1629h0M1455 1708h0M1455 1786h0M1455 1865h0M1455 1945h0M1456 2025h0M1456 2106h0M1352 2179h0M1457 2187h0M1247 2252h0M1353 2260h0M1459 2268h0M1141 2327h0M1247 2334h0M1353 2342h0M1460 2351h0M929 2399h0M1035 2403h0M1141 2409h0M1247 2416h0M1355 2424h0M1462 2434h0M608 2473h0M714 2475h0M291 2476h0M820 2477h0M927 2481h0M81 2484h0M1033 2486h0M1141 2492h0M1248 2499h0M1356 2508h0M497 2555h0M603 2556h0M390 2556h0M710 2557h0M284 2558h0M817 2560h0M178 2562h0M924 2564h0M72 2566h0M1032 2569h0M1140 2576h0M1249 2583h0M383 2639h0M490 2639h0M598 2639h0M276 2641h0M705 2641h0M814 2644h0M169 2644h0M922 2648h0M62 2649h0M1031 2654h0' },
    { r: 1.02, o: 0.77, p: 'M1501 366h0M1379 371h0M1257 376h0M1136 380h0M1015 384h0M895 388h0M775 392h0M656 395h0M537 398h0M418 400h0M299 403h0M181 405h0M63 407h0M1496 448h0M1376 452h0M1256 456h0M1137 460h0M1018 463h0M899 467h0M782 470h0M664 473h0M547 476h0M430 478h0M314 481h0M197 483h0M81 484h0M1491 528h0M1373 532h0M1255 536h0M1137 539h0M1020 542h0M904 545h0M788 548h0M672 551h0M557 553h0M442 555h0M327 558h0M212 560h0M97 561h0M1487 609h0M1370 612h0M1253 615h0M1138 617h0M1023 620h0M908 623h0M794 625h0M680 628h0M566 630h0M453 632h0M339 634h0M226 636h0M113 638h0M1482 688h0M1367 691h0M1252 693h0M1138 696h0M1025 698h0M912 700h0M799 703h0M687 705h0M575 707h0M463 709h0M351 711h0M239 713h0M127 715h0M15 717h0M1478 768h0M1365 769h0M1251 771h0M1139 773h0M1027 775h0M915 777h0M804 779h0M693 781h0M582 783h0M471 785h0M361 787h0M251 789h0M140 791h0M30 793h0M1362 848h0M1475 847h0M1251 849h0M1139 851h0M918 854h0M1029 852h0M808 855h0M699 857h0M261 865h0M152 867h0M43 869h0M1360 926h0M1471 925h0M1140 928h0M1250 927h0M1030 929h0M1359 1004h0M1469 1004h0M1249 1004h0M1466 1082h0M1464 1160h0M1464 2518h0M1357 2593h0M1467 2603h0M1140 2661h0M1249 2669h0M1359 2678h0M1470 2689h0' },
  ] },
}
const dotUris = {}
export function latticeDotField(dev, ink = '#F2F2F2') {
  const v = LATTICE_DOTS[dev] || LATTICE_DOTS.desktop
  const key = dev + ink
  return dotUris[key] || (dotUris[key] = 'data:image/svg+xml,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${v.w * 4} 3000" preserveAspectRatio="xMidYMid slice">` +
    v.b.map((q) => `<path d="${q.p}" fill="none" stroke="${ink}" stroke-opacity="${q.o}" stroke-width="${+(q.r * 8).toFixed(2)}" stroke-linecap="round"/>`).join('') +
    '</svg>'))
}

/* ------------------------------------------------------------------ *
 * The bio's dot field (plans/lattice/layout-1.md, *Settled in section 2*): a
 * dark dot canvas the frame lays under the section, as wide as the section and
 * as tall as it states (423 / 516.5 / 577.5 css px), hung off the section's foot
 * at 90% opacity. Like the hero's it is each width's own centroid set, read off
 * the frame's 2x raster (connected components, alpha-weighted; 326 dots at 1440,
 * 714 at 768, 571 at 390, a handful of edge-clipped fragments dropped), in four
 * buckets by dot mass; `r` and `o` are fitted to a bucket's mean mass and peak
 * alpha, with the container's .9 folded into `o`. Paths are zero-length
 * subpaths in quarter-pixel units (viewBox w x 4 by h x 4).
 * ------------------------------------------------------------------ */
const LATTICE_BIO_DOTS = {
  desktop: { w: 1440, h: 423, b: [
    { r: 0.87, o: 0.36, p: 'M3976 1689h0M2191 925h0M2195 1070h0M2001 1220h0M1806 1519h0M2394 1505h0M2197 1215h0M2198 1362h0M1805 1226h0M2198 1508h0M2391 1067h0M2394 1358h0M2002 1513h0M2590 1211h0M2787 1357h0M2002 1366h0M2590 1504h0M2589 1651h0M2393 1212h0M1608 1233h0M2392 1653h0M2000 1660h0M2384 777h0M1797 935h0M2590 1357h0M1413 1536h0M1806 1372h0M2196 1656h0M2588 1065h0M1998 1074h0M2785 1652h0M1804 1666h0M1802 1080h0M2786 1210h0M1610 1380h0M1610 1527h0M2786 1504h0M2983 1211h0M1216 1547h0M1605 1087h0M2388 922h0M2785 1064h0M2983 1506h0M1791 790h0M2585 920h0M1994 929h0M2983 1358h0M1413 1389h0M1607 1674h0M2782 919h0M1412 1242h0M2982 1654h0M1989 785h0M3180 1509h0M2982 1065h0M1411 1684h0M2186 780h0M1600 942h0M1408 1096h0M3180 1361h0M3180 1213h0M2582 775h0M3378 1365h0M1216 1399h0M3378 1217h0M1593 797h0M2980 919h0M3179 1067h0M3180 1658h0M2780 774h0M1214 1252h0M2378 633h0M1402 950h0M2577 630h0M1783 645h0M1210 1105h0M2180 636h0M1982 640h0M3178 920h0M3378 1514h0M2978 773h0' },
    { r: 0.89, o: 0.37, p: 'M3577 1371h0M3378 1663h0M1773 501h0M1394 804h0M1019 1411h0M1019 1560h0M3377 923h0M3378 1070h0M1016 1264h0M820 1425h0M2776 629h0M1584 652h0M1204 959h0M2172 492h0M3176 774h0M1385 659h0M1012 1116h0M2372 488h0M2771 484h0M1973 496h0M2975 628h0M1196 813h0M1005 969h0M3577 1222h0M3577 1520h0M820 1574h0M3576 1670h0M2571 486h0M2971 483h0M1185 667h0M1573 507h0M1373 514h0M2163 348h0M3376 776h0M3576 1074h0M818 1276h0M3174 628h0M813 1128h0M805 981h0M996 822h0M3576 926h0M1962 352h0M3776 1528h0M3776 1378h0M2564 341h0M2364 344h0M3776 1229h0M618 1291h0M3776 1679h0M3576 779h0M3575 485h0M3374 630h0M622 1590h0M3776 1080h0M2556 197h0M2765 339h0M1762 357h0M3172 483h0M1172 521h0M984 676h0M621 1440h0M1359 368h0M1560 362h0M613 1142h0M3976 1237h0M3776 931h0M795 833h0M2967 338h0M3373 484h0M3976 1538h0M3976 1387h0M783 686h0M3977 1087h0M418 1307h0M421 1457h0M2759 195h0M3575 632h0M3777 783h0M2354 200h0M1950 207h0M2152 203h0M1157 376h0' },
    { r: 0.91, o: 0.38, p: 'M605 994h0M1748 212h0M3169 337h0M970 530h0M422 1608h0M1343 223h0M412 1157h0M594 845h0M1546 217h0M3978 938h0M1937 63h0M2962 193h0M581 697h0M3371 337h0M768 539h0M954 383h0M3777 635h0M3979 788h0M1733 68h0M4178 1246h0M4177 1398h0M2140 59h0M403 1008h0M4177 1550h0M221 1627h0M2344 56h0M3165 192h0M4179 1096h0M2548 52h0M220 1476h0M1140 230h0M216 1324h0M565 549h0M1529 73h0M4180 945h0M3369 191h0M392 858h0M200 1023h0M3778 488h0M936 237h0M3574 338h0M751 392h0M4182 795h0M2752 50h0M3980 640h0M210 1174h0M4380 1258h0M2956 48h0M1325 78h0M3982 491h0M4380 1410h0M3161 46h0M378 709h0M4380 1563h0M188 873h0M731 245h0M19 1648h0M3778 340h0M546 401h0M4382 1106h0M18 1496h0M1120 84h0M4184 645h0M3574 191h0M14 1344h0M3366 45h0M4383 954h0M361 560h0M7 1192h0M173 723h0M3779 192h0M914 91h0M525 253h0M4584 1424h0M3984 342h0M4584 1579h0M4386 802h0M4584 1270h0M341 411h0M4187 495h0M4586 1117h0' },
    { r: 0.96, o: 0.41, p: 'M155 572h0M4389 651h0M3573 44h0M3986 193h0M708 98h0M4190 345h0M501 105h0M4588 964h0M4592 811h0M4789 1596h0M4789 1440h0M318 262h0M3780 44h0M4790 1285h0M134 422h0M4393 500h0M4194 195h0M4792 1130h0M4795 976h0M4596 659h0M4799 821h0M3988 44h0M4397 349h0M292 113h0M110 272h0M4601 506h0M4997 1301h0M4995 1615h0M4995 1458h0M4804 667h0M4403 198h0M4198 45h0M4999 1144h0M5003 988h0M83 122h0M4606 354h0M4810 513h0M5008 833h0M4409 46h0M5204 1636h0M5204 1477h0M4613 201h0M5205 1318h0M5014 677h0M4817 359h0M5208 1160h0M5213 1003h0M5021 521h0M4825 205h0M4621 48h0M5218 845h0M5414 1498h0M5419 1178h0M5414 1659h0M5416 1338h0M5225 688h0M5030 366h0M4835 51h0M5424 1019h0M5234 530h0M5431 859h0M5039 210h0M5626 1522h0M5626 1684h0M5244 373h0M5439 700h0M5628 1360h0M5632 1198h0M5448 541h0M5050 54h0M5638 1036h0M5255 215h0M5646 875h0M5655 713h0M5460 381h0M5268 58h0M5666 552h0M5473 222h0M5678 390h0M5488 62h0M5693 229h0M5710 67h0' },
  ] },
  tablet: { w: 768, h: 516.5, b: [
    { r: 0.88, o: 0.36, p: 'M462 2h0M1066 1155h0M961 1158h0M342 2h0M963 1392h0M1591 1385h0M1277 1385h0M1067 1233h0M1067 1467h0M1381 1228h0M1277 1306h0M1068 1311h0M1171 1465h0M1172 1308h0M1172 1386h0M1171 1153h0M1276 1228h0M1172 1230h0M1068 1389h0M1275 1151h0M963 1236h0M1381 1306h0M1486 1305h0M1381 1463h0M1065 1546h0M963 1314h0M1276 1463h0M1169 1075h0M1380 1150h0M859 1318h0M1381 1384h0M1486 1384h0M649 1407h0M962 1471h0M1170 1544h0M858 1240h0M858 1396h0M1274 1542h0M1486 1227h0M1486 1463h0M1483 1622h0M857 1475h0M1696 1229h0M1485 1149h0M1591 1228h0M1379 1072h0M1591 1306h0M960 1550h0M1274 1074h0M754 1401h0M1379 1542h0M1064 1078h0M856 1162h0M1167 1624h0M959 1081h0M753 1244h0M1484 1542h0M645 1566h0M1272 1622h0M957 1629h0M1271 996h0M751 1166h0M754 1323h0M752 1480h0M1166 998h0M1062 1626h0M1591 1464h0M855 1554h0M1061 1000h0M955 1003h0M1590 1150h0M1696 1308h0M1696 1387h0M1378 1622h0M1484 1072h0M853 1084h0M1164 1704h0M852 1634h0M1377 995h0M1695 1073h0M649 1328h0M1590 1544h0M750 1559h0M1802 1231h0M850 1007h0M1163 921h0M1589 1072h0M1482 994h0M648 1250h0M1696 1466h0M1270 1702h0M1059 1706h0M647 1486h0M747 1639h0M1696 1151h0M1375 1702h0M953 1710h0M1057 923h0M748 1088h0M1268 919h0M1801 1469h0M1481 1703h0M1589 1624h0M645 1171h0M1802 1389h0M1695 1546h0M848 1714h0M951 926h0M1588 994h0M1802 1310h0M1055 1787h0M1374 918h0M540 1573h0M1371 841h0M1801 1074h0M1373 1783h0M1908 1313h0M543 1335h0M845 929h0M542 1493h0M1587 1705h0M1587 917h0M744 1011h0M543 1414h0M1480 917h0M642 1093h0M946 849h0M1801 1152h0M542 1256h0M1801 1549h0M742 1720h0M843 1795h0M1694 1626h0M641 1646h0M1160 1785h0M1266 1783h0M949 1790h0M1265 842h0M1052 846h0M1907 1473h0M1694 995h0M1479 1784h0M540 1177h0M1908 1393h0M637 1726h0M1158 844h0M738 933h0M638 1015h0M1908 1234h0M438 1421h0M436 1501h0M1693 1707h0M1801 1630h0M438 1342h0M536 1653h0M737 1800h0M839 852h0M536 1099h0M1693 917h0M1262 1865h0M943 1872h0M1907 1155h0M2014 1317h0M531 1734h0M1692 1789h0M1156 1866h0M531 1021h0M1049 1868h0M1585 1786h0M1369 1865h0M2014 1397h0M434 1581h0M1478 840h0M1800 996h0M436 1263h0M1907 1553h0M430 1105h0M433 1184h0' },
    { r: 0.9, o: 0.38, p: 'M1154 767h0M631 1807h0M1907 1076h0M1907 1634h0M1585 840h0M632 938h0M1800 1711h0M430 1662h0M837 1876h0M1261 765h0M1047 770h0M1475 763h0M1368 764h0M732 856h0M1907 997h0M2014 1478h0M1476 1866h0M832 775h0M2014 1237h0M625 860h0M425 1743h0M1907 1716h0M525 942h0M331 1350h0M1800 918h0M332 1430h0M525 1815h0M940 772h0M330 1270h0M1365 1947h0M1692 839h0M2014 1158h0M330 1510h0M327 1191h0M2014 1559h0M730 1882h0M1258 1947h0M2014 1079h0M1799 1793h0M1583 1868h0M1151 1948h0M624 1889h0M328 1590h0M1044 1951h0M936 1954h0M424 1026h0M830 1958h0M1582 762h0M1907 919h0M2121 1402h0M2014 1640h0M1799 840h0M317 1033h0M1691 1871h0M2121 1322h0M324 1671h0M725 778h0M1363 687h0M223 1279h0M2121 1565h0M932 695h0M2121 1483h0M225 1439h0M616 1971h0M1148 690h0M1040 693h0M2121 1162h0M225 1359h0M1473 1949h0M323 1112h0M2121 1242h0M1256 688h0M418 1824h0M418 948h0M517 1897h0M1581 1951h0M617 782h0M1690 762h0M2014 1000h0M220 1199h0M723 1964h0M929 2037h0M518 864h0M224 1520h0M221 1601h0M1471 686h0M824 698h0M2014 1722h0M1907 1798h0M319 1752h0M1252 2030h0M1144 2031h0M1907 841h0M1798 1876h0M1037 2034h0M2121 1082h0M1033 616h0M716 701h0M509 786h0M2014 921h0M215 1119h0M2122 1647h0M2015 1805h0M411 1906h0M509 1979h0M1469 2032h0M410 869h0M217 1682h0M1689 1955h0M2122 1002h0M1361 2031h0M821 2041h0M1580 685h0M2228 1328h0M117 1531h0M312 1834h0M714 2047h0M1798 762h0M117 1369h0M2228 1490h0M310 954h0M2228 1247h0M2228 1409h0M205 1845h0M1359 610h0M1141 613h0M1250 612h0M2229 1572h0M1688 684h0M2229 1166h0M212 1763h0M924 618h0M118 1450h0M1906 1882h0M115 1288h0M2122 1729h0M608 704h0M1797 1960h0M1578 2035h0M209 1040h0M2015 842h0M301 875h0M2123 923h0M815 621h0M606 2054h0M1906 762h0M400 791h0M1468 608h0M2229 1086h0M114 1612h0M2123 1813h0M304 1916h0M597 627h0M110 1694h0M2015 1888h0M1797 684h0M499 708h0M107 1128h0M112 1208h0M2230 1655h0M3 1706h0M402 1988h0M1687 2039h0M1576 607h0M105 1776h0M915 541h0M499 2062h0M706 624h0M2230 1006h0M1906 1966h0M201 960h0M2337 1172h0M2336 1253h0M2336 1334h0M2336 1416h0M294 1999h0M2015 763h0M10 1461h0M197 1928h0' },
    { r: 0.93, o: 0.4, p: 'M2337 1580h0M2231 1738h0M1025 538h0M1244 534h0M1134 536h0M2336 1498h0M1463 531h0M1353 533h0M1686 606h0M9 1543h0M7 1624h0M2124 844h0M10 1380h0M1906 684h0M192 881h0M7 1299h0M1796 2044h0M100 1047h0M98 1858h0M805 543h0M390 712h0M291 796h0M2231 926h0M2338 1091h0M2338 1664h0M2124 1896h0M2015 1973h0M223 3h0M4 1218h0M2339 1010h0M2445 1259h0M2233 846h0M1906 2050h0M92 967h0M2232 1821h0M1795 606h0M2125 1981h0M187 2011h0M488 630h0M83 887h0M2125 764h0M89 1940h0M1573 530h0M696 546h0M2340 1747h0M2016 684h0M2445 1342h0M2445 1424h0M2445 1507h0M1237 457h0M280 717h0M2446 1178h0M182 801h0M585 549h0M1126 459h0M905 464h0M1683 529h0M378 634h0M2341 929h0M2446 1590h0M1906 606h0M475 552h0M2233 1906h0M1347 455h0M2016 2058h0M1016 461h0M2447 1096h0M2341 1831h0M79 2024h0M1458 454h0M794 466h0M2235 1991h0M2447 1674h0M1794 528h0M2235 766h0M2126 685h0M1569 452h0M683 468h0M2451 933h0M2449 1015h0M2449 1758h0M1905 527h0M2016 605h0M72 807h0M2343 849h0M2554 1267h0M2554 1350h0M267 638h0M170 722h0M2554 1433h0M2554 1516h0M2344 1916h0M1229 380h0M364 556h0M572 471h0M2556 1184h0M2556 1600h0M1680 451h0M2557 1685h0M2557 1102h0M1117 382h0M1005 384h0M1792 449h0M59 727h0M1341 378h0M894 386h0M2345 768h0M2451 1843h0M2127 606h0M2237 686h0M156 642h0M1453 376h0M461 474h0M2346 2002h0M782 388h0M2016 526h0M2664 1359h0M2664 1443h0M253 559h0M2454 852h0M2559 1020h0M2559 1770h0M2454 1928h0M1565 374h0M670 391h0M2665 1527h0M2665 1276h0M349 477h0M558 393h0M1904 448h0M2239 606h0M2666 1612h0M2562 938h0M141 563h0M2348 688h0M2562 1855h0M2666 1192h0M2457 2014h0M1333 300h0M44 647h0M2457 771h0M1678 372h0M1107 304h0M994 306h0M2668 1697h0M2129 526h0M2668 1109h0M1220 302h0M2565 856h0M881 308h0M2017 447h0M2671 1026h0M2565 1941h0M1790 371h0M2351 607h0M445 396h0M2670 1783h0M236 480h0M768 310h0M2775 1454h0M2241 526h0M1447 298h0M2775 1370h0M655 313h0M1560 296h0M103 3h0M2776 1540h0M2779 1711h0M2460 689h0M2776 1285h0M332 398h0M2777 1625h0M542 315h0M1904 369h0M28 567h0M2674 943h0M2778 1201h0M124 483h0' },
    { r: 1.0, o: 0.44, p: 'M2674 1869h0M2569 2028h0M2130 446h0M1674 294h0M2569 774h0M1211 224h0M2780 1117h0M219 401h0M2677 1956h0M2782 1797h0M1096 226h0M2574 691h0M982 228h0M2244 445h0M1788 292h0M428 317h0M868 230h0M2018 368h0M2355 526h0M2678 860h0M1325 222h0M2783 1033h0M2464 608h0M753 232h0M1440 220h0M10 487h0M1555 217h0M2889 1639h0M2787 949h0M2887 1467h0M314 319h0M639 234h0M2888 1381h0M2682 2043h0M2888 1553h0M2786 1884h0M1903 290h0M105 403h0M2682 777h0M2888 1296h0M2132 366h0M524 236h0M2890 1210h0M199 321h0M2893 1125h0M1670 215h0M2892 1726h0M968 150h0M2359 445h0M2469 526h0M2895 1813h0M2790 1972h0M2578 609h0M2791 865h0M409 238h0M2018 288h0M1084 148h0M1786 212h0M2247 365h0M853 152h0M2688 694h0M1433 141h0M1200 146h0M2896 1040h0M3001 1567h0M1316 144h0M737 154h0M2797 781h0M2899 1901h0M2795 2060h0M294 240h0M3002 1654h0M84 324h0M3000 1480h0M3001 1394h0M621 156h0M2901 955h0M1549 138h0M2134 286h0M1902 210h0M2584 526h0M3002 1307h0M3004 1221h0M2363 363h0M2903 1989h0M505 158h0M2474 444h0M2694 611h0M3005 1742h0M178 242h0M3007 1135h0M2803 697h0M1666 136h0M2906 870h0M1072 70h0M389 159h0M3008 1830h0M2019 208h0M2251 284h0M1189 67h0M954 72h0M1784 133h0M3011 1048h0M62 244h0M1307 65h0M2136 205h0M719 76h0M837 74h0M272 161h0M3012 1919h0M2912 785h0M2590 444h0M2700 527h0M2480 362h0M3016 962h0M1425 62h0M602 77h0M1902 130h0M2810 613h0M3018 2008h0M1543 59h0M484 79h0M2368 282h0M155 162h0M3022 876h0M366 80h0M2020 127h0M1662 56h0M2254 202h0M2919 700h0M2597 361h0M2708 444h0M248 81h0M1781 53h0M38 163h0M3028 790h0M2486 280h0M2817 528h0M2927 615h0M2139 124h0M2373 200h0M1901 50h0M130 82h0M2826 444h0M12 83h0M2259 120h0M3036 704h0M2605 278h0M2716 360h0M2021 46h0M2936 529h0M2493 197h0M3045 617h0M2142 42h0M2379 117h0M2725 276h0M2835 359h0M2945 444h0M2613 194h0M2263 38h0M3055 531h0M2500 114h0M2956 358h0M2385 34h0M2735 191h0M2846 273h0M3066 444h0M2622 110h0M2508 30h0M2857 188h0M2968 271h0M2746 106h0M2632 25h0M2870 102h0M2981 185h0M2757 20h0M2995 98h0M2883 15h0M3010 10h0' },
  ] },
  mobile: { w: 390, h: 577.5, b: [
    { r: 0.87, o: 0.36, p: 'M1558 1969h0M1558 898h0M585 1420h0M664 1419h0M742 1419h0M427 1482h0M505 1245h0M506 1421h0M427 1305h0M585 1361h0M663 1243h0M506 1362h0M428 1364h0M426 1247h0M742 1301h0M506 1303h0M506 1480h0M428 1423h0M584 1479h0M584 1244h0M664 1301h0M349 1366h0M663 1478h0M349 1308h0M271 1369h0M504 1187h0M585 1302h0M664 1360h0M349 1425h0M581 1128h0M900 1421h0M583 1538h0M504 1539h0M191 1314h0M743 1360h0M270 1428h0M348 1484h0M426 1541h0M348 1249h0M268 1547h0M742 1478h0M270 1310h0M821 1479h0M189 1551h0M661 1598h0M583 1186h0M425 1189h0M346 1191h0M742 1243h0M347 1544h0M424 1601h0M266 1607h0M270 1488h0M820 1539h0M192 1373h0M503 1599h0M662 1185h0M821 1360h0M662 1538h0M582 1598h0M502 1129h0M269 1252h0M821 1302h0M821 1420h0M191 1491h0M741 1184h0M980 1423h0M741 1538h0M192 1432h0M345 1604h0M266 1194h0M821 1243h0M422 1131h0M900 1362h0M900 1302h0M740 1598h0M660 1127h0M343 1133h0M189 1255h0M113 1377h0M186 1611h0M900 1185h0M499 1071h0M421 1661h0M820 1184h0M187 1197h0M900 1244h0M579 1070h0M112 1436h0M900 1481h0M500 1660h0M740 1126h0M112 1496h0M580 1658h0M264 1135h0M112 1318h0M900 1541h0M820 1599h0M659 1658h0M342 1664h0M110 1556h0M739 1659h0M496 1013h0M819 1126h0M658 1069h0M420 1073h0M110 1259h0M262 1667h0M980 1304h0M980 1363h0M979 1604h0M340 1075h0M980 1483h0M737 1720h0M899 1126h0M657 1719h0M980 1245h0M899 1601h0M183 1671h0M577 1719h0M418 1722h0M184 1138h0M33 1382h0M33 1441h0M979 1543h0M31 1561h0M738 1068h0M260 1077h0M32 1501h0M108 1200h0M498 1720h0M32 1323h0M107 1616h0M818 1660h0M338 1725h0M979 1186h0M31 1264h0M416 1015h0M818 1068h0M1059 1306h0M259 1728h0M656 1011h0' },
    { r: 0.9, o: 0.37, p: 'M1059 1366h0M1059 1426h0M576 1012h0M104 1142h0M1059 1486h0M898 1662h0M104 1676h0M336 1017h0M180 1080h0M979 1665h0M735 1781h0M179 1732h0M979 1127h0M573 954h0M817 1721h0M28 1205h0M1059 1247h0M28 1622h0M1139 1429h0M412 957h0M256 1019h0M736 1010h0M414 1783h0M574 1781h0M494 1782h0M898 1068h0M1059 1187h0M254 1789h0M1059 1546h0M655 1781h0M334 1786h0M175 1022h0M95 1025h0M100 1083h0M1139 1309h0M1059 1607h0M24 1682h0M817 1010h0M24 1146h0M1139 1369h0M492 955h0M251 961h0M897 1724h0M99 1737h0M653 953h0M1139 1489h0M816 1783h0M1059 1128h0M331 959h0M897 1010h0M978 1068h0M1139 1249h0M20 1087h0M249 1851h0M329 1848h0M174 1794h0M410 1845h0M978 1727h0M571 1843h0M490 1844h0M815 951h0M1059 1069h0M20 1743h0M1140 1550h0M1059 1669h0M94 1799h0M734 952h0M652 1843h0M1140 1189h0M1220 1433h0M1220 1372h0M1140 1612h0M170 964h0M896 1786h0M407 899h0M896 951h0M1059 1731h0M1220 1555h0M650 895h0M569 896h0M1220 1312h0M326 901h0M245 903h0M89 966h0M978 1010h0M732 1844h0M488 897h0M1220 1494h0M168 1855h0M567 1905h0M1140 1130h0M14 1028h0M977 1789h0M14 1805h0M814 1846h0M732 894h0M1220 1252h0M1140 1673h0M324 1910h0M1220 1192h0M404 1908h0M88 1861h0M1059 1010h0M486 1906h0M647 837h0M1301 1255h0M813 893h0M977 951h0M895 1848h0M402 841h0M1140 1071h0M1220 1617h0M648 1905h0M163 905h0M1300 1376h0M1301 1499h0M1301 1560h0M1300 1316h0M1140 1736h0M565 838h0M1221 1679h0M243 1913h0M483 840h0M8 970h0M1300 1438h0M1059 1793h0M7 1867h0M320 843h0M1221 1132h0M730 1907h0M894 893h0M162 1918h0M82 908h0M976 1852h0M644 1969h0M156 847h0M238 845h0M81 1923h0M811 835h0M1301 1195h0M1058 952h0M811 1908h0M1140 1011h0' },
    { r: 0.93, o: 0.39, p: 'M480 1969h0M729 836h0M1221 1072h0M317 1973h0M1382 1443h0M562 1968h0M1302 1622h0M399 1971h0M976 893h0M893 1911h0M236 1976h0M1302 1135h0M1382 1381h0M1140 1798h0M1058 1856h0M396 783h0M1222 1741h0M1382 1320h0M643 779h0M1302 1685h0M1382 1505h0M231 787h0M1303 1075h0M560 780h0M478 782h0M809 1972h0M893 834h0M1140 952h0M726 1970h0M313 785h0M154 1981h0M1383 1198h0M1382 1567h0M1222 1013h0M1382 1259h0M74 850h0M1383 1629h0M725 778h0M1058 893h0M976 1915h0M975 834h0M1222 1804h0M73 1986h0M1140 1862h0M475 2033h0M557 2033h0M148 789h0M1303 1748h0M1463 1449h0M310 2037h0M1463 1387h0M1464 1511h0M1223 953h0M392 2034h0M808 777h0M1384 1138h0M1058 1920h0M1141 893h0M892 1975h0M228 2040h0M1464 1325h0M1384 1692h0M640 2033h0M146 2044h0M1304 1014h0M1464 1264h0M723 2034h0M65 791h0M305 727h0M891 776h0M1141 1926h0M389 725h0M1465 1202h0M806 2037h0M1464 1574h0M472 724h0M1385 1077h0M1223 1868h0M555 722h0M1058 834h0M1304 1811h0M974 1980h0M638 721h0M1465 1637h0M64 2050h0M222 729h0M1386 1755h0M974 775h0M1058 1984h0M722 719h0M1224 893h0M1305 954h0M1466 1141h0M1547 1269h0M1547 1582h0M1387 1819h0M1141 834h0M139 730h0M890 2040h0M1467 1700h0M1387 1016h0M1546 1456h0M1546 1393h0M805 718h0M1546 1331h0M1546 1519h0M1306 1875h0M1224 1932h0M55 732h0M889 717h0M1058 774h0M381 667h0M973 2044h0M1141 1990h0M465 665h0M1468 1080h0M1468 1764h0M633 662h0M549 664h0M1548 1207h0M1307 894h0M297 668h0M1225 834h0M1389 956h0M1548 1645h0M1389 1884h0M213 670h0M973 716h0M1550 1145h0M1308 1940h0M1057 2050h0M718 661h0M1557 1903h0M1142 774h0M1550 1709h0M1470 1019h0M1470 1828h0M1225 1998h0M802 660h0M129 672h0M1057 715h0M1557 960h0M1552 1773h0' },
    { r: 0.99, o: 0.43, p: 'M1391 895h0M1142 2056h0M1309 834h0M1552 1084h0M44 674h0M1473 1893h0M1309 2006h0M886 658h0M1391 1949h0M1226 774h0M458 607h0M1472 958h0M373 608h0M543 605h0M288 610h0M628 604h0M713 602h0M1554 1838h0M1226 2063h0M203 612h0M972 657h0M1142 714h0M118 613h0M1393 834h0M1554 1022h0M1475 897h0M798 601h0M1310 774h0M1057 656h0M1311 2072h0M1476 1958h0M32 615h0M884 599h0M1227 714h0M1394 2015h0M1142 655h0M536 547h0M1478 835h0M1479 2025h0M450 548h0M622 545h0M364 550h0M1313 713h0M970 598h0M278 552h0M1396 774h0M708 543h0M191 553h0M1397 2081h0M105 554h0M794 542h0M1056 596h0M1228 654h0M19 556h0M881 540h0M1399 713h0M440 490h0M1482 774h0M1482 2092h0M354 491h0M1143 595h0M266 492h0M968 538h0M528 488h0M1315 652h0M703 484h0M615 486h0M179 494h0M92 495h0M790 482h0M1230 593h0M5 497h0M1056 536h0M1486 712h0M1402 652h0M966 478h0M878 480h0M343 432h0M1144 534h0M1318 592h0M519 429h0M431 430h0M254 434h0M1490 650h0M166 435h0M608 427h0M1232 532h0M697 425h0M78 436h0M1055 476h0M1406 590h0M786 423h0M875 420h0M1321 530h0M1144 474h0M420 371h0M965 418h0M331 373h0M1495 589h0M241 374h0M1234 471h0M510 369h0M152 375h0M600 367h0M62 377h0M1055 416h0M1410 528h0M690 365h0M781 363h0M1324 469h0M1145 413h0M872 360h0M1500 526h0M409 311h0M962 358h0M318 313h0M227 314h0M500 309h0M1236 410h0M1414 466h0M136 316h0M592 307h0M684 305h0M45 317h0M1054 355h0M775 302h0M868 300h0M1146 352h0M1327 407h0M1506 464h0M960 297h0M1238 348h0M1419 404h0M1053 293h0M1331 345h0M1512 401h0M1147 290h0M1240 286h0M1424 341h0M1335 282h0M1518 338h0M1430 278h0M1525 274h0' },
  ] },
}
const bioDotUris = {}
export function latticeBioDots(dev, ink = '#111111') {
  const v = LATTICE_BIO_DOTS[dev] || LATTICE_BIO_DOTS.desktop
  const key = dev + ink
  return bioDotUris[key] || (bioDotUris[key] = {
    h: v.h,
    uri: 'data:image/svg+xml,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${v.w * 4} ${v.h * 4}" preserveAspectRatio="xMidYMid slice">` +
      v.b.map((q) => `<path d="${q.p}" fill="none" stroke="${ink}" stroke-opacity="${q.o}" stroke-width="${+(q.r * 8).toFixed(2)}" stroke-linecap="round"/>`).join('') +
      '</svg>'),
  })
}

/* ------------------------------------------------------------------ *
 * The testimonials' dot field (plans/lattice/layout-1.md, *Settled in section
 * 10*): a dark dot canvas the frames lay over the whole section, as wide as the
 * section and 730 tall at every width, at 70% opacity. The bio's recipe again
 * (connected components on the 2x rasters, alpha-weighted centroids, four
 * equal-count buckets by dot mass, `r` fitted so a dot keeps its raster's ink
 * and `o` its mean peak alpha, with the container's .7 folded into `o`): 558
 * dots at 1440, 842 at 768 and 465 at 390, four, three and two edge-clipped
 * fragments dropped. `r` carries a x1.036 calibration, since the antialiased SVG
 * dot comes out 7% light of its raster otherwise: checked against the rasters at 2x,
 * ink mass .995 / 1.018 / .996 and 16-px block correlation .992 / .990 / .992.
 * Paths are zero-length subpaths in quarter-pixel units (viewBox w x 4 by 2920).
 * ------------------------------------------------------------------ */
const LATTICE_TESTI_DOTS = {
  desktop: { w: 1440, h: 730, b: [
    { r: 0.90, o: 0.27, p: 'M1825 2126h0M1825 1981h0M1632 1987h0M1632 2133h0M1631 1843h0M1440 1995h0M2018 1976h0M2210 2118h0M1629 2279h0M1438 1851h0M2211 1972h0M2015 2268h0M2016 1831h0M1823 1836h0M2017 2121h0M1440 2141h0M1822 2272h0M1437 2287h0M2209 1827h0M2013 1687h0M1820 1692h0M1626 1699h0M1433 1706h0M2402 1825h0M2208 2264h0M2206 1683h0M1245 1860h0M1247 2005h0M1247 2150h0M1817 2419h0M1624 2425h0M1432 2433h0M1814 1548h0M2403 2116h0M1244 2296h0M2010 2415h0M1620 1555h0M2404 1970h0M1054 2016h0M2007 1543h0M2204 2412h0M1617 2573h0M2201 1539h0M1426 1562h0M2400 1680h0M1240 1715h0M1051 1870h0M1054 2161h0M2401 2263h0M1051 2308h0M1239 2443h0M2597 2116h0M2004 2562h0M2597 1970h0M2397 2411h0M1810 2567h0M1424 2581h0M2596 1824h0M1232 1571h0M2198 2560h0M2000 1399h0M1046 2454h0M1231 2591h0M2194 1395h0M1806 1405h0M1611 1411h0M2395 1536h0M1038 1581h0M2594 1678h0M1046 1726h0M858 1882h0M861 2028h0M861 2174h0M858 2321h0M2791 1970h0M2595 2263h0M1038 2602h0M1801 2715h0M1220 2739h0M1995 2711h0M1417 1419h0M1608 2721h0M1414 2729h0M2591 2411h0M1222 1427h0M2392 2559h0M1795 1262h0M852 1737h0M2791 2117h0M667 2188h0M853 2468h0M2788 1678h0M2790 1824h0M2190 2709h0M2590 1534h0M664 2335h0M1600 1268h0M2389 1391h0M2789 2265h0M667 2042h0M1990 1256h0M663 1896h0M2786 2414h0M1027 1437h0M1596 2871h0M2586 2561h0M1027 2751h0M1405 1276h0M2584 1389h0M843 1592h0M2384 2709h0M1790 2865h0M1210 1284h0M2784 1533h0M844 2616h0M1207 2888h0M2186 1251h0M2986 2120h0M1985 2861h0M1401 2879h0M659 2483h0M832 1448h0M2985 1826h0M2986 1973h0M2984 2269h0M657 1750h0M1783 1119h0M1587 1125h0M472 2057h0M473 2204h0M2580 2711h0M833 2764h0M2180 2860h0M1979 1113h0M1391 1132h0M2381 1248h0M648 1605h0M468 1910h0M470 2352h0' },
    { r: 0.92, o: 0.28, p: 'M651 2631h0M1014 1293h0M2981 2418h0M1013 2900h0M2983 1679h0M2780 1388h0M2782 2564h0M2376 2860h0M2175 1108h0M2577 1245h0M2980 1533h0M462 1764h0M3181 2125h0M465 2500h0M640 2780h0M1194 1141h0M2371 1104h0M3180 2274h0M457 2648h0M2776 2714h0M819 2914h0M636 1459h0M2572 2862h0M3181 1976h0M818 1303h0M3179 1681h0M3181 1829h0M2977 2569h0M998 1149h0M452 1618h0M278 2222h0M1768 976h0M2773 1243h0M1571 982h0M276 2370h0M277 2074h0M3177 2424h0M2976 1387h0M3176 1534h0M273 1927h0M271 2518h0M1965 970h0M1374 989h0M2568 1101h0M445 2797h0M2162 965h0M1176 997h0M621 1314h0M3377 2131h0M2972 2720h0M2360 961h0M439 1472h0M265 1780h0M800 1159h0M3378 1982h0M262 2668h0M2970 1242h0M2765 1098h0M3377 1833h0M3174 2575h0M2769 2866h0M3376 2281h0M3376 1685h0M3173 1388h0M255 1633h0M81 2093h0M3374 2432h0M978 1006h0M80 2390h0M1949 827h0M2558 957h0M602 1170h0M82 2241h0M3170 2728h0M251 2817h0M2966 2873h0M1751 833h0M76 1944h0M1354 847h0M423 1327h0M1552 840h0M780 1015h0M241 1486h0M75 2539h0M68 1797h0M2963 1097h0M3374 1537h0M67 2689h0M2148 822h0M3168 1242h0M1155 854h0M3372 2584h0M3575 2139h0M3575 1989h0M2756 954h0M2347 817h0M3574 1839h0M3574 2290h0M404 1181h0M3370 1390h0M57 1649h0M225 1340h0M56 2839h0M956 862h0M3573 1690h0M3165 2881h0M581 1025h0M3572 2442h0M1931 684h0M1731 690h0M757 871h0M3572 1541h0M3368 2738h0M1532 697h0M2955 952h0M2546 813h0M1332 704h0M3162 1096h0M3367 1243h0M43 1501h0M2131 679h0M1132 711h0M3570 2595h0M382 1036h0M2746 810h0M931 719h0M3773 1997h0M2332 674h0M204 1194h0M3773 1846h0M3773 2148h0M25 1354h0M3569 1393h0M3364 2892h0M557 880h0M3773 2301h0M3772 2454h0M3568 2749h0M3155 950h0' },
    { r: 0.96, o: 0.30, p: 'M3362 1096h0M3772 1696h0M2532 669h0M3771 1546h0M731 727h0M2946 806h0M181 1047h0M1508 554h0M3566 1245h0M1911 541h0M1709 547h0M356 891h0M3770 2608h0M3564 2905h0M1307 561h0M1105 568h0M3973 2160h0M2112 536h0M3769 1397h0M2734 665h0M3973 2007h0M3973 1855h0M3973 2313h0M529 736h0M3148 804h0M3768 2763h0M3563 1097h0M3972 1704h0M2314 530h0M903 575h0M3356 949h0M3972 2468h0M154 901h0M2936 661h0M701 583h0M3972 1553h0M2517 525h0M3767 1248h0M327 745h0M1685 404h0M1279 417h0M498 591h0M3971 2623h0M1482 411h0M1888 398h0M1076 424h0M2720 520h0M3350 802h0M3970 1402h0M2092 392h0M3764 1099h0M3558 949h0M4174 1866h0M4174 2019h0M4174 2173h0M3970 2779h0M3139 658h0M4174 2328h0M2295 386h0M124 755h0M4174 1713h0M872 432h0M3969 1252h0M4174 2483h0M2924 516h0M295 600h0M3553 801h0M2500 381h0M668 439h0M3761 950h0M4173 1560h0M3342 655h0M4173 2640h0M1658 261h0M1863 254h0M464 447h0M1453 267h0M1043 281h0M3968 1101h0M4173 1408h0M1248 274h0M2705 375h0M4376 2188h0M91 609h0M3128 512h0M4376 1878h0M4376 2032h0M2068 248h0M4173 2798h0M4376 2344h0M838 288h0M2274 242h0M4377 1723h0M4173 1256h0M4377 2501h0M2910 370h0M3758 800h0M259 455h0M4377 1570h0M3547 653h0M3966 951h0M2481 236h0M632 295h0M3334 508h0M4377 2659h0M4172 1105h0M4377 1416h0M1421 124h0M1214 130h0M4377 2818h0M2688 230h0M3117 365h0M53 463h0M1836 111h0M1628 117h0M426 302h0M4580 2048h0M4580 2205h0M4581 1892h0M1007 137h0M3754 651h0M3964 800h0M4581 2363h0M2043 104h0M4378 1263h0M4581 1736h0M2251 97h0M800 144h0M220 309h0M3541 505h0M4172 953h0M4581 2521h0M2896 224h0M593 150h0M4582 1580h0M3325 360h0M4582 2681h0M2460 91h0M4378 1109h0' },
    { r: 1.03, o: 0.34, p: 'M385 157h0M4583 1425h0M12 317h0M3749 502h0M3105 218h0M3961 650h0M4583 2841h0M2669 84h0M4171 801h0M4786 1907h0M4786 2065h0M4786 2224h0M3534 356h0M4787 2383h0M176 164h0M4379 956h0M4584 1270h0M4788 2543h0M4788 1749h0M2880 78h0M3314 213h0M549 6h0M4789 1592h0M4586 1115h0M4789 2704h0M3958 499h0M4170 649h0M340 12h0M3744 352h0M4791 1435h0M4791 2867h0M4380 802h0M3091 71h0M3526 207h0M4994 2084h0M4994 2245h0M130 18h0M4994 1924h0M4588 960h0M4994 2406h0M4793 1278h0M4996 2568h0M3303 64h0M4169 497h0M4996 1765h0M4381 649h0M4998 2731h0M3955 348h0M4796 1121h0M4998 1606h0M3738 202h0M4591 804h0M5000 1446h0M5000 2895h0M3517 57h0M4799 964h0M5203 2105h0M5204 2431h0M5203 2268h0M4168 344h0M5004 1288h0M4382 495h0M5204 1943h0M3952 196h0M4593 649h0M5205 2595h0M5206 1782h0M5208 2760h0M3732 51h0M5008 1129h0M4803 807h0M5209 1620h0M5212 1459h0M4167 191h0M4383 340h0M4596 493h0M5013 970h0M5415 2293h0M5216 1298h0M3948 44h0M5415 2129h0M5416 2458h0M4808 650h0M5416 1964h0M5418 1801h0M5417 2624h0M5420 2791h0M5422 1637h0M5018 811h0M5222 1137h0M4600 337h0M4384 186h0M5426 1474h0M4166 37h0M4813 492h0M5228 976h0M5432 1310h0M5628 2321h0M5024 651h0M5630 1988h0M5629 2154h0M5631 2656h0M5629 2488h0M5633 1821h0M5634 2825h0M5235 815h0M5438 1147h0M4386 30h0M4603 181h0M4818 334h0M5637 1656h0M5031 492h0M5643 1490h0M5446 984h0M5243 653h0M5649 1324h0M4607 23h0M4824 176h0M5039 331h0M5454 820h0M5657 1158h0M5252 491h0M5666 992h0M5464 656h0M4831 16h0M5048 171h0M5262 329h0M5676 826h0M5475 492h0M5057 9h0M5688 659h0M5273 166h0M5488 327h0M5701 492h0M5501 161h0M5716 325h0M5732 157h0' },
  ] },
  tablet: { w: 768, h: 730, b: [
    { r: 0.90, o: 0.28, p: 'M871 1741h0M1075 1658h0M870 1664h0M1076 1735h0M973 1738h0M973 1815h0M870 1819h0M1179 1733h0M768 1746h0M767 1668h0M1075 1891h0M869 1897h0M972 1661h0M1179 1811h0M1076 1813h0M972 1893h0M768 1823h0M766 1901h0M1178 1656h0M1073 1581h0M969 1972h0M866 1975h0M970 1584h0M867 1587h0M764 1591h0M664 1673h0M665 1750h0M665 1828h0M664 1906h0M1177 1889h0M1177 1579h0M1282 1810h0M661 1984h0M562 1834h0M764 1979h0M967 1507h0M864 1511h0M1281 1655h0M1282 1732h0M1072 1969h0M1071 1504h0M661 1596h0M1281 1888h0M1175 1968h0M862 2054h0M1174 1502h0M561 1679h0M562 1756h0M561 1912h0M760 2058h0M761 1515h0M1385 1732h0M1069 2048h0M966 2050h0M1280 1577h0M1385 1654h0M1385 1810h0M657 1519h0M1278 1967h0M963 1431h0M1067 1428h0M558 1602h0M459 1763h0M459 1841h0M1384 1888h0M656 2063h0M859 1434h0M1383 1576h0M458 1919h0M558 1990h0M1172 2047h0M857 2133h0M756 1438h0M1277 1500h0M554 1525h0M457 1685h0M961 2130h0M454 1608h0M1489 1732h0M1382 1967h0M1170 1425h0M1488 1811h0M1276 2046h0M754 2137h0M957 1354h0M652 1443h0M553 2069h0M1064 2127h0M1381 1499h0M1487 1576h0M1488 1654h0M651 2142h0M1062 1351h0M853 1358h0M1488 1889h0M455 1997h0M1274 1423h0M354 1927h0M1168 2126h0M356 1770h0M356 1848h0M1379 2047h0M450 1531h0M1166 1349h0M1486 1969h0M450 2076h0M851 2212h0M749 1362h0M548 1448h0M352 2006h0M548 2148h0M747 2217h0M1592 1655h0M354 1692h0M1272 2126h0M955 2209h0M645 1366h0M1485 1499h0M350 1615h0M1592 1733h0M347 2085h0M1270 1347h0M1378 1422h0M444 1453h0M1059 2207h0M1592 1812h0M846 1281h0M252 1778h0M1592 1891h0M1055 1275h0M541 1371h0M250 1700h0M252 1857h0M251 1936h0M1484 2049h0M1376 2127h0M444 2156h0M1163 2206h0M644 2222h0M540 2228h0M742 1285h0M1591 1577h0M951 1278h0M1590 1971h0M346 1537h0M1482 1421h0M1374 1345h0M1589 1499h0M248 2014h0M1160 1272h0M1267 2207h0M341 2164h0M637 1290h0M1697 1735h0M948 2290h0M843 2293h0M246 1622h0M1588 2051h0M1052 2288h0M739 2297h0M1697 1815h0M244 2094h0M1480 2129h0M437 2235h0M636 2302h0M1265 1270h0M436 1376h0M241 1544h0M1695 1578h0M1696 1657h0M1696 1894h0M339 1460h0M1156 2287h0M532 1294h0M1372 2208h0M148 1866h0M943 1202h0M838 1205h0M532 2308h0M148 1788h0M1695 1974h0M1153 1196h0M1587 1421h0M147 1945h0M1048 1199h0M1479 1344h0M144 2024h0M1370 1268h0M1694 1500h0M333 2244h0M733 1209h0M145 1709h0M238 2173h0M1261 2288h0M428 2315h0M234 1467h0M1477 2210h0M730 2378h0M627 1213h0M142 1630h0M1693 2055h0M1585 2132h0M834 2374h0M1259 1194h0M427 1300h0M1801 1818h0M140 2104h0M1044 2369h0M331 1382h0M1801 1738h0' },
    { r: 0.93, o: 0.29, p: 'M1801 1659h0M939 2371h0M626 2383h0M1584 1344h0M1801 1898h0M1366 2289h0M230 2253h0M1475 1267h0M324 2324h0M1692 1422h0M1149 2369h0M43 1797h0M44 1877h0M522 2389h0M1800 1979h0M828 1129h0M522 1218h0M136 1552h0M1800 1580h0M934 1126h0M1364 1192h0M321 1305h0M226 1389h0M134 2184h0M1582 2214h0M1040 1122h0M1799 1501h0M43 1956h0M40 2036h0M417 2396h0M129 1474h0M1691 2136h0M1472 2292h0M1255 2370h0M1145 1120h0M1580 1266h0M722 1133h0M41 1718h0M1798 2060h0M36 2115h0M616 1137h0M36 1640h0M1907 1822h0M824 2455h0M719 2459h0M416 1223h0M1690 1344h0M126 2264h0M220 2334h0M1907 1742h0M929 2453h0M1252 1117h0M1798 1423h0M1035 2452h0M614 2464h0M1470 1190h0M215 1311h0M1906 1662h0M1906 1903h0M1360 2371h0M313 2405h0M1141 2451h0M30 2195h0M1688 2218h0M1906 1583h0M510 1141h0M310 1228h0M30 1561h0M510 2470h0M1905 1984h0M1578 2296h0M405 2477h0M1576 1189h0M120 1396h0M116 2344h0M923 1049h0M23 1482h0M1796 2141h0M22 2276h0M1467 2374h0M209 2414h0M1247 2452h0M1796 1344h0M1030 1046h0M817 1053h0M1358 1115h0M1686 1266h0M1905 1503h0M710 1057h0M404 1146h0M604 1060h0M1904 2065h0M1137 1043h0M204 1234h0M109 1318h0M812 2538h0M1464 1113h0M2012 1746h0M1684 2301h0M1354 2454h0M301 2486h0M918 2536h0M2012 1827h0M2012 1586h0M707 2541h0M1243 1041h0M13 1404h0M1904 1424h0M2012 1666h0M2012 1908h0M1794 2224h0M105 2425h0M1025 2534h0M602 2546h0M497 1065h0M12 2356h0M1573 2379h0M297 1151h0M496 2552h0M1683 1188h0M2012 1990h0M1793 1266h0M1903 2148h0M196 2496h0M1131 2534h0M390 1069h0M1571 1112h0M2011 1506h0M391 2559h0M912 973h0M1351 1038h0M1460 2458h0M804 977h0M1238 2536h0M1902 1345h0M697 980h0M190 1156h0M97 1240h0M1019 970h0M2011 2072h0M287 2568h0M1458 1036h0M1680 2384h0M92 2506h0M693 2624h0M589 984h0M2010 1426h0M1791 2307h0M1127 967h0M2119 1833h0M1901 2230h0M2119 1752h0M800 2621h0M1346 2538h0M587 2629h0M1679 1110h0M1234 964h0M1900 1266h0M2119 1915h0M2010 2155h0M906 2619h0M481 2635h0M282 1074h0M2118 1590h0M2119 1671h0M1568 2462h0M182 2577h0M1790 1188h0M482 988h0M2118 1997h0M1566 1034h0M376 2642h0M1121 2619h0M82 1162h0M1013 2618h0M1342 961h0M374 992h0M174 1079h0M2009 1347h0M2118 1509h0M1899 2314h0M1788 2391h0M1454 2542h0M1676 2468h0M77 2588h0M2118 2080h0M2008 2238h0M899 897h0M790 900h0M1007 894h0M682 904h0M1451 959h0M1787 1109h0M1229 2620h0M271 2650h0M1898 1188h0M2118 1429h0M2226 1758h0M266 997h0M1116 890h0M574 908h0M2008 1267h0M2226 1676h0M2226 1923h0M2226 1840h0M1337 2623h0M166 2659h0M2117 2164h0M1674 1032h0M1562 2547h0' },
    { r: 0.98, o: 0.32, p: 'M1224 887h0M66 1084h0M465 912h0M2007 2323h0M1896 2399h0M2226 1595h0M1784 2476h0M2226 2006h0M1559 956h0M2226 1514h0M2117 1349h0M1446 2628h0M61 2670h0M1333 884h0M157 1001h0M356 916h0M2116 2248h0M1671 2554h0M2226 2089h0M2006 1188h0M1783 1031h0M1895 1109h0M884 820h0M666 828h0M2116 1269h0M2226 1432h0M775 824h0M1443 882h0M1555 2633h0M994 817h0M556 831h0M248 920h0M2334 1848h0M2334 1683h0M2005 2408h0M1893 2484h0M1668 954h0M48 1006h0M2334 1765h0M2226 2173h0M1103 814h0M1780 2561h0M447 835h0M2334 1932h0M2116 2332h0M2334 1600h0M1213 810h0M2334 2015h0M1892 1030h0M2225 1352h0M2004 1108h0M1552 879h0M138 924h0M2115 1188h0M337 838h0M1323 807h0M2334 1518h0M2225 2258h0M1665 2640h0M1778 952h0M2334 2100h0M2225 1270h0M2003 2494h0M868 744h0M758 747h0M2114 2418h0M1890 2570h0M1662 876h0M28 928h0M2334 1436h0M1434 804h0M227 842h0M2225 2344h0M979 740h0M648 751h0M2443 1774h0M2335 2184h0M2443 1857h0M1775 2648h0M2443 1690h0M537 754h0M2114 1108h0M2002 1029h0M1090 737h0M2443 1941h0M1888 950h0M427 758h0M117 846h0M2335 1355h0M1201 733h0M1544 801h0M2443 1607h0M2443 2026h0M2225 1190h0M2335 2270h0M316 762h0M2444 1524h0M2113 2505h0M2001 2580h0M1773 874h0M2444 2111h0M2225 2430h0M1312 730h0M2335 1273h0M1886 2657h0M7 850h0M2444 2197h0M205 765h0M2112 1028h0M2444 1441h0M1656 798h0M2335 2356h0M1999 949h0M739 671h0M851 667h0M2224 1109h0M2553 1783h0M2553 1867h0M1424 726h0M628 674h0M1885 871h0M963 663h0M1075 660h0M2553 1952h0M516 678h0M2553 1698h0M2112 2592h0M94 769h0M2553 2038h0M405 681h0M2445 1358h0M2445 2283h0M1998 2668h0M2553 1614h0M2224 2517h0M2336 1191h0M1536 723h0M1768 795h0M1187 656h0M2554 2124h0M2336 2443h0M293 684h0M2554 1530h0M2111 948h0M2224 1028h0M2446 2370h0M2446 1276h0M1300 652h0M181 688h0M2555 1447h0M1997 869h0M2555 2210h0M1648 719h0M2224 2605h0M2336 1109h0M1413 648h0M2336 2531h0M1880 792h0M2110 2681h0M2663 1793h0M832 590h0M719 594h0M606 597h0M2447 1193h0M2663 1878h0M945 586h0M494 601h0M2664 1964h0M2556 2297h0M69 691h0M2556 1363h0M2664 1708h0M1059 582h0M381 604h0M2664 2051h0M2664 1622h0M2447 2458h0M1526 644h0M2109 867h0M1762 716h0M2224 946h0M2666 1538h0M1172 578h0M2336 1027h0M2665 2138h0M268 607h0M2558 1279h0M2558 2385h0M1994 789h0M2448 1110h0M2336 2620h0M2667 2225h0M2223 2694h0M155 610h0M1286 574h0M2667 1453h0M1876 712h0M1640 640h0M2448 2546h0M1401 570h0M2560 1196h0M2560 2474h0M812 513h0M697 516h0M42 613h0M2223 865h0M2669 1368h0M2775 1891h0M2668 2313h0M2775 1804h0' },
    { r: 1.07, o: 0.36, p: 'M2775 1978h0M583 520h0M2337 945h0M2776 1718h0M469 524h0M2776 2065h0M926 509h0M2108 786h0M2776 1632h0M1755 636h0M2450 1028h0M355 527h0M1041 505h0M2450 2636h0M2337 2710h0M241 530h0M1516 566h0M2670 2402h0M2778 1546h0M2778 2153h0M1990 708h0M2671 1283h0M1156 500h0M2562 2563h0M2562 1112h0M2779 2242h0M127 533h0M2780 1460h0M1272 496h0M1870 632h0M1632 561h0M2222 783h0M12 536h0M2673 2491h0M2338 863h0M2451 944h0M2673 1199h0M2781 2330h0M2452 2726h0M2106 705h0M2782 1374h0M2888 1992h0M2888 1817h0M2564 1028h0M790 435h0M674 439h0M2889 1729h0M2888 1904h0M1388 491h0M2564 2653h0M558 443h0M1748 556h0M2889 2081h0M442 446h0M327 449h0M906 431h0M2890 1642h0M2784 2420h0M2676 2582h0M1986 628h0M2891 2170h0M1022 427h0M1505 486h0M212 452h0M2676 1114h0M2785 1288h0M2892 1554h0M2893 2259h0M2338 780h0M1139 422h0M2453 861h0M96 455h0M2567 944h0M2894 1467h0M1622 481h0M1865 551h0M2222 701h0M2787 2510h0M1256 417h0M2567 2745h0M2788 1202h0M2895 2349h0M2679 2673h0M2103 623h0M2680 1029h0M2897 1380h0M3002 1830h0M1374 412h0M3002 2008h0M3002 1919h0M531 365h0M3003 1741h0M3003 2098h0M2791 2602h0M2899 2440h0M648 361h0M414 369h0M766 357h0M1740 476h0M1982 546h0M3004 1653h0M2792 1116h0M883 353h0M2455 778h0M297 372h0M3005 2188h0M1493 407h0M2339 697h0M2570 860h0M2900 1293h0M1002 348h0M3007 1564h0M180 375h0M2683 2765h0M3007 2279h0M2221 619h0M63 377h0M2902 2531h0M2683 944h0M3009 1476h0M1120 343h0M2795 2694h0M1859 470h0M2904 1206h0M3010 2370h0M1612 401h0M2796 1030h0M2101 541h0M1239 338h0M3013 1387h0M2907 2623h0M2457 694h0M2573 775h0M3014 2461h0M1978 465h0M2909 1119h0M2340 614h0M2687 858h0M1359 333h0M1731 395h0M2800 2786h0M3017 1299h0M2220 536h0M1480 327h0M3018 2554h0M2801 943h0M2912 2716h0M1852 389h0M2914 1031h0M3022 1210h0M2098 459h0M2577 690h0M1600 321h0M2692 772h0M2460 609h0M3024 2647h0M2806 857h0M2917 2810h0M2341 530h0M1973 383h0M3027 1122h0M1722 314h0M2220 453h0M2920 944h0M3029 2740h0M1845 307h0M2580 605h0M2697 686h0M2812 770h0M2095 376h0M2462 525h0M3034 1033h0M3036 2835h0M2927 856h0M2342 446h0M1968 300h0M3041 944h0M2219 369h0M2703 600h0M2585 519h0M2819 682h0M2934 767h0M2465 440h0M2092 292h0M3048 855h0M2343 361h0M2708 513h0M2826 595h0M2942 679h0M2589 433h0M2218 284h0M3057 765h0M2468 354h0M2344 276h0M2834 507h0M2715 425h0M2950 590h0M2594 346h0M2471 267h0M2960 500h0M2842 418h0M2722 337h0M2600 258h0M2970 410h0M2851 329h0M2730 249h0M2981 319h0M2861 239h0M2993 228h0' },
  ] },
  mobile: { w: 390, h: 730, b: [
    { r: 0.90, o: 0.27, p: 'M147 1801h0M343 1722h0M245 1724h0M245 1798h0M342 1648h0M244 1651h0M148 1727h0M440 1794h0M50 1805h0M244 1872h0M48 1879h0M50 1731h0M343 1795h0M341 1869h0M147 1654h0M146 1875h0M49 1658h0M242 1578h0M441 1720h0M145 1581h0M440 1646h0M46 1953h0M340 1575h0M47 1585h0M241 1946h0M144 1949h0M439 1868h0M141 1508h0M539 1719h0M339 1944h0M43 1512h0M338 1502h0M438 1573h0M538 1645h0M538 1793h0M437 1942h0M238 2021h0M239 1505h0M636 1793h0M537 1867h0M336 2019h0M436 1500h0M536 1571h0M140 2024h0M42 2028h0M636 1644h0M535 1942h0M637 1718h0M235 1432h0M334 1429h0M434 2018h0M135 2099h0M137 1435h0M38 1439h0M534 1498h0M635 1867h0M432 1427h0M635 1571h0M735 1793h0M37 2103h0M735 1719h0M532 2017h0M332 2094h0M531 1425h0M633 1497h0M735 1644h0M734 1868h0M634 1942h0M430 2093h0M233 2096h0M131 1363h0M230 1359h0M329 1357h0M733 1571h0M32 1366h0M428 1354h0M631 2018h0M630 1424h0M529 2093h0M30 2179h0M732 1497h0M834 1795h0M732 1944h0M326 2170h0M227 2172h0M129 2175h0M833 1645h0M834 1720h0M833 1870h0M628 2094h0M224 1287h0M25 1294h0M527 1352h0M425 2170h0M323 1284h0M832 1571h0M730 2020h0M124 1290h0M729 1423h0M831 1946h0M626 1351h0M423 1282h0M524 2170h0M122 2252h0M221 2249h0M831 1497h0M320 2247h0M727 2096h0M23 2255h0M522 1280h0M933 1722h0M932 1647h0M933 1797h0M932 1873h0M829 2022h0M624 2171h0' },
    { r: 0.93, o: 0.29, p: 'M932 1572h0M419 2246h0M726 1350h0M828 1423h0M216 1215h0M116 1218h0M622 1278h0M316 1212h0M931 1949h0M519 2247h0M930 1498h0M16 1221h0M416 1209h0M213 2326h0M113 2328h0M827 2099h0M1032 1800h0M929 2026h0M724 2173h0M312 2324h0M14 2332h0M1032 1876h0M826 1349h0M516 1207h0M722 1277h0M1032 1649h0M1032 1724h0M619 2248h0M412 2324h0M208 1142h0M1031 1574h0M107 1145h0M928 1424h0M824 2176h0M1031 1953h0M1030 1499h0M512 2325h0M308 1139h0M6 1149h0M719 2251h0M409 1137h0M617 1205h0M926 1349h0M822 1276h0M1029 2030h0M927 2103h0M1132 1728h0M203 2404h0M103 2406h0M1132 1804h0M1132 1652h0M717 1203h0M1132 1881h0M510 1134h0M1029 1424h0M613 2326h0M304 2402h0M924 2181h0M820 2254h0M1132 1576h0M1131 1958h0M404 2402h0M611 1132h0M1028 2108h0M198 1070h0M96 1073h0M1131 1501h0M299 1067h0M923 1275h0M818 1202h0M1027 1350h0M714 2329h0M505 2403h0M1130 2035h0M400 1064h0M92 2484h0M921 2259h0M712 1130h0M1129 1426h0M1233 1732h0M1025 2186h0M1232 1580h0M193 2482h0M1233 1656h0M1232 1886h0M606 2405h0M294 2481h0M502 1061h0M1233 1809h0M1129 2114h0M815 2333h0M920 1202h0M1024 1275h0M1232 1964h0M604 1059h0M395 2481h0M814 1129h0M1232 1504h0M84 1001h0M1128 1351h0M187 997h0M708 2408h0M1231 2042h0M289 994h0M917 2338h0M497 2483h0M1023 2265h0M391 991h0M1231 1428h0M1334 1737h0M1334 1815h0M1127 2192h0M80 2564h0M706 1057h0M493 989h0M1021 1201h0' },
    { r: 0.96, o: 0.30, p: 'M1334 1660h0M181 2562h0M599 2485h0M1126 1276h0M1334 1584h0M1230 2121h0M810 2413h0M283 2561h0M916 1128h0M1334 1893h0M596 986h0M385 2561h0M1230 1352h0M1334 1971h0M808 1055h0M1333 1507h0M1020 2345h0M702 2489h0M1125 2272h0M71 928h0M1229 2200h0M1124 1201h0M1333 2050h0M913 2418h0M277 922h0M174 925h0M1333 1431h0M488 2563h0M1018 1127h0M699 984h0M1436 1743h0M380 919h0M1228 1277h0M1436 1821h0M1332 2129h0M911 1053h0M1436 1900h0M1436 1666h0M804 2493h0M591 2566h0M484 916h0M1436 1979h0M1436 1588h0M1122 2352h0M1016 2425h0M1228 2280h0M802 981h0M1332 1354h0M694 2570h0M587 913h0M1436 1511h0M1436 2058h0M1332 2209h0M1014 1052h0M1121 1126h0M908 2500h0M1227 1201h0M56 855h0M1436 1434h0M264 849h0M160 852h0M906 979h0M1331 1278h0M1539 1829h0M1226 2361h0M1539 1672h0M691 910h0M798 2575h0M369 846h0M1538 1750h0M1435 2138h0M1120 2433h0M1539 1908h0M1331 2289h0M1012 2507h0M473 842h0M1539 1594h0M1435 1357h0M1539 1988h0M795 908h0M1118 1051h0M1330 1202h0M1225 1126h0M1010 977h0M1539 1516h0M1539 2068h0M1435 2219h0M902 2581h0M578 840h0M1435 1280h0M1330 2371h0M1224 2442h0M1116 2515h0M145 779h0M40 783h0M900 905h0M1539 1438h0M1539 2148h0M1435 2300h0M250 776h0M683 836h0M1329 1126h0M356 773h0M1007 2589h0M1223 1050h0M1539 1360h0M1435 1203h0M461 769h0M1115 976h0M1539 2230h0M788 833h0M1005 903h0M1329 2453h0M1435 2382h0M1222 2525h0M567 766h0' },
    { r: 1.03, o: 0.34, p: 'M1540 1282h0M1113 2598h0M1328 1049h0M894 830h0M1220 974h0M1540 2312h0M23 710h0M129 706h0M1434 1126h0M235 703h0M1111 900h0M673 762h0M342 699h0M1327 2536h0M1540 1204h0M1434 2465h0M1219 2608h0M780 759h0M1540 2394h0M448 696h0M1000 828h0M1326 973h0M555 692h0M1434 1049h0M1218 898h0M887 756h0M1540 1127h0M1434 2548h0M1107 825h0M1540 2478h0M1326 2620h0M663 688h0M218 630h0M111 633h0M326 626h0M994 752h0M1434 972h0M771 685h0M1325 896h0M434 622h0M1541 1049h0M1433 2633h0M1215 822h0M1541 2562h0M879 681h0M543 618h0M1103 749h0M1541 971h0M92 560h0M652 614h0M1433 894h0M200 556h0M1323 819h0M988 677h0M310 552h0M1542 2648h0M761 610h0M1212 746h0M419 548h0M1098 673h0M529 544h0M1542 892h0M871 605h0M1432 817h0M1321 742h0M639 539h0M70 486h0M981 601h0M181 482h0M1208 669h0M292 478h0M750 534h0M403 473h0M1542 814h0M1432 739h0M1092 596h0M862 530h0M514 469h0M1319 665h0M626 464h0M48 412h0M974 525h0M1204 592h0M160 408h0M1543 735h0M272 403h0M739 459h0M1431 660h0M385 399h0M1086 519h0M852 454h0M1317 587h0M498 394h0M612 388h0M1200 514h0M966 448h0M1544 656h0M726 383h0M1430 582h0M1080 442h0M1314 508h0M841 377h0M1545 576h0M1196 436h0M957 371h0M1430 502h0M1073 364h0M1312 430h0M1546 496h0M1191 357h0M1429 423h0M1309 350h0M1547 416h0M1428 343h0M1548 335h0' },
  ] },
}
const testiDotUris = {}
export function latticeTestiDots(dev, ink = '#111111') {
  const v = LATTICE_TESTI_DOTS[dev] || LATTICE_TESTI_DOTS.desktop
  const key = dev + ink
  return testiDotUris[key] || (testiDotUris[key] = {
    h: v.h,
    uri: 'data:image/svg+xml,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${v.w * 4} ${v.h * 4}" preserveAspectRatio="xMidYMid slice">` +
      v.b.map((q) => `<path d="${q.p}" fill="none" stroke="${ink}" stroke-opacity="${q.o}" stroke-width="${+(q.r * 8).toFixed(2)}" stroke-linecap="round"/>`).join('') +
      '</svg>'),
  })
}

/* ------------------------------------------------------------------ *
 * The header title's fit (plans/header-fit.md, user call 2026-11-18):
 * a long name is set smaller, gradually, until the title block fits the
 * share of the header a title may take, and never below half the size its
 * layout draws. The page's own fits only ever read WIDTH (`100cqi / ems`);
 * this reads the wrapped block's HEIGHT as well, in the same per-face ems.
 * `sectionVm` calls it once per header and hands EncoreSection one number,
 * `titleK` (the fraction of the layout's own size), so EncoreSection does no
 * maths and every seed (k = 1) renders as it always did.
 * ------------------------------------------------------------------ */
export const TITLE_FIT = {
  floor: 0.5,   // never below this fraction of the layout's own size
  share: 0.4,   // the title block's share of the header's height (the knob)
  margin: 1.01, // the tables are within 0.5% of the DOM, a hair over; this is the rest
}

// The header's title sites, by template then design (arch % designCount), each
// `[desktop, tablet, mobile]` where it has three numbers. Read off the renders
// (scripts/title-fit-sites.mjs prints them), not derived:
//   b     the size the layout sets the name at, unfaced px (the ramp token)
//   lh    its line height, a multiple of that size
//   il    1 = the whole name is one wrapping run, 0 = word 1 stands on its own
//         line and the rest wraps below it (Title's `inline`)
//   W     the width the name wraps in
//   R     the header's own height, which `share` takes a part of
//   room  where the title has less than that before it meets a neighbour
//   bs    layout 1 only: the room beside the portrait card, which a one-line
//         name keeps; wider than that and the name drops under the card at W
const TS = (b, lh, il, W, R, room, bs) => ({ b, lh, il, W, R, room, bs })
export const TITLE_SITES = {
  Retro: [
    TS([105, 77, 77], 0.75, [1, 1, 0], [1088, 708, 370], [614, 1024, 844], [223.8, 640, 514], [897, 540, 0]),
    TS([79, 60, 40], 0.89, [1, 1, 1], [521, 324, 370], [740, 870, 660], [214]),
    TS([78.72, 60, 40], 0.89, [1, 1, 1], [876.6, 417.7, 350], [738, 1024, 844]),
    TS([104.96, 77, 48], 0.75, [0, 1, 1], [806.1, 561.5, 350], [738, 1024, 844]),
    TS([46, 36, 29], 0.92, [0, 0, 0], [284, 284, 284], [738, 668, 588]),
    TS([86, 60, 29], 0.92, [0, 0, 0], [1040, 660, 334], [670, 545, 550]),
  ],
  Lime: [
    TS([164, 120, 120], 0.75, [1, 1, 0], [1088, 708, 370], [614, 1024, 844], [234.4, 624, 503], [880.3, 540, 0]),
    TS([107, 81, 54], 0.89, [1, 1, 1], [521, 324, 370], [739, 871, 642], [276]),
    TS([107, 81, 54], 0.89, [1, 1, 1], [894.7, 440, 350], [738, 1024, 606]),
    TS([164, 120, 72], 0.75, [0, 1, 1], [806.1, 561.5, 350], [738, 1024, 844]),
  ],
  Grunge: [
    TS([162, 95, 95], 0.75, [1, 1, 1], [1088, 708, 370], [614, 1024, 844], [234.4, 624, 503], [880.3, 540, 0]),
    TS([107, 81, 46], 0.89, [1, 1, 1], [521, 324, 370], [740, 871, 642], [291]),
    TS([107, 81, 46], 0.89, [1, 1, 1], [894.7, 440, 350], [738, 1024, 606]),
    TS([162, 95, 52], 0.75, [1, 1, 1], [806.1, 561.5, 350], [738, 1024, 844]),
  ],
  Editorial: [
    TS([147, 107, 107], 0.75, [1, 1, 1], [880.3, 540, 370], [614, 1024, 844], [428, 792, 380]),
    TS([97, 73, 48], 0.89, [1, 1, 1], [521, 324, 370], [740, 913, 656], [309]),
    TS([97, 73, 48], 0.89, [1, 1, 1], [894.7, 440, 350], [738, 1024, 663]),
    TS([147, 107, 64], 0.75, [0, 1, 1], [806.1, 561.5, 350], [738, 1024, 844]),
  ],
  Pop: [
    TS([103, 75, 75], 0.75, [1, 1, 1], [880.3, 540, 370], [614, 1024, 844], [428, 792, 503]),
    TS([67, 51, 36], 0.89, [1, 1, 1], [521, 324, 370], [800, 811, 682]),
    TS([67, 51, 36], 0.89, [1, 1, 1], [894.7, 440, 350], [738, 1024, 606]),
    TS([103, 75, 46], 0.75, [0, 1, 1], [806.1, 561.5, 350], [738, 1024, 844]),
  ],
  // Lattice's layout-1 header (HeaderV0): one wrapping run at 105 / 79 / 51 at lh 0.86 in the
  // frame's own column (915.72 x 0.82 at 1440, then the whole row beside the card at 768 and the
  // whole row under it at 390), in a hero that is 750 at the two narrow widths. The seed is one
  // line at 1440 and two at 768 and 390; the name never drops under the card, so there is no
  // `bs` and no `room`. Layouts 2-4 are placeholders and copy Pop's rows.
  Lattice: [
    TS([105, 79, 51], 0.86, [1, 1, 1], [751, 489.8, 342], [614, 750, 750]),
    TS([67, 51, 36], 0.89, [1, 1, 1], [521, 324, 370], [800, 811, 682]),
    TS([67, 51, 36], 0.89, [1, 1, 1], [894.7, 440, 350], [738, 1024, 606]),
    TS([103, 75, 46], 0.75, [0, 1, 1], [806.1, 561.5, 350], [738, 1024, 844]),
  ],
  // Paperback's layout-1 header (HeaderV0): one wrapping run at 113 / 86 / 55 (the frame's 138.24 x
  // 0.82 at 1440, 86 and 55 verbatim) at lh 0.8, set -0.035em in Bricolage ExtraBold. W is the room the
  // name has, in the frame's px x 0.82 at 1440: 640 frame px (the frame's own column is 617.64, which
  // its 623 px seed overruns by 5, so the exact column would wrap the seed) stops short of the photo
  // card's foot corner at x 884; at 768 the row between the avatar's 184 and the right gutter; at 390
  // the stage. The hero is 750 at the two narrow widths, so R is 750 there. The name grows upward (its
  // column is anchored at the foot), so there is no `room` and no `bs`. Layouts 2-4 copy Pop's rows.
  Paperback: [
    TS([113, 86, 55], 0.8, [1, 1, 1], [524.8, 531.7, 342], [614, 750, 750]),
    TS([67, 51, 36], 0.89, [1, 1, 1], [521, 324, 370], [800, 811, 682]),
    TS([67, 51, 36], 0.89, [1, 1, 1], [894.7, 440, 350], [738, 1024, 606]),
    TS([103, 75, 46], 0.75, [0, 1, 1], [806.1, 561.5, 350], [738, 1024, 844]),
  ],
  // Headliner's layout-1 header (HeadlinerHero): one wrapping run in Anton at 267.84 / 156 / 58 frame px (x 0.82 at
  // 1440 = 219.63), lh 0.98, set -0.005em, anchored by its foot so a longer name grows upward. W is the room between
  // the gutters (the frame's own text box: 1342.08 x 0.82 at 1440, 715.77 at 768, 342 at 390) and the hero is 738 /
  // 900 / 900 tall. The seed ("KAI MERCER", 4.37em) is one line at every width; the ring and the block arrow stand
  // right of x 1241 x 0.82, past W, so there is no `room` and no `bs`. Layouts 2-4 copy Pop's rows.
  Headliner: [
    TS([219.63, 156, 58], 0.98, [1, 1, 1], [1100.5, 715.8, 342], [738, 900, 900]),
    TS([67, 51, 36], 0.89, [1, 1, 1], [521, 324, 370], [800, 811, 682]),
    TS([67, 51, 36], 0.89, [1, 1, 1], [894.7, 440, 350], [738, 1024, 606]),
    TS([103, 75, 46], 0.75, [0, 1, 1], [806.1, 561.5, 350], [738, 1024, 844]),
  ],
}

// The lines a name takes set at size `s` in a column `W` wide: greedy word wrap
// in ems; a word wider than the column never fits (Infinity), and when `inline`
// is false word 1 stands alone on the first line.
function titleLines(words, space, s, W, inline) {
  // A word fits when its own width does (the layouts' widest-word fits are exact,
  // so this one is too: a seed they already fit must come back as it was); the
  // margin is spent on where a line breaks.
  const word = W / s
  const room = word / TITLE_FIT.margin
  let lines = 0
  let rest = words
  if (!inline) {
    if (words[0] > word) return Infinity
    lines = 1
    rest = words.slice(1)
  }
  let cur = -1
  for (const w of rest) {
    if (w > word) return Infinity
    if (cur >= 0 && cur + space + w <= room) cur += space + w
    else { lines++; cur = w }
  }
  return lines
}

// The largest size, between `floor × base` and `base`, at which the name's
// wrapped block fits `H` (or, with `beside`, the whole name stands on one line
// beside the portrait card). `base` back when it already fits: the seeds.
export function fitTitleSize({ words, space, inline, W, H, lh, base, beside = 0, minLines = 2, floor = TITLE_FIT.floor }) {
  if (!words.length) return base
  // `minLines` lines at the layout's own size always stand (a seed that wraps in
  // its own frame is the frame's); layout 1 has a one-line seed, and its stacked
  // room is smaller than two lines at Lime's and Grunge's size, so it takes one.
  const room = Math.max(H, minLines * lh * base)
  const whole = words.reduce((a, w) => a + w, 0) + space * (words.length - 1)
  const ok = (s) => (beside && whole * s * TITLE_FIT.margin <= beside) || titleLines(words, space, s, W, inline) * lh * s <= room
  if (ok(base)) return base
  const min = base * floor
  for (let s = base; s >= min; s *= 0.996) {
    if (!ok(s)) continue
    // Settle the last 0.4% by bisection, so a name a layout's own exact width fit
    // already handles comes back at that fit's size and not a step under it.
    let lo = s, hi = s / 0.996
    for (let i = 0; i < 24; i++) { const mid = (lo + hi) / 2; if (ok(mid)) lo = mid; else hi = mid }
    return lo
  }
  return min
}

// A header's fit as [the fraction of its own size, the floor it is held to], from the name's
// words in ems. 1 for a name that needs no help, and for a design with no site. The floor is
// half the layout's size at its frame and falls with a page narrower than the frame, which is
// drawn proportionally smaller (plans/header-fit.md).
export function titleFitK(themeName, design, dev, words, space, pageW) {
  const site = TITLE_SITES[themeName]?.[design]
  const i = { desktop: 0, tablet: 1, mobile: 2 }[dev]
  if (!site || i == null || !words.length) return [1, TITLE_FIT.floor]
  const pick = (v) => (v.length > 1 ? v[i] : v[0])
  const base = site.b[i]
  let W = site.W[i], R = site.R[i], room = site.room ? pick(site.room) : Infinity, beside = site.bs?.[i] || 0
  // A page laid out narrower than the frame it was drawn at: the editor's desktop canvas (as wide as
  // the window leaves it, up to 1180) and a published page on a phone narrower than 390. Layout 1's
  // root is an aspect ratio, so it loses height in proportion as well as width, none of which the
  // fixed nav, card and tags give back: the room shrinks by all of it. Every other layout's root grows
  // with its content, so it only loses width. (plans/header-fit.md)
  const nominal = [1180, 768, 390][i]
  const dw = pageW && pageW < nominal ? nominal - pageW : 0
  const floor = TITLE_FIT.floor * (dw ? pageW / nominal : 1)
  if (dw) {
    W -= dw
    beside = beside && beside - dw
    if (design === 0) { const dr = R - (R * pageW) / nominal; R -= dr; room -= dr }
    // the room is read off the frame; a narrower page gets a margin on it
    room *= 0.94
  }
  // The name may not stand taller than two of its lines at the layout's own size: a third line is
  // where it starts to shrink (user call, 2026-11-18: the text must visibly get smaller as it wraps).
  const H = Math.min(TITLE_FIT.share * R, room, 2 * site.lh * base)
  const size = fitTitleSize({
    words, space, inline: !!site.il[i], W, H, lh: site.lh, base, beside, minLines: site.bs ? 1 : 2, floor,
  })
  return [Math.min(1, size / base), floor]
}

/* ------------------------------------------------------------------ *
 * §4.4 NVAR — distinct rendered designs per category.
 * Every category now offers exactly as many layout choices as it has
 * designs (QA ticket, 2026-11-16): the rendered design is `arch % NVAR[cat]`,
 * and bio, media, pricing and repertoire were cut to four rows like gallery,
 * map, testimonials and the form before them. A stored `arch` past the rows
 * still renders and is shown as the row it renders (`pageLayout`). The
 * invariant `pageLayout()` rests on is the inequality, never the surplus.
 * ------------------------------------------------------------------ */

// `video` is 4 with holes at indices 0 and 2: its Figma pages exist at layouts
// 2 and 4 only (plans/video.md, call 1), and keeping the count at four keeps
// the invariant everything else reads off — design index = layout number − 1,
// so `in`, the ledgers and `SCHEMES_OF` rows need no remapping. The holes are
// never reached: `layoutChoices` offers 1 and 3, `pageLayout` folds onto them
// and `sectionVm` folds `d` the same way.
export const NVAR = {
  header: 6, bio: 4, media: 4, video: 4, pricing: 4,
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
// file (plans/editorial/layout-1.md, *The Figma source*) and all four fitted
// in HeaderV0's–HeaderV3's Lime blocks widened — Stacked last — so its family
// is closed as well. Pop is the same four in a fifth mode, its four pages found
// in the file (plans/pop/layout-1.md, *The Figma source*) and all four fitted
// in HeaderV0's–HeaderV3's Lime blocks widened — Stacked last — so every
// family is closed and no card of any template draws Retro's checker under
// another template's tokens.
//
// There is no flat family any more: Pop was its last member, and its three
// compositions went with Pop's own header (plans/pop/layout-1.md, the
// end-of-pass sweep). A name no template carries falls to Retro's six, which
// is what EncoreSection's root dispatches for any theme.
export const headerFamily = (themeName) =>
  themeName === 'Lime' ? 'lime' : themeName === 'Grunge' ? 'grunge'
    : themeName === 'Editorial' ? 'editorial' : themeName === 'Pop' ? 'pop'
      : themeName === 'Lattice' ? 'lattice' : themeName === 'Paperback' ? 'paperback' : themeName === 'Headliner' ? 'headliner' : 'photographic'

const HEADER_COUNT = { photographic: 6, lime: 4, grunge: 4, editorial: 4, pop: 4, lattice: 4, paperback: 4, headliner: 4 }

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
//
// `video` is the one category with holes (plans/video.md, call 1): it has a
// design at layouts 2 and 4 only, so the fold lands on the odd index, and the
// header cards for layouts 1 and 3 drop the section rather than fold it
// (EncoreBuilder's `pickHeader`).
export const videoDesign = (i) => ((i % 4) + 4) % 4 | 1

// The design a stored `arch` renders, folded past a category's holes. `video`
// has no layouts 1 and 3 (above). The booking calendar lost its layout 3,
// design 2 (2026-11-13), and a stored `arch` 2 — an in-session draft, a removed
// section the composer restores, a harness `&arch=2` — renders as layout 1, the
// nearest month grid. Every reader of `arch % designCount` goes through this, or
// the panel, caps and inline editor would believe a design the canvas does not
// draw.
export const designOf = (catId, arch, themeName) => {
  const n = designCount(catId, themeName) || 1
  const k = ((arch % n) + n) % n
  if (catId === 'video') return videoDesign(k)
  if (catId === 'calendar' && k === 2) return 0
  return k
}
export const pageLayout = (catId, i, themeName) => designOf(catId, i, themeName)

// The `arch` values the layout picker offers a category: every index, except
// that a video has a frame at layouts 2 and 4 alone and the calendar at 1, 2
// and 4 (no layout 3, no layout-5 duplicate of layout 1).
export const layoutChoices = (catId, themeName) => (catId === 'video'
  ? [1, 3]
  : catId === 'calendar'
    ? [0, 1, 3]
    : Array.from({ length: layoutCount(catId, themeName) }, (_, i) => i))

// The layout a video starts on when the composer adds one: the page's own if
// that is one of the two it has (the header's design stands for the page's),
// else layout 2. `pageD` is -1 or any design index.
export const videoStartArch = (pageD) => (pageD === 3 ? 3 : 1)

/* ------------------------------------------------------------------ *
 * §4.4b Header layout names.
 *
 * "Header layout 4" tells nobody anything, and the header is the one
 * category a first-time user is asked to choose before they know the
 * editor. These are the names the compositions already carry in
 * EncoreSection's §10.2 comments, promoted to the UI. Every other
 * category is named in `LAYOUT_NAMES` below (video alone stays numbered).
 * ------------------------------------------------------------------ */

// [name, what it is] — index-aligned with HeaderV0…V5.
const PHOTOGRAPHIC_NAMES = [
  ['Full photo', 'Full-bleed photo'],
  ['Side by side', 'Photo beside the details'],
  ['Framed photo', 'Framed photo on colour'],
  ['Stacked', 'Name stacked over the photo'],
  ['Floating card', 'Details on a card'],
  ['Wide stage', 'Centred, wide'],
]
const HEADER_NAMES = {
  photographic: PHOTOGRAPHIC_NAMES,
  // The same HeaderV0…V3, so the same names — sliced, not copied, so a rename
  // reaches every template.
  lime: PHOTOGRAPHIC_NAMES.slice(0, HEADER_COUNT.lime),
  grunge: PHOTOGRAPHIC_NAMES.slice(0, HEADER_COUNT.grunge),
  editorial: PHOTOGRAPHIC_NAMES.slice(0, HEADER_COUNT.editorial),
  pop: PHOTOGRAPHIC_NAMES.slice(0, HEADER_COUNT.pop),
  lattice: PHOTOGRAPHIC_NAMES.slice(0, HEADER_COUNT.lattice),
  paperback: PHOTOGRAPHIC_NAMES.slice(0, HEADER_COUNT.paperback),
  headliner: PHOTOGRAPHIC_NAMES.slice(0, HEADER_COUNT.headliner),
}

export const headerLayout = (themeName, i) =>
  HEADER_NAMES[headerFamily(themeName)][i] ?? [`Layout ${i + 1}`, '']

// The label a header section carries in the sidebar, the edit panel and the
// canvas overlay: the name alone, as every other category (2026-11-16).
export const headerLayoutLabel = (themeName, i) => headerLayout(themeName, i)[0]

// A category whose layouts have names is shown by them alone, in the picker and
// in the sidebar's summary alike (QA ticket, 2026-11-16: four rows each, no
// surplus duplicates). Only `video` stays numbered.
export const LAYOUT_NAMES = {
  bio: ['Statement', 'Feature card', 'ID card', 'Story'],
  media: ['Playlist', 'Card fan', 'Track list', 'Simple player'],
  pricing: ['Package cards', 'Featured plan', 'Filter & compare', 'Service list'],
  repertoire: ['Song list', 'Song cards', 'Curated sets', 'A–Z index'],
  gallery: ['Photo viewer', 'Feature photo', 'Photo grid', 'Spotlight'],
  map: ['Map & gig list', 'Travel card', 'Live map', 'Gig ticker'],
  // Index 2 is the removed layout 3 (the ticket's "Simple calendar"); the picker skips it.
  calendar: ['Polaroid calendar', 'Date table', 'Simple calendar', 'Calendar & enquiry'],
  testimonials: ['Single quote', 'Review carousel', 'Rating summary', 'Review grid'],
  form: ['Classic form', 'Price & form', 'Simple form', 'Step by step'],
}

export const layoutLabel = (catId, themeName, i) => {
  if (catId === 'header') return headerLayoutLabel(themeName, i)
  const name = LAYOUT_NAMES[catId]?.[i]
  return name ?? `${catName(catId)} layout ${i + 1}`
}

/* ------------------------------------------------------------------ *
 * §4.5 FLAG — category id → 2-letter view-model boolean key
 * ------------------------------------------------------------------ */

export const FLAG = {
  header: 'hd', bio: 'bi', media: 'me', video: 'vi', pricing: 'pr',
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

// The audio behind the seeded tracks above, one per TRACKS row (a row the artist
// edits can also carry an uploaded `file`, which plays instead). Unlike the
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
export const TRACK_KEYS = ['title', 'sub', 'image', 'audio', 'file']

// A track's uploaded recording (`file`: a data:audio/ URI the panel's RowAudio
// inlined, with `fileName` and `fileSize` beside it for the panel), or ''. It
// wins over the row's `audio` link while it exists; Remove falls back to the
// link. Only the shape is checked here — the panel vets the file at pick time.
export const uploadedAudio = (t) => (typeof t?.file === 'string' && t.file.startsWith('data:audio/') ? t.file : '')

// The clock on the "now playing" card beside the track stack — a player caught
// mid-song, which is what the Figma frame draws. Only the editor canvas shows
// it: the published player's clock is its <audio> element's own (§10.2a), and
// the *track* named on the card is always one of the artist's, so there is no
// track here. A section with no tracks left draws neither: `sectionVm` stops
// the clock at 00:00 under an empty bar and names `vm.mediaEmpty` instead.
export const NOW_PLAYING = { at: '02:28', of: '04:22', pct: 34 }


// The videos the video section's layout 2 is seeded with (plans/video.md,
// call 4), through VIDEO_SEED below. Only the artwork needs dressing, which
// `defaultTrackArt('video')` does.
//
// `sub` is the frame's channel line — where the video came from, not who made
// it — and `when` is the date the frame spends on a view count; the seed rows'
// description is the two (`videoSeedDesc`). Neither is a number about how many
// people watched: the frames' view counts, follower count and like pair are
// dropped, because a published page printing a number the artist never typed
// is making a claim (Retro layout 2's rule).
export const VIDEOS = [
  { title: 'Manchester at 3am',  sub: 'Hidden Sessions', when: 'April 2026' },
  { title: 'Disco Maghreb (edit)', sub: 'Single',        when: 'March 2026' },
  { title: 'Slow Burn',          sub: 'Single',          when: 'February 2026' },
  { title: 'Echo & The Floor',   sub: 'Live set',        when: 'November 2025' },
  { title: 'Roomtone',           sub: 'Hidden Sessions', when: 'October 2025' },
  { title: 'Field Day (live)',   sub: 'Festival',        when: 'August 2025' },
]
// Layouts 2 and 4 list the artist's own YouTube links on every template
// (notes/video.md, "YouTube links"): `c.videos` is an array of { url, title, desc },
// edited by VideosField, which also stores `by` / `byFor`, the channel name
// oEmbed gave for the link `byFor` names (the line under the player when
// `desc` is empty). The seed is VIDEOS' titles with no link, a line off their
// source and date, each row carrying
// `art`, the seed photograph it shows while it has no YouTube thumbnail — kept
// through every rewrite, as a seeded slot keeps `after`, so a reorder or a
// delete never hands a row another row's picture. Unlike SLOT_KEYS, `art` is
// not in VIDEO_KEYS: a row with neither a link nor a title has nothing to play
// or print, so emptying a seeded row drops it, art and all.
export const VIDEO_KEYS = ['url', 'title', 'desc']
export const videoSeedDesc = (v) => (v ? `${v.sub} · ${v.when}` : '')
export const VIDEO_SEED = VIDEOS.map((v, i) => ({ url: '', title: v.title, desc: videoSeedDesc(v), art: i }))

// Whether a video section has a row that can play: a link that names a YouTube
// video or playlist, which is what `embed` (a web origin) and `href` (the
// `file://` link-out) both come from. The published page leaves a section
// with no such row out (JP-162, plans/video-qa-fixes.md, call 1): the seed
// rows carry no link, so a page nobody has edited, an emptied list and a list
// of Vimeo links are all a player with nothing to play. Pure, so the page
// can ask without building a view-model; the same rows `sectionVm` lists.
export const videoPlayable = (section) => (
  Array.isArray(section?.c?.videos) ? section.c.videos : VIDEO_SEED
).some((r) => !blankRow(r, VIDEO_KEYS) && !!youtubeParts(extUrl(r?.url ?? '')))

// The frame's own words for the layout-2 panel's link (plans/video.md,
// call 3), uncased like every JP-071 label.
export const VIDEO_ALL = 'View All ›'

// TAGS is a palette as much as a list: `vm.chips` is one colour seat per entry,
// and `s.chips[3].bg`, `s.chips[4 % n].bg` and friends are read as seats across
// the header, media, map and pricing. Its length and order must not change.
// The words the chip rows print are the artist's (JP-037): FIELDS.header.tags,
// seeded with TAG_LABELS and zipped onto these seats by index, wrapping
// (`vm.tagChips`). Six, as the frames draw them: the header at layouts 1, 3
// and 4 and the Genres rows of Lime's and Grunge's layout-3 and layout-4 bios
// and Editorial's layout-3 and layout-4 ones (JP-081, user call, 2026-09-29, reopening
// JP-037's five, which had been read off the Lime layout-2 bio). Retro's
// layout-4 header and Lime's layout-2 bio draw five, and seed the sixth anyway.
export const TAGS = ['Default', 'Sold Out', 'New Release', 'Archive', 'Live', 'All Access']
export const TAG_LABELS = 'Default, Sold Out, New Release, Archive, Live, All Access'

// JP-037 — layout 2's copy that was a literal in EncoreSection: the hero's
// pill, and the bio card's credit line and the pill beside it. Each is the
// frame's own text (964:64580, 964:64581 and Retro's 964:64638), the credit
// line lowercase as both frames type it.
export const HERO_CTA = 'Enquire about a date'
export const BIO_CREDIT = 'five years of rooms read & floors moved'
export const BIO_CTA = 'Book Now'
// Paperback's layout-1 bio draws the frame's black split pill `Full bio` (1:2441), seeded as that.
export const BIO_CTA_PAPERBACK = 'Full bio'
// JP-059 — the rest of layout 2's copy, which Lime's fit had kept as literals:
// the pill over the name, the two cards' copy under the header's photograph,
// and the bio card's pill. Byte for byte what every template's twelve header
// masters type (the straight apostrophe, the middle dot); the bio's masters
// type "/featured" cased UPPER, which the pill cases anyway. The "●" before
// the availability is the markup's, not the field's. "Performing since 2021"
// is the artist's copy, not the bio's `since` (CARD_LINE_3's precedent).
export const FACE_TITLE = 'The face of the act'
export const FACE_BODY = "Same person you'll meet on the night. Performing since 2021."
export const BIO_TAG = '/Featured'
// JP-071 — eight section labels the frames draw and no field reached, the
// literals they replace: bio layout 3's three stat labels (one line each;
// sectionVm breaks them before the last word, as the frames do), its
// "[ About ]" and "Genres" (bio layout 4's too), media layouts 2 and 3's
// "● Popular" over the list (removed 2026-11-12), and layout 3's eyebrows on
// the map and the testimonials. The "●" and the brackets are the markup's.
export const BIO_SINCE_LABEL = 'Performing since:'
export const BIO_ROLE_LABEL = 'Current role:'
export const BIO_BASE_LABEL = 'Based in:'
export const BIO_ABOUT_LABEL = 'About'
// JP-090 (user call, 2026-09-30): three more, on every template at layout 1 —
// the map's eyebrow and the label over its gig list (the "· N" is the
// markup's), and the form's label over its chip row. (The bio's reference line,
// the fourth, was removed with the decorative labels, 2026-11-11: notes/bio.md;
// the map's eyebrow went at layouts 1 and 3 on 2026-11-12, notes/map.md.)
export const MAP_LIST_LABEL = 'Upcoming gigs'
export const FORM_TYPE_LABEL = 'Event type'
// JP-095 (b) · JP-096 (user call, 2026-10-01): the map's layout-2 travel card
// and list, on every template — the eyebrow (`kicker`, layout 2 alone since
// 2026-11-12), the two locations' labels over their values and captions under
// them, the stat row's three labels and the two pills. (The label over the
// list, "Other upcoming · N", was removed 2026-11-12.) Each is the
// frame's own text (964:64613's layer names). The pills read their seed again
// when emptied (FORM_MSG_LABEL's rule): a pill with no label is broken.
export const MAP_KICKER_2 = 'Travel radius'
export const MAP_HOME_LABEL = 'Based in'
export const MAP_HOME_CAPTION = 'Home location'
export const MAP_VENUE_LABEL = 'Willing to travel to'
export const MAP_VENUE_CAPTION = 'Venue location'
export const MAP_RADIUS_LABEL = 'Max travel'
export const MAP_TIME_LABEL = 'Travel time'
export const MAP_FEE_LABEL = 'Booking fee'
export const MAP_VENUE_CTA = 'Venue Link'
export const MAP_ROUTE_CTA = 'Get Directions'
// JP-095 (a) (user call, 2026-10-01): eight more, the layout-2 bodies' on every
// template — the plan card's features label (its `[ PRICING ]` eyebrow was
// removed 2026-11-12), in the capitals the frame types (964:64610; the curly apostrophe is what renders); the slot
// list's two column labels; the fan card's chip and the counter's two words
// over the track list ("5 Featured / 5 Max", and layout 1's "5 / 5 Featured").
// (The testimonials' eyebrow, a ninth, was removed 2026-11-12.) The "[ ]", "↓", "●"
// and the counts are the markup's. The calendar's prompt, which every
// layout prints while no day is cued, joins them; emptied, it reads its seed
// again (FORM_MSG_LABEL's rule).
export const PRICING_FEATS_LABEL = 'WHAT’S INCLUDED'
// Layout 3's badge on the featured package (JP-125, user call, 2026-10-09),
// in the capitals the frame types and printed as typed, JP-095 (a)'s shape.
export const PRICING_BADGE = 'FEATURED'
export const CAL_DATE_LABEL = 'Date'
export const CAL_AVAIL_LABEL = 'Availability'
export const CAL_PROMPT = 'Pick a date to enquire'
export const MEDIA_CHIP_LABEL = 'Featured'
// (The media counter's `countLabel` / `totalLabel` words went 2026-11-12.)
// JP-098 (user call, 2026-10-01): the gallery's 768 head row, over the small
// photos, in the frame's title case (986:15668). Layout 2 at tablet alone; the
// heading it used to hold went back to the caption. JP-120 (gallery) gave it
// layout 1's credit line too, the gallery's name under the artist's.
export const GALLERY_RAIL_LABEL = 'Gallery'
// JP-120 (gallery), user call, 2026-10-08: layout 1's eyebrow, which layout 4's
// prints as well, and its back link, the frames' words. The open source row's
// label seeds off GALLERY_SOURCES[0].l. The eyebrow's seed was the frames'
// word *Media*; user call, 2026-11-11, seeded it empty, so it is not drawn
// until the artist types one. Typing *Media* itself shows it (QA 1amvuf5yjyz,
// 2026-11-12: a legacyContent rule that read a stored 'Media' as empty was removed).
export const GALLERY_KICKER = ''
export const GALLERY_BACK_LABEL = 'Back to beginning'

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

// Layout 3's packages (JP-070): TIERS with the frames' Duo / Trio / Band
// chips where layout 1's Retro frame draws Solo / Trio / Band. The frames
// print no tags on a row, and their capsule picks Duo over all three rows,
// so the only claim they make is the chip row. Solo becomes Duo and nothing
// else moves: the names, prices, blurbs and features are TIERS' own, which is
// why the calendar's package card (name and price, through pageTiers()) reads
// the same either way. Chosen by layout only while the key is absent,
// FORM_FIELDS_4's gate, in sectionVm and tiersVal alike; once the artist
// edits the list it is theirs at every layout.
export const TIERS_3 = TIERS.map((t, i) => ({ ...t, tags: ['Duo', 'Duo, Trio, Band', 'Trio, Band'][i] }))
// Layout 1's packages under Lime, Grunge, Editorial and Pop (JP-089, user
// call, 2026-09-30, reversing Lime layout 1's named diff): their frames' chips
// read Private Event / Club Night / Festival (964:58594, 964:58606, 964:58618,
// 964:58630)
// where Retro's read Solo / Trio / Band. The frames print no tags on a card,
// so each package takes one, in the frame's order. The row carries no All
// (JP-089 again, user call, 2026-10-05, reversing "the All chip stays").
// TIERS_3's shape otherwise: the tags alone move, and tiersSeed() below is
// the one expression sectionVm and tiersVal both call.
export const TIERS_1 = TIERS.map((t, i) => ({ ...t, tags: ['Private Event', 'Club Night', 'Festival'][i] }))
// The templates whose pages are Lime's component trees — sectionVm's
// `limeTree` flag, for the seeds that follow the frame rather than the layout.
// The four templates that widen Lime's blocks, since Pop's layout-4 sweep folded its
// pair in (plans/pop/layout-4.md, decision 2). Lattice is deliberately NOT here
// though `limeTree` names it: its three seeds are per-section calls
// (plans/lattice/layout-1.md, session 0), and its chips read Solo / Trio / Band.
export const limeTreeTheme = (themeName) =>
  themeName === 'Lime' || themeName === 'Grunge' || themeName === 'Editorial' || themeName === 'Pop'
// The packages an absent `tiers` key stands for, by template and design (`d`,
// `arch % designCount`): layout 3's frames' Duo on every template (JP-070),
// layout 1's frames' three occasions under Lime, Grunge, Editorial and Pop
// (JP-089; Pop's frame's row 964:58630), and TIERS everywhere else.
export const tiersSeed = (themeName, d) =>
  d === 2 ? TIERS_3 : d === 0 && limeTreeTheme(themeName) ? TIERS_1 : TIERS

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
//
// `length` is the track's running time as the artist types it, free text and
// printed as typed: only layout 3's set cards read it, in the seat the other
// layouts give the artist (JP-066, user call, 2026-09-29). The seeds are the
// lengths every layout-3 frame prints (Grunge's 390 master, 984:13951, lists
// all of them); the twelfth row is a second Valerie where the frame has Get
// Lucky, so it takes Valerie's.
export const SONGS = [
  { title: 'Valerie',           artist: 'Amy Winehouse',      tags: 'Weddings, Pubs',      length: '3:54' },
  { title: 'Superstition',      artist: 'Stevie Wonder',      tags: 'Weddings',            length: '4:26' },
  { title: 'Uptown Funk',       artist: 'Bruno Mars',         tags: 'Weddings, Birthdays', length: '4:30' },
  { title: 'Dancing Queen',     artist: 'ABBA',               tags: 'Weddings, Birthdays', length: '3:51' },
  { title: 'Sex on Fire',       artist: 'Kings of Leon',      tags: 'Pubs',                length: '3:23' },
  { title: 'Crazy in Love',     artist: 'Beyoncé',            tags: 'Birthdays',           length: '3:56' },
  { title: 'Mr. Brightside',    artist: 'The Killers',        tags: 'Pubs, Birthdays',     length: '3:42' },
  { title: 'I Wanna Dance',     artist: 'Whitney Houston',    tags: 'Birthdays',           length: '4:52' },
  { title: 'September',         artist: 'Earth, Wind & Fire', tags: 'Weddings, Birthdays', length: '3:35' },
  { title: "Don't Stop Me Now", artist: 'Queen',              tags: 'Pubs, Birthdays',     length: '3:29' },
  { title: 'Rather Be',         artist: 'Clean Bandit',       tags: 'Weddings',            length: '3:48' },
  { title: 'Valerie',           artist: 'Amy Winehouse',      tags: 'Pubs',                length: '3:54' },
]
// What `blankRow()` asks of a SongsField row (the JP-051 sweep). A row holding
// only a length is a song the artist has started, so it is not blank.
export const SONG_KEYS = ['title', 'artist', 'tags', 'length']

// Repertoire layout 3's set details (JP-066, user call, 2026-09-29): a set is
// one of the songs' tags, so its mood and its running time cannot live on the
// songs. They are keyed here by the tag, case-folded, so they follow the tag
// rather than a position and survive a song list reordered or rewritten. A
// set's length is the artist's claim, not a sum: the frame's "45 MIN" heads
// four tracks of about four minutes. The seed is the frame's three moods and
// lengths laid on the seed's three tags in order; the frame's own card titles
// (Cocktail hour / Dinner / Party peak) stay ours, since retagging the songs
// would move the chip rows of layouts 1, 2 and 4.
export const REP_SETS = {
  weddings:  { mood: 'Mellow',         length: '45 min' },
  pubs:      { mood: 'Easy listening', length: '60 min' },
  birthdays: { mood: 'High energy',    length: '90 min' },
}
// The section's `sets`, else the seed — only an absent key (or anything that
// is not a plain object) falls back, so an artist who empties every box keeps
// the song counts rather than getting the seed back. SetsField writes the whole
// object on its first keystroke, so the canvas never loses a seeded set's line
// the moment another is edited. sectionVm and EditPanel both resolve it here.
export function repSetsOf(c) {
  const v = c && c.sets
  return v && typeof v === 'object' && !Array.isArray(v) ? v : REP_SETS
}
// One set's line: its mood and length joined, each dropped when empty. `''`
// when both are, which the card reads as "print the song count instead".
export function repSetLine(d) {
  return [d && d.mood, d && d.length].map((v) => String(v ?? '').trim()).filter(Boolean).join(' · ')
}

// The chip that clears the filter. It is index 0 of the row and carries a null
// tag; repChips() skips a tag of the same name so an artist who writes "All" on
// a song gets one chip here, not two. The pricing row drops the head (JP-089),
// so a package tagged "All" gets no chip there: its rest state already shows
// every package.
export const REP_ALL = 'All'

// Events map — the upcoming-gigs list beside the map tile, and the seed for
// FIELDS.map's structured editor: used whenever the section carries no `gigs`
// key of its own. `link` is where the row's tickets go on the published page,
// normalised through extUrl() in sectionVm; the seeds carry none, so out of the
// box the rows stay the picture they have always been.
//
// One gig pairs with one pin, by index — PINS is five positions over the seeded
// Manchester raster and sectionVm hands each gig `PINS[i % PINS.length]`.
//
// `year` is printed nowhere. Layout 3 reads it twice: its date disc derives
// the weekday from it (gigWeekday(), JP-069, user call, 2026-09-29), and the
// published tab's row pill reads Upcoming or Past off it against today
// (gigStatus(), JP-106, user call, 2026-10-06). The seed is 2031, which has
// 2025's calendar, the year whose weekdays the frames print (JUL / 12 / SAT …
// AUG / 30 / SAT), so the discs keep the frames' weekdays and every seeded row
// reads Upcoming until 2031. It was 2025 until JP-106, which read Past.
export const GIGS = [
  { venue: 'Hidden Warehouse',  city: 'Manchester',   time: '22:00', month: 'Jul', day: '12', year: '2031', link: '' },
  { venue: 'The Deaf Institute', city: 'Manchester',  time: '21:00', month: 'Jul', day: '25', year: '2031', link: '' },
  { venue: 'Private wedding',   city: 'Lake District', time: '19:00', month: 'Aug', day: '02', year: '2031', link: '' },
  { venue: 'Mint Lounge',       city: 'Manchester',   time: '23:00', month: 'Aug', day: '16', year: '2031', link: '' },
  { venue: 'Gorilla',           city: 'Manchester',   time: '23:00', month: 'Aug', day: '30', year: '2031', link: '' },
]
// What `blankRow()` asks of a GigsField row (the JP-051 sweep). `year` is in
// it, so a row holding only a year is still a row.
export const GIG_KEYS = ['venue', 'city', 'time', 'month', 'day', 'year', 'link']
// The events map's real place and reach (user call, 2026-11-09). `c.place` is
// `{ name, region, country, lat, lon }`, picked from the panel's lookup and
// stored whole; `c.miles` is the radius in miles. Both are seeded here, and
// every coverage string on the section is derived from them (the old free-text
// `radius` and `rings` fields are gone). This reverses JP-105 (layout 1 kept
// "12 mile radius" by its frame) and JP-096 (layout 2's "Based in" was the
// header's Location): the map's own town and radius print everywhere now.
export const MAP_PLACE = { name: 'Manchester', region: 'England', country: 'United Kingdom', cc: 'GB', lat: 53.4808, lon: -2.2426 }
export const MAP_MILES = 120
export const MAP_MILES_MIN = 5
export const MAP_MILES_MAX = 500
export const mapPlaceOf = (c) => {
  const p = c?.place
  return p && typeof p.name === 'string' && p.name.trim() && Number.isFinite(+p.lat) && Number.isFinite(+p.lon)
    ? { name: p.name.trim(), region: String(p.region ?? ''), country: String(p.country ?? ''), cc: String(p.cc ?? '').toUpperCase(), lat: +p.lat, lon: +p.lon }
    : MAP_PLACE
}
export const mapMilesOf = (c) => {
  const n = Math.round(+c?.miles)
  return Number.isFinite(n) && n > 0 ? Math.min(MAP_MILES_MAX, Math.max(MAP_MILES_MIN, n)) : MAP_MILES
}
// A town as a seed prints it: cut at a word with an ellipsis past `n`.
const placeWord = (name, n) => (name.length <= n ? name : `${name.slice(0, Math.max(1, n - 1)).trimEnd()}…`)
// Layout 1 "12 mile radius", 2 "120 mi" (Max travel), 3 "120 mi radius".
export const mapRadiusText = (d, miles) => (d === 1 ? `${miles} mi` : d === 2 ? `${miles} mi radius` : `${miles} mile radius`)
// The three rings' labels, inner ring first: a quarter, a half and the whole.
export const mapRingLabels = (miles) => [miles / 4, miles / 2, miles]
  .map((m) => `${m >= 10 ? Math.round(m) : +m.toFixed(1)}mi`)
export const mapHeadingSeed = (c, themeName, design) => {
  const f = FIELDS.map.find((x) => x.k === 'heading')
  const cap = fieldCap(f, themeName, design)
  return placeWord(mapPlaceOf(c).name, cap?.chars || 20)
}
export const mapBaseSeed = (c, themeName, design) => {
  const f = FIELDS.map.find((x) => x.k === 'base')
  const room = (fieldCap(f, themeName, design)?.chars || 24) - 'Based in '.length
  return `Based in ${placeWord(mapPlaceOf(c).name, Math.max(6, room))}`
}
export const mapTermsSeed = (c) => `${mapMilesOf(c)} mi standard · further on request`
// The stat wall's Base cell seed, "Manchester, UK": the town and its country code
// (GB reads UK), the town alone once the two do not fit `n`.
export const mapBaseStat = (c, n = 14) => {
  const p = mapPlaceOf(c)
  const cc = p.cc === 'GB' ? 'UK' : p.cc
  const both = cc ? `${p.name}, ${cc}` : p.name
  return both.length <= n ? both : placeWord(p.name, n)
}
// A town for the travel card's home value and the like.
export const mapPlaceLabel = (c, n = 14) => placeWord(mapPlaceOf(c).name, n)
// The stat wall's seed: the frame's four, its Radius and Base cells following
// the picked radius and town.
export const mapStatsSeed = (c) => MAP_STATS_4.map((r) => (
  r.label === 'Radius' ? { ...r, value: String(mapMilesOf(c)) }
    : r.label === 'Base' ? { ...r, value: mapBaseStat(c) } : r))
// Web-Mercator zoom (512px tiles) at which `miles` spans `radiusPx` pixels at `lat`.
export const mapZoomFor = (lat, miles, radiusPx) => (
  Math.log2((78271.517 * Math.cos((lat * Math.PI) / 180) * Math.max(1, radiusPx)) / (miles * 1609.344))
)
export const MAP_BASE = 'Based in Manchester'
export const MAP_TERMS = '120 mi standard · further on request' // the seed at MAP_MILES; sectionVm derives it
// Layout 3's map panel copy, the frame's own (964:68649), seeded and emptiable.
export const MAP_STATUS = 'In transit'
export const MAP_UPDATED = 'Updated 2m ago'
export const MAP_EXPAND = 'Expand view'
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
// Layout 2's stat row: the frame's Travel time and Booking fee cells, seeded
// with its own copy. Max travel, the third cell, is `radius` rather than a
// field of its own, so a seeded page cannot claim two different coverages.
// mapRadiusSeed() keeps that: a page shows the map at one layout, so it prints
// one seed, and layout 2's (MAP_RADIUS_2, JP-124) is the page's 120.
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
// Enquiry form layout 4's *What happens next* column, the frames' three steps
// verbatim (JP-079 · JP-081, user call, 2026-09-29): all nine masters (Retro
// 964:72845 / 964:79477 / 977:8663, Lime's and Grunge's twins) draw the same
// title over the same second line. They are process steps, not promises, which
// is why the column stopped numbering FORM_PROMISES. Written in the
// { title, sub } shape StepsField edits, so they need no dressing.
export const FORM_STEPS = [
  { title: 'Send your details',    sub: 'Date, type & location' },
  { title: 'I check availability', sub: 'Reply within 24 hrs' },
  { title: 'Quote & confirm',      sub: 'Tailored package + price' },
]
// What `blankRow()` asks of a StepsField row (the JP-051 sweep's rule).
export const STEP_KEYS = ['title', 'sub']
// Written in the row shape FormFieldsField edits and sectionVm reads — the
// GIGS/TIERS rule, so the panel's seed resolver needs no dressing.
export const FORM_FIELDS = [
  { label: 'Name',       placeholder: 'Full name',      kind: 'name' },
  { label: 'Email',      placeholder: 'you@email.com',  kind: 'email' },
  // A `date` kind, drawn as a masked text box (dd/mm/yyyy, digits only), never
  // type="date": the native picker cannot be styled onto the mustard panel.
  // formErrors() refuses a day that does not exist or has passed. `number`
  // never becomes type="number" — see EncoreSection.
  { label: 'Event date', placeholder: 'dd / mm / yyyy', kind: 'date' },
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
  { label: 'Your name',  placeholder: 'Full name',       kind: 'name' },
  { label: 'Email',      placeholder: 'you@email.com',   kind: 'email' },
  { label: 'Event date', placeholder: 'dd / mm / yyyy',  kind: 'date' },
  { label: 'Event type', placeholder: 'Wedding, party…', kind: 'text' },
  { label: 'Location',   placeholder: 'Town / city',     kind: 'text' },
]
// Layouts 2 and 3's own seed (JP-070, user call, 2026-09-29): the card both
// frames share (964:64633 and every layout-3 master) stacks these three,
// labels as FORM_FIELDS_4's are. The card prints the label alone, so the
// placeholders are FORM_FIELDS_4's, there for the panel and for a list the
// artist edits here and then takes to layout 1 or 4. The email row is last for
// the first time, which is safe: every reader finds it by `kind`, never by
// place. Chosen by layout only while the key is absent, FORM_FIELDS_4's gate.
export const FORM_FIELDS_CARD = [
  { label: 'Event date', placeholder: 'dd / mm / yyyy',  kind: 'date' },
  { label: 'Event type', placeholder: 'Wedding, party…', kind: 'text' },
  { label: 'Your email', placeholder: 'you@email.com',   kind: 'email' },
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
// The five kinds a row can be, in the { v, l } shape EditPanel's own select
// branch reads. Anything else sectionVm resolves to 'text'. `name` is the
// visitor's own name (QA, 2026-11-15): required, no digits.
export const FORM_KINDS = [
  { v: 'text',   l: 'Text' },
  { v: 'name',   l: 'Name' },
  { v: 'email',  l: 'Email' },
  { v: 'number', l: 'Number' },
  { v: 'date',   l: 'Date' },
]
export const FORM_TYPES = ['Wedding', 'Event', 'Pub', 'Party', 'Other']
export const FORM_MESSAGE = 'Tell me about your event…'
// The label over the message box, and the head over the visitor's message in
// the email (JP-082, user call, 2026-09-29). Every frame's reads "MESSAGE",
// upper-cased by the render. The box always stands, so an emptied field reads
// this again rather than dropping: the guarded email row's rule, JP-051.
export const FORM_MSG_LABEL = 'Message'

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

// No `repertoire` entry: its heading counts the songs (see sectionVm), and at
// layouts 3 and 4 starts from REP_HEADING_3 / REP_HEADING_4, so a literal here
// would never be read.
export const TITLES = { bio: 'Reads the room.', media: 'Five worth your ear.',
  video: 'Live at Roomtone',
  pricing: "Choose the set that's right for your night",
  gallery: 'See us in action', calendar: 'Availability',
  map: 'Manchester', testimonials: 'Word of Mouth', form: "Let's make\nyour night unforgettable.", footer: '' }

export const DEFS = {
  heroSub:    'DJ & selector. Clubs, weddings and festivals across the North — nights built live, never off a playlist.',
  bioP1:      'DJ and selector based in Manchester. Five years of reading rooms — house, disco, soul, 80s — chosen by the room, not the algorithm.',
  bioP2:      'Residencies at Roomtone and The Warehouse Project. Available for clubs, weddings and private events across the UK.',
  since:      'June 2021',
  pricingSub: 'Prices may vary by date, location, and length of set.',
  // Layout 3's intro line is PRICING_INTRO_3 (JP-070), beside its head.
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
// arrows stop at both ends of it, the end's arrow dimmed (JP-152) — see
// EncoreSection's Calendar.
export const CAL_SPAN   = 24

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
// (`slotDate()`), because a hardcoded 2025 is past on every published page and
// every row would be dead (JP-052). The base is `open` on the canvas and in the
// editor — so slot one is CAL_OPEN, the seeded page opens with that row already
// picked, and the reference picture matches the frame (Jun 12 / 14 / 20 /
// Jul 05) — and max(open, today) by day on the published page, layout 1's F20
// rule. A seeded row keeps its `after` when the artist edits it (JP-123, user
// call, 2026-10-09, reversing JP-052's "SlotsField writes the canvas's dates
// out on its first edit", which froze a published list in 2025 on the first
// keystroke): SlotsField writes these very rows, so an edited kind or price
// still counts from the base, and only a typed `date` fixes a row's day. An
// emptied date box gives the count back. A row the artist adds has no
// `after`, so it is dated by hand.
//
// Layout 4 read these rows too until JP-052, which found its right-hand column
// is the enquiry wizard's summary, not a slot list.
export const CAL_SLOTS  = [
  { after: 0,  kind: 'Evening',  price: 'From £1,200' },
  { after: 2,  kind: 'Full day', price: 'From £2,400' },
  { after: 8,  kind: 'Late',     price: 'From £1,400' },
  { after: 23, kind: 'Wedding',  price: 'From £2,800' },
]
// Every key a slot row carries — what `blankRow()` asks of it. `after` counts
// (a number, so 0 is not blank): a seeded row whose kind and price are emptied
// keeps its date, as it did while the date was written out.
export const SLOT_KEYS = ['date', 'after', 'kind', 'price']
// A slot row's day (JP-123), `{ y, m, d }` or null: a typed `date` wins while
// the box holds one (null if it does not parse, which keeps the row's place
// and does not pick), else the seed's `after` days from `base`, a parsed date,
// else none. sectionVm and SlotsField both ask it, so the panel's box and the
// canvas print one date.
export function slotDate(row, base) {
  const typed = String(row?.date ?? '').trim()
  if (typed) return parseDate(typed)
  const after = row?.after
  if (!Number.isInteger(after) || !base) return null
  const d = new Date(Date.UTC(base.y, base.m, base.d + after))
  return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate() }
}

// Testimonials layout 2's own heading fallback — its frame's two-line display
// head, broken where the frame breaks it — and the stars its card prints in
// the corner. The shared `heading` default stays TITLES.testimonials for the
// other layouts; sectionVm and EditPanel both resolve this one for layout 2.
export const TESTI_HEADING_2 = 'Honest feedback\nfrom people who booked'
// Layout 3's heads, each its page's own (JP-070, user call, 2026-09-28): the
// booking calendar's "Book Me" over the card (964:68644), and the five its
// sections print — the repertoire (964:68710), the gallery (964:68711), pricing
// (964:68712), the map (964:68713) and the testimonials (964:68715). All four
// templates' masters read the same words, so these are per-layout defaults,
// not per-theme ones. The other layouts keep the shared TITLES defaults (the
// repertoire its song count at layouts 1 and 2); sectionVm and EditPanel both
// resolve these at layout 3 alone, the HEADING_4 pattern.
export const CAL_HEADING_3 = 'Book Me'
export const REP_HEADING_3 = 'Curated sets'
export const GALLERY_HEADING_3 = 'Gallery'
export const PRICING_HEADING_3 = 'Pricing'
// The line under that head (JP-070, 2026-09-29): the frames' paragraph without
// its first sentence, "Four ways to book this act.", a count of packages the
// artist never typed and false even in the frame, which draws three. The rest
// is the frame's verbatim. The intro reaches layout 3 alone, so this is
// FIELDS.pricing.intro's plain `d`.
export const PRICING_INTRO_3 = "Choose by the kind of night you're throwing — the quote covers the whole booking."
export const MAP_HEADING_3 = "Where I'm playing."
export const TESTI_HEADING_3 = 'Experiences.'
// The layout-3 header's portrait card, its second line under the name
// (964:68654, 964:68686, 964:68718): FIELDS.header.cardLine's seed, which
// Lime's, Grunge's and Editorial's card reads. It was the kicker's layout-3
// seed until JP-061, which printed one word in the card and another in the
// bio's Current role; the kicker is now 'DJ · Live Act' at every layout.
// Retro's polaroid prints the kicker in that seat. The line is the artist's
// copy, not the bio's `since`.
export const CARD_LINE_3 = 'Performing since 2021'
// Layout 4's heads, each its composed page's own wrapper head over the section
// (QA, 2026-09-15): the Book Us panel (964:72839), the gallery's column
// (964:72784), the map band (964:72827) and the testimonials sheet — and the
// repertoire's panel (JP-081, user call, 2026-09-29, reversing Retro layout
// 4's open question 8): "Repertoire" over "All songs · A–Z" in all three
// templates' frames (964:72817, 964:72916, 964:73007), which wins over the
// song count as layout 3's "Curated sets" does. The other layouts keep the
// shared TITLES defaults; sectionVm and EditPanel both resolve these at layout
// 4 alone, the TESTI_HEADING_2 pattern.
export const VIDEO_HEADING_4 = 'See me in action'
export const CAL_HEADING_4 = 'Book Us'
export const REP_HEADING_4 = 'Repertoire'
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
// Layout 1's frames under Lime, Grunge and Editorial (JP-089, user call,
// 2026-09-30, reversing Lime layout 1's named diffs): the calendar's head
// reads *Book Now* (964:58619) and the form's submit *Enquire* (964:58620).
// Pop's calendar frame reads *Book Now* too (964:58631).
// Retro's layout-1 form reads *Book Now* (964:58584) and its calendar prints
// no head, so both are gated on the template as well as the layout, in
// sectionVm and EditPanel's chain alike. Uncased: `cased()` sets them.
export const CAL_HEADING_1 = 'Book Now'
export const FORM_BTN_1 = 'Enquire'
// The submit's label an absent `button` key stands for (FORM_BTN_4's shape,
// JP-054, with JP-089's template gate): the one expression sectionVm and
// EditPanel both call. Pop's layout-1 frame reads *Enquire* too (964:58632).
export const formBtnSeed = (themeName, d) =>
  d === 3 ? FORM_BTN_4 : d === 0 && limeTreeTheme(themeName) ? FORM_BTN_1 : 'Book Now'
// The address every enquiry is mailed to, as the enquiry form seeds it. Named
// because two sections resolve it (JP-053): the form's own sectionVm, and the
// booking calendar's layout-4 wizard through pageEmail() below.
export const FORM_EMAIL = 'bookings@kaimercer.co.uk'
export const TESTI_STARS = '★★★★★'
// Testimonials layout 3's stat card reads "4.9 /5" (964:68651 and its three
// twins; Editorial's "5.9" is a typo). The field holds the number and the card
// prints the "/5" (JP-065). Its own constant, though pricing's PRICING_RATING
// has the same bytes: it is another section's content.
export const TESTI_RATING = '4.9'
// Booking calendar layout 4's wizard (964:72843): the event types its first
// step offers, the frame's own four. The calendar's own list rather than the
// enquiry form's FORM_TYPES, which is another section's content.
export const CAL_TYPES = ['Wedding', 'Birthday', 'Corporate', 'Festival']
// The package pill's label, FIELDS.pricing.rowCta, per layout (JP-070, user
// call, 2026-09-28; FORM_BTN_4's shape): layout 1's frame reads "Book Now",
// layout 3's "Book" (964:68712), and layout 4's "Star Enquiry", the typo
// CAL_SLOT_CTA already reads as "Start Enquiry". Layout 2's plan card has its
// own `cta`.
export const PRICING_ROW_CTA = 'Start Enquiry'
export const PRICING_ROW_CTA_3 = 'Book'
// Paperback's layout-1 cards draw the frame's `Book this set` (1:3028), seeded as that.
export const PRICING_ROW_CTA_PAPERBACK = 'Book this set'
// Events map layout 4's panel note, beside "Travel & reach" (964:72830).
export const MAP_SPAN = 'Live · last 12 months'
// Events map layout 4's stat wall, the frame's four cards verbatim (JP-077,
// user call, 2026-09-29): all nine masters (Retro 964:72830 / 964:78599 /
// 977:8322, Lime's and Grunge's twins) print the same twelve strings. A stat
// is a claim the artist types, JP-065's reversal taken whole — the fit's two
// derivations (a city count and the gig count) are gone — so the rows are
// written in the { label, value, sub } shape StatsField edits and need no
// dressing. The labels are upper-cased by the card's CSS; value and sub print
// as typed.
export const MAP_STATS_4 = [
  { label: 'Radius',   value: '120',            sub: 'miles · standard' },
  { label: 'Cities',   value: '21',             sub: 'played in' },
  { label: 'Gigs YTD', value: '48',             sub: 'played this year' },
  { label: 'Base',     value: 'Manchester, UK', sub: 'further on request' },
]
// What `blankRow()` asks of a StatsField row (the JP-051 sweep's rule).
export const STAT_KEYS = ['label', 'value', 'sub']

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
// Booking calendar layout 4's submit, the wizard's last step and the foot
// pill (964:72844 and its twins). FIELDS.calendar.cta seeds it at layout 4
// (JP-082, user call, 2026-09-29; FORM_BTN_4's shape), and an emptied label
// falls back to it there, since it is the wizard's only way to send.
export const CAL_SEND_4 = 'Send Enquiry'
// Lattice's and Paperback's layout-1 foot draw a Continue button where Lime's draws none (frames 1:1039 · 1:9670 · 1:10640; 1:3131 · 1:11793 · 1:12975).
export const CAL_CTA_LATTICE = 'Continue'

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
//
// The video is the one section a page row can add or drop (plans/video.md, call
// 1): layouts 2 and 4 draw it, straight after the media player, and layouts 1
// and 3 do not. Layout 4's row is the first that differs from layout 1's only
// in that.
const PAGE_ORDERS = [
  EXAMPLE_PAGE.map(([cat]) => cat),
  ['header', 'bio', 'media', 'video', 'repertoire', 'gallery', 'pricing', 'calendar', 'map',
    'form', 'testimonials', 'footer'],
  ['header', 'bio', 'media', 'repertoire', 'calendar', 'gallery', 'pricing', 'map',
    'form', 'testimonials', 'footer'],
  EXAMPLE_PAGE.flatMap(([cat]) => (cat === 'media' ? [cat, 'video'] : [cat])),
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
  const at3 = (x) => designOf(x.cat, x.arch, themeName) === 2
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
 * { k, l, type?, opts?, d?, def?, in?, shared? }
 *
 * `in` is the designs that read the key, 0-based like `arch % designCount`
 * (so layout 1 is 0). It is an array when every template reads the key in
 * the same designs, or an object keyed by template name when one differs —
 * `'*'` standing for any template the object does not name. A field with no
 * `in` is read by every design. EditPanel hides a field the section's current
 * design does not read, and lists it again with a layout that does; its copy
 * stays in `c` either way. A `shared: true` field is listed at every design,
 * since other sections print it (the header's identity keys); see fieldShown()
 * below.
 *
 * `type: 'url'` is a plain text box that also says, on blur, why urlProblem()
 * refuses what was typed. The repeaters' address columns use the same input,
 * and `type: 'email'` is that input asking emailProblem() instead.
 * ------------------------------------------------------------------ */

const SHOW_HIDE = [{ v: 'show', l: 'Show' }, { v: 'hide', l: 'Hide' }]
// The header's Tags visibility select sits beside the Tags list input, so its options name what they show.
const SHOW_HIDE_TAGS = [{ v: 'show', l: 'Show tags' }, { v: 'hide', l: 'Hide tags' }]
export const BADGE_MODES = [
  { v: 'rotating', l: 'Visible, rotating' },
  { v: 'static',   l: 'Visible, static' },
  { v: 'hidden',   l: 'Hidden' },
]
// The badge states a design's artwork supports: Lime's and Editorial's layout-1
// badge is a static reticle / star, and Lattice's a still raster disc of dotted rings, so a
// rotating one is not on offer there.
export const badgeOptsFor = (themeName, design, cat = 'header') =>
  design === 0 && (cat === 'header' && (themeName === 'Lime' || themeName === 'Editorial' || themeName === 'Lattice' || themeName === 'Headliner')
    || cat === 'bio' && themeName === 'Lattice')
    ? [{ v: 'rotating', l: 'Visible' }, { v: 'hidden', l: 'Hidden' }]
    : BADGE_MODES

// Pricing layout 2's card fields: the pill's label and the line beside it.
// Lime's own layout 2 draws both, as its frame does (JP-036) — its pill used
// to take no label, so it printed the section's static "Book Now".
const PRICING_CARD = [1]
// Its credit row under the quote, which Lime's layout 2 draws as well.
const PRICING_CREDIT = [1]

export const FIELDS = {
  // Every element appearing in any header layout is exposed. A layout that
  // does not consume a key simply ignores it, so swapping layouts never
  // silently discards copy the user typed — and the panel hides it, off `in`.
  // The exception, named and left for a later batch (JP-059's census): Retro's
  // undesigned layout 5 prints "4.9 ★ / Experience", "5 pcs / Line-up" and a
  // "Tell me your date" pill that no field reaches.
  //
  // `aspect` on an image field is only the FALLBACK frame of the photo editor: it opens on the shape of the
  // field's largest photo on the canvas as drawn now (photoAspectOf, EncoreBuilder.jsx), and falls back to this
  // when the layout or device draws none.
  // The header's `in` is always an object naming all seven templates: they have
  // different header families (six designs against four, four, four, four, four and four —
  // Grunge's, Editorial's and Pop's rows are each measured over four fitted
  // cards, none a placeholder since each template's layout-4 pass). Pop's was
  // measured in its layout-1 sweep and re-measured in each later header
  // session, the last over its fitted card 4 (2026-10-07), unchanged. Lattice's is
  // measured over its fitted Hero alone (cards 2-4 are placeholders: `reach.mjs 5`
  // agreed with it at the 2026-11-20 sweep, so those seats are Lime's twins' rows).
  // Paperback's is the same shape: its rows began as Lattice's (session 0), section 1 set
  // `align`, `badgeText` and the title cap from the fitted Hero, and `reach.mjs 6`
  // (session 12) agreed with them except `cardLine`, which gained `Paperback: [2]`.
  header: [
    { k: 'image',     l: 'Background photo', type: 'image', aspect: [16, 9],
      hint: 'Fills the header behind the type.' },
    { k: 'avatar',    l: 'Artist photo',     type: 'image', aspect: [1, 1],
      hint: 'The portrait card and the small round avatar.' },
    // Kicker and Location are the artist's role and home town, so they also
    // reach the bio, the booking calendar, the enquiry form and the events map
    // (F1, headerIdentity); `in`, and the note it prints, speak for the header.
    // Their hints name where else each prints, and that reach is measured
    // (JP-042: a sentinel in `&who=`, every design × width × surface): the
    // kicker in all four bios and the form's credit row (layouts 1 and 2); the
    // location in bio layouts 1–3, calendar layouts 1 and 4 — except Lime's,
    // Grunge's, Editorial's and Pop's calendar layout 1, a block of its own with no
    // polaroid stamp — and map layout 2's travel card (JP-096).
    // Change a reader, change the hint.
    // Lime's, Grunge's, Editorial's and Pop's layout 3 prints `cardLine` in
    // Retro's kicker seat (JP-061), so their row is [0, 3] (reach.mjs,
    // 2026-09-28; Pop's over its fitted card 3, 2026-10-06).
    // The panel still lists it there (`shared`, as every identity key is), with
    // "Not shown in this layout" while the bio prints the kicker, which the hint
    // answers, as at layout 2.
    { k: 'kicker',    l: 'Small heading', d: 'DJ · Live Act', shared: true,
      // Header-nav ticket (2026-11-11): layouts 1 and 4 no longer print the act type
      // above the name, so only Retro's layout-3 polaroid and layout 6 read it. The
      // rows of the designs that stopped have no cap either: `identityCap` reads
      // this entry without asking `in`, and a cap here would still tighten the
      // bio's hosted box.
      in: { Retro: [2, 5], '*': [] },
      chars: { Retro: [null, null, 17, null, null, 39] },
      hint: 'Your role.' },
    // The layout-3 portrait card's line under the name (JP-061): the card's
    // own copy, so the kicker is not seeded apart there and the bio's Current
    // role always prints what the Kicker field shows. Lime's, Grunge's,
    // Editorial's and Pop's card reads it; Retro's polaroid prints the kicker
    // in that seat. `'*': []` marks Retro, as FIELDS.media.cta does, because
    // only the `HeaderV2` block those four share reads it. Emptied, the card
    // is the name alone.
    { k: 'cardLine',  l: 'Line under your name', d: CARD_LINE_3,
      in: { Lime: [2], Grunge: [2], Editorial: [2], Pop: [2], Lattice: [2], Paperback: [2], '*': [] },
      chars: { Lime: [null, null, 22], Grunge: [null, null, 23], Editorial: [null, null, 23], Pop: [null, null, 29], Lattice: [null, null, 23], Paperback: [null, null, 22] },
      hint: 'The line under your name on the portrait card. The bio’s Performing since is a separate '
          + 'field, so change both if you name a year here. Left empty, it is not drawn.' },
    // The artist's name, page-wide and required (NameInput) — special-cased.
    // Its cap is the header's own (the h1, the nav brand, the layout-3 card),
    // which may take one line more than the frame and shrink to 75% of the
    // seed's size; every other section that prints the name clamps its own
    // copy (IDENTITY_CHARS, sealCap) rather than tightening this one
    // (plans/char-limits.md, session 1, user calls, 2026-10-13).
    { k: 'title',     l: 'Title',
      // The name is FITTED (plans/header-fit.md, 2026-11-18): it sets smaller, to half
      // its size, so the cap is what the floor and the name's other seats hold, read
      // with `limits.mjs header --keys=title --sweep`: 80 where only the title prints it.
      // Retro's layout 3 holds 14 (the polaroid's nowrap caption clips), layout 5 56 and
      // layout 6 39 (the 390 card).
      //
      // Paperback's layout 1 holds 14 (`limits.mjs header --themes=6 --designs=0 --keys=title --sweep`: 60 at
      // 1440, 21 at 390, 14 at 768 where a second line climbs into the vinyl sticker and the photo card); its
      // other three layouts are placeholders and keep Pop's 80, which --check holds.
      //
      // Headliner's layout 1 holds 33 (`limits.mjs header --themes=7 --designs=0 --keys=title --sweep`: open to 80 at 1440 and
      // 768, 33 at 390, where a name that long sets down to the half-size floor and a fifth line climbs into the ring); the
      // others are placeholders and keep Pop's 80.
      chars: { Retro: [80, 80, 14, 80, 56, 39], Lime: 80, Grunge: 80, Editorial: 80, Pop: 80, Lattice: 80, Paperback: [14, 80, 80, 80], Headliner: [33, 80, 80, 80] } },
    // Header-nav ticket (2026-11-11): layout 2 no longer prints the description
    // under the name, so only Retro's layout 5 reads it.
    { k: 'subtitle',  l: 'Subtitle',         type: 'area', def: 'heroSub',
      in: { Retro: [4], '*': [] },
      chars: { Retro: [null, null, null, null, 104] } },
    { k: 'location',  l: 'Location',         d: 'Manchester, UK', shared: true,
      // Header-nav ticket (2026-11-11): no header layout but Retro's 6 prints it
      // any more (layouts 1–4 lost the line, layout 2 its place card and rail).
      in: { Retro: [5], '*': [] },
      chars: { Retro: [null, null, null, null, null, 42] },
      hint: 'Where you are based.' },
    { k: 'cta1',      l: 'Main button',   d: 'Book Now', chars: { Editorial: [16, 16, 10, 16], '*': 16 } },
    // Layout 2's pill under the subtitle (JP-037). Its frame words it apart
    // from the nav's Book Now, so it is a field of its own. Emptied, no pill.
    { k: 'heroCta',   l: 'Button under subtitle',      d: HERO_CTA,
      in: { Retro: [1], Lime: [1], Grunge: [1], Editorial: [1], Pop: [1], Lattice: [1], Paperback: [1], Headliner: [1] },
      chars: { Retro: [null, 34], Lime: [null, 35], Grunge: [null, 40], Editorial: [null, 21], Pop: [null, 25], Lattice: [null, 25], Paperback: [null, 25] },
      hint: 'The button under your name. Left empty, it is not drawn.' },
    // The rest of layout 2's copy (JP-059, reversing Lime's fit, which kept
    // them literals): the pill over the name and the two cards under the
    // photograph, the place card titled by Location. Each is seeded with the
    // frame's text and drops when emptied; a card keeps its tile. The face
    // card's "Performing since 2021" is the artist's copy — the bio's own
    // Performing since is another field, which the hint says.
    { k: 'faceTitle', l: 'Portrait caption title',  d: FACE_TITLE,
      in: { Retro: [1], Lime: [1], Grunge: [1], Editorial: [1], Pop: [1], Lattice: [1], Paperback: [1], Headliner: [1] },
      chars: { Retro: [null, 22], Lime: [null, 24], Grunge: [null, 29], Editorial: [null, 19], Pop: [null, 20], Lattice: [null, 20], Paperback: [null, 19] },
      hint: 'The card beside your portrait, under the photograph. Left empty, it is not drawn.' },
    { k: 'faceBody',  l: 'Portrait caption text',   type: 'area', d: FACE_BODY,
      in: { Retro: [1], Lime: [1], Grunge: [1], Editorial: [1], Pop: [1], Lattice: [1], Paperback: [1], Headliner: [1] }, chars: [null, 180],
      hint: 'The line under the portrait caption title. The bio’s Performing since is a separate field, '
          + 'so change both if you name a year here. Left empty, it is not drawn.' },
    // Named `cta2` on the bio's own content too, which FIELDS.bio.cta2 edits
    // (JP-082): bio layout 4's Listen prints that, not this (JP-059's census).
    // `in` speaks for the header.
    { k: 'cta2',      l: 'Secondary button', d: 'Listen',
      in: { Retro: [4], '*': [] }, chars: 14 },
    // The chips are the header's the way Kicker and Location are (JP-037,
    // headerIdentity): the bio prints the same list and honours the same
    // Show / Hide. An emptied list hides the row, as Hide does. The bio's
    // reach is measured (scripts/reach.mjs): layouts 2 and 4, and Lime's,
    // Grunge's, Editorial's and Pop's 3.
    // Its cap is per chip (`chars`) and chips (`count`), the bio's besides
    // (IDENTITY_CHARS), each chip a sized seat held to twice the longest seed.
    { k: 'tags',      l: 'Tags',             type: 'area', d: TAG_LABELS, shared: true, list: ',',
      in: { Retro: [0, 2, 3, 4, 5], Lime: [0, 2, 3], Grunge: [0, 2, 3], Editorial: [0, 2, 3], Pop: [0, 2, 3], Lattice: [0, 2, 3], Paperback: [0, 2, 3], Headliner: [0, 2, 3] },
      chars: { Retro: [22, null, 22, 22, 15, 22], '*': [22, null, 22, 22] },
      count: { Retro: [8, null, 7, 7, 6, 6], Pop: [6, null, 6, 6], Lattice: [6, null, 6, 6], '*': [8, null, 6, 6] },
      rows: { placeholder: 'Tag', add: 'Add tag' },
      hint: 'Your genre chips. One per row; a comma starts a new row.' },
    { k: 'showTags',  l: 'Tags',        type: 'select', d: 'show', opts: SHOW_HIDE_TAGS, shared: true,
      in: { Retro: [0, 2, 3, 4, 5], Lime: [0, 2, 3], Grunge: [0, 2, 3], Editorial: [0, 2, 3], Pop: [0, 2, 3], Lattice: [0, 2, 3], Paperback: [0, 2, 3], Headliner: [0, 2, 3] },
      hint: 'Show or hide the tag chips wherever they are printed.' },
    // Three states (header-nav ticket, 2026-11-11): the seal is visible and
    // turning (today's), visible and still, or hidden. `badgeMode` replaces the
    // old `showBadge` Show / Hide on the header (the footer keeps its own), and
    // `legacyContent` carries a stored `showBadge: 'hide'` over. Lime's and
    // Editorial's layout-1 artwork (a reticle, a star) has no ring to turn, so
    // EditPanel offers those two Show / Hide alone (`badgeOptsFor`).
    { k: 'badgeMode', l: 'Corner badge',     type: 'select', d: 'rotating', opts: BADGE_MODES,
      in: { Retro: [0, 1, 3, 4, 5], Lime: [0, 3], Grunge: [0, 3], Editorial: [0, 3], Pop: [0, 3], Lattice: [0, 3], Paperback: [0, 3], Headliner: [0, 3] } },
    // The seal's ring sets it twice round a circle, so its cap is the ring's
    // fit (scripts/limits.mjs's ring test). Left empty, the ring prints the
    // artist's name, clamped to the same fit (sealCap).
    { k: 'badgeText', l: 'Corner badge text',                    // defaults to the artist's name — special-cased
      in: { Retro: [0, 1, 3, 4, 5], Lime: [3], Grunge: [0, 3], Editorial: [3], Pop: [0, 3], Lattice: [3], Paperback: [0, 3], Headliner: [0, 3] },
      chars: { Retro: 19, Lime: [null, null, null, 13], Grunge: [14, null, null, 14], Editorial: [null, null, null, 10],
        Pop: [12, null, null, 10], Lattice: [null, null, null, 13], Paperback: [12, null, null, 10],
        // Headliner layout 1 prints the ringed numeral ("26" in the frame, the artist's initials until typed over) inside a
        // 96 / 96 / 56 px hole: three characters, the third setting the numeral at 0.72 (three capital Ws are 72 px in the
        // 56 hole at full size at 390; the probe's three-letter sentinel needs the third seat too).
        Headliner: [3, null, null, 14] } },
    { k: 'navMode',   l: 'Menu style', type: 'select', d: 'sections', opts: [
      { v: 'sections', l: 'Follow my sections' },
      { v: 'minimal',  l: 'Minimal (Music · Gigs · About)' },
    ] },
    { k: 'align',     l: 'Page alignment',        type: 'select', d: 'left', in: { Retro: [0], Lime: [0], Grunge: [0], Editorial: [0], Pop: [0], Lattice: [0], Paperback: [], Headliner: [] }, opts: [
      { v: 'left',   l: 'Left' },
      { v: 'centre', l: 'Centre' },
    ] },
  ],
  bio: [
    { k: 'image',     l: 'Photo', type: 'image', aspect: [4, 5], hint: "Fills the bio's portrait card." },
    // Caps: plans/char-limits.md, session 2. Where 1440 stacks the heading a
    // word a line (Lime's, Editorial's and Pop's layout 1, Pop's layout 4), the
    // head is fitted to its widest word (session 12) and may shrink to 75% of
    // the seed's size, the name's floor; 768 and 390 bind there (notes/bio.md).
    { k: 'heading',   l: 'Heading', d: 'Reads the room.', in: [0, 2, 3],
      chars: { Retro: [20, null, 19, 23], Lime: [19, null, 18, 21], Grunge: [21, null, 20, 18],
        Editorial: [15, null, 15, 17], Pop: [17, null, 17, 19],
        // Lattice layout 1 measured 2026-11-19 (scripts/limits.mjs bio --themes=5 --designs=0); 3 and 4 are Pop's until their passes.
        Lattice: [21, null, 17, 19],
        // Paperback layout 1 measured 2026-11-20 (limits.mjs bio --themes=6 --designs=0): the head is one line at 768 and 390
        // in the frame, so 390 binds at the seed's own 15 (the probe's floor); 3 and 4 are Pop's until their passes.
        Paperback: [15, null, 17, 19],
        // Headliner layout 1 measured 2026-11-23 (limits.mjs bio --themes=7 --designs=0: 17 at 1440, 19 at 768 and 390; the statement is
        // two lines in a 5em measure and a third reaches into the portrait); 3 and 4 are Grunge's until their passes.
        Headliner: [17, null, 20, 18] } },
    // Layout 2's pill over the paragraph (JP-059), seeded with the frame's
    // copy and cased as a label; emptied, it is not drawn.
    { k: 'tag',       l: 'Highlight tag', d: BIO_TAG, in: [1], chars: [null, 18],
      hint: 'The small pill over the first paragraph. Left empty, it is not drawn.' },
    { k: 'para1',     l: 'Paragraph 1', type: 'area', def: 'bioP1', chars: 390 },
    // Headliner's layout 1 prints it too, as the paragraph under `About` (the lead above the rule is `para1`).
    { k: 'para2',     l: 'Paragraph 2', type: 'area', def: 'bioP2', in: { Headliner: [0, 2, 3], '*': [2, 3] },
      chars: { Headliner: [340, null, 340, 340], '*': [null, null, 340, 340] } },
    // Layout 2's foot row (JP-037): the frame's two-tone line, whose first
    // three words take the accent (`vm.bioCredit`), and the pill beside it.
    // Each drops when emptied, and the row with both.
    { k: 'credit',    l: 'Footer line', d: BIO_CREDIT, in: [1], chars: { Paperback: [null, 39], '*': [null, 43] },
      hint: 'The line at the foot of the card. Its first three words take the accent colour.' },
    // Paperback's layout 1 draws it too: the black `Full bio` pill under the About copy (seeded by
    // sectionVm and `fieldSeed`, as the calendar's Lattice `Continue`).
    { k: 'cta',       l: 'Button', d: BIO_CTA, in: { Paperback: [0, 1], '*': [1] }, chars: { Paperback: [16, 16], '*': [null, 16] },
      hint: { '*': 'The button beside the footer line. Left empty, it is not drawn.',
        Paperback: 'The black pill under the About copy (layout 1) and the button beside the footer line (layout 2). Left empty, it is not drawn.' } },
    // Layout 3's ID card draws a row of stats, and the frame's first one is
    // "Performing since: June 2021". Seeded with the frame's copy (QA,
    // 2026-09-15 — layout 2's price row and bookings line were the precedent),
    // so the seeded card draws the frame's three columns; emptied, the column
    // is not drawn.
    { k: 'since',     l: 'Performing since', def: 'since', in: [2, 3],
      chars: { Retro: [null, null, 9, 31], Lime: [null, null, 22, 31], Paperback: [null, null, 12, 31], '*': [null, null, 20, 31] },
      hint: 'The ID card’s first stat (layout 3) and the overlay card’s middle line (layout 4), where it reads “Performing since …”. Just the date, then. Left empty, neither is drawn.' },
    // JP-071 (user call, 2026-09-29, reversing the fit's "a frame label stays
    // a literal" for these): the ID card's labels, each seeded with the
    // frame's word, uncased (the card cases them), and not drawn when emptied.
    // A stat's label goes with its value as well: Current role and Based in
    // print the header's Kicker and Location. The line break before the last
    // word is sectionVm's, so each is one line here.
    { k: 'sinceLabel', l: 'Performing since heading', d: BIO_SINCE_LABEL, in: [2], chars: [null, null, 17],
      hint: 'The label over the date on the ID card. It breaks before its last word. '
          + 'Left empty, the date stands alone.' },
    { k: 'roleLabel',  l: 'Current role heading', d: BIO_ROLE_LABEL, in: [2], chars: [null, null, 14],
      hint: 'The label over the Header’s Small heading on the ID card. Left empty, the kicker stands alone.' },
    { k: 'baseLabel',  l: 'Based in heading', d: BIO_BASE_LABEL, in: [2],
      chars: { Retro: [null, null, 16], Lime: [null, null, 16], Pop: [null, null, 14], Paperback: [null, null, 16], '*': [null, null, 19] },
      hint: 'The label over the Header’s Location on the ID card. Left empty, the location stands alone.' },
    { k: 'aboutLabel', l: 'About heading', d: BIO_ABOUT_LABEL, in: [2],
      chars: { Editorial: [null, null, 59], Pop: [null, null, 48], Paperback: [null, null, 48], '*': [null, null, 56] },
      hint: 'The bracketed label over the paragraphs on the ID card. Left empty, it is not drawn.' },
    // The circular badge at layouts 1, 3 and 5 (layout 5 folds onto design 0): the
    // header's three states (2026-11-11). Editorial's layout 3 draws a sparkle, not
    // a badge, so it reads this at layout 1 alone. `sectionVm` folds it into `showBadge` /
    // `badgeSpin`; an absent key is today's rotating seal.
    { k: 'badgeMode', l: 'Badge', type: 'select', d: 'rotating', opts: BADGE_MODES, in: { Editorial: [0], Headliner: [2], '*': [0, 2] },
      hint: 'Show the circular badge turning, show it still, or hide it. Hidden leaves no gap.' },
    // Layout 4's "Listen ↗" (JP-082, user call, 2026-09-29): the key the bio
    // already read, `vm.cta2` off its own content, which no field reached
    // (JP-059's census named it a control). Uncased; the ↗ is the markup's.
    { k: 'cta2',      l: 'Listen link', d: 'Listen', in: [3], chars: [null, null, null, 14],
      hint: 'The link beside Performing since, to your Media Player on the published page. '
          + 'Leave it empty to hide it.' },
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
    // A column's floor is its longest seeded row (session 3): Manchester at 3am
    // (17) and Live at the Deaf Institute · 7:01 (33), which the frames draw.
    { k: 'tracks',  l: 'Tracks', type: 'tracks', max: 8,
      cols: { title: { Retro: [17, 17, 20, 17], Lime: [40, 17, 19, 17], Grunge: [24, 17, 21, 17],
        // Headliner's layout 1 (limits.mjs media --themes=7 --designs=0): the probe reads 11 / 14 / 10, under the seed, so the
        // cap holds at the seed's 17 (the column's floor) and a longer title ellipsises in its row; layouts 2-4 are Grunge's.
        Headliner: [17, 17, 21, 17], '*': [17, 17, 17, 17] },
        sub: 33 },
      hint: 'Each row is one card in the stack, with its own artwork and audio: upload a recording or paste a link. '
          + "The player shows the track it is on, so track one's artwork is the sleeve." },
    // (The kicker "Top tracks", the "● Popular" list label and the "5 Featured /
    // 5 Max" counter's two words were removed 2026-11-12, user call: notes/media.md.)
    { k: 'heading', l: 'Heading', d: 'Five worth your ear.',
      chars: { Retro: [20, 20, 25, 20], Grunge: [30, 20, 20, 25], Pop: [20, 20, 20, 23],
        // Headliner's layout 1: the head is one line at 1440 at 20 characters (a 21st wraps it, which the section absorbs).
        Headliner: [20, 20, 20, 25], '*': [20, 20, 20, 20] } },
    // JP-095 (a): the chip on the fan's front card, the frame's word, uncased.
    { k: 'chipLabel', l: 'Track tag', d: MEDIA_CHIP_LABEL, in: [1],
      chars: { Retro: [null, 10], Lime: [null, 9], Paperback: [null, 9], '*': [null, 10] },
      hint: 'The chip on the front card of the fan, after a dot. Left empty, it is not drawn.' },
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
    // template is read everywhere by fieldReach, and no other template reads
    // this, so the panel hides it under them.
    { k: 'cta', l: 'Button', d: 'Book Now', in: { Lime: [0], Grunge: [0], '*': [] },
      chars: { Lime: [16], Grunge: [16] },
      hint: 'Scrolls to your enquiry form, or the next place to book. Empty drops the button.' },
  ],
  // The video section (plans/video.md): layout-bound to layouts 2 and 4, so
  // every `in` below names designs 1 and/or 3. Both layouts play the artist's
  // YouTube links in the published tab (`videos`, notes/video.md "YouTube
  // links": layout 2 on 2026-10-28, Retro's first and the other four the same
  // day; layout 4 the same day again, its centre disc playing and its skip
  // discs stepping the one list). Layout 2's drawn transport, the artist row
  // with its photo and Follow pill, and the rows' length, source and date are
  // gone, and with them the `avatar`, `description` and `followCta` fields;
  // layout 4's foot band (clock, bar, volume, settings, HD) went with
  // `duration`. Layout 2's stage prints the playing video's title and line,
  // and layout 4's top bar its title, so `heading` is layout 4's alone. View
  // All is layout 2's and goes somewhere: `channel`, filled from the videos'
  // oEmbed answers while absent. The poster fills the player at both layouts.
  video: [
    { k: 'image',   l: 'Poster', type: 'image', aspect: [16, 9], in: [1, 3],
      hint: 'Fills the player in layouts 2 and 4 while the playing video has no YouTube thumbnail.' },
    // The eleventh repeater, { url, title, desc } per video. Six, the layout-2
    // frame's six seats; layout 4 plays the same list, one at a time.
    { k: 'videos',  l: 'Videos', type: 'videos', max: 6, in: [1, 3],
      // Measured 2026-10-28 (limits.mjs): at layout 2 the row's two-line clamp binds
      // the title (Retro 50, Lime 39, Grunge 46, Pop 29, Editorial 21: Titan's and
      // Gloock's capitals are the widest, and their seeds already take two lines), the
      // stage's one meta line the description (63 at 390 on all five). At layout 4
      // the top bar's one ellipsised line beside the arrow binds the title (390's
      // box), and no description is drawn, but the panel still lists the box, so it
      // takes layout 2's 63: the copy is layout 2's.
      // The layout-4 seats were 54 / 50 / 55 / 29 / 35 until the title took its pill
      // (JP-163): the pill's padding binds the 390 box sooner.
      cols: { title: { Retro: [null, 50, null, 48], Lime: [null, 39, null, 44], Grunge: [null, 46, null, 49],
        Editorial: [null, 21, null, 27], Pop: [null, 29, null, 31], Paperback: [null, 20, null, 30] }, desc: { Paperback: [null, 61, null, 63], '*': [null, 63, null, 63] } },
      hint: 'Paste a YouTube video, short or playlist link; the title fills itself in, and you can '
          + 'change it. Layout 2 lists them beside the player, which shows the playing video’s title '
          + 'and description (with no description, its YouTube channel’s name). Layout 4 plays them '
          + 'one at a time under its title, stepped by the arrows. The videos play on the published page.' },
    // Layout 4's band's display head (HEADING_4). Layout 2 printed it over the
    // description until 2026-10-28, when the playing video's title took the
    // seat; the layout-2 measures below are kept as history, their seats null.
    { k: 'heading', l: 'Heading', d: TITLES.video, in: [3],
      // Measured on Retro (limits.mjs): 64 at layout 2 (390), 20 at layout 4 (390; 30 at 1440
      // would take a second line). Lime's layout 2 holds 82 (390's box binds; its label face is
      // narrower); its layout 4 holds 19 (390 binds: 28 at 1440, 24 at 768; session 3).
      // Grunge's layout 2 holds 91 (the box binds at 390: Anton in capitals is narrower again;
      // session 4); its layout 4 holds 25 (390 binds: 32 at 1440, 27 at 768; session 5).
      // Editorial's layout 2 holds 48 (390's box binds: Gloock in capitals is the widest of the
      // five faces; session 6); its layout 4 holds 16 (session 7: the measure is 15 at 768, 19 at
      // 1440 and 20 at 390, but the 16-character seed is the frame's own string and fits in one
      // line there, so the cap is the seed's length, `--check`'s 'floor' as the description's).
      // Pop's layout 2 holds 47 (76 / 85 / 47: 390's box binds, Titan One in capitals; session 8);
      // its layout 4 holds 16 (session 9: the measure is 20 at 1440 (the arrow), 15 at 768 and
      // 17 at 390, but the 16-character seed is the frame's own string and fits in one line
      // there, so the cap is the seed's length, as Editorial's).
      chars: { Lime: [null, null, null, 19], Grunge: [null, null, null, 25], Editorial: [null, null, null, 16],
        Pop: [null, null, null, 16], Paperback: [null, null, null, 19], '*': [null, null, null, 20] },
      hint: 'The band’s large head, layout 4 only.' },
    // Call 3: View All, JP-071's shape (the frame's own bytes, uncased, dropped
    // when emptied). "Top music video" stays a literal. Measured 39 at 390: held
    // to 16 by judgement, as the repertoire's and the form's pills are.
    { k: 'allCta',  l: 'List link', d: VIDEO_ALL, in: [1],
      chars: { '*': [null, 16] },
      hint: 'The link at the head of the list beside the player. Left empty, it is not drawn.' },
    // Layout 2: where View All goes on the published page. VideosField fills
    // it with the first channel an oEmbed answer names while the key is
    // absent; an emptied box stays empty.
    { k: 'channel', l: 'List link address', type: 'url', d: '', in: [1],
      hint: 'Where View All goes on the published page: your YouTube channel. It fills itself in from '
          + 'your videos’ channel; change it to any page, or empty it to leave View All a label.' },
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
      chars: { Retro: [42, 42, 44], Lime: [50, 42, 37], Grunge: [55, 44, 41], Editorial: [42, 42, 25],
        Pop: [48, 42, 28],
        // Lattice layout 1 measured: 32 (the seed's four lines at 390 are the frame's, and prose of 33 takes a fifth),
        // so the seed's own 42 is the floor, as the gallery's and the bio's heads. Layouts 2-4: Pop's, provisional.
        Lattice: [42, 42, 28],
        // Paperback layout 1 measured 2026-11-21 (limits.mjs pricing --themes=6 --designs=0 --upright): 46 (the seed's 42 fits); layouts 2-4 Pop's.
        Paperback: [46, 42, 28] },
      hint: 'Layouts 1, 2 and 3 only. Layout 4 is a stack of service rows and heads them with '
          + 'the package names alone, so it draws no title.' },
    { k: 'tiers',   l: 'Packages', type: 'tiers', max: 6,
      // Session 4 of the character-limits pass: a package's tags are chips (twice
      // the longest seed of any design, since a stored list keeps it at every
      // layout) and its features one a line, their count bound at layout 4 alone.
      cols: {
        name: { Retro: [19, 18, 53, 16], Lime: [30, 28, 42, 23], Grunge: [40, 34, 51, 25], Editorial: [22, 18, 27, 16],
          Pop: [16, 16, 30, 18],
          // Layout 1 measured 15 (desktop 17, tablet 15, mobile 17); the seed's 16 (The Festival Set) is the floor.
          Lattice: [16, 16, 30, 18],
          // Paperback layout 1 measured 29 (desktop 37, tablet 29, mobile 30); the rest Pop's.
          Paperback: [29, 16, 26, 18] },
        // `num` is the first number run, the big numeral: a price of digits alone
        // sets whole in it, so it is measured apart from the total (`chars`, the
        // price with its small tail). User call, 2026-11-06. The numeral's cap is
        // one number per template, the tightest layout's (the deck at 768: Retro 5,
        // Lime 10, Grunge 11, Editorial 8, Pop 7), so a price typed at layout 2, 3
        // or 4 cannot be one the deck then cuts (JP-168, user call, 2026-11-11);
        // what is stored over it renders cut to a `…`, clampNumeral().
        price: { chars: { Retro: [8, 33, 31, 25], Lime: [12, 35, 25, 29], Grunge: [14, 35, 30, 34], Editorial: [11, 33, 27, 20],
          Pop: [10, 34, 25, 23],
          // Layout 1 measured 9 (one run in the display face, a range's tail wrapping at its spaces); the rest Pop's.
          Lattice: [9, 34, 25, 23],
          // Paperback layout 1 measured 10 (desktop 10, tablet 12, mobile 17: one run in the display face, a tail wrapping at its spaces).
          Paperback: [10, 25, 21, 17] },
          // Lattice's numeral is layout 1's 9 (measured: desktop 9, tablet 10, mobile 12) held to Pop's 7, the tightest of
          // the placeholder layouts' provisional rows, so a price typed at layout 2, 3 or 4 is not one the deck then cuts.
          num: { Retro: 5, Lime: 10, Grunge: 11, Editorial: 8, Pop: 7, Lattice: 7,
            // Paperback layout 1 measured 9 / 11 / 14 (the card's box); held to Pop's 7 as Lattice's is, layouts 2-4 being unmeasured.
            Paperback: 7 } },
        // Lattice layout 1 measured: an item 42 at 390 (so the shared 26 holds), and three tags a package (a fourth chip
        // wraps the 390 row's second line).
        tags: { list: ',', chars: { Retro: [12, null, 12, 12], Lattice: [26, null, 26, 26], '*': [26, null, 26, 26] },
          count: { Retro: [4, null, 5, 6], Pop: [3, null, 4, 5], Lattice: [3, null, 4, 5], Paperback: [3, null, 4, 5], '*': [4, null, 4, 5] } },
        blurb: 160,
        feats: { list: '\n', chars: { Retro: [24, 24, 24, 59], Grunge: [25, 24, 24, 62], Editorial: [25, 24, 24, 60],
          // Paperback layout 1 measured 35 (desktop 45, tablet 35, mobile 36).
          Pop: [26, 24, 24, 62], Lattice: [24, 24, 24, 62], Paperback: [35, 24, 24, 57], '*': [24, 24, 24, 62] }, count: [15, 15, 15, 5] },
      },
      hint: 'Tags become the filter chips above the packages in layouts 1 and 3. '
          + 'Layout 3 starts the packages tagged Duo where the other layouts '
          + 'have Solo, and layout 1 in Lime, Grunge, Editorial and Pop starts them on Private Event, '
          + 'Club Night and Festival; once you edit the list, it is the same at every layout.'
          + ' Layout 2 shows one package at a '
          + 'time and names them in its own chip row, so it reads no tags. Layout 4 has no '
          + 'filter: it prints the tags and the features on the package itself. In layouts 1, 2 '
          + 'and 3, whatever comes before the price’s first digit — a £, or a word like From — '
          + 'prints small beside it, and so does whatever follows its first number, such as the '
          + 'second half of a range. Tick Featured '
          + 'to give a package layout 3’s Featured badge; with none ticked, it goes to the last '
          + 'package on show.' },
    { k: 'unit',    l: 'Price unit', d: PRICE_UNIT,
      chars: { Retro: [7, 37, 32, 69], Lime: [13, 40, 28, 88], Grunge: [15, 41, 33, 98], Editorial: [12, 37, 29, 53],
        Pop: [11, 39, 27, 51],
        // Layout 1 measured 29 (desktop 37; tablet and mobile 29): the unit stands in the card's top row, right-aligned.
        Lattice: [29, 39, 27, 51],
        // Paperback layout 1 measured 11 (desktop 11, tablet 17, mobile 17): the unit stands in the card's top row, right-aligned.
        Paperback: [11, 31, 23, 39] },
      hint: 'Printed after the price in layouts 1, 2 and 3. Layout 4 stands it above the price '
          + 'instead, as the kind of booking being priced, and drops a leading slash.' },
    { k: 'intro',   l: 'Intro line', type: 'area', d: PRICING_INTRO_3, in: [2],
      chars: [null, null, 240],
      hint: 'A line under the heading. Layout 3 only.' },
    { k: 'offer',   l: 'Special offer text', d: PRICING_OFFER, in: [2],
      chars: { Retro: [null, null, 63], '*': [null, null, 59] },
      hint: 'A short line beside the filter chips, such as a discount. Layout 3 only. '
          + 'Empty it to drop the line.' },
    { k: 'quote',   l: 'Quote', type: 'area', def: 'pricingQuote', in: [1],
      chars: [null, 260],
      hint: 'A line of praise beside the plan. Layout 2 only.' },
    // Layout 2's credit row under the quote and the line beside its pill, all
    // seeded with the frame's own copy. Every one is emptiable and drops what
    // it fills; the row goes when all three of its fields are empty. Lime's
    // layout 2 draws all five as well (the pill's label and its line since
    // JP-036). None of the five names a layout in its label: the panel
    // lists them at layout 2 alone. The hints say where instead.
    { k: 'images',  l: 'Reviewer photos', type: 'images', max: 3, aspect: [1, 1], in: PRICING_CREDIT,
      hint: 'Small faces under the plan card’s quote.' },
    { k: 'reviews', l: 'Review count', d: PRICING_REVIEWS, in: PRICING_CREDIT,
      chars: { Retro: [null, 54], Paperback: [null, 53], '*': [null, 55] },
      hint: 'In the credit row under the quote, after the stars.' },
    { k: 'rating',  l: 'Rating', d: PRICING_RATING, in: PRICING_CREDIT,
      chars: { Paperback: [null, 44], '*': [null, 47] },
      hint: 'The five stars beside it are drawn while this is filled.' },
    // Named for its card rather than numbered, so it still reads apart from
    // the package button below.
    { k: 'cta',     l: 'Plan button', d: PRICING_CTA, in: PRICING_CARD,
      chars: { Retro: [null, 40], Lime: [null, 39], Grunge: [null, 40], Editorial: [null, 23], Pop: [null, 27], Paperback: [null, 23] },
      hint: 'The pill under the price on layout 2’s plan card. Empty it to drop the pill.' },
    { k: 'note',    l: 'Note beside plan button', d: PRICING_NOTE, in: PRICING_CARD,
      chars: { Retro: [null, 54], Paperback: [null, 54], '*': [null, 55] },
      hint: 'Layout 2 only. A phone stacks it under the pill.' },
    // JP-095 (a): the label over the plan card's features, in the frame's
    // capitals. Drawn while the package has features, as the list is. Layout
    // 3 prints it over every package's features too (JP-125, 2026-10-09).
    { k: 'featsLabel', l: 'Package features heading', d: PRICING_FEATS_LABEL, in: [1, 2],
      chars: { Retro: [null, 48, 57], Lime: [null, 68, 51], Pop: [null, 35, 57], Paperback: [null, 61, 51], '*': [null, 68, 55] },
      hint: 'The label over the features, on layout 2’s plan card and on each of layout 3’s '
          + 'packages. Left empty, it is not drawn.' },
    // JP-125 (user call, 2026-10-09): layout 3's FEATURED badge. Emptied, the
    // badge goes and the featured package keeps its fill.
    { k: 'badgeLabel', l: 'Featured badge', d: PRICING_BADGE, in: [2],
      chars: [null, null, 16],
      hint: 'The badge on layout 3’s featured package. Left empty, it is not drawn; the package '
          + 'stays highlighted.' },
    // Every package's pill (JP-070): layout 4's row pill until then, and
    // layouts 1 and 3 printed the section's unfielded "Book Now". `d` is
    // layout 1's word; sectionVm and EditPanel resolve layouts 3 and 4's.
    { k: 'rowCta',  l: 'Package button', d: 'Book Now', in: [0, 2, 3],
      chars: { Retro: [12, null, 12, 26], Lime: [14, null, 12, 26], Grunge: [16, null, 12, 26],
        Editorial: [9, null, 12, 26], Pop: [10, null, 12, 26],
        // Layout 1 measured 34 (the full-width bar: desktop 42, tablet 34, mobile 35); the rest Pop's.
        Lattice: [34, null, 12, 26],
        // Paperback layout 1 measured 34 (desktop 47, tablet 34, mobile 37): the split pill's label.
        Paperback: [34, null, 12, 26] },
      hint: 'The pill on every package. Layout 3 starts from “Book” and layout 4 from '
          + '“Start Enquiry”. Layout 2 has its own plan button. Empty it to drop the pill.' },
    { k: 'sub',     l: 'Small print', def: 'pricingSub',
      chars: { Retro: [133, 67, 67, 67], Grunge: [53, 67, 63, 67], Pop: [80, 67, 63, 67], Lattice: [85, 67, 63, 67], Paperback: [80, 53, 53, 53], '*': [67, 67, 63, 67] } },
  ],
  // The other list-shaped content type with a structured editor rather than a
  // textarea (see `media` above): `songs` is an array of
  // { title, artist, tags, length }, and SongsField in EncoreBuilder is the
  // repeater that maintains it. An absent key means the seeded SONGS; an
  // emptied array means no songs listed. `sets` is layout 3's set details,
  // { [case-folded tag]: { mood, length } }, maintained by SetsField, which
  // lists the sets the songs' tags make (REP_SETS, repSetsOf()).
  repertoire: [
    // No `d`: the heading falls back to the song count, in sectionVm and in
    // the panel alike, so it cannot claim 240 songs over a list of twelve.
    // Layouts 3 and 4 start from their frames' "Curated sets" (JP-070) and
    // "Repertoire" (JP-081) instead, which count nothing. An emptied heading
    // stays empty at every layout.
    { k: 'heading', l: 'Heading',
      chars: { Retro: [14, 31, 20, 17], Lime: [11, 32, 19, 15], Grunge: [13, 38, 25, 20], Editorial: [8, 21, 12, 10],
        Pop: [11, 25, 17, 10],
        // Lattice layout 1 measured 2026-11-19 (limits.mjs repertoire --themes=5 --designs=0): 12 at 1440 and 390,
        // 17 at 768. The other three layouts are Pop's until their passes.
        Lattice: [12, 25, 17, 10],
        // Paperback layout 1 measured 2026-11-20 (limits.mjs repertoire --themes=6 --designs=0): 13 at 1440 and 768, 14 at 390,
        // the count and the disc beside it. Layouts 2-4 are Pop's until their passes.
        Paperback: [13, 22, 17, 10] } },
    // `in` is per field, and every layout reads the songs, so the hint says
    // which column each layout leaves out (JP-107): the reviews' date shape.
    // Session 5 of the character-limits pass: a tag is a chip, and at layout 3
    // the key of its set (`c.sets`), so its cap is one number at every layout
    // and template, and a stored tag is never clamped into another key. Its
    // count is how many distinct chips the binding row holds; layout 4 prints
    // no tags and takes the tightest, so a list typed there is not cut elsewhere.
    { k: 'songs',   l: 'Songs', type: 'songs', max: 60,
      cols: {
        title: { Retro: [17, 25, 25, 25], Lime: [44, 24, 17, 22], Grunge: [33, 26, 23, 26], Editorial: 17, Pop: 17, Paperback: 17 },
        artist: { Retro: [32, 25, null, 41], Lime: [73, 25, null, 37], Grunge: [74, 25, null, 42],
          Editorial: [35, 25, null, 18], Pop: [18, 25, null, 19],
          // Lattice layout 1: 22 at 768 and 390 (one line beside a 17-character title); 1440 holds 44.
          Lattice: [22, 25, null, 19],
          // Paperback layout 1: 22 at 768 and 390 (the chip ellipsises past it, the frame's longest artist is 18); 1440 holds 48.
          Paperback: [22, 25, null, 19] },
        length: { Retro: [null, null, 23], Lime: [null, null, 17], Grunge: [null, null, 22], Editorial: [null, null, 17],
          Pop: [null, null, 14], Paperback: [null, null, 10] },
        tags: { list: ',', chars: 18, count: { Editorial: [3, 4, 3, 3], Lattice: [3, 4, 3, 3], '*': [4, 4, 3, 3] } },
      },
      hint: 'Tags become the filter chips above the list. Layout 4 draws no chips: it indexes the whole list A–Z instead. '
          + 'Layout 3 groups the songs into one set per tag and shows each song’s length in place of its artist; '
          + 'the other layouts show the artist and not the length.' },
    // The mood and length share one clipped line (`repSetLine()`), so they split
    // its budget, measured together: the length takes up to 10 ("90 minutes"),
    // the mood the rest, never under its seed's 14 (session 5).
    { k: 'sets',    l: 'Set lists', type: 'sets', in: [2],
      cols: { mood: { Retro: [null, null, 17], Lime: [null, null, 14], Grunge: [null, null, 17], Editorial: [null, null, 17],
        Pop: [null, null, 14], Paperback: [null, null, 14] }, length: { Lime: [null, null, 7], '*': [null, null, 10] } },
      hint: 'One per tag on your songs. The mood and length show under the set’s name in layout 3; with both empty, it shows the song count.' },
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
    { k: 'images',  l: 'Photos', type: 'images', max: 7, aspect: [3, 2],
      hint: 'One per tile. Layout 1 shows the highlighted one in its viewer; layouts 2 and 4 show it as the large photo beside the others.' },
    // JP-120 (gallery): the eyebrow over the heading, the frames' word, uncased.
    { k: 'kicker',  l: 'Small heading', d: GALLERY_KICKER, in: [0, 3],
      chars: { Retro: [44, null, null, 49], Pop: [44, null, null, 39], Lattice: [41, null, null, 51], Paperback: [25, null, null, 39], '*': [55, null, null, 51] },
      hint: 'A small line over the heading. Empty by default; type one to show it.' },
    { k: 'heading', l: 'Heading', d: 'See us in action',
      chars: { Retro: [20, 27, 18, 24], Lime: [19, 26, 18, 23], Grunge: [29, 26, 23, 24], Editorial: [16, 26, 11, 20],
        Pop: [16, 27, 15, 20], Lattice: [16, 27, 15, 20], Paperback: [16, 23, 15, 20] } },
    // JP-098: the 768 head row's word, the frame's, uncased. `in` cannot name a
    // width, so the hint does. JP-120 (gallery): layout 1's credit line too.
    { k: 'railLabel', l: 'Gallery caption', d: GALLERY_RAIL_LABEL, in: [0, 1],
      chars: { Retro: [49, 70], Lime: [55, 64], Editorial: [32, 70], Pop: [49, 70], Lattice: [45, 70], Paperback: [18, 64], '*': [55, 70] },
      hint: 'The line under your name over the large photo in layout 1, and the label over the small '
          + 'photos in layout 2, on a tablet only. Left empty, neither is drawn.' },
    // JP-120 (gallery): two words that head a control or a row standing
    // whatever they say, so an emptied one reads its seed again (venueCta's
    // rule). The row's label prints at desktop alone, so the hint says so.
    { k: 'backLabel', l: 'Back to first photo link', d: GALLERY_BACK_LABEL, in: [0], chars: [34],
      hint: 'The link over the large photo that goes back to the first one. Left empty, it shows '
          + '“Back to beginning” again.' },
    { k: 'sourceLabel', l: 'Social links heading', d: GALLERY_SOURCES[0].l, in: [0],
      chars: { Retro: [42], Lime: [49], Grunge: [58], Editorial: [37], Pop: [50], Lattice: [25], Paperback: [36] },
      hint: 'The first row, above YouTube, Instagram and TikTok, on desktop only. Left empty, it '
          + 'shows “Gallery” again.' },
    { k: 'youtube',   l: 'YouTube link', type: 'url', d: '', in: [0],
      hint: 'A video, short or playlist link plays inside the section when the YouTube row is clicked on the '
          + 'published page; any other YouTube address opens in a new tab. Leave empty and it stays a picture. Layout 1 only.' },
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
  // card, `cta` the label on layout 1's pill, `slots` layout 2's list
  // (JP-052), and `email` the address layout 4's Send Enquiry mails (JP-076).
  // `in` records each key's reach.
  calendar: [
    // Lattice's layout 1 draws a dotted torus (art, not a photograph) in that seat, so only layout 4's disc reads it.
    { k: 'image',   l: 'Photo', type: 'image', aspect: [1, 1], in: { Lattice: [3], Paperback: [3], '*': [0, 3] },
      hint: 'Fills the polaroid stack beside the month in layout 1, and the small disc on '
          + "layout 4's summary card. Layouts 2 and 3 draw no photograph. Lattice's and Paperback's layout 1 draw none either." },
    { k: 'heading', l: 'Heading', d: 'Availability', in: { Lime: [0, 1, 2, 3], Grunge: [0, 1, 2, 3], Editorial: [0, 1, 2, 3], Pop: [0, 1, 2, 3], Lattice: [0, 1, 2, 3], Paperback: [1, 2, 3], '*': [1, 2, 3] },
      // Paperback's layout 1 draws the month as its head, so it reads no heading. Lattice's layout 1 measured (limits.mjs calendar --themes=5 --designs=0); the others are Pop's, provisional.
      chars: { Retro: [null, 25, 36, 18], Lime: [25, 22, 32, 18], Grunge: [28, 24, 35, 23], Editorial: [14, 14, 21, 11], Pop: [13, 20, 24, 15],
        Lattice: [25, 20, 24, 15], Paperback: [13, 14, 24, 15] } },
    { k: 'open',    l: 'Calendar start date', type: 'date', d: CAL_OPEN,
      hint: 'The month the calendar opens on, and the date it opens picked. '
          + `Layouts 1 and 3 page through ${CAL_SPAN} months from there, layout 2's seeded `
          + "dates count from it until you type a date of your own, and layout 4's date card "
          + "shows it. On the published page, days before today can't be picked, and a past "
          + "date opens it on today's month and counts layout 2's seeded dates from today." },
    { k: 'booked',  l: 'Booked dates', type: 'booked',
      hint: 'Click a day to block it. A blocked day cannot be picked on the published page, '
          + "and layout 4's date card refuses it when a visitor types it. "
          + 'The months here are the published ones, so they start at today when the opening '
          + 'date has passed.' },
    { k: 'time',    l: 'Event start time', d: CAL_TIME, in: [0, 3],
      chars: { Retro: [33, null, null, 34], Lime: [13, null, null, 32], Grunge: [13, null, null, 37], Editorial: [13, null, null, 33], Pop: [28, null, null, 33],
        Lattice: [16, null, null, 33],
        // Paperback's layout 1 measured (limits.mjs calendar --themes=6 --designs=0 --upright): 24 binds at 768, where the line is one line.
        Paperback: [24, null, null, 26] },
      hint: "Printed in layout 1's enquiry line, and on its own in layout 4's "
          + 'date card. Leave it empty and the line stops at the date.' },
    // JP-095 (a): the line every layout prints while no day is cued. Cased in
    // sectionVm, as the slot line beside it is; emptied, the seed again.
    { k: 'prompt',  l: 'Calendar instruction text', d: CAL_PROMPT,
      chars: { Retro: [33, 24, 39, 50], Lime: [44, 23, 33, 47], Grunge: [44, 24, 36, 50], Editorial: [44, 29, 24, 50], Pop: [31, 32, 24, 50],
        Lattice: [33, 32, 24, 50], Paperback: [36, 22, 24, 44] },
      hint: 'The line where the picked date goes while none is picked: on the published page, '
          + 'until a visitor picks one, when the opening date is booked or has passed. Left empty, '
          + 'it shows “Pick a date to enquire” again.' },
    // Retro's layout-1 pill and layout 4's Send Enquiry (JP-082). `d` is
    // layout 1's seed; layout 4 seeds CAL_SEND_4 in sectionVm and EditPanel's
    // chain. Lime's, Grunge's, Editorial's and Pop's layout 1 draws no pill
    // (JP-088; Pop's since its layout-1 pass, user call, 2026-10-02): its
    // enquiry line is the link.
    { k: 'cta',     l: 'Button', d: 'Check a date',
      in: { Lime: [3], Grunge: [3], Editorial: [3], Pop: [3], Lattice: [0, 3], Paperback: [0, 3], '*': [0, 3] },
      // Paperback's Continue pill measured 34 (the 390 foot's width) and is held to 12 as Lattice's is, so the 768 foot's line keeps its room: a judgement call, the user's to overrule.
      // Lattice's layout-1 Continue bar: measured 29 (box), held to 12 so the bar stays within a third of the 390 foot
      // and the enquiry line keeps its room (the frame's seat is 130 wide beside a 162 line); a judgement call.
      chars: { Retro: [24, null, null, 24], Lattice: [12, null, null, 24], Paperback: [12, null, null, 24], '*': [null, null, null, 24] },
      hint: 'Layout 4’s Send Enquiry, on the last step of the enquiry wizard and at the foot '
          + 'of the summary; it starts from “Send Enquiry” there, and shows it again if you '
          + 'empty this. Under Retro it is also layout 1’s button, and under Lattice and Paperback layout 1’s '
          + '“Continue” button (emptied, the bar is not drawn). The other templates’ '
          + 'layout 1 has no button: its “Enquiry for …” line is the link.' },
    { k: 'slots',   l: 'Available dates', type: 'slots', max: 8, in: [1],
      cols: { kind: { Retro: [null, 33], Lime: [null, 36], Grunge: [null, 40], Editorial: [null, 33], Pop: [null, 36], Paperback: [null, 31] },
        price: { Retro: [null, 36], Lime: [null, 40], Grunge: [null, 43], Editorial: [null, 36], Pop: [null, 40], Paperback: [null, 37] } },
      hint: 'The dates layout 2 lists, each with what you play and what it starts from. '
          + 'The seeded dates count from the calendar start date (on the published page, from today once that '
          + 'has passed) until you type one; clear it and the row counts again.' },
    // JP-095 (a): the two column labels over that list; the ↓ is the markup's.
    { k: 'dateLabel',  l: 'Dates heading', d: CAL_DATE_LABEL, in: [1],
      chars: [null, 16],
      hint: 'The label over the list’s dates. Left empty, it is not drawn.' },
    { k: 'availLabel', l: 'Availability heading', d: CAL_AVAIL_LABEL, in: [1],
      chars: { Retro: [null, 33], '*': [null, 38] },
      hint: 'The label over what you play each night. Left empty, it is not drawn; with both '
          + 'labels empty, their row goes.' },
    { k: 'slotCta', l: 'Button (layout 2)', d: CAL_SLOT_CTA, in: [1],
      chars: { Editorial: [null, 25], Paperback: [null, 25], '*': [null, 26] } },
    { k: 'types',   l: 'Event types', type: 'area', d: CAL_TYPES.join(', '), in: [3], list: ',',
      chars: { Paperback: [null, null, null, 11], '*': [null, null, null, 13] }, count: [null, null, null, 4],
      rows: { placeholder: 'Event type', add: 'Add event type' },
      hint: "The choices on the first step of layout 4's enquiry wizard. One per row; a comma starts a new row." },
    // JP-076 — no `d`: while the key is absent it follows the Enquiry Form's
    // address (sectionVm's `email` argument, and EditPanel's chain shows it),
    // so the page has one address until the artist types a second here.
    { k: 'email',   l: 'Email address', type: 'email', in: [3],
      hint: "Where layout 4's Send Enquiry mails the visitor's answers. It follows the Enquiry "
          + 'Form’s address until you type one here; after that it keeps its own. Empty, or '
          + 'an address that isn’t valid, leaves both Send Enquiry buttons a picture.' },
  ],
  // The third list-shaped content with a structured editor, after `repertoire`
  // and `media`: `gigs` is an array of { venue, city, time, month, day, year,
  // link }
  // maintained by GigsField. It follows the `songs` rule rather than the
  // tracks' — one key, one shape — so an absent key means the seeded GIGS, an
  // emptied array means no gigs, and there is no null sentinel.
  map: [
    // The real map (user call, 2026-11-09): a town picked from a lookup of real
    // places and a radius in miles. Neither is text the page prints as typed:
    // the heading, "Based in", the coverage strings and the ring labels derive
    // from them (mapPlaceOf / mapMilesOf), and the picture is a live map.
    { k: 'place', l: 'Town or city', type: 'place', in: [0, 1, 2, 3],
      hint: 'Search for a real town or city. The map centres on it, and the heading, “Based in” and the coverage lines follow it.' },
    { k: 'miles', l: 'Radius (miles)', type: 'miles', in: [0, 1, 2, 3],
      hint: 'How far you travel, from 5 to 500 miles. The map zooms so this distance reaches the outer ring.' },
    { k: 'gigs',    l: 'Upcoming gigs', type: 'gigs', max: 12,
      // Session 8 of the character-limits pass: the venue, the city · time line,
      // the date stamp and disc (a month read as month names, the day as dates),
      // split jointly where they share a line (plans/char-limits.md).
      cols: {
        venue: { Retro: [34, 21, 41, 36], Lime: [32, 18, 37, 40], Grunge: [36, 20, 41, 40], Editorial: [19, 18, 25, 40],
          Pop: [18, 18, 28, 40],
          // Lattice layout 1 measured 2026-11-19 (limits.mjs map --themes=5 --designs=0): venue,
          // city and time each alone; the city · time line shares one mono line that wraps.
          Lattice: [26, 18, 28, 40],
          // Paperback layout 1 measured 2026-11-21 (limits.mjs map --themes=6 --designs=0): the other
          // designs keep the row they read before (Pop's venue, `'*'` for the rest).
          Paperback: [25, 18, 26, 32] },
        city: { Retro: [22, 14, 20, 13], Editorial: [29, 13, 23, 13], Pop: [13, 13, 20, 13], Paperback: [28, 13, 20, 13], '*': [20, 13, 20, 13] },
        time: { Retro: [13, 5, 13, 10], Pop: [8, 5, 13, 13], Lattice: [15, 5, 13, 13], Paperback: [23, 5, 13, 13], '*': [13, 5, 13, 13] },
        month: { Retro: [7, 4, 11, 9], Lime: [5, 3, 12, 9], Pop: [9, 5, 12, 9], Lattice: [8, 5, 12, 9], Paperback: [8, 5, 12, 9], '*': [5, 5, 12, 9] },
        day: { Retro: [5, 5, 5, 5], Lattice: [3, 3, 5, 5], Paperback: [4, 3, 5, 5], '*': [6, 3, 5, 5] },
      },
      // The page size is vm.gigPage (five) except in layout 4, whose whole
      // list is a one-gig ticker. The cities are read
      // a second time in layout 3, where they derive the split list's filter
      // chips (vm.gigChips) the way the songs' tags derive the repertoire's —
      // so a row's city is a control there as well as a fact. Layout 4 no
      // longer counts them: its stat wall is `stats` (JP-077).
      hint: 'Each row is one show. A row with a tickets link becomes '
          + 'a real link on the published page; the list pages five at a time in '
          + "layouts 1–3 (layout 3 shows one at a time on a phone) and one at a time in "
          + "layout 4's ticker. "
          + 'Layout 3 also turns the cities into its filter chips, and works out the weekday '
          + 'its date disc prints from the month, the day and the year (four digits). On the '
          + 'published page it also marks each show Upcoming or Past from that date, against '
          + 'the day the page is visited.' },
    // JP-071: layout 3's eyebrow, JP-090: layout 1's, JP-095 (b): layout 2's
    // "Travel radius". Layouts 1 and 3 stopped drawing it 2026-11-12, so the
    // field is layout 2's alone and its seed is its `d`.
    { k: 'kicker',  l: 'Small heading', d: MAP_KICKER_2, in: [1],
      chars: { Retro: [null, 30], Lime: [null, 26], Pop: [null, 30], Paperback: [null, 28], '*': [null, 30] },
      hint: 'The small line over the travel card’s heading. Left empty, it is not drawn.' },
    // JP-090: layout 1's label over the gig list; the "· 5" count is the page's.
    // (Layout 2's "Other upcoming · 4", JP-095 (b), was removed 2026-11-12.)
    { k: 'listLabel', l: 'List heading', d: MAP_LIST_LABEL, in: [0],
      chars: { Retro: [37], Lime: [40], Grunge: [41], Editorial: [46], Pop: [31], Lattice: [31], Paperback: [30] },
      hint: 'The label over the list of gigs, before its count. Left empty, neither is drawn.' },
    { k: 'heading', l: 'Heading', d: 'Manchester',
      // Layouts 1 and 2 start from the picked town (mapHeadingSeed).
      chars: { Retro: [20, 20, 39, 25], Lime: [19, 17, 34, 24], Grunge: [16, 20, 37, 25], Editorial: [11, 19, 22, 22],
        Pop: [17, 21, 25, 23], Lattice: [12, 21, 25, 23], Paperback: [11, 19, 23, 23] } },
    // Layout 2's travel card prints the header's Location instead, under its
    // own "Based in" label (JP-096, user call, 2026-10-01): the frame's value is
    // the town alone, and this field's copy says "Based in" itself.
    { k: 'base',    l: 'Based in',       d: MAP_BASE, in: [0, 2],
      chars: { Retro: [29, null, 33], Lime: [35, null, 27], Grunge: [39, null, 33], Lattice: [19, null, 33], Paperback: [25, null, 28], '*': [24, null, 33] },
      hint: 'Layout 1 prints it beside the map and layout 3 under it. Layout 2’s travel card '
          + 'shows the Location you typed on the header instead.' },
    { k: 'terms',   l: 'Travel charges',   d: MAP_TERMS, in: [0, 1],
      chars: { Retro: [59, 50], Lime: [58, 41], Pop: [45, 51], Lattice: [39, 51], Paperback: [44, 42], '*': [58, 51] } },
    { k: 'travelTime', l: 'Travel time (layout 2)', d: MAP_TRAVEL_TIME, in: [1],
      chars: { Retro: [null, 11], Paperback: [null, 11], '*': [null, 13] } },
    { k: 'fee',        l: 'Booking fee (layout 2)', d: MAP_FEE, in: [1],
      chars: { Retro: [null, 11], Paperback: [null, 11], '*': [null, 13] } },
    // JP-095 (b) · JP-096 (user call, 2026-10-01): layout 2's travel card, the
    // frame's own words, uncased. A label or caption left empty is not drawn; a
    // stat's label goes with its value, as the cell always did; the two pills
    // read their seed again, since a pill always stands.
    { k: 'homeLabel',   l: 'Home town heading',   d: MAP_HOME_LABEL, in: [1],
      chars: { Lime: [null, 16], Paperback: [null, 17], '*': [null, 18] },
      hint: 'The small line over your home town on the travel card. The town is the header’s Location. '
          + 'Left empty, it is not drawn.' },
    { k: 'homeCaption', l: 'Home town caption', d: MAP_HOME_CAPTION, in: [1],
      chars: { Lime: [null, 16], Paperback: [null, 17], '*': [null, 18] },
      hint: 'The small line under your home town. Left empty, it is not drawn.' },
    { k: 'venueLabel',  l: 'Venue heading',  d: MAP_VENUE_LABEL, in: [1],
      chars: [null, 20],
      hint: 'The small line over the featured gig’s city. Left empty, it is not drawn.' },
    { k: 'venueCaption', l: 'Venue caption', d: MAP_VENUE_CAPTION, in: [1],
      chars: { Lime: [null, 16], Paperback: [null, 17], '*': [null, 18] },
      hint: 'The small line under the featured gig’s city. Left empty, it is not drawn.' },
    { k: 'radiusLabel', l: 'Max travel heading', d: MAP_RADIUS_LABEL, in: [1],
      chars: { Retro: [null, 14], Lime: [null, 15], Paperback: [null, 16], '*': [null, 17] },
      hint: 'Over Coverage on the travel card. Left empty, the value stands alone.' },
    { k: 'travelTimeLabel', l: 'Travel time heading', d: MAP_TIME_LABEL, in: [1],
      chars: { Retro: [null, 14], Lime: [null, 15], Paperback: [null, 16], '*': [null, 17] },
      hint: 'Over Travel time on the travel card. Left empty, the value stands alone.' },
    { k: 'feeLabel',    l: 'Booking fee heading', d: MAP_FEE_LABEL, in: [1],
      chars: { Retro: [null, 14], Lime: [null, 15], Paperback: [null, 16], '*': [null, 17] },
      hint: 'Over Booking fee on the travel card. Left empty, the value stands alone.' },
    { k: 'venueCta',    l: 'Venue link button', d: MAP_VENUE_CTA, in: [1],
      chars: { Retro: [null, 11], Lime: [null, 10], Grunge: [null, 10], Editorial: [null, 19], Pop: [null, 20], Paperback: [null, 10] },
      hint: 'Opens the featured gig’s tickets link on the published page. Left empty, it shows '
          + '“Venue Link” again.' },
    { k: 'routeCta',    l: 'Directions button', d: MAP_ROUTE_CTA, in: [1],
      chars: { Retro: [null, 22], Lime: [null, 17], Grunge: [null, 19], Editorial: [null, 24], Pop: [null, 28], Paperback: [null, 14] },
      hint: 'Opens directions to the featured gig on the published page. Left empty, it shows '
          + '“Get Directions” again.' },
    // Layout 3's foot pill, the frame's "See all gigs", and the only layout that
    // draws one. Live it lifts the pager and lists every gig under the current
    // filter; where the list is already one page it stays a picture (the
    // Soundcloud rule). An emptied label drops the pill.
    { k: 'cta',     l: 'Button (layout 3)', d: 'See all gigs', in: [2],
      chars: { Paperback: [null, null, 20], '*': [null, null, 24] },
      hint: 'Lists every gig at once on the published page, when there is more than one page of them.' },
    // Layout 3's QA fields, which layout 2 reads as well since JP-040 (its fit
    // had dropped all four as claims) — all but `status`, which layout 2 does
    // not draw (user call, 2026-10-14). None names a layout in its label: the
    // panel lists them only where the design reads them.
    { k: 'status',  l: 'Map label', d: MAP_STATUS, in: [2],
      chars: [null, null, 20],
      hint: 'The tag above the featured gig.' },
    { k: 'updated', l: 'Map caption', d: MAP_UPDATED, in: [1, 2],
      chars: { Lime: [null, 31, 31], Paperback: [null, 35, 32], '*': [null, 35, 34] } },
    { k: 'expand',  l: 'Map link text', d: MAP_EXPAND, in: [1, 2],
      chars: [null, 22, 22],
      hint: 'Opens directions to the gig the panel is showing, on the published page. Leave empty to hide it.' },
    { k: 'span',    l: 'Map side note', d: MAP_SPAN, in: [3],
      chars: { Paperback: [null, null, null, 51], '*': [null, null, null, 58] },
      hint: 'Beside "Travel & reach" above the stat cards. Leave empty to hide it.' },
    // Layout 4's stat wall (JP-077 · JP-078 · JP-082, user call, 2026-09-29):
    // the ninth structured editor, { label, value, sub } per card, seeded with
    // the frame's four. Two to a row, so a third trails half-width.
    { k: 'stats',   l: 'Key numbers', type: 'stats', max: 4, in: [3],
      cols: { label: { Paperback: [null, null, null, 17], '*': [null, null, null, 19] }, value: [null, null, null, 14], sub: { Paperback: [null, null, null, 19], '*': [null, null, null, 20] } },
      hint: 'One card each, two to a row. A card prints only the parts you fill in; an empty row isn’t shown.' },
  ],
  testimonials: [
    // A textarea, because layout 2's default breaks onto a second line.
    // Session 9 of the character-limits pass: a display head, held to its
    // frame's lines (not a block), though a textarea for layout 2's typed break.
    { k: 'heading', l: 'Heading', type: 'area', d: 'Word of Mouth', in: [1, 2, 3],
      chars: { Retro: [null, 38, 26, 24], Lime: [null, 43, 26, 23], Grunge: [null, 38, 30, 30],
        Editorial: [null, 38, 17, 22], Pop: [null, 45, 22, 22],
        // Lattice's layout 1 draws no heading; layouts 2-4 are placeholders on Pop's numbers.
        Lattice: [null, 45, 22, 22], Paperback: [null, 45, 19, 22] },
      hint: 'Layouts 2, 3 and 4 each start from their own heading. A line break you type is '
          + 'kept in layout 2.' },
    // Layout 2 was the first design to head this section, so both of the plain
    // strings below reached it alone — FIELDS.media.soundcloud's case the other
    // way up, hence the layout in each hint. Layout 3's bento wall then gave
    // `sub` a second seat: its stat card sets the sentence the frame fills with
    // a fabricated event count.
    { k: 'sub',     l: 'Intro line', def: 'testiSub', in: [1, 2],
      chars: { Retro: [null, 114, 86], Lime: [null, 114, 87], Paperback: [null, 97, 67], '*': [null, 114, 67] },
      hint: 'The line under the heading in layout 2, and the sentence on the stat '
          + 'card in layout 3.' },
    // The seventh structured editor and the sixth repeater. Replaces a flattened
    // key set — quote/who/role reached one review of three, and nothing could
    // add a fourth — which is the pricing packages' case, not a textarea's.
    // Follows the `songs` rule: absent means the seeded QUOTES, [] means none.
    { k: 'quotes',  l: 'Reviews', type: 'quotes', max: 8,
      // Session 9 of the character-limits pass: read in every row at once, since
      // the walls (layouts 3 and 4) seat each row in a cell of its own width;
      // the quote is a block, and who · role · when were split jointly
      // (plans/char-limits.md).
      cols: {
        // Lattice layout 1 measured 2026-11-19 (limits.mjs testimonials --themes=5 --designs=0): `who` and
        // `role` 35 (77 / 63 / 35; each prints twice, in the caption and on its chip, and wraps), `when` 21
        // (62 / 47 / 21, the seed's own at 390). `quote` stays the shared 190 (measured open at 400: the card
        // grows). Layouts 2-4 are Pop's, unmeasured.
        // Paperback layout 1 measured 2026-11-21 (limits.mjs testimonials --themes=6 --designs=0 --upright): `who` and `role` 45
        // (105 / 66-83 / 45: each prints once, on its chip, and wraps), `when` 31 (64 / 55 / 31: the script meets the star disc at 390),
        // `quote` 170 (measured 293 / 260 / 195 on three samples, 170 on the fourth, all-lower-case one `--check` adds: at 390 a 180-character review is nine lines and the card runs down over the foot trophy). Layouts 2-4 are Pop's, unmeasured.
        who: { Retro: [28, 48, 25, 27], Lime: [39, 45, 20, 27], Grunge: [28, 50, 25, 27],
          Editorial: [17, 27, 13, 27], Pop: [18, 32, 15, 27], Lattice: [35, 32, 15, 27],
          Paperback: [45, 31, 13, 23] },
        quote: { Lime: [66, 190, 190, 190], Grunge: [68, 190, 190, 190], Editorial: [66, 190, 190, 190],
          Lattice: [190, 190, 190, 190], Paperback: [170, 190, 190, 190], '*': [190, 190, 190, 190] },
        role: { Retro: [28, 48, 26, 29], Lime: [45, 48, 26, 27], Grunge: [28, 48, 26, 29], Lattice: [35, 48, 26, 29],
          Paperback: [45, 46, 26, 28], '*': [26, 48, 26, 29] },
        when: { Retro: [30], Pop: [30], Lattice: [21], Paperback: [31], '*': [46] },
      },
      hint: 'Each row is one review. Layouts 1, 2 and 4 page through them; layout 3 '
          + 'gives each one a card on its wall, and a row with no name or role '
          + 'becomes a plain quote card there. The date line is the small type '
          + "above the quote in layout 1. Layout 2's selector takes the name's "
          + 'initials — layout 4 marks its card with the same initials; layouts 2, 3 '
          + 'and 4 have no seat for the date.' },
    { k: 'rating',  l: 'Rating', d: TESTI_RATING, in: [2],
      chars: { Retro: [null, null, 8], Lime: [null, null, 7], Grunge: [null, null, 9], Editorial: [null, null, 5],
        Pop: [null, null, 7], Lattice: [null, null, 7], Paperback: [null, null, 4] },
      hint: 'The big number on the stat card, printed out of 5. Empty it to show how many reviews there are instead.' },
    { k: 'stars',   l: 'Star rating', d: TESTI_STARS, in: [1, 2],
      chars: { Retro: [null, 44, 35], Lime: [null, 44, 32], Paperback: [null, 37, 33], '*': [null, 44, 36] },
      hint: 'Layout 2 prints them in the corner of the card, beside the reviewer; layout 3 beside '
          + 'the faces on its stat card. Empty it to drop them.' },
    { k: 'cta',     l: 'Button', d: 'Book Now', in: [1], chars: [null, 16],
      hint: 'The pill under the card, which scrolls to wherever the page takes a '
          + 'booking. Emptying it drops the pill. Layout 2 only.' },
  ],
  form: [
    { k: 'image',    l: 'Portrait', type: 'image', aspect: [1, 1], in: [0, 1],
      hint: 'The round photo beside your name. Layouts 1 and 2 — layouts 3 and 4 draw no credit row.' },
    // Layout 2's stage shot. The section's two photographs are the artist and
    // the scene — the header's pair the other way up,
    // this one's `image` having been the artist since layout 1 drew it as an
    // avatar. FIELDS.media.soundcloud's case: it reaches one layout, so the
    // hint says which.
    { k: 'photo',    l: 'Stage photo', type: 'image', aspect: [3, 2], in: [1],
      hint: 'The big picture above the heading. Layout 2 only.' },
    // A textarea, because the default breaks after "Let's make" — layout 2
    // keeps the break, the others read it as a space. Layout 3 starts from
    // formHeading3(name) and layout 4 from FORM_HEADING_4 — special-cased, as
    // `copyright` is, in sectionVm and EditPanel's fallback chain.
    // Session 10 of the character-limits pass: a display head held to its
    // frame's lines, as the testimonials' is; at layout 3 the cap is a typed
    // head's, which replaces the composed one (plans/char-limits.md).
    { k: 'heading',  l: 'Heading', type: 'area', d: "Let's make\nyour night unforgettable.",
      // Lattice's layout 1 measured 2026-11-19 (limits.mjs form --themes=5 --designs=0): 37 at 1440, 56 at
      // 768, 44 at 390, three lines in a 419 measure; the others are Pop's until their passes.
      // Paperback's layout 1 measured 2026-11-21 (limits.mjs form --themes=6 --designs=0 --upright): 41 at 1440 (a fourth line past it), 58 at 768, 46 at 390.
      chars: { Retro: [45, 36, 32, 20], Lime: [37, 37, 32, 19], Grunge: [36, 40, 41, 25],
        Editorial: [36, 42, 30, 12], Pop: [36, 40, 30, 17], Lattice: [37, 40, 30, 17], Paperback: [41, 36, 30, 17] },
      hint: 'Layout 3 starts from your name (“Book … for your event”) and follows it until you '
          + 'type your own; layout 4 starts from “Contact Us”. A line break you type is kept in '
          + 'layout 2.' },
    // Layout 4's small-caps line under the head, which printed the artist's
    // name until JP-054 gave it the frame's own word. Emptiable: it drops.
    { k: 'sub',      l: 'Line under the heading', d: FORM_SUB_4, in: [3],
      chars: { Retro: [null, null, null, 33], Lime: [null, null, null, 40], Grunge: [null, null, null, 44],
        Editorial: [null, null, null, 27], Pop: [null, null, null, 30], Paperback: [null, null, null, 23] },
      hint: 'Layout 4 only. Leave it empty to hide it.' },
    { k: 'para',     l: 'Paragraph', type: 'area', def: 'formPara', in: [2], chars: [null, null, 210],
      hint: 'The line under the heading. Layout 3 only.' },
    // One a line down a column that hugs them, so the count is a block's
    // (session 10): open but where the column climbs into the head.
    { k: 'promises', l: 'Reasons to book', type: 'area', d: FORM_PROMISES.join('\n'), in: [0, 1], list: '\n',
      // Lattice's layout 1 measured 33 a line (the 390 row wraps past it) and holds the shared 9 a column
      // (16 measured, open); layout 2 is the '*' row's.
      // Paperback's layout 1 measured 5 rows (the sixth meets the blob's art at 1440) and 20 a line at 390, under the seed's own 29
      // (the frame's longest, one line there), so the seed is the floor.
      chars: { Retro: [45, 32], Pop: [42, 31], Editorial: [34, 29], Lattice: [33, 34], Paperback: [29, 29], '*': [34, 34] },
      count: { Editorial: [6, 9], Lattice: [9, 9], Paperback: [5, 9], '*': [9, 9] },
      rows: { placeholder: 'Promise', add: 'Add promise' },
      hint: 'The ticked list beside the form.' },
    // Layout 4's *What happens next* column (JP-079 · JP-081, user call,
    // 2026-09-29): the tenth repeater, { title, sub } per step, seeded with the
    // frames' three. It numbered the promises until then, one line a row.
    { k: 'steps',    l: 'Steps', type: 'steps', max: 6, in: [3],
      cols: { title: { Paperback: [null, null, null, 34], '*': [null, null, null, 41] }, sub: { Paperback: [null, null, null, 41], '*': [null, null, null, 44] } },
      hint: 'Numbered down the column beside the form, a title over a second line. A step prints '
          + 'only the lines you fill in; an empty row isn’t shown, and with none the column goes.' },
    // The sixth structured editor and the fifth repeater. Follows the `songs`
    // rule: an absent key means the seeded FORM_FIELDS (FORM_FIELDS_CARD at
    // layouts 2 and 3, JP-070; FORM_FIELDS_4 at layout 4, JP-054), an emptied
    // array means no boxes at all, and there is no null sentinel.
    // Session 10: the placeholder prints at layouts 1 and 4 alone (2 and 3 set
    // the label in the box), so it is uncapped there.
    { k: 'fields',   l: 'Form fields', type: 'formFields', max: 8,
      cols: {
        label: { Retro: [49, 46, 57, 22], Lime: [47, 52, 69, 27], Grunge: [52, 62, 76, 30],
          Editorial: [24, 33, 41, 14], Pop: [32, 33, 40, 19], Lattice: [40, 33, 40, 19], Paperback: [45, 27, 30, 15] },
        placeholder: { Retro: [37, null, null, 23], Lime: [41, null, null, 24], Grunge: [41, null, null, 24],
          Editorial: [41, null, null, 25], Pop: [35, null, null, 24], Lattice: [36, null, null, 24], Paperback: [34, null, null, 20] },
      },
      hint: 'One box each — two to a row in layouts 1 and 4 (layout 1 stacks them on a phone), '
          + 'one to a row in layouts 2 and 3, '
          + 'which set the label inside the box and draw no placeholder. An odd last box '
          + 'takes half a row in layout 1 and the whole of one in layout 4. The published '
          + 'form emails you what the visitor types. Layouts 2 and 3 start on their card’s three '
          + 'boxes and layout 4 on its own five until you edit them; after that your list shows '
          + 'in every layout.' },
    { k: 'types',    l: 'Event types', type: 'area', d: FORM_TYPES.join(', '), in: [0], list: ',',
      // Paperback's layout 1 measured 6 chips (the 390 frame's two rows; a seventh wraps to a third), the item held to the shared 15.
      chars: [15], count: { Lime: [5], Grunge: [5], Lattice: [8], Paperback: [6], '*': [8] },
      rows: { placeholder: 'Event type', add: 'Add event type' },
      hint: 'The form opens on the first; empty hides the row. Layout 1 only. One per row; a comma starts a new row.' },
    // The chip row's label (JP-090), messageLabel's rule: the row it heads
    // stands whatever it says, so an emptied label reads the seed again.
    { k: 'typeLabel', l: 'Event type label', d: FORM_TYPE_LABEL, in: [0],
      chars: { Retro: [51], Lime: [52], Grunge: [58], Editorial: [37], Pop: [33], Lattice: [40], Paperback: [45] },
      hint: 'The label over the event types. Layout 1 only. Left empty, it shows Event type.' },
    { k: 'message',  l: 'Message box hint text', d: FORM_MESSAGE, in: [0, 3],
      chars: { Retro: [39, null, null, 53], Lime: [42, null, null, 54], Grunge: [42, null, null, 54],
        Editorial: [44, null, null, 58], Pop: [35, null, null, 54], Lattice: [39, null, null, 54], Paperback: [37, null, null, 44] },
      hint: 'Layouts 1 and 4.' },
    // The message box's label (JP-082): the one box label that was a literal.
    { k: 'messageLabel', l: 'Message label', d: FORM_MSG_LABEL, in: [0, 3],
      chars: { Retro: [51, null, null, 45], Lime: [52, null, null, 59], Grunge: [58, null, null, 64],
        Editorial: [37, null, null, 35], Pop: [33, null, null, 41], Lattice: [40, null, null, 41], Paperback: [45, null, null, 33] },
      hint: 'Layouts 1 and 4. Also heads the message in the email you receive. Left empty, it shows Message.' },
    // Dead until the submit was made real — this is now what the form is for.
    { k: 'email',    l: 'Email address', type: 'email', d: FORM_EMAIL,
      hint: 'Enquiries are mailed here: the button opens the visitor’s mail app with the form filled in, and so does the Booking Calendar’s layout-4 Send Enquiry, until the calendar has an address of its own. Empty leaves the button a picture. An address that isn’t valid also leaves the button a picture.' },
    { k: 'button',   l: 'Button', d: 'Book Now', in: [0, 3],
      // Lattice's layout 1 is a full-width bar with nothing beside it to crowd, so its measured 35 stands
      // (the shared 15 is Retro's and Lime's pill).
      chars: { Retro: [16, null, null, 36], Editorial: [15, null, null, 27], Pop: [15, null, null, 32],
        Lattice: [35, null, null, 36], Paperback: [34, null, null, 31], '*': [15, null, null, 36] },
      hint: 'Layouts 1 and 4. Layout 4 starts from “Check Availability”, and layout 1 from “Enquire” in Lime, Grunge, Editorial and Pop.' },
    // Layouts 2 and 3's card — the same component in both frames. Every one is
    // emptiable and drops what it fills, except the button: it is the submit,
    // so an emptied label falls back to `button`.
    // Session 10: the price is set whole (no priceParts split), so it is read
    // as prose; it shares a wrapping row with its unit (plans/char-limits.md).
    { k: 'price',     l: 'Price (layouts 2 and 3)', d: FORM_PRICE, in: [1, 2],
      chars: { Retro: [null, 32, 39], Lime: [null, 28, 35], Grunge: [null, 32, 39], Editorial: [null, 19, 23],
        Pop: [null, 22, 26], Paperback: [null, 20, 24] } },
    { k: 'priceUnit', l: 'Price note (layouts 2 and 3)', d: FORM_PRICE_UNIT, in: [1, 2],
      chars: { Lime: [null, 43, 54], Paperback: [null, 45, 52], '*': [null, 47, 54] } },
    { k: 'bookings',  l: 'Bookings line (layouts 2 and 3)', d: FORM_BOOKINGS, in: [1, 2],
      chars: { Retro: [null, 35, 41], Lime: [null, 32, 42], Paperback: [null, 34, 40], '*': [null, 36, 42] },
      hint: 'The five stars before it are drawn while this is filled.' },
    { k: 'cta',       l: 'Button (layouts 2 and 3)', d: FORM_CTA, in: [1, 2],
      chars: { Retro: [null, 36, 36], Lime: [null, 30, 36], Grunge: [null, 33, 36], Editorial: [null, 18, 22],
        Pop: [null, 20, 26], Paperback: [null, 20, 26] } },
    { k: 'note',      l: 'Line under the button (layouts 2 and 3)', d: FORM_NOTE, in: [1, 2],
      chars: { Lime: [null, 43, 54], Paperback: [null, 45, 52], '*': [null, 47, 54] } },
    { k: 'available', l: 'Eyebrow (layout 3)', d: FORM_AVAILABLE, in: [2], chars: { Paperback: [null, null, 54], '*': [null, null, 61] },
      hint: 'The small line above the heading. Leave it empty to hide it.' },
  ],
  footer: [
    // Session 11 of the character-limits pass (plans/char-limits.md): a display
    // head held to its frame's lines, the seed's 36 its floor on four templates. Lattice's measured
    // 2026-11-20 (limits.mjs footer --themes=5): 37 at all three widths, three lines in its 11em measure.
    // Paperback's footer draws no statement (its frames set the name, the pills and a photograph), so the panel does not offer it.
    { k: 'statement', l: 'Statement', type: 'area', d: FOOTER_STATEMENT, in: { Paperback: [], '*': [0] },
      chars: { Grunge: [45], Lattice: [37], '*': [36] } },
    // Paperback's footer photograph, the tilted keyline card between the name and the right-hand edge. Seeded (PAPERBACK_PHOTOS.footer);
    // no other template's footer draws a photograph, so no other template offers the box.
    { k: 'image', l: 'Photo', type: 'image', aspect: [5, 4], in: { Paperback: [0], '*': [] },
      hint: 'The tilted photo card in the footer. Paperback only.' },
    // The eighth structured editor and the seventh repeater — and the section's
    // whole sitemap, which was a constant no field could reach. Follows the
    // `songs` rule: an absent key means the seeded FOOTER_LINKS, an emptied
    // array means no links at all, and there is no null sentinel.
    { k: 'links',    l: 'Footer links', type: 'links', max: 10,
      // Read in every row at once: the two columns stand side by side (session 11).
      // Lattice's measured: 19 at 390 (a one-line label in its 159-wide cell; 24 at 1440, 41 at 768).
      cols: { label: { Retro: [19], Lime: [28], Grunge: [28], Editorial: [20], Pop: [14], Lattice: [19], Paperback: [47] } },
      hint: {
        '*': 'The list is halved into two columns, in order. A link scrolls to a section on the page, or opens a web address in a new tab.',
        // Lattice's frames set the links as a grid read across (plans/lattice/layout-1.md, section 11).
        Lattice: 'The links stand two to a row, read across and then down. A link scrolls to a section on the page, or opens a web address in a new tab.',
        // Paperback's frames set them as a row of pills that wraps (plans/paperback/layout-1.md, section 11).
        Paperback: 'The links are pills in a row that wraps, in order. A link scrolls to a section on the page, or opens a web address in a new tab.',
      } },
    // Dead until the pill was given a target — the calendar's `cta`, which was
    // a field that edited nothing until it labelled that section's foot pill.
    // Its cap is a joint split with the link labels, which share its column
    // (session 11).
    // Lattice's bracket box stands alone under the links, so its cap is the page's (measured: 36 at 390,
    // 49 at 1440, 82 at 768).
    { k: 'cta',      l: 'Button', d: 'Book Now', chars: { Editorial: [12], Pop: [11], Lattice: [36], Paperback: [36], '*': [16] },
      hint: 'Books at the enquiry form, the calendar or the pricing section — whichever the page carries. Empty drops the button.' },
    // The same key the header's seal takes: `vm.showBadge` already reads this
    // section's own content, so the footer's seal was hidable by nothing only
    // because no field here named it.
    { k: 'showBadge', l: 'Seal', type: 'select', opts: SHOW_HIDE, d: 'show' },
    // Defaults to copyrightOf(name), special-cased.
    { k: 'copyright', l: 'Small print',
      // Lattice's measured: 25 at 390, a one-line copyright beside the credit (75 at 768, 157 at 1440).
      chars: { Retro: [31], Lime: [28], Grunge: [32], Editorial: [24], Pop: [35], Lattice: [25], Paperback: [34] } },
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
// The sign, not the letter (JP-118, user call, 2026-10-08): all five footer frames
// type a capital C ("C 2026 Kai Mercer"), Pop's in a face with no © to type, and the
// seed copied it until the tester read it as the © it stands for. Each template's
// footer face draws its own ©; a small print the artist typed is never touched.
export const copyrightOf = (name) => `© 2026 ${name}`
// The enquiry form's layout-3 head, off the artist's name for the same reason
// (JP-070, user call, 2026-09-29): every layout-3 frame reads "Book Kai for /
// your event", which names its mock artist. Only while the heading key is
// absent, so a typed head stops following the name. Layout 3 does not set
// `pre-wrap`, so the break folds to a space there.
export const formHeading3 = (name) => `Book ${name} for\nyour event`

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
// At pricing layout 3 an absent key is TIERS_3 instead (JP-070), and at
// Lime's, Grunge's, Editorial's and Pop's layout 1 TIERS_1 (JP-089); both differ in
// tags alone, and the card reads no tags, so TIERS serves here whatever the
// pricing section's layout.
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
// '' with no form section on the page. It is the wizard's address only while
// the calendar's own `email` key is absent (JP-076, a follow-the-form chain,
// copyrightOf()'s shape): sectionVm resolves a typed one ahead of this, so a
// page with no form can still send. With neither, the pills stay spans, the
// form's own no-address state.
export const pageEmail = (sections) => {
  const f = sections.find((s) => s.cat === 'form')
  if (!f) return ''
  return emailAddr(f.c?.email !== undefined ? f.c.email : FORM_EMAIL)
}

export function fieldDefault(f) { return f.def ? DEFS[f.def] : (f.d != null ? f.d : '') }

// Layouts 3 and 4's heading fallbacks, per category — each page's own heads
// (layout 4's QA, 2026-09-15, the form's, JP-054, and the repertoire's, JP-081;
// layout 3's JP-070, 2026-09-28, which took in the calendar's "Book Me").
// sectionVm and fieldSeed both read these, and at layouts 3 and 4 the
// repertoire's wins over its song count in both.
export const HEADING_3 = {
  repertoire: REP_HEADING_3, gallery: GALLERY_HEADING_3, pricing: PRICING_HEADING_3,
  calendar: CAL_HEADING_3, map: MAP_HEADING_3, testimonials: TESTI_HEADING_3,
}
export const HEADING_4 = {
  // The video band's head is the frame's "See *me* in action", not the
  // gallery's "See *us*" (Retro layout 4's recorded trap).
  video: VIDEO_HEADING_4,
  repertoire: REP_HEADING_4, calendar: CAL_HEADING_4, gallery: GALLERY_HEADING_4, map: MAP_HEADING_4,
  testimonials: TESTI_HEADING_4, form: FORM_HEADING_4,
}

// What a field shows while its key is absent — EditPanel's box, and the seed
// scripts/limits.mjs measures against. The fields whose default is computed
// rather than written down: the header's title is the artist's name, the
// footer's small print and the form's layout-3 head are composed from it, the
// repertoire's heading counts the songs, and a few seeds follow the layout.
// Each mirrors what sectionVm resolves, so panel and canvas never disagree.
// The calendar's address is the form's until one is typed (JP-076). The
// header's kicker left the chain with JP-061: its `d` is its seed at every
// layout, and the layout-3 card's line is a field of its own. The map's kicker
// and list label were in it (mapKickerSeed, mapListLabelSeed) until the
// 2026-11-12 label removals left each one design, so `d` is their seed; the
// map's coverage joined with JP-105 (mapRadiusSeed). Layouts 3 and 4's heads
// come ahead of the song count, which sectionVm's later assignment says the
// other way round (JP-070, JP-081).
// The artist's initials, at most two: the placeholder discs' letters, and Headliner layout 1's ringed numeral.
export const initialsOf = (name) =>
  String(name).trim().split(/\s+/).map((w) => w[0] || '').join('').slice(0, 2).toUpperCase()

export function fieldSeed({ cat, f, themeName, design, c = {}, artistName, email }) {
  const songs = Array.isArray(c.songs) ? c.songs : SONGS
  // Headliner's layout-1 hero rings a numeral where the others ring the name (plans/headliner/layout-1.md, section 1).
  if (f.k === 'badgeText' && cat === 'header' && themeName === 'Headliner' && design === 0) return initialsOf(artistName)
  return (f.k === 'title' || f.k === 'badgeText') && cat === 'header' ? artistName
    : f.k === 'copyright' && cat === 'footer' ? copyrightOf(artistName)
    : f.k === 'email' && cat === 'calendar' ? email
    : f.k === 'heading' && cat === 'form' && design === 2 ? formHeading3(artistName)
    : f.k === 'heading' && design === 2 && HEADING_3[cat] ? HEADING_3[cat]
    : f.k === 'heading' && design === 3 && HEADING_4[cat] ? HEADING_4[cat]
    : f.k === 'heading' && cat === 'calendar' && design === 0 && limeTreeTheme(themeName) ? CAL_HEADING_1
    : f.k === 'heading' && cat === 'repertoire' ? `${songs.filter((t) => !blankRow(t, SONG_KEYS)).length} ${themeName === 'Paperback' ? 'songs' : 'Songs'}`
    : f.k === 'heading' && cat === 'testimonials' && design === 1 ? TESTI_HEADING_2
    : f.k === 'navMode' && cat === 'header' ? navModeDefault(themeName, design)
    : f.k === 'button' && cat === 'form' ? formBtnSeed(themeName, design)
          : f.k === 'heading' && cat === 'map' && design < 2 ? mapHeadingSeed(c, themeName, design)
    : f.k === 'base' && cat === 'map' ? mapBaseSeed(c, themeName, design)
    : f.k === 'terms' && cat === 'map' ? mapTermsSeed(c)
    : f.k === 'cta' && cat === 'calendar' && design === 3 ? CAL_SEND_4
    : f.k === 'cta' && cat === 'bio' && design === 0 && themeName === 'Paperback' ? BIO_CTA_PAPERBACK
    : f.k === 'cta' && cat === 'calendar' && design === 0 && (themeName === 'Lattice' || themeName === 'Paperback') ? CAL_CTA_LATTICE
    : f.k === 'rowCta' && cat === 'pricing' && design === 0 && themeName === 'Paperback' ? PRICING_ROW_CTA_PAPERBACK
    : f.k === 'rowCta' && cat === 'pricing' && design === 2 ? PRICING_ROW_CTA_3
    : f.k === 'rowCta' && cat === 'pricing' && design === 3 ? PRICING_ROW_CTA
    : fieldDefault(f)
}

// Whether a section's current design reads field `f` — `design` being
// `arch % designCount`, never the raw `arch`. `f.in` is resolved per template,
// its `'*'` standing for any template it does not name; a template it does not
// cover at all reads it (true). Read by EditPanel alone: nothing on the canvas
// consults it, so a field the design ignores keeps its copy for the next layout.
const reachOf = (f, themeName) => (
  !f.in || Array.isArray(f.in) ? f.in : (f.in[themeName] ?? f.in['*'])
)
export function fieldReach(f, themeName, design) {
  const r = reachOf(f, themeName)
  return !r || r.includes(design)
}
// Whether EditPanel lists field `f` for this design: one the design reads, or a
// `shared` one, which other sections print (the header's identity keys).
export function fieldShown(f, themeName, design) {
  return !!f.shared || fieldReach(f, themeName, design)
}

// Inline editing on the canvas (plans/inline-edit.md · plans/inline-edit-all.md).
// A text, area or list field that `fieldShown` says the design reads is editable
// where it is printed, and so is every text cell of a repeater, unless the
// ledger below says otherwise. The three tables are keyed by a *group*,
// `cat.key` for a field and `cat.key.col[.part]` for a repeater's cell or a
// part of one, with an optional scope in front: `Template.design.` (design is
// the 0-based `arch % designCount`, as `in` reads it), `Template.*.`, `*.design.`
// or `*.*.`. A key also covers the groups under it (`pricing.tiers.price` is its
// lead, amount and tail). A page is only *known* to work because
// scripts/inline-probe.mjs passed it.
//
// INLINE_OFF is the ledger: each row a group the canvas does not edit, with the
// reason, one of: live-only copy, not drawn at the widths we edit, not text, the
// field has no node or the page prints a derived value, or a node text can never
// settle (a user call). INLINE_MARKED names copy the page prints under another
// field's words, so `EncoreSection` marks the node (`data-inline`). INLINE_PART
// names copy the page prints inside a longer line.
export const INLINE_OFF = {
  'Retro.0.repertoire.songs.length': 'not drawn: only layout 3 prints a song’s length',
  'Retro.0.calendar.prompt': 'not drawn: it shows only while no day is cued, and the canvas opens with one cued',
  'Lime.0.repertoire.songs.length': 'not drawn: only layout 3 prints a song’s length',
  'Lime.0.calendar.prompt': 'not drawn: it shows only while no day is cued, and the canvas opens with one cued',
  'Grunge.0.repertoire.songs.length': 'not drawn: only layout 3 prints a song’s length',
  'Grunge.0.calendar.prompt': 'not drawn: it shows only while no day is cued, and the canvas opens with one cued',
  'Editorial.0.repertoire.songs.length': 'not drawn: only layout 3 prints a song’s length',
  'Editorial.0.calendar.prompt': 'not drawn: it shows only while no day is cued, and the canvas opens with one cued',
  'Pop.0.repertoire.songs.length': 'not drawn: only layout 3 prints a song’s length',
  'Lattice.0.repertoire.songs.length': 'not drawn: only layout 3 prints a song’s length',
  'Paperback.0.repertoire.songs.length': 'not drawn: only layout 3 prints a song’s length',
  'Paperback.1.repertoire.songs.length': 'not drawn: only layout 3 prints a song’s length',
  'Paperback.2.repertoire.songs.artist': 'not drawn: layout 3 prints a song’s length in the seat the artist holds elsewhere',
  'Paperback.3.repertoire.songs.length': 'not drawn: only layout 3 prints a song’s length',
  'Pop.0.calendar.prompt': 'not drawn: it shows only while no day is cued, and the canvas opens with one cued',
  'Lattice.0.calendar.prompt': 'not drawn: it shows only while no day is cued, and the canvas opens with one cued',
  'Paperback.0.calendar.prompt': 'not drawn: it shows only while no day is cued, and the canvas opens with one cued',
  'Retro.1.header.kicker': 'not drawn: the layout-2 header prints no kicker (a shared identity key; the bio’s role line and the form print it)',
  'Retro.1.header.tags': 'not drawn: the layout-2 header prints no tag chips (a shared identity key; the bio prints them)',
  'Retro.1.repertoire.songs.length': 'not drawn: only layout 3 prints a song’s length',
  'Retro.1.calendar.prompt': 'not drawn: it shows only while no day is cued, and the canvas opens with one cued',
  'Retro.1.form.fields.placeholder': 'not drawn: the card’s boxes print the label, and a placeholder only once the label is emptied',
  'Retro.1.testimonials.quotes.when': 'not drawn: layout 2’s card has no seat for it',
  'Retro.1.media.tracks.sub': 'derived value: the seeded page prints the release and the running time as two nodes, and the whole line only once the list is stored',
  'Lime.1.header.kicker': 'not drawn: the layout-2 header prints no kicker (a shared identity key; the bio’s role line and the form print it)',
  'Lime.1.header.tags': 'not drawn: the layout-2 header prints no tag chips (a shared identity key; the bio prints them)',
  'Lime.1.repertoire.songs.length': 'not drawn: only layout 3 prints a song’s length',
  'Lime.1.calendar.prompt': 'not drawn: it shows only while no day is cued, and the canvas opens with one cued',
  'Lime.1.form.fields.placeholder': 'not drawn: the card’s boxes print the label, and a placeholder only once the label is emptied',
  'Lime.1.testimonials.quotes.when': 'not drawn: layout 2’s card has no seat for it',
  'Lime.1.media.tracks.sub': 'derived value: the seeded page prints the release and the running time as two nodes, and the whole line only once the list is stored',
  'Grunge.1.header.kicker': 'not drawn: the layout-2 header prints no kicker (a shared identity key; the bio’s role line and the form print it)',
  'Grunge.1.header.tags': 'not drawn: the layout-2 header prints no tag chips (a shared identity key; the bio prints them)',
  'Grunge.1.repertoire.songs.length': 'not drawn: only layout 3 prints a song’s length',
  'Grunge.1.calendar.prompt': 'not drawn: it shows only while no day is cued, and the canvas opens with one cued',
  'Grunge.1.form.fields.placeholder': 'not drawn: the card’s boxes print the label, and a placeholder only once the label is emptied',
  'Grunge.1.testimonials.quotes.when': 'not drawn: layout 2’s card has no seat for it',
  'Grunge.1.media.tracks.sub': 'derived value: the seeded page prints the release and the running time as two nodes, and the whole line only once the list is stored',
  'Editorial.1.header.kicker': 'not drawn: the layout-2 header prints no kicker (a shared identity key; the bio’s role line and the form print it)',
  'Editorial.1.header.tags': 'not drawn: the layout-2 header prints no tag chips (a shared identity key; the bio prints them)',
  'Editorial.1.repertoire.songs.length': 'not drawn: only layout 3 prints a song’s length',
  'Editorial.1.calendar.prompt': 'not drawn: it shows only while no day is cued, and the canvas opens with one cued',
  'Editorial.1.form.fields.placeholder': 'not drawn: the card’s boxes print the label, and a placeholder only once the label is emptied',
  'Editorial.1.testimonials.quotes.when': 'not drawn: layout 2’s card has no seat for it',
  'Editorial.1.media.tracks.sub': 'derived value: the seeded page prints the release and the running time as two nodes, and the whole line only once the list is stored',
  'Pop.1.header.kicker': 'not drawn: the layout-2 header prints no kicker (a shared identity key; the bio’s role line and the form print it)',
  'Pop.1.header.tags': 'not drawn: the layout-2 header prints no tag chips (a shared identity key; the bio prints them)',
  'Paperback.1.form.fields.placeholder': 'not drawn: the card’s boxes print the label, and a placeholder only once the label is emptied',
  'Paperback.2.form.fields.placeholder': 'not drawn: the card’s boxes print the label, and a placeholder only once the label is emptied',
  'Paperback.1.header.tags': 'not drawn: the layout-2 header prints no tag chips (a shared identity key; the bio prints them)',
  'Pop.1.repertoire.songs.length': 'not drawn: only layout 3 prints a song’s length',
  'Pop.1.calendar.prompt': 'not drawn: it shows only while no day is cued, and the canvas opens with one cued',
  'Paperback.1.calendar.prompt': 'not drawn: it shows only while no day is cued, and the canvas opens with one cued',
  'Pop.1.form.fields.placeholder': 'not drawn: the card’s boxes print the label, and a placeholder only once the label is emptied',
  'Pop.1.testimonials.quotes.when': 'not drawn: layout 2’s card has no seat for it',
  'Paperback.1.testimonials.quotes.when': 'not drawn: layout 2’s card has no seat for it',
  'Paperback.2.testimonials.quotes.when': 'not drawn: layout 3’s wall has no seat for it',
  'Paperback.3.testimonials.quotes.when': 'not drawn: layout 4’s wall has no seat for it',
  'Pop.1.media.tracks.sub': 'derived value: the seeded page prints the release and the running time as two nodes, and the whole line only once the list is stored',
  'Retro.2.repertoire.songs.artist': 'not drawn: layout 3 prints a song’s length in the seat the artist holds elsewhere',
  'Retro.2.form.fields.placeholder': 'not drawn: the card’s boxes print the label, and a placeholder only once the label is emptied',
  'Retro.2.testimonials.quotes.when': 'not drawn: layout 3’s wall has no seat for it',
  'Retro.2.media.tracks.sub': 'derived value: the seeded page prints the release and the running time as two nodes, and the whole line only once the list is stored',
  'Lime.2.header.kicker': 'not drawn: the layout-3 card prints the card line in the kicker’s seat (a shared identity key; the bio’s role line prints it)',
  'Lime.2.repertoire.songs.artist': 'not drawn: layout 3 prints a song’s length in the seat the artist holds elsewhere',
  'Lime.2.form.fields.placeholder': 'not drawn: the card’s boxes print the label, and a placeholder only once the label is emptied',
  'Lime.2.testimonials.quotes.when': 'not drawn: layout 3’s wall has no seat for it',
  'Lime.2.media.tracks.sub': 'derived value: the seeded page prints the release and the running time as two nodes, and the whole line only once the list is stored',
  'Grunge.2.header.kicker': 'not drawn: the layout-3 card prints the card line in the kicker’s seat (a shared identity key; the bio’s role line prints it)',
  'Grunge.2.repertoire.songs.artist': 'not drawn: layout 3 prints a song’s length in the seat the artist holds elsewhere',
  'Grunge.2.form.fields.placeholder': 'not drawn: the card’s boxes print the label, and a placeholder only once the label is emptied',
  'Grunge.2.testimonials.quotes.when': 'not drawn: layout 3’s wall has no seat for it',
  'Grunge.2.media.tracks.sub': 'derived value: the seeded page prints the release and the running time as two nodes, and the whole line only once the list is stored',
  'Editorial.2.header.kicker': 'not drawn: the layout-3 card prints the card line in the kicker’s seat (a shared identity key; the bio’s role line prints it)',
  'Editorial.2.repertoire.songs.artist': 'not drawn: layout 3 prints a song’s length in the seat the artist holds elsewhere',
  'Editorial.2.form.fields.placeholder': 'not drawn: the card’s boxes print the label, and a placeholder only once the label is emptied',
  'Editorial.2.testimonials.quotes.when': 'not drawn: layout 3’s wall has no seat for it',
  'Editorial.2.media.tracks.sub': 'derived value: the seeded page prints the release and the running time as two nodes, and the whole line only once the list is stored',
  'Pop.2.header.kicker': 'not drawn: the layout-3 card prints the card line in the kicker’s seat (a shared identity key; the bio’s role line prints it)',
  'Pop.2.repertoire.songs.artist': 'not drawn: layout 3 prints a song’s length in the seat the artist holds elsewhere',
  'Pop.2.form.fields.placeholder': 'not drawn: the card’s boxes print the label, and a placeholder only once the label is emptied',
  'Pop.2.testimonials.quotes.when': 'not drawn: layout 3’s wall has no seat for it',
  'Pop.2.media.tracks.sub': 'derived value: the seeded page prints the release and the running time as two nodes, and the whole line only once the list is stored',
  'Retro.3.repertoire.songs.length': 'not drawn: only layout 3 prints a song’s length',
  'Retro.3.calendar.prompt': 'not drawn: it shows only while no day is cued, and the canvas opens with one cued',
  'Retro.3.testimonials.quotes.when': 'not drawn: layout 4’s wall has no seat for it',
  'Retro.3.media.tracks.sub': 'derived value: the page prints the release alone (the list tile’s Single); the running times are the player’s clock',
  'Retro.3.pricing.unit': 'derived value: layout 4 drops the leading slash, so the page prints event, not the field’s /event',
  'Lime.3.repertoire.songs.length': 'not drawn: only layout 3 prints a song’s length',
  'Lime.3.calendar.prompt': 'not drawn: it shows only while no day is cued, and the canvas opens with one cued',
  'Lime.3.testimonials.quotes.when': 'not drawn: layout 4’s wall has no seat for it',
  'Lime.3.media.tracks.sub': 'derived value: the page prints the release alone (the list tile’s Single); the running times are the player’s clock',
  'Lime.3.pricing.unit': 'derived value: layout 4 drops the leading slash, so the page prints event, not the field’s /event',
  'Grunge.3.repertoire.songs.length': 'not drawn: only layout 3 prints a song’s length',
  'Grunge.3.calendar.prompt': 'not drawn: it shows only while no day is cued, and the canvas opens with one cued',
  'Grunge.3.testimonials.quotes.when': 'not drawn: layout 4’s wall has no seat for it',
  'Grunge.3.media.tracks.sub': 'derived value: the page prints the release alone (the list tile’s Single); the running times are the player’s clock',
  'Grunge.3.pricing.unit': 'derived value: layout 4 drops the leading slash, so the page prints event, not the field’s /event',
  'Editorial.3.repertoire.songs.length': 'not drawn: only layout 3 prints a song’s length',
  'Editorial.3.calendar.prompt': 'not drawn: it shows only while no day is cued, and the canvas opens with one cued',
  'Editorial.3.testimonials.quotes.when': 'not drawn: layout 4’s wall has no seat for it',
  'Editorial.3.media.tracks.sub': 'derived value: the page prints the release alone (the list tile’s Single); the running times are the player’s clock',
  'Editorial.3.pricing.unit': 'derived value: layout 4 drops the leading slash, so the page prints event, not the field’s /event',
  'Pop.3.repertoire.songs.length': 'not drawn: only layout 3 prints a song’s length',
  'Pop.3.calendar.prompt': 'not drawn: it shows only while no day is cued, and the canvas opens with one cued',
  'Paperback.3.calendar.prompt': 'not drawn: it shows only while no day is cued, and the canvas opens with one cued',
  'Pop.3.testimonials.quotes.when': 'not drawn: layout 4’s wall has no seat for it',
  'Pop.3.media.tracks.sub': 'derived value: the page prints the release alone (the list tile’s Single); the running times are the player’s clock',
  'Pop.3.pricing.unit': 'derived value: layout 4 drops the leading slash, so the page prints event, not the field’s /event',
  'Paperback.3.pricing.unit': 'derived value: layout 4 drops the leading slash, so the page prints event, not the field’s /event',
  // Header-nav ticket (2026-11-11): layouts 1–4 of every template lost the location
  // and, at layouts 1 and 4, the act type above the name.
  'Retro.0.header.kicker': 'not drawn: the layout-1 header prints no act type any more (a shared identity key; the bio’s role line and the form print it)',
  'Retro.3.header.kicker': 'not drawn: the layout-4 header prints no act type any more (a shared identity key; the bio’s role line and the form print it)',
  'Lime.0.header.kicker': 'not drawn: the layout-1 header prints no act type any more (a shared identity key; the bio’s role line and the form print it)',
  'Lime.3.header.kicker': 'not drawn: the layout-4 header prints no act type any more (a shared identity key; the bio’s role line and the form print it)',
  'Grunge.0.header.kicker': 'not drawn: the layout-1 header prints no act type any more (a shared identity key; the bio’s role line and the form print it)',
  'Grunge.3.header.kicker': 'not drawn: the layout-4 header prints no act type any more (a shared identity key; the bio’s role line and the form print it)',
  'Editorial.0.header.kicker': 'not drawn: the layout-1 header prints no act type any more (a shared identity key; the bio’s role line and the form print it)',
  'Editorial.3.header.kicker': 'not drawn: the layout-4 header prints no act type any more (a shared identity key; the bio’s role line and the form print it)',
  'Pop.0.header.kicker': 'not drawn: the layout-1 header prints no act type any more (a shared identity key; the bio’s role line and the form print it)',
  'Pop.3.header.kicker': 'not drawn: the layout-4 header prints no act type any more (a shared identity key; the bio’s role line and the form print it)',
  'Retro.0.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Retro.1.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Retro.2.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Retro.3.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Lime.0.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Lime.1.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Lime.2.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Lime.3.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Grunge.0.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Grunge.1.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Grunge.2.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Grunge.3.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Editorial.0.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Editorial.1.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Editorial.2.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Editorial.3.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Pop.0.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Pop.1.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Pop.2.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Pop.3.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  // Retro's layout 5 (the Overlay card) is a header-only design: the body under it is layout 1's page.
  'Retro.4.header.kicker': 'not drawn: the layout-5 Overlay card prints no kicker (a shared identity key; the bio’s role line and the form print it)',
  'Retro.4.header.location': 'not drawn: the layout-5 Overlay card prints no location (a shared identity key; the bio and the calendar print it)',
  'Paperback.0.header.kicker': 'not drawn: the layout-1 header prints no act type any more (a shared identity key; the bio’s role line and the form print it)',
  'Paperback.1.header.kicker': 'not drawn: the layout-2 header prints no kicker (a shared identity key; the bio’s role line and the form print it)',
  'Paperback.2.header.kicker': 'not drawn: the layout-3 card prints the card line in the kicker’s seat (a shared identity key; the bio’s role line and the form print it)',
  'Paperback.3.header.kicker': 'not drawn: the layout-4 header prints no act type any more (a shared identity key; the bio’s role line and the form print it)',
  'Paperback.0.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Paperback.1.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Paperback.2.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Paperback.3.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  // The media's layout-1 rows print the release and the running time as two chips (`rel`, `dur`), and the whole line as one chip only once the list is stored.
  'Paperback.0.media.tracks.sub': 'derived value: the seeded page prints the release and the running time as two chips, and the whole line only once the list is stored',
  // Layouts 2–4 are Pop's placeholder cards until their passes: the same rows as Pop's.
  'Paperback.1.media.tracks.sub': 'derived value: the seeded page prints the release and the running time as two nodes, and the whole line only once the list is stored',
  'Paperback.2.media.tracks.sub': 'derived value: the seeded page prints the release and the running time as two nodes, and the whole line only once the list is stored',
  'Paperback.3.media.tracks.sub': 'derived value: the page prints the release alone (the list tile’s Single); the running times are the player’s clock',
  'Lattice.0.header.kicker': 'not drawn: the layout-1 header prints no act type any more (a shared identity key; the bio’s role line and the form print it)',
  'Lattice.1.header.kicker': 'not drawn: the layout-2 header prints no kicker (a shared identity key; the bio’s role line and the form print it)',
  'Lattice.2.header.kicker': 'not drawn: the layout-3 card prints the card line in the kicker’s seat (a shared identity key; the bio’s role line and the form print it)',
  'Lattice.3.header.kicker': 'not drawn: the layout-4 header prints no act type any more (a shared identity key; the bio’s role line and the form print it)',
  'Lattice.0.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Lattice.1.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Lattice.2.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Lattice.3.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  // Headliner's layout-1 header (the only fitted one; layouts 2–4 are placeholders until their pass) draws neither line.
  'Headliner.0.header.kicker': 'not drawn: the layout-1 header prints no act type any more (a shared identity key; the bio’s role line and the form print it)',
  'Headliner.0.header.location': 'not drawn: layouts 1–4 print no location any more (a shared identity key; the bio, the calendar and the map print it)',
  'Headliner.0.media.tracks.sub': 'derived value: the seeded page prints the release under the title and the running time at the row’s right, and the whole line only once the list is stored',
  '*.*.pricing.tiers.tags': 'derived value: the filter chips are the distinct tags of every package',
  '*.3.video.videos.desc': 'not drawn: layout 4 prints the playing video’s title alone',
  '*.*.repertoire.songs.tags': 'derived value: the filter chips are the distinct tags of every song',
}
// INLINE_HEAD names a repeater the canvas draws only a head of, by a cap and a
// pager: repertoire layout 3 draws a song under every tag it carries, four a card
// and three cards a page, so a song can stand twice and a later one not at all (the
// rest are behind a card's *View full set*, live only). The video prints one row's
// copy: layout 2's stage its description, layout 4's top bar its title (the skip
// discs step it, live only). The group stays editable where it is drawn; a row `drawnRows` (EncoreBuilder.jsx) does not list is in the
// ledger with this reason, which is also what keeps the nth-peer pairing honest.
export const INLINE_HEAD = {
  '*.1.video.videos.desc': 'not drawn: only the video on the stage prints its description',
  '*.3.video.videos.title': 'live-only copy: layout 4’s top bar prints only the video in the player; the others are a skip away',
  '*.2.repertoire.songs': 'live-only copy: this song is behind a card’s View full set, or on a page of the pager',
}
// The two marks stand in layout 1's gallery blocks alone; layout 2 draws its
// `railLabel` once (at 768) and text can tell it from the heading.
export const INLINE_MARKED = {
  '*.0.gallery.railLabel': true,
  '*.0.gallery.sourceLabel': true,
}
export const INLINE_PART = {
  'map.listLabel': true,
  'calendar.time': true,
  'repertoire.songs.artist': true,
  // Layout 2 prints these inside a longer line: a bullet, an arrow or a count
  // beside the words (`32 reviews · 4.9 ★`, `Expand view→`). The words are
  // unique on the page, so the box narrows to them and no frame is needed.
  '*.1.pricing.reviews': true,
  '*.1.pricing.rating': true,
  '*.1.calendar.dateLabel': true,
  '*.1.map.terms': true,
  '*.1.map.expand': true,
  '*.1.form.bookings': true,
  // Layout 3 the same: `[ About ]`, the map's
  // `Based in Manchester · 5 gigs · 120 mi radius` and `Expand view→`, the form's
  // `★★★★★ 42 bookings`.
  '*.2.bio.aboutLabel': true,
  '*.2.map.base': true,
  '*.2.map.expand': true,
  '*.2.form.bookings': true,
  // Layout 4: the bio's overlay card prints `Performing since <date>` in one span
  // and the Listen link beside its arrow, a price its `£` and numeral in one node,
  // and the map's ticker `Next: <venue>` (page 0 alone, which the canvas is).
  '*.3.bio.since': true,
  '*.3.bio.cta2': true,
  '*.3.pricing.tiers.price': true,
  '*.3.map.gigs.venue': true,
}
// INLINE_LINES names the forms a slot's copy is printed in when the words alone
// cannot tell its node from another field's: each template is one line as the
// page draws it (spaces and case do not matter), `{}` the slot's own copy and
// `{cell}` a sibling cell of its row. A slot with a template is edited from a
// node that prints exactly that line, on its own words, and a line another
// field's node prints is not a peer of this slot's words. Scoped like the rest.
const GIG_TICKER_LINES = ['{city} · {month} {day} · {time}', '{city} · {month} {day}', '{month} {day} · {time}', '{month} {day}', '{city} · {time}']
export const INLINE_LINES = {
  '*.1.calendar.availLabel': ['{} ↓'],
  '*.1.media.chipLabel': ['● {}'],
  // Retro's layout-1 testimonial prints the attribution as one node, `Hannah L. · Private
  // host` (`vm.byline`), above the two pills that print `who` and `role` bare, so each
  // keeps its bare form. The other templates split the line into spans of their own, and
  // Retro's other layouts print no such line. A blank half drops the line and its
  // separator, which `inlineSlots`' fill does, since the page drops both too.
  'Retro.0.testimonials.quotes.who': ['{}', '{who} · {role}'],
  'Retro.0.testimonials.quotes.role': ['{}', '{who} · {role}'],
  // Retro's layout 6 prints the kicker twice: bare, in the inset card under the name,
  // and as `● DJ · LIVE ACT` above the title. A slot with a line is spoken for by it,
  // so the bare form is listed too, or the card's copy would stop opening.
  '*.5.header.kicker': ['{}', '● {}'],
  // The map's rows 1-4 print `City · Mon · 21:00`; the featured gig (row 0) lifts
  // its date and time into the travel card's chip, `● Jul 12 · 22:00`.
  '*.1.map.gigs.city': ['{city} · {month} · {time}'],
  '*.1.map.gigs.month': ['{city} · {month} · {time}', '● {month} {day} · {time}'],
  '*.1.map.gigs.day': ['● {month} {day} · {time}'],
  '*.1.map.gigs.time': ['{city} · {month} · {time}', '● {month} {day} · {time}'],
  // Layout 3 prints each row's pair, `Manchester · 22:00` (the pair's own line, which
  // naming the column here replaces), and the feature card under the list prints the
  // first row's city bare. The card shows one row where four share the city, so the bare
  // form is the head of the column (`inlineFieldAt`'s lined branch): the canvas is never
  // live, and the card is the first row there. Time is not printed bare, so it keeps the
  // pair; the card prints no date.
  '*.2.map.gigs.city': ['{city} · {time}', '{}'],
  // Layout 4's ticker prints the one gig on one line, `Manchester · JUL 12 · 22:00`
  // (`vm.gigs[].meta`), and drops a piece the artist emptied with its separator,
  // so each shorter form it can print is a line too. Per column: the venue is
  // printed on another line (`Next: …`, a part row).
  '*.3.map.gigs.city': GIG_TICKER_LINES,
  '*.3.map.gigs.month': GIG_TICKER_LINES,
  '*.3.map.gigs.day': GIG_TICKER_LINES,
  '*.3.map.gigs.time': GIG_TICKER_LINES,
}
// The canvas photo editor's ledger (plans/photo-edit.md): the photo groups a click does not open, keyed
// `Template.design.cat.key` like INLINE_OFF (`inlineRule` resolves both), the value the reason. A photo
// field is clickable when `fieldShown` says the layout reads it, less these. Empty until a pass measures one.
export const PHOTO_OFF = {}

export function inlineRule(table, themeName, design, group) {
  const parts = String(group).split('.')
  for (let n = parts.length; n >= 2; n--) {
    const g = parts.slice(0, n).join('.')
    for (const scope of [`${themeName}.${design}.`, `${themeName}.*.`, `*.${design}.`, '*.*.', '']) {
      const v = table[scope + g]
      if (v !== undefined) return v
    }
  }
  return undefined
}

// Character caps (plans/char-limits.md, user calls, 2026-10-13). A cap is
// measured per template and design — Figma says how many lines a text block
// draws, scripts/limits.mjs how many characters fit them at all three widths —
// and written on the field as `chars`, in `in`'s shape: a number, an array
// indexed by design (`null` for no cap), or an object keyed by template with
// `'*'` for the rest. A list field (`list: ','` or `list: '\n'`) caps each item
// by `chars` and the items by `count`, in the same shape. A repeater caps its
// columns through `cols: { [col]: spec }`, a spec being a `chars` value or
// `{ chars, count, list }` for a column that is itself a list (a song's tags).
// IDENTITY_CHARS holds the caps of the sections that print the header's keys
// (and the artist's name, `title`) with no field of their own, and `seal`, the
// fit of the name on a section's seal ring.
//
// EditPanel stops typing at a cap (`maxLength`, or a refused edit for a list)
// and sectionVm clamps what it renders, so copy typed under one layout's cap
// keeps its full text in `c` and is shortened on the page of a tighter one.
// Measured by scripts/limits.mjs's `who.*` probes (plans/char-limits.md,
// session 1): `kicker`, `location` and `tags` tighten the header's fields on a
// page that carries the section at that design (identityCap), and clamp what
// the section prints when it moves to a tighter one. `title` and `seal` only
// clamp: the name's panel cap is the header's own (user call, 2026-10-13), so
// a byline, a display head or a seal ring tighter than the h1 shortens its own
// copy with an ellipsis. Kicker and location never go under their seeds' own
// lengths (the frame's string fits where prose of its length may not); a
// chip is held to twice the longest seed (a sized seat).
export const IDENTITY_CHARS = {
  bio: {
    title: { Retro: [null, 55, 19, 48], Lime: [null, 49, 20, 49], Grunge: [null, 65, 18, 60],
      Editorial: [null, 37, 14, 31], Pop: [null, 37, 17, 39], Paperback: [null, 30, 17, 38] },
    kicker: { Retro: [19, 20, 13, 47], Lime: [20, 23, 21, 47], Pop: [26, 22, 13, 47], Paperback: [13, 20, 13, 47], '*': [20, 20, 13, 47] },
    location: { Retro: [18, 23, 15], Lime: [24, 26, 25], Grunge: [24, 23, 15], Editorial: [24, 33, 15],
      Pop: [27, 34, 15], Lattice: [19, 34, 15], Paperback: [17, 25, 14] },
    tags: { chars: { Retro: [null, 22, null, 22], '*': [null, 22, 22, 22] },
      count: { Retro: [null, 7, null, 7], '*': [null, 6, 8, 8] } },
    seal: { Retro: [19, null, 19], Lime: [13, null, 22], Grunge: [14, null, 14], Editorial: [16],
      Pop: [null, null, 12], Paperback: [null, null, 12] },
  },
  // No video row: layout 4's top bar printed the artist's name until 2026-10-28 and
  // prints the playing video's title since (`videos.title`), and layout 2 none.
  calendar: {
    location: { Retro: [19, null, null, 67], Lime: [null, null, null, 64], Grunge: [null, null, null, 55],
      Lattice: [19, null, null, 67], Paperback: [null, null, null, 29], '*': [null, null, null, 67] },
    seal: { Retro: [19] },
  },
  footer: {
    // Lattice's measured (limits.mjs footer --themes=5, `who.title`): the wordmark and the copyright both take
    // the name, two lines at the least width: 39 (87 at 1440, 76 at 768). Its ring is not drawn (no `seal` row).
    title: { Retro: [24], Lime: [46], Grunge: [54], Editorial: [39], Pop: [10], Lattice: [39], Paperback: [37] },
    seal: { Retro: 19, Lime: 13, Grunge: 14, Editorial: 16, Pop: 12, Paperback: 12 },
  },
  form: {
    // Lattice's layout 1 measured 2026-11-19 (limits.mjs form --themes=5 --designs=0, `who.*`): the name in
    // the context panel's avatar row holds 59, the role line 33; layouts 2 and 3 are Pop's.
    title: { Retro: [76, 50, 13], Lime: [61, 40, 13], Grunge: [50, 85, 23], Editorial: [27, 42, 10],
      Pop: [55, 54, 11], Lattice: [59, 54, 11], Paperback: [60, 32, 11] },
    kicker: { Retro: [43, 38], Pop: [39, 40], Lattice: [33, 40], Paperback: [37, 40], '*': [30, 40] },
    seal: { Pop: [12], Paperback: [12] },
  },
  // Layout 2's caption line ellipsizes at 390 past 26–27 (session 6's re-run;
  // session 1 read 28–29 before the box test told a clip from an overshoot).
  gallery: {
    title: { Retro: [80, 27], Pop: [80, 27], Paperback: [106, 23], '*': [106, 26] },
  },
  map: {
    location: { Retro: [null, 18], Lime: [null, 15], Pop: [null, 18], '*': [null, 17] },
  },
  media: {
    title: { Retro: [91, 11, 20, 30], Lime: [76, 11, 19, 29], Grunge: [40, 11, 21, 31],
      Editorial: [43, 11, 11, 31], Pop: [11, 11, 13, 31],
      // Layout 1 measured 2026-11-19 (limits.mjs media --themes=5 --designs=0): the card's
      // artist line, one ellipsised line, holds 49 / 51 / 40; the others are Pop's until their passes.
      Lattice: [40, 11, 13, 31],
      // Paperback's layout 1 measured 2026-11-20 (limits.mjs media --themes=6 --designs=0): the player's artist line,
      // one ellipsised line, holds 48 / 50 / 41; the others are Pop's until their passes.
      Paperback: [41, 10, 12, 30],
      // Headliner's layout 1 (limits.mjs media --themes=7 --designs=0): the player's artist line, one ellipsised line,
      // holds 65 / 65 / 50; the others are Grunge's until their passes.
      Headliner: [50, 11, 21, 31] },
  },
  pricing: {
    seal: { Grunge: [14] },
  },
  testimonials: {
    title: { Retro: [null, null, 65], Lime: [null, null, 60], Paperback: [null, null, 63], '*': [null, null, 67] },
  },
}
const specAt = (spec, themeName, design) => {
  if (spec == null) return undefined
  if (typeof spec === 'number') return spec
  if (Array.isArray(spec)) return spec[design] ?? undefined
  // Lattice and Paperback read Pop's row where a spec names neither them nor '*', until their own
  // caps are measured (plans/lattice/layout-1.md, Session 12: `limits.mjs --themes=5`;
  // plans/paperback/layout-1.md, Session 12: `--themes=6`). Paperback no longer reaches this fallback:
  // every spec has its own row (2026-11-21), and at layouts 2-4 its number is the placeholder tree's,
  // measured lower-only and never under the seed (the plan's *Session 12 — the proofs*).
  // Headliner reads GRUNGE's row (and Pop's where Grunge has none): its display is Anton, the face Grunge sets,
  // and its brutalist frames are nearer Grunge's than Pop's (plans/headliner/layout-1.md, *Settled in session 0*).
  // Every cap it reaches this way is provisional until its own pass measures it (`limits.mjs --themes=7`).
  return specAt(spec[themeName] ?? spec['*'] ?? (themeName === 'Lattice' || themeName === 'Paperback' ? spec.Pop : themeName === 'Headliner' ? (spec.Grunge ?? spec.Pop) : undefined), themeName, design)
}
const isColObj = (spec) => spec != null && typeof spec === 'object' && !Array.isArray(spec) && 'chars' in spec
// The resolved cap of a field or column: { chars, count, list } or null.
const capOf = (spec, count, list, themeName, design, num) => {
  const chars = specAt(spec, themeName, design)
  const n = specAt(count, themeName, design)
  const nu = specAt(num, themeName, design)
  if (chars == null && n == null && nu == null) return null
  return nu == null ? { chars, count: n, list } : { chars, count: n, list, num: nu }
}
export function fieldCap(f, themeName, design) {
  return capOf(f.chars, f.count, f.list, themeName, design)
}
export function colCaps(f, themeName, design) {
  if (!f.cols) return null
  const out = {}
  for (const [k, spec] of Object.entries(f.cols)) {
    const cap = isColObj(spec) ? capOf(spec.chars, spec.count, spec.list, themeName, design, spec.num)
      : capOf(spec, undefined, undefined, themeName, design)
    if (cap) out[k] = cap
  }
  return Object.keys(out).length ? out : null
}
const NO_CLAMP = new Set(['image', 'images', 'url', 'email', 'date', 'select', 'booked', 'place', 'miles'])
// A section's own cap for a header key it prints: its IDENTITY_CHARS entry, and
// the header's field besides (the header prints its own keys off `c`).
function identityCapOf(cat, key, themeName, design) {
  const own = cat === 'header'
    ? (FIELDS.header.find((f) => f.k === key) ?? null) : null
  const ownCap = own ? fieldCap(own, themeName, design) : null
  const ext = IDENTITY_CHARS[cat]?.[key]
  const extCap = ext == null ? null : isColObj(ext)
    ? capOf(ext.chars, ext.count, key === 'tags' ? ',' : undefined, themeName, design)
    : capOf(ext, undefined, key === 'tags' ? ',' : undefined, themeName, design)
  return minCap(ownCap, extCap)
}
const minOf = (a, b) => (a == null ? b : b == null ? a : Math.min(a, b))
function minCap(a, b) {
  if (!a) return b
  if (!b) return a
  const num = minOf(a.num, b.num)
  return { chars: minOf(a.chars, b.chars), count: minOf(a.count, b.count), list: a.list ?? b.list,
    ...(num == null ? null : { num }) }
}
// The cap EditPanel enforces on one of the header's shared keys (`kicker`,
// `location`, `tags`): the tightest among the page's sections at their
// current designs (user call, 2026-10-13). A section moved to a tighter
// layout later is covered by its own render clamp. The artist's name is not
// one of them: its panel cap is the header's own field (session 1).
export function identityCap(key, sections, themeName) {
  let cap = null
  for (const s of sections) {
    cap = minCap(cap, identityCapOf(s.cat, key, themeName, designOf(s.cat, s.arch, themeName)))
  }
  return cap
}

// Which sections print the header's identity keys, and at which designs: the
// panel lists such a key in every section that draws it (the value is still the
// header's, one copy). `FIELDS.header[].in` speaks for the header; this is every
// other category, 0-based like `in`, an array or an object by template with
// `'*'`. MEASURED, not read off prose: `node scripts/reach.mjs 0,1,2,3,4` probes
// `who.kicker`, `who.location`, `who.tags` and `who.showTags=hide` per design;
// change a reader, re-measure, change this.
export const IDENTITY_READS = {
  // Headliner's layout-1 bio prints neither (the frame has no role line), so its layout 1 is off both.
  kicker: { bio: { Headliner: [1, 2, 3], '*': [0, 1, 2, 3] }, form: [0, 1] },
  location: { bio: { Headliner: [1, 2], '*': [0, 1, 2] }, calendar: { Retro: [0, 3], Lattice: [0, 3], '*': [3] } },
  tags: { bio: { Retro: [1, 3], '*': [1, 2, 3] } },
  showTags: { bio: { Retro: [1, 3], '*': [1, 2, 3] } },
}

// The header's `shared` FIELDS entries that section `cat` draws at `design`.
export function identityFieldsFor(cat, themeName, design) {
  if (cat === 'header') return FIELDS.header.filter((f) => f.shared && fieldReach(f, themeName, design))
  return FIELDS.header.filter((f) => {
    const r = IDENTITY_READS[f.k]?.[cat]
    const d = !r || Array.isArray(r) ? r : (r[themeName] ?? r['*'])
    return !!d && d.includes(design)
  })
}

// The line under an identity key's label: what it is, and where else the page
// draws it, off the sections as they stand now (so it never goes stale).
export function identityHint(f, sec, sections, themeName) {
  const others = sections
    .filter((s) => s.id !== sec.id)
    .filter((s) => {
      return identityFieldsFor(s.cat, themeName, designOf(s.cat, s.arch, themeName)).some((g) => g.k === f.k)
    })
    .map((s) => catName(s.cat))
  const uniq = [...new Set(others)]
  return uniq.length ? `${f.hint} Also printed in: ${uniq.join(', ')}.` : f.hint
}

// The fit of the artist's name on section `cat`'s seal ring at this design:
// the header's Badge text cap, or IDENTITY_CHARS[cat].seal. sectionVm clamps
// the ring's copy of the name to it where no Badge text is set.
export function sealCap(cat, themeName, design) {
  if (cat === 'header') return fieldCap(FIELDS.header.find((f) => f.k === 'badgeText'), themeName, design)
  return capOf(IDENTITY_CHARS[cat]?.seal, undefined, undefined, themeName, design)
}

// `s` cut to `n` characters, the ellipsis inside them: at the last space past
// 60% of the cap, else mid-word. Untouched at or under the cap.
export function clampText(s, n) {
  if (typeof s !== 'string' || n == null || s.length <= n) return s
  let cut = s.slice(0, Math.max(0, n - 1))
  const sp = cut.lastIndexOf(' ')
  if (sp >= n * 0.6) cut = cut.slice(0, sp)
  return `${cut.trimEnd()}…`
}
const listItems = (s, sep) => s.split(sep)
// Each item clamped to `chars` (its leading and trailing space kept, so a list
// that fits rejoins byte for byte, and an item at its cap with a space typed
// after it is not over: capExcess trims both) and the list cut after `count`
// non-blank items.
export function clampList(s, cap) {
  if (typeof s !== 'string' || !cap) return s
  let kept = 0
  const out = []
  for (const it of listItems(s, cap.list)) {
    if (it.trim()) {
      if (cap.count != null && kept >= cap.count) break
      kept++
    }
    const lead = it.match(/^\s*/)[0]
    const body = it.slice(lead.length).trimEnd()
    out.push(lead + clampText(body, cap.chars) + it.slice(lead.length + body.length))
  }
  return out.join(cap.list)
}
// A price's first number run cut to `n` characters, the last of them an `…`
// (JP-168, user call, 2026-11-11, reopening the 'no ellipsis' call): a number
// that lost digits without a mark read as another price, 100x smaller. The
// mark sets in the small tail (priceParts() splits at the first non-number
// character), so the numeral keeps `n - 1` digits. Only a run with a digit
// counts: a digit-less price wraps as prose (JP-135) and 'POA' is a word, not
// a number. A cut that lands after a comma or a point drops it: 1,200 cut to 2
// reads 1.
function numeralRun(v) {
  const { at, end, prose } = priceCuts(v)
  return !prose && /\d/.test(v.slice(at, end)) ? { at, end } : null
}
// The characters in a price's numeral, 0 where it has none (see `numeralRun`).
export function numeralLen(v) {
  const run = typeof v === 'string' ? numeralRun(v) : null
  return run ? run.end - run.at : 0
}
export function clampNumeral(v, n) {
  if (typeof v !== 'string' || n == null) return v
  const run = numeralRun(v)
  if (!run || run.end - run.at <= n) return v
  return v.slice(0, run.at) + v.slice(run.at, run.at + Math.max(1, n - 1)).replace(/[.,]+$/, '') + '…' + v.slice(run.end)
}
export const clampCapped = (v, cap) => (!cap || typeof v !== 'string' ? v
  : cap.list ? clampList(v, cap) : clampText(clampNumeral(v, cap.num), cap.chars))
// How far a value is past its cap: the characters over, plus one per item over
// the count. 0 is within it. EditPanel refuses a list edit that raises it.
export function capExcess(v, cap) {
  if (!cap || typeof v !== 'string') return 0
  if (!cap.list) {
    const run = cap.num == null ? null : numeralRun(v)
    const num = run ? Math.max(0, run.end - run.at - cap.num) : 0
    return num + (cap.chars == null ? 0 : Math.max(0, v.length - cap.chars))
  }
  const items = listItems(v, cap.list).map((t) => t.trim()).filter(Boolean)
  const over = cap.chars == null ? 0 : items.reduce((n, t) => n + Math.max(0, t.length - cap.chars), 0)
  return over + (cap.count == null ? 0 : Math.max(0, items.length - cap.count))
}
const clampRows = (rows, caps) => {
  let moved = false
  const map = (r) => {
    if (!r || typeof r !== 'object') return r
    let row = r
    for (const [k, cap] of Object.entries(caps)) {
      const v = clampCapped(r[k], cap)
      if (v !== r[k]) { if (row === r) row = { ...r }; row[k] = v; moved = true }
    }
    return row
  }
  if (Array.isArray(rows)) { const out = rows.map(map); return moved ? out : rows }
  const out = Object.fromEntries(Object.entries(rows).map(([k, r]) => [k, map(r)]))
  return moved ? out : rows
}
// Old stored content read under today's keys. `c` itself when there is nothing
// to carry over.
export function legacyContent(cat, c) {
  // The header's Show / Hide badge became three states (`badgeMode`); a stored
  // `showBadge` is read once, here, and never again.
  if (cat === 'header' && c && 'showBadge' in c) {
    const { showBadge, ...rest } = c
    return rest.badgeMode === undefined && showBadge === 'hide' ? { ...rest, badgeMode: 'hidden' } : rest
  }
  return c
}
// A section's content with every capped key clamped for this template and
// design — `c` itself when nothing is over, so a page within its caps renders
// exactly as it did before any cap existed. sectionVm calls it at its head.
export function clampContent(cat, c, themeName, design) {
  let out = c
  for (const f of FIELDS[cat] ?? []) {
    const v = c[f.k]
    if (v == null || NO_CLAMP.has(f.type)) continue
    let next = v
    if (typeof v === 'string') next = clampCapped(v, fieldCap(f, themeName, design))
    else if (typeof v === 'object') {
      const caps = colCaps(f, themeName, design)
      if (caps) next = clampRows(v, caps)
    }
    if (next !== v) { if (out === c) out = { ...c }; out[f.k] = next }
  }
  return out
}
// The header's keys and the artist's name as section `cat` prints them,
// clamped to its own caps (the header's fields, or IDENTITY_CHARS).
export function clampIdentity(cat, identity, artistName, themeName, design) {
  let id = identity
  for (const k of ['kicker', 'location', 'tags']) {
    const v = clampCapped(identity?.[k], identityCapOf(cat, k, themeName, design))
    if (v !== identity?.[k]) { if (id === identity) id = { ...identity }; id[k] = v }
  }
  const nameCap = identityCapOf(cat, 'title', themeName, design)
  return { identity: id, artistName: clampCapped(artistName, nameCap) }
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

// A YouTube address → { id, list, start }, or null when it names no single
// video or playlist (a channel, an @handle, the bare site, another host).
// `id` is '' for a playlist alone. Takes extUrl()'s output, so it is absolute.
// The parse behind youtubeEmbed, youtubeThumb and youtubeWatch.
export function youtubeParts(url) {
  let u
  try { u = new URL(String(url ?? '')) } catch { return null }
  if (!/^https?:$/.test(u.protocol)) return null
  const host = u.hostname.toLowerCase().replace(/^(www|m|music)\./, '')
  const path = u.pathname.split('/').filter(Boolean)
  const ID = /^[\w-]{11}$/
  const LIST = /^[\w-]+$/
  let id = ''
  if (host === 'youtu.be') id = path[0] || ''
  else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    if (path[0] === 'watch') id = u.searchParams.get('v') || ''
    else if (['shorts', 'live', 'embed', 'v'].includes(path[0])) id = path[1] || ''
  } else return null
  const list0 = u.searchParams.get('list') || ''
  const list = LIST.test(list0) ? list0 : ''
  if (!ID.test(id)) {
    // A playlist page, or an /embed/videoseries address, names a list alone.
    const listOnly = list && (path[0] === 'playlist' || path[1] === 'videoseries')
    return listOnly ? { id: '', list, start: 0 } : null
  }
  // t=90, t=90s, t=1m30s or start=90 — seconds the video opens at.
  const at = u.searchParams.get('start') || u.searchParams.get('t') || ''
  const m = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/.exec(at)
  const start = m ? (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0) : 0
  return { id, list, start }
}

// A YouTube address → the address of its embeddable player, or '' when the
// link names no single video or playlist, which the gallery's YouTube row then
// keeps as the outbound link it always was. Resolved here and in sectionVm so
// EncoreSection does no address maths.
//
// youtube-nocookie.com is YouTube's own privacy-enhanced embed host: no
// cookie until the visitor plays. `autoplay` is safe because the iframe only
// exists after the visitor clicked (the gallery's row, the video's stage or
// one of its rows).
export function youtubeEmbed(url) {
  const p = youtubeParts(url)
  if (!p) return ''
  if (!p.id) return `https://www.youtube-nocookie.com/embed/videoseries?list=${p.list}&autoplay=1&rel=0`
  const q = [
    p.list && `list=${p.list}`, 'autoplay=1', 'rel=0', p.start > 0 && `start=${p.start}`,
  ].filter(Boolean).join('&')
  return `https://www.youtube-nocookie.com/embed/${p.id}?${q}`
}

// The video's own thumbnail, or '' (a playlist alone, or no video). hqdefault
// exists for every video; it is 4:3 with the 16:9 picture letterboxed in it,
// so `object-fit: cover` in a 16:9 box crops exactly the bars.
export function youtubeThumb(url) {
  const p = youtubeParts(url)
  return p?.id ? `https://i.ytimg.com/vi/${p.id}/hqdefault.jpg` : ''
}

// The canonical page of a video or playlist, the address YouTube's oEmbed
// endpoint is asked about (VideosField's title lookup), or ''.
export function youtubeWatch(url) {
  const p = youtubeParts(url)
  if (!p) return ''
  return p.id ? `https://www.youtube.com/watch?v=${p.id}` : `https://www.youtube.com/playlist?list=${p.list}`
}

// The channel an oEmbed answer names, as a page on youtube.com, or ''. Its
// `author_url` is absolute for a video and a bare path for some playlists.
export function youtubeChannel(u) {
  try {
    const x = new URL(String(u ?? ''), 'https://www.youtube.com')
    return /(^|\.)youtube\.com$/i.test(x.hostname) && x.pathname.length > 1 ? `https://www.youtube.com${x.pathname}` : ''
  } catch { return '' }
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
// A `date` row must be a real day, day first (parseDayFirst), and, once the
// clock is known (`today`, an ISO string: the published tab's, undefined on the
// canvas), not before today.
// The message is optional: the four boxes above it are the enquiry.
// `m` is a message per row where the box can say what is wrong: a date typed
// but not a real day, or a day gone by. An empty or email row has none (the
// form's own prompt says it), so the visitor still sees one line at a time.
//
// This is the calendar wizard's check (`vm.calCheck`); the enquiry form's own
// is enquiryErrors() below, which follows the QA rules (2026-11-15).
export function formErrors(fields, vals, today) {
  const now = parseDate(today)
  const m = []
  const f = (fields || []).map((fd, i) => {
    const v = String((vals || [])[i] ?? '').trim()
    m[i] = ''
    if (!v) return true
    if (fd.kind === 'date') {
      const at = parseDayFirst(v)
      if (!at) { m[i] = DATE_FORMAT_MSG; return true }
      if (now && isoDate(at.y, at.m, at.d) < isoDate(now.y, now.m, now.d)) { m[i] = DATE_PAST_MSG; return true }
      return false
    }
    return fd.kind === 'email' && !!emailProblem(v)
  })
  return { f, m, any: f.some(Boolean) }
}
export const DATE_FORMAT_MSG = 'Type the date as dd / mm / yyyy.'
export const DATE_PAST_MSG = 'That date has already passed.'

// The enquiry form's own check (QA, 2026-11-13 / 15). Only the name, the email
// and the message (where the layout draws one) are required; a date, a guest
// count and any other box are optional, a blank or whitespace-only value
// counting as omitted, but a value that is supplied must pass its kind's rule.
// A hand-over to the mail app waits on this: EnquiryForm composes no href
// until `any` is false.
export const NAME_MSG = 'Enter your name, using letters only (no digits).'
export const EMAIL_MSG = 'Enter a valid email address.'
export const NUMBER_MSG = 'Enter a whole number, 1 or more.'
export const REQUIRED_MSG = 'This box is required.'
export const MESSAGE_MSG = 'Write a short message.'
// A name: at least one letter, no digit in any script (\p{N} also catches
// ² and ٣), otherwise anything — spaces, ’ ' and - are ordinary name marks.
export function nameProblem(v) {
  const t = String(v ?? '').trim()
  if (!t) return REQUIRED_MSG
  return /\p{N}/u.test(t) || !/\p{L}/u.test(t) ? NAME_MSG : null
}
// A guest count: a whole number of at least 1 (digits only after trimming).
export function countProblem(v) {
  const t = String(v ?? '').trim()
  return t && !(/^\d+$/.test(t) && +t >= 1) ? NUMBER_MSG : null
}
// Returns { f, m, msg, any, first }. `f` / `m` are index-aligned with the rows
// as formErrors' are; `msg` is { bad, m } for the textarea (bad only when
// `needMsg`); `first` is the first refused control in page order — a row's
// index, or 'msg' — which is where focus goes.
export function enquiryErrors(fields, vals, today, { message = '', needMsg = false } = {}) {
  const now = parseDate(today)
  const m = []
  const f = (fields || []).map((fd, i) => {
    const v = String((vals || [])[i] ?? '').trim()
    m[i] = ''
    if (fd.kind === 'name') { m[i] = nameProblem(v) || ''; return !!m[i] }
    if (fd.kind === 'email') {
      if (!v) { m[i] = EMAIL_MSG; return true }
      if (/\s/.test(v) || emailProblem(v)) { m[i] = EMAIL_MSG; return true }
      return false
    }
    if (!v) return false
    if (fd.kind === 'number') { m[i] = countProblem(v) || ''; return !!m[i] }
    if (fd.kind === 'date') {
      const at = parseDayFirst(v)
      if (!at) { m[i] = DATE_FORMAT_MSG; return true }
      if (now && isoDate(at.y, at.m, at.d) < isoDate(now.y, now.m, now.d)) { m[i] = DATE_PAST_MSG; return true }
    }
    return false
  })
  const msgBad = !!needMsg && !String(message ?? '').trim()
  const at = f.indexOf(true)
  return {
    f, m, msg: { bad: msgBad, m: msgBad ? MESSAGE_MSG : '' },
    any: at >= 0 || msgBad, first: at >= 0 ? at : msgBad ? 'msg' : -1,
  }
}

// A tagged row's raw `tags` string → its trimmed, non-empty labels. Song-named
// for the list it was written for, but it reads nothing but the string: the
// pricing tiers' tags go through it too, and so does the enquiry form's
// comma-separated list of event types.
export function songTags(str) {
  return String(str ?? '').split(',').map((t) => t.trim()).filter(Boolean)
}

// A filter row over any list of `{ tags }` rows — the repertoire's songs and
// the pricing section's packages both (whose row drops the REP_ALL head,
// JP-089; `vm.tierChips` slices it off): REP_ALL, then every tag any row carries,
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

// A package's price → the small seat before the big numeral, the numeral
// itself, and the small seat after it (JP-058 and JP-074, 2026-09-28). The
// lead is everything before the first digit, trimmed, so '£650' is '£' + '650'
// and 'From £1,200' is 'From £' + '1,200'. The amount is the first numeric run
// alone, digits and the separators inside it, and the tail is the rest,
// trimmed — so a range sets its second half small, as every layout-3 frame
// draws it: '£450 — £1,400' is '£' + '450' + '— £1,400', and '£450 + VAT' is
// '£' + '450' + '+ VAT'. A separator ending the run goes to the tail rather
// than being lost ('£450.' → a small '.'). The price is free text, so no
// currency is assumed. Named and left: 'Up to 120 guests: £900' is 'Up to' +
// '120' + 'guests: £900', '£1.2k' sets a small 'k', and a thousands space
// ('£1 200') sets '1' big and '200' small.
// A price with no digit has no numeral to cut at, so it is cut where its words
// start (JP-156, user call, 2026-10-26): the leading run of characters that are
// neither letters nor digits is the lead, trimmed, and the words are the amount.
// '£TBC' is '£' + 'TBC' and '$ POA' is '$' + 'POA', drawn as '£650' is, which is
// also what lets the inline box cover 'TBC' alone. 'POA', 'TBC' and 'Contact me
// for a quote' start with a letter, so they have no lead and stand whole; so
// does 'From £POA', whose symbol is not leading. A price made of symbols alone
// ('£', left behind when its words are deleted) is all lead with an empty
// amount, so the next word typed keeps the sign. `tail` is empty without a
// digit. `prose` is judged on the amount, so '£Contact me for a custom quote'
// is prose as 'Contact me for a custom quote' is.
//
// `priceCuts` is the one place a price is cut: `priceParts` reads the three
// parts off it and `priceWrite` (EncoreBuilder.jsx) splices a typed part back at
// the same offsets, so the page, the inline box and the write cannot drift.
// `at` and `end` index the string as given, untrimmed: `[0, at)` is the lead's
// seat, `[at, end)` the amount and `[end, length)` the tail's.
const PRICE_PROSE_MIN = 8
export function priceCuts(str) {
  const raw = String(str ?? '')
  const m = raw.match(/\d[\d,.]*/)
  if (m) {
    const amount = m[0].replace(/[.,]+$/, '')
    return { at: m.index, end: m.index + amount.length, prose: false }
  }
  const end = raw.trimEnd().length
  const lead = raw.match(/^[^\p{L}\p{N}]*/u)[0]
  // Leading space alone is not a lead; symbols reach `end` when nothing follows.
  const at = lead.trim() ? Math.min(lead.length, end) : lead.length
  return { at, end, prose: end - at > PRICE_PROSE_MIN }
}
export function priceParts(str) {
  const raw = String(str ?? '')
  const { at, end, prose } = priceCuts(raw)
  // `prose` (JP-135): a long run with no digit is a sentence, not a numeral
  // ('Contact me for a custom quote'). It still takes the amount's seat, but a
  // renderer must let it wrap and step down a size: set whole in the big
  // numeral it outruns the card and the page. 'POA' and 'TBC' stay a numeral.
  return {
    prose,
    lead: raw.slice(0, at).trim(), amount: raw.slice(at, end),
    tail: raw.slice(end).trim(),
  }
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
// Date.UTC reads the years 0-99 as 1900-1999, so a four-digit year below 1900
// ('0000', '0025') would name a day in the wrong century: it is not a date.
export const MIN_YEAR = 1900
export function parseDate(v) {
  const t = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(v ?? '').trim())
  if (!t) return null
  const y = +t[1], m = +t[2] - 1, d = +t[3]
  if (y < MIN_YEAR || m < 0 || m > 11 || d < 1 || d > monthSpan(y, m).length) return null
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
  if (y < MIN_YEAR || m < 0 || m > 11 || d < 1 || d > monthSpan(y, m).length) return null
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

// A gig's date as a `Date.UTC` stamp, or null when the three boxes do not name
// a real day. The month is the artist's free text ("Jul", "july", "Sept"),
// matched by its first three letters against MONTHS; the year must be four
// digits, because Date.UTC reads 25 as 1925; and a day the month does not have
// (31 Jun) gives nothing rather than rolling over, parseDate()'s rule. The
// weekday and the Upcoming / Past status both read it, so a date is one rule.
// The month a gig's free-text box names (its first three letters), zero-based, or -1.
const gigMonthIdx = (month) => {
  const key = String(month ?? '').trim().slice(0, 3).toLowerCase()
  return key.length === 3 ? MONTHS.findIndex((n) => n.slice(0, 3).toLowerCase() === key) : -1
}
export function gigStamp(year, month, day) {
  const y = /^\d{4}$/.exec(String(year ?? '').trim())
  const d = /^\d{1,2}$/.exec(String(day ?? '').trim())
  const m = gigMonthIdx(month)
  if (!y || !d || m < 0) return null
  const n = +d[0]
  if (+y[0] < MIN_YEAR || n < 1 || n > monthSpan(+y[0], m).length) return null
  return Date.UTC(+y[0], m, n)
}

// What a gig's month, day or year box takes as it is typed (QA, 2026-11-09: the
// boxes took 'xyzqw' / '99ab' / 'abc12345' and the date disc printed them).
// `col` is 'month' | 'day' | 'year'; returns the value to store, or `prev` when
// the keystroke is refused. Day and year keep digits only (two and four) and
// the day only while it can still become 1-31 ('3', '31', never '99' or '32');
// the month is letters and a point, and only while it is the start of a month's
// name ('Ju', 'Sept', 'July'), the rule gigStamp() reads it by. Stored copy
// from before this is left as it is: only the typing is filtered.
// A deletion is `prev` with one run of characters taken out, so Backspace, Delete
// and Cut always pass and a month stored before the rule can be cleared. It is
// NOT "shorter than prev": select-all-and-type over `Jul` reports `x`, which is
// shorter and is a replacement (QA 1amvuf5xxq2, pass 2), so it takes the filter.
const isCut = (v, prev) => {
  if (v.length >= prev.length) return false
  for (let i = 0; i <= v.length; i++) if (prev.startsWith(v.slice(0, i)) && prev.endsWith(v.slice(i))) return true
  return false
}
// A day the row can keep: 1–31. A lone `0` is typeable (it heads `05`) but is no day, so the boxes settle it on leaving.
export const gigDayOk = (d) => /^\d{1,2}$/.test(String(d ?? '').trim()) && +String(d).trim() >= 1 && +String(d).trim() <= 31
const DAY_PREFIX = /^(|0|0[1-9]|[1-9]|[12]\d|3[01])$/
// Pass 3 (QA 1amvuf5xxq2): a box is also refused when the date it makes with the row's other two is
// not a day (Feb 31, Feb 29 2031, 31 Jun). `year` is the row's when it is four digits from MIN_YEAR,
// else a leap year, so Feb 29 stays typeable until a year says otherwise; a part that is not complete
// yet (a partial month or year, an empty day) decides nothing.
const fitsRow = (month, day, year) => {
  const m = gigMonthIdx(month)
  const d = /^\d{1,2}$/.test(String(day ?? '').trim()) ? +String(day).trim() : 0
  if (m < 0 || !d) return true
  const y = /^\d{4}$/.test(String(year ?? '').trim()) && +String(year).trim() >= MIN_YEAR ? +String(year).trim() : 2024
  return d <= monthSpan(y, m).length
}
export function gigPart(col, raw, prev = '', row = null) {
  const v = String(raw ?? ''), was = String(prev ?? '')
  if (col !== 'month' && col !== 'day' && col !== 'year') return v
  if (isCut(v, was)) return v
  const r = row ?? {}
  // A letter typed over a selection strips to nothing: refuse it rather than empty the box.
  if (col === 'day') {
    const d = v.replace(/\D/g, '').slice(0, 2)
    return d && DAY_PREFIX.test(d) && fitsRow(r.month, d, r.year) ? d : was
  }
  if (col === 'year') {
    const y = v.replace(/\D/g, '').slice(0, 4)
    if (!y) return was
    // Only a whole year is decidable: `201` is the head of 2010–2019, and reverts on leaving the box.
    if (y.length === 4 && (+y < MIN_YEAR || !fitsRow(r.month, r.day, y))) return was
    return y
  }
  const key = v.trim().replace(/\./g, '').toLowerCase()
  if (!key) return v.trim() ? was : ''
  if (!/^[a-z]+$/.test(key)) return was
  if (!MONTHS.some((n) => n.toLowerCase().startsWith(key))) return was
  return fitsRow(v, r.day, r.year) ? v : was
}

// A gig's weekday, for layout 3's date disc (JP-069, user call, 2026-09-29):
// CAL_DAYS' short name, or '' where gigStamp() names no day.
export function gigWeekday(year, month, day) {
  const t = gigStamp(year, month, day)
  return t == null ? '' : CAL_DAYS[new Date(t).getUTCDay()]
}

// A gig's status against today, for layout 3's row pill (JP-106, user call,
// 2026-10-06): 'upcoming' or 'past', and '' with no today (the canvas, which
// is a picture with no date: the calendar's `dead` rule) or no date gigStamp()
// accepts. A gig dated today is upcoming: the night has not happened yet.
// `today` is parsed ({ y, m, d }, parseDate()'s shape), compared by Date.UTC.
export function gigStatus(year, month, day, today) {
  const t = gigStamp(year, month, day)
  if (t == null || !today) return ''
  return t >= Date.UTC(today.y, today.m, today.d) ? 'upcoming' : 'past'
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
