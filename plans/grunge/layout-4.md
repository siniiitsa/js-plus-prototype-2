# Grunge layout 4 — section-by-section plan

This is the working checklist for bringing **layout 4** of the Grunge template up to its Figma
designs, the way [`../lime/layout-4.md`](../lime/layout-4.md) did for Lime. It runs one section per
session, all three widths together, clearing context between sections. Layouts 1 (`s.v0`), 2
(`s.v1`) and 3 (`s.v2`) under `s.grunge` are fitted and merged; nothing here should move any of
them. **This pass closes the Grunge family**: `HEADER_COUNT.grunge` is 4, the setup modal offers
four Grunge cards, and after this pass all four are fitted pages.

**This plan is Lime layout 4 again, with deltas — and the deltas are layouts 1, 2 and 3's idiom.**
It does not repeat Lime's plan: the page order, the wrappers, the procedure, the harness, the digest
and the verification are Lime's, verbatim, with `theme=1` read as `theme=2`. What is written here
is only what differs. And it does not repeat [`layout-1.md`](./layout-1.md),
[`layout-2.md`](./layout-2.md) or [`layout-3.md`](./layout-3.md) either: the gates, `faced` /
`facedLh`, the uppercase-per-site rule, the `G` lookup, the node walker, the paired diff, "rings,
not glows", the `boundVariables` rule and the four-theme digest are those passes', and they carry
over whole.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then:
- [`../CONVENTIONS.md`](../CONVENTIONS.md), groups **A**, **B** and **C** (this plan inherits all
  three; group D names Lime's layout-1, -2 and -3 blocks and has no layout-4 row yet — the Lime
  layout-4 *Settled* bullets play its part here, and this pass's sweep writes **D4**)
- the whole *Conventions* of [`layout-1.md`](./layout-1.md) — the foundation, and **the torn seam
  this page brings back** (*Settled in section 3*, `TornEdge`'s `grunge` prop and the black-run
  depth method) — and of [`layout-2.md`](./layout-2.md) and [`layout-3.md`](./layout-3.md) — the
  widening idiom, the Scheme-2 and Scheme-3 traps, the walker, the paired diff and the
  `boundVariables` rule — plus all three passes' *Settled* notes for the section you are about to
  fit
- the *Conventions* of [`../lime/layout-4.md`](../lime/layout-4.md), the section you are fitting
  above all: **its block is the block you widen**, and its *Settled* bullet says what that block
  reads, what it drops and what it measured
- the section's entry in [`../lime/layout-4-qa-fixes.md`](../lime/layout-4-qa-fixes.md) where it
  has one — JP-052 and JP-053 rebuilt the calendar's right column and its mailto, JP-054 the
  form's copy, JP-038 the page-ground sections' inset — since those moved the blocks after Lime's
  *Settled* bullets were written
- the *Conventions* **and the 2026-09-15 Addendum** of [`../retro/layout-4.md`](../retro/layout-4.md),
  which built every `s.v3` branch; the Addendum is what the branches actually are now
- the *Per-session procedure* of [`../lime/layout-4.md`](../lime/layout-4.md)

Then the memory notes `figma-frame-reading`, `verifying-the-published-tab` and
`browser-tool-choice`. `SPEC.md` lives in git history: `git show 8fa8ff4:SPEC.md`.

Branch: **`grunge-layout-4`, forked from `main`.** `grunge-layout-3` merged as PR #29
(`ac46c5c`) and the Lime layout-4 QA fixes as PR #32 (`33c1eba`), so this pass stands on `main`
with every Lime layout-4 block in its post-QA shape. (`plans/README.md` said layout 3's push, PR
and merge were still open until this plan corrected it.)

## What the pass must deliver

1. **Every layout-4 section works in the published tab under Grunge**: every `s.v3` control
   CLAUDE.md lists under *`s.live` is false everywhere except the published tab* — the media
   player's tile grid and transport, the gallery's spotlight, rail and arrow discs with the 390
   sliding window, the repertoire's A–Z rail (sticky at desktop), the map's ticker arrows and
   zoom, the calendar's enquiry wizard (steps, chips, boxes, Back / Next Step, *Package ›*, the
   summary column, Send Enquiry's mailto and its refusal), the form's boxes and mailto submit,
   the testimonials' paging discs, the header's nav and burger. Each session drives them at
   `theme=2&live=1` and checks that their lit, idle and refused states read on Grunge's colours:
   **red on red is this page's risk again, and on more ground than layout 3's** — the header
   floor, the bio, the gallery and the repertoire are all red bands, and the repertoire's panel
   is a second red on the first.
2. **Every layout-4 section looks as close to its Figma frame as possible**, at 1440 (× 0.82
   onto the 1180 canvas), 768 and 390. There is no composed row on this page.
3. **The setup modal's card 4, "Stacked", lays out a fitted page.** `pickHeader` writes arch 3 to
   every section; `pageOrder(3)` falls to `EXAMPLE_PAGE`'s order, which is this page's (below).
   This pass turns card 4 from its placeholder — `HeaderV3`'s Retro half in Grunge tokens,
   checker floor and all, which layout 3's sweep saw still standing — into Grunge's own page, and
   the last Grunge card into a fitted one. The header session verifies this **in the builder**.
4. **The sidebar's layout-picker thumbnails for layout 4** under Grunge look like their sections.
   Check once, in the end-of-pass sweep.

## What this pass actually is

**Grunge's layout-4 page is Lime's layout-4 page in a third variable mode, the way its layout-1,
-2 and -3 pages were Lime's.** The evidence, read at planning time (2026-09-23) with one
`use_figma` walk per page frame and per section — main component, `explicitVariableModes` on
every node, fills with their bound variables, strokes, effects, radii, image hashes and scale
modes, every vector wider than 300 at any depth, every text node's face and ink — and the depth-6
`type:name` multiset comparison the earlier plans used, Grunge against Lime at each width:

| Section | 1440 | 768 | 390 | What differs |
|---|---|---|---|---|
| header | 0.92 | 0.92 | 0.92 | the mock name (`StaticYouth` / `Static Youth` for Lime's two `Kai Mercer`s) and `+ RECTANGLE:image 1`, a grain rect |
| bio (Section) | 0.89 | 0.89 | 0.86 | `+ RECTANGLE:image 1` (grain on the photograph), **`+ FRAME:Frame 255`** — a dimmer inside the glass panel, new against Lime — and the mock name; at **390** `+ VECTOR:Vector`, a torn seam the bio owns there (*Grounds and seams*) |
| media (band) | 0.90 | 0.86 | 0.95 | Lime's two arcs (`Vector 1` / `Vector 2`) are two torn `Vector`s at 1440 and 768; **at 390 the band has none** (Lime's 390 band has both). The 768 band is `Frame 326` where Lime's is `Frame 325` — a rename |
| gallery (wrapper) | 0.95 | 0.95 | 0.95 | Lime's head arc is a torn `Vector`; `+ RECTANGLE:image 1`, grain in the spotlight |
| repertoire (Section) | 0.97 | 0.97 | 0.97 | Lime's foot arc is a torn `Vector` |
| map | 1.00 | 1.00 | 1.00 | — |
| pricing | 1.00 | 1.00 | 1.00 | — |
| calendar (Book Us) | 1.00 | 1.00 | 1.00 | — |
| form | **—** | 1.00 | 1.00 | **the 1440 page carries no form instance** — see below |
| testimonials | 1.00 | 1.00 | 1.00 | — |
| footer | 0.84 | 0.84 | 0.84 | vs Lime's: the mock name and its `Frame 178` seal. It is **Grunge layout 1's own footer family** (`Property 1=grunge` `446:8699` / `907:12119` / `907:12420`) at layout 1's three sizes (479.5 / 647.4 / 619.4), so it is out of scope, `NVAR.footer` being 1 |

- **The three page frames are Static Youth, Scheme 1** (`964:72943` reads `[Static Youth,
  Scheme 1]`; the 768 frame adds `Device: Tablet` and the 390 frame `Device: Mobile`). The
  sections' own modes are in *Grunge's layout-4 mode*; **three narrow instances carry a Device
  override** — the 768 header's `Device: Tablet` (a no-op on the tablet page) and the media
  player's at 768 and 390, which matter — where layout 3's page had none.
- **The main components are not shared** (`Theme=Grunge` variants: header `624:5012`, pricing
  `719:3473`, testimonials `755:2139`, and so on), as on every earlier page. The test is the tree.
- **The desktop form is missing from the page.** `Frame 262` runs pricing → Book Us →
  testimonials with nothing between, where Lime's `964:72940` stands; a search of the whole
  Layout 4 page finds Grunge form instances at 768 (`971:8151`) and 390 (`977:12378`) only
  (Editorial's page lacks its desktop form too; Pop's has one). The **main component**
  `Theme=Grunge` `725:2990` (1440 × 795, Static Youth, the page's Scheme 1 by default) is the
  desktop master this pass fits — it is the same component the narrow instances are variants of,
  and its render is the 768 master's composition at the Lime 1440 box. Open question 1.
- **Effects are back, and all four are backdrop blurs.** Layout 3's "no effect on any master" does
  not carry: `BACKGROUND_BLUR` on the header's nav capsule (44, all three widths), the bio's glass
  panel (54, all three), the gallery's arrow discs (18.1, 1440 and 768) and the testimonials'
  arrow discs (24, all three) — Lime's four, at Lime's radii. **No `INNER_SHADOW` and no
  `DROP_SHADOW` on any master**: Lime's two media glows are rings here, and Lime's one hard
  offset shadow (the 390 gallery pills) is gone. Three of the four blurs stand behind an opaque
  fill and paint nothing; the bio's stands behind `#2E3928` at **1%** — Lime's olive `box1`,
  leaked — which is Lime's own case. Read each paint's opacity before transcribing a blur.
- **The seams are torn, not arcs.** Every seam on this page is a **1554 × 581 `VECTOR`**, the path
  layout 1's `TornEdge` already draws (`vectorPaths[0].data` begins identically on all of them,
  31 787 characters) — not Lime's 44.24-tall arcs. So `ArcEdge` is not read under Grunge, and
  `TornEdge`'s `grunge` prop is this page's seam. See *Grounds and seams*.
- **No Anton leak to hunt for.** The `the` / `room.` leftovers in every head frame are hidden
  `soulway` text, Retro's and Lime's own leftovers; every visible text node is Stones Crush,
  Chakra Petch or Inter.
- **The narrow shapes are Lime's, which are Retro's**: the tablet Book Us pair stacked, the
  repertoire inset to 310 inside a 370 frame, the 390 media, wizard and calendar called "—
  Tablet". Re-measure every number, since the sizes are not Lime's (*Sizes*).

So, as under layouts 1, 2 and 3: **no Grunge-only section blocks, and no Grunge-only ternary
trees.** The work is `s.grunge` deltas *inside the Lime layout-4 blocks*, each widened from
`if (s.lime)` to `if (s.lime || s.grunge)` with `const grunge = s.grunge` naming the deltas — or,
past a handful, the **`G` lookup at the block's head** whose Lime arm is today's literals so that
theme 1 digests to zero. **Theme 1 is the digest at risk in a widened block, not theme 0.**

**Where each Lime block sits decides how it widens** (Lime layout 4's *Settled* bullets; the
placements are in the sections table). Layout 4 is the first Lime page where **every section has
a block** — the gallery included, which at layouts 2 and 3 was ternaries:

- `if (s.lime) { … return }` **at the head of the component** — `HeaderV3`. Nothing in its Retro
  half reads `s.grunge` today (no placeholder arm to delete, unlike `HeaderV2`'s `mustard`), so
  widening the gate simply makes that half unreachable under Grunge; the theme-0 digest proves
  nothing else moved.
- `if (s.v3 && s.lime)` **ahead of `if (s.v3)`** — the bio, the media player and the enquiry form,
  whose state is hoisted.
- `if (s.lime)` **inside `if (s.v3)`, after the seam** — pricing (after `bleedX`), repertoire
  (after `jump`), **gallery (after `from`)**, calendar (after `onNextTag`, the wizard's whole
  seam), map (after `zoomScale`), testimonials (after `padBot`). The seam stays shared; widen the
  inner gate.

A section whose `get_metadata` tree differs from Lime's is the exception; record it under
*Conventions* before writing anything of its own. On this page that is only the bio's
`Frame 255` and the seams' ownership at 390, both answered below.

### The page order is the seeded order, and there is no composed row

Lime's section holds unread. `pageOrder(3)` falls to `PAGE_ORDERS[0]`, `EXAMPLE_PAGE`'s order,
and all three Grunge pages stack exactly that (with the video band between media and gallery,
which the project does not carry): header, bio, media, gallery, repertoire, map, pricing,
calendar, form, testimonials, footer. **Expect no change to `PAGE_ORDERS`, `pageRows`, `NVAR`,
`CATS` or `HEADER_COUNT`.** `preview.jsx`'s `&column=` switch is layout 3's and is not read here.

### What `sectionVm` owes this pass: one key, expected

Layout 3's pass widened three `vm.pad` arms, `KICKER_3` and a `navFits` arm. Layout 4 has none of
those to widen:

- **Every template-keyed arm in `sectionVm` is `d === 2`** (the composed row's pad, pricing's
  foot, the form and testimonials' insets, `KICKER_3`). The one layout-4 arm — JP-038's page-ground
  inset for map, pricing, calendar and form (56 / 30 / 10) — is **every theme's** already, and
  Grunge's masters state the same 56 / 30 / 10 (the walk: every wrapped instance at x 56 / 30 /
  10). Each session confirms its own section's insets before relying on that.
- **`vm.navFits` has no layout-4 arm and needs none**: the 768 masters of layouts 1 and 4 draw the
  burger, and the flip is set at `d === 1 || d === 2` only.
- **`vm.navEms`' gap is the one vm key this pass is expected to touch.** At `d === 3` it is Lime's
  `23 / 24` em (`navGapEm` is 0 for Grunge at layouts 2 and 3 alone). The Grunge 1440 capsule's
  links sit at x 576 / 636 / 730 / 788 / 874 / 1000 / 1067 / 1144 with widths 37 / 71 / 35 / 63 /
  103 / 44 / 54 — **every gap exactly 23px at 20px type**, 1.15 em, where Lime's 23 / 24 em was 23px
  at 24px. That is layouts 2 and 3's pattern, a **fixed** gap: expect `navGapEm`'s Grunge exception
  to widen to `d === 3` and `HeaderV3`'s Grunge arm to add the gaps as a fixed box (7 × 23 for the
  seeded eight), layout 2's route. The header session measures before writing.
- **`vm.titleWordEms`** is Lime-only and is layout 3's form's; the layout-4 form's head is one
  line at 130 and does not read it.

A session that finds a Grunge number that differs from Lime's in a vm arm writes the Grunge arm
beside it, the layout-3 pattern; none is expected.

## The Figma source

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Frame 262 | `964:72943` | 1440 × 9652.5 |
| Tablet | Frame 267 | `971:7822` | 768 × 11066.8 |
| Mobile | Frame 272 | `977:12043` | 390 × 9657.1 |

- Desktop: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=964-72943&m=dev>
- Tablet: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=971-7822&m=dev>
- Mobile: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=977-12043&m=dev>
- Desktop form (main component): <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=725-2990&m=dev>

`fileKey` = `uFoUbPaBrDicjyuSBEbtGT`. All three, Lime's three (`964:72848` / `971:5298` /
`977:8866`) and Retro's three (`964:72510` / `964:76437` / `971:12206`) are on the **Layout 4**
page, `964:58574`. `getNodeByIdAsync` on an instance id works without a page switch; a `query`
over the page wants `await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('964:58574'))`
first. The form's main component `725:2990` lives on another page; read it by id.

**Match on node id and width, never on the name** — Lime's liars hold exactly: the `Tags — Frame`
instance is "— Desktop" at all three widths, the gallery wrapper is "Gallery Sections — Component
1 — **Desktop**" at every width, the 768 and 390 footers are "Footer — Component 3 / 4 —
Desktop", and the 390 media player, wizard and calendar are called "— Tablet".

**The same things are wrapped as on Lime's page**, and a wrapper that paints is the fit's:
- **bio** stands in a red `Section` (Scheme 3 `sem/bg` `#DF262C`) beside (1440) or under (768 /
  390) its head frame, which holds "KM BIO", "Reads the room." and the `Tags — Frame` instance.
- **media** stands in a `#171716` band (`Frame 317` / `326` / `327`, Scheme 2) under its "Six
  Worth Your Ears" head.
- **gallery** stands in a red wrapper (Scheme 3) beside (1440) or under its "MEDIA" / "Snaps from
  the night" head.
- **repertoire** stands in a **`#F52E34`** panel (radius 60, padding 60, gap 40 at 1440) under its
  "Repertoire" head, inside a red `Section`: `964:73007` (1328 × 876), `971:8124` (708 × 794),
  `977:12351` (370 × 811). The panel's fill is bound to **`sem/box/2`** where Lime's is
  `sem/box/1` — a moved binding (*Grunge's layout-4 mode*).
- **map** stands in `Frame 319` (Scheme 1, the page) under its head.
- **calendar** stands in `Frame 324` with the "Book Us" head and the wizard: `964:73023` (1328 ×
  819), `971:8139` (708 × 1270), `977:12366` (370 × 1111). Its fill is **`#0E0E0E`
  (`sem/box/3`)** at **radius 15**, where Lime's is `sem/box/2` `#394732` at radius 60 / 60 / 30
  — another moved binding.

## The sections

Page order. Sizes are the frames' own. Each row's three masters are fitted in one session. **Lime
block** is where that section's Lime layout-4 block sits in `EncoreSection.jsx` (grep the Lime
twin's desktop id — each block's fit comment cites it — or the Retro twin's to find the branch);
it is the gate this session widens.

| # | Cat | Desktop node | Size | Tablet node | Size | Mobile node | Size | Lime twin (1440 / 768 / 390) | Retro twin (1440 / 768 / 390) | Lime block | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `header` | `964:72944` | 1440 × 900 | `971:7823` | 768 × 1024 | `977:12044` | 390 × 844 | `964:72849` / `971:5299` / `977:8867` | `964:72511` / `964:77544` / `971:14040` | `if (s.lime) { … return }` at the head of `HeaderV3` | done `0c454fa` |
| 2 | `bio` | `964:72952` *(Section `964:72945`, head `964:72946`)* | 664 × 720 | `971:7831` *(Section `971:7824`, head `971:7825`)* | 708 × 720 | `977:12052` *(Section `977:12045`, head `977:12046`)* | 370 × 536 | `964:72857` / `971:5307` / `977:8875` | `964:72519` / `964:76446` / `971:14479` | `if (s.v3 && s.lime)` ahead of `Bio`'s `if (s.v3)` | done `a8549e8` |
| 3 | `media` | `964:72959` *(band `964:72953`, head `964:72954`)* | 1440 × 671 | `971:7955` *(band `971:9533`, head `971:10395`)* | 768 × 501 | `977:12182` *(band `977:12176`, head `977:12177`)* | 390 × 834 | `964:72864` / `971:5431` / `977:9005` | `964:72526` / `971:15190` / `971:14834` | `if (s.v3 && s.lime)` ahead of `Media`'s `if (s.v3)` | done `3c6eae4` |
| 4 | `gallery` | `964:73004` *(wrapper `964:72969`, head `964:72970`)* | 874 × 646 | `971:8121` *(wrapper `971:8086`, head `971:8087`)* | 768 × 594 | `977:12348` *(wrapper `977:12313`, head `977:12314`)* | 390 × 586.3 | `964:72909` / `971:5597` / `977:9171` | `964:72815` / `964:78491` / `977:8142` | `if (s.lime)` inside `Gallery`'s `if (s.v3)`, after `from` | done `68d23ba` |
| 5 | `repertoire` | `964:73011` *(Section `964:73006`, panel `964:73007`)* | 1208 × **600** | `971:8128` *(Section `971:8123`, panel `971:8124`)* | 608 × 582 | `977:12355` *(Section `977:12350`, panel `977:12351`)* | 310 × 650 | `964:72916` / `971:5604` / `977:9178` | `964:72822` / `964:78509` / `977:8166` | `if (s.lime)` inside `Repertoire`'s `if (s.v3)`, after `jump` | — |
| 6 | `map` | `964:73019` *(Frame 319 `964:73013`, head `964:73014`)* | 1440 × 747 | `971:8136` *(Frame 319 `971:8130`, head `971:8131`)* | 768 × 870 | `977:12363` *(Frame 319 `977:12357`, head `977:12358`)* | 390 × 680 | `964:72924` / `971:5612` / `977:9186` | `964:72830` / `964:78599` / `977:8322` | `if (s.lime)` inside `EventsMap`'s `if (s.v3)`, after `zoomScale` | — |
| 7 | `pricing` | `964:73021` | 1440 × 542 | `971:8137` | 768 × 806 | `977:12364` | 390 × 829 | `964:72926` / `971:5613` / `977:9187` | `964:72831` / `964:78656` / `977:8440` | `if (s.lime)` inside `Pricing`'s `if (s.v3)`, after `bleedX` | — |
| 8 | `calendar` | `964:73034` + wizard `964:73033` *(Section `964:73022`, Frame 324 `964:73023`)* | 478 × 533 + 680 × 533 | `971:8150` + `971:8149` *(Section `971:8138`, Frame 324 `971:8139`)* | 608 × 502 + 608 × 476 | `977:12377` + `977:12376` *(Section `977:12365`, Frame 324 `977:12366`)* | 350 × 496 + 350 × 474 | `964:72939` + `964:72938` / `971:5626` + `971:5625` / `977:9200` + `977:9199` | `964:72844` + `964:72843` / `964:79434` + `964:79037` / `977:8514` + `977:8513` | `if (s.lime)` inside `Calendar`'s `if (s.v3)`, after `onNextTag` | — |
| 9 | `form` | **`725:2990`** *(the main component — no page instance at 1440)* | 1440 × 795 | `971:8151` | 768 × 1024 | `977:12378` | 390 × 964 | `964:72940` / `971:5627` / `977:9201` | `964:72845` / `964:79477` / `977:8663` | `if (s.v3 && s.lime)` ahead of `EnquiryForm`'s `if (s.v3)` | — |
| 10 | `testimonials` | `964:73035` | 1440 × 716 | `971:8152` | 768 × 642.4 | `977:12379` | 390 × 603.4 | `964:72941` / `971:5628` / `977:9202` | `964:72846` / `964:79536` / `977:8764` | `if (s.lime)` inside `Testimonials`' `if (s.v3)`, after `padBot` | — |
| — | `footer` | `964:73036` | 1440 × 479.5 | `971:8153` | 768 × 647.4 | `977:12380` | 390 × 619.4 | `964:72942` | — | — | **out of scope**: Grunge's own layout-1 footer family at layout 1's sizes; `NVAR.footer` is 1 |
| — | `video` | `964:72962` | 1440 × 1186 | `971:7956` | 768 × 654 | `977:12183` | 390 × 380 | — | — | — | **not in the project** (`d734992`); Retro's QA and Lime's pass declined restoring it on layout 4, and this pass does the same |

`EncoreSection.jsx`'s fit comments cite the Retro twin's and the Lime twin's node ids, so grep
for either to find the branch and its block. **Cite branches by id, never by line number**: the
file is ~23 000 lines and every session moves it. **Re-measure from the Grunge frame; never reuse
Lime's block sizes** — the radii alone differ on nearly every card (below).

### Sizes: re-measure, and expect the narrow bands to shrink

| Section | Grunge 1440 / 768 / 390 | Lime 1440 / 768 / 390 |
|---|---|---|
| header | 900 / 1024 / 844 | the same |
| bio instance | 664 × 720 / 708 × 720 / 370 × 536 | the same |
| bio Section | 952 / **1132** / **778** | 952 / 1241 / 822 |
| media instance | 671 / **501** / 834 | 671 / 569 / 836 |
| media band | 1043 / **783** / **1005** | 1043 / 791 / 1094 |
| gallery instance | 874 × 646 / 768 × 594 / 390 × 586.3 | the same |
| gallery wrapper | 746 / 878 / **711.3** | 746 / 878 / 806.3 |
| repertoire instance | 1208 × **600** / 608 × 582 / 310 × 650 | 1208 × 536 / 608 × 582 / 310 × 650 |
| repertoire Section | **1126** / 1044 / **901** | 1062 / 1044 / 948 |
| map instance | 747 / 870 / 680 | the same |
| map `Frame 319` | 983 / 1062 / **811** | 983 / 1063 / 866 |
| pricing | 542 / 806 / 829 | 546 / 809 / 837 |
| wizard | 680 × 533 / 608 × 476 / 350 × 474 | 680 × 536 / 608 × 479 / 350 × 474 |
| calendar | 478 × 533 / 608 × 502 / 350 × 496 | 478 × 536 / 608 × 505 / 350 × 496 |
| Book Us Section | 979 / 1370 / 1211 | 982 / 1376 / 1218 |
| form | 795 *(component)* / 1024 / 964 | 795 / 1024 / 971 |
| testimonials | 716 / 642.4 / **603.4** | 716 / 642.4 / 624.4 |

Three differences want a reason before anything is transcribed:
- **The 390 bands are 44–95 shorter** (bio, media, gallery, repertoire, map). Grunge's mobile
  display ramp is smaller than Lime's (`display-lg` 46 against 54, layout 1's mode table), which
  accounts for some; the rest is the head frames' own padding and where the seams stand (at 390
  the bio owns the media's head tear). Read each wrapper's padding off the node, Lime's rule.
- **The 768 media instance is 68 shorter than Lime's** on an identical tree, and it carries
  `Device: Tablet` on both sides. Read the tile rows' heights before assuming the grid.
- **The desktop repertoire instance is 64 taller** (600 against 536; the Section grows by the
  same 64). The rows are 60 each and the letter rows 24 — read the list's row count and gaps
  off the instance, since the seeded songs, not the frame's rows, set our height.

## Grunge's layout-4 mode

Static Youth's four schemes are in [`layout-1.md`](./layout-1.md), *Grunge's Figma mode*, with
its traps (the leaked Lime inks `#15180F` / `#0D1F03`, `stroke2` `#FF0000`, and Scheme 4 ≡
Scheme 1 byte for byte). All three recur here, and **Scheme 3 — red — is on more of this page than
on any earlier one.** On a Scheme 3 node: `bg` `#DF262C`, `text1` **`#000000`**, `text2` / `text3`
`#FFFFFF`, `box1` `#9E1F17`, `box2` `#F52E34`, `box3` `#82211B`, `stroke1` **`#000000` 15%**,
`stroke2` **`#FFFFFF`**, `active` `#000000` / `#DF262C`.

**Schemes by node**, from `explicitVariableModes` read off every node of every desktop master,
with the node's own fill and binding beside it. **Do not carry Lime's row over**; each session
re-reads its narrow masters (the two width traps below are why).

| Section | Instance | Nested (desktop) | What it paints |
|---|---|---|---|
| header | **Scheme 3** (+ `Device: Tablet` at 768) | nav `Frame 49` **Scheme 1**: `#000000` `sem/bg`, radius 85, blur 44 behind an opaque fill; seal `Frame 247` **Scheme 4** ≡ 1 at 1440 — a **black** disc with `#DF262C` marks — but **no explicit mode at 768**, so it inherits Scheme 3: a **red** disc with black marks; at 390 the seal is **`Frame 248`, 85 × 85**, red `#DF262C`, at 307 · 120, −26.1° | the instance's own fill `#82211B` (`sem/box/3`) under the photograph `221f121f` at **`FILL`** and a linear gradient from `#DF262C` (opaque) at the floor to `#15180F` at 0 — Lime's orientation, lime → red. The kicker, the location and half the name are Scheme 3's `text1`, **black**; the other half white; the location's dot `#F52E34` (`box2`), radius 4; the avatar tile `#9E1F17` (`box1`) in a 1px **white** ring (`stroke2`), radius **12**; the chips the header pair by parity, `#1A1A1A` / white and `#DF262C` / leaked `#0D1F03`, radius 4, Chakra Petch 20 |
| bio | Section **Scheme 3** (`#DF262C`); instance **Scheme 1 at 1440, Scheme 3 at 768 and 390** | `Tags — Frame` **Scheme 1** at every width | Section: "KM BIO" white (Chakra 20), "Reads the room." **black** (Stones 198). The card (radius **15**, a 1px `#000000` inside ring) at 1440: well `#0E0E0E`, glass `#2E3928` at 1% with blur 54 (radius 7.5), then **`Frame 255`, `#000000` at .5** over the whole glass, the text box `#1A1A1A` (radius 2.5). At 768 / 390 the same parts in Scheme 3: well `#82211B`, `Frame 255` **`#DF262C` at .5**, text box `#9E1F17`. The name is two-tone, white / red |
| media | band **Scheme 2** (`#171716`); instance carries **no scheme** (inherits Scheme 2) at 1440, and **`Device: Tablet` at 768 and 390** | head `Section` Scheme 1 | grid `#171716`, radius 8; the sleeve (308 × 406, radius **15**) a 1px **`#FF0000`** ring (`scheme/1/stroke/2`); **tile 0** a 1px **`#DF262C`** ring (`sem/text/1`) — the mark — and the others' rings hidden; tiles radius 15 over a black scrim; the transport disc `#DF262C` with a `#171716` glyph; the bar `#222222` (`box2`) with a white fill and a red knob; titles white Stones 24, subs red Inter 12 |
| gallery | wrapper **Scheme 3** (`#DF262C`); instance fills `#DF262C` too | the two arrow discs **Scheme 4** ≡ 1: `#0E0E0E` (`box3`) in a 0.8 `#000000` ring, blur 18.1, radius 10, arrow **`#FF0000`** (`stroke2`); at 390 two 180 × 55.5 pills, **no shadow** | head "Snaps from the night" **black** (Stones 130), "MEDIA" white Inter Bold 15; the spotlight (551 × 494, radius **15**) `#82211B` under `a746e7e4` at `FILL`, unrotated, four black corner brackets; six thumbs `#9E1F17` (`sem/tag/1/bg`) in a 1px black ring, the fourth **3px**, radius 10 |
| repertoire | Section **Scheme 3**; panel `#F52E34` bound **`sem/box/2`** (Lime `sem/box/1` `#CCFA61`); instance **Scheme 3** | — | head black; "All songs · A–Z" white; row rules Scheme 3's `stroke1`, **black 15%**, mixed weights (read); the rail's cells a 1px black ring, radius 4, black Inter 12 letters; the lit cell **black with a red letter** |
| map | `Frame 319` Scheme 1 (page); instance Static Youth, fills `#000000` | `Map Viewport` **Scheme 3** | the card `#1A1A1A` (`box1`) in a `stroke1` ring, radius **15**; the viewport's rings, labels and pin bound to Scheme 3's **`sem/bg` → `#DF262C`** (dash 4-4 at .3, 1.5 at .5, 2 at .8 — Lime's weights), the pin a red disc in a 2px white ring, the dots white at .6, the zoom squares **`#F52E34`** (Scheme 3 `box2`) in a black 15% ring, radius 8, white glyphs; the four stat cards `#1A1A1A` in 1px **`#FF0000`**, radius 15, numerals **red** Stones 50 (Lime's were pale), labels white; the ticker `#1A1A1A` in `#FF0000`, radius 15 |
| pricing | Static Youth alone, on the page | — | root `#000000`; the row rules **`#FF0000`** (`sem/stroke/2`, mixed weights — read); every text **red** (`sem/text/1`) — names Stones 50, blurbs Inter 14, the kind / from / price; the hairline chips a 1px **`#F2FFD0` at 15%, unbound** (Lime's literal, leaked — reads as white 15% on black), red Inter Bold 12; the feature chips the header pair by parity; the pill **white** (`sem/text/2`) with a black label and a black disc round a **red** arrow |
| calendar | Section on the page; `Frame 324` **`#0E0E0E` (`sem/box/3`), radius 15** | the wizard **Scheme 1** with a **Scheme 3** Back pill (black, red label, red disc); the Send Enquiry pill **Scheme 2** (`#DF262C`, `#171716` label and disc) | wizard card `#1A1A1A` in `stroke1`, radius 15; the current step disc in `#FF0000`, its label red, the others white in `stroke1`; the step rules `#383838` (`box2`); the title white Stones 36; the date box `#383838` in `stroke1`, pill; Next Step red with black. The summary card **`#FFFFFF` (`sem/text/2`) in a 1px `#FF0000` ring**, radius 15, its 48px avatar `#383838` under `dc450d0a`; the date and package rows **`#1A1A1A` in `stroke1`**, white type |
| form | Static Youth alone (the component's defaults) | the submit **Scheme 1**: white `sem/text/2`, a black label, a black disc round a **white** arrow | head red Stones 130 over a `#FF0000` rule (`stroke2`, mixed weights — the foot); "ENQUIRE" **white** Stones 36; labels white Stones 24; boxes `#000000` in a 1px **`#FF0000`** ring, radius **214** (a pill), the message box radius 24, placeholders red Inter 14; the step squares `#DF262C`, radius 8, black numerals; the step rules `stroke1`; the arrows `↘` red |
| testimonials | **Scheme 4** ≡ Scheme 1 — **the page, not a sheet** | the two discs Scheme 4: **`#DF262C`** (`text1`) in a 1px black ring, blur 24, black arrows, radius 41.5; the second cell **Scheme 1** | head red Stones 130, two lines; four cells radius **30**: `#1A1A1A` in `stroke1`, **`#0E0E0E`** (`box3`) in `stroke1`, `#1A1A1A` in `stroke1`, **`#DF262C`**, unstroked; the marks red discs (56, `stroke1` ring) lettered **black Stones 24**, inverted on the red cell (a black disc lettered red); quote and byline white, black on the red cell |
| footer | Scheme 1 (layout 1's) | — | out of scope |

Seven traps in that table, each a place where Lime's block reads a key that lands on the wrong
value under Grunge:

- **The testimonials' sheet collapses onto the page — the biggest trap on this page.** Lime's
  block paints a full-bleed Scheme 4 `s.tx` sheet with `s.bg` ink; under Grunge `s.tx` is
  **white**, so the widened block would paint a white band where the frame draws the black page.
  Layout 3's map had exactly this trap (its Scheme 4 sheet); the answer is the same — no sheet,
  and every ink the Lime block flips to `s.bg` goes back to the page's. The register is
  **dark / darker / dark / red**, where Lime's is mist / `box3` / mist / ink: write a Grunge
  `REG`, never remap Lime's. **The marks are a stated glyph** (Stones 24), so here `faced`
  applies — the reverse of layout 3's testimonials exception, where the frame put photographs
  in the seat. Name that.
- **Three bindings moved** (layout 3's `boundVariables` rule, section 8): the repertoire's panel
  (`sem/box/1` → `sem/box/2`, so Lime's `lime3` literal is not one hex under Grunge but
  `#F52E34`, the layout-3 map panel's red), Book Us' `Frame 324` (`sem/box/2` → `sem/box/3`,
  radius 60 → 15), and **the map's stat numerals** (`sem/text/2` pale under Lime, its section 6's
  read → `sem/text/1` **red** here; a Lime block writing `s.tx` there paints them white).
  `explicitVariableModes` reports none of them; read `boundVariables`. And the map's full-strength
  rings — the four stat cards and the ticker — are `sem/stroke/2` `#FF0000` where Lime's block
  writes `s.ac`: read the key, not Lime's.
- **The bio card and the seal change scheme between widths, and not at Lime's breakpoints.** The
  bio instance is Scheme 1 / 3 / 3 (Lime's 1 / 2 / 2), so its wells, dimmer and text box go red at
  768 and 390. The header seal is Scheme 4 / (inherited) 3 / 3 — black, red, red — where Lime's is
  4 / 4 / 3. A `get_variable_defs` token right at 1440 is wrong at 768 on both.
- **The media player's 768 and 390 instances carry `Device: Tablet`** — Lime's 390 trap, plus 768.
  Every `size/*` in them is the 768 ramp's; `get_variable_defs` says so.
- **Scheme 3's `text1` is black, so heads on red are black and heads on the page are red.** The
  bio's and the gallery's display heads, the repertoire's head and letters, the header's kicker,
  location and half its name are **black**; "Six Worth Your Ears", "Distances we'll Travel",
  "Book Us", the form's head and "Client success stories" are **red**. Lime's lime bands put
  `s.bg` ink on `s.ac`; under Grunge `s.bg` *is* black and `s.ac` *is* `#DF262C`, so the
  **band grounds and their ink may resolve without a `G` arm at all** — read the bindings first
  (layout 3's section 9 rule: a lookup over keys that already resolve is a Lime arm restating
  itself).
- **The leaked inks are followed where they show**: the header's tag2 `#0D1F03`, the pricing's
  feature-chip `#0D1F03`, the calendar's Next Step `#000000`-on-red. And the **leaked Lime
  literals** are named where a session meets them: `#2E3928` at 1% (the bio's glass — invisible),
  `#F2FFD0` at 15% (the pricing's hairline chips — reads as `stroke1`, so write it as `s.stroke1`
  and name the leak), and the `#15180F` end of the header gradient (at alpha 0 — invisible).
- **The red-on-red Genres row**: the `Tags — Frame` instance is Scheme 1 on the bio's red band, so
  its "Genres" label (`sem/text/1`) and its tag2 chips are `#DF262C` on `#DF262C`. Lime's bio
  block already draws no Genres label and lets the light chips' box vanish (Lime layout 4,
  *Settled in section 2*) — this is that case exactly, so expect the widened block to need nothing
  but the chips' ink. Check it on the render, not the table.

### Grounds and seams

Read off the band frames' `fills` with their bindings and sampled off the three renders. **The
sequence is identical at 1440, 768 and 390; only the seams' ownership moves at 390.** Where Lime's
layout 4 is a dark page with three lime bands, an olive one and a pale one, **Grunge's is a black
page with four red grounds and one dark band, and its seams are torn**:

| # | Section | Ground | Seams it owns (head · foot) | What stands on it |
|---|---|---|---|---|
| 1 | header | photograph over `#82211B`, fading to **`#DF262C`** at the floor | — (a straight edge into the red bio band) | the black glass nav, the avatar tile, the identity panel, the seal |
| 2 | bio | **red `#DF262C`** (Scheme 3) | none at 1440 / 768 · **at 390 a foot tear in `#1A1A1A`** (`977:16058`) | "KM BIO", the black head, the Genres chips; the card at radius 15 |
| 3 | media | **`#171716`** (Scheme 2) | head **`#DF262C`** (the bio's red) · foot **`#000000`** — at 1440 and 768; **none at 390** | "Six Worth Your Ears" in red, the sleeve, the six tiles |
| — | *video* | page | none | *not in the project* |
| 4 | gallery | **red** (Scheme 3) | head **`#000000`** · none | the black head, the spotlight with its brackets, the rail, the dark discs |
| 5 | repertoire | **red** (Scheme 3), one band with the gallery | none · foot **`#000000`** | the `#F52E34` panel at radius 60, its rows and the A–Z rail |
| 6 | map | page | none (the 1440 `Vector 2`, 1437.8 × 44.24 on **Scheme 5**, is Lime's no-op leftover again — not drawn) | the `#1A1A1A` card, the viewport with red rings, four stat cards in `#FF0000`, the ticker |
| 7 | pricing | page | none | rows divided by `#FF0000` rules, red type, the white pill |
| 8 | calendar | page; `Frame 324` `#0E0E0E`, radius 15 | none | "Book Us" in red; the wizard card; the white summary card over `#1A1A1A` rows; the red Send Enquiry pill |
| 9 | form | page | none | the red head over its rule, black pill boxes in `#FF0000`, the white submit, red step squares |
| 10 | testimonials | **page** (Scheme 4 ≡ 1 — no sheet) | none | the four cells above, two red discs |
| — | footer | layout 1's | — | — |

**The seams are layout 1's torn vector.** Every one is 1554 × 581 (the 768 repertoire's **882**
wide, the 390 repertoire's 1541.3 — leaked widths, as Lime's arcs leaked) and almost wholly outside
its band, so measure the visible tear, not the node (layout 1, *Settled in section 3*: the
black-run per column off the render). Node arithmetic, for the sessions to confirm:

| Seam | 1440 | 768 | 390 |
|---|---|---|---|
| media head, `#DF262C` | ≈ 70 | ≈ 62 | — |
| media foot, `#000000` | ≈ 83 | ≈ 52 | — |
| bio foot, `#1A1A1A` | — | — | ≈ 40 |
| gallery head, `#000000` | ≈ 68 | ≈ 66 | ≈ 36 |
| repertoire foot, `#000000` | ≈ 53 | ≈ 44 | ≈ 43 |

- **`TornEdge` with `grunge`, and `bleed={false}` inside a bled sheet.** Layout 1's callers stand on
  a band the root paints; a layout-4 band is a sheet painted in the branch that has already
  cancelled the root's padding — Lime's open question 2, answered for `ArcEdge` with an additive
  `bleed` prop that `TornEdge` already had (Retro layout 4's gallery precedent). **`ArcEdge` is
  not read under Grunge.** `TornEdge`'s one path is the head contour drawn at both ends (layout 1:
  "not worth a second path"); depth is its `height`.
- **The media foot's binding lies.** Its paint is `#000000` and the render is black, but the
  paint is bound to `sem/tag/2/bg`, which Scheme 2 resolves to `#DF262C`. Trust the render;
  the seam is the page below, layout 1's neighbour's-ground rule.
- **At 390 the media band has no seams and the bio owns the tear between them**, in `#1A1A1A`
  against the band's `#171716` (3 in 255). Open question 3; the default is to follow each master
  — the media's head at 1440 and 768, the bio's foot at 390 — in the **band's** `#171716`
  (layout 1's rule: a seam is the neighbour's ground), and name the 3-in-255.
- **The lens where the video was is not a lens here.** The media's foot and the gallery's head
  are both black and meet directly on our page — black on black between `#171716` and red, so it
  reads as one dark tear roughly the two depths deep, not Lime's visible 44 + 44 lens. Lime's
  answer (each seam keeps its frame's colour, the meeting is named) holds; the gallery session
  checks the meeting in the editor at all three widths.

**No root flag widens**, Lime's rule again: `bleed`, `darkMap`, `cream`, `limeBand`, `limeLight`,
`grungeBand` and `grungeRule` all gate on `s.v0`. Every layout-4 ground is painted **in the
branch**, as Lime's are.

## Grunge's layout-4 decorative language

Everything here is behind `s.grunge` (or a named pair), and replaces what the Lime block gates on
`s.lime` and the Retro branch on `s.retro`.

- **No checkerboard, no tilt, no drop shadow, no hard offset shadow, no arcs, and no band grain.**
  Every `Checkerboard` and `tilt()` in the ten `s.v3` branches and `HeaderV3` is Retro's and stays
  gated off; every `ArcEdge` is Lime's. The torn seams above are the page's one band decoration.
- **Rings, not glows — the third time, and here there is no glow to replace but two.** Lime's two
  `INNER_SHADOW`s (the media sleeve and tile 0, both `s.ac` at 34) are **1px inside strokes in two
  different reds**: the sleeve `#FF0000` (`stroke2`), tile 0 `#DF262C` (`text1`). Every other ring
  is read off `strokes`:
  - **`#FF0000`, `sem/stroke/2`** (Scheme 1's): the media sleeve; the map's four stat cards and
    its ticker; the pricing row rules; the calendar's summary card and the wizard's current step
    disc; the form's head rule and every box.
  - **`#FFFFFF`, Scheme 3's `stroke/2`**: the header's avatar tile.
  - **`#000000` 15%, Scheme 3's `stroke/1`**: the repertoire's row rules; the map's zoom squares.
  - **`#000000` solid**: the bio card (1440 and 768 — read whether 390 paints one, Lime's
    question), the gallery thumbs (1px, the fourth 3px), the repertoire's rail cells, the gallery
    and testimonials discs.
  - **`stroke1`** (white 15%) on the rest: the map card, the wizard card and its date box, the
    calendar's rows, the form's step rules, the testimonials' three dark cells and every mark.
  - Draw each as an inset `boxShadow` (Lime's rule, so every stated height holds), on an overlay
    where an image or a child would paint over it.
- **Four backdrop blurs**, Lime's four at Lime's radii (above). Draw one only where its paint is
  translucent — the bio's glass alone — and read the opacity first.
- **Grain inside three photographs**, the `b74be8bc` raster (`vm.grainSrc`), each under `Grain`'s
  opt-in `grunge` with `exact`:
  - **header**: `image 1`, a 1440 square at (0, −270) at 1440 and **390 × 850** at 390 — narrow is
    not a square (layout 3's header lesson) — `LIGHTEN` at **.3**, its second paint hidden.
  - **bio**: `image 1`, 640 × 720.5 at (12, −0.5) inside the card, **`CROP`** under a black
    gradient, `LIGHTEN` at **.5**, ~~at 1440 and 768~~ at all three widths (`FILL` at 390; section 2).
  - **gallery**: `image 1`, a 550.5 square over the 551 × 494 spotlight, `LIGHTEN` at **.3**, its
    second paint hidden.
  - The walker prints a hidden paint as its own `hid` entry, so each of the three shows one
    visible image paint. Confirm each is drawn with a stddev scan of the render before writing it,
    and scan a band too: nothing else carries grain.
- **The seal is layout 1's red disc family in three schemes.** `Frame 247` at 1440 and 768
  (125.37, Figma −26.06°, the §10.2 seal's tree: `Group 9`, `Frame 179`, two name `TEXT_PATH`s,
  two 14 × 14 frames) and `Frame 248` at 390 (85 × 85). Black with red marks at 1440 (Scheme 4 ≡
  1), red with black marks at 768 and 390 (Scheme 3). `SealBadge`'s `scheme` prop (Lime layout 4,
  *Settled in section 1*) is the route; read whether it resolves through the theme's `sem` or
  names Lime's inks before passing it, and add a Grunge arm, additive, if it names Lime's.
- **Radii are read, not inherited**: the nav capsule 85 (999 in effect), the avatar tile 12 (Lime
  26.95), the bio card 15 (Lime 55) and its text box 2.5, the media grid 8 and every sleeve and
  tile 15 (Lime 50), the gallery spotlight 15 and thumbs and discs 10, the repertoire panel 60 (as
  Lime's), the map card, stat cards and ticker 15, the Book Us panel 15 (Lime 60 / 60 / 30), the
  wizard and summary cards 15, the form's boxes 214 and message 24, the step squares 8, the
  testimonials' cells 30 and discs 41.5.
- **Type**: every display and label string is `faced` / `facedLh` and uppercase at its own site
  (layout 1, session 0). Read off the frames: the heads Stones 130 / 81 / 46 (the header's name 198
  / 95 / 52; the bio's head 198 at 1440, 95 at 768, 52 at 390 — Display/XL); the nav links Stones
  20 (`label-md` — confirm with `get_variable_defs` on a link node, layout 3's warning); the pill
  labels Stones 24; the map's numerals and the pricing's names and prices Stones 50; the wizard's
  title and the calendar's rows Stones 36; the form's labels Stones 24 and its "ENQUIRE" 36.
  Chips are Chakra Petch 20; eyebrows Inter Bold 12 / 15.
- **The mock name is two-tone** — "StaticYouth" white then black in the header (Scheme 3), white
  then red in the bio's glass (Scheme 1). Layout 3's rule holds: `Title`'s `twoTone` at the first
  space, and a block-local `brand()` elsewhere; read each segment's ink off the node.

## Photography

**Expect no `photos.js` change and no new asset.** Image hashes, read off all three pages:

| Section | Slot (frame box) | Hash | Seeded today | Verdict |
|---|---|---|---|---|
| header | the instance's own fill, 1440 × 900 / 768 × 1024 / 390 × 844 | `221f121f` at **`FILL`** | `grungeHero` | ✓ — and **not mirrored**: Lime's desktop fill is `CROP` with a flipping transform (Lime open question 6), Grunge's is `FILL`, which ignores any transform. The Lime block's `scaleX(-1)` on the desktop `Photo` takes a `!grunge` guard |
| header | avatar tile 112.6 × 118.7 / … / 116 × 119 | `3ef9ee55` over **`e3790c2c`** | `grungeHeaderAvatar` | ✓ — Lime's colour avatar is under the singer again, painted over: layout 2's leak, covered |
| bio | the card, 664 × 720 / 708 × 720 / 370 × 536 | `8031d0f3` at **`FILL`** over **`000ea835`** | `grungeStage` (the drummer, 820 × 1024) | ✓ expected — a portrait file into a portrait box at `FILL` is a centred cover, so **no `layouts[3]` seed** (Lime needed one because its default is a slice of another source). The bio session confirms by render diff, layout 3's method. `000ea835` is **an image no earlier walk has named**, covered — worth telling the designer (open question 4) |
| media | six tiles 289.3 × 269.5 and the sleeve | `8c7fa7d8` `4e7cc529` `40041573` (`CROP`) `b737c3e0` `21e9622c` + `0a8372b9` | `ROW_ART.media` (five) | ✓ — Lime's reading: the sixth is the frame's filler, one tile per track |
| gallery | spotlight 551 × 494 / 497 × 494 / 330 × 297 | `a746e7e4` | `GRUNGE_PHOTOS.gallery` slot 3 (`grungeGallery4`) | ✓ — `galActive()`'s slot, the frame's own spotlight |
| gallery | six thumbnails 121 × 67.7 | `b35b6507` `35ae28b9` `b073b46f` `3f0c98b4` `8f69a4a6` `b35b6507` | the seven Grunge slots | **layout 1's departure again**: the frame's strip is Retro's shared placeholder set; the seven Grunge slots stand |
| map | `Map Texture` 664 × 555 / 708 × 320 / 370 × 251 | `e089bd11` | `vm.mapRadialSrc` | ✓ |
| calendar | the summary card's 48 × 48 disc | `dc450d0a` | `grungeCalendar` (`image`) | Retro's and Lime's reading: the fit draws `image` there |
| testimonials | — | — | — | no photographs: the marks are `vm.quotes[].mark` discs |

**The greyscale is in the assets** (layout 1, session 0), so nothing here desaturates.

## What already renders, and the traps in it

A code survey at the start of this pass (`grep -n "s.grunge\|const grunge" EncoreSection.jsx`
against the `if (s.v3` lines and the ten Lime layout-4 blocks):

- **No `s.v3` branch reads `s.grunge`, and neither does any Lime layout-4 block or `HeaderV3`.**
  Every `grunge` hit between the v3 branches is a comment or a layout-1 / -2 block. So goal 1 is
  met before any session runs (every control is shared `v3` code, as in layouts 1–3), and each
  session still runs `theme=2&live=1` for layout 1's reason: a live **state** can stop reading on
  a red ground.
- **Every `s.v3` branch renders Retro's arm flat under Grunge, and on this page that is worse than
  flat.** Under Grunge `s.paper` is `s.tx` (white) and `s.pillBg` is the accent, so Retro's cream
  sheets come out **white** (the media band's sheet, the map's cards, the calendar's rows) and its
  mustard grounds **red** (the testimonials' whole `ground`, the map's ticker, the form's rule and
  submit); the three olive bands (`s.mapBg`) come out a near-black where the frame paints red.
  Card 4 today is Retro's page in the wrong places; the Lime blocks, widened, are what take it
  black and red. The "before" pictures (step 2) record it.
- **`HeaderV3` renders Retro's half in Grunge tokens** — checker floor, grain and Retro's scrim —
  since its `if (s.lime)` block is not widened. That half has **no** `s.grunge ?` placeholder arm
  (unlike `HeaderV2`'s `mustard`, which layout 3 deleted), so widening the gate is the whole of
  the Retro-half change.
- **The calendar's summary card reverses a named cost.** CLAUDE.md's calendar paragraph says "on
  Grunge `tx` and `paper` are one value, so the card and the date and package rows share a fill",
  and the calendar block's comment (grep "now Grunge's alone") says the same; Grunge's own frame
  restores the three-level stack — `#1A1A1A` rows under the white `s.tx` card on a `#0E0E0E`
  panel — exactly as Lime's did. The widened block inherits Lime's stack; the sweep rewrites both
  sentences.
- **The form's head copy.** JP-054 seeds layout 4's head as `FORM_HEADING_4`, "Contact Us"
  (Retro's and Lime's frames agree, so no theme gate). **Grunge's masters print "KAI MERCER"** —
  the component's default text, unoverridden, at 768 and 390 (and on the component). Open question
  2; the default is to keep the shared seed and name the diff, since a head that is the artist's
  name on one template alone would be the first theme-gated copy default.
- **`SEEDS.Grunge` has no `layouts` row, and should not need one** (*Photography*).
- **`FIELDS` rows keyed by template** carry `Grunge` beside `Lime` for the header's keys (`kicker`
  / `tags` / `showTags` `[0, 2, 3]`, `location` all four, `showBadge` / `badgeText` `[0, 3]`) —
  measured over the **placeholder** card 4. The header session re-measures them with
  `scripts/reach.mjs 2` over the fitted card; expect `showBadge` to stay (the frame draws the
  seal) and read whether the chips and kicker still reach.
- **`HeaderV3` renders under Retro, Lime and Grunge only** (`headerFamily`), so the header needs
  the theme-0 and theme-1 digests and not the flat two's. Every other section needs all four.
- **Under Grunge header arch 3 has no fold partner** (`HEADER_COUNT.grunge` is 4), so a header
  change is **three** theme-2 files. `pricing` and `testimonials` offer an eighth picker row that
  folds onto layout 4, but `digest.mjs` caps every body category at 4 (Lime layout 4's bullet), so
  no `_arch_7_` file is rendered.
- **Block-local Lime literals** — the repertoire's `lime3`, the testimonials' `mist`, the media's
  olive seats, the calendar's pills — are Lime's; the widened blocks give each a `G` arm and never
  edit them.

## Head allocation — unchanged but one

Lime's *Head allocation* holds: every Grunge frame carries the same strings ("KM BIO" / "Reads the
room.", "Six Worth Your Ears", "MEDIA" / "Snaps from the night", "Repertoire", "Distances we'll
Travel", "Book Us", "Client success stories"), the `HEADING_4` map resolves the fallbacks, and
the pricing pill still reads "Star Enquiry" (ours "Start Enquiry", `PRICING_ROW_CTA`). **The one
difference is the form's head** (above, open question 2). Its "ENQUIRE" line and "Check
Availability" pill match `FORM_SUB_4` and `FORM_BTN_4`.

## The header

Lime's header section holds: `if (s.lime) { … return }` at the head of `HeaderV3` is the block,
widened to `(s.lime || s.grunge)`, with the deltas inside it. What changes:

- **The photograph** is `221f121f` at `FILL` over `#82211B`, **unmirrored** (above), fading to
  `#DF262C` at the floor — Lime's gradient orientation, its lime stop red. Grain over it (above).
- **The nav** is Lime's `Frame 49` capsule, reused whole: `#000000` (Scheme 1 `sem/bg`), radius 85,
  1328 × 74 at 56 · 28 (708 × 74, 370 × 58.4 narrow), the globe and "Static Youth" in white at
  Stones 24, the links white Stones 20, the Book Now pill `#DF262C` with a black label and a black
  disc round a red arrow. The render draws the links + pill at 1440 and the pill + burger narrow.
- **The avatar tile** (112.6 × 118.7 at 56 · 437 at 1440; 116 × 119 at 20 · 431 at 390) —
  `#9E1F17` under the singer, a 1px white ring, radius 12.
- **The identity panel** (`panel`, 1328 × 254 at 56 · 596): the kicker "DJ · LIVE ACT" **black**
  Stones 36, the name at Display/XL 198 two-tone white / black, the location black Stones 24 with a
  `#F52E34` dot, the chips at the right at 1440 (two rows of three) and under the location narrow.
- **The seal**: black / red / red by width (*decorative language*), at 1288.5 · 147 at 1440, over
  the identity block at 768 (625 · 692), top right under the nav at 390 (307 · 120, 85px).
- **No checker floor**: the header's foot is a straight edge into the red bio band.
- **`showBadge` reaches layout 4** (the seal is drawn), so the toggle is real, as under Lime.

## Per-session procedure

[`../lime/layout-4.md`](../lime/layout-4.md)'s *Per-session procedure*, steps 1–9, with:

- step 2 (section 1 only): `git switch -c grunge-layout-4 main` and commit this plan and the
  `plans/README.md` rows there; then the "before" pictures at `theme=2&arch=3` for all eleven
  categories at desktop (`node scripts/shots.mjs before 2 3`) into the scratchpad.
- step 3: `get_metadata` on the three Grunge nodes **and the Lime twin's** desktop node. Lime's
  warning about Retro wrappers that parent a checkerboard stands (~200k tokens for four numbers):
  query the Retro instance, never its band.
- step 4: run layout 2's **node walker** once per master (or the paired diff against the Lime
  twin) before writing anything, and **read `boundVariables`** on every node whose colour looks
  wrong — on this page two bindings moved without a scheme moving.
- step 5: implement inside the section's existing **Lime layout-4 block**, widened to
  `(s.lime || s.grunge)` at the placement the sections table names, with `const grunge = s.grunge`
  or the `G` lookup; read the block's *Settled* bullet in Lime's plan, and its QA entry if it has
  one, first. Never edit a Lime or Retro literal to make Grunge look right. Desktop numbers ×
  0.82, 768 and 390 verbatim; every display string `faced` / `facedLh` / uppercase at its site.
- step 6: the harness is `preview.html?cat=<cat>&arch=3&theme=2&w=desktop|tablet|mobile`
  (`preview.jsx` defaults `arch` to 1, so pass it); function at `theme=2&live=1`, plus `&n=` /
  `&booked=` / `&open=` / `&today=` / `&email=` / `&tiers=` where the section reads them; **zero
  rows at themes 0, 1, 3 and 4** before and after, every session (`node scripts/digest.mjs before
  0,1,3,4` / `after`, then `cmp`), because these edits sit inside blocks Lime renders and branches
  Retro renders; then the same at theme 2, where the differing files must all be `_arch_3_` and
  this section's category. A theme-2 diff in any `arch_0`, `arch_1` or `arch_2` file is a
  regression of a merged pass. Expect the rotating seal's `<text>` / `<textPath>` rows to differ
  between two walks of one build (Retro layout 4's sweep note): diff line by line before reading a
  mismatch as a regression.
- step 9's hand-off prompt:

  ```
  Continue the Grunge layout-4 pass with section N, `cat`.

  Read CLAUDE.md, then plans/grunge/layout-4.md, then plans/CONVENTIONS.md, then the Conventions
  of plans/grunge/layout-1.md, plans/grunge/layout-2.md and plans/grunge/layout-3.md and their
  Settled notes for this section, then the Conventions and this section's Settled notes of
  plans/lime/layout-4.md (and its entry in plans/lime/layout-4-qa-fixes.md, if any), then the
  Conventions and the 2026-09-15 Addendum of plans/retro/layout-4.md, then the
  `figma-frame-reading`, `verifying-the-published-tab` and `browser-tool-choice` memory notes,
  and follow the per-session procedure.

  The three Grunge masters are `<desktop node>` (<W> × <H>), `<tablet node>` (768 × <H>) and
  `<mobile node>` (390 × <H>) in Figma file uFoUbPaBrDicjyuSBEbtGT, page 964:58574; the Lime
  twin is `<lime nodes>` and the Retro twin `<retro nodes>`. Widen the Lime block
  `<placement>` of `<Component>` in EncoreSection.jsx to `(s.lime || s.grunge)` and fit the
  Grunge deltas inside it. Themes 0, 1, 3 and 4 must digest to zero rows, and theme 2 may differ
  only in `<cat>` arch 3.

  <the two or three conventions most likely to bite this section>

  Branch: grunge-layout-4. Do not refresh the root index.html.
  ```

  **After section 10 there is no next section** — the footer is out of scope — so that handoff
  opens *The end-of-pass sweep* instead, with the same reading list and the sweep's items in
  place of a node table.

Do **not** refresh the root `index.html` per section. It is the sweep's last step, with the
two-build digest (`scripts/build-digest.mjs`, `CARD=3` for card 4). The seeded `EXAMPLE_PAGE` is
arch 0 throughout, so the page walk shows no difference at any theme; the proof that this pass
shipped is card 4 in both builds' setup modals.

### The first session: the header

`HeaderV3` is where deliverable 3 is met, so its verification is the builder's, not only the
harness's. With `scripts/page-check.mjs Grunge 3,0,1,2` (the first card listed gets the full walk)
or a puppeteer script off it:
- the setup modal still shows **four** Grunge cards, card 4 renders the fitted header with no
  checker and no `repeating-conic-gradient`, and cards 1–3 are unchanged (the theme-2 `arch_0`,
  `arch_1` and `arch_2` digests say so);
- choosing card 4 opens the editor on a page whose every section is arch 3, in the seeded order,
  with no composed row and the footer at arch 0;
- publish, then in the popup: every nav link scrolls, the burger opens at 390 and at 820 (a fresh
  tab each), Book Now reaches `#form`;
- the Retro header at theme 0 and the Lime header at theme 1 digest to zero rows;
- `scripts/reach.mjs 2` re-measures the header's `Grunge` rows over the fitted card, and
  `FIELDS.header`'s `in` is corrected where the placeholder measurement differs.

Four things the header settles for the pass:
- **The seal's three schemes** — whether `SealBadge`'s `scheme` prop carries Grunge's inks or
  needs an additive arm; the answer is every later seal's.
- **The mirror** — the Lime block's desktop `scaleX(-1)` stays Lime's (`!grunge`), since
  Grunge's fill is `FILL`.
- **`navGapEm` at `d === 3`** — the capsule's gaps are a fixed 23 at 20px type, so a fixed box
  beside `vm.navEms`, not the em rule (above); measure, then write it.
- **The two-tone name at Display/XL** — `Title`'s `twoTone` with Scheme 3's pair (white, black),
  and the same key for the bio's glass (white, red).

### The second session: the bio

- **The instance's scheme moves at 768**: Scheme 1's `#0E0E0E` / `#000000` .5 / `#1A1A1A` at
  1440, Scheme 3's `#82211B` / `#DF262C` .5 / `#9E1F17` narrow. Lime's block already switches its
  wells between widths (Lime layout 4, *Settled in section 2*, "the wells move with it"); the Grunge
  arm switches on the same condition.
- **`Frame 255` is new**: a full-glass dimmer at .5 over the blur, under the text. Draw it as one
  layer, in the width's own colour.
- **The photograph**: a cover of `grungeStage` against the render, before concluding that no seed
  is owed.
- **At 390 the bio owns a torn foot** (open question 3). This session draws it, or names why not,
  and the media session sees the other side of it.

### The third session: the media player

The first band with seams: `TornEdge grunge bleed={false}` at the head (red) and foot (black) at
1440 and 768, none at 390 — read the depths off the render. Two rings in two reds where Lime drew
one glow hue; the 768 instance's `Device: Tablet`; the 68 missing tablet pixels (*Sizes*).

### The tenth session: the testimonials

The sheet is **not drawn** (the Scheme 4 trap), the register is written fresh, the discs are red
with black arrows, and the marks are `faced` Stones 24. The published arrows page on the same `cur`
at `live=1` — check the lit and idle discs read on black, since Lime's read on pale.

## The end-of-pass sweep

Written now from what the plan can see; the sections add to it. One session, in this order:

1. **CLAUDE.md and README.md**, wherever they describe Grunge as designed at layouts 1, 2 and 3, or
   a layout-4 state as Retro's and Lime's alone. The known sites: CLAUDE.md's "**Grunge is designed
   at layouts 1, 2 and 3**" paragraph and its "at layout 4 every other section still renders its
   shared branch flat" clause; its header-family line ("card 4 renders `HeaderV3` in its tokens
   (Retro's checker floor and all) … its own layout pass's to fit"); the file table's line counts;
   every layout-4 paragraph that names a Lime-only state — the media player's tile mark ("Under
   Lime the mark … is the frame's inset **glow**"), the gallery's layout-4 ring ("Lime's wide
   masters *do* mark it"), the map's ticker ("an olive `s.box1` capsule … under Lime"), pricing's
   layout-4 rule ("under Lime the rule is `s.ac` read directly"), the form's layout-4 rule and
   pill ("1px of `s.stroke1` under Lime", "pale `s.tx` under Lime"), the testimonials' layout-4
   sheet ("under Lime the sheet is Scheme 4's pale `s.tx`") — owes a Grunge clause where the
   session found the same or another state; **the calendar's "on Grunge `tx` and `paper` are one
   value, so the card and the date and package rows share a fill"**, which this pass reverses,
   with the block comment that says it is "now Grunge's alone"; README's "Grunge is designed at
   layouts 1, 2 and 3"; `data.js`'s `headerFamily` comment; `photos.js`'s header; `sectionVm`'s
   `grunge` flag comment ("at layouts 2 and 3 rings where Lime glows"). Grep both files and the
   four source files for "layout 4", "Grunge", "card 4" and "flat".
2. **One whole-page published check under Grunge at layout 4** — `scripts/page-check.mjs Grunge
   3,0,1,2` plus the layout-4 controls Lime's sweep listed (header nav and burger at 390 and 820,
   the media tiles and transport with audio, the gallery's discs, rail and 390 window, the
   repertoire's rail jump and its sticky at 1440 in the popup, the map's ticker and zoom, the
   wizard's three steps, *Package ›*, a refused and a valid Send Enquiry, the form's refused and
   valid submits, the testimonials' discs, the footer's links). Then 180px seam clips at 1440 and
   390: the header's red floor into the red bio, the red tear into the `#171716` band, the black
   tear pair where the video was, the gallery and repertoire's one red band, the repertoire's
   black foot, and the testimonials standing on the page with no sheet.
3. **The layout-picker thumbnails** for arch 3 under Grunge (deliverable 4).
4. **The other three header cards** still render and publish.
5. **`scripts/reach.mjs 2`** over the whole template: every `Grunge` row in `FIELDS` measured over
   fitted layouts 1–4 — **the first measurement with no placeholder card**.
6. **`plans/README.md`**: mark the pass closed — **and the Grunge family with it**; **`CONVENTIONS.md`**:
   fold in whatever *Inherited and used* below confirmed again, add **D4** (Lime's layout-4 blocks,
   the table layout 3's sweep wrote as D3), and add any bullet this pass leaned on three times that
   the file does not name (candidates: *a seam's binding can lie — trust the render*; *a
   ring can change colour where a glow had one hue*).
7. **Refresh the root `index.html`** with the two-build digest, `CARD=3`: zero rows at every theme
   on the seeded page outside the rotating seal; the shipped-it tell is card 4 in the two builds'
   setup modals (the old build's draws the checker floor; the new one's the red floor under a black
   capsule).

## Conventions

Append as the pass goes. Do not repeat layouts 1's, 2's and 3's, Lime's or Retro's bullets; name
them.

- **Layouts 1's, 2's and 3's conventions all hold**: the gates are `s.grunge`, the named pairs and
  `s.designed`; never edit a Lime or Retro literal; `faced` / `facedLh` and uppercase per site; the
  `G` lookup whose Lime arm is today's literals; the node walker and the paired diff; read
  `boundVariables` before writing a `G`; theme 1 is the digest at risk.
- **Harness:** `theme=2`, `arch=3`; `&column=` is not read.
- **Layout 4 is a black page with four red grounds and one dark band, and its seams are torn.**
  The header's floor, the bio, the gallery and the repertoire stand on `#DF262C` (Scheme 3) with
  black heads; the media on `#171716` (Scheme 2); everything else on the page, **the testimonials
  included** (Scheme 4 ≡ 1). Media owns a red head tear and a black foot tear at 1440 and 768, the
  bio a `#1A1A1A` foot tear at 390, the gallery a black head, the repertoire a black foot. All are
  `TornEdge`'s path; `ArcEdge` is Lime's.
- **Read every nested node's scheme off the Grunge master, and its binding too.** On this page the
  scheme traps are **width** traps — the bio (1 / 3 / 3) and the seal (4 / 3 / 3) — and the
  binding traps are the repertoire panel and the Book Us panel.
- **Scheme 3 is four literals here**: `#DF262C` (`bg`: the bands, the 390 seal), `#9E1F17`
  (`box1`: the avatar tile, the narrow bio text box, the gallery thumbs' ground), `#F52E34` (`box2`:
  the repertoire panel, the location dot, the map's zoom squares), `#82211B` (`box3`: the header
  and gallery wells, the narrow bio well). Its `text1` is black and its `stroke2` white.
- **Effects are back, and every one is a backdrop blur.** Four per page, three behind opaque fills;
  no inner or drop shadow on any master.

### Settled in section 1 (the header)

- **No Grunge block: Lime's `if (s.lime) { … return }` at the head of `HeaderV3` is
  `(s.lime || s.grunge)`**, `const grunge = s.grunge` naming about a dozen deltas (no `G`). The
  paired diff against the Lime twin at all three widths was the whole read: the tree matches node
  for node plus the grain rect. Nothing in Retro's half read `s.grunge`, so it simply became
  unreachable under Grunge. `lime3` / `lift` take Grunge arms (`#9E1F17` / `#F52E34`, Scheme 3's
  `box1` / `box2`).
- **The seal: `SealBadge` needed an additive Grunge arm.** Under Grunge it always drew the red
  disc whatever `scheme` said, so `scheme === 4` now gives `[s.bg, s.ac]`, a black disc with red
  marks and name. That is Scheme 4 ≡ Scheme 1's `sem/bg` / `sem/text/1`, and HeaderV3's Lime
  block is the only caller that passes 4. HeaderV3 passes 4 at 1440 and 3 narrow, because the
  768 `Frame 247` states no scheme and inherits the header's Scheme 3. **Position and size are
  not re-measured**: the diff found `Frame 247` / `Frame 248`'s boxes identical to Lime's at all
  three widths, so Lime's pixel-scanned placements stand.
- **The mirror is Lime's alone** (`desk && !grunge`): Grunge's fill is `FILL`, which ignores the
  transform.
- **`navGapEm` is 0 under Grunge at `d >= 1`, and NavBar takes the gaps as a fixed box.** The
  links are bound to `size/label-md` (read off `boundVariables`), and `Frame 50` spaces them, and
  the pill, a fixed 23. So NavBar has a new additive `links={{ gap, cap }}`: the gap is `u(23)`,
  and the type is `clamp(12px, (100cqi − gap × (n − 1)) / navEms, s.labelMd)`. The seeded nine
  sit at the cap, 12px rendered (16 × 0.75), on one row. Two more additive props:
  - `mark={{ glyph, gap }}` on NavBar and `gap` on Wordmark: the narrow masters keep the 36
    globe 13.15 from the name, where the hero's shrink it to 27.37 / 10.
  - `nameSize` now reaches the Wordmark at every width when `mark` is passed, since the name is
    `size/label-lg` 24 / 16 / 14.
  The pill is BookPill's Grunge default exactly (red, black label, black disc round a red arrow).
  The 390 pill keeps Lime's × 0.712 recipe, since the boxes match to the hundredth.
- **The name is two-tone and `inline` at every width**: `Title twoTone toneA={s.tx}
  toneB={s.bg}`. The 1440 master sets "StaticYouth" on one 149-tall line, with no hand-break.
  The kicker and the location are direct `s.display` sites (`faced` / `facedLh`), inked `s.bg`
  (Scheme 3's `text1`). The location is uppercased.
- **The avatar's ring is an overlay**: 1px inside, white (Scheme 3 `stroke/2`), radius 12, drawn
  as an inset `boxShadow` over the photograph. Initials are `s.tx` on the red well.
- **The chips are `vm.tagChips`' own seats** (`#1A1A1A` lettered white, `#DF262C` lettered
  `#0D1F03`), not Lime's inlined pale pair. Radius, padding and Label/XS are Lime's, read through
  `s.radiusChip` and `s.labelXs`.
- **The grain is the frame's last child, so it lies over everything**: nav, type, seal. It is
  lighten .29 (not the plan's .3; its gradient paint is hidden, so there is no mask). It is a 1440
  square hung 270 above the top at 1440 (`u()`, `aspect-ratio: 1`), and 768 × 1030 / 390 × 850
  from 6 above narrow, all through one four-value `inset`.
- **Measured against the masters** (× 0.82 at desktop):

  | Width | Avatar | Kicker | h1 (y × height) | Location | Chips | Capsule | Pill |
  |---|---|---|---|---|---|---|---|
  | 1440 | 359.4 (358.6) | 489.5 (488.7) | 536.8 × 121.5 (536.3 × 122.2) | 673 (673.2) | at 852 / 633.8 | 1088.2 × 60.6 | 125 × 44.3 (128.7 × 44.3) |
  | 768 | 586.5 (586) | 745.5 (745) | 794.3 × 71.3 (794 × 71) | 883.6 (883) | 936.4 (936) | 708 × 74 | — |
  | 390 | 431.6 (431) | 590.6 (590) | 637.2 × 39 (exact) | 694.2 (694) | 745.8 (746) | 370 × 58.4 | — |

  At 1440 the links come out 27.8–80.7 wide against the frame's 28.7–84.5 × 0.82.
- **Named diffs**:
  - Anton is narrower than Stones Crush, so the links and the pill run a few px short.
  - Ours has a ninth link, Availability.
  - Five chips where the frame draws six (`TAG_LABELS`).
  - The frame letters its second and third red chips white (`scheme/4/tag1/text`,
    `sem/tag/6/text`), a component override the seats do not model, where ours letter all three
    `#0D1F03`. This is layout 3's header reading again.
  - The mock name's missing space.
- **Digest**: themes 0, 1, 3 and 4 zero files, canvas and `live=1`. Theme 2 moved exactly
  `header_arch_3` at three widths on both surfaces.
- **Verified in the builder** (`page-check.mjs Grunge 3,0,1,2`, plus one one-off script,
  deleted):
  - The modal offers four Grunge cards with no `conic` gradient on any, and card 4's disc is
    black.
  - After *Use this header* the page list reads ten rows at "layout 4" and the footer at
    "layout 1". Published, the page stacks in the seeded order with no composed row.
  - All nine nav links and Book Now scroll (Book Now to `#form`). The 390 burger goes 1 → 11
    links, and the 820 burger 1 → 11 in a fresh tab, where a panel link scrolls `#pricing` and
    overflow is 0.
  - No errors on any of the four cards.
- **`FIELDS.header` needed no change**: `reach.mjs 2` over the fitted card folds to the stored
  rows. Kicker / tags / showTags are `[0, 2, 3]`, location all four, showBadge / badgeText
  `[0, 3]`, cta2 `[1, 2]`, subtitle / heroCta `[1]`, align `[0]`.

### Settled in section 2 (the bio)

- **No Grunge block: Lime's `if (s.v3 && s.lime)` ahead of `Bio`'s `if (s.v3)` is
  `(s.lime || s.grunge)`**, with `const grunge = s.grunge` naming the deltas, plus a block-local
  `brand()`, `upper` and `glass`. The paired diff against the Lime twin's Sections at all three
  widths was the whole read. The tree is Lime's node for node plus three nodes: `image 1` (the
  grain), `Frame 255` (the dimmer) and, at 390, the torn `Vector`. There is no Device override and
  no `T` table. The head is Display/XL 198 / 95 / 52 (`s.dispXl`), `faced` / `facedLh(0.75)` and
  uppercase. The name is Display/SM 50 / 40 / 30.
- **The scheme moves at 768, and one binding moved.** The well (`sem/box/3`) is `s.box3`
  `#0E0E0E` at 1440 and `#82211B` narrow. The prose box `Frame 228` is bound to **`sem/box/1`**
  (resolved by name off `boundVariables`), where Lime's is `sem/box/2`. So it is `s.box1`
  `#1A1A1A` at 1440 and `#9E1F17` narrow. "KM BIO" is white (`s.tx`), where Lime inks it
  `s.bg`. The band and the head need nothing: `s.ac` / `s.bg` already resolve to red / black.
- **`Frame 255` is the panel's own fill.** It is `sem/bg` at node opacity .5, the glass's full box
  at radius 0 inside the glass's 7.5 clip, and first among the glass's children, so it sits under
  the text. The glass's own paint is Lime's `#2E3928` at 1%, a leak that draws nothing, so the
  one layer is `${desk ? s.bg : s.ac}80`: black at 1440 and Scheme 3's red narrow. The blur 54
  stays.
- **The name's second half moves by width**: `sem/text/1` is red on Scheme 1 at 1440 and black on
  Scheme 3 at 768 and 390. So `brand()` colours it `desk ? s.ac : s.bg`. The prompt's "white /
  red" holds at 1440 only.
- **The grain is at all three widths**, not "1440 and 768" as the plan's *decorative language*
  said. It is a 640-wide sheet centred on the card (x 12 / 34 / −135), card-tall, `LIGHTEN` at .5.
  It is `CROP` at the wide widths and `FILL` at 390. Its second paint is a `#0B0B0B` → 0 linear
  gradient off the foot to 16.3%, with the same transform at every width, so it is layout 1's
  mask. Drawn as `<Grain exact grunge blend="lighten" opacity={0.5}>` after the photo wrapper,
  `left: 50%` / `translateX(-50%)` / `width: u(640)`. Sampled at 1440 over the photo's top
  (mean / stddev): frame **49.7 / 40.0**, ours **47.0 / 38.0**, correlation 0.911. The foot strip
  is 14.9 against 14.6.
- **The photograph: no `layouts[3]` seed.** `8031d0f3` at `FILL` over a covered `000ea835`. A
  centred cover of `grunge-stage.jpg` into 664 × 720 correlates **0.958** with the render over the
  card's top 380. Cover at 0 / 25 / 75% gives 0.23 / 0.34 / 0.35. `photos.js` did not move.
- **Open question 3 closes: the bio draws the 390 tear.** It is `<TornEdge s grunge side="bottom"
  bleed={false} height={40} colour="#171716">` inside the sheet, which takes `position: relative`
  under Grunge. The 390 Section pads its foot **60** where Lime's pads 30 (room for the tear), and
  stacks head and card **10** apart where Lime's are 15. Both are Grunge arms.
  - The node's fill is `#1A1A1A`. It is drawn in the media band's `#171716`, layout 1's
    neighbour's-ground rule, 3 in 255 off the frame (named).
  - 40 is the node arithmetic (vector top 738 of 778). The frame's visible tear is a slice of the
    vector's middle: 6–32 deep, mean 18.9, per column off the render. `TORN_D`'s own contour cannot
    reproduce that slice at any height, so ours peaks at the left where the frame peaks
    mid-width (named).
  - Until section 3 lands, the tear stands over Retro's flat media sheet on the page. The media
    session checks the join.
- **Measured** (canvas, content edges):
  - Desktop h2: 364.5 tall on three lines (447 × 0.82 = 366.5). Card 544.1 × 590.4 at radius
    12.3. Panel radius 6.1, prose box 2.1.
  - 768: h2 71.3 (71). Card 708 × 720, panel 648 × 305.5 (305).
  - 390: h2 39 (39). The tear 390 × 40 at the sheet's foot.
- **Named diffs, all Lime's**:
  - No Genres label; five chips on one row, so the 768 and 390 heads are shorter and the card
    stands higher. The red chips are lettered `#0D1F03`, where the frame letters them white.
  - The seeded two paragraphs make the panel content-tall: 282.8 / 305.5 / 383.
  - The 390 photo stage is 400 tall (Lime's user call), so the sheet is 942 against the frame's
    778.
- **`live=1`**: only Listen changes (span → `<a href="#media">`) at three widths. `&noimage=1`
  (looked at, 390): the red well under the grain, the 400 stage band a shade lighter (`Photo`'s
  placeholder), `KM` in white. `page-check.mjs Grunge 3`: four cards,
  no errors or warnings, About → `#bio` and Listen → `#media` scroll, the 390 burger 1 → 11.
- **Digest**: themes 0, 1, 3 and 4 zero files, canvas and `live=1`. Theme 2 moved exactly
  `bio_arch_3` at three widths on both surfaces.

### Settled in section 3 (the media player)

- **No Grunge block: Lime's `if (s.v3 && s.lime)` ahead of `Media`'s `if (s.v3)` is
  `(s.lime || s.grunge)`**, with a six-key `G` at its head (`band`, `track`, `radius`, `pad`,
  `body`, `chip`) whose Lime arm is today's literals, `const grunge = s.grunge` naming the seams
  and the insets, and a `disp` spread (uppercase). The paired diff against the Lime twin's bands
  at all three widths was the whole read: the tree is Lime's node for node (59 nodes at 1440 and
  768; at 390 Lime's two arcs are simply absent). The hooks are hoisted, so the published player
  needed nothing new.
- **Scheme 2 moves three values and nothing else.** The band, the tiles' well and the play glyph
  are `sem/bg` `#171716`, where Lime's block reads `s.box1` (`#1A1A1A` here). The bar's track is
  bound to **`sem/box/2`** `#222222` where Lime's is `sem/box/1`: a moved binding, and `s.box2` is
  `#383838` here. Every other ink resolves through Lime's keys (`s.ac` is `#DF262C`, `s.tx` white).
  The plan's "the instance carries no scheme" at 1440 was wrong: it carries Scheme 2 (`187:4`)
  explicitly. The values are the same either way.
- **Two rings in two reds, no glow**: the sleeve is 1px inside `s.stroke2` (`#FF0000`,
  `scheme/1/stroke/2`), and tile `at` is 1px inside `s.ac` (`#DF262C`, `sem/text/1`). Both stay
  inset shadows on Lime's overlays, so no photograph is inset. Radius 15 (Lime 50), tile padding
  20 (Lime 30). The tiles' `#D4D4D4` strokes are hidden, as under Lime.
- **Type**: the body sizes are Grunge's own, 12 / 12 at 1440 and 12 / 11 narrow (Lime 13 / 13 and
  13 / 12). The 768 and 390 instances carry `Device: Tablet`, so the titles are the 768 ramp's 28 /
  19, as under Lime. The head (`s.dispLg`), the now-playing title and the tile titles are
  `faced` / `facedLh` and uppercase. The seeded head holds one line at every width.
- **The narrow boxes move, and that is the 68.** The 768 band pads 100 / 100 with a 10 gap, and
  the instance pads 0 at its foot (Lime: 100 / 50, gap 0, instance 56). So the sheet's foot is
  100 and head-to-player is 66. The tiles are **136 × 135** (three rows are the left column's 445;
  Lime 139). The 768 head frame pads **30** where the instance pads 56, so the h2 takes a −26 left
  margin at `tab && grunge`; the frame puts the head 26 left of the player, and ours follows. The
  390 band pads 60 / 60 (Lime 100 / 100), so it is 60 over the head and 70 under the player. The
  1440 boxes are Lime's.
- **The seams are `TornEdge grunge bleed={false}`**: a head in `s.ac` (the bio's red) and a foot in
  `s.bg`, at 1440 and 768 only (`!s.mob`). Their depths are **70 / 83 × 0.82 at 1440 and 62 / 52
  at 768**, the black-run maximum per column off the renders (70 / 83 and 61 / 52), which match the
  node arithmetic. The foot's paint is bound to `sem/tag/2/bg`, which is red, but it fills black
  and renders black. `s.bg` is the page, so no literal. `ArcEdge` stays Lime's arm of a ternary.
- **The 390 join is clean**: the bio's `#171716` tear stands on the `#171716` band with no
  hairline (`page-check.mjs`'s `seam_390_media`), and at 1440 the red bio band runs straight into
  the red head tear.
- **Measured** (content edges): desktop sheet 854.8 (1043 × 0.82 = 855.3), h2 at 127.9, 95.2 tall
  at 80.25px, tiles 237 × 220.8 from 269, seams 57.4 / 68. 768 sheet 783.1 (783), h2 at 30 · 100,
  tiles 136 × 135 from 238.1 (238), seams 62 / 52. 390 sheet 1005.5 (1005), h2 at 60 and 40.9
  tall (41), sleeve 370 × 302 at 120.9, tiles from 545.5 (546).
- **Named diffs**: a 2px shorter sleeve at 1440 (406 falls out of the now-playing block's 61),
  Anton at 0.75 against Stones Crush, five tiles against the frame's six (Lime's reading).
- **`live=1`** at desktop (puppeteer, autoplay allowed): the ring starts on tile 1, a click on
  tile 3 moves it there and plays `SoundHelix-Song-3`. No page errors. `page-check.mjs Grunge 3`:
  no errors or warnings, the published player plays and moves, every link scrolls, the 390 burger
  goes 1 → 11 links, overflow 0.
- **Digest**: themes 0, 1, 3 and 4 zero files, canvas and `live=1`. Theme 2 moved exactly
  `media_arch_3` at three widths on both surfaces.

### Settled in section 4 (the gallery)

- **No Grunge block: Lime's `if (s.lime)` inside `Gallery`'s `if (s.v3)`, after `from`, is
  `(s.lime || s.grunge)`**, with a nine-key `G` at its head (`well3`, `well1`, `mist`, `ring`,
  `arrow`, `eyebrow`, `photoR`, `pillR`, `initials`) whose Lime arm is today's literals, and
  `const grunge = s.grunge` naming the seam, the 390 head pad and the dropped pill shadow. The
  paired diff of the three wrappers against Lime's (`964:72969` / `971:8086` / `977:12313` against
  `964:72874` / `971:5562` / `977:9136`) was the whole read. The tree is Lime's node for node
  plus `image 1`, and Lime's `Vector 1` arc is a torn `Vector`. **Every box is Lime's but one**:
  the 390 wrapper pads **60** over the head where Lime's pads 100, so the sheet is 711.3 against
  806.3. The seam is shared whole, so the published thumbs, discs and 390 window needed nothing
  new.
- **Scheme 3, and the band and the head resolve through Lime's keys**: the wrapper and instance
  fill `#DF262C` (`s.ac`), and the head is `sem/text/1`, black (`s.bg`). What moves:
  - the MEDIA eyebrow is `sem/text/2`, **white** (`s.tx`) where Lime's is `s.bg`;
  - the head is Stones Crush 130 / 81 / 46 at .89, so `faced` / `facedLh` / uppercase: 80.25 /
    60.75 / 34.5px, three lines at 1440 and one narrow, as the frame sets it;
  - the spotlight's well is Scheme 3 `box/3` **`#82211B`** (Lime `#9CCF23`), radius **15 / 4 /
    4** (Lime 50 / 50 / 4 — the 768 node says 4, not the prompt's 15);
  - the thumbs' well is `sem/tag/1/bg` **`#9E1F17`** (Lime `s.bg`), and their ring is black,
    which is Lime's own `s.bg`, so the 1 / 3 / 4 mechanism did not move;
  - the brackets are black, also Lime's `s.bg`.
- **The discs and pills**: `#0E0E0E` (`s.box3`, Scheme 4 ≡ 1) in a 0.754 black inside ring
  (Lime `s.tx`). The arrow is **`#FF0000`** (`s.stroke2`) on the wide discs and **`#DF262C`**
  (`s.ac`) on the 390 pills: two nodes, two bindings, followed. The 390 pills are radius **5**
  (Lime 60) and carry **no effect at all**, so Lime's 5 / 5 hard shadow drops under Grunge.
  The wide discs' blur 18.1 stands behind an opaque fill, dropped as under Lime.
- **Grain inside the spotlight**: `image 1`, a 550.5 square at (0.5, 0) off the photograph's
  top-left at every width, clipped by it, node `LIGHTEN` at .29, its gradient paint hidden. It
  is drawn as `<Grain exact grunge blend="lighten" opacity={0.29}>` inside the photo wrapper,
  `inset: 0 auto auto u(0.5)`, `u(550.5)` square (451.4 at desktop). It unscaled-overflows the
  390 photo and the clip crops it, as the frame's does. Scanned at 1440 inside the spotlight
  (mean / stddev): frame **37.1 / 35.7**, ours **38.6 / 40.3**, and **30.5 / 43.6** with the
  layer hidden, so the lift is the grain's. Nothing else in the section carries grain.
- **The head seam is `TornEdge grunge bleed={false}` in `s.bg`**, `ArcEdge` staying Lime's arm of
  a ternary. The vector is 1554 × 581 at y −513.18 / −514.67 / −544.67, so the heights are the
  node arithmetic **67.8 × 0.82 / 66.3 / 36.3** (the media's convention). Black-run maxima per
  column: frame 67 (55 at canvas scale) / 65 / 33, ours 53 / 63 / 34. `TORN_D` peaks at .955 of
  its height, and the 390 frame shows a slice of the vector's middle (the bio's 390 case), so
  the contours differ where the depths agree (named). Its paint is bound to `sem/bg`
  (`290:131` at 1440, `290:128` narrow), black on both.
- **The meeting with the media, checked in the editor at all three widths** (one puppeteer
  script, deleted: Grunge → card 4 → *Use this header* → the device tabs). The media root's
  bottom is the gallery root's top to the pixel at 1180 / 768 / 390. The two seams keep their
  frames' colours, and the frame's black is followed rather than Lime's user call (the olive
  arc), because under Grunge the media still draws its own black foot tear:
  - at **1440 and 768** the media's black foot tear and the gallery's black head tear read as
    **one dark torn band**, roughly the two depths deep, between `#171716` and red. That is the
    frame's picture with its video band taken out (named);
  - at **390** the media has no foot tear, so its `#171716` band meets the gallery's black tear
    on a **straight edge**, 23 in 255 (named). Painting the gallery's head in `#171716` instead
    would leave a black-then-`#171716` double contour at the wide widths.
- **Measured** (content edges):
  - desktop: eyebrow 12px at 181.5, h2 285.7 tall at 226.5 (348 × 0.82 = 285.4), spotlight
    451.2 × 405.1 at 526.4 · 144.3 (642 · 176 × 0.82), sheet 611.7 (746 × 0.82);
  - 768: eyebrow at 130, h2 72.1 at 181.6, spotlight 497 × 494 at 50 · 333.7 (50 · 334), sheet
    877.7 (878);
  - 390: eyebrow at 60 (60), h2 40.9 at 84.3 (41 at 84), spotlight 330 × 297 at 30 · 169.2
    (30 · 169), strip at 536.2 (536), sheet 711.4 (711.3).
  `scrollWidth` holds.
- **Named diffs, all Lime's**: the thumbs and spotlight top-anchored (the seeded strip is
  portrait, the frame's crops landscape), seven thumbs against the frame's six, and the seeded
  strip against the frame's Retro placeholders (layout 1's call).
- **`live=1`**, desktop and 390: the ring follows `active` (`1113111` → `1311111` on a click of
  slot 1), ↓ / ↑ step, back from slot 0 wraps to 6 with the ring on it, and the 390 window
  slides. No page errors. **Red on red, open question 5**: the 3px active ring is black, inside
  the tile over its photograph, so it never stands on the red ground alone; it reads.
  `page-check.mjs Grunge 3`: no errors or warnings, every link scrolls (Media → `#gallery`),
  the 390 burger 1 → 11, overflow 0. `n=0`, desktop and 390: the `#82211B` well under the
  grain with white `KM` (`G.initials` is `s.tx`, where Lime inks it `s.bg` on its pale well), and
  `#9E1F17` thumbs in black rings with white `KM`.
- **Digest**: themes 0, 1, 3 and 4 zero files, canvas and `live=1`. Theme 2 moved exactly
  `gallery_arch_3` at three widths on both surfaces.

### Inherited and used

*(One line each time a session leans on a bullet from `CONVENTIONS.md`, layouts 1's, 2's or 3's
Conventions, or Lime's, with the plan it came from — the running list for the sweep's item 6.)*

- Header: *the paired diff walk* (grunge/layout-2); *read `boundVariables`* (grunge/layout-3, the
  links' `size/label-md`); *read a fill's `scaleMode` before its `imageTransform`* (grunge/layout-2,
  the unmirrored photo); *a frame's inside stroke is an inset `boxShadow` on an overlay*
  (lime/layout-2, the avatar); *`vm.title` shadows the ramp's `title` size* (lime/layout-1, the
  kicker literal); *`faced` / `facedLh` and uppercase per site* (grunge/layout-1); *Scheme 4 ≡
  Scheme 1* (grunge/layout-1, the seal).
- Bio: *the paired diff walk* (grunge/layout-2); *read `boundVariables`* (grunge/layout-3, the
  prose box's `sem/box/1`); *read a fill's `scaleMode` before its `imageTransform`; correlate the
  render* (grunge/layout-2, the cover); *a seam is the neighbour's ground* (grunge/layout-1, the
  390 tear); *`faced` / `facedLh` and uppercase per site* (grunge/layout-1); *the layout-1 bio's
  grain mask* (grunge/layout-1, section 2).
- Media: *the paired diff walk* (grunge/layout-2); *read `boundVariables`* (grunge/layout-3, the
  track's `sem/box/2`); *the `G` lookup whose Lime arm is today's literals* (grunge/layout-1);
  *a section on another scheme writes that scheme's values as named literals* (grunge/layout-1,
  Scheme 2's `#171716` / `#222222`); *a frame's inside stroke is an inset `boxShadow` on an
  overlay* (lime/layout-2, the two rings); *the black-run depth method* (grunge/layout-1, section
  3); *a seam is the neighbour's ground; trust the render over the binding* (grunge/layout-1, the
  foot tear); *`faced` / `facedLh` and uppercase per site* (grunge/layout-1).
- Gallery: *the paired diff walk* (grunge/layout-2); *the `G` lookup whose Lime arm is today's
  literals* (grunge/layout-1); *a section on another scheme writes that scheme's values as named
  literals* (grunge/layout-1, Scheme 3's `#82211B` / `#9E1F17`); *the black-run depth method*
  (grunge/layout-1, section 3); *grain inside a photograph, its gradient paint hidden*
  (grunge/layout-2, section 5); *`faced` / `facedLh` and uppercase per site* (grunge/layout-1);
  *the lens, checked in the editor* (lime/layout-4, section 4).

## Open questions

1. **The desktop form master is missing from the page.** The 1440 page frame has no form instance
   (nor does Editorial's), so the fit reads the main component `725:2990` at its own defaults —
   the same component, the same mode, at Lime's 1440 box. Worth telling the designer; if they
   place an instance later, the form session's numbers are re-read against it.
2. **The form's head: "KAI MERCER" or "Contact Us".** Every Grunge form master prints the
   component's default "KAI MERCER" where Retro's and Lime's instances print "Contact Us", which
   JP-054 (user call, 2026-09-23) seeded as `FORM_HEADING_4` for every theme. Default: keep the
   shared seed, name the diff, and tell the designer the instances were not overridden. The
   alternative — `vm.brand` as the Grunge layout-4 head — would be the first theme-gated copy
   default, and is the user's call, not a session's.
3. **Who owns the tear between the bio and the media band at 390.** The 1440 and 768 masters give
   it to the media (a red head); the 390 master gives it to the bio (a `#1A1A1A` foot) and draws
   none on the media. Default: follow each master and colour the 390 foot in the band's
   `#171716`, naming the 3-in-255; the alternative is one owner at every width. The bio session
   decides and the media session checks the join. **Closed in section 2**: the default holds. The bio draws
   the 390 foot tear in `#171716` at 40.
4. **Two covered pictures to tell the designer**: `000ea835`, an image no earlier walk has named,
   under the bio's photograph, and Lime's `e3790c2c` under the header's avatar tile — both painted
   over, both invisible, with layout 3's `fa453f7d` and layout 2's two.
5. **Red on red, live.** The likely states: the repertoire rail's lit cell (black) and hover on the
   `#F52E34` panel, the gallery's 3px black thumb ring on the red wrapper, the map's lit ticker and
   zoom squares on `#F52E34`, and a refused wizard box on the `#1A1A1A` card. Each session samples
   its own at `theme=2&live=1`.
