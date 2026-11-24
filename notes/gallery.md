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
  - `kicker` (`vm.galKicker`), which layout 4's eyebrow prints too, the same word. **Seeded empty, so not drawn**
    (user call, 2026-11-11, reversing the frames' *Media*). Typing *Media* shows it like any word: a
    `legacyContent()` rule that read a stored `Media` as empty hid it and was removed (QA 1amvuf5yjyz, 2026-11-12);
  - `railLabel`, *Gallery* (`vm.galRailLabel`), layout 1's credit line at every width, as well as
    layout 2's 768 head row. **The artist's name that stood over it is gone** (QA 1amvuf5yjyz,
    user call, 2026-11-12), in both bodies, so the credit is this one line;
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
  every width. A credit line too long for the row wraps it (it once shared the credit with the artist's name): the credit drops under the
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
  - **Layout 1's head row was checked jointly**: back link and credit (and, before 2026-11-12, the name), each at its cap, on
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
- **The Photos field reorders** (user call, 2026-10-14). Each tile of `ImagesField` carries a grip
  (bottom-right, drawn from two photos on) that drags the photo to another cell, or moves it on
  ←/→ (one place) and ↑/↓ (a row, `PHOTO_COLS`). Pointer events on the grip, `SectionList`'s shape,
  so touch works in the mobile Edit drawer (`touchAction: 'none'` on the grip alone; the tile body
  still scrolls the panel and opens the editor on a click). **The DOM never reorders mid-drag**: a
  node moved by React's keyed reconcile would lose its pointer capture, so every tile is
  translated to the cell it will land in and `c.images` is written once, on drop. Cell boxes are
  read as `offsetLeft` / `offsetTop` in the grid's own coordinates, which ignore transforms and
  survive a panel scroll. A keyboard move remounts nothing but hands focus to the grip at the new
  index (an effect on `value`). The array stays strings, so a seed moved to another slot keeps its
  crop (`seedFocus` looks up the URL) and `pick` (published-tab state) is untouched. `ImagesField`
  is shared, so pricing's *Reviewer photos* reorder too; every other repeater stays "order is
  entry order".
- **Preview confines the layout-3 viewer** (user call, 2026-10-14). The viewer is `position: fixed`
  and, in the published tab, the window's. In the editor's Preview overlay the wrapper round the
  scroller (and the tablet / mobile bezel) carries a `transform`, which makes it the viewer's
  containing block, so it covers the page, not the bar. Its Escape is stopped
  (`e.stopPropagation()`), so the overlay's own Escape exits only on a second press. The scroll lock
  still targets `<html>` / `<body>`, which is not what scrolls there, so the page scrolls behind
  the scrim with the wheel.

## Lattice · layout 1 (plans/lattice/layout-1.md, section 4, 2026-11-19)

`LatticeGallery` is an own-tree block, dispatched in `Gallery`'s `if (s.v0)` **after the seam** (`pick`, `src`, `go`, `srcRows`, `srcAct`, `video`
and `player` are Lime's, handed over in `g`), so Lime's block no longer reaches Lattice at design 0 and the published gallery is the one seam in a new
picture. Differences that bind:

- **Seven tiles at every width, no sliding window, no `srcScroll`.** The 390 master draws all seven (40.3 each), so Lattice is Editorial's case, not the
  four-tile windows above; the source rows stack at all three widths (116.7 tall at 1440, 64 at 768 and 390), so the file's one scroll container does not
  exist here. An empty social row is still not rendered when `s.live`.
- **The first paint opens on slot 2, not `galActive()`'s slot 3** (`s.images.length > 2 ? 2 : 0`): the frames' viewer is the portrait, the strip's third
  photograph, where Lime's seed is the fourth. No tile is marked on the canvas or the published first paint (the frame draws none); a visitor's own pick
  rings its tile in 3px of Scheme 7's orange inside, a live state the frame cannot show.
- **Derived copy, not fields.** The caption pill reads `IMG_0N` (the frame's `IMG_02 · Club night`, whose second half no field holds) and the counter
  `0N — 07` (the frame's `02 — 15`); the progress line's played segment is `(N) / 7` of the track. Both follow the viewer's slot.
- **The eyebrow** `[ 003 ] ——— KICKER` is drawn only when the artist types a `kicker` (seeded empty); the `[ 003 ]` is the markup's literal and goes with
  it. At desktop its seat (14.4 + 32 frame px) is kept empty so the columns stand where the frame's do; narrow it collapses.
- **The credit is one line** (`railLabel`; the name stays removed) and the head row keeps the frame's 30.4 height, so the figure stands 50.4 down at every width.
- **A playing video** takes the figure's seat and hides the caption and arrows; the row switches as in the other blocks.
- **Caps** (`limits.mjs gallery --themes=5 --designs=0`): `kicker` 41, `sourceLabel` 25 (it prints at every width here, so the narrow reading binds: 62 / 69 / 25),
  `railLabel` 45, `heading` 16 (line packing: a 14-character *Kestrel Nights* fills the first line, so the seed's 16 is the floor, as Editorial's and Pop's), `backLabel` 34 as everywhere.

## Paperback · layout 1 (plans/paperback/layout-1.md, section 4, 2026-11-20)

`PaperbackGallery` is an own-tree block, dispatched in `Gallery`'s `if (s.v0)` **after the seam** (before Lattice's line), handed `{ at, marked, strip, go, srcRows, srcAct, video, player }` as Lattice's
is, so the published gallery is the same seam in a new picture (`pick` starts at -1, an unfilled social row is not rendered when `s.live`, a YouTube row with an `embed` is the viewer's other stop, every
arrow, tile and the back link leave the video). Frame `1:2617` · `1:11239` · `1:12425` (908.8 / 1428.5 / 1004.9 tall). `PAPER_GALLERY` holds the frame's px per width, **verbatim at all three** (cqw of a
`containerType: inline-size` stage, vertical insets in a child, `vm.pad = '0px <surplus>'`: the bio's and media's pattern). Differences that bind:

- **A pale-yellow band, not a card.** Scheme 1's `bg` is the root's own ground, so there is no card margin: the content is two 655.05 columns at 1440 (a 31.95 gutter, 48.96 in) and one 715.77 / 342 column
  at 768 / 390 (the left column then the right, a 36 / 28 gap). Top and foot are 96 / 77 / 58.
- **Source rows and strip draw at every width.** Four 24-radius rows (125.6 / 72 / 72 tall, a 12 gap), the open one yellow (`s.onScheme[1].box2`) with a `×` disc, the others white with a `+`; the label is
  Bricolage 800 at 30 / 27 / 25, **`sourceLabel` prints at every width** (Lime's narrow rows are icon-only tiles). Seven tiles (85 / 94 / 40, turned -3 2 -2 3 -1 2 -3 degrees, radius 16) at every width: no sliding
  window, no `srcScroll`, so the file's one scroll container does not exist here.
- **The canvas draws the frame's picked tile, the second.** A 4px pink ring (`s.ac`) on tile 2, and the viewer shows **slot 2's photograph** (`at = s.images.length > 1 ? 1 : 0` off the seam's `pick`). A visitor's own
  pick moves both. **The frame's viewer picture is none of the seven** (`PAPERBACK_VIEWER`), and the viewer can only show a slot, so the seed's slot 2 *is* that picture (`PAPERBACK_PHOTOS.gallery[1]`); the 85px
  thumbnail differs from the frame's by that one photograph. The playing video takes the viewer's seat, hides the arrows and marks no tile.
- **Copy.** The head (`heading`, Bricolage 800, lh .82, -0.035em at 95.04 / 59 / 38) wraps in the column and is fitted to its widest word (`vm.titleWordEms`, extended to the gallery for Paperback). The script `Media`
  is `kicker`, seeded empty, so **drawn only when typed**, in its frame seat (a 655-wide box turned -6 degrees about its centre, so its left end sits 34 down; the 44 / 42 / 39 seat stays as padding). The credit script
  is `railLabel` alone (`Gallery`; the artist's name that stood over it is gone, 2026-11-12), Caveat 28 / 25 / 23 in a 104 / 93 / 85 box turned 4 degrees: it wraps there, which is the frame's own (it prints three lines at 1440, two
  at 768 and 390). `backLabel` is the white pill (the arrow is the markup's; it wraps rather than clip). Both `Gallery` labels carry the inert `data-inline` marks (`sourceLabel`, `railLabel`; text cannot tell them apart); the kicker has none.
- **Decoration.** The pink tape (130 x 30, turned 40 degrees, `s.ac` at .9, the hero's torn polygon clip) centred at (620 / 681 / 307, 37) in the card's box; three sparkles at the card's left edge (44 yellow, 26 lilac
  `s.chips[0].bg`, 16 pink `s.ac`, ink outlines), in front of the rows' right edge at 1440 and clipped by the page at 768 and 390 as the frame's are. Round white arrow discs (44, a 2px ink arrow) are `paperArrow()`.
- **Caps** (`limits.mjs gallery --themes=6 --designs=0`, then `--check --extra-lines=railLabel,backLabel,sourceLabel`: 0 failing; `--seeds`: 0 over): `heading` 16 (the seed's own length: a 16-character head that
  does not pack its first line at 1440 is the floor, as Editorial's and Pop's), `kicker` 25 (the probe reads `box` from 26 at 1440 and 32 at 768; the frame's own is 5), `railLabel` 18 (**two lines**: the box is 104
  wide), `sourceLabel` 36 (**two lines** in a 72-tall row at 390: the probe's one-line reading was 20), `backLabel` stays 34 (two lines in the pill). Layouts 2–4 read Pop's rows.
- **Ledger.** None: `inline-probe` gallery at layouts 1–4, 1440 and 768: PASS (layout 1: 4 slots hit, 0 WRONG / MISSING / UNREACHED / UNLEDGERED). `photo-probe` layouts 1–4 PASS, layout 1 also `--blank` (7 appended) and `--drop`;
  `focus-probe --prime` layouts 1–4 PASS.

## Headliner · layout 1 (plans/headliner/layout-1.md, section 4, 2026-11-23)

`HeadlinerGallery` (`EncoreSection.jsx`, ahead of `Gallery`) is an own-tree block, dispatched in `Gallery`'s `if (s.v0)` **after the seam** (behind Paperback's line), handed `{ at, marked, strip, go, srcRows, srcAct, video, player }` as Lattice's and Paperback's are, so the published gallery is the same seam in a new picture (`pick` starts at -1, an unfilled social row is not rendered when `s.live`, a YouTube row with an `embed` is the viewer's other stop, every arrow, tile and the back link leave the video). Frame `1:4766` · `1:15538` · `1:16587` (849.25 / 1385.94 / 943.02 tall). `HEADLINER_GALLERY` holds the frame's px per width, **verbatim at all three** (cqw of a `containerType: inline-size` stage, the vertical insets in a child, `vm.pad = '0px <surplus>'`: the Headliner line in `EncoreBuilder.jsx` now names `bio`, `media` and `gallery`). Differences that bind:

- **A sand band, no card, nothing centred.** The root's own ground is Scheme 1; the frame's 96 / 77 / 58 top and foot wrap the taller column (849.25 = 96 + 657.25 + 96), so unlike the media's 1440 there is no `minHeight`. Two columns at 1440 (540.516 and 655.047 on a 146.5 gutter, 48.96 in), one 715.766 / 342 column at 768 / 390 (the head and rows, a 36 / 28 gap, then the viewer).
- **The head is two lines at the middle word.** The frame breaks `See us` / `in action` and no measure can make that break (Anton at 129.6: `See us in` 436.5, `in action` 451), so `<h2>` splits its words in half (`ceil(n / 2)` on the first line), the space kept before a `<br>` so the node's text is the field's own, each line wrapping in the column; one word stands alone. Anton 129.6 / 80 / 52, lh .98, -0.005em, fitted to the widest word (`vm.titleWordEms` = `antonEms(w, -0.005)`, the line in `EncoreBuilder.jsx` names the gallery now).
- **Four flush rows, the frame's inventory.** 85.625 / 69.469 / 66 tall on a `rgba(30,30,30,.18)` 1 px rule (the sem/text/1 hairline; the container's foot rule closes the last), the label Anton 64 / 48 / 38 (lh .95, -0.005em, upper-case), the arrow a 54 x 45 block arrow at the row's right (orange `s.ac` with the open row, black `s.activeFg` on the others). **`sourceLabel` prints at every width** (the first row's label; Lime's narrow rows are icon-only tiles), and the three services' names are literals. A row grows (`minHeight`) rather than clip a long label; its label wraps with `overflowWrap: anywhere`. An unfilled social row is not rendered when `s.live`; the canvas keeps all four.
- **The viewer.** A figure on the frame's constant 655.047 : 481.469 aspect (`aspect-ratio`, so the three widths agree), `objectPosition: s.imagesPos[at]`, with the **black (`s.activeFg`, a cream arrow) and orange (`s.ac`, a black arrow) 46 squares flush in its foot-right corner** (hidden while the YouTube player stands in the figure). Seven flat 1 : 1 tiles in a seven-column grid on an 8 gap (86.72 / 95.375 / 42), no radius, no turn, no sliding window at 390: the frame draws all seven, so the file's one scroll container does not exist here either.
- **The head row.** A square back link (`backLabel`, Anton 16, +0.02em, a 1 px `s.text1` outline, the 16 x 14 line arrow 14 after the text) at the row's left and the **teal eye** (96 x 51, `s.onScheme[6].bg` and `[2].bg` for the glint) at the right. The eye is art, not a control. **`railLabel` is not read**: the frame draws no credit line (`in: { Headliner: [1], '*': [0, 1] }`), and the standing removal of the artist's name from it holds anyway.
- **Copy the standing removals leave.** The eyebrow `Media` is `kicker`, seeded empty, so **drawn only when typed** (its 22 x 2 orange dash goes with it); its 15.75 + 22 seat stays as padding at every width, so the head stands where the frame's does.
- **The canvas draws the second slot in the viewer, and rings no tile.** `at = s.images.length > 1 ? 1 : 0`, and the seed's second slot is the frame's viewer picture (`HEADLINER_PHOTOS.gallery[1]` is `headlinerViewer`, Paperback's shape; set in session 0). Thumbnail 2 therefore differs from the frame's by that picture; thumbnail 1 keeps shot 1 (the media took the cover for track one, not the gallery). The frame marks no tile, so a visitor's own pick rings its tile in **3 px of `s.ac`** inside (live only: `marked` is -1 on the canvas and while the player stands).
- **Caps** (`limits.mjs gallery --themes=7 --designs=0`, then `--check` 0 failing and `--seeds` 0 over): `heading` **16** (the seed; the probe reads 14 at 1440, where a sample's long word shrinks the fitted two-line head, so 16 is the floor as at Editorial, Pop, Lattice and Paperback; layouts 2-4 are Grunge's [26, 23, 24], written out), `kicker` **45**, `sourceLabel` **17** (a longer label wraps its row to two lines at 1440 and 390, which the probe counts), `backLabel` **23** (the link wraps at 24 at 390; the others keep 34). `FIELDS.gallery.sourceLabel`'s hint says *every width* for Headliner.
- **Ledger and proofs.** None needed: `INLINE_OFF` and `PHOTO_OFF` gain no row. `sourceLabel` is reached through the inert `data-inline` mark on row 0's label (`INLINE_MARKED`, since the seed `Gallery` is also `railLabel`'s text); `railLabel` is hidden by `in` and has no mark here. `inline-probe` gallery layout 1 at 1440 and 768: PASS (3 slots hit); `photo-probe` `--check`, `--blank` (7 appended) and `--drop`: PASS (7 slots); `focus-probe --prime --check`: 7 controls, 0 failing. Live (`&live=1`): a tile, the arrows (wrapping 7 to 1 and 1 to 7) and the back link walk slots and the ring follows; the YouTube row swaps the viewer for the player and hides the arrow pair, the Gallery row brings the photographs back; Instagram is an outbound link and the unfilled TikTok row is not rendered; no console error at 1440, 768 or 390.

## Backline · layout 1 (plans/backline/layout-1.md, section 4, 2026-11-24)

`BacklineGallery` (`EncoreSection.jsx`, ahead of `Gallery`) is an own-tree block, dispatched in `Gallery`'s `if (s.v0)` **after the seam** (ahead of Paperback's line), handed `{ at, marked, strip, go, srcRows, srcAct, video, player }` as Lattice's, Paperback's and Headliner's are, so the published gallery is the same seam in a new picture (`pick` starts at -1, an unfilled social row is not rendered when `s.live`, a YouTube row with an `embed` is the viewer's other stop, every arrow, tile and the back link leave the video). Frame `1:5934` · `1:17730` · `1:19066` (902.42 / 1350.88 / 931.31 tall). `BACKLINE_GALLERY` holds the frame's px per width, **verbatim at all three** (cqw of a `containerType: inline-size` stage, vertical insets in a child, `vm.pad = '0px <surplus>'`: the Backline line in `EncoreBuilder.jsx` now names `bio`, `media` and `gallery`). Read back off the preview: section 902.31 / 1350.56 / 931.34, the head at 150.9 / 128.94 / 105.92 down and the rows' turned boxes (537.0 x 81.3 at 1440, the frame's 537.18 x 81.34) where the frame has them. Differences that bind:

- **A paper band under a torn olive head.** The root's own ground is Scheme 1 (paper, `#EAECD7`, sampled off the master). The tear is `BacklineTear tear="gallery"` in the **media's olive** (`s.onScheme[2].bg`, `#4C4E29`; the master's tear zone averages `#4E4F2B` with its fibres, ours `#4C4E29`), `tone` the default olive, `u(1440)` wide and clipped at the narrow widths, 1 px above the band. Grain is `BacklineGrain tone="paper"` at full strength; the media draws no tear at its foot.
- **Two columns at 1440 (535.844 and 651.047 on a 155.19 gutter, 48.96 in), one at 768 / 390** (the left column, a 36 / 28 gap, the right). Top and foot are 112 / 90 / 67 and the taller column's height sits between them. **The rows hang from the left column's foot** at desktop (the frame's `Container:align` is 434.09 tall and the rows stand at its foot, 24 under the head at the least): `justifyContent: space-between` in a stretched grid cell, so a longer head pushes the rows down and the section grows.
- **The head** is TT2020 at 100.8 / 62 / 40, line 0.9, -0.045em, lower-cased by CSS, ink with its **last word olive** (`s.text3`, `#6F630A`), wrapping in the column (two lines at 1440, `see us in` / `action.`, with no break forced: the measure makes it; one line at 768 and 390, where the seed is 341.4 of 342 at 390). It is fitted to its widest word (`vm.titleWordEms`, `ttEms`, the line in `EncoreBuilder.jsx` names the gallery now). **The seed carries the frame's full stop**: `GALLERY_HEADING_BACKLINE` is `See us in action.` (layout 1 only; the shared seed has none, as the bio's and media's carry theirs), in `sectionVm` (`c.heading === undefined`) and `fieldSeed`.
- **Four rows on a 10 gap** (72 / 63 / 57 tall, label TT2020 44 / 35 / 29, the two-digit index Archivo 12 at 22 from the right). Each is a ticket: a **CSS mask of four 10 px quarter-circle bites** (`blNotchMask(u(10))`, the media's helper; the frame's own `Notch mask` path is 10 px bites on a 536 x 72 box) and **turned a fraction of a degree** (CSS -1, 0.6, -0.4, 0.8 degrees, top to bottom, as the masters' wrappers state them). The open row is a filled ink bar with a cream label (`s.box1`), the others **transparent with a 1 px dashed ink border** (the frame's raster is a dashed outline with nothing in it). `sourceLabel` prints at every width (Lime's narrow rows are icon-only tiles) and carries the inert `data-inline="sourceLabel"` mark (`INLINE_MARKED`: its seed `Gallery` is also the stamp's old text); the three services' names are literals. The index is the row's place among the rows that stand (`01`..`04`, or `01`..`03` when the published page drops an unfilled TikTok). A row grows (`minHeight`) rather than clip a long label.
- **The viewer is a taped paper card turned -1.2 degrees** (CSS), `BL_CARD` `#F1F2E4` (the master's own raster mean, sampled: `#F1F2E4`, the polaroid's `#F1F2E5`) with half-strength paper grain and the media's two shadows, the photograph inset 12 (627 x 443 at 1440, 692 x 490, 318 x 222) and **two tape strips in the card's own coordinates** (`BacklineTape` in `s.box3`, centred at (36, 36) turned -58 and 100 in from the right edge, 2 down, turned +4: read off the three masters, whose boxes differ only by the card's width). The card's height is the frame's 467 / 514 / 246 and the box round it 0.39 / 0.11 / -0.48 off that (the frame's rounding), so the squares sit in the unturned box: **a paper and an olive 46 square, 6 apart, 26 in from its right and foot** (the previous arrow ink on paper, the next arrow cream on `s.text3`). The photograph is `<Photo slot="images:<at>">`, `objectPosition: s.imagesPos[at]`; the YouTube player takes its seat and the squares go while it stands.
- **The back link and the stamp** share a 46 row (`space-between`, wrapping with an 8 row gap, JP-113's rule). The link is a 1 px ink outline, `minWidth` 199.469 at 1440 and 768 (the frame's, text 14.23 in, the arrow ending 6.24 in), natural width at 390 (11 padding, a 19 gap: 189 wide), Archivo Backline 14 +.06em. **The stamp is the credit line's seat**: `railLabel`, **seeded `Contact sheet` at Backline's layout 1** (`GALLERY_RAIL_LABEL_BACKLINE`, in `sectionVm` and `fieldSeed`; the frame's word, uncased, dropped when emptied: call 1 A's rule that a printed label is a seeded drop-when-emptied field), a 142 x 34 box with a 3 px olive border turned -3 degrees, flush right, growing to its words; it carries `data-inline="railLabel"`. Layout 2's tablet head row keeps `Gallery`.
- **The film strip** is an ink bar turned +0.6 (121 / 130 / 77 tall), the media's shadows and the olive grain tone, seven square thumbnails (86 / 94 / 41) 10 in from its sides and 18 down, **spread edge to edge** (`space-between`: the frame's gaps are 5 / 6.28 / 5.86), each on `#EFEFEF` with its photograph inset 1 px (the frame's pale keyline). All seven draw at every width, so there is no sliding window and no `srcScroll`. The frame's two 7 px bars at the strip's edges hold nothing the export draws.
- **The canvas draws the second slot in the viewer, and rings no tile** (Paperback's and Headliner's rule): the frame's viewer picture, `The band in the control room`, is none of the seven, so `BACKLINE_PHOTOS.gallery[1]` **is** `backlineViewer` and `backline-shot-2.jpg` is removed from the repository (thumbnail 2 differs from the frame's by that picture). A visitor's pick rings its tile in **3 px of the mustard** (`s.activeBg`; live only, `marked` is -1 on the canvas and while the player stands).
- **Not drawn** (call 1 A): `03 ┈┈ MEDIA`'s number. The eyebrow is `kicker`, seeded empty, drawn only when typed, with its 28 px dashed rule and in Archivo 13 olive; its 14.94 seat stays as padding.
- **Caps** (`limits.mjs gallery --themes=8 --designs=0`, then `--check --extra-lines=railLabel,sourceLabel,heading`: 0 failing; `--seeds`: 0 over): `heading` **17** (the seed; an eighteenth letter sets a third line at 1440 and a second at 390; layouts 2-4 are Pop's `[27, 15, 20]` written out), `kicker` **41**, `railLabel` **40** (a stamp of 41 wraps to two lines at 390), `sourceLabel` **18** (a row wraps to two lines past it), `backLabel` stays **34** (the probe reads 36). `FIELDS.gallery.railLabel`'s and `sourceLabel`'s hints are per template.
- **Ledger and proofs.** None needed: `INLINE_OFF` and `PHOTO_OFF` gain no row. `inline-probe` gallery layout 1 at 1440 and 768: PASS (4 slots hit, 0 off, 7 unhit literals); `photo-probe` `--check`, `--blank` (7 appended), `--drop`: PASS (7 slots, 9 clicks; one partial, the viewer 142 of 144 points open under a tape); `focus-probe --prime --check`: 8 controls, 0 failing. Live (`&live=1`, 1440 and 390): a thumbnail rings its tile and moves the viewer, the next arrow steps, the back link returns to slot 1, the YouTube row swaps the viewer for the player (arrows gone, the viewer's photograph gone from the page), the Gallery row brings the photographs back, the unfilled TikTok row is not rendered; no console error.

## Inline editing (plans/inline-edit-all.md, Lime layout 1, 2026-10-21)

Canvas inline editing reaches every gallery text field the layout reads. Layout 1 prints *Gallery* twice at desktop —
the open source row's label and the credit line's second line — and text cannot tell the two fields apart, so each
carries an inert `data-inline` mark (`sourceLabel`, `railLabel`; `INLINE_MARKED`). They stand in **both** layout-1
blocks: Retro's, and the Lime tree's shared by Lime, Grunge, Editorial and Pop (the block's `eyebrow` / `pt` helpers
take a `mark`; the row label's rule is Retro's, `g.on ? 'sourceLabel' : undefined`). The row label prints at desktop
alone, so at 768 it is *not drawn* and needs no ledger row (the probe's union rule). No other gallery key is marked.

The two marks are scoped to layout 1 (`*.0.gallery.…` in `INLINE_MARKED`; Retro layout 2, 2026-10-21): layout 2 draws
`railLabel` once, at 768, where text tells it from the heading, and no `data-inline` stands in its block.

## Layout 4's head arc is neighbour-aware (video section, session 3, 2026-10-27)

Under Lime the head arc is the media's olive `s.box1` (user call, 2026-09-18), unless a video stands directly above the gallery: then it is the page `s.bg`, the frame's dome meeting the video band's ground, gated on `s.videoAbove` (`sectionVm({ above })`, the previous section's category). See `notes/video.md`, *Lime · layout 4*, the seam bullet.

## Paperback layouts 2–4: the caps (session 12, 2026-11-21, plans/paperback/layout-1.md)

- Layouts 2–4 are still Lime's / Pop's tree in Paperback's tokens. Every cap now has a `Paperback` row (none reads Pop's through `specAt`), measured by `limits.mjs gallery --themes=6 --designs=1,2,3 --upright`, then `--check` (0 failing) and `--seeds` (0 over). **The rule is lower-only and never under the seed:** a number the placeholder card cannot bear came down to what it bears, and one that bore more was left, so no cap rose. Lowered (layouts 2, 3, 4, an index per layout; `–` not read): `railLabel` [70,–,–] → [64,–,–]; `heading` [27,15,20] → [23,15,20]; `title` [26,–,–] → [23,–,–].
- **Rough edges (the seed is wider than the card holds a prose line of its length):** none. The cap holds at the seed, `--check` reads it as `(floor)`, and the card draws the seed as it does at the other templates. A layout-2–4 pass with frames replaces all of these.
