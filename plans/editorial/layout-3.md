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
| 0 | *foundation* | `964:68717` *(page)* | — | `984:16811` | — | `984:16842` | — | — | — | — | Scheme 5, `SCHEMES_OF.Editorial[2]`, the footer's seat by page (decision 1) | |
| 1 | `header` | `964:68718` | 1440 × 900 | `984:16812` | 768 × 1024 | `984:16843` | 390 × **663.5** | **8** (≡ 3; nav **5**; chips and two rings name Scheme 1) | `964:68654` / `984:10740` / `984:10771` | `964:68686` / `984:13900` / `984:13931` | `if (s.lime \|\| s.grunge) { … return }` at the head of `HeaderV2` | |
| 2 | `bio` | `964:68728` *(head `964:68722`, in `Frame 302` `964:68727`, in Section `964:68721`)* | 858 × 882 | `984:16820` *(head `984:16815`)* | 708 × 912 | `984:16851` *(head `984:16846`)* | 370 × **811** | 1 | `964:68663` / `984:10748` / `984:10779` | `964:68695` / `984:13908` / `984:13939` | `if (s.v2 && (s.lime \|\| s.grunge))` ahead of `Bio`'s `if (s.v2)` | |
| 3 | `media` | `964:68739` list + `964:68738` card *(head `964:68731`)* | 858 × 424 + 858 × 243 | `984:16831` + `984:16830` *(head `984:16823`)* | 708 × 647 + 708 × 243 | `984:16862` + `984:16861` *(head `984:16854`)* | 370 × 647 + 370 × 243 | 1 (card **2**) | `964:68674` + `964:68673` / `984:10759` + `984:10758` / `984:10790` + `984:10789` | `964:68706` + `964:68705` / `984:13919` + `984:13918` / `984:13950` + `984:13949` | `if (s.lime \|\| s.grunge)` inside `Media`'s `if (s.v2)`, after `nHot` | |
| 4 | `repertoire` | `964:68743` | 1440 × 621 | `984:16832` *(in `984:16829`)* | 708 × **648** | `984:16863` | 390 × **704** | 1 (sets **4 / 2 / 3**) | `964:68678` / `984:10760` / `984:10791` | `964:68710` / `984:13920` / `984:13951` | `if (s.lime \|\| s.grunge)` inside `Repertoire`'s `if (s.v2)`, after `arrow` | |
| 5 | `calendar` | `964:68742` *(in `964:68740`; "Book Me" `964:68741`)* | 405 × **521.6** | `984:16835` *(in `984:16833`; `984:16834`)* | 708 × **471.6** | `984:16866` *(in `984:16864`; `984:16865`)* | 370 × 443.6 | 1 (the pill names Scheme 1) | `964:68677` / `984:10763` / `984:10794` | `964:68709` / `984:13923` / `984:13954` | `if (s.lime \|\| s.grunge)` inside `Calendar`'s `if (s.v2)`, after `line` | |
| 6 | `gallery` | `964:68744` | 1440 × 789 | `984:16836` | 768 × **877** | `984:16867` | 390 × **587** | **2** (tile rings name Scheme 1) | `964:68679` / `984:10764` / `984:10795` | `964:68711` / `984:13924` / `984:13955` | **no block** — `(s.lime \|\| grunge)` ternaries through `Gallery`'s `if (s.v2)` | |
| 7 | `pricing` | `964:68745` | 1440 × **1109** | `984:16837` | 768 × **975** | `984:16868` | 390 × **1383** | 1 (featured row **3**) | `964:68680` / `984:10765` / `984:10796` | `964:68712` / `984:13925` / `984:13956` | `if (s.lime \|\| s.grunge)` inside `Pricing`'s `if (s.v2)`, after `shown` | |
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

### 1. Schemes this page's route A cannot yet say — **session 0 asks**

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
   it (layout 2's item 6).
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

### Inherited and used

*(The running list the sweep folds into [`../CONVENTIONS.md`](../CONVENTIONS.md): each time a
session leans on a bullet from Editorial layout 1's or 2's, Lime's, Grunge's or Retro's
Conventions, name it here in one line, with the plan it came from, a blank line between sessions.)*

## Open questions

1. **Decision 1** — the header's Scheme 8, the nav's Scheme 5, the footer's scheme by page.
   *Session 0 asks.*
2. **The bio well's covered leak** is Lime's `fa453f7d` under Editorial's own photograph, painted
   over — Grunge's layout-3 open question 4 again. Worth telling the designer.
3. **The gallery's twelve tiles** are Retro's layout-3 placeholders with Grunge's two and
   Editorial's hero and stage dealt in; the seven Editorial slots stand (layout 1, open question 3).
   Worth telling the designer with it.
4. **The header's chips 4 and 6 are lettered terracotta on terracotta** (`tag/6/bg` as their text
   fill), invisible at every width; the other three name `scheme/3` and `scheme/5` inks. The header
   session draws each seat's own ink. Worth telling the designer.
5. **The narrow masters' leaks**, each for its session to follow or override (CONVENTIONS A, *leaked
   tops are followed where they show*, *a leak that shows and reads as a defect is overridden*):
   - the 768 `Tags — Frame` instance is **`Theme=Lime`** in Primitives: Lime — an olive-and-lime
     Genres row;
   - the 768 bio's tape keeps the desktop `y` −45 without `Frame 302`, so it overlaps the head's
     foot;
   - the bio's divider stroked **8** inside on a 1px frame (layout 2's slip), and 390 wide at 390;
   - the 390 bio card 390 wide at x −10 in its 370 instance;
   - the 390 header 57 taller than the twins' on their tree.
6. **The demo glyphs** — layout 1's open question 5 and layout 2's "JUN 1", with pricing's "£350"
   rendering "£ ✱50". Worth telling the designer with layout 1's note.
7. **The testimonials' head breaks inside the word** at 1440 ("EXPERIENC / ES.") in its capped box;
   the twins' dropped cap stays dropped. Worth telling the designer.
8. **Header card 4** stays a placeholder: Retro's `HeaderV3` in Scheme 1 tokens, the checker
   ribbon, its footer ink by row 0. Its own pass's.

## Notes for the designer

*(The open questions above that are worth telling the designer, gathered by the sweep into one note
to forward, in layout 1's shape. Layouts 1's and 2's notes still stand.)*
