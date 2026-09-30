# Editorial layout 4 — section-by-section plan

This is the working checklist for bringing **layout 4** of the Editorial template up to its Figma
designs, the way [`../lime/layout-4.md`](../lime/layout-4.md) did for Lime and
[`../grunge/layout-4.md`](../grunge/layout-4.md) for Grunge. It runs one unit per session, all three
widths together, clearing context between units. Layouts 1 (`s.v0`), 2 (`s.v1`) and 3 (`s.v2`)
under `s.editorial` are fitted and merged; nothing here should move any of them. **This pass closes
the Editorial family**: `HEADER_COUNT.editorial` is 4, the setup modal offers four Editorial cards,
and after this pass all four are fitted pages.

**This plan is Grunge layout 4 again, with Editorial layouts 1–3's idiom.** It does not repeat any
of them: the page order, the wrappers, the procedure, the harness, the digest and the verification
are Lime's and Grunge's layout-4 ones, verbatim, with `theme=2` read as `theme=3`. The gates
(`s.limeTree`, `s.editorial`), route A's scheme resolution (`SCHEMES_OF`), `vm.onScheme`,
`DashRule`, `Tape`, `notoEms` and the uppercase-per-site rule are [`layout-1.md`](./layout-1.md)'s,
[`layout-2.md`](./layout-2.md)'s and [`layout-3.md`](./layout-3.md)'s, and they carry over whole.
What is written here is only what differs — and what differs most is that **Grunge's layout-4 page
is black with four red grounds and torn seams, and this one runs ink → taupe → ink → paper →
terracotta on straight edges, with no seam anywhere**, a tilted print in two sections and layout
1's tape back on the media sleeve.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then
- the whole *Conventions* of [`layout-3.md`](./layout-3.md), [`layout-2.md`](./layout-2.md) (and its
  *Settled in session 0*: the per-width seat, the card on the page, `vm.onScheme`) and
  [`layout-1.md`](./layout-1.md) (the foundation: `s.limeTree` / `s.editorial`, `SIENNA_MEDIA`,
  `DashRule`, `Tape`, the tilted prints under drop shadows, `notoEms`, route A)
- [`../CONVENTIONS.md`](../CONVENTIONS.md), groups **A, B, C and D4**, and the bullets they point at
- the section's *Settled in section N* bullets in **both** [`../lime/layout-4.md`](../lime/layout-4.md)
  and [`../grunge/layout-4.md`](../grunge/layout-4.md) — the block you are widening, and the one
  widening of it already done — **and the section's entries in both layout-4 QA batches**,
  [`../lime/layout-4-qa-fixes.md`](../lime/layout-4-qa-fixes.md) (JP-052 the calendar's right
  column, JP-053 the wizard's mailto, JP-054 the form's copy and boxes, JP-038 the page-ground
  inset) and [`../grunge/layout-4-qa-fixes.md`](../grunge/layout-4-qa-fixes.md) (JP-076 the
  calendar's own email, JP-077 · JP-078 the map's stat wall, JP-079 the form's steps, JP-080 the
  ticker, JP-081 the repertoire's head and the six tags, JP-082 the bio's Listen and two labels,
  JP-083 the rail's `#`, JP-084 the now-playing title), which moved those blocks **after** their
  *Settled* bullets were written. The blocks you widen are in that post-QA shape, not the bullets'.
- the *Conventions* **and the 2026-09-15 Addendum** of [`../retro/layout-4.md`](../retro/layout-4.md),
  which built every `s.v3` branch
- the *Per-session procedure* of [`../lime/layout-4.md`](../lime/layout-4.md)

Then the memory notes `figma-frame-reading`, `verifying-the-published-tab` and
`browser-tool-choice`. `SPEC.md` lives in git history: `git show 8fa8ff4:SPEC.md`.

Branch: **`editorial-layout-4`, forked from `main`** (`d09eab7`, the merge of
`grunge-display-face`, PR #43). `editorial-layout-3` merged as PR #37 (`8a8d3ed`); the Grunge QA
batches after it (PRs #38–#42) and the display face (PR #43) moved shared layout-4 seams, which is
why the read-first list names Grunge's layout-4 QA batch.

## What the pass must deliver

1. **Every layout-4 section works in the published tab under Editorial**: every `s.v3` control
   CLAUDE.md lists under *`s.live` is false everywhere except the published tab* — the media
   player's tile grid and transport, the gallery's spotlight, rail and arrow discs with the 390
   sliding window, the repertoire's A–Z rail (sticky at desktop, with JP-083's `#` cell), the map's
   ticker arrows and zoom, the calendar's enquiry wizard (steps, chips, boxes, Back / Next Step,
   *Package ›*, the summary column, Send Enquiry's mailto and its refusal, JP-076's own address),
   the form's boxes and mailto submit, the testimonials' paging discs, the header's nav and burger.
   Each session drives them at `theme=3&live=1` and checks their lit, idle and refused states read
   on this page's grounds: **terracotta on terracotta and ink on ink are the risks again** — the
   repertoire's lit rail cell is terracotta on an ink panel, the gallery's picked thumb is an 8px
   terracotta ring on the ink band, the testimonials' discs stand on the terracotta sheet, and the
   form's and wizard's refused boxes are frame-less states on paper and on the ink card.
2. **Every layout-4 section looks as close to its Figma frame as possible**, at 1440 (× 0.82 onto
   the 1180 canvas), 768 and 390. There is no composed row on this page.
3. **The setup modal's card 4, "Stacked", lays out a fitted page.** `pickHeader` writes arch 3 to
   every section; `pageOrder(3)` falls to `EXAMPLE_PAGE`'s order, which is this page's. This pass
   turns card 4 from its placeholder — `HeaderV3`'s Retro half in Editorial's tokens, checker floor
   and all, and every other section Retro's flat `s.v3` arm on Scheme 1 — into Editorial's own
   page, and the last Editorial card into a fitted one. The header session verifies it **in the
   builder**.
4. **The sidebar's layout-picker thumbnails for layout 4** under Editorial look like their
   sections. Check once, in the sweep.

## What this pass actually is

**Editorial's layout-4 page is Lime's layout-4 page in a fourth variable mode**, as its layout-1,
-2 and -3 pages were — with two sections, the media player and the gallery, whose centrepiece is
layout 1's tilted print. The evidence, read at planning time (2026-09-30) with one `use_figma` walk
per page frame and per section (main component, `explicitVariableModes` on every node, fills and
strokes with their bound variables and collections, `dashPattern`s with per-side weights, effects,
radii, rotations, image hashes and scale modes, text faces, sizes and inks), a paired diff of each
section's desktop master against its 768 and 390 masters, and the longest common subsequence of
every visible node's `(depth, type, name)` against the twins' bands, **by traversal order**:

| Section | Editorial nodes (1440 / 768 / 390) | LCS with Lime (1440 / 768 / 390) | with Grunge (1440) | What only Editorial draws, and what it drops |
|---|---|---|---|---|
| header | 61 / 57 / 57 | **61 / 57 / 57** — node for node | 59 of 62 | nothing; Grunge's extra node is its grain rect. The mock name is Lime's "Kai Mercer", unoverridden |
| bio (Section) | 34 / 34 / 33 | 33 / 33 / 30 | 33 of 35 | **`Frame 255`**, the dimmer Grunge also has (1440 and 768 only); at 390 the Tags instance's **Genres** label and two frames Lime's 390 lacks |
| media (band) | 57 / 57 / 57 | 54 / 53 / 54 | 54 of 57 | **`Frame 210` with its `image 1`** — layout 1's **tape** on the sleeve; **drops Lime's two arcs** (`Vector 1` / `Vector 2`) at every width. The 768 band is `Frame 326` where Lime's is `Frame 325` (a rename) |
| *video* (`Frame 318`) | 39 / 39 / 39 | 39 / 39 / 39 | 39 of 39 | — *not in the project* |
| gallery (wrapper) | 23 / 22 / 23 | 21 / 20 / 21 | 20 of 28 | **`Frame 183` → `Frame`**, a tilted print in a `#1D1D1D` mount under a drop shadow, in place of Lime's bracketed well (`Frame` / `Frame 37` / `IMAGE` / three `Frame`s); keeps Lime's `Vector 1` arc node at 1440 only (ink on the ink band — *not drawn*, below) |
| repertoire (Section) | 93 / 93 / 93 | 93 / 93 / 93 | 93 of 94 | drops Lime's foot arc `Vector 2` |
| map (`Frame 319`) | 61 / 61 / 61 | 61 / 61 / 61 | 61 of 62 | drops Lime's no-op `Vector 2` at 1440 |
| pricing | 61 / 61 / 61 | 61 / 59 / 61 | 61 of 61 | — (the 768 difference is two divider frames reordered) |
| calendar (Book Us Section) | 99 / 99 / 99 | **99 / 99 / 99** | 99 of 99 | — |
| form | **—** / 59 / 59 | — / 59 / 59 | — | **the 1440 page carries no form instance** — Grunge's case again; see below |
| testimonials | 41 / 33 / 41 | 41 / 33 / 41 | 41 of 41 | — |
| footer | 35 / 35 / 35 | 29 of 47 | 29 of 47 | **layout 1's own Editorial footer** (`Component 2 / Property 1=editorial` `446:8698`, `907:12166`, `907:12467`) on **Scheme 3** — out of scope: `NVAR.footer` is 1, and row 0's seat is already 3 |

- **Every instance is the `Theme=Editorial` variant** of the set the twins instantiate (header
  `624:5226`, bio `660:2568`, media `692:4109`, gallery `706:4771`, repertoire `736:2408`, map
  `731:3937`, pricing `719:3534`, testimonials `755:2180`; narrow variants `787:9589`,
  `878:10603`, `868:9834`, `888:10554`, `860:13723`, `880:19133`, `860:12567`, `861:9852`,
  `880:21734`, `859:12555`, `880:13002`, `859:13886`, `880:14316`, `861:12918`, `880:24796`), and
  carries `1 · Primitives` → **Sienna Vale**. Ids differ per variant, so diff **by traversal
  order** (layout 1, *What this pass actually is*).
- **The three page frames are Sienna Vale, Scheme 1** (`964:73037` reads `[Sienna Vale, Scheme
  1]`; the 768 frame adds `Device: Tablet`, the 390 frame `Device: Mobile`). **Two narrow
  instances carry a Device override**, Grunge's two: the 768 header's `Device: Tablet` (a no-op on
  the tablet page) and the **media player's at 768 and 390** — the 390 media instance is in the
  768 ramp. Every other instance resolves its page's device.
- **The desktop form is missing from the page again.** `Frame 263` runs pricing → Book Us →
  testimonials with nothing between, as Grunge's `964:72943` does, where Lime's `964:72940`
  stands. The **main component** `Theme=Editorial` **`725:3049`** (1440 × 809, Sienna Vale,
  Scheme 1 by default) is the desktop master this pass fits — the set's own variant, the one the
  narrow instances are variants of. Grunge's open question 1, the same answer.
- **No seams.** Lime's arcs are gone at every width; nothing is torn. The one arc node left, the
  gallery's `Vector 1` (1437.8 × 44.2 at y −1, 1440 only), is filled `sem/box/3` — ink — inside the
  ink gallery band, and invisible on the render: Lime's leftover, **not drawn** (the map's
  `Vector 2` precedent, layout 3's media `Vector 2`).
- **Effects are back, as on Grunge's page, plus one drop shadow**: four backdrop blurs at Lime's
  sites and radii (the nav capsule 44, the bio glass 54, the gallery discs 18.1 at 1440 and 768,
  the testimonials discs 24) and a **`DROP_SHADOW`** under the gallery's tilted print (r 4, `#000`
  at .25, offset 5 / 4, at every width). Three of the blurs stand behind an opaque fill and paint
  nothing; the bio's stands behind Lime's leaked `#2E3928` at 1% and a dimmer, and reads. No
  `INNER_SHADOW` anywhere: every Lime glow is a ring or a border here.
- **The narrow shapes are Lime's, which are Retro's**: the tablet Book Us pair stacked, the
  repertoire inset to 310 inside a 370 frame, the 390 media, wizard and repertoire called "—
  Tablet". Re-measure every number (*Sizes*).

So, as under Grunge's layout 4 and Editorial's layouts 1–3: **no Editorial-only branches and no
Editorial-only ternary trees.** The work is Editorial deltas inside **Lime's layout-4 blocks**,
each widened from `(s.lime || s.grunge)` to `s.limeTree` with `const ed = s.editorial` naming the
deltas — or a third arm at the head of the block's `G`, whose Lime and Grunge arms stay
byte-identical. **Themes 1 and 2 are the digests at risk**: every widened block is one Lime *and*
Grunge render.

**Where each Lime block sits decides how it widens** (Grunge's placements, re-found at planning
time by walking each `(s.lime || s.grunge)` gate to its enclosing branch — the code survey found
**no** `s.editorial` or `s.limeTree` read in any layout-4 block or branch but two lines of
`HeaderV3`'s Retro half):

- `if (s.lime || s.grunge) { … return }` **at the head of `HeaderV3`**. Widening it makes Retro's
  half unreachable under Editorial, so the half's one placeholder arm — `pill={{ size: s.editorial
  ? undefined : T.pill, … }}` and the comment above it ("Layout 4's pass fits the bar") — becomes
  dead code and is **deleted**; the theme-0 digest proves nothing moved (layout 3 deleted
  `HeaderV2`'s `mustard` the same way).
- `if (s.v3 && (s.lime || s.grunge))` **ahead of `if (s.v3)`** — the bio, the media player and
  the enquiry form, whose state is hoisted.
- `if (s.lime || s.grunge)` **inside `if (s.v3)`, after the seam** — pricing (after `bleedX`),
  repertoire (after `jump`), gallery (after `from`), calendar (after `onNextTag`), map (after
  `zoomScale`), testimonials (after `padBot`).

**Inheritance** ([`../CONVENTIONS.md`](../CONVENTIONS.md)): **A** and **B** always; **C**, since
this is another variable mode of a page already fitted; **D4**, since its blocks are Lime's
layout-4 blocks, widened as Grunge widened them. Not D1–D3: the shared helpers the earlier passes
widened (`BookPill`, `Pager`, `TagChips`, `labelStyle`, `NavBar`, `SealBadge`, `DashRule`, `Tape`,
`LogoMark`, `Photo`) already switch on under Editorial; what they draw on this page is each
session's to check — and three of them fire **wrongly** here (*What already renders*). Keep the
running *Inherited and used* list below; the sweep folds it into that file as a *Leaned on in
Editorial (layout 4)* column, and gives D4 an Editorial column.

### The page order is the seeded order, and there is no composed row

Lime's section holds unread, Grunge's too. `pageOrder(3)` falls to `PAGE_ORDERS[0]`,
`EXAMPLE_PAGE`'s order, and all three Editorial pages stack exactly that (with the video band
between media and gallery, which the project does not carry): header, bio, media, gallery,
repertoire, map, pricing, calendar, form, testimonials, footer. **Expect no change to
`PAGE_ORDERS`, `pageRows`, `NVAR`, `CATS` or `HEADER_COUNT`.** `preview.jsx`'s `&column=` and
`&page=` are layout 3's and are not read here.

### What `sectionVm` owes this pass

- **One data row, session 0's**: `SCHEMES_OF.Editorial[3]` (decision 1). No new scheme, no
  per-width triple, no `editorialCard`, no footer entry.
- **`navGapEm`'s Editorial arm is wrong at `d === 3`.** It reads `T.name === 'Editorial' ? (d === 1
  || d === 2 ? 0 : 23 / 16) : …`, so layout 4 sums its links at 1.4375 em — 28.75px at the frame's
  20px, where the frame's capsule gaps are a **fixed 23** (the links at x 0 / 84 / 210 / 288 / 413 /
  598 / 690 / 801 with widths 61 / 103 / 55 / 102 / 162 / 69 / 88 / 72: every gap 23). That is
  Grunge's layout-4 pattern exactly: the 0 arm widens to `d >= 1` and `HeaderV3`'s block passes
  NavBar's additive `links={{ gap, cap }}` (Grunge's section 1). The header session measures before
  writing.
- **No pad arm.** Every template-keyed `vm.pad` arm is `d === 2`; the layout-4 page-ground inset
  (JP-038's 56 / 30 / 10) is every theme's, and Editorial's masters state it (every wrapped
  instance at x 56 / 30 / 10). Each session confirms its own section's insets.
- **`vm.navFits` has no layout-4 arm and needs none** (the 768 masters draw the burger), and
  **`navModeDefault`** is *Follow my sections* at `d === 3` for every template — the 1440 capsule
  draws all eight section labels.
- **`vm.titleWordEms` is not read by the form at layout 4** (its head is one line at 118). *The
  bio reads it (section 2), which moved its Editorial arm to Noto's 540 table at design 3.*

## The Figma source

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Frame 263 | `964:73037` | 1440 × 9573.5 |
| Tablet | Frame 268 | `971:9537` | 768 × 11086.7 |
| Mobile | Frame 273 | `977:13155` | 390 × 9976 |

- Desktop: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=964-73037&m=dev>
- Tablet: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=971-9537&m=dev>
- Mobile: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=977-13155&m=dev>
- Desktop form (main component): <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=725-3049&m=dev>

`fileKey` = `uFoUbPaBrDicjyuSBEbtGT`. All three, Grunge's three (`964:72943` / `971:7822` /
`977:12043`), Lime's (`964:72848` / `971:5298` / `977:8866`) and Retro's (`964:72510` / … ) are on
the **Layout 4** page, `964:58574`. `getNodeByIdAsync` on an instance id works without a page
switch; a `query` over the page wants `await figma.setCurrentPageAsync(await
figma.getNodeByIdAsync('964:58574'))` first. The form's main component `725:3049` lives on another
page; read it by id. **`get_variable_defs` takes top-level ids only** (layout 3's session 0), so a
nested node is read through its instance or with `use_figma`.

**Match on node id and width, never on the name** — the twins' liars hold exactly: the `Tags —
Frame` instance is "— Desktop" at all three widths **and "`Theme=Lime`" at 768 and 390** (its
colours are Sienna Vale's all the same: the primitives are inherited, unlike layout 3's olive
leak), the gallery wrapper is "Gallery Sections — Component 1 — **Desktop**" at every width, the
bio instance is "— Desktop" at 768, the 768 and 390 footers are "Footer — Component 3 / 4 —
Desktop", and the 390 media player, wizard, repertoire and calendar are called "— Tablet".

**The same things are wrapped as on Lime's and Grunge's pages**, and a wrapper that paints is the
fit's:
- **bio** stands in an ink `Section` (Scheme 3 `sem/bg` `#141414`; pads 116 / 56 at 1440, 60 / 30
  at 768, 30 · 40 / 10 at 390) beside (1440) or under its head frame, which holds "KM BIO",
  "Reads the room." and the `Tags — Frame` instance.
- **media** stands in a taupe band (`Frame 317` / `326` / `327`, Scheme 2 `#AA958A`; pads 156 /
  100, 100 / 100 with gap 10, 40 / 40 with gap 10) under its "Six Worth Your Ears" head, whose
  own `Section` is **Scheme 1** (the head's ink is `sem/media`, below).
- **gallery** stands in an ink wrapper (Scheme 3; pads 100 over the head at 1440, 0 at 768, 60 at
  390) beside (1440) or under its "MEDIA" / "Snaps from the night" head.
- **repertoire** stands in a **`#1D1D1D`** panel (`sem/box/1`, **square**, padding 60 / 50 / 40 ·
  30, gap 40) under its "Repertoire" head, inside an ink `Section` (pads 100 · 150 / 56, 100 · 150 /
  30, 30 · 40 / 10): `964:73099` (1328 × 771), `971:9596` (708 × 769), `977:13463` (370 × 789).
- **map** stands in `Frame 319` (Scheme 1, the page; pads 80 · 40 at 1440 and 768, 30 · 40 with gap
  20 at 390) under its head.
- **calendar** stands in `Frame 324` with the "Book Us" head and the wizard: `964:73113` (1328 ×
  793), `971:9611` (708 × 1251), `977:13478` (370 × 1097). Its fill is **`#EDE6DC` (`sem/box/2`),
  square**, dashed 5, 5 in `sem/stroke/1` ink at 1440 and 768 and **undashed at 390** — where
  Lime's is `box/2` at 60 / 60 / 30 and Grunge's `box/3` at 15.

## The sections

Page order. Sizes are the frames' own. Each row's three masters are fitted in one session. **Lime
block** is where that section's Lime layout-4 block sits in `EncoreSection.jsx` (grep the Lime or
Grunge twin's desktop id — each block's fit comment cites them); it is the gate the session widens.

| # | Cat | Desktop node | Size | Tablet node | Size | Mobile node | Size | Scheme (every width) | Lime twin (1440 / 768 / 390) | Grunge twin (1440 / 768 / 390) | Lime block | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | *foundation* | `964:73037` *(page)* | — | `971:9537` | — | `977:13155` | — | — | — | — | `SCHEMES_OF.Editorial[3]` (decision 1) | **done** (`4018742`) |
| 1 | `header` | `964:73038` | 1440 × 900 | `971:9538` | 768 × 1024 | `977:13156` | 390 × 844 | **3** (nav **1**, seal **4**, chips name Scheme 1) | `964:72849` / `971:5299` / `977:8867` | `964:72944` / `971:7823` / `977:12044` | `if (s.lime \|\| s.grunge) { … return }` at the head of `HeaderV3` | **done** (`8d2340e`) |
| 2 | `bio` | `964:73046` *(Section `964:73039`, head `964:73040`)* | 664 × 720 | `971:9546` *(Section `971:9539`, head `971:9540`)* | 708 × 720 | `977:13164` *(Section `977:13157`, head `977:13158`)* | 370 × 536 | **3** (Section *and* instance; Tags **1**) | `964:72857` / `971:5307` / `977:8875` | `964:72952` / `971:7831` / `977:12052` | `if (s.v3 && (s.lime \|\| s.grunge))` ahead of `Bio`'s `if (s.v3)` | **done** (`b589827`) |
| 3 | `media` | `964:73053` *(band `964:73047`, head `964:73048`)* | 1440 × 671 | `971:9548` *(band `971:9547`, head `971:10389`)* | 768 × 569 | `977:13294` *(band `977:13288`, head `977:13289`)* | 390 × 845.9 | **2** (head **1**; 768 / 390 `Device: Tablet`) | `964:72864` / `971:5431` / `977:9005` | `964:72959` / `971:7955` / `977:12182` | `if (s.v3 && (s.lime \|\| s.grunge))` ahead of `Media`'s `if (s.v3)` | **done** (`1a7af2a`) |
| 4 | `gallery` | `964:73096` *(wrapper `964:73061`, head `964:73062`)* | 874 × 646 | `971:9593` *(wrapper `971:9558`, head `971:9559`)* | 768 × 594 | `977:13460` *(wrapper `977:13425`, head `977:13426`)* | 390 × 585.5 | **3** (discs **4**) | `964:72909` / `971:5597` / `977:9171` | `964:73004` / `971:8121` / `977:12348` | `if (s.lime \|\| s.grunge)` inside `Gallery`'s `if (s.v3)`, after `from` | **done** (`5066e4f`) |
| 5 | `repertoire` | `964:73103` *(Section `964:73098`, panel `964:73099`)* | 1208 × **506** | `971:9600` *(Section `971:9595`, panel `971:9596`)* | 608 × **564** | `977:13467` *(Section `977:13462`, panel `977:13463`)* | 310 × **626** | **3** | `964:72916` / `971:5604` / `977:9178` | `964:73011` / `971:8128` / `977:12355` | `if (s.lime \|\| s.grunge)` inside `Repertoire`'s `if (s.v3)`, after `jump` | open |
| 6 | `map` | `964:73110` *(Frame 319 `964:73104`, head `964:73105`)* | 1440 × 747 | `971:9608` *(Frame 319 `971:9602`, head `971:9603`)* | 768 × 870 | `977:13475` *(Frame 319 `977:13469`, head `977:13470`)* | 390 × 680 | 1 (viewport **3**) | `964:72924` / `971:5612` / `977:9186` | `964:73019` / `971:8136` / `977:12363` | `if (s.lime \|\| s.grunge)` inside `EventsMap`'s `if (s.v3)`, after `zoomScale` | open |
| 7 | `pricing` | `964:73111` | 1440 × **532** | `971:9609` | 768 × **790** | `977:13476` | 390 × 829 | 1 | `964:72926` / `971:5613` / `977:9187` | `964:73021` / `971:8137` / `977:12364` | `if (s.lime \|\| s.grunge)` inside `Pricing`'s `if (s.v3)`, after `bleedX` | open |
| 8 | `calendar` | `964:73124` + wizard `964:73123` *(Section `964:73112`, Frame 324 `964:73113`)* | 478 × 518 + 680 × 518 | `971:9622` + `971:9621` *(Section `971:9610`, Frame 324 `971:9611`)* | 608 × 493 + 608 × 473 | `977:13489` + `977:13488` *(Section `977:13477`, Frame 324 `977:13478`)* | 350 × 484 + 350 × 470 | 1 (Back pill **3**) | `964:72939` + `964:72938` / `971:5626` + `971:5625` / `977:9200` + `977:9199` | `964:73034` + `964:73033` / `971:8150` + `971:8149` / `977:12377` + `977:12376` | `if (s.lime \|\| s.grunge)` inside `Calendar`'s `if (s.v3)`, after `onNextTag` | open |
| 9 | `form` | **`725:3049`** *(the main component — no page instance at 1440)* | 1440 × 809 | `971:9623` | 768 × 1044 | `977:13490` | 390 × 992 | 1 | `964:72940` / `971:5627` / `977:9201` | `725:2990` / `971:8151` / `977:12378` | `if (s.v3 && (s.lime \|\| s.grunge))` ahead of `EnquiryForm`'s `if (s.v3)` | open |
| 10 | `testimonials` | `964:73125` | 1440 × 716 | `971:9624` | 768 × **628.4** | `977:13491` | 390 × 609.4 | **4** — a real sheet (cell 2 **1**) | `964:72941` / `971:5628` / `977:9202` | `964:73035` / `971:8152` / `977:12379` | `if (s.lime \|\| s.grunge)` inside `Testimonials`' `if (s.v3)`, after `padBot` | open |
| — | `footer` | `964:73126` | 1440 × 479.5 | `971:9625` | 768 × 692.3 | `977:13492` | 390 × 736.3 | 3 (row 0's) | — | — | — | **out of scope**: layout 1's Editorial footer on its own ink seat; `NVAR.footer` is 1 |
| — | `video` | `964:73054` | 1440 × 1175 | `971:9551` | 768 × 647 | `977:13295` | 390 × 362 | 1 (paper) | — | — | — | **not in the project** (`d734992`); Retro's, Lime's and Grunge's layout-4 passes declined restoring it, and this pass does the same |

**No section changes scheme between widths on this page** (the paired diff: every seat and every
nested mode reads the same at 1440, 768 and 390) — where Grunge's bio (1 / 3 / 3) and seal
(4 / 3 / 3) moved. Layout 2's triple has no row here.

**Cite branches by id, never by line number**: the file is ~25 800 lines and every session moves
it. **Re-measure from the Editorial frame; never reuse Lime's or Grunge's block sizes** — nearly
every card is square here where the twins round it.

### Sizes: re-measure, and expect the head type to be the difference

| Section | Editorial 1440 / 768 / 390 | Grunge | Lime |
|---|---|---|---|
| header | 900 / 1024 / 844 | the same | the same |
| bio instance | 664 × 720 / 708 × 720 / 370 × 536 | the same | the same |
| bio Section | 952 / **1221** / **914** | 952 / 1132 / 778 | 952 / 1241 / 822 |
| media instance | 671 / 569 / **845.9** | 671 / 501 / 834 | 671 / 569 / 836 |
| media band | **1032** / 844 / 1021.9 | 1043 / 783 / 1005 | 1043 / 791 / 1094 |
| gallery instance | 874 × 646 / 768 × 594 / 390 × 585.5 | … / 586.3 | the same |
| gallery wrapper | 746 / **771** / 755.5 | 746 / 878 / 711.3 | 746 / 878 / 806.3 |
| repertoire instance | 1208 × **506** / 608 × **564** / 310 × **626** | 1208 × 600 / 608 × 582 / 310 × 650 | 1208 × 536 / 608 × 582 / 310 × 650 |
| repertoire Section | **1021** / 1019 / **859** | 1126 / 1044 / 901 | 1062 / 1044 / 948 |
| map instance | 747 / 870 / 680 | the same | the same |
| map `Frame 319` | **1077** / 1055 / 856 | 983 / 1062 / 811 | 983 / 1063 / 866 |
| pricing | **532** / 790 / 829 | 542 / 806 / 829 | 546 / 809 / 837 |
| wizard | 680 × **518** / 608 × 473 / 350 × 470 | 680 × 533 / 608 × 476 / 350 × 474 | 680 × 536 / 608 × 479 / 350 × 474 |
| calendar | 478 × **518** / 608 × 493 / 350 × 484 | 478 × 533 / 608 × 502 / 350 × 496 | 478 × 536 / 608 × 505 / 350 × 496 |
| Book Us Section | 953 / 1351 / 1197 | 979 / 1370 / 1211 | 982 / 1376 / 1218 |
| form | **809** *(component)* / 1044 / 992 | 795 *(component)* / 1024 / 964 | 795 / 1024 / 971 |
| testimonials | 716 / **628.4** / 609.4 | 716 / 642.4 / 603.4 | 716 / 642.4 / 624.4 |

Sienna Vale's ramp is layout 1's mode table plus the two layout-4 keys, both read with
`get_variable_defs` on the header instance at planning time: **`size/display-xl` 179** (the
header's name; `s.dispXl` 147 / 107 / 64 on the canvas — 179 × 0.82 — already in Editorial's
ramp) and **`size/label-md` 20** (the nav links; `s.labelMd` 16 / 14 / 13). The chips are
**Label/XS**, Chakra Petch 20 (`s.labelXs`). Every other size this walk read is a text segment's
glyph size, not a token — each session calls `get_variable_defs` before trusting one, and the
media's narrow masters are in the 768 ramp. Three differences want a reason before anything is
transcribed:

- **The map's `Frame 319` is 94 taller at 1440**: its head "Distances we'll Travel" sets on two
  lines at 118 (210 tall) in the demo face. Noto's width will decide ours; the head is a
  *head that must fit its measure* candidate only if a word overruns (CONVENTIONS C).
- **The bio Section is 89 taller at 768 and 136 taller at 390 than Grunge's**: the Genres label
  is drawn (Lime and Grunge drop it) and the head runs two lines. Read the head frame's own
  heights before blaming the card.
- **The repertoire instance is 94 shorter than Grunge's at 1440** (506 against 600): no 32 inset
  (Grunge's `grunge && desk`), and Sienna Vale's Display/Title rows. As under both twins, the
  seeded songs set our height, not the frame's rows.

## Editorial's layout-4 mode

Sienna Vale's Schemes 1–5 are in `THEMES[3]` (`palette` / `sem` / `tags`, `schemes[2]` …
`schemes[5]`) with layouts 1–3's traps. **This page reads Schemes 1–4 only, and every one is
already in `THEMES`**: no new scheme, no scheme number the model cannot tell apart, no Scheme 5.
On an ink (Scheme 3) node: `bg` `#141414`, `text1` **terracotta**, `text2` **paper**, `box1`
`#1D1D1D`, `box2` `#2A2A2A`, `box3` `#0E0E0E`, `stroke1` **paper 56%**, `stroke2` **blush**,
`active` terracotta / paper. On a terracotta (Scheme 4) node: `bg` `#C86E52`, `text1` **paper**,
`text2` **ink**, `box1` `#DA7C5E`, `box3` `#BE6346`, `stroke1` paper 56%, `stroke2` **ink**,
`active` **ink** / terracotta.

**Schemes by node** — `explicitVariableModes` on every node of all 30 masters, with each node's
bindings resolved to names **with their collection** (`Scheme:` is the node's own scheme,
`Primit: scheme/N/…` names another outright). Identical at every width unless the row says so.

| Section | Seat | Nested | What it paints (bindings read at planning time) |
|---|---|---|---|
| header | **Scheme 3** | nav `Frame 49` **Scheme 1**; seal `Frame 247` (1440, 768) / `Frame 248` (390) **Scheme 4**; the chips name **`scheme/1/tagN`** | the instance's own fill `box/3` `#0E0E0E` under `ae069c14` at **`FILL`** and a linear fade `#141414` (opaque) → transparent — the floor into the ink bio band. The **capsule is paper** (`sem/bg` of Scheme 1), radius 85, blur 44 behind it; Lime's **globe** in `text/2` ink (3px strokes), the name ink at Label/LG 24, the links **ink** at Label/MD 20 upper, fixed 23 gaps; Book Now `active/bg` terracotta, its label and disc paper, the arrow terracotta. The **avatar tile is an arch**: 113 × 145 / 113 × 119 / 116 × 119, `box/1` `#1D1D1D` under `488cc3d7`, a **3px** (`border/default`) blush `stroke/2` inside ring, radius **76.9 / 76.9 / 0 / 0** (Lime 26.95, Grunge 12). Kicker terracotta at Display/Title 32; the name **paper, one tone**, Display/XL 179 at lh .75, typed "Kai ⏎Mercer"; the location terracotta at Display/List 24 beside a 14 × 14 dot bound **`box/2` `#2A2A2A`** (dark on the ink floor); the chips Label/XS on Scheme 1's blush / terracotta, radius 6. The seal a **terracotta disc with ink marks and name** — Lime's disc tree (two rings, the crosshair bars, two 14 × 14 end marks, the name on a `TEXT_PATH`), 125.4 at 1440 and 768, 85 at 390, Figma −26.1° |
| bio | **Scheme 3** (Section and instance) | `Tags — Frame` **Scheme 1** | the band `sem/bg` **ink**; "KM BIO" paper Chakra Petch 20; "Reads the room." terracotta Display/LG 118 at .89; **"Genres" drawn**, terracotta Inter 16 / 15 / 15; the chips Scheme 1's blush / terracotta. The card **square** (Lime 55, Grunge 15) in a 1px **`#000000`** inside ring (Lime's leaked literal, invisible on ink); the well `box/3` `#0E0E0E` under `9d20fe0d` at `FILL`; the glass **square**, `#2E3928` at 1% (Lime's leak) behind a blur 54, then **`Frame 255`, `sem/bg` ink at node opacity .80** over it at 1440 and 768; at **390 no dimmer, and the glass paint is `#2E3928` 1% over opaque `sem/bg` ink**; the name "Kai Mercer" terracotta Display/SM 45, **one tone**; the meta row paper Inter 14; the prose box `Frame 228` `box/2` `#2A2A2A`, square, paper Inter 16 |
| media | **Scheme 2** (the band; the instance carries Primitives only and inherits it) | head `Section` **Scheme 1** | the band `sem/bg` **taupe** `#AA958A`; the head "Six Worth Your Ears" bound **`sem/media`** — **blush** `#E6B6A0` (`SIENNA_MEDIA`) — Display/LG 118. The grid `sem/bg` taupe at radius 8 (invisible). **The sleeve (`Disc`) is a tilted print**: 308 × 411 at Figma **+2.33°**, `text/3` ink under the track's art at `FILL`, a **5px paper `text/1` inside border**, no effect; on it **the tape** `Frame 210` 206 × 56 at (60.6, −43.5), Figma −5.33° inside the sleeve (world −3°, layouts 1's and 3's tape), `active/bg` **blush** (Scheme 2's) clipping `b74be8bc` at **SCREEN**. "Night Rain" paper Display/Title 32, the artist ink Inter 12; the transport disc paper 48 with a taupe ▶, the skips paper; the bar `box/2` `#D0BCB2` with an **ink** `text/3` fill and a paper knob; the times ink Inter Bold 12. **Six tiles, square** (Lime 50, Grunge 15), `sem/bg` under the art under a black 0 → 1 fade at .89; **tile 0 in a 3px paper `text/1` inside ring** — the mark (Lime's glow, Grunge's 1px red); titles `#FFFFFF` unbound at 16 upper, subs paper Inter 12 |
| gallery | **Scheme 3** | the two arrow discs **Scheme 4** | the band `sem/bg` ink; "MEDIA" paper Inter Bold 15; "Snaps from the night" terracotta Display/LG 118. **The spotlight is a tilted print**: `Frame 183` 591 × 534 / 537 × 534 / 370 × 329.8 at Figma **+1°** under the `DROP_SHADOW`, a `box/1` `#1D1D1D` mount padding 20 round the photograph (`sem/bg` under `90514a32` at `FILL`), **square, no brackets**. Six thumbs 121 × 67.7, **square**, `sem/tag/1/bg` paper under the frame's placeholders, in a **4px** `text/1` terracotta inside ring — **the fourth 8px at 1440 and 768; all six 4px at 390** (Lime's 1 / 3 / 4 does not carry). The discs 55.5, **square**, `box/3` `#BE6346` in a 0.8 `sem/bg` terracotta inside ring, blur 18.1 behind the opaque fill, the arrows `stroke/2` **ink**; at 390 two 180 × 55.5 square pills, no blur, arrows `text/2` ink |
| repertoire | **Scheme 3** | — | the band `sem/bg` ink; the panel `box/1` `#1D1D1D`, **square** (Lime and Grunge 60); "Repertoire" terracotta Display/LG; "All songs · A–Z" paper Inter 16; the letter heads paper Inter 16 over a **2px** rule and each row over a **1px** rule, both **dashed 7, 7** in `stroke/1` paper 56% at the foot; titles terracotta Display/Title 32, artists paper Display/List 24; the rail's cells 32 × 32 at radius 6 in a 1px terracotta ring, letters terracotta Inter 12; **the lit cell filled terracotta, lettered ink** |
| map | Scheme 1 (the page) | `Map Viewport` **Scheme 3** | the head "Distances we'll Travel" terracotta Display/LG, two lines. The card `box/1` `#FFF9F2` **dashed 7, 7** terracotta at **radius 6**; the right column's 1px **solid ink** left rule (`stroke/1`); "TRAVEL & REACH" / "LIVE · LAST 12 MONTHS" ink Inter Bold 12; four stat cards `box/1` **dashed 7, 7** terracotta, square — labels ink Inter Bold 12, values **terracotta** Display/SM 45, subs ink Inter 12; the ticker `box/1` **dashed 7, 7** terracotta at **radius 10**, ink type. Inside the viewport, Scheme 3: the rings bound **`sem/bg` → ink** at .3 / .5 / .8, 1 / 1.5 / 2 wide, the 120 ring dashed **4, 4**; the ring labels ink pills (radius 4) lettered paper; the pin an ink disc in a 2px paper ring round a paper glyph; the dots paper at .6; zoom 30 × 40 `box/2` `#2A2A2A` in a paper-56 ring at radius 8, glyphs paper |
| pricing | Scheme 1 | — | the root paper; each row but the last **dashed 10, 10** terracotta at its foot (the twins' 4px rule), the divider frames paper; names, blurbs, the kind, *from* and the price **terracotta** (names and prices Display/SM 45, blurbs Inter 14, the kind 16 upper); the feature chips the header pair by parity on **`scheme/1/tagN`**; the tag chips **hairlines in Lime's unbound `#F2FFD0` at 15%** — invisible on paper — lettered terracotta Inter Bold 12; the pill **ink** `text/2`, its label and disc paper, the arrow terracotta; the foot note terracotta Inter Bold 15 |
| calendar | Scheme 1 | the wizard **Scheme 1**; its **Back pill Scheme 3**; Send Enquiry **Scheme 1** | the panel `box/2` `#EDE6DC`, square, dashed 5, 5 ink (none at 390); "Book Us" terracotta Display/LG. **The wizard card** `box/1` **dashed 10, 10 ink**, square; the current step `box/1` in a terracotta ring with a terracotta numeral and label, the others in ink rings, the step rules `box/2`; the title ink Display/Title; the picked type chip terracotta lettered paper, the idle ones `box/2` **dashed 10, 10 ink**, square; Back **terracotta lettered ink round an ink disc** (Scheme 3's `text/1` / `sem/bg`); Next Step terracotta lettered paper round a paper disc. **The summary card `text/2` ink** (CLAUDE.md's `s.tx` card), square, its type `box/2` `#EDE6DC` but GUESTS paper (`sem/bg`); the 48 avatar under `dc450d0a`; the date and package cards `box/1` **dashed 10, 10 terracotta**, ink type; Send Enquiry terracotta lettered paper round a paper disc |
| form | Scheme 1 | the submit **Scheme 1** | the root paper; the head terracotta Display/LG 118 over a **dashed 10, 10** terracotta rule at its foot; "ENQUIRE" ink Display/Title 32; labels ink Label/LG 24; **the boxes are underlines**: paper `sem/bg` with a bottom-only **dashed 10, 10** terracotta rule, square (Lime's pills, Grunge's radius 214 do not carry), placeholders terracotta Inter 14; the submit **ink** `text/2` pill, its label and disc paper, the arrow ink; "WHAT HAPPENS NEXT" ink 24; each step row over a **dashed 2, 2** ink rule; the step squares 56 terracotta, **square** (Grunge 8), numerals paper Inter 16; titles ink Inter 14, subs ink Inter 12; the ↘ terracotta |
| testimonials | **Scheme 4** | the two discs Scheme 4; the second cell **Scheme 1** | **the sheet is terracotta** — Scheme 4 is not the page here (Grunge's collapse does not arise). The head "Client success⏎stories" paper Display/LG, two lines; the discs 73.6, **paper** `text/1` in a 1px terracotta ring, blur 24 behind, radius 41.5, terracotta arrows. Four cells 324 × 382, **square**: (1) and (3) `box/1` `#DA7C5E` in a 1px paper-56 ring, the disc paper in a paper-56 ring lettered terracotta, the quote and byline **ink**; (2) Scheme 1: `box/3` **ink** in a 1px terracotta `stroke/2` ring, the disc terracotta in the same ring lettered paper, the type **terracotta**; (4) `text/1` **paper**, unstroked, the disc terracotta in a paper-56 ring lettered paper, the type terracotta. The marks Fisterra 24 (a stated glyph), the quotes Inter 16, the bylines Inter 14 / 12 |
| footer | 3 (row 0's) | — | out of scope |

Seven traps in that table, each a place where a Lime or Grunge block reads a key that lands on the
wrong value under Editorial:

1. **The Lime blocks paint their grounds from Scheme 1 keys, and under the seat those keys are the
   seat's.** Lime has no seat mechanism, so its bands are painted *in the branch* from `s.*` —
   the bio's band is `background: s.ac` (Lime's lime, Grunge's red). Under Editorial's Scheme 3
   seat `s.ac` is **terracotta**, where the frame's band is `sem/bg` ink. Every in-branch ground
   (the bio's band, the media's band, the gallery's and repertoire's sheets, the testimonials'
   sheet) reads the **seat's `s.bg`** under `ed`, or paints nothing and lets the root's seat show
   — layout 3's `G.sheet` `undefined`. Read each block's band before widening it.
2. **The testimonials' sheet is real.** Lime's block paints a full-bleed Scheme 4 `s.tx` sheet with
   `s.bg` ink; Grunge's paints none, its Scheme 4 being its page. Editorial's Scheme 4 is
   terracotta, the seat paints it, and under the seat Lime's `s.tx` is **ink** — so the widened
   block would lay an ink sheet over the root's terracotta. `ed` takes Grunge's no-sheet route for
   the opposite reason, and writes its own `REG` / `SEATS` (four seats, cell 2 on
   `onScheme[1]`) — never a remap of either twin's.
3. **Nodes name Scheme 1 outright inside a section seated elsewhere** (layout 3's trap 4): the
   header's capsule, its links and its chips, the bio's Tags row, the media's head, the calendar's
   Send Enquiry, the form's submit and the testimonials' second cell. Under the seat, each reads
   `s.onScheme[1]` — except the media head, whose `sem/media` has **no `flatScheme` key**: it is
   `SIENNA_MEDIA`.
4. **The seal is Scheme 4 at every width** (no Grunge 4 / 3 / 3 width trap), and it is **Lime's
   disc tree**, not layout 1's Editorial seal. `SealBadge`'s `s.editorial && !classic` arm draws
   layout 1's seal at every layout; its Lime-disc arm's `scheme === 4` gives `[s.tx, s.bg]` — under
   the header's Scheme 3 seat, paper on ink. The frame's is `onScheme[4].bg` terracotta with
   `onScheme[4].tx` ink marks. An additive Editorial arm at 4 (Grunge's route), read in the header
   session.
5. **`pillBg` is the seat's `activeBg`**: terracotta under 3, **blush** under 2, **ink** under 4. A
   Retro arm (or a Lime literal) reading `pillBg` lands on each in turn — session 0 names where.
6. **The dashes are 7, 7 and 2, 2 on this page as well as 10, 10 and 5, 5**, and the repertoire's
   letter heads are **2px** (`DashRule`'s `weight`, which it already takes).
7. **Four leaks to follow or drop by the render** (CONVENTIONS A): the pricing tag chips' `#F2FFD0`
   at 15% (**invisible on paper** — Grunge wrote it `s.stroke1`, white 15% on black, but under
   Scheme 1 `s.stroke1` is opaque ink: do not inherit Grunge's key); the chips' lettering (the
   header's chips 4 and 6 lettered ink on terracotta through `scheme/4/tag1/text` and
   `sem/tag/6/text`, the bio's chip 4 lettered paper at 1440 and ink narrow — take each seat's own
   `fg`, layout 3's open question 4); the bio card's 1px `#000000` ring (Lime's, invisible on ink);
   the bio glass's `#2E3928` at 1% (Lime's, draws nothing).

### Grounds

Read off the band frames' `fills` with their bindings and sampled off the three renders. **The
sequence is identical at 1440, 768 and 390**:

| # | Section | Ground | What stands on it |
|---|---|---|---|
| 1 | header | the photograph over `#0E0E0E`, fading to **ink** `#141414` at the floor | the **paper** capsule nav, the arch avatar, the identity block, the terracotta seal |
| 2 | bio | **ink** (Scheme 3) — one ink ground with the header's floor | "KM BIO", the terracotta head, Genres, the chips; the square card with its dimmed glass |
| 3 | media | **taupe** `#AA958A` (Scheme 2) | the blush head, the tilted sleeve and its tape, six square tiles |
| — | *video* | *paper* | *not in the project* — so on our page the taupe band meets the gallery's ink directly, a straight edge |
| 4 | gallery | **ink** (Scheme 3) | the terracotta head, the tilted print in its mount, the ringed thumbs, the `#BE6346` discs |
| 5 | repertoire | **ink** (Scheme 3), one band with the gallery | the square `#1D1D1D` panel, its dashed rows and the rail |
| 6 | map | paper (the page) | the `#FFF9F2` card dashed terracotta, the dark raster, the stat wall, the ticker |
| 7 | pricing | paper | rows divided by terracotta dashes, ink pills |
| 8 | calendar | paper; the Book Us panel `#EDE6DC`, square, dashed ink | the dashed wizard card; the ink summary card over two dashed `#FFF9F2` cards; Send Enquiry |
| 9 | form | paper | the terracotta head over its dashed rule, underline boxes, the ink submit, terracotta step squares |
| 10 | testimonials | **terracotta** (Scheme 4) — a full-bleed sheet | the paper head and discs, four square cells |
| — | footer | ink (layout 1's) | — |

So the page reads **ink → taupe → ink → paper → terracotta → ink**, every edge straight. **No root
flag widens**: `bleed`, `darkMap`, `cream`, `limeBand`, `limeLight`, `grungeBand`, `grungeRule`,
`editorialRule` and `editorialCard` gate on `s.v0` or `s.v1`; under route A the root paints the
seat's `s.bg`, and the blocks' own grounds follow trap 1.

## The decisions this plan hands over

### 1. The seats — **not a user call: data, read off the frames**

Every seat on this page is an existing scheme at every width, and every nested node is on Scheme 1,
3 or 4, which `s.onScheme` already keys. So route A says all of it with one row and no new
mechanism:

```js
// Its layout-4 page (964:73037 · 971:9537 · 977:13155), every seat the same at
// all three widths. The footer is layout 1's on ink, row 0's 3, so it has no entry.
3: { header: 3, bio: 3, media: 2, gallery: 3, repertoire: 3, testimonials: 4 },
```

Map, pricing, calendar and form stand on the page (Scheme 1) and need no entry. No per-width
triple (the bio instance is Scheme 3 at all three widths, unlike Grunge's 1 / 3 / 3), no
`editorialCard` (the Book Us panel is Scheme 1's own `box/2` on the page), no `footer` entry (row
0's 3 is this page's), so no `&page=` and no new digest render. `SCHEMES_OF`'s head comment's "Layout
4 is a later pass's to fill from its own walk" is replaced by the row's comment.

### 2. The header's four helpers — **not a user call; the header session's**

`LogoMark`, `SealBadge`, `navGapEm` / `NavBar` and the mirror each fire wrongly on this frame
(*What already renders*); the header session reads each node, writes each as an additive arm, and
proves the shared-helper changes with the five-theme digest (Editorial's `arch_0`, `arch_1` and
`arch_2` header files at zero).

### 3. The form's head — **settled by precedent, not re-asked**

Every Editorial form master prints the component's default "KAI MERCER" (as Grunge's do), where
JP-054 seeded `FORM_HEADING_4` "Contact Us" for every theme. Grunge's open question 2 closed on the
default by JP-081's reply (user, 2026-09-29): "Contact Us" stays on every template. The form session
names the diff; the designer's note is the sweep's.

### 4. `plans/CONVENTIONS.md` — **the sweep folds this pass in**

Keep *Inherited and used* below, one line per bullet leaned on; the sweep adds the *Leaned on in
Editorial (layout 4)* column on A, B and C, an Editorial column on D4, and any row this pass leaned
on three times that the file does not name (likely: *a Lime block paints its ground from Scheme 1
keys, so under a seat it paints the seat's* — trap 1).

## Session 0 — the seats

Smaller than layout 3's: no user call, one commit, no layout code.

0. **Branch and plan.** The branch exists (the planning session). With the dev server up, take the
   pass's "before" pictures at `theme=3&arch=3` for all eleven categories at all three widths
   (`node scripts/shots.mjs before 3 3 desktop`, then `tablet`, `mobile`, **each width under its
   own `OUT`** — a second width under the same label overwrites the first; rerun on "Execution
   context was destroyed") into the scratchpad.
1. **Commit the row** — `SCHEMES_OF.Editorial[3]` as decision 1 writes it. **Themes 0, 1, 2 and 4
   at zero rows; theme 3 moves only `_arch_3_` files of the six seated categories** — header, bio,
   media, gallery, repertoire, testimonials, at three widths, canvas and `live=1` (36 files) —
   and **no `arch_0`, `arch_1` or `arch_2` file, and no footer file**. Header arch 3 has no fold
   partner (`HEADER_COUNT.editorial` is 4); pricing's and the testimonials' eighth picker rows fold
   onto layout 4, but `digest.mjs` caps every body at 4, so no `_arch_7_` file is rendered.
2. **Prove it**: in the harness, the grounds at `theme=3&arch=3` — header ink floor, bio ink, media
   taupe `rgb(170, 149, 138)`, gallery and repertoire ink, testimonials terracotta — and in the page
   an in-page `sectionVm` call (data.js imported at the URL the transformed `EncoreBuilder.jsx`
   names; it needs `artistName`, or it throws on `split`) for the six seats and
   `onScheme[1]` / `[3]` / `[4]`. In the builder, card 4's canvas and published tab stand on
   those grounds; cards 1–3 are unchanged (their theme-3 digests say so).
3. **Name what moved and why** in *Settled in session 0*: the flat `s.v3` arms and `HeaderV3`'s
   placeholder half now stand on the frames' grounds, and their readings go wrong there in ways
   their sessions fix — **expect** the header's Retro half re-inked on ink (its `pillBg` pill
   terracotta), the bio's and gallery's and repertoire's flat arms on ink with their cream sheets
   reading Scheme 3's `paper`, the media's on taupe with `pillBg` **blush**, and the
   testimonials' mustard ground reading Scheme 4's `pillBg`, **ink**. None of it is chased here.

**Verification for session 0:** `node scripts/digest.mjs before 0,1,2,3,4` / `after`, then
`EXTRA='&live=1'`; `cmp` per file.

## The header, and card 4

`HeaderV3`'s Lime block is where deliverable 3 is met, and on this page it carries four shared
helpers that fire wrongly (decision 2):

- **The block widens at its head** to `s.limeTree`, `const ed = s.editorial`. Delete Retro's half's
  `s.editorial` pill arm and its comment, and nothing else.
- **What the frame draws** (the planning walk; confirm each against Lime's and Grunge's arms):
  - the **photograph** `ae069c14` at **`FILL`** — `editorialHero`, **unmirrored**: Lime's desktop
    `scaleX(-1)` guard is `desk && !grunge`, so Editorial must join the exception (`desk &&
    s.lime`); over `s.box3` `#0E0E0E`, fading to `s.bg` ink at the floor (the twins' fade ends in
    their next band's colour; here it is the ink bio band, the seat's own `s.bg`). No grain;
  - the **nav** is Lime's `Frame 49` capsule on **`onScheme[1].bg` paper** (radius 85, 1328 × 74 at
    56 · 28 at 1440; its blur behind an opaque fill paints nothing), the mark **Lime's globe**
    (`LogoMark`'s `if (s.editorial)` sparkle arm fires at every layout today — scope it off
    layout 4, since the frame draws Ellipses 2–4 and Lines 1–3 in `text/2` ink), the name
    `onScheme[1].tx` ink at Label/LG, the links ink at Label/MD at **fixed 23 gaps** (`navGapEm` 0
    at `d >= 1` and NavBar's `links={{ gap, cap }}` — *What `sectionVm` owes*), the pill
    terracotta with a paper label and disc round a terracotta arrow (`BookPill`'s Lime defaults
    under Scheme 1 — check); at 768 and 390 the burger, and the 390 pill Lime's × 0.712 recipe
    (47.7 / 35.6 radii);
  - the **avatar an arch**: `border-radius: u(76.9) u(76.9) 0 0` on 113 × 145 / 113 × 119 /
    116 × 119 (Lime's tile boxes — read), `s.box1` `#1D1D1D` under `editorialHeaderAvatar`, a
    **3px** blush `s.stroke2` inset ring (Lime 1px pale, Grunge 1px white);
  - the **identity**: kicker `s.ac` terracotta at Display/Title; the name `s.tx` paper,
    **one tone** (`Title`'s `twoTone` stays Grunge's), at Display/XL — the frame's "Kai⏎Mercer"
    is a typed break, so ours wraps at the measure and the session reads whether "MERCER"-width
    names hold two lines; the location `s.ac` at Display/List beside the **`box/2` dot**
    (`#2A2A2A` on the ink floor — followed, it is the binding; open question 4); the chips
    **`onScheme[1].chips[i % 2]`**, each seat in its own `fg` (trap 7), Label/XS, radius 6;
  - the **seal** Lime's disc tree on `onScheme[4]` (trap 4) at Lime's placements: the boxes are
    Grunge's and Lime's to the hundredth at all three widths (125.4 at 1288.5 · 147.3 / 625.4 ·
    692, 85 at 307.3 · 120), so they are not re-measured.
- **`Photo`'s backdrop gate** `(s.lime || s.grunge || (s.editorial && (s.v0 || s.v2)))` widens to
  card 4. Card 2's photograph is an arch, not a backdrop, so read whether the gate becomes
  `s.limeTree` outright or `s.editorial && s.v3` joins it. `&noimage=1` should draw Scheme 3's
  `#1D1D1D → #141414 → #0E0E0E` under the paper capsule, not Retro's brown.
- **Digest**: header arch 3 has no fold partner — three theme-3 files a surface. The Retro header
  at theme 0 and the twins at 1 and 2 at zero; **`LogoMark` and `SealBadge` are shared helpers, so
  the five-theme digest is the proof, and Editorial's header `arch_0` / `arch_1` / `arch_2` files
  must not move**.
- **In the builder** (`node scripts/page-check.mjs Editorial 3,0,1,2` — card 4 first gets the full
  walk): four Editorial cards, card 4 with no `conic` gradient; card 4 opens every section at arch
  3 in the seeded order, no composed row, the footer at arch 0 (ink); publish, every nav link
  scrolls, the burger opens at 390 (and at 820, a fresh tab), Book Now reaches `#form`.
- **`scripts/reach.mjs 3`** re-measures the header's Editorial `in` rows — the card-4 entries
  (kicker / tags / showTags `[0, 2, 3]`, location all four, showBadge / badgeText `[0, 3]`) were
  measured over the placeholder's Retro `HeaderV3`. Expect `showBadge` to stay (the frame draws the
  seal).

## Editorial's layout-4 decorative language

Everything here is behind `s.editorial`, `s.limeTree` or a named pair, and replaces what the Lime
block gates on `s.lime` and Grunge's arms on `s.grunge`.

- **Rotation sign, first.** This plan's angles are the Plugin API's `rotation` — **Figma's
  counter-clockwise-positive** — not the design-context emitter's CSS `rotate()`. **CSS is the
  negative**: the sleeve's Figma +2.33° is `rotate(-2.33deg)`, the gallery print's +1° is
  `rotate(-1deg)`, the tape's −5.33° inside the sleeve is `rotate(5.33deg)` there (world −3°, CSS
  +3° — layout 3's section 2 tape exactly), and the seals' −26.1° is Lime's existing tilt. Confirm
  a sign on the render before writing it.
- **No seams, no band grain, no glow, no checkerboard, no torn edge.** Every band meets its
  neighbour on a straight edge; every Lime glow on this page became a border or a ring (the
  sleeve's 5px paper border, tile 0's 3px paper ring).
- **Two tilted prints** — layout 1's language, back on a Lime tree:
  - **the media sleeve**, 308 × 411 at Figma +2.33°, bordered 5px paper, **no shadow**, carrying the
    tape; Figma auto-layout spaces a rotated child by its rotated box (CONVENTIONS A, per master);
  - **the gallery spotlight**, `Frame 183` at Figma +1° under the drop shadow (r 4, `#000` .25, 5 /
    4), a `#1D1D1D` mount padding 20 round the photograph, at every width.
  Layout 1's prints (the media mount, the gallery card, the map panel, the calendar photograph) are
  the recipe; `tilt()` is Retro's alone.
- **The tape** (`Tape`, layout 1's helper): the media sleeve alone, `Frame 210` 206 × 56 in
  `active/bg` — **blush** under the band's Scheme 2 (`Tape`'s default under the seat; check) —
  clipping the grain raster at SCREEN. Seat it by its centre (layout 1, *Conventions*), inside the
  tilted sleeve.
- **The arch** — the header's avatar tile (above). No other arch on the page.
- **The seal** — the header's, Lime's disc tree in Scheme 4's inks (trap 4). The footer's is layout
  1's, out of scope.
- **Dashed rules** — on five sections. All 1px INSIDE unless the row says otherwise; read each
  node's per-side weights and binding before drawing:

  | Section | Node | Dash | Ink |
  |---|---|---|---|
  | repertoire | the letter heads (**2px**) · every row (1px), at the foot | **7, 7** | `stroke/1` paper 56% |
  | map | the card (r 6) · the four stat cards · the ticker (r 10), all round · the 120 mi ring | **7, 7** · **4, 4** | `stroke/2` terracotta · the viewport's `sem/bg` ink at .3 |
  | pricing | every row but the last, at the foot | 10, 10 | `stroke/2` terracotta |
  | calendar | the Book Us panel (1440 and 768) · the wizard card and the idle type chips · the date and package cards | 5, 5 · 10, 10 · 10, 10 | `stroke/1` ink · `stroke/1` ink · `stroke/2` terracotta |
  | form | the head's rule and every box's underline, at the foot · every step row, at the foot | 10, 10 · **2, 2** | `stroke/2` terracotta · `stroke/1` ink |

  The header, the bio, the media, the gallery and the testimonials draw none (their rings are
  solid). `DashRule` draws every one (`side="all"` with `radius` for a card, `bottom` for a rule,
  `weight={2}` for the letter heads).
- **Radii**: **every card is square** — the bio card, glass and prose box, the sleeve and the tiles,
  the print and its mount, the thumbs, the discs and the 390 pills, the repertoire panel, the stat
  cards, the Book Us panel, the wizard and summary cards, the type chips, the form's boxes and step
  squares, the testimonials' cells — where Lime rounds them 50 / 55 / 60 and Grunge 15. The
  rounded things: the nav capsule (85), the pills (67) and their discs, the avatar's arch, the
  testimonials' discs (41.5) and marks, the map card (**6**) and ticker (**10**), the rail cells and
  chips (6), the zoom buttons (8), the ring labels (4).
- **Effects**: the four blurs (above) and the print's drop shadow. Draw a blur only where its paint
  is translucent — the bio's glass alone, at 1440 and 768; the gallery discs, the capsule and the
  testimonials' discs stand behind opaque fills.
- **Type**: every display and label string uppercase at its own site, in Noto (`faceK` 1, `faced`
  the identity). Every head on this page is **one tone** and on the ramp (Grunge's two-tone names
  have no site: the header's name and the bio card's name are one ink each). The demo face's DEMO
  marks stand in for `'`, `&` and — again — a digit (pricing's "£450" renders "£ ✱50", the map's
  "48" "✱8"); Noto has them all.

## Photography

**Expect no `photos.js` change and no new asset.** Image hashes, read off all 30 masters:

| Section | Slot (frame box) | Hash | Seeded | Verdict |
|---|---|---|---|---|
| header | the instance's fill, 1440 × 900 / 768 × 1024 / 390 × 844 | `ae069c14` at **`FILL`** | `editorialHero` | ✓ — a centred cover, **not mirrored** (Lime's desktop fill is a flipping `CROP`; Editorial's `FILL` ignores any transform) |
| header | the arch avatar 113 × 145 / 113 × 119 / 116 × 119 | `488cc3d7` at `FILL` | `editorialHeaderAvatar` | ✓ |
| bio | the card, 664 × 720 / 708 × 720 / 370 × 536 | `9d20fe0d` at `FILL` | `editorialStage` (820 × 1025) | ✓ expected — a portrait file into a portrait box at `FILL` is a centred cover (Grunge's section 2); correlate it against the render, no `layouts[3]` seed |
| media | the sleeve and six tiles | `8c7fa7d8` `4e7cc529` `40041573` (`CROP`) `b737c3e0` `21e9622c` + `0a8372b9` | `ROW_ART.media` (five) | ✓ — the twins' reading: the sixth is the frame's filler, one tile per track |
| media | the tape's grain | `b74be8bc` at SCREEN | `vm.grainSrc` (`Tape`) | ✓ |
| gallery | the spotlight 551 × 494 / 497 × 494 / 330 × 289.8 | `90514a32` | `EDITORIAL_PHOTOS.gallery` slot 3 (`editorialGallery4`) | ✓ — `galActive()`'s slot, the frame's own spotlight |
| gallery | six thumbs 121 × 67.7 | `b35b6507` `35ae28b9` `b073b46f` `3f0c98b4` `8f69a4a6` `b35b6507` | the seven Editorial slots | **layout 1's departure again**: the frame's strip is Retro's shared placeholder set; the seven Editorial slots stand |
| map | `Map Texture` 664 × 555 / … | `e089bd11` | `vm.mapRadialSrc` | ✓ — on Scheme 3's viewport; sample the plate |
| calendar | the summary card's 48 × 48 disc | `dc450d0a` | `editorialCalendar` (`image`) | the twins' reading: the frame's disc is the shared placeholder, and the fit draws `image` there |
| testimonials | — | — | — | no photographs: the marks are `vm.quotes[].mark` discs |

## What already renders, and the traps in it

A code survey at planning time (every `(s.lime || s.grunge)` gate mapped to its enclosing branch,
and every `s.editorial` / `s.limeTree` read inside the ten layout-4 blocks and branches):

- **No layout-4 block or `s.v3` branch reads `s.editorial` or `s.limeTree`** — every hit is
  outside them but two lines of `HeaderV3`'s Retro half. So card 4 today is Retro's `HeaderV3`
  in Editorial's tokens (checker floor, grain, Retro's scrim, the pill at card 1's scale) over
  Retro's flat `s.v3` arms on Scheme 1. **Goal 1 is met before any session runs** (every control
  is shared `v3` code), and each session still runs `theme=3&live=1` for the two usual reasons:
  a decoration can cover a control, and a live state can stop reading on this page's grounds.
- **Every Lime layout-4 block paints its ground from Scheme 1 keys** (trap 1). The bio's
  `background: s.ac` is the plainest case; read each block's band before widening.
- **Four shared helpers fire wrongly on this page** (decision 2): `LogoMark`'s `if
  (s.editorial)` sparkle (the frame draws the globe); `SealBadge`'s `s.editorial && !classic`
  arm (layout 1's seal, where the frame draws Lime's disc tree) and its Lime arm's `scheme === 4`
  (`[s.tx, s.bg]`, paper on ink under the seat); `navGapEm`'s Editorial arm (23 / 16 em at `d ===
  3`); the Lime block's mirror guard (`desk && !grunge`). And `Photo`'s backdrop gate stops short of
  card 4.
- **The calendar's summary card**: CLAUDE.md's calendar paragraph says the `s.tx` card's collapse
  onto the `paper` rows is "no template's" since Lime's and Grunge's frames restore a three-level
  stack. Editorial's restores it too — `#FFF9F2` `box/1` rows under the ink `s.tx` card on the
  `#EDE6DC` `box/2` panel — so the claim stands; the sweep adds Editorial to it.
- **The form's copy**: `FORM_HEADING_4` "Contact Us" against the frames' "KAI MERCER" (decision
  3); `FORM_SUB_4` "Enquire", `FORM_BTN_4` "Check Availability", `FORM_FIELDS_4`' five and
  `FORM_STEPS`' three match the frames. The frame's boxes are **underlines**; the refused box is a
  frame-less state on paper (CONVENTIONS C: the refusal changes colour, weight and dash at once).
- **`FIELDS` rows keyed by template**: the header's Editorial row (card-4 entries measured over the
  placeholder — the header session re-measures); `media.cta`'s `{ Lime: [0], Grunge: [0], '*': [] }`
  (layout 1's Book pill, not this page's); `calendar.heading`'s `Editorial: [0, 1, 2, 3]`. Each
  session re-measures the rows its category owns with `scripts/reach.mjs 3`.
- **`SEEDS.Editorial` has no `layouts` row, and should not need one** (*Photography*).
- **`HeaderV3` renders under Retro, Lime, Grunge and Editorial only** (`headerFamily`), so the
  header needs the theme-0, -1 and -2 digests and not Pop's; every other section needs all four.
- **Block-local literals and `G` arms** — the repertoire's `lime3`, the testimonials' `mist`, the
  media's olive seats, the calendar's pills, and the arms Grunge added beside them — are Lime's and
  Grunge's; the widened blocks give each an Editorial arm and never edit them.

## Head allocation — unchanged but one

Lime's and Grunge's *Head allocation* holds: every Editorial frame carries the same strings ("KM
BIO" / "Reads the room.", "Six Worth Your Ears", "MEDIA" / "Snaps from the night", "Repertoire",
"Distances we'll Travel", "Book Us", "Client success stories"), the `HEADING_4` map resolves the
fallbacks (JP-081 took the repertoire's "Repertoire"), and the pricing pill still reads "Star
Enquiry" (ours "Start Enquiry", `PRICING_ROW_CTA`). **The one difference is the form's head**
(decision 3). Its "ENQUIRE" line and "Check Availability" pill match `FORM_SUB_4` and `FORM_BTN_4`.

## Per-session procedure

[`../lime/layout-4.md`](../lime/layout-4.md)'s *Per-session procedure*, steps 1–9, with:

- step 2: session 0's (above), not the header's.
- step 3: `get_metadata` on the three Editorial nodes and **both twins'** desktop nodes, then the
  paired diff walk (CONVENTIONS A) against the nearer twin — **by traversal order**. Lime's
  warning about Retro wrappers that parent a checkerboard stands: query the Retro instance, never
  its band.
- step 4: `get_variable_defs` on all three nodes (top-level ids only; the media's 768 and 390 are
  `Device: Tablet`), and the node walker (Grunge layout 2, *Conventions*) with `dashPattern`,
  per-side weights, rotations and bound-variable names **with their collection**. On a section
  with a nested scheme, read each nested node's leaves against `s.onScheme[n]`, not `s.*`; on a
  seated section, read the block's **ground** against the seat (trap 1).
- step 5: widen the section's **Lime layout-4 block** at the placement the sections table names to
  `s.limeTree`, `const ed = s.editorial`, reading its Grunge arm and its QA entries first; a third
  arm in `G` where the block has one. Never edit a Retro, Lime or Grunge literal to make Editorial
  look right. Desktop numbers × 0.82, 768 and 390 verbatim; every display string uppercase at its
  site; every angle's sign negated from Figma's.
- step 6: the harness is `preview.html?cat=<cat>&arch=3&theme=3&w=desktop|tablet|mobile` (pass
  `arch`; `preview.jsx` defaults to 1); function at `theme=3&live=1`, plus `&n=` / `&booked=` /
  `&open=` / `&today=` / `&email=` / `&tiers=` / `&noimage=1` where the section reads them; **zero
  rows at themes 0, 1, 2 and 4** before and after, every session (`node scripts/digest.mjs before
  0,1,2,4` / `after`, then `cmp`); then theme 3, where every differing file must be this section's
  category at **arch 3**. **A theme-3 diff in any `arch_0`, `arch_1` or `arch_2` file is a
  regression of a merged pass.** Expect the rotating seal's `<text>` / `<textPath>` rows to differ
  between two walks of one build (Retro layout 4's sweep note): diff line by line before reading a
  mismatch as a regression.
- step 9's hand-off prompt:

  ```
  Continue the Editorial layout-4 pass with section N, `cat`.

  Read CLAUDE.md, then plans/editorial/layout-4.md, then the Conventions of
  plans/editorial/layout-3.md, plans/editorial/layout-2.md (and its Settled in session 0) and
  plans/editorial/layout-1.md, then plans/CONVENTIONS.md (groups A, B, C and D4), then this
  section's Settled notes in plans/lime/layout-4.md and plans/grunge/layout-4.md and its entries
  in plans/lime/layout-4-qa-fixes.md and plans/grunge/layout-4-qa-fixes.md, then the Conventions
  and the 2026-09-15 Addendum of plans/retro/layout-4.md, then the `figma-frame-reading`,
  `verifying-the-published-tab` and `browser-tool-choice` memory notes, and follow the
  per-session procedure.

  The three Editorial masters are `<desktop node>` (<W> × <H>), `<tablet node>` (768 × <H>) and
  `<mobile node>` (390 × <H>) in Figma file uFoUbPaBrDicjyuSBEbtGT, page 964:58574, on Scheme
  <N> (<nested schemes>); the Lime twin is `<lime nodes>` and the Grunge twin `<grunge nodes>`.
  Widen the Lime block <placement> of `<Component>` in EncoreSection.jsx to `s.limeTree`,
  Editorial's deltas behind `s.editorial`. Themes 0, 1, 2 and 4 must digest to zero rows, and
  theme 3 may differ only in `<cat>` arch 3.

  <the two or three conventions most likely to bite this section>

  Branch: editorial-layout-4. Do not refresh the root index.html.
  ```

  **After section 10 there is no next section** — the footer is out of scope — so that hand-off
  opens *The end-of-pass sweep* instead, with the same reading list and the sweep's items in place
  of a node table.

Do **not** refresh the root `index.html` per section; it is the sweep's last step, with the
two-build digest (`scripts/build-digest.mjs`, `CARD=3` for card 4, reduced motion on). The seeded
`EXAMPLE_PAGE` is arch 0 throughout, so the page walk shows no difference at any theme; the proof
that this pass shipped is card 4 in both builds' setup modals.

### The second session: the bio

- **The band is the seat's `s.bg` ink**, not the block's `s.ac` (trap 1); "KM BIO" paper (`s.tx`,
  Grunge's arm), the head `s.ac` terracotta, one tone.
- **Genres is drawn** — terracotta Inter 16 / 15 / 15, where both twins drop it — and the
  chips are `onScheme[1]`'s. The row runs two lines at every width (JP-081's six).
- **The card is square**, the well `s.box3`, the glass square with **one** dimmer: `sem/bg` ink at
  **.80** at 1440 and 768 (Grunge's `Frame 255` is .5 and changes colour by width — neither
  carries), and at 390 **no dimmer and an opaque ink glass**. The blur reads only at the wide
  widths. The name one tone in `s.ac`; the prose box `box/2` `#2A2A2A`, square.
- **The photograph**: a cover of `editorialStage` against the render before concluding no seed is
  owed.

### The third session: the media player

- **The band is taupe by the seat**; the block's own band (`G.band`) reads `s.bg` under `ed`.
- **The head is `SIENNA_MEDIA`** — a Scheme 1 section's `sem/media` on the Scheme 2 band (trap 3).
- **No seams at any width**: `ArcEdge` stays Lime's and `TornEdge` Grunge's arm of their ternary.
- **The sleeve is a tilted print with the tape**, bordered 5px paper, 308 × 411 (the twins' 406);
  tile 0's mark a 3px paper ring; every tile square. Read the 768 and 390 `Device: Tablet` ramp
  and the 390 instance's 845.9 against Lime's 836.
- **JP-084's now-playing row** (the transport's 14 and the two-line title) is in the block
  already; check it against this frame's "Night Rain" row.

### The fourth session: the gallery

The tilted print replaces Lime's bracketed well (`Frame 183` → `Frame` mount → photo, under the
drop shadow, at Figma +1°); the thumbs' ring is 4 / **8** / 4 (idle, active wide, every 390 tile)
on Lime's `active` mechanism; the discs are **square** `onScheme[4]` buttons with ink arrows, and
the 390 pills square with no blur; `Vector 1` is not drawn. The meeting with the media is **taupe
into ink on a straight edge** at every width — check it in the editor, Grunge's section 4 walk.

### The tenth session: the testimonials

The sheet is **the seat's terracotta, painted by the root**, and the block paints none (trap 2).
The register is written fresh — `box/1` / `onScheme[1]` ink / `box/1` / paper — and the fourth seat
stays unreachable at 768 and 390 (the twins' named diff). The discs are paper with terracotta
arrows; check the lit and idle discs on the terracotta sheet at `live=1`.

## The end-of-pass sweep

Written now from what the plan can see; the sections add to it. One session, in this order:

1. **CLAUDE.md and README.md**, wherever they describe Editorial as designed at layouts 1, 2 and 3,
   or a layout-4 state as Retro's, Lime's and Grunge's alone. The known sites: the *Editorial is
   designed at layouts 1, 2 and 3* paragraph and its "card 4 is a placeholder … so its family is
   not closed"; the heading *Retro, Lime, Grunge and Editorial are designed*'s layout counts; the
   per-section scheme bullet (`SCHEMES_OF.Editorial[3]`); every layout-4 paragraph naming a Lime
   or Grunge state — the media player's tile mark ("Under Lime … glow … under Grunge … a ring"),
   its layout-4 band ("Retro's cream … Lime's olive … Grunge's `#171716`"), the gallery's layout-4
   ring and discs, the map's ticker, pricing's layout-4 rule, the calendar's summary-card stack,
   the form's layout-4 rule and pill, the testimonials' layout-4 sheet; the `LogoMark`, `SealBadge`
   and `navGapEm` sentences if their arms moved; the file table's line counts. Grep both files for
   "layout 4", "Editorial", "placeholder" and "card 4", and the code comments (`SCHEMES_OF`'s head,
   `photos.js`' head, `headerFamily`'s, `Photo`'s backdrop, `sectionVm`'s `editorial` flag).
2. **One whole-page published check under Editorial at layout 4** — `node scripts/page-check.mjs
   Editorial 3,0,1,2` plus the layout-4 controls the builder walk cannot reach (Grunge's list: the
   media tiles and transport with audio, the gallery's discs, rail and 390 window, the repertoire's
   rail jump and its sticky at 1440 in the popup, the map's ticker and zoom, the wizard's three
   steps, *Package ›*, a refused and a valid Send Enquiry, the form's refused and valid submits,
   the testimonials' discs, the burger at 820) — then viewport seam shots at 1440 and 390: the
   header's ink floor into the ink bio, bio → taupe media, **media → gallery** (taupe into ink,
   straight, where the frame has its paper video between), the gallery and repertoire's one ink
   ground, repertoire → the paper map, form → the terracotta testimonials, testimonials → the ink
   footer.
3. **The layout-picker thumbnails** for arch 3 under Editorial (deliverable 4).
4. **The other three header cards** still render and publish, and no Editorial card draws the
   checker any more.
5. **`scripts/reach.mjs 3`** over the whole template — **the first Editorial measurement with no
   placeholder card**.
6. **Every `(s.lime || s.grunge)` left in layout-4 code**, listed with why Editorial does not share
   it (the seams: `ArcEdge`, `TornEdge`).
7. **`plans/README.md`**: mark the pass closed — **and the Editorial family with it**;
   **`CONVENTIONS.md`** (decision 4).
8. **Notes for the designer**, gathered from the open questions, layout 1's shape.
9. **Refresh the root `index.html`** with the two-build digest, `CARD=3`: zero rows at every theme
   on the seeded page outside the rotating seal; the shipped-it tell is card 4 in the two builds'
   setup modals (the old one's checker floor; the new one's paper capsule, arch avatar and
   terracotta seal).

## Conventions

Append as the pass goes. Do not repeat layouts 1's, 2's and 3's, Lime's, Grunge's or Retro's
bullets; name them.

- **Layouts 1's, 2's and 3's conventions all hold**: the gates are `s.editorial`, `s.limeTree`,
  the named pairs and `s.designed`; never edit another template's literal; uppercase per site;
  `DashRule` for every dash; route A for a section's ground and `s.onScheme[n]` for a nested
  node; themes 0, 1, 2 and 4 at zero rows.
- **Harness:** `theme=3`, `arch=3`; `&column=` and `&page=` are not read.
- **Diff by traversal order, never by id**: each template is its own variant.
- **A Lime block paints its ground from Scheme 1 keys; under a seat those keys are the seat's**
  (trap 1). Read every in-branch ground against the seat before widening.
- **Figma's rotation is counter-clockwise; CSS's is the negative.** Read the Plugin API's
  `rotation`, write its negative, confirm on the render.
- **Every card on this page is square.** Read a radius before inheriting the twins' 50 / 55 / 60
  or 15; the map card's 6 and the ticker's 10 are the exceptions.
- **Probe a display string with a long word before trusting the twins' measure** (section 1). Noto
  at wdth 62.5 sets about 83px a capital at the header's 147, against Bebas's 65 at 164, so a block
  the twins never fitted can overrun here. `&name=` (or `&cj=`) with a ten-letter word, at all three
  widths, is one run of the harness. The bio's and gallery's heads and the testimonials' two lines
  are the next display strings on this page.
- **A shared helper's Editorial arm is scoped to its layouts, not widened by grep** (section 1).
  `LogoMark`'s sparkle stops at `!s.v3`, and `SealBadge`'s layout-1 seal steps aside at `scheme`
  4. Each gate names the one caller that moves, and the five-theme digest proves the rest.
- **A master can set one head on two ramp keys** (section 2). The bio's 1440 head is Display/LG
  118 at .89, and its 768 and 390 heads are Display/XL 107 / 64 at .75. `get_variable_defs` on
  each Section says so, where the twins' single `s.dispXl` would have set 147 at 1440. Read the
  head's token per master before inheriting the twins' key.
- **The twins' `wordBreak: 'break-word'` heads split a long word in Noto** (section 2). Where a
  Lime block breaks a display head inside a word, Editorial fits it to its widest word instead:
  an `inline-size` container on the head's column and `min(size, calc(min(100cqi, measure) /
  s.titleWordEms))`. `vm.titleWordEms` is Noto's 540 table at designs 2 and 3 under Editorial,
  and the Bold table at design 0. The gallery's and the testimonials' heads are the next Lime
  heads to probe.
- **A head's measure is its own head frame's, not the player's** (section 3). The twins stand a
  narrow head at the instance's inset, or 26 left of it with Grunge's one-sided margin. The
  Editorial 768 media head frame pads 30 on both sides, a 708 measure. At the player's 682 the
  seeded head wrapped in Noto and the section stood 65 over the master. At 708 it holds one line
  and the section is the master's 844. Read the head Section's padding on both sides before
  inheriting a twin's margin. The gallery's head column is the next.
- **A clipping frame is read before a decoration is let past it** (section 3). The media tape
  rides above the tilted sleeve. At 390 its box rises 21 past the instance's top, into the head's
  box, and the frame's `Left` (`clipsContent`) cuts it flat 10 under the head. So the column
  takes `clipPath: inset(-pad)` at `Left`'s padding box. This is inert at 1440 and 768, where
  nothing reaches it. `getBoundingClientRect` cannot see a `clipPath`, so prove it on the
  picture. **The clip can be per master too** (section 4): the gallery's row clips its turned
  print at 1440 and 768, while its 390 column clips nothing.
- **A head Noto sets on more lines than the frame is named, not fitted** (section 4). The
  widest-word fit only stops a word from outrunning its measure. Where every word fits but the
  line breaks earlier than the demo face's, the section grows and the growth is a named diff. The
  gallery's 768 head is one such case, 64.5 over. To measure it, type a one-word head (`&cj=`) and
  confirm that the section then lands on the master, which proves the wrap is the whole
  difference. The map's two-line head at 1440 is the next to check this way.

### Seen at planning time, per section

From the walks and the renders — impressions to confirm, not measurements.

1. **header** — see *The header, and card 4*. The capsule is **paper on the photograph**, the
   first light capsule on a layout-4 page; the links read ink on it.
2. **bio** — see *The second session*. The head is Display/LG 118 in terracotta on ink, two lines
   at every width ("READS THE / ROOM.").
3. **media** — see *The third session*. The tiles' titles are the component's unbound `#FFFFFF`
   over the black fade; the bar's fill is ink on `#D0BCB2`.
4. **gallery** — see *The fourth session*. "MEDIA" is paper Inter Bold 15 (`s.tx`), the head
   terracotta (`s.ac`), four lines at 1440.
5. **repertoire** — the ink band and the square `#1D1D1D` panel (`s.box1` under the seat: the
   block's `lime3` / Grunge's `#F52E34` take an Editorial arm reading the seat's `box1`); titles
   `s.ac`, artists and the sub `s.tx` (Grunge's `ink2`), the rules paper 56% dashed 7, 7 with the
   letter heads 2px; the rail's cells ringed and lettered `s.ac`, the lit cell `s.ac` lettered
   `s.bg`. JP-083's `#` cell draws in the same rings. The head "Repertoire" (`REP_HEADING_4`).
6. **map** — the paper page, the `#FFF9F2` card dashed terracotta at r 6 with a solid ink rule
   between the viewport and the stat wall; the stat values **terracotta** (Grunge's red numerals'
   seat, Lime's pale); the viewport on **Scheme 3**, its rings bound ink — **on the dark raster
   they may vanish** (open question 3: layout 3's *a frame's own state can vanish by the scheme*);
   the pin an ink disc in a paper ring, the zoom `#2A2A2A` in paper-56 rings. JP-077's stat wall
   and JP-080's ticker are in the block already.
7. **pricing** — paper, terracotta type throughout, one dashed terracotta rule between rows (the
   twins' 4px inset rule becomes a 1px dash), the hairline chips' leak dropped (trap 7), the ink
   pill with a paper disc round a terracotta arrow.
8. **calendar** — the `#EDE6DC` panel dashed ink (square; undashed at 390); the wizard card and
   the idle type chips dashed ink, the picked chip terracotta; Back on `onScheme[3]` (terracotta,
   ink label and disc); the ink summary card (`s.tx`) lettered `#EDE6DC` with GUESTS paper; the
   date and package cards dashed terracotta; Send Enquiry terracotta. The refused wizard box is a
   frame-less state on the paper card.
9. **form** — the main component `725:3049` is the desktop master (809, padding 40 / 56 / 56 / 56,
   gap 24); underline boxes, the ink submit, dashed 2, 2 step rules, square terracotta step squares;
   "KAI MERCER" the named diff (decision 3). The refused box's colour, weight and dash are the
   session's call on paper (CONVENTIONS C).
10. **testimonials** — see *The tenth session*. The head is paper Display/LG, two lines, beside the
    two paper discs.

### Settled in session 0 (the seats)

- **Decision 1 as written, one commit**: `4018742`, `SCHEMES_OF.Editorial[3] = { header: 3, bio:
  3, media: 2, gallery: 3, repertoire: 3, testimonials: 4 }` under the comment naming its page, and
  row 0's head comment ends at "identical at all three widths" (its "Layout 4 is a later pass's"
  sentence is gone; the new row's comment is its replacement). No layout code, no scheme, no
  footer entry, no `&page=`. The plan went in first as `d57f1bf`. `THEMES[3].schemes`' comments
  (Scheme 2's, 3's and 4's lists of the sections seated on them) are left for the sweep, as layout
  3 left them for its own (`3359b11`).
- **What moved: 36 files, theme 3, as the contract says.** 1320 renders a label, canvas and
  `&live=1`. Themes 0, 1, 2 and 4 are at zero. At theme 3 the moved files are header, bio, media,
  gallery, repertoire and testimonials at `arch_3`, at three widths, 18 a surface. No `arch_0`,
  `arch_1` or `arch_2` file moved, and no footer file (the `page_2` render included). **No geometry
  moved in any of them**: every differing cell is a background, a background image, a colour, a
  border colour or a box shadow.
- **Proved in the harness.** The section root (row 3 of each digest; rows 1 and 2 are the harness's
  wrappers) is `rgb(20, 20, 20)` for the header, bio, gallery and repertoire, `rgb(170, 149, 138)`
  for the media and `rgb(200, 110, 82)` for the testimonials, at every width, canvas and live. Map,
  pricing, calendar and form keep paper `rgb(246, 240, 232)`, and the footer (arch 0) is ink. **The
  header's "ink floor" is only the root so far**: Retro's placeholder half still draws its
  photograph and checker ribbon over it, and section 1 replaces them.
- **Proved in the page.** `sectionVm` was called with `data.js` imported at the URL the transformed
  `EncoreBuilder.jsx` names (`/src/builder/data.js?t=…`, whose `SCHEMES_OF.Editorial[3]` is the
  row), with `artistName` passed and a minimal `Z` (`dev`, `narrow`; the colour keys read nothing
  else). The results are identical at all three widths:

  | Seat | `bg` | `ac` | `tx` | `paper` | `deep` / `pillBg` | `pillFg` |
  |---|---|---|---|---|---|---|
  | 3 — header, bio, gallery, repertoire (and the footer, row 0's) | `#141414` | `#C86E52` | `#F6F0E8` | `#F6F0E8` | `#C86E52` | `#F6F0E8` |
  | 2 — media | `#AA958A` | `#F6F0E8` | `#141414` | `#AA958A` | `#E6B6A0` | `#141414` |
  | 4 — testimonials | `#C86E52` | `#F6F0E8` | `#141414` | **`#FBF6EA`** | `#141414` | `#C86E52` |
  | 1 — map, pricing, calendar, form | `#F6F0E8` | `#C86E52` | `#141414` | `#F6F0E8` | `#C86E52` | `#F6F0E8` |

  `onScheme[1]` is paper / terracotta / ink with a terracotta pill lettered paper, `[3]` ink /
  terracotta / paper with the same pill, and `[4]` terracotta / paper / ink with an ink pill
  lettered terracotta: the plan's table. Scheme 4's `paper` is Retro's `#FBF6EA` fallback, since
  `paperOf` finds nothing above 0.6 in terracotta and ink (layout 2's session 0 met the same).
- **Proved in the builder** (a throwaway puppeteer script off `page-check.mjs`'s `publish()`,
  deleted after). The modal offers four Editorial cards. On card 4 the canvas's eleven roots stand
  on the grounds above, in the seeded order. The published tab's ids are header, bio, media,
  gallery, repertoire, map, pricing, calendar, form, testimonials and footer, on the same grounds
  at 1440, 768 and 390, with no page error. Cards 1–3 are proved by their theme-3 `arch_0` /
  `arch_1` / `arch_2` files and the footer's files, all at zero.
- **What the flat arms and `HeaderV3`'s placeholder half now do under the seats** (read off the
  digest diffs and `shots.mjs` before / after, per width, in the session scratchpad). **`pillBg`
  is terracotta under 3, blush under 2 and ink under 4**, and `paper` is `#F6F0E8` under 3 (the
  same value as Scheme 1's), the taupe itself under 2 and `#FBF6EA` under 4. So a sheet reading
  `paper` moves only on the media and the testimonials. Two of step 3's expectations were wrong,
  and are corrected here:
  - **The bio, gallery and repertoire arms paint no cream sheet.** Their band is `mapBg` (the
    scheme's darkest tag 11% toward its paper; the repertoire's panel is `repPanel`, taken off it),
    and their `cream` is type (`mapFg`). Under Scheme 3 `mapBg` is the same `rgb(205, 124, 99)`
    terracotta wash as under Scheme 1, so the band covers the new ink root and **nothing visible
    moves**. The exceptions are the bio's three blush chips, which turn paper (Scheme 3's first tag
    seat; the frame names Scheme 1's, trap 3). The gallery's and repertoire's files differ only in
    the root's own background and colour.
  - **The header's pill does not move**: `pillBg` is terracotta under both schemes. Its label and
    disc turn paper → ink, because they read `s.bg`. The capsule goes `#141414` → `#0E0E0E`
    (`box3`), the avatar tile's 18% wash goes ink → paper, and the three blush chips turn paper (trap
    3 again). The placeholder keeps its photograph, scrim and checker ribbon.
  - **The media on taupe**: its band is `cream` = `s.paper`, now the taupe itself. Everything
    inked in `s.ac` turns terracotta → paper: the head, the now-playing title, the skips, the
    sleeve's fill and 2px border, the bar and its knob, tile 0's 2.5 / 3px inset ring, and the
    tiles' subs. The play disc's ▶ goes white → ink (`acFg`). The head checker is `mapBg` again,
    now a **blush** wash `rgb(223, 178, 158)` (Scheme 2's darkest tag is blush), and the foot
    checker is `s.bg` → taupe. The arm reads no `pillBg`: the blush reaches it through `mapBg`. So
    the bio's terracotta band now meets a blush checker. Both are the bio's and media sessions' to
    replace.
  - **The testimonials, as predicted**: the arm's `ground = s.pillBg` is an **ink** sheet over the
    terracotta root. On it the head turns paper → terracotta, and the arrow discs go from
    terracotta with white arrows to paper with ink arrows. Cards 1 and 3 turn paper → `#FBF6EA`,
    card 2 `rgb(217, 211, 204)` → `rgb(177, 98, 74)`, and card 4 goes from terracotta lettered
    white to paper lettered ink. The marks follow their cards: terracotta / white → paper / ink,
    and the fourth white / terracotta → ink / paper.

  None of it is chased here; each section's widened block replaces its arm.
- **`shots.mjs` died once on "Execution context was destroyed"** (the desktop "before" run) and
  passed on a rerun; each width wrote under its own `OUT`, as layout 3's session 0 found it must.
- **For the sweep's CLAUDE.md pass**: the per-section scheme bullet (*A page section is*) owes
  layout 4's row — the header, bio, gallery and repertoire on 3, the media on 2, the testimonials
  on 4 — and `THEMES[3].schemes`' comments owe the same sites.

### Settled in section 1 (the header)

- **No Editorial block: Lime's `if (s.lime || s.grunge) { … return }` at the head of `HeaderV3`
  is `s.limeTree`**, with `const ed = s.editorial` naming the deltas and no `G`. The paired diff
  against the Lime twin by traversal order was the whole read: 61 / 57 / 57 nodes, node for node at
  all three widths. Every difference is a binding, a box or a face. Retro's half is now unreachable
  under Editorial. Its pill arm is `size: T.pill` again and the "Layout 4's pass fits the bar"
  comment is gone; theme 0 digests to zero. `lime3` / `lift` take Editorial arms that read the
  seat's `s.box1` / `s.box2`, Scheme 3's `#1D1D1D` / `#2A2A2A`.
- **What the frame draws, and what reads it:**
  - **The photograph** is `ae069c14` at `FILL`, so the mirror guard is `desk && s.lime`.
  - **The fade** runs from Scheme 3's `sem/bg` at the floor (`#141414`, the seat's own `s.bg`) to
    Lime's transparent `#15180F00`, on the twin's transform.
  - **The avatar is an arch**: 113 × 145 at 1440 (Lime's 112.6 × 118.68), 113 × 119 and 116 × 119
    narrow, radius `76.95 76.95 0 0`. It is an `s.box1` well under a 3.04 blush `s.stroke2` inside
    ring, drawn as Grunge's inset overlay, since Lime's CSS border would inset the photograph. The
    initials are `s.tx` paper.
  - **The kicker** is Display/Title 32 / 25 / 23 in `s.ac` terracotta, a literal because `vm.title`
    shadows the ramp. **The name** is `s.dispXl` at .75, `s.tx` paper, one tone. **The location** is
    `s.list` in `s.ac`, uppercase. Its square is `s.box2`, followed (open question 4's default).
  - **The chips** read `s.onScheme[1].chips[i % 2]`, HeaderV2's idiom: blush lettered ink, then
    terracotta lettered paper. A crop of the 1440 render confirms the frame letters its fourth and
    sixth chips ink (`scheme/4/tag1/text`, `sem/tag/6/text`). That is trap 7, a named diff.
- **The capsule.** `NavBar` takes an additive **`fill`**, the capsule's ground (every other caller
  passes none), here `onScheme[1].bg` paper. `colour` is `onScheme[1].tx` ink, which reaches the
  name, the globe, the links and the burger. `nameSize` is `s.labelLg` (20 / 16 / 14) at every
  width. `mark` and `links` are Grunge's: a 29.5 / 36 globe at 11 / 13.15, and `u(23)` gaps under
  an `s.labelMd` cap. The pill takes `onScheme[1]`'s `pillBg` and `bg`, so it is terracotta lettered
  paper round a paper disc with a terracotta arrow, beside Lime's 390 × 0.712 recipe. It comes out
  159.4 × 44.3 / 169.6 × 54 / 110.9 × 38.4 against 158.3 × 44.3 / 170 × 54 / 111.4 × 38.4. The 390
  master sets its label Fisterra **Bold** 11.39 where 1440 and 768 set Regular. That is the
  hand-scaled instance's slip (layout 2's Anton 12.07), so it is not followed.
- **`navGapEm` is 0 at `d >= 1` under Editorial**, measured before writing. The frame's links sit
  at x 0 / 84 / 210 / 288 / 413 / 598 / 690 / 801, widths 61 / 103 / 55 / 102 / 162 / 69 / 88 /
  72: every gap is 23 at 20px. Our nine links (the frame's eight plus Availability) set at 13.7px
  against the 16 cap, in a 718.7-wide row.
- **`LogoMark`'s sparkle stops at layout 3** (`s.editorial && !s.v3`), and its globe arm widens to
  `s.limeTree`. The frame draws Lime's `Group 7` globe in `sem/text/2` ink. Under Editorial the
  only design-3 readers are NavBar and NavMenu's panel, whose wordmark now carries the globe in
  paper.
- **The seal.** `SealBadge`'s Editorial arm steps aside at `scheme` 4, and the Lime disc arm
  widens to `s.limeTree`, reading `[s.onScheme[4].bg, s.onScheme[4].tx]` ahead of Grunge's pair: a
  terracotta disc with ink rings, ticks, equator marks and name. `Frame 248` at 390 nests Scheme 4
  too (Lime's 390 is Scheme 3), so HeaderV3 passes 4 at every width. The diff found no box
  difference in either seal frame, so Lime's pixel-scanned placements stand. **The name's face is
  a named diff**: the frame sets it in Lime's unbound Bebas Neue Bold 17.61 at 30%. Grunge's frame
  (964:72944) carries the same, and its pass set it in its own `s.label`. This one keeps `s.label`,
  which is Noto here.
- **`Photo`'s backdrop gate is `s.limeTree`.** Under Editorial the only `backdrop` callers are
  HeaderV0, V2 and V3 (V1's photograph is an arch). `&noimage=1` draws `#1D1D1D → #141414 →
  #0E0E0E` (sampled 24 / 20 / 18) under the paper capsule at all three widths.
- **The name is fitted to its widest word, under Editorial alone.** This goes past the plan's
  "read whether MERCER-width names hold". The seeded name holds, as two lines at 1440 (500.9 in the
  806 column) and one line narrow. But Noto at wdth 62.5 sets about 83px a capital at 147, where
  Bebas at 164 sets about 65. So "MONTGOMERY" came to 888.7 at 1440, into the chips, and 386.9 at
  390, off the page. The id block is now an `inline-size` container, and the name is
  `min(s.dispXl, calc(100cqi / s.cardNameEms))`: HeaderV2's JP-062 rule, on `notoEms`, which runs
  0.1–1% over the render. "Christopher Montgomery" then sets 132.5 / 107 / 57.5, and "Kai
  Featherstonehaugh" 84 / 73.7 / 36.5, each on two lines inside its column. The seeded name keeps
  147 / 107 / 64, so the digest does not see the fit.
- **Measured against the masters** (× 0.82 at desktop; the frame's number in brackets):

  | Width | Avatar (y · h) | Kicker | h1 (y × h) | Location | Chips | Capsule | Pill |
  |---|---|---|---|---|---|---|---|
  | 1440 | 242.5 · 118.9 (243.5 · 118.9) | 394.2 (395.2) | 437.8 × 220.5 (438.7 × 219.8) | 673 (673.2) | 852 · 633.8 (852.8 · 633) | 1088.2 × 60.6 | 159.4 × 44.3 |
  | 768 | 580.8 · 119 (580) | 739.8 (739) | 785.3 × 80.3 (785 × 80) | 883.6 (883) | 936.4 (936) | 708 × 74 | 169.6 × 54 |
  | 390 | 425.9 · 119 (426) | 584.9 (585) | 628.2 × 48 (628 × 48) | 694.2 (694) | 745.8 (746) | 370 × 58.4 | 110.9 × 38.4 |

  Noto runs a little wider than the demo face at 768, where the name is 542 against the frame's
  519-wide "KAI MERCER". The seal boxes are Lime's: 137.5 at 1010.6 / 120.8, 167.7 at 570.3 / 692,
  and 113.7 at 270 / 120 (bounding boxes of the turned disc).
- **Named diffs**: the ninth link, Availability; chips 4 and 6 lettered paper; the seal's name in
  Noto; the 390 pill label Regular; the location's `#2A2A2A` square all but lost on the ink floor
  (the binding, followed).
- **Digest**: themes 0, 1, 2 and 4 at zero files, canvas and `live=1`. Theme 3 moved exactly
  `header_arch_3` at three widths on both surfaces: six files, and no Editorial `arch_0`, `arch_1`
  or `arch_2` file. So the shared-helper changes (`LogoMark`, `SealBadge`, `NavBar`'s `fill`,
  `Photo`, `navGapEm`) move nothing else. The digest cannot see an SVG `fill`, so the seal disc was
  read off the DOM: `#C86E52` on card 4. The name's fit went in after the first after-digest and
  left all six header files byte-identical to it. **One canvas run was noise**: after the fit, a
  full five-theme canvas digest moved about 75 theme-3 files across every category by 0.1px of
  Inter and Noto text width, in sections the edit cannot reach. Its `live=1` twin was clean, and a
  rerun of theme 3 moved the three header files alone. Rerun a scattered theme-3 diff before
  reading it.
- **Verified in the builder** (`page-check.mjs Editorial 3,0,1,2`, plus one one-off script,
  deleted):
  - The modal offers four Editorial cards, none with a `conic` gradient. Card 4 draws the
    terracotta disc, the paper capsule (`rgb(246, 240, 232)`) and the arch.
  - After *Use this header* the page list reads ten rows at "layout 4" and the footer at "layout
    1". Published, the page stacks in the seeded order with no composed row, the header 901 tall at
    1440.
  - All nine nav links and Book Now scroll, Book Now to `#form`. The 390 burger goes 1 → 11 links
    with 0 overflow. At 820 in a fresh tab the burger opens a `#0E0E0E` panel lettered paper, and a
    panel link scrolls `#pricing`.
  - No errors on any of the four cards.
- **`FIELDS.header` needed no change.** `reach.mjs 3` over the fitted card folds to the stored
  rows: kicker `[0, 3]` (layout 3's card line is `cardLine`, JP-061), location all four, tags /
  showTags `[0, 2, 3]`, showBadge `[0, 3]`, badgeText `[3]`, cta2 `[1, 2]`, subtitle / heroCta and
  layout 2's copy `[1]`, align `[0]`, cardLine `[2]`. `showBadge` stays, as the plan expected.

### Settled in section 2 (the bio)

- **No Editorial block: Lime's `if (s.v3 && (s.lime || s.grunge))` ahead of `Bio`'s `if (s.v3)`
  is `s.limeTree`**, with `const ed = s.editorial` naming the deltas and no `G`. The walker read
  all three Sections (34 / 34 / 33 visible nodes) with bindings and their collections. The tree is
  Grunge's without the grain and the tear: Lime's plus `Frame 255`, and the Genres label drawn.
  The hidden "the" / "room." text nodes are not drawn. Every Lime and Grunge arm is
  byte-identical, and `Grain` and `TornEdge` gate themselves on `s.grunge`.
- **The ground is the seat's (trap 1).** The sheet paints `ed ? s.bg : s.ac` in `ed ? s.tx :
  s.bg`: ink under the Scheme 3 seat, sampled `rgb(20, 20, 20)`. "KM BIO" is `s.tx` paper, with
  Grunge's arm. The head is `s.ac` terracotta, one tone, uppercase.
- **The head is on two ramp keys** (`get_variable_defs` on each Section):
  - At 1440 it is **Display/LG** 118 at .89, `s.dispLg` 97.
  - At 768 and 390 it is **Display/XL** 107 / 64 at .75, `s.dispXl`.
  - The twins' `s.dispXl` would have set 147 at 1440.
  - It keeps Lime's 572.9 measure, and the seed sets two lines at all three widths, as the frames
    do.
- **The head is fitted to its widest word**, which neither twin does. Their `wordBreak:
  'break-word'` split "UNFORGETTABLE" inside the word at every width in Noto: "UNFORGET / TABLE"
  at 1440, "UNFORGETTA / BLE" at 390. The head's column is now an `inline-size` container under
  `ed`, and the size is `min(size, calc(min(100cqi, u(572.9)) / s.titleWordEms))`, with 100cqi
  alone at 390.
  - `vm.titleWordEms` took Noto's 540 table at design 3 as well as 2 (`d >= 2`). The only readers
    are the form's designs 0 and 2, so the change moves no render.
  - The seed keeps 97 / 107 / 64.
  - "Unforgettable" sets on one line at 65.6 / 80 / 51.6, 466 / 569 / 367 wide.
  - "Atmosphere nights" sets at 83 / 101 / 64 on two lines. "Reads the room tonight" sets on three
    lines at full size.
  - The card name needed no fit: "Christopher Featherstonehaugh" wraps between words at 37 / 36 /
    30.
- **Genres is drawn**, `s.tagsLabel` in `s.body` / `s.bodyLg` / lh 1.5 / `s.ac`, 16 over the chips
  at every width. An emptied label drops, and an emptied tag list drops the whole column. The
  chips pass `TagChips`' `hues` / `inks` off `s.onScheme[1].chips`: blush lettered ink, then
  terracotta lettered paper. The radius is `u(6)`, and the desktop padding is `TagChips`' own
  `s.limeTree` 4.1 / 9. The frame letters chip 4 ink at 768 and 390 through
  `scheme/4/tag1/text` (paper through `scheme/4/text1` at 1440). Ours is paper at every width,
  trap 7 and the header's named diff.
- **Every box is square**: card, glass and prose box, `u(ed ? 0 : …)`. The well is `s.box3`
  `#0E0E0E` and the prose box `s.box2` `#2A2A2A`, at every width, since the instance is Scheme 3
  at all three (no narrow literal).
- **The glass is ``ed ? (s.mob ? s.bg : `${s.bg}CC`) : …``**. `Frame 255` is `sem/bg` at node
  opacity .8 at 1440 and 768, drawn as the panel's one fill (Grunge's route) and sampled `rgba(20,
  20, 20, 0.8)`. At 390 the glass paints `#2E3928` at 1% over opaque `sem/bg`, which is ink. The
  blur stays in the style at 390, where it paints nothing behind the opaque fill. The 1px
  `#000000` inside ring is Lime's last-child overlay, at 1440 and 768 and none at 390, as the
  masters state.
- **The 390 boxes are Editorial's**: the Section pads its foot **40** (Lime 30, Grunge 60), and
  stacks head and card **40** apart (Lime 15, Grunge 10). The head's own gap is **30** at every
  width (Lime's 390 is 15).
- **The photograph: no seed.** `9d20fe0d` at `FILL`. A centred cover of `editorial-stage.jpg`
  (820 × 1025) correlates **0.992 / 0.990 / 0.988** with the three renders over the card's top
  (the anchors at 0 / 25 / 75% give 0.13–0.41 at the wide widths). `photos.js` did not move.
- **Measured** (canvas, content edges; the frame × 0.82 in brackets at desktop):
  - Desktop: eyebrow 95.1 (95.1), h2 265.4 × 172.7 (266.1 × 172.2), Genres 588.2 (588.8), chips
    620.8 / 657.1 (621.6 / 656.8), card 590 · 95.1, 544.1 × 590.4, name 37, prose box `#2A2A2A`.
  - 768: h2 107.6 × 160.5 (108 × 160), Genres 298.1 (298), chips 336.6 / 372.3 (337 / 373), card
    439.9 (441), glass 828.4 (826), section 1219.9 (1221).
  - 390: h2 75.1 × 96 (75 × 96), Genres 201.1 (201), chips 239.6 / 272.7 (240 / 273), card 337.8
    (338).
  - No sideways scroll at any width.
- **Named diffs, all the twins'**:
  - The panel is content-tall: 278.8 against 250 at 1440, and 301.5 against 305 at 768. The seed
    has two paragraphs where the frame has one (JP-081's reply). The panel's head-to-prose gap is
    the 30 padding, where the frame measures 27 / 37.
  - The 390 card keeps Lime's 400 photo stage (a user call), so the card is 733 against 536 and the
    section 1110.8 against 914. The seeded meta row also wraps to two lines there.
  - The meta row prints "DJ · Live Act" and "Performing since June 2021" (JP-081's reply).
- **`live=1`**: Listen is `<a href="#media">` in paper on the dimmed glass at all three widths.
  `&noimage=1` at 390 puts paper `KM` on the dark stage. `&who={"tags":""}` drops Genres and the
  chips together.
- **`reach.mjs 3`** (bio and `who` probes): `tagsLabel` reaches layouts 3 and 4, `cta2` layout 4,
  and `who.tags` / `showTags` layouts 2–4. Those are the stored rows (`tagsLabel`'s
  `Editorial: [2, 3]` was measured over Retro's placeholder arm and holds), so `FIELDS` needed
  nothing.
- **Builder** (`page-check.mjs Editorial 3`): four cards, no errors or warnings. About scrolls to
  `#bio` and the bio's Listen ↗ to `#media`, and the 390 burger goes 1 → 11. The header's ink
  floor meets the ink bio as one ground. Bio → media meets Retro's flat checker on the media's
  taupe band, which is the media session's to replace.
- **Digest**: themes 0, 1, 2 and 4 at zero files, canvas and `live=1`. Theme 3 moved exactly
  `bio_arch_3` at three widths on both surfaces, six files.

### Settled in section 3 (the media player)

- **No Editorial block: Lime's `if (s.v3 && (s.lime || s.grunge))` ahead of `Media`'s `if (s.v3)`
  is `s.limeTree`**, with `const ed = s.editorial` and a third arm at the head of `G` and of
  `tk`. The paired diff of each band against Lime's, by traversal order, was the whole read: 57 /
  57 / 57 nodes, 55 / 54 / 55 in common. Editorial adds `Frame 210` and its `image 1` (the tape)
  and drops Lime's two arcs; the 768 band's rename is the third miss. The hooks are hoisted, so
  the published player needed nothing new. Every Lime and Grunge arm is byte-identical. Grunge's
  `TornEdge` pair stays its own. `ArcEdge` is `!ed && …` in the ternary's Lime arm.
- **The ground is the seat's (trap 1).** `G.band` is `s.bg` under `ed`, taupe `rgb(170, 149,
  138)`. It is also the tiles' well and the play glyph, all `sem/bg`. The track is `sem/box/2`
  `#D0BCB2`, which is `s.box2` under the seat. Every other ink is Lime's key: `s.ac` is the seat's
  paper (title, transport, disc, dot, sublines, both rings) and `s.tx` its ink (artist, clocks,
  the bar's fill, the sleeve's well). The head is **`SIENNA_MEDIA`** (trap 3). The block reads no
  `pillBg`, so trap 5 has no site here.
- **The sleeve is a tilted print.** It is 308 × 411 / 317 / 370 × 302.09 at Figma +2.33°, so CSS
  `rotate(-2.33deg)`, confirmed on the render: its right edge stands higher, as in the frame. It
  is square, with a 5px paper `sem/text/1` inside ring (`u(5)`, an inset shadow on Lime's
  overlay) and no effect. The sleeve does not clip; the photograph's span does.
  - **Its spacing is per master.** At 1440 and 768 the column spaces it by its **unrotated**
    slot. x 47.76 / 49.67 and y 62.44 / 62.4 are exactly the centre-turned origins of a 56 · 56
    slot, and `Frame 24` stands at 56 + 411 + 40. So CSS's default centre origin needs no margin.
  - At 390 the column spaces it by the **rotated** box, 316.88 for 302.09: `Left` is 10 + 316.88
    + 20 + 49 + 20 + 11 + 10 = 436.91. That is the 9.91 the instance gains on Lime's 836. So the
    390 sleeve takes `margin: '2% 0'` (W·sin θ / 2 less the H·(1 − cos θ) / 2 term, as a share of
    the 370 column), and renders 7.4 lower with a 382 × 316.8 rotated box. `scrollWidth` holds at
    390: the corners reach x 4 / 386.
- **The tape** is `Tape` at its default, `s.activeBg`, blush under the seat (sampled `rgb(230,
  182, 160)`). Its node is at (60.59, −43.47), Figma −5.33°, in the sleeve's own frame. So its
  centre is (160.54, −6.02) there, by layout 1's formula. It is seated `left: u(160.54); top:
  u(-6.02)` with `translate(-50%, -50%) rotate(5.33deg)` inside the turned sleeve.
  - The world centre at 1440 composes to x 207.9 in the band. The frame's screenshot reads about
    208.
  - Its canvas box is 171.1 × 54.7 at (84.9, 227.8), against the frame's about (86, 228) × 0.82.
- **The frame's `Left` clips, and at 390 it cuts the tape.** Instance and band do not clip; `Grid`
  and `Left` do, at every width. At 390 the tape's box rises 21 past the instance's top, into the
  head's box (ours 114.6 against the head's foot at 125.4), and the frame shows it cut flat 10
  under the head. The column takes `clipPath: inset(-pad)` at `Left`'s padding box, 56 / 56 / 10,
  which is inert at 1440 and 768. The picture shows the cut at about 135, as the frame does
  (*Conventions*).
- **Tile `at` is a 3px paper ring** (`u(3)`, on Lime's scrim overlay, so no photograph is inset).
  Every tile is square, padded 20 (Lime 30), at Lime's ratios: 289.33 / 269.5, 136 / 139 and 180
  / 123.33, the frame's own boxes.
- **Type, off `get_variable_defs` on the three instances and head frames.** The 768 and 390
  instances carry `Device: Tablet`.
  - The head is Display/LG 118 / 73 / 48 at .89, `s.dispLg` 97 / 73 / 48 on the canvas.
  - Display/Title is 32 / 25 / 25 (`tk.title`), Body/SM 12, Body/Chip 12 / 11 / 11.
  - The tile titles are **Label/SM** 16 / 13 / 13 at lh 1.1, `textCase` UPPER, in the label face
    (`s.label`, Noto), where Lime's are Display/List 24 at 1.2.
  - Every display string is uppercased at its site (`disp`, Grunge's spread, widened).
- **The narrow boxes.** The 768 band pads 100 / 100 with a 10 gap, and the instance keeps its 56
  at the foot. So the foot is 156, head-to-player 66 (Grunge's) and the sum 844. The 390 band pads
  40 / 40 with a 10 gap: 40 over the head, 20 head-to-player, 50 under the player, 1021.91. The
  1440 boxes are Lime's 156 / 156 with no gap; the head is 105 where Lime's is 116, hence 1032.
  - **The 768 head's measure is its frame's 708**: `margin: 0 -26px` under `ed`, where Grunge's
    one-sided −26 stays Grunge's. At the player's 682 the seeded "FIVE WORTH YOUR EAR." wrapped
    in Noto, and the section stood at 908.9. At 708 it holds one line, and the section is 844
    (*Conventions*).
- **Measured** (canvas, content edges; the frame × 0.82 in brackets at desktop):
  - Desktop: sheet 845.9 (846.2); h2 at 127.9, 86.3 tall, one line (127.9 · 86.1); column at
    260.1 (259.9); sleeve 253 × 337 (252.6 × 337); now-playing at 630, 46 tall (629.8 · 45.9);
    clocks at 708 (708.5); grid 743.8 × 457.9 (· 458.4), tiles 237 × 220.8.
  - 768: sheet 844 (844); h2 at 30 · 100, 708 × 65 (708 × 65); grid 292 × 457 with tiles 136 ×
    139; sleeve 308 × 318 (317); now-playing 48 (49).
  - 390: sheet 1021.5 (1021.91); h2 on two lines, 85.4 (86); column at 145.4 (146); sleeve 370 ×
    302; now-playing 48 (49); grid 370 × 390 at 581.5, tiles 180 × 123.3.
  - The now-playing block is 1 short at 768 and 390: Noto's 25 at 1.1 is a 27.5 line box where
    Figma rounds 28. The sleeve's `flex: 1 0 0` takes the pixel at 768.
  - No sideways scroll at any width.
- **Long heads** (`&cj=` headings): "Unforgettable nights" sets one line at 1440 and two at 768
  and 390, and "Atmospherics" one line at 390, none overflowing. The twins' h2 carries no
  `wordBreak` and a 13-letter word fits the 370 at 48, so no `titleWordEms` fit was owed.
- **`live=1`** at desktop and 390 (puppeteer, autoplay allowed, probe deleted):
  - The ring starts on tile 1. A click on tile 3 moves it there and plays `SoundHelix-Song-3`, and
    a second click pauses.
  - The disc toggles. Next ×3 goes 3 → 4 → 5 → 1, and Prev ×6 wraps 1 → 5 and round to 5 again.
  - The canvas has no `<audio>` and no pointer cursor.
- **JP-084's row holds**: the transport's `u(14)` gap, and `Late Lights (Extended Club Mix) feat.
  Somebody` clamps at two lines with its ellipsis clear of the transport. At 1440 the sleeve gives
  the line back (the section stays 845.9, the sleeve 308 tall). At 390 the section grows by
  **27.5**, one line of the 25 title, since a one-line column (27.5 + 4 + 16.8) already fills the
  48 disc. That is JP-084's named cost: Lime and Grunge grow 30.8, and the placeholder arm grew
  14.6.
- **Empty states**: `n=0` stands the sleeve at its floor (206 / 302), with taupe `KM` on the ink
  well and *No tracks yet.* in ink on taupe, beside it at 1440 and under it at 390. `n=1` holds the
  floor.
- **Builder** (`page-check.mjs Editorial 3`): no errors or warnings. The published player plays
  and moves (`SoundHelix-Song-5`, unpaused), overflow at 390 is 0, and the burger goes 1 → 11. The
  seam shots show **bio → media a straight ink-into-taupe edge at 1440 and 390**, and media →
  gallery taupe into the gallery's flat arm, still its terracotta wash (section 4's). The plan asked
  for the join in the editor; these are the published tab's clips of the same render. The editor's
  card (`overflow: clip` at 0.82) was not shot, so the gallery session checks both joins there.
- **`FIELDS.media` needed no change.** Typed into media arch 3 under Editorial at three widths,
  canvas and live, only the heading moved the HTML; `kicker`, `listLabel`, `soundcloud` and `cta`
  did not. Those are the stored rows (`[0, 2]`, `[1, 2]`, `[0]`, and Lime / Grunge `[0]`).
- **Named diffs, all the twins'**: five tiles against the frame's six (one per track); the frame's
  bar is a hand-set 140 of 222 where ours is the element's; the 768 tile titles end in the twins'
  ellipsis, where the frame's HUG text runs past its 96 box ("Manchester at 3am" is 112).
- **Digest**: themes 0, 1, 2 and 4 at zero files, canvas and `live=1`. Theme 3 moved exactly
  `media_arch_3` at three widths on both surfaces, six files.

### Settled in section 4 (the gallery)

- **No Editorial block: Lime's `if (s.lime || s.grunge)` inside `Gallery`'s `if (s.v3)`, after
  `from`, is `s.limeTree`**, with `const ed = s.editorial` and a third arm at the head of `G`. New
  leaves fall back through `??` (`discR`, `thumbR`, `thumbInk`, `head`), so every Lime and Grunge
  arm is byte-identical. The seam is shared whole, so the published thumbs, discs and 390 window
  needed nothing new. The walker read all three wrappers with bindings and their collections (23 /
  22 / 23 visible nodes). One `use_figma` call set the wrapper, head frame, instance and row boxes
  beside Lime's and Grunge's. **Every box is Lime's but three**:
  - the **768 wrapper pads 0** over its head frame (Lime and Grunge pad 100), so the sheet pads
    **30** there, not 130;
  - the **390 wrapper pads Grunge's 60**;
  - the **390 print is 329.79** tall (Lime 337).
  The 534 row, the 50 gutter, the 454 head column, the 112 / 60 / 24 head-to-row gutter, the 36 /
  36 / 10 head gap, the 56 / 30 / 40 foot and every rail number are the twin's.
- **The ground is the seat's (trap 1).** The sheet paints `ed ? s.bg : s.ac` in `ed ? s.tx : s.bg`,
  ink under the Scheme 3 seat (sampled `rgb(20, 20, 20)`). The MEDIA eyebrow is `sem/text/2`,
  `s.tx` paper (Grunge's key). The head is `sem/text/1`, `s.ac` terracotta, uppercased at its site.
  `Vector 1` (`sem/box/3` ink on the ink band, 1440 only) is not drawn: `ArcEdge` is `!ed && …` in
  the ternary's Lime arm, and `TornEdge` stays Grunge's.
- **The print.** `Frame 183` is Figma +1°, so CSS `rotate(-1deg)`, confirmed on the render (its
  right edge stands higher, as in the frame). Its one effect is `DROP_SHADOW` 5 / 4 blur 4 `#000` at
  .25, written ``${u(5)} ${u(4)} ${u(4)} rgba(0, 0, 0, 0.25)``, layout 1's `cardShadow`. The mount
  is its `Frame` child, `sem/box/1` `s.box1` `#1D1D1D`, padded 20. Mount and photograph are one
  turned box here, with the shadow on it. The photograph is `sem/bg` `s.bg` under `90514a32` at
  `FILL`, square, and has no brackets and no grain.
  - **Its spacing is per master.** At 1440 and 768 its origin (−4.61, 5.2 / −4.62, 4.73) is the
    centre-turned origin of the unrotated slot, so CSS's default centre origin needs no margin. At
    390 the rail stands at 329.79 cos 1° + 370 sin 1° + 50 = 386.2, so the column spaces it by its
    rotated box, and it takes `margin: '0.873% 0'` (3.22 a side). The strip lands at 580 (580.2).
  - **Its clipping ancestor.** At 1440 and 768 the row `Frame` round it clips (`clipsContent`) and
    the head frame clips its own column. The instance and the 1440 wrapper do not clip. So under
    `ed` the row takes `overflow: hidden`, which cuts the corners (−5.1 over the row's top, 5.1
    under its foot, 4.6 past its left) and the shadow's foot at the 534 box, as the frame cuts
    them. The shadow's right edge falls in the 50 gutter, inside the row, and shows. The 390
    column does not clip: its turned box spans x 7.2 to 382.9, and the shadow's last 2px past 390
    are the wrapper's clip in the frame and invisible on ours (`scrollWidth` holds).
  - **The anchor is the frame's centred cover, not the twins' top anchor**, because the node holds
    our seed (`editorialGallery4`, 900 × 1125). Swept against the 390 frame render over the photo's
    inside at 1:1, the correlations are 0.183 / 0.358 / **0.998** / 0.398 / 0.261 at 0 / 25 / 50 /
    75 / 100%. A contact sheet of all seven slots at 1440 and 390 under the centred cover keeps
    every face; the stage portrait's hair touches the top edge. The thumbs keep Lime's top anchor,
    since the frame's thumbs are Retro's placeholder set (layout 2's *a frame's image anchor is
    evidence for its own photograph only*).
- **The thumbs** are square on `sem/tag/1/bg`, `s.chips[0].bg` paper under the seat, in a
  `sem/text/1` terracotta `s.ac` inset ring: **4, and 8 on `active`**, at 1440 and 768 (`u()`,
  3.3 / 6.6 on the canvas), and 4 on every 390 tile. That is Lime's `active` mechanism at this
  frame's weights, not live-gated. The ring goes through `u()`, as this page's media rings do,
  where the twins' stay unscaled. `&n=0` initials are ink on the paper wells (`thumbInk`, since
  Lime's `s.tx` is paper here) and paper on the ink spotlight well (`G.initials`).
- **The discs and pills** are Scheme 4 nodes, read off `s.onScheme[4]`: `box/3` `#BE6346` in a
  0.754 `sem/bg` terracotta ring (0.6 / 0.8px), square (`discR` / `pillR` 0). The arrow is
  `stroke/2` ink on the wide discs and `text/2` ink on the 390 pills. Two nodes carry two bindings,
  both `#141414`, and both are followed. The 390 pills carry no effect, so Lime's 5 / 5 hard shadow
  is `!ed` as well as `!grunge`. The wide discs' blur 18.1 stands behind an opaque fill and is
  dropped, as under the twins.
- **Type**: `s.eyebrow` 15 / 12 / 11 in Inter Bold at 1.3 and `s.dispLg` 118 / 73 / 48 at .89,
  bound `size/eyebrow` and `size/display-lg` on every master. **The head is fitted to its widest
  word** under `ed`: the column is an `inline-size` container and the size is `min(s.dispLg,
  calc(100cqi / s.titleWordEms))`, on Noto's 540 ems at design 3. The seed keeps 97 / 73 / 48.
  "Unforgettable nights" sets 52 at 1440 on two lines, "Christopher Featherstonehaugh live" 38.8 /
  73 / 38.5 on three, and every line's ink ends inside its column. `vm.titleWordEms`' comment names
  the gallery beside the bio. Nothing else moved: it was already computed for every Editorial
  section.
- **One named diff: the 768 head runs two lines.** The frame sets "Snaps from the night" on one line
  at 73 in its 708 measure, and Noto needs two. So the 768 section stands at **835.5 against the
  frame's 771**. Typed as "Snaps", one line, the section is 770.6, so the wrap is the whole
  difference. This follows the precedent that a head wrapping on the ramp is named, not fitted
  (layout 2's testimonials, layout 3's bio). Forcing the frame's single line would be a per-line
  fit, which is a user call and not the widest-word rule.
- **Measured** (harness, content edges; the frame × 0.82 in brackets at desktop):
  - Desktop: sheet 611.7 (611.7), pads 127.9 / 45.9; eyebrow at 151.6 (152.1); h2 372.3 × 345.3,
    four lines (372.3 × 344.4); print 484 × 438 in its unrotated slot at 510 · 127.9 (484.6 ×
    437.9 at 510); thumbs 99.2 × 46.3 (seven dividing 534, the twins' named cost); discs 45.5 at
    520.3.
  - 768: pads 30; eyebrow at 30 (30), h2 at 81.6 (82); print 537 × 534; thumbs 121 × 56.4; discs
    55.5; section 835.5 (771, above).
  - 390: pads 60 / 10 / 40; eyebrow 60 (60), h2 84.3 × 85.4, two lines (84 · 86); print 370 × 330,
    rotated box top at 193.7 (194); strip 123.3 × 67.7 at 580 (580.2); pills 180 × 55.5 at 659.7
    (659.95); section 755.2 (755.46).
- **`live=1`** at desktop and 390 (puppeteer, probe deleted):
  - The canvas has no pointer cursor. Live, the ring (6.6 on slot 3) and the spotlight follow ↓,
    and forward from slot 6 wraps to 0.
  - Back from 0 wraps to 6, with the ring on it. A thumb pick moves both.
  - The 390 window slides 1–3 → 2–4 → 0–2 → 4–6.
  - No page errors.
  - **Open question 6's gallery item**: the 8px terracotta ring stands inside the tile, over its
    photograph (or the paper well), so it never stands on the ink band alone, and it reads.
- **Builder** (`page-check.mjs Editorial 3`): no errors or warnings. Media → `#gallery` scrolls,
  overflow at 390 is 0, and the burger goes 1 → 11. The published gallery is **746** tall at 1440
  (the frame's 746) and 755 at 390, and its seam clips show a straight taupe-into-ink edge. **In
  the editor**, one puppeteer script (deleted) opened card 4 and used the device tabs. At 1180 and
  390, bio → media and media → gallery meet to the pixel (bottom = top, 205.58 / 205.5 / 205.83 /
  206.33): ink into taupe, then taupe into ink, both straight.
- **`FIELDS.gallery` needed no change.** `youtube` / `instagram` / `tiktok` typed at theme 3 moved
  `arch_0` alone, and only live, since the canvas draws the rows as spans either way. That is the
  stored `in: [0]`. The Editorial block reads none of them.
- **Named diffs**:
  - the 768 head's second line;
  - seven thumbs against the frame's six;
  - the seeded strip against the frame's Retro placeholders (layout 1's call);
  - the thumbs top-anchored.
- **Digest**: themes 0, 1, 2 and 4 at zero files, canvas and `live=1`. Theme 3 moved exactly
  `gallery_arch_3` at three widths on both surfaces, six files.
- **For the sweep**:
  - `notes/gallery.md`'s layout-4 paragraph and CLAUDE.md's gallery ring and disc sentences name
    Lime and Grunge alone. Editorial's 4 / 8 / 4 terracotta ring and square Scheme 4 discs join
    them.
  - `notes/gallery.md` names no Editorial layout-4 rule yet, so nothing it states was reversed.

### Inherited and used

*(Each session appends the bullets it leaned on, one line each: the bullet's title, where it lives,
and what this section did with it.)*

- Session 0: *A section's colour scheme is resolved in `sectionVm`, not restated in its block*
  (editorial/layout-1, *decision 3* and *Settled in session 0*) — one row, six seats, no mechanism.
- Session 0: *A nested node or a card on another scheme reads that scheme's keys* (editorial/layout-2,
  *Settled in session 0*) — `onScheme[1]` / `[3]` / `[4]` probed in the page, unchanged.
- Session 0: *The digest is committed* (lime/layout-1, *Settled in session 0*) — five themes,
  canvas and live, 1320 renders a label; 36 files, colour columns only.
- Header: *The paired diff walk* (grunge/layout-2, *Settled in section 8*) — against the Lime twin,
  by traversal order, at all three widths; the whole read.
- Header: *A node can name another scheme's variable outright* (editorial/layout-3, *Conventions*)
  — the capsule, its pill and the chips on `s.onScheme[1]`, the seal on `s.onScheme[4]`.
- Header: *A frame's inside stroke is an inset `boxShadow`, on an overlay where an image paints
  over it* (lime/layout-2, *Settled in section 1*) — the arch's blush ring.
- Header: *One five-theme digest is the whole proof for a shared-helper change* (lime/layout-1,
  *Learned on the end-of-pass sweep*) — `LogoMark`, `SealBadge`, `NavBar`, `Photo`, `navGapEm`.
- Header: *A head that must fit its measure is fitted to its widest word* (lime/layout-3, section
  9; editorial/layout-1, *Conventions*) — the name, on `s.cardNameEms`, where Noto outran the
  column.
- Header: *A twin's width-bound call is re-measured in the new face before it is inherited*
  (editorial/layout-2, *Conventions*) — the twins' unfitted name, which Bebas holds and Noto did
  not.
- Header: *Field reach is measured* (CLAUDE.md, the `FIELDS` bullet) — `reach.mjs 3`, no change.
- Header: *The whole-page published check is one puppeteer script* (lime/layout-1, *Learned on the
  end-of-pass sweep*) — `page-check.mjs Editorial 3,0,1,2`.
- Bio: *A section whose live seam is hoisted above its branches can always take a block*
  (lime/layout-1, *Settled in section 3*) — the block ahead of `if (s.v3)`, widened in place.
- Bio: *A widened block can need no `G` at all* (grunge/layout-3, *Settled in section 9*) — a
  dozen `ed` arms.
- Bio: *A Lime block paints its ground from Scheme 1 keys* (this plan, trap 1) — the sheet `s.bg`.
- Bio: *A node can name another scheme's variable outright* (editorial/layout-3, *Conventions*) —
  the chips on `s.onScheme[1]`.
- Bio: *Read a fill's `scaleMode` before believing its `imageTransform`* (grunge/layout-2,
  *Settled in section 1*) — `FILL`, a centred cover at 0.992, no seed.
- Bio: *A head that must fit its measure is fitted to its widest word* (lime/layout-3, section 9;
  editorial/layout-1, *Conventions*) — the head, on `titleWordEms` in Noto's 540 ems.
- Bio: *A twin's width-bound call is re-measured in the new face* (editorial/layout-2,
  *Conventions*) — the twins' `break-word` head, which splits a long word in Noto.
- Bio: *`get_variable_defs` resolves a node's mode* (memory: `figma-frame-reading`) — the head's
  Display/LG at 1440 against Display/XL narrow.
- Bio: *Field reach is measured* (CLAUDE.md) — `reach.mjs 3` over the bio probes, no change.
- Media: *A section whose live seam is hoisted above its branches can always take a block*
  (lime/layout-1, *Settled in section 3*) — the block ahead of `if (s.v3)`, widened in place.
- Media: *The `G` lookup at the block's head* (grunge/layout-1, *Settled in sections 4–10*) — a
  third arm on `G` and `tk`, the twins' arms byte-identical.
- Media: *The paired diff walk* (grunge/layout-2, *Settled in section 8*) — against Lime's bands,
  by traversal order, at all three widths; the whole read.
- Media: *A Lime block paints its ground from Scheme 1 keys* (this plan, trap 1) — `G.band` the
  seat's `s.bg`.
- Media: *`SIENNA_MEDIA` for `sem/media`* (editorial/layout-2, *Conventions*) — the head (trap 3).
- Media: *Check a narrow master's Device mode* (lime/layout-1, *Settled in section 1*) — the 768
  and 390 instances in `Device: Tablet`, the tile titles and Display/Title on the 768 ramp.
- Media: *Figma auto-layout spaces a rotated child by its rotated bounding box — per master*
  (memory: `figma-frame-reading`; editorial/layout-1, *Conventions*) — the unrotated slot at 1440
  and 768, the rotated box at 390.
- Media: *A tape inside a leant print is seated in the print's own frame* (editorial/layout-1,
  *Conventions*) — the centre formula, and nested CSS transforms.
- Media: *A frame's inside stroke is an inset `boxShadow`, on an overlay* (lime/layout-2,
  *Settled in section 1*) — the sleeve's 5px and tile 0's 3px paper rings.
- Media: *The whole-page published check is one puppeteer script* (lime/layout-1, *Learned on the
  end-of-pass sweep*) — `page-check.mjs Editorial 3`, the bio → media seam shots.
- Gallery: *Where the seam lives inside the branch, the block goes after the seam* (lime/layout-1,
  *Settled in section 4*) — widened in place after `from`, the seam shared whole.
- Gallery: *The `G` lookup at the block's head* (grunge/layout-1, *Settled in sections 4–10*) — a
  third arm, new leaves through `??`.
- Gallery: *The paired diff walk* (grunge/layout-2, *Settled in section 8*) — the three wrappers'
  boxes beside Lime's and Grunge's in one call; three boxes differ.
- Gallery: *A Lime block paints its ground from Scheme 1 keys* (this plan, trap 1) — the sheet
  `s.bg`, the head `s.ac`.
- Gallery: *A nested node or a card on another scheme reads that scheme's keys* (editorial/layout-2,
  *Settled in session 0*) — the discs and pills on `s.onScheme[4]`.
- Gallery: *Figma auto-layout spaces a rotated child by its rotated bounding box — per master*
  (memory: `figma-frame-reading`; editorial/layout-1, *Conventions*) — the unrotated slot at 1440
  and 768, `0.873% 0` at 390.
- Gallery: *A clipping frame is read before a decoration is let past it* (this plan, section 3) —
  the row's `clipsContent` cuts the print's corners and shadow at 1440 and 768.
- Gallery: *A frame's image anchor is evidence for its own photograph only* (editorial/layout-2,
  *Conventions*) — the spotlight centred at 0.998, the thumbs top-anchored.
- Gallery: *A head that must fit its measure is fitted to its widest word* (lime/layout-3, section
  9; editorial/layout-1, *Conventions*) — the head, on `titleWordEms`.
- Gallery: *A frame's inside stroke is an inset `boxShadow`, on an overlay* (lime/layout-2,
  *Settled in section 1*) — the 4 / 8 thumb rings and the 0.754 disc rings.
- Gallery: *A seeded page cannot show an empty slot* (lime/layout-1, *Learned on the end-of-pass
  sweep*) — `&n=0`, the initials re-inked on both wells.
- Gallery: *Field reach is measured* (CLAUDE.md) — the social rows, live, `[0]`.
- Gallery: *The whole-page published check is one puppeteer script* (lime/layout-1, *Learned on the
  end-of-pass sweep*) — `page-check.mjs Editorial 3`, plus the editor's joins.

## Open questions

1. **The desktop form master is missing from the page again.** The 1440 page frame has no form
   instance (nor has Grunge's), so the fit reads the main component `725:3049` at its own defaults.
   Worth telling the designer; if they place an instance later, the form session's numbers are
   re-read against it.
2. **The frames' copy is Lime's mock artist**: the header, the bio card, the media's now-playing
   artist and the form's head print "Kai Mercer" / "KAI MERCER", the component defaults
   unoverridden. Ours prints the artist's name everywhere but the form, which keeps "Contact Us"
   (decision 3). Named diffs; a note for the designer.
3. **The map viewport's ink rings on the dark raster.** Scheme 3 binds the rings, their labels and
   the pin's disc to `sem/bg` ink over the dark plate. Default: sample the render; follow what
   reads (the labels and the pin do), and for what has vanished take layout 3's rule (redraw in
   the other text token at the frame's opacity) or follow it and name it. The map session decides.
4. **The header's location dot is `box/2` `#2A2A2A` on the ink floor** — all but invisible, as the
   frame draws it. Default: follow the binding and name it; the alternative is the twins' visible
   dot in another key.
5. **The pricing tag chips' hairline** is Lime's unbound `#F2FFD0` at 15%, invisible on paper.
   Default: drop it where it does not show (CONVENTIONS A); the alternative, an ink `s.stroke1`
   ring, draws a line the frame does not.
6. **Terracotta on terracotta and ink on ink, live.** The likely states: the repertoire rail's lit
   terracotta cell on the ink panel, the gallery's 8px active ring on the ink band, the
   testimonials' paper discs on the terracotta sheet, and the refused boxes of the wizard (on its
   `#FFF9F2` card) and the form (on paper). Each session samples its own at `theme=3&live=1`.

## Notes for the designer

*(Gathered in the sweep from the open questions, layout 1's shape. Candidates so far: the missing
desktop form instance; the unoverridden "Kai Mercer" copy; the `Theme=Lime` names on the 768 and
390 Tags instances; the chips' lettering through other schemes' tag inks; the gallery's leftover
`Vector 1` arc; the leaked `#F2FFD0` hairline and `#2E3928` glass; the bio's 1px `#000000` ring.)*
