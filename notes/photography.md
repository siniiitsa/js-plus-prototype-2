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
  `photo` slot, its portrait circle is a top-square crop of its own source, the form's avatar
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
