# Headliner layout 1 — section-by-section plan

This is the working checklist for bringing an **eighth template, Headliner**, to the builder at **layout 1**, from
the Figma file *JustPay — Batch 2* (`ORILFywSzuadscu6RzskCW`), frames named **"Headliner Structured — Claude Design"**.
It runs one unit per session, clearing context between units; git and this file are the memory. Written 2026-11-23
from a planning read of all three masters (a screenshot of every desktop section and of the narrow heroes, the
section trees at all three widths, `get_variable_defs` on the page and on eight sections, and `get_design_context` on
the footer). Nothing in `source/` has been touched.

**This is the pass Paperback's layout 1 was** — the same file, the same eleven components, the same builder — and it
leans on [`../paperback/layout-1.md`](../paperback/layout-1.md) and [`../lattice/layout-1.md`](../lattice/layout-1.md)
for procedure and for everything the builder grew after Pop (caps, ledgers, the sweep). It does not repeat them.
What is written here is what differs:

1. **Same Figma file, same HTML-to-Figma import style** — layers are `Section` / `Container` / `Icon` / `Link` /
   `Text`; no component sets, no `Theme=` variants, so a section's twin is decided by composition and geometry, not a
   paired diff walk by layer name. Variables are bound, **but partially and node-dependently, and some answers are
   wrong** (below): read `explicitVariableModes` and the node's own `fills` before trusting a token.
2. **The look is brutalist and flat: the opposite of Paperback's.** **Square corners everywhere** (pills `999` only on
   chips; every card, field, button and arrow disc is a right angle), **1 px hairlines** (`border/hairline 1`),
   **full-bleed colour bands with straight seams**, no tilted cards, no tape, no stickers, no confetti, no grain.
   The whole personality is **Anton set enormous** (the hero's name is ~ 300 px), a hairline grid, and a palette of
   **maroon `#760000`, orange `#F85E34`, amber `#F8A351`, teal `#3B758B`, cream `#F8F2E7` / sand `#EEE3D1` and a
   `#1E1E1E` footer**. Its only art is a **wavy-line field** (the hero's orange panel, the calendar's maroon panel), a
   **ringed `26` numeral**, **two arrow glyphs**, an **eye** glyph (gallery, calendar) and a **vertical** Anton
   statement. Expect it to be *closer to Retro's and Grunge's layout-1 inventories than Lattice's or Paperback's
   were* (both already set Anton, square-ish and hairline): **"dress the shared `s.v0` branch behind `s.headliner`" is
   a live option per section, not only "a new own tree"** — decide by the read (below), not by precedent.
3. **A lot of the frame's copy is something a standing rule removed** (the header's inline nav, wordmark and
   `KAI MER` logo, the act-type and location lines, `KM BIO`, `001 · STRUCTURE · BIO_01`, `TOP TRACKS` / `5 / 5
   FEATURED`, `SHOWS / COVERAGE`, `120 MILE RADIUS`, `REVIEWED 6 DAYS AGO`) **and the footer's newsletter again**.
   **Call 1 below is the user's**, and session 0 opens on it.
4. **Three faces, and one of them is a trap.** Anton (display and labels), **Fraunces Light** (the serifs: the hero
   tagline, the bio lead, pricing blurbs, the calendar's foot line, the footer tagline) and **Inter Tight** (UI and
   body). Anton is already loaded; **Inter Tight is not**; and **Fraunces here is `Light 300, SOFT 0, WONK 1`, where
   Retro's single loaded instance is `900, SOFT 100, WONK 1`** — a second instance in the same `family=` entry makes
   Retro's weight-less `Fraunces` text resolve to 300. **Call 3.**
5. **The hero is 900 tall at all three widths, and 80 of it is an in-frame nav bar.** Paperback's and Lattice's were 750
   (`vm.heroH`, narrow-only, `EncoreBuilder.jsx:995–1000`); this one is the third value. **Call 2** and section 1.
6. **A new template owes** the character caps, the inline-edit ledger, the photo-edit ledger and the per-template `in`
   rows. Those are *proofs*, scheduled as session 12.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then
- [`../paperback/layout-1.md`](../paperback/layout-1.md) — *Session 0*, *Per-session procedure*, *Session 12*, *The
  end-of-pass sweep*, and its **Conventions → Settled in session 0** and *Inherited and used* (the eighth template
  meets every name gate, tool and ledger the seventh did; its *Open calls* are what a layout-1 pass leaves behind)
- [`../lattice/layout-1.md`](../lattice/layout-1.md) for what Paperback leans on, and
  [`../CONVENTIONS.md`](../CONVENTIONS.md), groups **A, B, C, D1, F and G**
- the section's *Settled in section N* bullets in [`../grunge/layout-1.md`](../grunge/layout-1.md) and
  [`../retro/layout-2.md`](../retro/layout-2.md)'s *Conventions* (the **nearest relatives**: Anton, hairlines, band-on-band pages), plus `notes/<section>.md`
  for the section's current live behaviour
- `notes/templates.md`, and `plans/header-nav.md` and `plans/header-fit.md` for the header session
- the *Per-session procedure* of [`../lime/layout-1.md`](../lime/layout-1.md), via Lattice's and Paperback's

Then the memory notes `figma-frame-reading`, `verifying-the-published-tab`, `browser-tool-choice`,
`load-figma-fonts`, `digest-two-servers` and `handoff-prompt-on-finishing`. `SPEC.md` lives in git history:
`git show 8fa8ff4:SPEC.md`.

Branch: **`headliner-layout-1`**, forked from `main`.

## What the pass must deliver

1. **Every section works in the published tab under Headliner** — every control CLAUDE.md lists under
   *`s.live` is false everywhere except the published tab*.
2. **Every section looks as close to its Figma frame as possible**, at 1440 (× 0.82 onto the 1180 canvas), 768 and 390.
3. **Headliner's template card** on the picker — big preview and filmstrip thumbnail — is a live `HeaderV0`.
4. **The setup modal shows four Headliner cards.** Card 1 is the fitted Hero. Cards 2–4 only need to render, publish
   and read legibly in Headliner's tokens (Lime's, Pop's, Lattice's and Paperback's rule) until later passes fit them.
5. **The other seven templates do not move.** `theme=0…6` digest to zero rows across every category and width.

## The Figma source

File `ORILFywSzuadscu6RzskCW` (*JustPay — Batch 2*), one page, the same page as Lattice's and Paperback's frames
(Lattice `1:306`, Paperback `1:2316`). The Figma tools need `create_session` first.

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Headliner Structured — Claude Design — Desktop | `1:4478` (`Body` `1:4479`, `Main Content` `1:4480`) | 1440 × 9607 |
| Tablet | … — Tablet | `1:15259` (`Body` `1:15260`, `Main Content` `1:15261`) | 768 × 12234 (its `Body` is 12311) |
| Mobile | … — Mobile | `1:16314` (`Body` `1:16315`, `Main Content` `1:16316`) | 390 × 13117 (its `Body` is 13175) |

- Desktop: <https://www.figma.com/design/ORILFywSzuadscu6RzskCW/JustPay---Batch-2?node-id=1-4478&m=dev>
- Tablet: <https://www.figma.com/design/ORILFywSzuadscu6RzskCW/JustPay---Batch-2?node-id=1-15259&m=dev>
- Mobile: <https://www.figma.com/design/ORILFywSzuadscu6RzskCW/JustPay---Batch-2?node-id=1-16314&m=dev>

**`get_metadata` on a whole master overflows (≈ 127–129 K characters) and the tool saves it to a file.** The file is a
JSON array of `{type, text}`: **join every element's `text`**, then slice with `python3 -I` (the top-level sections are
the `frame name="Section"` children of `Main Content`). Better: `get_metadata` per section node.

**Whole-master screenshots are useless** (1440 × 9607 comes back 307 px wide); screenshot per **section** node (not its
`Container`), `maxDimension` 1440 at desktop, and `curl` the URL in the next call (it is short-lived).

**A stray floating `Container` stands beside each master's `Main Content`**: `1:5540` (86.7 × 86.7 at 830, 3445),
`1:16313` (95.4 × 95.4 at 129.5, 4548) and `1:17362` (42 × 42 at 74, 4145). It is outside every section, the same
object at three sizes, probably a cursor-follower or a hover chip the importer left. **Not read** at planning; section
sessions look at it once (`get_screenshot` on it) and write *nothing to draw* or what it is under *Conventions*.

## The sections

Session 0 first, then eleven sections in the page's order. **The page has exactly Retro's eleven categories in Retro's
order; the masters pair 1:1 by order** (desktop, tablet and mobile each have eleven `Section`s, heights below). Sizes
are the frames' own. Matches are by order, so each section's session checks its two narrow screenshots against the
desktop picture before measuring (open question 4).

| # | Cat | Desktop node | Size | Tablet node | Size | Mobile node | Size | Composition (from the pictures) · predicted twin | Status |
|---|---|---|---|---|---|---|---|---|---|
| 0 | *foundation* | `1:4478` | — | `1:15259` | — | `1:16314` | — | `THEMES[7]`, ramp, faces, photos, the flag, the wavy-line art | |
| 1 | `header` | `1:4481` | 1440 × 900 | `1:15262` | 768 × 900 | `1:16317` | 390 × 900 | **Maroon** hero in two parts: an **80 px nav bar** (hairline foot; `KAI MER` red square logo + `KAI MERCER` wordmark; **five inline links** `About · Top Tracks · Media · Repertoire · Shows · Pricing` at 1440, a hamburger at 768 / 390; an orange square `Book now →`); under it a **820 px stage** split by a **slanted edge**: maroon left with a Fraunces tagline (`A DJ who reads the room, then turns it up.`, orange) and a small Inter line, the **portrait photo** clipped to a parallelogram in the middle, an **orange wavy-line panel** on the right with a **ringed `26`** and a **big black arrow →**; an avatar + `DJ · LIVE ACT / MANCHESTER, UK`; **six chips** (`Default` black, `Sold out` orange, `New release` amber, `Archive` teal, `Live` green, `All access` outline); and the **name `KAI MERCER` at ~ 300 px Anton, one line, painted in three colours across the slanted edge** (orange on maroon, cream over the photo, black over the orange panel) · **Retro's / Grunge's `HeaderV0` with its photo and badge seat, probably an own tree for the clipped title** — read both, then decide | |
| 2 | `bio` | `1:4627` | 1440 × 832 | `1:15396` | 768 × 1293 | `1:16446` | 390 × 1209 | **Cream** (`#F8F2E7`); a **vertical Anton statement** `READS THE ROOM` in two rotated columns, the second **overlapping the portrait's left edge**; a tall **portrait on an orange ground** (square-cornered); right: a Fraunces lead (`DJ and selector based in Manchester…`) top, a hairline, `ABOUT` (maroon Anton) + an Inter paragraph foot; `— KM BIO` eyebrow and a `001` / `STRUCTURE · BIO_01` chip pair bottom-left · **own tree** (nothing in the builder rotates a statement under a photo — check Grunge's and Retro's bio first) | |
| 3 | `media` | `1:4650` | 1440 × 1057 | `1:15421` | 768 × 1219 | `1:16471` | 390 × 1251 | **Maroon**; a **~ 230 px black Anton headline** `FIVE WORTH YOUR EAR` (black on maroon, spanning the row) with `TOP TRACKS` / `5 / 5 FEATURED` in amber at its foot-right; left: **five hairline rows** (number, 56 px square cover, title in Inter Tight, subtitle, a time, a **square outlined play button**; row 2 lit: cream title, an **orange** play square), an orange `SOUNDCLOUD →` button; right: a **black player card** (a 377 × 266 photo, `NIGHT RAIN` in cream Anton, `KAI MERCER` amber, three square transport buttons with the orange play, a progress rail and `02:28` / `04:22`) · **Retro's `v0` media body** (list + player), re-dressed — the inventory matches; confirm | |
| 4 | `gallery` | `1:4766` | 1440 × 849 | `1:15538` | 768 × 1386 | `1:16587` | 390 × 943 | **Sand** (`#EEE3D1`); `— MEDIA` eyebrow, a two-line **black Anton** `SEE US IN ACTION`, four **hairline accordion rows** in Anton at ~ 64 px (`GALLERY` orange with an orange arrow →, `YOUTUBE` / `INSTAGRAM` / `TIKTOK` black with black arrows); right: a **`BACK TO BEGINNING →` outlined button**, a **teal eye glyph**, a 654 × 480 photo with a **black / orange square arrow pair** in its foot-right corner, and **seven thumbnails** in a row · **Lime's *Photo viewer* inventory** (source rows + viewer + strip), as every earlier template read it | |
| 5 | `repertoire` | `1:4830` | 1440 × 1067 | `1:15602` | 768 × 1067 | `1:16651` | 390 × 1603 | **Cream**; `— REPERTOIRE`, **`240 SONGS` at ~ 150 px black Anton**, a square **search box** right (hairline), four **pill chips** (`ALL` black), a **two-column dense** list of 6 + 6 hairline rows (maroon number, Anton title, an Inter artist right-aligned), a pager of **square numbered buttons** (`←  1  2  3  …  20  →`) · **Lime's *Two-column dense*** inventory | |
| 6 | `map` | `1:4955` | 1440 × 1051 | `1:15726` | 768 × 1559 | `1:16776` | 390 × 1435 | **Teal** (`#3B758B`); `— SHOWS / COVERAGE` (amber), **`MANCHESTER` at ~ 200 px cream Anton**, an amber pill `120 MILE RADIUS`; left a **maroon square panel** with **concentric rings** (two solid, two dashed, an orange dot) and a foot `BASED IN MANCHESTER` + `120 MI STANDARD · FURTHER ON REQUEST`; right: `UPCOMING GIGS` / `05 OF 12`, five hairline rows (a **square date tile**: orange, amber, cream, cream, cream; title in Anton; `Town · time`; an orange `SOLD OUT` pill or an outlined `TICKETS` pill), a pager (`←  1 2 3  →`, orange current) · **Lime's *Compact tile*** (the raster map is the rings art, as Paperback's) | |
| 7 | `pricing` | `1:5067` | 1440 × 1152 | `1:15838` | 768 × 1556 | `1:16888` | 390 × 2112 | **Sand**; `— PRICING`, a two-line **black Anton** `PICK YOUR NIGHT'S SET`, a **Solo / Trio / Band** pill toggle (black current), **three square coloured cards** (orange, maroon, teal) each: name + `/ EVENT`, a **big cream / black price** in Anton, a Fraunces blurb, 4–5 hairline feature rows with a **numbered `01…05` tail**, a square `BOOK THIS SET →` button (black on orange, orange on maroon, sand on teal); a Fraunces small-print foot · **Lime's pricing** inventory (own tree likely; the cards are flat and keep the numbered rows) | |
| 8 | `calendar` | `1:5205` | 1440 × 859 | `1:15976` | 768 × 1044 | `1:17026` | 390 × 1027 | **Amber** ground (`#F8A351`) with **one card** (cream left: black arrow squares, `JUNE 2025` in Anton, a hairline month grid with the picked day a **black square with an orange numeral**; right: a **maroon wavy-line panel** with a **ringed `KM`** disc, **`PICK A DATE.` at ~ 150 px orange Anton**, an eye glyph, a big cream arrow ←) and a **cream foot bar** (`Enquiry for Thursday, June 12 at 9:00pm` in Fraunces + a black `CONTINUE →` button) · **Lime's *Scheduler*** inventory | |
| 9 | `form` | `1:5385` | 1440 × 714 | `1:16159` | 768 × 1066 | `1:17207` | 390 × 1309 | **Cream** page, **one card**: a **maroon context panel** (avatar + `KAI MERCER` / `DJ · LIVE BAND`, a three-line **orange Anton** `LET'S MAKE YOUR NIGHT UNFORGETTABLE.`, three hairline promise rows with amber numerals) + a **sand form** (name, email, date, guests, `EVENT TYPE` pills with `WEDDING` black, message, an orange `BOOK NOW →`), all fields square, 1 px · **Lime's *Split context + form*** | |
| 10 | `testimonials` | `1:5460` | 1440 × 730 | `1:16233` | 768 × 730 | `1:17282` | 390 × 730 | **Orange**; a **maroon `“` mark**, `REVIEWED 6 DAYS AGO`, the quote at ~ 100 px black Anton, two pills (`HANNAH L.` maroon, `PRIVATE HOST` black), **two black square arrow buttons** at the edges · **Lime's *Stacked tag card*** inventory re-laid as a centred single quote | |
| 11 | `footer` | `1:5480` | 1440 × 395 | `1:16253` | 768 × 492 | `1:17302` | 390 × 655 | **`#1E1E1E`**; the `KAI MER` red square + `KAI MERCER`, a Fraunces tagline (`House, disco, soul and 80s — chosen by the room.`), **three link columns** `EXPLORE` / `MORE` / `SOCIAL` (four Anton links each at 20 px, orange headings), **`JOIN THE GUEST LIST` + an email box + a sand `SUBSCRIBE →`** (new), a hairline, `© 2026 KAI MERCER` and `A JUSTPAY PRODUCT` · **Lime's footer** + a newsletter block no template has (call 1) | |
| — | `video` | *none* | — | — | — | — | — | not on this page: it takes session 0's tokens and nothing else (the frames draw it at layouts 2 and 4 only) | — |

The three columns were matched **by page order and by height**, not by layer name (every master names its sections `Section`); **the testimonials are 730 tall at every width, as Paperback's were** (the frame's own).

The **ground sequence** read from the pictures: maroon hero · **cream** bio · **maroon** media · **sand** gallery ·
**cream** repertoire · **teal** map · **sand** pricing · **amber** calendar (with a cream-and-maroon card) · **cream**
form (with a maroon-and-sand card) · **orange** testimonials · **near-black** footer. Every band is full-bleed and
**every seam is straight** (no arc, tear, wave or rounded foot): `above` / `below` read nothing for Headliner. **Where
the frame stands a card on the page, the page is the band's colour and the card is a scheme seat** — the calendar's and
the form's: Editorial's / Pop's `cardOnPage` mechanism (`vm.pageBg`), as Paperback used it. Re-measure every ground and
height from the frame; the numbers above are a read of the pictures.

**Re-measure from the Headliner frame; never reuse a twin's block sizes.** A section whose composition turns out to
differ from its prediction is the exception: **stop, and record it under *Conventions* before writing code.** This
pass's per-section default is *whichever of "dress the shared branch" and "own tree" the read supports*; Lattice and
Paperback went own-tree for all eleven because their frames were an unrelated look, and **this frame is the first of
the HTML-to-Figma family whose sections read like an existing one**.

## The tokens read at planning time

`get_variable_defs` on the page (`1:4478`) and on eight sections. **The bound set is partial and node-dependent, and
`get_variable_defs` answers wrongly in at least two ways here** (the node's own `fills` settles each; session 0 reads
`explicitVariableModes` for every section):

- **Faces.** `font/display` = **Anton** at every node (so Anton is also the *label* face: every chip, eyebrow, button,
  day number and link is Anton, upper-cased by the frame). `font/ui` = **Chakra Petch** on the page node and on the
  hero and bio, and **Inter Tight** on the gallery's, pricing's and map's (and in the emitted footer code): **Chakra
  Petch is Grunge's leaked default, so `ui` is Inter Tight** (the emitted code names `Inter_Tight:Regular` for the
  footer's email input; the pictures' body copy is a tight Inter), and it is also the `body`. **The serif is bound to no
  variable**: the emitted code reads `Fraunces:Light`, `font-light`, `font-variation-settings: "SOFT" 0, "WONK" 1`,
  `letter-spacing -0.015em` (the footer's 30 px tagline: `-0.45px`).
- **Ramp** (desktop mode; **node-dependent: the same key reads differently on different sections** — the pictures'
  type is Anton at ~ 150 / 200 / 230 / 300 px in the heads, which no `size/*` token states, so those are measured
  per section): `display-lg 112`, `display-md 56`, `display-sm 52` (hero) / `64` (map, media), `title 34`,
  `list 24` (footer name) / `22` (media rows), `body-lg 18`, `body-md 17` / `16`, `body-sm 15` / `14`, `label-lg 22`,
  `label-md 17`, `eyebrow 14`, `chip 13`; `radius/pill 999`, `border/hairline 1`. **No `radius/card`, `radius/control`
  or `border/thin` appears: every box is square.** The narrow ramps are read per node, and **a narrow master may sit
  in a different Device mode from its page** (`figma-frame-reading`).
- **Palette** (read, not yet confirmed per section): `scheme/1/bg #EEE3D1` (sand); `sem/bg` answers **`#F85E34`**
  on the hero, bio, repertoire (!) and testimonials, **`#EEE3D1`** on the pricing and map nodes and **`#760000`** on
  the media node — **the pictures give cream `#F8F2E7` for the bio and repertoire, so `sem/bg` is wrong or leaked on
  those** (the node's `fills` decides); `sem/text/1 #1E1E1E` / `#020202` / `#F8A351` (media and map: the amber is the
  ink on maroon and teal); `sem/text/2 #F8F2E7`; **`sem/text/3 #760000`** (maroon: the bio's `ABOUT`, the repertoire's
  numbers; `#F85E34` in the footer's emitted code — one more node-dependent answer); `sem/active/bg #F85E34`,
  `sem/active/text #020202`; tags `1 #3B758B / #EEE3D1` (teal), `4 text #EEE3D1`, `5 #F8A351 / #EEE3D1`, `7 bg #F85E34`
  (maroon `#760000` on the testimonials node). Literals no variable holds: the logo's `#CE1F1A`, the `Live` chip's
  green (~ `#3BB26B`), the footer's `#1E1E1E`, the calendar's amber ground (`#F8A351`), the hero's three-colour
  title (orange `#F85E34`, cream `#EEE3D1`, black).
- **Casing.** Anton text is **upper-cased by the frame** (`uppercase` in every emitted text node: names, links,
  chips, headings), where Fraunces and Inter Tight are mixed case. Grunge settled the same thing per site (`textTransform:
  'uppercase'`, casing `'title'` at the theme). **The heads' lines break on the frame's own words** (`READS THE ROOM`
  broken as two rotated columns, `SEE US / IN ACTION`, `PICK YOUR / NIGHT'S SET`): the bio's and gallery's break is
  *the string's words fitted to a measure*, not a stored newline.

## The decisions this plan hands over

Each is settled by the user at the head of the session that needs it, with the plan's recommendation as the default,
and written back here as *settled: …*.

### 1. Do the standing copy removals hold for Headliner, or does the frame win?  *(session 0 opens on this)*

Paperback's and Lattice's call 1, with this frame's list (read from the 1440 pictures and the narrow heroes):

| Section | The frame draws | Standing rule it meets |
|---|---|---|
| header | the `KAI MER` logo + `KAI MERCER` wordmark; **six inline links at 1440** (none at 768 / 390); an orange `Book now →` at every width; a hamburger at 768 and 390 **on the right** | layouts 1–4: **hamburger left, Book Now right, nothing else**, at every width (`plans/header-nav.md`) |
| header | `DJ · LIVE ACT` / `MANCHESTER, UK` beside an avatar | layout 1 prints **no act type and no location** |
| header | the **Fraunces tagline** `A DJ who reads the room, then turns it up.` and its small Inter line | no layout-1 field exists for a subtitle (`FIELDS.header.subtitle` reads Retro's layouts 3, 5, 6 only) — a decision |
| header | the **ringed `26`** and the big arrow | the badge is kept with three states (`badgeMode`); its ring text is the artist's name by rule, so a numeral `26` is a literal — a decision; the arrow is decoration |
| header | six status-style chips `Default / Sold out / New release / Archive / Live / All access` | the header's tag chips (`FIELDS.header.tags`, six, JP-081): read as the tags row, the **colours are the six `TAGS` seats**; the frame's seed labels differ from `TAG_LABELS` (a seed decision) |
| bio | `— KM BIO`; the `001` + `STRUCTURE · BIO_01` pair | the initials / `Bio` eyebrow and the reference line were **removed 2026-11-11** |
| media | `TOP TRACKS` and `5 / 5 FEATURED` | both **removed 2026-11-12** |
| map | `— SHOWS / COVERAGE`; the amber `120 MILE RADIUS` pill | the eyebrow **removed 2026-11-12**; the radius pill needs a ruling (`notes/map.md`) |
| calendar | the **huge `PICK A DATE.`** headline, the ringed `KM` disc, the eye glyph | `prompt` exists (*Pick a date to enquire*) and reads its seed; the headline is a **larger** seat for it or a new literal — a decision |
| testimonials | `REVIEWED 6 DAYS AGO` | the `kicker` field is **gone** |
| form | `KAI MERCER` / `DJ · LIVE BAND` over the headline | the credit line is derived (`identity`), may draw |
| footer | **three link columns** `EXPLORE / MORE / SOCIAL` and the tagline; **`JOIN THE GUEST LIST`** | the footer has two *derived* columns (`LinksField`, `notes/footer.md`) — a three-column frame is a decision; the newsletter: Paperback's call 2 |

- **A (recommended): every standing removal holds; a script / serif eyebrow or note is drawn only where a seeded,
  uncased, drop-when-emptied `FIELDS` field already exists for it; the footer's newsletter is not drawn (Paperback's
  call 2, A); the freed seat is the photo's (the footer has none: the seat is empty) or the column's.** Headliner is
  then a re-skin of what the builder prints, as every earlier template was.
- **B: the frame wins, by item.** The user names the items; each reopens a recorded call.

The footer's three-column question and the header's **tagline** are the only items here with no precedent; both want
an answer in the same breath (*tagline: a Headliner-only field, drawn and capped / not drawn*; *footer: two columns as
built / three groups by a `LinksField` change*).

### 2. The hero's height: 900 at every width

Paperback and Lattice settled `vm.heroH = 750` at tablet and mobile only (`EncoreBuilder.jsx:995–1000`; `WIDE.heroH`,
`SPOT_ASPECT` and the picker frame's aspect assume 614 / 1024 / 844, `SIZES` at line 199). **This frame is 900 at all
three widths**, of which **80 px is the nav bar**; at 1440 × 0.82 the canvas is 738.

- **A (recommended): the same rule behind `headliner`**: a narrow-only 900 (`vm.heroH`), desktop at its aspect (900 ×
  0.82 = 738 at the 1180 canvas, computed from the frame, not from `614`), so the picker's aspect, the setup cards and
  the other seven templates stay byte-identical.
- **B: the hero is the frame's 900 at every canvas** and `SPOT_ASPECT` / the picker's aspect follow it for this
  template alone.

### 3. Fraunces Light beside Retro's Fraunces Black

Retro loads **one instance**, `opsz,wght,SOFT,WONK@144,900,100,1` (`index.html` line 11, `preview.html` line 10), and
its comment says *do not add a second weight* because the default 400 would resolve to it. Headliner's serif is
**Fraunces Light, SOFT 0, WONK 1**, set at 18–30 px (`opsz` 144 is not what the frame uses at that size). A second
instance in the same entry makes Retro's weight-less `Fraunces` resolve to the 300 (400 prefers the lower weight), so
**Retro would move**.

- **A (recommended): a CSS alias, `Fraunces Headliner`** — an `@font-face` in `index.css` that pins the second instance
  (Lattice's `Archivo Lattice` shape), loaded as its own `family=` entry, so Retro's face is byte-identical. Session 0
  proves it on `theme=0` (zero digest rows) and measures that the published tab's cloned head carries it.
- **B: a free stand-in serif** (a different family, e.g. `Newsreader` or `Source Serif 4` at 300) — nothing about Retro
  can move; the look is close, not the frame's. (The user's stand-in call, Pop's and Grunge's shape.)
- **C: change Retro to name its own weight (900) so a Light instance can share the entry.** Rejected as default: it
  edits Retro.

### 4. The template's name

The frames are *Headliner Structured — Claude Design*. **Recommended: `Headliner`** — one word like the other seven,
`THEMES[7].name`, `plans/headliner/`, the flag `s.headliner`, the picker's card title, `sub` *Anton · maroon & orange*.
The user may rename it at session 0; the folder and flag follow.

### 5. Casing

Anton text is upper-case in the frame; Fraunces and Inter Tight are mixed. Default **`casing: 'title'`** with
`textTransform: 'uppercase'` per Anton site (Grunge's `faceK`-less shape), **not** `casing: 'upper'` (it would
upper-case the serif and the body). Verify each site's `textCase` against the frame and settle exceptions per section
(the footer's `© 2026 KAI MERCER` and the form's field labels are upper-case Anton; the placeholders are Inter Tight
mixed case).

### 6. The flag — `s.headliner`, widened per site

Paperback's call 6, again: add `headliner: T.name === 'Headliner'` to `sectionVm`, widen `designed` and `limeTree` to
it **only where a section dresses the shared branch**, and **take the inventory of every name gate first**:
`grep -n "Paperback\|paperback" source/src/builder/*.js*` is **209 hits in `data.js`, 110 in `EncoreSection.jsx`, 34 in
`EncoreBuilder.jsx`, 25 in `photos.js`** (and `grep -n "THEMES\[6\]\|Paperback" source/scripts/*.mjs`: 6) — each is a
place an eighth template either needs a row or falls through to Pop's (`specAt`: `spec[X] ?? spec['*'] ?? spec.Pop`;
**Paperback no longer reaches the fallback; Headliner will**, unless a row is added — an `in` object that names
neither Headliner nor `'*'` *reads* the field; `INLINE_OFF` / `PHOTO_OFF` have no fallback). List every gate, give each
a Headliner row or a stated reason, and write the list under *Conventions*. **`SCHEMES_OF.Headliner`** is the
per-section ground table (the bands are the grounds, so most sections are **their own scheme**, not the theme's).

### 7. Photography

The frames' photographs are **a performer with orange-red hair, tinted sunglasses and a navy-orange-cream jacket**
(the hero, the avatar, the bio portrait on an orange ground, the media player and the five covers, the gallery's seven,
the form's and the footer's avatars) — **a different person from Retro's seeded performer** (`hero.jpg` is a
chequered-suit singer on a curtained stage; checked), so this is **an eighth shoot**: ≈ **20 photographs** (hero, avatar,
bio, player, five track covers, seven gallery, form / footer avatar, the gallery viewer). Seed them as `SEEDS.Headliner`
in `photos.js` (the only module that imports `src/builder/photos/`), **JPEG-compressed** (Paperback's set was eleven at
1152 px q50, 959,840 bytes; the root `index.html` is **14,585,791 bytes** and each pass added 1.1–1.6 MB — budget the
set before adding it and say what the build grew by). **The hero's photograph is clipped to a slanted parallelogram**
in the frame: import the picture whole and clip in markup, so the crop editor edits the picture (`photoAspectOf`,
`notes/photography.md`). The wavy-line fields, the rings, the eye, the arrows and the ringed numerals are **art, not
photography**: transcribe the frames' vectors to inline SVG (`download_assets` at scale only if they are rasters).

## Session 0 — the foundation

This session touches no section's layout code. Its job is to make every later session decoration and measurement. It
opens on **calls 1, 2, 3 and 4** (`AskUserQuestion` takes four questions at most; the recommended answer first in each —
the *Ask-question option cap* note: split by lever if a call has more than four options).

1. **Read every token and every section's scheme.**
   `get_variable_defs` on the page and on each of the eleven desktop sections, then one `use_figma` read (load
   `figma-use` first) of every section's `explicitVariableModes` mapped through
   `figma.variables.getLocalVariableCollectionsAsync()` — it lists every section's Device and Scheme at once and says
   which narrow masters sit in a different Device mode (`figma-frame-reading`). **Read `fills` / `strokes` / `effects` /
   `rotation` / `padding*` from the node itself** wherever a token is doubtful (it is, at: the bio's and repertoire's
   ground, the calendar's ground, `sem/text/3`, `font/ui`). Write the mapping, the ramp at three widths and the palette
   (including the literals no variable holds) under *Conventions*.
2. **`THEMES[7]`** in `data.js`, appended — `st.theme` is an integer index, **never reorder**. Name, `sub`, `display`
   (Anton) / `label` (Anton) / `ui` + `body` (Inter Tight) / `serif` (a **new key**, as Paperback's `script` was:
   `vm.serif = T.serif ?? T.body`; read **`THEMES[6]`'s `script` plumbing first** and reuse it as a field of the same
   shape if it generalises), `casing`, `dls` (the frame's tracking: Anton `-0.005em` / `+0.02em` per site — read it),
   `radius 0`, `radiusSm 0`, `btnR 0` (chips `999`), `bw 1`, `palette`, `tags` (the six seats), `sem`, and `schemes` for the
   per-section grounds (**read `THEMES[3]`, `[4]`, `[5]`, `[6]` and CLAUDE.md's scheme paragraph first**), plus
   `SCHEMES_OF.Headliner` (rows 0–3 identical, the placeholders copying row 0) and `pageGround`.
3. **The type ramp** (`RAMP` / `THEME_RAMP` in `EncoreBuilder.jsx`, Pop's, Lattice's and Paperback's shape): desktop ×
   0.82, 768 and 390 verbatim, layered over the others; check `preview.jsx`'s copy of `Z`. **Every other template's ramp
   stays byte-identical.**
4. **Fonts** (call 3): the combined Google Fonts entries in `index.html` **and** `preview.html` (Inter Tight is new;
   Anton is there; the Fraunces instance per call 3), `published.html` and the cloned head checked, **`faceK`** if Anton
   at the frame's sizes needs one (Grunge's is 0.75 against Stones Crush; here Anton is the frame's own face, so the
   expectation is **no `faceK`** — measure against `absoluteRenderBounds` on a handful of strings anyway). Anton at ~ 300
   px fits by `bricolageEms`-style tables: run `scripts/ems-table.mjs` for Anton (`WEIGHT=400`) if the hero's name
   needs a fit table (`header-fit.md`).
5. **The flag and the name inventory** (call 6) — the greps above, nothing skipped. `headerFamily` → a `headliner`
   family of four (`HEADER_COUNT`, `HEADER_NAMES`), `setupHeaderCount` follows; `designCount` / `pageLayout` /
   `pageOrder` need no change. `IDENTITY_CHARS`, `FIELDS[].in` objects, `chars` / `count` / `num` specs (**seed
   Headliner's from Grunge's, not Pop's, until session 12 measures them** — Grunge is Anton too — and write that choice
   down: `specAt` falls to Pop's unless a row exists), `FOCUS`, `INLINE_OFF` keys (`Headliner.0.…`), `PHOTO_OFF`.
6. **Seed the photography** (call 7) and **the art**: one module for the shared art (the wavy-line field, the ringed
   numeral, the two arrow glyphs, the eye, the concentric rings — pure SVG functions, **no effect, no library but
   `lucide-react`**, used from one place, `headlinerArt.jsx` after `paperbackArt.jsx`'s shape). **The wavy-line field is
   a per-width vector set** (Lattice's dot field and Paperback's squiggle shape): read the path's size at all three
   widths in the frame's own `1:4505` (desktop hero stage) and its narrow twins.
7. **The tooling accepts an eighth theme — check, do not assume.** Paperback's session 0 found scripts that hard-code
   six themes; the seventh left these *names* or *lists*: `focus-probe.mjs`, `inline-probe.mjs`, `photo-probe.mjs`
   (`--theme Retro | … | Paperback`), `photo-aspect.mjs` (default list), `reach.mjs` (`0,1,2,…` indices; 6 is Paperback),
   `limits.mjs` (`--themes=…`, `FLOOR_AT`), `digest.mjs` / `build-digest.mjs` / `shots.mjs` (indices), `page-check.mjs`.
   Fix what hard-codes seven, in one commit named for the scripts, and prove each runs once at `theme=7`.
8. **The template card** (`TemplatePreview`, the filmstrip): the picker offers eight templates, the big card and
   thumbnail show a live `HeaderV0` once section 1 lands, and the picker's grid and text stay right with eight entries
   (check the grid, not only the card).
9. **`vm.pageBg` / the page gutter / the published `documentElement`**: the page's own ground, and which sections stand
   on a band of their own (the table's *ground sequence*). Every band is full-bleed, so the page gutter
   (`pageGroundOf()`) is whichever ground reads best at the canvas's edges — **read, do not guess**: Lattice's was
   `#111`, Paperback's white; here every section paints its own, so the gutter shows only at the page's far left and
   right on the canvas, and the published tab never shows it at a width ≤ 1440.

**Verification for session 0:**
- **Exit criterion: Retro, Lime, Grunge, Editorial, Pop, Lattice and Paperback do not move.** A digest of all
  categories × 3 widths at `theme=0…6` before and after: zero rows (skip `.seal-spin`). `scripts/digest.mjs`, the
  two-server recipe in the `digest-two-servers` note, and `browser-tool-choice` for the rest.
- Headliner changes on purpose: screenshot the eleven sections at `theme=7` before and after (desktop only) and keep
  them in the scratchpad as the pass's "before" pictures.
- The builder opens with eight templates; picking Headliner reaches the editor and does not throw; every section
  renders (legibly ugly is fine) at all three widths.

## The header, and the four cards

Section 1 follows call 1. Whichever way it goes:

- **The hero's composition is the pass's hardest unit**, because the title is painted **in three colours across the
  slanted edge**, over a clipped photograph, and must follow the artist's name at any length (`header-fit.md`: it
  shrinks to a 50 % floor, then a character cap) without `EncoreSection` getting an effect. The cheap exact shape is
  **three stacked copies of the title, each `clip-path`-ed to its zone** (left of the edge orange, over the photo cream,
  over the orange panel black) — pure CSS, no hook — and the **edge is one polygon** shared by the photograph's clip,
  the title's three clips and the wavy panel, so a resize moves them together. Measure the polygon's points at the
  three widths from the frame (the 820 stage: the 1440's edge runs from ~ 476 at the top to ~ 760 at the foot on the
  left and ~ 893 to ~ 1135 on the right, read the exact numbers).
- **The inline nav, wordmark, logo, act type, location and the tagline** follow call 1. With A: the bar is the
  hamburger left, Book Now right (square, orange, black ink — `BookPill`'s Headliner arm), at every width; **the
  in-frame bar's 80 px and hairline foot stay** (a hairline under the bar is not copy); the freed seat of the left
  column is the tagline's.
- **The ringed `26`** is the badge's seat: `SealBadge`'s Headliner arm draws a ring with a numeral (a ring + the
  **artist's initials or the year** is the decision: `26` is the frame's literal, and `FIELDS.header.badgeText` has no
  static default by rule, so the numeral is **`badgeText`**, capped at two to three characters) and **the `badgeMode`
  three states hold** (`rotating` is *static* here: a ring with a numeral does not spin — Lime's reticle precedent in
  `badgeOptsFor()`: offer Visible / Hidden only).
- **The six chips** print `vm.tagChips` on `vm.chips` (six `TAGS` seats); the frame's colours are the six seats, so
  `THEMES[7].tags` is `['#1E1E1E', '#F85E34', '#F8A351', '#3B758B', '#3BB26B', 'transparent / outline']` — read the
  literals — and `sem.tagFg` the inks.
- **The four setup cards** (cards 2–4) only need to render, publish and read legibly in Headliner's tokens (Lime's /
  Pop's / Lattice's / Paperback's rule). The setup modal's `HeaderChoices` shows card 1 as the fitted hero and the
  others as the placeholders, **at the 900-tall aspect** (call 2): check the modal's card ratio.
- **The template card** and filmstrip thumbnail are a live `HeaderV0` at the picker's aspect.

## Headliner's visual language

What every section session may use, so the sections agree:

- **Square.** `border-radius: 0` on every box, button, field, card, photo, tile and arrow button; `999px` only on
  chips, pills and the `120 MILE RADIUS` tag. **No shadows, no gradients, no blur, no grain.**
- **1 px hairlines** in `sem/stroke/*` at the band's ink (black at ~ 20 % on cream, cream at ~ 30 % on maroon) as
  *row dividers*: the media rows, the gallery accordion, the repertoire list, the pricing features, the map's gigs, the
  form's promises. Read the exact alpha per band.
- **Anton at three scales:** the section head (150–300 px, black, tight-leading, one to three lines), the row title
  (24–64 px), and the label (13–17 px, tracked). **Fraunces Light** for the lead paragraphs, **Inter Tight** for UI.
- **Bands, not cards:** most sections *are* a coloured band; the calendar and the form are the two **cards on a band**.
- **Square arrow buttons** (media transport, gallery arrows, pager, testimonials) come in **two inks only**: outlined
  (1 px, ink on band) and filled (black or orange).
- **Art is five shapes:** the wavy-line field, concentric rings, the ringed numeral, the arrow glyph and the eye.

## Per-session procedure

Paperback's, verbatim — [`../paperback/layout-1.md`](../paperback/layout-1.md) *Per-session procedure* (which is
Lattice's, which is Lime's), with `s.paperback` read as `s.headliner`, `theme=6` as `theme=7`, and these changes:

1. Read the files above. **Session 0** follows *Session 0*.
2. `create_session` once for the Figma file; `get_metadata` on **the section's three nodes** (never the whole master);
   `get_screenshot` on each, `curl` it in the next call; load the `figma-design-to-code` skill, run
   `get_design_context` and `get_variable_defs` on all three nodes. **There is no twin node to diff by name**, so lay
   the prediction in the table above against the code's existing layout-1 branch: read it (**Retro's `s.v0` and
   Grunge's first**: this is the pass whose prediction is most often *dress the shared branch*), list what the frame
   draws that it does not, and write the verdict (*dress the shared branch* · *widen the Lime block* · *new own-tree
   block*) under *Conventions → Seen at planning time* before writing code. **Read the narrow masters' own
   `get_variable_defs` before trusting their sizes** (a Device-mode leak, `figma-frame-reading`).
3. Implement inside the section's existing branch gated on `s.headliner`, or in a `Headliner*` tree of its own
   (*after* the section's hooks and seam, so the published controls are the shared seam's and only the picture is
   Headliner's); desktop numbers are the frame's × 0.82, the 768 and 390 frames verbatim; prefer session-0 tokens over
   literals.
4. **Verify** with the preview harness (`npm run dev` in `source/`, then
   `http://localhost:5173/preview.html?cat=bio&arch=0&theme=7&w=desktop` — `tablet`, `mobile`) and chrome-devtools:
   - **Look**: render vs frame; read geometry with `getBoundingClientRect()`, numbers not screenshots.
   - **Function**: `&live=1`, drive every control in its active, idle and refused states.
   - **The other seven do not move**: a zero-row digest at `theme=0…6` at three widths, before and after in the same
     tab. The brace-depth walk (every added line inside an `s.headliner` conditional) is the quick first check; the
     digest is the proof.
5. Commit with the section named in the subject; set the row's Status to `done <sha>`; add what the next unit needs to
   *Conventions*; commit that.
6. **Stop and hand off**: say the unit is closed, that this is the moment to `/clear`, and print the next unit's
   opening prompt as a filled-in fenced block (the *Hand off, don't roll on* note).

Do **not** refresh the root `index.html` per section.

## Session 12 — the proofs

Paperback's session 12, one session, each its own commit:

1. **Character caps**: a Headliner row for every `FIELDS` entry / repeater column, measured with
   `node scripts/limits.mjs <cat> --themes=7`, then `--check` and `--seeds`; a seed must fit its cap. **The heads here
   are 150–300 px Anton, so the caps are tight** (the hero's name, `240 SONGS`, `MANCHESTER`, `FIVE WORTH YOUR EAR`:
   the section head is the field that fills its measure first). Judgement calls in the section's `notes/` file.
2. **Reach**: `scripts/reach.mjs` for `FIELDS[].in` and `IDENTITY_READS` at theme 7.
3. **Inline editing**: `scripts/inline-probe.mjs --theme Headliner --layout 1 --width 1440,768 --check` until
   `inline-probe: PASS`; every slot the page does not draw is an `INLINE_OFF` row with its reason. **The three-colour
   title and the rotated bio statement are the two places the probe's hit-test meets stacked or vertical text**
   (`INLINE_LINES`, *vertical type* leaves it to the panel): expect ledger rows there.
4. **Photo editing**: `scripts/photo-probe.mjs --theme Headliner --layout 1 --width 1440,768 --check` (and `--blank`,
   `--drop`); `PHOTO_OFF` for the rest. `focus-probe.mjs --prime --check` for the panel-to-canvas box. **The hero's
   clipped photograph is the probe's hard case** (a click lands on a parallelogram; `photoFieldAt` takes the stack
   under the pointer).

## The end-of-pass sweep

After section 11 and session 12, in one session (Paperback's list is the model):

1. **CLAUDE.md and README.md** where the wording says *seven templates* / *the other six*: the template list, the file
   line counts, the flag paragraph, the scheme paragraph, the font note (Anton, Fraunces Light, Inter Tight), the
   photography note, and a `notes/templates.md` Headliner section holding its visual language.
2. **Code comments that make a claim about the template list**
   (`grep -rn "all seven\|other six\|seven templates" source/src/builder`).
3. **`plans/CONVENTIONS.md`**: fold the *Inherited and used* list in.
4. **One whole-page published check under Headliner**: pick the template, choose Hero, Publish → Open, then every nav
   link, the hamburger at 390 and 768, Book Now, the media player (one trusted click), the gallery, repertoire, map,
   pricing, calendar, form and testimonials controls, the footer's links and pill. Eyeball every seam against its real
   neighbour (every seam is straight, so it is the **band colours' order** that needs the eye).
5. **The four header cards** render and publish with all eleven sections each, in their `pageOrder(i)`; no console
   error on any card; setup cards 2–4 walked at 1440, 768 and 390 (no horizontal overflow, the burger opens, a menu
   link and Book Now scroll and close, no error).
6. **`plans/README.md`**: mark the pass closed (merging is the user's call).
7. **Refresh the root `index.html` and `published.html`** (CLAUDE.md, *Commands*): `npm run build:standalone`, the two
   `cp`s, and the two-build digest — **zero rows at themes 0–6, non-zero at theme 7**. Say what the file grew by
   (from 14,585,791 bytes).

## Conventions

*(Filled in as the pass goes: **Seen at planning time, per section**; **Settled in session 0 — the foundation**;
**Settled in sections 1–11**; **Conventions section N inherits**; **Inherited and used**; **Open calls**. Paperback's
file is the shape.)*

### Seen at planning time, per section

What the pictures show that the table's one line cannot hold, so each section's session starts with it. **All of it is
a read of 1440 screenshots, not a measurement**; each section's session re-reads the three nodes before trusting a
number.

- **header (1).** **One text node cannot be three colours**, so the title is three clipped copies (above). The nav
  bar's links are **Anton 15–17 px, upper-case, tracked +0.02em**, evenly spaced, centred at 1440 (positions ≈ 509,
  574, 673, 738, 835, 905); the logo is a 40 × 40 `#CE1F1A` square with `KAI` / `MER` stacked in Anton 15 px; `Book now`
  is an orange rectangle ~ 132 × 46 with an arrow icon. The hero's photograph is the same file as the avatar and the bio
  portrait's *person*, three different frames of it. **At 390 the title is one line at ~ 60 px and the ringed `26` is
  laid over the photograph** (it sits beside the face and is partly hidden by it in the frame: a defect or an absence to
  honour, decide in the session); **at 768 the title is ~ 200 px and the chips wrap to one row**, at 390 they wrap to two.
- **bio (2).** The two rotated columns are **one string set vertically**, broken after `READS THE` and `ROOM`; the
  second column overlaps the photo by ~ 90 px and the photo is *under* the letters (the letters are black, the photo's
  ground orange). Verify whether the narrow frames keep it rotated or lay it flat. The `— KM BIO` and the `001` pair
  are removed by call 1; the Fraunces lead is the bio's headline copy or its description (`notes/bio.md`).
- **media (3).** The headline is **black on maroon** (a 1.9:1 contrast: a frame choice, so it is the frame's); the
  `TOP TRACKS / 5 / 5 FEATURED` pair stands at the headline's foot-right; the player card is black, **square**, with a
  377 × 266 photo and **no rounded art**. The five rows' play buttons are outlined squares, the current row lit orange.
- **gallery (4).** The open accordion row is the `GALLERY` row with an orange arrow; **its sibling rows are the three
  services** (`YOUTUBE` / `INSTAGRAM` / `TIKTOK`, `notes/gallery.md` *social rows*), so the accordion is the existing
  source-rows control re-set in 64 px Anton. **The eye glyph is decoration** (art). The viewer's arrow pair sits
  **inside the photo's foot-right corner** (black, orange).
- **repertoire (5).** Twelve rows on a page in two columns of six; the pager's `20` is the last page (`240 / 12`).
  The search box is **right-aligned at the head's baseline**, outside the chip row.
- **map (6).** The panel is **square, maroon, with concentric rings** and a foot; the `120 MILE RADIUS` pill is the
  head's baseline right. The date tiles alternate fills by `tags` seat (orange, amber, cream ×3) — **read whether the
  frame colours them by index or by state** (the first is `Sold out`).
- **pricing (7).** The three cards are `orange / maroon / teal` and the **middle one is the maroon** (the featured
  plan is the middle, as every earlier template). The features carry a **two-digit numbered tail** (`01…05`) where
  earlier templates draw ticks — a new inventory item; the Solo / Trio / Band toggle is the chip filter.
- **calendar (8).** The month grid is **hairline cells with no fills**, the picked day a black square with an orange
  numeral; the right panel is **maroon with the wavy-line field** and holds the section's *headline* (`PICK A DATE.`,
  orange, ~ 150 px) — the biggest type on the page after the hero's name.
- **form (9).** Fields are **1 px outlined squares on a sand ground**; the promises are three hairline rows with amber
  numerals `01–03`; the card's left panel is maroon.
- **testimonials (10).** A single centred quote with a **maroon quote mark** above and a **pair of square arrow buttons**
  at the far edges; the quote is the page's 100 px Anton line. 730 tall at every width.
- **footer (11).** Three link groups where the builder derives two; the newsletter on the right; the tagline is Fraunces
  30 px. **At 768 the footer is 492 tall and at 390 655** (the columns stack).

### Settled in session 0 — the foundation

Branch `headliner-layout-1`, 2026-11-23. The four opening calls were put to the user in one question, recommended options
first, and **all four were taken as recommended**: (1) every standing removal holds — the hero's Fraunces tagline is
**not drawn**, the footer keeps its two derived columns, no newsletter, and a script or serif eyebrow is drawn only
where a seeded, uncased, drop-when-emptied field already is its seat; (2) `vm.heroH` is **900 at 768 and 390 only**
(behind `headliner`), desktop keeps its aspect (900 × 0.82 = 738 on the 1180 canvas), the picker aspect and the setup
cards unchanged — **not yet written: it is section 1's work**; (3) the serif is the CSS alias **`Fraunces Headliner`**,
Fraunces Light 300, SOFT 0, WONK 1, an `@font-face` in `src/index.css` pinned to the file Google serves for
`Fraunces:opsz,wght,SOFT,WONK@9..144,300,0,1` (opsz stays live), **no `Fraunces` entry added to any `<link>`**, so
Retro is untouched (the digest below proves it); (4) the template is **Headliner**, `THEMES[7]`, flag `s.headliner`,
sub `Anton · maroon & orange`.

**Scheme table and seats.** Read off each section's own node with `variable.resolveForConsumer(node)` (the collections
are remote, so `getLocalVariableCollectionsAsync` is empty) and checked against the node's `fills`: the two agree, so
the planning note that `sem/bg` "answers wrong" for the bio and the repertoire is settled — they are cream `#F8F2E7`.
The file holds only twelve `sem` keys per section (bg, active bg / text, tag 1 bg / text, tag 4 text, tag 5 bg / text,
tag 7 bg, text 1 / 2 / 3); everything else in a scheme is **inferred** (below) and is re-read by the section that draws it.

| Scheme | Ground | Accent (`active/bg`) | `text/2` | Seats |
|---|---|---|---|---|
| 1 (the theme's own) | `#EEE3D1` sand | `#F85E34` | `#1E1E1E` | the page, gallery, pricing |
| 2 | `#F8F2E7` cream | `#F85E34` | `#1E1E1E` | bio, repertoire, form |
| 3 | `#760000` maroon | `#F8A351` | `#F8F2E7` | header, media, video (no frame; beside the media) |
| 4 | `#F8A351` amber | `#F85E34` | `#020202` | calendar |
| 5 | `#F85E34` orange | `#F8A351` | `#020202` | testimonials |
| 6 | `#3B758B` teal | `#48B469` | `#F8F2E7` | map |
| 7 | `#1E1E1E` ink | `#F8A351` | `#F8F2E7` | footer |

`SCHEMES_OF.Headliner` rows 0–3 are identical (layouts 2–4 copy row 0). **Only schemes 1–7 are defined**: no section
stands on an eighth, and a nested node that needs another ground names a literal. `text1` is a **new `sem` key and a new
vm key** (`s.text1`, plumbed beside `text3` in `sectionVm`): maroon and ink set `sem/text/1` amber `#F8A351` where `text/2`
is cream, teal's `text/1` / `text/3` are `#FBF8F2`; read it behind `s.headliner`. **Inferred**: `box1–3` (a step off the
ground: sand → `#F8F2E7` / `#E6DAC4` / `#DCCFB6`, maroon → `#8A0F0F` / `#5E0000` / `#000`, …), `glow` (the active ground),
the inactive pair (box 1 and text 1), `stroke1/2` and `hl` (text 1), tag seats 2, 3 and 6, and tag 4's chip (dark where its
text is light, light where it is dark). `pageGround` is `#EEE3D1` (the page frame's fill = Scheme 1, so it reads the same as
`palette[0]`; stated for the record). A literal no scheme holds: the logo's `#CE1F1A`.

**Faces.** Display and label **Anton** (already loaded for Retro's labels; the frames upper-case it by site, so `casing`
is `'title'` and a block uppercases), UI and body **Inter Tight** (`family=Inter+Tight:wght@400;500;600` added to
`index.html` and `preview.html`; `published.html` loads none), serif **Fraunces Headliner** (`vm.serif = T.serif ?? T.body`).
The published tab's cloned head carries the alias: `openPublished` imports every `head style`, which is Vite's injected tag in
dev and the single inlined `<style>` in a build (the built `dist-standalone/index.html` holds it; `page-check.mjs Headliner 0`
published with no console errors). **`faceK` is 1**: Anton is the face Retro’s labels and Grunge’s display already set with no
`faceK`, so no table is owed; the hero name's fit needs `TITLE_SITES.Headliner` and a `face` for `titleFitK` — see *Section 1 owes*.

**Ramp** (`THEME_RAMP.Headliner`, read off the masters' text nodes with a per-section size dump, not off `size/*`, which is
partial and node-dependent; desktop is the frame × 0.82, 768 and 390 verbatim). Heads are fluid values of the frame's own, so
a key is a section's head, as Lattice's and Paperback's are:

| Key | mobile | tablet | desktop | Read as |
|---|---|---|---|---|
| `dispXl` | 58 | 156 | 220 | the header's name (267.84 / 156 / 58) |
| `dispLg` | 60 | 93 | 123 | the repertoire's and the calendar's heads (149.76 / 93 / 60) |
| `dispMd` | 45 | 69 | 92 | pricing's prices (112 / 69 / 45) |
| `dispSm` | 38 | 48 | 52 | the form's head (64 / 48 / 38) |
| `title` | 29 | 35 | 36 | the now-playing name (44 / 35 / 29) |
| `list` | 18 | 22 | 18 | a track's name, Inter Tight (22 / 22 / 18) |
| `labelLg` / `labelMd` / `labelSm` / `labelXs` | 22 / 17 / 16 / 14 | 22 / 17 / 16 / 14 | 18 / 14 / 13 / 11 | the map card's head; the Anton 16 and 14 labels |
| `bodyLg` / `bodyMd` / `bodySm` | 17 / 16 / 14 | 17 / 16 / 14 | 14 / 13 / 11 | Inter Tight body, inputs, sub-lines |
| `chip` / `eyebrow` | 13 / 15 | 13 / 15 | 11 / 12 | |

**Heads that sit between keys** (their sessions write them; frame px at 1440 / 768 / 390): bio 150 / 124.84 / 54.43, media
155.52 / 72 / 62, gallery 129.6 / 80 / 52, map 181.44 / 112 / 70, pricing 123.84 / 77 / 50, testimonials' quote 86.4 / 54 / 38
(its mark 220 / 136 / 88), the calendar's month 56 / 45 / 37. **Serif sizes are written where drawn** (Fraunces 38 / 34 / 31 /
28 / 22 by site; hero tagline 38 / 34 / 22, bio lead 34 / 31 / 28, pricing blurb 22 / 22 / 20, calendar foot 26 / 20 / 24,
footer tagline 30 / 27 / 25).

**The flag and `limeTree`.** `sectionVm` carries `headliner: T.name === 'Headliner'`, with `designed` **and `limeTree`** widened to
it. `limeTree` had to be: without it a layout-1 media falls through to Pop's branch and reads `S3.activeBg` of `null` (`page error`
at all three widths, found by the first theme-7 render sweep), exactly as Paperback's foundation needed. It stands the Lime block in
Headliner's tokens **until each section gets its own `Headliner*` tree** (Lattice's and Paperback's rule: after the section's
hooks and seam, hookless sections at the head). `limeTree` therefore now names seven templates.

**Gate inventory** (`grep -c 'Paperback\|paperback'`: `data.js` 209, `EncoreSection.jsx` 110, `EncoreBuilder.jsx` 36, `photos.js`
27, six scripts; `EncoreSection.jsx` carries **no theme names** — it reads flags — so session 0 touched none of its 110, which are
Paperback's own trees). Written for Headliner in session 0:

- `data.js`: `THEMES[7]`; `SCHEMES_OF.Headliner`; `headerFamily` → `'headliner'`, `HEADER_COUNT.headliner = 4`,
  `HEADER_NAMES.headliner` (the shared four names); `specAt`'s fallback (below); **the eight header `in` rows that name templates
  and no `'*'`** (`heroCta`, `faceTitle`, `faceBody`, `tags`, `showTags`, `badgeMode`, `badgeText`, `align`), each seeded with
  **Paperback's value** (layouts 2–4 placeholders, so Lime's twins' rows; `align` `[]`) — section 1 re-measures them with
  `reach.mjs 7`.
- `EncoreBuilder.jsx`: `THEME_RAMP.Headliner`, `vm.serif`, `vm.text1`, the flag, `designed`, `limeTree`.
- `photos.js`: `SEEDS.Headliner`, `HEADLINER_PHOTOS` / `HEADLINER_TRACK_ART` / `HEADLINER_VIEWER` / `HEADLINER_COVER`.
- Deliberately **not** written, and what each does until its section: **`chars` / `count` / `num` specs and `IDENTITY_CHARS`** that
  name no `Headliner` read `'*'` where one exists, else **Grunge's row, else Pop's** (`specAt`: `spec[T] ?? spec['*'] ?? (Headliner
  → spec.Grunge ?? spec.Pop)`; **Grunge's, not Pop's, because Headliner sets Anton, the face Grunge sets, in square frames** — every
  cap reached that way is provisional, measured by `limits.mjs --themes=7` in its section; Lattice's and Paperback's fallback is
  still Pop's); **`TITLE_SITES`** has no Headliner row, so `titleFitK` returns 1 and the name never shrinks; **`INLINE_OFF` /
  `PHOTO_OFF`** have no Headliner rows and no fallback beyond `inlineRule`'s `*` rows (`Headliner.<design>.` → `Headliner.*.` →
  `*.<design>.` → `*.*.`), so a Headliner section writes its own as it passes; `FOCUS` untouched; every other `in` object that
  names Paperback also names `'*'`, so Headliner reads `'*'`.

**Photography** — an eighth shoot (a performer with orange-red hair, tinted sunglasses, a navy / orange / cream jacket), **twelve
JPEGs, 484,700 bytes raw** re-encoded with `sips` (hero 1440 × 820 q55 = 216,800; bio 428 × 640 = 61,479; the viewer 656 × 482;
the rest 146–379 px): `headliner-hero`, `-avatar`, `-bio`, `-cover`, `-shot-1`…`-7`, `-viewer`. `photos.js` is the only importer.
Pairing, read off the frames' exports: the media list's five row covers are **shots 1–5 in order** (they are also the gallery
strip's first five thumbs); the strip's sixth and seventh are shots 6 and 7; the big gallery picture (a singing shot, none of the
seven) is `headlinerViewer`; the form's avatar is the avatar; **the footer draws no photograph**, so there is no `footer` key and
no `FIELDS.footer.image`. The player's large cover (`Night Rain`, `headlinerCover`) is **not a field**: the player shows the current
track's art, so `HEADLINER_COVER` is exported and **section 3 settles where it is seeded** (a first track whose art it is, or a
Headliner-only player picture). **Section 4 settles the gallery's slot:** `HEADLINER_PHOTOS.gallery` follows Paperback's shape
(the viewer's picture in the second slot, since the viewer can only show a slot), a placeholder choice. The hero is imported **whole**;
the slanted parallelogram is a markup clip, so the crop editor edits the picture. **Size**: the standalone build is 15,191,031 bytes
against the root `index.html`'s 14,585,791 (+605,240, mostly the photographs' base64); the real growth is re-measured at the sweep.

**Art** — `src/builder/headlinerArt.jsx` (pure SVG functions, no hook): `HeadlinerWaves({ dev, ... })` is the wavy-line field as **one
dataset in the 768-wide frame's coordinates** (70 polylines, 820 tall, stroke `#760000` at .32), with the desktop's x scaled × 1.875
and the mobile's × 0.5078 and a per-width stroke (1 / 0.73 / 0.52) — one path at every width, as Paperback's squiggle is — and the
arrow, the block arrow, the eye (outline, iris, and a highlight arc `M44.05 7.9C40.65 12.15 40.65 16.4 44.05 20.65`) and the play
triangle. The ringed numerals and the hero's slanted edge are section 1's and section 2's.

**Tooling** — the scripts that hard-coded seven templates, edited in one commit named for them: `focus-probe`, `inline-probe`,
`photo-probe` (the `--theme` doc), `photo-aspect` (default list now eight), `limits` (`--themes` default `0..7`), `reach` (the
index note), `digest` (the usage note). `shots.mjs`, `page-check.mjs` and `build-digest.mjs` take indices or names generically and
needed no edit. **Each was run once at theme 7**: `inline-probe --theme Headliner --layout 1 --cat bio --limit 3` PASS; `focus-probe
--cat bio` PASS (5 controls, 0 failing); `photo-probe --cat header,gallery` runs (8 slots hit) and **FAILs on the placeholder
header, `header.image` under its copy, which is section 1's to fix**; `photo-aspect --theme Headliner` PASS; `limits bio --themes=7
--seeds` 0 seeds over their caps; `reach.mjs 7` (ran to completion in about 4½ minutes; its table is the *placeholder* trees' reach, so a section re-reads it once it has a tree), `digest.mjs t7 7 header,media`, `shots.mjs`, `page-check.mjs Headliner 0` (no
console errors, only WebGL warnings) and `build-digest.mjs` (eight themes; `7 Headliner: 4 cards`) all run.

**Verification of the foundation.** (a) **Digest, `digest.mjs` themes 0–6 × every category and layout × desktop, tablet and mobile
(1008 renders), HEAD against the working tree (two servers, 5173 and a worktree on 5175): 0 of 1008 differ** after the two
normalisations the recipe names (the port in `url()` cells, and Vite's `?t=` HMR stamp on a changed module's image URLs, which
appeared because `photos.js` changed). (b) Theme 7 renders every category at every layout and width (150 renders, 0 page errors, 0
empty roots) once `limeTree` is widened. (c) `npm run build` and `npm run build:standalone` pass. (d) The builder opens with eight
templates, the filmstrip scrolls (`overflowX: auto`) and the top bar's theme menu is a scrolling 2-column grid; both map `THEMES`,
so neither needed a change. (e) **"Before" pictures** of all twelve section roots at theme 7, three widths, in the placeholder
trees: scratchpad `shots/before-{desktop,tablet,mobile}/` (not committed). **Root `index.html` is not refreshed.**

**Section 1 owes** (the header, next): `vm.heroH` 900 at 768 and 390 (call 2); `TITLE_SITES.Headliner` and the name's `face` in
`sectionVm`'s `titleFitK` call (`navFace` is undefined for Headliner, so the header reads `frauncesEms` — wrong for Anton; use
`antonEms`, the table Grunge reads); the header `in` rows and caps re-measured (`reach.mjs 7`, `limits.mjs header --themes=7`);
`INLINE_OFF` / `PHOTO_OFF` rows for the header's pass; `HeadlinerHero` and the slanted-clip, three-copies name (plan, *The header*).

## Open questions

1. **What the stray floating `Container` is** (86.7 / 95.4 / 42 px) — one `get_screenshot` in section 1's session.
2. **Which tokens are wrong where** (`sem/bg` on the bio and repertoire, `sem/text/3`, `font/ui`) — session 0's
   `use_figma` read settles each from the nodes' own `fills`.
3. **Whether the narrow heroes keep a separate `Header` bar at 80 px** (they do: `1:15263`, `1:16318` are 768 × 80 and
   390 × 80) **and whether the in-frame hairline under it is 1 px at all three widths.**
4. **Each narrow section's twin by order** — confirm by screenshot before measuring (the masters name every section
   `Section`; heights repeat across widths for the testimonials (730)).
5. **Whether the hero's title at 390 is one line** (it is, at ~ 60 px) **or the tablet's 200 px wraps** — read the
   frames; `header-fit.md`'s rule (a 50 % floor, then a character cap) is what the builder does for a long name.
