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
| 6 | JP-100 | 390 calendar foot: pill on its own row | **Confirmed, a fit slip**: Lime's fit drew Retro's pre-QA stack (JP-060's shape) | S | light — Editorial's line | open |
| 7 | JP-097 | Byline lacks *· Single* | **Confirmed, a fit slip of every template**: the bar prints the artist alone; layouts 3 and 4 print the release | S | no | open |
| 8 | JP-098 | 768 gallery: six tiles, no *Gallery · View list ✕* | **Confirmed, and recorded**: Retro's squeeze override and head-row allocation, every template | S | **yes** — tiles, head row, dead controls | open |
| 9 | JP-094 | Section gaps too large | **Confirmed, and recorded**: layout 2 stands every section on `padY`; the frames' own insets differ by up to 85px at 1440 and 48 at 390 | L | **yes** — scope, widths | open |
| 10 | — | End-of-pass sweep | — | S | — | open |

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
  closed:
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
    points here). Grunge's footer fits.
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
`../lime/layout-2.md:823`, `../grunge/layout-2.md:1128` and `layout-2.md:1470`; `notes/calendar.md`
(true again, with Editorial's wrap under A).

**Settled.** —

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

**Settled.** —

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

**Settled.** —

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

**Settled.** —

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

**Settled.** —
