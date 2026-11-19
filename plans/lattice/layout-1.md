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
| 0 | *foundation* | `1:306` | — | `1:8953` | — | `1:9934` | — | `THEMES[5]`, ramp, faces, photos, `s.lattice`, dot field | done `812453b` |
| 1 | `header` | `1:308` | 1440 × 750 | `1:8955` | 768 × 750 | `1:9936` | 390 × 750 | Full-bleed photo, dot field, wordmark + inline nav + Book Now, a dotted-ellipse disc top-right, avatar card, kicker line, 120-ish-px title, six square chips · **Retro `HeaderV0`** (Lime's block as the twin of the card and chips) | done `33e2f3c` |
| 2 | `bio` | `1:386` | 1440 × 769 | `1:9019` | 768 × 939 | `1:9991` | 390 × 1050 | Grey `#D9D9D9`; three columns: `KM / BIO`, a stacked statement, a tall portrait, a vertical town, ABOUT copy; `[ 001 ] STRUCTURE · BIO_01` · **new own block `LatticeBio`** (not Lime's *Flanked portrait*: a plain portrait with a rail, a 12-column grid; `KM / BIO` and the reference line are removed copy, call 1) | done `7bee3bd` |
| 3 | `media` | `1:419` | 1440 × 1057 | `1:9052` | 768 × 1404 | `1:10024` | 390 × 1422 | Dark; five-row numbered track list with art and play squares + a *Now playing* card with transport and a bar-code progress · **probably Retro's `v0` body re-laid** (Pop's plan describes it as five track rows with cover and play disc, a now-playing card with transport and progress, and a Soundcloud pill — this frame's inventory, untilted); **check against `Media`'s `v0` body before deciding** (open question 1) | done `e85f73c`, fixed `a413506` |
| 4 | `gallery` | `1:588` | 1440 × 923 | `1:9221` | 768 × 1438 | `1:10193` | 390 × 1020 | Light; heading + four source rows (Gallery open, YouTube, Instagram, TikTok) left; viewer with caption pill, arrows, seven thumbnails, progress and `02 — 15` right · **new own block `LatticeGallery`** (Lime's inventory, no Lime leaf) | done `2b7c022` |
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

**settled (user call, 2026-11-19, session 0, option A): every standing removal holds for Lattice.** The frame's
wordmark + rule, inline links, `■ MANCHESTER, UK · DJ · LIVE ACT` kicker line, bio `KM / BIO` and reference line,
and the removed eyebrows are **not drawn**; a `[ 00N ] ——— LABEL` eyebrow is drawn only where a seeded, uncased,
drop-when-emptied `FIELDS` field already exists for it. Evidence read first: at 768 the bar is wordmark + rule,
a bracket `BOOK NOW →` and a hamburger; at 390 wordmark + rule and a hamburger (no Book Now); the dotted disc top-right, a
rounded avatar card with a white hairline, the kicker line, a two-line title and six square chips are common to both.
Lattice's header is therefore the hamburger-and-Book-Now bar at every width, like every other template.

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

**settled (user call, 2026-11-19, session 0): the display face is Archivo at `wdth` 113, `wght` 500.** The frames' display
family is not Archivo but **"Lattice Display Medium"** (custom, not on Google Fonts; `Azeret Mono` and `Archivo` Regular are
real). Measured in the headless shell against the frame's `absoluteRenderBounds` on 8 strings (KAI MERCER 898.8 @128,
MANCHESTER 768.8 @95.04, 240 SONGS 605.3, THE HOUSE PARTY 323.9 @30, …): Archivo 500 renders at 0.993 of the frame at wdth
112.5 and 1.018 at 115, sd 0.007 across strings, so `faceK` = 1. One combined `Archivo:wdth,wght@…` entry, never two.

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

### Seen at planning time, per section

*(Twin verdicts are each section session's first step; none was taken in session 0.)*

- **bio (section 2, 2026-11-19): *new own-tree block*, not Lime's Flanked portrait.** The frame (`1:386` · `1:9019` · `1:9991`) is a plain
  20-radius portrait with a **rail** beside it (a teal 8 px square, the town set vertical, a 1px hairline, spaced apart) where Lime's
  middle is an arch-topped photograph with an inner glow and a seal; the nearest thing in the code is Retro's `v0` location rail, which
  hangs off a tilted polaroid. There is no arch, glow, seal or tilt, and the dotted disc is a white mark in `mix-blend-mode: difference`.
  Three columns at 1440 sit on a **12-column grid** (89.83 columns, 24 gaps: the flank on 1-4, the portrait and rail on 5-8, About on
  10-12), where Lime's are `1fr 580 1fr`. Built as `LatticeBio` ahead of Lime's block (open question 1's route; section 2, `7bee3bd`). The record was written
  after the block, not before it, because open question 1 had already settled the route for a composition that differs.

- **media (section 3, 2026-11-19): *new own-tree block* `LatticeMedia`, not Retro's `v0` body and not Lime's block.** Diffed against both
  (frames `1:419` · `1:9052` · `1:10024`). The inventory is the shared one (five numbered rows with cover and play control, a
  now-playing card with sleeve, name, transport and a progress line with two clocks, a Soundcloud pill), and every leaf differs.
  **Retro's body** leans its rows ±1° with thrown blocks, grain, a checkerboard strip and a `TornEdge`, and puts the sleeve in a
  rounded disc on a wine-shadowed panel. **Lime's block** (which Grunge and Editorial widen) has flush rows on hairlines like this
  frame, but its play control is a ring-circle left of a 60 rounded cover (here the cover sits left of a *square* 44 button, both
  3px-radius), its card is the sleeve laid as a *background* faded to black under an inset glow in an 80-radius pill, its progress is a
  line, and its pill is Book Now. The Lattice card is a 20-radius `#1B1B1B` box with a 1px ring, a teal halo and a *square-cornered* sleeve
  object under mono labels, three square transport buttons, and a 48-bar bar-code meter (heights `4 + i % 9`, gap 3). The grid is
  886.72 : 431.375 at 24 (desktop) where Lime's is 710 : 558 at 60; the Soundcloud pill is `BracketButton`'s shape. So it is a block of
  its own. **It sits after `Media`'s hooks and seam, not above them** (an early return above `useRef` / `useState` would change the
  hook count on a theme switch; the bio's route worked only because `Bio` has none): `Media` resolves `at`, `track`, `now`, `sleeve`,
  `goTo`, `toggle`, `onPick` and `audio`, then hands them to `LatticeMedia`, so the published player is the one seam in a new picture.

- **gallery (section 4, 2026-11-19): *new own-tree block* `LatticeGallery`, not Lime's block (and so not Pop's widening of it).** Diffed against
  Lime's `if (s.limeTree)` block (and Pop's, which widens it) and `notes/gallery.md`, frames `1:588` · `1:9221` · `1:10193`. The *inventory*
  is Lime's (heading, four source rows, a back link and a credit, a viewer, a seven-tile strip, a counter), and **no leaf is**. Lime's rows are
  capsules with a disc and a hard offset shadow, at 768 four disc-only tiles and at 390 a scrolling single line; here they are four full-width
  1px-ruled 3px-radius boxes with a *square* icon seat, a mono label and a `+` / `×`, **stacked at every width** (116.7 tall at 1440, 64 at 768 and
  390), the open one filled ink. Lime's viewer is a bare 80-radius photograph with two round discs riding its middle; here it is a 20-radius
  figure (aspect 659.047 : 540.75 at every width) with a **caption pill** bottom-left and **two square arrow buttons bottom-right**, both inside
  it. Lime's strip is four tiles at 390 with an inset glow marking the viewer's tile; here all **seven** 3px-radius ruled tiles stand at every
  width (40.3 at 390, so no sliding window and no `srcScroll`), with no marked tile. And the frame ends the column with a **1px progress
  line, a 3px played segment and a `02 — 15` counter** that Lime does not draw. The halves are 1fr : 1fr at 24 (Lime's 608 : 585 at 135). So it is
  a block of its own, standing in `Gallery` **after the seam** (`pick`, `src`, `go`, `srcRows`, `srcAct`, `video`, `player` stay `Gallery`'s):
  an early return above those hooks would change the hook count on a theme switch. The twin prediction (*Lime's gallery*) was half right: the
  seam is Lime's, the picture is not.

- **repertoire (section 5, 2026-11-19): *new own-tree block* `LatticeRepertoire`, not Lime's *Two-column dense* block (nor Pop's / Grunge's / Editorial's
  widenings of it).** Diffed against the `if (s.limeTree)` block in `Repertoire` and `notes/repertoire.md`, frames `1:673` · `1:9306` · `1:10278`. The
  *inventory* is Lime's (a heading beside a search field, a chip row, two columns of numbered songs, a pager), and **no leaf is**: Lime's rows are flush on a
  bottom hairline, here each song is a full 1px-ruled 3px-radius box, 66 tall, 16 apart (28 at 390); Lime's search is an 80-radius pill round a glyph tile,
  here a bare 52-tall 3px box with a mono hint; Lime's chips are filled pills, here square outlined 44-tall boxes with the active one filled ink; Lime's pager is
  55 x 54 round arrows and 87-wide pills (`Pager`'s Lime branch), here 44 / 46 square 3px boxes with Arial arrows and zero-padded numerals; the artist is
  an orange mono label right-aligned in the row, not the `· Artist` suffix. And the **paging differs**: the frames draw twelve songs a page at all three widths
  (two columns of six at 768, one column of twelve at 390), where `perPage` is 6 on both narrow frames for every other template. The glow is a
  percentage radial gradient (60% x 55% at 15% / 20%, `#ED6D40` at 14% to 0 at 70%) at all three widths, the root's own. So it is a block of its own, standing in
  `Repertoire` **after the seam** (`active`, `filtered`, `pg`, `shown`, `columns`, `labels`, `at` stay `Repertoire`'s and go over in `g`). The twin prediction
  (*Lime's Two-column dense*) was half right again, as the gallery's was: the seam is Lime's, the picture is not.

### Settled in session 0 — the foundation (2026-11-19)

**Calls (user, via AskUserQuestion):** call 1, every standing removal holds (see *The decisions*, call 1); call 2, the display
face is Archivo at `wdth` 113, `wght` 500. Call 3 (casing) was left open by the frames and stays the per-site default.

**Schemes.** The file reuses the SAAS variable library (`2 · Scheme`, Scheme 1–9). `get_variable_defs` on a node gives only a
flat set, so each scheme was resolved through `use_figma` alias chains. `THEMES[5]` is appended (never reorder) and carries
Scheme 1 as its own palette (`#DADADA` / `#111111`) and Schemes 2–9 as `schemes`, Figma's numbering kept. Everything is read
from the collection except `sem.glow`, `sem.hl` and the `inactive*` keys (inferred from box1 and the ink) and `tag/4/bg` (S8's
`#262626` is read off the header's Archive chip, the rest inferred from `tag/4/text`).

| Scheme | Ground | Used for |
|---|---|---|
| 1 (theme) | `#DADADA` | bio, map, the page's `pageBg` |
| 2 | `#F2F2F2` | gallery, calendar |
| 3 | `#262626` | (no section seat yet) |
| 4 / 6 | `#5C939F` | nested teal nodes |
| 5 | `#ED6D40` | testimonials |
| 7 | `#ED6D40` | nested orange nodes |
| 8 | `#111111` | header, media, video, repertoire, pricing, form, footer (text `#F2F2F2`, activeBg teal) |
| 9 | `#DADADA` | nested |

`SCHEMES_OF.Lattice` rows 0–3 are identical (layouts 2–4 are placeholders and copy row 0's seats); bio and map take the theme's
own Scheme 1, so they have no entry; video has no frame and is seated on 8. A later section that finds a seat wrong edits the
one row.

**Faces.** `display` is `'Archivo Lattice', 'Archivo', sans-serif`; `label` / `ui` / `mono` are Azeret Mono; `body` is Archivo.
The frames' display family is the custom "Lattice Display Medium", not on Google Fonts. `Archivo Lattice` is an `@font-face`
alias in `index.css` (three unicode-range blocks, gstatic v25 woff2) pinning the variable Archivo file to `font-weight: 500`
and `font-stretch: 113%`, so no section names an axis and the existing `Archivo` link stays byte-identical (the other
templates digest to zero rows). Verified in the harness: `KAI MERCER` at 128px with -0.01em tracking is 898.3px against the
frame's 898.8. If the file's version moves, the alias falls back to Archivo Regular; the popup clones head `<style>`, so the
published tab carries the alias with no change of its own (`public/published.html` has no font link). Azeret Mono 400 is
in `index.html` and `preview.html`; `preview.html` also gets Archivo 400, since no other theme names it there.
`latticeEms` / `LATTICE_EM` / `LATTICE_KERN` (`scripts/ems-table.mjs "Archivo Lattice" --check`, within 0.5% over six names)
are `navFace` for Lattice, upper-cased, tracking left to the caller. `casing: 'title'`, `dls: 0px`.

**Metrics.** `radius 20px`, `radiusSm / btnR / radiusChip 3px`, `bw 1px`.

**Ramp.** `THEME_RAMP.Lattice`, read off raw text nodes (the page binds a flat set) at the frame's own width:

| key | 1440 (frame × .82) | 768 | 390 |
|---|---|---|---|
| dispXl | 105 | 79 | 51 |
| dispLg | 78 | 59 | 38 |
| dispMd | 49 | 48 | 40 |
| dispSm | 33 | 32 | 26 |
| title | 25 | 27 | 25 |
| list | 20 | 24 | 18 |
| labelLg | 18 | 22 | 20 |
| labelMd / Sm / Xs | 10 / 9 / 9 | 12 / 11 / 11 | 12 / 11 / 11 |
| bodyLg / Md / Sm | 15 / 13 / 12 | 18 / 16 / 15 | 18 / 16 / 15 |
| chip / eyebrow | 9 / 10 | 11 / 12 | 11 / 12 |

**Flags and the name-gate inventory.** `lattice: T.name === 'Lattice'` sits after `pop`; `designed` and `limeTree` are widened to
it. `headerFamily` gives `'lattice'`, with `HEADER_COUNT.lattice = 4` and `HEADER_NAMES.lattice` sliced from
`PHOTOGRAPHIC_NAMES` (the setup modal offers Full photo, Side by side, Framed photo, Stacked). `navFace` gains Lattice. **Left
unwidened on purpose** (each is a section's own decision, so its session reads it): the layout-2+ arms (~560, 597, 619, 660,
684, 700, 736 at the time), `navGapEm` and `titleWordEms`, the quote and footer `wordEms`, `gigDark`, `grainSrc`, Pop's inset
block. **`limeTreeTheme` is not widened**: its three seeds (`TIERS_1`, `FORM_BTN_1`, `CAL_HEADING_1`) are per-section calls, and
Lattice's pricing chips read Solo / Trio / Band, which is `TIERS`, not `TIERS_1`; sections 7, 8 and 9 decide.

**Caps.** `specAt` returned `undefined` for a template-keyed spec naming neither the template nor `'*'`: 104 caps Pop has and
Lattice did not (every `FIELDS` heading, tier, song and gallery key, plus `IDENTITY_CHARS` title, location and seal). One line
in `specAt` now reads Pop's row for Lattice in that case, **provisional until session 12 measures them** with
`limits.mjs <cat> --themes=5`. `limits.mjs --seeds` at theme 5: 0 seeds over cap, all twelve categories.

**Photography.** The frames hold **four photographs**, not the ~20 the plan budgeted, because every thumbnail, track cover and
avatar is one of them re-cropped: hero `a55a2e2d`, portrait `40a976f3`, the bio's `04a8339f` and a fourth `0cb3f486`, each a 1536-wide JPEG used as the frame's own file, unmodified (a re-encode at 74 came out larger). `lattice-hero.jpg`,
`-portrait`, `-bio`, `-alt`: **573 KB raw**; `src/builder/photos/` 6.5 → 7.1 MB; the standalone build 11.93 → **12.70 MB**
(+0.77 MB; CLAUDE.md's "~9.8 MB" is stale, the committed root file is 11.93 MB). `SEEDS.Lattice` seats the header on the hero, the
avatar on the portrait, the bio, the form on `lattice-alt`, the gallery's strip of seven in the frame's order, and the five
track covers (`rowArt`, so `defaultTrackArt` reads a template's own before `ROW_ART`). Video has no frame and stands on the
hero. No `FOCUS` entry was needed: every slot is a centred `FILL`.

**Art, deferred.** Three rasters were measured and **not** imported: the hero's dot field (2880 × 1500 RGBA at 2×, ~560 dots on a
regular lattice sheared ~1°), the dotted disc (400 × 400 PNG) and the per-section art (map card, calendar torus). They are
the header's and each section's own, per width. **The header session decides SVG against raster** for the dot field: ~560
dots on a sheared lattice is a pattern, so vector is the default if it holds at all three widths; raster only if it does not.

**Ground, gutter, published page.** `vm.pageBg`, the page gutter and the published `documentElement` all read
`theme.palette[0]`, Scheme 1's `#DADADA`, while the frame's page body is `#111111`. No section shows the gutter at full width
(each paints its own band), so it is not a problem yet; **the end-of-pass sweep checks the gutter at 1440+ and 1180–1440
(the zoomed published tab)**, where a `#DADADA` edge beside a dark section would be seen.

**Hero 750 at every width** (open question 3): the frames' header is 750 tall at 1440, 768 and 390, where `WIDE.heroH` is
614 / 1024 / 844. Not touched in session 0; the picker aspect and setup cards still use the old numbers, and the
header session settles it.

**Picker.** The filmstrip is a flex row of 168px tiles, so six and gaps (~1058px) fit its 1100px column, with no change. The comment said "all five" and now says every template.
The setup modal offers the four named Lattice cards.

**Tooling.** All of it already took a sixth theme; only defaults and header comments named five: `limits.mjs` default
themes `0,1,2,3,4,5`, `photo-aspect.mjs` default list, `reach.mjs`'s note, and the three probes' flag docs. Each was run once at
theme 5 on a placeholder page: `inline-probe` PASS (footer, 1440), `photo-probe` PASS (bio), `focus-probe` PASS (footer, 20
controls), `reach.mjs 5` runs, `limits.mjs --seeds` runs, `page-check.mjs Lattice 0` (picker → published tab, no errors),
`build-digest.mjs` loops over the thumbnails it finds (no hard-coded five), `digest.mjs` and `shots.mjs` take indices.
This is "it runs", not "it passes the layout": the page's sections are still Retro arms.

**Exit proof.** `digest.mjs` 0,1,2,3,4 on the HEAD worktree (:5184) against the working tree (:5173), 720 renders each, ports and
`?t=` stamps normalised: **0 differing files**. Lattice renders at all three widths for all twelve categories with no console
error, the title in `Archivo Lattice`.

### Settled in section 1 — the header (2026-11-19)

**Verdicts on the three things the session was asked to decide.**

1. **The dot field is vector, and it is not a lattice.** The brief called it a regular lattice sheared ~1°. Measured off the
   frames' 2x rasters (connected components, alpha-weighted centroids), the rows *bow*: the pitch runs 106 to 114 along one row
   and the step 0.7 to 2.4 down it, so no `<pattern>` and no matrix reproduces it. Each width is therefore its own centroid set
   (560 dots at 1440 × 750, 436 at 390, and 831 at 768 of which 483 show: the 768 frame is a CROP at 0.6703 of a wider canvas, so
   the tablet set has the crop baked in, which was proved against the raster). `LATTICE_DOTS` in `data.js` (17 KB) holds them as
   four buckets by dot area (`r`, `o`, and one path of zero-length subpaths in quarter-pixel ints, `viewBox w×4 by 3000`);
   `latticeDotField(dev)` builds the data-URI SVG once per width, and `sectionVm` hands it over as `vm.dotField`. Checked against
   the rasters at 2x: ink mass 1.00 / 0.98 / 1.00, 8-px block correlation .977 / .961 / .973. It is drawn as a
   `pointer-events: none` layer over the photograph with `background-size: 100% 100%`, so it follows the hero at any canvas width.
   The footer and testimonials' fields (open question 5) are not settled here; they are other sections' own sets.
2. **The dotted disc is a raster.** Ring segmentation by connected components and by ray peaks, and a conic fit, all failed on
   merged rings and gaps, so no vector was fitted. The 400 × 400 PNG is cropped to its ink (256 × 162) and held as a lossless WebP (14.5 KB,
   `photos/lattice-disc.webp`, `LATTICE_ART` in `photos.js`) used as a **mask**, so the section inks it with `s.tx` and the
   same file serves every ground. Drawn 128 × 81 at 1440 × 0.82 and as-is narrow, at `top: 114.5`, `right: 46 / 24.12 / 18`
   (frame numbers). It never spins: the artwork is a still disc, so `badgeOptsFor` offers Lattice's layout 1 *Visible / Hidden*
   as it does Lime and Editorial. `Hidden` removes it.
3. **Hero 750 at every width, narrow only.** Desktop is unchanged (the canvas is the 1440 frame × 0.82 = 1180 × 614; the 750 frame
   gives 615). At 768 and 390 the header is `768 / 750` and `390 / 750`, set by one line in `sectionVm`
   (`if (T.name === 'Lattice' && cat === 'header' && Z.dev !== 'desktop') vm.heroH = 750`), because `heroH` is the `maxHeight` the
   aspect ratio meets. `WIDE.heroH`, `SPOT_ASPECT` and `preview.jsx` are **untouched**: the picker, the stage and the setup cards
   all draw the desktop hero, whose aspect Lattice shares with the other five, so open question 3 closes without moving them.
   The clamp is exercised: with the hero forced to 430 and 520 px wide at the mobile frame it stays 750 tall (the aspect alone
   would give 826 and 1000) and the name and chips do not move.

**The block.** `HeaderV0` returns `LatticeHero` under `s.lattice`; no other template's code path moves (digest, below). It is
a new composition that reuses `Title`, `Photo` and `fitSz` and draws its own disc, so it needs no `SealBadge` arm. What it draws, every number the frame's (desktop
× 0.82 through `k`):

- A `#111` ground with a warm radial glow at the lower right (`onScheme[1].activeBg` at 14%), the photograph at .55 in a wrapper,
  `SCRIM.lattice` (`#111` .55 → .15 at 40% → .9) and the dot field. Block means against the frame agree to 1–3 counts of 255 in
  the middle rows at all three widths.
- **The bar** is the hamburger on the left and a bracket-cornered Book Now on the right (`BracketButton`: mono caps label and
  arrow between four 9 × 9 corner marks, 130 × 44; `LatticeBurger`: three 2px bars 20 wide in a 46 box whose ink starts 13 in).
  The frame's tablet and mobile masters put the hamburger on the *right* and keep a wordmark with a rule; the standing
  header-nav removals win (hamburger left, no wordmark). **The desktop bar stands 5.7 canvas px lower than the frame's (a call for the user to confirm)**
  (`27` frame px of top padding where tablet and mobile keep the frame's `20`): the builder's section toolbar (`right 8`,
  `top 8`, 99 × 31) covers the label's centre at the frame's height, and a click on Book Now opened nothing (inline-probe
  MISSING). Tablet clears it. `menuColours` seats the open panel on `s.bg` / `s.tx`, its links in `labelLg`, its own Book Now
  the same bracket; verified at 390.
- **The card** is 194 (radius 20, a 1px `s.tx` inside ring), the name beside it at 128 (105 on the canvas), `lh 0.86`, bottom
  aligned to the card with the frame's 6.03 under it (the kicker row is gone, so the column is the name alone). At 390 the card
  stands over the name. Under the name, six **square chips** (3px, 26 high, a `■` marker): outline, orange, teal, dark, orange,
  outline, off `vm.tagChips` on the `vm.chips` seats; the outline is an inset `boxShadow`, not a border.
- **The title** is `Archivo Lattice`, uppercase (`Title`'s `textTransform` list now includes `s.lattice`). The alias is 1.8% narrower than the frame's
  face in ink (895 against 879 at 1440), so the tracking is the frame's −0.01em plus 0.0141em, **+0.004em**, which lands the
  ink on the frame's (left and baseline exact). `latticeEms` was measured at no tracking, so the fit adds the same
  0.004em per glyph (`sectionVm`'s title face), or "RAVENSCROFT" broke mid-word at the exact-fit size.
  `TITLE_SITES.Lattice[0]`: base 105 / 79 / 51, `lh` .86, one wrapping run, W 751 / 489.8 / 342, R 614 / 750 / 750, no `bs`, no
  `room` (the name never drops under the card). Measured: the seed is one line at 1440 and two at 768 and 390; four stress names
  hold the two-line budget and shrink past it, never overflow, and the floor holds at half (hyphenated one-word names break at
  the hyphen, as they do in every template).

**Fields.** `FIELDS.header`: `badgeMode` `Lattice: [0, 3]`, `badgeText` `Lattice: [3]` (13), `tags` / `showTags` `Lattice: [0, 2, 3]` (count `[6, null, 6, 6]`:
`limits.mjs header --themes=5 --designs=0 --check` first failed the shared 8 at 768 and 390, where the row must hold one and two lines),
`heroCta` / `faceTitle` / `faceBody` / `cardLine` `Lattice: [1]` / `[2]` for the placeholder cards, `align` `Lattice: [0]`, `title` cap 80.
Measured at layout 1 with `limits.mjs --check`: `title` 80, `cta1` 16 and the chip text 22 hold at all three widths.
`align: centre` renders at all three widths (the card stands over the name at 390; at 768 it stays left and the name column
centres its text), and `badgeMode: hidden` removes the disc.
`INLINE_OFF`: `Lattice.{0..3}.header.kicker` and `.location`. Caps for the card-2 and card-3 fields (`heroCta`, `faceTitle`, `faceBody`, `cardLine`, `badgeText` at 4) are Pop's / Lime's, **not
measured for Lattice** (owed to the layout 2, 3 and 4 passes).

**The four cards.** Layouts 2–4 render `HeaderV1`–`V3` in Lattice tokens and are legible at all three widths: no Lattice frame
exists for them (open question 2 stays open). One fix: `HeaderV3`'s floor fade ended in `s.ac`, which is the pale ink under
Scheme 8, so the white name stood on a pale band; it ends in `s.bg` as Editorial's and Pop's do. Still owed to the later layout
passes: card 4's avatar ring is Lime's green, and the face card and chips are Lime's.
`pickHeader` needed nothing (the page fold, `pageLayout` and `pageOrder` are theme-agnostic); the modal's four named cards render
live.

**Tooling.** `scripts/page-check.mjs`'s burger detector took a 26 px span; it now takes 25–50 and three children, for Lattice's
46 px hit area (re-run on Retro: burger 1 → 11 links, no errors).

**Exit proof.** `digest.mjs` 0,1,2,3,4 on the HEAD worktree against the working tree (taken twice, after the last source
edit too), ports normalised: **0 differing files of 720**; the positive control is that the old tree answers no
`latticeDotField`. `inline-probe` (`--theme Lattice --layout 1 --width 1440,768 --cat header --check`) PASS, 8 slots hit at each width,
2 off (the ledgered kicker and location); `photo-probe` PASS, filled and `--blank`; the disc's mean brightness per row agrees with the frame's to 2–3 counts of 255
(its lit bottom edge reads 8 px short only because the Figma screenshot is 1024 px wide, upscaled); `focus-probe --prime` PASS (12 controls);
`limits.mjs header --seeds` 0 over caps; `page-check.mjs Lattice 0`: Book Now scrolls to the form, every menu link scrolls and
closes, the 390 burger opens (1 → 11 links), no errors, no overflow. In the builder: six templates, Lattice's stage and tile are
the live hero, the modal shows four named cards, card 1 opens the editor on the Lattice page.

### Settled in section 2 — the bio (2026-11-19)

**The block.** `LatticeBio` (`EncoreSection.jsx`, dispatched at the head of `Bio` on `s.v0 && s.lattice`, so Lime's block no longer reaches
Lattice at design 0). Every number is the frame's (desktop x 0.82 through `u`; 768 and 390 verbatim), read per master off
`get_design_context` and proved by `getBoundingClientRect` against it (below). What the frame draws:

- **Grid.** Desktop: 12 columns, gap 24, content 48.96 in (40.15 on the canvas). Flank on 1-4, the portrait and rail on 5-8 (portrait
  391.34 + 16 + a 24 rail), the About column on 10-12 (317.5, so column 9 is air). 768: the heading, then two equal 345.89 columns 24
  apart (the portrait with its rail, About), both 600 tall, 26.11 in. 390: one 342 column, 24 in, heading, portrait row (600), About, 28
  between blocks. The portrait is 20-radius (`u(20)`), a centred `FILL` of `lattice-bio`.
- **The rail** is a 24-wide column, padding 8, `space-between`: a teal square (`s.chips[0].bg`, `#5C939F`), the town in Azeret Mono 11
  tracked 0.04em reading bottom to top, and a 1px x 180 hairline in `s.tx`. Its text sits 106 long between the other two, which is the
  frame's 189.5 top and 469 for the line at 657 tall. An emptied town drops the text; the square and line keep their seats.
- **About column**: `About` (12 mono caps) and the paragraph (16 Archivo, line 1.2, `pre-line`) 16 apart at 1440 and 768 and 6 apart at
  390, where the frame leaves 9.96 empty under the paragraph (kept as a gap), and a foot of a 1px rule, 14 down, the `roleLine` (`DJ · LIVE
  ACT · MANCHESTER, UK`) in 12 mono caps, 33 tall, pinned to the column's foot at 1440 and 768.
- **Sizes are raw, not the ramp.** The ramp rounds the frame's 12 / 11 / 16 x 0.82 to 10 / 9 / 13 at 1440, and the paragraph then wraps
  3 lines where the frame wraps 4. The block sets `u(12)` / `u(11)` / `u(16)`. The heading is a raw 77.76 / 48 / 38 (no token: the ramp's
  `dispLg` is 95.04 at 1440, 59 at 768), `Archivo Lattice`, 500, line 1, tracking +0.004em as the header's, uppercase; its ink is
  307 at 1440 against the frame's 307.
- **The heading stacks a word a line at every width** (`width: min-content`). The frame's seed has hard breaks at 768 and 390 and wraps
  to one word a line at 1440 in a 431 flank. This is a call for the user to confirm: any typed head now does the same, so "A B C D E F G H
  I J K" (21 characters) stacks eleven high and grows the row. Fitted to its flank (`vm.titleWordEms`, set for Lattice's bio only, with
  the +0.004em): a 21-letter word sets at 38% at 1440 and 49% at 390. `containerType: inline-size` on the flank, `100cqi` as Lime's.
- **Removed copy and what it left.** `KM / BIO` and `[ 001 ] --- STRUCTURE · BIO_01` are not drawn (user call, section 0). At 1440 the
  head keeps the frame's seat (top 221.05, 227.16 on the canvas, proved) by padding the flank with the two rows' heights (32.77 above, 14.38
  below) round a centred head. 768 and 390 stack the heading, a 36 / 28 gap, then the body: **892 and 1003 tall against the frames' 939
  and 1050**, the removed rows' height (47) shorter.
- **The dotted disc** (desktop alone). The bio's raster is the header's artwork (same 250 x 156 ink at 2x), so it is `LATTICE_ART.disc`
  again, drawn white as a mask at 128 x 81 in `mix-blend-mode: difference`: dark rings on the grey, inverted over the photograph. Its seat is
  left -56.2 and top 565.3 of the portrait row (frame px). The 768 and 390 masters clip it to a 113-pixel sliver, which is not drawn. So the
  bio's `badgeMode: hidden` removes it at 1440 and does nothing narrow (`reach.mjs`: layout 1, 2 of 6 renders), and `badgeOptsFor` offers
  Visible / Hidden for Lattice's bio (still art, no ring to turn).
- **The dot field** is the frame's, hung off the section's foot (423 / 516.5 / 577.5 tall, at 90%): `latticeBioDots(dev)` in `data.js`,
  the header's recipe (connected components on the 2x rasters, alpha-weighted centroids, four buckets by mass, `r` and `o` fitted to a
  bucket's mean mass and peak alpha, the container's .9 folded in): **326 dots at 1440, 714 at 768, 571 at 390**, 4 + 2 edge-clipped
  fragments dropped. `preserveAspectRatio` is `slice` so a root off the frame's width keeps round dots (checked at 1500). **It is the
  root's own `background-image`, not a node**: `limits.mjs` counts any element with `url(` in its `background-image` as a picture, and a
  node of its own capped `para1` at 237 at 768 (the paragraph entering the field's box), where text over the dots is the frame's own look at
  390. The root's `background` carries it (`EncoreSection`'s root, gated `s.bi && s.v0 && s.lattice`); the next section with a dot field
  should do the same, or the probe reads every long value as an overlap.
- **Insets and ground.** `vm.pad` (sectionVm, Lattice layout-1 bio): 56 top and foot at every width (45.92 on desktop), the content
  `calc(surplus + 40.15 / 26.11 / 24)`; Scheme 1 (`#DADADA`, ink `#111`), so it has no `SCHEMES_OF` row.

**Fields and caps.** `FIELDS.bio` layout 1 reads `heading`, `para1` and `badgeMode` (and the header's kicker and location through
`IDENTITY_READS`, unchanged: `reach.mjs 5` agrees). `heading` `Lattice: [21, null, 17, 19]` (21 measured at layout 1, the others Pop's),
`para1` open at 400 so its 390 stands, `IDENTITY_CHARS.bio.location` `Lattice: [19, 34, 15]` (19 measured, desktop 21 / 768 19 / 390 25;
the vertical rail is the tightest), `kicker` 20 off `'*'`, `limits.mjs` `FLOOR_AT` names Lattice for the bio heading. `limits.mjs bio
--themes=5 --designs=0 --check`: 0 fail, `--seeds` 0 over. No `INLINE_OFF` rows: the layout reads nothing the canvas does not draw.

**Proof.** Geometry by `getBoundingClientRect` against frame x 0.82 (desktop) or verbatim, root-relative: portrait 413.27 / 45.91 / 320.67 x
538.73 (frame 413.5 / 45.9 / 320.9 x 538.7), square 753.6 / 52.45, line 756.4 / 430.5 x 147.6, town centre 756.9 / 244.8 (757.4 / 244.8),
About 879.7 / 45.9, paragraph 70.83 tall 63 (four lines), rule 557.4, disc 367.2 / 509.5 x 105 (367.4 / 509.5); 768: portrait 26.11 / 236
(283.17 less 47.17), square 356 / 244, line 648, About 396 / 236, rule 803; 390: portrait 24 / 198, About 826, rule 913.9. Block-mean
pixel difference against the frame over the body: 1.2 / 1.8 of 255 at 768 / 390. `inline-probe` PASS (2 slots hit at 1440 and 768, 3
unhit: the role line, the town and `About`, which have no bio field), `photo-probe` PASS (filled, `--blank`, `--drop`), `focus-probe --prime`
PASS (5 controls; the town's box covers the vertical text), `page-check.mjs Lattice 0` no errors, the bio's seam under the header straight.
`&live=1` renders the same at all three widths; `&noimage=1` draws the `KM` initials on the well under the blended disc. `digest.mjs`
0,1,2,3,4: **0 differing files of 720**, taken against a HEAD worktree on :5185 (the positive control: :5185 answers no `latticeBioDots`;
Lattice's bio digest differs).

**Calls for the user to confirm:** the one-word-a-line head at every width; the 768 / 390 heights (892 / 1003) with the two rows removed.

### Settled in section 3 — the media player (2026-11-19)

**Verdict** (under *Seen at planning time*, written before the code): a new own-tree block, not Retro's `v0` body and not Lime's. It stands in `Media`
**after** the hooks and the hoisted seam (`sleeveSlot`), not at the head as the bio's did (`Media` owns `useRef` / `useState`; an early return above
them changes the hook count on a theme switch, and `Bio` has none). `Media` hands `LatticeMedia` `{ at, count, playing, now, sleeve, sleeveSlot,
audio, goTo, toggle, onPick }`, so the published player is the one seam in a new picture. Notes: `notes/media.md`, *Lattice · layout 1*.

**The block.** Every number the frame's (desktop x 0.82 through `u`, 768 and 390 verbatim; raw sizes 24 / 24 / 18 row titles, 30 / 27 / 25 card title,
12 / 11 mono, not the ramp). Rows are 93 tall with a 1px `s.tx` hairline, number · title and sub · 56 cover (44 at 390) · 44 square button (3px);
the grid is 886.72 : 431.375 at 24; the card is 466 tall at every width, `s.box1` with a 1px ring and a teal halo (`s.glow` .14), the sleeve a
20-radius flex remainder with an orange halo (`s.text3` .16), three square transport buttons, and a 48-bar meter (gap 3, heights `4 + i % 9`). The
heading is `Archivo Lattice` at 74.88 x .82 / 48 / 38, two lines (an em measure between "Five worth" and "Five worth your": 8em; 6.9em at 390 so the seed
stacks on the frame's three lines), fitted to its widest word by `vm.titleWordEms` (the bio's rule, now `cat === 'bio' || 'media'`). The Soundcloud
pill is `BracketButton` with a new `ext` arm (`extLink`: a picture on the canvas and while the address is empty). The glow is the root's own
`radial-gradient(ellipse 42% 38.5% at 85% 60%, glow 14%, 0)`, which all three frames' `gradientTransform`s reduce to (no `url(`). `vm.pad`: top and foot
106.13 / 77 / 58 with the bio's content insets, and a 98 top at 390 (below).

**Calls for the user to confirm.**
1. **The marked row is the card's track, not the frame's.** The frame marks row 02, prints `02 / 05` and names *Night Rain*, which is not in its list.
   The card names the cued track (`at`), so the marked ground and filled square sit on row `at` (layout 4's tile seat): the canvas draws row 1 and
   `01 / 05`. Pause shows on the marked row and the centre square only while `playing`.
2. **Two literals and a derived position.** `Now playing` is the frame's label with no field (JP-071's unreported-sibling rule); `0N / 0M` is derived from
   `at` and the list length, `00 / 00` empty. Neither is the removed `5 / 5 Featured`; say if it should go.
3. **The meter's playhead is live-only.** The frame draws all 48 bars in one ink; live, the played share is lit and the rest dim to .3 (so the idle
   published player starts dim), and the canvas keeps the frame's all-lit picture.
4. **Heights.** The eyebrow row is removed, so the section is 832 / 1362 / 1376 drawn against the frame's 1057 / 1404 / 1422 (42 / 42 / 46 shorter). The 390
   master's head box starts 40 down (import artefact; its eyebrow is at y 98), so the head takes the eyebrow's seat there, top 98, with the frame's 50
   to the list.
5. **The card title wraps** where the frame's *Night Rain* never did: the seeded `Manchester at 3am` is 315 in a 308 box at 390 (310 in 305.5 at 1440),
   so a second line costs the sleeve 25-30 and the card stays 466.

**Fields and caps.** `FIELDS.media` layout 1 reads `tracks` (`title`, `sub`), `heading` and `soundcloud`; `cta` stays hidden (`'*': []`). `heading` (20) and
`tracks.title` (17) / `sub` (33) resolve through `'*'` and hold at their seeds (`limits.mjs media --themes=5 --designs=0 --check`, 0 fail, `--seeds` 0
over); the seeded rows wrap at 390 in the frame, so the probe's one-line test is not the bound there. `IDENTITY_CHARS.media.title.Lattice` = `[40, 11,
13, 31]` (layout 1 measured: the artist line's box, 49 / 51 / 40; the rest Pop's). No `INLINE_OFF` rows: `inline-probe` reports 0 UNLEDGERED.

**Proof.** Geometry by `getBoundingClientRect` against the frame (desktop x .82, root-relative): heading 40.15 / 106.13, line one 439.0 wide (frame 439.06),
rows 76.26 at 275.84 (frame 93 x .82), covers 45.91, card 786.39 / 274.84 x 353.46 x 382.12 (786.9 / 353.7 x 382.1), sleeve 168.9 (169.3); 768: rows 93 at 230,
card 168.5 / 819 x 431 x 466, sleeve 217.41 (217.44); 390: rows 93, card 24 x 466, sleeve 227.41 (227.44), head three lines (97.1 / 164.3 / 239 wide). Probes at
`--theme Lattice --layout 1 --cat media`: `inline-probe` (1440 and 768) PASS, 11 slots hit, 0 UNLEDGERED; `photo-probe` PASS (filled, `--blank`, `--drop`);
`focus-probe --prime` PASS (17 controls). Live (`&live=1`, chrome-devtools trusted click): a row pick loads its track, the card, counter, marked row and
Pause follow, Next / Previous wrap, the clocks run (`00:04 / 07:05`) and the played bars light; the Soundcloud pill links `https://` + the address with
`target=_blank rel=noopener noreferrer`; `page-check.mjs Lattice 0` plays the media in the published tab (`paused: false`, `t` advancing, no errors).
Empty states: `&noimage=1` draws the `KM` initials on the `#1B1B1B` sleeve well, and an emptied list prints `No tracks yet.` in the list and on the card
with `00 / 00`. `digest.mjs` 0,1,2,3,4 on a HEAD worktree (:5185, the positive control: it answers no `LatticeMedia`) against the working tree (:5173), ports
normalised: **0 differing files of 720**. The second commit's edits are inside Lattice gates (`LatticeMedia`, the Lattice pad arm).

**For the gallery (section 4).** `Gallery` has hooks too, so its block goes after its seam, not at the head. `BracketButton` takes `ext` (outward address) as
well as `to` (anchor). A section glow is a percentage `radial-gradient` on the root (`s.me && s.v0 && s.lattice` in the root style). The masters' head boxes
carry import artefacts (a 40 offset at 390 here): read positions off the render and say which reading the height follows.

### Settled in section 4 — the gallery (2026-11-19)

**Verdict** (under *Seen at planning time*, written before the code): a new own-tree block, not Lime's and not Pop's widening of it. `LatticeGallery` stands in `Gallery`'s
`if (s.v0)` **after the seam**; `pick`, `src`, `go`, `srcRows`, `srcAct`, `video` and `player` stay `Gallery`'s and go over in `g`. Notes: `notes/gallery.md`, *Lattice · layout 1*.

**The block.** Every number the frame's (desktop x 0.82 through `u`, 768 and 390 verbatim; raw sizes 74.88 / 48 / 38 heading, 12 / 11 mono, not the ramp). Two columns 1fr : 1fr at 24
(one column at 768 and 390, 32 apart). Left: the heading (`Archivo Lattice`, two typed-break blocks, *See us* / *in action*, fitted to its widest word by `vm.titleWordEms`, now
`bio` / `media` / `gallery`), then four rows, each a 1px-ruled 3px-radius box (116.72 tall at 1440, 64 narrow, 12 apart): a 46 square seat (1px, opacity .9, 18 transcribed stroke icons), a mono 12 label,
and a `+` / `×` in a 24 box; the open row is filled ink. Right: the back link and credit (head row 30.375 tall), the figure (20 radius, aspect 659.047 : 540.75 at every width, a 0 / 0 / 80 shadow at .12), a caption pill (16 in, 30 tall,
3px) bottom-left, two 44 square arrow buttons bottom-right (Arial 13.33 arrows, 6 apart), seven square 1px tiles (gap 10, photograph inside the rule), and a 1px track with a 3px played segment beside a mono 12 counter (24 apart). `vm.pad`:
78.72 / 77 / 58 top and foot, the bio's content insets. No glow, no dots, no seam: Scheme 2's `#F2F2F2`.

**Calls for the user to confirm** (the frame and a standing rule, or the frame and the data, disagree):
1. **The viewer opens on slot 2, not the shared `galActive()` slot 3.** The frame's viewer is the third tile's photograph (the portrait) and prints `02`; Lime's seed is the fourth. Slot 2 keeps the frame's picture; nothing outside the block reads it (grepped `EncoreBuilder.jsx`, `data.js`, `scripts/`).
2. **The caption is `IMG_0N`.** The frame's `IMG_02 · Club night`: "Club night" has no field and would be wrong on six of seven photographs, so it is dropped; `IMG_0N` is derived from the viewer's slot.
3. **The counter and the progress line follow the data.** The canvas draws `03 — 07` with a 3/7 segment where the frame draws `02 — 15` and 2/15 (a count the page does not have).
4. **The pick ring is live-only.** The frame marks no tile, so the canvas and the first paint mark none; a visitor's own pick rings its tile in 3px of Scheme 7's orange, inside.
5. **`[ 003 ] ——— KICKER` is a literal around a typed kicker.** Seeded empty, so not drawn (call 1 holds); typed, the `[ 003 ]` and rule come with it. At desktop its seat is kept empty so the columns stand where the frame's do.
6. **Heights.** Desktop keeps the frame's 923 x 0.82 = 756.84 (the eyebrow's seat held). 768 and 390 follow the *render* with the eyebrow row removed: 1391.8 and 973.7 against the masters' 1438 and 1020 (46.4 shorter each). No master's head box was offset here (unlike the media's 390).
7. **`sourceLabel` prints at every width** (the rows are full-width at 768 and 390, where Lime's are icon tiles), so its cap is the narrow reading, 25. The panel's hint still says "on desktop only" (it is template-wide copy); `notes/gallery.md` says otherwise for Lattice.

**Fields and caps.** `FIELDS.gallery` layout 1 reads `heading`, `kicker`, `railLabel`, `backLabel`, `sourceLabel`, `images` and the three addresses. `limits.mjs gallery --themes=5 --designs=0`: `kicker` 41, `sourceLabel` 25 (62 / 69 / 25), `railLabel` 45,
`backLabel` 34 (the sized one), `heading` **16** (measured 14: *Kestrel Nights* fills a line, so the seed's 16 is the floor, as Editorial's and Pop's; `--check` reads it as `floor` at 1440 and 390). `--check`: 0 fail; `--seeds`: 0 over. No `INLINE_OFF` rows.

**Proof.** Geometry by `getBoundingClientRect` against the frame (desktop x .82, root-relative, all within 0.4 px, the canvas's 40.15 inset): root 756.84 (frame 756.86), heading 116.7, rows 265.77 + 105.55 x n at 95.7, figure 599.84 / 120.02 x 540.02 x 443.08,
tiles 579.5 at 70.12, progress 666.02, track 466.4, buttons 36.08 right-aligned 13.1 in; 768: rows 205 + 76, figure 579.4 x 715.78 x 587.3, tiles 1186.7 at 93.68, progress 1300.38, track 626.02, glyph box 674.78; 390: rows 166 + 76, figure 540.4, tiles 841 at 40.28, progress 901.3. Probes at
`--theme Lattice --layout 1 --cat gallery`: `inline-probe` (1440 and 768) PASS, 4 slots hit (the back link's arrow had to be its own span for its copy to be exact); `photo-probe` PASS filled, `--blank` (7 appended) and `--drop`; `focus-probe --prime` PASS (8 controls).
Live (`&live=1`): trusted clicks on Next / Previous (wraps 01 to 07), Back to beginning, a thumbnail (06, then 01, and the same tile again is idempotent) at 1440 and 390, the YouTube row (the embed replaces the photograph, the row takes the open look, caption and arrows step aside), the Instagram and TikTok rows
links with `target=_blank rel=noopener noreferrer`, empty social rows not drawn live; `page-check.mjs Lattice 0` no errors, `overflow390` 0 (its `false`s are idempotent clicks: Back when already at 01, a tile that is already the viewer's). `&n=0` draws ink initials on the pale well, a typed kicker draws
in its seat. `digest.mjs` 0,1,2,3,4 against a HEAD worktree (:5185, which answered no `LatticeGallery`), `?t=` and ports normalised: **0 differing files of 720**; at theme 5 only the three layout-1 gallery renders differ (layouts 2-4 are byte-identical).

**For the repertoire (section 5).** `Repertoire` has hooks (search, chips, pager) too, so its block goes after its seam, and what the seam resolved is handed over in one object (`g`, `m`), not a dozen props. Raw sizes through a `u(v)` helper (x 0.82 desktop, verbatim narrow). A section glow is the root's own `radial-gradient`
(the root style gates on `s.me`; the repertoire's would be `s.re`), never a node. Do not leave a text node that mixes a glyph and a label (`← label`): the inline probe cannot match it, so the glyph is its own span. In zsh, `for f in "--blank --check"` does not split: call each probe literally and check the output differs.

### Inherited and used

- `sectionVm`'s scheme seat (`SCHEMES_OF`, `flatScheme`, `s.onScheme[n]`) from Editorial and Pop; `THEME_RAMP` from Lime and Pop.
- `ems-table.mjs` (Fraunces' recipe) for `LATTICE_EM`.
- `defaultTrackArt` for the track covers (given a `rowArt` override here).

## Open questions

1. **Are all eleven the existing layout-1 compositions?** The pictures say yes for every one; the media is the
   least certain (a track list beside a now-playing card, where Retro's body is a fan of tilted cards beside a
   now-playing card — the same inventory, re-laid). Session 3 diffs it against `Media`'s `v0` body first. If any
   section (media, map, calendar) is a new composition, build them as an **own-tree early-return block**
   (`if (s.v0 && s.lattice)`, Lime's media precedent, `s.limeTree`'s comment) so no other template moves, and
   record that the page's layout-1 composition for Lattice is its own.
2. **Layouts 2–4 of Lattice** are placeholders. Is there a Batch 2 frame for them, and are they the same template?
   (This plan does not need the answer; the setup modal's cards 2–4 do render.)
3. ~~**Hero height 750 at every width.**~~ *Settled in section 1: narrow-only 750 behind `lattice`; desktop and the picker aspect unchanged.* **(was)** `WIDE.heroH` (614 at desktop × 0.82, then 1024 and 844), `SPOT_ASPECT`, the
   picker frame and the setup cards all assume the old tablet and mobile heights. Decide in section 1: a Lattice
   override of those numbers, or the frame wins and the card aspect follows.
4. **Does the frame bind a second palette for the teal** (`#5B8E9B`-ish, the pricing card, the chips, the map
   labels, the `■` markers)? Read it; if no variable holds it, it is a named literal and `sem` carries it.
5. **The footer's and testimonials' dot field** differ in density from the hero's. One tile at one opacity per
   ground, or one per section? Measure before choosing.
6. **`video`** has no Lattice frame. It renders in Lattice's tokens when a user adds it, as on every template with
   cards 1 and 3.
