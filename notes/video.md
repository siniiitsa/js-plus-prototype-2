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
it is the frame's own (session 4, below). Editorial and Pop seed their `bio` photograph for now
(`photos.js`, "Session 1's stand-in") until their own sessions read the frame. The list's six thumbnails are `RETRO_VIDEO_ART` (gallery 1, 2, 3, 5, 6, 7)
through `ROW_ART.video`, and the small circles are the `avatar` (`defaultImage`'s avatar arm reads it
for video as it does the header's). Only the poster and the avatar are `photoSlots`; the thumbnails are
the seed's and carry no `data-photo` (`photo-probe --cat video`: PASS, `--blank` and `--drop` too, no
`PHOTO_OFF` row).

## Caps (`node scripts/limits.mjs video`, Retro; Lime's layout 2 in session 2; the other three templates re-measure in their sessions)

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

## Other templates

Until their sessions, Grunge's layout 4, and Editorial and Pop's layouts 2 and 4, render the same `s.retro ? literal : flat` arms, in the
theme's colours but not the frames' decoration. Each session
ports one template's frame, then re-measures `in`, the caps and the two probes for it.
