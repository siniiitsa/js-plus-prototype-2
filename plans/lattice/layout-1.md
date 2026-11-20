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
| 5 | `repertoire` | `1:673` | 1440 × 1067 | `1:9306` | 768 × 1067 | `1:10278` | 390 × 1555 | Dark with a warm glow; `240 SONGS`, search box, four chips, two-column dense list, pager · **Lime's *Two-column dense*** (verdict: new own block `LatticeRepertoire`, same inventory, no shared leaf) | done `fd0372b` |
| 6 | `map` | `1:796` | 1440 × 983 | `1:9429` | 768 × 1351 | `1:10401` | 390 × 1454 | Grey; `MANCHESTER`, a dotted-ellipse card with a *Based in* foot, an upcoming-gigs panel with status pills and a pager · **Lime's *Compact tile*** (the raster map is the dotted art) | done 849e4e6 |
| 7 | `pricing` | `1:915` | 1440 × 1032 | `1:9547` | 768 × 1572 | `1:10518` | 390 × 2107 | Dark; heading, a boxed Solo / Trio / Band chip row, three coloured cards (dark, orange, teal) with Book Now bars, small print · **Lime's pricing** (verdict: new own block `LatticePricing`) | done 4c242b5 |
| 8 | `calendar` | `1:1039` | 1440 × 781 | `1:9670` | 768 × 564 | `1:10640` | 390 × 894 | Light; one bordered card: month grid left, `[ 007 ] AVAILABILITY` and a torus art right, an enquiry foot with Continue · **Lime's *Scheduler*** | done 8574802 |
| 9 | `form` | `1:1147` | 1440 × 689 | `1:9778` | 768 × 990 | `1:10748` | 390 × 1230 | Dark; one bordered card: context panel (avatar, title, three promises) + the form (name, email, date, guests, event-type chips, message, Book Now) · **Lime's *Split context + form*** | done 0b27a05 |
| 10 | `testimonials` | `1:1222` | 1440 × 730 | `1:9851` | 768 × 730 | `1:10821` | 390 × 730 | Orange `#ED6D40` with a dot field; one bordered quote card, two arrow squares, a byline and two tag chips · **Lime's *Stacked tag card*** (verdict: new own block `LatticeTestimonials`) | done 6a6c6a6 |
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

- **map (section 6, 2026-11-19): *new own-tree block* `LatticeMap`, not Lime's *Compact tile* (nor Grunge's / Editorial's / Pop's widenings of it).** Diffed against the
  `if (s.limeTree)` block in `EventsMap` and `notes/map.md`, frames `1:796` · `1:9429` · `1:10401`. The *inventory* is Lime's (a heading with a radius line, a coverage
  card ending in a *Based in* foot, a gig panel with a count and rows, a pager), and **no leaf is**. Lime's tile is a 55-radius `mist` card round a raster map multiplied with
  the accent, its foot a globe glyph, the base and the terms on the card's own ground; here the card is a 1px-ruled 20-radius box whose picture is a **dotted bowl** (a raster
  of black dots, 470 tall at every width) with a centre square and a place label drawn on it and an `R = 120 mi` corner label, over a ruled foot (a teal 8px square, the base
  at 22 / 20, the terms in mono). Lime's rows are 999-radius pills with the date in a coloured disc at the *right*; here they are flush table rows on a 1px rule with the date
  (a mono month over a 30 / 27 / 25 display day) at the *left*, the venue and a mono city line, and a **status pill** at the right (*Sold out* filled orange, *Tickets* outlined)
  that Lime has no counterpart for. The panel head is the label at the left and the count in teal at the right, over a ruled list, not an inline `label · N`. The pager is
  square 3px boxes (44 arrows, 46 pages), not `Pager`'s Lime arm. The columns are 1fr : 1fr at 24 and the cards stack 24 apart narrow (Lime's 36 / 32 / 10). The frames draw
  **no pin and no lit row**, and the picture is art rather than a map. So it is a block of its own, standing in `EventsMap` **after the seam** (`perPage`, `pages`, `pg`,
  `shown`, `lit`, `onPick`, `win` stay `EventsMap`'s and go over in `g`). The twin prediction (*Lime's Compact tile*) was half right a third time: the seam is Lime's, the picture is not.

- **pricing (section 7, 2026-11-19): *new own-tree block* `LatticePricing`, not Lime's pricing block (nor Grunge's / Editorial's / Pop's widenings of it).** Diffed against the
  `if (s.limeTree)` block in `Pricing` and `notes/pricing.md`, frames `1:915` · `1:9547` · `1:10518`. The *inventory* is Lime's (a heading, a chip row over the packages' tags, a three-up
  deck of cards each with a name, a price, a blurb, features and a Book pill, a small-print line), and **no leaf is**. Lime's chips are filled 56-radius pills, here a 1px-ruled 3px
  *segmented box* (50 tall, 4 in, 40-tall tabs) whose lit tab is filled teal; Lime's card is one flat `box/2` in a 3px ring at radius 55 (Grunge 13, Editorial 0, Pop 50 leant), here three
  *coloured* 20-radius cards (Scheme 3 dark, 5 orange, 4 teal, by rendered seat) each with a soft halo in its own colour, no ring; Lime's card opens on an `[ico]` pill beside the
  name and a Bebas numeral, here a mono `[ 01 ]` and the unit (`/ event`) on one row, over the name (30) and the price (60), both in the one display face; Lime's features take a ✓ on
  no rule, here a `+` on a 1px rule across the card (28% on the dark card, solid ink on the other two); Lime's pill is `BookPill`'s rounded disc-and-label, here a full-width 44-tall
  rectangular *bar* in the card's own pair (ink ground, card-coloured label, `→`). And the **grid differs**: three columns at 1440, but at 768 **two columns with the third card spanning
  both** (Lime keeps three at 768), one column at 390 stacked 24 apart (Lime's 20 and 22), with a **520 minimum height** on every card at every width. The glow is a percentage radial
  gradient (60% x 55% at 50% / 75%, teal at 14% to 0 at 70%) at all three widths, the root's own. So it is a block of its own, standing in `Pricing` **after the seam** (`active`,
  `shown`, `pressChip` stay `Pricing`'s and go over in `g`). The twin prediction (*Lime's pricing*) was half right a fourth time: the seam is Lime's, the picture is not. The frames' lit
  *Solo* chip and `[ 006 ] PRICING` eyebrow are the two things the standing rules answer (calls below).

- **calendar (section 8, 2026-11-19): *new own-tree block* `LatticeCalendar`, not Lime's *Scheduler* (nor Grunge's / Editorial's / Pop's widenings of it).** Diffed against the
  `if (s.limeTree)` block in `Calendar` and `notes/calendar.md`, frames `1:1039` · `1:9670` · `1:10640`. The *inventory* is Lime's (a month head with two arrows, seven weekday names, a
  day grid, a picture half, a foot with the enquiry line), and **no leaf is**. Lime's panel is a `box/1` 55-radius card with a hairline between the halves, its arrows 55 x 54 round discs,
  its days `box/2` 26-radius cells, its right half a 35-radius *photograph* in a 20-padded half, and its foot the line alone (JP-088: the line is the link, no pill). Here the card is a
  1px-ruled 20-radius box on the section's own ground; the arrows are 44 square 3px boxes round an Arial glyph; the days are 3px-radius 1px-ruled boxes (82 x 66 at 1440, 39.7 x 31.7 at 768,
  38.7 x 31 at 390) with a *mono* two-digit numeral, the picked one filled ink; the right half is an `[ 007 ] ——— AVAILABILITY` eyebrow over a **dotted torus** (a raster, art, not a photograph)
  on a teal-at-18% radial glow, with the town and a short rule at its foot; and the foot is the enquiry line **with a Continue bar** (the frame draws a button where JP-088 removed Lime's
  pill, so the pill's reason, *no frame draws it*, no longer holds; the bar leads on to the form like Retro's pill). The **halves** are 1fr : 1fr side by side at 1440 and 768, and stacked at
  390 (Lime's 768 stacks them). The frames draw **five rows** (June 2025 opens on a Sunday and has 30 days, so a 5-row grid with two cells in the last), no booked or past day and no
  month count the seam disagrees with: `vm.calMonths` is the same months, so no shared count changes. So it is a block of its own, standing in `Calendar` **after the seam** (`at`, `month`,
  `cur`, `line`, `step`, `blocked` and `setSel` stay `Calendar`'s and go over in `g`): `Calendar` owns eight `useState` hooks, so an early return above them would change the hook count on a theme switch.
  The twin prediction (*Lime's Scheduler*) was half right a fifth time: the seam is Lime's, the picture is not.

- **form (section 9, 2026-11-19): *new own-tree block* `LatticeForm`, not Lime's *Split context + form* (nor Grunge's / Editorial's / Pop's widenings of it).** Diffed against the
  `if (s.v0 && s.limeTree)` block in `EnquiryForm` and `notes/form.md`, frames `1:1147` · `1:9778` · `1:10748`. The *inventory* is Lime's (a context half with the artist's portrait, name and
  role, a display head and the promises; a form half with paired boxes, an event-type chip row, a message box and a submit), and **no leaf is**. Lime's shell is a 55-radius `mist` card with the
  halves welded (the context half 420 wide with a rounded cap, the form half on the lime), here a 1px-ruled 20-radius card whose context panel is a square `box/1` (#1B1B1B) and whose form half
  is *unfilled*, the section's own ground and glow showing through; Lime's portrait is a 48 circle, here a 44 square at radius 3; its name is Bebas, here two mono lines (12 / 11, the second
  orange); its promises are `✓` rows on no rule, here a **ruled list** (1px across the column) with an orange `01 / 02 / 03` numeral; its boxes are 60-tall 999-radius pills with a Bebas label
  over each, here 48-tall 3px boxes in a 1px ring of full ink under an *orange mono* label; its chips are 28 tall inside a hairline, here 44-tall 3px boxes with the lit one filled ink; its
  message box is a 134-tall 20-radius pill, here 81 tall at 3px; its submit is a rounded pill with a disc, here a **plain full-width square bar** (50 / 48 tall) with a mono label and `→`. The
  stacking differs too: the halves stack at 768 and 390 with the context panel full-bleed on top (Lime's stack at 768 too, with a rounded cap); the field pairs stay two to a row at 768 and
  stack at 390 with a 28 gap (Lime's 12). The glow is a percentage radial gradient on the root (60% x 55% at 20% / 50%, `#ED6D40` at 14% to 0 at 70%, all three masters' `gradientTransform`s
  reduce to it), not a node. So it is a block of its own, standing in `EnquiryForm` **after the seam** (`vals`, `msg`, `ti`, `errs`, `sent`, `Pill`, `pillLink`, `onSubmit`, `cp`, `pid` and the
  setters stay `EnquiryForm`'s and go over in `g`): `EnquiryForm` owns six `useState` hooks, a `useRef` and a `useId`, so an early return above them would change the hook count on a theme
  switch. The twin prediction (*Lime's Split context + form*) was half right a sixth time: the seam is Lime's, the picture is not.

- **testimonials (section 10, 2026-11-19): *new own-tree block* `LatticeTestimonials`, not Lime's *Stacked tag card* (nor Grunge's / Editorial's / Pop's widenings of it).** Diffed against the
  `if (s.limeTree)` block in `Testimonials` and `notes/testimonials.md`, frames `1:1222` · `1:9851` · `1:10821`. The *inventory* is Lime's (one card on show with `cur`, two arrows that wrap at both ends and
  are not drawn at one review, the quote, two pills for `who` and `role`, a date line), and **no leaf is**. Lime's tree is a card standing on **two leant or offset backs** (a lime and a `box/2` slab, −46 and
  −27 off the top, drawn first) with a hard 0 / 4 / 4 shadow; here there are no backs and the card is a lone 1px-ruled 20-radius box on the ground with a **white 22% halo** (`0 0 90`). Lime's card is a flat
  `s.tx` slab with `s.bg` ink at radius 55, padding 50; here it is the *section's own ground* ruled in full ink, padding 36 / 27 / 18. Lime's date line is a Body/Eyebrow in Inter Bold; here a
  `[ 009 ] ——— REVIEWED 6 DAYS AGO` row of three mono parts. Lime's quote is Bebas on the ramp's `dispMd`; here `Archivo Lattice` at a raw 43.2 / 35 / 29 on a 1.0 line, uppercase, −0.01em. Lime draws **no byline**
  (the pills are the attribution); here a **ruled caption** (1px across the card) carries the name and the role as two mono lines *and* the two chips, which then repeat them. Lime's pills are 12-radius filled
  boxes in Display/Title; here they are 3px, 26 tall, mono 11, each with a 5px square marker, the first filled teal and the second ruled. Lime's arrows are 55 x 54 round rings (`Pager`'s Lime arm) lifted off the card's
  middle; here they are 44 square 3px boxes round an Arial `←` / `→`, centred on the card and at the content's edges at 1440 and 768 (24 off the card at 768), and a **centred row under the card at 390**, 12 apart.
  The card is a fixed 720 at 1440 and fills between the buttons at 768; the band is a centred 730 at every width (Lime's is a stated 165 / 145 top and foot). The ground is the dot field, hung off the *section* as a 730-tall
  raster at 70% (the testimonials' own set, open question 5), where Lime draws none. So it is a block of its own, standing in `Testimonials` **after the seam** (`n`, `at`, `q`, `go`, `paging`, `step` stay
  `Testimonials`'s and go over in `g`): `Testimonials` owns the `cur` hook, so an early return above it would change the hook count on a theme switch. The twin prediction (*Lime's Stacked tag card*) was half
  right a seventh time: the seam is Lime's, the picture is not. **The `[ 009 ] --- REVIEWED 6 DAYS AGO` ruling:** the text is `quotes.when`'s seed byte for byte (*Reviewed 6 days ago*, per review, uncased, dropped when
  emptied), so `when` is the seat of the words and `[ 009 ]` and the 40-wide rule are the markup's around it, the calendar's `[ 007 ]` precedent: they go with an emptied `when`, and the row is not drawn.
  No new field. **Scheme seat:** Scheme 5 (`#ED6D40`, ink `#111`, active teal) is in `SCHEMES_OF.Lattice` at every design already, and the frames bind nothing nested: the teal chip is `s.activeBg` and the ruling
  `s.tx`, so no `s.onScheme` is read.

- **footer (section 11, 2026-11-20): *new own-tree block* `LatticeFooter`, not Lime's footer (nor Grunge's / Editorial's / Pop's widenings of it).** Diffed against the `if (s.limeTree)` block in `Footer` and `notes/footer.md`, frames
  `1:1251` · `1:9880` · `1:10850`. The *inventory* is Lime's (a wordmark row, the closing statement, a seal, two link columns, a Book pill, a small-print row), and **no leaf is**. Lime's tree is a 743-wide left column beside a *full-height vertical
  rule* and the links, with a 68-tall small-print row on a hairline that bleeds the page; here the frame is a **12-column grid** (89.84 columns, 24 gaps: the left block on columns 1-7, column 8 air, the links on 9-12 = 431.375) whose left block carries
  a 1px *right border* at every width (it stays at the block's right edge when the narrow frames stack it, over the links), and whose small print is mono 11 on a rule *inside the content insets*, not a full-bleed band. Lime's mark is a globe, here
  a nine-dot 18 x 18 grid (4px squares, pitch 7) with the name in mono 12 and a 96 x 1 rule; Lime's links are Label/SM in two column `nav`s with the Book pill under the first, here a **2 x 4 grid read row by row** (the frame's DOM order,
  `About, Top Tracks / Media, Repertoire / Shows, Pricing / Enquiries, Reviews`, which is `FOOTER_LINKS`' own order, so a halved column would draw *About, Top Tracks, Media, Repertoire* down the left where the frame draws *About, Media, Shows,
  Enquiries*) of 40-tall rows 4 apart in mono 12, and the pill is `BracketButton`'s 130 x 44 bracket box 24 under the grid, not `BookPill`'s disc-and-label. Lime's statement is Bebas on `dispMd`, here `Archivo Lattice` at a raw 40 / 32 / 26 on a
  1.0 line, uppercase, -0.01em (the alias's +0.004em); the frame sets it as three hand-broken lines, and the seed's one typed break plus an 11em measure folds it the same way. The disc is the header's own raster (the 400 x 400 ink box
  at 70 / 10.5 off the block's right and top, so `LATTICE_ART.disc` as a mask, no new asset), drawn at 1440 and 768 and **not at 390** (the 390 master draws none). The small print is the orange `sem/text/3` (the form's `s.text3`). The glow is a
  percentage radial gradient on the root (60% x 55% at 85% / 40%, teal 14% to 0 at 70%; all three masters' `gradientTransform`s reduce to it). The section is a 480 floor at 1440 (padding 96 / 80 round a 302.19 content box; 56 / 40 at 768 and 390,
  where it is natural height, 612.19 and 586.19), so it is a block of its own. **No dot field is drawn** (the frames hold only the glow), so item 6's raster set does not exist and the root carries no `url()`. **`Footer` has no hooks** (grep of
  the whole function, 31319-31917, for `useState | useRef | useId | useEffect | useMemo | useCallback | useReducer`: none), so the block stands at the head of the function on `s.limeTree && s.lattice`, ahead of Lime's, and the seam (`extLink` / `navHref`
  per row, the pill on `bookTo`, dropped with its label) is restated in it. The twin prediction (*Lime's footer*) was half right an eighth time: the seam is Lime's, the picture is not. **Seams:** the testimonials above stand on `#ED6D40` and
  the footer on `#111` (Scheme 8), so the seam is a straight orange-into-black edge, drawn by neither section. **Scheme seat:** Scheme 8 at row 0 (and 1-3, copied); at `page === 2` `footerBand` reads the same row, so nothing moves. **No nested scheme:**
  every leaf is `s.tx` (`#F2F2F2`), `s.text3` (orange) or `s.activeBg` (the glow's teal).

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

### Settled in section 5 — the repertoire (2026-11-19)

**Verdict** (under *Seen at planning time*, written before the code): a new own-tree block, not Lime's *Two-column dense* and not its widenings. `LatticeRepertoire` stands in `Repertoire`'s
`if (s.limeTree)` **after the seam**; `active`, `filtered`, `shown`, `columns`, `labels` and `at` stay `Repertoire`'s and go over in `g` with the search, chip and pager closures. Notes:
`notes/repertoire.md`, *Lattice · layout 1*.

**The block.** Every number the frame's (desktop x 0.82 through `u`, 768 and 390 verbatim; raw sizes 95.04 / 59 / 38 heading at line 0.9, 12 mono hint, 11 mono chips, numbers and artists, 20
Archivo 400 titles, not the ramp). Head: the heading (`Archivo Lattice`, fitted to its widest word by `vm.titleWordEms`, now `bio` / `media` / `gallery` / `repertoire`) with a 420 x 52 search box
(3px, 1px ink, bottom-aligned at the right at 1440; 24 under the heading at 768; full width at 390). Chips 44 tall, square, 6 apart, the active one filled ink. Songs: 1px-ruled 3px boxes, min 66,
16 apart (28 at 390), the number in a 40 box (22), the title in the body face, the artist an orange mono label. Pager: arrows 44 (38 at 390) and pages 46, 6 apart, zero-padded numerals, left at every
width. `vm.pad`: 113.6 / 116.77 / 58 top and foot, the bio's content insets. The glow is the root's own `radial-gradient(ellipse 60% 55% at 15% 20%, text3 14%, 0 at 70%)`, which all three frames'
`gradientTransform`s reduce to (no `url(`).

**Calls for the user to confirm.**
1. **The `[ 004 ] ——— REPERTOIRE` eyebrow is not drawn** (call 1 holds: no field, no seeded label). The section is 42.4 shorter for it, and 78 shorter again while no pager is drawn.
2. **Twelve songs a page at every width, for Lattice alone.** The frames draw twelve at 768 (two columns of six) and at 390 (one of twelve), where every other template's narrow page is six
   (`perPage`, `columns`: a Lattice arm each). With the seeded twelve the section is one page, so **no pager is drawn** at any width (the frames show 240 songs and 20 pages); no seat is held for it.
   Past twelve it stands where the frame's does (proved with 240 songs).
3. **The pager keeps four numerals** (`01 02 03 … 20`) through an optional fourth argument of `pageWindow`; the other templates keep their three and five.
4. **768's *September* is not set at 18.** The frame squeezes that one title to 18 beside *Earth, Wind & Fire*; here every title is 20 and the artist wraps under itself instead of the title breaking
   inside a word. At 390 the frame's rows 3, 4, 6, 7, 10 and 12 put the number at 20 (desktop's value, leaked) where the rest put it at 12; the block takes 12 at every row, the title at 54 either way.
5. **The seeded twelfth song is *Valerie / Amy Winehouse*** (the data) where the frame draws *Crazy in Love / Beyoncé* twice.

**Fields and caps.** `FIELDS.repertoire` layout 1 reads `heading` and `songs` (`title`, `artist`; `length` is layout 3's, ledgered as `Lattice.0.repertoire.songs.length`); `sets` is layout 3's. Measured with
`limits.mjs repertoire --themes=5 --designs=0`: `heading` 12 (12 / 17 / 12), `songs.title` 17 (Pop's: the seeded *Don't Stop Me Now* is the floor at 768, where the probe reads 13), `songs.artist` 22 (44 / 22 / 22),
`songs.tags` count 3 (390's four chips end at 320 of 342). `--check`: 0 fail; `--seeds`: 0 over. Layouts 2-4 stay Pop's rows.

**Proof.** Geometry by `getBoundingClientRect` against the frame (root-relative): 1440 heading 113.6 x 70.13 (frame 85.5 x .82), search 344.4 x 42.63 right-aligned to the content edge, chips at 96.36 below the heading
(frame 32 x .82 under the head), rows 54.12 at 67.24 pitch, columns 540 at 559.7 apart (frame 659 at 683 x .82), number 17.4 in, title 62.3 past the border, artist 17.4 from the right; with 240 songs the pager row at 688.8, arrows
36.08, pages 37.72 at a 42.63 pitch. 768: head 53.09, search 420 x 52 under it, chips at 277.86, rows 66 at 82 pitch in two columns 345.89 wide at 26.11 and 396, section 946.6 (frame 1067 less the eyebrow and the pager's seat).
390: search 342 x 52 at 116.2, chips 200.2, rows 66 at 94 pitch from 276.2, title at 79, section 1434.2; with 240 songs the pager at 1408.2 spans 24 to 366 (38 + 6 + four 46s + gaps + 38). Probes at
`--theme Lattice --layout 1 --cat repertoire`: `inline-probe` (1440 and 768) PASS, 25 slots hit, 0 UNLEDGERED; `photo-probe` PASS filled, `--blank` and `--drop` (the section holds no photo slot); `focus-probe --prime` PASS (43 controls).
Live (`&live=1`, trusted clicks, 240 songs): page 02 and the next arrow step the list (S13, then S25) and fill the numeral; the Pubs chip filters (120 Songs, the pager `01 02 03 … 10`, back on page one); the
search narrows (`s4` gives six) and an empty result prints `No songs match that.`, all at 1440 and the chip and page clicks at 390. `page-check.mjs Lattice 0`: no errors, the menu's Repertoire link scrolls to `#repertoire`,
the chips respond. `digest.mjs` 0,1,2,3,4 against a HEAD worktree (:5185, which answered no `LatticeRepertoire`, the positive control) and the working tree (:5173), ports normalised: **0 differing files of 720**.

**For the map (section 6).** `EventsMap` has hooks (pager, pin / row pairing, zoom) too, so its block goes after its seam, with what the seam resolved handed over in one object. Raw sizes through a `u(v)` helper
(x 0.82 desktop, verbatim narrow). A section's own glow or dot field is the root's background, never a node. The frame's per-page counts can differ from the narrow `perPage` the seam computes: read each master's
row count first, as this section's twelve a page was, and gate any change on `s.lattice`. `pageWindow` takes a fourth `keepN` if the pager's numeral count differs. The map's `[ 005 ]` eyebrow and `12 MILE RADIUS` line need
the call-1 ruling the plan's table lists (the radius line is the one open ruling). Do not leave a text node that mixes a glyph and a label.

### Settled in section 6 — the events map (2026-11-19)

**Verdict** (under *Seen at planning time*, written before the code): a new own-tree block, not Lime's *Compact tile*. `LatticeMap` stands in `EventsMap`'s `if (s.limeTree)` **after the seam**; the
page, `shown`, `lit`, `onPick` and the pager's window stay `EventsMap`'s and go over in one object `g`. Notes: `notes/map.md`, *Lattice · layout 1*.

**The block.** Every number the frame's (desktop x 0.82 through `u`, 768 and 390 verbatim; raw sizes: 95.04 / 59 / 38 heading at line 0.9, 12 mono radius line, 11 mono labels, 30 / 27 / 25 display day,
18 body venue). Head: the heading (fitted to its widest word, `vm.titleWordEms` now also `map`) with the `120 MILE RADIUS` mono line at its foot on the right at 1440 and 768, under it at 390. Two 1px, 20-radius
cards 24 apart (stacked 24 apart narrow): the coverage card, a 470 art box over a ruled foot (a teal 8 square, `BASED IN MANCHESTER` display 22 / 20, the terms line in `s.text3`), and the panel, a
`UPCOMING GIGS` label and its count over ruled rows (date column 64: month mono, day display; venue over a mono `CITY · TIME` line; a `TICKETS` pill 26 tall), then a pager (arrows 44, pages 46, 6 apart).
`vm.pad`: 131.45 / 77 / 58 top and foot with the content insets (40.15 / 26.11 / 24), in `EncoreBuilder.jsx` after Pop's inset block. Heights are the boxes' (no import artefact in the head boxes: heading
box 70.13 / 53.09 / 34.2 = the frame's line at 0.9).

**The art** is the frame's raster used as a **mask** painted in `s.tx` (three lossless webps of the ink alone, 16 KB each, in `photos.js` `LATTICE_ART.map`), on an `aria-hidden` span inside the card;
the **glow is the art box's own `radial-gradient`**. A mask rather than a background image because the card inks it and it follows the theme; neither is a `url(` on a child that `limits.mjs` would count as a picture
(the mask is a CSS mask, the glow a gradient).

**Calls for the user to confirm.**
1. **The `[ 005 ] ——— SHOWS / COVERAGE` eyebrow is not drawn** (call 1 holds). The section is shorter for it, and for the pager's seat (call 5): 937 at 1440 (frame 983, less the eyebrow's 46), 1243 at 768 (frame 1351) and 1220 at 390 (frame 1454, whose long venues also wrap beside the pill).
2. **The picture is the dotted art, not the real map.** The frames draw no tiles; `RealMap` is not mounted for Lattice, so the Photon town lookup stays the panel's alone and `s.mapGeo` is unused here.
3. **`SOLD OUT` is not drawn** (no field; JP-045 forbids an affordance with no state behind it). The `TICKETS` pill shows only on a gig with a tickets link.
4. **The radius line reads `120 MILE RADIUS`** (`vm.mapRadius`, from the picker's miles); the frames' `12 MILE RADIUS` is a typo against their own `R = 120 MI`. The place under the marker is the header's town (`MANCHESTER, UK`; the frames say `MANCHESTER`).
5. **No pager over one page.** The frames draw `01 02 03` under five rows; the seeded five gigs are one page, so none is drawn and no seat is held. It stands as the frame's from six gigs.
6. **A lit row is drawn when live** (the pairing's look: ink under paper, bled 12 either side); the frames have none.
7. **The panel's rows are the frame's five at 68.5 pitch narrow**; at 390 the city · time line wraps under a long venue beside a tickets pill (the frame's own wrap).

**Fields and caps.** `FIELDS.map` layout 1 reads `place`, `miles`, `gigs`, `listLabel`, `heading`, `base`, `terms`; `kicker` and layout 2's travel fields stay layout 2's. Measured with
`limits.mjs map --themes=5 --designs=0`: `heading` 12, `base` 19, `terms` 39, `listLabel` 31, `gigs.venue` 26, `city` 20, `time` 15, `month` 8, `day` 3 (Pop's provisional rows failed at 768 / 390 for four of them).
`--check`: 0 fail; `--seeds`: 0 over. No `INLINE_OFF` row was needed.

**Proof.** Geometry by `getBoundingClientRect` against the frame (content-relative): 1440 heading 40.15 x 107.79 (70.13 tall), radius line right-aligned at 1139.85, cards 540.01 wide at 40.15 and 599.84, top 204.16, 456.62
tall (frame 470 + 87 x .82), rows 58.55 at 58.55 pitch, the panel's rows at 20.68 in. 768: heading 53.09, cards 715.78 wide, 556.2 and 423.86 tall, rows 68.49. 390: heading 34.2, radius line under it at 58.2, cards 342 wide,
554.2 and 421.36 tall, rows 67.99; no sideways scroll in the section. Probes at `--theme Lattice --layout 1 --cat map`: `inline-probe` (1440 and 768) PASS, 29 slots hit, 0 UNLEDGERED; `photo-probe` PASS filled, `--blank`
and `--drop`; `focus-probe --prime` PASS (41 controls). Live (`&live=1`): with twelve gigs the pager reads `01 02 03`, page 03 shows the twelfth, the arrows step and clamp, a click on a row lights it and a second clears it,
at 1440 and 390; `page-check.mjs Lattice 0`: no errors, the menu's link scrolls to `#map`, the map's controls respond. `digest.mjs` 0,1,2,3,4 against a HEAD worktree (:5185, which answered no `LatticeMap`, the positive
control) and the working tree (:5173), ports normalised: **0 differing files of 720**.

**For the pricing (section 7).** `Pricing` has hooks (chip filter, the featured pick) too, so its block goes after its seam with the resolved values handed over in one object; raw sizes through `u(v)`; a glow or
dot field is the root's background (or a mask on a span inside a card, as this section's art), never a child `url()`. Read each master's tier count and chip count first (the frame's pager or tier count can differ
from the seam's), gate any change to shared counts on `s.lattice`, measure `FIELDS.pricing` caps with `limits.mjs pricing --themes=5 --designs=0` (Pop's rows are provisional), add `INLINE_OFF` rows for fields not
printed, and keep a glyph in its own span. The pricing's `[ 006 ]` eyebrow needs the same call-1 ruling; frames' status words (`Most popular`) are drawn only where a field exists (JP-045, JP-071).

### Settled in section 7 — the pricing (2026-11-19)

**Verdict** (under *Seen at planning time*, written before the code): a new own-tree block, not Lime's pricing block and not its widenings. `LatticePricing` stands in `Pricing`'s `if (s.limeTree)` **after the
seam**; `shown`, `active` and `pressChip` stay `Pricing`'s and go over in `g`. Notes: `notes/pricing.md`, *Lattice · layout 1*. **Scheme seat:** no `SCHEMES_OF.Lattice` row was added: the section already stands
on Scheme 8 (`#111`, ink `#F2F2F2`, active teal) and the three cards read `s.onScheme[3]` (dark), `[5]` (orange) and `[4]` (teal), which `THEMES[5]` already carried and its comment already assigned to the pricing cards.

**The block.** Every number the frame's (desktop x 0.82 through `u`, 768 and 390 verbatim; raw sizes 60 / 48 / 40 price and heading at line 0.9 and 1, 30 / 27 / 25 name, 12 mono, 15 / 16 Archivo; not the ramp).
Head: the heading (`Archivo Lattice`, fitted to its measure by `vm.titleWordEms`, now also `pricing`: 732.22 at 1440, 585.77 at 768, the column at 390) and the chip row (a 1px ring, 4 in, 40-tall tabs 4 apart, 50 tall)
at its right edge at 1440 and 24 under it narrow. Then the cards, 40 under the head: 24 apart, three columns at 1440, two at 768 (the last card of an odd count spanning both: the frame's third card at 715.77), one at 390; each a
20-radius card at least 520 tall on its scheme, with a `0 0 36 @ 30%` halo in its own colour; inside it, 22 apart: a mono `[ 0N ]` and the unit on one row, the name, the price, the blurb, the features (a `+` and Archivo 15 on 1px
rules, 35.5 a row), and the full-width 44-tall Book Now bar pinned to the foot. Then the small print in `s.text3` (orange), 40 under the cards. `vm.pad`: 78.72 / 77 / 58 top and foot with the content insets (40.15 / 26.11 / 24),
in `EncoreBuilder.jsx` after Pop's inset block. The glow is the root's own `radial-gradient(ellipse 60% 55% at 50% 75%, glow 14%, 0 at 70%)`, which all three frames' `gradientTransform`s reduce to: **no `url()` anywhere
in the block** (the halo is a `boxShadow`, the glow a gradient on the root). The head boxes carry no import artefact here: heights are the render's, the frame's boxes agree (heading 180 / 144 / 160 = 3 / 3 / 4 lines).

**Calls for the user to confirm.**
1. **No chip is lit at rest.** The frames light *Solo* over all three cards; JP-089 stands (a lit chip that filters nothing misleads on the published page). A press lights a tab teal and filters; a press on the lit tab clears it.
2. **The `[ 006 ] ——— PRICING` eyebrow is not drawn** (call 1 holds: no field). The section is 812.2 / 1529.2 / 2064.4 tall drawn against the frames' 846.2 (1032 x 0.82) / 1571.6 / 2106.8: the eyebrow's 42.4 shorter, 34.8 on desktop.
3. **The unit prints as stored, `/EVENT`,** where the frame prints `/ EVENT`. Printing `/ ` and `vm.tierKind` is layout 4's route and would need a `Lattice.0.pricing.unit` ledger row; the stored text keeps the slot a hit.
4. **Seats follow the package, not the rendered position.** Package *n* is dark / orange / teal by `n % 3` and numbered `[ 0(n+1) ]`; the filter hides cards without recolouring or renumbering the rest (Retro's whole-list rule; Lime's and Pop's
   seats move with the rendered index). A fourth package starts the colours again.
5. **The price is one run in the display face.** The frame has only `£450`-shaped prices; a range's second half sets at the numeral's size and wraps at its spaces (cap 9: `£475 — £1,450` reads `£475 —…`), where layouts 1-3
   elsewhere set a small tail. A digit-less long price wraps in its seat (`overflowWrap: anywhere`).
6. **`[ 0N ]` is derived, not a label** (the package's place, as the media's row numbers); it has no field. It is not `[ 006 ]`.
7. **The cards are 520 tall at least at every width,** so a package with two features stands over empty ground (the frame's dark card does the same, its list 4 rows under a 5-row neighbour).
8. **`tiers.price.num` is 7** (measured 9 / 10 / 12 at layout 1, held to Pop's provisional 7: one scalar per template, the tightest layout's, and layouts 2-4 are unmeasured).
9. **The Book bar is a plain rectangle,** as drawn (no four corner marks): it is not `BracketButton`. It links `#<form | calendar>` live and is a picture on the canvas; an emptied `rowCta` drops it.

**Fields and caps.** `FIELDS.pricing` layout 1 reads `heading`, `tiers`, `unit`, `rowCta` and `sub`. **No `in` row needed naming Lattice** (every pricing `in` is an array, not a template-keyed object); the `chars` / `count` / `num`
objects were the ones that named Pop and fell back to it, so each now carries an explicit `Lattice` row (layout 1 measured, layouts 2-4 Pop's, provisional). `limits.mjs pricing --themes=5 --designs=0`: `heading` 32
measured, **42** held (the seed's own four lines at 390), `tiers.name` 15 measured, **16** held, `tiers.price` 9, `tiers.price.num` 7, `tiers.tags` item 26 (measured 42) and count 3, `tiers.feats` item 24 (measured 41) and count 15,
`tiers.blurb` 160 (open to 400), `unit` 29, `rowCta` 34, `sub` 85. `--check`: 0 fail (`heading` and `name` read as `floor` at one width each); `--seeds`: 0 over. **`INLINE_OFF`: no Lattice pricing row,** because the block prints every field the layout reads.

**Proof.** Geometry by `getBoundingClientRect` against the frame (content-relative, in frame px; the eyebrow's 42.38 taken off every y): 1440 heading 732.2 x 180 (frame 732.22 x 180), chip box 1135.9 / 130 x 205.2 x 50 (frame 1136.95 / 130.01 x 205.125 x 50), cards 431 x 524.2 at 0 / 455 / 910.1 and 220 (frame 431.34 x 524.27 at 0 / 455.36 / 910.72 and 220.01); inside card 1: row 28, name 64.4, price 116.4, blurb 192.4, list 233.58, bar 452.22 (frame 28, 64.38, 116.38, 192.38, 233.56, 452.25; the 1px rule is not scaled, so the five rules of the tallest card first ran 1 over and the row padding takes it back), small print 784.2 (784.28); section 811.3 canvas px; 768 heading 585.8 x 144, chips 168, cards 345.9 x 520 at 0 / 369.9 and 258, the third 715.8 wide at 802, row 24 / 60.4 / 109.4 / 174.59 / 234.98 / bar 452 (frame 24 / 60.38 / 109.38 / 174.56 / 235.56 /
452.61); 390 heading 342 x 160, chips 184, cards 342 x 520 at 274 / 818 / 1362, small print 1922 x 26.4 (frame 1922 x 26.4), no sideways overflow. Probes at `--theme Lattice --layout 1 --cat pricing`: `inline-probe` (1440 and 768) PASS,
30 slots hit, 0 UNLEDGERED; `photo-probe` PASS filled, `--blank` and `--drop` (the section holds no photo slot); `focus-probe --prime` PASS (36 controls). Live (`&live=1`): Solo lights teal and shows two cards, a second press clears to three, Band
shows two (1440); Trio shows two and clears (390); both bars link `#form`; with one package the card spans the 768 grid and no chip row is drawn; with four, a `£TBC`, a 40-letter name, a digit-less long price and a range all clamp inside
their cards. `page-check.mjs Lattice 0`: no errors, the chips respond (`Solo / Trio / Band: true`), `overflow390` 0. `digest.mjs` 0,1,2,3,4 against a HEAD worktree (:5185, which answered no `LatticePricing`, the positive control) and the
working tree (:5173), ports and `?t=` normalised: **0 differing files of 720**. `npm run build` passes.

**For the calendar (section 8).** `Calendar` has hooks (month, day pick, the layout-4 wizard) too, so its block goes after its seam, with what the seam resolved handed over in one object; raw sizes through `u(v)` (x 0.82
desktop, verbatim narrow). The frames (`1:1039` · `1:9670` · `1:10640`, 1440 x 781 / 768 x 564 / 390 x 894) draw one bordered card, a month grid at the left, the `[ 007 ] ——— AVAILABILITY` eyebrow (call 1: drawn only where a field
exists; `FIELDS.calendar` carries `heading`, `prompt`, `dateLabel`, `availLabel` and `slotCta` but no field for an `AVAILABILITY` eyebrow: read the frames first, and draw it only if one of those is that word's seat) and a torus art at the right (an art raster, used as a **mask** inked in `s.tx` on an `aria-hidden` span, as the map's and the bio's), and an enquiry foot with Continue: the
twin prediction is Lime's *Scheduler*, which will be half right (the seam). The calendar stands on **Scheme 2** (`#F2F2F2`, in `SCHEMES_OF.Lattice` already). Read each master's day-grid row count, weekday header and legend first (the frame's
month may not be the seam's), whether the frame draws a booked or past day, and the counts of slots; gate any change to shared counts on `s.lattice`. `vm.calWizard`, `vm.calMailto` and `vm.calCheck` are closures (layout 4); layout 1
reads `vm.calMailto`'s absence, so check `notes/calendar.md` before touching the foot. Glyphs (`←`, `→`, `[ ]`) go in their own spans so the inline probe can match the copy. A decorative `url()` or glow is the root's own background or a mask on an
`aria-hidden` span, never a child node (`limits.mjs` counts a `url(` element as a picture). No clickable copy's centre may stand inside the builder's section toolbar (right 8, top 8, 99 x 31) at 1440.

### Settled in section 8 — the calendar (2026-11-19)

**Verdict** (under *Seen at planning time*, written before the code): a new own-tree block, not Lime's *Scheduler* and not its widenings. `LatticeCalendar` stands in `Calendar`'s `if (s.v0)` **after the seam**,
dispatched on `s.limeTree && s.lattice` ahead of the Lime block; `month`, `cur`, `line`, `step` and a `pick(c)` handler stay `Calendar`'s and go over in `g`. Notes: `notes/calendar.md`, *Lattice · layout 1*.
**Scheme seat:** Scheme 2 (`#F2F2F2`, in `SCHEMES_OF.Lattice` already) and no other: the picked day is the frame's ink fill (not Scheme 2's orange `activeBg`), and the art's glow reads Scheme 4's teal through
`s.onScheme[4]`.

**The block.** Every number the frame's (desktop x 0.82 through `u`, 768 and 390 verbatim; raw sizes 40 / 32 / 26 month, 12 / 11 mono, not the ramp). One 1px, 20-radius card: a 1fr : 1fr grid (stacked at 390, no divider)
over a foot. Left: a 44-square head row (3px arrow boxes round Arial `←` / `→`, the month in `Archivo Lattice`, fitted between them by `month.ems`), a 30-tall weekday row, and the grid (gap 6, cells 65.94 / 31.75 / 30.97
tall, a two-digit mono numeral, the lit day filled ink). Right: the `[ 007 ] --- AVAILABILITY` eyebrow, the torus art at a fixed 377.69 / 198.75 / 252, the town and a short rule. Foot: the enquiry line and a Continue bar.
`vm.pad` 78.72 / 77 / 58 top and foot with the content insets (40.15 / 26.11 / 24), in `EncoreBuilder.jsx` after the pricing arm. **The art is a mask** (three lossless webps of the frames' ink, 39 / 25 / 31 KB, `photos.js`
`LATTICE_ART.calendar`) painted in `s.tx` on an `aria-hidden` span; **the glow is the art box's own `radial-gradient`** (`50% x 50%`, teal 18% to 0 at 70%): neither is a `url()` background on a node. **Read:** the frames
draw five rows (June 2025), no booked or past day, and nothing the seam's counts disagree with, so no shared count changed. The head boxes carry no import artefact (the frames' heights are the render's: the section is
640.7 / 563.8 / 893.8 drawn against 640.4 / 564 / 894); the eyebrow is drawn, so unlike sections 3-7 the section is not shorter for a removal.

**Calls for the user to confirm.**
1. **The `[ 007 ] --- AVAILABILITY` eyebrow is drawn, because `heading` is that word's seat** (seeded *Availability*, uncased, dropped when emptied; call 1's rule). `sectionVm`'s "Book Now" seed for the family's layout 1 is gated
   `&& !vm.lattice` so the canvas and the panel agree (`fieldSeed` already read `limeTreeTheme`, which excludes Lattice). **The `[ 007 ]` is a literal** and does not follow the section's place on the page; the rule and the
   numeral go with an emptied heading, the seat is kept.
2. **Continue is `cta`, and it reverses JP-088 for Lattice.** The frame draws a button where JP-088 removed the family's pill (its reason, *no frame draws it*, no longer holds); `cta` is seeded `Continue` for Lattice's layout 1
   (`CAL_CTA_LATTICE`, `vm.calCta` and `fieldSeed`; layout 4's wizard keeps `CAL_SEND_4`). Live it is an `<a href="#form">` (`calBookTo`) **whether or not a day is cued** (Retro's pill rule), a picture on the canvas, and an
   emptied label drops it. The foot's line is plain text, never the link. A Continue dimmed until a day is picked would be the other reading.
3. **A booked or past day is the family's**: .38, no strike, no handler (the frames draw none).
4. **The 390 master's right border on the grid half is not drawn** (the desktop divider leaking); the stacked halves carry no rule between them.
5. **The art box is pinned to the five-row height**, so a six-row month leaves 72 of empty ground under the torus and a four-row one leaves the grid half at the right half's height (the 2026-11-16 tester report's rule).
6. **`cta` is capped at 12**, measured 29 (box): the bar stays under a third of the 390 foot and the enquiry line keeps its room. The user's to overrule.
7. **`image` no longer reaches Lattice's layout 1** (`in: { Lattice: [3], '*': [0, 3] }`): the polaroid seat holds art, not a photograph, so the panel offers no Photo; `heading` now reads Lattice's layout 1 and `cta` is
   explicitly Lattice `[0, 3]`.
8. **The numerals are zero-padded in the block** (`01`), as the frame sets them; display only, the seam's `d` is the number.

**Fields and caps.** `FIELDS.calendar` layout 1 reads `heading`, `open`, `booked`, `time`, `prompt` and `cta` (`reach.mjs 5` agrees; `image` is layout 4's alone) and the header's town through `IDENTITY_READS.location.calendar`
(now `Lattice: [0, 3]`). Measured with `limits.mjs calendar --themes=5 --designs=0`: `heading` **25** (65 / 27 / 25), `time` **16** (104 / 30 / 16), `prompt` **33** (137 / 63 / 33), `IDENTITY_CHARS.calendar.location`
**19** (50 / 19 / 19), `cta` 29 held to **12**. Each has an explicit `Lattice` row (layouts 2-4 copied from Pop's); `slotCta`, `availLabel`, `types`, `dateLabel` and `slots` `kind` / `price` are layouts 2 and 4's and stay
Pop's / `'*'` (unmeasured, owed to those passes). `--check`: 0 fail; `--seeds`: 0 over. **`INLINE_OFF`**: `Lattice.0.calendar.prompt` only (it shows while no day is cued, and the canvas opens with one cued).

**Proof.** Geometry by `getBoundingClientRect` against the frame (root-relative, frame px x .82 at 1440): card 40.14 / 78.72 (frame 40.15 / 78.72), arrows 36.08 square at 64.09 / 102.67 (63.93 / 102.5), month 198.05 x 32.8
(197.88 x 32.8), cell 01 67.5 x 54.06 at 64.09 / 181.36 (63.93 / 181.22 x 67.58 x 54.07), cell 12 at 353.72 / 240.33 (353.99 / 240.21), eyebrow 770.41 (771.08), art 590 / 132.17 x 548.86 x 309.69, town 668.34 / 460.61,
Continue 106.55 x 36.08; every element within 0.8 px at 1440 (the canvas is 1180 where the frame x .82 is 1180.8), within 0.1 at 768 (card 26.11 / 77 x 715.78 x 409.75, art 384 / 142 x 356.89 x 198.75, Continue 589.92 / 423.75 x 129.97 x 44)
and within 0.15 at 390 (the month 0.14 wide; art 25 / 437.84 x 340 x 252, Continue 219.03 / 772.84, the line wraps to the frame's three). Probes at `--theme Lattice --layout 1 --cat calendar`: `inline-probe` (1440 and 768)
PASS, 3 slots hit, 0 UNLEDGERED; `photo-probe` PASS filled, `--blank` and `--drop` (the section holds no photo slot); `focus-probe --prime` PASS (6 controls). Live (`&live=1`, trusted clicks, `&today=2025-06-01`, 1440 and 390): next
and previous arrows page (June to July and back), the first arrow is dim and handlerless at the start and the last at the end (May 2027), a day picks (the foot reads *Enquiry for Sunday, July 20 at 9:00pm*) and a second click
unlights it, Continue is `<a href="#form">`; `page-check.mjs Lattice 0`: no errors, the menu's Availability link scrolls to `#calendar`, the calendar controls respond and Continue scrolls to `#form`, `overflow390` 0. Stress:
SEPTEMBER 2025 at 390 fits between its arrows (shrunk a little), a six-row month (August 2025) leaves the torus alone, booked days dim, a 33-character heading clamps in its row. `digest.mjs` 0,1,2,3,4 against a HEAD worktree (:5185, which answered no `LatticeCalendar`, the positive control) and the working tree (:5173), ports and `?t=` normalised: **0 differing files of 720**. `npm run build` passes; the three art webps add 94 KB raw to `src/builder/photos/` (the standalone build was not rebuilt: the root `index.html` is the end-of-pass sweep's).

**For the form (section 9).** `EnquiryForm` has hooks (the typed boxes, the chip pick, the errors, the sent state) too, so its block goes after its seam with what the seam resolved handed over in one object `g`; raw
sizes through `u(v)` (x 0.82 desktop, verbatim narrow). The frames (`1:1147` · `1:9778` · `1:10748`, 1440 x 689 / 768 x 990 / 390 x 1230) draw, on a dark ground (Scheme 8), one bordered card: a context panel (avatar, a title and
three promises) and the form (name, email, date, guests, event-type chips, message, Book Now); the twin prediction is Lime's *Split context + form*, which will be half right (the seam). `FIELDS.form` is the section's
(`formBtnSeed` seeds `Book Now` for Lattice already: `limeTreeTheme` excludes it, so `FORM_BTN_1` "Enquire" is not Lattice's; the frame says Book Now); `chars` / `in` objects that name Pop fall back to it, so give Lattice its own
explicit rows and measure with `limits.mjs form --themes=5 --designs=0`. **The form is `<a href="mailto:">`, never a `<form>`** (there is no `<form>` element in the section and there must never be one: it would post to
`<base href>`); `vm.formMailto` and `vm.formCheck` are closures over the visitor's keystrokes, and the chip starts at 0 (do not "fix" it to -1): read `notes/form.md` first. Each frame's eyebrow (`[ 008 ] --- ...`) is drawn
only where a seeded, uncased, drop-when-emptied field exists (call 1, JP-071: `FIELDS.form` has `typeLabel` and `messageLabel` among its labels; read which, if any, is that word's seat, and say so). The avatar is a photograph
(`SEEDS.Lattice` seats the form on `lattice-alt`); a decorative `url()` or glow is the root's own background or a mask / gradient on an `aria-hidden` span, never a child node. Glyphs go in their own spans so the inline probe can
match the copy; no clickable copy's centre may stand inside the builder's section toolbar (right 8, top 8, 99 x 31) at 1440. The seams are straight edges (the page `above` / `below` read nothing for Lattice), and the
calendar above it is on Scheme 2 (`#F2F2F2`) while the form stands on Scheme 8 (`#111`).

### Settled in section 9 — the enquiry form (2026-11-19)

**Verdict** (under *Seen at planning time*, written before the code): a new own-tree block, not Lime's *Split context + form* and not its widenings. `LatticeForm` stands in `EnquiryForm` **after the seam**, dispatched
on `s.v0 && s.limeTree && s.lattice` ahead of Lime's block; `at`, `setAt`, `msg`, `setMessage`, `ti`, `setType`, `showTypes`, `errs`, `msgBad`, `sent`, `setSent`, `Pill`, `pillLink`, `onSubmit`, `cp` and `pid` stay `EnquiryForm`'s and
go over in `g`. Notes: `notes/form.md`, *Lattice — layout 1*. **Scheme seat:** Scheme 8 (`#111`, in `SCHEMES_OF.Lattice` already) and **no other**: the frame's lit chip and bar bind the page's `sem/bg` over `#111` text, which is
`s.tx` over `s.bg`, so `s.onScheme` is not read. `formBtnSeed` seeds *Book Now* for Lattice (`limeTreeTheme` excludes it) and the frame agrees. **No eyebrow:** none of the three masters draws a `[ 00N ]` line, so
there was nothing for `typeLabel` / `messageLabel` (which seat only *EVENT TYPE* and *MESSAGE*) to be the seat of; the section is not shorter for a removal.

**The block.** Every number the frame's (desktop x 0.82 through `u`, 768 and 390 verbatim; raw sizes 40 / 32 / 26 head, 12 / 11 mono, 16 Archivo, not the ramp). One 1px, 20-radius card: at 1440 a fixed 485 context panel (`s.box1`) beside
an *unfilled* form half (the root's glow shows through), stacked at 768 and 390. Context: 32 / (27 24) / (22 16) padding, 28 between blocks; a 44 square avatar (radius 3) beside the name (mono 12) over the role line (mono 11, orange);
the head (`Archivo Lattice`, line 1, the frame's 419 measure at 1440, fitted by `vm.titleWordEms`, which now also reads `form`); a ruled list of numbered promises (orange `01 / 02 / 03`, rows 14 / 14 with a 1px rule). Form: 48-tall 3px
boxes in a 1px full-ink ring under orange mono labels, paired two to a row (18 apart; stacked 28 apart at 390), a chip row (a 26-tall legend over 44-tall square chips, 6 apart, the lit one filled ink), an 81-tall message box and a
48-tall full-width square bar. `vm.pad`: 78.72 / 77 / 58 top and foot with the content insets, in `EncoreBuilder.jsx` after the calendar arm. **The glow is the root's own** `radial-gradient(ellipse 60% 55% at 20% 50%, text3 14%, 0 at
70%)`, which all three frames' `gradientTransform`s reduce to: **no `url()` anywhere in the block** (limits.mjs counts none). The head boxes carry **one import artefact**: the 1440 master's submit is 50 tall by its content but the card
clips it at 48 (the card is 496.55 = 2 + 494.55), so the height follows the *render* (48 at every width); the fieldset box is 8 short of its content at 768 and 390 (below).

**Calls for the user to confirm.**
1. **The placeholders print as seeded** (`dd / mm / yyyy`, `approx.`) where the frames type `DD / MM / YYYY` and `Approx.`: a case difference. A Lattice seed would fork `FORM_FIELDS` and `EditPanel`'s `formFieldsVal`; not done.
2. **The role line prints the header's kicker** (`DJ · Live Act`) where the frames type `DJ · LIVE BAND`: the artist's copy (`IDENTITY_READS.kicker.form` read `[0, 1]` already).
3. **The list's rules and the avatar row stop at 382.688 (x .82) at 1440,** as the render draws them, and the head sets in 419, although the panel's content box is 421 (the masters' own boxes, from a narrower layout);
   stacked they take the column.
4. **The message label stands 10 and 20 under the chips at 768 and 390** (the frames' fieldset box is 8 short of its content there; 16 at 1440). The 768 row looks tight; it is the render.
5. **The chip starts at 0** (notes/form.md): the frame draws *Wedding* lit, so rule and frame agree and nothing is overridden. The lit chip is a picture on the canvas; live, a press moves it.
6. **A refused box is 2px of the label's orange** (the ring plus a 1px inset; no palette has a red, and the idle ring is already full ink), and the prompt line prints in the same orange.
7. **`button` is capped at 35** (measured), where the shared 15 is Retro's and Lime's pill: the bar has nothing beside it to crowd.
8. **The card is 1099.7 wide on the 1180 canvas** where the frame's x .82 is 1102.1 (the 1440 master's card stands 48.96 / 46.96 off its sides; the canvas's content insets are 40.15 each), so the 1440 form half is 2.4 narrower.
9. **The sent state swaps the form half only**; the card then shrinks to the context panel's height (341 at 1440).

**Fields and caps.** `FIELDS.form` layout 1 reads `heading`, `promises`, `fields` (`label`, `placeholder`), `types`, `typeLabel`, `message`, `messageLabel`, `button`, `email`, `image` and the header's kicker through
`IDENTITY_READS.kicker.form` (`reach.mjs 5` agrees: `button` / `messageLabel` layouts 1 and 4, `promises` 1 and 2, `typeLabel` 1, `who.kicker` 1 and 2); every `FIELDS.form` `in` row is an array, so no row names a template. Measured with
`limits.mjs form --themes=5 --designs=0`: `heading` **37** (37 / 56 / 44), `fields.label` **40** (50 / 42 / 40), `fields.placeholder` **36** (47 / 39 / 36), `typeLabel` **40** and `messageLabel` **40** (104 / 87 / 40), `message` **39** (110 / 92 / 39),
`button` **35** (93 / 78 / 35), `promises` chars **33** (42 / 76 / 33) with count 9 held (16 measured, open), `types` count **8** (10 / 9 / 8), `IDENTITY_CHARS.form.title` **59** (84 / 142 / 59) and `kicker` **33** (48 / 80 / 33). Each has an
explicit `Lattice` row (layouts 2-4 Pop's, unmeasured); `fields` has no item-chars row, and `types` measured 38 (194 / 85 / 38 at 390) a chip but is held to the shared array's 15, which no chip of the seeds approaches. **Still on Pop's numbers, unmeasured** (no Lattice layout 2-4 form yet): `sub` and `steps` (layout 4), `para` (layout 3), the layout 2-4 slots of `heading`, `fields.label`, `fields.placeholder`, `message`, `messageLabel` and `button`, and `promises` at layout 2; each is an explicit `Lattice` row copied from Pop's where the spec names templates, so a later pass re-measures it in place. `--check`: 0 fail; `--seeds`: 0 over. **No `INLINE_OFF` and no `PHOTO_OFF` row:** the block prints every field the layout reads,
and the form's `photo` is layout 2's.

**Proof.** Geometry by `getBoundingClientRect` against the frame (shell-inner-relative, frame px x .82 at 1440): 1440 avatar 26.2 x 36.1 (frame 26.2 x 36.1), name 72.1 / 31.3, head 85.3 x 98.4 (three lines; frame 85.3 x 98.4), list 206.6 x 313.8
(frame 206.6 x 313.8), first box 423.9 / 43.6 x 39.4, event-date box 113.4 (113.5), chips 193.8, message 260.3 x 66.4 (260.4), bar 339.8 x 39.4 (339.9), card 405.4 tall (frame 405.5), panel 397.7 wide (frame 397.7); 768 context 349.2 and card 833.7
tall (frame 349.17 / 833.72), avatar 24 / 27, head 99 x 64, list 191 x 131.2, boxes 24 and 365.9 x 323.9, chips 584.5 at 83.1 / 68.0 wide, message 659.7 x 81, bar 758.7; 390 context 353.2, card 1112.1 (frame 1112.11), head 94 x 78, boxes 22 + 97.19 apart, chips
797.9 and the wrap 847.9, message 933.1, bar 1042.1. `geo.mjs` (all three widths): worst delta **0.69**, the 1440 list's height (three 1px rules that do not scale, +0.18 each, 108.3 against 107.6); the 1440 chips run +0.35 wide each (the 1px border), which drifts the third chip's left to +0.66; everything else is within 0.15 px, and 768 and 390 are within 0.02. Probes at `--theme Lattice --layout 1 --cat form`:
`inline-probe` (1440 and 768) PASS, 21 slots hit, 0 UNLEDGERED (6 unhit: printed copy with no slot); `photo-probe` PASS filled, `--blank` and `--drop`; `focus-probe --prime` PASS (27 controls). Live (`&live=1&today=2025-06-01`,
real keystrokes and clicks, 1440 and 390): idle the bar is `<a role="button">` with no href; a click refuses, marks Name and Email in orange, focuses Name and prints *This box is required.*; typing clears each box's mark; a valid form composes
`mailto:` with the picked chip in the subject (`Pub enquiry`) and the typed answers in the body; the click sets the sent state (*Check your mail app*, the address in plain text), and *Write another* keeps what was typed. `page-check.mjs Lattice 0`:
no errors, 5 boxes, the refusal rings and the mailto, `overflow390` 0, the calendar-to-form and form-to-testimonials seams straight. `digest.mjs` 0,1,2,3,4 against a HEAD worktree (:5185, which answered no `LatticeForm`, the positive control) and the
working tree (:5173), ports and `?t=` normalised: **0 differing files of 720**; at theme 5 only the three layout-1 form renders differ. Empty and count states at 1440 and 390 (`&cj=`, `&noimage=1`: 3, 5 and 0 fields, no types, no promises, 9 promises, no heading, no email, a long heading, no image): no box leaves the card and nothing scrolls sideways; no types drops the chip row and the subject reads `Enquiry`; no email leaves the bar an inert `<span>` with no `role`; no image draws the initials. The form-to-testimonials seam is a straight edge (`#111` into the orange). `npm run build` passes (the standalone build was not rebuilt: the root `index.html` is the end-of-pass sweep's).

**For the testimonials (section 10).** `Testimonials` has hooks (`cur`, the carousel's page) too, so its block goes after its seam, with what the seam resolved handed over in one object `g`; raw sizes through `u(v)` (x 0.82 desktop, verbatim narrow). The frames
(`1:1222` · `1:9851` · `1:10821`, all 730 tall at 1440 / 768 / 390) draw, on **Scheme 5's orange** (`#ED6D40`, in `SCHEMES_OF.Lattice` already, check the seat), a dot field, one bordered quote card with two square arrow buttons, a byline and two tag chips; the twin
prediction is Lime's *Stacked tag card*, which will be half right (the seam). The frame's `[ 009 ] --- REVIEWED 6 DAYS AGO` line needs the call-1 ruling the plan's table lists: `FIELDS.testimonials` has no `kicker` (removed 2026-11-12, `notes/testimonials.md`) and
the card's `when` date is the quote's own field, so read the frames first and draw the line only where a seeded, uncased, drop-when-emptied field is that text's seat (JP-045, JP-071). **The arrows are `cur`'s** and are not drawn at one review (the pager's rule); they
wrap at both ends; check `notes/testimonials.md` before touching them. The dot field is the testimonials' own set (open question 5): the bio's recipe (`latticeBioDots(dev)` in `data.js`: connected components on the frames' 2x rasters, four buckets by mass, held as
the **root's own `background-image`**, never a node) is the model, and `limits.mjs` counts any element with a `url()` background as a picture. A card halo is a `boxShadow` and a glow a percentage radial gradient on the root, as the media's, pricing's and this form's. Measure
`limits.mjs testimonials --themes=5 --designs=0` (the shared rows fall back to Pop's where an object names neither Lattice nor `'*'`: give Lattice explicit ones), add `INLINE_OFF` rows for fields the block does not print, and keep a glyph in its own span. The 1440 seam below
the form is a straight edge into this orange; `titleWordEms`'s Lattice list is `bio` / `media` / `gallery` / `repertoire` / `map` / `pricing` / `form`, where a fitted head joins. A frame choice that conflicts with the builder's rules is decided once and recorded as a call to confirm.

### Settled in section 10 — the testimonials (2026-11-19)

**Verdict** (under *Seen at planning time*, written before the code): a new own-tree block, not Lime's *Stacked tag card* and not its widenings. `LatticeTestimonials` stands in `Testimonials`'s `if (s.v0)`
**after the seam**, dispatched on `s.limeTree && s.lattice` ahead of Lime's block; `q`, `paging` and `step` go over in `g` (`cur`, `n`, `at` and `go` stay `Testimonials`'s). Notes: `notes/testimonials.md`,
*Lattice — layout 1*. **Scheme seat:** Scheme 5 (`#ED6D40`, ink `#111`, active teal), in `SCHEMES_OF.Lattice` at every design already, and **no nested scheme**: the teal chip is `s.activeBg`, every ruling `s.tx`.
**The `[ 009 ] --- REVIEWED 6 DAYS AGO` ruling:** `quotes.when` is the seat of the words (its seed is that text byte for byte); `[ 009 ]` and the 40-wide rule are the markup's around it and go with an emptied `when`.

**The block.** Every number the frame's (desktop x 0.82 through `u`, 768 and 390 verbatim; raw sizes 43.2 / 35 / 29 quote, 12 / 11 mono, not the ramp). One 1px, 20-radius card on `s.bg` (opaque), a `0 0 90`
white 22% halo (`boxShadow`; the Figure's effect read off the node: radius 90, spread 0, and the 390 raster's falloff above the card matches CSS blur 90, not the export's 45), padding 36 / 27 x 31 / 18 x 25, 24 between rows: the eyebrow row (`[ 009 ]`, a 40 rule, `when`; 16 apart), the quote (`Archivo Lattice` 500, line 1, +0.004em, uppercase, fitted to its widest word
by `vm.quotes[].wordEms`, now Lattice's too), and a ruled caption (the byline's two mono 12 labels, then the two chips: 26 tall, a 5px square marker, `who` filled teal and `role` ruled). Arrows: 44 square 3px boxes
round an Arial 13.333 glyph, in a grid of 44 | card | 44 at 1440 (the card a fixed 720, centred) and 768 (the card fills, 24 off each); a centred row of two, 12 apart and 20 under the card, at 390. At one review the arrows
are not drawn and their tracks are held, so the card keeps its width. **The dot field is the root's own `background-image`, not a node** (`vm.testiDots` from `latticeTestiDots(dev)` in `data.js`: the bio's recipe on the
frames' 730-tall rasters, 558 / 842 / 465 dots in four buckets, the container's .7 folded into `o`, `r` x1.036 calibrated: ink mass .995 / 1.018 / .996 and 16-px block correlation .992 / .990 / .992 against the
rasters at 2x, measured on the SVG alone); `repeat-y` from the middle, so a taller section keeps dots (a root wider than the frame scales the tile up to cover, seen once at a forced 1500; the builder never draws one). `vm.pad`: 78.72 / 77 / 58 top and foot (chosen, the siblings') with the content insets, and the block's `minHeight`
holds the frame's 730 band and centres the card in it: the section is 598.6 / 730 / 730 at the seed and does not move while the reviews page. No glow on the root (the halo is the card's).
**`titleWordEms`'s Lattice list does not gain `testimonials`:** layout 1 prints no heading (the quote is fitted per review through `wordEms`).

**Calls for the user to confirm.**
1. **`[ 009 ]` is a literal,** drawn only with a `when`; it does not count sections.
2. **The seeded quotes print straight `"`,** where the frame sets `“ ”`: the seed is shared by every template and the stored copy is the artist's.
3. **The chips repeat the byline,** as the frame draws them; an emptied name or role drops its label and its chip, and both drop the caption and its rule.
4. **The padding is chosen** (the frames state only a card centred in 730), and the card keeps its width at one review (the arrows' tracks held).
5. **A long review grows the section past 730** (190 characters: 796 / 824 / 1133 tall), centred in its pads; the 730 is a floor, not a clamp.
6. **`quotes.when` is capped at 21 at every width** (the 390 one-line limit, equal to the longest seed): *Reviewed 11 months ago* prints with `…` at 1440, where 62 fit.
7. **`who` and `role` are capped at 35 and wrap** (the caption's chips drop under the byline, a chip wraps inside itself): the frame's one-line caption holds for the seeded row 0 alone.

**Fields and caps.** `FIELDS.testimonials` layout 1 reads `quotes` (`quote`, `who`, `role`, `when`) alone; `heading`, `sub`, `stars`, `rating` and `cta` are layouts 2-4's (`reach.mjs 5`, run whole to its 5808-render summary with no source edit in flight, agrees: `rating` layout 3, `stars`
layouts 2 and 3, no `who.*` row reaches the testimonials). Explicit `Lattice` rows (shared rows fell back to Pop's): `quotes.who` **35**, `quotes.role` **35**, `quotes.when` **21**, `quotes.quote` held to **190**,
`heading` and `rating` Pop's for layouts 2-4 (unmeasured). `limits.mjs testimonials --themes=5 --designs=0`: who 77 / 63 / 35, role 77 / 63 / 35, when 62 / 47 / 21, quote open at 400; `--check`: 0 fail; `--seeds`: 0 over.
**No `INLINE_OFF` and no `PHOTO_OFF` row:** the block prints every field the layout reads, and holds no photograph.

**Proof.** Geometry by `getBoundingClientRect` against the frame (root-relative, desktop x .82 on the 1180 canvas, the frame's 1180.8 centring giving the 0.4 x offset): 768 and 390 within **0.02** on every box (card 94.11 / 227.8
x 579.78 x 274.39 against 94.12 / 227.8 x 579.77 x 274.39; chips 103.31 and 126.09 wide, exactly the frame's 103.297 / 126.094; 390 card 24 / 181.11 x 342 x 303.78, arrows 145 / 201 at 504.89, quote four lines 116 tall);
1440 within **0.92** (the worst the chips' and the rule's y: the 1px borders do not scale), root 598.59, card 590.39 x 253.88 (253.38), quote 529.36 x 106.27 (the frame's three lines, 35.42 on 43.2 x .82), arrows 36.08 at
40.14 / 1103.78. Lines 3 / 3 / 4 (the +0.004em tracking is proved by line counts alone: the seed's straight `"` stops a line-one width comparison). `&noimage=1` rendered at all three widths: no change (the section holds no photo). Probes at `--theme Lattice --layout 1 --cat testimonials`: `inline-probe` (1440 and 768) PASS, 4 slots hit (`quote`, `who`, `role`, `when`), 0 dead click, 0 UNLEDGERED, 0 off;
`photo-probe` PASS filled, `--blank` and `--drop` (the section holds no photo slot); `focus-probe --prime --check` PASS (20 controls). Live (`&live=1`, trusted mouse clicks, 1440 and 390): five clicks page 01 to 05 and wrap, a previous
wraps back, the arrows' cursor is a pointer live and `auto` on the canvas, and with one review no arrow is drawn; all five seeded rows paged at all three widths with no box past the card and no sideways scroll.
`page-check.mjs Lattice 0`: no errors, both arrows respond in the published tab, `overflow390` 0, the section 730 tall at 390. States (`&cj=`, 1440 / 768 / 390, `scratchpad` `states.mjs`): 1, 3 and 5 reviews, an emptied name,
role, date, name-and-role and quote, a 190-character quote with 35-character name and role, a 45-letter word (fitted to 22.5 / 22.3 / 12.9px) and an empty list (*No reviews yet.* in the card, no arrows): no box leaves
the card and nothing scrolls sideways. `digest.mjs` 0,1,2,3,4 against a HEAD worktree (:5185, which answered no `LatticeTestimonials`, the positive control) and the working tree (:5173), ports and `?t=` normalised:
**0 differing files of 720**; a theme-5 testimonials-only digest (12 renders) differs in the three layout-1 renders alone (layouts 2-4 byte-identical; the full 720 are themes 0-4). `npm run build` passes (the standalone build was not rebuilt: the root `index.html` is the end-of-pass sweep's).

**For the footer (section 11).** `Footer` has **no hooks** (its links and Book pill are plain props), so, unlike every section since the bio, its block can stand at the head of the function (`if (s.limeTree && s.lattice)`),
ahead of Lime's block; the *seam* is `extLink` / `navHref` per link row and the pill on `bookTo`, dropped with its label, which the block restates as Lime's does. The frames (`1:1251` · `1:9880` · `1:10850`, 1440 x 480 /
768 x 612 / 390 x 586) draw, on Scheme 8's `#111` (`SCHEMES_OF.Lattice` row 0 seats the footer; `page === 2` reads `footerBand`, which Lattice's rows copy), a wordmark, the dotted disc (`LATTICE_ART.disc`, the header's
mask: the footer owes its own placement and `badgeMode` states, `showBadge` on the footer), a closing headline (`vm.footerStatement`; `vm.footerWordEms` is Editorial's and Pop's only, so widen that line to Lattice with the
per-glyph 0.004em if the headline is fitted), two link columns (`vm.footerCols`, the two derived columns, `LinksField`), a Book Now (`BracketButton` or the footer's own pill: read the frame), a rule, and the copyright and
*A JustPay Product* small print (`FOOTER_CREDIT`, a literal; `vm.copyright` is `copyrightOf()`). Read `notes/footer.md` first: the 390 name's measure and the second column's break are Pop's and Editorial's; do not assume
them. The testimonials above it stand on `#ED6D40`, so the seam is a straight orange-into-black edge: say so. The footer's dot field, if it draws one, is its own set (open question 5), as the testimonials' was: the
bio's recipe, held as the root's own `background-image`, with `limits.mjs`'s picture count in mind (and `vm.pad` after the testimonials' arm). Measure `limits.mjs footer --themes=5` (the `wordEms`-less caps fall to Pop's:
give Lattice explicit rows), add `INLINE_OFF` rows for fields not printed, and run the probes at `--cat footer`. The footer is the last section: after it, session 12 and the end-of-pass sweep.

### Settled in section 11 — the footer (2026-11-20)

**Verdict** (under *Seen at planning time*, written before the code): a new own-tree block, not Lime's footer and not its widenings. `LatticeFooter` stands at the **head** of `Footer` on `s.limeTree && s.lattice`, ahead of Lime's block, because the
re-check over the whole function (`useState | useRef | useId | useEffect | useMemo | useCallback | useReducer`, lines 31319-31917 at HEAD `6d92bbf`) found no hook; the seam (`extLink` / `navHref` per row, the pill on `bookTo`, dropped with its label)
is restated in it. Notes: `notes/footer.md`, *Lattice — layout 1*. **Seam above:** the testimonials stand on `#ED6D40` and the footer on `#111`, a straight orange-into-black edge, drawn by neither section. **Scheme seat:** Scheme 8 (`#111`,
`SCHEMES_OF.Lattice` row 0, copied to 1-3); `page === 2` reads `footerBand`, which is undefined for Lattice, so the `page=2` render is byte-identical to page 0 at all three widths. **No nested scheme:** every leaf is `s.tx`, `s.text3` (orange) or `s.glow`
(the teal), so `s.onScheme` is not read. **No dot field** (the frames hold only a glow), so there is no raster set and the root carries no `url()`; the disc is the header's `LATTICE_ART.disc` (the footer's 400 x 400 PNG is the file it was cut from: ink
bbox 77-326 x 98-253, the header's crop at (74, 95)), a mask on an `aria-hidden` span. **No `[ 00N ]` eyebrow and no new field:** none of the three masters draws one.

**The block.** Every number the frame's (desktop x 0.82 through `u`, 768 and 390 verbatim; raw sizes 40 / 32 / 26 statement, 12 / 11 mono, not the ramp). The section is 96 / 80 round a 302.19 content box at 1440 with a **480 floor** (so 96.91 / 80.9), 56 / 40 round
a natural 516.19 / 490.19 narrow; `vm.pad` (`EncoreBuilder.jsx`, after the testimonials' arm) is 78.72 / 65.6 at 1440 and 56 / 40 with the usual content insets (40.15 / 26.11 / 24), and the block's `minHeight` holds the floor and centres the content. Desktop is a 12-column grid at 24:
the left block on columns 1-7 (772.875), column 8 air, the links on 9-12 (431.375); 768 and 390 stack the two blocks **36 and 28 apart**, then the small print 28 under. **Left block:** a 1px full-ink right border at every width, the wordmark row (a nine-dot 18 x 18 mark, the
name in mono 12 caps with 0.04em, a 96 x 1 rule that yields to a long name: basis 0, floor 30 narrow) over the closing statement (`Archivo Lattice` 500, line 1, +0.004em, uppercase; **a wrapper of 11em of its own size** folds the seed's one typed break into the
frame's three lines; the fit to the widest word, `vm.footerWordEms`, Lattice's own line in `sectionVm` with the alias's table plus 0.004em a glyph, reads that same box), 64 apart at the least (the narrow frames' number; the 1440 block stretches to the links' 240). The disc is
128 x 81 at **70 off the block's right and 10.5 off its top**, drawn at 1440 and 768 and not at 390 (the 390 master draws none); the wordmark group's measure stops 20 short of its left edge (`discRoom`). **Right block:** a 2-column grid at 24 of 40-tall mono 12 rows 4 apart,
**read row by row off `s.footerLinks`**, then `BracketButton` (130 x 44, the label at 12 so its width is the frame's 129.97) 24 below; an emptied label drops it, an empty list drops the grid. **Small print:** 1px full-ink rule, 20 under it mono 11 in `s.text3`, the copyright
beside `FOOTER_CREDIT` at the right. **Glow:** the root's own `radial-gradient(ellipse 60% 55% at 85% 40%, glow 14%, 0 at 70%)` (all three masters' `gradientTransform`s reduce to it). No `boxShadow`, so no halo to read off the node: the frames bind none.

**Calls for the user to confirm.**
1. **The links read row by row from the flat list,** where the standing rule (and the panel's hint) halves them into two columns in order. The frame's DOM order is `FOOTER_LINKS`' own, laid in a 2-column grid; the halved columns would draw *About, Top Tracks, Media, Repertoire* down the left where the frame draws
   *About, Media, Shows, Enquiries*. Only Lattice reads `footerLinks`; every other template keeps `footerCols`. `FIELDS.footer.links.hint` is now `{ '*': …, Lattice: … }` (`EditPanel` reads the template's), so Lattice's hint says "two to a row, read across and then down".
2. **The wordmark row is drawn** (the nine-dot mark, the artist's name, a rule), though call 1 of session 0 removed the *header's* wordmark. It is the footer's own element in every template (its text is `s.brand`, no field), and the standing removals name the header, the bio and the eyebrows. Say so if the removal was meant to reach it.
3. **The seeded `Shows/Coverage`** (`navLabel('map')`, shared with the header's nav) prints where the frame draws *Shows*: the label is the artist's copy, so it is not forked (the last differing block in the 768 and 390 pixel diffs).
4. **The left block's right border is drawn as rendered** at 768 and 390, where it stands at the stacked block's right edge over the links: it looks like an import leftover of the desktop's column rule, and the frame draws it.
5. **The statement's 11em measure is chosen,** not read (the masters set three hand-broken lines in a 747.875 box; the seed has one break). It folds the seed into the frame's three lines at every width.
6. **The disc is not drawn at 390** (the master has none), so the footer's `showBadge` (*Seal*, Show / Hide) changes nothing there, as the bio's. It does not spin; the three-state `badgeMode` is the header's and the bio's, not the footer's.
7. **The 768 gap between the two blocks is 36 and the 390 one 28** (the frames' own; the small print is 28 under at all three widths).
8. **The small print's credit stays a literal** (`A JustPay Product`, `FOOTER_CREDIT`); the frame's `A JustPay product` is the same words in a different case, set uppercase by the mono label.

**Fields and caps.** `FIELDS.footer` reads `statement`, `links`, `cta`, `showBadge` and `copyright`, each at layout 1 (the footer has one design). Explicit `Lattice` rows, measured with `limits.mjs footer --themes=5` (every other row fell to Pop's or the `'*'`): `statement` **37** (37 / 37 / 37; the `'*'` 36
held), `links.label` **19** (24 / 41 / 19), `cta` **36** (49 / 82 / 36), `copyright` **25** (157 / 75 / 25), `IDENTITY_CHARS.footer.title` **39** (87 / 76 / 39). `who.seal` reads *unseen* (no ring is drawn), so the footer's `seal` row keeps Pop's number, unread; `who.kicker`,
`.location`, `.tags` are *unseen* too. `--check`: 0 fail; `--seeds`: 0 over. **No `INLINE_OFF` and no `PHOTO_OFF` row:** the block prints every field the layout reads (`inline-probe`: 0 off, 0 UNLEDGERED; the three unhit are printed copy with no slot, the name, the credit and the arrow), and holds no photograph. `reach.mjs 5`, run whole to its
`5808 renders` summary with no source edit in flight, lists no footer row and agrees with `IDENTITY_READS` (the footer reads no identity key).

**Proof.** Geometry by `getBoundingClientRect` against the frame (root-relative; desktop x 0.82 on the 1180 canvas, the frame's 1180.8 centring giving the ~0.4 x offset): **768 exact** (root 612.19, links at 26.11 / 396 and 270 / 314 / 358 / 402, the pill label 48.11 / 480.8, the statement 26.11 / 138 x 352 x 96, the disc 542.89 / 66.5 x 128 x 81 against the
frame's 479.77 + 37 + 26.11 and 56 + 10.5, the small print 559, the credit's right edge 742); **390 exact** (root 586.19, links 24 / 207 at 244, the statement 24 / 138, the pill 454.8, the small print 533, the credit 236.97 = the frame's 212.98 + 24); **1440** root 393.58 (480 x .82), links 786.39 / 972.95 at 79.41 / 115.47 / 151.53 / 187.59
(frame 786.9 / 973.5 at 79.47, a 36.08 pitch), the statement 177.75 x 98.39, the mask 510.09 / 88.02 x 104.95 (frame 510.3 / 88.07), the pill label 804.42 / 252.19 (804.9 / 252.6), the credit's right edge 1139.86 = 1180 - 40.14. Block-mean pixel difference (8 px blocks) against the frames' own screenshots, **0.87 / 0.62 of 255 at 768 / 390**, the worst block
the `SHOWS/COVERAGE` seed (call 3). Probes at `--theme Lattice --layout 1 --cat footer`: `inline-probe` (1440 and 768) PASS, 11 slots hit (eight link labels, the statement, the button, the copyright), 0 dead click, 0 UNLEDGERED, 0 off, 3 unhit; `photo-probe` PASS filled, `--blank` and `--drop` (the section holds no photo slot);
`focus-probe --prime --check` PASS (20 controls). Live (`&live=1`, trusted clicks, 1440 and 390): an external row (`example.com/docs`) opens `https://example.com/docs` in a new tab (`target=_blank`, `noopener noreferrer`), a section row carries `#bio`, a refused address (`ftp://nope`) and a `none` row carry no `href`, the pill `#form`; on the canvas (`live=0`)
no link carries an `href` and the pill is a `<span>`. `page-check.mjs Lattice 0` (the published tab): no errors, all eight footer links scroll to their section and the pill to `#form`, `overflow390` 0, the footer 586 tall at 390. States (`&cj=`, `&name=`, `&noimage=1`, scratchpad `states.mjs`, 1440 / 768 / 390): 0, 1, 3, 5, 7 and 10 links (the 1440 section holds 393.6 to seven
and grows to 428.3 at ten), no links and no button, no statement, button and copyright (the credit stays at the right), a 37-character statement, a 28-letter word (fitted, never past its box), 19-character labels in all eight rows, a 36-character button, a 25-character copyright, a 39-character name (two lines at 390, the rule at its 30 floor) and an 80-character one (clamped to 39), the seal hidden, `&noimage=1` (no photo
in the section): no box leaves the root and nothing scrolls sideways at any width, 0 console errors. `digest.mjs` 0,1,2,3,4 against a HEAD worktree (:5185, which answered no `LatticeFooter`, the positive control) and the working tree (:5173), ports normalised: **0 differing files of 720** (the `page=2` footers included); at theme 5 the six footer
renders differ (the footer has one design) and the `page=2` render equals page 0 at all three widths. `npm run build` passes (the standalone build was not rebuilt: the root `index.html` is the end-of-pass sweep's).

**For the sweep (session 12 and after).** The footer is the last section of the pass. `limits.mjs` and `reach.mjs` for the footer are done here, and `INLINE_OFF` / `PHOTO_OFF` have no footer row; the other eleven sections' ledgers were settled in their own sessions, so session 12 is a **whole-page proof**, not a first run. The sweep's list under *The end-of-pass sweep* holds
(CLAUDE.md and README wording, `notes/templates.md`'s Lattice section, the code comments that count templates, `plans/CONVENTIONS.md`, the whole-page published check with every seam against its real neighbour, the four header cards, `plans/README.md`, the root `index.html` and `published.html` and the two-build digest). Two things only the sweep can see: the footer's `#111` against the testimonials'
orange (a straight edge, drawn by neither) and the page gutter at 1440+ (the bottom of the page is this footer's `#111`, not `vm.pageBg`'s `#DADADA`).

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
