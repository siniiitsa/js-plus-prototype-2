# Editorial layout 3 QA fixes — bug-by-bug plan

Working checklist for the tester's batch against the **Editorial template, layout 3** (card 3 of the
setup modal, *Inset Hero*): JP-102 … JP-107. It works like
[`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md): **one entry per session, with context cleared
between sessions**, and each session writes what it settled back into this file.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then *How each
session runs* in [`../grunge/layout-3-qa-fixes.md`](../grunge/layout-3-qa-fixes.md) (the base
recipe for a layout-3 batch: the digest, `&column=right`, `&today=`, `&page=2`, `reach.mjs`) and
the deltas in [`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md), *Verification harness* in
[`../retro/qa-fixes.md`](../retro/qa-fixes.md) (the `&cj=` harness), then the memory notes
`verifying-the-published-tab` and `browser-tool-choice` (and `figma-frame-reading` for any entry
that reads a frame). Then the section's `notes/` file, which each entry names, and **the entry each
ticket reverses**, read whole. [`layout-3.md`](./layout-3.md) holds the Figma node ids of every
Editorial layout-3 frame and its Lime and Grunge twins (*The sections* table, `:232`–`253`; the page
is `964:68717` / `984:16811` / `984:16842`, on the Figma page **Layout 3** `964:58573`), and its
*Settled in section N* bullet is the fit each entry moves. The shapes the entries copy:
- JP-092 in [`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md): a display name fitted to its widest
  word on an `inline-size` container, `min(ramp, calc(100cqi / s.cardNameEms))`, never broken
  inside a word — JP-102;
- JP-094 in [`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md) and the layout-3 `vm.pad` arms in
  `sectionVm` (`EncoreBuilder.jsx:544`–`586`): a section's vertical inset read off its own frames —
  JP-103;
- JP-090 in [`qa-fixes.md`](./qa-fixes.md): a per-layout seed (`mapKickerSeed(d)`) that `sectionVm`
  and `EditPanel`'s chain both call — JP-105;
- JP-069 (weekday) in [`../grunge/retest-qa-fixes.md`](../grunge/retest-qa-fixes.md) and the
  calendar's `today` rule (`EncoreBuilder.jsx:1378`, live only): a gig's date derived in
  `sectionVm`, never in `EncoreSection` — JP-106;
- the reviews hint's "layouts 2, 3 and 4 have no seat for the date" (`data.js:2248`–`2254`) and
  `GigsField`'s design-aware note (`NO_WEEKDAY_HINT`, `EncoreBuilder.jsx:3106`–`3113`): a column
  one layout leaves out, disclosed in the panel — JP-107.

Branch: **`editorial-layout-3-qa-fixes`, forked from `main`** (`50513ab`, after PR #50). One commit
per entry (`Fix JP-102: …`). A decision-only entry commits the plan alone.

**Build and reproduction.** JP-102's screenshot names its build, `02.10 22:25`, which is
`Fri, 02 Oct 2026 22:25:49 GMT`, the deploy of PR #47's merge. That build predates the Editorial
retest and the display face, so it was still set in Noto. The other five tickets name no build. At triage (2026-10-06) the deployed Pages
build read `Tue, 06 Oct 2026 09:29:32 GMT`, 9,822,351 bytes, which is byte-identical in size to
`main`'s root `index.html` (`924a070`, the display face's refresh). Gloock is wider than Noto, so
JP-102 is **worse** on today's build: [`display-face.md`](./display-face.md) step 5 named this very
site (`:851`–`853`, "the hero title … runs its long word past the well's clip at 768 too").
The triage ran scratch puppeteer probes on HEAD against `preview.html` (`&name=`, `&cj=`,
`live=1`) and a publish-and-measure probe at 1440. The numbers below are those probes'.
**Nothing was reproduced in the real app.** Each session does that first (Editorial card 3,
Publish, Open) and records anything that does not reproduce.

**None of the six is Editorial's alone in code.** This
decides each entry's digest theme list. `digest.mjs`'s default list is `0,2,3,4`, which **skips
Lime**, so always pass the list explicitly.

| ID | Where the cause sits | Templates | Digest themes |
|---|---|---|---|
| JP-102 | `HeaderV2`'s `s.limeTree` h1: the flat ramp with no fit | Lime, Grunge, Editorial (Retro's and Pop's placeholder clip at the column instead) | 0–4 |
| JP-103 | no layout-3 `vm.pad` arm for the repertoire's foot or pricing's top at desktop | Lime, Grunge, Editorial | 0–4 |
| JP-104 | the `s.limeTree` repertoire block's `const stack = tab` | Lime, Grunge, Editorial (only Editorial needs it) | 0–4 |
| JP-105 | `MAP_RADIUS`, one seed for three layouts whose frames print three values | every template | 0–4 |
| JP-106 | no status on a gig; the ↗ a recorded drop | every template | 0–4, `live=1` with `&today=` |
| JP-107 | `SongsField` has no per-column reach; the songs hint is silent on the artist | every template (chrome) | — (panel only) |

## The report (translated)

> **JP-102 — a long one-word name in the hero is cut off or hidden under the portrait card.**
> Steps: Editorial → Inset Hero → Header → Title = *Maximilian Featherstonehaugh* → Publish → Open.
> Actual: **390**: the second line, FEATHERSTONEHA…, is cut by the frame's edge; **768**:
> FEATHERSTONE runs under the portrait card, and the "H" peeks out to its right; **1440**: the
> last letter runs into the card's frame. Expected: the name fits, as in design `984-16842`.
> Checked: *Florence and the Machine* wraps fine at all three widths, so the problem is the long
> word; on layout 2 (JP-092) and layout 1 (JP-086) the name already scales on this same build
> (retest 05.10), on layout 3 it does not. Screenshot:
> `JP-102-editorial-layout3-long-hero-name-clipped-390-under-card-768.jpg`.
>
> **JP-103 — at desktop 1440 three gaps between sections are larger than in the design:**
> Repertoire → Gallery 97 instead of 57 px; Gallery → Pricing 100 instead of 60 px; Enquiry →
> Testimonials 156 instead of 61 px. The other gaps match, and at tablet and mobile everything
> matches too.
>
> **JP-104 — at tablet 768, in the Curated sets cards, the song's length drops under its title;**
> in the design it stands on the same line, on the right. Checked both in the editor and on the
> published page.
>
> **JP-105 — under the Events Map's map the default reads *12 mile radius*,** though the rings are
> labelled 30/60/120mi, and the design reads *120 mi radius*. The text comes from the Coverage
> field (its default value).
>
> **JP-106 — the Events Map's gig rows have no Upcoming/Past pill and no ↗ arrow,** though the
> design has them on every row. *Tickets →* appears once the link field is filled. Close to the
> decision on JP-047 (the city filters were closed by decision), so if this is already covered,
> the ticket can be dropped.
>
> **JP-107 — the Artist field of the Repertoire's songs is printed nowhere on layout 3** (12
> fields), and it carries no *Not shown in this layout* note. The look itself matches the design,
> which has no artist either. The only problem is that the editor does not warn about it.

## Status

| Order | ID | Report (short) | Verdict | Size | Decision | Status |
|---|---|---|---|---|---|---|
| 1 | JP-104 · JP-106 · JP-103 (form) | 768 length stacked · no status pill, no ↗ · Enquiry → Testimonials 156 | **JP-104 a recorded call** (JP-044, kept by JP-066), which now buys nothing under Lime and Grunge; **JP-106's premise has changed** (gigs carry a `year` since JP-069), the ↗ a separate recorded drop; **JP-103 (form) unreconciled**: the triage measured it matching from like edges, but the tester's screenshot measures card foot to label on both sides, and the frame reading disagrees with that crop; re-read before asking | — (decisions) | **user: JP-104 D; JP-106 A (seed 2031), no pill on the canvas, the ↗ a reply; JP-103 (form) A** (2026-10-06) | **done** (reproduced on HEAD; the form frame re-read: card foot → label 166, so A) |
| 2 | JP-107 | Artist not flagged at layout 3 | **Confirmed, chrome**: no per-column reach exists; the songs hint names the length but not the missing artist | S | **user: B** (the hint and its mirror; 2026-10-06) | **done** (reproduced; 0 digest files; verified on cards 1–4 under all five templates) |
| 3 | JP-102 | Long hero name clipped / under the card | **Confirmed, `s.limeTree`**: the h1 is the flat ramp; the column already ends at the card, the word just ignores it. Named, not fitted, in `display-face.md:851` | S | **user: A** (JP-092's shape; Retro's half named; 2026-10-06) | **done** (reproduced; 0 digest files, the `&name=` control 6 per surface; 156 renders fitted to 0.005px) |
| 4 | JP-105 | *12 mile radius* against 120mi rings | **Confirmed, a seed three frames disagree on**; parked for the designer on 2026-09-29, and this is the ticket that call waited for | S | **yes** — A (a per-layout seed), A + D (and `base` at layout 3) | open |
| 5 | JP-104 (code) | 768 length stacked | **D**: one row, the title clamped to two lines, the length on the right | S | decided (entry 1) | open |
| 6 | JP-103 (rest) | Repertoire → Gallery 97, Gallery → Pricing 100 | **Confirmed, `s.limeTree`**: both sides of the taupe band keep `padY` 80 at desktop where the frames pad 56 | S | no | open |
| 7 | JP-106 (code) | no status pill | **A**: a derived pill, published tab only, the seed's year 2031 | M | decided (entry 1) | open |
| 8 | — | End-of-pass sweep | — | S | — | open |

**Why this order:**
- **The decisions first.** Entry 1 writes no code. JP-104 and JP-106 each reverse a recorded call,
  and JP-103's third gap needs its two readings reconciled before it can be asked. Their code entries (5, 7)
  are placed by footprint.
- **Then by footprint, zero-diff entries first.** JP-107 touches the panel alone (no digest file),
  and JP-102 moves nothing on the seed (*Kai Mercer* fits at every width under every theme; the
  probe's positive controls are the long names). JP-105 is 30 files, text only. JP-104 is 4–6
  files, JP-103 12, geometry.
- **JP-106 last.** It changes `GIGS`' seeded year, draws a new node in every template's layout-3
  row, and brings back the frame's 768 venue wrap and 390 stacking that layout 3's map fit recorded
  as diffs. So every earlier entry should digest against a base without it.

**"Decision"** means the entry lists options with a recommendation. The session starts by asking
the user (one `AskUserQuestion`, up to four questions) and records the answer under **Decided**
before writing code. "Light" is one question.

## How each session runs

As [`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md)'s *How each session runs*, steps 1–9, on top of
[`../grunge/layout-3-qa-fixes.md`](../grunge/layout-3-qa-fixes.md)'s, with these differences:

1. The *Evidence* line numbers are from the triage (2026-10-06, `50513ab`). Re-check them.
2. **Reproduce first**, on HEAD, in the real app: Editorial **card 3**, Publish, Open, the tester's
   steps at 1440, 768 and 390. The harness numbers below are the triage's; re-take them.
3. **The desktop of layout 3 is the composed page.** Card 3 composes the bio, media and calendar
   at desktop, so probe `&column=right` / `left` beside the plain desktop where an entry touches
   those sections (none of this batch's does: the header, repertoire, gallery, pricing, map and
   form stand full width). The published desktop **lays out at 1180 and zooms** (`min(w, 1440) /
   1180`), so a canvas inset of `round(v × 0.82)` is the frame's `v` at a 1440 window — the
   tester's 97 is the canvas's 80.
4. **An entry that reverses a recorded call** (JP-104, JP-105, JP-106) adds a *reversed* pointer
   where the call was recorded (the plan's *Settled* bullet, the code comment, the `notes/` line)
   and rewrites any CLAUDE.md, README or `notes/` line that states the old call as a rule. JP-102
   adds an *answered* pointer to `display-face.md:851`.
5. **The real app is Editorial card 3**, then Lime's and Grunge's card 3 for every entry that
   reaches them, and Retro's card 3 for every entry that reaches every template. Under Lime,
   Grunge and Editorial only header arch 4 and 5 fold (onto 0 and 1), so a layout-3 header hit is
   arch 2 alone.
6. **Pop layout 3 is open on its own branch** (`pop-layout-3`, off the unmerged `pop-layout-2`,
   user call, 2026-10-05). Its plan widens the `HeaderV2` and repertoire `s.limeTree` blocks to
   `(s.limeTree || s.pop)` ([`../pop/layout-3.md`](../pop/layout-3.md) `:159` for the header; its
   *Sections* table, `:275`, names the repertoire's block). JP-102 and
   JP-104 edit exactly those blocks. Whichever lands second re-measures the other's site under Pop
   (JP-102's `s.cardNameEms` guard covers Pop's Titan for free; JP-104's `stack` choice does not).
   Each entry's *Settled* names what Pop inherits.

**Do not refresh the root `index.html` per entry.** The sweep does it once.

---

## Entry 1 — JP-104 · JP-106 · JP-103 (form): the decisions

One session, no code: one `AskUserQuestion` with four questions (JP-104; JP-106's seed; JP-106's
canvas; JP-103's form gap), then **Decided** written under each ticket below. JP-104's and
JP-106's code becomes entries 5 and 7. The replies (JP-106's ↗, JP-103's form gap on A) are written
here.

### JP-104 — 768: the song's length stands under its title

**Verdict: a recorded call, kept twice, that now pays only for Editorial.**

**What the page does.** The `s.limeTree` repertoire block sets `const stack = tab`
(`EncoreSection.jsx:13594`). At 768 each song row becomes a column, with the length under the title,
left-aligned and ellipsised (`:13618`–`13633`). The comment (`:13583`–`13593`) carries the whole
history. Retro's and Pop's body is one row at every width, the length `flex: none` on the right
(`:13438`–`13454`).

**What the frame does** (`984:16832`, inside `984:16829`). Each card is 222.67 wide, padded 24, so
a row is 174.67 × 62.5: the title at x 0, the length (26 wide) right-aligned at x ≈ 148.67,
`justify-between`. One seeded row overruns in the frame itself: *Don't Stop Me Now* is 172 wide
and puts 3:29 at x 172–198, into the card's padding. So the frame's "one line" holds for 11 of
its 12 rows.

**Measured** (triage probe, `live=1` with every set revealed, canvas identical):

| Template | 768 today | On one row at 768 |
|---|---|---|
| Lime | stacked | nothing cut (widest 153.9 of 154.7) |
| Grunge | stacked | nothing cut (widest 142.5 of 174.7) |
| Editorial | stacked; *Don't Stop Me Now* already cut (194.7 of 174.6) | four cut: *Dancing Queen* 154.9, *Mr. Brightside* 150.9, *I Wanna Dance* 144, *Don't Stop Me Now* 194.7, of ≈ 138.7 |
| Retro, Pop | one row, every title fits | — |

At 1440 and 390 every template is one row and nothing is cut (Editorial's widest 205 of 312 and
184.5 of 242).

**The record.**
- JP-044 ([`../lime/retest-qa-fixes.md`](../lime/retest-qa-fixes.md) `:179`–`224`) stacked the
  seat, then the artist, because Lime's 768 titles were cut to an ellipsis. Its standing rule is
  "no seeded title ends in an ellipsis at 768" (`:197`).
- JP-066 ([`../grunge/retest-qa-fixes.md`](../grunge/retest-qa-fixes.md) `:821`–`824`, user call,
  2026-09-29) put the length in the seat and kept the stack: "At 768 the length stands under the
  title, so JP-044's stack stays."
- [`display-face.md`](./display-face.md) `:616`–`618` accepted Gloock's cut of *Don't Stop Me Now*
  even stacked. `notes/list-editors.md:34` and [`layout-3.md`](./layout-3.md) `:1339` restate the
  stack.

JP-044's cause (a long artist beside the title) is gone, so under Lime and Grunge the stack now
buys nothing. Under Editorial it is what keeps three titles whole, and it already fails the
fourth. **The question is what Editorial's *Don't Stop Me Now* should do.**

**Decision.**
- **A. Reply: by design**, citing the chain above.
- **B. One row on all three templates** (`stack = false`): the frame's row. Editorial cuts four
  titles to an ellipsis (three of them new), breaking JP-044's standing rule. 6 files.
- **C. `stack = tab && ed`**: Lime and Grunge go back to the frame's row at no cost; Editorial, the
  ticket's template, is unchanged. 4 files. Can ride along with A.
- **D (recommended). One row, and the title wraps to at most two lines** (CSS
  `WebkitLineClamp: 2`, never a measurement: `EncoreSection` has no effect), the length `flex:
  none` on the right. The pinned 62.5 row holds two lines of about 22.8, so no section height
  moves. Lime and Grunge fit on one line and get the frame's row; Editorial wraps its four long
  titles between words and **shows *Don't Stop Me Now* whole for the first time**. The widest
  seeded single word is SUPERSTITION at 131.5 of the 138.7 (BRIGHTSIDE is to be measured in
  the session: a word wider than the room would still be cut, at its second line). 6 files.

**Expected after-diff** (repertoire `arch 2` × 768 × canvas and `live=1`): A none; B themes 1–3, 6
files; C themes 1–2, 4 files; D themes 1–3, 6 files, the rows' inner geometry only.

**Docs** (B–D). The comment at `:13583`; *reversed* pointers at `../lime/retest-qa-fixes.md:179`
(JP-044), `../grunge/retest-qa-fixes.md:821` (JP-066), `display-face.md:616` and
[`layout-3.md`](./layout-3.md) `:1339`; `notes/list-editors.md:34`.

**Reproduced** (2026-10-06, HEAD `2358a6f`, :5175; puppeteer: Editorial → card 3 → Publish →
Open, the popup at 1440, 768 and 390). At **768** all twelve rows are stacked, the length under
the title. *Don't Stop Me Now* is cut, 194.7 of the 175 title box, and no other title is. At
**1440 and 390** every row is one line and nothing is cut. (At 1440 a title's rect reads 1.22× its
`clientWidth`: that is the tab's zoom, not a cut.) The canvas was not re-checked this session; the
triage measured it identical. `const stack = tab` is still `EncoreSection.jsx:13594`.
**Measured for D** (Editorial, 768, the published tab): the row is 174.7 × 62.5, and the title
is Gloock 18.37px, uppercase, line-height 22.8, so two lines take 45.6 of the 62.5. The widest
seeded single words are SUPERSTITION **131.5** and BRIGHTSIDE **112.6**, against ≈ 138.7 beside
the length. Every seeded title therefore wraps between words. A typed single word wider than
≈ 138.7 would still be cut, at its second line.

**Decided** (user, 2026-10-06): **D. One row, and the title wraps to at most two lines.** The
length is `flex: none` on the right, the frame's row. The title is clamped with CSS
(`display: -webkit-box`, `WebkitLineClamp: 2`, the shape at `EncoreSection.jsx:8807`), never
measured. Lime and Grunge get the frame's one-line row back. Editorial wraps its four long titles
and shows *Don't Stop Me Now* whole. This reverses JP-044's stack (kept by JP-066). JP-044's
standing rule, "no seeded title ends in an ellipsis at 768", holds, and is now met by wrapping
rather than stacking. The code is entry 5.

### JP-106 — the gig rows have no Upcoming/Past pill and no ↗

**Verdict: two things, with two answers.** The pill's recorded reason no longer holds. The ↗ was
dropped for its own reason, which still holds.

**The pill.** JP-047 closed the Upcoming/Past *chips* because "a gig has no year, so nothing can
place it against today" ([`../lime/retest-qa-fixes.md`](../lime/retest-qa-fixes.md)
`:568`–`576`), and layout 3's fit dropped the row's pill on the same ground. **That premise is gone**:
- JP-069 (weekday) gave a gig a `year` column (`GIGS`, `GIG_KEYS`, `data.js:1218`–`1229`).
  `gigWeekday()` (`data.js:2759`) already turns year, month and day into a date.
- `today` already reaches `sectionVm` (`EncoreBuilder.jsx:282`). The published tab sets it, and
  the harness takes `&today=`. But it is honoured **live only** (`:1378`, the calendar's rule), so
  the canvas cannot know what has passed.
- `notes/map.md:44`–`45` and [`../grunge/retest-qa-fixes.md`](../grunge/retest-qa-fixes.md)
  `:443`, `:469` already record the status as "derivable, out of scope". Nothing computes it today.

**Two things a pill needs decided:**
1. **The seed.** `GIGS` is dated July–August **2025**, chosen because 2025's weekdays are the
   frames' (JUL 12 SAT … AUG 30 SAT). On today's date every seeded row would read **Past**. The
   frame shows five *Upcoming* and one *Past*. **2031 and 2036 have 2025's calendar**: every
   seeded day keeps its frame weekday (checked: Sat Fri Sat Sat Sat in all three), and `year` is
   printed nowhere (`data.js:1214`). So `year: '2031'` keeps JP-069's discs and reads *Upcoming*
   until 2031. A relative seed (the calendar's `slotSeed()` shape, JP-052) would track today but
   give up the frame's weekdays. Seeding a sixth, past gig, as the frame does, would add a pin and
   a row (`PINS` has five seats).
2. **The canvas.** With `today` live only, the canvas has no status. Either the canvas draws no
   pill (a canvas-only diff, the calendar's precedent), or it draws one off the editor's own
   clock, which breaks the reproducible-digest rule, or it draws every dated row as *Upcoming* as
   a picture.

A row with no `year`, or a date `gigWeekday()` refuses, gets no pill (the weekday's rule). The
frame's past row prints *Manchester · past* in the hour's seat. That, too, is a choice to offer.

**What the pill costs.** [`layout-3.md`](./layout-3.md) `:1746`–`1752` records the map's rows
staying one line *because* there is no pill: the frame's 768 venues wrap (its section 858 against
our 824.6) and its 390 row carries the pill under *Tickets →* (123 against our 84). A pill brings
both back, so rows grow at 768 and 390, on every template.

**The ↗.** This is not JP-047. Layout 3 drops the frame's ↗ beside the venue because it would mark
the same address *Tickets →* carries (`notes/map.md:55`–`57`; Retro's QA,
[`../retro/layout-3.md`](../retro/layout-3.md) `:1392`–`1393`; the comment at
`EncoreSection.jsx:20987`). Layout 2 draws one ↗ per row (`:20230`, `:20678`); layouts 1 and 4
draw neither. A seeded gig has `link: ''`, so even a drawn ↗ would be invisible on the tester's
page (JP-045: an empty link draws no ↗ and no *Tickets →*, on either surface). The only other
address a gig has is `directions` (`EncoreBuilder.jsx:1688`, layout 2's *Get Directions*).

**Decision.**
- **Q1, the pill.**
  - **A (recommended). A derived pill, live only**: `vm.gigs[].status` (`'upcoming' | 'past' |
    ''`) computed in `sectionVm` from `year` / `month` / `day` against `today`, through
    `Date.UTC` (the calendar's rule), and drawn in the empty seat beside *Tickets →* on every
    template's layout 3, both bodies. The seed's year goes to **2031**.
  - **A′.** A, with the seed relative to today (no frame weekdays).
  - **A″.** A, with the seed left at 2025 (every seeded row *Past* on the published page).
  - **B. Reply**, as JP-047: the status is derivable now, but not drawn.
- **Q2, the canvas** (on A): **no pill on the canvas** (recommended, the calendar's `dead` rule:
  the canvas is a picture with no date), or every dated row *Upcoming*.
- **The ↗: a reply** (recommended), whatever Q1 says: a recorded drop, the same address twice.
  Name it explicitly so it is not re-filed under JP-047. Offer only if the user asks: the ↗ on
  `directions`.

**Expected after-diff** (A, entry 7). Map `arch 2` × themes 0–4 × three widths, **`live=1` with a
pinned `&today=`**, about 15 files, rows' geometry at 768 and 390. On Q2's first answer the canvas
does not move. The seed's year change moves no file: the weekday is unchanged, and `year` prints
nowhere.

**Docs** (A). `notes/map.md:44`–`45` (the status is no longer out of scope) and `:55`–`57` (the ↗
stays dropped); *reversed* pointers at `../lime/retest-qa-fixes.md:568` (JP-047's premise, not its
chips) and [`layout-3.md`](./layout-3.md) `:1746`; the `GIGS` comment (`data.js:1212`–`1215`); the
`GigsField` hint, if it names the year's use; CLAUDE.md's `s.live` list (the map's controls, if the
pill counts as a read of `live`).

**Reproduced** (2026-10-06, HEAD `2358a6f`, the published tab, Editorial card 3): `#map` holds
no *Upcoming*, no *Past*, no ↗ and no *Tickets →* at 1440, 768 or 390 (no seeded gig has a link,
JP-045). The section is 812.5 / 824.6 / 839.5 tall.

**Decided** (user, 2026-10-06):
- **Q1: A. A derived pill, with the seed's year moved to 2031.** `vm.gigs[].status` is
  `'upcoming' | 'past' | ''`, derived in `sectionVm` beside `weekday` (`EncoreBuilder.jsx:1685`)
  from `year` / `month` / `day` against `today`, through `Date.UTC`. It is drawn in the seat beside
  *Tickets →* on every template's layout 3, in both bodies. A row with no year, or a date
  `gigWeekday()` refuses, gets no pill. `GIGS` seeds `year: '2031'`, which has 2025's calendar,
  so the discs keep the frame's SAT FRI SAT SAT SAT and every seeded row reads *Upcoming* until
  2031. The frame's *Manchester · past* in the hour's seat is not taken: the hour stays.
- **Q2: no pill on the canvas.** `today` stays honoured live only (the calendar's `dead` rule,
  `:1378`), so the canvas is a picture with no date and `status` is `''` there. The canvas does
  not move.
- **The ↗: a reply.** It is a recorded drop with its own reason (the same address as *Tickets →*,
  `notes/map.md`), not JP-047. The user did not ask for an ↗ on `directions`.

The code is entry 7. The ↗ reply is under *Replies*.

### JP-103 (form) — Enquiry → Testimonials, 156 against 61

**Verdict: unreconciled. Two readings disagree, so re-read before asking.** *Reconciled in entry
1 (below, **Re-read**): the frame's card ends 166 above the label, so the triage's reading stands
and the answer is A.*

**The tester's screenshot measures the same edge on both sides.** In both crops, the dashed card
holding *No charge to enquire* has its foot about 44 screenshot px above *● Testimonials* in the
design and about 108 in the build. That ratio, about 2.5, is the tester's 156 : 61. So the tester
read card foot to label on both sides. **The triage's frame reading does not agree with that
crop**: it puts the card's foot 162 above the label (the card 106–483 in a 589-tall form, the label
56 below the form). Either the triage read another node than the visible dashed card, or the crop
is not `964:68747`'s card. The build crop also shows the card's foot nearly level with *Tell me
about the night …*, where HEAD measures them 56 apart. That fits a report filed against the 02.10
Noto build, whose head wrapped differently.

**Before the question:** read the dashed card's foot off `absoluteRenderBounds` (or a
`get_screenshot` of `964:68747` + `964:68748`) and set it beside the tester's crop. Then
re-reproduce on HEAD, in the published 1440 tab. If the frame's card really ends near the form's
foot, B (or a stretch rule) stops being a new call and becomes the fix, with its own after-diff.

**The triage's reading**, kept for the session to confirm or replace (1440, Editorial; Lime and
Grunge alike):
- **The frame's 61 is the form frame's own bottom edge to the label.** That edge is invisible. In
  the build the same measure is **59 against 60**.
- **The build's 156 runs from the left column's last line** ("Tell me about the night …") to the
  label. In the frame, that measure is **154**, against the build's 152.
- **Measured card bottom to label**, both sides, it is 166 in the frame and 206 in the build. Both
  centre the card on the head column (`EncoreSection.jsx:27002`–`27006`, `alignItems: desk ?
  'center' : 'stretch'`; every frame's card and head share a centre: Editorial 294.5 / 294.5). The
  40px difference is the seeded heading: `formHeading3()` (`data.js:2400`, JP-070) reads *Book Kai
  Mercer for / your event*, longer than the frame's *Book Kai for your event*, so the head column is
  494 tall against 409 and the centred card sits higher. With the frame's copy (`&cj=`) the card's
  foot drops to 95.7 / 90.2 / 90.2 under Editorial / Lime / Grunge, against the frames' 106 / 90 /
  90. Editorial's remaining 10 is the lede: one line in the build, two in the frame.
- 768 matches (60 against 60). At 390 the card has 44 to the foot against the frame's 90: tighter,
  not wider, and unreported.

**Decision.**
- **A. Reply**, with the three measures above. No code. The recommendation waits on the re-read:
  A only if the frame's card foot really is 162 above the label.
- **B. Align the card to the head column's foot** at desktop (`alignItems: 'end'`). Every frame
  centres it, so this would be a new call. Form `arch 2` × themes 1–3 × desktop × both surfaces:
  the card moves down about 58 under Editorial, about 15–20 under Lime and Grunge; root heights
  unchanged.

**Re-read** (2026-10-06). The tester's crop is not on this machine, so it was not set beside the
frame. What follows rests on the frame and on HEAD, not on the crop.
- **The frame** (`use_figma`, `absoluteRenderBounds`, measured from the form instance's top):
  `964:68747` is 589 tall. Its row frame `I964:68747;725:3244` pads 90 / 90 and is
  `counterAxisAlignItems: CENTER`, so the frame itself centres the card on the head column. The
  dashed card `I964:68747;725:3296` (stroke `#C86E52`, dash 10, 10, fill `#FFF9F2`) runs
  **106–483**. *● Testimonials* (`I964:68748;753:2180`) inks at **649**, so:
  - card foot → label ink is **166**. The triage's 162 was measured to the label's *box*, which is
    the same reading;
  - form foot → label is **60**;
  - the left column's last line (the lede, inked to 494.2) → label is **154.8**.

  A `get_screenshot` of `964:68747` shows that same card, ending a clear 106 above the form's
  foot, so the triage did not read another node. The other frames: Editorial 768 (`984:16839`)
  94 / 34, 390 (`984:16870`) 124 / 34, Lime 1440 150.3 / 60.3, Grunge 1440 150 / 60. In no frame
  is the card foot 61 from the label.
- **HEAD** (`2358a6f`, the published tab at 1440, Editorial card 3, screen px = frame px): form
  foot → label **57.1** (frame 60); the left column's last line → label **149.5** (frame 154.8);
  card foot → label **205.5** (frame 166). The 40 over the frame is the seeded `formHeading3()`
  head, *Book Kai Mercer for / your event*, which is taller than the frame's *Book Kai for your
  event*, so the frame's own centring floats the card higher. Any longer name does the same, by
  the frame's rule.
- **Inferred, not measured**: on the tester's 02.10 Noto build the head set one line fewer
  (`display-face.md`: Gloock took the 1440 form head 3 → 4 lines, +86), so the head column was
  about the frame's 409 tall and the centred card's foot sat about where the frame's does. Card
  foot → label was then about 166 too. So 156 : 61 cannot be card foot → label on either side.
  The plain reading is the triage's: the 61 is the frame's invisible form edge, and the 156 runs
  from the left column's last line.

**Decided** (user, 2026-10-06): **A. Reply, no code.** The reply is under *Replies*. B (align the
card to the head's foot) would be a new call against the frame's `CENTER`, and would land the
card foot ≈ 147 from the label, no closer to the frame's 166.

---

## Entry 2 — JP-107: the songs' Artist is not flagged at layout 3

**Verdict: confirmed, chrome only.** The look is the frame's; the panel does not say so.

**Evidence.**
- `SongsField` (`EncoreBuilder.jsx:2648`) draws Title, then Artist with a 64px Length box beside it
  (`:2693`–`2703`), then Tags. It is passed no `design` (`:4248`).
- The only reach logic is per field: `fieldReach()` / `fieldNowhere()` (`data.js:2456`–`2466`),
  printed once under the label (`EncoreBuilder.jsx:4225`–`4231`). No column `in` exists anywhere.
- The songs hint (`data.js:2029`–`2031`) says layout 3 "shows each song's length". It does not say
  it drops the artist. Length is the mirror case, unprinted at layouts 1, 2 and 4, and unflagged
  too.
- Measured (every template, width and surface): the artist prints at layouts 1 (12 at desktop, 6
  narrow, paged), 2 (10) and 4 (12), and **0 at layout 3**. The length prints at layout 3 alone
  ([`../grunge/retest-qa-fixes.md`](../grunge/retest-qa-fixes.md) `:833`–`836`).
- Precedents: the reviews hint ("layouts 2, 3 and 4 have no seat for the date", `data.js:2248`–
  `2254`) and pricing's ("layout 2 reads no tags", `:1962`–`1972`) disclose a column in prose.
  `GigsField` and `FormFieldsField` take `design` (`:4256`, `:4260`), and `GigsField` prints a
  design-dependent line (`:3136`) and a layout-3 note (`NO_WEEKDAY_HINT`, `:3106`–`3113`).

**Decision (light).**
- **B (recommended). One clause in the songs hint**: "Layout 3 groups the songs into one set per
  tag and shows each song's length in place of its artist." Plus the mirror: "the other layouts
  show the artist and not the length." The reviews-date precedent; no new mechanism.
- **A′. Pass `design` to `SongsField`** and print one line under the list at layout 3, "Artist is
  not shown in this layout", and the inverse for Length at layouts 1, 2 and 4. `GigsField`'s
  shape, and the closest to what the ticket asks.
- **A. A note under every Artist box.** The literal ask; twelve repeats.

**Expected after-diff.** 0 digest files on every option: the panel alone.

**Verify.** The real app, the repertoire's panel on card 3 and card 1 under all five templates:
the hint (or line) reads right at each layout; nothing else in the panel moves.

**Docs.** `notes/list-editors.md` (the songs field's column reach); on A′, CLAUDE.md's `FIELDS`
paragraph if it states that reach is per field alone.

**Reproduced** (2026-10-06, HEAD `1611a4b`, :5173, puppeteer: Editorial → card 3 → the
repertoire's panel → Publish → Open). On card 3 (*Repertoire layout 3*) the Songs block holds 12
Artist boxes and 12 Length boxes. It has no *Not shown in this layout* line, and its hint ends "…and
shows each song’s length." The published tab prints **0 artists and 12 lengths** at 1440, 768 and
390. On card 1 the tab prints 12 artists at 1440, 6 at 768 and 390 (paged), and 0 lengths. (A text
probe for the seeded artists also matches the title *Dancing Queen* on "Queen", so it is excluded.)
Every evidence line number still held at `1611a4b`.

**Decided** (user, 2026-10-06): **B. One clause in the songs hint, and its mirror.**

**Settled** (2026-10-06).
- **Code**: `FIELDS.repertoire`'s `songs` hint (`data.js:2031`–`2034`) now ends "Layout 3 groups the
  songs into one set per tag and shows each song’s length in place of its artist; the other
  layouts show the artist and not the length." A two-line comment above the field says why the
  hint carries it: `in` is per field, and every layout reads the songs. `SongsField` and its call
  site are untouched, and no column reach was added.
- **After-diff: 0 digest files, by construction.** `f.hint` is read in `EditPanel` alone
  (`EncoreBuilder.jsx:4232`), never by `sectionVm` or `EncoreSection`, so no digest was run.
- **Verified** in the real app (:5173) over Retro, Lime, Grunge, Editorial and Pop, cards 1–4, the
  panel and the published tab at 1440, 768 and 390. In all 20 runs the panel carries the new hint
  alone (no reach line, 12 Artist and 12 Length boxes, the "12 of 60" footnote). Its text grows by
  exactly the clause's 77 characters (Editorial 435 → 512 on card 3, 461 → 538 on card 1), and its
  height by one hint line. The published counts bear the hint out under every template: layout 3
  prints 0 artists and 12 lengths; layout 1 prints 12 artists at 1440 and 6 at 768 and 390; layout 2
  prints 10 and layout 4 prints 12; layouts 1, 2 and 4 print 0 lengths.
- **Docs**: `notes/list-editors.md`'s songs sentence names the hint as the songs' column reach.
  CLAUDE.md is unchanged (B adds no mechanism).

Reply (JP-107): **fixed.** The Songs field's help line in the Repertoire panel now says that
layout 3 shows each song's length in place of its artist, and that the other layouts show the
artist and not the length. The Artist boxes stay editable, so the artists come back if you switch
layouts.

---

## Entry 3 — JP-102: a long hero name is clipped, or hidden under the card

**Verdict: confirmed, in the `s.limeTree` block; named, not fitted, by the display face.**

**Evidence** (`EncoreSection.jsx`).
- `HeaderV2` is at `:3190`; its `if (s.limeTree)` block runs `:3195`–`3545`. The h1 is at `:3372`:
  `<Title s={s} size={s.dispLg} … inline twoTone={grunge}/>`, the flat ramp with no fit, and
  `Title` (`:1235`) has no `overflowWrap`.
- **The column is already bounded by the card.** At desktop and 768, `stack` (`:3391`–`3394`) is
  `flex: 1 1 0; minWidth: 0` beside a `flex: none` card of `u(220)` (`:3452`–`3453`): 894.7 wide at
  desktop, 440 at 768, 350 at 390. `identity` (`:3371`) is `width: 100%`. **The word runs past its
  column**, and the only clip is the well's `overflow: hidden` (`:3508`). Grunge's and Editorial's
  opaque cards paint over the overrun; Lime's glass card shows it through.
- The ramp after `faced()`: Editorial 93.8 / 70.59 / 46.42, Lime 107 / 81 / 54, Grunge 80.25 /
  60.75 / 34.5 (desktop / 768 / 390).
- **1440 is the plain header**, not the composed row: the published 1180–1440 is the same layout
  zoomed, and the canvas desktop is exactly the tab. `live=1` measured identical.
- The shape to copy: `HeaderV1`'s `identity` takes `containerType: 'inline-size'` (`:2676`), and its
  title is `size={s.cardNameEms ? \`min(${s.dispLg}, calc(100cqi / ${s.cardNameEms}))\` :
  s.dispLg}`, unfaced (`:2699`). `vm.cardNameEms` is `EncoreBuilder.jsx:739`, the widest word in
  `navFace` ems (`:713`–`714`); its comment (`:730`–`738`) lists its readers.

**How far the widest word runs past its column** (*Maximilian Featherstonehaugh*, px):

| Theme | Desktop | 768 | 390 |
|---|---|---|---|
| Editorial | +190 | +376.5 | +187 |
| Lime | fits | +92 | +4.6 |
| Grunge | fits | +31.5 | fits |
| Retro | fits | +94 | fits |
| Pop | +11 | +259 | +101 |

That matches the report: at 1440 the word stops 170.5 inside the card (Editorial), at 768 it runs
352.5 under the card and 100.5 past the clip (the H in the 32px between), at 390 176.8 past the
clip. **Retro and Pop are another symptom**: on `main`, Pop's arch 2 is a placeholder rendering
Retro's half, whose stack is `overflow: hidden` (`:3649`), so the word is cut at its column, not run
under the polaroid. Retro has no ems table (`navFace` is null), JP-092's precedent for leaving it.
*Florence and the Machine* and *Supercalifragilistic Expialidocious* behave alike; no word breaks
inside itself, and no page scrolls sideways.

**The seed does not move.** *Kai Mercer* fits at every width under every theme; the tightest is
Editorial at 768, 7.9px to spare. So `min()` resolves to the ramp everywhere, and the container
moves nothing (`identity` is already `width: 100%`). Fitted sizes for the ticket's name under
Editorial: about 77.4 / 38.0 / 30.3; Lime about 67.0 at 768 and 53.3 at 390; Grunge about 56.7 at
768.

**Decision (light).**
- **A (recommended). JP-092's shape in the `limeTree` block**: `identity` (`:3371`) takes
  `containerType: 'inline-size'`, and the title (`:3372`) becomes `s.cardNameEms ?
  min(${s.dispLg}, calc(100cqi / ${s.cardNameEms})) : s.dispLg`, unfaced. The column already ends
  at the card, so this also stops the word running under it at desktop and 768.
- **B. A, plus Retro's half** (`:3654`), guarded the same way: falls through for Retro and fits
  Pop's placeholder now. Low value, since Pop's layout-3 pass replaces that path; recommended to
  name Retro and Pop out of scope instead, as JP-092 did.
- **C. `overflowWrap: 'break-word'`.** Rejected: it breaks the name inside a word, which every name
  fit here avoids (JP-062).

**Expected after-diff.** **0 files**: header `arch 2` × themes 0–4 × three widths × canvas and
`live=1` (themes 0 and 4 the controls).

**Verify.** The `&name=` probe at 360, 390, 414, 768, 1180 and 1440, themes 1–3: the widest word's
right edge ≤ the column's, both surfaces, for *Maximilian Featherstonehaugh*, *Supercalifragilistic
Expialidocious* and *Florence and the Machine*; the h1 never breaks inside a word; no element under
the card. The real app: card 3 under Editorial, Lime and Grunge, the tester's steps.

**Seen, not filed** (stays out of scope; named by [`display-face.md`](./display-face.md) step 5):
the form head breaks FEATHERSTONEHAUGH inside the word at 768 and 360–414 (card 3), and the bio's
name on card 4 at 390 and 414. Name them again in the reply.

**Docs.** The `identity` comment; `vm.cardNameEms`'s reader list (`EncoreBuilder.jsx:730`–`738`); an
*answered* pointer at `display-face.md:851`; `notes/templates.md`'s `HeaderV2` paragraph if it names
the title's ramp. On Pop: name what the Pop layout-3 pass inherits.

**Re-checked** (2026-10-06, HEAD `9185e63`). Every *Evidence* line held to within two: `HeaderV2`
`:3190`, `identity` `:3370`, the h1 `:3372`, `stack` `:3390`, the card `:3444`–`3454`, the well's clip
`:3507`, `Title` `:1235`; `HeaderV1`'s `identity` `:2678` and its title `:2699`; `navFace`
`EncoreBuilder.jsx:713`–`714`, `vm.cardNameEms` `:739` under its comment `:730`–`738`.

**Reproduced** (2026-10-06, HEAD `9185e63`, :5175 serving the clean tree; puppeteer: Editorial →
card 3 → *Title* typed in the header's panel → Publish → Open, the popup at 1440, 768 and 390; each
word's text-node `Range` against the `identity` column's right edge, the card's left edge and the
nearest clipping ancestor). *Maximilian Featherstonehaugh* under Editorial, the h1 at 93.8 / 70.59 /
46.42: at **1440** FEATHERSTONEHAUGH ends 232.2 past its column and 208.1 past the card's left edge
in the zoomed tab, which is **190.3** and **170.6** layout px (zoom 1.22); at **768** it ends 376.5
past the column, **352.5 under the card** and **100.5 past the well's clip** (the H in the gap); at
**390** 186.8 past the column and **176.8 past the clip**. No word breaks inside itself, and no page
scrolls. The editor's 1088 Desktop canvas runs it 282.2 past its 802.7 column and 55.9 past the clip.
Lime runs it 91.9 past at 768 (67.9 under its glass card) and 4.6 past at 390; Grunge 31.5 past at
768 (7.5 under the card). The controls: *Supercalifragilistic Expialidocious* overruns as
*Featherstonehaugh* does (Editorial 211.2 / 363.6 / 178.3 screen px); *Florence and the Machine* and
the seed fit everywhere, the seed's tightest Editorial at 768 (7.9 to spare). No console errors.
**The triage's overrun table, re-taken** in the harness (`&name=`, header `arch 2`, canvas and
`live=1` identical): Editorial +190.2 / +376.5 / +186.8, Lime fits / +91.9 / +4.6, Grunge fits /
+31.5 / fits, Retro fits / +94.0 / fits, Pop +10.9 / +258.8 / +101.0. It is the triage's table to
the pixel.

**Decided** (user, 2026-10-06): **A. JP-092's shape in the `s.limeTree` block.** Retro's half (and
Pop's placeholder, which renders it) is named, not fixed.

**Settled** (2026-10-06).
- **The code.** In `HeaderV2`'s `s.limeTree` block:
  - `identity` takes `containerType: 'inline-size'` at every width (`EncoreSection.jsx:3384`). It is
    `width: 100%` of `stack`, which is `flex: 1 1 0` beside the card at desktop and 768 and
    stretched by the 390 column, so it is parent-sized at all three and the container moves nothing.
  - The h1 is `s.cardNameEms ? min(${s.dispLg}, calc(100cqi / ${s.cardNameEms})) : s.dispLg`
    (`:3385`), passed unfaced, since `Title` applies `faced()`. It wraps between words and shrinks
    only when its widest word would outrun the column, which already ends at the card.
  - A comment over both (`:3370`–`3382`) says why. `vm.cardNameEms`'s reader list
    (`EncoreBuilder.jsx:730`–`739`) now names the h1 beside the card, since "HeaderV2" there meant
    the card's own name. `Title`, the card and Retro's half are untouched.
- **Digest: 0 of 90 on each surface** (header, every arch, themes 0–4, three widths, canvas and
  `live=1`), as named. The harness was proved first: a fresh HEAD worktree on :5174 against the
  unedited tree on :5175 came to 0 of 90 on each surface. **Positive control:** the same digest with
  `&name=Maximilian Featherstonehaugh`, HEAD against the tree, moves **6 of 90** per surface, which
  are exactly the renders the table above overran: Lime 768 and 390, Grunge 768, Editorial at all
  three. Retro and Pop do not move, and nor does any other arch.
- **The 1088 canvas** (the editor's Desktop tab; the column 802.7). The seed keeps the ramp under all
  three (93.8 / 107 / 80.25), MERCER's limit there being far above it. Editorial's *Featherstonehaugh*
  fits at 68.93 and *Supercalifragilistic* at 69.81. Lime and Grunge keep their ramps there for both.
- **The setup modal's card 3** lays the 1180 desktop out and scales it, so its column is 894.7. The
  seed reads 93.8 / 107 / 80.25 there under Editorial / Lime / Grunge, the ramp, the column now
  `inline-size`. The layout picker's thumbnail (the same 1180 layout) was not re-measured: MERCER needs
  about 330 of its ≥ 802 column, so the `min()` cannot bind there.
- **The harness** (themes 1–3, three widths, canvas and `live=1`, the seed and the three names: 72
  renders) and **the published tab** (Editorial, Lime and Grunge card 3, the four names typed in the
  panel, at 360, 390, 414, 768, 1180 and 1440 and the 1088 canvas: 84 renders):
  - **Every computed font-size is `min(ramp, column ÷ ems) × faceK`** to within 0.005px, the column
    read off its computed `width` (unzoomed) and the ems off `data.js`'s tables in `navFace`'s
    shape. A `cqi` resolved against the viewport could not match at both 1180 and 1440 and at 768.
  - The column is `inline-size` in every render; **no word breaks inside itself** (every word's
    `Range` is one rect).
  - **Every word ends inside its column**, Editorial's widest 2.3–9 layout px short (Gloock's table
    runs about 1% wide), Lime's and Grunge's 0.1–3.5 short. So nothing runs **under the card** (at 768
    every word ends 24 or more short of its left edge) and nothing runs **past the well's clip**.
    The header root's and the document's `scrollWidth` equal the width everywhere.
  - Themes 0 and 4 (the controls) render Retro's half unchanged: no container, the ramp.

  | Fitted (px) | 1440 / 1180 | 1088 canvas | 768 | 414 / 390 | 360 |
  |---|---|---|---|---|---|
  | Editorial FEATHERSTONEHAUGH | 76.83 | 68.93 | 37.78 | 30.06 | 27.48 |
  | Editorial SUPERCALIFRAGILISTIC | 77.81 | 69.81 | 38.27 | 30.44 | 27.83 |
  | Lime FEATHERSTONEHAUGH | 107 (ramp) | 107 | 66.49 | 52.89 | 48.35 |
  | Lime SUPERCALIFRAGILISTIC | 107 | 107 | 64.48 | 51.29 | 46.89 |
  | Grunge FEATHERSTONEHAUGH | 80.25 (ramp) | 80.25 | 56.59 | 34.5 (ramp) | 34.5 |
  | Grunge SUPERCALIFRAGILISTIC | 80.25 | 80.25 | 54.09 | 34.5 | 34.5 |

  *Kai Mercer* and *Florence and the Machine* keep the ramp at every width under all three. The 414
  column is 350, as at 390, so the two widths fit alike. **At 768 the fitted word is small** (37.78
  under Editorial against the ramp's 70.59): the 768 column is 440 beside the card, narrower than the
  frame's own name would need for a 17-letter word. That is the fit's rule, as at layout 2 (JP-092's
  768 FEATHERSTONEHAUGH was 33.74).
- **Seen, not filed** (each re-read today on the published tab, Editorial, unchanged by this entry):
  - **The form head on card 3** breaks FEATHERSTONEHAUGH inside the word at 360, 390, 414 and 768,
    and *Supercalifragilistic Expialidocious* breaks both words at 360–414 and SUPERCALIFRAGILISTIC
    at 768. At 1440 neither breaks.
  - **The bio's name on card 4** breaks FEATHERSTONEHAUGH (and SUPERCALIFRAGILISTIC) inside the word
    at 360, 390 and 414. At 768 and 1440 it holds.
  - Neither scrolls the page.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed.
- **Docs.** The comment over `identity` and the h1; the `vm.cardNameEms` comment;
  [`display-face.md`](./display-face.md) `:851` gets the *answered* pointer; `notes/templates.md`'s
  *Inset Hero* clause now says the title is fitted to its column's widest word, as Feature spread's
  is. `notes/nav.md:113` names layout 3's centred **nav** name (its own span), not this h1, so it is
  unchanged. No CLAUDE.md or README line stated the old ramp.
- **What Pop's layout-3 pass inherits.** `pop-layout-3` widens this block to
  `(s.limeTree || s.pop)` ([`../pop/layout-3.md`](../pop/layout-3.md) `:159`). Pop's `navFace` is
  Titan's ems × 0.98, so `s.cardNameEms` is set under Pop and the fit applies to its h1 for free once
  the block is widened. Whichever lands second re-measures Pop's long names at the six widths (the
  probe above), and checks whether Pop's h1 wants `HeaderV1`'s `top: -0.14em` glyph-floor arm, which
  this block does not carry.

---

## Entry 4 — JP-105: *12 mile radius* under 120mi rings

**Verdict: confirmed: one seed, three frames, three values.** Parked for the designer on
2026-09-29 ([`../grunge/layout-4-qa-fixes.md`](../grunge/layout-4-qa-fixes.md) `:2120`–`2123`,
note 10: "left as it is … no ticket reports it … If they confirm 120, changing it moves map
`arch 0`–`2`"). JP-105 is that ticket.

**Evidence.**
- Every template composes the line the same way: `[s.mapBase, \`${s.gigs.length} pins\`,
  s.mapRadius].filter(Boolean).join(' · ')`. Lime, Grunge and Editorial at `EncoreSection.jsx:21547`;
  Retro and Pop at `:21967`, whose comment already quotes the frame's line. `vm.mapBase =
  cv('base', MAP_BASE)`, `vm.mapRadius = cv('radius', MAP_RADIUS)` (`EncoreBuilder.jsx:1782`–
  `1783`). The count is `vm.gigs.length`, the whole list.
- The frames: **"UK · 8 pins · 120 mi radius"** under Editorial at all three widths (`964:68746`,
  `984:16838`, `984:16869`), and Retro, Lime and Grunge at 1440 (`964:68649`, `964:68681`,
  `964:68713`; their 768 and 390 to read in the session).
- The same seed elsewhere: **layout 1** prints *12 Mile Radius* beside the heading (`964:58581`;
  `EncoreSection.jsx:19311`, `:19779`), so the seed is layout 1's frame (which also prints *120 mi
  standard · further on request*, contradicting itself). **Layout 2**'s Max travel cell (`:19918`)
  is *100 mi* in its frame ([`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md) `:935`), with the
  designer already.
- `MAP_RADIUS` (`data.js:1230`); the field (`:2163`–`2165`, `in: [0, 1, 2]`); the "one coverage per
  seeded page" comment (`:1249`–`1250`), which a per-layout seed keeps, since a page shows one
  layout.
- **By design: *8 pins* against our *5 pins*.** The count is the artist's gig list. The frame's 8
  is placeholder text: it draws six rows and five dots, and its chips say 5 Upcoming + 3 Past.

**Decision.**
- **A (recommended). A per-layout seed**, `mapRadiusSeed(d)` in `data.js`: `'120 mi radius'` at
  `d === 2`, `MAP_RADIUS` elsewhere. `mapKickerSeed`'s shape (`data.js:999`): `sectionVm` calls it
  at `:1782`, and `EditPanel`'s chain gets an arm beside `:4208`. The hint at `data.js:2164` names
  the per-layout seed. Each layout then matches its own frame (layout 2's *100 mi* stays with the
  designer).
- **A + D. And `base` at layout 3 seeded `'UK'`** (`mapBaseSeed(d)`, the same shape). Layout 1's
  frame really does print *Based in Manchester*, and Retro put `base` in this line on purpose
  ([`../retro/layout-3.md`](../retro/layout-3.md) `:959`), so *UK* is a per-layout seed choice,
  not a bug.
- **B. Change the global seed.** Moves layout 1 off its own frame and leaves layout 2's *100 mi*.
  Not recommended.
- **C. Derive it from the outermost ring.** Ties two fields; a typed Coverage would stop showing.
  Rejected.

**Expected after-diff** (A). Map `arch 2` × themes 0–4 × three widths × both surfaces, **30 files,
text only**, except where the line's width changes a wrap. *120 mi radius* is a character shorter
than *12 mile radius*, so the 768 data bar that wraps under Lime and Grunge
([`../lime/layout-3.md`](../lime/layout-3.md) `:966`, [`../grunge/layout-3.md`](../grunge/layout-3.md)
`:1275`) may stop wrapping and move the panel's height; with D it almost certainly does. Name it
before writing code. The field's `in` is unchanged, so no `reach.mjs` run is owed (on D, `base`'s
neither).

**Verify.** `textContent` of the line beside the digest (the digest's text column is 40
characters); the panel's typed Coverage still wins at every layout; layout 1 and 2 renders do not
move (map `arch 0` and `1`, 0 files).

**Docs.** The `MAP_RADIUS` comment; the hint; `notes/map.md`; an *answered* pointer at
`../grunge/layout-4-qa-fixes.md:2120` and its designer note 10.

---

## Entry 5 — JP-104 (code)

**Decided in entry 1: D** (user, 2026-10-06). One row at every width, and the title wraps to at
most two lines.

**Code.** In the `s.limeTree` repertoire block (`EncoreSection.jsx`, `const stack = tab` at
`:13594`, the row at `:13618`–`13633` at triage; re-check):
- the row goes back to the frame's one row at 768: `stack` is dropped, or held `false`, which
  leaves the desktop and 390 branches as they are;
- the length is `flex: none` on the right, and the title is `flex: 1 1 0; minWidth: 0`;
- the title becomes `display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2,
  overflow: 'hidden'` (the shape at `:8807`), in place of `nowrap` + ellipsis. It never breaks
  inside a word: no `overflowWrap` is added.

Clamp at desktop and 390 too, or only at 768? Every seeded title is one line at desktop and 390, so
either way moves nothing on the seed. Clamping at every width is the simpler rule, and it lets a
long typed title wrap rather than ellipsise there too. Decide in the session, and name the choice.
The pinned 62.5 row holds two lines of 22.8 (Editorial), so check the row's alignment of a
one-line title (centred, as now) against a two-line one.

**Expected after-diff** (name it again before writing code): repertoire `arch 2` × themes 1–3 ×
768 × canvas and `live=1` = **6 files**, the rows' inner geometry only, with no root height moved.
Themes 0 and 4, desktop and 390: 0 files. If the clamp is taken at every width, desktop and 390
still move 0 on the seed.

**Verify.** Every seeded title at 744, 768 and 820 under themes 1–3, both surfaces:
- no title is cut inside a word, and no text ends in an ellipsis. *Don't Stop Me Now* is whole
  on two lines under Editorial;
- the length is on the title's first line, on the right;
- the 62.5 row is pinned, and no section height moves.

Then `&cj=` with a single word wider than ≈ 138.7 (it is cut at its second line, as named) and a
three-line title (clamped at two). The *View full set* reveal and the 390 carousel are unchanged
(JP-075). In the real app, card 3 under Editorial, Lime and Grunge, the tester's steps at 768.
Name Pop's inheritance: the `pop-layout-3` branch widens this block to `(s.limeTree || s.pop)`,
so Pop's Titan titles get the clamp. Whichever lands second re-measures Pop's widest word against
its row.

**Docs.** The comment at `:13583`. *Reversed* pointers at `../lime/retest-qa-fixes.md:179`
(JP-044), `../grunge/retest-qa-fixes.md:821` (JP-066), `display-face.md:616` and
[`layout-3.md`](./layout-3.md) `:1339`. `notes/list-editors.md:34`: "at 768 it stands under the
title, JP-044's stack" becomes the wrap.

Reply (JP-104): **fixed.** At tablet width the song's length now stands on the same line as its
title, on the right, as in the design. A long title wraps onto a second line instead of being cut,
so *Don't Stop Me Now* now shows in full under Editorial.

---

## Entry 6 — JP-103: Repertoire → Gallery 97, Gallery → Pricing 100

**Verdict: confirmed, `s.limeTree`.** Both sides of the gallery's taupe band keep the default
`padY` at desktop, where the frames pad 56.

**Evidence.**
- The default `padY` is 80 on the canvas, 97.6 in the tab (`EncoreBuilder.jsx:97`). At layout 3 at
  desktop, the repertoire has no arm (80 / 80), and the gallery has none either. Pricing's arm
  (`:558`–`561`) sets only its foot (`round(32 × 0.82)` at desktop and 768). The form and
  testimonials arm is `:579`–`586`, and the bio / media / calendar arm `:544`–`552`. None covers
  Retro or Pop.
- **The frame** (`964:68717`, sections edge to edge): repertoire y 3315, 621 tall, insets 56 / 56;
  gallery 3936, 789, 56 / 56 (a full-width Scheme 2 band, so its edges are the gap's edges);
  pricing 4725, top inset 56. Rendered 1:1: cards end 3880, band 3936 (**56**); band ends 4725,
  the *Pricing* glyph 4785 (**60**). Lime's `964:68653` and Grunge's `964:68685` have the same
  heights, and Lime's gallery reads 56 / 56.
- **The build** (published 1440): Editorial 98 and 102; Lime 97 and 102; Grunge 97 and 104. The
  repertoire's foot and pricing's top are each `padY` 97.6 where the frame's are 56.
- **Why tablet and mobile match**: the narrow page stands the calendar between the repertoire and
  the gallery (`PAGE_ORDERS[2]`), so the first gap does not exist there; at 768 `padY` is 56
  against the frames' 60; at 390 it is 44 against 60, tighter, unreported.

**Decision.** None. **A**: a desktop-only arm at `d === 2` for Lime, Grunge and Editorial: the
repertoire's foot `round(56 × 0.82)` = 46, and pricing's arm (`:558`) widened to put 46 on its
desktop top. The repertoire's top stays `padY`: the media feet (20 / 34 / 26, `:535`–`540`) were
tuned against it. The gallery needs nothing, its band starting at its root's edge (to confirm in
the session: the band is the root's background, not an inner box). *Not* a full JP-094 table for
every width: tablet and mobile were reported as matching, and moving them is its own call.

**Expected after-diff** (themes 0–4, `WIDTHS=desktop`, canvas and `live=1`): `repertoire arch=2`
root height −34, nothing inside moves; `pricing arch=2` root −34, every row inside 34 up; themes 1–3
alone, so **12 files**; nothing at tablet or mobile, under themes 0 or 4, or at any other arch.

**Verify.** The published 1440 tab: repertoire → band ≈ 56, band → *Pricing* glyph ≈ 60, under all
three templates; the composed row above is unchanged (the repertoire stands after the columns at
desktop, `pageRows`).

**Docs.** The arm's comment, in the shape of its neighbours (frames, numbers, the call);
[`layout-3.md`](./layout-3.md)'s sections 4 and 7 *Settled* (a pointer); `notes/` none.

---

## Entry 7 — JP-106 (code)

**Decided in entry 1: Q1 A, Q2 no pill on the canvas** (user, 2026-10-06). The ↗ is a reply,
already written under *Replies*.

**Code** (line numbers re-checked at `2358a6f`):
- **`sectionVm`**: `vm.gigs[].status` beside `weekday` (`EncoreBuilder.jsx:1685`). It is
  `'upcoming' | 'past' | ''`. It is `''` unless `live` and `today` parse (the calendar's rule,
  `:1378`), and `''` where `gigWeekday()` refuses the date. Otherwise the gig's
  `Date.UTC(y, m, d)` is compared with today's, through `Date.UTC`. **Decide in the session, and
  name it, whether a gig dated today is *Upcoming*.** It should be: the night has not happened.
  The date parse wants a helper in `data.js` beside `gigWeekday()` (`data.js:2759`) that returns
  the UTC stamp both can share, so the month and year rules are one rule.
- **The pill**, in both layout-3 bodies, in the seat beside *Tickets →*: the `s.limeTree` block
  (after `litRow`, `EncoreSection.jsx:21101`; its *Tickets →* at `:21326`), and Retro's and Pop's
  body (*Tickets →* at `:21717`). It reads `vm.gigs[].status` and draws nothing on `''`. Its
  words are literals (*Upcoming* / *Past*), cased per template. Whether they want fields is the
  JP-071 / JP-090 question: no ticket asks for one, so they stay literals, and that is named.
- **The seed**: `GIGS`' five `year: '2025'` (`data.js:1221`–`1225`) become `'2031'`, and the
  comment at `:1217`–`1219` says why (2031 has 2025's calendar, so the frames' weekdays hold).
- **`GigsField`**: its hint names the year's second use (the published tab's Upcoming / Past).
  `NO_WEEKDAY_HINT` (`EncoreBuilder.jsx:3023`) covers a refused date for the pill too, if it is
  reworded to say so.

**Read first**: [`layout-3.md`](./layout-3.md) section 8's *Settled* and the twins'. The pill's
fill, ring and type are the frame's (`964:68746`: its featured row's pill filled, the others
outlined), per template, at all three widths. Retro's frame is `964:68649`.

**Expected after-diff** (name it again before writing code):
- map `arch 2` × themes 0–4 × three widths × **`live=1` with a pinned `&today=`** = about 15
  files, the rows' geometry at 768 and 390 where the pill brings back the frame's venue wrap and
  its 390 second line;
- the canvas: **0 files** (Q2);
- `live=1` without `&today=`: 0 files, since `status` is `''` with no date;
- the seed's year: 0 files, because the weekday is unchanged and the year prints nowhere.

**Verify.** A pinned `&today=` before every seeded date (five *Upcoming*), between two (mixed),
after all of them (five *Past*), and on a gig's own day. Then `&cj=` with a row with no year, a
refused date (31 Jun), a two-digit year, and a past row. The 768 and 390 row heights against the
frames' (section 858 at 768; the 390 row 123). The city chips, the pager, the lit row and *See all
gigs* still work. In the real app, card 3 under Editorial, Lime, Grunge and Retro, published: every
seeded row reads *Upcoming*, and the canvas draws no pill.

**Docs.**
- `notes/map.md:44`–`45`: the status is drawn now, on the published page only.
- `notes/map.md:55`–`57`: the ↗ stays dropped.
- *Reversed* pointers at `../lime/retest-qa-fixes.md:568` (JP-047's premise, not its chips: the
  chips stay cities) and [`layout-3.md`](./layout-3.md) `:1746` (the rows' one-line call).
- The `GIGS` comment, and CLAUDE.md's `s.live` list: the map's pill is a read of `live`, so it
  joins the map's entry, and the count of things that read `live` is re-checked.

Reply (JP-106, the pill): **fixed.** On the published page each gig row in layout 3 now carries
an *Upcoming* or *Past* pill, worked out from the gig's date against today. The editor's preview
shows none, since it has no "today" (the booking calendar's rule). The sample gigs are dated so
they read *Upcoming*. A gig with no year, or with a date that does not exist, gets no pill.

---

## Entry 8 — the end-of-pass sweep

As [`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md)'s: the digest against `main` (themes 0–4,
three widths, both surfaces, `&column=right`, `&today=` pinned for the map) equals exactly the union
of the named after-diffs; `reach.mjs` where a field moved; the real app on card 3 under all five
templates; the root `index.html` refreshed (`cp source/dist-standalone/index.html index.html`);
the README row; a reply line per ticket; the designer's note (JP-105's *100 mi* at layout 2, if it
is still open).

## Replies

Written as each entry settles.

- **JP-106 (the ↗) — by design** (entry 1, user, 2026-10-06). Layout 3 leaves out the design's
  second ↗ beside the venue on purpose. It would point to the same ticket address that *Tickets →*
  already links, so the row would carry one link twice. This is a separate call from JP-047's city
  filters. A gig with a ticket link shows *Tickets →*; the sample gigs have none, so neither
  appears out of the box. The Upcoming / Past pill is fixed under entry 7.
- **JP-107 (the songs' Artist at layout 3) — fixed** (entry 2). The Songs help line in the
  Repertoire panel now says that layout 3 shows each song's length in place of its artist, and
  that the other layouts show the artist and not the length.
- **JP-102 (a long hero name on Inset Hero) — fixed** (entry 3). The name in the hero now wraps
  between words and shrinks only when its longest word would not fit beside the portrait card, so
  *Maximilian Featherstonehaugh* fits at every width, stops before the card at 1440 and 768, and is no
  longer cut at 390. The same fix applies to Lime and Grunge. Shorter names, such as *Kai Mercer* and
  *Florence and the Machine*, keep their full size. Two other places on these pages still break a
  very long word inside itself, and are not part of this ticket: the enquiry form's heading on
  layout 3 at tablet and phone widths, and the bio's name on layout 4 at phone width.
- **JP-103 (Enquiry → Testimonials) — matches the design** (entry 1, user, 2026-10-06). The two
  figures were taken from different edges. The design's 61 runs from the form block's own bottom
  edge, which is invisible, to *● Testimonials*: ours is 57. The 156 runs from the left column's
  last line to the label: the design's is 155, ours 150. From the dashed card's foot it is 166 in
  the design and 206 on the page. That is because the default heading, *Book Kai Mercer for your
  event*, runs one line longer than the design's *Book Kai for your event*. The design centres the
  card on the heading column, so a longer name lifts the card. The other two gaps in this ticket
  (Repertoire → Gallery, Gallery → Pricing) are real and are fixed under entry 6.

## Notes for the designer

Written as each entry settles.
