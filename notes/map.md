# The events map — working notes

Moved word for word out of `CLAUDE.md`'s *Intentional limits — not bugs* on 2026-09-30, so it
loads only when a session works on it. "Above" and "below" may point into `CLAUDE.md` or
another `notes/` file.

- **The events map pages and pairs, in the published tab only.** Layout 1's gig list is the
  artist's (`FIELDS.map.gigs`, above), so nothing about it can stay a fixed five. The pager is
  **derived** from the list the way the repertoire's is, `PAGES` is gone, and it is **not
  rendered at one page** — with the seeded five gigs the reference picture therefore carries no
  pager at all, which is the intended diff, not a regression. `perPage` is `vm.gigPage`, which is
  `PINS.length`: one page of gigs is exactly one set of distinct pin positions, so the two counts
  move together and a page never lights the same dot twice. Each gig carries the `pin` it lights
  (`PINS[i % PINS.length]`, paired in `sectionVm` — `EncoreSection` does no maths), and the tile
  draws a pin per gig **on the current page**, so the map follows the pager. `sel` starts at
  **-1** for the reason `cur` and `pick` do, and it indexes the **whole** list rather than the
  page, so paging away from a lit gig and back finds it lit. Clicking a row *or* its pin toggles
  the pairing — **click on both sides, never hover**: a phone has no hover, a `<div>` is not
  focusable, and a `mouseleave` reset would wipe a pin click the moment the pointer crossed a
  row. The row's tickets link does not fight that: it is `target="_blank"`, so one click both
  opens the tab and lights the pin. An **empty link leaves the row a picture** — the Soundcloud
  rule, not the gallery's hide-the-row rule, because a gig is a show the artist is playing, not
  a tile promising somewhere to go. The hue is computed over the whole list in `sectionVm`, or a
  gig would change colour as the pager turned. **Everything in this paragraph from "Clicking a
  row *or* its pin" on is layout 1's**: layout 2 is a featured gig beside the rest of the page,
  and it shares the seam whole rather than growing one — the same `page` over the same
  `gigPage`, so its map draws the same one-pin-per-gig-on-the-page and cannot collide either;
  the same `sel` over the whole list, except that there it names the gig the **panel features**
  rather than the row that lights, so it is **picked, not toggled** (a featured panel always
  holds one, and there is nothing to toggle back to). Its list is the page **minus** that gig,
  which is where the frame's own "Other upcoming · 4" comes from, and `feat` falls back to the
  page's first gig whenever `sel` is off-page — the canvas, the -1 start and a gig deleted under
  the visitor, all in one test. Its pager takes the wide `pageWindow` except at 390; under Lime,
  Grunge, Editorial and Pop it takes the compact one at every width, layout 1's map recipe, and their
  map draws the same screened raster on Retro's own dark plate (Editorial's and Pop's frames too:
  each viewport states no fill, and the render samples the plate). No Pop master draws a pager, so
  Pop's wears the repertoire's layout-2 dress (`frame.lime`, the one pager its page draws on
  Scheme 1) rather than `Pager`'s Pop arm, which is layout 1's Scheme 6 seat. **Layout 3 is layout 1's lit row and layout 2's featured panel
  in one control**: its rows light *and* the panel beside them features, on the same `sel`, so
  nothing is removed from the page the way layout 2 removes the featured gig from its list — and
  the lit row is **not drawn at one row**, which is exactly the 390 canvas, where a page is one
  gig. It is also the only layout with a **filter**: a chip row derived from the gigs' own
  cities (`vm.gigChips`, one chip per distinct city with its count, behind an All and not built
  below two cities), because the frame's own Upcoming/Past chips were a status nothing here could
  know when they were chosen (JP-047). The chips stay cities. Its date disc prints the frames'
  third line, the weekday (JP-069, user call, 2026-09-29), as `vm.gigs[].weekday`, derived and
  never typed. **Each row carries the frames' Upcoming / Past pill on the published tab alone**
  (JP-106, user call, 2026-10-06): `vm.gigs[].status`, `'upcoming' | 'past' | ''`, is
  `gigStatus()` in `data.js` off the same `gigStamp()` the weekday reads, against `today`, which
  `sectionVm` honours only when live (the calendar's rule). So the canvas, a picture with no date,
  draws no pill, and nor does a row whose date names no day (no year, a two-digit one, 31 Jun).
  A gig dated today is upcoming, today being the tab's UTC date, as the calendar's is. The two words are literals (`vm.gigStatus`, `cased()`), since
  no ticket asks for a field. The pill sits between the lines and *Tickets →* at the wide widths
  (stacked over it in a centred column on the 768 lit row, the master's own), and on the right
  of the 390 row's second line, which it now draws for an unlinked gig too: the 390 row is the
  frame's 123 where it was 84. Idle it is unfilled in the row's ink, ringed in its hairline; on
  the lit row it is the lit row turned round (Pop's rings in the lit row's own violet, since its
  lit row is a nested Scheme 3 pill on the Scheme 4 band). `GIGS` seeds `year: '2031'` (2025's calendar, so the
  discs keep the frames' weekdays), so every seeded row reads *Upcoming* until 2031. That filter is the one thing in this section that can break the
  one-pin-per-gig-on-a-page rule: it punches holes in the indices, so a filtered page of six or
  more can seat two gigs on the same `PINS[i % 5]`. Pairing the dot with the row's place on the
  *page* would close it and pin every gig to dot 0 at 390, where a page is one gig, so the edge
  is named rather than fixed. `perPage` is `gigPage` at both wide widths and **1** at 390, where
  the master draws one row over a two-arrow pager. A gig's `link` reaches all three: layout 1's
  whole row, layout 2's ↗ and Venue Link pill (beside which its Get Directions pill takes
  `vm.gigs[].directions`, a Google Maps route composed from the venue and city), layout 3's
  Tickets → column — and layout 3 drops
  the frame's second `↗` beside the venue, the same address marked twice (re-asked by JP-106 and
  kept, 2026-10-06: a recorded drop of its own, not JP-047's). An empty or refused
  `link` draws **no ↗ and no Tickets →, on either surface** (JP-045, user call, 2026-09-24):
  they read `vm.gigs[].url`, which is resolved on both, never `extLink()`, which is null on the
  whole canvas — so the canvas no longer promises a link the published row cannot keep. That is
  the gallery's hide-the-row rule for an affordance; layout 1's row and layout 4's ticker have
  no mark of their own and stay pictures. **Layouts 2 and 3
  share the frame's four claims as fields** (JP-040, PO call, 2026-09-21; layout 2's fit had
  dropped them and layout 3's QA re-seated them): `status` is the panel's tab and `updated` the
  note beside it, `rings` labels each ring's right edge at the midline (layout 4 too), and
  `expand` is the foot's link on the featured gig's `directions` — a span on the canvas and
  where there is no route, and in layout 2 the travel card's Get Directions a second time, as
  the frame offers both. Layout 2 drew `status` as the chip on every gig row and as the panel's tab,
  with the row's own hour moved into the meta line; **it draws neither any more** (user call,
  2026-10-14, every template): the rows end at the meta line (the hour stays there), the panel's
  head row is the `updated` note alone, and `status` is a layout-3 field again (`in: [2]`).
  Each drops when emptied. Layout 2's
  Lime block (Grunge's, Editorial's and Pop's too, widened) reads layout 3's `zoom`; Retro's layout 2 draws no zoom controls. **Layout 4 is the
  pager alone**: its whole gig list is one ticker (mustard under Retro, an olive `s.box1`
  capsule in a `s.stroke1` hairline under Lime, `#1A1A1A` in a 1px `#FF0000` ring with red
  numerals under Grunge, `#FFF9F2` dashed 7, 7 in terracotta at radius 10 under Editorial, whose
  card and stat cells are dashed too and whose numerals are terracotta, and Scheme 5's teal
  `box/1` in a 4px violet ring at radius 50 under Pop, its arrows the lines' violet where the
  frame binds yellow — a user call, 2026-10-08 — whose four stat cells stand on Schemes 6 / 2 /
  3 / 4 by index, each lettered in its own `text/2`) at a `perPage` of **1**, so `page` is
  the only list state it reads — `sel` reaches nothing there, the way the testimonials' `cur`
  reaches nothing in their wall; its other state is layout 3's `zoom`, on the same radial
  raster, ring labels and zoom controls (QA, 2026-09-15) — and the arrows **wrap** at both ends
  rather than clamping, the media player's rule. It is also the one layout that draws raw `vm.pins` *and* has a list to pair
  with: all five seats are on the map and the gig on show lights the one it was paired with, by
  identity (`vm.gigs[].pin` and `vm.pins` are the same five objects), so one gig to a page means
  the one-pin-per-gig rule holds by construction and the filter's edge above cannot arise. The
  dots carry no handler — five seats over any number of gigs means a dot does not name one — the
  ticker's own text block is the gig's `link` where it has one (layout 1's empty-link rule
  again), and at one gig the ticker stands **without its arrows** and is gone at none (JP-080).
  **The stat wall beside the map is the artist's** (JP-077 · JP-078 · JP-082, user call,
  2026-09-29, reversing the fit's two derivations the way JP-065 did at layout 3):
  `FIELDS.map.stats`, `{ label, value, sub }` per card, at most four and two to a row, seeded
  `MAP_STATS_4` with the frame's RADIUS 120 / CITIES 21 / GIGS YTD 48 / BASE Manchester, UK
  verbatim. Each part drops alone when emptied and a blank row is dropped, so no card is an
  empty box. `radius`, `base` and `terms` no longer reach layout 4 (and `base` reads layouts 1
  and 3 alone since JP-096, below). The map viewport has no height
  of its own and stretches to the wall at desktop, so there the wall's grid holds two rows at the
  cell's minimum whatever it lists. That is a floor on the grid, not on the viewport: the
  seeded wall renders under the frame's 555 × 0.82, so a viewport floor lifted every seeded page.
  **A card's value is fitted to its widest word** under Lime, Grunge, Editorial and Pop (JP-110,
  user call, 2026-10-06; Pop since its layout-4 map, 2026-10-08, the gate `vm.limeTree`):
  `vm.mapStats[].wordEms` is `navFace` over the value, per row (the quotes'
  `wordEms`), the cell is an `inline-size` container, and the size is
  `faced(min(token, 100cqi / wordEms))`, so a city wraps between words and never inside one.
  There is no floor (the user's call): *Wolverhampton* sets 12.5 in Editorial's 119 cell at 390.
  `overflowWrap: 'anywhere'` stays as the last resort. Retro's half (Retro alone now) keeps the
  flat numeral, and Gloock's and Titan's seeds set *MANCHESTER, / UK* where their 390 frames
  break MANCHEST / ER. Its section stands on the
  page ground, so the root's `darkMap` flag stays layout 1's.
- **Layout 1's two labels are the artist's** (JP-090, user call, 2026-09-30), on every template,
  since Retro's body prints them as the `s.limeTree` block does (Retro's frame `964:58581`,
  Editorial's `964:58617`), and Pop goes through that block since its layout-1 pass (`964:58629`). The eyebrow over the heading, "Shows/coverage", is
  **`kicker`'s layout-1 seed**: the field reached layout 3's "Gigs & travel" alone (JP-071), and
  now `in: [0, 2]`, its absent key resolved by `mapKickerSeed(d)` in `data.js`, which `sectionVm`
  and `EditPanel`'s chain both call (`formBtnSeed()`'s shape; the chain's arm is gated on `map`,
  since the testimonials carry a `kicker` too). The label over the gig list is
  `FIELDS.map.listLabel`, *List label*, `in: [0]`, seeded "Upcoming gigs" (`vm.mapListLabel`); the
  `· N` count is the page's, and an emptied label takes the count with it (under Grunge the
  row's rule too). Both are uncased and both wrap, inside a word too, once typed longer than the
  seed: a long label ran up to 330px past a 390 page, and the gig label 60px past the Lime-tree
  panel at desktop. The label is printed as two text nodes, `"<label> · "` and the count, as the
  literal was: splitting the ` · ` into a third node moved its width by 0.1px under Lime and
  Grunge. *(Both keys reach layout 2 since JP-095 (b), below.)*
- **Layout 2's travel card and list are the artist's too** (JP-095 (b) · JP-096, user call,
  2026-10-01), on every template, both bodies.
  - **Two keys reach a third layout.** The eyebrow, *Travel radius*, is `kicker`'s layout-2 seed
    (`mapKickerSeed(d)`, now `in: [0, 1, 2]`). The list's *Other upcoming · N* is `listLabel`'s,
    through `mapListLabelSeed(d)`, `in: [0, 1]`. The chain's `listLabel` arm is gated on `map`,
    since media carries a `listLabel` too. An emptied list label takes the count with it, as at
    layout 1, and it prints as the same two text nodes.
  - **Nine keys are new, all `in: [1]`.** Over and under the two values sit `homeLabel` *Based in*,
    `homeCaption` *Home location*, `venueLabel` *Willing to travel to* and `venueCaption` *Venue
    location*. The stat row's labels are `radiusLabel`, `travelTimeLabel` and `feeLabel`; an
    emptied one leaves its value standing alone, and the cell still goes with its value. Each is
    the frame's own text (`964:64613`'s layer names), uncased, and not drawn when emptied.
  - **The pills.** `venueCta` *Venue Link* and `routeCta` *Get Directions* read their seed again
    when emptied (`messageLabel`'s rule), since a pill always stands. Get Directions wraps freely.
    Venue Link wraps only once typed longer than its seed (`vm.mapVenueCtaWraps`): Lime's 768 frame
    overlaps the seed's text with the disc, the fit runs the one-line label 1px into the gap, and a
    label free to wrap breaks there onto two lines. Under Editorial both pills are
    `min-width: fit-content` rather than `auto` over `nowrap`, so the 768 row still wraps them
    whole while a long label takes the row and wraps inside it.
  - **The home value is the header's `location`**, the frame's own *Manchester, UK*. It reverses
    Retro's fit, which dropped the frame's *Based in* label because `base`'s copy said it already
    (`../plans/retro/layout-2.md:608`). So `base` reads layouts 1 and 3 alone, and its hint sends
    the artist to the header. An emptied Location drops the home column and the connector with
    it (the bio ID card's `since` rule), and leaves the venue column alone in the row.
  - **Named, not fixed.**
    - A long single-word Location keeps `base`'s old style, so it does not break. At 390 a
      53-character word runs past its 119 column, over the connector and the venue column, on
      every template, and under Editorial 136px past the section (clipped, no page scroll).
      Breaking inside the word would split Editorial's seeded *MANCHESTER,* at 768, which already
      runs past its 105 column. The frame runs *Manchester, UK* past it too (129 in 105).
    - Lime's 13px body face wraps *Willing to travel to* onto two lines at 768.
    - Under Editorial and Pop the venue city keeps the frames' Body/MD, where Lime and Grunge
      normalise it to Display/List: both display faces break the uppercase *MANCHESTER* inside
      the word in the 768 column's 105. Both wrap the pill row there too, so Get Directions
      stands on its own line under Venue Link.
    - The unfiled seats on the tester's screenshot: the h2 (*Venue Distance*), the chip (*●
      Confirmed*, JP-060), the featured venue (the frame features its third gig) and *100 mi*
      (`MAP_RADIUS`; seeded *120 mi* since JP-124, below).
- **The coverage seeds per layout** (JP-105, user call, 2026-10-06). `radius` reads layouts 1–3.
  Its absent key resolves through `mapRadiusSeed(d)` in `data.js`, which `sectionVm` and
  `EditPanel`'s chain both call (`mapKickerSeed`'s shape; the chain's arm is gated on `map`).
  Layout 3's line under the map, `[base, "N pins", radius]` joined by ` · `, seeds its frames'
  *120 mi radius* (`MAP_RADIUS_3`), the outermost ring's. All twelve masters (Retro, Lime, Grunge
  and Editorial at 1440, 768 and 390) read "UK · 8 pins · 120 mi radius". Layout 2's Max travel
  seeds *120 mi* (`MAP_RADIUS_2`; JP-124, user call, 2026-10-09). Its frame's cell types *100
  mi* (`I986:17577;861:11188`), but its data bar and rings say 120, and so do the header's place
  card (`PLACE_BODY`), the line under the map (`MAP_TERMS`) and the form's third promise on the
  same page, so the 100 went to the designer. *12 mile radius* filled the 768 cell's third to
  4px of *~2 hrs*, and wrapped in Retro's narrower 88.66. Layout 1 keeps `MAP_RADIUS`, *12 mile
  radius*, since its frame prints *12 Mile Radius* beside its heading. A page shows the map at
  one layout, so a seeded page still claims one coverage. `base` keeps *Based in Manchester* at
  layout 3, where the frames print *UK* (Retro's fit seated it in this line,
  `../plans/retro/layout-3.md:959`). So the 768 line still wraps to two lines under every
  template, as it did before (the layout-3 fits' named diff, Retro's through Lime and Grunge).
- **Character caps** (`plans/char-limits.md`, *Session 8*, 2026-10-13; the user's calls of
  session 1, unchanged). Every text key has a `chars` spec, and both repeaters have `cols`. The
  decisions that are this section's own:
  - **A gig's city, time, month and day are one budget** wherever they share a line: the meta line
    (*city · time* at layouts 1 and 3, *city · MONTH · time* in layout 2's list), layout 2's
    when-chip and layout 4's ticker (*city · MON DD · time*). Their caps are a joint split, not
    each column read beside the others' seeds:
    - the date parts take a date's width: the month up to 9, the day up to 5;
    - the time takes up to 13 (*9pm till late*);
    - the city takes the rest, never under its floor of 13 (*Lake District*);
    - then the time, the month and the day give way.

    Layout 2's list line is full at the seeds at 768. So there the time is 5 (*22:00*), the month
    3–5 and the city 13–14. The user may trade that for decision 6's ellipsis. A cap change to
    any of the four is re-checked jointly (the session's `joint8.mjs`, every column at its cap at
    once).
  - **The venue has a line of its own** at every layout, so it is capped alone. At layout 2 the
    panel features row 0 and the list prints the others, so a probe of a gig column writes rows 0
    and 1 there (`rowsAt` in `scripts/limits.mjs`).
  - **The month and day are read as dates**, not prose: month names, and digit-led days.
    - Layout 1's stamp holds a 5-character month under Lime, Grunge and Editorial (*SEPT*, not
      *SEPTEMBER*). Retro's holds 7 and Pop's 9, and layout 3's disc 11–12.
    - A day longer than two digits prints, but `gigStamp` reads no weekday or status from it.
      The cap is fit, not validation, and `GigsField`'s layout-3 warning is what says so.
  - **`rings` is a ',' list of 3 at most**: the map slices its labels to its three rings. A ring
    label is a chip, capped at 13 (the sized rule).
  - **Venue Link stays at its seed's 10–11 under Retro, Lime and Grunge**, because the 768 pill
    wraps any longer label (`vm.mapVenueCtaWraps`, above). **The stat value is 14**: one line,
    as row 0's *120* is, floored at the seeded *Manchester, UK*, which already takes two lines at
    390.
  - **`GigsField`'s `pair()` rows are top-aligned**: a counter under the month (always showing at
    layout 2, where *Jul* is 3 / 3) stretched the uncapped year box beside it. That is session
    5's `SongsField` fix.

## Inline editing (plans/inline-edit-all.md, Retro layout 2, 2026-10-21)

Layout 2's gig cells print in three shapes, declared in `INLINE_LINES` (`*.1.map.gigs.…`): rows 1–4 as one line,
`Manchester · Jul · 21:00` (city, month, time; the bare month and day nodes inside and beside it are still edited from
their own nodes), and the featured gig (row 0) as the travel card's chip `● Jul 12 · 22:00` (month, day, time), with its
city alone under the venue. **The city *Manchester* is printed by five different fields' nodes**: the heading (seeded as
the first gig's city), the travel card's *Willing to travel to* (the featured city), the featured panel (the same city),
and rows 1, 3 and 4. The page's text cannot settle that, so `inlineFieldAt` does: a slot whose line is drawn is *claimed*
(per field, as many rows as nodes print the line), the bare nodes belong to the fields left, and between a heading and
another field the largest type is the heading. `radius` (`120 mi`) and the outermost ring (`120mi`) differ only in the
space, so the copy as typed decides. `terms` (`… · 5 pins`) and `expand` (`Expand view→`) are `INLINE_PART` rows. The
list is rows 1–4 of the gigs, the featured gig is row 0.

## Inline editing (plans/inline-edit-all.md, Retro layout 3, 2026-10-22)

Layout 3's line under the map, `Based in Manchester · 5 pins · 120 mi radius`, is one node holding two slots: `base` and `radius` are `*.2.` part rows,
settled on the click (`5 pins` is derived and a `·` opens nothing). `expand` (`Expand view→`) is a part row too. The gig rows print `City · time` and
hit as pairs; the featured gig's chip is layout 2's. The city chips and *See all gigs* need no ledger row (derived, or the field `cta`).

## Inline editing (plans/inline-edit-all.md, Retro layout 4, 2026-10-22)

**`stats` has its first proof**: the wall's twelve cells (`label` / `value` / `sub` ×4) hit at both widths and Escape restores `c.stats`. **The ticker is one gig on one line** (`vm.gigs[].meta`, `Manchester · JUL 12 · 22:00`, the month upper-cased in the string, not by CSS) under `Next: <venue>` (page 0 alone, which the canvas always is). `INLINE_LINES`, per column and scoped `*.3.` (a single `map.gigs` row would hand the venue the same line), names that line and the shorter forms the page prints when a piece is emptied (no time, no city, date only, no date). The venue is an `INLINE_PART` row on `Next: …`. **No claim or rank was needed**: the line repeats no other field's copy (the stat's *Manchester, UK* is a different string and the heading is not a gig's city). Rows 1–4 are *paged* (the arrows are live-only). Known limit: an emptied month or day alone (the page prints `Manchester · JUL · 22:00`) matches no line and opens nothing; the panel is the way in. The textarea holds the stored `Jul` where the page draws `JUL`: the first slot whose node case differs from the stored copy by the markup, not CSS. The box lies on the glyphs and the sentinel lands.

## Inline editing (plans/inline-edit-all.md, Lime layout 4, 2026-10-22)

Pass 15's rows carry over unchanged (`INLINE_LINES` and the venue part row are `*.3.`): Lime's olive-capsule ticker prints the same two lines, and every column of the one-line gig opens, also with the time emptied. The stat cells are fitted per word (`wordEms`) and the Base value `Manchester, UK` wraps to two lines at 1440 (one at 768): a click on either word opens `map.stats[3].value` and the box covers both lines. No claim or rank was needed. Same known limit as Retro (an emptied month or day alone opens nothing; the stored `Jul` sits under the drawn `JUL`).
