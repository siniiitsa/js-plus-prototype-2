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
| 0 | *foundation* | `964:58623` *(page)* | Pop → `THEMES[4]`, face, casing, ramp, schemes, flags, photos | — | `986:52418` | — | `986:52431` | — | — | — | done `3267b36` · `d57d896` |
| 1 | `header` | `964:58624` | Headers — hero | 1440 × 750 | `986:52419` | 768 × 1024 | `986:52432` | 390 × 844 | photo over `#6B2CFF` | Lime `964:58588` | done `092b930` |
| 2 | `bio` | `964:58625` | Bios — A · Flanked portrait | 1440 × 769 | `986:52420` | 768 × 1153.8 | `986:52433` | 390 × 769.8 | `#FFFFFF` | Lime `964:58589` | done `9083be9` |
| 3 | `media` | `964:58626` | Media Player — D · Floating cards stack | 1440 × 1055 | `986:52422` *(in `986:52421`)* | 768 × 1499 | `986:52434` | 390 × 1167 | `#FFFFFF`, a `#FF2DA0` card | **Retro `964:58578`** | done `f1861bd` |
| 4 | `gallery` | `964:58627` | Gallery Sections — Component 1 | 1440 × 788 | `986:52423` | 768 × 1153 | `989:22531` | 390 × 817 | `#FFFFFF`, a `#C6F200` panel | Lime `964:58591` | done `335655f` |
| 5 | `repertoire` | `964:58628` | Repertoire — A · Two-column dense | 1440 × 1087 | `986:52424` | 768 × 945 | `986:52436` | 390 × 961 | `#6B2CFF` | Lime `964:58592` | done `2d77ee8` |
| 6 | `map` | `964:58629` | Events Map — D · Compact tile | 1440 × 1192 | `986:52425` | 768 × 1266 | `986:52437` | 390 × 1095.2 | `#FFFFFF` | Lime `964:58593` | done `a9af421` |
| 7 | `pricing` | `964:58630` | Pricing — B · 3-col in soft panel | 1440 × 801 | `986:52426` | 768 × 745.1 | `986:52438` | 390 × 1549.7 | `#FFFFFF` | Lime `964:58594` | done `b845e09` |
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

### 1. Chunko Bold Demo is a demo face — **settled: answer B, Titan One at `faceK` 0.98**

*Settled in session 0 (2026-10-02):* the user chose Titan One, the recommendation off the measured
table (*Conventions → Settled in session 0*). The rest of this heading is kept as the record of the
question.

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

### 2. Casing — **settled: `'title'`, with per-site uppercase (Grunge's rule)**

*Settled in session 0 (2026-10-02):* confirmed by the user.

`THEMES[4].casing` is `'upper'`, so `caseText` upper-cases every `cased()` string — and the frames
set their Chakra Petch, Inter and Space Mono strings mixed: the header chips "Default", "Sold Out",
"New Release"; the repertoire's "Weddings", "Pubs", "Birthdays"; pricing's "Private Event"; the
form's "Full name" and "Wedding"; the bio's "About". So `'title'` is right whatever face decision 1
picks, and each display or label string takes `textTransform: 'uppercase'` in its own arm
(CONVENTIONS C, *casing stays the theme's*). Settle it in session 0 beside the face, not per section:
after it, every Pop head renders mixed case until its section uppercases it — expected.

### 3. The fifth flag — **settled: A, `s.pop`, widened per site**

*Settled in session 0 (2026-10-02):* confirmed by the user; `s.pop` landed in commit (a) with no
reader.

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

### 4. The frames are unbound — **settled: route A′, the calendar seated too**

*Settled in session 0 (2026-10-02):* the user chose A′ as recommended off the census —
`SCHEMES_OF.Pop[0]` seats the repertoire on 6, the calendar on 4, the testimonials on 2 and the
footer on 3; `THEMES[4].schemes` carries 2, 3, 4, 6 and 7 for those and the nested cards. The rest
of this heading is kept as the record of the question.

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

### 5. The leaks — **settled: follow every raw hex; override the three faces and the two defects**

*Settled in session 0 (2026-10-02):* the user ruled once, off the census's leak table: every raw
hex is followed as a named literal; **Anton** (the pager numerals) is set in Pop's label face,
**Roboto Mono** (the media's clocks) in `s.body` (Retro's own clock face), **Soulway** (the 390
header's Book Now) in the display face; and the two leaks that read as defects are overridden — **the
gallery's eyebrow "MEDIA"**, Lime's `#F2FFD0` on white and invisible, is inked in a visible Pop ink,
and **the "02 — 15" counter pill over the gallery's spotlight**, Retro's `#111111` at 55% under
`#C8461C`, is re-inked in Pop's colours. Sections 1, 3, 4, 5 and 6 carry them out.

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
   Retro's that is not Lime's two alternating tags, so ~~`vm.chips` has seven real seats~~ — *corrected
   in section 3*: `vm.chips` keeps `TAGS`' **six** seats, so Scheme 1's `tag7` (yellow) is
   `s.onScheme[1].chips[6]`, which `flatScheme` builds from all seven — (Lime blocks read `chips[0]` / `[1]`: lime and pink, the
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
  (`sem/media` `#41BFBA`) and a black *All Access*; the **smiley-globe seal** (174.8, Figma −19.5 →
  CSS +19.5 — *corrected in section 1*, the plan's −20 was the metadata's) top-right where Lime draws its reticle; and a **10px lime rule** inside its foot.

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
  | **smiley-globe seal** — a disc, a globe, a smiley, the name twice as `TEXT_PATH`, two 11px marks (`Frame 206` / `207`) | header 174.8 (−19.5 → +19.5, *read in section 1*), form 136 (−20), footer 126 (−19.5) | header pink disc; read each |
  | **smiley sun** — a scalloped disc with a smile | bio 154 (−25.37 → +25.37, *read in section 2*; `PopSun`), footer 152 × 151 (−22.3) | blue in the bio, lime in the footer |
  | heart (`Vector` 100.44 × 91 — *corrected in section 5*: the `Union` is the lightning) | repertoire, by the pager | teal |
  | asterisk (93 × 95, −18.52 → +18.52, *read in section 4*) | gallery, beside the head | teal |
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
  form's 292 × 68 at −4 under its statement), the repertoire's pink lightning (the `Union`, 100.87 × 79.92,
  *read in section 5*), and the lime
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

### Settled in session 0 (the foundation)

#### The census (step 10)

Read 2026-10-02 with the node walker over all 33 masters (every visible node's solid fills,
strokes, effects and text segments), then a second walk locating every hex outside Pop's palette.
**The paints are identical at 1440, 768 and 390** — the narrow masters are instances of the desktop
component — so one row per section serves all three widths; only the type differs, where a text
style resolves in Lime's mode (trap 2). Every section session starts from its row.

**The schemes table above is right, cell for cell.** One `use_figma` resolving every `2 · Scheme`
colour variable through the `Pop` primitives mode matched all nine schemes to the table; nobody
needs to re-read it. Scheme 1's `text3` is `#000000`.

**Four things the walker reports that are not paint:**
- `#41BFBA` × 20 `Vector` in the bio, media and calendar, and `#BCD631` inside the repertoire's
  `Union`: the children of a boolean op. The `Union`'s own fill is what renders (the bio's and
  calendar's lime dots, the media's teal dots, the repertoire's ~~teal heart~~ **pink lightning** —
  *corrected in section 5*; the heart is a plain `Vector` in `#00E0C4`).
- Covered fills: the gallery's `#FBF6EA` spotlight and thumbnail wells (under the photographs), the
  form's four `#FBF6EA` boxes and its message box (an `#EE138B` fill stacked over each), the form
  avatar's `#EAD7B8` well (under the photo).
- The two text fills on pricing's footnote (`#E4F1C4` and `#AFE335`, stacked; the top one shows).
- `#2563FF` "mixed" strokes inside the calendar: per-side dividers in the ground's own colour.

**Pop's own tints — in no mode, in no twin's code** (`grep` of `EncoreSection.jsx` and `data.js`
found none of them): `#9162FF` (the repertoire's search and pager pills), `#4F81FF` (the calendar's
panel), `#E41010` (the map's gig rows), `#EE138B` (the form's boxes), `#C3F007` (the form's chips,
ticks and submit, the calendar's arrow discs), `#6B32FF` / `#6B34FF` (two slips of `#6B2CFF` in the
gallery's rows), `#BCD631` (**the stickers' lime**: every scribble and squiggle arrow, the bio's
11.78 stroke, the calendar's arrow, the footer's smiley), `#3C5BAA` (the footer seal's disc) and
`#060707` (the smileys' features). A section writes them as named literals.

**The twins' leaks** (decision 5's table) — attributed by which primitive mode owns the hex, or, for
the raw ones, by family:

| Hex / face | Owner | Where it shows |
|---|---|---|
| `#AFE335` | Lime's accent | the repertoire's 12 song titles, 12 numbers and 4 pager numerals (a greener lime on violet); pricing card 1's tag chip and Book pill; the testimonials' "Private host" on its pink tag |
| `#A6E22E` | Lime's glow | the repertoire's search disc (solid), its ring (16%) and idle chips (15%); the gallery's thumb rings (35%) and the active thumb's inner glow (r 18) |
| `#F2FFD0` | Lime's text | the repertoire's eyebrow and arrow-disc rings, the testimonials' arrows (all read white); **the gallery's eyebrow "MEDIA" on white — invisible** |
| `#C7FF3C`, `#2E3928` | Lime's `hl`, `box1` | pricing's picked chip label; card 1's tag chip label |
| `#15180F`, `#0D1F03` | Lime's inks | the map's eyebrow, its gig rows' 14% ring; the media's Soundcloud label and disc (all read black) |
| `#E4F1C4`, `#ABE43B`, `#BFED11` | raw, Lime's family | the calendar's day names and foot line (pale on blue), the footer's brand name, globe mark, brand rule and 15% top hairline; pricing card 1's price and a tag label |
| `#EAD7B8`, `#D8A227` | Retro's beige, mustard | **pricing card 1's whole type** (name, £, /event, description, features) and its four ticks, on violet; the map's well under the raster (section 6 reads the blend) |
| `#FBF6EA` | Retro's paper | the repertoire's and the map's current-page numeral; the media's red card's type |
| `#111111` 55%, `#C8461C` | Retro's ink, orange | **the "02 — 15" counter pill over the gallery's spotlight** |
| `#1B1714`, `#131313`, `#161616`, `#1B1B1B`, `#DFCBA2`, `#6A6D41`, `#CBB78E`, `#B3B3B3`, `#2A2A2A` | raw, Retro's family | the media's track inks, play discs and 7 × 16 digits, the player's artist, clocks and disc (Retro's body; read against its literals in section 3); the map card's 1px ring |
| Anton Regular 12 | Retro's / Grunge's label face | the repertoire's and the map's pager numerals |
| Roboto Mono Regular 10 | none of ours | the media's two clocks — Retro sets its own in `s.body` (`EncoreSection.jsx`, the `v0` body) |
| **Soulway Regular 9.91** | Retro's display face | **the 390 header's Book Now label** — new; the planning walk did not see it |

**The mode leaks** (trap 2, settled by evidence): the map's head (`Display/LG`: Bebas 130 / 81 /
54 → Chunko 82 / 51 / 36), pricing's head (`Display/SM`: Bebas 50 / 40 / 32 → 36 / 29 / 24), the
testimonials' role (`Display/Title`: Bebas 36 / 28 / 26 → 28 / 22 / 20), and **pricing's 768 tier
names** (`Label/MD`, Bebas 17 → Chunko 14 by the rule — where the 1440 and 390 names are an
unstyled Chunko 24; section 7 reads which to follow).

**Per section** — ground, the candidate seat, and every hex against it. *Key* means the seat's own
key (`bg`, `ac` = `text1`, `tx` = `text2`, `text3`, `stroke1` / `2`, `box1`, the active / idle
pairs, `tag1`…`7`); a miss names the key the frame did not take.

| # | Section | Ground → seat | Keys that land | Misses (Pop tints, leaks) | Nested |
|---|---|---|---|---|---|
| 1 | header | `#6B2CFF` under the photo — **bound**, Scheme 1 | chips `tag1`…`5` and their inks, `#41BFBA` `sem/media`, `#000000` All Access | — (bound); the 390 Soulway | capsule **Scheme 3**, bound: links, mark and pill `#C6F200`, pill label `#FF2DA0` |
| 2 | bio | `#FFFFFF` → **1** | head `ac`; ring 10 `stroke1`; dots `stroke2`; sun `tag3`; **body, eyebrows, role line and rule `#000000` = `text3`** | scribble `#BCD631` | — |
| 3 | media | `#FFFFFF` → **1** (Retro's body) | tracks `tag1` / `6` / `3` / `4` / `7` (lime, red, blue, teal, yellow) | track inks Retro's; Soundcloud `#0D1F03`; clocks Roboto Mono | card **3** (eyebrow `text3`, head `text1`, dots `tag2`); player **6** (title `text3`, bar `text2`) |
| 4 | gallery | `#FFFFFF` → **1** | head `tx`; asterisk `tag4` | eyebrow `#F2FFD0`; thumb rings and glow `#A6E22E`; counter pill Retro's; `#6B32FF` / `#6B34FF` | panel **2** (`bg`; open row `activeBg`; rings, discs, labels `text2` / `stroke1`) — open row's label `#C6F200` where `activeFg` is white |
| 5 | repertoire | `#6B2CFF` → **6** | `bg`; head `ac`; artists `tx`; row rings and the 10px top rule `stroke1`; All chip `activeBg`; placeholder `text3` | All's label `#6B2CFF` (`activeFg` black); search, pager `#9162FF` (`box1` `#8451FA`); titles `#AFE335`; idle chips `#A6E22E` 15%; Anton | — |
| 6 | map | `#FFFFFF` → **1** | head `ac`; radius `tx`; eyebrow ≈ `text3` | eyebrow `#15180F`; Anton | card **6** (`bg`, type `text3`; ring `#CBB78E`, well `#EAD7B8`); panel **7** (`bg`, type `text3`, discs `tag5`; rows `#E41010` where `box2` is `#E40606`, current pill teal where `activeBg` is lime) |
| 7 | pricing | `#FFFFFF` → **1** | chips `tx`; 10px rule `tag3`; head `stroke2` (lime on white — the frame's own, low contrast) | picked label `#C7FF3C`; card 1's Retro type | cards **6 / 2 / 3** — 2 and 3 inked `text2` violet; **card 1 inked Retro's beige where Scheme 6 has lime / white** |
| 8 | calendar | `#2563FF` → **4** | `bg`; numerals `text3`; picked and rule `#FF2DA0` (`tag6`) | **head and month `#C6F200` (`text1` is teal)**; panel `#4F81FF` (`box1` `#3F76FF`); discs `#C3F007`; day names `#E4F1C4` | — |
| 9 | form | `#FFFFFF` → **1** | — | — | card **6** (statement `text2`, name and lines `text3`; ticks `#C3F007` ≈ `text1`); half **3** (labels `text3`; boxes `#EE138B` where `box2` is `#F0138C`; chips and submit `#C3F007` where `activeBg` is `#C6F200`) |
| 10 | testimonials | `#C6F200` → **2** | `bg`; 10px top rule and arrow discs `text2` / `stroke1`; backs `tag1` / `tag3` | arrows `#F2FFD0`; the role `#AFE335` (Bebas) | card **6** (eyebrow `text3`, quote `text1`) |
| 11 | footer | `#FF2DA0` → **3** | `bg`; statement `ac`; links and small print `text3`; column rule `stroke1`; pill `tx` | brand, mark, rule `#E4F1C4`; hairline 15% | — |

So **three sections land whole** (repertoire 6, testimonials 2, footer 3, each but its tints),
**one by its ground and white type only** (the calendar, 4), and **every coloured card lands but
pricing's first**. Across them all, the second ink the frames reach for is **`text3`** — black on
white, lime, teal and yellow, white everywhere else — never `tx` (`text2`), which is violet on
white: trap 4 is the page's rule, not the bio's.

**Decision 1's evidence — the candidates measured.** Chunko's ink, off `absoluteRenderBounds` on
the frame's single-line strings (identical at every size, 13.5 to 125): cap height **0.720 em**,
"KAI MERCER" 5.945 em, "240 SONGS" 5.660, "ABOUT" 3.389, "TOP TRACKS" 6.141, "BOOK NOW" 5.389,
"SUPERSTITION" 7.148. Each candidate rendered at 200px in the headless shell from Google Fonts,
ink read off the pixels; the stem is the "I" of "KAI" scanned 25% up, against the frame's 2× render
(`download_assets`), as a fraction of the cap:

| Face | cap / em | width vs frame (mean, spread) | I stem / cap | K stem / cap |
|---|---|---|---|---|
| **Chunko Bold Demo** (the frame) | .720 | 1 | **.385** | .391 |
| **Titan One** | .735 | 1.033 (.062) | **.388** | .395 |
| Rubik 900 | .725 | 1.052 (.084) | .359 | .338 |
| Paytone One | .720 | 0.995 (.118) | .319 | .326 |
| Bungee | .725 | 1.047 (.126) | .317 | .310 |
| Bowlby One | .785 | 1.140 (.045) | .389 | .376 |
| Archivo Black | .715 | 1.146 (.072) | .315 | .336 |
| Archivo 900 / at wdth 125 | .715 | 1.125 / 1.366 | — | — |
| Sigmar One, Rammetto One, Dela Gothic One, Rubik Mono One, Chango | .725–.825 | 1.19–1.40 | — | — |
| Lilita One | .720 | 0.900 | — | — |

Titan One — Pop's face today, already in the `index.html` link — is the only candidate with
Chunko's weight, its widths and its cap at once. What it does not have is Chunko's squared
counters and ink traps: its corners are soft. Rubik 900 is the squarer drawing, 7% light.

#### What session 0 settled

- **The display and label face is Titan One** (user call, 2026-10-02; decision 1). **`faceK` is
  0.98**: Titan One's ink is 0.735 of the em on every one of the six strings, against Chunko's
  0.720, and at 0.98 its widths run 1.2% wide where at 1 they would run 3.3% — both inside Grunge's
  2% rule, where faceK 1 was not. So `faced` / `facedLh` are **not** the identity under Pop:
  `labelStyle`, `Title` and every display string a Pop arm sets go through them, layouts 2–4
  included. Titan One has **one weight**, 400: never give a Pop display or label string a
  `fontWeight`, or the browser synthesises a bold. `index.html` already loaded it (`Titan+One`);
  `preview.html` now does, so every `theme=4` harness render from `d57d896` on is in the real face.
  Archivo stays in `index.html` for the builder chrome; nothing in a section names it now.
- **The nav's advance table is the header session's**: `navFace` needs Titan One's widths in ems
  (`bebasEms`' shape), times 0.98. Measure the rendered DOM, not canvas `measureText`, and confirm
  one label against the DOM (Editorial's session-0 lesson).
- **`labelStyle` still tracks `0.02em` under Pop**: its tracking is gated `s.limeTree`
  (`EncoreSection.jsx`, `labelStyle`). The header session widens it first, as Editorial's did —
  measure no label width before it.
- **Casing is `'title'`** (decision 2): after session 0 every head renders mixed case in Titan One
  ("Reads the room.") — expected; each section owes its own heads `textTransform: 'uppercase'`.
- **`text3` is a `sem` key and a vm key** (trap 4, decided here): `T.sem.text3` → `s.text3`, and
  through `flatScheme`'s spread `s.onScheme[n].text3`. Undefined under every other theme. It is
  the frames' second ink everywhere (the census), so a Pop arm reaches for `s.text3`, not `s.tx`,
  for body copy, eyebrows, labels and rules.
- **Route A′ is data only** (decision 4): `THEMES[4].schemes` 2, 3, 4, 6, 7 — read off the file,
  every cell the planning table's — and `SCHEMES_OF.Pop[0] = { repertoire: 6, calendar: 4,
  testimonials: 2, footer: 3 }`; Editorial's head-of-`sectionVm` mechanism needed no change. The
  nested cards read `s.onScheme[n]` (now defined under Pop): media 3 / 6, gallery 2, map 6 / 7,
  pricing 6 / 2 / 3, form 6 / 3, testimonials 6. Layouts 2–4 have no row: layout 3's header (Scheme
  6 at 768 and 390) and layout 4's (Scheme 3) are those passes'. Two derived keys route A′ does not
  fix: under Scheme 6 `paper` falls to Retro's `#FBF6EA` (neither violet nor pink clears 0.6
  luminance) and `deep` is blue, the darkest of its tags. Under Schemes 1–4 `deep` stays violet.
- **`pillBg` is black under Scheme 1** (trap 3). The after-shots show where it already reads: **the
  form's contact half and the gallery's open source row went black** (the flat `v0` shells paint
  them in `pillBg` / `activeBg`). Sections 4 and 9 owe them; neither is a regression.
- **`s.designed` reaches** the root's `bleed` (inert until the header session — `!s.flatHeader`),
  `TagChips`' designed branch and `vm.mapSrc` / `mapRadialSrc`: the flat map now draws the raster.
  `vm.grainSrc` stays unwidened: no Pop section carries a texture.
- **Photographs** (`SEEDS.Pop`, eight `pop-*.jpg`, 967 KB): the hero `f70d25d3` (3066 × 2390,
  `FILL`, exported whole at 1536 × 1197); the portrait circle `0b079033`, a `CROP` over the full
  width and the top 80.03% of a 1122 × 1402 source — **a top square**, exported at 384; the bio
  `51d06990` (1086 × 1448, `FILL`, at 820 × 1093); the spotlight `b3a33296` (a centred cover, 6.4 in
  255 from the render, at 900 × 1125); the strip's two own thumbnails `a548367c` and `3cba54cf`
  (matched to seats 0 and 1 off the render, at 800 × 1000); the calendar `bd34152d`, a `CROP` over
  the full width and 8.4–65.6% of the height, exported at that crop (1000 × 715, the frame's 1.399);
  and the form avatar `59099150` — **not** the portrait circle's source, so a slot of its own (whole,
  at 800 × 1000; the 48px circle covers its centre). `photo` is the hero: Pop's layout-2 form
  (`964:64576`) fills its stage with `f70d25d3`. **The strip departs from the frame** (Grunge's and
  Editorial's call): its other five seats are Retro's Basement shoot, so the seven slots are the two
  own thumbnails, the bio, the spotlight in `galActive()`'s slot, the calendar, the hero and the
  form avatar's source — seven different pictures of the one comedy-club night. In colour; no fill
  filter.
- **The standalone build is 10.08 MB** (10,080,265 bytes; the committed root is 8.79 MB): the eight
  JPEGs, inlined. The still `pop-header.jpg` (224 KB) goes in section 1.
- **After-render, theme 4 only** (desktop before / after shots in the session scratchpad; themes 0,
  1, 2 and 3 digested to zero rows, 528 renders, and commit (a) at all five, 660): every layout-1
  section renders in Titan One, mixed case; the four seats paint their grounds; the photographs
  and the map raster are in; the header is still `FlatHeader`. **Every theme-4 render moved, layouts
  2–4 included** — the face, casing `'title'`, `dls` 0, the radii, `faceK`, `pillBg` black, the
  `sem` keys, `designed` and the seeded photographs reach the flat placeholders too. Expected; name
  it rather than chase it. The live digest was not re-run: the change is data keyed on `'Pop'` and
  `designed`, which no theme-0–3 render reads.
- **`preview.jsx` needed nothing**: `sectionVm` lays `THEME_RAMP.Pop` over its `Z` by `dev`, as for
  Editorial.
- **`sub` was not reworded** (step 3): `'Titan One · loud & bright'` names the face Pop keeps, so it
  is still accurate.

### Settled in section 1 (the header)

- **The hero is Lime's composition node for node a fourth time**, so there is no Pop block:
  `HeaderV0` and `NavBar` read `lime = s.limeTree || pop` with `const pop = s.pop` naming the
  deltas; `BookPill`'s branch, `LogoMark`'s globe, `TagChips`' desktop padding and `labelStyle`'s
  tracking read `s.limeTree || s.pop`; `Wordmark`'s Lime arm and `Title`'s transform widen to
  `s.pop`. `labelStyle` was widened first, as session 0 asked. `headerFamily('Pop')` is `'pop'`,
  four layouts, `HEADER_NAMES.pop` sliced; `TEMPLATE_STILLS` is `{}` (its import of
  `pop-header.jpg` and the file are gone; the sweep deletes the export and `TemplatePreview`'s
  branch with the flat family).
- **The deltas, read off all three masters' bindings with the node walker** (every other box, gap
  and padding is Lime's to the pixel — the capsule's 10/10/10/20 and 30, the identity's 40 / 40 /
  24 / 36, the kicker row's 30 and 8, the 14px ring, the pill's 5/5/5/21 and 46 × 44 disc):
  - the capsule (`Frame 49`) is on **Scheme 3**: name, links, globe and burger `sem/text/1` lime,
    the pill `active/bg` lime under a `sem/bg` pink label and disc — `colour={S3.ac}` and
    `pill={{ bg: S3.activeBg, fg: S3.bg }}` off `s.onScheme[3]`; BookPill's Lime branch needed
    nothing else;
  - its fill is **`#FFFFFF` at 12% under `BACKGROUND_BLUR` 44** — the first capsule fill that is
    not opaque, so **the first blur kept**: CSS `blur(22px)` (Figma's radius halved), 18 on the
    desktop canvas. It is a layer of its own (`glass` in NavBar, an absolute `inset: 0` span) under
    the bar's halves, which go `position: relative` — **never a `backdropFilter` on the bar**,
    which would make it the containing block of NavMenu's `position: fixed` panel (proved: the
    live 768 and 390 panels measure the whole viewport);
  - the links are **Editorial's** — Label/SM 16 at lh 1.1, 23 apart — so NavBar's `sm = ed || pop`
    shares that arm (gap 23/16 em, cap `s.labelSm`, lh 1.1) and `navGapEm` is 23/16 under Pop;
  - the name is **Display/List** (20 → `s.list` 16 at 1440, the 768 ramp's 16 on both narrow
    masters) at lh 1.2, 10 from the globe narrow — Wordmark's Pop arm; the globe is Lime's vector
    (strokes 2.94), Grunge's 27.37 narrow; the 390 capsule closes its gap to 10; JP-091's
    two-line cap is **18.45** (44.28 / 2.4, the name's lh 1.2);
  - the kicker row is **Label/SM** (13 / 13 / 13 — the 390 is Tablet), the location
    `sem/active/text` white (`ink = s.activeFg`), the kicker `sem/text/1` pink (`s.ac`, Lime's);
  - the title is one tone in `sem/active/text` white, one wrapping run, and takes **Editorial's
    fit** (`min(tk.dispXl, 100cqi / navNameEms)`, `cardNameEms` at 390) in Titan's ems — the seed
    keeps 125 / 75 / 75 (628, 457 and 308 wide in 880, 540 and 370); a long name shrinks rather
    than drop the column under the card;
  - the card is a **circle** (213 → 174.66, 144, 96; radius 145) on `sem/text/2` violet in a
    `sem/text/1` pink ring drawn **inside** — 10, 10 and **4** at 390 — as an inset-shadow overlay
    over the photograph (CONVENTIONS C);
  - the scrim is Lime's full-height fade (the same `gradientTransform`) in black at the paint's
    0.74 (`SCRIM.pop`), over a `sem/text/2` violet ground — which is also the empty hero:
    **`Photo`'s backdrop is `s.tx` under Pop** (`&noimage=1` checked), not the Lime ramp;
  - the chips state a **raw radius 6** (4.92 at 1440; Grunge's precedent) and **bind six pairs**
    — `inactive/bg` · `tag/1/text`, `tag/2/bg` · `tag/5/bg`, `tag/1/bg` · `tag/1/text`,
    `tag/2/bg` · `text/2`, `media` · `text/2`, `box/3` · `text/2` — passed by seat through
    `hues` / `inks`; `sem/media` is **`POP_MEDIA` `#41BFBA`**, the header's one literal;
  - the **scribble** (`sem/tag/1/bg`, 331.36 × 95, `POP_SCRIBBLE_D`) sits in the identity block at
    (678, 184.72) × 0.82 and the 768's (376, 103), **behind** the block's content — the 768
    master's black All Access chip covers its foot — so the block is a stacking context under Pop
    (`zIndex: 0`) and the scribble at −1. **The 390 draws none**: its master carries the 768's
    numbers unadapted, a 4px sliver at x 386 of 390 — a leak that reads as a defect
    (CONVENTIONS A);
  - the **10px INSIDE stroke** on the root's foot is `sem/stroke/2` lime, an absolute strip (8.2 on
    the canvas).
- **The seal is SealBadge's new Pop arm** (`if (s.pop && !classic)`), transcribed from the frame's
  SVG in the 174.795 disc's own units (`POP_SEAL_GLOBE_D`, `POP_SEAL_SMILE_D`): a `tag/2/bg` disc,
  the `sem/bg` wireframe globe, a 24.24 `box/3` smiley disc with `text/2` features, the name in
  Titan at `faced(20.598)` tracked 6.18 on a 78.609 circle, caps in (the twins' path), and two
  `sem/bg` dots at r 5.475 on its equator. `hue` / `ink` override the disc and the marks for the
  form's and footer's callers. **Tilt −19.5 in Figma (+19.5 CSS)**, not the plan's −20; placed by
  the disc's centre — the node's corner turned about itself: (1280.0, 242.6) of 1440 and (644.4,
  219.6) of 768, both 174.8, and (330.3, 164.2) of 390 at 85. It **spins** (open question 9).
- **The glyph floor, measured** (CONVENTIONS B): the h1's box lands on the frame's to the pixel —
  (198, 821.4) 457 × 56.2 against (198, 821) at 768, (10, 588.3) against (10, 588) at 390 — but
  Titan One sets its glyphs **0.14em** lower in the 0.75 line box than Chunko does (14 / 10.5 /
  10.5 px at 1180 / 768 / 390, the same in ems). `Title` gained an additive `style` and Pop's h1
  is lifted `top: -0.14em`; the ink then lands at 391–462 against 392.0–464.1 (1180), 816–867
  against 815–867 (768) and 583–690 exactly (390). The Label/SM and Display/List strings sit 0–2px
  low and are not lifted.
- **The nav's advance table is `titanEms`** (`TITAN_EM` in `data.js`), read off the rendered DOM in
  the harness at 100px, untracked; `navFace` is `titanEms × 0.98`. Summed per character it lands on
  most labels exactly and over on the kerned ones — AVAILABILITY 3.6%, SHOWS/COVERAGE 1.3%, TOP
  TRACKS 0.8% — never under. **Confirmed on the rendered nav** after `labelStyle`'s widening:
  "About" at the 12px row measures 42.06 against 3.576 × 0.98 × 12 = 42.05. The seeded nine links
  (the frame has eight — no Availability) sit at the 12px floor on the 1180 canvas and the name
  wraps to two lines at 16 — JP-091's designed "the name gives way first", as under Lime.
- **The 390 pill's Soulway 9.91 is 16 × 0.62 = 9.92** — the 768 type through BookPill's 0.62
  hand-scale to the hundredth, confirming decision 5's reading; BookPill's small label is
  `s.pop ? '9.92px' : '11.8px'`, in the display face. The box (102.8 × 33.45) is Lime's 0.62.
- **Device modes**: the 390 hero `986:52432` is `Device: Tablet` (as is the 768): `tk` is
  `{ labelSm 13, dispXl 75, labelXs 14 }`, the name 16 through NavBar.
- **The burger panel under Pop** is NavMenu's `[s.mapBg, s.mapFg]` — a lifted violet
  `rgb(123, 67, 255)` under white, the panel's Book Now Scheme 1's black pill under white type —
  legible, kept; no Pop frame draws it.
- **Moved with the shared helpers, theme 4 only** (digest: 86 of 132 theme-4 renders; themes 0, 1,
  2 and 3 at zero, static 528 and live 528 — the live before-side served from a scratch worktree on
  :5174): every BookPill (now the capsule pill, black under white type on Scheme 1) — bio a0–a3,
  calendar a0–a3, form a0–a2, map a1–a2, media a0, pricing a0–a3, testimonials a0–a1, footer —
  every label (untracked), the footer's wordmark, the repertoire a0 and gallery a0 (one width)
  labels, and header a0–a5 (arch 4 and 5 now fold onto cards 1 and 2 through `HEADER_COUNT.pop`).
  Each section session re-reads its own pills.
- **Verified in the builder** (`page-check.mjs Pop 0,1,2,3`): the template stage's big card and
  filmstrip thumbnail render `HeaderV0` (no still); the setup modal offers **four** cards; card 1
  publishes, every nav link and Book Now scroll to their sections, the burger opens at 390, the
  390 page does not scroll sideways; cards 2–4 publish with no console error. What each still
  owes is open question 8.
- **Field reach is the sweep's** (item 8): with no Pop key in the header's `in` rows, `fieldReach`
  leaves every header field unmarked under Pop (only `cardLine`'s `'*': []` speaks). Note for it:
  Pop's seal **prints `badgeText`**, where Lime's reticle prints nothing.
- **Harness.** The one-off scripts (the advance table, the shots and probes, the live burger, the
  picker) lived in `source/scripts/` and are deleted. A white-ink row scan over the frame's 1×
  render and the harness's was enough to measure the glyph floor; numpy is not installed, PIL is.
  The static digest's before-side was the editing server (:5173) taken before the first edit; the
  live one was HEAD served from a scratch `git worktree` (its `source/node_modules` a symlink) on
  :5174, diffed with the memory note's port-and-stamp `sed`. Both recipes held at zero.
  `HEADER_COUNT.pop = 4` makes `designCount('header', 'Pop')` 4, so the sidebar's LayoutPicker on a
  Pop header highlights as Lime's does; not opened in the editor here — the sweep's item 3 walks
  every section's picker.

### Settled in section 2 (the bio)

- **No Pop block: Lime's `if (s.v0 && s.limeTree)` is `(s.limeTree || s.pop)`**, with
  `const pop = s.pop` naming the deltas. The tree is Lime's at all three widths — the flanks, the
  488 × 648 frame (230 × 311 at 390), the 14-gap prose with its spacer and rule, the 4.5 card pad
  — with three stickers added and the seal taken away. Both narrow masters are `Primitives → Pop`
  with no Device override (they inherit Tablet / Mobile from the page), so the head's
  `Display/LG` is `s.dispLg` 82 / 51 / 36, the only styled node in the section.
- **The deltas, read off the node walker on all three masters** (nothing binds):
  - every string but the head is **`#000000` = `s.text3`**, and so is the rule — `ink` is
    `pop ? s.text3 : …` (trap 4 as session 0 settled it);
  - **no string is the twins' ramp key**: KM BIO is Chakra Petch 11 tracked 1.5 (`s.ui`), the
    foot line Space Mono 10 / 0.5, About Space Mono 11 / 1.5 **typed mixed**, the role line Space
    Mono 11 / 1 — each at Figma's auto line height, which is CSS's `'normal'` (a `mono` helper in
    the block); the paragraph is a raw **Inter 14 / 22 at all three widths**, not `s.bodyMd`
    (11 / 13 / 13 under Pop). Desktop × 0.82 through the block's `u()`;
  - the head is one tone in `s.ac`, uppercase, computed weight 400;
  - the photograph is a **stadium** (radius 301, which CSS clamps as Figma does) on a `#000` 55%
    well, in a **10px INSIDE `#FF2DA0` ring** — `s.stroke1`, on the glow's own overlay as
    `inset 0 0 0 u(10)` — under a **real drop shadow**, `#000` 16%, 4 / 4, blur 9, on the clip
    div at 1440 and 768 (the frame's sits on the unfilled 580-wide parent, so the arch casts it)
    and none at 390, whose parent carries no effect.
- **No seal**: `SealBadge` is not reached under Pop. Three stickers, each Pop-only:
  - **the scribble** — an 11.78 round-capped `#BCD631` stroke (`POP_STICKER_LIME`, Pop's own
    tint), so a stadium `<span>`. At 1440 it is an absolute child of the column, 258.35 long, its
    top 8.5 below the head's box (centre 14.39); on the narrow masters it is a column row of its
    own (`Vector`, 260.54 plus the caps), centred 14 below the head and 29 above the foot line,
    its left cap 5.89 out of the column. Both hang off a Pop-only wrapper round the `h2`, so they
    stay put when the glyphs are lifted.
  - **the dot grid** — `PopDots`: the `Union`'s own `#C6F200` (`s.stroke2`) over 20 dots, 16.78 ×
    16.74, five columns 67.81 apart and four rows 73.95 apart, 288.02 × 238.58 (× 0.4584 at 390).
    The `Union` is the section's first child, so it paints under everything — under the
    paragraph's foot at 390 too — at `zIndex: -1`, the block being a stacking context under Pop
    (`position: relative; zIndex: 0` on the grid / column). `hue` is the caller's: the media
    card's grid is teal and the calendar's lime on blue.
  - **the sun** — `PopSun`: the scalloped disc's outline (`POP_SUN_D`) in `tag/3` blue
    (`s.chips[2].bg`) and the smile and eyes (`POP_SUN_FACE_D`) in `s.bg` white, off the frame's
    `fillGeometry` in the sticker's own 154 units. The frame also cuts the features out of the
    disc; on any ground the two read the same, so the disc is its outline alone. 154 square
    (78.54 at 390, the turned box ÷ 1.332), tilted **25.37** (Figma −25.37; the planning table's
    −25.4 was rounded). It does not spin: a sticker, not a seal. The footer's sun (lime, `#060707`
    features) is meant to be this component with its own `hue` / `ink` — section 11 checks the
    drawing.
- **The stickers hang off the arch's box, by the walker's `absoluteBoundingBox` centres.** The
  metadata's x for the turned sun (910.85) is its rotated parent's — 65.98 off the walker's
  844.87, and the render agrees with the walker (CONVENTIONS A). The sun's centre is 16.56 inside
  the right edge and 151.59 below the top on desktop, 35.59 past the right edge and 12.22 above
  the foot at 768, and 5.86 inside the right edge and 4.41 above the foot at 390; the grid's corner
  is 86 left of the arch and 364.09 below its top on desktop, 250 in and 152.81 down at 768, and
  98.09 in from the right edge and 299.54 down at 390. **The 390 offsets are read off the right
  edge**, since the page's 10 inset makes our arch 250 wide against the master's 230.
  Measured: the sun's centre at (776.45, 208.02) on the 1180 canvas against the frame's × 0.82
  (776.49, 207.99), and at 768 and 390 within 0.02 of the frame's once the root's offsets are
  taken out.
- **The 768 grid is a desktop leak, followed** (CONVENTIONS A, *leaked tops are followed where
  they show*): the master keeps (390, 424.59) of the section to the hundredth where the 390 master
  scaled its own, so the arch covers all but the fifth column — four dots right of the arch,
  which reads as designed. Section 1's 390 scribble was the other call (a 4px sliver at the
  frame's edge, dropped).
- **The narrow head column closes on an empty frame**: an 11.78 `Layer_1` with no child and no
  fill — the desktop scribble's frame, emptied when its vector moved into the column — under the
  column's 14 gap. Stated space, followed as `paddingBottom: 25.78`: it is what puts the arch at
  the frame's 271.78 / 222.78.
- **The glyph floor, measured** (CONVENTIONS B): the `h2`'s box lands on the frame's, but Titan
  One's cap tops sat 10.05 / 7 / 5 px low at 1180 / 768 / 390 and its feet 8.6 / 6.6 / 5 — the
  hero title's **0.14em** again, at lh 0.89 as at 0.75, since it is a difference in the faces'
  metrics. The `h2` is lifted `top: -0.14em` under Pop; a pink-ink row scan then puts the head at
  260–426 against the frame's 257.9–426 (× 0.82, 1180), and 98–134 and 87–112 exactly at 768 and
  390. KM BIO, the foot line, About and the role line land to the pixel at all three widths
  unlifted.
- **Measured**: "READS" 224 wide against the frame's 224.7 at 1180; the one-line head runs 3.4%
  wide at 768 and 390 (460 against 445, 324 against 313) — Titan One at 0.98 on this string,
  inside session 0's spread. Three lines at 1440 and one at 768 and 390 (327.7 of our 370, and of
  the master's 350 too). No `titleWordEms` arm; a longer artist's head is unguarded at desktop,
  as under the twins. The role line runs wider than the frame's by the seed's ", UK" (the header's
  location).
- **The empty slot** (`&noimage=1`, CONVENTIONS B): the frame draws none. The well is the frame's
  translucent 55% black, so the dot grid shows through it as the frame's own fill would let it;
  `Photo`'s violet initials (`s.muted`) all but vanished on it, so Pop's are `s.bg` white through
  `Photo`'s `ink` (undefined, and so unchanged, for the twins).
- **Inherited diffs, not Pop's**: the root's 80 / 56 / 44 top and 80 foot on the canvas against
  the masters' 56 / 60 / 24 (the published 1440 bio is 853 tall against 769), and the 390's 10
  inset against 20 — Lime's, as Editorial recorded.
- **Moved: theme 4's bio a0 alone** (three widths), against HEAD served from a scratch worktree on
  :5174; themes 0, 1, 2 and 3 at zero rows (528 renders, and the bio's 48 again after the `ink`
  prop). `PopSun` and `PopDots` have no other caller yet.
- **No live control**: `live=1` digests identical to the canvas at all three widths.
  `page-check.mjs Pop 0` publishes with no console error and no sideways scroll at 390; the bio's
  published 1440 band matches the frame.

### Settled in section 3 (the media player)

- **Retro's tree, confirmed, so Retro's body is dressed**: `964:58626` is `964:58578` node for
  node one level down (the 1440 card ys are Retro's to the hundredth), nested in `Frame 208`.
  Inside Retro's `if (s.v0)`, `const pop = s.pop` names the deltas and `s.retro || pop` the shared
  arms (the card, cover, player and disc radii); Lime's `if (s.v0 && s.limeTree)` block is
  untouched and Pop falls through it. **Only Retro and Pop reach this body now**, so its
  non-Retro arms (`s.paperFg`, `s.paper`, `s.btnR`, the plain `BookPill`) have no reader left —
  the sweep folds them with the flat family (item 3).
- **Nothing binds, and almost nothing is styled**: every string at 1440 and 768 is a raw size
  (the head's hand-scaled 82.14, the track titles' 22, the player title's 20), so trap 2 does not
  bite there. The 390 master is in Pop's mode and styles two nodes, the head (`Display/LG`, 36 at
  89%) and the track titles (`Label/LG`, 14 at 110%), which resolve in Pop's ramp — `s.dispLg` and
  `s.labelLg`. **The 768 master carries the desktop's 82.14 head unscaled** (507 × 137 in a 648
  column); it shows and reads as designed, so it is followed.
- **The deltas, off the node walker on all three masters:**
  - the card (`Frame 208`) is Scheme 3's pink `bg`, radius 50 (41 on the canvas), padded 60 /
    60 30 / 30 10 round three rows 20 apart. It fills the content box exactly, since `padX` is
    the frames' own 56 / 30 / 10, and it is a stacking context (`zIndex: 0`) for the dot grid;
  - the eyebrow is Space Mono 11 tracked 1.5 (`s.mono`) at its auto line height, Scheme 3's
    `text3` white; the head is `S3.ac` lime, uppercase, Editorial's positional two lines (the
    frame types the break after "worth" at all three widths), at `68.45 / 82.14` (`Display/LG`'s
    0.89 at 390);
  - the five cards are 647 × 92 (585.16 at 768, 288 at 390) in a 710 / 648 / 350 column, so the
    alternate indent is the slack, 63 / 62.84 / 62; their centres stand 81.69 apart on average at
    every width (the frame's hand placement runs 80.64 to 83), so they overlap by 10.31; the column
    pads 11.36 above the first and 6.89 / 5.89 under the last, the leant cards' room, so it is the
    frame's 437 / 436. The lean is Retro's sign (the first card Figma −1, CSS +1) at **±1.11 at
    768**, written out since `tilt()` is Retro's;
  - every card is filled — Scheme 1's `tag1`, `tag6`, `tag3`, `tag4`, `tag7` (lime, red, blue,
    teal, yellow) — **read off `s.onScheme[1].chips`**, all seven of the scheme's tags: `vm.chips`
    keeps `TAGS`' six seats, so the yellow is not on it. Each card is inked in the frame's raw hexes
    (`POP_TRACK_SEATS`, decision 5): Retro's `#1B1714` on the lime and the yellow, Retro's
    `#FBF6EA` on the red, white on the blue, `#161616` / `#131313` on the teal. The play disc is
    `#1B1B1B` on the light cards and white on the two dark ones, its ▶ the card's hue. No border,
    no thrown block, no grain, no cover border; the number Space Mono 18; the title on its auto 26
    line (`26 / 22`); the sub at full opacity on its auto line;
  - the player (`Left`) is **Scheme 6's** violet at 540 / 540 / 411, top-aligned (the 23 the
    content leaves at 1440 and 768 stands under the clocks), clipped to radius 40, its gaps 18 and
    4. The `<` is text (Inter 20, white), as the frame sets it. The title is Titan at 20 on 1.2,
    uppercase, `S6.text3` white; the artist and both clocks the frame's raw `#B3B3B3` at the auto
    line height; the transport the frame's "Group 2" glyph — `LimeSkip`, Lime's transcription of
    the same vectors — either side of a 48 white disc with a `#1A1A1A` ▶ (`POP_PLAYER`); the
    playhead `S6.tx` pink over the frame's 42% pink track. The disc's well is the frame's
    `#2A2A2A`, so an art-less track is a well with white initials;
  - **the clocks are Roboto Mono in the frame, Retro's too** (`964:58578`'s are Roboto Mono 10),
    and Retro's code sets its own in `s.body` at 10px unscaled: decision 5's "Retro's own clock
    face", followed — Inter 10 and Retro's 10 gap at every width;
  - the Soundcloud pill is `BookPill`'s branch box for box (5/5/5/21, the 46 × 44 disc, 189 × 54,
    `full` at 390), in Scheme 3's lime `activeBg`, its label a hand-scaled 15.77 and it and the
    disc Lime's leaked `#0D1F03` (`POP_PILL_INK`), the arrow lime.
- **The counter is not drawn**, the frame drawing none: `featured` is null under Pop and
  `FIELDS.media.countLabel`'s `in` is `{ Pop: [1, 2], '*': [0, 1, 2] }` — the `cta` row's shape —
  measured (a sentinel moves Pop's media a1 and a2 alone, Retro's a0–a2) and agreeing with
  `fieldReach`. `notes/media.md` says so. The sweep's item 8 needs nothing more for it.
- **Two stickers, both Pop-only:**
  - **the dot grid is the bio's at 0.965 across** (277.95 × 238.58: 16.19-wide dots, columns
    65.44 apart, rows as the bio's), so `PopDots` now sets `preserveAspectRatio="none"` and the
    media passes its box; teal, Scheme 3's `tag2` (`s.onScheme[3].chips[1].bg`, confirmed). It
    paints under everything in the card at −1, hung off the player in a plain relative wrapper:
    34.95 left and 39.97 above it at 1440 (the player covers all but its top row and first
    column), 8.05 / 18.67 in from its right edge and 380 / 200.51 below its top at 768 / 390 —
    the pill covers the 390 grid's last row, as the frame's does. The bio's desktop grid moved
    0.07px with the attribute (its `u()`-rounded box was 0.03% off the drawing's aspect, which
    `meet` letterboxed);
  - **the squiggle arrow is `#C6F200`**, the palette lime, by the node's own fill — **not**
    `POP_STICKER_LIME`: session 0's "every scribble and squiggle arrow is `#BCD631`" is wrong for
    this one. It is `S3.ac`, the head's lime. `POP_ARROW_D`, off the frame's `fillGeometry` in its
    209.11 × 126.41 box (the inner loop wound the other way, a hole under nonzero, as rendered),
    turned Figma −135 → CSS +135 about its centre, which the walker's box and the
    `relativeTransform` agree on: 130.09 in from the card's right edge and 112 down. **At 1440
    alone**: both narrow masters carry its desktop x (1079 / 1039 in a 768 / 390 frame), wholly
    off-frame — a leak that does not show, dropped.
- **The glyph floor is 0.13em here** (CONVENTIONS B): a lime-ink row scan put the head's ink
  centre 8.8 / 10.5 / 4.6 px below the frame's at 1180 / 768 / 390 (66 / 80.5 / 35.3 px type) —
  0.133, 0.130 and 0.130 em, at lh 0.833 and 0.89, where the hero and the bio measured 0.14. Lifted
  `top: -0.13em`, the ink lands at 90–192 against 89.1–193.4 (1180), 110–235 against 108.7–235.8
  (768) and 82–138 against 81.4–139.4 (390). The player title and the pill label sit 0–1.5 px
  off at 768, unlifted (section 1's rule). The first line runs 3.4% wide, Titan at 0.98 on this
  string, as the bio's.
- **Measured against the frame, relative to the card**: within 1 px at 1440 (× 0.82) and 2.3 px at
  768 for the card, the five card centres, the player, its disc, title, transport and clocks, the
  pill, the grid and the arrow. **At 390 the card runs 10.45 taller** (1157.45 against 1147): the
  cards are content-tall and two seeded titles wrap to three lines at `Label/LG`, so those cards
  are 97 where the frame fixes 92 and lets its own title frame overflow — a long title grows its
  card rather than clip (Lime's *a stated height is a minimum*). Everything under the stack moves
  down by it; the player's interior is the frame's to the pixel (disc 147 against 146).
- **The 390 sleeve is a wide source**: the shared track art behind `8c7fa7d8` carries grey sides,
  so the frame's `FILL` into the squashed 251 × 146 disc shows the whole picture letterboxed;
  Retro's flex disc and `Photo`'s cover reproduce it, nothing added.
- **Art-less states** (`&cj=` tracks with no image; `&noimage=1` does not reach the media): the
  sleeve is the `#2A2A2A` well with white initials; the covers' initials take the card's own ink,
  where `s.muted` violet vanished on the red and the blue. An empty list names "No tracks yet."
  under 00:00 in the player beside an empty column, as Retro's does.
- **Inherited diffs, not Pop's**: the root's `padY` 80 / 56 / 44 against the frame's 56 / 30 / 10
  (the published 1440 band is 1139 tall against 1055), as the bio recorded; the clocks' Inter at
  Retro's 10 (the bar starts 3.2 right of the frame's at 1180, 3.4 at 768).
- **Live**: the published tab at 1440 and 390, trusted clicks under
  `--autoplay-policy=no-user-gesture-required` — a card plays its track, a second click pauses it,
  the toggle resumes, next and back step, next off the fifth wraps to the first; the Pause shows on
  the card and the transport; with an address written through `st` the pill is an `https://` link
  with `target="_blank"`; `elementFromPoint` finds every control uncovered; no sideways scroll; no
  console error. Pop's cursors are live-gated (Retro's transport discs set `pointer` always).
  `page-check.mjs Pop 0`: no error or warning, the player plays, `overflow390` 0.
- **Digest**: themes 0, 1, 2 and 3 at zero rows — static, all 660 renders against the editing
  server's before-label; live, the media's 60 against its before-live label (the only section the
  live seam changed; `PopDots`' other caller is Pop's bio). Theme 4 moves media a0 at three widths
  and the bio a0 desktop grid's 0.07px. The live render differs from the
  canvas by the seam alone (the clocks, the empty bar, the `<audio>`).

### Settled in section 4 (the gallery)

- **No Pop block: Lime's `if (s.limeTree)` inside `Gallery`'s `if (s.v0)` is
  `(s.limeTree || s.pop)`**, still after the seam, so `strip`, `active`, `go`, the 390 window and
  `srcRows` are shared whole; `const pop = s.pop` names the deltas and `G` takes a fourth arm
  ahead of Editorial's. The tree is Lime's node for node at all three widths (metadata side by
  side, in traversal order, against `964:58591`), with one container Lime's lacks: the rows stand
  in `Frame 186`, a padded panel. Nothing binds; the 768 master is `Primitives → Pop`, the 390
  Pop and `Device: Mobile`, so the head's `Display/LG` (82 / 51 / 36) is `s.dispLg` — the only
  styled node. The row map was hoisted to `srcEls` so the panel can wrap it; the twins' rows are
  unchanged (the digest).
- **The deltas, off the node walker on all three masters:**
  - the **panel** is Scheme 2's lime `bg` (`S2 = s.onScheme[2]`), radius 50, padded 20, the rows
    10 apart (Lime's 5); it is `position: relative`, so it paints over the 768 asterisk's foot,
    as the frame's later sibling does;
  - the **open row** is `S2.activeBg` pink under the INNER_SHADOW 0 0 4 at .25 (Grunge's and
    Editorial's `rowOn`); its label, its unringed disc and its cross are the palette lime
    (`POP_GAL.lime`, a named literal: Scheme 2's `activeFg` is white), the glyph on the disc
    `S2.ac` pink;
  - the **closed rows** state a hidden fill and a hidden drop shadow, leaving a 1px INSIDE ring in
    `#6B32FF` round a `S2.tx` violet disc with a lime glyph; their label and plus are `#6B34FF` —
    both slips of `#6B2CFF`, followed (decision 5);
  - the **label** is a raw Chunko 13.88 (UPPER, auto line height) — not Lime's `Display/List` —
    so `faced(s, u(13.88))`, 11.17 on the canvas;
  - the **halves** are Grunge's 636 : 636, 56 apart;
  - the **head** is one tone in `s.tx` across Grunge's positional split, uppercase;
  - the **top row** is Retro's type, not Lime's Body/Eyebrow: ← Inter 14, "Back to beginning"
    Space Mono 10 tracked 1, the brand Inter Bold 11 tracked 2 over "Gallery" Space Mono 9
    tracked 2, all `s.ac` at the auto line height — a `pt()` helper in the block;
  - the **card** states radii 30, 20 and 50 on its three nested clips, so 50 draws (Lime's
    largest-wins); its shadow is 4 / 4 / 9 at **.16** (Lime's .25); its well, under the
    photograph, is Retro's `#FBF6EA` (`POP_GAL.well`), which is what an empty slot shows;
  - the **arrow discs** are `s.inactiveBg` lime (Scheme 1's idle control) in a 1px white ring at
    27% round Lime's arrow vector in `s.ac` pink; the 24 background blur is dropped over the
    opaque fill (Lime's call). The row is the frame's `Frame 184`, absolute in the card per
    master: 26 in both sides over 0–529 at 1440; **27 in and 33 from the right** over 52–581 at
    768 (followed — the master's own 6px asymmetry); 8 in and 3 from the right over −4–388 at
    390;
  - the **brackets** are Retro's `#1B1714`, at Lime's numbers (14 / 15 in, 388 down; clipped at
    390); the **strip** is Lime's mechanism in Lime's leaked glow — idle tiles a 1px
    `#A6E22E` ring at 35%, the viewer's tile the INNER_SHADOW 18 in `#A6E22E` (`effects` read:
    real), four tiles and the sliding window at 390.
- **Decision 5's two overrides, ruled here:**
  - the **eyebrow** "MEDIA" (Lime's `#F2FFD0`, its `sem/text/2`, on white) takes **`s.text3`**
    black, session 0's rule for Pop's second ink — not Lime's binding resolved in Pop's mode
    (`text/2`, violet), which would read but break the page's convention (the bio's eyebrows are
    `text3`, the media's `S3.text3`). Space Mono 11 tracked 1.5, auto line height;
  - the **counter** chip, Retro's `#111111` at 55% under `#C8461C`, is role-mapped: Pop's ink at
    the same 55% under `s.ac` — the chip's form kept, only its hues moved. Space Mono 11 tracked
    1, `0 10` padding, radius 4, desktop only (the narrow masters draw none).
- **The asterisk** (`POP_ASTERISK_D`, the frame's `fillGeometry` in its own 93 × 95.004 box) is
  `s.chips[3].bg` teal (`tag/4`, `#00E0C4` read off the DOM), turned **Figma −18.52 → CSS
  +18.52** — the planning table's −19 was rounded — and placed by the walker's
  `absoluteBoundingBox` centre, (556.66, 137.27) off the head frame's top-left. The metadata's
  x (527.66) is the turned node's origin, 30 right of its box (`figma-frame-reading`). **The 768
  master keeps the desktop's offsets** — a leak that shows and reads as designed (it stands
  right of the head and the panel covers its foot), so it is followed; the 390 master's is 497
  into a 370 frame that clips, so it is not drawn.
- **The 390 panel hugs its rows.** The master states 461 where its content comes to 437.78; the
  difference lies past the page's edge, invisible on the canvas, and a fixed 461 would strand
  the one pink row the published page shows when no address is written in a panel of empty lime.
  `srcScroll` (JP-087) holds the panel: `overflow: clip` on the canvas, a hidden-scrollbar
  scroller live, the panel `flex: none` inside it.
- **"The 390 spotlight runs 3 past the page" is the card's drop shadow** (the frame's 393-wide
  render). A `box-shadow` is ink overflow, not scrollable overflow, so nothing was clipped:
  `scrollWidth − innerWidth` is 0 in the published 390 tab, before and after the panel is
  scrolled.
- **The glyph floor is 0.14em again** (lh 0.89, the bio's): a violet-ink row scan puts the head
  at 42.3–149.3 against the frame's 41.6–149.9 (× 0.82, off the head frame's top), 51.0–132.0
  against 50.8–132.5 at 768, and 26.1–83.1 against 25.4–83.4 at 390 — the ink centre within
  0.2 px at every width. No other string is lifted (section 1's rule).
- **Measured** (harness, off the head frame's top-left, the content edge): at 1440 every box —
  the panel, the rows, the label, the discs, the asterisk (407.96, 63.55 against 407.93, 63.52),
  the card (521.16 × 441.19), the arrow discs, the counter (903.22, 354.88 against 903.64,
  354.24), the brackets, the strip — within 0.7 px of the frame × 0.82; at 768 and 390 within
  0.8 px through the panel and the top row, then **+1 px from the credit row down**: Inter
  Bold 11's line box is 14 where Figma's is 13. Inherited, not Pop's: the root's 80 / 56 / 44
  top against the masters' 56 / 30 / 20.
- **Empty slots** (`&n=0`; `&noimage=1` does not reach the gallery): the cream well under
  `Photo`'s `s.soft` with `s.tx` violet initials, in the spotlight and every tile; the ring and
  glow read on it.
- **`FIELDS.gallery` owes nothing**: no row is template-keyed, and Pop's design 0 reads
  `youtube`, `instagram` and `tiktok` (proved as links below).
- **Live** — the published tab, Pop card 0, the three addresses written through `st` before
  Publish, trusted clicks: at 1440 next steps 04 → 07 and wraps to 01, back steps, Back to
  beginning goes to 01, back from 01 wraps to 07, a thumb pick moves the glow, the spotlight and
  the counter together; at 390 the four-tile window slides past the fourth and re-anchors on the
  wrap; every control hit-tests to itself (the asterisk takes no pointer); the social rows are
  `https://` links with `target="_blank"`; the 390 scroller is 458 wide in 390, and a CDP
  finger drag scrolls it its full 68, after which TikTok is wholly on the page and hit-tests to
  its link; no console error. `page-check.mjs Pop 0`: no error or warning (the resize walk's
  included), `overflow390` 0; its gallery probe's one `false` is the viewer's own tile clicked
  again.
- **Digest**: themes 0, 1, 2 and 3 at zero rows, static and live (660 + 660 against the editing
  server's before-labels). Theme 4 moves exactly gallery a0 at three widths, both ways. Three
  theme-1 live before-files were empty renders — a Vite reload under that run when a one-off
  script landed in `source/scripts/` — and re-rendered against HEAD from a scratch worktree on
  :5174 they equal the after-files.
- `notes/gallery.md`'s "Mobile draws four of the seven" names Pop beside Retro, Lime and Grunge.

### Settled in section 5 (the repertoire)

- **No Pop block: Lime's `if (s.limeTree)` inside `Repertoire`'s `if (s.v0)` is
  `(s.limeTree || s.pop)`**, still after the seam, with `const pop = s.pop` and a fourth `G` arm ahead
  of Editorial's; the new leaves (`fieldRing`, `hintFace` / `hintSize` / `hintLh` / `hintOp`,
  `chipWeight`) fall back to the twins' values through `??` or are absent there. The tree is Lime's
  node for node at all three widths (the walker against the planning walk's LCS); the heading, the
  only styled node, is `Display/LG` in Pop's mode at every width (82 / 51 / 36 → `s.dispLg`), and the
  song titles `Display/Title` (28 / 22 / 20, a literal: `vm.title` shadows the ramp key). The seat
  is Scheme 6, so `s.bg` / `s.ac` / `s.tx` / `s.stroke1` / `s.pillBg` are violet / lime / pink /
  lime / lime, and `s.text3` white — every read checked against the render.
- **The deltas, off the node walker on all three masters** (nothing binds):
  - the **songs are pills**: each row an inset 1px `s.stroke1` ring at radius 90 (999 in CSS),
    padded 27 / 30 all round (no `calc(27 − 1px)` foot: the ring is an overlay), the rows **20
    apart** and the columns **20 apart** (Lime's 70 and flush rules gone); the number a raw Chakra
    Petch 16 at its auto line height, the title and the number Lime's leaked `#AFE335`, the info row
    4 apart, the artist a raw **Titan 16 at every width** (not `s.labelSm`, 13 / 13 / 12 under Pop)
    in `s.tx`;
  - the **search** is a `#9162FF` pill (`POP_REP.pill`; Scheme 6's `box1` is `#8451FA`) in a 1px
    inset `#A6E22E` ring at 16%, round a **solid** `#A6E22E` disc 43.56 × 41 (Lime's tile box) with
    the glyph in `s.bg`; the hint is **Space Mono 13** (`s.mono`, × 0.82 on desktop) at its auto
    line height, `s.text3` white at the node's 50% on the canvas; the live input types full white
    and its `::placeholder` keeps the .45 (Lime's accepted diff — here .05 under the frame);
  - the **chips** are Inter **Bold** 12.5 at the auto line height, padded 5 / 11: All on
    `s.pillBg` (the seat's `activeBg`, lime) under `s.bg` violet — the census's "All's `#6B2CFF`
    label" is the seat's own ground, so no literal; the idle ones `#A6E22E` at 15% under `s.ac`;
  - the **eyebrow** is a raw Inter Bold 11 tracked 1.5 at its auto line height in Lime's leaked
    `#F2FFD0` (decision 5: followed — it reads white);
  - the **head** is one tone in `s.ac`, uppercase;
  - the **10px INSIDE rule** across the root's top is `s.stroke1` lime (8.2 on the canvas), in an
    absolute layer the root's size (`inset: 0` — the block's column is unpositioned) that clips,
    as the frame's root does, and carries the heart too.
- **`Pager`'s Lime branch is `(s.limeTree || s.pop)`** with a Pop `t`: the ends `s.ac` lime
  (`endBox`) in a 1px `#F2FFD0` ring round the arrow in `s.bg`; page pills `POP_REP.pill` with
  `#AFE335` numerals; the current page filled `s.tx` pink (`onBox`) under Retro's `#FBF6EA`
  (`on`) — **the frame marks its page, so the mark is followed** (Editorial's precedent). The
  numerals are the frame's raw Anton 12 set in Pop's label face at that size (decision 5:
  `labelStyle(s, u(12))`, so `faced`). Lime's 87 / 55 × 54 boxes and 8 gap are the frame's own.
- **The census had the two stickers swapped**: the **`Union` is the pink lightning** (its own
  `#FF2DA0`, `s.tx`; the `#BCD631` children do not render) by the head, and the **heart is a
  plain `Vector` in `#00E0C4`** by the pager — read off each node's fill, and the render agrees.
  Both are unrotated paths off the frame's SVGs (`POP_BOLT_D`, `POP_HEART_D`), taking no pointer.
  - **The lightning hangs off the heading's end** (Editorial's sparkle precedent), over it, in a
    Pop-only wrapper round the `h2` that hugs the string (`alignSelf: flex-start`), so the glyph
    lift leaves it put and a longer count carries it along. **The narrow text boxes are a fixed
    305.02** at both 768 and 390 — not the string (36px Chunko cannot set "240 SONGS" at 305) — so
    the anchor is the end of Chunko's advance (5.683 em × size, the desktop box's 466 / 82) at every
    width: the sticker's left at −25 × 0.82 / −36.7 / +1.65 from it and its top −70.73 × 0.82 /
    −41.97 / −49.96 from the heading's top, 100.87 × 79.92 / 71.27 × 56.47 / 70.63 × 55.96 (each
    master scales it by hand). Titan sets "240 SONGS" **2.5% narrower** than Chunko's box (371.3
    against 382 on the canvas, 282.6 against 289.8, 199.5 against 204.6 — the digits), and the
    sticker follows the end: it lands 10.8 / 7.2 / 5.1 left of the frame's x, on the same glyphs.
  - **The heart is seated off the content's foot**, not the pager — the seeded twelve songs draw no
    pager at 1440, and the heart stays beside the list there: at 1440 60.78 in from the content's
    right edge with its foot 9 past the content's (× 0.82); **at 768 not drawn** — the master keeps
    the desktop's x (1222.78) in a 768 frame, wholly clipped by the root (a leak that does not show,
    dropped); **at 390 followed** — 2 from the page edge and its top 12 above the content's foot, so
    it runs over the → disc's lower corner and the root's clip cuts it at the section's foot, as
    the master renders it. **It hit-tests clear**: `elementFromPoint` at three points of the 390 →
    disc under the heart finds the disc, and Next steps 1 → 2 from there.
- **The glyph floor is 0.14em again** (lh 0.89; the bio's and the gallery's): a lime-ink row scan
  puts the heading at 24–70 against the frame's 23.0–69.7 (× 0.82, off the content's top), 29–64
  against 28–63 at 768 and 30–54 against 29–53 at 390 — the narrow +1 is the eyebrow's line box
  above it (Inter Bold 11 at `normal` is 14 where Figma's is 13; the gallery's +1). No other string
  is lifted.
- **A long artist is capped at 60% of its row** under Pop (`maxWidth`, ellipsis — Editorial
  layout 4's cap): the frame's rows clip their content, and the harness's synthetic artist at 390
  otherwise crushed the title to nothing and ran past the ring. The twins' flush rows keep
  `flex: none`, untouched. Re-shot at 390: row 4 reads "SONG NU…" beside "· ARTIST NUMBER 4 …",
  both inside the ring.
- **The empty list is not drawn by any frame, and `s.muted` vanished on the seat**: pink at 64% on
  the violet, about 1.4:1, invisible in the shot. Pop's "No songs match that." / "No songs yet."
  take the section's own dim ink instead, the search hint's `s.text3` white at 50% (CONVENTIONS C,
  *a twin's frame-less control is checked against its own surround*); shot live and at `n=0`. The
  twins' arm is the old `{ color: s.muted }` unchanged (theme 1's still reads Lime's pale at 64%);
  the digest cannot see it — no seeded render is empty — so the proof is the shot and the diff.
- **Measured** (harness, `n=240`, off the content's top-left): at 1440 the eyebrow, search (769.2,
  16.9, 319 × 50 against 770.0, 16.8), its disc and hint, the chips (31.3 / 68.8 × 20.2 against
  32 / 68.9 × 20.5), the rows (156.3, 535.9 × 69.5, stepping 85.9, against 156.6, 536.3 × 69.7,
  86.1), the number and title x, the pager's 45.1 / 71.3 × 44.3 and the heart (956.0 against
  956.8) within 1 px of the frame × 0.82, the pager 1.7 high (six rows' Titan line boxes); at 768
  and 390 the same within 1.4, the eyebrow's +1 carried down. Inherited, not Pop's: the root's
  80 / 56 / 44 top against the masters' 96 / 60 / 40, the 390's 10 inset against 20, and
  `pageWindow`'s six buttons at 1440 and 768 where the masters draw five (Lime's).
- **Live** (`theme=4&live=1&n=240`, three widths): Next lights page 2 and the list starts at 13
  (7 narrow); a chip re-derives the pager (20 → 7 pages at 1440, 40 → 14 narrow) and resets to
  page 1, the lit chip lime under violet and the rest the 15% tint under lime; a search with no
  match prints "No songs match that." (see the empty-list bullet) and drops the pager; the input types white Space Mono; every chip and pager button hit-tests to
  itself. `page-check.mjs Pop 0`: no console error or warning, the chips change state (All:
  false is the lit chip clicked again), `overflow390` 0; the seam clips show the lime rule under
  the white gallery at 1440 and the heart cut by the map's edge at 390.
- **Digest**: themes 0, 1, 2 and 3 at zero rows, static and live (660 + 660 against the editing
  server's before-labels, no empty render). **Theme 4 moved repertoire a0 and a1 at three widths
  and map a2 at 390, both ways** — `Pager`'s spread exactly, as under the three twins. Read:
  repertoire a1's pills (its caller's `frame.lime`) read on white; map a2's arrows read pink on
  black. Map a0 is unmoved (the seeded five gigs draw no pager) — **the map session inherits the
  Pop arm** wherever its pager draws; pass `frame.lime` if the frame's pager differs.
- **`FIELDS.repertoire` owes nothing**: no row is template-keyed.

### Settled in section 6 (the events map)

- **No Pop block: Lime's `if (s.limeTree)` inside `EventsMap`'s `if (s.v0)` is
  `(s.limeTree || s.pop)`**, after the seam, with `const pop = s.pop` and a fourth `G` arm ahead of
  Editorial's. `perPage`, `pg`, `shown`, `lit` and `onPick` are shared whole. The tree is Lime's node
  for node at all three widths (the walker, all three masters). Grunge's two pads, which Pop's
  frames state again, are hoisted (`tilePad`, `panelPad`) and shared by both arms. Every site outside
  `G` that read `ink` (`s.bg`, white here) or a `grunge || ed` branch was routed: the wrapper's
  `color` (`s.text3`), the radius label, `disp()`'s uppercase, the 390 seam clearance (`!ed && !pop`
  — Pop draws no seam). **No arc seams**: `ArcEdge` returns null off Lime, and `TornEdge`, `Grain`
  and `Tape` are gated on their own templates, so nothing lit.
- **The section stands on Scheme 1; the two cards read `s.onScheme`** — the tile `S6` (violet
  `bg`, white `text3` type) and the gig panel `S7` (red `bg`, white `text3` type). The census row was
  right but for three cells, read off the walker: the tile's raster tint is **`#FF1A1A` MULTIPLY at
  .6** (`S7.bg`, Lime's mechanism — the "tinted, read the blend" of the planning notes), the globe is
  the same red, and the date discs are **Scheme 7's `tag/5`** teal (`S7.chips[4].bg`, `#00E0C4`).
  Named literals (`POP_MAP`, decision 5: followed): the kicker's Lime `#15180F`, the tile's Retro
  `#CBB78E` 1px ring and `#EAD7B8` well, the rows' `#E41010` in Lime's hairline at the frame's 14%
  (`#15180F24`; Lime's own is 15%), the idle page pills' teal at 20%.
- **The leaves, off the walker on all three masters** (nothing binds):
  - the **tile**: radius 55 at every width (Lime's 390 is 30), padded 20 / 20 / 10 with no gap; the
    map radius **38**, 214.84 at 768 and 298 at 390, stretched at 1440 as Lime's;
  - the **foot**: the base a raw Chunko **22.71** on its auto 27 line, white, uppercase; the terms a
    raw Chakra Petch **13** in capitals at `'normal'` (Lime's Label/XS gone);
  - the **head**: the kicker a raw Inter Bold 11 tracked 1.5, **uppercase** (the node's own
    `textCase`), auto line; the heading Display/LG `s.dispLg` in `s.ac`, uppercase; the radius label
    a raw Chunko **20.39 on 23.36** in `s.tx` violet at every width (Lime's Label/LG, Grunge's
    Display/Title — neither); the head stands **82** above the cards at 1440 (Lime's 32);
  - the **panel**: radius 55, Grunge's pads (`30 20 20` at 390), its label **Space Mono 11** tracked
    1.5, white, uppercase, its head row's 1px frame unfilled (Lime's case, not drawn);
  - the **rows**: Lime's pills and pads at every width (`11 10 11 33` at 768, the master's 79 / 80);
    the venue a raw Chunko **19.57** on its auto 23 line (Lime's Display/List gone), the city line
    **Space Mono 14.22** white at the frame's 85%, the disc Lime's 56 × 57 at radius 46 with **Space
    Mono 9** tracked 0.5 and **Bold 14**, both in the panel's red.
  A `pt()` helper in the block sets each raw string (face, size × 0.82 on desktop, `'normal'` line).
- **`Pager` needed no edit**: `frame.lime` passes the frame's whole dress over the section-5 arm —
  `{ box: teal 20%, endBox: 'transparent', ring / ink / idle: white, onBox: teal, on: Retro's paper }`
  — the ends unfilled in a white ring round a white arrow, the current page teal, which is the
  census's "teal current pill where the arm fills it pink". The numerals stay the arm's Anton → label
  face at 12. Lime's `grow: !tab` is inherited (natural widths at 768, the measure at 1440 and 390,
  where the master's own five 59.6 buttons spread the same way).
- **The scribble** (`POP_MAP_SCRIBBLE_D`, off the frame's `fillGeometry` in its own 407.35 × 95.01
  box — the hero's stroke redrawn wider, not the same path) is the node's own **`#C6F200`**
  (`s.stroke2`), **not** `POP_STICKER_LIME`: the census's "every scribble is `#BCD631`" is wrong a
  second time (the media's arrow was the first). Figma −3.98 → CSS **+3.98**, turned about its own
  corner, which the `relativeTransform` places (the bounding box is 6.6 left of it):
  - **1440: off the heading's start**, (208.68, 27.91) from the text box's corner × 0.82, in a
    Pop-only wrapper round the `h2` so the glyph lift leaves it put. The trap-2 question — the frame
    crosses a Bebas 130 word whose box is 116 tall, where Pop's Chunko 82 is 73 — was answered by
    rendering it at the stated offsets: it sweeps under the tail of the Titan word and touches its
    foot, which is the page's idiom (the hero's and this frame's own 390 scribble sit under their
    heads), so it was not re-anchored. Measured: the turned box at (165.7, 47.0) 338.6 × 100.9 off
    the content's corner against the frame × 0.82 (165.7, 46.7) 338.6 × 100.9.
  - **768: not drawn.** The master keeps the desktop's numbers in a 768 frame, where the tile, its
    later sibling, covers it whole — a leak that does not show (the render agrees).
  - **390: off the radius label**, (59.06, 16.46) at 0.2662 (the master's own scale, 108.42 ×
    25.29), underlining it. That label is a raw Chunko at every width, so its box hugs the string —
    unlike the heading's, which hug a leaked Bebas word. Measured: the turned box's corner 57.3 in
    and 16.5 below the label's top, against the master's 57.31 and 16.46.
- **The heading's boxes are the leak's, so the head is shorter than the frame's**: the walker's 768
  and 390 heading boxes (329 × 72, 220 × 48) and the desktop's 528 × 116 are Bebas at 130 / 81 /
  54. Set in Pop's mode (82 / 51 / 36) the head is 36 / 26 / 15 shorter, so the cards stand that
  much higher and the desktop radius label centres on the shorter row (44.3 against the frame's
  61.5 × 0.82). Every one of those offsets is what Chunko's own 0.89 box predicts, to the pixel.
- **The glyph floor is the page's 0.14em, inherited, not measured here**: the frame sets this
  heading in Bebas, so it holds no Chunko glyph to measure against. The bio's, the gallery's and
  the repertoire's Display/LG heads (lh 0.89, Pop's mode) all measured 0.14em, so the `h2` is lifted
  `top: -0.14em` with them.
- **Two live states the frames do not draw, redrawn** (Lime's rule, checked against their own
  surround): the **lit row is Scheme 7's own active pair**, `S7.activeBg` lime under
  `S7.activeFg` black, the teal disc still reading on it; the **lit pin** the same lime in a 5px
  black ring at 16, and the **idle pin** the date disc's teal in a 3px white ring — both read on the
  red-multiplied raster. The global `a:hover { opacity: .72 }` dims a linked lit row under the
  pointer, app-wide, as Editorial recorded.
- **`gigDark` is not widened** (session 0's hand-over, closed): the block reads no `g.hue`, `mapBg`
  or `mapFg`, as under Grunge and Editorial.
- **Measured** (harness, off the content's top-left): at 1440 the kicker, the tile and panel
  (529.3 against 646 × 0.82 = 529.7), the map's 16.4 inset and 496.6 width, the panel label's
  32.7 / 16.4, the rows (79.5, stepping 89.3, the venue at 27.1), the disc (45.9 × 46.7, 16.4 from
  the row's edge) within 0.4 of the frame × 0.82; the radius label 3% wider than Chunko's (Titan at
  0.98 on this string). At 768 the tile 387 (387), map 214.8, rows 79; at 390 the tile 429.1
  (429.16), map 350 × 298, the panel's 30 top. The +1 under the kicker at 768 and 390 is Inter
  Bold 11's 14 line against Figma's 13 (the gallery's +1). Inherited, not Pop's: the root's 80 /
  56 / 44 top and 80 foot against the masters' 126 / 60 / 30 and 156 / 60 / 10; the 390 page's
  five gigs where the master draws three; no pager seeded, so the desktop cards stand 498.7 tall
  against the frame's 683 × 0.82 (Lime's "the frame's 686 less its pager" case); `pageWindow`'s
  compact `1 2 … 6`.
- **`n=0`** keeps the map at its floor beside the panel's head, as the twins do.
- **Live** (`theme=4&live=1&n=30`, trusted clicks, three widths): a row lights its pin and a pin its
  row, Next moves the teal page 1 → 2 and the list to venue 6, Prev back finds the lit gig still
  lit, linked rows are `<a>`, every click hit-tests to its target (the scribble takes no pointer),
  no sideways scroll. `page-check.mjs Pop 0`: no console error or warning, the map's six probed
  controls all change state, `overflow390` 0, and the 1440 seam clip shows the repertoire's violet
  meeting the map's white on a straight edge.
- **Digest**: themes 0, 1, 2 and 3 at zero rows, static and live (660 + 660 against the editing
  server's before-labels, no empty render). **Theme 4 moved exactly map a0 at three widths, both
  ways** — no shared helper changed. (`POP_STICKER_LIME`'s comment was corrected after the digest
  ran, in the same commit: comment-only.) The kicker's uppercase is the repertoire's eyebrow's rule.
- **`FIELDS.map` owes nothing**: no row is template-keyed, and design 0 prints every key it reads.
  `notes/map.md`'s "Retro's and Pop's body prints them" now names Pop as going through the block.

### Settled in section 7 (pricing)

- **No Pop block: Lime's `if (s.limeTree)` inside `Pricing`'s `if (s.v0)` is
  `(s.limeTree || s.pop)`**, after the seam, with `const pop = s.pop` and a fourth `G` arm ahead of
  Editorial's. `tab`, `active`, `shown` and the hoisted `chip` are shared whole, so the published
  filter needed nothing. The tree is Lime's node for node at all three widths (the walker, all
  three masters). Every leaf is a raw value, read per master; a `pt()` helper sets each raw string
  (face, size × 0.82 on desktop, `'normal'` line).
- **The cards are three seats by rendered index** (`seats` in the block, D1's *the glow is a
  seat*): the three cards are 424 × 421 at 1440 (`FILL` in the panel) and 222.67 × 447.06 at 768,
  their grounds Scheme 6's violet, 2's lime and 3's pink `bg` off `s.onScheme`, radius 50, no ring,
  no glow, no effect on any node. **Each leans Retro's angle** — Figma −1, 3, −2, which is
  `TILT`'s CSS 1, −3, 2 exactly — about its centre, written out (`tilt()` is Retro's). **At 1440
  and 768 each stands in its unrotated column** (the walker's `relativeTransform` puts every
  card's centre on its slot's); **at 390 the stack is −18 between the rotated boxes** (card 2's
  rotated top is card 1's rotated foot less 18, to the hundredth), so each gap is Retro's
  `calc(X% − 18px)`. Gaps 28 at 1440 (Lime's 44) and 20 at 768. The seat moves with the filter;
  one card on show is violet.
- **The census was wrong about card 3**: "2 and 3 inked `text2` violet" holds for card 2 (all
  `S2.tx`, its ico label Lime's raw `#BFED11`), but card 3's name, £, unit, blurb, features and
  ticks are **white** (`S3.text3`) with only its numeral and ico violet (`S3.tx`). Card 1 is
  decision 5's Retro beige `#EAD7B8` with `#D8A227` ticks, a `#ABE43B` numeral and a `#AFE335`
  ico (under `#2E3928`) and pill — named literals (`POP_PRICE`). Each pill is BookPill's Lime
  branch on the seat's pair (seat ground under the label ink: `#AFE335` / violet, violet / lime,
  violet / pink — the arrow takes the ground, the disc the label's ink, BookPill's own rule), its
  label a hand-scaled **15.77** (the media's Soundcloud size) at every width, the 390 pill full
  size and hugging (168.92).
- **Trap 2, twice:** the head is `Display/SM` → `s.dispSm` (36 / 29 / 24), one tone, uppercase,
  in a **FIXED 607.16 box at 1440 and 768** (`G.headW`, Editorial's 768 case), lifted the page's
  0.14em (inherited: the frame holds no Chunko glyph); the **768 tier names follow their style**
  — `Label/MD` → `s.labelMd` 14 at lh 1.1, where the 1440 and 390 names are an unstyled 24 in the
  display face at its auto 1.2 line (`faced(s, u(24))`). The styled node takes Pop's ramp, as the
  session-0 rule says; a raw 24 would not fit the 768 card's 183 on one line either.
- **The head is lime on white, followed** (`s.stroke2`, the node's raw `#C6F200`): judged against
  the frame's render, it reads at display size and echoes the lime card, so it is the frame's own
  call, not a defect. A designer note (open question 10).
- **The one bound paint, resolved in Pop's mode**: the small print binds `sem/text/1` (at 768 the
  node's only fill), which the frame resolves in its inherited Lime mode — Lime's accent
  `#AFE335`, the lime the render shows. That is a mode leak in decision 5's sense, so it takes
  Pop's own Scheme 1: **`s.ac` pink**, rendered and checked. The `#E4F1C4` under it at 1440 and
  390 is a covered raw fill. Space Mono 11 Regular.
- **The leaves**: chips raw Chakra Petch **Bold 12.5** at `'normal'`, padded 9 / 15, radius 56 —
  the picked one `s.tx` violet under Lime's leaked `#C7FF3C`, **not `s.pillBg`** (trap 3: black),
  the idle ones violet at 33% under violet; ico Space Mono 10, 4 / 6, radius 4; £ Space Mono Bold
  18; numeral a raw **36 at every width** on the frame's 23.34 line (not `s.dispSm`), and **it
  HUGs at 768 and 390 too** — the 390 row FILLs but its children hug — so the twins' narrow
  `flex: 1 1 auto` is gated off; unit Chakra Petch 12; blurb Chakra Petch 13 on 20; features
  Chakra Petch 13; ✓ Inter Bold 12. The price row is the frame's `MAX` counter axis, Lime's
  `flex-end`.
- **The starburst** (`POP_STAR_D`, off the frame's SVG, pink `s.ac`) is a child of the middle
  card, on the seat: Figma −3 inside the +3 card, so CSS `rotate(3deg)` and upright on the page,
  placed by its centre off the card's top-right — 36.11 in and 1.89 above at 1440, 33.33 in and
  9.47 below at 768, 35.5 in and 6.52 below at 390 (each master's own). The card does not clip
  (the frame's card 2 alone has no `clipsContent`). Measured: its centre 308.8 from the slot's
  left and 8.7 above its top at 1180 against the frame's 308.7 and 8.9 (× 0.82).
- **The rings and the 10px rule** (`POP_RINGS_D`, violet `s.tx`; the rule `tag/3` blue,
  `s.chips[2].bg`) stand in a **root-size layer that clips** (`inset: 0`, the repertoire's), ahead
  of the column, which goes `position: relative` under Pop so every card and string paints over
  the rings (the frame's later siblings). The rings hang off the content's foot-right: 32 past and
  13.08 under at 1440, 20 and 15.96 at 768 (the master's own 188.74 × 167.69), 71.87 and 40 at
  390. Measured: 26.2 past the content at 1180 (32 × 0.82).
- **The root clips sideways: `popClip`** (`s.pr && s.v0 && s.pop`, beside `grungeRule`),
  `overflow-x: clip`. The layer clipped the rings, but the published 390 page still scrolled 21:
  Chrome counts a transformed box's scrollable overflow as its whole overflow rectangle turned —
  the middle card and the burst hanging off it together — whose corner reaches 411, though the
  burst's ink ends at 386. `clip`, not `hidden`, which would make the root a scroll container.
  Retro's leant 390 deck measures 0 without it. **Open question 7 is closed**: `overflow390` 0.
- **Measured** (harness, card-local offsets — layout boxes, so the lean does not move them): at
  1440 the ico, name, £, numeral, blurb and first feature within 0.5 of the frame × 0.82; at 390
  within 1, the ✓'s box 2 narrower (Inter has no ✓; the fallback's advance). At 768 the name is
  15 against 19 (Label/MD 14 against the frame's Bebas 17) and everything under it 4 higher.
  Cards 347 × 346 at 1180 (347.7 × 345.2); 431 at 768 against the panel's FIXED 447.06,
  content-tall (Lime's call); 385 / 430 / 430 at 390 against 406 / 431 / 431, the first blurb
  one line in our 282 against the master's 262 (the inherited 10 inset). The deck stands 22
  higher than the frame's at 1180 and 16 at 390 — the head is Chunko's shorter box, not Bebas's
  (the map's case) — and 18 lower at 768, where Titan at 29 wraps "NIGHT" onto a second line of
  the 607.16 box that the frame's Bebas 40 fills in one (Titan breaks the 1440 head a word
  earlier too, "…RIGHT / FOR YOUR NIGHT").
- **Live** (`theme=4&live=1&n=8`, three widths): All / Solo / Band filter 8 → 4 → 4, the lit chip
  violet under `#C7FF3C`, every chip hit-tests to itself and every pill (`<a href="#form">`,
  cursor live) too — the layer and the burst take no pointer; `n=0` prints *No packages yet.*
  `page-check.mjs Pop 0`: no console error or warning, `overflow390` 0.
- **Digest**: themes 0, 1, 2 and 3 at zero rows, static and live (660 + 660 against the editing
  server's before-labels, no empty render), before and after `popClip`. **Theme 4 moved exactly
  pricing a0 at three widths, both ways** — no shared helper changed; `tiersSeed`'s Pop arm is
  name-gated at `d === 0`.
- **`TIERS_1` widens by name**: `tiersSeed` reads `d === 0 && (limeTreeTheme(themeName) ||
  themeName === 'Pop')`. `limeTreeTheme()` itself is untouched — `CAL_HEADING_1` and
  `FORM_BTN_1` are sections 8 and 9's to widen the same way. `notes/pricing.md` and the
  Packages field's hint say so.
- **`FIELDS.pricing` owes nothing**: no row is template-keyed.

### Inherited and used

*(Append one line each time a session leans on a bullet from Lime's, Grunge's, Editorial's or
Retro's Conventions, naming the plan it came from, a blank line between sections. The sweep folds
it into [`../CONVENTIONS.md`](../CONVENTIONS.md).)*

Session 0: *the node walker, kept* (grunge/layout-2, Conventions) — the census, 33 masters, with a
second walk locating each foreign hex; *read a fill's `scaleMode` before believing its
`imageTransform`* (grunge/layout-2, section 1) — the two `CROP`s exported at their crops, the
spotlight confirmed a centred cover off the render; *load a Google Font the frames name; substitute
only on a user call* (memory `load-figma-fonts`; grunge/layout-1, decision 1) — asked, Titan One;
*divide the face out before comparing any width* (retro/layout-2) — `faceK` 0.98, the first since
Grunge's that is not 1; *a section's colour scheme is resolved in `sectionVm`* (editorial/layout-1,
decision 3) — route A′, data only; *under Lime `pillBg` IS the accent* (lime/layout-1, session 0) —
turned round, black; *casing stays the theme's* (grunge/layout-1, session 0); *photographs are per
theme* (lime/layout-1, session 0); *the digest is committed* (lime/layout-1, session 0) — 660 + 660
renders.

Section 1: *the hero is Lime's composition node for node* (grunge/layout-1 and editorial/layout-1,
section 1) — a fourth time, no block; *the node walker, kept* (grunge/layout-2) — all three masters
with bindings; *the paired diff walk* (grunge/layout-2) — by traversal order against Lime's
`964:58588`; *check a narrow master's Device mode* (lime/layout-1, section 1) — the 390 is Tablet;
*a node can name another scheme's variable outright* / *a nested node reads `s.onScheme[n]`*
(editorial/layout-2 and -3) — the capsule on Scheme 3; *BookPill has a Lime branch* (lime/layout-1,
section 1; D1) — widened, no props but the Scheme 3 pair; *the nav's advance table, read off the
DOM* (editorial/layout-1, section 1) — `titanEms`; *a stand-in face is scaled* (`faced`,
grunge/layout-1) — × 0.98; *a stand-in face's glyph floor is measured per site* (editorial/layout-3)
— the title, 0.14em; *a head that must fit its measure is fitted to its widest word*
(editorial/layout-1) — Editorial's title fit; *a frame's inside stroke is an inset `boxShadow`*
(lime/layout-2) — the avatar's ring; *every glow is a guess until the node's `effects` confirm it*
(lime/layout-1) — turned round: the one effect is a real blur over a translucent fill, so kept;
*leaked tops are followed … a leak that reads as a defect is overridden* (lime/layout-1,
grunge/layout-1) — the 390 scribble dropped; *place a seal by its disc's centre* (lime/layout-1,
section 2); *under Lime `pillBg` IS the accent* (lime/layout-1) — turned round again: black, so
card 4's stand-in is Scheme 3's lime; *one five-theme digest is the whole proof for a shared-helper
change* (lime/layout-1, sweep) — seven helpers, static and live.

Section 2: *no block: the twin's gate widened, a named flag for the deltas* (grunge/layout-1 and
editorial/layout-1, section 2) — `(s.limeTree || s.pop)`; *the node walker, kept* (grunge/layout-2)
— all three masters, raw paints and text segments, nothing bound; *a rotated group's metadata x/y is
a bounding box* (memory `figma-frame-reading`) — the sun's 910.85 against the walker's 844.87;
*place a seal by its disc's centre, off the edges of what it hangs on* (lime/layout-1, section 2) —
the sun and the dot grid off the arch's box, the 390 off its right edge; *every glow is a guess
until the node's `effects` confirm it* (lime/layout-1) — turned round: a real drop shadow, kept at
1440 and 768; *a frame's inside stroke is an inset `boxShadow`* (lime/layout-2) — the arch's 10px
ring; *a stand-in face's glyph floor is measured per site* (editorial/layout-3) — the head, 0.14em;
*leaked tops are followed where they show* (lime/layout-1) — the 768 dot grid; *an opacity-0 node is
a spacer* (lime/layout-1, section 3) — read as the empty narrow `Layer_1`; *a seeded page cannot
show an empty slot* (lime/layout-1, sweep) — `&noimage=1`, the initials re-inked; *theme 1 is the
digest at risk in a widened block* (grunge/layout-1) — themes 0–3 at zero, against the editing
server's before-label and a HEAD worktree for theme 4.

Section 3: *a section whose live seam is hoisted above its branches can always take a block*
(lime/layout-1, section 3) — turned round: Pop dresses the body under the seam rather than taking
one, the `<audio>`, `cur` and transport shared whole; *the node walker, kept* (grunge/layout-2) —
all three masters, text segments with style names; *the paired diff walk* (grunge/layout-2) —
against Retro's `964:58578`, the card ys equal to the hundredth; *a rotated group's metadata x/y is
a bounding box* (memory `figma-frame-reading`) — the arrow placed by the walker's box and its
`relativeTransform`, and the cards' metadata ys 11.29 off their boxes; *leaked tops are followed
where they show, dropped where they don't* (lime/layout-1) — the 768 head followed, the narrow
arrow dropped; *an opacity-0 node is a spacer* / *a stated list height is a column minimum*
(lime/layout-1, section 3) — the second turned on the cards: content-tall, a three-line 390 title
grows its card; *icons the frame draws as vectors are transcribed* (lime/layout-1, section 3) —
`LimeSkip` reused, `POP_ARROW_D`; *a nested node reads `s.onScheme[n]`* (editorial/layout-2) — the
card on 3, the player on 6, the tracks on 1's seven tags; *`tilt()` is Retro's alone, so a fan
writes its angle out* (lime/layout-2, section 3) — the cards' ±1 / ±1.11 / ±2.25; *a stand-in face
is scaled* (`faced`, grunge/layout-1); *a stand-in face's glyph floor is measured per site*
(editorial/layout-3) — 0.13em here, not 0.14; *a head that must fit … Editorial's positional two
lines* (editorial/layout-1, section 3) — the typed break; *a seeded page cannot show an empty slot*
(lime/layout-1, sweep) — `&cj=` art-less tracks, the initials re-inked; *field reach is measured*
(CLAUDE.md) — `countLabel`'s Pop row; *theme 1 is the digest at risk* (grunge/layout-1) — themes
0–3 at zero against the editing server's before-label, static and live.

Section 4: *no block: the twin's gate widened, a named flag for the deltas* (grunge/layout-1 and
editorial/layout-1, section 4) — `(s.limeTree || s.pop)`; *where the seam lives inside the branch,
the block goes after the seam* (lime/layout-1, section 4); *the `G` lookup at the block's head*
(grunge/layout-1, sections 4–10) — a fourth arm; *the node walker, kept* (grunge/layout-2) — all
three masters, text segments with style names; *a rotated group's metadata x/y is a bounding box*
(memory `figma-frame-reading`) — the asterisk's 527.66 against the walker's 497.48; *nested clips:
the largest radius draws* (lime/layout-1, section 4) — 50; *leaked tops are followed where they
show, dropped where they don't* (lime/layout-1) — the 768 asterisk followed, the 390's dropped, the
brackets at Lime's numbers; *a leak that shows and reads as a defect is overridden*
(grunge/layout-1) — the eyebrow and the counter, decision 5's two; *every glow is a guess until the
node's `effects` confirm it* (lime/layout-1) — the strip's INNER_SHADOW real, the discs' blur
dropped over an opaque fill; *a nested node reads `s.onScheme[n]`* (editorial/layout-2) — the panel
on 2; *a frame's inside stroke is an inset `boxShadow`* (lime/layout-2) — the closed rows' and the
thumbs' rings; *a stand-in face is scaled* (`faced`, grunge/layout-1); *a stand-in face's glyph
floor is measured per site* (editorial/layout-3) — 0.14em; *a seeded page cannot show an empty
slot* (lime/layout-1, sweep) — `&n=0`; *key tile probes on style, not `img`* (memory
`browser-tool-choice`) — the strip's state read off its tiles' inline style; *theme 1 is the digest
at risk* (grunge/layout-1) — themes 0–3 at zero, static and live, three misfired before-files
re-rendered against HEAD.

Section 5: *no block: the twin's gate widened, a named flag for the deltas* (grunge/layout-1 and
editorial/layout-1, section 5) — `(s.limeTree || s.pop)`; *where the seam lives inside the branch, the
block goes after the seam* (lime/layout-1, section 5); *the `G` lookup at the block's head*
(grunge/layout-1) — a fourth arm, new leaves through `??`; *`Pager` has a Lime branch, `BookPill`'s
shape* (lime/layout-1, section 5; D1) — a fourth `t`; *the frame's own mark is followed* (Editorial's
pager, editorial/layout-1, section 5) — the pink current page; *the node walker, kept* (grunge/layout-2)
— all three masters with style names and modes; *a leak that does not show is dropped* (lime/layout-1)
— the 768 heart; *a stated text box is not the string* (turned on the narrow 305.02 boxes) — the
lightning anchored off the ink's end, Editorial's sparkle hung off the heading's end; *a frame's inside
stroke is an inset `boxShadow`* (lime/layout-2) — the pill rows and the search ring; *`vm.title` shadows
the ramp's `title` size* (lime/layout-1, section 6) — Display/Title as a literal; *a stand-in face is
scaled* (`faced`, grunge/layout-1) — the pager numerals; *a stand-in face's glyph floor is measured per
site* (editorial/layout-3) — 0.14em; *the artist capped at 60%* (editorial/layout-4, repertoire); *one
five-theme digest is the whole proof for a shared-helper change* (lime/layout-1, sweep) — `Pager`, static
and live; *a twin's frame-less control is checked against its own surround* (editorial/layout-3) — the
empty list re-inked; *theme 1 is the digest at risk* (grunge/layout-1) — themes 0–3 at zero.

Section 6: *no block: the twin's gate widened, a named flag for the deltas* (grunge/layout-1 and
editorial/layout-1, section 6) — `(s.limeTree || s.pop)`; *where the seam lives inside the branch, the
block goes after the seam* (lime/layout-1, section 6); *the `G` lookup at the block's head*
(grunge/layout-1) — a fourth arm, Grunge's pads shared; *the node walker, kept* (grunge/layout-2) — all
three masters with style names, blend modes and the scribble's `relativeTransform`; *a rotated group's
metadata x/y is a bounding box* (memory `figma-frame-reading`) — the scribble placed by its origin,
6.6 right of its box; *a nested node reads `s.onScheme[n]`* (editorial/layout-2) — the tile on 6, the
panel on 7; *a stated text box is not the string* (section 5, turned) — the 390 scribble anchored to
the radius label because that box does hug; *leaked tops are followed where they show, dropped where
they don't* (lime/layout-1) — the 768 scribble dropped; *Retro's live states vanish; redraw them*
(lime/layout-1, section 6) — the lit row and pins on Scheme 7's active pair; *`frame.lime` overrides the
arm* (grunge/layout-1, section 6) — the pager's whole dress; *the 390 page is five gigs*, *the compact
`pageWindow`* (lime/layout-1, section 6; D1); *a frame's inside stroke is an inset `boxShadow`*
(lime/layout-2) — the tile's tan ring, the rows' hairline; *`vm.title` shadows the ramp* (lime/layout-1,
section 6) — every Display/Title site is a raw size here anyway; *a stand-in face is scaled* (`faced`,
grunge/layout-1); *a stand-in face's glyph floor is measured per site* (editorial/layout-3) — turned:
no Chunko glyph to measure, the page's 0.14em inherited; *theme 1 is the digest at risk*
(grunge/layout-1) — themes 0–3 at zero, static and live.

Section 7: *no block: the twin's gate widened, a named flag for the deltas* (grunge/layout-1 and
editorial/layout-1, section 7) — `(s.limeTree || s.pop)`; *where the seam lives inside the branch, the
block goes after the seam* (lime/layout-1, section 7); *the `G` lookup at the block's head*
(grunge/layout-1) — a fourth arm; *the glow is a seat: rendered index `i % 3 === 1`* (D1) — the seat
carries three grounds, three inks, Retro's lean and the starburst; *the node walker, kept*
(grunge/layout-2) — all three masters with style names, `relativeTransform`s and the one bound fill;
*Figma auto-layout spaces a rotated child by its rotated bounding box — read it per master* (memory
`figma-frame-reading`) — the unrotated slot at 1440 and 768, the rotated box at 390, Retro's `calc`;
*a nested node reads `s.onScheme[n]`* (editorial/layout-2) — the cards on 6 / 2 / 3; *`BookPill` has a
Lime branch* (D1) — the seat's pair and a 15.77 `size`; *under Lime `pillBg` IS the accent*
(lime/layout-1) — turned round a third time: black, so the picked chip reads `s.tx`; *a stand-in face
is scaled* (`faced`, grunge/layout-1); *a stand-in face's glyph floor is measured per site*
(editorial/layout-3) — turned: no Chunko glyph, the page's 0.14em inherited; *emptied content drops its
node* (lime/layout-1, section 7) — kept; *theme 1 is the digest at risk* (grunge/layout-1) — themes
0–3 at zero, static and live.

## Open questions

1. ~~**Chunko Bold Demo**~~ — settled in session 0: Titan One at `faceK` 0.98.
2. ~~**Casing**~~ — settled in session 0: `'title'`.
3. ~~**Seats or literals**~~ — settled in session 0: route A′, four seats.
4. ~~**The raw leaks**~~ — settled in session 0: follow every hex; the three faces and the two
   defects overridden.
5. **The unbound variants** — worth telling the designer: ten of eleven Pop variants carry raw
   values, and the desktop page frame and several narrow masters are in Lime's mode, so the file's
   Pop mode does not drive them and three heads render in Bebas Neue at Lime's sizes. The census
   found a fourth face leak beside Anton and Roboto Mono: the 390 header's Book Now is set in
   Soulway, Retro's display face.
6. **The gallery strip** — the frame borrows four of Retro's placeholder thumbnails beside two of
   Pop's; seeded as seven distinct pictures of Pop's shoot (session 0). Worth telling the designer.
7. **The 390 pricing rings** run 52 past the page — clipped in section 7 (the root-size layer, and
   the root's `overflow-x: clip`, `popClip`, for the leant card's turned overflow); `overflow390` 0.
   Still worth telling the designer.
8. **Header cards 2–4 under Pop** — each renders at three widths and publishes (section 1). What
   each owes its layout pass:
   - **Card 2, Feature spread** (`HeaderV1`'s Retro path): the place card is `pillBg`, which is
     black under Pop, so its body is violet on black — 3.4:1, legible, not fixed; the desktop links
     wrap the Retro bar onto two rows; the seal is SealBadge's Pop arm. Pop's layout-2 header stands
     on Scheme 1.
   - **Card 3, Inset Hero** (`HeaderV2`'s Retro path): a black capsule with pink links over the
     photograph, every string legible; nothing fixed. Pop's layout-3 header stands on Scheme 1 at
     1440 and **Scheme 6 at 768 and 390** — a per-width seat.
   - **Card 4, Stacked** (`HeaderV3`'s Retro path): two fixes, `s.pop`-gated — the `mustard`
     stand-in set the kicker, the location and the avatar's border in black on the scrim, so it is
     `s.onScheme[3].ac` (lime) under Pop, the seat its own frame stands on, where `sem/text/1` and
     `sem/stroke/2` are one lime; and the seal's `hue={s.paper}` drew a white disc under the Pop
     arm's white globe and name, so Pop keeps the arm's own pink disc. Its bar is NavBar's glass
     capsule. Pop's layout-4 header stands on Scheme 3.
9. ~~**The seal's spin**~~ — decided in section 1: it spins, as every seal in the app does. The
   name and the two dots turn inside `.seal-spin` (JP-057's rule), the disc, globe and smiley stand
   still, and reduced motion stops it. A frame is a still and cannot say otherwise; the spin is the
   app's one seal behaviour, kept by Lime, Grunge and Editorial.
10. **Pricing's head is lime on white** (`#C6F200` on `#FFFFFF`, about 1.3:1) — followed in section 7,
    since it reads at display size in the frame's render; worth telling the designer. The section's
    small print binds `sem/text/1` and renders Lime's accent in the frame's inherited Lime mode;
    Pop's own mode makes it pink, which is what is drawn.
