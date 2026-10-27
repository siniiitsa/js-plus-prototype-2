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
the 16:9 box at both layouts, and the portrait slice `stage` cut the chest off. The other four
templates seed their `bio` photograph for now (`photos.js`, "Session 1's stand-in") until their own
sessions read the frame. The list's six thumbnails are `RETRO_VIDEO_ART` (gallery 1, 2, 3, 5, 6, 7)
through `ROW_ART.video`, and the small circles are the `avatar` (`defaultImage`'s avatar arm reads it
for video as it does the header's). Only the poster and the avatar are `photoSlots`; the thumbnails are
the seed's and carry no `data-photo` (`photo-probe --cat video`: PASS, `--blank` and `--drop` too, no
`PHOTO_OFF` row).

## Caps (`node scripts/limits.mjs video`, Retro; the other four templates re-measure in their sessions)

| Field | Cap | Measured |
|---|---|---|
| `heading` | 64 (L2), 20 (L4) | L4's 30 at 1440 would take a second line; 390 binds at 20 |
| `description` | 69 | One ellipsized line: prose clips at 64 at 390, the seed is 69 and fits, so the cap is the seed's length (`--check` reports it as *floor*) |
| `duration` | 8 | Measured 22 / 39; a time, held to its shape |
| `allCta`, `followCta` | 16 | Measured 39 / 37 at 390, a pill drawn ×4 its frame width there — judged, as the other pills are |
| `IDENTITY_CHARS.video.title` | 49 (L2), 54 (L4) | The artist's name in layout 2's artist row and layout 4's top bar; the clamp is an ellipsis |

`--seeds` and `--check`: no seed over its cap, no capped field failing. A video prints neither the
header's kicker, location nor tags, and has no seal (`who.*` probes: unseen).

## Retro measures (session 1)

Rendered section heights in the preview harness, at the 1180 / 768 / 390 columns: layout 2 716 / 1110 / 1114,
layout 4 897 / 627 / 363. The Figma L4 bands are 1155 / 635 / 375 at 1440 / 768 / 390 and Retro's L2 instances
782 / 1112.2 / 1101.8 (the band's own padding is the difference at 1440, and the editor draws that frame at
0.82). The composition matches the screenshots of both frames; contents land within a few px of the
transcription, and a pixel-level re-measure is each template session's own gate.

## Other templates

Until their sessions, Lime, Grunge, Editorial and Pop render the same `s.retro ? literal : flat`
arms, in the theme's colours but not the frames' decoration. Each session ports one template's
frame, then re-measures `in`, the caps and the two probes for it.
