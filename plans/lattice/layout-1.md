# Lattice layout 1 — section-by-section plan

This is the working checklist for bringing a **sixth template, Lattice**, to the builder at **layout 1**, from
the Figma file *JustPay — Batch 2*. It runs one unit per session, clearing context between units; git and this
file are the memory. Written 2026-11-19 from a planning read of all three masters (screenshots of every
section at 1440, section trees at all three widths, the frame's variables). Nothing in `source/` has been
touched.

**This is the pass Pop's layout 1 was** — a new `THEMES[]` entry whose layout-1 frames are the same eleven
components again — and it leans on [`../pop/layout-1.md`](../pop/layout-1.md) and
[`../lime/layout-1.md`](../lime/layout-1.md) for procedure. It does not repeat them. What is written here is
what differs, and four things differ more than anything those passes met:

1. **The Figma file is not the SAAS file.** It is `ORILFywSzuadscu6RzskCW`, and the frames are an HTML-to-Figma
   import ("Lattice — Claude Design"): every layer is named `Section` / `Container` / `Link` / `Text`, there are
   **no component sets, no `Theme=` variants and no variable modes** beyond one flat set bound at the page.
   Every earlier pass's *paired diff walk by layer name* is impossible. A section's twin is decided by
   **composition and geometry** (screenshots and `get_design_context`), and the plan's twin column below is a
   prediction from the pictures, not a measurement.
2. **The page is a different product look**: a near-black `#111` / light `#F2F2F2` / grey `#D9D9D9` page that
   alternates by section with **straight edges** (no arcs, no tears), an orange `#ED6D40` and a teal accent,
   hairline 1px rules and **square 3px-radius chips**, a **dot-field** overlay, **bracket-cornered** Book Now
   buttons and **dotted 3D art** (an ellipse, a torus) where other templates draw a seal or a raster map.
3. **The header disagrees with the standing header rule.** The frame draws a wordmark, an inline nav row and a
   seal; CLAUDE.md's *header bar* ticket (2026-11-11, user calls) says layouts 1–4 of every template are a
   hamburger and Book Now only. **Call 1 below is the user's**, and session 0 opens on it.
4. **The builder has grown since Pop's pass.** A new template now also owes the character caps, the inline-edit
   ledger, the photo-edit ledger and the per-template `in` rows. Those are *proofs*, scheduled as session 12,
   not folded into each section.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then
- [`../CONVENTIONS.md`](../CONVENTIONS.md), groups **A, B, C and D1**, and the bullets they point at
- the section's *Settled in section N* bullets in [`../lime/layout-1.md`](../lime/layout-1.md),
  [`../grunge/layout-1.md`](../grunge/layout-1.md), [`../editorial/layout-1.md`](../editorial/layout-1.md) **and**
  [`../pop/layout-1.md`](../pop/layout-1.md) (the block you are widening, and the three widenings already done),
  plus `notes/<section>.md` for the section's current live behaviour
- `notes/templates.md`, and `plans/header-nav.md` and `plans/header-fit.md` for the header session
- the *Per-session procedure* of [`../lime/layout-1.md`](../lime/layout-1.md), which is this plan's, below

Then the memory notes `figma-frame-reading`, `verifying-the-published-tab`, `browser-tool-choice` and
`load-figma-fonts`. `SPEC.md` lives in git history: `git show 8fa8ff4:SPEC.md`.

Branch: **`lattice-layout-1`**, forked from `main`.

## What the pass must deliver

1. **Every section works in the published tab under Lattice** — every control CLAUDE.md lists under
   *`s.live` is false everywhere except the published tab*.
2. **Every section looks as close to its Figma frame as possible**, at 1440 (× 0.82 onto the 1180 canvas), 768
   and 390.
3. **Lattice's template card** on the picker — big preview and filmstrip thumbnail — is a live `HeaderV0`.
4. **The setup modal shows four Lattice cards.** Card 1 is the fitted Hero. Cards 2–4 only need to render, publish
   and read legibly in Lattice's tokens (Lime's rule): they dress Retro's `HeaderV1`…`V3` and the other
   sections' layouts 2–4 until later passes fit them.
5. **The other five templates do not move.** `theme=0…4` digest to zero rows across every category and width.

## The Figma source

File `ORILFywSzuadscu6RzskCW` (*JustPay — Batch 2*), one page. The Figma tools need `create_session` first.

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Lattice — Claude Design — Desktop | `1:306` (`Body` `1:307`) | 1440 × 9260 |
| Tablet | … — Tablet | `1:8953` (`Body` `1:8954`) | 768 × 11417 |
| Mobile | … — Mobile | `1:9934` (`Body` `1:9935`) | 390 × 12798 |

- Desktop: <https://www.figma.com/design/ORILFywSzuadscu6RzskCW/JustPay---Batch-2?node-id=1-306&m=dev>
- Tablet: <https://www.figma.com/design/ORILFywSzuadscu6RzskCW/JustPay---Batch-2?node-id=1-8953&m=dev>
- Mobile: <https://www.figma.com/design/ORILFywSzuadscu6RzskCW/JustPay---Batch-2?node-id=1-9934&m=dev>

**`get_metadata` on a whole master overflows (≈ 115 K characters).** Read it per section node, or save the output
and slice it with `jq` / `python` (top-level `Section`s only: indent ≤ 4).

## The sections

Session 0 first, then eleven sections in the page's order. Sizes are the frames' own. **The hero is 750 tall at all
three widths**, where every earlier template's was 750 / 1024 / 844: `WIDE.heroH`, `SPOT_ASPECT` and the picker
frame's aspect assume the old numbers, so section 1 re-measures them (open question 3).

| # | Cat | Desktop node | Size | Tablet node | Size | Mobile node | Size | Composition (from the pictures) · predicted twin | Status |
|---|---|---|---|---|---|---|---|---|---|
| 0 | *foundation* | `1:306` | — | `1:8953` | — | `1:9934` | — | `THEMES[5]`, ramp, faces, photos, `s.lattice`, dot field | open |
| 1 | `header` | `1:308` | 1440 × 750 | `1:8955` | 768 × 750 | `1:9936` | 390 × 750 | Full-bleed photo, dot field, wordmark + inline nav + Book Now, a dotted-ellipse disc top-right, avatar card, kicker line, 120-ish-px title, six square chips · **Retro `HeaderV0`** (Lime's block as the twin of the card and chips) | open |
| 2 | `bio` | `1:386` | 1440 × 769 | `1:9019` | 768 × 939 | `1:9991` | 390 × 1050 | Grey `#D9D9D9`; three columns: `KM / BIO`, a stacked statement, a tall portrait, a vertical town, ABOUT copy; `[ 001 ] STRUCTURE · BIO_01` · **Lime's *Flanked portrait*** (`KM / BIO` and the reference line are removed copy, call 1) | open |
| 3 | `media` | `1:419` | 1440 × 1057 | `1:9052` | 768 × 1404 | `1:10024` | 390 × 1422 | Dark; five-row numbered track list with art and play squares + a *Now playing* card with transport and a bar-code progress · **probably Retro's `v0` body re-laid** (Pop's plan describes it as five track rows with cover and play disc, a now-playing card with transport and progress, and a Soundcloud pill — this frame's inventory, untilted); **check against `Media`'s `v0` body before deciding** (open question 1) | open |
| 4 | `gallery` | `1:588` | 1440 × 923 | `1:9221` | 768 × 1438 | `1:10193` | 390 × 1020 | Light; heading + four source rows (Gallery open, YouTube, Instagram, TikTok) left; viewer with caption pill, arrows, seven thumbnails, progress and `02 — 15` right · **Lime's gallery** | open |
| 5 | `repertoire` | `1:673` | 1440 × 1067 | `1:9306` | 768 × 1067 | `1:10278` | 390 × 1555 | Dark with a warm glow; `240 SONGS`, search box, four chips, two-column dense list, pager · **Lime's *Two-column dense*** | open |
| 6 | `map` | `1:796` | 1440 × 983 | `1:9429` | 768 × 1351 | `1:10401` | 390 × 1454 | Grey; `MANCHESTER`, a dotted-ellipse card with a *Based in* foot, an upcoming-gigs panel with status pills and a pager · **Lime's *Compact tile*** (the raster map is the dotted art) | open |
| 7 | `pricing` | `1:915` | 1440 × 1032 | `1:9547` | 768 × 1572 | `1:10518` | 390 × 2107 | Dark; heading, a boxed Solo / Trio / Band chip row, three coloured cards (dark, orange, teal) with Book Now bars, small print · **Lime's pricing** | open |
| 8 | `calendar` | `1:1039` | 1440 × 781 | `1:9670` | 768 × 564 | `1:10640` | 390 × 894 | Light; one bordered card: month grid left, `[ 007 ] AVAILABILITY` and a torus art right, an enquiry foot with Continue · **Lime's *Scheduler*** | open |
| 9 | `form` | `1:1147` | 1440 × 689 | `1:9778` | 768 × 990 | `1:10748` | 390 × 1230 | Dark; one bordered card: context panel (avatar, title, three promises) + the form (name, email, date, guests, event-type chips, message, Book Now) · **Lime's *Split context + form*** | open |
| 10 | `testimonials` | `1:1222` | 1440 × 730 | `1:9851` | 768 × 730 | `1:10821` | 390 × 730 | Orange `#ED6D40` with a dot field; one bordered quote card, two arrow squares, a byline and two tag chips · **Lime's *Stacked tag card*** | open |
| 11 | `footer` | `1:1251` | 1440 × 480 | `1:9880` | 768 × 612 | `1:10850` | 390 × 586 | Dark; wordmark, the dotted disc, a closing headline, two link columns, Book Now, a rule, copyright and *A JustPay Product* · **Lime's footer** | open |
| — | `video` | *none* | — | — | — | — | — | not on this page: it takes session 0's tokens and nothing else (the frames draw it at layouts 2 and 4 only) | — |

The **ground sequence** read from the pictures: photo · `#D9D9D9` · `#111` · `#F2F2F2` · `#111` · `#D9D9D9` · `#111` ·
`#F2F2F2` · `#111` · `#ED6D40` · `#111`. **Every seam is a straight edge**; `above` / `below` (`vm.mediaAbove`
and the rest) read nothing for Lattice. Re-measure every ground and every height from the frame; the numbers
above are a read of a downscaled screenshot.

**Re-measure from the Lattice frame; never reuse a twin's block sizes.** The twin is a prediction. A section whose
composition turns out to differ is the exception: **stop, and record it under *Conventions* before writing code**
(open question 1 says how it is built).

## The decisions this plan hands over

Each is settled by the user at the head of the session that needs it, with the plan's recommendation as the
default, and written back here as *settled: …* — Pop's and Editorial's plans did the same.

### 1. Do the standing copy removals hold for Lattice, or does the frame win?  *(session 0 opens on this, one question)*

The frames draw several things that CLAUDE.md records as **removed on purpose** (user calls, 2026-11-11 to 11-13) and
one thing no template has. **Recommended answer: the standing rules hold everywhere and Lattice only dresses what
the builder already prints** — and the question is asked once, with this list, so every section's session reads
the answer instead of rediscovering the conflict. The list, per section (read at planning from the 1440 pictures;
the narrow header was read too):

| Section | The frame draws | Standing rule it meets |
|---|---|---|
| header | a nine-dot mark + `KAI MERCER` + a rule on the left, **eight inline links** at 1440 (none at 768 / 390), a bracket `BOOK NOW →`, a hamburger at 768 and 390 (**no Book Now at 390**) | layouts 1–4: **hamburger left, Book Now right, nothing else** — no wordmark, no inline links, no centred name (`plans/header-nav.md`) |
| header | `■ MANCHESTER, UK` + `DJ · LIVE ACT` kicker line over the title | layout 1 prints **no act type and no location** (`FIELDS.header` `kicker` / `location` read Retro's 3, 5, 6 only) |
| header | the disc top-right | the badge is kept, with three states (`badgeMode`) — **no conflict** |
| bio | `KM / BIO` top-left and `[ 001 ] ——— STRUCTURE · BIO_01` foot-left | both **removed 2026-11-11** (the bio's initials / `Bio` eyebrow and its `refLabel` line, `notes/bio.md`) |
| media | `[ 002 ] ——— TOP TRACKS` eyebrow and `5 / 5 FEATURED` | the `kicker` and the counter labels were **removed 2026-11-12** (`notes/media.md`) |
| map | `[ 005 ] ——— SHOWS / COVERAGE` eyebrow and `12 MILE RADIUS` | the *Shows/coverage* eyebrow was **removed 2026-11-12** (`notes/map.md`); the radius line needs a ruling |
| testimonials | `[ 009 ] ——— REVIEWED 6 DAYS AGO` | the `kicker` field is **gone** (`notes/testimonials.md`); this line needs a ruling |
| every section | a `[ 00N ] ——— LABEL` eyebrow (gallery, repertoire, pricing, calendar, form's context panel as well) | a section's eyebrow exists only where `FIELDS` has a seeded, uncased, drop-when-emptied field for it (JP-071) — **check each, and a new field is a decision, not a default** |

- **A (recommended): every standing removal holds; every `[ 00N ]` eyebrow is drawn only where a field already
  exists for it.** Lattice is then a re-skin of what the builder prints, which is also what every earlier template
  did. The frame's wordmark, inline links, kicker line, bio initials and reference line, and the removed eyebrows
  are the places Lattice does not follow its Figma.
- **B: the frame wins, by item.** The user names the items (e.g. *keep the wordmark, keep the `[ 00N ]` eyebrows as
  literals*); each one reopens a recorded user call and, for the header, the `HeaderRoot` / `MenuPanel` machinery
  gains a Lattice arm (`vm.navFits` was deleted, so the overflow rule the inline row needs would come back).

**Session 0 screenshots the two narrow headers (`1:8955`, `1:9936`) first and puts the question with that
evidence**: at 768 the bar is wordmark + Book Now + hamburger, at 390 wordmark + hamburger, and the disc, the
avatar card, the kicker line, the title (two lines) and the chip row are common to both. The wordmark is in all
three, so even answer A drops a thing the frames always draw.

### 2. Faces — both are free Google Fonts, so no stand-in call

`font/display` and `font/body` are **Archivo**, `font/label` and `font/ui` **Azeret Mono** (the frame's variables).
The hero and the section titles are Archivo **at its expanded width** (read `font-stretch` / `wdth` off
`get_design_context`; the pictures are wider than stock Archivo). `index.html` today asks for
`Archivo:wght@400;500;600;700;800`; adding the `wdth` axis means **one combined entry**, never a second
(Gloock's rule), and the other templates that name Archivo must digest to zero rows after it. Azeret Mono is new.
Both go in `index.html` **and** `preview.html` (the `load-figma-fonts` note).

### 3. Casing

The mono labels and the display copy print in capitals in every frame; song titles (`Valerie`), gig titles
(`Hidden Warehouse`) and the form's placeholders print mixed. Settle which are the face's `textTransform` and
which are typed, site by site (Grunge's per-site-uppercase rule), and record it. Default: `casing: 'title'`
(passthrough) with per-site `uppercase`, the way Grunge and Pop did.

### 4. The sixth flag — `s.lattice`, widened per site

`designed`, `limeTree`, `pop` and the photography gates are name lists in `sectionVm` (`EncoreBuilder.jsx`
around lines 459–488 and every `T.name === 'Pop'` read). Add `lattice: T.name === 'Lattice'`, widen `designed`
and `limeTree` to it, and take the inventory of every name gate outside `EncoreSection` (`headerFamily`,
`photos.js`'s `SEEDS`, `grainSrc` / `mapSrc`, the picker's filmstrip, `SCHEMES_OF`; `TEMPLATE_STILLS` — grep first, the `headerFamily` comment says the flat family and its stills are gone). **Widen,
do not fork**: a Lattice delta lives inside the Lime-tree block as `s.lattice` (the way `s.pop` does) unless the
section is a new composition.

### 5. Photography

The artist photographs are a **new shoot** (a teal / orange portrait with a projected kanji). Seed them as
`SEEDS.Lattice` in `photos.js` (the only module that imports `src/builder/photos/`), **JPEG-compressed**: the
built `index.html` is ≈ 9.8 MB and the photography of the other five is most of it. Budget the Lattice set
(hero, portrait card, bio, form avatar, gallery, six thumbnails, five track covers, calendar art) before adding
it, and say what the build grew by. The dotted ellipse and torus are **art, not photography**: transcribe them as
SVG if the frames hold them as vectors, else `download_assets` and keep them small (`transcribing the frame's
vectors` is a Pop convention; `figma-frame-reading` covers `download_assets` at scale).

## Session 0 — the foundation

This session touches no section's layout code. Its job is to make every later session decoration and
measurement. It opens on call 1 (and 2–3 if the user wants them settled now).

1. **Read every token.** `get_variable_defs` on the page gave a flat set: `sem/bg #F2F2F2`, `sem/text/1 #F2F2F2`,
   `sem/text/3 #ED6D40`, `sem/box/1 #1B1B1B`, `sem/stroke/2 #262626`, sizes `display-md 60`, `display-sm 40`,
   `title 30`, `list 24`, `label-lg 22`, `body-lg 18`, `body-md 16`, `body-sm 15`, `eyebrow 12`, `label-xs 11`,
   radii `card 20`, `chip 3`, `border/hairline 1`. **That is only what the page node binds**; the hero's
   display-xl, the tablet and mobile ramps and every per-section ground are read per node with `get_variable_defs`
   and one `use_figma` read of fills / strokes / effects (load `figma-use` first). Write the mapping, the
   ramp at three widths and the palette (including the teal) under *Conventions*.
2. **`THEMES[5]`** in `data.js`, appended — `st.theme` is an integer index, so **never reorder**. Name `Lattice`,
   `sub`, `display` / `label` / `ui` / `mono` / `body`, `casing`, `dls`, radii (`radius 20`, chip 3), `bw` 1, the
   `sem` object for the keys the three-colour palette cannot derive, and `schemes` if the alternating grounds
   want them (Editorial's mechanism, `SCHEMES_OF.Lattice` seating a section by its design — **read
   `THEMES[3]` / `[4]` and CLAUDE.md's scheme paragraph first**). Decide the `tags` array (the six chip seats:
   white-outline, orange, teal, dark, orange, outline — read off the header chips).
3. **The type ramp**: a Lattice `RAMP` in `EncoreBuilder.jsx`, desktop at × 0.82, 768 and 390 verbatim, layered
   over the others; check `preview.jsx`'s copy of `Z`. Every other template's ramp must stay byte-identical.
4. **Fonts** (call 2) in `index.html` and `preview.html`, **and check `public/published.html` and the popup's
   cloned head** for a font link of their own (`preview.html` carries one; the published tab is built by DOM
   mutation of a clone, so find out which sheet it inherits).
5. **The flag and the name inventory** (call 4): `lattice`, `designed`, `limeTree`, `headerFamily` → a `lattice`
   family of **four** (`HEADER_COUNT`, `HEADER_NAMES` sliced from `PHOTOGRAPHIC_NAMES`), `setupHeaderCount`
   follows, `designCount` / `pageLayout` / `pageOrder` need no change (layouts 1–4 aligned across categories).
   `IDENTITY_CHARS`, `FIELDS[].in` objects keyed by template (a template an `in` object does not name *reads* the
   field, per CLAUDE.md — good — but **verify in `specAt`** (`data.js` ~3590) what a `chars` object with no `'*'`
   yields for Lattice; if it is no cap: list every such object with
   `grep -n "Pop:" source/src/builder/data.js` and give Lattice a row, seeded from Pop's until session 12
   measures it), `FOCUS`, `INLINE_OFF` keys (`Lattice.0.…`, none yet), `PHOTO_OFF`.
6. **Seed the photography** (call 5) and the two art assets.
7. **The tooling accepts a sixth theme** — check, do not assume. Read the header and the theme handling of every script
   Session 12 and every section session lean on: `digest.mjs` (themes are **indices**, default `0,2,3,4`, so pass
   `0,1,2,3,4,5`), `limits.mjs` (`--themes=0,1,2,3,4` default), `reach.mjs` (`0,1,2`, indices), `inline-probe.mjs`,
   `photo-probe.mjs` and `focus-probe.mjs` (**names**, and their header lists `Retro | Lime | Grunge | Editorial | Pop`
   — find whether a name outside that list is refused), `build-digest.mjs`, `shots.mjs`, and `src/preview.jsx`
   (its own copy of `Z`). Fix what hard-codes five, in one commit named for the scripts, and prove each runs once at
   `theme=5`. The plan's `--theme Lattice` lines are assumptions until this passes.
8. **The template card**: `TemplatePreview` and the filmstrip, so the picker offers six templates, the big card and
   thumbnail show a live `HeaderV0` (not a still) once section 1 lands, and the picker's text and layout stay
   right with six entries (check the grid, not only the card).
9. **`vm.pageBg` / the page gutter / the published `documentElement`** read the theme's Scheme 1 ground. Read which
   ground that is for Lattice (the page binds `sem/bg #F2F2F2` while most sections stand on `#111`) and where the
   dark↔light alternation lives — in the theme, in `schemes` seats, or in the sections.

**Verification for session 0:**
- **Exit criterion: Retro, Lime, Grunge, Editorial and Pop do not move.** A digest of all categories × 3 widths at
  `theme=0…4` before and after: zero rows (skip `.seal-spin`). `scripts/digest.mjs`, the two-server recipe in the
  `digest-two-servers` note, and `browser-tool-choice` for the rest.
- Lattice changes on purpose: screenshot the eleven sections at `theme=5` before and after (desktop only) and keep
  them in the scratchpad as the pass's "before" pictures.
- The builder opens with six templates; picking Lattice reaches the editor and does not throw; every section
  renders (legibly ugly is fine) at all three widths.

## The header, and the four cards

Section 1 follows call 1. Whichever way it goes:

- **`HeaderV0` dressed behind `s.lattice`** (or its Lime block widened). The frame draws a full-bleed photo with a
  dot field and a dark vignette, a rounded avatar card with a white hairline, (per call 1) a `■ MANCHESTER, UK  DJ · LIVE ACT`
  kicker line, the title at the display-xl ramp (the title **shrinks to fit** — `plans/header-fit.md`; hold the
  Figma's size for the seeded name and let the fit rule act on longer ones), and a six-chip row of
  **square 3px chips** (outline / orange / teal / dark / orange / outline) — `vm.tagChips` on the `vm.chips`
  palette. Copy the header-nav ticket's list of what the header no longer prints before adding anything
  (kicker and location read only Retro's layouts 3, 5, 6; `FIELDS.header` `in` rows are the authority).
- **The disc** top-right and in the footer is the template's badge: `SealBadge` gets a Lattice arm (a dotted ellipse
  that does not spin by `seal-spin` unless `badgeSpin`), obeying the three `badgeMode` states.
- **Cards 2–4** render `HeaderV1`…`V3` in Lattice tokens and publish; fit only what is broken, and note the rest
  for the later layout passes.
- **The page fold**: `pickHeader` writes `pageLayout(cat, i, 'Lattice')` to every section and reorders by
  `pageOrder(i)`, and adds / drops the video; nothing to change, but say so in the modal verification.
- **Hero aspect**: 750 at every width (open question 3).

**Verify in the builder, not only the harness**, with chrome-devtools MCP: the template stage shows six templates;
Lattice's card and filmstrip thumbnail are the live hero; the setup modal shows four named Lattice cards; card 1
opens the editor on the Lattice page; Publish, then in the popup the nav scrolls to each section, the hamburger
opens at 768 and 390, and Book Now reaches the form (`verifying-the-published-tab`).

## Lattice's decorative language

Everything is behind `s.lattice`. Measure each from its frame; this is the planning read.

- **Dot field**: a sparse scatter of 1–2 px light dots over the hero, the repertoire's glow, the bio and the
  testimonials' orange. Decide **once**, in session 0 or the header session: an SVG pattern tile, a CSS radial
  gradient tile or a transcribed raster, and one component (`DotField`) every section calls. Watch the file's
  rule: `EncoreSection` has **no effect and no library but `lucide-react`**; a tile is a background, not code.
- **Dotted art**: the ellipse (header, bio badge, footer, map card) and the torus (calendar). Static art, not a
  canvas.
- **Bracket corners** on Book Now / Soundcloud (four L-shaped corner marks round a borderless label): one helper
  beside `BookPill`'s `s.lattice` arm.
- **Square chips** (radius 3) and **hairline boxes** (1 px, radius 20 on cards and panels), mono 11–12 px
  tracking-wide labels; `[ 00N ] ——— LABEL` eyebrows: **drawn only where call 1 says and a `FIELDS` field exists** (JP-071's rule: *a
  frame label the tester can retype is a seeded, uncased, drop-when-emptied field*).
- **Glow**: the repertoire's warm brown corner glow, the pricing cards' soft coloured halo, the testimonials'
  card halo; `boxShadow` / radial gradients read off each node's `effects` (one `use_figma` read, not the render).
- **No grain, no arcs, no tears**; straight seams.

## Per-session procedure

Lime's, verbatim — [`../lime/layout-1.md`](../lime/layout-1.md) *Per-session procedure*, with `s.lime` read as
`s.lattice`, `theme=1` as `theme=5`, and these changes:

1. Read the files above. **Session 0** follows *Session 0*.
2. `create_session` once for the Figma file; `get_metadata` on **the section's three nodes** (never the whole
   master); `get_screenshot` on each (`maxDimension` 1400–2000, `curl` it in the next call — the URL is
   short-lived); load the `figma-design-to-code` skill, run `get_design_context` and `get_variable_defs` on all three
   nodes. **There is no Retro twin node to diff by name.** Instead lay the prediction in the table above against the
   code's existing layout-1 branch: read it, list what the frame draws that it does not, and write the verdict
   (*dress the shared branch* · *widen the Lime block* · *new own-tree block*) under *Conventions → Seen at planning
   time* before writing code.
3. Implement inside the section's existing branch gated on `s.lattice`; desktop numbers are the frame's × 0.82, the
   768 and 390 frames verbatim; prefer session-0 tokens over literals.
4. **Verify** with the preview harness (`npm run dev` in `source/`, then
   `http://localhost:5173/preview.html?cat=bio&arch=0&theme=5&w=desktop` — `tablet`, `mobile`) and chrome-devtools:
   - **Look**: render vs frame; read geometry with `getBoundingClientRect()`, numbers not screenshots.
   - **Function**: `&live=1`, drive every control in its active, idle and refused states on Lattice's colours.
   - **The other five do not move**: a zero-row digest at `theme=0…4` at three widths, taken before and after in
     the same tab. The brace-depth walk (every added line inside an `s.lattice` conditional) is the quick first
     check; the digest is the proof, because these edits sit inside branches the others render.
5. Commit with the section named in the subject; set the row's Status to `done <sha>`; add what the next unit
   needs to *Conventions*; commit that.
6. **Stop and hand off**: say the unit is closed, that this is the moment to `/clear`, and print the next unit's
   opening prompt as a filled-in fenced block (the *Hand off, don't roll on* note).

Do **not** refresh the root `index.html` per section.

## Session 12 — the proofs

Pop and Lime ended at the sweep; a template added now owes the three ledgers the later passes built. One session,
each its own commit:

1. **Character caps**: give every `FIELDS` entry / repeater column a Lattice row measured with
   `node scripts/limits.mjs <cat> --themes=5` (see `plans/char-limits.md`), then `--check` and `--seeds`. A seed
   must fit its cap. Per-section judgement calls go in that section's `notes/` file.
2. **Reach**: `scripts/reach.mjs` for `FIELDS[].in` and `IDENTITY_READS` at Lattice.
3. **Inline editing**: `scripts/inline-probe.mjs --theme Lattice --layout 1 --width 1440,768 --check` until
   `inline-probe: PASS`; every slot the page does not draw is an `INLINE_OFF` row with its reason.
4. **Photo editing**: `scripts/photo-probe.mjs --theme Lattice --layout 1 --width 1440,768 --check` (and `--blank`,
   `--drop`); `PHOTO_OFF` for the rest. `focus-probe.mjs --prime --check` for the panel-to-canvas box.

## The end-of-pass sweep

After section 11 and session 12, in one session (the lists in `../lime/layout-1.md` and
`../pop/layout-1.md` *The end-of-pass sweep* are the model; read both):

1. **CLAUDE.md and README.md** where the wording says *five templates* / *the other four*: the template list, the
   file line counts (`wc -l`), the `limeTree` / `designed` / `lattice` flag paragraph, the scheme paragraph if
   Lattice carries `schemes`, the font note (Archivo's `wdth`, Azeret Mono), the photography note (`SEEDS`), and a
   `notes/templates.md` Lattice section holding its decorative language.
2. **Code comments that make a claim about the template list** (`grep -rn "all five\|other four\|five templates"
   source/src/builder`).
3. **`plans/CONVENTIONS.md`**: fold the *Inherited and used* list in.
4. **One whole-page published check under Lattice**: pick the template, choose Hero, Publish → Open, then every
   nav link, the hamburger at 390 and 768, Book Now, the media player (one trusted click), the gallery, repertoire,
   map, pricing, calendar, form and testimonials controls, the footer's links and pill. The harness has never
   rendered two sections together; eyeball every straight seam against its real neighbour.
5. **The four header cards** still render and publish; note anything newly broken for layouts 2–4.
6. **`plans/README.md`**: mark the pass closed (merging is the user's call).
7. **Refresh the root `index.html` and `published.html`** (CLAUDE.md, *Commands*): `npm run build:standalone`, the two
   `cp`s, and the two-build digest from Retro's notes — **zero rows at themes 0–4, non-zero at theme 5**. Say what the
   file grew by.

## Conventions

*(Empty at planning. Each session writes its own `### Settled in section N` here and a running
`### Inherited and used` list, as Pop's plan does. Open with `### Seen at planning time, per section` for the
twin verdicts.)*

## Open questions

1. **Are all eleven the existing layout-1 compositions?** The pictures say yes for every one; the media is the
   least certain (a track list beside a now-playing card, where Retro's body is a fan of tilted cards beside a
   now-playing card — the same inventory, re-laid). Session 3 diffs it against `Media`'s `v0` body first. If any
   section (media, map, calendar) is a new composition, build them as an **own-tree early-return block**
   (`if (s.v0 && s.lattice)`, Lime's media precedent, `s.limeTree`'s comment) so no other template moves, and
   record that the page's layout-1 composition for Lattice is its own.
2. **Layouts 2–4 of Lattice** are placeholders. Is there a Batch 2 frame for them, and are they the same template?
   (This plan does not need the answer; the setup modal's cards 2–4 do render.)
3. **Hero height 750 at every width.** `WIDE.heroH` (614 at desktop × 0.82, then 1024 and 844), `SPOT_ASPECT`, the
   picker frame and the setup cards all assume the old tablet and mobile heights. Decide in section 1: a Lattice
   override of those numbers, or the frame wins and the card aspect follows.
4. **Does the frame bind a second palette for the teal** (`#5B8E9B`-ish, the pricing card, the chips, the map
   labels, the `■` markers)? Read it; if no variable holds it, it is a named literal and `sem` carries it.
5. **The footer's and testimonials' dot field** differ in density from the hero's. One tile at one opacity per
   ground, or one per section? Measure before choosing.
6. **`video`** has no Lattice frame. It renders in Lattice's tokens when a user adds it, as on every template with
   cards 1 and 3.
