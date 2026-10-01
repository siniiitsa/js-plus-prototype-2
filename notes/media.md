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
  Retro's and Pop's at 390 (103.5 and 105.5), and the two longer releases ellipsise at every
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
  prints "Not shown in this template" on the other templates (`fieldNowhere()`: an empty row
  means no layout of that template reads the key, so the note does not promise one), an
  uncovered template being left unmarked.
  Layout 2's fan is a **carousel**: the seats are fixed and symmetric about the middle, and the tracks
  rotate *through* them, wrapping, so the centre seat always holds the track the player is on.
  Do not centre the seats on `at` instead — `at` is 0 until a visitor picks, and the fan would
  open one-sided. Geometry and hue belong to the seat, not the track, or the composition would
  shuffle its colours on every pick; the centre is the accent and carries the Featured tab. On
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
  tape. It is also
  the one layout whose section paints the page's whole band — Retro's cream with a
  checkerboard strip at each end, Lime's olive `s.box1` with a lime arc seam at its head and a square foot (the
  frame's dark foot arc met the gallery's head arc as a lens; user call, 2026-09-18), Grunge's
  `#171716` with a red torn head and a black torn foot at 1440 and 768 and neither at 390,
  Editorial's taupe — its seat's `s.bg`, Scheme 2 — with no seam at all — and the only one to
  draw those strips, arcs or tears.
- **Layout 2's fan chip and the counter's words are the artist's** (JP-095 (a), user call,
  2026-10-01, JP-071's label shape). `chipLabel` is the front card's `● Featured` (`in: [1]`,
  both bodies; the dot is the markup's). It wraps inside the card at its own inset from each edge,
  since the card clips. `countLabel` and `totalLabel` are the counter over the track list,
  "5 Featured / 5 Max" at layouts 2 and 3, and `countLabel` is layout 1's "5 / 5 Featured" as
  well (`in: [0, 1, 2]` and `[1, 2]`, measured). The counts stay derived: "Max" is the track count
  again, not `TracksField`'s cap. An emptied word takes its count with it, and the ` / ` goes
  unless both words stand; with both emptied there is no counter, and the row stays, with its
  padding and Editorial's dash. `trackCount()` composes it in the four text nodes the literal
  made (a different split moves the shaping by 0.1px, JP-090). The counter keeps its line and its
  right-hand seat beside a wrapping `listLabel`, as the literal's `nowrap` did, and wraps only
  once it is wider than the row less the gap. Layout 1's keeps to half the desktop row, so the
  heading keeps its column.
