# Lime layout 3 — section-by-section plan

This is the working checklist for bringing **layout 3** of the Lime template up to its Figma
designs. It runs one section per session, all three widths together, clearing context between
sections. Layouts 1 (`s.v0`) and 2 (`s.v1`) under `s.lime` are fitted and merged; nothing here
should move either.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then:
- the whole *Conventions* of [`layout-1.md`](./layout-1.md) — the foundation (`s.lime`, the Lime
  ramp, the `sem` keys, `BookPill` / `Pager` / `SealBadge`'s Lime branches, the digest)
- the whole *Conventions* of [`layout-2.md`](./layout-2.md) — the block-placement rule, the
  glow-hue rule, "read fills before believing a token", and the per-section *Settled* notes,
  which are the model for what a Lime session writes back
- the *Conventions* **and the 2026-09-15 Addendum** of
  [`../retro/layout-3.md`](../retro/layout-3.md), which built every `s.v2` branch this pass
  dresses. The Addendum is load-bearing: the QA reversals there (the composed page, the media
  player's now-playing card, the calendar's "Book Me" and short pill, the map's live zoom and
  *See all gigs*, the form's layout-2 card fields, the five-review seed) are what the branches
  actually are now, and the *Learned on …* notes above it describe an earlier state in places
- the *Per-session procedure* of [`../retro/layout-4.md`](../retro/layout-4.md)

Then read the three memory notes `figma-frame-reading`, `verifying-the-published-tab` and
`browser-tool-choice`. `SPEC.md` lives in git history: `git show 8fa8ff4:SPEC.md`.

Branch: **`lime-layout-3`, forked from `main`.** `lime-layout-2` merged as PR #14 (`e8962f9`),
so unlike layout 2 this pass stands on `main` directly. (`plans/README.md` said layout 2 was
"closed, unmerged" until this plan corrected it.)

## What the pass must deliver

1. **Every layout-3 section works in the published tab under Lime**: every `s.v2` control
   CLAUDE.md lists under *`s.live` is false everywhere except the published tab*. Several of
   those are **controls the frames do not draw** — the gallery's fullscreen viewer, the
   repertoire's *View full set* reveal, the map's city chips, zoom and *See all gigs*, the
   pricing stack's moving FEATURED seat — added by user call or QA on the Retro pass. Each
   session drives them at `theme=1&live=1` and checks that their overlay, scrim, lit and idle
   states read on Lime's colours (layout 1's rule: a working control can stop reading in a new
   palette).
2. **Every layout-3 section looks as close to its Figma frame as possible**, at 1440 (× 0.82
   onto the 1180 canvas), 768 and 390 — and, for the three composed sections, at the column
   widths `pageRows` gives them (below).
3. **The setup modal's card 3, "Inset Hero", lays out a fitted page.** `pickHeader` writes arch 2
   to every section and reorders the page into `PAGE_ORDERS[2]`, so this pass is what turns
   card 3 from Retro's layout 3 in Lime tokens (layout-1 open question 2; the layout-2 sweep saw
   it still drawing Retro's checker ribbon) into Lime's own page. The header session verifies
   this **in the builder**, and the bio session verifies that the composed row composes under
   Lime at desktop, in the editor canvas and the published tab both.
4. **The sidebar's layout-picker thumbnails for layout 3** under Lime look like their sections.
   Check once, in the end-of-pass sweep.

## What this pass actually is

**Lime's layout-3 page is Retro's layout-3 page re-skinned, the way layouts 1 and 2 were** —
with one exception, the header, which is layout 2's header case again. The evidence, read in the
planning session with one `use_figma` walk per page:

- The Lime instances are `964:68654`…`964:68684`, Retro's `964:68622`…`964:68652`: the same
  composition names in the same order, node ids offset by exactly **+32**. Both pages carry the
  same `Frame 299` composition (below).
- **The main components are not shared** (Lime's are `Theme=Lime` variants: bio `675:1672`
  against Retro's `432:606`, and so on), which was already true of layouts 1 and 2 and means
  nothing. The test that matters is the tree.
- **The trees match**, as a depth-6 `type:name` multiset per section pair:

| Section | 1440 | 768 | 390 | What differs |
|---|---|---|---|---|
| header | 0.18 | 0.18 | 0.18 | **A different composition, not only decoration.** Retro's 157 nodes are mostly the checker ribbon and the tilted polaroid; Lime's 32 are the same `hero-card` and nav, a `card` (an upright glass card with a round portrait and a name, where Retro tilts a polaroid) and a second `Kai Mercer` text. See *The header*. |
| bio | 0.98 | 0.98 | 0.98 | Retro's `image 1` grain rect over the photograph (the same rect survives inside Lime's seal, deeper than the walk — see *Decorative language*) |
| media (list) | 1.00 | 1.00 | 1.00 | — but the 1440 instance is **424 tall against Retro's 647**: 76px rows with a top hairline and no fill, where Retro's are 111px coloured bands. Same tree, different rows. |
| media (now-playing card, the `Audio Player` instance) | 1.00 | 1.00 | 1.00 | — |
| calendar | 1.00 | 1.00 | 1.00 | — |
| repertoire | 1.00 | 1.00 | 1.00 | — |
| gallery | 1.00 | 1.00 | 1.00 | — |
| pricing | 1.00 | 1.00 | 1.00 | — |
| map | 0.99 | 0.99 | 0.99 | "See All Gigs" against "See all gigs" |
| form | 1.00 | 1.00 | 1.00 | — |
| testimonials | 1.00 | 1.00 | 1.00 | — |
| footer | 0.60 | 0.60 | 0.60 | vs Retro's. **0.98 against Lime layout 1's own footer** (`964:58598`; the same `Property 1=lime` component family), so it is out of scope (below). |
| tags | 1.00 | — | — | on the page, not in the project |

- **No new seams and no shadows.** No `DROP_SHADOW` on any of the 36 masters, no hard offset
  shadow (layout 2's two do not recur), and the three renders show straight band edges
  throughout. Two `INNER_SHADOW` glows in the whole page (below).
- **No Device-mode override** on any instance: every `explicitVariableModes` read is
  `Primitives: Lime` plus a scheme. The layout-2 rule that `s.*` is right on every narrow master
  should hold; re-check each `get_variable_defs` anyway.
- **The narrow shapes are Retro's**, except the header's 390 master (606.5 tall against Retro's
  930.5 — see *The header*). Retro layout-3's narrow notes (the tablet repertoire *inside* the
  second Section, the 390 calendar standalone) apply as written.

So the work is the layout-2 pass's work one branch over: **Lime decoration and Lime tokens inside
the existing `s.v2` branches, gated on `s.lime`**, placed by layout 1's count-the-leaves rule and
layout 2's seam rule (`if (s.v2 && s.lime)` ahead of `if (s.v2)` when the section's live state is
hoisted above its branches — which the survey below says it always is here — or `if (s.lime)`
*inside* `if (s.v2)` after the seam when the values the block needs are derived in the branch).
**Do not write Lime-only section components.**

### The composed page is already Lime's

Layout 3's 1440 page does not stack every section: `Frame 299` (`964:68655`, 1440 × 2398) stands
the bio's Section and the media player's Section in an 858 left column at x 66 and the booking
calendar under its "Book Me" in a 405 right column at x 979, 55 apart. That is Retro's
`964:68623` to the pixel, and `pageRows()` / `arrangeRows()` (CLAUDE.md, *The page is rows*)
already reproduce it: `pageRows` keys on `designCount(cat, themeName)`, `COLUMN_SPLIT` is
858 : 405 : 55, and `PAGE_ORDERS[2]` is the narrow pages' order. **Expect no change to either
helper.** What the composed sections do inherit is the column width: at 1180 the left column is
**684** and the right **323** (the 1052 content column less the 45 gap, split 858 : 405), so the
bio and the media player are fitted at 684 against the frame's 858 × 0.82 = 703.6, and the
calendar at 323 against 332. Retro accepted that; so does this pass.

`preview.jsx` takes **no `&column=` switch**, so the harness renders the three composed sections
at the full 1052. The bio session adds one (`sectionVm({ column: true })` is the whole of it;
the bio's add-the-switch-in-the-same-session rule) so all three can be measured at their
column widths, and checks the composed row in the builder besides.

Lime's `Frame 299` is 2398 tall against Retro's 2528 for two reasons a session should not be
surprised by: the media list is 424 tall (above), and the two wrapper heads are taller (171 and
287 against 140 and 225) because "Reads the room." and "Five worth your ear" are set at Lime's
`display-lg` 130.

### Whose branch draws what in the composed region

The narrow pages stack the region's sections; the wrapper frames' copy is drawn by the sections
the Retro QA gave it to, and Lime changes none of that:

| Wrapper copy | Frame text (1440 / 768 / 390) | Token | Drawn by |
|---|---|---|---|
| "KM BIO" eyebrow over the bio | Chakra Petch 20 / 14 / 12, `#F2FFD0` | `s.ui` at `s.labelXs`, `s.tx` | the bio's `v2` block (the initials plus the category name, a literal — Retro layout-3 open question 6) |
| "Reads the room." | Bebas Neue 130 / 81 / 54, lh .89, `#AFE335` | `s.dispLg`, `s.ac` | the bio's `v2`, as `s.title` |
| "KM BIO" over the player | the same | the same | the media player's `v2`, as `kicker` ("Top tracks") — the frame's "KM BIO" is the bio head duplicated, Retro's reading |
| "Five worth your ear" | the same as the bio head | the same | the media player's `v2`, as `s.title` |
| "Book Me" | Bebas Neue 36 / 28 / 26, lh 1.1, `#F2FFD0` | Display/Title at the frames' numbers (`s.title` is the string), `s.tx` | the calendar's `v2`, as `CAL_HEADING_3` |

All five are ramp tokens in Scheme 1, so none needs a literal. The `Tags — Frame` instance under
the bio card (`964:68664`) is **not drawn** — the category left the project in `d734992`, and
Retro's QA decided the chip row does not stand in for it. The `Audio Player Componenets — H ·
Bar-meter player` instance (`964:68673`) **is** the media player's now-playing card, so the
media session's masters are two instances plus the wrapper head, not one.

## The Figma source

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Frame 256 | `964:68653` | 1440 × 8565.5 |
| Tablet | Frame 262 | `984:10739` | 768 × 9687 |
| Mobile | Frame 263 | `984:10770` | 390 × 9650.4 |

- Desktop: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=964-68653&m=dev>
- Tablet: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=984-10739&m=dev>
- Mobile: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=984-10770&m=dev>

`fileKey` = `uFoUbPaBrDicjyuSBEbtGT`. All three frames, and Retro's layout-3 frames, are on the
**Layout 3** page, `964:58573`. `use_figma` reads on descendants want
`await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('964:58573'))` first.

**Match on node id and width, never on the name.** Retro layout-3's misnaming pattern holds
exactly: the composed instances are called "— **Desktop**" at every width (media, the audio
card and the calendar at 768 and 390; the bio at 768), and both narrow footers are
"— Desktop". The full-width sections' narrow masters are honestly named.

**Two things are wrapped**, as on Retro's page:
- **media**'s tablet Section (`984:10750`) holds `Frame 301` (`984:10757`) with the audio card,
  the list **and the repertoire** (`984:10760`) inside it, 30 apart. The repertoire's tablet
  master is not a top-level child.
- **calendar** stands in `Frame 300` under its "Book Me" text at every width: 1440 `964:68675`
  (405 wide at x 979; instance at y 120 where Retro's is at 106, the Bebas 36 head being taller),
  768 `984:10761` (instance at 30 · 111, 708 wide), 390 `984:10792` (10 · 99, 370 wide).

## The sections

Page order (`PAGE_ORDERS[2]`, the narrow pages'). Sizes are the frames' own. Each row's three
masters are fitted in one session.

| # | Cat | Desktop node | Size | Tablet node | Size | Mobile node | Size | Retro twin (1440 / 768 / 390) | Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `header` | `964:68654` | 1440 × 900 | `984:10740` | 768 × 1024 | `984:10771` | 390 × 606.5 | `964:68622` / `977:22532` / `982:9583` | done `8855dd2` |
| 2 | `bio` | `964:68663` *(head `964:68658`)* | 858 × 882 | `984:10748` *(head `984:10743`)* | 708 × 912 | `984:10779` *(head `984:10774`)* | 370 × 878 | `964:68631` / `977:22717` / `982:10013` | done `466aff9` |
| 3 | `media` | `964:68674` list + `964:68673` card *(head `964:68666`)* | 858 × 424 + 858 × 243 | `984:10759` + `984:10758` *(head `984:10751`)* | 708 × 647 + 708 × 243 | `984:10790` + `984:10789` *(head `984:10782`)* | 370 × 647 + 370 × 243 | `964:68642` + `964:68641` / `977:22728` + `977:22727` / `982:9779` + `982:9778` | done `593133e` |
| 4 | `repertoire` | `964:68678` | 1440 × 621 | `984:10760` *(in `984:10757`)* | 708 × 655 | `984:10791` | 390 × 709 | `964:68646` / `977:23041` / `982:10193` | — |
| 5 | `calendar` | `964:68677` *(in `964:68675`)* | 405 × 538.6 | `984:10763` *(in `984:10761`)* | 708 × 483.6 | `984:10794` *(in `984:10792`)* | 370 × 450.6 | `964:68645` / `984:10605` / `984:10673` | — |
| 6 | `gallery` | `964:68679` | 1440 × 789 | `984:10764` | 768 × 884 | `984:10795` | 390 × 591 | `964:68647` / `977:23131` / `982:10257` | — |
| 7 | `pricing` | `964:68680` | 1440 × 1199 | `984:10765` | 768 × 1072 | `984:10796` | 390 × 1474 | `964:68648` / `977:23149` / `982:10274` | — |
| 8 | `map` | `964:68681` | 1440 × 819 | `984:10766` | 768 × 831 | `984:10797` | 390 × 887 | `964:68649` / `977:23264` / `982:10389` | — |
| 9 | `form` | `964:68682` | 1440 × 570 | `984:10767` | 768 × 734 | `984:10798` | 390 × 755 | `964:68650` / `977:23406` / `982:10472` | — |
| 10 | `testimonials` | `964:68683` | 1440 × 790 | `984:10768` | 768 × 790 | `984:10799` | 390 × 1108 | `964:68651` / `982:8584` / `982:10499` | — |
| — | `footer` | `964:68684` | 1440 × 479.5 | `984:10769` | 768 × 647.4 | `984:10800` | 390 × 619.4 | — | **out of scope** — the same tree as Lime layout 1's footer, fitted in that pass's section 11, and `NVAR.footer` is 1 |
| — | `tags` | `964:68664` | 858 × 75 | `984:10749` | 708 × 67 | `984:10780` | 370 × 97 | — | **not in the project** (`d734992`); not drawn under the bio card either |

The Retro twin's node id is what `EncoreSection.jsx`'s `v2` fit comments cite, so grep for it to
find the branch. **Cite branches by that id, never by line number.**

### Sizes: re-measure, and expect the pricing stack to grow most

| Section | Lime 1440 / 768 / 390 | Retro 1440 / 768 / 390 |
|---|---|---|
| header | 900 / 1024 / **606.5** | 900 / 1024 / 930.5 |
| bio | 882 / 912 / 878 | 882 / 912 / 860 |
| media list | **424** / 647 / 647 | 647 / 647 / 647 |
| now-playing card | 243 at all three | 243 at all three |
| calendar | 538.6 / 483.6 / 450.6 | 497.9 / 456.9 / 433.9 |
| repertoire | 621 / 655 / 709 | 621 / 636 / 697 |
| gallery | 789 / 884 / 591 | 789 / 865 / 678 |
| **pricing** | **1199 / 1072 / 1474** | 1022 / 941 / 1358 |
| map | 819 / 831 / 887 | 804 / 809 / 878 |
| form | 570 / 734 / 755 | 548 / 680 / 722 |
| testimonials | 790 / 790 / 1108 | 790 / 777 / 1076 |

The media list's 647 at 768 and 390 is **not** the leaked-desktop case Retro's plan named
(there the desktop was 647 too): Lime's rows are 76 at 1440 and 121 at both narrow widths, so
the narrow masters are laid out, not leaked. Measure the row, and read Retro layout-3's
"a stated instance height is the page's number" before transcribing any of the three.

## Lime's layout-3 mode

The page frame is **Primitives: Lime, Scheme 1**. Layout 1's scheme table (its *Lime's Figma
mode*) carries every value these schemes resolve to.

**Schemes by node**, from `explicitVariableModes` (instance, then nested), with the fills read
off the nodes:

| Section | Instance | Nested |
|---|---|---|
| header | Primitives only (page Scheme 1) | nav Book pill (115 × 35) **Scheme 3**: `#AFE335` with a `#15180F` label |
| bio | Scheme 1 | — (the photo well is `#101309`, `s.box3`) |
| media list | Primitives only | — (rows on the page ground; sleeves `#394732`, `s.box2`) |
| now-playing card | **Scheme 2** | the card is `#263020` — Scheme 2's `box/3`, which **has no `THEMES` key**: name it |
| calendar | Scheme 1 | the foot pill (365 × 54) **Scheme 2** |
| repertoire | inherits | the three `set` cards are **Scheme 1 / Scheme 4 / Scheme 3** in that order: `s.box1` with pale ink and `stroke1`; `mist` `#D5E3B2` and `lime3` `#CCFA61`, both with `#15180F` (`s.bg`) ink and a 15% ink hairline |
| gallery | **Scheme 2** | — (the sheet is Scheme 2's `sem/bg`, `#2E3928` = `s.box1`) |
| pricing | inherits | the featured `row` **Scheme 3**: `#AFE335` (`s.ac`) fill, `#15180F` ring and ink |
| map | **Scheme 4** | `radius-map` **Scheme 3**: `#CCFA61` (`lime3`) at 390, where it is the whole map panel |
| form | Scheme 1 (768 / 390 inherit) | — (card `#2E3928`, boxes `#2E3928` pills, submit `#AFE335`) |
| testimonials | inherits | `rating` **Scheme 3** (`#CCFA61`); `quote-cell` and `name-cell` **Scheme 2** (`#394732` and `#2E3928`); `small-quote` **Scheme 4** (`#D5E3B2`); `feat-quote` inherits (`#2E3928`) |
| footer | Scheme 2 (layout 1's) | — |

`lime3` (`#CCFA61`) and `mist` (`#D5E3B2`) are layout 2's and layout 1's local literals; the
now-playing card's `#263020` is new. **Read each node's `fills` before believing a token** —
layout 2's rule, and the repertoire's three schemes on one component are exactly the case.

### Grounds

Sampled from all three renders at the page edge and the middle of each band. **The sequence is
identical at 1440, 768 and 390.**

| # | Section | Ground | What stands on it |
|---|---|---|---|
| 1 | header | page `#15180F` | the `hero-card` well, `#394732` (`s.box2`), radius 50 (20 at 390) |
| 2 | bio | page | a `#2E3928` card, radius 50, `stroke1` ring |
| 3 | media | page | the Scheme 2 card `#263020`, radius 50; rows on the page with top hairlines |
| 4 | repertoire | page | three cards: `s.box1`, `mist`, `lime3`, radius 50 (at 390 the carousel's peeks reach the page edge) |
| 5 | calendar | page | the `#2E3928` panel, radius 50, a **2px** `stroke1` ring |
| 6 | gallery | **full-bleed `#2E3928` sheet** (Scheme 2) | tiles, radius 30, `stroke1` rings |
| 7 | pricing | page | rows: page-ground with a 1px `s.ac` ring, the featured one `s.ac` with a `#15180F` ring; a `stroke1` ring round the whole instance (Retro declined its twin's; check) |
| 8 | map | **full-bleed `#F2FFD0` sheet** (Scheme 4, `s.tx`) | the map panel (`lime3` at 390), rows and chips inked `#15180F` |
| 9 | form | page | a `#2E3928` card, radius 50 (a full-height `#15180F` child bleeds under it at 768 / 390 — the page colour, a no-op, Retro's reading) |
| 10 | testimonials | page | the cells above |
| — | footer | `#2E3928`, layout 1's | — |

**No root flag widens.** The gallery's sheet and the map's sheet are painted **in the branch**
(Retro layout-3's gallery and map both bleed by the written-out margin), in `s.box1` and `s.tx`;
the map's band then needs its own ink inside the branch (`s.bg`), layout 2's form rule.

## Lime's layout-3 decorative language

Everything here is behind `s.lime`, and replaces what the Retro branch gates on `s.retro`.

- **No grain, no torn edges, no checkerboard, no tilt, no drop shadow, no hard offset shadow.**
  Every `Grain`, `Checkerboard` and `tilt()` in the nine `s.v2` branches and `HeaderV2` is
  Retro's and stays gated off.
- **Two glows, and they are different hues** — layout 2's mind-the-hue rule, both confirmed off
  the node as `INNER_SHADOW`, spread 0:
  - radius **19 `#A6E22E` = `s.glow`** on the **header's card** (220 × 250 at 1440, 220 × 241 at
    768, 350 × 127 at 390). Its fill is `s.box1` at **1%** with a 1px `s.ac` inside ring, so the
    glow *is* the card's paint — a glass card, not a panel.
  - radius **34 `#AFE335` = `s.ac`** on the **bio's photograph** (798 × 380 / 648 × 380 /
    350 × 259, radius 55, `s.box3` well) — layout 2's photograph glow exactly, painted on an
    overlay.
- **The bio's seal is drawn** (`Frame 248`, 125 × 125, `#AFE335` at −32.4° with `#15180F`
  marks): `SealBadge`'s Lime branch, layout 1's footer. Layout 2 drew no seal; this frame does.
  Inside it survives a 447 × 447 `image 1` rect with Retro's grain hash `b74be8bc` — sample the
  render before deciding whether it paints anything on Lime.
- **Rings are `sem/stroke/1` at 1px inside, drawn as `inset 0 0 0 1px`**: the bio card, the media
  rows (**top side only**, `1/0/0/0`), the repertoire's set cards and their song rows (bottom
  only), the gallery's tiles, the pricing instance and its toggle capsule, the form card and its
  three boxes, the testimonials' cells, the footer's top. Where the ground is a light scheme the
  hairline is `#15180F` at 15% (`hair`): the map's chips, rows, pills and zoom controls, the
  repertoire's `mist` and `lime3` cards, the testimonials' `rating` and `small-quote`. Three
  exceptions: the **calendar panel's ring is 2px** (`border/thin`, the one non-hairline ring on
  the page); the **pricing rows' rings are full-strength** `s.ac` (plain) and `#15180F`
  (featured), `sem/stroke/2`; and the header card, its portrait and the testimonials' 24px `av`
  discs carry full-strength `s.ac` / `#D9FF7F` (`lift`) rings.
- **The bio's two 858 × 1 rules read as `#F2FFD0` at paint opacity 1**, not the 15% hairline —
  but the walk read the paint's opacity, not the node's. Read `node.opacity` on both before
  drawing a full-strength rule; they may be `stroke1` after all.
- **Radii** are raw: 50 on nearly every card (bio, calendar, repertoire sets, pricing rows, form,
  testimonials cells, the map panel at 1440 and the header's `hero-card`), 30 on the gallery
  tiles and the map panel at 768 / 390, 55 on the bio photograph, 45 (12 at 390) on the header
  card, 67 on the foot pills (calendar, map, form submit, footer), 60 on the `pg` pager pills, 999
  on the nav capsule, the pricing toggle and the form's boxes, and 25 / 42 / 24 on the map
  container. The header's `hero-card` drops to 20 at 390. Check each against
  `get_design_context` rather than reaching for `s.radius`.

## Photography

**Expect zero `photos.js` changes.** Image hashes, read off all 36 masters:

| Section | Slot (frame box) | Hash | Seeded today | Verdict |
|---|---|---|---|---|
| header | `hero-card` 1400 × 860 / 748 × 1004 / 370 × 586 | `51d68654` | `limeHero` | ✓ — a plain centred cover. *Corrected in section 1:* the fill's `imageTransform` carries a flip and a crop, but its `scaleMode` is `FILL`, which ignores the transform, and the render is unflipped (layout 1's session-0 note). No `scaleX(-1)` |
| header | portrait 87 × 87 | `e3790c2c` | `limeHeaderAvatar` | ✓ |
| bio | photo 798 × 380 / 648 × 380 / 350 × 259 | `fa453f7d` | `limeStage` | ✓ *expected*: the transform is `[[0.502, 0, 0.183], [0, 1, 0]]`, the exact slice `limeStage` was exported as, now filling a landscape box — so a centred cover of the file should be the frame's picture, and Retro's `SEEDS.Retro.layouts[2].bio` mechanism is **not owed**. The bio session verifies against the render rather than asserting it |
| media | five 64 × 64 sleeves | `8c7fa7d8` `4e7cc529` `b737c3e0` `40041573` `21e9622c` | `ROW_ART.media` | ✓ the shared covers |
| gallery | twelve tiles | Retro's layout-3 set exactly (`3f0c98b4` … `3a59b4d1` … with the same repeats) | `LIME_PHOTOS.gallery` | ✓ — the seven slots, Retro's reading of the twelve |
| map | `Map Texture` 570 × 471 | `e089bd11` | `vm.mapRadialSrc` (`RETRO_TEXTURE.mapRadial`, Retro **and** Lime) | ✓ |
| testimonials | four 24 × 24 `av` | `ef14e35b` … | — | nothing: Retro's stat card draws `vm.quotes[].mark` discs in their place |

The seal's `b74be8bc` is Retro's grain, not a photograph.

## What already renders, and the traps in it

A code survey at the start of this pass (a brace walk of every `if (s.v2)` block). **Every `s.v2`
branch already renders under Lime**; no branch condition reads `s.retro`, and no block reads
`s.lime` yet. Every block's hooks are hoisted above its branches (`useState` inside a block: 0
everywhere), so layout 2's placement rule decides by whether the block also needs values the
branch derives.

| Branch | Lines | `s.retro` | Decoration | `pillBg` | `paper` / `paperFg` | `deep` | Literal hexes | Hooks above | Shared | `T` table |
|---|---|---|---|---|---|---|---|---|---|---|
| `HeaderV2` | — | 7 (with `Checkerboard` / `tilt`) | yes | — | — | — | — | — | `NavMenu`, `BookPill`, `ListenLink`, `TagChips` | — |
| `Bio` v2 | 205 | 5 | `SealBadge`, `tilt` | 1 | 1 / 1 | 0 | 3 | 0 | `SealBadge`, `Photo` | yes |
| `Media` v2 | 236 | 10 | — | 1 | 1 / 1 | 0 | 5 | 4 | `Photo` | yes |
| `Repertoire` v2 | 195 | 1 | — | 0 | 0 / 0 | 0 | 0 | 5 | — | yes |
| `Calendar` v2 | 175 | 6 | — | 0 | 1 / 2 | 0 | 3 | 5 | `BookPill` | yes |
| `Gallery` v2 | 156 | 4 | — | 0 | 1 / 2 | 0 | 3 | 1 | `Photo` | **no** |
| `Pricing` v2 | 246 | 2 | — | 2 | 1 / 1 | 0 | 2 | 1 | `BookPill` | yes |
| `EventsMap` v2 | 524 | 12 | — | 2 | 0 / 0 | 2 | 12 | 5 | `Pager`, `BookPill` | yes |
| `EnquiryForm` v2 | 245 | 7 | — | 2 | 3 / 4 | 0 | 3 | 5 | — | yes |
| `Testimonials` v2 | 249 | 11 | — | 2 | 3 / 2 | 2 | 15 | 1 | — | yes |

The traps these counts point at, with layout 2's two token facts as the key — **under Lime
`s.paper` is `s.tx`** (pale lime) and **`s.pillBg` is the accent**:

- **The gallery's sheet is `paper`**: Retro's cream bleed renders pale lime, where the frame's
  is `s.box1`. The calendar's cream card, the form's card and the testimonials' light cells are
  `paper` too, and every one of the frame's is olive.
- **The map's mustard sheet is `pillBg`**: lime under Lime, where the frame's is Scheme 4's
  pale `s.tx` with `s.bg` ink — layout 2's `EnquiryForm` case, in the map. Its `deep` plate and
  the testimonials' `deep` card are the **page ground** on Lime (Retro layout-3's own note), so
  the `line2` hairline is the whole of what parts them from the page today.
- **`vm.tierRow` reaches pale lime on Lime** (index 3 of the guarded walk, Retro's note) where
  the frame fills the featured row `s.ac` and rings it `#15180F`, and outlines the plain rows in
  `s.ac`. The pricing block reads `s.ac` / `s.bg` directly and leaves `tierRow` to Retro.
- **The testimonials' `SEATS` / `REG` register is Retro's** (cream, white / white, mustard,
  cream). Lime's is its own: `rating` `lime3`, then `name-cell` `box1`, `quote-cell` `box2` /
  `name-cell` `box2`, `small-quote` `mist`, `feat-quote` `box1` — the two desktop rows, and the
  390 stack is the same six in the same order (the Scheme 2 cells' `box/1` is `#394732`, which
  is Scheme 1's `s.box2`; the two inheriting cells are `s.box1`). Write a Lime register; do not
  remap Retro's.
- **The repertoire's hue pool is `tierHues` over dark tags** (Retro's derivation of three cards
  that carry cream). Lime's three cards are three *schemes* — `box1` pale-inked, `mist` and
  `lime3` ink-inked — so the Lime block seats them **by index**, the media fan's rule, with a
  per-seat ink; the `All` card (a fourth) wraps to seat 0.
- **The media list's rows are coloured bands under Retro** (`#5B5E2E` / `#D8A227` / `#C8461C`)
  and **bare rows with a top hairline under Lime**, 76 tall at 1440. That is the one place on
  this page where the same tree is a visibly different row, so the media block's list is more
  than a re-ink. Its now-playing card takes the audio branch's `paperFg`-on-`paper` pair (the
  dies-on-paper lesson), which on Lime is a pale card; the frame's is Scheme 2's `#263020`
  with pale and lime inks.
- **`HeaderV2` draws Retro's checker ribbon and tilted polaroid under Lime** (the layout-2
  sweep's "cards 3 and 4 still carry the ribbon"). Its Lime block is the whole header — see
  below.
- **Every branch but the gallery's carries Retro's per-width `T` table.** Under Lime every size
  is its token at that width already (layout 1's theme-aware ramp), so a Lime leaf reads `s.*`
  and no second table is written; `u()`'s `z` stays right for boxes. `vm.title` still shadows
  the ramp's `title` size — Display/Title is the frames' own 36 / 28 / 26.
- **Fifteen literal hexes in the testimonials and twelve in the map** are Retro's register and
  plate; all stay in the Retro path.

## The header

Layout 2's header settled how a Lime header is written: `if (s.lime) { … return }` at the head
of the component, the footer's placement, because the component *is* the branch and its live
seam is `navHref`, `NavMenu`, `BookPill to=` and `ListenLink to=`. `HeaderV2` takes the same
route — count-the-leaves says block, and here the composition changes as well as the paint:

- **The well.** `hero-card` 1400 × 860 at 20 · 20, `s.box2` with a `stroke1` ring, radius 50,
  holding the mirrored `limeHero` (above). At 768 it is 748 × 1004 at 10 · 10; at 390 370 × 586,
  radius **20**.
- **The nav** is a row inside the well: a `#15180F` capsule (168 × 36, radius 999, 1px
  `stroke1`) holding three Bebas 18 links in `s.ac` — the frame's component default three,
  which is the artist's page and needs layout 2's budgeted one-row rule again; "KAI MERCER"
  Bebas 32 in `s.tx` centred between two hairlines; Listen (Bebas 18, `s.tx`) and the Scheme 3
  Book pill (115 × 35, `s.ac` with a `s.bg` label). At 768 the capsule is 146 × 31 and the pill
  103 × 35 — the capsule's contents were not read in the planning walk, and 146 sits between the
  390 burger capsule (62) and the 1440 three-link one (168), so expect the component's default
  three links at a smaller Bebas and take layout 2's call: the 768 master draws the links and is
  **not** followed; the burger stays in the capsule. At 390 the capsule is 62 × 34 round a
  26 × 18 burger, the pill 96 × 35, the name Bebas 14.
- **The foot row** (1336 × 250 at 32 · 578): the name at Bebas **130** (`s.dispLg`) over a
  148 × 29 chip frame, then the `TagChips` row (701 × 27, the same instance Retro's draws — say
  which branch of `TagChips` Lime takes), and at the right the **card** — 220 × 250, radius 45,
  the glass card above, holding the 87 × 87 portrait in a `s.box1` disc with a 1px `s.ac` ring
  and, under it, "Kai Mercer" at Bebas 36 (`s.tx`) over "Performing since 2021" at Inter 13
  (`s.ac`). Retro tilts a 225 × 234 polaroid here; Lime stands the card upright, so `tilt()` and
  the polaroid's photograph go with the grain.
- **390 is a different shape**: 606.5 tall against Retro's 930.5. The name block stands at
  y 240 in a 350 × 371 frame, the tags at 352, and the card turns **horizontal** — 350 × 127,
  radius 12, the portrait at the left and the two lines beside it at Bebas 26 / Inter 12.
  Retro's 390 constants are not this master's; read all three `get_metadata` as arithmetic
  first.
- **`showBadge` still edits nothing here** (Retro layout-3 open question 5), and `avatar`
  reaches the portrait as it does under Retro.
- **Digest expectation**: under Lime `HEADER_COUNT.lime` is 4, so header arch 2 has **no fold
  partner** (layout 2's arch 5 → 1 fold has no analogue); a header change is three theme-1
  files, `header` arch 2 at three widths.

## Per-session procedure

One section per session, **all three widths together**. Clear context between sections; git and
this file are the memory.

1. Read `CLAUDE.md`, this file, and the reading list at the top.
2. **Section 1 only, first:** `git switch -c lime-layout-3 main` (if the branch does not exist
   yet) and commit this plan and the `plans/README.md` row there. Then, with the dev server up,
   take the pass's "before" pictures at `theme=1&arch=2` for all eleven categories at desktop
   (`node scripts/shots.mjs before 1 2`) and keep them in the scratchpad.
3. `get_metadata` on **all three** of the row's nodes and on its Retro twin's 1440 node, side by
   side. Read them as arithmetic first. Compare against the twin to confirm the tree table above;
   a child that exists on one side only is decoration to gate or a node to add. Retro layout-3's
   note that the header's metadata stops at the outer frame may hold for Lime's header too
   (`get_design_context` returns the tree either way).
4. `get_screenshot` on each node (`maxDimension` 1400–2000) and `curl` it in the very next call.
   Load the `figma-design-to-code` skill and run `get_design_context`. **Run `get_variable_defs`
   on all three nodes**, and read fills, strokes, effects and radii off the nodes with one
   `use_figma` read wherever a token or colour looks wrong.
5. **Implement inside the section's existing `s.v2` branch, gated on `s.lime`.** Ternaries or a
   block by layout 1's rule, placed by layout 2's seam rule; every Lime-only value behind
   `s.lime`; desktop numbers × 0.82, 768 and 390 verbatim. Prefer the session-0 tokens over
   literals, and name every literal the mode does not carry.
6. **Verify** with the preview harness (pass `arch=2`; `preview.jsx` defaults to 1):

   ```
   cd source && npm run dev
   http://localhost:5173/preview.html?cat=bio&arch=2&theme=1&w=desktop     # &w=tablet | mobile
   ```

   - **Look:** compare the Lime frame's render with `theme=1`, reading geometry with
     `getBoundingClientRect()`, against **content** edges. The bio, media and calendar want
     the `&column=` switch (above) at desktop.
   - **Function:** `theme=1&live=1`, plus `&n=` / `&booked=` / `&open=` / `&since=` / `&name=`
     where the section reads them. Drive every control — including the QA-added ones
     (deliverable 1) — and confirm its active, idle and refused states read on Lime's colours.
   - **Nothing else moves:** `node scripts/digest.mjs before 0,2,3,4` before editing and
     `after` after, then `cmp` — **zero differing files** across every category × layout ×
     width. Then the same at theme 1: the differing files must all be `_arch_2_` (filter on
     `_theme_1_`), and all this section's category. A theme-1 diff in any `arch_0` or `arch_1`
     file is a regression of a merged pass.
7. Commit with the section named in the subject.
8. Set the row's Status to `done <sha>`, add anything the next section needs to *Conventions*,
   and commit that too.
9. **Stop and hand off.** Say the section is closed and that this is the moment to `/clear`,
   then print the next section's opening prompt as a filled-in fenced block:

   ```
   Continue the Lime layout-3 pass with section N, `cat`.

   Read CLAUDE.md, then plans/lime/layout-3.md, then the Conventions of plans/lime/layout-1.md
   and plans/lime/layout-2.md, then the Conventions and the 2026-09-15 Addendum of
   plans/retro/layout-3.md, then the `figma-frame-reading`, `verifying-the-published-tab` and
   `browser-tool-choice` memory notes, and follow the per-session procedure there.

   The three Lime masters are `<desktop node>` (<W> × <H>), `<tablet node>` (768 × <H>) and
   `<mobile node>` (390 × <H>) in Figma file uFoUbPaBrDicjyuSBEbtGT, on page 964:58573; the
   Retro twin is `<retro node>`. Fit them inside the existing `s.v2` branch of `<Component>`
   in EncoreSection.jsx, gated on `s.lime`. Themes 0, 2, 3 and 4 must digest to zero rows,
   and theme 1 may differ only in `<cat>` arch 2.

   <the two or three conventions most likely to bite this section>

   Branch: lime-layout-3. Do not refresh the root index.html.
   ```

Do **not** refresh the root `index.html` per section. That is one deliberate step at the end of
the pass, with the two-build digest in layout 1's *Learned on the end-of-pass sweep*. The seeded
`EXAMPLE_PAGE` is arch 0 throughout, so the page walk shows **no** difference at any theme: prove
this pass shipped by choosing card 3 in the setup modal of both builds.

### The first session: the header

`HeaderV2` is where deliverable 3 is met, so its verification is the builder's, not only the
harness's. With chrome-devtools MCP or a puppeteer script (layout 1's sweep notes give the route
and the selectors; layout 2's sweep notes the sidebar's row labels and the layout picker's
trigger):
- the setup modal still shows **four** Lime cards, card 3 renders the fitted header, and cards 1
  and 2 are unchanged
- choosing card 3 opens the editor on a page whose every section is arch 2, in `PAGE_ORDERS[2]`,
  with the bio, media and calendar **composed** at desktop
- publish, then in the popup: every nav link scrolls, the burger opens at 390 and at 820 (a fresh
  tab each), Book Now reaches `#form`
- the Retro header at theme 0 digests to zero rows

## The end-of-pass sweep

Written now from what the plan expects; refine as the sections defer things. One session:

1. **CLAUDE.md and README.md**, wherever they describe a layout-3 state as Retro's alone, and
   the two places that name which Lime layouts are fitted (layout 2's sweep found "Lime is
   designed at layouts 1 and 2" in both files and in two code comments — `photos.js`'s header
   and `sectionVm`'s `lime` flag). Grep both files for `lime` and `layout 3`.
2. **One whole-page published check under Lime at layout 3**, one puppeteer script: builder →
   Lime → card 3 → *Use this header* → Publish → Open, then every `s.v2` control on the page —
   header nav and burger (fresh tab per width), the media card's disc and the list's rows with
   audio, the repertoire's set cards, pager and *View full set*, the calendar's dots and pill,
   the gallery's viewer (open, arrow, Escape, scroll lock), the pricing capsule and its moving
   seat, the map's city chips, rows, pins, zoom and *See all gigs*, the form's refused and valid
   submits (capture-phase `preventDefault` on the mailto), the footer's links. Then the band
   edges: the gallery's olive sheet and the map's pale sheet are the two full-bleed ones.
3. **The layout-picker thumbnails** for arch 2 under Lime (deliverable 4).
4. **The other three header cards** still render and publish; card 4 still draws Retro's
   checker ribbon (unfitted).
5. **`plans/README.md`:** mark the pass closed.
6. **Refresh the root `index.html`** with the two-build digest. Expect zero rows at every theme
   on the seeded page; the proof that the pass shipped is card 3 in both builds' setup modals.

## Conventions

Everything a fresh session would otherwise have to work out again. Append to this list as the
pass goes on.

- **Layouts 1's and 2's conventions all hold.** The gate is `s.lime` and composes with `s.retro`;
  Lime reads the fitted structure and widens a Retro gate rather than redrawing what the frame
  shares; never edit a Retro literal to make Lime look right; the harness's `theme` is a numeric
  index (Retro 0, Lime 1); blocks go ahead of the branch when the state is hoisted and inside it
  after the seam when the block needs a derived value.
- **The page walk is one `use_figma` read per page**, as layout 2's was: main component,
  `explicitVariableModes`, fills, effects, strokes, image hashes, plus one depth-6 `type:name`
  multiset per section pair. The header's 0.18 had to be read for *what* is missing (Retro's
  ribbon and polaroid) and what is new (the card) before it meant anything. Re-run it rather
  than re-deriving a section by eye.
- **Layout 3 is a dark page with two sheets.** Every section stands on `#15180F` with olive
  cards on it, except the gallery (an olive sheet) and the map (a pale sheet). No seams;
  `ArcEdge` is layout 1's alone.
- **The composed row is inherited, not fitted.** `pageRows`, `arrangeRows`, `COLUMN_SPLIT` and
  `sectionVm({ column: true })` are Retro's QA work and already compose Lime's page; the three
  composed sections are fitted at 684 / 323 at desktop, not 703.6 / 332.
- **Two glow hues on one page**: `s.glow` (`#A6E22E`) on the header card, `s.ac` (`#AFE335`) on
  the bio photograph. Confirm each off the node's `effects`; an effect style resolves in its own
  mode.


Settled in section 1 (the header):

- **The first layout-3 block: `if (s.lime) { … return }` at the head of `HeaderV2`**, HeaderV1's
  seat — no state to share, and every leaf changes face, ink or box. Retro's code below it is
  untouched but for `mustard`, which is plain `s.pillBg` again (its `s.lime ? s.box1` arm is
  unreachable now). Diff 203 / 3.
- **The plan's guesses that the frames corrected.** (1) The hero is **not mirrored**: the fill
  is `FILL`, which ignores its `imageTransform`, and the render faces the file's way — a centred
  cover. (2) The portrait is an **87 × 87 rounded square** (radius 21) in a `s.box1` well with a
  1px `s.ac` ring, not a round disc. (3) The name stands **over** the location (Retro's stands
  under it), and the "148 × 29 chip frame" is the location row: a 14 square in `s.ac` at
  `radius/chip` (`s.radiusChip`) beside `s.location` at Display/List. (4) The scrim is a
  full-height linear fade from `sem/media` (`#2E3928`, `s.box1`) at the floor to `sem/bg` at 0
  at the top, over a `s.box2` well; the card's ring is `stroke1`, drawn as an overlay.
- **No Device override, no box token, no `T` table.** `get_variable_defs` is the ramp at all
  three widths (dispLg 130 / 81 / 54, labelLg 32 / 21 / 14, labelSm 18 / 14 / 12, list
  24 / 19 / 18, bodySm 13 / 13 / 12). Display/Title — the card's name — is the frames'
  `u(36)` / 28 / 26. Radii 50 / 50 / 20 (well), 45 / 45 / 12 (card), 21 (portrait) and every
  padding are raw.
- **The Tags instance is hand-scaled, so `TagChips` is not used**: Label/XS × 0.752 (15.04 /
  10.53 / 9.02) with padding 3.76 / 8.27, radius 4.51 and gap 6.01 fixed at every width,
  inlined from `s.chips` as the bio's layout-2 block does, but with `vm.chips`' own dark seat —
  the chips stand on the photograph, not on `box1`. The leaked 700.74 measure is dropped.
- **The pill is `BookPill`'s Lime defaults at the frame's small box** — Scheme 3 is exactly
  `pillBg` lettered and disced in `s.bg` — so no `bg` / `fg`, only `size={s.labelSm}
  disc={27.6 * z}` and the 4.27 / 17.92 / 8.53 style, with `z` 0.82 / 1 / 1 (the bio's layout-2
  recipe: the box is 34.93 at all three widths).
- **The glass card's glow is `s.glow`, confirmed off the node** (INNER_SHADOW 19, spread 0,
  `#A6E22E`), one `boxShadow` with the 1px `s.ac` ring on the card itself (ring first; the 40
  padding clears it). The 1% `box1` fill paints nothing and is not drawn. Its two lines are
  `brand` and `kicker`, Retro's reading, so the seed prints *DJ · Live Act* where the frame
  types *Performing since 2021*.
- **The nav is HeaderV1's two halves, not the frame's five cells.** The frame spreads four equal
  flex cells round the name; any capsule wider than a quarter of the bar (the harness's six
  links already are) pushed the name 105 right of centre. With the spacers folded into the
  halves, the harness's six sit centred at 15px, and the budget's fixed part is HeaderV1's
  138.32. The seeded nine hold one row at 15px on the 1088 editor canvas and the published
  1440, with the name slid right (196 on the canvas), layout 2's accepted behaviour. At 390 the
  right half takes `minWidth: 0`, so the 96 pill overruns into the spacer as the master's does
  and the name stays centred at 195. The capsule's corner is `u(18)` on desktop (the one-row
  half-height, for the wrap case), `s.btnR` round the burger at 768 and 390.
- **Open question 4's answer: the 390 master is written out, not derived.** None of Retro's
  narrow constants is read. The body is a 24-gap column: a band with a stated **370.52
  minimum**, standing the name and chips on its floor (Retro's 568 rule), then the card turned
  on its side (`row(21)`, padding 20, radius 12, text left-aligned). The well has no top
  padding at 390; the nav's own 10 is its inset.
- **Measured against the masters**: desktop section 738 (900 × 0.82), nav content top 42.6
  (52 × 0.82), pill 95.2 × 28.6, name at 520 (634.48 × 0.82), card 180.4 × 205.3 at x 957
  (1168 × 0.82), its name at 611.4 (611.7); 768 section 1024, name at 824.4 (824.48), card
  220 × 241 at 506 / 741 (both exact), pill at 623.4 / 42; 390 section 606.4 (606.45), name at
  304.9 (304.93), card 350 × 127 at 20 / 459.4 (459.45), pill at 273.8 / 20. `live=1`: the
  links, Listen and the pill are `<a href="#…">`, the burger opens a six-link panel at 768 and
  390; the canvas anchors carry no href. `noimage=1` draws the backdrop's empty state under the
  fade. No page errors. Digest at themes 0–4, all 645 renders: exactly header arch 2 at theme 1,
  three widths.
- **Verified in the builder** (one puppeteer script, deleted): the setup modal offers four Lime
  cards and only card 3 draws the `#A6E22E` glass glow. *Use this header* opens an 11-section
  canvas with one composed row at 621 : 293 (858 : 405), and the published page stacks header,
  bio, media, calendar, repertoire, gallery, pricing, map, form, testimonials, footer — the
  composed order at desktop. In the published 1440 tab all eleven header anchors (nine nav,
  Listen, Book Now) scrolled to existing ids, Book Now on `form`; at 390 and 820 (fresh tab each)
  the burger stands in the capsule and opens a nine-link panel whose links scroll. The sidebar's
  per-row layout labels were not read; the composed row and the order are the arch-2 proof.

Settled in section 2 (the bio):

- **The first layout-3 block inside a section: `if (s.v2 && s.lime)` ahead of `Bio`'s `if (s.v2)`**,
  layout 1's and layout 2's seat for the same section. `Bio` has no state. The tree is Retro's twin's
  node for node (the same 440 photo row, 24/32 head and about bands, Frame 9, the 179 name cap, the
  100 / 52 stat gaps), so the block restates Retro's QA'd structure whole — the stat row's `2.2em`
  values, the 390 stack, the seal's band floor — and changes the dress, which reaches nearly every
  leaf. Diff 169 / 3 in `EncoreSection.jsx`; the three removed lines are `SealBadge`'s (below).
- **The plan's "`SealBadge`'s Lime branch" was wrong for this frame.** Frame 248 is Retro's §10.2
  seal (a 120 ring, 19.07 equator asterisks, an 86.5 centre asterisk) in **inverted** Lime inks: a
  `s.ac` disc with `s.bg` marks, where every earlier Lime frame draws the dark disc with rings and a
  reticle. `SealBadge` takes an additive **`classic`** prop that skips the Lime branch and the flat
  starburst, so the §10.2 path runs with `hue={s.ac} ink={s.bg}` (pass `ink`: `contrastInk` would
  give `#141414`). Every earlier caller is untouched, which the digest proves. The name keeps the
  §10.2 path's placement and clockwise run, so at rest it crosses the equator marks and the lower
  name is not upright as in the Lime render; it spins. The frame's name is **Anton** 16.6 tracked
  30%, Retro's label face leaking through the duplicated component; `s.label` (Bebas) is set. The seal's `image 1` grain **paints faintly**
  (between the arms the disc samples `(182, 229, 70)` against `#AFE335`, σ 7 in blue) and is not
  drawn (open question 2).
- **Placement is Retro's at 1440 and 390, and 4 lower at 768.** The disc centre is 105.6 in and
  150.4 down the about band at 1440, since Lime's 148 head plus a 1px rule comes to Retro's 144 + 5.
  At 768 the head is 144 over the same 1px rule and the seal keeps its leaked absolute y, so the
  centre is **154.4** down (`sealTop` 91.69). The 390 seal is a sibling of the card in Lime's
  instance, but it falls inside the card, so it stays in the photo row at Retro's `right` / `top`.
- **No `T` table, no box token.** `get_variable_defs` is the ramp at all three widths: display-sm
  50 / 40 / 32 (`s.dispSm`, the name), label-lg 32 / 21 / 14 (`s.labelLg`, the values), chip
  13 / 12 / 11 (`s.chip`), body-md 14 / 13 / 13 (`s.bodyMd`). The wrapper head is `s.dispLg` in
  `s.ac` over **`s.ui`** at `s.labelXs` in `s.tx` — the "KM BIO" `font/ui` switch layout 1 named.
  Radii 50 (card; **60 at 390**), 55 (photo) and every padding are raw.
- **Read off the nodes:** the card is `s.box1` with a 1px inside `stroke1` ring at 1440 and 768 and
  **no stroke at 390**, drawn as a last-child overlay. The two rules are `sem/text/2` at **node
  opacity .32** (`${s.tx}52`), not `stroke1`, and both stand in the 390 column's 20 gaps (Frame 258's
  children at 0 / 206 / 227 / 558), where Retro's foot rule stands outside it. The photo's
  INNER_SHADOW 34 is `s.ac`, on an overlay over a `s.box3` well; no grain, no drop shadow.
- **Open question 1's answer: a landscape seed was owed.** The fill's transform is `limeStage`'s
  slice, but its scale mode is `FILL`, which ignores it, so the render is the **whole** `fa453f7d`
  source cover-cropped. `lime-bio-stage.jpg` is that source at 1200 × 800 (the MCP asset's
  1536 × 1024 PNG, q82, 112 KB), seeded through `SEEDS.Lime.layouts[2].bio`. A centred cover of it
  diffs **0.9** from the 1440 render over the photo's middle; `limeStage` diffs 39. The section 1
  lesson again: read `scaleMode` before believing an `imageTransform`.
- **The desktop stat column clips its own label in the frame.** Two Label/LG lines at 32 plus the
  label and the 15 gap come to 111 in a clipped 96 column, so the 1440 render shows only "SINCE:" and
  "ROLE:". The label is drawn whole here and the row grows past its floor: the desktop head band is
  **130.9 against the frame's 121.4** (148 × 0.82), a named diff. 768 and 390 fit their 96.
- **`preview.jsx` takes `&column=left|right`** (desktop only): `sectionVm({ column })` in a wrapper
  `s.contentW` wide (684 / 323). Pass the side string — `contentWidth` reads anything but `'left'`
  as the right column. Media and the calendar use the same switch.
- **Measured against the masters' content edges**: desktop eyebrow 20.2, h2 95.2 (107px, one line
  at 571.5 in the 684 column), card 24.6 under it, photo 311.6 tall at 24.6 in, name two lines at
  41px (82), seal centre 86.6 / 123.3 (105.6 / 150.4 × 0.82); 768 head band 144, name at 80 in it,
  labels at 34.8 and values at 74 (35 / 74), seal centre 105.6 / 154.4, photo 628 × 380 (the frame's
  648 less our 20); 390 head 186, name at 24, labels at 94.2 (95), values at 131.2 (132), rules at
  206 and after the about band at 227, seal box at 40.5 (40.6) and 18.9 from the card's right (18.87).
  The cards run 720.8 / 867.1 / 767 against 882 × 0.82 / 912 / 878, short by the seeded prose. `live=1`
  renders identically (the branch has no control); `&name=Poppy%20Jaeggy&since=…` and `noimage=1`
  hold. No page errors. Digest at themes 0–4, all 645 renders: exactly bio arch 2 at theme 1, three
  widths — the new seed reaches layout 3 alone.
- **Verified in the builder** (one puppeteer script, deleted): Lime → card 3 → *Use this header* puts
  the bio and the calendar in one grid row at 621.6 : 293.4 on the canvas and 684.1 : 322.9 in the
  published 1440 tab, with media stacked under the bio in the left column. The bio there carries the
  lit seal and `lime-bio-stage.jpg`. The calendar beside it is still Retro's composition in Lime tokens
  (its session's), with the pale card that brings.

Settled in section 3 (the media player):

- **The first layout-3 block inside a branch: `if (s.lime)` within `Media`'s `if (s.v2)`, after
  `nHot`** — layout 2's media seat. The block reads the branch's `desk` / `tab` / `z` / `u` and the
  meter derivation (`pad`, `nBars`, `played`, `nHot` off `s.contentW`), and the hooks above every
  branch (`<audio>`, `cur`, `at`, `track`, `chosen`, `goTo`, `toggle`, `pick`, `onPick`, `now`), so
  the published player needed nothing new. Retro's `T`, `ROWS`, `A`, `cream` / `ink` / `hot` /
  `cold`, `head` and `card` are not read. **`{audio}` rides at the block's foot**, as Retro's does:
  there is no bar to tuck it into. Pure additions (174 / 0).
- **The tree is Retro's twin's, box for box**: the card's 24 padding, 16 gap, 96 meter, 44 disc and
  2-gap name columns, the counter's 16 padding, the rows' 14 padding, 20 gap and 64 sleeve. What
  moves: the card's radius is **50** (Retro 30), the rows have **no fill and no side padding**,
  and there is **no gap between the counter and the first row** (Retro's `col(u(10))`).
- **Open question 3's answer: the rows are content-tall, Retro's rule.** Each master's rows are
  exactly (stated − head) / 5: (424 − 45) / 5 = 75.8, (647 − 44) / 5 = 120.6, (647 − 43) / 5 =
  120.8. The 1440 row is also *smaller* than its content (14 + 64 + 14 = 92), which Figma lets
  overflow and CSS cannot. So a row is 92 (75.4 on desktop) at every width, against 62.2 / 120.6
  / 120.8. The Lime-only 424 is the composed page's allocation, not the component's.
- **Open question 5's answer: a literal.** `card` `#263020` (Scheme 2 `box/3`) and `dusk` `#43523B`
  (its `box/2`, the idle bars) are block-local. The disc is Scheme 2's `box/1`, which is `s.box2`.
  The played bars are `s.ac`, and **every ink is `s.tx`**, both names included: only the meter is
  lime, where Retro's names are the accent. No node carries a stroke or an effect, the card
  included.
- **No `T` or `A` table.** All three `get_variable_defs` are the ramp: label-xs 20 / 14 / 12, display-lg
  130 / 81 / 54, list 24 / 19 / 18, body-sm 13 / 13 / 12, body-md 14 / 13 / 13, body-lg 16 / 15 / 15,
  chip 13 / 12 / 11. Display/Title is the frames' `u(36)` / 28 / 26. The head is the bio's recipe:
  `s.ui` at `s.labelXs` over `s.dispLg` in `s.ac`. The list's sleeve well is Scheme 1's `s.box2`,
  the rows' hairline `s.stroke1` as `inset 0 1px 0`, with the first row's giving the rule under
  the counter.
- **The heading's measure is the frame's own 632 box on desktop only.** "Five worth" is 3.59em,
  "Five worth your" 5.34em and the box 4.86em, so the break falls after WORTH as in the frame.
  768 sets one line. At 390 the seeded "Five worth your ear." is 6.86em, 370 at 54 against our
  346, so it wraps to two lines where the frame's 370 holds one. That is a named diff.
- **Named diffs.** The narrow meters paint the playhead from the left. The masters centre a leaked
  57-bar row and clip it, so the lime head is half gone at 708 and gone at 370 (Retro's
  derived-count rule). The card's clock row reads 00:00 / the track's length, and its right-hand
  line is `track.rel`, where the frame types 1:00 / 2:00 and "Mix 028": Retro's readings. The
  390 rows keep Retro's 14 gap, since the master's 20 hard-clips "LATE LIGHTS (ORIGINAL MI". The
  narrow card is 238 against the leaked 243.
- **Measured against the masters' content edges** (`column=left` at desktop): eyebrow 20.2, h2 two
  lines at 107 standing 44.6 under the eyebrow's top (55 × 0.82 = 45.1), card 24.6 under the h2 and
  200.6 tall (243 × 0.82 = 199.3) at radius 41, meter 78.7, disc 36.1, list 24.6 under the card,
  counter 37.2 (36.9), rows 75.5, sleeve 52.5 at x 33.6; 768 h2 one line at 72.1 standing 47.6
  under the eyebrow (48), card 238.2, counter 44 (44), rows 92; 390 eyebrow 15.1, h2 two lines,
  card 236.8, counter 43 (43), rows 92 with the 14 gap. The canvas has zero pointer cursors.
- **`live=1` at desktop and 390** (puppeteer, `--autoplay-policy=no-user-gesture-required`, probes
  deleted): a row click plays that track, and its number becomes Pause, the card names it and
  the disc shows Pause. A second click pauses (Play glyph), the disc toggles play and pause, and
  another row moves the mark. The meter stayed at 0 played across the 1.2 s probe: the remote
  file's metadata had not loaded, which is the shared `now.pct` path and not this block's.
  `n=0` prints the counter and *No tracks yet.* with no card (Retro's `track &&`); `n=1` and `n=8`
  hold, 8 growing the 390 section to 1305. No page errors. Digest at themes 0–4, all 645 renders:
  exactly media arch 2 at theme 1, three widths. Not checked in the builder; the bio session's
  composed-row check covers the column, and `column=left` is the same `sectionVm({ column })`.

## Open questions

1. *Settled in section 2 — a landscape seed, `lime-bio-stage.jpg`; see its Conventions.* **The bio photograph's cover.** The frame's transform is `limeStage`'s own slice, filling a
   landscape 798 × 380 box, so a centred cover of the existing file should be the frame's
   picture — but that is an inference from the transform, not a render comparison. If the bio
   session finds the cover cropping the wrong band of the slice, the answer is a landscape
   export seeded through `SEEDS.Lime.layouts[2].bio`, Retro's own mechanism, and nothing else
   in `photos.js` moves.
2. *Settled in section 2 — it paints faintly and is not drawn.* **The seal's grain rect.** Lime's bio seal carries Retro's `b74be8bc` grain inside it at
   447 × 447. It is almost certainly a leftover of the duplicated Retro component; the render
   decides whether it paints, and `SealBadge`'s Lime branch draws no grain either way.
3. *Settled in section 3 — divisions of the stated height, and the rows are content-tall; see its Conventions.* **The media list's narrow rows.** 121 tall at 768 and 390 against 76 at 1440, on a
   component whose Retro instance states 647 at every width. Whether 121 is a design (a taller
   row for a narrower measure) or the 647 constant divided five ways (647 − 45 = 602; 602 / 5 =
   120.4) is the media session's first reading — the quarter-pixel test Retro's plan used.
4. *Settled in section 1 — written out; see its Conventions.* **The header's 390 master** is a different composition from Retro's at that width, and it is
   the first Lime master to be. Whether `HeaderV2`'s narrow constants can be reused at all, or
   the Lime block writes its own 390 out, is the header session's call; write it under
   *Conventions* since layout 4 may meet the same shape.
5. *Settled in section 3 — the literal.* **The now-playing card's `#263020`** (Scheme 2 `box/3`) has no key on `THEMES[1].sem`. A
   local literal in the media block is layout 2's `lime3` precedent; a `sem` key would be
   session 0's shape and reaches nothing else on this page. Default is the literal.
