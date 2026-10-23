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
