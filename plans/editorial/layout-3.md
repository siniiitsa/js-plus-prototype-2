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
   `pageRows` gives them (684 / 323 at desktop).
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
| 8 | `map` | `964:68746` | 1440 × **813** | `984:16838` | 768 × **858** | `984:16869` | 390 × 883 | **4** (panel **3**, viewport 4) | `964:68681` / `984:10766` / `984:10797` | `964:68713` / `984:13926` / `984:13957` | `if (s.lime \|\| s.grunge)` inside `EventsMap`'s `if (s.v2)`, after `litRow` | |
| 9 | `form` | `964:68747` | 1440 × **589** | `984:16839` | 768 × **711** | `984:16870` | 390 × 741 | 1 | `964:68682` / `984:10767` / `984:10798` | `964:68714` / `984:13927` / `984:13958` | `if (s.lime \|\| s.grunge)` inside `EnquiryForm`'s `if (s.v2)`, after `up` | |
| 10 | `testimonials` | `964:68748` | 1440 × 790 | `984:16840` | 768 × **784** | `984:16871` | 390 × **1044** | 1 (cells **3 / 3 / 4 / 3**, two on 1) | `964:68683` / `984:10768` / `984:10799` | `964:68715` / `984:13928` / `984:13959` | `if (s.lime \|\| s.grunge)` inside `Testimonials`' `if (s.v2)`, after `template` | |
| 11 | `footer` | `964:68749` | 1440 × 479.5 | `984:16841` | 768 × 692.3 | `984:16872` | 390 × 736.3 | **2** (layout 1's frames: 3) | — | — | layout 1's `Footer` block, already `s.limeTree`; the seat is decision 1(c) | |
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
- **Dashed rules** — the language's main device, on nine sections. All 1px INSIDE; read each node's
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
  at 621 : 293 on the canvas and 684 : 323 in the published 1440 tab, media under the bio.

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
   Grunge's 3"), the testimonials' registers; the file table's line counts. Grep both files for
   "layout 3", "Editorial" and "placeholder"; and the code comments (`navModeDefault`'s, `navFits`',
   the `vm.pad` arms', `photos.js`' head, `SCHEMES_OF`'s "Layouts 3 and 4 are later passes'").
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
  the paper page in a terracotta dash.

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
   solid 2px ring (layout 2's form rule — which ink on paper is the session's).
10. **testimonials** — a three-register wall: **paper / ink / terracotta**, seated **`[0, 1, 2, 1, 0]`**
    over the five quote cells (Lime `[0, 1, 1, 2, 0]`, Grunge `[0, 1, 0, 1, 0]`) — write an Editorial
    `REG` / `SEATS` in `G`, never remap the twins'; the stat card `onScheme[3]` ink with a terracotta
    numeral; every cell square and dashed 5, 5 but `quote-cell` (unstroked — the twins ring it,
    Retro's normalisation); the quote at Label/LG 24 / 16 / 14 (Lime's token); the head ink at
    Display/MD.
11. **footer** — layout 1's tree on **taupe**: the band ringed paper, the seal blush with an ink
    sparkle, the statement paper (layout 1's fitted Bold; at 390 the frame breaks UNFORGETTAB / LE),
    the links and the foot ink, the Book pill blush. See *The eleventh session*.

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

## Notes for the designer

*(The open questions above that are worth telling the designer, gathered by the sweep into one note
to forward, in layout 1's shape. Layouts 1's and 2's notes still stand.)*
