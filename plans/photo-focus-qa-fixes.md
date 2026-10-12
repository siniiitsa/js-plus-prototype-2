# Photo focus — QA fixes (every template)

The tester's batch JP-129 … JP-133. Each ticket is a seeded photograph cropped so that the
performer's head, or half the face, falls outside its box. They are filed against all five
templates. All five share one cause and take one fix, so the batch is one entry, not one per
session. There was one triage pass, the user's two calls in one sitting (2026-10-12), and then
the fix.

Branch `photo-focus-qa-fixes`, forked from `main` (`2136fc1`, after PR #61).

## The batch, as filed

> **JP-129** (Medium) — Gallery layout 3 (Inset Hero), 1440 and 768, every template: most tiles
> cut the head off or cut it at the eyes or forehead. At 390 only Pop's tiles 1, 2, 3 and 7 are
> still cut.
> **JP-130** (Medium) — Bio layout 3 at 390, Editorial and Pop: the photo starts at the chin
> (Editorial, where the tape also covers what is left) or at the mouth (Pop).
> **JP-131** (Low) — Editorial gallery layout 1 at 768: the default spotlight (04 / 07) cuts the
> singer at the eyes.
> **JP-132** (Low) — Hero layout 1 at 390, Lime and Editorial: the face is half off screen.
> Lime's DJ is cut by the left edge, Editorial's singer by the right.
> **JP-133** (Low) — the same on hero layout 4 (Stacked).
>
> Probable owner: front end (`object-fit: cover; object-position: 50% 50%`). Rival fix: a
> per-photo focus field (product decision). Not covered: uploads (defaults only, by agreement),
> other widths.

## Triage

| Ticket | Site | Verdict | Call (2026-10-12) | Status |
|---|---|---|---|---|
| JP-129 | `Gallery` `s.v2` tiles | **Confirmed**, every template: a centred cover of the square or portrait strip files into a 1.8 / 1.54 / 1.33 tile | seed focus, whole site | **done** |
| JP-130 | `Bio` `s.v2 && s.limeTree` photograph | **Confirmed**: 390 is a centred cover (the frame's FILL, 0.992 against Pop's render). Desktop and 768 are fitted crops | seed focus where no crop was fitted | **done** |
| JP-131 | `Gallery` `s.v0` spotlight | **Confirmed**: Editorial's 768 polaroid is wider than its portrait seed | seed focus, both bodies, every slot | **done** |
| JP-132 | `HeaderV0` backdrop | **Confirmed**: narrow, a landscape file in a portrait box crops sideways, so the y anchor is inert | seed focus narrow | **done** |
| JP-133 | `HeaderV3` backdrop | **Confirmed**, the same crop | seed focus narrow | **done** |

**One cause.** Every site draws `objectFit: cover` centred, which is the frames' own FILL. The
frames cut the same heads, so the fix departs from them, as the layout-4 strip's top anchor
already did ("Retro's call on the same seven files").

## Decided (user, 2026-10-12)

1. **Per-seed focus, not site anchors, and no field yet.** Each seed file carries its own
   `object-position` (`FOCUS` in `photos.js`, `seedFocus(url)`), and `sectionVm` resolves it to
   `vm.imagePos` / `vm.imagesPos`. Site anchors were rejected: they are the existing idiom
   (HeaderV1's `95% / 22%`), but an upload would take them too, and a centred subject would be
   cut at the 390 hero. The editable field was not taken: it would need a new field kind and new
   panel UI.
2. **Whole site, fitted crops win.** At each reported site the focus replaces the centred
   default at every width and on every template. A crop fitted to its frame keeps its
   percentages at the widths it was fitted for: the bio's desktop and 768, HeaderV0's desktop
   `50% 0%`, and HeaderV3's desktop centre under Lime's flip.

## Settled

- **Mechanism.** One `object-position` string per file, because a cover crop cuts only one
  axis. Keyed by the imported URL: URLs in dev, data URIs in the standalone build, and in both
  cases the very string `vm.image` carries. An upload never matches, and a seed left in an
  edited gallery array keeps its entry. Recorded in `notes/photography.md`; the gallery's two
  sites are also in `notes/gallery.md`.
- **Values**, read off renders of every box each file stands in (gallery L3 at three widths ×
  five templates, the L1 spotlight with each file moved into slot 4 through `&cj=`, bio L3 at
  390, heroes 1 and 4 at 768 and 390):
  - the strip files of Retro / Lime, Grunge, Editorial and Pop: `50% 0%`, plus Pop's
    `pop-calendar`, whose hair a centred tile cut;
  - `grunge-stage` (the drummer, gallery tile 1 and the bio): `50% 25%`. A top anchor put his
    head at the tile's foot. It also stays close to the bio's fitted desktop crop, 27.3%;
  - `lime-hero`: `30% 50%`, the DJ's face whole on the left;
  - `editorial-hero`: `68% 50%`, the singer whole on the right. The 390 sparkle (layout 1) and
    seal (layout 4) touch her hair, not her face. Editorial's bio face at 390 clears the tape.
  - No entry, so centred: `lime-gallery-4`, `grunge-calendar`, `grunge-form-photo`,
    `grunge-hero`, `editorial-calendar`, `pop-hero`, Retro's and Lime's landscape `bio-stage`
    files, and Retro's, Grunge's and Pop's heroes. Lime's layout-1 gallery therefore does not
    move.
- **Measured.** A scratch digest that also records `object-position` (`scripts/digest.mjs` does
  not) was run over header, bio and gallery, every layout × width × template, 210 renders. 42
  renders differ, and they are exactly the named sites: gallery arch 0 (Retro, Grunge,
  Editorial, Pop × 3 widths) and arch 2 (all 15), bio arch 2 mobile (Grunge, Editorial, Pop), and
  header arch 0 / 3 / 4 (4 folds onto HeaderV0) at tablet and mobile under Lime and Editorial. In
  every one of them the only column that moves is `object-position`, from `50% 50%` to one of
  `50% 0%`, `50% 25%`, `30% 50%` and `68% 50%`. No geometry moves.
- **Two-build digest** (`scripts/build-digest.mjs`, run with `object-position` added, `HEAD`'s
  root `index.html` against this branch's standalone, one origin). On setup card 3 (Inset Hero)
  the only change is `object-position` on every template's gallery tiles and the bio. On card 1
  (Hero) the changes are `object-position` on the spotlight and the narrow heroes, plus 0.1px
  sub-pixel deltas in the map rows and the chip labels. A rerun of the old build against itself
  moves those same rows, so they are noise, not this change.
- **Uploads.** A data-URI image in `images` and `image` (harness `&cj=`) stays `50% 50%` at the
  gallery tile, the bio and the hero. The standalone build, opened on Editorial's Inset Hero
  page, reads the focus off its data-URI seeds.

**Replies:**

> *JP-129 — fixed.* Each default photo now carries its own crop point, so the gallery's layout-3
> tiles keep the performer's head on all five templates at 1440, 768 and 390. The design's crop
> is centred and cut the same heads, so this departs from it on purpose. Uploaded photos keep
> the centred crop: a per-photo focus control for uploads is still the open product question.

> *JP-130 — fixed.* At 390 the layout-3 bio photo now shows the face, on Editorial (below the
> tape) and Pop. The same crop point applies to Grunge's drummer. Desktop and 768 keep the crops
> measured from the design.

> *JP-131 — fixed.* Editorial's 768 spotlight shows the singer's whole head. The fix covers every
> slot the spotlight can show, on every template whose default photos needed it (all but Lime,
> whose spotlight was already fine), and at every width.

> *JP-132 / JP-133 — fixed together.* At 390 and 768 the layout-1 and layout-4 heroes keep Lime's
> DJ (left) and Editorial's singer (right) fully on screen. Retro, Grunge and Pop were fine and
> are unchanged. Desktop is unchanged.

## Not done

- **An editable focus for uploads** (the tester's rival fix) is a product decision, not taken.
- Sites not reported still draw their seeds as before. The mechanism is opt-in: a site joins by
  reading `s.imagePos` / `s.imagesPos[i]`.
- The root `index.html` is refreshed in the working tree. Nothing is committed yet: commit, push, PR and merge are still open.
