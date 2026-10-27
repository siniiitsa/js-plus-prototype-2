# Video — restoring the section on every template that draws it

The video section was removed from the project in `d734992` (2026-09-15, "Remove the video, tags and
audio sections from the project"), because Retro layout 1's Figma page (`964:58575`) carries eleven
sections and none of these three. This plan puts `video` back — **only where a Figma frame draws it** — on
all five templates, one session per template and layout, then a sweep.

Branch `video-section`, from `main` (created in session 0, 2026-10-27, after `photo-edit-qa-fixes`
merged as PR #71; do not stack on another). Nothing below is built yet: this file is the plan, and a plan is also that pass's
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
| 3 | Lime · layout 4 | Re-opens "the lens where the video was" for Lime. |
| 4 | Grunge · layout 2 | `(s.lime \|\| s.grunge)`-style widening, as every L2 section was. |
| 5 | Grunge · layout 4 | Torn-seam pair where the video was. |
| 6 | Editorial · layout 2 | Seat from `SCHEMES_OF.Editorial[1]`; read `Z.dev` for width-bound seats. |
| 7 | Editorial · layout 4 | `SCHEMES_OF.Editorial[3]` gains a `video` seat (paper). |
| 8 | Pop · layout 2 | Pop's L2 frames are bound: seats are read, a raw hex is a leak. |
| 9 | Pop · layout 4 | White band under a 10px lime rule; `SCHEMES_OF.Pop[3]` gains a seat. |
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
| 3–9 | Lime L4, then Grunge, Editorial, Pop × layouts 2 and 4 | `video-section` | open — session 3 is Lime · layout 4 |
| 10 | Sweep | `video-section` | open |
