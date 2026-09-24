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
| 2 | `bio` | `964:72857` *(Section `964:72850`, head `964:72851`, tags `964:72854`)* | 664 × 720 | `971:5307` *(Section `971:5300`, head `971:5301`, tags `971:5304`)* | 708 × 720 | `977:8875` *(Section `977:8868`, head `977:8869`, tags `977:8872`)* | 370 × 536 | `964:72519` / `964:76446` / `971:14479` | done `55ac9b5` (comment fix `e260703`) |
| 3 | `media` | `964:72864` *(band `964:72858`, head `964:72860`)* | 1440 × 671 | `971:5431` *(band `971:6533`, head `977:10286`)* | 768 × 569 | `977:9005` *(band `977:8999`, head `977:9001`)* | 390 × 836 | `964:72526` / `971:15190` / `971:14834` | done `2b9c847` |
| 4 | `gallery` | `964:72909` *(wrapper `964:72874`, head `964:72875`)* | 874 × 646 | `971:5597` *(wrapper `971:5562`, head `971:5563`)* | 768 × 594 | `977:9171` *(wrapper `977:9136`, head `977:9137`)* | 390 × 586.3 | `964:72815` / `964:78491` / `977:8142` | done `9716713` |
| 5 | `repertoire` | `964:72916` *(Section `964:72911`, panel `964:72912`)* | 1208 × 536 | `971:5604` *(Section `971:5599`, panel `971:5600`)* | 608 × 582 | `977:9178` *(Section `977:9173`, panel `977:9174`)* | 310 × 650 | `964:72822` / `964:78509` / `977:8166` | done `5d7d7a4` |
| 6 | `map` | `964:72924` *(Frame 319 `964:72918`, head `964:72920`)* | 1440 × 747 | `971:5612` *(Frame 319 `971:5606`, head `971:5608`)* | 768 × 871 | `977:9186` *(Frame 319 `977:9180`, head `977:9182`)* | 390 × 680 | `964:72830` / `964:78599` / `977:8322` | done `1bffd9c` |
| 7 | `pricing` | `964:72926` | 1440 × 546 | `971:5613` | 768 × 809 | `977:9187` | 390 × 837 | `964:72831` / `964:78656` / `977:8440` | done `8546dbb` |
| 8 | `calendar` | `964:72939` + wizard `964:72938` *(Section `964:72927`, Frame 324 `964:72928`)* | 478 × 536 + 680 × 536 | `971:5626` + `971:5625` *(Section `971:5614`, Frame 324 `971:5615`)* | 608 × 505 + 608 × 479 | `977:9200` + `977:9199` *(Section `977:9188`, Frame 324 `977:9189`)* | 350 × 496 + 350 × 474 | `964:72844` + `964:72843` / `964:79434` + `964:79037` / `977:8514` + `977:8513` | done `8163fcd` |
| 9 | `form` | `964:72940` | 1440 × 795 | `971:5627` | 768 × 1024 | `977:9201` | 390 × 971 | `964:72845` / `964:79477` / `977:8663` | done `ff6b4e1` |
| 10 | `testimonials` | `964:72941` | 1440 × 716 | `971:5628` | 768 × 642.4 | `977:9202` | 390 × 624.4 | `964:72846` / `964:79536` / `977:8764` | done `ebbf007` |
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
| map | `Frame 319` Scheme 1 (page); the instance fills `#15180F` | `Map Viewport` **Scheme 3**; the raster is `e089bd11` at `FILL`. *Section 6 read the panel: the numerals and every other text on it are `sem/text/2` **pale**, not lime; only the cells' rings are* |
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
  with lime rings and pale numerals (section 6: `sem/text/2`, not lime), its ticker an olive
  capsule (not `pillBg`), its plate dark with lime rings and lime zoom squares. Layout 3's map
  recipe is the nearest fitted thing.
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
     and all `_arch_3_` — three files. (`pricing` and `testimonials` offer an eighth picker
     row in `data.js` that folds onto layout 4, but `digest.mjs`'s own `CATS` table caps
     every body category at 4, so no `_arch_7_` file is ever rendered — the *Conventions*
     bullet below, corrected in section 7.) A theme-1 diff in any `arch_0`,
     `arch_1` or `arch_2` file is a regression of a merged pass. Expect the rotating seal's
     `<text>` / `<textPath>` rows to differ between any two walks of the same build (Retro
     layout 4's sweep note): diff line by line before reading a mismatch as a regression.
7. Commit with the section named in the subject.
8. Set the row's Status to `done <sha>`, add anything the next section needs to *Conventions*,
   and commit that too.
9. **Stop and hand off.** Say the section is closed and that this is the moment to `/clear`,
   then print the next section's opening prompt as a filled-in fenced block. **After section
   10 there is no next section** — the footer is out of scope — so that handoff opens *The
   end-of-pass sweep* below instead, with the same reading list and the sweep's six items
   in place of a node table:

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
   and theme 1 may differ only in `<cat>` arch 3, at three widths.

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

**Done: `047d915` (docs, comments, this plan, `plans/README.md`) and `2cd0e41` (the
`index.html` refresh).** What each item came to is under *Learned on the end-of-pass sweep* at
the foot of *Conventions*; the list is kept as it was run.

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
   A fourth, from section 4: the gallery paragraph's "**Layout 4** … carries **no active
   mark**: its Figma frame rings all six of its thumbnails identically" is Retro's reading;
   Lime's wide masters ring the active thumb at 3px (below), so the sentence wants a Lime
   clause. A fifth, from section 6: the events map paragraph's "**Layout 4** is the pager
   alone: its whole gig list is one **mustard** ticker" is Retro's wording — under Lime the
   ticker is an olive `box1` capsule. A sixth, from section 7: the pricing paragraph's
   "**Layout 4** … divided by a 4px rule in **`vm.tierRow.card`**" and "one per feature over
   **`vm.tierFeatSeats`**" are Retro's — under Lime the rule is `s.ac` read directly (layout
   3's `tierRow`-not-read rule) and the feature seats are the block's own box1 / lime pair.
   A seventh, from section 9: the enquiry form paragraph's "**Layout 4** … a display head over
   a 4px **mustard** rule" and "Its boxes' outline and its step rules are **`vm.formRule`**,
   which is `vm.tierRow.card`" are Retro's — under Lime the head rule and the step rules are
   1px of `s.stroke1`, the box ring is `s.ac`, and a refused box rings in 2px of `s.tx`.
   An eighth, from section 10: the testimonials paragraph's "**Layout 4** … the section's
   second full-bleed sheet and its first **mustard** one — `s.pillBg` with a `pillFg` head"
   and "its cost is that the **rust** card is seat four" are Retro's — under Lime the sheet
   is Scheme 4's pale `s.tx` with `s.bg` ink, the head `s.dispLg` at every width, and the
   fourth seat is the page ink in a pale-disc register.
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
- **`arch 7` folds onto layout 4 for `pricing` and `testimonials` alone** (`data.js`'s
  `CATS[].n` is 8 there) — **but `digest.mjs` never renders it**: the script carries its own
  `CATS` table with `pricing: 4` and `testimonials: 4`, so no `_arch_7_` file exists on either
  side of a `cmp` and a theme-1 digest of those two categories differs in exactly three
  `_arch_3_` files, like every other body category (section 7 read the script; the sentence
  this replaces was written from `data.js`). `media` and `repertoire` (n 7) stop at arch 6 in
  `data.js` and at 4 in the script for the same reason.
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

Settled in section 2 (the bio):

- **The second layout-4 block: `if (s.v3 && s.lime)` ahead of `Bio`'s `if (s.v3)`**, layouts
  1–3's seat for this section. `Bio` has no state; the whole live seam is `ListenLink to=`.
  The tree is Retro's twin's node for node (the wrapper's eyebrow / display head / Genres
  chips beside or over the card, the photograph filling the card, the frosted panel on its
  floor with the name, the meta row and the prose box), so the block restates that structure
  and changes the dress, which reaches nearly every leaf. Diff 179 / 0 in `EncoreSection.jsx`
  plus a comment-only hunk (Retro's `.89` note, which named Lime's layout 4 as unfitted);
  `photos.js` is one seed and four comment lines. Retro's `T`, `band` / `cream` / `mustard` /
  `edge` / `under` are not read.
- **The instance changes scheme between widths, and the wells move with it** — the plan's
  first width trap, met on its first section. Scheme 1 at 1440 (`use_figma`
  `explicitVariableModes` 187:1), Scheme 2 at 768 and 390 (187:7): the ground under the
  photograph is `sem/box/3`, **`s.box3` at 1440 and `#263020` narrow**, and the prose box
  `sem/box/2`, **`s.box2` at 1440 and `#43523B` narrow** (the media card's and the
  testimonials' literals, block-local). `get_variable_defs` on each master says so too
  (`sem/box/2` `#394732` / `#43523b`), so this time the two sources agreed; the node's fill is
  still what was transcribed. The panel is `#2E3928` (`s.box1`) at **.71** — written
  `${s.box1}B5` on the panel itself, no overlay — under a `BACKGROUND_BLUR` 54 at every
  width (CSS `blur(27)`, Retro's own spelling; it survives `ScaledPreview`, Retro layout 4's
  note). The Section is Scheme 3 (187:8): the band is `s.ac`, the head, eyebrow and chip
  labels `s.bg`.
- **No `T` table, no box token.** `get_variable_defs` is the ramp at all three widths
  (display-sm 50 / 40 / 32, body-md 14 / 13 / 13, body-lg 16 / 15 / 15), and the head frame's
  text nodes give display-xl 200 / 120 / 72 at **.75** — the header session's reading holds
  for a second Bebas display head, three tight lines at 1440 with no collision — and
  label-xs 20 / 14 / 12 in Chakra Petch. Radii are raw: 55 card, 27 panel, 13.5 prose box,
  `radius/chip` on the chips (passed as `s.radiusChip`, the layout-1 header's spelling — it is
  already a px string, so `u()` on it prints 0).
- **The boxes are Retro's twin's but for three.** 116 / 60 / 30 over the sheet and 56 / 30 /
  10 either side (the Section's own padding), the stage's 30 / 30 / 10, the panel's flow at
  30 / 30 / 20 (the 390 master's mechanism, Retro's call), the prose box's 20. What moves:
  the narrow Sections stack the head and card at **40 and 15** (`itemSpacing`, Retro's 40 /
  40) and the 390 head's own gap is **15** (Retro's 30); the prose box's paragraph gap is the
  node's **10** (Retro's 12 was a guess); and **the desktop columns meet at the midline** —
  the Section's `itemSpacing` is 0 and the head's 664 ends where the card's begins
  (56 + 664 = 720), so the air beside the head is its unfilled 572.9 measure, not a gutter,
  and Retro's "56 apart" was Retro's reading. Written as two `minmax(0, 1fr)` grid columns:
  as `flex: 1 1 0` halves the padded card came out 24.6 wider than the head (the enquiry
  form's layout-3 trap, and Retro's branch still carries it).
- **The Genres label is not drawn, and the light chips' box vanishes.** The Tags instance is
  Scheme 1 at every width, so "Genres" is `sem/text/1` — `#AFE335` — on the `#AFE335` band
  and invisible in all three renders (the 390 instance carries no label frame at all, 58
  tall), and the light chips fill the same lime, so only their ink label shows — the tags
  row's "one chip draws its box invisible", which `TagChips` over `vm.chips` reproduces
  as it is (box1 / lime seats, lime / `#0D1F03` inks, 5 / 11 × 0.82). The cost is the 768
  head at 322 against the frame's 361 (the frame spends 24 + 16 on the invisible line; 1440
  is `space-between` over the card, so nothing moves there). Inking the label `s.bg` is the
  one-line reversal if a legible label is wanted. This is the opposite call from the
  header's chips, whose light seat the render showed **pale** on the photograph.
- **Open question 3's answer: `SEEDS.Lime.layouts[3].bio = limeBioStage`, no new file.**
  The fill is `fa453f7d` at `FILL` with `limeStage`'s slice transform, which FILL ignores
  (layout 3's lesson), so the render is the whole source cover-cropped into the portrait
  box: a centred PIL cover of `lime-bio-stage.jpg` into 664 × 720 diffs **2.7** in 255 from
  the 1440 render over the card's top 385 (above the panel) where `limeStage` diffs 27.
  Centred, no `objectPosition` (Retro's top anchor was for `stage.jpg`'s 4 : 5). `d` in
  `sectionVm`'s `defaultImage` call is the 0-based design index, so `layouts[3]` is layout 4.
- **The 1px `#000000` ring is a last-child overlay** (`inset 0 0 0 1px`) at 1440 and 768 and
  none at 390 — read off `strokes` / `strokeAlign: INSIDE` per master; `Photo` fills the
  card at `inset: 0`, so an inset shadow on the card itself would paint under it.
- **Measured against the masters' content edges**: desktop eyebrow at 95.1 (116 × 0.82), h2
  at 183.5 and 369 tall (450 × 0.82) at 164px on three lines, chips 64.7 on two rows ending on
  the card's foot at 685.5, card 544.1 × 590.4 at x 590 (664 × 720 × 0.82 = 544.5 × 590.4),
  panel 494.9 wide (604 × 0.82 = 495.3) and 282.8 tall against 305 × 0.82 = 250 (the seeded
  second paragraph), name 24.6 in, meta 78.7 down the panel (96 × 0.82), prose box at 119.8
  (139 × 0.82 = 114, the named ~6); 768 eyebrow 60, h2 at 107.6 (108) and 180 tall (180),
  chips at 317.6 (the frame's 358 less the 40 of label), card 708 × 720 at 420.9 (461), panel
  648 × 305.5 (305), name 30, meta 86 (86), prose 135.5 (139); 390 eyebrow 30, h2 at 60.1
  (60) and 108 tall (108), chips at 183.1 (183), card 370 × 536 at 256.3 (256), panel 350
  wide, 385 tall against 306 (the seeded meta wraps to two lines with `since` filled and the
  seed has two paragraphs — Retro's named diffs), name 20, meta 68 (68), prose 135. `img`
  rect equals the card rect at all three widths. `live=1`: Listen is `<a href="#media">`, a
  span on the canvas; the one canvas pointer is `ListenLink`'s own unconditional cursor,
  shared with Retro. `noimage=1`: the `box3` well under the panel with `KM` in `s.tx`.
  `since=` holds. No page errors. Digest at themes 0, 2, 3 and 4: zero differing files;
  theme 1: exactly bio arch 3 at three widths (bio has no fold partner, and the new seed is
  read at `d` 3 alone).

Settled in section 3 (the media player):

- **The third layout-4 block: `if (s.v3 && s.lime)` ahead of `Media`'s `if (s.v3)`**, layout
  1's seat for this section. Every piece of the seam is hoisted (`<audio>`, `at`, `now`,
  `sleeve`, `goTo`, `toggle`, `onPick`, `playing`), so the published player needed nothing
  new, and `{audio}` rides at the sheet's foot as Retro's does. The tree is Retro's twin's node
  for node (band, head, sleeve column with the now-playing block and transport, tile grid) and
  nearly every leaf changes dress, so a block. Diff 264 / 5 in `EncoreSection.jsx`: the five
  removed lines are three of `ArcEdge`'s (its signature and two style lines, below) and two
  Retro comment lines that named Lime's acid green on the cream sheet, a claim the block
  retires. Retro's `T`,
  `cream` / `ink` / `rust` / `mustard` / `bar` / `olive`, `Checkerboard` and lucide's
  `SkipBack` / `SkipForward` are not read.
- **Open question 2's answer: `ArcEdge` took `TornEdge`'s `bleed` prop, additive, default
  `true`.** `bleed={false}` is `left: 0, width: 100%, [side]: -1px` — the sheet's own edges,
  keeping the helper's documented pixel into the neighbour — and the sheet takes
  `position: relative`. No root flag widens: the band is painted in the branch, Retro's `v3`
  way. The theme-1 digest is the proof that layout 1's three callers did not move (media,
  map and form `arch_0` byte-identical). Every later `v3` band with a seam (the gallery's
  head, the repertoire's foot) takes the same prop.
- **Open question 1's answer: each seam keeps its frame's own colour, and the lens is named.**
  The band parents both vectors: the head one fills Scheme 1's `sem/text/1` (`s.ac`, the bio
  band's lime) at y −1, the foot one `sem/bg` (`s.bg`, the page) turned 180°, read off the
  nodes at all three widths (the 1440 foot vector nests Scheme 5, whose `sem/bg` is the same
  `#15180F`). So our page, which carries no video band, shows the media's dark foot arc meeting
  the gallery's dark head arc directly — a 44 + 44 dark lens between the olive and the lime,
  which is what the frame would show with its video frame deleted. *(Superseded, user call
  2026-09-18: the media's foot arc is no longer drawn, so the band ends square and the
  gallery's head arc, recoloured to the media's olive `s.box1`, is the only seam — no lens.)* Named in the block; the
  gallery session checks the meeting in the editor with the `[--ac]` rect walk. The 390
  vectors are the leaked 576.56 at x −93 and the 768 ones are 768 wide; `ArcEdge` stretches
  to the sheet and `scrollWidth` does not move at any width (checked).
- **The insets are the band's and the instance's, added up — Retro's media rule with Lime's
  numbers.** The band pads 156 / 100 / 100 over the head and 100 / 50 / 100 under the
  instance; the instance pads 56 / 56 / 10 inside that. So the sheet's insets are 156 / 100 /
  100 at the head and 156 / 106 / 110 at the foot, head-to-player is 56 / 56 / 20 (at 390
  the band's own 10 gap on the instance's 10), and the sums land on 1043 / 791 / 1094. The
  horizontal `calc(surplus + 56 / 56 / 10)`, the 308 column, the 112 / 56 column gap, the
  tile ratios and the sleeve's `flex: 1 0 0` over the 302 / 370 floor are Retro's to the
  pixel: the desktop column sums 56 + 404 + 40 + 62 + 40 + 13 + 56 = 671, so the sleeve
  fills as it does there, 15 shorter for the taller now-playing block (Display/Title 40 over
  Body/SM 18 against Retro's 26 / 17).
- **The second width trap, met: the 390 instance is in `Device: Tablet` (770:1).** The head
  stands outside the instance in the page's own mode, so it is `s.dispLg` (130 / 81 / 54 at
  .89, `get_variable_defs` on the three head frames) in `s.ac`; the instance's four sizes are
  the ramp at 1440 and 768 but the 768 ramp's at 390 — Display/Title 28, list 19, body-sm 13,
  chip 12, where `s.list` / `s.bodySm` / `s.chip` give 18 / 12 / 11. So the block carries a
  small `tk` table, the layout-1 hero's `tk` precedent, and Display/Title is a literal either
  way (`s.title` is the heading string). The head's 1019.18 measure is the leak Retro
  declined; **the seeded head holds one line at 390 here**, unlike layout 3's media — the
  bled sheet's own 10 inset gives it the frame's 370, not the root's 346.
- **Scheme 2 by node, and three of its tokens are other keys.** The play glyph is Scheme 2's
  `sem/bg` = **`s.box1`** (not `s.bg` or `s.acFg`); the bar's track is Scheme 2's `sem/box/1`
  `#394732` = Scheme 1's **`s.box2`** (layout 2's media reading); the sleeve's well is
  `sem/text/3` = `s.tx` and the tiles' is `sem/bg` = `s.box1`. Everything else: head,
  now-playing title, transport glyphs, play disc, the bar's dot and the tile sublines `s.ac`;
  the artist line, the two clocks (Body/Chip at `-0.06em`) and the bar's fill `s.tx`; the
  tile titles raw `#FFFFFF`, as Retro's are. The frame's playhead therefore reads here — pale
  on a `box2` track with a lime dot — so layouts 1 and 2's named departure on the bar is not
  owed. The instance carries a hidden `#141414` fill on `Left` and a hidden `#D4D4D4` stroke
  on every tile (the plan's "mixed weight" — 1 / 0 / 0 / 0, `visible: false`); neither is
  drawn.
- **Two glows, one hue, both confirmed off `effects`**: `INNER_SHADOW` 34, spread 0,
  `#AFE335` = `s.ac`, on the sleeve (an overlay at radius inherit, no border where Retro's is
  3px rust) and on tile one — drawn on the scrim overlay at `i === at`, Retro's seat rule with
  a glow in place of the 3px ring, still a shadow so no photograph is inset (`img` rect ==
  tile rect at all three widths, asserted). Radius 50 on both, tile padding 30 (Retro's 20),
  48 disc, 14 transport gap, 3 bar, 4 text gaps — all raw, the twin's. The transport's
  prev / next are the same 16.03 × 8.39 group layout 1 transcribed as `LimeSkip`, with layout
  1's finger-target `skip()` recipe; Play / Pause stay lucide at Retro's 22 (the frame types
  ▶ and the live state needs the Pause it never draws).
- **Measured against the masters' content edges**: desktop section 854.8 (1043 × 0.82 =
  855.3), head at 127.9 (156 × 0.82) and 95.2 tall (116 × 0.82), column at 269 (328 × 0.82),
  sleeve 252.6 × 330.9 (308 × 404 × 0.82 = 252.6 × 331.3), now-playing 50.7 (62 × 0.82),
  disc 39.4, clock row at 716.2 (874 × 0.82 = 716.7), grid at 390.3 (476 × 0.82) with tiles
  237 × 220.8 (289.33 × 269.5 × 0.82), arcs 36.3 deep at −1 and 819.5 spanning 1180; 768
  section 791.1 (791), head at 100 and 72.1, column at 228.1 (228), sleeve 308 × 312, now-
  playing 53 at 580.1 (580), clocks at 673.1 (673), grid 292 × 457 at 420 with tiles 136 ×
  139; 390 section 1095 (1094 — the 123.33 tile ratio, Retro's reading of the frame's 123),
  head one line at 100, sleeve 370 × 302 at 168, now-playing at 490 (490), clocks at 563
  (563), grid 370 × 390 at 595 (595) with tiles 180 × 123.3. The canvas has zero pointer
  cursors and no `<audio>`. `live=1` at desktop and 390 (puppeteer,
  `--autoplay-policy=no-user-gesture-required`, probe deleted): a tile click plays its track
  and moves the glow, the disc pauses and resumes (polygon ↔ rect glyph), Next wraps 5 → 1,
  Prev wraps 1 → 5, a second click on the loaded tile pauses. `n=0` prints *No tracks yet.*
  beside the sleeve at its floor (253 × 206 at desktop, 308 × 251 at 768, 370 × 302 at 390);
  `n=1` and `n=2` hold the floor; `n=8` grows the sleeve to 568 / 471 (Retro's named cost)
  and the 390 section to 1228. No page errors. Digest at themes 0, 2, 3 and 4: zero
  differing files; theme 1: exactly media arch 3 at three widths (media stops at arch 6, so
  no fold partner).

Settled in section 4 (the gallery):

- **The fourth layout-4 block, and the first *inside* its branch: `if (s.lime)` within
  `Gallery`'s `if (s.v3)`, after `from`** — layout 1's gallery seat. `pick` is hoisted but
  `slots`, `active`, `go`, `shown` and `from` are the branch's, so the block sits after them
  and shares the seam whole; the published thumbs, discs and 390 window needed nothing new.
  The tree is Retro's twin's node for node (the wrapper's head column beside or over the
  instance, the 20-padded card, the 121.028 rail of 67.748 thumbs 12 apart, the two 55.514
  discs 10 apart, the 390 strip over two 180 pills), and nearly every leaf changes dress, so
  a block. Diff 198 / 0 in `EncoreSection.jsx`. Retro's `T`, `band` / `cream` / `mustard` /
  `mount` / `disc` / `glyph`, `hard`, `soft`, `tilt`, `Grain` and `TornEdge` are not read.
- **The one `use_figma` walk per master answered every box, and only two move from Retro's
  twin.** Insets 56 / 30 / 24·10·40 on the instance, 100 over the head on the wrapper and 56 /
  30 / 0 round the head frame, so the sheet pads 156 / 130 / **100** over (Retro's 390 is 60)
  and 56 / 30 / 40 under, with the head-to-row gutter 112 / 60 / 24 as Retro read it. The 390
  card is **337** tall (Retro's 343.14). The 534 row, the 50 gutter, the 454 head column, the
  36 / 36 / 10 head gap, the 20 card padding and every rail number are the twin's, through
  `u()`. No `T` table: `get_variable_defs` returns colours and `border/default` only (the
  same seven-entry list Retro's component gave), so the type is read off the text nodes and
  is the ramp — `s.eyebrow` 15 / 12 / 11 in Inter Bold at 1.3, `s.dispLg` 130 / 81 / 54 at
  .89 — at **every** width, where Retro's 768 arm is `s.h1`.
- **Scheme 3 by node, and `get_variable_defs` lied about the ground for the second time on
  this component.** All three masters answer `sem/bg` = `#f2ffd0`; every wrapper's and
  instance's own `fills` is `#AFE335` (Scheme 3's `sem/bg`, `s.ac`), the lime the render shows
  — Retro layout 4's `#d8a227` / `#5B5E2E` case again, on the same node, in the other mode.
  Both head texts are `#15180F` (`text/2` and `text/1` are one ink under Scheme 3). The card
  frame has **no fill and `rotation` 0** — Retro's ink mount and −2° become four 18 × 18
  corner brackets, 4px of `sem/text/1` on two sides, `strokeAlign INSIDE`, flush in the
  card's corners — and the photograph is radius **50 / 50 / 4** on a `sem/box/3` `#9CCF23`
  well (block-local `well3`; the header's fill under its photograph, seen here through an
  empty slot). Thumb wells are `sem/tag/1/bg` = `s.bg`; the discs are Scheme 4's `box/3`
  `mist` `#D5E3B2` (layout 1's literal) in a 0.754 `sem/bg` `#F2FFD0` = `s.tx` inside stroke,
  radius **10** at the wide widths and **60** on the 390 pills; the glyph is `sem/text/1`.
- **Lime's wide masters mark the active thumb, where Retro's did not.** Every thumb is
  stroked inside in `sem/text/1` at 1px except the **fourth at 3px** (`border/default`) on
  the 1440 and 768 masters — and the fourth is `galActive()`'s slot 3, the spotlight. The
  390 master strokes all six at 4px (its spotlight's thumb is off-page, so it has nothing
  to mark). So the ring follows `active` at 3 / 1 on the wide rail and is 4 on every 390
  tile: **not `s.live`-gated**, the sliding window's own reason — the canvas draws the
  frame's ringed fourth thumb, and the published first paint is that picture. It is an
  inset-shadow **overlay** (`inset 0 0 0 Npx`, unscaled at desktop), not Retro's
  border-box `border`, because a weight that differs per tile would inset one photograph
  2px more than its neighbours. `img` rect equals the tile rect on all seven, asserted.
  Retro layout 4's "sample every row's ring before concluding a design has no selected
  state" is what found it; its own verdict stands for Retro's frame. CLAUDE.md's "carries
  no active mark" is for the sweep.
- **Open question 5's answer: `s.bg`, `ArcEdge`'s default.** The wrapper's `Vector 1` binds
  `sem/box/3` **#101309** at 1440 (it nests Scheme 1) and `sem/bg` **#15180F** at 768 and
  390 — two masters and layout 1's neighbour's-ground rule against one, and a 5-in-255
  difference on a 44px arc. Named in the block, not drawn. `bleed={false}` on a `position:
  relative` sheet, section 3's route. The 390 vector is the leaked 576.56 at x −81.87; the
  768 one is 768 wide; `ArcEdge` stretches to the sheet and `scrollWidth` does not move.
- **The lens, checked in the editor at all three widths** (one puppeteer script, deleted:
  Lime thumbnail → big card → `[role=dialog] button[aria-pressed]` index 3 → *Use this
  header* → the `[role=tab]`s): eleven `--ac` roots, every body one at layout 4 by its text
  (*Five worth your ear.*, *Snaps from the night*, *All songs · A–Z*, *Distances we'll
  Travel*, *Book Us*, *Client success stories*), and **the media root's bottom is the
  gallery root's top to the pixel** at the 1088 / 768 / 390 canvases. The clips read olive,
  the media's dark foot arc, the gallery's dark head arc, lime — the 44 + 44 lens section 3
  named, in one colour since both arcs are `s.bg`. Two clip traps: `page.screenshot` with
  `captureBeyondViewport` (the default) resets the canvas's inner scroll container, so
  the clip lands a section low — pass `captureBeyondViewport: false`; and the editor
  scrolls a container, not the window, so after `scrollIntoView({ block: 'start' })` walk
  up to the ancestor whose `scrollHeight` exceeds its `clientHeight` and pull its
  `scrollTop` back to bring the seam under the device tabs.
- **The glyph is the frame's own arrow, transcribed from the 390 master's "→"** (16.02 ×
  13.94, `exportAsync` off the vector reached by `findOne` from the instance — the
  `I…;…` id returned null to `getNodeByIdAsync`, the memory note's trap again) and turned
  −90 / 90 / 180 for ↑ ↓ ←. The vectors' own 1° / −179° rotation is a leak the render does
  not show and is dropped; the discs' `BACKGROUND_BLUR` 18.1 stands behind an opaque fill
  and is dropped (the header's capsule). The 0.754 ring through `u()` is 0.62px at desktop
  and renders as a blended 1px edge (sampled `(230, 244, 196)` between the lime and the
  mist), so layout 1's 1px fallback was not needed.
- **The thumbs and the spotlight stay top-anchored, Retro's call on the same seven files.**
  The frame's tiles are `FILL` centred, but its sources are landscape crops where ours are
  the tall strip photographs, and the first render's centred cover of those into a 121 × 68
  pill cut every face at the chin. `objectPosition: '50% 0%'` on both, named in the block;
  on the seeded slot 3 (`limeGallery4`, 1200 × 800, cropped sideways) it is a no-op, so the
  canvas is the frame's own picture. No `photos.js` change: slot 3 is `3a59b4d1` and the six
  thumbs are the shared strip, as the plan's photography table expected.
- **Measured against the masters' content edges**: desktop eyebrow 12px at 181.5 (221.5 ×
  0.82 = 181.6), h2 107px on three lines, 285.7 tall (348 × 0.82 = 285.4) at 226.5, card
  483.9 × 437.9 at x 510 (590.97 × 534 × 0.82 = 484.6 × 437.9; 622 × 0.82 = 510), spotlight
  451.2 × 405.1 (550.97 × 494 × 0.82 = 451.8 × 405.1) at radius 41, brackets 14.8 with 3px
  arms (the 4 × 0.82 = 3.3 rounds down), thumbs 99.2 × 46.3 (seven dividing 534 against the
  frame's six at 67.75 × 0.82 = 55.6, Retro's named cost), rings 1 / 1 / 1 / 3 / 1 / 1 / 1,
  discs 45.5 at radius 8.2, arc 36.3 deep at −1, section 611.7 (746 × 0.82); 768 eyebrow at
  130, h2 81px one line at 181.6 (182), card 537 × 534 at 313.7 (314), spotlight 497 × 494
  at radius 50, thumbs 121 × 56.3, discs 55.5 at 792.2 (792.5), section 877.7 (878); 390
  eyebrow 11px at 100, h2 54px two lines, 96 tall at 124.3 (124), card 370 × 337 at 244.4
  (244), spotlight 330 × 297 at radius 4, strip 123.3 × 67.7 at 631.4 (631), pills 180 ×
  55.5 at 711.1 (710.75) under the 5 / 5 block, section 806.6 (806.26). The canvas has
  zero pointer cursors and `scrollWidth` holds. `live=1` at desktop and 390 (puppeteer,
  probe deleted): a thumb click moves the spotlight *and* the 3px ring, back from slot 0
  wraps to 6, forward from 6 wraps to 0, and the 390 window slides from slots 1–3 to 0–2 on
  a pick of slot 1. `n=0`: the `#9CCF23` well with `KM` in ink at 72 / 88, dark thumb wells
  with pale `KM` at 21 / 26. No page errors. Digest at themes 0, 2, 3 and 4: zero differing
  files; theme 1: exactly gallery arch 3 at three widths (gallery has no fold partner).

Settled in section 5 (the repertoire):

- **The fifth layout-4 block, inside its branch after the seam: `if (s.lime)` within
  `Repertoire`'s `if (s.v3)`, after `jump`** — the gallery's layout-4 seat. `alpha` and the
  `anchors` map are hoisted, but `groups`, `letters`, the clamped `at` and `jump` are the
  branch's, so the block sits after them and shares the rail's whole seam: the published jump,
  the clamp, the callback ref and the handler-only-on-a-lit-letter rule needed nothing new.
  The tree is Retro's twin's node for node (Section → panel → head / sub / grid, the list of
  groups beside or under the 232 rail of 32 cells), and every leaf changes ink or box, so a
  block. Diff 143 / 0 in `EncoreSection.jsx`. Retro's `T`, `band` / `cream` / `panel` /
  `mustard` / `rule`, its `railCell` / `rail` / `list` and `TornEdge` are not read.
- **Scheme 3 by node, and `sem/text/1` and `sem/text/2` are one ink there.** The Section's
  fill is `sem/bg` = `#AFE335` (`s.ac`), the panel's `sem/box/1` = `#CCFA61` (`lime3`, a
  block-local literal, layout 2's idiom), and every text node — the head, the sub, the group
  letters, both halves of a row, all twenty-six rail letters — is `#15180F` = `s.bg`,
  whichever of the two text tokens it binds. The lit cell fills that ink and letters itself in
  Scheme 3's `sem/bg`, which is the band: **`s.ac` on `s.bg`**, Retro's "cut out in the
  ground behind it" rule one scheme over. `get_variable_defs` and the nodes agreed at all
  three widths (no fills-versus-token lie on this component).
- **The rules do not ramp, and they are not `s.stroke1`.** `sem/stroke/1` is `#15180F` at
  .15 on all three masters (`${s.bg}26`), where Retro's desktop binds the mustard and its
  narrow masters `#111111`; `s.stroke1` under Lime is Scheme 1's pale `#F2FFD0` and would
  vanish here. Both strokes are `INSIDE` — 2 on the group heading, 1 on the row — so they are
  inset shadows, not Retro's `borderBottom`, which made the heading 26 and the row 61 against
  the frame's 24 and 60. And the heading's type is on the heading box itself: a bare `div`
  round a `span` carried the root font's strut and came out 24 at every width where the
  frame's `lh` is the letter's own line (24 / 23 / 23 — the narrow 23 is 15 × 1.5 rounded).
- **The type is the ramp, and it is why the instance is taller.** The song title is
  Display/Title (36 / 28 / 26, a literal since `s.title` is the heading string) where Retro's
  is `size/list`, and the artist is `s.list` (24 / 19 / 18) where Retro's is 16 / 12 / 13:
  that is Lime's 536 / 582 / 650 instance against Retro's 452 / 522 / 596 on the same rows.
  The head is `s.dispLg` at every width (130 / 81 / 54 at .89; Retro's 768 arm is its
  fitted `h1`), the sub and the group letters `s.bodyLg` at 1.5, the rail `s.bodySm` at 1.4,
  Inter and Bebas as the frames set them. No `T` table, no Device override, no box token
  (`radius/chip` 6 and `border/hairline` 1 are the only two, both raw).
- **The boxes are Retro's twin's but for one.** 100 / 100 / 30 over and 56 / 30 / 10 either
  side on the Section, 60 / 50 / 40·30 on the panel at radius 60, gaps 40 · 24 · 40-32 · 28,
  rows padded 10 / 0, the rail's 232 with its 50 indent at desktop and its `sticky` there
  alone (Retro's reason, Retro's cost at 768 and 390 — the rail leaves the viewport on the
  first jump, measured at −384 on the 390 harness). What moves: **the 390 Section pads 100
  below**, not Retro's 60 (948 = 30 + 818 + 100), so the foot inset is 150 / 150 / 100.
- **The foot seam is `s.bg` at every width** — `sem/bg` on the 1440 and 768 vectors (nested
  Scheme 5, whose `sem/bg` is the same `#15180F`) and on the 390 one (Scheme 1) — drawn by
  `ArcEdge` in its default colour with `bleed={false}` on the `position: relative` sheet,
  section 3's route. The 390 vector is the leaked 576.56 (x −93 as a box; the node reports
  483.28, its 180°-turned origin), the 768 one 768 wide; `ArcEdge` stretches to the sheet and `scrollWidth` does not move.
- **Measured against the masters' content edges** (the seeded twelve songs in eight groups,
  so the panel runs taller than the frames' six in three — at six the desktop section sums to
  870.8 against 1062 × 0.82 = 870.8): desktop sheet padded 82 / 45.9 / 123, panel 1088.2 wide
  (1328 × 0.82 = 1089) at radius 49.2 and pad 49.2, h2 107px at 131.2 (160 × 0.82) and 95.2
  tall, sub 13px at 259.2 (316 × 0.82 = 259.1), grid at 298.4 (364 × 0.82 = 298.5), rail
  190.2 wide at x 894.7 (1092 × 0.82 = 895.4) padded 41, cells 26.2 six to a row at gap 6.6,
  rings 0.8 inset, heading 19.5, rows 48.8 (60 × 0.82 = 49.2) with the title 29.5px and the
  artist 20px on one baseline, arc 36.3 deep at −1 spanning 1180; 768 sheet 100 / 30 / 150,
  panel 708 at 30 / 100, h2 81px at 150, sub 15px at 262.1 (262), grid at 308.6 (309), rail
  608 × 72 fifteen to a row, list at 412.6 (413), heading 22.5 (23), rows 50.8 (51) at 28px /
  19px, arc 44.2 at 768 wide; 390 sheet 30 / 10 / 100, panel 370 at 10 / 30 with pad 40 / 30,
  h2 54px at 70, sub at 158 (158), grid at 204.5 (205), rail 310 × 152 seven to a row, list at
  388.5 (389), heading 22.5 (23), rows 48.6 (49) at 26px / 18px, arc 44.2 at 390. The canvas
  has zero pointer cursors and `scrollWidth` holds at every width. `live=1` at desktop and
  390 (puppeteer, probe deleted): the eight lit letters alone carry a pointer, a click on S
  lights S and calls `scrollIntoView` on the S group, the desktop rail pins at viewport top
  0 after the jump (sticky), a click on Q (no song) changes nothing, and D lights D. `n=0`
  prints *No songs yet.* in ink beside the full rail; `n=1` holds. No page errors. Digest at
  themes 0, 2, 3 and 4: zero differing files; theme 1: exactly repertoire arch 3 at three
  widths (repertoire stops at arch 6, so no fold partner).

Settled in section 6 (the events map):

- **The sixth layout-4 block, inside its branch after the seam: `if (s.lime)` within
  `EventsMap`'s `if (s.v3)`, after `zoomScale`** — the gallery's and the repertoire's
  layout-4 seat. `page` / `setPage` and `zoom` / `setZoom` are hoisted, but `nGigs`, `pg`,
  `gig`, `step`, `stats`, `ringW` and `zoomScale` are the branch's, so the block sits after
  them and shares the ticker's whole seam: the wrapping arrows, the by-identity lit pin, the
  zoom clamp and the `extLink` on the gig needed nothing new. The tree is Retro's twin's node
  for node (card of viewport + panel, head row, 2 × 2 grid, ticker; the same 56 / 30 / 10
  instance inset, 16 card-to-ticker gap, 32 / 28 panel inset and 20 at 390, 12 grid gap,
  18 / 20 cells at gap 8, 30 × 40 zoom buttons 16 in, 12 / 16 ticker at gap 14), and every
  leaf changes dress, so a block. Diff 233 / 0 in `EncoreSection.jsx`, one hunk, plus the
  overlay fix below. Retro's `T`, `bw`, `hair`, `cardBg` … `tickLine`, `seats`, `chip12` and
  `body12` are not read — under Lime they are the collapsed `paper` / `deep` / `pillBg`
  derivations the plan named.
- **One olive register, read off the nodes at all three widths.** The card, all four stat
  cells and the ticker fill `sem/box/1` (`s.box1`); the card and the ticker sit in a 1px
  `sem/stroke/1` ring (`s.stroke1`, `#F2FFD0` at 15%) at radius **50** (Retro's 30), the
  cells in a 1px `sem/stroke/2` ring (`s.ac`) at radius **25** (Retro's 10). Every text on
  the panel and the ticker — the two head labels, the cell labels, **the numerals**, the subs,
  the arrows — is `sem/text/2` = **`s.tx`**, pale: the plan's "lime numerals" was a guess
  from the mode table, and the frame's only lime on the panel is the cells' rings. The
  viewport nests **Scheme 3**: rings, labels, marker head and tail `s.ac`, label and marker
  ink `s.bg`, the marker's `user` glyph stroked `#15180F` on the node itself (so layout 3's
  "the glyph is ink" named diff is this frame's own), the zoom buttons `sem/box/2` `#D9FF7F`
  (`lift`) in a 15% ink hairline (`#15180F26`, block-local `inkHair` — Retro's branch already
  has a `hair` const, `'1px'`). No node carries an effect; `get_variable_defs` and the nodes
  agreed on every entry.
- **The card's ring is a last-child overlay, not an inset shadow on the card — the third time
  the rule bites.** The viewport fills the card's left half (its top, stacked) at `inset: 0`
  with the raster, so an inset shadow on the card's own background vanished along every edge
  the raster reached; a pixel scan of the desktop render's card top row read the plate
  (41, 42, 28) where the frame draws the hairline. The overlay (`position: absolute; inset: 0;
  borderRadius: inherit; pointerEvents: none`, so the zoom buttons stay clickable and it takes
  no grid cell) reads at (70, 72, 55). Layout 1's calendar panel and layout 3's map container
  are the two earlier sightings; the ticker and the cells keep plain inset rings, their
  children staying inside the padding. **Check whether a child reaches the edge before
  drawing any ring as an inset shadow on a container.**
- **The viewport is layout 3's recipe verbatim**: one `<svg>` per ring in its own pixels
  (viewBox 480 / 300 / 140 at Retro's own `ringW` shares) so the 1 / 1.5 / 2 inside weights,
  the .3 / .5 / .8 opacities and the outer ring's 4 / 4 `dashPattern` (all three masters)
  travel × 0.82 through the viewBox; `s.mapRadialSrc` at cover over an `s.box1` fallback, no
  multiply. The pins are layout 2's and 3's pair — `s.tx` at 8, the lit one `s.ac` at 14 in
  a 2px ink ring — because the frame's five dots are ink at 60% and vanish on the raster at
  every width (named diff). **The canvas lights gig 0's pin** where the frame shows none:
  `pg` is 0 on the canvas and the ticker always holds a gig, which is Retro's branch's own
  reading, inherited and not to be "fixed".
- **The type is the ramp; two boxes move from Retro's.** Body/Chip 13 / 12 / 11 (`s.chip`,
  `-0.06em`), Display/SM 50 / 40 (`s.dispSm`, lh 1) for the numeral at 1440 and 768 and
  **Display/Title 26 at 1.1** at 390 (a literal, `s.title` being the heading string), Body/SM
  13 / 13 / 12, Body/MD 14 / 13 / 13, Body/LG 16 / 15 / 15; the zoom glyph a raw 20 in Inter
  Bold; the head `s.dispLg` at .89 in `s.ac` at **every** width (the Section's text node:
  130 / 81 / 54, one line at 1440 and 768, two at 390), where Retro's 768 arm is `s.h1`.
  What moves: the 390 viewport is 370 × **251** (Retro's 278), and the 390 cells **hug** with
  `space-between` — the master's rows are 109 and 138, the second grown by BASE's two-line
  numeral with GIGS YTD's label pinned to its top and its sub to its floor — where the wide
  masters state 226.5 / 139.5 minimums with `justify-end` (Retro's 227.5 / 140 / 100 with
  `justify-end` throughout). The panel's left rule stays desktop-only, Retro's reading: both
  narrow masters carry the same 1px left stroke under the card's own ring, where it paints
  nothing. The frame's 1440 foot `Vector 2` fills `sem/bg` on the page-coloured band and is
  not drawn (the plan's no-op).
- **Measured against the masters' content edges** (seeded page): desktop h2 107px at 80 and
  95.2 tall, card at 221.1 (80 + 95.2 + 56 × 0.82) and 454.6 tall (554 × 0.82 = 454.3) at
  radius 41, panel padded 23 / 26.2, head 11px at 244.1, grid at 271.5 (20 × 0.82 under the
  head), cells 231.9 × 185.7 (226.5 × 0.82; the frame's 294 wide is our 1052 against 1328)
  at radius 20.5 and pad 14.8 / 16.4, numeral 41px, subs 11px at lh 15.4, outer ring 380.3
  dashed (72.3% of our 526 viewport; the frame's 480 × 0.82 = 393.6 is Retro's named column
  cost), labels 14.2 tall, pins 11.5 / 6.6, zoom 24.6 × 32.8 with a 16.4px glyph, ticker at
  688.8 (16 × 0.82 under the card), 53.1 tall (65 × 0.82) at radius 41 and pad 9.8 / 13.1,
  arrows 13px; 768 h2 81px at 56, card 688 × 722 at 158.1 (the frame's 708 × 731, our 20
  narrower and the viewport 311 for 320 by aspect), panel 379 (379 exactly) at 501, head 12px
  at 529 (28 in), grid at 561 (60 down the panel), cells 306 × 139.5, numeral 40, ticker
  63.7 (64) at 896, zoom 30 × 40 at 16 / 16; 390 h2 54px on two lines, 96.1 tall (96), card
  346 × 579.9 at 170.1, viewport 234.7 (251 × 346 / 370), panel 345.2 against the frame's
  330 — the seeded "12 mile radius" wraps in our 107 measure and its sub with it, so row 1
  hugs at 153.8 and row 2 at 108.4 against the master's 109 / 138 (Retro's own named cost,
  by the frame's own hug), head 11px at 20 in, grid 20 under it, cells at radius 25 with
  `space-between` (CITIES' numeral centred in the taller row, the master's GIGS YTD case),
  ticker 62.3 (63) at 766, zoom at 16 / 16, "120mi" off the viewport's right edge as the
  master's own Label 120 is at 403.5 in 370. The canvas has zero pointer cursors and
  `scrollWidth` holds at every width. `live=1&n=8` at desktop and 390 (puppeteer, probe
  deleted): `›` steps the ticker from gig 1 to gig 2 and moves the lit pin from its seat to
  the next gig's, `‹` twice wraps 2 → 1 → 8, `+` twice scales the layer to 1.5625, both
  arrows carry a pointer, a linked gig's text block is `<a href="https://example.com/tickets">`
  and an unlinked one a `div`. `n=0` drops the ticker and keeps the map (794 tall at 390,
  the zoom's two pointers alone); `n=1` draws the ticker with no arrows. No page errors.
  Digest at themes 0, 2, 3 and 4: zero differing files; theme 1: exactly map arch 3 at three
  widths (map has no fold partner), re-run map-only at all five themes after the overlay fix
  with the same answer.

Settled in section 7 (pricing):

- **The seventh layout-4 block, inside its branch after the seam: `if (s.lime)` within
  `Pricing`'s `if (s.v3)`, after `bleedX`** — layout 3's pricing seat one branch over. The
  branch has no state (the pill's `to` is its whole live seam), but `desk`, `u`, `pad` and
  `bleedX` are the branch's, so the block sits after them and ahead of `rowBox`, which reads
  `tierRow`. The tree is Retro's twin's node for node (row of name / mid / price column at
  1440, the three stacked narrow; tag chips over feature pills over the blurb; kind / price
  row / pill; the foot's small print) and nearly every leaf changes size or paint, so a block.
  Diff 162 / 0 in `EncoreSection.jsx`, one hunk. Retro's `T`, `chipType`, `rowBox`,
  `serviceRow`, `s.tierRow` (pale lime under Lime) and `s.tierFeatSeats` (box1 / white under
  Lime) are not read.
- **Primitives: Lime alone, on the page's Scheme 1, and every text is one ink.** The instance
  fills `sem/bg` and paints nothing (Retro's reading holds; the three `-div` frames are the
  page colour on the page colour). The name, blurb, SET / PROJECT, "from", the numeral, the
  tag chip labels and the small print all bind `sem/text/1` = `s.ac`. `get_variable_defs`
  and the nodes agreed on every entry at all three widths; no node carries an effect at any
  width, so Retro's 768 / 390 offset block under the pill is not drawn.
- **The rule is an inset shadow, not Retro's border.** `sem/stroke/2` = `s.ac`, 4px INSIDE the
  row's foot on every row but the last: the frame's 244 is 48 + 148 + 48 with the stroke
  inside the padding, a `borderBottom` would add 4 × 0.82 to each row, and nothing reaches
  the row's foot edge for the shadow to hide under (the map's overlay rule checked, not
  needed). Bled through Retro's own `bleedX` — the rule spans the root at every width and
  `scrollWidth` holds.
- **The tag chips' hairline is the design here, not the leak.** rgba(242, 255, 208, .15) is
  Scheme 1's `sem/stroke/1` = **`s.stroke1`** on this ground — Retro's comment on the same
  node, which names the literal a Lime leak over its beige, is right for Retro's frame and
  reversed for Lime's. `radius/pill`, `border/hairline` 1 INSIDE as a shadow (so the 5 / 10
  stands with no `calc(… - 1px)`), Body/Chip at `s.chip` and `-0.06em`.
- **The feature pills are the header's chip pair, inlined by parity.** `scheme/1/tag1/bg`
  `s.box1` lettered `tag1/text` `s.ac`, then `tag2/bg` `s.ac` lettered `tag2/text`
  `s.activeFg`, seat `j % 2` — the layout-4 header session inlined the same pair over the
  same Tags component. The frame's seats 3 and 4 ink `scheme/3/tag1/text` #C7FF3C and
  `scheme/4/tag1/text` #15180F on a Scheme 1 component: leaked tokens (the header's and the
  bio's reading), not drawn. `radius/chip` 6 is passed as `s.radiusChip`, a px string
  (unscaled at desktop, the bio session's spelling), 5 / 11, Label/XS in `s.ui` at 1.26.
- **The pill is BookPill's Lime branch with the pair turned round.** `bg={s.tx} fg={s.bg}
  discFg={s.ac} full={s.mob}` and nothing else — not Retro's `disc`, `size`, `glyph`, `shadow`
  or `style` — because the branch's 5 / 5 / 5 / 21 × k, gap 10, 46 × 44 disc and Display/List
  at 1.2 are this frame's pill exactly (184 × 54 / 163 × 54 / 159 × 54), and `full` at 390 is
  the master's own k = 1 (an 18px label). It hugs at every width where Retro's `full={!desk}`
  fills the narrow row; the 15 pointer cursors on the canvas are BookPill's own unconditional
  cursor inherited by its disc and glyph, shared with every Lime caller.
- **No `T` table, no Device override.** `get_variable_defs` is the ramp at all three widths:
  display-sm 50 / 40 / 32 (`s.dispSm`, lh 1 — the name and the numeral), label-sm 18 / 14 / 12
  (`s.labelSm` through `labelStyle`, the kind), list 24 / 19 / 18 (the pill's label, BookPill's
  own read), chip 13 / 12 / 11, label-xs 20 / 14 / 12, body-md 14 / 13 / 13, body-lg 16 / 15 /
  15, eyebrow 15 / 12 / 11 at 1.3 (the foot). Every box is Retro's twin's: 48 / 56, 30 / 30 and
  30 / 10 on the row, its gap 40 / 32 / 32, mid 14, chips 8, the price column's 12 over a 20
  price row, the name's 409 at desktop and FILL narrow, the foot's 18. What moves is the price
  column's floor: the frame hugs both rows at **184** (Retro's 186), taken as the `minWidth`
  for Retro's reason.
- **Named diffs.** Every seeded row carries a tag row where the frame draws one on its second
  row alone, and the tags and features print the artist's casing where the frame types
  capitals (both Retro's inherited readings); `tierKind` prints one word on every row; the
  pill reads "Start Enquiry" against the frame's "Star Enquiry", so it is 158.8 / 169 / 164.5
  wide against 150.9 / 163 / 159; the 390 content column is the root's 346 (`padX` 22) against
  the frame's 370 (`bleedX` puts the identical value back, Retro's mechanism), so the seeded
  feature rows wrap to three lines there (**reversed** by JP-038 (layout 4), 2026-09-23: the
  section takes the frame's 56 / 30 / 10 inset in `sectionVm`, so the column is the frame's
  370 / 708 and 1328 × 0.82); and the seeded rows run taller than the frame's two
  (chips, four or five features and a blurb in every mid) — 200.8 / 394.5 / 405.9 for the
  first row against 200.1 / 359 / 358, with the desktop row exactly the price column's 121.4
  plus twice 39.4.
- **Measured against the masters' content edges** (seeded page): desktop row padded 39.4 / 64
  with the rule 3.3px inset in rgb(175, 227, 53) spanning 1180, name 41px at 124 / 119.4 and
  335.4 wide (409 × 0.82), tag chips 19.2 tall (23 × 0.82) at 11px / 4.1 / 8.2 ringed
  rgba(242, 255, 208, .15), feature pills 28.3 tall (35 × 0.82) at 16px / 4.1 / 9 on radius 6
  alternating rgb(46, 57, 40) / rgb(175, 227, 53) with inks lime / rgb(13, 31, 3), blurb 11px,
  kind 15px at lh 16.5, "from" 13px on the numeral's baseline, numeral 41px, pill 158.8 × 44.3
  at 20px with a 37.7 × 36.1 disc, price column at x 1017.2 with `minWidth` 150.9 (184 ×
  0.82), foot 12px at lh 15.6 padded 14.8; 768 row 30 / 40 (`padX`) with a 4px rule, name 40,
  chips 22 at 12px, pills 27.6 at 14px / 5 / 11, blurb 13, kind 14 at 15.4, numeral 40, "from"
  15, pill 169 × 54 at 19px with the 46 × 44 disc, foot 12 at 15.6 padded 18; 390 row 30 / 22
  with a 4px rule, name 32, chips 21 at 11px, pills 25.1 at 12px, kind 12 at 13.2, numeral 32,
  pill 164.5 × 54 at 18px, foot 11 at 14.3. `scrollWidth` holds at every width. `live=1` at
  desktop and 390 (puppeteer, probe deleted): every pill is `<a href="#form">`, a span on the
  canvas. `n=0` prints *No packages yet.* in `s.tx` in one unruled row (layout 3's Lime ink);
  `n=1` draws one row with no rule; `n=8` draws seven rules. No page errors. Digest at themes
  0, 2, 3 and 4: zero differing files; theme 1: exactly pricing arch 3 at three widths (no
  `_arch_7_` file exists — the convention above).

Settled in section 8 (the calendar):

- **The eighth layout-4 block, inside its branch after the seam: `if (s.lime)` within
  `Calendar`'s `if (s.v3)`, after `NextTag`** — the deepest seam of the pass. `sel`, `mi` and
  the wizard's three hooks are hoisted, but `want` / `hit` / `cur` / `feat`, `stats`, and the
  wizard's `W` / `wAt` / `wCur` / `nTypes` / `typeAt` / `last` / `onBack` / `onNext` /
  `sendLink` / `NextTag` are the branch's, so the block sits after the last of them and shares
  the whole seam: the published row pick (picked, not toggled — the featured slot leaves the
  list), the chip pick, the real inputs, Back / Next Step and the last step's Send Enquiry
  `<a href="#form">` needed nothing new. `panelPad`, the 60 / 30 corner and the 50 / 20 gaps are
  read too — Lime's Frame 324 is Retro's to the number (60 / 60 · 60 / 50 · 30 / 10). The tree is
  Retro's twin's node for node and nearly every leaf changes fill, ink, box or size, so a block:
  one hunk, **281 / 0**. Retro's `T`, `panel` / `sheet` / `sheetInk` / `gone` / `card` /
  `cardInk` / `cardHi` / `hair` / `chipType` / `bodyMd` / `smallCaps` and its `backBg` / `backFg`
  are not read.
- **Primitives: Lime on the page's Scheme 1, and every fill is a `sem` key.** The panel is
  `sem/box/2` (`s.box2`); the wizard card and the slot rows `sem/box/1` (`s.box1`) in a 1px
  `sem/stroke/1` inside hairline (an inset shadow; nothing reaches an edge, so no overlay); the
  summary card is `sem/text/2` (`s.tx`) — the text token, Retro's own reading — lettered
  `sem/box/2` with the big stat in `sem/bg`, which is Retro's `cardInk = panel` binding exactly.
  So **Lime's frame restores the three-level stack Retro's note said Lime flattens**: `box1`
  rows under a `tx` card on a `box2` panel. CLAUDE.md's "on Lime and Grunge the card and the
  rows share a fill" is Grunge's alone now — for the sweep (the plan's list already names it).
  The card's own `stroke/1` (pale at .15 on pale) is not drawn, Retro's reading of the same
  stroke. `get_variable_defs` and the nodes agreed on every entry at all three widths; no node
  carries an effect.
- **Two pills in other schemes, read off `explicitVariableModes`.** The Back pill nests
  **Scheme 3**, where `sem/text/1` is `#15180F` = `s.bg` and `sem/bg` is `#AFE335` = `s.ac`: an
  ink pill with a lime disc, lime label, ink arrow. Next Step is Scheme 1's `text/1` lime with
  an ink disc. Both are hand-written at the frame's numbers (radius 67, 5 / 21 round a 46 × 44
  disc, Display/List at 1.2), Retro's route since BookPill has no left-disc form, with the
  glyph BookPill's own lucide arrow at `46 × z × 0.6` and `strokeWidth 1.5` so the block's three
  discs match; no offset block (`hard()` is Retro's). Measured 99.2 × 44.3 / 131.3 × 44.3 at
  desktop (121 × 54 / 160 × 54 × 0.82), 112.4 / 142.9 at 768 (113 / 144), 110.8 / 139.7 at
  390 (112 / 140). The Send Enquiry pill nests **Scheme 2**, whose `sem/bg` is `s.box1`, so it
  is `<BookPill s={s} to={s.calBookTo} label={s.calCta} fg={s.box1} full={s.mob}
  style={{ width: '100%', justifyContent: 'space-between' }} />` — layout 3's calendar recipe
  verbatim, none of Retro's `disc` / `size` / `glyph` / `shadow`; the branch's own `k` gives
  54 / 44.3 and the `s.list` label.
- **The wizard's title is `s.tx`** (Retro's is the accent), its step line `s.tx`, its step discs
  `s.box1` in a `stroke2` ring lit and a `stroke1` ring idle with numeral and label in `s.ac` /
  `s.tx`, its rules 40 × 1 in `s.box2`. Chips: on is `s.ac` with an `s.bg` dot and label, off is
  `s.box2` in the hairline with an `s.ac` dot and `s.tx` label; the dot is 10 at `radius/chip`
  (`s.radiusChip`, a px string, unscaled). The date box is `s.box2` in the hairline at 12 / 14.
  The stepper keeps Retro's clip-about-the-centre mechanism at 390, where the frame's own row
  is wider than its card (its first group stands at x −32 and the render shows "Event … 3 Co").
- **The type is the ramp, read bare.** body-lg 16 / 15 / 15, body-md 14 / 13 / 13, body-sm
  13 / 13 / 12, chip 13 / 12 / 11 at `-0.06em`, list 24 / 19 / 18, display-lg 130 / 81 / 54 at
  .89 for the head (`s.dispLg` — Retro's `T.disp` 96 / 60 / 40 is Retro's ramp). Display/Title
  36 / 28 / 26 is a literal through `u()` (`s.title` is the heading string). No `T` table, no
  Device override — the 390 instances are called "— Tablet" and are not.
- **Boxes are Retro's twin's but for four.** The summary card pads **24 / 34** (Retro's 24) and
  the rows **18 / 34** (Retro's 18 / 24), both at radius **50** (Retro's 30); the wizard card is
  radius **50 at 1440 and 16 at 768 / 390** — the narrow masters are a second component
  (`859:13517`), so the 16 is designed, not a leak — padded 40 / 48 and 30, gap 20 with the
  desktop's `space-between` (Retro's 18.75 minimum is its own). The stats' row gap and cell gap
  are both 12, so one grid holds them (Retro's reading). A blocked slot takes Lime's layouts
  1–3 state: the row's two parts at .38, no strike, no handler, the hairline at full strength.
- **Measured against the masters' content edges** (seeded page, four slots so three rows
  against the frame's two): desktop panel 1052 wide at x 124, radius 49.2, pad 49.2, 765.5
  tall against 822 × 0.82 = 674 — the surplus is exactly one row plus its gap (79 + 13.1); h2
  107px, 95.2 tall (116 × 0.82) at 129.2; wizard 535.9 wide (Retro's 680fr column rule), radius
  41, pad 32.8 / 39.4, gap 16.4, stretched to the column; step discs 23 at 298.2; title 29.5px
  pale; line 11px; chips 224.5 × 39.5 (287 × 49 × 0.82 = 235 × 40.2 — the frame's 14px body at
  our 11); date box 36.1 (45 × 0.82); card 376.7 × 197.2 (242 × 0.82 = 198.4), radius 41, pad
  19.7 / 27.9, brand 13px in `box2`, disc 39.4, big stat 29.5px in ink, small 11px at −0.66;
  rows 79 (96 × 0.82 = 78.7) at 14.8 / 27.9, mark 29.5, sub 11, price 13; pill 44.3 at 20px
  with a 37.7 × 36.1 `box1` disc. 768: panel 688 at 60 / 50 radius 60, h2 81px 72.1 tall,
  wizard radius 16 pad 30, discs 28, title 28, chips 259 × 47.5 (269 × 48), date box 43.5
  (44), card 227.8 (229) at 24 / 34, rows 87 (87), pill 54 at 19px with the 46 × 44 disc. 390:
  panel 346 at 30 / 10 radius 30, h2 54px 48 tall, wizard 471.9 (474), chips 128 × 47.5 (140 ×
  48), card 224.6 (226), rows 83.4 (84), pill 54 at 18px. The canvas has five pointer cursors
  (BookPill's own, inherited by its disc and glyph), no `<input>`, no `<form>`, and
  `scrollWidth` holds at every width. `live=1` at desktop and 390 (puppeteer, probe deleted):
  a row click features JUN 14 and returns JUN 12 to the list, a chip click moves the lime to
  Birthday and Wedding goes `box2` / pale, the date box takes typing, Back is dead on step 1,
  Next Step opens *Tell us the details* (four inputs, disc 2 lit) then *How do we reach you?*
  (two inputs) where Send Enquiry is `<a href="#form">` and Next Step is gone, and Back twice
  returns to step 1 with the typed date and the chip pick intact. `&booked=2025-06-12`: the
  card prints *Pick a date to enquire* with no big stat, the JUN 12 row is dimmed to .38 with
  no cursor and the hairline whole. `n=0`: the prompt and no rows; `n=1`: featured, no rows;
  `n=8`: seven rows. No page errors. Digest at themes 0, 2, 3 and 4: zero differing files;
  theme 1: exactly calendar arch 3 at three widths (calendar has no fold partner).
- **Reversed** (JP-052, `plans/lime/layout-4-qa-fixes.md`, user call, 2026-09-23): the right-hand
  column is the **wizard's summary**, not the slot list stacked. The summary card prints the picked
  type over `location` and step 2's four answers (the canvas prints each box's bare example, and
  the published page prints the visitor's answers or a .45 "e.g." placeholder). The first row is a
  **date card** (the typed date, or the `open` cue, refused when booked or past, with `vm.calTime`),
  and the second a **package card** on the Pricing section's packages (*Package ›* cycles). The
  foot pill is Send Enquiry. The Lime-only past-cue exception (`vm.calCue`, 2026-09-18) went with
  the slots. The block's paint above (radii, pads, `s.tx` card, `s.box1` rows, the hairline) is
  unchanged: the rows are the same element, and only their content moved.

Settled in section 9 (the enquiry form):

- **The ninth layout-4 block, ahead of its branch: `if (s.v3 && s.lime)` before `EnquiryForm`'s
  `if (s.v3)`** — layouts 1's and 2's form seat, the bio's and the media's on this pass. Every
  piece of the live seam (`vals`, `msg`, `errs`, `sent`, `at`, `setAt`, `href`, `onSubmit`,
  `Pill`, `pillLink`) is hoisted above the branches and `desk` / `z` / `u` are one-liners, so
  the published boxes, the refused state, the submit, the sent block and *Write another* needed
  nothing new. The tree is Retro's twin's node for node (head over a rule, the brand line, the
  form column of paired boxes over a message box and a pill beside the 01 / 02 / 03 column, the
  form first at 1440 and the steps first narrow) and every leaf changes face, ink or box, so a
  block: one hunk, **230 / 0**, placed before Retro's v3 comment so that comment stays on its
  `if`. Retro's `T`, `rule` (`vm.formRule`), `capsType` / `subType`, `boxShell` / `msgShell`,
  `pill`, `arrowDisc` and `hard()` are not read.
- **Primitives: Lime on the page's Scheme 1, one nested pill, and every fill is a `sem` key.**
  The instance fills `sem/bg` and paints nothing (Retro's reading). The head is `sem/text/1`
  (`s.ac`); ENQUIRE, the box labels, the steps' head and the step lines are `sem/text/2`
  (`s.tx`); the boxes fill `sem/bg` in a 1px INSIDE `sem/stroke/2` (`s.ac`) ring at radius 214
  — `s.btnR` — with `s.ac` placeholders, the message box at radius 24; the head's rule and the
  step rows' rules are 1px INSIDE `sem/stroke/1` = **`s.stroke1`** (pale at .15, `data.js`'s
  own rgba) where Retro's head rule is 4px of `pillBg` — a lime bar under Lime; the step discs
  are `s.ac` at radius 8 lettered `sem/bg` (Retro's literal reading, which the flat four take as
  `acFg`); the ↘ is `s.ac`. **The submit nests Scheme 1 and fills `sem/text/2`: a pale pill
  lettered `s.bg` round an `s.bg` 46 × 44 disc with an `s.tx` arrow** — the pricing row's pair
  with the disc's glyph pale rather than lime — drawn inline at BookPill's Lime numbers for
  layout 1's reason (the seam's `Pill` on a mailto with its own `onClick`). `get_variable_defs`
  and the nodes agreed on every entry at all three widths; no node carries an effect.
- **Both rules are inset shadows, not borders — the third `v3` section to meet it.** The head
  frame is 128 = 116 + 12 with the stroke inside, a step row 88 = 16 + 56 + 16 the same way;
  Retro's `borderBottom` adds a pixel to each. `inset 0 -1px 0 ${s.stroke1}` holds the frame's
  128 / 84 / 60 and 88 exactly (desktop rows 72.1 against 88 × 0.82 = 72.2). Nothing reaches
  either edge, so no overlay (the map's rule checked, not needed).
- **A refused box changes colour, not only weight: 2px of `s.tx`.** The idle ring is already
  lime, so Retro's "thicken in the accent" would not read as a refusal; layout 3's Lime rule
  for a box on the dark ground is the pale ring, in the single-shadow spelling
  `${bad ? '2px' : '1px'} ${bad ? s.tx : s.ac}`, and the stated 45 / 44 / 44 does not grow.
  CLAUDE.md's form paragraph ("its boxes' outline and its step rules are `vm.formRule`, which
  is `vm.tierRow.card`", and "a 4px mustard rule") is Retro's wording, for the sweep.
- **No `T` table, no Device override.** The ramp at all three widths: display-lg 130 / 81 / 54
  at .89 (`s.dispLg`; Retro's 96 / 60 / 40 is its own), list 24 / 19 / 18 at 1.2 (`s.list`,
  every label and the pill — Retro's 16 / 12 / 13), body-lg 16 / 15 / 15, body-md 14 / 13 /
  13, body-sm 13 / 13 / 12; Display/Title 36 / 28 / 26 at 1.1 a literal through `u()`. No
  `titleWordEms`: the seed's widest word fits the full measure at every width (552 in 1052).
  Every box is Retro's twin's — 24 / 12 / 16 / 14 / 6 / 12 / 90 / 5 · 21 / 46 × 44 / 16 · 56 ·
  16 / 40 · 32 — so Retro's grid, the reorder and the lone-box-runs-full-measure rule are
  restated whole.
- **The vertical inset is the root's, named.** The instance pads 40 / 30 / 24 over and 56 / 56
  / 40 under where `padY` gives 80 / 56 / 44 — the map's, pricing's and calendar's page-ground
  reading on this page — so the section is 749.9 / 1032.1 / 1001.1 against the frames' 651.9 /
  1024 / 971, the rest being the seeded heading's two lines (190.4 at desktop against "Contact
  Us"'s 95.1) and three at 390. Retro's readings hold: `heading` heads the design, `s.brand` is
  the ENQUIRE line, the steps are `vm.formSteps` with the frame's sub-line dropped, the frame's
  five boxes are the seed's four, and the pill prints `vm.formBtn`'s *Book Now* against the
  frame's "Check Availability".
- **Measured against the masters' content edges**: desktop h2 107px at 80 in lime, head rule
  inset at 9.8 under it, brand 29.5px at 299.9, grid at 352 with two 509.6 columns at gap 32.8
  (the frame's 644 × 0.82 = 528, Retro's column cost), labels 20px pale, boxes 249 × 36.9 (45 ×
  0.82) ringed 1px `rgb(175, 227, 53)` at 999 with 11px placeholders and 9.8 padding, message
  509.6 × 73.8 at radius 19.7, pill 509.6 × 44.3 `rgb(242, 255, 208)` at 20px with a 37.7 × 36.1
  ink disc and a 22.6 glyph, step discs 45.9 at radius 6.6 with 13px numerals in ink, rows 72.1
  with the inset hairline at 13.1 padding, arrows 13px lime; 768 h2 81px two lines at 56, brand
  28 at 236.2, one column at gap 32 with the steps first (rows 88 at 313.8, discs 56 at radius
  8, numerals 15), boxes 337 × 44 at 13px (the frame's 347 in 708 against our 688), message
  688 × 90 at 24, pill 688 × 54 at 19px with the 46 × 44 disc; 390 h2 54px three lines at 44,
  brand 26 at 224.1, rows 88 at 298.3, boxes 166 × 44 (178 in 370 against our 346), message
  346 × 90, pill 346 × 54 at 18px. The canvas has no `<input>`, no `<textarea>`, no `<form>`,
  no anchor and zero pointer cursors; `scrollWidth` holds at every width. `live=1` at desktop
  and 390 (puppeteer, capture-phase `preventDefault` on the mailto, probe deleted): five
  pointers (the `<a>` and its disc, svg and two paths), a refused submit rings all four boxes
  in 2px `rgb(242, 255, 208)` with the heights unchanged and prints the prompt in pale, filling
  box 0 clears its ring alone, the mailto's subject is the bare *Enquiry* and its body carries
  the four values, a valid submit swaps in the sent block with its lime h3, *Write another*
  restores the typed values. `n=0`: the message box alone over the pill, steps intact;
  `promises=`: one column and no rows; `n=5`: three rows with the lone fifth box full-measure.
  No page errors. Digest at themes 0, 2, 3 and 4: zero differing files; theme 1: exactly form
  arch 3 at three widths (form has no fold partner).
- **Reversed 2026-09-23 (JP-054, user call, `plans/lime/layout-4-qa-fixes.md`).** The named copy
  diffs above no longer hold: the head seeds *Contact Us* (`FORM_HEADING_4` in `HEADING_4`), the
  small-caps line is a new `sub` field seeded *Enquire* instead of `s.brand`, and the pill seeds
  *Check Availability* (`FORM_BTN_4`). All three apply at layout 4 on every theme, because Retro's
  frame carries the same copy. The desktop head is now 95.2 against the frame's 95.1. The boxes
  and the one-line steps still stand as named.
- **Reversed again 2026-09-24 (JP-054 retest, user call, `plans/lime/retest-qa-fixes.md`).** The
  boxes no longer stand: with `fields` absent, layout 4 seeds the frame's five (`FORM_FIELDS_4`:
  Your name, Email, Event date, Event type, Location), so the fifth box that runs the full
  measure is the frame's Location. The one-line steps still stand.

Settled in section 10 (the testimonials — the last body section):

- **The tenth layout-4 block, inside its branch after the seam: `if (s.lime)` within
  `Testimonials`' `if (s.v3)`, after `step` and the three insets** — the gallery's,
  repertoire's, map's, pricing's and calendar's seat. `cur` is hoisted, but `desk` / `tab` /
  `z` / `u`, `n`, `seats`, `paging`, `shown`, `at` and `step` are the branch's, so the block
  sits after them and shares the pager whole: the published discs, the modulo-on-the-read
  wrap and the handler-read cursor needed nothing new. `padH` / `padTop` / `padBot` and their
  comment **moved up** from under Retro's `cards` to just after `step`, values unchanged
  (layout 3's moved-consts precedent), so the block reads them too — Lime's three masters
  pad Retro's exact 56 / 30·30·48·30 / 30·10. The tree is Retro's twin's node for node
  (head over a row of cells; disc, quote, void, foot in each; the same 24 / 16 / 56 / 73.6 /
  5 / 30 boxes and 4 / 3 / 1-and-a-peek seats) and nearly every leaf changes dress, so a
  block. Diff 198 / 11 in `EncoreSection.jsx`, one hunk; the 11 are the moved lines. Retro's
  `T`, `ground` / `groundFg`, `REG`, `SEATS`, `edge`, `glyph`, `arrow` and `card` are not read.
- **Scheme 4 by node, and `get_variable_defs` agreed for once.** The instance nests Scheme 4:
  its fill is `sem/bg` = `#F2FFD0` = **`s.tx`** (the plan's "whole ground is `pillBg`" trap),
  the head `sem/text/1` = `s.bg`. The four cells over a three-entry register on Retro's own
  `SEATS = [0, 1, 0, 2]`, read off every node's fills and strokes at all three widths:
  - seat 0 (and 2): Scheme 4 `sem/box/1` **mist** `#D5E3B2` (block-local, layout 1's
    literal) in a 1px `sem/stroke/1` hairline of ink at .15 (`hair` `#15180F26`), ink
    `s.bg`; disc `sem/text/1` = `s.bg` lettered `sem/bg` = `s.tx`, ringed `hair`.
  - seat 1: nested **Scheme 1**, `sem/box/3` = `s.box3` in `s.stroke1` (pale at .15), ink
    `s.tx`; disc `s.ac` lettered `s.bg`, ringed `s.stroke1`.
  - seat 3: Scheme 4 `sem/text/1` = **`s.bg`** — the page ink, the frame's one **bare**
    cell (no stroke) — ink `s.tx`; disc `s.tx` lettered `s.bg`, ringed `hair`.
  The bare cell is ringed like its neighbours in `s.stroke1`, all but invisible on ink —
  layout 3's Lime call and Retro's normalisation of the same cell, named in the block. Every
  ring is an inset shadow, so the stated heights hold without a border's pixel. No node
  carries an effect but the two discs' `BACKGROUND_BLUR` 24, behind an opaque fill (dropped,
  the header capsule's reading); each disc's 1px `sem/bg` stroke is the ground's own colour
  on a disc standing on the ground (Retro's not-drawn reading, one scheme over).
- **The desktop cell is 344, not Retro's 406.** 716 = 56 + 232 + 28 + 344 + 56: the 1440
  head is two lines of Display/LG at .89 (231.4) where Retro's is 170. The narrow cells keep
  the stated **392.4** with the same 3-line / 2-line residue (voids 131.4 / 155.4 in the
  `sp` frame). `minHeight`, Retro's reading. The head is **`s.dispLg` at every width**
  (130 / 81 / 54 at .89) where Retro's 768 arm is `s.h1`; the 390 master's head is 187.79
  wide and three lines, ours 187.8 and three lines.
- **The glyph is the frame's own → path**, 21.22 × 18.48, `exportAsync` off the vector
  (found from the instance with `findAll`, the memory note's route), inlined in the block
  as two paths (the back arrow is the frame's other path, not a transform) at viewBox
  `0 0 21.2365 18.4747`, in `currentColor`. `LimeArrow` is the pager's 10.23 × 8.91
  vector, a different glyph, and the gallery's 16.02 × 13.94 is inline in its own block.
  The vectors' 1° / −179° rotation is the gallery's leak again, dropped.
- **No `T` table, no Device override, no box token but `radius/pill` and `border/hairline`.**
  `get_variable_defs` is the ramp at all three widths: display-lg 130 / 81 / 54, label-lg
  32 / 21 / 14 at 1.1 on the disc, body-lg 16 / 15 / 15 at 1.5 on the quote, body-md 14 /
  13 / 13 at 1.5 and body-sm 13 / 13 / 12 at 1.4 on the foot. The ramp's desktop rounding
  puts `who` and `role` both at 11px (11.48 and 10.66). Every box is Retro's twin's through
  `u()`; head gap 32 / 30 (SPACE_BETWEEN at 1440, taken as 32), grid gap 16, the 768 grid's
  row gap 20 unreached at three seats.
- **Named diffs, inherited.** The desktop head fills and holds the seeded heading on **one**
  line at 107px (936.9 wide in 1088) where the frame authors two, so the section is 492.3
  against 716 × 0.82 = 587.1 — exactly the second line's 95.2 (Retro's call: a hug here
  would be a line that never wraps). The fourth seat, the ink card, is unreachable at 768
  and 390 at any count (the fan rule). The 390 peek is 54 against the frame's 64 (the
  strip stops at the content edge). The canvas draws seats 0–3 at 1440 in the frame's own
  mist / box3 / mist / ink because `at` is 0.
- **Measured against the masters' content edges** (seeded five): desktop sheet padded 46,
  h2 107px at 46 and 95.2 tall, discs 60.4 (73.6 × 0.82) at y 80.8 with a 17.4 × 15.2 glyph,
  bottom-aligned on the head, grid at 164.2 with four cells 262.2 × 282.1 (320 × 344 × 0.82)
  at radius 24.6 and pad 19.7, disc 45.9 at 26px, quote 13px at 19.5, foot at 393.1 with
  16.5 + 15.4 rows; 768 sheet 30 / 30 / 48, h2 81px at 30 and 144.2 tall (144), discs 73.6
  at 100.6 (100.4), grid at 202.2 (202) with three cells 225.3 × 392.4, disc 56 at 21px,
  quote 15px on three lines (67.5 against the frame's 69), foot at 530.9 (530.4); 390 sheet
  30 / 10, h2 54px three lines 187.8 wide and 144.1 tall (187.79 / 144), discs at 100.5, grid
  at 202.1 with two 300 × 392.4 cells and the second peeking 54, disc 14px, role 12px.
  The canvas has zero pointer cursors and `scrollWidth` holds at every width. `live=1` at
  desktop and 390 (puppeteer, probe deleted): the two discs carry a pointer (six with their
  inherited svg and path), → steps the leading review 1 → 2 → 3, ← steps 3 → 2 → 1 → 5
  (wraps), and the seat colours are unchanged after paging. `n=0` prints *No reviews yet.*
  in one mist card with no discs; `n=1` draws one full-measure card and no discs at desktop
  and 390; `n=2` at 390 draws two 300 cards and the discs; `n=8` draws four / three cells
  with the discs. No page errors. Digest at themes 0, 2, 3 and 4: zero differing files;
  theme 1: exactly testimonials arch 3 at three widths (no `_arch_7_` file exists — the
  convention above).

Learned on the end-of-pass sweep (`047d915` and `2cd0e41`):

- **The claim sites were layout 3's, one layout on.** CLAUDE.md and README said "designed at
  layouts 1, 2 and 3" with `HeaderV0`–`V2` fitted and "Layout 4 is Retro's compositions in
  Lime tokens until its pass". They now say all four, the family closed, and the CLAUDE.md
  placement sentence gained the `s.v3` shapes, `HeaderV3` (with the mirrored desktop
  photograph, open question 6, named as a reversible product call) and the two additive
  helper props this pass grew — `ArcEdge`'s `bleed` and `SealBadge`'s `scheme`. Two comment
  sites made the same claim: `photos.js`'s header and `sectionVm`'s `lime` flag;
  `headerFamily`'s comment and the §10.2 header banner were already true (section 1 wrote
  the banner). The eight layout-4 paragraphs in CLAUDE.md gained a Lime clause each: the
  media's tile mark (a lime glow, still a shadow on the scrim) and its olive band with arcs;
  the gallery's active thumb (3px on the wide rail, 4px on every 390 tile, not live-gated);
  the map's olive `box1` ticker; pricing's rule read as `s.ac` and its box1 / lime feature
  seats; the calendar's three-level stack ("on Lime and Grunge" is Grunge's alone now); the
  form's 1px `s.stroke1` rules, `s.ac` box ring, pale submit and 2px `s.tx` refusal; the
  testimonials' pale `s.tx` sheet with the page-ink fourth seat. The file table was
  re-counted (`EncoreSection.jsx` 21310). `git diff main --stat` before any browser: exactly
  the sections' files — `EncoreSection.jsx`, `photos.js`, this plan and `plans/README.md`.
- **One puppeteer route, three scripts (deleted): the published page at 1440, 390 and 820,
  the thumbnails and the other three cards in one; viewport seam shots in a second; the
  two-build digest in a third.** Layout 1's route unchanged: thumbnail → big card → card 4
  (`[role=dialog] button[aria-pressed]` index 3) → *Use this header* → *Publish* → *Open* →
  `page.once('popup')`, `--autoplay-policy=no-user-gesture-required`, a `scrollIntoView` hook
  and a capture-phase `preventDefault` on the mailto. Every section under Lime at layout 4:
  - **Page.** Eleven roots in the seeded order with every root's top on the previous root's
    bottom (no composed row), the four layout-4 tells, no `repeating-conic-gradient`,
    `scrollWidth` 390 at 390, no page errors anywhere.
  - **Header.** All ten fragment anchors (nine nav, Book Now → `form`) scrolled to their
    ids. At 390 and 820 (a fresh tab each) the burger stands in the 370 / 708 capsule and
    opens a ten-link panel; a link scrolls and the panel closes.
  - **Media.** A tile click loaded its track and played it (`paused` false); Prev, the disc
    (pause, resume), Next and every one of the five tiles moved the `<audio>` source as
    they should.
  - **Gallery.** All nine pointer leaves (seven thumbs, two discs) changed the section; at
    390 the three window tiles and the two pills did, the one "same" being the current slot.
  - **Repertoire.** Each of the eight lit letters called `scrollIntoView` on its group (C,
    already lit, scrolled without changing the rail); the rail is `sticky` at 1440.
  - **Map.** `+` `−` `‹` `›` each changed the section. **Pricing.** Three pills on `#form`.
  - **Calendar.** The four chips (Wedding already lit), the three slot rows and Next Step
    changed the section; the wizard reads 1 input on step 1, 4 on step 2, 2 on step 3 where
    Send Enquiry is `<a href="#form">`, Back twice returns to step 1, and there is no
    `<form>`.
  - **Form.** A refused submit rings every box in `inset 0 0 0 2px rgb(242, 255, 208)` at an
    unchanged 37px and prints the prompt; typing composes the mailto (subject *Enquiry*,
    four values and the message); the valid submit swaps in the sent block; *Write another*
    restores the typed values.
  - **Testimonials.** Both discs changed the row. **Footer.** Nine anchors on their sections.
  - **Seams, against real neighbours at 1440 and 390**: the header meets the bio band on a
    straight edge; the media's lime head arc bulges into the olive; its dark foot arc and
    the gallery's dark head arc make the named lens; the gallery and repertoire are one lime
    band; the repertoire's dark foot arc bulges into the page; the testimonials' pale band
    and the footer meet on straight edges. Nothing to fix.
- **Thumbnails (deliverable 4).** Selecting each canvas root put the sidebar on *<Section>
  layout 4* for all ten body categories (the header on *Header layout 4 · Stacked*) and the
  footer on *Footer layout 1*; the fourth `[role=menuitem]` of every picker is marked current
  and renders the fitted section on the page ground, the header's with no checker.
- **Cards 1, 2 and 3** publish with eleven roots in their own orders (card 3 composed at 1440
  and `PAGE_ORDERS[2]` at 390), every header anchor scrolling, and the burger opening a
  ten-link panel that scrolls at 390. Card 2 keeps its `#C7FF3C` place card and card 3 its glass
  glow; **no Lime card draws
  the checker any more.**
- **Six script traps, all met on this sweep.**
  - A top-left offset click on a canvas root taller than the viewport, after
    `scrollIntoView({ block: 'center' })`, lands in the **top bar's theme dots** — thumbnails
    5–10 came back in Editorial's palette before it was caught. Scroll `block: 'start'` and
    click 30 / 30 in.
  - The canvas card's shadow serialises as `0px 8px 40px`, not the source's `0 8px 40px`;
    filter canvas roots on the serialised string, or the sidebar's own `--ac` previews count.
  - The burger is a `span` of three bars with no label, not a button: find it by three
    children, a pointer cursor and a 26px width.
  - A text matcher must take the **deepest exact** match: `startsWith` matched the pills'
    parent ("BackSend Enquiry") and clicked between them, so "Back ×2" left the wizard on
    step 2.
  - `clip` with `captureBeyondViewport: false` on the popup throws *Cannot take screenshot
    with 0 height* for every clip, and beyond-viewport clips of the 390 page came back with
    the media's foot seam missing (a straight olive-to-lime edge — the garbling layout 3
    named). Viewport screenshots after scrolling the seam into view are what showed the arcs.
  - The two-build digest's noise is the seal's spin: 3–12 `<text>` / `<textPath>` rows per
    width between two walks of the *same* build. `emulateMediaFeatures` reduced-motion (the
    memory note's recipe; `index.css` stops the spin under it) takes it to zero.
- **Two-build digest** (repo root on `127.0.0.1:8931`, the old build digested before the
  `cp`, one fresh page per theme, the seal stopped). Eleven roots at 1088 / 768 / 390 in
  both builds and **zero differing rows at all five themes and three widths** on the seeded
  page; **zero at Retro's card 4 as well** (Retro's layout 4 is untouched in the built
  artefact, which the harness digest never checked); 645 / 629 / 622 at Lime's card 4.
  - The shipped-it tell is the modal: the old build's Lime card 4 draws the checker
    (`repeating-conic-gradient`) and nothing pale; the new one's draws the pale
    `rgb(242, 255, 208)` seal disc and the mirrored photograph (`matrix(-1, …)`) and no
    checker. Cards 1–3 read the same in both.
  - The string tell is `3:{bio:` (the `layouts[3]` seed): one hit in the new file, none in
    the old; `bleed` appears 9 times against 4.
  - Sizes: 35 photographs, 4.0 MB, unchanged. The standalone file is 6.48 MB (was 6.44).

## Open questions

1. *Settled in section 3 — each seam keeps its frame's own colour (media's foot `s.bg`), the
   lens is named in the block, and the gallery session checks the meeting in the editor; see
   its Conventions.* **The lens where the video was.** Media's foot arc and the gallery's head arc are both dark
   and meet directly on our page, giving a 44 + 44 dark lens between the olive and lime bands —
   what the frame would show with its video frame deleted. Default: keep each seam in its
   frame's own colour and name the diff; the media session decides, and the gallery session
   checks the meeting in the editor with the `[--ac]` rect walk. Drawing the media's foot in
   the gallery's lime is the alternative, and no master draws it.
2. *Settled in section 3 — the second answer: `ArcEdge` gained an additive `bleed` prop
   mirroring `TornEdge`'s, the sheet stays in the branch, and the theme-1 digest proved
   layout 1's three callers unmoved; see its Conventions.* **`ArcEdge` inside a bled sheet.** Layout 1's three arc callers (media, map, form) draw no
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
3. *Settled in section 2 — `SEEDS.Lime.layouts[3].bio = limeBioStage`, a 2.7 against 27 render
   diff; see its Conventions.* **The bio's `layouts[3]` seed.** The frame fills the whole `fa453f7d` source into a portrait
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
5. *Settled in section 4 — `s.bg`, `ArcEdge`'s default: the 1440 vector alone binds
   `sem/box/3`, the 768 and 390 vectors bind `sem/bg`, and layout 1's rule says a seam is
   the neighbour's ground; the 5-in-255 difference is named in the block and not drawn. The
   lens was checked in the editor at all three widths; see its Conventions.* **The gallery's head seam is `sem/box/3` `#101309`, not `sem/bg`.** A hair off the page
   ground it meets, and the only seam on the page not bound to a neighbour's `sem/bg`. Whether
   it is drawn in `s.box3` (the frame's binding) or `s.bg` (the neighbour's ground, layout 1's
   rule) is the gallery session's call after reading the render's edge; a 5-in-255 difference
   on a 44px arc is unlikely to show either way, and the lens (question 1) is the place it
   could.
