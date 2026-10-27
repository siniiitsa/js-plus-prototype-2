# Video — restoring the section on every template that draws it

The video section was removed from the project in `d734992` (2026-09-15, "Remove the video, tags and
audio sections from the project"), because Retro layout 1's Figma page (`964:58575`) carries eleven
sections and none of these three. This plan puts `video` back — **only where a Figma frame draws it** — on
all five templates, one session per template and layout, then a sweep.

Branch `video-section`, from `main` (created in session 0, 2026-10-27, after `photo-edit-qa-fixes`
merged as PR #71; do not stack on another). Sessions 0 to 10 are done (see *Status*): this file is the plan, and a plan is also that pass's
memory, so each session writes what it settled back into it.

## What the Figma pages say

Read from the existing template plans (no frame was re-opened for this plan: the Figma MCP was not
authenticated in the planning session, so **session 1 starts by authenticating and re-measuring the ten
rows below with `get_metadata`**, per `plans/lime/layout-1.md`'s *Per-session procedure* and the memory
note `figma-frame-reading`).

**Video frames exist on the layout-2 page and the layout-4 page, and on no layout-1 or layout-3 page,
for every template.** So "where it's present" is **ten fits** (5 templates × layouts 2 and 4), three
widths each.

| Template | L2 · *Video Players — A · Dashboard player* (1440 / 768 / 390) | L4 · *Video Players — B · Cinematic minimal* (1440 / 768 / 390) |
|---|---|---|
| Retro | `964:64645` 1440×782 · `984:35259` 768×1112.2 · `984:35737` 390×1101.8 | `964:72777` 1328×754 · `964:78455` 708×402 · `971:15414` 370×209 (inside **Frame 318**, `964:72773`, 1440×1155, page ground, with the head *"See me in action"* `964:72776`) |
| Lime | `964:64588` 1440×782 · `986:11856` 768×1123.2 · `986:11875` 390×1125.8 | `964:72871` 1328×754 · `971:5436` 708×402 · `977:9010` 370×209 |
| Grunge | `964:64626` 1440×782 · `986:13761` 768×1112.2 · `986:13780` 390×1119.8 | `964:72962` 1440×1186 · `971:7956` 768×654 · `977:12183` 390×380 |
| Editorial | `964:64607` 1440×782 · `986:15666` 768×1111.2 · `986:15685` 390×1118.8 | `964:73054` 1440×1175 · `971:9551` 768×647 · `977:13295` 390×362 |
| Pop | `964:64569` 1440×782 · `986:17571` 768×1112.2 · `986:17590` 390×1107.8 | `964:73165` 1440×1143 · `971:10852` 768×627 · `977:14407` 390×383 |

**A trap in the L4 column.** Retro's and Lime's nodes are the 1328×754 *instance*; Grunge's, Editorial's
and Pop's are the 1440×~1150 *Frame 318 band* (head + instance + the band's ground). Session 1 settles
which level is "the section" (the band, including the head and the ground, is the answer every other
section's L4 fit took) and writes the instance id for all five beside it, so the eight template sessions
read like for like.

Where it stands on the page:

- **Layout 2:** fourth place, after media — header, bio, media, **video**, repertoire, gallery, pricing,
  calendar, map, form, testimonials, footer. (`PAGE_ORDERS[1]` is that order *less* the video frame today.)
- **Layout 4:** between media and gallery. `PAGE_ORDERS` has no row for layout 4 (it "takes layout 1's"),
  so a video at L4 needs a **fourth row**: layout 1's order with `video` after `media`.
- **Grounds:** Retro page beige `#EAD7B8`; Lime page `#15180F`; Editorial paper (Scheme 1 seat, the
  band is paper between the ink gallery above and the taupe media); Pop white under a 10px lime rule;
  Grunge page (`#171716`-family, read it off the frame). Lime L2's player is `#2E3928`, radius 50.

## What existed before, and what survives

`d734992^` holds a working Retro fit, which is where session 1 starts. **It is not a `git revert`**: six
weeks and four templates of code sit on top (`EncoreSection.jsx` went from ~16k to ~30k lines; inline
editing, photo editing, character caps, clamps and the scheme seats all arrived after).

- **Component:** `function Video({ s })` (`EncoreSection.jsx` at `d734992^`, ~650 lines): `s.v0 || s.v2` the
  generic 16:9 frame with a Play disc, `s.v1` Retro's *Dashboard player* (fitted `33e4d97` desktop,
  `dc07cb8` narrow masters), `s.v3` *Cinematic minimal* (fitted `5999dc1`). Its own header comment is the
  one hand-fold in the file: `NVAR.video` was **4 with a hole at index 2**, so `arch 2` folded onto the
  `v0` branch.
- **Data:** `CATS` row `{ id: 'video', name: 'Video', n: 4 }`; `NVAR.video: 4`; the `vi` flag; `TITLES.video`
  *Live at Roomtone*; `DEFS.videoDesc`; `FIELDS.video` (`heading`, `description`, plus `image` and
  `avatar`); `VIDEOS` (six rows, `sub` the channel line, in the repeater row shape but with **no repeater
  editor**) and `VIDEO_MARK` (0.48, where the transport bar is caught — the section is a picture, SPEC
  §12.7, no `<video>` element); `NAV_MINIMAL`'s *Music* and `CTA_TARGETS.listen` listed it.
- **Retro's decisions to keep** (both *Learned on the video section* blocks in `plans/retro/layout-2.md`,
  lines ~348 and ~959): the six videos are a seeded list; the **fabricated metrics were dropped** (view
  count, follower count, like/dislike pair, verified tick) because a published page printing a number
  the artist never typed makes a claim; frame labels (*Top music video*, *View All ›*, *Follow*) stayed
  literals; `image`/`avatar` are two `type: 'image'` fields; `defaultTrackArt` is a lookup so a second
  per-row art list costs a line; the narrow masters change structure (panel to a full-width block, list to
  two columns, thumbnail above its lines at 390), and 768's row title is *smaller* than 390's because the
  grid columns differ.

What the removal left behind in the current code and plans, and so must be undone:

- Every L4 plan names **"the lens where the video was"**: the media's foot arc and the gallery's head arc
  were fitted as if no band stood between them (Lime L4's 2026-09-18 stage call, Grunge L4's tear pair,
  Editorial's straight edge, Pop's lime→pink). Once a band sits there those seams change. This is the
  plan's main regression surface.
- `CLAUDE.md` says *"The categories are exactly the sections on Retro layout 1's Figma page"*, and the
  README counts sections. Both need amending, with the reason.
- The Lime L2 plan left a **photo verdict open for this session** ("the video session decides"): the
  poster is `limeStage` where the frame shows the hero (`51d68654`), and the poster fills the player at
  layouts 2 **and** 4, so re-seeding it moves both.

## Calls (settled in session 0, 2026-10-27)

Put to the user with `AskUserQuestion` in two calls. Each answer was the recommended option. The
options not taken are kept in one line each, so a later session knows what was weighed.

1. **Layouts 1 and 3 have no video frame — layout-bound, absent at 1 and 3.** The setup modal's card
   decides whether the section exists: header cards 2 and 4 *add* a video, cards 1 and 3 *remove* it.
   (Not taken: a normal section folded onto 2 and 4 — the "invented flat" the removal rejected; add-only
   — loses "a card lays out the whole page".) **This changes a mechanism**: `pickHeader` today only
   rewrites `arch` and reorders, and the setup modal is documented as a one-shot gate over a page nobody
   has touched, which is what makes the bulk write safe. Consequences for session 1 to settle, each
   with the lean written here (a lean is not a call; any that turns out to be a genuine fork goes back to
   the user with `AskUserQuestion` before code):
   - **`pickHeader`** inserts `video` after `media` on cards 2 and 4 and drops it on cards 1 and 3, then
     applies `pageLayout()` / `pageOrder()` as before. The drop writes `st.removed.video` like `del`
     (or doesn't — decide with the reader of `st.removed`, whose keys are "categories not on the page").
   - **`LayoutPicker`** on a video section offers designs 2 and 4 only, so a video can never sit on a
     layout whose page has no frame for it. The *other* sections' pickers are untouched, and moving
     another section to layout 1 or 3 while a video stands must be answered (lean: the video stays as it
     is; its `arch` is its own, as every `arch` is after the setup gate).
   - **Add section** for video: lean — the composer opens on the layout the page is on if that is 2 or 4,
     else on 2, and `addSection`'s seat is `PAGE_ORDERS` order (media's follower).
   - **`EXAMPLE_PAGE` / `BLANK_PAGE`**: the template pick builds the page on the header's default
     layout; whether that page has a video follows from it (record which).
   - **`NVAR.video`** was 4 with a hole at index 2 at `d734992^`. With call 1 as it is, only the designs
     read as 0-based 1 and 3 (layouts 2 and 4) have frames, so decide between `designCount` 4 with 0 and
     2 folded onto them and a shorter list, and what `pageLayout()` returns for a video.
2. **A picture, as before.** No `Video link` field, no `s.live` seam, no `<video>` element; `CLAUDE.md`'s
   sixteen-things `s.live` list is untouched. (Not taken: a link that plays the stage in the published
   tab, on the gallery's seam.) The poster, the Play disc and the transport bar at `VIDEO_MARK` are drawn.
3. **Labels: the head and the two buttons are fields; the rest are literals.** Fields (JP-071's shape:
   seeded with the frame's bytes, uncased, dropped when emptied): the section **heading** — *Live at
   Roomtone* at layout 2, *See me in action* at layout 4, a per-layout seed resolved in `sectionVm` **and**
   `EditPanel`'s chain like `mapKickerSeed` — and the two buttons, *View All ›* and *Follow*. Literals:
   *Top music video* and any other frame label. **Not `TITLES.gallery`**: that is *See **us** in action*,
   and the L4 head is *See **me** in action* (Retro L4's recorded trap). (Not taken: all literals; every
   label a field.) Each new field needs `in` measured and `chars` probed.
4. **No repeater.** The six `VIDEOS` rows stay seeded; the editable fields are `image`, `avatar`, the
   heading, the description and the two button labels. The rows are ledgered `INLINE_OFF` as *seeded, not
   editable*. (Not taken: a thirteenth structured editor, which would have been its own step between
   sessions 1 and 2.)

5. **No nav link for the video** (session 1, 2026-10-27, `AskUserQuestion`, recommended option). Session 0's
   "the old row had none, so it is not in the nav" was wrong of current code: `navSectionsOf` lists every
   non-header, non-footer category, and the nav (JP-033) postdates the removal. So `CATS.video` carries a
   flag that `navSectionsOf` skips; the frames' navs draw eight links with or without a video, `navFits` at
   768 and Minimal's triple do not move. Reached by scrolling and by the footer's target select (which lists
   every category). (Not taken: a ninth/tenth *Video* link, the calendar's precedent; it would move `navFits`
   and every L4 session's nav fit.)

6. **Pop's narrow head measure stays 478 / 221** (session 10, 2026-10-27, `AskUserQuestion`, recommended option): the arrow's
   ink less 30, not the frame's gap 432.5 / 178.3, because at the frame's gap the seed takes a second line at 768 and the band
   is 673 against the frame's 627. One constant, `notes/video.md` "Pop · layout 4". (Not taken: the frame's gap, exact to the
   frame and 46px taller.)

The dropped fabricated metrics are **not** a call: they stay dropped (Retro L2's sort-the-copy rule).

## Which L4 node is "the section" (settled in session 0)

**The band — `Frame 318`.** Every template's layout-4 page wraps its video in a `Frame 318` (head +
instance + the band's ground), the same name Retro, Lime, Grunge, Editorial and Pop all use
(`plans/lime/layout-4.md` line 64, `plans/editorial/layout-4.md` line 94, `plans/pop/layout-4.md`
line 130, `plans/retro/layout-4.md` line 111), and every other section's L4 fit took its band rather than
its inner component (the media band `Frame 317`, the gallery wrapper). The band carries what a
template's session fits: the head (*See me in action*), the ground, and the seams to media above and
gallery below. The inner *Video Players — B · Cinematic minimal* instance is the player alone, 1328×754 at
Retro and Lime and the band's child everywhere; it is the node the player fit is read from, not the node
the section is measured as.

What the table in "What the Figma pages say" holds, against that rule (the ids are as the template plans
recorded them; **no Figma call was made in session 0**, the MCP was not authenticated here):

| Template | L4 band `Frame 318` — 1440 / 768 / 390 | L4 inner player instance — 1440 / 768 / 390 | Notes |
|---|---|---|---|
| Retro | `964:72773` 1440×1155 · `964:76700` 768×635 · `971:15249` 390×375 | `964:72777` 1328×754 · `964:78455` 708×402 · `971:15414` 370×209 | the table above holds the **instances**. Band padding 156 / 60 / 60 top; head→instance gap 60 / 60 / 30 (head 96 / 60 / 40) |
| Lime | `964:72867` 1440×1186 · `971:5432` 768×654 · `977:9006` 390×387 | `964:72871` · `971:5436` · `977:9010` | the table above holds the **instances**. Head 116 / 72 / 48 tall |
| Grunge | `964:72962` 1440×1186 · `971:7956` 768×654 · `977:12183` 390×380 | `964:72966` · `971:7960` · `977:12187` | the table above holds the **bands**; the 390 band carries a stray 1554×581 `Vector` (`977:16056`) off its top-left |
| Editorial | `964:73054` 1440×1175 · `971:9551` 768×647 · `977:13295` 390×362 | `964:73058` · `971:9555` · `977:13299` | the table above holds the **bands** |
| Pop | `964:73165` 1440×1143 · `971:10852` 768×627 · `977:14407` 390×383 | `964:73169` · `971:10856` · `977:14411` | the table above holds the **bands**; each carries a `Vector` sticker (`964:73172` 237², `971:11724` 200², `977:17354` 109²) |

Every band is `Frame 318 → Section (y 156 / 60 / 40–60) → Frame (x 56 / 30 / 10; the head, the instance, and
two **hidden** leftovers `the` / `room.`). Read in session 1 with `get_metadata` (the Retro narrow bands
through `use_figma`'s parent chain, since their ids are not the instance's id − 4). Retro's L2 instances
re-measured against the table: 1440×782, 768×1112.2, 390×1101.8, unchanged.

**Session 1's first Figma step (done 2026-10-27)** filled the table above at all three widths. Band heights
differ (1155 / 1186 / 1175 / 1143 at 1440) and are the first thing the sweep's digest reads. Lime's and
Grunge's 1440 bands are the same 1186 tall.

## Sessions

One session per unit, clearing context between. Each ends by printing the next session's paste-ready
prompt.

| # | Unit | Notes |
|---|---|---|
| 0 | Calls 1–4 above; settle which L4 node is "the section"; write the answers into this file. | No code. |
| 1 | **Foundation, restored against current code, and Retro's L2 and L4 verified.** | Below. |
| 2 | Lime · layout 2 | `s.lime` dress inside Retro's `s.v1`. Settled the poster verdict: the hero (see Status and `notes/video.md`). |
| 3 | Lime · layout 4 | Re-opened "the lens where the video was" for Lime: done, and it added a mechanism (`sectionVm`'s `above` / `below`), which sessions 5, 7 and 9 (Grunge's tear pair, Editorial's straight edge, Pop's rule) read before re-fitting their own seams. |
| 4 | Grunge · layout 2 | `(s.lime \|\| s.grunge)` widening, as every L2 section was: done, and `s.limeTree` was *not* the gate (it would have moved Editorial and Pop). |
| 5 | Grunge · layout 4 | Torn-seam pair where the video was: done, and the pair needed no re-fit (the frames' two tears were already drawn); the one new seam is the video's own 390 head. |
| 6 | Editorial · layout 2 | The frames stand it on Scheme 1: **no seat**, no triple, and an `ed` arm in the shared branch. Done: see Status. |
| 7 | Editorial · layout 4 | Paper is Scheme 1, which is no row: read, **no `SCHEMES_OF.Editorial[3]` row** (the plan's expectation was the absence of one). Done: see Status. |
| 8 | Pop · layout 2 | Pop's L2 frames are bound: seats are read, a raw hex is a leak. |
| 9 | Pop · layout 4 | White band under a 10px lime rule: **no seat** (white is Scheme 1), read and found to be the absence of one. Done: see Status. |
| 10 | **Sweep** | Below. |

If a session runs hot, split it at the layout boundary rather than skimping a width.

### Session 1 — the foundation

Enumerate every surface that enumerates categories, and restore each against **today's** shape. A new
`notes/video.md` is written as it goes (record section-level decisions there, not in `CLAUDE.md`).

- **`data.js`:** `CATS` (and `nav`: the old row had none, so the section does not appear in the nav; keep
  that unless call 1 or the frames say otherwise), `NVAR`, the `FLAG` letter, `TITLES`, `DEFS`, `FIELDS`
  with **measured** `in` (type into each field and see whether the HTML moves, at all three widths) and
  `chars` (`node scripts/limits.mjs video`, then `--check` and `--seeds`), `VIDEOS`/`VIDEO_MARK`,
  `NAV_MINIMAL`'s *Music* and `CTA_TARGETS.listen`, `pageLayout()`/`designCount` (`NVAR.video` 4 with the
  index-2 hole, or per call 1), `PAGE_ORDERS` (the layout-2 row gains `video`, a fourth row for layout 4),
  `EXAMPLE_PAGE`/`BLANK_PAGE` per call 1, and the `IDENTITY_CHARS`/`who` rows if the section gains a seal
  or prints the name (it does not today).
- **The two ledgers, which did not exist at the removal.** This is the first section added *after* inline
  and photo editing: every text node needs a slot or an `INLINE_OFF` row (key `Template.design.cat.key`,
  with its reason), and `image`/`avatar`/the row art need `photoSlots` coverage or a `PHOTO_OFF` row, or
  `scripts/inline-probe.mjs --check` and `scripts/photo-probe.mjs --check` report UNLEDGERED. The old
  `VIDEOS` rows are non-repeater text: ledger them off as *seeded, not editable*.
- **`photos.js`** (the only module that imports the photographs): the poster and row-art seeds per template
  (`ROW_ART.video` / `RETRO_VIDEO_ART` at `d734992^`), `FOCUS` entries for the crops (Pop L4's table
  already names `51d06990` `CROP` for video), and `notes/photography.md`'s `null` vs absent rule.
  Keep these imports out of `data.js`.
- **`EncoreBuilder.jsx`:** the video `vm` keys resolved in `sectionVm`, with the clamp
  (`clampContent`) in front of any read of `c`, and `EditPanel`'s seed resolvers matching exactly
  (`notes/list-editors.md`: change one, change both).
- **`EncoreSection.jsx`:** the `Video` component with Retro's `v1` and `v3` restored and ported to the
  current idioms (inline `style={{}}`, no effect, `useId`/`useState`/`useRef` only), and its dispatch line.
- **The layout-bound mechanism (call 1):** `pickHeader` inserts or drops `video` per card; `LayoutPicker`
  offers a video designs 2 and 4 only; the Add composer's layout and seat; `st.removed` and Undo for a
  dropped video. Each lean is written under call 1 above; a genuine fork goes back to the user first.
- **Tooling that hard-codes the category list:** `scripts/shots.mjs` (line 16), `scripts/page-check.mjs`
  (line ~182), `scripts/reach.mjs`, the preview harness and the digests (`&cat=video`).
- **Docs:** `README.md` section/category counts, `CLAUDE.md`'s "exactly the sections on Retro layout 1's
  page" rule (replace with the reason and a pointer here), `plans/README.md`'s tables, the `s.live` list
  (call 2 was (a): no change there).
- **Retro's L2 and L4 verified** against `33e4d97` / `dc07cb8` / `5999dc1` and re-measured against the
  frames; the setup modal's Retro card 2 and 4 show the page with the section.

Gate for session 1: the setup modal on a Retro page, cards 1–4 (the video present at 2 and 4, absent at
1 and 3, and re-picking a card round-trips cleanly); `npm run build` clean; `node scripts/limits.mjs --check --seeds`;
`inline-probe --theme Retro --layout 2,4 --width 1440,768 --check`; `photo-probe` the same with `--blank`
and `--drop`; a digest of the seeded page showing **only** the new section and the neighbours' seams moved.

### Sessions 2–9 — one template, one layout

Each follows the pass it dresses: read `CLAUDE.md`, this plan, `notes/video.md`, `notes/templates.md`,
`plans/CONVENTIONS.md` (groups A, B, C and the layout's D), the template's earlier *Conventions* for the
same layout, and Retro's two *Learned on the video section* blocks. Procedure per session, in order:

1. `get_metadata` on **all three** of the row's nodes side by side before reading any code (the narrow
   masters change structure; two children sharing a `y` is a grid).
2. Widen the existing block the way the template's other sections did — `s.limeTree` blocks with
   Editorial/Pop deltas behind `s.editorial`/`s.pop`, `(s.lime || s.grunge)` for Grunge, never a
   template-only branch where a delta will do.
3. Seats: add the section's row to `SCHEMES_OF.<Template>[layoutIdx]` (a `[desktop, tablet, mobile]`
   triple where the frames move it); nested nodes read `s.onScheme[n]`; nodes that name Scheme 1's
   variables outright under a seat are read by collection as well as token.
4. Photography: seat the poster/avatar/row art per the frame's own crop; Lime L2 settles the poster verdict
   first, and later templates follow whatever it settles unless their frame differs (say so).
5. Re-fit the **seams the removal assumed** — media's foot and the gallery's head at layout 4; at layout 2
   the media → video → repertoire gaps (`vm.pad`'s `d === 1` arm) — and record the old and new seam.
6. Measure at 1440, 768 and 390: digest against the frame, `page-check.mjs` on the card, a long-copy and an
   `&n=0` state (the emptied list), and the character caps with long copy.
7. Run the two probes for the page, both widths, and put the result in the plan.
8. Commit, update this file's status table, print the next prompt.

### Session 10 — the sweep

- Probes on all **ten** pages at both widths: `inline-probe --check` (PASS), `photo-probe --check`, `--blank`,
  `--drop`; `page-check.mjs` on every card; `limits.mjs --check --seeds`.
- The two-build digest against `main`: it must move **only** video and the seams named in each session;
  every other section is byte-identical on layouts 1 and 3.
- The setup modal: all cards of all five templates (the layout-3 composed page unchanged; call 1's
  consequences visible at cards 1 and 3).
- The published tab: the section in the nav only if call 1 says so; the `PublishedPage` zoom between 1180
  and 1440; the preview overlay.
- Fold the pass into `plans/CONVENTIONS.md` (rows leaned on three times), add the `plans/README.md` table
  row, finish `notes/video.md` and the `CLAUDE.md` row for it in the notes table.
  `CLAUDE.md`'s `sectionVm` paragraph also gains `above` / `below` beside `page` (session 3's neighbour inputs).
- Refresh `index.html` **and** `published.html` at the repo root (the two-file step in `CLAUDE.md`).

## Risks

| Risk | Where | Mitigation |
|---|---|---|
| Layouts 1 and 3 reopen the reason for the removal | call 1 | Decided: layout-bound. It is a mechanism change (`pickHeader` adds and drops a section) and gets its own gate in session 1: `pickHeader`, `LayoutPicker`, Add section, `st.removed`, the setup modal's cards 1 and 3 |
| The seams the L4 plans fitted without a video are now wrong | media foot / gallery head, all four L4 templates | Step 5 of every L4 session, plus a sweep digest of the neighbours |
| UNLEDGERED slots | `INLINE_OFF`, `PHOTO_OFF` | Session 1 ledgers once per template and layout; probes are the gate |
| A restored constant disagrees with the panel | `VIDEOS`, `*Val` closures | One resolver, shared; `&n=0` and `&n=12` checked |
| The 768 and 390 masters are not scaled copies | all ten | Metadata first; Retro L2's narrow-master notes |
| Seed copy exceeding its cap | `FIELDS.video` | `limits.mjs --seeds` in session 1 |
| `index.html` / `published.html` left stale | sweep | The explicit two-file `cp` step |

## Status

| # | Unit | Branch | Status |
|---|---|---|---|
| 0 | Calls | `video-section` | **done 2026-10-27** — calls 1–4 settled (layout-bound · picture · head + two buttons as fields · no repeater); L4 section = `Frame 318` band |
| 1 | Foundation + Retro | `video-section` | **done 2026-10-27** — mechanism gated on a Retro page (cards 1–4, picker, Add, delete + Undo); `limits.mjs` `--seeds` / `--check`, `inline-probe` and `photo-probe` (Retro L2 + L4, 1440 + 768, `--blank`, `--drop`) PASS; Retro's poster is the hero shot; `duration` kept; two-build digest (card 1 of every theme, three widths): identical, card 2 gains one root whose 154 rows are the video, header–media rows unmoved, later rows shift in y only; `notes/video.md` written |
| 2 | Lime · layout 2 | `video-section` | **done 2026-10-27** — `s.lime` dress inside the shared `s.v1` branch at three widths (frames `964:64588` · `986:11856` · `986:11875`; the session prompt's ids were Lime's layout 4); poster = `limeHero`, the 1440 mirror declined, no FOCUS row; `vm.pad` gains a Lime `video` row (56/43 · 60/60 · 40/40); caps re-measured (`heading` 82, identity 49); `inline-probe` and `photo-probe` (`--blank`, `--drop`) PASS, `page-check` clean, build clean; digest: only Lime's video moved (layout 4 by its poster alone); setup modal cards 1–4 on Lime as designed; `notes/video.md` |
| 3 | Lime · layout 4 | `video-section` | **done 2026-10-27** — `s.lime` dress inside the shared `s.v3` branch at three widths (band `Frame 318` `964:72867` · `971:5432` · `977:9006`; the instances' ids as the prompt named them); poster `limeHero` confirmed (the instances' own hash), the 1440 mirror declined as in layout 2; **three overrides named**: the 390 instance is in Retro's mode (colours, Soulway, photograph all a leak), the Mobile variant's head-band type bound to `sem/bg`, the Desktop / Tablet variants' progress fill bound to the track's `box/1`; the 768 instance clips its own component (as Retro's), the whole composition drawn; `vm.pad`'s first `d === 3` row (a Lime `video`: 156 / 100, 60 / 60, 60 / 40) puts the section at 972 / 654 / 387 against the frames' 972.5 / 654 / 387; **seams re-fitted, neighbour-aware** (`sectionVm({ above, below })`: a video between media and gallery brings the frame's two arcs back, a page without one keeps the 2026-09-18 call); caps re-measured (`heading` 19, identity 50); `inline-probe` and `photo-probe` (`--blank`, `--drop`) PASS on the committed tree, `page-check Lime 3,0,1,2` clean, build clean; two-server digest against `4f828f7` (720 renders, five themes, three widths, port normalised): only Lime's video at arch 2 and 3 moved, the other four themes' video and every other section byte-identical; with `&below=video` / `&above=video` only Lime's media arch 3 moved (the gallery's arc colour is an SVG `fill`, the digest's blind spot, so proved by pictures); `notes/video.md` |
| 4 | Grunge · layout 2 | `video-section` | **done 2026-10-27** — `(s.lime \|\| s.grunge)` dress inside the shared `s.v1` branch at three widths (instances `964:64626` · `986:13761` · `986:13780`, all three in Static Youth: **no mode leak**); the gate is the pair, not `s.limeTree`, which would have turned Lime's dress on for Editorial and Pop; **six `gr` arms** (player radius 15, the panel's 1px `s.ac` ring and radius 8, pause / volume / maximize / ⋮ discs rounded squares R8, the thumbnail's R8 play disc and the narrow masters' own badge and 7.46 triangle, narrow thumbnails 150 not 154, Anton row titles uppercase and faced); **three overrides named** (the progress fill kept at `videoPct`, the hidden `#141414` artist-row fill not drawn, the dropped metrics); poster = `grungeStage`, the frame's own (`8031d0f3` is the bio's drummer), **no new FOCUS row**: the video's `Photo` reads the file's existing `'50% 25%'` under Grunge alone, since the 1440 crop (y .087–.554) keeps the faces and the narrow masters' centred fill cuts them; `vm.pad` gains a Grunge `video` row (56/49 · 60/60 · 40/40), sections 641.4 / 1112 / 1117.5 against 641.2 / 1112.2 / 1119.8 and the neighbours on their frames; caps re-measured (`heading` 91, identity 49); `inline-probe` and `photo-probe` (`--blank`, `--drop`) PASS on the committed tree, `page-check Grunge 1,0,2,3` clean, build clean; two-server digest against `433be5e` (720 renders, five themes, three widths, port normalised): only Grunge's video at arch 0 and 1 moved, the other four themes' video, Grunge's layout 4 and every other section byte-identical; `notes/video.md` |
| 5 | Grunge · layout 4 | `video-section` | **done 2026-10-27** — `(s.lime \|\| s.grunge)` dress inside the shared `s.v3` branch at three widths (bands `964:72962` · `971:7956` · `977:12183`, instances `964:72966` · `971:7960` · `977:12187`, all Static Youth: **no mode leak**, no mis-bound head band); **five `gr` arms** (the progress track `box/2` `s.box2`, the volume and settings chips R8 not circles, Anton head and name `faced` / uppercase, the poster reading `s.imagePos` — `grungeStage`, the frame's own `8031d0f3`, no new FOCUS row — and the 390 head tear); **seams: the media's and the gallery's Grunge tears already were the frame's and did not move**, the one new seam is the video's own 390 head, `TornEdge grunge` `#171716` 32.2 (`977:16056`), drawn only under a media (`vm.mediaAbove`, a third neighbour key); `vm.pad`'s `d === 3` video row widened to Grunge (156 / 100, 60 / 60, 60 / 40): sections 972.1 / 654.0 / 379.9 against 972.5 / 654 / 380 (were 897 / 627.4 / 362.6); caps re-measured (`heading` 25, identity 55); `inline-probe` and `photo-probe` (`--blank`, `--drop`) PASS on the committed tree, `page-check Grunge 3,0,1,2` clean, build clean; two-server digest against `b219803` (720 renders, five themes, three widths): only Grunge's video at arch 2 and 3 moved, `&below=video` / `&above=video` moved no media or gallery; `notes/video.md` |
| 6 | Editorial · layout 2 | `video-section` | **done 2026-10-27** — an `ed` arm inside the shared `s.v1` branch at three widths (instances `964:64607` · `986:15666` · `986:15685`, all Sienna Vale and **Scheme 1 resolved at every node**: no mode leak, **no `SCHEMES_OF` row**, no `onScheme` read, the 768 instance clips nothing); the gate is `s.lime \|\| s.grunge \|\| s.editorial` (+ `gd = gr \|\| ed`), never `s.limeTree`, which would turn Lime's dress on for Pop; Editorial takes Lime's tokens and Grunge's sizes and is **its own in six places** (nothing rounded — player, panel, bar, thumbnails; the panel's ring dashed 10 / 10 `text/1` and the artist row's rule dashed 10 / 10 `stroke/2` through `DashRule`; pause a circle with volume / maximize / ⋮ R6; the thumbnail play disc R6; the poster reading `s.imagePos`); poster = `editorialStage` (`9d20fe0d`, the bio's arch: the frame's own), the 1440 `CROP` unmirrored, the narrow centred fills drop the head so the file's `'50% 0%'` is read under Editorial too, **no new FOCUS row**; `vm.pad` gains an Editorial `video` row (56/50 · 60/60 · 40/40): sections 641.3 / 1111 / 1116.5 against 641.2 / 1111.2 / 1118.8 (were 715.5 / 1110 / 1113.5), neighbours on their frames (media 966 → video 782 → repertoire 793 at 1440); caps re-measured (`heading` 48, identity 49); `inline-probe` and `photo-probe` (`--blank`, `--drop`) PASS on the committed tree `0bed237`, `page-check Editorial 1,0,2,3` clean, build clean; two-server digest against `2d8aafc` (720 renders, five themes, three widths, port normalised): only Editorial's video at arch 0 and 1 moved; `notes/video.md` |
| 7 | Editorial · layout 4 | `video-section` | **done 2026-10-27** — an `ed` arm inside the shared `s.v3` branch at three widths (bands `964:73054` · `971:9551` · `977:13295`, instances `964:73058` · `971:9555` · `977:13299`; **Scheme 1 resolved at all 35 nodes of each instance, no explicit mode below the root: no `SCHEMES_OF` row, no `onScheme` read**); the gate is `s.lime \|\| gr \|\| ed` (`gd = gr \|\| ed`), never `s.limeTree`; **the 768 instance is the mode leak** (Static Youth: the drummer, `#1A1A1A` / `#DF262C`, Stones Crush), 1440 and 390 are Sienna Vale; the on-film type binds `sem/bg`, which is the paper under Editorial, so `onFilm = s.bg` (`s.tx` would be black on the scrim), the fill is `text/1` at all three widths (no `box/1` trap) and the track `box/1`; **five `ed` arms** (on-film type `s.bg`, the volume / settings chips `radius/control` 6, Gloock capitals head and name through `gd`, the head fitted to its widest word in the column with a `containerType` on the root, and the poster reading `s.imagePos`); the player's radius 30 stays (the instance states it); poster = `editorialStage` (`9d20fe0d`, the frame's own), no new FOCUS row; **`vm.pad`'s `d === 3` video row widened to Editorial** (156 / 100, 60 / 60, **40** / 40: the 390 top is 40, Lime's and Grunge's 60): sections 963.2 / 646.9 / 404.4 against the frames' 963.5 / 647 / 362 (were 897 / 627.4 / 362.6; the 390's 42 is the head's second line in Gloock); **the straight edge needed no re-fit**: neither the media's nor the gallery's Editorial render draws a seam, so `&below=video` / `&above=video` render byte-identical, and the pictures show taupe → paper → ink at all three widths; caps re-measured (`heading` 16 = the seed's length, measured 15 at 768; identity 29); `inline-probe` and `photo-probe` (`--blank`, `--drop`) PASS on the committed tree `95f0e78`, `page-check Editorial 3,0,1,2` clean (published 1440: video 1175, the frame's own), build clean; two-server digest against `0330e23` (720 renders, five themes, three widths, port normalised): only Editorial's video at arch 2 and 3 moved, the other four themes' video and every other section byte-identical; `&below=video` / `&above=video` over Editorial's media, gallery and video: zero diff (the arcs the other templates draw are SVG fills, the digest's blind spot, and Editorial draws none), with the pictures at all three widths; `notes/video.md` |
| 8 | Pop · layout 2 | `video-section` | **done 2026-10-27** — a `pop` arm inside the shared `s.v1` branch at three widths (instances `964:64569` · `986:17571` · `986:17590`, all mode Pop and **Scheme 1 resolved at all 136 nodes of each**, no explicit mode below the root: no leak, no nested scheme, **no `SCHEMES_OF.Pop[1]` row**, no `onScheme` read, no `cardOnPage`); **`v1`'s gate is now `s.limeTree`** (Lime, Grunge, Editorial and Pop are all fitted at layout 2, so it is the old `s.lime \|\| gr \|\| ed` plus Pop and no more; v3 keeps its explicit arms for Pop's session 9, untouched); Pop takes Lime's bound tokens and Grunge's sizes and radii (`gd` gains `pop`) and is **its own in two places** (the three action discs are violet / pink / lime, each with the glyph ink that reads on it; the poster reads `s.imagePos`); panel radius 8 (`radius/control`) with no ring, volume / maximize / ⋮ R8 with the pause a circle; poster = `popStage` (`51d06990`, the bio's arch: **the stand-in was the frame's own**), the 1440 `CROP` at y .086 to .524 and the narrow centred fills dropping the head, so the file's existing `'50% 0%'` is read, **no new FOCUS row**; `vm.pad`'s `d === 1` video row gains Pop (56 / 49, 60 / 60, 40 / 40): sections 641.4 / 1112.0 / 1106.8 against the frames' 641.2 / 1112.2 / 1107.8 (were 715.5 / 1110 / 1113.5 on `padY`), published 1440 media 966 → **video 782** → repertoire 793; caps re-measured (`heading` 47, identity 49); `inline-probe` and `photo-probe` (`--blank`, `--drop`) PASS on the committed tree `fb97d88`, `page-check Pop 1,0,2,3` clean, build clean; two-server digest against `ba1c411` (720 renders, five themes, three widths, port normalised): only Pop's video at arch 0 and 1 moved; `notes/video.md` |
| 9 | Pop · layout 4 | `video-section` | **done 2026-10-27** — a `pop` arm inside the shared `s.v3` branch at three widths (bands `964:73165` · `971:10852` · `977:14407`, instances `964:73169` · `971:10856` · `977:14411`; mode Pop and **Scheme 1 resolved at every node, the band and Section carrying an explicit Scheme 1**: no leak at any width, none of Lime L4's three traps, **no `SCHEMES_OF.Pop[3]` row**, no `onScheme` read); **`v3`'s gate is now `s.limeTree`** (Lime, Grunge, Editorial and Pop all fitted at layout 4, so `v1` and `v3` take the family flag, recorded as session 8 did for `v1`); Pop takes Lime's bound tokens, Grunge's R8 chips and `s.imagePos` poster (`gd` gains `pop`) and is **its own in three places** (Titan's head fitted and lifted as the gallery's, **the media's squiggle arrow** `POP_ARROW_D` beside it at ×1 / .844 / .4602 in the raw `#C6F200` = `tag/1/bg`, placed by the turned box's centre since the walker's x / y is the pivot, and the band's **10px lime foot rule** at 1440 and 768 only, `popVideoRule`); **the narrow head's measure is the arrow's ink less 30** (478 / 221), not JP-128's frame gap, because at the frame's 75 the seed takes a second line at 768 (673 against 627): one constant, flagged for the user; poster = `popStage` (`51d06990`, the frame's own), no new FOCUS row; `vm.pad`'s `d === 3` video row widened to Pop (156 / 100, 60 / 60, 40 / 40): sections 936.5 / 627.4 / 383.1 against the frames' 937.3 / 627 / 383 (were 897 / 627.4 / 362.6; published 1440 = 1143, the frame's own); **the lens where the video was needed no re-fit**: lime → the media's violet rule → white → the video's lime rule → pink, every edge straight (none at 390), neither the media nor the gallery moved and `mediaAbove` has no Pop reader; caps re-measured (`heading` 16 = the seed's length, measured 20 / 15 / 17; identity 35); `inline-probe` and `photo-probe` (`--blank`, `--drop`) PASS on the committed tree `059f807`, `page-check Pop 3,0,1,2` clean, build clean; two-server digest against `3c3f9e5` (720 renders): only Pop's video at arch 2 and 3 moved, `&below=video` / `&above=video` moved no media or gallery; `notes/video.md` |
| 10 | Sweep | `video-section` | **done 2026-10-27** — no `source/` change; call 6 (Pop's head measure stays 478 / 221); `inline-probe --check` (whole page, both widths, `--cat video` first) PASS on all ten pages and Retro's 5 and 6, `photo-probe --check` / `--blank` / `--drop` PASS on the same, `limits.mjs video --seeds` 0 over and `--check` 0 failing, `page-check` clean on both pages of all five templates; two-build digest against `main` `9e30e9e` (720 renders each): **60 files differ, all `video`**, the other 660 byte-identical, and the neighbour keys move only Lime's media layout 4 (`&below=video`) and Grunge's 390 video (`&above=media`); `build-digest` CARD 0 to 3: cards 1 and 3 byte-identical, cards 2 and 4 gain one root and lose no row; the setup modal's picks and round trips, delete + Undo, Add section, the preview overlay and the published tab (no nav link, no overflow from 1100 to 1600) all as designed on all five; **carried, for a decision: Retro's video seams are unfitted** (layout 2 716 against 641, layout 4 897 against 947 in the harness; no `vm.pad` row) and **Add section on a layout-3 page breaks its composed row**; `CONVENTIONS.md` group E, `plans/README.md` row, `notes/video.md` "Sweep", CLAUDE.md and README amended; `index.html` and `published.html` refreshed |
