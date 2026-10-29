# Video section — QA fixes (JP-161 … JP-164, JP-019's class, and JP-154's retest)

The tester's batch against the video section (`plans/video.md`, `plans/video-youtube-4.md`; `notes/video.md`)
after its YouTube rollout, plus the retest of JP-154's photo half. Four new tickets, one old class re-filed, one
ticket that is a deploy. JP-165 is the next free number.

Branch `video-qa-fixes`, from `main` (`80e3627`). Three fix sessions, then a sweep. Triage below is **read off the
code and the tester's screenshots, not yet reproduced**: each session starts by reproducing its ticket
(procedure step 3) and corrects the table where the cause differs.

## The batch, as filed

(Translated from the tester's Ukrainian.)

> **JP-154 (photo) — cannot be verified: the fix is not deployed.** `f8337ca` (today, 12:57) changed code only. The
> built `index.html` that GitHub Pages serves was not rebuilt, so the site is still the 28.10 build. Real mouse,
> Retro L1: Pricing selected, click the photo in Bio → Bio is selected and the editor does not open; it opens on the
> second click, as before. **Ask the developer to rebuild and push `index.html` and `published.html`**, then she
> retests. The developer says himself that on Retro L2 the reviewers' photos in Pricing (`pricing.images:1`, `:2`)
> do not open on the first click; she will check those separately.
>
> **JP-161 — Medium. The video's title does not update when the link changes.** Retro → Feature spread → Video →
> row 1: paste link A (the title fills itself in) → replace it with link B. The preview and the player already show
> B, the title stays A's. On L2 under the player: "RICK ASTLEY – NEVER GONNA…" with "by Queen Official" beside it.
> Scripted and typed by hand, L2 and L4. **View All also stays on the first channel (@RickAstleyYT), even when every
> video is deleted.** Control: a title typed by hand is rightly not overwritten. But an auto-filled title behaves
> like a hand-typed one. Cause she names: the title updates only if the field is empty or still holds the
> template's.
>
> **JP-162 — Medium. The Play button is there and nothing plays.** On the published page the player's Play button
> and the row discs do nothing (no control in the DOM, ordinary cursor). Three cases: template rows with no links,
> i.e. **the default state** (an artist who adds no links gets a dead player on the published page); a non-YouTube
> link (Vimeo, an `@channel`); an empty list on L4. Control: rows with a YouTube link play. Same class as JP-019
> (Low, not checked, by the 17.09 decision).
>
> **JP-163 — Medium. On L4 the title in the player's head cannot be seen on real thumbnails.** It lies straight on
> the YouTube picture with no darkening under it. Pop: violet text on a blue thumbnail, contrast **1.05:1**. The
> other templates: cream text on the light parts of the thumbnail (Retro, 390). A design question too: the layout
> is drawn for a dark poster.
>
> **JP-164 — the Retro poster is not the design's.** Frames `964:64645` (L2) and `964:72773` (L4) draw the poster as
> a scene in the club "The Velvet Note"; the build stands the header's photo. The developer's code comment says they
> are one photo; in the frames they differ.
>
> **JP-019's class, no new number:** delete every video and the published L2 prints "No videos yet." (the editor's
> hint) with a dead player beside it.

## Triage

| Ticket | Site | Verdict (from the code) | Size | Status |
|---|---|---|---|---|
| JP-154 (photo) | `index.html` / `published.html` at the repo root: last refreshed in `ed0602f` (2026-10-28); `f8337ca` is 2026-10-29 and `CLAUDE.md` says no build script refreshes them | **Not a code defect.** The tester is right: the deployed app is the old build. The fix is the deliberate two-`cp` step, after the sweep proves the fix on the *built* file. The Retro L2 reviewer photos are the developer's own noted limit (`pricing.images:1,:2`), and hers to check | S | open (Sweep) |
| JP-161 | `EncoreBuilder.jsx` `VideosField`: `apply()` writes the answer's title only `if (videoNeedsTitle(r))` (empty, or still the seed's `VIDEOS[art].title`); the first answer sets the title and from then on the row *is* "typed", though the artist never typed it. `by` / `byFor` already follow the link (`r.byFor === w` guard), which is why *by Queen Official* was right beside a stale title. The channel: `needChannel = sec.c.channel === undefined`, offered once (`chanSent`), so after the first fill the key is present for ever and a later answer, or an empty list, never touches it | **Confirmed on paper**, two parts: the title (a row has no memory of *whose* title it holds) and the channel (the same, on `c.channel`) | M | **fixed, session 1** (reproduced, then driven by hand in the real app, headless: A → B, a typed title, A → typed → B, delete all, a typed and an emptied channel) |
| JP-162 | `EncoreSection.jsx` `Video`: the discs are drawn unconditionally (L2 stage ~10190, row corner discs ~10300, L4 centre ~10700); only `startable` (`s.live && s.videoEmbeds && now.embed && !playing`) or `out()` attaches a handler, so a row with no `embed` / `href` gets a disc and no control. `!s.videos.length` prints `No videos yet.` (10258) on both surfaces. The seed rows (`VIDEO_SEED`) carry no url, so a page nobody has edited is the first case | **Confirmed.** `plans/video.md` call 2 made the canvas "a picture of a player", and the live rollout added the controls without taking the picture's dead parts out of the live page | M | **fixed, session 2** |
| JP-163 | `EncoreSection.jsx` L4 head band (~10690): `onFilm` is `s.paper` (Pop: violet) over the picture; the only scrim is `linear-gradient(0 → 76% transparent, 100% #000)`, the old foot band's, so the head is bare. The frame's poster is dark, a YouTube thumbnail is not | **Confirmed**; Pop's 1.05:1 is the worst case, every template can fail on a bright thumbnail | M | **fixed, session 2** (the title takes the ground's ink, not the glyph colour: measured) |
| JP-164 | `photos.js` `RETRO_PHOTOS.video: hero`, with the comment *"Retro's Dashboard player (964:64645) and Cinematic minimal (964:72777) both fill it with the Velvet Note stage shot the header's backdrop is"*. `photos/hero.jpg` is the yellow-suit stage shot (curtains, guitarist, drummer, `S. J. M. LONDON` case); the tester's frames show a club interior: red velvet suit, audience at tables, trumpet and saxophone, neon *The Velvet Note*. Different pictures | **Confirmed against the frames' screenshots; the cause was a misread in session 1.** The club shot is not in `source/src/builder/photos/` (checked `hero`, `gallery-4`), so it is a new asset, exported from the frames | S | open |

## Calls

Put to the user (2026-10-29) before the sessions; each is a product or design decision the tester cannot make.
**All four decided: the recommended option, in each.** Calls 1 and 2 are the two that change what an artist sees.

1. **JP-162: what a published page does with a player that cannot play.** *Recommended (A + B):*
   - **(A) A video section with no playable row is left out of the published page** (and the Preview overlay, which
     renders the same `PublishedPage`). "Playable" is a row with an `embed` (a YouTube link) or an `href` (the
     `file://` link-out). It has no nav link, so nothing dangles. The editor canvas still draws it, and the panel
     says so: *Not shown on the published page until a YouTube link is added.* This is the default state, the
     empty list, and "all links are Vimeo" at once, and it is JP-019's class.
   - **(B) A row that does not play draws no play disc live** (the stage's, the L2 rows' corner discs, L4's centre
     disc), in a section that has other rows that do. Its picture and title stay. The canvas keeps every disc: it
     is a picture of the page.
   - *Alternatives:* (B) alone keeps a video section of pictures on every unedited published page, the thing the
     tester calls a dead player; (A) alone leaves a Vimeo row among YouTube rows with a dead disc. A third option,
     hiding only the discs and the *No videos yet.* hint, leaves a section with a heading and nothing in it.
   - **The neighbours' seams** (`vm.videoAbove` / `videoBelow`, `plans/video.md` session 3) are computed from the
     page's array by `PublishedPage` and the canvas. With a section dropped the published tab must compute them
     over the array it draws, or Lime's layout-4 media and gallery arcs and Grunge's torn head are drawn against a
     video that is not there. Session 2 checks this on all five.
2. **JP-163: how the L4 title stays readable over any thumbnail.** *Recommended: a pill.* The arrow and the title
   stand on a chip in the transport discs' own ground and glyph colour (`ctl()`'s: cream with rust, Lime's, Pop's…),
   which is already designed against every picture and is the same family as the three discs under it. Contrast
   then does not depend on the thumbnail, on any template. *Alternatives:* (b) a top scrim, the foot's mirrored
   (cheap, and a thumbnail can still beat it; Pop's violet on a darkened blue is ~2.5:1, so Pop would need a light
   ink as well); (c) a light ink plus a scrim on all five, which departs furthest from the frames.
3. **JP-161's channel: what View All does when the videos change.** *Recommended:* the address that *we* filled in
   (remembered as `c.channelAuto`) follows the first video that has an answer, and goes back to the plain label
   when no row has one (every video deleted, or none a YouTube link). An address the artist typed or emptied
   (`c.channel` present and not equal to `channelAuto`) is never touched, as now. *Alternative:* leave View All on
   the first channel and treat the tester's second sentence as out of scope.
4. **JP-164: the poster, and the other templates.** *Recommended:* export the frames' poster from `964:64645` and
   `964:72773` (the two should be one file: confirm by hash), seed it for Retro only, and re-read the same two
   nodes' siblings on Lime, Grunge, Editorial and Pop once, because the same misread (*"the header's photo, whole"*)
   was recorded for Lime in `notes/video.md` (`51d68654`) and the tester has only looked at Retro. Cost: one more
   ~150 KB photograph in `index.html`. *Alternative:* Retro only, no re-read.

## Session 1 — The title and the channel follow the link (JP-161, Call 3) · `EncoreBuilder.jsx`

- **Whose title.** A row gains `tFor`: the watch address its title was auto-filled for. `apply()` writes
  `{ title, tFor: w }` when it fills a title (empty, or the seed's: unchanged), and `videoNeedsTitle(r, w)` becomes
  *empty, or the seed's, or `r.tFor && r.tFor !== w`*. A title the artist edits (`setAt(i, 'title', …)`) drops
  `tFor`, so it is theirs from then on, as the tester's control requires. `VIDEO_KEYS` is `url` / `title` / `desc`
  and `blankRow` ignores a key it does not list, so `tFor` rides on the row like `by` / `byFor`.
- **No stale text while B is looked up.** When the url edit changes the row's watch address and the row holds an
  auto-filled title (`tFor` set), the same write clears `title`, `tFor`, `by` and `byFor`: no A-title under B for
  the 500 ms the lookup waits, nor if it fails (the existing *Couldn't fetch the title. Type one.* note shows).
  Clearing `byFor` matters: `apply()`'s `r.byFor === w` guard would otherwise skip the title when the artist edits
  back to A. A typed title is untouched, and `by` / `byFor` still follow the link as now. Check the keystroke case: a
  half-typed URL names no video (`videoWatchOf` is `''`), so nothing is asked and the row waits.
- **The channel (Call 3).** `VideosField` takes `channel` and `channelAuto` (the section's `c`) and an `onChannel(u)`
  that writes both keys, or clears both when `u` is `undefined`. After every `apply()` and every list change:
  `want = first row with an answer's channel`; if the section's channel is absent *or equals `channelAuto`*, write
  `want` (and `channelAuto = want`), or clear both when there is none. `chanSent`'s once-per-mount guard goes: the
  write is idempotent on equal values. The artist's own value (a different string, or emptied: key present, value
  `''` with `channelAuto` still the old address) is never replaced. *Mind that last case:* an emptied box is
  `''`, which is not `channelAuto`, so it stays theirs.
- `notes/video.md` (*YouTube links* and the oEmbed bullet) gets the rule; CLAUDE.md needs nothing.
- **Check.**
  - The tester's steps, Retro L2 and L4: A (title fills) → B: the title and `by` are B's, in the panel, on the
    canvas and in Preview. A → typed title → B: the typed title stays, `by` is B's. A → B → A: A's title returns
    (from `OEMBED`, no request). Failed lookup (offline) on B: the title is empty, with the note.
  - Seed row → link: as before (the seed title is replaced). Two rows with the same link. Reorder rows: the title
    travels with its row.
  - View All: A, B (channels differ) → first row's. Delete every video → View All is the label, canvas and live.
    Type a channel by hand → A → B: the typed one stays. Empty the channel box by hand: stays empty.
  - `limits.mjs video --check` and `--seeds`; `npm run build`.

## Session 2 — A player that cannot play is not drawn (JP-162, Call 1) and the L4 head (JP-163, Call 2) · `EncoreSection.jsx`, `EncoreBuilder.jsx`

Both are in `Video`; JP-163 is the L4 head band's markup, JP-162 the discs beside it, so one session.

- **JP-162 (A).** `sectionVm` gains `vm.videoPlays`: some row of `vm.videos` has an `embed` or an `href`. `PublishedPage`
  (and with it the Preview overlay) builds its rows from the array *minus* a video section whose `c.videos`
  resolve to nothing playable, **before** it computes `above` / `below` for the neighbours. The decision lives in
  `data.js` as a pure `videoPlayable(section)` (it needs `VIDEO_SEED` and `extUrl` / `youtubeParts`, both of which
  `data.js` has), so the page does not have to run `sectionVm` per section to ask. `pageRows` / `arrangeRows` see
  the same array. The canvas never filters.
- **The editor says so.** The Video panel's *Videos* hint (and the canvas toolbar, if there is room) says the section
  is left out of the published page while no row has a YouTube link; it vanishes once one has. Chrome, not
  `EncoreSection`.
- **JP-162 (B).** In `EncoreSection`, the L2 stage's disc, each L2 row's corner disc and L4's centre disc are
  drawn `!s.live || playsHere(row)`, where a row plays if it has an `embed` or, with no web origin, an `href`
  (`out()`'s test). With the whole section already left out when nothing plays, (B) is what remains for a mixed
  list. The L2 `No videos yet.` line is the canvas's alone (`!s.live`); live it is unreachable under (A), but gate
  it anyway, since `EncoreSection` must not depend on the page's filter.
- **JP-163 (Call 2, the pill).** The head band's arrow and title sit on a chip: ground and glyph colour from
  `ctl()` and its `glyph` (the discs' own), radius the head band's (a pill), padding and font as the band's, the
  title still ellipsising inside it (`minWidth: 0`, the band's `overflow: hidden` clips it). It is drawn with a
  title; an emptied or untitled row keeps the bare arrow as decided in call 9 (`notes/video.md`). **Measure it, do
  not read it:** contrast of the chip's ink on its ground, all five templates, three widths, over the Poster and
  over three YouTube thumbnails (one bright, one blue, one dark); the title's character caps (`videos.title` at
  layout 4: Retro 54, Lime 50, Grunge 55, Editorial 29, Pop 35) were measured for the *unchipped* band, so re-run
  `limits.mjs video --designs=3 --keys=videos.title` and move a cap if the chip's padding binds at 390.
- **Check.**
  - Published tab (served over http, `verifying-the-published-tab`): default state: the video section is not in
    the page, the neighbours' seams meet cleanly on all five (`&above=media` / `&below=video` pairs; Lime L4, Grunge
    L4 390). One YouTube link: the section is back and plays. A Vimeo row beside a YouTube row: no disc on the
    Vimeo row. Deleted-to-empty: gone. The `file://` build's published tab (about:blank): a YouTube row links out
    and its disc stays.
  - Canvas: unchanged byte for byte at every template and layout (two-build digest, `digest-two-servers`, `&live=`
    off), apart from the L4 head chip.
  - L4: the tester's two shots, Pop 1440 (violet on blue) and Retro 390, plus Lime, Grunge, Editorial: the title
    legible, measured.
  - `inline-probe --cat video` at layouts 2 and 4, `--check`, both widths, Retro and Pop (the head's title is an
    `INLINE_HEAD` slot, so its hit-test now crosses the chip); `photo-probe --check` for the video's poster.

## Session 3 — Retro's poster (JP-164, Call 4) · `photos.js`, `photos/`

- **Read the frames.** Retro L2 `964:64645` and L4 `964:72773` (the plan's older `964:72777` may be L4's instance:
  read both), through `get_design_context` / `download_assets` at scale 2 (memory: *Reading the Figma frames*).
  Take the poster's image hash from the fill and confirm the two layouts are one file. If they are not, the video's
  `image` is one field and the second picture is a call back to the user.
- **Seed it.** Export to `source/src/builder/photos/retro-video-poster.jpg` (16:9, ~1920 wide, quality as the
  other stage shots, ≲150 KB), `RETRO_PHOTOS.video`, with a `FOCUS` row only if the frame's crop at 1440 / 768 / 390
  asks for it (the poster is drawn `cover` in 819:478 and 1328:754, so check where the head falls, not the hash
  alone). Correct the wrong comment in `photos.js` and the sentence in `notes/video.md` that says the hero.
  `data.js` still imports no asset.
- **Call 4's re-read.** One look at the four other templates' poster hashes against their frames (the header's hash
  is the tell): record the verdicts in `notes/video.md`; a mismatch is a follow-up row here, not part of this
  session, unless the user says otherwise.
- **Check.** `photo-probe --theme Retro --layout 2,4 --width 1440,768 --check`, `--blank` and `--drop` PASS (the
  poster is the slot); the two frames beside the render at 1440 / 768 / 390 (pixel clip, `browser-tool-choice`); a
  page with a YouTube thumbnail does not draw it; **Remove** writes `null` and shows the dark ground, not the old
  seed; the digest differs in the Retro video's arch 1 and 3 renders and nowhere else; `npm run build`.

## Per-session procedure

One session; git and this file are the memory.

1. Read `CLAUDE.md`, this file and `notes/video.md` (all of *YouTube links*, *The rollout…*, *Layout 4 plays the
   list*); read the memory notes `browser-tool-choice`, `verifying-the-published-tab` and `figma-frame-reading`.
2. `git switch -c video-qa-fixes main` (once); commit this plan and the `plans/README.md` row as
   `Plan: video QA fixes (JP-161 … JP-164)`.
3. **Reproduce the session's tickets in the real app** (`npm run dev`, a real mouse, Retro, Feature spread, Video;
   the published tab served over http) and record the DOM before and after: for JP-161 the row's `title`, `by` /
   `byFor` and `c.channel` (the builder's `st` through the fiber tree); for JP-162 the discs' count and whether
   each has a handler; for JP-163 the title's computed colour over the thumbnail. If the cause differs from the
   triage, correct the table first.
4. Fix, re-run the steps, then the *Check* list.
5. Record the decision in `notes/video.md`, the table's *Status*, and CLAUDE.md only if a cross-cutting sentence
   changes (Call 1 does touch one: the published tab draws every section on the page). Run `npm run build` once.
6. **Stop and hand off:** say the unit is closed, print the next prompt. No `index.html` refresh before the sweep.

## Sweep

After Session 3.

- `limits.mjs video --check` and `--seeds`; `inline-probe --check` at layouts 2 and 4, 1440 and 768, all five
  templates; `photo-probe --check` (+ `--blank`, `--drop`) at layouts 2 and 4 for the five; `page-check` on all five
  for cards 2 and 4; two-build digest against `main`, plain, `&above=media` and `&below=video`, naming what moved:
  Retro's video poster, L4's head, and nothing else on the canvas.
- **The refresh the tester asked for, and the reason JP-154 cannot be retested:** `npm run build:standalone`, then
  the two `cp`s in `CLAUDE.md` (`index.html` and `published.html`, both to the root), **and commit them**. Before
  committing, the tester's steps **on the built file served over http**, with a real mouse: Retro L1, Pricing
  selected, click the photo in Bio → the editor opens on the first click (JP-154, photo half); the same from a Text
  selection, and a drop; JP-161's A → B on L2 and L4; the published tab with no links (no video section), with one
  YouTube link (plays), with a Vimeo row (no disc); L4's head on Pop 1440 and Retro 390; Retro's poster beside
  `964:64645` / `964:72773`. Say in the reply that she can retest once it is on GitHub Pages, and **which commit it
  is**, so she can tell the new build from the 28.10 one.
- Retro L2's *Reviewer photos* (`pricing.images:1`, `:2`), which she will check separately: before she does,
  `photo-probe --theme Retro --layout 2 --width 1440,768 --check` is the developer's own answer; if it reports them
  as dead on the first click, it is a new ticket, not part of this batch.

## Open questions for the tester

- JP-162's *the default state*: is it enough that the section disappears from the published page, or does she
  expect to see the player there with the artist's placeholder rows? (Call 1 reads the ticket as "no dead
  controls", not "show a section".)
- JP-163: any template other than Pop and Retro where the title is unreadable on a *dark* thumbnail? The chip
  does not depend on it, but a screenshot would say whether the chip itself is welcome.
- JP-164: do Lime, Grunge, Editorial and Pop show the same shot as their frames' posters? Her screenshots cover
  Retro only.
