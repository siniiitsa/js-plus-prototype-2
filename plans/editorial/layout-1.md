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
| 0 | *foundation* | `964:58611` *(page)* | Sienna Vale → `THEMES[3]`, face, ramp, schemes, flags, photos | — | `986:48237` | — | `986:48250` | — | — | — | — | todo |
| 1 | `header` | `964:58612` | Headers — hero | 1440 × 750 | `986:48238` | 768 × 1024 | `986:48251` | 390 × 844 | 3 | `964:58588` | `964:58600` | todo |
| 2 | `bio` | `964:58613` | Bios — A · Flanked portrait | 1440 × 769 | `986:48239` | 768 × 1135 | `986:48252` | 390 × 731 | 1 | `964:58589` | `964:58601` | todo |
| 3 | `media` | `964:58614` | Media Player — D · Floating cards stack | 1440 × 1140.2 | `986:48241` *(in `986:48240`)* | 768 × 1629.6 | `986:48253` | 390 × 1211.8 | 2 | `964:58590` | `964:58602` | todo |
| 4 | `gallery` | `964:58615` | Gallery Sections — Component 1 | 1440 × 818 | `986:48242` | 768 × 1123 | `989:22410` | 390 × 791.7 | 1 | `964:58591` | `964:58603` | todo |
| 5 | `repertoire` | `964:58616` | Repertoire — A · Two-column dense | 1440 × 1055 | `986:48243` | 768 × 897 | `986:48255` | 390 × 896 | 3 | `964:58592` | `964:58604` | todo |
| 6 | `map` | `964:58617` | Events Map — D · Compact tile | 1440 × 1191.2 | `986:48244` | 768 × 1308.6 | `986:48256` | 390 × 1132.5 | 1 | `964:58593` | `964:58605` | todo |
| 7 | `pricing` | `964:58618` | Pricing — B · 3-col in soft panel | 1440 × 880 | `986:48245` | 768 × 793 | `986:48257` | 390 × 1486 | 2 | `964:58594` | `964:58606` | todo |
| 8 | `calendar` | `964:58619` | Booking Calendar — A · Scheduler | 1440 × 911 | `986:48246` | 768 × 1371 | `986:48258` | 390 × 995 | 1 | `964:58595` | `964:58607` | todo |
| 9 | `form` | `964:58620` | Enquiry Forms — B · Split context+form | 1440 × 891 | `986:48247` | 768 × 1075 | `986:48259` | 390 × 1165 | 3 | `964:58596` | `964:58608` | todo |
| 10 | `testimonials` | `964:58621` | Testimonials H — Stacked tag card | 1440 × 730 | `986:48248` | 768 × 730 | `986:48260` | 390 × 730 | 1 | `964:58597` | `964:58609` | todo |
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

### 1. Fisterra Fora is a Fontspring demo — **user call; session 0 opens on it**

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

### 3. Six sections stand on another scheme — **recommended: resolve it in `sectionVm`; user call in session 0**

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

### Inherited and used

*(Append one line each time a session leans on a bullet from Lime's, Grunge's or Retro's
Conventions, naming the plan it came from, a blank line between sections. The sweep folds it into
[`../CONVENTIONS.md`](../CONVENTIONS.md).)*

## Open questions

1. **Fisterra Fora** — decision 1, the user's call in session 0.
2. **Per-section schemes** — decision 3, the user's call in session 0.
3. **The gallery strip** — the frame repeats one thumbnail and borrows Retro's colour spotlight;
   seeded as seven distinct pictures of Editorial's shoot (session 0). Worth telling the designer.
4. **Header cards 2–4 under Editorial** — recorded in section 1.
5. **The demo glyphs** — the frames ship Fontspring's DEMO mark for `'`, `&` and `"`, patched by
   hand in Playfair Display in two sections. Worth telling the designer with 1.
6. **The three hand-scaled Bold statements** (form, testimonials, footer) — off the ramp, at three
   different ratios; each session follows its frame's glyph size (Lime layout 2's rule) and says
   whether a real artist's longer statement still fits. Worth telling the designer.
