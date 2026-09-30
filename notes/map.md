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
  Grunge and Editorial it takes the compact one at every width, layout 1's map recipe, and their
  map draws the same screened raster on Retro's own dark plate (Editorial's frame too: its
  viewport states no fill, and the render samples the plate). **Layout 3 is layout 1's lit row and layout 2's featured panel
  in one control**: its rows light *and* the panel beside them features, on the same `sel`, so
  nothing is removed from the page the way layout 2 removes the featured gig from its list — and
  the lit row is **not drawn at one row**, which is exactly the 390 canvas, where a page is one
  gig. It is also the only layout with a **filter**: a chip row derived from the gigs' own
  cities (`vm.gigChips`, one chip per distinct city with its count, behind an All and not built
  below two cities), because the frame's own Upcoming/Past chips are a status nothing here can
  know (a gig's `year`, below, would let the published tab derive it; named and out of scope).
  Its date disc prints the frames' third line, the weekday (JP-069, user call, 2026-09-29), as
  `vm.gigs[].weekday`, derived and never typed. That filter is the one thing in this section that can break the
  one-pin-per-gig-on-a-page rule: it punches holes in the indices, so a filtered page of six or
  more can seat two gigs on the same `PINS[i % 5]`. Pairing the dot with the row's place on the
  *page* would close it and pin every gig to dot 0 at 390, where a page is one gig, so the edge
  is named rather than fixed. `perPage` is `gigPage` at both wide widths and **1** at 390, where
  the master draws one row over a two-arrow pager. A gig's `link` reaches all three: layout 1's
  whole row, layout 2's ↗ and Venue Link pill (beside which its Get Directions pill takes
  `vm.gigs[].directions`, a Google Maps route composed from the venue and city), layout 3's
  Tickets → column — and layout 3 drops
  the frame's second `↗` beside the venue, the same address marked twice. An empty or refused
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
  Lime block (Grunge's and Editorial's too, widened) reads layout 3's `zoom`; Retro's layout 2 draws no zoom controls. **Layout 4 is the
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
  empty box. `radius`, `base` and `terms` reach layouts 1–3 alone. The map viewport has no height
  of its own and stretches to the wall at desktop, so there the wall's grid holds two rows at the
  cell's minimum whatever it lists. That is a floor on the grid, not on the viewport: the
  seeded wall renders under the frame's 555 × 0.82, so a viewport floor lifted every seeded page.
  Its section stands on the
  page ground, so the root's `darkMap` flag stays layout 1's.
