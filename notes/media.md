# The media player — working notes

Moved word for word out of `CLAUDE.md`'s *Intentional limits — not bugs* on 2026-09-30, so it
loads only when a session works on it. "Above" and "below" may point into `CLAUDE.md` or
another `notes/` file.

- **The media player plays, in the published tab only.** One `<audio>` element per section,
  rendered only when `s.live`; a click anywhere on a track card loads that track, and the
  transport is a real play/pause, previous and next, wrapping at both ends, with `ended`
  advancing. Three rules there: the source is assigned **imperatively** (`a.src = url; a.play()`),
  never as a `src` prop, or a re-render from `onTimeUpdate` would reload the file under the
  playhead — and Safari refuses to autoplay a freshly mounted element; `playing` mirrors the
  element's own `play`/`pause` events, not the click handlers, so a refused `play()` cannot leave
  the icon lying; and `cur` starts at **-1**, meaning nothing has been chosen, so nothing is
  marked as playing and the clock does not start — the card still names and shows track one,
  which is what the player is cued to. `FIELDS.media` therefore has **no now-playing track or
  sleeve field**: a second, separately editable copy of what the card shows could only
  contradict the list. Nor does `NOW_PLAYING`, which is only the canvas's mid-song clock: with
  **no tracks at all** the card names `vm.mediaEmpty` (the one "No tracks yet." the empty lists
  print too) and `sectionVm` stops the clock at 00:00 under an empty bar on both surfaces, since
  a mid-song clock with nothing cued is a lie. The transport stays wired but inert there —
  `goTo` returns on an empty list before its modulo. **The line under the title is the artist,
  `vm.nowPlaying.by`, at layouts 1, 3 and 4** (3 and 4 print the track's `rel` on a line of its
  own under it), **and at layout 2 the playing track's own `byline`** (JP-097, 2026-10-01, a fit
  slip of every template: each layout-2 frame types *Kai Mercer · Single*). `vm.tracks[].byline`
  is the artist and the track's `rel` on ` · `, the separator going with an empty `rel`, composed
  in `sectionVm`. The bar takes it off the track it names, the centre seat's on the canvas and
  `at`'s live, and `now.by` only with no track. `nowPlaying.by` is never composed with a release,
  which 3 and 4 would then print twice. Once the artist edits the list, `rel` is the row's whole
  subtitle, so the byline reads *Kai Mercer · Single · 4:55*; a separate release column would be
  a `TracksField` change. It ellipsises in its own box: the seed's *Single* fits every box but
  Retro's at 390 (97.5) and every box at 360, and the two longer releases ellipsise at every
  width, as those tracks' titles do. Do not mark the
  playing card by raising it out of the stack — the cards overlap by 18px at the foot and a raised
  one covers the *next* card's title; the Pause icon and the now-playing block are the whole cue.
  **Layout 2 plays through the same hooks**, and draws the one list twice: the fan and the
  numbered list beside it are both the whole of `s.tracks`, and **layout 3 is that numbered
  list under a bar-meter now-playing card** (its disc is the play/pause, its meter counts bars off
  `vm.contentW`), so `list` is `s.v0 || s.v1 || s.v2 || s.v3 ? s.tracks : s.tracks3` — every
  design plays the whole list, and `s.tracks3` (three) serves only the unreachable fallthrough,
  whose Next must not leave the page.
  **Layout 1's pill is per template, because the frames disagree** (JP-034, user call,
  2026-09-18): Retro's frame draws a Soundcloud pill, and so does Editorial's (`964:58614`), so under those
  two and Pop it is the `soundcloud` link and an empty address leaves it a picture; Lime's draws Book Now — and Grunge's,
  which shares Lime's block — so under those two the seat is `FIELDS.media.cta` — `vm.mediaCta`, uncased, on `vm.bookTo` with no
  self-exclusion since `media` is not in `CTA_TARGETS.book`, and an emptied label drops it, the
  footer pill's rule — and the Soundcloud pill stands beside it **only when filled**, in a
  wrapping row no master draws. `cta`'s `in` is `{ Lime: [0], Grunge: [0], '*': [] }`: the `'*'` row is what
  hides the field on the other templates (an empty row means no layout of that template reads
  the key), an uncovered template counting as read everywhere.
  Layout 2's fan is a **carousel**: the seats are fixed and symmetric about the middle, and the tracks
  rotate *through* them, wrapping, so the centre seat always holds the track the player is on.
  Do not centre the seats on `at` instead — `at` is 0 until a visitor picks, and the fan would
  open one-sided. Geometry and hue belong to the seat, not the track, or the composition would
  shuffle its colours on every pick; the centre is the accent and carries the Featured tab.
  Under Pop each seat is a **scheme** (`popCard(k)`, 5 / 4 / 2 / 3 / 6 from the left, the
  outermost repeating past five), and each list row is one by **index** (`popRow(i)`, 3 / 4 / 5 /
  7 / 8, cycling) — the row is the track's place in the list, which never rotates. **Layout 3's
  list is the same five pills on the same five schemes by index** (its own `popRow`, re-read off
  its masters, so layout 2's block is untouched), round the same `[1]`-ringed discs, under a
  Scheme 2 now-playing card that binds `box/1` `#D7FF23`, its disc the card's own fill so only the
  glyph shows. Each row is pinned at its master's division result (116.8 at 1440, 110.8 narrow,
  border-box), not the list's stated height as a minimum, so one track is one pill and more grow
  the list by the frame's pitch (`plans/pop/layout-3.md`, section 3). On
  the canvas the seats are unrotated (the Figma frame's picture) and the bar takes the **centre
  seat's** title and artwork rather than the shared now-playing block's, which names the cued
  first track — live the two are the same track by construction.
  **Layout 4 plays through the same hooks as well**: the sleeve is the track the player is on,
  and the grid beside it is one photographic tile per track with the tile at `at` carrying the
  same rust mark the sleeve's own border is. That mark is a **seat**, the fan's rule rather than
  `chosen`'s — `at` is 0 until the visitor picks, so the canvas draws the frame's own marked
  first tile by construction — and on the tile it is an **inset ring on the scrim**, not a
  border: `inset: 0` resolves against the padding box, so a border (even a transparent one on
  the unmarked tiles) would inset every photograph and widen the frame's own gutter. Under
  Lime the mark on both the sleeve and the tile is the frame's inset **glow** (a 34px `s.ac`
  inner shadow) rather than a ring, still a shadow on the scrim for the same reason; under
  Grunge it is a ring again, two reds on the same overlays — 1px of `s.ac` on the tile and 1px
  of `s.stroke2` on the sleeve; and under Editorial it is a paper ring, 3px on the tile and 5px
  round the sleeve, which is a **tilted print** there (Figma +2.33°) carrying layout 1's blush
  tape. Under Pop **no tile is marked** (user call, 2026-10-07): its frames ring no tile at any
  width, so `mark` is undefined and the sleeve — Lime's upright shape in a 5px violet
  `s.stroke1` ring — the now-playing title and Pause are the cue, layout 1's fan rule. It is also
  the one layout whose section paints the page's whole band — Retro's cream with a
  checkerboard strip at each end, Lime's olive `s.box1` with a lime arc seam at its head and a square foot (the
  frame's dark foot arc met the gallery's head arc as a lens; user call, 2026-09-18), Grunge's
  `#171716` with a red torn head and a black torn foot at 1440 and 768 and neither at 390,
  Editorial's taupe — its seat's `s.bg`, Scheme 2 — with no seam at all, Pop's lime — its seat's
  `s.bg`, Scheme 2 again — closed by a 10px violet rule inside its foot at 1440 and 768 and
  carrying a pink dot grid behind the sleeve (none at 390) — and the only media layout to draw
  those strips, arcs or tears.
- **Layout 2's fan chip and the counter's words are the artist's** (JP-095 (a), user call,
  2026-10-01, JP-071's label shape). `chipLabel` is the front card's `● Featured` (`in: [1]`,
  both bodies; the dot is the markup's). It wraps inside the card at its own inset from each edge,
  since the card clips. `countLabel` and `totalLabel` are the counter over the track list,
  "5 Featured / 5 Max" at layouts 2 and 3, and `countLabel` is layout 1's "5 / 5 Featured" as
  well (`in: [0, 1, 2]` and `[1, 2]`, measured) — on every template but Pop, whose layout-1 frame
  draws no counter, so its row is `{ Pop: [1, 2], '*': [0, 1, 2] }` (measured, 2026-10-02). The counts stay derived: "Max" is the track count
  again, not `TracksField`'s cap. An emptied word takes its count with it, and the ` / ` goes
  unless both words stand; with both emptied there is no counter, and the row stays, with its
  padding and Editorial's dash. `trackCount()` composes it in the four text nodes the literal
  made (a different split moves the shaping by 0.1px, JP-090). The counter keeps its line and its
  right-hand seat beside a wrapping `listLabel`, as the literal's `nowrap` did, and wraps only
  once it is wider than the row less the gap. Layout 1's keeps to half the desktop row, so the
  heading keeps its column.
- **Layout 2's 390 bar draws ♡ ↓ ⋯ and drops the sleeve and the clock** (JP-099, user call,
  2026-10-05, reversing the 2026-10-01 reply and Retro's first-pass override). Both bodies
  do this: the `s.limeTree` bar (Pop's too) and Retro's. The master seats the icons by squeezing
  sleeve, title and clock into 22.9, so it names no track. The page pays for the icons with the
  sleeve and its 12 gap instead. It keeps the override's padding (16, Retro 20) and its gaps of
  14, and draws the glyphs at 768's size (Retro's at its own 14). The Lime bar closes the
  glyphs' 12 gap to 11 at 390 (user call, same day), so Editorial's seeded SLOW BURN (112.6)
  stays whole. So the title box is 114.4 (Retro 97.5) at 390 and 414, and 84.4 (67.5) at 360.
  The glyphs are inert spans at every width. A title the box cuts ellipsises in it: the
  canvas's SLOW BURN under Pop, and the cued LATE LIGHTS under Editorial and Pop at 390 and
  under every template at 360.
- **Character caps** (session 3 of the character-limits pass, 2026-10-13;
  `plans/char-limits.md`, *Session 3*, and the per-width readout in
  `plans/char-limits/session-3-probe.md`). Every own text key has a `chars` row, and `tracks` has
  the first `cols` (`title`, `sub`). Three calls to keep:
  - **A track column's floor is its longest seeded row**, not row 0's: *Manchester at 3am* (17)
    and *Live at the Deaf Institute · 7:01* (33), strings the frames draw. Once the artist edits
    any row the seeded array is stored, and a cap under them would clamp the seeds and paint
    their counters red. So the title caps at 17 wherever the probe read less (layouts 2 and 4 on
    every template read 10–15), and `sub` is 33 everywhere. A title of that length behaves as the
    seeded *Manchester at 3am* already does. The fan clips it under the next card, the layout-4
    tiles and the layout-2 bar ellipsize it, and the layout-4 now-playing title takes a second
    line (Editorial's seed already does at 1440). The ellipsis is the fallback (decision 6).
    Looser layouts take their measure: Retro 25 and Lime / Grunge 19–21 at layout 3, Lime 40 and
    Grunge 27 at layout 1.
  - **The heading is 20, its seed, at most designs.** Its frame box is two lines at a fixed
    width. *FIVE WORTH / YOUR EAR.* fills it, and prose of 15 can take three lines when its first
    two words cannot share one (*KESTREL SOUND / B*, Editorial 390 and Pop 768). That is a
    line-packing bound, not the bio's widest-word one, and a length cap cannot do better.
  - **`countLabel` and `chipLabel` share the seed *Featured*.** The probe renames a sibling field
    whose seed prints the same string (`twinsOf()` in `scripts/limits.mjs`), or the reference
    seats both and the layout-2 counter reads 1.

## Inline editing (plans/inline-edit-all.md, Retro layout 2, 2026-10-21)

Layout 2 prints the list label, the fan's chip and the counter's words inside decoration: `● Popular`, `● Featured`,
`5 Featured / 5 Max`. `listLabel` and `totalLabel` are `INLINE_PART` rows (`*.1.media.…`, their words are unique on
the page); `countLabel` already was. **`chipLabel` and `countLabel` both read *Featured*** and sit in two nodes, so the chip
declares its line in `INLINE_LINES` (`'● {}'`): a node that prints exactly another field's line is not a peer of the
counter's words, and the counter's click settles on the words it is near. The fan is edited card by card: the topmost
card's title opens its own box, a card behind it opens by the part of its title still in view (the box is the title's
whole line and may run under the front card), and the box takes each card's tilt through `placeBox`. The list under it
prints every track again, so a title has two nodes for one slot (`here.length === 1`).
**`tracks.sub` is ledgered** (`Retro.1.media.tracks.sub`, a derived value): the seeded page prints the release and the
running time as two nodes (`rel`, `dur`), and the whole line only once the list is stored, when `rel` and `dur` both
become the row's subtitle. `INLINE_OFF` is state-blind, so the cell stays in the panel even then.

## Inline editing (plans/inline-edit-all.md, Lime layout 2, 2026-10-21)

The Retro layout-2 rows (`*.1.media.…`) carry over unchanged: the fan, the list rows, `chipLabel`, `listLabel`, `totalLabel` and
`countLabel` all hit on Lime's page. `tracks.sub` is ledgered again, `Lime.1.media.tracks.sub`, for the same seeded shape.

## Inline editing (plans/inline-edit-all.md, Grunge layout 2, 2026-10-22)

The `*.1.media.…` rows carry over: the fan (cards tilted about ±10.6° and ±5.3°, the box follows each card's `matrix()`), the list rows,
`chipLabel`, `listLabel`, `totalLabel` and `countLabel` all hit on Grunge's page. `tracks.sub` is ledgered again, `Grunge.1.media.tracks.sub`,
for the same seeded shape.

## Inline editing (plans/inline-edit-all.md, Editorial layout 2, 2026-10-22)

The `*.1.media.…` rows carry over: the fan (the same tilts, the box follows each card's `matrix()`), the list rows, `chipLabel`, `listLabel`,
`totalLabel` and `countLabel` all hit on Editorial's page; `tracks.sub` is ledgered again, `Editorial.1.media.tracks.sub`. **Gloock is wider than the
other faces, so the back card *Manchester at 3am* wraps to two lines and the middle of its first line lies under the front card's *Slow Burn***: a click
there opens *Slow Burn*, which is what is on top, and the probe counts that as a click under an overlay, not a WRONG (`plans/editorial/inline-layout-2.md`,
generic fix 2). The back card is reached by the words that show beside the front card, and the same slot by its list row.

## Inline editing (plans/inline-edit-all.md, Pop layout 2, 2026-10-22)

The `*.1.media.…` rows carry over: the fan, the list rows, `chipLabel`, `listLabel`, `totalLabel` and `countLabel` all hit on Pop's page, and
`tracks.sub` is ledgered again, `Pop.1.media.tracks.sub`. **The fan's cards overlap, and a click on a back card's visible glyphs used to open the card
behind it** (*Echo & The Floor* opened *Roomtone*, whose box is smaller and lies under the card in front): the stack rule skips a slot that something opaque
covers (`paintsOver` in `EncoreBuilder.jsx`, `plans/pop/inline-layout-2.md`, generic fix 1). Checked by clicking every visible character of the five
titles, which the probe's line-middle aim cannot do.

## Inline editing (plans/inline-edit-all.md, Retro layout 3, 2026-10-22)

Layout 3 is a numbered list, not a fan: no card overlaps another, and every visible character of every title opens its own track (a character sweep).
`listLabel` (`● Popular`) and `totalLabel` (`5 Featured / 5 Max`) are `*.2.` part rows; `tracks.sub` is ledgered again (`Retro.2.media.tracks.sub`: the release
and the running time are two nodes).

## Inline editing (plans/inline-edit-all.md, Lime layout 3, 2026-10-22)

`listLabel` and `totalLabel` are the `*.2.` part rows (Lime draws the `●` in its own span, so `Popular` is a bare node); `tracks.sub` is ledgered again (`Lime.2.media.tracks.sub`).
