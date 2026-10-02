# Pop layout 1 — section-by-section plan

This is the working checklist for bringing **layout 1** of the Pop template up to its Figma designs,
the way [`../lime/layout-1.md`](../lime/layout-1.md), [`../grunge/layout-1.md`](../grunge/layout-1.md)
and [`../editorial/layout-1.md`](../editorial/layout-1.md) did for the other three. It runs one unit
per session, clearing context between units.

**This plan is Editorial layout 1 again, with deltas** — and Editorial's was Grunge's with deltas,
and Grunge's Lime's. It does not repeat them: the procedure, the harness, the digest and the
verification are Lime's, verbatim, with `s.lime` read as `s.pop` and `theme=1` as `theme=4`. What
is written here is only what differs, and three things differ more than anything an earlier pass
met:

- **Pop's frames are not a variable mode of the system.** Only the header is bound to variables.
  The other ten variants were drawn in raw hexes and raw sizes, and the desktop page frame and
  several narrow masters are still in **Lime's** mode — so the variable tools, which every earlier
  pass leaned on, answer nothing (or Lime's values) for ten of the eleven sections.
- **The media player is Retro's composition, not Lime's.** Ten sections are Lime's tree, as
  Editorial's were; the media player is Retro's *Floating cards stack* inside a pink card, so that
  session dresses Retro's shared `s.v0` body, not a Lime block.
- **Pop is the last flat template.** When its header goes designed, the `'flat'` header family,
  `FlatHeader`, `FlatNav` and `TEMPLATE_STILLS` have no member left.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then
- [`../CONVENTIONS.md`](../CONVENTIONS.md), groups **A, B, C and D1** (*What this pass actually is*
  says why, and where D1 does not reach), and the bullets they point at
- the section's *Settled in section N* bullets in [`../lime/layout-1.md`](../lime/layout-1.md),
  [`../grunge/layout-1.md`](../grunge/layout-1.md) **and** [`../editorial/layout-1.md`](../editorial/layout-1.md)
  — the block you are widening, and the two widenings of it already done, the last of which is the
  one that already solved *this block on a light page*
- for the media session, instead: the `v0` fit comments at the head of `Media` in
  `EncoreSection.jsx` (Retro's layout 1 predates the plan files, so the code is its record), and
  Lime layout 1's *Settled in section 3* for how its block shares Retro's live seam
- the *Per-session procedure* of [`../lime/layout-1.md`](../lime/layout-1.md)

Then the memory notes `figma-frame-reading`, `verifying-the-published-tab` and
`browser-tool-choice`. `SPEC.md` lives in git history: `git show 8fa8ff4:SPEC.md`.

Branch: **`pop-layout-1`**, forked from `main`.

## What the pass must deliver

1. **Every section works in the published tab under Pop**: every control CLAUDE.md lists under
   *`s.live` is false everywhere except the published tab*.
2. **Every section looks as close to its Figma frame as possible**, at 1440 (× 0.82 onto the 1180
   canvas), 768 and 390.
3. **Pop's template card** on the picker — the big preview and its filmstrip thumbnail — is a live
   `HeaderV0`, not the flattened still it is today (`TEMPLATE_STILLS.Pop`).
4. **The setup modal** shows **four** Pop cards, where it shows three flat ones today. Card 1 is the
   fitted Hero; cards 2–4 only need to render and publish in this pass (Lime's rule; see *The
   header, and the four cards*).

## What this pass actually is

**Pop's layout 1 is the fifth variant of the same eleven Figma component sets.** The evidence, read
at planning time (2026-10-02):

- Retro's page is instances `964:58576`…`86`, Lime's `…88`…`98`, Grunge's `…600`…`10`,
  Editorial's `…612`…`22`, and Pop's **`964:58624`…`964:58634`**: the same composition names in the
  same order, ids +12 from Editorial.
- Each is an instance of the **`Theme=Pop` variant** of the set the other four instantiate (the
  header's `446:451` in set `446:456`; the bio's `446:1651` in `446:1656`; the media's `446:2735` in
  `446:2740`; …; the footer's `Property 1=pop` `907:12019` in `907:11829`).
- Compare trees **in traversal order**, never by id (CONVENTIONS A, *the paired diff walk*), and
  **case-insensitively**: Pop's display strings are typed in capitals ("KAI MERCER", "ABOUT") where
  the twins' are typed mixed, so a case-sensitive walk mismatches every text node.

The trees, compared at planning time as the longest common subsequence of every visible node's
`(depth, type, lower-cased name)`, desktop:

| Section | Pop nodes | LCS with Retro / Lime / Grunge / Editorial | Twin | What only Pop draws |
|---|---|---|---|---|
| header | 63 | 49 / 47 / 48 / 40 | **Lime** (the capsule named `Frame 49`, Grunge's and Editorial's name) | the smiley-globe seal where Lime draws its reticle; a lime scribble under the title |
| bio | 45 | 16 / 17 / 17 / 18 | **Lime** (the three columns, the arch; the low score is the dot grid at its head shifting the walk) | a dot grid, a scribble under the head, a smiley-sun sticker — **no seal** |
| media | 103 | 14 / 14 / 33 / 33 | **Retro** `964:58578` — see below | the pink card round it, a dot grid, a squiggle arrow |
| gallery | 69 | 68 / **68 / 68 / 68** | Lime (all four) | an asterisk |
| repertoire | 113 | 110 / **109 / 109** / 108 | Lime | a lightning scribble, a heart |
| map | 72 | 53 / **70** / 71 / 71 | Lime | a scribble across the head — and **no arc seams** |
| pricing | 105 | 93 / **103** / 103 / 102 | Lime | a starburst, rings |
| calendar | 125 | 99 / **101** / 101 / 101 | Lime | a dot grid, a sparkle, a squiggle arrow |
| form | 74 | 53 / 59 / **60 / 60** | Lime's block (Grunge's and Editorial's arms are in it) | the violet card, a scribble, the smiley-globe seal — no arcs |
| testimonials | 19 | 18 / **19 / 19 / 19** | all three | — |
| footer | 51 | 35 / **36** / 33 / 27 | Lime | the smiley-globe seal where Lime draws its seal; a sun sticker |

The 768 and 390 masters are the same trees at their widths (planning walk, against Lime's narrow
masters: gallery 55/55 and 52/52, pricing and calendar exact, repertoire 71/72 and 67/68, and so on).

**The media player is Retro's tree.** Outlined side by side, Pop's `964:58626` is Retro's
`964:58578` node for node one level down: the five 647 × 92 cards leant ±1° (radius 20) with the
35 × 35 play disc and the 60 × 60 cover (radius 6), the `Left` now-playing card (radius 40 — 438
wide where Retro's is 558) with the 251 × 252 `Disc`, the title and artist, the 108 × 48 transport
and the clock row with its progress bar, and the pill row — all nested inside a pink `Frame 208`
(1328 × 943, radius 50) on the white page. Retro's checkerboard dot row and its torn foot are gone,
and the pill is Retro's Soundcloud. LCS by name scores it 14 only because the nesting shifts every
depth. So **section 3 dresses Retro's shared `s.v0` body behind `s.pop`**, the way Lime layout 1
first put its decoration into Retro's branches — not by widening Lime's media block, which is
`if (s.v0 && s.limeTree)` ahead of that body and must not light under Pop.

So: **ten Lime blocks widened to a fifth template, and one Retro body dressed.** A section whose
tree turns out not to be what this table says is the exception; record it under *Conventions*
before branching.

**Inheritance** ([`../CONVENTIONS.md`](../CONVENTIONS.md)): **A** and **B** always; **C**, since
this is another variant of a page already fitted four times; **D1** for the ten Lime-tree
sections — not for the media player, whose block Pop does not take. Not D2–D4; those are later
passes'. Keep the running *Inherited and used* list below; the sweep folds it into that file.

**The mode is called "Pop"** (`1 · Primitives`, mode `187:6`) — like Lime's, the app's own name.
"Kai Mercer" is the frames' mock artist, as on Retro's, Lime's and Grunge's pages.

## The Figma source

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Frame 269 | `964:58623` | 1440 × 9389.7 |
| Tablet | Frame 278 | `986:52418` | 768 × 11658.4 |
| Mobile | Frame 279 | `986:52431` | 390 × 10903.2 |

- Desktop: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=964-58623&m=dev>
- Tablet: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=986-52418&m=dev>
- Mobile: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=986-52431&m=dev>

`fileKey` = `uFoUbPaBrDicjyuSBEbtGT`. All three sit on the page **Layout 1** (`964:58571`). Pop's
other layout pages exist — found by the header instance's `Theme=Pop` main component and its
`Primitives → Pop` mode — which is what the four-card family below rests on:

| Page | Desktop | Tablet | Mobile | Header's scheme |
|---|---|---|---|---|
| Layout 2 (`964:58572`) | `964:64560` (Frame 250) | `986:17562` | `986:17581` | 1 |
| Layout 3 (`964:58573`) | `964:68750` (Frame 259) | `984:15355` | `984:15386` | **1 at 1440, 6 at 768 and 390** — a per-width seat, Editorial layout 2's triple |
| Layout 4 (`964:58574`) | `964:73127` (Frame 264) | `971:10835` | `977:14267` | 3 |

**Match on node id and width, never on the name** — the list again:
- The 390 gallery (`989:22531`) and the 390 testimonials (`986:52441`) are called "— Tablet".
- The booking calendar is called "— Desktop" at all three widths, and so are the 768 and 390
  footers ("Component 3" / "Component 4").
- The media player's 768 master sits inside a wrapper frame (`986:52421`, "Frame 272") that sets
  Scheme 2 — inert here, since the media variant binds nothing.
- The testimonials master is **730 tall at every width**. Read its render before trusting it.
- The mobile page renders **442** wide, not 390: the pricing section's rings (`Vector` 273 × 242)
  run 52 past its right edge (and the gallery's spotlight 3). The pricing session clips them, or
  the published 390 page scrolls sideways.

**The modes, read off `explicitVariableModes`** (planning walk, all 33 masters):

| | Desktop | Tablet | Mobile |
|---|---|---|---|
| page frame | **`Primitives → Lime`**, Scheme 1 | Pop, Scheme 1, Device: Tablet | Pop, Scheme 1, Device: Mobile |
| header | Pop, Scheme 1 | Pop, Scheme 1, Tablet | Pop, Scheme 1, **Device: Tablet** |
| bio, gallery, repertoire | Pop | Pop | Pop (gallery also Device: Mobile) |
| media | *(inherits the page: Lime)* | **Lime** (its wrapper Scheme 2) | Pop |
| map, pricing, form, testimonials | *(inherits: Lime)* | **Lime** | **Lime** (testimonials also Device: Mobile) |
| calendar | *(inherits: Lime)* | Device: Tablet | Device: Mobile |
| footer | *(inherits: Lime)* | *(inherits: Pop)* | *(inherits: Pop)* |

The only nested override on the page is the header's nav capsule, `Frame 49`, on **Scheme 3** at all
three widths. Everything else in this table matters for one reason only — **text styles**: see
*Pop's Figma mode*, trap 2.

## The sections

Session 0 first, then eleven sections in page order. Each row's three masters are one session.

| # | Cat | Desktop node | Composition | Size | Tablet node | Size | Mobile node | Size | Ground | Twin | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | *foundation* | `964:58623` *(page)* | Pop → `THEMES[4]`, face, casing, ramp, schemes, flags, photos | — | `986:52418` | — | `986:52431` | — | — | — | |
| 1 | `header` | `964:58624` | Headers — hero | 1440 × 750 | `986:52419` | 768 × 1024 | `986:52432` | 390 × 844 | photo over `#6B2CFF` | Lime `964:58588` | |
| 2 | `bio` | `964:58625` | Bios — A · Flanked portrait | 1440 × 769 | `986:52420` | 768 × 1153.8 | `986:52433` | 390 × 769.8 | `#FFFFFF` | Lime `964:58589` | |
| 3 | `media` | `964:58626` | Media Player — D · Floating cards stack | 1440 × 1055 | `986:52422` *(in `986:52421`)* | 768 × 1499 | `986:52434` | 390 × 1167 | `#FFFFFF`, a `#FF2DA0` card | **Retro `964:58578`** | |
| 4 | `gallery` | `964:58627` | Gallery Sections — Component 1 | 1440 × 788 | `986:52423` | 768 × 1153 | `989:22531` | 390 × 817 | `#FFFFFF`, a `#C6F200` panel | Lime `964:58591` | |
| 5 | `repertoire` | `964:58628` | Repertoire — A · Two-column dense | 1440 × 1087 | `986:52424` | 768 × 945 | `986:52436` | 390 × 961 | `#6B2CFF` | Lime `964:58592` | |
| 6 | `map` | `964:58629` | Events Map — D · Compact tile | 1440 × 1192 | `986:52425` | 768 × 1266 | `986:52437` | 390 × 1095.2 | `#FFFFFF` | Lime `964:58593` | |
| 7 | `pricing` | `964:58630` | Pricing — B · 3-col in soft panel | 1440 × 801 | `986:52426` | 768 × 745.1 | `986:52438` | 390 × 1549.7 | `#FFFFFF` | Lime `964:58594` | |
| 8 | `calendar` | `964:58631` | Booking Calendar — A · Scheduler | 1440 × 885 | `986:52427` | 768 × 1361 | `986:52439` | 390 × 1011 | `#2563FF` | Lime `964:58595` | |
| 9 | `form` | `964:58632` | Enquiry Forms — B · Split context+form | 1440 × 853 | `986:52428` | 768 × 1061.2 | `986:52440` | 390 × 1238.2 | `#FFFFFF`, a `#6B2CFF` card | Lime `964:58596` | |
| 10 | `testimonials` | `964:58633` | Testimonials H — Stacked tag card | 1440 × 730 | `986:52429` | 768 × 730 | `986:52441` | 390 × 730 | `#C6F200` | Lime `964:58597` | |
| 11 | `footer` | `964:58634` | Footer — Component 2 / 3 / 4 | 1440 × 479.7 | `986:52430` | 768 × 720.4 | `986:52442` | 390 × 720.4 | `#FF2DA0` | Lime `964:58598` | |

The twins' fit comments in `EncoreSection.jsx` cite their node ids; grep for any of them to find the
branch and its block. **Re-measure from the Pop frame; never reuse a twin's block sizes** — the
repertoire is 1087 tall here against Editorial's 1055, the 768 and 390 footers 720 against Lime's
647 / 619 and Editorial's 692 / 736, and the media is a different composition altogether.

**Read every arm of a widened block before writing a fourth.** Each Lime block now carries Lime's
literals, Grunge's arm and Editorial's arm; Editorial's is the one that solved *this block on a
light page* (paper), and Pop's page is white. Where Pop's frame draws exactly what one of them draws,
share that arm rather than copying it.

## What already works, and what doesn't

Pop is the last flat template. At `arch 0`:

| Section | Renders under Pop | Published-tab controls |
|---|---|---|
| **header** | `FlatHeader` v0, **not** `HeaderV0` | **Broken**, as Lime's, Grunge's and Editorial's were before their header sessions: `FlatNav` hardcodes Music / Shows / Book on `#music` / `#shows` / `#book`, ids no section has — and carries those hrefs on the canvas too, against the nav rule — ignores `navLinks`, `navHref`, `s.live` and the burger, and its CTAs are `<span>`s. |
| the other ten | `s.v0`, flat, in the three-colour palette, Titan One over Archivo, upper-cased throughout, **initials placeholders for every photograph** | wired — every control is shared `v0` code |

So goal 1 is met in full by the header session, and every section session still runs
`theme=4&live=1` for Lime's two reasons: a decoration layer can cover a control (here a sticker —
the form's seal over its card's corner, the repertoire's heart beside the pager, the footer's sun
by the link columns), and a live **state** can stop reading — here the risk is **colour on colour**:
Scheme 1's active pair is black on white and its idle pair black on lime, the reverse of every
twin's (trap 3), and the page's controls stand on five different grounds.

The picker shows Pop as a **still** (`TEMPLATE_STILLS.Pop` = `pop-header.jpg`, a flattened render
of `964:58624` in Figma's mock copy; the `if (still)` short-circuit in `TemplatePreview`). The
header session deletes the entry and the file; `TEMPLATE_STILLS` is then empty (see the sweep).

**`preview.html` loads neither Titan One nor Archivo**, so every `theme=4` harness render to date
has been in a fallback face. Whatever face session 0 chooses goes in `index.html` **and**
`preview.html`.

`palette` is already right — `['#FFFFFF', '#FF2DA0', '#6B2CFF']` is Scheme 1's `bg` / `text1` /
`text2` — and so is `tags`: its seven hues are Scheme 1's `tag1`…`tag7` backgrounds in order. What
is wrong in `THEMES[4]` today, against the mode: the faces (Titan One / Archivo / Archivo — the mode
names Chunko Bold Demo ×2 / Chakra Petch / Inter), no `ui`, `casing` `'upper'`, `dls` `0.01em` (0),
`radius` / `radiusSm` / `btnR` `20px` / `14px` / `999px` (24 / 8 / 999), `bw` 1.5 (2), no
`radiusChip` (8), no `sem`, no `tagFg`.

## Pop's Figma mode

Read at planning time with `use_figma` (`figma.variables.getLocalVariableCollectionsAsync()`, the
`1 · Primitives` collection, mode `187:6`), Lime's method. **Pop's display ramp is the smallest of the
five** (Retro's included) — a heavy, wide face set small — while its `title` and `list` sit between.

| Token | Lime | Static Youth | Sienna Vale | **Pop** | `THEMES` key |
|---|---|---|---|---|---|
| `font/display` / `label` / `ui` / `body` | Bebas Neue ×2 / Chakra Petch / Inter | Stones Crush ×2 / Chakra Petch / Inter | Fisterra Fora ×2 / Chakra Petch / Inter | **Chunko Bold Demo** ×2 / Chakra Petch / Inter | `display` / `label` / `ui` / `body` |
| `font-style/display` / `label` | Regular | Regular | Bold *(unbound)* | Regular | |
| `size/display-xl` / `-lg` / `-md` / `-sm` | 200 / 130 / 72 / 50 | 198 / 130 / 72 / 50 | 179 / 118 / 64 / 45 | **125 / 82 / 45 / 36** | ramp |
| `size/title` / `list` | 36 / 24 | 36 / 24 | 32 / 24 | **28 / 20** | |
| `size/label-lg` / `-md` / `-sm` / `-xs` | 32 / 24 / 18 / 20 | 24 / 20 / 16 / 20 | 24 / 20 / 16 / 20 | 24 / 20 / 16 / 20 | |
| `size/body-lg` / `-md` / `-sm`, `chip`, `eyebrow` | 16 / 14 / 13, 13, 15 | 16 / 14 / 12, 12, 15 | 16 / 14 / 12, 12, 15 | 16 / 14 / 12, 12, 15 | |
| tablet (xl lg md sm · title list · lLg lMd lSm lXs · bLg bMd bSm · chip eyebrow) | 120 81 50 40 · 28 19 · 21 17 14 14 · 15 13 13 · 12 12 | 95 81 50 40 · 28 19 · 16 14 13 14 · 15 13 12 · 11 12 | 107 73 45 36 · 25 19 · 16 14 13 14 · 15 13 12 · 11 12 | **75 51 36 29 · 22 16** · 16 14 13 14 · 15 13 12 · 11 12 | |
| mobile, same order | 72 54 40 32 · 26 18 · 14 13 12 12 · 15 13 12 · 11 11 | 52 46 38 30 · 26 18 · … | 64 48 36 30 · 23 18 · … | **46 36 28 24 · 20 15** · 14 13 12 12 · 15 13 12 · 11 11 | |
| `radius/card` / `control` / `chip` / `pill` (`sharp` 0) | 26 / 13 / 6 / 999 | 8 / 8 / 4 / 999 | 16 / 6 / 6 / 999 | **24 / 8 / 8** / 999 | `radius` / `radiusSm` / `radiusChip` / `btnR` |
| `border/hairline` / `thin` / `default` / `heavy` | 1 / 2 / 3 / 3 | 1 / 2 / 3 / 3 | 1 / 2 / 3 / 3 | 1 / 2 / **4 / 8** | `bw` is `border/thin` |
| letter spacing, line heights | | | | 0 on every style; Lime's line heights (xl .75, lg .89, title and labels 1.1, list 1.2, Label/XS 1.26) | `dls` |

Bold marks where Pop leaves Sienna Vale: the display rows, `title`, `list` and two borders.
Everything else is Static Youth's cell for cell. `THEME_RAMP.Pop`, desktop at × 0.82 rounded as the
others are: `dispXl 103`, `dispLg 67`, `dispMd 37`, `dispSm 30`, `title 23`, `list 16`, and the
rest Editorial's (`labelLg 20`, `labelMd 16`, `labelSm 13`, `labelXs 16`, `bodyLg 13`, `bodyMd
11`, `bodySm 10`, `chip 10`, `eyebrow 12`) — but type it from this table.

**The schemes**, resolved through Pop's primitives. Unlike Sienna Vale's, **Schemes 6–9 are not
1–4**: Pop has nine distinct grounds, one per palette hue.

| | `bg` | `text1` / `text2` / `text3` | `box1` / `box2` / `box3` | `active` bg / text | `inactive` bg / text / border | `stroke1` / `stroke2` | `glow` | `tag1` / `tag2` bg·text |
|---|---|---|---|---|---|---|---|---|
| **1** white | `#FFFFFF` | `#FF2DA0` / `#6B2CFF` / `#000000` | `#F5F5F5` / `#EBEBEB` / `#000000` | **`#000000` / `#FFFFFF`** | **`#C6F200` / `#000000` / `#C6F200`** | `#FF2DA0` / `#C6F200` | `#FF2DA0` | `#C6F200`·`#141414` / `#FF2DA0`·`#F6F0E8` |
| 2 lime | `#C6F200` | `#FF2DA0` / `#6B2CFF` / `#000000` | `#D7FF23` / `#B7DD0D` / `#8CA51E` | `#FF2DA0` / `#FFFFFF` | `#FF2DA0` / `#FFFFFF` / `#FF2DA0` | `#6B2CFF` / `#FF2DA0` | `#FF2DA0` | `#FF2DA0`·`#F6F0E8` / `#2563FF`·`#F6F0E8` |
| 3 pink | `#FF2DA0` | `#C6F200` / `#6B2CFF` / `#FFFFFF` | `#FF63B8` / `#F0138C` / `#C20A6F` | `#C6F200` / `#000000` | `#C6F200` / `#FFFFFF` / `#C6F200` | `#6B2CFF` / `#C6F200` | `#C6F200` | `#2563FF`·`#F6F0E8` / `#00E0C4`·`#000000` |
| 4 blue | `#2563FF` | `#00E0C4` / `#FFF600` / `#FFFFFF` | `#3F76FF` / `#1553ED` / `#1044C7` | `#00E0C4` / `#000000` | `#00E0C4` / `#FFFFFF` / `#00E0C4` | `#00E0C4` / `#FFF600` | `#00E0C4` | `#00E0C4`·`#000000` / `#6B2CFF`·`#F6F0E8` |
| 5 teal | `#00E0C4` | `#6B2CFF` / `#FFF600` / `#000000` | `#14F4D8` / `#0AC9B1` / `#06A893` | `#6B2CFF` / `#FFFFFF` | `#6B2CFF` / `#FFFFFF` / `#6B2CFF` | `#6B2CFF` / `#FFF600` | `#6B2CFF` | `#6B2CFF`·`#F6F0E8` / `#FF1A1A`·`#F6F0E8` |
| 6 violet | `#6B2CFF` | `#C6F200` / `#FF2DA0` / `#FFFFFF` | `#8451FA` / `#5C22E6` / `#4612BE` | `#C6F200` / `#000000` | `#C6F200` / `#FFFFFF` / `#C6F200` | `#C6F200` / `#FF2DA0` | `#C6F200` | `#FF1A1A`·`#F6F0E8` / `#FFF600`·`#000000` |
| 7 red | `#FF1A1A` | `#C6F200` / `#6B2CFF` / `#FFFFFF` | `#FF5A5A` / `#E40606` / `#C20303` | `#C6F200` / `#000000` | `#C6F200` / `#F5F5F5` / `#C6F200` | `#C6F200` / `#6B2CFF` | `#C6F200` | `#FFF600`·`#000000` / `#C6F200`·`#141414` |
| 8 yellow | `#FFF600` | `#FF2DA0` / `#6B2CFF` / `#000000` | `#FFFB96` / `#EEE60B` / `#D4CC04` | `#FF2DA0` / `#FFFFFF` | `#FF2DA0` / `#000000` / `#FF2DA0` | `#FF2DA0` / `#6B2CFF` | `#FF2DA0` | `#C6F200`·`#141414` / `#FF2DA0`·`#F6F0E8` |
| 9 black | `#000000` | `#FF2DA0` / `#C6F200` / `#FFFFFF` | `#1E1E1E` / `#272727` / `#393939` | `#FF2DA0` / `#FFFFFF` | `#FF2DA0` / `#FFFFFF` / `#FF2DA0` | `#FF2DA0` / `#C6F200` | `#FF2DA0` | `#FF2DA0`·`#F6F0E8` / `#2563FF`·`#F6F0E8` |

Scheme 1's tags 3–7 are `#2563FF`·`#F6F0E8`, `#00E0C4`·`#000000`, `#6B2CFF`·`#F6F0E8`,
`#FF1A1A`·`#F6F0E8`, `#FFF600`·`#000000` — **seven distinct hues**, the first seat system since
Retro's that is not two alternating tags. `sem/media` is `#41BFBA` in every scheme (the header's
*Live* chip). Session 0 re-reads Schemes 2–9 before writing any of them: this table was assembled
from the planning walk's per-scheme diffs, and the Editorial pass found its own table wrong in one
cell.

**Who stands on what: nobody, by binding.** Ten of the eleven variants bind no colour at all (the
planning walk counted 0 bound solid fills in every section but the header's 41 and pricing's 1), so
there is no `explicitVariableModes` truth for which scheme a section stands on. Each section's
ground is a raw hex that happens to be one scheme's `bg`; any seat is our inference. That is
decision 4.

Seven traps in those tables and that walk:

1. **The variable tools answer nothing for ten sections.** `get_variable_defs` and `boundVariables`
   are empty or wrong there; the node walker's raw `fills`, `strokes`, `effects`, radii and text
   segments (`fontName`, `fontSize`, `lineHeight`, `letterSpacing`, `textStyleId`) are the source.
   CONVENTIONS A's binding rows (*a scheme that did not move can still move the binding*, *a node
   can name another scheme's variable outright*) do not arise outside the header.
2. **Text styles resolve in the mode the node inherits, and that is often Lime's.** The variants
   do apply text styles — `Display/XL`, `Display/LG`, `Display/SM`, `Display/Title`,
   `Display/List`, `Label/SM`, `Label/XS` — whose font and size are variables. Where the section
   inherits the desktop page frame's `Primitives → Lime`, or overrides to Lime at 768 and 390, the
   style renders **Bebas Neue at Lime's size**: the map's head "Manchester" is `Display/LG` → Bebas
   130, pricing's "Choose the set…" `Display/SM` → Bebas 50, the testimonials' "Private host"
   `Display/Title` → Bebas 36. In Pop's mode those are Chunko at 82, 36 and 28. **These are mode
   leaks, not the designer's faces**: read a styled node's style name and take Pop's row of the
   ramp. `get_variable_defs` returns Lime's numbers at 1440 on the seven sections that inherit the
   page's mode (media, map, pricing, calendar, form, testimonials, footer), and at 768 and 390 on
   the map, pricing, form and testimonials (and the 768 media). The bio, gallery and repertoire
   heads carry an explicit Pop override and render Chunko 82, the proof of what the others would be.
3. **Scheme 1's active and idle pairs are the twins' turned round.** `active` is **black** under
   white type, `inactive` **lime** under black type with a lime border — so the picked state is the
   dark one and the idle state the bright one. A Lime block that assumes `activeBg` is the accent
   and `inactiveBg` the ground reads wrong; and **`pillBg` (`sem.activeBg`) is black under Pop**,
   where CONVENTIONS C's *under Lime `pillBg` IS the accent* held for every earlier template.
4. **`s.tx` is violet, and body copy is black.** Scheme 1's `text2` (the palette's `tx`) is
   `#6B2CFF`; the frames set body copy in `#000000`, which is `text3`, a key Lime's `sem` shape does
   not carry. The bio's paragraph, eyebrows and role line are black; a Lime block reading `s.tx`
   for them draws violet. Session 0 decides whether `text3` enters `sem` (and `vm`) or the sections
   write it.
5. **`stroke1` is hot pink and `stroke2` lime**, both opaque; `glow` is pink. A Lime block reading
   `s.stroke1` for a faint rule draws a pink one.
6. **Hand-scaled sizes are everywhere outside the styled nodes**: 82.14 (media head), 44.79 and
   30.28 (calendar head and month), 40.38 (testimonials' quote and footer statement, the latter on a
   33.44 line), 35.16 (form statement), 27.62 (footer links), 22.71 and 20.39 (map), 15.77, 15.14,
   14.51, 13.5, 13.18, 12.5. *A hand-scaled instance is not the ramp* (CONVENTIONS C).
7. **The variants still carry the twins' raw hexes and faces** — the leaks of decision 5:
   Lime's `#AFE335`, `#ABE43B`, `#C7FF3C`, `#BFED11`, `#A6E22E`, `#BCD631`, `#F2FFD0`, `#E4F1C4`,
   `#15180F`, `#0D1F03`, `#2E3928`; Retro's `#EAD7B8`, `#D8A227`, `#FBF6EA`, `#1B1714`, `#DFCBA2`,
   `#C8461C`, `#6A6D41`, `#CBB78E`; raw Anton 12 on the repertoire's and map's pager numerals; Roboto
   Mono 10 on the media's clocks (check Retro's own clock face before calling that one a leak).

## The decisions this plan makes or hands over

### 1. Chunko Bold Demo is a demo face — **the user's call in session 0**

The mode names **Chunko Bold Demo** for display and label, a demo licence (Fisterra Fora's
situation again; `fonts.googleapis.com` has no Chunko). What the frames show, for the user: a very
heavy, wide grotesque with ink traps and squared counters, set at Regular on every ramp size,
**typed in capitals** with `textCase` ORIGINAL at most sites (UPPER at a few: the media, form and
footer statements, the map's "12 MILE RADIUS"). The frames never show its lowercase. Editorial's
decision 1 table, with this face's facts:

| Answer | `display` / `label` |
|---|---|
| **A. Licensed; the user supplies the `.woff2`** | Grunge's row A verbatim (self-host in `source/src/builder/fonts/`, `@font-face` in `src/index.css`, `preview.html`, the popup's cloned styles, `vite-plugin-singlefile` inlining, the size in the sweep); check it carries `'` `"` `&`. |
| **B. Substitute a free Google face** | The user names it or delegates ("you pick" was Editorial's). Judge candidates on a render beside the frame, not by name — cap height, the width of "KAI MERCER" and "READS THE ROOM.", the stem against the cap, the ink traps — as Editorial's session 0 measured Noto. Titan One (Pop's face today, already loaded in `index.html`), Archivo Black and Archivo at 800+, Rubik at 800–900, Bowlby One, Dela Gothic One and Lilita One are the obvious first renders. Load the choice in `index.html` **and** `preview.html`. |

Either way, before section 1: **`faceK`** is measured (identity at 1, as Editorial's came out), and
**the nav needs the face's advance table** (`navFace` in `sectionVm`: `bebasEms`, `antonEms`,
`notoEms` — Pop's links are Label/SM 16 in the display face). Measure the rendered DOM, not canvas
`measureText` (Editorial's session-0 lesson), and confirm one label against the DOM. Do **not**
start section 1 in a fallback face.

### 2. Casing — **recommended: `'title'`, with per-site uppercase (Grunge's rule)**

`THEMES[4].casing` is `'upper'`, so `caseText` upper-cases every `cased()` string — and the frames
set their Chakra Petch, Inter and Space Mono strings mixed: the header chips "Default", "Sold Out",
"New Release"; the repertoire's "Weddings", "Pubs", "Birthdays"; pricing's "Private Event"; the
form's "Full name" and "Wedding"; the bio's "About". So `'title'` is right whatever face decision 1
picks, and each display or label string takes `textTransform: 'uppercase'` in its own arm
(CONVENTIONS C, *casing stays the theme's*). Settle it in session 0 beside the face, not per section:
after it, every Pop head renders mixed case until its section uppercases it — expected.

### 3. The fifth flag — **recommended: `s.pop`, widened per site**

`s.limeTree` (Lime, Grunge, Editorial) has **62 readers** in `EncoreSection.jsx`, across all four
layouts, and `limeTreeTheme()` in `data.js` gates JP-089's layout-1 seeds. Adding Pop to either
lights every Lime block at every layout under Pop at once — Lime's, Grunge's and Editorial's
literals on a page no session has read — which is the blanket switch Editorial's decision 2
rejected, now four times larger. The options:

- **A (recommended): `s.pop: T.name === 'Pop'`** beside the other four, and each section session
  widens **its own layout-1 block's** gate from `s.limeTree` to `(s.limeTree || s.pop)`, with Pop's
  deltas behind `s.pop` (a `const pop = s.pop` and arms, or a fourth arm on the block's `G`). The
  shared helpers the block calls (`NavBar`, `BookPill`, `TagChips`, `Pager`, `SealBadge`,
  `Wordmark`, `LogoMark`, `Photo`'s backdrop, `labelStyle`'s tracking, `DashRule` if Pop draws one)
  are widened per site as they are met. Layouts 2–4 keep `s.limeTree` untouched. JP-089's three
  seeds (`CAL_HEADING_1`, `FORM_BTN_1`, `TIERS_1`) are Pop's frames' copy too ("BOOK NOW",
  "ENQUIRE", *Private Event / Club Night / Festival*), so the calendar, form and pricing sessions
  each widen its seed's `d === 0 && limeTreeTheme(…)` gate by name. Cost: a pair spelled at many
  sites, the noise the group flag was made to avoid. The sweep may fold the layout-1 sites into a
  design-scoped group if it reads better then.
- **B: a design-scoped join** — `limeTree: … || (T.name === 'Pop' && d === 0)`. One line, and the
  helpers called at other layouts stay off, since each reads its own section's `d`. But every
  layout-1 Lime block lights in session 0, before any session has read it — **Lime's media block
  included**, `if (s.v0 && s.limeTree)`, which the media session would then have to gate
  `&& !s.pop` to reach Retro's body — and every section session starts from Lime's literals on a
  white page.

Either way: **`s.designed` widens to Pop** in session 0's second commit (its readers are the root's
full-bleed hero, inert until the header session since `bleed` also wants `!s.flatHeader`;
`TagChips`' designed branch; and `vm.mapSrc` / `mapRadialSrc` — Pop's map draws raster `8cd103b8`,
the other four templates' again). The media session gates **Retro's** body sites `(s.retro ||
s.pop)` where Pop's frame draws what Retro's draws, and `s.pop` alone for what only Pop's does —
Lime layout 1's original idiom.

**Themes 0, 1, 2 and 3 are all at risk now**: every widened Lime block is a Lime, Grunge and
Editorial render, and the media body is Retro's. The digest is **themes 0, 1, 2 and 3 at zero
rows**, every session. Widening a shared helper moves Pop's placeholder layouts 2–4 too — expected,
theme 4 only; record which layouts moved rather than chasing it.

### 4. The frames are unbound — **seat or literals: the user's call in session 0, after a census**

Editorial's route A (`THEMES[i].schemes`, `SCHEMES_OF`, `s.onScheme`) seats a section on the scheme
its frame *binds*. Pop's frames bind nothing outside the header, so a seat is inferred from the root
fill — and the planning census shows both outcomes:

- **Grounds and accents mostly land.** The repertoire's ground, head, artists and row rings are
  Scheme 6's `bg`, `text1`, `text2` and `stroke1` exactly; the footer's ground and statement are
  Scheme 3's `bg` and `text1`; the testimonials' ground is Scheme 2's.
- **Tints and some inks do not.** The repertoire's search pill and pager pills are `#9162FF` where
  Scheme 6's `box1` is `#8451FA`; the calendar's panel is `#4F81FF` against Scheme 4's `#3F76FF`, and
  its head is lime where Scheme 4's `text1` is teal; the map's gig rows are `#E41010` against Scheme
  7's `box2` `#E40606`; the form's boxes `#EE138B` against Scheme 3's `#F0138C`; and even on Scheme
  1 the bio's body is black where `text2` is violet (trap 4).

So session 0 runs a **census** per section: every raw hex the section draws, against the candidate
scheme's keys that its Lime block actually reads (`bg`, `ac`, `tx`, `stroke1`, `stroke2`, `box1`,
the active and idle pairs, `chips[0]` / `[1]`), and asks:

- **Route A′ (recommended): seat where the census matches, literals where it does not.**
  `THEMES[4].schemes` carries the schemes a section or nested card stands on; `SCHEMES_OF.Pop[0]`
  seats the sections whose grounds and inks land (likely repertoire 6, testimonials 2, footer 3,
  the calendar 4 if its head is written as a literal); nested cards read `s.onScheme[n]` (media's
  pink card 3 and violet player 6, the gallery's lime panel 2, the map's violet card 6 and red panel
  7, pricing's violet / lime / pink cards 6 / 2 / 3, the form's violet card 6 and pink half 3); and
  every tint that matches no key is a named literal in a `P` arm. The white sections stand on Scheme
  1, the theme itself.
- **Route B: literals throughout** — a `P` lookup per block holding the frame's raw hexes, and
  `THEMES[4]` carrying Scheme 1 alone. Simpler to state, and every Lime-block read of `s.bg` /
  `s.ac` / `s.tx` in a coloured section is then wrong until its arm names it.

Under A′, CLAUDE.md's per-section scheme rule gains a sentence in the sweep ("…or, under Pop, whose
frames bind none, the scheme whose ground it paints").

### 5. The leaks — **the mode leaks are settled; the raw leaks are the user's call in session 0**

- **Mode leaks (trap 2): settled by evidence.** A text style that renders Bebas at Lime's size
  because its node inherits Lime's mode is drawn in Pop's display face at Pop's ramp size. Its
  colour is the node's own raw fill.
- **Raw leaks (trap 7): asked once, in session 0, from a table.** CONVENTIONS A has two rows that
  pull opposite ways here — *leaked tops are followed where they show* and *a leak that shows and
  reads as a defect is overridden*. Session 0 tabulates every leaked hex and face with where it
  shows (the repertoire's song titles `#AFE335` on violet; pricing's first card `#EAD7B8` type and
  `#D8A227` ticks; the gallery's `#A6E22E` inner glow; the footer's `#E4F1C4` 15% hairline; the
  pager numerals' Anton; …) and asks one question. **Recommended: follow every raw hex as a named
  literal** — the frame wins, which is goal 2 — **and override only a face** (Anton and Roboto
  Mono read as other templates' type on a Pop page; set the pager numerals in the label face, the
  clocks in Retro's own clock face). Never eleven sessions deciding it eleven ways.

### 6. `plans/CONVENTIONS.md` — **the sweep folds this pass in**

Pop is the fifth template to lean on the file, and the first whose frames are not a variable mode,
so expect new rows in A (reading raw frames; text styles resolving in an inherited mode). Keep
*Inherited and used* below, one line per bullet leaned on; the sweep adds Pop's column and the rows
this pass leaned on three times that the file does not name.

## Session 0 — the foundation

Editorial's session 0 (Lime's steps 1–9) with these deltas. It touches no section's layout code.

0. **Ask decisions 1, 2, 4 and 5** (and confirm 3). Steps 2, 6 and 7 do not depend on any of them
   and can go first; step 10's census is what decisions 4 and 5 are asked from, so run it before
   asking them.
1. **The flags, as two commits:**
   - (a) Pure refactors, **all five themes digest to zero rows**: `pop` added beside `retro`, `lime`,
     `grunge` and `editorial` with no reader (and, under decision 3's B, the design-scoped join —
     which is *not* a pure refactor, so it moves to (b)). Commit.
   - (b) `|| T.name === 'Pop'` on `designed`, the `THEMES[4]` rewrite, `THEME_RAMP.Pop`, the face
     and casing, and under decision 4's A′ `THEMES[4].schemes` and `SCHEMES_OF.Pop[0]` — where
     theme 4 moving is the point and 0, 1, 2 and 3 stay at zero.
2. **`THEMES` ↔ tokens is settled** (Lime's session 0): `radius` = `radius/card`, `radiusSm` =
   `radius/control`, `btnR` = `radius/pill`, `bw` = `border/thin`, `radiusChip` = `radius/chip`.
3. **Rewrite `THEMES[4]`**: the faces (decision 1), `ui` Chakra Petch, `body` Inter, **`mono` Space
   Mono** (the frames' eyebrows, ID lines, day names and gig times are Space Mono 9–18 — check what
   `s.mono` reaches before setting it), `casing` `'title'` (decision 2), `dls` `'0px'`, `radius`
   `'24px'`, `radiusSm` `'8px'`, `btnR` `'999px'`, `bw` `'2px'`, `radiusChip` `'8px'`, `sub` reworded,
   `palette` and `tags` unchanged, and a **`sem` object in Lime's exact shape from Scheme 1**: `box1`
   `#F5F5F5`, `box2` `#EBEBEB`, `box3` `#000000`, `glow` `#FF2DA0`, `activeBg` `#000000`, `activeFg`
   `#FFFFFF`, `inactiveBg` `#C6F200`, `inactiveFg` `#000000`, `inactiveLine` `#C6F200`, `stroke1`
   `#FF2DA0`, `stroke2` `#C6F200`, `hl` `#141414`, and `tagFg` **seven** long: `['#141414',
   '#F6F0E8', '#F6F0E8', '#000000', '#F6F0E8', '#F6F0E8', '#000000']`. Trap 4's `text3` is
   decided here. Under A′, `schemes` in the same shape for the schemes the census seats (`palette`
   is `[bg, text1, text2]`).
4. **`THEME_RAMP.Pop`** from the mode table (desktop × 0.82 rounded, 768 / 390 verbatim), and keep
   `preview.jsx`'s `Z` copy in step (it needed nothing for Editorial: `sectionVm` lays `THEME_RAMP`
   over it by `dev`).
5. **Fonts.** Chakra Petch, Inter and Space Mono are loaded in both HTML files; the display face per
   decision 1, in both. Titan One is read by nothing in `src/` but `THEMES[4]` (grepped at planning
   time) — drop it from the `index.html` link only if decision 1 leaves it unread. **Archivo
   stays**: the builder chrome names it.
6. **Every name gate outside `EncoreSection`** — `grep -n "T.name ===" EncoreBuilder.jsx data.js
   photos.js`. The expected answers, each to be checked against the frame:
   - `vm.grainSrc` — **stays unwidened**: the planning census found no grain hash (`b74be8bc`) and
     no texture on any Pop section.
   - `vm.mapSrc` / `mapRadialSrc` — through `designed` (decision 3).
   - **`gigDark`** — Retro's; Pop's gig panel is red under white type. Decide in section 6.
   - `navFace` / `navGapEm` — the header session's, with decision 1's table.
   - The `d === 1` / `d === 2` inset arms, `footerBand`, `navModeDefault` — later passes'; leave
     them.
   - `vm.titleWordEms`, `vm.quotes[].wordEms`, `vm.footerWordEms` — Lime's and Editorial's
     widest-word fits; sections 9, 10 and 11 check whether Pop's hand-scaled statements need one in
     the chosen face.
   - `limeTreeTheme()`'s three seeds (decision 3) — sections 7, 8 and 9.
   - `headerFamily`, `HEADER_NAMES` — the header session's.
7. **Seed Pop's photographs** (`SEEDS.Pop` in `photos.js`). The image-hash walk, done:

   | Slot | Hash | In the frame | Note |
   |---|---|---|---|
   | hero | `f70d25d3` | 1440 × 750, `FILL` | own (seen before only as a placeholder tile in Grunge's layout-3 gallery) |
   | header avatar (`pp`) | `0b079033` | 213, a **circle** in a pink ring, **`CROP`** | own — read `imageTransform` (CONVENTIONS A, *read a fill's `scaleMode`*) |
   | bio | `51d06990` | 488 × 648, an arch, `FILL` | own |
   | gallery spotlight | `b3a33296` | 636 × 538, `FILL` | own |
   | gallery strip | `a548367c`, `3cba54cf`, `b073b46f`, `3f0c98b4`, `8f69a4a6`, `b35b6507` | 82 × 76 | two of Pop's own beside **four of Retro's** placeholder strip (`3f0c98b4` is Retro's own spotlight again) — Grunge's and Editorial's call: seed seven distinct pictures of this shoot and record it |
   | calendar | `bd34152d` | 484 × 346, **`CROP`** | own |
   | form avatar | `59099150` | 48 × 48 | own — check whether it is the header avatar's source (Editorial's one image in two slots) |
   | five track covers, map raster | | | the shared ones (`8c7fa7d8` …, `8cd103b8`) |

   Export as JPEG at Lime's sizes (its *Photographs are per theme* bullet), `pop-*.jpg`; `photo`
   (the layout-2 form's stage) is the hero unless layout 2's frame says otherwise. The standalone is
   **8.79 MB** today (the committed root `index.html`, 8,787,260 bytes); note the new size.
8. **Casing** — decision 2; check the `cased()` sites against the render, as Lime and Editorial did.
9. **`T.tags` keeps seven.** Pop's Scheme 1 has seven distinct tag hues, the first seat system since
   Retro's that is not Lime's two alternating tags, so `vm.chips` has seven real seats (Lime blocks read `chips[0]` / `[1]`: lime and pink, the
   header chips' first two). `deep` / `deepFg` / `mapBg` take the darkest tag, which stays **violet**
   `#6B2CFF` — the frame's map card. `pillBg` is **black** (trap 3); the flat layouts 2–4 move with
   it and with `sem`, and with `s.designed` — their map plates draw the raster and their chips take
   `TagChips`' designed branch (Editorial's session 0: "the flat map now draws the raster") — so
   name which cards change in the after-shots rather than chase them.
10. **The census** (decisions 4 and 5): per section, every raw fill, stroke and text colour and every
    face with its count, beside the candidate scheme's keys; mark each hex *the seat's key*, *Pop's
    own tint* (`#9162FF`, `#4F81FF`, `#E41010`, `#EE138B`, `#C3F007`, `#6B34FF`, …) or *a twin's
    leak*. Write it under *Conventions → Settled in session 0*; every section session starts from its
    row.

**Verification for session 0:** commit (a) digests to zero at **all five** themes; commit (b) at
themes **0, 1, 2 and 3** (`node scripts/digest.mjs before 0,1,2,3` / `after`). Theme 4 changes on
purpose: keep desktop before / after shots of all eleven sections in the scratchpad (`shots.mjs`).
Pop has no photographs today, so key any tile probe on style, not `img` (`browser-tool-choice`).

## The header, and the four cards

Editorial's section, with `'pop'` for `'editorial'`:

- **`headerFamily('Pop')` → `'pop'`**, four layouts, `HEADER_NAMES.pop` slicing photographic's first
  four (Hero / Feature spread / Inset Hero / Stacked). Pop's layout 2, 3 and 4 pages were found at
  planning time (*The Figma source*). `flatHeader` false; `bleed` comes through `s.designed`.
- **Delete `TEMPLATE_STILLS.Pop`**, its import and `pop-header.jpg`, and fix the comments. The
  picker card, its thumbnail and modal card 1 then all render `HeaderV0`. **`TEMPLATE_STILLS` is
  then empty and the `'flat'` family has no member**; the sweep deletes them (below).
- **Cards 2–4 are placeholders that must publish**: `HeaderV1`…`V3` under Pop. Render each at three
  widths, publish, fix only what is broken, and record what each needs under *Open questions* for
  its layout pass. The `pageLayout()` fold needs no change. Record what the planning walk saw for
  those passes: layout 3's header stands on Scheme 1 at 1440 and **Scheme 6 at 768 and 390**, layout
  4's on Scheme 3.
- **The header is the one section that binds**, so here alone `get_variable_defs` and
  `boundVariables` work as in every earlier pass. Its capsule `Frame 49` is on **Scheme 3** (pink:
  lime links, a lime Book Now pill with a pink label and arrow disc) — a nested scheme, read through
  `s.onScheme[3]` under A′ or as literals under B. `get_variable_defs` on the 390 master mixes the
  two schemes in one list (CONVENTIONS A).
- **The 390 hero `986:52432` is `Device: Tablet` on a Mobile page — the fourth template in a row.**
  Its type is the 768 ramp's (`display-xl` 75, confirmed).
- **The nav fit**: `vm.navEms` and its siblings, in the face's table (decision 1), on the uppercased
  strings.
- **What the frame draws** (read off the desktop render; confirm each against `HeaderV0`'s Lime,
  Grunge and Editorial arms before inventing anything): the photograph over a `#6B2CFF` ground under
  a gradient; a **glass** capsule (`#FFFFFF` at 12% under `BACKGROUND_BLUR` 44 — check what
  `NavBar`'s Lime capsule does before adding a `backdropFilter`) with a lime globe mark, "KAI MERCER"
  at `Display/List` 20 and nine links at `Label/SM` 16, all lime, and the lime Book Now pill; the
  avatar a **circle** in a pink ring, where Lime and Grunge draw a rounded card and Editorial an arch;
  a ringed lime bullet before "MANCHESTER, UK" (white) and "DJ · LIVE ACT" (pink); the title at
  `Display/XL` in white, **one tone**; a lime **scribble** (331 × 95) under the title's right end;
  the chips in Chakra Petch at `Label/XS` 20, lime and pink alternating, then the teal *Live*
  (`sem/media` `#41BFBA`) and a black *All Access*; the **smiley-globe seal** (175, Figma −20 → CSS
  +20) top-right where Lime draws its reticle; and a **10px lime rule** inside its foot.

Verify in the builder as Lime's plan says, reading "Pop" for "Lime".

## Pop's decorative language

Everything here is behind `s.pop`, a widened gate or a named pair.

- **10px rules, not seams.** Every band meets its neighbour on a straight edge — no arcs, no tears;
  the map's and form's Lime arc vectors are gone from Pop's variants. Where Pop marks a change of
  ground it is a **10px INSIDE stroke on one side of the section's root**, inside its stated height,
  in a palette hue: the header's foot (lime), and the tops of the repertoire (lime), pricing (blue),
  the calendar (pink) and the testimonials (violet). The footer's top is a 1px `#E4F1C4` at 15% —
  Lime's hairline, a leak (decision 5). Each rule is its own section's, so no two sessions claim
  one, and a reordered page keeps each stripe on its own section — benign, unlike an arc against the
  wrong neighbour.
- **Stickers** — flat vector marks laid over the composition, each a node to transcribe once and
  reuse:

  | Mark | Where (size, Figma rotation → CSS) | Ink |
  |---|---|---|
  | **smiley-globe seal** — a disc, a globe, a smiley, the name twice as `TEXT_PATH`, two 11px marks (`Frame 206` / `207`) | header 175 (−20 → +20), form 136 (−20), footer 126 (−19.5) | header pink disc; read each |
  | **smiley sun** — a scalloped disc with a smile | bio 154 (−25.4), footer 152 × 151 (−22.3) | blue in the bio, lime in the footer |
  | heart (`Union` 101 × 80) | repertoire, by the pager | teal |
  | asterisk (93 × 95, −19) | gallery, beside the head | teal |
  | starburst (105, −3) | pricing, over the middle card | pink |
  | sparkle (90 × 91, +18) | calendar, by the photograph | teal |
  | rings (273 × 242) | pricing, behind the third card — 52 past the 390 page | violet |

  The seal is the twins' `SealBadge` idea (a turned disc, the name on a path, two marks) in a new
  drawing: start from `SealBadge`'s Editorial arm, place it by its disc's centre (CONVENTIONS B), and
  measure it under `.seal-spin` with the animation stopped — then decide whether Pop's seal spins at
  all (read the frame; nothing in it says so). The header session meets it first; the sun is the
  bio's.
- **Scribbles and arrows** — hand-drawn single-stroke vectors: the lime underlines (the header's
  331 × 95, the bio's 258 × 12 under its head, the map's 407 × 95 at −4 across "MANCHESTER", the
  form's 292 × 68 at −4 under its statement), the repertoire's pink lightning (100 × 91), and the lime
  squiggle arrows (media 209 × 126 at −135, the calendar's 272 × 164 at −165). Transcribe each path
  from `download_assets`' SVG, not by eye.
- **Dot grids** — a 4 × 5 grid of 20 dots (`Union`, 288 × 239), lime in the bio and the calendar,
  teal in the media card.
- **Tilts**: the media cards' ±1° (Retro's lean, kept), the three pricing cards (read each
  rotation), the testimonials' backs (Lime's insets off the card).
- **Real drop shadows**, read off each node's `effects` (CONVENTIONS A's *every glow is a guess*):
  the bio photograph (`#000` 16%, 4, 4, blur 9 — at 1440 and 768, **none at 390**), the testimonials'
  three cards (`#000` 25%, 0, 4, blur 4), and the gallery's five (an inner shadow, a drop shadow,
  two background blurs and a lime `#A6E22E` inner glow at 18 — the last a leak). The capsule's blur
  is Lime's.
- **Radii** 24 / 8 / 8 / 999 through the session-0 keys; the cards' own radii (the media card's 50,
  the player's 40, the track cards' 20) are read per session.
- **No texture.** A stddev scan of any band should come back flat; no grain hash appears on the page.

### The band table

The ground sequence, identical at all three widths:

| # | Section | Ground | Rule it owns | On it |
|---|---|---|---|---|
| 1 | header | photograph over `#6B2CFF`, full-bleed | 10px `#C6F200`, foot | glass capsule (Scheme 3), circle avatar, scribble, seal |
| 2 | bio | `#FFFFFF` | — | lime dots, the arch in a pink ring under a shadow, blue sun, scribble |
| 3 | media | `#FFFFFF` | — | a pink card: teal dots, lime arrow, five coloured cards, the violet player |
| 4 | gallery | `#FFFFFF` | — | teal asterisk, a lime panel of source rows, the viewer and strip |
| 5 | repertoire | `#6B2CFF` | 10px `#C6F200`, top | pink lightning, lime-ringed rows, teal heart |
| 6 | map | `#FFFFFF` | — | lime scribble, a violet map card, a red gig panel |
| 7 | pricing | `#FFFFFF` | 10px `#2563FF`, top | three leant cards (violet, lime, pink), pink starburst, violet rings |
| 8 | calendar | `#2563FF` | 10px `#FF2DA0`, top | lime arrow, a lighter-blue panel, teal sparkle, lime dots |
| 9 | form | `#FFFFFF` | — | a violet card with a pink form half, the seal, lime scribble |
| 10 | testimonials | `#C6F200` | 10px `#6B2CFF`, top | a violet card over pink and teal backs |
| 11 | footer | `#FF2DA0` | 1px `#E4F1C4` 15%, top (a leak) | the seal, lime sun |

Bio, media and gallery stand white on white on white, and so do map and pricing; the media's pink
card, the gallery's lime panel and pricing's blue rule are what part them, and the form stands white
between the blue calendar and the lime testimonials. A reordered page can stand two white sections
together with nothing between — accepted, as every earlier template's mismatched seams were.

## Per-session procedure

[`../lime/layout-1.md`](../lime/layout-1.md)'s *Per-session procedure*, steps 1–9, with:

- step 3: `get_metadata` on the three Pop nodes and the twin's desktop node — Lime's for ten
  sections, **Retro's `964:58578` for the media player** — then the paired diff walk (CONVENTIONS A)
  **by traversal order and case-insensitively**
- step 4: **`get_variable_defs` on the header only.** For the other ten, the node walker (CONVENTIONS
  A) with `textStyleId` resolved to a style name — a styled node takes Pop's row of the ramp, never
  the size it renders at in an inherited Lime mode (trap 2) — and the session-0 census row
- step 5: widen the section's Lime block per decision 3, reading its Grunge and Editorial arms first;
  for the media player, dress Retro's `s.v0` body behind `s.pop`
- step 6: the harness is `preview.html?cat=<cat>&arch=0&theme=4&w=desktop|tablet|mobile`
  (`arch` defaults to 1 — always pass `arch=0`); function at `theme=4&live=1`; **zero rows at
  themes 0, 1, 2 and 3** before and after, every session
- step 9's hand-off prompt, for a Lime-tree section:

  ```
  Continue the Pop layout-1 pass with section N, `cat`.

  Read CLAUDE.md, then plans/pop/layout-1.md, then plans/CONVENTIONS.md (groups A, B, C and D1),
  then this section's Settled bullets in plans/lime/layout-1.md, plans/grunge/layout-1.md and
  plans/editorial/layout-1.md, then the `figma-frame-reading`, `verifying-the-published-tab` and
  `browser-tool-choice` memory notes, and follow the per-session procedure.

  The three Pop masters are `<desktop node>` (1440 × <H>), `<tablet node>` (768 × <H>) and
  `<mobile node>` (390 × <H>) in Figma file uFoUbPaBrDicjyuSBEbtGT, on a `<ground>` ground; the Lime
  twin is `<lime node>`. Pop's frames bind nothing outside the header: read raw fills and sizes with
  the node walker, and resolve any text style in Pop's mode. Widen the Lime block in the existing
  `s.v0` branch of `<Component>` in EncoreSection.jsx per decision 3, Pop's deltas behind `s.pop`,
  starting from this section's census row. Themes 0, 1, 2 and 3 must digest to zero rows.

  <the two or three conventions most likely to bite this section>

  Branch: pop-layout-1. Do not refresh the root index.html.
  ```

  and for the media player:

  ```
  Continue the Pop layout-1 pass with section 3, `media`.

  Read CLAUDE.md, then plans/pop/layout-1.md, then plans/CONVENTIONS.md (groups A, B and C), then
  the `v0` fit comments at the head of `Media` in EncoreSection.jsx and Lime layout 1's Settled in
  section 3, then the `figma-frame-reading`, `verifying-the-published-tab` and `browser-tool-choice`
  memory notes, and follow the per-session procedure.

  The three Pop masters are `964:58626` (1440 × 1055), `986:52422` (768 × 1499, inside wrapper
  `986:52421`) and `986:52434` (390 × 1167) in Figma file uFoUbPaBrDicjyuSBEbtGT. They are Retro's
  Floating cards stack (`964:58578`), not Lime's block, nested in a pink card: dress Retro's shared
  `s.v0` body behind `s.pop` — `(s.retro || s.pop)` where Pop draws what Retro draws — and leave
  Lime's `if (s.v0 && s.limeTree)` block untouched. The <audio>, `cur` and transport are already
  live there. Themes 0, 1, 2 and 3 must digest to zero rows.

  <the two or three conventions most likely to bite this section>

  Branch: pop-layout-1. Do not refresh the root index.html.
  ```

Do **not** refresh the root `index.html` per section; it is the sweep's last step.

## The end-of-pass sweep

One session after section 11. Lime's, Grunge's and Editorial's lists apply item for item (their *The
end-of-pass sweep* and *Learned on the end-of-pass sweep*); what is Pop's own:

1. **CLAUDE.md and `notes/templates.md`**: "Retro, Lime, Grunge and Editorial are designed; Pop is
   not" becomes all five; Pop seeds photography; `s.pop` named beside the other four flags;
   decision 4's sentence on the per-section scheme rule; Pop's decoration (the 10px rules, the
   stickers, the scribbles, the dot grids); the `FIELDS` bullet's "Pop's undesigned header family
   carries no note"; every Lime-and-twins state description this pass gave a Pop arm (booked day,
   refused box, the active marks); the file table's line counts (`wc -l`).
2. **README.md** and the code comments making a claim about the template list (`grep -rn "flat\b\|the
   one flat\|Pop keeps\|Pop is not\|Pop renders\|undesigned" source/src/builder README.md notes`) —
   fix the claims, leave the branch-local truths.
3. **The flat family has no member: delete it** (CLAUDE.md's rule — what no design reads is deleted,
   not kept at zero readers). `FlatHeader`, `FlatNav` and §10.3's banner, `s.flatHeader` and its
   root dispatch, `HEADER_NAMES.flat`, `HEADER_COUNT.flat` and `headerFamily`'s `'flat'` fallback (a
   theme with no family then needs a defined answer — decide it), `TEMPLATE_STILLS`, its import and
   the `if (still)` short-circuit in `TemplatePreview`. Prove it with a five-theme digest: zero
   rows at all five.
4. **Every `(s.limeTree || s.pop)` and every `s.limeTree` left in layout-1 code** (decision 3),
   listed with why Pop does or does not share it; fold the pairs if a group reads better.
5. **`Photo`'s empty `backdrop`** under Pop (`&noimage=1`): the Lime arm's `box1` → `bg` → `box3` is
   `#F5F5F5` → `#FFFFFF` → `#000000` in Scheme 1 — check it reads as a well on white, and on the
   violet header.
6. **One whole-page published check under Pop** — `node scripts/page-check.mjs Pop`; every band edge
   and 10px rule eyeballed against its real neighbour at 1440 and 390; no sticker, scribble or seal
   over a control; **the 390 page does not scroll sideways** (the pricing rings).
7. **The four header cards** still render and publish.
8. **Field reach** (`scripts/reach.mjs`): the header's `in` gains a Pop row, and so does every
   template-keyed row this pass widened. `FIELDS.media.cta`'s `'*': []` row already reads "Not shown
   in this template" under Pop, which is right while the media keeps Retro's Soundcloud seat.
9. **`CONVENTIONS.md`** (decision 6), and **`plans/README.md`**: mark the pass closed.
10. **Refresh the root `index.html`**, with the two-build digest (`build-digest.mjs`): zero rows at
    themes 0, 1, 2 and 3 and non-zero at 4. The tell that it shipped: the old build's picker shows
    Pop as a still and its modal offers three flat cards; the new one four. Record the standalone
    file's new size (Pop's photographs, and the face if self-hosted).

## Conventions

Append as the pass goes. Do not repeat Lime's, Grunge's, Editorial's or Retro's bullets; name them.

- **The gates are `s.pop`, the widened pair `(s.limeTree || s.pop)`, `(s.retro || s.pop)` in
  Retro's media body, and `s.designed`** (decision 3). Never edit a Retro, Lime, Grunge or Editorial
  literal to make Pop look right; every session proves it with the four-theme digest.
- **Harness:** `theme=4`, `arch=0`.
- **Read raw values, not variables, outside the header.** The variants bind nothing; `get_variable_defs`
  answers Lime's mode where a section inherits it (trap 1).
- **A text style is read by name, in Pop's mode** (trap 2): its node may render Bebas at Lime's
  size in the frame, and Pop draws Chunko's stand-in at Pop's ramp.
- **Diff by traversal order and case-insensitively, never by id**: each template is its own variant,
  and Pop types its display strings in capitals.
- **Every head on this page is one tone.** The planning read found no two-colour heading.

### Seen at planning time, per section

From the renders and the planning walk — impressions to confirm, not measurements.

1. **header** — see *The header, and the four cards*.
2. **bio** — Lime's three columns on white: "KM BIO" (Chakra Petch 11, tracked 1.5) and "[ 001 ]
   STRUCTURE · BIO_01" (Space Mono 10) flanking left with the head "READS THE ROOM." at
   `Display/LG` 82 in pink over a lime scribble; the arch photograph (488 × 648 on a black ground)
   in a pink ring under a drop shadow, a lime dot grid to its left and the blue sun on its edge; right,
   "About" (Space Mono 11), the paragraph in Inter 14 / 22 **black**, a black rule and the role line.
   **No seal** — the first Lime-tree bio without one at layout 1.
3. **media** — Retro's stack in a pink card (radius 50) on white: "TOP TRACKS" (Space Mono 11,
   white) over "FIVE WORTH YOUR EAR." (82.14, lime, hand-scaled); a teal dot grid and a lime squiggle
   arrow; five cards at ±1°, radius 20, in lime / red / blue / teal / yellow with their numbers
   (Space Mono 18), titles (Chunko 22) and subs (Inter 12) inked per card; the now-playing card
   violet, radius 40, its disc `#2A2A2A`, title Chunko 20 white, artist Inter 13 `#B3B3B3`, clocks
   Roboto Mono 10, a pink progress fill; a lime Soundcloud pill (radius 67) with a dark disc. Read
   whether the cards throw Retro's hard offset blocks (the render shows none), and the counter
   ("5 / 5 FEATURED" is not drawn here).
4. **gallery** — Lime's tree on white: "SEE US IN ACTION" at `Display/LG` 82 violet beside a teal
   asterisk; the source rows on a lime panel, the open row pink, the others outlined violet with violet
   glyph discs; the viewer photograph with lime arrow discs; the strip of seven, one ringed. The 390
   spotlight runs 3 past the page.
5. **repertoire** — violet under a 10px lime rule: "240 SONGS" at `Display/LG` lime beside a pink
   lightning scribble; the search a `#9162FF` pill with a lime glyph disc; chips *All* lime-filled,
   the rest violet tints (Inter 12.5); rows outlined lime, numbers Chakra Petch 16, titles at
   `Display/Title` 28 in `#AFE335` (a leak), artists Chunko 16 pink; the pager's lime arrow discs, a
   pink current pill and Anton numerals (a leak); a teal heart by the pager. Pop's frame marks the
   current page — follow it (`Pager`'s arm, Editorial's precedent).
6. **map** — white: "Shows/coverage" (Inter Bold 11) over "MANCHESTER" (trap 2: Chunko at 82 in
   Pop's mode) in pink, a lime scribble across it, "12 MILE RADIUS" (20.39, violet) right; a violet
   card round the raster (tinted — read the blend) with "BASED IN MANCHESTER" (22.71, white) and its
   caption; a red `#FF1A1A` gig panel, rows `#E41010`, teal date discs, Space Mono times; the pager's
   teal current pill. **No arc seams**, where Lime's map owns two. `gigDark` is decided here.
7. **pricing** — white under a 10px blue rule: the head (trap 2: Chunko at 36) in **lime on white**
   — read its legibility against the frame before following it; chips *Private Event* violet-filled,
   the other two violet at 33%; three leant cards — violet, lime, pink — with Chunko 24 names, 36
   prices, Chakra Petch features and Book Now pills; a pink starburst on the middle card and violet
   rings behind the third, which run 52 past the 390 page. Retro's `#EAD7B8` and `#D8A227` on the
   first card (decision 5).
8. **calendar** — blue under a 10px pink rule: "BOOK NOW" (44.79, lime, hand-scaled) with a lime
   squiggle arrow; a lighter `#4F81FF` panel; "JUNE 2025" (30.28, lime) between lime arrow discs; day
   names Space Mono 15.11; cells blue pills ringed white 15%, numerals Chakra Petch 18.13, the picked
   day pink, booked days dimmed; the photograph with a teal sparkle and lime dots; the foot line Space
   Mono Bold 13.37. `FIELDS.calendar.heading`'s `in` likely owes a Pop row.
9. **form** — white: a violet card (radius read per master) with a pink form half; the
   smiley-globe seal over its top-right corner; left, the 48 avatar, the name (13.18) and role, the
   statement "LET'S MAKE YOUR NIGHT UNFORGETTABLE." (35.16, pink, hand-scaled) over a lime scribble,
   three lime-ticked lines (Inter 13); right, labels Chunko 15.14 white, boxes `#EE138B`,
   placeholders white 80%, chips lime, a lime **ENQUIRE** pill with a pink disc. No arcs.
10. **testimonials** — lime under a 10px violet rule: a violet card over pink and teal backs, each
    under a drop shadow; "REVIEWED 6 DAYS AGO" (Space Mono 11); the quote (40.38, lime, hand-scaled);
    "HANNAH L" (20.19, violet) on a lime pill and "PRIVATE HOST" (trap 2: Chunko at 28) pink; violet
    arrow discs.
11. **footer** — pink: the globe mark and "KAI MERCER" (13.5); the smiley-globe seal near the column
    split; the statement (40.38 on a 33.44 line, lime); links Chunko 27.62 white in two columns; a
    violet Book Now pill with a lime disc; the lime sun by the links; small print 14.51 white; the
    leaked hairline at its top. The 768 and 390 masters are 720 tall against Lime's 647 / 619 — find
    out why before fitting.

### Inherited and used

*(Append one line each time a session leans on a bullet from Lime's, Grunge's, Editorial's or
Retro's Conventions, naming the plan it came from, a blank line between sections. The sweep folds
it into [`../CONVENTIONS.md`](../CONVENTIONS.md).)*

## Open questions

1. **Chunko Bold Demo** — decision 1, the user's call in session 0.
2. **Casing** — decision 2, settled beside it.
3. **Seats or literals** — decision 4, the user's call after the census.
4. **The raw leaks** — decision 5, the user's call from the census table.
5. **The unbound variants** — worth telling the designer: ten of eleven Pop variants carry raw
   values, and the desktop page frame and several narrow masters are in Lime's mode, so the file's
   Pop mode does not drive them and three heads render in Bebas Neue at Lime's sizes.
6. **The gallery strip** — the frame borrows four of Retro's placeholder thumbnails beside two of
   Pop's; seeded as seven distinct pictures of Pop's shoot (session 0). Worth telling the designer.
7. **The 390 pricing rings** run 52 past the page. Clipped here; worth telling the designer.
8. **Header cards 2–4 under Pop** — recorded in section 1.
9. **The seal's spin** — the twins' seals turn (`.seal-spin`); nothing in Pop's frame says whether
   its smiley-globe seal does. Decided in section 1.
