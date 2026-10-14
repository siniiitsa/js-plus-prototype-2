# The gallery — working notes

Moved word for word out of `CLAUDE.md`'s *Intentional limits — not bugs* on 2026-09-30, so it
loads only when a session works on it. "Above" and "below" may point into `CLAUDE.md` or
another `notes/` file.

- **The gallery browses, in the published tab only, and its three social rows leave the page.**
  Thumbnails are clickable, the rail's arrows step and wrap, "Back to beginning" (`backLabel`)
  rewinds, and the tile counter and viewer follow. `pick` starts at **-1** for the same reason `cur` does: nothing
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
  the ref's React 19 cleanup (under Lime, Grunge, Editorial and Pop alike its scrim is the page's
  darkest ink at .94 and its controls a light key on it — Lime's and Grunge's pale `s.tx`, under
  Editorial `#141414` and the taupe seat's paper `s.ac`, since its `s.tx` is ink, and under Pop
  `#000000` and the lime seat's pink `s.ac`, since its violet `s.tx` reads at 3:1 on the scrim —
  the only thing about the viewer that moves; no frame draws it, so each palette's reading of it
  is that template's own call). Pop's layout-3 tiles are ringed 5px INSIDE in the sheet's own lime
  (`s.onScheme[1].stroke2`), on the twins' overlay, so the ring hides nothing that leaks past
  it: the photograph is clipped 2px inside the tile, or its anti-aliased edge showed as a dark
  arc outside each round corner. An empty slot's initials there are the seat's black `text/3`
  on the olive `s.box3` well (7.5:1, where the twins' `s.tx` is violet at 2.2:1). **Layout 4 browses through the same `pick` for
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
  top anchor, the frame's strip being Retro's placeholders). Pop widens it a fourth time, on its
  pink seat: the spotlight is Lime's well with no brackets and no padding, so the photograph is
  the whole card, radius 50 (30 at 390), in a 5px lime `s.ac` ring, centred on the frame's own
  slot 3 and top-anchored on the others (layout 2's Pop hero rule); the thumbs are lime-ringed
  stadiums on blue wells, 4px (`s.inactiveLine`) and 8 on `active` (`s.ac`) at 1440 and 768 and 4
  on every 390 tile, through `u()`; the discs are `s.onScheme[4]`'s `#1044C7` squares at radius 10
  with yellow arrows, and the 390 pills radius 60 with teal ones and no shadow. Under Pop the
  photograph and its well are clipped 2px inside every ring, the spotlight's and each thumb's:
  a lime ring on the pink sheet hides the photograph's anti-aliased edge no better than layout
  3's lime-on-lime did, so the corner's outer pixel read darker than the clean pink-to-lime
  blend. Two stickers ride on the sheet, which clips them: the smiley sun behind the head, which
  never reaches it (JP-128, user call, 2026-10-09: at 768 and on a phone the head fits and wraps in
  a measure that ends where the frame's own mixed-case head ink ends, 552.5 / 285.24 in the head
  column, the sun's ink less the frame's 6.94 / 13.21; so the seed reads SNAPS FROM THE / NIGHT at
  768, the root ~45 taller than the frame's 751, and SNAPS FROM / THE NIGHT at 390), and the
  asterisk over the spotlight's lower-left corner at 768 and 390, anchored off the sheet's foot.
  Its
  **390 master runs its strip off its own page** (six fixed 121px tiles in a 370 frame, so three
  and a sliver show and the one its spotlight is on does not), so there the three visible tiles are
  a **sliding window** on layout 1's formula, `from = clamp(active - 2, 0, 4)` — not live-gated, so
  the canvas and the published first paint agree on slots 1–3. It draws no source rows either: the
  Figma wrapper carries layout 1's four as a `hidden` frame.
- **Layout 1's labels are the artist's** (JP-120 (gallery), user call, 2026-10-08), in both
  bodies, each seeded with the frame's word and uncased, so the seeded page did not move:
  - `kicker`, *Media* (`vm.galKicker`), which layout 4's eyebrow prints too, the same word;
  - `railLabel`, *Gallery* (`vm.galRailLabel`), the credit's second line under the name at every
    width, as well as layout 2's 768 head row;
  - `backLabel`, *Back to beginning* (`vm.galBackLabel`), the rewind;
  - `sourceLabel`, *Gallery* (`vm.gallerySources[0].label`, seeded off `GALLERY_SOURCES[0].l`),
    the open source row, which prints its label at desktop alone in both bodies: the narrow rows
    are icon-only tiles.

  An emptied kicker or credit line is not drawn. An emptied back link or row label reads its seed
  again (`venueCta`'s rule), since the link is a control and the row always stands. Typed, each
  wraps (`whiteSpace: 'normal'`, `overflowWrap: 'anywhere'`, `minWidth: 0`) where the seed's
  `nowrap` would run it off a 390 page. The Lime-tree capsule's row label keeps its ellipsis,
  since the capsule is a fixed height; Retro's row grows. The services' names (*YouTube*,
  *Instagram*, *TikTok*), the counter and Retro's rail wordmark *Gallery* stay literals.
- **Layout 1's head row wraps** (JP-113, 2026-10-08, both bodies, JP-120 (form)'s shape). The
  back link and the credit stand on one row, as every frame draws them, and the seed keeps it at
  every width. A name or credit line too long for the row wraps it: the credit drops under the
  back link, at the row's **start** (a lone item on a `space-between` line stands at its start,
  as Retro's row and the form's credit always did), shrinks to the measure (`flex: '0 1 auto'`,
  `minWidth: 0`), and its two lines wrap between words, right-aligned inside the credit, breaking
  inside a word only when that word alone outruns the measure (`overflowWrap: 'anywhere'`). It
  is a wrap, not a shrink: an 11px credit fitted to its widest word would be illegible. The back
  link keeps its line. Before, the Lime-tree row did not wrap, so a long name squeezed the back
  link a few glyphs wide (Pop's *Maximilian Featherstonehaugh Windsor* at 360: 15 lines, the page
  379), and Retro's credit column was `nowrap`.
- **A seed keeps its performer's head** (JP-129, JP-131, user call, 2026-10-12). Layout 3's
  tiles and layout 1's spotlight (both bodies, the Lime tree's polaroid and Retro's viewer) set
  `objectPosition: s.imagesPos[i]`, the slot's seed focus (`notes/photography.md`). The masters'
  FILL is centred, and a centred cover of the strip files into those wide boxes cut most heads
  off, at the eyes or above the chin. An upload has no entry and keeps the centred cover. The
  layout-2 and layout-4 strips keep their own `50% 0%` anchors, and the thumbnail strips under
  the spotlight are untouched. Lime's spotlight seed, `lime-gallery-4`, has no entry, so Lime's
  layout 1 does not move.
- **The labels and the heading have character caps** (character-limit pass, session 6,
  2026-10-13; `plans/char-limits.md`, *Session 6*). `chars` is on `kicker`, `heading`,
  `railLabel`, `backLabel` and `sourceLabel`. The three social addresses are urls and take none.
  - **Two caps are width-gated.** `railLabel` is layout 1's credit line at every width, but at
    layout 2 it prints at 768 alone, so layout 2's cap (64–70) is a tablet reading.
    `sourceLabel` prints at desktop alone, so its cap (37–58) is a 1440 reading. The narrow source
    rows are icon-only tiles.
  - **Retro's `sourceLabel` is desktop's 42.** The probe's own column reads 1, because the seed
    *Gallery* is also Retro's rail wordmark, a literal, which the seed's render seats at 768 and
    390, where the row prints no label.
  - **The back link is sized**, 34 (`max(2 × 17, 17 + 8)`), on the bio's Listen-link precedent:
    a text link that is a control, not a pill, and that reads its seed again when emptied. It
    measured 48–52 at 390. **This one is the user's to overrule.**
  - **Editorial's layout-1 credit line is 32**, against 49–55 elsewhere. At 390 the credit drops
    under the back link and runs into the tilted tape over the viewer.
  - **Pop's layout-4 kicker is 39**, against 51 on the twins. At 1440 its line runs into the
    smiley sun's spike.
  - **The heading's floors.** Editorial's and Pop's layout 1 hold *See us in action*'s 16. That
    is line packing (*KESTREL NIGHTS* cannot share a line), and Pop's head also meets the
    asterisk at 11. Editorial's layout 4 holds *Snaps from the night*'s 20, because the head is
    fitted to its widest word and any seven-letter word shrinks it (to 90% at 1440). A shrink
    floor for that fit, like the name's 75%, is the user's call. Editorial's layout 3 is 11, a
    one-line head that fills its taupe band.
  - **The name in layout 2's caption is clamped at 26–27** (`IDENTITY_CHARS.gallery.title`,
    lowered from session 1's 28–29). Its caption line ellipsizes past that at 390. A name of wide
    capitals ellipsizes sooner, and the caption's ellipsis is the fallback.
  - **Layout 1's head row was checked jointly**: back link, name and credit, each at its cap, on
    every template and width. The row wraps as JP-113 designed it, and nothing meets the tape,
    the viewer or the sun.
- **The YouTube row plays in the viewer** (user call, 2026-10-14, layout 1, every template). When
  the address names one video, short, live stream or playlist, `youtubeEmbed()` in `data.js`
  resolves it to a `youtube-nocookie.com/embed/…` address, which `sectionVm` hands down as
  `vm.gallerySources[1].embed`. On the published tab the row is then **not a link but the other
  stop of the viewer**: `src` (state beside `pick`) is 0 for the photographs and the row's index
  for the player, `open` is `src` only while that row has an `embed` (so the canvas is always 0,
  the Figma picture), and `srcRows` maps each row's `on` to `i === open`, so the open look
  (cross, tilt, fill) follows with no change to the row styling. Clicking the row again, the
  Gallery row, a thumbnail, an arrow or the back link returns to photographs (`go()` also resets
  `src`). The player replaces the photograph in its seat (the Lime tree's `well`, Retro's photo
  box) and, in the Lime tree, hides the arrow discs, which would sit over its controls; the
  thumbnail strip stays so the height does not move, and marks no photograph while the player is
  up (`lit`). An address that names no video (channel, @handle, bare site) has no `embed` and
  keeps the outbound link. Instagram and TikTok stay links. **The embed needs a Referer**: YouTube
  answers an embed with none with Error 153, and an `about:blank` popup sends none. So when the
  builder is served over http(s) the Publish tab opens on `public/published.html`, an empty
  same-origin page (`openPublished`), and is dressed once its navigation has committed. The
  double-clickable `file://` build has no such page and no origin, so a player there shows
  Error 153 whatever is done; the row is still live and still toggles.
