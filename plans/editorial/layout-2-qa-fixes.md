# Editorial layout 2 QA fixes — bug-by-bug plan

Working checklist for the tester's batch against the **Editorial template, layout 2** (card 2 of the
setup modal, *Feature spread*): JP-092 … JP-100. It works like [`qa-fixes.md`](./qa-fixes.md):
**one entry per session, with context cleared between sessions**, and each session writes what it
settled back into this file.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then *How each
session runs* in [`../grunge/layout-3-qa-fixes.md`](../grunge/layout-3-qa-fixes.md) (the digest
recipe, the harness parameters, `reach.mjs`), *Verification harness* in
[`../retro/qa-fixes.md`](../retro/qa-fixes.md) (the `&cj=` harness), then the memory notes
`verifying-the-published-tab` and `browser-tool-choice` (and `figma-frame-reading` for any entry
that reads a frame). Then the section's `notes/` file, which each entry names.
[`layout-2.md`](./layout-2.md) holds the Figma node ids of every Editorial layout-2 frame and its
Lime and Grunge twins (*The sections* table; the page is `964:64598` / `986:15657` / `986:15676`,
on the Figma page **Layout 2** `964:58572`), and its *Settled in section N* bullet is the fit each
entry moves. The shapes the entries copy:
- JP-090 in [`qa-fixes.md`](./qa-fixes.md): a frame label becomes a seeded, uncased, emptiable
  field, and an existing key reaches another layout through a per-layout seed (`mapKickerSeed(d)`)
  that `sectionVm` and `EditPanel`'s chain both call;
- JP-071 in [`../grunge/retest-qa-fixes.md`](../grunge/retest-qa-fixes.md): the label shape itself
  (the `●`, `[ ]`, `↓` and `·` are the markup's and go with an emptied word);
- JP-086 in [`qa-fixes.md`](./qa-fixes.md): a display name fitted to its widest word on an
  `inline-size` container, `min(ramp, calc(100cqi / s.cardNameEms))`, never broken inside a word;
- JP-060 in [`../grunge/layout-2-qa-fixes.md`](../grunge/layout-2-qa-fixes.md): Lime's layout-2 fit
  drew Retro's **pre**-QA state, and Grunge and Editorial inherited it (JP-100 is that again);
- the layout-3 `vm.pad` arms in `sectionVm` (`EncoreBuilder.jsx:459`–`531`, the Editorial layout-3
  sweep's user call, 2026-09-26): a section's vertical inset read off its own frames (JP-094).

Branch: **`editorial-layout-2-qa-fixes`, forked from `main`** (`84be5f3`, after PR #45). One commit
per entry (`Fix JP-092: …`). A decision-only entry commits the plan alone.

**Build and reproduction.** At triage (2026-10-01) the deployed Pages build read
`Thu, 01 Oct 2026 10:11:08 GMT`, 8,779,739 bytes, byte-identical in size to `main`'s root
`index.html` (`97ac77e`, the Editorial QA refresh). The report names JP-086, which that build
shipped, as related, so it was most likely filed against it. The triage read HEAD and ran the
harness (`preview.html`, `&cj=`,
`live=1`): JP-092, JP-093, JP-094, JP-095, JP-099 and JP-100 reproduce there, with the numbers
below; JP-096, JP-097 and JP-098 were read off the code and the frames. **Nothing was reproduced in
the real app.** Each session does that first (Editorial card 2, Publish, Open) and records anything
that does not reproduce.

**None of the nine is Editorial's alone.** Five are layout-2 bodies every template draws, and the
other four are the `s.limeTree` blocks (Lime, Grunge and Editorial). This decides each entry's
digest theme list. `digest.mjs`'s default list is `0,2,3,4`, which **skips Lime**, so always pass
the list explicitly.

| ID | Where the cause sits | Templates | Digest themes |
|---|---|---|---|
| JP-092 | `HeaderV1`'s `s.limeTree` block: the title is the flat ramp, with no container | Lime, Grunge, Editorial (Retro's half overflows too: probe, name) | 0–3 |
| JP-093 | the global `::placeholder { opacity: .45 }`, over the boxes whose placeholder **is** their label (form layouts 2 and 3, both bodies) | every template | 0–4 (the digest cannot see it) |
| JP-094 | no layout-2 arm in `vm.pad`: every section pads `padY` 80 / 56 / 44 | Lime, Grunge, Editorial (their frames agree; Retro's too, but for its header) | 0–4 |
| JP-095 | 17 literals in **both** layout-2 bodies, and `vm.calPrompt` (every layout) | every template | 0–4 |
| JP-096 | the travel card, both bodies; `base`'s seed | every template | 0–4 |
| JP-097 | the bar's byline, both bodies | every template | 0–4 |
| JP-098 | `Gallery`'s shared `if (s.v1)` (no block) | every template | 0–4 |
| JP-099 | the 390 bar override, both bodies | every template | 0–4 |
| JP-100 | the calendar's `s.limeTree` 390 foot | Lime, Grunge, Editorial | 0–3 |

## The report (translated)

> **JP-092 — a long name in the hero fits at no width.** Header → Title = *Maximilian
> Featherstonehaugh* → Publish → Open, at 1440, 768 and 390 separately. Expected: the name fits, as
> in layout 1, where the size shrinks at 1440. Actual: at **1440** the size stays 97px, the word
> runs out of the window and the page scrolls sideways 433px; at **768** even a 12-letter word
> (*Shostakovich Collective*) runs under the *The face of the act* / *Manchester* cards; at **390**
> the word is clipped and the page scrolls sideways 76px. Control: *Florence and the Machine* and
> *Kai Mercer* fit at every width, so the problem is a long single word: ≥12 letters at tablet,
> ≥14 at desktop. Published page, one browser. Related: JP-086 (layout 1, mobile).
>
> **JP-093 — the Enquiry Form's box labels are barely visible.** EVENT DATE, EVENT TYPE and YOUR
> EMAIL are placeholders in `#141414` at 45% opacity on `#DA7C5E`, about 2.3:1. In the design
> (`964-64598`) they are solid dark, about 6:1. The boxes have no other label. Published page at
> 1440; the same CSS applies at every width, but 768 and 390 were not measured. Proposed Medium for
> readability; the severity is ours to set.
>
> **JP-094 — the vertical gaps between sections are larger than the design's.** Desktop 1440,
> design → build: header → bio 112 → 197; bio → media 141 → 198; gallery → pricing 45 → 97; map →
> form 58 → 99. Mobile, header → bio 41 → 90. At tablet the difference is only about 13px.
>
> **JP-095 — labels no field reaches on layout 2** (JP-090's family). After replacing every field
> with a marker, these remained: **Pricing** `[ PRICING ]`, *WHAT'S INCLUDED*; **Events Map**
> *Travel radius*, *Home location*, *Venue location*, *Max travel*, *Travel time*, *Booking fee*,
> *Venue Link*, *Get Directions*, *Other upcoming ·*; **Booking Calendar** *Date ↓*,
> *Availability ↓*, *Pick a date to enquire*; **Media** *● Featured*, *Featured / Max*;
> **Testimonials** *✎ What clients say*, though its *Kicker* field is marked "Not shown in this
> layout".
>
> **JP-096 — Events Map, the travel radius card.** The design has small labels *Based in* and
> *Willing to travel to* over the values. The build has no second one at all, and "Based in" is
> simply typed into the field's default value (*Based in Manchester*).
>
> **JP-097 — the player's byline.** The design reads *Kai Mercer · Single*; the build *Kai Mercer*
> alone, at every width.
>
> **JP-098 — tablet, Gallery.** Six thumbnails on the right where the design has four, and no
> *Gallery · View list ✕* row.
>
> **JP-099 — mobile, the player.** No ♡ ↓ ⋯ icons. Seen before on Grunge layout 2, never numbered.
>
> **JP-100 — mobile, the Booking Calendar.** START ENQUIRY stands on its own row under the chip; in
> the design it is all one row. Seen before on Lime and Grunge, never numbered.

## Status

| Order | ID | Report (short) | Verdict | Size | Decision | Status |
|---|---|---|---|---|---|---|
| 1 | JP-099 | 390 player: no ♡ ↓ ⋯ | **Confirmed, and recorded**: Retro's 390 override, shared by every template, because the master pays for the icons with the track's whole title | S (or none) | **user: A, a reply** | **done** (no code; the published 390 title's cut added to JP-097's *Seen, not filed*) |
| 2 | JP-093 | Form box labels at 45% | **Confirmed**: the global `::placeholder` .45, recorded as "Repertoire's accepted diff", lands on boxes with no other label | S | **user: 1A `var(--ph, .45)`, 2A the four sites** | **done** (0 digest files; the 90 label-in-box inputs read 1 and the other 300 stay .45) |
| 3 | JP-092 | Long hero name overflows | **Confirmed, and shared**: `HeaderV1`'s `s.limeTree` title is the flat ramp with no container; the fit was declined on the seed alone | S | **user: A, Retro's half named** | **done** (0 digest files; the title `min(ramp, 100cqi / cardNameEms)` on an `inline-size` column, 105 published renders fitted to 0.002px) |
| 4 | JP-095 (a) | Pricing, calendar, media, testimonials labels | **Confirmed**: JP-090's rule, eight literals, every template; two are CLAUDE.md's named "unreported siblings" | M | **user: 1A–4A** (JP-071's shape, the frame's capitals; two counter words; the prompt reads its seed again; siblings named) | **done** (0 of 660 a surface; nine reach rows, 6/6 at each `in`; card 2 under four templates prints none of the eight) |
| 5 | JP-095 (b) · JP-096 | The map's nine labels; *Based in* / *Willing to travel to* | **Confirmed, and recorded**: Retro dropped *Based in* because `base`'s seed says it | M | **user: 1A, 2A, 3C, 4A** (JP-071's shape; pills read their seed again; the home value is the header's Location; unfiled seats named) | **done** (15 of 660 a surface, map `arch 1` alone, as named; thirteen reach rows, 6/6 at each `in`; card 2 under four templates prints none of the nine) |
| 6 | JP-100 | 390 calendar foot: pill on its own row | **Confirmed, a fit slip**: Lime's fit drew Retro's pre-QA stack (JP-060's shape) | S | **user: A** (the group wraps, the line's minimum its widest word) | **done** (6 of 660 a surface, calendar `arch 1` × 390 × themes 1–3, as named; 99 states clean; card 2 one row under four templates) |
| 7 | JP-097 | Byline lacks *· Single* | **Confirmed, a fit slip of every template**: the bar prints the artist alone; layouts 3 and 4 print the release | S | no | **done** (30 of 660 a surface, media `arch 1`, the byline's text alone, as named, its box the column's; the per-track `byline` read by the layout-2 bar, both bodies; card 2 under four templates reads *Kai Mercer · Single*) |
| 8 | JP-098 | 768 gallery: six tiles, no *Gallery · View list ✕* | **Confirmed, and recorded**: Retro's squeeze override and head-row allocation, every template | S | **user: 1A, 2B, 3A** (six tiles kept; a *Gallery label* field in the row, the heading back in the caption; View list / ✕ stay dropped) | **done** (10 of 660 a surface, gallery `arch 1` × 768 × themes 0–4, three rows each, as named; `railLabel` reach 2/6 at layout 2, the tablet renders; card 2 under four templates reads *Gallery* over a heading-and-name caption) |
| 9 | JP-094 | Section gaps too large | **Confirmed, and recorded**: layout 2 stands every section on `padY`; the frames' own insets differ by up to 85px at 1440 and 48 at 390 | L | **user: 1A, 2A** (Lime, Grunge and Editorial; all three widths) | **done** (78 of 660 a surface: the 75 named, geometry only, plus the calendar's three desktop renders at 1/64px, the fold's rounding; `vm.pad` alone, no new key; card 2 reads the frames' gaps, 112 / 142 / 46 / 56 at 1440 and 40 at 390; Retro and Pop identical) |
| 10 | — | End-of-pass sweep | — | S | — | **done** (92 of 660 a surface against `main`, exactly the union of the named files; the repro sets, reach and the real app as settled; `index.html` refreshed in `94e2487`, the two-build digest at `CARD=1` as named; replies, a header-height item for the tickets list and the designer's note) |

**Why this order:**
- **The likely reply first.** JP-099's recommendation writes no code, so its reply is ready while
  the code entries run.
- **Then by footprint, zero-diff entries first.** JP-093 moves no digest file (the digest reads no
  `::placeholder`), JP-092 none on the seed, and the two JP-095 entries none if every key is seeded
  with its rendered bytes. JP-096 moves map `arch 1` alone, JP-100 six files, JP-097 thirty, and
  JP-098 ten on its code options.
- **JP-094 last.** It moves the geometry of most `arch 1` files under three themes (about 150), so
  every earlier entry's after-diff has to be named against a base without it, and the sweep's
  reconciliation is simplest with it on top.
- **JP-095 is two entries, split by section, the map's half with JP-096**: the two share the travel
  card and its stat row, and seventeen keys in one session is twice JP-090's.

**"Decision"** means the entry lists options with a recommendation. The session starts by asking
the user (one `AskUserQuestion`, up to four questions) and records the answer under **Decided**
before writing code. "Light" is one question.

## How each session runs

As [`qa-fixes.md`](./qa-fixes.md)'s *How each session runs*, with these differences:

1. The *Evidence* line numbers are from the triage (2026-10-01, `84be5f3`). Re-check them.
2. **Reproduce first**, on HEAD, in the real app: Editorial **card 2**, Publish, Open, the tester's
   steps at 1440, 768 and 390. The harness numbers below are the triage's; re-take them.
3. **Themes per entry, from the table above**, at all three widths, canvas and `live=1`, against a
   HEAD worktree on :5174 (`node_modules` an APFS clone, `cp -Rc`, with its `.vite` removed;
   normalise the port and `\.jpg\?[^|]*` in `src`, or restart :5173). Prove the harness (0
   differences, tree against HEAD, unedited) and **name the expected after-diff before writing
   code.**
4. **An entry that reverses a recorded call** (JP-092, JP-093, JP-094, JP-096, and JP-098 and
   JP-099 on their code options) adds a *reversed* pointer where the call was recorded (the plan's *Settled*
   bullet, the code comment) and rewrites any CLAUDE.md, README or `notes/` line that states the old
   call as a rule. A **fit slip** (JP-097, JP-100) adds the pointer and says how it happened.
5. **The real app is Editorial card 2**, then Lime's and Grunge's card 2 for every entry that
   reaches them, and Retro's card 2 for every entry that reaches every template. Under Lime, Grunge
   and Editorial the header's arch 5 folds onto 1, so a layout-2 header hit is arch 1 **and** 5;
   Retro's six do not fold.
6. **A new or re-scoped field gets a measured `in`**: a row in `source/scripts/reach.mjs`'s `PROBES`
   (do not rebuild it), and the `in` and the hint written from what it prints.
7. **The digest's text column is short** (40 characters, the element's own text nodes): a longer
   string, or one glyph changed at the same width, needs a `textContent` read beside it.
8. Drive anything live-only in the popup from the opener, per `verifying-the-published-tab`. The
   published desktop **lays out at 1180 and zooms** (`min(w, 1440) / 1180`): a width measured in
   the tab at 1440 is a 1180 layout width times 1.22, which is how the tester's 197 is the canvas's
   160.
9. Update the docs the entry names. Commit, fill in **Settled** and the status row, then print the
   hand-off prompt for the next entry and stop.

**Do not refresh the root `index.html` per entry.** The sweep does it once.

---

## JP-099 — 390: the player has no ♡ ↓ ⋯

**Verdict: confirmed, and a recorded call every template shares.** At 390 both layout-2 bars drop
the clock and the three icons, close the padding and narrow the gaps, so the track the player is on
is named. Retro made the call (*"A frame's own render can be the artefact … The 390 bar emits the
desktop 40/24 into a 330px pill and leaves the track it is playing a sliver of its sleeve …
honouring the absence would publish a player naming nothing. Override at 390 only"*,
`../retro/layout-2.md:891`–`899`). Lime added its padding on top (`../lime/layout-2.md:631`–`635`),
Grunge inherited it silently, and Editorial named it (`layout-2.md:1101`–`1103`, open question 7,
designer note 6).

**What the master does.** The 390 bar (`I986:15683;879:10509`) is 330 × 108, padded 40 / 40, gap
24. The transport is 117.1. The inner pill (sleeve and title) is **22.9 wide**, clipped: the sleeve
is a sliver at x 191.1, the title column starts at x 263.1 and its 184-wide text runs off the bar,
and the clock (x 276) is off it too. **The icons sit inside, at x 228–290** (62 wide, gap 12,
13px). So 40 + 117.1 + 24 + 22.9 + 24 + 62 + 40 = 330: the master pays for the icons with the
whole title.

**What the page does** (harness, Editorial; Lime and Grunge identical): the bar 330, padded 16, gap
14, transport 96.5, the inner pill 187.5 (sleeve 60, gap 12, title box 115.5). The seeded SLOW BURN
is 115.5 at 23px. Retro's bar pads 20, its title box 103.5 at 18px.

**The icons are inert everywhere.** At 1440 and 768 they are plain spans with no handler, cursor,
href or label, on both surfaces and on the published page.

**What the icons would cost at 390.** The cluster at 768's size (13px, gap 12) is 61.1, plus the
bar's 14 gap, 75.1:
- with the sleeve: the title box goes 115.5 → **40.4**, two or three letters of SLOW BURN;
- with the sleeve dropped (−72): about **112.4**, "SLOW BU…";
- transcribing the frame (padding 40, gap 24): 22.9 for the sleeve and the title together, the
  frame's own picture.

**Evidence.**
- The `s.limeTree` bar: padding `0 ${s.mob ? '16px' : u(40)}` (`EncoreSection.jsx:6709`), gaps
  (`:6710`, `:6712`), the inner pill's sides (`:6728`–`6731`, comment `:6714`–`6725`), the clock
  `{!s.mob && …}` (`:6737`), the icons `{!s.mob && (…)}` (`:6739`–`6743`).
- Retro's and Pop's bar: padding 20 at 390 (`:7002`), gaps 14 (`:7003`, `:7010`), the clock
  (`:7045`), the icons (`:7048`–`7052`), comments `:6996`–`7001`, `:7026`–`7031`, `:7041`–`7044`.

**Decision.**
- **A (recommended). Keep the override, with a reply.** The master hides the track's title to fit
  three icons that do nothing; the page keeps the title. Already a designer note (6).
- **B. Draw the icons, the title ellipsises** to about 40px.
- **C. Draw the icons and drop the sleeve at 390**, the title about 112 ("SLOW BU…"). The closest
  thing to the frame that still names the track: the frame's sleeve is a sliver anyway.
- **D. The icons on a second line.** The bar's fixed 108 grows.

**Expected after-diff.** A: none. B–D: media `arch 1` at mobile × themes 0–4 × both surfaces, 10
files, the bar's rows.

**Verify** (B–D). The seed and `live=1`'s cued LATE LIGHTS at 360, 390 and 414: nothing past the
bar, the icons inside it, the title's ellipsis on its own box; Retro's 103.5 box the same check.

**Docs.** A: the reply alone. B–D: the three override comments, *reversed* pointers at
`../retro/layout-2.md:891`, `../lime/layout-2.md:631` and `layout-2.md:1101` / `:2132` / `:2193`,
and `notes/media.md`.

> **Reversed** (2026-10-05, user call, [`retest-qa-fixes.md`](./retest-qa-fixes.md) JP-099): the
> tester refused the reply, and the retest took **C**. At 390 the bar draws ♡ ↓ ⋯ and drops the
> sleeve to pay for them, on every template. The clock stays off. The title box goes 115.5 → 114.4
> (Retro 103.5 → 97.5). The decision and reply below are the record of the first call.

**Decided** (2026-10-01, user call): **A, keep the override, with a reply.** No code. The question
gave the published page's numbers (below) beside the triage's canvas ones. They show the bar has no
room left before any icon is drawn.

Asked over the evidence, re-checked on HEAD (`755adae`; no source has changed since `84be5f3`).
Every code line in *Evidence* held: the `s.limeTree` bar's padding at `EncoreSection.jsx:6709`, its
gaps at `:6710` / `:6712`, the inner pill at `:6728`–`6731`, the clock at `:6737`, the icons at
`:6739`–`6743`; Retro's and Pop's padding at `:7002`, gaps at `:7003` / `:7010`, clock at `:7045`,
icons at `:7048`–`7052`. Three comment ranges were off by one to three lines. The inner pill's
comment is `:6717`–`6727`, Retro's padding comment `:6998`–`7001` (`:6996`–`6997` are the bar's
`color` and `border`), and its clock comment `:7042`–`7044`.

**Settled** (2026-10-01, no code).
- **Nothing under `source/` changed**, so there is no digest.
- **Reproduced in the real app.** Card 2 was published under Editorial, Lime, Grunge and Retro
  (puppeteer, the tab caught from the opener). At 360, 390 and 414 the bar draws no ♡ ↓ ⋯ and no
  clock under all four: it is 330 wide (300 at 360), padded 16 (Retro 20), with a gap of 14. At 768
  and 1440 it draws both. The three glyphs are plain spans, `cursor: auto` and no `onClick`, at
  every width under every template. Nothing scrolls sideways.
- **The master, re-read** (`get_metadata` on `I986:15683;879:10509`). The bar is 330 × 108 and
  the transport 117.07 at x 40. The inner pill is **22.93** at x 181.07: its sleeve at 191.07, its
  title column 1 wide at 263.07 holding the 184-wide *Slow Burn (Edit)* and the 106-wide *Kai
  Mercer · Single*, its clock at 276.07. The glyphs are **62 at x 228–290** (♡ 14, ↓ 13, ⋯ 11,
  gaps 12). So 40 + 117.07 + 24 + 22.93 + 24 + 62 + 40 = 330, the triage's sum. (The x 293 in
  open question 7 and designer note 6 is the same column in page coordinates, the bar standing
  at x 30.)
- **The published page cues another track, and that track already fills the box.** The canvas's
  bar names the fan's centre seat, SLOW BURN; the published tab names track one, LATE LIGHTS
  (`cur` starts at −1, `notes/media.md`). The title against its box at 390, the harness and the
  published tab agreeing to the tenth (Pop's row is the harness alone):

  | Template | Box | SLOW BURN (canvas) | LATE LIGHTS (published) |
  |---|---|---|---|
  | Retro | 103.5 | 83.7 | 88.3 |
  | Lime | 115.5 | 90.1 | 95.5 |
  | Grunge | 115.5 | 82.3 | 85.3 |
  | Editorial | 115.5 | 112.6 | **121.6, "LATE LIGH…"** |
  | Pop | 105.5 | **110.6, cut** | **115.7, cut** |

  At 414 the bar stays 330, so the numbers are 390's. At 360 the box is 30 narrower (85.5, Retro
  73.5), and LATE LIGHTS is cut under Lime and Retro as well; Grunge's 85.3 holds by 0.2. The
  icons' 75px would come straight out of a title that is whole only where the face is narrow.
- **The cut LATE LIGHTS is not JP-099's.** Nobody reported it, and it is the 390 twin of JP-097's
  *Seen, not filed* "LATE LIG…" at 1440. Section 3's "390 … needed nothing" (`layout-2.md:1099`)
  was measured on the canvas's SLOW BURN, 2.9px inside the box, not on the track the published tab
  cues. It is added to JP-097's list, so the sweep's *not changed* line names both widths.
- **No designer note added.** Note 6's fifth bullet (`layout-2.md:2193`) already says it, and the
  sweep gathers that note.
- **The reply line**, in the sweep's shape so step 6 can lift it as it stands. It opens on what
  changes and who holds the next step, since Grunge's JP-056 reply was refused for reading as
  closed. *Superseded* by the retest's reply line (`retest-qa-fixes.md` JP-099, *Settled*):
  - **JP-099 — nothing changes in this build; passed to the designer, whose call it is next.** At
    390 the Media Player's bar leaves out ♡ ↓ ⋯ and the running time on purpose, on every template,
    not only Editorial and Grunge. The 390 design fits them only by running the song's name off the
    bar. It is the 768 bar squeezed to 330px, so the box holding the cover, the title and the
    running time is 23px wide. The design therefore shows a sliver of the cover and neither the
    song's name nor the time: the name sits past that box, under the icons, and would run 117px off
    the bar. On the page the three icons would take 75px from the title, cutting a name like
    *Late Lights* to two or three letters (under Editorial it already loses its last letters at 390
    without them). The icons do nothing at any width — they are not buttons on the published page —
    so at 390 the page keeps the song's name instead. This was decided for Retro's player in its
    first pass and has held for every template since. It is in the designer's notes for this layout
    (*Notes for the designer* 6). If the designer wants the icons at 390, the bar needs a 390 layout
    of its own — the icons on a second line, or no cover art — which is a small change once they
    choose.

---

## JP-093 — the form's box labels are faint

**Verdict: confirmed, and a recorded "accepted diff" that does not fit these boxes.**
`index.css` gives every placeholder `opacity: .45`. At form layouts 2 and 3 the box holds no
placeholder in that sense: it holds the field's **label**, and the boxes have no other one. The
canvas draws that label as a full-ink span, so the canvas and the published page disagree on
every template. The recorded call was made for layout 1, where the label stands above the box and
the box holds a real hint: *"a published placeholder draws at `::placeholder`'s `.45` where the
canvas span draws it full, which is Repertoire's accepted diff … why no fourth `.hv-*` class was
added"* (`notes/form.md:46`–`48`; README `:470`–`472`; repeated in Lime's, Grunge's and Editorial
layout 4's plans). Its layout-2 half (`notes/form.md:56`–`57`) already says the box "holds the
field's **label** instead".

**Figma: every label is solid**, full opacity, no ancestor opacity: Editorial `964:64614` /
`986:15673` / `986:15692` `#141414` (`sem/text/2`), Lime `964:64595` `#15180f`, Grunge `964:64633`
`#ffffff`, Retro `964:64652` `#fbf6ea`; layout 3's (Editorial `964:68747`, Lime `964:68682`,
Grunge `964:68714`) the same.

**Contrast at 1440, `live=1`** (computed `::placeholder`, now → solid):

| Theme | Layout 2 (`arch 1`) | Layout 3 (`arch 2`) |
|---|---|---|
| Editorial (`#141414` on `#DA7C5E`; on `#FFF9F2` at layout 3) | **2.29 → 6.16**, the tester's | 2.96 → 17.62 |
| Lime | 2.76 → 13.22 | 3.69 → 11.54 |
| Grunge | 4.47 → 17.40 | 4.47 → 17.40 |
| Retro (`#FBF6EA` on `#E8B33B`) | 1.30 → **1.78** | 2.95 → 16.21 |
| Pop | 2.99 → 18.42 | 2.99 → 18.42 |

Retro's own frame pair is 1.78:1 even solid: a designer note, not this ticket's.

**Evidence.**
- `source/src/index.css:120`: `input::placeholder, textarea::placeholder { color: inherit; opacity: .45; }`,
  a global rule the published tab clones in.
- Layout 2, `s.limeTree` block (`EncoreSection.jsx:23921`): the canvas span in `box(bad)` with
  `color: ink` (`:24002`–`24008`), the live `<input placeholder={up(f.label)}>` (`:24187`–`24195`).
  Retro's and Pop's body (`if (s.v1)` at `:24287`): `:24574`.
- Layout 3: the `s.limeTree` block (`:24806`) at `:24939`, Retro's and Pop's at `:25123`.
- **Not these boxes:** layouts 1 and 4 hold a real `f.placeholder` under a visible label (`:23369`,
  `:23688`, `:25349`); the repertoire search (`:11123`, `:11287`, `:11709`, `:11861`) and the
  calendar wizard's cells (`:16769`, `:17078`) are hints too.

**Decision.**
1. **Mechanism.**
   - **A (recommended). A custom property on the global rule**: `opacity: var(--ph, .45)`, and
     the four label-in-box inputs set `--ph: 1` inline. One CSS line, no new class, every other
     placeholder unchanged, and the canvas and the page agree by construction. It is `--ac`'s
     mechanism (an inline custom property a stylesheet reads), so CLAUDE.md's "only `.hv-indent`,
     `.hv-acbord` and `.hv-acfill` cross the boundary" gains a clause.
   - **B. An overlay span over an empty input**, `pointerEvents: none`, in the canvas span's style.
     No CSS, but the native placeholder goes (an `aria-label` replaces it) and `live=1` gains rows.
   - **C. A reply**, the recorded accepted diff. Weak here: unlike the repertoire's, these boxes
     have no other label.
2. **Scope.**
   - **A (recommended). The four label-in-box sites, every template** (form layouts 2 and 3, both
     bodies): every box whose placeholder is its only label.
   - **B. Editorial layout 2 alone** (an `ed` gate). Leaves the same defect on four templates and
     on layout 3.
   - **C. Every placeholder.** Not owed: the others are hints under a visible label.

**Expected after-diff (on 1A, 2A): zero digest files on both surfaces.** The digest reads no
`::placeholder` and no custom property, and the canvas span is already full ink. The proof is a
`getComputedStyle(input, '::placeholder').opacity` read per site: 1 at the four sites, .45 at every
other input.

**Verify.** That read on `live=1` at three widths × themes 0–4 × form `arch 1` and `arch 2`, and on
`arch 0` / `arch 3` and the repertoire search (still .45); the contrast table re-taken off the
computed colour; Editorial's card 2 published at 1440, 768 and 390, empty boxes then typed (the
typed value's colour unchanged); the refused box's ring still reads.

**Docs.** `notes/form.md:46`–`48` (the accepted diff is layout 1's and 4's; the label-in-box
layouts draw it full); README `:470`–`472`; CLAUDE.md's boundary sentence (under 1A); the comments
at the four sites.

**Decided** (2026-10-01, user call): **1A, `opacity: var(--ph, .45)` with `--ph: 1` inline; 2A, the
four label-in-box sites on every template.** The question gave the published page's numbers
(below), which match the triage's layout-2 column.

Asked over the evidence, re-checked on HEAD (`4b864da`; no source has changed since `84be5f3`).
Every line held: the global rule at `index.css:120`; the `s.limeTree` layout-2 block at
`EncoreSection.jsx:23921`, its `box(bad)` with `color: ink` at `:24002`–`24008` and its live input
at `:24187`–`24195` (the placeholder at `:24188`); Retro's and Pop's `if (s.v1)` at `:24287` and
input at `:24574`; layout 3's `s.limeTree` block at `:24806` and input at `:24939`, Retro's and Pop's
at `:25123`. The non-sites held too (`:23369`, `:23688`, `:25349`; the repertoire's `:11123`,
`:11287`, `:11709`, `:11861`; the wizard's `:16769`, `:17078`). The triage's list missed one hint,
**Retro's and Pop's layout 4 at `:25677`**, which is a label-above-box `f.placeholder` like the
others and stays at .45. The fallthrough's `flatCtl` inputs (`:25882`, `:25892`) are past every
design, so `arch % designCount` never reaches them.

**Reproduced in the real app** (puppeteer, card 2 published, the tab caught from the opener, read
at 1440, 768 and 390, `getComputedStyle(input, '::placeholder')`, the contrast taken against the
box's composited ground). The three boxes draw at **.45** at every width under all four templates:

| Template | Ink on ground | Now → solid |
|---|---|---|
| Editorial | `#141414` on `#DA7C5E` | **2.29** → 6.16 |
| Lime | `#15180F` on `#D5E3B2` | 2.76 → 13.22 |
| Grunge | `#FFFFFF` on `#1A1A1A` | 4.47 → 17.40 |
| Retro | `#FBF6EA` on `#E8B33B` | 1.30 → 1.78 |

The repertoire's search reads .45 on the same pages (Editorial `#141414` on `#DA7C5E` at 1440, its
`[4, 1, 1]` seat, and on `#FFF9F2` at 768 and 390), as it should. No console errors.

**Settled** (2026-10-01).
- **The code.** `index.css:122` is now `opacity: var(--ph, .45)`, with a two-line comment over it.
  The four live inputs add `'--ph': 1` to their `style`, each with a comment: the `s.limeTree`
  blocks at `EncoreSection.jsx:24196` (layout 2) and `:24952` (layout 3), and Retro's and Pop's at
  `:24588` and `:25141`. It goes on the `<input>` alone, not into `box()` / `boxShell()`, so the
  canvas spans, which hold no placeholder, carry no dead property. `--ph` was unused before. Retro's
  layout-2 header comment (`:24259`–`24268`) said the published first paint was the canvas's
  picture. It now says that holds at full strength only since JP-093.
- **Digest: 0 of 660 files on each surface** (themes 0–4, all categories, three widths, canvas
  and `live=1`), as named. The harness was proved first: HEAD on :5174 against the unedited tree
  on :5173 diffed to 0 on both surfaces after the port and stamp normalisation. Raw, 194 files
  differed, all on the port.
- **The proof, `live=1`, every input the harness draws** (645 renders; the wizard was stepped
  through its three steps, so all seven of its cells were read). On HEAD all **390** were .45.
  After: **90 at 1**, exactly form `arch 1` and `arch 2` × three boxes × themes 0–4 × three
  widths, so both bodies. The other **300 stayed at .45**: form `arch 0` (60 inputs and 15
  textareas), `arch 3` (75 and 15), the repertoire search at `arch 0` and `1` (15 each; layouts 3
  and 4 draw none), and the wizard's cells (105). Each input's own `color` and `opacity` (the typed
  value) and each placeholder's ink and ground were unchanged on all 390. The inline `--ph` reads 1
  at the 90 and is absent elsewhere.
- **The canvas and the page now agree by measurement.** At the 90 sites the canvas span's
  computed colour equals the live `::placeholder` colour, and both draw at opacity 1 (the span's
  ancestors' opacity product included): 90 agree, 0 differ.
- **Contrast, after.** Each now equals the triage's solid column at every width:

  | Theme | Layout 2 (`arch 1`) | Layout 3 (`arch 2`) |
  |---|---|---|
  | Retro | 1.30 → **1.78** | 2.95 → 16.21 |
  | Lime | 2.76 → 13.22 | 3.69 → 11.54 |
  | Grunge | 4.47 → 17.40 | 4.47 → 17.40 |
  | Editorial | **2.29 → 6.16** | 2.96 → 17.62 |
  | Pop | 2.99 → 18.42 | 2.99 → 18.42 |

  Retro's layout-2 pair stays 1.78:1 solid, its frame's own colours. That is a designer note for
  the sweep, not this ticket's.
- **The real app.** Card 2 was published under Editorial, Lime, Grunge and Retro, from HEAD
  (:5174) and the tree (:5173). The three boxes read .45 → **1** at 1440, 768 and 390 under all
  four, Editorial's at 360 and 414 too, and the repertoire search stays .45. The published tab
  clones the opener's sheet, so this read is the one that proves `var(--ph, .45)` survives the
  clone. Card 3 reads 1 under Editorial (360, 390, 414, 768, 1440), Retro and Lime (1440, 768,
  390). As a control, Editorial's cards 1 and 4 keep every hint at .45: layout 1's five, layout 4's
  six and the wizard's date cell. No console errors.
- **The refused box and the typed value, the published page at 1440.** A capture-phase guard
  stopped every `mailto:` click. The script then clicked the submit with the boxes empty and typed
  *12 May 2027* into the first box. A style digest of `#form` (geometry, colour, ground, box shadow,
  border, opacity, text, value) was taken idle, refused and typed, and matched HEAD's row for row
  under all four templates. So the refusal still reads: Editorial's three boxes take the 2px paper
  ring (`#F6F0E8`), Lime's the 2px ink ring, Grunge's the 2px white one and Retro's the 1.6px
  accent ring, and typing clears the first box's ring. The typed value's colour is unchanged
  (Editorial `#141414`, opacity 1).
- **Docs.** CLAUDE.md's boundary sentence gains the `--ph` clause, and so does README's
  (`:78`–`82`, the same rule, which the entry did not name). README `:472`–`478` and
  `notes/form.md:46`–`51` now scope the accepted diff to layouts 1 and 4, with a *reversed*
  pointer for layouts 2 and 3. `notes/form.md`'s layout-2 sentence (`:61`–`63`) names `--ph`. The
  call's origin, `../retro/layout-2.md:678`–`689` ("the published first paint must be the
  canvas's picture"), gets a pointer saying the string matched and the strength did not. The
  repertoire's (`:11119`) and the wizard's (`:16755`) comments, and Lime's, Grunge's and Editorial
  layout 4's plan lines, are about hints and stay true.
- **A fit slip, not a reversal of intent.** The layout-2 call wanted the canvas's picture
  published, and so did layout 3's, which shares the seam. The string was matched. The
  global rule's .45 was recorded for layout 1's hints and then carried over to these labels.

---

## JP-092 — a long hero name overflows at every width

**Verdict: confirmed, and shared by the three `s.limeTree` templates.** `HeaderV1`'s block sets the
title at the flat ramp (`s.dispLg`: Editorial 97 / 73 / 48, Lime 107 / 81 / 54, Grunge 107 / 81 /
46 faced × 0.75), in a column that is no container, and `Title` has no `overflowWrap`. Under
`alignItems: flex-start` a long word takes its min-content width and runs out of the column. The fit
was declined on the seed: *"The title fits without the layout-1 recipe … the seeded "KAI MERCER"
(5.068 Noto ems) comes to 490 at 97px in the 521 desktop column … No `cqi` fit was owed"*
(`layout-2.md:931`–`935`). JP-086 then named this header's clip with *Supercalifragilistic* at 390
(`qa-fixes.md:795`–`800`), and its reply logged it.

**The column** is 521.1 / 324 / 370 on the canvas: desktop's two `flex: 1 1 0` halves with a
`u(56)` gap, 768's two halves 60 apart (under `ed` topped, so the overrun lands on the cards), 390's
one column. **The 768 half is narrower than the 390 column**, so a fitted long word sets smaller at
768 than at 390. There is no floor (JP-086 had none).

**Reproduced in the harness** (`header&arch=1&live=1&cj={"title":…}`): px past the column / past
the section, and at 768 over the cards' left edge. No word broke inside itself.

| Theme | Width | Featherstonehaugh | Shostakovich | Florence… / Kai Mercer | Supercalifragilistic |
|---|---|---|---|---|---|
| **3 Editorial** | desktop 97 | +401 / **+355** (× 1.22 = the tester's 433) | +100 / **+54** | fit | +416 / +370 |
| | 768 73 | cards **+310** | cards **+83** | fit | cards +321 |
| | 390 48 | +86 / **+76** | fit | fit | +94 / +84 |
| 1 Lime | desktop 107 | +181 / +135.5 | fit | fit | +209 / +163 |
| | 768 81 | cards +148 | +37 into the gap | fit | cards +169 |
| | 390 54 | fit | fit | fit | fit |
| 2 Grunge | desktop 80.25 | +102 / +56 | fit | fit | +131.5 / +86 |
| | 768 60.75 | cards +87.5 | +4 into the gap | fit | cards +110 |
| | 390 34.5 | fit | fit | fit | fit |
| 0 Retro | desktop 79 | +153 / +107 | fit | fit | +146 / +100 |
| | 768 60 | cards +128 | +31 into the gap | fit | cards +122 |
| | 390 40 | fits; **the Book pill 36.3 past the section** | fit | fit | fit |

The tester's "≥14 letters at desktop" is generous: *Shostakovich* (12) already scrolls Editorial's
1440 page by about 66px.

**The arithmetic.** `vm.cardNameEms` (the widest word in `navFace` ems: `notoEms`, `bebasEms`,
`antonEms × 0.75`) is the right key under all three. The seed's MERCER needs 3.412 / 2.453 / 2.248
ems, so `min(ramp, 100cqi / ems)` resolves to the ramp at every width under all three templates
(Editorial's limits 152.7 / 95.0 / 108.4 px against 97 / 73 / 48). Fitted, Editorial's
FEATHERSTONEHAUGH is 54.3 / 33.7 / 38.5 and SHOSTAKOVICH 80.2 / 49.8 / 48.

**Evidence.**
- `HeaderV1` at `EncoreSection.jsx:1917`; its `if (s.limeTree) { … return }` block `:1918`–`2283`,
  no `ed` arm on the title.
- The title: `<Title s={s} size={s.dispLg} color={s.tx} lh={0.89} inline twoTone={grunge} …/>`
  (`:2159`–`2160`), in `identity`, `col(u(18), { alignItems: 'flex-start', minWidth: 0 })`
  (`:2151`). No ancestor is a container (the nav row's, `:2024`, is a sibling); `identity` is sized
  by its parent at every width, so it can take one without moving.
- The rows: desktop `:2270`–`2279`, 768 `:2260`–`2269` (topped under `ed`, `:2265`), 390
  `:2252`–`2259`.
- `Title` (`:935`–`958`): no `overflowWrap` or `wordBreak`.
- `vm.cardNameEms` (`EncoreBuilder.jsx:674`), `vm.navNameEms` (`:666`, the whole name on one line:
  wrong here, since the seed wraps at 768 by design), `navFace` (`:651`–`652`); JP-086's fit
  (`EncoreSection.jsx:1826`); `THEME_RAMP` (`EncoreBuilder.jsx:115`–`133`).
- Retro's half: `<Title size={tab ? s.h1 : s.dispLg} … twoTone>` (`:2470`–`2471`), 79 / 60 / 40;
  its 768 row centred (`:2549`). Retro's face is Fraunces, which has no ems table (`navFace` is null).

**Fix.** In the `s.limeTree` block: `identity` takes `containerType: 'inline-size'` at every width,
and the title is `s.cardNameEms ? min(${s.dispLg}, calc(100cqi / ${s.cardNameEms})) : s.dispLg`,
passed unfaced (`Title` applies `faced()`). It wraps between words and shrinks only when its widest
word would outrun the column. Lime's and Grunge's desktop scroll and 768 overlap go with it: one
block, one key, each twin's `cardNameEms` already in its own face.

**Decision (light).** Retro's half overflows the same way (desktop +107, 768 over the cards by
128), and at 390 its **nav** pushes the Book pill 36px past the page with *Featherstonehaugh*.
- **A (recommended). Name it, not fixed here.** No Retro ticket, and a fit needs a Fraunces ems
  table.
- **B. A Fraunces ems table** (`frauncesEms`, `NOTO_EM`'s recipe) and the same fit in Retro's half.
  M, its own entry after this one.
- **C. `overflowWrap: 'break-word'` in Retro's half.** No table, but it breaks inside a word, the
  thing every Lime-tree name fit avoids (CLAUDE.md, JP-062).

**Expected after-diff: zero** on the seed, every category, themes 0–3, both surfaces: the `min()`
resolves to the ramp under all three, and `identity` is already parent-sized. Header `arch 1` and
`5` are the files at risk.

**Verify.** The five names (above) at 1180, 1440 and 1920 on the published tab, 768, and 360 / 390
/ 414, under Editorial, Lime and Grunge: every word's `Range` one rect, ending inside the column (at
768 short of the cards' left edge) and inside the section; the section's and the document's
`scrollWidth` equal to the width; the seed at the ramp (97 / 73 / 48 under Editorial). Card 2 in the
real app with *Maximilian Featherstonehaugh* at the three widths. The nav wordmark with the same
names (it did not overflow under the three at triage).

**Docs.** `HeaderV1`'s identity and title comment (`:2146`–`2160`); the `vm.cardNameEms` comment
(add `HeaderV1` to its readers); `notes/templates.md`'s *Feature spread* clause; a *reversed*
pointer on `layout-2.md:931`; the answer to `qa-fixes.md:798`'s named layout-2 item.

**Decided** (2026-10-01, user call): **A. Retro's half is named, not fixed here.** There is no Retro
ticket, and a fit would need a Fraunces ems table.

Asked over the evidence, re-checked on HEAD (`de631ab`). JP-093 touched `EncoreSection.jsx` only
from `:24191` down and `EncoreBuilder.jsx` not at all, so every line held: `HeaderV1` at `:1917`,
its block `:1918`–`2283`, `identity` at `:2151`, the title at `:2159`–`2160`, the rows at
`:2252`–`2279`, `Title` at `:935`–`958`, JP-086's fit at `:1826`, Retro's half at `:2470`–`2471`
and `:2549`, and `navFace` / `navNameEms` / `cardNameEms` at `EncoreBuilder.jsx:651`–`674`.

**Reproduced in the real app** (puppeteer: card 2 published, the tab caught from the opener, *Title*
typed in the edit panel; each word's text-node `Range`). *Maximilian Featherstonehaugh*:

| Template | 1440 | 768 | 390 |
|---|---|---|---|
| Editorial (97 / 73 / 48) | the word **433.19** past the section, page `scrollWidth` 1873 (the tester's 433) | **309.91** under the cards | **76.27** past, page 466 (the tester's 76) |
| Lime (107 / 81 / 54) | 165.34 past, page 1605 | 147.86 under the cards | fits (354.58 of 370) |
| Grunge (80.25 / 60.75 / 34.5) | 68.03 past, page 1508 | 87.47 under the cards | fits |
| Retro (79 / 60 / 40) | 130.17 past, page 1570 | 127.69 under the cards | the title fits; the nav's Book pill ends at **426.28**, 36.3 past |

1440 is zoomed (× 1.22), so Editorial's 433 is the triage's +355 layout px. One reading the triage
did not have: at **768 under Editorial, MAXIMILIAN alone** (388.78 at 73px) overruns the 324 column
by 64.78 and runs 4.78 under the cards. The fit covers it, since the widest word sets the size. No
console errors.

**Settled** (2026-10-01).
- **The code.** In `HeaderV1`'s `s.limeTree` block:
  - `identity` takes `containerType: 'inline-size'` at every width (`EncoreSection.jsx:2153`). It is
    sized by its parent at all three, so the container moves nothing.
  - The title is `s.cardNameEms ? min(${s.dispLg}, calc(100cqi / ${s.cardNameEms})) : s.dispLg`
    (`:2168`). It is passed unfaced: `Title` applies `faced()`, and Grunge's `navFace` ems are
    already × 0.75, so the fitted word comes to `100cqi` under all three.
  - The comments over both say why, with the *reversed* pointer. The `vm.cardNameEms` comment
    (`EncoreBuilder.jsx:670`–`675`) names `HeaderV1` among its readers. Nothing on `Title`, and
    Retro's half is untouched.
- **Digest: 0 of 528 on each surface** (themes 0–3, all categories, three widths, canvas and
  `live=1`), as named. The harness was proved first: a fresh HEAD worktree on :5174 against the
  unedited tree on :5173 came to 0 of 528 on each surface after the port and stamp
  normalisation. **Positive control:** the same header digest with `&cj=` on *Maximilian
  Featherstonehaugh* differs in **14 of 72** files per surface. They are header `arch 1` and `5`
  under Lime and Grunge at desktop and 768, and under Editorial at all three widths, which are
  exactly the renders where the name overflowed. Lime and Grunge 390 already fit, and nothing moves
  under Retro.
- **The 1088 canvas** (the editor's Desktop tab, a 1440 window with the edit panel open; the
  column 475). The seed sets at the ramp under all three: **97 / 107 / 80.25**. MERCER's limit
  there is 475 / 3.412 = 139.2 under Editorial. The long names fit: Editorial *Featherstonehaugh*
  49.48, Lime 71.80, Grunge 61.11, each word one rect and inside the column.
- **The setup modal's card 2 and the layout picker's thumbnail** (the two other desktop renders of
  header `arch 1`) lay the 1180 desktop out and scale it, so their column is 521. The seed reads
  97 / 107 / 80.25 under Editorial / Lime / Grunge in both, the same as HEAD. Only the column's
  `containerType` differs.
- **The published tab**, card 2 under Editorial, Lime and Grunge, the five names at 1180, 1440,
  1920, 768, 414, 390 and 360 (105 renders):
  - **Every computed font-size is `min(ramp, column ÷ ems) × faceK`** to within 0.002px, with the
    column taken from its computed `width` (unzoomed) and the ems from `data.js`'s tables. The
    fitted size is the same at 1180 and 1440 and 0.03–0.05 smaller at 1920, where the gutter takes
    the column 0.36 narrower. A `cqi` resolved against the viewport would have read the ramp
    there.
  - **No word breaks inside itself** (every word's `Range` is one rect).
  - **Every word ends inside its column.** The widest ends 0.12 short at worst (Lime's
    *Supercalifragilistic* at 360), and at 768 every word is **60.1 or more** short of the cards'
    left edge.
  - The header section's `scrollWidth` equals the width at every row but one (below). The seed
    keeps the ramp everywhere: 97 / 73 / 48 under Editorial, 107 / 81 / 54 under Lime and
    80.25 / 60.75 / 34.5 under Grunge.

  | Fitted (px) | 1440 | 768 | 390 | 360 |
  |---|---|---|---|---|
  | Editorial FEATHERSTONEHAUGH | 54.27 | 33.74 | 38.53 | 35.41 |
  | Editorial SHOSTAKOVICH | 80.16 | 49.84 | 48 (ramp) | 48 |
  | Editorial SUPERCALIFRAGILISTIC | 53.74 | 33.41 | 38.16 | 35.06 |
  | Lime FEATHERSTONEHAUGH | 78.74 | 48.96 | 54 (ramp) | 51.38 |
  | Lime SUPERCALIFRAGILISTIC | 76.37 | 47.48 | 54 | 49.82 |
  | Grunge FEATHERSTONEHAUGH | 67.03 | 41.67 | 34.5 (ramp) | 34.5 |
  | Grunge SUPERCALIFRAGILISTIC | 64.06 | 39.83 | 34.5 | 34.5 |

  *Florence and the Machine* and *Kai Mercer* keep the ramp at every width under all three. So
  does Lime's and Grunge's *Shostakovich*, except at 768 (71.68 and 59.84) and Lime's 1088
  canvas (105.12).
- **The nav wordmark** with the five names: one rect, inside the section, at every width under
  all three.
- **Named, not fixed here** (each reads the same on HEAD):
  - **Retro's half** (Decided A): the table above.
  - **Editorial's 390 nav at 360**: with *Featherstonehaugh* the Book pill ends at **361.42**, so
    the header reads 361 / 360. Its wordmark ends at 246. At 390 and 414 it fits, and so does
    *Supercalifragilistic* at 360.
  - **The footer's rule**: the 2 × 150 `flex: 0 0 auto` rule beside the footer's name is pushed
    past the page by a long word. This is now what scrolls the page. With *Featherstonehaugh* it
    ends at 424.95 under Editorial, 403.83 under Lime and 491.63 under Retro at 390 (436.95 /
    415.83 at 414). At 360 the other long names do it too (JP-086's footer item, which now
    points here). Grunge's footer fits. **Answered by JP-092 (rest)**
    ([`retest-qa-fixes.md`](./retest-qa-fixes.md), 2026-10-05): the rule now yields to the name,
    down to a 30 floor, and a name past that wraps between words, in both footer trees.
  - **The media player's byline** runs past the 390 page with *Featherstonehaugh* (401.75), but
    its section clips it, so it does not scroll the page.
- **The real app is the published table above.** The steps were the tester's (card 2, *Title*
  typed, Publish, Open). The pages scroll only on the footer and the 360 pill named above. No
  console errors.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed.
- **Docs.** The `identity` and `Title` comments in `HeaderV1`, and the `vm.cardNameEms` comment.
  `notes/templates.md`'s *Feature spread* clause now says the title is fitted to its column's
  widest word, as Hero's is, and that the same block fits Lime's and Grunge's. `layout-2.md:931`
  gets the *reversed* pointer. JP-086's named layout-2 item in `qa-fixes.md` is answered, and its
  footer item gains the 390 / 414 reading. No CLAUDE.md or README line stated the old call.

---

## JP-095 (a) — pricing, calendar, media and testimonials labels no field reaches

**Verdict: confirmed, JP-090's rule again.** The triage's marker sweep (every text field and list
row of the category set to a marker, `arch 1`, themes 0–4, three widths, `live=1`) leaves every
reported literal on **all five templates**: each sits in both layout-2 bodies (the `s.limeTree`
block and Retro's and Pop's), but for the calendar's prompt, which `sectionVm` composes for every
layout. Two of them are CLAUDE.md's named exceptions: *"The unreported siblings stay literals: the
bio's `Bio` eyebrow, media layout 2's `● Featured`, the calendar legend and testimonials layout 2's
`✎ What clients say`"* — now reported.

| Literal | `s.limeTree` site | Retro / Pop site | Other layouts | Seat for a key |
|---|---|---|---|---|
| `[ PRICING ]` | `EncoreSection.jsx:9165` | `:9377` | — | new (pricing has no kicker) |
| `WHAT’S INCLUDED` | `:9280` | `:9542` | — | new |
| `Date ↓` / `Availability ↓` | `:15774`–`15775` | `:15877`–`15878` | — | new, two |
| *Pick a date to enquire* | `vm.calPrompt` (`EncoreBuilder.jsx:1312`), read at `:15585` | the same | layouts 1, 3 and 4 (`:15033`, `:16105`, the layout-4 date card via `EncoreBuilder.jsx:1376`) | new, `in` all four |
| `● Featured` (fan card 0's chip) | `:6684` | `:6980` | — | new |
| `{n} Featured / {n} Max` (counter row) | `:6797` | `:7118` | layout 3 (`:7519`, `:7648`); layout 1 prints `{n} / {n} Featured` (`:5884`, `:6230`) | new |
| `✎ What clients say` | `:21525` | `:21692` | layout 3 prints `● {s.testiKicker}` | **`testimonials.kicker`**, `in: [2]`, seeded `TESTI_KICKER` 'Testimonials' (`data.js:735`): the same seat |

- **The prompt is the build's, not a frame's.** The frame's foot reads *Thursday evening selected*;
  the prompt prints whenever no day is cued, which on the published page is always, since the seeded
  `CAL_OPEN` (2025-06-12) has passed. Its siblings, the slot line's " selected"
  (`EncoreBuilder.jsx:1478`–`1482`), went unreported.
- **"Max" is the track count again**, not a maximum (`TracksField`'s cap is 8). The frame reads
  *5 FEATURED / 5 MAX*. The counter's other end is `media.listLabel` (*● Popular*, `in: [1, 2]`,
  JP-071).
- **Casing decides the zero diff.** `[ PRICING ]` and `WHAT’S INCLUDED` (a curly `&rsquo;`) are
  capitals in the JSX; the digest compares `textContent`. Every other literal is mixed case under a
  CSS `uppercase`. So either those two seed the capitals they print, or they seed the frame's case
  under an added `textTransform` and name text-only rows (the convention every other label follows).

**Evidence.** The table, and:
- `notes/media.md`, `notes/calendar.md`, `notes/pricing.md`, `notes/testimonials.md`: none names
  these as calls; `../retro/layout-2.md:350`–`356` (*"A frame label … stays a literal, the media
  player's '● Popular' precedent"*, annotated as narrowed by JP-071 to unreported labels).
- `EditPanel`'s chain: the `kicker` arm is gated on `map` "since the testimonials carry a `kicker`
  too" (`EncoreBuilder.jsx:4052`), so the testimonials' per-layout seed needs an arm of its own.
- `reach.mjs` already has `testimonials.kicker` (`:99`).

**Decision.**
1. **The keys** — **A (recommended). JP-071's shape**, seeded with the literal, uncased, dropped
   when emptied, markup (`[ ]`, `↓`, `●`, `✎`, the counts) the site's:
   - pricing `kicker` (*Pricing*) and a features label (*What’s included*), `in: [1]`;
   - calendar `dateLabel` and `availLabel`, `in: [1]`;
   - media: the chip's word and the counter's two words, `in` as measured (the counter at layouts
     2 and 3, and layout 1's *Featured* if the same key reads there);
   - testimonials: **extend `kicker`** to `[1, 2]` through a per-layout seed (*What clients say* at
     `d === 1`, `TESTI_KICKER` at 2), `mapKickerSeed`'s shape, with its own chain arm.

   The session picks the names the panel reads best.
2. **The media counter** — **A (recommended). Two word fields** (*Featured*, *Max*), so the row's
   counts stay derived. **B.** One key for both of media's *Featured*s (the chip and the counter).
   Against "each field allocated exactly once". **C.** The counter's words stay, as derived
   markup, with a reply.
3. **The prompt** — **A (recommended). A field that reads its seed again when emptied**
   (`messageLabel`'s rule), `in` all four layouts: an empty foot would read as broken. **B.**
   Dropped when emptied.
4. **The unreported siblings** (the repertoire's `All` chip, `REP_ALL`, and its search placeholder;
   the slot line's " selected"; the footer's *A JustPay Product*) — **A (recommended). Named, not
   fielded**, the rule CLAUDE.md states, with the sibling list rewritten. **B.** Field them now, ahead
   of the next report.

**Expected after-diff (on 1A): zero** on the seed, every category, themes 0–4, both surfaces, if
each key reproduces its rendered bytes; otherwise exactly the named text rows of pricing `arch 1`.
The proof is the tester's marker sweep: each new key moves exactly its text row, and an emptied
value removes exactly its node (or reads its seed again, for the prompt).

**Verify.** The seed digest; the marker sweep per key under themes 0–4 at three widths, canvas and
`live=1`; `reach.mjs` for every new or re-scoped key; Editorial card 2 in the real app with every
field marked, published at 1440 / 768 / 390, none of the eight left; the testimonials' *Kicker*
loses its "Not shown in this layout" on card 2; long typed labels wrap (JP-090's `nowrap` sites:
`whiteSpace: 'normal'`, `overflowWrap: 'anywhere'`, `minWidth: 0`).

**Docs.** CLAUDE.md's JP-071 / JP-090 paragraph (the keys, the testimonials kicker's reach, and the
sibling list, which loses `● Featured` and `✎`); `notes/pricing.md`, `notes/calendar.md`,
`notes/media.md`, `notes/testimonials.md`; `reach.mjs`.

**Decided** (2026-10-01, user call): **1A, 2A, 3A, 4A**, every recommendation.
1. **JP-071's shape.** Each label is seeded with the text its site renders, uncased, and not drawn
   when emptied; the `[ ]`, `↓`, `●`, `✎` and the counts are the markup's. Pricing's two seed the
   **capitals the frame types**, `PRICING` and `WHAT’S INCLUDED` (`964:64610`'s text layers are
   named `[ PRICING ]` and `WHAT'S INCLUDED`, and a layer's name defaults to its characters), with no `textTransform` added, so a typed label prints as
   typed; the seed keeps the build's curly `’`, which is what renders. The testimonials' `kicker`
   reaches layout 2 through a per-layout seed, *What clients say* there and *Testimonials* at
   layout 3, `mapKickerSeed`'s shape.
2. **Two word fields for the counter**, *Featured* and *Max*, the counts derived. *Featured* reaches
   layout 1's `5 / 5 Featured` as well (JP-071's same-word rule, measured). An emptied word takes
   its count and the ` / ` with it (the map list label's rule, JP-090); both emptied, the counter
   is not drawn and the row stays.
3. **The prompt reads its seed again when emptied** (`messageLabel`'s rule), at all four layouts.
   It stays `cased()` in `sectionVm`, as `calSlotCta` and the slot line beside it are: the one key
   here that is not uncased.
4. **The unreported siblings are named, not fielded.** CLAUDE.md's list loses `● Featured` and `✎`
   and gains the repertoire's `All` chip and search placeholder, the slot line's " selected" and
   the footer's *A JustPay Product*.

Asked over what the session found first, on HEAD (`4066729`):
- **Every *Evidence* line moved as JP-092 predicted**: `EncoreSection.jsx` +9 (`:9174`, `:9386`;
  `:9289`, `:9551`; `:15783`–`15784`, `:15886`–`15887`; `:6693`, `:6989`; `:6806`, `:7127`;
  layout 3's `:7528`, `:7657`; layout 1's `:5893`, `:6239`; `:21534`, `:21701`; the prompt's readers
  `:15042`, `:15594`, `:16114`) and `EncoreBuilder.jsx` +2 (`vm.calPrompt` `:1314`, the date card
  `:1378`, the slot line `:1480`–`1484`, the chain's map-gated `kicker` arm `:4054`).
- **Reproduced in the real app** (puppeteer: card 2, every text field and list row of the four
  sections set to a marker through `st`, Publish, Open, each section's text nodes read at 1440, 768
  and 390). Under Editorial, Lime, Grunge and Retro alike, at every width, exactly the eight are
  left: `[ PRICING ]`, `WHAT’S INCLUDED`, `Date ↓`, `Availability ↓`, *Pick a date to enquire*,
  `● Featured`, `Featured /` … `Max`, `✎ What clients say`. The rest is derived or markup: the
  brand, the initials, the head's link list (the sections' nav labels), the slot's own date, the
  stars, ♡ ⋯ and the quote mark. No console errors.
- **The harness was proved first**: a fresh HEAD worktree on :5174 against the unedited tree on
  :5173, themes 0–4, every category, three widths: **0 of 660 on each surface** after the port and
  stamp normalisation (194 raw, all the port).
- **Expected after-diff: zero** on the seed, every category, themes 0–4, both surfaces. **Its blind
  spot is the prompt**: the canvas never reads the clock and `&today=` is opt-in, so no harness
  render prints it unless the cued day is blocked. Its proof is a sweep over `booked: [CAL_OPEN]`.

**Settled** (2026-10-01).
- **`data.js`.** Nine constants sit beside JP-090's (`:749`–`769`): `PRICING_KICKER` "PRICING",
  `PRICING_FEATS_LABEL` "WHAT’S INCLUDED", `CAL_DATE_LABEL` "Date", `CAL_AVAIL_LABEL`
  "Availability", `CAL_PROMPT` "Pick a date to enquire", `MEDIA_CHIP_LABEL` and `MEDIA_COUNT_LABEL`
  "Featured", `MEDIA_TOTAL_LABEL` "Max" and `TESTI_KICKER_2` "What clients say". Beside them is
  `testiKickerSeed(d)`, `mapKickerSeed`'s shape.
- **The fields.** Each has a hint that says where it prints and what emptying it does, and each
  `in` is measured.
  - Pricing: `kicker` *Kicker* ahead of `heading`, and `featsLabel` *Features label*, both `in: [1]`.
  - Calendar: `prompt` *Prompt* (no `in`, since every layout reads it), and `dateLabel` *Date column
    label* and `availLabel` *Availability column label* after `slots`, both `in: [1]`.
  - Media: `countLabel` *Counter label* `in: [0, 1, 2]`, `totalLabel` *Counter total label*
    `in: [1, 2]` and `chipLabel` *Card chip* `in: [1]`, after `listLabel`.
  - Testimonials: `kicker` is now `in: [1, 2]`.
- **`sectionVm`.**
  - The plain `cv()` reads are `vm.mediaChip`, `vm.countLabel` and `vm.totalLabel` (`:824`),
    `vm.pricingKicker` and `vm.featsLabel` (`:932`), and `vm.calDateLabel` and `vm.calAvailLabel`
    (`:1341`).
  - `vm.testiKicker` is `cv('kicker', testiKickerSeed(d))` (`:1125`).
  - `vm.calPrompt` is `cased(String(cv('prompt', CAL_PROMPT)).trim() || CAL_PROMPT)` (`:1331`).
  - `EditPanel`'s chain has its own testimonials `kicker` arm (`:4077`), beside the map's.
- **`EncoreSection`, both bodies at every site.**
  - **Pricing** (`:9211`, `:9331`; Retro and Pop `:9434`, `:9604`). The kicker prints
    `` {`[ ${kicker} ]`} ``, one text node as the literal was.
  - **Calendar** (`:15843`; Retro and Pop's `colHead` `:15958`).
    - The labels print `` {`${label} ↓`} ``.
    - An emptied Date keeps its pinned span, so Availability stays over its column. With both
      emptied the row and its rule go, which is 3 elements and about 51px (5 elements under
      Editorial, whose rule is a `DashRule`).
    - The Date span is `flex: 0 1 auto` with its old pin as `minWidth`, so a long label wraps no
      narrower than its column.
  - **Media.**
    - The fan chip (`:6718`; Retro and Pop `:7016`) prints `` {`● ${chip}`} ``.
    - Layouts 2 and 3's counter (`:6836`, `:7160`, `:7562`, `:7691`) is `trackCount(s)` (`:5731`).
      Each word goes with its count, and the ` / ` stands only between two. It renders in the
      four text nodes the literal made, `5`, ` Featured / `, `5`, ` Max`.
    - Layout 1's counter (`:5913`, `:6264`) appends `countLabel` inside its one template literal.
      Emptied, it is `null`, and the narrow column loses its 32 gap with it.
  - **Testimonials** (`:21624`, `:21793`) prints `` {`✎ ${kicker}`} ``, one node as
    `&#9998; What clients say` was. The layout-2 head comment that named it a kept literal is
    rewritten.
- **Typed labels wrap.** Every new site takes `whiteSpace: 'normal'`, `overflowWrap: 'anywhere'`
  and `minWidth: 0` where it was `nowrap`.
  - The fan chip, which is `absolute` on a clipping card, takes a `maxWidth` that keeps its own
    inset from the right edge.
  - The counter is `trackCountFit()`: `flex: none` and `maxWidth: calc(100% - gap)`. It keeps its
    line and right-hand seat beside a wrapping `listLabel`, as JP-071 measured, and wraps only
    once it is itself wider than the row.
  - Layout 1's counter keeps to half the desktop row, so the heading keeps its column. (Its
    `flex: 1` title block has a 0 basis, so an unbounded counter would take the whole row.)
  - **The prompt's six sites gained a break.** The first states run found a 53-character word
    running 19–79px past its box at 390 at all four layouts, clipped by the section, because the
    lines had never held typed text. Those sites are layout 1's line in both bodies, layout 2's
    in the `s.limeTree` block and at Retro's and Pop's 390, layout 3's two pills, and layout 4's
    date card `sub` in both `infoRow`s.
- **Digest: 0 of 660 on each surface** (themes 0–4, every category, three widths), as named, both
  before and after the wrap fixes. The harness had been proved first (above).
- **Reach** (nine rows in `reach.mjs`, themes 0–4). Each key moves exactly the designs its `in`
  names, in 6 of 6 renders under every template: pricing's two at layout 2, the calendar's labels
  at 2, `prompt` at all four (on its blocked-day base), `chipLabel` at 2, `countLabel` at 1–3,
  `totalLabel` at 2 and 3, and `testimonials.kicker` at 2 and 3. A Node check of `fieldReach()`
  against the same table found 0 mismatches.
- **States** (a scratch puppeteer run, deleted). Each key was rendered at its layouts × themes 0–4
  × three widths × both surfaces, 480 cells, as the seed, a marker, emptied, 85 characters and one
  53-character word. The text `Range` was read against the nearest clipping box and the section.
  - A marker moves only its own rows. The exceptions are expected: layout 1's title block, which
    shares the counter's row, and layout 1's spinning seal, which the throwaway probe did not skip.
  - Emptied, each label loses exactly its element. The Date label keeps its seat, and the prompt
    renders text identical to the seed at all four layouts.
  - No long state scrolls the page, and none runs past its box, with one exception: Retro's and
    Pop's layout-2 foot at 768, which is `nowrap` and ellipsised by design, as it always was for
    the slot line.
  - Both words emptied: the media counter goes and its row stays. Both calendar labels emptied:
    the head row goes.
- **The real app.** Card 2 under Editorial, Lime, Grunge and Retro (puppeteer, the fields set
  through `st`, Publish, Open, read at 1440, 768 and 390):
  - The panel seeds each new field with its literal. The testimonials' *Kicker* reads *What
    clients say*, with no "Not shown in this layout".
  - With every field marked, **none of the eight is left** at any width.
  - With only the new labels emptied, no label or bare glyph is drawn: no `[ ]`, no `↓` head, no
    counter, no `●` chip and no `✎`. The prompt reads *Pick a date to enquire* again.
  - No console errors.
- **Not taken:** the 1088 Desktop canvas. No rule here is fitted to a width, and every seed sits
  far inside its box.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed.
- **Docs.**
  - CLAUDE.md's label paragraph: the eight keys, `kicker`'s new reach, the prompt, and the
    rewritten sibling list.
  - A bullet each in `notes/pricing.md`, `notes/calendar.md`, `notes/media.md` and
    `notes/testimonials.md`.
  - *Now reported* pointers where `● Featured` and `✎` were named kept: `../grunge/retest-qa-fixes.md`
    (JP-071's head and reply) and `qa-fixes.md` (JP-090's verdict). A narrowing line in
    `../retro/layout-2.md` beside the label rule.
  - `reach.mjs` gets the eight new rows.

Reply: **JP-095 (a) — fixed.** Eight labels on layout 2 are now editable on every template, in the
editor and on the published page. Each starts as the design's text, and each can be emptied to
hide it.
- **Pricing**: *Kicker* (the "[ PRICING ]" over the heading) and *Features label* ("WHAT'S
  INCLUDED"). They print as typed, so type capitals to keep the design's look.
- **Booking Calendar**: *Date column label* and *Availability column label* over the list of dates.
  Emptying both removes the row. *Prompt* is "Pick a date to enquire", which every calendar layout
  shows while no date is picked. Left empty, it shows the design's text again, because the space
  would otherwise look broken.
- **Media Player**: *Card chip* ("● Featured" on the front card). *Counter label* and *Counter total
  label* are the two words of "5 Featured / 5 Max", and *Counter label* is layout 1's "5 / 5
  Featured" too. The numbers are the track count. An emptied word takes its number with it.
- **Testimonials**: *Kicker* now changes "✎ What clients say" and no longer says "Not shown in this
  layout". Layout 3 still starts from "Testimonials".
- A long label wraps rather than running off a phone screen. Labels nobody reported stay as the
  design draws them: the Bio's "Bio" eyebrow, the Booking Calendar's legend and its "… selected"
  line, the Repertoire's "All" chip and search hint, and the footer's "A JustPay Product".

---

## JP-095 (b) · JP-096 — the map's travel card and list labels

**Verdict, JP-095: confirmed**, nine literals in both bodies, every template, two of them in the
seat of a key that already exists. **JP-096: confirmed, and a recorded call.** Every frame —
Editorial `964:64613` / `986:15672` / `986:15691`, Lime `964:64594`, Grunge `964:64632`, Retro
`964:64651` / `986:11467` — types the card in the same order:

> Travel radius · Venue Distance · ● Confirmed · **Based in** · Manchester, UK · Home location ·
> ──●── · **Willing to travel to** · Lake District · Venue location · Max travel · 100 mi · Travel
> time · ~2 hrs · Booking fee · £1,200 · Venue Link · Get Directions · Other upcoming · 4

Retro's fit printed two lines a column where the frame prints three, on purpose: *"Where a frame
label duplicates what our field's own copy says ('Based in' over `base`, whose default is 'Based in
Manchester'), drop the label, not the field"* (`../retro/layout-2.md:606`–`608`; the code comment
at `EncoreSection.jsx:18675`–`18678`, "printing both would stutter"). Lime, Grunge and Editorial
inherited it (`layout-2.md:1587`).

| Literal | `s.limeTree` site | Retro / Pop site | Seat for a key |
|---|---|---|---|
| *Travel radius* (eyebrow over the h2) | `:18282` | `:18658` | **`map.kicker`**, `in: [0, 2]`, `mapKickerSeed(d)` (`data.js:748`): extend to `d === 1` |
| *Home location* / *Venue location* | `:18303` / `:18319` | `:18694` / `:18712` | new, two |
| *Max travel* / *Travel time* / *Booking fee* | the `stats` array, `:18155`–`18157`, shared by both bodies | the same | new, three; each heads a field (`radius` *Coverage* — JP-060 —, `travelTime`, `fee`) |
| *Venue Link* (a `BookPill` label) | `:18359` | `:18754` | new (`map.cta` is layout 3's *See all gigs*) |
| *Get Directions* | `:18366` | `:18771` | new |
| `Other upcoming · {n}` | `:18434` | `:18854` | **`map.listLabel`**, `in: [0]`, seeded *Upcoming gigs* (JP-090): the same seat and `· N` markup; extend through a per-layout seed |

**The home and venue values.** Home prints `s.mapBase` = `cv('base', MAP_BASE)`
(`EncoreBuilder.jsx:1635`), `MAP_BASE = 'Based in Manchester'` (`data.js:944`), `FIELDS.map.base`
*Based in*, `in: [0, 1, 2]` (`data.js:1832`). Venue prints the featured gig's `g.city`, which no
field reaches. `base` also prints at layout 1 beside the globe (`:17637`, `:17889`; its frame types
*Based in Manchester*, where the seed came from) and in layout 3's foot line `[base, 'N pins',
radius].join(' · ')` (`:19688`, `:20108`). The header's `location` (`vm.location`, seeded
*Manchester, UK*) is the frame's home value exactly, and reaches every section through `identity`.

**Seen on the tester's screenshot, not filed:**

| Seat | Frame | Build | Reads |
|---|---|---|---|
| card h2 | Venue Distance | MANCHESTER | `FIELDS.map.heading`, `d: 'Manchester'` (`TITLES.map`), no `d === 1` seed (`TESTI_HEADING_2`'s arm is the pattern, `EncoreBuilder.jsx:1075`, chain `:4048`) |
| chip | ● Confirmed | ● Jul 12 · 22:00 | `g.when`, JP-060's decision A |
| venue | Lake District | Manchester | the featured gig, which falls back to the page's first; the frame features its third |
| Max travel | 100 mi | 12 mile radius | `MAP_RADIUS` (`data.js:943`), already a follow-up with the designer (`../grunge/layout-4-qa-fixes.md:2120`–`2123`, note 10) |

**Evidence.** The two tables, and `notes/map.md:31` (*Other upcoming* is derived: only the words are
a literal), `:94`–`107` (JP-090: `mapKickerSeed`, the chain arm gated on `map`, the list label as
two text nodes — splitting the `·` moved Lime's and Grunge's widths by 0.1); JP-040 in
`../lime/layout-2-qa-fixes.md:722`–`798` (the card's claims re-seated as fields); `reach.mjs` has
`map.kicker` (`:98`), `map.listLabel` (`:103`) and `map.base`.

**Decision.**
1. **JP-095's keys** — **A (recommended).** JP-071's shape for the two captions and the three stat
   labels, `in: [1]`; `map.kicker` and `map.listLabel` extended to layout 2 through per-layout seeds
   (*Travel radius*, *Other upcoming*), in `sectionVm` and the chain alike.
2. **The two pill labels** — **A (recommended). Read the seed again when emptied**
   (`messageLabel`'s rule): a pill with no label is a broken control. **B.** Dropped, and the pill
   with it.
3. **JP-096, the home value** under its new *Based in* label (and *Willing to travel to* over the
   venue, both JP-071's shape, `in: [1]`):
   - **A. Re-seed `base` at layout 2 alone** (*Manchester, UK*, `mapBaseSeed(d)`, mirrored). Once
     the artist types `base`, one value serves every layout: a typed *Manchester, UK* reads bare at
     layout 1, and a typed *Based in X* stutters at layout 2 (`tiersSeed`'s caveat).
   - **B. The labels alone.** Reprints *Based in / Based in Manchester*, the stutter Retro dropped
     the label to avoid.
   - **C (recommended). Layout 2's home value reads the header's `location`**, the frame's own
     *Manchester, UK*, which the artist already types once (F1). No new seed, no stutter; `base`
     drops to `in: [0, 2]` and its panel says so at layout 2, and `who.location`'s reach gains map
     layout 2 (its `reach.mjs` probe and the header field's hint move too).

   Whichever is chosen, the new label cannot read as the same panel row as `base`, which is already
   labelled *Based in*: name it *Home label* or the like.
4. **The unfiled seats** — **A (recommended). Named, not fixed**: none is reported, and two are
   recorded calls (JP-060, `MAP_RADIUS`). **B.** Seed the h2 *Venue distance* at `d === 1`.

**Expected after-diff.** JP-095's keys (1A): zero on the seed, themes 0–4, both surfaces. JP-096:
map `arch 1` × themes 0–4 × three widths × both surfaces: the two label rows added, and under 3C or
3A the home value's text (*Manchester, UK*), and the card taller by a label line a column. Layouts
1, 3 and 4: 0. The session names the rows before the code.

**Verify.** The seed digest; the marker sweep per key at `arch 1` (and `kicker` and `listLabel` at
`arch 0` and `arch 2` unchanged); an emptied label removes its node (a pill reads its seed again);
`reach.mjs` for every new or moved key, `map.base` re-run (and `who.location` under 3C); under 3C a
`&who=` run with a typed location, which the home value must follow; the card at 390 and 768 with long typed
labels (wrapping, no overflow); the pill row at 768 still wraps under Editorial (layout-2.md's
section 8 override); card 2 in the real app, every field marked, none of the nine left.

**Docs.** CLAUDE.md's JP-071 / JP-090 paragraph (the keys and `kicker`'s and `listLabel`'s reach);
`notes/map.md`; a *reversed* pointer at `../retro/layout-2.md:606` and on the code comment at
`:18675`; `layout-2.md:1587`'s *Inherited whole* clause.

**Decided** (2026-10-01, user call): **1A, 2A, 3C, 4A**, every recommendation.
1. **JP-071's shape.** Each label is seeded with its literal, uncased, and not drawn when emptied;
   the `·` and the count are the markup's. The new keys, all `in: [1]`:
   - `homeCaption` *Home caption* (*Home location*) and `venueCaption` *Venue caption* (*Venue
     location*);
   - `radiusLabel` *Max travel label*, `travelTimeLabel` *Travel time label* and `feeLabel`
     *Booking fee label*. A stat's label still goes with its value.
   - `venueCta` *Venue link button* and `routeCta` *Directions button*.

   `map.kicker` (*Travel radius*) and `map.listLabel` (*Other upcoming*) reach layout 2 through
   per-layout seeds, in `sectionVm` and `EditPanel`'s chain alike.
2. **An emptied pill label reads its seed again** (`messageLabel`'s rule). The pill always stands.
3. **C: layout 2's home value is the header's `location`**, *Manchester, UK*, the frame's own value.
   `base` drops to `in: [0, 2]`, and `who.location`'s reach gains map layout 2. The two new labels
   over the values are `homeLabel` *Home label* (*Based in*) and `venueLabel` *Venue label*
   (*Willing to travel to*), JP-071's shape, `in: [1]`. Neither reads as `base`'s *Based in* row.
4. **The unfiled seats are named, not fixed**: the h2 (*Venue Distance* / the heading), the chip
   (*● Confirmed* / the gig's date, JP-060), the featured venue (the page's first gig, where the frame
   features its third) and *100 mi* (`MAP_RADIUS`, already with the designer).

Asked over what the session found first, on HEAD (`843c38b`):
- **Every *Evidence* line moved as mapped**: `EncoreSection.jsx` +97 (the `stats` array
  `:18252`–`18254`; *Travel radius* `:18379` / `:18755`; *Home location* `:18400` / `:18791`; *Venue
  location* `:18416` / `:18809`; *Venue Link* `:18456` / `:18851`; *Get Directions* `:18463` /
  `:18868`; *Other upcoming* `:18531` / `:18951`; Retro's comment `:18772`–`18775`; `mapBase`'s
  readers `:17734`, `:17986`, `:19785`, `:20205`). `EncoreBuilder.jsx`: `vm.mapBase` `:1658`, the
  chain's map `kicker` arm `:4076`. `data.js`: `mapKickerSeed` `:748`, `MAP_BASE` `:965`,
  `FIELDS.map.base` `:1883`.
- **Reproduced in the real app** (puppeteer: card 2, every `FIELDS.map` text field and every gig and
  stat row set to a marker through `st`, Publish, Open, `#map`'s text nodes read at 1440, 768 and
  390). Under Editorial, Lime, Grunge and Retro alike, at every width, exactly the nine are left:
  *Travel radius*, *Home location*, *Venue location*, *Max travel*, *Travel time*, *Booking fee*,
  *Venue Link*, *Get Directions* and *Other upcoming ·*. The rest is markup: the chip's `●`, the
  count, the rows' `·`, and `+ − →` (Retro draws no zoom). No console errors.
- **Figma** (`get_metadata`, `964:64613`). The text layers' names, which default to their
  characters, type every label in the build's own case: *Travel radius*, *Based in*, *Home
  location*, *Willing to travel to*, *Venue location*, *Max travel*, *Travel time*, *Booking fee*,
  *Venue Link*, *Get Directions* and *Other upcoming · 4*. The home column is *Based in* /
  *Manchester, UK* / *Home location* at y 0 / 20 / 52, so the column's 3 gap holds the new line.
  The narrow frames (`986:15672`, `986:15691`) keep *Willing to travel to* on one line (102 in
  columns of 105 and 119). They let *Manchester, UK* run past the 768 column (129 in 105) and wrap
  it at 390 (119 × 44).
- **The harness was proved first**: a fresh HEAD worktree on :5174 against the unedited tree on
  :5173, themes 0–4, every category, three widths: **0 of 660 on each surface** after the port and
  stamp normalisation (194 raw, all the port).
- **Expected after-diff, named before the code.**
  - **JP-095's keys: zero.** Every key is seeded with the bytes its site renders. The list label
    keeps its two text nodes, `"Other upcoming · "` and the count.
  - **JP-096: map `arch 1` alone**, themes 0–4 × three widths × both surfaces, **30 files a
    surface pair** (15 each). In each file:
    - two new `<span>` rows, *Based in* over the home value and *Willing to travel to* over the
      city;
    - the home value's text, *Based in Manchester* → *Manchester, UK*, and its box;
    - the location row taller by one label line, so the connector and the venue column re-centre
      in it. Everything below it moves down: the stat row, the pill row, the list, and at 390 the
      map panel under the column. The card, the left column and, where it is the taller column,
      the section root grow with it.
  - *Willing to travel to* may wrap in a narrow column under a wider body face. If it does, the
    states run names it.
  - Every other category, and map `arch 0`, `2` and `3`: **0**.

**Settled** (2026-10-01).
- **`data.js`.**
  - Eleven constants sit after JP-090's (`:745`–`762`): `MAP_KICKER_2` *Travel radius*,
    `MAP_LIST_LABEL_2` *Other upcoming*, `MAP_HOME_LABEL` *Based in*, `MAP_HOME_CAPTION` *Home
    location*, `MAP_VENUE_LABEL` *Willing to travel to*, `MAP_VENUE_CAPTION` *Venue location*,
    `MAP_RADIUS_LABEL` *Max travel*, `MAP_TIME_LABEL` *Travel time*, `MAP_FEE_LABEL` *Booking fee*,
    `MAP_VENUE_CTA` *Venue Link* and `MAP_ROUTE_CTA` *Get Directions*.
  - `mapKickerSeed(d)` gains a `d === 1` arm. `mapListLabelSeed(d)` (`:769`) is its twin.
- **The fields.** Each has a hint that says where it prints and what emptying it does, and each
  `in` is measured.
  - `kicker` is `in: [0, 1, 2]` and `listLabel` `in: [0, 1]`; both hints name the layout-2 seed.
  - `base` is `in: [0, 2]` (`:1912`), with a hint that sends the artist to the header's Location
    for layout 2.
  - Nine rows follow `fee` (`:1922`), all `in: [1]`: `homeLabel` *Home label*, `homeCaption` *Home
    caption*, `venueLabel` *Venue label*, `venueCaption` *Venue caption*, `radiusLabel` *Max travel
    label*, `travelTimeLabel` *Travel time label*, `feeLabel` *Booking fee label*, `venueCta`
    *Venue link button* and `routeCta` *Directions button*.
  - The header's *Location* hint, and the `FIELDS` comment over it, add the map's layout-2 travel
    card to its readers.
- **`sectionVm`** (`:1654`–`1678`).
  - `vm.mapListLabel` is `cv('listLabel', mapListLabelSeed(d))`.
  - Seven plain `cv()` reads cover the labels and captions.
  - `vm.mapVenueCta` and `vm.mapRouteCta` are `String(cv(k, SEED)).trim() || SEED`, uncased.
  - `vm.mapVenueCtaWraps` says whether Venue Link's label may wrap (below).
  - The home value reads `vm.location`, which every section already has.
  - `EditPanel`'s chain has a `listLabel` arm gated on `map` (`:4101`), since media carries a
    `listLabel` too.
- **`EncoreSection`, both bodies** (the `s.limeTree` block `:18387`–`18560`, Retro's and Pop's
  `:18784`–`18998`).
  - The `stats` array (`:18256`) is keyed on its slot. An emptied label leaves the value standing
    alone, and the cell still goes with its value.
  - The list label prints `` {`${label} · `}{n} ``, the literal's two text nodes, and an emptied
    label takes the count with it.
  - The location row is the frame's three lines a column. An emptied Location drops the home column
    and the connector with it (the bio ID card's `since` rule), and leaves the venue column alone in
    the row.
  - Retro's "printing both would stutter" comment now carries the *reversed* note.
  - **Typed labels wrap.** Every new label and caption takes `overflowWrap: 'anywhere'` and
    `minWidth: 0`. Get Directions is `whiteSpace: 'normal'`, centred.
  - **Venue Link wraps only once typed longer than its seed** (`vm.mapVenueCtaWraps`). The first
    cut wrapped it freely, and the digest caught Lime's 768 pills moving 54 → 55.6: Lime's 768
    frame overlaps the seed's text with the disc, the fit runs the one-line label 1px into the
    gap, and a label free to wrap broke there onto two lines. Nothing is added to the pill's style
    while the label is that short, so every template's own `whiteSpace` stands.
  - Under Editorial both pills are `min-width: fit-content`, not `auto` over `nowrap`. A short
    label resolves to its own width, so the 768 row still wraps the two pills whole; a long one
    takes the row and wraps inside it.
- **Digest: as named.** 15 of 660 on each surface, map `arch 1` × themes 0–4 × three widths, and 0
  elsewhere (themes 0–4, every category). Paired row by row after dropping the two new labels:
  - the home value's text and box;
  - the location row taller by one label line, and the connector and the shorter column
    re-centred in it;
  - every row below it moved down by one uniform shift (16.2–19.8; −1.8 to +5.4 where *Based in
    Manchester* had taken two lines and *Manchester, UK* takes one);
  - at desktop and 768, Retro's and Pop's map viewport stretched with the taller left column, its
    pins moving by fractions.
  - The pills did not move. Lime's 768 *Willing to travel to* takes two lines (its 13px body face;
    the frame's 102 at 12px fits one).
  - The 1088 Desktop canvas (the real editor, HEAD against the tree, Editorial and Lime card 2)
    moves the same rows and no pill.
- **Reach** (nine new rows in `reach.mjs`, plus `map.kicker`, `map.listLabel`, `map.base` and
  `who.location` re-run, themes 0–4). Every key moves exactly the designs its `in` names, 6 of 6
  under every template: the nine at layout 2, `kicker` at 1–3, `listLabel` at 1–2 and `base` at 1
  and 3. `who.location` gains map layout 2 under all five templates. A Node check of `fieldReach()`
  against the same table found 0 mismatches.
- **States** (a scratch puppeteer run, deleted): 2,250 renders. Each key at its layouts × themes
  0–4 × three widths × both surfaces, as the seed, a marker, emptied, 85 characters and one
  53-character word; `who.location` the same at map layout 2. The text `Range` was read against
  the nearest clipping box and the section.
  - A marker moves only its own text node.
  - Emptied, each label removes exactly its element. Layout 1's list label removes 1–3, JP-090's
    wrapper and Grunge's rule. Both pills render text identical to the seed. An emptied Location
    removes 8 elements: the home column and the connector.
  - No 85-character state runs past its box or scrolls the page.
  - **Named, not fixed: a 53-character single-word Location.** The home value keeps `base`'s old
    style, which has no in-word break. At 390 the word runs past its 119 column, over the connector
    and the venue column, under every template. Under Editorial it runs 136.5px past the section,
    clipped there, with no page scroll. Breaking inside the word would split Editorial's seeded
    *MANCHESTER,* at 768, which already runs past its 105 column, as the frame's *Manchester, UK*
    does (129 in 105). HEAD had the same overrun with a long `base`.
- **The real app.** Card 2 under Editorial, Lime, Grunge and Retro (puppeteer, every
  `FIELDS.map` field and gig and stat row marked through `st`, and the header's Location too,
  then Publish, Open, read at 1440, 768 and 390):
  - **None of the nine is left.** The marked Location prints on the card at every width, the
    positive control.
  - The panel seeds each new field with its literal. *Based in* says "Not shown in this layout",
    and *Kicker* and *List label* do not.
  - With only the eleven labels emptied, no label, count or bare `·` is drawn, and the pills read
    *Venue Link* and *Get Directions* again.
  - No console errors.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed.
- **Docs.**
  - CLAUDE.md: the identity bullet (the Location's new reader) and the label paragraph (the eleven
    keys, `kicker`'s and `listLabel`'s reach, the pill rule).
  - `notes/map.md`: a bullet, and the stat wall's line on `base`.
  - *Reversed* pointers at `../retro/layout-2.md:608` and on the code comment. `layout-2.md:1590`'s
    *Inherited whole* clause is rewritten.
  - `reach.mjs` gets the nine rows.

Reply: **JP-095 (b) · JP-096 — fixed.** The map's layout-2 travel card and list are now editable on
every template, in the editor and on the published page. Each label starts as the design's text.
- **Events Map**, layout 2:
  - *Kicker* now changes "Travel radius", and *List label* "Other upcoming". The number after it
    is the count of gigs.
  - New: *Home label* ("Based in"), *Home caption* ("Home location"), *Venue label* ("Willing to
    travel to"), *Venue caption* ("Venue location"), and *Max travel label*, *Travel time label*
    and *Booking fee label* over the three numbers.
  - *Venue link button* and *Directions button* change the two buttons.
- Left empty, a label is not drawn, and the list label takes its count with it. A button left
  empty shows its design text again, because a button needs a label.
- **JP-096.** The card now prints the design's *Based in* and *Willing to travel to*. The town
  under *Based in* is the header's **Location** ("Manchester, UK", as in the design), so it is typed
  once. The map's own *Based in* field still sets layouts 1 and 3. In layout 2 it says "Not shown in
  this layout", and its hint points to the header.
- A long label wraps rather than running off a phone screen.
- **Seen on the screenshot, not changed:** the card's heading ("Venue Distance" in the design, the
  map's Heading here), the chip ("● Confirmed" there, the featured gig's date here), which gig is
  featured, and "100 mi" (the Coverage field's default is still "12 mile radius", with the
  designer).

---

## JP-100 — 390: the calendar's Start Enquiry stands on its own row

**Verdict: confirmed, and a fit slip (JP-060's shape), not a call.** Retro's QA (`cd8c114`,
2026-09-15, PR #10) shortened the foot's line to *Thursday evening selected* and turned its 390
stack into one row, the frames' own. **Lime's fit (`206c596`, 2026-09-16) does not have `cd8c114`
as an ancestor**, so it drew Retro's pre-QA stack, and its comment still argues from the old long
line: *"The 390 master keeps the pill beside the line and leaves the line 63px — a break inside
'Thursday,' for our composed sentence — so the pill takes its own row, Retro's departure for the
same reason"* (`EncoreSection.jsx:15783`–`15785`). Grunge and Editorial inherited it
(`../lime/layout-2.md:823`–`825`, `../grunge/layout-2.md:1128`–`1131`, `layout-2.md:1470`–`1471`).
`notes/calendar.md:69`–`70` already says "chip, line and pill on one row at every width", which is
false today under the three.

**Figma: one row in every 390 master**, 370 × 84, `HORIZONTAL`, padded 12 / 20, gap 16, `NO_WRAP`;
the left group fills, a 58 × 23 chip then the line at gap 12, three lines and 60 tall.

| Master | Line | Pill | Pill label |
|---|---|---|---|
| Editorial `986:15690` | 60 | 184 | "Star Enquiry" in the demo face, 102 at 18 |
| Lime `986:11880` | 87 | 157 | 75 |
| Grunge `986:13785` | 90 | 154 | 72 |

**The page at 390** (harness, canvas and `live=1` alike):

| Theme | Foot | Height | Pill | Room for the line beside chip and pill |
|---|---|---|---|---|
| Retro, Pop | one row | 84 | 158.1 / 154.2 | 86.9 / 88.7 |
| Lime | stacked | 113 | 164.5 | **80.3** |
| Grunge | stacked | 113 | 155.8 | **88.8** |
| Editorial | stacked | 113 | **198.0** | **46.6** |

The line's widest words (Inter 13): *Thursday* 57.9, *Wednesday* 72.2 (`&today=` can cue any
weekday), *Pick a date to enquire* 46.3. **Lime and Grunge hold one row on every line**, at their
frames' own 80–90. **Editorial does not**: Noto's START ENQUIRY label is about 116 against the demo
face's 102, so the line gets 46.6.

**Evidence.**
- The `s.limeTree` foot, `:15783`–`15812`: `(s.mob ? col : row)(u(s.mob ? 12 : 24), …)`, the
  group `width: '100%'` at 390, `BookPill … full={s.mob}`.
- Retro's and Pop's foot, `:15960`–`16001`: `row(u(s.mob ? 16 : 24))`, the group `flex: '1 1 0',
  minWidth: 0`, the line `flex: '1 1 0'` at 390 (*"The foot is one row at every width, the frames'
  own"*).
- The line `vm.calSlots[].line` (`EncoreBuilder.jsx:1477`–`1482`), the prompt `vm.calPrompt`
  (`:1312`).

**Fix.** Retro's one row in the `s.limeTree` foot at 390: the pill on the row, not `full`, and the
left group `flex: 1 1 0; minWidth: 0`.

**Decision (light): Editorial's line**, which does not fit beside the chip.
- **A (recommended). The left group wraps** (`flexWrap: 'wrap'`, the line's minimum its widest
  word), so the line drops under the chip only when it cannot stand beside it. One rule for all
  three: Lime and Grunge stay chip-beside-line (their frames'), Editorial's line takes the cell's
  116 under the chip, and the pill stays on the row at every template.
- **B. Editorial's pill label fitted to the frame's 184** (about 15.8px, off the ramp). The frame's
  picture, but the plan's heads stay on the ramp (`layout-2.md`'s sections 9 and 10).
- **C. Editorial stays stacked** where the row does not fit (`flexWrap` on the foot), named as
  Noto's wider pill. The ticket's own template keeps the defect.

**Expected after-diff (on A).** Calendar `arch 1` at mobile × themes 1–3 × both surfaces, 6 files:
the foot 113 → about 84 under Lime and Grunge, Editorial's shorter by the pill's row less the chip's
(named in-session), and the section shorter by the same. Retro, Pop, 1440 and 768: 0.

**Verify.** The four seeded days, `&today=` on a Wednesday, and `&booked=` (the prompt, no chip) at
360, 390 and 414, under the three: the pill on the row, nothing past the panel, no word broken
inside itself; the pill still `<a href="#form">` on `live=1`; card 2 in the real app at 390.

**Docs.** The foot's comment (`:15783`, *reversed*, with how it happened); *reversed* pointers at
`../lime/layout-2.md:823`, `../grunge/layout-2.md:1128` and `layout-2.md:1475` (the triage's
`:1470`); `notes/calendar.md` (true again, with Editorial's wrap under A).

**Decided** (2026-10-01, user call): **A**, the recommendation. At 390 the `s.limeTree` foot is one
row, chip-and-line group then the pill, under Lime, Grunge and Editorial. The group wraps, and the
line's minimum is its widest word, so the line drops under the chip only when it cannot stand beside
it: Lime and Grunge keep chip beside line, Editorial's line takes the 116 left of its 198 pill under
the chip. The pill stays full size (`full`, the masters' 46 × 44 disc) and on the row everywhere.
**Applied in-session, not asked:** the same rule one level up. A typed pill label that would leave
the line less than its widest word drops the pill under the group (HEAD's stack, as a fallback).
The typed-label probe found the row alone crushing Editorial's line to 16px under a 24-character
label. The seed never reaches the fallback, so the decision as asked holds; object at the hand-off
if not.

Asked over what the session found first, on HEAD (`2900a57`):
- **Every *Evidence* line moved as mapped**: `EncoreSection.jsx` the foot's comment
  `:15864`–`15866`, its `(s.mob ? col : row)` div `:15867`, the group's `width: '100%'` `:15872`,
  `BookPill … full={s.mob}` `:15891`–`15893`; Retro's and Pop's comment `:16051`–`16059`, div
  `:16060`. `EncoreBuilder.jsx`: `vm.calSlots[].line` `:1503`–`1507`, `vm.calPrompt` `:1333`. The
  plan lines are unmoved, except that Editorial's *390 foot stack* clause sits at
  `layout-2.md:1475`–`1476` (its *Inherited whole* bullet opens at `:1474`), not `:1470`–`1471`.
- **`cd8c114` is not an ancestor of `206c596`** (`git merge-base --is-ancestor`): the fit slip as
  the verdict says.
- **Reproduced in the real app** (puppeteer, card 2, Publish, Open, 390). The published page cues
  nothing on its first paint (`CAL_OPEN` is past, so the foot prints the prompt), and a tapped slot
  brings the chip:

  | Template | Foot | Prompt / picked | Pill | Room for the line (chip *OCT 01*, 58.8) |
  |---|---|---|---|---|
  | Editorial | column | 109.5 / 113 | 198.0 × 54 | **45.3** |
  | Lime | column | 109.5 / 113 | 164.5 × 54 | 78.8 |
  | Grunge | column | 109.5 / 113 | 155.8 × 54 | 87.5 |
  | Retro | row | 84 / 84 | 158.1 × 54 | 85.3 (three lines) |

  No console errors. The harness (390, canvas and `live=1` alike, chip *JUN 12* 57.2) re-takes the
  triage's numbers: foot 113 under themes 1–3 and 84 under 0 and 4, Editorial's pill 198.0, room
  **46.8 / 80.3 / 89.1** (the triage's 46.6 / 80.3 / 88.8, within the chip's rounding).
- **The *Fix*'s "not `full`" is the group's `width: '100%'`, not the pill's `full`.** Editorial's
  390 master (`986:15690`, `get_metadata`) draws the foot 370 × 84, the left group 130 × 60 (a
  58 × 23 chip, the line 60 × 60), and the pill **184 × 54 round a 46 × 44 disc**: full size.
  `BookPill`'s Lime-tree scale is `k = tab || full ? 1 : s.mob ? 0.62 : 0.82`, so dropping `full`
  would draw it at the header's 0.62.
- **The harness was proved first**: a fresh HEAD worktree on :5174 (`node_modules` an APFS clone,
  `.vite` removed) against the unedited tree on :5173, themes 0–4, every category, three widths:
  **0 of 660 on each surface** after the port and stamp normalisation (194 raw, all the port).
- **Expected after-diff, named before the code**: calendar `arch 1` × mobile × themes 1–3 × both
  surfaces, **6 files**. No element is added or removed, so the rows pair 1:1. Changes stay in the
  foot subtree (the foot's height, the group's box, the chip's y, the line's box, the pill's x / y)
  and the panel's and root's heights. Lime and Grunge: the foot 113 → 84. Editorial: about 98 (the
  chip's 23, the group's 12, the line on two lines in 116). Retro, Pop, 1440 and 768: 0.

**Settled** (2026-10-01).
- **`EncoreSection`, the `s.limeTree` foot** (`:15864`–`15924`), at 390 alone:
  - The foot is `row(u(16))`, the masters' gap, where it was `col(u(12))`, and it wraps at every
    width (1440 and 768 always did, so they are byte for byte).
  - The left group is `flex: 1 1 0; maxWidth: 100%; flexWrap: wrap`, where it was `width: 100%`.
    Its `minWidth` is left at `auto`, so its minimum is its own min-content (the chip or the
    line's widest word), clamped to the foot. **That is the pill's fallback**: a typed label that
    would leave the group less than that drops the pill under it, HEAD's stack.
  - The line is `flex: 1 1 0; maxWidth: 100%; overflowWrap: break-word`, its `minWidth` left at
    `auto`. **`break-word`, not `anywhere`, is the whole fix**: `anywhere` feeds its break
    opportunities into min-content, so the line's automatic minimum would be one glyph and it
    would break *Thursday* beside the chip. Under `break-word` the minimum is the widest word, and
    `maxWidth` clamps it to the group (flexbox clamps the content-size suggestion by a definite
    max), so a long word still breaks inside the cell (JP-095 (a)). At 1440 and 768 the line keeps
    `minWidth: 0; overflowWrap: anywhere`.
  - The pill is untouched: `full={s.mob}`, the masters' full-size disc. With the group's basis 0
    it never shrinks on the seed.
  - The vertical gap between the chip and a dropped line is the group's 12. No master draws that
    state.
  - The comment carries the *reversed* note: how it happened (`206c596` does not descend from
    `cd8c114`) and pointers at the three plan lines.
- **Digest: as named.** 6 of 660 on each surface, calendar `arch 1` × mobile × themes 1–3, and 0
  elsewhere (themes 0–4, every category). Re-taken after the fallback (calendar, themes 0–4, both
  surfaces): byte-identical to the row-only cut, so the seed never reaches it. The rows pair 1:1,
  every change inside the foot subtree and the panel's and root's heights:

  | Theme | Section | Foot | Line | Pill |
  |---|---|---|---|---|
  | Lime | 843.1 → 814.1 | 113 → 84 | 165.9 × 19.5 → 80.3 × 58.5, beside the chip (three lines, the master's 60 × 60) | on the row |
  | Grunge | 812.7 → 783.7 | 113 → 84 | → 89.1 × 58.5, beside the chip | on the row |
  | Editorial | 835.1 → 820.1 | 113 → 98 | → 116 × 39, under the chip (two lines) | on the row |

- **States** (a scratch puppeteer probe, deleted): 165 renders. Themes 0–4, at 360, 390 and 414
  (the harness wrapper re-laid at each width), canvas and `live=1`. The states: the four seeded
  days (slot one cued, slots two to four tapped live); `&today=2025-06-18`, a Wednesday (the
  prompt, then slot one tapped: *Wednesday evening selected*); `&booked=2025-06-12` (the prompt, no
  chip); and that prompt typed as one 54-character word.
  - **Themes 1–3, all 99 states**: the foot is a row; the pill sits inside the foot, an
    `<a href="#form">` on `live=1` and a span on the canvas; no text node's `Range` runs past the
    section; no page scroll. No word breaks inside itself except the 54-character prompt, which
    breaks inside the cell.
  - **Where the line stands.** Lime and Grunge: beside the chip at 390 and 414, on every day.
    Editorial: under it at 390, and at 414 beside it on *Thursday* and under it on *Wednesday*
    (72). At 360 the rule drops Lime's line under the chip (119.5 of cell against 127 for chip and
    *Thursday*), and Grunge's on *Wednesday*.
  - **Heights.** Every state is as tall as HEAD or shorter, except one, named: **Editorial at 360**
    with *Thursday*, *Saturday wedding* or *Wednesday*. There the line takes three lines in the 86
    under the chip, and the foot is 117.5 against HEAD's stacked 113.
  - **Retro and Pop: 66 of 66 states identical to HEAD.** Named, not fixed: their own foot, which
    never wraps, breaks *Thursday* inside itself at 360 (Retro on the cued day, Pop on every day).
    HEAD does the same, it is not at 390, and it is not this ticket's.
  - **The 54-character prompt stacks** under the fallback: its word is the group's minimum, clamped
    to the foot, so the pill drops under the line, and the word breaks inside the full 300 / 330 /
    354. The foot is 113.5 at 390 (HEAD 109.5) and 133 at 360 (HEAD 129). These are the only 18 of
    the 165 states the fallback moved.
- **A typed pill label** (`&cj={"slotCta":…}`, 390, themes 0–4, the cued day and the prompt, both
  surfaces; the probe the advisor asked for, which found the fallback's need). With the row alone, a
  24-character label (*Send us your enquiry now*) drew Editorial's pill 297.7. That left the line
  16.3, twelve lines broken inside every word, and the foot 293. With the fallback:
  - *Enquire*: one row, 84, under the three.
  - The 24-character label: Lime and Grunge keep the row (117.5, the line under the chip on three
    lines). Editorial's pill drops under the group: 117 against HEAD's 113, the foot's 16 gap where
    HEAD's column took 12, with the line beside the chip on one line.
  - A 60-character label is wider than the foot, and overflows it exactly as on HEAD (the pill is
    `nowrap`; the same 86–268px past the foot), named.
  - So at 390 the pill drops once its label draws it past about 256 under Editorial and 290 under
    Lime and Grunge. Retro and Pop: identical to HEAD.
- **The real app** (puppeteer: card 2 under Editorial, Lime, Grunge and Retro, Publish, Open, at
  360, 390 and 414, the first paint, then a trusted tap on slot one):
  - Every foot is one row with the pill an `<a href="#form">` on it, no page scroll, and no console
    errors.
  - At the tester's 390, Editorial's foot is 84 on the prompt and 98 picked (the line under the
    chip). Lime's and Grunge's are 84 both ways, the line beside the chip on three lines. Retro's is
    unchanged.
  - At 360 they match the harness. The published tab centres the 390 layout at 414 (every x +12),
    so its 414 reads as 390; the harness's wider 414 covers that width.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed.
- **Docs.**
  - The foot's comment, *reversed*.
  - *Reversed* pointers at `../lime/layout-2.md:823`, `../grunge/layout-2.md:1128` (and its
    named-diff list at `:1148` and sweep checklist at `:1497`), and `layout-2.md:1477`. That
    pointer sits at `:1477` now, because section 7's Settled note (`:773`), which called the foot
    "our inherited stack", gained a line. The sweep checklist at `:1949` gets one too.
  - `notes/calendar.md`: "one row at every width" is true again, with the wrap rule and Retro's 360
    break.
  - CLAUDE.md and the README do not describe the foot (grep). No field was added or re-scoped, so
    no `reach.mjs` row.

Reply: **JP-100 — fixed.** On a phone, the Booking Calendar's foot is one row again, as in the
design: the date chip, the line, then *Start Enquiry*. That covers Lime, Grunge and Editorial, which
all shared the stacked foot. It came from an older version of Retro's calendar that Lime's design
pass started from. Under Lime and Grunge the line stands beside the chip. Under Editorial the
button's typeface draws it 14px wider than the design's, which leaves the line too little room
beside the chip. So there the line sits under the chip, with the button still beside both.

---

## JP-097 — the player's byline lacks *· Single*

**Verdict: confirmed, and a fit slip in every template** (no plan names it). Every layout-2 frame
types the bar's byline *Kai Mercer · Single* — Editorial `964:64601` (`I964:64605;690:4279`),
`986:15660`, `986:15679`; Lime `964:64582`; Grunge `964:64620`; Retro `964:64639` — the playing
track's release after the artist. Both bodies print `now.by`, the artist alone. **Every other place
already prints the release**: layouts 3 and 4 put `track.rel` under `now.by`, and layout 2's own fan
cards and list rows print `t.rel`. Layout 2's bar is the one that does not.

**Evidence.**
- The `s.limeTree` bar: `<span style={{ ...bodySm, ...clip }}>{now.by}</span>`
  (`EncoreSection.jsx:6735`); Retro's and Pop's: `<span style={subType}>{now.by}</span>` (`:7040`,
  `subType` ellipsises, `:6878`).
- `now.by` = `np.by` (`:5806`) = `vm.nowPlaying.by = cased(artistName)`
  (`EncoreBuilder.jsx:883`–`885`).
- `TRACKS` is `[name, dur, release]` (`data.js:657`–`663`); Slow Burn and Late Lights are *Single*.
  `vm.tracks[].rel` (`EncoreBuilder.jsx:868`–`870`) is the release for the seed and the row's whole
  `sub` once the artist edits the list (`:862`–`866`; the seed resolver writes `${rel} · ${dur}`,
  `:3949`–`3950`). `TRACK_KEYS` has no release column (`data.js:680`).
- Layouts 3 and 4: `:7501`–`7502`, `:7625`–`7626`. Layout 2's fan cards `:6672`, `:6973`, rows
  `:6823`, `:7160`.

**Fix.** The bar prints `by · rel` for the playing track, dropping the ` · ` when `rel` is empty —
composed in `sectionVm` (a per-track `by`, `vm.quotes[].byline`'s precedent), so `EncoreSection`
composes nothing. Once the artist edits the list, `rel` is the row's whole subtitle, so the byline
reads *Kai Mercer · Single · 4:55*: the same line the row under it prints, as layouts 3 and 4
already do. A separate release column would be a repeater change (`notes/list-editors.md`), not
owed by this ticket.

**Expected after-diff.** Media `arch 1` × themes 0–4 × three widths × both surfaces, 30 files, the
byline's text row only (the canvas plays Slow Burn and `live=1` cues Late Lights; both *Single*).
The 390 `s.limeTree` box is 115.5 and the byline about 106 at 12, so it fits; **Retro's 390 box is
103.5 and ellipsises it** ("…Singl…"), named.

**Verify.** The digest as named; `&cj=` with an edited track list (the byline follows the row's
subtitle), with an emptied subtitle (no dangling ` · `) and with a long one (the ellipsis on its own
box); `live=1`: each track played moves the byline with the title.

**Seen, not filed.** On the published 1440 the cued LATE LIGHTS ellipsises in the bar's title box
(138 in 129.6) — the tester's "LATE LIG…". Section 3 widened that box for SLOW BURN only
(`layout-2.md:1096`). Name it in the reply's *not changed* list. **Its 390 twin** (found in
JP-099's session): 121.6 in 115.5 under Editorial, "LATE LIGH…", and at 360 under Lime and Retro
as well; Pop's seed is cut on the canvas too. Section 3's "390 … needed nothing"
(`layout-2.md:1099`) measured the canvas's SLOW BURN (112.6), not the cued track. The byline this
entry adds is a box of its own, so it moves neither. Name both widths in the one line.

**Docs.** `notes/media.md`'s now-playing paragraph (`:15`–`24`); the `vm.nowPlaying` comment
(`EncoreBuilder.jsx:876`–`885`).

What the session found first, on HEAD (`dfa611d`):
- **Every *Evidence* line moved as mapped.** `EncoreSection.jsx`: the `s.limeTree` bar's
  `{now.by}` `:6774`, Retro's and Pop's `:7082`, `subType` `:6917`, `by: np.by` `:5832`, layouts 3
  and 4 `:7545` and `:7669`, the fan cards `:6708` / `:7012`, the rows `:6862` / `:7203`.
  `EncoreBuilder.jsx`: edited `vm.tracks` `:873`–`878`, seeded `:879`–`882`, `vm.nowPlaying`
  `:886`–`897`, the seed resolver `:3994`–`3995`. `data.js` unmoved.
- **Reproduced in the real app** (puppeteer, card 2 under Editorial, Lime, Grunge and Retro, the
  canvas's three tabs, then Publish, Open, at 1440, 768 and 390, and each numbered row played): the
  bar prints *Kai Mercer* alone everywhere, whichever track plays. No console errors (Grunge's one
  `ERR_HTTP2_PROTOCOL_ERROR` is the remote demo audio).
- **How it happened** (`git log -S`): Retro's layout-2 desktop fit (`44405c6`, 2026-09-08) added
  `rel` for the fan cards and the list rows, and set the bar's byline to layout 1's `np.by`, the
  artist alone. Lime's fit (`5a9cf76`) drew that into its own block, and Grunge and Editorial
  inherited it. **No plan names the bar's byline**. The only lines that touch it are Editorial's
  390 geometry (`layout-2.md:742`, open question 7). The pointer therefore sits in the code, and
  at `../retro/layout-2.md`'s `rel` bullet (`:323`), the fit's one recorded call about the track
  line.
- **The harness was proved first**: a fresh HEAD worktree at `dfa611d` on :5174 against the
  unedited tree on :5173, themes 0–4, every category, three widths, both surfaces: **0 of 660 on
  each** after the port and stamp normalisation (194 raw, all the port).
- **Expected after-diff, named before the code, with one correction to this entry's.** Media
  `arch 1` × themes 0–4 × three widths × both surfaces, 30 files, one row each: the byline span's
  text column. Its x, y, w and h hold. **The hand-off expected `w` to move; it cannot.** The span
  is a stretched item of a `flex: 1 1 0; min-width: 0` column, so its box is the column's. HEAD's
  own digest shows that: Retro's desktop byline box is 116.4 on the canvas and 115.6 live, the
  difference being the clock's text. So the ellipsis is a `Range` / `scrollWidth` read, never the
  digest. Every other arch and category: 0.

**Settled** (2026-10-01).
- **`sectionVm`** (`EncoreBuilder.jsx:872`–`895`): every `vm.tracks` row gains `byline`, the
  artist (`cased`, as `nowPlaying.by` always was) and the row's `rel` joined on ` · `, the
  separator going with an empty `rel`. The seeded rows and the edited rows are both covered. The
  testimonials' `byline` rule: composed here, never in `EncoreSection`. `vm.nowPlaying.by` is the
  same `by` const, unchanged, and its comment says why it stays the artist alone. Layouts 3 and 4
  print it over `rel`, so composing the release into it would print the release twice there and
  move 90 files, not 30.
- **`EncoreSection`, layout 2's shared scope** (`:6549`–`6556`): `nowBy` beside `nowTitle` and
  `nowArt`, by the same rule: the centre seat's `byline` on the canvas, the playing track's live,
  and `now.by` when there is no track. Both bodies print it (`:6782`, the `s.limeTree` bar;
  `:7090`, Retro's and Pop's). The comment carries how the slip happened. Layouts 1, 3 and 4 are
  untouched. No style changed: the span ellipsises in its own box, as it always did.
- **Pop's casing, a consequence, not a decision**: the artist is `cased` and the release is not,
  so Pop reads *KAI MERCER · Single*. Each half is printed as the section already prints it beside
  it (the bar's old byline, and the rows' `t.rel`).
- **Digest: as named.** 30 of 660 on each surface, media `arch 1` × themes 0–4 × three widths. In
  each file exactly one row differs, and in that row only the text column moved: *Kai Mercer* →
  *Kai Mercer · Single* (Pop's *KAI MERCER · Single*). The geometry and style columns are
  identical, line counts equal. Every other file: 0. `&n=0` (media, themes 0–4, both surfaces):
  0 of 60 against HEAD, the artist alone under *No tracks yet.*
- **States** (a scratch puppeteer probe, deleted; themes 0–4 × three widths × both surfaces, then
  live each numbered row played by a trusted click):
  - **The seed.** The byline follows the track: *Single*, *Hidden Sessions Vol. 2*, *Single*,
    *Live at the Deaf Institute*, *Hidden Sessions Vol. 2*. The canvas reads Slow Burn's, live's
    first paint Late Lights'. *Kai Mercer · Single* (Inter 12, 106.8) fits every box but two:
    **Retro's 390, 103.5, and Pop's 390, 105.5** (118.7, uppercase). Both ellipsise. The two
    longer releases (165–192 at 1180, 202–234 published) ellipsise in every template's box at
    every width, as *Manchester at 3am* and *Echo & The Floor* already do in the title box above.
    The frames type only *Single*.
  - **An edited list**, TracksField's resolved seed with track one renamed: the canvas reads
    *Kai Mercer · Single · 4:55* (the centre seat), live *… · Single · 5:42*, and each row played
    moves it. That is the row's whole subtitle, as the *Fix* says. It ellipsises wherever its box
    is under about 119 (Inter 10) / 143 (12), which is most boxes.
  - **Five distinct subtitles** (*Alpha · 1:00*, *Beta*, *Gamma · 3:00*, emptied, *Epsilon*). This
    is the probe that tells the seat from the cue, which the seed cannot do, since both its tracks
    are *Single*. The canvas reads track three's *Gamma*, live's first paint track one's *Alpha*,
    and each row played moves it. The emptied fourth prints *Kai Mercer*, with no dangling ` · `.
  - **A long subtitle** (79 characters) on tracks three and five: the byline ellipsises inside
    its own box. The title box's x and width are those of the short-subtitle render, and there is
    no page scroll.
  - **`&n=0`**: *Kai Mercer* under *No tracks yet.*, both surfaces, HEAD's picture.
- **The real app** (the same puppeteer walk: card 2 under Editorial, Lime, Grunge and Retro, the
  canvas's three tabs, Publish, Open, 1440, 768 and 390, each row played): the canvas reads
  *Kai Mercer · Single* at every width. The published bar reads it on the cued Late Lights, and
  moves with every track played. One text node, no console errors. Retro's 390 box ellipsises it,
  as named. (The published 390's first read names Roomtone, the track the 768 walk left playing,
  since `cur` survives a resize.)
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed.
- **Docs.**
  - `notes/media.md`'s now-playing paragraph: the line under the title, per layout, and the
    edited-list and ellipsis consequences.
  - The `vm.tracks` and `vm.nowPlaying` comments.
  - The shared-scope comment in `Media`, which says how it happened. The *Lime layout 2* comment
    under it now lists the byline among what both bodies share.
  - The pointer at `../retro/layout-2.md:323`.
  - CLAUDE.md's "player bylines" (the `artistName` list) is still true, since the byline leads
    with the name. The README does not describe the byline. No field was added, so no `reach.mjs`
    row.
- **Not changed, named:** the cued LATE LIGHTS still ellipsises in the bar's title box. At the
  published 1440 that is Editorial's 138.5 in 129.6 (the tester's "LATE LIG…") and Lime's 108.4 in
  105.1, both at the 1180 layout width. At 390 it is Editorial's 121.6 in 115.5 ("LATE LIGH…") and
  Pop's 115.7 in 105.5, and at 360 Lime's and Retro's too (JP-099's measure). Pop's SLOW BURN is
  cut on the 390 canvas as well. The byline is a box of its own and moves none of them.

Reply: **JP-097 — fixed.** The player's bar now reads *Kai Mercer · Single* under the track
title, as in the design, at every width. It also follows the track that is playing, so a track
from *Hidden Sessions Vol. 2* shows that release instead. Every template had the same gap: the
bar printed the artist alone, from an early version of the layout. Once the artist edits the track
list, the line shows the track's whole subtitle, the same text as its row in the list (for example
*Kai Mercer · Single · 4:55*). A long release is cut with an ellipsis, as the title above it
already is. *Not changed:* the cued track's title, LATE LIGHTS, is still cut in the bar at 1440
(Editorial and Lime) and at 390 (Editorial and Pop, and Lime and Retro at 360). That is the title's
own box, which this fix does not touch.

---

## JP-098 — 768: six gallery tiles, and no *Gallery · View list ✕*

**Verdict: confirmed, and two recorded calls, every template's** (the gallery's layout 2 is one
shared branch; Lime, Grunge and Editorial differ only through ternaries).

**What the 768 master draws** (`986:15668`; Lime `986:11858`, Grunge `986:13763` and Retro
`984:36046` are the same tree):
- the right column is a **head row** (342 × 20) over a band (342 × 358, `clipsContent`): *Gallery*
  (Inter Bold 11, `#141414`), a spacer, *View list* (Inter 12) and *✕* (Inter 13);
- the left column's tiles are 123, 215 and a **1px** fill tile, the right's 194, 242 and a 1px one,
  so the band shows three whole tiles and the 242 cut to 154 at its foot — the tester's four;
- the caption reads *MTV "MOOD SWING"* / *FEATURED REEL* at every width;
- the 1440 (`964:64609`) and 390 (`986:15687`) masters have **no head row**.

**What the page draws.** Six tiles at 768, each `flex: ${h} 1 auto`, dividing the 358 band in the
frame's proportions. The head row prints the gallery's *Heading* (seeded *See us in action*) and
not *Gallery*; the caption prints the artist's name alone at 768 and heading + name at 1440 and 390.

**The recorded calls (Retro's, inherited by all three twins):**
- the tiles: *"a designer does not leave two 1px frames in one. Divide the band in the frame's
  proportions instead … Honouring a squeeze costs content"* (`../retro/layout-2.md:1056`–`1064`):
  four tiles would leave two of the seven slots unreachable at 768;
- the head row: *"where a field the design had nowhere for finally goes … the heading … moves and
  the pill keeps the artist's name alone"* (`:1043`–`1055`), and *"The row's own 'View list' and '✕'
  are dead controls and are dropped, named here so the call can be reversed"* (`EncoreSection.jsx:13750`–`13757`);
- Lime `../lime/layout-2.md:721`–`722`, Grunge `../grunge/layout-2.md:950`–`951` and `:980`,
  Editorial `layout-2.md:1279`–`1282`, `:1294`, open question 7 and designer note 6;
  `notes/gallery.md:38`–`45`.

Nothing in the file is a precedent for a gallery list view. The only gallery ✕ is layout 3's
fullscreen viewer, which no frame draws.

**Evidence.**
- `Gallery`'s `if (s.v1)` (`EncoreSection.jsx:13777`); `COLUMNS` (`:13851`–`13853`); the tile's
  `flex: ${h} 1 auto` (`:13899`); the head, `const head = tab && s.title ? …` (`:13946`–`13954`),
  wrapped in a column at 768 alone (`:14047`); the caption, `const lines = (tab ? [s.brand] :
  [s.title, s.brand])` (`:13961`); the claims comment (`:13724`–`13731`) and the squeeze comment
  (`:13762`–`13769`).
- `FIELDS.gallery.heading` (`data.js:1735`), `TITLES.gallery` (`:1115`).

**Decision.**
1. **The tiles** — **A (recommended). Keep six, with a reply**: the 1px tiles are a leaked desktop
   height, and four would hide two photos from a tablet visitor. **B. The frame's four**: [123, 215]
   on the left, [194, 242] on the right, the 242 cut by the band. Two slots unreachable at 768.
2. **The head row** — **A. As it is**: the *Heading* in the row, the name alone in the caption.
   **B (recommended). The frame's allocation**: a new *Gallery label* field (JP-071's shape, seeded
   *Gallery*, `in: [1]`, printed at 768) in the row, and the heading back in the 768 caption, as it
   already is at 1440 and 390. The frame's picture, at no cost to content.
3. **View list / ✕** — **A (recommended). Dropped, with a reply**: two controls that would do
   nothing on the published page. **B.** Drawn as inert spans.

**Expected after-diff.** 1B, 2B or 3B: gallery `arch 1` at tablet × themes 0–4 × both surfaces, 10
files. 1440 and 390: 0. On 1A, 2B, 3A: the head row's text and the caption's lines at 768.

**Verify** (on 2B). 768 on both surfaces: the row reads *Gallery*, the caption heading and name; an
emptied label drops the row (or the session's rule); the marker sweep; `reach.mjs` for the new key;
`live=1`: every tile still picks.

**Docs.** On 2B: CLAUDE.md's JP-071 / JP-090 paragraph, `notes/gallery.md`, the head comment
(`:13942`–`13945`), a *reversed* pointer at `../retro/layout-2.md:1043`. On 1B or 3B: the squeeze
and dead-controls comments, `notes/gallery.md:38`–`45`, *reversed* pointers at
`../retro/layout-2.md:1056`, `../lime/layout-2.md:721`, `../grunge/layout-2.md:950`,
`layout-2.md:1279`.

**Decided** (2026-10-01, user call): **1A, 2B, 3A**, every recommendation.
1. **The tiles stay six**, with a reply. The 768 master's two 1px tiles are a leaked desktop height,
   and four would leave two of the seven photographs unreachable at 768. Retro's call stands.
2. **The head row prints a new *Gallery label* field**, JP-071's shape: seeded *Gallery* (the
   frame's title case), uncased, `in: [1]`, read at 768 alone. The *Heading* goes back to the 768
   caption's first line, so the pill reads heading then name at every width. An emptied label drops
   the row, as an emptied *Heading* drops it on HEAD, and the band takes the column's height.
   Reverses Retro's *"a slot that appears at one width only is where a field … finally goes"*.
3. **View list and ✕ stay dropped**, with a reply: two controls with nothing to do on the
   published page. Retro's call stands.

*Re-filed (2026-10-05):* the tester handed *View list* / ✕ to the BA, and a proposal went to them
on [`retest-qa-fixes.md`](./retest-qa-fixes.md) entry 1's B. *View list* would reveal the rest
from the frame's four tiles, and ✕ would clear the pick. 1A and 3A stand until the BA answers.
That plan's entry 6 reverses them on a confirmed answer.

Asked over what the session found first, on HEAD (`7b1e1e2`):
- **Every *Evidence* line moved as mapped.** `EncoreSection.jsx`: `Gallery` `:13070`, its
  `if (s.v1)` `:13851`, the claims comment `:13796`–`13803`, the head-row note `:13824`–`13831`,
  the squeeze note `:13840`–`13847`, `COLUMNS` `:13925`, the tile's flex `:13973`, the head
  `:14017`–`14028`, `lines` `:14035`, the 768 wrap `:14121`. `data.js`: `heading` `:1796`,
  `TITLES.gallery` `:1157`. Plans: Retro `:1065`–`1070` (the head row) and `:1071`–`1080` (the
  squeeze); Lime `:721`–`722` and Grunge `:950`–`951` / `:980` unmoved; Editorial's moved to
  `:1285` and `:1300`.
- **The frames, re-read.** `986:15668`'s right column is 342 wide: the head row 342 × 20 (*Gallery*
  35 × 11, a 211 × 1 spacer, *View list* 48 × 17, ✕ 12 × 20), then the band 14 below it, 358 tall,
  with tiles 123 / 215 / **1** and 194 / 242 / **1**. The render shows four tiles and a two-line
  caption. `964:64609`'s row `710:2622` is `hidden` (520 × 21), and the band starts at its top.
- **Reproduced in the real app** (puppeteer, card 2 under Editorial, Lime, Grunge and Retro, the
  canvas's three tabs, then Publish, Open, at 1440, 768 and 390). At 768 on both surfaces: six
  tiles, all visible; the row reads *See us in action*; the caption reads *Kai Mercer* alone. 1440
  and 390: heading over name, no row. No console errors.
- **The harness was proved first**: a fresh HEAD worktree at `7b1e1e2` on :5174 against the
  unedited tree on :5173, themes 0–4, every category, both surfaces: **0 of 660 on each** after the
  port and stamp normalisation (194 raw, all the port).
- **Expected after-diff, named before the code.** Gallery `arch 1` × tablet × themes 0–4 × both
  surfaces, 10 files, three rows each:
  - the head span's text, *See us in action* → *Gallery*, and its width (a content-sized flex item);
  - the caption pill, one line taller and wider, its top moving up (it is bottom-anchored);
  - one inserted span, the heading line.
  
  The name span's row holds, because the pill grows upward from a fixed bottom. 1440, 390, every
  other arch and category: 0.

**Settled** (2026-10-02).
- **`data.js`**: `GALLERY_RAIL_LABEL = 'Gallery'` beside JP-095's labels, and
  `FIELDS.gallery.railLabel` after `heading`. Its panel name is *Gallery label*, `in: [1]`. The hint
  is *"The label over the small photos, on a tablet only. Left empty, it is not drawn."*, because
  `in` names no width.
- **`sectionVm`** (`EncoreBuilder.jsx:1252`–`1254`): `vm.galRailLabel = cv('railLabel', …)`,
  uncased (JP-071's shape).
- **`EncoreSection`, the shared `if (s.v1)` branch** (every template): `head` is
  `tab && s.galRailLabel` and prints it (`:14020`–`14035`). `lines` is `[s.title, s.brand]` at
  every width (`:14042`). No style changed. The span still ellipsises in the row, so the 20px row
  and the 358 band are the frame's. Emptied, `head` is null and the band takes the column's 392,
  which is HEAD's emptied-heading path.
- **Digest: as named.** 10 of 660 on each surface, gallery `arch 1` × tablet × themes 0–4. In each
  file:
  - the head span reads *Gallery*, its x and y held. Its width goes 73.9 → 33.8 (Retro
    73.2 → 33.5, Lime 80.6 → 36.9, Pop's *SEE US IN ACTION* 88 → 32.4);
  - the caption div's y goes 376 → 361 and its h 31 → 46 (Lime, chip 12: 375 → 359, 32 → 48).
    Its width goes 89.4 → 115.7 (Retro 89 → 115.1, Lime 95 → 123.7, Pop 90.7 → 116);
  - one span is inserted at (351, 371) (Lime 369), the heading line;
  - the name span's row is identical.
  
  Line counts are +1 in each file. Every other file: 0.
- **`reach.mjs`**: a `gallery.railLabel` row, measured with a scratch copy running that row and
  `gallery.heading` alone, themes 0–4. `railLabel` reads **layout 2 (2/6)** under every theme.
  The two are the tablet canvas and live renders: the states probe below finds the marker moving
  the HTML at tablet alone, so desktop and mobile move nothing. That is the `in`, a partial by
  design beside `calendar.email`'s 3/6. `heading` still reads layouts 1–4 at 6/6.
- **States** (a scratch probe, deleted; themes 0–4 × three widths × both surfaces):
  - **The seed**: at 768 the band is 358 with six tiles (73.9 / 129.3 / 134.8 …), the row reads
    *Gallery* and the caption reads heading over name. 1440 and 390 are unchanged.
  - **Emptied label**: no row, and the band is 392 with six tiles (81.3 / 142.2 / 148.5 …), all
    inside it. Live, every tile picks (its photo in the hero, one ring) and a second click resets.
  - **A 127-character label**: the row ellipsises at the column's right edge. The text node's
    `Range` runs to 954 (Lime 1010), the box ends at 738, and there is no page scroll.
  - **Emptied heading**: the pill reads the name alone, and the row still reads *Gallery*.
  - **Both emptied**: the name alone, no row.
  - **Live at desktop and 390**: every tile picks. At 390 the rail's looped twins ring together,
    as before.
- **The real app** (puppeteer: card 2 under Editorial, Lime, Grunge and Retro, the canvas's three
  tabs, then Publish, Open, at 1440, 768 and 390):
  - **The seed**: the 768 row reads *Gallery*, and the caption reads *See us in action* (y 369)
    over *Kai Mercer* (384), on both surfaces. The six tiles fill a 358 band. 1440 and 390 read as
    on HEAD. Live, the six tiles pick six distinct photographs at 768 and 1440; at 390 the ten
    tiles cover the same six. No console errors.
  - **Marker sweep**: `FIELDS.gallery`'s text keys, built off `data.js` and written through `st`'s
    dispatch. Every gallery text node, at every width on both surfaces, is a marker or the
    artist's name. No literal is left (*Gallery* was the last one).
  - **Emptied pass** (the label keys alone, `MARK ?? …`): the row goes, the band is 392, and the
    six tiles still pick six photographs.
  - **The panel**, under Editorial and Retro: *Gallery label* shows *Gallery* and the hint, with
    no "Not shown" note on layout 2. Typing *Photos* moves the Tablet canvas's row. Emptying it
    drops the row, and the box stays empty. `fieldReach` puts the note on layouts 1, 3 and 4
    under all five templates, and `fieldNowhere` is false everywhere.
- **Pop's casing, a consequence, not a decision**: the label is uncased (JP-071's shape) and the
  caption's lines are `uppercase`. So Pop reads *Gallery* over a pill reading
  *SEE US IN ACTION / KAI MERCER*. Under Pop the row used to read *SEE US IN ACTION*, the cased
  heading.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed.
- **Docs.**
  - CLAUDE.md's JP-071 / JP-090 label paragraph: one sentence before *The unreported siblings*.
  - `notes/gallery.md`'s layout-2 rail paragraph: six at 768 as a decision, the head row, the
    caption, *View list* / ✕.
  - The four comment sites in `Gallery`: the claims comment, the head-row bullet (*reversed*,
    with how), the squeeze bullet (*kept*), the head and the caption comments.
  - *Reversed* pointers at `../retro/layout-2.md:1065`'s *a slot that appears at one width only*,
    `../lime/layout-2.md:721`, and the 768 measurement lines `../grunge/layout-2.md:981` and
    `layout-2.md:1301`.
  - *Kept* pointers at Retro's squeeze bullet, `../grunge/layout-2.md:951` and
    `layout-2.md:1288`.
  - The README does not describe the row. `notes/list-editors.md` needs nothing: no repeater, and
    a plain `d` field needs no seed resolver.
- **Not changed, named:** the six tiles (1A) and the dropped *View list* / ✕ (3A).

Reply: **JP-098 — partly fixed, partly by design.** At tablet width the gallery's small label row
now reads *Gallery*, as in the design, and the caption on the large photo shows the section
heading over the artist's name on two lines, also as in the design. *Gallery* is a new field,
*Gallery label*, so the artist can change it or clear it (cleared, the row is not drawn). The fix
applies to every template. *By design:*
- **The six thumbnails.** In the tablet design the last thumbnail in each column is 1px tall, a
  desktop size left in the frame, which is why only four show. Drawing four would hide two of the
  seven photos from tablet visitors.
- ***View list* and ✕.** They are not drawn because the page has no list view for them to open,
  so they would be buttons that do nothing.

---

## JP-094 — the gaps between sections are too large

**Verdict: confirmed, and a recorded call that layout 3 has already reversed.** Every layout-2
section pads the page's `padY` (80 / 56 / 44) above and below, so each gap is that twice. Retro's
fit chose it: *"The section is shorter than its frame, by design. The frame's 56px inset × 0.82 is
46, and the page supplies `padY` 80 … Fit the card, not the frame height"*
(`../retro/layout-2.md:270`–`274`). Every Editorial layout-2 section named it as an inherited diff
(bio `layout-2.md:1050`; media `:1109`–`1114`, *"a `sectionVm` arm for one section would part it
from its neighbours"*; gallery `:1296`; pricing `:1384`; map `:1605`; form `:1679`; testimonials
`:1782`), and Grunge said it outright: *"Layout 2 has no `vm.pad` arm under any template"*
(`../grunge/layout-2.md:399`–`405`). Two exceptions already stand, both Lime's user call of
2026-09-17 (`9590959`): the calendar's `calc(u(56) - padY)` margin at both ends and the map's at its
top, at desktop, in the `s.limeTree` blocks. **Layout 3 reversed the same call** section by section,
and its sweep fitted the last gap on a user call (2026-09-26): the `vm.pad` arms at
`EncoreBuilder.jsx:459`–`531`.

**The frames.** The page frames stack their sections with no spacing; each section states its own
padding. Editorial (`964:64598` / `986:15657` / `986:15676`), top / foot:

| Section | 1440 | 768 | 390 | Ground |
|---|---|---|---|---|
| header | (nav) / **56** | (nav) / **60** | (nav) / **10** | paper |
| bio | 56 / 56 | 60 / 60 | 30 / 30 | paper |
| media | **86 / 86** | 60 / 60 | 40 / 40 | paper; Scheme 2 panel |
| repertoire | 0 / 0 | 0 / 0 | 0 / 0 | its own sheet |
| gallery | 46 / 46 | **30 / 46** | 40 / 40 | paper |
| pricing | 56 / **32** | 60 / 60 | 30 / 30 | ink band at 1440; paper, ringed, narrow |
| calendar | 56 / 56 | 56 / 56 | 40 / 40 | Scheme 2 card on paper |
| map | 56 / 56 | 60 / 60 | 40 / 40 | paper |
| form | 60 / 60 | 60 / 60 | 40 / 40 | terracotta band |
| testimonials | 56 / 56 | 60 / 60 | 40 / 40 | paper |

**Lime's and Grunge's frames state the same padding for every section at all three widths**
(Lime `964:64579` / `986:11847` / `986:11866`, Grunge `964:64617` / `986:13752` / `986:13771`).
Retro's (`964:64636` / `984:33491` / `984:34437`) do too, but for its header (144 / 86, 100 / 100,
90 / 40).

**The gaps** (A's foot plus B's top; a band's or a ring's edge counts as 0; desktop in canvas px,
the frame × 0.82, and the published tab's × 1.22):

| Pair | 1440: frame / page (→ tab) | 768: frame / page | 390: frame / page |
|---|---|---|---|
| header → bio | **91.8 / 160 → 195** (the tester's 112 / 197) | 120 / 112 | **40 / 88** |
| bio → media | **116.4 / 160 → 195** | 120 / 112 | 70 / 88 |
| media → repertoire | 70.5 / 80 | 60 / 56 | 40 / 44 |
| repertoire → gallery | 37.7 / 80 | 30 / 56 | 40 / 44 |
| gallery → pricing | **37.7 / 80 → 98** | 46 / 56 | 40 / 44 |
| pricing → calendar | 45.9 / 45.9 ✓ | 56 / 56 ✓ | 40 / 44 |
| calendar → map | 91.8 / 91.8 ✓ | 116 / 112 | 80 / 88 |
| map → form | **45.9 / 80 → 98** | 60 / 56 | 40 / 44 |
| form → testimonials | 45.9 / 80 | 60 / 56 | 40 / 44 |
| testimonials → footer | 45.9 / 80 | 60 / 56 | 40 / 44 |

The tester's four desktop pairs and the 390 header → bio reproduce within 3px. **Their "~13 at
tablet" is not an inset**: at 768 the seeded subtitle runs a line longer than the frame's (a named
diff, `layout-2.md:944`–`948`), so the header's cards end about 21 above the identity block's foot.
The real 768 differences are the gallery's 30 top (+26) and −4 to −8 elsewhere. Under Lime, pricing
at 1440 is page ground, so its own 80 top shows as well.

**Evidence.**
- `Z.padY` 80 / 56 / 44 (`EncoreBuilder.jsx:91`–`93`), `SIZES.*.pad` (`:68`–`70`),
  `PublishedPage`'s `pad: ${base.padY} ${padX}` (`:4760`); the root's `padding: bleed ? 0 : s.pad`
  (`EncoreSection.jsx:26439`).
- The layout-3 arms (`EncoreBuilder.jsx:459`–`531`), each gated on Lime, Grunge and Editorial by name.
- The layout-2 in-block overrides: `HeaderV1`'s nav `margin: calc(u(navTop) - padY)` (`:2023`;
  Retro's `:2352`), pricing's desktop foot span (`:9328`–`9341`), the calendar's margin
  (`:15744`–`15748`), the map's (`:18634`–`18636`).
- **The trap: bleeds that assume the root pads exactly `padY`** (`calc(-1 * s.padY)`): pricing's
  foot span (`:9340`), Retro's pricing sheet (`:9584`), the repertoire's sheets (`:11651`,
  `:11878`), the form's sheets (`:24054`, `:24433`), and the helpers `Grain`, `TornEdge`, `ArcEdge`
  (`:202`, `:218`, `:255`). An arm that sets `vm.pad` without the keys these read misplaces them.
  Sections with unequal top and foot (the header, the gallery at 768, pricing at 1440) need per-side
  keys or a per-site audit.

**Decision.**
1. **Scope.**
   - **A (recommended). Lime, Grunge and Editorial** (`s.limeTree`), a `d === 1` arm in `sectionVm`
     beside layout 3's: their frames agree to the pixel, and it is layout 3's precedent.
   - **B. Editorial alone.** The twins keep the same gaps, which the tester will file next.
   - **C. Every template.** Reverses Retro's original call; Retro's header insets differ, and Retro's
     and Pop's bodies carry their own sheet bleeds.
2. **Widths** — **A (recommended). All three**, the frames' own numbers (390's header → bio is 88
   against 40). **B. Desktop alone**, where the reported gaps are.

**Fix (on 1A, 2A).** A `d === 1` arm in `sectionVm` setting each section's top and foot from the
table (× 0.82 at desktop), with per-side keys the bleed sites read, so every `calc(-1 * padY)` and
in-block `u(56)` margin stays right; the calendar's and the map's in-block margins fold into the arm
where that is simpler. The repertoire and the form keep theirs (sheet and band, their own insets);
the header's top stays its nav margin's. The session audits every `s.padY` read inside a section the
arm changes before writing it.

**Expected after-diff (on 1A, 2A).** Geometry only, under themes 1–3: header `arch 1` and `5`, bio,
media, gallery, pricing, map and testimonials `arch 1` at three widths, and the calendar at 390 —
about 75 files a surface. Each pair in the table above that already matches moves 0. Themes 0 and 4:
0. The session names the exact list from a re-taken table before the code. The layout picker's
thumbnails and card 2 follow through `sectionVm`.

**Verify.** Every pair of the table re-measured on the canvas and in the published tab (× 1.22 at
1440) against the frames, under the three templates, three widths; the bleeds (repertoire sheets,
pricing's band and foot span, the form's sheet) still meet their edges; the calendar's and the map's
desktop insets unchanged if their margins fold in; Retro and Pop byte-identical; card 2 in the real
app, the tester's four pairs and 390's header → bio.

**Docs.** The comment block at `EncoreBuilder.jsx:459` (a layout-2 arm beside layout 3's); the
in-block comments at `EncoreSection.jsx:9328`, `:15744`, `:18634`; *reversed* pointers at
`layout-2.md` `:1050`, `:1109`, `:1296`, `:1384`, `:1471`, `:1605`, `:1782` and
`../grunge/layout-2.md:399`, and at `../retro/layout-2.md:270` under 1C; README's *the desktop page
is the 1440 frame at 0.82* (`:644`) gains a clause on the vertical inset at layouts 2 and 3.

**Decided** (2026-10-02, user call): **1A, 2A**, both recommendations.
1. **Lime, Grunge and Editorial**: a `d === 1` arm in `sectionVm` beside layout 3's, gated on the
   three by name as those arms are. Retro's and Pop's layout 2 keep the root's `padY`.
2. **All three widths**, the frames' own numbers (× 0.82 at desktop).

Reverses Retro's *"Fit the card, not the frame height"* for the three templates, and Grunge's
*"Layout 2 has no `vm.pad` arm under any template"*.

Asked over what the session found first, on HEAD (`2299a63`):
- **Every *Evidence* line moved as mapped.** `EncoreBuilder.jsx`: `SIZES` `:72`–`74`, `RAMP`'s
  `padY` `:95`–`97`, the layout-3 arms `:463`–`535`, `PublishedPage`'s `pad` `:4827`.
  `EncoreSection.jsx`: `HeaderV1`'s nav margin `:2023` and Retro's `:2361`, pricing's foot span
  `:9391`–`9403`, Retro's pricing sheet `:9658`, the repertoire's `:11725` / `:11952`, the
  calendar's margin `:15830`–`15834`, the map's `:18805`–`18807`, the form's `:24249` / `:24631`, the
  root's padding `:26643`. The helpers are unmoved (`bleedTo` `:202`, `TornEdge` `:218`, `ArcEdge`
  `:255`). The docs moved to the mapped lines, and README's line is `:650`.
- **The frames, re-read** (one `use_figma` over the twelve page frames). Lime's, Grunge's and
  Editorial's sections state the table's top and foot to the pixel at all three widths. Retro's
  differ only in the header (144 / 86, 100 / 100, 90 / 40). Two edges are template-specific:
  - **Every pricing instance carries a 1px inside ring at all three widths.** Editorial's is ink
    or 60% paper, Grunge's white 20%, Lime's `#F2FFD0` 20%. Lime's build keeps it only as the
    1440 foot rule, so at 768 and 390 Lime's pricing shows its own inset.
  - **Grunge's form paints no band** (Scheme 4 is Scheme 1), so its own top and foot show.
- **Reproduced in the real app**: puppeteer, card 2 under all five templates, the canvas's three
  tabs, then Publish, Open at 1440, 768 and 390. The probe measures each section's painted content
  edges; a band's own edge counts. Editorial gives the table above to 0.1, frame / page, with the
  published 1440 tab × 1.22. The tester's pairs read 195.3 (197), 195.3 (198), 97.6 (97) and
  97.7 (99), and 390's header → bio 88 (90). The twins differ only where the build draws a
  different edge:
  - Lime's gallery → pricing is 83.6 / 158, 106 / 110 and 70 / 86.
  - Lime's pricing → calendar is 45.9 / 46, 116 / 112.6 and 70 / 88.3.
  - Grunge's map → form is 95.1 / 126, 120 / 116 and 80 / 84, and form → testimonials 95.1 /
    127.2, 120 / 116 and 80 / 84.

  Retro's and Pop's tables are their own pages' (Retro's header → bio is 80, its header standing
  on its own foot).
- **The audit: no per-side key is needed.** Inside the sections the arm changes, layout 2 reads
  `s.padY` at four sites. The bleeds the triage listed are layout 1's, 3's and 4's, or Retro's and
  Pop's bodies, or the repertoire's and the form's, which the arm leaves alone.
  - `HeaderV1`'s nav margin (`:2023`) reads the root's **top**, which stays `padY`.
  - Pricing's desktop foot span (`:9403`) reads the root's **foot**. The span is Lime's 1px foot
    rule as well, so it has to reach the root's bottom edge. The desktop foot therefore stays
    `padY`, and the span's 24 + 8 is the frame's 32 already.
  - The calendar's margin (`:15834`) and the map's (`:18807`) fold into the arm.

  So the arm sets `vm.pad` alone, as layout 3's arms do. `bleedTo` at `:2580` is Retro's
  `HeaderV1` body (the `s.limeTree` block closes at `:2292`).
- **Rounding.** The calendar's and the map's `u()` round × 0.82 to 0.1 (`u(56)` is 45.9), where
  layout 3's arms round to whole pixels. The arm takes the 0.1 rounding, so the fold is exact.
- **Expected after-diff, named before the code.** Geometry only, themes 1–3, 75 files a surface:
  - header `arch 1` and `5` × three widths (18): the foot is 80 → 45.9, 56 → 60, 44 → 10;
  - bio, media, gallery, pricing, map and testimonials `arch 1` × three widths (54);
  - the calendar `arch 1` at 390 alone (3): 44 → 40. At 1440 the fold is exact, and at 768 the
    root's 56 is the frame's. *(It is exact to 1/64px. The digest's 0.1 rounding shows that on
    the three desktop renders: see Settled, below.)*

  Pairs already at the frame move 0: pricing → calendar at 1440 and 768 under every template, and
  calendar → map at 1440. Themes 0 and 4: 0. The arm has no width term, so the editor's 1088
  desktop canvas follows the digest's 1180.
- **The harness was proved first**: a fresh HEAD worktree at `2299a63` on :5174 against the
  unedited tree on :5173, themes 0–4, every category, both surfaces. It came to **0 of 660 on
  each** after the port and stamp normalisation (194 raw, all the port).

**Settled** (2026-10-02).
- **`sectionVm`** (`EncoreBuilder.jsx:463`–`492`): a `d === 1` arm under Lime, Grunge and
  Editorial, before layout 3's. It holds one `[top, foot]` row per section per width, read off the
  frames, and sets `vm.pad` from it. Desktop is × 0.82 rounded to 0.1, the blocks' `u()`.
  - `null` keeps `padY`. That covers the header's top, which its nav margin cancels, and
    pricing's desktop foot, which its foot rule bleeds through.
  - The repertoire, the form and the footer have no row.
  - No new vm key, as the audit found.
- **`EncoreSection`**: the calendar's desktop `calc(u(56) - padY)` margin (`:15832`) and the map's
  (`:18808`) are gone, folded into the arm, and their comments point to it. Pricing's foot-span
  comment (`:9391`) says why its desktop foot stays `padY`.
- **Digest: 78 of 660 on each surface, the 75 named plus three.** The two surfaces' lists are
  identical, and every file is geometry only: no style column moved and the line counts are
  equal. Each root's height moves by exactly its inset change:
  - **header `arch 1` and `5`**: −34.1, +4 and −34 (only the foot moves, so three rows a file);
  - **bio**: −68.3, +8 and −28;
  - **media**: −19, +8 and −8;
  - **gallery**: −84.6, −36 (26 at the top, 10 at the foot) and −8;
  - **pricing**: −34.1 (the top alone), +8 and −28;
  - **map**: −34.1 (the foot alone), +8 and −8;
  - **testimonials**: −68.2, +8 and −8;
  - **the calendar at 390**: −8.

  **The three unnamed files are the calendar's desktop renders, themes 1–3, on both surfaces.**
  The fold is exact to Blink's 1/64px layout unit and no closer. At full precision HEAD's
  `80px + calc(45.9px - 80px)` lays the card out at 45.90625, and the arm's `45.9px` padding lays
  it out at 45.890625. The digest rounds to 0.1, so 6, 9 and 11 rows read 0.1 higher, and Grunge's
  root height reads 908.7 → 908.6. The map's desktop top carries the same 1/64 inside its named
  file. Rounding to whole pixels, as layout 3 does, would have moved every row by 0.1.
- **The real app** (the probe again: card 2, the canvas's three tabs, then Publish, Open at 1440,
  768 and 390):
  - **Editorial reads the frame column of the table above.** The published 1440 tab shows the
    frame at 1:1: header → bio 112, bio → media 142, media → repertoire 86, repertoire → gallery
    46, gallery → pricing 46, pricing → calendar 56, calendar → map 112, then 56 to the form, the
    testimonials and the footer. 768 reads 120 / 120 / 60 / 30 / 46 / 56 / 116 / 60 / 60 / 60, and
    390 reads 40 / 70 / 40 / 40 / 40 / 40 / 80 / 40 / 40 / 40. The tester's pairs read **112, 142,
    46 and 56** (were 195, 195, 98 and 98), and 390's header → bio reads **40** (was 88).
  - **Lime** reads the same but for pricing's two pairs. Gallery → pricing is 81.6 / 104 / 68, and
    pricing → calendar is 45.9 / 116.6 / 70.3. That is its own inset content to content, 2px
    under the frame's 83.6 / 106 / 70 because its card's top starts 2px above its padding, as on
    HEAD.
  - **Grunge** reads the same but for the form's two pairs: map → form 91.9 / 120 / 80 and form
    → testimonials 93.1 / 120 / 80, against the frame's 95.1 / 120 / 80.
  - **Retro's and Pop's probe output is byte-identical to HEAD's.**
- **The bleeds.** Pricing's desktop foot span still ends on the root's bottom edge (gap 0) on
  both servers, themes 1–3, both surfaces, the root now padding `45.9px … 80px`. Editorial's
  1440 ink band and Grunge's and Editorial's ring overlays are the root's own box. The
  repertoire's sheets, the form's band and the footer are in no differing file.
- **The layout picker's thumbnails** (card 2 open, each section's picker): Editorial's `arch 1`
  roots pad as follows, and Retro's read 80 throughout.
  - the header 80 / 45.9;
  - the bio, the calendar and the map 45.9;
  - the gallery 37.7;
  - pricing 45.9 / 80.
- **Seam clips** of card 2's published page under the three templates, at 1440 and 390 (the
  bio's, media's, pricing's and form's tops): nothing overlaps, and 390's header cards end 40
  above the bio's.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed.
- **Docs.**
  - README's *The desktop page is the 1440 frame at 0.82* (`:650`) gains the vertical inset.
  - *Reversed* pointers:
    - `layout-2.md`: the bio (`:1057`), media's *named, not fitted* (`:1122`), the gallery
      (`:1309`), pricing (`:1398`), the map's foot (`:1625`) and the testimonials (`:1803`);
    - `../grunge/layout-2.md:405`, and `../retro/layout-2.md:274`, kept for Retro and Pop.
  - *Folded* pointers at the calendar's (`:1492`) and the map's (`:1612`) desktop insets.
  - A *kept* pointer at the form's `gPad` (`:1700`).
  - CLAUDE.md and `notes/` state no inset rule, so neither changes.
- **Named, not fixed:**
  - **Lime's pricing ring.** All three of Lime's pricing masters draw the instance's 1px
    `#F2FFD0` 20% ring. Lime's fit keeps it only as the 1440 foot rule, so at 768 and 390 the
    pricing pairs read content to content, not ring to ring.
  - **The form's inset.** Its 1440 `gPad` of 46 stands against the frame's 49.2, which shows
    under Grunge, whose form is no band.
  - **Line boxes.** A text line box adds 0.8–1.2 (Editorial's form → testimonials reads 46.7).
  - **The tester's "~13 at tablet"** is the 768 subtitle's extra line (`layout-2.md:944`–`948`).
    The header's foot is the frame's 60 now, but the cards above it still end where that line
    puts them.
  - **A long name runs past the desktop header**, as it did on HEAD, and the arm takes 34.1 of
    the slack under it. The `s.limeTree` block's desktop row is the frame's fixed
    `height: u(688)` (`EncoreSection.jsx:2280`). An identity column of three or more name lines
    therefore runs past the row, and the face and place cards run past it with that column. JP-092
    fitted the name's width, not this height. Measured in the harness, the last text's distance
    from the root's foot (HEAD's is 34.1 more):

    | Name | Lime | Grunge | Editorial |
    |---|---|---|---|
    | *Florence and the Machine* | 47.1 | 57.4 | **3.9** |
    | *Maximilian Featherstonehaugh Collective* | 27.3 | 9.3 | 61.6 |
    | *Shostakovich Collective of Greater Manchester* | −143.4 | −133 | **−22.4** |

    A minus is text past the header's root, into the bio's top inset or onto its content. On HEAD
    Editorial's *Shostakovich* name still fitted, at 11.7. 768 and 390 do not overrun (their
    rows grow). A `minHeight` row would let the photograph grow with the column instead. That
    changes the header, so it is a ticket of its own, not part of this entry.

Reply: **JP-094 — fixed.** On Feature spread (layout 2) the space between sections now follows
the design at every width, under Editorial, Lime and Grunge. Each section takes the top and
bottom spacing its own design frame states, and the frames stack the sections with no extra
space, so the gaps are the design's. At 1440 the published page measures 112, 142, 46 and 56 for
your four pairs (header → bio, bio → media, gallery → pricing, map → form). On mobile, header →
bio is 40. At tablet the gallery now sits 26px closer to the repertoire, as designed, and the other
pairs move 4–8px to the design's numbers. The 13px you saw at tablet is not
spacing: the default subtitle there runs one line longer than the design's sample text. Retro and
Pop are unchanged.

---

## End-of-pass sweep

1. Full digest against a `main` worktree on :5174 (port and `?t=` normalised), all categories ×
   themes 0–4 × three widths × canvas and `live=1`, the footer's `page=2` render included. Every
   diff must be one a Settled above names, and every named file must differ.
2. The repro sets re-run on the final tree, read off the DOM: JP-092's five names at the seven
   widths (1180 / 1440 / 1920, 768, 360 / 390 / 414); JP-093's `::placeholder` opacity per site; JP-094's gap table; the marker sweeps of both
   JP-095 entries (none of the seventeen left); JP-100's foot at 360 / 390 / 414 with the four days.
3. `reach.mjs` for every `in` that moved (both JP-095 entries, JP-096's labels and `map.base`,
   JP-098's label if added).
4. Walk Editorial card 2 in the real app and the published tab at 1440 / 768 / 390 — the tester's
   steps for each ticket — then Lime's and Grunge's card 2 once, and Retro's card 2 for every entry
   that reaches every template.
5. `npm run build:standalone`, then `cp source/dist-standalone/index.html index.html`, in its own
   commit. Then a two-build digest (`build-digest.mjs`, `CARD=2`), whose diff should be only the
   named rows.
6. `plans/README.md`'s Editorial row, and one reply line per ticket for QA (fixed / by design /
   needs PO), headed by the retest-against-the-stamp line
   (`curl -sI https://siniiitsa.github.io/js-plus-prototype-2/`; the triage read
   `Thu, 01 Oct 2026 10:11:08 GMT`, 8,779,739 bytes). Gather what is worth telling the designer —
   Retro's form label pair at 1.78:1 even solid (JP-093), the 390 bar and the 768 gallery's leaks if
   their calls stand — into a note at the plan's foot.

**Settled** (2026-10-02, all six steps; the push, the PR, the merge and the build stamp are the
user's).
- **1. Full digest against `main`: 92 of 660 on each surface** (184 of 1,320), and the
  reconciliation is by file.
  - **The harness.** A scratchpad worktree at `main` (`84be5f3`, PR #45), its `node_modules` an
    APFS clone with `.vite` removed, served on :5174 and warmed with 42 renders. Both `main` labels
    were taken first, then the tree's on :5173. Every category × themes `0,1,2,3,4` × three widths
    × canvas and `live=1`, the footer's `page=2` render included, port and photo stamps
    normalised. No file was a blank render, and no diff was 0.1px shaping outside the three files
    JP-094 named, so nothing was rerun.
  - **The expected set is the union of every Settled's list, not their sum**, since JP-094's
    files take in four other entries' surfaces. Per surface:

    | Entry | Named | Differ | Row shape |
    |---|---|---|---|
    | JP-094 | 75 + 3 | 78 | geometry only, `h` and `y`. Header `arch 1` and `5` three rows, the root −34.1 / +4 / −34. Bio −68.3 / +8 / −28, media −19 / +8 / −8, gallery −84.6 / −36 / −8, pricing −34.1 / +8 / −28, the map −34.1 / +8 / −8, the testimonials −68.2 / +8 / −8, the calendar at 390 −8. The calendar's desktop renders, themes 1–3: 6, 9 and 11 rows 0.1 off, the 1/64px its Settled names |
    | JP-095 (b) · JP-096 | 15 | 15, 9 of them inside JP-094's map files | +2 lines at every width (the two new labels). Under themes 0 and 4 alone the root grows 16.3 / 5.4 / 19.8 (Retro) and 16.2 / 5.4 / 4.2 (Pop). Under 1–3 it moves by JP-094's inset plus a shift inside JP-096's named −1.8 to +19.8 |
    | JP-097 | 15 | 15, 9 inside JP-094's media files | the byline's text row alone under themes 0 and 4; under 1–3 that row among JP-094's |
    | JP-098 | 5 | 5, 3 inside JP-094's gallery files | +1 line: the head span reads *Gallery*, the caption 376 → 361 and 31 → 46, the heading's span inserted. The root holds 504 under 0 and 4 and is 468 (JP-094's −36) under 1–3 |
    | JP-100 | 3 | 3, all inside JP-094's 390 calendar files | the foot's subtree and the heights over it |
    | JP-092, JP-093, JP-095 (a), JP-099 | 0 | 0 | — |

    The union is 78 + 6 + 6 + 2 + 0 = **92**: 24 files carry two entries' rows. Every named file
    differs, and nothing else does. *A note on the counts:* JP-097's, JP-098's and JP-100's
    Settleds say "30 / 10 / 6 of 660 on each surface", which are both surfaces together (15 / 5 /
    3 a surface, the lists above).
- **2. The repro sets on the final tree**, read off the DOM. Scratch puppeteer scripts in
  `source/scripts/` (deleted) drove card 2, published and opened. Each ran one template per process
  under `perl -e 'alarm …'`, appended each row to a JSONL sink, and had a retry, which no run needed.
  No page logged an error.
  - **JP-092** (Editorial, Lime and Grunge; the five names, each set through `st` and republished,
    at 1180, 1440, 1920, 768, 414, 390 and 360: 105 renders):
    - Every computed size is `min(ramp, column ÷ ems) × faceK` to within 0.0021px, the column read
      off its computed `width` and the ems off `data.js`'s tables.
    - No word's `Range` has a second rect. The tightest word ends 0.13 inside its column (Lime's
      *Supercalifragilistic* at 360). At 768 every word is 0.14 or more inside, so 60.1 or more
      short of the cards.
    - The fitted sizes are the Settled's table to the hundredth. Editorial: FEATHERSTONEHAUGH 54.27
      / 33.74 / 38.53 / 35.41, SHOSTAKOVICH 80.16 / 49.84 / 48 / 48 and SUPERCALIFRAGILISTIC 53.74 /
      33.41 / 38.16 / 35.06 (1440 / 768 / 390 / 360). *Kai Mercer* and *Florence and the Machine*
      keep the ramp everywhere.
    - **The page scrolls only where JP-092 named it**: the footer's rule (*Featherstonehaugh* at
      414 / 390 / 360, the page 437 / 425 / 425 under Editorial and 416 / 404 / 404 under Lime;
      at 360 *Shostakovich* 381 / 364 and *Florence* 390 / 372), and Editorial's 360 header at
      361 / 360. Grunge's never scrolls.
    - **One more, found by the sweep and the same on `main`:** Editorial's form at 360 with
      *Featherstonehaugh*. The layout-2 credit (the name at 18px over *DJ · Live Act*) ends at
      362.11, 2.11 past the page. The footer's 425 had masked it. It fits at 390. Named, not fixed.
  - **JP-093.**
    - The harness, `live=1`: form `arch 0`–`3`, repertoire `arch 0`–`3` and the calendar's
      `arch 3` wizard, themes 0–4, three widths. **90 inputs read 1, with `--ph: 1` inline**, which
      is form `arch 1` and `2`, 45 each. **210 read .45 with no `--ph`**: form `arch 0` (60 inputs
      and 15 textareas), `arch 3` (75 and 15), the repertoire search at `arch 0` and `1` (15 each;
      layouts 3 and 4 draw none) and the wizard's date cell (15). The wizard was read on its first
      step only, where the Settled stepped all three (105 cells).
    - The real app (card 2 under Editorial, Lime, Grunge and Retro, published, 1440 / 768 / 390):
      the form's three boxes read 1 and the repertoire search .45.
  - **JP-094's gap table**, rebuilt and deleted after. For each section, the union of its painted
    descendants: text `Range`s, img / svg, fills off the page ground, borders and shadows, each
    clipped by the root and every clipping ancestor up to it. A root painted off the ground counts
    its own edge. Card 2 under all five templates, on the canvas's three tabs (its ground taken
    from the published `documentElement`, since the canvas paints a gutter) and the published tab
    at 1440 / 768 / 390, on the tree and on `main`:

    | Pair | header → bio | bio → media | media → rep. | rep. → gallery | gallery → pricing | pricing → cal. | cal. → map | map → form | form → testi. | testi. → footer |
    |---|---|---|---|---|---|---|---|---|---|---|
    | Editorial, published 1440 | **112** | **142** | 86 | 46 | **46** | 56 | 112 | **56** | 56 | 56 |
    | *`main`* | *195.3* | *195.3* | *97.6* | *97.6* | *97.6* | *56* | *112* | *97.6* | *97.7* | *97.6* |
    | Editorial, 768 | 120 | 120 | 60 | 30 | 46 | 56 | 116 | 60 | 60 | 60 |
    | Editorial, 390 | **40** | 70 | 40 | 40 | 40 | 40 | 80 | 40 | 40 | 40 |
    | Editorial, Desktop canvas | 91.8 | 116.4 | 70.5 | 37.7 | 37.7 | 45.9 | 91.8 | 45.9 | 46.7 | 45.9 |

    - Editorial reads the expected frame numbers exactly on both surfaces. The canvas desktop is
      the frame × 0.82, with form → testimonials 46.7, the line box JP-094 named. The tester's
      four pairs read 112, 142, 46 and 56 (were 195.3, 195.3, 97.6 and 97.6), and 390's header →
      bio 40 (was 88).
    - **Lime** reads Editorial's numbers but for pricing's two named pairs: gallery → pricing 81.6
      / 104 / 68 and pricing → calendar 45.9 / 116.6 / 70.3 (canvas desktop / 768 / 390).
    - **Grunge** reads them but for the form's two named pairs: map → form 91.9 / 120 / 80 and form
      → testimonials 93 / 120 / 80. The Settled read 93.1, a text rect's 0.1.
    - **Retro: identical to `main`** at every pair, both surfaces and three widths. **Pop**:
      identical except one canvas Tablet pair (testimonials → footer), which read 99.2 against
      99.1, then 99.1 against 99.2 on a rerun. At full precision every Pop root height equals
      `main`'s except the map's +5.41 (JP-096's, named). The footer's top is a text rect, and its
      sub-pixel position re-rounds after that shift. Not layout.
  - **Both JP-095 entries' marker sweeps** (card 2 under Editorial, Lime, Grunge and Retro, at 1440
    / 768 / 390). The marker sets were built from `FIELDS` in Node and written through `st`.
    - **The seed** prints all nineteen literals at every width: the seventeen reported, plus
      JP-096's *Based in* and *Willing to travel to*.
    - **Marked**: every text field of pricing, the calendar, media, the testimonials and the map,
      and the header's Location. **None of the nineteen is left** at any width, and each of the 21
      markers prints. The header's Location on the travel card is the positive control.
    - **Emptied**: a fresh card, only the 20 label keys emptied. Only the prompt and the two pills
      print, each reading its seed again. No glyph-only text node appears that the seed lacks (no
      `[ ]`, `↓`, `●`, `✎`, bare `·` or count).
  - **JP-100's foot** at 360, 390 and 414: the first paint, then each of the four slots tapped
    (trusted clicks). Today's seed days are Friday, Sunday, Saturday and Sunday, not the Settled's.
    - Every state is one row, with the pill an `<a href="#form">` inside the foot and no page
      scroll.
    - **Editorial**: 84 on the prompt, 98 picked, the line under the chip. At 360 two days take
      117.5, Friday evening and Sunday wedding: JP-100's named 360 case, the line on three lines.
    - **Lime**: 84 at 390 and 414, the line beside the chip; at 360 98, under it (named).
    - **Grunge**: 84 with the line beside the chip at all three widths. Today's seed has no
      Wednesday, the day its Settled found dropping at 360.
    - **Retro**: 84, unchanged.
- **3. Reach.** A scratch copy of `reach.mjs` (deleted after) was filtered to the 23 rows the
  batch moved: both JP-095 entries' twenty keys, `map.base`, `who.location` and
  `gallery.railLabel`. It ran themes 0–4, 7,500 renders, with no walk beside it. **Every key reads
  the same under all five templates**, and each hit is 6/6 except `railLabel`'s.
  - Layout 2 alone: `pricing.kicker`, `featsLabel`, `calendar.dateLabel`, `availLabel`,
    `media.chipLabel`, and the map's nine new keys.
  - `calendar.prompt` 1–4, `media.countLabel` 1–3, `totalLabel` 2 and 3, `testimonials.kicker` 2
    and 3, `map.kicker` 1–3, `map.listLabel` 1 and 2, `map.base` 1 and 3.
  - `gallery.railLabel` layout 2 at 2/6, the tablet renders, by design.
  - `who.location` reaches map layout 2 on every template, beside the bio's 1–3 and the calendar's
    4 (and Retro's and Pop's calendar 1).

  A throwaway Node check of `fieldReach()` against the 22 plain rows found **0 mismatches** on the
  five templates.
- **4. The real app.** Two walks. A scratch puppeteer script did the tester's steps on card 2 under
  Editorial, Lime, Grunge and Retro: the canvas's three tabs, the edit panel, then Publish, Open at
  1440, 768 and 390. Then the committed `page-check.mjs Editorial 1,0,2,3` ran. No window logged an
  error, and none of `page-check`'s logged a warning (the scratch walk listened for errors alone).
  - **The canvas.**
    - The bar's byline reads *Kai Mercer · Single* on all three tabs: Slow Burn, the centre seat.
      The ♡ is drawn at Desktop and Tablet and not at Mobile (JP-099's override, unchanged).
    - The Tablet gallery's row reads *Gallery*, and its caption reads *See us in action* over *Kai
      Mercer* in one column.
    - The Mobile calendar's foot is one row, its pill a span. It is 84 with the line beside the
      chip under Lime, Grunge and Retro, and 98 with the line under the chip under Editorial.
  - **The panel**, under all four templates:
    - Every field JP-095 (a), JP-095 (b) · JP-096 and JP-098 added or re-scoped shows its seed
      with no "Not shown" note: *PRICING*, *WHAT’S INCLUDED*, the prompt, *Date*, *Availability*,
      *Featured* / *Max* / *Featured*, *What clients say*, the map's eleven and *Gallery*.
    - The map's *Based in* reads *Based in Manchester* under "Not shown in this layout".
  - **The published tab.**
    - The bar reads *Kai Mercer · Single* on the cued Late Lights at 1440 and 768.
    - Each list row played (a trusted click) moves the byline at every width: *Single*, *Hidden
      Sessions Vol. 2*, *Single*, *Live at the Deaf Institute*, *Hidden Sessions Vol. 2*. 390's
      first read names Roomtone's release, since `cur` survives the resize.
    - No ♡ at 390.
    - The 768 gallery reads as the canvas does.
    - The form's boxes and the calendar's foot are item 2's.
  - **`page-check.mjs`, Editorial card 2.**
    - Every nav link, Book Now, the six in-page anchors and the nine footer links scroll to their
      sections. Under the hook these are the bio's and the testimonials' Book Now, pricing's pill,
      and the calendar's *Pricing*, *Enquiries* and *Start Enquiry*.
    - The audio plays.
    - Every real control of the gallery, the repertoire, the map, pricing, the calendar and the
      testimonials changes its section. The probe's `false` entries are the already-selected chip
      or tile (the repertoire's *All*, pricing's *The House Party*, the testimonials' *HL*) and the
      SVG `rect` / `path` nodes the generic probe also clicks.
    - The form refuses an empty submit with the 2px paper ring on its three boxes, then composes
      `mailto:bookings@kaimercer.co.uk?subject=Enquiry&body=Event date: … / Event type: … / Your
      email: …`.
    - The tablet ↔ mobile resize walk logs no warning, `overflow390` is 0, and the 390 burger
      opens (2 → 6 links).
    - Cards 1, 3 and 4 render and publish their eleven sections.
    - Seam clips of every section's top at 1440 and 390: nothing overlaps, and 390's header cards
      end 40 above the bio's.
- **5. `index.html`** refreshed in `94e2487` from `npm run build:standalone`: 8,787,260 bytes, up
  from 8,779,739.
  - **The two-build digest ran with `CARD=1`, not the step's `CARD=2`.** `build-digest.mjs`'s
    `CARD` is 0-based, so 2 is card 3, layout 3's page. Editorial's and Grunge's own layout-2
    sweeps used 1.
  - **The run.** A throwaway copy (deleted) tagged each row with its section's root and re-based it
    on that root. It walked card 2 with reduced motion from `127.0.0.1:8931`: `index.html?v=old`
    before the `cp`, then `source/dist-standalone/index.html`. The comparison was at 0.2px.
    `modal.txt` is identical (4 / 4 / 4 / 4 / 3).
  - **Every section moves as the harness did.**
    - **Retro and Pop**, at every tab: the media byline's one row (*Kai Mercer · Single*, Pop's
      *KAI MERCER · Single*), the map's two new labels (+2 rows), and the gallery's +1 row at
      Tablet. Nothing else moves.
    - **Lime, Grunge and Editorial**, at every tab:
      - JP-094's rows on the header (the root's height alone), the bio, media (with the byline),
        the gallery (+1 row at Tablet), pricing, the map (+2 rows) and the testimonials;
      - the calendar at Mobile alone (JP-094's −8 and JP-100's foot);
      - the repertoire and the form: 0.
      - The calendar's Desktop is 0 at 0.2px. Its 6–11 rows of 1/64px are under the tolerance.
  - **What is left is residue**: the footer seal's 0×0 `<defs>` / `<path>`, 2 rows a tab under the
    four templates that draw it. They report the viewport origin, so re-basing moves them with the
    page.
  - **The 1088 Desktop canvas adds nothing.** Editorial's header moves by its root's height alone
    (772.1 → 738, −34.1), and no title row moves. So JP-092's width-fitted title keeps the ramp on
    the seed there, as its Settled measured (MERCER's limit 139.2). JP-094's arm has no width term.
- **6.** `plans/README.md` gains an Editorial *Layout 2 QA fixes* row. The replies and the
  tickets-list item are below, and the note for the designer is at the plan's foot. At the sweep
  the deployed build still read `Thu, 01 Oct 2026 10:11:08 GMT`, 8,779,739 bytes, which is the
  tester's build and `main`'s root `index.html`.
- **Named, not fixed, found by the sweep:** Editorial's form at 360 with *Featherstonehaugh* (item
  2), the same on `main`.
- **Torn down**:
  - :5174, which stopped at its background time limit after both its labels and the gap probe's
    `main` runs had been taken;
  - the `main` worktree (`git worktree remove --force`);
  - :8931.

  The scratch scripts in `source/scripts/` were deleted. :5173 is the user's and still runs.

**Replies to QA, one line per ticket.** **Retest against the Pages build whose `last-modified` is
later than `Thu, 01 Oct 2026 10:11:08 GMT`** (the build these reports were filed against,
8,779,739 bytes; `curl -sI https://siniiitsa.github.io/js-plus-prototype-2/`). An older tab or
cached build still shows every one of them.
- **JP-092 — fixed.** On Feature spread (layout 2), a long name in the hero now shrinks until its
  longest word fits the column, at every width. It still wraps between words, never inside one,
  and the page no longer scrolls sideways.
  - *Maximilian Featherstonehaugh* sets at about 54px at 1440 (the size the page reports, as your
    97px was), about 34px at 768, clear of the two cards, and about 39px at 390.
  - A name that fits keeps the design's 97px. That includes *Kai Mercer* and *Florence and the
    Machine*.
  - Lime and Grunge had the same fault in this hero, and the same fix covers them.
  - *Not changed, logged separately:*
    - Retro's Feature spread still overflows with a long name. Its typeface needs a width table
      before the same fit can work there.
    - At 360, Editorial's menu bar runs 1px past the page with *Featherstonehaugh*.
    - At 390 and 414, the footer's rule beside the name scrolls the page sideways with that name
      (Editorial and Lime). At 360 the other long names do it too. *Answered by JP-092 (rest),
      [`retest-qa-fixes.md`](./retest-qa-fixes.md): the rule now gives way to the name.*
    - At 360, the Enquiry Form's credit runs 2px past with that name.
- **JP-093 — fixed.** The Enquiry Form's EVENT DATE, EVENT TYPE and YOUR EMAIL now draw solid, as in
  the design, at every width and on every template.
  - Under Editorial that is `#141414` on `#DA7C5E`, about 6.2:1 (it was 2.3:1).
  - Layout 3's form (Inset Hero) labels its boxes the same way, and it is fixed too.
  - Placeholders that are hints under a visible label stay faint on purpose: layouts 1 and 4's
    form, and the Repertoire's search.
  - Typed text is unchanged, and an empty submit still rings the boxes.
  - Passed to the designer: Retro's own colours for these labels (cream on mustard) are 1.8:1 even
    solid.
- **JP-094 — fixed.** On Feature spread (layout 2) the space between sections now follows the
  design at every width, under Editorial, Lime and Grunge.
  - Each section takes the top and bottom spacing its own design frame states. The frames stack the
    sections with no extra space, so the gaps are the design's.
  - At 1440 the published page measures 112, 142, 46 and 56 for your four pairs (header → bio,
    bio → media, gallery → pricing, map → form). On mobile, header → bio is 40.
  - At tablet the gallery now sits 26px closer to the repertoire, as designed, and the other pairs
    move 4–8px to the design's numbers. The 13px you saw at tablet is not spacing: the default
    subtitle there runs one line longer than the design's sample text.
  - Retro and Pop are unchanged.
- **JP-095 (a) — fixed.** Eight labels on layout 2 are now editable on every template, in the
  editor and on the published page. Each starts as the design's text, and each can be emptied to
  hide it.
  - **Pricing**: *Kicker* (the "[ PRICING ]" over the heading) and *Features label* ("WHAT'S
    INCLUDED"). They print as typed, so type capitals to keep the design's look.
  - **Booking Calendar**: *Date column label* and *Availability column label* over the list of
    dates. Emptying both removes the row. *Prompt* is "Pick a date to enquire", which every
    calendar layout shows while no date is picked. Left empty, it shows the design's text again,
    because the space would otherwise look broken.
  - **Media Player**: *Card chip* ("● Featured" on the front card). *Counter label* and *Counter
    total label* are the two words of "5 Featured / 5 Max", and *Counter label* is layout 1's "5 / 5
    Featured" too. The numbers are the track count. An emptied word takes its number with it.
  - **Testimonials**: *Kicker* now changes "✎ What clients say" and no longer says "Not shown in
    this layout". Layout 3 still starts from "Testimonials".
  - A long label wraps rather than running off a phone screen. Labels nobody reported stay as the
    design draws them: the Bio's "Bio" eyebrow, the Booking Calendar's legend and its "… selected"
    line, the Repertoire's "All" chip and search hint, and the footer's "A JustPay Product".
- **JP-095 (b) · JP-096 — fixed.** The map's layout-2 travel card and list are now editable on
  every template, in the editor and on the published page. Each label starts as the design's text.
  - **Events Map**, layout 2:
    - *Kicker* now changes "Travel radius", and *List label* "Other upcoming". The number after it
      is the count of gigs.
    - New: *Home label* ("Based in"), *Home caption* ("Home location"), *Venue label* ("Willing to
      travel to"), *Venue caption* ("Venue location"), and *Max travel label*, *Travel time label*
      and *Booking fee label* over the three numbers.
    - *Venue link button* and *Directions button* change the two buttons.
  - Left empty, a label is not drawn, and the list label takes its count with it. A button left
    empty shows its design text again, because a button needs a label.
  - **JP-096.** The card now prints the design's *Based in* and *Willing to travel to*. The town
    under *Based in* is the header's **Location** ("Manchester, UK", as in the design), so it is
    typed once. The map's own *Based in* field still sets layouts 1 and 3. In layout 2 it says "Not
    shown in this layout", and its hint points to the header.
  - A long label wraps rather than running off a phone screen.
  - **Seen on the screenshot, not changed:** the card's heading ("Venue Distance" in the design,
    the map's Heading here), the chip ("● Confirmed" there, the featured gig's date here), which
    gig is featured, and "100 mi" (the Coverage field's default is still "12 mile radius", with the
    designer).
- **JP-097 — fixed.** The player's bar now reads *Kai Mercer · Single* under the track title, as in
  the design, at every width.
  - It follows the track that is playing, so a track from *Hidden Sessions Vol. 2* shows that
    release instead.
  - Every template had the same gap: the bar printed the artist alone, from an early version of the
    layout.
  - Once the artist edits the track list, the line shows the track's whole subtitle, the same text
    as its row in the list (for example *Kai Mercer · Single · 4:55*). A long release is cut with an
    ellipsis, as the title above it already is.
  - *Not changed:* the cued track's title, LATE LIGHTS, is still cut in the bar at 1440 (Editorial
    and Lime) and at 390 (Editorial and Pop, and Lime and Retro at 360). That is the title's own
    box, which this fix does not touch.
- **JP-098 — partly fixed, partly by design.** At tablet width the gallery's small label row now
  reads *Gallery*, as in the design. The caption on the large photo shows the section heading over
  the artist's name on two lines, also as in the design.
  - *Gallery* is a new field, *Gallery label*, so the artist can change it or clear it (cleared,
    the row is not drawn). The fix applies to every template.
  - *By design:*
    - **The six thumbnails.** In the tablet design the last thumbnail in each column is 1px tall,
      a desktop size left in the frame, which is why only four show. Drawing four would hide two of
      the seven photos from tablet visitors.
    - ***View list* and ✕.** They are not drawn because the page has no list view for them to
      open, so they would be buttons that do nothing.
- **JP-099 — nothing changes in this build; passed to the designer, whose call it is next.** At 390
  the Media Player's bar leaves out ♡ ↓ ⋯ and the running time on purpose, on every template, not
  only Editorial and Grunge.
  - The 390 design fits them only by running the song's name off the bar. It is the 768 bar
    squeezed to 330px, so the box holding the cover, the title and the running time is 23px wide.
    The design therefore shows a sliver of the cover and neither the song's name nor the time: the
    name sits past that box, under the icons, and would run 117px off the bar.
  - On the page the three icons would take 75px from the title, cutting a name like *Late Lights*
    to two or three letters. Under Editorial it already loses its last letters at 390 without them.
  - The icons do nothing at any width: they are not buttons on the published page. So at 390 the
    page keeps the song's name instead.
  - This was decided for Retro's player in its first pass and has held for every template since.
    It is in the designer's notes for this layout (*Notes for the designer* 6).
  - If the designer wants the icons at 390, the bar needs a 390 layout of its own (the icons on a
    second line, or no cover art). That is a small change once they choose.
- **JP-100 — fixed.** On a phone, the Booking Calendar's foot is one row again, as in the design:
  the date chip, the line, then *Start Enquiry*.
  - That covers Lime, Grunge and Editorial, which all shared the stacked foot. It came from an older
    version of Retro's calendar that Lime's design pass started from.
  - Under Lime and Grunge the line stands beside the chip.
  - Under Editorial the button's typeface draws it 14px wider than the design's, which leaves the
    line too little room beside the chip. So there the line sits under the chip, with the button
    still beside both.

**New, for the tickets list** (found by JP-094, not fixed in this batch). **On Feature spread at
1440, a name long enough to take three or more lines runs out of the header.** The header's desktop
row is a fixed height, the design's 688 (`EncoreSection.jsx:2280`), so a tall name column runs past
it. JP-094 found the face and place cards running past with it.
- With *Shostakovich Collective of Greater Manchester* the last line ends below the header's foot,
  in the Bio's top space or on its content:
  - **22px past under Editorial.** On the build you tested it was 48px past (and the name ran off
    the page sideways too).
  - **143px under Lime and 133px under Grunge**, against 109px and 99px on that build. JP-094's
    tighter spacing takes 34px of the room under the name.
- Two-line names fit, with room to spare. At 768 and 390 the header grows with the name.
- A fix would let the photograph's row grow with the name column (a minimum height in place of the
  fixed one). That changes the header's design, so it wants its own ticket.

## Notes for the designer

*(What this batch found worth telling the designer, gathered by the sweep into one note to forward,
in layout 1's shape. Each is shipped as described. [`layout-2.md`](./layout-2.md)'s eight notes
still stand. Two of these restate its note 6 because QA reported them.)*

1. **Retro's form labels are 1.78:1 even at full strength** (JP-093). Retro's layout-2 form
   (`964:64652`) inks EVENT DATE, EVENT TYPE and YOUR EMAIL in `#FBF6EA` on the `#E8B33B` boxes. The
   page now draws every template's labels solid, as every frame does. That brings Editorial from
   2.29:1 to 6.16:1, but Retro's own pair stays 1.78:1, under any readable contrast. The boxes have
   no other label.
2. **The 390 player bar pays for ♡ ↓ ⋯ with the track's title** (JP-099; note 6's fifth bullet).
   The master (`I986:15683;879:10509`) is the 768 bar squeezed to 330: 40 + 117 transport + 24 +
   **22.9** for the sleeve, title and clock + 24 + 62 icons + 40. So it draws a sliver of the
   sleeve and runs the title 117px off the bar. The page keeps the title and drops the clock and
   the icons, which do nothing. If the icons are wanted at 390, the bar needs a 390 layout of its
   own: the icons on a second line, or no sleeve. *Reversed* (JP-099, 2026-10-05): QA asked for
   the icons again, so the page now draws them at 390 and drops the sleeve; the clock stays off.
3. **The 768 gallery's last tile in each column is 1px tall** (JP-098; note 6's seventh bullet), a
   desktop height left in the frame. That is why QA counted four thumbnails. The page divides the
   band in the frame's proportions, so all six show and no photograph is hidden at tablet. The
   frame's *View list* and ✕ have no list view to open, so the page does not draw them.
