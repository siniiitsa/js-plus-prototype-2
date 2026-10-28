# Video layout 4 — the artist's YouTube links, playable, on all five templates

**Goal:** every video variation shows and plays the artist's YouTube videos. Layout 2 already does, on all five
templates (`plans/video.md` rows 12 and 13; `notes/video.md`, *YouTube links* and *The rollout*). **Layout 4 does
not, on any template**: it is still call 2's picture of a player. That means a poster, a drawn transport (skip back,
pause, skip forward) dead in the centre, a clock and bar composed from `duration` at `VIDEO_MARK`, dead volume /
settings / *HD* chips, and the artist's name in the head band. This plan makes layout 4 a player too.

Layouts 1 and 3 have no video (call 1, layout-bound), and Retro's 5 and 6 are layout 1's page, so with this done
there is no video variation left that cannot play.

Branch: **`video-youtube-4`**, forked from `video-youtube-all` (7314ad8, its PR still open). It depends on that
branch's shared tree, so once that PR merges, rebase onto `main`.

## Calls (2026-10-28, `AskUserQuestion`, each the recommended option)

These reopen call 2 (*a picture, as before*) for layout 4, as rows 12 and 13 reopened it for layout 2.

7. **Layout 4 plays layout 2's list.** `videos` goes from `in: [1]` to `in: [1, 3]`: one list, edited in the same
   `VideosField`, so switching a section between layouts 2 and 4 keeps the artist's links. The player holds the
   current video, first the first row with a link, as layout 2's stage does. (Not taken: a layout-4-only *Video
   link* field, which splits the copy across layouts; the shared list but only its first video, which leaves the
   rest unreachable.)
8. **The controls become real; the fake ones go.** The centre disc is **Play** (a play glyph, no longer the caught
   pause). The two skip discs **step through the list**, drawn only while it has two or more rows. The foot band
   goes, with its clock, track, fill, volume, settings and *HD*, and so does the `duration` field. Once a video
   plays, YouTube's own controls are the transport. Layout 2's precedent: its rows' length, source and date went
   because no link or oEmbed answer can supply them, and a clock from `duration` would be made up for a real
   video. (Not taken: keeping the drawn player until the click, fake clock included; making the play disc alone
   live.)
9. **The head band prints the current video's title**, not the artist's name: the row's `title` (oEmbed-filled,
   editable), following the skip discs, as layout 2's label under the stage follows its row. The `←` stays. (Not
   taken: the artist's name.)
10. **One implementation session for all five templates**, then the proof. `v3` is one JSX tree (`gr` / `ed` /
    `pop` / `lime` arms), and every mechanism it needs already exists for layout 2: `youtubeEmbed` / `youtubeThumb`,
    the iframe, `vm.videoEmbeds` and the link-out fallback, `VideosField` with oEmbed, and `cur` / `play` at
    `Video`'s head. (Not taken: a Retro pilot behind a gate, then the four.)

## What layout 4 becomes

The band, its heading (`heading`, *See me in action*), its padding and the player box (1328×754 at 1440, its
radius, `Photo backdrop`, `scrim`) **keep their size and place**. The foot band and the transport are absolutely
positioned inside the box, so taking them out moves no height, and the neighbours' seams (`vm.videoAbove` /
`vm.videoBelow`, Lime's lens, Grunge's tears, Pop's rule) are untouched.

- **The picture** is the current row's `thumb` at `ytCrop` (hqdefault's letterbox; the box is 1328:754, a little
  under 16:9, so the same 1.04 scale holds; measure it), else the Poster (`image`, `s.imagePos` under Grunge,
  Editorial and Pop, as now). Like layout 2's stage, it carries no `data-photo` while it is a YouTube thumbnail.
- **The head band:** `←` and the current row's `title` (`vm.videos[i].title`), in the band's existing type,
  ellipsised on one line as `s.brand` was. With an empty title, nothing prints beside the arrow (decide in code
  whether the arrow goes with it, and record it).
- **The centre row:** `[skip back] [play] [skip forward]`, the discs at their present 40 / 64 / 40 and per-template
  dress (`ctl()`, Grunge's and Pop's rounded squares, Lime's tokens). The play glyph replaces `limePause` / lucide
  `Pause`. Under Lime, check `LimeTransportGlyph`'s kinds for a play mark before drawing a new one; elsewhere use
  lucide `Play`, offset as layout 2's is. The skips keep `LimeSkip` / `SkipBack` / `SkipForward`. With fewer than
  two rows, only the play disc is drawn.
- **Live (`s.live`), with `s.videoEmbeds`:** a click on the play disc or the picture (or Enter / Space) sets `play`
  and mounts the same `<iframe>` as layout 2 (`key={embed}`, the same `allow` and `referrerPolicy`, `autoplay=1`
  being the visitor's own click) over the whole box. The head band, the discs and the scrim go while it plays. A
  skip sets `cur` to the next or previous row with wrap-around and leaves `play` as it is: stopped, the picture and
  title change; playing, the next video mounts and plays. A row with no `embed` (a seed row, a link naming no
  video) is a picture: the play disc is drawn but inert, as layout 2's stage is.
- **Live, without `s.videoEmbeds`** (`file://`, `about:blank`): the play disc and the picture are an `extLink` to
  `vm.videos[i].href` in a new tab, and no iframe mounts. The skips still step the picture and the title.
- **Structure:** layout 2's whole stage is the `role="button"` or `<a>`, but here the skip discs sit inside the box.
  A button inside a button or an `<a>` is invalid, so the clickable picture must be a **sibling layer under the
  discs**, not their ancestor, and the discs `stopPropagation`. `cur` is read through `min(cur, n − 1)`, as now, so
  a shorter list needs no effect, and the file stays effect-free.
- **The canvas** stays a picture: nothing is live and nothing links. It draws the seeded or linked picture, the
  title and the discs.

## Steps (session 1)

Read first: `CLAUDE.md`, this file, `notes/video.md` (all of *YouTube links* and the five layout-4 blocks),
`notes/list-editors.md` (`VideosField`, `drawnSeq`), `notes/templates.md`.

1. **`data.js`**
   - `FIELDS.video`: `videos` to `in: [1, 3]`. Give its `cols.title` a design-3 seat per template, measured in
     step 5. `desc` is not drawn at layout 4: its seat there is `null`, plus an `INLINE_HEAD` / `INLINE_OFF` row
     `'*.3.video.videos.desc'` (*not drawn: layout 4 prints the playing video's title alone*). Only the current
     row's title is drawn at layout 4, so the other rows' titles need the same treatment layout 2 gives its
     descriptions (step 3).
   - Delete `duration` and, with it, `VIDEO_DURATION`, `VIDEO_MARK` and `clockAt`. Check `grep -rn` first that
     nothing outside the video reads them; today only `EncoreBuilder.jsx`'s imports and the video `vm` block do.
   - `IDENTITY_CHARS.video.title`: the design-3 seat becomes `null` on all five, since layout 4 no longer prints the
     artist's name. Every seat is then `null`, so drop the `video` row if `identityCap` tolerates its absence (check).
   - Update the hints on `videos` (now both layouts) and `image` (layout 4's player shows it while the current video
     has no YouTube picture). Update the `video:` block comment over `FIELDS.video`.
2. **`EncoreBuilder.jsx`**
   - `sectionVm`: delete `vm.videoDur` / `vm.videoAt` / `vm.videoPct` and their comment. Check that `vm.videos`
     resolves at design 3 as at design 1 (it reads `c.videos` on every template since the rollout). Check that
     `vm.videoEmbeds` is set for every design.
   - `EditPanel`: `VideosField` now shows at layout 4 through `fieldShown`. Its oEmbed fill, the `channel` fill
     (which stays layout 2's: `allCta` / `channel` keep `in: [1]`, since layout 4 draws no View All) and the seed
     resolver need no change, but confirm the `*Val` closure and `repeaterRows('videos')` agree (`notes/list-editors.md`).
   - `drawnSeq`'s video arm returns the stage's row for `videos`, which is right for layout 2's single `desc` and,
     now, for layout 4's single `title`. Make it design- and column-aware if pairing needs it (layout 2 draws every
     title), and say which in the notes.
3. **Inline ledger:** `INLINE_ROWS.video` already offers `title`. At layout 4 the head band's title node becomes the
   stage row's title slot, and the other rows are not drawn: `INLINE_HEAD`-ledger them (`'*.3.video.videos.title'`
   minus the stage row, the way `'*.1.video.videos.desc'` works). `heading` stays a slot.
4. **`EncoreSection.jsx`, `Video`'s `v3` branch:** as *What layout 4 becomes* says. Delete `footType`, `chip()`,
   `track`, `limePause` and the `Volume2` / `Settings` / `Pause` imports if nothing else reads them (grep the file,
   since the media player may). Reuse layout 2's `out()` / `ytCrop` / iframe props: hoist them above both branches
   rather than copying, so the two layouts cannot drift. Rewrite `Video`'s head comment and the `v3` comments that
   say "a player caught mid-song" / "the picture is all this section is".
5. **Caps:** `node scripts/limits.mjs video --designs=3` for `videos.title` at layout 4 on all five (the head band's
   one line beside the arrow, 390 likely binding, close to the old name seats 54 / 50 / 55 / 29 / 35). The column
   cap is per design, so layout 2's numbers stay. Then `--check` and `--seeds`: every seed title must fit layout 4's
   seat too, or the seed is clamped on a fresh card 4.
6. **Docs:**
   - `notes/video.md`: rewrite *A picture, not a player* (no layout is a picture any more) and the Fields table
     (`videos` 2, 4; `duration` deleted), and add a block *Layout 4 (all five, 2026-10-xx)* with calls 7–10 and
     what was measured.
   - `CLAUDE.md`: the `s.live` list's video entry ("the video's layout-2 stage and rows") becomes layouts 2 and 4
     with the skip discs. Fix *Layout folding*'s "no `live` seam — a picture of a player … except layout 2", and the
     `notes/video.md` table row ("a picture of a player at layout 4").
   - `plans/video.md`: status row 14. `plans/README.md`: the video line.
7. **Root build:** `npm run build:standalone`, then copy `dist-standalone/index.html` and `public/published.html` to
   the root.

## Proof (the gate)

- `npm run build` clean. `limits.mjs video` `--check`: 0 failing. `--seeds`: 0 over.
- `inline-probe --theme T --layout 2,4 --width 1440,768 --check` and `photo-probe --theme T --layout 4 --width
  1440,768` with `--check`, `--blank` and `--drop`: PASS on all five templates. Layout 2 is re-run because
  `drawnSeq` and the ledger changed. A page whose current row has a link draws no Poster, which is known: the
  seeded page probes it.
- `page-check T 3,0,1,2` on all five: no console error, `overflow390` 0, the seams to media above and gallery below
  unchanged.
- **Two-build digest against `7314ad8`**, plain, `&above=media` and `&below=video` (port normalised): only the video
  at arch 2 and 3 moves, on all five templates at three widths, and layout 2 and every other section are
  byte-identical. If layout 2 moves, that is a leak from the hoist in step 4 and must be explained or fixed.
- **By hand**, on setup card 4 of each template: paste a `watch?v=`, a `youtu.be` and a playlist link. The titles
  fill, the head band shows the first title, and the panel lists Videos at layout 4. Switching the section to layout
  2 and back keeps the list. In Preview at Desktop, Tablet and Mobile: Play mounts the embed, skip while stopped
  changes the picture and title, skip while playing plays the next, wrap-around works both ways, and one video draws
  no skips. In the `file://` standalone build's published tab (`about:blank`): Play and the picture open YouTube in a
  new tab, the skips still step, and no player mounts.

## Risks

| Risk | Where | Guard |
|---|---|---|
| Nested interactive elements (skip inside the stage's button / `<a>`) | `v3` structure | Clickable picture as a sibling layer; discs `stopPropagation`; keyboard-tab through all three |
| A seed title over layout 4's new cap | `VIDEO_SEED`, `cols.title` | `--seeds` after step 5 |
| The hoist moves layout 2 | step 4 | The digest's "layout 2 byte-identical" line |
| Deleting `VIDEO_MARK` / `clockAt` / `Volume2` / `Settings` breaks another reader | `data.js`, `EncoreSection.jsx` | `grep -rn` across `source/` and `scripts/` before each delete |
| `drawnSeq` pairs layout 2's titles wrongly once it is design-aware | `EncoreBuilder.jsx` | `inline-probe` at layout 2, both widths |
| A playlist row has no `thumb` | `youtubeThumb` | Known and open (`notes/video.md`, *Open*): the seed art or the Poster shows; not this plan's to fix |
