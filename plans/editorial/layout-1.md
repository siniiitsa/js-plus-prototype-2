# Editorial layout 1 — section-by-section plan

This is the working checklist for bringing **layout 1** of the Editorial template up to its Figma
designs, the way [`../lime/layout-1.md`](../lime/layout-1.md) did for Lime and
[`../grunge/layout-1.md`](../grunge/layout-1.md) for Grunge. It runs one unit per session,
clearing context between units.

**This plan is Grunge layout 1 again, with deltas** — and Grunge's was Lime's with deltas. It does
not repeat either: the procedure, the harness, the digest and the verification are Lime's,
verbatim, with `s.lime` read as `s.editorial` and `theme=1` as `theme=3`. What is written here is
only what differs, and what differs most is that **Editorial is the first light page**: paper,
taupe and ink bands, where Lime and Grunge are dark pages with a band or two.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then
- [`../CONVENTIONS.md`](../CONVENTIONS.md), groups **A, B, C and D1** (*What this pass actually
  is* says why), and the bullets they point at
- the section's *Settled in section N* bullets in **both** [`../lime/layout-1.md`](../lime/layout-1.md)
  and [`../grunge/layout-1.md`](../grunge/layout-1.md) — the block you are widening, and the one
  widening of it already done
- the *Per-session procedure* of [`../lime/layout-1.md`](../lime/layout-1.md)

Then the memory notes `figma-frame-reading`, `verifying-the-published-tab` and
`browser-tool-choice`. `SPEC.md` lives in git history: `git show 8fa8ff4:SPEC.md`.

Branch: **`editorial-layout-1`**, forked from `main`.

## What the pass must deliver

1. **Every section works in the published tab under Editorial**: every control CLAUDE.md lists
   under *`s.live` is false everywhere except the published tab*.
2. **Every section looks as close to its Figma frame as possible**, at 1440 (× 0.82 onto the
   1180 canvas), 768 and 390.
3. **Editorial's template card** on the picker — the big preview and its filmstrip thumbnail — is
   a live `HeaderV0`, not the flattened still it is today (`TEMPLATE_STILLS.Editorial`).
4. **The setup modal** shows **four** Editorial cards. Card 1 is the fitted Hero; cards 2–4 only
   need to render and publish in this pass (Lime's rule; see *The header, and the four cards*).

## What this pass actually is

**Editorial's layout 1 is the fourth variant of the same eleven Figma component sets as Retro's,
Lime's and Grunge's.** The evidence, read at planning time (2026-09-24):

- Retro's page is instances `964:58576`…`86`, Lime's `…58588`…`98`, Grunge's `…58600`…`10`,
  Editorial's **`964:58612`…`964:58622`**: the same composition names in the same order, ids +12
  from Grunge.
- Each is an instance of the **`Theme=Editorial` variant** of the component set the other three
  instantiate (the header's `446:452` in set `446:456`, beside `Theme=Retro` `446:455`,
  `Theme=Lime` `446:453` and `Theme=Grunge` `446:454`; the footer's `Property 1=editorial`
  `907:11924` in set `907:11829`). Every instance carries `1 · Primitives` → **Sienna Vale**.
- **A correction to the earlier plans' wording.** "The same component in another mode" is loose:
  each template is its *own variant* of a set, so the node ids inside differ
  (`I964:58612;446:345…` against Lime's `I964:58588;622:4582…`) and a diff keyed on id finds
  nothing in common. Compare trees **in traversal order** — CONVENTIONS A's *paired diff walk*,
  which is what Grunge's sessions did.

The trees, compared at planning time as the longest common subsequence of every visible node's
`(depth, type, name)`, desktop:

| Section | Editorial nodes | LCS with Retro / Lime / Grunge | Nearest | What only Editorial draws |
|---|---|---|---|---|
| header | 44 | 38 / 39 / **40** | Grunge (Lime by one) | two sparkle vectors, the wordmark's own text |
| bio | 24 | 17 / **20 / 20** | Lime = Grunge | the seal `Frame 179` (a sparkle, two `TEXT_PATH` names) |
| media | 79 | 53 / 54 / **75** | **Grunge** | the polaroid `Frame 209`, the tape `Frame 210`, a Soundcloud label |
| gallery | 70 | **68 / 68 / 68** | all three | the tape |
| repertoire | 110 | **108 / 108 / 108** | all three | the sparkle beside the head |
| map | 73 | 54 / 70 / **71** | Grunge (Lime by one) | the tape |
| pricing | 103 | 92 / **102 / 102** | Lime = Grunge | — |
| calendar | 103 | 100 / **101 / 101** | Lime = Grunge | the tape |
| form | 61 | 53 / 58 / **60** | Grunge | — |
| testimonials | 19 | 18 / **19 / 19** | Lime = Grunge | — |
| footer | 35 | 26 / **29 / 29** | Lime = Grunge | the seal, the wordmark's sparkle |

So, as under Grunge: **no Editorial-only branches.** The work is Editorial decoration inside
**Lime's layout-1 blocks**, widened to take a third template (decision 2), after a session 0 that
makes `THEMES[3]` carry Sienna Vale. A section whose tree turns out not to be the twins' is the
exception; record it under *Conventions* before branching.

**Inheritance** ([`../CONVENTIONS.md`](../CONVENTIONS.md)): **A** and **B** always; **C**, since
this is another variable mode of a page already fitted; **D1**, since its blocks are Lime's
layout-1 blocks, widened as Grunge widened them. Not D2–D4 — those are later passes'. Keep the
running *Inherited and used* list below; the sweep folds it into that file.

**The mode is called "Sienna Vale", not "Editorial".** Nothing in the Figma file says Editorial.
The template's name in the app (`THEMES[3].name`, the folder, the `s.editorial` flag) stays
Editorial; "Sienna Vale" is also the frames' mock artist name, which is copy and not ours.

## The Figma source

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Frame 268 | `964:58611` | 1440 × 9615.1 |
| Tablet | Frame 276 | `986:48237` | 768 × 11778.5 |
| Mobile | Frame 277 | `986:48250` | 390 × 10719.3 |

- Desktop: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=964-58611&m=dev>
- Tablet: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=986-48237&m=dev>
- Mobile: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=986-48250&m=dev>

`fileKey` = `uFoUbPaBrDicjyuSBEbtGT`. All three sit on the page **Layout 1** (`964:58571`).
Editorial's other layout pages exist, which is what the four-card family below rests on (each
found by the `Primitives` mode of its sections, not by name):

| Page | Desktop | Tablet | Mobile |
|---|---|---|---|
| Layout 2 (`964:58572`) | `964:64598` (Frame 252) | `986:15657` | `986:15676` |
| Layout 3 (`964:58573`) | `964:68717` (Frame 258) | `984:16811` | `984:16842` |
| Layout 4 (`964:58574`) | `964:73037` (Frame 263) | `971:9537` | `977:13155` |

**Match on node id and width, never on the name** — Lime's and Grunge's list, a third time:
- The 390 gallery (`989:22410`) and the 390 testimonials (`986:48260`) are both called "— Tablet".
- The booking calendar is called "— Desktop" at all three widths, and so are the 768 and 390
  footers ("Component 3" / "Component 4").
- The media player's 768 master sits inside a wrapper frame (`986:48240`, "Frame 272"), which
  sets **Scheme 2** itself.
- The testimonials master is **730 tall at every width**. Read its render before trusting it.
- The mobile page renders **412** wide, not 390: something runs 22px past its right edge — the
  390 gallery's source row, which the section already wraps (CLAUDE.md, the gallery).

**The desktop page frame is set to `Primitives → Lime`** (the narrow page frames are Sienna
Vale). Every instance overrides, so read a *section* node, never the page.

## The sections

Session 0 first, then eleven sections in page order. Each row's three masters are one session.

| # | Cat | Desktop node | Composition | Size | Tablet node | Size | Mobile node | Size | Scheme | Lime twin | Grunge twin | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | *foundation* | `964:58611` *(page)* | Sienna Vale → `THEMES[3]`, face, ramp, schemes, flags, photos | — | `986:48237` | — | `986:48250` | — | — | — | — | done `0ac93b2` · `2297e8c` |
| 1 | `header` | `964:58612` | Headers — hero | 1440 × 750 | `986:48238` | 768 × 1024 | `986:48251` | 390 × 844 | 3 | `964:58588` | `964:58600` | done `e47847d` |
| 2 | `bio` | `964:58613` | Bios — A · Flanked portrait | 1440 × 769 | `986:48239` | 768 × 1135 | `986:48252` | 390 × 731 | 1 | `964:58589` | `964:58601` | done `28b668c` |
| 3 | `media` | `964:58614` | Media Player — D · Floating cards stack | 1440 × 1140.2 | `986:48241` *(in `986:48240`)* | 768 × 1629.6 | `986:48253` | 390 × 1211.8 | 2 | `964:58590` | `964:58602` | done `83c499b` |
| 4 | `gallery` | `964:58615` | Gallery Sections — Component 1 | 1440 × 818 | `986:48242` | 768 × 1123 | `989:22410` | 390 × 791.7 | 1 | `964:58591` | `964:58603` | done `1f4b606` |
| 5 | `repertoire` | `964:58616` | Repertoire — A · Two-column dense | 1440 × 1055 | `986:48243` | 768 × 897 | `986:48255` | 390 × 896 | 3 | `964:58592` | `964:58604` | done `f4e8f0a` |
| 6 | `map` | `964:58617` | Events Map — D · Compact tile | 1440 × 1191.2 | `986:48244` | 768 × 1308.6 | `986:48256` | 390 × 1132.5 | 1 | `964:58593` | `964:58605` | done `5f9fa4e` |
| 7 | `pricing` | `964:58618` | Pricing — B · 3-col in soft panel | 1440 × 880 | `986:48245` | 768 × 793 | `986:48257` | 390 × 1486 | 2 | `964:58594` | `964:58606` | done `73e7307` |
| 8 | `calendar` | `964:58619` | Booking Calendar — A · Scheduler | 1440 × 911 | `986:48246` | 768 × 1371 | `986:48258` | 390 × 995 | 1 | `964:58595` | `964:58607` | done `7ed5a57` |
| 9 | `form` | `964:58620` | Enquiry Forms — B · Split context+form | 1440 × 891 | `986:48247` | 768 × 1075 | `986:48259` | 390 × 1165 | 3 | `964:58596` | `964:58608` | done `8c540f2` |
| 10 | `testimonials` | `964:58621` | Testimonials H — Stacked tag card | 1440 × 730 | `986:48248` | 768 × 730 | `986:48260` | 390 × 730 | 1 | `964:58597` | `964:58609` | done `3f61ffe` |
| 11 | `footer` | `964:58622` | Footer — Component 2 / 3 / 4 | 1440 × 479.7 | `986:48249` | 768 × 692.3 | `986:48261` | 390 × 736.3 | 3 | `964:58598` | `964:58610` | todo |

Both twins' fit comments in `EncoreSection.jsx` cite their node ids; grep for either to find the
branch and its block. **Re-measure from the Editorial frame; never reuse Lime's or Grunge's block
sizes** — media is 1140 tall here against Grunge's 1253, the narrow footers 692 / 736 against
647 / 619.

**Read both arms of a widened block before writing a third.** Media, map and form are *Grunge's*
tree (the polaroid mount round the media card, for one, is Grunge's `Frame 211` re-inked); the
others are Lime's and Grunge's alike, and Grunge's arm is the one that already solved "a second
template in this block". Where Editorial's frame draws exactly what one of them draws, share that
arm rather than copying it.

## What already works, and what doesn't

Editorial is one of the flat two today. At `arch 0`:

| Section | Renders under Editorial | Published-tab controls |
|---|---|---|
| **header** | `FlatHeader` v0, **not** `HeaderV0` | **Broken**, as Lime's and Grunge's were: `FlatNav` hardcodes Music / Shows / Book on ids no section has, ignores `navLinks`, `navHref`, `s.live` and the burger, and its CTAs are `<span>`s. |
| the other ten | `s.v0`, flat, in the three-colour palette, Playfair Display over Lora, **initials placeholders for every photograph** | wired — every control is shared `v0` code |

So goal 1 is met in full by the header session, and every section session still runs
`theme=3&live=1` for Lime's two reasons: a decoration layer can cover a control (here a tape strip
over a gallery arrow, a seal over a link column), and a live **state** can stop reading — here the
risk is **light on light**: blush `#E6B6A0` and paper `#F6F0E8` chips on a paper ground, outlined
idle states on taupe (Scheme 2's `inactive/bg` is transparent), and a lit row on the terracotta
gig panel.

The picker shows Editorial as a **still** (`TEMPLATE_STILLS.Editorial` = `editorial-header.jpg`, a
flattened render of `964:58612` in Figma's mock copy; the `if (still)` short-circuit in
`TemplatePreview`). The header session deletes the entry and the file; `TEMPLATE_STILLS` is then
Pop's alone.

`palette` is already right — `['#F6F0E8', '#C86E52', '#141414']` is Scheme 1's `bg` / `text1` /
`text2`. What is wrong in `THEMES[3]` today, against the mode: the faces (Playfair Display / Lora /
Lora — the mode names Fisterra Fora ×2 / Chakra Petch / Inter), no `ui`, `dls` `-0.01em` (0),
`radius` / `radiusSm` / `btnR` `2px` ×3 (16 / 6 / 999), `bw` 1.5 (2), no `radiusChip` (6), a
four-hue `tags`, no `sem`.

## Editorial's Figma mode — Sienna Vale

Read at planning time with `use_figma` (`figma.variables.getLocalVariablesAsync()`, the
`1 · Primitives` collection, mode `187:5`), Lime's method. The four collections are as Lime's plan
describes them; `2 · Scheme` has nine modes, and in Sienna Vale **Schemes 6–9 are Schemes 1–4 byte
for byte**.

| Token | Retro | Lime | Static Youth | **Sienna Vale** | `THEMES` key |
|---|---|---|---|---|---|
| `font/display` / `label` / `ui` / `body` | Soulway / Anton / Inter / Inter | Bebas Neue ×2 / Chakra Petch / Inter | Stones Crush ×2 / Chakra Petch / Inter | **FONTSPRING DEMO - Fisterra Fora** ×2 / Chakra Petch / Inter | `display` / `label` / `ui` / `body` |
| `font-style/display` / `label` | Regular | Regular | Regular | **Bold** *(token only — trap 4)* | |
| `size/display-xl` / `-lg` / `-md` / `-sm` | 128 / 96 / 48 / 40 | 200 / 130 / 72 / 50 | 198 / 130 / 72 / 50 | **179 / 118 / 64 / 45** | ramp |
| `size/title` / `list` | 24 / 16 | 36 / 24 | 36 / 24 | **32** / 24 | |
| `size/label-lg` / `-md` / `-sm` / `-xs` | 24 / 20 / 16 / 20 | 32 / 24 / 18 / 20 | 24 / 20 / 16 / 20 | 24 / 20 / 16 / 20 | |
| `size/body-lg` / `-md` / `-sm`, `chip`, `eyebrow` | 16 / 14 / 12, 12, 15 | 16 / 14 / 13, 13, 15 | 16 / 14 / 12, 12, 15 | 16 / 14 / 12, 12, 15 | |
| tablet (xl lg md sm · title list · lLg lMd lSm lXs · bLg bMd bSm · chip eyebrow) | 77 60 38 32 · 19 12 · … | 120 81 50 40 · 28 19 · 21 17 14 14 · 15 13 13 · 12 12 | 95 81 50 40 · 28 19 · 16 14 13 14 · 15 13 12 · 11 12 | **107 73 45 36 · 25** 19 · 16 14 13 14 · 15 13 12 · 11 12 | |
| mobile, same order | 48 40 30 26 · 18 13 · … | 72 54 40 32 · 26 18 · 14 13 12 12 · 15 13 12 · 11 11 | 52 46 38 30 · 26 18 · 14 13 12 12 · 15 13 12 · 11 11 | **64 48 36 30 · 23** 18 · 14 13 12 12 · 15 13 12 · 11 11 | |
| `radius/card` / `control` / `chip` / `pill` (`sharp` 0) | 20 / 14 / 8 / 999 | 26 / 13 / 6 / 999 | 8 / 8 / 4 / 999 | **16 / 6 / 6** / 999 | `radius` / `radiusSm` / `radiusChip` / `btnR` |
| `border/hairline` / `thin` / `default` / `heavy` | 1 / 2 / 3 / 5 | 1 / 2 / 3 / 3 | 1 / 2 / 3 / 3 | 1 / 2 / 3 / 3 | `bw` is `border/thin` |
| letter spacing, line heights | | | 0; Lime's | 0 on every style; Lime's line heights (xl .75, lg .89, md / sm 1, title and labels 1.1, list and label-lg 1.2) | `dls` |

Bold marks where Sienna Vale leaves Static Youth: the display rows and `title` only. Everything
from `list` down is Grunge's cell for cell. `THEME_RAMP.Editorial` is therefore Grunge's row with
the display and title cells changed — but type it from this table. Desktop at × 0.82 rounded, as
Lime's and Grunge's are: `dispXl 147`, `dispLg 97`, `dispMd 52`, `dispSm 37`, `title 26`, and the
rest Grunge's (`list 20`, `labelLg 20`, `labelMd 16`, `labelSm 13`, `labelXs 16`, `bodyLg 13`,
`bodyMd 11`, `bodySm 10`, `chip 10`, `eyebrow 12`).

**The schemes**, Sienna Vale's values. Schemes 1–3 are the page's; 4 and 5 stand on no layout-1
section and are here for the later passes.

| | **Scheme 1** (≡ 6) · paper | **Scheme 2** (≡ 7) · taupe | **Scheme 3** (≡ 8) · ink | Scheme 4 (≡ 9) · terracotta | Scheme 5 · blush |
|---|---|---|---|---|---|
| `bg` | `#F6F0E8` | `#AA958A` | `#141414` | `#C86E52` | `#E6B6A0` |
| `text1` / `text2` / `text3` | `#C86E52` / `#141414` / `#141414` | `#F6F0E8` / `#141414` / `#141414` | `#C86E52` / `#F6F0E8` / `#F6F0E8` | `#F6F0E8` / `#141414` / `#141414` | `#141414` / `#F6F0E8` / `#F6F0E8` |
| `box1` / `box2` / `box3` | `#FFF9F2` / `#EDE6DC` / `#141414` | `#BAA499` / `#D0BCB2` / `#A18A7E` | `#1D1D1D` / `#2A2A2A` / `#0E0E0E` | `#DA7C5E` / `#EF9173` / `#BE6346` | `#F7C7B1` / `#FFD9C7` / `#D8A994` |
| `active` bg / text | `#C86E52` / `#F6F0E8` | `#E6B6A0` / `#141414` | `#C86E52` / `#F6F0E8` | `#141414` / `#C86E52` | `#000000` / `#C86E52` |
| `inactive` bg / text / border | `#F6F0E8` / `#C86E52` / `#141414` | **transparent** / `#F6F0E8` / `#F6F0E8` | **transparent** / `#F6F0E8` / `#F6F0E8` | transparent / `#F6F0E8` / `#F6F0E8` | transparent / `#F6F0E8` / `#F6F0E8` 56% |
| `stroke1` / `stroke2` | **`#141414`** (opaque) / `#C86E52` | `#F6F0E8` / `#E6B6A0` | `#F6F0E8` 56% / `#E6B6A0` | `#F6F0E8` 56% / `#141414` | `#C86E52` / `#141414` |
| `glow` | `#C86E52` | `#E6B6A0` | `#C86E52` | `#C86E52` | `#C86E52` |
| `tag1` / `tag2` bg·text (3…7 alternate the same two) | `#E6B6A0`·`#141414` / `#C86E52`·`#F6F0E8` | `#F6F0E8`·`#141414` / `#E6B6A0`·`#141414` | `#F6F0E8`·`#141414` / `#C86E52`·`#F6F0E8` | `#EF9173`·`#141414` / `#141414`·`#C86E52` | `#C86E52`·`#141414` / `#000000`·`#C86E52` |
| `hl1…3/text` | `#141414` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |

**Who stands on what** (`explicitVariableModes`, identical at all three widths):

| Scheme | Sections |
|---|---|
| **1** · paper | bio, gallery, map, calendar, testimonials |
| **2** · taupe | **media**, **pricing** (and the 768 media's wrapper `986:48240`) |
| **3** · ink | **header**, **repertoire**, **form**, **footer** |
| 1, nested | pricing's three Book Now pills (`Frame`, 193 × 54 / 170 × 54 / 165 × 54) — the page's **only** nested override: `sem/box/3` fill → `#141414`, `sem/text/1` type → `#C86E52`, `sem/tag/1/bg` disc → `#E6B6A0`, the arrow `sem/box/3`. Under Scheme 2 the same bindings would paint `#A18A7E` / `#F6F0E8`. |

Grunge's variants carried Scheme-4 overrides on the header's ellipses, two gallery frames and the
testimonials card (no-ops there, Scheme 4 ≡ 1); **Editorial's variants carry none** — a walk of
every node at all three widths found only the pricing pills. Scheme 4 here is terracotta, so a
session that finds one after all must not assume it is a no-op.

Five traps in those tables:

1. **Scheme 1's `stroke1` is opaque `#141414`**, not a 15% hairline. A Lime block reading
   `s.stroke1` for a faint rule draws a full-black one under Editorial — which is what the frames
   draw (the dashed rules on paper are black). Check the render before "fixing" it.
2. **Scheme 2's accent is paper.** `text1` is `#F6F0E8`, so the media and pricing heads are paper
   on taupe, and the active pair is blush under black ink. `legible()` and every `acFg` reader
   compute against it — read the render.
3. **Scheme 2's and 3's `inactive/bg` is transparent.** An idle chip or pill there is an outline
   only, and a Lime block that fills its idle state with `s.inactiveBg` must read the alpha.
4. **`font-style/display` and `/label` state Bold, and every ramp-sized node renders Regular** —
   179, 118, 64, 45, 32, 24, 20 and 16, header to footer; the token is unbound and the render
   wins. Bold appears at exactly **three hand-scaled sites**: the form's statement (50.36 px on a
   42.75 px line), the testimonials' quote (57.84 / 52.42) and the footer's statement
   (57.84 / 47.9) — fractional sizes, pixel line heights, three different ratios. *A hand-scaled
   instance is not the ramp* (Lime layout 2, the bio).
5. **The demo face drops glyphs.** A Fontspring demo substitutes a "DEMO" mark for `'`, `&`, `"`
   and their like — visible in the renders as "THAT'S", "ECHO & THE FLOOR", "DON'T STOP ME NOW",
   "EARTH, WIND & FIRE" and the 390 quote marks. The designer patched some by hand: the form's and
   the testimonials' `'` and `"` are **Playfair Display Bold** (the footer's is "Playfair Bold").
   A glyph that reads as an ornament is punctuation; never transcribe it as decoration.

## The decisions this plan makes or hands over

### 1. Fisterra Fora is a Fontspring demo — **settled: answer B, Noto Serif Display at wdth 62.5**

*Settled in session 0 (2026-09-24):* the user chose a free substitute and delegated the pick
("you pick"). It is **Noto Serif Display, pinned to wdth 62.5 and wght 540–700**, with `faceK` 1 —
see *Conventions → Settled in session 0* for the measurements. The rest of this heading is kept as
the record of the question.

`fonts.googleapis.com/css2?family=Fisterra+Fora` answers 400, and the family's own name says the
frames were drawn under a **demo licence**. What the frames show, for the user: a condensed,
high-contrast display serif with swash tails (the R, the Q), **caps-only** — every string set in
it renders capitals whatever was typed ("Sienna Vale", "Let's make", "Book Now" all carry
`textCase` ORIGINAL) — used at Regular on every ramp size and Bold at three sites (trap 4), and
missing its punctuation (trap 5). The frames' own patch face is **Playfair Display**, which is
also `THEMES[3].display` today. Grunge's decision 1 table, with this face's facts:

| Answer | `display` / `label` | `casing` |
|---|---|---|
| **A. Licensed; the user supplies the `.woff2`** | Grunge's row A verbatim (self-host in `source/src/builder/fonts/`, `@font-face` in `src/index.css`, `preview.html`, the popup's cloned styles, `vite-plugin-singlefile` inlining, the size in the sweep) — **for both Regular and Bold**, and check the licensed face carries `'` `"` `&`, which the demo does not. | `'title'`, the face doing the capitals — Lime's answer; Chakra Petch and Inter stay mixed ("Sold Out", "Full name", "Reviewed 6 days ago"). |
| **B. Substitute a free Google face** | The user names it or delegates ("pick the closest" was Grunge's). Judge candidates on a render beside the frame, not by name: it must have a Regular (a Bold for the three statements is optional — the same weight will do), `'` and `"`, and a high-contrast display cut. Playfair Display is the first to render, being the designer's own patch face and already loaded. Load it in `index.html` **and** `preview.html`. | If it has a lowercase, `'title'` and a per-site `textTransform: 'uppercase'` (Grunge's rule, CONVENTIONS C). |

Either way, before section 1:

- **`faced()` / `facedLh()` become per-template.** Today they are `s.grunge`-gated with a module
  constant `FACE_K = 0.75`. Move the constant into the vm (`vm.faceK`, 0.75 under Grunge, 1
  elsewhere) as a pure refactor, and **keep the identity branch** (`s.faceK === 1 ? size : …`),
  or a string size gains a `calc(… * 1)` and every theme's digest moves. Editorial's `faceK` is
  the chosen face's glyph size against Fisterra Fora's, measured Grunge's way (section 1: cap
  height and an uppercased string's width off the render against canvas `measureText`, the two
  agreeing to 2%). `labelStyle`, `Title` and the Grunge `Wordmark` apply `faced` centrally, so a
  `faceK` other than 1 moves every label under Editorial, the placeholder layouts 2–4 included —
  expected, theme 3 only.
- **The nav fit needs the face's advance table** (`navFace` in `sectionVm`, `EncoreBuilder.jsx`
  ~527: `bebasEms` for Lime, `antonEms(x, 0) * 0.75` for Grunge), measured on the uppercased
  labels with canvas `measureText` — unless the chosen face already has one.

Do **not** start section 1 in a fallback face: every width the pass measures is the face's.

### 2. The fourth flag — **decided: `s.editorial`, one named group flag, per-site widening**

Grunge's decision 2 named this plan as the moment to revisit its idiom ("Revisit `s.deco` only if
Editorial's plan finds the three-flag idiom breaking down"). It bends rather than breaks: the eleven
layout-1 blocks and the shared helpers they call (`NavBar`, `BookPill`, `TagChips`, `SealBadge`,
`Pager`, `Wordmark`, `LogoMark`, `Photo`'s backdrop) are gated `(s.lime || s.grunge)` today, and a
third name spelled out at each of them is noise. So:

- **`s.editorial: T.name === 'Editorial'`**, beside `retro`, `lime` and `grunge` in `sectionVm`,
  for what only Editorial draws.
- **`s.limeTree = lime || grunge || editorial`** — "the templates whose layout-1 page is Lime's
  component tree" — introduced in session 0 **with no reader**, so it moves nothing. Each section
  session then replaces its own block's `(s.lime || s.grunge)` with `s.limeTree` once its frame
  says Editorial shares it, and names Editorial's deltas inside: a `const ed = s.editorial` and
  arms, or a third arm in the block's `G` lookup (`s.editorial ? {…} : s.grunge ? {…} : {Lime's
  literals}`), whose Lime and Grunge arms stay byte-identical. A site Editorial does not share
  stays `(s.lime || s.grunge)`; the sweep lists every one left, with why.
- **Not a blanket rename.** Renaming every `(s.lime || s.grunge)` and then adding `|| editorial`
  would switch every Lime block on under Editorial at once — Lime's literals included, acid lime
  on paper — in blocks no session had read. That is Grunge's *widen per site, from the frame, never
  by grep*. The layout-2–4 blocks keep their pair; they are later passes'.
- **`s.designed` widens to Editorial** in session 0's second commit. Its readers are the
  full-bleed hero (inert until the header session, since `bleed` also wants `!s.flatHeader`),
  `TagChips`' designed branch, and `vm.mapSrc` / `mapRadialSrc` — all three drawn by Editorial's
  frames (the map raster is hash `8cd103b8`, the other three templates' again).
- **Themes 1 and 2 are both at risk now.** Every widened block is one Lime *and* Grunge render,
  so the digest is **themes 0, 1, 2 and 4 at zero rows**, every session.
- **Widening a shared helper moves Editorial's placeholder layouts too.** `NavBar`, `BookPill`,
  `Pager`, `SealBadge`, `TagChips` and `Wordmark` are called from every layout, so the session that
  widens one switches its Lime branch on under Editorial's cards 2–4 as well — Grunge's *moved with
  the shared helpers, theme 2 only* (its section 1). Expected, theme 3 only: record which layouts
  moved rather than chasing it as a regression.

### 3. Six sections stand on another scheme — **settled: route A, resolved in `sectionVm`**

*Settled in session 0 (2026-09-24):* the user chose route A. `THEMES[3].schemes` carries Schemes 2
and 3, `SCHEMES_OF.Editorial[0]` seats the six sections, and `sectionVm` lays the scheme over the
theme at its head — see *Conventions → Settled in session 0*. The rest of this heading is kept as
the record of the question.

Lime's and Grunge's rule for a section off Scheme 1 is named literals behind the flag (CONVENTIONS
C, *a section on another scheme writes that scheme's values as named literals*). Lime had one such
section on its page; Grunge four, whose Scheme 2 differs from Scheme 1 only in its grounds
(`#171716`, `#000000`, `#222222`). Editorial has **six**, and four of them stand on the other end
of the palette: `THEMES[3].sem` is Scheme 1, paper, so in the ink sections every `s.bg`, `s.tx`,
`s.box1`, `s.stroke1`, `s.inactiveLine` and `s.pillBg` a Lime block reads would be paper's. An
Editorial arm that restates nearly every leaf is a copy of the block — four times for ink (header,
repertoire, form, footer) and twice for taupe (media, pricing).

**Which sections are hard depends on the route.** Lime's layout-1 blocks were written for a dark
ground under pale type and a bright accent. Under route A that is exactly what Scheme 3 hands
them, so **the ink sections are Lime's own register** and the least work; the **five paper
sections** (bio, gallery, map, calendar, testimonials) are where Lime's assumptions break — a light
ground, ink type, a mid-tone accent — and there the nearer start is whatever arm already solved
*this block on a pale ground*: Lime's own light band (`limeLight`, its map and form on Scheme 4
`#F2FFD0` with the ink turned round) where it exists, before Grunge's.

- **Route A (recommended): the section's scheme, resolved in `sectionVm`.** `THEMES[3]` gains a
  `schemes` object — `{ 2: { palette, sem, tags }, 3: { … } }`, each in the shape Scheme 1 already
  has — and `data.js` a map of which scheme each section stands on, per template and layout
  (`SCHEMES_OF.Editorial[0] = { header: 3, media: 2, repertoire: 3, pricing: 2, form: 3, footer: 3
  }`; a section with no row stands on Scheme 1). `sectionVm` resolves it where it reads the palette
  today — `const [bg, ac, tx] = T.palette` at its head, and `T.sem` / `T.tags` below — so every
  derived key (`muted`, `line`, `paper`, `pillBg` / `pillFg`, `legible()`, `vm.chips`, the sem keys)
  follows, and **the root needs no Editorial flag**: it already paints `s.bg` under `color: s.tx`
  when no other flag claims the section. Only a theme carrying `schemes` moves, so themes 0, 1, 2
  and 4 digest to zero by construction. What it costs: CLAUDE.md's "Colours are not per-section:
  every section renders in the active theme's single `palette`" becomes "…unless its frames stand
  the section on another scheme", documented in the sweep; later Editorial passes fill
  `SCHEMES_OF.Editorial[1…3]` from their own walks; layout 3's composed row, which puts two sections
  in one row, is that pass's to check. And **`s.bg` stops meaning "the page behind this section"**
  and becomes the section's own ground — inert on layout 1, which has no seams and no bleed but the
  header's, but the layout-4 tears and `Photo`'s backdrop read `s.bg` as a neighbour's colour, a
  later pass's trap the sweep records. One-off nodes on another scheme — the pricing pills — stay
  named literals.
- **Route B: the precedent.** Named Scheme-2 and Scheme-3 literal sets per section, an
  `editorialBand` root expression beside `grungeBand` that flips both `background` and `color`, and
  an Editorial arm in each block restating the leaves.

Session 0 asks this beside decision 1. Everything below is written for route A; where B would
cost more is where it names the header, repertoire, form, footer, media and pricing.

### 4. `plans/CONVENTIONS.md` — **the sweep folds this pass in**

Editorial is the fourth template to lean on the file. Keep *Inherited and used* below, one line
per bullet leaned on, as Grunge's plans did; the sweep adds Editorial's column or markers and the
rows this pass leaned on three times that the file does not name (the dashed rule and the tape are
likely ones).

## Session 0 — the foundation

Grunge's session 0 (Lime's steps 1–9) with these deltas. It touches no section's layout code.

0. **Ask decisions 1 and 3.** Steps 2, 4, 6 and 7 do not depend on either and can go first.
1. **The flags, as two commits:**
   - (a) Pure refactors, **all five themes digest to zero rows**: `vm.faceK` with `faced` /
     `facedLh` reading it (identity at 1); `editorial` and `limeTree` added with no reader; and,
     under route A, the scheme resolution in `sectionVm` with no `schemes` data yet (it reads
     `T.schemes?.[…]`, which is undefined for all five). Commit.
   - (b) `|| editorial` on `designed`, the `THEMES[3]` rewrite, `THEME_RAMP.Editorial`, and under
     route A `THEMES[3].schemes` and `SCHEMES_OF.Editorial[0]` — where theme 3 moving is the
     point and 0, 1, 2 and 4 stay at zero.
2. **`THEMES` ↔ tokens is settled** (Lime's session 0): `radius` = `radius/card`, `radiusSm` =
   `radius/control`, `btnR` = `radius/pill`, `bw` = `border/thin`, `radiusChip` = `radius/chip`.
3. **Rewrite `THEMES[3]`**: the faces (decision 1), `ui` Chakra Petch, `body` Inter, `dls` `'0px'`,
   `radius` `'16px'`, `radiusSm` `'6px'`, `btnR` `'999px'`, `bw` `'2px'`, `radiusChip` `'6px'`,
   `sub` reworded, `tags: ['#E6B6A0', '#C86E52']` (Scheme 1's `tag1` / `tag2` backgrounds), and a
   **`sem` object in Lime's exact shape from Scheme 1**: `box1` `#FFF9F2`, `box2` `#EDE6DC`, `box3`
   `#141414`, `glow` `#C86E52`, `activeBg` `#C86E52`, `activeFg` `#F6F0E8`, `inactiveBg` `#F6F0E8`,
   `inactiveFg` `#C86E52`, `inactiveLine` `#141414`, `stroke1` `'#141414'` (opaque — trap 1),
   `stroke2` `#C86E52`, `hl` `#141414`, `tagFg: ['#141414', '#F6F0E8']`. `palette` stays. Under
   route A, `schemes[2]` and `schemes[3]` in the same shape from the table (`palette` is
   `[bg, text1, text2]`: Scheme 2 `['#AA958A', '#F6F0E8', '#141414']`, Scheme 3 `['#141414',
   '#C86E52', '#F6F0E8']`; Scheme 2's and 3's `inactiveBg` are transparent — write
   `'rgba(…, 0)'`, not a hex).
4. **`THEME_RAMP.Editorial`** from the mode table (desktop × 0.82 rounded, 768 / 390 verbatim), and
   keep `preview.jsx`'s `Z` copy in step.
5. **Fonts.** Chakra Petch and Inter are loaded in both HTML files already; the display face per
   decision 1. Playfair Display and Lora are read by nothing in `src/` but `THEMES[3]` (grepped at
   planning time) — drop them from the `index.html` link only if decision 1 leaves them unread and
   the builder chrome does not name them (Courier Prime's precedent: grep first).
6. **Every name gate outside `EncoreSection`** — `grep -n "T.name ===" EncoreBuilder.jsx data.js
   photos.js`. The expected answers, each to be checked against the frame:
   - `vm.grainSrc` (`EncoreBuilder.jsx` ~492) — **widen to Editorial**: the tape's texture is hash
     `b74be8bc`, which Grunge's session 0 proved is `grain.jpg`. `Grain` itself stays gated (its
     `grunge` opt-in); the tape is its own helper (*decorative language*), built in section 3.
   - `vm.mapSrc` / `mapRadialSrc` — through `designed` (decision 2).
   - **`gigDark`** (~1282) — Retro's; Editorial's map stands on paper with an ink tile and a
     terracotta gig panel. Grunge left it unwidened; decide in section 6.
   - `navFace` / `navGapEm` (~527) — the header session's, with decision 1's table.
   - The `d === 2` arms (~395, ~408, ~421, ~454), `titleWordEms` (~897) and `footerBand` (~378) —
     later passes'; leave them.
   - `headerFamily`, `HEADER_NAMES` — the header session's.
7. **Seed Editorial's photographs** (`SEEDS.Editorial` in `photos.js`). The image-hash walk, done:

   | Slot | Hash | In the frame | Note |
   |---|---|---|---|
   | hero | `ae069c14` | 1440 × 750 | own |
   | header avatar (`pp`) | `488cc3d7` | 213 × 262, an arch | own — **and the form's avatar**, one image in two slots |
   | bio | `9d20fe0d` | 488 × 648, an arch | own |
   | gallery spotlight | `90514a32` | 545 × 496 | own |
   | gallery strip | `b35b6507` (×3), `35ae28b9`, `b073b46f`, `3f0c98b4`, `8f69a4a6` | 75 × 76 | `3f0c98b4` is **Retro's** spotlight in the ringed fourth seat, as on Lime's and Grunge's pages, and `b35b6507` repeats — a placeholder strip (Grunge's call: seed seven distinct pictures of this shoot and record it) |
   | calendar | `47176057` | 584 × 446 | own |
   | five track covers, map raster | | | Retro's, Lime's and Grunge's |

   Export as JPEG at Lime's sizes (its *Photographs are per theme* bullet), `editorial-*.jpg`. The
   shoot is **in colour**, so there is no greyscale question; confirm no fill filter or node effect
   anyway. Read each fill's `scaleMode` before its `imageTransform` (CONVENTIONS A). Note the
   standalone's size (7.92 MB after Grunge's pass).
8. **Casing** — decision 1's column. If a lowercase face is chosen, check the ~41 `cased()` sites
   against the render, as Lime and Grunge did.
9. **`T.tags` at two seats.** `grep -n "T\.tags" EncoreBuilder.jsx` (22 readers). Two comments
   describe Editorial's old four-hue array and must be reworded: `tierHues`' "a mid-tone card in a
   pale palette (Editorial's warm grey)" (~763) and `rowSeat`'s "the terracotta on Editorial, whose
   index 3 is a wash" (~848). **`deep` / `deepFg` / `mapBg` take the darkest tag, which moves from
   `#141414` to `#C86E52`** — they are read by the flat layouts 2–4 too, so name which cards change
   in the after-shots. `pillBg` **is** the accent again (CONVENTIONS C, *Under Lime `pillBg` IS the
   accent*): Scheme 1's `active/bg` is `#C86E52`.

**Verification for session 0:** commit (a) digests to zero at **all five** themes; commit (b) at
themes **0, 1, 2 and 4** (`node scripts/digest.mjs before 0,1,2,4` / `after`). Theme 3 changes on
purpose: keep desktop before / after shots of all eleven sections in the scratchpad (`shots.mjs`).

## The header, and the four cards

Grunge's section, with `'editorial'` for `'grunge'`:

- **`headerFamily('Editorial')` → `'editorial'`**, four layouts, `HEADER_NAMES.editorial` slicing
  photographic's first four (Hero / Feature spread / Inset Hero / Stacked), like Lime's and
  Grunge's. Editorial's layout 2, 3 and 4 pages were found at planning time (*The Figma source*).
  `flatHeader` false; `bleed` comes through `s.designed`. Pop is then the last `'flat'` family.
- **The header is on Scheme 3 (ink).** Under route A its `s.*` reads are Scheme 3's already;
  under route B it is `HeaderV0`'s `G2`-style literal set again, a larger one.
- **Delete `TEMPLATE_STILLS.Editorial`**, its import and `editorial-header.jpg`, and fix the
  comments (`TEMPLATE_STILLS` is then Pop's alone). The picker card, its thumbnail and modal card 1
  then all render `HeaderV0`.
- **Cards 2–4 are placeholders that must publish**: `HeaderV1`…`V3` in Editorial tokens. Render
  each at three widths, publish, fix only what is broken, and record what each needs under *Open
  questions* for its layout pass. The `pageLayout()` fold needs no change.
- **The 390 hero `986:48251` is `Device: Tablet` on a Mobile page — the third template in a row.**
  Its type is the 768 ramp's. `HeaderV0`'s named `tk` table needs Editorial's numbers.
- **The nav fit**: `vm.navEms` and its siblings, in the face's table (decision 1), on the
  uppercased strings. JP-039's `navFits` is layouts 2 and 3's and does not arise here.
- **What the frame draws** (read off the desktop render; confirm each against `HeaderV0`'s Lime and
  Grunge arms before inventing anything): a **glass** ink capsule (`Frame 49`, `BACKGROUND_BLUR`
  44) with a blush sparkle mark and the wordmark, nine links, and a Book Now pill with a dark arrow
  disc; a **blush sparkle** (108 × 109) top-right where Lime draws its reticle and Grunge its red
  seal — **no seal on this header**; the portrait card is an **arch** (`pp`, 213 × 262), Lime's bio
  shape, not Lime's and Grunge's rounded card; a location / role row in paper with a ring bullet;
  the title at `display-xl` in paper, **one tone** (Grunge's two-tone title is Grunge's); a chip
  row alternating terracotta and blush in Chakra Petch; the photograph fading to ink at its foot.

Verify in the builder as Lime's plan says, reading "Editorial" for "Lime".

## Editorial's decorative language

Everything here is behind `s.editorial`, `s.limeTree` or a named pair.

- **No seams and no band grain.** Every band meets its neighbour on a straight edge at all three
  widths: no arc vectors, no tears, and not even the twins' switched-off `Layer_1` — a planning
  scan of every Editorial section for vectors or grain layers wider than 300 came back empty at
  all three widths. `ArcEdge` and `TornEdge` are not this template's.
- **Dashed rules** — the language's main device, on nearly every section. All 1px, INSIDE, cap
  NONE; bottom-only on a row, all four sides on a card:

  | Section | Node | Dash | Ink |
  |---|---|---|---|
  | media | track rows | 9, 9 bottom | `#F6F0E8` (Scheme 2 `stroke1`) |
  | gallery | the four source rows | 5, 5 all | `#141414` |
  | repertoire | search, song rows | 9, 9 bottom | `#F6F0E8` 56% (Scheme 3 `stroke1`) |
  | map | gig rows | 7, 7 bottom | `#141414` |
  | pricing | the three cards | 8, 8 all | `#F6F0E8` |
  | form | the shell · each box · the chips · the message | 16, 16 all · 7, 7 bottom · 5, 5 all · 7, 7 bottom | `#F6F0E8` 56% |
  | testimonials | the card and both backs | 9, 9 all | `#141414` |

  CSS `border-style: dashed` cannot set a dash length and an inset `boxShadow` cannot dash, so the
  first section that meets one (media, section 3) builds **one helper** and records its technique
  under *Conventions*. The likely one is an absolutely positioned inline SVG overlay (`rect` with
  `rx` for a radiused card, or a `line` for a rule, `strokeDasharray`, inset half the weight so it
  sits INSIDE, `pointerEvents: 'none'`) — CONVENTIONS C's *inside stroke is an overlay* rule, so
  every stated height holds; a `repeating-linear-gradient` is cheaper for a bottom rule and cannot
  do a radiused box. Read each node's `dashPattern` rather than this table's.
- **Tape** (`Frame 210`) — a 206 × 56 strip at every width, **blush `#E6B6A0`** (terracotta
  `#C86E52` on the calendar), clipping a 213² `grain.jpg` at **SCREEN** (x −3), laid across the top
  edge of media's polaroid, the gallery's viewer card, the map's gig panel and the calendar's
  photograph. Its plugin rotation is Figma's counter-clockwise one, so **−3 / −2 / −1 are CSS
  `+3` / `+2` / `+1`** (`figma-frame-reading`): media −3 at 1440 and −1 at 768 and 390, the
  gallery −3, the map −2 and the calendar −1 at all three. One `Tape` helper, built in section 3.
- **Tilted polaroids with real drop shadows.** Media's mount `Frame 209` (558 × 560, blush, Figma
  −2 → CSS +2, `DROP_SHADOW` `#000` 25% at 6, 6 blur 6 — Grunge's `Frame 211` round Lime's card,
  which carried `effects: []`), the calendar's photograph `Frame 204` (584 × 446, −2, blur 9), the
  map's gig panel (blur 9) and the gallery's card (an inner shadow and a drop shadow, both blur 4).
  These are **shadows, not glows and not rings** — the first real drop shadows since Retro's hard
  offsets. CONVENTIONS A's *every glow is a guess until the node's `effects` confirm it* cuts the
  other way here: read each one's `effects` rather than assuming Grunge's empty list.
- **Sparkles** — a four-point star in blush (paper inside the seals): the header's mark (44.9) and
  its corner star (108 × 109), the repertoire head's (80.7), the footer wordmark's (39.9), and the
  seals' glyph. Compare the path to `GrungeStar`'s (144 × 145.33) before drawing a second: if it is
  the same silhouette, widen that helper with a fill rather than forking it. The header session
  meets it first.
- **The seal** (`Frame 179`), in the bio and the footer only: a terracotta disc, Figma −25.03 →
  CSS **+25.03**, 125.4 in the bio and 154.9 in the footer (the plugin's `width`, the unrotated
  disc), with a paper sparkle, the name twice as `TEXT_PATH`, and an inner ring (`#141414` in the
  bio, paper 56% in the footer). Start from `SealBadge`'s Lime branch and Grunge's `line` prop;
  place it by the disc's centre (CONVENTIONS B).
- **The arch** — the header's portrait card and the bio's photograph are Lime's arch shape; Lime's
  `Bio` block already draws one.
- **The glass capsule** — the nav's `BACKGROUND_BLUR` 44. Check what `NavBar`'s Lime capsule does
  before adding a `backdropFilter`.
- **Radii** 16 / 6 / 6 / 999 through the session-0 keys; the dashed cards' own radii are read per
  session.
- **The tape is the page's only texture.** A stddev scan of any band should come back flat.

### The band table

The ground sequence, identical at all three widths:

| # | Section | Scheme | Ground | On it |
|---|---|---|---|---|
| 1 | header | 3 | photograph over ink, full-bleed | glass capsule, sparkle, arch card |
| 2 | bio | 1 | `#F6F0E8` | arch photograph, seal |
| 3 | media | 2 | `#AA958A` | dashed rows, taped polaroid |
| 4 | gallery | 1 | `#F6F0E8` | dashed source rows, taped viewer card |
| 5 | repertoire | 3 | `#141414` | sparkle, dashed rows |
| 6 | map | 1 | `#F6F0E8` | ink map tile, taped terracotta gig panel |
| 7 | pricing | 2 | `#AA958A` | three dashed cards, ink pills |
| 8 | calendar | 1 | `#F6F0E8` | a lighter panel, taped photograph |
| 9 | form | 3 | `#141414` | dashed shell, terracotta form half |
| 10 | testimonials | 1 | `#F6F0E8` | dashed card over two backs |
| 11 | footer | 3 | `#141414` | seal, sparkle |

No two neighbours share a ground on the seeded page. A reordered page can stand two alike together,
and with straight edges they merge into one band — accepted, as Retro's, Lime's and Grunge's seams
against the wrong neighbour were.

## Per-session procedure

[`../lime/layout-1.md`](../lime/layout-1.md)'s *Per-session procedure*, steps 1–9, with:

- step 3: `get_metadata` on the three Editorial nodes and **both twins'** desktop nodes, then the
  paired diff walk (CONVENTIONS A) against the nearer twin — **by traversal order**, since the
  variants' ids differ
- step 4: `get_variable_defs` on all three nodes; the section's scheme is its root's (the table
  above), and one `explicitVariableModes` read confirms no nested override
- step 5: widen the section's Lime block per decision 2, reading its Grunge arm first
- step 6: the harness is `preview.html?cat=<cat>&arch=0&theme=3&w=desktop|tablet|mobile`
  (`arch` defaults to 1 — always pass `arch=0`); function at `theme=3&live=1`; **zero rows at
  themes 0, 1, 2 and 4** before and after, every session
- step 9's hand-off prompt:

  ```
  Continue the Editorial layout-1 pass with section N, `cat`.

  Read CLAUDE.md, then plans/editorial/layout-1.md, then plans/CONVENTIONS.md (groups A, B, C and
  D1), then this section's Settled bullets in plans/lime/layout-1.md and plans/grunge/layout-1.md,
  then the `figma-frame-reading`, `verifying-the-published-tab` and `browser-tool-choice` memory
  notes, and follow the per-session procedure.

  The three Editorial masters are `<desktop node>` (1440 × <H>), `<tablet node>` (768 × <H>) and
  `<mobile node>` (390 × <H>) in Figma file uFoUbPaBrDicjyuSBEbtGT, on Scheme <N>; the Lime twin
  is `<lime node>` and the Grunge twin `<grunge node>`. Widen the Lime block in the existing `s.v0`
  branch of `<Component>` in EncoreSection.jsx to `s.limeTree`, Editorial's deltas behind
  `s.editorial`. Themes 0, 1, 2 and 4 must digest to zero rows.

  <the two or three conventions most likely to bite this section>

  Branch: editorial-layout-1. Do not refresh the root index.html.
  ```

Do **not** refresh the root `index.html` per section; it is the sweep's last step.

## The end-of-pass sweep

One session after section 11. Lime's list and Grunge's apply item for item (their *The end-of-pass
sweep* and *Learned on the end-of-pass sweep*); what is Editorial's own:

1. **CLAUDE.md**: "Retro, Lime and Grunge are designed; Editorial and Pop are not" becomes Pop
   alone; "Retro, Lime and Grunge seed photography"; `s.editorial` and `s.limeTree` named beside
   `s.lime` and `s.grunge`; **decision 3's rule** in place of "Colours are not per-section" (route
   A); the header paragraph's "The flat two's header reads none of this"; every Lime-and-Grunge
   state description this pass gave an Editorial arm (booked day, refused box, the active marks);
   the file table's line counts (`wc -l`).
2. **README.md** and the code comments making a claim about the template list
   (`grep -rn "flat two\|Editorial and Pop\|the other two\|Retro, Lime and Grunge" source/src/builder README.md`)
   — fix the claims, leave the branch-local truths.
3. **Every `(s.lime || s.grunge)` left in layout-1 code**, listed with why Editorial does not share
   it (decision 2).
4. **`Photo`'s empty `backdrop`** under Editorial (`&noimage=1`): the Lime arm's `box1` → `bg` →
   `box3` is `#FFF9F2` → `#F6F0E8` → `#141414` in Scheme 1 — check it reads as a well on paper, and
   on the ink header.
5. **One whole-page published check under Editorial** — `node scripts/page-check.mjs Editorial`;
   every band edge eyeballed against its real neighbour at 1440 and 390, and no tape, seal or
   sparkle over a control.
6. **The four header cards** still render and publish.
7. **Field reach** (`scripts/reach.mjs`): the header's `in` gains an Editorial row (Grunge's sweep
   found its own missing), and so does every Lime-and-Grunge-keyed row this pass widened —
   `FIELDS.calendar.heading` at least. `FIELDS.media.cta`'s `'*': []` row already reads "Not shown
   in this template" under Editorial, which is right if the media session seats Soundcloud (its
   notes below).
8. **`CONVENTIONS.md`** (decision 4), and **`plans/README.md`**: mark the pass closed.
9. **Refresh the root `index.html`**, with the two-build digest (`build-digest.mjs`): zero rows at
   themes 0, 1, 2 and 4 and non-zero at 3. The tell that it shipped: the old build's picker shows
   Editorial as a still and its modal offers three flat cards; the new one four. If the display
   face is self-hosted, record the standalone file's new size.

## Conventions

Append as the pass goes. Do not repeat Lime's, Grunge's or Retro's bullets; name them.

- **The gates are `s.editorial`, `s.limeTree`, the named pairs and `s.designed`** (decision 2).
  Never edit a Retro, Lime or Grunge literal to make Editorial look right; every session proves it
  with the four-theme digest.
- **Harness:** `theme=3`, `arch=0`.
- **Read a section node, never the desktop page**, for variables: the page frame is set to Lime.
- **Diff by traversal order, never by id**: each template is its own variant.
- **Every head on this page is one tone.** The planning read found no two-colour heading, so
  Grunge's positional two-tone rules (its open questions 7–9, 11 and 14) are Grunge's and do not
  widen.
- **A dashed rule is `DashRule`** (section 3, beside `SIENNA_MEDIA` in `EncoreSection.jsx`): an
  absolutely positioned inline `<svg>` on the row's edge, one `<line x2="100%">` with
  `strokeDasharray`, `overflow: visible`, no pointer. The caller is `position: relative`, passes
  the node's own `dashPattern` (× 0.82 on desktop; the 1px weight stays 1) and its stroke's scheme
  key, and pads its whole inset back — the overlay takes no height, which is what an INSIDE
  stroke is. It draws `side` 'top' or 'bottom', or **`side="all"` for the four-sided card**
  (section 4; next the pricing cards' 8, 8, the form's shell and the testimonials): the *svg* is
  inset half the weight and sized `calc(100% - w)` in CSS, and one `<rect width="100%"
  height="100%">` fills it with `rx` = `radius` − w/2 — so no `calc` sits on an SVG attribute.
  The caller passes `radius` (× 0.82 on desktop) and is `position: relative`. Checked at 3× in
  the render: dashes on all four sides, wholly inside.
- **The tape is `Tape`** (section 3): `if (!s.editorial) return null`, a 206 × 56 `overflow:
  hidden` strip in `colour ?? s.activeBg` (media's binding; pass the node's own elsewhere — the
  calendar's terracotta), clipping the 213.09² grain raster at SCREEN from (−2.93, 0.15), × `z`.
  The caller seats it with `style`. **Place it by its centre in the frame it is nested in**: the
  narrow masters nest media's inside the leant card, the desktop one on the section, and all three
  are the same page angle (−3); inside a leant mount it turns the difference. Walk the tape's
  `x`, `y`, `rotation` (a rotated node's `x`/`y` is its unrotated origin) and add the half-size
  through the rotation, then un-rotate the offset from the mount's centre.
- **A sparkle is `GrungeStar` with `fill={SIENNA_MEDIA}`** at the node's own width (every
  Editorial sparkle read so far is the path at its own ratio, unrotated) — the header's two, the
  repertoire's (section 5); next the footer wordmark's. Seat it off what it decorates, not the
  frame's absolute x, and keep its box inside the decorated node's layout (padding) so nothing
  live can flow under it.
- **A leant print in a stack gives back its rotated box** (section 3): Figma's auto-layout spaces a
  rotated child by its bounding box, so a mount standing under a list takes a block margin of
  W·sin θ / 2 a side (`1.745% 0` at 2°). Beside a list, centred, it needs none.
- **…unless the row is sized by it** (section 6): the map's desktop row hugs the leant panel's
  rotated box, so the panel's column *is* that box (658.57 of 1328) and the panel gives back both
  halves as a margin; the tile beside it stretches to the box's height. Read the parent's size
  against the rotated box before choosing.
- **A tape inside a leant print is seated in the print's own frame** (section 6): its local `x`/`y`
  and `rotation` give the centre as `(x + cos θ·w/2 + sin θ·h/2, y − sin θ·w/2 + cos θ·h/2)` (θ
  Figma's), and nested CSS transforms compose as Figma's do — no un-rotation. Pass the tape's own
  binding: `Tape`'s default `s.activeBg` is terracotta under Scheme 1, the ground it lies on there.
- **A print's thick INSIDE stroke is padding on its own ground** (section 8): the calendar's 10px
  `box/2` border round a photograph is `padding` on an `s.box2` div round an inner clip, so the
  outer box keeps no `overflow: hidden` and the tape can ride over it. A centred print owes no
  rotated-box margin — check the walk's `y` against (parent − rotated height) / 2.
- **A hand-scaled Bold statement is fitted to its widest word** (section 9): `min(frame size,
  calc(100cqi / s.titleWordEms))` on an `inline-size` container, `vm.titleWordEms` in Noto Bold
  ems (`notoBoldEms`, the 540 table × 1.045), the line height as the frame's ratio, and the frame's
  fixed box as `max-width` over `min-width: min-content`. The testimonials' quote (57.84 / 52.42)
  and the footer's statement (57.84 / 47.9) meet the same demo-face measure — measure their
  widest words in Bold before choosing, and check `titleWordEms` is the key their text reads
  (the testimonials' quote is not `vm.title`). **A string that is not `vm.title` carries its own
  key** (section 10): `vm.quotes[].wordEms`, the same `notoBoldEms` maximum per review, Editorial
  only — so a third reader (the footer's `vm.footerStatement`) takes its own key the same way.
- **A dashed rule under an `<input>` goes on the field's column** (section 9): the box is the
  column's last child, so `DashRule` at the column's foot is the box's, and a refusal swaps it for
  a solid inset rule on the input.

### Seen at planning time, per section

From the renders and the planning walk — impressions to confirm, not measurements. The five paper
sections (2, 4, 6, 8, 10) are where a Lime block's dark-ground assumptions break (decision 3); the
four ink ones are its own register.

1. **header** — see *The header, and the four cards*.
2. **bio** — Lime's block: the arch photograph, "KM BIO" and "[ 001 ] STRUCTURE · BIO_01" flanking
   left, the "About" paragraph and the role line over a terracotta rule right; the head "READS THE
   ROOM." one tone in terracotta at `display-lg`; the seal on the arch's lower-left edge.
3. **media** — Scheme 2, and **Grunge's tree** (75 of 79): the mount round the sleeve is Grunge's
   polaroid re-inked blush, with a real drop shadow and the tape over its top; rows ruled in dashed
   paper; the head "FIVE WORTH YOUR EAR." in paper, one tone; "5 / 5 FEATURED"; no star. **The pill
   is Soundcloud** where Lime's and Grunge's frames draw Book Now (JP-034's per-template seat):
   Editorial's is Retro's rule — the `soundcloud` link, a picture while its address is empty — so
   the widened block's arm swaps the seat back and `FIELDS.media.cta` needs no Editorial row. First
   session to meet the dashed rule and the tape.
4. **gallery** — the tree all three share: source rows on `box1` paper in dashed black 5, 5, the
   open row filled terracotta; the viewer a white polaroid under the tape, terracotta arrow discs;
   the strip's fourth thumb ringed terracotta. The 390 source row runs off the page (the 412
   render), which the section wraps.
5. **repertoire** — Scheme 3: "250 SONGS" in terracotta with the sparkle beside it; the search a
   dashed underline with a terracotta-ringed glyph tile; chips: All filled terracotta, the rest
   paper pills; the artists in terracotta. **The pager marks its current page** (a terracotta ring
   on 1), where Grunge's frame marks none — `Pager`'s arm follows the frame, the map's `onBox`
   precedent.
6. **map** — Scheme 1, Grunge's tree (71 of 73) but **Lime's register**: Lime's map is its light
   band (`limeLight`, Scheme 4 `#F2FFD0`, the ink turned round), which already solved this block on
   a pale ground — read that arm first. "Shows/coverage" over "MANCHESTER" in terracotta
   at `display-lg` and "12 MILE RADIUS" right; the raster on an ink tile, tinted pink (read the
   blend); the gig panel terracotta, tilted, taped and shadowed; rows dashed black 7, 7; ink date
   boxes; pager pills outlined on the panel.
7. **pricing** — Scheme 2: three dashed paper cards, apparently unfilled (read the fill); chips
   outlined, the selected one blush; the `[ico]` an ink chip; the Book Now pills are the nested
   Scheme 1 (ink, terracotta type, blush disc). No seal — Grunge's `Frame 178` is Grunge's.
8. **calendar** — Scheme 1: the panel a lighter paper with a terracotta divider; cells outlined in
   terracotta, the picked day filled; booked days dimmed; the photograph tilted under terracotta
   tape. `FIELDS.calendar.heading`'s `in` owes an Editorial row (Grunge's section 8 precedent).
9. **form** — Scheme 3, Grunge's tree (60 of 61), but **no nested scheme** where Lime's and
   Grunge's form half is Scheme 3: read the terracotta half's `boundVariables` (CONVENTIONS A, *a
   scheme that did not move can still move the binding*). The shell dashed 16, 16; boxes dashed
   underlines; chips dashed; the submit a full-width ink pill "ENQUIRE" with a terracotta disc (the
   frame's copy — `vm.formBtn`'s *Book Now* is Lime's and Grunge's named diff). The statement is a
   hand-scaled Bold (trap 4), and its "UNFORGETT / ABLE" break inside the word is the demo face's
   measure, not a design.
10. **testimonials** — Scheme 1: a dashed card on paper over two backs that read as tape strips
    (terracotta and blush, dashed too — Lime's insets off the card); the quote a hand-scaled Bold in
    ink; the reviewer pill terracotta, the role pill ink with terracotta type; outlined arrows.
11. **footer** — Scheme 3, Lime's tree: the seal near the column split; the wordmark's sparkle and
    rule; the statement a hand-scaled Bold in terracotta; paper links; a terracotta Book Now pill
    with an ink disc. The 768 and 390 masters are taller than the twins' (692 / 736 against
    647 / 619) — find out why before fitting.

### Settled in session 0 (the foundation)

- **The display and label face is Noto Serif Display at wdth 62.5**, standing in for Fisterra Fora
  (user call, 2026-09-24: substitute, "you pick"). Measured off the frame's ink bounds
  (`absoluteRenderBounds` of `964:58612`'s text nodes) and a pixel scan of its render, against each
  candidate's render in the headless shell at matched cap height:

  | Face | cap / em | title width vs frame | stem / cap | hairline / cap |
  |---|---|---|---|---|
  | **Fisterra Fora** (the frame) | .725 | 1 (4.875 em) | .154 | .038 |
  | **Noto Serif Display, wdth 62.5, wght 540** | .715 | 1.108 | **.154** | .014 |
  | Oranienbaum | .705 | 1.049 | .121 | .028 |
  | Instrument Serif | .725 | 0.907 | .097 | .041 |
  | Gloock | .755 | 1.191 | .205 | .026 |
  | Noto Serif (the text cut), wdth 62.5, wght 500 | .715 | 1.103 | .147 | .077 |
  | Playfair Display 400 (the frames' own patch face) | .710 | 1.258 | .134 | .035 |
  | DM Serif Display | .665 | 1.266 | .226 | .030 |

  Only the condensed Noto matches the frame's weight: every other narrow face is light, and every
  face with the heft is 19–27% wide (Playfair Display would set "SIENNA VALE" past the 1440 edge).
  Its hairlines are thinner than Fisterra's; the text cut's are twice as thick, and the frame sits
  between them — the Display cut is the high-contrast one the brief names, and it holds at the
  13px nav. It has `'`, `"` and `&` (trap 5 is moot) and a real Bold. The choice is final: every
  width from section 1 on is this face's.
- **`faceK` is 1.** The cap height is the frame's within 1.4%, and across the header's twelve
  strings (the eight nav labels, Book Now, the location row, the role line, the title) the width
  ratio runs 0.94–1.09 and averages **0.997**. Only the big title runs wide (×1.09): Fisterra's
  S, A, V and E are narrower at display size. Grunge's rule of cap and width agreeing to 2% does not
  hold here, and cap wins, since it is what fills the frames' stated line boxes; a head that must
  fit a measure is its section's to check. `faced` / `facedLh` are the identity under Editorial.
- **The link is one pinned entry: `family=Noto+Serif+Display:wdth,wght@62.5,540..700`**, in
  `index.html` and `preview.html`. Google serves it as one variable face declared `font-stretch:
  62.5%` and `font-weight: 540 700`, so a site that names no weight is clamped to 540 — the frame's
  stem to the pixel, verified on the render — and the three hand-scaled Bold statements get 700
  (stem / cap .189). **Never add a second Noto Serif Display entry** (Retro's Fraunces rule): the
  default 400 would then find a face of its own and the display would go wide and thin. A browser
  Google deems pre-variable gets static 500 / 600 / 700 instead — accepted. Playfair Display and
  Lora left the `index.html` link; nothing else named them.
- **The nav's advance table is the header session's.** `navFace` needs this face's widths in ems
  (the `bebasEms` / `antonEms` shape). Canvas `measureText` sees neither the width axis nor an
  unloaded webfont — the first attempt measured the fallback for every candidate — so measure the
  rendered DOM, or canvas after `document.fonts.load()` with `ctx.fontStretch = 'extra-condensed'`
  and a numeric 540 in the font string, and confirm one label against the DOM.
- **`labelStyle` still tracks `0.02em` under Editorial**: its tracking is gated `s.lime || s.grunge`
  (`EncoreSection.jsx` ~105), so every label in the after-shots is tracked. It is the site Grunge's
  section 1 widened (*`labelStyle` tracks `s.dls` (0)*), and the header session's first `s.limeTree`
  widening — measure no label width before it.
- **Casing stays `'title'`**; the display and label strings take `textTransform: 'uppercase'` per
  site, Grunge's rule. After session 0 every head renders mixed case in Noto ("Reads the room.") —
  expected; each section session owes its own heads the transform.
- **Route A is in `sectionVm`'s head**: `d` is computed first, then `theme.schemes?.[SCHEMES_OF[
  theme.name]?.[d]?.[cat]]` is spread over the theme as `T`, so every `T.palette` / `T.sem` /
  `T.tags` read below it is the section's ground's. The reads outside `sectionVm` — the page
  gutter in `arrangeRows`, the published `documentElement`, the picker's dots — stay the theme's,
  which is the page, Scheme 1. `SCHEMES_OF` is keyed by the section's **design**, so the footer
  (one design) reads its row 0 at every page layout: a later pass that finds the footer on another
  scheme at layouts 2–4 keys it on `page` instead (`footerBand`'s precedent). Layouts 2–4 have no
  row yet, so every other section there stands on Scheme 1.
- **The plan's scheme table was wrong in one cell, read off the file** (one `use_figma` resolving
  `2 · Scheme` through the Sienna Vale primitives): **Scheme 2's tag 1 is blush `#E6B6A0` and its
  tag 2 paper `#F6F0E8`**, both inked `#141414` — the other way round from the table. Tags 3–7 do
  not strictly alternate in Schemes 2 and 3 (Scheme 2's 6 and 7 are both paper; Scheme 3's 6 is
  paper, 7 terracotta); the two-seat system ignores that, as Lime's does. `inactive/bg` in Schemes
  2 and 3 is the scheme's own ground at alpha 0, written `rgba(170, 149, 138, 0)` and
  `rgba(20, 20, 20, 0)`. Nothing in `EncoreSection` reads `inactiveBg` today (grepped), so the
  transparent value feeds no colour maths. Every other cell of Schemes 1–3 matched.
- **The header's chips are not Scheme 3's tag seats.** The frame alternates terracotta and blush on
  the ink header, where Scheme 3's tag 1 / tag 2 are paper / terracotta and it has no blush at all:
  section 1 reads the chips' `boundVariables` (CONVENTIONS A, *a scheme that did not move can still
  move the binding*). The after-render's chips are paper / terracotta.
- **Two derived keys route A does not fix, both on taupe.** `paper` — `paperOf(#AA958A, #141414)`
  falls to Retro's `#FBF6EA`, since neither the taupe nor the ink clears 0.6 luminance — and
  `deep`, which is the darkest *tag*, and Scheme 2's two tags are both light, so it is blush. The
  after-render shows it: **pricing's flat deck is blush on blush in its middle card and blush type
  on paper in the outer two.** Sections 3 and 7 meet both; the frames' cards there are dashed
  outlines on the taupe, so neither key need survive them. Under Schemes 1 and 3 `deep` is
  terracotta (`#141414` before), `deepFg` its contrast.
- **`pillBg` is `sem.activeBg`**: terracotta under Schemes 1 and 3 (the accent — *Under Lime
  `pillBg` IS the accent*), blush under Scheme 2. **The enquiry form's submit has lost its fill**
  (its v0 shell paints the contact half in `pillBg`, the submit accent on it), Lime's session-0 note
  again; the frame's submit is an ink pill, so section 9 owes it anyway.
- **`s.designed` reaches** the root's `bleed` (inert until the header session, `!s.flatHeader`),
  `TagChips`' designed branch and `vm.mapSrc` / `mapRadialSrc` — the flat map now draws the raster.
  **`vm.grainSrc` is widened and inert**: the tape clips hash `b74be8bc` (the 740² texture on media,
  gallery, map and calendar), and `Grain` stays gated; the tape is its own helper (section 3).
- **Photographs** (`SEEDS.Editorial`, seven `editorial-*.jpg`, ~825 KB): hero `ae069c14` the garden
  wedding (1536 × 1024, as served), the portrait card `488cc3d7` the singer — a 1122 × 1402
  portrait source nearly the arch's own 0.813, so it is the whole source at 480 × 600 rather than a
  centre square, and the frame's form draws it as its 48px avatar too — the bio `9d20fe0d`
  (820 × 1025, `FILL`), the gallery spotlight `90514a32` (900 × 1125, `FILL`), and the calendar
  `47176057`, **the page's one `CROP`**: the full width over 8.9–70.0% of a portrait source,
  exported at that crop (1000 × 764, the frame's 1.309). **In colour**: no fill filter, and the
  one effect (the calendar's `DROP_SHADOW`) is the polaroid's. `photo` is the hero, since the
  layout-2 form's stage slot fills with it (`964:64598`). **The gallery strip departs from the
  frame**: its thumbnails are Retro's Basement shoot (`3f0c98b4` Retro's own spotlight in the
  ringed seat, `b35b6507` three times), and Editorial's layout 2–4 pages carry no picture of this
  shoot beyond the five — so the seven slots are the five and two square crops of the hero (the
  singer at the mic, the dancing couples), the spotlight in `galActive()`'s slot.
- **The standalone build is 9.05 MB** (the committed root is 7.95 MB): the seven JPEGs, inlined.
  The still `editorial-header.jpg` (242 KB) goes in section 1.
- **After-render, theme 3 only** (shots in the session scratchpad; themes 0, 1, 2 and 4 digested to
  zero rows static and live, 1290 renders per commit): every layout-1 section renders — the header
  ink and still `FlatHeader`, media and pricing taupe, repertoire, form and footer ink. Bar pricing
  and the form's submit (above), everything is legible. **Layouts 2–4 moved with `deep` / `mapBg`
  and the schemes**: the map plates at layouts 2–4, media 2 and 3, bio 4, form 2 and pricing 2 and 4
  went from ink grounds to terracotta, and the footer is ink on every page. The layout-4 `deep`
  sheets now set a terracotta head on a terracotta ground (the bio's, the gallery's, the
  repertoire's) — the layout-4 pass's, named here rather than chased.
- **`preview.jsx` needed nothing**: its `Z` copies `SIZES` + `RAMP` + `RAMP_REST` + `WIDE`, and
  `sectionVm` lays `THEME_RAMP` over it by `dev`.

### Settled in section 1 (the header)

- **The hero is Lime's composition node for node a third time**, so there is no Editorial block:
  `HeaderV0` and `NavBar` read `lime = s.limeTree`, `BookPill`'s branch, `TagChips`' desktop
  padding and `labelStyle`'s tracking read `s.limeTree`, `Wordmark`'s Display/Title arm and
  `Title`'s transform are Grunge's widened to `s.editorial`, `LogoMark` gains an `s.editorial` arm,
  and `const ed = s.editorial` names the deltas. `headerFamily('Editorial')` is `'editorial'`, four
  layouts, `HEADER_NAMES.editorial` sliced; `editorial-header.jpg` and its import are gone and
  `TEMPLATE_STILLS` is Pop's alone. `labelStyle` was widened first, as session 0 asked.
- **The deltas, read off all three masters with the node walker** (every other box, gap and
  padding is Lime's to the pixel):
  - the capsule's fill is **`sem/box/3`** (`#0E0E0E` under Scheme 3, a step below the header's
    `sem/bg`) → `s.box3`; its `BACKGROUND_BLUR` 44 is dropped for Lime's reason (opaque fill);
  - the links are **Label/SM 16 at lh 1.1**, UPPER, still 23 apart, where Lime's are Display/List
    24 at 1.2 — so the row's gap is `23/16` em (NavBar *and* `navGapEm`) and its cap `s.labelSm`;
  - the name is Grunge's Display/Title node — 32 × 0.82 = `26.2px`, `25px` on both narrow masters —
    in `sem/active/text` (paper, the links' ink, so no `nameColour`);
  - the mark is the **sparkle**, 44.93 × 45.35: × 0.82 at 1440 and the full 44.93 on both narrow
    masters (followed: it fits the 370 capsule); the 390 capsule closes its gap to 10, Grunge's;
  - the kicker is **`sem/text/2`** (paper) where Lime's is `text/1`, and the title **one tone** in
    `sem/text/2` — `ink`, which is `s.paper` = `#F6F0E8` under Scheme 3;
  - the card is an **arch**: 213 × 262 (174.66 × 214.84) and **144 × 219 on both narrow masters**
    (not Lime's squares), radius 140 / 140 / 0 / 0 — CSS clamps it to a semicircle as Figma does —
    on `sem/box/3` in 1px of `sem/stroke/2` (blush under Scheme 3);
  - the scrim is Lime's full-height fade in `#141414` (`SCRIM.editorial`);
  - the pill needed **nothing**: every paint is bound to the tokens `BookPill`'s Lime branch
    already reads (`active/bg`, `sem/bg`, `text/1`), and route A resolves them to terracotta / ink.
- **Route A carried the whole header.** Every `s.*` read is Scheme 3's, so the one literal is
  **`SIENNA_MEDIA` `#E6B6A0`** — `sem/media`, which resolves to that blush in all five Sienna Vale
  schemes (read off the file), and which no vm key holds (`s.stroke2` is blush under Schemes 2 and
  3 but terracotta under 1). The mark, the corner sparkle and the chips' second seat use it.
- **The chips are not the tag seats** (session 0's flag, settled by `boundVariables`): they bind
  `active/bg` · `active/text` then `media` · `tag/1/text` — terracotta under paper, blush under ink
  — where Scheme 3's seats are paper under ink and terracotta under paper, so both halves move.
  `TagChips` gained **`inks`** beside `hues` (additive, by seat); the header passes
  `hues={[s.activeBg, SIENNA_MEDIA]}` and `inks={[s.activeFg, s.bg]}`. Five chips, not the frame's
  six: `TAG_LABELS`, as under Lime and Grunge.
- **The sparkle is `GrungeStar`'s silhouette**: the corner star is that path × 0.75 point for point
  (61.56 → 82.07, 108 → 144), the mark the same at 44.93 / 144. `GrungeStar` takes an additive
  `fill` (the media heading passes none); `LogoMark`'s arm draws it in flow through `style`. The
  corner seat, on `showBadge` like Lime's reticle (so `badgeText` edits nothing under this header):
  88.56 at `right 5%` / `top 22.93%` at 1440 (the reticle's seat); **108 at `right −5.21%` /
  `top 16.8%` at 768**, where the master runs it 40 past the frame's right edge and the hero's
  `overflow: hidden` clips it — the 768 master's own position, not a desktop leak, so followed;
  108 at `right 1.54%` / `top 13.03%` at 390.
- **Device modes**: the 390 hero `986:48251` is `Device: Tablet` (as are both narrow masters):
  `tk` is `{ list 19, dispXl 107, labelXs 14 }` and the name 25.
- **The nav's advance table is `notoEms`** (`NOTO_EM` in `data.js`), read off the rendered DOM in
  the harness — spans at 100px in the loaded face, weight unnamed so the served face clamps to 540
  as every site does — never canvas. Summed per character it lands within 2.1% of each measured
  label, and over ("Availability", the most kerned, is the 2.1%). `navFace` is `notoEms` and
  `navGapEm` 23/16 under Editorial at every layout. The seeded nine set at 12.8px on the canvas
  (cap 13).
- **The title is fitted to its column at 1440 and 768 — a head that must fit a measure** (session
  0's warning, met): Noto sets "KAI MERCER" at 5.068 em, 542 at 107px against the 768 column's 540,
  and Lime's identity row is `flexWrap: 'wrap'` with a max-content text column, so the **whole
  column would drop under the card**. Under `ed` the column is
  `flex: 1 1 0` with `containerType: 'inline-size'`, and the title is
  `min(tk.dispXl, calc(100cqi / s.navNameEms))` — the nav's recipe, `navNameEms` being the name in
  Noto ems since the display face is the label face. 1440 keeps its 147 (745 of 880); 768 sets
  106.4 on one line; 390 wraps to two at 107 as its frame does (`inline` at every width, the
  frame's one wrapping run). A long name shrinks at 1440 and 768 without floor. The division
  assumes a non-empty name — `navNameEms` is not floored the way `navEms` is — which `nameOf()`
  guarantees: a Title that trims to nothing falls back to `artistName`, in the app and the harness.
- **Measured** (harness, `getBoundingClientRect`): at 768 the title stands at (198, 776.4) against
  the frame's (198, 776), the card at (30, 677), the sparkle at (700, 172) and the mark at
  (50, 44.3) — all the frame's; at 390 the title at (10, 540.3) against (10, 540), the card at
  (10, 238), the sparkle at (276, 110); at 1440 the mark at (62.4, 34.7) against 62.3 / 34.7 and the
  sparkle at (1032.5, 140.8) against 1033.2 / 141.
- **Moved with the shared helpers, theme 3 only** (digest: 80 of 129 theme-3 renders, zero at
  themes 0, 1, 2 and 4, static and live): every label at every layout (`labelStyle` untracked);
  every pill (`BookPill`'s branch) — the bio, calendar, form, map, media, pricing and testimonials
  renders listed by the digest; the footer's wordmark and mark; card 4's bar (`NavBar`); cards 2–4's
  titles uppercased. Media's and pricing's pills under Scheme 2 are **blush with taupe type**
  (`BookPill`'s face is `s.bg`) — sections 3 and 7's to fit.
- **Cards 2–4 render and publish**, after three `s.editorial`-gated fixes, each *Under Lime
  `pillBg` IS the accent* again (Sienna Vale's `active/bg` is its terracotta): `HeaderV1`'s and
  `HeaderV2`'s `mustard` stand-in is **`s.box3`, ink** — Editorial's own layout-2 frame
  (`964:64599`) paints the place card ink and its layout-3 frame (`964:68718`) the sheet ink —
  where card 2's pill label and place-card title and card 3's links had gone accent on accent;
  card 2's place-card body takes paper on it; and card 4's pill keeps the capsule's own scale
  (`size` undefined), since Retro's 390 14.24 ran it over the name. What each still needs is under
  open question 4.
- **The burger panel under Editorial is `sem/box/3` under paper** (`NavMenu`, every Editorial
  header card): `mapBg` derives from the darkest tag, which is Sienna Vale's terracotta, so the
  panel came out the accent and swallowed its own Book Now pill — the light-on-light risk *What
  already works* named, in a live state. `box3` is near-black and `paper` paper in Schemes 1 and 3
  alike.
- **Harness.** `page-check.mjs Editorial` failed once, before the footer walk, on
  `window.__scrolled` being undefined (the popup's document had been replaced); a checkpointed copy
  run straight after passed every phase, and the four-card rerun passed — not reproduced, recorded
  in case it returns. The advance table was measured with a one-off script in `source/scripts/`,
  deleted.

### Settled in section 2 (the bio)

- **No Editorial block: Lime's `if (s.v0 && (s.lime || s.grunge))` is `s.limeTree`**, with
  `const ed = s.editorial` naming the deltas. The tree is Lime's node for node at all three widths
  (the walker, all three masters): the flanks, the 29 stacked head, the 14-gap prose with its
  spacer and rule, the 488 × 648 frame (230 × 311 at 390), every size the ramp's (`labelXs`
  20 / 14 / 12, `dispLg` 118 / 73 / 48, `eyebrow` 15 / 12 / 11, `bodyMd` 14 / 13 / 13). Neither
  narrow master overrides its Device mode, and there is no nested scheme.
- **The deltas, all read off `boundVariables`:**
  - **every string binds `sem/text/1`** — KM BIO, the head, the foot line, About, the paragraph
    and the role line — which is the terracotta `s.ac` where Lime's copy reads `s.tx`. The first
    paper section's first trap was the binding, not the scheme: `ink` is `ed ? s.ac : s.tx`;
  - the head is **one tone** in it, `textTransform: 'uppercase'`;
  - the foot line is **Inter Bold 15**, Grunge's eyebrow arm (`grunge || ed`);
  - the photograph is an **arch with square feet** — radius 361 / 361 / 0 / 0, which CSS clamps
    to the semicircle as Figma does — on `sem/box/3` (`s.box3`, Grunge's), with **no effect at
    all**: Lime's inset glow is gone, and the 1440 frame's outer radius-15 clip draws nothing.
    What it has instead is a **`sem/tag/1/bg` INSIDE stroke, 1px at 1440 and 768 and 3px at
    390** (read off the 390 master, not a leak), drawn on the glow's own overlay as
    `inset 0 0 0 Npx s.chips[0].bg` — `chips[0]` is `T.tags[0]`, the seat the binding names.
    Its hidden lime gradient (`visible: false`) is the twins';
  - `Grain` needed nothing: its `grunge && s.grunge` gate returns null under Editorial.
- **`SealBadge` has an Editorial arm**, `if (s.editorial && !classic)` ahead of the Lime branch,
  so every Editorial caller draws it. `Frame 179` is Lime's geometry once more (the 125.37 disc,
  the 120 ring, the 109.3 name circle, the equator marks at x 12.26 / 88.41) with its own marks,
  every one a scheme key so the footer's Scheme 3 reads its own through the same arm: a
  `sem/active/bg` disc, the ring and both marks **1px** inside strokes of `sem/stroke/1` (opaque
  ink here — trap 1, and what the frame draws), no reticle but the **sparkle** (`GRUNGE_STAR_D` at
  57.78 × 58.32, centred, in `sem/active/text`, drawn as a `<path transform>` inside the seal's
  own SVG rather than a nested `GrungeStar`), and the name in **Space Mono** 10.61 at 30% in
  `sem/bg`, running as Lime's does (lower upright, upper inverted). The marks sit 0.33 units
  below the equator, as the walk puts them. **Space Mono is named in the arm, not through
  `s.mono`**: Sienna Vale states no mono token, and giving `THEMES[3]` one would move the nine
  `s.mono` readers in the pricing, gallery and map, which no session has read under Editorial —
  a later session that finds its frame naming Space Mono can promote it.
- **The seal hangs on Editorial's own centres**, from the walk's `absoluteBoundingBox` (a rotated
  square's box centre is the disc's): **15.73 outside the arch's left edge and 137.73 above its
  foot** on desktop (Lime 11.5 / 166.35), **16.34 past the right edge and 16.68 above the foot**
  at 768 (Lime 16.87 / 25.15), **5.1 inside the right edge and 5.12 below the foot** at 390 (Lime
  5.58 / 0.65), at `tilt` 25.03 (Figma −25.03). Measured in the harness with the spin stopped:
  12.89 / 112.92 at desktop (the frame's × 0.82: 12.90 / 112.94), 16.32 / 16.71 at 768,
  5.11 / 5.13 at 390; a side-by-side crop at 768 matches the frame mark for mark.
- **The head fits its measure**: at 97px "READS" sets 262.7 and "ROOM." 268.1 in the 273.5 flank
  (the frame's flank is 273.9 now that `padX` is the frame's inset, JP-038 — Lime's "255.4" note
  predates it), on three lines at 1440 as the frame breaks it; one line at 768 (547 of 708) and
  at 390 (359.8 of 370) — **but the master's column there is 350**, so the 390 head fits only
  by the inherited pad diff below; a change to `padX` or a longer seeded head wraps it. No
  `titleWordEms` arm was needed. A longer artist's head is unguarded
  at desktop, Lime's case too.
- **Inherited diffs, not Editorial's**: the 390 root pads 10 (JP-038's page inset) where the
  master pads 20, so the arch is 250 wide against 230 (Lime's `0 60px`); the 768 root's 56 top
  against the master's 60.
- **Moved with `SealBadge`, theme 3 only** (digest: 20 of 129 theme-3 renders, zero at themes
  0, 1, 2 and 4, static and live): the bio at layouts 1 and 3, the calendar a0 (desktop and
  768), the footer, and header cards 2 and 4 (arch 5 folds onto 1) — each drew the flat starburst
  and now draws this seal, placed where its branch places it. The footer's reads Scheme 3's keys
  (ink name, paper-56% ring); it and the calendar's (which the plan says the frame does not draw)
  are sections 11 and 8's. **Section 11: read the footer seal's `TEXT_PATH` fill** — the arm
  assumes `sem/bg`, the bio's binding, which under Scheme 3 is ink on the terracotta disc.
- **No live control**: `live=1` digests identical to the canvas at all three widths.

### Settled in section 3 (the media player)

- **No Editorial block: `Media`'s `if (s.v0 && (s.lime || s.grunge))` is `s.limeTree`**, with
  `const ed = s.editorial` naming the deltas beside Grunge's `grunge`. The tree is Grunge's at all
  three widths (the walker, all three masters): the heading row, the five flush rows, the 710 /
  558 grid at 60, the opacity-0 disc spacer, `LimeSkip`, the mount round the card. Its hooks sit
  above the block, so the published player needed nothing (below). Both twins' arms are
  byte-identical: the one shared edit is the heading's `color`, now `ink`, which is `s.tx` under
  both.
- **`ink` is the one switch**: every string but the clocks binds `sem/text/1`, which under Scheme 2
  is paper — `s.ac` — where the twins' copy reads `s.tx` (ink here). So `ink = ed ? s.ac : s.tx`
  feeds `txt`, the heading, the row glyph, the placeholder ink and the card's `color`; the clocks
  bind `sem/text/2` and pass `{ color: s.tx }` — ink on the fade, faint, as the frame draws them.
- **The deltas, all read off the walk** (`boundVariables` resolved to names):
  - rows **112 / 96 / 76.8** (the mount's 560, 480, 384 divided by five), Display/Title **32 / 25 /
    23** through `labelStyle` (Grunge's call, `s.title` being the heading string), the 390 inert
    inset **8.4**; every other row box is the twins';
  - the heading one tone in `sem/text/1`, uppercase — Grunge's two block lines, so the typed break
    after "worth" holds in Noto at every size without an em measure; the second line takes no
    colour of its own;
  - the card **square**, 540 / 540 / 334.6, `s.tx` under the sleeve (the opacity-0 disc's own
    `sem/text/2`), `SCRIM.limeSleeve` (the gradient's transform and its .91 are the twins'), no
    effect; Body/LG over Body/MD; the 390 spacer the frame's **66.6**, not the remainder — the
    master's content runs 9 into the card's foot padding, and so does ours;
  - the transport `sem/tag/1/bg` → `s.chips[0].bg` (blush), the ▶ `s.tx`;
  - the progress bar's track and fill are **both `sem/bg`** — Lime's invisible playhead again — so
    the track is `s.bg` (taupe, the frame's) under `s.pillBg` (blush): Lime's departure, named;
  - the narrow grid gap is **92**, not 32 (room for the 390 tape above the mount);
  - no seams, no grain sheet, no star, no glow; the 390 wrapper's extra `24px 0` is dropped (it
    cleared Lime's arcs and Grunge's tears, and Editorial draws neither).
- **The mount (`Frame 209`)**: `s.chips[0].bg` blush, square, padding **10 on every side at every
  width**, `rotate(2deg)` (Figma −2), and a real **`DROP_SHADOW` `#000` 25% at 6, 6 blur 6** — read
  off `effects`, not inherited from Grunge's empty list — as `boxShadow`, × 0.82 on desktop. No
  clip and no grain: the tape rides over its top edge.
- **Figma spaces the leant mount by its rotated box where it stacks** (memory `figma-frame-reading`,
  the pricing deck's rule, met again): at 768 the frame reserves 584.4 for a 560 print, so
  everything below rode 24 high. The mount takes `margin: 1.745% 0` at 768 and 390 — W·sin 2° / 2
  a side, a percentage margin being the column's width — and the H·(1 − cos 2°) term (under 0.2)
  is dropped. At desktop it is centred beside the list, as the frame's overflows its 560, and
  needs none.
- **The pill is Retro's Soundcloud seat**: `<BookPill label="Soundcloud" ext={s.soundcloud}>`, a
  span while the address is empty, and no `mediaCta` pill — `FIELDS.media.cta`'s `'*': []` row
  already reads "Not shown in this template" here, and the `soundcloud` hint ("in the other
  templates an empty one stays a picture") is right as written. Section 1's "blush with taupe
  type" was the frame's blush with the wrong ink: the label and the disc bind `sem/tag/2/text`
  (ink) and the arrow `sem/active/bg`, so it is `fg={s.tx}`. The instance is **`BookPill`'s branch
  hand-scaled to 0.8 at every width** (4 / 4 / 4 / 16.8, a 36.8 × 35.2 disc, gap 8, 43.2 tall, the
  same box at 1440 as at 390), Label/MD at 1.1 — passed through `disc`, `size` and `style`, no new
  prop.
- **Measured** (harness, `getBoundingClientRect`, against the section root): desktop rows 91.8
  (112 × 0.82), the mount's box (669, 317) against the frame × 0.82 (669.4, 316.8), 457 × 459 with
  a 441 × 443 card, the tape's box (830.1, 311.8) against (830.7, 311.7), the heading 172.7 against
  172.2; at 768 and 390 every box sits off the frame by the root-padding diff alone (−4.9 at 768,
  the root's 56 against the master's 60; +20.5 at 390, 44 against 24) — rows, mount (92 under the
  list), tape and pill alike. The pill runs 145.5 wide against 157.2 (Noto's "SOUNDCLOUD" is
  narrower than Fisterra's; `faceK` 1).
- **Function** (`theme=3&live=1`, puppeteer with `--autoplay-policy=no-user-gesture-required`, at
  1440 and 390): a row click plays its track and marks it Pause, a second click pauses, the disc
  toggles, Next wraps 5 → 1 and Back 1 → 5, the card names the track; with `&cj={"soundcloud":…}`
  the pill is an `<a href="https://soundcloud.com/kai" target="_blank">` live and still a span on
  the canvas. The tape takes no pointer and covers only the card's `<` glyph, which has no handler.
- **Moved, theme 3 only** (digest: exactly `media` arch 0 at three widths, static and live — 3 of
  645 each; zero at themes 0, 1, 2 and 4). No shared helper changed.

### Settled in section 4 (the gallery)

- **No Editorial block: `Gallery`'s `if (s.lime || s.grunge)` inside `if (s.v0)` is `s.limeTree`**,
  still after the seam, with `const ed = s.editorial` and a third arm at the head of `G`
  (Lime's and Grunge's arms untouched). The tree is Lime's node for node at all three widths (68
  / 68 / 68, walked with parent-relative `x`/`y`, `dashPattern`, per-side weights and binding
  names). No nested scheme; the 390 master carries a third mode, `770:2`, which is **Device:
  Mobile** (`get_variable_defs`: 48 / 11 / 13), so every size is an `s.*` read.
- **The deltas, all off `boundVariables`:**
  - **rows** gap **11** (Lime 5, Grunge 4), radius **2**, dashed **5, 5** on all four sides, 1px
    INSIDE — `box/3` on the open row, `stroke/1` on the closed, both opaque ink (trap 1, followed);
    the open row `active/bg` under an **`INNER_SHADOW` 0, 0 blur 4 at .25**, the closed rows'
    drop shadow hidden; the glyph seat an **unradiused** square in 1px of `stroke/1`, the vectors
    at stroke 1 in `stroke/1` (open) and `box/3` (closed) — all ink; the label **Label/MD** (20 at
    1.1, `s.labelMd`), UPPER; the inks and the pluses are Lime's `ink` already;
  - the **heading** one tone in `text/1` across Grunge's positional split, uppercase; the kicker,
    ←, Back link and brand `text/1` (`s.ac`), GALLERY `tag/2/bg` (the same terracotta);
  - the **viewer is a polaroid**: `Frame 183` leans **Figma +1 → CSS `rotate(-1deg)`** (the other
    way from the tape) and carries **one effect, a `DROP_SHADOW` 5, 4 blur 4 at .25** — the "inner
    shadow and a drop shadow" the brief named are the open row's and the card's, one each. Inside
    it a `box/1` card, **padding 20**, radius 0, round a `sem/bg` photograph (545 × 496 / 668 × 485
    / 330 × 305.28); card 536 / 525 / 345.28. The brackets (`14` / `512` at `388`) and the desktop
    counter (`410, 380`, `box/3` chip, `text/1`) keep Lime's numbers, **in the photograph's box**;
  - the **arrow row is a sibling of the polaroid on the lean card**, so it leans with it and is
    not clipped: discs `active/bg` in 1px of `stroke/1` round Lime's own arrow vector in
    `active/text`; 73.6 tall at **238.94** down at 1440 and 768 and **149.14** at 390; flush at
    1440 (0.69 / 0.7), **6.86 past the card's right edge at 768** and 5.29 at 390, followed;
  - the **strip**: square tiles on `sem/bg`, 1px of `stroke/2` idle and **8** on the viewer's tile
    (`u(8)`, 6.6 on the canvas) — the seat mechanism, so the canvas rings slot 3 by
    construction; gap 30 from the card (Lime 10);
  - the **tape** is `tag/1/bg` (`s.chips[0].bg`, blush), SCREEN grain, Figma −3 → CSS +3, a
    sibling of the card in the card-and-strip column, seated by centre off that column's
    top-left: **(299.67, 7.28)** at 1440 and 768 — the same x on both masters, so left of centre
    at 768, as its render shows — and **(177.43, 8.94)** at 390. No un-rotation: its parent is
    upright.
- **The 390 strip is seven tiles, not the seam's window of four.** Lime's and Grunge's 390
  masters draw four 85-wide tiles (read off `989:22110` / `989:22292`); Editorial's draws all
  seven at 44.29. So under `ed` the strip maps the whole `strip` and `shown` / `from` go unread —
  every slot reachable without sliding. One line to reverse, and CLAUDE.md's "Mobile draws four
  of the seven" becomes layout 1's rule under Retro, Lime and Grunge only (the sweep's).
- **Only the 390 master spaces the lean card by its rotated box**: its strip stands at 351.69 +
  30, not 345.28 + 30, and the card's centre is 3.2 below its slot's; the 1440 and 768 masters
  stack the unrotated slot (566 = 536 + 30, 555 = 525 + 30). So at 390 alone the card takes
  `margin: 0.873% 0` — W·sin 1° / 2 a side, section 3's rule.
- **One named departure: the 390 left disc.** The master hangs it 20.88 past the card, which at
  our 10 inset is 10.88 off the page — the 412 render's other overhang, and a live control half
  under the screen edge. It takes the other two masters' **0.69**; the right disc keeps its 5.29.
  `scrollWidth` at 390 live is 390.
- **Measured** (harness, against the section root): desktop card 479 × 440 and well 447 × 407
  (the frame × 0.82: 479.7 × 439.5, 446.9 × 406.7), card box (651, 128.3) against the frame's
  94.2 + the root's 34.1, discs and tape off the card's centre at (−208.75, 10.0) / (6, −213.7)
  against (−209.0, 10.1) / (5.8, −213.8), strip 61.5 × 62.3 at 464.4 below the slot's top
  (464.1); at 768 every box — card, discs, strip, tape — sits on the master's to 0.1 once the
  root's **56 against the master's 30** top inset is taken off (+24.7, inherited, the twins'
  too); at 390 the right disc and tape land on the frame's centre offsets exactly and the strip
  at 381.8 against 381.7, under the same kind of root offset.
- **Function** (`theme=3&live=1`, puppeteer mouse clicks, 1440 and 390): both discs hit-test to
  themselves (the tape covers neither); next steps 3 → 4 and wraps 6 → 0, back 0 → 6, a thumb
  pick moves the 8px ring and the counter, Back to beginning goes to 0; with
  `&cj={"youtube":…}` the YouTube row is a dashed `<a target="_blank">` and the two empty rows
  are gone.
- **Moved, theme 3 only** (digest: exactly `gallery` arch 0 at three widths, static and live — 3
  of 645 each; zero at themes 0, 1, 2 and 4). `DashRule`'s new branch is additive: media's
  caller is unchanged.

### Settled in section 5 (the repertoire)

- **No Editorial block: `Repertoire`'s `if (s.lime || s.grunge)` inside `if (s.v0)` is
  `s.limeTree`**, still after the seam, with `const ed = s.editorial` and a third arm at the head
  of `G` (Lime's and Grunge's arms untouched; the two new leaves, `chipOff` / `chipOffInk` and
  `tileW`, fall back to the twins' values through `??`). The tree is Grunge's in traversal order
  (109 / 109 / 109 visible nodes, the sparkle aside — the paired diff walk against both twins),
  Scheme 3 at all three widths, no nested scheme, no rotation, **no effect on any node**, and
  `Layer_1` an empty frame. Route A resolves every `s.*` read to the ink scheme, so no literal is
  owed but `SIENNA_MEDIA`.
- **The deltas, all off `boundVariables`:**
  - the **search is no box**: no fill, radius 0, and in place of Lime's ring a **dashed 9, 9
    bottom rule** in `sem/stroke/1` (`rgba(246, 240, 232, 0.56)`, passed as the scheme writes it)
    through `DashRule`, the field padded `0 0 14` rather than 10 all round (61 tall, so the tile
    is the content's 47); the tile **49.94 wide, unradiused, unfilled**, in a 1px inset
    `sem/text/1` rule, the glyph `sem/active/bg` — both terracotta; the hint `sem/text/2` (paper,
    `s.tx`), Body/MD, as Lime's;
  - the **chips are filled, not outlined**: All `active/bg` under `text/2`, the idle ones
    **`sem/tag/1/bg`** — Scheme 3's first seat, paper, `s.chips[0].bg` — under **`sem/bg`** ink
    (`s.bg`), Body/MD at 1.5 (Grunge's). **The brief's "trap 3" did not apply here**: nothing in
    the section binds `inactive/bg`, so its transparency never reaches a chip; all three renders
    and the walk agree on paper pills;
  - the **song** is Display/Title **32 / 25 / 23** (the media rows' sizes; Grunge's 36 / 28 / 26
    are Static Youth's) through `labelStyle`, so uppercase, as is the artist (`bebas` is
    `grunge || ed`); the rows are ruled by the same **dashed 9, 9** in `stroke/1`, an overlay, so
    the row pads 27 at its foot too (89 / 82 / 79, the frame's);
  - the **heading** one tone in `text/1`, uppercase — Grunge's two-tone split stays Grunge's;
  - eyebrow, numbers, artist ink, gaps, the 70 column gap and the pager's 8 top are the twins'.
- **The sparkle** is `GrungeStar` at **80.67 × 81.42** (the path's own ratio, 0.56 of it), in
  `SIENNA_MEDIA`, unrotated. **At 1440 it is a child of `headL`**, 63.07 past the heading's box and
  0.13 below its top — so it hangs off the **heading's own end** (the `h2` pads `63.07 + 80.67`
  × 0.82 on its right and the star sits at `right: 0`) rather than at the frame's x: Noto sets the
  harness's "12 SONGS" at 370 where Fisterra's "250 SONGS" is 430, and a longer count carries the
  star along; the padding keeps it in the heading's box, so the search yields to both.
  **At 768 and 390 it is absolute on the section**, centred on the chip row's foot at its right
  end, so it is seated on the chip row (`top` −10.71 / −11, which is the frame's to the pixel
  once the root's top inset is taken off: (657.3, 173.9) against (657.33, 178.29) at 768 under
  our 56 against the master's 60; (305, 219) against (305, 215) at 390 under 44 against 40). The
  row **keeps the star's width free** (`paddingRight` 80.67 / 65), so a chip wraps rather than
  going under it. **One named departure at 390**: the master hangs it 15.67 past its own 20
  inset, which off our 10 would cross the page, so it keeps the frame's **4.33 from the page
  edge** (`right: calc(4.33px - padX)`); `scrollWidth` is 390 live.
- **`Pager`'s Lime branch is `s.limeTree`**, with an Editorial arm: every button unfilled in a 1px
  `sem/stroke/1` ring, the page pills **54 wide** (Lime's and Grunge's 87), and the frame **marks
  its page** — the current pill's ring and numeral `sem/text/1`, terracotta, 1px like the rest —
  where Grunge's marks none (the map's `onBox` precedent: the frame's own mark, followed). The
  numerals are `labelStyle(s, s.labelSm)`, Grunge's; the arrow glyph binds `tag/1/bg`, paper,
  which `LimeArrow`'s `currentColor` (`s.tx`) already is. Two additive keys, `onEdge` and `pill`,
  so the twins' `t` objects are byte-identical.
- **Moved with `Pager`, theme 3 only** (digest: 7 of 645 renders static and 7 live — repertoire a0
  at three widths, the fit, and **repertoire a1 at three widths and map a2 at 390**, exactly Lime's
  and Grunge's spread; zero at themes 0, 1, 2 and 4). Both read: repertoire a1's pills stretch
  across its paper sheet in opaque ink rings (Scheme 1's `stroke1`), the terracotta page marked;
  map a2's arrows are ink rings on its terracotta sheet. Their layout passes'. **The map session
  (a0) inherits the arm** on the terracotta gig panel, where `stroke1` resolves to Scheme 1's ink —
  pass `frame.lime` if the frame's outlined pager pills bind otherwise.
- **Measured** (harness, against the section root): desktop search 319 × 50 (389 / 61 × 0.82),
  tile 41 × 38.5, heading 97px, star 66.1 × 66.8, chips 24.7; 768 search 354 × 61, tile
  49.9 × 47, pills 55 / 54 / 54; 390 search 370 × 61 and the pager spread at 86.5 a button (four
  buttons at the seeded two pages; the master draws five over its twenty).
- **Function** (`theme=3&live=1&n=240`, puppeteer mouse clicks, three widths): Next moves the
  terracotta ring 1 → 2 and the list to 13 (7 narrow); a chip re-derives the pager (20 → 7 pages at
  1440, 40 → 14 narrow) and resets to page 1; a search with no match prints "No songs match that."
  and drops the pager; every chip hit-tests to itself, and the point under the star is the heading
  or the section (it takes no pointer).

### Settled in section 6 (the events map)

- **No Editorial block: `EventsMap`'s `if (s.lime || s.grunge)` inside `if (s.v0)` is
  `s.limeTree`**, after the seam, with `const ed = s.editorial` and a third arm at the head of `G`
  (Lime's and Grunge's arms untouched; the new leaves `kicker`, `globe`, `ring` and `venue` fall
  back through `??`). The tree is Grunge's plus the tape (the walker, all three masters), on
  Scheme 1 at every width, no Device override, no nested scheme — so the root paints it with no
  flag (route A) and `limeLight` stays Lime's. `ink` (`s.bg`) is paper here, so every site outside
  the Lime arm that read it takes an `ed` branch: the wrapper's `color`, the radius label, `disp()`'s
  uppercase, the tile ring.
- **The deltas, all off `boundVariables`:**
  - the **head**: kicker and radius label `text/2` ink (`s.tx`), the heading `text/1` terracotta,
    uppercase; the radius label Display/Title through `labelStyle`, Grunge's call at Sienna Vale's
    **32 / 25 / 23** (`titleSize` now picks per template);
  - the **tile**: `box/3` ink in a 1px INSIDE **`stroke/2`** ring (terracotta, Lime's overlay with
    `G.ring`), unradiused, padded **10 at every width**, gap 0; the map on `box/2` under the raster,
    unradiused, 218.84 at 768 and 298 at 390, the "pink tint" is Lime's own mechanism — a
    MULTIPLY `active/bg` layer at .6, so terracotta over the raster (`FILL`, hash `8cd103b8`); the
    globe `active/bg`, the base line and the terms `active/text` paper;
  - the **panel**: `active/bg`, unradiused, padding **40 / 40 / `30 20 20`**, gap 20, a **7px
    INSIDE `box/2`** ring and a **`DROP_SHADOW` #000 25% at 3, 8 blur 9** (read off `effects`, the
    calendar's blur-9 twin), both in one `boxShadow` × 0.82 on desktop; **Figma −1 → CSS
    `rotate(1deg)`**; no clip. Its head flush and unfilled (no rule — Lime's case);
  - the **rows**: unfilled, unradiused, ruled by `DashRule` **7, 7** in **`s.stroke1`** — opaque ink
    under Scheme 1, trap 1 followed: the frame's dashes on terracotta are black; padding **20 / 0**
    at 1440 and 390, and at 768 the master's fixed 79.48 row with its 57 box centred
    (`11.24px 10px 11.24px 0`). A 0.18° rotation on the 768 rows is a slip, dropped. The venue is
    **Display/Title 32 / 25 / 23 at 1.1** (Lime's and Grunge's Display/List); the date box 56 × 57,
    **square**, `tag/1/text` — `s.chips[0].fg`, the binding's own seat — under `active/text`.
- **Figma spaces the leant panel by its rotated box at every width**, not only at 390 as the
  gallery's is: Frame 190 is 737.16 at 1440 (the panel's box height, which the tile stretches to),
  404 + 657.57 at 768, 425.16 + 50 + 479.39 at 390. So the desktop columns are the frame's
  **633.43 : 658.57** (the panel's box, not two halves) and the panel gives back
  `u(5.58) u(6.29)`; stacked, `0.873% 0` (W·sin 1° / 2). The 390 stack gap is **50** (the twins'
  10), room for the tape.
- **The tape** is the panel's last child: `sem/media` blush (`colour={SIENNA_MEDIA}` — `Tape`'s
  default `s.activeBg` is the panel's own terracotta), Figma −2 → `rotate(2deg)` **inside** the
  leant panel (−3 on the page), seated by centre in the panel's own frame off its local `x`/`y` —
  **(316.71, −7.75)** at 1440 and 768, **(182.77, −5.41)** at 390 — so no un-rotation. Measured:
  (259.5, −6) against the frame × 0.82 (259.7, −6.4); (317, −8); (183, −5).
- **`Pager` needed no edit**: `frame.lime` overrides the Editorial arm to `{ ring: s.stroke1, ink:
  s.bg, idle: s.activeFg, on: s.tx, onEdge: s.stroke1, pill: 87 }` — every button ringed in
  opaque ink (so `onEdge` is the ring, not the repertoire's terracotta), the pills **87** (Lime's;
  the repertoire's are 54), the arrows' glyph `bg` paper, and the page **marked by its numeral
  alone**, `text/2` ink among `active/text` paper ones — the frame's own mark, followed. Lime's
  `grow: !tab` is inherited: the desktop frame's seven buttons overflow its 566 by 12 a side.
- **gigDark is not widened** (session 0's hand-over, closed): the block reads no `g.hue`, `mapBg` or
  `mapFg`. `deep` / `mapBg` (terracotta under Scheme 1) reach nothing here.
- **Two live states the frames do not draw, redrawn** (Lime's rule): the **pin** is Grunge's keys,
  which resolve to paper in a 3px ink ring, lit ink in a 5px paper ring at 16 — a terracotta pin
  would vanish in the tint; the **lit row is paper under ink**, the ink date box still reading on
  it, and since the row is flush the fill **bleeds 12 either side as two offset shadows**
  (`±u(12) 0 0 0`), so the row's box and its dashed rule stay the frame's. The global
  `a:hover { opacity: .72 }` dims a linked lit row under the pointer — app-wide, left alone.
- **Measured** (harness, against the section root): heading 97 / 73 / 48; desktop panel 529 wide
  (646 × 0.82 = 529.7), tile 519 (633.43 × 0.82 = 519.4), rows 79.5 once the 1° lean is taken off
  the box; 768 tile 371.6 (372), map 218.8, rows 79.5; 390 tile 425.6 (425.16), map 298, rows 96.9.
  The seeded page is five gigs at every width (the twins' inherited 390 diff), so no pager is drawn
  seeded — and the desktop tile, stretched to the shorter panel, is 543 tall against the frame's
  737.16 × 0.82 = 604.5 (Lime's "the frame's 686 less its 74 of pager" case). At 768 the tape
  stands left of centre and grazes the tile's ink foot, as the master's does.
- **`FIELDS.map` has no Lime- or Grunge-keyed `in` row**, so nothing was owed (Grunge's section 6
  line, true again).
- **Function** (`theme=3&live=1&n=30`, puppeteer mouse clicks, three widths): a row lights its pin,
  a pin lights its row, Next moves the ink numeral 1 → 2 and the list to venue 6, Prev back finds
  the lit gig still lit; linked rows are `<a>`; every click hit-tests to its target (the tape takes
  no pointer); `scrollWidth` 390 at 390.
- **Moved, theme 3 only** (digest: exactly `map` arch 0 at three widths, static and live — 3 of 645
  each; zero at themes 0, 1, 2 and 4). No shared helper changed.

### Settled in section 7 (pricing)

- **No Editorial block: `Pricing`'s `if (s.lime || s.grunge)` inside `if (s.v0)` is
  `s.limeTree`**, after the seam, with `const ed = s.editorial`, `ink = ed ? s.ac : s.tx` (media's
  switch) and a third arm at the head of `G`. The tree is Lime's node for node at all three widths
  (the walker, all three masters, and the twins' bindings read beside it), on Scheme 2, **no
  effect and no rotation on any node**, no Device override. `tab`, `active`, `shown` and the
  hoisted `chip` are shared whole, so the published filter needed nothing.
- **The deltas, all off `boundVariables`:**
  - **every string binds `sem/text/1`** — paper, `s.ac` — where the twins' copy binds `text/2`: the
    name, £, unit, blurb, features and small print take `ink`; the ✓, numeral and heading already
    read `s.ac`. The **ico turns round**: `text/2` box (`s.tx`, ink) under `text/1` type, at a raw
    radius **4** (Lime's leaf; Editorial's `radiusChip` is 6, Grunge's reading of it not shared);
  - the **card is filled** — `sem/box/3`, `#A18A7E`, a step under the taupe — at **radius 0**, under
    `DashRule side="all"` **8, 8** in `stroke/1` paper (× 0.82 on desktop). The panel's radius 12
    has no fill and draws nothing;
  - **the featured seat draws nothing** (D1's *the glow is a seat*): the three cards are one card
    in walk and render, so `G.ring` and `G.lit` are both `undefined` and `i % 3 === 1` reaches
    nothing under Editorial;
  - the **idle chips bind `sem/bg`**, the taupe itself, in a 1px INSIDE `stroke/1` ring (an inset
    `boxShadow`) under `text/1` paper; the lit one binds `tag/1/bg` under `text/2`, which is
    `s.pillBg` / `s.activeFg`'s blush and ink already — the binding differs from the twins', the
    value does not. **The brief's trap 3 did not apply**, the repertoire's finding again: nothing
    binds `inactive/bg`;
  - the **heading** one tone in `text/1`, uppercase, in a **FIXED 578.4 box at 1440 and 768**
    (Lime 640, Grunge 597.53; the twins' 768 is `100%`), so `maxWidth` is `G.headW` at both. Noto
    breaks the 768 and 390 heads as the frames do, and the desktop one a word later ("…THAT'S RIGHT
    / FOR YOUR NIGHT" against "…THAT'S / RIGHT FOR…") — the face's measure, `faceK` 1;
  - **the 390 head has no gap**: its column is `SPACE_BETWEEN` on a hugging height, so Figma's 24
    is auto and the chips sit flush under the heading (the master's 60 + 33 = 93). Under `ed && s.mob`
    the column's gap is 0; the twins keep 24.
- **The Book pills are Scheme 1 inside Scheme 2** (the page's one nested scheme): `box/3` `#141414`
  fill, `text/1` `#C86E52` type, `tag/1/bg` `#E6B6A0` disc, the arrow `box/3` — named literals
  (`PILL` in the block). Every box is `BookPill`'s Lime branch at every scale (5/5/5/21, 46 × 44,
  `s.list` 24 / 19 / 18, `full` at 390); only the disc's fill parts from the type, so **`BookPill`
  gained `discBg`** (Lime branch, additive; no other caller passes it). The arrow is `bg` already.
- **The root draws the instance's own stroke: `editorialRule`** (`s.pr && s.v0 && s.editorial`,
  beside `grungeRule`), an inset 1px `s.stroke2`, blush under Scheme 2. Of Editorial's eleven
  layout-1 roots only pricing's carries a visible all-round stroke, at all three widths (the
  footer's is a top-only paper rule, section 11's); both twins' are hidden or Grunge's own.
- **One named departure: the third card's ink.** The frame binds card 3's name, £, unit, blurb and
  features `text/2` — ink — at all three widths, which is the twins' binding on **all three** of
  their cards: the designer overrode cards 1 and 2 to `text/1` and missed the third. Drawing it
  would make the ink a seat (a filter moves it onto whatever stands third) for a mark no frame
  means, so every card is paper. Open question 9.
- **Measured** (harness, against the section's content edges): desktop heading 474.3 wide (578.4 ×
  0.82) on two lines at 74 (90 × 0.82), deck 100.2 under the head (122 × 0.82), cards 338.7 ×
  413.7 (338.9 × 415.7), pill 44.3; 768 heading 578.4 on two lines, chips at 96 (96), deck at 163.6
  (164), cards 222.7 × 458 (the panel is FIXED 461 there); 390 chips at 60 (60), deck at 125.1
  (125), cards 376.6 / 401.4 / 416.5 (377 / 417 / 417) — the second card's blurb fits one line in
  our 282 content width against the master's 262, the 10-against-20 page inset inherited again.
- **Function** (`theme=3&live=1&n=8`, puppeteer clicks, 1440 and 390): All / Solo / Band filter
  8 → 4 → 4 → 8, the lit chip reads blush under ink and the idle ones taupe under paper, every chip's
  cursor is live, every pill is `<a href="#form">`; `n=0` prints *No packages yet.*
- **Moved, theme 3 only** (digest: exactly `pricing` arch 0 at three widths, static and live — 3 of
  645 each; zero at themes 0, 1, 2 and 4). `discBg` moved nothing else.
- **`FIELDS.pricing` has no Lime- or Grunge-keyed `in` row**, so nothing was owed (Grunge's section 7
  line, true again).

### Settled in section 8 (the booking calendar)

- **No Editorial block: `Calendar`'s `if (s.lime || s.grunge)` inside `if (s.v0)` is
  `s.limeTree`**, after the seam, with `const ed = s.editorial` and a third arm at the head of `G`
  (Lime's and Grunge's arms untouched; the new leaves `num`, `cellRing`, `rule`, `headW` and
  `photoPad` fall back through `??`). The tree is the twins' plus the tape (the walker, all three
  masters), on Scheme 1 at every width, the narrow masters in their page's Device mode (`770:1`,
  `770:2`), no nested scheme. Every size is the ramp's — Display/MD 64 / 45 / 36, Display/SM
  45 / 36 / 30, Inter `bodyLg` 16 / 15 / 15 and `bodyMd` 14 / 13 / 13, Chakra Petch `labelXs`
  20 / 14 / 12 — so colours, rings, radii, the print and the tape are the whole diff. `at`,
  `month`, `cur`, `line` and `step` are shared whole, so the published controls needed nothing.
- **The seal is gone by construction**, closing section 2's hand-over: Editorial fell through to
  Retro's branch, whose `stack` draws `SealBadge` at `!s.mob`; once the Lime block returns for
  Editorial, `stack` is never reached. No `ed` gate was needed. The frame draws no seal.
- **Trap 1 is per node here** — five `stroke` reads, split by binding:
  - the **panel has no stroke and no radius** (`G.ring` null gates the overlay span off,
    `panelR` 0) — the twins' 3px ring is theirs;
  - the **month discs** are unfilled in 1px `stroke/1` — **ink**, trap 1 followed — round the
    arrow in `text/2` (`s.tx`);
  - the **idle cells** are unfilled, square, in 1px **`stroke/2`** (terracotta, `G.cellRing`),
    the numeral `text/1` (`G.num`, `s.ac`) where the twins' is `s.tx`;
  - the **picked day** is `active/bg` under `active/text` — `s.activeBg` / `s.activeFg`,
    terracotta under paper — and its ring turns to **`stroke/1` ink**; no effect;
  - the **halves' divider and the foot's top rule** are `stroke/2` (`G.rule`), the twins'
    `stroke/1`. Day names, the month, the heading and the foot line are all `text/1`.
- **One named departure: the divider at 768 and 390.** The twins' stacked divider lay under their
  panel ring; Editorial's panel has none, so both narrow masters show the grid half's right stroke
  running down the panel's right edge and stopping at the grid's foot — the desktop divider
  leaking. Read as a defect and not drawn (Lime's `s.narrow ? undefined` kept). One line to
  reverse.
- **The photograph is a leant print (`Frame 204`), not the twins' stretched well**: the half pads
  **40** (Lime 20) and centres a fixed box — the content width (584 / 628 / 290) by a stated
  **446 / 446 / 228** — at Figma −2 → `rotate(2deg)`. Its 10px INSIDE `box/2` stroke (`#EDE6DC`)
  is drawn as `padding` on an `s.box2` ground round an inner clip; one **`DROP_SHADOW` 4, 5 blur
  9 at .25** (`effects`, × 0.82 on desktop — the map panel's blur-9 twin, but offset 4, 5 where
  the map's is 3, 8); no radius and no clip, so the tape rides over. **No rotated-box margin is
  owed**: the half centres the print's rotated box, whose centre is the unrotated box's — the
  walk's `y` 29.95 / 29.18 / 35.01 are exactly (half − rotated height) / 2. The CROP source is
  seeded at the desktop crop (1.309); the 768 box (1.408) covers it, where Figma's CROP would
  stretch — invisible at this ratio.
- **The tape is `Tape`'s default** — `active/bg`, terracotta under Scheme 1 — so no `colour`
  (the brief's question: confirmed off the binding). It is the print's last child at Figma −1 →
  `rotate(1deg)` inside the print (−3 on the page), seated by centre in the print's frame with
  section 6's formula: **(302.67, 3.45)** on the 1440 and 768 masters (the same x, so right of
  centre at 1440 and left at 768, as both renders show) and **(140.84, −4.92)** at 390.
- **The head** is `disp()` widened to `grunge || ed` — `faced` is the identity, so the heading and
  the month only gain the capitals — and held to the frame's **FIXED 578.4 at 1440 and 768**
  (`G.headW`, pricing's finding again), `100%` at 390, where the master's 578.4 box overruns its
  370.
- **The foot keeps Retro's `BookPill`** in the Lime branch's defaults, terracotta under paper with
  a paper disc; the frame draws none (the twins' diff). Foot 109.9 / 134 / 149 against the
  frames' 101 / 100 / 100.
- **Measured** (harness, against the section root): desktop heading 474.3 wide (578.4 × 0.82),
  cells 61.3 × 45.8 (74.86 / 55.89 × 0.82), print 479 × 366 (478.9 × 365.7) centred 32.6 into a
  431.3 half (the frame's 40 × 0.82), tape at (163.7, −20.1) in the print (u(199.67), u(−24.55));
  768 cells 81.1 × 55.9, print 628 × 446 at 40 into the 526 half, tape (200, −24); 390 cells
  **48.3 × 50.5 — the frame's exactly** (our 10 inset is the master's here, so the twins' "346
  panel against 370" note does not apply), print 290 × 228, tape (38, −33). The root's top insets
  (80 / 56 / 44 against the masters' 98 / 100 / 60) are the inherited diff.
- **Function** (`theme=3&live=1&today=2025-06-10&booked=2025-06-14,2025-06-24`, puppeteer clicks,
  1440 and 390): a pick moves the fill and the line ("Enquiry for Friday, June 20…"), a re-click
  falls back to the cued 12th, the booked 14th and the past 5th take no click; **booked and past
  both dim to .38 with no strike** — Lime's state is the frame's (it dims Lime's own six days, 2,
  6, 14, 24, 27, 28) and reads on `#FFF9F2`; 19 cells carry a pointer (30 − 9 past − 2 booked);
  both discs hit-test to themselves, Next goes to July, Back wraps to May 2026 and twelve more
  come round to it; the pill is `<a href="#form">`. A six-row month grows the grid, never the 308
  photo half at 390.
- **`FIELDS.calendar.heading`'s `in` gained `Editorial: [0, 1, 2, 3]`**, measured, not copied:
  `scripts/reach.mjs` gained a `calendar.heading` probe, which reports all four layouts under
  themes 1, 2 and 3. The `image` hint's "polaroid stack" is Retro's wording (the sweep's).
- **Moved, theme 3 only** (digest: exactly `calendar` arch 0 at three widths, static and live —
  3 of 645 each; zero at themes 0, 1, 2 and 4). No shared helper changed.

### Settled in section 9 (the enquiry form)

- **No Editorial block: Lime's `if (s.v0 && (s.lime || s.grunge))` ahead of `EnquiryForm`'s
  `if (s.v0)` is `s.limeTree`**, with `const ed = s.editorial` and a third arm at the head of `G`
  (Lime's and Grunge's arms untouched; the new leaf `boxH` falls back through `??`). The tree is
  Grunge's less its grain sheet and two tears (the walker, all three masters, bindings resolved),
  on Scheme 3 at every width, no Device override. The live seam is hoisted above the block, so the
  published boxes, chips, submit and sent state needed nothing. Session 0's *the submit has lost
  its fill* closes by construction — Retro's branch, whose shell painted it, is no longer reached
  (the calendar seal's precedent).
- **The form half carries no nested scheme**, where both twins' is Scheme 3 (`187:8`) — the root
  is already Scheme 3, and the only `explicitVariableModes` on all three masters are the root's.
  So route A resolves every read and the block owes **no literal but `SIENNA_MEDIA`** (the
  avatar's `sem/media` backdrop). **Trap 3 did not bite, the fifth section running**: nothing binds
  `inactive/bg`; the idle chips are simply unfilled.
- **The deltas, all off `boundVariables`:**
  - **every string binds `sem/text/2`** (paper, `s.tx`) — brand, kicker, statement, ✓, promises,
    labels, placeholders — but the picked chip's type and the pill's label, which bind `text/1`
    (`s.ac`);
  - the **shell** is unfilled (its `sem/bg` fill is hidden), **radius 0**, dashed **16, 16** in
    `stroke/1` (`DashRule side="all"`, × 0.82 on desktop) and **padded 20** round both halves —
    the twins' shell pads nothing;
  - the **context half** is unfilled; the **form half** `active/bg` (`s.ac`), square;
  - **each box is no box**: two fills whose top one is the half's own `active/bg`, no radius, no
    padding, over a **dashed 7, 7 bottom rule** in `stroke/1` — a `DashRule` on the field's
    column, whose foot is the box's (the box is its last child), so an `<input>` needs no overlay
    of its own. **60 / 60 / 40 tall**; the message 134 / 134 / 100, its placeholder at the
    top-left;
  - the **pair stands 62 apart** at 1440 and 768 (the twins' 12); stacked at 390, 10;
  - **two label sizes**: the boxes' labels are Display/List (24 / 19 / 18 at 1.2, the twins'
    `label()`), but **EVENT TYPE and MESSAGE are Label/MD** (20 / 14 / 13 at 1.1, `UPPER`) — the
    block's new `minor()`, `labelStyle` with wrapping allowed;
  - the **chips**: the picked one `tag/1/bg` (paper, `s.chips[0].bg`) at a raw radius **5** under
    `text/1`; the idle ones unfilled inside a **dashed 5, 5 at a raw radius 3**, under paper;
    Body/MD at 1.5 (Grunge's `small`); pad 5 / 11, 8 apart, wrapping at 390 as the frame does;
  - the **pill** is `sem/bg` ink under a `text/1` terracotta label, the disc `active/bg` round a
    `tag/1/bg` paper arrow — `pillBg` / `pillFg` / `discFg` in `G`, `BookPill`'s Lime numbers
    unchanged;
  - the **brand** is Label/MD `UPPER` (Grunge's arm, `grunge || ed`); the avatar sits on
    `sem/media` blush.
- **The statement stands centred in its half at 1440.** The desktop head block (`Frame 205`) is a
  fixed 210 box with no layout, and its heading hangs at y 176 — which puts the heading's middle at
  **305.5 of the 611 half, the half's own middle** to the pixel. So under `ed` the desktop context
  half is a **`1fr auto 1fr` grid**, the head block `display: contents`: the credit row at the top
  of the first track, the promises at the foot of the third, and a longer statement eating both
  tracks evenly. Narrow, the head block is laid out (`V/10`: the statement 10 under the credit)
  and the promises stand 20 below — the twins' 768 `0` gap and 210 minimum are theirs.
- **The statement is fitted to its widest word, not broken inside it.** It is the mode's first
  hand-scaled Bold (trap 4): **50.36 on a 42.75 line at every width** — the same size on the
  narrow masters, so the desktop is × 0.82 and the narrow ones verbatim — in a FIXED 262.7 box,
  where Fisterra breaks **UNFORGETT / ABLE** inside the word. Noto Bold (700, from the pinned
  entry) sets UNFORGETTABLE. at **386.9** at that size, past the 1440 column (340) and the 390
  one (270 on the master, 290 here), and "YOUR NIGHT" at 270.5, past the box itself. Breaking
  inside the word would reproduce the demo face's measure rather than the design, so the size is
  **`min(frame size, calc(100cqi / s.titleWordEms))`** on an `inline-size` context column — the
  header title's recipe — and the box is `max-width: 262.7` with `min-width: min-content`, so it
  grows to the widest word. `vm.titleWordEms` gained an Editorial arm in **Noto Bold ems**:
  `notoBoldEms()` in `data.js` is `notoEms()` × **1.045**, the largest Bold / 540 ratio measured
  on the seed's lines (LET'S MAKE 1.045, YOUR NIGHT 1.041, UNFORGETTABLE. 1.040). Its only other
  reader is Lime's layout-3 form, gated on `s.lime || s.grunge`. The line height keeps the frame's
  ratio (0.849) so it follows the fit. The frame's typed break after "Let's make" is Grunge's
  positional split, shared (`grunge || ed`).
  - **So any statement fits**: more words take more lines, a longer word a smaller size, and the
    frame's size is the ceiling. Seeded, it sets **36.1 on three lines at 1440** (the frame's
    41.3 on four), **50.4 on three lines at 768** (the column is wide enough; 128 tall against
    the frame's 171, so the stacked context half is 43 shorter), **37.6 on three lines at 390**.
    Open question 11.
- **The refused box is redrawn** (Lime's rule): the idle mark is a 56% dashed hairline, so a
  refusal changes colour, weight and dash at once — the dashes go and a **solid 2px inset rule of
  full paper** (`inset 0 -2px 0 s.tx`) takes their place, under the twins' prompt line in paper.
  A rule under a square box does not smear, so no ring. The brief's "must read on ink": the boxes
  stand on the terracotta half, not the ink, and it reads there.
- **Named diffs**: the frame's submit types *Enquire* where `vm.formBtn` seeds *Book Now* (the
  twins' diff, a third time); the root's vertical insets are the inherited diff (80 / 56 / 44
  against the masters' 120, 30 over 60, 24 over 40), with no seam to justify Grunge's `G.pad`, so
  the shell stands 18.4 higher on the desktop canvas than the frame's × 0.82.
- **Measured** (harness, against the section root): desktop shell 1088.2 × 532.7 (1328 / 651 ×
  0.82 = 1089 × 533.8), context 344.4 wide, form half 711 × 499.9 (868 / 611 × 0.82 = 711.8 ×
  501), boxes 297.3 × 49.2 (363 / 60 × 0.82), pair gap 50.8, chips 24.7 (the ramp's `bodyMd` 11,
  Grunge's figure), message 109.9, pill 44.3, the statement's centre on the half's (346.3 both);
  768 shell 708, form half 555.9 (556), context 344.8 (389 less the statement's lost line); 390
  shell 370 (the page inset's 10 against 20), form half 670 (672), boxes 40, message 100, pill 54,
  *Other* on the chip row's second line as in the frame.
- **Function** (`theme=3&live=1`, puppeteer clicks and typing, 1440 and 390): an empty submit
  marks all four boxes with the solid rule and prints the prompt; typing clears each; *Party*
  moves the mailto subject to *Party enquiry* with the four answers in the body (read off
  `getAttribute('href')`); a valid submit under a capture-phase `preventDefault` swaps in the sent
  block; *Write another* restores the values; the pill is `<a href="mailto:…">` with a pointer.
- **`FIELDS.form` has no template-keyed `in` row**, so nothing was owed.
- **Moved, theme 3 only** (digest: exactly `form` arch 0 at three widths, static and live — 3 of
  645 each; zero at themes 0, 1, 2 and 4). No shared helper changed; `titleWordEms`' new arm has
  no other reader under Editorial.

### Settled in section 10 (the testimonials)

- **No Editorial block: `Testimonials`' `if (s.lime || s.grunge)` inside `if (s.v0)` is
  `s.limeTree`**, still after the seam, with `const ed = s.editorial` and a third arm at the head of
  `G` (Lime's and Grunge's arms untouched). The tree is the twins' node for node at all three widths
  (the walker, all three masters and the Grunge twin): two backs, a card, an arrow row, `Layer_1`
  hidden. Scheme 1 at every width, the 390 master in **Device: Mobile** (`770:2`), no nested scheme
  — Grunge's card and dark back carried Scheme 9 / 7 overrides, Editorial's carry none. `n`, `at`,
  `q`, `go`, `paging` and `step` are shared whole, so the published arrows needed nothing.
- **The deltas, all off `boundVariables`:**
  - **no radius and no effect on any node** — the card and both backs are square (`G.r` 0) and the
    twins' `DROP_SHADOW` 0 / 4 / 4 is gone (`shadow` undefined under `ed`);
  - **all three are dashed 9, 9 all round in `stroke/1`**, opaque ink (trap 1, followed — the
    brief's worry that the backs' ink might not be `stroke/1` is closed): one `DashRule side="all"`
    per box, × 0.82 on desktop, radius 0;
  - the **card is `sem/bg`** — the page itself, so the dash is the only thing parting it from the
    ground, as the frame draws it; the first back `active/bg` (`s.ac`, the twins' seat), the second
    **`tag/1/bg`** blush (`s.chips[0].bg`) where Lime's is Scheme 2's `box/2` and Grunge's `#353535`;
  - **every string binds `text/2`** — eyebrow and quote ink (`s.tx`), one tone, uppercase (`grunge
    || ed`);
  - the **reviewer pill** is `active/bg` under **`text/2`** ink (`[s.activeBg, s.tx]`; Grunge's
    `s.activeFg` would be paper here), the **role pill `box/3`** ink under `text/1` terracotta
    (`[s.box3, s.ac]`; Grunge's `s.bg` would be paper on paper); both Display/Title **32 / 25 / 23**
    through `labelStyle`, radius 12 and pad 6 / 12 kept;
  - **the arrows needed nothing**: a 1px `stroke/1` ring (ink) round a `box/3` glyph, which is
    `s.tx`'s value — Lime's `ring()` as it stands.
- **The narrow backs and the card's place are the masters' own** (desktop is the twins' exactly):
  `[top, left, right, bottom]` off the card — 768 terracotta −46 / 31 / 35 / 137, blush −27 / 14 /
  14 / 85; 390 terracotta −45.66 / 36 / 39 / 122.66, blush −24.66 / 24 / 24 / 78.66. The card
  stands 146.5 down and 100.5 up the 768 band, 146.16 down at 390 with the arrows 32.84 under it
  and 138 over the foot — the wrap centred in the fixed 730. The bottom insets run large because
  the frames' Bold-quote cards are tall; on the shortest seeded review they stay positive. The 390
  bleed to x 13 and the arrows' `marginBottom` (20 / 46, centring on the wrap) are Lime's.
- **The quote is the second hand-scaled Bold, fitted to its widest word** (section 9's recipe,
  open question 11): **57.84 Bold on a 52.42 line at 1440 and 768, but the ramp's Display/MD
  Regular 36 at 1 at 390** — the 390 master is not hand-scaled (and prints the DEMO marks for its
  `"`, trap 5; Noto prints real ones). So the size is `min(ceiling, calc(100cqi / q.wordEms))` on an
  `inline-size` column, `fontWeight: 700` and the 0.906 ratio at 1440 and 768 only, and at desktop
  the frame's FIXED **560.33** box as `max-width` over `min-width: min-content`. **`vm.titleWordEms`
  does not reach it** — the quote is `vm.quotes[].quote`, not `vm.title` — so `sectionVm` gained
  **`vm.quotes[].wordEms`**, `notoBoldEms`' maximum per review, Editorial only (undefined for the
  others, whose DOM it never reaches). The ems are Bold's at 390 too (over, never under), and `"`
  is not in `NOTO_EM`, so it counts at the 0.448 default — over again.
  - **Seeded, the fit bites at 768 alone**: `"PROFESSIONAL` is 6.975 em, 403.4 at 57.84 against
    the 364 column, so the quote sets **52.19 on the frame's own five lines** (the breaks match,
    the size does not). The card is 455.6 against 483, the band **702.6 against 730**, and the
    arrows centre 13.7 higher, on the shorter wrap. At 1440 it is the ceiling (47.4, 330.8 of
    459.5), three lines as the frame breaks them; at 390 the ceiling (36, 251 of 264), four lines.
  - A long word (`INCOMPREHENSIBILITIES`) pulls it to 46.7 / 33.5 / 24.3 with the desktop box
    grown to the 508 column, and nothing overflows at any width.
- **Named diff: the 390 pills wrap to two rows.** The frame's `tag-row` is a no-wrap row hugging
  **277 in a 264 slot** — it overflows the card's content box by 13, into the padding — and Noto
  sets the seed's "HANNAH L." at 130.3 (Fisterra's "Hannah L", no period, 116) and "PRIVATE HOST"
  at 157.7 (153), 296 in all. The twins' row is `flexWrap: 'wrap'` (content), kept: the frame's
  overflow is followed by wrapping, not reproduced. The card is 404.9 against 359 and the band
  **775.9 against 730**; the backs follow the card.
- **Measured** (harness, against the section root): desktop band 598.6 (730 × 0.82), card 590.4 ×
  344.4 at (294.8, 135.3), backs 511.7 × 321.4 and 556 × 348.5 at −37.7 / −22.1 above it, quote
  459.5 wide on three lines, pills 38.6 (47 × 0.82) at 26.2px, arrows 45.1 × 44.3 centred at 299.3
  (365 × 0.82); 768 card at (152, 146.5), backs at 31 / 14 in, pills 39.5 at 25px; 390 card 364 at
  (13, 146.2), backs at 36 / 24 in, quote 264 on four lines, pills 37.3 at 23px, arrows 32.84 under
  the card. Every x and y is the frame's (× 0.82 at desktop): `pad()` already takes `padY` off, so
  no inherited root-inset diff this time.
- **Function** (`theme=3&live=1`, puppeteer mouse clicks, 1440 and 390): Next walks all five reviews
  and wraps 5 → 1, Back wraps 1 → 5, both arrows carry a pointer and hit-test to themselves; at 390
  the arrow row rides up and down with each review's card, so a click must re-read its position
  (the twins' behaviour). `n=1` draws no arrows, `n=0` prints *No reviews yet.* in ink.
- **`FIELDS.testimonials` has no template-keyed `in` row**, so nothing was owed.
- **Moved, theme 3 only** (digest: exactly `testimonials` arch 0 at three widths, static and live —
  3 of 645 each; zero at themes 0, 1, 2 and 4). No shared helper changed; `wordEms` is read by
  this block alone.

### Inherited and used

*(Append one line each time a session leans on a bullet from Lime's, Grunge's or Retro's
Conventions, naming the plan it came from, a blank line between sections. The sweep folds it into
[`../CONVENTIONS.md`](../CONVENTIONS.md).)*

Session 0:
- *Load a Google Font the frames name; substitute only on a user call* (memory `load-figma-fonts`;
  Grunge 1, decision 1) — asked, and the user delegated the pick.
- *A stand-in face is scaled to the frame's glyph size* (Grunge 1, section 1) — measured, and it came
  out 1; `faced` became per-template (`s.faceK`) rather than Grunge-gated.
- *Casing stays the theme's; an all-caps face's strings take `textTransform` per site* (Grunge 1,
  session 0).
- *Under Lime `pillBg` IS the accent* (Lime 1, session 0) — Scheme 1's `activeBg`, the form's submit.
- *The digest is committed* (Lime 1, session 0) — five themes, static and live, for both commits.
- *Read a fill's `scaleMode` before believing its `imageTransform`* (Grunge 2, section 1) — the
  calendar's `CROP`, the page's only one.
- *Read a section node, never the desktop page, for variables* (Grunge 1) — the scheme walk.

Section 1:
- *The gates are the template's flag, the named pairs, and `s.designed`* (Grunge 1, decision 2) —
  `s.limeTree` at six sites, `s.editorial` for the deltas; nothing else widened.
- *Check a narrow master's Device mode before trusting `s.*` on it* (Lime 1, section 1) — the 390
  hero is Tablet: `tk`, and the name's 25.
- *The node walker* and *the paired diff walk* (Grunge 2) — all three masters, by traversal order.
- *A scheme that did not move can still move the binding* (Grunge 3) — the chips' `boundVariables`.
- *Every glow is a guess until the node's `effects` confirm it* (Lime 1) — the one effect is the
  capsule's `BACKGROUND_BLUR`, dropped: its fill is opaque.
- *`BookPill` has a Lime branch* (Lime 1, section 1; D1) — no props needed under Scheme 3.
- *Under Lime `pillBg` IS the accent* (Lime 1, section 1) — cards 2 and 3's `mustard`, and the
  burger panel.
- *`vm.title` shadows the ramp's `title` size* (Lime 1, section 6) — the wordmark's `26.2px` / `25px`.
- *Casing stays the theme's; an all-caps face's strings take `textTransform` per site* (Grunge 1,
  session 0) — `Title`, `Wordmark`.
- *One five-theme digest is the whole proof for a shared-helper change* (Lime 1, sweep) — static
  and live, 645 renders each.
- *The whole-page published check is one puppeteer script* (Lime 1, sweep) — `page-check.mjs
  Editorial 0,1,2,3`.

Section 2:
- *The gates are the template's flag, the named pairs, and `s.designed`* (Grunge 1, decision 2) —
  `Bio`'s block to `s.limeTree`, `SealBadge` an `s.editorial` arm ahead of Lime's.
- *The node walker* (Grunge 2) — all three masters, with bound-variable names added.
- *A scheme that did not move can still move the binding* (Grunge 3) — every string on
  `sem/text/1`, not Lime's `text/2`.
- *Every glow is a guess until the node's `effects` confirm it* (Lime 1) — none: the arch's glow
  is gone, a 1px / 3px inside ring in its place.
- *A frame's inside stroke is an inset `boxShadow`, on an overlay* (Lime 2, section 1) — the
  arch's ring on the glow's overlay.
- *Place a seal by its disc's centre* and *measure anything under `.seal-spin` with the animation
  stopped* (Lime 1, section 2) — `absoluteBoundingBox` centres, reduced motion.
- *A rotated group's metadata x/y is a bounding box* (memory `figma-frame-reading`) — the
  metadata's 614.07 at 768 against the walk's 561.02.
- *Casing stays the theme's; an all-caps face's strings take `textTransform` per site* (Grunge 1,
  session 0) — the head.
- *Theme 1 is the digest at risk in a widened block* (Grunge 1, section 2) — zero at 0, 1, 2 and 4.
- *One five-theme digest is the whole proof for a shared-helper change* (Lime 1, sweep) —
  `SealBadge`.

Section 3:
- *The gates are the template's flag, the named pairs, and `s.designed`* (Grunge 1, decision 2) —
  `Media`'s block to `s.limeTree`, `ed` beside `grunge`.
- *The node walker* and *the paired diff walk* (Grunge 2) — all three masters, with `dashPattern`,
  per-side stroke weights and bound-variable names added.
- *A scheme that did not move can still move the binding* (Grunge 3) — every string on
  `sem/text/1`, the pill's ink on `sem/tag/2/text`.
- *Every glow is a guess until the node's `effects` confirm it* (Lime 1) — the mount's real drop
  shadow; the card's glow gone.
- *A section whose live seam is hoisted above its branches can always take a block* (Lime 1,
  section 3) — the player needed nothing.
- *An opacity-0 node is a spacer* and *a stated list height is a column minimum* (Lime 1, section
  3) — 252 / 252 / 66.6, and 560 / 480 / 384.
- *`vm.title` shadows the ramp's `title` size* (Lime 1, section 6) — the row names 32 / 25 / 23.
- *Figma auto-layout spaces a rotated child by its rotated bounding box* (memory
  `figma-frame-reading`) — the stacked mount's margin.
- *A rotated group's metadata x/y is a bounding box* (memory `figma-frame-reading`) — the tape and
  the mount from `absoluteBoundingBox` and the node's own origin.
- *`BookPill` has a Lime branch* (Lime 1, section 1; D1) — hand-scaled through `disc`, `size`,
  `style`.
- *Casing stays the theme's; an all-caps face's strings take `textTransform` per site* (Grunge 1,
  session 0) — the heading.
- *Theme 1 is the digest at risk in a widened block* (Grunge 1, section 2) — zero at 0, 1, 2 and 4.

Section 4:
- *Where the seam lives inside the branch, the block goes after the seam* (Lime 1, section 4) —
  `strip`, `active`, `go`, `srcRows` shared whole; `shown` / `from` unread under `ed`.
- *The `G` lookup at the block's head, whose twin's arm is today's literals* (Grunge 1, sections
  4–10) — a third arm ahead of Grunge's.
- *The node walker* and *the paired diff walk* (Grunge 2) — all three masters, with
  parent-relative `x`/`y`, `dashPattern`, per-side weights and binding names.
- *Every glow is a guess until the node's `effects` confirm it* (Lime 1) — one effect on the card,
  one on the open row; the brief's "two on the card" was two nodes.
- *A frame's inside stroke is an inset `boxShadow`, on an overlay* (Lime 2, section 1) — the
  strip's 1 / 8 ring; the dashed rows through `DashRule` instead.
- *Leaked tops are followed where they show* and *a leak that shows and reads as a defect is
  overridden* (Lime 1, section 4; Grunge 1, section 4) — the 768 disc's 6.86 followed, the 390
  left disc's 20.88 overridden.
- *Figma auto-layout spaces a rotated child by its rotated bounding box* (memory
  `figma-frame-reading`) — at 390 only; read per master, not assumed.
- *A rotated group's metadata x/y is a bounding box* (memory `figma-frame-reading`) — the card's
  and the tape's centres from their own origin and rotation.
- *Casing stays the theme's; an all-caps face's strings take `textTransform` per site* (Grunge 1,
  session 0) — the heading, the labels.
- *Theme 1 is the digest at risk in a widened block* (Grunge 1, section 2) — zero at 0, 1, 2 and 4.

Section 5:
- *Where the seam lives inside the branch, the block goes after the seam* (Lime 1, section 4) —
  `active`, `filtered`, `pg`, `shown`, `columns`, `labels` shared whole.
- *The `G` lookup at the block's head, whose twin's arm is today's literals* (Grunge 1, sections
  4–10) — a third arm; new leaves fall back through `??`.
- *The paired diff walk* (Grunge 2) — against both twins, by traversal order, bindings resolved.
- *A scheme that did not move can still move the binding* (Grunge 3) — the idle chips on
  `tag/1/bg` under `sem/bg`, which the brief had read off `inactive/bg`.
- *Every glow is a guess until the node's `effects` confirm it* (Lime 1) — none on any node.
- *`Pager` has a Lime branch, `BookPill`'s shape* (Lime 1, section 5; D1) — an Editorial arm,
  the map's `onBox` precedent for marking the page the frame marks.
- *The 768 halves take `flex: 1 1 50%`* and *the search pill's ring is an inset `boxShadow`* (Lime
  1, section 5; D1) — the first kept, the second replaced by `DashRule` under `ed`.
- *`vm.title` shadows the ramp's `title` size* (Lime 1, section 6) — the song's 32 / 25 / 23.
- *Leaked tops are followed where they show* / *a leak that shows and reads as a defect is
  overridden* (Lime 1, section 4; Grunge 1, section 4) — the 390 sparkle kept on the page.
- *One five-theme digest is the whole proof for a shared-helper change* (Lime 1, sweep) —
  `Pager`, 645 renders static and live.
- *Casing stays the theme's; an all-caps face's strings take `textTransform` per site* (Grunge 1,
  session 0) — the heading, the songs, the artists, the page numerals.
- *Theme 1 is the digest at risk in a widened block* (Grunge 1, section 2) — zero at 0, 1, 2 and 4.

Section 6:
- *Where the seam lives inside the branch, the block goes after the seam* (Lime 1, section 4) —
  `perPage`, `pg`, `shown`, `lit`, `onPick` shared whole.
- *The `G` lookup at the block's head, whose twin's arm is today's literals* (Grunge 1, sections
  4–10) — a third arm; new leaves fall back through `??`.
- *The node walker* (Grunge 2) — all three masters, with parent-relative `x`/`y`, rotation,
  `dashPattern`, per-side weights and binding names.
- *A scheme that did not move can still move the binding* (Grunge 3) — the kicker and radius label
  on `text/2`, the date box on `tag/1/text`, the tape on `media`.
- *Every glow is a guess until the node's `effects` confirm it* (Lime 1) — one effect, the panel's
  real drop shadow.
- *A frame's inside stroke is an inset `boxShadow`, on an overlay* (Lime 2, section 1) — the tile's
  1px ring, the panel's 7px one.
- *Retro's live states vanish under Lime; redraw them, never inherit them* (Lime 1, section 6) —
  the pin and the lit row.
- *`vm.title` shadows the ramp's `title` size* (Lime 1, section 6) — 32 / 25 / 23.
- *`Pager` has a Lime branch, `BookPill`'s shape* (Lime 1, section 5; D1) — overridden through
  `frame.lime`, no edit.
- *The 390 page is five gigs* and *the compact `pageWindow` at every width* (Lime 1, section 6; D1).
- *Figma auto-layout spaces a rotated child by its rotated bounding box* (memory
  `figma-frame-reading`) — at all three widths here, read per master.
- *Casing stays the theme's; an all-caps face's strings take `textTransform` per site* (Grunge 1,
  session 0) — the heading, the radius label, the venues.
- *Theme 1 is the digest at risk in a widened block* (Grunge 1, section 2) — zero at 0, 1, 2 and 4.

Section 7:
- *Where the seam lives inside the branch, the block goes after the seam* (Lime 1, section 4) —
  `tab`, `active`, `shown` and `chip` shared whole.
- *The `G` lookup at the block's head, whose twin's arm is today's literals* (Grunge 1, sections
  4–10) — a third arm; Lime's and Grunge's untouched.
- *The node walker* and *the paired diff walk* (Grunge 2) — all three masters, the twins' card
  bindings read beside them, which is what named card 3's ink a missed override.
- *A scheme that did not move can still move the binding* (Grunge 3) — every string on `text/1`,
  the idle chips on `sem/bg`, the lit one on `tag/1/bg`.
- *Every glow is a guess until the node's `effects` confirm it* (Lime 1) — none on any node; the
  featured seat draws nothing.
- *The glow is a seat: rendered index `i % 3 === 1`* (Lime 1, section 7; D1) — kept, reaching
  nothing under Editorial.
- *A frame's inside stroke is an inset `boxShadow`* (Lime 2, section 1) — the idle chips' ring and
  the root's; the cards' dashes through `DashRule`.
- *`BookPill` has a Lime branch* (Lime 1, section 1; D1) — a nested scheme's literals, and an
  additive `discBg`.
- *A leak that shows and reads as a defect is overridden* (Grunge 1, section 4) — card 3's ink.
- *Emptied content drops its node* (Lime 1, section 7) — inherited whole.
- *Casing stays the theme's; an all-caps face's strings take `textTransform` per site* (Grunge 1,
  session 0) — the heading.
- *One five-theme digest is the whole proof for a shared-helper change* (Lime 1, sweep) —
  `BookPill`'s `discBg`, 645 renders static and live.
- *Theme 1 is the digest at risk in a widened block* (Grunge 1, section 2) — zero at 0, 1, 2 and 4.

Section 8:
- *Where the seam lives inside the branch, the block goes after the seam* (Lime 1, section 4) —
  `at`, `month`, `cur`, `line` and `step` shared whole.
- *The `G` lookup at the block's head, whose twin's arm is today's literals* (Grunge 1, sections
  4–10) — a third arm; new leaves fall back through `??`.
- *The node walker* (Grunge 2) — all three masters, with parent-relative `x`/`y`, rotation,
  per-side weights and binding names.
- *A scheme that did not move can still move the binding* (Grunge 3) — the cells and rules on
  `stroke/2`, the numerals on `text/1`, the picked ring on `stroke/1`.
- *Every glow is a guess until the node's `effects` confirm it* (Lime 1) — one effect, the print's
  drop shadow; no glow on the picked day.
- *The panel's ring is an overlay* and *booked is the frame's own state: .38, no strike* (Lime 1,
  section 8; D1) — the overlay gated off (no ring); the state kept, the frame agreeing.
- *The foot keeps Retro's BookPill* (Lime 1, section 8; D1).
- *A leak that shows and reads as a defect is overridden* (Grunge 1, section 4) — the narrow
  masters' divider.
- *Figma auto-layout spaces a rotated child by its rotated bounding box* (memory
  `figma-frame-reading`) — read, and owed nothing: the half centres it.
- *Field reach is measured, not read off the prose* (CLAUDE.md) — a new `calendar.heading` probe.
- *Casing stays the theme's; an all-caps face's strings take `textTransform` per site* (Grunge 1,
  session 0) — the heading and the month.
- *Theme 1 is the digest at risk in a widened block* (Grunge 1, section 2) — zero at 0, 1, 2 and 4.

Section 9:
- *A section whose live seam is hoisted above its branches can always take a block* (Lime 1,
  section 3) — the published form needed nothing.
- *The `G` lookup at the block's head, whose twin's arm is today's literals* (Grunge 1, sections
  4–10) — a third arm; `boxH` falls back through `??`.
- *The node walker* and *the paired diff walk* (Grunge 2) — all three masters and the Grunge twin,
  by traversal order, bindings resolved.
- *`get_variable_defs` mixes nested schemes in one list; the `use_figma` fills settle which node is
  on which* (Lime 1, section 9) — turned round: the walk found no nested scheme at all.
- *A scheme that did not move can still move the binding* (Grunge 3) — every string on `text/2`,
  the picked chip and the pill on `text/1`, the avatar on `media`.
- *Every glow is a guess until the node's `effects` confirm it* (Lime 1) — none on any node.
- *A refused box changes colour, not weight alone, when the idle ring is already full ink*
  (CLAUDE.md, Lime's layout 4) — here the idle mark is a faint dash, and the refusal changes all
  three.
- *`BookPill` has a Lime branch* (Lime 1, section 1; D1) — its numbers, drawn inline as the twins'
  are.
- *A hand-scaled instance is not the ramp* (Lime 2, bio) — 50.36 at every width.
- *The desktop head shrinks to fit its widest word* (Lime 3, section 9; D3) — `vm.titleWordEms`
  widened to Editorial in Noto Bold ems, applied through the header's `100cqi` recipe.
- *Casing stays the theme's; an all-caps face's strings take `textTransform` per site* (Grunge 1,
  session 0) — the statement, labels, pill, sent head.
- *Theme 1 is the digest at risk in a widened block* (Grunge 1, section 2) — zero at 0, 1, 2 and 4.

Section 10:
- *Where the seam lives inside the branch, the block goes after the seam* (Lime 1, section 4) —
  `n`, `at`, `q`, `go`, `paging` and `step` shared whole.
- *The `G` lookup at the block's head, whose twin's arm is today's literals* (Grunge 1, sections
  4–10) — a third arm; Lime's and Grunge's untouched.
- *The node walker* and *the paired diff walk* (Grunge 2) — all three masters and the Grunge twin,
  bindings resolved.
- *A scheme that did not move can still move the binding* (Grunge 3) — every string on `text/2`,
  the who pill's ink on `text/2`, the role pill on `box/3`, the second back on `tag/1/bg`.
- *Every glow is a guess until the node's `effects` confirm it* (Lime 1) — none on any node; the
  twins' drop shadow dropped.
- *The backs are insets off the card*, *the 390 card bleeds into the root's padding* and *the wide
  arrows centre on the wrap* (Lime 1, section 10; D1) — all three kept, the insets re-read.
- *A hand-scaled instance is not the ramp* (Lime 2, bio) — 57.84 at 1440 and 768; and turned round
  at 390, where the master is the ramp's 36.
- *The desktop head shrinks to fit its widest word* (Lime 3, section 9; D3) — through section 9's
  recipe, on a new per-review key.
- *Casing stays the theme's; an all-caps face's strings take `textTransform` per site* (Grunge 1,
  session 0) — the quote; the pills through `labelStyle`.
- *Theme 1 is the digest at risk in a widened block* (Grunge 1, section 2) — zero at 0, 1, 2 and 4.

## Open questions

1. **Fisterra Fora** — *settled in session 0:* Noto Serif Display at wdth 62.5, by user call
   ("you pick"). Worth telling the designer the shipped face is a free stand-in, and that its title
   sets about 9% wider than the frame's.
2. **Per-section schemes** — *settled in session 0:* route A, by user call.
3. **The gallery strip** — the frame repeats one thumbnail and borrows Retro's colour spotlight;
   seeded as seven distinct pictures of Editorial's shoot (session 0). Worth telling the designer.
4. **Header cards 2–4 under Editorial** — *recorded in section 1.* All three render Retro's
   `HeaderV1`–`V3` branches in Scheme 1 tokens (no `SCHEMES_OF.Editorial` row for layouts 2–4) and
   publish; all three still draw Retro's **checker ribbon** (`Checkerboard` is ungated), which
   neither Editorial frame read draws. `navModeDefault` does not list Editorial, so cards 2 and 3
   show the artist's sections where their frames draw Music / Gigs / About (JP-039's rule; `navFits`
   has no Editorial arm either). What each frame draws, read off its desktop render only:
   - **Card 2, Feature spread (`964:64599`)**: an arch photograph in a terracotta rule — no mount,
     rail, tilt or seal; a one-tone ink title; an "Enquire about a date" pill in terracotta under
     paper type; a dashed paper face card and an **ink place card** under paper type with an
     outlined pin tile; the links in an outlined terracotta capsule. `mustard` is ink for now.
   - **Card 3, Inset Hero (`964:68718`)**: an **ink sheet** (the stand-in matches), the links in a
     **blush** capsule under ink type, a blush Book Now with an ink disc, a one-tone paper title
     over a paper location line, chips alternating blush / terracotta, and an arch portrait card
     with the name and "Performing since 2021" where Retro stands a polaroid.
   - **Card 4, Stacked**: its frame not read. It draws card 1's capsule (`NavBar`), Retro's seal in
     terracotta, the two-line title and the checker ribbon.
5. **The demo glyphs** — the frames ship Fontspring's DEMO mark for `'`, `&` and `"`, patched by
   hand in Playfair Display in two sections. Worth telling the designer with 1.
6. **The three hand-scaled Bold statements** (form, testimonials, footer) — off the ramp, at three
   different ratios; each session follows its frame's glyph size (Lime layout 2's rule) and says
   whether a real artist's longer statement still fits. Worth telling the designer.
7. **The media player's clocks are ink on the fade** (section 3). `sem/text/2` under Scheme 2 is
   `#141414`, set on the card's foot where the scrim is near-black, so "02:28" / "04:22" all but
   vanish — in the frame's render and in ours, followed. Its progress bar (track and fill both
   `sem/bg`) was redrawn as Lime's was, because a playhead is the player's function; the clocks
   were not, being a label beside it. One line to turn (`{ color: s.tx }` → `s.ac`) if the user
   or the designer wants them read. Worth telling the designer with the bar.
8. **The gallery at 390** (section 4) — the master draws seven 44.29 tiles where Lime's and
   Grunge's draw a window of four, and hangs its left arrow disc 10.88 off its own page. Followed
   the seven, overrode the disc to the wider masters' 0.69. Worth telling the designer: the 390
   frame also spaces the leant card by its rotated box where the 1440 and 768 frames do not.
9. **Pricing's third card** (section 7) — the frame binds its name, £, unit, blurb and features
   `text/2` (ink) where the first two cards bind `text/1` (paper), at all three widths; the twins
   bind `text/2` on all three, so it reads as an override applied to two cards of three. Drawn
   paper on all three. One line to reverse if the designer meant a third-seat mark. Worth telling
   the designer.
10. **The calendar's stacked divider** (section 8) — at 768 and 390 the grid half keeps the
    desktop's right `stroke/2`, which with no panel ring draws a terracotta line down the panel's
    right edge that stops at the grid's foot. Not drawn. Worth telling the designer.
11. **The form's statement** (section 9) — the frame sets it at 50.36 in a 262.7 box at every
    width, and the demo face breaks UNFORGETT / ABLE inside the word. Noto Bold's
    UNFORGETTABLE. is 386.9 at that size, so the statement is fitted to its widest word instead
    (36.1 on the 1440 canvas against the frame's 41.3, 37.6 at 390, the frame's 50.4 at 768) and
    sets three lines where the frame sets four. The alternative — the frame's size with the word
    broken wherever it overflows — is one line to turn (`min(…)` → `u(50.36)`). Worth telling
    the designer with 1 and 6, and a design call for the testimonials' and the footer's
    statements, which will meet the same measure.
    **The testimonials' quote took the same fit** (section 10): seeded, it bites at 768 alone, where
    `"PROFESSIONAL` sets 403 at the frame's 57.84 in a 364 column, so the quote is 52.19 on the
    frame's five lines and the band 702.6 against 730. One line to turn there too (`min(…)` →
    `u(57.84)`). The footer's statement is the last to meet it.
12. **The testimonials' 390 pills** (section 10) — the frame's no-wrap row hugs 277 in a 264 slot,
    overflowing its own card's padding by 13; Noto's 296 wraps to two rows instead, and the 390
    band is 775.9 against 730. Worth telling the designer: the row has no room for a longer name
    even in the demo face.
