# Seeded photography — working notes

Moved word for word out of `CLAUDE.md`'s *Intentional limits — not bugs* on 2026-09-30, so it
loads only when a session works on it. "Above" and "below" may point into `CLAUDE.md` or
another `notes/` file.

- **Every template seeds photography.** `defaultImage()` /
  `defaultImages()` / `defaultTrackArt()` in `photos.js` resolve through `SEEDS`, keyed by
  `T.name` — the same name-match as `headerFamily()` and the `retro` / `lime` / `grunge` /
  `editorial` / `pop` flags — and a theme with no row would seed nothing. Lime's row is its own shoot for the artist's pictures (`lime-*.jpg`)
  and Retro's files for the gallery strip, the track covers and the map raster; Grunge's row is a
  third shoot (`grunge-*.jpg`), black-and-white in the assets themselves — nothing desaturates, so
  an artist's upload stays in colour. Editorial's row is a fourth shoot, in colour
  (`editorial-*.jpg`): its hero is also its `photo` slot, its portrait card is also the form's
  avatar, and its gallery strip departs from the frame — the five pictures of its shoot and two
  crops of the hero — since the frame repeats one thumbnail and borrows Retro's spotlight. Pop's
  row is a fifth shoot, in colour (`pop-*.jpg`, its layout-1 session 0): its hero is also its
  `photo` slot, its portrait circle is a top-square crop of its own source while its Stacked
  stadium covers the whole source (`pop-stacked-avatar.jpg`, 480 × 600, Pop's layout-4 header:
  `SEEDS.Pop.avatars = { 3: … }`, which `defaultImage`'s avatar arm reads by design ahead of
  `avatar` — the one theme carrying `avatars`), the form's avatar
  and the calendar's crop are slots of their own, and its gallery strip departs from the frame
  — seven different pictures of the shoot — since the frame borrows four of Retro's. **Remove** writes `null`, not `undefined` — `undefined`
  deletes the key, and an absent key is exactly what selects the seeded photo, so it would come
  straight back. For the same reason `Photo` treats `src={null}` (this slot has no picture) as
  distinct from no `src` prop at all (fall back to `s.image`): an empty gallery slot shows the
  section photo and an emptied one does not, and the media player passes `null` for an art-less
  track row so it cannot inherit anything. **`media` has no section photo at all** — no `image`
  field, no `RETRO_PHOTOS.media` — because the player shows the artwork of the track it is on. `pricing` seeds an `images`
  array of three and no single photo: layout 2's reviewer faces under its quote.
  Two categories carry **two** independent single-photo slots, and `defaultImage` takes the
  field key for them: the header's are `image` (the scene) and `avatar`
  (the artist), and the enquiry form's are the other way up — its `image` **is** the artist,
  which layout 1 draws as a 48px circle, so layout 2's stage shot is a third key, `photo`.
  `Photo` also takes `ink`, the initials placeholder's colour, defaulting to `s.muted`: `muted`
  and `soft` are rgba of the **page's** text colour, so a section standing on its own sheet has
  to pass a pair that reads there (`Pager`'s `idle` precedent — additive, every earlier caller
  untouched).
- **A seed carries its own crop** (JP-129 … JP-133, user call, 2026-10-12). `FOCUS` in
  `photos.js` maps an imported seed URL to the `object-position` a cover crop of that file
  takes, and `seedFocus(url)` reads it. `sectionVm` resolves `vm.imagePos` (for `vm.image`) and
  `vm.imagesPos` (per slot of `vm.images`). Both are values, not closures, and `undefined` for an
  upload, an empty slot or a file with no entry. Lookup is by URL, not by "absent key", so an
  upload (a data URI of its own) never matches, and a seed left in an edited gallery array
  keeps its entry. In the standalone build the seeds are data URIs, and that is the string
  `vm.image` carries too. **One string per file is enough**: a cover only ever crops one axis, so
  a box wider than the file reads the y and a narrower one the x. The same entry serves a
  gallery tile and a 390 hero. Values are read off renders of every box the file stands in, not
  computed: the strip files are top-anchored (`50% 0%`), Grunge's drummer `50% 25%` (a top
  anchor left him at the tile's foot), Lime's hero `30% 50%` and Editorial's `68% 50%`. A file
  with no entry is centred. **Five sites read it, opt-in**: the gallery's layout-3 tiles and
  layout-1 spotlight (`notes/gallery.md`), the layout-3 bio's photograph wherever no crop was
  fitted (390 on the Lime tree), and the layout-1 and layout-4 heroes at 768 and 390. A crop
  fitted to a frame wins at the widths it was fitted for: the bio's desktop and 768 percentages,
  HeaderV0's desktop `50% 0%`, HeaderV3's desktop centre under Lime's flip. Every one of these
  sites departs from its frame, whose FILL is centred and cuts the same heads. A new site joins
  by reading `s.imagePos` / `s.imagesPos[i]`, and a new seed by an entry measured the same way.
  An editable focus for uploads was the tester's rival fix; it was answered differently (below).

## The image editor (user call, 2026-10-14)

Every upload opens `src/builder/ImageEditor.jsx` before it is placed: move, zoom, rotate (90° steps
plus ±45° straighten) inside a fixed frame. **The edit is baked**:
Apply renders the frame to a canvas (long edge ≤ 1600, source PNG stays PNG, JPEG q .9) and stores
the new data-URI *string*, so `c.image` / `c.images` / `tracks[].image` keep their shapes and
`Photo`, `seedFocus`, `NO_CLAMP` and `reach.mjs` know nothing of it. Metadata applied at render time
was rejected: it would touch every `Photo` site and the ones that hard-code `50% 0%`.

- The frame is `aspect: [w, h]` on the field's `FIELDS` entry (header image 16:9, avatar 1:1,
  bio 4:5, gallery 3:2, calendar / form portrait / pricing faces / track art 1:1, form stage 3:2).
  There is no ratio picker (user call, 2026-10-20, removing the Original / 1:1 / 4:5 / 3:2 / 16:9
  presets and the wide/tall flip): the frame is that `aspect`, or the photo's own shape for a caller
  that passes none. A baked crop is still drawn `cover` in boxes of another shape (the 390 hero is
  portrait), so the ratio is not a fit for every layout.
- `ORIGINALS` (module-level, bakedUrl → `{ original, tf }`, capped at 40) lets **Edit** reopen the
  source at its last transform instead of cropping cropped pixels. It is in memory only, like
  uploads; a baked image that fell out of it edits from its own pixels.
- Callers never mount a dialog: `editImages([{ src, aspect, edit?, onApply }])` queues and the one
  `<ImageEditorHost>` at the builder's root shows the head, so a multi-file pick edits in order
  (Cancel becomes *Skip photo*) and the dialog sits outside the mobile Edit drawer. The sheets pass
  `onInteractOutside={keepOnEditor}`, because closing the editor hands focus back to the page and
  vaul read that as the sheet losing focus and closed it.
- Cancel on a fresh pick writes nothing; *Use original* stores the file as picked. **Remove still
  writes `null`.** A filled `RowThumb` opens the editor on click (it used to open the file picker);
  its replacement is Remove, then add. Seeded photos can be edited too, which bakes the seed.
- **Upload another** (plans/photo-edit.md, user call, 2026-10-23): a footer button swaps the picture under the frame for
  a fresh pick without leaving the dialog (not in a multi-file batch, where it would fight *Skip photo*). `Editor` holds
  its source in state; the swap resets the transform, drops the `ORIGINALS` lookup and flips the title to *Frame your
  photo*; `onApply`, the aspect and the queue seat are the item's, unchanged, and Cancel still writes nothing. A refused
  file prints its line under the stage and toasts (`ImageEditorHost`'s `onToast`). The vetting helpers (`imageProblem`,
  `readImage`, `vetImages`, `IMAGE_MAX`) moved to `src/builder/imageFiles.js` so the dialog and the panel share them.
- Not done: a live preview of how the crop sits at 1440 / 768 / 390.

## The photo mark (plans/photo-edit.md, user call, 2026-10-23)

`Photo` in `EncoreSection.jsx` carries an inert **`data-photo="<slot>"`** on all three of its arms (the `<img>`, the
`backdrop` gradient, the initials well), and so does the media layout-4 tile's raw `<img>` and its numeral. It is the
canvas photo editor's only way to know which *field* a picture is: text cannot say (a seed URL is shared by several
fields, an empty gallery tile draws the section photo as its fallback, a placeholder is no `<img>`). It breaks
CLAUDE.md's old "two marks and no other", which was about text; CLAUDE.md now says so. No effect, no handler.

- **Slot names:** `image`, `avatar`, `photo` (the form's stage shot), `images:<i>` (index into `c.images`, the gallery strip and
  pricing's faces), `tracks:<row>` (row in `c.tracks`). Derived inside `Photo` where a caller passes no `src` (`avatar` →
  `avatar`, `src === undefined` → `image`); a caller that passes its own `src` passes `slot` too, or the node carries no mark.
- **`vm.tracks[].row`** is the track's index in `c.tracks`. The rows the page prints skip blank ones (`blankRow`), so the rank
  (`n`) is not the row the panel edits; the mark names the row. The sleeve and the now-playing disc take it from the track they
  show (`sleeveSlot`, `nowSlot`). The seeded list has `row === i`.
- **Pricing's reviewer faces** keep the stored index through the `filter(Boolean)` that skips a removed slot (`faces` is
  `{ src, idx }`), so face 2 stays `images:2` when face 1 was removed.
- Checked over every cat × layout × width × template (`preview.html`): no `<img>` without a mark, no slot reading `undefined`;
  testimonials, map, repertoire and footer carry none. `digest.mjs` before / after: 660 renders, 0 files differ.

## Clicking a photo on the canvas (plans/photo-edit.md, user call, 2026-10-23)

Code in `EncoreBuilder.jsx` beside `inlineSlots`: `photoSlots` (exported), `photoWrite`, `photoFieldAt` (exported), `blocksPhoto`,
`visibleRect`, `photoNodeOf`; `startPhoto` / `targetAt` / the hover box in the component.

- **Slot = mark.** `photoSlots` gives each slot a `mark` equal to the `data-photo` value (`image`, `images:2`, `tracks:1`), a `value`
  (what the panel shows: a url, or undefined = empty) and an `aspect`. `photoValue` / `photoList` are the panel's `imgVal` /
  `imgsVal`, so a click and the panel read one picture. A mark whose field the layout does not read, or `PHOTO_OFF` names, opens
  nothing (the walk ends at it).
- **Hit-test.** `document.elementsFromPoint` top-down. First `[data-photo]` wins. Before it, `blocksPhoto` ends the walk for a
  control or `svg`, an element whose own text lies under the pointer (`textBoxUnder`), a `url()` background, or a background colour at
  alpha ≥ .9. A gradient (every scrim), grain, an empty wrapper or a translucent fill lets the click through. It does **not** read
  `cursor`: it inherits, and the section wrapper's is set to `pointer` while a photo is hovered. Elements outside the section's own
  markup (its toolbar) end the walk too.
- **Copy first, except a wrapper.** `targetAt` asks the text rule, then the photo rule; a text node that *contains* the photo
  under the pointer loses to it. Found on Lime layout 3's gallery, whose heading's wrapper holds the tiles, so a click on a tile
  opened the heading's box.
- **Write.** Single → `setContent(k, url)`. `images` → the resolved list with the index replaced, or **appended** when the index
  is past the end (Lime/Pop galleries draw more tiles than the seed list holds; `null`-padding would turn the tiles in between
  from the section-photo fallback into placeholders). Product call, flagged for the pass files. `tracks` → the row with its
  `image` replaced.
- **Empty slot.** One hidden `<input type=file>` at the builder root (outside any popup that could unmount mid-pick) and a
  `photoPick` ref; `vetImages` → `readImage` → `editImages` (a fresh pick, so no `edit`). Cancel anywhere writes nothing.
- **Hover and focus.** `probeInline` sets `pointer` and a 2px box (`photoHover`) round the part of the photo that shows
  (`visibleRect` clips by every overflow ancestor). `onFocusField` carries `photo: f.k` for an `image` / `images` field and
  `refit` boxes `photoNodeOf` (the largest visible node of that key). A media track's art button is not an `image` field, so `EditPanel`'s
  focus wrapper reads its label (`Edit` / `Add artwork for track N`) and reports `tracks:N-1`, the row's own mark. **Both boxes are drawn by
  `photoBox`**: a photo on a tilted card is measured untilted (`tiltChain` / `untilted`) and carried by the card's matrix, as `placeBox` does for
  text, so the outline turns with the picture (pilot, Step 2: a bounding rectangle overshot a 15-degree polaroid by 31%). `untilted` restores
  `transform` and `transition`, which would start a transition on a tilted ancestor that has one: none on any template's layouts 1 to 4 or Retro's 5 and 6 (measured, Step 3).
  **The card laid flat is clipped only by the clips that turn with it** (`visibleRect(node, root, upTo)`, `upTo` the outermost tilted element): a standing
  `overflow` ancestor above it cut Retro's front calendar polaroid's outline to 85% of the picture until Step 3's layout-4 pass. (A node that is itself the only transformed element, Lime layout 4's 180-degree hero, keeps every clip: harmless, a rotated rectangle is its own rect.) The hit-test and `photoNodeOf` do not use `upTo`. A round frame gets a square outline.
- **Proved by `scripts/photo-probe.mjs`** (`--theme T --layout N --width 1440,768 --check`, the photo twin of `inline-probe.mjs`; its header
  lists every flag and verdict). It clicks every `[data-photo]` node with a real mouse, checks that the crop dialog opens on the picture
  the panel shows (or the file picker, for an empty slot), that Escape leaves `c` and the HTML alone, and, once per slot, that a fixture PNG
  Applied through the dialog changes only that slot's key, list index or track row. `--blank` empties every photo first, track rows too (placeholders,
  the picker path, the append). A page is known good only once it passed; Step 1 passed Retro layout 1 (17 slots, both widths, filled and blank). Step 3 passed layouts 2, 3 and 4 on all five templates (20, 15 and 16 slots: layout 4's are header image + avatar, bio, five tracks, seven gallery tiles and the calendar's photo; both widths, filled and `--blank`) and Retro's 5 and 6 (layout 1's 17, header-only designs), and so closed Step 3.
  `PHOTO_OFF` is empty: no page has needed a row yet.
- **Decorations do not open a photo, and that is on purpose.** An `svg` over the picture (a seal, a sticker, a sparkle, an icon) blocks
  `photoFieldAt` as `blocksPhoto` has it, like a control or copy; measured on Pop layouts 1 to 4 it costs a photo a few percent of its area,
  never the middle of it (the probe's `partial` line says what is lost and to what). Do not let an svg through to gain it back: a click on a
  seal's disc would replace the hero behind it.
- **The solid-ground and copy-first rules, measured (Pop 1 and Retro 1, Step 2).** Nothing of any size above a photo on Pop 1 has a translucent
  ground, and on Retro 1 one 92 x 97 element at alpha .18 over the header hero (2 to 6 of ~190 points), so the `alpha >= .9` cut changes no click there worth naming. What stops a click is copy (a hero loses 22%, nearly all title words, nav and pills),
  an svg (4 to 9 of ~250 points) and a real card (Pop pulls each media row's opaque card up over the previous row's art by ~4 of 50px). Kept.
- **A dimmed card is a card (layout 2's media fan, Step 3).** Each fan card but the front sits at `opacity: .82` over an opaque background and lies over the
  outer cards' art. `blocksPhoto` reads the background's alpha (1), so the card blocks, which is what the user sees. Do not multiply `opacity` in: .82 would fall under
  the .9 cut and let a click through to art that shows only through a card face. The range *is* drawn on layout 4 (next).
  A refused file from an empty slot gets a toast alone (the canvas has no control to hold the inline line the dialog prints).
- **A glass card above a photo lets the click through** (layout 4's bio, Step 3). The overlay card is a panel with `backdrop-filter: blur` and a background of alpha **.5 Grunge, .71 Lime, .8 Editorial and Pop**
  (Retro's is opaque), over 43% of the photo's area (84 of 196 grid points at 1440). Below the `.9` cut, so a click on the card face outside its copy and Listen link opens the bio photo, and the hover
  outline boxes the whole picture. Kept: nothing else lives on the card face, so a blocking card would leave a dead 43%. There is no principled cut between .5 and .8 (.5 blocks four of the five
  cards, .75 two), a call for the user if the face should block. Smaller translucent elements (alpha .12 to .18, under 6% of a photo) sit over Retro's header hero (layouts 1, 4, 5) and Lime layout 1's
  track-0 art. Layouts 2 and 3 have none.
- **Past the end of a list, a click appends** (kept after Step 1). On Retro 1, Pop 1, Lime 3, Editorial 2 and Grunge 4 in their default state no
  tile lies past its list, nor on layouts 2, 3 and 4 of any template or Retro's 5 and 6 (Step 3: the seeded `c.images` covers every tile drawn); one does after the panel's Remove has spliced the list (other layouts: a default-state `appended` line is a finding); the panel's Add tile appends, and so does the canvas. The photo lands on the first free tile, which is the clicked one unless
  two or more are free.
- **The hover probe is throttled, with no trailing call (layout 3, Step 3).** `probeInline` returns early within 120 ms of its last run, so the
  *last* `mousemove` of a quick approach can be dropped and the cursor and box stay at the position the previous one saw (a few px, and only while the
  pointer is still settling). Found as the layout-2 driver's unexplained "first point missed": a script that moves in `steps` inside 120 ms leaves the
  hover on the approach point; a move, a 170 ms wait, a second move shows the box at once. The text rule shares it. Not fixed (a user's pointer keeps
  generating events), recorded so a driver waits between moves.
- **An emptied photo field's focus target is its drop zone** (user call, 2026-10-24, replacing Step 3's "its hidden file input"). `ImageField`'s empty zone and `ImagesField`'s Add tile are
  `role="button" tabIndex={0}` with an `aria-label` (*Upload a photo*, *Add photos*) and `openOnKey` (Enter / Space on the zone itself opens the picker); `RowThumb` is a `<button>` already. The three hidden
  `<input type=file style={FILE_INPUT}>` carry `tabIndex={-1} aria-hidden`, so Tab no longer lands in the app shell below the fold (it scrolled 1079px on pricing's *Reviewer photos*). Focusing the zone
  walks the canvas and boxes the placeholder like any field (the focus wrapper is `onFocus`, which bubbles). A mouse click still opens the picker and focuses nothing.
- **Dropping a file on a canvas photo replaces it (Step 4, user call 2026-10-23: build it unless it fights the text editor or needs an effect in `EncoreSection`; it did neither).**
  `onDragOver` / `onDragLeave` / `onDrop` on the section wrapper in `EncoreBuilder.jsx`, on the selected section only and never on a phone, beside `startPhoto`; `EncoreSection` is not touched.
  Only a drag whose `dataTransfer.types` holds `Files` is the canvas's, so a text drag (the text editor's textarea, a selection) is never cancelled. **Every file drag over the selected section is
  cancelled, a photo under the pointer or not** (`dropEffect` `copy` over a slot `photoFieldAt` finds, `none` elsewhere): an uncancelled file drag makes the browser open the file in the builder's own tab,
  and the page and its uploads are gone. The hit-test is the click's (`photoFieldAt`), so a drop lands where a click opens and copy, controls and svg over a photo take no drop; the hover box is
  the drop highlight (`photoHover`, cleared on `dragleave` to outside the wrapper and on drop). The drop frames the file in the crop editor (title *Frame your photo*, `frameFile`: vet, read,
  `editImages`; the same call the panel's drop zone makes, and now the root file input's too), a filled slot and an empty one alike, never the file picker; one file, the first;
  Cancel writes nothing; Apply writes through `photoPut`, so the list-append and track-row rules are the click's. Open inline text editor: the drop still lands (its textarea blurs when the dialog opens).
  **An unselected section and a phone take no photo handler, but a file dropped there no longer reaches the browser** (user call, 2026-10-24, closing the hazard that predates this branch, where the file
  opened in the builder's tab and the page and its uploads were gone): the editor's outer div carries `onDragOver` / `onDrop` that cancel any file drag the targets below it did not
  (`hasFiles(e) && !e.defaultPrevented`, `dropEffect` `none`), so the selected section's photos (`copy`) and the panel's drop zones keep their own effect and everything else is refused. A text drag is not touched.
  The template picker stage is outside it (nothing to lose there).
  **Proved by `photo-probe --drop`**: a `DragEvent` carrying a `File` at the aimed points, the `drop` sent only if the `dragover` was cancelled with a drop effect (as a browser does; the probe
  shadows `dropEffect`, which a script-built `DataTransfer` ignores), the dialog titled *Frame your photo*, Escape and Apply as in the click walk; with negative controls (a text drag is not
  cancelled; a file drag over a header link or its copy is cancelled with no effect). Also by hand: a real CDP `Input.dispatchDragEvent` file drag highlights and opens the dialog.
