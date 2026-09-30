# The designed templates: Retro, Lime, Grunge and Editorial — working notes

Moved word for word out of `CLAUDE.md`'s *Intentional limits — not bugs* on 2026-09-30, so it
loads only when a session works on it. "Above" and "below" may point into `CLAUDE.md` or
another `notes/` file.

- **Retro, Lime, Grunge and Editorial are designed; Pop is not.** Pop is fully
  functional but renders flat. Retro's decorative language is gated on `s.retro`, and
  it gets six photographic header layouts where Pop gets three. **Lime is designed at all four of
  its layouts**: each of its Figma pages is the same components as Retro's page of that number
  in another variable mode, so its decoration (arc seams at layouts 1 and 4, glows at every
  layout, the arch portrait) lives in **`s.lime`** blocks inside the shared branches, never in
  a branch of its own — `if (s.lime)` or `if (s.v0 && s.lime)` in the `v0` code, and
  `if (s.v1 && s.lime)` / `if (s.v2 && s.lime)` / `if (s.v3 && s.lime)` ahead of an
  `if (s.v1)` / `if (s.v2)` / `if (s.v3)` whose state is hoisted or `if (s.lime)` inside it
  after the seam — and a value Retro and Lime both draw is gated `(s.retro || s.lime)`.
  The header components are the exception: each is its own branch, so its Lime block is
  `if (s.lime) { … return }` at the head (`HeaderV1`; `HeaderV2`, whose Lime frame is a
  different composition — an upright glass card where Retro tilts a polaroid; and `HeaderV3`,
  a glass nav capsule over an identity panel with no checker floor, whose desktop photograph
  is drawn **mirrored** because its 1440 master's crop flips it — an artist's upload reads
  backwards at desktop and forwards at 768 and 390, a named product call reversible in one
  line). Its header family is `'lime'`: the first four photographic layouts, all four fitted,
  so every card in the setup modal lays out a whole Lime page and the family is closed
  (`plans/lime/`). At layouts 2, 3 and 4 the footer is layout 1's (`NVAR.footer` is 1), and
  at layout 3 it stands on Scheme 2's olive `box1`. That is `vm.footerBand`, read off the page's
  design like Editorial's seat, and it paints the root, the seal's disc and the Book pill's label
  and disc, every node the frame binds to `sem/bg` (JP-067 threaded the pill). Two
  shared helpers grew an additive prop for layout 4: `ArcEdge` takes `TornEdge`'s `bleed`
  (`false` inside a sheet the branch has already bled), and `SealBadge`'s Lime disc takes a
  `scheme` (3 = lime disc with ink marks, 4 = pale disc with ink marks) because the layout-4
  header's seal changes colour between widths.
  **Grunge is designed at all four of its layouts** (`plans/grunge/layout-1.md` … `layout-4.md`;
  the Figma mode is called *Static Youth*, and nothing in the file says Grunge). Its pages are
  Lime's four pages in a third mode, so it has **no blocks of its own**: each of the eleven Lime
  layout-1 blocks, the ten layout-2 ones, the ten layout-3 ones (the gallery's, which has no
  block at either layout, as seven and then eleven ternaries) and the ten layout-4 ones is
  widened to `(s.lime || s.grunge)` and Grunge's differences are `s.grunge` arms inside it —
  or, past a handful, a `G` lookup at the block's head whose Lime arm is the block's own literals. The
  gates are `s.grunge`, the named pairs — `(s.retro || s.grunge)` for grain and torn edges,
  `(s.lime || s.grunge)` for the `sem` reads and the capsule nav — and **`s.designed`** for what
  every designed template draws alike (`TagChips`' sentence-case chips, the root's full-bleed
  hero, the map raster); a
  `(s.retro || s.lime)` site Grunge does not share stays as it is, widened per site from the
  frame and never by grep. Its display face is **Anton standing in for Stones Crush** (not a
  Google Font; user call, 2026-09-21), a third larger per em, so every Grunge size in that face
  goes through `faced()` (× 0.75) and its line height through `facedLh()` — both read `s.faceK`,
  the theme's `faceK` (1 wherever it states none), with an identity branch so no other theme's
  size gains a `calc`; casing stays
  `'title'` and each display or label string takes `textTransform: 'uppercase'` in its own arm.
  **The display sizes carry a distress mask** (JP-056's option C, user call, 2026-09-29,
  `plans/grunge/display-face.md`), since Stones Crush has no web licence: the glyphs stay
  Anton's, and `THEMES[2].distress` — a pinned-seed `feTurbulence` tile inlined as an SVG data
  URI, with its `4em 4em` size — reaches the section as `vm.distress`, which **`distressed(s,
  style)`** beside `faced()` spreads as `mask-image` / `-webkit-mask-image` on the element that
  sets the face, never on a span inside it. The cut is by ramp key at the call site:
  `dispXl` … `dispSm` and `title` (and `Title`, and the `Wordmark` at its Display/Title size —
  header 4's label-size one passes `clean` through `NavBar`) take it; `list`, every label key
  and every `labelStyle` site stay clean, since the texture eats thin strokes. A theme with no
  key gets its style object back untouched, so no other template moves. A mask moves no
  geometry; a glyph whose side bearing overhangs its box loses up to 1px at that edge (map
  layout 4's stat values at desktop), a named diff.
  At layout 1 its decoration is torn black seams owned by the three Scheme-2 bands (media, map, form —
  `TornEdge`'s `grunge` prop), the grain raster as a `lighten` layer (`Grain`'s `grunge` /
  `exact`), a red seal in four sections (`SealBadge`'s `line` is the footer's) and the media
  heading's `GrungeStar`. **Layout 2 is a black page with rings**: no seams, no band grain, no
  seal but the footer's; every glow Lime's layout-2 frames draw is a 1px inside ring instead
  (`s.stroke2` `#FF0000`, `s.ac` or `s.stroke1`, read per node), the grain is inside three
  photographs only (header, bio, gallery), the repertoire's `s.box1` sheet is the page's one
  full-bleed ground, and the form paints no sheet. Its Scheme 2 (`#171716`) and its two Scheme 3
  reds (`#F52E34` on the map's travel card, `#9E1F17` on the testimonials' card) are named
  literals, since no vm key holds them. **Its live states are redrawn, never inherited** — Lime's rule: the
  repertoire pager's current page and the map's pin and lit row are ours (its frames draw
  none), the refused box is the white ring above. **Layout 3 is a black page with one sheet**:
  the gallery's `#171716` band is the only full-bleed ground, since Scheme 4 is Scheme 1 byte
  for byte and the map that paints a sheet under Lime stands on the page here; no seams, no
  band grain, no seal but the bio's red disc and the footer's; grain inside two photographs
  (the header's well and the bio's); and every Lime glow is a plain inside ring again — this
  time proved rather than guessed, since **not one node of the 39 masters carries an effect**.
  Its Scheme 3 is **three** reds, not two (`#DF262C` its `bg` on the pricing stack's featured
  row, `#9E1F17` its `box/1` on the repertoire's middle set card and three testimonials cells,
  `#F52E34` its `box/2` on the map panel), and inside a Scheme 3 node `stroke2` is **white**,
  `stroke1` black 15% and `text1` black — so a Lime block reading those keys lands on the wrong
  value. Its live states are redrawn for the third time where the frames draw none: the
  gallery viewer's scrim and controls, and the map's pin and lit row. **Layout 4 is a black
  page with four red grounds and one dark band, and its seams are torn again**: the header's
  floor, the bio, the gallery and the repertoire stand on Scheme 3's `#DF262C` with black heads,
  the media on Scheme 2's `#171716`, and everything else on the page — the testimonials
  included, since Scheme 4 is the page, so the sheet Lime paints there collapses onto it. The
  seams are layout 1's `TornEdge` path, not Lime's arcs (`ArcEdge` stays Lime's): the media owns
  a red head tear and a black foot at 1440 and 768, the bio a `#171716` foot at 390, the gallery
  a black head and the repertoire a black foot. Effects are back, and every one is a backdrop
  blur (four a page, three of them behind opaque fills); every Lime glow is a ring. Its Scheme 3
  is **four** literals here (`#DF262C` `bg`, `#9E1F17` `box/1`, `#F52E34` `box/2`, `#82211B`
  `box/3`), and two panels moved their binding (the repertoire's to `box/2`, Book Us' to
  `box/3`). The desktop form has no instance on its page, so its main component (`725:2990`)
  is the master, and every Grunge form master prints the component's "KAI MERCER" where ours
  keeps JP-054's shared "Contact Us" — a named diff, the user's call. Its header family is
  `'grunge'`: four cards, Hero spread, Feature spread, Inset Hero and Stacked, all four fitted
  (`HeaderV3`'s Lime block, widened: a black capsule over the red floor, no checker, and the
  desktop photograph **not** mirrored — Grunge's fill is `FILL`), so every
  card in the setup modal lays out a whole Grunge page and the family is closed
  (`plans/grunge/`). At layouts 2, 3 and 4 the footer is layout 1's, and at layout 3 it stands
  on Scheme 2's `#171716`, as Lime's and Editorial's do: `vm.footerBand` takes Grunge as a
  named literal, the gallery sheet's (JP-067). Layout 4 grew two shared
  helpers additive props — `NavBar` takes `links={{ gap, cap }}` (the capsule's fixed 23 gaps,
  the type clamped to fit) and `mark`, and `Wordmark` takes `gap` — and `SealBadge`'s Lime
  `scheme` a Grunge arm at 4, a black disc with red marks.
  **Editorial is designed at all four of its layouts** (`plans/editorial/layout-1.md` …
  `layout-4.md`; the Figma mode is called *Sienna Vale*, which is also its frames' mock artist).
  Its pages are the fourth variant of the same eleven component sets — Lime's layout-1 tree in
  every section at layout 1, its layout-2 tree at layout 2, its layout-3 tree at layout 3 and its
  layout-4 tree at layout 4 — so it has **no blocks of its own** either: every Lime block, at
  all four layouts, is widened to
  **`s.limeTree`** — Lime, Grunge and
  Editorial, one group flag so no block spells a third name — and Editorial's deltas sit behind
  **`s.editorial`**, as a `const ed = s.editorial` and arms or a third arm at the head of the
  block's `G`, the twins' arms byte-identical. A site Editorial does not share keeps
  `(s.lime || s.grunge)`, and one is left: layout 2's gallery caption fill, whose other arm
  (`s.chips[0].bg`) is Editorial's own binding. The gallery's two layout-3 ternaries still
  spelling the pair stand behind an `ed` arm; layout 1's three shared helpers are `s.limeTree`
  now — `LogoMark`'s globe behind an `s.editorial && !s.v3` sparkle arm, `SealBadge`'s Lime disc
  behind an Editorial arm that steps aside at `scheme` 4, and `Photo`'s backdrop outright — and
  every layout-4 block is `s.limeTree`, its seams the twins' own arms (`ArcEdge` `!ed && …` in
  Lime's, `TornEdge` Grunge's). It is **the first light page**
  — paper, taupe and ink bands meeting on straight edges, no seams, arcs, tears or band grain —
  and six of its layout-1 sections stand on another scheme, resolved in `sectionVm` (the
  per-section scheme rule above).
  Its display and label face is **Noto Serif Display pinned to wdth 62.5 and wght 540–700**,
  standing in for Fontspring's demo Fisterra Fora (user call, 2026-09-24): one Google Fonts
  entry, never a second, or the default 400 finds a face of its own and the display goes wide
  and thin; `faceK` 1, casing `'title'`, each display or label string uppercased in its own arm
  (Grunge's rule). Its decoration: **dashed rules** (`DashRule`, an inline-SVG overlay at the
  node's own `dashPattern` — `gap` beside `dash` for an uneven one — on a row's edge, a
  column's upright side (`'left'` / `'right'`) or `side="all"` round a card, taking no height),
  **tape** (`Tape`, a blush or terracotta strip clipping the grain raster at SCREEN, seated by
  its centre), **tilted prints under real drop shadows** (the media mount, the gallery viewer,
  the map's gig panel, the calendar photograph), **sparkles** (`GrungeStar` with a `fill` — the
  same silhouette), an **arch** portrait in the header and the bio, and a terracotta **seal** in
  the bio and the footer (`SealBadge`'s Editorial arm, whose `line` — the footer's flag — inks the
  name in `sem/active/text`, the disc's own pair, where the bio's is `s.bg`: paper under layout
  1's Scheme 3, and ink on layout 3's taupe, where the frame's own `tag/1/bg` would be blush on
  the blush disc). `SIENNA_MEDIA` (`#E6B6A0`, `sem/media`) is
  the one literal no vm key holds; pricing's Book pills are named Scheme 1 literals on
  `BookPill`'s additive `discBg`, and pricing alone draws its instance's stroke
  (`editorialRule`). **Its three hand-scaled Bold statements** — the form's, the testimonials'
  quote and the footer's — are fitted to their widest word rather than broken inside it, as the
  demo face's measure broke them: `min(frame size, calc(100cqi / ems))` on an `inline-size`
  container, the frame's box a `max-width` over `min-width: min-content`, the ems in Noto Bold
  (`notoBoldEms()`, `notoEms()` × 1.045) — `vm.titleWordEms`'s Editorial arm for the form,
  `vm.quotes[].wordEms` per review and `vm.footerWordEms` for the footer, each undefined off
  Editorial. **Its live states are redrawn where its frames draw none** (Lime's rule): at layout
  1 the map's pin and lit row (paper in an ink ring; paper under ink, bled to the row's edges) and
  the refused box above; and where they draw one it is followed — the repertoire's pager marks
  its page in a terracotta ring (`Pager`'s Editorial arm; Grunge's frames mark none) and the
  map's by its ink numeral alone. That decoration — tape, prints, sparkles, the seal — is layout
  1's (layout 3's bio borrows the tape and a sparkle, and layout 4's media and gallery the tape
  and the prints). **Layout 2 is a paper page with the dashed rule alone**: no tape, leant print, sparkle or
  seal but the footer's; `DashRule` on nine sections (all but the gallery), 10, 10 on cards and
  rows, 5, 5 on the repertoire and the testimonials' tiles, 6, 6 on the form's boxes and 10, 11
  round the bio's card; square cards where the twins round theirs; and a terracotta-ringed arch
  photograph in the header. Its sections stand on four schemes — the repertoire's terracotta
  sheet and pricing's ink band at 1440 alone, paper narrow; media's and the calendar's taupe
  cards on the paper page; the form's full-bleed terracotta band — with eight nested nodes on
  `s.onScheme` (the scheme rule above). Its live states: the repertoire's pager is filled at
  every width (`Pager`'s additive `endBox` fills its two arrows) and marks the current page with
  an ink ring no frame draws; the map's lit pin is redrawn, an ink disc in a paper ring, where
  its idle dots are the frame's own paper at .6; pricing's picked chip is the frame's; and the
  form's refused box is a solid 2px paper ring. **Noto's J descends 0.24em** where the frames'
  face sits on the line, so the calendar's slot marks are lifted 0.09em in their tight line box
  (a `position: relative` nudge that moves no box) and the map's clipped venue box pads 0.1em
  under the glyphs and gives it back. **Layout 3 is a paper page between four full-bleed
  grounds** — the ink header (Scheme 3, its nav Scheme 5), the taupe gallery (2), the terracotta
  map (4) and the taupe footer (2, by page) — every band meeting its neighbour on a straight edge
  and **every card square** where the twins round theirs; no effect on any node, no leant print,
  no seal but the footer's, the bio trading Lime's seal for layout 1's tape and a terracotta
  sparkle over its square card. `DashRule` on eight sections (all but the header, the gallery
  and the footer): 10, 10 on cards and rows, 5, 5 on the repertoire's sets and square pager
  pills and the testimonials' cells (the ink `quote-cell` left bare, as its frame draws it — a
  seat, not a register), 6, 6 on the form's boxes. Its live states: the gallery viewer (above);
  pricing's moving FEATURED seat, the frame's own ink row read off `s.onScheme[3]` wherever the
  filter stands it; the map's lit row the frame's own and **followed** — paper dashed paper 56%
  under terracotta type — its idle dots **redrawn** in paper at the frame's .6, since Scheme 4's
  viewport resolves their `text/2` to ink on the dark plate, and its lit pin paper in a 2px ink
  ring; the form's refused box (above); the footer seal's name (above). Noto's glyph floor is
  measured per site against the frame's `absoluteRenderBounds` and lifted only where it shows —
  0.09em on the calendar's numeral and month (the J of JUNE) and pricing's numeral, 0.07em on
  the map panel's title, 0.08em on the form's head and, as baseline-aligned rows lifted whole,
  the form's price row (0.09em) and the testimonials' numeral row. **Layout 4 is ink, taupe,
  paper and terracotta on straight edges**: the header's photograph fades to ink over the ink bio
  (Scheme 3), then the taupe media band (2), the gallery and the repertoire on one ink ground
  (3), the map, pricing, calendar and form on the paper page, and a terracotta testimonials
  sheet (4). The root paints every seat, so the Lime blocks' own grounds read the seat's `s.bg`
  where Lime's read Scheme 1 keys (the bio's band is `s.ac` under Lime), and the testimonials
  block paints no sheet, Grunge's route for the opposite reason. No seam anywhere — `ArcEdge`
  stays Lime's and `TornEdge` Grunge's — so the media meets the gallery taupe into ink, straight,
  where the frames stand the video between. Layout 1's language comes back on two sections: the
  media sleeve and the gallery spotlight are **tilted prints** (Figma +2.33° and +1°, so CSS
  `rotate(-2.33deg)` and `rotate(-1deg)`, spaced by the unrotated slot at 1440 and 768 and by the
  rotated box at 390), the sleeve bordered 5px paper under layout 1's blush **tape** and clipped
  at 390 by its column, the spotlight in a `#1D1D1D` mount under the drop shadow and clipped by
  its row at 1440 and 768; and the header's avatar is an **arch** in a 3px blush ring. **Every
  card is square** but the map card (6) and its ticker (10). `DashRule` on five sections: the
  repertoire's rows 7, 7 in paper 56% (the letter heads 2px); the map's card, stat cells and
  ticker 7, 7 in terracotta; pricing's row rule, the form's head rule and its underline boxes
  10, 10 in terracotta; the calendar's panel 5, 5 in ink (none at 390), its wizard card, idle
  chips and boxes 10, 10 in ink and its date and package cards 10, 10 in terracotta; and the
  form's step rules 2, 2 in ink. Effects are four backdrop blurs, of which only the bio's glass
  reads, and the print's shadow; every Lime glow is a ring (the sleeve's 5px paper border, tile
  `at`'s 3px paper ring, the gallery thumbs' 4px terracotta ring, 8 on `active` at 1440 and 768).
  Nested nodes read `s.onScheme`: the header's capsule, links, pill and chips `[1]` and its seal
  `[4]`, the bio's and pricing's chips `[1]`, the gallery's square arrow discs `[4]`, the map's
  viewport `[3]`, the calendar's Back pill `[3]` and the testimonials' second cell `[1]`; the
  media head is `SIENNA_MEDIA`. Every display head is fitted to its widest word (`vm.titleWordEms`,
  Noto's 540 ems at designs 2 and 3; the header's name on `vm.cardNameEms`) where the twins'
  `break-word` heads split a long word in Noto, and the repertoire's artist stops at 60% of its
  row where the twins let it take the title's room. Noto's floor is lifted 0.09em on the map's
  numerals and the calendar's stacked display lines, 0.08em on the form's head and ENQUIRE and
  the testimonials' head, and 0.07em on pricing's numeral and the form's labels. Its live
  states: the repertoire's lit rail cell terracotta lettered ink, the map's lit pin the marker's
  ink disc in a paper ring, its 120 mi ring redrawn terracotta at .3 where the frame's ink
  vanishes on the raster, and the refused boxes, which drop their dash — the wizard's for 2px of
  solid terracotta, the form's for a 2px ink underline. As on Grunge's page, the desktop form
  has no instance (the main component `725:3049` is the master), and every form master prints
  "KAI MERCER" where ours keeps the shared "Contact Us". Its header family is
  `'editorial'`: four cards, **all four fitted** — Hero is `HeaderV0`'s Lime block, widened (an ink capsule on
  `s.box3` with the sparkle mark, an arch portrait card, a one-tone title fitted to its column
  in `notoEms`, chips in terracotta and blush), and Feature spread `HeaderV1`'s (an outlined
  terracotta capsule on paper with Grunge's fixed 18 gaps, the arch photograph — its 1440 `CROP`
  a stretch, drawn instead as a cover anchored at `95% 50%` — dashed square face and place
  cards, the Book pill on `s.onScheme[4]`, and `LimePin`'s additive `fill` for the outlined pin
  tile), and Inset Hero `HeaderV2`'s (a square well with one floor fade, ringed in Scheme 1's
  ink; a blush Scheme 5 capsule ringed ink round ink links at Grunge's fixed 18 gaps; a blush
  Book pill on an ink disc; a one-tone paper title over Scheme 1's blush and terracotta chips;
  and an ink arch card in a terracotta ring round an arch portrait), and Stacked `HeaderV3`'s (a
  paper capsule over the ink floor — `NavBar`'s additive `fill`, `s.onScheme[1].bg` — with
  Lime's globe, since `LogoMark`'s sparkle stops at layout 3, and the links at Grunge's fixed 23
  gaps, `navGapEm` 0 at `d >= 1`; the arch avatar; a one-tone paper name fitted to its column;
  the photograph **not** mirrored, Editorial's fill being `FILL`; and Lime's disc seal on
  `s.onScheme[4]`, a terracotta disc with ink marks) — so every card in the setup modal lays out
  a whole Editorial page and the family is closed (`plans/editorial/`). The footer is layout 1's
  on every page, on ink but for layout 3's, which stands on taupe.
