# The designed templates: Retro, Lime, Grunge, Editorial and Pop — working notes

Moved word for word out of `CLAUDE.md`'s *Intentional limits — not bugs* on 2026-09-30, so it
loads only when a session works on it. "Above" and "below" may point into `CLAUDE.md` or
another `notes/` file.

- **Retro, Lime, Grunge, Editorial and Pop are designed at all four layouts**, and every
  header family is closed: no card of any template draws Retro's checker under another
  template's tokens. There is no flat
  template and no flat header family any more (`FlatHeader` and its three layouts went in Pop's
  layout-1 sweep). Retro's decorative language is gated on `s.retro`, and it gets six
  photographic header layouts where every other template gets four. **Lime is designed at all four of
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
  Editorial then, and Pop since its layout-4 sweep folded its pair in; one group flag so no
  block spells a third name — and Editorial's deltas sit behind
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
  Its display and label face is **Gloock 400**, standing in for Fontspring's demo Fisterra Fora
  (`plans/editorial/display-face.md` step 2, user call, 2026-10-05, replacing session 0's Noto
  Serif Display at wdth 62.5): one Google Fonts entry, `family=Gloock`, never a second. Gloock
  has one weight, so every Editorial site sets 400 and none asks for Bold, which Blink would
  synthesise. Its cap is .750 of the em against Fisterra's .725, so `faceK` is 0.967 and
  `faced` / `facedLh` scale every Editorial site that calls them. Its widths are `gloockEms()`
  in `data.js` (`GLOOCK_EM` plus the `GLOOCK_KERN` pairs, since Gloock kerns hard), times
  `faceK`, which is `navFace`'s Editorial arm and every Editorial fit's. Casing `'title'`, each
  display or label string uppercased in its own arm (Grunge's rule). Its decoration: **dashed rules** (`DashRule`, an inline-SVG overlay at the
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
  container, the frame's box a `max-width` over `min-width: min-content`, the ems `navFace`'s (Gloock
  at 400, the frames' Bold set at the Regular; the testimonials' and the footer's sizes are
  `faced`) — `vm.titleWordEms`'s Editorial arm for the form,
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
  form's refused box is a solid 2px paper ring. **Gloock's J descends 0.187em** where the
  frames' face sits on the line, so the calendar's slot marks are lifted 0.05em in their tight
  line box (a `position: relative` nudge that moves no box; Noto's was 0.09) and pinned to
  Gloock's widest mark, `OCT 06` (`u(436)` at 1440, 269 at 768), and the map's clipped venue box
  pads 0.02em under the glyphs and gives it back (Noto's 0.24em J took 0.1). **Layout 3 is a
  paper page between four full-bleed grounds** — the ink header (Scheme 3, its nav Scheme 5), the taupe gallery (2), the terracotta
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
  ring; the form's refused box (above); the footer seal's name (above). Gloock's glyph floor is
  measured per site against the frame's `absoluteRenderBounds` and lifted only where it shows —
  0.055em on the calendar's numeral and month (the J of JUNE), 0.08em on pricing's numeral,
  0.055em on the map panel's title, 0.06em on the form's head and, as baseline-aligned rows
  lifted whole, the form's price row (0.08 × the price) and the testimonials' numeral row
  (0.055 × the numeral). Noto's were 0.09, 0.09, 0.07, 0.08, 0.09 and 0.08
  (`plans/editorial/display-face.md` step 4, layout 3's table). The bio's ID-card name is
  fitted to its widest word (`cardNameEms`, HeaderV2's rule), since Gloock's MERCER outran
  the 1440 cap. **Layout 4 is ink, taupe,
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
  `navFace`'s Gloock ems; the header's name on `vm.cardNameEms`) where the twins' `break-word`
  heads would split a long word, and the repertoire's artist stops at 60% of its row where the
  twins let it take the title's room. Gloock's floor is lifted 0.07em on the map's numerals,
  0.055em on the calendar's stacked display lines, the form's head and ENQUIRE and the
  testimonials' head, 0.06em on the form's labels and 0.045em on pricing's numeral (Noto's were
  0.09, 0.09, 0.08, 0.08, 0.07 and 0.07; `plans/editorial/display-face.md` step 4, layout 4's
  table). The repertoire's clipped title pads 0.02em under its J (Noto's 0.1) and the artist
  pads none. Pricing's plan names and numerals are `faced`, as the frame states Fisterra there. Its live
  states: the repertoire's lit rail cell terracotta lettered ink, the map's lit pin the marker's
  ink disc in a paper ring, its 120 mi ring redrawn terracotta at .3 where the frame's ink
  vanishes on the raster, and the refused boxes, which drop their dash — the wizard's for 2px of
  solid terracotta, the form's for a 2px ink underline. As on Grunge's page, the desktop form
  has no instance (the main component `725:3049` is the master), and every form master prints
  "KAI MERCER" where ours keeps the shared "Contact Us". Its header family is
  `'editorial'`: four cards, **all four fitted** — Hero is `HeaderV0`'s Lime block, widened (an ink capsule on
  `s.box3` with the sparkle mark, an arch portrait card, a one-tone title fitted to its column
  in Gloock's ems (`navFace`), chips in terracotta and blush), and Feature spread `HeaderV1`'s (an outlined
  terracotta capsule on paper with Grunge's fixed 18 gaps, the arch photograph — its 1440 `CROP`
  a stretch, drawn instead as a cover anchored at `95% 50%` — dashed square face and place
  cards, the Book pill on `s.onScheme[4]`, `LimePin`'s additive `fill` for the outlined pin
  tile, and a one-tone title fitted to its column's widest word in Gloock's ems, `vm.cardNameEms`,
  at every width — JP-092, user call, 2026-10-01, which fits Lime's and Grunge's titles in the
  same block the same way, each in its own face's ems), and Inset Hero `HeaderV2`'s (a square well with one floor fade, ringed in Scheme 1's
  ink; a blush Scheme 5 capsule ringed ink round ink links at Grunge's fixed 18 gaps; a blush
  Book pill on an ink disc; a one-tone paper title over Scheme 1's blush and terracotta chips,
  fitted to its column's widest word, `vm.cardNameEms`, at every width — JP-102, user call,
  2026-10-06, JP-092's shape, which fits Lime's and Grunge's titles in the same block;
  and an ink arch card in a terracotta ring round an arch portrait), and Stacked `HeaderV3`'s (a
  paper capsule over the ink floor — `NavBar`'s additive `fill`, `s.onScheme[1].bg` — with
  Lime's globe, since `LogoMark`'s sparkle stops at layout 3, and the links at Grunge's fixed 23
  gaps, `navGapEm` 0 at `d >= 1`; the arch avatar; a one-tone paper name fitted to its column's
  widest word, and at 768 boxed and its whole line fitted to the room beside the seal, held at
  0.6 of the ramp — JP-109, user call, 2026-10-06, which fits Lime's and Grunge's names in the
  same block, each in its own face's ems;
  the photograph **not** mirrored, Editorial's fill being `FILL`; and Lime's disc seal on
  `s.onScheme[4]`, a terracotta disc with ink marks) — so every card in the setup modal lays out
  a whole Editorial page and the family is closed (`plans/editorial/`). The footer is layout 1's
  on every page, on ink but for layout 3's, which stands on taupe.
  **Pop is designed at all four of its layouts** (`plans/pop/layout-1.md` … `layout-4.md`; the
  Figma mode is called *Pop*, and its frames' mock artist is Kai Mercer). Its layout-1 page is
  the fifth variant of the same eleven component sets — Lime's layout-1 tree in ten sections
  and **Retro's** *Floating cards stack* in the media player — and its layout-2, -3 and -4 pages
  are Lime's trees in all ten, so it has no blocks of its own either. Each Lime block was widened
  per site, as its session fitted it, to the pair `(s.limeTree || s.pop)` with Pop's deltas
  behind **`s.pop`** (a `const pop` and arms, or a fourth arm at the head of the block's `G`),
  and once the family closed the pairs folded into **`s.limeTree`**, which now names all four
  designed templates (`limeTreeTheme()` with it; `plans/pop/layout-4.md`, decision 2). Retro's
  own `v0` media body is dressed behind `pop`, so Lime's layout-1 media block is the one that
  steps Pop out (`s.v0 && s.limeTree && !s.pop`) and Pop falls through it to Retro's. The shared
  helpers a Pop site calls take the same flag at every layout — `labelStyle`'s tracking,
  `LogoMark`'s globe, `BookPill`'s Lime branch, `TagChips`' padding, `NavBar` and `HeaderV0`'s
  `lime`, `Pager`'s Lime branch; three keep Pop's own arm first, and must: `SealBadge`'s
  smiley-globe ahead of the Lime disc (stepping aside at `scheme` 4 and 5), `Photo`'s backdrop
  and the layout-3 gallery tile's ink. **The layout-1 frames are not a variable mode
  outside the header**: ten of the eleven variants carry raw hexes and sizes, and the desktop page and
  several narrow masters are in Lime's mode, so a styled node renders Bebas Neue at Lime's
  size there — a mode leak, drawn in Pop's own ramp. Every other raw hex is followed as a named
  literal (the `POP_*` tables), Lime's and Retro's leaked hexes included; two leaks that read as
  defects are overridden (the gallery's invisible eyebrow, its counter chip) and three leaked
  faces are set in Pop's own (Anton pager numerals in the label face, Roboto Mono clocks in
  `s.body`, the 390 pill's Soulway in the display face). Its display and label face is **Titan
  One standing in for Chunko Bold Demo** (a demo licence; user call, 2026-10-02) at **`faceK`
  0.98**, so `faced()` / `facedLh()` are not the identity under Pop, layouts 2–4 included;
  Titan has one weight, so a Pop display string never takes a `fontWeight`. Its nav advance
  table is `titanEms()` (`TITAN_EM`, read off the DOM) × 0.98, and Titan sets its glyphs
  0.11–0.14em lower than Chunko in the same line box, so each display head is lifted per site
  (`top: -0.14em` at lh 0.75–0.89, 0.13 at ~0.83, 0.12 at 0.906, 0.11 on the calendar's month).
  Casing is `'title'`, each display or label string uppercased in its own arm. **Its schemes
  are inferred, not bound** (the per-section scheme rule above): `THEMES[4].schemes` carries 2,
  3, 4, 6 and 7, `SCHEMES_OF.Pop[0]` seats the repertoire on 6 (violet), the calendar on 4
  (blue), the testimonials on 2 (lime) and the footer on 3 (pink) — every page, since it has no
  page row — and the nested cards read `s.onScheme[n]`: the header's capsule `[3]`, the media's
  card and player `[3]` / `[6]` (its track cards on `[1]`'s seven tags), the gallery's panel
  `[2]`, the map's tile and gig panel `[6]` / `[7]`, pricing's three cards `[6]` / `[2]` / `[3]`,
  the form's shell and half `[6]` / `[3]`, the testimonials' card `[6]`. Two of Scheme 1's
  facts turn the twins' round: **`text3` is the frames' second ink** (black on white, white on
  the dark grounds), a `sem` and vm key of Pop's alone, where `s.tx` is violet; and the active
  pair is **black** under white, so `pillBg` is black and a Pop arm never takes it for the
  accent. Its decoration: **no seams** — where a ground changes it is a **10px inside rule** on
  one side of a section's root (the header's foot lime, the repertoire's top lime, pricing's
  blue, the calendar's pink, the testimonials' violet); **stickers** — the smiley-globe seal
  (`SealBadge`'s Pop arm, spinning, in the header, the form and the footer), the smiley sun
  (`PopSun`, the bio and the footer), the gallery's asterisk, the repertoire's lightning and
  heart, pricing's starburst and rings, the calendar's sparkle; **scribbles** (the header, the
  bio's stadium stroke, the map, the form) and **squiggle arrows** (the media, the calendar),
  each transcribed off its node's `fillGeometry`; **dot grids** (`PopDots`: the bio, the media
  card, the calendar); **leant cards** (the media's ±1°, pricing's three at Retro's `TILT`
  angles, the testimonials' backs as turned insets off the card); real drop shadows where the
  node's `effects` carry them (the bio photograph, the testimonials, the gallery's card); and
  no texture. Pricing's root clips sideways and the footer's both ways (`popClip`,
  `popFootClip`), so the leant deck and the 390 corner sun never scroll the page; `popClip`
  reaches layout 2's header too, whose 768 sun runs 15 past the page. **Four strings
  are fitted to their room** in `titanEms` × 0.98, where Titan sets wider than Chunko: the three
  hand-scaled statements by their widest word — the form's (`vm.titleWordEms`' Pop arm), the
  testimonials' quote (`vm.quotes[].wordEms`), the footer's (`vm.footerWordEms`) — and the
  calendar's 390 month by its whole label (`vm.calMonths[].ems`). **Its live states
  are redrawn where its frames draw none** (Lime's rule): the map's lit row and pin on Scheme 7's
  own active pair, the form's refused box a 2px white ring on the pink half; and where they draw
  one it is followed — the repertoire's pager marks its page pink, the calendar's booked day is
  the frame's .38 with no strike, and its foot is JP-088's line-as-link, no pill. The media
  keeps Retro's Soundcloud seat. Its photographs are its own (`SEEDS.Pop`, eight `pop-*.jpg`;
  the gallery strip seeds seven distinct pictures where the frame borrows Retro's), and
  `Photo`'s empty backdrop is `s.tx`, the violet the hero's frame stands under its
  photograph (`s.box2` at layout 3, `s.box3` at layout 4). Its header family is `'pop'`: four
  cards, **all four fitted** — Hero is `HeaderV0`'s Lime
  block widened: a glass capsule on Scheme 3 (`#FFFFFF` at 12% under a blur drawn on a layer of
  its own, never on the bar, so NavMenu's fixed panel is not trapped in it), a circle portrait
  in a pink ring, the location and kicker at Label/SM, a one-tone white title fitted to its
  column, a lime scribble under it, the smiley-globe seal and the 10px foot rule — and Feature
  spread, Inset Hero and Stacked are `HeaderV1`'s, `HeaderV2`'s and `HeaderV3`'s (below), so
  every card in the setup modal lays out a whole Pop page and the family is closed
  (`plans/pop/`). The footer is layout 1's on every page, on pink.
  **Layout 2 is a white page of rings, and it is bound** (`plans/pop/layout-2.md`): every
  variant but the footer binds its colours and type to the *Pop* mode, so its seats are read off
  `explicitVariableModes` and a raw hex is a leak, judged per site (the repertoire pager's Lime
  and Retro hexes followed through layout 1's `POP_REP`; the 390 header pill's Anton set in
  Titan). Every section is Lime's layout-2 tree node for node, its block widened per site (the
  pair, folded since) — the gallery, which has no block, site by site — with Pop's deltas
  behind `pop` or a fourth arm on `G`. **Body copy binds `sem/text/2`**, so it is `s.tx`
  (violet) here, layout 1's `text3` reflex turned round. The page is Scheme 1 white with media
  and the calendar lime Scheme 2 cards on it (the root's `cardOnPage` painting `vm.pageBg`
  round them), the repertoire a grey `box/1` sheet ringed 1px pink, the form a full-bleed blue
  Scheme 4 band, and the footer layout 1's pink. Nested nodes read `s.onScheme` (the scheme
  rule, listed there): the header's Book pill moves from Scheme 3 to 4 at 390
  (`s.onScheme[s.mob ? 4 : 3]`), each of the media fan's five cards and the list's five pill
  rows stands on its own scheme (Schemes 5 and 8 seat only these), and the form's sidebar and the
  testimonials' big card, both Scheme 2, bind `box/1` `#D7FF23` where the scheme's ground is
  `#C6F200`. Every edge is a **solid inside ring** — 8px (the header's photograph), 5 (the
  gallery), 4 (the bio card, the plan card, the media's rows and discs, the form's photograph),
  3 (the testimonials), 2 (the header's cards), 1 (chips, capsules, sheets, rows) — with no
  dash, no glow and no 10px rule: the media `Section`'s 5px lime top and foot at 1440 is the
  page's one band rule (`popMediaRule`, on the root beside `grungeRule` and `editorialRule`),
  and pricing's narrow roots are ringed 1px pink. The header carries layout 1's stickers alone —
  `PopDots` (an additive `xs` / `vw` for its uneven columns) and `PopSun` — round an oval
  photograph in an 8px lime ring, with pill-tall face and place cards (`LimePin`'s additive
  `ink` and `glyph`). Pricing's coral plan card leans 3° (1° at 390) inside a slot wrapper that
  gives back `w·sin θ / 2`, Figma's rotated-box spacing, and needs no clip. Effects are the
  frames' own: the hard offset `Retro/Poster` blocks under the nav's, the bio's and the
  calendar's pills (through the caller's `style`) and the bio photograph's soft shadow. Titan is
  lifted 0.14em at every display head (0.13 on the media's); the calendar's slot pin is
  re-measured in Titan (317 / 198 on the 1440 / 768 frames) and its marks are a four-colour row
  palette, teal, violet, pink and pink. **Its live states**: the repertoire's pager marks its
  page pink, the frame's own, and the map's pager, which no Pop map master draws, wears the
  repertoire's dress; the gallery's pick ring is re-inked lime against the pink tile edge;
  pricing's picked chip is the frame's yellow fill under its tag's black label (user call,
  2026-10-05); the form's refused box is 2px of the card's pink; and the testimonials' picked
  tile is Scheme 3 pink rather than the card's fill. The header defaults to Minimal at this
  layout, and `vm.navFits` takes the Grunge / Editorial arm against the frame's 656 bar
  (`notes/nav.md`).
  **Layout 3 is layout 2's bound page again, on Lime's layout-3 tree** (`plans/pop/layout-3.md`):
  every variant but the footer binds the *Pop* mode, and its one raw paint, the bio's teal
  sparkle, is Scheme 1's `tag4` to the byte (`s.chips[3].bg`). Every section is Lime's layout-3
  tree node for node but the bio, its block widened per site (the pair, folded since) — the
  gallery, which has no block, at eleven sites — with Pop's deltas behind `pop` or a fourth arm on
  `G`. The page is Scheme 1 white broken by the header's **violet card**, a full-bleed **lime
  gallery sheet** (Scheme 2) and a **blue map band** (4), then layout 1's pink footer, every band
  meeting the next on a straight edge — no seam, no rule between bands, no effect on any node.
  The header is seated on 6 at every width, since its card is Scheme 6 at all three while the
  frame round it is white at 1440 and the card's own violet narrow, so the root paints
  `vm.pageBg` round it at desktop alone (`cardOnPage`); the calendar is layout 2's lime Scheme 2
  card again, in the composed column. Inset Hero is `HeaderV2`'s block widened: a violet well
  under one `box/3` floor fade in a lime ring, a violet capsule ringed pink round lime links, a
  violet Book pill on the violet card, white name and Listen (`s.text3`), a one-tone lime title
  fitted to its column (`vm.cardNameEms`, JP-102's rule) over a white location and Scheme 1's six
  chips, and a lime card ringed pink round a portrait **centred** in it, as every twin's frame
  draws it and only Pop's block does. Cards and cells stand on seven schemes and read
  `s.onScheme` (the scheme rule, listed there): the audio card, the repertoire's lime, pink and
  blue sets, pricing's featured row, the map's panel with its viewport inheriting Scheme 3, the
  form's card, and the testimonials' five quote cells on five schemes beside a Scheme 3 stat card.
  Three Scheme 2 cards split as layout 2's did: the form's card and the testimonials' lime cell
  bind `box/1` `#D7FF23`, pricing's featured row `sem/bg` `#C6F200`. The bio trades Lime's seal
  for **Pop's smiley-globe seal on Scheme 4** (`SealBadge`'s Pop arm on `s.onScheme[4]`, at the
  photograph's corner, the 768 master's off-card x not followed), the calendar's sparkle
  (`POP_SPARKLE_D`, drawn behind the card's copy at 390) and the hero's scribble at 0.3455 under
  the name, and closes its card on a 5px pink bar where the twins rule a hairline. Every edge is
  a **solid inside ring** — 8 / 8 / 2 (the header's photograph), 5 (the gallery's tiles, lime on
  the lime sheet, so the photograph is clipped 2px inside it or its anti-aliased corner shows), 4
  (the header's card and portrait, the media's rows and discs, the repertoire's sets, the
  calendar's card), 2 (the map's date discs and lit row, the calendar's free dots), 1 (the rest).
  The media list is layout 2's five pills, each pinned at its master's division (116.8 / 110.8),
  so one track is never a list-tall stadium. Titan is lifted per site: 0.14em on
  every head at lh 0.89 and 1 and on the calendar's numeral and month, pricing's numeral and the
  testimonials' numeral row; 0.1 at Display/Title (the header card's name, *BOOK ME*, *PRICING*,
  the map's two heads) and on the form's price row; 0.12 on the testimonials' quotes and marks;
  0.08 on the map's venues and the testimonials' names. **Its live states**: the gallery viewer
  black at .94 under pink controls (`notes/gallery.md`); pricing's FEATURED seat, the frame's
  lime row wherever the filter stands it; the map's lit row the frame's own Scheme 3 pill, lime
  under pink type in a violet ring with its date disc turned pink, its lit pin that row's pair, its
  lit chip the band's teal, its 390 pager arrows unfilled (`Pager`'s `endBox`); the form's refused
  box 2px of the card's pink. The header defaults to Minimal here too, and `vm.navFits` takes the
  Grunge / Editorial arm against layout 3's 684 (`notes/nav.md`).
  **Layout 4 is pink, lime, pink, white and blue on straight edges, with layout 1's 10px rules
  back** (`plans/pop/layout-4.md`): bound again, every variant but the footer, and Lime's layout-4
  tree node for node in six sections, with Pop's stickers in the other four. The header's
  photograph fades from `sem/box/3` to pink over the pink bio (Scheme 3), then the lime media
  band (2), the gallery and the repertoire on one pink ground (3), the map, pricing, calendar
  and form on the white page, and a blue testimonials sheet (4) — `SCHEMES_OF.Pop[3]`,
  Editorial's row in shape. The root paints every seat, so each block's ground reads the seat's
  `s.bg` (Editorial's trap 1) and the testimonials paint no sheet. No seam: where a band ends at
  1440 and 768 a **10px inside rule** stands at its own foot — the bio's teal (`POP_MEDIA`), the
  media's and the repertoire's violet, the testimonials' teal — and none at 390; the media meets
  the gallery lime into pink under its violet rule, where the frames stand the video between.
  **Stickers on four sections, each layout 1's drawing at another scale**: the bio's lime dot
  grid (`PopDots` × 1.4376, 0.805 at 390), the media's pink one (× 0.517, none at 390, where the
  master's two are covered), the gallery's smiley sun and teal asterisk, the repertoire's violet
  starburst (`POP_STAR_D` verbatim); the sun and the starburst stand behind the uppercased heads
  that reach them. **Every card is Lime's rounded shape in a solid inside ring** — 5 (the media
  sleeve, the gallery spotlight), 4 (the gallery's idle thumbs, the map's card, cells and ticker,
  the wizard card, its idle chips and date box), 8 (the active thumb), 3.04 (the header's
  stadium avatar), 2 (the map's pin), 1 (the rest) — no dash, no tilt, no tape, no mount; the
  photographs inside a ring of another colour are clipped 2px inside it (the spotlight, the
  thumbs, the map raster on its outer sides). Effects are four backdrop blurs, of which only the
  bio's glass reads. Stacked is `HeaderV3`'s Lime block: a white capsule on `s.onScheme[1]` with
  Lime's globe stroked 4 and a black Book pill round a pink arrow, a lime-ringed stadium avatar
  (its own seed, `SEEDS.Pop.avatars[3]`), a white one-tone name (`s.text3`) fitted as JP-109's,
  the seat's six chips, and **Lime's disc seal** — `SealBadge`'s Pop arm steps aside at `scheme` 4
  and 5 — blue with teal marks at 1440 and 768 (`[4]`) and teal with violet at 390 (`[5]`).
  Nested nodes read `s.onScheme` (the scheme rule, listed there): the bio's card is Scheme 2 at
  1440 and 768 and the seat's own at 390 (one alias, `card`); the map's four stat cells stand on
  four schemes, its ticker on 5, its viewport on 3; the calendar's Back on 3 and Send Enquiry on
  2; the testimonials' four cells on four seats (blue, black, pink, teal). Every display head is
  fitted to its widest word in Titan's ems, and the repertoire's artist stops at 60% of its row,
  Editorial's cap. Titan is lifted by token: 0.14em on every head and on pricing's and the map's
  numerals, 0.1 at Display/Title (the kicker, the now-playing slot, the repertoire's rows as one,
  the wizard's stacked lines, ENQUIRE), 0.12 on the testimonials' marks, 0.08 on Display/List
  over a line. **Its live states**: the repertoire's lit rail cell lime lettered pink; the media
  grid marks no tile (the frame's, a user call); the map's lit pin the marker's own pair and its
  ticker's arrows violet where the frame's yellow vanishes on teal (a user call); the wizard's
  refused box 4px of violet at the idle ring's own weight, and the form's Lime's 2px of violet
  against its 1px lime ring. The desktop form is an instance at last (`964:73243`), and it prints
  "CONTACT US" where the narrow masters print "KAI MERCER"; ours keeps "Contact Us".
- **The bio's layout-1 reference line is the artist's** (JP-090, user call, 2026-09-30; the bio
  has no notes file of its own). `FIELDS.bio.refLabel`, *Reference line*, `in: [0]`, is seeded
  with the whole `[ 001 ] Structure · Bio_01` that every template's frame types under the
  heading (Editorial's `964:58613`, Retro's `964:58577`), brackets and index included, since the
  `001` is an index and not a count. `vm.bioRef`, uncased: all three bodies upper-case it in CSS
  (the widened block's eyebrow for Grunge and Editorial and its Space Mono line for Pop, Body/SM
  for Lime, and Retro's flank `label()`). Emptied, an empty `<span>` keeps the desktop heading column's three
  rows, so the heading does not slide to the foot of its `space-between` column (it moves by
  half the line). The narrow columns are gapped instead, so there the seat would be a dead band
  of the gap and the line simply goes (Retro's 768 is ungapped and keeps it). A typed line wraps,
  inside a word too, where the seed's `nowrap` let an 85-character line run 200px past a 390 page.
