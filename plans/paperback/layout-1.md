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
5. **The four header cards** still render and publish; note anything newly broken for layouts 2–4.
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
- **The heading cap is 15** at layout 1 (the seed's own length): the frame draws it on one line at 768 and 390, and a sixteenth character breaks that. Layouts 2–4 are still Pop's caps.
- **The vinyl is the badge.** `Hidden` removes it and keeps the three sparkles.

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
