# Editorial layout 3 — section-by-section plan

This is the working checklist for bringing **layout 3** of the Editorial template up to its Figma
designs, the way [`../lime/layout-3.md`](../lime/layout-3.md) did for Lime and
[`../grunge/layout-3.md`](../grunge/layout-3.md) for Grunge. It runs one unit per session, all three
widths together, clearing context between units. Layouts 1 (`s.v0`) and 2 (`s.v1`) under
`s.editorial` are fitted and merged; nothing here should move either.

**This plan is Grunge layout 3 again, with Editorial layouts 1 and 2's idiom.** It does not repeat
any of them: the composed page, the wrapper insets, the procedure, the harness, the digest and the
verification are Lime's and Grunge's layout-3 ones, verbatim, with `theme=2` read as `theme=3`. The
gates (`s.limeTree`, `s.editorial`), route A's scheme resolution, `vm.onScheme`, `DashRule`,
`Tape`, `notoEms` and the uppercase-per-site rule are [`layout-1.md`](./layout-1.md)'s and
[`layout-2.md`](./layout-2.md)'s, and they carry over whole. What is written here is only what
differs — and what differs most is that **Lime's and Grunge's layout-3 pages are dark with one or
two sheets, and this one is paper with an ink header, a taupe gallery, a terracotta map and a
taupe footer**, and five of its sections stand a card or a node on another scheme.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then
- the whole *Conventions* of [`layout-2.md`](./layout-2.md) and its *Settled in session 0* — the
  per-width seat, the card on the page and `vm.onScheme`, which this page leans on hardest — and
  the whole *Conventions* of [`layout-1.md`](./layout-1.md), the foundation (`s.limeTree` /
  `s.editorial`, `SIENNA_MEDIA`, `DashRule`, `Tape`, `GrungeStar`'s `fill`, `notoEms`, route A,
  the fitted-statement recipe)
- [`../CONVENTIONS.md`](../CONVENTIONS.md), groups **A, B, C and D3**, and the bullets they point at
- the section's *Settled in section N* bullets in **both** [`../lime/layout-3.md`](../lime/layout-3.md)
  and [`../grunge/layout-3.md`](../grunge/layout-3.md) — the block you are widening, and the one
  widening of it already done — and the section's entries in
  [`../lime/layout-3-qa-fixes.md`](../lime/layout-3-qa-fixes.md) and
  [`../lime/retest-qa-fixes.md`](../lime/retest-qa-fixes.md) (JP-043 the sticky column, JP-044 the
  768 repertoire row, JP-045 Tickets →, JP-046 the offer line, JP-048 the Featured tick), and
  JP-039 in [`../lime/layout-2-qa-fixes.md`](../lime/layout-2-qa-fixes.md) for the header, which
  moved those blocks after they were fitted
- the *Conventions* **and the 2026-09-15 Addendum** of [`../retro/layout-3.md`](../retro/layout-3.md),
  which built every `s.v2` branch; the Addendum is what the branches actually are now
- the *Per-session procedure* of [`../lime/layout-3.md`](../lime/layout-3.md)

Then the memory notes `figma-frame-reading`, `verifying-the-published-tab` and
`browser-tool-choice`. `SPEC.md` lives in git history: `git show 8fa8ff4:SPEC.md`.

Branch: **`editorial-layout-3`, forked from `main`** (`ae0a6a2`, the merge of `editorial-layout-2`,
PR #36). The planning session created it and committed this plan and its `plans/README.md` row
there; session 0 starts on it.

## What the pass must deliver

1. **Every layout-3 section works in the published tab under Editorial**: every `s.v2` control
   CLAUDE.md lists under *`s.live` is false everywhere except the published tab* — including the
   **controls the frames do not draw** (the gallery's fullscreen viewer, the repertoire's *View
   full set* reveal, the map's city chips, zoom and *See all gigs*, the pricing stack's moving
   FEATURED seat). Each session drives them at `theme=3&live=1` and checks their overlay, scrim,
   lit and idle states read on this page's grounds: **terracotta on terracotta and ink on ink are
   this template's risks** — the map's lit row stands on a terracotta band, the pricing stack's
   featured row and the map panel are ink, and the repertoire's and testimonials' cards run
   terracotta, taupe and ink side by side.
2. **Every layout-3 section looks as close to its Figma frame as possible**, at 1440 (× 0.82 onto
   the 1180 canvas), 768 and 390 — and, for the three composed sections, at the column widths
   `pageRows` gives them (709 : 334.5 on the 1180 canvas and 864.8 : 408.2 in the published 1440
   tab — section 2; the 684 / 323 first written here predate JP-038's `padX`).
3. **The setup modal's card 3, "Inset Hero", lays out a fitted page.** `pickHeader` writes arch 2
   to every section and reorders the page into `PAGE_ORDERS[2]`, so this pass turns card 3 from
   its placeholder (layout 1, open question 4: Retro's `HeaderV2` in Scheme 1 tokens, the checker
   ribbon, `mustard` standing in as `s.box3`) into Editorial's own page. The header session
   verifies it **in the builder**, and the bio session verifies the composed row under Editorial
   at desktop, canvas and published tab both.
4. **The sidebar's layout-picker thumbnails for layout 3** under Editorial look like their
   sections. They render `sectionVm` at `SIZES.desktop`, so they follow the desktop fit for free;
   check them once, in the sweep.

## What this pass actually is

**Editorial's layout-3 page is Lime's layout-3 page in a fourth variable mode**, as its layout-1
and layout-2 pages were — with one section, the bio, that trades the seal for layout 1's tape and
sparkle. The evidence, read at planning time (2026-09-25) with one `use_figma` walk per page frame
(main component, `resolvedVariableModes`, every nested `explicitVariableModes`, effects,
`dashPattern`s with per-side weights and bound names, rotations, image hashes and `scaleMode`s,
text faces and sizes) and the longest common subsequence of every visible node's
`(depth, type, name)` against the twins' instances, **by traversal order**:

| Section | Editorial nodes (1440) | LCS with Retro / Lime / Grunge (1440) | 768 / 390 against Lime · Grunge | What only Editorial draws |
|---|---|---|---|---|
| header | 44 | 39 / **41 / 41** | 41 · 41 / **41 · 39** | the mock name ×3; Grunge's one extra node is its grain rect. **At 390 the tree is Lime's, not Grunge's** (Grunge's 390 has the nav's two spacer cells fewer) |
| bio | 28 (768 28, 390 27) | 23 / 23 / 24 | 23 · 24 / 23 · 23 | **the seal is gone** (Lime's `Frame 248`, Grunge's `Frame 178`); in its place **layout 1's tape** (`Frame 210` with its grain `image 1`) and **a sparkle** (`Vector` 108 × 109); and the second photo frame Grunge also has (a `CROP` over the well's covered leak, below). See *The bio* |
| media card (`Audio Player — H · Bar-meter`) | 72 | **72 / 72 / 72** | 72 · 72 / 72 · 72 | — |
| media list | 41 | **41 / 41 / 41** | the same | — |
| repertoire | 57 (390 63) | **57 / 57 / 57** | 57 · 57 / 63 · 63 | — |
| calendar (the instance) | 65 | **65 / 65 / 65** | the same | — |
| gallery | 17 | **17 / 17 / 17** | the same | — |
| pricing | 115 | **115 / 115 / 115** | the same | — |
| map | 141 (768 142, 390 83) | 140 / **141 / 141** | 141 · 142 / 83 · 83 | — (`Frame 304` at 768 is the twins' rename) |
| form | 27 | **27 / 27 / 27** | the same | — |
| testimonials | 44 | 43 / **43 / 43** | 43 · 43 / 43 · 43 | the stat numeral's node name ("5.9") |
| footer | 35 | — / 29 / 29 | — | **layout 1's footer** — on another scheme (below) |

- Every instance is the **`Theme=Editorial` variant** of the set the twins instantiate
  (`Headers — D · Inset Hero — Desktop / Theme=Editorial` `624:5273`, the bio's `675:1734`, the
  repertoire's `745:2187`, the gallery's `710:2496`, pricing's `718:2878`, the map's `731:3010`,
  the form's `725:3242`, the testimonials' `753:2176`, the calendar's `722:2320`, the audio card's
  `697:2289`, the list's `690:3745`), and carries `1 · Primitives` → **Sienna Vale**. Ids differ
  per variant, so diff **by traversal order** (layout 1, *What this pass actually is*).
- **No Device override on any instance**, at any width: every root resolves the page's own
  Desktop / Tablet / Mobile. Each session re-checks its own three.
- **No effect on any master** — not one `DROP_SHADOW`, `INNER_SHADOW` or blur on the 36 masters,
  the footer's included. Layout 1's drop-shadowed prints and layout 2's paper 5 / 5 pill blocks have
  no seat here; the twins' glows (Lime) and rings (Grunge) are replaced by dashed rules or nothing.
- **No seams.** Every band meets its neighbour on a straight edge at all three widths. The
  `Vector 2` (1437.8 × 44.2) inside the media Section at x 1147.9 is on Lime's and Grunge's pages
  too, off the page and black on paper; not drawn, and not to be chased (Grunge's note).
- **The footer is layout 1's tree** — `446:8698` at 1440 (layout 2's desktop footer, identical to
  layout 1's node for node) and layout 1's own `907:12166` / `907:12467` narrow — **but it stands
  on Scheme 2 (taupe) at all three widths**, where layout 1's and layout 2's frames stand it on
  Scheme 3 (ink). `SCHEMES_OF` is keyed by the section's own design and the footer has one, so
  today it reads `SCHEMES_OF.Editorial[0].footer` (3) on every page. Layout 1's session 0 foresaw
  exactly this: *a later pass that finds the footer on another scheme at layouts 2–4 keys it on
  `page` instead (`footerBand`'s precedent)*. Decision 1(c).
- **No video frame and no tags section**: the page carries neither as a top-level child. The
  `Tags — Frame` instance under the bio card is drawn by the bio block's Genres row, as under the
  twins.

So, as under Grunge's layout 3 and Editorial's layout 2: **no Editorial-only branches and no
Editorial-only ternary trees.** The work is Editorial deltas inside **Lime's layout-3 blocks**,
each widened from `(s.lime || s.grunge)` to `s.limeTree` with `const ed = s.editorial` naming the
deltas — or a third arm at the head of the block's `G`, whose Lime and Grunge arms stay
byte-identical. **Themes 1 and 2 are the digests at risk**: every widened block is one Lime *and*
Grunge render.

**Where each Lime block sits decides how it widens** — Grunge's placements (its sections table),
re-found at planning time by walking each `(s.lime || s.grunge)` gate to its enclosing branch:

- `if (s.lime || s.grunge) { … return }` **at the head of `HeaderV2`**. Widening it makes Retro's
  half unreachable under Editorial, so layout 1's placeholder arm in that half (`const mustard =
  s.editorial ? s.box3 : s.pillBg`) becomes dead code and is **deleted**; the theme-0 digest
  proves nothing moved. (`HeaderV3`'s Retro half never had one — layout 2's sweep.)
- `if (s.v2 && (s.lime || s.grunge))` **ahead of `Bio`'s `if (s.v2)`** — the bio, which has no
  state.
- `if (s.lime || s.grunge)` **inside `if (s.v2)`, after the seam** — media (after `nHot`),
  repertoire (after `arrow`), calendar (after `line`), pricing (after `shown`), map (after
  `litRow`), form (after `up`), testimonials (after `template`).
- **No block** — the gallery: `const grunge = s.grunge` and eleven `(s.lime || grunge)` ternaries
  through `Gallery`'s `if (s.v2)`. It widens ternary by ternary, from the frame.
- **The footer has no layout-3 block to widen**: it is layout 1's `Footer` block, already
  `s.limeTree`; what moves is its seat (decision 1(c)) and whatever of its leaves the seat does not
  carry (section 11).

**Inheritance** ([`../CONVENTIONS.md`](../CONVENTIONS.md)): **A** and **B** always; **C**, since
this is another variable mode of a page already fitted; **D3**, since its blocks are Lime's
layout-3 blocks, widened as Grunge widened them. Not D1 or D2: the shared helpers layout 1 widened
(`BookPill`, `Pager`, `TagChips`, `labelStyle`, `NavBar`, `SealBadge`, `DashRule`, `Tape`) already
switch on under Editorial's layout-3 branches; what they draw here is each session's to check. Keep
the running *Inherited and used* list below; the sweep folds it into that file as a *Leaned on in
Editorial (layout 3)* column, and gives D3 an Editorial column.

### The composed page is already Editorial's

Layout 3's 1440 page stands the bio and the media player in a left column and the booking calendar
in a right one. **Editorial's `Frame 299` (`964:68719`, 1440 × 2415) is Grunge's `964:68687`
(1440 × 2398) inset for inset**, read at planning time frame by frame:

| Frame | Editorial | Grunge | |
|---|---|---|---|
| `Frame 299` | H, padding 0 / 56 / 56 / 56, gap 45 | the same | 2415 against 2398 |
| `left column` | 878 at x 56, V, padding 50 / 10 / 10 / 10, gap 80 | the same | |
| bio `Section` | 858 × 1227 at (10, 50), gap 30: head `Frame` 160, **`Frame 302`** 932 (V, **padding-top 50**, holding the instance at y 50), Tags at 1152 | 858 × 1188: head 171, the instance directly at 201, Tags at 1113 | **`Frame 302` is new** |
| media `Section` | 858 × 992 at y 1357, gap 30: head 265, `Frame 301` at 295 | 858 × 1014 at y 1318: head 287, `Frame 301` at 317 | the heads are the type |
| `Frame 300` | 405 at x 979, V, padding 50 / 0 / 56 / 0, gap 30; "Book Me" 123 × 35 at y 50, the instance at 115 | the same frame; "Book Me" 92 × 40, the instance at 120 | |

The narrow wrappers are Grunge's too: at 768 the `left column` (`984:16813`, padding 50 / 10, gap
80) holds the bio `Section` (`984:16814`, 30 · 50, 708 wide: head 113, the instance at 143 — **no
`Frame 302`**) and the media `Section` (`984:16822`) whose `Frame 301` (`984:16829`) holds the
audio card, the list **and the repertoire** (`984:16832`); the calendar's `Frame 300`
(`984:16833`) stands "Book Me" at 30 · 50 and the instance at 30 · 108. At 390 the `left column`
(`984:16844`) holds the bio `Section` (`984:16845`, 10 · 50: head 88, the instance at 118) and the
media `Section` (`984:16853`); the repertoire (`984:16863`) is a top-level child; `Frame 300`
(`984:16864`) stands "Book Me" at 10 · 40 and the instance at 10 · 95.

So **the row already composes under Editorial — expect no change to `pageRows`, `arrangeRows` or
`COLUMN_SPLIT`** (they key on `designCount` with no template gate), and `preview.jsx`'s
`&column=left|right` is Lime's and stays. **Every instance root pads exactly as Grunge's does** at
all three widths (read at planning time: header 20 / 10 / 10, repertoire 56 · 60 / 0 · 60 / 0,
gallery 56 · 60 / 30 · 60 / 20, pricing 56 / 56 / 32 / 56 · 30 / 30 / 32 / 30 · 60 / 20, map
56 · 56 / 30 · 60 / 10, form 0 · 0 · 60 / 0, testimonials 56 · 30 / 30 / 56 / 30 · 30 / 10 / 60 /
10), so **the `vm.pad` arms at `d === 2` whose numbers are those wrappers' or roots' should take
Editorial on Grunge's numbers** — the composed row's (the wrappers walked above), pricing's foot 32
and the testimonials' 56 / 30 / 56 (the roots') — each in its own session, the digest rule, which
parts the composed heads for a while as it did under Grunge (its *Conventions*: the bio joins, then
media, then the calendar closes the row). **The form's 90 / 60 foot is an inner inset, not the
root's** (the form root pads 0 at 1440 and 768 on both templates), and Editorial's form is 589 tall
against Grunge's 562 at 1440 round a different card (634 × 377): the form session measures it
rather than inherits it.

**`Frame 302` is the one composed-region delta**, and it is the bio's: a wrapper at 1440 alone
that stands the card 50 lower under its head, the clearance the tape needs (it overhangs the card's
top by 45; *The bio*). At 768 and 390 there is no wrapper. It is inside the bio block's own
spacing, not `vm.pad`'s.

### Whose branch draws what in the composed region

Lime's table holds; what changes is the face and the ink. "KM BIO" (both heads) is Chakra Petch
20 / 14 / 12 at lh 1.26 in `sem/text/2`, **ink**; "Reads the room." and "Five worth your ear" are
Fisterra 118 / 73 / 48 at lh .89 in `sem/text/1`, **terracotta, one tone**; "Five worth your ear"
sits in the twins' **632.2** box at 1440 *and at 768* (370 at 390), two lines at every width;
"Book Me" is Fisterra **32 / 25 / 23** (Display/Title, Sienna Vale's — Lime's literal is 36 / 28 /
26) at lh 1.1 in `sem/text/2`, ink. The 768 `Tags — Frame` instance (`984:16821`) is the
**`Theme=Lime`** variant in **Primitives: Lime** — a leak: the render's 768 Genres row is olive and
lime. The bio block draws the row itself, from Editorial's chips, as the 1440 and 390 instances do.

## The Figma source

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Frame 258 | `964:68717` | 1440 × 8505.5 |
| Tablet | Frame 268 | `984:16811` | 768 × 9654.9 |
| Mobile | Frame 269 | `984:16842` | 390 × 9597.3 |

- Desktop: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=964-68717&m=dev>
- Tablet: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=984-16811&m=dev>
- Mobile: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=984-16842&m=dev>

`fileKey` = `uFoUbPaBrDicjyuSBEbtGT`. All three sit on the page **Layout 3** (`964:58573`) beside
Retro's (`964:68621` …), Lime's (`964:68653` / `984:10739` / `984:10770`) and Grunge's
(`964:68685` / `984:13899` / `984:13930`). `use_figma` reads on descendants want
`await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('964:58573'))` first;
`getNodeByIdAsync` on an instance id works without it. The page frames are set right (Sienna Vale,
Scheme 1, with Device Tablet / Mobile on the narrow two) — but read a section node, never the page.

**Match on node id and width, never on the name** — the misnomers are the twins', one for one: the
composed instances are "— **Desktop**" at every width (the audio card, the list and the calendar
at 768 and 390; the bio at 768); the narrow footers are "Footer — Component 3 / 4 — **Desktop**"
and the desktop one "Component 2"; the tags instance is "— Desktop" everywhere. The full-width
sections' narrow masters are honestly named.

## The sections

Page order — `PAGE_ORDERS[2]`, the narrow pages'. Sizes are the frames' own. Each row's three
masters are one session. **Lime block** is where that section's Lime layout-3 block sits in
`EncoreSection.jsx` (grep the Lime or Grunge twin's desktop id to find it); it is the gate the
session widens.

| # | Cat | Desktop node | Size | Tablet node | Size | Mobile node | Size | Scheme (every width) | Lime twin (1440 / 768 / 390) | Grunge twin (1440 / 768 / 390) | Lime block | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | *foundation* | `964:68717` *(page)* | — | `984:16811` | — | `984:16842` | — | — | — | — | Scheme 5, `SCHEMES_OF.Editorial[2]`, the footer's seat by page (decision 1) | **done** (`0198910`, `dcb1cc5`) |
| 1 | `header` | `964:68718` | 1440 × 900 | `984:16812` | 768 × 1024 | `984:16843` | 390 × **663.5** | **8** (≡ 3; nav **5**; chips and two rings name Scheme 1) | `964:68654` / `984:10740` / `984:10771` | `964:68686` / `984:13900` / `984:13931` | `if (s.lime \|\| s.grunge) { … return }` at the head of `HeaderV2` | **done** (`0cd6c64`) |
| 2 | `bio` | `964:68728` *(head `964:68722`, in `Frame 302` `964:68727`, in Section `964:68721`)* | 858 × 882 | `984:16820` *(head `984:16815`)* | 708 × 912 | `984:16851` *(head `984:16846`)* | 370 × **811** | 1 | `964:68663` / `984:10748` / `984:10779` | `964:68695` / `984:13908` / `984:13939` | `if (s.v2 && (s.lime \|\| s.grunge))` ahead of `Bio`'s `if (s.v2)` | **done** (`f6a1ef5`) |
| 3 | `media` | `964:68739` list + `964:68738` card *(head `964:68731`)* | 858 × 424 + 858 × 243 | `984:16831` + `984:16830` *(head `984:16823`)* | 708 × 647 + 708 × 243 | `984:16862` + `984:16861` *(head `984:16854`)* | 370 × 647 + 370 × 243 | 1 (card **2**) | `964:68674` + `964:68673` / `984:10759` + `984:10758` / `984:10790` + `984:10789` | `964:68706` + `964:68705` / `984:13919` + `984:13918` / `984:13950` + `984:13949` | `if (s.lime \|\| s.grunge)` inside `Media`'s `if (s.v2)`, after `nHot` | **done** (`484f029`) |
| 4 | `repertoire` | `964:68743` | 1440 × 621 | `984:16832` *(in `984:16829`)* | 708 × **648** | `984:16863` | 390 × **704** | 1 (sets **4 / 2 / 3**) | `964:68678` / `984:10760` / `984:10791` | `964:68710` / `984:13920` / `984:13951` | `if (s.lime \|\| s.grunge)` inside `Repertoire`'s `if (s.v2)`, after `arrow` | **done** (`5ce944d`) |
| 5 | `calendar` | `964:68742` *(in `964:68740`; "Book Me" `964:68741`)* | 405 × **521.6** | `984:16835` *(in `984:16833`; `984:16834`)* | 708 × **471.6** | `984:16866` *(in `984:16864`; `984:16865`)* | 370 × 443.6 | 1 (the pill names Scheme 1) | `964:68677` / `984:10763` / `984:10794` | `964:68709` / `984:13923` / `984:13954` | `if (s.lime \|\| s.grunge)` inside `Calendar`'s `if (s.v2)`, after `line` | **done** (`0409063`) |
| 6 | `gallery` | `964:68744` | 1440 × 789 | `984:16836` | 768 × **877** | `984:16867` | 390 × **587** | **2** (tile rings name Scheme 1) | `964:68679` / `984:10764` / `984:10795` | `964:68711` / `984:13924` / `984:13955` | **no block** — `(s.lime \|\| grunge)` ternaries through `Gallery`'s `if (s.v2)` | **done** (`5616c03`) |
| 7 | `pricing` | `964:68745` | 1440 × **1109** | `984:16837` | 768 × **975** | `984:16868` | 390 × **1383** | 1 (featured row **3**) | `964:68680` / `984:10765` / `984:10796` | `964:68712` / `984:13925` / `984:13956` | `if (s.lime \|\| s.grunge)` inside `Pricing`'s `if (s.v2)`, after `shown` | **done** (`005af79`) |
| 8 | `map` | `964:68746` | 1440 × **813** | `984:16838` | 768 × **858** | `984:16869` | 390 × 883 | **4** (panel **3**, viewport 4) | `964:68681` / `984:10766` / `984:10797` | `964:68713` / `984:13926` / `984:13957` | `if (s.lime \|\| s.grunge)` inside `EventsMap`'s `if (s.v2)`, after `litRow` | **done** (`3582f3d`) |
| 9 | `form` | `964:68747` | 1440 × **589** | `984:16839` | 768 × **711** | `984:16870` | 390 × 741 | 1 | `964:68682` / `984:10767` / `984:10798` | `964:68714` / `984:13927` / `984:13958` | `if (s.lime \|\| s.grunge)` inside `EnquiryForm`'s `if (s.v2)`, after `up` | **done** (`174900c`) |
| 10 | `testimonials` | `964:68748` | 1440 × 790 | `984:16840` | 768 × **784** | `984:16871` | 390 × **1044** | 1 (cells **3 / 3 / 4 / 3**, two on 1) | `964:68683` / `984:10768` / `984:10799` | `964:68715` / `984:13928` / `984:13959` | `if (s.lime \|\| s.grunge)` inside `Testimonials`' `if (s.v2)`, after `template` | **done** (`35ca1f0`) |
| 11 | `footer` | `964:68749` | 1440 × 479.5 | `984:16841` | 768 × 692.3 | `984:16872` | 390 × 736.3 | **2** (layout 1's frames: 3) | — | — | layout 1's `Footer` block, already `s.limeTree`; the seat is decision 1(c) | **done** (`04492d0`) |
| — | `tags` | `964:68729` | 858 × 75 | `984:16821` (**`Theme=Lime`**) | 708 × 67 | `984:16852` | 370 × 97 | 1 | — | — | — | **not in the project**; its Genres row is drawn inside the bio's block |

**No section changes scheme between widths on this page**: every root and every nested node reads
the same scheme at 1440, 768 and 390 (read on all 36 masters). Layout 2's triple has no row here.

**Cite branches by id, never by line number**: the file is ~25 000 lines and every session moves it.
**Re-measure from the Editorial frame; never reuse Lime's or Grunge's block sizes.**

### Sizes: re-measure, and expect the type and the arch to be the difference

| Section | Editorial 1440 / 768 / 390 | Grunge | Lime |
|---|---|---|---|
| header | 900 / 1024 / **663.5** | 900 / 1024 / 606.5 | the same as Grunge |
| bio | 882 / 912 / **811** | 882 / 912 / 876 | 882 / 912 / 878 |
| media list · card | 424 / 647 / 647 · 243 | the same | the same |
| calendar (instance) | **521.6 / 471.6** / 443.6 | 537.6 / 482.6 / 441.6 | 538.6 / 483.6 / 450.6 |
| repertoire | 621 / **648** / 704 | 621 / 655 / 702 | 621 / 655 / 709 |
| gallery | 789 / **877** / 587 | 789 / 884 / 585 | 789 / 884 / 591 |
| pricing | **1109 / 975 / 1383** | 1138 / 993 / 1393 | 1199 / 1072 / 1474 |
| map | 813 / **858** / 883 | 818 / 828 / 887 | 819 / 831 / 887 |
| form | **589** / 711 / 741 | 562 / 728 / 741 | 570 / 734 / 755 |
| testimonials | 790 / 784 / **1044** | 790 / 789 / 1248 | 790 / 790 / 1108 |

Sienna Vale's ramp is layout 1's mode table (`display-lg` 118 / 73 / 48, `-md` 64 / 45 / 36, `-sm`
45 / 36 / 30, `title` 32 / 25 / 23, `label-lg` 24 / 16 / 14, `label-sm` 16 / 13 / 12, `list` 24 / 19
/ 18) and Noto Serif Display at wdth 62.5 is its own width. **The testimonials' quote is Lime's
token, not Grunge's**: Fisterra 24 / 16 / 14 is `label-lg`, where Grunge binds `size/title` (the
whole of its 390 master's 1248) — so the 390 wall is 1044, and the section may need no written-out
quote size (confirm with `get_variable_defs`). The 390 header is 57 taller than the twins' on the
same tree (the hero well 370 × 643.5, the horizontal card 350 × 136 against 127) — read it as
arithmetic before inheriting Lime's written-out 390.

Three heads the planning read flags, each a *head that must fit its measure* (CONVENTIONS C) for
its session to check before choosing (Noto ems off `notoEms`, which counts the uppercase string):

- **The bio's "READS THE ROOM."** is **7.498 Noto ems** — 727 at 97 in the composed **684**
  column at desktop, where the frame sets it on one line (850 of the 858 Section in Fisterra). It
  wraps at the word there; at 768 (547 of 708) and 390 (360 of 370) it fits one line, the frames'.
  The bio session decides between the ramp's wrap (layout 2's call for its two over-long heads) and
  a fit; Lime's and Grunge's heads fit Bebas and Anton.
- **The form's seeded head** ("Let's make your night unforgettable.") has **UNFORGETTABLE.** at
  **7.387 Noto ems** — 715 at 97 in the ~501 half column. Lime's block already shrinks this head to
  its widest word (`vm.titleWordEms`), and under Editorial that key is **`notoBoldEms`** — layout
  1's Bold statement's ems, 4.5% wide of this Regular head. The form session keys it by design.
- **The testimonials' "Experiences."** breaks inside the word at 1440 ("EXPERIENC / ES.") in the
  frame's own capped box, the demo face's measure — the twins dropped that 306 cap and print
  `vm.title` ("Word of Mouth", 7.199 ems, 378 at 52.5 — fits). Nothing to fit; a note for the
  designer.

## Editorial's layout-3 mode

Sienna Vale's Schemes 1–4 are in [`layout-1.md`](./layout-1.md) and [`layout-2.md`](./layout-2.md)
and in `THEMES[3]` (`palette` / `sem` / `tags`, `schemes[2]` … `schemes[4]`), with layout 1's five
traps. The file's `2 · Scheme` collection carries **nine** modes; resolved through the Sienna Vale
primitives at planning time (one `use_figma` over all 33 variables, the method layout 1's session 0
used), two are new to this page:

| | **Scheme 5** · blush — the header's nav | **Scheme 8** — the header |
|---|---|---|
| `bg` / `text1` / `text2` | `#E6B6A0` / **`#141414`** / `#F6F0E8` | `#141414` / `#C86E52` / `#F6F0E8` |
| `box1` / `box2` / `box3` | `#F7C7B1` / `#FFD9C7` / `#D8A994` | `#1D1D1D` / `#2A2A2A` / `#0E0E0E` |
| `active` bg / text | **`#000000`** / `#C86E52` | `#C86E52` / `#F6F0E8` |
| `inactive` bg / text / border | `#E6B6A0` at 0 / `#F6F0E8` / `#F6F0E8` 56% | ink at 0 / `#F6F0E8` / `#F6F0E8` |
| `stroke1` / `stroke2` | **`#C86E52`** / `#141414` | `#F6F0E8` 56% / `#E6B6A0` |
| `glow`, `media`, `box/N/text` | `#C86E52`, `#E6B6A0`, `#FFFFFF` | the same |
| `tag1` / `tag2` bg · text | `#C86E52` · `#141414` / **`#000000`** · `#C86E52` | `#F6F0E8` · `#141414` / `#C86E52` · `#F6F0E8` |

- **Scheme 8 is Scheme 3 in every key `THEMES` carries.** The 33 variables agree but for tag 6
  (Scheme 3 paper · ink, Scheme 8 terracotta · paper) and tag 7 (the other way round) — and the
  two-seat system never reads a tag past the second. Decision 1(a).
- **Scheme 5 is the first Sienna Vale scheme with a pure `#000000`** (its `active/bg` and its
  second tag seat), its accent (`text1`) is **ink**, and its `stroke1` is **opaque terracotta**.
  Schemes 6, 7 and 9 are Schemes 1, 2 and 4 with their tag seats moved; nothing on this page reads
  them.

**Schemes by node** (`resolvedVariableModes` on the root, every nested `explicitVariableModes`, all
three widths — identical at every width). **Read each node's `boundVariables` before believing a
token**: on this page as on layout 2's, a node can name **another** scheme's variable outright
(`scheme/1/stroke/2`, `scheme/1/tag3/bg`) whatever its own mode is.

| Section | Root | Nested (every width) | What it paints (bindings read at planning time) |
|---|---|---|---|
| header | **Scheme 8** | `nav` (1336 × 66.9 / 684 / 350 × 54.9): **Scheme 5** | root `sem/bg` ink, padding 20 / 10 / 10; the `hero-card` well `box/2` `#2A2A2A` under the photograph and **one** floor fade (`#141414` → transparent, Lime's `[[0, −1, 1], [1, 0, 0]]`, not Grunge's two), **square**, ringed 1px in **`scheme/1/stroke/1`** ink; the capsule Scheme 5's `sem/bg` **blush**, ringed in `scheme/1/stroke/1` ink, links its `text/1` **ink**; the name and Listen `text/2` paper; the Book pill blush lettered and disced ink; the chips bound to **`scheme/1/tagN`** (blush / terracotta); the card `sem/bg` ink ringed **`scheme/1/stroke/2`** terracotta; its portrait on `box/1` ringed `stroke/2` blush |
| bio | Scheme 1 | — | the card `box/1` `#FFF9F2`, dashed 10, 10 in `scheme/1/stroke/2` terracotta; the photo well `box/3` ink; the name, stats and prose `text/2` ink; the tape `active/bg` terracotta; the sparkle `text/1` terracotta |
| media | list inherits 1 | the audio card **Scheme 2** (on the instance) | the card `box/1` `#BAA499`, **square, unringed**; played bars `text/1` paper, idle bars and the disc `box/2` `#D0BCB2`; its type `text/2` ink. The list on the page: rows dashed 10, 10 in `stroke/2` terracotta, sleeves `box/2` |
| repertoire | inherits 1 | the three `set` cards **Scheme 4 / Scheme 2 / Scheme 3** | `box/1` `#DA7C5E` / `#BAA499` / `#1D1D1D`, each dashed 5, 5 in its own `stroke/1` (paper 56% / paper / paper 56%), **square**; meta `text/1` (paper / paper / terracotta), titles `text/2` (ink / ink / paper); the head `text/2` ink |
| calendar | Scheme 1 | the foot pill (365 × 54): **Scheme 1** — the identity | the card `box/1` dashed 10, 10 in `stroke/2` terracotta, **square, no 2px ring**; dots `box/2` booked, `text/1` picked, `box/1` in a 1px `stroke/1` ink ring free; the pill `text/1` terracotta, its label and disc `sem/bg` paper |
| gallery | **Scheme 2** | — | the sheet `sem/bg` `#AA958A`; the wells `box/3` `#A18A7E` ringed 1px in **`scheme/1/stroke/1`** ink, **square**; the head `text/1` paper; one well `active/bg` blush under its photograph |
| pricing | inherits 1 | the featured `row` **Scheme 3** | the instance ringed 1px `stroke/1` ink (visible); plain rows `sem/bg` paper dashed 10, 10 `stroke/2` terracotta, **square**; the featured row `sem/bg` ink dashed `stroke/2` blush, its badge `box/1` `#1D1D1D`; the toggle `box/1` ringed `stroke/1` ink, its pick `text/1` terracotta; pills `text/1` terracotta, discs `sem/bg` |
| map | **Scheme 4** | `radius-map` **Scheme 3**; `Map Viewport` **Scheme 4** (the seat's own) | the band `sem/bg` terracotta; chips ringed `stroke/1` paper 56%, All filled `text/1` paper; rows dashed 10, 10 `stroke/2` **ink** at the foot; **the lit row drawn: `text/1` paper, dashed all round in `stroke/1` paper 56%, its type `sem/bg` terracotta**; date boxes `box/1` `#DA7C5E`; *See all gigs* `text/1` paper round a `sem/bg` disc. The panel `box/1` `#1D1D1D`, **square**; its container `box/1` dashed paper 56% (r0 / 20 / 20); inside the viewport `sem/bg` **terracotta** rings, labels and centre disc (its 2px ring `text/2` ink), idle dots `text/2` ink, zoom `box/2` salmon ringed paper 56% |
| form | Scheme 1 | — | the root and its `Frame` bleed `sem/bg` paper — **no band**; the card and the three boxes `box/1`, dashed 10, 10 and **6, 6** in `stroke/2` terracotta, **square**; the head, price and stars `text/1`; the pill `text/1` round a `sem/bg` disc |
| testimonials | inherits 1 | `rating` **3**; `quote-cell` **3**; the second `name-cell` **4**; `small-quote` **3**; the first `name-cell` and `feat-quote` inherit **1** | three registers: paper `#FFF9F2` dashed 5, 5 ink (1), ink `#1D1D1D` dashed paper 56% (3; `quote-cell` unstroked), terracotta `#DA7C5E` dashed paper 56% (4); every cell **square**; the 56 discs `text/1` in a `stroke/1` ring; the numeral `text/1` terracotta |
| footer | **Scheme 2** | — | the band `sem/bg` taupe ringed `stroke/1` paper; the seal `active/bg` **blush**; the statement `text/1` paper; the links and the foot `text/2` ink |

Six traps in that table — the first three the places where layout 2's mechanisms cannot yet say what
this page says:

1. **The header stands on Scheme 8, which is not in `THEMES`.** Scheme 3 carries every key it would
   read (above). Decision 1(a).
2. **The header's nav is Scheme 5, which is not in `THEMES` either**, so `s.onScheme[5]` is
   undefined. Decision 1(b).
3. **The footer changes scheme with the page**: taupe here, ink on layouts 1 and 2. `SCHEMES_OF`
   cannot key it: the footer's design is always 0. Decision 1(c).
4. **Nodes name Scheme 1 explicitly inside a section seated on another scheme.** Under the header's
   Scheme 3 seat, `s.chips` is Scheme 3's paper / terracotta, `s.stroke1` paper 56% and
   `s.stroke2` blush — but the frame's chips are Scheme 1's blush / terracotta, the well's ring and
   the capsule's ring Scheme 1's ink, the card's ring Scheme 1's terracotta. Each reads
   `s.onScheme[1]`. So do the gallery's tile rings (`scheme/1/stroke/1` ink, where the seat's
   `s.stroke1` is paper). Resolve the binding's *collection*, not only its token.
5. **Scheme 4's accent is paper and its `stroke2` is ink**, so the map band's rows are dashed ink and
   its lit row is paper under terracotta type — a Lime block reading `s.ac` as the lit fill gets the
   frame's paper by the seat, but one reading `s.bg` as the ink gets terracotta. Read every leaf.
6. **Lime's and Grunge's layout-3 pages are dark; seven of Editorial's eleven sections stand on
   paper** (bio, media, calendar, repertoire, pricing, form, testimonials). The blocks' dark-ground
   assumptions break there, where layout 2's paper sections and layout 1's are the nearer
   precedent. Layout 2's sections found trap 6 bit less than feared (*Trap 6 did not bite* ×3): the
   bindings resolve, and the deltas are fills, radii and dashes.

### Grounds

Sampled off the three renders; **the sequence is identical at 1440, 768 and 390** (768 and 390
stack the composed region: bio, media, repertoire, then the calendar).

| # | Section | Ground | What stands on it |
|---|---|---|---|
| 1 | header | **ink** (Scheme 8), the root's own 20 / 10 / 10 frame round the well | the square photographic well; a blush capsule nav; the paper name and location; blush / terracotta chips; an **ink arch card** in a terracotta ring |
| 2 | bio | paper | a `#FFF9F2` card dashed terracotta (none at 390), the tape over its top edge, a terracotta sparkle |
| 3 | media | paper | the **taupe** audio card (Scheme 2), square; rows dashed terracotta |
| 4 | repertoire | paper | three square cards: terracotta, taupe, ink, each dashed |
| 5 | calendar | paper | a `#FFF9F2` card dashed terracotta |
| 6 | gallery | **full-bleed taupe sheet** (Scheme 2) | square tiles in ink rings |
| 7 | pricing | paper, in the instance's ink ring | rows dashed terracotta; the featured one ink, dashed blush |
| 8 | map | **full-bleed terracotta band** (Scheme 4) | rows dashed ink; a paper lit row; the ink panel (Scheme 3) |
| 9 | form | paper | a `#FFF9F2` card dashed terracotta |
| 10 | testimonials | paper | cells paper, ink and terracotta, dashed |
| 11 | footer | **taupe** (Scheme 2), layout 1's tree | — |

**No root flag widens**: `bleed`, `darkMap`, `cream`, `limeBand`, `limeLight`, `grungeBand`,
`grungeRule`, `editorialRule` and `editorialCard` gate on `s.v0` or `s.v1`. Under route A a
whole-band section needs no flag — the root paints `s.bg`, the seat's ground — so the header, the
gallery, the map and the footer take their grounds from decision 1's seats alone, and a Lime block
that paints its own sheet (the gallery's `s.box1`, the map's `s.tx`) paints nothing under `ed`
(Grunge's `G.sheet` `undefined`) or the seat's `s.bg`.

## The decisions this plan hands over

### 1. Schemes this page's route A cannot yet say — **settled: all three recommendations**

*Settled in session 0 (2026-09-25):* the user took the recommendation on all three parts: (a) the
header seated on Scheme 3 for its frame's Scheme 8, (b) `THEMES[3].schemes[5]` read through
`s.onScheme[5]`, and (c) the footer's seat read off `page`, with `&page=` in the harness and a
`page=2` footer render in the digest. See *Conventions → Settled in session 0* for the mechanisms.
The rest of this heading is kept as the record of the question.

Layout 2's three mechanisms (the per-width seat, the card seated on the page, `vm.onScheme`) cover
most of this page with no new code: no section moves between widths, so the triple has no row; no
section is a lone card on another scheme, so `editorialCard` has none; and every nested node that
stands on Scheme 2, 3 or 4 — the audio card, the repertoire's three sets, pricing's featured row, the
map's panel, the testimonials' four cells, and the header's Scheme 1 chips and rings — reads
`s.onScheme[n]`. `SCHEMES_OF.Editorial[2]` then needs `gallery: 2` and `map: 4`, data alone. Three
things it cannot say; each part has a recommendation and can be answered on its own.

**(a) The header on Scheme 8.** *Recommended:* seat it on **3** (`header: 3`) with a comment naming
the equivalence — Scheme 8 differs from Scheme 3 only in tags 6 and 7, which the two-seat system
never reads — so no data is added for a scheme the model cannot tell apart. *The alternative* is a
`schemes[8]` entry, a copy of Scheme 3 under another number, which keeps the frame's number and
duplicates twelve lines of data.

**(b) The nav on Scheme 5.** *Recommended:* add **`THEMES[3].schemes[5]`** from the table above,
in Scheme 1's shape, so the header block reads `s.onScheme[5]` as layout 2's header reads `[4]` —
data, and one scheme no section is seated on:

```js
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
```

Tags 3–7 do not strictly alternate (tag 4 is terracotta again); the two-seat system ignores that,
as it does in Schemes 2 and 3. *The alternative* is named literals (`SIENNA_MEDIA` for the blush, the seat's `s.bg` for the
ink) — two leaves, but it breaks layout 2's *every nested node reads `s.onScheme`; no scheme
literal*.

**(c) The footer's scheme by page.** *Recommended:* the footer's seat is read off the **page's**
design when the page's row names the footer, and off design 0's otherwise:
`SCHEMES_OF[theme.name]?.[page]?.footer` ahead of the design lookup when `cat === 'footer'` —
`page` is the header's design, which `sectionVm` already takes (Lime's `footerBand` reads it) — with
`SCHEMES_OF.Editorial[2].footer = 2`. Layouts 1, 2 and 4 keep row 0's 3 by the fallback, so card
4's placeholder page and every earlier digest are untouched. Route A then re-inks every leaf of
layout 1's footer block to Scheme 2's keys — the band, the seal, the statement, the links — and
section 11 checks the ones that do not follow. Two costs to name: callers that pass no `page` (the
canvas's `makeVm` and `PublishedPage` pass `pageDesignOf()`; the layout picker's footer thumbnail,
the harness and the digest pass none) see row 0's ink footer, so `preview.jsx` gains an additive
**`&page=<design>`** and `digest.mjs` one extra footer render at `&page=2` per theme and width (a
new file name, so a label taken before it simply lacks the file) — without which a footer edit is
digested on row 0's seat alone, a regression check and never a fit check; and `footerBand` stays
Lime's own flag (a band colour, not a seat). *The alternatives:* Lime's
`footerBand` recipe again under Editorial (a root colour and a seal disc, every other leaf still
Scheme 3's ink-page reading — paper type on taupe, which the frame does not draw); or leave the
footer layout 1's ink and name the diff.

Session 0 asks this and records the answer here, as layout 2's did. Everything below is written for
the recommendations.

### 2. `navModeDefault`, `navFits` and `KICKER_3` at `d === 2` — **not a user call; the header session's**

JP-039's rule is the user's: Minimal where a template's layout-2 and -3 masters draw Music / Gigs /
About. Editorial's layout-3 masters do at 1440 and 768 (390 is the burger), so `navModeDefault`
gains Editorial at `d === 2`. The capsule is gapped a **fixed 18** (padding 8 / 18) at Label/SM 16
/ 13 — layout 2's bar, not Grunge's layout-3 Label/MD — so `navGapEm` is 0 at `d === 2` too, and
`vm.navFits` takes Editorial at `d === 2` on its layout-2 arm (links at `labelSm`) against layout
3's 684. `KICKER_3` ("Performing since 2021") is the frame's card line, so its gates widen in
`sectionVm` and `EditPanel` together, Grunge's section 1.

### 3. `plans/CONVENTIONS.md` — **the sweep folds this pass in**

Keep *Inherited and used* below, one line per bullet leaned on; the sweep adds the *Leaned on in
Editorial (layout 3)* column, an Editorial column on D3, and any row this pass leaned on three
times that the file does not name (likely: *a node can name another scheme's variable outright*).

## Session 0 — the schemes

Layout 2's session 0 again, smaller: it touches no section's layout code.

0. **Branch and plan.** The branch exists (the planning session). With the dev server up, take the
   pass's "before" pictures at `theme=3&arch=2` for all eleven categories at all three widths
   (`node scripts/shots.mjs before 3 2 desktop`, then `tablet`, `mobile`) into the scratchpad.
1. **Ask decision 1.**
2. **Commit (a), pure refactors — all five themes digest to zero rows, every layout, canvas and
   `live=1`:** the footer's page-keyed seat (inert: no row names a footer at a page yet),
   `preview.jsx`'s `&page=` (absent is −1, today's behaviour) and `digest.mjs`'s extra
   `cat=footer&arch=0&page=2` render. Compare the files both labels carry; the new footer file has
   no "before" in this commit and is the next commit's baseline.
3. **Commit (b), the data — themes 0, 1, 2 and 4 at zero rows; theme 3 moves only in design-2
   files:** `THEMES[3].schemes[5]`; `SCHEMES_OF.Editorial[2] = { header: 3, gallery: 2, map: 4,
   footer: 2 }`. Every theme-3 file that moves must be `header`, `gallery` or `map` at **arch 2**
   (header arch 2 has no fold partner: `HEADER_COUNT.editorial` is 4) **or the footer's `page_2`
   file**, and no other; **no `arch_0`, `arch_1` or `arch_3` file may move**, the footer's row-0
   files included. Prove the footer in the harness (`cat=footer&theme=3&page=2` taupe, `&page=0` / `1` / `3` and no `page` ink) and
   in the builder (card 3 publishes a taupe footer, cards 1, 2 and 4 an ink one — a one-off
   puppeteer shot off `page-check.mjs`'s route), and `s.onScheme[5]` with an
   in-page `sectionVm` call (layout 2's *probing a vm key no section reads yet*: import `data.js`
   by the URL the transformed `EncoreBuilder.jsx` uses).
4. **Name what moved and why** in *Settled in session 0*: the flat `s.v2` arms and `HeaderV2`'s
   placeholder half now stand on the frames' grounds — the header ink, the gallery taupe, the map
   terracotta — and their `paper` / `deep` / `pillBg` readings will go wrong there in ways their
   sessions fix. Expect the map's flat mustard sheet (`pillBg`) to turn **ink** (Scheme 4's
   `activeBg`), layout 2's form trap.

**Verification for session 0:** commit (a) at all five themes, canvas and live (`node
scripts/digest.mjs before 0,1,2,3,4` / `after`, then `EXTRA='&live=1'`); commit (b) at themes 0, 1,
2 and 4, and theme 3 filtered to `_arch_2_` and the three categories.

## The header, and card 3

`HeaderV2`'s Lime block is where deliverable 3 is met.

- **The block widens at its head** to `s.limeTree`, `const ed = s.editorial`. Delete layout 1's
  `mustard` arm in Retro's half, and nothing else.
- **What the frame draws** (the planning walk; confirm each against Lime's and Grunge's arms):
  - the **well** square (Lime 50 / 20, Grunge 15), `s.box2` under the photograph and one floor fade,
    ringed in `onScheme[1].stroke1` — ink on ink, so read the render before drawing it;
  - the **nav** Lime's row, the capsule **`onScheme[5].bg`** blush ringed `onScheme[1].stroke1`,
    padded 8 / 18 and gapped a fixed 18, its links `onScheme[5].ac` (ink) at Label/SM 16 / 13; the
    name `s.tx` paper at Label/LG 24 / 16; Listen `s.tx`; the pill `bg={s.onScheme[5].bg}
    fg={s.onScheme[5].ac}` at layout 2's 139.32 × 34.93 box (17.92 / 8.53 / 27.6 / 4.27) —
    the header layout-2 recipe with 5 for 4;
  - the **foot**: the name `s.tx` at Display/LG, **one tone** (Grunge's two-tone `brand()` does not
    carry; read the segments), the location's dot `s.tx` at `radius/chip` 6 beside Display/List
    24 / 19 / 18 (Lime's section 1); the chips Lime's hand-scaled Tags instance (Chakra 15.04 / 10.5 / 9, radius 4.51,
    padding 3.76 / 8.27, gap 6.01 — Lime's numbers exactly) on **`onScheme[1].chips`**;
  - the **card an arch**: `s.bg` ink in a 1px `onScheme[1].stroke2` terracotta ring, radius
    145 / 145 / 0 / 0 (CSS clamps it to the semicircle at 220 wide), padded 40, gap 21; the portrait
    an arch too (81 / 81 / 0 / 0) on `s.box1` in a 1px `s.stroke2` blush ring — **136 × 128** at 1440
    (136 × 135 at 768, 96 × 96 at 390), where Lime's is an 87 rounded square; the name `s.tx` at
    Display/Title 32 / 25 / 23, the kicker `s.ac` Inter 12. At 390 the card turns horizontal as
    Lime's does (350 × 136, radius **70 / 70 / 0 / 0**, padding 20). No glow (Lime), no red ring
    (Grunge), no effect on any node.
- **Leaks to name**: the frame's chips 4 and 6 are lettered `tag/6/bg` — **terracotta on
  terracotta**, invisible at every width (the bio's Genres row letters the same two paper), and
  chips 3 and 5 name `scheme/3` and `scheme/5` inks that happen to be ink. Take each seat's own
  `fg` (overridden, CONVENTIONS A); the card's name reads "Sienna vALE" in the component's casing,
  uppercased anyway.
- **Decision 2's work**: `navModeDefault`, `navGapEm`, `navFits` and `KICKER_3` at `d === 2`.
  Measure the seeded fold at 768 with `&nav=`, layout 2's walk.
- **`Photo`'s backdrop gate** `(s.lime || s.grunge || (s.editorial && s.v0))` widens to card 3
  (`s.editorial && (s.v0 || s.v2)`): with the hero removed, card 3 draws Retro's brown well today.
  Check `&noimage=1`.
- **Digest**: `HEADER_COUNT.editorial` is 4, so header arch 2 has **no fold partner** — three
  theme-3 files a surface. The Retro header at theme 0 and the twins at 1 and 2 at zero.
- **In the builder** (`node scripts/page-check.mjs Editorial 2,0,1,3` — card 3 first gets the full
  walk): four Editorial cards; card 3 opens every section at arch 2 in `PAGE_ORDERS[2]`, the bio and
  the calendar composed at desktop, the footer at arch 0 (taupe, by decision 1(c)); publish, every
  nav link scrolls, the burger opens at 390 (and at 820, a fresh tab), Book Now reaches `#form`.
- **`scripts/reach.mjs 3`** re-measures the header's Editorial `in` rows — the card-3 entries
  (kicker / tags / showTags `[0, 2, 3]`, location all four, cta2 `[1, 2]`) were measured over the
  placeholder's Retro `HeaderV2`.

## Editorial's layout-3 decorative language

Everything here is behind `s.editorial`, `s.limeTree` or a named pair, and replaces what the Lime
block gates on `s.lime` and Grunge's arms on `s.grunge`.

- **No seams, no band grain, no effect, no leant print, no seal but the footer's.** Every band meets
  its neighbour on a straight edge. The twins' layout-3 glows (Lime) and plain rings (Grunge) become
  the dashed rule wherever this frame draws one, and nothing where it draws none.
- **Dashed rules** — the language's main device, on eight sections. All 1px INSIDE; read each node's
  per-side weights and binding before drawing:

  | Section | Node | Dash | Ink |
  |---|---|---|---|
  | bio | the card (858 × 882 / 708 × 912; **none at 390**) · the divider | 10, 10 all · 10, 10 (**weight 8** on a 1px frame, layout 2's slip) | `scheme/1/stroke/2` terracotta |
  | media | the list's head and five rows | 10, 10 at the foot | `stroke/2` terracotta |
  | repertoire | each set (429.3 × 380 / 222.7 × 439 / 290 × 439) · its four rows · the 390 pager's two arrows (180 × 54) | 5, 5 all · 5, 5 at the foot · 5, 5 all | each set's `stroke/1` (paper 56% / paper / paper 56%) · the pager `text/1` terracotta |
  | calendar | the card | 10, 10 all | `stroke/2` terracotta |
  | pricing | each row (1328 × 258 / 708 × 226 / 350 × 314–367) | 10, 10 all | `stroke/2` terracotta; the featured row blush |
  | map | the rows · the lit row · the map container · the data bar · the 120 mi ring | 10, 10 at the foot · 10, 10 all · 10, 10 all · 10, 10 at the head · **4, 4** | `stroke/2` ink · `stroke/1` paper 56% ×3 · `sem/bg` terracotta |
  | form | the card · three boxes (586 × 42 / 660 × 38 / 322 × 37) | 10, 10 all · **6, 6** all | `stroke/2` terracotta |
  | testimonials | every cell but `quote-cell` | 5, 5 all | each cell's `stroke/1` (ink on paper, paper 56% on ink and terracotta) |

  The header, the audio card, the gallery and the footer draw none. `DashRule` draws every one
  (`side="all"` with `radius` for a card, `top` / `bottom` for a rule; a capsule's radius is half
  its height — layout 2, section 4).
- **The tape** (`Tape`, layout 1's helper): the bio alone, `Frame 210` — 206 × 56 at −3° in
  `active/bg` terracotta (`Tape`'s default under Scheme 1) clipping the grain raster at SCREEN from
  (−2.93, 0.15) — at (318.3, −45) in the instance at 1440 and 768 and (109.8, −25.9) at 390,
  overhanging the card's top edge. Seat it by its centre (layout 1, *Conventions*).
- **A sparkle** (`GrungeStar`, layout 1's): the bio alone, 108 × 109 at the card's lower left (38.3,
  713) at 1440 and 768 and 54 × 54.5 at (280.9, 56.6) at 390, over the photograph — bound
  **`text/1` terracotta**, not layout 1's `SIENNA_MEDIA` blush, so `fill={s.ac}` (read each
  sparkle's binding; layout 1's footer rule).
- **Arches**: the header's card and its portrait (above). The bio's photograph is not an arch here.
- **Radii**: every card on this page is **square** — the bio card, the audio card, the sets, the
  calendar, the gallery tiles, the pricing rows, the map panel, the form card and boxes, the
  testimonials' cells — where Lime draws 50 / 30 and Grunge 15. The rounded things are the pills
  (67), the capsules and chips (999), the discs, the header's arches, the location dot and chips
  (6 / 4.51), the sleeves (4), the zoom buttons (8), the badge (4) and the narrow map container (20).
  *Corrected by the sections:* the repertoire's two 390 pager pills are **square** (section 4), and
  so are the map's date boxes and its lit row (section 8).
- **Type**: every display and label string uppercase at its own site, in Noto (`faceK` 1, so
  `faced` is the identity). **Every head on this page is one tone and on the ramp**, the footer's
  fitted Bold statement aside (layout 1's). The demo face's DEMO marks stand in for `'`, `&`, `(`,
  `)` and — a third time on this template — a digit: pricing's "£350" renders "£ ✱50", as layout 2's
  "JUN 14" rendered "JUN 1". Noto has them all.

## Photography

Every photograph this page draws is **already seeded** (`SEEDS.Editorial` in `photos.js`); no export
is owed. Image hashes, read off all 36 masters:

| Section | Slot (frame box) | Hash | Seeded | Verdict |
|---|---|---|---|---|
| header | the well 1400 × 860 / 748 × 1004 / 370 × 643.5 | `ae069c14`, `FILL` | `editorialHero` | ✓ — a centred cover (Lime's section 1: `FILL` ignores the transform; no mirror) |
| header | the arch portrait 136 × 128 / 136 × 135 / 96 × 96 | `488cc3d7`, `FILL` | `editorialHeaderAvatar` | ✓ |
| bio | photo 798 × 380 / 648 × 380 / 370 × 259 | **`9d20fe0d` under `CROP` `[[1, 0, 0], [0, 0.3811, 0.1189]]`** at 1440 and 768, `FILL` at 390 — over **`fa453f7d`** (Lime's stage shot) at `FILL` on the well | `editorialStage` | **Grunge's case again**: rows 11.9–50% of the seed, full width; correlate the render and take an `objectPosition` (Grunge's section 2), not a landscape export. The covered leak is the designer's (open question 2) |
| bio | the tape's grain | `b74be8bc` at SCREEN | `vm.grainSrc` (`Tape`) | ✓ |
| media | five 64² sleeves | `8c7fa7d8` `4e7cc529` `b737c3e0` `40041573` `21e9622c` | `ROW_ART.media` | ✓ the shared five |
| gallery | twelve tiles | Retro's layout-3 set with `221f121f` / `8031d0f3` (Grunge's) and **`9d20fe0d` / `ae069c14` (Editorial's)** dealt in; one `CROP` at 1440 | `EDITORIAL_PHOTOS.gallery`, seven slots | **layout 1's departure again**: the seven Editorial slots stand (open question 3) |
| map | `Map Texture` 570 × 472 / 315 × 517 / 350 × 161 | `e089bd11` | `vm.mapRadialSrc` | ✓ — on the panel's `#1D1D1D` container; sample the plate |
| testimonials | four 24² `av` | `ef14e35b` `ae0de808` `2de917bf` `fbe69d03` | — | nothing: the stat card draws `vm.quotes[].mark` discs (the twins' reading) |

## What already renders, and the traps in it

A code survey at planning time (`grep` for every `(s.lime || s.grunge)` gate and every
`s.editorial` / `s.limeTree` read, mapped to its enclosing branch):

- **`HeaderV2` renders Retro's half in Scheme 1 tokens** — its Lime block is not widened — with
  `const mustard = s.editorial ? s.box3 : s.pillBg` standing ink in as the sheet and capsule, and
  Retro's checker ribbon (layout 1, open question 4). Delete the arm when the block widens.
- **Every other `s.v2` branch renders Retro's arm under Editorial**, flat: no layout-3 branch reads
  `s.editorial` or `s.limeTree` (grepped). So goal 1 is met before any session runs, and each
  session still runs `theme=3&live=1` for the two usual reasons: a decoration can cover a control,
  and a live state can stop reading on this page's grounds.
- **`Photo`'s backdrop gate** is `(s.lime || s.grunge || (s.editorial && s.v0))` — widen to card 3
  in the header session (`HeaderV2`'s Lime block is its layout-3 caller).
- **`sectionVm`'s `d === 2` arms name Lime and Grunge alone**, each for its session to widen where
  the frame's numbers match (they do, by the planning read's root paddings):
  - the composed row's **`vm.pad`** (bio / calendar / media: top 50, feet 30 / `padY` / 37 · 47 ·
    35) — bio, media and calendar sessions, one each; the heads part until the calendar closes the
    row (Grunge's *Conventions*);
  - pricing's footnote (**32** at 1440 and 768) — the pricing session;
  - the form's and testimonials' insets (form foot 90 / 60 — an inner inset, measured, not
    inherited; testimonials head 56 / 30, foot 56, the root's) — each in its own session;
  - **`KICKER_3`** in `vm.kicker`, and its mirror in `EditPanel`'s fallback chain — the header's;
  - **`navModeDefault`** (Editorial at `d === 1` only), **`navGapEm`** (`d === 1 ? 0 : 23 / 16`),
    **`vm.navFits`** (Editorial on Grunge's arm at `d === 1` only) — the header's (decision 2).
- **`vm.titleWordEms`** is Lime's `bebasEms` or Editorial's **`notoBoldEms`** — layout 1's Bold
  statement's ems, at every design. The form session keys Editorial's by design (`notoEms` at
  `d === 2`), or the head shrinks 4.5% too far.
- **`FIELDS` rows keyed by template**: the header's Editorial row, whose card-3 entries were
  measured over the placeholder (the header session re-measures); `calendar.heading`'s `Editorial:
  [0, 1, 2, 3]`; `media.cta`'s `'*': []`. Each session re-measures the rows its category owns with
  `scripts/reach.mjs 3`.
- **`footerBand` is Lime's** (`page === 2`); Editorial's footer at page 2 is decision 1(c)'s seat,
  not this flag.
- **`SEEDS.Editorial` has no `layouts` row** (Lime's carries 2 and 3 for its bio). The bio's `CROP`
  is an `objectPosition` on `editorialStage` (Grunge's route); `photos.js` should not move.
- **`Tape`, `GrungeStar`'s `fill`, `DashRule` (with `gap`, the upright sides and the rect-inset
  fix), `Pager`'s `endBox` and `BookPill`'s `discBg`** are all there to call; none needs a new prop
  by the planning read.

## Per-session procedure

[`../lime/layout-3.md`](../lime/layout-3.md)'s *Per-session procedure*, steps 1–9, with:

- step 2: session 0's (above), not the header's.
- step 3: `get_metadata` on the three Editorial nodes and **both twins'** desktop nodes, then the
  paired diff walk (CONVENTIONS A) against the nearer twin — **by traversal order**.
- step 4: `get_variable_defs` on all three nodes, and the node walker (Grunge layout 2,
  *Conventions*) with `dashPattern`, per-side weights and bound-variable names **with their
  collection** (`scheme/1/…` against `sem/…` — trap 4). On a section with a nested scheme, read
  each nested node's leaves against `s.onScheme[n]`, not `s.*`.
- step 5: widen the section's **Lime layout-3 block** at the placement the sections table names to
  `s.limeTree`, `const ed = s.editorial`, reading its Grunge arm first; a third arm in `G` where the
  block has one. Never edit a Retro, Lime or Grunge literal to make Editorial look right. Desktop
  numbers × 0.82, 768 and 390 verbatim; every display string uppercase at its site.
- step 6: the harness is `preview.html?cat=<cat>&arch=2&theme=3&w=desktop|tablet|mobile` (pass
  `arch`; `preview.jsx` defaults to 1), with `&column=left|right` for the bio, the media player and
  the calendar at desktop, and `&page=2` for the footer; function at `theme=3&live=1`; **zero rows
  at themes 0, 1, 2 and 4** before and after, every session (`node scripts/digest.mjs before
  0,1,2,4` / `after`, then `cmp`); then theme 3, where every differing file must be this section's
  category at **arch 2**. **A theme-3 diff in any `arch_0` or `arch_1` file is a regression of a
  merged pass**. The footer session's theme-3 diff is the footer's `page_2` files alone; its
  row-0 files (layouts 1's and 2's footer) stay at zero, and the fit itself is proved in the
  harness at `&page=2` and in the builder.
- step 9's hand-off prompt:

  ```
  Continue the Editorial layout-3 pass with section N, `cat`.

  Read CLAUDE.md, then plans/editorial/layout-3.md, then the Conventions and Settled in
  session 0 of plans/editorial/layout-2.md, then the Conventions of plans/editorial/layout-1.md,
  then plans/CONVENTIONS.md (groups A, B, C and D3), then this section's Settled notes in
  plans/lime/layout-3.md and plans/grunge/layout-3.md (and its entries in
  plans/lime/layout-3-qa-fixes.md and plans/lime/retest-qa-fixes.md), then the Conventions and the
  2026-09-15 Addendum of plans/retro/layout-3.md, then the `figma-frame-reading`,
  `verifying-the-published-tab` and `browser-tool-choice` memory notes, and follow the
  per-session procedure.

  The three Editorial masters are `<desktop node>` (<W> × <H>), `<tablet node>` (768 × <H>) and
  `<mobile node>` (390 × <H>) in Figma file uFoUbPaBrDicjyuSBEbtGT, page 964:58573, on Scheme
  <N> (<nested schemes>); the Lime twin is `<lime nodes>` and the Grunge twin `<grunge nodes>`.
  Widen the Lime block <placement> of `<Component>` in EncoreSection.jsx to `s.limeTree`,
  Editorial's deltas behind `s.editorial`. Themes 0, 1, 2 and 4 must digest to zero rows, and
  theme 3 may differ only in `<cat>` arch 2.

  <the two or three conventions most likely to bite this section>

  Branch: editorial-layout-3. Do not refresh the root index.html.
  ```

Do **not** refresh the root `index.html` per section; it is the sweep's last step, with the
two-build digest (`scripts/build-digest.mjs`, `CARD=2` for card 3). The seeded `EXAMPLE_PAGE` is
arch 0 throughout, so the page walk will show no difference at any theme; the proof that this pass
shipped is card 3 in both builds' setup modals.

### The second session: the bio

The composed row's proof is the bio's (deliverable 3), and the bio is this page's one tree
exception:
- **No seal.** Lime's block passes `SealBadge … classic={!grunge}`; under `ed` it draws none — the
  tape and the sparkle stand in its place (*decorative language*).
- **`Frame 302`**: the desktop card stands 50 lower under its head (80 from the head's foot, where
  the twins' is 30), the tape's clearance; 768 and 390 have no wrapper, and at 768 the tape keeps
  the desktop `y` −45 and so overlaps the head's foot — follow it or override it (open question 5).
- **The card**: `#FFF9F2` dashed 10, 10 at 1440 and 768, **none at 390**, where its `Frame` is 390
  wide at x −10 in the 370 instance — read how Lime's block draws its 390 card before believing
  either. The instance root is `sem/bg` paper at **radius 50** at 1440 and 768 (0 at 390) round the
  dashed frame at radius 0; the render's corners are square, so read `clipsContent` before deciding
  whose radius the card is (Grunge read its card at 50). The divider's weight-8 slip is layout 2's
  (draw the rule alone), and it is **one** dashed rule where Lime's tree carries two 1px rules — a
  node the block drops under `ed`.
- **The photograph**: the `CROP` band as an `objectPosition` (Grunge's section 2), correlated
  against the render; `FILL` at 390.
- **The head**: "READS THE ROOM." one tone in `s.ac` at Display/LG, and too wide for the 684
  column in Noto (*Sizes*).
- **The Genres row**: at 768 the frame's is Lime's (the tags leak); draw 1440's and 390's.
- **The builder**: Editorial → card 3 → *Use this header*; the bio and the calendar in one grid row
  at 709 : 334.5 on the canvas and 864.8 : 408.2 in the published 1440 tab (section 2; first
  written 621 : 293 and 684 : 323, before JP-038's `padX`), media under the bio.

### The eleventh session: the footer

Layout 1's `Footer` block on Scheme 2, seated by decision 1(c). The tree is closed (layout 1's
section 11); what is open is **every leaf the seat does not carry**. Read the three masters'
bindings against the block's: a leaf layout 1 wrote as `s.*` follows the seat by itself (the band
`sem/bg`, the statement `text/1`, the links `text/2`); one it wrote as a named literal or a Scheme 3
coincidence does not (the seal's `line` ink, the pill's pair, the wordmark sparkle's `tag/1/bg`).
Write each delta as a key that resolves to layout 1's value under Scheme 3 and to the frame's under
Scheme 2; where no key does, a `vm` flag off `page` (`footerBand`'s shape) — **never `ed` alone**,
or the digest's footer, which is layouts 1's and 2's (row 0, Scheme 3), moves. Verify in the harness (`cat=footer&theme=3&page=2`, all three widths) and in
the builder (card 3 publishes a taupe footer; cards 1, 2 and 4 an ink one).

## The end-of-pass sweep

Written now from what the plan can see; the sections add to it. One session, in this order:

1. **CLAUDE.md and README.md**, wherever they describe Editorial as designed at layouts 1 and 2, or
   a layout-3 state as Lime's and Grunge's alone. The known sites: the *Editorial is designed at
   layouts 1 and 2* paragraph and its "cards 3 and 4 are placeholders" (card 4 alone now); the
   per-section scheme bullet (Scheme 5, the header on 3 for Scheme 8, the footer's seat by `page`);
   `navModeDefault`'s sentence ("Minimal … at layout 2 of Editorial"); the JP-039 fit table (the
   seeded names that fit Editorial's layout 3 at 768); every layout-3 paragraph naming a
   Lime-and-Grunge state — the gallery viewer's scrim ("under Lime and Grunge alike"), pricing's
   "Lime's and Grunge's stacks read no `vm.tierRow`", the form's refused box and `vm.titleWordEms`,
   the map's layout-3 lit row (drawn by this frame), the bio's tag chips' reach ("Lime's and
   Grunge's 3"), the testimonials' registers, the footer seal's name "in `tag/1/bg` paper" (now
   `active/text`, section 11); the file table's line counts. Grep both files for
   "layout 3", "Editorial" and "placeholder"; and the code comments (`navModeDefault`'s, `navFits`',
   the `vm.pad` arms', `photos.js`' head, `SCHEMES_OF`'s "Layouts 3 and 4 are later passes'",
   and `Footer`'s head comment, whose Editorial paragraph still says "on Scheme 3 … the seal …
   with its name in paper" — Scheme 2 by page on layout 3 now, the name `active/text`).
2. **One whole-page published check under Editorial at layout 3** — `node scripts/page-check.mjs
   Editorial 2,0,1,3` plus the layout-3 controls the builder walk cannot reach, driven in the
   harness (the gallery viewer — open, arrow, Escape, scroll lock; the repertoire's reveal at
   `n=20`; the pricing capsule's moving seat; the map's zoom and *See all gigs* at `n=30`) — then
   180px seam clips at every band edge at 1440 and 390: the ink header, the taupe gallery, the
   terracotta map and the taupe footer are the full-bleed edges.
3. **The layout-picker thumbnails** for arch 2 under Editorial (deliverable 4) — the header ink, the
   gallery taupe, the map terracotta; the footer's single thumbnail stays row 0's ink (no `page`),
   a named diff.
4. **The other three header cards** still render and publish; card 4 keeps Retro's checker ribbon
   as its placeholder, and its footer stays ink.
5. **`scripts/reach.mjs 3`** over the whole template.
6. **Every `(s.lime || s.grunge)` left in layout-3 code**, listed with why Editorial does not share
   it (layout 2's item 6). And raise the one three-template spacing diff section 4 named: the
   repertoire's head stands at the shared `padY`, so the media foot → head gap is 117 / 103 / 79
   on the canvas under Lime, Grunge and Editorial against the frames' 100 / 90 / 70.
7. **`plans/README.md`**: mark the pass closed; **`CONVENTIONS.md`** (decision 3).
8. **Notes for the designer**, gathered from the open questions, layout 1's shape.
9. **Refresh the root `index.html`** with the two-build digest, `CARD=2`: zero rows at every theme
   on the seeded page; the shipped-it tell is card 3 in the two builds' setup modals (the old one's
   checker ribbon and Retro's composition; the new one's blush capsule, arch card and square well).

## Conventions

Append as the pass goes. Do not repeat layout 1's, layout 2's, Lime's, Grunge's or Retro's bullets;
name them.

- **Layouts 1's and 2's conventions all hold**: the gates are `s.editorial`, `s.limeTree`, the
  named pairs and `s.designed`; never edit another template's literal; uppercase per site;
  `DashRule` for every dash; route A for a section's ground and `s.onScheme[n]` for a nested node;
  themes 0, 1, 2 and 4 at zero rows.
- **Harness:** `theme=3`, `arch=2`, every width, `&column=` for the three composed sections,
  `&page=2` for the footer.
- **A node can name another scheme's variable outright** — `scheme/1/stroke/2`, `scheme/1/tag3/bg`
  — whatever its own mode is. Resolve the binding's collection as well as its token: under the
  header's Scheme 3 seat a `scheme/1/…` leaf reads `s.onScheme[1]`, not `s.*`.
- **Diff by traversal order, never by id**: each template is its own variant.
- **Every head on this page is one tone and on the ramp.** Grunge's two-tone names and positional
  splits have no site here; the footer's fitted Bold statement is layout 1's.
- **Every card on this page is square.** Read a radius before inheriting the twins' 50 or 15.
  **Read the instance root's `clipsContent` before believing its radius** (section 2): the bio's
  root states 50 in paper on the paper page and clips nothing; the card inside it clips at 0.
- **The composed columns are 709 : 334.5 on the 1180 canvas and 864.8 : 408.2 in the published
  1440 tab** (section 2, measured), not the 684 : 323 / 621 : 293 this plan's older text
  carries: JP-038's `padX` of 56 made the gutter 1328 − 55 wide. `&column=left` renders the
  709. Measure the media and the calendar there.
- **Noto's 0.09em is a face fact, not a line-height one** (section 5). The baseline sits at
  half the line box plus (ascent − descent) / 2, so the gap between two faces' baselines is the
  same at lh 0.89 and lh 1: the calendar's month at lh 1 scanned 0.097em above its box's foot
  against Fisterra's 0.200, the numeral at lh 0.89 0.053 against 0.144 — layout 2's marks again.
  Lift with `position: relative; top: -0.09em` wherever a display string's neighbour is close
  enough to show it: a J over a line of type, or a numeral over a stacked label. The lift moves
  `getBoundingClientRect` with the glyphs, so measure a lifted box against its unlifted twin.
  **A numeral beside a bottom-aligned Inter glyph is such a site too** (section 7): pricing's
  price row stands `£`, numeral and unit on one floor, and unlifted Noto set the numeral level
  with the `£` (768 and 390: below it) where the frame stands it 7 above at 1440 — measure the
  pair's lowest ink rows, frame and ours, not the boxes.
- **A twin's frame-less control inked `s.tx` inverts on this paper page** (section 6). The twins
  ink their QA-added and redrawn states in `s.tx`, which is pale on their dark pages and ink
  here: widened as written, the gallery viewer put ink controls on an ink scrim. Check every
  control no frame draws against its own surround, not the twins' key. Layout 2's *a twin's
  redrawn state is read against this frame* covers the states a frame does draw; this covers the
  ones it does not. The next sites are pricing's moving FEATURED seat, the map's lit pin and
  zoom buttons, and the refused boxes of the form. *Pricing's seat needed nothing* (section 7):
  it is the frame's own featured row moved, every leaf read off `s.onScheme[3]`, so it reads
  wherever the filter stands it; the one frame-less box, *No packages yet.*, is `s.tx` ink on
  the paper page in a terracotta dash. *The map's zoom buttons are not frame-less* (section 8):
  they are nodes, `box/2` salmon in a paper-56 ring; its one frame-less state is the lit pin,
  the paper accent in a 2px ink ring, which reads on the dark plate.
- **The lift is measured per site, and it moves with the line height** (section 8), which
  refines section 5's *not a line-height one*. On the map, where one face stands at two line
  heights, Noto's glyph floor sits **level** with the frame's at lh 1.2 (the row venues, 0.273
  against 0.271em up the line box) and **0.07em low** at lh 1.1 (the panel title, 0.17 against
  0.244), where the calendar's lh 0.89 and 1 gave 0.09–0.10: Figma's baseline moves less with
  the line height than CSS's. So read the frame's floor per site — **`absoluteRenderBounds`
  against the text node's box**, one `use_figma` read, is exact where `get_screenshot` caps at
  1:1 — lift by what it measures, and lift nothing that measures level.
- **A frame's own state can vanish by the scheme; redraw it in the other text token at the
  frame's opacity** (section 8). The map's idle dots bind `text/2` at .6, paper under layout
  2's Scheme 3 viewport and ink under this page's Scheme 4 one — (28, 29, 23) on a (41, 42,
  27) plate. Sample a followed state on the render before following it; where it has vanished,
  it is the twins' *invisible, so redrawn* case, and `text/1` at the frame's .6 is what the
  same node drew on the page where it read.
- **A baseline-aligned row lifts as one; a lone numeral would leave its baseline** (section
  9). The form's `£1,200` and *from / event* share a baseline in the frame (`BASELINE`) and in
  CSS (`alignItems: 'baseline'`), so a `top` on the price span would pull the digits off the
  unit's line. The row takes the lift (`position: relative; top: calc(-0.09 * size)`, the
  price's size), and only when a price is printed — an Inter unit alone sits right. Measure
  the shared baseline against the row's own top, frame and ours, in the price's ems. **And a
  Display/LG head over a line of type is a lift site too**: at lh 0.89 the form's head
  measured 0.08em low (floor 0.053 / 0.060 / 0.077em above the box against the frame's 0.132
  / 0.138 / 0.133), and with a J in the string it all but met the paragraph 20 below. The
  bio's and media's heads stand over a card, not prose, and were not lifted; a later head
  over prose should be measured the same way.
- **Measure a floor with flat-bottomed glyphs, and correct the frame's for its whole-pixel
  line box** (section 10). The seed's round letters overshoot the baseline by ~0.01em and the
  spread across cells reached 0.07em at 390, so the floors were re-read through `&cj=` strings
  of T, H, E, B, A, L, D ("The beat held til late"), which gave one number per width. Figma
  rounds a text node's line box to a whole pixel (26.4 → 26, 17.6 → 18, 15.4 → 15), so its
  `absoluteRenderBounds` floor and cap top each carry half that rounding; read both, correct
  each by the half, and the two agree. What is left under a pixel at every width is level.

### Seen at planning time, per section

From the renders and the planning walk — impressions to confirm, not measurements. The paper
sections are where the twins' dark-ground assumptions break (trap 6).

1. **header** — see *The header, and card 3*.
2. **bio** — see *The second session*. The stats are Inter 12 labels over Chakra Petch 20 / 14 / 12
   values, as the twins'; the name `s.tx` ink at Display/SM 45, one tone.
3. **media** — the **taupe** audio card (`s.onScheme[2]`), square and unringed: played bars paper,
   idle bars and the disc `#D0BCB2`, type ink — Lime's `G` (`card`, `dusk`, `disc`, `radius`, `ring`)
   gains a third arm off `onScheme[2]`; the list on paper with **bottom** rules dashed terracotta
   (Lime's top hairlines turned round, layout 2's media found the same), sleeves `s.box2` r4; the
   head terracotta in the 632 box, two lines at every width (Noto's "FIVE WORTH" 5.217 ems, 506 of
   518 at desktop).
4. **repertoire** — three square sets, **terracotta / taupe / ink**, seated by rendered place (the
   390 master centres the taupe card, so seat 1 is Scheme 2 — Lime's discriminator), each dashed 5, 5
   in its own `stroke/1`; meta `text/1` (paper, paper, terracotta), titles and times `text/2` (ink,
   ink, paper); the 390 pager's two arrow pills dashed 5, 5 terracotta; the head "CURATED SETS" ink
   (ours `vm.title`).
5. **calendar** — a `#FFF9F2` card dashed terracotta, square, **no 2px ring** (Lime's `border/thin`
   `stroke/1` ring); the numeral ink at Display/LG, the month at Display/SM (the **J of JUNE**: layout
   2's *Noto's J descends 0.24em* — check the month's tight box); dots `box/2` booked, `s.ac`
   picked, `box/1` in a 1px ink ring free; the pill Scheme 1's own — `BookPill`'s defaults (Lime's
   is Scheme 2); "Book Me" at 32 / 25 / 23 ink.
6. **gallery** — the **taupe** sheet by the seat (the root paints it; Lime's `s.box1` sheet is
   `#BAA499` here, Grunge's `#171716` a literal), square wells `s.box3` `#A18A7E` in **1px
   `onScheme[1].stroke1` ink** rings, the head paper (`s.ac` under the seat); the viewer's scrim and
   controls are this template's call (no frame draws them).
7. **pricing** — paper in the instance's ink ring (Grunge's overlay, widened); plain rows paper
   dashed terracotta, square; the featured row `onScheme[3]` — ink, dashed blush, a `#1D1D1D` badge,
   the numeral terracotta and the rest paper; the toggle `#FFF9F2` in an ink ring with a terracotta
   pick; pills terracotta with paper discs (ink on the featured row); "Save 15% on bundles" (JP-046);
   the demo "£ ✱50".
8. **map** — a **terracotta** band (seat 4; `G.sheet` undefined, the root paints it); chips and date
   boxes ringed paper 56%; rows dashed **ink** at the foot; **the lit row is the frame's own** — paper
   `#F6F0E8` dashed paper 56% all round under terracotta type — so it is followed, not redrawn
   (CONVENTIONS C, *a twin's redrawn state is read against this frame*); *See all gigs* paper round a
   terracotta disc; the panel `onScheme[3]` ink, **square**, its container dashed paper 56% (r20
   narrow), the rings, labels and centre disc **terracotta** (the viewport is Scheme 4), idle dots
   **ink**, zoom salmon; the head paper ("Where I'm playing." — ours `vm.title`).
9. **form** — **paper, no band** (Scheme 1; Lime's and Grunge's are page-ground cards too); the card
   and boxes square `#FFF9F2` dashed terracotta 10, 10 and 6, 6; the head terracotta at Display/LG,
   three lines at 1440 (the widest-word fit, *Sizes*); the refused box drops its full-ink dash for a
   solid 2px ring (layout 2's form rule — which ink on paper is the session's). *Settled in
   section 9: 2px of ink (`s.tx`); the head fits at 70px on three lines in a 519.5 column.*
10. **testimonials** — a three-register wall: **paper / ink / terracotta**, seated **`[0, 1, 2, 1, 0]`**
    over the five quote cells (Lime `[0, 1, 1, 2, 0]`, Grunge `[0, 1, 0, 1, 0]`) — write an Editorial
    `REG` / `SEATS` in `G`, never remap the twins'; the stat card `onScheme[3]` ink with a terracotta
    numeral; every cell square and dashed 5, 5 but `quote-cell` (unstroked — the twins ring it,
    Retro's normalisation); the quote at Label/LG 24 / 16 / 14 (Lime's token); the head ink at
    Display/MD. *Settled in section 10: `quote-cell` left bare, as a seat; the disc its cell's
    `text/1`; the numeral row lifted 0.08em.*
11. **footer** — layout 1's tree on **taupe**: the band ringed paper, the seal blush with an ink
    sparkle, the statement paper (layout 1's fitted Bold; at 390 the frame breaks UNFORGETTAB / LE),
    the links and the foot ink, the Book pill blush. See *The eleventh session*. *Settled in
    section 11: bindings-only against layout 1; the bar, the pill's label and the seal's name
    re-keyed; the sparkle followed.*

### Settled in session 0 (the schemes)

- **Decision 1 is the three recommendations** (user call, 2026-09-25), built as two commits:
  `0198910` the mechanisms — all five themes at zero rows over the 645 files both labels carry,
  canvas and live — and `dcb1cc5` the data, themes 0, 1, 2 and 4 at zero rows canvas and live.
- **(c) The footer's seat is read off the page**, at `sectionVm`'s head: `const seat = (cat ===
  'footer' ? SCHEMES_OF[theme.name]?.[page]?.footer : undefined) ?? SCHEMES_OF[theme.name]?.[d]?.
  [cat]`. `??`, so a page row's `footer: 1` would stand the footer on Scheme 1 — an override, not a
  fallthrough. Callers that pass no `page` read row 0: the layout picker, `TemplatePreview`,
  `HeaderChoices` and the harness without `&page=`. **`preview.jsx` takes `&page=<design>`**
  (absent is `sectionVm`'s −1) and **`digest.mjs` renders the footer once more per theme and
  width at `cat=footer&arch=0&page=2`**, as `cat_footer_arch_0_page_2_theme_N_w_W.txt`: 660
  renders a label where there were 645. Inert by construction, and proved so. In `0198910` each
  `page_2` file equals its no-page twin at themes 0, 2, 3 and 4. At theme 1 it differs in one
  row, the root, which is `#2E3928`: Lime's `footerBand` reads `page === 2`. So the digest now
  reaches Lime's layout-3 footer band, which no render did before, and the footer session's
  zero-row check at theme 1 covers it.
- **(a) The header is seated on 3**, the equivalence named in `SCHEMES_OF`'s comment.
  `get_variable_defs` on the header instance (`964:68718`) corroborates both schemes in one mixed
  list: `sem/bg` `#e6b6a0` and `text/1` `#141414` are the nav's Scheme 5, and `box/1` `#1d1d1d`,
  `box/2` `#2a2a2a` and `stroke/2` `#e6b6a0` are Scheme 8's, which are Scheme 3's. **The tool
  takes top-level ids only** (`\d+:\d+`), so the nav (`I964:68718;…`) cannot be read alone; the
  rest of Scheme 5 is the planning read of the collection.
- **(b) `THEMES[3].schemes[5]` is the plan's literal, verbatim**, with no section seated on it.
  `vm.onScheme` now keys 1–5 under Editorial, and `onScheme[5]` resolves as the table says:
  `bg` blush, `ac` ink, `tx` paper, `stroke1` terracotta, `pillBg` `#000000` / `pillFg`
  terracotta, chips terracotta · ink and `#000000` · terracotta. Lime's `onScheme` stays undefined.
- **Proved.** In the harness, the footer at `theme=3` is taupe `rgb(170, 149, 138)` at `&page=2`
  and ink at `&page=0`, `1`, `3` and with no `page`, at all three widths. In the page, an
  in-page `sectionVm` call (data.js imported at the URL the transformed `EncoreBuilder.jsx` names,
  `/src/builder/data.js?t=…`) gives header ink, gallery taupe, map terracotta with a paper accent,
  bio paper, and the footer taupe at `page` 2 alone. In the builder, **card 3's footer is taupe on
  the canvas and in the published tab**, its header ink, gallery taupe and map terracotta, its
  page in `PAGE_ORDERS[2]` (header, bio, media, repertoire, calendar, gallery, pricing, map, form,
  testimonials, footer); cards 1, 2 and 4 publish an ink footer. **A bare `sectionVm` call throws
  on `split`**: it needs `artistName`.
- **What moved: 24 files, theme 3** — header, gallery and map at `arch_2` and the footer's
  `page_2`, at every width, canvas and live; nothing else. The pictures (`shots.mjs` before /
  after in the session scratchpad, per width, and the footer at `&page=2` by hand):
  - **The header's placeholder half** (Retro's `HeaderV2`) keeps its ink ground, checker ribbon
    and photograph, and four leaves move. The chips turn from blush / terracotta to Scheme 3's
    paper / terracotta; the frame binds Scheme 1's blush / terracotta, trap 4. The Book pill's
    disc turns from paper to ink. The capsule gains a paper hairline. **The card's name vanishes**:
    `s.tx` is paper now, on the card's paper, at every width. The header session makes this half
    unreachable.
  - **The gallery is the whole band taupe** with its head in paper (`s.ac` under Scheme 2), which
    are already the frame's ground and head. Its tiles and their dark rings are unchanged; the
    frame's rings are `onScheme[1].stroke1` ink.
  - **The map band reads ink, as predicted**: the flat arm's full sheet is `pillBg`, Scheme 4's
    `activeBg`, over a terracotta root. On it the head, the venues, the All chip, the lit row and
    the See all gigs disc are terracotta, the in-transit chip dark, and the viewport's labels and
    markers ink and paper. **At 390 the pager's two arrows are ink glyphs on the ink sheet,
    invisible** (they were ink on terracotta): the control still works but cannot be seen until
    section 8's block replaces the arm.
  - **The footer at `&page=2` already stands on the frame's ground**: a taupe band ringed paper,
    the statement paper, the links and the foot ink, the seal disc blush round an ink sparkle.
    Three leaves do not follow the seat, as *The eleventh session* foresaw: the seal's ring name
    (blush on the blush disc, invisible), the Book pill's paper label (weak on blush) and the
    wordmark's sparkle (blush, `tag/1/bg` under Scheme 2). Section 11's.
  Every other section's files are at zero; none of the above is chased here.
- **`shots.mjs` for three widths**: it writes `<label>/<cat>.jpg`, so a second width under the
  same label overwrites the first — run each width with its own `OUT`. It has no retry on a Vite
  reload (the first run died on "Execution context was destroyed"; rerun), and it passes no
  `page`, so its footer is row 0's.
- **For the sweep's CLAUDE.md pass**: the per-section scheme bullet (*A page section is*) owes
  Scheme 5 on `onScheme`, the header on 3 for its Scheme 8, and the footer's seat by `page`.
  `SCHEMES_OF`'s head comment already reads "Layout 4 is a later pass's".

### Settled in section 1 (the header)

- **The block widened whole: `if (s.limeTree) { … return }` at the head of `HeaderV2`, `const ed =
  s.editorial`** (about fifteen arms and two portrait sizes, no `G`). The tree is Lime's **node
  for node at 1440 and 390** — the paired traversal-order diff, 44 nodes against 44 at both, the
  390 included (the plan's "Lime's, not Grunge's" held) — on Scheme 8 (seated 3) with the nav
  on Scheme 5 and no Device override at any width. Retro's half lost the `mustard` placeholder
  arm and its four-line comment (`const mustard = s.pillBg`) and nothing else; the theme-0
  digest is zero.
- **Every delta is a binding, read off three walks** (node walker with bound names and their
  collections, plus the paired diff):
  - **the well is square** at every width (the twins' 50 / 50 / 20, Grunge's 15); its fade's
    opaque stop is bound **`sem/bg`** `#141414` where the twins' is `sem/media`, so the
    gradient reads `ed ? s.bg : s.box1` (Scheme 3's `box1` is `#1D1D1D`); its ring names
    **`scheme/1/stroke/1`**, ink on the ink page, drawn by its binding through
    `s.onScheme[1].stroke1` (Scheme 3's `stroke1` is paper 56%);
  - **the nav is Scheme 5**: the capsule `onScheme[5].bg` blush, ringed `onScheme[1].stroke1`
    ink, its links `onScheme[5].ac` ink at **Label/SM** 16 / 13 (bound `size/label-sm` — Lime's
    size, not Grunge's Label/MD) gapped a **fixed 18** (`grunge || ed` on `navGaps` and the
    `<nav>`'s gap); the name, Listen and the burger's bars are Scheme 5's `text/2`, which is
    Scheme 3's paper `s.tx`, so they read nothing new. The pill is `bg={s.onScheme[5].bg}
    fg={s.onScheme[5].ac}` on Lime's box — `BookPill`'s Lime branch then discs it in the label's
    ink round a blush arrow, the frame's `Frame 174` exactly; its box is 139.32 / 124.32 /
    119.32 with the label at every width, so the 390 pill is not hand-shrunk;
  - **the chips name Scheme 1's tag seats** (`scheme/1/tag1…6/bg`, blush / terracotta), so
    they read `s.onScheme[1].chips[i % 2]`, each seat in its own ink — the frame's fourth and
    sixth labels (`sem/tag/6/bg`, terracotta on terracotta) and its third and fifth
    (`scheme/3` and `scheme/5` inks that happen to be ink) are not followed, open question 4.
    Lime's hand-scaled numbers hold exactly (15.04 / 10.53 / 9.02, 3.76 / 8.27, gap 6.01,
    **radius 4.51** — bound `radius/chip` in the Tokens collection);
  - **the title is one tone** (`Title`'s `twoTone={grunge}` needed nothing); the location's
    **dot is `sem/text/2`** paper where the twins' is `text/1`, so `ed ? s.tx : s.ac`; its line
    uppercased (`grunge || ed`);
  - **the card is an arch**: `sem/bg` ink (`s.bg`) in a 1px ring naming
    **`scheme/1/stroke/2`** (`s.onScheme[1].stroke2` — terracotta, which Scheme 3's `s.ac`
    happens to equal), radius `u(145) u(145) 0 0` (CSS clamps it to the 220 card's semicircle,
    118.9 on the canvas) and **70 / 70 / 0 / 0** on its side at 390, padding 40 / 20, no glow;
    its portrait an arch too, `u(81) u(81) 0 0` on `s.box1` in the section's own blush
    `sem/stroke/2` (`grunge || ed ? s.stroke2 : s.ac` — the twins bind the same token), at
    **136 × 128 / 136 × 135 / 96 × 96**; its name Display/Title at the literal 32 / 25 / 23
    (CONVENTIONS C, `vm.title` shadows the ramp), uppercased;
  - **the 390 band states 418.52** (the twins' 370.52): with the card's 136 against 127 that
    is the whole of the 57 (open question 5's last bullet, answered as arithmetic).
- **`Photo`'s backdrop ramp widened to card 3** (`s.editorial && (s.v0 || s.v2)`): the only
  `backdrop` callers are the headers' wells, and under Editorial `s.v2` reaches `HeaderV2`'s
  block alone. `&noimage=1` draws Scheme 3's `#1D1D1D → #141414 → #0E0E0E` under the blush
  capsule, not Retro's brown. Its comment now names card 4 as the one placeholder (card 2's
  photograph is an arch on `box/3`, not a backdrop).
- **Decision 2, done.** `navModeDefault` is Minimal at Editorial `d === 1 || d === 2` (one
  four-template condition now); `navGapEm` is 0 at Editorial `d === 1 || d === 2`; `vm.navFits`
  serves Grunge and Editorial on one arm, its link size `T.name === 'Grunge' && d === 2 ?
  labelMd : labelSm` (caught in review: the old `d === 1 ? labelSm : labelMd` would have
  summed Editorial's layout-3 links at Label/MD) against 684; `KICKER_3` widened in `sectionVm`
  and `EditPanel` together. **The 768 fold, walked** (harness, `navMode: 'sections'`, `&nav=`
  0–9): *Follow my sections* draws **up to four** seeded links on one row (the name slides to
  392.8 at four, Lime's rule), five and more fold to the burger; Minimal's three draw at 168.8
  against the master's 175 with the name centred at 384; no state past the 768 edge.
- **Measured against the masters' content edges** (harness): desktop section 738 (900 × 0.82),
  capsule (42.6, 43.2) 155.8 × 27.4 against (42.6, 43.1) 162.4 × 27.9, the links 13px, pill
  right edge 1137.3 against 1138.2 and 28.6 tall, h1 at 528.9 (529.3) 86.3 tall at 97px, card
  (957, 461.5) 180.4 × 233.9 against (957.8, 461.7) 180.4 × 233.7, portrait 111.5 × 105, card
  name at 616.4 (616.6); 768 capsule (42, 44.3) against (42, 44.5), pill right edge 726 (726.02),
  h1 at **831.5** (exact), card (506, 697.7) 220 × 284.3 against 220 × 285, portrait 136 × 135;
  390 section 663.4 (663.45), pill right edge 370 (370.02), h1 at 358.3 (357.9), card (20,
  507.4) 350 × 136 (exact), portrait 96 × 96. **Named diffs**: Noto's labels are narrower than
  Fisterra's, so the capsule is 155.8 / 168.8 against 162.4 / 175 and the pill 107.7 / 118.2 /
  113.6 against 114.2 / 124.32 / 119.32, flush right — layout 2's numbers; five chips where the
  frame draws six (`TAG_LABELS`).
- **Verified in the builder** (`page-check.mjs Editorial 2,0,1,3`): four modal cards; card 3
  opens every section at arch 2 in `PAGE_ORDERS[2]`, the calendar composed beside the bio (both
  at top 901 in the published 1440 tab); Music → `#media`, Gigs → `#map`, About → `#bio`,
  Listen → `#media`, Book Now → `#form`, every other anchor and footer link on its id; the 390
  burger opens (1 → 5 anchors); `overflow390` 0; no console error or warning on any card. A
  one-off script (deleted) proved session 0's footer seats still hold — **card 3 taupe**
  `rgb(170, 149, 138)` on the canvas and in the published tab, **cards 1, 2 and 4 ink** — and
  the published tab at **820**: tablet, so Minimal's three draw inline (JP-039's fit, no
  burger at that width now), each scrolling to its id, `scrollWidth` 820, header 1024. The
  tablet burger still opens where *Follow my sections* folds it (harness `live=1`: 2 → 12
  anchors at 768, 1 → 11 at 390, on the `#0E0E0E` panel).
- **`FIELDS.header` needed no change**: `scripts/reach.mjs 3` (3,312 renders) over the fitted
  card gives kicker / tags / showTags `[0, 2, 3]`, location all four, cta2 `[1, 2]` (4/6: Listen
  is dropped at 390), showBadge `[0, 3]`, badgeText `[3]`, subtitle / heroCta `[1]`, align `[0]`
  — the rows the placeholder measured. Its code comment (and `headerFamily`'s, stale since
  layout 2) now name three fitted cards and one placeholder.
- **Digest**: themes 0, 1, 2 and 4 zero files of 660, canvas and `live=1`; theme 3 exactly
  header arch 2 at three widths on both surfaces (6 files).
- **Named, not this session's**: `headerIdentity()` reads the header's raw `kicker`, so under
  card 3 the bio (and the form's credit) print "DJ · Live Act" where the header's card prints
  `KICKER_3` — the state Lime's and Grunge's layout 3 already have.
- **For the sweep's CLAUDE.md pass**: the *Editorial is designed at layouts 1 and 2* paragraph
  ("cards 3 and 4 are placeholders" → card 4; Inset Hero is `HeaderV2`'s Lime block, widened —
  a square well, a Scheme 5 capsule, an ink arch card); the `navModeDefault` sentence (Minimal
  at layouts 2 and 3 of Editorial); the JP-039 fit counts (*Follow my sections* fits four in
  Editorial's layout 3 at 768); the header's `in` sentence ("Editorial's over two fitted cards
  and two placeholders" → three and one). Not written here.
- **For the bio**: the composed row's `vm.pad` arm at `d === 2` still names Lime and Grunge;
  the bio joins it first (Grunge's *the composed row's pad arm moves per section*), so until
  the calendar closes the row the heads part on the 1440 page. The header's arch card is the
  page's first arch; the bio's photograph is not one (*decorative language*).

### Settled in section 2 (the bio)

- **The block widened whole: `if (s.v2 && s.limeTree)` ahead of `Bio`'s `if (s.v2)`, `const ed =
  s.editorial`**, about fifteen arms and no `G`. The card is lifted into a `const card` so the
  Editorial path can wrap it with the tape; the Lime and Grunge DOM is unchanged, which the
  digest proves. The tree, by the paired traversal-order diff against the Lime twin (23 of 28 /
  45 at 1440 and 768, 23 of 27 / 44 at 390; against Grunge 24 of 28 / 40), is Lime's but for the
  seal (gone), the tape and the sparkle (added), the photo's inner `CROP` frame, and the second
  rule (gone); on Scheme 1, no nested scheme, no Device override, no effect on any node.
- **Every delta, off three walks** (bindings with their collections):
  - **the card is square.** The instance root is `sem/bg` paper at radius 50 (0 at 390) and
    does **not** clip; the card `Frame` inside it clips at radius 0. So the 50 paints paper on
    the paper page, invisible, and the card is square at every width. It is `s.box1` `#FFF9F2`
    dashed 10, 10 in `scheme/1/stroke/2`, 1px inside, at 1440 and 768 (`DashRule side="all"`
    after the children, where Lime's ring overlay stood), and unstroked at 390. The binding
    names Scheme 1, and the section stands on Scheme 1, so `s.stroke2` is the same value;
    `onScheme[1]` was not needed;
  - **the 390 card bleeds**: 390 wide at x −10 in the 370 instance, so it runs the page's
    width through the root's padding (`margin: 0 calc(-1 * padX)`). Its photo row's 10 then
    puts the photograph and the text on the column's edge. Followed, since it shows;
  - **the photograph is square** (Lime 55, Grunge 15) on the `box/3` ink well, with no glow and
    no grain. Its fill is `9d20fe0d` under `CROP` `[[1, 0, 0], [0, 0.3811, 0.1189]]` at 1440
    and 768, a plain `FILL` at 390, over Lime's covered `fa453f7d` (open question 2).
    `editorialStage` is 820 × 1025 (4:5), so the band is rows 11.9–50%. The desktop cover at
    **19.2%** (= 0.1189 / (1 − 0.3811)) correlates **0.9998** with the 1440 render. The 768
    master keeps the transform in a narrower box and squashes the band, as Grunge's does, so
    no cover matches it well: the sweep peaks at **16%** (0.679), where the band's centre
    (14.1%) gives 0.655. Layout 2's *follow the sweep's peak* took it. 390 is the centred cover
    (0.884). `photos.js` did not move. `&noimage=1` puts paper initials (`s.bg`) on the ink
    well, since `s.tx` is ink here;
  - **the head band pads 0 at the top** (Lime 24), so it is 120 / 120 / 160 against Lime's 148
    / 144 / 186. The name stands on the stats' floor straight under the photo row: Display/SM
    45 / 36 / 30 in ink (`sem/text/2`, one tone, uppercase). The stat values are Grunge's
    Label/XS in `font/ui`, Chakra Petch 20 / 14 / 12 at 1.26 with a 2.52em floor (the labels'
    `size/chip` is 12 / 11 / 11 by the ramp, no arm);
  - **one dashed rule, 23 apart** (`Frame 258` gap 23 at 1440 and 768, 20 at 390, Lime's 0 /
    20). The divider is a 1px clipping frame stroked **8** inside, dashed 10, 10 in
    `scheme/1/stroke/2`; the clip shows a hairline, so a hairline is drawn (layout 2's slip).
    Lime's foot rule has no node here and is dropped under `ed`;
  - **the tape** is `Frame 210`, a child of the instance pinned MIN / MIN: `Tape` at
    `active/bg`, turned CSS `rotate(3deg)` (Figma −3), seated by its centre off the card's left.
    The centre is the origin plus the half-size turned: (419.67, −11.65) at 1440 and 768,
    (211.16, 7.43) at 390 in the 370 instance;
  - **the sparkle** is `GrungeStar fill={s.ac}` (`sem/text/1` terracotta — not `SIENNA_MEDIA`). At
    1440 and 768 it is the card's (38.28, 713), i.e. 106 down the about band, whose floor keeps
    it inside the padding (`minHeight` 106 + 109 + 24, the seal's rule). At 390 it is the
    instance's (280.88, 56.6), 54 × 54.5, over the photograph.
- **`Frame 302` (desktop) and open question 5's 768 tape, overridden.** At 1440 the card stands
  50 × 0.82 lower under its head (a `marginTop` on the card's wrapper, inside the block). The
  768 master has no wrapper, and its tape keeps the desktop −45, which covers the foot of the
  head's glyphs ("ROOM." in the frame, and more in Noto, whose glyphs sit lower). The designer
  gave 1440 that wrapper precisely as the tape's clearance, so the 768 overlap is read as a
  leak that reads as a defect (CONVENTIONS A), and **768 takes the same 50, unscaled**. The
  cost is a 768 card 50 lower than its master. 390 is its own composition, and its tape clears
  the head by ~4.
- **The head wraps on the ramp** (the plan's decision): "READS THE ROOM." is 7.498 Noto ems, 725
  at 97 in the composed column, which is **709** now (below). Each word fits, so CONVENTIONS
  C's widest-word fit has nothing to shrink. Layout 2's over-long heads took the same call. Two
  lines at desktop where the frame's Fisterra sets one; one line at 768 (547 of 708) and 390
  (359.8 of 370), as the masters.
- **The Genres row** at 1440 and 390 is Editorial's chips on the frame's seats: blush lettered
  ink, terracotta lettered paper, radius 6, Chakra Petch. The frame's chips 3–6 name other
  schemes' inks that happen to be those two. The 768 instance is the `Theme=Lime` leak (olive
  and lime), not followed; the row is drawn as 1440's. Five chips to the frame's six
  (`TAG_LABELS`), the named diff every template carries.
- **`vm.pad`'s layout-3 arm takes the bio under Editorial**: top 50 / 50 / `padY`, foot 30,
  joined as `|| (T.name === 'Editorial' && cat === 'bio')`. Editorial's `left column` pads
  50 / 10 with gap 80 at 1440 and 768, Grunge's inset for inset. Media and the calendar join
  in their sessions; until then the heads part (canvas: the bio's h2 86 below its row top, the
  calendar's "Book Me" 80).
- **Measured against the masters' content edges** (harness, `column=left` at desktop; the
  frame's number × 0.82 in brackets):
  - **desktop:** the root's top 41 (41). Card top 65.6 under the head (80 × 0.82). Photo 24.6
    in, 659.8 × 311.6 in the 709 column. Name floor, the first label and the first value at
    722.5 / 649.9 / 682.2 (722.5 / 649.5 / 681.5). Rule 761 (761.1), about band 780.9 (780.9).
    Sparkle (31.4, 867.8) 88.6 × 89.4, exact. Tape centre (344.15, 273.45) against (344.1,
    273.4). Card 726.7 against 723.2, the seeded prose.
  - **768** (with the override): head 47.6 / 65 tall (48 / 65). Photo 648 × 380. Label and
    value at 606.3 / 643.3 before the 50 (606 / 643). Rule 725.6 (726), sparkle (38.3, 855.6)
    (856), tape bbox top 97.6 (98), all before the 50.
  - **390:** card 117.8 at −10, 390 wide (118). Photo (0, 127.8) 370 × 259 (128). Name 396.8
    (397). Label 465.6 (466), value 502.6 (503). Rule 576.8 (577), about 597.8 (598). Sparkle
    (280.9, 174.4) (174.6). Tape bbox (106.8, 91.9) (106.84, 92.08). All 6 higher on the page,
    `padY` 44 against 50, Lime's arm.
- **Named diffs**:
  - "KAI MERCER" wraps in the 179 cap at 768 (186 wide at 36 in Noto), as would the frame's own
    "SIENNA VALE" (197). Fisterra's is 179. The floor is 96, so nothing moves.
  - The values run one line where the frame's copy hand-breaks "JUNE\n2021", Grunge's diff.
  - The cards run 726.7 / 886 / 720 against 723.2 / 912 / 811, short by the seeded prose.
  - The 768 card stands 50 lower (above).
- **No live control**: `live=1` digests byte-identical to the canvas at all three widths.
- **`FIELDS`: one hint moved, no `in` row.** `scripts/reach.mjs 3` (3,312 renders) now has
  `who.tags` and `who.showTags` reaching bio layouts **2, 3 and 4**, so `FIELDS.header.tags`'
  hint reads "(in Lime, Grunge and Editorial, layout 3 as well)". Kicker (all four bios) and
  location (bios 1–3, calendar 4) already said so, and the header's own rows are section 1's.
  The sweep's CLAUDE.md pass owes the same word in "Lime's and Grunge's 3".
- **Verified in the builder**:
  - `scripts/page-check.mjs Editorial 2`: four modal cards. At 1440 the bio and the calendar
    stand at top 901, media under the bio at 2318. Every nav, fragment and footer link scrolls
    to its id. No errors or warnings; `overflow390` 0; the 390 burger opens 1 → 5.
  - A one-off (deleted) measured the composed grid at **708.7 : 334.5 on the 1180 canvas** and
    **864.8 : 408.2 in the published 1440 tab**. Both are 858 : 405 (2.1185), and 864.8 + 55 +
    408.2 = 1328 = 1440 − 2 × 56. The plan's 621 : 293 and 684 : 323 predate JP-038's inset.
  - The bio carries the tape, the sparkle and the square dashed card on both surfaces. The
    calendar beside it is still Retro's arm in Editorial tokens (section 5's).
- **Digest**: themes 0, 1, 2 and 4 zero files of 660, canvas and `live=1`; theme 3 exactly bio
  arch 2 at three widths on both surfaces (6 files).
- **For the sweep**: the stale 684 / 323 lives in the plan files alone. That covers this plan's
  *What the pass must deliver* (item 2) and *The second session*, and CONVENTIONS D3's lead-in
  ("the composed row's 684 / 323 columns"); CLAUDE.md's composed-row bullet states no width.
  `contentWidth()` gives 709 / 334.5 at desktop, the columns measured above, so
  `vm.contentW` (the media meter's bar count) is already right. Correct the prose to 709 : 334.5
  on the canvas and 864.8 : 408.2 published.

### Settled in section 3 (the media player)

- **The block widened whole: `if (s.limeTree)` inside `Media`'s `if (s.v2)`, after `nHot`,
  `const ed = s.editorial`**, with a third `G` arm and two new keys (`hot`, `ink`) read
  through `?? s.ac` / `?? s.tx`, so the twins' arms are byte-identical. The walk (bindings with
  their collections, all three widths) found the twins' tree node for node — the card's 24 / 16 /
  96 / 44 boxes and 2-gap name columns, the counter's 16 padding, the rows' 14 padding, 20 gap
  and 64 sleeve, no gap between the counter and the first row — on **Scheme 1 with the audio
  card's instance on Scheme 2**, no Device override, no effect on any node. The hooks sit above
  the branches, so the published player needed nothing.
- **The card is `s.onScheme[2]`**, every leaf a binding:
  - the `Card` fill binds **`sem/box/1`** `#BAA499` (the twins' `box/3`), with **no radius, no
    stroke** (Lime 50, Grunge 15 in a red ring). The instance root carries no fill;
  - the played bars bind `sem/text/1`, **paper** (`S2.ac`); the idle bars *and* the disc bind
    `sem/box/2` `#D0BCB2` (`S2.box2` — Lime's disc is `box/1`, so `dusk === disc` here, as the
    frame draws it);
  - every card ink, the ▶ included, binds `sem/text/2` (`S2.tx`, ink — the same value as the
    section's `s.tx`, read through the card's scheme all the same).
  `S2` is `ed ? s.onScheme[2] : null`: `onScheme` is undefined off Editorial.
- **The list is the page's, and its rules are the other way up**: the counter row and all five
  rows are stroked `0/0/1/0` INSIDE, dashed 10, 10 in `sem/stroke/2` terracotta (Scheme 1's, so
  `s.stroke2`) — `DashRule` at each one's foot, the row `position: relative` under `ed`, and
  Lime's `inset 0 1px 0` hairline dropped. So a rule stands under the counter and under the last
  row (six at five tracks, one at none), layout 2's media finding. The downscaled render reads
  them grey; a pixel read of the 1440 render gives `(200, 110, 82)` on 392 of 858 columns.
- **Type**: Display/Title binds `size/title`, Sienna Vale's **32 × 0.82 / 25 / 23** (layout 2's
  `tk`), uppercase; the card's names `size/list` (`s.list`), uppercase; the eyebrow Label/XS in
  Chakra Petch, ink; every other size the ramp's token, as the twins read it.
- **The head keeps the frame's 632.2 box at 1440 and 768** (`maxWidth: ed ? u(632.156)`; the
  twins cap desktop alone). At 390 the 370 column is the measure. Noto breaks each master's
  way: **FIVE WORTH / YOUR EAR.** at 1440 (518.4 box at 97), **FIVE WORTH YOUR / EAR.** at 768
  and 390 — the 768 and 390 masters' own breaks in Fisterra. Two lines at every width, as the
  user's prompt and the frames say.
- **The meter is 17 of 58 at desktop** against the frame's 17 of 57: `vm.contentW` is the 709
  column, where the frame's 858 × 0.82 is 703.6, so the derived count gains one (JP-038's named
  consequence, *retest-qa-fixes*). 768 draws 14 of 47 and 390 7 of 23, painted from the left
  where the masters centre a leaked 57-bar row and clip it — Lime's named diff.
- **`vm.pad`'s layout-3 arm takes media under Editorial** (top 50 / 50 / `padY`, foot 37 / 47 /
  35), joined as `(cat === 'bio' || cat === 'media')`. The feet were Lime's, measured against
  Lime's repertoire head; **Editorial's frame reads the same distance**: the list's foot stands
  **122 / 90 / 70** above "Curated sets" on all three templates (one `use_figma` over the three
  pairs), with the repertoire's root padding the same 56 / 60 / 60 and the wrapper gaps the same
  66 / 30 / 10. So the feet carry *if* Editorial's fitted repertoire seats its head where Lime's
  does — **section 4 re-checks the gap on the canvas** once its block replaces the flat arm (today
  the flat arm's head is not the frame's). Until section 5, the calendar's "Book Me" stays apart.
- **Measured against the masters' content edges** (harness, `column=left` at desktop; the frame's
  number × 0.82 in brackets):
  - **desktop:** eyebrow 41 (41); h2 44.8 under its top (45.1), 172.7 tall (172.2); card 283
    (282.9), **197.8 tall** (199.3), radius 0, `#BAA499`; counter 505.4 (506.8 less the card's
    1.5), 36.2 (36.1); rows 75.5; sleeve 52.5 at radius 3.3 on `#EDE6DC`; title 26.2px; the
    numerals 13px; the dashes 8.2, 8.2. Section 956.1.
  - **768:** eyebrow 50; h2 47.6 under (48), 129.9 (130); card 207.6 under (208), 236.8 (243);
    counter 474.4 under (474.8 after the card's 6.2); rows 92. Section 1074.4.
  - **390:** eyebrow 44 (`padY`, Lime's arm; the frame's 50); h2 45.1 under (45), 85.4 (86);
    card 160.5 under (161), 236.8; rows 92 with Lime's 14 gap. Section 1009.3.
- **Named diffs, all the twins'**: the card is 197.8 / 236.8 against the stated 243 (its content);
  the rows are content-tall, 75.5 / 92 against the division's 62.3 / 120.8; the clock row reads
  00:00 / the track's length and its right-hand line `track.rel` ("Single"), where the frame types
  1:00 / 2:00 and "Mix 028"; the seeded titles are shorter than the frame's ("Late Lights" for its
  "Late Lights (Original Mix)"); 390's row gap is 14 (the master's 20 clips its own titles).
- **`live=1`** (puppeteer, `--autoplay-policy=no-user-gesture-required`, desktop `column=left`,
  768 and 390): a row click plays that track, its numeral becomes Pause and the disc Pause; a
  second click pauses (Play glyph, ink on paper); the disc plays and pauses again (ink on
  `#D0BCB2`), cursor pointer on both. `n=0` prints the counter over its one rule and *No tracks
  yet.*, no card; `n=8` holds (1183 / 1285 tall, "KM" initials in ink on `#EDE6DC`; its tracks
  carry no audio, so a pick only marks the row). No page errors.
- **`FIELDS.media` moves nothing**: no master has a pill node, so `cta`'s `'*': []` row already
  reads "Not shown in this template"; no `reach.mjs` run was owed.
- **Verified in the builder** (`page-check.mjs Editorial 2`): four modal cards; in the published
  1440 tab the bio and the calendar stand at 901 and media under the bio at 2318, the repertoire
  at 3484; the player's audio plays (the playhead moved); every nav, fragment and footer link
  scrolls to its id; no errors or warnings; `overflow390` 0; the 390 burger opens 1 → 5.
- **Digest**: themes 0, 1, 2 and 4 zero files of 660, canvas and `live=1`; theme 3 exactly media
  arch 2 at three widths on both surfaces (6 files).

### Settled in section 4 (the repertoire)

- **The block widened whole: `if (s.limeTree)` inside `Repertoire`'s `if (s.v2)`, after `arrow`,
  `const ed = s.editorial`**, with a third `G` arm (`seats`, `pad`, `radius`, `rowH`) and four
  `ed` arms — the card's and the rows' inset shadows turned into `DashRule`s, the pager's radius
  and ring, and `disp()`'s uppercase. The twins' arms are byte-identical. The tree is theirs node
  for node (**57 / 57 / 63** against both), on Scheme 1 with the three `set` cards on **Schemes
  4 / 2 / 3** at every width, no Device override, no effect on any node. `get_variable_defs` is
  the ramp (display-lg 118 / 73 / 48, list 24 / 19 / 18, body-lg 16 / 15 / 15, chip 12 / 11 / 11,
  body-sm 12), so every size reads `s.*`. The hooks sit above the branch, so the reveal and the
  pager needed nothing.
- **Every card leaf is a `sem/*` binding in the card's own scheme, so each seat is
  `s.onScheme[n]`** and no literal is owed, where Grunge wrote `#9E1F17`: `box/1` the card
  (`#DA7C5E` / `#BAA499` / `#1D1D1D`), `text/2` its title, songs, times and *View full set →*
  (ink / ink / paper), `text/1` the meta line (paper / paper / terracotta), `stroke/1` its edge
  (paper 56% / opaque paper / paper 56%). No node names another scheme's variable, so trap 4
  has no site here. The ring and the row rules are one binding, so the seat carries no `ring`.
  **Seated by Lime's rendered place, unchanged**: the 390 master centres the taupe card, which is
  seat 1. Driven live at 390 (next, prev, prev wrapping), the colours stay put while the sets
  rotate; the grid's lone *All* card on page 2 is column one's terracotta.
- **The deltas, off the walk**: every card **square** (Lime 50, Grunge 15), padding **24**
  (Grunge's), its edge **dashed 5, 5 all round** (`DashRule side="all"`) and each of its four rows
  dashed 5, 5 at the foot, 1px INSIDE, in the seat's `stroke/1`. The rows divide to **47.25** /
  62.5 / 62.5 (Lime 39 / 57 / 57.5, Grunge 44.5 / 62.5 / 62.5): the desktop card is **380**,
  because the head above it is Fisterra's 105 (118 × 0.89) where the twins' is 116. The head and
  the song titles are uppercase (`faceK` 1, so `facedLh` is the identity).
- **The 390 pager's pills are square, not capsules** — a reversal of the plan (*decorative
  language*: "the rounded things are the pills") and of this session's prompt ("half the rendered
  height, never 999"). Both `pg` nodes state `cornerRadius` 0 where both twins' state 60, and the
  render agrees. So the pills are `DashRule side="all"` at radius 0, dashed 5, 5 in `sem/text/1`
  terracotta (`s.ac`) round an `s.ac` arrow — layout 2's *read the radius before calling a dash a
  capsule*, a second time. The block draws its own two spans, not `Pager`, so `endBox` had
  nothing to say here. The wide pager (a fourth set, `n=20`) is the same square pair.
- **Measured against the masters** (harness, `getBoundingClientRect` from the section root; the
  frame's number × 0.82 in brackets):
  - **desktop:** h2 at 80, 86.3 tall at 97px (86.1); grid 19.7 under it; cards **351.8 × 311.3**
    (352 × 311.6), radius 0, padding 19.7, rows **38.7** (38.7), dashes 4.1, 4.1; section 577.4
    against 509.2, the shared `padY` 80 above and below against the frame's 45.9.
  - **768:** h2 at 56 (60), 65 tall (65); cards **222.7 × 438.3** (222.67 × 439) — the twins'
    named "216 against 222.7" is gone, the column being 708 since JP-038; rows 62.5; section 639.3
    against 648, `padY` 56 against 60.
  - **390:** h2 at 44 (60), 42.7 tall (43); cards 290 × 438.3 at **−260 / 50 / 360** (the master's
    x); pills **180 × 54** at (10, 573) and (200, 573), square, the master's 590 less the head's
    16; section 671 against 704.
- **Named diffs, the twins'**: `s.title` ("12 Songs") where the frame writes "Curated sets"; the
  meta line is the set's count, not a mood and a running time; the right-hand column is the
  artist, not a duration; the section pads the shared `padY` (80 / 56 / 44), not the frame's 56 /
  60 / 60; the card's 438.3 against 439 (its content).
- **JP-044 holds**: `stack = tab` is the shared block's, so at 768 the artist stands under the
  title. No seeded title's ellipsis span overflows at any width (`scrollWidth > clientWidth` on
  none), in the harness and on the published page. The `&n=` rows' deliberate long title still
  ellipsizes at desktop, Retro's harness row.
- **`live=1`** (puppeteer clicks, `n=20`, all three widths): *View full set →* reveals the card's
  seven rows (the link goes); Next turns to the *All* card and Prev back, wrapping both ways; at
  390 the centre card's reveal grows all three seats to 599; cursors pointer. `n=0` prints *No
  songs yet.* in `s.muted`. No page errors.
- **The gap under media, re-measured as section 3 asked — it did not move, and it is not the
  frame's.** Box to box (the media root's lowest content box → the repertoire's h2) the canvas
  gives **117 / 103 / 79** under Lime, Grunge and Editorial alike (published 1440: 142.8), because
  all three repertoire heads stand at the shared `padY` 80 / 56 / 44 and all three media feet are
  37 / 47 / 35. So Lime's feet carry against the twins, which is what section 3 needed. Against
  the frames' 122 / 90 / 70 (100 on the canvas) all three templates run **+17 / +13 / +9** box to
  box. Under Editorial the glyph adds more: Noto's cap top stands 11 / 7 / 4.5 below its box, and
  Fisterra's 3.3 / 2 / 2 in the frames (pixel scans), so the visible gap is **+25 / +18 / +11.5**.
  Grunge's section 4 names the same gap as +19 / −11 / −16 against 133.3 / 128.2 / 109.2: that
  was glyph to glyph (the last list glyph, with the 768 row's ~38 under it, to the head's glyph)
  and before Lime's feet moved; this is box to box. One diff, two referents.
  The `vm.pad` comment's "37 / 47 / 35, measured against the seeded page" therefore no longer
  meets 122 / 90 / 70 for any template; what moved since `7fc68af` was not traced. Named, not
  fixed: a repertoire row in the `d === 2` arm moves all three templates' pages, which makes it
  the sweep's to raise (Grunge's section 4 said the same), not an Editorial-only arm. The comment
  now records the re-check.
- **Verified in the builder** (`page-check.mjs Editorial 2`): four modal cards; the published 1440
  tab stands the repertoire at 3484 under media (2318, 1167 tall), 705 tall; both reveals are
  live; every nav, fragment and footer link scrolls to its id (Repertoire → `#repertoire`); no
  errors or warnings; `overflow390` 0; the 390 burger opens 1 → 5. The repertoire meets the
  gallery's taupe on a straight edge.
- **`FIELDS.repertoire` has no `in` row**, so no `reach.mjs` run was owed.
- **Digest**: themes 0, 1, 2 and 4 zero files of 660, canvas and `live=1`; theme 3 exactly
  repertoire arch 2 at three widths on both surfaces (6 files).
- **For the sweep's CLAUDE.md pass**: nothing in CLAUDE.md names the layout-3 repertoire's
  colours or radii. The plan's *decorative language* radii bullet ("the rounded things are the
  pills (67)") should say the repertoire's pager pills are square.

### Settled in section 5 (the booking calendar)

- **The block widened whole: `if (s.limeTree)` inside `Calendar`'s `if (s.v2)`, after `line`,
  `const ed = s.editorial`**, four `ed` arms and a `lift`, no `G`. The tree is Lime's node for
  node at all three widths (65 nodes; the paired traversal-order diff against `964:68677` found
  only leaves), on **Scheme 1** with the foot pill's own explicit Scheme 1 — the identity — no
  Device override and no effect on any node. `get_variable_defs` is the ramp at all three
  (display-lg 118 / 73 / 48, display-sm 45 / 36 / 30, body-lg 16 / 15 / 15, body-md 14 / 13 /
  13, body-sm 12, label-md 20 / 14 / 13, `border/hairline` 1), so every size reads `s.*`. The
  hooks sit above the block, so the published day picking and the pill needed nothing.
- **Every ink is a key the block already reads** — the card `box/1` `#FFF9F2`, the numeral,
  month, year, weekday and day letters `text/2`, the dots `box/2` booked, `text/1` picked and
  `box/1` free, the legend's marks the same fills. The four deltas, off the walk:
  - **the card is square**, dashed **10, 10** in `sem/stroke/2` terracotta, 1px INSIDE, with
    **no** `border/thin` ring: under `ed` it drops Lime's radius and inset shadow, takes
    `position: relative`, and draws `DashRule side="all"` as its last child (8.2, 8.2 on the
    canvas). The binding names the section's own scheme, so `s.stroke2`;
  - **the free dot's ring is `border/hairline`**, 1px of `sem/stroke/1` ink, unscaled at
    desktop (Lime's raw 2.559);
  - **"Book Me" is Display/Title 32 / 25 / 23** in `sem/text/2` at lh 1.1 (Lime's literal 36 /
    28 / 26 — `vm.title` shadows the ramp), and `disp()` uppercases under `grunge || ed`;
  - **the pill is Scheme 1's own**: `text/1` terracotta lettered and disced in `sem/bg` paper
    round a terracotta arrow, which is `BookPill`'s Lime-branch defaults exactly (`pillBg` is
    Scheme 1's `activeBg`, the face `s.bg`), so Lime's `fg={s.box1}` is not passed — it would
    have given `#FFF9F2`, near enough to pass unnoticed. Its label binds **Label/MD** (the twins'
    `size/list`), so `size={s.labelMd}` (16 / 14 / 13) at lh 1.1 through `style`; uppercase is
    `labelStyle`'s. The box is Lime's: 44.3 / 54 / 54 on a 37.7 / 46 / 46 disc, `full` at 390.
- **The numeral and the month are lifted 0.09em** (*Conventions*). Scanned off the three
  renders against their boxes' feet: Fisterra's numeral baseline stands 0.144 / 0.151 / 0.146em
  up and its month's 0.200 / 0.194 / 0.200; Noto's stood 0.053 and 0.097 at desktop, and lifted
  they stand ~0.146 / 0.157 / 0.167 and ~0.179 / 0.221 / 0.233 — each within a pixel of the
  frame. **The J of JUNE**: unlifted, its tail ended at 239 on the canvas and "2025"'s ink began
  at 240. Lifted, it clears by **4 / 7 / 7.5px** against the frames' **14.8 / 15 / 14** (18 at
  1440 × 0.82) — Noto's J descends 0.24em where Fisterra's sits on the line. Named. The lift also
  opens the numeral-to-month gap from 11.5 to 16.9 on the canvas against the frame's 18.
- **Measured against the masters' content edges** (harness, `column=right` at desktop; the
  frame's number × 0.82 in brackets):
  - **desktop** (the 334.5 column): "Book Me" at 41 (41), 28.8 tall (28.7); the card 24.6
    under it at 94.4 (94.3), radius 0, `#FFF9F2`, the dash 8.2, 8.2 in `#C86E52`; numeral box
    86.3 (86.1) at 97px; month box 37 (36.9); the grid 173.3 into the card (173.6); dots 25.2
    (25.2) in a 1px ink ring; pill 44.3 (44.3), disc 37.7 × 36.1, the label 16px Noto uppercase.
  - **768:** "Book Me" at 50 (50), 27.5 (28); card at 107.5 (108); numeral 65 (65), month 36;
    grid 161.2 into the card (161.7); pill 54 on a 46 × 44 disc, the label 14px.
  - **390:** "Book Me" at 44 (40, `padY`, Lime's arm), 25.3 (25); the card 55.3 under the
    head's top (55); numeral 42.7 (43), month 30; pill 54 `full`, the label 13px.
- **Named diffs, all the twins'**: the cards run 459.5 / 509.4 / 481.1 against 427.7 / 471.6 /
  443.6, each the frame plus one dot row (the seeded June runs five weeks where the frame draws
  four); the desktop foot is `padY` 80 against `Frame 300`'s 56 × 0.82 and the 390 top 44
  against 40 (Grunge's *Conventions*, the sweep's to raise); the frame's four booked and seven
  selected dots are filler the section has no model for, and its "11 / Tue" is the seed's
  "12 / Thu"; the dot grid is Retro's seven-column normalisation, where the 768 master spreads
  its rows edge to edge; the legend's ● and ○ are Inter's smaller glyphs where Figma draws
  larger ones, and the frame's "○ Free" carries a stray `box/2` space, not followed. The display
  type renders at Noto's 540, lighter than Fisterra Bold — layout 1's decision 1, every
  Editorial head.
- **The composed row closes here.** `vm.pad`'s `d === 2` arm takes the calendar under
  Editorial, and the three templates fold back into one condition (Lime, Grunge or Editorial,
  and the bio, the calendar or media); its comment says so. Measured in the builder
  (Editorial → card 3): **"KM Bio" and "Book Me" stand at one top — 41 on the 1180
  canvas** (50 × 0.82; "Book Me" stood at 80 before this session) **and 50 in the published
  1440 tab**, the frames' own y 50 in both wrappers, under the zoom. That is the head block's
  first line against "Book Me", as the frames stack it and as Grunge's section 5 measured it;
  the bio's display `<h2>` ("Reads the room.") stands under its eyebrow, at 85.8 / 104.7. The
  columns measure 708.7 : 334.5 and 864.8 : 408.2; the right cell is `sticky` (JP-043).
- **`live=1`** (puppeteer, desktop `column=right` and 390): a dot click moves the numeral, the
  weekday and the pill to *Enquiry About June 21 / Sat*, a second click falls back to the cued
  June 12; the pill is `<a href="#form">` live and a span on the canvas; 30 dots take a pointer
  live and none on the canvas. `&booked=2025-06-12,2025-06-20` drops the numeral and the weekday,
  prints *Pick a date to enquire*, paints both days `box/2` and takes no click on them (28
  pointers). `&open=2025-03-29` opens on March with a sixth row, the 29th lit. **A past `open`**
  (`&today=2025-06-18`) cues nothing and prints `calPrompt`, the 17 days before today take the
  booked look with no handler (13 pointers), and a click on the 25th lights it; the canvas
  ignores `&today`. **This design has no month arrows** (`mi` reaches nothing, Retro's
  *Learned on the booking calendar*), so there were none to drive. No page errors. The
  published 1440 tab reads the real clock (F20), so it opens on September 2026 with the days
  before the 25th dead — the named, accepted diff — and the picked, dead and free dots all read
  on the `#FFF9F2` card.
- **`FIELDS.calendar` moves nothing.** `scripts/reach.mjs 3` (3,312 renders): `heading`
  reaches all four layouts, so the `Editorial: [0, 1, 2, 3]` row written before any layout-3
  card existed holds over the fitted one; `cta` `[0]`, `slots` `[1]`, `image` and `time`
  `[0, 3]`, `types` and `tiers` `[3]`, `open` all four — layout 2's list, unchanged.
- **Verified in the builder** (`page-check.mjs Editorial 2`): four modal cards; the bio and the
  calendar at top 901 in the published 1440 tab, media under the bio at 2318; every nav,
  fragment and footer link scrolls to its id, Book Now to `#form`; no errors or warnings;
  `overflow390` 0; the 390 burger opens 1 → 5.
- **Digest**: themes 0, 1, 2 and 4 zero files of 660, canvas and `live=1`; theme 3 exactly
  calendar arch 2 at three widths on both surfaces (6 files).
- **For the sweep's CLAUDE.md pass**: nothing owed. CLAUDE.md names no layout-3 calendar colour
  or radius, and the composed-row paragraph states no template list; the `vm.pad` code comment
  is already updated.

### Settled in section 6 (the gallery)

- **No block, for the third time: the twins' ternaries through `Gallery`'s `if (s.v2)` widen
  one by one**, `const ed = s.editorial` beside `const grunge`, at the eleven sites Grunge
  named — `sheet`, `ink`, `well`, `ring`, the desktop and 390 halves of `ratio`, the viewer's
  `cream` / `ctlBg` / `scrim`, the head's size and casing, and the tile's border / radius /
  `Photo` ink and well / overlay. The twins' arms are byte-identical. The tree is theirs node
  for node (**17 / 17 / 17** against both, by traversal order: the 56 / 60·30 / 60·20 insets,
  the 32 head gap, `columnGap` 8 with `rowGap` 8 / 20 / 20, the 1px INSIDE ring), on
  **Scheme 2** at every root with no Device override, **no effect and no dash on any node**.
  One walker call and one paired diff were the whole read, and the diff was leaves alone —
  four against Grunge (the head's size, the tile's height at 1440, its radius and the ring's
  binding) and three against Lime, whose ring binds the same `scheme/1/stroke/1` (every fill
  binds the twins' names). The hooks sit above the branch, so the published viewer needed nothing.
- **The seat does the paint** (`get_variable_defs`, all three widths): the sheet is `sem/bg`
  `#AA958A`, so `ed ? s.bg` ahead of the flat four's `s.paper` (which read the same taupe
  through `paperOf`, by accident); the head `sem/text/1` paper (`s.ac`); each well `sem/box/3`
  **`#A18A7E`**, which is `s.box3` under the seat — a vm key, where both twins wrote a literal.
  The seventh tile's well is `sem/active/bg` blush under its photograph and paints nothing, so
  it is not drawn, the twins' call on the identical slot.
- **Trap 4, the ring.** It names **`scheme/1/stroke/1`** outright, as Lime's does (Grunge's is
  `scheme/1/stroke/2`). Inside the Scheme 2 seat `s.stroke1` is paper, so the ring reads
  **`s.onScheme[1].stroke1`**, ink `#141414`. Kept on the twins' mechanism (a 1px inset
  `boxShadow` on a last-child overlay), unscaled.
- **The deltas**: every tile **square** (Lime 30, Grunge 15); the head **`s.dispLg` at every
  width**, 97 / 73 / 48 in a 86.3 / 65 / 42.7 line box, uppercased (the flat arm stood 768 on
  Retro's `s.h1`, 60); the desktop tile **326 / 174.667** — the residue rule over this page's
  105 head, (789 − 112 − 105 − 32 − 16) / 3 — and the 390 one **111.333 / 83**, Grunge's number
  over this page's own 587, (587 − 120 − 43 − 32 − 60) / 4. 768 states the same 660 grid.
- **The tiles keep the twins' centred cover.** The frame's third tile holds our stage shot
  (`9d20fe0d`) at `FILL` — centred at every width, its stale `imageTransform` ignored — and our
  first slot, the same photograph in the same box, is that picture exactly. Its one `CROP` is
  our hero (`ae069c14`) at 1440 alone, top-anchored and within 2.8% of a cover, in its eighth
  tile, a seat we do not draw, and `FILL` centred at 768 and 390. Not followed: the seven
  seeded slots stand (open question 3), and an anchor keyed on a slot index would bind the
  artist's uploads to a crop meant for one photograph.
- **The viewer is re-inked a third time.** The twins' reading — the page ground at .94 under
  its pale ink — inverts here, where `s.tx` is ink: widened as written it would put ink
  controls on an ink scrim. So the scrim is **the page ink `#141414` at .94** (Grunge's
  reading) and the controls and counter **`s.ac`**, the head's own paper under the seat, on
  paper at 14% — not Retro's `#FBF6EA` fallthrough. No frame draws a viewer, so this is the
  palette's reading of a QA-added control, as it was for Lime and Grunge.
- **Measured against the masters' content edges** (harness; the frame's number × 0.82 in
  brackets): **desktop** inset 45.9 (45.9), h2 at 45.9, 86.3 tall at 97px (86.1), grid top
  158.4 (158.3), tiles **267.1 × 143.1** (267.3 × 143.2) on a 273.7 / 149.7 pitch (273.9 /
  149.8), radius 0, ring `inset 0 0 0 1px #141414`, wells `#A18A7E`; **768** h2 at 60, 65 tall
  (65), grid top 157 (157), tiles 230.7 × 150 on a 170 row pitch — exact; **390** h2 at 60
  (60), 42.7 (43), grid top 134.7 (135), tiles 111.3 × 83 on a 103 pitch — exact. The seeded
  head "SEE US IN ACTION" holds one line at every width (1088 / 708 / 350).
- **Named diffs, the twins'**: the sections are **497.1 / 707 / 483.7** against 647 (789 ×
  0.82) / 877 / 587, the frame's twelve tiles against our seven (`FIELDS.gallery.images` is
  `max: 7`); the head prints `heading`'s "See us in action" where the frame writes "Gallery";
  the display renders at Noto's 540 where the frame names Fisterra Bold (layout 1's decision 1,
  every Editorial head).
- **`live=1`** (puppeteer clicks, desktop and 390, DPR 2): a tile click opens the viewer at
  3 / 7 with focus inside, `overflow: hidden` on the popup's `<html>` and `<body>` and a stable
  gutter; Next steps to 4 / 7, → to 5 / 7, ← back to 4 / 7; Escape closes and restores all
  three styles; reopened on slot 1, a click on the scrim closes it. Scrim `rgba(20, 20, 20,
  .94)`, the three controls `rgb(246, 240, 232)` on `rgba(246, 240, 232, .14)`, the counter
  paper — reading on the ink surround over the taupe band. Every seeded tile takes `zoom-in`.
  **`&n=0`** at all three widths: seven `#A18A7E` wells in ink rings with **ink `KM`** initials
  at 32 / 28 / 14 (`Photo`'s `ink` is `s.tx`, the twins' key, which is ink here — 5.6:1 on the
  well, where paper would be 2.9:1), `cursor: auto`, no viewer. No page errors or warnings.
- **`FIELDS.gallery` has no template-keyed `in` row** (`youtube` / `instagram` / `tiktok`
  `[0]` for every template), so no `reach.mjs` run was owed — layout 2's and Grunge's finding,
  re-checked.
- **Verified in the builder** (`page-check.mjs Editorial 2`): four modal cards; the published
  1440 tab stands the gallery at 4189, 607 tall, under the repertoire (3484 · 705) and over
  pricing (4796); every nav, fragment and footer link scrolls to its id (the footer's Media →
  `#gallery`), Book Now to `#form`; no errors or warnings; `overflow390` 0; the 390 burger
  opens 1 → 5. The seam clips show straight edges paper → taupe → paper at 1440 and 390, the
  sheet bled to the page's edges.
- **Digest**: themes 0, 1, 2 and 4 zero files of 660, canvas and `live=1`; theme 3 exactly
  gallery arch 2 at three widths on both surfaces (6 files).
- **For the sweep's CLAUDE.md pass**: the layout-3 viewer sentence ("under Lime and Grunge
  alike its scrim is the page ink at .94 and its controls pale") holds for Editorial too — the
  page ink `#141414`, the controls paper — so it reads "under Lime, Grunge and Editorial".
- **For pricing**: it stands on the page's paper in the instance's own 1px `stroke/1` ink ring
  (Grunge's overlay, gated `grunge &&` in the block today — widen it from the frame), with
  plain rows dashed 10, 10 terracotta and
  **square**, and the featured row a nested **Scheme 3** node — `s.onScheme[3]`, never the
  seat's keys, and read each of its leaves' bindings with their collections (trap 4 twice now:
  the header's and this ring). Its block has Grunge's nine-key `G` at its head, so Editorial is
  a third arm; `vm.pad`'s `d === 2` pricing foot of 32 is Lime's and Grunge's and waits for the
  frame's number; and check the toggle's pick against the frame before inheriting the twins'
  redraw (layout 2's *a twin's redrawn state is read against this frame*).

### Settled in section 7 (pricing)

- **The block widened: `if (s.limeTree)` inside `Pricing`'s `if (s.v2)`, after `shown`, `const
  ed = s.editorial` and a third arm in Grunge's nine-key `G`**, the twins' arms byte-identical,
  plus five `ed` sites (the rows' and the empty box's `DashRule` in place of the inset ring, the
  heading's size, `disp()`'s uppercase, the numeral's lift, the instance ring). The walk (three
  masters, bindings with their collections) found Grunge's tree node for node, **115 / 115 /
  115**, on **Scheme 1** with the featured `row` nested **Scheme 3**, the page's Device at every
  width, no effect and no rotation on any node. **The paired diff against Grunge's 1440 master
  was three leaves**: the rows' radius (0 against 15), their stroke (1px INSIDE, dashed 10, 10,
  against solid), and the ramp's sizes (display-md 64 / 45 / 36, title 32 / 25 / 23) — every
  binding *name* the same. So the 28 padding and the 248 includes panel are Grunge's, the
  capsule, the 24 / 12 / 14 / 16 / 40 / 10 / 6 boxes and the badge's 3 / 8 on a 4 corner too.
  `get_variable_defs` is Sienna Vale's ramp at all three (body-md 14 / 13 / 13, body-sm 12,
  body-lg 16 / 15 / 15, list 24 / 19 / 18, label-xs 20 / 14 / 12, chip 12 / 11 / 11, eyebrow
  15 / 12 / 11), so every size reads `s.*` but Display/Title, the literal `u(32)` / 25 / 23
  (`vm.title` shadows the ramp). The hooks sit above the block, so the published filter, the
  moving FEATURED seat and the Book pills needed nothing.
- **The featured row is `s.onScheme[3]` leaf by leaf** (`S3`, null off Editorial), where the
  twins wrote Scheme 3 as `s.ac` and literals: its fill `sem/bg` **ink** (`featBg`, a new key
  read `G.featBg ?? s.ac`), its dash `stroke/2` **blush**, every ink on it `text/2` **paper**
  (the name, the `£`, the unit, the blurb, the includes column), the numeral `text/1`
  **terracotta**, the badge `box/1` `#1D1D1D` lettered `text/2` paper. No leaf names another
  scheme's variable, so trap 4 had no site here. A plain row is the page's `sem/bg` paper dashed
  in `sem/stroke/2` terracotta — `s.stroke2`, the seat's own.
- **The pills, off the bindings.** A plain row's is `text/1` terracotta lettered and disced in
  `sem/bg` paper round a terracotta arrow — `BookPill`'s Lime-branch defaults exactly. The
  featured row's is the same three bindings in Scheme 3: terracotta lettered and disced in
  **ink**, so `bg={S3.ac} fg={S3.bg}` through two new keys (`featPillBg` / `featPillFg`, read
  `?? s.bg` / `?? s.ac`), where the twins turn the section's pair round.
- **The capsule needed nothing**: `sem/box/1` `#FFF9F2` in a 1px `sem/stroke/1` **solid** ink
  ring at `radius/pill`, the pick `sem/text/1` lettered `sem/bg`, the idle options `text/2` —
  the twins' five keys to the node. The prompt's worry was layout 2's: the twins' *layout-3*
  capsule never redrew its pick in `sem/active`, and the frame's pick is visible and identical.
  It carries no dash, so no capsule radius was owed.
- **The instance ring is drawn**: the root binds `sem/stroke/1` 1px INSIDE, solid, on all three
  masters, and the render shows it round the whole section, ink on the paper page — Grunge's
  overlay, widened to `grunge || ed` (Lime alone still declines it). It stands between the
  gallery's taupe and the map's band, so nothing doubles.
- **The numeral is lifted 0.09em** (*Conventions*, extended). Lowest ink rows, `£` against
  numeral: the frames stand the numeral **7 / 3 / 1** above the `£` (1440, 768, 390; 5.7 on
  the canvas); unlifted, ours stood it −0.5 / −2.5 / −1.2 (level at desktop, below narrow);
  lifted, **4.5 / 1.5 / 2.0**. The name beside the FEATURED badge (centred, 1.8px at
  desktop) and the pills' display labels were not lifted.
- **`vm.pad`'s `d === 2` pricing foot takes Editorial**: the three masters pad 56 / 30 / 60 at
  the head and **32 / 32 / 60** at the foot, the twins' own, so the arm is three templates'.
  390 keeps its `padY` 44 under the master's 60, the twins' named diff.
- **Measured against the masters' content edges** (harness, DPR 2; the frame × 0.82 in
  brackets): **desktop** heading 26.2px, 28.8 tall (28.7); rows **1088.2 × 211** (1089 × 211.6)
  13 apart (13.1), padding 23 (23), radius 0, dashed 8.2, 8.2; includes 560.5 into the row
  (560.9), 504.7 wide (505.1); badge **60.8 × 15** (60.7 × 14.8); numeral 52px; pill 44.3 tall;
  foot 26 (26.2); the offer 11.5 right of the capsule (11.5). **768** rows 708 × **225.4**
  (226), includes at 432 (432) and **248** wide; the numeral fills, standing the unit at the
  column's edge; foot 32. **390** rows 370 × **313.9** (314) / 352.1 / 337, the pill 54 `full`.
- **Named diffs**:
  - **the 390 rows are 370 wide against the frame's 350** (JP-038's `padX` of 10 against the
    root's 20), so the second row's *Peak-time dance floor* and the featured blurb hold one
    line in our 314 column where the frame's 294 wraps them: 352.1 / 337 against 367 / 352.
    The twins' 390 carries the same width now; Grunge's "exact" 346-wide rows predate JP-038;
  - the twins': the section's top pad is the shared `padY` 80 / 56 / 44, not 56 × 0.82 / 30 /
    60; the seeded intro is one line and the heading is the artist's; the pill reads *Book Now*
    (`cta1`), 159.4 wide against *Book*'s 114.8; the unit is `/event` where the frame types
    "— £1,400"; the capsule carries the leading *All* (172 against 135 wide); sections **923.7
    / 977.7 / 1326.3** against 909.4 / 975 / 1383;
  - the frame's "450" renders "£ ✱50" in the demo face (open question 6); the seed prints
    £450 in Noto;
  - the display renders at Noto's 540 against Fisterra Bold (layout 1's decision 1).
- **`live=1`** (puppeteer clicks, desktop and 390): every chip filters and moves the pick
  (terracotta lettered paper); **the FEATURED seat follows the filter** — Solo seats The
  Wedding Set, Trio and Band The Festival Set, All back to The Festival Set — ink dashed blush
  wherever it lands; the pills are `<a href="#form">` live and spans on the canvas. **JP-048**
  (`&cj=`, the seed with The Festival Set ticked plus a name-only *The Late Set*): FEATURED
  stays on The Festival Set, Solo moves it to The Wedding Set (the tick filtered out), and
  without the tick The Late Set takes it. **JP-046**: `offer` stands 14 right of the capsule;
  emptied, it drops alone; with untagged packages the capsule goes and the line stays. `n=0`
  prints *No packages yet.* in ink in a terracotta-dashed row, no capsule; `n=1` seats
  nothing; `n=8` seats row 8. No page errors or warnings.
- **`FIELDS.pricing` has no template-keyed `in` row** (`heading` `[0, 1, 2]`, `intro` and
  `offer` `[2]`, `quote` `[1]`, `rowCta` `[3]`, `PRICING_CARD` / `PRICING_CREDIT` flat), so no
  `reach.mjs` run was owed — the twins' finding, re-checked.
- **Verified in the builder** (`page-check.mjs Editorial 2`): four modal cards; the published
  1440 tab stands pricing at **4796 · 1127** under the gallery (4189 · 607) and over the map
  (5923); all three Book Now pills scroll to `#form`, the chips are live; every nav, fragment
  and footer link scrolls to its id (Pricing → `#pricing`); no errors or warnings;
  `overflow390` 0; the 390 burger opens 1 → 5. The seam clips show straight edges, taupe onto
  the ink-ringed paper and the ring onto the map band (still the flat arm's ink sheet, section
  8's).
- **Digest**: themes 0, 1, 2 and 4 zero files of 660, canvas and `live=1`; theme 3 exactly
  pricing arch 2 at three widths on both surfaces (6 files).
- **For the sweep's CLAUDE.md pass**: the pricing paragraph's "**Lime's and Grunge's stacks
  read no `vm.tierRow`**" is now three templates' (the widened block reads Retro's `T`,
  `chipType`, `h`, `panelFg` and `selector` not at all); and its picked-chip sentence ("redrawn
  in `sem/active` under Lime and Grunge") is layout 2's, which layout 3 does not share. Not
  written here.
- **For the map**: its block (inside `EventsMap`'s `if (s.v2)`, after `litRow`) carries Grunge's
  `G` of some twenty keys, **Lime's one `ink` split five ways** (idle type, lit fill, the type
  on it, a box on it, its ink) — read each against Sienna Vale's Scheme 4, where `s.ac` is
  **paper** and `s.stroke2` **ink** (trap 5). The band is the seat's (`G.sheet` undefined, the
  root paints terracotta). **The lit row is the frame's own** — `text/1` paper, dashed 10, 10
  all round in `stroke/1` paper 56%, its type `sem/bg` terracotta — so it is followed, not
  redrawn; the panel is `s.onScheme[3]`, square, its container dashed paper 56% (r20 narrow),
  and **the viewport is Scheme 4, the seat's own** (terracotta rings and labels, ink idle
  dots). The date boxes carry display months — mind Noto's J (`&cj=` with a June gig). And
  session 0 found the 390 pager's arrows ink on the flat arm's ink sheet: the block replaces
  it.

### Settled in section 8 (the events map)

- **The block widened: `if (s.limeTree)` inside `EventsMap`'s `if (s.v2)`, after `litRow`,
  `const ed = s.editorial`, `S3` off `s.onScheme[3]` and a third arm in Grunge's `G`**, the
  twins' arms byte-identical: Grunge's nineteen keys plus eleven Editorial leaves read through
  `??` (`title`, `head`, `venue`, `rule`, `panelInk`, `statusBg` / `statusFg`, `arrow`, `acc`,
  `dot` / `dotOp`), and a handful of `ed` sites — `disp()`'s uppercase, the date box's and the
  lit row's square corners and the lit row's padding, four `DashRule`s, the panel title's
  lift. The tree is Grunge's node for node, **141 / 142 / 83** by traversal order (one paired
  diff per width), on **Scheme 4** with `radius-map` nested **Scheme 3** and `Map Viewport`
  explicitly **Scheme 4**, the seat's own, at every width; no Device override, no effect on any
  node. `get_variable_defs` is Sienna Vale's ramp at all three (title 32 / 25 / 23, list 24 /
  19 / 18, label-xs 20 / 14 / 12, body-md 14 / 13 / 13, body-sm 12, chip 12 / 11 / 11, eyebrow
  15 / 12), so every size reads `s.*` but Display/Title, the literal (`G.title`; `vm.title`
  shadows the ramp). The hooks sit above the block, so the filter, the featuring, the pager,
  the zoom and *See all gigs* needed nothing.
- **Trap 5, read leaf by leaf: under the Scheme 4 seat Grunge's five-way split is the frame's
  bindings.** The paired diff was leaves: the head and the idle venues bind `text/1` (paper)
  where Grunge's bind `text/2`; every `stroke/1` is paper at 56% (Grunge's 15%); the rows'
  foot rule is `stroke/2` **ink dashed 10, 10** where Grunge's is solid `stroke/1`; the date
  boxes, the lit row, the panel and the container are **square** (Grunge 999 / 999 / 15 / 8);
  the lit row pads 14 / **10** / 14 / 10 (Grunge's right 29) and is stroked all round, dashed;
  the panel binds `box/1` (Grunge's `box/2`); the viewport carries its Scheme 4. Every other
  binding *name* is Grunge's, so its keys land on the frame: the lit chip and the lit row fill
  `text/1` paper (`lit` = `s.ac`) under `sem/bg` terracotta type (`litFg`); the date box keeps
  `box/1` `#DA7C5E` in its paper-56 ring (`disc`, `hair`) and letters `text/1` on the lit row
  (`litBoxFg`), whose hour chip fills `sem/bg` (`litBox`); *See all gigs* is `text/1` paper
  lettered and disced `sem/bg` round a paper arrow (`pillBg` / `pillFg`, `BookPill`'s Lime
  branch); the 390 pager's two capsules (radius 60) ring and letter `text/1` (`pagerInk`,
  through `Pager`'s `frame.lime`). The idle type — the eyebrow, the place lines, the hour
  chips, the date numerals, *Tickets →* — is `text/2` ink (`ink` = `s.tx`).
- **The panel is `S3`**: `radius-map` and its container both `box/1` `#1D1D1D` (`panel`,
  `mapBox` — one value, Lime's case again); its type `text/2` paper (`panelInk`, which the
  title, the city at .7, *Updated* at .6, the data bar and EXPAND VIEW inherit); the **status
  pill `sem/bg` ink, lettered and dotted `text/1` terracotta** (`statusBg` / `statusFg` — the
  twins' `s.ac` / `s.bg` turned round by the scheme); the container's ring and the bar's top
  rule `stroke/1` paper 56% **dashed 10, 10** (`DashRule side="all"` at radius 0 / 20 / 20, and
  `side="top"`, 8.2 on the canvas); EXPAND VIEW's arrow `sem/bg` ink on `#1D1D1D`, faint — the
  frame's own, followed as layout 2 followed its taupe arrow and Grunge its red one (`G.arrow`,
  reversible in one line).
- **The viewport is Scheme 4, the seat's own**: everything the twins draw in the accent binds
  `sem/bg` terracotta — the three rings (1 / 1.5 / 2 at .3 / .5 / .8, the outer dashed 4, 4,
  unchanged), the ring labels under `text/2` ink type, the centre head and its tail (`G.acc`,
  layout 2's key) — and the head's 2px ring and glyph are `text/2` ink; the zoom buttons are
  `box/2` `#EF9173` in a paper-56 ring under ink glyphs (`zoom`, `hairP`: Scheme 4's `stroke/1`
  and Scheme 3's are one value). The plate stands a fourth time: `e089bd11` at `FILL`,
  (41, 42, 27) between the roads.
- **The frame's idle dots vanish by the scheme, so they are redrawn** (*Conventions*, new
  bullet). They bind `text/2` at .6, which this viewport resolves to ink: (28, 29, 23) on the
  plate's (41, 42, 27), sampled at all five seats — Lime's *invisible, so redrawn*, not layout
  2's *follow*. The redraw keeps the frame's .6 and takes `text/1` paper (`dot`, `dotOp`),
  which is what the same node drew under layout 2's Scheme 3 viewport. **The lit pin**, which
  no frame draws, is Grunge's keys unchanged: the accent — paper, the lit row's own fill — at
  14 in a 2px `s.tx` ring, ink here and the centre head's own ring binding. It reads on the
  plate, and the ring parts it from a terracotta ring it crosses.
- **The lit row is the frame's, followed**: `text/1` paper, square, dashed 10, 10 all round in
  `stroke/1` paper 56% — invisible on the paper, drawn anyway (at the canvas's fractional
  right edge, 1130.8px at DPR 2, its dashes show as a one-device-pixel fringe). The row above it
  drops its foot rule, as the frame's does and the twins' rule already did.
- **Noto's J, and the lift, measured.** The prompt's site does not exist: the date box's month
  is Inter `Label/XXXS` 7 on all three masters, so no display month stands in this section. The
  display sites are the row venue over its place line (3 apart, lh 1.2) and the panel title over
  its city (4 apart, lh 1.1). The frame's glyph floors, read off `absoluteRenderBounds` against
  each text node's box: the venues **0.28em** up the box (0.271 on the line box), the title
  **0.238** (0.244). Ours, row-profiled at DPR 2: the venue **0.273** (0.252 at 768) — level —
  and the title **0.170 / 0.172 / 0.178**, 0.07em low at every width, its gap to the city 9.5 /
  8.3 / 8.1 frame px against 11.6 / 9.7 / 9.7. So **the title alone is lifted, by the measured
  0.07em**, not the 0.09 the calendar and pricing took: it stands 11.9 / 10.5 / 10.2. With
  `&cj=` "Jam Jar Joinery" the row's J ends 0.8–1px inside its own box, clear of the place line,
  and the featured title's J hangs 1–1.5px past its box into the gap, clear of the city.
- **Measured against the masters' content edges** (harness, DPR 2; the frame × 0.82 in
  brackets): **desktop** h2 at 64.8 (64.8), 28.8 tall at 26.2px (28.7); chips 108.4 (108.2);
  rows 68.9 (68.9), the lit row's box 8.2 in (8.2); panel (614.6, 45.9) **519.5 × 574.1**
  (615, 45.9, 519.9 × 574.8); status pill 82.3 × 19.8 at 72.1 (82 × 19.7 at 72.2); h3 at 101.7
  (101.7); container 467.1 × 423.8 (467.4 × 423.9) at radius 0; viewport 386.8 (387); bar 37
  (36.9); section 665.8 (666.7). **768** h2 at 78.8 (79), 27.5 (28) at 25px; chips 124.3 (125);
  panel at (399, 56); status 94.3 × 23; h3 at 103 (103); container radius 20; viewport **315 ×
  517**, exact. **390** h2 at 82.8 (83), 25.3 (25) at 23px; chips 126.1 (126); pager 54; pill
  370 × 54; panel 370 × 358.6 (360); container radius 20; viewport **350 × 161**, exact; bar
  65.8 (67). The published 1440 tab stands the map at **5923 · 813** — the frame's 813.
- **Named diffs**:
  - **768: the frame's own venues wrap** — Fisterra breaks HIDDEN WAREHO / USE in the 107
    column beside *Upcoming* and *Tickets →*, so its rows run 117 / 94 / 84 / 94 / 84 / 84 and
    the section 858; ours hold one line (the hour chip is narrower, and no seeded gig carries a
    link), 84 each, 824.6;
  - **390: the frame's row carries *Tickets →* and an *Upcoming* chip under it** (123); ours is
    84 — the hour after the city (the twins' 390 call) and no *Tickets →* on an unlinked gig
    (JP-045) — so the section is 839.5 against 883;
  - the twins': the chip row is Retro's normalisation (the lit *All* at Body/SM, 22.2 against
    the frame's Body/MD 25.4), so the list stands 3 / 4 / 3 higher; the 768 data bar wraps the
    seeded line (61.6 against 45); the head prints `vm.title`'s "Manchester" where the frame
    writes "Where I'm playing."; the chips are the gigs' cities, the hour stands in the
    *Upcoming* chip's seat, and the weekday and the ↗ are dropped (JP-045's *layout 3 drops the
    frame's second ↗*);
  - *SEE ALL GIGS* is 175.3 wide in Noto against 169.7; the display renders at Noto's 540
    against Fisterra Bold (layout 1's decision 1). *Updated 2m ago* at .6 is the frame's own
    opacity here (Grunge named Lime's .6 against its full-strength frame).
- **`live=1`** (puppeteer clicks, `n=30`, 1440, 768 and 390): a row click lights its row, moves
  the lit pin and features its gig (row 3 → *Venue number 3*); a pin click does the same back
  (pin 1 → row 1); the Leeds chip filters to its ten and All restores the pick; two `+` clicks
  scale the layer to 1.5625; the pager turns to #6–10 and the panel follows; *See all gigs*
  lists all 30 with the pager gone (and at 390 the lit row appears, paper, square, once there
  is more than one row). Lit row `rgb(246, 240, 232)` under terracotta, lit pin paper in a
  `0 0 0 2px #141414` ring, idle pins paper at .6. `n=0` prints *No dates yet.* in ink on both
  sides, no chips, pins or pager; `n=1` draws no chip row, no lit row and no pager. No page
  errors or warnings.
- **JP-045 and JP-040.** `&cj=` of three gigs — `tix.example.com/a`, `''` and the refused
  `foo` — draws exactly one *Tickets →*, a `SPAN` on the canvas and an `<a href>` live, on the
  linked gig; at `n=30` every linked row carries its `<a>` and no other row one; no ↗ anywhere
  (layout 3 draws none). The four JP-040 seats — the status pill, *Updated*, the ring labels,
  EXPAND VIEW — are the twins' own reads of `vm.mapStatus` / `mapUpdated` / `mapRings` /
  `mapExpand`, drawn at every width.
- **`FIELDS.map` has no template-keyed `in` row** and the block reads only the twins' keys, so
  no `reach.mjs` run was owed — sections 4, 6 and 7's finding.
- **Verified in the builder** (`page-check.mjs Editorial 2`): four modal cards; the map at 5923
  · 813 in the published 1440 tab between pricing (4796 · 1127) and the form (6736), and at
  5741 · 839 at 390; four of the control probe's six clicks move the section, the other two
  idempotent (the lit *All* chip and the lit first row's place line); every nav,
  fragment and footer link scrolls to its id (Gigs and Shows/Coverage → `#map`), Book Now to
  `#form`; no errors or warnings; `overflow390` 0; the 390 burger opens 1 → 5. The seam clips
  show straight edges at 1440 and 390: pricing's ink ring onto the terracotta band, the band
  onto the form's paper.
- **Digest**: themes 0, 1, 2 and 4 zero files of 660, canvas and `live=1`; theme 3 exactly map
  arch 2 at three widths on both surfaces (6 files).
- **For the sweep's CLAUDE.md pass**: Editorial's paragraph (*Its live states are redrawn where
  its frames draw none*) owes layout 3's map — the lit row the frame's own and followed, the
  idle dots redrawn paper at .6 because the scheme hid them, the lit pin paper in an ink ring;
  and CONVENTIONS C's *Retro's live states vanish… redraw them* row an Editorial layout-3 cell
  for the dots. The events-map paragraph states no layout-3 template list.
- **For the form**: its block is `if (s.lime || s.grunge)` inside `EnquiryForm`'s `if (s.v2)`,
  after `up`, with no `G` (Grunge's section 9: no `G`, not one named hue), so expect `ed` arms,
  and a `G` only if the leaves pile up. It stands on **Scheme 1, paper, no band**: the card and
  its three boxes square `#FFF9F2`, dashed 10, 10 and **6, 6** in terracotta (a dashed box's
  `DashRule` radius is half its height only where the walk finds a capsule — read it); the head
  terracotta at Display/LG. **`vm.titleWordEms`** (`sectionVm`) is `notoBoldEms` for Editorial
  at every design — layout 1's Bold statement — and this is a Regular head, so key it by
  design (`notoEms` at `d === 2`) or it shrinks about 4.5% too far; UNFORGETTABLE. is 7.387
  Noto ems, ~715 at 97 in a ~501 half column (*Sizes*). **`vm.pad`'s `d === 2` arm** is
  `(T.name === 'Lime' || T.name === 'Grunge') && (cat === 'form' || cat === 'testimonials')`,
  the form's 90 / 60 foot an inner inset: Editorial's form is 589 tall round a 634 × 377 card,
  so measure it, and widen the arm for the form alone (a `cat` split until section 10, the
  composed row's precedent). The refused box is a state no frame draws: check its ring against
  the paper, not the twins' key (*Conventions*, the frame-less bullet), and measure any display
  numeral in the price row for the lift before applying one (*Conventions*, section 8).

### Settled in section 9 (the enquiry form)

- **The block widened: `if (s.limeTree)` inside `EnquiryForm`'s `if (s.v2)`, after `up`,
  `const ed = s.editorial`, and no `G`** — Grunge's section 9 again: every fill binds the
  twins' names, so the deltas are a handful of `ed` arms and the twins' DOM is untouched (the
  box wrapper is `ed ? <div>{el}…</div> : el`, `el` keyed as before). The tree is theirs node
  for node, **27 = 27 at every width against both** (the paired traversal-order diff, six
  pairs in one call), on **Scheme 1** at every root (`Device` the page's, `Scheme 1` explicit
  at 1440 and inherited narrow), **no nested scheme, no effect on any node**.
  `get_variable_defs` is Sienna Vale's ramp at all three (display-lg 118 / 73 / 48, label-sm
  16 / 13 / 12, list 24 / 19 / 18, body-md 14 / 13 / 13, body-sm 12, chip 12 / 11 / 11) but
  Display/Title **32 / 25 / 23**, the literal (`vm.title` shadows the ramp). The hooks sit
  above the branch, so the published boxes, submit, sent card and *Write another* needed
  nothing.
- **The paired diff against Grunge was leaves alone**: the card's and each box's stroke binds
  **`sem/stroke/2`** (Grunge's `stroke/1`), **dashed** — 10, 10 round the card and 6, 6 round
  each box, 1px INSIDE — and both are **square** (Grunge 15 / 999, Lime 50 / 999); the boxes
  are Grunge's **42 / 38 / 37** to the pixel (Sienna Vale's Label/SM is Static Youth's 16 /
  13 / 12); the sizes are the ramp's. Every binding *name* is the twins': the card and boxes
  `box/1` `#FFF9F2`, the head, price, stars, pill fill and arrow `text/1` terracotta, the
  pill's label and disc `sem/bg` paper, every other ink `text/2` — so the stars' two-tone,
  the pill's four seats and the eyebrow's Body/Chip are Lime's block unchanged.
  - **the card** drops Lime's radius and ring under `ed`, takes `position: relative`, and
    draws `DashRule side="all"` (8.2, 8.2 on the canvas) in `s.stroke2`;
  - **each box** is square with no idle ring, its 6, 6 dash on the frame's own wrapper — a
    relative column round the `<input>` or span, layout 2's idiom (an `<input>` takes no
    child); a refusal drops the dash;
  - **`disp()`** uppercases under `grunge || ed` (the head, the price, the submit and
    *Write another*, the sent card's title); the box labels are `up()`'s string, as before;
  - **`title`** is `u(32)` / 25 / 23 under `ed` (the price and the sent card's title).
- **The refused box keeps the twins' key, read against this paper**: 2px of `s.tx`, **ink**
  on `#FFF9F2`, inset, with the dash gone. The idle mark is a 1px dash of full terracotta, so
  the refusal changes colour, weight and dash at once (CONVENTIONS C). No frame draws it; ink
  reads on the paper card where the twins' 2px `s.tx` is pale on their dark ones — the one
  frame-less state here, checked on its own surround as *Conventions* (section 6) asks.
- **The desktop head fits its widest word in Noto's 540 ems.** `vm.titleWordEms` was Noto
  **Bold** ems for Editorial at every design (layout 1's hand-scaled statement); this head is
  Display/LG Regular, so `sectionVm` keys it by design — `d === 2 ? notoEms : notoBoldEms` —
  where the Bold table would have shrunk it 4.5% too far (67 against 70). UNFORGETTABLE. is
  7.387 ems, and the half column is **519.5** now (JP-038's `padX` of 45.9; the plan's ~501
  predates it), so the head sets at **70px** on three lines — LET'S MAKE YOUR / NIGHT /
  UNFORGETTABLE. — with the long word rendering 513.4 wide, 6px of room (`notoEms` is a
  little generous). 768 (73 in 708) and 390 (48 in 370, the word 352 wide) never bite: three
  lines each, no word broken. The key's only other reader, layout 1's statement, is design 0.
- **Two lifts, measured** (*Conventions*, new bullet):
  - **the price row**: the frame's shared baseline stands 0.83em of the price below the
    row's top (0.828 / 0.86 / 0.804 at 1440 / 768 / 390, whole-pixel boxes), ours 0.92
    (0.915 / 0.924 / 0.926), so the **row** is lifted 0.09em of the price, only when a price
    is printed; after it, 0.857 / 0.844 / 0.839 — within a pixel at every width, `£1,200`
    and *from / event* still on one baseline;
  - **the head**: its glyph floor stood 0.053 / 0.060 / 0.077em above the box's foot against
    the frame's 0.132 / 0.138 / 0.133 (`absoluteRenderBounds`, the frame's last line "YOUR
    EVENT", no descender), so it is lifted **0.08em** and now stands at 0.139 / 0.142 /
    0.140, cap tops 0.031 / 0.014 / 0.000 against 0.031 / 0.025 / 0.035. With `&cj=` "Join
    the jam in June" the second line's J cleared the paragraph by ~2.5px unlifted and ~10
    lifted; the first line's J still meets the second line's J at lh 0.89 — the tight line
    box's, not the lift's.
  The pill's and the boxes' Noto labels are centred in their boxes and were not lifted
  (pricing's section 7 call).
- **`vm.pad`'s `d === 2` form arm takes Editorial alone**: the masters pad **90 / 56 / 90 / 56**
  (1440), **60 / 30** (768) and 60 + 30 (390) round the taller half — the head column at 1440
  (409 against the card's 377), where the twins' is the card — the twins' insets exactly, so
  the foot is `u(90)` / 60 and 390 keeps its `padY` 44. Joined as `|| (T.name ===
  'Editorial' && cat === 'form')`, the testimonials untouched; section 10 folds the pair back
  into one condition.
- **Measured against the masters' content edges** (harness, DPR 2; the frame × 0.82 in
  brackets): **desktop** card (614.6, 80) **519.5 × 351.9** (615, 519.9 × 309.1 + one 42.6
  box pitch = 351.7), radius 0, dash 8.2, 8.2 `#C86E52`; price row 23 into the card (23),
  stars 63.3 (63.1), boxes 88.8 (88.6), **34.4** on a 42.6 pitch (42 / 52 × 0.82), pill 44.3,
  note 314.9 (314.8); the eyebrow 10, h2 70px on three lines 186.9 tall, paragraph one line.
  **768** eyebrow at 56 (60, `padY`), h2 73px on three lines 194.9, card at 353.4, 708 ×
  **405.4** (358 + 48), price 28 into it (28), stars 69.8 (70), boxes at 100.6 (101), **38**
  on 48, pill 54. **390** h2 48px on three lines 128.2, card 370 × **399.4** (352 + 47),
  boxes **37** on 47, pill 54. Sections **505.9 / 818.8 / 737.5**; the published 1440 tab
  stands the form at **6736 · 617** (589 in the frame).
- **Named diffs**:
  - the twins': the seed's four boxes against the frame's three (NAME, EMAIL, EVENT DATE,
    GUESTS against EVENT DATE, EVENT TYPE, YOUR EMAIL), and its "Let's make your night
    unforgettable." against "Book Kai for / your event" — so the card is **taller than the
    head column at 1440** (351.9 against ~246), the frame's reverse, and the head centres on
    the card; three lines at 768 and 390 where the frame's copy sets two; the top inset is
    `padY` 80 / 56 / 44 against the frame's 90 / 60 / 90 (Lime's arm sets only the foot);
  - the head sets at **70px against the ramp's 97** (the frame's 118 × 0.82) at desktop, the
    widest-word fit — the frame's own Fisterra sets its copy at the full size;
  - the display renders at Noto's 540 against Fisterra Bold (layout 1's decision 1).
- **`live=1`** (puppeteer, trusted clicks and typing, 1440 and 390, a capture-phase
  `preventDefault` on the mailto): the idle boxes carry the 6, 6 dash and no ring; an empty
  submit rings all four in `inset 0 0 0 2px #141414`, drops their dashes, holds the heights
  (34.4 / 37) and prints *Add the missing details and try again.*; typing into the first
  clears its ring and brings its dash back; the filled submit's `href` is
  `mailto:bookings@kaimercer.co.uk?subject=Enquiry&body=Name%3A%20Ada…` — the bare *Enquiry*
  subject and the four values; the click swaps in the sent card (*CHECK YOUR MAIL APP*, the
  address in plain text, *WRITE ANOTHER* the terracotta pill); *Write another* restores the
  four typed values. `n=0` is the card with its price, stars, pill and note (181.6 at
  desktop, the head column then the taller); `n=8` grows it to 522.2. No page errors or
  console warnings.
- **`FIELDS.form` moves nothing**: every `in` row is a flat array, and the block reads
  exactly the twins' keys (`available`, `heading`, `para`, `price`, `priceUnit`, `bookings`,
  `fields`, `cta`, `note`), each already `in` design 2 — no `reach.mjs` run was owed.
- **Verified in the builder** (`page-check.mjs Editorial 2`): four modal cards; the published
  1440 tab stands the form at 6736 · 617 under the map (5923 · 813) and over the testimonials
  (7353); every nav, fragment and footer link scrolls to its id (Book Now, the calendar's and
  the three pricing pills, Enquiries → `#form`); the refused submit rings all four boxes in
  2px ink at 42, the filled one composes the mailto and swaps in the sent card; no errors or
  warnings; `overflow390` 0; the 390 burger opens 1 → 5. The seam clips show straight edges
  at 1440 and 390, the map's terracotta band onto the form's paper, and paper on into the
  testimonials.
- **Digest**: themes 0, 1, 2 and 4 zero files of 660, canvas and `live=1`; theme 3 exactly
  form arch 2 at three widths on both surfaces (6 files). The `titleWordEms` key is computed
  for every Editorial design-2 section; the digest proves only the form reads it.
- **For the sweep's CLAUDE.md pass**: the enquiry form's layout-3 clauses — "Under Lime and
  Grunge a refused box takes layout 2's 2px ring of full ink" (Editorial's too: square boxes
  dashed 6, 6 in terracotta, refused as a solid 2px ink ring), and "under Lime the desktop
  head shrinks to fit its widest word … (`vm.titleWordEms` … its other arm is Editorial's
  layout-1 statement)" — `titleWordEms` is Lime's and Editorial's at layout 3 now, in Noto's
  540 ems at design 2 and Bold at design 0. Not written here.
- **For the testimonials**: the block (inside `Testimonials`' `if (s.v2)`, after `template`)
  carries Grunge's `G` — `REG`, `SEATS`, `card`, `cardFg`, `hair`, `lift`, `radius`, `pad`,
  `quote` — so Editorial is a third arm. The wall is **three registers** read off each
  cell's own scheme: paper `#FFF9F2` dashed 5, 5 in ink (Scheme 1), ink `#1D1D1D` dashed paper
  56% (Scheme 3), terracotta `#DA7C5E` dashed paper 56% (Scheme 4) — `s.onScheme[1|3|4]`,
  never a literal — seated **`[0, 1, 2, 1, 0]`** over the five quote cells (write Editorial's
  own `SEATS`, never remap the twins'); every cell **square** and dashed 5, 5 all round but
  `quote-cell`, which is unstroked (the twins ring it, Retro's normalisation — decide); the
  stat card `s.onScheme[3]` with a terracotta numeral; the quote at **Label/LG 24 / 16 / 14**
  (Lime's token, `s.labelLg` — not Grunge's written-out Display/Title; confirm with
  `get_variable_defs`); the head ink at Display/MD. **`vm.pad`'s form / testimonials arm**
  gets its Editorial testimonials half (the roots pad 56 · 30 / 30 / 56 / 30 by the planning
  read, the twins' numbers — measure), folding the two conditions back into one. The
  testimonials' "Experiences." head is open question 7's, dropped as the twins drop it.

### Settled in section 10 (the testimonials)

- **The block widened: `if (s.limeTree)` inside `Testimonials`' `if (s.v2)`, after `template`,
  `const ed = s.editorial`, `S1` / `S3` / `S4` off `s.onScheme` and a third arm in Grunge's
  `G`**, the twins' arms byte-identical: Grunge's keys plus three Editorial leaves read through
  `??` or a guard (`discBg` per register, `num`, `bare`), and a handful of `ed` sites — the
  cells' and the stat card's `DashRule` in place of the inset ring (`position: relative`, the
  dash the last child), `disp()`'s and the face stack's uppercase, the numeral row's lift. The
  tree is the twins' node for node, **44 = 44 = 44 at every width** (one paired traversal-order
  diff against both twins, all three masters in one call), on **Scheme 1** with `rating`,
  `quote-cell` and `small-quote` nested **Scheme 3**, the second `name-cell` **Scheme 4**, the
  first `name-cell` and `feat-quote` inheriting 1 — the planning read, confirmed on all three —
  the page's Device at every width, no effect on any node. The walker's bound sizes are
  `THEME_RAMP.Editorial` to the token (display-md 64 / 45 / 36, label-lg 24 / 16 / 14, list 24 /
  19 / 18, body-lg 16 / 15 / 15, body-md 14 / 13 / 13, body-sm 12), so every size reads `s.*`
  and **no size is written out** — Lime's `quote: s.labelLg`, not Grunge's Display/Title. The
  section has no control, so the hooks and the wall's arithmetic needed nothing.
- **The paired diff was leaves alone**: every radius **0** (Lime 50, Grunge 15), every stroked
  cell **dashed 5, 5** 1px INSIDE (Grunge solid), and the ramp's sizes; the 24 padding (28 on
  `quote-cell` and `feat-quote`, each row's last cell — Grunge's majority, taken again), the
  14 / 16 / 24 gaps, the 56 and 24 discs at −8 and the 275 / 276 seats are Grunge's to the pixel.
- **Three registers, each its cell's scheme** — `[S1, S3, S4]`, every key a binding: `box/1`
  the fill (`#FFF9F2` / `#1D1D1D` / `#DA7C5E`), `text/2` the ink (ink / paper / ink), `stroke/1`
  the dash (ink / paper 56% / paper 56%), seated **`[0, 1, 2, 1, 0]`**, Editorial's own `SEATS`.
  The **56 disc** binds its cell's **`text/1`** lettered its **`sem/bg`** in a solid 1px
  `stroke/1` — terracotta lettered paper on paper, **paper lettered terracotta on terracotta** —
  so it reads `reg.discBg ?? s.ac`, where the twins' disc is the section's accent (it would
  have been terracotta on terracotta). The frame draws no disc on a Scheme 3 cell; the seed's
  named reviews in seats 1 and 3 take the same bindings, terracotta lettered ink, an
  extrapolation named. No node names another scheme's variable, so trap 4 had no site.
- **`quote-cell` is left bare, followed rather than normalised** (the prompt's "decide against
  Retro's normalisation"). All four templates' frames leave it unstroked and every twin rings
  it — Retro's call on a white cell on cream, which needed an edge to be seen. Here it is ink on
  paper, parted from the page by its fill, and the dash would be the one thing on the wall the
  frame does not draw. It is a **seat, not a register** (`G.bare = 1`): the seat-3 cell is the
  same Scheme 3 and dashed, so the bare cell recurs where the seat does (review 7 at `n=8`).
  Reversible in one line (drop `bare`).
- **The stat card is `S3`**: `box/1` ink dashed 5, 5 in `stroke/1` paper 56%, its ink `text/2`
  paper (`/5`'s seat, `sub`, `brand`), the **numeral `text/1` terracotta** (`G.num`) —
  Grunge's two inks, here two different values off one scheme. The face stack keeps the
  twins' invented pair, `s.bg` paper lettered `s.ac` terracotta, in Scheme 3's **`box/2`
  `#2A2A2A`** 2px ring (`G.lift`, the frame's binding on its photographs); the stars, the `®`
  and the rating stay dropped, Retro's re-seating.
- **One lift, measured** (*Conventions*, new bullet). Floors read with flat-bottomed strings
  (`&cj=` "The beat held til late" / "Hal Bett" / heading "The beat held"), DPR 2, against the
  frame's `absoluteRenderBounds` corrected for Figma's whole-pixel line boxes:
  - **the numeral row** (Display/MD at lh 1, over `sub` 16 below): Noto's floor **0.115 / 0.111
    / 0.139em** above the box's foot against the frame's ~0.20 / 0.20 / 0.19 — 0.085 / 0.088 /
    0.057 low, section 9's head again — so the **row** is lifted **0.08em** of the numeral (it is
    baseline-aligned with the unit, section 9's price-row rule), 4.2 / 3.6 / 2.9px;
  - **the quote** (Label/LG at lh 1.1, over the name block 14 below): 0.047 / 0.005 / 0.05em
    low, under a pixel at every width — level, **not lifted** (section 8's lh-1.1 title had
    measured 0.07 at every width);
  - **the names** (Display/List at lh 1.2): 0.016 / 0.043 / 0.04em low, under a pixel — level,
    section 8's venues;
  - **the head** (Display/MD at lh 1) measures the numeral's 0.08em low but stands over the grid,
    not prose — the bio's and media's call, **not lifted**, named.
- **`vm.pad`'s form / testimonials arm is one condition again**: the three masters' roots pad
  **56 / 56 / 56 / 56** (1440), **30 / 30 / 56 / 30** (768) and 30 / 10 / 60 / 10 (390) — the
  twins' to the pixel — so the arm is `(Lime || Grunge || Editorial) && (form || testimonials)`,
  390 keeping `padY` 44.
- **Measured against the masters' content edges** (harness, DPR 2; the frame × 0.82 in
  brackets): **desktop** eyebrow at 46 (45.9), h2 at 60 (59.9) 52 tall at 52px, grid at 131.7
  (the frame's one-line head: 132), columns **225.5** / 418.3 / 418.3 and 417.8 / 417.9 /
  **226.3** (225.5 · 226.3), cells padded 19.7 (19.7), radius 0, dashes 4.1, 4.1, discs 45.9
  (45.9), quote 20px, foot 46 (45.9); section **607** against 647.8. **768** eyebrow 30, h2 at
  46.8 (47) 45 tall, grid at 115.8 (116), columns **275** / 200.5 / 200.5 and 200 / 200 / **276**
  — exact — cells padded 24, discs 56, quote 16px, foot 56; section **678.9** against 784.
  **390** eyebrow 44 (30, `padY`), h2 36 tall, six stacked cells 370 wide, discs 56, quote 14px;
  section **1457.2** against 1044. The published 1440 tab stands the wall at **7353 · 741** under
  the form (6736 · 617) — 607 × 1440 / 1180.
- **Named diffs**:
  - the twins': the rows are **content-tall** where the frame's are residues of a stated 790 /
    784 — 200.6 / 215.6 against 202.1 at desktop, 262.8 / 228.4 against 298 at 768 (Editorial's
    16px quote wraps less than Lime's 21, so here they run short); the head prints `vm.title`'s
    "Word of Mouth" where the frame writes "Experiences." (its 306 cap dropped, open question 7);
    the numeral is the review count; the 390 top is `padY` 44 against 30; **the 390 section's
    1457 is the seed** — five named reviews, each a 190-plus `name-cell`, where the master fills
    three of its five quote seats with bare quotes 63–86 tall, and the seeded `sub` wraps to two lines
    (the stat card 217.3 against 197);
  - `quote-cell` pads 24 against the frame's 28, and so does `feat-quote` (Grunge's majority);
  - the display renders at Noto's 540 against Fisterra Bold (layout 1's decision 1).
- **Edge states** (`live=1`, desktop and 390): `n=0` keeps the stat card at *0 reviews* with no
  stack beside a paper *No reviews yet.* cell dashed ink; `n=1` fills row 0 with one named cell;
  `n=8` gives row 1 the 276 seat and row 2 three equal fills, the seats running paper / ink
  bare / terracotta / ink / paper / paper / ink bare / terracotta, review 5 (no `who`, no `role`)
  collapsing to the frame's quote-only cell in the 276 seat and the stack marking only the named
  seven. No pointer cursors, no anchors.
- **`FIELDS.testimonials` has no template-keyed `in` row** (`heading` `[1, 2, 3]`, `sub`
  `[1, 2]`, `stars` and `cta` `[1]`), and the block reads the twins' keys alone, so no
  `reach.mjs` run was owed.
- **Verified in the builder** (`page-check.mjs Editorial 2`): four modal cards; the published
  1440 tab stands the wall at 7353 · 741 between the form and the footer (8094); every nav,
  fragment and footer link scrolls to its id (Reviews → `#testimonials`), Book Now to `#form`;
  `controls.testimonials` empty (the wall pages nothing); no errors or warnings; `overflow390`
  0; the 390 burger opens 1 → 5. The seam clips show straight edges at 1440 and 390: the form's
  paper on into the wall's, and the wall onto the footer's taupe band.
- **Digest**: themes 0, 1, 2 and 4 zero files of 660, canvas and `live=1`; theme 3 exactly
  testimonials arch 2 at three widths on both surfaces (6 files), and the three live files
  byte-identical to the three canvas ones.
- **For the sweep's CLAUDE.md pass**: nothing owed — the testimonials' layout-3 paragraph
  ("**Layout 3 is a bento wall and the one design here that pages nothing**") names no
  template's colours, radii or seats, Grunge's finding. The plan's *decorative language* table
  row ("every cell but `quote-cell`") already says what was built.
- **For the footer** (the last section): layout 1's `Footer` block, already `s.limeTree`, stood
  on Scheme 2 by `page` — no layout-3 block to widen, and **no `ed`-alone arm may move**: the
  digest's row-0 footer files (layouts 1 and 2, Scheme 3) stay at zero, so every delta is a key
  that resolves to layout 1's value under Scheme 3 and to the frame's under Scheme 2, or a `vm`
  flag off `page` (`footerBand`'s shape). Session 0 named three leaves that do not follow the
  seat at `&page=2`: **the seal's name ink** (`SealBadge`'s Editorial `line` arm inks it
  `tag/1/bg`, blush on the blush disc under Scheme 2 — invisible), **the Book pill's paper label**
  on the blush pill (`BookPill … discBg={ed ? s.box3 : undefined}`), and **the wordmark's
  sparkle** (`GrungeStar fill={s.chips[0].bg}`, blush under Scheme 2). Read each binding with
  its collection on the three masters (`964:68749` 1440 × 479.5, `984:16841` 768 × 692.3,
  `984:16872` 390 × 736.3) against layout 1's footer frames (`446:8698` at 1440,
  `907:12166` / `907:12467` narrow); the harness is `cat=footer&arch=0&theme=3&page=2`, and
  the digest's `page_2` footer files are the only theme-3 files that may move.

### Settled in section 11 (the footer)

- **No block to widen, and the paired diff was bindings alone.** One `use_figma` walk of the
  three masters against layout 1's own (`964:58622` / `986:48249` / `986:48261`, the instances
  layout 1's section 11 fitted), by traversal order: **35 = 35 at every width, every node's type,
  name (the 1440 root's aside), box, text, face, size and case the same, and every binding name
  the same** — only the
  resolved values move, Scheme 2's for Scheme 3's (the root states `2 · Scheme = Scheme 2` on
  all three; the 1440 root is 479.5 against 479.7, a rounding). So the layout-3 footer *is*
  layout 1's footer on the page-keyed seat (decision 1(c)), and the work was only the leaves
  the block writes as something other than the frame's binding. No Device override, no nested
  scheme, no effect on any node.
- **What follows the seat by itself** (read off the diff against the block): the band
  `sem/bg` taupe, the edge, Line 19 and the small print's rule `sem/stroke/1` (opaque paper
  here, 56% under Scheme 3 — the same `s.stroke1`), the statement `text/1` paper (`s.ac`), the
  name, the links and the small print `text/2` ink (`s.tx`), the seal's disc `active/bg` blush,
  its ring and equator marks `stroke/1` paper and its sparkle `active/text` ink, the pill's
  ground `active/bg` blush (`pillBg`), its disc `box/3` `#A18A7E` (`discBg={s.box3}`) and its
  arrow `active/bg`. **The wordmark sparkle follows too** — session 0 listed it as a leaf that
  does not, but the frame binds `sem/tag/1/bg`, which is blush under Scheme 2 as ours is
  (`s.chips[0].bg`): blush on taupe is the frame's own picture. Nothing to do.
- **Three leaves did not, each re-keyed to a value that is layout 1's under Scheme 3** (so the
  row-0 files stay at zero — the constraint was never "no `ed` arm" but "no value that moves
  under Scheme 3"):
  - **the wordmark bar** (`Frame 48`) — the leaf session 0 missed. It binds `sem/tag/1/bg`,
    blush here; the block drew `s.tx`, which is that binding's value only under Scheme 3
    (layout 1's section 11 named the coincidence: "the bar `tag/1/bg`, whose value is
    `s.tx`'s"). Now `ed ? s.chips[0].bg : s.tx` — paper = paper under Scheme 3;
  - **the Book pill's label** binds `sem/tag/1/text`, which is **ink in both schemes** (it is
    absent from the diff for that reason); `BookPill`'s default `s.bg` is ink under Scheme 3 and
    the taupe band under Scheme 2, so the label was taupe on blush. Now
    `fg={ed ? s.chips[0].fg : undefined}` — `tagFg[0]`, ink in both. `fg` moves the label alone:
    the disc takes `discBg`, the arrow `discFg ?? pillBg`;
  - **the seal's name** followed the seat to the **frame's own invisible blush on the blush
    disc** (`sem/tag/1/bg` — the frame draws no readable name at any width). It is redrawn in
    **`s.activeFg`**, the disc's own pair and the ink its sparkle already carries — paper under
    Scheme 3, identical to `tag/1/bg` there, so the row-0 seal is unchanged. Section 8's *a
    frame's own state can vanish by the scheme; redraw it*, turned on a content leaf (the
    artist's name). `SealBadge`'s Editorial `line` arm reads `line ? s.activeFg : s.bg`; the
    footer is still its only `line` caller. Reversible in one line; open question 11.
- **Proved.** The harness at `&page=2` (DPR 2, reduced motion): the bar blush, the pill label
  `#141414` on `#E6B6A0` over the `#A18A7E` disc, the seal's name `#141414`, at all three widths;
  at no `page` (row 0) the pill label, disc and seal name are layout 1's (`#141414` on
  terracotta, `#0E0E0E`, `#F6F0E8`). Geometry is layout 1's to the pixel (the diff had no box):
  428 / 692.1 / 650.7, the 390 still layout 1's three-line statement against the master's four
  (layout 1's open question 11, a named diff).
- **Digest**: themes 0, 1, 2 and 4 zero files of 660, canvas and `live=1`; theme 3 exactly the
  three `cat_footer_arch_0_page_2_theme_3_*` files on each surface (the bar's background and
  the pill's colour, two rows a file) — the no-page footer files at zero. **The seal's change is
  not in it**: its `<text>` sits inside `.seal-spin`, which the digest skips, so it was proved
  by the render's `fill` and the shot.
- **Verified in the builder** (`page-check.mjs Editorial 2,0,1,3`): four modal cards; card 3's
  published 1440 tab stands the footer at 8094 · 522 taupe with every leaf reading; every footer
  row scrolls to its id and its Book Now to `#form`; no errors or warnings; `overflow390` 0;
  the 390 burger 1 → 5. Cards 1, 2 and 4 publish an ink footer, card 1's pictured against card
  3's and unchanged.
- **`FIELDS.footer` has no template-keyed `in` row**, so no `reach.mjs` run was owed.
- **For the sweep's CLAUDE.md pass**: the *Editorial is designed* paragraph says the footer's
  seal "inks the name in `tag/1/bg` paper" — it is `active/text` now (paper under Scheme 3,
  ink on the taupe page), and the paragraph owes the footer's seat by page (session 0's note
  already names it). Layout 1's *Settled in section 11* quotes the old `fill` and stays the
  record.

### Inherited and used

*(The running list the sweep folds into [`../CONVENTIONS.md`](../CONVENTIONS.md): each time a
session leans on a bullet from Editorial layout 1's or 2's, Lime's, Grunge's or Retro's
Conventions, name it here in one line, with the plan it came from, a blank line between sessions.)*

- Session 0: *A section's colour scheme is resolved in `sectionVm`, not restated in its block*
  (editorial/layout-1, *decision 3* and *Settled in session 0*) — extended by a seat read off the
  page for the footer.
- Session 0: *A nested node or a card on another scheme reads that scheme's keys*
  (editorial/layout-2, *Settled in session 0*) — Scheme 5 added for the nav, with no section on it.
- Session 0: *`get_variable_defs` resolves a node's mode* (memory: `figma-frame-reading`) — and
  *mixes nested schemes in one list* (lime/layout-1, *Settled in section 9*): Scheme 5 and Scheme
  8 corroborated off the header instance together.
- Session 0: *The digest is committed* (lime/layout-1, *Settled in session 0*) — five themes
  canvas and live for (a), plus the new `page_2` footer against its no-page twin; for (b), the
  theme-3 filter by `_arch_2_`, category and the `page_2` file.
- Session 0: *Probing a vm key no section reads yet* (editorial/layout-2, *Settled in session 0*)
  — `onScheme[5]` and the page-keyed footer seat, through `sectionVm` in the page.

- Section 1: *The first layout-3 block: `if (s.lime) { … return }` at the head of `HeaderV2`*
  (lime/layout-3, *Settled in section 1*; D3) — widened to `s.limeTree`, no `G`.
- Section 1: *A widened block can need no `G` at all* (grunge/layout-3, *Settled in section 9*) —
  every delta a binding, fifteen arms.
- Section 1: *A nested node or a card on another scheme reads that scheme's keys*
  (editorial/layout-2, *Settled in session 0*) — `onScheme[5]` for the nav, its first reader,
  and `onScheme[1]` for four nodes naming Scheme 1 under the Scheme 3 seat (this plan's trap 4).
- Section 1: *The paired diff walk*, by traversal order (grunge/layout-2, *Settled in section 8*;
  editorial/layout-1) — 44 against 44 at 1440 and 390; the diff was the whole delta list.
- Section 1: *A scheme that did not move can still move the binding* (grunge/layout-3,
  *Conventions*) — the well's fade (`sem/bg` for `sem/media`) and the location's dot (`text/2`
  for `text/1`).
- Section 1: *`vm.title` shadows the ramp's `title` size* (lime/layout-1, *Settled in section 6*)
  — the card's name at the literal 32 / 25 / 23.
- Section 1: *A twin's width-bound call is re-measured in the new face* (editorial/layout-2,
  *Conventions*) — the 768 fold walked in Noto with `&nav=`: four links, not Grunge's seven.
- Section 1: *A seeded page cannot show an empty slot* (lime/layout-1, *Learned on the end-of-pass
  sweep*) — `&noimage=1` for the widened backdrop ramp.
- Section 1: *Field reach is measured* (CLAUDE.md) and *the whole-page published check*
  (lime/layout-1, *Learned on the end-of-pass sweep*) — `reach.mjs 3`, `page-check.mjs Editorial
  2,0,1,3`.

- Section 2: *The first layout-3 block inside a section, ahead of `Bio`'s `if (s.v2)`*
  (lime/layout-3, *Settled in section 2*; D3) — widened to `s.limeTree`, no `G`.
- Section 2: *A widened block can need no `G` at all* (grunge/layout-3, *Settled in section 9*) —
  about fifteen arms, every leaf a binding the block already reads.
- Section 2: *The paired diff walk*, by traversal order (grunge/layout-2, *Settled in section 8*)
  — against Lime and Grunge at 1440, Lime at 768 and 390; the diff was the delta list.
- Section 2: *`CROP` honours the transform* and *a `CROP` transform does not adapt when an
  instance is resized* (grunge/layout-3, *Conventions*) — an `objectPosition`, not an export.
- Section 2: *A frame's image anchor is evidence for its own photograph only … sweep and follow
  the peak* (editorial/layout-2, *Conventions*) — 19.2% (0.9998) and, on the squashed 768, 16%.
- Section 2: *On this paper page `s.muted` is ink, so an empty slot on a dark well needs
  `Photo`'s `ink`* (editorial/layout-2, *Conventions*) — `s.bg` initials, `&noimage=1`.
- Section 2: *The tape is `Tape`*, *place it by its centre* and *a sparkle is `GrungeStar` …
  read each sparkle's binding* (editorial/layout-1, *Conventions*) — the bio's is `s.ac`.
- Section 2: *A leak that shows and reads as a defect is overridden* (grunge/layout-1, *Settled
  in section 4*) — the 768 tape over the head; and *leaked tops are followed where they show*
  (lime/layout-1) — the 390 card's bleed; and dropped where they don't — the 768 Tags leak.
- Section 2: *A head that must fit its measure is fitted to its widest word* (CONVENTIONS C) —
  read, and nothing to fit: the head wraps on the ramp, layout 2's call.
- Section 2: *The composed row's pad arm moves per section* (grunge/layout-3, *Conventions*) — the
  bio joins first.
- Section 2: *The digest is committed* and *the whole-page published check* — themes 0, 1, 2, 4
  at zero; `page-check.mjs Editorial 2`.

- Section 3: *The first layout-3 block inside a branch, after `nHot`* (lime/layout-3, *Settled in
  section 3*; D3) — widened to `s.limeTree`.
- Section 3: *The `G` lookup at the block's head, whose twin's arm is today's literals*
  (grunge/layout-1; C) — a third arm, and two new leaves falling back through `??`.
- Section 3: *A nested node or a card on another scheme reads that scheme's keys*
  (editorial/layout-2, *Settled in session 0*) — the audio card's instance on `s.onScheme[2]`.
- Section 3: *A scheme that did not move can still move the binding* (grunge/layout-3,
  *Conventions*) — the card's `box/1` for the twins' `box/3`, the disc's `box/2` for Lime's
  `box/1`.
- Section 3: *Row rules are bottom-only here* (editorial/layout-2, *Settled in section 3*; D2's
  media row turned round) — the counter and all five rows, `DashRule` at the foot.
- Section 3: *The paired diff walk*, by traversal order (grunge/layout-2, *Settled in section 8*)
  — the three widths' bindings against the twins' tree; nothing but leaves differed.
- Section 3: *The composed row's pad arm moves per section* (grunge/layout-3, *Conventions*) —
  media joins second, its feet re-read off the frame as the twins'.
- Section 3: *The digest is committed* and *the whole-page published check* — themes 0, 1, 2, 4
  at zero; `page-check.mjs Editorial 2`.

- Section 4: *After `arrow`, the seat layouts 1 and 2 used* and *seat the schemes by rendered
  place, not by index* (lime/layout-3, *Settled in section 4*; D3) — widened to `s.limeTree`,
  the seating unchanged (the 390 master centres the taupe card).
- Section 4: *The `G` lookup at the block's head, whose twin's arm is today's literals*
  (grunge/layout-1; C) — a third arm, no new key.
- Section 4: *A nested node or a card on another scheme reads that scheme's keys*
  (editorial/layout-2, *Settled in session 0*) — the three sets on `s.onScheme[4|2|3]`, where
  Grunge wrote a literal.
- Section 4: *Read every nested node's scheme off the master, never off the twin's row*
  (grunge/layout-3, *Conventions*) — 4 / 2 / 3 at every width.
- Section 4: *Read the radius before calling a dash a capsule* (editorial/layout-2,
  *Conventions*) — the pager's pills square, against the plan's and the prompt's capsule.
- Section 4: *The paired diff walk*, by traversal order (grunge/layout-2, *Settled in section 8*)
  — 57 / 57 / 63 against both twins; the diff was the radii, the padding, the rows and the
  bindings.
- Section 4: *A frame's inside stroke is an inset `boxShadow`… a dashed stroke is `DashRule`*
  (lime/layout-2; editorial/layout-1, *Conventions*) — the card all round, the rows at the foot,
  the pills.
- Section 4: JP-044's *at 768 the artist stands under the title* (lime/retest-qa-fixes) — kept,
  and checked: no seeded title clips at any width.
- Section 4: *The composed row's pad arm moves per section* and Grunge's gap re-check
  (grunge/layout-3, *Conventions* and *Settled in section 4*) — the media foot → repertoire head
  gap re-measured on all three templates, and named.
- Section 4: *The digest is committed* and *the whole-page published check* — themes 0, 1, 2, 4
  at zero; `page-check.mjs Editorial 2`.

- Section 5: *After `line`*, *the card's 2px ring* and *the pill is Scheme 2* (lime/layout-3,
  *Settled in section 5*; D3) — widened to `s.limeTree`; the ring gated off under `ed`; the pill
  turned round, Scheme 1's identity on `BookPill`'s defaults.
- Section 5: *A widened block can need no `G` at all* (grunge/layout-3, *Settled in section 9*)
  — four `ed` arms and a lift, every ink a key the block already reads.
- Section 5: *The paired diff walk*, by traversal order (grunge/layout-2, *Settled in section 8*)
  — 65 against Lime's 65; the diff was the card's stroke and radius, the dot's ring, the pill's
  scheme and label token.
- Section 5: *Noto sits its glyphs 0.09em lower … mind its J* (editorial/layout-2,
  *Conventions*) — the numeral and the month lifted, the J of JUNE off "2025"; extended here to
  lh 1 (*Conventions*).
- Section 5: *`vm.title` shadows the ramp's `title` size* (lime/layout-1, *Settled in section 6*)
  — "Book Me" at the literal 32 / 25 / 23.
- Section 5: *A frame's inside stroke is an inset `boxShadow`… a dashed stroke is `DashRule`*
  (lime/layout-2; editorial/layout-1, *Conventions*) — the card all round; the free dot's 1px
  ring an inset shadow, unscaled.
- Section 5: *The composed row's pad arm moves per section* (grunge/layout-3, *Conventions*) —
  closed here as under Grunge, the three templates one condition again.
- Section 5: *Field reach is measured* (CLAUDE.md) — `reach.mjs 3`, `calendar.heading`'s
  Editorial row confirmed over the fitted card.
- Section 5: *The digest is committed* and *the whole-page published check* — themes 0, 1, 2, 4
  at zero; `page-check.mjs Editorial 2`, plus a one-off (deleted) for the composed heads on the
  canvas and in the published tab.

- Section 6: *No block: `s.lime` ternaries through `Gallery`'s `if (s.v2)`* (lime/layout-3,
  *Settled in section 6*; D3) and its Grunge widening (grunge/layout-3, *Settled in section 6*)
  — the same eleven sites under `ed`.
- Section 6: *The tile ratio is re-derived, not inherited* (lime/layout-3, *Settled in section
  6*; Retro's residue rule) — 174.667 at 1440, 83 at 390, over this page's own heights.
- Section 6: *The viewer is re-inked, not restructured* (lime/layout-3, *Settled in section 6*)
  — turned round: the twins' `s.tx` is ink here, so the scrim is the page ink and the controls
  paper.
- Section 6: *A node can name another scheme's variable outright* (this plan, *Conventions*;
  trap 4) — the ring's `scheme/1/stroke/1` through `s.onScheme[1]`, where the seat's key is
  paper.
- Section 6: *A section's colour scheme is resolved in `sectionVm`* (editorial/layout-1,
  *decision 3*) — the sheet, head and wells are the Scheme 2 seat's `s.bg` / `s.ac` / `s.box3`,
  where the twins wrote literals.
- Section 6: *A frame's image anchor is evidence for its own photograph only* (editorial/layout-2,
  *Conventions*) — the stage shot's `FILL` confirms the centred cover; the hero's one `CROP` sits
  in a seat we do not draw, and is not followed.
- Section 6: *On this paper page `s.muted` is ink, so an empty slot on a dark well needs `Photo`'s
  `ink`* (editorial/layout-2, *Conventions*) — `&n=0`, and here ink reads on the mid-taupe well.
- Section 6: *The paired diff walk*, by traversal order (grunge/layout-2, *Settled in section 8*)
  — 17 / 17 / 17 against both twins; the diff was four leaves against Grunge, three against Lime.
- Section 6: *The digest is committed* and *the whole-page published check* — themes 0, 1, 2, 4
  at zero; `page-check.mjs Editorial 2`.

- Section 7: *After `shown`*, *a plain row is the page ground in a 1px `sem/stroke/2`* and *the
  featured row's pill is the pair* (lime/layout-3, *Settled in section 7*; D3) and Grunge's
  nine-key widening (grunge/layout-3, *Settled in section 7*) — widened to `s.limeTree`; the
  ring a dash; the pair read off Scheme 3 rather than turned round.
- Section 7: *The `G` lookup at the block's head, whose twin's arm is today's literals*
  (grunge/layout-1; C) — a third arm, three new leaves falling back through `??`.
- Section 7: *A nested node or a card on another scheme reads that scheme's keys*
  (editorial/layout-2, *Settled in session 0*) — the featured row on `s.onScheme[3]`, where both
  twins wrote Scheme 3 as `s.ac` and literals.
- Section 7: *The paired diff walk*, by traversal order (grunge/layout-2, *Settled in section 8*)
  — 115 against Grunge's 115; three leaves, every binding name the same.
- Section 7: *A twin's redrawn state is read against this frame before it is inherited*
  (editorial/layout-2, *Conventions*) — the capsule's pick, read and found to be the twins' own
  binding (no redraw to decline at layout 3); and this plan's frame-less-control bullet — the
  FEATURED seat needed nothing.
- Section 7: *Noto's 0.09em is a face fact* (this plan, *Conventions*, section 5) — extended to
  a numeral beside a bottom-aligned `£`, measured on lowest ink rows.
- Section 7: *`vm.title` shadows the ramp's `title` size* (lime/layout-1, *Settled in section 6*)
  — the heading at the literal 32 / 25 / 23.
- Section 7: *A frame's inside stroke is an inset `boxShadow`… a dashed stroke is `DashRule`*
  (lime/layout-2; editorial/layout-1, *Conventions*) — the rows and the empty box all round; the
  instance's solid ring Grunge's overlay.
- Section 7: *The digest is committed* and *the whole-page published check* — themes 0, 1, 2, 4
  at zero; `page-check.mjs Editorial 2`.

- Section 8: *After `litRow`*, *rings are the frame's weights, opacities and dash* and *the
  raster is drawn as it is* (lime/layout-3, *Settled in section 8*; D3) and Grunge's widening
  with its split `ink` (grunge/layout-3, *Settled in section 8*) — widened to `s.limeTree`; the
  rings and the raster kept, the split landing on the frame's bindings.
- Section 8: *The `G` lookup at the block's head, whose twin's arm is today's literals*
  (grunge/layout-1; C) — a third arm, eleven new leaves through `??`.
- Section 8: *A nested node or a card on another scheme reads that scheme's keys*
  (editorial/layout-2, *Settled in session 0*) — the panel on `s.onScheme[3]`, the viewport's
  explicit Scheme 4 on the seat's own keys.
- Section 8: *Read every nested node's scheme off the master, never off the twin's row*
  (grunge/layout-3, *Conventions*) — `radius-map` 3 and `Map Viewport` 4 at every width.
- Section 8: *The paired diff walk*, by traversal order (grunge/layout-2, *Settled in section 8*)
  — 141 / 142 / 83 against Grunge; leaves only.
- Section 8: *A twin's redrawn state is read against this frame before it is inherited*
  (editorial/layout-2, *Conventions*) — the lit row, which this frame draws, followed; and
  *Retro's live states vanish under Lime; redraw them* (lime/layout-1; C) — turned on the
  frame's own idle dots, which the scheme hid.
- Section 8: this plan's *frame-less control* bullet (section 6) — the lit pin; the zoom
  buttons found to be frame nodes.
- Section 8: *Noto's 0.09em is a face fact* (this plan, *Conventions*, section 5) — measured
  per site and refined: 0.07em at lh 1.1, level at lh 1.2.
- Section 8: *`vm.title` shadows the ramp's `title` size* (lime/layout-1, *Settled in section 6*)
  — the head and the panel title at the literal 32 / 25 / 23.
- Section 8: *A frame's inside stroke is an inset `boxShadow`… a dashed stroke is `DashRule`*
  (lime/layout-2; editorial/layout-1, *Conventions*) — the rows, the lit row, the container and
  the data bar dashed; the chips', boxes' and zoom buttons' solid rings kept inset.
- Section 8: JP-045's *no Tickets → without a link, on either surface* (lime/retest-qa-fixes)
  and JP-040's four seats (lime/layout-2-qa-fixes) — re-driven with `&cj=` and `n=30`.
- Section 8: *The digest is committed* and *the whole-page published check* — themes 0, 1, 2, 4
  at zero; `page-check.mjs Editorial 2`.

- Section 9: *After `up`* and *the desktop head shrinks to fit its widest word*
  (lime/layout-3, *Settled in section 9*; D3) and Grunge's widening (grunge/layout-3,
  *Settled in section 9*) — widened to `s.limeTree`; the fit kept, its ems Noto's 540 by
  design.
- Section 9: *A widened block can need no `G` at all* (grunge/layout-3, *Settled in section
  9*) — a handful of `ed` arms, every fill a twin key.
- Section 9: *The paired diff walk*, by traversal order (grunge/layout-2, *Settled in section
  8*) — 27 / 27 / 27 against both twins in one call; leaves only.
- Section 9: *A dashed stroke is `DashRule`* and *a dashed rule under an `<input>` goes on the
  field's column* (editorial/layout-1, *Conventions*), in layout 2's wrapper shape
  (editorial/layout-2, *Settled in section 9*) — the card 10, 10 and each box 6, 6.
- Section 9: *Read the radius before calling a dash a capsule* (editorial/layout-2,
  *Conventions*) — the boxes square, as layout 2's.
- Section 9: *A refused box changes colour, not weight alone, when the idle ring is already
  full ink* (CONVENTIONS C) and this plan's frame-less-control bullet (section 6) — 2px of
  ink on the paper card.
- Section 9: *A head that must fit its measure is fitted to its widest word* (CONVENTIONS C) —
  the Lime block's column fit, re-keyed in Noto.
- Section 9: *Noto's 0.09em is a face fact* and *the lift is measured per site* (this plan,
  *Conventions*, sections 5 and 8) — the price row (lifted whole, a new bullet) and the head
  over its paragraph.
- Section 9: *`vm.title` shadows the ramp's `title` size* (lime/layout-1, *Settled in section 6*)
  — the price and the sent card's title at the literal 32 / 25 / 23.
- Section 9: *The composed row's pad arm moves per section* (grunge/layout-3, *Conventions*),
  turned on the form / testimonials pair — the form joins alone.
- Section 9: *The popup is `about:blank`* and the capture-phase mailto intercept
  (memory: `verifying-the-published-tab`) — the live drive and `page-check.mjs Editorial 2`.
- Section 9: *The digest is committed* — themes 0, 1, 2, 4 at zero.

- Section 10: *After `template`* and *a three-entry `REG` over Retro's own `SEATS` order*
  (lime/layout-3, *Settled in section 10*; D3) and Grunge's two-register widening with its own
  `SEATS` (grunge/layout-3, *Settled in section 10*) — widened to `s.limeTree`; a third register
  set and a third `SEATS`, never a remap.
- Section 10: *The `G` lookup at the block's head, whose twin's arm is today's literals*
  (grunge/layout-1; C) — a third arm, three new leaves through `??` or a guard.
- Section 10: *A nested node or a card on another scheme reads that scheme's keys*
  (editorial/layout-2, *Settled in session 0*) — three registers and the stat card on
  `s.onScheme[1|3|4]`, where Grunge wrote literals.
- Section 10: *Read every nested node's scheme off the master, never off the twin's row*
  (grunge/layout-3, *Conventions*) — 3 / 1 / 3 / 4 / 3 / 1 at every width.
- Section 10: *A scheme that did not move can still move the binding* (grunge/layout-3,
  *Conventions*) — the disc's `text/1` per cell, where the twins read the section's accent.
- Section 10: *The paired diff walk*, by traversal order (grunge/layout-2, *Settled in section
  8*) — 44 = 44 = 44 against both twins in one call; leaves only.
- Section 10: *A frame's inside stroke is an inset `boxShadow`… a dashed stroke is `DashRule`*
  (lime/layout-2; editorial/layout-1, *Conventions*) — every cell and the stat card; the discs'
  solid rings kept inset.
- Section 10: *A twin's redrawn state or live mechanism is read against this frame before it is
  inherited* (editorial/layout-2, *Conventions*) — turned on a normalisation: the twins' ringed
  `quote-cell`, read against this frame and left bare.
- Section 10: *Noto's 0.09em is a face fact*, *the lift is measured per site* and *a
  baseline-aligned row lifts as one* (this plan, *Conventions*, sections 5, 8 and 9) — the
  numeral row lifted 0.08em; the quote and the names measured level.
- Section 10: *The composed row's pad arm moves per section* (grunge/layout-3, *Conventions*),
  on the form / testimonials pair — closed here, one condition again.
- Section 10: *The digest is committed* and *the whole-page published check* — themes 0, 1, 2,
  4 at zero; `page-check.mjs Editorial 2`.

- Section 11: *The tenth Lime block, at the head of `Footer`* and its Editorial widening
  (lime/layout-1, *Settled in section 11*; editorial/layout-1, *Settled in section 11*; D1) —
  nothing widened: the block was already `s.limeTree`, and three leaves were re-keyed.
- Section 11: *A section's colour scheme is resolved in `sectionVm`* (editorial/layout-1,
  *decision 3*), extended by session 0's seat off the page — the whole of the fit but three
  leaves.
- Section 11: *The paired diff walk*, by traversal order (grunge/layout-2, *Settled in section
  8*) — 35 = 35 against layout 1's own Editorial masters, the first diff taken against the same
  template's other page; bindings only.
- Section 11: *A scheme that did not move can still move the binding* (grunge/layout-3,
  *Conventions*) — turned round: the bindings did not move and the scheme did, so every leaf the
  block wrote as a Scheme 3 coincidence (`s.tx` for `tag/1/bg`, `s.bg` for `tag/1/text`) showed.
- Section 11: this plan's *a frame's own state can vanish by the scheme; redraw it* (section 8)
  — the seal's name, redrawn in the disc's own `active/text`.
- Section 11: *Measure anything under `.seal-spin` with the animation stopped* (lime/layout-1,
  *Settled in section 2*) — reduced motion for the shots; and the digest's skip of it, which
  left the seal's change for the render to prove.
- Section 11: *The digest is committed* and *the whole-page published check* — themes 0, 1, 2,
  4 at zero; theme 3 the `page_2` files alone; `page-check.mjs Editorial 2,0,1,3`.

- The sweep: *the whole-page published check*, *the two-build digest walks the editor* (`CARD=2`,
  reduced motion), *field reach is measured* (`reach.mjs 3`), *one five-theme digest is the whole
  proof* (media's foot) and the thumbnail recipe (memory: `browser-tool-choice`).

### Learned on the end-of-pass sweep (`3359b11`, `8c71e18`, `8ec3efd`, `b7e4a8c`)

- **Item 1, the docs.** CLAUDE.md's Editorial paragraph is layouts 1, 2 and 3: card 4 the one
  placeholder, Inset Hero `HeaderV2`'s block widened, a *Layout 3 is a paper page between four
  full-bleed grounds* passage (the grounds, every card square, `DashRule` on eight sections, the
  live states followed and redrawn, the measured lifts), the seal's name in `active/text`, and
  the pair-gate list (layout 3: none). The per-section scheme bullet carries Scheme 5, the header
  on 3 for its Scheme 8, the footer's seat by `page` and every layout-3 `s.onScheme` reader. Also:
  `navModeDefault`, the JP-039 counts (four links at 768), `navFits`' arm, the header's `in`
  sentence (three fitted cards, one placeholder), the gallery viewer, pricing's stack (three
  templates read no `vm.tierRow`), the form's refused box and `titleWordEms` (Lime and Editorial,
  keyed by design), the bio's tag reach, and the file table (5250 / 25500 / 1970). README took its
  Editorial passage and the refused-box aside. Three code comments were stale and were fixed —
  `Footer`'s head (Scheme 2 by page, the three re-keyed leaves), `THEMES[3].schemes`' seat notes
  and `photos.js`' head; `navModeDefault`'s, `navFits`', the `vm.pad` arms', `SCHEMES_OF`'s and
  `Photo`'s were already the sessions'. **"The flat four"**, some eighty comments in
  `EncoreSection.jsx`, is Retro-pass prose for the palettes that reach Retro's derivations, not a
  template list, and was not chased; at layout 3 only Pop reaches them now.
- **Item 2: the published page passed.** `page-check.mjs Editorial 2,0,1,3`: card 3's walk —
  Music, Gigs, About, Listen and Book Now to their ids; the calendar's pill and the three pricing
  pills to `#form`; the player plays; the form refuses with four 2px ink rings at 42 and composes
  the bare *Enquiry* mailto, swapping to *Check your mail app*; all nine footer links scroll; the
  390 burger 1 → 5; `overflow390` 0; no error or warning in either window. Cards 1, 2 and 4
  publish all eleven sections. Card 3's first run died on "Execution context was destroyed" (a
  Vite reload after the docs commit touched three watched modules); rerun alone, it passed —
  `page-check` has no retry, `shots.mjs`' trap. Rerun once more after item 6's fit: the same,
  media 1146 tall at 2318 (1167 before) and the repertoire at 3464.
  - **The harness controls** (`theme=3&arch=2&live=1`, one puppeteer script, deleted): the
    gallery viewer opens on a tile at 1 / 7 with focus inside and `overflow: hidden` on `<html>`
    and `<body>` with a stable gutter; Next → 2 / 7, → 3 / 7, ← 2 / 7; Escape closes and restores
    all three styles; a scrim click closes. Scrim `rgba(20, 20, 20, .94)`, the three controls
    paper on paper at 14%, desktop and 390. The repertoire at `n=20`: *View full set →* reveals
    its card's rows at all three widths (the section 94 / 161 / 1103 taller). Pricing's FEATURED
    seat: All → The Festival Set, Solo → The Wedding Set, Trio and Band → The Festival Set, ink
    wherever it lands, desktop and 390. The map at `n=30`: `+` twice scales the layer to 1.5625
    and `−` back to 1.25; *See all gigs* lists all 30 at every width (its pill stays drawn, a
    picture, the twins' shared block). No page errors or warnings.
  - **The seams** (`page-check`'s 180px clips at 1440 and 390, read as joins): the ink header →
    paper, paper → the taupe gallery, the taupe → pricing's ink-ringed paper, pricing → the
    terracotta map, the map → the form's paper, the wall's paper → the taupe footer — every edge
    straight, no two neighbours on one ground. The footer seal reads "KAI MERCER" in ink on the
    blush disc at both widths.
- **Item 3: the thumbnails** (`browser-tool-choice`'s recipe, with one trap: the header's and the
  footer's rows carry a *Required* badge inside the name's `<div>`, so a locked row is matched on
  its name `<span>`). All ten layout-3 rows and the footer's one render one live root each: the
  header ink under the blush capsule beside its ink arch card, the gallery taupe, the map
  terracotta round its ink panel, the rest paper with their cards on their own schemes (the
  repertoire's terracotta / taupe / ink, the wall's three registers). The footer's thumbnail is
  row 0's ink, no `page` — the named diff.
- **Item 4**: cards 1 and 2 publish ink footers whose seal names are paper `#F6F0E8`; card 3 a
  taupe one, its name ink `#141414`; card 4 keeps Retro's checker ribbon (`repeating-conic` in
  the header) over an ink footer with a paper name — canvas and published tab alike.
- **Item 5: `reach.mjs 3`** (3,312 renders): every Editorial `in` row holds — the header's over
  three fitted cards (kicker / tags / showTags `[0, 2, 3]`, location all four, cta2 `[1, 2]` at
  4/6, showBadge `[0, 3]`, badgeText `[3]`, subtitle / heroCta `[1]`, align `[0]`),
  `calendar.heading`'s `[0, 1, 2, 3]`, the map's status / updated / expand `[1, 2]` and rings
  `[1, 2, 3]`, `pricing.offer` `[2]`, and the identity probes (the bio's tags at 2, 3 and 4).
  Nothing in `FIELDS` moved.
- **Item 6: no `(s.lime || s.grunge)` is left in layout-3 code.** Every `s.v2` block is
  `s.limeTree`, and the gallery's two layout-3 ternaries that still spell the pair (`ratio`'s 171,
  `cream`'s `s.tx`) stand behind an `ed` arm. The pair's other lines are layout 1's three known
  sites (`LogoMark`, `SealBadge`, and `Photo`'s backdrop, which also takes `s.editorial && (s.v0
  || s.v2)`), layout 2's gallery caption, and layout 4's — `HeaderV3`'s head and the blocks in or
  ahead of every `s.v3` branch. In `EncoreBuilder.jsx` and `data.js` every `d === 2` name gate
  lists Editorial; `footerBand` is Lime's alone by design (Editorial's footer is seated), and
  `titleWordEms` names Lime and Editorial (Grunge measured out).
  **The repertoire gap is fitted** (user call, 2026-09-26): media's composed-row foot 37 / 47 / 35
  → 20 / 34 / 26, so the list ends the frames' 100 / 90 / 70 above the repertoire's head box
  under Lime, Grunge and Editorial — measured on card 3's published page under all three: 122 at
  1440, 100 at 1180, 90 at 768, 70 at 390. Digest: exactly media arch 2 at themes 1, 2 and 3,
  three widths, canvas and live (18 files), each root 17 / 13 / 9 shorter and nothing else;
  themes 0 and 4 at zero. Named in Lime's and Grunge's layout-3 plans.
- **Item 7**: `plans/README.md` closed the pass; `CONVENTIONS.md` took a third Editorial column on
  A, B and C, an Editorial column on D3 (its lead-in's 684 / 323 corrected to 709 : 334.5 and
  864.8 : 408.2), and four rows this pass leaned on three times or more: *a node can name another
  scheme's variable outright* (A), *a stand-in face's glyph floor is measured per site* (B), *the
  composed row's pad arm moves per section* and *a twin's frame-less control is checked against
  its own surround* (C). The plan's decorative language stays here. This plan's own 684 / 323 and
  621 : 293, its "nine" dashed sections and its radii bullet were corrected in place.
- **Item 9: the two-build digest** (`a3632f2`'s committed build against this branch's, one
  origin, reduced motion on; the old build digested before the `cp`). The default card: the
  seeded page byte-identical under all five themes at all three widths, and `modal.txt`
  identical (four Editorial cards in both). `CARD=2`: Retro and Pop identical; Lime and Grunge
  move by item 6 alone — one height, the media root's, −17 / −13 / −9, and every row under it
  that much higher (418–479 rows a width), nothing else; Editorial rebuilt (691 → 779, 675 → 768,
  639 → 726 rows), and the tell at every width is `repeating-conic` (the checker ribbon) old-only
  and the ink arch card (`118.9px 118.9px 0px 0px`), twenty dashed `rect`s and five more blush
  grounds new-only. The standalone file is 8,748,639 bytes (was 8,743,201); no photograph was
  added (the 49 files are untouched since `a3632f2`).

## Open questions

1. **Decision 1** — the header's Scheme 8, the nav's Scheme 5, the footer's scheme by page.
   *Settled in session 0: all three recommendations.*
2. **The bio well's covered leak** is Lime's `fa453f7d` under Editorial's own photograph, painted
   over — Grunge's layout-3 open question 4 again. Worth telling the designer.
3. **The gallery's twelve tiles** are Retro's layout-3 placeholders with Grunge's two and
   Editorial's hero and stage dealt in; the seven Editorial slots stand (layout 1, open question 3).
   Worth telling the designer with it.
4. **The header's chips 4 and 6 are lettered terracotta on terracotta** (`tag/6/bg` as their text
   fill), invisible at every width; the other three name `scheme/3` and `scheme/5` inks. The header
   session draws each seat's own ink. Worth telling the designer. *Settled in section 1: each
   chip reads `s.onScheme[1].chips[i % 2]`, blush in ink and terracotta in paper.*
5. **The narrow masters' leaks**, each for its session to follow or override (CONVENTIONS A, *leaked
   tops are followed where they show*, *a leak that shows and reads as a defect is overridden*):
   - the 768 `Tags — Frame` instance is **`Theme=Lime`** in Primitives: Lime — an olive-and-lime
     Genres row; *settled in section 2: not followed, the row is Editorial's at every width;*
   - the 768 bio's tape keeps the desktop `y` −45 without `Frame 302`, so it overlaps the head's
     foot; *settled in section 2: overridden — 768 takes `Frame 302`'s 50, the card 50 lower
     than its master;*
   - the bio's divider stroked **8** inside on a 1px frame (layout 2's slip), and 390 wide at 390;
     *settled in section 2: drawn as the 1px it clips to;*
   - the 390 bio card 390 wide at x −10 in its 370 instance; *settled in section 2: followed —
     the card bleeds through the root's padding;*
   - the 390 header 57 taller than the twins' on their tree. *Settled in section 1: not a leak —
     the band states 418.52 against 370.52 and the card is 136 against 127, both followed.*
6. **The demo glyphs** — layout 1's open question 5 and layout 2's "JUN 1", with pricing's "£350"
   rendering "£ ✱50". Worth telling the designer with layout 1's note. *Section 7: the text node
   reads "450" (the first package, £450), the 4 drawn as the demo's ✱; the seed prints it in
   Noto.*
7. **The testimonials' head breaks inside the word** at 1440 ("EXPERIENC / ES.") in its capped box;
   the twins' dropped cap stays dropped. Worth telling the designer.
8. **Header card 4** stays a placeholder: Retro's `HeaderV3` in Scheme 1 tokens, the checker
   ribbon, its footer ink by row 0. Its own pass's.
9. **The map's five dots are invisible on the frame's own render.** They bind `text/2` at .6,
   which the viewport's Scheme 4 resolves to ink — (28, 29, 23) on the raster's (41, 42, 27) —
   where layout 2's Scheme 3 viewport made the same node paper. *Settled in section 8:
   redrawn in `text/1` paper at the frame's .6.* Worth telling the designer, with open
   question 4's chips: the same class, a binding that reads in one scheme and not the next.
10. **The form's head breaks its own typed line at 1440.** "Book Kai for\nyour event" is two
    typed lines, but at 118 in the 634 box the demo face sets BOOK KAI / FOR / YOUR EVENT —
    three lines, 315 tall — open question 7's class (the demo face's measure). Ours prints the
    seed and fits it to its widest word, so nothing follows it. Worth telling the designer
    with question 7.
11. **The footer's seal loses its name on this page.** Layout 1's footer seal binds the name to
    `sem/tag/1/bg` — paper on the terracotta disc under Scheme 3 — and layout 3 stands the same
    component on Scheme 2, where that token is the disc's own blush, so the frame draws a seal
    with no readable name at any width. *Settled in section 11: redrawn in `sem/active/text`,
    the disc's own pair (ink here, paper under Scheme 3).* Worth telling the designer, with
    questions 4 and 9: the same class, a binding that reads in one scheme and not the next.

## Notes for the designer

*(The open questions above that are worth telling the designer, gathered by the sweep into one note
to forward, in layout 1's shape. Each is shipped as described; where it says "one line", the
other answer is a one-line change. Layouts 1's and 2's notes still stand.)*

1. **Three bindings read in one scheme and vanish in the next.** The same class three times on
   this page: a node bound to a token that is legible under the scheme the component was drawn
   in and not under the one this page stands it on.
   - The header's tag chips 4 and 6 are lettered `tag/6/bg` — terracotta on their terracotta
     fill — so they are blank at every width (chips 3 and 5 name Scheme 3's and Scheme 5's inks,
     which happen to be ink). The page letters each chip in its own seat's ink.
   - The map's five idle dots bind `text/2` at 60%, which the viewport's Scheme 4 resolves to
     ink on the dark map raster — (28, 29, 23) on (41, 42, 27) — where layout 2's Scheme 3
     viewport made the same node paper. The page draws them paper at the frame's 60%.
   - The footer seal's name binds `tag/1/bg`: paper on the terracotta disc under layouts 1 and
     2's Scheme 3, but the disc's own blush under this page's Scheme 2, so the frame's seal has
     no readable name at any width. The page inks it in the disc's own `active/text` — ink here,
     paper on layouts 1 and 2, unchanged there.

   Each is one line to reverse. *(4, 9, 11)*
2. **The bio's photograph hides another template's.** Under Editorial's own stage photograph (a
   crop of rows 11.9–50%) the well carries Lime's stage shot (`fa453f7d`) at `FILL`, painted
   over and invisible — a leak in the component rather than on the page. *(2)*
3. **The gallery's tiles are Retro's placeholders a third time.** The frame's twelve tiles are
   Retro's layout-3 set with two of Grunge's pictures and Editorial's hero and stage dealt in;
   the page's seven are the pictures of Editorial's own shoot (layout 1's note 4, layout 2's
   note 2). *(3)*
4. **The demo face drops a digit again.** Pricing's first price, "450", renders "£ ✱50" — the 4
   drawn as Fontspring's DEMO mark, as layout 2's "JUN 14" rendered "JUN 1". The page prints
   £450 in Noto. *(6)*
5. **Two heads break inside their measure in the demo face.** The testimonials' "Experiences."
   breaks EXPERIENC / ES. at 1440 in its capped 306 box; the page drops the cap, as Lime's and
   Grunge's do, and prints its own heading on the ramp. The form's "Book Kai for / your event"
   is two typed lines that the demo face sets on three at 118 in the 634 box (BOOK KAI / FOR /
   YOUR EVENT). The page fits the form's head to its widest word in the half column instead —
   70px on three lines at 1440 for the seeded head — and never breaks a word. *(7, 10)*
