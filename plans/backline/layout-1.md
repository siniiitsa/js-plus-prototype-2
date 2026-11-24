# Backline layout 1 — section-by-section plan

This is the working checklist for bringing a **ninth template, Backline**, to the builder at **layout 1**, from
the Figma file *JustPay — Batch 2* (`ORILFywSzuadscu6RzskCW`), frames named **"Backline Evolved — Claude Design"**.
It runs one unit per session, clearing context between units; git and this file are the memory. Written 2026-11-24
from a planning read of all three masters (a screenshot of every desktop section and of both narrow heroes, the
section lists at all three widths, `get_variable_defs` on the page and on seven nodes, and `get_design_context` on the
footer). Nothing in `source/` has been touched.

**This is the pass Headliner's and Paperback's layout 1 were** — the same file, the same eleven components, the same
builder — and it leans on [`../headliner/layout-1.md`](../headliner/layout-1.md) and
[`../paperback/layout-1.md`](../paperback/layout-1.md) for procedure and for everything the builder grew after Pop
(caps, ledgers, the sweep, the stage pattern). It does not repeat them. What is written here is what differs:

1. **Same Figma file, same HTML-to-Figma import style** — layers are `Section` / `Container` / `Icon` / `Link` /
   `Text`; no component sets, no `Theme=` variants, so a section's twin is decided by composition and geometry. Variables
   are bound but **partially and node-dependently** (`sem/bg` answers mustard `#d4be1e` on the hero and the
   testimonials, paper `#f5f6e8` on the bio and form: read `explicitVariableModes` and the node's own `fills`).
2. **The look is a torn-paper scrapbook, in olive and mustard.** Paper `#F5F6E8` bands and **dark-olive** bands
   alternate down the page; every seam is a **torn paper edge** (a pale-fibre fringe); every band carries **paper
   grain**; cards are **tilted, taped** (translucent beige tape strips) and **ticket-notched** (semicircle bites out of
   the corners and sides); stamps (circled seals, a boxed `SIDE A / SIDE B`, a rotated `SOLD OUT`, `PENCILLED IN`,
   `CONTACT SHEET`), barcodes, a hand-drawn circle round the picked day, a hand-drawn underline and a strike-through
   scribble complete it. It is **Grunge's inventory** (torn edges, grain, tape — `TornEdge`, `Grain`, `Tape` already
   exist in `EncoreSection.jsx`) **crossed with Paperback's** (tilted cards, the stage pattern, decoration from a pure
   `…Art.jsx` module). It is **not** Headliner's flat square look and it is **not** Grunge's black-and-red.
3. **Faces: the display is a typewriter, TT2020 Base — not a Google font** (call 3, the pass's one font problem).
   Labels and UI are **Archivo Condensed Bold**, upper-case, tracked `+0.72 … +0.84 px`; body is Inter (the file's
   `typography/font/body`). The display is **set lower-case by the source text** (`kai mercer`, `hidden sessions`,
   `let's make your night unforgettable.`), not by a `lowercase` class, so a typed `Kai Mercer` has to be lower-cased
   per site (call 4).
4. **A lot of the frame's copy is something a standing rule removed, and a lot more is ticket-stub micro-copy no field
   holds** (`NEXT STOP · GORILLA, MANCHESTER · 30.08`, `ADMIT ONE · NEW LP`, `NO. 000412`, `NOW PLAYING`, `SIDE A · 02`,
   `SETLIST — KAI MERCER — GORILLA, MCR`, `encore: whatever they shout loudest`, `BOOKING REQUEST · ADMIT 120`,
   `PENCILLED IN`, `FIVE STARS · HOSTS AGREE`, …). Backline is the template whose personality *is* this copy, so
   **call 1 is bigger here than it was for any earlier template**, and session 0 opens on it.
5. **The hero is 975 tall at 1440, 914 at 768 and 880 at 390** — three different numbers (Headliner's was one, 900;
   Paperback's and Lattice's 750 narrow-only). **Call 2.**
6. **A new template owes** the character caps, the inline-edit ledger, the photo-edit ledger and the per-template `in`
   rows. Those are *proofs*, scheduled as session 12.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then
- [`../headliner/layout-1.md`](../headliner/layout-1.md) — *Session 0*, *Per-session procedure*, *Session 12*, *The
  end-of-pass sweep*, and its **Conventions → Settled in session 0** and *Inherited and used* (the ninth template meets
  every name gate, tool and ledger the eighth did; **Headliner is the latest example of the whole shape**, including
  what `grep -n "Headliner"` finds in `data.js`, `EncoreSection.jsx`, `EncoreBuilder.jsx`, `photos.js` and the scripts),
  and [`../paperback/layout-1.md`](../paperback/layout-1.md) (the stage pattern; the template with a third face, so
  `THEMES[].script` is the precedent for a new face key)
- [`../CONVENTIONS.md`](../CONVENTIONS.md), groups **A, B, C, D1, F, G and H**
- the section's *Settled in section N* bullets in [`../grunge/layout-1.md`](../grunge/layout-1.md) (**the nearest
  relative for torn seams, grain and tape**) and [`../retro/layout-2.md`](../retro/layout-2.md)'s *Conventions*, plus
  `notes/<section>.md` for the section's current live behaviour
- `notes/templates.md` (the Grunge, Paperback and Headliner sections), and `plans/header-nav.md` and
  `plans/header-fit.md` for the header session
- the *Per-session procedure* of [`../lime/layout-1.md`](../lime/layout-1.md), via Lattice's, Paperback's and Headliner's

Then the memory notes `figma-frame-reading`, `verifying-the-published-tab`, `browser-tool-choice`,
`load-figma-fonts`, `digest-two-servers` and `handoff-prompt-on-finishing`. `SPEC.md` lives in git history:
`git show 8fa8ff4:SPEC.md`.

Branch: **`backline-layout-1`**, forked from `main`.

## What the pass must deliver

1. **Every section works in the published tab under Backline** — every control CLAUDE.md lists under
   *`s.live` is false everywhere except the published tab*.
2. **Every section looks as close to its Figma frame as possible**, at 1440 (× 0.82 onto the 1180 canvas), 768 and 390.
3. **Backline's template card** on the picker — big preview and filmstrip thumbnail — is a live `HeaderV0`.
4. **The setup modal shows four Backline cards.** Card 1 is the fitted Hero. Cards 2–4 only need to render, publish
   and read legibly in Backline's tokens (every earlier template's rule) until later passes fit them.
5. **The other eight templates do not move.** `theme=0…7` digest to zero rows across every category and width.

## The Figma source

File `ORILFywSzuadscu6RzskCW` (*JustPay — Batch 2*), the same page as Lattice's, Paperback's and Headliner's frames.
The Figma tools need `create_session` first.

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Backline Evolved — Claude Design — Desktop | `1:5541` (`Body` `1:5542`) | 1440 × 9637.39 |
| Tablet | … — Tablet | `1:17363` (`Body` `1:17364`) | 768 × 12376.67 |
| Mobile | … — Mobile | `1:18697` (`Body` `1:18698`) | 390 × 13130.48 |

- Desktop: <https://www.figma.com/design/ORILFywSzuadscu6RzskCW/JustPay---Batch-2?node-id=1-5541&m=dev>
- Tablet: <https://www.figma.com/design/ORILFywSzuadscu6RzskCW/JustPay---Batch-2?node-id=1-17363&m=dev>
- Mobile: <https://www.figma.com/design/ORILFywSzuadscu6RzskCW/JustPay---Batch-2?node-id=1-18697&m=dev>

**Unlike Headliner's, each master's only child is `Body`, and `Body`'s children are the eleven `Section`s directly**
(there is no `Main Content` layer and **no stray floating `Container`**): `get_metadata` on a whole master is small
(about a dozen lines) and is the way to list the sections. `get_metadata` on a *section* node is what overflows when
it is deep; read the section that way, and screenshot **per section node** (a whole master comes back 306 px wide),
`maxDimension` 1440 at desktop, then `curl` the URL in the next call (it is short-lived).

**The frame's rasters are exported, not drawn.** The footer's `get_design_context` shows two raster assets per
section: a **grain/paper texture** that fills the band (`imgSection`, a full-bleed PNG) and the **torn seam**, an
**88 px-tall PNG** standing at the band's head (`top: -1`, 1440 wide — the neighbour's colour, a pale fibre fringe).
Session 0 decides, per call 5, whether to ship those rasters, trace them to vectors (Paperback's `…Art.jsx` shape) or
reuse Grunge's `TornEdge` / `Grain`.

## The sections

Session 0 first, then eleven sections in the page's order. **The page has exactly Retro's eleven categories in Retro's
order; the masters pair 1:1 by order** (checked at planning: eleven `Section`s at all three widths, heights below).
Matches are by order, so each section's session checks its two narrow screenshots against the desktop picture before
measuring (open question 4).

| # | Cat | Desktop node | Size | Tablet node | Size | Mobile node | Size | Composition (from the pictures) · predicted twin | Status |
|---|---|---|---|---|---|---|---|---|---|
| 0 | *foundation* | `1:5541` | — | `1:17363` | — | `1:18697` | — | `THEMES[8]`, ramp, faces, photos, the flag, the torn-seam / grain / tape / stamp art | |
| 1 | `header` | `1:5543` | 1440 × 975.30 | `1:17365` | 768 × 914.44 | `1:18699` | 390 × 880 | **Full-bleed photograph, duotoned olive** (a four-man band on a moor, under a dark olive wash), no band colour of its own. Top bar: `kai mercer.` wordmark left (TT2020 48, the `.` in olive `#4c4e29`; at 768 / 390 a smaller wordmark), **six inline links** centred at 1440 (`About · Top Tracks · Media · Repertoire · Shows · Pricing`, Archivo Condensed Bold 14, upper-case), a **mustard `BOOK NOW` rectangle** at the right (at 768 and 390 the links are gone and a **hamburger** stands right of `BOOK NOW`). Under it a pin icon + `NEXT STOP · GORILLA, MANCHESTER · 30.08`. Right, **a tilted cream "LP" ticket** (taped, notched, barcode: `ADMIT ONE · NEW LP`, `hidden sessions vol. 2` in TT2020 with `vol. 2` in olive, `OUT NOW — ALL PLATFORMS`, `LP`, `NO. 000412`), at 1440 over the right figure's shoulder, at 768 / 390 wider and over the middle of the photograph. Left foot: a **polaroid avatar** (white keyline, tilted) beside `DJ · LIVE ACT / MANCHESTER, UK`; under it **`kai mercer` at ~ 150 px TT2020, one line, cream, with a mustard-olive `.`**; then **six ticket-notched chips** (`DEFAULT` plain, `SOLD OUT` mustard, `NEW RELEASE` moss, `ARCHIVE` dark olive, `LIVE` pale, `ALL ACCESS` dashed outline). A **torn paper foot** (cream) closes the section · **Retro's / Grunge's `HeaderV0` (photo, name, chips, seal seat) is the nearest relative; the ticket, polaroid and torn foot decide whether it is an own tree** — read both, then decide | |
| 2 | `bio` | `1:5665` | 1440 × 824 | `1:17466` | 768 × 1066 | `1:18797` | 390 × 1256 | **Paper** (`#F5F6E8`, grained). Left: `01 ┈┈ KM BIO` eyebrow, a **round olive stamp seal** (`MANCHESTER ★ DJ · SELECTOR` on a ring, `est. 21` inside), and bottom-left a `001` notched chip + a dashed-box `STRUCTURE · BIO_01`. Centre: a **vertical TT2020 statement `reads the room.`** in two rotated columns (ink, with an olive `.`), the second column **overlapping the photograph's left edge**; a **tilted taped polaroid portrait** (a beige keyline, a tape strip top, a second tape strip at the foot-right). Right: a TT2020 lead (`DJ and selector from Manchester. Five years of reading rooms — chosen by the room, never the algorithm.`, with **a hand-drawn olive underline under `reading rooms`**), a **dashed rule**, `ABOUT` (Archivo Condensed, olive) + a small TT2020 paragraph, and a **black `FULL BIO →` button** · **own tree** (nothing in Grunge's / Retro's bio turns a head under a taped polaroid) — confirm | |
| 3 | `media` | `1:5736` | 1440 × 1057 | `1:17534` | 768 × 1376.72 | `1:18870` | 390 × 1205.72 | **Dark olive** with a torn cream head; `02 ┈┈ TOP TRACKS`; **`five worth` at ~ 100 px cream TT2020** (the frame's head is two words, with a faint ghost of a third behind it); `5 / 5 FEATURED` at its foot-right. Left: **five dashed-rule rows** (number, a **tilted polaroid cover**, a TT2020 title + a small TT2020 sub, the time in Archivo Condensed, an **outlined square play button**); **row 2 is lit**: mustard number, **a mustard hand-drawn strike-through over the title**, a **mustard-filled play button**; an outlined `SOUNDCLOUD →` button. Right: **a tilted taped ticket player card** (`NOW PLAYING`, `SIDE A · 02`, `TRACK`, a polaroid photograph, a barcode column, `night rain` in TT2020, `KAI MERCER` in olive, three transport squares with an olive-filled play, `02:28 ▬▬ 04:22`, `NO. 000227`) · **Retro's `v0` media** (list + player) or Grunge's, re-dressed — the inventory matches; confirm | |
| 4 | `gallery` | `1:5934` | 1440 × 902.42 | `1:17730` | 768 × 1350.88 | `1:19066` | 390 × 931.31 | **Paper** with a torn olive head; `03 ┈┈ MEDIA`; **`see us in action.`** in two TT2020 lines (the second olive, with its `.`); **four accordion rows**: the open `gallery` row **a filled ink bar with notched ends**, the others **dashed-outline ticket rows** (`youtube`, `instagram`, `tiktok`), each with a two-digit index (`01…04`) at the right; right: an outlined `BACK TO BEGINNING ←` button, **a rotated outlined `CONTACT SHEET` stamp**, a **tilted taped photograph** with a white square arrow and a mustard square arrow in its foot-right, and **a dark film strip of seven thumbnails** · **Lime's *Photo viewer* inventory** (source rows + viewer + strip), as every earlier template read it | |
| 5 | `repertoire` | `1:6031` | 1440 × 1067 | `1:17818` | 768 × 1067 | `1:19154` | 390 × 1532.94 | **Dark olive** with a torn cream head; `04 ┈┈ REPERTOIRE`; **`240 songs.`** at ~ 100 px TT2020 (`240` cream, `songs.` moss), a **search field right** (dotted underline, faint TT2020 placeholder), four **outlined square chips** (`ALL` filled cream); **a tilted taped paper "setlist" card** holding `SETLIST — KAI MERCER — GORILLA, MCR`, a boxed `SIDE A / SIDE B` stamp, **two columns of six dashed-rule rows** (olive number, TT2020 title, a small right-aligned artist) and a handwritten `encore: whatever they shout loudest` foot; a pager of **square numbered buttons** (`← 1 2 3 … 20 →`, `1` filled cream) · **Lime's *Two-column dense*** inventory | |
| 6 | `map` | `1:6137` | 1440 × 1041.47 | `1:17928` | 768 × 1560.25 | `1:19264` | 390 × 1348.45 | **Moss `#A9A23A`** with a torn dark-olive head; `05 ┈┈ SHOWS / COVERAGE`; **`manchester.` at ~ 100 px ink TT2020**, a **round stamp** (`120 MILE ★ ON THE ROAD`, `radius` inside) at the right; left a **taped paper square** with **concentric rings** (two solid, two dashed, an olive dot, `mcr`) and a foot `based in manchester` + `120 MI STANDARD · FURTHER ON REQUEST`; right `UPCOMING GIGS` / `05 OF 12`, **five notched ticket rows** (date block `JUL 12`, a dashed divider, a TT2020 venue, `MANCHESTER · DOORS 22:00`, a rotated `SOLD OUT` stamp or a black `TICKETS` button), a pager (a black-outline prev, `1 2 3` with `1` filled ink, a black next) · **Lime's *Compact tile*** (the raster map is the rings art, as Paperback's and Headliner's) | |
| 7 | `pricing` | `1:6322` | 1440 × 1135.38 | `1:18100` | 768 × 1595 | `1:19431` | 390 × 2196.50 | **Paper** with a torn moss head; `06 ┈┈ PRICING`; a three-line TT2020 head `choose the set that's right for your night.` (the last line olive); a **Solo / Trio / Band** tab (ink current) at the right; **three tilted ticket cards** (dark olive with cream type, mustard with ink, moss with ink) each: `ADMIT ONE · THE HOUSE PARTY`, `NO. 001`, the price in TT2020 at ~ 80, a TT2020 blurb, **four or five dashed-rule feature rows each led by a ✕**, a notched-corner foot with a `BOOK THIS SET →` button (cream on olive, ink on the others) and a barcode; the middle card is taped; a TT2020 small print · **Lime's pricing** inventory (own tree likely; the notches, barcodes and ✕ are new) | |
| 8 | `calendar` | `1:6558` | 1440 × 835 | `1:18328` | 768 × 1108.30 | `1:19659` | 390 × 1103.50 | **Dark olive** with a torn cream head. Left: **a tilted taped paper calendar** (`june 2025`, the year olive; two outlined arrow squares; `SUN…SAT` in Archivo Condensed; a ruled day grid in TT2020 with the picked `12` in olive inside **a hand-drawn olive circle**). Right: `07 ┈┈ BOOKING`, **`pick a date,`** at ~ 70 px cream TT2020 (the frame prints a comma and a second line is cut), and **a tilted notched ticket** (`BOOKING REQUEST · ADMIT 120`, `thu 12 june 9:00pm` in TT2020, `PRIVATE PARTY · MANCHESTER`, a rotated mustard `PENCILLED IN` stamp, a barcode, `GIG`, `NO. 0612`). A dashed rule, then a **terminal line** `> Enquiry for Thursday, June 12 at 9:00pm_` in TT2020 and a **mustard `CONTINUE →`** button · **Lime's *Scheduler*** inventory | |
| 9 | `form` | `1:6725` | 1440 × 752.39 | `1:18496` | 768 × 1071.38 | `1:19825` | 390 × 1244.05 | **Paper** with a torn olive head, **one card straddling a seam in its middle**: a **dark-olive context panel** (a tilted polaroid avatar + `KAI MERCER` / `DJ · LIVE BAND`, a three-line TT2020 `let's make your night unforgettable.` with the last word pale, three dashed-rule promise rows led by ✕) beside a **paper form** (a taped corner; `NAME`, `EMAIL`, `EVENT DATE`, `GUESTS` as **underlined** TT2020 fields, `EVENT TYPE` as five outlined square chips (`WEDDING` filled ink), `MESSAGE`, an **olive `BOOK NOW →`** button) · **Lime's *Split context + form*** | |
| 10 | `testimonials` | `1:6810` | 1440 × 730 | `1:18582` | 768 × 730 | `1:19912` | 390 × 730 | **Mustard `#D4BE1E`** with a torn cream head; **one tilted taped paper card** (`REVIEWED 6 DAYS AGO`, the quote at ~ 56 px TT2020 centred with the last words olive, two notched pills `HANNAH L.` ink and `PRIVATE HOST` cream, **a round olive stamp** `FIVE STARS ★ HOSTS AGREE`, `5/5`), **two square arrows** at the edges (outlined left, ink-filled right) · **Lime's *Stacked tag card*** inventory re-laid as a centred single quote | |
| 11 | `footer` | `1:6867` | 1440 × 337.44 | `1:18639` | 768 × 546.72 | `1:19969` | 390 × 712.02 | **Dark olive** with a **torn mustard head**; `kai mercer` (TT2020 48, olive `.`) + a TT2020 tagline (`House, disco, soul and 80s. Played loud, chosen by the room.`); **three link columns** `EXPLORE` / `MORE` / `SOCIAL` (headings mustard Archivo Condensed 13, links cream TT2020 17, four each); **`JOIN THE GUEST LIST` + an underlined email box + a cream `SIGN UP →`**; a dashed rule; `© 2026 KAI MERCER` and `A JUSTPAY PRODUCT` · **Lime's footer** + a newsletter block no template has (call 1) | |
| — | `video` | *none* | — | — | — | — | — | not on this page: it takes session 0's tokens and nothing else (the frames draw it at layouts 2 and 4 only) | — |

**The ground sequence**, read from the pictures: olive-washed **photograph** · **paper** bio · **dark olive** media ·
**paper** gallery · **dark olive** repertoire · **moss** map · **paper** pricing · **dark olive** calendar · **paper**
form · **mustard** testimonials · **dark olive** footer. **Every seam is a torn edge drawn in the *previous* band's
colour at the head of the next** (the footer's `Container` at `top: -1`, 88 tall); the hero's foot is a torn paper edge
in the bio's paper, so the tear is owned by the band *below* it. `above` / `below` read nothing for Backline (a tear
needs no neighbour's category, only its colour, which `SCHEMES_OF` rows give). Where a **card straddles a band**
(the form's) the page is the band's colour and the card is a scheme seat (`cardOnPage` / `vm.pageBg`, Paperback's and
Editorial's mechanism). Re-measure every ground and height from the frame; these are reads of the pictures.

**Re-measure from the Backline frame; never reuse a twin's block sizes.** A section whose composition turns out to
differ from its prediction is the exception: **stop, and record it under *Conventions* before writing code.** The
per-section default is *whichever of "dress the shared branch" and "own tree" the read supports*; **expect own-tree for
most**, since Paperback's and Headliner's frames and Grunge's torn look are all different pictures from this one, and
the tilted ticket cards are shapes no shared branch draws.

## The tokens read at planning time

`get_variable_defs` on the page (`1:5541`) and on the desktop hero, media, map, testimonials and footer and the two
narrow heroes. **The bound set is partial and node-dependent, and answers wrongly at least once**: the hero answers
`sem/bg` mustard at 1440 and 768 and paper at 390, which no part of a full-bleed photograph paints, and **the media
node answers paper where the picture is dark olive** (the footer's `SIGN UP` fill is the paper it reads; the node's own
`fills` decides each ground):

- **Faces.** `font/display` = **TT2020 Base** at every node that binds it (the heads, the row titles, the lead, the
  footer's links and tagline — *all* body-sized copy the frame sets in the typewriter too). `font/ui` / `font/body` =
  **Archivo**, and the emitted code names the face **`Archivo Condensed:Bold`** (the labels, chips, buttons, eyebrows,
  numbers, stamps, all upper-case with `+0.66 … +0.84 px` tracking). `typography/font/body` = **Inter**, bound but not
  seen in the emitted footer (the small TT2020 paragraphs are the body). **TT2020's tracking is `-0.045 em`**
  (`-2.16 px` at 48, `-0.34 px` at 17), set on the display and on the typewriter body alike.
- **Ramp** (desktop mode, node-dependent; the heads' actual sizes are measured per section, not read off `size/*`):
  `display-sm 44` (page node) / `34` (tablet hero), `title 30`, `list 28`, `body-lg 18`, `body-md 16`, `body-sm 14`,
  `label-md 14`, `eyebrow 13`, `chip 12`, `label-xs 12` / `11`; `border/hairline 1`, **`border/default 2`**,
  **`border/heavy 3`** (the stamps' and the circled day's strokes). **No `radius/*` appears: every box is square**
  except the polaroids' keylines, the notches (semicircle bites) and the round stamps. The narrow ramps are read per
  node, and a narrow master may sit in a different Device mode from its page (`figma-frame-reading`).
- **Palette** (read, not yet confirmed per section): `sem/bg #d4be1e` (**mustard** — the testimonials' band and the
  chip / button seat), `sem/box/1 #f5f6e8` and `sem/bg #f5f6e8` (**paper**), `sem/text/1 #23240f` (**ink**, a green
  black), `scheme/3/text2 #f5f6e8` and `scheme/5/text2 #23240f` (the cream-on-olive and ink-on-mustard inks),
  `sem/tag/7/bg #4c4e29` (**dark olive** — the bands; also the footer's `.`), `sem/tag/3/bg #a9a23a` (**moss** — the
  map's band and the third pricing card), `sem/tag/5/bg #c7c59f` (**beige** — the tape and `NEW RELEASE`'s seat),
  `sem/active/bg #d4be1e`. Literals no variable holds: the footer's placeholder `#757575`, the hero's olive wash over the
  photograph, the olive of `vol. 2` / the underlines / the stamps (**`#6B6B16`-ish, to be read from the node**), the
  pricing cards' dark-olive fill (a deeper olive than `#4c4e29`: read), the `Live` chip's pale. **Session 0 reads
  `explicitVariableModes` of every section** and writes the mapping.
- **Casing.** The display copy is **lower-case in the source text** (not a CSS class); the Archivo Condensed copy
  carries `uppercase` in the emitted code. Call 4.

## The decisions this plan hands over

Each is settled by the user at the head of the session that needs it, with the plan's recommendation as the default,
and written back here as *settled: …*. (`AskUserQuestion` takes four options a question, four questions a call: split
by lever.)

### 1. Do the standing copy removals hold for Backline, or does the frame win?  *(session 0 opens on this)*

**settled: A (user call, 2026-11-24).** Every standing removal holds, and the rule behind them. The footer keeps its two derived columns and draws no newsletter; **the hero's polaroid avatar is not drawn** (no `avatar` field).

Paperback's, Lattice's and Headliner's call 1, with this frame's list (read from the 1440 pictures and the narrow heroes):

| Section | The frame draws | Standing rule it meets |
|---|---|---|
| header | the `kai mercer.` wordmark and **six inline links at 1440**; `BOOK NOW` at every width; a hamburger at 768 and 390 | layouts 1–4: **hamburger left, Book Now right, nothing else**, at every width (`plans/header-nav.md`) |
| header | `DJ · LIVE ACT` / `MANCHESTER, UK` beside the polaroid avatar | layout 1 prints **no act type and no location** |
| header | **`NEXT STOP · GORILLA, MANCHESTER · 30.08`** under the bar | no field; a new claim about a date and a venue — a decision |
| header | **the LP ticket** (`ADMIT ONE · NEW LP`, `hidden sessions vol. 2`, `OUT NOW — ALL PLATFORMS`, `LP`, `NO. 000412`, barcode) | no field; the artist's *release* — a decision (call 2) |
| header | six ticket-notched chips (`Default / Sold out / New release / Archive / Live / All access`) | the header's tag chips (`FIELDS.header.tags`, six, JP-081) on the six `TAGS` seats; the frame's labels differ from `TAG_LABELS` (a seed decision) |
| header | **a polaroid avatar** (a second photograph of the band) | no layout-1 avatar field — a decision (`FIELDS.header.avatar`?) |
| bio | `01 ┈┈ KM BIO`; the `001` + `STRUCTURE · BIO_01` pair | the initials / `Bio` eyebrow and the reference line were **removed 2026-11-11** |
| bio | **a round stamp** (`MANCHESTER ★ DJ · SELECTOR`, `est. 21`) | the badge, three states (`badgeMode`); its ring text is the artist's name by rule — the ring's words and the inner `est. 21` are literals — a decision |
| media | `02 ┈┈ TOP TRACKS`, `5 / 5 FEATURED`, `NOW PLAYING`, `SIDE A · 02`, `TRACK`, `NO. 000227` | the first two **removed 2026-11-12**; the rest have no field |
| gallery | `03 ┈┈ MEDIA`; the rotated `CONTACT SHEET` stamp; the `01…04` row indices | the eyebrow is `kicker` (`in: [0, 3]`); the stamp has no field; the indices are index-derived |
| repertoire | `04 ┈┈ REPERTOIRE`; `SETLIST — KAI MERCER — GORILLA, MCR`; `SIDE A / SIDE B`; **`encore: whatever they shout loudest`** | the eyebrow has no field; the setlist head, the stamp and the encore have none |
| map | `05 ┈┈ SHOWS / COVERAGE`; the round `120 MILE ★ ON THE ROAD` stamp; `based in manchester`; `120 MI STANDARD · FURTHER ON REQUEST`; `SOLD OUT` stamp | the eyebrow **removed 2026-11-12**; the radius is `vm.mapRadius`; the base line is the travel card's `homeLabel`-family (`notes/map.md`) |
| pricing | `06 ┈┈ PRICING`; **`ADMIT ONE · <PLAN NAME>`** and `NO. 00N` on each card; a barcode | the plan name is the plan's own; `ADMIT ONE` and the numbering are literals — a decision |
| calendar | `07 ┈┈ BOOKING`; `BOOKING REQUEST · ADMIT 120`; `PENCILLED IN`; `NO. 0612`; `GIG` | `prompt` exists (*Pick a date to enquire*) and reads its seed; the rest have no field |
| form | `KAI MERCER` / `DJ · LIVE BAND` over the headline; `Replies within 24 hrs` / `Free, no-obligation quote` / `Covers 120 mi from Manchester` | the credit line is derived (`identity`); the promises are the form's existing promise rows |
| testimonials | `REVIEWED 6 DAYS AGO`; the round `FIVE STARS ★ HOSTS AGREE · 5/5` stamp | the `kicker` field is **gone**; the stamp has no field |
| footer | **three link columns** + tagline; **`JOIN THE GUEST LIST` + email + `SIGN UP`** | the footer has two *derived* columns (`LinksField`, `notes/footer.md`) — a three-column frame is a decision; the newsletter: Paperback's and Headliner's call 2 |

- **A (recommended): every standing removal holds, and so does the rule behind them — a label the frame prints is a
  seeded, uncased, drop-when-emptied `FIELDS` field or it is not drawn (JP-059 / JP-071 / JP-090 / JP-095).** The
  numbered eyebrows, `NEXT STOP`, the ticket micro-copy, the stamps' words, `PENCILLED IN`, `5/5`, the barcode's
  `NO.` numbers are not drawn; **the shapes stay** (the notches, tape, barcodes as pure art, a stamp's ring and
  rotation where a field's text is its seat, the circled day, the underline and strike scribbles, which carry no
  words). The footer's newsletter is not drawn (Paperback's and Headliner's call 2, A); the freed seat is the
  photograph's or the column's. Backline is then the re-skin of what the builder prints that every earlier template was,
  **at a real cost in fidelity**: this is the template whose character lives in the stub copy.
- **B: ornament strings are markup, claims and the artist's data are not.** Pure ornament — `ADMIT ONE`, `NO. 001 / 002 /
  003` (index-derived), `SIDE A / SIDE B`, `NOW PLAYING`, the barcode — are drawn as decoration, like Paperback's
  confetti; anything that states a fact or a seat for the artist's copy (`NEXT STOP … 30.08`, `hidden sessions`,
  `120 MILE`, `5/5`, `PENCILLED IN`, `GORILLA, MCR`) stays a field or is dropped. **This reopens JP-071's "a frame label
  is a field, not a literal"** for the ornament set; it is the user's to reopen.
- **C: the frame wins, by item.** The user names the items; each reopens a recorded call.

Two items have no precedent and want an answer in the same breath: **the footer's three groups** (*two columns as
built / three groups by a `LinksField` change*) and **the hero's polaroid avatar** (*a Backline-only `avatar` image
field, seeded / not drawn*).

### 2. The hero's release ticket, and the hero's height

**settled: A + A (user call, 2026-11-24).** The LP ticket is not drawn. `vm.heroH` is 914.44 at 768 and 880 at 390 only, behind `backline`; desktop keeps its frame aspect (975.30 × 0.82 = 799.7 on the canvas). Not yet written: section 1's work.

Both are the header's. **The LP ticket** is the hero's one new object and an invitation to a new field group
(`ticketTitle`, `ticketLine`, `ticketFoot`, …) read by no other template.
- **A (recommended): the ticket is not drawn.** Call 1 A's rule; the freed seat is the photograph's. The hero is then
  photograph, bar, polaroid, name, chips, torn foot.
- **B: drawn behind three Backline-only seeded fields** (title, kicker, foot; the barcode and `LP` are art, the `NO.`
  derived) — `FIELDS.header.cardLine`'s precedent (JP-061: a Lime-family-only field, `in` rows hiding it elsewhere).

**The height.** The frame is **975.30 / 914.44 / 880** (1440 / 768 / 390), where Paperback's and Lattice's were 750
narrow-only (`vm.heroH`, `EncoreBuilder.jsx:995–1000`; `WIDE.heroH`, `SPOT_ASPECT`, the picker's aspect assume
614 / 1024 / 844) and Headliner's 900 at every width (narrow-only, desktop on its aspect).
- **A (recommended): the same rule behind `backline`** — `vm.heroH` is 914.44 at 768 and 880 at 390 (the two frame
  numbers, not one), desktop at its frame aspect (975.30 × 0.82 = 799.7 on the 1180 canvas, computed from the frame, not
  from 614), so the picker's aspect, the setup cards and the other eight templates stay byte-identical.
- **B: the hero is the frame's height at every canvas**, and the picker's aspect follows it for this template alone.

### 3. The display face: TT2020 Base is not on Google Fonts

**settled: A with B as its fallback stack (user call, 2026-11-24).** Self-host TT2020 Base, `display` stack `'TT2020 Base', 'Courier Prime', monospace`. **Verified in session 0:** source `github.com/ctrlcctrlv/TT2020` (Fredrick R. Brennan, © 2020), **SIL OFL 1.1** (the repo's `LICENSE`, 4,365 bytes, read in full; the GitHub API reports `ofl-1.1`); **no Reserved Font Name is declared**, so a subset may keep the name. The file is `dist/TT2020Base-Regular.woff2`, 64,740 bytes whole.

`font/display` = **TT2020 Base** (a free typewriter face, believed to be **SIL OFL 1.1** — **verify the licence text
and the file before bundling**). It sets the heads, the row titles, the lead, the body paragraphs, the footer — most of
the page. `index.html` already loads **Courier Prime** (`wght@400;700`, for another template). The memory note
`load-figma-fonts` says to load the frame's free font, not to stand one in.
- **A (recommended, if the licence reads OFL): self-host TT2020 Base.** Subset to Latin (and the `£ € ★ ✕ → ← …` the
  frame prints, or draw the last three as SVG), WOFF2, **inlined as a data URI in an `@font-face` in `index.css`**
  (`Archivo Lattice`'s shape, but the file is ours, not `fonts.gstatic.com`'s), so the single-file build, the
  published tab's cloned head and `published.html` all carry it with no network and no extra file. Report its size
  (a subset typewriter face is tens of KB). Exact metrics: the face is **monospaced**, so the header-fit table is
  trivial (`ems = 0.5 – 0.6 per character`, minus the `-0.045 em` tracking: read the advance from the file).
- **B: a free stand-in on Google Fonts** — **Courier Prime** (already loaded: nothing added; the closest in weight and
  slab; a different advance), or **Special Elite** / **Cutive Mono** (nothing in the frame is distressed, so Special
  Elite is wrong). The look is close, not the frame's; metrics and caps are measured against the stand-in.
- **C: both** — TT2020 where the file ships, Courier Prime as the `font-family` fallback (a self-hosted face that
  fails to load must not collapse the layout): **A with B as its fallback stack** is how the template's `display` string
  should read in either case.

**The label face** is `Archivo Condensed Bold`, which is Archivo's `wdth 75` Bold instance (verify: Archivo's `wdth`
axis, **the Google entry in `index.html` carries `wght` only today**, so a condensed instance needs an `@font-face`
alias pinning `font-stretch` as `Archivo Lattice` pins `113%`, e.g. `Archivo Backline` at `700`, `font-stretch: 75%`,
loaded as its own `family=` entry — **no existing template's `Archivo` link may change**). Session 0 reads the exact
stretch off the frame (`get_design_context` on a label node, `font-variation-settings`) and proves Lattice's `Archivo`
alias and every other `Archivo` user are byte-identical (a zero-row digest at `theme=0…7`).

### 4. Casing

**settled: A (user call, 2026-11-24).** `casing: 'title'` plus a per-site `lowercase` / `uppercase` transform; a stored `Kai Mercer` renders `kai mercer`. (The hero's name as typed stays open for the header session only if the user reopens it.)

The frame's TT2020 copy is **lower-case in the source text**; Archivo Condensed is upper-cased by an `uppercase`
class; Inter is mixed. Default **`casing: 'title'`** (the stored copy is passed through) with **`textTransform:
'lowercase'` per display site** and `'uppercase'` per label site (Grunge's / Headliner's per-site shape), **not**
`casing: 'upper'`. Verify each site's `textCase` against the frame and settle exceptions per section: the footer's
`© 2026 KAI MERCER` is upper-case Archivo; the footer links and the placeholders are mixed-case TT2020 (`About`,
`you@email.com`); `June 2025`, `Thursday, June 12` in the terminal line are mixed. **Lower-casing a user's name is a
fidelity choice:** the hero's `kai mercer.` is the artist's name rendered lower-case. A stored `Kai Mercer` stays
stored and renders lower-case; the alternative is that Backline sets the name as typed (a decision at the header session).

### 5. The torn seams, the grain and the tape: vectors, rasters or Grunge's

Grunge already ships `TornEdge` (a vector path in `colour`), `Grain` (a raster overlay at an opacity and blend) and
`Tape`. **This frame draws its own**: a **pale-fibre fringe** (the tear has a light edge, not Grunge's hard cut),
**a paper grain** and **a dark-band grain**, and tape in beige. Whichever way it goes, **Grunge's pixels must not move**
(`theme=2` digests to zero).
- **A (recommended): Backline's own `backlineArt.jsx`** (pure SVG functions, no hook, `paperbackArt.jsx`'s shape): the
  tear as a **vector traced from the frame's raster** (re-colourable by the neighbour's colour, one path per width
  like Lattice's dot field — measure how many distinct tears the 88-px PNGs hold: a recurring edge reused at three
  widths is one path), the notched ticket as **a clip / mask path** (semicircle bites at the corners and sides), the
  stamps as ring + rotation, the barcode as a generated bar set (derived from an index: no text), the circle and
  underline and strike as hand-drawn paths. The paper grain as **one small tiling raster** (a lossless WebP mask as
  Lattice's) used at two blends.
- **B: export the frame's PNGs** (the 88-px tears, the grains) and ship them as rasters: exact, but each tear is a fixed
  colour (the neighbour's), so a seam is one image per *ordered pair* of bands, and the build grows by the images'
  size. Measure before choosing; the root `index.html` is **15,306,066 bytes** and each pass added 0.7–1.6 MB.
- **C: reuse Grunge's `TornEdge` / `Grain` / `Tape` with Backline props** — the cheapest, the least faithful, and
  every read of `s.grunge` widens (the repertoire's and the map's torn edges already stand on `(s.retro || s.grunge)`
  gates).

### 6. The template's name and the flag

The frames are *Backline Evolved — Claude Design*. **Recommended: `Backline`** — one word like the other eight,
`THEMES[8].name`, `plans/backline/`, the flag `s.backline`, the picker's card title, `sub` *TT2020 · olive & mustard*.
The user may rename it at session 0; the folder and flag follow. **Add `backline: T.name === 'Backline'` to `sectionVm`
and widen `designed` and `limeTree` to it only where a section dresses the shared branch**, and **take the inventory of
every name gate first**: `grep -n "Headliner\|headliner" source/src/builder/*.js*` (the eighth template's hits are
exactly the places a ninth needs a row or falls through to Pop's — `specAt`: `spec[X] ?? spec['*'] ?? spec.Pop`, and
Headliner's own fallback to **Grunge's** row; **Backline will fall to Pop's unless a row is added**, and an `in` object
that names neither Backline nor `'*'` *reads* the field; `INLINE_OFF` / `PHOTO_OFF` have no fallback) and
`grep -n "THEMES\[7\]\|Headliner" source/scripts/*.mjs`. List every gate, give each a Backline row or a stated reason,
and write the list under *Conventions*. **`SCHEMES_OF.Backline`** is the per-section ground table (the bands are the
grounds, so most sections are their own scheme).

**settled: Backline (user call, 2026-11-24).** `THEMES[8].name` is `Backline`, `sub` *TT2020 · olive & mustard*, the flag `s.backline`,
the folder `plans/backline/`. The name inventory is under *Settled in session 0*.

### 7. Photography

The frames' photographs are **a four-man band on a moor, in a studio and in a rehearsal room** (the hero, the polaroid
avatar, the bio portrait, the media player and five covers, the gallery's seven plus its viewer, the form's avatar) —
**a different shoot from every earlier template's**, and **a band, not a DJ**, so this is **a ninth shoot**:
≈ **20 photographs** (hero, avatar, bio, player, five track covers, seven gallery, the viewer; the form and footer
reuse one). Seed them as `SEEDS.Backline` in `photos.js` (the only module that imports `src/builder/photos/`),
**JPEG-compressed** (Headliner's twelve: 484,700 bytes raw; Paperback's eleven at 1152 px q50: 959,840), **budget the set
before adding it and say what the build grew by**. **The hero's photograph is duotoned olive in the frame** (a wash, or
a tinted export — read whether the node is the raw picture under a colour layer or a baked image; **import the picture
whole and tint in markup, so the crop editor edits the picture** (`photoAspectOf`, `notes/photography.md`)). The tilted
polaroids' keylines, the tapes, the stamps and the barcodes are **art, not photography**.

## Session 0 — the foundation

This session touches no section's layout code. Its job is to make every later session decoration and measurement. It
opens on **calls 1, 2, 3 and 4** (call 5 and 6 are asked at the head of the work they gate: session 0's art step and
its flag step) — Headliner's *Session 0*, with these differences:

1. **Read every token and every section's scheme.** `get_variable_defs` on the page and on each of the eleven desktop
   sections (the page answers `sem/bg` mustard: **not the page's ground** — the pictures say paper), then one `use_figma`
   read (load `figma-use` first) of every section's `explicitVariableModes` mapped through
   `figma.variables.getLocalVariableCollectionsAsync()`: Device and Scheme at once, and which narrow masters sit in
   another Device mode. **Read `fills` / `strokes` / `effects` / `rotation` / `padding*` from the node itself** wherever
   a token is doubtful (it is, at: every band's ground — the frame stacks a grain raster *over* the fill — the olive
   inks, the cards' fills, the tilt angles, the shadows). Write the mapping, the ramp at three widths and the palette
   (including the literals no variable holds) under *Conventions*.
2. **`THEMES[8]`** in `data.js`, appended — `st.theme` is an integer index, **never reorder**. Name, `sub`, `display`
   (TT2020, call 3) / `label` (Archivo Condensed) / `ui` + `body` (Archivo / Inter), `casing`, `dls` (the frame's
   `-0.045 em` on the display and typewriter body; `+0.72…0.84 px` on labels), `radius 0`, `bw 1`, `palette`
   (paper / mustard / ink), `tags` (the six seats), `sem`, and `schemes` (**read `THEMES[3]`…`[7]` and CLAUDE.md's
   scheme paragraph first**), plus `SCHEMES_OF.Backline` (rows 0–3 identical) and `pageGround` (paper). Whether the
   template needs a third face key (Paperback's `script`) is open: TT2020 *is* the display and the body, so probably not.
3. **The type ramp** (`RAMP` / `THEME_RAMP` in `EncoreBuilder.jsx`, Paperback's and Headliner's shape): desktop × 0.82,
   768 and 390 verbatim; check `preview.jsx`'s copy of `Z`. **Every other template's ramp stays byte-identical.**
4. **Fonts** (call 3), **`faceK`** (measure TT2020 against `absoluteRenderBounds` on a handful of strings), and the
   header's fit table for a monospaced face.
5. **The flag and the name inventory** (call 6) — the greps above, nothing skipped. `headerFamily` → a `backline`
   family of four (`HEADER_COUNT`, `HEADER_NAMES`), `setupHeaderCount` follows. `IDENTITY_CHARS`, `FIELDS[].in` objects,
   `chars` / `count` / `num` specs (**seed Backline's from Pop's, which `specAt` would give anyway, until session 12
   measures them — TT2020 sets wide, so expect every cap to come in under Pop's — and write that choice down**),
   `FOCUS`, `INLINE_OFF` keys (`Backline.0.…`), `PHOTO_OFF`.
6. **Seed the photography** (call 7) and **the art** (call 5): `backlineArt.jsx` after `headlinerArt.jsx`'s shape.
7. **The tooling accepts a ninth theme — check, do not assume** (Headliner's session 0 list: `focus-probe.mjs`,
   `inline-probe.mjs`, `photo-probe.mjs` take `--theme <Name>`, `photo-aspect.mjs`, `reach.mjs`, `limits.mjs`
   (`--themes=…`, `FLOOR_AT`), `digest.mjs` / `build-digest.mjs` / `shots.mjs`, `page-check.mjs`). Fix what hard-codes
   eight, in one commit named for the scripts, and prove each runs once at `theme=8`.
8. **The template card** (`TemplatePreview`, the filmstrip): the picker offers nine templates; the big card and
   thumbnail show a live `HeaderV0` once section 1 lands; check the picker's grid, not only the card.
9. **`vm.pageBg` / the page gutter / the published `documentElement`**: paper (`pageGroundOf()`), read, not guessed;
   `cardOnPage` for the form.

**Verification for session 0:**
- **Exit criterion: Retro, Lime, Grunge, Editorial, Pop, Lattice, Paperback and Headliner do not move.** A digest of all
  categories × 3 widths at `theme=0…7` before and after: zero rows (skip `.seal-spin`). `scripts/digest.mjs`, the
  two-server recipe in the `digest-two-servers` note, `browser-tool-choice` for the rest.
- Backline changes on purpose: screenshot the eleven sections at `theme=8` before and after (desktop only) and keep
  them in the scratchpad as the pass's "before" pictures.
- The builder opens with nine templates; picking Backline reaches the editor and does not throw; every section renders
  (legibly ugly is fine) at all three widths.

## The header, and the four cards

Section 1 follows calls 1 and 2. Whichever way they go:

- **The hero is a photograph, a bar and a stack at the foot**, with the name the biggest thing on it. The torn foot is
  the bio's seam (owned by the band below, or by the hero — read which node draws it). **The name is one line of
  monospaced type**: it must follow the artist's name at any length (`header-fit.md`: it shrinks to a 50 % floor, then
  a character cap), and with a monospaced face the fit is arithmetic; the olive `.` after it is the template's
  signature (art or a literal, a decision: it is not the artist's text).
- **The bar**: with call 1 A, hamburger left, Book Now right (`BookPill`'s Backline arm: a mustard rectangle, ink
  Archivo Condensed), at every width; the wordmark, the six inline links and the `NEXT STOP` line are not drawn.
- **The polaroid avatar** is a keylined, tilted photograph beside the (removed) act type and location: with both
  removed, the avatar either stands alone or is not drawn (call 1's last paragraph).
- **The six chips** print `vm.tagChips` on `vm.chips` (six `TAGS` seats): the frame's seats are plain / mustard / moss /
  dark olive / pale / dashed-outline, so `THEMES[8].tags` carries those and `sem.tagFg` the inks; the ticket-notched
  outline is a clip path.
- **The ring seal** is the badge's seat only if it is drawn at layout 1 (the bio's stamp is the bio's); the three
  `badgeMode` states hold; a stamp does not spin (Lime's reticle precedent: `badgeOptsFor()` offers Visible / Hidden).
- **The four setup cards** (cards 2–4) only need to render, publish and read legibly in Backline's tokens. Card 1 is the
  fitted Hero; check the modal's card ratio against the height rule (call 2).
- **The template card** and filmstrip thumbnail are a live `HeaderV0` at the picker's aspect (Headliner passed `fit`
  because its hero outgrew the card: check whether this one does).

## Backline's visual language

What every section session may use, so the sections agree:

- **Paper and olive bands, torn seams, grain.** Paper `#F5F6E8` (grained) and dark olive alternate; a moss band and a
  mustard band break the rhythm once each; a tear in the neighbour's colour at every head; **no straight seam, no arc,
  no wave**. Grain on every band (call 5).
- **Tilted, taped, notched cards.** Cards turn a few degrees (read each angle from the node's `rotation`; mind the
  CSS-clockwise sign, `figma-frame-reading`), carry a beige tape strip or two, and a **ticket notch** (semicircle bites)
  on pricing, map, calendar, hero and the media player. A small drop shadow lifts them: **read it from `effects`** (an
  effect style resolves its variables in the style's own mode).
- **Square otherwise.** Buttons, fields, chips and the arrow squares are right angles with a 1–2 px stroke; the chips are
  notched like tickets; round only on the stamps.
- **Hand marks, no words:** a circle round the picked day, an underline, a strike-through, dashed rules, dotted
  underlines under inputs. One stroke family (`border/default 2`).
- **TT2020 for everything set big or long** (heads, rows, the lead, paragraphs, footer links); **Archivo Condensed
  Bold, upper-case, tracked** for the small labels, chips, buttons, eyebrows and numbers.
- **Art is: the tear, the notch, the stamp ring, the barcode, the rings, the hand marks, the film strip.**

## Per-session procedure

Headliner's, verbatim — [`../headliner/layout-1.md`](../headliner/layout-1.md) *Per-session procedure* (which is
Paperback's, which is Lattice's, which is Lime's), with `s.headliner` read as `s.backline`, `theme=7` as `theme=8`,
and these changes:

1. Read the files above. **Session 0** follows *Session 0*.
2. `create_session` once for the Figma file; `get_metadata` on **the section's three nodes** (never the whole master —
   here that would be fine, but a section is what overflows); `get_screenshot` on each, `curl` it in the next call; load
   the `figma-design-to-code` skill, run `get_design_context` and `get_variable_defs` on all three nodes. **There is no
   twin node to diff by name**, so lay the prediction in the table above against the code's existing layout-1 branch:
   read it (**Grunge's and Retro's `s.v0` first** for the torn look, then Paperback's own tree for the tilted cards),
   list what the frame draws that it does not, and write the verdict (*dress the shared branch* · *widen the Lime
   block* · *new own-tree block*) under *Conventions → Seen at planning time* before writing code. **Read the narrow
   masters' own `get_variable_defs` before trusting their sizes** (a Device-mode leak, `figma-frame-reading`).
3. Implement inside the section's existing branch gated on `s.backline`, or in a `Backline*` tree of its own (*after*
   the section's hooks and seam, so the published controls are the shared seam's and only the picture is Backline's);
   **the stage pattern** is Paperback's and Headliner's (`BACKLINE_<CAT>` table, `containerType: inline-size`, `u(v)` in
   `cqw`, the frame's own numbers at all three widths); prefer session-0 tokens over literals.
4. **Verify** with the preview harness (`npm run dev` in `source/`, then
   `http://localhost:5173/preview.html?cat=bio&arch=0&theme=8&w=desktop` — `tablet`, `mobile`) and chrome-devtools:
   - **Look**: render vs frame; read geometry with `getBoundingClientRect()`, numbers not screenshots. **Tilted cards:
     read the angle and the corner positions, not the silhouette's bounding box** (`figma-frame-reading`).
   - **Function**: `&live=1`, drive every control in its active, idle and refused states.
   - **The other eight do not move**: a zero-row digest at `theme=0…7` at three widths, before and after in the same
     tab. The brace-depth walk (every added line inside an `s.backline` conditional) is the quick first check; the
     digest is the proof.
5. Commit with the section named in the subject; set the row's Status to `done <sha>`; add what the next unit needs to
   *Conventions*; commit that.
6. **Stop and hand off**: say the unit is closed, that this is the moment to `/clear`, and print the next unit's opening
   prompt as a filled-in fenced block (the *Hand off, don't roll on* note).

Do **not** refresh the root `index.html` per section.

## Session 12 — the proofs

Headliner's session 12, one session, each its own commit:

1. **Character caps**: a Backline row for every `FIELDS` entry / repeater column, measured with
   `node scripts/limits.mjs <cat> --themes=8`, then `--check` and `--seeds`; a seed must fit its cap. **TT2020 is a wide
   monospaced face at 100–150 px in the heads** (`240 songs.`, `manchester.`, `five worth`, the hero's name), so the
   caps are tight, and a monospaced head's cap is a character count, not a width. Judgement calls in the section's
   `notes/` file.
2. **Reach**: `scripts/reach.mjs` for `FIELDS[].in` and `IDENTITY_READS` at theme 8.
3. **Inline editing**: `scripts/inline-probe.mjs --theme Backline --layout 1 --width 1440,768 --check` until
   `inline-probe: PASS`; every slot the page does not draw is an `INLINE_OFF` row with its reason. **The bio's vertical
   statement and the tilted cards are the places the hit-test meets turned text** (`placeBox` carries a tilt's matrix;
   *vertical type* leaves it to the panel): expect ledger rows there.
4. **Photo editing**: `scripts/photo-probe.mjs --theme Backline --layout 1 --width 1440,768 --check` (and `--blank`,
   `--drop`); `PHOTO_OFF` for the rest. `focus-probe.mjs --prime --check` for the panel-to-canvas box. **The tilted
   polaroids and the duotoned hero are the probe's hard cases** (a click lands on a rotated box; `photoFieldAt` takes the
   stack under the pointer; a wash must be a scrim the click passes through).

## The end-of-pass sweep

After section 11 and session 12, in one session (Headliner's list is the model):

1. **CLAUDE.md and README.md** where the wording says *eight templates* / *the other seven*: the template list, the file
   line counts, the flag paragraph, the scheme paragraph, the font note (TT2020, Archivo Condensed), the photography
   note, the file size, and a `notes/templates.md` Backline section holding its visual language.
2. **Code comments that make a claim about the template list**
   (`grep -rn "all eight\|other seven\|eight templates" source/src/builder`).
3. **`plans/CONVENTIONS.md`**: fold the *Inherited and used* list in.
4. **One whole-page published check under Backline**: pick the template, choose Hero, Publish → Open, then every nav
   link, the hamburger at 390 and 768, Book Now, the media player (one trusted click), the gallery, repertoire, map,
   pricing, calendar, form and testimonials controls, the footer's links and pill. Eyeball every tear against its real
   neighbour (**the band colours' order** is what needs the eye).
5. **The four header cards** render and publish with all eleven sections each, in their `pageOrder(i)`; no console
   error on any card; setup cards 2–4 walked at 1440, 768 and 390.
6. **`plans/README.md`**: mark the pass closed (merging is the user's call).
7. **Refresh the root `index.html` and `published.html`** (CLAUDE.md, *Commands*): `npm run build:standalone`, the two
   `cp`s, and the two-build digest — **zero rows at themes 0–7, non-zero at theme 8**. Say what the file grew by (from
   15,306,066 bytes).

## Open questions

1. **Does TT2020's licence allow bundling, and where does the file come from?** (Call 3 A depends on it.)
2. **Is the hero's olive a wash over a colour photograph or a baked tint?** (Call 7: decides whether the crop editor
   edits a colour picture and the tint is markup.)
3. **How many distinct tear shapes does the frame draw?** One recurring edge reused (a vector, one path) or a different
   raster per seam (call 5 B). Export two or three of the 88-px PNGs and compare.
4. **Do the narrow masters pair with the desktop by order and by content?** Checked by height at planning; each
   section's session compares the three screenshots first. At 768 and 390 the frames re-lay the header (a hamburger, a
   wider ticket), the bio (the vertical statement: kept turned or laid flat?), the media (the player below the rows),
   and the calendar (calendar over ticket); read each.
5. **The gallery's 390 / 768 accordion** and **the repertoire's two-column setlist at 390** (one column?) are not read at
   planning: each section's session reads them.
6. **Which of the stamps is a badge?** The bio's round stamp is the badge seat at layout 1 (`badgeMode`); the map's
   and the testimonials' stamps and the gallery's `CONTACT SHEET` have no field, so call 1 A leaves a ring with no
   words or no ring at all — the map's ring is also the `120 mile radius` pill's seat (`vm.mapRadius`).
7. **Does the form's card straddle two bands, or is the card's left half a nested scheme?** The picture shows the
   paper page continuing behind a dark-olive left panel and a paper right panel: read the fills.

## Conventions

*(Filled in as the pass goes: **Seen at planning time, per section**; **Settled in session 0 — the foundation**;
**Settled in sections 1–11**; **Conventions section N inherits**; **Inherited and used**; **Open calls**. Headliner's
file is the shape.)*

### Seen at planning time, per section

What the pictures show that the table's one line cannot hold, so each section's session starts with it. **All of it is
a read of 1440 screenshots (and two narrow heroes), not a measurement**; each section's session re-reads the three
nodes before trusting a number.

- **header (1).** The bar is **80 px tall** at 1440 (`top: 80` for the footer's content, the hero's bar similar: read);
  the wordmark is TT2020 48 with a `-2.16` tracking and an olive `.`; the six links centre at ≈ 516, 609, 701, 795,
  890, 972 (read off the 1440 picture: measure the exact positions). The ticket is tilted about **+4°** at 1440 and wider at 768 / 390 (it sits left of centre, across the
  middle figure, at 768 and 390); the name sits at the foot-left over the darkest part of the wash, so **its contrast
  is the photograph's wash**. At 390 the six chips wrap to two rows and the ticket's title wraps to two lines.
- **bio (2).** The vertical statement is **two rotated columns of one string** (`reads the` / `room.`), turned
  counter-clockwise, the second **overlapping the photograph's left edge by ~ 90 px** with the olive `.` above it; the
  photograph is *under* the letters. Verify at 768 / 390 whether it stays turned. The stamp's ring text and the
  `001` / `STRUCTURE · BIO_01` pair are call 1's.
- **media (3).** The head `five worth` is **two words** at ~ 100 px cream with a faint ghost of the rest of the string
  (`your ear`?) behind the right half: an import artefact or a clipped third word — read the node. The lit row's
  **strike-through is a hand-drawn mustard path** over the title, not a text decoration. The player card is tilted
  about **+2°**, taped, notched at its four corners, with a barcode column and a polaroid photograph.
- **gallery (4).** The open row's **notched ends** are the same ticket notch as the cards' (a clip path); the closed
  rows' **dashed outlines** are tilted by fractions of a degree (hand-placed); the viewer photograph is tilted about
  **-1°** with a tape strip at its top-left; the film strip is a dark band tilted about **+1°** holding seven
  thumbnails. The frame breaks the head after `see us in` (a measure's or the string's middle — read).
- **repertoire (5).** The setlist card is **tilted about -1°** with two tape strips; its rows are **dashed rules**, a
  pale olive number in TT2020 / Archivo, the title in TT2020 28, the artist in TT2020 14, flush right; `encore: …` is
  a handwritten-looking TT2020 line in olive at the card's foot. The search box is a **dotted underline only** (no
  box).
- **map (6).** The gig rows are **ticket stubs: notched at both ends, tilted by fractions of a degree, each with a
  dashed divider after the date block**; the rows' **shadows read as stacked paper**. The rings are the Headliner /
  Paperback shape (two solid, two dashed, a dot) in ink on paper with an olive dot — Headliner's `HeadlinerRings`
  may be reusable: read `headlinerArt.jsx` first.
- **pricing (7).** Three cards, **tilted about -2° / +1° / -1°**, dark olive / mustard / moss; **the middle one is
  taped** and the featured plan by place (as every earlier template); the first card has **four** features, the others
  five; each card's foot has a **notched bite** at its bottom corners. `X` marks (`✕`) lead the rows where the
  earlier templates drew ticks or numbers. Fills by `t.n % 3` (Headliner's rule: a tab that hides a card must not
  recolour the rest).
- **calendar (8).** The calendar paper is tilted about **-1°** with two diagonal tape strips at its top corners
  (cut by the paper's own corners) and its arrows are outlined squares *on* the tape's ends; the picked day's circle is
  a hand-drawn olive loop. The ticket is tilted about **+3°**, notched, with a rotated mustard stamp. The head is
  `pick a date,` at about 70 px — **not** Headliner's 150 px — with a gap where a second line would be.
- **form (9).** The card has **no outer border**; its left panel is darker than the page's olive bands (a deeper
  olive) with a grain, and the right is paper with a tape strip at its top-right corner. Fields are **underlined**, not
  boxed; the chips are square-outlined. The foot `BOOK NOW` is **olive on paper**, not mustard.
- **testimonials (10).** **730 tall at every width** (the frame's own, as Paperback's and Headliner's). The card is
  tilted about **-1°** with two tapes, 980 wide at 1440; the stamp is a round olive ring `FIVE STARS ★ HOSTS AGREE`
  with `5/5` in the middle.
- **footer (11).** Read in full at planning (`get_design_context`): the band's grain is a full-bleed raster; the tear
  at its head is an 88 px raster at `top: -1`; the content starts at `top: 80`; the columns are 166.84 wide at left
  506.96 / 693.79 / 880.63 with headings 13.8 tall and links on a 24 pitch; the newsletter column is 311.52 wide at
  1079.46 (the input 46 tall with a 1 px cream foot, the `SIGN UP` button 121.34 × 46, cream with ink type); the rule is
  dashed at `rgba(237,239,218,0.24)`, 48 below the columns; the two labels are Archivo Condensed 11. The link set the
  frame draws (`About / Top Tracks / Media / Repertoire`, `Shows / Pricing / Enquiries / Reviews`, `Instagram /
  Soundcloud / TikTok / YouTube`) is three groups of four.

### Settled in session 0 — the foundation

Branch `backline-layout-1`, 2026-11-24. **The opening calls (1 to 4), the name (6) and the art (5) were put to the user and
all six were taken as recommended**: (1) every standing removal holds; (2) no LP ticket, `vm.heroH` 914.44 at 768 and 880 at
390 only (**not yet written: it is section 1's work**); (3) TT2020 Base is self-hosted behind a `Courier Prime`, `monospace`
fallback; (4) `casing: 'title'` plus a per-site transform; (5) A, Backline's own `backlineArt.jsx`; (6) the name is
`Backline`. Call 7 (photography) had no options: it went as the plan recommends (a ninth shoot, JPEG, budgeted).

**No variable modes.** Unlike Paperback's and Headliner's, these frames bind nothing: each section's only fill is **one grain
image** (the colour is baked into the raster, sd 4.2 to 4.8 levels), the file carries no per-Device size set and
`explicitVariableModes` is empty on every master. So every colour below is **sampled from a render** (the mean of the grain
fill), not read from a token, and the sizes are what the text nodes draw. `get_variable_defs` answering `sem/bg` mustard for the
page is not the page's ground either: the page is paper.

**Grounds (band means, sampled):** paper `#EAECD7` (the bio's fill; the *card* token is `#F5F6E8`), olive `#4C4E29` (header,
media, gallery, footer, form's left panel), moss `#A7A03B` (the map), mustard `#D2BD21` (the testimonials), ink `#23240F`.
`THEMES[8]`: `palette ['#EAECD7', '#D4BE1E', '#23240F']`, `pageGround '#EAECD7'`, seven `tags` seats, `sem`
(`box1 #F5F6E8`, `box2 #EDF0DB`, `box3 #D6D2A0`, `glow` / `activeBg` the mustard accent `#D4BE1E`, `activeFg` ink,
`hl` / `text3` `#6F630A`, `text1` ink), and `schemes` 2 olive `['#4C4E29', '#D4BE1E', '#F5F6E8']`, 3 moss `['#A7A03B',
'#23240F', '#23240F']`, 4 mustard `['#D2BD21', '#23240F', '#23240F']`, 5 the paper card `['#F5F6E8', '#D4BE1E', '#23240F']`.
**`SCHEMES_OF.Backline`** rows 0 to 3 identical (the placeholders copy row 0): header, media, video, repertoire, calendar
and footer on 2 (olive), the map on 3 (moss), the testimonials on 4 (mustard); the bio, gallery, pricing and form stand on
the theme's own Scheme 1 (paper). **Grounds the bands render as and the tokens differ:** the band is the *render*; a section
that paints a band reads `s.onScheme[n].bg`, not `s.bg`.

**Faces.** Display **TT2020 Base Regular**, the frames' typewriter face, **not on Google Fonts**: OFL 1.1 (Fredrick R.
Brennan, github.com/ctrlcctrlv/TT2020; no Reserved Font Name), a real 64.7 KB woff2 subset to Basic Latin, Latin-1, the curly
quotes, dashes, ellipsis, euro and bullet (**24,004 bytes**, every name ID and the licence text kept), inlined as a data URI in
`src/backline-fonts.css` (imported by `index.css`), so the single-file build, the dev server and the published tab's
cloned head all carry it with no network. The licence text is `src/fonts/TT2020-OFL-LICENSE.txt`. It is **monospaced (0.547 em
advance)**, so a head's fit table is a constant, and it **has no arrow, star, cross, bullet disc or pencil**: those are SVG.
Labels **`Archivo Backline`**, an `@font-face` alias pinning the one Archivo variable file at `font-weight: 700;
font-stretch: 75%` (the frames' *Archivo Condensed* Bold), so no section names an axis and the `Archivo` link is untouched;
proved against the frames' text boxes (`BOOK NOW` 14 px +0.84 sets 69.47 against 69, `REPERTOIRE` 80.88 / 81, `SOUNDCLOUD` 88.02 / 88,
`NEW RELEASE` 12 px 76.84 / 77, `JOIN THE GUEST LIST` 13 px 124.42 / 124; plain Archivo sets `BOOK NOW` 84.34). UI `Archivo`, body
`Inter`. `dls '0px'`: the frames' -0.045 em on the display is set by site.

**Ramp** (`THEME_RAMP.Backline`, read off the three masters' text nodes; desktop is the frame × 0.82, 768 and 390 verbatim): see
the table in `EncoreBuilder.jsx`. Keys: `dispXl` the header's name (201.6 / 125 / 61), `dispLg` the repertoire's head, `dispMd` the
pricing's prices, `dispSm` the form's head, `title` the now-playing name, `list` a track's name, `labelLg` the calendar's
22, `labelMd` / `labelSm` / `labelXs` the Archivo Condensed 14 / 13 / 12, `bodyLg` the TT2020 17, `bodyMd` the 15, `bodySm`
the 14, `chip` 11 and `eyebrow` 10. The bio's, media's, gallery's, map's, calendar's and testimonials' heads sit between keys
and are written by their sessions. Every other template's ramp is byte-identical (the digest below).

**The flag and the gates.** `backline: T.name === 'Backline'`, with `designed` and `limeTree` widened to it (until each
section has its own `Backline*` tree the Lime block stands in Backline's tokens: without `limeTree` a layout-1 media reads
`S3.activeBg` of null). `headerFamily` 'backline' of four (`HEADER_COUNT`, `HEADER_NAMES`; the cards 2 to 4 are Lime's and
Pop's trees in Backline's tokens, the placeholders). **The inventory** (`grep` over `source/src/builder/*.js*` and
`source/scripts/*.mjs`, nothing skipped), each gate with its Backline row or its reason:
- `specAt` falls to **Pop's** row (`spec[T] ?? spec['*'] ?? spec.Pop`; the fallback list names Backline). 119 spec objects,
  49 of them with no `'*'`, so **49 caps are Pop's until session 12 measures them**; TT2020 sets wide (0.547 em), so expect every
  one to come in under Pop's. `limits.mjs header,…,video --themes=8 --seeds`: 0 seeds over their caps.
- **`in` objects**: eight header rows (`heroCta`, `faceTitle`, `faceBody`, `tags`, `showTags`, `badgeMode`, `badgeText`, `align`)
  name every template without a `'*'`, so each got a **`Backline:` row, a copy of Headliner's** (a placeholder: the header
  session re-measures). No other `in` object lacks a `'*'`.
- `IDENTITY_CHARS` has 11 entries without a `'*'` (bio `title` / `location` / `tags` / `seal`, calendar `seal`, footer `title` /
  `seal`, form `title` / `seal`, media `title`, pricing `seal`); **none names Backline, so each falls to Pop's**
  until the section's session writes a row.
- `INLINE_OFF` / `PHOTO_OFF` have no fallback: **no `Backline.*` row exists yet**; each section's pass writes its own as it
  passes `inline-probe` / `photo-probe`.
- `FOCUS` is keyed by file: the nine Backline photographs carry none (centred); the section that crops one reads it.
- Scripts that hard-coded eight: `limits.mjs` (the `--themes` default), `photo-aspect.mjs` (the default theme list),
  and the header comments of `digest.mjs`, `reach.mjs`, `focus-probe.mjs`, `inline-probe.mjs`, `photo-probe.mjs`. All take
  `--theme Backline` / `8` by name or index (see *Tooling*).

**Photography** (call 7): a ninth shoot, **eighteen JPEGs, 560,844 bytes raw**: the hero (1440 px q55, 187,910, the frame's
sepia monochrome, **imported whole**: the frame stands an olive `COLOR`-blend layer at 55 % over it, `blend-color`, which is
markup), the polaroid avatar (146 × 168), the bio portrait (403 × 577), the media player's cover (the frame's `Night Rain`),
**five row covers** (110 px, none of the gallery's), **seven gallery shots** (174 px, in the frame's x order) and the viewer
(`The band in the control room`, 628 × 444, none of the seven), and the form's own avatar (102 × 114). The frames' `blend-overlay`
layers (`OVERLAY` at 16 %, a texture over every photograph) are not imported: grain, art. `BACKLINE_PHOTOS`, `BACKLINE_COVER`,
`BACKLINE_TRACK_ART`, `BACKLINE_VIEWER` and `SEEDS.Backline` in `photos.js`. **The gallery strip is the seven shots** and the
viewer and cover are exported beside it: **how the gallery stands the viewer and how the media stands the cover are those
sections' calls** (Headliner seeded the cover as track one's art and the viewer in slot two; Backline's covers and shots are all
different pictures, so neither trade is forced). **Byte budget:** the standalone build reads **15,919,372 bytes against the root
`index.html`'s 15,306,066: +613,306** (fonts 35.7 KB and art 27.6 KB included). The root is not refreshed.

**Art** (call 5 A): `backlineArt.jsx`, pure SVG functions, no hook. **Four distinct tear contours** exist in the desktop
frames (the header's, media's, gallery's and form's 1440 × 88 rasters: 2,544 to 2,704 of 2,880 columns differ by more than a pixel
between any two), so `BACKLINE_TEARS` holds four traced paths (767 points, 6.7 KB each, simplified to 0.5 px) and
`BacklineTear` draws one in the neighbour's colour with a pale fibre fringe (olive .27, paper .8) and a soft shadow. **`BacklineGrain`**
lays one 192 px lossless-WebP tile (`backline-grain.webp`, 27.6 KB, grey 128 ± 10 × the frames' grain, high-passed at 24 px) with
`overlay`, **opacity per ground** (`GRAIN_OPACITY`: paper .75, olive .21, moss .18, mustard .28), calibrated by rendering the tile over
each ground against the frames' own sd (paper 4.8, olive 4.2 to 4.4; moss and mustard assumed to grain like olive: read from
renders, not from a fill). `vm.backlineGrain` is the tile's URL, set for Backline alone. **The tape, the ticket notch, the stamps,
the barcode and the hand marks are not here**: each is added by the section that draws it, measured off its own frame.
**Open for section 1:** whether the 768 and 390 tears are the desktop contour squeezed in x or their own (the component stretches
one path in x and keeps the 88 tall).

**Tooling** (step 7, each run once at `theme=8` / `--theme Backline`): `digest.mjs`, `shots.mjs` (the eleven before-pictures
are in the session's scratchpad), `limits.mjs --seeds`, `focus-probe.mjs` (header, layout 1: 12 controls, 0 failing),
`inline-probe.mjs` and `photo-probe.mjs` (**run, FAIL as expected**: the placeholder header draws copy over the photograph, so
`header.image` is MISSING; section 1 fits it), `photo-aspect.mjs` (PASS), `page-check.mjs Backline 0` (walks to the published
tab), `reach.mjs 8`. None hard-coded eight past what the commit names.
