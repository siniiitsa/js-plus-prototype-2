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
| 4 | `repertoire` | `964:68678` | 1440 × 621 | `984:10760` *(in `984:10757`)* | 708 × 655 | `984:10791` | 390 × 709 | `964:68646` / `977:23041` / `982:10193` | done `2c4e0e1` |
| 5 | `calendar` | `964:68677` *(in `964:68675`)* | 405 × 538.6 | `984:10763` *(in `984:10761`)* | 708 × 483.6 | `984:10794` *(in `984:10792`)* | 370 × 450.6 | `964:68645` / `984:10605` / `984:10673` | done `46d28f5` |
| 6 | `gallery` | `964:68679` | 1440 × 789 | `984:10764` | 768 × 884 | `984:10795` | 390 × 591 | `964:68647` / `977:23131` / `982:10257` | done `01d5665` |
| 7 | `pricing` | `964:68680` | 1440 × 1199 | `984:10765` | 768 × 1072 | `984:10796` | 390 × 1474 | `964:68648` / `977:23149` / `982:10274` | done `0695e22` |
| 8 | `map` | `964:68681` | 1440 × 819 | `984:10766` | 768 × 831 | `984:10797` | 390 × 887 | `964:68649` / `977:23264` / `982:10389` | done `1b5d080` |
| 9 | `form` | `964:68682` | 1440 × 570 | `984:10767` | 768 × 734 | `984:10798` | 390 × 755 | `964:68650` / `977:23406` / `982:10472` | done `6d9b95d` |
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
| map | **Scheme 4** | `radius-map` **Scheme 2** (*corrected in section 8*): `#CCFA61` (`lime3`) at every width |
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
| 8 | map | **full-bleed `#F2FFD0` sheet** (Scheme 4, `s.tx`) | the map panel (`lime3` at every width — *corrected in section 8*), rows and chips inked `#15180F` |
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

Settled in section 4 (the repertoire):

- **`if (s.lime)` within `Repertoire`'s `if (s.v2)`, after `arrow`** — the seat layouts 1 and 2 used
  for this section. The block reads `desk` / `tab` / `z` / `u`, `cap`, `sets`, `perPage`, `pages`,
  `pg` and `seats`, plus the hoisted `open` / `page` state, so the reveal and the 390 pager needed
  nothing new. It does **not** read Retro's `T`, `rowH`, `card` or `hair` (`hair` is `s.bw` away
  from Retro, so even the pager is redrawn, with the ring as an inset `s.ac` shadow). Pure
  additions (136 / 0).
- **The tree is Retro's twin's; the boxes that move** are the card's padding **34** (Retro 24), its
  corner **50** (30) and the rows. Each master's rows are `flex-1` divisions of the stated card,
  exact to the quarter pixel: (369 − 68 − 24 − 13 − 48 − 60) / 4 = **39**, (439 − …) / 4 = **57**
  and **57.5**. They are pinned at those heights, Retro's rule, so `py-6` is inert. The desktop row
  (39 × 0.82 = 32) is shorter than its 23.6 title plus padding, which is why the padding cannot be
  written out.
- **Every size is a ramp token.** `get_variable_defs` at all three widths gives display-lg
  130 / 81 / 54, body-lg 16 / 15 / 15, chip 13 / 12 / 11, list 24 / 19 / 18 and body-sm 13 / 13 / 12,
  so `s.dispLg`, `s.bodyLg`, `s.chip`, `s.list` and `s.bodySm` are used and there is no `T` table.
  **The head is `s.tx`** (`sem/text/2`), where Retro's head is the accent.
- **The plan's "seat the schemes by index" became: by rendered place.** Seat 0 is `s.box1` with pale
  ink, a `s.ac` meta line and a `stroke1` ring. Seats 1 and 2 are `mist` and `lime3`, with `s.bg`
  ink and meta and a `#15180F26` ring. The discriminator was the 390 master, which **centres the
  mist card**. Retro's carousel puts set 0 in the centre at page 0, so seating by set index would
  have put the olive card there. So the grid colours its columns and the carousel colours its
  left, centre and right slots. A set takes the colour of the slot it stands in, and the colours
  stay put as the sets rotate (driven live: next, then prev ×2 wrapping). A lone card on the grid
  is column one's olive (the All card on page 2 at `n=20`), and the carousel's lone card takes the
  centre colour. Both literals are block-local, the earlier blocks' idiom. The emitted code shows no
  effect; no `use_figma` read was taken.
- **Diffs carried over from Retro's branch, unchanged:** the meta line is the set's count ("6 SONGS")
  where the frame has a mood and a running time. The right-hand column is the artist, not a
  duration. At 390, page 0 centres set 0 where the master centres its second card. At 768 the
  cards are 216 wide against the frame's 222.7, because our column is 688 and the frame's is 708.
- **Measured against the masters** (seeded page): desktop head 95.2 (116 × 0.82), grid 19.7 under it
  (24 × 0.82), cards **303.4** tall (369 × 0.82 = 302.6) at radius 41, title line 19.5, meta 11,
  rows 32, view block 40; 768 head 72.1 (72), cards **438.7** (439), rows 57, view 48.2 (48); 390
  head 48 (48), cards 290 × **438.3** (439) at −260 / 50 / 360, the master's own x, rows 57.5, view
  46.8 (47), pager 168 × 54. `live=1`: the carousel wraps both ways; at `n=20` *View full set*
  reveals one card (three links become two), the untagged rows bring the All card, and the wide
  pager turns to it. `n=0` prints *No songs yet.* No page errors. Digest at themes 0–4, all 645
  renders: exactly repertoire arch 2 at theme 1, at three widths.

Settled in section 5 (the booking calendar):

- **`if (s.lime)` within `Calendar`'s `if (s.v2)`, after `line`.** The block reads `desk`, `month`,
  `at`, `hit`, `line` and the hoisted `sel`, so the published day picking and the foot pill needed
  nothing new. It does not read Retro's `T`, `panel`, `ink`, `hue`, `taken`, `head`, `grid` or
  `dot`. Under Lime those are `paper`-derived and would draw a pale card. Pure additions (97 / 0).
- **The cheapest section so far: the tree is Retro's twin's to the pixel.** One `use_figma` read of
  all three instances gave the 20 padding, 18 gap, `Frame 282` head (0 gap), 12 / 2.745 month row,
  8-gap dot rows of 30.713, the 21-gap key at 4 padding and the pill's 5 / 5 / 5 / 21 round a
  46 × 44 disc, all identical at 405, 708 and 370. The head-to-card gap is 30 at every width
  (`get_metadata` on the three `Frame 300`s). Retro's one-grid normalisation of the frame's two row
  mechanisms is kept.
- **What the dress changes.** The card is `s.box1` at radius **50** (Retro 30), with a **2px
  `stroke1` ring stroked inside**, drawn as an inset shadow at `s.bw` (`border/thin`), unscaled at
  desktop like every Lime ring. Its padding is wider than the ring, so
  no child paints over it and no overlay is owed; this is unlike layout 1's calendar panel. The
  numeral is **`s.tx`**, where Retro's is the accent. The dots are read off the exported SVGs:
  booked `s.box2`, picked `s.ac`, free `s.box1` inside a raw 2.559 `stroke1` ring (inset). The
  key's marks take the same two fills, so the Booked mark is nearly invisible on the card, as it
  is in the frame. No node carries an effect. "Book Me" is Bebas 36 / 28 / 26 at lh 1.1 in `s.tx`
  (read off the text nodes; `s.title` is the string).
- **No `T` table.** `get_variable_defs` is the ramp at all three widths: display-lg 130 / 81 / 54,
  display-sm 50 / 40 / 32, body-md 14 / 13 / 13, body-lg 16 / 15 / 15, body-sm 13 / 13 / 12, list
  24 / 19 / 18. Retro's non-monotonic `list` is Retro's alone.
- **The pill is Scheme 2: `BookPill`'s Lime branch with `fg={s.box1}` and `full` at 390.** Its
  `bg` defaults to the lime `pillBg`. The disc follows `fg`, and the arrow follows `bg`, so the
  pill is the frame's `#2E3928` disc with a lime arrow. The branch's own `k` gives the 54 box and
  the `s.list` label. None of Retro's `disc` / `size` / `shadow` is passed. The frame's arrow is
  a hand-drawn path; lucide `ArrowRight` stands in, as it does on every Lime pill.
- **Measured against the masters** (`column=right` at desktop): "Book Me" 32.4 / 30.8 / 28.6 tall
  (40 × 0.82 / 31 / 29), and the card stands 24.6 / 30 / 30 under it. The head is 155 / 134.3 /
  102.2 (189.74 × 0.82 / 134.74 / 102.74), and the numeral is 95.2 / 72.1 / 48. The key is 22 /
  26.2 / 24.8 (26 × 0.82 / 26 / 25), and the pill 44.3 / 54 / 54, with the desktop disc 37.7 ×
  36.1. The cards are 473.7 / 521.9 / 488.5. Each is the frame (441.7 / 483.6 / 450.6) plus one dot
  row, because the seeded June runs five weeks where the frame draws four; that is Retro's named
  diff.
- **`live=1` at desktop and 390** (puppeteer, probes deleted): 30 dots take a pointer, and the
  canvas has none. A click on June 21 moves the numeral, the weekday (Sat) and the pill to
  *Enquiry About June 21*. A second click falls back to the cued June 12. The pill is
  `<a href="#form">` live and a span on the canvas. `&booked=2025-06-12` drops the numeral and the
  weekday, lights nothing and prints *Pick a date to enquire*. Booked days take the `box2` fill.
  No page errors. The composed row was not re-checked in the builder; the bio session's check
  covers the column, and `column=right` is the same `sectionVm({ column })`. Digest at themes 0–4,
  all 645 renders: exactly calendar arch 2 at theme 1, three widths.

Settled in section 6 (the gallery):

- **No block: `s.lime` ternaries through `Gallery`'s `if (s.v2)`**, layout 2's gallery call. One
  `use_figma` walk of the three instances returned Retro's twin's boxes at every node (insets
  56 / 60·30 / 60·20, the 32 head gap, gaps 8 / 8·20 / 8·20, radius 30, a 1px inside ring), so
  only paint, the head's size and the tile shape move. Diff 37 / 9. The sheet is `s.box1`
  (Scheme 2's `sem/bg`, where the Retro path's non-Retro arm read `paper`, pale lime); the head is
  `s.dispLg` at **every** width (Retro's `tab ? s.h1` arm is Retro's); each tile is a `#263020`
  well (Scheme 2's `box/3`, the media card's literal, passed as `Photo`'s `style`) under an
  `inset 0 0 0 1px stroke1` last-child overlay, and no border. An empty slot's `KM` is `s.tx`.
  The frame's seventh tile has an `s.ac` well under its photograph; it paints nothing and is not
  drawn.
- **The tile ratio is re-derived, not inherited.** Same residue rule as Retro's, over Lime's own
  page: (789 − 112 − 116 − 32 − 16) / 3 = **171** at 1440 and (591 − 120 − 48 − 32 − 60) / 4 =
  **82.75** at 390, so the ratios are 326 / 171 and 111.333 / 82.75 (Retro 181.333 and 107.5).
  768 states the same 660 grid and keeps Retro's 230.667 / 150.
- **The viewer is re-inked, not restructured**: scrim `#15180F` at .94 and controls `s.tx` on its
  own 14% (`rgba(242,255,208,.14)`), behind `s.lime`; Retro's near-black and cream stay. The
  frame draws no viewer, so this is the palette's reading of a QA-added control.
- **Measured against the masters**: desktop inset 45.9 (56 × 0.82), head 95.2 (116 × 0.82), grid
  top 167.3 (204 × 0.82), tiles 267.1 × 140.1 (267.3 × 140.2) on an 8.1 / 8.1 pitch; 768 grid top
  164, tiles 230.7 × 150 at a 20 row gap; 390 grid top 140, tiles 111.3 × 82.7. The sections are
  500 / 714 / 488 against 647 / 884 / 591, short by the frame's twelve tiles against our seven
  (Retro's named diff). `live=1` at desktop: a tile click opens the viewer at 3 / 7 with focus and
  `overflow: hidden` on `<html>`, → steps to 4 / 7, Escape closes and restores `visible`; canvas
  cursors are `auto`. `n=0` keeps the wells and rings with pale initials. No page errors. Digest
  at themes 0–4, all 645 renders: exactly gallery arch 2 at theme 1, three widths. The viewer is
  not in the first paint, so the digest does not cover its Retro arm; that arm's values are
  unchanged by construction.

Settled in section 7 (pricing):

- **`if (s.lime)` within `Pricing`'s `if (s.v2)`, after `shown`.** The block reads `desk`, `tab`, `u`,
  `active`, `shown` and the hoisted `chip`, so the published filter, the moving FEATURED seat and the
  Book pills needed nothing new. It does not read Retro's `T`, `chipType`, `h` (`vm.tierRow`),
  `panelFg` or `selector`. That closes the plan's "`vm.tierRow` reaches pale lime" trap by not
  reading it. Pure additions (186 / 0).
- **The tree is Retro's twin's; three boxes move**: the row padding is **38** (Retro 28), the corner
  **50** (30), and the tablet includes panel **240** (248, which is what the wider padding leaves). Every
  ring is an inside stroke drawn as an inset shadow, so the 38 stands with no `calc(… - 1px)`. The
  frame sums exactly: 38 + 210 + 38 = 286.
- **Schemes by node.** The instance is Scheme 1. A plain row is the page ground in a 1px `sem/stroke/2`
  (`s.ac`) ring with a lime numeral. The featured row nests **Scheme 3**: an `s.ac` fill, an `s.bg`
  ring and every ink `s.bg`, and its badge Scheme 3's `box/1` `#CCFA61` (`lime3`, block-local). The
  capsule is `s.box1` in a `stroke1` ring, its lit option `s.ac` lettered `s.bg`. No node carries an
  effect. **Declined:** the instance's own 1px `stroke1` ring on four sides, layout 2's pricing reason.
- **No `T` table.** `get_variable_defs` is the ramp at all three widths: bodyMd 14 / 13 / 13, bodySm
  13 / 13 / 12, list 24 / 19 / 18, bodyLg 16 / 15 / 15, dispMd 72 / 50 / 40, labelXs 20 / 14 / 12, chip
  13 / 12 / 11, eyebrow 15 / 12 / 11. Display/Title is the frames' `u(36)` / 28 / 26, and Body/Chip
  tracks `-0.06em`. Both the ✓ and WHAT'S INCLUDED are Body/Chip here, not layout 1's Body/SM tick.
- **Pills.** A plain row's pill is `BookPill`'s Lime defaults exactly. The featured row's is the pair
  turned round, `bg={s.bg} fg={s.ac}`: a lime disc round an ink arrow, which is what the frame's two
  disc SVGs draw. `full` at 390.
- **Named diffs.** Two are Retro's, inherited. The seeded intro is one line (`DEFS.pricingIntro`), so the
  head is 58.7 / 62.3 / 88.7 against 94 × 0.82 / 83 / 81, and the seeded title wraps to two lines at
  390. The pill reads *Book Now* (`cta1`) where the frame types *Book*, so it is 130.5 / 142.1 / 138.9
  wide against 121 × 0.82 / 113 / 111. The rest are this pass's:
  - The desktop left column is 478.4 against 606 × 0.82, because of our 1052 content width.
  - The 768 pairs are normalised to one grid at 8, where the frame spaces a pair's two items 9 apart.
  - "Save 15% on bundles" stays dropped.
  - **The 390 third row is 391.3 against 376**: "Visual sync available" wraps in our 123 cell, while
    the frame's 113 text box overflows its 125 item without wrapping. Rows 1 and 2 land exactly.
- **Measured against the masters' content edges.**
  - Desktop: h2 32.4 (40 × 0.82 = 32.8); intro 42.2 down (52 × 0.82); capsule 30.2 (36 × 0.82 =
    29.5), 19.7 under the head; rows **234.4** (286 × 0.82 = 234.5) at a 13.1 gap; name 24 (29 × 0.82);
    price 32.2 under it and 59 tall (39 / 72 × 0.82); blurb 20.2; pill 44.3; includes 32.8 right of
    the left column, its grid 20.8 under the label (25 × 0.82).
  - 768: h2 30.8 (31); intro at 42.8 (43); capsule 36.2 (36); rows **250.4 / 250.4 / 268** (251 / 251
    / 269); price 50 at 32.8 (33); blurb at 60 (60); includes 240 at x 410 (the frame's 430 less our
    20); grid 24 under the label (24); items 17.6 (18).
  - 390: capsule 34.8 (35); rows **337.9 / 406.4** (338 / 406); includes 238.7 down the row (239);
    items 123 × 15.1 (125 × 15).
- **`live=1` at desktop and 390** (puppeteer, probes deleted):
  - Every chip filters and moves the lit fill (ink on lime); the idle labels are `s.tx`.
  - The FEATURED seat follows the last row on show: Solo fills the Wedding Set; Trio and Band fill the
    Festival Set.
  - The pills are `<a href="#form">`. On the canvas, cursors are `auto` and the pills are `<span>`s.
  - `n=0` prints *No packages yet.* in a lime-ringed row with no capsule; `n=1` seats nothing; `n=8`
    seats row 8.
  - No page errors.
- **Digest** at themes 0–4, all 645 renders: exactly pricing arch 2 at theme 1, at three widths.

Settled in section 8 (the events map):

- **`if (s.lime)` within `EventsMap`'s `if (s.v2)`, after `litRow`.** The block reads `desk`, `tab`,
  `z`, `u`, `chips`, `active`, `shown`, `pages`, `pg`, `feat`, `feature`, `onPick`, `litRow` and the
  hoisted `chip` / `page` / `sel` / `zoom` / `allGigs`, so the filter, the featuring, the 390 pager,
  zoom and *See all gigs* needed nothing new. Five derived consts moved up above the block, with
  their values unchanged: `ringW`, `zoomScale`, `expand`, `Expand` and `canReveal`. Retro's `T`, `sheet` … `tabFg`, `body12`,
  `chip12`, `head`, `chipRow`, `gigRow`, `list`, `pins` and `panel` are not read. Diff 353 / 11. The
  11 removed lines are those moved consts.
- **The tree is Retro's twin's, box for box.** One `use_figma` walk of the three instances gave the
  same sheet insets (56 / 56·30 / 60·10), column gaps (60 / 30), the 18 column stack, the 14-padded
  rows round the 56 disc, the lit pill's 14 / 29 / 14 / 10, and the 32 / 12 / 12·10 panel at a 24 gap.
  The 30 × 40 zoom buttons sit 16 in. What moves: the panel corner is **50** / 30 / 30 (Retro 30),
  and the map container's is **25 / 42 / 24** (Retro 14 / 20 / 20). The viewport residues are
  570 × 471, 315 × **512** and 350 × **157** (Retro 472 / 524 / 166).
- **Schemes by node.** The instance is Scheme 4: an `s.tx` sheet with `s.bg` ink. Every outline is
  the 15% `hair` (`#15180F26`) stroked inside, drawn as an inset shadow: the chips, the date discs,
  the hour chips, the list's top rule and the rows' **1px** bottom rules (Retro draws 2px olive), the
  zoom buttons, the container and the data bar. The discs are `mist` in **both** states; Retro inverts
  the lit one. The lit row is an ink pill with `s.tx` type and no border, and its hour chip fills
  `s.tx`. `radius-map` is **Scheme 2 at all three widths**, not only at 390 as the plan's table read:
  `#CCFA61` (`lime3`) for the panel and the container. Its status tab, ring labels, rings, pin head
  and tail are `s.ac`, and the zoom buttons are `#D9FF7F` (`lift`) with a 20px Inter Bold glyph at
  radius 8. No node carries an effect.
- **Rings are the frame's weights, opacities and dash**: 1 / 1.5 / 2 at .3 / .5 / .8 in `s.ac`, and
  the outer ring is `dashPattern` **4 / 4** at all three widths. So each ring is one `<svg>` in its
  own pixels (viewBox 480 / 300 / 140), which is layout 2's recipe; the first walk missed the dash
  because it did not read `dashPattern`. The tell was `get_design_context` exporting the 120mi ring
  as a PNG and the other two as SVGs. Retro's are 1px sheet at .3 / .8 / .8, undashed.
- **The raster is drawn as it is**: `s.mapRadialSrc` over an `s.box1` fallback, with no multiply.
  The frame's fill is `e089bd11` at `FILL`.
- **Named diffs.**
  - The pins are layout 2's pair: `s.tx` at 8, and the featured one `s.ac` at 14 in a 2px ink ring.
    The frame's five dots are ink at 60%, which vanishes on the raster.
  - The centre pin's glyph is ink. The frame strokes it `#AFE335` on the `#AFE335` head, but the
    render shows it dark.
  - The *Expand view* arrow is `s.ac` on `lime3`, faint, as the frame strokes it.
  - The 390 pager's two pills sit Pager's 8 apart, where the frame's sit flush (185 + 185).
  - The 768 data bar wraps, since the seeded "Based in Manchester · 5 pins · 12 mile radius" is
    longer than the frame's. This is Retro's named diff, and it makes the 768 panel 714.7 against 697.
  - Retro's drops hold: the weekday, the status chips and the ↗.
- **No `T` table.** `get_variable_defs` is the ramp at all three widths: bodySm 13 / 13 / 12, bodyMd
  14 / 13 / 13, list 24 / 19 / 18, labelXs 20 / 14 / 12, chip 13 / 12 / 11, eyebrow 15 / 12. Display/Title
  is `u(36)` / 28 / 26, and it sets both the head and the panel's venue. The head is **ink**
  (Retro's is rust).
- **The pill is `BookPill`'s Lime branch as `bg={s.bg} fg={s.tx} full={s.mob}`**: an ink box with
  pale type, and a pale disc round an ink arrow. That is what the frame's Scheme 4 pill draws. Its
  boxes are 44.3 / 54 / 54, and it runs full-measure at 390.
- **Measured against the masters** (seeded page):
  - Desktop: section 671 (819 × 0.82 = 671.6), head 52.7 (64 × 0.82), rows 68.9 (84 × 0.82), panel
    579.3 (707 × 0.82 = 579.7), panel head 82.8 (102 × 0.82 = 83.6), map viewport 386 (471 × 0.82).
  - 768: head 55 (55), rows 92.2 / 84 (95 / 84; the frame's venue wraps in 97), viewport 512 (512).
  - 390: head 51.4 (52), the list 186.8 (187: row 122.8, pager 54), pill 370 × 54, panel 357.9
    (360), viewport 157 (157).
- **`live=1` at desktop and 390** (puppeteer, probes deleted):
  - A row click features its gig, moves the lit row and grows its pin.
  - The Lake District chip filters to one row with no lit row, and All brings the pick back.
  - Zoom steps to 1.5625 after two clicks.
  - The 390 arrow pages to the next gig.
  - *Expand view* is `<a>` live and a span on the canvas.
  - At `n=30`, *See all gigs* turns 5 rows and a pager into 30 rows.
  - `n=0` prints *No dates yet.* with no pins. `n=1` draws no chip row and no lit row.
  - The canvas's only pointer cursors are `BookPill`'s own (shared). No page errors.
- **Digest** at themes 0–4, all 645 renders: exactly map arch 2 at theme 1, at three widths.

Settled in section 9 (the enquiry form):

- **`if (s.lime)` within `EnquiryForm`'s `if (s.v2)`, after `up`**, which is this pass's seat inside a branch.
  The block reads `desk`, `z`, `u` and `up`, plus the hoisted `vals` / `errs` / `sent` / `href` /
  `onSubmit` / `Pill` / `pillLink`. So the published boxes, the submit, the sent card and *Write
  another* needed nothing new. It does not read Retro's `T`, `cream`, `ink`, `cardAc`, `pillBg` …
  `discInk`, `chipType`, `boxShell` or `pill`. Those are `paper` derivations and would draw a pale
  card. Diff 150 / 0 in `EncoreSection.jsx`, plus 7 / 0 in `EncoreBuilder.jsx` (below).
- **The tree is Retro's twin's, box for box.** One `use_figma` walk of the three instances gave
  insets of 90/56, 60/30 and 30/10, gaps of 60 / 32, the card's 28/24 padding with a 14 gap, boxes
  10 apart at 12/14 padding, and the pill's 5/5/5/21 round a 46 × 44 disc. So the two-column grid,
  the centring and the dropped `sticky` are restated. What moves: the card radius is **50** (Retro 30),
  and the boxes are **44 / 39 / 37** (Label/SM 18 / 14 / 12 plus 24). The price row is 40 / 31 / 29
  (Display/Title), so the card is 390 / 366 / 356 against Retro's 368.
- **Scheme 1 throughout: no nested scheme, and no effect on any node.**
  - The card is `s.box1` inside a 1px `stroke1` ring, drawn inset. Its 24 padding clears the ring, so
    no overlay is owed.
  - Every box is the same `box1` pill in the same ring, in Label/SM `s.tx`.
  - The submit is `s.ac` lettered `s.bg`, round an **`s.bg` disc with a lime arrow**. That is the
    frame's own SVG, and the reverse of layout 1's Lime pill.
  - The price and the stars are `s.ac`; the unit, the count, the note and the head's eyebrow and
    paragraph are `s.tx`; the display line is `s.ac`.
  - A refused box thickens its ring to **2px of `s.tx`**, the Lime rule on a dark card, and the
    height does not grow.
- **No `T` table.** `get_variable_defs` is the ramp at all three widths: chip 13 / 12 / 11, dispLg
  130 / 81 / 54, bodyMd 14 / 13 / 13, bodySm 13 / 13 / 12, labelSm 18 / 14 / 12, list 24 / 19 / 18.
  Display/Title is `u(36)` / 28 / 26. The eyebrow is Body/Chip: Inter Bold, tracked -0.06em.
- **The desktop head shrinks to fit its widest word: the first Lime size that gives way to its
  column.** The seed's heading is the shared "Let's make / your night unforgettable." (Retro's QA
  kept it over the frame's "Book Kai for your event"). At Lime's 107 px, UNFORGETTABLE. (5.158em) is
  552 px, and the half column is 501. The inherited `overflowWrap` therefore broke it as
  UNFORGETTABL / E.; Retro's 78.7 px fits. The fix is **`vm.titleWordEms`**, a Lime-only key in
  `sectionVm` set after every heading fallback: the widest word of `vm.title`, in `bebasEms`, by
  the nav's `navEms` rule. The block sets `min(dispLg, floor((contentW − 60z) / 2 / ems))` at
  desktop only, which is **97 px** for the seed, on three lines. 768 (418 < 688) and 390 (279 < 346)
  never bite. A hand-derived em cap could not have helped: the fix has to shrink, not narrow, and a
  literal would break on the artist's next long word. Any later Lime display head in a column
  should take the same key.
- **Named diffs.**
  - The frame's copy (Retro's, inherited): three boxes against the seed's four, and a two-line
    "Book Kai for your event" against the seed's three lines at desktop and 390 (two at 768). So the
    heads are 259 / 144.2 / 144.1 tall against 232 × 0.82 / 144 / 96.
  - With the taller card the desktop head centres against it, as the frame's does.
  - The seed's typed `\n` folds as whitespace, Retro's reading.
  - The prompt line stays after the boxes are corrected, until the next submit. That is the shared
    seam's behaviour.
- **Measured against the masters.**
  - Desktop: section 525.1 (570 × 0.82 = 467.4, plus the fourth box and the third head line);
    eyebrow 11, with the h2 16.4 under it (20 × 0.82) and the paragraph 16.4 under that; card
    501.4 × 365.1 (319.8 + one 44.3 box pitch); price row 32.4, bookings 15.4, boxes 36.1, pill 44.3.
  - 768: h2 at 32 (32), paragraph at 196.2 (196), card 32 under the head (32); inside the card,
    price at 28, bookings at 72.8 (73), boxes at 104.9 (105), 39 tall; pill 54; card 415.2
    (366 + 49).
  - 390: card 402.2 (356 + 47), boxes 37, pill 54.
  - The canvas has no inputs, no anchors and no pointer cursors. `n=0` is the card with its pill
    alone; `n=8` grows it.
- **`live=1` at desktop and 390** (puppeteer, with a capture-phase `preventDefault` on the mailto;
  probes deleted):
  - A refused submit rings all four boxes in 2px `s.tx`, the heights unchanged, and prints the
    prompt.
  - Typing clears each ring.
  - The mailto subject is the bare *Enquiry*, and the body carries the four values.
  - A valid submit swaps in the sent card, and *Write another* restores the typed values.
  - No page errors.
- **Digest** at themes 0–4, all 645 renders: exactly form arch 2 at theme 1, at three widths. The
  new vm key is read nowhere else.

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
