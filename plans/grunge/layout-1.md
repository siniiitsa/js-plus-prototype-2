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
| 3 | `media` | `964:58602` | Media Player — D · Floating cards stack | 1440 × 1253 | `986:44060` *(in `986:44059`)* | 768 × 1742.3 | `986:44072` | 390 × 1231.3 | `964:58590` | `964:58578` | done `036181e` |
| 4 | `gallery` | `964:58603` | Gallery Sections — Component 1 | 1440 × 819 | `986:44061` | 768 × 1116 | `989:22292` | 390 × 760 | `964:58591` | `964:58579` | done `bc04864` |
| 5 | `repertoire` | `964:58604` | Repertoire — A · Two-column dense | 1440 × 1096 | `986:44062` | 768 × 922 | `986:44074` | 390 × 918 | `964:58592` | `964:58580` | done `7ea79e7` |
| 6 | `map` | `964:58605` | Events Map — D · Compact tile | 1440 × 1151 | `986:44063` | 768 × 1349 | `986:44075` | 390 × 1172.2 | `964:58593` | `964:58581` | done `c4cbff0` |
| 7 | `pricing` | `964:58606` | Pricing — B · 3-col in soft panel | 1440 × 895 | `986:44064` | 768 × 765 | `986:44076` | 390 × 1510 | `964:58594` | `964:58582` | done `a3e6bcf` |
| 8 | `calendar` | `964:58607` | Booking Calendar — A · Scheduler | 1440 × 869 | `986:44065` | 768 × 1376 | `986:44077` | 390 × 997 | `964:58595` | `964:58583` | done `fb89dde` |
| 9 | `form` | `964:58608` | Enquiry Forms — B · Split context+form | 1440 × 965 | `986:44066` | 768 × 1122 | `986:44078` | 390 × 1176 | `964:58596` | `964:58584` | done `01e4cb2` |
| 10 | `testimonials` | `964:58609` | Testimonials H — Stacked tag card | 1440 × 730 | `986:44067` | 768 × 730 | `986:44079` | 390 × 730 | `964:58597` | `964:58585` | done `9366e28` |
| 11 | `footer` | `964:58610` | Footer — Component 2 / 3 / 4 | 1440 × 479.7 | `986:44068` | 768 × 647.4 | `986:44080` | 390 × 619.4 | `964:58598` | `964:58586` | done `c1c7cc4` |

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

### 3. `plans/CONVENTIONS.md` — **done in the end-of-pass sweep: [`../CONVENTIONS.md`](../CONVENTIONS.md)**

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
- **The media sleeve is a tilted pale polaroid** — ~~which is Retro's composition and not Lime's
  glowing card~~ *corrected in section 3:* the tree is Lime's node for node, and the polaroid is a
  frame round Lime's card.
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

**Done: `8a1d63e` (code, CLAUDE.md, README, `CONVENTIONS.md`, the two scripts) and `50d6338` (the
`index.html` refresh).** What each item came to is under *Learned on the end-of-pass sweep* at the
foot of *Conventions*; the list is kept as it was written.

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
  x at all three (11.5 outside the left edge / 16.87 past the right / 5.58 inside it) and Lime's
  desktop y; **the narrow y's are Grunge's own** — 23.15 above the card's foot at 768 (card y 264,
  seal top 805) and 5.65 below it at 390 (card y 192, top 465.89) against Lime's 25.15 / 0.65,
  since the section places the seal absolutely and the shorter foot line lifts the card. **Theme 1 is
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

### Settled in section 3 (the media player)

- **No Grunge block, for the third time: Lime's `if (s.v0 && s.lime)` in `Media` is
  `(s.lime || s.grunge)`**, `const grunge = s.grunge` naming the deltas. The plan's "read Retro's
  block first" was a guess off the render: the tree is Lime's at all three widths (flush rows on
  `sem/stroke/1` hairlines, 710 / 558 at 60, the opacity-0 252 disc, `LimeSkip`, the Book Now
  pill), and Retro's is overlapping cards beside a disc panel. The hooks sit above the block, so the
  published player needed nothing: row pick, pick-again-pauses, the disc, and Back wrapping 3 → 5
  all proved at `theme=2&live=1`, Book Now on `#form`.
- **`grungeBand` in the root** (`s.me && s.v0 && s.grunge` → `'#171716'`, after `limeLight`), the
  literal being Scheme 2's `sem/bg` — `HeaderV0`'s `G2.bg`. **The map and the form extend it**; the
  root's `color` stays `s.tx`, which is right on all three.
- **`TornEdge` takes `Grain`'s opt-in `grunge` prop**, for `Grain`'s reason (Retro calls it from
  repertoire and testimonials, where Grunge hides the layer). **The vector is Retro's `446:2390`
  path for path** (`vectorPaths[0].data` compared equal; the 390 foot alone is a 1176-wide variant),
  unrotated at both ends — so a band's head shows the vector's *foot* contour and its foot the
  *head* contour. `TORN_D` is only the head contour and is drawn at both; not worth a second path.
  **Depths off the renders** (PIL black-run per column): head **51** at all three widths, foot
  **35 / 48 / 40** — the plan's node arithmetic held. Expect the same method on map and form.
- **The band sheet**: `<Grain exact grunge blend="lighten" opacity={0.29}>` with
  `inset: calc(-1 * padY) calc(-1 * padX)`, first child of the wrapper. **An absolute layer paints
  over non-positioned content**, so the content column takes `position: relative` under Grunge to
  stand over it (the frame's paint order: sheet, content, seams, star).
- **The polaroid is "Frame 211"**: `s.tx`, radius 15, 20 / 20 / 80 / 20 (10 / 10 / 50 / 10 at 390),
  `rotate(2deg)` — Figma's −2 is CSS +2, and the render's right side sits lower. The card inside is
  radius 13 on `#222222` (Scheme 2's `box/2`, the disc's own fill), stated 540 at 1440 **and 768**
  (Lime's hugs there) and 313.3 at 390, **`effects: []`** — no glow, again. The scrim's
  `gradientTransform` works out to `SCRIM.limeSleeve` exactly. Its grain is `difference` at .5
  across the whole print, and that sheet's second paint (visible here, unlike the band's) is the
  hero's foot ramp: the sheet hangs 50 past the wide cards, so the mask is
  `linear-gradient(0deg, rgba(0,0,0,.45) 0%, #000 9.7%)`, and none at 390. CSS reserves no room for
  the lean (Figma's bounding box is 580 × 659), so the print stands a few px off the frame's x.
- **Type**: the row name is **Display/Title 36 / 28 / 26**, not Lime's Label/LG — written out
  through `labelStyle` because `s.title` is the heading string; now-playing is Label/MD over
  Body/MD. The heading is `faced` / `facedLh(0.89)` and uppercase at its own site. `<` and the disc's
  ▶ are `s.activeFg` (the leaked `#15180F`, followed; the `<` all but vanishes on the sleeve, as in
  the render).
- **The heading is two-tone across its typed break** — "Five worth" `sem/text/2`, "your ear."
  `sem/text/1`. Positional, since the string is the artist's: **words one and two are a block line,
  the rest a second block line in `s.ac`**, so the break and the colour cannot part and Lime's em
  measure is not needed (`antonEms`: "FIVE WORTH" 4.31, "…YOUR" 6.43, had it been). A title of two
  words or fewer is one white line. Open question 8.
- **The progress bar needs no departure**: track solid `sem/text/2`, fill the accent. The narrow
  masters' all-red bar is the fill set to FILL — a leak, not followed.
- **`BookPill` ties the disc to `fg`**, and this pill is white type beside a black disc with a red
  arrow: `fg={s.bg}` with `style={{ color: s.tx }}` (`style` spreads last). No new prop.
- **`GrungeStar`** (beside `LimeSkip`): the frame's path, 144 × 145.33 at every width, `s.ac`,
  placed off the content's top-right corner — 42 in / 25 down at 1440, 9.7 / 11.7 at 768, 18 *past*
  the edge and 47.7 down at 390.
- **The 390 master puts its own kicker under the head tear** (24 inset, 51 tear — the render clips
  "TOP TRACKS"). Not followed: Lime's extra `24px 0` on the wrapper stays, and the foot pill clears
  its 40 seam.
- **`FIELDS.media.cta`'s `in` is `{ Lime: [0], Grunge: [0], '*': [] }`**, and the Soundcloud hint
  names both. Any Lime-keyed `in` row is owed the same when its block is widened — the calendar's
  `heading` is next.
- **Measured**: desktop rows 105 (128 × 0.82), list and print 524.8 / 525, card 443 (442.8), star
  118.1, heading lines 95.2 (130 × 0.82 × 0.89); 768 rows 109.6, print 640, card 540; 390 rows 87.6,
  print 373, card 313.

### Settled in section 4 (the gallery)

- **No Grunge block, for the fourth time: Lime's `if (s.lime)` inside `Gallery`'s `if (s.v0)` is
  `(s.lime || s.grunge)`**, still after the seam, so `strip`, `active`, `go`, the 390 window and
  `srcRows` are shared whole. The tree is Lime's node for node at all three widths (`446:3352…3433`
  against `446:3270…3350`). The deltas are about fifteen leaves, so they sit in **one lookup at the
  block's head, `G`**, whose Lime arm is today's literals — theme 1 digests to zero. Proved at
  `theme=2&live=1`, all three widths: both arrows wrapping 6 → 0 and 0 → 6, Back to beginning, a
  thumb pick, the counter following, the 390 window sliding.
- **The rows are boards, not capsules**: radius 10 raw, gap 4 (Lime 5), a **3px INSIDE rule** —
  `s.box1` on the open row, `s.stroke1` on the closed — drawn as an inset box shadow so the stated 92
  holds. The open row adds `INNER_SHADOW 0 0 4 .25`; the closed rows' 7 / 9 drop shadow is
  `visible: false`. The glyph's seat is an **empty radius-6 square in a 1px rule** (`s.box1` open,
  `s.ac` closed) where Lime fills a disc, and the vectors are Lime's at **stroke 1** —
  `LimeSourceGlyph` takes an additive `stroke`. Glyph ink `sem/bg` open, **`sem/stroke/2` `#FF0000`
  closed** (followed, open question 5). The open row's label and cross are bound to `tag2/text`
  `#0D1F03` where the code reads `s.activeFg` `#15180F`, Lime's read — both leaked inks, both black
  on red. The label is a direct `s.display` site: `faced(s, s.list)`,
  `facedLh(s, 1.2)`, uppercase.
- **The heading is the media player's two-tone rule again** — "See us" `sem/text/2`, "in action"
  `sem/text/1` across the typed break, so words one and two are a block line and the rest an accent
  block line; Lime's `4em` cap is not needed. The kicker stays `s.tx`; the back link, its arrow and
  both credit lines are `s.ac`.
- **The card**: radius 13 on all three nested frames (no largest-wins), 557 / 524 / 344, shadow
  4 / 4 / 9 at .16. Counter chip on `s.box3`; brackets `s.inactiveLine`, unchanged. Arrow discs
  `s.box3` in a 1px `s.stroke1` ring round an `s.ac` arrow, blur dropped again.
- **Session 0's "the gallery's 636 is hidden" is wrong, section 1's correction again**: `image 1` is
  visible at .29 `LIGHTEN` at all three widths, and only its gradient paint is hidden. It is a 636
  square hung 6.5 down the desktop card (`width: 100%`, `aspectRatio: 1`), and a **973.64 square at
  (−132.8, −195.5) / (−132.8, −375.5)** at 768 / 390, passed through `Grain`'s `style`. Paint order:
  over the photograph, brackets and counter, under the arrows. The calendar's is probably the same
  story — read `visible` on the paint, not only the node.
- **The strip**: the viewer's tile takes a **1px inside `s.ac` rule** and the others nothing —
  `effects: []`, a plain stroke, so the *Glows* guess is wrong here too. An idle tile states no fill,
  so an empty one stands on `s.box1` with `s.tx` initials (Lime's is `s.tx` / `s.bg`).
- **Desktop halves are 636 : 636 with 56 between** (28 + 28), `1fr 1fr`, against Lime's 608 : 585
  at 135.
- **One named departure: the desktop arrow row.** "Frame 184" is 545 wide in the 636 card — Lime's
  585 − 40, leaked — which stands the right disc 71 in from the edge. Drawn 20 in on both sides, as
  the 768 master draws it (667 in 708). A leak that shows *and* reads as a defect is overridden;
  Lime's "leaked tops are followed where they show" covered the brackets and counter, which still are.
- **`FIELDS.gallery` has no Lime-keyed `in` row**, so nothing was owed there.
- **Measured**: desktop rows 75.4 at 3.3, head 190.4 (232 × 0.82), card 456.7 (557 × 0.82), thumbs
  62.3, rows' and strip's feet level at 659.7; 768 rows 92, card 524, heading lines 72.1; 390 card
  344, lines 40.9, TikTok wrapped to a second row (the section's own rule — the frame runs it 10 past
  its page). The bright spot in the 390 card's top-right corner is a ceiling light in the seeded
  photograph, not the grain.

### Settled in section 5 (the repertoire)

- **No Grunge block, for the fifth time: Lime's `if (s.lime)` inside `Repertoire`'s `if (s.v0)` is
  `(s.lime || s.grunge)`**, after the seam, with the gallery's **`G` lookup** at its head (Lime's arm
  is the old literals; themes 0, 1, 3, 4 digest to zero, canvas and `live=1`). The tree is Lime's node
  for node at all three widths — root gap 32, rows padded 27 on an inside 1px `s.stroke1`, columns 70
  apart, the 768 halves, the 390 stack — on **Scheme 1**, so every `s.*` sem read is right and no
  literal is owed. `Layer_1` holds the torn vector, **hidden**, as section 1 found. Proved at
  `theme=2&live=1&n=240`, all three widths: Next, a chip (the pager re-deriving, 20 → 7 pages), the
  search's empty state.
- **The leaves**: the field is an **empty box at a raw radius 9** in Lime's inset `s.stroke1` ring,
  round an **empty radius-5 tile in a 1px inside `s.ac` rule** (the gallery's glyph seat) with the
  same glyph in `s.ac`; the placeholder is `sem/text/1`, so the hint *and the live input* are `s.ac`. The published
  `::placeholder` is that red at .45 — dim on black, Repertoire's accepted diff, not a new one.
  **Chips are Body/MD at 1.5** (14 / 13 / 13; Lime's are Body/SM), the active one `s.pillBg` with
  **`s.activeFg`** ink (the leaked `#15180F`, followed). **The song is Display/Title 36 / 28 / 26**, a
  literal through `labelStyle` (`s.title` is the heading string — the media row's case), over
  Label/SM, which the frame sets `UPPER`; the block's `bebas` helper is `labelStyle` under Grunge
  only, since `textTransform` is a digest column. The artist's ink is bound to `sem/tag/2/bg`, the
  accent's hex; written `s.ac`. No node carries an effect.
- **The heading is two-tone and inline — the fourth positional rule**: "240" `sem/text/1`, "Songs"
  `sem/text/2`, so **word one is `s.ac` and the rest `s.tx`**, one line; a one-word title is all
  accent. `faced(s, s.dispLg)` / `facedLh(s, 0.89)`, uppercase, at its own site. Open question 9.
- **`Pager`'s Lime branch is `(s.lime || s.grunge)`**, and `frame.lime` is the override key for both.
  Grunge's arm: page pills `s.pillBg` with `s.tx` type through `labelStyle(s, s.labelSm)`, arrows
  unchanged. **The frame draws no current page** — every pill is `sem/active/bg` with white type and
  `effects: []`, red on red, the plan's own named risk — so the mark is a **named departure: the
  active chip's pair (`s.activeFg` ink) inside a 2px inset `s.tx` ring** (`t.on` / `t.onRing`). The
  ink alone was tried first: a 10px numeral changing colour does not read. What the widening moved,
  theme 2 only, recorded rather than fitted (Lime's spread exactly): **repertoire a1** at all three
  widths and **map a2 at 390**. The map session (a0) inherits the arm; check its pager on the
  `#171716` band and the red panel, and pass `frame.lime` if the ring or pills stop reading.
- **`FIELDS.repertoire` has no Lime-keyed `in` row**, so nothing was owed.
- **Measured against the masters' content edges**: desktop head 123.9 (151 × 0.82), title line 95.2,
  search 319 × 50, chips 24.7 (the ramp's 11px body-md against 14 × 0.82), rows 76.6 (94 × 0.82 =
  77.1, the same rounding), six 459.8, pager 45.1 / 71.3; 768 head 103.7, halves 344 + 344, rows 84.8
  (85), chips 29.5; 390 head 152.2 (152), rows 82.6 (83), the pager spread across the measure — six
  buttons where the master draws five, `pageWindow`'s compact row, Lime's.

### Settled in section 6 (the events map)

- **No Grunge block, for the sixth time: Lime's `if (s.lime)` inside `EventsMap`'s `if (s.v0)` is
  `(s.lime || s.grunge)`**, after the seam, with the **`G` lookup** at its head (Lime's arm is the old
  literals; themes 0, 1, 3, 4 digest to zero, canvas and `live=1`, and at theme 2 only map a0 moved).
  The tree is Lime's node for node at all three widths. Proved at `theme=2&live=1&n=30`, all three
  widths: a row lights its pin, a pin lights its row, the pager steps, the lit gig survives paging
  away and back, linked rows are `<a>`, and every click lands through the panel's grain sheet.
- **`grungeBand` is `(s.me || s.mp) && s.v0 && s.grunge`**; the form adds `s.fo`. **Scheme 2 lands on
  the palette but for one literal**: `box/1` and `inactive/border` are `#000000` = `s.bg`,
  `active/bg` and `text/1` are `s.ac`, `text/2` is `s.tx`; only `box/2` **`#222222`** is named (the map's
  ground, the date box, the idle page pill — the media card's own fill). "UPCOMING GIGS" is bound to
  `sem/tag/2/text` and resolves **white** here, not the mode table's `#0D1F03` — followed off the render.
- **Open question 3 closes: `gigDark` is not widened.** The block reads no `g.hue`, `mapBg` or `mapFg`.
- **The red panel is no nested mode and no raw fill**: the gig panel and every row are bound to
  `sem/active/bg`, the rows inside a 1px INSIDE `inactive/border` (black) at a raw radius 10. The third
  trap under *The schemes* is answered for the map; the form's half is still its session's read.
- **The leaves**: both cards radius 13 (`u(13)`) at every width; the tile is `s.bg` padded 20 (10 at
  390) round a radius-8 map on `#222222` under Lime's multiply at .6 in **`s.ac`**, with **no** stroke
  overlay and **no gap** over its foot at 768 (map 214.84, Lime's 219.84 and 12); the panel head is
  flush (no 20 inset), its 1px rule **is filled** (`s.bg`, 30 from the count) where Lime's is empty, and
  the 390 panel pads 30 at its top; the date is a radius-6 `#222222` box with white type. No node
  carries an effect. Head, radius label, base line and globe are `s.ac`; terms and everything on the
  panel `s.tx`. The radius label is **Display/Title** here (Lime's is Label/LG), through `labelStyle`;
  the block's `disp()` helper is `faced` / `facedLh` / uppercase for its three direct `s.display` sites.
- **Two sheets of grain.** The band's is the media player's recipe (`lighten` .29, out over the root's
  padding, `head` and the grid lifted with `position: relative`). The panel's is **its own**: a 682.5
  square hung off the panel's **bottom-left corner** at every width (y 3.5 / −87.5 / −209.5 is just
  the panel's height less 682.5), **`HARD_LIGHT` at .19**, the frame's *last* child — over the rows and
  the pager. `Grain` is `pointerEvents: 'none'`, so nothing is covered. **Named departure**: the 390
  band sheet is 390 × 400 at y −60.5 in the master (the head only, its cut edge hidden behind the
  tile but for two 10px slivers); drawn full, as at the other widths. The form's 390 sheet is the same
  story. And the inherited five-gig 390 page makes the panel 691 tall against the master's 473, so the
  682.5 sheet leaves its top 9px ungrained — invisible at .19, left alone; the sweep's page check will see it.
- **Seams off the renders** (PIL black-run maxima): head · foot **40 · 73** at 1440 (× 0.82),
  **70 · 66** at 768, **46 · 33** at 390. Node arithmetic agrees at 1440 and 768; at 390 the vector sits
  at x −582 and shows a shallower stretch, so the render wins.
- **This frame marks its current page**, unlike the repertoire's: a `box/1` black pill with white
  type among `#222222` pills with red type, arrows in a black 1px ring round a black glyph. `Pager`'s
  `frame.lime` takes an additive **`onBox`** (the current pill's own fill; nobody else passes it) and
  the map passes `{ box: '#222222', onBox: s.bg, ring: s.bg, ink: s.bg, idle: s.ac, on: s.tx,
  onRing: undefined }` — the `undefined` switches off the repertoire's ring. Section 5's worry (the
  inherited arm on the red panel) is closed by this. Map a2 at 390 still has the inherited arm.
- **Two live states the frames do not draw, redrawn** (Lime's rule): the **pin is `s.bg` in a 3px
  `s.tx` ring**, lit `s.tx` in a 5px `s.bg` ring at 16 — the accent vanishes on a raster multiplied
  with itself; the **lit row is the pager's own current-page pair**, `s.bg` under white type, the
  `#222222` date box still reading on it.
- **`FIELDS.map` has no Lime-keyed `in` row** (grepped by line range, 1166–1204 of `data.js`), so
  nothing was owed. Nor has `FIELDS.pricing`; the calendar's `heading` is still the next one due.
- **Measured against the masters' content edges**: desktop head line 95.2, cards 562 (686 × 0.82 =
  562.5), map 410.9 (501 × 0.82), foot 118.3 (145 × 0.82 = 118.9), rows 79.5, date 45.9 × 46.7; 768
  tile 387.6 (388), map 214.8, foot 132.8, rows 79, panel 592.6 (595); 390 tile 428.9 (429.16), map
  326 × 298, foot 110.9, rows 97. The root's 22 side padding against the master's 10 is Lime's,
  inherited. `n=30` gives `1 2 … 6` on one row at all three widths.

### Settled in section 7 (pricing)

- **No Grunge block, for the seventh time: Lime's `if (s.lime)` inside `Pricing`'s `if (s.v0)` is
  `(s.lime || s.grunge)`**, after the seam, with the **`G` lookup** at its head (Lime's arm is the old
  literals; themes 0, 1, 3, 4 digest to zero, canvas and `live=1`, and at theme 2 only pricing a0
  moved). The tree is Lime's node for node at all three widths, on **Scheme 1**, so every `s.*` sem
  read is right and no literal is owed: chips, ico, tick, unit, blurb, features, small print and
  `BookPill bg={s.pillBg} fg={s.activeFg}` needed nothing (the frame binds `#0D1F03` where the code
  reads `s.activeFg` `#15180F` — the gallery's reading, both black on red). Proved at
  `theme=2&live=1&n=8`, all three widths: the chips filter, the lit chip reads, cursors are live,
  the pills are `<a href="#form">`, and `n=0` prints *No packages yet.*
- **The leaves**: the card is **`s.box1` at a raw radius 13 in a 1px inside `s.stroke1` hairline**
  (Lime: `box2`, 55, 3px); the ico binds `radius/chip`, so `s.radiusChip`. **The featured seat is a
  1px `sem/stroke/2` rule (`#FF0000`, followed) and nothing else** — `effects: []` on every node, so
  the *Glows* guess is wrong a fourth time and pricing's "ringed in red" is a plain stroke. The seat
  rule is Lime's, `i % 3 === 1`: `n=8` rules 2 / 5 / 8, and a filter moves it (Solo → package 3).
- **Three direct face sites owed `faced` / `facedLh`**: the heading and the numeral (`s.display`) and
  the package name (`s.label`, already uppercase). The pill's type was already `BookPill`'s.
- **The heading is two-tone and inline — the fifth positional rule**: "Choose the set that's"
  `sem/text/2`, "right for your night" `sem/text/1`, and the colour break does not coincide with the
  line break, so spans and not block lines: **words one to four are `s.tx`, the rest `s.ac`**; four
  words or fewer are all white. Its box is a FIXED 597.53 at 1440 (Lime's 640), in `G`; at 0.75 Anton
  breaks after "YOUR" there exactly as the frame does, one line at 768, two at 390. Open question 11.
- **The seal ("Frame 178") is new — neither twin draws one.** 125.37 (101.56 at 768), tilt 26.06,
  placed by the disc's centre off the *content's* right edge and foot (the wrapper takes
  `position: relative` under Grunge): 39.15 in / 7 up at 1440, 40.35 in / 16.93 up at 768 — measured
  32.1 / 5.71 (× 0.82) and 40.35 / 16.93. **Named departure: the 390 master's seal is a leak** — its
  constraints are MIN / MIN and it stands at y 612 of 1510, over the featured card's unit and blurb
  ("One DJ for the whole" is hidden). It keeps the frame's x (78.6 in) and size and hangs on the
  same corner as the wide masters, the disc's foot the master's own 40 under the content's; the
  small print takes a 150 right reserve there (only while the seal shows) and wraps to two lines.
  **`showBadge` has no pricing field**, so this seal is hidable by nothing — the bio's case, not
  fixed here. Open question 12.
- **The root's hairline: `grungeRule`** (`s.pr && s.v0 && s.grunge`, beside `grungeBand`), an inset
  1px `s.inactiveLine` box shadow. Pricing is the **only** Static Youth instance whose own stroke is
  visible (every root at all three widths was read; the footer's is a top-only white 1px, its own
  session's) — both twins carry the same stroke HIDDEN. It is drawn at the root because the block
  stands inside the root's padding. `#1A1A1A` on black: all but invisible, and followed.
- **`FIELDS.pricing` has no Lime-keyed `in` row**, so nothing was owed; the calendar's `heading` is
  next, in section 8.
- **Measured against the masters' content edges**: desktop head 82 (100 × 0.82), heading 490 wide on
  two lines, deck at 108.2, cards 417.7 (the frame's 512 × 0.82 = 419.8 — Lime's same 2px, our
  narrower column's wrap), pill 44.3; 768 head 99.6, deck at 131.6, cards 462 (465, the panel FIXED
  there), pill 54; 390 head 117.1 (117), deck at 149.1 (149), cards 376.6 / 416.5 / 416.5 (377 / 417
  / 417). "Drinks + dinner ambience" wraps at 768, Lime's inherited 216 against 222.67.

### Settled in section 8 (the booking calendar)

- **No Grunge block, for the eighth time: Lime's `if (s.lime)` inside `Calendar`'s `if (s.v0)` is
  `(s.lime || s.grunge)`**, after the seam, with the **`G` lookup** at its head (Lime's arm is the old
  literals; themes 0, 1, 3, 4 digest to zero, canvas and `live=1`, and at theme 2 only calendar a0
  moved). The tree is Lime's node for node at all three widths, on **Scheme 1**, both narrow masters
  in their page's Device mode, so every `s.*` sem read and ramp key is right. Proved at
  `theme=2&live=1`, all three widths: both arrows wrap the twelve months, a pick moves the red fill
  and the line, a booked day takes no click or cursor, re-clicking the lit day falls back to the cued
  June 12, and the pill is `<a href="#form">`.
- **The leaves**: the panel is `s.box1` at a **raw radius 13 in a 3px `s.stroke1` ring** (Lime:
  55, `stroke2`), still the overlay span. The month discs are **`s.bg`** (the frame binds `sem/bg`;
  Lime's `s.activeFg` would only have looked right) round an `s.ac` arrow. Cells are **`s.bg` at a
  raw 10** in the same 1px `s.stroke1` ring (Lime: `box2`, `radius/card`). **The picked day is the
  active pair — `s.pillBg` under `s.activeFg`, and `effects: []`**, so the *Glows* guess is wrong a
  fifth time. Day names, the foot line, the month and the heading are all `s.ac`; only the day
  numbers are `s.tx`. Booked is Lime's state unchanged — opacity .38, no strike — and the frame dims
  Lime's own six days (2, 6, 14, 24, 27, 28).
- **The 390 cell keeps the master's 50.49 at radius 10** — Lime's circle (`G.round`) was a user call
  for a 26 corner drawing a lozenge on a 45 column, which a 10 does not; not inherited.
- **Two direct face sites owed `faced` / `facedLh` / uppercase**: the heading (Display/MD, one tone —
  "Book Now" is all `sem/text/1`, so no positional rule this time) and the month (Display/SM), through
  the block's `disp()` helper, Grunge's arm only. The month measures 124.9 / 121.8 / 91.4 against the
  frames' 121.4 (148 × 0.82) / 118 / 89.
- **The photograph is a raw radius 12 under a sheet of the band grain**: `image 1`, a 624 square at
  the card's top-left, `lighten` .29, its gradient paint hidden — section 4's correction of session 0
  once more. **Named departure**: the 768 master leaves the 624 sheet in a 668 card (44px ungrained);
  drawn `width: 100%`, `aspectRatio: 1`, the gallery's desktop recipe. At 390 it is the 624 square
  hung 217.5 above the card, as stated. No seal, no seam.
- **The foot keeps Retro's `BookPill`** in the capsule defaults (`s.pillBg` / `s.bg`), which read on
  `#1A1A1A`; the frame draws no pill. Foot 110 / 134 / 149 against the frames' 101 / 100 / 100, Lime's
  own diff.
- **`FIELDS.calendar.heading`'s `in` gained `Grunge: [0, 1, 2, 3]`** — the row the last five sections
  named as due. No other Lime-keyed row outside the header remains (`grep -n "Lime: \[" data.js`).
- **Measured against the masters' content edges**: desktop head 59, grid half 431 (526 × 0.82), cells
  58.8 × 45.8, discs 45.1 × 44.3, photo 493.2 × 398.2; 768 halves 526 + 526, cells 78.3 × 55.9, photo
  648 × 486; 390 grid 427, photo half 308, photo 306 × 268, cells 44.8 × 50.5 (48.29 in the frame — our
  346 panel against its 370).

### Settled in section 9 (the enquiry form)

- **No Grunge block, for the ninth time: Lime's `if (s.v0 && s.lime)` ahead of `EnquiryForm`'s
  `if (s.v0)` is `(s.lime || s.grunge)`**, with the **`G` lookup** at its head (Lime's arm is the old
  literals; themes 0, 1, 3, 4 digest to zero, canvas and `live=1`, and at theme 2 only form a0 moved).
  The tree is Lime's node for node at all three widths, both narrow masters in their page's Device
  mode. The live seam is hoisted above the block, so nothing was owed. Proved at `theme=2&live=1`,
  all three widths: a refused submit rings all four boxes and prints the prompt, typing clears each
  ring, *Party* moves the mailto subject to *Party enquiry*, a valid submit (under a capture-phase
  `preventDefault`) swaps in the sent block, *Write another* restores the values and the message,
  the pill is `<a href="mailto:…">`; the canvas carries no anchor, input or pointer cursor.
- **`grungeBand` is `(s.me || s.mp || s.fo)`** — the third and last Scheme-2 band. **The third trap
  under *The schemes* closes**: the form half is a **nested Scheme 3** (`187:8`), whose `sem/bg` is
  `s.ac` exactly; the context half is unfilled on the shell, which is Scheme 2's `box/1` `#000000` =
  `s.bg` at a **raw radius 13**, and the form half is **square** inside that clip (Lime's 55 left
  corners are gone). Named Scheme-3 literals: box `#F52E34` (`box/2`), idle chip `#9E1F17` (`box/1`),
  its ring `rgba(0,0,0,.15)` (`stroke/1` — `s.stroke1` is the *white* 15% and wrong here). The boxes'
  ring is 1px inside `sem/active/bg`, black, `s.bg`. **The submit alone is back on Scheme 1**:
  `s.box1` `#1A1A1A` lettered in `s.ac`, an `s.ac` disc round an `s.box1` arrow; *Write another* is
  the same pill. No node carries an effect.
- **Inks**: everything on the context half is `sem/text/1`, `s.ac` — brand, kicker, heading, ✓ and
  promises, one tone, so no two-tone rule this time; labels, placeholders, the prompt and the sent
  block are `s.tx`; chip type is black on both the white picked chip and the idle ones.
- **The refused box is the fourth redrawn live state**: the idle ring is already full black, so
  thickening it is weight alone on red; it is **2px of `s.tx`**, Lime's layout-4 rule (colour, not
  weight alone). CLAUDE.md's refused-box sentence owes a Grunge arm in the sweep.
- **Type**: labels and the pill are Display/List, the heading Display/SM, the sent head the same —
  all through the block's `disp()` helper (`faced` / `facedLh` / uppercase, identity off Grunge).
  **The brand is Label/MD `UPPER`** (20 / 14 / 13) through `labelStyle`, where Lime's is Display/List;
  **the chips and the ✓ are Body/MD at 1.5** (chips 31 / 30 / 30), where Lime's are Body/SM.
- **The heading keeps the frame's typed break by position** — "Let's make" / "your night
  unforgettable.": words one and two are a block line and the rest a second (the media heading's
  rule in one tone), which is what gives the 390 master's own two lines, the break Lime's cap could
  not reach. At 1440 and 768 the rest wraps inside Lime's cap recomputed for Anton at 0.75:
  UNFORGETTABLE. 6.03em of the faced size, LET'S MAKE YOUR 6.35, so **6.2em** — three lines on both.
  The credit row is 49 tall here (Lime's 56), so the 1440 head stands `u(20)` under it for the
  frame's 68. Open question 14.
- **The 390 master is Retro's where Lime's was not**: a 100 message box and the stacked pair 10
  apart. The chip row's wrap to a second line at 390 is the frame's own here.
- **The shell's clearance is the frame's own**: 170 / 100 / 60 round the shell less the root's
  `padY`, as wrapper padding (`G.pad`) — the foot tear is 90 deep at 1440, where Lime's arcs were 44
  and its extra 20 / 24 would have stood the shell 6 off the tear.
- **Sheet and seams**: the media player's band recipe (`lighten` .29 out over the root's padding,
  the shell lifted with `position: relative`). **Named departures**: the 768 master hangs its 1440
  sheet at y 105 (the head ungrained) and the 390 one is 390 × 400 at y 159; both drawn full, the
  map's story. Seams off the renders (PIL black-run maxima), head · foot: **40 · 90** at 1440
  (× 0.82), **60 · 16** at 768, **40 · 38** at 390 — node arithmetic agrees at 1440 and 768 (the 768
  foot vector sits at x −328 and shows 16.5), and at 390 the render wins again.
- **Named diff, Lime's**: the frame's submit types *Enquire* where `vm.formBtn` seeds *Book Now*; and
  the form half is 707.6 against the frame's 744.6 beside the fixed 420 × 0.82 context half.
- **`FIELDS.form` has no Lime-keyed `in` row**, so nothing was owed.
- **Measured against the masters**: desktop root 791.5 (965 × 0.82 = 791.3), shell 512.7 (512.5),
  context 344.4, head 55.8 under the credit's top (55.8), boxes 49.2, chips 24.7, message 109.9; 768
  root 1119.2 (1122), shell 919.2 (922), context 348.5 (350), form half 570.7 (572), boxes 60, message
  134; 390 root 1171 (1176), shell 1051 (1056), context 286.5 (288), form half 764.6 (768), message 100,
  *Other* on its second row. The narrow 2–5px are the Anton-at-0.75 label line boxes (22.8 against the
  frame's rounded 23, 21.6 against 22), summed.

### Settled in section 10 (the testimonials)

- **No Grunge block, for the tenth time: Lime's `if (s.lime)` inside `Testimonials`' `if (s.v0)` is
  `(s.lime || s.grunge)`**, after the seam, with the **`G` lookup** at its head (Lime's arm is the old
  literals; themes 0, 1, 3, 4 digest to zero, canvas and `live=1`, and at theme 2 only testimonials
  a0 moved). The tree is Lime's node for node at all three widths, on **Scheme 1** — so the root is
  untouched: no band, `s.bg` is the ground. `Layer_1` is visible but its one fill is hidden, the band
  table's "none" confirmed again; no grain, no seal. The 390 master states Device: Mobile. Proved at
  `theme=2&live=1`, all three widths: Next walks all five reviews and wraps, Back wraps 0 → 4,
  pointer cursors; the canvas arrows carry no cursor and ignore a click; `n=1` draws no arrows and
  `n=0` prints *No reviews yet.* in white.
- **The leaves**: card and both backs a **raw radius 13** (Lime 55). The card is `s.box1` lettered in
  `s.tx` (its nested Scheme 4 ≡ 1, a no-op); the red back is `s.ac`, the dark back **Scheme 2's
  `box/3` `#353535`** — `HeaderV0`'s `G2.box3`, a named literal (Lime's seat is `box/2`). All three
  keep Lime's `DROP_SHADOW` 0 / 4 / 4 at 25%, which on black shows only where a foot crosses the back
  under it. The reviewer pill is the active pair (`s.pillBg` / `s.activeFg`, the leaked `#15180F`,
  followed), the role pill `s.bg` lettered in `s.ac`; both keep radius 12 and 6 / 12. **The arrows
  needed nothing**: a 1px inside `stroke/1` ring round a `text/2` glyph, Lime's `ring()` as it stands.
- **Type**: the quote is Display/MD at 1 — a direct `s.display` site, so `faced` / `facedLh(s, 1)` /
  uppercase — and **one tone, all `sem/text/1`, `s.ac`: no positional rule this time**. The eyebrow is
  `s.tx`, otherwise Lime's. **The pills are Display/Title 36 / 28 / 26**, not Lime's Label/LG — the
  `titleSize` literal through `labelStyle`, with `whiteSpace: 'normal'` because they are content.
- **The narrow backs and the card's place are the masters' own** (desktop is Lime's exactly):
  `[top, left, right, bottom]` off the card — 768 red −46 / 35 / 39 / 27, dark −27 / 14 / 14 / 50; 390
  red −45.7 / 30 / 33 / 57.7, dark −29.7 / 14 / 14 / 76.7. The card stands 201.5 down and 155.5 up the
  768 band (Lime 205.5 / 159.5), 201.2 down at 390 with the arrows 33.8 under it (Lime 38). The 390
  bleed to x 13 and the arrows' `marginBottom` (20 / 46) are Lime's, unchanged.
- **`FIELDS.testimonials` has no Lime-keyed `in` row**, so nothing was owed.
- **Measured against the masters**: desktop band 598.6 (730 × 0.82), card 590.4 × 344.4, backs 511.7 ×
  321.4 and 556 × 348.5, quote three lines as the frame breaks them, pills 42.2 (52 × 0.82 = 42.6),
  arrows 45.1 × 44.3; 768 band 729.3, card 464 × 372.3 (373), backs 390 × 391.3 (392) and 436 × 349.3
  (350), pills 42.8 (43); 390 band 729.8, card 364 × 332.8 (333) at x 13, backs 301 × 320.8 and 336 ×
  285.8, pills 40.6 (41), arrows at 567.8 (568). At 768 and 390 Anton at 0.75 breaks the quote one
  word later than Stones Crush — 768 "…TO THE LAST / ENCORE." against the frame's "…TO THE / LAST
  ENCORE.", 390 "…EMAIL TO THE / LAST ENCORE." against "…EMAIL TO / THE LAST ENCORE." — three lines
  either way.

### Settled in section 11 (the footer)

- **No Grunge block, for the eleventh and last time: Lime's `if (s.lime)` at the head of `Footer` is
  `(s.lime || s.grunge)`**, `const grunge = s.grunge` naming the deltas (too few for a `G` lookup).
  The tree is Lime's node for node at all three widths — Frame 199 / 175 / 202 / 178, Line 19, Frame
  198, Frame 201, the same leaked 743 in the 708 frame — on **Scheme 1**, so every `s.*` read is right:
  the top edge, Line 19, the row's rule and the globe are all `sem/stroke/1`, the name, bar, links and
  small print `sem/text/2`, the statement `sem/text/1`. No node carries an effect, no grain, no seam.
  Digest, all 645 renders canvas and `live=1` at themes 0–4: exactly footer a0 at theme 2, three
  widths. Proved at `theme=2&live=1&n=8`, all three widths: rows are `<a href="#cat">`, the address
  row opens a new tab, the pill is `<a href="#form">`; on the canvas every anchor is href-less and the
  pill a span; `n=0` is the pill alone and `n=5` splits 3 / 2.
- **Type**: the name and the links are **Label/MD `UPPER`** (20 / 14 / 13) through `labelStyle`, where
  Lime's are Display/List and Label/SM. The statement (Display/MD) and the small print (Display/List)
  are direct `s.display` sites: `faced` / `facedLh` unconditionally (identity off Grunge) and
  `textTransform` behind `grunge`, since it is a digest column.
- **The statement keeps the frame's own 439.59 box at 1440 and 768, and the column at 390.** Lime's
  `9em` and its 390 `marginRight` are Bebas fits: in Anton at 0.75 "YOUR NIGHT UNFORGETTABLE." is
  10.48em of the faced size — 393 at 768, 299 at 390 — and 464 against the desktop's 360, so the
  lines are 3 / 2 / 2 as the frames draw them. One tone, so no positional rule.
- **`BookPill` needed nothing**: the shared branch's defaults are the frame's pill exactly (red, black
  type, a black disc round a red arrow), `full` at 390.
- **The seal is the frame that "draws another": `SealBadge` takes an additive `line`.** Frame 178 is a
  `sem/bg` disc with its rings and ticks in `sem/stroke/2` (`#FF0000`) and the name in `sem/active/bg`
  — both reds followed (the ticks are bound to `active/bg` too; drawn with the rings, one `mk`). `line`
  is Grunge's alone and the footer passes it, so the header's, the bio's and pricing's red discs, and
  every unfitted layout's, do not move. **Not** done by honouring `scheme` under Grunge: that would
  have flipped every default-scheme caller in layouts 2–4 to the black disc. Disc **150.37** (× 0.82 /
  verbatim) and **74.4** at 390, tilt 26.06.
- **A turned frame's centre from the plugin's x / y**: `n.x` / `n.y` are the turned frame's own
  corner, so the centre is `(x + 0.2296a, y + 0.6689a)` at −26.06°, `a` the disc. It gives Lime's
  three recorded pairs back exactly, and here **96.41 / 37.95, 107.42 / 64.57, 68.6 / 8.14** (in from
  the column's / content's right, down from the top less the dropped 56) — confirmed by the red
  ring's bounding-box centre on the renders (702.5 / 94, 630.1 / 120.8, 311 / 64) and on ours.
  Cheaper than `get_design_context`, which this session did not need at all.
- **At 390 the wordmark's bar runs 10px under the seal's disc** — our 346 column against the frame's
  370, and "KAI MERCER" is wider than the mock "STATIC YOUTH". The disc is `s.bg` over it; left alone.
- **`FIELDS.footer` has no Lime-keyed `in` row**, so nothing was owed.
- **Measured against the masters' content edges**: desktop statement 360 × 177 on three lines (216 ×
  0.82), link pitch 36.5 (45 × 0.82 = 36.9 — `s.labelMd` rounds to 16), column 2 at 187 from column 1
  (233 × 0.82 = 191 less the narrower Anton pill, Lime's hug), pill 125 × 44.3, small print 56 row;
  768 statement at 103.4 on two lines at 50, pitch 38.4 (38), pill 136.9 × 54 (141), row 68 with the
  leaked 56 inset; 390 statement at 91.4, two lines at 38, pitch 37.3 (37), pill 134 × 54 (138), halves
  173.

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

- *A section whose live seam is hoisted above its branches can always take a block* (Lime 1,
  media) — and a second template can share it.
- *An opacity-0 node is a spacer* and *a stated list height is a column minimum* (Lime 1, media) —
  both unchanged under Grunge.
- *`vm.title` shadows the ramp's `title` size* (Lime 1, map) — the row name's 36 / 28 / 26.
- *The emitted DOM order is the frame's paint order* (`figma-frame-reading`) — the sheet under the
  content, the print's grain over the transport.

- *Where a section's seam lives in the branch, put the block after the seam* (Lime 1, gallery) —
  and widen it there.
- *Transcribed glyphs share one viewBox* (Lime 1, gallery) — `LimeSourceGlyph` at stroke 1.
- *Leaked tops are followed where they show* (Lime 1, gallery) — brackets and counter; the arrow
  row's leaked width is the exception, named above.

- *`Pager` has a Lime branch, `BookPill`'s shape*, *the 768 halves take `flex: 1 1 50%`* and *the
  search pill's ring is an inset `boxShadow`* (Lime 1, repertoire) — all three unchanged.
- *Retro's live states vanish under Lime; redraw them, never inherit them* (Lime 1, map) — the
  pager's current page, which Grunge's frame does not draw at all.
- *One five-theme digest is the whole proof for a shared-helper change* (Lime 1, sweep) — `Pager`.

- *Retro's live states vanish under Lime; redraw them, never inherit them* (Lime 1, map) — the pin
  and the lit row, again.
- *`vm.title` shadows the ramp's `title` size* (Lime 1, map) — the block's own `titleSize`, reused.
- *The 390 page is five gigs* and *the compact `pageWindow` at every width* (Lime 1, map) — unchanged.
- *The emitted DOM order is the frame's paint order* (`figma-frame-reading`) — the panel's sheet last.

- *The glow is a seat: rendered index `i % 3 === 1`* and *emptied content drops its node* (Lime 1,
  pricing) — the seat now carries a rule instead of a glow.
- *Place a seal by its disc's centre, off the edges of what it hangs on* (Lime 1, bio) — the third
  Grunge seal.
- *A leak that shows and reads as a defect is overridden* (this plan, gallery) — the 390 seal.

- *The panel's ring is an overlay, not a `boxShadow` on the panel*, *booked is the frame's own
  state: opacity .38, no strike* and *the foot keeps Retro's BookPill* (Lime 1, calendar) — all three
  unchanged.
- *A leak that shows is overridden* (this plan, gallery) — the 768 grain sheet's 624.

- *A section whose live seam is hoisted above its branches can always take a block* (Lime 1, media)
  — the form's, shared by a second template.
- *A refused box changes colour, not weight alone, when the idle ring is already full ink* (Lime's
  layout-4 form, CLAUDE.md) — the fourth redrawn live state.
- *`get_variable_defs` mixes nested schemes in one list; the `use_figma` fills settle which node is
  on which* (Lime 1, form) — the Scheme-3 half and the Scheme-1 pill.
- *The 390 band sheet is drawn full* (this plan, map) — and the 768 one here.

- *The backs are insets off the card*, *the 390 card bleeds into the root's padding* and *the wide
  arrows centre on the wrap, not the card* (Lime 1, testimonials) — all three unchanged.
- *`vm.title` shadows the ramp's `title` size* (Lime 1, map) — the pills' 36 / 28 / 26.
- *Scan before deciding on a drop shadow* (Lime 1, testimonials) — kept; it is the shared value.

- *The tenth Lime block, at the head of `Footer`*, *three rules the twin does not draw*, *the 768
  small print's 56 inset is a leak, and it is followed* and *the link cursor is not live-gated* (Lime
  1, footer) — all unchanged; *the statement's measure* is the one bullet not inherited.
- *Place a seal by its disc's centre* (Lime 1, bio) — the fourth Grunge seal, by arithmetic this time.
- *`textTransform` is a digest column* (this plan, repertoire) — the gate on the capitals.

*(The running list the sweep extracted [`../CONVENTIONS.md`](../CONVENTIONS.md) from: each time a
session leaned on a bullet from Lime's or Retro's Conventions, it was named here in one line, with
the plan it came from. Kept as the pass wrote it, a blank line between sections.)*

### Learned on the end-of-pass sweep (`8a1d63e` and `50d6338`)

- **`Photo`'s empty `backdrop`** was Retro's browns under a red nav (`s.edge` → `#2A2622` →
  `#14110E`). It takes Lime's arm — `(s.lime || s.grunge)`, `box1` → `bg` → `box3`, which in Static
  Youth are `#1A1A1A` → `#000` → `#0E0E0E`. `&noimage=1` moved `_theme_2_` alone (header arch 0, 2,
  3, 4 × three widths: the four that draw a backdrop); the seeded five-theme digest moved nothing,
  Lime's lesson again.
- **The header's `in` had no Grunge row**, so under Grunge the edit panel printed no "Not shown in
  this layout" at all — not on the plan's list; found by reading CLAUDE.md's "names Retro and Lime
  only" against a template that now has a four-card family. Measured with `reach.mjs` plus seven
  header probes (kicker, subtitle, location, cta2, showBadge, badgeText, align): kicker / tags /
  showTags `[0, 2, 3]`, subtitle and heroCta `[1]`, location all four, cta2 `[1, 2]`, showBadge and
  badgeText `[0, 1, 3]`, align `[0]`. Cards 2–4 are placeholders, so **each layout pass re-measures
  its card** (Lime's `badgeText` is `[3]` where Grunge's placeholder cards still read it). The
  identity probes agree with Lime's hints but for one: Grunge's bio layout 3 prints no tags, so the
  tags hint's "(in Lime, layout 3 as well)" stands; the location hint now says "in Lime and Grunge,
  layout 4 only".
- **Two stale Grunge facts session 0 left in the docs**, neither on the list: "casing it would shout
  on Grunge and Pop" (Grunge cases `'title'` now) and "Grunge's `T.tags[3]` IS its black background"
  (it has two tags; the walk starts at `3 % 2` and still lands on the stamp red). Reworded in
  CLAUDE.md, README and the five comments that said either. "On Grunge `tx` and `paper` are one
  value" is still true and stays.
- **The template-list grep** returned 21 hits; eight made a claim about the list (`sectionVm`'s
  `retro` and grain comments, `T.ui`'s, the seeding comment, the §6 picker banner, `labelStyle`'s,
  `FIELDS.media.soundcloud`'s, `reachOf`'s) and were fixed. "The flat three" inside bio layout 2 and
  map layout 3 is a branch-local truth — Grunge is flat there — and stays until those passes.
- **The whole-page published check is committed: `source/scripts/page-check.mjs <Template>
  [cards]`.** Lime's was never kept, so this is its *Learned* bullets rebuilt. Card 1's full walk
  under Grunge: nine nav links and Book Now each scroll to their section; the media player plays
  (`paused: false`, `currentTime` 1.03 after one trusted click); gallery, repertoire, map, pricing,
  calendar and testimonials all answer the generic probe (the `false`s are All chips already lit
  and the gallery's current slot); the form composes its `mailto:` and swaps to the sent block;
  all nine footer links scroll; the 390 burger opens (1 fragment link → 11); `scrollWidth −
  innerWidth` is 0 at 390; no console or page error in either window. **Two traps of its own**: a
  popup opens at 800 × 600, so the first run "proved" a one-link nav — resize before anything,
  not only before the narrow pass; and `NavMenu`'s burger is a 26px `<span>`, not a button, so it
  is found by cursor and width.
- **The seams, against real neighbours**: 180px clips on the top of every section at 1440 and 390.
  The header fades into the bio with no seam; media, map and form each own a head and a foot tear
  onto black neighbours; pricing's `grungeRule` hairline and the footer's top rule meet their
  neighbours square. Nothing to fix. **Section 6's 9px ungrained strip** at the head of the 390 map
  panel was read at 3× on the real page: invisible, left.
- **The four header cards** all render at 1440 and 390 and publish, eleven sections each, in
  `pageOrder(i)`'s own order, with no error — open question 4's record stands after sections 2–11
  moved `SealBadge`, `BookPill` and `Pager`. Cards 2 and 3 logged React's "removing
  `rowGap` … `gap`" shorthand warning **once**, on the script's first run (the popup resized 800 →
  390 directly), and never again in three reruns, under any template. The one node that drops an
  inline `rowGap` on that resize is in the header, and it does the same under Retro's card 2, so it
  is `HeaderV1`'s own code and not this pass's. Not chased further; noted for the layout-2 pass.
- **The two-build digest is committed too: `source/scripts/build-digest.mjs <label> <url>`**, the
  editor walk Lime's notes describe. Old build digested before the `cp`: themes 0, 1, 3 and 4
  byte-identical at Desktop / Tablet / Mobile, theme 2 moved 1506 / 1423 / 1397 rows, and
  `modal.txt` reads `Grunge: 3 cards` → `4 cards` — the shipped-it tell.
- **Sizes after the pass**: 43 photograph files, 5.19 MB; the standalone `index.html` is 7.92 MB
  (was 6.96). Anton was already loaded, so no face was added.
- **`CONVENTIONS.md` came out as four groups, not one list**: reading Figma, measuring and proving,
  dressing a shared branch in a second mode, and — kept apart on purpose — the facts about Lime's
  eleven layout-1 blocks that Grunge inherited only because its page *is* those blocks. A template
  with its own compositions inherits the first three and none of the fourth.

## Open questions

1. **Stones Crush** — *settled in session 0:* Anton, by user call. Worth telling the designer
   that the shipped face is a clean stand-in.
2. **Does Grunge desaturate an artist's uploads?** *Closed in session 0:* the greyscale is in the
   assets, so nothing desaturates and uploads stay in colour.
3. **`gigDark` under Grunge** — *closed in section 6:* not widened; the block reads no `g.hue`.
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
8. **The media heading's two-tone split** — *section 3:* words one and two are the white line, the
   rest the accent line, by position. Worth telling the designer with 7.
9. **The repertoire heading's two-tone split, and the pager's current page** — *section 5:* word one
   takes the accent and the rest white, by position (the frame's "240 Songs"). And the frame marks no
   current page — every pill is the same red — so the shipped mark (dark ink in a white ring) is ours.
   Worth telling the designer with 7 and 8.
10. **The map's pin and lit row** — *section 6:* the frames draw neither (nor do Lime's or Retro's), so
    the black-in-white pin and the black lit row are ours. And the 390 band's grain is drawn full where
    the master cuts it at 400. Worth telling the designer with 9.
11. **The pricing heading's two-tone split** — *section 7:* words one to four are white and the rest
    the accent, by position (the frame's "Choose the set that's / right for your night"). Worth
    telling the designer with 7, 8 and 9.
12. **The 390 pricing seal** — *section 7:* the master stands it over the featured card's text (a
    leaked y); shipped on the panel's foot-right corner, as at 1440 and 768. And no field hides this
    seal or the bio's. Worth telling the designer with 10.
13. **The 768 calendar photograph's grain** — *section 8:* the master leaves its 624 sheet in a 668
    card, so the right 44px is ungrained; drawn across the card. Worth telling the designer with 10.
14. **The form heading's break, and the refused box** — *section 9:* the frame's typed break after
    "Let's make" is kept by position (words one and two a line), since the string is the artist's.
    The frames draw no refused box; ours is a 2px white ring. And the 768 / 390 band grain is drawn
    full where the masters cut it. Worth telling the designer with 8 and 10.
15. **The footer seal's two reds, and the 390 bar** — *section 11:* the line seal's rings are
    `#FF0000` and its name `#DF262C`, as the mode states; and the wordmark's bar meets the seal at 390
    under a real artist's name. Worth telling the designer with 5.
