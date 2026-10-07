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
  the frame offers both. Layout 2 alone also prints `status` as the chip on **every** gig row:
  one section-wide word, not a per-gig status (pricing's `unit` precedent), with the row's own
  hour, which held that seat, moved into the meta line. Each drops when emptied. Layout 2's
  Lime block (Grunge's, Editorial's and Pop's too, widened) reads layout 3's `zoom`; Retro's layout 2 draws no zoom controls. **Layout 4 is the
  pager alone**: its whole gig list is one ticker (mustard under Retro, an olive `s.box1`
  capsule in a `s.stroke1` hairline under Lime, `#1A1A1A` in a 1px `#FF0000` ring with red
  numerals under Grunge, `#FFF9F2` dashed 7, 7 in terracotta at radius 10 under Editorial, whose
  card and stat cells are dashed too and whose numerals are terracotta) at a `perPage` of **1**, so `page` is
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
  **A card's value is fitted to its widest word** under Lime, Grunge and Editorial (JP-110, user
  call, 2026-10-06): `vm.mapStats[].wordEms` is `navFace` over the value, per row (the quotes'
  `wordEms`), the cell is an `inline-size` container, and the size is
  `faced(min(token, 100cqi / wordEms))`, so a city wraps between words and never inside one.
  There is no floor (the user's call): *Wolverhampton* sets 12.5 in Editorial's 119 cell at 390.
  `overflowWrap: 'anywhere'` stays as the last resort. Retro's half (Retro, and Pop through it)
  keeps the flat numeral, and Gloock's seed sets *MANCHESTER, / UK* where its 390 frame breaks
  MANCHEST / ER. Its section stands on the
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
      (`MAP_RADIUS`).
- **The coverage seeds per layout** (JP-105, user call, 2026-10-06). `radius` reads layouts 1–3.
  Its absent key resolves through `mapRadiusSeed(d)` in `data.js`, which `sectionVm` and
  `EditPanel`'s chain both call (`mapKickerSeed`'s shape; the chain's arm is gated on `map`).
  Layout 3's line under the map, `[base, "N pins", radius]` joined by ` · `, seeds its frames'
  *120 mi radius* (`MAP_RADIUS_3`), the outermost ring's. All twelve masters (Retro, Lime, Grunge
  and Editorial at 1440, 768 and 390) read "UK · 8 pins · 120 mi radius". Layouts 1 and 2 keep
  `MAP_RADIUS`, *12 mile radius*: layout 1's frame prints *12 Mile Radius* beside its heading,
  and layout 2's *100 mi* is with the designer. A page shows the map at one layout, so a seeded
  page still claims one coverage. `base` keeps *Based in Manchester* at layout 3, where the frames
  print *UK* (Retro's fit seated it in this line, `../plans/retro/layout-3.md:959`). So the 768
  line still wraps to two lines under every template, as it did before (the layout-3 fits' named
  diff, Retro's through Lime and Grunge).
