# Grunge layout 3 — section-by-section plan

This is the working checklist for bringing **layout 3** of the Grunge template up to its Figma
designs, the way [`../lime/layout-3.md`](../lime/layout-3.md) did for Lime. It runs one section per
session, all three widths together, clearing context between sections. Layouts 1 (`s.v0`) and 2
(`s.v1`) under `s.grunge` are fitted and merged; nothing here should move either.

**This plan is Lime layout 3 again, with deltas — and the deltas are layouts 1 and 2's idiom.** It
does not repeat Lime's plan: the composed page, the wrapper insets, the procedure, the harness, the
digest and the verification are Lime's, verbatim, with `theme=1` read as `theme=2`. What is written
here is only what differs. And it does not repeat [`layout-1.md`](./layout-1.md) or
[`layout-2.md`](./layout-2.md) either: the gates, `faced` / `facedLh`, the uppercase-per-site rule,
the `G` lookup, the node walker, the paired diff, "rings, not glows" and the four-theme digest are
those passes', and they carry over whole.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then:
- [`../CONVENTIONS.md`](../CONVENTIONS.md), groups **A**, **B** and **C** (this plan inherits all
  three; group D is Lime's layout-1 and layout-2 blocks and does not apply — the Lime layout-3
  *Settled* bullets play its part here)
- the whole *Conventions* of [`layout-1.md`](./layout-1.md) — the foundation — and of
  [`layout-2.md`](./layout-2.md) — the widening idiom, the Scheme-2 and two-reds traps, the walker
  and the paired diff — plus both passes' *Settled* notes for the section you are about to fit
- the *Conventions* of [`../lime/layout-3.md`](../lime/layout-3.md), the section you are fitting
  above all: **its block is the block you widen**, and its *Settled* bullet says what that block
  reads, what it drops and what it measured
- the *Conventions* **and the 2026-09-15 Addendum** of [`../retro/layout-3.md`](../retro/layout-3.md),
  which built every `s.v2` branch; the Addendum is what the branches actually are now
- the *Per-session procedure* of [`../lime/layout-3.md`](../lime/layout-3.md)

Then the memory notes `figma-frame-reading`, `verifying-the-published-tab` and
`browser-tool-choice`. `SPEC.md` lives in git history: `git show 8fa8ff4:SPEC.md`.

Branch: **`grunge-layout-3`, forked from `main`.** `grunge-layout-2` merged as PR #28 (`b01f211`,
2026-09-22) with the refreshed root `index.html`, so unlike layout 2 this pass stands on `main`
directly. (`plans/README.md` said layout 2's push, PR and merge were "the user's call" until this
plan corrected it.)

## What the pass must deliver

1. **Every layout-3 section works in the published tab under Grunge**: every `s.v2` control
   CLAUDE.md lists under *`s.live` is false everywhere except the published tab*. Several are
   **controls the frames do not draw** — the gallery's fullscreen viewer, the repertoire's *View
   full set* reveal, the map's city chips, zoom and *See all gigs*, the pricing stack's moving
   FEATURED seat — added by user call or QA on the Retro pass and re-inked by Lime. Each session
   drives them at `theme=2&live=1` and checks that their overlay, scrim, lit and idle states read
   on Grunge's colours: **red on red is this template's risk**, and the repertoire's middle card,
   the pricing's featured row, the map's panel and three of the testimonials' cells are red grounds.
2. **Every layout-3 section looks as close to its Figma frame as possible**, at 1440 (× 0.82 onto
   the 1180 canvas), 768 and 390 — and, for the three composed sections, at the column widths
   `pageRows` gives them (684 / 323 at desktop, Lime's numbers).
3. **The setup modal's card 3, "Inset Hero", lays out a fitted page.** `pickHeader` writes arch 2
   to every section and reorders the page into `PAGE_ORDERS[2]`, so this pass is what turns card 3
   from its placeholder (layout 1, open question 4: "a red sheet round the photograph, checker
   ribbon; the nav capsule takes `s.box1`") into Grunge's own page. The header session verifies
   this **in the builder**, not only the harness, and the bio session verifies that the composed
   row composes under Grunge at desktop, canvas and published tab both.
4. **The sidebar's layout-picker thumbnails for layout 3** under Grunge look like their sections.
   Check once, in the end-of-pass sweep.

## What this pass actually is

**Grunge's layout-3 page is Lime's layout-3 page in a third variable mode, the way its layout-1
and layout-2 pages were Lime's.** The evidence, read at planning time (2026-09-22) with one
`use_figma` walk per page frame — main component, `explicitVariableModes` on every node, fills,
image hashes, effects, every vector wider than 1000 at any depth, every text node's face — and the
depth-6 `type:name` multiset comparison the two earlier plans used:

| Section | 1440 | 768 | 390 | What differs |
|---|---|---|---|---|
| header | 0.88 | 0.88 | **0.84** | the mock name (`+3 TEXT:StaticYouth` for Lime's three name nodes) and `+ RECTANGLE:image 1`, a grain rect. **At 390 two `FRAME`s fewer than Lime's** — read that master before assuming Lime's written-out 390 shape |
| bio | **0.56** | 0.56 | 0.55 | **the seal is swapped, not re-inked**: Lime's `Frame 248` (its classic inverted seal, with `Frame 174` / `179` / `180`, twelve `Rectangle 3–6` and the `image 1` grain inside it) is gone, and in its place is **`Frame 178`** — layout 1's red seal (`Group 9`, `Ellipse 5` / `6`, `Rectangle 7–10`, two `Static Youth` `TEXT_PATH`s) — plus `+ RECTANGLE:image 2` (grain on the photograph) and three unnamed `Frame`s. See *The bio*. Everything else is Lime's box for box |
| tags | 1.00 | 1.00 | 1.00 | on the page, not in the project |
| media card | 1.00 | 1.00 | 1.00 | — |
| media list | 1.00 | 1.00 | 1.00 | — |
| calendar | 1.00 | 1.00 | 1.00 | — |
| repertoire | 1.00 | 1.00 | 1.00 | — |
| gallery | 1.00 | 1.00 | 1.00 | — |
| pricing | 1.00 | 1.00 | 1.00 | — |
| map | 1.00 | 0.99 | 1.00 | `Frame 303` is `Frame 304` at 768 — a rename |
| form | 1.00 | 1.00 | 1.00 | — |
| testimonials | 1.00 | 1.00 | 1.00 | — |
| footer | 0.91 | 0.91 | 0.91 | vs Lime's: the mock name and its `Frame 178` seal. **1.00 / 1.00 / 0.98 against Grunge's own layout-1 footer** (`964:58610` / `986:44068` / `986:44080`; the 0.02 is the instance's own name) — out of scope, `NVAR.footer` is 1. The row is closed |

- **The three page frames are Static Youth, Scheme 1** throughout (`964:68685` reads `[Static
  Youth, Scheme 1]`; the 768 frame adds `Device: Tablet` and the 390 frame `Device: Mobile`).
  Every instance's root is Static Youth with at most a Scheme; **no Device override on any
  instance** at planning time, so layout 1's 390-hero trap should not recur. Checked on the roots
  only; each session re-checks its own three with `get_variable_defs`.
- **The main components are not shared** (`Theme=Grunge` variants: header `624:5059`, bio
  `675:1701`, and so on), as on every earlier page. The test is the tree.
- **No effect on any of the 39 masters.** Not one `DROP_SHADOW`, not one `INNER_SHADOW`, at any
  width. Lime's two glows (the header card's `s.glow`, the bio photograph's `s.ac`) are **gone**,
  as every layout-2 glow was; in their place are plain inside strokes (*decorative language*).
- **No seams.** The one vector wider than 1000 on any page frame — `Vector 2`, 1438 × 44.24,
  `#000000`, visible, a child of the media Section at x 1147.9 (`964:68703` / `984:13916` /
  `984:13947`) — is on **Lime's page too** (`964:68671`, the same box), is Lime's layout-1 arc
  shape by its size, stands at page x ≥ 1214 and draws black on the black page at every width.
  Not a seam, not drawn; a session that finds it should not chase it.
- **No Anton leak.** Every text node on the three page frames is Stones Crush, Inter or Chakra
  Petch, but for the bio seal's two `TEXT_PATH`s, which are **Bebas Neue 14.61** — Lime's face
  leaking through the duplicated component, as layout 1's seal leaked Anton. `faced`, as there.
- **The narrow shapes are Lime's, which are Retro's**: the tablet repertoire inside the media
  Section's `Frame 301`, the 390 calendar standalone under its "Book Me", the 390 header at
  Lime's 606.5. Re-measure every number, since the sizes are not Lime's (*Sizes*).

So, as under layouts 1 and 2: **no Grunge-only section blocks, and no Grunge-only ternary trees.**
The work is `s.grunge` deltas *inside the Lime layout-3 blocks*, each widened from `if (s.lime)` to
`if (s.lime || s.grunge)` with `const grunge = s.grunge` naming the deltas — or, past a handful,
the **`G` lookup at the block's head** whose Lime arm is today's literals so that theme 1 digests
to zero. **Theme 1 is the digest at risk in a widened block, not theme 0.**

**Where each Lime block sits decides how it widens** (Lime layout 3's *Settled* bullets; the
placements are in the sections table):

- `if (s.lime) { … return }` **at the head of the component** — `HeaderV2`. Widening the gate makes
  Retro's half unreachable under Grunge, so the one `s.grunge ?` placeholder arm layout 1 left in
  Retro's half (`mustard = s.grunge ? s.box1 : s.pillBg`, "until its layout-3 pass") becomes dead
  code and is **deleted**; the theme-0 digest proves nothing moved.
- `if (s.v2 && s.lime)` **ahead of `if (s.v2)`** — the bio, which has no state.
- `if (s.lime)` **inside `if (s.v2)`, after the seam** — media (after `nHot`), repertoire (after
  `arrow`), calendar (after `line`), pricing (after `shown`), map (after `litRow`), form (after
  `up`), testimonials (after `template`). The seam stays shared; widen the inner gate.
- **No block at all** — the gallery: `s.lime` ternaries through `Gallery`'s `if (s.v2)`, layout
  2's gallery call. It widens ternary by ternary, from the frame.

A section whose `get_metadata` tree differs from Lime's is the exception; record it under
*Conventions* before writing anything of its own. **The bio is that exception on this page** (the
seal), and its answer is already written (*The bio*).

### The composed page is already Grunge's

Layout 3's 1440 page does not stack every section: `Frame 299` (`964:68687`, 1440 × 2398) stands
the bio's Section and the media player's Section in an 878 left column at x 56 (the Sections 858
wide at x 10) and the booking calendar under its "Book Me" in a 405 right column at x 979. That is
Lime's `964:68655` **to the pixel** — the bio instance at y 201 under a 171 head, the media
Section at y 1318 with its 287 head and `Frame 301` at 317, the calendar at y 120 under "Book
Me". `pageRows()` keys on `designCount(cat, themeName)` with no template gate, `COLUMN_SPLIT` is
858 : 405 : 55, and `sectionVm({ column: true })` gives the three sections their 684 / 323, so
**the row already composes under Grunge — expect no change to either helper.** The header and
bio sessions still prove it in the builder (deliverable 3). `preview.jsx`'s `&column=left|right`
switch is Lime's and stays.

The three `T.name === 'Lime' && d === 2` **`vm.pad` arms in `sectionVm`** (bio / calendar / media,
pricing, form / testimonials — layout 2's plan misfiled them as layout 2's; `d` is the 0-based
design, so they are this pass's) carry Lime's measured insets. Each session reads its frame's
insets and widens the arm to `(T.name === 'Lime' || T.name === 'Grunge')` only where the Grunge
numbers match Lime's; the composed region's positions above say the bio's, media's and
calendar's do.

### Whose branch draws what in the composed region

Lime's table holds — the wrapper copy is drawn by the sections the Retro QA gave it to. What
changes is the face and the ink: "KM BIO" is Chakra Petch 20 / 14 / 12 in white; "Reads the
room." and "Five worth your ear" are Stones Crush 130 / 81 / 46 at lh .89, **red at 1440 on the
render** (Lime's are `s.ac` too, so the key holds; layout 1's positional word-two rule for the
bio's head does *not* carry unread — read the segments); "Book Me" is Stones Crush 36 / 28 / 26
in white. The `Tags — Frame` instance under the bio card (`964:68696`) is not drawn as a section;
Lime's bio block prints the Genres row under the card, and the widened block inherits it.

## The Figma source

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Frame 257 | `964:68685` | 1440 × 8495.5 |
| Tablet | Frame 264 | `984:13899` | 768 × 9597 |
| Mobile | Frame 265 | `984:13930` | 390 × 9657.4 |

- Desktop: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=964-68685&m=dev>
- Tablet: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=984-13899&m=dev>
- Mobile: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=984-13930&m=dev>

`fileKey` = `uFoUbPaBrDicjyuSBEbtGT`. All three, Lime's three and Retro's three are on the
**Layout 3** page, `964:58573`. `use_figma` reads on descendants want
`await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('964:58573'))` first.

**Match on node id and width, never on the name** — Lime's misnaming pattern holds exactly: the
composed instances are "— **Desktop**" at every width (the audio card, the list and the calendar
at 768 and 390; the bio at 768), both narrow footers are "— Desktop", and the tags instance is
"— Desktop" everywhere. The full-width sections' narrow masters are honestly named.

**Two things are wrapped**, as on Lime's page — the insets were read and are Lime's:
- **media**'s tablet Section (`984:13910`) holds `Frame 301` (`984:13917`) with the audio card,
  the list **and the repertoire** (`984:13920`) inside it, 30 apart. The repertoire's tablet
  master is not a top-level child.
- **calendar** stands in `Frame 300` under its "Book Me" at every width: 1440 `964:68707` (405
  wide at x 979; instance at y 120), 768 `984:13921` (instance at 30 · 111, 708 wide), 390
  `984:13952` (10 · 99, 370 wide).

## The sections

Page order — `PAGE_ORDERS[2]`, the narrow pages'. Sizes are the frames' own. Each row's three
masters are fitted in one session. **Lime block** is where that section's Lime layout-3 block sits
in `EncoreSection.jsx` (grep the Retro twin's desktop id to find the branch, then the Lime id for
the block); it is the gate this session widens.

| # | Cat | Desktop node | Size | Tablet node | Size | Mobile node | Size | Lime twin (1440 / 768 / 390) | Retro twin (1440 / 768 / 390) | Lime block | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `header` | `964:68686` | 1440 × 900 | `984:13900` | 768 × 1024 | `984:13931` | 390 × 606.5 | `964:68654` / `984:10740` / `984:10771` | `964:68622` / `977:22532` / `982:9583` | `if (s.lime) { … return }` at the head of `HeaderV2` | done e231ad0 |
| 2 | `bio` | `964:68695` *(head `964:68690`, in Section `964:68689`)* | 858 × 882 | `984:13908` *(head `984:13903`)* | 708 × 912 | `984:13939` *(head `984:13934`)* | 370 × 876 | `964:68663` / `984:10748` / `984:10779` | `964:68631` / `977:22717` / `982:10013` | `if (s.v2 && s.lime)` ahead of `Bio`'s `if (s.v2)` | done 095e495 |
| 3 | `media` | `964:68706` list + `964:68705` card *(head `964:68698`)* | 858 × 424 + 858 × 243 | `984:13919` + `984:13918` *(head `984:13911`)* | 708 × 647 + 708 × 243 | `984:13950` + `984:13949` *(head `984:13942`)* | 370 × 647 + 370 × 243 | `964:68674` + `964:68673` / `984:10759` + `984:10758` / `984:10790` + `984:10789` | `964:68642` + `964:68641` / `977:22728` + `977:22727` / `982:9779` + `982:9778` | `if (s.lime)` inside `Media`'s `if (s.v2)`, after `nHot` | done d067f7b |
| 4 | `repertoire` | `964:68710` | 1440 × 621 | `984:13920` *(in `984:13917`)* | 708 × 655 | `984:13951` | 390 × 702 | `964:68678` / `984:10760` / `984:10791` | `964:68646` / `977:23041` / `982:10193` | `if (s.lime)` inside `Repertoire`'s `if (s.v2)`, after `arrow` | done cb08bb9 |
| 5 | `calendar` | `964:68709` *(in `964:68707`)* | 405 × 537.6 | `984:13923` *(in `984:13921`)* | 708 × 482.6 | `984:13954` *(in `984:13952`)* | 370 × 441.6 | `964:68677` / `984:10763` / `984:10794` | `964:68645` / `984:10605` / `984:10673` | `if (s.lime)` inside `Calendar`'s `if (s.v2)`, after `line` | done 1a5bbcb |
| 6 | `gallery` | `964:68711` | 1440 × 789 | `984:13924` | 768 × 884 | `984:13955` | 390 × 585 | `964:68679` / `984:10764` / `984:10795` | `964:68647` / `977:23131` / `982:10257` | **no block** — `s.lime` ternaries through `Gallery`'s `if (s.v2)` | — |
| 7 | `pricing` | `964:68712` | 1440 × 1138 | `984:13925` | 768 × 993 | `984:13956` | 390 × 1393 | `964:68680` / `984:10765` / `984:10796` | `964:68648` / `977:23149` / `982:10274` | `if (s.lime)` inside `Pricing`'s `if (s.v2)`, after `shown` | — |
| 8 | `map` | `964:68713` | 1440 × 818 | `984:13926` | 768 × 828 | `984:13957` | 390 × 887 | `964:68681` / `984:10766` / `984:10797` | `964:68649` / `977:23264` / `982:10389` | `if (s.lime)` inside `EventsMap`'s `if (s.v2)`, after `litRow` | — |
| 9 | `form` | `964:68714` | 1440 × 562 | `984:13927` | 768 × 728 | `984:13958` | 390 × 741 | `964:68682` / `984:10767` / `984:10798` | `964:68650` / `977:23406` / `982:10472` | `if (s.lime)` inside `EnquiryForm`'s `if (s.v2)`, after `up` | — |
| 10 | `testimonials` | `964:68715` | 1440 × 790 | `984:13928` | 768 × 789 | `984:13959` | 390 × **1248** | `964:68683` / `984:10768` / `984:10799` | `964:68651` / `982:8584` / `982:10499` | `if (s.lime)` inside `Testimonials`' `if (s.v2)`, after `template` | — |
| — | `footer` | `964:68716` | 1440 × 479.5 | `984:13929` | 768 × 647.4 | `984:13960` | 390 × 619.4 | `964:68684` | — | — | **out of scope**: Grunge's own layout-1 footer, tree for tree (above); `NVAR.footer` is 1 |
| — | `tags` | `964:68696` | 858 × 75 | `984:13909` | 708 × 67 | `984:13940` | 370 × 97 | `964:68664` | — | — | **not in the project** (`d734992`); its Genres row is drawn inside the bio's Lime block, under the card |

`EncoreSection.jsx`'s fit comments cite the Retro twin's and the Lime twin's node ids, so grep for
either to find the branch and its block. **Cite branches by id, never by line number**: the file
is ~22 000 lines and every session moves it. **Re-measure from the Grunge frame; never reuse
Lime's block sizes** — the radii alone differ on nearly every card (below).

### Sizes: re-measure, and expect the type to be the difference

Grunge's ramp is Lime's but for the display sizes and the label row (layout 1's mode table), and
Anton at 0.75 runs narrower than Bebas Neue per em. The frames move where the type is the content:

| Section | Grunge 1440 / 768 / 390 | Lime 1440 / 768 / 390 |
|---|---|---|
| header | 900 / 1024 / 606.5 | the same |
| bio | 882 / 912 / **876** | 882 / 912 / 878 |
| media list | 424 / 647 / 647 | the same |
| media card | 243 at all three | the same |
| calendar (instance) | **537.6 / 482.6 / 441.6** | 538.6 / 483.6 / 450.6 |
| repertoire | 621 / 655 / **702** | 621 / 655 / 709 |
| gallery | 789 / 884 / **585** | 789 / 884 / 591 |
| pricing | **1138 / 993 / 1393** | 1199 / 1072 / 1474 |
| map | **818 / 828** / 887 | 819 / 831 / 887 |
| form | **562 / 728 / 741** | 570 / 734 / 755 |
| testimonials | 790 / **789** / **1248** | 790 / 790 / 1108 |

**The 390 testimonials master is 140 taller than Lime's** on an identical tree — Stones Crush at
Grunge's mobile ramp wraps its quotes further. The section is content-tall (Retro's reading), so
the number is the master's and not a target; the session names the diff. The pricing stack is
**61 / 79 / 81 shorter** than Lime's on the same tree, the display numerals and rows at Grunge's
smaller label sizes; measure the rows as Lime's session did (`flex-1` divisions of the stated
card), never transcribe them.

## Grunge's layout-3 mode

Static Youth's four schemes are in [`layout-1.md`](./layout-1.md), *Grunge's Figma mode*, with
the three traps under it (the leaked Lime inks `#15180F` / `#0D1F03`, `stroke2` `#FF0000`, and
Scheme 4 ≡ Scheme 1 byte for byte). All three recur here.

**Schemes by node**, from `explicitVariableModes` read off **every** node of every desktop master
(instances and frames alike), with the node's own fill and stroke beside it. **Do not carry
Lime's schemes-by-node row over** — five sites on this page (eight nodes) carry a *different
scheme* from their Lime twin, not only a different value (marked ✱). The table is the **desktop**
walk; each session re-reads its narrow masters.

| Section | Instance | Nested (desktop) | What it paints |
|---|---|---|---|
| header | Scheme 1 (page) | **no override anywhere** ✱ — Lime's nav pill was Scheme 3 | root `#000000`; the pill is Scheme 1's own `active` pair: `#DF262C` under `#15180F` (leaked) type, a `#0E0E0E` (`box3`) disc round a red arrow |
| bio | Scheme 1 | — | card `#1A1A1A` (`s.box1`) in a 1px `#FFFFFF` 15% ring; photo well `#0E0E0E` (`s.box3`); the seal `#DF262C` |
| media card | **Scheme 2** | — | Lime's three literals map to Scheme 2's values: the card **`#353535`** (`box/3`; Lime `#263020`), the idle bars **`#222222`** (`box/2`; Lime `dusk` `#43523B`), the disc **`#000000`** (`box/1`; Lime `s.box2`) — read each off the fills |
| media list | page | — | root `#000000`; rows on the page ground with top hairlines |
| calendar | Scheme 1 | the foot pill (365 × 54) **Scheme 2**: fill `#DF262C` | Scheme 2's `active` bg, ~~under the leaked `#15180F`, its disc Scheme 2's `box/1` `#000000`~~ — *corrected in section 5*: the label and the disc are both bound to `sem/bg`, so both are **`#171716`**, and the pill's own fill is `sem/text/1`, not `active/bg` (Lime's was `s.box1` — the key changes either way) |
| repertoire | page | the three `set` cards are **Scheme 4 / Scheme 3 / Scheme 4** ✱ (Lime 1 / 4 / 3) | `#1A1A1A` in a 1px **`#FF0000`** ring (`stroke2`), **`#9E1F17`** (Scheme 3 `box/1`) in a 1px **`#FFFFFF`** ring (Scheme 3's `stroke2`), `#1A1A1A` in `#FF0000` again — so the middle seat is the testimonials' red, and its ring is white, not black |
| gallery | **Scheme 2** | — | the sheet is Scheme 2's `sem/bg` **`#171716`** (Lime's block paints `s.box1`, which is `#1A1A1A` here — the plan's first trap); the tile wells *expected* at Scheme 2's `box/3` `#353535` (Lime's `#263020`) — the sheet was read, the wells are the token map's, so read them |
| pricing | page | the featured `row` (1328 × 266) **Scheme 3**: fill `#DF262C`, 1px `#FFFFFF` ring | the featured row is Scheme 3's `bg` under `#000000` type in Scheme 3's white `stroke2`; its badge Scheme 3's `box/1` `#9E1F17` (Lime `lime3`); **the instance carries a visible 1px `#FFFFFF` 15% ring** — layout 2's pricing drew Grunge's where Lime declined, and so does this one |
| map | **Scheme 4** ≡ 1 | `radius-map` (634 × 706) **Scheme 3** ✱ (Lime Scheme 2): fill **`#F52E34`** | root `#000000`: **no pale sheet** — layout 2's form trap in the map (below); the panel is Scheme 3's `box/2`, the layout-2 travel card's red, not `lime3` |
| form | Scheme 1 | — | root `#000000`; the card and boxes `s.box1` in `stroke1` (read); the submit red |
| testimonials | page | `rating` 275 **Scheme 3** (`#9E1F17`, black 15% ring); `quote-cell` 511 **Scheme 3** ✱ (`#9E1F17`, unstroked; Lime Scheme 2); `name-cell` 510 **Scheme 4** ✱ (`#1A1A1A`, white 15% ring; Lime Scheme 2); `small-quote` 510 **Scheme 3** ✱ (`#9E1F17`, black 15% ring; Lime Scheme 4); `feat-quote` inherits (`s.box1` by inheritance — read it) | a **red / red / dark / red / dark** register where Lime's was olive / olive / olive / mist / olive: write a Grunge `REG`, never remap Lime's |
| footer | Scheme 2 (layout 1's) | — | `#171716` |

Six traps in that table, each a place where Lime's block reads a key that lands on the wrong
value under Grunge — **and on this page the nested scheme often changes too, not only the value**:

- **Scheme 2's `sem/bg` is `#171716`, not `s.box1`** — the gallery's sheet, and the footer's.
  Layout 1's rule holds: a section on another scheme writes that scheme's values as named
  literals (`HeaderV0`'s `G2`, layout 2's `G.bg2`). The gallery has no block, so its sheet
  ternary names the literal in place.
- **The audio card is Scheme 2 and Lime's block is three literals.** `#263020` / `#43523B` and
  `s.box2` become `#353535` / `#222222` / `#000000` — a `G` lookup whose Lime arm is those
  literals (layout 1, sections 4–10).
- **Scheme 4 ≡ Scheme 1, so the map has no sheet.** Lime's block paints a full-bleed `s.tx` sheet
  and flips every ink to `s.bg`; under Grunge `s.tx` is white and the frame's root is plain
  `#000000`, the page ground. The sheet paint, the ink flip, the `hair` hairline (`#15180F26`),
  the `mist` discs and the ink lit row all change — and the render's **lit row is red**
  (`#DF262C` sampled in the list column) where Lime's is an ink pill. Expect a `G` lookup with
  a dozen keys, layout 2's form and map precedent; read the pins, the rings and the zoom buttons
  off the nodes, since Lime's are `s.ac` and `lift` on a lime panel and the panel here is
  `#F52E34`.
- **Scheme 3 is red, and it is on more of this page than on layout 2's.** The repertoire's middle
  card, the pricing's featured row, the map's panel and three testimonials cells are Scheme 3, and
  they do not share one hex: `bg` `#DF262C` (the featured row), `box/1` `#9E1F17` (the set card,
  the cells, the pricing badge), `box/2` `#F52E34` (the map panel). Its `stroke2` is **white**
  (`#FFFFFF`), its `stroke1` **black** 15% (`#00000026`), its `text1` **black** — so a Lime block
  that reads `s.stroke2`, `s.stroke1` or `s.bg` inside a Scheme 3 node lands on the wrong value
  (`#FF0000`, white 15%, black — the last by coincidence). Name each as the scheme's literal in
  the session that meets it (layout 2's `#00000026`).
- **The repertoire's seats moved scheme.** Lime seated `box1` / `mist` / `lime3` by rendered place
  with the 390 master's centred `mist` card as the discriminator; Grunge's masters seat dark /
  red / dark. Re-read the 390 master's centre card before inheriting Lime's seating, since the
  discriminator was the *colour* and the colours are a different set.
- **The leaked inks and the two reds are followed** (layout 1, open question 5): the header pill's
  `#15180F`, ~~the calendar pill's `#15180F`~~ (*section 5*: the calendar's pill is lettered
  `sem/bg`, not `active/text`, so no leak reaches it), `#FF0000` wherever `stroke2` is bound. Where a Grunge
  node is bound to `sem/active/text`, the code reads `s.activeFg`, which is that leaked ink already.

### Grounds

Sampled off the three renders at the band edges and the middle. **The sequence is identical at
1440, 768 and 390.**

| # | Section | Ground | What stands on it |
|---|---|---|---|
| 1 | header | page `#000000` | the `hero-card` well, `#383838` (`s.box2`) under the photograph, radius **15** (Lime 50), in a `stroke1` hairline; the capsule nav on it |
| 2 | bio | page | a `#1A1A1A` card, radius to read (Lime 50 / 60 at 390), `stroke1` ring; the red seal |
| 3 | media | page | the Scheme 2 card `#353535` (radius to read; Lime 50); rows on the page with top hairlines |
| 4 | repertoire | page | three cards: `#1A1A1A`, `#9E1F17`, `#1A1A1A`, each ringed (at 390 the carousel's peeks reach the page edge) |
| 5 | calendar | page | a `#1A1A1A` panel (read its ring — Lime's is the page's one 2px ring) |
| 6 | gallery | **full-bleed `#171716` sheet** (Scheme 2) | tiles on `#353535` wells, ringed |
| 7 | pricing | page, in the instance's own `stroke1` ring | rows: page ground in a ring, the featured one `#DF262C` in a white ring |
| 8 | map | **page** (no sheet) | the `#F52E34` panel, radius to read; the list on the ground with a red lit row |
| 9 | form | page | a `#1A1A1A` card |
| 10 | testimonials | page | the five cells above, three of them `#9E1F17` |
| — | footer | `#171716`, layout 1's | — |

**No root flag widens**, Lime's rule again: `bleed`, `darkMap`, `cream`, `limeBand`, `limeLight`,
`grungeBand` and `grungeRule` all gate on `s.v0`. Lime's two layout-3 sheets were painted in the
branch by the written-out bleed margin; Grunge keeps the gallery's (as the `#171716` literal)
and **loses the map's**. Layout 3 is therefore **a black page with one sheet**.

## Grunge's layout-3 decorative language

Everything here is behind `s.grunge` (or a named pair), and replaces what the Lime block gates on
`s.lime` and the Retro branch on `s.retro`.

- **No grain on the bands, no torn edges, no checkerboard, no tilt, no drop shadow, no hard
  offset shadow, and no seal but the bio's and the footer's.** Every `Grain`, `Checkerboard` and
  `tilt()` in the nine `s.v2` branches and `HeaderV2` is Retro's and stays gated off.
- **Rings, not glows — and this time the walk already proved it.** No node on any of the 39
  masters carries an effect, so Lime's two `INNER_SHADOW`s become plain strokes and every ring is
  read off `strokes`, layout 2's rule turned into a fact:
  - **`#FF0000`, `sem/stroke/2`** (Scheme 1's): the header's capsule (168 × 38, r999), its glass
    card (220 × 249, r15) and the portrait in it (87, r10); the repertoire's two dark set cards
    (429 × 369); expect it on the pricing's plain rows (Lime's are `sem/stroke/2` too — read).
  - **`#FFFFFF`, Scheme 3's `stroke/2`**: the repertoire's red set card, the pricing's featured row.
  - **`#000000` 15%, Scheme 3's `stroke/1`**: the testimonials' `rating` and `small-quote`; expect
    it on the map panel's chips and rows (Lime's `hair`).
  - **`stroke1`** (white 15%) on everything else Lime hairlined: the hero-card well, the bio card,
    the media rows' top rules, the pricing instance, the testimonials' `name-cell`, the calendar
    panel (read its weight — Lime's is 2px), the form card and boxes.
  - Draw each as an inset `boxShadow` (Lime's rule, so every stated height holds), on an overlay
    where an image or a child would paint over it.
- **The header's glass card is not glass.** Lime's is `s.box1` at 1% lit by a radius-19 `s.glow`
  with a 1px `s.ac` ring; Grunge's is **opaque `#1A1A1A` in a 1px `#FF0000` ring at radius 15**,
  its portrait on `#1A1A1A` in the same ring at radius 10, its second line "Performing since 2021"
  Inter 12 in `#DF262C`. The composition — an upright card at the foot's right, turned horizontal
  at 390 — is Lime's.
- **Grain inside two photographs**, the `b74be8bc` raster (`vm.grainSrc`, already widened), each
  under `Grain`'s opt-in `grunge` with `exact`, passed as **one four-value `inset` shorthand plus
  `width` / `height`** (layout 2, section 1):
  - **header**: `image 1`, a 1400 square at (20, −276) inside the 1400 × 860 well at 1440, node
    `LIGHTEN` at .29, its gradient paint hidden — layout 2's header recipe. **Narrow it is not a
    square**: 748 × 964 at 768 and 370 × 964 at 390, so the fixed-square recipe does not carry
    unread; take each master's box.
  - **bio**: `image 2`, the photograph's own 798 × 380 box (648 × 380 / 350 × 259 narrow), node
    **`SCREEN` at opacity 1** — layout 2's bio recipe (open question 4 there closed it: the lift is
    the node's, to the level). Sample as that session did.
  - Nothing else carries grain, hidden or shown. A stddev scan that finds it means this list
    missed a layer.
- **The bio's seal is layout 1's.** `Frame 178`, 125.37 rotated 26.06° (a 167.7 bounding box at
  1440), `#DF262C` with `#000000` marks — the same red disc layout 1's bio, pricing and header draw
  — where Lime's frame draws its classic §10.2 seal in inverted inks. `SealBadge`'s
  `(s.lime || s.grunge) && !classic` branch already draws it as `[s.ac, s.bg]`; **Lime's bio block
  passes `classic`, which skips that branch**, so the widened block passes `classic={!grunge}` (or
  the Lime call and a Grunge call), never `classic` unconditionally. The name is `faced`; its
  `TEXT_PATH` is Bebas leaking (above). Place it by the bounding box's centre, layout 1's rule.
- **Radii are read, not inherited**: the header well 15 (Lime 50), its card 15 (45), the portrait
  10 (21), the capsule 999, the pill 57.2 (a capsule on 35), the location square 4, the chips 3;
  every card Lime's blocks draw at 50 (bio, calendar, repertoire sets, pricing rows, form,
  testimonials cells, the map panel, the audio card) is **expected at 15**, layout 2's pattern, but
  each is read off its node — the bio card kept 30 on layout 2 where the rest took 15.
- **Type**: every display and label string is `faced` / `facedLh` and uppercase at its own site
  (layout 1, session 0). Read off the header: the capsule links are **Stones Crush 20** —
  `s.labelMd` by size, a token Lime's block never reads (its links are Bebas 18, `s.labelSm`), but
  Grunge's `label-md` and `label-xs` are both 20 / 14 at the two widths that draw links, so
  **confirm which with `get_variable_defs` on a link node** before the `navFits` arm reads it — the name
  24 (`s.labelLg`, Grunge's ramp; Lime's 32), Listen and Book Now 16 (`s.labelSm`), the location 24
  (`s.labelLg`), the hero name 130 (`s.dispLg`), the card's name 36 (Display/Title). Heads on the
  render: the bio's "READS THE ROOM." and the media's "FIVE WORTH YOUR EAR" red; the calendar's
  "BOOK ME", the repertoire's "CURATED SETS", the pricing's "PRICING", the map's "WHERE I'M
  PLAYING." and the testimonials' "EXPERIENCES." white; the gallery's "GALLERY" and the form's
  "BOOK KAI FOR YOUR EVENT" red. Each is one tone on the render, so layout 1's positional two-tone
  splits (the bio's word two, the media's, the pricing's) do **not** carry unread — confirm each off
  the text segments, and every heading's line count is measured, not transcribed.

## Photography

Every photograph this page draws is **already in `photos.js`** but one. Image hashes, read off
the frames at all three widths:

| Section | Slot (frame box) | Hash | Seeded today | Verdict |
|---|---|---|---|---|
| header | `hero-card` 1400 × 860 / 748 × 1004 / 370 × 586 | `221f121f` | `grungeHero` | ✓ — `FILL`; read `scaleMode` before its transform (layout 2, section 1) |
| header | portrait 87 × 87 | `3ef9ee55` | `grungeHeaderAvatar` (the singer) | ✓ — **not a leak this time**; layout 2's tile carried Lime's `e3790c2c` |
| bio | photo 798 × 380 / 648 × 380 / 350 × 259 | **`8031d0f3` under `CROP`**, over Lime's `fa453f7d` at `FILL` on the well | `grungeStage` (the drummer, 820 × 1024 portrait) | **the pass's one open photograph.** The well's own fill is Lime's stage shot — a covered leak, painted over — and the child frame holds Grunge's drummer under **`CROP`, which honours its `imageTransform`**: the first transform on any Grunge master that is not ignored. Read it and correlate the render; the likely answer is a landscape export seeded through `SEEDS.Grunge.layouts[2].bio`, Lime's own mechanism (`SEEDS.Lime.layouts` carries `2` and `3`), and nothing else in `photos.js` moves. Open question 1 |
| media | five 64 × 64 sleeves | `8c7fa7d8` `4e7cc529` `b737c3e0` `40041573` `21e9622c` | `ROW_ART.media` | ✓ the shared covers |
| gallery | twelve tiles | Retro's layout-3 colour set with **`221f121f` and `8031d0f3` dealt in** (`3f0c98b4`, `b35b6507`, `9d20fe0d`, `221f121f`, `b073b46f`, `f70d25d3`, `3f0c98b4`, `ae069c14`, `8031d0f3`, `b35b6507`, `3a59b4d1`, `0b079033`, `221f121f`) | `GRUNGE_PHOTOS.gallery`, seven slots | **layout 1's departure again**: the frame's strip is Retro's placeholder set with two Grunge shots in it; the seven Grunge slots stand |
| map | `Map Texture` 570 × 472 / 315 × 514 / 350 × 157 | `e089bd11` | `vm.mapRadialSrc` (every designed template's) | ✓ — on a `#F52E34` panel this time; sample the plate |
| testimonials | four 24 × 24 `av` | `ef14e35b` `ae0de808` `2de917bf` `fbe69d03` | — | nothing: Retro's stat card draws `vm.quotes[].mark` discs, and Lime invented its own pair for them; read what a disc needs on `#9E1F17` |

**The greyscale is in the assets** (layout 1, session 0), so nothing here desaturates. The gallery
strip's colour tiles and the testimonials' colour faces are the frame's placeholders, not ours.

## What already renders, and the traps in it

A code survey at the start of this pass (`grep -n "s.grunge\|const grunge" EncoreSection.jsx`
against the `if (s.v2` line numbers):

- **No `s.v2` branch reads `s.grunge`, and neither does any Lime layout-3 block** — the nine blocks
  are gated `s.lime` alone. So goal 1 is met before any session runs (every control is shared `v2`
  code, as in layouts 1 and 2), and each session still runs `theme=2&live=1` for layout 1's reason:
  a live **state** can stop reading on a red ground.
- **`HeaderV2` renders Retro's half in Grunge tokens** — its `if (s.lime)` block is not widened —
  with the one `s.grunge ?` placeholder arm layout 1 left there so card 3 would publish
  (`mustard = s.grunge ? s.box1 : s.pillBg`). Open question 4 of layout 1 describes the picture
  ("a red sheet round the photograph, checker ribbon"). The arm leaves with this pass's first
  session.
- **Every other `s.v2` branch renders Retro's arm flat under Grunge, and on this page that is
  worse than flat.** Under Grunge `s.paper` is `s.tx` (white) and `s.pillBg` is the accent, so
  Retro's cream sheets and cards come out **white** (the gallery's sheet, the calendar's card, the
  form's card, the testimonials' light cells, the media's now-playing card) and Retro's mustard
  map sheet comes out **red**. Card 3 today is a white-and-red page; the Lime blocks, widened, are
  what take it black.
- **`sectionVm` carries Lime-keyed layout-3 arms that do not fire under Grunge.** Each session
  reads its frame and widens the arm to `(T.name === 'Lime' || T.name === 'Grunge')` only where
  the numbers match:
  - the three **`vm.pad` arms at `d === 2`** (above, *The composed page*): bio / calendar / media
    (top 50, feet 30 / `padY` / 37 · 47 · 35), pricing (foot 32 at 1440 and 768), form /
    testimonials (form foot 90 / 60; testimonials head 56 / 30, foot 56);
  - ~~**`vm.kicker`'s `LIME_KICKER_3`** … gated on Lime in both `sectionVm` and `EditPanel`~~
    *Done in section 1:* renamed `KICKER_3`, widened in both.
  - ~~**`vm.navFits` at `d === 2`** has no Grunge arm~~ *Done in section 1* (the Grunge arm
    serves both layouts; see *Settled in section 1*). The original note: it had a Lime arm and a Retro arm and **no Grunge arm** (the
    `EncoreBuilder.jsx` comment says so: "Its layout 3 has no arm yet, so it keeps the burger"), so
    the 768 header would fold to the burger where the master draws Music / Gigs / About. The
    Grunge arm sums at the capsule's own **`labelMd`** (20 at 1440 — read the 768 size) against
    Lime's 684, plus the capsule's fixed gaps as layout 2's arm added them; `vm.navEms` at `d === 2`
    needs the same face and size. Section 1's.
  - **`vm.titleWordEms`** is `bebasEms` and Lime-only: it shrinks the form's desktop head until its
    widest word fits the half column. Anton at 0.75 is narrower, so measure the seeded
    "UNFORGETTABLE." at desktop first; if it outruns the column, widen through `antonEms` (the
    `navFace` route), never a literal cap. Section 9's.
- **`SEEDS.Grunge` has no `layouts` row**, where Lime's carries `2` and `3` for the landscape bio
  stage. Open question 1 decides whether it gains one.
- **`FIELDS` rows keyed by template** already carry `Grunge` beside `Lime` for the header's keys
  (`kicker` / `tags` / `showTags` `[0, 2, 3]`, `location` all four, `cta2` `[1, 2]`, `showBadge` /
  `badgeText` `[0, 3]`, subtitle and `heroCta` `[1]`, `align` `[0]` — layout 2's sweep measured them
  over the **placeholder** card 3) and for `calendar.heading` (`[0, 1, 2, 3]`) and `media.cta`.
  Each session re-measures the rows its category owns with `scripts/reach.mjs 2` after fitting.
- **`HeaderV2` renders under Retro, Lime and Grunge only** (`headerFamily`), so the header needs
  the theme-0 and theme-1 digests and not the flat two's. Every other section needs all four.
- **Under Grunge header arch 2 has no fold partner** (`HEADER_COUNT.grunge` is 4, as Lime's), so a
  header change is **three** theme-2 files — header arch 2 at three widths — not layout 2's six.
- **Lime layout-3 open question 5's literal** (`#263020`) and the repertoire's `mist` / `lime3`
  seats are block-local Lime literals; the widened blocks give each a `G` arm and never edit them.

## Per-session procedure

[`../lime/layout-3.md`](../lime/layout-3.md)'s *Per-session procedure*, steps 1–9, with:

- step 2 (section 1 only): `git switch -c grunge-layout-3 main` and commit this plan and the
  `plans/README.md` rows there; then the "before" pictures at `theme=2&arch=2` for all eleven
  categories at desktop (`node scripts/shots.mjs before 2 2`) into the scratchpad.
- step 3: `get_metadata` on the three Grunge nodes **and both twins'** desktop nodes.
- step 4: run layout 2's **node walker** once per master (or the paired diff against the Lime
  twin, sections 8–10's route) before writing anything — it returns every box, fill, stroke,
  effect, radius, mode and text segment in one call, and on this page it is what finds a nested
  scheme that moved.
- step 5: implement inside the section's existing **Lime layout-3 block**, widened to
  `(s.lime || s.grunge)` at the placement the sections table names, with `const grunge = s.grunge`
  or the `G` lookup; read the block's *Settled* bullet in Lime's plan first — it says what the
  block reads and does not read. Never edit a Lime or Retro literal to make Grunge look right.
  Desktop numbers × 0.82, 768 and 390 verbatim; every display string `faced` / `facedLh` /
  uppercase at its site.
- step 6: the harness is `preview.html?cat=<cat>&arch=2&theme=2&w=desktop|tablet|mobile`
  (`preview.jsx` defaults `arch` to 1, so pass it), with `&column=left|right` for the bio, the
  media player and the calendar at desktop; function at `theme=2&live=1`; **zero rows at themes
  0, 1, 3 and 4** before and after, every session (`node scripts/digest.mjs before 0,1,3,4` /
  `after`, then `cmp`), because these edits sit inside blocks Lime renders and branches Retro
  renders; then the same at theme 2, where the differing files must all be `_arch_2_` and this
  section's category. A theme-2 diff in any `arch_0` or `arch_1` file is a regression of a merged
  pass.
- step 9's hand-off prompt:

  ```
  Continue the Grunge layout-3 pass with section N, `cat`.

  Read CLAUDE.md, then plans/grunge/layout-3.md, then plans/CONVENTIONS.md, then the Conventions
  of plans/grunge/layout-1.md and plans/grunge/layout-2.md and their Settled notes for this
  section, then the Conventions and this section's Settled notes of plans/lime/layout-3.md, then
  the Conventions and the 2026-09-15 Addendum of plans/retro/layout-3.md, then the
  `figma-frame-reading`, `verifying-the-published-tab` and `browser-tool-choice` memory notes,
  and follow the per-session procedure.

  The three Grunge masters are `<desktop node>` (<W> × <H>), `<tablet node>` (768 × <H>) and
  `<mobile node>` (390 × <H>) in Figma file uFoUbPaBrDicjyuSBEbtGT, page 964:58573; the Lime
  twin is `<lime nodes>` and the Retro twin `<retro nodes>`. Widen the Lime block
  `<placement>` of `<Component>` in EncoreSection.jsx to `(s.lime || s.grunge)` and fit the
  Grunge deltas inside it. Themes 0, 1, 3 and 4 must digest to zero rows, and theme 2 may differ
  only in `<cat>` arch 2.

  <the two or three conventions most likely to bite this section>

  Branch: grunge-layout-3. Do not refresh the root index.html.
  ```

Do **not** refresh the root `index.html` per section. It is the sweep's last step, with the
two-build digest (`scripts/build-digest.mjs`, `CARD=2` for card 3). The seeded `EXAMPLE_PAGE` is
arch 0 throughout, so the page walk will show no difference at any theme; the proof that this
pass shipped is card 3 in both builds' setup modals, as it was for Lime.

### The first session: the header

`HeaderV2` is where deliverable 3 is met, so its verification is the builder's, not only the
harness's. With `scripts/page-check.mjs Grunge 2` (the template and a 0-based card list; the
first card listed gets the full walk, so `Grunge 2,0,1,3` also proves the other three render
and publish) or a puppeteer script off it:
- the setup modal still shows **four** Grunge cards, card 3 renders the fitted header, and cards
  1 and 2 are unchanged (the theme-2 `arch_0` and `arch_1` digests say so);
- choosing card 3 opens the editor on a page whose every section is arch 2, in `PAGE_ORDERS[2]`,
  with the bio, media and calendar **composed** at desktop and the footer at arch 0;
- publish, then in the popup: every nav link scrolls, the burger opens at 390 and at 820 (a fresh
  tab each), Book Now reaches `#form`;
- the Retro header at theme 0 and the Lime header at theme 1 digest to zero rows;
- `scripts/reach.mjs 2` re-measures the header's `Grunge` rows over the fitted card, and
  `FIELDS.header`'s `in` is corrected where the placeholder measurement differs.

Four things the header settles for the pass:
- **`navFits` and `navEms` under Grunge at `d === 2`** — the Grunge arm of the JP-039 sum at the
  capsule's own `labelMd`, plus the fixed gaps, against 684. The 768 master draws the three
  Minimal links in the capsule; the seeded nine are the burger, as under Lime.
- **`LIME_KICKER_3` widened in both places** (`sectionVm` and `EditPanel`), or renamed to say it is
  layout 3's rather than Lime's — the constant is the frame's copy on both templates.
- **The pill's pair** — Scheme 1's `active` with a `box3` disc, no nested scheme: read the fills,
  and pass `bg` / `fg` / `discFg` only where `BookPill`'s Grunge defaults are not the node's.
- **The rings' colour under Grunge** — `#FF0000` on the capsule, the card and the portrait is the
  first `stroke2` ring of the pass; write it as `s.stroke2` and every later section reads the
  same key. The card's Lime glow (`s.glow`) is the one `boxShadow` the block drops rather than
  recolours.

### The second session: the bio

The composed row's proof is the bio's (deliverable 3), and the bio is this page's one tree
exception:
- **The seal**: `Frame 178` is layout 1's red disc, so the widened block does not pass `classic`
  under Grunge (above). Read layout 1's *Settled in section 2* for the placement rule and the
  Bebas leak.
- **The photograph**: `CROP`, so read the `imageTransform` and correlate the render with
  `grungeStage` cover-fitted before deciding on a landscape export (open question 1). The
  screened grain at 1 is layout 2's bio recipe, sampled the same way.
- **The head**: the render draws "READS THE ROOM." all red; layout 1's word-two accent was that
  page's frame. Read the segments and record which rule this frame takes.
- **The builder**: Grunge → card 3 → *Use this header*; the bio and the calendar in one grid row
  at 621 : 293 on the canvas and 684 : 323 in the published 1440 tab, media under the bio.

## The end-of-pass sweep

Written now from what the plan can see; the sections add to it. One session, in this order:

1. **CLAUDE.md and README.md**, wherever they describe Grunge as designed at layouts 1 and 2, or a
   layout-3 state as Retro's and Lime's alone. The known sites: CLAUDE.md's "**Grunge is designed
   at layouts 1 and 2**" paragraph and its "at layouts 3 and 4 every other section still renders
   its shared branch flat" clause; its header-family line ("cards 3 and 4 render `HeaderV2` and
   `HeaderV3` in its tokens … each its own layout pass's to fit"); every layout-3 paragraph that
   names a Lime-only state — the gallery viewer's re-inked scrim ("under Lime its scrim is the page
   ink at .94"), pricing's "**Lime's stack reads no `vm.tierRow`**", the form's `vm.titleWordEms`
   ("a Lime-only key"), the map's layout-2 block reading layout 3's `zoom` — owes a Grunge clause
   where the session found the same or another state; README's "Grunge is designed at layouts 1
   and 2"; `data.js`'s `headerFamily` comment; `photos.js`'s header; `sectionVm`'s `grunge` flag
   comment; `EncoreBuilder.jsx`'s "Its layout 3 has no arm yet". Grep both files and the four
   source files for "layout 3", "Grunge" and "flat".
2. **One whole-page published check under Grunge at layout 3** — `scripts/page-check.mjs Grunge
   2,0,1,3` plus the layout-3 controls Lime's sweep listed (header nav and burger at 390 and 820,
   the media card's disc and the rows with audio, the repertoire's set cards, pager and *View full
   set*, the calendar's dots and pill, the gallery's viewer — open, arrow, Escape, scroll lock —
   the pricing capsule and its moving seat, the map's city chips, rows, pins, zoom and *See all
   gigs* at `n=30`, the form's refused and valid submits, the footer's links). Then 180px seam
   clips at 1440 and 390: the gallery's `#171716` sheet is the one full-bleed edge on this page,
   and the map now stands on the page ground between the pricing's ring and the form's card.
3. **The layout-picker thumbnails** for arch 2 under Grunge (deliverable 4).
4. **The other three header cards** still render and publish. No shared component should move in
   this pass; card 4 keeps Retro's checker floor as its placeholder, its own pass's.
5. **`scripts/reach.mjs 2`** over the whole template: every `Grunge` row in `FIELDS` measured over
   fitted layouts 1, 2 and 3 and placeholder 4.
6. **`plans/README.md`**: mark the pass closed; **`CONVENTIONS.md`**: fold in whatever *Inherited
   and used* below confirmed again, and add any bullet a third layout of a widened template
   leaned on and the file does not yet name (the nested-scheme rule below is the candidate).
7. **Refresh the root `index.html`** with the two-build digest, `CARD=2`: zero rows at every theme
   on the seeded page; the shipped-it tell is card 3 in the two builds' setup modals (the old
   build's card 3 carries the checker ribbon and the red sheet; the new one the `#383838` well in
   its hairline and the red-ringed card).

## Conventions

Append as the pass goes. Do not repeat layouts 1's and 2's, Lime's or Retro's bullets; name them.

- **Layouts 1's and 2's conventions all hold**: the gates are `s.grunge`, the named pairs and
  `s.designed`; never edit a Lime or Retro literal; `faced` / `facedLh` and uppercase per site; the
  `G` lookup whose Lime arm is today's literals; the node walker and the paired diff; theme 1 is
  the digest at risk.
- **Harness:** `theme=2`, `arch=2`, `&column=` for the three composed sections.
- **Layout 3 is a black page with one sheet.** Every section stands on `#000000` with `#1A1A1A`,
  `#353535` and red cards on it, except the gallery (a `#171716` sheet); the map's Scheme 4 sheet
  collapses onto the page. No seams; no effect on any master.
- **Read every nested node's scheme off the Grunge master, never off Lime's row.** Five sites on
  this page — eight nodes — carry a different scheme from their Lime twin (the repertoire's three
  cards, the testimonials' `quote-cell`, `name-cell` and `small-quote`, the map's `radius-map`,
  and the header's pill, which has none) — layout 2's traps were a different *value* under the same scheme; this page's are a
  different *scheme*. The desktop table above is the walk; each session re-reads its narrow
  masters.
- **Scheme 3 is three literals here, not two**: `#DF262C` (its `bg`, the featured pricing row),
  `#9E1F17` (its `box/1`), `#F52E34` (its `box/2`) — and its `stroke2` is white, its `stroke1`
  black 15%, its `text1` black. A session on a Scheme 3 node names all it reads.
- **`CROP` honours the transform; `FILL` ignores it.** Layout 2's rule was written over `FILL`
  fills. The bio's photograph is the first `CROP` on a Grunge master, so there the transform is
  read and the render correlated.
- **A `CROP` transform does not adapt when an instance is resized — the band is stretched.** The
  bio's 768 master keeps the desktop transform in a narrower box, so the frame draws the same
  band squashed horizontally (slice-stretched 0.92 against any cover's ≤ 0.53). A cover cannot
  squash and should not: centre the same band in our box and name it. `objectPosition` through
  `Photo`'s `style` is the route, not a landscape export, when the narrowest master is a plain
  `FILL` of the same file.
- **The composed row's pad arm moves per section, so the two heads part in between.** The
  `vm.pad` arm at `d === 2` gives the bio, media and calendar a 50 top together under Lime; under
  Grunge each joins in its own session (the digest rule), so until section 5 the calendar's
  "Book Me" stood 30 below "KM BIO" on the 1440 page. *Closed in section 5*: with all three
  joined, the Lime half and the Grunge half are one condition again
  (`(T.name === 'Lime' || T.name === 'Grunge') && (bio || calendar || media)`) and the three
  heads stand together at 41.
- **The calendar's foot is `vm.padY`, not the frame's 56, and that is Lime's arm.** The
  `d === 2` arm gives the calendar `vm.padY` under its card — 80 at desktop against the
  frame's 45.9 (56 × 0.82), exact at 768 and 4 over at 390. Section 4's repertoire-gap rule:
  moving it would move Lime's page, so it is a named diff and one for a Lime-and-Grunge pass,
  the sweep's to raise.

### Settled in section 1 (the header)

- **No Grunge block: Lime's `if (s.lime) { … return }` at the head of `HeaderV2` is
  `(s.lime || s.grunge)`**, `const grunge = s.grunge` naming the deltas (about a dozen sites — no
  `G` lookup). The tree is Lime's node for node at 1440 and 768, on Scheme 1 with **no nested
  scheme anywhere** and no Device override. Retro's half lost `mustard`'s `s.grunge ? s.box1`
  arm (now `s.pillBg`, and nothing else in that half reads `s.grunge`); the theme-0 digest is
  zero.
- **Open question 3, answered: the 390 master's two missing frames are the nav's 1px spacer
  cells** (`Frame` 296.5 × 1 either side of the name at 1440, 140.75 × 1 at 768). Lime's block
  already folds them into its two halves, so nothing was written for them; Lime's written-out 390
  (the 370.52 band, the card on its side, padding 20, gap 21) describes this master too.
- **Rings, not glows, as predicted — and every ring is `s.stroke2`.** No node carries an effect.
  The capsule (168 × 38, r999), the card (220 × 249, r15, now **opaque `s.box1`**) and the
  portrait (87, r10, on `s.box1`) are 1px inside `#FF0000`; the well keeps Lime's `stroke1`
  hairline. The card's `s.glow` is the one shadow dropped. Radii are raw **15 / 15 / 10 at every
  width** (Lime 50·50·20 / 45·45·12 / 21), the chips' **3.01** (`radius/chip` 4 × 0.752; Lime
  4.51), everything else about the chips Lime's (Label/XS × 0.752, 3.76 / 8.27, gap 6.01 —
  read at all three widths).
- **The capsule is `s.box1`, its links white at Label/MD, gapped a fixed 18.** `get_variable_defs`
  settles the plan's open choice: the links are bound to **`size/label-md`** (20 / 14), Lime's to
  `label-sm`. So `linkCap` is `s.labelMd` under Grunge (the `clamp` cap and the narrow size), the
  links read `s.tx` (Lime `s.ac`), and the gap is layout 2's fixed `u(18)` with `navGaps` in the
  `reserve` and the left cell's `minWidth`. In `sectionVm`, `navGapEm` is 0 at `d === 1 || d ===
  2` under Grunge, and the Grunge `navFits` arm serves both layouts — Label/SM at `d === 1`,
  Label/MD at `d === 2` — against 684 with Lime's 138.32 (the walk's paddings, gaps and disc are
  Lime's to the hundredth). Measured at 768: up to **seven** seeded names draw, eight and nine fold
  to the burger; **Minimal's capsule is 138.8 × 31.4 against the master's 140 × 31**, the name
  centred. At 1440 the seeded nine hold one row at 16px (12 rendered), a 560 capsule, the name
  slid right — Lime's accepted behaviour.
- **The three names are two-tone** — the nav's wordmark, the hero and the card's — `sem/text/2`
  then `text/1` at the first space, Title's split. `Title` takes `twoTone={grunge}`; the other two
  go through a block-local `brand()` that returns `s.brand` untouched under Lime. The card's name
  and the location are direct `s.display` sites, so they take `faced` / `facedLh` and
  `textTransform` behind `grunge`.
- **The well paints a second fade Lime's does not.** Two `GRADIENT_LINEAR` fills, both
  `#1A1A1A`@1 → `#15180F`@0: the first is Lime's floor fade (transform `[[0, −1, 1], [1, 0, 0]]`,
  t = 1 − y); the second's `[[0, 6.956, −0.566], [−6.956, 0, 3.978]]` gives t = 6.956y − 0.566 —
  **opaque over the head to 8.14%, clear by 22.51%**. The render confirms it (flat 25–33 above
  y 100 in every column, the lights' included), so it is drawn as `linear-gradient(to bottom,
  s.box1 8.14%, #15180F00 22.51%)` and the links stand on the dark. Read every paint in a fill
  list, not the first of each type.
- **Grain inside the well**: `image 1`, lighten .29, gradient paint hidden, well-relative at
  (0, −296) 1400² / (0, 20) 748 × 964 / (0, −189) 370 × 964 — through `Grain`'s `style` as one
  four-value `inset` plus `width` / `height`. At 768 the sheet is shorter than the 1004 well, so
  a flat band shows at its head and foot: the frame's too (sampled, 25.5 vs our 26.0 flat, 41.0
  vs 40.9 at the sheet's edge). Not a defect.
- **The pill follows the leaked ink**: `fg={s.pillFg}` (`sem/active/text`, `#15180F`) on
  BookPill's red; the disc takes the same ink where the node draws `#0E0E0E` (`box3`), a named
  7/255 diff, since BookPill paints the disc in the label's colour and gaining a prop for it was
  not worth it. Layout 2 took `fg={s.bg}` for the same node; either reads black.
- **`KICKER_3`** (was `LIME_KICKER_3`): "Performing since 2021" is the frame's copy on both
  templates, so the constant is renamed and its gate widened in `sectionVm` and `EditPanel`
  together; Retro's layout 3 keeps "DJ · Live Act".
- **Measured against the masters' content edges**: desktop h1 at 520 (634.48 × 0.82 = 520.3),
  card 180.4 × 203.9 at 957 / 491.5 (180.4 × 204.2 at 957.8 / 491.2), pill 85.4 × 28.6 (88.8 ×
  28.6 — Anton narrower), capsule 30.7 tall (31.2); 768 h1 at 824.4 (824.48), card 220 × 239.6
  at 506 / 742.4 (220 × 240 at 506 / 742), pill 95.9 × 34.9 (99.3); 390 h1 at 312 (311.93), card
  350 × 127 at 20 / 459.4 (exact), pill 93 × 34.9 (96.3), section 606.4 (606.45). Named diffs:
  five chips where the frame draws six (`TAG_LABELS`), and the frame's fourth chip lettered
  white on red where `vm.chips` letters it `#0D1F03` (a component override the seats do not
  model).
- **`FIELDS.header` needed no change**: `scripts/reach.mjs 2` over the fitted card gives kicker /
  tags / showTags `[0, 2, 3]`, location all four, cta2 `[1, 2]`, showBadge / badgeText `[0, 3]`,
  subtitle / heroCta `[1]`, align `[0]` — the rows layout 2's sweep measured over the placeholder.
- **Verified in the builder**: `scripts/page-check.mjs Grunge 2,0,1,3` — four modal cards; card 3
  lays out every section at arch 2 in `PAGE_ORDERS[2]` with the calendar composed beside the bio
  at 1440 (both at top 738); in the published 1440 tab all eleven header anchors scroll to real
  ids, Book Now on `form`; the 390 burger opens 1 → 11 links; no errors or warnings; cards 1, 2
  and 4 render and publish. The 820 burger, in a fresh tab by a one-off script (deleted): 2 → 12
  anchors, a panel link scrolls `#pricing`, no overflow.
- **Digest**: themes 0, 1, 3 and 4 zero files, canvas and `live=1`, and the full 810-render
  five-theme run differs in exactly header arch 2 at theme 2, three widths.

### Settled in section 2 (the bio)

- **No Grunge block: Lime's `if (s.v2 && s.lime)` ahead of `Bio`'s `if (s.v2)` is
  `(s.lime || s.grunge)`**, `const grunge = s.grunge` naming the deltas at nine sites, plus a
  block-local `brand()` and `upper`. The tree is Lime's box for box at all three widths — the
  440 / 279 photo row, the 148 / 144 / 184 head band, `Frame 8`'s 100 / 100 / 52 gaps, Frame 9,
  the 179 name cap, the 1px rules at node opacity .32 in white (Lime's `${s.tx}52`, unchanged),
  the `stroke1` card ring at 1440 and 768 and none at 390 — on **Scheme 1 with no nested scheme
  and no Device override**. Every size is a Grunge ramp token (`get_variable_defs`: display-sm
  50 / 40 / 30, label-xs 20 / 14 / 12, chip 12 / 11 / 11, body-md 14 / 13 / 13), so no `T` table.
- **The deltas, off the walk**: the card's radius is **50 at 1440 and 768 and 15 at 390** (Lime
  60) — the plan's "expected 15" held only at 390; the photograph is a raw **15** at every
  width (Lime 55) on the same `s.box3` well, with **no effect** — Lime's `s.ac` glow is dropped
  and nothing replaces it (no stroke on the node either); the name is **two-tone**, `sem/text/2`
  then `text/1` at the first space (the header's `brand()` copied in), `faced` / `facedLh` and
  uppercase; the stat **values are Label/XS in `font/ui`** — Chakra Petch at 1.26, written
  directly rather than through `labelStyle`, which would `faced()` a real face — with a
  **2.52em** floor (two lines at 1.26, the frame's 50 box) where Lime's 2.2em is two at 1.1.
- **Open question 2 closes: the head is one tone.** "Reads the room." is a single `#DF262C`
  segment at every width (Stones Crush 130 / 81 / 46 at .89), so the block keeps Lime's `s.ac`
  and adds `faced` / `facedLh` / uppercase. The two Grunge bios disagree by frame: layout 1's
  word-two accent was that page's, not the template's.
- **Open question 1 closes: no export, an `objectPosition`.** The fill is `8031d0f3` under
  `CROP` with `[[1, 0, 0], [0, 0.3811, 0.1689]]` — rows 16.9–55% of `grungeStage`, full width —
  at 1440 and 768, and a plain `FILL` at 390. PIL against the renders: the slice correlates
  **0.93 / 0.92** (desktop / 768) where a centred cover gives −0.01 / 0.02; 390's centred cover
  gives **0.885**. At desktop the slice's 2.10 aspect is the box's, so it is a cover at
  **27.3%** (0.89 at the peak, the screened grain included); the 768 box is narrower but keeps
  the same transform, so the frame squashes the band (see *Conventions*) and ours centres it in
  our 628 × 380 at **22.7%**; 390 is centred. Passed as `Photo`'s `style.objectPosition` behind
  `grunge && !s.mob`, so an upload takes the same band. A landscape export through
  `SEEDS.Grunge.layouts[2].bio` was rejected: it would have cropped 768's sides and given 390 a
  different band from the frame's whole-portrait cover. `photos.js` did not move.
- **Grain inside the photograph is layout 2's bio recipe on the photo's own box**: `image 2` is
  exactly the 798 × 380 / 648 × 380 / 350 × 259 box, `SCREEN` at 1, the `b74be8bc` raster under
  `FILL` — `<Grain exact grunge blend="screen" opacity={1} />` with the default `inset: 0`.
  Sampled (mean / stddev inside the photo, corners skipped): frame **86.9 / 40.8**, ours **87.4 /
  41.1** at desktop; 86.9 / 41.4 against 85.0 / 41.6 at 768; 86.1 / 40.0 against 84.0 / 39.3 at
  390. The card beside it samples 26.0 flat on both.
- **The seal is layout 1's red disc**: `classic={!grunge}`, tilt **26.06** (Figma −26.06), disc
  125.37 / 62.68. Placed by the bounding box's centre — (30, 653.92) 167.7² in the instance at
  1440 and 768, so 113.85 in and 148.77 / 152.77 down the about band (`left` 51.17, `top` 86.08 /
  90.08), **8.25 right of and 1.6 above Lime's**; at 390 (265.96, 41.93) 83.85², Lime's centre to
  the hundredth, so its `right` / `top` stand. Measured with the spin stopped: centre 93.4 in
  (113.85 × 0.82 = 93.4) and 3.2 above the frame at desktop — the head band's difference, below;
  exact at 768 (737.8 into the card); 62.1 from the card's right at 390, as in the frame. The
  frame's name is Bebas leaking; `SealBadge`'s Grunge branch sets the label face, `faced`.
- **`vm.pad`'s layout-3 arm takes the bio under Grunge alone** — top 50 / 50 / `padY`, foot 30 —
  split from Lime's three-section arm so media and the calendar do not move this session (see
  *Conventions* for the interim parting).
- **Named diffs**: "KAI MERCER" holds one line at 0.75 where the frame's "STATIC YOUTH" wraps
  in the 179 cap, so the desktop head band comes out 118 against 121.4 (148 × 0.82) and
  everything under it stands 3.4 higher; the 390 values run one line where the frame's copy
  hand-breaks "JUNE\n2021" (Retro's QA stat rule); the seeded paragraphs are shorter than the
  frame's, so the cards run 706.7 / 865.5 / 765 against 882 × 0.82 / 912 / 876; the Genres row's
  two red chips are lettered `#0D1F03` where the frame letters every chip white — `TagChips`
  takes no ink, and this is the same component-override diff layout 2's bio and section 1 named
  (the chips are otherwise the frame's: 28.3 tall at desktop against 35 × 0.82, radius 4 read,
  gap 8, *Live* wrapping at 390 where the frame wraps *All Access*, having five to its six).
- **`FIELDS`: one hint moved, no `in` row.** `scripts/reach.mjs 2` (2,784 renders) now has
  `who.tags` and `who.showTags` reaching bio layouts **2, 3 and 4** — Lime's Genres row, widened
  — so `FIELDS.header.tags`' hint reads "(in Lime and Grunge, layout 3 as well)"; the header's
  own rows are unchanged. `vm.showBadge` / `vm.badgeText` read the bio's own content (`cv`), not
  the header's fields, so the header's `showBadge` / `badgeText` Grunge rows (`[0, 3]`, the
  header's own layouts) are untouched by a bio that now draws a seal. CLAUDE.md's "prints them in
  layouts 2 and 4 and Lime's 3" owes "and Grunge's" in the sweep.
- **No live control**, Lime's note: `live=1` digests byte-identical to the canvas at all three
  widths. `&noimage=1` holds: the white 64px initials on `s.soft`, under the screened grain,
  which lifts the empty well to a mid grey — the frame's own layer order, over a photograph or
  not.
- **Verified in the builder**: `scripts/page-check.mjs Grunge 2` — four modal cards; card 3's
  published 1440 page stands the bio and the calendar in one row at top 738, media under the bio
  at 1761; every nav link and fragment anchor scrolls to its id; no errors or warnings; the 390
  burger opens 1 → 11 links, no overflow. The column widths were not re-read: `pageRows`,
  `arrangeRows` and `COLUMN_SPLIT` are untouched since section 1 walked the row, and the
  harness's `&column=left` renders the bio at the 684 it is given.
- **Digest**: themes 0, 1, 3 and 4 zero files, canvas and `live=1`; theme 2 exactly bio arch 2
  at three widths on both surfaces.

### Settled in section 3 (the media player)

- **No Grunge block: Lime's `if (s.lime)` inside `Media`'s `if (s.v2)`, after `nHot`, is
  `(s.lime || s.grunge)`**, with a five-key `G` at its head (`card`, `dusk`, `disc`, `radius`,
  `ring`) whose Lime arm is today's literals, and `const grunge = s.grunge` naming the `disp`
  spread and the heading's cap. The paired diff against the Lime twin (head, card, list, at all
  three widths) found the trees equal node for node, the boxes within a pixel, **no effect on any
  node** and no Device override. The hooks sit above the branches, so the published player needed
  nothing new.
- **The card is Scheme 2, as planned, and it gains a ring.** `#353535` (`box/3`), idle bars
  `#222222` (`box/2`), disc `#000000` (`box/1`, where Lime's reads `s.box2`), at a raw radius
  **15** at every width (Lime 50), in a **1px inside `#FF0000`** stroke, drawn as an inset
  `boxShadow` on the card with `s.stroke2` (the bars stand in the 24 padding, so no overlay).
  The played bars read `s.ac` (`#DF262C`, the frame's). The list needed nothing: the root is the
  page's `#000000`, the sleeve wells are `#383838` (`s.box2`), the hairlines are white 15%
  (`s.stroke1`), every ink is `s.tx`, and the sizes are all ramp tokens (body-sm 12, chip 12 / 11,
  display-lg 130 / 81 / 46, `get_variable_defs`'s Grunge numbers read as `s.*`).
- **Type**: the heading, the card's two names (`s.list`) and the rows' titles (Display/Title)
  are `faced` / `facedLh` and uppercase. The heading is **one red tone at every width** (the
  segments, not layout 1's two-tone split). The desktop frame breaks after "WORTH"; Lime's
  `u(632.156)` cap is 6.48 Anton ems at 0.75 and would hold "FIVE WORTH YOUR" (6.43), so under
  Grunge the cap is **layout 2's `4.6em`**. 768 and 390 set one line, as their masters do (the
  390 head is 41 tall at 46 in a 370 box; ours is 285 wide in the 346 column).
- **`vm.pad`'s layout-3 arm takes media under Grunge** (top 50 / 50 / `padY`, foot 37 / 47 / 35,
  Lime's, since the composed region is Lime's to the pixel). The feet were measured by Lime's
  session against Lime's repertoire head; the repertoire session re-checks the gap under Grunge.
- **Measured against the masters' content edges** (`column=left` at desktop): eyebrow 20.2, h2
  190.4 (232 × 0.82) on two lines at 80.25px standing 44.8 under the eyebrow's top, card 197.8
  (243 × 0.82 = 199.3) at radius 12.3; 768 head 120 (eyebrow 17.6 + 30 + h2 72.1 on one line),
  card 236.8; 390 head 86 (15.1 + 30 + 40.9 on one line), card 236.8. **Named diffs, Lime's**:
  the narrow card is 236.8 against the stated 243 (Grunge's body-sm 12 takes one more px off
  Lime's 238); the rows are content-tall (Lime's open question 3); the clock row reads 00:00 /
  the track's length and `track.rel` where the frame types 1:00 / 2:00 and "Mix 028"; the narrow
  meters paint from the left; Anton at 0.75 against Stones Crush.
- **`live=1` at desktop and 390** (puppeteer, autoplay allowed, probe in the scratchpad): a row
  click plays that track and its number becomes the glyph, a second click pauses, the disc plays
  again. `n=0` prints the head and the counter with no card; `n=8` holds. No page errors.
- **Verified in the builder**: `scripts/page-check.mjs Grunge 2` — four modal cards, bio and
  calendar at top 738, media under the bio at 1761, every anchor scrolls, no errors or warnings.
- **`FIELDS.media` moves nothing** (layout 3 draws no pill; `cta` stays `{ Lime: [0], Grunge:
  [0], '*': [] }`).
- **Digest**: themes 0, 1, 3 and 4 zero files, canvas and `live=1`; theme 2 exactly media arch 2
  at three widths on both surfaces.

### Settled in section 4 (the repertoire)

- **No Grunge block: Lime's `if (s.lime)` inside `Repertoire`'s `if (s.v2)`, after `arrow`, is
  `(s.lime || s.grunge)`**, with a four-key `G` at its head (`seats`, `pad`, `radius`, `rowH`)
  whose Lime arm is today's literals, and `const grunge = s.grunge` naming a `disp()` helper
  (`facedLh` and uppercase) for the head and the row titles. The paired diff against the Lime
  twin found the trees equal node for node (**57 = 57 / 57 = 57 / 63 = 63**), no effect on any
  node, no Device override; every size is a Grunge ramp token (`get_variable_defs`: display-lg
  46 / 81, list 18 / 19, body-lg 15, chip 11, body-sm 12 — the desktop 130 / 24 / 16 / 12 / 12
  are `THEME_RAMP.Grunge` × 0.82), so no `T` table. The hooks sit above the branch, so the
  reveal and the 390 pager needed nothing new.
- **The seats are dark / red / dark, by Lime's rendered place.** The 390 master centres the
  red card, which is Lime's seat 1 exactly, so the seating rule holds unchanged and only the
  colours move: seats 0 and 2 are Scheme 1 — `s.box1` in a 1px `#FF0000` (`s.stroke2`) ring,
  meta `s.ac`, rules `s.stroke1`; seat 1 is Scheme 3 — `#9E1F17` (`box/1`) in a **white**
  ring, a **black** meta line, black 15% (`#00000026`) row rules, titles, artists and link
  still white. So the card's ring and its row rules are two keys (`ring` / `edge`) where
  Lime's one hairline did both; Lime's seats carry no `ring` and fall back to `edge`.
  Driven live at 390: next, then prev ×2, and the colours stay put while the sets rotate.
- **The deltas**: padding **24** (Lime 34), radius **15** (50), rows **44.5 / 62.5 / 62.5**
  (39 / 57 / 57.5) — each master's `flex-1` division of its 369 / 439 / 439 card. The head
  is one white tone (`s.tx`, Lime's key), `faced` / `facedLh(0.89)` / uppercase; the row
  titles `faced(s.list)` / `facedLh(1.2)` / uppercase. The pager pills are the frame's
  `#DF262C` rings round red arrows, which Lime's `s.ac` already draws.
- **Measured against the masters' content edges**: desktop head 95.2 (116 × 0.82), grid 19.7
  under it, cards **302.6** (369 × 0.82) at radius 12.3, padding 19.7, rows 36.5 (44.5 × 0.82),
  view block 38.6 (38.5); 768 head 72.1 (72), cards 216 × **438.3** (439), rows 62.5, view 46.8
  (47); 390 head 40.9 (41), cards 290 × 438.3 at −260 / 50 / 360 (the master's x), grid 24
  under the head. **Named diffs, Lime's and Retro's**: the head is `s.title` ("12 Songs")
  where the frame writes "Curated sets"; the meta line is the set's count where the frame has
  a mood and a running time; the right-hand column is the artist, not a duration; the 768
  cards are 216 against 222.7 (a 688 column against 708); the section's own 80 / 56 / 44 top
  pad is the shared `padY`, not the frame's 56 / 60 / 60 (the plan's `vm.pad` arms never
  carried a repertoire row, under Lime either).
- **The gap under the media section — the re-check section 3 owed — is Lime's, and off the
  frame.** Measured last media content → repertoire head: the frame's (glyph bounds, so a few
  px generous to us) **109.3** (133.3 × 0.82) / **128.2** / **109.2**; ours **128.5 / 117 /
  93** — media's foot 48.5 / 61 / 49 plus the repertoire's `padY` 80 / 56 / 44 — and the same
  three numbers at theme 1. So Grunge inherits Lime's gap exactly, and both run +19 at desktop
  and −11 / −16 narrow, because the repertoire's top is the shared `padY` where the frame's
  instance pads 56 / 60 / 60 and stands 66 / 30 / 10 under the list. A named diff, not fixed
  here: a repertoire row in the `d === 2` `vm.pad` arm would move Lime's page too, and it is
  one for a Lime-and-Grunge pass (the sweep's to raise), not a Grunge-only arm.
- **`live=1`**, desktop and 390: the carousel wraps both ways; at `n=20` *View full set*
  reveals one card (three links become two) and Next turns to the All card on page 2; `n=0`
  prints *No songs yet.*; no page errors. No red-on-red state: the pills stand on the page.
- **Verified in the builder**: `scripts/page-check.mjs Grunge 2` — four modal cards, every
  anchor scrolls (Repertoire → `#repertoire`), no errors or warnings, the 390 burger 1 → 11.
- **`FIELDS.repertoire` has no `in` row**, so no `reach.mjs` run was owed.
- **Digest**: themes 0, 1, 3 and 4 zero files, canvas and `live=1`; theme 2 exactly
  repertoire arch 2 at three widths on both surfaces.

### Settled in section 5 (the booking calendar)

- **No Grunge block: Lime's `if (s.lime)` inside `Calendar`'s `if (s.v2)`, after `line`, is
  `(s.lime || s.grunge)`**, with `const grunge = s.grunge` naming the deltas at **three** sites
  and a block-local `disp()` for the display type — **no `G` lookup, because there is almost
  nothing to look up**. One node-walk call over the two wide masters and a second over the 390
  one (plus the `boundVariables` of eleven nodes) found Lime's tree box for box at all three
  widths — the 20 padding, the 18 stack gap, the 8 grid gap, the 30.713 dot with its raw 2.559
  ring, the 21 legend gap, the pill's 5 / 5 / 5 / 21 round a 46 × 44 disc, `Frame 300`'s 30
  head gap — on **Scheme 1** (`187:1` beside `187:4`) with **no Device override** and **no
  effect on any node**. Every size is a ramp token (display-lg 130 / 81 / 46, display-sm
  50 / 40 / 30, title 36 / 28 / 26, body-lg 16 / 15 / 15, body-md 14 / 13 / 13, body-sm 12),
  so no `T` table; the hooks sit above the block, so the published day picking needed nothing.
- **Every colour Lime's block reads is bound to the same `sem` key here**, which is why this is
  the cheapest widening of the pass: the card `box/1` in a `border/thin` (2px) `stroke/1` ring,
  the numeral / month / year / weekday / day-letters all `text/2`, the dots `box/2` booked,
  `text/1` picked (= `s.ac`, `#DF262C`) and `box/1` inside a `stroke/1` ring free, the legend's
  two marks the same two fills. Nothing needed renaming and no Scheme 3 appears on this master.
- **Two values move, and one of them corrects the plan.** The card's corner is a raw **15** at
  every width (Lime 50), layout 2's pattern; and the foot pill's label and disc are
  **`#171716`** — Scheme 2's `sem/bg`, the **one nested scheme on the master** — where the
  plan's table predicted Scheme 2's `box/1` `#000000`. Named as the literal (`HeaderV0`'s `G2`
  rule); Lime's `fg={s.box1}` is `#1A1A1A` here, which would have looked nearly right and read
  as the card's own fill. The pill's ground is `sem/text/1`, which `BookPill`'s `s.pillBg`
  default already is, and its arrow follows `bg`, so `fg` is the single override.
- **Three display sites owed `faced` / `facedLh` / uppercase**, through `disp(lh)`: "Book Me"
  (Display/Title, Lime's `lu(36 / 28 / 26)` literal — `size/title` to the number, so the
  literal stands and only takes `faced`), the numeral (Display/LG, lh 0.89) and the month
  (Display/SM, lh 1). The pill's label needed nothing: `labelStyle` already faces and cases it
  under Grunge. The year, weekday, day letters and legend are Inter at the ramp.
- **Measured against the masters' content edges** (`column=right` at desktop): "Book Me" at 41
  (50 × 0.82) and 32.4 tall (40 × 0.82), the card 24.6 under it at radius 12.3 (15 × 0.82) in a
  2px ring, head 155 (189.74 × 0.82 = 155.6), numeral 95.2 (116 × 0.82 = 95.1) at 80.25px,
  month 41 at 30.75px, year 11, weekday 13, legend 20.6 at 10px, pill 44.3 (54 × 0.82) with a
  37.7 × 36.1 disc, dots 25.2 in a 2.1 ring; 768 head at 50 and 30.8 tall, card at 110.8
  (111) radius 15, head 134.3 (134.74), numeral 72.1 (72), month 40, legend 24.8 (25), pill 54
  on a 46 × 44 disc, dots 30.7 in 2.6; 390 head at 44 and 28.6 tall (29), card radius 15, head
  93.1 (93.74), numeral 40.9 (41), month 30, pill 54 `full`. **Named diffs, Retro's and
  Lime's**: the cards run 472.3 / 520.5 / 479.3 against 537.6 × 0.82 / 482.6 / 441.6, each the
  frame plus one dot row, because the seeded June runs five weeks where the frame draws four;
  the 390 card is 346 in the root's own 22 padX against the master's 370 at 10; the frame's
  four `box/2` booked dots and its week of red "selected" dots are filler the section has no
  model for; the desktop foot (see *Conventions*).
- **`live=1`** at desktop and 390: a dot click moves the numeral, the weekday and the pill to
  *Enquiry About June 24 / Tue*, a second click falls back to the cued June 12, the pill is
  `<a href="#form">` live and a span on the canvas, and 30 dots take a pointer where the canvas
  has none. `&booked=2025-06-12` drops the numeral and the weekday, prints *Pick a date to
  enquire*, gives the day the `#383838` fill and takes no click on it (`cursor: auto`);
  `&open=2025-03-29` opens on March with six lead blanks and a sixth row, the 29th lit. No page
  errors. **No red-on-red state**: the picked dot and the pill stand on the `#1A1A1A` card.
- **The composed row closes here.** `vm.pad`'s `d === 2` arm takes the calendar under Grunge,
  and the Lime and Grunge halves fold back into one condition; measured at desktop, the bio's
  "KM BIO", the media player's "Top tracks" and the calendar's "Book Me" all stand at **41**.
  `scripts/page-check.mjs Grunge 2`: four modal cards, bio and calendar both at top 738 in the
  published 1440 tab, media under the bio at 1761, the calendar's own pill scrolling to
  `#form`, no errors or warnings, the 390 burger 1 → 11.
- **`FIELDS.calendar` moves nothing.** Its one template-keyed row, `heading`
  (`Grunge: [0, 1, 2, 3]`, set in layout 1's section 8), holds over the fitted card — the
  wrapper's "Book Me" is that field, falling back to `CAL_HEADING_3`. `image`, `time`, `cta`,
  `slotCta` and `types` are flat rows layout 3 reads none of, as under Retro and Lime.
  `reach.mjs` carries no calendar probe (its `cj` probes are the header's, the bio's and the
  map's), so no run was owed — layout 2's finding, re-checked.
- **Digest**: themes 0, 1, 3 and 4 zero files, canvas and `live=1`; theme 2 exactly calendar
  arch 2 at three widths on both surfaces.

### Inherited and used

*(One line each time a session leans on a bullet from `CONVENTIONS.md`, layouts 1's or 2's or
Lime's Conventions, with the plan it came from — the running list for the sweep's item 6.)*

- Section 1: *the node walker, kept* (grunge/layout-2); *a frame's inside stroke is an inset
  `boxShadow`* (lime/layout-2); *every glow is a guess until `effects` confirm it* (lime/layout-1);
  *the capsule's gap is a fixed 18* (grunge/layout-2, section 1); *a stand-in face is scaled*
  (`faced`, grunge/layout-1); *read a fill's `scaleMode` before its `imageTransform`*
  (grunge/layout-2); *the whole-page published check is one puppeteer script*; *field reach is
  measured*; *theme 1 is the digest at risk*.
- Section 2: *the node walker, kept* (grunge/layout-2); *read a fill's `scaleMode` before its
  `imageTransform`; correlate the render with the seed* (grunge/layout-2 — here the `CROP` half
  of it); *place a seal by its disc's centre* (lime/layout-1); *measure anything under
  `.seal-spin` with the animation stopped* (lime/layout-1); *every glow is a guess until
  `effects` confirm it* (lime/layout-1); *a stand-in face is scaled* (`faced`, grunge/layout-1);
  *casing stays the theme's; uppercase per site* (grunge/layout-1); *the grain lift is sampled,
  mean and stddev* (grunge/layout-2, section 2); *theme 1 is the digest at risk*; *field reach is
  measured*.
- Section 3: *the paired diff walk* (grunge/layout-2, section 8); *a section on another scheme
  writes that scheme's values as named literals* (Scheme 2's three); *the `G` lookup at the
  block's head*; *a frame's inside stroke is an inset `boxShadow`* (lime/layout-2); *every glow
  is a guess until `effects` confirm it*; *a stand-in face is scaled*; *casing stays the theme's;
  uppercase per site*; *the whole-page published check is one puppeteer script*; *theme 1 is
  the digest at risk*.
- Section 4: *the paired diff walk* (grunge/layout-2, section 8); *the `G` lookup at the
  block's head*; *a section on another scheme writes that scheme's values as named literals*
  (Scheme 3's `#9E1F17`, white ring, black meta, `#00000026`); *a frame's inside stroke is an
  inset `boxShadow`* (lime/layout-2); *where the seam lives inside the branch, the block goes
  after the seam* (lime/layout-1); *a stand-in face is scaled*; *casing stays the theme's;
  uppercase per site*; *the whole-page published check is one puppeteer script*; *theme 1 is
  the digest at risk*.
- Section 5: *the node walker, kept* (grunge/layout-2) — with `boundVariables` read beside the
  fills, which is what proved every key unchanged; *a section on another scheme writes that
  scheme's values as named literals* (the pill's `#171716`); *`get_variable_defs` mixes nested
  schemes in one list; the fills settle which node is on which* (lime/layout-1 — here the pill,
  the master's one nested scheme); *where the seam lives inside the branch, the block goes
  after the seam* (lime/layout-1); *every glow is a guess until `effects` confirm it*; *a
  stand-in face is scaled*; *casing stays the theme's; uppercase per site*; *`vm.title` shadows
  the ramp's `title` size* (lime/layout-1 — why "Book Me" keeps Lime's 36 / 28 / 26 literal);
  *the whole-page published check is one puppeteer script*; *theme 1 is the digest at risk*.

## Open questions

1. ~~**The bio photograph's crop.**~~ *Closed in section 2:* the band is rows 16.9–55% of
   `grungeStage`, drawn as a cover at `objectPosition` 27.3% (22.7% at 768, centred at 390); no
   export, `photos.js` unchanged.
2. ~~**The bio head's colour rule.**~~ *Closed in section 2:* one tone, `#DF262C`; the two Grunge
   bios disagree by frame, not by rule.
3. ~~**The 390 header's two missing frames**~~ *Closed in section 1:* the nav's two 1px spacer
   cells, which Lime's two-halves nav already folds away; Lime's written-out 390 holds.
4. **The two leaked pictures are one this time** — the bio well's `fa453f7d` (Lime's stage shot)
   under Grunge's own photograph, painted over. Worth telling the designer with layout 2's two.
5. **The Scheme 3 pricing badge and the map's `#F52E34`** are the pass's likely red-on-red
   states: the FEATURED badge (`#9E1F17`) on the featured row (`#DF262C`), and the lit pin on the
   red panel. The pricing and map sessions sample both live.
