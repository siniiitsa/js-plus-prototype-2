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
| 0 | *foundation* | `1:2316` | — | `1:10903` | — | `1:12137` | — | `THEMES[6]`, ramp, faces, photos, the flag, the doodle art | done 2ceb233 |
| 1 | `header` | `1:2318` | 1440 × 750 | `1:10905` | 768 × 750 | `1:12139` | 390 × 750 | Yellow ground with a wavy pale-yellow squiggle field, rounded bottom corners; wordmark `Kai Mercer` + `DJ LIVE`, inline pill nav (desktop only), pink Book now + arrow; a **tilted photo card** with tape, a pink `KM` disc, a vinyl-disc sticker, sparkles; a tilted **avatar card**, kicker pills, a ~110 px title with a **pink hand-drawn underline**, six pill chips, a script `Booking 2026` note · **Pop's `HeaderV0`** (tilted card, sticker disc, sparkles) or **Lime's `HeaderV0` block** as the twin of the card and chips — read both before choosing | done `bc8b2bf` |
| 2 | `bio` | `1:2397` | 1440 × 832 | `1:11004` | 768 × 1213 | `1:12191` | 390 × 1211 | White; a huge two-line statement `Reads the room.` left, a tall tilted portrait with tape over a blush blob, a vinyl doodle and sparkles, **About** + copy + black `Full bio →` pill right, script `KM bio`, `that's me! ↷`, and `DJ · Live act Manchester`, a `001 · Structure · Bio_01` chip pair · **new own block** (a statement + portrait + side copy; nothing in the page is Lime's *Flanked portrait*) — check Pop's bio first | done 0bca0d9 |
| 3 | `media` | `1:2450` | 1440 × 1057 | `1:11054` | 768 × 1398 | `1:12240` | 390 × 1361 | A **cyan card** (24 radius, on the white page): script `Top tracks`, a 2-line title, confetti; five numbered white rows (art, title, a coloured `Single` / album chip and a black duration chip, a black play disc; row 2 is yellow with a pink play disc), a black `Soundcloud →` pill; right: a **tilted indigo now-playing card** with art, title, artist, three transport discs, progress and times, a pink music-note disc, script `5 / 5 featured` · **probably Retro's `v0` body re-laid** (the same inventory Lattice's media was) — Lattice's section 3 settled that; read it | done `5dd11d9` |
| 4 | `gallery` | `1:2617` | 1440 × 909 | `1:11239` | 768 × 1429 | `1:12425` | 390 × 1005 | Pale yellow band; script `Media`, title `See us in action`, four **accordion rows** (Gallery open and yellow with a ×, YouTube / Instagram / TikTok with a +); right: a `← Back to beginning` pill, a tilted white-keyline viewer with arrows, a pink tape strip and script `Kai Mercer gallery`, seven thumbnails (the picked one ringed pink) · **Lime's *Photo viewer* inventory** (source rows + viewer + strip) | done d171480 |
| 5 | `repertoire` | `1:2689` | 1440 × 1067 | `1:11313` | 768 × 1067 | `1:12499` | 390 × 1656 | A **yellow card with an orange blob** on the white page; script `Repertoire`, `240 songs` + a heart-in-vinyl disc, a pill search, four chips (`All` black), a **two-column dense** list of 6 + 6 white pill rows (number, title, a coloured artist chip), a pager of round buttons · **Lime's *Two-column dense*** inventory | done 9d0796c |
| 6 | `map` | `1:2822` | 1440 × 983 | `1:11471` | 768 × 983 | `1:12654` | 390 × 983 | **Indigo** band with squiggle and confetti; script `Shows / coverage`, `Manchester` at ~110 px, a yellow `120 mile radius` pill; a **tilted lilac card** with concentric dashed rings, a pink dot, script `home turf` + an arrow, a white foot `Based in Manchester` / `120 mi standard · further on request`; right: `Upcoming gigs` · `05 of 12`, five white rows (a coloured date tile, title, `Town · time`, a pink `Sold out` or black `Tickets` pill), a pager · **Lime's *Compact tile*** (the raster map is the rings art) | done bdcbd52 |
| 7 | `pricing` | `1:2968` | 1440 × 1067 | `1:11610` | 768 × 1479 | `1:12793` | 390 × 2037 | White; script `Pricing`, a 3-line title, sparkles, a yellow **Solo / Trio / Band** pill toggle; **three tilted coloured cards** (lilac, pink, cyan) each with name, a big price, copy, ticked features and a black `Book this set →` pill, a yellow star-in-disc badge on the featured one; a script small-print note · **Lime's pricing** inventory (probably its own tree) | done e8cbb16 |
| 8 | `calendar` | `1:3131` | 1440 × 835 | `1:11793` | 768 × 676 | `1:12975` | 390 × 910 | A **blush card** on the white page: black arrow discs and `June 2025`, a month grid of white rounded cells (the picked day pink with an **indigo hand-drawn circle**), script `pick your night!`; right: a yellow tilted speaker tile on a magenta blob, a headphone disc, confetti, script `Your night, your playlist`; a white foot bar `Enquiry for Thursday, June 12 at 9:00pm` + pink `Continue →` · **Lime's *Scheduler*** | done d0f28e7 |
| 9 | `form` | `1:3269` | 1440 × 687 | `1:11931` | 768 × 898 | `1:13112` | 390 × 1193 | One card: an **indigo context panel** (avatar, name, `DJ · Live band`, a 3-line headline, three ticked promises, a lilac blob) + an **orange form** (name, email, date, guests, event-type chips with `Wedding` black, message, black `Book now →`), a yellow chat-bubble disc on the corner · **Lime's *Split context + form*** | done 558de06 |
| 10 | `testimonials` | `1:3354` | 1440 × 730 | `1:12016` | 768 × 730 | `1:13198` | 390 × 730 | Pale yellow with **two yellow waves**, outline trophies, sparkles; a **tilted white quote card** (script `Reviewed 6 days ago`, the quote at ~48 px, a pink name chip, a cyan role chip), a pink-ringed star disc, two black arrow discs · **Lime's *Stacked tag card*** inventory (as Lattice's) | done 3d19e85 (floor fix 3d6223f) |
| 11 | `footer` | `1:3395` | 1440 × 487 | `1:12081` | 768 × 798 | `1:13263` | 390 × 876 | Indigo; the name, **eight link pills** (About … Reviews), a tilted photo with a `KM` disc and sparkles, **`Join the guest list` + an email box + `Subscribe →`** (new), a rule, `© 2026 Kai Mercer` and `A JustPay product` · **Lime's footer** + a newsletter block no template has (call 2) | done f4b2edd (name fit fixed in adc0f4e) |
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

**Settled: A, every standing removal holds (user call, 2026-11-20).** A script eyebrow or note is drawn only where a seeded, uncased, drop-when-emptied `FIELDS` field already exists for it.

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

**Settled: A, not drawn (user call, 2026-11-20).** The freed seat is the photo's.

No template has a footer sign-up, and the builder has no backend: the form's submit is a `mailto:` (`notes/form.md`).
- **A (recommended): not drawn.** The footer prints what `notes/footer.md` already has (name, link pills, photo,
  Book pill, copyright, *A JustPay product*); the freed seat is the photo's.
- **B: drawn as a picture, inert** — a box that cannot be typed in on the canvas *and* in the published tab. Rejected
  as default: a dead input in a published page is a lie to the visitor.
- **C: a live `mailto:` sign-up** — heading, label, placeholder and button become seeded `FIELDS`, with caps, ledger
  rows and a `UrlInput`-style address check; the published button opens a mail to the artist with the visitor's
  address in the body. Real scope (≈ the calendar wizard's mailto, JP-053), so a session of its own.

### 3. The template's name

**Settled: `Paperback` (user call, 2026-11-20).**

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
5. **The four header cards** render and publish with all eleven sections each, in their `pageOrder(i)` (card 2: repertoire before gallery and the map after the calendar; card 3: repertoire, calendar, gallery, pricing, map; card 4 as card 1; the video, with no playable link, is left out of the published page). `modalCards` 4, no console error on any card (the WebGL software-fallback warnings are the map's, environment noise). **Setup cards 2–4** (layouts 2–4) were also walked at **1440, 768 and 390** by the scratch script: **no horizontal overflow, the burger opens, a menu link and Book Now scroll to their section and close the menu, no error**; and viewed at 1440 as a quarter-scale page picture each: legible and complete. Newly broken at layouts 2–4: **nothing the pass introduced**; the rough edges are the placeholders' (the 27 wide seeds, two mid-word name breaks and Pop's / Lime's colours, listed under *Open calls*, *Found by session 12 and the sweep*, with the source not traced).
6. **`plans/README.md`**: mark the pass closed (merging is the user's call).
7. **Refresh the root `index.html` and `published.html`** (CLAUDE.md, *Commands*): `npm run build:standalone`, the two
   `cp`s, and the two-build digest — **zero rows at themes 0–5, non-zero at theme 6**. Say what the file grew by
   (from 13,030,112 bytes).

## Conventions

### Seen at planning time, per section

*(Filled as each section's session reads its frames. Each entry: the verdict — dress the shared branch · widen the
block · own tree — the geometry that decided it, the copy that stays removed, and the fields it reads.)*

**1 · header — own tree, `PaperbackHero`** (session 1, 2026-11-20; frames `1:2318` · `1:10905` · `1:12139`, all 750 tall).
Neither Pop's nor Lime's `HeaderV0` matches: the frame is a squiggle field on a yellow band with a rounded foot, a 6°
tilted photo card (450 × 560 at 1440) carrying tape and three sparkles, a pink `KM` disc, a vinyl sticker, a −4° avatar
card, a Bricolage ExtraBold name at lh .8 with a hand-drawn underline, and six chips. Pop's layout-1 hero is a centred
stage on a flat ground; Lime's is a framed photograph with the name over it — no shared ancestor, so dressing either
would move five other templates. Stands after the hooks in `HeaderV0` (`if (s.paperback) return <PaperbackHero …/>`), like
Lattice's. **Draws what the standing rules leave:** hamburger left (the 768 frame's is on the right), Book Now right (the 390
frame draws none), no wordmark / `DJ LIVE`, no inline pills, no kicker / location pills, no `Booking 2026` script note (call 1
of session 0). **Fields it reads:** `title`, `tags` / `showTags`, `badgeMode` (→ `showBadge` / `badgeSpin`), `badgeText`, `image`,
`avatar`, `cta1` / `bookTo`. `align` is hidden (`Paperback: []`): the collage has no centred variant.

**2 · bio — own tree, `PaperbackBio`** (session 2, 2026-11-20; frames `1:2397` · `1:11004` · `1:12191`, 832 / 1213 / 1211 tall). Pop's
layout-1 bio is a centred stage with a turning sun; Lime's is an arch-topped photograph between two flanks. Neither draws what this
frame does: a 411 x 600 portrait on a keyline card turned -4 degrees with a yellow tape strip, over a blush blob, a vinyl doodle with
burst lines and three sparkles, a Bricolage head at 100.8 / 62 / 40, `About` + the paragraph + a black split `Full bio` pill, and a
script role line. No shared ancestor, so dressing either would move five other templates. Stands in `Bio` ahead of Lime's block on
`s.v0 && s.paperback`, after Lattice's line. **Draws what the standing rules leave:** no script `KM bio`, no `that's me!` with its arrow
(no field carries either), no `001` / `Structure · Bio_01` chips (the initials eyebrow and `refLabel`, removed 2026-11-11); their
seats stay as padding. **Fields it reads:** `heading`, `para1`, `cta` (the pill), `badgeMode` (the vinyl), and the header's `kicker` /
`location` as the derived role line. `para2`, `tag`, `credit`, `since*`, `cta2` and the labels are not read at layout 1.

**3 · media — own tree, `PaperbackMedia`** (session 3, 2026-11-20; frames `1:2450` · `1:11054` · `1:12240`, 1057 / 1398 / 1361 tall). The plan predicted
*Retro's `v0` body re-laid*; the frame does not draw it. It is a **cyan card** (radius 40, `scheme/2/box3`) on the white page, 48.96 / 26.11 / 12 in from the edges,
holding a confetti field (a 24-dash vector set per width, the desktop one already `ART.confettiMedia`; the other two added to `paperbackArt.jsx` this session), a
Bricolage ExtraBold 800 head at 95.04 / 59 / 38 (lh .82, -0.035em), three sparkles, five **white pill rows** (24 radius, 84 tall on a 94 pitch: a number, a 14-radius cover,
the title at 26 / 26 / 18, a release chip and a duration chip, a 44 play disc; the marked row yellow with a pink disc), a split black `Soundcloud` pill, and a **394 x 460 indigo
card turned 3 degrees** (a 5px white keyline sleeve, the title at 40 / 32 / 26, three round transport discs, a yellow progress bar, two clocks) with a pink **music-note disc**
turned 10 degrees on its corner. Retro's v0 is a stack; Lime's and Lattice's are flush hairline rows beside a card on a ground; none draws a card on the page, chips in the rows
or a tilted player, so dressing any of them would move other templates: **own tree**, dispatched in `Media` after the hooks and seam like Lattice's. **Draws what the standing
rules leave:** no `Top tracks` script, no `5 / 5 featured` script (removed 2026-11-12), and **no ring text on the disc** (the frame draws `NEW MIX · EVERY MONTH` at 768 and 390 and
nothing at 1440; no field carries it, call 1), so the disc is the same pink ring, white disc and note at every width. The kicker's seat (the 56 above the head) stays as padding
(the bio's convention), so every number stays the frame's. **Fields it reads:** `heading`, `tracks` (title, sub), `soundcloud`. `cta`, `chipLabel` are not read at layout 1.
**Named departures:** the marked row is the card's track (`at`), not the frame's row 02 (Lattice's rule), and the card names the cued track, not the frame's *Night Rain*;
a marked row's yellow chip goes white (yellow on yellow is no chip); the chip colours follow the row's index (yellow, cyan, magenta, ink, orange), not the release.

**4 · gallery — own tree, `PaperbackGallery`** (session 4, 2026-11-20; frames `1:2617` · `1:11239` · `1:12425`, 908.8 / 1428.5 / 1004.9 tall). The plan predicted *Lime's Photo viewer inventory*;
the inventory is the same (source rows, a back link, a viewer with two arrows, a seven-tile strip) and the picture is not. Lime's rows are filled capsules beside a bare photograph at radius 80;
Lattice's are ruled boxes with a mono face. This frame is **four 24-radius rows (the open one yellow with a `×` disc, the others white with a `+` disc), a white pill back link, a 6px white-keyline
viewer turned 2 degrees with a pink tape strip (130 x 30, turned 40), three sparkles on its left edge and two white arrow discs at its foot, and seven 16-radius tiles each turned a few degrees
(the picked one ringed in 4px pink)**, on a pale-yellow band (Scheme 1, the root's own ground: no card, so no card margin). The rows and the strip draw at all three widths (no icon-only
tiles, no sliding window: the 390 frame draws all seven at 40). No shared ancestor, so **own tree**, dispatched in `Gallery`'s `if (s.v0)` after the seam like Lattice's, handed the same
`{ at, marked, strip, go, srcRows, srcAct, video, player }`. **Draws what the standing rules leave:** the script `Media` is `kicker` (seeded empty, so drawn only when typed, in the frame's seat
with its -6 degree turn); the credit script is `railLabel` alone (`Gallery`, the name that stood over it is gone: 2026-11-12), so `Kai Mercer gallery` prints as the artist's one line.
**Fields it reads:** `images`, `kicker`, `heading`, `railLabel`, `backLabel`, `sourceLabel` (printed at **every** width here), `youtube` / `instagram` / `tiktok`.
**The photograph.** The frame's viewer picture is **none of the seven** (it is the `PAPERBACK_VIEWER` file: a wide shot of the singer crouching, not one of the strip's crops), and the viewer can
only ever show a slot (`Back to beginning` and the arrows walk slots). The canvas draws slot 2 (the tile the frame rings) in the viewer, so **the seed's slot 2 is the viewer's photograph**:
`PAPERBACK_PHOTOS.gallery[1]` is `paperbackViewer`, in place of `paperbackShot2` (which the media's second cover still uses). The 85px thumbnail differs from the frame's by that one picture; the 660px
viewer is the frame's. Recorded under *Open calls*.

**5 · repertoire — own tree, `PaperbackRepertoire`** (session 5, 2026-11-20; frames `1:2689` · `1:11313` · `1:12499`, 1067 / 1067 / 1655.9 tall). The plan predicted *Lime's Two-column dense* inventory; the inventory is
the same (a count head, a search, a chip row, two columns of six rows, a pager) and the picture shares nothing with it. Lime's rows are flush hairline rules, Pop's pills ring a violet ground, Lattice's are ruled
boxes; this frame is a **yellow card (radius 40, `scheme/1/box2`) on the white page** (48.96 / 26.11 / 24 in from the edges, 64 inside it on every side) with an orange blob (`ART.blobOrange`, 460 at (1002 / 376 / 2, -140),
clipped by the card), a Bricolage ExtraBold 800 count at 106.56 / 66 / 43 (lh .82, -0.035em), a **132 / 104 white disc turned -10 degrees** (a 2px ink ring, an inner ring, a pink heart) hung off the heading's
end at 1440 and 768 and above it at 390, a white 56-tall pill search with a 2px ink ring, white 44-tall chip pills (the active one ink), **twelve 60-tall white pill rows** (a 14px number in 40 / 22, the title at 22 / 22 / 20,
**a 26-tall artist chip in one of seven colours by the row's place**) in two columns 20 apart (12 apart; 28 at 390 where it is one column of twelve), and a pager of 44-tall round and pill buttons. Twelve songs a page at
every width (Lattice's rule: `perPage` 12, two columns at 768, one at 390). No shared ancestor, so **own tree**, dispatched in `Repertoire`'s `if (s.limeTree)` ahead of Lattice's, handed the same `g`.
**Draws what the standing rules leave:** no script `Repertoire` (no field carries it; its 54 / 52 / 49 seat stays as padding, the bio's convention) and **no ring text on the disc** (the frame prints `REQUESTS WELCOME · 240+ SONGS`
at 768 and 390 only; no field carries it, call 1, as the media's disc). **Fields it reads:** `heading` (the count by default), `songs` (title, artist, tags: the chip row). `length`, `sets` are not read.
**Where the frame's type shrinks to keep a word whole** (768's *Superstition* at 17, *September* at 16, *Uptown Funk* wrapped) the title box is a container and its text is `min(1em, 100cqi / ems)`, `ems` the widest word in
Bricolage's table (`vm.songs[].ems`, the head's rule per row), so the frame's own behaviour holds at the seed and a longer title shrinks rather than outrun its chip. The chip never wraps (it ellipsises at 55% of the row).

**6 · map — own tree, `PaperbackMap`** (session 6, 2026-11-21; frames `1:2822` · `1:11471` · `1:12654`, all 983 tall). The plan predicted *Lime's Compact tile* (the raster map as the rings art); the inventory is the same (a count-less head with a
radius pill, a coverage card with a foot, a gig panel of five rows, a pager) and the picture is not. Lime's tile is a raster map in a ringed card beside flush hairline rows; Lattice's is a dotted bowl over a ruled foot beside boxed rows. This frame is an
**indigo band (Scheme 3, the section's own ground: no card, so no card margin) with a 20-piece confetti set per width, a 120.96 / 75 / 48 Bricolage head with three sparkles hung off its end, a yellow `120 mile radius` pill (right at 1440 and 768,
under the head at 390), and a 657 x 539 lilac card (radius 24) turned -2 degrees**: at 1440 the card is a 657 x 447 rings art (`ART.rings`, the pink dot at its centre) over a 92-tall white foot (`Based in Manchester` in orange Bricolage 26, the terms
in indigo Figtree 14) with the `home turf` arrow (90) beside the dot; at 768 and 390 the **card is the white foot alone** (716 x 92 / 342 x 89, the rings and the arrow clipped away, only the arrow's last 16px peeking over the top edge, which is
drawn the same way so the frame's own artefact stands). The panel is a `Upcoming gigs` / `05 of 12` row, **five 24-radius white pill rows** (a 64-wide date tile in one of five colours, the venue in Bricolage 22 / 22 / 20 over `City · time`, a
black `Tickets` or pink `Sold out` chip, 81 / 78.3 / 76.5 tall, 10 apart) and a pager (a white round arrow, three 40 page rings the current one yellow, a yellow round arrow). No shared ancestor, so **own tree**, dispatched in `EventsMap`'s `if (s.v0)` after
the seam ahead of Lattice's, handed the same `g` (`shown`, `lit`, `onPick`, `win`, `onPage`, `onStep`). **Draws what the standing rules leave:** no script `Shows / coverage` (removed 2026-11-12; its 43-tall seat stays as padding, the bio's convention),
no script `home turf` (no field carries it, call 1; the arrow that points from it **is** drawn), no `Sold out` chip (no field, as Lattice's), and `Tickets` only on a row with an address (JP-045), so the **seeded rows, which carry none, draw no chip**. The
`05 of 12` is derived (`shown` of `gigs`, two digits each), never typed. The real map is not mounted (the frame draws art; Lattice's call): no tiles, no Photon request from the canvas. **Fields it reads:** `heading` (the town, a `titleWordEms` fit),
`listLabel`, `base`, `terms`, `gigs` (venue, city, time, month, day, link) and the derived `vm.mapRadius`. `radius`, `rings`, `kicker`, `stats`, `place` and `miles` still feed the derived copy only.

**7 · pricing — own tree, `PaperbackPricing`** (session 7, 2026-11-21; frames `1:2968` · `1:11610` · `1:12793`, 1067.4 / 1478.6 / 2037.2 tall). The plan predicted *Lime's pricing inventory (probably its own tree)*; the inventory is the same (a head, a chip row,
a three-up deck of cards with name, unit, price, blurb, ticked features and a Book pill, a small-print line) and the picture shares nothing with it. Lime's card is one flat `box/2` card in a 3px ring, Pop's layout-1 deck is three 50-radius seats with a starburst, Lattice's are
ruled boxes with a bar. This frame is **three 24-radius cards (500 tall at every width) turned -3 / +2 / -2 degrees about their own centres, one colour each (lilac, pink, cyan), on the white page** (Scheme 2, the section's own ground: no band, no card margin), a Bricolage ExtraBold 800
head at 77.76 / 48 / 38 (lh .85, -0.035em) in a 665.05 / 429.39 / 342 measure with three sparkles 16 off its right edge (the 390 frame's stand outside the 342 box and are clipped by the page, as drawn), a pale-yellow (`O[9]`) pill toggle 52 tall (4 apart, 42-tall tabs, the lit one ink; right of the
head and bottom-aligned at 1440 and 768, under it at 390), cards of padding 28 / 21 / 16 holding the name (Figtree Bold 18) and unit (13, 80%) in one row, the price in the display face at 72 / 48 / 38 (lh .8), a 16 semibold blurb, a list of ticked rows (a 19 disc, the tick in the card's own colour) and the
split Book pill (the shared `PaperbackPill`, ink, 48 tall) pinned to the card's foot; a **128 / 128 / 104 yellow star-in-disc badge turned 12 degrees** on the featured card's top-right corner (centre (right -23.9 / -50.1 / -54, top +6 / +8 / +8.1)); the small print is a Caveat script turned -1 degree.
Columns: three at 1440, **two at 768 with the third card spanning both**, one at 390, 28 apart (the frames' 27.7). No shared ancestor, so **own tree**, dispatched in `Pricing`'s `if (s.limeTree)` after the seam and ahead of Lattice's, handed `{ shown, active, pressChip }`, so the published filter, `tierBookTo` and the `s.live` gate are the shared ones.
**Draws what the standing rules leave:** no script `Pricing` (the `[ PRICING ]` eyebrow was removed 2026-11-12; its 58 / 56 / 53 seat stays as padding, the bio's convention), **no ring text on the badge** (the 768 and 390 frames print `MOST BOOKED` round it, the 1440 frame nothing; no field carries it, call 1, the media's disc), and no lit tab at rest (JP-089: the frame lights *Solo*,
a lit chip that filters nothing would mislead). **Reads:** `heading`, `tiers` (name, price, blurb, feats, tags for the filter), `unit`, `rowCta` (seeded `Book this set`, the frame's word, for Paperback layout 1), `sub`. The seeds are already the frame's: `TIERS` is House Party £450 / Wedding Set £650 / Festival Set £1,200 and the Solo / Trio / Band tags
(`tiersSeed` returns `TIERS` for Paperback, as for Lattice).

**8 · calendar — own tree, `PaperbackCalendar`** (session 8, 2026-11-21; frames `1:3131` · `1:11793` · `1:12975`, 835 / 676 / 910 tall). The plan predicted *Lime's Scheduler*; the inventory is the same (a month head with two arrows, a weekday row, a seven-column
month grid, a picture half, a foot with the enquiry line and a Continue button) and the picture shares nothing with it. Lime's is a 55-radius panel in a ring with a photograph; Lattice's is a ruled card with a dotted torus. This frame is a **40-radius blush card (`box/2`,
Scheme 2's own `s.box2`) on the white page** (48.96 / 26.11 / 24 in from the edges; the section's vertical padding is 141.1 / 70 / 24, the 1440 frame being a 835 min-height with the card centred) holding **two 603 / 302 / 294 halves 40 apart at 1440 and 768 and stacked at 390**:
left, a 44 round black disc each side of `June 2025` (Bricolage ExtraBold 800 at 52 / 42 / 34, lh .9, -0.035em, centred between them), a 30-tall weekday row (Figtree Bold 13, indigo `s.text3`) and a seven-column grid of **48-tall white 14-radius cells 6 apart** (the picked one `s.ac` pink under white type, ringed
by the **indigo hand-drawn circle**, a 116 x 72 stroke whose loop is drawn narrower at 768 and 390); right, a **magenta blob** (`ART.blobMagenta`, 420), a **256-square yellow tile turned -4 degrees** (`scheme/1/box2`, radius 24) holding the 200 speaker, a **102 white disc turned -10 degrees** (a 3px ink ring) holding the headphones, and
a 14-dash confetti set per width; and a foot: **a white 68-tall pill** (a 128-tall 24-radius card at 390) with the enquiry line in Figtree Bold 17 / 17 / 15 and the split `Continue` pill (`PaperbackPill`, 10 in from the foot's right edge; under the line at 390). No shared ancestor, so **own tree**, dispatched in `Calendar`'s `if (s.v0)`
after the seam ahead of Lattice's, handed the same `g = { month, cur, line, step, pick }`, so the published arrows, day picking and the Continue link are the seam's. **Draws what the standing rules leave:** no script `pick your night!` and no script `Your night, your playlist` (no field carries either, call 1; the
first's seat is the empty cells under day 30, the second's the corner above the tile). **Fields it reads:** `open`, `booked` (through the month and the cells), `time` and `prompt` (through the line), `cta` (the Continue label, seeded `Continue` as Lattice's, `in` widened). `heading` and `image` are not read at layout 1 (the month is the head; the right half is art),
so both `in` rows name Paperback `[1, 2, 3]` / `[3]`.

**9 · form — own tree, `PaperbackForm`** (session 9, 2026-11-21; frames `1:3269` · `1:11931` · `1:13112`, 687 / 897.6 / 1192.7 tall). The plan predicted *Lime's Split context + form*; the inventory is the same (an avatar row, a head, three
promises, a context half beside or over a form half: two pairs of boxes, a chip row, a message, a submit) and the picture shares nothing with it. Lime's block is a 55-radius shell round 999-radius pills and a hairline, widened already for Grunge, Editorial and Pop through
one `G` object; this frame is **one 40-radius card made of an indigo panel (Scheme 3, `#3B308F`) and an orange form (Scheme 4, `#F9A12B`)** on the white page (Scheme 2, the section's own ground: no band, no card margin), the indigo clipped over a 360 `blobIndigo` (`sem/box/1` `#4A3FA3`),
**8-radius white boxes in a 2px ink ring (the message box 24)**, 999-radius chips (the lit one ink under white), a split ink Book pill, and a **110 / 90 / 70 yellow chat-bubble disc turned 8 degrees on the form's top-right corner** (its centre 21 / 59 / 27 in from the form's right edge and 15 / -1 / -5 from its top,
so it overhangs the card's top edge at 1440 and the seam at 768 and 390: nothing clips it). Dressing Lime's block would be a fifth arm in a shared object; **own tree**, dispatched in `EnquiryForm` after the seam ahead of Lattice's, handed the same `g` as Lattice's, so the boxes, the chip, the mailto, the refusal and the sent state are the seam's. The halves are **447.34 | 894.72 at 1440** (the panel fixed, the form the rest) and
**stacked at 768 and 390** (the panel on top, 338.22 / 341.69 tall: padding 34 / 28 top and foot, 30 / 20 aside, 24 between its blocks). The form half pads 40 / 34 / 28 top and foot and 40 / 30 / 20 aside, **16 between rows at 1440 and 768, 28 at 390**; pairs stand 16 apart and stack at 390. The panel: a 58 avatar (3px white ring, 52 photograph), the name (Figtree Bold 16) over the role (13, 80%), the head in
Bricolage ExtraBold 800 at 52 / 42 / 34 (lh .86, -0.035em) in the content box, three promises (a 24 yellow disc with a ticked glyph, Figtree SemiBold 16, 10 apart). **Draws what the standing rules leave:** nothing removed: the frame prints no eyebrow, no script and no ring text, so every word on it is a field the form already reads, and **the seeds are the frame's own** (`Let's make your night unforgettable.`, the three promises, the
four boxes, the five chips, `Message`, `Tell me about your event…`). **Fields it reads:** `heading`, `promises`, `fields`, `types`, `typeLabel`, `message`, `messageLabel`, `button`, `image` (the avatar), the header's name and `kicker` (the role line). `photo`, `para`, `steps`, `sub`, `price*`, `bookings`, `cta`, `note` and `available` are other layouts'.

**10 · testimonials — own tree, `PaperbackTestimonials`** (session 10, 2026-11-21; frames `1:3354` · `1:12016` · `1:13198`, all 730 tall). The plan predicted *Lime's Stacked tag card* inventory; the inventory is the same (one card on show, two pills
that are the attribution, two arrows) and the picture shares nothing with it. Lime's block is a card on two coloured backs with a grain and a torn edge, Lattice's a ruled box on a dot field. This frame is a **pale-yellow band (Scheme 1, the section's own
ground: no card margin) with a yellow wave floor (`scheme/1/box2`, one 310-tall vector pinned to the foot, its curves stretched to the width: 180 / 96 / 48.75 control spacing is the 1440 path's x scale exactly), two outline trophies (110 turned -12 degrees at (256.6, 145.0) /
(162.5, 145.0) / (109.6, 145.0), 90 turned 10 degrees at (1164.6, 605.0) / (600.1, 605.0) / (282.6, 605.0), each centre read off the design context's `left` / `top` + half the wrapper), and a white 24-radius card turned -2 degrees** about its centre, 720 x 273 at 1440,
572 x 240 at 768 and 342 x 244 at 390 (padding 40 / 30 / 20 across, 40 / 34 / 28 top, 20 between the script, the quote and the chips). The card holds a Caveat Bold script (`quotes.when`, turned -3 degrees about its own centre: 28 / 25 / 23, `text/3` indigo), the quote
in Bricolage ExtraBold 800 at 48 / 38 / 32 (lh .9, -0.035em), a pink `who` chip (white type) and a cyan `role` chip (ink), both 26 tall, 10 aside, Figtree Bold 13, 8 apart. A **124 / 124 / 104 star disc turned 8 degrees** hangs off its top-right corner (centre 16 / 16 / 38 in from the
right edge and 8 / 8 / -2 from the top: a pink ring, a white disc, the yellow star), and three sparkles stand at its lower-left corner (44 yellow, 26 pink, 16 white, at (-54, 245) / (-12, 223) / (-2, 271) in the card's own box at 1440, the other two widths 33 / 31 / 29 higher; clipped by the page at 390). Two arrow discs: 48 black
circles at the page gutter (48.96 / 26.11) at 1440 and 768, the card 24 off each at 768, and **a centred pair under the card at 390** (12 apart, 20 below it). No shared ancestor, so **own tree**, dispatched in `Testimonials`'s `if (s.limeTree)` after the seam
and ahead of Lattice's, handed `{ q, paging, step }`, so the published arrows (wrapping at both ends, not drawn at one review) are the seam's. **Draws what the standing rules leave:** the 768 and 390 frames' ring text `FIVE-STAR HOSTS • REVIEWED •` is not drawn (no field carries it, call 1, the media's
disc); `Reviewed 6 days ago` **is** drawn, because `quotes.when` is exactly that field (seeded, uncased, dropped when emptied) and the plan's table was wrong that the `kicker` was its only home. **Fields it reads:** `quotes` (quote, who, role, when); `heading`, `sub`, `stars`, `rating` and `cta` are layouts 2-4's.

**11 · footer — own tree, `PaperbackFooter`** (session 11, 2026-11-21; frames `1:3395` · `1:12081` · `1:13263`, 486.59 / 798.47 / 876.27 tall). The plan predicted *Lime's footer inventory with the Lattice footer's shape, and no newsletter*; the inventory is
Lime's (a name, the sitemap, a Book entry, a small-print row on a rule) and the picture shares nothing with it. Lime's and Lattice's footers set the name over a closing statement in two link columns; this frame is an **indigo band (Scheme 3, `#3B308F`, the section's
own ground: no card margin) holding the name in Bricolage ExtraBold 800 at 44 / 35 / 29 (lh .9, -0.035em), the sitemap as a wrapping row of pills (the frame draws EIGHT, not the plan's seven: About, Top Tracks, Media, Repertoire, Shows, Pricing, Enquiries, Reviews; 44 tall,
radius 999, white at 12%, Figtree Bold 14, 16 aside, 6 apart both ways: the frames wrap them one row at 768, two at 1440 and three at 390, which is what the 6 gap and the container's own width give the frame's `Shows`; the seed prints the shared `Shows/Coverage` (`navLabel('map')`, Lattice's call: the artist's copy is not forked), which is wider, so the seeded 768 page wraps to two rows where the frame draws one (an Open call). The wrap is the flow's: the rows are not typed), a photograph on a 351 x 280 keyline card
(4px white, radius 24, 262 wide at 390) turned -8 degrees about the centre of a 431 / 431 / 342 x 300 box, a 98 indigo disc with a 3px white ring and the artist's initials (Bricolage 800 at 35 / 32 / 29) 10 in from the box's right edge at the top, three sparkles (44, 26, 16 at (6, 242), (48, 220), (58, 268)), and a 1px full-bleed rule at white 30% over
`© 2026 Kai Mercer` / `A JustPay product` in Figtree Bold 13.** The newsletter (`Join the guest list`, the email box, `Subscribe →`) is not drawn (call 2: A). Its pink split pill is `PaperbackPill`'s own shape, so **the Book pill (the footer's `cta`, the shared link to `vm.bookTo`) is seated where the frame seats that pill's family: pink, under the link pills**;
the newsletter's column is the photo's: at 1440 the photo is centred in the two columns the frame gives the photo and the form (the frame's 3-column grid is 431.36 x 3, 24 apart, so the photo's seat is the middle one and the freed one is the right), at 768 and 390 the photo is the last block, centred, and the band ends 32 under the small print as the frame's does. Frame paddings: top 72 / 58 / 43, foot 32, the rule 48 under the content, the
small print 18 under the rule. No shared ancestor, so **own tree**, standing at the head of `Footer` on `s.limeTree && s.paperback` ahead of Lattice's (`Footer` owns no hook, `notes/footer.md`). **Draws what the standing rules leave:** no statement (the frame draws none, so `FIELDS.footer.statement` takes a `Paperback: []` row and the panel does not offer it), no newsletter, and the credit is the constant (`A JustPay Product`; the frame sets a lower-case p, one letter, an Open call: the credit is the platform's byline, a literal on purpose). **Fields it reads:** the header's name (`vm.brand`, `IDENTITY_CHARS.footer.title`), `links` (read ROW BY ROW from `vm.footerLinks`, so the wrap is the frame's, not the halved columns), `cta`, `showBadge` (Show / Hide on the initials disc), `copyright`, and **a new `image`** (the photograph: `FIELDS.footer.image`, `in: { Paperback: [0], '*': [] }`,
seeded `PAPERBACK_PHOTOS.footer` = shot 4). Open: the right column's freed seat and the Book pill's seat are this verdict's calls, not the frame's; both are collected under *Open calls*.

### Settled in session 0 — the foundation

Commit `2ceb233`, branch `paperback-layout-1`, 2026-11-20. The three opening calls are written under decisions 1–3 above.

**Scheme table and seats.** The frames reuse the SAAS variable library: collections *2 · Scheme*, *1 · Primitives*
(Paperback is mode `187:3`) and *0 · Device*. A node's mode is what `get_variable_defs` resolves, so each colour was
followed through its alias chain with Primitives set to Paperback (the default mode is Lattice's). The pages bind
Scheme 2; the plan's "indigo scheme" is Scheme 3, and its "Scheme-2-ish" is the white page.

| Scheme | Ground | Accent | Ink | Seats |
|---|---|---|---|---|
| 1 (the theme's own) | `#FAED8F` pale yellow | `#F8158F` | `#0B0B0B` | header, gallery, testimonials |
| 2 | `#FFFFFF` | `#F8158F` | `#0B0B0B` | bio, media, video, repertoire, pricing, calendar, form |
| 3 | `#3B308F` indigo | `#F9A12B` | white | map, footer |
| 4–9 | `#F9A12B` / `#F8158F` / `#9982DE` / `#FD48F2` / `#0B0B0B` / `#FAED8F` | | | nested nodes only, read `s.onScheme[n]` |

`SCHEMES_OF.Paperback` rows 0–3 are identical (the other layouts copy row 0). A tint no scheme key holds stays a named
literal: `#1CE8ED` / `#A4F6F8` cyan, `#FFDBFD` blush, `#FFD24A` yellow. Scheme 1's `sem` carries `text3` `#3B308F`, which
`s.tx` is not. `pageGround` is `#FFFFFF`: the page behind the sections is white, so the gutter, the published
`documentElement` and `vm.pageBg` read white through `pageGroundOf()` (verified in the picker's spotlight and the editor).

**Faces.** Display Bricolage Grotesque ExtraBold (800) at −3.5 % tracking; label, UI and body Figtree Bold / SemiBold at
−1 %; script **Caveat Bold**, free, so no stand-in call. `faceK` is 1: `font-optical-sizing: auto` measured within about
0.8 % of the frame (Figma's codegen says `opsz` 14; the browser's auto matches the render). One combined `family=` entry
per face in `index.html` and `preview.html`; `published.html` loads none. `vm.script` is `T.script ?? T.body`.

**Ramp** (`THEME_RAMP.Paperback`; desktop is the frame × 0.82, as the canvas draws it):

| Key | mobile | tablet | desktop |
|---|---|---|---|
| dispXl / dispLg / dispMd / dispSm | 55 / 38 / 38 / 34 | 86 / 59 / 48 / 42 | 113 / 78 / 64 / 43 |
| title / list | 26 / 18 | 32 / 26 | 33 / 21 |
| labelLg / Md / Sm / Xs | 24 / 20 / 16 / 13 | 26 / 22 / 16 / 13 | 21 / 18 / 13 / 11 |
| bodyLg / Md / Sm / chip / eyebrow | 18 / 16 / 13 / 13 / 15 | 18 / 16 / 13 / 13 / 15 | 15 / 13 / 11 / 11 / 12 |
| scriptLg / Md / Sm | 26 / 26 / 23 | 31 / 29 / 25 | 28 / 26 / 23 |

**Flag and gate inventory.** `sectionVm` carries `paperback: T.name === 'Paperback'`, with `designed` and `limeTree`
widened to it, so layouts 1–4 render Lime's tree in Paperback's tokens until each section's own tree is written
(`Paperback*`, per section, as Lattice's). Every other `Lattice` / `lattice` hit was classified:

- **Done:** `THEMES[6]`, `SCHEMES_OF`, `headerFamily` / `HEADER_COUNT` / `HEADER_NAMES` (four named cards), `specAt`'s
  Pop fallback (now `Lattice` or `Paperback`), eight header `in` rows (a template an `in` object does not name reads the
  field, so each got `Paperback:` equal to Lattice's), the ramp, the flag, `designed`, `limeTree`, `script`.
- **Left on `s.lattice` on purpose (110+ sites in `EncoreSection.jsx`, `EncoreBuilder.jsx` lines 596–663, 977–987, 1085,
  1540, 1781, 2185, 2362):** the `Lattice*` trees and their view-model keys (dot fields, the disc mask, `latticeEms`
  fits). They are Lattice's artwork; Paperback gets its own trees per section.
- **No row needed:** `limeTreeTheme` (per-section seeds), `titleWordEms`, `footerWordEms` and `navFace` (no Bricolage
  advance table; a fit that needs one is that section's call), `navGapEm`, `gigDark`, `grainSrc`, Pop's inset block.
  One consequence found and fixed: the testimonials' `wordEms` read `navFace` under `limeTree` alone and threw for
  Paperback (`navFace` is null); it is now guarded on `navFace`. Line 1519 (the calendar's layout-1 heading seed) reads
  Lime's under `limeTree && !lattice`, so Paperback shows Lime's seed until section 9 sets its own.
- **Later sections write them:** `TITLE_SITES` (uses `?.`; no row falls to the base), `badgeOptsFor` (section 1),
  `INLINE_OFF` / `PHOTO_OFF` (none yet; they have no fallback, so the first `inline-probe` / `photo-probe` run per page
  reports `UNLEDGERED` and the page's session ledgers it), `IDENTITY_CHARS` and every `chars` / `count` / `num` spec
  (Pop's row through `specAt` until measured), `CAL_CTA_LATTICE`.

**Photography.** Eleven new JPEGs in `source/src/builder/photos/paperback-*.jpg` (a seventh shoot, none shared with Retro,
Pop or Lattice), 959,840 bytes raw, about 1.28 MB as base64 in the inlined build, re-encoded at 1152 px q50 (avatar 512 px
q60), against Lattice's +1.10 MB. The real growth of root `index.html` (13,030,112 bytes) is measured at the sweep's
refresh, since this session does not refresh it. `photos.js` is the only importer: `PAPERBACK_PHOTOS` (header and video the
hero, bio the portrait, form shot 3, gallery shots 1–7, pricing `REVIEWERS`), `PAPERBACK_TRACK_ART` (shots 1–5),
`PAPERBACK_VIEWER` (the gallery viewer's own picture), `SEEDS.Paperback` (avatar the avatar card, photo the hero). The
footer's photograph is **shot 4**, read by section 11. Every slot is a centred cover, so `FOCUS` needs no entries yet.

**Doodle art.** `source/src/builder/paperbackArt.jsx`, pure SVG and no effect: `PaperbackArt` (blobs, vinyl, arrows, circle,
speaker, headphones, chat, note, heart, star, trophy, underline, confetti ×3, rings, wave, play), `PaperbackSparkle` (one
16-unit path at every size) and `PaperbackWaves`. The hero's squiggle field is one 5,935-curve path at all three widths
(only the viewBox differs: the tablet frame centres it, the mobile frame is the same path 189 units left, desktop scales it
1.28), rounded to a tenth and written relative: 271 KB in the frames, 138 KB here. Arrows left and right are lucide's.

**Hero height.** The frames draw the header **750 tall at every width** (the plan's predicted 614 at desktop is not what
the frames show). Section 1 settles whether `heroH` is 750 at desktop behind the `paperback` flag.

**Tooling.** `digest.mjs` / `build-digest.mjs` / `shots.mjs` take theme indices (default `0,2,3,4`, unchanged);
`photo-aspect.mjs` and `limits.mjs` had hard-coded lists, now ending in Paperback / `6`; the headers of `focus-probe`,
`inline-probe` and `photo-probe` name the template. `preview.jsx`'s `Z` copy needs nothing (ramps are laid over it).

**Proof.** The builder opens with seven templates (the filmstrip scrolls), picking Paperback reaches the editor with the
setup modal showing the four named header cards, and no page error or console error fired. Every category at three widths
renders at theme 6 (45 renders, 0 bad). Digest of every category at three widths at themes 0–5, before vs after:
**864 of 864 identical** (after normalising the second server's port and Vite's `?t=` cache-buster on image URLs).
`npm run build` passes. Root `index.html` was **not** refreshed.

### Settled in sections 1–11

**1 · header** — `bc8b2bf`, 2026-11-20. Verdict under *Seen at planning time*. What was built and how it was proved:

- **`PaperbackHero` + `PaperbackPill` / `PaperbackBurger` / `PaperbackVinyl`** (`EncoreSection.jsx`, just above `HeaderV0`), dispatched
  `if (s.paperback)` after Lattice's line. A stage `div` (`containerType: inline-size`, `s.surplus` in from the hero's edges) holds
  every layer; `u(v)` turns a frame px into `cqw` of it, so the collage keeps its proportions on a canvas narrower than the frame.
  The frame's numbers sit in `PAPER_HERO` (desktop 1440, tablet 768, mobile 390 — **frame px, not x 0.82: the stage's width does the
  scaling**, so the desktop number is the frame's own). The photo card is a 450 x 560 box turned 6 degrees about its centre, its
  tape and sparkles positioned in the box's own coordinates; centre = container.xy + (265, 280). Name and chips are one bottom-anchored
  flow column (`foot` 72 / 58 / 43), so a longer name grows upward and the chips wrap. Hero 750 tall at 768 and 390
  (`vm.heroH = 750`, gated `design 0`); the desktop `heroH` (614) is the frame's 750 x .82 less a pixel and stays.
- **Title.** Bricolage ExtraBold 800, -0.035em, lh .8, `TITLE_SITES.Paperback[0]` (W 524.8 / 531.7 / 342, 113 / 86 / 55), fitted by
  `bricolageEms` (a per-face advance table made with `WEIGHT=800 node scripts/ems-table.mjs`, <=1% over the DOM; the face in
  `EncoreBuilder.jsx` subtracts the tracking, 0.035 em a glyph). The underline is `ART.underline` stretched to 84 / 86 / 90% of the
  last word, right-aligned (the frame's is 56% of the seed's whole name).
- **Bar.** Hamburger left, split Book Now right (`PaperbackPill`: a label box and, 3 apart, a 48 square, both `s.ac`, radius 8, Figtree Bold
  16), at every width; the open menu's `MenuPanel` takes a Paperback arm (white nav pills, `menuColours` -> `[s.bg, s.tx]`).
  Root `cardOnPage` gains `s.hd && s.v0 && s.paperback` so the rounded foot shows the page's white, not the band's own colour.
- **Badge.** Three states as the standing rule: Rotating spins the vinyl's ring (`seal-spin` on a `<g>` about the disc's centre),
  Static does not, Hidden drops the KM disc and the vinyl both. The ring text is `badgeText` (the artist's name by default) and **is
  drawn at 1440 as well as 768** — see Open calls. The vinyl is one svg (disc, ring, nested `PaperbackArt vinylMini`), so the builder's
  seal rule (`start.closest('svg')`) opens the box from a click anywhere on it.
- **Fields.** `align` hidden (`Paperback: []`); `badgeText` read at layouts 1 and 4 (`Paperback: [0, 3]`); header `title` cap
  `Paperback: [14, 80, 80, 80]`; `INLINE_OFF` rows `Paperback.0–3.header.kicker`, `.location` and `Paperback.1.header.tags`.
- **Proof.** `inline-probe` header at layouts 1–4, 1440 and 768: PASS (layout 1: 9 slots hit, 0 WRONG / MISSING / COVERED). `photo-probe`
  layouts 1–4 PASS, layout 1 also `--blank` and `--drop`. `focus-probe --prime` layouts 1–4 PASS. `limits.mjs header --themes=6 --check`: the
  title cap above, and **layout 2's `faceTitle` fails at 20 at 768 — a placeholder card on Pop's row, left for the layout-2 pass**. Digest of themes 0–5, three
  widths: **864 of 864 identical**, positive control (theme 6 header, desktop) differs at layout 1 and its folded alias 5 only. `npm run build` passes.
  Root `index.html` not refreshed.

**2 · bio** — `0bca0d9`, 2026-11-20. Verdict under *Seen at planning time*. What was built and how it was proved:

- **`PaperbackBio`** (`EncoreSection.jsx`, ahead of `Bio`), `PAPER_BIO` its frame numbers. One stage (`containerType: inline-size`, the whole
  section, overflow hidden) with `u(v)` in cqw, as the hero; **the stage's own padding is in a child**, since a container's own lengths do not
  resolve against it. Desktop is the frame's 96 / 640 / 96 (832 tall) with three columns seated at x 48.96 / 504.27 / 1073.43; 768 and 390 stack
  head, portrait and About with the frames' gaps (36 / 35.625 and 28 / 28), top 77 / 58 and foot 50.4 / 58 (1213.1 and 1211.6 tall against 1213 and
  1211.3). `EncoreBuilder.jsx` sets `vm.pad = '0px <surplus>'` for the Paperback layout-1 bio, so the root pads only the published tab's surplus.
- **Head.** Bricolage ExtraBold 800, -0.035em, lh .82, `vm.titleWordEms` (the widest word in `bricolageEms` less the tracking, set for the
  Paperback bio alone) fits it to the 431.34 column (the width at 768 / 390), `min(u(size), column / ems)`. It wraps `Reads the / room.` at
  desktop and sits on one line at 768 and 390, as the frames. The `KM bio` script's and the chip row's seats are kept as 42 / 39 padding above
  and 40 below the head at the narrow widths, so the blob and the portrait keep the frame's relation.
- **Portrait.** A 411 x 600 (322 x 600 at 390) card at (10, 10) in its column, 6 keyline, radius 24, turned -4, the tape (118 x 30, `s.onScheme[1].box2`
  at .9, turned 3, centred on the card's top edge), the vinyl (130, turned -16, centre (15, 585)) and the sparkles 44 / 26 / 16 at the frame's seats
  (pink `s.ac`, tape yellow, lilac `s.chips[0].bg`). The blob is `ART.blobBlush` shifted: its vector sits at (139.5, 0) in the desktop 560 box and at
  (68.9, 67.4) in the narrow ones, so the narrow svg boxes are at (175.07, 107.38) and (54.13, 107.38).
- **Badge.** The vinyl is the bio's badge: Rotating turns its disc (`vinylDisc`, a `seal-spin` `<g>`; the burst lines stay), Static does not, Hidden drops the
  vinyl and leaves the sparkles (decoration, not a badge). Measured in the harness: 1 / 0 / 0 `seal-spin`, 1 / 1 / 0 vinyl.
- **Copy.** `About` is a literal (Lattice's precedent; `aboutLabel` is layout 3's bracketed label). The pill is `PaperbackPill` with `bg = s.tx`, `fg = PAPER_WHITE`,
  its label `vm.bioCta`: `FIELDS.bio.cta` is now read at layouts 1 and 2 for Paperback (`in: { Paperback: [0, 1], '*': [1] }`), seeded `BIO_CTA_PAPERBACK`
  `Full bio` in `sectionVm` and in `fieldSeed` (the calendar's `Continue` shape), cap 16, uncased, dropped when emptied. The role line is `vm.roleLine`
  at desktop (one line, 30 px Caveat in a 318 box) and `kicker` / `location` on two lines at 768 and 390 (27 / 25 px, the frames' break).
- **Caps** (`limits.mjs bio --themes=6 --designs=0`, then `--check`: 0 failing; `--seeds`: 0 over): `heading` 15 at layout 1 (390 binds, the seed's own; 17 at 1440, 25 at 768),
  `who.kicker` 13 (measured 12 at 1440; the cap is the seed, reported `floor`), `who.location` 17, `cta` 16, `para1` 390 (open at 400). `FLOOR_AT['bio.heading']` gains
  `Paperback: [0]` (the 75% floor the other fitted heads take; it moved nothing here). Layouts 2–4 still read Pop's rows.
- **Proof.** `inline-probe` bio at layouts 1–4, 1440 and 768: PASS (layout 1: 3 slots hit, 0 WRONG / MISSING / UNREACHED / UNLEDGERED, nothing to ledger). `photo-probe`
  layouts 1–4, 1440 and 768: PASS; layout 1 also `--blank` and `--drop` (the vinyl and the big sparkle cover 3 of 130 points of the photo, as an icon over a photo does everywhere).
  `focus-probe --prime --check` layouts 1–4: PASS. Geometry at three widths read against the frames: head, paragraph, pill, About and the section heights agree to a pixel.
  Digest of themes 0–5 at three widths, before vs after: **1005 of 1008 identical across themes 0–6 at three widths** (after stripping the second server's port and Vite's `?t=`); the three that differ are theme 6, bio, layout 1, the intended change, so themes 0–5 are 864 of 864. Root `index.html` not refreshed.

**3 · media** — `5dd11d9`, 2026-11-20. Verdict under *Seen at planning time*; the full record is `notes/media.md`, *Paperback · layout 1*. What was built and how it was proved:

- **`PaperbackMedia`** (`EncoreSection.jsx`, ahead of `Media`), `PAPER_MEDIA` its frame numbers, dispatched `if (s.v0 && s.paperback)` after Lattice's line, handed the same seam as Lattice's. The bio's stage pattern: frame px verbatim at all three widths in cqw,
  vertical insets in a child, `vm.pad = '0px <surplus>'` (now `bio` and `media`). Section heights 1057 / 1398.7 / 1361.3 against the frames' 1057 / 1398 / 1361; the card, head, rows, pill column and the player's turned bounding box agree to a tenth at all three widths.
- **Art.** `confettiMediaTablet` and `confettiMediaMobile` added to `paperbackArt.jsx` (the frames' three 24-piece sets differ per width); the disc is drawn from circles and `ART.note`.
- **Head fit.** `vm.titleWordEms` is set for the Paperback media as for its bio; the head wraps and fits to the room left of the sparkles (`free` 423 / 282 / 192) — `limits.mjs` found it overlapping them at 11 characters when it wrapped at 5.4em.
- **Fields and caps.** Reads `heading`, `tracks`, `soundcloud`. `heading` 20, `tracks.title` 17, `sub` 33 (all at their seeds: `--check` 0 failing, `--seeds` 0 over); `IDENTITY_CHARS.media.title.Paperback[0]` 41. `INLINE_OFF` `Paperback.0.media.tracks.sub` and, for the placeholder cards, `.1`–`.3` (Pop's reasons).
- **Proof.** `inline-probe` media layouts 1–4, 1440 and 768: PASS (layout 1: 6 slots hit, 0 WRONG / MISSING / UNREACHED / UNLEDGERED). `photo-probe` layouts 1–4 PASS, layout 1 also `--blank` and `--drop`. `focus-probe --prime` layouts 1–4 PASS. Live (`&live=1`, a trusted click on row 3): the `<audio>` loads
  SoundHelix 3, the row marks, the player names it, the clock runs, Pause pauses, Next steps to the following track and Previous back (Slow Burn -> Echo & The Floor -> Manchester at 3am); the wrap at either end was not exercised. An emptied list (canvas and live) draws the *No tracks yet.* row, the player naming it on an initials sleeve, an empty bar, and the transport is inert with nothing thrown; a stored list with a title-only row, a long `sub` and a short one keeps all three rows at 84 at 390, the long chip ellipsising. Digest of themes 0–6 at three widths, before vs after (HEAD in a worktree on :5190, `?t=` and the port stripped): **1005 of 1008 identical**; the three that differ are theme 6, media, layout 1, the intended change, so themes 0–5 are 864 of 864.
  `npm run build` passes. Root `index.html` not refreshed.

**4 · gallery** — `d171480`, 2026-11-20. Verdict under *Seen at planning time*; the full record is `notes/gallery.md`, *Paperback · layout 1*. What was built and how it was proved:

- **`PaperbackGallery`** (`EncoreSection.jsx`, ahead of `Gallery`), `PAPER_GALLERY` its frame numbers, dispatched `if (s.paperback)` in `Gallery`'s `if (s.v0)` after the seam, handed the same `g` as Lattice's. The bio's stage pattern, `vm.pad` line extended to `gallery`,
  `vm.titleWordEms` extended likewise. Section heights 908.8 (+0.4) / 1428.8 / 1004.8 against the frames' 908.8 / 1428.5 / 1004.9; the head, rows, back pill, viewer's turned box and the tiles agree to a tenth at all three widths.
- **The viewer's photograph.** The frame's viewer picture (`PAPERBACK_VIEWER`) is none of the seven, so `PAPERBACK_PHOTOS.gallery[1]` is now that file and the canvas draws tile 2 (the frame's ringed one) picked. *Open calls*.
- **Fields and caps.** Reads `images`, `kicker` (drawn only when typed, as the frame's script `Media`), `heading`, `railLabel` (the credit script), `backLabel`, `sourceLabel` (every width), the three social addresses. `limits.mjs gallery --themes=6 --designs=0`
  then `--check --extra-lines=railLabel,backLabel,sourceLabel`: 0 failing; `--seeds`: 0 over. `heading` 16 (floor), `kicker` 25, `railLabel` 18 and `sourceLabel` 36 (two lines each, as the frame draws them), `backLabel` 34 as everywhere. `FIELDS.gallery` gains a `Paperback` row for each.
- **Proof.** `inline-probe` gallery at layouts 1–4, 1440 and 768: PASS (layout 1: 4 slots hit, 0 WRONG / MISSING / UNREACHED / UNLEDGERED), so **no `INLINE_OFF` row was needed** (nothing the layout reads is undrawn; the kicker is seeded empty and the probe does not count it). `photo-probe` layouts 1–4 PASS
  (layout 1: 7 slots at both widths, filled, `--blank` with 7 appended, `--drop`). `focus-probe --prime` layouts 1–4 PASS, so **no `PHOTO_OFF` row either**. Live (`&live=1`, a youtube and an instagram address): a tile click opens its slot and moves the ring, the arrows and the back link walk slots,
  the YouTube row swaps the viewer for the player and the Gallery row's `×` goes to the YouTube row with it, the TikTok row (no address) is not rendered, Instagram is an outbound link. An empty list draws seven initials tiles and the viewer on `KM`; typed over-cap copy at 390 wraps the credit to three lines and the source row to two without moving a tile. Digest of themes 0–6 at three widths, before vs after (HEAD in a worktree on :5190, `?t=` and the port stripped): **996 of 1008 identical**; the twelve that differ are theme 6, gallery, all four layouts at three widths (layouts 2–4 because the seed's slot 2 changed), so themes 0–5 are 864 of 864. `npm run build` passes. Root `index.html` not refreshed.

**5 · repertoire** — `9d0796c`, 2026-11-20. Verdict under *Seen at planning time*; the full record is `notes/repertoire.md`, *Paperback · layout 1*. What was built and how it was proved:

- **`PaperbackRepertoire`** (`EncoreSection.jsx`, after `LatticeRepertoire`), `PAPER_REP` its frame numbers, dispatched in `Repertoire`'s `if (s.lattice || s.paperback)` after the seam, handed the same `g` as Lattice's. The bio's stage pattern; `vm.pad` and `vm.titleWordEms` extended to `repertoire`;
  `perPage` 12 at every width, two columns at 1440 and 768, one at 390 (`pageWindow` keeps 4 numbered buttons at the two wide widths). The card, head, disc, search, chips, rows and chips agree to a pixel at all three widths (seed state: 994.5 / 995.0 / 1525.9 against the frames' card heights).
- **`songs` is lowercase** for Paperback (`240 songs`): `vm.title`, `vm.repCountTitles` and `fieldSeed`'s fallback say it in step. **Per-song title fit**: `vm.songs[].ems`, Bricolage's table times 1.13 (the table is read at 1000 px; 17-22 px type sets about 12% wider), so a long title shrinks as the frame's does and never breaks inside a word.
- **Fields and caps.** Reads `heading`, `songs` (title, artist, tags). `limits.mjs repertoire --themes=6 --designs=0`, then `--check --extra-lines=songs.title`: 0 failing; `--seeds`: 0 over. Heading 13, song title 17 (floor), artist 22, tags 4 x 18. `FIELDS.repertoire` gains `Paperback` rows for `heading` and `songs.artist`.
- **Proof.** `inline-probe` repertoire at layouts 1–4, 1440 and 768: PASS (layout 1: 25 slots hit); `INLINE_OFF` `Paperback.0.repertoire.songs.length`, `.1` / `.3` `songs.length` and `.2` `songs.artist` (Pop's reasons). `photo-probe` and `focus-probe --prime` layouts 1–4 PASS. Live, 37 songs: paging, chips, search and the no-match row all work;
  the pager (1440 y 856.3, 390 foot 122.2) reads the frame's. Empty list draws *No songs yet.*; a long stored title shrinks and an over-long artist ellipsises. Digest of themes 0–5 at three widths, before vs after: **864 of 864 identical** (themes 0–5, three widths, after stripping the second server's port and Vite's `?t=`). Root `index.html` not refreshed.

**6 · map** — `bdcbd52`, 2026-11-21. Verdict under *Seen at planning time*; the full record is `notes/map.md`, *Paperback · layout 1*. What was built and how it was proved:

- **`PaperbackMap`** (`EncoreSection.jsx`, before `EventsMap`), `PAPER_MAP` its frame numbers, dispatched in `EventsMap`'s `if (s.limeTree)` after the seam and ahead of Lattice's, handed `g` (`shown`, `at0`, `lit`, `onPick`, the compact pager window and, live, the page and step closures). Frame geometry agrees at all three widths (head, pill, list label, rows, the -2 degree card's bounding box, the pager at x 996.5 / y 810.5 with twelve gigs, section 982.99 at 1440).
  `vm.pad` and `vm.titleWordEms` extended to `map`; the head's fit takes a per-width `fit` (1 / 1.033 / 1.0745) over the ems table, because the table is read at 1000 px; `vm.gigs[].line` is the composed `city · time`.
- **Fields and caps.** Reads `heading`, `listLabel`, `base`, `terms`, `gigs` (venue, city, time, month, day) and the derived `mapRadius`. `limits.mjs map --themes=6 --designs=0` then `--check` and `--seeds`: 0 failing, 0 over. Heading 11, base 25, terms 44, list label 30, venue 25, city 28, time 23, month 8, day 4; `FIELDS.map` gains a `Paperback` row for each.
- **Proof.** `inline-probe` map at layouts 1–4, 1440 and 768: PASS (layout 1: 29 slots hit), **no `INLINE_OFF` row needed**; `photo-probe` and `focus-probe --prime` layouts 1–4 PASS, no `PHOTO_OFF`. Live (twelve gigs, odd rows with addresses): rows light, the pager walks 1 to 3 and clamps, counts read `05 of 12` / `02 of 12`, tile colours continue across pages, chips only on rows with an address. Empty list draws *No upcoming gigs.*; a long stored venue wraps in the row and a title-only row keeps its tile.
  Digest of themes 0–5 at three widths, before vs after: **864 of 864 identical** (themes 0–5, three widths, after stripping the second server's port and Vite's `?t=`). Root `index.html` not refreshed.

**7 · pricing** — `e8cbb16`, 2026-11-21. Verdict under *Seen at planning time*; the full record is `notes/pricing.md`, *Paperback · layout 1*. What was built and how it was proved:

- **`PaperbackPricing`** (`EncoreSection.jsx`, before `Pricing`), `PAPER_PRICING` its frame numbers (cols, head, tabs, card padding, badge, small print) and `PAPER_PRICE_TURN` the cards' tilt, dispatched in `Pricing()` after the seam with `g = { shown, active, pressChip }`, so the chip filter and the Book pills are the shared seam's. Frame geometry agrees at all three widths (desktop cells at x 170.1 / 544.4 / 918.6, card 499.6 tall, badge centre within 1 px; section 874.5 against the frame x .82's 875.2; 1479.3 / 2037.8 against 1478.6 / 2037.2).
  `vm.pad` and `vm.titleWordEms` extended to `pricing`; `vm.tierRowCta` seeds *Book this set* (`PRICING_ROW_CTA_PAPERBACK`, `fieldSeed` in step).
- **Fields and caps.** Reads `heading`, `tiers` (name, price, tags, blurb, feats), `unit`, `rowCta`, `sub`. `limits.mjs pricing --themes=6 --designs=0 --upright`, then `--check --upright` and `--seeds`: 0 failing, 0 over. Heading 46, name 29, price 10, `price.num` 7 (box 9 / 11 / 14, held to Pop's), tags 3 (item cap unbounded at desktop, 44 at mobile), feats 35 x 15, unit 11, rowCta 34, sub 80. **`limits.mjs` gains `--upright`** (`&upright=1`): it sets every turned HTML box upright before measuring, because a deck turned up to 3 degrees has bounding boxes wider than its lines and a wide numeral then "overlapped" the name row above it; without it the price cap read 4, under its 6-character seed. Use it for any turned deck or card (the testimonials, the calendar's tile).
- **Proof.** `inline-probe` pricing at layouts 1–4, 1440 and 768: PASS (layout 1: 30 slots hit, 6 derived `tiers[].tags` ledgered); layout 4 needed one `INLINE_OFF` row, `Paperback.3.pricing.unit`. `photo-probe` and `focus-probe --prime` layouts 1–4 PASS (pricing has no photo slot, no `PHOTO_OFF`). Live (`&live=1`): a tab filters, a second press clears, the Book pills link `#form`. Empty list draws *No packages yet.*; one, four, a title-only package, a no-digit price and an unbroken feature all render without overflow at three widths. Digest of themes 0–5 at three widths, before vs after: **864 of 864 identical**. `npm run build` passes. Root `index.html` not refreshed.

**8 · calendar** — `d0f28e7`, 2026-11-21. Verdict under *Seen at planning time*; the full record is `notes/calendar.md`, *Paperback · layout 1*. What was built and how it was proved:

- **`PaperbackCalendar`** (`EncoreSection.jsx`, before `Calendar`), `PAPER_CAL` its frame numbers, dispatched in `Calendar`'s `if (s.v0)` after the seam in the branch Lattice's shares (`s.limeTree && (s.lattice || s.paperback)`), handed `g = { month, cur, line, step, pick }`, so the arrows, day picking, un-picking and the Continue link are the seam's. Frame geometry agrees at all three widths (section 835 / 676 / 909.9 against 835 / 676 / 910; card, month, first / picked / last cell, circle, blob, disc, enquiry line and Continue pill to a tenth).
  `vm.pad` extended to `calendar`; `calMonths[].ems` is Bricolage's table less the tracking for Paperback's layout 1 (the month fit, `fit` 1.09 / 1.115 / 1.125, measured over all 24 months).
- **Art.** `confettiCalendarTablet` and `confettiCalendarMobile` and `circleTablet` and `circleMobile` added to `paperbackArt.jsx` (the frames draw a set per width, the circle a narrower loop at 768 and 390); the desktop ones were session 0's and matched the frame's SVGs.
- **Fields and caps.** Reads `open`, `booked`, `time`, `prompt`, `cta`. `limits.mjs calendar --themes=6 --designs=0 --upright`, then `--check` and `--seeds`: 0 failing, 0 over. `time` 24, `prompt` 36, `cta` 12 (measured 34, held). `FIELDS.calendar` gains `Paperback` rows for `time`, `prompt` and `cta` chars and for `image`, `heading` and `cta` `in`; the `Continue` seed is `CAL_CTA_LATTICE` for both templates.
- **Proof.** `inline-probe` calendar at layouts 1–4, 1440 and 768: PASS (layout 1: `time` and `cta` hit); `INLINE_OFF` `Paperback.0` / `.1` / `.3.calendar.prompt`. `photo-probe` layouts 1–4 PASS, layout 1 also `--blank` and `--drop` (no photo slot). `focus-probe --prime` layouts 1–4 PASS. Live (`&live=1`, a booked day): a booked day is dimmed and takes no click, a pick lights the day and a second click unlights it, *next* walks to July (the lit day gone, the line unchanged) and *prev* returns, both arrows stop dimmed at the window's ends (May 2027), Continue links `#form`. An emptied `cta` drops the pill and the 390 foot's minimum; a booked opening day prints the prompt; a six-row month (March 2025) grows the grid alone; every month of the window (24) fits its box at 768 and 390 (`fit` 1.09 / 1.115 / 1.125, walked with the arrows; June stays 34 at 390 and is 41.3 at 768 against the frame's 42); live-off (the canvas) the section has no `href` and a day click changes nothing; an emptied `cta` at 390 leaves a 68-tall foot and a 850 section.
  Digest of themes 0–6 at three widths, before vs after (HEAD in a worktree on :5190, `?t=` and the port stripped): **1002 of 1008 identical**; the six that differ are theme 6, calendar, layouts 1 and 3 (folded onto 1) at three widths, the intended change, so themes 0–5 are 864 of 864. `npm run build` passes. Root `index.html` not refreshed.

**9 · form** — `558de06`, 2026-11-21. Verdict under *Seen at planning time*; the full record is `notes/form.md`, *Paperback — layout 1*. What was built and how it was proved:

- **`PaperbackForm`** (`EncoreSection.jsx`, before `EnquiryForm`), `PAPER_FORM` its frame numbers, dispatched in `EnquiryForm` on `s.v0 && s.limeTree && s.paperback` after the seam and ahead of Lattice's, handed the seam in `g` (`at`, `msg`, `ti`, `errs`, `sent`, `Pill`, `pillLink`, `onSubmit`, ...). `PaperbackPill` took `as` / `tagProps` so the submit is the seam's pill in Paperback's dress.
  `vm.pad` and `vm.titleWordEms` extended to `form`. Section heights 686.9 / 897.6 / 1192.6 against the frames' 687 / 897.6 / 1192.7; panel and form rects, head, promises, labels, boxes, chips, message, button and the bubble agree to a tenth at all three widths (chips about 0.3 px narrow; Book Now wider by its case).
- **The head's `fit` is 1.12 at every width**, not a per-width 1.07 / 1.078 / 1.09: the table is read at 1000 px and a word shrunk to 20-52 px sets 7-12% wider, so smaller sizes need the larger fit (a 34-letter word broke mid-word at 390 on the per-width numbers). The seed's word never shrinks.
- **Fields and caps.** Reads `heading`, `promises`, `fields` (label, placeholder), `types`, `typeLabel`, `message`, `messageLabel`, `button`, `image`. `limits.mjs form --themes=6 --designs=0 --upright`, then `--check --upright` and `--seeds`: 0 failing, 0 over. Heading 41, label 45, placeholder 34, types 6 x 15, promises 5 x 29 (seed is the floor), message 37, `typeLabel` / `messageLabel` 45, button 34, identity title 60 / kicker 37.
- **Proof.** `inline-probe` form at layouts 1-4, 1440 and 768: PASS (layout 1: 21 slots hit); `INLINE_OFF` `Paperback.1.form.fields.placeholder` and `.2.` (Pop's reason). `photo-probe` layouts 1-4 PASS, layout 1 also `--blank` and `--drop` (the avatar; no `PHOTO_OFF`). `focus-probe --prime` layouts 1-4 PASS. Live (`&live=1`): a refusal (alert line, `aria-invalid`, pink border, focus on Name), a valid mailto with the picked chip, the date mask, the sent state holding the card's height, *Write another* keeping the typed values. Emptied `fields` / `promises` / `types` / `heading`, an odd five-field list and over-long copy render whole at all three widths.
  Digest of themes 0-6 at three widths, before vs after (HEAD in a worktree on :5190, `?t=` and the port stripped): **1005 of 1008 identical**; the three that differ are theme 6, form, layout 1 at three widths, the intended change. `npm run build` passes. Root `index.html` not refreshed.

**10 · testimonials** — `3d19e85` (the wave floor fixed in `3d6223f`), 2026-11-21. Verdict under *Seen at planning time*; the full record is `notes/testimonials.md`, *Paperback · layout 1*. What was built and how it was proved:

- **`PaperbackTestimonials`** (`EncoreSection.jsx`, before `Testimonials`), `PAPER_TESTI` its frame numbers, dispatched in `Testimonials`'s `if (s.limeTree)` after the seam and ahead of Lattice's, handed `{ q, paging, step }`, so the arrows, their wrap and the not-drawn-at-one rule are the seam's. `vm.pad` extended to `testimonials`; `vm.quotes[].wordEms` is Bricolage's table less the tracking times 1.12 for Paperback layout 1. Frame geometry agrees at all three widths (the stage is 598.2 tall at 1440 against 730 x .8194; the quote's font 39.33 against 48 x .8194; the card, disc, sparkles, trophies and arrows read against the frames' screenshots, the 390 quote breaking `Professional from / the first email to the / last encore.` as the frame).
- **The wave floor is the outer box's CSS background** (full-bleed over the root's surplus padding, the svg drawn `fw` x 310 with its aspect free, so the floor is 310 tall at the frame's own width at every width), not a node: as a node `limits.mjs` read a long quote crossing it as an overlap (cap 56), where the card is meant to sit over it. **The sparkles are seated off the card's foot**, so a longer review leaves them at the lower-left corner.
- **Fields and caps.** Reads `quotes` (quote, who, role, when). `limits.mjs testimonials --themes=6 --designs=0 --upright`, then `--check --upright` and `--seeds`: 0 failing, 0 over. `who` 45, `role` 45, `when` 31, `quote` 170 (the shared 190 fails the all-lower-case fourth sample at 390, where nine lines run the card over the foot trophy). `FIELDS.testimonials.quotes.cols` gains a `Paperback` row for each.
- **Proof.** `inline-probe` testimonials at layouts 1-4, 1440 and 768: PASS (layout 1: 4 slots hit, 16 paged); `INLINE_OFF` `Paperback.1` / `.2` / `.3.testimonials.quotes.when` (Pop's reasons). `photo-probe` (no photo slot, no `PHOTO_OFF`) and `focus-probe --prime` layouts 1-4: PASS. Live (`&live=1`): the next arrow walks the five reviews and wraps, the previous arrow steps back, both carry the pointer cursor, and the non-live ones read `auto`. The states (the seed, an emptied list, one review, a long one, a one-word one, a who-less one) were rendered at all three widths: the stage is 598.2 / 730 / 730 tall throughout, the seeded card's turned box reads 579.8 x 260.2 at (94.1, 234.9) at 768 and 350.3 x 256.2 at (19.8, 202.9) at 390 (the frames' 580.0 x 259.8 and 350.3 x 255.8), and one review draws no arrows and keeps the card's seat at 1440 and 768. An emptied list draws *No reviews yet.* in the card; one review draws no arrows and keeps the card's seat at 1440 and 768; a title-only, a who-less and a role-less review, a 190-character review and over-long chips render whole at all three widths; a fitted quote walked over eight awkward single words (a 34-letter word, 24 `W`s, 28 `m`s, `iiii`, a 45-letter word, a mix with digits) at three widths never overflows and breaks inside a word only for the 24-W and 28-m runs at 390.
  Digest of themes 0-6 at three widths, before vs after (HEAD in a worktree on :5190, `?t=` and the port stripped): **1005 of 1008 identical**; the three that differ are theme 6, testimonials, layout 1 at three widths, the intended change, so themes 0-5 are 864 of 864. `npm run build` passes. Root `index.html` not refreshed.

**11 · footer** — `f4b2edd`, 2026-11-21. Verdict under *Seen at planning time*; the full record is `notes/footer.md`, *Paperback — layout 1*. What was built and how it was proved:

- **`PaperbackFooter`** (`EncoreSection.jsx`, ahead of `Footer`), `PAPER_FOOTER` its frame numbers, dispatched at the head of `Footer` on `s.limeTree && s.paperback` ahead of Lattice's line (no hook in `Footer`, so an early return). The bio's stage pattern: frame px in cqw of a container, the paddings in a child, `vm.pad = '0px <surplus>'` (`footer` joins the line). Geometry agrees with the frames at all three widths: section 398.9 at 1440 (486.59 x .82: the 300 box sets it, not the left block), the name at (40.1, 87.9) at 36.06px, the pills 36.1 / 44 / 44 tall and 58.5 / 71.3 / 71.4 wide for `About` (the frames' 71.36 x .82 at 1440), the disc 80.3 / 98 / 98, the small print at y 359.9 (the frame's 439 x .82) and its credit ending at the gutter. **At 390 the pills wrap 3 / 3 / 2 exactly as the frame's** (x 24 / 101.4 / 207.2); at 1440 they wrap 4 / 4.
- **Pink, yellow and ink come off their own schemes** (`onScheme[5].bg`, `[1].box2`, `[8].bg`, as `PaperbackMap`) because the footer's seat is Scheme 3 and `s.ac` there is orange: the first draft's `PaperbackPill` default would have been an orange Book pill. The name's fit is `vm.footerWordEms` (table less the tracking x **1.18**, Paperback alone: the form's 1.12 broke a 37-character run of `W`, `M` or `m` inside the word, found at review and fixed in adc0f4e; `M` needs 1.05 beyond 1.12).
- **Fields and caps.** Reads the name, `links`, `cta`, `showBadge`, `copyright` and the new `image`. `statement` takes `in: { Paperback: [], '*': [0] }`; `links` takes a Paperback hint (a wrapping row, not halved columns); `image` is `in: { Paperback: [0], '*': [] }` (no other template offers a photo box here: the six templates' footer panels list exactly the keys they listed before) and `PAPERBACK_PHOTOS.footer` is shot 4. `limits.mjs footer --themes=6 --designs=0 --upright`, then `--check --upright`: 0 failing; `--seeds`: 0 over. Link label 47, button 36, copyright 34, `IDENTITY_CHARS.footer.title` 37.
- **Proof.** `inline-probe` footer at layouts 1-4, 1440 and 768: PASS (10 slots hit, no `INLINE_OFF` row). `photo-probe` layouts 1-4 PASS, layout 1 also `--blank` and `--drop`; no `PHOTO_OFF`. `focus-probe --prime` layouts 1-4 PASS (19 controls). Live (`&live=1`): the pills are `#bio`, an external `https` link (`_blank`, `noopener noreferrer`) and `#testimonials`, a `none` row has no href, the Book pill is `#form`; on the canvas none carries an href and the Book pill is a span. **States walked at three widths** (no overflow, no pill overlap, no page error): the seed, a 27-letter one-word name (it shrinks to about 24 / 23px at 1440 and 390) and, after the review, single words at the 37 cap (`W` `m` `i` `M` runs and a letters-and-digits mix) at three widths, each on one line, a three-word name past the cap (clamped at 37, wraps to 2 lines at 1440 and 390), a one-letter name, wide initials (`WW`), the badge hidden, the photo removed (the initials on the pink card), 0 / 1 / 10 links (the section is 600 / 668 / 718 tall at 768 and 580 / 648 / 848 at 390), an emptied button, an emptied copyright, an over-long copyright (wraps beside the credit, growing the foot at 390), an unbroken 58-letter link label, and everything emptied at once.
  The rule's bleed is proved with a non-zero surplus (the temporary `&sur=` harness override, reverted). Digest of themes 0-6 at three widths and the footer at `&page=2`, before vs after (HEAD in a worktree on :5190, `?t=` and the port stripped): **1002 of 1008 identical**; the six that differ are theme 6, footer, three widths at page 0 and at `&page=2`, the intended change, so themes 0-5 are 864 of 864. `npm run build` passes. Root `index.html` not refreshed.

### Conventions section 2 (the bio) inherits

- **`PaperbackPill({ s, label, to, ext, u, bg, fg, style })`** is the template's one button: pass `bg` / `fg` for the black Full-bio /
  Soundcloud pills the later sections draw, `ext` for an outward address (`extLink`), `u` for the length unit (`cqw` in a stage, px
  elsewhere). **`PAPER_WHITE`** (`#FFFFFF`) is the frames' white card / sticker ground: a named literal, no scheme key.
- A section picture with tilted cards: use the header's pattern — a `containerType: inline-size` stage, `u()` in cqw, frame px verbatim at
  all three widths, absolute boxes at the frame's centres, children in the rotated box's own coordinates.
- **Art** comes from `paperbackArt.jsx` (`PaperbackArt` takes `x` / `y` through `...rest`, so it nests inside another svg), the chip
  palette is `[chips[0].bg, chips[1].bg, chips[2].bg, onScheme[2].box3, chips[4].bg, chips[5].bg]` with ink / white / ink / ink / ink / white.
- Probes: `--keys` needs quotes in zsh (`'--keys=title,tags[]'`); a digest comparison must strip Vite's `?t=NN` on BOTH sides
  (and the second server's port on the old side); port 5174 may already be taken — pick any free one, and confirm the old tree with
  `curl :PORT/src/builder/data.js | grep` for a symbol only the new tree has. Run `limits.mjs ... --check` as well as the measure:
  the measure's N is not the cap's proof.

### Conventions section 3 (the media) inherits

- **A section's own stage.** The bio's shape is the template for a section that is a picture of tilted cards: `PAPER_<CAT>` frame numbers per width, `u()` in cqw of a
  `containerType: inline-size` stage, vertical insets in a child (a container's own lengths do not resolve against it), `vm.pad = '0px <surplus>'` in `EncoreBuilder.jsx`
  beside the bio's, columns as absolute boxes seated at the frame's x at desktop and flow blocks with the frame's gaps at 768 and 390.
- **Read the frame's `top` / `left` off `get_design_context`, not `get_metadata`**: for a rotated group the metadata's y was 36 px off the code's (the vinyl: 540.4 vs 504.6) and only
  the design context's matched the screenshot. A rotated child's box is the unrotated card at the wrapper's centre; turn it about its own centre.
- **A decoration's colour under a Scheme-2 seat**: tape yellow is `s.onScheme[1].box2` (the seat's own `box2` is blush), the indigo script is `s.text3`, lilac is `s.chips[0].bg`,
  pink `s.ac`, ink `s.tx`. The vm's `s.script` is Caveat; the role note's pattern (`rotate(-4deg)`, a min-height box so the turn is about the frame's centre) is reusable.
- **`PaperbackPill` takes `bg` / `fg`** (the black Soundcloud pill is `bg = s.tx`, `fg = PAPER_WHITE`); its `to` links only under `s.live`.
- **A field the frame draws that the layout did not read** is widened per template with `in: { Paperback: [...], '*': [...] }` and a seed in both `sectionVm` and `fieldSeed`; caps with
  `chars: { Paperback: [...], '*': [...] }`. Add a `Paperback` row to `IDENTITY_CHARS` as an array of every design's cap, not one number, since a template row replaces `'*'`.
- **limits.mjs**: a cap at the seed's own length is reported `floor` and passes; the probe returns only a boolean from `ok`, so a surprising number is debugged by hand with
  `preview.html?...&noclamp=1&cj=<json>`. Run `--check` and `--seeds` after the measure.
- Media's frame is **1:2450** · **1:11054** · **1:12240**; the seed photos are `PAPERBACK_TRACK_ART` (shots 1–5) and `PAPERBACK_VIEWER`.

### Conventions section 4 (the gallery) inherits

- **`PaperbackMedia` is the second own-tree stage after the bio's** and the shape for a section that is a coloured card on the white page: `PAPER_<CAT>` per width, `u()` in cqw, a `margin: 0 u(side)` card with `overflow: hidden` (visible where the frame's does not
  clip: the media's mobile card), vertical insets in a child, `vm.pad = '0px <surplus>'` in `EncoreBuilder.jsx` (`bio` and `media` share the line; add the gallery to it). The **gallery stands on Scheme 1** (pale yellow `#FAED8F` band, not a card): a band is the section's own
  ground, so the root paints it and no card margin is needed; read the frame (`1:2617` · `1:11239` · `1:12425`) for which.
- **Colours inside a Scheme-2 card.** The cyan is `s.onScheme[2].box3`; the yellow `s.onScheme[1].box2`; magenta `s.onScheme[7].bg`, ink `s.onScheme[8].bg`, orange `s.onScheme[4].bg`; indigo `s.text3`; white `PAPER_WHITE`. Chips are 26 tall, 13 Figtree Bold, a 10 inset, radius `s.radiusChip`.
- **Round white discs and glyphs** (the transport arrows, the play triangle, the pause bars) are drawn in `PaperbackMedia`; lift them to a shared helper if the gallery's viewer arrows and the testimonials' disc arrows want them rather than copying a third time.
- **Wrap and fit a head to the room beside its decoration.** Where the frame sets sparkles beside a head's last line, give the head `maxWidth: u(free)` and fit the widest word to the same `free` (`vm.titleWordEms`, extended to the section's `cat` in `EncoreBuilder.jsx`): the probe's `overlap` test measures sparkles as boxes.
- **A row that wraps in a narrow frame keeps the frame's fixed height** by an inset, not a minimum plus padding (the media's rows are 84 at a 2.9 inset): read the frame's content height against its row height before choosing.
- **A marked / cued item is the player's, not the frame's** (Lattice's rule, kept): the gallery's picked tile is `pick`, so the canvas draws the first as picked; check `notes/gallery.md`.
- **Probes need the `INLINE_OFF` rows for layouts 2–4 too** (`Paperback.1`–`.3.<cat>.<key>`), copied from Pop's reasons: the placeholder cards fail `--check` as UNLEDGERED without them. Run `inline-probe --layout 1,2,3,4` once per section.
- The gallery's frame is **1:2617** · **1:11239** · **1:12425**; its photos are `PAPERBACK_PHOTOS` (shots 1–7) and `PAPERBACK_VIEWER`.

### Conventions section 5 (the repertoire) inherits

- **`PaperbackGallery` is the third own-tree stage and the shape for a section on a band**: the stage is the whole section (`containerType: inline-size`, `overflow: hidden`), the vertical insets are in a child, the two columns are a grid at 1440 and a column at 768 / 390 with the frame's gutter, `vm.pad = '0px <surplus>'` (the line in
  `EncoreBuilder.jsx` now names `bio`, `media` and `gallery`; add the repertoire's), and `vm.titleWordEms` is extended to the category in the next line. The repertoire's frame is a **yellow card with an orange blob on the white page** (Scheme 2): the media's card mechanism (`margin: 0 u(side)`, `borderRadius`, `overflow: hidden`), not the gallery's band. Frames `1:2689` · `1:11313` · `1:12499`.
- **A script note that is a rotated box.** The frames' scripts are a box of the column's width (`Media`, 655 x 30) turned about its *centre*, so the text's left end drops by half the width times sin(angle): draw the box at the frame's width and turn it, never the text alone. The credit script is a 104 x 53 box turned 4 degrees. `script(size)` (Caveat 700, lh .95, -0.01em, `s.text3`) is local to `PaperbackGallery`; lift it if a third reader appears (the repertoire's `Repertoire`, the map's `home turf`, the calendar's `pick your night!`).
- **Shared helpers now in the file:** `paperArrow(u, back, ink)` (the round discs' 14px arrow; the testimonials' two black discs are its next reader), `PAPER_TILE` (`#EFEFEF`, the frames' empty-tile ground), `PAPER_WHITE`, `PaperbackSparkle` with the three colours (44 `s.onScheme[1].box2`, 26 `s.chips[0].bg`, 16 `s.ac`), the tape (`s.ac` at .9, `rotate(40deg)`, `clip-path: polygon(3% 0, 97% 8%, 100% 92%, 2% 100%)`).
- **A frame picture that is none of a field's slots.** Where the frame's large picture is not one of its tiles (the gallery's viewer), seed the slot the canvas shows with it (`PAPERBACK_PHOTOS`), rather than a second image field; the repertoire reads no photograph, so this is for the pricing's reviewers and the form's avatar to check against their frames.
- **`limits.mjs` takes `--extra-lines=<keys>` on the `--check` run too**: a key whose frame wraps (a script credit, a row label in a 72-tall row at 390) is measured with the extra line, and `--check` fails it as one-line unless it is given the same flag. Run both with the same flag and write it into the notes.
- **A seed-only field's probe row.** `inline-probe` counts only the slots a seeded page draws: a field seeded empty and drawn when typed (the gallery's `kicker`) is neither hit nor `UNLEDGERED`, so it needs no ledger row; its mark is not needed either (its text is unique).
- The gallery's `INLINE_OFF` / `PHOTO_OFF` rows for layouts 2–4 were not needed: the placeholder cards print every slot they read. A section whose placeholders do not (the media's `tracks.sub`) still does.

### Conventions section 6 (the map) inherits

- **`PaperbackRepertoire` is the fourth own-tree stage and the shape for a section whose frame is a card with a disc and a pager**: `PAPER_<CAT>` per width, `u()` in cqw, vertical insets in a child, `vm.pad = '0px <surplus>'` (`bio`, `media`, `gallery` and `repertoire` now share the line; add the map's). The map's frame is an **indigo band** (Scheme 1 probably, as the gallery's yellow band: read the frame to see whether it is the section's own ground or a card).
- **Hang a decoration off a head by `fit-content`**: wrap the head in a `fit-content` box and seat the disc at `left: calc(100% + u(x))`, so it follows the words (the repertoire's `240 songs` and its disc). Measure the offset against the real hugging width, not the frame's container, which is wider.
- **Nested `cqw`**: inside a nested `containerType: inline-size` box `cqw` resolves against that box. To fit a word to its box set the font-size on the container itself and use `min(1em, calc(100cqi / ems))` on the child (the repertoire's titles).
- **Small type sets wider than the ems table reads**: `titleWordEms` is a 1000 px table; at 17–22 px multiply by about 1.13 (measured 1.109–1.121) or a word breaks inside itself where the frame shrinks it.
- **`PaperbackRepertoire`'s pager** (round 44 buttons from `paperArrow`, page pills with the active one ink, `…` as a 44 cell) is the model for the map's pager: it draws only with more than one page and the card's foot grows by it then (`pagerFoot`), so the seeded section has no seat for it. The 390 frame's pager is `space-between` at 44 wide.
- **Row colours by place**: the repertoire's artist chips take `[lilac, pink, yellow, cyan, magenta, ink, orange]` repeating (the frame's), pink and ink with white type; the map's date tiles and `Sold out` / `Tickets` pills are the frame's own colours, read them off the design context.
- **Inline-probe's `--check` for layouts 2–4 needs `INLINE_OFF` rows** only for slots the placeholder cards do not draw (`songs.length`, `songs.artist` for the repertoire): run `--layout 1,2,3,4 --cat map` once and copy Pop's reasons for what it names.
- The repertoire's frame is **1:2689** · **1:11313** · **1:12499**; the map's is **1:2822** · **1:11471** · **1:12654**. `limits.mjs` caps: pass `--extra-lines=<keys>` to the measure and the `--check` alike.

### Conventions section 7 (the pricing) inherits

- **`PaperbackMap` is the fifth own-tree stage and the shape for a section with a head plus two columns on a band**: `PAPER_<CAT>` per width, `u()` in cqw, vertical insets in a child, `vm.pad = '0px <surplus>'` (`bio`, `media`, `gallery`, `repertoire` and `map` now share the line; add the pricing's) and `vm.titleWordEms` extended in the next line. Pricing's frame is **white**, so it is the section's own ground (Scheme 1) and no card margin is needed; read the frame (`1:2968` · `1:11610` · `1:12793`) for which seat.
- **Fit a head with the table times a per-width `fit`**: `bricolageEms` is read at 1000 px, so a 48 to 75 px head sets 3 to 8% wider (`fit` 1.0745 at 48, 1.033 at 75, measured on the widest word). The repertoire's 1.13 is the same effect at 17 to 22 px. Measure the widest word at the frame's size with a hidden span before trusting the table.
- **A rotated card's section height is the card's**: the -2 degree card's box set the map's 982.99; seed `foot` against the frame's row height so the section is not 0.4 too tall.
- **A pill that appears only when the field has a value** (`Tickets` for a gig with an address, JP-045) means the seeded section has no seat for it; compose `vm` strings in `sectionVm` (`vm.gigs[].line`) so an emptied half drops with its separator.
- **`paperArrow(u, back, ink)`** drew the map's pager discs too; the testimonials are its next reader. The chip / tile palette by place is `[lilac, yellow, pink, cyan, magenta]` (`O[6].bg`, `O[1].box2`, `O[5].bg`, `O[2].box3`, `O[7].bg`); pricing's three cards are `s.onScheme[...]` seats named in the *Lattice* row of this file's tokens, read the design context.
- **Layouts 2–4 need no `INLINE_OFF` rows when the placeholder cards print every slot**: the map needed none. Run `inline-probe --layout 1,2,3,4 --cat pricing` once and see.
- **Digest recipe, again:** worktree on HEAD, `vite <worktree>/source --port 5190 --strictPort` (root positionally), verify with `curl :5190/src/builder/EncoreSection.jsx | grep -c PaperbackMap` on the *old* tree giving 0, then strip `?t=NN` and the port before `cmp`. No `pgrep -f` wait loop.
- The map's frame is **1:2822** · **1:11471** · **1:12654**; the pricing's is **1:2968** · **1:11610** · **1:12793**.

### Conventions section 8 (the calendar) inherits

- **`PaperbackPricing` is the sixth own-tree stage and the shape for a section with a turned deck on a white ground**: `PAPER_<CAT>` per width, `u()` in cqw, vertical insets in a child, `vm.pad = '0px <surplus>'` (`bio`, `media`, `gallery`, `repertoire`, `map` and `pricing` now share the line; add the calendar's) and `vm.titleWordEms` extended in the next line only if the calendar prints a Bricolage head.
- **Measure a turned card with `limits.mjs --upright`**, in the measure, `--check` and `--seeds` runs alike. The calendar's blush card and its yellow speaker tile are turned, and a bounding box of a turned line is wider than the line.
- **Colours by position in the stored list** (the pricing's cards, the map's tiles) are the section's own call, not the theme's: a filter that hides one item must not recolour the rest. The frame's cyan is `#1CE8ED` (`PAPER_CYAN`), not the theme's `#A4F6F8`; the pricing's card and the badge read the frame's hexes where the theme has none.
- **A seat the seeded section does not draw** (the pricing's tab pill needs more than one tier chip; the lit tab needs a press) is drawn only when its data is there; the frame's resting state draws no lit tab, so say so in the open calls. The calendar's `Continue` pill and the picked-day circle are the same kind.
- **A repeater's odd last card** spans both columns at tablet (`gridColumn: '1 / -1'`); an empty list draws a one-line row in the section's pale yellow.
- **Cards that carry a badge** draw it from the list position (`t.n === 1`), `zIndex 2`, positioned from the card's right edge (`calc(100% - u(...))`) so the card's width carries it. An svg badge's ring text is not drawn when the field is the artist's name and the frame's words are fixed art.
- **Digest recipe, again:** worktree on HEAD, `vite <worktree>/source --port 5190 --strictPort` (root positionally), verify with `curl :5190/src/builder/EncoreSection.jsx | grep -c PaperbackCalendar` on the *old* tree giving 0, then strip `?t=NN` and the port before `cmp`. No `pgrep -f` wait loop. Remove the worktree (`rm <wt>/source/node_modules` first, then `git worktree remove --force`).
- The pricing's frame is **1:2968** · **1:11610** · **1:12793**; the calendar's is **1:3131** · **1:11793** · **1:12975** (835 / 676 / 910 tall).

### Conventions section 9 (the form) inherits

- **`PaperbackCalendar` is the seventh own-tree stage and the shape for a card on the white page with two halves**: `PAPER_<CAT>` per width, `u()` in cqw, vertical insets in a child, `vm.pad = '0px <surplus>'` (`bio`, `media`, `gallery`, `repertoire`, `map`, `pricing` and `calendar` now share the line; add the form's) and `vm.titleWordEms` extended in the line above it **only if the form prints a Bricolage head** (the frame's 3-line headline does: the head's fit is the pricing's, table times a per-width `fit`). The form's frame is `1:3269` · `1:11931` · `1:13112` (687 / 898 / 1193 tall): an **indigo panel and an orange form in one card**, so read which scheme each half stands on (`s.onScheme[3]` indigo, `[4]` orange) and whether the card is the section's own ground or sits on white.
- **Two halves that must not scale the picture:** pin the art half to the frame's height (`alignSelf: 'start'`, a fixed `height: u(...)`) at 1440 and 768, but **not at 390**, where the halves are a column: `alignSelf: start` on an all-absolute box collapses it to zero width there (found and fixed on the calendar).
- **Rotated children: read `top` / `left` off `get_design_context`, never `get_metadata`** (the calendar's metadata y was 18 px off for the speaker tile and the headphones disc), and centre the unrotated box on the wrapper's centre. Where an art half is symmetric (the calendar's tile is dead centre at every width) centre it in CSS rather than at the frame's px.
- **A per-width art piece** (the calendar's confetti and circle, the media's and map's before it) is the frame's own SVG for each width, downloaded from the `get_design_context` asset URLs (valid 7 days), the `id` attributes stripped and the numbers rounded to two places, pasted as an `ART` entry; compare the desktop file against the existing entry first (here it matched, only the attribute order differs). The doodle set already holds `blobIndigo` (360), `chat` and `note`.
- **A button that is not a field's own** reads the field's seed through `CAL_CTA_LATTICE`'s shape (`vm.<x> = cased(cv('cta', d === 0 && (vm.lattice || vm.paperback) ? SEED : …))` and `fieldSeed` in step); the form's submit is `<a href="mailto:">`, never a `<form>` (`notes/form.md`), and `vm.formMailto` / `vm.formCheck` are the closures, so the block hands them over as `g` does.
- **Placeholders:** `index.css`'s `::placeholder` is `opacity: var(--ph, .45)` and a box whose frame states its placeholder's strength sets `--ph` inline (CLAUDE.md lists the three sets); the form's inputs are such boxes, so read the frame's placeholder colour and decide, then record it as a call.
- **Caps:** `limits.mjs form --themes=6 --designs=0 --upright` (the avatar card or the bubble disc may be turned), then `--check --upright` and `--seeds`; `--extra-lines=<keys>` where the frame wraps. A key the layout does not draw reads `unseen` and needs no cap.
- **Probes** at `--theme Paperback --layout 1,2,3,4 --cat form`: layouts 2–4 need `INLINE_OFF` rows only for slots their placeholder cards do not draw; the form has a photo slot (the avatar), so `photo-probe` also runs `--blank` and `--drop` on layout 1 and `PHOTO_OFF` rows if it names any.
- **Digest recipe, again:** worktree on HEAD, `vite <worktree>/source --port 5190 --strictPort` (root positionally), verify with `curl :5190/src/builder/EncoreSection.jsx | grep -c PaperbackForm` on the *old* tree giving 0, run `before` on 5190 and `after` on 5173 in the background (`OUT=<dir> BASE=… node scripts/digest.mjs <label> 0,1,2,3,4,5,6`, 1008 files each), wait with a file-count loop (no `pgrep -f`), strip `?t=NN` and the port before `cmp`. Do not edit `source/` while they run (the notes and plan are outside it and safe). Remove the worktree (`rm <wt>/source/node_modules` first, then `git worktree remove --force`); a second worktree under another session's scratchpad may exist and is not yours.
- The calendar's frame is **1:3131** · **1:11793** · **1:12975**; the form's is **1:3269** · **1:11931** · **1:13112**.

### Conventions section 10 (the testimonials) inherits

- **`PaperbackForm` is the eighth own-tree stage** and the model for a card of two halves with a corner disc: `PAPER_<CAT>` per width, `u()` in cqw, `vm.pad = '0px <surplus>'`, the seam's state handed over in `g`. A nested `containerType` resets `cqw`: set the font-size on the container and read `min(1em, calc(100cqi / ems))` on the text.
- **A fitted head's `fit` is measured, not borrowed.** Bricolage's table is read at 1000 px, so a head at 20-52 px sets 7-12% wider: measure the widest seed word and a long one at the width's size (1.068 at 52, 1.083 at 42, 1.096 at 34, 1.117 at 20) and take the widest, then walk a long single word at 390. Take `--extra-lines` only where the frame wraps.
- **A corner disc that overhangs** (the form's chat bubble, the testimonials' star disc) is seated by its centre off the frame's `top` / `right`, tilt measured against a 4x export (the form's tilts clockwise at `rotate(8deg)`); the card clips with `overflow: hidden` only where nothing of it overhangs.
- **Probes** at `--theme Paperback --layout 1,2,3,4 --cat testimonials`: layouts 2-4 need `INLINE_OFF` rows only for slots their placeholder cards do not draw (copy Pop's reasons). The carousel's `cur` and its arrows are the seam's (`s.live`); read `notes/testimonials.md` first.
- **Digest recipe, again** (worktree on HEAD, port 5190, verify the old tree gives 0 for `PaperbackTestimonials`; 1008 files each; no `pgrep -f` wait loop).
- The testimonials' frame is **1:3354** · **1:12016** · **1:13198** (730 tall at every width).

### Conventions section 11 (the footer) inherits

- **`PaperbackTestimonials` is the ninth own-tree stage** and the model for a section whose ground is its own band with art on it: `PAPER_<CAT>` per width, `u()` in cqw, `vm.pad = '0px <surplus>'` (`testimonials` is now on the line with `bio`, `media`, `gallery`, `repertoire`, `map`, `pricing`, `calendar` and `form`; add the footer's). The footer's frame is `1:3395` · `1:12081` · `1:13263` (487 / 798 / 876 tall): an **indigo band (Scheme 3, `#3B308F`, the section's own ground)**. **`Footer` owns no hook** (`notes/footer.md`, Lattice's bullet), so the block stands at its head on `s.limeTree && s.paperback`, ahead of Lattice's line, and `Footer` takes no `g`.
- **The footer's seat is read off the page**: `SCHEMES_OF.Paperback[page].footer` is the section's seat (`sectionVm`'s head), and its rows 0-3 are identical, so the footer is Scheme 3 on every page. `vm.pad` for `footer` has a Lattice row at line ~667 of `EncoreBuilder.jsx` to read for the shape, not to copy.
- **A background art goes on the outer box's CSS background, not on a node** when a section's text can grow over it: `limits.mjs` reads a node under a long value as an overlap, a background not. A data-URI svg given `width` / `height` attributes and `preserveAspectRatio='none'` at `100% auto` is the frame's x-only stretch where the narrow vectors are the desktop one's x scaled (**without those attributes the viewBox's ratio is kept and the art shrinks at the narrow widths**) (read the three footers' art first: if they differ per width, a node with the frame's own svg per width is the call).
- **Seat decorations off the edge they hang from**, not always the top (the testimonials' sparkles from the card's foot), so a section that grows keeps them at their corner.
- **No newsletter** (call 2: A, not drawn; the freed seat is the photo's). The frame's `Join the guest list`, the email box and `Subscribe →` are not drawn; the footer's photograph is **shot 4** (`paperbackShot4`, ef42b0; `PAPERBACK_PHOTOS` has no `footer` key yet, so the section adds `footer: paperbackShot4` in `photos.js`, the only importer, and reads it as the other sections read theirs), a tilted keyline card with a `KM` disc and sparkles (the hero's disc, `PaperbackVinyl`'s sibling; the footer keeps its own `showBadge`). `notes/footer.md` lists the fields: the name, the link columns (`LinksField`: the frame's seven pills are the derived nav links plus the artist's), the Book pill, the copyright, *A JustPay product* (a literal, never a field).
- **`PaperbackPill` takes `bg` / `fg`, `ext`, `to`** (the Book pill is the shared `s.live` link to `vm.bookTo`, as every pill); the seven link pills are `navHref()`'d anchors on the published page and carry no href on the canvas (CLAUDE.md, *Load-bearing rules*, Nav).
- **Caps:** `limits.mjs footer --themes=6 --designs=0 --upright` (the photo card is turned), then `--check --upright` and `--seeds`; the identity keys (`who.title` for the name and the copyright) are the footer's own. `IDENTITY_CHARS.footer` needs a `Paperback` row as an array of every design's cap.
- **Probes** at `--theme Paperback --layout 1,2,3,4 --cat footer`: the footer has one design, so layouts 2-4 are the same page; `photo-probe` also runs `--blank` and `--drop` on layout 1 (the photograph) and `PHOTO_OFF` rows if it names any; `inline-probe` as everywhere.
- **Digest recipe, again** (worktree on HEAD, port 5190, verify the old tree gives 0 for `PaperbackFooter`; 1008 files each, **plus the footer at `&page=2`** which `digest.mjs` renders once more; no `pgrep -f` wait loop). Remove the worktree (`rm <wt>/source/node_modules` first, then `git worktree remove --force`); a worktree under another session's scratchpad may exist and is not yours.
- **After section 11:** session 12 (the proofs) and the end-of-pass sweep, and the *Open calls* section is still to be collected: the ring text on the media, repertoire, pricing and testimonials discs and the hero's vinyl, the `Reviewed 6 days ago` / `Top tracks` scripts, the gallery's viewer photograph, and the straight seeded quotes against the frames' curly ones.
- The footer's frame is **1:3395** · **1:12081** · **1:13263**; the testimonials' is **1:3354** · **1:12016** · **1:13198**.

### Conventions session 12 (the proofs) and the end-of-pass sweep inherit

- **Session 12 is done (2026-11-21/22; commits 7653c4a caps, eaf997a reach; the probes changed no file).** The sweep inherits a template whose every cap is its own and whose three probes pass at layouts 1-4:
  - **Caps (7653c4a).** `specAt` no longer reaches the Pop fallback for Paperback: **every `chars` / `count` / `num` / `cols` spec and every `IDENTITY_CHARS` entry now carries a Paperback row** (87 added or replaced: 78 lowered below Pop's number, 9 held at Pop's where the placeholder card bears it; the `specAt` comment says so). Each was measured with `limits.mjs <cat> --themes=6` per section (`--upright` where a card is turned, `--designs=1,2,3`), then `--check` and `--seeds`: **all eleven sections, 0 capped fields fail at their cap, every seed fits.** Policy: *lower only*, floored at the seed (a cap is never raised above Pop's, and never below the text the seed prints); a measurement that came back "open" (400) is left at Pop's number; row 0 / item 0 is covered by the seed floor, so `--seeds` was re-run after applying. Layout 1's rows were not touched. A resolver diff over every spec at every design proved no other template moved (the five "moved" cells at design index 4 are the calendar's arch-2 fold onto layout 2, not a leak). Each section's `notes/<cat>.md` has a *Paperback layouts 2-4: the caps* section; the header and footer have no notes file, so theirs are here: the header's layouts 2-4 rows are measured on the placeholder cards (held `badgeText` `[12, null, null, 10]`; `cardLine` `[null, null, 22]`, seed 21), the footer's four caps are layout 1's (one design).
  - **27 rough edges: a seed wider than the placeholder card holds**, so the cap sits *at the seed* and `--check` reads it as `(floor)`: bio `credit` L2 (39 > 37), `sinceLabel` L3 (17 > 14); calendar `prompt` L2 (22 > 19); form `heading` L2 (36 > 31), `promises[]` L2 (29 > 28); map `routeCta` L2 (14 > 13), `stats.value` L4 (14 > 9), `venueLabel` L2 (20 > 19); media `heading` L3/L4 (20 > 19), `tracks.title` L2-4 (17 vs 11 / 12 / 10), `tracks.sub` L2-4 (33 vs 14 / 20 / 12); pricing `sub` L2-4 (53 > 51), `tiers.feats[]` L2/L3 (24 vs 22 / 19), `tiers.tags[]` L2 (4 > 1); repertoire `songs.title` L3/L4 (17 vs 9 / 11); testimonials `quotes.role` L3 (26 > 23), `quotes.who` L3 (13 > 10); video `videos.title` L2 (20 > 18). These seeds overflow or clip their card today; they are the placeholders' problem, not a cap's, and go to whoever designs layouts 2-4 (one line in the message, not per-call questions).
  - **Reach (eaf997a).** `node scripts/reach.mjs 6` (it takes a themes list, default 0,1,2; 5808 renders) agrees with `FIELDS[].in` and `IDENTITY_READS` at theme 6 except **`header.cardLine`**: the layout-3 placeholder (the shared `HeaderV2`) draws it and the `'*': []` row hid it from the panel; `in` now has `Paperback: [2]`, cap 22. The other differences are three known width-dependent partials, not errors: `calendar.email` L4 (3/6), `gallery.railLabel` (read at 768 alone, as its hint says) and the header's `badgeMode` / `badgeText` at layout 1 (4/6: no sticker at 390, section 1's call).
  - **Probes, `--theme Paperback --layout 1,2,3,4`, sequentially, no ledger row needed:** `inline-probe --width 1440,768 --check` **PASS** (143-154 slots hit per page and width, 0 WRONG / NOT-RESTORED / MISSING / UNREACHED / UNLEDGERED / dead click; one `not drawn` at L2 @1440, `gallery.railLabel`, the tablet-only seat); `photo-probe --check` **PASS** (16-22 slots hit, 0 off) and layout 1 `--blank` (7 appended) and `--drop` **PASS**; `focus-probe --prime --check` **PASS** (233 / 276 / 255 / 269 controls, 0 failing, one shared-line at layout 2). Layouts 2-4 already pass on the existing `INLINE_OFF` rows (`inlineRule` falls from `Paperback.<design>.` to `Paperback.*.`, `*.<design>.`, `*.*.` and the unscoped keys, so the rows written for the other templates' designs apply) and `PHOTO_OFF` is empty at every template, so **no `INLINE_OFF` / `PHOTO_OFF` row was added**.
  - **Not done, and not session 12's:** root `index.html` / `published.html` are not refreshed (the sweep's step 7); Figma was not touched.
- **`scripts/reach.mjs` takes a themes list** (default `0,1,2`; pass `6` for Paperback) and a long time; run it once, in the background, and do not start a second copy. It is not needed again: session 12's run is the pass's (`reach6` above). A tool that lists `FIELDS[].in` changes would have to be re-run.
- **The sweep's whole-page published check is the first time two Paperback sections stand together.** The seams to eyeball: the hero's rounded foot over the bio's white; the pale-yellow gallery band between white sections; the indigo map band against the white pricing; **the testimonials' pale-yellow band (wave floor) against the indigo footer** (a straight seam, the footer's rule bleeding to the page's edge); the footer's 32 foot under the small print (the frames' own).
- **The footer's seams for the sweep to check live:** its eight pills are `navHref()` anchors (a page missing a section drops that pill on the published page and keeps it on the canvas, as everywhere); the Book pill goes to the form; the footer takes `&page=2` and stands on the same Scheme 3.
- **Open calls still to collect** (the list under *Open calls* holds sections 1-11, those lines said *Layouts 2-4 are still Pop's caps*, which session 12 superseded and the sweep rewrote; the sweep folded them into one message for the user): the hero's ring text at 1440, the ring text on the media, repertoire, pricing and testimonials discs and the hero's vinyl, the `Reviewed 6 days ago` / `Top tracks` scripts, the gallery's viewer photograph, the straight seeded quotes against the frames' curly ones, **section 11's** (the photo's and the Book pill's seats, the `Shows/Coverage` wrap at 768, the credit's casing and the hidden statement, below), **and session 12's one**: the 27 seeds wider than the layout 2-4 placeholder cards hold (the list above), which are for whoever designs those layouts.
- The footer's frame is **1:3395** · **1:12081** · **1:13263**.

### Inherited and used

*(Written at the sweep from the per-section bullets above; the plan kept no running list, so `plans/CONVENTIONS.md` group **G** is built from these and from group F.)*

- Group F whole: the verdict written before the code, raw values where nothing is bound, the seam's place (after the hooks; the hookless bio, hero and footer at the head), `SCHEMES_OF` / `s.onScheme`, `THEME_RAMP`, `ems-table.mjs` (Bricolage, `WEIGHT=800`), `rowArt`, the label rule, the two-build digest.
- Lattice's *Session 0*, *Per-session procedure* and *Session 12*, and its `LATTICE_ART` shape for `paperbackArt.jsx`.
- Pop and Editorial: `schemes` and the card-on-paper seat (`cardOnPage`).
- `figma-frame-reading`: the alias walk, the rotated groups' metadata, the narrow masters' Device-mode leak.
- `limits.mjs`, `inline-probe`, `photo-probe`, `focus-probe` and `reach.mjs` as Lattice's session 12 left them, plus `--upright` and a themes list (added here).

### The end-of-pass sweep (2026-11-23)

1. **CLAUDE.md, README.md, `notes/templates.md`** (`efe42c9`): seven templates throughout; the Paperback paragraph beside Lattice's (flag, eleven trees, stage pattern, faces incl. the script face, schemes, white page ground, photography, caps); the EncoreSection import rule gains `paperbackArt.jsx`; a fourth `--ph` set; the `specAt` sentence (Paperback no longer reaches the fallback); the header `in` sentences; `notes/templates.md` *Paperback* holds the decorative language. The README's file tree has no line counts, so there were none to update (it gained `photos.js` and `paperbackArt.jsx`). The plan's Open calls lost the eight stale *still Pop's caps* lines (`9891d27`).
2. **Code comments** (`8a76631`, comment-only): `EncoreBuilder.jsx` ("the other five draw 1024 and 844"), `data.js` (the header `in` block, "all six templates"). The other hits of `grep -rn "all six\|other five\|six templates"` are measurements and stay.
3. **`plans/CONVENTIONS.md`** (`013d6ec`): group **G**, thirteen rows, from an *Inherited and used* list this plan had never kept (written above from the per-section bullets).
4. **The whole-page published check** (`scripts/page-check.mjs Paperback 0,1,2,3` against the dev server, then a scratch script at 768 and 390): card 1, the full walk: Book Now and all nine menu links scroll to `form`, `bio`, `media`, `gallery`, `repertoire`, `map`, `pricing`, `calendar`, `form`, `testimonials` and close the menu; the five Full bio / Book this set / Continue anchors reach `#form`; the media player plays on a trusted click (`SoundHelix-Song-1`, `t` 0.77 s); the gallery (hand-checked: picking tile 6 puts shot 6 in the viewer and *Back to beginning* returns it to shot 1; the probe's `false`s on *Back to beginning*, one tile and the repertoire's *All* read as clicks on the slot or chip already current, not as dead controls) and its arrows, the repertoire chips, the map's month / row / pager, the pricing chips, the calendar's arrows and days and the testimonials' arrows all answer; the form's refused send rings the three empty boxes in pink and a filled one builds the mailto (`subject=Wedding enquiry`); the footer's eight pills and Book pill scroll; no overflow at 390; the burger opens at **768 and 390** (ten links and Book Now), a menu link scrolls to the section's top (0) and closes the menu, and Book Now lands on the form at 0 (after the smooth scroll settles; at 900 ms it is mid-flight). **Seams eyeballed against the real neighbour** (the saved 180 px clips, each opened): at **1440** every section's top edge (the hero's rounded foot over the bio's white; the media card's foot, white, then the gallery's pale-yellow band; the repertoire's white under the gallery band; white into the indigo map band; the indigo map band's foot against the white pricing; the calendar's white; white into the form's card; the testimonials' pale-yellow band under the form; the testimonials' yellow wave floor against the indigo footer, straight); at **390** the bio, media, gallery, pricing, map, form, testimonials and footer edges; at **768** the bio, gallery, pricing and footer edges (the repertoire's and calendar's 390 and the media, repertoire, map, calendar, form and testimonials 768 clips were not opened; the 768 sections measure the frames' heights and no overflow). **One finding, fixed** (`PaperbackTestimonials`'s sparkles): React's *unique key* warning on every card, because `art()` spread its `key` into `style` (`9721613`, no DOM change); re-run: no console error on any card. The other warnings are Chrome's software-WebGL fallback (the map), environment noise.
5. **The four header cards** render and publish with all eleven sections each, in their `pageOrder(i)` (card 2: repertoire before gallery and the map after the calendar; card 3: repertoire, calendar, gallery, pricing, map; card 4 as card 1; the video, with no playable link, is left out of the published page). `modalCards` 4. **Nothing newly broken at layouts 2–4**: no error, no overflow; seen at 1440 on card 2 (setup card 2), legible and complete, in Lime's / Pop's arms: they carry **Pop's colours where Paperback has no seat** (the pale-green pricing and testimonials cards and the black form band), which is the placeholders' known look, owed to the layout-2, -3 and -4 passes along with the 27 wide seeds.
6. **`plans/README.md`** marks the pass closed (unmerged; merging is the user's call).
7. **The refresh and the two-build digest** (`build-digest.mjs` against `python3 -m http.server 8931` at the repo root; the old file, the committed Lattice-era `index.html`, as `?v=old` before the `cp`, then `source/dist-standalone/index.html`): **themes 0-5 byte-identical at Desktop, Tablet and Mobile (18 of 18 files); theme 6 appears (836 / 828 / 818 rows); `modal.txt` reads `6 Paperback: 4 cards`**, where the old build ends at five lines, the tell that it shipped. `index.html` is **14,585,791 bytes, +1,555,654 on the committed 13,030,137** (the docs' 13,030,112 was before the Lattice ground commit's 25 bytes): the eleven `paperback-*` files at 959,840 bytes raw (about 1.28 MB inlined) and ~0.28 MB of code and art; 80 files in `photos/`. `published.html` did not change.

### Open calls — everything the pass hands the user, in one place

*(collected at the sweep; calls 1–3 are written back at session 0)*

**From section 1 (header), for the user:**

- **The ring text on the vinyl is drawn at 1440 too.** The frame draws it at 768 alone (a plain disc at 1440, no sticker at 390).
  I drew it at both widths so the *Corner badge text* field and the three badge states act wherever the sticker stands, and the inline
  probe had no slot to miss. The alternative is 768 only plus an `INLINE_OFF` row for `badgeText`; say if you want the frame's empty
  disc back at desktop.
- **The badge controls do nothing at 390** (the frame draws no sticker or ring there; the KM disc and vinyl go with Hidden at the
  two wider widths). **`Page alignment` is hidden** for Paperback (the collage has no centred variant).
- **The title's cap is 14 at layout 1** (measured: 60 at 1440, 21 at 390, 14 at 768, where a second line climbs into the sticker and the
  photograph). Seed 10, so "Kai Mercer" fits; longer names are refused in the panel. Raise it if you would rather let the name
  overlap the photo.
- **The Book now label is `Book Now`** (cased as `cta1`'s seed), 3 px wider than the frame's `Book now`; the 390 frame draws no Book now,
  and the 768 frame's hamburger stands on the right — both follow the standing header rules (hamburger left, Book Now right, every width).

**From section 2 (bio), for the user:**

- **The `Full bio` pill links to the booking section when live** (`to = s.bookTo`, the layout-2 pill's rule): there is no full-bio page to open, and a link-less pill is a dead control on a published
  page. The label is the `Button` field (now offered at layout 1), seeded `Full bio` from the frame. Alternatives: seed it `Book Now`, or draw no link.
- **`About` is a literal** (Lattice's precedent); the existing `aboutLabel` is layout 3's bracketed label. Say if you want it a field at layout 1 too.
- **Not drawn:** the script `KM bio`, `that's me!` and its arrow (no field), and the `001` / `Structure · Bio_01` chips (removed 2026-11-11). The role line is drawn, from the header's `kicker` and
  `location`, so it prints `DJ · Live Act · Manchester, UK` at 1440 (the frame has no dot and no `, UK`) and two lines (`DJ · Live Act` / `Manchester, UK`) at 768 and 390.
- **The heading cap is 15** at layout 1 (the seed's own length): the frame draws it on one line at 768 and 390, and a sixteenth character breaks that. Layouts 2–4 now carry Paperback's own caps (session 12: measured on the placeholder cards, lower-only, the seed the floor; `notes/bio.md`).
- **The vinyl is the badge.** `Hidden` removes it and keeps the three sparkles.

**From section 3 (media), for the user:**

- **The ring text on the disc is not drawn.** The 768 and 390 frames print `NEW MIX · EVERY MONTH` round the pink ring (the 1440 frame prints nothing); no field carries it, so under call 1 the disc is the plain pink ring, white disc and note at every width.
  Say if you want a seeded, uncased, drop-when-emptied field for it (the hero's ring takes the artist's name; this one has no such value).
- **The canvas draws row 1 as the marked one and the player names `Late Lights`,** where the frame marks row 02 and names *Night Rain* (a track that is not in its list). That is Lattice's rule (the player names the cued track). A marked row's yellow chip goes white.
- **The chip colours follow the row's place** (yellow, cyan, magenta, ink, orange, repeating), not the release text, since the frame colours the two `Hidden Sessions Vol. 2` rows differently.
- **The kicker's 56 px seat above the head stays as padding**, as the bio's does, so the section is the frame's height; dropping it would move every confetti piece against the list.

**From section 4 (gallery), for the user:**

- **The viewer's seed is the frame's viewer picture, in slot 2.** The frame's large photograph is none of the seven tiles' pictures (a wide shot of the singer crouching, not a crop of any), and the viewer can only show a slot (the arrows and Back to beginning walk the seven), so the seed's second slot (the tile the frame rings) now holds it
  and the viewer shows that slot. The cost is the 85px second thumbnail, which differs from the frame's. The alternative is the frame's thumbnail in slot 2 and a viewer that shows it (one line in `photos.js`); say which you prefer.
- **The canvas draws tile 2 picked and ringed**, as the frame does; the other templates draw no ring on the canvas. A visitor's pick moves it, and the playing video clears it.
- **`railLabel` is the credit script (`Gallery`)**, not the frame's `Kai Mercer gallery` (the name was removed from it, 2026-11-12). It wraps in the frame's 104 / 93 / 85 box, so a longer caption turns into two lines beside the tape; its cap is 18.
- **The script `Media` is drawn only when the `Small heading` field is typed** (it is seeded empty, as at every template), with the frame's turn and seat; its cap is 25.
- **Caps: heading 16** (the seed's length; a 16-character head that packs badly wraps to a second line and the section grows by one line), **source label 36 and caption 18** (both measured with the second line the frame draws). Layouts 2–4 carry Paperback's own caps since session 12 (`notes/gallery.md`).

**From section 5 (repertoire), for the user:**

- **`240 songs` is the frame's; the page draws the real count, lowercase.** Paperback's head reads `12 songs` for twelve (the frame's `240 songs` was the designer's number); every other template keeps `Songs` capitalised. Say if you want the frame's capital back.
- **The script `Repertoire` and the ring text on the disc are not drawn** (no field carries them; the media's call). The disc is the plain heart-in-vinyl.
- **The pager and its seat appear only past twelve songs**, so the seeded section is about 100 shorter than the frame (which draws a pager over 240 songs); at 390 the pager takes a 58 foot when it shows.
- **An artist over 22 characters is cut by the cap and, on the canvas, an over-long stored one ellipsises in its chip** (the chip is at most 55% of the row). Title cap 17 (the seed's own length).
- **Layouts 2–4 carry Paperback's own caps** since session 12 (`notes/repertoire.md`).

**From section 6 (map), for the user:**

- **The seeded rows draw no `Tickets` chip.** The frame draws a black `Tickets` or a pink `Sold out` pill on every row; the chip is the tickets link (JP-045), the seeded gigs have no address, and `Sold out` has no field, so a row draws a chip only when it has an address. Say if you want the frame's chip on every row (a seeded address, or a dead pill).
- **`home turf` and its arrow's label are not drawn** (no field, call 1); the black arrow is. The script `Shows / coverage` stays removed.
- **`05 of 12` is derived** (`shown` of `gigs`, two digits), so the seeded five read `05 of 05`. The frame's `12` was the designer's number.
- **The lit row is a yellow inset ring** (live only); the frames draw no lit row, so the look is mine.
- **The date tiles take their colour from the row's place in the whole list**, not its page, so a page turn does not recolour a gig.
- **The pager appears only past five gigs**, so the seeded section is 925 / 917 tall at 768 / 390 against the frames' 983 (the absent pager); at 1440 the card sets the height (982.99).
- **The rings art is drawn at 1440 only**, as the frames do; the 768 and 390 frames draw the foot alone. The real map is not mounted (Lattice's call), so the town and radius fields move the head and pill, not a picture.
- **Heading cap 11** (the seed's own length; mobile is the tightest). Layouts 2–4 carry Paperback's own caps since session 12 (`notes/map.md`).

**From section 7 (pricing), for the user:**

- **The badge's ring text is not drawn.** The frame sets text round the star disc; it is fixed art with no field, so the badge is the disc, the white ring and the star.
- **The badge sits on package 2 (position 1 in the list)**, not on a tier flagged Featured, as the frame's. Move or delete the package and the badge stays on position 2.
- **No tab is lit at rest.** The frame lights none and the seam's chip starts at none; pressing one filters, pressing it again clears.
- **The unit reads `/event`**, not the frame's `/ event` (the field's seed carries no space; a leading slash is the field's).
- **The small print's seed carries the Oxford comma** (*date, location, and length of set.*), as the frame's.
- **The button is seeded *Book this set*** (`rowCta`), where the shared seed is *Book Now*; layouts 2–4 are unchanged.
- **Card colours and tilt follow position** (lilac, pink, cyan; -3, 2, -2 degrees) and repeat for a fourth card on, so a filter leaves the survivors their colours.
- **`price.num` is capped 7** (the box measures 9 / 11 / 14): kept to Pop's number at layout 1 as Lattice's is. Layouts 2–4 carry Paperback's own caps since session 12 (`notes/pricing.md`).

**From section 8 (calendar), for the user:**

- **The scripts `pick your night!` and `Your night, your playlist` are not drawn** (no field carries either, call 1); the first's seat is the empty cells under the month's last row, the second's the corner above the tile.
- **Continue is the link, the enquiry line is plain text** (Lattice's rule, not Lime's JP-088 line-as-link): live it leads to the form (`#form`) whether or not a day is cued, and is a picture on the canvas. An emptied *Button* drops it. The alternative is a Continue dimmed until a day is picked.
- **The label is capped at 12** (measured 34 at the 390 foot): a longer one squeezes the 768 foot's line. A judgement call, as Lattice's; say if you want the measured 34.
- **The desktop card stands 141 px down and 141 px up** (the 1440 frame is an 835-tall box with the card centred), so the section is 835 at 1440 and the white gap round the card is the frame's. Narrower frames pad 70 and 24. Say if you want the desktop padding trimmed to the pricing's 96.
- **The picture half does not recentre** for a four- or six-row month (it is pinned to the five-row height, top-aligned), so a six-row month leaves it above the grid's middle.
- **The circle is drawn round the lit day whichever day it is** (the frame's offset from the cell's centre); a booked or past day is dimmed to .38 with no strike, the family's look.
- **Layouts 2–4 of `time` and `prompt` carry Paperback's own caps** since session 12 (`notes/calendar.md`; `prompt` L2 is one of the 27 seeds wider than the card).

**From section 9 (form), for the user:**

- **The chat bubble is a picture, not a control**, and the avatar is the form's `image` (seeded the portrait, ringed white). The frame's bubble reads as a send affordance; the submit is the Book Now pill.
- **The `promises` cap is the seed (29)** and the list holds five rows (a sixth meets the blob's art at 1440); a longer promise wraps to two lines at 768 and 390 and breaks inside a word only past the measure. Raise it if you would rather let the blob sit behind the text.
- **The head shrinks only for a word wider than the measure** (a 34-letter word fits at 20 px); the cap of 41 is the 1440 measure's fourth line.
- **The placeholder strength is `--ph: 0.565`**, the frame's ink at that tint on white; the label sits above the box, so it is a hint and not the box's only label. Raise it if you want the contrast higher.
- **Layouts 2-4 of every field carry Paperback's own caps** since session 12 (`notes/form.md`; `heading` L2 and `promises[]` L2 are among the 27 seeds wider than the card).

**From section 10 (testimonials), for the user:**

- **The ring text on the star disc is not drawn.** The 768 and 390 frames print `FIVE-STAR HOSTS • REVIEWED •` round the disc (the 1440 frame prints none); no field carries it, so under call 1 the disc is the plain ringed star at every width (the media's, repertoire's and pricing's discs are the same call).
- **`Reviewed 6 days ago` is drawn**, as the review's `when` script (Caveat, turned -3 degrees), because `quotes.when` is exactly that field (seeded `Reviewed 6 days ago`, uncased, dropped when emptied); the section's `kicker` field, which the plan's table named as its home, is gone, so nothing else carries it. An emptied `when` drops the script. (`Top tracks`, by contrast, has no field and is not drawn.) Say if you want it undrawn.
- **The seeded quotes are straight, the frames' curly** (Lattice's call 2: the seed's characters, not the frame's typography). A curly-quote seed is a one-line change in the seeded reviews.
- **The two chips are the attribution** (`who` pink, `role` cyan); the frame draws no byline line, so `vm.quotes[].byline` is not read.
- **Caps: `quote` 170** (the shared 190 fails the all-lower-case fourth sample at 390, where nine lines run the card over the foot trophy; measured 293 / 260 / 195 on the other three), `who` and `role` 45, `when` 31 (the script meets the star disc at 390). One review draws no arrows and keeps the card's seat at 1440 and 768; at 390 the card centres in the band.

**Found by session 12 and the sweep, for the user (and for whoever fits layouts 2–4).**

- **27 seeds are wider than the layout 2–4 placeholder cards hold** (listed in *Conventions session 12*: bio `credit` L2 and `sinceLabel` L3; calendar `prompt` L2; form `heading` and `promises[]` L2; map `routeCta`, `venueLabel` L2 and `stats.value` L4; media `heading` L3/L4 and `tracks.title` / `sub` L2–4; pricing `sub` L2–4, `feats[]` L2/L3 and `tags[]` L2; repertoire `songs.title` L3/L4; testimonials `role` and `who` L3; video `title` L2). Their caps sit at the seed, so they clip or overflow today; this is the placeholders', not a cap's.
- **Two more breaks seen at layouts 3 and 4 in the sweep, source not traced:** the layout-3 bio card's name splits mid-word (*Kai Merce / r*) and the layout-4 map's stat value splits (*Manchest / er, UK*, the `stats.value` seed above). Both are placeholder trees meeting Bricolage; owed to the layout passes.
- **Layouts 2–4 carry Pop's and Lime's colours where Paperback has no seat** (seen at 1440 on setup cards 2, 3 and 4: pale-green pricing and testimonial cards and a black form band at layout 2, chartreuse repertoire sheets and map cards at layouts 3 and 4), the placeholders' known look; the source is not traced.
- **The published-check finding, fixed** (9721613): an unkeyed list in `PaperbackTestimonials`. Nothing else was found.

**From section 11 (footer), for the user:**

- **The newsletter's column is the photo's, and the Book pill takes the pink split pill's family seat under the link pills.** Call 2 (A) removed the newsletter; these two seats are the verdict's, not the frame's. At 1440 the photo stands centred in the two columns the frame gives the photo and the form (the frame centres it in the middle one, leaving the right third empty); at 768 and 390 it is the last block. The Book pill is the footer's existing `cta` (seeded `Book Now`, the shared link to the booking section, dropped when emptied): the frame draws no Book pill, only the newsletter's pink `Subscribe`. The alternatives are the photo kept at the frame's seat and the pill in the right-hand column, or no pill.
- **The seeded sitemap prints `Shows/Coverage`, where the frame draws `Shows`** (the label is the artist's copy, shared with the header's menu, as Lattice's); it is wider, so the seeded 768 page wraps `Reviews` onto a second row where the frame draws one row of eight. A shorter seed or the frame's word would put it back.
- **The credit reads `A JustPay Product`, the frame's `A JustPay product`** (one letter: `FOOTER_CREDIT` is the platform's byline, a constant at every template).
- **The statement is not offered** (`Statement` in the panel), because the frame draws none; a stored value stays in the content and comes back with a template that reads it. The initials disc is the footer's own `Seal` select (Show / Hide); it has no ring to turn. **The photograph is a new `Photo` box** in the footer's panel, Paperback only, seeded with the fourth cover (also the gallery's fourth tile).
- **Caps: link label 47, button 36, copyright 34, name 37** (measured). Layouts 2-4 are one design here (the footer has one).

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
