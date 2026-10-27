# Video

The section `plans/video.md` restores: a picture of a video player, drawn where Figma draws one —
**layouts 2 and 4 of all five templates**, and nowhere else. Read the plan for the calls (1–5) and
which Figma node is the section; this file is what the code does about them.

## Layout-bound: designs 1 and 3 only

`NVAR.video = 4`, with holes at designs 0 and 2, so the design index stays `layout number − 1`
like every other category. `videoDesign(i)` (`data.js`) folds a hole onto the design beside it
(`((i % 4) + 4) % 4 | 1`: 0 → 1, 2 → 3), and `pageLayout()` and `sectionVm` both go through it, so
a section that somehow carries `arch` 0 or 2 draws layout 2 or 4 rather than nothing.
`layoutChoices(cat)` is the list the sidebar's `LayoutPicker` maps over: `[1, 3]` for video (rows
"Video layout 2" and "Video layout 4"), every layout number for any other category.

- **The setup modal inserts or drops it.** `pickHeader` reads `pageOrder(i)`: card 2 (layout 2) and
  card 4 (layout 4) include `video` after `media` (`PAGE_ORDERS`; layout 4 is a new fourth row,
  layout 1's order with video after media), cards 1 and 3 do not. A page without one gets
  `{ cat: 'video', arch: 0, c: {} }` inserted; a page with one drops it when the card has none.
  **The drop writes nothing to `st.removed`**, because the modal is a one-shot gate over a page nobody has
  touched, so no Undo and no memory of it is wanted (the page the user *did* delete a video from keeps
  its entry). A dropped section that was selected clears `selectedId` and `editSheet`.
- **Add section.** `startArch(cat, removed, pageD)` opens the composer on the layout the page is on:
  `videoStartArch(pageD)` is 3 when the header's design is 3, else 1. With a `st.removed` entry it
  reopens on that section's own layout, as every category does. `addSection` seats a video with
  no remembered seat after `media`, else before the footer.
- **Delete and Undo** are the ordinary ones: `st.removed.video` keeps `arch`, `c`, `at` and `before`.
- A *Start fresh* page (`BLANK_PAGE`) and `EXAMPLE_PAGE` carry no video: it enters only through
  the modal or Add section. `PAGE_ORDERS` is the one place that stands it in a page.
- **No nav link** (call 5, user call, 2026-10-27). `CATS.video.noNav` is read by `navSectionsOf`,
  so a video neither shows in the header's nav nor reaches `NAV_MINIMAL` or `CTA_TARGETS`: the
  frames' nav has no entry for it.

## A picture, not a player

`Video` in `EncoreSection.jsx` draws a player; it plays nothing, links nowhere and reads no
`s.live` (call 2). The play disc, the scrubber, the settings and volume icons, `View All ›`,
the bookmark / link / bell controls and `Follow` are drawn and dead, as in the frames. Nothing in
the published tab, the preview or the thumbnails differs from the canvas.

## Fields (`FIELDS.video`)

| Key | Layouts | What it prints |
|---|---|---|
| `image` | 2, 4 | The poster, 16:9 |
| `avatar` | 2 | The artist's circle beside the name and beside each listed video, 1:1 |
| `heading` | 2, 4 | L2: the label over the description. L4: the band's display head. Seeds `TITLES.video` (*Live at Roomtone*) and `HEADING_4.video` (*See me in action*) |
| `description` | 2 | One ellipsized line under the heading |
| `duration` | 2, 4 | The clock, as `04:18`; the bar's fill is drawn from it (`vm.videoAt`, `VIDEO_MARK`, `clockAt`) |
| `allCta` | 2 | *View All ›* over the list |
| `followCta` | 2 | *Follow* at the end of the artist row |

`allCta` and `followCta` are JP-071's shape: the frame's own bytes, uncased, dropped when emptied.
**`duration` is not in call 4's field list** — it was in the old `FIELDS`, so it is kept, and anything
that is not `mm:ss` leaves the clock and the bar empty. The rest of the copy — *Top music video*, the
six rows' titles, kinds, dates and lengths — is a literal or seeded (`VIDEOS`), and has no repeater
(call 4). The six rows are therefore **not** inline-editable and need no `INLINE_OFF` row: the
canvas never offered them (`inline-probe --cat video`: Retro L2 5 slots hit, L4 2, PASS, nothing
unledgered).

## Photography

`RETRO_PHOTOS.video` is the **hero** shot, not `stage`: the Retro frames show the whole hero image in
the 16:9 box at both layouts, and the portrait slice `stage` cut the chest off. `LIME_PHOTOS.video`
is `limeHero` too (session 2, below). `GRUNGE_PHOTOS.video` is `grungeStage`, the bio's drummer, and
it is the frame's own (session 4, below). `EDITORIAL_PHOTOS.video` is `editorialStage`, the bio's arch, and
the frame's own (session 6, below). `POP_PHOTOS.video` is `popStage`, the bio's arch, and the frame's own
(session 8, below). The list's six thumbnails are `RETRO_VIDEO_ART` (gallery 1, 2, 3, 5, 6, 7)
through `ROW_ART.video`, and the small circles are the `avatar` (`defaultImage`'s avatar arm reads it
for video as it does the header's). Only the poster and the avatar are `photoSlots`; the thumbnails are
the seed's and carry no `data-photo` (`photo-probe --cat video`: PASS, `--blank` and `--drop` too, no
`PHOTO_OFF` row).

## Caps (`node scripts/limits.mjs video`, Retro; Lime's layout 2 in session 2; Grunge's layouts 2 and 4 in sessions 4 and 5; Editorial's layouts 2 and 4 in sessions 6 and 7; Pop's layout 2 in session 8, its layout 4 in session 9)

| Field | Cap | Measured |
|---|---|---|
| `heading` | 64 (L2), 20 (L4) | L4's 30 at 1440 would take a second line; 390 binds at 20 |
| `description` | 69 | One ellipsized line: prose clips at 64 at 390, the seed is 69 and fits, so the cap is the seed's length (`--check` reports it as *floor*) |
| `duration` | 8 | Measured 22 / 39; a time, held to its shape |
| `allCta`, `followCta` | 16 | Measured 39 / 37 at 390, a pill drawn ×4 its frame width there — judged, as the other pills are |
| `IDENTITY_CHARS.video.title` | 49 (L2), 54 (L4) | The artist's name in layout 2's artist row and layout 4's top bar; the clamp is an ellipsis |

Lime's layout 2 measured 82 for `heading` (Retro 64: the label face is narrower, and 390's box binds),
64 for `description` (prose; the 69-character seed fits at 390, so the cap stays the seed's length and
`--check` reports *floor*, as on Retro), 36 / 37 / 22 for `allCta` / `followCta` / `duration` (held to
16 / 16 / 8 by the judgements above) and 49 for `IDENTITY_CHARS.video.title`, Retro's own number. So
`heading` and the identity row carry a `Lime` entry. **Lime's layout 4 (session 3)** measured `heading`
19 (390 binds, a two-line wrap; 28 at 1440, 24 at 768 — Retro's 20), `duration` 39 at 390 (held to 8, a
time) and `IDENTITY_CHARS.video.title` 50 (149 / 96 / 50; Retro's 54); `--check` and `--seeds`: 0 failing,
0 over.

**Grunge's layout 2 (session 4)** measured `heading` 91 (390's box binds; Anton in capitals is narrower than
Lime's face, so `Grunge: [null, 91, null, 20]`, the layout-4 slot Retro's default until session 5), `description`
64 prose / the seed's 69 as the cap (*floor*, as Retro and Lime), 41 / 40 / 70 for `allCta` / `followCta` /
`duration` (held to 16 / 16 / 8) and `IDENTITY_CHARS.video.title` 49 (138 / 114 / 49 at 1440 / 768 / 390,
Retro's and Lime's number; a `Grunge: [null, 49, null, null]` row, since the theme had none and an unlisted
theme has no cap at all). `--check` and `--seeds`: 0 failing, 0 over.

`--seeds` and `--check`: no seed over its cap, no capped field failing. A video prints neither the
header's kicker, location nor tags, and has no seal (`who.*` probes: unseen).

## Retro measures (session 1)

Rendered section heights in the preview harness, at the 1180 / 768 / 390 columns: layout 2 716 / 1110 / 1114,
layout 4 897 / 627 / 363. The Figma L4 bands are 1155 / 635 / 375 at 1440 / 768 / 390 and Retro's L2 instances
782 / 1112.2 / 1101.8 (the band's own padding is the difference at 1440, and the editor draws that frame at
0.82). The composition matches the screenshots of both frames; contents land within a few px of the
transcription, and a pixel-level re-measure is each template session's own gate.

## Lime · layout 2 (session 2, 2026-10-27)

Frames: `964:64588` 1440×782 · `986:11856` 768×1123.2 · `986:11875` 390×1125.8, all *Video Players — A ·
Dashboard player*. (Session 2's prompt named `964:72871 · 971:5436 · 977:9010` and bands `964:72867 …`;
those are Lime's **layout 4** instances and bands, session 3's, and were not fitted here.)

- **The gate is `s.lime`**, a `lime` const inside the shared `s.v1` branch, not `s.limeTree`: Grunge,
  Editorial and Pop keep rendering the flat arm until their own sessions, and the digest proves it (the
  other four themes' video renders are byte-identical). Session 4 widens `s.lime` to `s.limeTree` where
  Grunge's frame agrees, as every Lime section was.
- **Dress, every value a bound token** (Lime's layout-2 frames bind them): player radius 50 at all three
  widths (Retro's is 40); `cream` → `s.box1` and `creamInk` → `s.tx`, which seats the panel, the time
  badges, the thumbnail play discs, the transport and action discs and the progress track; every disc
  but the Follow pill is held by `1px solid s.stroke1` (a hairline, it does not ramp) and the pill is the
  bare `box/1`; **the panel has no outline** (Retro's 3px rust is gone) and radius 13 (`radius/control`) at
  all three widths, padding 14 / 30 / 10 exactly (no stroke to subtract); row titles `s.ac` on `s.display`
  (`sem/text/1`, acid green on the olive box, where Retro's flat arm took the paper's ink); the artist
  row's rule `s.stroke1`; avatar wells `s.box1` (40) and `s.box2` (19.8). `hard()` draws nothing off Retro,
  so the action discs throw no block.
- **Type is `s.*` at every width**: Lime's ramp is already the frame × 0.82, and the three masters' text
  boxes agree with it (label 24 → 17 → 13, list 24 → 19 → 18, body-md 14 → 13 → 13, body-sm 13 → 13 →
  12), so `labelMd` / `list` / `bodyMd` / `bodySm` replace Retro's hand-ramped literals under `lime`. Boxes
  still go through `u()`. Unlike Retro's, Lime's row title is *smaller* at 390 than at 768 (19 → 18).
- **Glyphs are the frame's own vectors**: the transport's skip is `LimeSkip` at 13.022 (the same 1.91 : 1
  as layout 1's 16.03 × 8.39), the pause two 2.686 bars 3 apart (8.37 × 11.19, written in the branch), and
  the thumbnails' play is the 24 disc's triangle (8.2 × 9.5, a hair right of centre). They shrink with the
  transport's disc at 390 (22 / 28). The top-corner and action glyphs stay lucide, as Retro's.
- **Narrow thumbnails are 154 × 88** (Retro's code says 150): the metadata states 154 at both 768 and 390.
- **No effect anywhere**: the Player, the bar and the panel carry no glow or shadow at any width (the
  radius-14 glow in Lime's layout-2 plan is the *media* bar's). **No `SCHEMES_OF` row**: Lime carries no
  `schemes` and the plan has the video inherit Scheme 1, so there is nothing to seat (Grunge's, Editorial's
  and Pop's sessions will find a row to add where their frames state one).
- **Poster: the hero, `limeHero`** (hash `51d68654`; the stand-in was the bio's portrait slice). The 768 and
  390 masters fill it as a plain centred cover, the 1440 one's `CROP` is centred on it vertically (y .109 to
  .891 of the source), and the player is always wider than the 1.5 source, so the cover reads only the y
  axis: **no `FOCUS` row is needed** (the video's `Photo` passes no `objectPosition`, and `limeHero`'s existing
  '30% 50%' is an x this box never reads). **The 1440 fill is also mirrored** (`imageTransform` x scale −1,
  and its 12% tighter y window squashes the aspect): declined, since the 768 and 390 masters and all three
  of Retro's are the unmirrored `FILL`, `Photo` has no flip, and an uploaded poster must never be turned.
  **This moves Lime's layout 4**, whose poster is the same field (the digest's arch 2 and 3 differ by this
  alone); session 3 reads its own crop.
- **Thumbnails and avatar stay as Retro's**: the six stills are `RETRO_VIDEO_ART`. The frame's first
  thumbnail is `3a59b4d1`, Lime's gallery spotlight, which the seed deliberately leaves out. The artist
  row's circle (`b35b6507`, also thumbnails 2 and 6) is a stock portrait in the frame; ours is the artist's
  own `avatar`, since the circle names the artist.
- **The seam** is a `video` row in `vm.pad`'s layout-2 inset table (Lime alone): the frames pad the content
  56 / 60 / 40 each side, so the section stands flush on the media above and the repertoire's sheet below,
  where `padY` (80 / 56 / 44) stood it 80 off at 1440. The 1440 foot is 56 − 13: the frame's 670 stage clips
  the artist row's padding and ours does not. Section heights 642.3 / 1123.6 / 1124.4 against the frames'
  782 × 0.82 = 641.2, 1123.2 and 1125.8; player 734 × 428.4 (frame 896 × 522.9 × .82), panel 321 wide at
  1440. The 390 frame's artist row carries a `#141414` fill that is invisible on the `#15180F` page, a leak
  not drawn; its 370 × 1 "rule" at y 67 is the flex spacer, not a line.
- **Probes** (`--theme Lime --layout 2 --width 1440,768 --cat video`): `inline-probe --check` PASS (5 slots
  hit, 0 wrong, nothing unledgered, as Retro's); `photo-probe --check`, `--blank` and `--drop` PASS (2 slots
  hit). `page-check.mjs Lime 1,0,2,3`: no console error or warning, no 390 overflow, the video on cards 2
  and 4 only. The digest (Lime, every section, three widths; the other four themes' video) moved nothing
  but Lime's video.
- `&n=` has no video entry in the harness: there is no list to empty (call 4).

## Lime · layout 4 (session 3, 2026-10-27)

Frames: band `Frame 318` `964:72867` 1440×1186 · `971:5432` 768×654 · `977:9006` 390×387, inner *Cinematic
minimal* `964:72871` 1328×754 · `971:5436` 708×402 · `977:9010` 370×209. Band: Section y 156 / 60 / 60, x 56 /
30 / 10, head 116 / 72 / 48 tall (Bebas Neue 130 / 81 / 54 at leading .89, `sem/text/1`), head → instance 60 /
60 / 30, foot 100 / 60 / 40 under the player, fill `sem/bg` `#15180F` (the page). Retro's band is the same
numbers (its head is 85 / 53 / 36 tall, so the heights differ; the insets do not). Rendered section heights in
the harness: **972 / 654 / 387** against the frames' 1186 × 0.82 = 972.5, 654 and 387.

- **The gate is `s.lime`**, a `lime` const at the top of `Video`'s `v3` branch, as session 2 did for `v1`;
  Grunge, Editorial and Pop keep the flat arm. The dress is bound tokens: discs, the progress track and the chips
  `s.box1` (`#2E3928`), glyphs and the played fill `s.ac`, every line of type on the photograph `s.tx`
  (`#F2FFD0`, text/2), no stroke or effect anywhere. Type is the Lime ramp (`s.dispLg` 107 / 81 / 54, `s.list`
  20 / 19 / 18 for the name, `s.bodyLg` for the arrow, `s.bodySm` and `s.chip` for the clocks and *HD*), and
  matches the frame's text boxes at every width. The transport is `LimeSkip` at 13.022 (the glyph layout 2
  uses) and the two-bar pause in the branch (the 40 / 64 / 40 discs do not shrink, so the glyphs take `z`
  alone).
- **Three things read off the masters and overridden**, each toward the section's own legibility:
  1. **The 390 instance is in Retro's mode** (the instance's mode collection is the one Retro's pages set
     and the band's is not): Soulway, `#EAD7B8` / `#FAECD5` / `#C8461C`, `#111111` clocks, a different
     photograph (`000ea835`) and a 13 px name. A leak; nothing is read off it, the 390 takes the 1440 and
     768 tokens and Lime's ramp (its name is 18, where the frame's 13 is Retro's `size/list`).
  2. **The Mobile variant binds the head band's type to `sem/bg`**, which under Lime is the page's near
     black on the poster. All three widths take `s.tx` (text/2), as 1440 and 768 do.
  3. **The Desktop and Tablet variants bind the progress fill to `box/1`**, the track's own colour, so the
     frame's bar shows no played portion. The fill stays `s.ac` (Retro's rule: a played bar that cannot be
     told from the unplayed one is a defect, and the clock beside it says 02:04).
- **The 768 instance clips its own composition**, as Retro's does (708 × 402 over a 567 tall child at
  y −82.5, `overflow-clip`): its render is three discs and a photograph, with the name, the playhead and the
  clock cut away. Overridden the same way, the whole composition at all three widths.
- **Poster: `limeHero` confirmed** (`51d68654`, the L4 instances' own hash at 1440 and 768; 390's `000ea835` is
  the Retro-mode leak above). The 1440 fill is a `CROP` mirrored on x (`imageTransform` −1) with a .109–.891 y
  window, the 768 a plain `FILL`: **the mirror is declined** exactly as in layout 2 (the same hash and the same
  transform; the 768 master and Retro's three are unmirrored, `Photo` has no flip, and an uploaded poster must
  never be turned). The player is always wider than the 1.5 source, so the cover reads the y axis alone and no
  `FOCUS` row is needed. `Photo backdrop` stands under it (the frame's `box/3` `#101309` ground).
- **Left out, as at Retro**: the *551 539 views* count and *— Late Lights* after the name (`vm.title` is the
  head above, so the bar is the arrow and the artist's name).
- **The band's own padding is a Lime row in `vm.pad`**, `d === 3` — the first (layouts 1 and 2 had tables;
  layout 4 had none, every section standing on `padY` or its own sheet's bleed). `video` pads 156 / 100 at
  1440 (× 0.82, 128 / 82), 60 / 60 and 60 / 40 over `padX`, where `padY` gave 80 / 56 / 44. The neighbouring
  sheets (media's olive, the gallery's lime) bleed to their own roots' edges, so the video root's padding *is*
  the band's.
- **The lens where the video was, re-fitted** (Lime's layout-4 plan, open question 1, and its 2026-09-18 stage
  call, which this does not reverse). **Old seam:** the media's foot arc was dropped (the sheet ends square)
  and the gallery's head arc was recoloured to the media's olive `s.box1`, so a page with no video band
  showed olive → olive arc into lime with no lens. **New seam, while a video stands between them:** the
  frame's own: the media draws its foot arc in the page `s.bg` (the dark dome up into the olive), and the
  gallery's head arc is `s.bg` (the dome into the lime), both meeting the band's `#15180F`. The frame's
  gallery arc is `box/3` `#101309` at 1440 and `sem/bg` at 768 and 390 (a 5-in-255 difference, named by the
  gallery's session and not drawn). **A page whose video was deleted, or never added, keeps the old seam**,
  which means a section can now see its neighbours: `sectionVm({ above, below })` takes the categories of the
  sections either side (the canvas and `PublishedPage`, the two callers that hold the page's array, pass
  them; the harness takes `&above=video` and `&below=video`), and resolves `vm.videoAbove` / `vm.videoBelow`.
  Callers that pass none (the layout picker's thumbnails, the setup modal's cards) fall through to the old
  render. The media's foot arc is `ArcEdge` `side="bottom"` (`!grunge && !ed && !pop`, and `ArcEdge` draws
  only under Lime anyway); the gallery's head arc picks its colour on `s.videoAbove`. *(Not a call put to the
  user: the 2026-09-18 call stands for every page without a video, and the alternative, restoring the
  frame's seams unconditionally, would bring the lens back when a video is deleted.)* Checked in the editor
  at Desktop / Tablet / Mobile on card 4 and after deleting the video.
- **Probes** (`--theme Lime --layout 4 --width 1440,768 --cat video`): `inline-probe --check` PASS (2 slots hit,
  nothing wrong or unledgered); `photo-probe --check`, `--blank` and `--drop` PASS (1 slot hit, the poster).
  `page-check.mjs Lime 3,0,1,2`: no console error or warning, no 390 overflow, the video on cards 2 and 4
  only (`sections390` heights, video 387).

## Grunge · layout 2 (session 4, 2026-10-27)

Frames: *Video Players — A · Dashboard player* `964:64626` 1440×782 · `986:13761` 768×1112.2 · `986:13780`
390×1119.8 (the planning table's ids, as written; layout 2's nodes are the instances themselves, no band).
`explicitVariableModes` on all three is `1 · Primitives: Static Youth` — **no mode leaks into the 390**
(session 3's trap, checked and absent). Same tree as Retro's and Lime's at all three widths (the 390 puts the
artist row's two halves on two lines, the panel under, the list two to a line).

- **The gate is `(s.lime || s.grunge)`**, `const lime = s.lime || s.grunge` plus `const gr = s.grunge`, not
  `s.limeTree`: the family flag is true for Editorial and Pop, whose frames are not fitted, so it would have
  turned Lime's dress on for them. Editorial's and Pop's sessions widen to `limeTree` (or add their own `ed` /
  `pop` arms) when they fit theirs. Grunge carries no `schemes`, so there is no `SCHEMES_OF` row.
- **Where Grunge takes Lime's arm** (all bound tokens, read off the walk and resolved against `THEMES[2]`):
  page `s.bg` `#000000` (`190:130`; the bar), box `s.box1` `#1A1A1A` (`290:138`; panel, discs, badges, track,
  both avatar wells and the Follow pill), well `s.box2` `#383838` (`346:188`; the list's small circles),
  `s.tx` white (`190:133`), hairline `s.stroke1` white .15 (`290:142`; every disc, the artist row's rule),
  `s.ac` `#DF262C` (`290:128`; the progress fill, the row titles **and the panel's ring** — one variable, so
  it is the accent, not `stroke/2`'s pure red). The ramp is Lime's rule: `THEME_RAMP.Grunge`'s `labelMd` 16 /
  14 / 13, `list` 20 / 19 / 18, `bodyMd` 11 / 13 / 13 and `bodySm` 10 / 12 / 12 are the frame's 20 / 14 / 13,
  24 / 19 / 18, 14 / 13 / 13 and 12 throughout. Glyphs are Lime's vectors (the skip is the same 13 × 6.8,
  1.91 : 1; the pause the same 8.4 × 11.2; the thumbnail triangle the same 8.22 × 9.5, apex x 17.48 on the 24
  disc). No effect anywhere in the tree, so `hard()` and the glow rule have nothing to do.
- **Where Grunge differs (the `gr` arms):**
  1. **Player radius 15** at all three widths (Lime 50, Retro 40), through `u()`.
  2. **The panel is held by a 1px `s.ac` ring** and radius 8 (`u(8)`), where Lime's has no outline and 13. The
     frame's 14 / 30 / 10 inset is from the box's outer edge, so the CSS padding is `calc(… - 1px)`.
  3. **Transport discs are not all circles**: skip back and forward R17 (a circle), the pause and the volume,
     maximize and ⋮ discs **R8** (a rounded square on 28; 6.2 on the 390's 21.7 disc). `sq` in the branch.
     The two top-corner discs and the four action discs stay circles (R17, R18). At 390 the disc is **21.7**
     and the bar's padding 8 (the bar is 37.7 tall); Retro's and Lime's 22 and 7 are untouched.
  4. **The thumbnail's play disc is R8 on 24** (R5.4 on the narrow masters' 21.1) and the narrow masters' time
     badge is its own 32.5 × 14.8 box (8.55 type, 1.42 / 4.27 padding, radius 2.8) on a 10 inset, the disc on
     10 / 9.4. The narrow triangle is **its own 7.46 polygon, not a scaled one** (apex 14.28, 10.55 on the
     21.1 disc: `M14.283 10.5507 L8.6845 13.783 L8.6845 7.3184`).
  5. **Narrow thumbnails are 150 × 86**: the masters state 150, Lime's 154. The `'154px'` ternary is now
     `s.lime`, so Lime is byte-identical.
  6. **Row titles are Anton at `faced(s, list)`, `facedLh(1.2)`, uppercase** (the `list` key takes no
     `distressed()`). The frame states `textCase: ORIGINAL` on them, but Stones Crush is all capitals; "Music
     video" (UPPER) goes through `labelStyle`, which already does the same.
- **Three overrides named**, each toward what the artist typed or what reads: (a) the progress fill is 200 / 215
  at 1440 and the *whole* track at 768 and 390, which contradicts its own 02:05 / 03:57; kept `s.ac` at
  `videoPct`, as at Retro and Lime. (b) The artist row's `#141414` fill is **hidden** in all three masters (the
  leak Lime's narrow masters carry too) and not drawn. (c) The frame's viewcounts, follower count, like pair,
  verified tick and the 👁 / 🔖 / 🔗 / 🔔 emoji are Retro's dropped metrics and Retro's lucide icons again.
- **Poster: `grungeStage`, the frame's own, and the stand-in stays.** The player's hash `8031d0f3` is the bio's
  drummer (photos.js: "the bio's portrait (8031d0f3, the drummer)"), 820 × 1024 (4 : 5). So the poster is the
  whole source and needs no export. **The crop is the open call, and the answer is the file's existing
  `FOCUS` row, not a new one.** The player's 1.713 box over a 0.8 source reads a window 46.7% of the height. The
  1440 master's `CROP` is that window at y .087 to .554 (`object-position` ≈ `50% 16%`, the three musicians'
  faces in); the 768 and 390 masters are a centred `FILL` (y .267 to .733), which cuts the drummer at the brow.
  `grungeStage` already carries `'50% 25%'` (window .133 to .600; the gallery tiles' rule: *a top anchor left
  him at the tile's foot*), which keeps the head at every width and is ~5% of the height off the 1440 crop. So the
  video's `Photo` reads `s.imagePos` **under Grunge alone** (`objectPosition: s.imagePos`; undefined for an
  upload, so an upload stays centred, JP-129): the narrow masters' centred fill is the frame, and this departs
  from it on purpose, the way every `FOCUS` site does. Not read for Retro, Lime, Editorial or Pop, because a
  style attribute appearing on another template's poster is a digest diff even where it renders the same
  (`limeHero`'s `30% 50%` included); sessions 6 and 8 read their own. Changing the string would move the bio
  and the gallery (one string per file), so the nine-point difference from the 1440 crop is the cost.
  **Thumbnails stay `RETRO_VIDEO_ART`** (the frame draws Retro's colour stills too: hashes `b073b46f`,
  `3f0c98b4`, `8f69a4a6`, `b35b6507`; the first, `3a59b4d1`, is the gallery spotlight the seed leaves out, as at
  Lime), colour pictures on a template whose rule is "none in colour" — the frame's, so followed, and recorded
  here. **The artist's circle is the `avatar`** (`grungeHeaderAvatar`), not the frame's `b35b6507` stock portrait.
- **The seam** is a Grunge row in `vm.pad`'s layout-2 table: `video: [[56, 49], [60, 60], [40, 40]]`. **Old seam:**
  no `video` row, so the section stood on `padY` (80 / 56 / 44 each end): sections 715.4 / 1104 / 1125.5 against
  the frames' 782 × 0.82 = 641.2 / 1112.2 / 1119.8 — 74 too tall at 1440, 8 short and 6 over at the narrow
  two. **New seam:** 641.4 / 1112 / 1117.5 in the harness; in the whole page (card 2) the neighbours land on
  their frames: at 1440 media 966 (965) → video 782 (782) → repertoire 793 (792), and at 390 media 1438 (1438)
  → video 1118 (1119.8) → repertoire 594 (594). The 1440 foot is 49 where Lime's is 43: the clip takes the 7
  off the artist row (56 − 7), and Grunge's caption is a shorter box than Lime's (the label face), which Lime's
  extra 6 made up. 390 is 2.3 under the frame's 1119.8 (the caption box), left, as Lime's was 1.4 under.
  The repertoire's sheet (`#1A1A1A`) and the media's `#171716` panel on the black page both meet it flush, as
  the frames stand them; no seam is drawn between them in Grunge's layout 2, so there is nothing to re-fit but
  the inset.
- **Probes** (`--theme Grunge --layout 2 --width 1440,768 --cat video`, on the committed tree `d1556db` and
  its caps commit): `inline-probe --check` PASS (5 slots hit at both widths, nothing wrong, unledgered or
  unreached); `photo-probe --check`, `--blank` and `--drop` PASS (2 slots hit, the poster and the avatar).
  `page-check.mjs Grunge 1,0,2,3`: no console error or warning, 390 overflow 0, the video on cards 2 and 4 only,
  the setup modal's four cards. The two-server digest against `433be5e` (720 renders, five themes, three widths, port normalised) moved only
  Grunge's video at arch 0 and 1 (layout 2's folded pair): Grunge's arch 2 and 3 (layout 4), the other four
  themes' video and every other section are byte-identical. (`page-check`'s card keys are 0-based designs, so
  the layout-2 card is key `1`, the one given the full walk; key `2` is layout 3's page, no video.)
- `&n=` has no video entry in the harness (call 4), so there is no emptied-list render; `description`,
  `allCta`, `followCta` and `duration` emptied are the Retro and Lime behaviours.

## Grunge · layout 4 (session 5, 2026-10-27)

Frames: band `Frame 318` `964:72962` 1440×1186 · `971:7956` 768×654 · `977:12183` 390×380, inner *Cinematic
minimal* `964:72966` · `971:7960` · `977:12187`. Band `sem/bg` `#000000` (Scheme 1) at all three; Section y 156 / 60 / 60,
x 56 / 30 / 10; head Stones Crush 130 / 81 / 46 at .89 (116 / 72 / 41 tall, `sem/text/1` `#DF262C`); head → instance
60 / 60 / 30; foot 100 / 60 / 40. The 390 band carries the stray 1554×581 `Vector` `977:16056` (below).

- **No mode leak, and no trap bound wrong.** All three instances are `1 · Primitives: Static Youth` (Lime's 390 was in
  Retro's mode); the bar's `←`, the name and every clock bind `sem/text/2` white at all three widths (Lime's Mobile
  variant bound the head band to `sem/bg`); the poster is the same `8031d0f3` at all three. Still true as at Lime: the
  768 instance clips its own composition (708×402 over a 567 child at y −82.5) and is drawn whole; the 02:05 / 03:57
  clocks and a progress fill of 364 / 369 / 59 of the track disagree, so the fill stays `s.ac` at `videoPct`.
- **The gate** is the pair again: `const gr = s.grunge`, `const lime = s.lime || gr` at the head of `Video`'s `v3`
  branch, never `s.limeTree`. Everything bound resolves through Lime's keys: discs, chips and badges `s.box1`
  (`#1A1A1A`), type `s.tx` white, glyphs and fill `s.ac` (`#DF262C`, the skip and pause marks bind `sem/text/1`), the
  Lime vectors (`LimeSkip` 13.022, the two-bar pause), the player's radius 30 (the instance's; the inner 8 is clipped),
  no stroke and no effect anywhere in the tree.
- **Where Grunge is its own (`gr` arms): five.** (1) **The progress track is `sem/box/2` `#383838`** (`s.box2`), where
  Lime's binds `box/1` (a `track` const; the discs keep `cream`). (2) **The volume and settings chips are 26 with
  `radius/control` 8**, rounded squares, where Lime's is the 14 circle (`u(gr ? 8 : 14)`; the skip and pause discs are
  still circles, R20 / R32). (3) **The head and the artist's name are Anton** (`faced` / `facedLh` / uppercase; the head
  through `distressed`, the name's `list` key not): 80.25 / 60.75 / 34.5 px over the frame's 116 / 72 / 41 line boxes.
  (4) **The poster reads `s.imagePos`** (layout 2's reading, below). (5) **The 390 head tear** (the seam).
- **Poster: `grungeStage`, the frame's own (`8031d0f3`, the bio's drummer), and no new FOCUS row.** The same hash and
  the same crops as layout 2 (1440 a `CROP` at y .087 to .554, the two narrow a centred `FILL`), so the video's `Photo`
  reads `s.imagePos` under Grunge alone (`objectPosition`; an upload has none and stays centred), exactly session 4's
  call: the existing `'50% 25%'` keeps the faces at every width and is ~5% of the height off the 1440 crop. Not read for
  any other template. Row art and the avatar are not drawn in layout 4.
- **The seam is the neighbour read the plan expected, and it is small.** The frames' two Grunge seams were *already
  drawn* by the media (a red head tear and a black foot tear at 1440 and 768, none at 390) and the gallery (a black head
  tear, 67.8 × .82 / 66.3 / 36.3) and neither moves: the black foot tear meets the video's black band as it met the
  gallery's black head tear, and the gallery's black tear hangs from the black band into the red. **Old seam** (a page
  with no video, kept): the two black tears read as one dark torn band about two depths deep at 1440 and 768, and at 390
  the media's `#171716` met the gallery's tear on a straight edge, 23 in 255 (the gallery's session named both).
  **New seam, with a video between:** the black band separates the tears at 1440 and 768, and at 390 the frame's one
  extra seam comes back: `977:16056`, a Scheme 2 `sem/bg` (`#171716`) `Vector` off the band's top-left of which 32.2
  stands inside, so the media's dark band hangs into the black in a torn edge. It is `TornEdge grunge side="top"`,
  height 32.2, `#171716` (the bio's foot tear's literal: Scheme 2 has no vm key), drawn in the video's root at 390 only
  and **only while the media stands directly above** (`vm.mediaAbove`, `above === 'media'`, the third neighbour key
  beside `videoAbove` / `videoBelow`): a video reordered away from the media keeps no half a band. So **neither the media
  nor the gallery changed for Grunge**: `&below=video` and `&above=video` digest to zero for them, and the new key's
  only reader is Grunge's video at 390.
- **`vm.pad`'s `d === 3` video row is Grunge's too** (Lime's `[[156, 100], [60, 60], [60, 40]]`, the frame's own, the
  condition now `Lime || Grunge`). **Old seam:** no Grunge row, so `padY` (80 / 56 / 44 each end) and Lime's flat-arm
  head: sections 897 / 627.4 / 362.6, 75 / 26.6 / 17.3 under the frame. **New:** **972.1 / 654.0 / 379.9** against the
  frames' 1186 × .82 = 972.5, 654 and 380 (the 390 head is 41, Lime's 48), and in the whole page (card 4, `page-check`)
  media 1006 → video 380 → gallery 711.
- **Caps (`limits.mjs video --themes=2 --designs=3`).** `heading` **25** (390 binds, a two-line wrap; 32 at 1440, 27 at
  768; `Grunge: [null, 91, null, 25]`), `duration` 39 at 390 (held to 8, a time), `IDENTITY_CHARS.video.title` **55**
  (163 / 105 / 55; `Grunge: [null, 49, null, 55]`). `--check` and `--seeds`: 0 failing, 0 over.
- **Probes** (`--theme Grunge --layout 4 --width 1440,768 --cat video`, on the committed tree `56c320b`): `inline-probe
  --check` PASS (2 slots hit at both widths, nothing wrong, unledgered or unreached); `photo-probe --check`, `--blank`
  and `--drop` PASS (1 slot, the poster). `npm run build` clean. `page-check.mjs Grunge 3,0,1,2`: no console error or
  warning, 390 overflow 0, the video on the layout-2 and layout-4 cards only, the setup modal's four cards. The
  two-server digest against `b219803` (720 renders, five themes, three widths, port normalised): **only Grunge's video
  at arch 2 and 3** (layout 4's folded pair) moved; the other four themes' video, Grunge's layout 2 and every other
  section are byte-identical; `&below=video` / `&above=video` over media, gallery and video: again only Grunge's video;
  `&above=media` moves Grunge's 390 video by one `svg` (32.2) and its `path`, and nothing at 1440 or 768. SVG fills are
  the digest's blind spot, so the arcs were proved by pictures (media → video → gallery at all three widths).

## Editorial · layout 2 (session 6, 2026-10-27)

Frames: *Video Players — A · Dashboard player* `964:64607` 1440×782 · `986:15666` 768×1111.2 · `986:15685` 390×1118.8
(layout 2's nodes are the instances themselves, no band). Same tree as Retro's, Lime's and Grunge's at all three widths.

- **No mode leak, no scheme seat.** All three instances are `1 · Primitives: Sienna Vale`, and `resolvedVariableModes`
  gives `2 · Scheme: Scheme 1` at the root and at every node walked (the only explicit mode on any node is the
  Primitives one on the instance root). Every bound colour resolves in Scheme 1: `sem/bg` `#F6F0E8`, `box/1`
  `#FFF9F2`, `box/2` `#EDE6DC`, `text/1` `#C86E52`, `text/2` `#141414`, `stroke/1` `#141414` (opaque), `stroke/2`
  `#C86E52`. **So `SCHEMES_OF.Editorial[1]` gains no `video` row** (a section with no row stands on Scheme 1, and
  the digest and the harness agree), no `[desktop, tablet, mobile]` triple is needed, and nothing in the section
  reads `s.onScheme[n]`. The 768 instance clips nothing here: its composition is the whole 708 × 991.2 frame (Lime's
  layout-4 instance clipped its own child; this one does not).
- **The gate is `s.lime || s.grunge || s.editorial`**, three flags in the `v1` branch (`ed`, `gr`, `lime`, plus
  `gd = gr || ed`), never `s.limeTree`: it is true for Pop, whose frames are not fitted. **Editorial takes Lime's
  bound tokens** (`cream` → `s.box1`, `creamInk` → `s.tx`, the `hair` stroke on `s.stroke1`, the list's small circles
  `s.box2`, the thumbnail's ground `s.bg`, the row titles `s.ac`), **Grunge's sizes** (`gd`: the 21.7 narrow discs on an
  8 padding, the narrow thumbnail's own 32.5 × 14.8 badge and 7.46 triangle, 150 thumbnails, the row titles `faced` and
  uppercase — Gloock at `faceK` .967 in capitals, as Fisterra Fora's all-caps) and is **its own in six places** (`ed`):
  1. **Nothing is rounded.** The player (`Player` carries no radius), the panel (`radius/sharp`) and the transport bar
     (`radius/sharp`: a paper rectangle on the photograph, where Lime's and Grunge's are 999 pills) are square, and so
     are the thumbnails (no radius on the frame).
  2. **The panel's ring is dashed 10, 10, 1px `text/1`** (`s.ac`), and **the artist row's top rule is dashed 10, 10, 1px
     `stroke/2`** (`s.stroke2`, which is `#C86E52` here: Lime's and Grunge's rule is `stroke/1`). Both are `DashRule`s at
     the node's pattern × 0.82 on desktop (`10 * z`), the panel's `side="all"` radius 0, the row's `side="top"`. The
     frames state the panel's 14 / 30 / 10 inset and the row's 15 from the outer edge with the stroke inside, so neither
     takes a border out of its padding (Grunge's solid ring does, `calc(… − 1px)`); both boxes are `position: relative`
     for the overlay.
  3. **Three discs are circles, three are R6.** Skip back, skip forward and pause are circles (the pause is `radius/card`
     16 on 28, a circle all the same), as are the two top-corner discs, the action discs and the Follow pill;
     **volume, maximize and ⋮ are `radius/control` 6** (4.65 on the 390's 21.7, `sq` scaled as Grunge's), where Grunge's
     R8 includes the pause (`sqPause`: only `gr` carries it).
  4. **The thumbnail's play disc is R6** (R4.1 on the narrow masters' 21.1, the frame's 4.08), 10 from the right and
     9.1 from the foot of our 85.7 box (Grunge's literal 9.4 is its own).
  5. **The poster reads `s.imagePos`** (below).
  6. The 390 bar's stroke is .78 in the frame, 1px here as Grunge's: not drawn.
- **Three overrides named**, each toward what the artist typed or what reads: (a) the progress fill is 200 / 215 at 1440,
  215 / 215 at 768 and 65.9 / 65.9 at 390, which contradicts its own 02:05 / 03:57: kept `s.ac` at `videoPct`, as
  Retro, Lime and Grunge. (b) The artist row's solid fill is hidden in all three masters (the leftover Lime's and Grunge's
  masters carry too) and not drawn. (c) The dropped metrics (the viewcounts, `22.7M followers`, the like pair, the
  verified tick and the 👁 / 🔖 / 🔗 / 🔔 / 🔊 / ⛶ emoji), which are Retro's, and lucide's icons again.
- **Poster: `editorialStage`, the frame's own, and the stand-in stays.** The player's hash `9d20fe0d` is *the bio's arch*
  (photos.js), 820 × 1025 (4 : 5), so the poster is the whole source and needs no export. The 1440 master is a `CROP`
  at y .065 to .532 (`imageTransform` 0.467 / 0.065, no mirror — Lime's was mirrored and declined); the 768 and 390
  masters are a centred `FILL` (y .267 to .733), which **drops the head** and draws a chest, a belt and a microphone
  (the 768 and 390 screenshots). So the video's `Photo` **reads `s.imagePos` under Editorial too** (`gd`): the file's
  existing `'50% 0%'` (window 0 to .467) keeps the face at every width, 6.5% of the height off the 1440 crop. **No new
  `FOCUS` row**: one string per file would move the bio's arch and the gallery's, and `'50% 0%'` already serves this
  box. An upload has none (`s.imagePos` is undefined) and stays centred, JP-129. Not read for Retro, Lime or Pop: a
  style attribute appearing on another template's poster is a digest diff. **Thumbnails stay `RETRO_VIDEO_ART`** (the
  frame draws Retro's colour stills — `3a59b4d1` the gallery spotlight, `b35b6507`, `b073b46f` — as Lime's and
  Grunge's do), **the artist's circle is the `avatar`**.
- **The seam** is an Editorial row in `vm.pad`'s layout-2 table: `video: [[56, 50], [60, 60], [40, 40]]`. **Old seam:**
  no `video` row, so the section stood on `padY` (80 / 56 / 44 each end): sections **715.5 / 1110 / 1113.5** against the
  frames' 782 × 0.82 = 641.2 / 1111.2 / 1118.8 (74 too tall at 1440). **New seam:** **641.3 / 1111 / 1116.5**. The
  1440 foot is 50 (Lime's 43, Grunge's 49): the frame's 670 stage clips the artist row's padding, ours does not, and
  Gloock's caption is the box between. In the whole page (card 2, `page-check`) the neighbours land on their frames:
  1440 media 966 → **video 782 (782)** → repertoire 793 (792), 390 media 1441 → video 1117 (1118.8) → repertoire 594.
  **No seam is drawn between them** (Editorial's layout 2 draws none), so there is nothing to re-fit but the inset: the
  media's Scheme 2 card sits on the paper page (`cardOnPage`), the video stands flush on that paper, and the repertoire's
  sheet (Scheme 4 at 1440, paper at 768 and 390, `[4, 1, 1]`) meets it flush as the frames stand it.
- **Judged, not fixed: Gloock's row titles clip sooner than Fisterra's.** *MANCHESTER AT 3AM* fits the frame's 209
  column; Gloock's caps are wider and the title ends in the ellipsis (`MANCHESTER A…` at 1440, `MANCHESTER …` at 768),
  as the frame's own *DISCO MAGHREB (EDIT)* clips (`EDI`). The ellipsis is the branch's one truncation idiom; the
  face is the display-face plan's call (plans/editorial/display-face.md).
- **Caps (`limits.mjs video --themes=3 --designs=1`).** `heading` **48** (390's box binds, Gloock in capitals is the
  widest of the five faces; 79 / 88 / 48; `Editorial: [null, 48, null, 20]`, the layout-4 slot Retro's default until
  session 7), `description` 64 prose / the seed's 69 as the cap (*floor*, as Retro, Lime and Grunge), 40 / 37 / 22
  for `allCta` / `followCta` / `duration` (held to 16 / 16 / 8) and `IDENTITY_CHARS.video.title` **49** (138 / 114 / 49;
  `Editorial: [null, 49, null, null]`, the layout-4 slot read in session 7, so Editorial's layout 4 still has none).
  `--check` and `--seeds`: 0 failing at layout 2, 0 over. (`--check` at layout 4 still reports its heading failing
  at 390: Retro's 20 on an unfitted Editorial layout 4, session 7's.)
- **Probes** (`--theme Editorial --layout 2 --width 1440,768 --cat video`, on the committed tree `0bed237`):
  `inline-probe --check` PASS (5 slots hit at both widths, nothing wrong, unledgered or unreached); `photo-probe
  --check`, `--blank` and `--drop` PASS (2 slots, the poster and the avatar). `npm run build` clean.
  `page-check.mjs Editorial 1,0,2,3` (card keys are 0-based designs): no console error or warning, 390 overflow 0,
  the video on the layout-2 and layout-4 cards only, the setup modal's four cards. The two-server digest against
  `2d8aafc` (720 renders, five themes, three widths, port normalised): **only Editorial's video at arch 0 and 1**
  (layout 2's folded pair) moved; Editorial's arch 2 and 3 (layout 4), the other four themes' video and every other
  section are byte-identical.
- `&n=` has no video entry in the harness (call 4); `description`, `allCta`, `followCta` and `duration` emptied are
  the Retro, Lime and Grunge behaviours.

## Editorial · layout 4 (session 7, 2026-10-27)

Frames: band `Frame 318` `964:73054` 1440×1175 · `971:9551` 768×647 · `977:13295` 390×362, inner *Cinematic minimal*
`964:73058` · `971:9555` · `977:13299`. Band `sem/bg` `#F6F0E8` (Scheme 1, paper) at all three, and **`explicitVariableModes` on
the band and its Section is `2 · Scheme: Scheme 1`**; Section y 156 / 60 / **40** (Lime's and Grunge's 390 is 60), x 56 / 30 / 10;
head Fisterra Fora 118 / 73 / 48 at .89 (105 / 65 / 43 tall, `sem/text/1` `#C86E52`); head → instance 60 / 60 / 30; foot
100 / 60 / 40. Read with a full recursive walk of all 35 nodes of each instance (a walker that skips children by index or
stops at an instance's edge loses the bar's track and discs: `findAll` does not enter an instance, recurse by hand).

- **The mode leak is the 768 instance, not the 390.** `971:9555` is `1 · Primitives: Static Youth` (Grunge's mode): the
  drummer `8031d0f3`, `#1A1A1A` discs, `#DF262C` glyphs and fill, white `text/2` type, Stones Crush, `box/2` `#383838`
  track, `radius/control` 8 chips. A leak, as Lime's 390 was: nothing is read off it, and 768 takes the 1440 and 390
  tokens (both Sienna Vale). All 35 nodes of each instance resolve `2 · Scheme: Scheme 1`; **no explicit mode below the
  instance root**, so **no `SCHEMES_OF.Editorial[3]` row and no `s.onScheme` read** (paper is Scheme 1, and Scheme 1 is no
  row; the plan's "gains a `video` seat (paper)" was the plan's expectation, read and found to be the absence of one).
- **Where the three Lime-L4 traps land.** (1) the leak: 768, not 390 (above). (2) The head band's type binds `sem/bg` at
  1440 and 390 — which under Editorial **is the design**, not a defect: `sem/bg` is the paper `#F6F0E8`, light on the
  scrimmed photograph, where Lime's is near black. So the on-film type (the arrow, the name, both clocks, `HD`) is
  **`s.bg`**, not `s.tx` (`text/2` `#141414`, black on the scrim): `onFilm = ed ? s.bg : …`, the one arm that would
  have been visibly wrong had `lime = s.lime || gr || ed` carried it. (3) The progress fill is `sem/text/1` at all three
  widths (no `box/1` fill), the track `box/1` `#FFF9F2` at 1440 and 390: Lime's arm, no Grunge-style `box/2` track. The
  fill is 364 of 988 / 369 of 369 / 59 of 59 against its own 02:05 / 03:57, so it stays `s.ac` at `videoPct`. The 768
  instance still clips its own composition (708×402 over a 567 child at y −82.5): drawn whole.
- **The gate** is `s.lime || gr || ed` at the head of `v3` (`ed = s.editorial`, `gd = gr || ed`), never `s.limeTree`. Editorial
  takes Lime's tokens (cream `s.box1` `#FFF9F2`, glyphs `s.ac` `#C86E52`, chip ink `s.tx` `#141414`, the vectors) and is its
  own in **five** places: (1) on-film type `s.bg` (above); (2) the volume and settings chips are `radius/control` **6**
  (`u(ed ? 6 : gr ? 8 : 14)`), a rounded square on 26; (3) the head and the name are Gloock in capitals through
  `gd` (`faced`, `facedLh`, uppercase), the name at `s.list` (20 / 19 / 18 against the frame's 24 / 19 / 18 × .82); (4) the
  head is fitted to its widest word in the column as the gallery's L4 head is (`min(s.dispLg, calc(100cqi /
  s.titleWordEms))`, `faced`), so the section's root column is a size container (`containerType: 'inline-size'`, `ed` only);
  (5) the poster reads `s.imagePos` (below). The player's outer radius **30 stays**: the instance states 30 at all three
  widths and the render is rounded (unlike layout 2's square player). No stroke, dash or effect anywhere in the tree, so no
  `DashRule`.
- **Poster: `editorialStage`, the frame's own, no new FOCUS row.** `9d20fe0d` is the bio's arch (as layout 2's); the 1440
  master is a `CROP` at y .081 to .535 (no mirror), the 390 a centred `FILL` (y .274 to .726) that drops the head. The video's
  `Photo` reads `s.imagePos` under Editorial too (`gd`): the file's existing `'50% 0%'` (window 0 to .467) keeps the face at
  every width, ~8% of the height off the 1440 crop, and serves this box as it served layout 2's, so one string per file
  stays. An upload has none and stays centred (JP-129). The 768's drummer is the leak, not read.
- **The seam is the plan's "straight edge", and it needed no re-fit.** **Old seam** (a page with no video, kept): the media's
  taupe sheet meets the gallery's ink directly, a straight edge. **New seam, a video between:** taupe → the video's paper band
  → ink, all straight, exactly as the frames stand them (`plans/editorial/layout-4.md` line 395 was the one table row that
  named the video "paper, not in the project"). Both `ArcEdge` sites (the media's foot, the gallery's head) already exclude
  `ed`, and Editorial's media and gallery draw no seam of their own, so there is nothing to draw: **`&below=video` on the media
  and `&above=video` on the gallery render byte-identical** at all three widths (`innerHTML` equal), and so does the video with
  `&above=media&below=gallery`. Proved in pictures too (media foot → video → gallery head stacked at 1440, 768 and 390: three
  ground changes, taupe / paper / ink, every one a straight edge, the root painting the paper). No new neighbour key has a reader.
- **`vm.pad`'s `d === 3` video row is Editorial's too** (`156 / 100`, `60 / 60`, `40 / 40`; Lime's and Grunge's 390 top is 60, so
  the 390 top is `T.name === 'Editorial' ? 40 : 60`). **Old seam:** no Editorial row, so `padY` (80 / 56 / 44 each end) and Lime's
  flat-arm head: sections **897.0 / 627.4 / 362.6**. **New:** **963.2 / 646.9 / 404.4** in the harness against the frames' 1175 ×
  .82 = 963.5, 647 and 362: 1440 and 768 on the frame, **390 is 42 over** because Gloock's capitals do not fit "SEE ME IN ACTION"
  in one line at 48 where Fisterra Fora's condensed ones do (2 lines, 85.4 against the frame's 43; the head is one line at 1440,
  86.3, and 768, 65.0). Judged, not fixed: the head is fitted to its widest word, as every Editorial head is, and wraps between
  words (the gallery's L4 head does the same); a whole-string fit would shrink a typed 16-character head to unreadable at 390.
  In the whole page (card 4, `page-check`): the published 1440 page stands the band at **1175 (the frame's own)** between the media
  (1138) and the gallery (746); 390 media 1022 → video 404 → gallery 755, overflow 0.
- **Caps (`limits.mjs video --themes=3 --designs=3`).** `heading` measured **15** at 768 (19 at 1440, a 2 > 1 line wrap, 20 at 390,
  3 > 2), but the 16-character seed is the frame's own string and fits one line there, so the cap is the seed's length, **16**:
  `--check` reports tablet *floor*, as `description`'s (`Editorial: [null, 48, null, 16]`). `duration` 39 at 390 (held to 8) and
  `IDENTITY_CHARS.video.title` **29** (89 / 58 / 29; 390's box binds, Gloock's capitals beside the arrow;
  `Editorial: [null, 49, null, 29]`). `--check` 0 failing at layouts 4 and 2, `--seeds` 0 over.
- **Probes** (`--theme Editorial --layout 4 --width 1440,768 --cat video`, committed tree `95f0e78`): `inline-probe --check` PASS
  (2 slots hit at both widths, nothing wrong, unledgered or unreached); `photo-probe --check`, `--blank` and `--drop` PASS (1 slot,
  the poster). `npm run build` clean. `page-check.mjs Editorial 3,0,1,2`: no console error or warning, 390 overflow 0, the video
  on the layout-2 and layout-4 cards only. The two-server digest against `0330e23` (720 renders, five themes, three widths, port normalised): **only Editorial's video at arch 2 and 3** (layout 4's folded pair) moved; the other four themes' video, Editorial's layout 2 and every other section are byte-identical; `&below=video` / `&above=video` over Editorial's media, gallery and video: zero diff.

## Pop · layout 2 (session 8, 2026-10-27)

Frames: *Video Players — A · Dashboard player* `964:64569` 1440×782 · `986:17571` 768×1112.2 · `986:17590` 390×1107.8
(layout 2's nodes are the instances themselves, no band). Same tree as the other four at all three widths: 136 / 136 /
138 nodes (the 390's two extra are its `Frame 310` / `Frame 309` wrappers round the artist and the controls).

- **Bound, no mode leak, no seat.** Pop's layout-2 page is bound (plans/pop/layout-2.md), so every seat is read off the
  node and a raw hex is a leak. All three instances state **only** `1 · Primitives: Pop` on the root, and
  `resolvedVariableModes` gives `2 · Scheme: Scheme 1` at the root and at every node walked (Device Desktop / Tablet /
  Mobile on the text, which is the width and not a leak). **So `SCHEMES_OF.Pop[1]` gains no `video` row** (a section with
  no row stands on Scheme 1), nothing reads `s.onScheme[n]`, and the root is the page's white `sem/bg` with no
  `cardOnPage` / `vm.pageBg` (the video is no card on another ground: the lime card is the media's, the grey sheet the
  repertoire's). The 768 instance clips nothing: its composition is the whole 708 × 992.2. Raw paints in the three
  trees: the hidden `#141414` fill of the artist row (below) and nothing else; no effect on any node.
- **The gate is now `s.limeTree` for `v1`.** Lime, Grunge, Editorial and Pop are all fitted at layout 2, so the family
  flag is exactly the old `s.lime || gr || ed` plus Pop, and a fifth designed template would no longer fall silently onto
  Retro's literals. `const lime = s.limeTree`, `const pop = s.pop`, `gd = gr || ed || pop`. **v3 is untouched**: it keeps
  `s.lime || gr || ed` (Pop's layout 4 renders the flat arm, as it did, until session 9), and the digest proves Pop's
  arch 2 and 3 byte-identical.
- **Where Pop takes Lime's arm** (all bound): `box/1` `#F5F5F5` (`s.box1`) for the panel, the transport and corner discs,
  the badges, the progress track, the avatar well and the Follow pill; `text/2` violet (`s.tx`) for every clock, label and
  caption; `stroke/1` pink `#FF2DA0` (`s.stroke1`, opaque) as the 1px ring on every disc and as the artist row's top rule
  (the row's own stroke is top-only: per-side weights 1 / 0 / 0 / 0); `text/1` pink (`s.ac`) for the progress fill and the
  row titles; `box/2` `#EBEBEB` under the list's small circles; `sem/bg` white for the bar (a pill, no stroke) and for the
  thumbnails' ground; the player's radius 50 at all three widths. **The ramp needs no literal**: Chunko 20 / 14 / 13 is
  `labelMd` 16 / 14 / 13, the row titles 20 / 16 / 15 `list` 16 / 16 / 15, Inter 14 / 13 / 13 `bodyMd`, 12 `bodySm`
  (`THEME_RAMP.Pop`, the frame × 0.82 at desktop). The vectors are Lime's (the skip 13 × 6.8, the pause 8.4 × 11.2, and the
  thumbnail triangle `M17.4831 12L…` at 24, `M14.283 10.5507…` at 21.1: the frame's own polygon boxes, rotated −90°,
  are the same to the hundredth).
- **Where Pop takes Grunge's** (`gd`): the narrow discs 21.7 on an 8 padding, the narrow badge 32.55 × 14.85 on a 10 inset
  (radius 2.85, Grunge's 2.8 left), the narrow play disc 21.1 on 10 / 9.1, 150-wide thumbnails, the row titles faced and
  uppercase (Titan One for the frame's Chunko Bold Demo, `faceK` .98), and `radius/control` **8** on the panel (Lime's is 13),
  on the volume, maximize and ⋮ discs (6.2 on the 390's 21.7) and on the thumbnail's play disc (R8 on 24, R5.4 on the 21.1).
  **The pause is a circle** (`radius/card` 24 on 28), so `sqPause` stays Grunge's alone, as at Editorial. No ring on the panel.
- **Pop is its own in two places:**
  1. **The three action discs are three fills** — 🔖 `text/2` violet, 🔗 `text/1` pink, 🔔 `tag/1/bg` lime — each held by the
     `stroke/1` ring, where the other four templates' are one. The frame binds every glyph `text/2`, which on the violet disc is
     the disc's own colour (it only reads there because Figma draws the emoji in colour), so the glyph is redrawn in the ink
     that reads: the page's white (`s.bg`) on violet and on pink (3.4 : 1, an icon) and the tag's own ink (`s.chips[0].fg`) on
     lime. The Follow pill is the bare `box/1` and spreads none of it (`actPop`, per disc, not in `act`).
  2. **The poster reads `s.imagePos`** (below).
- **Three overrides named**, each toward what the artist typed or what reads: (a) the progress fill is 200 / 215 at 1440,
  215 / 215 at 768 and 65.9 / 65.9 at 390, which contradicts its own 02:05 / 03:57: kept `s.ac` at `videoPct`, as everywhere.
  (b) The artist row's solid `#141414` fill is **hidden** in all three masters (the leftover the other masters carry) and not
  drawn. (c) The dropped metrics (viewcounts, `22.7M followers`, the like pair, the verified tick, the 👁 / 🔖 / 🔗 / 🔔 / 🔊 /
  ⛶ emoji) are Retro's, and lucide's icons again. The 390's .776px disc strokes are 1px here, as Grunge's and Editorial's.
- **Poster: `popStage`, the frame's own, and the stand-in was right.** The player's hash `51d06990` is the bio's arch
  (photos.js: "the bio's arch (51d06990)", the comedian under the COMEDY CLUB neon), so `POP_PHOTOS.video` already was the frame's
  photograph and only its comment said otherwise. The 1440 master is a `CROP` (`imageTransform` 1 / 0.438 / 0.086: y .086 to .524,
  no mirror); the 768 and 390 masters are a centred `FILL`, which **drops the head** and draws a jacket, a belt and a hand (the
  screenshots). So the video's `Photo` **reads `s.imagePos` under Pop too** (`gd`): the file's existing `'50% 0%'` (window 0 to
  .467) keeps the face and the neon at every width, ~8.6% of the height off the 1440 crop. **No new `FOCUS` row**: one string per
  file would move the bio's arch and the gallery's, and `'50% 0%'` already serves this box. An upload has none and stays centred
  (JP-129). Not read for Retro or Lime. **Thumbnails stay `RETRO_VIDEO_ART`** (the frame draws the same Retro colour stills as
  every other template: `3a59b4d1`, `b35b6507`, `b073b46f`, `3f0c98b4`, `8f69a4a6`), **the artist's circle is the `avatar`**.
- **The seam** is a Pop row in `vm.pad`'s layout-2 table: `video: [[56, 49], [60, 60], [40, 40]]` (the frames state 56 / 60 / 40 each
  side and the same 670 stage clip). **Old seam:** no Pop row, so the section stood on `padY` (80 / 56 / 44 each end): sections
  **715.5 / 1110.0 / 1113.5** against the frames' 782 × 0.82 = 641.2 / 1112.2 / 1107.8 (74 too tall at 1440). **New seam:** **641.4 / 1112.0 / 1106.8** in the harness. The
  1440 foot is 49 (Lime's 43, Grunge's 49, Editorial's 50): the clip takes ~7 off the artist row and Titan's caption box is
  Grunge's height. In the whole page (card 2, `page-check`, published 1440) the neighbours land on their frames: media 966 →
  **video 782 (782)** → repertoire 793 (792); at 390 media 1420 → video 1107 (1107.8) → repertoire 594. At 768 the three roots stand on
  their frames too (media 1541.4 (1541) → video 1112.0 (1112.2) → repertoire 791.9 (792)). **No seam is drawn between them**:
  pictures at 1440 and 390 (the published page's stack) and the 768 media foot show the media's lime card (with its 5px lime
  rule at 1440, the media's own), the video flush on the white page, and the repertoire's grey `box/1` sheet ringed 1px pink
  meeting it flush as the frames stand them. So there is nothing to re-fit but the inset.
- **Judged, not fixed: Titan's row titles clip a character sooner than the frame's.** The frame's 209-wide column clips the last
  glyph of *MANCHESTER AT 3AM* by 4px (it reads as the full string); ours ends in the ellipsis (`MANCHESTER AT 3…` at 1440), the
  branch's one truncation idiom, as Editorial's Gloock.
- **Caps (`limits.mjs video --themes=4 --designs=1`).** `heading` **47** (76 / 85 / 47: 390's box binds, Titan One in capitals;
  `Pop: [null, 47, null, 20]`, the layout-4 slot Retro's default until session 9), `description` 64 prose / the seed's 69 as the cap
  (*floor*, as the others), 40 / 37 / 22 for `allCta` / `followCta` / `duration` (held to 16 / 16 / 8) and
  `IDENTITY_CHARS.video.title` **49** (138 / 114 / 49; `Pop: [null, 49, null, null]`, a new row: an unlisted theme has no cap at
  all, and layout 4's slot is session 9's). `--check`: 0 failing at layout 2 for Pop and at layouts 2 and 4 for the other four
  (Pop's layout 4 reports Retro's 20 failing at 390, the unfitted slot, session 9's); `--seeds`: 0 over.
- **Probes** (`--theme Pop --layout 2 --width 1440,768 --cat video`, on the committed tree `fb97d88`): `inline-probe --check` PASS
  (5 slots hit at both widths, nothing wrong, unledgered or unreached); `photo-probe --check`, `--blank` and `--drop` PASS (2 slots,
  the poster and the avatar). `npm run build` clean. `page-check.mjs Pop 1,0,2,3` (card keys are 0-based designs): no console error
  or warning, 390 overflow 0, the video on the layout-2 and layout-4 cards only, the setup modal's four cards. The two-server digest
  against `ba1c411` (720 renders, five themes, three widths, port normalised): **only Pop's video at arch 0 and 1** (layout 2's folded pair, six files) moved; Pop's arch 2 and 3 (layout 4, so v3 untouched), the other four themes' video and every other section are byte-identical.
- `&n=` has no video entry in the harness (call 4); `description`, `allCta`, `followCta` and `duration` emptied are the Retro, Lime,
  Grunge and Editorial behaviours.

## Other templates

Until session 9, Pop's layout 4 renders the same `s.retro ? literal : flat` arms in the theme's colours but not the frame's
decoration. Each session ports one template's frame, then re-measures `in`, the caps and the two probes for it.
