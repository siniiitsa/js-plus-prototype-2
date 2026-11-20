# Paperback layout 1 — section-by-section plan

This is the working checklist for bringing a **seventh template, Paperback**, to the builder at **layout 1**, from
the Figma file *JustPay — Batch 2* (`ORILFywSzuadscu6RzskCW`), frames named **"Paperback Playful — Claude Design"**.
It runs one unit per session, clearing context between units; git and this file are the memory. Written 2026-11-20
from a planning read of all three masters (a screenshot of every desktop section, the narrow heroes, the section
trees at all three widths, `get_variable_defs` on the page and on three sections). Nothing in `source/` has been
touched.

**This is the pass Lattice's layout 1 was** — the same file, the same eleven components, the same builder — and it
leans on [`../lattice/layout-1.md`](../lattice/layout-1.md) for procedure and for everything the builder grew after
Pop (caps, ledgers, the sweep). It does not repeat them. What is written here is what differs:

1. **Same Figma file as Lattice, and the same import style** — layers are `Section` / `Container` / `Icon` /
   `Link` / `Text`; there are **no component sets and no `Theme=` variants**, so a *paired diff walk by layer name*
   is impossible and a section's twin is decided by composition and geometry. **Unlike Lattice, this file does bind
   variables**: `sem/*`, `scheme/N/*`, `size/*`, `radius/*`, `border/*`, `font/*` all answer (below). The page node
   binds a Scheme-2-ish set, a section binds its own; so *which scheme each section stands on* is readable, as it was
   for Editorial and Pop. Session 0 reads it with `use_figma` (`explicitVariableModes` per section) rather than
   guessing.
2. **The look is Pop's family, softened** — tilted cards with a white keyline, tape strips, four-point sparkles,
   squiggles and confetti, doodle icons in white discs, hand-drawn underline and circle scribbles, a **handwritten
   script face** for notes, and square-cornered nothing: radii are 24 on cards, 999 on chips and pills, 8 on
   controls. The palette is **sunny yellow `#FFD24A` / pale yellow `#FAED8F`, cyan `#A4F6F8`, indigo `#3B308F`, hot
   pink `#F8158F`, orange `#F9A12B`, lilac `#9982DE`, blush `#FFDBFD`**, on a white page. It is the first template
   whose page is *light with coloured cards and bands* **and** whose faces are both free.
3. **A lot of the frame's copy is something a standing rule removed** (the header's inline nav and wordmark, the
   kicker and location pills, the script eyebrows, `5 / 5 featured`, `Reviewed 6 days ago`, `001 · Structure ·
   Bio_01`) **and one thing no template has** (a footer newsletter). **Calls 1 and 2 below are the user's**, and
   session 0 opens on them, as Lattice's did.
4. **A new template now also owes** the character caps, the inline-edit ledger, the photo-edit ledger and the
   per-template `in` rows. Those are *proofs*, scheduled as session 12.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then
- [`../lattice/layout-1.md`](../lattice/layout-1.md) — *Session 0*, *Per-session procedure*, *Session 12*, *The
  end-of-pass sweep*, and its **Conventions → Settled in session 0** and **Learned on session 12 and the sweep**
  (the seventh template meets every name gate, tool and ledger the sixth did; those bullets are the inventory)
- [`../CONVENTIONS.md`](../CONVENTIONS.md), groups **A, B, C and D1**, and the bullets they point at
- the section's *Settled in section N* bullets in [`../pop/layout-1.md`](../pop/layout-1.md) (the nearest relative —
  tilted cards, stickers, a light page with cards on it; also Editorial's for *a card on the page's paper*) and in
  [`../lattice/layout-1.md`](../lattice/layout-1.md) (the latest precedent for *a section with a tree of its own*),
  plus `notes/<section>.md` for the section's current live behaviour
- `notes/templates.md`, and `plans/header-nav.md` and `plans/header-fit.md` for the header session
- the *Per-session procedure* of [`../lime/layout-1.md`](../lime/layout-1.md), via Lattice's

Then the memory notes `figma-frame-reading`, `verifying-the-published-tab`, `browser-tool-choice`,
`load-figma-fonts`, `digest-two-servers` and `handoff-prompt-on-finishing`. `SPEC.md` lives in git history:
`git show 8fa8ff4:SPEC.md`.

Branch: **`paperback-layout-1`**, forked from `main`.

## What the pass must deliver

1. **Every section works in the published tab under Paperback** — every control CLAUDE.md lists under
   *`s.live` is false everywhere except the published tab*.
2. **Every section looks as close to its Figma frame as possible**, at 1440 (× 0.82 onto the 1180 canvas), 768
   and 390.
3. **Paperback's template card** on the picker — big preview and filmstrip thumbnail — is a live `HeaderV0`.
4. **The setup modal shows four Paperback cards.** Card 1 is the fitted Hero. Cards 2–4 only need to render,
   publish and read legibly in Paperback's tokens (Lime's, Pop's and Lattice's rule) until later passes fit them.
5. **The other six templates do not move.** `theme=0…5` digest to zero rows across every category and width.

## The Figma source

File `ORILFywSzuadscu6RzskCW` (*JustPay — Batch 2*), one page, the same page as Lattice's frames (Lattice's masters
are `1:306` / `1:8953` / `1:9934`). The Figma tools need `create_session` first.

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Paperback Playful — Claude Design — Desktop | `1:2316` (`Body` `1:2317`) | 1440 × 9404 |
| Tablet | … — Tablet | `1:10903` (`Body` `1:10904`) | 768 × 11420 |
| Mobile | … — Mobile | `1:12137` (`Body`, read it) | 390 × 12712 |

- Desktop: <https://www.figma.com/design/ORILFywSzuadscu6RzskCW/JustPay---Batch-2?node-id=1-2316&m=dev>
- Tablet: <https://www.figma.com/design/ORILFywSzuadscu6RzskCW/JustPay---Batch-2?node-id=1-10903&m=dev>
- Mobile: <https://www.figma.com/design/ORILFywSzuadscu6RzskCW/JustPay---Batch-2?node-id=1-12137&m=dev>

**`get_metadata` on a whole master overflows (≈ 140–160 K characters) and the tool saves it to a file.** The file is
a JSON array of `{type, text}`: **join every element's `text`** (the first is only the "Currently selected nodes"
note, the XML is in a later one), then slice with `python3 -I` (top-level `Section`s are the `frame name="Section"`
children of `Body`). Better: `get_metadata` per section node.

**Whole-master screenshots are useless** (1440 × 9404 comes back 314 px wide); screenshot per section, `maxDimension`
1440 at desktop, and `curl` the URL in the next call (it is short-lived).

## The sections

Session 0 first, then eleven sections in the page's order. Sizes are the frames' own. **The hero is 750 tall at all
three widths**, as Lattice's was (`WIDE.heroH`, `SPOT_ASPECT` and the picker frame's aspect assume 750 / 1024 / 844;
Lattice settled that as *a narrow-only 750 behind `lattice`* — section 1 reads that bullet and does the same behind
`paperback`, or finds a reason not to).

| # | Cat | Desktop node | Size | Tablet node | Size | Mobile node | Size | Composition (from the pictures) · predicted twin | Status |
|---|---|---|---|---|---|---|---|---|---|
| 0 | *foundation* | `1:2316` | — | `1:10903` | — | `1:12137` | — | `THEMES[6]`, ramp, faces, photos, the flag, the doodle art | open |
| 1 | `header` | `1:2318` | 1440 × 750 | `1:10905` | 768 × 750 | `1:12139` | 390 × 750 | Yellow ground with a wavy pale-yellow squiggle field, rounded bottom corners; wordmark `Kai Mercer` + `DJ LIVE`, inline pill nav (desktop only), pink Book now + arrow; a **tilted photo card** with tape, a pink `KM` disc, a vinyl-disc sticker, sparkles; a tilted **avatar card**, kicker pills, a ~110 px title with a **pink hand-drawn underline**, six pill chips, a script `Booking 2026` note · **Pop's `HeaderV0`** (tilted card, sticker disc, sparkles) or **Lime's `HeaderV0` block** as the twin of the card and chips — read both before choosing | open |
| 2 | `bio` | `1:2397` | 1440 × 832 | `1:11004` | 768 × 1213 | `1:12191` | 390 × 1211 | White; a huge two-line statement `Reads the room.` left, a tall tilted portrait with tape over a blush blob, a vinyl doodle and sparkles, **About** + copy + black `Full bio →` pill right, script `KM bio`, `that's me! ↷`, and `DJ · Live act Manchester`, a `001 · Structure · Bio_01` chip pair · **new own block** (a statement + portrait + side copy; nothing in the page is Lime's *Flanked portrait*) — check Pop's bio first | open |
| 3 | `media` | `1:2450` | 1440 × 1057 | `1:11054` | 768 × 1398 | `1:12240` | 390 × 1361 | A **cyan card** (24 radius, on the white page): script `Top tracks`, a 2-line title, confetti; five numbered white rows (art, title, a coloured `Single` / album chip and a black duration chip, a black play disc; row 2 is yellow with a pink play disc), a black `Soundcloud →` pill; right: a **tilted indigo now-playing card** with art, title, artist, three transport discs, progress and times, a pink music-note disc, script `5 / 5 featured` · **probably Retro's `v0` body re-laid** (the same inventory Lattice's media was) — Lattice's section 3 settled that; read it | open |
| 4 | `gallery` | `1:2617` | 1440 × 909 | `1:11239` | 768 × 1429 | `1:12425` | 390 × 1005 | Pale yellow band; script `Media`, title `See us in action`, four **accordion rows** (Gallery open and yellow with a ×, YouTube / Instagram / TikTok with a +); right: a `← Back to beginning` pill, a tilted white-keyline viewer with arrows, a pink tape strip and script `Kai Mercer gallery`, seven thumbnails (the picked one ringed pink) · **Lime's *Photo viewer* inventory** (source rows + viewer + strip) | open |
| 5 | `repertoire` | `1:2689` | 1440 × 1067 | `1:11313` | 768 × 1067 | `1:12499` | 390 × 1656 | A **yellow card with an orange blob** on the white page; script `Repertoire`, `240 songs` + a heart-in-vinyl disc, a pill search, four chips (`All` black), a **two-column dense** list of 6 + 6 white pill rows (number, title, a coloured artist chip), a pager of round buttons · **Lime's *Two-column dense*** inventory | open |
| 6 | `map` | `1:2822` | 1440 × 983 | `1:11471` | 768 × 983 | `1:12654` | 390 × 983 | **Indigo** band with squiggle and confetti; script `Shows / coverage`, `Manchester` at ~110 px, a yellow `120 mile radius` pill; a **tilted lilac card** with concentric dashed rings, a pink dot, script `home turf` + an arrow, a white foot `Based in Manchester` / `120 mi standard · further on request`; right: `Upcoming gigs` · `05 of 12`, five white rows (a coloured date tile, title, `Town · time`, a pink `Sold out` or black `Tickets` pill), a pager · **Lime's *Compact tile*** (the raster map is the rings art) | open |
| 7 | `pricing` | `1:2968` | 1440 × 1067 | `1:11610` | 768 × 1479 | `1:12793` | 390 × 2037 | White; script `Pricing`, a 3-line title, sparkles, a yellow **Solo / Trio / Band** pill toggle; **three tilted coloured cards** (lilac, pink, cyan) each with name, a big price, copy, ticked features and a black `Book this set →` pill, a yellow star-in-disc badge on the featured one; a script small-print note · **Lime's pricing** inventory (probably its own tree) | open |
| 8 | `calendar` | `1:3131` | 1440 × 835 | `1:11793` | 768 × 676 | `1:12975` | 390 × 910 | A **blush card** on the white page: black arrow discs and `June 2025`, a month grid of white rounded cells (the picked day pink with an **indigo hand-drawn circle**), script `pick your night!`; right: a yellow tilted speaker tile on a magenta blob, a headphone disc, confetti, script `Your night, your playlist`; a white foot bar `Enquiry for Thursday, June 12 at 9:00pm` + pink `Continue →` · **Lime's *Scheduler*** | open |
| 9 | `form` | `1:3269` | 1440 × 687 | `1:11931` | 768 × 898 | `1:13112` | 390 × 1193 | One card: an **indigo context panel** (avatar, name, `DJ · Live band`, a 3-line headline, three ticked promises, a lilac blob) + an **orange form** (name, email, date, guests, event-type chips with `Wedding` black, message, black `Book now →`), a yellow chat-bubble disc on the corner · **Lime's *Split context + form*** | open |
| 10 | `testimonials` | `1:3354` | 1440 × 730 | `1:12016` | 768 × 730 | `1:13198` | 390 × 730 | Pale yellow with **two yellow waves**, outline trophies, sparkles; a **tilted white quote card** (script `Reviewed 6 days ago`, the quote at ~48 px, a pink name chip, a cyan role chip), a pink-ringed star disc, two black arrow discs · **Lime's *Stacked tag card*** inventory (as Lattice's) | open |
| 11 | `footer` | `1:3395` | 1440 × 487 | `1:12081` | 768 × 798 | `1:13263` | 390 × 876 | Indigo; the name, **seven link pills** (About … Reviews), a tilted photo with a `KM` disc and sparkles, **`Join the guest list` + an email box + `Subscribe →`** (new), a rule, `© 2026 Kai Mercer` and `A JustPay product` · **Lime's footer** + a newsletter block no template has (call 2) | open |
| — | `video` | *none* | — | — | — | — | — | not on this page: it takes session 0's tokens and nothing else (the frames draw it at layouts 2 and 4 only) | — |

The tablet and mobile ids were matched to the desktop's by **page order and by height**, not by layer name (the
masters name every section `Section`). Each section's session checks its two narrow screenshots against the desktop
picture before measuring (open question 5). Heights that repeat across widths (the map's 983, the testimonials' 730)
are the frames' own, as Lattice's were.

The **ground sequence** read from the pictures: yellow hero (rounded foot) · white · white page + cyan card · pale
yellow band · white page + yellow card · indigo band · white · white page + blush card · white page + indigo / orange
card · pale yellow band · indigo. **Where the frame stands a card on the page, the page is white** — Editorial's and
Pop's *card on the page's paper* mechanism (`cardOnPage`, `vm.pageBg`, a scheme seat per design), not a band. Every
seam between bands is straight except the hero's rounded foot and the testimonials' inner waves (inside the band, not
a seam); `above` / `below` read nothing for Paperback. Re-measure every ground and height from the frame; the numbers
above are a read of the pictures.

**Re-measure from the Paperback frame; never reuse a twin's block sizes.** A section whose composition turns out to
differ is the exception: **stop, and record it under *Conventions* before writing code.** Lattice's verdict was *a
new own tree for every section*; this pass's default is the same, and a widened Pop / Lime block is chosen only where
the read shows the frame draws the twin's inventory with deltas small enough to sit behind `s.paperback`.

## The tokens read at planning time

`get_variable_defs` on the desktop page and on sections (the bound set is partial and **node-dependent**; Session 0
reads every section's mode):

- **Faces**: `font/display` **Bricolage Grotesque** (display, headings, prices, big numerals), `font/body` and
  `font/label` **Figtree**. Both are free Google Fonts. **A third face is drawn and bound to no variable**: the
  *script* — `Booking 2026`, `KM bio`, `that's me!`, `Top tracks`, `Kai Mercer gallery`, `home turf`, `pick your
  night!`, `Reviewed 6 days ago`, the pricing small print. It looks like a brush / casual handwriting (Caveat,
  Caveat Brush, Kalam, Gochi Hand are the candidates); **session 0 reads the family off `get_design_context`
  and loads it in `index.html` and `preview.html`** (`load-figma-fonts`). All the display strings are tightly tracked
  heavy grotesque (Bricolage ≈ weight 800, a negative `letter-spacing`); read `opsz` / `wdth` / `wght` / tracking from
  the text styles, and **measure the face against `absoluteRenderBounds`** on a handful of strings as Lattice did
  (`faceK`).
- **Ramp** (desktop mode): `display-md 72`, `display-sm 52`, `title 32`, `list 30`, `body-lg 20`, `body-md 18`,
  `body-sm 16`, `eyebrow 15`, `chip 13`; `radius/card 24`, `radius/control 8`, `radius/chip 999`;
  `border/hairline 1.5`, `border/thin 2`, `border/heavy 4`. The hero's `display-xl` (≈ 110–128) and the narrow ramps
  are read per node. **A narrow master may sit in a different Device mode from its page** (`figma-frame-reading`);
  `get_variable_defs` shows it.
- **Palette** (Scheme 1 unless noted): `sem/bg #FAED8F`, `sem/box/1 #4A3FA3`, `sem/box/2 #FFD24A` (Scheme 2:
  `#FFDBFD` on the pricing / calendar nodes), `sem/box/3 #A4F6F8`, `sem/text/1 #0B0B0B`, `sem/text/2 #FFFFFF`,
  `sem/text/3 #3B308F`, `sem/active/bg #F8158F`, `sem/stroke/1 #0B0B0B`, tags 1–7 (`#9982DE`, `#F9A12B`, `#FFFFFF`,
  `#FFFFFF` text, `#9982DE`, `#9982DE`) with the **hot-pink / magenta chips** (`Live`, the `Stevie Wonder` and
  `Slow Burn` chips) and the **saturated cyan** of the pricing card and the **indigo** `#3B308F` / `#4A3FA3` of the
  map, form and footer **not seen in the list**: they are scheme keys or raw literals — read them (open question 3).
  `scheme/1/box2 #FFD24A`, `scheme/2/box3 #A4F6F8` prove a `scheme/N/*` collection exists.

## The decisions this plan hands over

Each is settled by the user at the head of the session that needs it, with the plan's recommendation as the default,
and written back here as *settled: …*.

### 1. Do the standing copy removals hold for Paperback, or does the frame win?  *(session 0 opens on this)*

Lattice's call 1 again, with this frame's list (read from the 1440 pictures; the narrow heroes were read too):

| Section | The frame draws | Standing rule it meets |
|---|---|---|
| header | the wordmark `Kai Mercer` + `DJ LIVE`; **five inline nav pills at 1440** (none at 768 / 390); a pink `Book now →` (at 1440 and 768, **none at 390**); a hamburger at 768 and 390 **on the right** | layouts 1–4: **hamburger left, Book Now right, nothing else**, at every width (`plans/header-nav.md`) |
| header | the pills `Manchester, UK` and `DJ · Live act` over the title | layout 1 prints **no act type and no location** |
| header | `KM` disc + vinyl disc (1440); `KM` disc + a **ring-text seal** `NOW BOOKING · WEDDINGS · CLUBS` (768); neither (390) | the badge is kept with three states (`badgeMode`); the ring text is the artist's name by rule, so the frame's literal is a decision |
| header | script `Booking 2026` | no field exists; a new literal is a decision |
| bio | script `KM bio`, `that's me! ↷`, `DJ · Live act Manchester`; the `001` + `Structure · Bio_01` pair | the initials / `Bio` eyebrow and the reference line were **removed 2026-11-11**; the role + town line is *derived* (`vm.roleLine`), so it may draw |
| media | script `Top tracks`; script `5 / 5 featured` | both **removed 2026-11-12** |
| map | script `Shows / coverage`; the `120 mile radius` pill | the eyebrow **removed 2026-11-12**; the radius pill needs a ruling (`notes/map.md`) |
| testimonials | script `Reviewed 6 days ago` | the `kicker` field is **gone** |
| gallery, repertoire, pricing | script `Media` / `Repertoire` / `Pricing`; script `Kai Mercer gallery`; the pricing small print | the gallery's `kicker` (layout 1) and `railLabel` exist as fields (JP-120); the others need a check |
| calendar | script `pick your night!`, `Your night, your playlist` | `prompt` exists and reads its seed; the second is a new literal |

- **A (recommended): every standing removal holds; a script eyebrow or note is drawn only where a seeded, uncased,
  drop-when-emptied `FIELDS` field already exists for it.** Paperback is then a re-skin of what the builder prints,
  as every earlier template was. The frame's inline nav, wordmark, kicker pills, `Booking 2026`, the removed
  eyebrows and the new literals are the places Paperback does not follow its Figma.
- **B: the frame wins, by item.** The user names the items; each reopens a recorded call (for the header,
  `HeaderRoot` / `MenuPanel` gain a Paperback arm and the overflow rule the inline pills need comes back).

### 2. The footer's `Join the guest list` newsletter  *(session 0 opens on this too)*

No template has a footer sign-up, and the builder has no backend: the form's submit is a `mailto:` (`notes/form.md`).
- **A (recommended): not drawn.** The footer prints what `notes/footer.md` already has (name, link pills, photo,
  Book pill, copyright, *A JustPay product*); the freed seat is the photo's.
- **B: drawn as a picture, inert** — a box that cannot be typed in on the canvas *and* in the published tab. Rejected
  as default: a dead input in a published page is a lie to the visitor.
- **C: a live `mailto:` sign-up** — heading, label, placeholder and button become seeded `FIELDS`, with caps, ledger
  rows and a `UrlInput`-style address check; the published button opens a mail to the artist with the visitor's
  address in the body. Real scope (≈ the calendar wizard's mailto, JP-053), so a session of its own.

### 3. The template's name

The frames are *Paperback Playful*. **Recommended: `Paperback`** — one word like the other six, `THEMES[6].name`,
`plans/paperback/`, the picker's card title, `sub` the long form (*Bricolage Grotesque · playful & bright*). The user
may rename it at session 0; the folder and flag follow.

### 4. Faces — both named faces are free Google Fonts, so no stand-in call

Bricolage Grotesque (axes `opsz`, `wdth`, `wght`) and Figtree: **one combined `family=` entry each, never a second**
(Gloock's rule), in `index.html` **and** `preview.html`, and check `public/published.html` and the popup's cloned head
(Lattice's step 4). The **script** face is the one open: session 0 names it; if it is not free, it is a stand-in call
for the user (Pop's and Grunge's shape).

### 5. Casing

Display and labels print in mixed case here (`Kai Mercer`, `Five worth your ear.`, `Book this set`); no template
before this one is uppercase-free at every site. Default `casing: 'title'` (passthrough), nothing uppercase — verify
against the frame's text styles (`textCase`), and settle site by site if any chip is cased.

### 6. The flag — `s.paperback`, widened per site

Lattice's call 4: add `paperback: T.name === 'Paperback'` to `sectionVm`, widen `designed` and `limeTree` to it, and
**take the inventory of every name gate first**: `grep -n "Lattice\|lattice" source/src/builder/*.js*` is **148 hits in
`data.js`, 95 in `EncoreSection.jsx`, 46 in `EncoreBuilder.jsx`, 28 in `photos.js`** — each is a place a seventh
template either needs a row or falls through to Pop's (`specAt`: `spec[Lattice] ?? spec['*'] ?? spec.Pop`; an `in`
object that names neither the template nor `'*'` *reads* the field; `INLINE_OFF` / `PHOTO_OFF` have no fallback).
List every gate, give each a Paperback row or a stated reason, and write the list under *Conventions*.

### 7. Photography

The frames' photographs are a **performer with silver-pink hair in a holographic jacket** (hero, avatar, bio
portrait, gallery, thumbnails, track art, the now-playing portrait, footer, form avatar). **Compare them with Pop's
and Retro's seeds before importing**: if they are already in `photos/`, reuse the module, do not add a second copy.
Seed new ones as `SEEDS.Paperback` in `photos.js` (the only module that imports `src/builder/photos/`),
**JPEG-compressed**; the root `index.html` is **13,030,112 bytes** and Lattice's pass added 1.10 MB — budget the set
(≈ 12 photographs: hero, avatar, bio, six gallery, five track covers, footer, form avatar) before adding it and say
what the build grew by. The doodles are **art, not photography**: transcribe the frames' vectors to inline SVG
(`download_assets` at scale only if they are rasters).

## Session 0 — the foundation

This session touches no section's layout code. Its job is to make every later session decoration and measurement. It
opens on **calls 1, 2 and 3** (one `AskUserQuestion`, three questions, the recommended answer first in each).

1. **Read every token and every section's scheme.** `get_variable_defs` on the page and on each of the eleven
   desktop sections, then one `use_figma` read (load `figma-use` first) of every section's `explicitVariableModes`
   mapped through `figma.variables.getLocalVariableCollectionsAsync()` — **it lists every section's Device and
   Scheme at once** and says which narrow masters sit in a different Device mode (`figma-frame-reading`). Read
   `fills` / `strokes` / `effects` / `rotation` / `padding*` from the node itself where a token is doubtful (a
   `get_variable_defs` entry can be wrong, `figma-frame-reading`). Write the mapping, the ramp at three widths and
   the palette (including the literals no variable holds) under *Conventions*.
2. **`THEMES[6]`** in `data.js`, appended — `st.theme` is an integer index, **never reorder**. Name, `sub`,
   `display` / `label` / `ui` / `body` / script (a new key: a `script` face is read by no template yet, so it is a
   new `THEMES` field and a new `s.script` in the vm), `casing`, `dls`, `radius 24`, `radiusSm 8`, `btnR 999`, `bw 2`,
   `radiusChip 999`, `palette`, `tags` (seven seats), the `sem` object, and `schemes` for the per-section grounds
   (Editorial's and Pop's mechanism: **read `THEMES[3]`, `[4]`, `[5]` and CLAUDE.md's scheme paragraph first**), plus
   `SCHEMES_OF.Paperback` (rows 0–3 identical, the placeholders copying row 0) and `pageGround` if the page's ground
   is not `palette[0]` (it is white here; the hero is a band).
3. **The type ramp** (`RAMP` / `THEME_RAMP` in `EncoreBuilder.jsx`, Pop's and Lattice's shape): desktop × 0.82, 768 and
   390 verbatim, layered over the others; check `preview.jsx`'s copy of `Z`. **Every other template's ramp stays
   byte-identical.**
4. **Fonts** (call 4): the combined Google Fonts entries in `index.html` **and** `preview.html`; `published.html` and the
   cloned head checked; Bricolage's measurement against `absoluteRenderBounds` for `faceK`.
5. **The flag and the name inventory** (call 6) — the 148 / 95 / 46 / 28 greps above, nothing skipped. `headerFamily`
   → a `paperback` family of four (`HEADER_COUNT`, `HEADER_NAMES`), `setupHeaderCount` follows; `designCount` /
   `pageLayout` / `pageOrder` need no change. `IDENTITY_CHARS`, `FIELDS[].in` objects, `chars` / `count` / `num`
   specs (seed Paperback's from Pop's until session 12 measures them), `FOCUS`, `INLINE_OFF` keys
   (`Paperback.0.…`), `PHOTO_OFF`.
6. **Seed the photography** (call 7) and **the doodle art**: one module for the shared doodles (sparkle, squiggle,
   confetti, tape strip, vinyl disc, music note, speaker, headphones, trophy, star, heart, chat bubble, the hand-drawn
   underline and circle, the arrow-with-script-note) — pure SVG functions, **no effect, no library but
   `lucide-react`** (the file's rule), used by every section from one place (Lattice's `LATTICE_ART` shape), and the
   hero's **wavy squiggle field** (two 1440 × 960 vectors) as a per-width background.
7. **The tooling accepts a seventh theme — check, do not assume.** Lattice's session 0 found scripts that hard-code
   five themes; the sixth left these *names* or *lists*: `focus-probe.mjs`, `inline-probe.mjs`, `photo-probe.mjs`
   (`--theme Retro | … | Lattice`), `photo-aspect.mjs` (default list), `reach.mjs` (`0,1,2` indices; 5 is Lattice),
   `limits.mjs` (`--themes=…`, `FLOOR_AT`), `digest.mjs` / `build-digest.mjs` / `shots.mjs` (indices, default
   `0,2,3,4`), `page-check.mjs`. Fix what hard-codes six, in one commit named for the scripts, and prove each runs once
   at `theme=6`.
8. **The template card** (`TemplatePreview`, the filmstrip): the picker offers seven templates, the big card and
   thumbnail show a live `HeaderV0` once section 1 lands, and the picker's grid and text stay right with seven
   entries (check the grid, not only the card).
9. **`vm.pageBg` / the page gutter / the published `documentElement`**: the page is **white**, bands and cards stand
   on schemes. Read which scheme each section stands on and where the card-on-paper seat lives.

**Verification for session 0:**
- **Exit criterion: Retro, Lime, Grunge, Editorial, Pop and Lattice do not move.** A digest of all categories × 3
  widths at `theme=0…5` before and after: zero rows (skip `.seal-spin`). `scripts/digest.mjs`, the two-server recipe in
  the `digest-two-servers` note, and `browser-tool-choice` for the rest.
- Paperback changes on purpose: screenshot the eleven sections at `theme=6` before and after (desktop only) and keep
  them in the scratchpad as the pass's "before" pictures.
- The builder opens with seven templates; picking Paperback reaches the editor and does not throw; every section
  renders (legibly ugly is fine) at all three widths.

## The header, and the four cards

Section 1 follows call 1. Whichever way it goes:

- **`HeaderV0` dressed behind `s.paperback`** (or a block of its own). The frame draws a yellow ground with a
  squiggle field, rounded foot, a tilted photo card (tape, a `KM` disc, a vinyl sticker, sparkles), a tilted avatar card,
  the title at the display-xl ramp with a **pink hand-drawn underline** under its last word (`shrinks to fit` —
  `plans/header-fit.md`; hold the frame's size for the seeded name and let the fit rule act on longer ones), and a
  six-pill chip row (`vm.tagChips` on the `vm.chips` palette). Copy the header-nav ticket's list of what the header no
  longer prints before adding anything (`FIELDS.header` `in` rows are the authority).
- **The disc(s)**: the `KM` disc is the badge's artwork (an initials disc — Lime's and Editorial's badges have no
  ring to turn, `badgeOptsFor()` offers those Visible / Hidden only); the 768 ring-text seal spins (`seal-spin`) when
  `badgeSpin`. Decide per width what each `badgeMode` state draws, and say so in *Conventions*.
- **Cards 2–4** render `HeaderV1`…`V3` in Paperback's tokens and publish; fit only what is broken and note the rest.
- **The page fold**: `pickHeader` writes `pageLayout(cat, i, 'Paperback')` to every section and reorders by
  `pageOrder(i)`, and adds / drops the video; nothing to change, but say so in the modal verification.
- **Hero aspect**: 750 at every width (Lattice's bullet).

**Verify in the builder, not only the harness**, with chrome-devtools MCP: the template stage shows seven templates;
Paperback's card and filmstrip thumbnail are the live hero; the setup modal shows four named Paperback cards; card 1
opens the editor on the Paperback page; Publish, then in the popup the nav scrolls to each section, the hamburger opens
at 768 and 390, and Book Now reaches the form (`verifying-the-published-tab`).

## Paperback's decorative language

Everything is behind `s.paperback`. Measure each from its frame; this is the planning read.

- **Tilted cards with a white keyline** (photo, avatar, now-playing, map card, pricing cards, testimonial card, the
  gallery viewer, the footer photo): rotations are read off `rotation` on the node (CSS-clockwise is *Figma's negative*,
  `figma-frame-reading`; Figma spaces a rotated child by its rotated bounding box — mind the pricing deck's gap).
- **Tape strips** (cyan over the hero photo, yellow over the bio portrait, pink on the gallery viewer, cyan on the
  hero at mobile): flat rectangles, slightly rotated.
- **Sparkles** (a large 4-point star, outlined, with a small pink and a small white one) and **squiggles / confetti**
  (a pale `~`, short dashes in orange, pink, cyan, lilac): one component each, placed by each section's frame.
- **Doodle discs**: an icon (vinyl, music note, heart, headphones, star, chat bubble) in a white disc with a 2 px black
  ring, sometimes with a coloured outer ring.
- **Hand-drawn marks**: the hero's pink underline, the calendar's indigo circle round the picked day, the bio's curved
  arrow, the map's `home turf` arrow. SVG paths transcribed from the frame's vectors.
- **Script notes**: the third face, indigo `#3B308F`, rotated a few degrees. Drawn only where call 1 and a field allow.
- **Controls**: black `Book now` / `Soundcloud` / `Full bio` pills with a separate arrow square (a split pill),
  round disc arrows, white pill chips with a 2 px black ring where selected, a yellow active pager disc.
- **No grain, no arcs, no tears**; straight seams except the hero's rounded foot.

## Per-session procedure

Lattice's, verbatim — [`../lattice/layout-1.md`](../lattice/layout-1.md) *Per-session procedure* (which is Lime's with
`s.lime` read as `s.lattice`), with `s.lattice` read as `s.paperback`, `theme=5` as `theme=6`, and these changes:

1. Read the files above. **Session 0** follows *Session 0*.
2. `create_session` once for the Figma file; `get_metadata` on **the section's three nodes** (never the whole master);
   `get_screenshot` on each, `curl` it in the next call; load the `figma-design-to-code` skill, run
   `get_design_context` and `get_variable_defs` on all three nodes. **There is no twin node to diff by name**, so lay
   the prediction in the table above against the code's existing layout-1 branch: read it, list what the frame draws
   that it does not, and write the verdict (*dress the shared branch* · *widen the Pop / Lime block* · *new own-tree
   block*) under *Conventions → Seen at planning time* before writing code. **Read the narrow masters' own
   `get_variable_defs` before trusting their sizes** (a Device-mode leak, `figma-frame-reading`).
3. Implement inside the section's existing branch gated on `s.paperback`, or in a `Paperback*` tree of its own
   (Lattice's shape: *after* the section's hooks and seam, so the published controls are the shared seam's and only
   the picture is Paperback's); desktop numbers are the frame's × 0.82, the 768 and 390 frames verbatim; prefer
   session-0 tokens over literals.
4. **Verify** with the preview harness (`npm run dev` in `source/`, then
   `http://localhost:5173/preview.html?cat=bio&arch=0&theme=6&w=desktop` — `tablet`, `mobile`) and chrome-devtools:
   - **Look**: render vs frame; read geometry with `getBoundingClientRect()`, numbers not screenshots.
   - **Function**: `&live=1`, drive every control in its active, idle and refused states.
   - **The other six do not move**: a zero-row digest at `theme=0…5` at three widths, before and after in the same
     tab. The brace-depth walk (every added line inside an `s.paperback` conditional) is the quick first check; the
     digest is the proof.
5. Commit with the section named in the subject; set the row's Status to `done <sha>`; add what the next unit needs to
   *Conventions*; commit that.
6. **Stop and hand off**: say the unit is closed, that this is the moment to `/clear`, and print the next unit's
   opening prompt as a filled-in fenced block (the *Hand off, don't roll on* note).

Do **not** refresh the root `index.html` per section.

## Session 12 — the proofs

Lattice's session 12, one session, each its own commit:

1. **Character caps**: a Paperback row for every `FIELDS` entry / repeater column, measured with
   `node scripts/limits.mjs <cat> --themes=6`, then `--check` and `--seeds`; a seed must fit its cap. Judgement calls
   in the section's `notes/` file.
2. **Reach**: `scripts/reach.mjs` for `FIELDS[].in` and `IDENTITY_READS` at theme 6.
3. **Inline editing**: `scripts/inline-probe.mjs --theme Paperback --layout 1 --width 1440,768 --check` until
   `inline-probe: PASS`; every slot the page does not draw is an `INLINE_OFF` row with its reason.
4. **Photo editing**: `scripts/photo-probe.mjs --theme Paperback --layout 1 --width 1440,768 --check` (and `--blank`,
   `--drop`); `PHOTO_OFF` for the rest. `focus-probe.mjs --prime --check` for the panel-to-canvas box.

## The end-of-pass sweep

After section 11 and session 12, in one session (Lattice's list is the model):

1. **CLAUDE.md and README.md** where the wording says *six templates* / *the other five*: the template list, the file
   line counts, the flag paragraph, the scheme paragraph, the font note (Bricolage, Figtree, the script face), the
   photography note, and a `notes/templates.md` Paperback section holding its decorative language.
2. **Code comments that make a claim about the template list**
   (`grep -rn "all six\|other five\|six templates" source/src/builder`).
3. **`plans/CONVENTIONS.md`**: fold the *Inherited and used* list in.
4. **One whole-page published check under Paperback**: pick the template, choose Hero, Publish → Open, then every nav
   link, the hamburger at 390 and 768, Book Now, the media player (one trusted click), the gallery, repertoire, map,
   pricing, calendar, form and testimonials controls, the footer's links and pill. The harness has never rendered two
   sections together; eyeball every seam (the hero's rounded foot included) against its real neighbour.
5. **The four header cards** still render and publish; note anything newly broken for layouts 2–4.
6. **`plans/README.md`**: mark the pass closed (merging is the user's call).
7. **Refresh the root `index.html` and `published.html`** (CLAUDE.md, *Commands*): `npm run build:standalone`, the two
   `cp`s, and the two-build digest — **zero rows at themes 0–5, non-zero at theme 6**. Say what the file grew by
   (from 13,030,112 bytes).

## Conventions

### Seen at planning time, per section

*(Filled as each section's session reads its frames. Each entry: the verdict — dress the shared branch · widen the
block · own tree — the geometry that decided it, the copy that stays removed, and the fields it reads.)*

### Settled in session 0 — the foundation

*(open)*

### Settled in sections 1–11

*(open — one block per section, as Lattice's)*

### Open calls — everything the pass hands the user, in one place

*(collected at the sweep; calls 1–3 are written back at session 0)*

## Open questions

1. **Are all eleven the existing layout-1 compositions?** The pictures say yes for every one. The least certain are
   the **bio** (a statement + portrait + side copy: Pop's bio first), the **media** (a list beside a now-playing card
   inside a coloured card) and the **map** (a tilted ring card beside a gig list — Lime's *Compact tile*, with the
   raster map as art). A section that is a new composition is built as an **own-tree block** so no other template moves.
2. **Layouts 2–4 of Paperback** are placeholders. Is there a Batch 2 frame for them, and are they the same template?
   (This plan does not need the answer; the setup modal's cards 2–4 do render.)
3. **Which colours are scheme keys and which are literals?** The hot-pink / magenta chips, the saturated cyan of the
   pricing card, the indigo `#3B308F` vs `#4A3FA3`, the magenta blob behind the calendar's speaker. Read each node's
   `fills` and `explicitVariableModes`; an unbound colour is a named literal and `sem` carries it.
4. **The script face.** Named by no variable; session 0 reads it off `get_design_context` and decides free vs
   stand-in.
5. **The tablet and mobile masters' section order matches the desktop's** — confirmed by height and position at
   planning time, not by layer name. Each section session checks its narrow screenshots before measuring.
6. **`video`** has no Paperback frame. It renders in Paperback's tokens when a user adds it, as on every template
   with cards 1 and 3.
