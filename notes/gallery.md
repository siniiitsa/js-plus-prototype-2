# The gallery — working notes

Moved word for word out of `CLAUDE.md`'s *Intentional limits — not bugs* on 2026-09-30, so it
loads only when a session works on it. "Above" and "below" may point into `CLAUDE.md` or
another `notes/` file.

- **The gallery browses, in the published tab only, and its three social rows leave the page.**
  Thumbnails are clickable, the rail's arrows step and wrap, "Back to beginning" rewinds, and the
  tile counter and viewer follow. `pick` starts at **-1** for the same reason `cur` does: nothing
  chosen, so both sides open on `galActive()` and the published first paint is the canvas's
  picture by construction. All **seven slots** are navigable, not just the filled ones — an empty
  one shows in the viewer the placeholder it shows in the strip, so the count cannot shift under
  the visitor. Mobile draws four of the seven under Retro, Lime, Grunge and Pop (Editorial's 390 master draws all
  seven, smaller, so under Editorial the strip maps every slot and nothing slides), and that
  window **slides** once the visitor walks past the fourth (`from = clamp(active - 3, 0, 3)`), which leaves the first four anchored at 0 so
  the canvas's mobile picture is the Figma frame's, unchanged. The three social rows read
  `youtube` / `instagram` / `tiktok`, whose keys live on `GALLERY_SOURCES` — change the field list
  in `FIELDS.gallery`, change that array. The first row has no key: it *is* the strip. An
  **unfilled social row is not rendered at all when `s.live`** — an artist with no TikTok should
  not publish a tile promising one — which is where the gallery parts company with the Soundcloud
  button, still a picture when empty (that is the "Soundcloud rule" wherever this file says it —
  though under Lime the button it is named after no longer follows it: JP-034, in the media
  player's paragraph above). The **canvas keeps all four regardless**: it is the reference
  design, the three fields start empty, and a fresh page would otherwise open on a single tile with
  no clue the others are a field away. The filter carries the index, because `srcIcons` and the
  per-source colours are positional. And the mobile source row is **one line that runs off the
  right edge**, as every template's 390 frame draws it (JP-087, user call, 2026-10-01, reversing
  "wraps rather than clipping"). Four content-sized tiles come to 380–432px against the 370
  column (Grunge's to Retro's), and TikTok, the one off the edge, carries an address. So when
  `s.live` the row scrolls sideways (`overflowX: auto`, scrollbar hidden) and the visitor swipes
  to it. On the canvas it is `overflow: clip`, the frame's picture: `clip` is not a scroll
  container at all, where `hidden` still is one to script. It is the only scroll container in
  `EncoreSection`. The scroller (`srcScroll`, shared by both bodies) clips at its padding box, so
  it takes 10 above and below for Lime's 7 / 9 offset shadows and Retro's tilted open tile, and
  `s.padX` at the sides. Negative margins cancel that padding, so no tile moves and the run-off
  reaches the page's edge. With one or two addresses the published row fits and does not scroll.
  **Everything in this paragraph from "Mobile draws four" on is layout 1's**:
  layout 2 browses through the same `pick`, but it is a hero photograph beside a masonry of six
  and it draws **no source rows at all**, so the hide-the-empty-row rule and the four-tile mobile
  window are that layout's and not the section's. Its **tiles are fixed** (user call, 2026-09-15;
  they used to rotate through the seats, the media player's fan rule, and read as the thumbnails
  shuffling under the click): the rail is the six slots other than `galActive()`'s, counting on
  from the one after it and wrapping — the old rotation's order at rest, so the canvas is
  unchanged — six tiles at 1440 and 768, and ten at 390, where they loop — and a pick moves only
  the hero. **Six at 768 is a decision** (JP-098, user call, 2026-10-01): the master shows four,
  because its third tile in each column is a 1px leaked desktop height, and four would leave two
  slots unreachable there. **768 adds a head row over the tiles** that prints `railLabel`
  (*Gallery*, the frame's word, uncased; `in: [1]`, read at tablet alone). Emptied, the row goes
  and the band takes the column's 392. The heading is the caption pill's first line, over the
  artist's name, at every width: the row held it until JP-098. The frame's *View list* and ✕ are
  not drawn, because they are dead controls (kept, JP-098).
  The picked tile carries an inset accent ring, and clicking it again resets `pick` to -1, which
  is the only way back to the `galActive()` slot, since that one has no tile. No ring on the
  canvas or the published first paint, which therefore stay the Figma picture. Under Pop the
  ring is the hero's lime (`s.stroke2`), not `s.ac`. Pop's tiles are already edged 5px in pink,
  so a pink ring inside them read as no change. Pop's hero also anchors by slot: the
  `galActive()` slot is centred, as its frames' `FILL` of that photograph states, and a picked
  slot keeps the twins' top anchor, because centred, three of the seeds lose the singer's head
  at 1440;
  the three social addresses reach layout 1 only, which is `FIELDS.media.soundcloud`'s case three
  times over and is why their hints name a layout. **Layout 3 opens a fullscreen viewer on the
  same `pick`** (user call, 2026-09-15 — its frame draws a plain grid and nothing to open): -1 is
  closed and a slot index is open on it, so the canvas draws no overlay; only filled slots open
  and the arrows step through only those; the overlay is `position: fixed` inside the section,
  takes focus off a callback ref so Escape and ← / → reach its own `onKeyDown`, closes on any
  click that is not a control, and locks the popup's scroll while open — `overflow: hidden` on
  its `<html>` and `<body>` with the scrollbar gutter kept, set in that same ref and undone by
  the ref's React 19 cleanup (under Lime, Grunge and Editorial alike its scrim is the page ink at
  .94 and its controls pale — under Editorial `#141414` and the taupe seat's paper `s.ac`, since
  its `s.tx` is ink — the only thing about the viewer that moves; no frame draws it, so each
  palette's reading of it is that template's own call). **Layout 4 browses through the same `pick` for
  the fourth time** — a spotlight photograph beside a rail of all seven thumbnails, with two arrow
  discs under it that step and wrap on layout 1's own `go`. Under Retro it carries **no active
  mark**: its Figma frame rings all six of its thumbnails identically, and what names the chosen
  slot is the spotlight, which on the canvas is `galActive()`'s slot 3 — the frame's own fourth
  thumbnail. Lime's wide masters *do* mark it — the fourth thumbnail is ringed at 3px where the
  others are 1px, so under Lime the ring follows `active` on the wide rail (an inset-shadow
  overlay, not a border, so no photograph is inset) and is 4px on every 390 tile, not live-gated
  because the canvas draws the frame's own ringed fourth thumb. Grunge widens that block whole:
  its ring is black (Lime's own `s.bg`, so the 1 / 3 / 4 mechanism is unchanged), its discs are
  `#0E0E0E`, and its 390 pills are radius 5 with no shadow. Editorial widens it as well: its
  thumbs are square in a terracotta `s.ac` ring, 4px and 8 on `active` at 1440 and 768 and 4 on
  every 390 tile (Lime's mechanism at its own weights, scaled through `u()`); its discs and 390
  pills are square `s.onScheme[4]` buttons, `#BE6346` round ink arrows with no shadow; and its
  spotlight is a tilted print in a `#1D1D1D` mount under a drop shadow, a centred cover where
  the twins anchor it at the top, since the frame's node holds our own seed (the thumbs keep the
  top anchor, the frame's strip being Retro's placeholders). Its
  **390 master runs its strip off its own page** (six fixed 121px tiles in a 370 frame, so three
  and a sliver show and the one its spotlight is on does not), so there the three visible tiles are
  a **sliding window** on layout 1's formula, `from = clamp(active - 2, 0, 4)` — not live-gated, so
  the canvas and the published first paint agree on slots 1–3. It draws no source rows either: the
  Figma wrapper carries layout 1's four as a `hidden` frame.
