# Grunge layout 1 — section-by-section plan

This is the working checklist for bringing **layout 1** of the Grunge template up to its Figma
designs, the way [`../lime/layout-1.md`](../lime/layout-1.md) did for Lime. It runs one unit per
session, clearing context between units.

**This plan is Lime layout 1 again, with deltas.** It does not repeat that plan: the procedure,
the harness, the digest and the verification are Lime's, verbatim, with `s.lime` read as
`s.grunge` and `theme=1` as `theme=2`. What is written here is only what differs.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then
- the whole *Conventions* of [`../lime/layout-1.md`](../lime/layout-1.md), *Settled in session 0*
  and the section you are about to fit above all — it is the same component, fitted once already
  in another mode, and its traps are this section's traps
- the *Conventions* of [`../retro/layout-2.md`](../retro/layout-2.md) (the `v0`/`v1` branch idiom,
  the × 0.82 rule, the harness)
- the *Per-session procedure* of [`../lime/layout-1.md`](../lime/layout-1.md)

Then the memory notes `figma-frame-reading`, `verifying-the-published-tab` and
`browser-tool-choice`. `SPEC.md` lives in git history: `git show 8fa8ff4:SPEC.md`.

Branch: **`grunge-layout-1`**, forked from `main`.

## What the pass must deliver

1. **Every section works in the published tab under Grunge**: every control CLAUDE.md lists under
   *`s.live` is false everywhere except the published tab*.
2. **Every section looks as close to its Figma frame as possible**, at 1440 (× 0.82 onto the
   1180 canvas), 768 and 390.
3. **Grunge's template card** on the picker — the big preview and its filmstrip thumbnail — is a
   live `HeaderV0`, not the flattened still it is today (`TEMPLATE_STILLS.Grunge`).
4. **The setup modal** shows **four** Grunge cards. Card 1 is the fitted Hero; cards 2–4 only need
   to render and publish in this pass (Lime's rule; see *The header, and the four cards*).

## What this pass actually is

**Grunge's layout 1 is the same eleven Figma components as Retro's and Lime's, in a third variable
mode.** The evidence, read at planning time:

- Retro's page is instances `964:58576`…`86`, Lime's `964:58588`…`98`, Grunge's
  **`964:58600`…`964:58610`**: the same composition names in the same order, ids offset by exactly
  +12 from Lime and +24 from Retro.
- Every instance carries `explicitVariableModes` → `1 · Primitives` **Static Youth**.
- The narrow pages repeat Lime's misnomers one for one (below), which only instances of the same
  components would.

So, as under Lime: **no Grunge-only section branches.** The work is `s.grunge` decoration inside
the shared `s.v0` branches, after a session 0 that makes `THEMES[2]` carry its mode. A section
whose `get_metadata` tree differs from its twins' is the exception; record it under *Conventions*
before branching.

**The mode is called "Static Youth", not "Grunge".** Nothing in the Figma file says Grunge. The
template's name in the app (`THEMES[2].name`, the folder name, the `s.grunge` flag) stays Grunge;
"Static Youth" is also the frames' mock artist name, which is copy and not ours.

## The Figma source

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Frame 267 | `964:58599` | 1440 × 9776.7 |
| Tablet | Frame 274 | `986:44056` | 768 × 11935.7 |
| Mobile | Frame 275 | `986:44069` | 390 × 10686.8 |

- Desktop: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=964-58599&m=dev>
- Tablet: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=986-44056&m=dev>
- Mobile: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=986-44069&m=dev>

`fileKey` = `uFoUbPaBrDicjyuSBEbtGT`. All three sit on the page **Layout 1** (`964:58571`), beside
Retro's, Lime's, Sienna Vale's (Editorial) and Pop's. Grunge's layout-2 pages exist too (Layout 2:
`964:64617` / `986:13752` / `986:13771`, confirmed at planning time; Layouts 3 and 4 are section
1's check), which is what the four-card family below rests on.

**Match on node id and width, never on the name** — Lime's list, again:
- The 390 gallery (`989:22292`) and the 390 testimonials (`986:44079`) are both called "— Tablet".
- The booking calendar is called "— Desktop" at all three widths, and so are the 768 and 390 footers.
- The media player's 768 master sits inside a wrapper frame (`986:44059`, "Frame 272").
- The testimonials master is **730 tall at every width**. Read its render before trusting it.

**The desktop page frame itself is set to `Primitives → Lime`.** Every instance on it overrides
to Static Youth, so `get_variable_defs` on the page answered correctly only because it resolves
through the children. Read a *section* node, never the page, and prefer the `use_figma` variable
dump below.

## The sections

Session 0 first, then eleven sections in page order. Each row's three masters are one session.

| # | Cat | Desktop node | Composition | Size | Tablet node | Size | Mobile node | Size | Lime twin | Retro twin | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | *foundation* | `964:58599` *(page)* | Static Youth → `THEMES[2]`, font, ramp, `s.grunge`, the shared gate, photos | — | `986:44056` | — | `986:44069` | — | — | — | **done** |
| 1 | `header` | `964:58600` | Headers — hero | 1440 × 750 | `986:44057` | 768 × 1024 | `986:44070` | 390 × 844 | `964:58588` | `964:58576` | done `45d8e2c` |
| 2 | `bio` | `964:58601` | Bios — A · Flanked portrait | 1440 × 769 | `986:44058` | 768 × 1142 | `986:44071` | 390 × 729 | `964:58589` | `964:58577` | done `7f80065` |
| 3 | `media` | `964:58602` | Media Player — D · Floating cards stack | 1440 × 1253 | `986:44060` *(in `986:44059`)* | 768 × 1742.3 | `986:44072` | 390 × 1231.3 | `964:58590` | `964:58578` | todo |
| 4 | `gallery` | `964:58603` | Gallery Sections — Component 1 | 1440 × 819 | `986:44061` | 768 × 1116 | `989:22292` | 390 × 760 | `964:58591` | `964:58579` | todo |
| 5 | `repertoire` | `964:58604` | Repertoire — A · Two-column dense | 1440 × 1096 | `986:44062` | 768 × 922 | `986:44074` | 390 × 918 | `964:58592` | `964:58580` | todo |
| 6 | `map` | `964:58605` | Events Map — D · Compact tile | 1440 × 1151 | `986:44063` | 768 × 1349 | `986:44075` | 390 × 1172.2 | `964:58593` | `964:58581` | todo |
| 7 | `pricing` | `964:58606` | Pricing — B · 3-col in soft panel | 1440 × 895 | `986:44064` | 768 × 765 | `986:44076` | 390 × 1510 | `964:58594` | `964:58582` | todo |
| 8 | `calendar` | `964:58607` | Booking Calendar — A · Scheduler | 1440 × 869 | `986:44065` | 768 × 1376 | `986:44077` | 390 × 997 | `964:58595` | `964:58583` | todo |
| 9 | `form` | `964:58608` | Enquiry Forms — B · Split context+form | 1440 × 965 | `986:44066` | 768 × 1122 | `986:44078` | 390 × 1176 | `964:58596` | `964:58584` | todo |
| 10 | `testimonials` | `964:58609` | Testimonials H — Stacked tag card | 1440 × 730 | `986:44067` | 768 × 730 | `986:44079` | 390 × 730 | `964:58597` | `964:58585` | todo |
| 11 | `footer` | `964:58610` | Footer — Component 2 / 3 / 4 | 1440 × 479.7 | `986:44068` | 768 × 647.4 | `986:44080` | 390 × 619.4 | `964:58598` | `964:58586` | todo |

Both twins' fit comments in `EncoreSection.jsx` cite their node ids; grep for either to find the
branch and its `if (s.lime)` block. **Re-measure from the Grunge frame; never reuse Lime's or
Retro's block sizes** — media is 1253 tall here against Lime's 1153, the form 965 against 862.

**A Grunge block often starts closer to Lime's than to Retro's** (same ramp shape, same Chakra
Petch UI face, the same two-seat tag system, `sem` colours, a capsule nav), and sometimes closer
to Retro's (grain, torn edges, a tilted polaroid sleeve in the media player). Read both twins'
code before writing a third block; where Grunge's frame draws exactly what one of them draws,
**widen that gate** rather than copy the block.

## What already works, and what doesn't

Grunge is one of "the flat three" today. At `arch 0`:

| Section | Renders under Grunge | Published-tab controls |
|---|---|---|
| **header** | `FlatHeader` v0, **not** `HeaderV0` | **Broken**, as Lime's was: `FlatNav` hardcodes Music / Shows / Book on ids no section has, ignores `navLinks`, `navHref`, `s.live` and the burger, and its CTAs are `<span>`s. |
| the other ten | `s.v0`, flat, in the three-colour palette, **initials placeholders for every photograph** | wired — every control is shared `v0` code |

So goal 1 is met in full by the header session, and every section session still runs
`theme=2&live=1` for Lime's two reasons: a decoration layer can cover a control (a torn edge over
a chip row), and a live **state** can stop reading — here the risk is red on red: map and form
stand partly on `#DF262C` panels, where the accent is the ground.

The picker shows Grunge as a **still** (`TEMPLATE_STILLS.Grunge`, `photos.js`; the `if (still)`
short-circuit in `TemplatePreview`, `EncoreBuilder.jsx`), a flattened render of `964:58600` in
Figma's mock copy. The header session deletes Grunge's entry and `grunge-header.jpg`.

`palette` is already right — `['#000000', '#DF262C', '#FFFFFF']` is Scheme 1's `bg` / `text1` /
`text2`. What is wrong in `THEMES[2]` today, against the mode: the three faces (Special Elite /
Courier Prime), `radius` / `radiusSm` / `btnR` all `0` (the mode says 8 / 8 / 999 — the frame's
Book Now is a capsule), `bw` 1.5 (2), `dls` 0.04em (0), `casing: 'upper'`, a four-hue `tags`, and
no `ui`, `radiusChip` or `sem`.

## Grunge's Figma mode — Static Youth

Read at planning time with `use_figma` (`figma.variables.getLocalVariablesAsync()`), Lime's
method. The four collections are as Lime's plan describes them.

| Token | Retro | Lime | **Static Youth** | `THEMES` key |
|---|---|---|---|---|
| `font/display` / `label` / `ui` / `body` | Soulway / Anton / Inter / Inter | Bebas Neue ×2 / Chakra Petch / Inter | **Stones Crush** / **Stones Crush** / Chakra Petch / Inter | `display` / `label` / `ui` / `body` |
| `size/display-xl` / `-lg` / `-md` / `-sm` | 128 / 96 / 48 / 40 | 200 / 130 / 72 / 50 | **198** / 130 / 72 / 50 | ramp |
| `size/title` / `list` | 24 / 16 | 36 / 24 | 36 / 24 | |
| `size/label-lg` / `-md` / `-sm` / `-xs` | 24 / 20 / 16 / 20 | 32 / 24 / 18 / 20 | **24 / 20 / 16** / 20 | |
| `size/body-lg` / `-md` / `-sm`, `chip`, `eyebrow` | 16 / 14 / 12, 12, 15 | 16 / 14 / 13, 13, 15 | 16 / 14 / **12**, **12**, 15 | |
| tablet (xl lg md sm · title list · lLg lMd lSm lXs · bLg bMd bSm · chip eyebrow) | … | 120 81 50 40 · 28 19 · 21 17 14 14 · 15 13 13 · 12 12 | **95** 81 50 40 · 28 19 · **16 14 13** 14 · 15 13 **12** · **11** 12 | |
| mobile, same order | … | 72 54 40 32 · 26 18 · 14 13 12 12 · 15 13 12 · 11 11 | **52 46 38 30** · 26 18 · 14 13 12 12 · 15 13 12 · 11 11 | |
| `radius/card` / `control` / `chip` / `pill` (`sharp` 0) | 20 / 14 / 8 / 999 | 26 / 13 / 6 / 999 | **8 / 8 / 4 / 999** | `radius` / `radiusSm` / `radiusChip` / `btnR` |
| `border/hairline` / `thin` / `default` / `heavy` | 1 / 2 / 3 / 5 | 1 / 2 / 3 / 3 | 1 / 2 / 3 / 3 | `bw` is `border/thin` |
| letter spacing, line heights | | | 0 on every style; Lime's line heights | `dls` |

Bold marks where the ramp leaves Lime's, so `THEME_RAMP.Grunge` is a copy of Lime's with those
cells changed — but type it from this table, not from Lime's object.

**The schemes**, Static Youth's values:

| | **Scheme 1** (= **Scheme 4**, byte for byte) | **Scheme 2** | **Scheme 3** |
|---|---|---|---|
| `bg` | `#000000` | `#171716` | `#DF262C` |
| `text1` / `text2` / `text3` | `#DF262C` / `#FFFFFF` / `#FFFFFF` | the same | `#000000` / `#FFFFFF` / `#FFFFFF` |
| `box1` / `box2` / `box3` | `#1A1A1A` / `#383838` / `#0E0E0E` | `#000000` / `#222222` / `#353535` | `#9E1F17` / `#F52E34` / `#82211B` |
| `active` bg / text | `#DF262C` / `#15180F` | the same | `#000000` / `#DF262C` |
| `inactive` bg / text / border | `#1A1A1A` / `#FFFFFF` / `#1A1A1A` | `#000000` / `#FFFFFF` / `#000000` | `#9E1F17` / `#FFFFFF` / `#9E1F17` |
| `stroke1` / `stroke2` | `#FFFFFF` 15% / `#FF0000` | the same | `#000000` 15% / `#FFFFFF` |
| `glow` | `#DF262C` | `#DF262C` | `#9E1F17` |
| `tag1` / `tag2` bg·text (3…7 alternate the same two) | `#1A1A1A`·`#FFFFFF` / `#DF262C`·`#0D1F03` | `#000000`·`#FFFFFF` / `#DF262C`·`#0D1F03` | `#9E1F17`·`#FFFFFF` / `#000000`·`#DF262C` |
| `hl1…3/text` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |

**Who stands on what** (`explicitVariableModes`, identical at all three widths):

| Scheme | Sections |
|---|---|
| **1** | bio, gallery, repertoire, pricing, calendar, testimonials, footer |
| **2** | **header**, **media**, **map**, **form** — the `#171716` textured bands |
| 3, nested | the form's contact panel (its other nested frame is Scheme 1) |
| 4, nested | the header's three ellipses, two gallery frames, the testimonials' `card` (its `back-card` is Scheme 2) — **colour no-ops**, since 4 ≡ 1 here |

Three traps in that table:

- **`active/text` `#15180F` and `tag2/text` `#0D1F03` are Lime's inks, leaked into this mode** —
  a lime-tinted near-black nobody chose for a red chip. They render as black. Sample the ink off
  the render in the header session and write whichever it is as the named value; do not copy the
  hex on trust.
- **`stroke2` is `#FF0000`, not the accent `#DF262C`.** Check the render where a Lime block reads
  `s.stroke2` (the header's portrait card rule) before deciding it is deliberate.
- **The map's gig panel and the form's form half are red** (`#DF262C` ground) in the render while
  their sections are Scheme 2: find the nested mode or the raw fill in those sessions with one
  `use_figma` read of `fills` (the memory note's gallery trap).

## The three decisions this plan makes or hands over

### 1. Stones Crush is not a Google Font — **settled: answer B, Anton**

*Settled in session 0 (2026-09-21):* the user chose a free substitute and delegated the pick
("pick the closest"). It is **Anton** — see *Conventions → Settled in session 0*. The table below
is kept as the record of the question.

`fonts.googleapis.com/css2?family=Stones+Crush` answers 400, the repo has no `@font-face`
anywhere, and `TEMPLATE_STILLS`' own comment already says the frames use "demo faces this app
cannot load". `load-figma-fonts` (memory) covers *free Google* faces only. Session 0 opens by
asking, and the answer decides two keys:

| Answer | `display` / `label` | `casing` |
|---|---|---|
| **A. Licensed; the user supplies the `.woff2`** | Self-host: `source/src/builder/fonts/`, an `@font-face` in `src/index.css`, **and** the same face in `preview.html` and the published popup (`dressPublishedWindow` clones the opener's styles — verify the face survives into `about:blank`, and that `vite-plugin-singlefile` inlines it into the standalone build; note the size in the sweep). | Find out first whether the face is **caps-only** (type lowercase in Figma or inspect the file's glyphs). If it is, `'title'` — Lime's answer, the face does the capitals and Chakra Petch / Inter stay mixed ("Sold Out", "Full name"). If it has a lowercase, the frame's all-caps display strings need a per-site `textTransform` or a display-only casing; decide in session 0 and record it. |
| **B. Substitute a free distressed face** | The user names it. Load it in `index.html` **and** `preview.html`. Every measured width in the pass (`navEms`, the head fits) is then the substitute's, so the choice must be final before section 1. | The same test on the substitute. |

Do **not** pick a substitute unasked, and do not start section 1 in a fallback face: the header's
nav fit is an advance-width table (`BEBAS_EM` / `bebasEms()` in `data.js` for Lime, `antonEms()`
for Retro), and Grunge needs its own, measured with canvas `measureText` in the real face.

### 2. The third flag — **decided: `s.grunge`, plus one mechanical shared gate**

Lime's open question 1 named this plan as its trigger. The answer:

- **`s.grunge: T.name === 'Grunge'`** beside `retro` and `lime` in `sectionVm`, for what only
  Grunge draws.
- **`s.designed = retro || lime || grunge`**, introduced in session 0 as a **pure rename** of the
  existing `(s.retro || s.lime)` sites *where Grunge's frame draws the same thing* — the
  full-bleed hero (`bleed`), the seal, the seeded photographs, `TagChips`' designed branch. It is
  provable by a zero-row digest at all five themes *before* Grunge turns anything on, which the
  token-driven `s.deco` layer is not: that would re-express 288 `s.retro` and 81 `s.lime` sites
  with no proof but eyes. Revisit `s.deco` only if Editorial's plan finds the three-flag idiom
  breaking down.
- A `(s.retro || s.lime)` site Grunge does **not** share stays as it is. Widen per site, from the
  frame, never by grep-and-replace.
- A value two of the three share is written as the pair: `(s.retro || s.grunge)` for grain and
  torn edges, `(s.lime || s.grunge)` for the `sem`-token reads and the capsule nav.

### 3. `plans/CONVENTIONS.md` — **scheduled: the end-of-pass sweep, not session 0**

`plans/README.md` asks for the shared conventions to be pulled out "once a second template shows
which is which". Lime showed it; this pass confirms it against a third. Extracting now, before
any Grunge section has tested an inherited bullet, would freeze guesses. The sweep does it, from
the bullets this pass actually leaned on (kept as a running list under *Conventions → Inherited
and used*).

## Session 0 — the foundation

Lime's session 0, steps 1–9, with these deltas. It touches no section's layout code.

0. **Ask decision 1.** Nothing below that names the display face can be verified until it is
   answered; steps 2, 4–7 can still be done first.
1. **The shared gate** (decision 2), as **two commits**:
   - (a) `designed: retro || lime` — **without `grunge`** — and the rename of the qualifying
     `(s.retro || s.lime)` sites. A pure rename: **all five themes digest to zero rows.** Commit.
   - (b) `grunge: T.name === 'Grunge'` and `|| grunge` on `designed` land **with step 3's
     `THEMES[2]` rewrite**, where theme 2 moving is the point and 0, 1, 3, 4 stay at zero.
2. **`THEMES` ↔ tokens is already settled** (Lime's session 0): `radius` = `radius/card`,
   `radiusSm` = `radius/control`, `btnR` = `radius/pill`, `bw` = `border/thin`, `radiusChip` =
   `radius/chip`.
3. **Rewrite `THEMES[2]`**: the faces (decision 1), `ui` Chakra Petch, `dls` `'0px'`, `radius`
   `'8px'`, `radiusSm` `'8px'`, `btnR` `'999px'`, `bw` `'2px'`, `radiusChip` `'4px'`, `sub`
   reworded, `tags: ['#1A1A1A', '#DF262C']`, and a **`sem` object in Lime's exact shape from
   Scheme 1**: `box1` `#1A1A1A`, `box2` `#383838`, `box3` `#0E0E0E`, `glow` `#DF262C`, `activeBg`
   `#DF262C`, `activeFg` *(the sampled ink — see the trap)*, `inactiveBg` `#1A1A1A`, `inactiveFg`
   `#FFFFFF`, `inactiveLine` `#1A1A1A`, `stroke1` `rgba(255, 255, 255, 0.15)`, `stroke2`, `hl`
   `#FFFFFF`, `tagFg: ['#FFFFFF', <the same ink>]`. `sectionVm` already resolves any theme's
   `sem` onto the flat keys and sets `pillBg` / `pillFg` from it; confirm by reading, since until
   now only Lime exercised that path.
4. **`THEME_RAMP.Grunge`** from the table above (desktop × 0.82 rounded, 768 / 390 verbatim), and
   keep `preview.jsx`'s `Z` copy in step.
5. **Fonts.** Chakra Petch and Inter are loaded in both HTML files already. The display face per
   decision 1. **Do not drop Special Elite or Courier Prime from the link without grepping** —
   check whether anything but `THEMES[2]` names them.
6. **Every name gate outside `EncoreSection`** — `grep -n "T.name ===" EncoreBuilder.jsx`, plus
   `headerFamily` and `SEEDS`. The expected answers, each to be checked against the frame:
   - `grainSrc` — **widen to Grunge.** Image hash `b74be8bc` is on all eleven of Retro's
     sections *and* seven of Grunge's, so the texture is very likely **the raster `grain.jpg` was
     cut from** — confirm by downloading the asset and comparing it with `photos/grain.jpg`
     before widening; if it differs, add `grunge-grain.jpg` instead. Grunge uses it differently,
     though: a `LIGHTEN` layer at **.29** over the Scheme-2 bands (media, map, form), at **.5**
     over the header, and again at .5 inside photographs (the bio's 648 × 648 portrait, the
     gallery, the calendar), each with a `GRADIENT_LINEAR` fill over it. `Grain` takes `opacity`
     and `blend` already; the sections pass Grunge's.
   - `mapSrc` / `mapRadialSrc` — **widen**: the map raster is `8cd103b8`, Retro's and Lime's.
     The frame tints it red; how (a blend, a fill over it) is the map session's read.
   - **`gigDark`** — Lime left it Retro's because Lime's map is a light band. **Grunge's is a
     dark band**, so this likely widens; but the gig rows stand on a *red* panel here, so decide
     in the map session, not now. Leave it and note it.
   - `headerFamily`, `navEms` / `navNameEms` / `navCtaEms`, `titleWordEms`, the `kicker` seed,
     Lime's `d === 2` blocks — the header session's, or a later pass's.
7. **Seed Grunge's photographs** (`SEEDS.Grunge` in `photos.js`). The image-hash walk, done:

   | Slot | Grunge | Shared with |
   |---|---|---|
   | hero, header avatar | `221f121f`, `3ef9ee55` | own — **one each; which is which is this session's read** (the hash walk does not say) |
   | bio portrait | `8031d0f3` | own — **also in the gallery** (spotlight or strip: read the node) |
   | gallery | `a746e7e4`, `8031d0f3`, `3f0c98b4` | `3f0c98b4` is Retro's spotlight, the ringed fourth thumb, as on Lime's page. The strip is **not** Lime's six distinct thumbs — the render repeats one. Read it before choosing what seeds the seven slots. |
   | calendar | `019c80fd` | own |
   | form avatar | `81e1c9a9` | own |
   | five track covers, map raster | | Retro and Lime |

   Export as JPEG at Lime's sizes (its *Photographs are per theme* bullet), `grunge-*.jpg`. The
   shoot is **black-and-white**: confirm the greyscale is in the asset and not a Figma effect on
   the node (`n.effects`, a fill's `filters.saturation`) — if it is the node's, an artist's colour
   upload would stay in colour, and whether Grunge desaturates uploads is a product call to raise.
8. **Casing** — decision 1's second column. Whatever it is, check the ~30 `cased()` sites against
   the render as Lime did: the chips ("Sold Out", "Club Night") and form labels are mixed case.
9. **`T.tags` at two seats** — Lime's per-site list holds, since the shape is identical. Expect
   the same overrides to come due: pricing's cards are all `box1` with the featured one ruled in
   red; `pillBg` **is** the accent again (*Under Lime `pillBg` IS the accent*), so every
   `s.pillBg`-beside-`s.ac` pairing draws red on red — those sites already carry an `s.lime`
   arm; check whether Grunge takes the same arm.

**Verification for session 0:** themes **0, 1, 3, 4 digest to zero rows**
(`node scripts/digest.mjs before 0,1,3,4` / `after`). Theme 2 changes on purpose: keep desktop
before / after shots of all eleven sections in the scratchpad (`shots.mjs`).

## The header, and the four cards

Lime's section, with `'grunge'` for `'lime'`:

- **`headerFamily('Grunge')` → `'grunge'`**, four layouts, `HEADER_NAMES.grunge` slicing
  photographic's first four like Lime's. Grunge's **Layout 2** frames were confirmed at planning
  time; check Layouts 3 and 4 (pages `964:58573`, `964:58574`) the same way in this session
  before committing to four. `flatHeader` false; `bleed` comes through `s.designed`.
- **The header is on Scheme 2 here, where Lime's was on Scheme 1.** `HeaderV0`'s `if (s.lime)`
  block reads `s.box1` / `s.inactiveBg` / `s.stroke2`, which under Grunge resolve to *Scheme 1*
  (`box1` `#1A1A1A`), not the header's own Scheme 2 (`box1` `#000000`, `bg` `#171716`). Lime's
  rule — a section on another scheme writes that scheme's values as named literals — applies to
  the header under Grunge and did not under Lime. The same goes for media, map and form.
- **Delete `TEMPLATE_STILLS.Grunge`**, its import and `grunge-header.jpg`, and fix the comment
  (Editorial and Pop keep theirs). The picker card, its thumbnail and modal card 1 then all
  render `HeaderV0`.
- **Cards 2–4 are placeholders that must publish**: `HeaderV1`…`V3` in Grunge tokens. Render each
  at three widths, publish, fix only what is broken, and record what each needs under *Open
  questions* for its layout pass. The `pageLayout()` fold needs no change.
- **The 390 hero `986:44070` is `Device: Tablet` on a Mobile page — Lime's trap, again.** Its type
  is the 768 ramp's. `HeaderV0` already carries Lime's named `tk` table for exactly this; Grunge
  needs its own four numbers.
- **The nav fit.** `vm.navEms` and its siblings are `T.name === 'Lime'` and `bebasEms()`. Grunge
  draws the same capsule over the same nine seeded labels, so it needs the same sums in its own
  face — which is Anton (session 0), so `antonEms()` is the table and only the gates widen; mind
  that the strings are uppercased by style, so measure the uppercased string. JP-039's `navFits`
  rule is layouts 2 and 3's and does not arise here.
- **What the frame draws** (read off the desktop render; confirm each against `HeaderV0`'s
  existing Lime block before inventing anything): a black capsule nav with a globe mark and a red
  Book Now pill with a dark arrow disc; the red seal top-right; a red-ruled rounded avatar card;
  a two-tone title ("STATIC" white, "YOUTH" red) at `display-xl`; a location / role row in red;
  a chip row alternating `#1A1A1A` and red; the photograph under the `b74be8bc` texture at .5
  `LIGHTEN` fading to black at the foot.

Verify in the builder as Lime's plan says, reading "Grunge" for "Lime".

## Grunge's decorative language

Everything here is behind `s.grunge` or a named pair.

- **Torn seams between bands — Lime's arc rule with a tear.** The page alternates `#000000` with
  textured `#171716` bands, and **the band that differs owns both of its seams**: media, map and
  form each carry two full-width `#000000` `VECTOR`s (`I964:58602;446:2548` / `…2549` in media),
  one at the head and one at the foot. Gallery, repertoire, pricing, calendar and testimonials
  own none. `TornEdge` exists (`side`, `height`, `colour`, `bleed`); check whether its silhouette
  is this one before drawing a second, and if the path differs add it as a prop, not a fork.
- **Measure the visible tear, not the node.** Each vector is **1554 × 581** and almost wholly
  outside its clipping section: media's head sits at y −529.7, so **≈ 51 px** shows (−529.7 +
  581); its foot at y 1217.8 of 1253, **≈ 35 px**. They are not all alike — by the same sum at
  desktop: media **51 · 35**, map (head −541, foot 1078 of 1151) **40 · 73**, form (head −541,
  foot 874 of 965) **40 · 91**. Those are node arithmetic, and the edge is ragged: read each
  seam's depth off the render at all three widths — the narrow instances will
  leak the 1554 width, as Lime's 768 arcs leaked 1438.
- **Grain**, `b74be8bc` = `grain.jpg`, `LIGHTEN`: .29 on the three Scheme-2 bands, .5 on the
  header, .5 inside some photographs. A stddev scan of a Scheme-1 band should come back flat; if
  one does not, this list has missed a layer.
- **The header fades into the bio** with no seam (both read black at the join), though the
  header is Scheme 2.
- **The seal**, red, in the header, the bio, pricing's corner and the footer. `SealBadge` has a
  Lime branch with a `scheme` prop; look there first.
- **A four-point star** beside the media heading (red, ~60 px at desktop) — new; nothing in
  Retro or Lime draws it. One small inline SVG in the media block.
- **The media sleeve is a tilted pale polaroid**, which is Retro's composition and not Lime's
  glowing card — read Retro's block first there.
- **Glows are unverified.** `sem/glow` exists, and the gallery's fourth thumb and pricing's
  middle card look ringed in red. Lime's lesson stands: every glow is a guess until the node's
  `effects` confirm it; a ring may be a plain stroke.
- **Radii** 8 / 8 / 4 / 999 through the session-0 keys. No hard offset shadows were seen.

### The band table

Ground sequence, identical at all three widths. Confirm ownership in section 1's session with
Lime's walk (each section's fills and every full-width shape) and correct this table there.

| # | Section | Scheme | Ground | Seams it draws (head · foot) |
|---|---|---|---|---|
| 1 | header | 2 | photograph under grain, full-bleed | — |
| 2 | bio | 1 | `#000000` | none: the hero fades into it |
| 3 | media | 2 | `#171716` + grain .29 | `#000000` · `#000000` |
| 4 | gallery | 1 | `#000000` | none |
| 5 | repertoire | 1 | `#000000` | none |
| 6 | map | 2 | `#171716` + grain .29; a black map card, a red gig panel | `#000000` · `#000000` |
| 7 | pricing | 1 | `#000000`, a hairline-ruled panel | none |
| 8 | calendar | 1 | `#000000` | none |
| 9 | form | 2 | `#171716` + grain .29; a black context half, a red (Scheme 3) form half | `#000000` · `#000000` |
| 10 | testimonials | 1 | `#000000` | none |
| 11 | footer | 1 | `#000000`, hairline rules | none: a straight edge |

Unlike Lime's page, **every seam here is black on both sides of the band**, so the form's foot
needs no special colour. The root's `cream` / `darkMap` flags stay Retro's; add Grunge's ground
expression beside Lime's, one section at a time. A reordered page lands a tear against the wrong
ground only if two Scheme-2 bands become neighbours — accepted, as Retro's and Lime's.

## Per-session procedure

[`../lime/layout-1.md`](../lime/layout-1.md)'s *Per-session procedure*, steps 1–9, with:

- step 3: `get_metadata` on the three Grunge nodes **and both twins'** desktop nodes
- step 5: implement inside the existing `s.v0` branch gated on `s.grunge` (or a named pair);
  read the section's `if (s.lime)` block first — it is usually the nearer start
- step 6: the harness is `preview.html?cat=<cat>&arch=0&theme=2&w=desktop|tablet|mobile`
  (`arch` defaults to 1 — always pass `arch=0`); function at `theme=2&live=1`; **zero rows at
  themes 0, 1, 3 and 4** before and after, every session, because these edits sit inside
  branches Retro *and* Lime render
- step 9's hand-off prompt:

  ```
  Continue the Grunge layout-1 pass with section N, `cat`.

  Read CLAUDE.md, then plans/grunge/layout-1.md, then the Conventions of plans/lime/layout-1.md
  (session 0's and this section's above all) and of plans/retro/layout-2.md, then the
  `figma-frame-reading`, `verifying-the-published-tab` and `browser-tool-choice` memory notes,
  and follow the per-session procedure.

  The three Grunge masters are `<desktop node>` (1440 × <H>), `<tablet node>` (768 × <H>) and
  `<mobile node>` (390 × <H>) in Figma file uFoUbPaBrDicjyuSBEbtGT; the Lime twin is
  `<lime node>` and the Retro twin `<retro node>`. Fit them inside the existing `s.v0` branch of
  `<Component>` in EncoreSection.jsx, gated on `s.grunge`. Themes 0, 1, 3 and 4 must digest to
  zero rows.

  <the two or three conventions most likely to bite this section>

  Branch: grunge-layout-1. Do not refresh the root index.html.
  ```

Do **not** refresh the root `index.html` per section; it is the sweep's last step.

## The end-of-pass sweep

One session after section 11. Lime's list applies item for item (its *The end-of-pass sweep* and
*Learned on the end-of-pass sweep*); what is Grunge's own:

1. **CLAUDE.md**: "Retro and Lime are designed; Grunge, Editorial and Pop are not" becomes the
   flat **two**; "Retro and Lime seed photography"; `s.grunge` and `s.designed` named beside
   `s.lime`; the header paragraph's "**The flat three's header reads none of this**"; every
   Lime-only state description this pass gave a Grunge arm (booked day, refused box, the active
   marks); the file table's line counts (`wc -l`).
2. **README.md** and the code comments making a claim about the template list
   (`grep -rn "flat three\|the other three\|Retro and Lime" source/src/builder README.md`) — fix
   the claims, leave the branch-local truths.
3. **`Photo`'s empty `backdrop`** under Grunge (`&noimage=1`): Lime's is olive, Retro's brown.
4. **One whole-page published check under Grunge** — Lime's puppeteer script with the template
   name changed; every seam eyeballed against its real neighbour at 1440 and 390.
5. **The four header cards** still render and publish.
6. **Extract `plans/CONVENTIONS.md`** (decision 3) from *Inherited and used* below, and point the
   three templates' plans and `plans/README.md` at it.
7. **`plans/README.md`**: mark the pass closed.
8. **Refresh the root `index.html`**, with the two-build digest: zero rows at themes 0, 1, 3, 4
   and non-zero at 2. The tell that it shipped: the old build's picker shows Grunge as a still
   and its modal offers three flat cards; the new one four. If the display face is self-hosted,
   record the standalone file's new size.

## Conventions

Append as the pass goes. Do not repeat Lime's or Retro's bullets; name them.

- **The gates are `s.grunge`, the pairs, and `s.designed`** (decision 2). Never edit a Retro or
  Lime literal to make Grunge look right; every session proves it with the four-theme digest.
- **Harness:** `theme=2`, `arch=0`.
- **Read a section node, never the desktop page**, for variables: the page frame is set to Lime.
- **Scheme 4 ≡ Scheme 1** in this mode; a nested Scheme-4 override changes nothing.

### Settled in session 0 (the foundation)

- **The display and label face is Anton**, standing in for Stones Crush (user call, 2026-09-21:
  substitute, "pick the closest"). Google Fonts has no face both condensed and distressed; Anton
  is the frame's weight and proportions without the distress, was already loaded in `index.html`
  and `preview.html` for Retro, and **`antonEms()` in `data.js` is already its advance table**, so
  the header's nav fit needs no new measurement — widen the `T.name === 'Retro'` arm. The choice
  is final: every measured width from section 1 on is Anton's. The distress is not drawn; if it is
  ever wanted, it is a mask over the type, not a face.
- **Casing is `'title'`, and Grunge's display and label strings take `textTransform: 'uppercase'`
  per site.** Stones Crush is all capitals and Anton is not, so every frame string in the display
  or label face ("STATIC YOUTH", the nav, "MANCHESTER, UK", "SEE US IN ACTION", the gallery rows)
  wants the transform inside its `s.grunge` block — Retro's own idiom for its Anton labels
  (`labelStyle` sites already carry it; check each). `'upper'` would shout the ~41 `cased()` keys,
  chips and form labels included, which the frame sets mixed-case in Chakra Petch and Inter.
  After session 0 the display heads render in mixed case ("Reads the room."): that is expected,
  and each section session owes its own heads the transform.
- **`s.designed` reaches two sites**: `TagChips`' designed branch and the root's `bleed` (which
  also needs `!s.flatHeader`, so it is inert for Grunge until the header session). The gallery's
  two layout-2 sites (`bw`, the caption ink) stay `(s.retro || s.lime)` — not this pass's frame.
  `vm.mapSrc` / `mapRadialSrc` read `vm.designed` as well.
- **`vm.grainSrc` is widened and still inert**: the raster is Retro's to 3/255 (a re-encode of
  hash `b74be8bc`), but **`Grain` itself opens with `if (!s.retro) return null`**. The first
  section that draws grain widens that to `(s.retro || s.grunge)` and passes `exact`, `blend`
  and `opacity` (`lighten` at .5 over the header and inside photographs, .29 over the Scheme-2
  bands). Read off the nodes: **in media, gallery, map, calendar and form some `image 1` grain
  layers are hidden** (media's 1527 sheet, the gallery's 636, both of the map's, the calendar's,
  the form's 1440) — visible are the header's 1440, the bio's 648 and media's 689. So the band
  table's "+ grain .29" on map and form is suspect; each session reads `visible` before drawing.
- **The `sem` path is generic**: `pillBg` / `pillFg` and `vm.chips`' `tagFg` read `T.sem`, not the
  name. `activeFg` and `tagFg[1]` are written as the mode's leaked Lime inks, commented.
- **Photographs** (`SEEDS.Grunge`, nine `grunge-*.jpg`, ~970 KB): hero `221f121f` is the
  2632 × 1402 stage shot (exported 1920 × 1023), the `pp` card `3ef9ee55` the singer (384 square),
  bio `8031d0f3` the drummer (820 × 1024, a plain `FILL`, no crop), gallery spotlight `a746e7e4`
  the band, calendar `019c80fd` the crowd, form avatar `81e1c9a9` the centre square of a pub shot
  whose whole frame seeds `photo`. **The greyscale is in the assets** — no fill filter, no node
  effect — so uploads stay in colour and open question 2 is closed. **The gallery strip departs
  from the frame on purpose**: the frame repeats the drummer six times round Retro's *colour*
  spotlight, a placeholder; the seven slots are the shoot's six pictures and a second hero crop,
  the band in `galActive()`'s slot.
- **Fonts**: Special Elite left the `index.html` link (nothing else named it); Courier Prime
  stays — the builder chrome reads it.
- **After-render, what the tokens alone did** (shots in the session scratchpad): every section is
  legible. The form's whole card is red with an unfilled submit (Lime's `pillBg` note, same cause);
  the map raster shows pink; pricing's deck alternates red / `#1A1A1A` / red; repertoire and the
  media band still draw the flat checkerboard strips; the header is still `FlatHeader`.

### Settled in section 1 (the header)

- **The hero is Lime's composition node for node**, so there is no Grunge block: `HeaderV0`,
  `NavBar`, `Wordmark`, `LogoMark`, `BookPill`, `TagChips`' desktop padding and `SealBadge`'s Lime
  branch read `s.lime || s.grunge` (`const lime = s.lime || grunge` in the first two — "the capsule
  composition"), and `grunge` names the deltas. `headerFamily('Grunge')` is `'grunge'`, four
  layouts (Layout 3 `964:68686` / `984:13900` / `984:13931` and Layout 4 `964:72944` / `971:7823` /
  `977:12044` confirmed in Static Youth); the still and `grunge-header.jpg` are gone.
- **Anton is set at 0.75 of the token, line height divided back out — `faced(s, size)` /
  `facedLh(s, lh)`, beside `labelStyle`.** Session 0's "the frame's weight and proportions" was
  wrong: measured off the render against canvas `measureText`, Stones Crush's cap height is .636em
  to Anton's .859 and "STATICYOUTH" 3.51em to 4.71; the nav, the wordmark and the location row give
  the same ratio to 2%. **`labelStyle`, `Title` and the Grunge `Wordmark` apply both centrally**, so
  every label-face site and every header title is already right; **a direct `fontFamily: s.display`
  site in a section owes `faced` / `facedLh` and `textTransform: 'uppercase'` itself** — grep
  `s.display` in the branch. The ramp stays the mode's. A width sum multiplies `antonEms(x, 0)` by
  0.75 (`vm.navEms` does; `antonEms` takes `track`, 0.02 by default for Retro).
- **`labelStyle` tracks `s.dls` (0) under Grunge**, as under Lime.
- **`Grain` takes an opt-in `grunge` prop** — `if (!s.retro && !(grunge && s.grunge)) return null`
  — not a widened gate: Retro calls `Grain` from every band, `exact` from fifteen sites, and a
  blanket gate would paint them all. A section passes `grunge` on the layer its frame carries.
  The hero's sheet also carries a `#0B0B0B` paint off its foot to 16.3%, drawn as a `maskImage`
  (under `lighten` it just removes the grain from the floor).
- **Session 0's "hidden grain layers" is corrected**: in media, map and form the `image 1` sheet is
  **visible** at .29 `LIGHTEN` at all three widths; what is hidden is the sheet's second paint, its
  gradient. The band table's "+ grain .29" stands. The sheets are 1527² (media) and 1440² at desktop
  and 768, hung at y −34 / −81 / −52; 390 map and form carry a 390 × 400 sheet only.
- **The band table is confirmed** by the walk (all three pages): media, map and form each own two
  `#000000` 1554 × 581 vectors; repertoire and testimonials carry a **hidden** `Layer_1` of the same
  size (Retro's torn edge, switched off). Narrow y's: media 768 head −529.7 / foot 1694.3 of 1742;
  390 foot 1183.8 of 1231 (that vector is 1176 wide); map 768 −510.7 / 1282.2 of 1349, 390 −530.7 /
  1132.2 of 1172; form 768 −520.7 / 1105.5 of 1122, 390 −537.4 / 1130.4 of 1176.
- **Device modes**: the 390 hero is Tablet (its `tk` is `{ list 19, dispXl 95, labelXs 14 }`, name
  28); the 768 and 390 calendar, the 390 gallery and the 390 testimonials state their page's own.
- **The header's Scheme 2 literals** are `G2 = { bg: '#171716', box3: '#353535' }` in `HeaderV0`:
  the pill's ink and the card's ground, and the chips' dark seat through `TagChips`' new `hues`
  (by seat, additive). The capsule's `box/1` is `#000000`, which is `s.bg` exactly. Chips state a raw
  radius 6, the card a raw 15.
- **Open question 5, sampled**: the render draws `#15180F` on the red chips, `#171716` in the pill
  and `#FF0000` on the card's rule and the location ring — the mode's values as stated, all followed.
- **`SealBadge` under Grunge is always the red disc with `s.bg` marks**, whatever `scheme` says,
  until a frame draws another; its name is `faced`. Tilt 26.06 (CSS sign), placed by the bounding
  box's centre: (1303, 220.9) / (669.4, 191.9) / (332.9, 166.9). `badgeText` prints, unlike Lime's
  reticle.
- **The title is two-tone and `inline` at every width**: at 0.75 "KAI MERCER" holds one line at
  390 as the frame's does, and a longer name wraps.
- **Moved with the shared helpers, theme 2 only** (digest: 91 files, none at 0, 1, 3, 4): every
  section's labels (size and tracking), every pill (now the capsule pill), every seal, the footer's
  wordmark. Nothing broke; each session re-reads its own.
- **Harness scripts**: a synthetic click on an anchor *detached* by the burger panel closing
  navigates the popup to the builder (`<base href>`) — reopen the burger per link.

### Settled in section 2 (the bio)

- **No Grunge block again: Lime's `if (s.v0 && s.lime)` is `(s.lime || s.grunge)`**, with
  `const grunge = s.grunge` naming four deltas. The tree is Lime's node for node at all three
  widths — flanks, the 488 × 648 frame (230 × 311 at 390), the 29 stacked head, the seal on Lime's
  exact centres (11.5 outside the left edge / 16.87 past the right / 5.58 inside it). **Theme 1 is
  the digest at risk in a widened block**, not theme 0; it came back zero.
- **The photograph is a raw radius 13 on `s.box3`, with no effect at all** — `effects: []`, so
  the *Glows* guess does not reach the bio. The outer 15 clip has no fill and its drop shadow
  draws nothing on black. A third fill, a gradient at .63, is `visible: false`.
- **The grain is the hero's recipe on a fixed sheet**: `image 1` is a **648 square hung off the
  card's bottom-left corner** at every width (at 390 it starts 337 above the card), lighten .5,
  with the same `#0B0B0B` foot paint as a 16.3% mask. `Grain`'s `style` takes
  `inset: 'auto auto 0 0'` and the square; the card's clip does the rest.
- **The title's second word takes the accent** — the frame reads "Reads *the* room." in
  `sem/text/2` with "the" in `#DF262C`. `s.title` is the artist's string, so the rule is
  positional: word two is `s.ac`, which on a two-word title is the header's own split and on one
  word colours nothing. A product call, reversible in one line; worth telling the designer. The
  emitted `Soulway 96px` on that span is the component default leaking — `getStyledTextSegments`
  gives one face at `display-lg` throughout (130 / 81 / 46), so neither narrow master overrides
  its Device mode and `s.dispLg` is right.
- **The left flank's foot line is Body/Eyebrow, bold**, where Lime's is Body/SM (the metadata
  gives it away: 204 wide against 173).
- **Measured**: desktop title 285.7 tall on three lines (348 × 0.82 = 285.4), "READS" 186.8 wide
  (225 × 0.82 = 184.5) — `faced` holds at display-lg too; photo 400.2 × 531.4; one line at 768
  and 390 as the frames draw. The root's 40 / 22 side padding against the masters' 30 / 20 is
  Lime's, inherited.
- **No live control**, Lime's note: `live=1` digests identical to the canvas at all three widths.

### Inherited and used

- *Check a narrow master's Device mode* (Lime 1, header) — the 390 hero, again.
- *Under Lime `pillBg` IS the accent* (Lime 1, header) — cards 2 and 3.
- *`vm.title` shadows the ramp's `title` size* (Lime 1, map) — the wordmark's literal 29.5 / 28.
- *The emitted `var(--token, #hex)` fallback is the component's default* (Retro 2, media) — the
  globe's `#5B5E2E`, the title's Soulway run.
- *A rotated group's metadata x/y* (`figma-frame-reading`) — the seal.
- *Divide the face out before comparing any width* (Retro 2) — became `faced`.
- *Place a seal by its disc's centre* and *measure under `.seal-spin` with the animation stopped*
  (Lime 1, bio) — the bio's seal, unchanged.
- *The emitted `var(--token, #hex)` fallback is the component's default* (Retro 2, media) — again:
  the title's `Soulway 96px` span and the narrow masters' `130px`.

*(A running list for the sweep's `CONVENTIONS.md`: each time a session leans on a bullet from
Lime's or Retro's Conventions, name it here in one line, with the plan it came from.)*

## Open questions

1. **Stones Crush** — *settled in session 0:* Anton, by user call. Worth telling the designer
   that the shipped face is a clean stand-in.
2. **Does Grunge desaturate an artist's uploads?** *Closed in session 0:* the greyscale is in the
   assets, so nothing desaturates and uploads stay in colour.
3. **`gigDark` under Grunge** — the map session's.
4. **Header cards 2–4 under Grunge** — *recorded in section 1.* All three render at three widths and
   publish. Card 2 (`HeaderV1`): Retro's cream mount, checker floor and sub-cards in Grunge tokens;
   its second hue is a placeholder (`mustard = s.grunge ? s.tx : s.pillBg`, the place card on
   `s.box1`) because `pillBg` is the accent. Card 3 (`HeaderV2`): a red sheet round the photograph,
   checker ribbon; the nav capsule takes `s.box1` for the same reason. Card 4 (`HeaderV3`): close
   already — capsule nav, seal, ruled avatar — with Retro's checker floor. Each is its layout
   pass's to fit; none reads `navNameEms` / `navCtaEms` / `navFits` yet (Lime's and Retro's).
5. **The leaked Lime inks** (`#15180F`, `#0D1F03`) and `stroke2` `#FF0000` — *sampled in section 1:*
   the render draws them as stated, so they are followed. Worth telling the designer.
6. **Anton at 0.75** — the stand-in is a third larger per em than Stones Crush, so the shipped type
   is scaled to the frame's glyph size. Worth telling the designer with open question 1.
7. **The bio title's accent word** — *section 2:* the second word takes `s.ac`, by position, since
   the string is the artist's. Worth telling the designer with 1 and 6.
