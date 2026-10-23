# Click a photo on the canvas to replace it — plan

## Context

Text is now editable on the canvas (`plans/inline-edit.md`, `inline-edit-all.md`): click the copy of an
already-selected section and a box opens over it. Photos are still panel-only (`ImageField`, `ImagesField`,
`RowThumb` in `EncoreBuilder.jsx`). The ask: click a photo on the canvas and get the photo editor, with a button
to upload another photo in place of the current one. User calls (2026-10-23):

- **Surface:** the *existing* crop editor (`ImageEditor.jsx`, opened through `editImages`), on the clicked photo,
  with a new **Upload another** button inside it. No new popover.
- **Scope:** every photo field, every template and layout, plus empty slots (initials / gradient placeholder).

Same gates as the text feature: desktop and tablet only (never a phone), only on an *already-selected* section
(first click still just selects), nothing in the published tab, preview overlay or thumbnails mounts it.

## What exists (verified)

- Photo fields (`FIELDS`, `data.js`): header `image` 16:9 + `avatar` 1:1; bio `image` 4:5; calendar `image` 1:1
  (`in [0,3]`); form `image` 1:1 (`[0,1]`) + `photo` 3:2 (`[1]`); pricing `images` ≤3, 1:1 (`[1]`); gallery `images`
  ≤7, 3:2; media `tracks[].image` 1:1 (hard-coded in `RowThumb`). Testimonials, map, repertoire, footer: none.
  Three states per slot: absent = seed, `null` = placeholder, string = upload (`notes/photography.md`).
- Panel read/write: `imgVal` / `imgsVal` (`EncoreBuilder.jsx:~4642`), `repeaterRows('tracks')`, `api.setContent`.
  Upload helpers `imageProblem`, `readImage`, `vetImages`, `IMAGE_MAX` (`:2514-2545`), all private to `EncoreBuilder.jsx`.
- `ImageEditor.jsx`: `editImages([{ src, aspect, edit?, onApply }])` queues onto one `<ImageEditorHost>` (mounted
  `EncoreBuilder.jsx:~7690`); `Editor` takes its source from `item.src` (`ORIGINALS` lets Edit reopen a baked crop's
  source). Cancel writes nothing; Apply bakes a data-URI string, so `c.*` shapes do not change.
- `EncoreSection.Photo` (`:1683`) is the single photo helper (66 call sites): an `<img>` when there is a url, else a
  gradient `<div>` (`backdrop`) or an initials `<div>`. Plus two raw `<img>`s: media track art (`:9944`) and the
  gallery lightbox (`:16645`, live-only, out). **No markers on any of it.**
- Canvas click: section wrapper `onClick` at `EncoreBuilder.jsx:~7507` runs `inlineFieldAt` when selected, else selects.
  `probeInline` (`:6742`) sets the `text` cursor on hover. Photos currently fall through to "select".

## Design

### 1. Mark photos in `EncoreSection` (the one place this breaks a stated rule)
CLAUDE.md says `EncoreSection` carries two inert `data-inline` marks "and no other; do not add where text can
decide". Text *cannot* decide for photos: a seed URL is shared by several fields (Editorial's hero is also its
`photo` slot, its portrait card is also the form avatar; Pop likewise), a gallery with empty slots draws the
section photo as a fallback, and placeholders are not `<img>` at all. So:

- `Photo` gains one inert `data-photo="<slot>"` on **all three** of its arms (img, backdrop div, initials div), plus the
  raw track-art `<img>`. The slot is derived where it can be (`avatar` → `avatar`, `src === undefined` → `image`) and
  passed by the caller otherwise via a new optional `slot` prop: `images:2`, `tracks:3`, `photo`. This is a one-time
  sweep of the ~30 call sites that pass an explicit `src`; every other prop and style stays as is. No effect, no handler,
  no new React import; `EncoreSection` stays a picture.
- Record the decision in `notes/photography.md` and amend CLAUDE.md's "two inert marks and no other" sentence.
- The slot names the *field*, never the url, so what a tile displays (its own value, or the fallback) cannot mislead.

### 2. Slots: reuse the inline machinery's shape
- New `photoSlots(sec, themeName)` next to `inlineSlots` (`EncoreBuilder.jsx`): one slot per image-type
  `FIELDS` entry that `fieldShown` says the layout reads, one per index of an `images` field (up to its `max`),
  one per `tracks` row (`repeaterRows('tracks')`). Each: `{ id, k, idx?, row?, value, aspect, empty }`, where `value`
  is what the **panel** shows (`imgVal` / `imgsVal` / track row, seed resolved), so panel and canvas cannot disagree.
- `empty` = resolves to `null` / no url. An `images` index beyond the stored array is empty too. **Checked:** gallery and
  pricing layouts draw a *fixed* count of tiles (`s.images[i]` over a per-layout range, `EncoreSection.jsx:15709`, `16717`,
  `17086`, `17299`), and an undefined entry falls back to the section photo (`Photo` `src === undefined`), so such tiles exist.
  **Decision (product call, flag it in the pass file):** a click on a past-the-end tile *appends*, as the panel's Add tile
  does, so the photo lands on the first free tile, which may not be the one clicked. The alternatives are worse: `null`-padding
  flips the tiles in between from the fallback photo to initials placeholders and collides with Remove-writes-`null`.
- `PHOTO_OFF` in `data.js`: the ledger, same key grammar and `inlineRule` resolver as `INLINE_OFF`
  (`Template.design.cat.key`), value = reason. Default-on, less the ledger; a page is *known* good only once the probe passed it.
- `photoWrite(sec, slot, url)` mirrors the panel exactly: single → `setContent(sid, k, url)`; `images` → resolved list with
  the index replaced when it is inside the list, appended when it is past the end (above); `tracks` → the row with its `image` replaced (what `RowThumb`'s caller does).
  Replacement only: no Remove from the canvas (the panel keeps Remove, and its `null` rule is untouched).

### 3. Hit-test (the one real piece of new design)
Run **after** the text rule, so a click on copy still edits copy. Then:
`document.elementsFromPoint` filtered to the section root, walked top-down; the first element that is (or sits inside)
a `[data-photo]` node is the hit. Scrims (`SCRIM.*` gradients), `Grain`, and `pointer-events:none` decoration are
skipped, as the explorer measured they sit above most header photos and would win `e.target`. What *blocks* the photo: an
element above it, not containing it, that paints an opaque solid ground (a card on the hero), or that is an interactive /
text-bearing element (nav, Book pill). `paintsOver` (`:6399`) cannot be reused as is, since it counts gradients; write
`blocksPhoto` beside it. Spike this on Retro and Pop layout 1 first (as Phase 0 step 3 did for text) before the rule is final.

### 4. Open the editor
In the wrapper `onClick`, after `inlineFieldAt` misses: `photoFieldAt(...)` → `startPhoto(sec, slot)`.
- **Filled slot:** `editImages([{ src: slot.value, aspect: slot.aspect, edit: true, onApply: url => photoWrite(...) }])`
  — same call `ImageField`'s Edit makes, so `ORIGINALS` and seed-baking behave identically.
- **Empty slot:** nothing to crop yet, so open the file picker straight away. One hidden `<input type="file">` at the
  builder root (outside any popup that might unmount mid-pick) with a pending-slot ref → `vetImages` → `readImage` →
  `editImages` (fresh pick, `edit` unset) → `photoWrite`. Same path as `ImageField.take`.
- Cancel / Escape writes nothing. Apply / *Use original* writes. No `inline`-style state needed: the dialog is modal.

### 5. "Upload another" in `ImageEditor.jsx`
- `Editor` holds its source in state (`src`, initialised from `item.src`, `ORIGINALS` consulted on the *current* src).
  A footer button (beside Reset) opens a hidden file input **inside the dialog** (stays mounted), → vet → read →
  replaces `src`, resets `tf` to `startTf()`, title flips to *Frame your photo*. Apply writes through the same `item.onApply`;
  Cancel still writes nothing. Failure shows the refusal line under the stage plus a toast.
- Shown for every non-batch item (`item.total === 1`), so the panel's Edit gets it too; hidden in a multi-file pick,
  where it would fight *Skip photo*.
- Move `imageProblem` / `readImage` / `vetImages` / `IMAGE_MAX` into a new `src/builder/imageFiles.js` (chrome-only,
  import-free of `EncoreBuilder`, avoids a cycle); `EncoreBuilder.jsx` and `ImageEditor.jsx` import it.
  `ImageEditorHost` takes `onToast` from the builder root.

### 6. Affordance and coherence (what else makes sense in this scope)
- **Hover:** on a selected section, `probeInline`'s sibling sets cursor `pointer` over a photo and draws a thin blue
  outline of the photo's visible rect (reuse the `focusBox` look, `pointer-events: none`, z 21). Rect = the node's
  bounding rect clipped by its `overflow` ancestors up to the root (arch / round frames), so a clipped photo is not
  outlined past its crop. Tilted polaroid / rotated cards: accept the bounding box (outline only; the hit uses the point).
- **Panel → canvas:** focusing an image field in the panel boxes and scrolls to its photo, via `[data-photo]`
  (today `onFocusField` yields `text: ''` and no box for images). Tiny with the marks; keeps the two surfaces symmetric.
- **Drop a file on a canvas photo** replaces it (the panel's `dropZone` already does this): optional, last step; cut if
  it fights the text editor's drag behaviour.
- Where a layout draws one slot in more than one node (e.g. a gallery photo as both the spotlight and its strip thumb),
  every node opens the same field, the text rule "every node the pointer can reach". (The header's inset thumb is
  `avatar`, a different slot from the scene `image`.)

### Not in scope (write down in the ledger / notes)
Phones; the gallery lightbox and any live-only image; map raster / grain / textures (decoration, not fields); Remove,
reorder and Add-beyond-max from the canvas (panel keeps them); alt text and focus metadata (none exist); a live
preview of the crop at 1440 / 768 / 390 (already "not done" in `notes/photography.md`).

## Steps

0. **Foundations (1 session, three commits).** Copy this plan to `plans/photo-edit.md` and list it in `plans/README.md`; branch
   `photo-edit`.
   a. **Commit 1: `imageFiles.js` + *Upload another*.** Independent of every canvas decision, clickable at once from the
      panel's Edit, shippable alone.
   b. **Commit 2: the `data-photo` sweep** (`Photo` + raw track `<img>` + the ~30 explicit-`src` call sites), a diff of its
      own: `digest.mjs` before / after must show no style change, `inline-probe.mjs --check` on Retro / Pop layout 1 stays PASS.
   c. **Commit 3: the canvas feature.** `photoSlots`, `photoWrite`, `PHOTO_OFF`, `photoFieldAt`, `blocksPhoto`, `startPhoto`,
      root file input; hover outline + cursor; panel→canvas box.
1. **Probe.** Add `--photos` to `scripts/inline-probe.mjs` (or a sibling `photo-probe.mjs` sharing its helpers: `openEditor`,
   `pageHelpers`, the header-card pick, fiber `st` reads). Universe = `photoSlots(..., all)` with the `off` reason. For every
   `[data-photo]` node: real mouse click at a visible point (aim by `elementsFromPoint`), assert the editor opens on the
   right slot with `src` equal to the slot's panel value (or the file input fires for an empty slot), Escape → `c` hash
   unchanged (NOT-RESTORED otherwise), then upload a fixture PNG through the dialog's input, Apply → **only** that slot's
   key/index/row changed (WRONG otherwise), restore. Reports HIT / WRONG / NOT-RESTORED / MISSING / UNLEDGERED over
   `--width 1440,768`, last line `photo-probe: PASS|FAIL`. Positive control first (header image must open slot `header.image`).
2. **Pilot: Retro layout 1** (all sections), the hit-test spike beside Pop layout 1 for the scrim / card question.
3. **Passes, layout-major** (the shared `Photo` makes these mostly ledger rows): layout 2 (five templates), layout 3,
   layout 4, then Retro's header-only layouts 5–6. After any shared-code change re-run every earlier page.
4. **Sweep + docs.** Optional file-drop. CLAUDE.md bullet beside the text one; `notes/photography.md` section; per-pass log in
   `plans/photo-edit.md`. Do **not** hand-edit `index.html`; refreshing it stays the separate deliberate copy step.

## Critical files

`source/src/builder/EncoreBuilder.jsx` (wrapper `onClick` ~7507, `probeInline` ~6742, `ImageField` ~2552, `ImagesField` ~2637,
`RowThumb` ~3320, `imgVal`/`imgsVal` ~4642, `repeaterRows`, `ImageEditorHost` ~7690) · `ImageEditor.jsx` · new `imageFiles.js` ·
`EncoreSection.jsx` (`Photo` ~1683, track art ~9944, explicit-`src` sites: gallery, media, pricing, form) · `data.js`
(`PHOTO_OFF`, `inlineRule`, `fieldShown`) · `scripts/inline-probe.mjs` · `notes/photography.md`, `CLAUDE.md`.

## Verification

- `cd source && npm run dev`. By hand on Retro, Lime, Grunge, Editorial, Pop: select a section, click each photo →
  crop editor opens on that photo; **Upload another** swaps the source, Apply replaces it on the canvas and the panel's
  thumbnail agrees; Cancel / Escape leaves the page untouched; click an initials placeholder → file picker → crop → placed;
  gallery tile *i* changes only tile *i*; a media track's art changes only that row; a click on copy still edits copy;
  first click on an unselected section only selects; a phone-width window does nothing.
- Edge: PNG over 4 MB and a GIF are refused with the toast + inline line, in the dialog and from an empty slot; baked
  photo → Edit reopens its original (`ORIGINALS`); seeded photo → Edit bakes the seed.
- Probe: `node scripts/photo-probe.mjs --theme T --layout N --width 1440,768 --check` PASS for every page in the passes;
  re-run `inline-probe.mjs --check` on Retro / Pop layout 1 after the `Photo` sweep (must stay PASS: the marks must not
  change text hit-testing); `node scripts/digest.mjs` before / after the sweep shows no style change (marks only).
- `npm run build` and `npm run build:standalone` succeed.

## Log

**Step 0 · foundations — done 2026-10-23 on branch `photo-edit`, three commits.**
- *a. Upload another* (`dfbb6cb`): `imageFiles.js` + the dialog button; tested from the panel's Edit: a GIF and a 4.2 MB PNG are refused
  with the line and the toast, a good pick swaps the source and resets the frame (title *Frame your photo*), Apply writes, Cancel writes nothing.
- *b. `data-photo` sweep* (`d30b613`): `digest.mjs` before / after over 660 renders (5 templates × 3 widths × every cat × layout): **0 files
  differ**. A scan of the same renders: no `<img>` without a mark, no slot reading `undefined`; testimonials, map, repertoire and footer carry none.
  `vm.tracks[].row` added (the index in `c.tracks`; the printed rank skips blank rows). `inline-probe --check` stayed PASS (Retro 156/143, Pop 155/142).
- *c. the canvas feature*: see `notes/photography.md` ("Clicking a photo on the canvas"). Smoke-tested by hand, not yet by a committed probe.

Found on the way: a text node can wrap a photo (Lime layout 3's gallery heading), so `targetAt` lets the photo win over a text hit that contains it.

Open for Step 1 (the probe): the stack rule has only been measured on Retro 1, Pop 1, Editorial 2, Lime 3 and Grunge 4, with a point-grid search
rather than a centre click; Pop's sparkles and any decoration that is not `pointer-events: none` may block a photo (an `svg` blocks by rule);
a header avatar was `hidden` on Lime 3 (under another element or clipped: check whether that is a real dead spot).

**Step 1 · the probe — done 2026-10-23 on branch `photo-edit`. No app code changed; the one new file is `source/scripts/photo-probe.mjs`.**
- **What it is.** A sibling of `inline-probe.mjs` (its page helpers copied, since that file runs on import): `--theme --layout --width 1440,768
  --cat --check`, plus `--blank` (empties every photo slot first: single photos `null`, lists `[]`, track rows rewritten as a title and no picture, so the file-picker path,
  the initials / gradient placeholders and the append write are the ones walked) and `--every` (the write test on every node, not once per
  slot). Universe = `photoSlots(sec, theme, true)`. Per `[data-photo]` node it aims at a grid of points over the node's visible rect (centre
  first, keeping points where the node is in the stack with no other photo above it), clicks with the real mouse until one opens something, and
  records **hit** / **WRONG** / **NOT-RESTORED** / **blocked** / **copy** / **hidden**, then per slot MISSING / not drawn / off, and
  UNLEDGERED across both widths. A *hit* is: the crop dialog titled *Edit photo* framing the very picture the panel shows (filled), or the
  file picker (empty); Escape leaves `c` and the section's HTML as they were; and, on the first node of each mark, a fixture PNG pushed
  through the dialog's input and Applied changes **only** that slot's key, list index or track row, in no other section, with the list's other
  items and the row's other cells untouched; then `c` is put back. A native picker never opens: `HTMLElement.prototype.click` on a file input is
  hooked, and the probe hands the tagged input the fixture. Last line `photo-probe: PASS|FAIL`; positive control first (a header photo must open
  and write its own slot, exit 2 otherwise). It also reports **partial** (not failing): per node, the share of a 12 x 12 grid of its visible area
  where the app's own `photoFieldAt` opens it, and what stops the rest.
- **It can fail.** Two mutations, run and reverted: `photoWrite` writing `list[0]` instead of `list[idx]` → 6 WRONG ("item 0 changed; item N is
  not the upload") and 5 MISSING on Retro 1's gallery; `PHOTO_OFF = { 'Retro.*.gallery.images': … }` → the seven gallery slots `off`, their nodes
  open nothing, PASS.
- **Retro layout 1, `--width 1440,768 --check`: PASS**, 17 slots hit at each width (header image + avatar, bio, five tracks, seven gallery tiles,
  calendar, form), 0 WRONG / NOT-RESTORED / MISSING / not drawn / blocked / copy / hidden / UNLEDGERED, and the same with `--blank` (all
  the above on empty slots: 7 gallery appends). Pricing, repertoire, map, testimonials and the footer carry no photo on layout 1. `PHOTO_OFF`
  stays empty.
- **Re-run with the final file** (after the last edits to the script): Retro 1 default and `--blank`, Editorial 2 `--blank`, both widths, `--check`: PASS.
- **Also run, same flags, all PASS and not yet claimed as passes** (Step 3 / the pass files re-run them): Pop 1, Lime 3, Editorial 2, Grunge 4,
  default state and `--blank`. Editorial 2's `--blank` lists pricing's three faces as *not drawn*: an emptied list draws none of them, so there is
  nothing to click and the panel's Add stays the only way to start them (`--blank` therefore skips the UNLEDGERED check; the default run owns it).

**Open questions from Step 0, settled by the probe:**
- **Pop's decorations.** Nothing is a dead spot: every Pop node on layouts 1 to 4 opens at its first point, 0 blocked (layout 1 at both widths with `--check`; layouts 2 to 4 at 1440 only, no `--check`). What the
  `svg` rule costs is a small share of a photo's area: the Pop layout-1 gallery tile 3 loses 5 of 144 points to stickers, the header hero 3 to 4
  of ~140 to its seal / sparkle (circle, path), the layout-3 bio 13 of 144 to the seal ring. The larger shares are copy (a caption, a nav link:
  header heroes keep 78 to 85% of their area, the layout-4 bio card 76%, which is "copy first" working as designed) and the media rows' play
  discs and numerals. Decision: **keep `blocksPhoto` as it is** (an `svg` blocks). Letting a non-interactive svg through would make a click on a
  seal's disc replace the hero behind it, where a seal is its own thing (its badge text is a text slot), and gains a few percent of area. No
  `PHOTO_OFF` row.
- **Lime layout 3's hidden avatar.** Did not reproduce. The header avatar opens at 1440 and 768, with 140 of 140 grid points open at 1440. Why the
  Step 0 throwaway saw it `hidden` is not known (its point grid, or a different state); the probe never goes under 1440, so 390 is unmeasured, and a
  phone is out of scope for the feature anyway.
- **The append call. Keep it.** On the five pages run in the default state (Retro 1, Pop 1, Lime 3, Editorial 2, Grunge 4) `appended` is 0: the seeded
  list covers every tile drawn. (Step 0's note that Lime / Pop galleries draw more tiles than the seed holds was not borne out on Lime 3 or Pop 1; the
  other layouts' galleries are Step 3's to check, and any default-state `appended` line the probe prints there is a finding to record, not noise.)
  Past the end of a list a tile exists after the panel's Remove has spliced it, and then the panel's own Add tile is the one thing that can fill
  it, and it appends. So a canvas click that appends is the panel's behaviour reached from the picture.
  The alternatives stay worse: padding with `null` flips every tile in between from the section-photo fallback to a placeholder, and collides
  with Remove-writes-`null`. What is lost is exact only when two or more tiles are free and the click is not on the first: the photo lands on
  the first free tile. Pass files note it once; nothing to build. `--blank` pins the behaviour (list length + 1, earlier items untouched, the
  upload at the end).

`--blank` walks track rows too (all 21 Retro 1 nodes empty, picker path). Not covered by the probe: the phone (the canvas editor is off there; the probe's window never goes under 1440), hover outline and cursor, the
panel → canvas box, and a refused file from an empty slot (checked by hand in Step 0).

**Step 2 · the Retro layout-1 pilot — done 2026-10-23 on branch `photo-edit`.** By hand (puppeteer drivers over the dev server, screenshots read
by eye; the drivers are throwaways) and the Pop layout-1 hit-test spike. Two code fixes came out of it, both in `EncoreBuilder.jsx`.
- **Hover.** All 17 slots (21 nodes) on a selected section: wrapper cursor `pointer` and a box on every node a click can reach, filled and with
  `--blank`'s placeholders alike. Measured on a 60 x 60 grid over each node's painted area (the node topmost of its photos): the box misses
  at most 3% of what shows and, before the fix, overshot a **tilted** frame by 18% (bio card, 6 degrees) and 31% (the front calendar polaroid, 15
  degrees). **Fix: `photoBox`** (beside `photoNodeOf`) measures the visible rect untilted and carries it by the card's own matrix, `placeBox`'s
  rule (`tiltChain` / `untilted`), so the outline turns with the picture; read on screenshots of the bio card, both calendar polaroids and
  the gallery's tilted spotlight. The hover box and the panel's focus box both draw through it. No tilted ancestor on any template's layout 1 carries a
  transition or animation (measured, 5 templates), which `untilted`'s restore would otherwise start; **Step 3 re-measures that per layout.**
  Round frames (the header avatar, the form's 39px disc) get a square outline: the same pixels as before, accepted.
  A node whose centre lies under another card's solid frame (the calendar's back polaroid) shows no box there and opens nothing: the rule working.
- **Panel -> canvas.** Focusing a photo field walks the canvas and boxes it, 6 of 7 fields (header image + avatar, bio, gallery, calendar,
  form), after the smooth scroll lands. **Gap found and fixed: the five media tracks.** `tracks` is a repeater, not an `image` field, so a focus on a
  row's art button reported no photo. `EditPanel`'s focus wrapper now reads the button's label (`Edit` / `Add artwork for track N`) and reports
  `tracks:N-1` as the photo, which `photoNodeOf` finds as its mark. Tested on a track thumb: the box is that row's art. Remaining, accepted:
  a tall photo counts as in view once its *top* is in the band (`scrollFieldIntoView`'s text rule), so a 487px bio photo can stand half below the fold.
- **Emptied slots.** `photo-probe --blank --check` (below): picker, crop, placed, on all 17 (7 gallery appends), both widths.
- **Refused files from an empty slot.** A GIF and a 4.5 MB PNG: the picker opens, the file is refused with the toast (*Please choose a PNG or
  JPG*, *That image is 4.8 MB, the limit is 4 MB*), no dialog opens, `c.image` stays `null`. **Toast only, no inline line:** the canvas has no control to
  hold a line (the plan's "toast + line" holds in the dialog, where *Upload another* prints one, checked in Step 0).
- **Copy, selection, phone.** A click on the header title with the header selected opens the text box, not the photo. The first click on an
  unselected section only selects (no dialog, no picker; the second click opens it). A 390-wide window: a selected section's tile gives no
  cursor, no dialog, no picker. Nit, not fixed: deselecting with Escape while the pointer rests on a photo leaves the wrapper's `pointer` cursor
  until the pointer moves (the text rule's `text` cursor does the same).
- **The hit-test spike, Pop layout 1 (both widths, `--check`: PASS, 17 slots each).** Per-node share of the node's reachable area (14 x 14 grid, the
  app's own `photoFieldAt`) that a click opens: gallery tiles 96-100%, header avatar 100%, header hero 78%, media rows 94-100%.
  *What stops the rest, header hero (22%):* copy: the title words (25 of 246 points), nav links (5), the tag pills and Book now (8); decoration: the
  seal and sparkle's svg (9); nothing else (0 unexplained points). *Media rows 0 and 2 (6%):* the **next row's opaque card**, which Pop pulls up
  over the previous row's art by about 4 of its 50px: a real occlusion, so a click there is rightly row 2's card, not a dead spot. *Gallery tile 3
  (4%):* two stickers' svg and a counter. **No element above any photo on Pop layout 1 or Retro layout 1 has a translucent ground** (alpha in
  (0, .9): none at any of 17 + 17 slots), so the `alpha >= .9` threshold is not exercised by either page: it cannot be wrong there, and
  neither a lower nor a higher cut would change one click. **Decision: `blocksPhoto` and copy-first stay as built; the svg-blocks decision
  stays** (the spike showed no dead spot: every lost point is copy, a control, an svg or a real card). Pop layouts 2 to 4 are Step 3's, which
  is where a translucent ground, if any page has one, will show.
- **Regressions, after the last edit.** `inline-probe --theme Retro,Pop --layout 1 --width 1440,768 --check`: **PASS**, the counts of Step 0 (Retro 156 / 143
  slots hit, Pop 155 / 142; 0 WRONG / NOT-RESTORED / MISSING; Retro's one dead click is the report-only kind it had). `photo-probe --check`: **PASS**,
  Retro 1 default and `--blank` and Pop 1, both widths, 17 slots each, 0 WRONG / NOT-RESTORED / MISSING / blocked (`--blank`: 7 gallery appends).
  `npm run build` and `npm run build:standalone` succeed; `index.html` not touched.

**Step 3 · layout 2, Retro · Lime · Grunge · Editorial · Pop — done 2026-10-23 on branch `photo-edit`. No app code changed** (nothing to fix; the
probe's `PHOTO_OFF` stays empty). Layout 2 is the same twenty slots on every template: header image + avatar, bio, five media tracks (fan card +
list row each, 11 nodes), seven gallery tiles, three pricing faces, form stage photo + portrait.
- **`photo-probe --theme T --layout 2 --width 1440,768 --check`: PASS on all five, 20 slots hit at both widths**, 0 WRONG / NOT-RESTORED / MISSING / not
  drawn / dead spot / off / blocked / copy / hidden (Retro 31 clicks, the others 35). **`appended` is 0 in the default state on all five**: the seeded
  `c.images` covers every gallery tile and every pricing face layout 2 draws, so the carried-forward "default-state appended is a finding" check found nothing.
  `--blank`: PASS on all five, 17 slots hit, the 7 gallery tiles `appended` (the pinned behaviour: list + 1, earlier items untouched), and pricing's three faces
  *not drawn* (an emptied list draws none; the panel's Add is the only way to start them: as Editorial 2's was in Step 1; `--blank` skips UNLEDGERED).
  What `partial` reports is copy, controls and cards, never the middle of a photo: bio 83-86% open (copy), fan cards 82-85% (**the next card over them, below**),
  pricing faces 82-92% (static spans, i.e. copy), gallery tile 3 93-99%.
- **`inline-probe --theme T --layout 2 --width 1440,768 --check`: PASS on all five** (155-157 slots hit, 0 WRONG / NOT-RESTORED / MISSING; Retro's one dead click is
  `header.location`, the vertical `Manchester, UK` rail, which the script's header names as a skipped kind). The marks changed no text hit-testing.
- **Transition / animation on a tilted ancestor (carried forward; `photoBox` relies on `untilted` restoring `transform` and `transition`).** Re-measured on every
  photo node of layout 2, five templates, both widths: the transformed ancestors of a photo are the header hero's 2 degrees (Retro only, desktop) and the media
  fan's five cards (a 0 degree card among them). **None has a transition duration or an animation** (`transition-duration: 0s`, `animation-name: none`
  on all 5-6 per page, 10 pages), so `untilted`'s restore starts nothing. Layout 1's measurement (Step 2) still holds; layouts 3 and 4 re-measure.
- **Translucent ground above a photo (carried forward). One finding, kept.** The only thing above a photo with a non-opaque paint is the media fan: each card
  but the front sits at `opacity: .82` (a dimmed card, an opaque background at 82%) and lies over the outer cards' art: `tracks:1`'s card over `tracks:0`'s,
  `tracks:3`'s over `tracks:4`'s (Editorial's desktop list-row node of `tracks:2` carries one as well), at 11-12 of 66-74 sampled points per outer card; no `rgba` background below `.9` and no
  `backdrop-filter` or blend mode over any photo. `blocksPhoto` reads the colour's alpha, so the card (background alpha 1) blocks: a click there opens nothing of the back
  card, which is right, because what the user sees is a card face. **Do not fold `opacity` into that read** (the model's call, not the user's): .82 x 1 < .9 would let the click through to a photo
  the user sees only through the card, and the probe's own count (0 blocked, 0 copy) says no node loses its middle. The alpha-in-(0, .9) range remains
  unexercised by any page of layouts 1 and 2; layouts 3 and 4 carry the question forward.
- **Hover outline, every node (26 per page x 10 pages, a real mouse over the app's own `photoFieldAt` points, 60 x 60 grid over the painted area).** A box on
  every node, cursor `pointer`; of the painted points that fall outside the box: Retro's header hero (2 degrees) 0.4%, the fan's tilted cards 0-3%
  (Retro 2.9% worst), everything upright 0%; the box's area equals the node's own layout area on every tilted card (quad / layout = 1.00, so the outline
  turns with the picture and does not take its bounding rectangle, which is 7-36% larger). Read on screenshots too: Retro's tilted hero and fan card, Pop's
  fan card, Editorial's arch and gallery spotlight, Pop's bio card. **Clipped frames keep a square outline**: the Editorial arch (header and bio) and Pop's
  rounded bio card draw the 2px box over their corners, the tint on the paper beyond the arch; the pilot's "round frame gets a square outline" call,
  kept, and the arch is its most visible case. If it is ever fixed, `visibleRect` knows which ancestor clipped and could hand the box its `border-radius`.
- **Panel -> canvas (12 targets per page x 10 pages).** Focusing each photo field's control (header Background photo and Artist photo, bio Photo, gallery Photos,
  pricing Reviewer photos, form Portrait and Stage photo) and each of the five tracks' art buttons: the canvas scrolls (smooth, from the top of the page) and the box
  lands on the picture, overlap 1.00, inside the viewport, 12 of 12 on all ten pages. **One real finding, not a harness quirk (chrome a11y, predates this branch: `FILE_INPUT`, commit 2342c2f).**
The panel's `ImageField`, `ImagesField` and `RowThumb` each hold a visually hidden `<input type=file style={FILE_INPUT}>` with no `tabIndex`, so Tab reaches it,
and its `position: absolute` has no positioned ancestor inside the panel's scroller, so it sits in the `overflow: hidden` app shell below the fold. Measured on pricing's
*Reviewer photos* (Retro 2, 1440): Tab from the textarea above it focuses the input and the shell scrolls 1079px (the canvas scroller's top goes 56 -> -1023), the
whole app shifted up a screen with no scrollbar to undo it. A keyboard user tabbing down the pricing panel hits it. (Measured on `ImagesField` only; `ImageField` and `RowThumb` share `FILE_INPUT` and are not tested.) Fix, not made here (outside this feature, the
user's call): `tabIndex={-1}` on the three inputs (the visible button does `inputRef.click()`, so nothing is lost), as the new root-level `photoFile` input already has.
The driver now focuses the visible button instead. **The hover "no box" on 19px faces** in the first driver run was the driver's first grid point: a direct move onto a
face's centre shows the box and the pointer cursor at once (checked, all three faces, with and without an approach step), so it is not a lost hover; the cause of the first point
missing is not isolated.
**The fan's hover box draws over the front card** (new here, the same class as the arch): a back card's photo is partly under the next card, and the outline is the photo's
whole (tilted) rectangle, so on `tracks:1` it runs across the front card's *Slow Burn* title. Measured: 950-1300 of 3600 grid points inside the box are not the node's
painted pixels on the four tilted fan cards (the upright centre card: 0), on every template. The click rule is right (the front card wins there); only the outline over-promises.
- **An emptied slot** (the picker, the crop, the placement): the `--blank` run above, all 17 slots, both widths, five templates.
- **Drivers.** The by-hand measurements are throwaway puppeteer scripts over the dev server (the probe's page helpers); nothing new is committed in `scripts/`.

**Step 3 · layout 3, Retro · Lime · Grunge · Editorial · Pop — done 2026-10-23 on branch `photo-edit`. No app code changed** (nothing to fix; `PHOTO_OFF` stays
empty). Layout 3 draws fifteen slots on every template: header image + avatar, bio, five media tracks (one row each: no fan, 5 nodes), seven gallery tiles.
Calendar, pricing, form, repertoire, map, testimonials and footer carry no photo here (the calendar's and the form's `image` read designs `[0, 3]` / `[0, 1]`).
- **`photo-probe --theme T --layout 3 --width 1440,768 --check`: PASS on all five, 15 slots hit at both widths**, 0 WRONG / NOT-RESTORED / MISSING / not drawn /
  dead spot / off / blocked / copy / hidden, 16 clicks per page. **`appended` is 0 in the default state on all five** (the seeded `c.images` covers all seven
  gallery tiles): the carried-forward check found nothing. `--blank`: PASS on all five, both widths, 15 slots hit, the seven gallery tiles `appended` (list + 1,
  earlier items untouched). `partial` is copy and nav on the header hero (108-123 of 124-143 points open, spans, two nav links) and the seal's ring on Lime's and Pop's
  bio (127-128 of 144: circle, textpath, svg): the svg-blocks rule, as in Step 1.
- **`inline-probe --theme T --layout 3 --width 1440,768 --check`: PASS on all five** (Retro 166, the others 167 slots hit; 0 WRONG / NOT-RESTORED / MISSING / dead click).
- **The composed row, measured first.** At 1440 on every template bio and media stand in the left cell (646px wide, x 370) and the calendar in the sticky right
  cell (305px, `position: sticky; top: 0`); the cell holds no photo, so nothing of this feature sits on the sticky box. Both left sections are `column: true`
  (no horizontal padding) and are ordinary static wrappers, so `visibleRect` and `photoBox` behave as on layouts 1-2: hover boxes on the bio photo and the five
  track arts cover the painted area (0% of painted points outside the box). **Panel -> canvas inside the row:** bio Photo and the track art buttons (tracks 1, 3, 5),
  each started from the top of the page and from the bottom (the scroll is smooth, so the driver waits for `scrollTop` to settle): the box lands on the picture,
  overlap 1.00, inside the scroller, 14 of 14 per page x 5 pages at 1440 and 768, and the same with every slot emptied (`--blank`, through the hidden file input).
  At 768 nothing composes (full-width sections), same result.
- **Transition / animation on a tilted ancestor (carried forward).** Re-measured on every photo node of layout 3, five templates, 1440 and 768: **Retro's header
  avatar is the only transformed ancestor of any photo** (a polaroid, `matrix(.997, .077, ...)`, about 4.4 degrees), with `transition-duration: 0s` and
  `animation-name: none`; the other four templates carry none. `untilted`'s restore starts nothing. Layouts 1 to 3 are measured now; layout 4 re-measures.
- **Translucent ground above a photo (carried forward). None.** Layout 3 has no media fan, and no element above a photo has a background alpha in (0, .9)
  (the probe's `blocked` is 0 and the partial lists name only spans, nav, svg and a div). The range stays unexercised by any page of layouts 1 to 3.
- **Hover outline, every node (15 per page x 10 pages, a real mouse, 40 x 40 grid over the painted area).** A box and the `pointer` cursor on every node; 0% of painted
  points outside the box on all but Retro's tilted avatar (0.3% at 1440, 0.4% at 768, the same class as layout 2's polaroid), where the box carries the card's matrix.
  Read on full screenshots: Retro's tilted polaroid (the outline turns with the picture), Pop's bio photo, Editorial's header hero and its arch-framed avatar, Lime's
  gallery tile, Grunge's media row art. **Clipped frames keep a square outline**, unchanged (Lime's rounded gallery tiles, Editorial's arch avatar, whose box shows
  over the corners). **Back-card outline: none on this layout**, since layout 3's media has no fan; each row's art is an upright 63px square, boxed alone.
- **Panel -> canvas, tracks (carried forward).** Layout 3 draws media art in each row: the art buttons box their row on all five templates, default and blank.
  Header image and avatar, bio, gallery: overlap 1.00 on all ten pages. Two things the driver is not a finding for: on **tablet the header's tall photo** (1004px
  against an 844px scroller) cannot fit, so its top is in view and the box runs past the fold (the Step 2 "a tall photo counts as in view once its top is in the band"
  rule), and the 200px **avatar** can stand with its foot below the fold on Retro and Editorial at 768 (the pilot's accepted nit).
- **Two findings about the harness and one about chrome, none fixed (the user's call).**
  (1) **The hover is throttled with no trailing call** (`probeInline`, 120 ms): the last `mousemove` of a quick approach can be dropped, leaving the cursor and box at the
  previous position. This is the cause of layout 2's "first grid point missed" on 19px faces (a move with `steps` inside 120 ms reproduces it; a 170 ms gap does not).
  Not fixed: a real pointer keeps generating events, and the text rule shares it. (2) **`scrollIntoView` in a driver scrolls `overflow: hidden` boxes**: the probe's and
  the driver's aim (`block: 'center', inline: 'center'`) shifted Grunge's header image inside its clipped box by (93, 191) and the panel focus box then looked 63%
  off; resetting those `scrollLeft` / `scrollTop` first cleared it. A harness artefact (the app's own scroll never calls `scrollIntoView`); photo-probe is unaffected
  (it clicks at the point it measured). (3) **An emptied field's only focus target is its hidden file input** (see `notes/photography.md`): a click on the drop zone
  opens the picker and does not walk the canvas, Tab does. The `FILE_INPUT` tab-stop fix from layout 2 stays open; note it would also *remove* this route, so if it is
  made, the drop zone wants a `tabIndex={0}` and `role="button"` of its own, or the panel -> canvas walk is lost for an emptied field.
- **Drivers.** Throwaway puppeteer scripts over the dev server in the job's scratch directory (the probe's page helpers); nothing new is committed in `scripts/`.

**Step 3 · layout 4, Retro · Lime · Grunge · Editorial · Pop, and Retro's layouts 5 and 6 — done 2026-10-23 on branch `photo-edit`. One code fix, in `photoBox`** (below); `PHOTO_OFF`
stays empty. Layout 4 draws sixteen slots on every template (18 nodes): header image + avatar, bio, five media tracks (a sleeve and a grid of tiles: track 0 is drawn twice, as the
sleeve and as its tile, tracks 1 to 4 once), seven gallery tiles, and the calendar's `image` (design `[0, 3]`). Pricing, form, repertoire, map, testimonials and footer carry none.
- **`photo-probe --theme T --layout 4 --width 1440,768 --check`: PASS on all five, 16 slots hit at both widths**, 0 WRONG / NOT-RESTORED / MISSING / not drawn / dead spot / off / blocked /
  copy / hidden. **`appended` is 0 in the default state on all five**: the carried-forward check found nothing. `--blank`: PASS on all five, 16 slots hit, the seven gallery tiles `appended`
  (list + 1, earlier items untouched). `partial` is copy (`p`, `span`), nav and svg: the bio photo 120 of 144 points open under Editorial (24 are the card's prose), the tracks' tiles
  114 to 135 of 132 to 144 (spans), the header hero 112 of 129 (copy, a seal's svg). One flake, not reproduced: the first Editorial run, five browsers at once, reported one WRONG at 768
  (*the dialog frames null*, `header.avatar`: the probe read the dialog before its `<img>` had mounted). Alone: 3 of 3 header runs and a full default run PASS; the five-at-once load is the likely
  cause, not isolated. Run the probe a few at a time.
- **Retro layouts 5 and 6, `photo-probe --theme Retro --layout 5|6 --width 1440,768 --check`: PASS, default and `--blank`, 17 slots hit at both widths** (their body is layout 1's page, so it is
  Retro layout 1's 17: header image + avatar, bio, five tracks, seven tiles, calendar, form; the header is the only section that differs). 0 WRONG / NOT-RESTORED / MISSING / blocked; `appended` 0
  default, 7 `--blank`. Layout 5's header hero is the most covered photo of the pass (99 of 144 open at 1440, 76 of 143 at 768: divs, spans, links and the title's copy, none unexplained).
- **`inline-probe --theme T --layout 4 --width 1440,768 --check`: PASS on all five** (Retro 152 / 149 slots hit, the others 151-152 / 148-149; 0 WRONG / NOT-RESTORED / MISSING / dead click).
  `--cat header` on Retro 5 and 6, both widths: PASS (11 slots hit each; 5 has 2 `off`). The rest of those two pages is layout 1's, whose full inline pass is Step 2's; not re-run.
- **Transition / animation on a tilted ancestor (carried forward): closed, layouts 1 to 6 measured.** Layout 4: Retro's gallery tile (-2 degrees), Editorial's track-0 sleeve (-2.3) and gallery tile (-1), and
  Lime's header hero, whose `img` is itself rotated 180 degrees (the node). Retro 5 and 6, as layout 1: the hero (-6), the five track cards (+-1), the gallery spotlight (-2), the calendar's three
  polaroids (28.7, 3.2 and 15). **None has a transition duration or an animation** (`0s`, `none`), so `untilted`'s restore starts nothing.
- **Translucent ground above a photo (carried forward): the range is now exercised, one finding, kept.** Layout 4's bio is a photograph with an overlay card of copy, and the card is a glass
  panel: `backdrop-filter: blur`, background alpha **.5 Grunge, .71 Lime, .8 Editorial and Pop** (Retro's card is opaque). It lies over **84 of the photo's 196 grid points at 1440** (60 to 72 at
  768), 43% of its area. The `alpha >= .9` cut lets a click through it, so a click on the card face (outside its copy and Listen link, which win as text and a control) opens the bio photo.
  **Kept, the model's call, flagged for the user:** no other slot lives on the card face, so a blocking card would leave 43% of the picture a dead spot and open nothing; the outline boxes the
  whole picture, under the card too, which says what the click replaces. No cut is more principled than another: .5 would block Grunge's, Lime's, Editorial's and Pop's cards, .75 only
  Editorial's and Pop's, and the rule stays one number. **Small ones, found by the same survey (a 14 x 14 grid over every photo node, the stack above it read for background alpha, backdrop
  filter and blend mode):** a 92 x 97 element at alpha .18 over Retro's header hero on layouts 1 and 4 (2 to 6 of ~190 points), .12 on layout 5's (4), and a `span` at .15 over Lime layout 1's
  track-0 art (10 of 192, the one on a media photo). All let the click through and cost nothing visible. **Step 2's "no translucent ground on Retro layout 1" was wrong by that one element;**
  layouts 2 and 3 have none (re-surveyed here, five templates, both widths), so the earlier steps' conclusions about *their* pages stand.
- **Hover outline, every node (18 per page x 10 pages for layout 4, 21 for 5 and 6; a real mouse with a 200 ms gap between moves, a 40 x 40 grid over the painted area).** A box and the `pointer`
  cursor on every node; painted points outside the box: 0% on every upright node, **0.1 to 0.3% on a tilted one**, and on the calendar's three polaroids (Retro 1, 5 and 6 share the page) 2.8 / 1.2 / 0.6% on layout 1, 2.3 / 1.2 / 0.4 on 5 and 2.4 / 2.3 / 0.4 on 6 at 1440, at most 1.2% at 768
  (all re-measured after the fix below; before it, 68 / 15 / 7%). The box's area equals the node's own layout area on every tilted card (quad / layout 1.00). **Clipped frames keep a square outline** (the pilot's call): Pop's pill
  gallery tiles show 18 to 22% of the box beyond the picture, the calendar's 999px disc 16 to 19%, Pop's avatar 12%, Retro's 20px gallery tiles 5 to 6%, Lime's header and the other rounded
  wells 0.5 to 3%. **Back-card outlines: none on layout 4** (the media is a sleeve and a grid, no fan; the sleeve's own tilt, Editorial's, is carried by the matrix). **Retro 5 and 6 (layout 1's body) have one:
  the calendar's polaroid stack.** The two back polaroids' outlines are their whole (tilted) rectangles and run over the front card, 86 and 91% of each box lying off its own painted pixels,
  the fan's class (layout 2); the click rule is right (the front card wins), only the outline over-promises. Read on screenshots: Retro's front polaroid and both back ones, Pop's bio card.
- **The fix: `photoBox` clipped a tilted photo by a clip that does not tilt.** With the card laid flat, `visibleRect` still intersected the photo with every `overflow` ancestor up to the section,
  and an ancestor above the tilted card stands still while the flat card can reach past it: on Retro's calendar (layouts 1, 5 and 6, 1440) the 15-degree front polaroid was laid past the calendar
  card's `overflow: hidden` edge, and its outline was cut to 240 of the picture's 282 px, **68%, 15% and 7% of the three polaroids' painted points outside the box** (Step 2 read this page as
  at most 3%; its driver is gone and the difference is not isolated). `visibleRect(node, root, upTo)` now stops at `upTo`, and `photoBox` passes the card's outermost tilted element: only the clips that turn
  with the card are measured, those above it are not. The outline can now overshoot where a tilted card really is cut by a standing clip (none on any page measured). **Edge:** a node that is itself the only transformed element (Lime layout 4's
  180-degree hero `img`) has `upTo === node`, and the climb starts at its parent, so every standing clip still applies there, as before the fix; at 180 degrees a rotated rectangle is its own rect, so
  nothing moves, and no other page has one. **Untouched:** the hit-test (`photoFieldAt`, `blocksPhoto`) and `photoNodeOf` (`visibleRect(n, root)`, no `upTo`, the same walk), which is why the
  probes were re-run on Retro 1 and Editorial 4 alone and Step 4 re-runs the rest. Re-measured after the fix over layouts 1 to 4,
  five templates, 1440 and 768 (hover on every node): a box and the pointer on every node, worst painted-outside 2.8% (the polaroid at 1440), no node moved for the worse.
- **Panel -> canvas (19 targets per page x 10 pages for layout 4, 21 for 5 and 6; header Background photo and Artist photo, bio Photo, gallery Photos, calendar Photo, each track's art button;
  the tracks, gallery and photo fields from the top of the page and from the bottom).** The canvas scrolls and the box lands on the picture, **overlap 1.00, inside the scroller: 19 of 19 (21 of 21)
  on every page, default and with every slot emptied** (the hidden file input and the `Add artwork for track N` buttons). The layout-4 pages and the `--blank` runs were measured before the `photoBox`
  change (it touches no layout-4 node's box: none has a standing clip above a tilted card); Retro 1 and 5, default, both widths, were re-run after it: 21 of 21. **That check is coarse on a tilted
  node:** it compares the focus box's bounding rectangle with the node's, so it would not have caught the polaroid's 85% clip; the hover grid above is the tilt check. **Which node a track's art button boxes on layout 4: the largest visible
  one with that mark.** Track 0 is the sleeve (249 x 282 at 1440), not its grid tile; tracks 1 to 4 their one tile (206 x 192). That is the node a user wants (the picture they are choosing), and both open the same row.
- **An emptied slot:** the `--blank` runs above (picker, crop, placement, 7 gallery appends), both widths, six pages x five templates (layout 4) and layouts 5, 6.
- **Drivers.** Throwaway puppeteer scripts over the dev server in the job's scratch directory (the probe's page helpers cut into a new file); nothing new is committed in `scripts/`.

**Step 3 is closed**: layouts 1 to 4 on all five templates and Retro's 5 and 6 are proved by `photo-probe --check` (default and `--blank`) and `inline-probe --check`, hover and panel focus measured on every page.
**Next: Step 4, the sweep and docs.** (1) Re-run `photo-probe --check` over every page of Steps 1 to 3 after the `photoBox` change (it touches hover and panel-focus boxes only, so the hit-test is
unchanged, but the plan says re-run after any shared-code change); (2) the optional file-drop on a canvas photo (cut if it fights the text editor's drag); (3) CLAUDE.md and `notes/photography.md` already
carry the feature, update what Step 4 settles; (4) `npm run build` and `npm run build:standalone`; `index.html` and `published.html` are refreshed only by the separate deliberate copy step.
Open for the user, none blocking: the `FILE_INPUT` tab stop (layout 2's log; fixing it removes an emptied field's only focus route, so give the drop zone a `tabIndex` and role first), the hover
throttle's missing trailing call, and the glass card's cut (above).

**Step 4 · sweep + docs — done 2026-10-23 on branch `photo-edit`.** One feature added (the file drop, in `EncoreBuilder.jsx`); `photo-probe.mjs` gained `--drop`; `PHOTO_OFF` stays empty.
- **Re-run after the `photoBox` change, nothing changed.** `photo-probe --theme T --layout N --width 1440,768 --check`, default and `--blank`, over all 22 pages (Retro / Lime / Grunge /
  Editorial / Pop x layouts 1 to 4, Retro 5 and 6), three browsers at a time: **44 of 44 runs PASS** (88 page-widths: 0 WRONG / NOT-RESTORED / MISSING / blocked / copy / hidden; default `appended` 0 on
  every page; `--blank` 7 gallery appends on every page; slots hit: layout 1 17, layout 2 20 (17 `--blank`, pricing's three faces not drawn), layout 3 15, layout 4 16, Retro 5 and 6 17). No flake at three at
  a time (Step 3's one came from five at once). `inline-probe --theme Retro,Pop --layout 1 --width 1440,768 --check`: **PASS**, the counts of Step 0 (Retro 156 / 143 slots hit, Pop 155 / 142; 0 WRONG /
  NOT-RESTORED / MISSING; Retro's one dead click the report-only kind it had).
- **The file drop: built, not cut.** The two cut conditions did not hold. *Text editor:* the editor is a `<textarea>` and a mouse selection; the drop handlers take only a drag whose types hold `Files`,
  so a text drag is never cancelled (negative control in the probe). *`EncoreSection`:* the handlers are the wrapper's, in chrome; the file keeps its two inert marks and no effect.
  Design in `notes/photography.md` ("Dropping a file on a canvas photo"). `photoPut` and `frameFile` were factored out of `startPhoto` and the root file input, which now share them with the drop.
  **Decisions:** (1) the hit-test is the click's, so a drop lands where a click opens; a drop on the title over a hero does nothing (a letter-by-letter alternative would let a drop through copy, and
  say less truthfully what a click would do); (2) a file drag over the selected section is cancelled even off a photo (`dropEffect: none`) so a near miss does not open the file in the tab; (3) the hover
  box is the drop highlight, cleared on `dragleave` to outside the wrapper.
- **`photo-probe --drop`** (header documents it): a `DragEvent` with a `File` at each node's aimed points, the `drop` sent only if the `dragover` was cancelled with an effect, then the click walk's own
  checks (the dialog titled *Frame your photo* on the dropped file, Escape writes nothing, Apply changes only that slot's key / index / row). A script-built `DataTransfer` ignores `dropEffect`, so the probe shadows it.
  Negative controls first: a text drag over a header photo is not cancelled and opens nothing; a file drag over a header link (or its copy, narrow) is cancelled with effect `none`. **Mutation:** the drop write
  disabled -> FAIL (positive control), reverted. **All 22 pages, 1440 and 768, default and `--blank`: 44 of 44 runs PASS** (88 page-widths, 0 WRONG / NOT-RESTORED / MISSING, the same slot counts as the click
  walk; `--blank` appends 7 on the gallery). Two harness fixes on the way, both in the negative control (no link to drop on at 768 where the nav collapses -> fall back to a line of copy; an emptied photo's initials
  are the photo's own copy -> skipped); the first sweep of layouts 1, 3 and 4 failed on those and was re-run whole.
- **By hand (throwaway drivers in the job's scratch).** Highlight appears on `dragover` over a photo and clears on `dragleave` to outside; with the inline text box open, a drop on the photo opens the crop dialog and
  closes the box, Escape leaves `c` untouched; a drop on the title copy is cancelled with no effect and opens nothing; an unselected section and an 800-wide (phone chrome) window do not cancel a file drag
  (the browser's default); no page errors. **A real browser drag (CDP `Input.dispatchDragEvent` with the fixture as a file) highlights and opens *Frame your photo*.**
- **Builds.** `npm run build` and `npm run build:standalone` succeed (`dist-standalone/index.html` 10.0 MB). `index.html` and `published.html` are not touched: the copy is the separate deliberate step.
- **Docs.** `CLAUDE.md`'s photo bullet and `notes/photography.md` updated.

**Open for the user (not decided here):**
1. **The glass card (layout 4's bio, alpha .5 Grunge / .71 Lime / .8 Editorial and Pop).** Still a click on the card face outside its copy opens the bio photo (43% of the picture); a drop does the same. Kept as
   built; if the face should block, the cut is one number in `blocksPhoto` (.5 blocks four of five cards, .75 two) and the face becomes a dead 43% of the picture.
2. **`FILE_INPUT`'s tab stop.** `ImageField`, `ImagesField` and `RowThumb` hold a visually hidden `<input type=file>` with no `tabIndex`; Tab reaches it, and on pricing's *Reviewer photos* it scrolled the app shell 1079px.
   `tabIndex={-1}` fixes that but removes an emptied field's only focus route (the drop zone is a plain `div`), so the panel -> canvas walk would be lost for an emptied field: the drop zone wants `tabIndex={0}` and
   `role="button"` (with Enter / Space opening the picker) first. Not made, outside this feature.
3. **The hover throttle's missing trailing call** (`probeInline`, 120 ms): the last `mousemove` of a quick approach can be dropped, leaving the box and cursor at the previous position. A real pointer keeps
   generating events, so unfixed; a trailing timer would fix it, and the text rule shares it.
4. **New, from the drop:** a file dropped on an *unselected* section, or on a phone, is the browser's: it opens the file in the builder's tab and the page is lost (uploads included). Predates this branch (only the panel's
   drop zones cancel a file drag). Cancelling file drags canvas-wide (`dropEffect: none` outside the selected section) would close it in a few lines; the drop would then wait for a selected section, as the click does.
