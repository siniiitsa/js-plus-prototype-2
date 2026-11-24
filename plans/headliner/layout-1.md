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
| 1 | `header` | `1:4481` | 1440 × 900 | `1:15262` | 768 × 900 | `1:16317` | 390 × 900 | **Maroon** hero in two parts: an **80 px nav bar** (hairline foot; `KAI MER` red square logo + `KAI MERCER` wordmark; **five inline links** `About · Top Tracks · Media · Repertoire · Shows · Pricing` at 1440, a hamburger at 768 / 390; an orange square `Book now →`); under it a **820 px stage** split by a **slanted edge**: maroon left with a Fraunces tagline (`A DJ who reads the room, then turns it up.`, orange) and a small Inter line, the **portrait photo** clipped to a parallelogram in the middle, an **orange wavy-line panel** on the right with a **ringed `26`** and a **big black arrow →**; an avatar + `DJ · LIVE ACT / MANCHESTER, UK`; **six chips** (`Default` black, `Sold out` orange, `New release` amber, `Archive` teal, `Live` green, `All access` outline); and the **name `KAI MERCER` at ~ 300 px Anton, one line, painted in three colours across the slanted edge** (orange on maroon, cream over the photo, black over the orange panel) · **Retro's / Grunge's `HeaderV0` with its photo and badge seat, probably an own tree for the clipped title** — read both, then decide | done 2e7fde9 |
| 2 | `bio` | `1:4627` | 1440 × 832 | `1:15396` | 768 × 1293 | `1:16446` | 390 × 1209 | **Cream** (`#F8F2E7`); a **vertical Anton statement** `READS THE ROOM` in two rotated columns, the second **overlapping the portrait's left edge**; a tall **portrait on an orange ground** (square-cornered); right: a Fraunces lead (`DJ and selector based in Manchester…`) top, a hairline, `ABOUT` (maroon Anton) + an Inter paragraph foot; `— KM BIO` eyebrow and a `001` / `STRUCTURE · BIO_01` chip pair bottom-left · **own tree** (nothing in the builder rotates a statement under a photo — check Grunge's and Retro's bio first) | | done 2867fa3 |
| 3 | `media` | `1:4650` | 1440 × 1057 | `1:15421` | 768 × 1219 | `1:16471` | 390 × 1251 | **Maroon**; a **~ 230 px black Anton headline** `FIVE WORTH YOUR EAR` (black on maroon, spanning the row) with `TOP TRACKS` / `5 / 5 FEATURED` in amber at its foot-right; left: **five hairline rows** (number, 56 px square cover, title in Inter Tight, subtitle, a time, a **square outlined play button**; row 2 lit: cream title, an **orange** play square), an orange `SOUNDCLOUD →` button; right: a **black player card** (a 377 × 266 photo, `NIGHT RAIN` in cream Anton, `KAI MERCER` amber, three square transport buttons with the orange play, a progress rail and `02:28` / `04:22`) · **Retro's `v0` media body** (list + player), re-dressed — the inventory matches; confirm |  done 117984f |
| 4 | `gallery` | `1:4766` | 1440 × 849 | `1:15538` | 768 × 1386 | `1:16587` | 390 × 943 | **Sand** (`#EEE3D1`); `— MEDIA` eyebrow, a two-line **black Anton** `SEE US IN ACTION`, four **hairline accordion rows** in Anton at ~ 64 px (`GALLERY` orange with an orange arrow →, `YOUTUBE` / `INSTAGRAM` / `TIKTOK` black with black arrows); right: a **`BACK TO BEGINNING →` outlined button**, a **teal eye glyph**, a 654 × 480 photo with a **black / orange square arrow pair** in its foot-right corner, and **seven thumbnails** in a row · **Lime's *Photo viewer* inventory** (source rows + viewer + strip), as every earlier template read it | done 222c3b1 |
| 5 | `repertoire` | `1:4830` | 1440 × 1067 | `1:15602` | 768 × 1067 | `1:16651` | 390 × 1603 | **Cream**; `— REPERTOIRE`, **`240 SONGS` at ~ 150 px black Anton**, a square **search box** right (hairline), four **pill chips** (`ALL` black), a **two-column dense** list of 6 + 6 hairline rows (maroon number, Anton title, an Inter artist right-aligned), a pager of **square numbered buttons** (`←  1  2  3  …  20  →`) · **Lime's *Two-column dense*** inventory | done 80a23e0 |
| 6 | `map` | `1:4955` | 1440 × 1051 | `1:15726` | 768 × 1559 | `1:16776` | 390 × 1435 | **Teal** (`#3B758B`); `— SHOWS / COVERAGE` (amber), **`MANCHESTER` at ~ 200 px cream Anton**, an amber pill `120 MILE RADIUS`; left a **maroon square panel** with **concentric rings** (two solid, two dashed, an orange dot) and a foot `BASED IN MANCHESTER` + `120 MI STANDARD · FURTHER ON REQUEST`; right: `UPCOMING GIGS` / `05 OF 12`, five hairline rows (a **square date tile**: orange, amber, cream, cream, cream; title in Anton; `Town · time`; an orange `SOLD OUT` pill or an outlined `TICKETS` pill), a pager (`←  1 2 3  →`, orange current) · **Lime's *Compact tile*** (the raster map is the rings art, as Paperback's) | done 0258854 |
| 7 | `pricing` | `1:5067` | 1440 × 1152 | `1:15838` | 768 × 1556 | `1:16888` | 390 × 2112 | **Sand**; `— PRICING`, a two-line **black Anton** `PICK YOUR NIGHT'S SET`, a **Solo / Trio / Band** pill toggle (black current), **three square coloured cards** (orange, maroon, teal) each: name + `/ EVENT`, a **big cream / black price** in Anton, a Fraunces blurb, 4–5 hairline feature rows with a **numbered `01…05` tail**, a square `BOOK THIS SET →` button (black on orange, orange on maroon, sand on teal); a Fraunces small-print foot · **Lime's pricing** inventory (own tree likely; the cards are flat and keep the numbered rows) | done a9cf759 |
| 8 | `calendar` | `1:5205` | 1440 × 859 | `1:15976` | 768 × 1044 | `1:17026` | 390 × 1027 | **Amber** ground (`#F8A351`) with **one card** (cream left: black arrow squares, `JUNE 2025` in Anton, a hairline month grid with the picked day a **black square with an orange numeral**; right: a **maroon wavy-line panel** with a **ringed `KM`** disc, **`PICK A DATE.` at ~ 150 px orange Anton**, an eye glyph, a big cream arrow ←) and a **cream foot bar** (`Enquiry for Thursday, June 12 at 9:00pm` in Fraunces + a black `CONTINUE →` button) · **Lime's *Scheduler*** inventory | done 8841896 |
| 9 | `form` | `1:5385` | 1440 × 714 | `1:16159` | 768 × 1066 | `1:17207` | 390 × 1309 | **Cream** page, **one card**: a **maroon context panel** (avatar + `KAI MERCER` / `DJ · LIVE BAND`, a three-line **orange Anton** `LET'S MAKE YOUR NIGHT UNFORGETTABLE.`, three hairline promise rows with amber numerals) + a **sand form** (name, email, date, guests, `EVENT TYPE` pills with `WEDDING` black, message, an orange `BOOK NOW →`), all fields square, 1 px · **Lime's *Split context + form*** | done 6033bd6 |
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
  **Verdict (section 2): a new own-tree block, `HeadlinerBio`.** Read against Retro's `v0` bio (a small vertical label, a tilted polaroid) and Lime's / Grunge's
  shared block (an arch- or round-topped photograph between two flanks): neither sets a head turned a quarter turn over a square portrait, so there was nothing to
  dress. The narrow frames **keep the statement turned** (its first line overhangs the gutter by 12 at 390), and the frame's two lines are its measure's break.
- **media (3).** The headline is **black on maroon** (a 1.9:1 contrast: a frame choice, so it is the frame's); the
  `TOP TRACKS / 5 / 5 FEATURED` pair stands at the headline's foot-right; the player card is black, **square**, with a
  377 × 266 photo and **no rounded art**. The five rows' play buttons are outlined squares, the current row lit orange.
  **Verdict (section 3): a new own-tree block, `HeadlinerMedia`.** Read against Retro's `v0` media (a stack of overlapping cards
  and a tilted block), Lime's / Grunge's shared block (five flush hairline rows beside a card whose *background* is the sleeve under
  an inset glow) and Lattice's (hairline rows beside a card with a bar meter): the rows are the nearest relative (number · cover ·
  title and sub · time · square button on a 1 px rule), but the picture differs at every leaf (Inter Tight titles at 22 / 18, the
  time in Anton at the row's right, an outlined square button, no radius, the 85 / 73 pitch), and the player is **a flat black
  square card whose photograph is a flex remainder over a title row (the name, the artist, three 44 squares) and a 3 px progress
  rail**: a shape none of them draws. Dressing any of the three would be ternaries through a branch other templates render, so it
  stands on `s.headliner` in a tree of its own, after `Media`'s hooks and seam. Measured off the three nodes (the plan's read
  was a screenshot): the section is **1057 tall at 1440 because its content (694.39) is centred in a 1057 box** (181.3 above and
  below), where 768 and 390 pad 77 / 58; the head box (152.39 / 70.55 / 201.09) holds the headline and, at 390, the removed
  labels' 55.6 under it; the **player is 426 tall at every width** (426.016 / 426 / 342 wide) and its photograph the remainder
  (267.25 / 276.05 / 281.94), so a title row that wraps costs the photograph and not the card; rows are 85 / 85 / 73 with the
  1 px rule inside them, the list's own foot rule making 426 / 426 / 366.
- **gallery (4).** The open accordion row is the `GALLERY` row with an orange arrow; **its sibling rows are the three
  services** (`YOUTUBE` / `INSTAGRAM` / `TIKTOK`, `notes/gallery.md` *social rows*), so the accordion is the existing
  source-rows control re-set in 64 px Anton. **The eye glyph is decoration** (art). The viewer's arrow pair sits
  **inside the photo's foot-right corner** (black, orange).
  **Verdict (section 4): a new own-tree block, `HeadlinerGallery`.** Read against Lime's / Grunge's shared block (filled capsule rows beside a radiused
  photograph), Retro's (a tilted viewer), Lattice's (ruled mono boxes) and Paperback's (24-radius rows, a keylined turned viewer): the inventory is the
  same (four source rows, a back link, a viewer with two arrows, a seven-tile strip) and no picture is shared. This frame is **four flush rows on 1 px
  rules in 64 / 48 / 38 px Anton (the open one orange with an orange 54 x 45 block arrow, the others black), a square outlined back link with a teal
  96 x 51 eye at its row's right, a figure on a constant 655.047 : 481.469 aspect with a black and an orange 46 square flush in its foot-right corner, and
  seven flat tiles on an 8 gap**, on a sand band. Measured off the three nodes: **the section is 96 / 77 / 58 of padding round the taller column**
  (849.25 = 96 + 657.25 + 96), so nothing is centred in a taller box, unlike the media's 1440; the left column is the taller at 1440 (657.25 against 647.2), the
  two stack at 768 / 390 on a 36 / 28 gap; the columns are 540.516 and 655.047 on a 146.5 gutter at 1440 (48.96 in) and one 715.766 / 342 column; the head
  box is two 127.008 / 78.4 / 50.96 lines (lh .98), the rows start 22 below it at every width and are 85.625 / 69.469 / 66 tall (a 1 px top rule inside them, the
  container's foot rule making 343.5 / 278.875 / 265); a row's label sits 3.84 / 2.88 / 2.28 under its line box's top. **The frame breaks its head after the
  second word and no measure can make that break** (Anton at 129.6: `See us in` 436.5, `in action` 451), so the head is two lines at the middle word. The frame draws
  **no credit line**, so `railLabel` is not read by Headliner's layout 1 (`in`). Slot: **`HEADLINER_PHOTOS.gallery[1]` is `headlinerViewer`** (settled in
  session 0, Paperback's shape): the canvas opens the viewer on slot 2, the frame's picture, and rings no tile.
- **repertoire (5).** Twelve rows on a page in two columns of six; the pager's `20` is the last page (`240 / 12`).
  The search box is **right-aligned at the head's baseline**, outside the chip row.
  **Verdict (section 5): a new own-tree block, `HeadlinerRepertoire`**, handed `Repertoire`'s `g` after the seam (Lattice's and Paperback's shape). Read against Lime's
  *Two-column dense* (flush rows on a hairline, a pill search, filled pill chips, the shared `Pager`), Grunge's and Pop's (their own rows and stickers), Lattice's (ruled boxes)
  and Paperback's (white pills on a yellow card): the inventory is the same and the picture is shared with none. This frame is **a cream band** (Scheme 2, the root's own
  ground, no card) holding a 149.76 / 93 / 60 Anton count, a **square 1 px outlined search** (380 / 261.5 / full wide, 52 tall), four 40-tall outlined pill chips (the active
  one `#1E1E1E` with sand type), **twelve flush rows on `rgba(30,30,30,.18)` rules** (a maroon Anton number in 40, the title in Anton 30 / 27 / 25, the artist in Inter
  Tight 15 flush right), and a **row of 44 outlined squares** (arrows, `1 2 3 … 20`, the current one filled). Measured off the three nodes (`1:4830` · `1:15602` · `1:16651`,
  1067 / 1067 / 1603 tall): **desktop and tablet centre their content in a 1067 box** (161.74 + 743.52 + 161.74; 153 + 761 + 153; the media's 768 padded, this one does
  not), 390 pads 58 (58 + 1487.44 + 58), so the stage is the media's: `minHeight` plus centring over a 96 / 77 / 58 padding. **The head is a flex row of the count and an
  empty `Paragraph`** (`1:4841` 239.67 x 82.06 at 1440, 147.72 derived at 768, `1:16662` 141.02 x 128.69 at 390; an import artefact, nothing to draw) on a 28 gap, bottom-aligned,
  beside the search: at 1440 everything fits (the count 608.56 wide, one line); at 768 the left column is clamped at its min-content (430.27 = 254.55 + 28 + the seat), which
  squeezes the count to its widest word, and at 390 the seat takes 141 of the 342, so the count is 172.97 wide. `240 SONGS` sets 378 at 93 and 244 at 60, so **neither break is a
  measure of the column: both are the seat's squeeze**, and the tree keeps the seat as an empty box (its width, and its 128.69 height at 390, which is what seats the count 11.09
  down and makes the section 1603) so the frame's break, and a live count's, fall out of flex. The eyebrow `— REPERTOIRE` has no field (no `kicker` on the repertoire): its 31.75
  stays as padding (the bio's and media's convention). Rows are `1 + 16 + title box (32 / 29 / 27) + 16` = 65 / 62 / 60 on contiguous rules at 1440 and 768, **28 apart at 390**
  (an 88 pitch, a rule on each); two columns 47.98 apart, six down each, one of twelve at 390. The pager is `1 2 3 … 20` (four numbered buttons) at every width, 44 squares on a 6 gap, the
  390 row's five middle buttons stretching across the 342.
- **map (6).** The panel is **square, maroon, with concentric rings** and a foot; the `120 MILE RADIUS` pill is the
  head's baseline right. The date tiles alternate fills by `tags` seat (orange, amber, cream ×3) — **read whether the
  frame colours them by index or by state** (the first is `Sold out`).
  **Verdict (section 6): a new own-tree block, `HeadlinerMap`**, dispatched in `EventsMap`'s `if (s.limeTree)` after the seam, ahead of Paperback's. Read against Lime's
  *Compact tile* (a raster map in a ringed card beside flush hairline rows; Grunge's, Editorial's and Pop's are its dress), Lattice's (a dotted bowl over a ruled foot beside boxed rows) and
  Paperback's (a turned lilac card beside white pill rows): the inventory is the same (a head and a radius pill, a coverage card with a foot, a gig list with a count, a pager) and the
  picture is shared with none. This frame is **a teal band (Scheme 6, the root's own ground, no card) holding a 181.44 / 112 / 70 Anton head, a 108.31 x 28 amber pill, a flat maroon
  square card (the rings art over a ruled foot), and five flush rows on `rgba(238,227,209,.22)` rules, each a 72-wide flat date tile, an Anton venue over an Inter Tight line and a
  1 px outlined pill**, then a pager of 44 squares. Measured off the three nodes (`1:4955` · `1:15726` · `1:16776`, 1051.41 / 1558.52 / 1435.13 tall): **nothing is centred in a taller
  box** (96 + 859.39 + 96; 77 + 1404.52 + 77; 58 + 1319.13 + 58), unlike the media's and repertoire's 1440. **The head's siblings are the left column and the pill, no empty box**:
  the left column hugs the heading (872.59 / 538.64 / 336.67 wide, Anton's 4.809 em at -0.005em) and the pill stands at **the head box's foot (`flex-end`, 12 under the heading's baseline;
  not at the baseline)**, right at 1440 and 768, under the heading on a 14 gap at 390; the eyebrow's 31.75 (a 15.75 line and a 16 gap) stays as padding. The body is a 655.05 | 655.05 grid on a
  32 gap at 1440 whose **maroon card is stretched to the list column** (16.8 + 10 + 537.05 + 10 + 44 = 617.84), and a stack on a 32 gap at 768 (664.47, then 534.52) and 390 (501, then
  611.8). The card is `#760000` (the maroon scheme, nested), its picture box 24 in on three sides and flush to the foot (607.05 x 505.84, the remainder, at 1440; 667.77 x 556.47 at 768;
  294 x 360 at 390), its foot **88 / 84 / 117** (a 1 px rule and 20 either side): the name Anton 30 / 27 / 25 and the terms Anton 13 in amber, in a flex row whose name shrinks to its
  min-content at 390 (148.25) and leaves the terms 145.75. **The rings are art, not the map** (Lattice's and Paperback's call): outer diameters .2 / .4 / .6 / .8 of the box's *width* (so 485.6, 534.2,
  235.2), the .2 and .6 rings solid (stroke .005 / .0025 of the width), the .4 and .8 rings dashed (52 and 108 dashes of .43 of their pitch, one centred on three o'clock), an orange dot of
  radius .02667 of the width, all about the box's centre; `headlinerArt.jsx` had no rings, so this section writes `HeadlinerRings`. **The tiles' fills are by index, not state**: orange, amber, sand,
  sand, sand with the first row `Sold out` and the others `Tickets`, so rows 2 and 3 share a state and differ in fill. Rows are 107.19 / 90.55 / 106 on a 1 px top rule (the list's foot rule closing
  them): a 72 x 64.375 / 61.547 / 58.688 tile, an 18 / 18 / 10 gap, the venue 30 / 27 / 25 over a 6 gap and a 19-tall line at .85, the pill flush right; **at 390 all five rows are 106 because the first
  row's venue wraps** (`Hidden` / `Warehouse`: the Sold-out pill leaves the column 179.36 and the title sets 180). The pager is space-between (an outlined prev square, three centred
  squares with the current one orange, an orange next square), at every width. Not drawn (the standing removals): the eyebrow `Shows / coverage`, the `Sold out` pill (no field), and `Tickets`
  except on a row with an address (JP-045). The `05 of 12` is derived. **The `120 mile radius` is `vm.mapRadius`.**
- **pricing (7).** The three cards are `orange / maroon / teal` and the **middle one is the maroon** (the featured
  plan is the middle, as every earlier template). The features carry a **two-digit numbered tail** (`01…05`) where
  earlier templates draw ticks — a new inventory item; the Solo / Trio / Band toggle is the chip filter.
  **Verdict (section 7): a new own-tree block, `HeadlinerPricing`**, dispatched in `Pricing`'s `if (s.limeTree)` after the seam, ahead of Lattice's and Paperback's, handed `{ shown, active, pressChip }`. Read against Lime's
  (one flat `box/2` card in a 3 px ring, filled chips), Pop's (three 50-radius seats), Lattice's (ruled boxes with a bar) and Paperback's (three 24-radius cards turned -3 / 2 / -2, ticked rows): the inventory is the same (a head, a
  chip row, a three-up deck of name / unit / price / blurb / features / Book pill, a small print) and the picture is shared with none. This frame is **three flat square cards, no ring and no turn, on the sand page** (Scheme 1,
  the root's own ground, no card margin): orange `#F85E34` with ink `#020202`, maroon `#760000` with sand `#EEE3D1` (rows `#f4f4f4`), teal `#3B758B` with sand (rows `#f4f4f4`); a two-line Anton head 123.84 / 77 / 50 (lh .98),
  three outlined 44-tall pill tabs on a 6 gap (`SOLO` lit `#1E1E1E`), and per card an Anton 18 name beside a 14 `/ event` at .75, the price in Anton 112 / 69 / 45 (lh .98), a Fraunces Light 22 / 22 / 20 blurb (lh 1.15),
  **a list of 44-tall rows on 1 px rules, each an Inter Tight 16 feature with an Anton 14 `01…05` numeral flush right (the list's own foot rule closes it)**, and a 46-tall square `BOOK THIS SET →` button. Measured off the three
  nodes (`1:5067` · `1:15838` · `1:16888`, 1152 / 1556 / 2112 tall): **nothing is centred in a taller box** (96 + 960.016 + 96; 77 + 1401.969 + 77; 58 + 1996.109 + 58), unlike the media's and repertoire's 1440. **The head's
  siblings are the left column (eyebrow seat 15.75 + 16, then the heading, which hugs its widest line: 523.438 / 325.5 / 211.375 wide) and the tab list, no empty box**: the tabs stand at the head box's foot (`flex-end`, top
  230.47 = 274.469 - 44) at the right edge at 1440 and 768, under the heading on a 24 gap at 390; the eyebrow's 31.75 stays as padding (no `kicker` on the pricing). The head breaks after `PICK YOUR`: two `<p>`s in the frame, a
  measure's break too (`Pick your night's` is wider than the 523.438 that `NIGHT'S SET` sets), but the gallery's rule is safer (two lines at the middle word, `ceil(n / 2)`), so the head is built that way. **Cards**: 436.688 wide
  on a 16 gap at 1440 (three columns), 349.891 on a 16 column / 36 row gap at 768 **with the third card spanning both columns** (the frame's, 715.766 wide: its blurb is one line and its list takes the room), 342 on a 28 gap
  at 390; padding 28 / `24 21` / `20 16`; **every card is `min-height: 540`**, which is what fixes the narrow frames (540 each: 1116 = 540 + 36 + 540; 1676 = 540 x 3 + 28 x 2) while the 1440 frame is its natural 582.219 (28 +
  18.875 + 20 + 109.75 + 20 + 50.594 + 20 + a 221 list + 20 + 46 + 28), **and the list is `flex: 1`**: the four-row first card's list stands 221 like the five-row cards' (the rule under its fourth row sits at the list's foot),
  and at 768 / 390 the list takes what 540 leaves (228.891 / 265.016; 254.188 on the spanning card). The button sits on the card's foot after a 20 gap. **The fills follow the card's place in the stored list (`t.n % 3`), not a
  state**: the frame lights `Solo` and still draws all three cards, so no filter decides a fill, and a tab that hides one card must not recolour the rest (the map's tiles and Paperback's cards). **The middle (maroon) card is
  the frame's only distinction: no Featured badge or ring is drawn**, so `Featured` is read by no Headliner element. Copy the frame sets that the seeds do not: the head (`Pick your night's set`, where the shared seed is
  `Choose the set that's right for your night`), the button (`Book this set`, Paperback's `PRICING_ROW_CTA_PAPERBACK`), the unit (`/ event` against the seed's `/event`) and the small print (no Oxford comma); the first two are
  seeded per template, the unit and the small print are not (Paperback's rule).
- **calendar (8).** The month grid is **hairline cells with no fills**, the picked day a black square with an orange
  numeral; the right panel is **maroon with the wavy-line field** and holds the section's *headline* (`PICK A DATE.`,
  orange, ~ 150 px) — the biggest type on the page after the hero's name.
  **Verdict (section 8): a new own-tree block, `HeadlinerCalendar`**, dispatched in `Calendar`'s `if (s.limeTree && ...)` after the seam, handed `g = { month, cur, line, step, pick }`. Read against Lime's *Scheduler* (a radiused
  panel in a ring beside a photograph; Grunge's, Editorial's and Pop's are its dress), Lattice's (a ruled card with a dotted torus) and Paperback's (a 40-radius blush card, a turned tile and confetti): the inventory is the same
  (a month head with two arrows, a weekday row, a seven-column grid, a picture half, a foot with the enquiry line and Continue) and the picture is shared with none. This frame is **a flat square cream card (`#F8F2E7`, Scheme 2's ground
  nested) on the amber band (Scheme 4, the section's own seat, so the root paints it and no `cardOnPage` is needed)**, 48.96 / 26.11 / 24 in from the edges, holding **a month half and a maroon wavy-line half (Scheme 3 nested)
  side by side at 1440 and stacked at 768 and 390, over a foot**. Measured off the three nodes (`1:5205` · `1:15976` · `1:17026`, 858.52 / 1044.33 / 1026.9 tall): **nothing is centred in a taller box** (96 + 666.516 + 96; 76.99 +
  890.344 + 76.99; 58.01 + 910.891 + 58.01). **Desktop** is two 671.047 columns (the left one border-right 1 px) over a 79-tall foot (a 1 px top rule, the line 32 in, `Continue` 16 in from the right): the left holds a 56 / 45 / 37 Anton
  month between two 44 outlined squares (a head row that is `max(44, 4 + lh)` tall: 58.875 / 48.094 / 44), a 34-tall weekday row 18 down (Anton 13, `#760000`), and a grid of **54-tall cells with a top rule only, no fill and no side rules**
  (the picked day `#020202` with an orange Anton 18 numeral; an absent cell draws no rule, so the frame's fifth row carries a rule under two cells); the right half is **587.516 tall because its own content is: 32 + a 120 ring-and-eye row +
  the two-line head (2 x 146.765, Anton 149.76, lh .98) + a 110 arrow row + 32**, the wave field behind. **768 and 390 stack** (the grid on top, 424.09 / 410 tall: 27 / 22 of padding round the head row, 18 down to the grid and the same
  below it) **and put the maroon panel (357.891 x 466.25 at 768, 342 x 391.594 at 390) beside the foot at 768 (a 358 x 466 column, padding 46, the line at the top and Continue at the foot) and over it at 390 (a 109.3 row, line left,
  Continue right)**. The panel's flow is the same at all three widths (disc row, in-flow head, arrow row), but **the narrow frames draw the head 109.25 / 115.59 below its flow box, over the arrow row, and turn the block arrow -90 so it points up**
  (a 110 x 132 box at +38 / +34 right and -22 / -19 up of the row's wrapper). The head's two lines are the frame's `<p>`s and **no measure makes the break at 390** (`Pick a date.` is 275 wide in the 310), so it is two lines at the middle
  word (the gallery's rule). **The wave field is one dataset at all three widths**: 70 six-point lines, x a fraction of the panel's width (`x / W`, identical at all three to 0.001), y at .2195 / .4024 / .5854 / .7805 of its height, orange at .22,
  stroke .578 / .376 / .337 (the frames' own). **Not drawn (the standing rules)**: nothing here is a removed label; the frame's `KM` disc stands on the artist's initials (the hero's numeral rule: `vm.initials`), the head is `heading`
  (seeded `Pick a date.`, the template's own), `prompt` is the line while no day is cued, `cta` is `Continue` (Lattice's and Paperback's seed). **Fields read**: `heading`, `open`, `booked`, `time`, `prompt`, `cta`; `image` is not read (the right half is art).
- **form (9).** Fields are **1 px outlined squares on a sand ground**; the promises are three hairline rows with amber
  numerals `01–03`; the card's left panel is maroon.
  **Verdict (section 9): a new own-tree block, `HeadlinerForm`**, dispatched in `EnquiryForm` after the seam, ahead of Paperback's, handed the same `g` (`at`, `setAt`, `msg`, `setMessage`, `ti`, `setType`, `showTypes`, `errs`, `msgBad`, `sent`,
  `setSent`, `Pill`, `pillLink`, `onSubmit`, `cp`, `pid`). Read against Lime's *Split context + form* (a 55-radius shell round 999-radius pills; Grunge's, Editorial's and Pop's are its dress), Lattice's (a 20-radius card on `#111` with a
  glow and mono type) and Paperback's (a 40-radius indigo and orange card, a turned chat-bubble disc): the inventory is the same (an avatar row, a head, three promises, a context half beside or over a form half, four boxes in two
  pairs, a chip row, a message, a submit) and the picture is shared with none. This frame is **one flat square card** (no radius, no shadow, no keyline, no bubble, **no wave field: the panel is a flat `#760000`**) **48.96 / 26.11 / 24 in from
  the edges on the cream page (Scheme 2, the section's own seat, so the root paints the page and `vm.pageBg` / `cardOnPage` are not wanted)**, a maroon panel (Scheme 3 nested) and a sand form half (Scheme 1 nested), 447.344 | 894.719 side by side at
  1440 and stacked at 768 and 390 (the panel on top, 402.047 / 407.688 tall). Measured off the three nodes (`1:5385` · `1:16159` · `1:17207`, 714.047 / 1066.109 / 1309.125 tall): **nothing is centred in a taller box** (96 + 522.047 + 96;
  76.99 + 912.125 + 76.99; 58 + 1193.125 + 58). **The panel's children are the avatar row, the head and the list; no empty sibling.** The panel pads 40 / `34 30` / `28 20`, with 26 between the avatar row (a 52 square photograph and a
  34.44-tall name block, centred on it: the name Anton 16 `#EEE3D1`, the role Anton 13 amber), the head and the list; **at 1440 the panel is stretched to the form half (522.047) and the list is foot-anchored** (its top 346.05 = 522.047 - 40 - 136,
  so the gap above it is the surplus, 39.9, where 26 is the floor: the frame's `List:align` wrapper is that `margin-top: auto`), and at 768 / 390 the column is its own height. The head is Anton 64 / 48 / 38 (lh .98, -0.005em, orange `#F85E34`)
  and **breaks by measure, not by hand**: `LET'S MAKE / YOUR NIGHT / UNFORGETTABLE.` at 1440 (the last word sets 378 in a 367.344 box, so it **overhangs the content box by about 11** into the panel's 40 padding: the frame's text node is 381
  wide), `LET'S MAKE YOUR NIGHT / UNFORGETTABLE.` at 768 and `LET'S MAKE YOUR / NIGHT / UNFORGETTABLE.` at 390, each the greedy fill of the content box, so no `<br>` is drawn (the gallery's forced break is not this). The list is three 45-tall rows on 1 px
  `rgba(238,227,209,.22)` rules (an Inter Tight 16 `#f4f4f4` promise at -0.015em, an Anton 14 amber numeral flush right at the row's top, 12 down; the list's own foot rule closes it: 136). The form half pads 40 / `34 30` / `28 20`: **four 72.688 labels**
  (an Anton 14 `#1E1E1E` label at lh 14.688, 8 above a 50-tall 1 px `#1E1E1E` outlined square on cream `#F8F2E7`, the hint Inter Tight 16 `#757575` at -0.015em, 14 in), **two to a row on a 20 gap at 1440 and 768 and one column at 390, the rows 18 apart
  (28 at 390)**; a **fieldset** (an 18-tall legend and 8 under it the chips: 40-tall 1 px pills, Anton 14, `0 16` padding, 6 apart, wrapping, the lit one `#1E1E1E` under `#EEE3D1`; at 390 `Other` wraps to a second row, 112 tall); the **message** (the label and a 90-tall
  box, padding 14); and a **46-tall orange square `BOOK NOW →`** (`HeadlinerPill`'s own box, 132.219 wide). Heights agree by sum: 40 + 72.688 + 18 + 72.688 + 18 + 66 + 18 + 112.688 + 18 + 46 + 40 = 522.07 (the frame's 522.047). Not drawn (the standing rules):
  nothing is removed here, the frame prints no eyebrow, script or ring text. **Fields read**: `heading`, `promises`, `fields`, `types`, `typeLabel`, `message`, `messageLabel`, `button`, `image`; the avatar, name and role are the identity's (`vm.brand`, `vm.kicker`).
  The hint is `#757575` on `#F8F2E7`, the ink at about .59, where the global `::placeholder` is .45: left at .45 and listed as a call (the repertoire's search, section 5).
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

### Settled in sections 1–11

**Section 1 — the header** (2026-11-23; frames desktop `1:4481`, tablet `1:15262`, mobile `1:16317`; code `2e7fde9`, notes: the commit after it).

- **An own tree, `HeadlinerHero`** (`EncoreSection.jsx`, standing at `HeaderV0`'s head on `s.headliner`, hookless, so before the seam).
  The stage pattern: a `containerType: inline-size` root, `u(v)` turning a frame px into `cqw`, **the frame's numbers verbatim at every
  width**. A `HEADLINER_HERO` table holds each width's `fw`, gutter, ring, numeral size, arrow width, chip gap and the **slanted-edge
  fractions of the stage's width**: desktop left edge 0.33 → 0.53, right 0.62 → 0.79; tablet 0.40 → 0.58, 0.68 → 0.84; mobile 0.48 → 0.64,
  0.74 → 0.88. The bar is 80, the stage 820, the hairline 1 px; the hero is 900 everywhere (`vm.heroH` = 900 at 768 and 390 behind
  `headliner`; **desktop's 738 canvas height is the hero's own `aspectRatio` × 0.82**, not `heroH`).
- **The photograph is one full-stage `<Photo>` under two solid wedge panels** (the maroon left one, the orange right one carrying
  `HeadlinerWaves`), as the frame stacks them; the photo probe reports `header.image` "partial" (28–33 of 143 points open), which it
  counts as hit. **Mobile has no orange panel and no block arrow**, and its picture sits 77 px right of the stage's centred cover
  (`objectPosition: calc(50% + u(77))`, not a second box). A right-surplus orange fill carries the published tab past 1440.
- **The three-colour name is three stacked copies in one grid cell**, each `clip-path: polygon()` to its zone (points in the name's own
  box: `calc(100% - u(764))` is the stage's top, `calc(100% + u(56))` its foot, x `calc(Ncqw - u(gutter))`). The first is the real
  `<h1>` (orange, left zone); the other two are `aria-hidden` divs (cream centre, black right). **None sets `pointer-events: none`**, so
  a click reaches the title slot (the inline probe's positive control). The column is bottom-anchored (avatar, chips, name), so a
  name that wraps grows *upward* and lifts the chips. The name is Anton 267.84 / 156 / 58 px (`TITLE_SITES.Headliner`, `antonEms` at
  -0.005em in `sectionVm`'s `titleFitK`: a long name sets down to the half-size floor).
- **The ringed numeral is one svg whose viewBox is the disc** (124 / 124 / 84, stroke 14), so the builder's seal rule boxes it whole. Its
  text is `header.badgeText`, **which defaults to the artist's initials, not the name** (`initialsOf` moved to `data.js`;
  `fieldSeed` mirrors it; `vm.badgeText` takes it at layout 1). Cap **3**: two characters at the frame's size, a third at 0.72 so three
  capital Ws (72 px at full size) clear the 56 px hole at 390. `badgeOptsFor` offers Visible / Hidden only (nothing in it turns).
- **The bar is the hamburger and `HeadlinerPill`** (a square orange Anton button with an arrow, `s.onScheme[1].activeBg`); the open
  menu's own Book Now row reads the same pill (`MenuPanel`'s `s.headliner` arm, `menuColours` takes `[s.bg, s.tx]`). The standing
  removals hold: no wordmark, no inline links, no tagline, no kicker or location (the frame's five inline links and `KM` logo are not drawn).
- **The six chips** take `tok.chips[3, 1, 2, 0, 4]` and an outline sixth, as the frame.
- **The picker shows the whole hero**: Headliner's 738-tall desktop hero was cropped by the template card's 1180 × 614 frame
  (`ScaledPreview` with `center`, not `fit`), so `TemplatePreview` passes `fit` for Headliner alone (**user call, 2026-11-23**, asked and
  answered: "Fit, Headliner only"). The setup modal's cards read the whole hero already.
- **Caps** (`limits.mjs header --themes=7 --designs=0 --sweep`, then `--check` and `--seeds`: 0 failing, 0 over): title **33**
  (open to 80 at 1440 and 768, 33 at 390), tags 8 chips of 22, main button 16, numeral 3. **The title's first measurement was 10** because
  the probe counted the two `aria-hidden` stacked copies as neighbouring text; `limits.mjs`'s overlap filter now skips a same-box
  `aria-hidden` copy of the seat (a script change, committed with the code). Header `in` rows measured over `reach.mjs 7` and unchanged
  (`badgeMode` and `badgeText` read layouts 1 and 4; `heroCta`, `faceTitle`, `faceBody` layout 2; `cardLine` layout 3; tags 1, 3, 4).
- **Ledgers**: `INLINE_OFF` gains `Headliner.0.header.kicker` and `.location` (not drawn); `PHOTO_OFF` stays empty.
- **`inline-probe.mjs` slides its aim off the builder's chrome**: the selected section's canvas toolbar (the pencil) sits over the middle
  of a top-right pill's text at 1440, so the click's first point is moved along the line to the nearest one the section owns (a hand
  clicks the part of the words the toolbar leaves). Any template whose Book pill nears the right gutter benefits.
- **Proofs.** `inline-probe --theme Headliner --layout 1 --width 1440,768 --cat header --check`: PASS (9 slots hit each, 0 WRONG /
  NOT-RESTORED / MISSING / UNREACHED, 2 off). `photo-probe` `--check`, `--blank` and `--drop` at 1440 and 768: PASS (2 slots).
  `focus-probe --prime --check`: 12 controls, 0 failing, both widths. The two-server **digest**, themes 0–6 (HEAD `4057068` in a worktree
  against the working tree): 0 of 1008 renders differ after the two normalisations. `npm run build`: passes. **Root `index.html` is not refreshed.**

**Section 2 — the bio** (2026-11-23; frames desktop `1:4627`, tablet `1:15396`, mobile `1:16446`; code `2867fa3`, notes: the commit after it; the full record is `notes/bio.md`, *Headliner layout 1*).

- **An own tree, `HeadlinerBio`**, at the head of `Bio` (hookless): the stage pattern, `HEADLINER_BIO`, the frame's px at all three widths, `vm.pad` = the surplus alone. Desktop is the frame's three 426.016 columns (an empty seat, the 426 x 640 portrait, the lead over the About block); 768 and 390 stack seat, portrait and lower block. Heights 681.75 / 1292.92 / 1209.19 against the frames' 832 x 1180/1440, 1293 and 1209; the statement's box, the portrait and the lead agree to a tenth at the three widths.
- **The statement is Anton 150 / 124.839 / 54.432 turned -90 as a transform** (not `writing-mode`), right-aligned in a `min(640u, max(5em, widest word))` measure, its first line's left edge at -198 / -149.65 / -11.92 against the portrait's, over the photograph. `vm.titleWordEms` = `antonEms(w, -0.005)` fits a long word to the portrait's height.
- **`para1` is the lead (Fraunces Light, first use of the serif), `para2` the About paragraph**: `FIELDS.bio.para2` is now read at layout 1 for Headliner (`in` and `chars` rows). No badge (`badgeMode` `Headliner: [2]`), no role line or tags (`IDENTITY_READS.bio`: kicker `[1, 2, 3]`, location `[1, 2]`), the standing removals hold (no `KM bio`, no `001` / `Structure · Bio_01`).
- **Caps** `heading` 17 (`Headliner: [17, null, 20, 18]`), `para1` 390, `para2` 340, all `--check` 0 failing, `--seeds` 0 over; `limits.mjs`' `FLOOR_AT` names Headliner. **Ledgers: none** (the statement is a transform, so the inline editor places its box with the tilt machinery; `INLINE_OFF` and `PHOTO_OFF` gain no row).
- **Proofs.** `inline-probe --theme Headliner --layout 1 --cat bio --width 1440,768 --check`: PASS (3 slots hit, 1 unhit, the literal `About`). `photo-probe` `--check`, `--blank`, `--drop`: PASS (1 slot). `focus-probe --prime --check`: 3 controls, 0 failing. `reach.mjs 7`: layout 1 reads none of the bio's other keys or the identity keys. States walked at three widths: both paragraphs emptied together, each alone, the photo removed, a 17-character heading, a 20-letter word (fits), a three-line heading, a 390-word lead (the section grows, nothing overlaps). The two-server **digest**, themes 0-6 (HEAD `a32977e` in a worktree on 5176 against the working tree): **0 of 1008 renders differ** after the two normalisations (the first run died at theme 6's start with a detached-frame error, so themes 0-5 and theme 6 were run in two parts); the positive control (theme 7, bio) differs at layout 1 at the three widths and nowhere else. `focus-probe` on Lime's bio, old tree against new: 5 controls, 0 failing both. `page-check.mjs Headliner 0`: no console error, bio 1209 at 390, no overflow. `&live=1`: the same geometry at three widths. `npm run build`: passes. **Root `index.html` is not refreshed.**
- **For the user (calls this section made on its own).** (1) **Layout 1 shows Paragraph 2 under `About`** (the frame has two paragraphs; the bio had one at layout 1 for every earlier template). Alternative: draw the lead alone and leave `para2` unread. (2) **The seeded copy is longer than the frame's**: the shared seeds set the lead on 5 lines at 1440 and 390 (the frame's 4) and the About paragraph on 3 (the frame's 2), so at 390 the About block stands about 30 px lower than the frame's, and the statement keeps the seed's full stop (`ROOM.`, the frame prints `ROOM`). Not re-seeded per template. (3) **A removed photo draws the initials on the orange ground** (`s.ac`).

**Section 3 — the media player** (2026-11-23; frames desktop `1:4650`, tablet `1:15421`, mobile `1:16471`; code `117984f`, notes: the commit after it; the full record is `notes/media.md`, *Headliner · layout 1*).

- **An own tree, `HeadlinerMedia`**, dispatched from `Media` after its hooks and seam (`if (s.v0 && s.headliner)`), handed Lattice's and Paperback's seam. The stage pattern: `HEADLINER_MEDIA`, the frame's px at all three widths in cqw, `vm.pad` = the surplus alone (the Headliner line in `EncoreBuilder.jsx` now names `bio` and `media`), `vm.titleWordEms` = `antonEms(w, -0.005)` for the media head too. Heights 1057 / 1218.5 / 1251 against the frames' 1057 / 1219 / 1251; every box agrees to a tenth.
- **Desktop centres its 694.39 of content in a 1057 box** (181.3 above and below), written as `minHeight` plus centring over a 96 padding, so more tracks grow the section; 768 / 390 pad 77 / 58. The head's box is the frame's (152.39 / 70.55 / 201.09) as a minimum, and **at 390 the removed labels' seat stays as padding** (the bio's convention).
- **The player is 426 tall at every width** with the photograph as the flex remainder; the **transport stands on the title row's foot** (the frame's 17.11 / 8.3 / 2.39 offsets), the artist line is the frame's 18 box with its text 9 / 7 / 7 down. Rows are 85 / 85 / 73, one-line ellipsised title and sub, the time drawn only while it differs from the subtitle. The marked row and the player's name are the cued track's (Lattice's rule), not the frame's row 02 / *Night Rain*.
- **`HEADLINER_COVER` is seeded as track one's art** (`HEADLINER_TRACK_ART[0]`): the player shows the cued track's art, the row crops are 176 px and the cover 379 x 268, so the sleeve is the frame's picture; row 1's thumbnail is its centre crop. Layouts 2–4's placeholder tiles see it too (the only reason their theme-7 renders differ).
- **Caps**: `heading` 20, `tracks.title` 17 (the seed's floor; the probe read 11 / 14 / 10), `sub` 33, `IDENTITY_CHARS.media.title.Headliner[0]` 50; layouts 2–4 Grunge's rows, written out. `--check` 0 failing, `--seeds` 0 over. **`in` rows unchanged** (`reach.mjs 7`: only `chipLabel`, layout 2). Ledger: `INLINE_OFF` `Headliner.0.media.tracks.sub`; `PHOTO_OFF` none.
- **Proofs.** `inline-probe` media at 1440 and 768: PASS (6 slots hit, 5 off). `photo-probe` `--check`, `--blank`, `--drop`: PASS (5 slots). `focus-probe --prime --check`: 17 controls, 0 failing. Live (`&live=1`, a trusted click): row 3 plays (SoundHelix 3), the clock runs, Pause and resume, Previous and Next step through the list; an empty list and an over-long title behave. The two-server **digest**, themes 0-6 (HEAD `594916a` in a worktree on 5176, confirmed by `grep -c HeadlinerMedia` = 0 against 4): **0 of 1008 renders differ** after the two normalisations; the positive control (theme 7, media) differs at all four layouts and three widths. `npm run build`: passes. **Root `index.html` is not refreshed.**
- **For the user (calls this section made on its own).** (1) **The cover is track one's art**, so row 1's 56 px thumbnail is the cover's crop where the frame's is shot 1. Alternative: keep the row crops and let the player draw a 176 px picture at 378 px. (2) **The 390 head keeps 80 px of empty maroon** where the removed labels stood. (3) **The marked row is the cued track**, so the canvas lights row 1 and names *Late Lights*, not the frame's row 2 and *Night Rain*.

**Section 4 — the gallery** (2026-11-23; frames desktop `1:4766`, tablet `1:15538`, mobile `1:16587`; code `222c3b1`, notes: the commit after it; the full record is `notes/gallery.md`, *Headliner · layout 1*).

- **An own tree, `HeadlinerGallery`**, dispatched from `Gallery` after its hooks and seam (behind Paperback's line), handed `{ at, marked, strip, go, srcRows, srcAct, video, player }`. The stage pattern: `HEADLINER_GALLERY`, the frame's px at all three widths in cqw, `vm.pad` = the surplus alone (the Headliner line in `EncoreBuilder.jsx` now names `bio`, `media` and `gallery`), `vm.titleWordEms` = `antonEms(w, -0.005)` for the gallery head too. Heights 849.25 (the 1440 frame on the 0.82 canvas, 1 px rules unscaled) / 1385.78 / 942.98 against the frames' 849.25 / 1385.94 / 943.02; the head, rows, back link, eye, figure and tiles agree to a tenth at 768 and 390. **Nothing is centred in a taller box**: the frame's 96 / 77 / 58 wrap the taller column (the rows' 657.25 at 1440).
- **The head is two lines at the middle word**, because the frame's `See us` / `in action` break is not reachable by any measure (`See us in` sets 436.5 at 129.6, narrower than `in action`'s 451): the words are split `ceil(n / 2)` and the space kept before a `<br>`, so the node's text is the field's own. One word stands alone; each line wraps in the column.
- **Rows, back link, eye, viewer, strip as the frame draws them** (4 flush rows 85.625 / 69.469 / 66 on `rgba(30,30,30,.18)`, 54 x 45 block arrows orange for the open row; a square outlined back link and a 96 x 51 teal eye; a figure on the constant 655.047 : 481.469 aspect with the black and the orange 46 squares flush in its corner; seven flat tiles on an 8 gap). `sourceLabel` prints at every width. The eyebrow `Media` is `kicker`, drawn only when typed, its seat kept as padding. **`railLabel` is not read at layout 1** (the frame draws no credit line): `in: { Headliner: [1], '*': [0, 1] }`, which `reach.mjs 7` confirms (layout 2 alone, at 768).
- **The viewer's photograph is slot 2** (`HEADLINER_PHOTOS.gallery[1]` = `headlinerViewer`, set in session 0): the canvas opens on it and rings no tile, as the frame marks none; a visitor's own pick rings its tile in 3 px of `s.ac`. Thumbnail 1 keeps shot 1.
- **Caps**: `heading` **16** (the seed, a floor: the probe reads 14 at 1440, where a sample's long word shrinks the fitted head), `kicker` 45, `sourceLabel` 17, `backLabel` 23 (layouts 2-4's heading is Grunge's `[26, 23, 24]`, written out). `--check` 0 failing, `--seeds` 0 over. `FIELDS.gallery.sourceLabel`'s hint says *every width* for Headliner. **Ledgers: none** (`INLINE_OFF` and `PHOTO_OFF` gain no row); the one gate is the inert `data-inline="sourceLabel"` mark on row 0's label, which `INLINE_MARKED` scopes (`*.0.gallery.sourceLabel`) because the seed text `Gallery` is also `railLabel`'s.
- **Proofs.** `inline-probe --theme Headliner --layout 1 --cat gallery --width 1440,768 --check`: PASS (3 slots hit: the head, the back link, the first row's label). `photo-probe` `--check`, `--blank` (7 appended), `--drop`: PASS (7 slots; the arrow pair over the viewer reads as a partial point set, counted as hit). `focus-probe --prime --check`: 7 controls, 0 failing, both widths. Live (`&live=1`, a YouTube and an Instagram address, 1440 / 768 / 390): a tile opens its slot and moves the ring, Next and Previous step and wrap (7 → 1, 1 → 7), *Back to beginning* returns to slot 1, the YouTube row swaps the viewer for the player (the arrow pair hides, no tile is ringed) and the Gallery row brings the photographs back, Instagram is an outbound link, the TikTok row (no address) is not rendered, the section never scrolls sideways, no console error. States: a six-word over-cap head and a long label grow the section with no overflow, a one-word head and an empty photo list (seven initials tiles) render cleanly. The two-server **digest**, themes 0-6 (HEAD `1fad1c6` in a worktree on 5176, confirmed by `grep -c HeadlinerGallery` = 0 against 5): **0 of 1008 renders differ** after the two normalisations; the positive control (theme 7, gallery) differs at layout 1 at the three widths and nowhere else. `npm run build`: passes. **Root `index.html` is not refreshed.**
- **For the user (calls this section made on its own).** (1) **The two-line head is split at the middle word** (the frame's break, which no width gives); a five-word head sets 3 + 2. Alternative: let the head wrap in its column, which sets the seed `SEE US IN` / `ACTION`. (2) **Thumbnail 2 is the viewer's own picture**, not the frame's second shot (Paperback's shape). (3) **A visitor's picked tile is ringed in 3 px orange**, a state the frame cannot show. (4) **`railLabel` is hidden from the panel at layout 1** because the frame has no credit line; a stored value stays and comes back at layout 2.

**Section 5 — the repertoire** (2026-11-23; frames desktop `1:4830`, tablet `1:15602`, mobile `1:16651`; code `80a23e0`, notes: the commit after it; the full record is `notes/repertoire.md`, *Headliner · layout 1*).

- **An own tree, `HeadlinerRepertoire`**, dispatched from `Repertoire` after its seam, handed the same `g` as Lattice's and Paperback's (**four seam conditions now name Headliner**: the dispatch, `perPage` 12 at every width, `columns` two at 768, `pageWindow` keep-4 at all three widths, the 390 frame drawing `1 2 3 … 20` too). The stage pattern: `HEADLINER_REP`, the frame's px at all three widths in cqw, `vm.pad` = the surplus alone (the Headliner line in `EncoreBuilder.jsx` now names `bio`, `media`, `gallery` and `repertoire`), `vm.titleWordEms` = `antonEms(w, -0.005)` for the count too. Seeded heights 1067 / 1067 / 1529.1 against the frames' 1067 / 1067 / 1603 (the missing 74 is the pager's seat, which no template holds); with 120 songs the 390 list is 1028.8 against 1029 and the pager stands where the frame's does (1440 top 861.9 against 861.26, 44 squares on a 50 pitch; 390 the five middle buttons 43.6 wide).
- **Desktop and tablet centre their content in the 1067** (the media's 768 padded; this one does not), 390 pads 58: `minHeight` plus centring over a 96 / 77 / 58 padding.
- **The head is the count and an empty `Paragraph` the frame holds beside it, kept as a spacer**: the two-line `240 / SONGS` at 768 and 390 is that box squeezing the count (a flex shrink), not a forced break (the gallery's) and not a measure of the column (the bio's and media's). At 390 the spacer (141.02 x 128.69) is `flex: none` and the count takes the 172.97 left, which also seats it 11.09 down and makes the section 1603; at 768 the count's box is the frame's 254.55 and the search takes the rest (261.5); at 1440 the count (608.56) stands on one line. **The first cut got 768 wrong** (the search 287, the count 229): the frame's left column is not clamped at min-content, so `left` is `flex: none` and the count carries the measure (`hMax` 670 / 254.547). Chips, rows, search and pager agree to 0.5 at 1440 and 768 and to a tenth at 390 (the 1 px rules unscaled on the canvas).
- **Rows** are 65 / 62 / 60 contiguous at 1440 and 768, **28 apart at 390** (an 88 pitch, a rule on each); two columns 47.98 apart in a grid so their rules stay level, six down each, one of twelve at 390. Anton number (maroon) / title, Inter Tight artist flush right; both clip with an ellipsis and **an artist too long to stand beside its title drops under it** (JP-136).
- **Caps**: `heading` **8** (the seed, a floor: the probe reads 10 / 14 / 6, a seventh letter shrinking the count at 390), `songs.title` **17** (the seed's floor), `songs.artist` **29**, tags held by the shared rows (18 x 4). `--check` 0 failing, `--seeds` 0 over. Layouts 2-4 are Grunge's rows, written out (heading `[8, 38, 25, 20]`, title `[17, 26, 23, 26]`, artist `[29, 25, null, 42]`, `length` and `sets.mood` named). **`in` rows unchanged** (`reach.mjs 7`: `sets` and `songs.length`, layout 3 alone). Ledger: `INLINE_OFF` `Headliner.0.repertoire.songs.length`; `PHOTO_OFF` none.
- **Proofs.** `inline-probe --theme Headliner --layout 1 --cat repertoire --width 1440,768 --check`: PASS (25 slots hit, 0 WRONG, 0 UNLEDGERED, 0 dead click). `photo-probe --check`: PASS (the section reads no photograph). `focus-probe --prime --check`: 43 controls, 0 failing. Live (`&live=1`, 37 songs, three widths): page 2 starts at 13, page 4 holds the 37th, a chip filters and the head count follows (37 → 18 → 7 → 0), a search narrows, no sideways scroll, no console error. The two-server **digest** (HEAD `19489c2` in a worktree on 5176, confirmed by `grep -c HeadlinerRepertoire` = 0 against 4): **themes 0-5, 0 of 864 renders differ** after the two normalisations; **theme 6: 66 of 144 differ by at most 0.1 px (a 0.008 shift in one transform's translate), and the old tree against itself, rerun on the same server, differs in the same 66**, so it is run-to-run noise in Paperback's Figtree text widths, in categories this change does not touch (the footer, the form, the header); the positive control (theme 7, repertoire) differs at layout 1 at the three widths and nowhere else. `npm run build`: passes. **Root `index.html` is not refreshed.**
- **For the user (calls this section made on its own).** (1) **The search hint is at the global .45**, not the frame's `#757575` (about .59 of the ink on the cream); a `--ph` join is the user's call, as the form's and Pop's were. Alternative: `--ph: 0.6` on the box and the canvas span. (2) **The seeded twelve hold no pager seat** (every template's rule), so the 1440 and 768 content sits about 37 lower in the 1067 than the frame's and the 390 section is 74 shorter; alternative: hold the seat. (3) **A long title ellipsises in its row and a long artist drops under it** (the frame cannot say), and the count's measure at 768 is the frame's 254.55, so any count of two words stacks there. (4) **The count's spacer at 768 is derived** (147.72, from the frame's 430.27 column), the node itself not read.

**Section 6 — the map** (2026-11-23; frames desktop `1:4955`, tablet `1:15726`, mobile `1:16776`; code `0258854`, notes: the commit after it; the full record is `notes/map.md`, *Headliner · layout 1*).

- **An own tree, `HeadlinerMap`**, dispatched in `EventsMap`'s `if (s.limeTree)` after the seam, ahead of Paperback's, handed the same `g` (`shown`, `at0`, `lit`, `onPick`, `win`, `onPage`, `onStep`). The stage pattern: `HEADLINER_MAP`, the frame's px at all three widths in cqw, `vm.pad` = the surplus alone (the Headliner line in `EncoreBuilder.jsx` now names `bio`, `media`, `gallery`, `repertoire` and `map`), `vm.titleWordEms` = `antonEms(w, -0.005)` for the town too, fitted against the room the pill leaves (`free` 1209.77 / 583.46 / 342). Measured against the frames with a 12-gig list (so the pager and the pills stand): tablet and mobile agree within 0.3 px on the head, pill, card, rings box, foot, rows, tiles and pager; desktop within about 1 px, the canvas drawing its 1 px rules unscaled (0.2 px a rule over the frame's).
- **Nothing is centred in a taller box** (96 + 859.39 + 96; 77 + 1404.52 + 77; 58 + 1319.13 + 58), unlike the media's and repertoire's 1440. **The head has no empty sibling** (its two children are the hugging heading column and the pill), so nothing is a spacer, and **the pill stands at the head box's foot** (`flex-end`, 12 under the baseline: not on it), right at 1440 and 768, under the head at 390.
- **The card is a flat maroon rings art, not the real map**: `HeadlinerRings` (new, `headlinerArt.jsx`: session 0 wrote no rings) draws the frame's four rings and dot in fractions of the box's width (.2 / .4 / .6 / .8; the dashed two as 52 and 108 dashes of .43 of the pitch). At 1440 the card is **stretched to the list's height** by the grid and its picture box is the remainder; the svg fits whatever box it gets. The foot is the name beside the terms in a flex row, where the name shrinks to its min-content at 390 and the terms take two lines, as the frame's flex does.
- **The date tiles' fills are by the gig's place in the whole list**, orange, amber, then sand, repeating every five (`(at0 + i) % 5`); the frame's states do not decide it (row 1 `Sold out`, rows 2 to 5 `Tickets`, three fills among the four). **The pill is `Tickets` only on a row with an address** (JP-045) and the orange `Sold out` has no field, so the seeded rows draw neither; the `05 of 12` is derived. Rows pad 20.906 / 14 / 14 round the tile on 1 px rules, **106 being the floor of a row at 390**, where the frame's five are equal because its first venue wraps beside the Sold-out pill.
- **Caps** (`limits.mjs map --themes=7 --designs=0`, then `--check` and `--seeds`: 0 failing, 0 over): `heading` **11** (15 / 12 / 11 at the three widths), `listLabel` 38, `base` 31, `terms` 58, `gigs.venue` 24, `city` 72, `time` 27, `month` 11, `day` 5. Layouts 2-4 are Grunge's rows, written out (`heading` `[11, 20, 37, 25]`, `venue` `[24, 20, 41, 40]`, `base` `[31, null, 33]`). **`in` rows unchanged** (`reach.mjs 7`: `base` layouts 1 and 3, `terms` 1 and 2, `listLabel` 1). Ledgers: none (`INLINE_OFF` and `PHOTO_OFF` gain no row).
- **Proofs.** `inline-probe --theme Headliner --layout 1 --cat map --width 1440,768 --check`: PASS (29 slots hit, 0 WRONG, 0 NOT-RESTORED, 0 UNLEDGERED, 0 dead click, 2 unhit). `photo-probe --check`: PASS (the section reads no photograph). `focus-probe --prime --check`: 41 controls, 0 failing. Live (`&live=1`, 12 gigs, desktop and mobile, trusted clicks): page 2 holds gigs 6 to 10 and the count stays `05 of 12`, page 3 holds two (`02 of 12`), next at the last page and prev at the first stay put, the current square follows, the tiles keep their place in the whole list (O A S S S on page 2), a row lights and unlights, a lit row survives a page away and back, a row with an address is an `<a>`, no sideways scroll, no console error. States walked at three widths (a 13-letter town, a two-word town, an emptied head, foot, label and gig list, one gig, a 50-character venue with a long city and time, a long foot): no overflow, no error. The two-server **digest** (HEAD `0be8593` in a worktree on 5176, confirmed by `grep -c HeadlinerMap` = 0 against 4 on the working tree): **themes 0-5, 0 of 864 renders differ** after the two normalisations; **theme 6, 0 of 144** (the section-5 noise did not recur, and the old tree against its own rerun was 0 too); the positive control (theme 7, map) differs at layout 1 at the three widths and nowhere else. `npm run build`: passes. **Root `index.html` is not refreshed.**
- **For the user (calls this section made on its own).** (1) **The seeded five draw no pager** (every template's rule), so the section is 54 px shorter than the frame's at every width; alternative: hold the pager's seat. (2) **The tiles' fills repeat every five** by the whole-list index; the frame shows only five rows. (3) **A lit row is ringed 3 px inside in the pill's amber**; the frame draws none. (4) **`areaMin` 300 at 1440** keeps the card a picture when the list is short or empty; the frame has no such state. (5) **`city` 72 and `venue` 24 are alone-measured ceilings**: a venue past the 24 wraps at 390 beside a `Tickets` pill (the frame's first row does too), and a long city with a long time wraps the row's line and grows it. (6) **`Sold out` and `Tickets` are not drawn on the seeded rows**, as the earlier two templates' maps.

**Section 7 — the pricing** (2026-11-23; frames desktop `1:5067`, tablet `1:15838`, mobile `1:16888`; code `a9cf759`, notes: the commit after it; the full record is `notes/pricing.md`, *Headliner · layout 1*).

- **An own tree, `HeadlinerPricing`**, dispatched from `Pricing`'s `if (s.limeTree)` after the seam, ahead of Lattice's and Paperback's, handed `{ shown, active, pressChip }` (the published filter, `tierBookTo` and the `s.live` gate are the shared seam's). The stage pattern: `HEADLINER_PRICING`, the frame's px at all three widths in cqw, `vm.pad` = the surplus alone (the Headliner line in `EncoreBuilder.jsx` now names `bio`, `media`, `gallery`, `repertoire`, `map` and `pricing`), `vm.titleWordEms` = `antonEms(w, -0.005)` for the head, fitted against the room the tabs leave (`free` 1078.28 / 451.97 / 342). Measured against the frames with the seeds: 1555.94 / 2112.1 against 1556 / 2112, every box within a tenth at 768 and 390 and within the unscaled rules' 1.25 at 1440.
- **Nothing is centred in a taller box** (96 + 960.016 + 96; 77 + 1401.969 + 77; 58 + 1996.109 + 58). **The head's siblings are the left column and the tab list, no empty box**: the tabs stand at the head box's foot, right at 1440 and 768, under the heading at 390; the eyebrow's 31.75 stays as padding (no `kicker`). The head is the gallery's two lines at the middle word.
- **Every card is `min-height: 540` and its list is `flex: 1`**: that fixes the narrow frames (540 each) and makes the four-row first card stand the five-row cards' 221 at 1440, the frames' natural 582.219. The tablet's odd last card spans both columns (the frame's third card). **The fills follow the stored place (`t.n % 3`)**, not the lit tab or any state: the frame lights `Solo` and draws all three cards. **No Featured mark is drawn** (the frame has none on the maroon card).
- **`HeadlinerPill` takes `bg` and `ink`** (defaults: the orange it was), so the three buttons are the one component in three seats; the header, the menu and the media's Soundcloud button are unchanged (the theme-7 control digest differs at pricing layout 1 alone).
- **Seeds written for Headliner layout 1**: the head `Pick your night's set` (`PRICING_HEADING_HEADLINER`, in `sectionVm` and `fieldSeed`) and the button `Book this set` (`PRICING_ROW_CTA_PAPERBACK`, widened to Headliner in both). The unit and the small print are the shared seeds'.
- **Caps** (`limits.mjs pricing --themes=7 --designs=0`, then `--check` and `--seeds`: 0 failing, 0 over): `heading` **24**, `tiers.name` **32**, `price` **6**, `price.num` **6**, `tags` count **3**, `feats` item **40**, `unit` **16**, `rowCta` **39**; `sub` 67 is the shared `'*'` row. Layouts 2-4 are Grunge's rows, written out. **`in` rows unchanged** (`reach.mjs 7`: `featsLabel` layouts 2 and 3, `intro` and `offer` layout 3, `rowCta` layouts 1, 3 and 4). Ledgers: none (`INLINE_OFF` and `PHOTO_OFF` gain no row).
- **Proofs.** `inline-probe --theme Headliner --layout 1 --cat pricing --width 1440,768 --check`: PASS (30 slots hit, 0 WRONG, 0 NOT-RESTORED, 0 UNLEDGERED, 0 dead click, 6 derived tags ledgered by the shared row, 17 unhit). `photo-probe --check`: PASS (the section reads no photograph). `focus-probe --prime --check`: 36 controls, 0 failing, both widths. Live (`&live=1`, desktop): Solo filters to two cards and lights `#1E1E1E` with sand type, a second press restores three, Band filters to the maroon and teal (the fills hold), all Book buttons link `#form`. States walked: an emptied and a whitespace-only head (the tabs keep their seat), a package with no features, five packages (the fifth spans at 768), a lone package (spans both columns, no tab row), a long name beside the unit (the unit no longer breaks: `/EVEN T` was found and fixed), a long wrapping feature, a prose price; no horizontal overflow at 390. The two-server **digest** (HEAD `9559e83` in a worktree on 5176, confirmed by `grep -c HeadlinerPricing` = 0 against 4): **themes 0-5, 0 of 864 renders differ** after the two normalisations; **theme 6, 0 of 144**; the positive control (theme 7, every category) differs at pricing layout 1 at the three widths and nowhere else. `npm run build`: passes. **Root `index.html` is not refreshed.**
- **For the user (calls this section made on its own).** (1) **No tab is lit at rest** (JP-089): the frame lights `Solo` and still draws all three cards, so a lit tab would mislead; alternative: light the first tab. (2) **The fills follow the card's place in the stored list**, orange / maroon / teal repeating every three, and **no Featured mark is drawn**; alternative: fix the maroon on the Featured-ticked package. (3) **The seeded head is the frame's `Pick your night's set`** and the button `Book this set`, where every other template's pricing head is `Choose the set that's right for your night`; the unit prints `/EVENT` (the frame `/ EVENT`) and the small print keeps the seed's Oxford comma (`date, location, and length`). (4) **A package with no features keeps its list's foot rule** (the frame always draws the list). (5) **The tags' count cap is the seed's 3**, not the probe's 1: the chip row is the union of every package's tags and wraps before any one package's count does.

**Section 8 — the calendar** (2026-11-24; frames desktop `1:5205`, tablet `1:15976`, mobile `1:17026`; code `8841896`, notes: the commit after it; the full record is `notes/calendar.md`, *Headliner · layout 1*).

- **An own tree, `HeadlinerCalendar`**, dispatched from `Calendar` after its hooks and seam, in the same `if (s.limeTree && (s.lattice || s.paperback || s.headliner))` as Lattice's and Paperback's, handed `g = { month, cur, line, step, pick }`. The stage pattern: `HEADLINER_CAL`, the frame's px at all three widths in cqw, `vm.pad` = the surplus alone (the Headliner line in `EncoreBuilder.jsx` now names `bio`, `media`, `gallery`, `repertoire`, `map`, `pricing` and `calendar`), `vm.titleWordEms` = the widest of the head's two lines (`antonEms(l, -0.005)`). Heights 858.64 (the 1440 frame, 1 px rules unscaled) / 1044.22 / 1026.8 against the frames' 858.52 / 1044.33 / 1026.9.
- **A flat cream card on the amber band, which is the section's own seat**, so the root paints the band and **`vm.pageBg` / `cardOnPage` are not wanted**. Nothing is centred in a taller box (96 + card + 96; 77; 58). **The head has no empty sibling** (the panel's flow is the disc row, the in-flow head and the arrow row), and **the narrow frames draw it 109.25 / 115.59 below its flow box over the arrow row**, where the arrow is turned -90.
- **The wave field is the hero's dataset** (`HeadlinerWaveField`, new in `headlinerArt.jsx`; proved equal to 0.03 px over 420 points, so no second pasted set); `HeadlinerWaves` is untouched. The `KM` disc is the numeral's second seat: `vm.initials`, `badgeMode` ignored.
- **The month is fitted** (`calMonths` `ems` = `antonEms(label, -0.005)`; June 2025 sets the frame's 224.8 / 180.7 / 148.6, SEPTEMBER 2025 shrinks to 30.8 px at 390; all 24 months walked at three widths, no overlap, no sideways scroll). The head row keeps the frame's height, so a shrunk month does not move the grid.
- **Seeds written for Headliner**: the head `Pick a date.` (`CAL_HEADING_HEADLINER`, in `sectionVm` and `fieldSeed`), the button `Continue` (`CAL_CTA_LATTICE`, widened to Headliner in both). `heading` reads layouts 1-4, `cta` layouts 1 and 4, `image` layout 4 alone (hints updated); `INLINE_OFF` `Headliner.0.calendar.prompt`.
- **Caps** (`limits.mjs calendar --themes=7 --designs=0`, then `--check` and `--seeds`: 0 failing, 0 over): `heading` **14**, `time` **10**, `prompt` **29**, `cta` measured 37 and **held to 12**. Layouts 2-4 are Grunge's rows, written out. `limits.mjs` gained `FLOOR_AT['calendar.heading'].Headliner = [0]` (a fitted head shrinks to 75 % before it counts). **`in` rows** (`reach.mjs 7`): `cta` layouts 1, 3 and 4, `heading` 1-4, `image` 4, `open`, `prompt` and `time` as the families'.
- **Proofs.** `inline-probe --theme Headliner --layout 1 --cat calendar --width 1440,768 --check`: PASS (3 slots hit, 0 WRONG, 0 UNLEDGERED, 0 dead click, 1 ledgered). `photo-probe --check`: PASS (the section reads no photograph). `focus-probe --prime --check`: PASS (5 controls per width, 0 failing, 1 accepted). Live (`&live=1`): arrows, picking and the foot walked as in `notes/calendar.md`; the Continue pill links `#form`. The two-server **digest** (HEAD `161e33f` in a worktree on 5177, confirmed by `grep -c HeadlinerCalendar` = 0 against 5 on the working tree): **themes 0-5 and 7 differ at theme 7's calendar layouts 1 and 3 (arch 0 and 2) at the three widths alone, 6 of 1008; theme 6 is 0 of 144**. `npm run build` passes.
- **For the user (calls this section made on its own).** (1) **`cta` is capped at 12, not the measured 37**, so the 390 foot's line keeps its room (Lattice's and Paperback's call); alternative: 37. (2) **`focus-probe.mjs` gained an `ACCEPTED` table** for one row: the undrawn `prompt` opens with `Pick a date`, the head's words, so its focus box falls on the head; alternative: seed the prompt differently. (3) **The 768 foot's line stands in a 175.891 measure**, the floor at which the frame's three-line break holds; a wider one pulls `at` up a line. (4) **A six-row month grows the narrow frames by 54** (the frame draws five rows); desktop does not, since the panel is the taller half. (5) **The frame's leaked 1 px right border on the month half is kept at all three widths** (at 768 and 390 it is the desktop divider leaking, as Lattice's was), and **an absent grid cell draws no rule**. (6) **The `KM` disc ignores `badgeMode`** (the calendar has no badge field); it always prints the initials.

**Section 9 — the form** (2026-11-24; frames desktop `1:5385`, tablet `1:16159`, mobile `1:17207`; code `6033bd6`, notes: the commit after it; the full record is `notes/form.md`, *Headliner — layout 1*).

- **An own tree, `HeadlinerForm`**, dispatched from `EnquiryForm` after the seam (`s.v0 && s.limeTree && s.headliner`, ahead of Paperback's), handed the same `g` as Lattice's and Paperback's (`at`, `setAt`, `msg`, `setMessage`, `ti`, `setType`, `showTypes`, `errs`, `msgBad`, `sent`, `setSent`, `Pill`, `pillLink`, `onSubmit`, `cp`, `pid`). The stage pattern: `HEADLINER_FORM`, the frame's px at all three widths in cqw, `vm.pad` = the surplus alone (the Headliner line in `EncoreBuilder.jsx` now names `bio`, `media`, `gallery`, `repertoire`, `map`, `pricing`, `calendar` and `form`), `vm.titleWordEms` = `antonEms(w, -0.005)` for the form's head, fitted against `room` (393.344 / 655.766 / 302). Heights 713.9 / 1066.0 / 1308.9 against the frames' 714.05 / 1066.11 / 1309.13; every box within 0.5 (the canvas draws 1 px rules unscaled).
- **One flat square card on the cream page, which is the section's own seat**, so the root paints the page and `vm.pageBg` / `cardOnPage` are not wanted; nothing is centred in a taller box. **At 1440 the panel is stretched to the form half and its list is foot-anchored** (`margin-top: auto` over a 26 floor: the frame's `List:align`); at 768 and 390 the panel is its own height. **The head wraps by measure** (the last word overhangs the content box by about 11 at 1440, so the h2 sets `overflow-wrap: normal` against the section's `anywhere`: the first cut broke `UNFORGETTABLE.` into a fourth line).
- **`HeadlinerPill` took `as` / `tagProps` / `style`** (defaults unchanged; the theme-7 control digest differs at the form alone) so the submit is the seam's own `<a href="mailto:">`, refusing `role="button"` or inert span in the pill's box. **A refused box is the 1 px ring plus a 1 px inset in the panel's maroon** (no palette has a red; maroon is the template's darkest red and reads on cream), the prompt line in the same maroon. The sent state swaps the form half alone and holds its height (`sentH`).
- **Caps** (`limits.mjs form --themes=7 --designs=0`, then `--check` and `--seeds`: 0 failing, 0 over): `heading` **36** (the seed, a floor: the probe reads 31 at 1440, where a fourth line grows the card), `fields.label` 48, `fields.placeholder` 39, `typeLabel` and `messageLabel` 48, `message` 41, `button` 39, `promises[]` 39 (9 rows), `types` 8 x 15, identity `title` 33 and `kicker` 40. Layouts 2-4 are Grunge's rows, written out. **`in` rows unchanged** (`reach.mjs 7`). `FIELDS.form.image`'s hint is an object (the photograph is square). Ledgers: none.
- **Proofs.** `inline-probe --theme Headliner --layout 1 --cat form --width 1440,768 --check`: PASS (21 slots hit, 0 WRONG, 0 NOT-RESTORED, 0 UNLEDGERED, 0 dead click, 5 unhit: the name, the role and three numerals). `photo-probe` `--check`, `--blank`, `--drop`: PASS (1 slot, the avatar). `focus-probe --prime --check`: PASS (27 controls, 0 failing, both widths). Live (`&live=1`, three widths): a refused send rings the two empty boxes in maroon, sets `aria-invalid`, shows the prompt and focuses Name; a filled form builds `mailto:bookings@kaimercer.co.uk?subject=Party enquiry` with the typed values; the sent state holds the section's height (585.08 against 585.02 at 1440) and *Write another* keeps the values; no console error. States walked at three widths (an emptied head, promises, chip row and all three, a head of 32-36 characters that sets four lines at 1440, a 37-letter word that shrinks the type, five fields, a long promise, eight chips): no overflow, no error. The two-server **digest** (HEAD `191b403` in a worktree on 5177, confirmed by `grep -c HeadlinerForm` = 0 against 4): **themes 0-5 and 7, 3 of 1008 differ, theme 7's form layout 1 at the three widths and nowhere else; theme 6, 0 of 144.** `npm run build`: passes. **Root `index.html` is not refreshed.**
- **For the user (calls this section made on its own).** (1) **The placeholders draw at the global .45**, not the frame's `#757575` (about .59 of the ink on the cream); a `--ph` join is the user's call, as the repertoire's was. Alternative: `--ph: 0.6` on the boxes and the canvas span. (2) **The placeholders print as seeded** (`dd / mm / yyyy`, `approx.`) where the frame types `DD / MM / YYYY` and `Approx.` (Lattice's call). (3) **A refused box is maroon**, a call: no palette has a red. (4) **`heading` is capped at the seed's 36**, not the probe's 31: a head of 32 to 36 characters sets a fourth line at 1440 and the card grows by one line (the panel and the half together). (5) **The role line prints the header's kicker** (`DJ · Live Act`), where the frame types `DJ · LIVE BAND`: the artist's copy. (6) **The refusal prompt grows the card** by its own line under the button (as every template's), where the frame draws none.

**Section 1 left for later**: the header's other three cards (layouts 2–4) are still the placeholders; the setup modal's cards 2–4 and
the sidebar's layout picker show them as they are.

### Conventions section 10 (the testimonials) inherits

- **`HeadlinerForm` is the ninth stage** (after the hero's, the bio's, the media's, the gallery's, the repertoire's, the map's, the pricing's and the calendar's): a `containerType: inline-size` root with `overflow: hidden`, `u(v)` in cqw, vertical insets in a wrapper, `vm.pad = '0px <surplus>'` (the Headliner line in `EncoreBuilder.jsx` now names `bio`, `media`, `gallery`, `repertoire`, `map`, `pricing`, `calendar` and `form`; **add the testimonials**) and `vm.titleWordEms` extended on its line **only if the quote is fitted** (the calendar's rule reads the widest *line*; the form's the widest word). The testimonials' frame is **orange (Scheme 5, `#F85E34`, the section's own ground)**: `1:5460` · `1:16233` · `1:17282` (730 tall at every width). Read whether the frame centres its content in a 730 box (the media's and repertoire's 1440 did; the bio's, gallery's, map's, pricing's, calendar's and form's did not), and read every sibling of the quote in the metadata (the `REVIEWED 6 DAYS AGO` line and the two pills are removed or seated by the standing rules: a script eyebrow is drawn only where a seeded field is its seat).
- **The square arrow buttons are the last readers of four local shapes**: the media's `square()` (44, outlined or orange, a 14 x 11 arrow at stroke 2), the gallery's (46, filled, 16 x 14 at 2.4), the repertoire's and map's pagers (44 numbered or arrowed squares) and the calendar's (44 outlined, 16 x 14 at 2.4). Lift a shared helper only if the testimonials' pair really matches one.
- **`HeadlinerPill` takes `bg`, `ink`, `as`, `tagProps` and `style`** now: the testimonials' two pills (`HANNAH L.` maroon, `PRIVATE HOST` black) are *outlined or filled pills* and probably not this box (it is a 46-tall square); read them before reusing it. **The maroon quote mark** is art: `headlinerArt.jsx` has no quote glyph, so this section writes one (Anton `“` at 220 / 136 / 88 may be enough: check the frame's node before drawing a path).
- **Inks** the form named: cream `s.onScheme[2].bg` `#F8F2E7`, sand `#EEE3D1` `s.onScheme[1].bg`, orange `#F85E34` `s.onScheme[1].activeBg`, maroon `#760000` `s.onScheme[3].bg`, amber `#F8A351` `s.onScheme[3].activeBg`, black `#020202` `s.activeFg`, the outline `#1E1E1E` `s.onScheme[2].text1`. Under the orange seat (Scheme 5: accent amber, `text/2` `#020202` in the table above) `s.text1` / `s.activeBg` are the seat's own, not these: read a node on another ground through `s.onScheme[n]`, and re-read the seat's keys off the frame (the calendar's amber seat made `s.text1` `#020202`).
- **A body that flows beside a stretched panel**: the form's maroon panel is stretched to its sand half by the grid and foot-anchors its list with `margin-top: auto`; the testimonials' blocks are centred, so this is only for the footer.
- **Probe recipe as in section 9**: `reach.mjs 7` in the background first (wait on its PID with `until ! kill -0 <pid>`; about 5 minutes), `limits.mjs testimonials --themes=7 --designs=0` beside it (**write the cap rows only after `reach.mjs` ends**, since the rows are `src/` edits), then `--check` and `--seeds`; the three probes with `--cat testimonials --width 1440,768`; the live walk (`&live=1`: the arrows page the same `cur`); the two-server digest on a **fresh port** (5177 worked: confirm `grep -c HeadlinerTestimonials` = 0 on the old tree; `git worktree add <scratchpad>/wt <sha>`, `source/node_modules` symlinked, `vite <wt>/source --port 5177 --strictPort`, `OUT=<dir> BASE=http://localhost:5177 node scripts/digest.mjs before 0,1,2,3,4,5,7` and `after` on 5173 in the background, themes 0-5 and 7 in one run and 6 in a second, normalising with `sed -E 's/localhost:517[37]/localhost:5173/g; s/\?t=?[0-9]*//g'`); then `npm run build`. A fitted head needs `FLOOR_AT` in `limits.mjs` or its 768 reads low (the form's did not: its samples are short words). **The probe's `--why` prints nothing for a `samples` verdict**: re-render the three samples at the failing length by hand (`&noclamp=1&cj=`) to read the reason.

### Conventions section 9 (the form) inherits

- **`HeadlinerCalendar` is the eighth stage** (after the hero's, the bio's, the media's, the gallery's, the repertoire's, the map's and the pricing's): a `containerType: inline-size` root with `overflow: hidden`, `u(v)` in cqw, vertical insets in a child, `vm.pad = '0px <surplus>'` (the Headliner line in `EncoreBuilder.jsx` now names `bio`, `media`, `gallery`, `repertoire`, `map`, `pricing` and `calendar`; **add the form**) and `vm.titleWordEms` extended on its line only if the form's head is fitted. The form's frame is a **cream page (Scheme 2) with one card**: `1:5385` · `1:16159` · `1:17207` (714 / 1066 / 1309 tall). Read whether the frame centres its content in a taller box (the calendar's did not), and read every sibling of the head in the metadata.
- **A card on a band was the calendar's shape**: the band was the section's own seat, so no `cardOnPage` was wanted. The form's page is cream and its card has a maroon context panel and a sand field half, so read whether the root's seat (`SCHEMES_OF.Headliner`) is the page's colour and the card's two halves nested `s.onScheme[n]` reads.
- **`HeadlinerWaveField`** (`headlinerArt.jsx`) takes `w`, `h`, `sw`, `ink`, `opacity` and draws the hero's dataset in any box; the form's maroon panel, if it has a field, reads it rather than a new set. The avatar / `KAI MERCER` / `DJ · LIVE BAND` lines are the identity's (`vm.initials`, `vm.brand`, `vm.roleLine`).
- **`HeadlinerPill` takes `bg` and `ink`** (the calendar's black Continue and the pricing's three Book buttons are seats of it); the form's submit is the next reader. The form's submit is an `<a href="mailto:">`, **never a `<form>`** (notes/form.md): the seam's `vm.formMailto` / `vm.formCheck` closures are the only function-valued keys.
- **The pill tabs** (the pricing's) are local to `HeadlinerPricing`; the form's `EVENT TYPE` pills are the next reader: lift a helper only if they match. **The outlined squares** (the calendar's 44 arrows, the map's and repertoire's pager) are four local shapes; the testimonials' arrow buttons (section 10) are the last reader.
- **Inks** the calendar named: cream `s.onScheme[2].bg` `#F8F2E7`, sand `#EEE3D1` `s.onScheme[1].bg`, orange `#F85E34` `s.onScheme[1].activeBg`, maroon `#760000` `s.onScheme[3].bg`, black `#020202` `s.activeFg`, the outline `#1E1E1E` `s.onScheme[2].text1`, the weekday ink `s.onScheme[2].text3`; the hairline on cream `HL_GAL_HAIR`. **Under the amber seat `s.text1` is `#020202`, not `#1E1E1E`**, so a node on another scheme reads `s.onScheme[n]`.
- **Probe recipe as in section 8**: `reach.mjs 7` in the background first (wait on its PID with `until ! kill -0 <pid>`; about 5 minutes), `limits.mjs form --themes=7 --designs=0` beside it (**write the cap rows only after `reach.mjs` ends**), then `--check` and `--seeds`; the three probes with `--cat form --width 1440,768` (**a field the page does not draw whose first words are a sibling's fails `focus-probe` as WRONG-NODE**: the new `ACCEPTED` table in `focus-probe.mjs` takes a row, with the reason); a fitted head needs `FLOOR_AT` in `limits.mjs` or its 768 reads low; the live walk (`&live=1`); the two-server digest on a **fresh port** (5175 and 5176 were stale servers on the working tree this time; 5177 worked, confirmed by `grep -c HeadlinerForm` = 0 on the old tree), themes 0-5 and 7 in one run and 6 in a second, normalising the port and `?t=` stamps (`sed -E 's/localhost:5177/localhost:5173/g; s/\?t=?[0-9]*//g'`); then `npm run build`.

### Conventions section 8 (the calendar) inherits

- **`HeadlinerPricing` is the seventh stage** (after the hero's, the bio's, the media's, the gallery's, the repertoire's and the map's): a `containerType: inline-size` root with `overflow: hidden`, `u(v)` in cqw, vertical insets in a child, `vm.pad = '0px <surplus>'` (the Headliner line in `EncoreBuilder.jsx` now names `bio`, `media`, `gallery`, `repertoire`, `map` and `pricing`; **add the calendar**) and `vm.titleWordEms` extended on the line above it only if the calendar's head (`PICK A DATE.`, 150 px orange Anton, in the maroon panel) is fitted. The calendar's frame is **amber (Scheme 4, `#F8A351`) with one card on the band**: `1:5205` · `1:15976` · `1:17026` (859 / 1044 / 1027 tall). The card is a cream half beside a maroon wavy-line half with a ringed `KM` disc and an eye, under a cream foot bar: **the page is the band's amber and the card is a scheme seat** (`vm.pageBg`, Paperback's `cardOnPage`); read whether the frame centres its card in a taller box (the media's and repertoire's 1440 did; the pricing's, map's, bio's and gallery's did not).
- **`HeadlinerPill` takes `bg` and `ink`** now (defaults the orange): the foot bar's black `CONTINUE →` is one more seat of it. Its arrow is stroke 2.4 in the ink, its label Anton 16 at .02em, its padding `0 18` and its gap 14.
- **The pill tabs** (44-tall outlined pills on a 6 gap, Anton 16, padding 22, the lit one `#1E1E1E` with sand type) are local to `HeadlinerPricing`; the form's `EVENT TYPE` pills (section 9) are the next reader: lift a helper only if they match.
- **The ringed numeral's other seat** is the calendar's `KM` disc (the header's `ringed numeral` svg is a viewBox-is-the-disc, so the builder's seal-box rule applies): `HeadlinerWaves` and `HeadlinerRings` are in `headlinerArt.jsx`, the wavy-line field's calendar variant is this section's to write.
- **Inks** the pricing named: the hairline on a maroon, teal or ink ground `HL_HAIR` `rgba(238,227,209,.22)`, on a sand or orange ground `HL_GAL_HAIR` `rgba(30,30,30,.18)`; `s.text1` `#1E1E1E` for outlines and the small print, `s.activeFg` `#020202` for the heads and the orange card's ink, sand `#EEE3D1` `s.onScheme[1].bg`, orange `#F85E34` `s.onScheme[1].activeBg`, maroon `s.onScheme[3].bg`, teal `s.onScheme[6].bg`, the rows' `#f4f4f4` `HL_MEDIA_LIT`. **The serif is `s.serif` at weight 300** (Fraunces Headliner), size 22 / 22 / 20 and lh 1.06 for a line and 1.15 for a wrapping blurb; letter-spacing -0.015em.
- **Probe recipe as in section 5 and 6**: `reach.mjs 7` in the background first (wait on its PID with `until ! kill -0 <pid>`; it ran about 5 minutes), `limits.mjs calendar --themes=7 --designs=0` (it can run beside `reach.mjs`, as it needs no edit; **write the cap rows only after `reach.mjs` ends**, since the rows are `src/` edits), then `--check` and `--seeds`; the three probes with `--cat calendar --width 1440,768`; the section's live walk (`&live=1`, the harness's `&cj=` payload through `location.href` in an evaluate keeps the tool echo short); the two-server digest on a fresh port (5176 worked again: confirm with `grep -c HeadlinerCalendar`, the worktree `git worktree add <scratchpad>/wt2 <sha>` with `source/node_modules` symlinked and `vite <root>/source --port 5176 --strictPort`), themes 0-5 and 7 in one run (1008 renders: the same run is the theme-7 control over every category) and theme 6 in a second; **theme 6 was exact (0 of 144)** this time and in section 6. Remove the worktree afterwards (a stale one from another session stands in `git worktree list`: leave it).

### Conventions section 7 (pricing) inherits

- **`HeadlinerMap` is the sixth stage** (after the hero's, the bio's, the media's, the gallery's and the repertoire's): a `containerType: inline-size` root with `overflow: hidden`, `u(v)` in cqw, vertical insets in a child, `vm.pad = '0px <surplus>'` (the Headliner line in `EncoreBuilder.jsx` now names `bio`, `media`, `gallery`, `repertoire` and `map`; **add the pricing**) and `vm.titleWordEms` extended on the line above it. The pricing's frame is **sand (Scheme 1, the theme's own)**: `1:5067` · `1:15838` · `1:16888` (1152 / 1556 / 2112 tall). Read whether the frame centres its content in a taller box (the media's and repertoire's 1440 did; the map's, bio's and gallery's did not).
- **Read the head's siblings in the metadata before calling a break forced or a measure** (the repertoire's empty `Paragraph` decided its break; the map's head had none). The pricing's head is a two-line `PICK YOUR NIGHT'S SET` and a pill toggle: check what stands beside each.
- **Colours by position are the section's own call**: the map's tiles are `(at0 + i) % 5` over the whole list so a page turn does not recolour; the pricing's three cards are orange, maroon, teal and the middle one is the frame's featured plan, so read whether a fill follows the card's place in the stored list or its state before drawing it.
- **Inks** the map named: sand `#EEE3D1` is `s.onScheme[1].bg`, orange `#F85E34` `s.onScheme[1].activeBg`, amber `#F8A351` `s.onScheme[3].activeBg`, maroon `#760000` `s.onScheme[3].bg`, black `#020202` `s.activeFg`; the hairline `HL_HAIR` is `rgba(238,227,209,.22)` on teal and maroon (sand grounds use `HL_BIO_HAIR` / `HL_GAL_HAIR`, `rgba(30,30,30,.18)`); the sub-line ink is `HL_MEDIA_LIT` `#f4f4f4` at .85.
- **The square pager is a fourth shape**: 44 squares on a 6 gap with the frame's 16 x 14 line arrows (stroke 2.4), prev outlined, the current page and next filled orange, space-between; `HeadlinerMap`'s `square()` / `arrow()` are local, as the repertoire's are. The testimonials' arrow buttons (section 10) are the last reader; lift a shared helper only if they really match one of the four.
- **The rings are in `headlinerArt.jsx`** (`HeadlinerRings`); the calendar's `KM` disc (section 8) is the ringed numeral's other seat, still unwritten there.
- **Probe recipe as in section 5**, with the map's findings: `reach.mjs 7` in the background first (wait on its PID, not `pgrep -f`), `limits.mjs <cat> --themes=7 --designs=0` then `--check` and `--seeds`, the three probes with `--cat pricing --width 1440,768`, the section's live walk (`&live=1`), then the two-server digest on a fresh port (5176 worked, confirmed by `grep -c HeadlinerPricing` = 0 on it; a stale worktree from another session stands in `git worktree list`, leave it): **theme 6 was exact this time (0 of 144), where section 5 saw 0.1 px noise**, so diff the old tree against its own rerun only if theme 6 differs. A measuring script that loads the harness with a `&cj=` payload should divide the canvas by `stageW / frameW` (1180 / 1440 at desktop).

### Conventions section 6 (the map) inherits

- **`HeadlinerRepertoire` is the fifth stage** (after the hero's, the bio's, the media's and the gallery's): a `containerType: inline-size` root with `overflow: hidden`, `u(v)` in cqw, vertical insets in a child, `vm.pad = '0px <surplus>'` (the Headliner line in `EncoreBuilder.jsx` now names `bio`, `media`, `gallery` and `repertoire`; **add the map**) and `vm.titleWordEms` extended on the line above it. The map's frame is **teal (Scheme 6, `#3B758B`)**: `1:4955` · `1:15726` · `1:16776` (1051 / 1559 / 1435 tall). Read whether it centres its content in a taller box (the media's and repertoire's 1440 did, the repertoire's 768 too; the bio's and gallery's did not).
- **A flex row beside a head can leave an empty box**: the repertoire's count sits beside an empty `Paragraph` (an import artefact) whose width and height decide the frame's break and the 390 head's height. **Read every sibling of the head in the metadata before calling a break "forced" or "a measure"** (a `get_design_context` shows the box as a childless `<div>`), and reproduce it as a spacer when it moves the head. The map's head has a pill (`120 MILE RADIUS`) at its baseline right: check what stands beside `MANCHESTER`.
- **A flex-shrink that clamps a column is not always the frame's**: measure the left column's real width at 768 against the frame before trusting a model; the repertoire's first cut (`left` at its min-content) was 25 px off, fixed by giving the head its explicit measure.
- **Inks** the repertoire named: the hairline `rgba(30,30,30,.18)` (`HL_GAL_HAIR`, shared with the gallery) on the cream, `s.text1` `#1E1E1E` for outlines and the artist, `s.activeFg` `#020202` for the count and titles, `s.text3` `#760000` for the numbers, sand `#EEE3D1` (`s.onScheme[1].bg`) for type on a filled `#1E1E1E`; trust a design context's fallback literals over `get_variable_defs`, which answers `sem/bg` as the orange here.
- **The square pager** (44 outlined squares, the current one filled, the 16 x 14 line arrows at stroke 2.4) is the gallery's glyph in a third shape: `HeadlinerRepertoire`'s `square()` is local; the testimonials' arrow buttons (section 10) are the next reader.
- **A 1 px rule is unscaled on the canvas**, so a desktop box reads 0.2 per rule over the frame's at 1440 (a 65 row is 65.2); measure in frame px by dividing by the stage's scale.
- **Probe recipe as in section 5**: `reach.mjs 7` in the background first, `limits.mjs <cat> --themes=7 --designs=0`, then `--check` and `--seeds`; the three probes with `--cat map --width 1440,768`; the two-server digest on a fresh port (5176 worked); **theme 6 shows run-to-run noise of up to 0.1 px (66 of 144), so compare it with a tolerance, and confirm the noise by diffing the old tree against its own rerun**. The harness's `&cj=` URL must stay under about 8 KB (a 15 KB one is refused): 120 short songs work, 240 do not.

### Conventions section 5 (the repertoire) inherits

- **`HeadlinerGallery` is the fourth stage** (after the hero's, the bio's and the media's): a `containerType: inline-size` root with `overflow: hidden`, `u(v)` in cqw, vertical insets in a child, `vm.pad = '0px <surplus>'` (the Headliner line in `EncoreBuilder.jsx` now names `bio`, `media` and `gallery`; **add the repertoire**) and `vm.titleWordEms` extended on the line above it. The repertoire's frame is **cream (Scheme 2, `#F8F2E7`)**: `1:4830` · `1:15602` · `1:16651` (1067 / 1067 / 1603 tall). Read whether the frame wraps its content or centres it in a taller box (the media's 1440 did; the gallery's did not), and whether the head is one measure-broken line (`240 SONGS`, the bio's and media's rule) or a forced break (the gallery's two lines).
- **A forced head break is a `<br>` after a space**, never two blocks, so the node's text is the field's own and the inline probe still matches it; no measure could reproduce a break between two words whose joint width is narrower than the second line's (check by measuring each candidate line in Anton at the frame's size, `limits.mjs` reads the rest).
- **Square arrow buttons, a fourth and fifth copy are coming** (the repertoire's pager, the testimonials' edge buttons): the media's `square()` (44, outlined or orange, a 14 x 11 line arrow at stroke 2) and the gallery's (46, filled, a 16 x 14 arrow at stroke 2.4 inside the frame's own box) are both local; the pager's numbered squares are a third shape, so lift a shared helper only if the repertoire's and the testimonials' really match one of the two.
- **Inks** the gallery named: the hairline `rgba(30,30,30,.18)` on the sand and cream grounds (`HL_GAL_HAIR`), `s.text1` `#1E1E1E` for an outline, `s.activeFg` `#020202` for the head and the black arrows, `s.ac` `#F85E34` for the open mark; teal is `s.onScheme[6].bg`, cream `s.onScheme[2].bg`.
- **Photography:** the repertoire reads no photograph (Paperback's note); the gallery's slot is settled (`HEADLINER_PHOTOS.gallery[1]`).
- **Probe recipe as in section 3**, with these in order: `limits.mjs repertoire --themes=7 --designs=0`, then `--check` and `--seeds`; `reach.mjs 7` in the background first (no edits to `src/` or `scripts/` while it runs; **wait on its PID with `until ! kill -0 <pid>`, not `pgrep -f`, which matches the waiting shell**); the section's three probes with `--cat repertoire --width 1440,768`; then the two-server digest (a worktree from HEAD on a fresh port, 5176 worked again, confirmed by `grep -c HeadlinerRepertoire` = 0 on it, themes 0-5 then 6 as two runs, a theme-7 control).

### Conventions section 4 (the gallery) inherits

- **`HeadlinerMedia` is the third stage** (after the hero's and the bio's): a `containerType: inline-size` root, `overflow: hidden`, `u(v)` in cqw, vertical insets in a child, `vm.pad = '0px <surplus>'` (the Headliner line in `EncoreBuilder.jsx` names `bio` and `media`; **add the gallery**), `vm.titleWordEms` extended in the line above it. The gallery's frame is **sand (Scheme 1, the theme's own)**: `1:4766` · `1:15538` · `1:16587` (849 / 1386 / 943 tall). Read whether the frame centres its content in a taller box, as the media's 1440 did (`minHeight` + centring).
- **Square arrow buttons** (the viewer's black and orange pair) are 44 squares outlined or filled: the media's `square()` helper is local to `HeadlinerMedia`; lift it if the gallery, the repertoire's pager and the testimonials want it rather than copying a fourth time. The line arrow is `M0 5.5H13M8 0L14 5.5L8 11` at stroke 2 in a 14 x 11 box, the play triangle `M0 0L10 6L0 12V0Z`; the numeric helpers in `headlinerArt.jsx` take px, not `u()` strings, so draw glyphs inline.
- **Ink values** this section named as literals: cream `rgba(238,227,209,.22)` hairline (`HL_HAIR`), `.72` (`HL_MEDIA_DIM`) and `#f4f4f4` (`HL_MEDIA_LIT`); the cream `#EEE3D1` itself is `s.chips[3].fg` under the maroon scheme and the orange `#F85E34` `s.onScheme[1].activeBg`.
- **Photography:** the media's player now draws `HEADLINER_TRACK_ART[0]` = the cover; the gallery's slot is still section 4's to settle (`HEADLINER_PHOTOS.gallery[1]` = `headlinerViewer`, Paperback's shape).

### Conventions section 3 (the media) inherits

- **`HEADLINER_BIO` is the second stage after the hero's** and the shape for a section: a `containerType: inline-size` root with `overflow: hidden`, `u(v)` in cqw, vertical insets as the root's child padding, `vm.pad = '0px <surplus>'` in `EncoreBuilder.jsx` (the Headliner line there names `bio` alone; add the media's). The media's frame is **maroon (Scheme 3, the section's own ground)**, `1:4650` · `1:15421` · `1:16471` (1057 / 1219 / 1251 tall).
- **A head turned over a picture is a transform, not `writing-mode`**; the inline editor, the photo probe's hit-test and the focus box all handled it with no ledger row. The media's 155.52 / 72 / 62 head is horizontal.
- `vm.titleWordEms` for a Headliner section is `antonEms(w, -0.005)` (`EncoreBuilder.jsx`, next to the Lattice and Paperback lines); `limits.mjs`' `FLOOR_AT` takes a `Headliner: [0]` for a head allowed the 75 % floor.
- **Probe recipe**: run the section's probes with `--cat <cat> --width 1440,768` (each `--check`; `--blank` and `--drop` for the photo probe), `reach.mjs 7` in the background first (no edits to `src/` or `scripts/` while it runs), then the two-server digest on a **fresh port** (5175 was a stale worktree server from an earlier session; 5176 worked), confirmed by `curl :PORT/src/builder/EncoreSection.jsx | grep -c <a symbol only the new tree has>` returning 0 on the old tree.

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
