# Photo editing — QA fixes (JP-160, and JP-154's photo evidence)

The tester's batch against the image editor (`source/src/builder/ImageEditor.jsx`) and the canvas photo click
(`plans/photo-edit.md`). One defect (JP-160) and one piece of evidence for an already-decided ticket (JP-154).
JP-161 is the next free number.

Branch `photo-edit-qa-fixes`, from `main` (`6a45824`). One fix session, then a sweep. Triage below is **read off
the code, not yet reproduced**: the session starts by reproducing (procedure step 3) and corrects the table where
the cause differs.

## The batch, as filed

(Translated from the tester's Ukrainian.)

> **JP-160** — Medium (proposed). *Apply with no change cuts heads off standard photos.* Open a standard photo from
> the canvas, touch nothing, press Apply: the photo on the canvas changes and the performer's head or face goes.
> Pop, Inset Hero (L3), Desktop: click Gallery, then tile 2, Apply untouched. Before, the tile showed the face in
> glasses; after, only mouth down. The dialog's default frame had the glasses inside it, so the canvas crops more
> than the frame does. Pop L3: 5 of 7 tiles. Retro L4: the gallery's main photo (the spotlight) loses the face
> entirely. Published page at 1440 the same. **Hypothesis, two causes:** (1) the frame starts centred and ignores
> the focus the photo is shown with on the canvas; (2) after the bake the photo loses its `object-position` from the
> focus map (JP-129's fix): Pop's was `50% 0%`, now `50% 50%`. **Scope:** standard photos with a focus that is not
> centre: 112 of 340 slots (L1–4, Desktop); actual face loss seen on two pages, the rest not counted.
> **Falsifying check:** the same untouched Apply through the sidebar's Edit button gives the same result, so the
> defect is in the editor (the 2026-10-16 subtask), and the canvas click only makes it one click away from any
> photo. Cancel and Escape change nothing. Related: JP-129 … JP-133.
> **JP-154, for photos** — on an unselected section the first click on a photo only selects the section: no dialog,
> no file picker; the second click opens it. Real mouse, Editorial L1, Booking Calendar. "As designed, and in the
> developer's plan too." Proposed: add it as evidence to JP-154, no new number.

## Triage

| Ticket | Site | Verdict (from the code) | Size | Status |
|---|---|---|---|---|
| JP-160 | `ImageEditor.jsx`: `startTf()` is `{ cx: 0, cy: 0, … }` for every source, so the frame always opens centred; `apply()` always `bake()`s; the baked data URI has no `FOCUS` entry (`photos.js`, keyed by URL), so `vm.imagePos` / `vm.imagesPos[i]` come out `undefined` and the tile draws `cover` at centre | **Both causes confirmed on paper, and they stack.** The numbers: Pop's gallery seeds are 800×1000 (4:5). A centred 3:2 frame (`FIELDS.gallery.images.aspect`) keeps the middle 53% of the height (23%–77%), i.e. it already drops the top where the face is. The tile that shows it is wider still (~1.8 at 1440), so the centred `cover` of the *baked* 3:2 crop drops another ~8% top and bottom. Before Apply the same file was drawn `50% 0%`: the top 44–53% | M | **fixed, session 1** (reproduced on the old code, 7 of 7 Pop L3 tiles and Retro L4's spotlight changed on an untouched Apply; none do now) |
| JP-154 (photo) | `EncoreBuilder.jsx` section `onClick` (~7799): `else if (ph && st.selectedId === sec.id)`; `probeInline` (~6957) shows the photo pointer and box only on a selected section; `onDragOver` / `onDrop` have the same gate | **As documented, a product call** (Call 2). `CLAUDE.md` says in terms that photos keep the already-selected rule and that "a later session must not unify the two"; `plans/inline-qa-fixes.md` Call 1 took the same decision on 2026-10-26 ("Photos keep their rule … the ticket is about text") | — | **decided: keep the rule** (Call 2); docs only |

## Calls

Put to the user. Neither is decidable by the tester or by the code. Call 2 is decided; Call 1 is still open (recommended as written).

1. **JP-160: what Apply does when nothing was changed** and what the frame starts on. *Recommended, both
   halves:*
   - **(a) The frame opens on what the canvas shows.** A source that stands in the slot as a seed (a `FOCUS`
     entry) opens with `cx` / `cy` set so the frame is that file's cover crop at its focus, for *this frame's*
     ratio (a pure function of the focus string, `iw`, `ih` and the ratio; natural px, so independent of the
     stage size). A fresh upload, an upload with no entry and a swap (`Upload another`) still open centred, as
     agreed in JP-129 ("uploads: defaults only"). *Reset* returns to that start, not to zero.
   - **(b) An untouched Apply on a slot that already holds the source writes nothing.** For `item.edit &&
     !swapped`, if the transform still equals the one the dialog opened on (to within a natural pixel),
     Apply does `shift()` (as Cancel), writing nothing, instead of baking. The seed keeps its URL and so
     its `FOCUS` entry, at every site and width; a baked photo keeps its `ORIGINALS` entry. That is the ticket's
     Expected, literally, and it covers all 112 slots at once, including those whose tile shape the frame does
     not match. A fresh pick still bakes on an untouched Apply (the crop to the field's ratio is the point).
   *Alternative rejected:* (a) alone. It makes the frame honest but still bakes, and a bake is a centred cover
   in a box of another shape (Retro L4's spotlight is portrait, the frame is 3:2), so the face can still go.
   *Alternative rejected:* (b) alone. The frame would still open on the centre, so the first real nudge bakes a
   crop the user never saw.
   *Not fixed, on purpose, and said in the reply:* a **real** edit of a seed still bakes a frame-shaped crop that
   the tile re-crops at centre. That is the existing, documented limit ("a baked crop is still drawn `cover` in
   boxes of another shape"; "Not done: a live preview of how the crop sits at 1440 / 768 / 390"). The fix does
   not make it worse: (a) means the user starts from the crop the canvas shows. If the user wants it solved, it
   is a separate piece of work (a per-site ratio, or a preview), not part of this ticket.
2. **JP-154, photos: first click selects, or selects and opens?** (**decided, user, 2026-10-27: keep the second-click rule**; docs only, no code.) *Recommended: keep the rule, record the
   tester's repro as evidence on JP-154 as proposed, no code.* Reasons: it is a standing user call (2026-10-23,
   restated 2026-10-26) that `CLAUDE.md` forbids unifying; the cost of the change is a photo-sized click target
   that also *selects the section* and would now open a modal on every click meant only to select (a photo is
   the largest thing in most sections, where a line of text is not), and a file picker on an empty slot. The
   drop path (`onDrop`, JP-154's sibling) would need the same call. *If the user reverses it,* the change is
   small and contained: drop `st.selectedId === sec.id` from the `ph` branch of `onClick`, run `probeInline`'s
   photo half and `onDragOver` / `onDrop` on every section, then update `CLAUDE.md`'s two sentences, `notes/
   photography.md` and re-run `photo-probe --check` (it assumes a selected section). Say which in the reply.

## Per-session procedure

One session; git and this file are the memory.

1. Read `CLAUDE.md`, this file, `notes/photography.md` (*The image editor*, *A seed carries its own crop*) and
   `plans/photo-edit.md`. Read the memory notes `browser-tool-choice` and `verifying-the-published-tab`.
2. `git switch -c photo-edit-qa-fixes main`; commit this plan and the `plans/README.md` row as
   `Plan: photo editing QA fixes (JP-160)`.
3. **Reproduce JP-160 in the real app** (`npm run dev`, Pop, layout 3, Desktop, Gallery, tile 2, Apply untouched;
   then Retro layout 4's spotlight) with a real mouse. Record the before/after `object-position` and the `<img>`
   natural size from the DOM. **Falsifying controls:** (i) the same through the sidebar's Edit; (ii) Cancel and
   Escape write nothing; (iii) a *fresh upload* untouched Apply is unchanged by this fix (it bakes). If the cause
   differs from the triage, correct the table first.
4. Fix (below), re-run the steps and controls, then the *Check* list.
5. Record the decision in `notes/photography.md` (*The image editor*), the table's *Status*, and CLAUDE.md only
   if a cross-cutting sentence changes. Run `npm run build` once.
6. **Stop and hand off:** say the unit is closed, print the next prompt. No `index.html` refresh before the sweep.

## Session 1 — The editor honours the focus (JP-160) · `ImageEditor.jsx`, `EncoreBuilder.jsx`, `photos.js`

- **Plumb the source's focus in.** `editImages` items gain nothing new if `Editor` imports `seedFocus` from
  `photos.js` (it already imports from `./imageFiles.js`; `photos.js` is the module allowed to import the
  assets, and `ImageEditor.jsx` is chrome, so the import is fine, but keep the data-free import graph in mind:
  `data.js` must still not import it). The lookup key is the item's `src` *before* `ORIGINALS` is consulted:
  a seed is never in `ORIGINALS` until it has been baked once.
- **`focusTf(focus, iw, ih, R)`** beside `startTf()`: parse `'X% Y%'` (the only shape `FOCUS` holds), then
  `cx = (px − 0.5)·(iw − rw)` when the frame is narrower than the file (`R < iw/ih`: `rw = ih·R`), else
  `cy = (py − 0.5)·(ih − rh)` (`rh = iw/R`), zoom 1, no rotation. `object-position` p% puts the p% point of the
  image at the p% point of the box, which is exactly this centre offset. Pure; unit-checkable without a browser.
- **State seeds.** `tf` initialises as `saved?.tf ?? focusTf(...)`, but `iw` / `ih` are only known after the
  image loads (`dim`), so the start is computed there: keep `tf` as `null` until `dim` resolves (or seed it in
  `img.onload`), and give `Reset` the same start. `swapIn` still resets to `startTf()` (a fresh pick, no focus).
  Keep a ref of the opening transform, clamped through `geometry()`, for the no-op test.
- **No-op Apply.** In `apply()`: if `item.edit && !swapped` and `|g.cx − start.cx| < 1`, `|g.cy − start.cy| < 1`,
  and `zoom`, `quarter`, `fine` equal the opening ones, `shift()` and return: write nothing, rather than the same
  string back, which would pin a seed into `c.image` (an absent key is what lets a theme swap reseed it).
  *Reset* returns to `home` (the focus of the **original**, else centre), apart from `start` (a saved edit's own).
- Leave `Use original`, `Cancel`, the queue, `ORIGINALS` and `bake()` alone. `bake()` needs no change: the
  centre offset it takes is the same `cx` / `cy` the view uses.
- **Check.**
  - Pop L3 gallery: all 7 tiles, open → Apply untouched → the `<img>`'s `src`, `object-position` and rendered box
    are byte-for-byte what they were (compare against the same tile before the click). Same for Retro L4's
    spotlight, and the published tab at 1440.
  - The frame on open shows the same crop as the canvas tile at 1440, within the ratio difference: eyes inside the
    frame for the 5 tiles the tester lost.
  - A nudge or a zoom on a seed still bakes and still writes a new data URI; `Reset` returns to the focus start,
    and Apply right after Reset is a no-op again.
  - A fresh upload (panel and canvas, and a dropped file) opens centred and bakes on an untouched Apply, as before;
    `Upload another` inside an Edit dialog opens centred and bakes.
  - A previously baked photo: Edit reopens at the saved transform, untouched Apply keeps the baked string
    (`ORIGINALS` still holds it, a second Edit still reopens the original).
  - Seeds with a *different* axis: Lime's hero `30% 50%` and Editorial's `68% 50%` (x-axis crops at a narrow
    frame) as well as the `50% 0%` family.
  - `scripts/photo-probe.mjs --theme T --layout N --width 1440,768 --check` for Pop L3, Retro L4, Editorial L1,
    plus `--blank` and `--drop` on one page: PASS as before.
  - `npm run build`.

## JP-154 (photo evidence) · docs only, unless Call 2 is reversed

- Add the tester's repro (Editorial L1, Booking Calendar, real mouse; screenshot
  `JP-154-photo-first-click-selects-only.jpg`) as a line under JP-154's row in `plans/inline-qa-fixes.md`, saying
  it is the photo half of the same call and is *kept*: photos still wait for a selected section, user calls
  2026-10-23 and 2026-10-26. No new number. Reply to the tester in the same words.
- If the user reverses it: see Call 2's list; that becomes Session 2, one more `photo-probe` run across all 22
  pages, and `CLAUDE.md` loses the sentence "a later session must not unify the two".

## Sweep

Only if the session touched more than `ImageEditor.jsx`. `photo-probe --check` over Pop L1–4, Retro L1–4 and one
page of each other template at both widths; `index.html` refresh by the deliberate two-`cp` step in `CLAUDE.md`
(`index.html` and `published.html`, both to the root); the tester's steps once more on the built file, Pop L3 and
Retro L4, Apply untouched, published tab at 1440.

## Open questions for the tester

- Which of the 112 slots lose the face *with a real edit* (not an untouched Apply)? They are the residual
  limit above, not this ticket; a list would size the follow-up.
