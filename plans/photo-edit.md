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

