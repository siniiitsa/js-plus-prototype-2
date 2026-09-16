# Lime layout 4 — section-by-section plan

This is the working checklist for bringing **layout 4** of the Lime template up to its Figma
designs. It runs one section per session, all three widths together, clearing context between
sections. Layouts 1 (`s.v0`), 2 (`s.v1`) and 3 (`s.v2`) under `s.lime` are fitted and merged;
nothing here should move any of them. **This pass closes the Lime family**: `HEADER_COUNT.lime`
is 4, the setup modal offers four Lime cards, and after this pass all four are fitted pages.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then:
- the whole *Conventions* of [`layout-1.md`](./layout-1.md) — the foundation (`s.lime`, the Lime
  ramp, the `sem` keys, `BookPill` / `Pager` / `SealBadge`'s Lime branches, `ArcEdge`, the digest)
- the whole *Conventions* of [`layout-2.md`](./layout-2.md) — the block-placement rule, the
  glow-hue rule, "read fills before believing a token", and the per-section *Settled* notes
- the whole *Conventions* of [`layout-3.md`](./layout-3.md) — the Lime `HeaderV2` seat, the
  `tierRow`-not-read rule, `vm.titleWordEms`, the Lime register for a multi-seat wall, and the
  two-build digest as it was last run
- the *Conventions* **and the 2026-09-15 Addendum** of
  [`../retro/layout-4.md`](../retro/layout-4.md), which built every `s.v3` branch this pass
  dresses. The Addendum is load-bearing: the Genres row drawn *inside* the bio, the enquiry
  wizard drawn *inside* the calendar's Book Us panel, the map's live zoom and its `span` field,
  the pricing rows' capitals and `rowCta`, and the four `HEADING_4` fallbacks are what the
  branches actually are now; the *Learned on …* notes above it describe an earlier state in
  places. Its *Open questions* 1 and 5 are reversed there.
- the *Per-session procedure* of [`../retro/layout-4.md`](../retro/layout-4.md)

Then read the three memory notes `figma-frame-reading`, `verifying-the-published-tab` and
`browser-tool-choice`. `SPEC.md` lives in git history: `git show 8fa8ff4:SPEC.md`.

Branch: **`lime-layout-4`, forked from `main`.** `lime-layout-3` merged as PR #15 (`c61b2c2`),
so this pass stands on `main` directly, as layout 3 did.

## What the pass must deliver

1. **Every layout-4 section works in the published tab under Lime**: every `s.v3` control
   CLAUDE.md lists under *`s.live` is false everywhere except the published tab* — the media
   player's tile grid and transport, the gallery's spotlight, rail and arrow discs with the 390
   sliding window, the repertoire's A–Z rail (the one control that scrolls from inside the
   file, sticky at desktop), the map's ticker arrows and its zoom, the calendar's slot rows and
   the **enquiry wizard** (steps, chips, boxes, Back / Next Step, Send Enquiry), the form's
   boxes and mailto submit, the testimonials' paging arrow discs, the header's nav and burger.
   Each session drives them at `theme=1&live=1` and checks that their lit, idle and refused
   states read on Lime's colours (layout 1's rule: a working control can stop reading in a new
   palette — and three of this page's bands are *lime*, which no earlier Lime page stood on).
2. **Every layout-4 section looks as close to its Figma frame as possible**, at 1440 (× 0.82
   onto the 1180 canvas), 768 and 390. There is no composed row on this page (below).
3. **The setup modal's card 4, "Stacked", lays out a fitted page.** `pickHeader` writes arch 3
   to every section; `pageOrder(3)` has no row of its own and falls to `EXAMPLE_PAGE`'s order,
   which is this page's (below). This pass is what turns card 4 from Retro's layout 4 in Lime
   tokens — the layout-3 sweep saw it still drawing the checker ribbon — into Lime's own page,
   and the last Lime card into a fitted one. The header session verifies this **in the
   builder**.
4. **The sidebar's layout-picker thumbnails for layout 4** under Lime look like their sections.
   Check once, in the end-of-pass sweep.

## What this pass actually is

**Lime's layout-4 page is Retro's layout-4 page re-skinned, the way layouts 1, 2 and 3 were** —
with the header a different composition again, layout 2's and 3's header case. The evidence,
read in the planning session with one `use_figma` walk per page (three parallel calls, Lime
against Retro at each width):

- The Lime instances are `964:72849`…`964:72942`, Retro's `964:72511`…`964:72847`: the same
  compositions in the same order, node ids offset by **+338** at 1440. Both narrow pages carry
  the same wrappers (`Frame 317`/`325`/`327` for the media band, `Frame 318` for the video,
  `Gallery Sections — Component 1` for the gallery, `Frame 319` for the map, `Frame 324` for
  Book Us).
- **The main components are not shared** (`Theme=Lime` variants: header `624:4798` against
  Retro's `613:4328`, bio `660:2499`, media `692:4007`, gallery `706:4729`, map `731:3823`,
  form `725:2931`, testimonials `755:2098`), which was true of layouts 1–3 and means nothing.
  One oddity worth knowing: Retro's own 1440 pricing instance already points at
  `Theme=Lime 719:3412` — the same node as Lime's — so at that width the two pages render one
  component in two modes, and the tree test says the same thing (1.00).
- **The trees match**, as a depth-6 `type:name` multiset per section pair:

| Section | 1440 | 768 | 390 | What differs |
|---|---|---|---|---|
| header | 0.29 | 0.28 | 0.28 | **A different composition, not only decoration** — layout 3's header case. Retro's 157 nodes are mostly the checkerboard strip and the grain; Lime's are a radius-85 **glass nav capsule**, an upright avatar tile, an identity panel and the seal. See *The header*. |
| bio (Section) | 0.97 | 0.22 | 0.21 | At 1440 only Retro's grain rect. The narrow scores are the two **checkerboard strips Retro reparents to the bio Section's foot** (layout 2's read-what-is-missing rule: 128 tile nodes on one side); the bio instances themselves are the same tree. |
| media (band) | 0.13 | 0.90 | 0.95 | The desktop band parents both of Retro's checker strips (the 0.13); the narrow bands compare the instances. Lime's band has two **arc vectors** in their place. |
| video | 1.00 | 0.16 | 0.16 | on the page, **not in the project** (below) |
| gallery | 0.85 | 0.85 | 0.85 | Retro's grain rect and torn-edge vector; Lime's head arc |
| repertoire | 0.97 | 0.97 | 0.97 | Retro's torn foot; Lime's foot arc |
| map | 0.98 | 1.00 | 1.00 | one leftover vector at 1440 (below) |
| pricing | 1.00 | 1.00 | 1.00 | — |
| calendar (Book Us) | 1.00 | 1.00 | 1.00 | — |
| form | 1.00 | 1.00 | 1.00 | — |
| testimonials | 1.00 | 1.00 | 1.00 | — |
| footer | 0.51 | 0.51 | 0.51 | vs Retro's. It is Lime layout 1's own component family (`Property 1=lime` `446:8701` / `907:12072` / `907:12373`) at layout 1's three sizes exactly (479.5 / 647.4 / 619.4), so it is **out of scope** (below). |

- **Retro's decoration is gone and nothing hard-shadowed replaces it**, with one exception:
  no `DROP_SHADOW` on any master but the 390 gallery's two arrow pills (a hard 5 / 5 offset in
  `#15180F`, layout 2's hard-shadow precedent — see *Decorative language*). Two `INNER_SHADOW`
  glows on the whole page, both in the media band. Four `BACKGROUND_BLUR`s.
- **The narrow shapes are Retro's** — every narrow instance is the same tree as its Retro twin,
  the header included (0.28 is the checker again; its 390 master is 844 tall like Retro's).
  Retro layout-4's narrow notes (the repertoire inset to 310 inside a 370 frame, the tablet
  Book Us pair stacked, the 390 media called "— Tablet") apply as written.
- **The code side is uniform.** Every one of the nine `if (s.v3)` blocks (`Bio`, `Media`,
  `Pricing`, `Repertoire`, `Gallery`, `Calendar`, `EventsMap`, `Testimonials`, `EnquiryForm`)
  plus `HeaderV3` already renders under Lime; **none reads `s.lime`**, none contains a
  `useState` (every hook is hoisted above the branches), and each carries a Retro `T` table.
  So layout 2's placement rule decides every block: `if (s.v3 && s.lime)` ahead of `if (s.v3)`
  when the block needs only the hoisted state, `if (s.lime)` *inside* `if (s.v3)` after the
  seam when it needs values the branch derives.

So the work is the layout-3 pass's work one branch over: **Lime decoration and Lime tokens inside
the existing `s.v3` branches, gated on `s.lime`**, placed by layout 1's count-the-leaves rule and
layout 2's seam rule. **Do not write Lime-only section components.**

### The page order is the seeded order, and there is no composed row

`PAGE_ORDERS` has rows 0–2 and `pageOrder(3)` falls to `PAGE_ORDERS[0]`, which is
`EXAMPLE_PAGE`'s order: header, bio, media, gallery, repertoire, map, pricing, calendar, form,
testimonials, footer. Both Lime narrow pages stack exactly that (with the video band between
media and gallery, which the project does not carry), and the 1440 page columns only *inside*
sections — the bio's head beside its card, the Book Us head over its two halves — which Retro's
branches already draw. **Expect no change to `PAGE_ORDERS`, `pageRows`, `NVAR` or `CATS`**:
every body category's `NVAR` is already 4, so every fold this pass meets is already in place.

`preview.jsx`'s `&column=` switch is layout 3's and is not read here.

## The Figma source

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Frame 261 | `964:72848` | 1440 × 10390.5 |
| Tablet | Frame 266 | `971:5298` | 768 × 11193.8 |
| Mobile | Frame 271 | `977:8866` | 390 × 10037.1 |

- Desktop: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=964-72848&m=dev>
- Tablet: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=971-5298&m=dev>
- Mobile: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=977-8866&m=dev>

`fileKey` = `uFoUbPaBrDicjyuSBEbtGT`. All three frames, and Retro's layout-4 frames
(`964:72510` / `964:76437` / `971:12206`), are on the **Layout 4** page, `964:58574`.
`getNodeByIdAsync` on an instance id works without a page switch (the memory note); a `query`
over the page wants `await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('964:58574'))`
first.

**Match on node id and width, never on the name.** Retro layout-4's liars hold exactly: the
`Tags — Frame` instance is "— Desktop" at all three widths, the bio's 768 master is "— Desktop",
and the **390** media player, repertoire, wizard and calendar are all called "— Tablet". Two are
new: the 768 and 390 footers are "Footer — Component 3 — Desktop" and "Footer — Component 4 —
Desktop" (both Lime layout 1's footer, out of scope), and the 390 **video** instance is in
`Primitives: Retro` mode — irrelevant, since the section is not in the project.

**Three things are wrapped**, as on Retro's page, and a wrapper that paints is the fit's:
- **bio** stands in a lime `Section` beside (1440) or under (768 / 390) its head frame, which
  holds the "KM BIO" eyebrow, "Reads the room." and the `Tags — Frame` instance — the Genres
  row Retro's QA gave the bio.
- **repertoire** stands in a `#CCFA61` panel (`sem/box/1` of Scheme 3, radius 60) under its
  "Repertoire" head, inside a lime `Section`: `964:72912` (1328 × 812, padding 60), `971:5600`
  (708 × 794, padding 50), `977:9174` (370 × 818, padding 40 / 30). Retro's `#6D7040` panel
  at the same radius; the instance's `x`/`y` are relative to it.
- **calendar** stands in `Frame 324` (`sem/box/2` `#394732`) with the "Book Us" head and the
  wizard: `964:72928` (1328 × 822, radius 60, padding 60, gap 50), `971:5615` (708 × 1276,
  radius 60, padding 60 / 50, gap 50), `977:9189` (370 × 1118, **radius 30**, padding 30 / 10,
  gap 20). Retro's tan panel at the same numbers.

## The sections

Page order. Sizes are the frames' own. Each row's three masters are fitted in one session.

| # | Cat | Desktop node | Size | Tablet node | Size | Mobile node | Size | Retro twin (1440 / 768 / 390) | Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `header` | `964:72849` | 1440 × 900 | `971:5299` | 768 × 1024 | `977:8867` | 390 × 844 | `964:72511` / `964:77544` / `971:14040` | done `ce07286` |
| 2 | `bio` | `964:72857` *(Section `964:72850`, head `964:72851`, tags `964:72854`)* | 664 × 720 | `971:5307` *(Section `971:5300`, head `971:5301`, tags `971:5304`)* | 708 × 720 | `977:8875` *(Section `977:8868`, head `977:8869`, tags `977:8872`)* | 370 × 536 | `964:72519` / `964:76446` / `971:14479` | — |
| 3 | `media` | `964:72864` *(band `964:72858`, head `964:72860`)* | 1440 × 671 | `971:5431` *(band `971:6533`, head `977:10286`)* | 768 × 569 | `977:9005` *(band `977:8999`, head `977:9001`)* | 390 × 836 | `964:72526` / `971:15190` / `971:14834` | — |
| 4 | `gallery` | `964:72909` *(wrapper `964:72874`, head `964:72875`)* | 874 × 646 | `971:5597` *(wrapper `971:5562`, head `971:5563`)* | 768 × 594 | `977:9171` *(wrapper `977:9136`, head `977:9137`)* | 390 × 586.3 | `964:72815` / `964:78491` / `977:8142` | — |
| 5 | `repertoire` | `964:72916` *(Section `964:72911`, panel `964:72912`)* | 1208 × 536 | `971:5604` *(Section `971:5599`, panel `971:5600`)* | 608 × 582 | `977:9178` *(Section `977:9173`, panel `977:9174`)* | 310 × 650 | `964:72822` / `964:78509` / `977:8166` | — |
| 6 | `map` | `964:72924` *(Frame 319 `964:72918`, head `964:72920`)* | 1440 × 747 | `971:5612` *(Frame 319 `971:5606`, head `971:5608`)* | 768 × 871 | `977:9186` *(Frame 319 `977:9180`, head `977:9182`)* | 390 × 680 | `964:72830` / `964:78599` / `977:8322` | — |
| 7 | `pricing` | `964:72926` | 1440 × 546 | `971:5613` | 768 × 809 | `977:9187` | 390 × 837 | `964:72831` / `964:78656` / `977:8440` | — |
| 8 | `calendar` | `964:72939` + wizard `964:72938` *(Section `964:72927`, Frame 324 `964:72928`)* | 478 × 536 + 680 × 536 | `971:5626` + `971:5625` *(Section `971:5614`, Frame 324 `971:5615`)* | 608 × 505 + 608 × 479 | `977:9200` + `977:9199` *(Section `977:9188`, Frame 324 `977:9189`)* | 350 × 496 + 350 × 474 | `964:72844` + `964:72843` / `964:79434` + `964:79037` / `977:8514` + `977:8513` | — |
| 9 | `form` | `964:72940` | 1440 × 795 | `971:5627` | 768 × 1024 | `977:9201` | 390 × 971 | `964:72845` / `964:79477` / `977:8663` | — |
| 10 | `testimonials` | `964:72941` | 1440 × 716 | `971:5628` | 768 × 642.4 | `977:9202` | 390 × 624.4 | `964:72846` / `964:79536` / `977:8764` | — |
| — | `footer` | `964:72942` | 1440 × 479.5 | `971:5629` | 768 × 647.4 | `977:9203` | 390 × 619.4 | — | **out of scope** — Lime layout 1's own component family at layout 1's sizes, fitted in that pass's section 11; `NVAR.footer` is 1 |
| — | `video` | `964:72871` | 1328 × 754 | `971:5436` | 708 × 402 | `977:9010` | 370 × 209 | — | **not in the project** (`d734992`); Retro's QA declined restoring it on layout 4, and this pass does the same |

The Retro twin's node id is what `EncoreSection.jsx`'s `v3` fit comments cite, so grep for it to
find the branch. **Cite branches by that id, never by line number.**

### Sizes: re-measure, and expect the repertoire to grow most

| Section | Lime 1440 / 768 / 390 | Retro 1440 / 768 / 390 |
|---|---|---|
| header | 900 / 1024 / 844 | 900 / 1024 / 844 |
| bio instance | 664 × 720 / 708 × 720 / 370 × 536 | the same |
| bio Section | 952 / **1241** / 822 | 952 / 1177 / 871 |
| media instance | 671 / 569 / 836 | 671 / 569 / 831 |
| media band | **1043** / 791 / 1094 | 1012 / 672 / 1033 |
| gallery instance | 874 × 646 / 768 × 594 / 390 × **586.3** | 874 × 646 / 768 × 594 / 390 × 605.1 |
| gallery wrapper | 746 / 878 / 806.3 | 746 / 859 / 761.1 |
| **repertoire** instance | 1208 × **536** / 608 × **582** / 310 × **650** | 1208 × 452 / 608 × 522 / 310 × 596 |
| repertoire Section | 1062 / 1044 / 948 | 947 / 965 / 842 |
| map instance | 747 / 871 / 680 | 747 / 870 / 680 |
| pricing | 546 / 809 / **837** | 522 / 774 / 846 |
| wizard | 680 × 536 / 608 × 479 / 350 × 474 | 680 × 491 / 608 × 466 / 350 × 465 |
| calendar | 478 × 536 / 608 × 505 / 350 × 496 | 478 × 491 / 608 × 472 / 350 × 469 |
| Book Us Section | 982 / 1376 / 1218 | 906 / 1311 / 1170 |
| form | **795** / 1024 / 971 | 814 / 950 / 920 |
| testimonials | 716 / 642.4 / 624.4 | 716 / 604.4 / 588.4 |

The taller repertoire is Lime's `list` 24 against Retro's 16 on the same rows; the taller Book
Us pair is Bebas at Display/Title in the summary card and the wizard's stepper. The media band
grows at 1440 (156 above the head against Retro's 132.4 + 22.6) and at 768 (100 / 50 against
50 / 0) — read the band's padding off the wrapper, not the render. Measure each instance's
rows against its Retro twin's before transcribing a stated height; Retro layout 4's
"a stated instance height is a residue" cases (the video's clipped component, the map's
`FILL` viewports, the testimonials' stored 392.4) are all still there.

## Lime's layout-4 mode

The page frame is **Primitives: Lime, Scheme 1**; the tablet page adds `Device: Tablet` and the
mobile page `Device: Mobile`. Layout 1's scheme table (its *Lime's Figma mode*) carries every
value these schemes resolve to.

**Schemes by node**, from `explicitVariableModes` (instance, then nested), with the fills read
off the nodes in the planning walk:

| Section | Instance | Nested |
|---|---|---|
| header | **Scheme 3** (its own fill `sem/box/3` `#9CCF23` under the photograph and a linear gradient) | nav `Frame 49` **Scheme 1** `#15180F`, radius 85, `BACKGROUND_BLUR` 44 (1328 × 74 / 708 × 74 / 370 × 58); seal `Frame 247` **Scheme 4** `#F2FFD0` at 1440 and 768 (125 × 125, Figma −26.06°). **At 390 the seal is a lime disc in the render** and carries no explicit scheme: read its fill |
| bio | Section **Scheme 3**: `sem/bg` = `#AFE335`, head texts `#15180F`; the bio instance **Scheme 1 at 1440, Scheme 2 at 768 and 390** | the `Tags — Frame` instance is Scheme 1 at every width; the instance carries a 1px inside **`#000000`** stroke at 1440 and 768 and none at 390 (read whether it paints); its glass panel is a `BACKGROUND_BLUR` 54 (604 × 305 / 648 × 305 / 350 × 306) |
| media | band **Scheme 2**: `sem/bg` = `#2E3928` (`s.box1`); the instance is Primitives only at 1440, **Scheme 2 + `Device: Tablet` at 768**, and **`Device: Tablet` at 390** | the sleeve (308 × 404 / 308 × 312 / 370 × 302, radius 50) and **tile 0** carry `INNER_SHADOW` 34 `#AFE335`; every tile (289 × 270 / 136 × 139 / 180 × 123, radius 50) carries a `#D4D4D4` stroke of mixed weight — read it before drawing a ring |
| gallery | wrapper **Scheme 3**: `sem/bg` = `#AFE335`; the instance fills `#AFE335` too | the two arrow discs **Scheme 4** `#D5E3B2`: 55.5 square, radius 10, `BACKGROUND_BLUR` 18.1, a 0.75 `#F2FFD0` stroke at 1440 and 768; at 390 two **180 × 55.5 pills**, radius 60, `DROP_SHADOW` offset 5 / 5, blur 0, `#15180F` |
| repertoire | Section **Scheme 3**: `sem/bg` = `#AFE335`; panel `sem/box/1` = `#CCFA61` (`lime3`) | the instance inherits; "Repertoire" is `#15180F` |
| map | `Frame 319` Scheme 1 (page); the instance fills `#15180F` | `Map Viewport` **Scheme 3**; the raster is `e089bd11` at `FILL` |
| pricing | Primitives only; fills the page | — |
| calendar (Book Us) | Section on the page; `Frame 324` `sem/box/2` = `#394732` | the wizard is **Scheme 1** with a **Scheme 3** Next Step pill (121 × 54, `#15180F`); the calendar's Send Enquiry pill is **Scheme 2** (478 × 54, `#AFE335`); the summary card's 48 × 48 avatar is `dc450d0a` |
| form | Primitives only; fills the page | the submit pill is **Scheme 1** `#F2FFD0` (644 × 54 / 708 × 54 / 370 × 54) — pale, not lime |
| testimonials | **Scheme 4**: `sem/bg` = `#F2FFD0` (`s.tx`) | the two arrow discs Scheme 4 `#15180F`, 74 × 74, `BACKGROUND_BLUR` 24; the four cells (320 × 344 / 225 × 392 / 300 × 392) are **mist `#D5E3B2`, then `#101309` (Scheme 1 `sem/box/3` = `s.box3`), then mist, then `#15180F`** |
| footer | Scheme 1 (layout 1's) | — |

Two width traps that no earlier Lime page set:
- **The bio instance changes scheme between widths** (1 at 1440, 2 at 768 / 390) on the same
  component, so a `get_variable_defs` token that is right at 1440 can be wrong at 768. Read each
  master's fills, layout 2's rule, and expect the narrow card's wells one step lighter.
- **The 390 media instance carries an explicit `Device: Tablet`**, the layout-1 hero's case:
  every `size/*` in it is the **768 ramp's**, and `get_variable_defs` on it says so (the tell
  is a `display-lg` of 81 on a Mobile page). The wizard and calendar are called "— Tablet" at
  390 but carry no Device override; the media does.

`lime3` (`#CCFA61`) and `mist` (`#D5E3B2`) are layout 2's and layout 1's local literals; `s.box3`
(`#101309`) is a `sem` key. **Read each node's `fills` before believing a token** — the
testimonials' four cells and the two `#15180F` pills on lime grounds are exactly the case.

### Grounds and seams

Sampled from all three renders at the page edge and the middle of each band, and read off the
band frames' `fills` with their variable bindings. **The sequence is identical at 1440, 768 and
390.** Where layout 3 was a dark page with two sheets, **layout 4 is a dark page with three
lime bands, an olive one and a pale one**, and — for the first time since layout 1 — **arc
seams**, so `ArcEdge` is no longer layout 1's alone. Layout 1's ownership rule holds: a seam is
a 44.24-tall full-width `VECTOR` *inside* the band whose ground differs, at its head (y −1)
and/or its foot (rotation 180), filled in the neighbouring band's colour.

| # | Section | Ground | Seams it draws (head · foot) | What stands on it |
|---|---|---|---|---|
| 1 | header | photograph over `sem/box/3` `#9CCF23` | — (a straight edge into the bio band) | the glass nav, the avatar tile, the identity panel, the seal |
| 2 | bio | **lime `#AFE335`** (Scheme 3 `sem/bg`), ink `#15180F` | none | "KM BIO", "Reads the room.", the Genres chips; the 664 × 720 card at radius 55 |
| 3 | media | **olive `#2E3928`** (Scheme 2 `sem/bg`) | head **`sem/text/1` `#AFE335`** (the bio band's lime) · foot **`sem/bg` `#15180F`** (the page below, rotation 180) | "Six Worth Your Ears" in lime, the sleeve, the six tiles |
| — | *video* | page `#15180F` | none | *not in the project* |
| 4 | gallery | **lime `#AFE335`** (Scheme 3) | head **`sem/box/3` `#101309`** (not `sem/bg`; a hair off the page) · none | "MEDIA" / "Snaps from the night" in ink, the spotlight card with corner brackets, the rail, the mist discs |
| 5 | repertoire | **lime `#AFE335`** (Scheme 3), one band with the gallery | none · foot **`sem/bg` `#15180F`** | the `#CCFA61` panel at radius 60, its rows and the A–Z rail |
| 6 | map | page | none at 768 / 390; at 1440 a foot vector in `sem/bg` **on a page-coloured band — a no-op leftover, not drawn** | the dark plate with lime rings, four olive stat cards with lime rings, the olive ticker |
| 7 | pricing | page | none | rows divided by rules, hairline chips, lime feature pills, lime pill |
| 8 | calendar | page; `Frame 324` `#394732` (`s.box2`) at radius 60 / 60 / 30 | none | "Book Us" in lime; the wizard card; the pale summary card over olive slot rows; the lime Send Enquiry pill |
| 9 | form | page | none | "Contact Us" in lime, dark boxes, the pale `#F2FFD0` submit, lime step squares |
| 10 | testimonials | **pale `#F2FFD0`** (Scheme 4), ink `#15180F` | none (straight edges) | the four cells above, two ink arrow discs, lime marks |
| — | footer | page, layout 1's | none | — |

**Vector widths**: at 1440 every seam is 1437.8 wide; at 768 the media's two and the gallery's
head are **768** (not layout 1's leaked 1438) and the repertoire's foot is 768; at 390 all four
are **576.6** wide at x −93 / −82 (leaked). `ArcEdge` stretches to the section at every width,
so the leak costs nothing.

**The lens where the video was.** On the frame the media's foot arc (page colour) bulges into
the olive, then the video band is the page, then the gallery's head arc (`#101309`) bulges into
the lime. Our page has no video, so media is followed by the gallery directly: olive, a dark
arc, then a dark arc, then lime — a **44 + 44 dark lens** between the two coloured bands. That
is exactly what the frame would show with its video frame deleted, so the expectation is to
keep each seam in its frame's own colour and name the diff; drawing the media's foot in the
gallery's lime is the alternative, and no master draws it. Open question 1; the media session
(the first band with seams) decides, and the gallery session checks the meeting in the editor
(the tags row's route in Retro layout 4: read every `[--ac]` root's rect).

**No root flag widens — expected, and open question 2 is where it is decided.** Layout 1's
`limeBand` / `limeLight` root flags are `s.v0`'s; here every sheet is painted **in the
branch**, as Retro's `v3` bands are (the bio's, gallery's and repertoire's written-out bleed,
the media's, the testimonials'):
the lime bands in `s.ac` with `s.bg` ink, the olive band in `s.box1`, the pale band in `s.tx`
with `s.bg` ink. A section standing on a lime or pale band takes its own ink inside the
branch, layout 2's form rule.

## Lime's layout-4 decorative language

Everything here is behind `s.lime`, and replaces what the Retro branch gates on `s.retro`.

- **No grain, no torn edges, no checkerboard, no tilt.** Every `Grain`, `Checkerboard`,
  `TornEdge` and `tilt()` in the nine `s.v3` branches and `HeaderV3` is Retro's and stays gated
  off. The header's checker floor and the media band's two checker strips become **nothing**
  and **two arcs** respectively; the gallery's torn head and the repertoire's torn foot become
  arcs; the gallery's 2° rotated spotlight card reads **unrotated** in Lime's render, with a
  corner-bracket frame instead — read `rotation` off the node before dropping the tilt.
- **Two glows, one hue**: `INNER_SHADOW` radius **34 `#AFE335` = `s.ac`**, spread 0, on the
  media's sleeve and on **tile 0** — the marked seat (Retro's rust inset ring), so the mark is
  a lime glow on the scrim overlay, the media's own layout-4 rule for a ring that must not
  inset the photograph. Confirm both off the node's `effects`.
- **Four backdrop blurs**: the header's nav capsule (44), the bio's glass panel (54; Retro's
  is 22.1 and Retro layout 4's bio note says `backdrop-filter` survives `ScaledPreview`), the
  gallery's arrow discs (18.1, at 1440 and 768) and the testimonials' arrow discs (24). A blur
  behind an **opaque** fill paints nothing: the walk printed the nav's `#15180F` with no
  opacity suffix, so read the paint's `opacity` before transcribing any of the four.
- **One hard offset shadow**: the 390 gallery's two arrow pills, `DROP_SHADOW` 5 / 5, blur 0,
  `#15180F` on `#D5E3B2` with a 0.75 `#F2FFD0` stroke. Layout 2's two hard shadows are the
  precedent; draw it as `boxShadow` with no blur.
- **Rings are `sem/stroke/1` at 1px inside**, drawn as `inset 0 0 0 1px`, where a master draws
  one; the four full-strength rings on the page are the stat cards', the pricing rows' and the
  wizard's, all in `s.ac` (read each). The pricing rows are divided by rules the render shows
  in lime — the frame's `sem/stroke/2` — and under Lime `vm.tierRow` reaches pale lime, so the
  pricing session (and the form's, which aliases `vm.formRule` to it) reads `s.ac` directly,
  layout 3's `tierRow`-not-read rule.
- **Radii** are raw: 85 on the nav capsule (999 in effect), 55 on the bio card and its portrait
  tile, 50 on the media sleeve and tiles, 60 on the repertoire panel and the Book Us panel (30
  at 390), 10 on the gallery's wide discs and 60 on its 390 pills, 26.95 on the header's
  avatar tile. Check each against `get_design_context`.

## Photography

**Expect one `photos.js` line and no new asset.** Image hashes, read off all three pages:

| Section | Slot (frame box) | Hash | Seeded today | Verdict |
|---|---|---|---|---|
| header | the instance's own fill, 1440 × 900 / 768 × 1024 / 390 × 844 | `51d68654` | `limeHero` | ✓ — but the 1440 fill is **`CROP`** where 768 and 390 are `FILL`, so at desktop the `imageTransform` *does* apply (the layout-3 header's lesson the other way round). Read it |
| header | avatar tile 113 × 119 / 113 × 119 / 116 × 119 | `e3790c2c` | `limeHeaderAvatar` | ✓ |
| bio | the card, 664 × 720 / 708 × 720 / 370 × 536 | `fa453f7d` at `FILL` | `limeStage` (a portrait slice of this source) | **a `layouts[3].bio` seed is probably owed, and the file already exists**: the whole source cover-cropped into a portrait box is what `lime-bio-stage.jpg` (the 1200 × 800 whole source, layout 3's seed) gives, where the slice `limeStage` was cut for layout 1's arch. Candidate: `SEEDS.Lime.layouts[3].bio = limeBioStage`. The bio session decides by render diff, layout 3's section-2 method |
| media | six tiles 289 × 270 and the sleeve | `8c7fa7d8` `4e7cc529` `40041573` `b737c3e0` `21e9622c` + `0a8372b9` | `ROW_ART.media` (five) | ✓ — the sixth is the frame's filler and is on Retro's page too; one tile per track |
| gallery | spotlight 551 × 494 / 497 × 494 / 330 × 297 | `3a59b4d1` | `LIME_PHOTOS.gallery` slot 3 (`limeGallery4`) | ✓ expected — the layout-3 walk placed `3a59b4d1` in the seeded set; the gallery session confirms the spotlight is `galActive()`'s slot |
| gallery | six thumbnails 121 × 68 | `b35b6507` `35ae28b9` `b073b46f` `3f0c98b4` `8f69a4a6` `b35b6507` | the shared strip | ✓ Retro's exactly |
| map | `Map Texture` 664 × 554 / 708 × 320 / 370 × 251 | `e089bd11` | `vm.mapRadialSrc` | ✓ |
| calendar | the summary card's 48 × 48 disc | `dc450d0a` | — | on Retro's page too; Retro's fit reads `image` there (`limeCalendar` under Lime). Nothing to seed |
| testimonials | — | — | — | no photographs: the marks are `vm.quotes[].mark` discs (lime, lettered in ink) |

## What already renders, and the traps in it

A code survey at the start of this pass (a brace walk of every `if (s.v3)` block). **Every `s.v3`
branch already renders under Lime**; no branch condition reads `s.retro`, and no block reads
`s.lime` yet. Every block's hooks are hoisted above its branches (`useState` inside a block: 0
everywhere), so layout 2's placement rule decides by whether the block also needs values the
branch derives.

| Branch | Lines | `s.retro` | Decoration | `pillBg` | `paper` / `paperFg` | `deep` | `mapBg` / `mapFg` | `edge` | `tierRow` / `repPanel` | Literal hexes | `T` table |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `HeaderV3` | 173 | 5 | `Grain`, `Checkerboard`, `SealBadge hue=paper` | 1 | 1 / 0 | 0 | 0 / 0 | 0 | — | 2 | yes |
| `Bio` v3 | 198 | 5 | — (`backdrop-filter`) | 1 | 0 / 0 | 2 | 1 / 1 | 0 | — | 7 | yes |
| `Media` v3 | 253 | 8 | `Checkerboard` × 2 | 0 | 1 / 3 | 0 | 1 / 0 | 0 | — | 9 | yes |
| `Gallery` v3 | 196 | 7 | `TornEdge`, `Grain`, `tilt` | 2 | 0 / 1 | 1 | 1 / 1 | 0 | — | 9 | yes |
| `Repertoire` v3 | 184 | 4 | `TornEdge` | 2 | 0 / 0 | 1 | 1 / 1 | 0 | `repPanel` | 3 | yes |
| `EventsMap` v3 | 325 | 12 | — | 4 | 3 / 3 | 4 | 1 / 1 | 0 | — | 30 | yes |
| `Pricing` v3 | 202 | 1 | — | 0 | 0 / 0 | 0 | 0 / 0 | 0 | `tierRow` × 3 | 2 | yes |
| `Calendar` v3 | 448 | 14 | — | 1 | 1 / 1 | 0 | 0 / 0 | 1 | — | 14 | yes |
| `EnquiryForm` v3 | 274 | 2 | — | 3 | 0 / 0 | 0 | 0 / 0 | 0 | (`formRule` = `tierRow`) | 2 | yes |
| `Testimonials` v3 | 250 | 15 | — | 2 | 1 / 1 | 0 | 0 / 0 | 1 | — | 18 | yes |

The traps these counts point at, with layout 2's token facts as the key — **under Lime `s.paper`
is `s.tx`** (pale lime), **`s.pillBg` is the accent**, **`s.deep` is the page ground** and
**`s.mapBg` is `deep` lifted 11%**:

- **Three olive bands are lime.** The bio, the gallery and the repertoire paint Retro's olive
  as the `s.mapBg` / `s.mapFg` pair, which under Lime is a near-page dark with pale ink. The
  frames' bands are **`s.ac` with `s.bg` ink**, and every head, eyebrow and chip on them changes
  ink with the ground. The Genres row inside the bio and the repertoire's panel go with their
  bands: the panel is `vm.repPanel` (`mix(band, cream, .11)`) under Retro and **`lime3`** under
  Lime, a block-local literal (layout 2's idiom) rather than a vm key, since one layout wants it.
- **The media's cream sheet is `paper`**: pale lime, where the frame's band is `s.box1` with
  `s.tx` and `s.ac` ink. Its two `Checkerboard`s are Retro's; the Lime block draws the two
  arcs. It is the first `v3` band with seams, so it settles open question 2.
- **The testimonials' whole `ground` is `pillBg`**: lime, where the frame's band is Scheme 4's
  pale `s.tx` with `s.bg` ink — layout 2's `EnquiryForm` case again, in the testimonials. Its
  `SEATS` register is Retro's (cream, cream, olive, mustard); Lime's four are **mist, `s.box3`,
  mist, `#15180F`** with ink that follows the seat. Write a Lime register; do not remap Retro's.
- **The form's `pillBg` is three things** — the 4px rule, the submit and the step squares —
  and the frame draws the submit **pale `#F2FFD0`** (`s.tx`, a Scheme 1 pill) with the head and
  the step squares in lime. Read each seat.
- **The map's `deep` plate is the page ground on Lime**, and its four stat seats (`pillBg`,
  `paper`, `mapBg`, `deep` derivations) collapse; the frame's four are **one olive register**
  with lime rings and lime numerals, its ticker an olive capsule (not `pillBg`), its plate dark
  with lime rings and lime zoom squares. Layout 3's map recipe is the nearest fitted thing.
- **The Book Us panel is `edge`** where the frame's is `s.box2`; the calendar's slot rows are
  `paper` (pale, and one colour with the `tx` card — Retro layout 4's named cost on Lime) where
  the frame's rows are **dark `s.box1` under a pale card**, so the tonal stack the Retro note
  said Lime flattens is exactly what Lime's own frame restores. The wizard card is `s.box1` on
  the `s.box2` panel with lime chips and a `#15180F` Next Step pill.
- **`vm.tierRow` reaches pale lime on Lime** (layout 3's note). The pricing rows' rules and the
  form's `formRule` read `s.ac` directly in their Lime blocks.
- **`HeaderV3` draws Retro's checker floor and grain under Lime** (the layout-3 sweep's "card 4
  alone still draws the checker"). Its Lime block is the whole header — see below.
- **Every branch carries Retro's per-width `T` table.** Under Lime every size is its token at
  that width already (layout 1's theme-aware ramp), so a Lime leaf reads `s.*` and no second
  table is written; `u()`'s `z` stays right for boxes. `size/display-xl` (200 / 120 / 72 under
  Lime, at lh .75 under Retro alone — Retro layout 4's bio note) is the header's name and the
  bio's display head; check what leading the Lime text nodes actually carry.
- **Thirty literal hexes in the map, eighteen in the testimonials, fourteen in the calendar** are
  Retro's registers and plates; all stay in the Retro path.

## Head allocation — unchanged

Retro layout 4's *Head allocation* table holds unread: every Lime frame carries the same strings
("Reads the room." with "KM BIO", "Six Worth Your Ears", "Snaps from the night" with "MEDIA",
"Repertoire", "Distances we'll Travel", "Book Us", "Contact Us", "Client success stories"), the
`HEADING_4` map already resolves the four fallbacks, "Six Worth Your Ears" stays declined (a
count), and the repertoire's display line stays `s.title`. **No default is re-pointed and
`TITLES` does not change.** The same hidden `the` / `room.` leftovers are in every head frame.

## The header

Layouts 2 and 3 settled how a Lime header is written: `if (s.lime) { … return }` at the head of
the component, the footer's placement, because the component *is* the branch and its live seam
is `navHref`, `NavMenu`, `BookPill to=` and `ListenLink to=`. `HeaderV3` takes the same route —
count-the-leaves says block, and here the composition changes as well as the paint:

- **The photograph** is the instance's own fill (`51d68654`, CROP at 1440) over `sem/box/3`
  `#9CCF23` with a linear gradient: the render fades from the photograph at the top into
  **lime** at the floor (the band scan reads `#95C02D` at 92% of the header at every width),
  so the scrim is a photograph-to-lime fade, not Retro's `SCRIM.stack`. Read the gradient's
  stops off the node.
- **The nav** is `Frame 49`: a `#15180F` capsule, radius 85, `BACKGROUND_BLUR` 44, 1328 × 74
  at 56 · 28 (708 × 74 and **370 × 58** at the narrow widths; their positions were not read —
  the instances' own padding is 30 / 30 / 60 / 30 and 24 / 20 / 40 / 20), holding a globe + "KAI MERCER"
  group (`Frame 175`, 324 × 36) and a links + Book Now pill + burger group (`Frame 50`,
  944 × 54). That is **HeaderV0's Lime capsule**, not `NavBar`'s five cells: before writing it,
  read HeaderV0's Lime nav and its `navNameEms` / `navCtaEms` budget (layout 2's one-row rule)
  and reuse what the leaves share — Retro layout 4's "a section's whole nav can already be
  fitted by an earlier layout", one template over. The render draws the links + pill at 1440
  and the pill + burger at 768 and 390.
- **The avatar tile** (113 × 119, radius 26.95, a lime ring) stands at 56 · 286 at 1440 — above
  the identity panel, HeaderV3's own order — and at the floor of the photograph at both narrow
  widths.
- **The identity panel** (`panel`, 1328 × 405 at 56 · 445): the kicker "DJ · LIVE ACT" in pale
  `s.tx`, the name at display-xl in pale, the location line with a lime dot, and the Genres
  chip row at the right at 1440 (a `sem/tag/1` dark chip and `sem/tag/2` lime chip pair,
  alternating as layout 1's header chips do; at 768 and 390 the row runs full width under the
  location). Retro's mustard pairs become `s.tx` / `s.ac` pairs; read each.
- **The seal** (`Frame 247`, 125 × 125 at Figma −26.06° = CSS +26.06, `SealBadge`'s own
  `tilt={26.06}`) is a **pale `#F2FFD0` disc with ink marks** at 1440 and 768 (Scheme 4), at
  1288 · 147 at 1440 and over the identity block at 768 (Retro's floor-anchored placement),
  and a **lime disc** at 390, top right under the nav. `SealBadge`'s Lime branch (layout 1's
  footer) draws the dark disc with rings and a reticle; the layout-3 bio's `classic` prop
  draws the §10.2 seal in inverted inks. Read the three masters' children before choosing —
  the 1440 seal's children are `Group 9`, `Frame 179` (the 120 ring), two `Kai Mercer` text
  paths and two 14 × 14 frames, which is the §10.2 seal's tree.
- **No checker floor, no grain**: `Checkerboard` and `Grain` stay Retro's. The header's foot is
  a straight edge into the lime bio band.
- **`showBadge` reaches layout 4** (Retro layout 4's open question 10), so the toggle is real
  here as it is under Retro. `subtitle`, `cta2` and `align` still edit nothing.
- **Digest expectation**: under Lime `HEADER_COUNT.lime` is 4, so header arch 3 has no fold
  partner; a header change is three theme-1 files, `header` arch 3 at three widths.

## Per-session procedure

One section per session, **all three widths together**. Clear context between sections; git and
this file are the memory.

1. Read `CLAUDE.md`, this file, and the reading list at the top.
2. **Section 1 only, first:** `git switch -c lime-layout-4 main` (if the branch does not exist
   yet) and commit this plan and the `plans/README.md` row there. Then, with the dev server up,
   take the pass's "before" pictures at `theme=1&arch=3` for all eleven categories at desktop
   (`node scripts/shots.mjs before 1 3`) and keep them in the scratchpad.
3. `get_metadata` on **all three** of the row's nodes and on its Retro twin's 1440 node, side by
   side. Read them as arithmetic first. Compare against the twin to confirm the tree table above;
   a child that exists on one side only is decoration to gate or a node to add. **Do not call
   `get_metadata` on a Retro wrapper that parents a checkerboard strip** (Retro layout 4's tags
   note: ~200k tokens for four numbers) — the Retro bio Section at 768 / 390 and the Retro
   media band at 1440 are exactly those; query the instance instead.
4. `get_screenshot` on each node (`maxDimension` 1400–2000) and `curl` it in the very next call.
   Load the `figma-design-to-code` skill and run `get_design_context`. **Run `get_variable_defs`
   on all three nodes**, and read fills, strokes, effects, `rotation` and radii off the nodes
   with one `use_figma` read wherever a token or colour looks wrong — and walk `inst.parent` up
   to the Section, reading every level's `fills`, for the three wrapped sections.
5. **Implement inside the section's existing `s.v3` branch, gated on `s.lime`.** Ternaries or a
   block by layout 1's rule, placed by layout 2's seam rule; every Lime-only value behind
   `s.lime`; desktop numbers × 0.82, 768 and 390 verbatim. Prefer the session-0 tokens over
   literals, and name every literal the mode does not carry.
6. **Verify** with the preview harness (pass `arch=3`; `preview.jsx` defaults to 1):

   ```
   cd source && npm run dev
   http://localhost:5173/preview.html?cat=bio&arch=3&theme=1&w=desktop     # &w=tablet | mobile
   ```

   - **Look:** compare the Lime frame's render with `theme=1`, reading geometry with
     `getBoundingClientRect()`, against **content** edges. Five instances are 1440-wide bleeds
     (media, map, pricing, form, testimonials) and three bands bleed (bio, gallery,
     repertoire): the sheet spans the canvas, the content fills 1052 (Retro layout 4's rule).
   - **Function:** `theme=1&live=1`, plus `&n=` / `&booked=` / `&open=` / `&since=` / `&name=`
     / `&promises=` where the section reads them. Drive every control — including the
     QA-added ones (deliverable 1) — and confirm its active, idle and refused states read on
     Lime's colours, and on a **lime ground** where the section stands on one.
   - **Nothing else moves:** `node scripts/digest.mjs before 0,2,3,4` before editing and
     `after` after, then `cmp` — **zero differing files** across every category × layout ×
     width. Then the same at theme 1: the differing files must all be this section's category,
     and all `_arch_3_` — **or `_arch_7_` for `pricing` and `testimonials`**, whose eighth
     picker row (`CATS[].n` 8, so arch 7 exists) folds onto layout 4 (`7 % 4`). No other
     category has a fold partner at 3: `digest.mjs` enumerates `arch < CATS[c]`, so `media`
     and `repertoire` (n 7) stop at arch 6, which folds onto layout 3. A theme-1 diff in any `arch_0`,
     `arch_1` or `arch_2` file is a regression of a merged pass. Expect the rotating seal's
     `<text>` / `<textPath>` rows to differ between any two walks of the same build (Retro
     layout 4's sweep note): diff line by line before reading a mismatch as a regression.
7. Commit with the section named in the subject.
8. Set the row's Status to `done <sha>`, add anything the next section needs to *Conventions*,
   and commit that too.
9. **Stop and hand off.** Say the section is closed and that this is the moment to `/clear`,
   then print the next section's opening prompt as a filled-in fenced block:

   ```
   Continue the Lime layout-4 pass with section N, `cat`.

   Read CLAUDE.md, then plans/lime/layout-4.md, then the Conventions of plans/lime/layout-1.md,
   plans/lime/layout-2.md and plans/lime/layout-3.md, then the Conventions and the 2026-09-15
   Addendum of plans/retro/layout-4.md, then the `figma-frame-reading`,
   `verifying-the-published-tab` and `browser-tool-choice` memory notes, and follow the
   per-session procedure there.

   The three Lime masters are `<desktop node>` (<W> × <H>), `<tablet node>` (768 × <H>) and
   `<mobile node>` (390 × <H>) in Figma file uFoUbPaBrDicjyuSBEbtGT, on page 964:58574; the
   Retro twin is `<retro node>`. Fit them inside the existing `s.v3` branch of `<Component>`
   in EncoreSection.jsx, gated on `s.lime`. Themes 0, 2, 3 and 4 must digest to zero rows,
   and theme 1 may differ only in `<cat>` arch 3 (and arch 7 where the category folds).

   <the two or three conventions most likely to bite this section>

   Branch: lime-layout-4. Do not refresh the root index.html.
   ```

Do **not** refresh the root `index.html` per section. That is one deliberate step at the end of
the pass, with the two-build digest in layout 1's *Learned on the end-of-pass sweep* and the
control walk in Retro layout 4's. The seeded `EXAMPLE_PAGE` is arch 0 throughout, so the page
walk shows **no** difference at any theme: prove this pass shipped by choosing card 4 in the
setup modal of both builds.

### The first session: the header

`HeaderV3` is where deliverable 3 is met, so its verification is the builder's, not only the
harness's. With chrome-devtools MCP or a puppeteer script (layout 1's sweep notes give the route
and the selectors; Retro layout 4's repertoire note gives the Stacked card as
`[role=dialog] button` index 3 and warns off matching it by text):
- the setup modal still shows **four** Lime cards, card 4 renders the fitted header with no
  checker and no `repeating-conic-gradient`, and cards 1–3 are unchanged
- choosing card 4 opens the editor on a page whose every section is arch 3, in the seeded
  order, with no composed row
- publish, then in the popup: every nav link scrolls, the burger opens at 390 and at 820 (a
  fresh tab each), Book Now reaches `#form`
- the Retro header at theme 0 digests to zero rows

## The end-of-pass sweep

Written now from what the plan expects; refine as the sections defer things. One session:

1. **CLAUDE.md and README.md**, wherever they describe a layout-4 state as Retro's alone, and
   the claim sites that name which Lime layouts are fitted: `README.md:517` ("designed at
   layouts 1, 2 and 3") and `:523` ("the first three cards"), `CLAUDE.md:750` and `:760–761`
   (the same two claims, plus "`HeaderV0`–`V2` are fitted" and "Layout 4 is Retro's
   compositions in Lime tokens until its pass"), `photos.js`'s header comment ("layout-1,
   layout-2 and layout-3 pages"), `sectionVm`'s `lime` flag comment, and `data.js:235–240`
   (`headerFamily`'s "Lime's layout passes fit the first four" is already true; check the
   sentence beside it). Grep both files and the four source files for `lime` and `layout 4`.
   The three layout-4 paragraphs in CLAUDE.md that will need a Lime clause: the media
   player's tile mark, the gallery's 390 window, the calendar's wizard card (`tx`, "on Lime
   and Grunge the card and the rows share a fill" — which this pass's calendar may reverse).
2. **One whole-page published check under Lime at layout 4**, one puppeteer script: builder →
   Lime → card 4 → *Use this header* → Publish → Open, then every `s.v3` control on the page —
   header nav and burger (fresh tab per width), the media tiles and transport with audio, the
   gallery's discs, rail and 390 window, the repertoire's rail jump (and its sticky at 1440
   in the popup), the map's ticker and zoom, the calendar's slot rows and the wizard's three
   steps to Send Enquiry, the form's refused and valid submits (capture-phase `preventDefault`
   on the mailto), the testimonials' discs, the footer's links. Then the band edges: the three
   lime bands, the olive band with its two arcs, the lens where the video was, and the pale
   testimonials band. Scroll to 0 before clipping, or clip with `fullPage` off after
   `scrollIntoView` (layout 3's sweep).
3. **The layout-picker thumbnails** for arch 3 under Lime (deliverable 4).
4. **The other three header cards** still render and publish.
5. **`plans/README.md`:** mark the pass closed — and the Lime family with it.
6. **Refresh the root `index.html`** with the two-build digest. Expect zero rows at every theme
   on the seeded page outside the rotating seal; the proof that the pass shipped is card 4 in
   both builds' setup modals (the old build's draws the checker; the new one's does not).

## Conventions

Everything a fresh session would otherwise have to work out again. Append to this list as the
pass goes on.

- **Layouts 1's, 2's and 3's conventions all hold.** The gate is `s.lime` and composes with
  `s.retro`; Lime reads the fitted structure and widens a Retro gate rather than redrawing what
  the frame shares; never edit a Retro literal to make Lime look right; the harness's `theme` is
  a numeric index (Retro 0, Lime 1); blocks go ahead of the branch when the state is hoisted
  and inside it after the seam when the block needs a derived value; a Lime header is
  `if (s.lime) { … return }` at the head of its component.
- **The page walk is one `use_figma` read per page**, three in parallel, as layout 3's was:
  main component, `explicitVariableModes` (instance and nested), fills with their variable
  bindings, effects, strokes, image hashes, every full-width vector under 260 tall, plus one
  depth-6 `type:name` multiset per section pair. A low narrow score had to be read for *what*
  is missing (Retro's reparented checker strips) before it meant anything. Re-run it rather
  than re-deriving a section by eye.
- **Layout 4 is a dark page with three lime bands, an olive one and a pale one, and it has
  seams.** Bio, gallery and repertoire stand on `s.ac` with `s.bg` ink; media on `s.box1`;
  testimonials on `s.tx` with `s.bg` ink; everything else on the page. Media owns two arcs
  (head in `s.ac`, foot in `s.bg`), gallery owns its head (`s.box3`), repertoire its foot
  (`s.bg`); the map's 1440 foot vector is a no-op and is not drawn. `ArcEdge` is layout 1's
  helper and this page's second reader.
- **No composed row.** `pageOrder(3)` is `EXAMPLE_PAGE`'s order, `pageRows` composes nothing at
  layout 4, and `preview.jsx`'s `&column=` is not read.
- **Two glows, one hue**: `s.ac` at 34 on the media's sleeve and its marked tile. Four backdrop
  blurs; read each fill's opacity before transcribing a blur.
- **`arch 7` folds onto layout 4 for `pricing` and `testimonials` alone** (`CATS[].n` 8; the
  digest runs `arch < CATS[c]`), so a theme-1 digest of those two categories differs in
  `_arch_7_` files as well as `_arch_3_`. `media` and `repertoire` (n 7) stop at arch 6, and
  the other five body categories and the header have no fold partner at 3.
- **Do not give `shots.mjs` and `digest.mjs` the same `OUT` label.** Both write to
  `$OUT/<label>/`, so the eleven before-pictures showed up as eleven phantom `cmp` diffs in
  the themes-0,2,3,4 run (all `.jpg`, none a digest row). Keep the shots under their own
  `OUT`, or a label the digest never uses.

Settled in section 1 (the header):

- **The first layout-4 block: `if (s.lime) { … return }` at the head of `HeaderV3`, after
  `desk` / `tab` / `z` / `u`** — HeaderV1's and HeaderV2's seat. The tree is Retro's twin's
  node for node (nav, avatar tile, identity panel with the chips at its right at 1440 and
  under it narrow, the seal), and every leaf changes face, ink or box, so a block; the diff
  is 206 / 6, and the six removed lines are the two additive prop sites below. Retro's
  `cream` / `mustard` / `ink`, its `T` table, `Grain`, `Checkerboard` and `SCRIM.stack` are
  not read.
- **No Device override on any of the three instances, and no box token.** `get_variable_defs`
  is the ramp at all three widths (display-xl 200 / 120 / 72 = `s.dispXl`, list 24 / 19 / 18,
  label-lg 32 / 21 / 14, label-xs 20 / 14 / 12, label-md 24 for the links); Display/Title —
  the kicker — is the frames' `u(36)` / 28 / 26. **The .75 leading on Display/XL is the
  frame's own here** (read off the text nodes at all three widths), so Retro layout 4's
  "Display/XL's .75 is Retro-only" is about the *flat four*, not Lime. Every box is raw:
  radius 26.95 on the tile, 85 on the capsule, `radius/chip` 6 on the location square and
  the chips, insets 56 / 30 / 10 round the nav and 56 / 30 / 20 round the block, 28 / 30 /
  30 over and 50 / 60 / 40 under, gaps 40 and 30 and 18.
- **The nav is `NavBar`'s Lime capsule, reused whole** — this frame's `Frame 49` is the
  hero's Figma component (10 / 10 / 10 / 20 in a radius-85 `sem/bg` bar, gap 30, the
  wordmark filling and the links + pill hugging right; `BACKGROUND_BLUR` 44 over an opaque
  fill, dropped), so HeaderV3 passes nothing but two things this master states that
  HeaderV0's did not. (1) **The 390 name is `s.labelLg`, 14** — this instance is in the
  page's own Mobile mode where the hero's 390 master sat in Tablet, and NavBar carried
  that 21 as a literal; it now takes an additive **`nameSize`** (`pill`'s precedent). (2)
  **The 390 pill is the desktop pill at × 0.712**, 94.37 × 38.44 — type a raw 11.39 in
  Bebas Neue, disc 32.75, padding 3.56 / 14.95, gap 7.12 — where `BookPill`'s `small` is
  × 0.62; it goes through `pill={{ size, disc, style }}`. At 1440 and 768 the pill is
  BookPill's Lime defaults exactly (130.5 × 44.3 and 142.1 × 54 against 158 × 0.82 and
  142 × 54). The desktop links take NavBar's `clamp(12px, 100cqi / navEms, s.list)`, whose
  cap is the frame's Label/MD 24 × 0.82; 768 keeps the burger beside the pill at 23, 390
  at 10, both the frames' own.
- **The seal is `SealBadge`'s Lime disc in another scheme's inks, and it changes colour
  between widths (open question 4).** `Frame 247` nests **Scheme 4** at 1440 and 768 — a
  pale `sem/bg` `#F2FFD0` disc with `sem/text/1` marks in ink — and `Frame 248` at 390
  is a **lime disc with ink marks**, Scheme 3's pair, read off each master's fill. Its
  tree is the bio's / footer's / calendar's component exactly (Group 9, the 120 ring, the
  name twice, two 14 equator rings), so the Lime branch gained an additive **`scheme`**
  prop (1 default, 3 = `s.ac` / `s.bg`, 4 = `s.tx` / `s.bg`) rather than a third
  drawing; `classic` stays the layout-3 bio's route. Positions are the emitted `left`
  plus half the rotated box, confirmed by a pale-pixel scan of the renders (centre
  1316.5 / 230.5 at 1440, 653.5 / 775.5 at 768, 326.5 / 176.5 at 390): **768 and 390 land
  on Retro's own numbers** (bottom 185.46 / right 51.17; top 134.35 / right 20.65), and
  1440 sits 8 further right and 31 lower (top 168.46, right 60.11, × 0.82).
- **The chips' light seat is pale, not lime.** The Tags instance is Scheme 1 at every
  width, but its light chips fill `scheme/1/text3` — `#F2FFD0` sampled on all three renders
  — lettered `sem/active/text` `#0D1F03`, and the dark ones `s.box1` lettered `s.ac` (the
  third chip's `#C7FF3C` is a leaked token, layout 2's bio reading). So the row is inlined
  over `[s.box1, s.tx]` / `[s.ac, s.activeFg]` by seat parity rather than through
  `TagChips`, whose `vm.chips` light seat is lime — a lime chip on this lime floor would
  vanish. Label/XS in `s.ui` at 5 / 11 (× 0.82), `radius/chip`, gap 8; 344 wide at the
  panel's right corner at 1440, the measure narrow.
- **Scheme 3 by node, two literals.** The instance's `sem/bg` is `s.ac` and its `sem/text/1`
  is `s.bg`, which is why the location reads in **ink** on the lime and the seal's marks
  are ink. `lime3` `#CCFA61` is the avatar's well and its 3.04 inside ring at 1440 and
  768 (`sem/state/inactive/border`); **at 390 the ring is `sem/stroke/2`, ink**. `lift`
  `#D9FF7F` (Scheme 3 `sem/box/2`, layout 1's form literal) is the location's 14 square.
  The fade is the frame's two stops verbatim: `s.ac` at the floor to `#15180F00` at the
  top. The fill under the photograph is `sem/box/3` `#9CCF23` and is seen by nothing; an
  emptied slot takes `Photo`'s dark well so the pale type reads (`noimage=1` checked).
- **The 1440 photograph is mirrored, and that is a reversible product call.** The fill is
  `CROP` at 1440 with `[[-1, 0, 1], [0, 0.9375, 0.03125]]` — a centred cover, flipped —
  where 768 and 390 are `FILL` and unflipped (read off `scaleMode`; the layout-3 header's
  lesson the other way round). It is drawn as `scaleX(-1)` on the desktop `Photo` alone,
  because the composition depends on it: the subject stands at the right, clear of the
  name. **The cost is an artist's upload mirrored at desktop and not at the narrow widths**
  (a logo on a T-shirt reads backwards at 1180 and forwards at 768). Named in the block;
  one line to remove if the user prefers the upload the right way round. Open question 6.
- **Measured against the masters' content edges**: desktop capsule 60.6 tall at 23
  (74 / 28 × 0.82), 1088.2 wide, brand 26px, pill 130.5 × 44.3, avatar 92.3 × 97.3 at 234.9
  (286.32 × 0.82), kicker 29.52px at 365 (445 × 0.82), name 164px on two lines at 412.3
  (503 × 0.82) and 246 tall (300 × 0.82), location at 673 (821 × 0.82), chips 16px on two
  rows at 852 / 633.8 (1040 / 772 × 0.82), seal box 137.5 at 1010.6 / 120.8 (1233.4 / 147.3
  × 0.82), section 738; 768 capsule 708 × 74 at 30 / 30, pill 142.1 × 54, burger at 692,
  avatar 113 × 119 at 567.8 (567), kicker 28px at 726.8 (726), name 120px one line at 775.6
  (775) and 90 tall, location at 883.6 (883), chips 14px one row at 936.4 (936), seal box
  at 570.3 / 692 (exact); 390 capsule 370 × 58.4 at 10 / 30, pill 94.4 × 38.4 at 229.6
  (229.6), burger at 334 (334), avatar 116 × 119 at 416.6 (416), kicker 26px at 575.6
  (575), name 72px one line at 622.2 (622) and 54 tall, location at 694.2 (694), chips 12px
  on two rows at 745.8 (746), seal box 113.7 at 270 / 120 (exact). `live=1`: the links,
  Listen and the pill are `<a href="#…">` (the canvas anchors carry no href, the pill a
  span), and the burger opens a six-link panel at 768 and 390. No page errors. Digest at
  themes 0, 2, 3 and 4: zero differing files; theme 1: exactly header arch 3 at three
  widths.
- **Verified in the builder** (one puppeteer script, deleted): the setup modal offers four
  Lime cards; card 4 alone draws the pale `#F2FFD0` seal disc and the mirrored photograph
  and no `repeating-conic-gradient`, while card 1 keeps its reticle, card 2 its `#C7FF3C`
  place card and card 3 its `#A6E22E` glow. After *Use this header*, *Back to page list*
  (`button[aria-label="Back to page list"]`) reads every body row at "layout 4" and the
  footer at "layout 1"; the published page stacks header, bio, media, gallery, repertoire,
  map, pricing, calendar, form, testimonials, footer at 1440 with each root's top on the
  previous root's bottom (no composed row), and its text carries the layout-4 tells
  *All songs · A–Z*, *Book Us*, *Snaps from the night* and *Client success stories*. In
  the popup all ten header anchors (nine nav, Book Now) called `scrollIntoView` on
  matching ids, Book Now on `form`; at 390 and 820 (a fresh tab each) the burger stands in
  the capsule (370 / 708 wide) and opens a nine-link panel whose links scroll.

## Open questions

1. **The lens where the video was.** Media's foot arc and the gallery's head arc are both dark
   and meet directly on our page, giving a 44 + 44 dark lens between the olive and lime bands —
   what the frame would show with its video frame deleted. Default: keep each seam in its
   frame's own colour and name the diff; the media session decides, and the gallery session
   checks the meeting in the editor with the `[--ac]` rect walk. Drawing the media's foot in
   the gallery's lime is the alternative, and no master draws it.
2. **`ArcEdge` inside a bled sheet.** Layout 1's three arc callers (media, map, form) draw no
   sheet of their own: the **root** paints their bands through its `limeBand` / `limeLight`
   flags (`(s.me || s.te) && s.v0 && s.lime` and `(s.mp || s.fo) && s.v0 && s.lime`), the root
   keeps its padding, and `ArcEdge` reaches its edge by offsetting itself `-padX` / `-padY`.
   Every `v3` band is the opposite: a sheet painted **in the branch** that has already
   cancelled the root's padding with a negative margin (Retro's written-out bleed), so an
   `ArcEdge` placed inside one would offset twice. Retro layout 4's gallery met the same thing
   with `TornEdge` and took `bleed={false}`; `ArcEdge` has no such prop. Two answers: widen
   the root flags per layout (which needs three grounds at layout 4 — lime, olive, pale — and
   the testimonials stand on a different one at `v0` and `v3`, so it is not one `|| s.v3`),
   or keep the sheets in the branch, layout 3's "no root flag widens", and give `ArcEdge` an
   additive `bleed` prop mirroring `TornEdge`'s (every layout-1 caller untouched). The
   default is the second. The media session settles it and verifies with a rect read that the
   arc spans the sheet at all three widths and `document.documentElement.scrollWidth` does
   not move.
3. **The bio's `layouts[3]` seed.** The frame fills the whole `fa453f7d` source into a portrait
   box at `FILL`, which `limeBioStage` (the whole source, layout 3's landscape seed) should
   reproduce as a centred cover where `limeStage` (the layout-1 arch's portrait slice) may
   crop a different band. Expected answer: `SEEDS.Lime.layouts[3].bio = limeBioStage`, one line
   and no new file; the bio session decides by the render diff layout 3's section 2 used, and
   `photos.js`'s comment gains a sentence either way.
4. *Settled in section 1 — `SealBadge`'s Lime branch with an additive `scheme` prop (4 at
   1440 and 768, 3 at 390); see its Conventions.* **The 390 header seal.** A lime disc in the 390 render where the two wide masters draw a pale
   Scheme 4 disc, and no explicit scheme node on it. Whether it is `SealBadge`'s Lime branch
   (the dark disc with rings) or the §10.2 `classic` seal in a third ink pair is the header
   session's read of the node's children and fills; write the answer under *Conventions*,
   since it is the first Lime seal to change colour between widths.
6. **The desktop header photograph is mirrored.** The 1440 master's `CROP` transform flips
   the photograph and the fit follows it (`scaleX(-1)` on the desktop `Photo` in HeaderV3's
   Lime block), so an artist's upload reads backwards at 1180 and forwards at 768 and 390.
   Shipped because the composition stands its subject at the right, clear of the name;
   reversible in one line if the user would rather keep every upload the right way round,
   at the cost of the seeded page's subject standing under the name at desktop.
5. **The gallery's head seam is `sem/box/3` `#101309`, not `sem/bg`.** A hair off the page
   ground it meets, and the only seam on the page not bound to a neighbour's `sem/bg`. Whether
   it is drawn in `s.box3` (the frame's binding) or `s.bg` (the neighbour's ground, layout 1's
   rule) is the gallery session's call after reading the render's edge; a 5-in-255 difference
   on a 44px arc is unlikely to show either way, and the lens (question 1) is the place it
   could.
