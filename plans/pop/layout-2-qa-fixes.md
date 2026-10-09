# Pop layout-2 QA fixes — bug-by-bug plan

Working checklist for the tester's batch against the **Pop template, layout 2** (card 2 of the setup
modal, *Feature spread*): JP-121 … JP-124. It works like [`qa-fixes.md`](./qa-fixes.md), Pop's first
batch, against layout 1: **one entry per session, with context cleared between sessions**, and each
session writes what it settled back into this file.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then *How each
session runs* in [`qa-fixes.md`](./qa-fixes.md) (`:191`) and the files its read-first line points at
(the recipe in [`../grunge/layout-3-qa-fixes.md`](../grunge/layout-3-qa-fixes.md), the deltas in
[`../editorial/layout-2-qa-fixes.md`](../editorial/layout-2-qa-fixes.md) and
[`../editorial/layout-3-qa-fixes.md`](../editorial/layout-3-qa-fixes.md), and *Verification harness*
in [`../retro/qa-fixes.md`](../retro/qa-fixes.md)). Then read the memory notes
`verifying-the-published-tab` and `browser-tool-choice`, plus `figma-frame-reading` for any entry
that reads a frame. Then read the section's `notes/` file, which each entry names, and **the call
each ticket reverses**, read whole. [`layout-2.md`](./layout-2.md) holds the Figma node ids of every
Pop layout-2 frame (*The Figma source* and *The sections*, `:151`–`:228`; the page is `964:64560` /
`986:17562` / `986:17581`), and its *Settled in section N* bullets are the fits each entry moves. The
footer is layout 1's (`layout-1.md`, the footer's *Settled*; frames `964:58634` / `986:52430` /
`986:52442`, and layout 2's page carries the same instance as `964:64578` / `986:17580` /
`986:17599`).

The shapes the entries copy:
- **JP-101** in [`../editorial/retest-qa-fixes.md`](../editorial/retest-qa-fixes.md) (`:472`): at 390
  the layout-1 and layout-4 capsule's name gives way to the pill — one line at its size while it
  fits, else two balanced lines at the size the longer fits, a 12 floor, a third line below it, and
  the widest word (`navNameFit.word`) under the floor. `notes/nav.md:106` states it. This is JP-121's
  shape.
- **JP-092 (rest)** in the same file (`:325`): the footer's 150 rule yields to a long name down to a
  30 floor, and past it the name wraps between words, in both footer trees. JP-122 (b) takes the
  rule one step further: the measure is the column less the seal.
- **JP-113** in [`qa-fixes.md`](./qa-fixes.md) (`:644`), after **JP-120 (form)** (`notes/form.md:82`):
  a 390 row that wraps for a long name rather than running under its neighbour. JP-122 (a)'s shape.
- **JP-105** in [`../editorial/layout-3-qa-fixes.md`](../editorial/layout-3-qa-fixes.md) (`:668`): a
  per-layout seed, `mapRadiusSeed(d)` in `data.js`, called by `sectionVm` and `EditPanel`'s chain
  alike. JP-124 is its layout-2 arm.
- **JP-052** in [`../lime/layout-4-qa-fixes.md`](../lime/layout-4-qa-fixes.md) (`:365`; Settled
  `:477`–`:525`): `SlotsField`, the seed as day offsets, and `slotsVal` writing the canvas's dates out
  on the first edit. JP-123 reopens that last clause. **BookedField** (`EncoreBuilder.jsx:3862`), the
  one panel field that reads today, is its precedent for a panel that knows the date.

Branch: **`pop-layout-2-qa-fixes`, forked from `main`** (`d36797f`, after PR #56). One commit per
entry (`Fix JP-124: …`). A decision-only entry commits the plan alone.

**Build and reproduction.** None of the reports names a build. At triage (2026-10-09) the deployed
Pages build read `Thu, 08 Oct 2026 20:39:30 GMT`, 9,910,327 bytes. That is byte-identical in size to
`main`'s root `index.html` (`a6e3d3a`, the Pop QA refresh), so the tickets were filed against PR #56's
build, and every cause is in HEAD's code (below). That build prints `© 2026` (JP-118); the tester's
*C 2026* in JP-122 quotes the frame.

**Reproduced in the harness at triage** (2026-10-09, `d36797f`, the user's dev server on :5173; a
puppeteer probe in the session's scratchpad, `live=1`, 390, themes 0–4, `&name=` over *Kai Mercer*,
*Florence and the Machine* and *Maximilian Featherstonehaugh*). JP-121's and JP-122's Pop rows match
the tester's numbers to the pixel. Nothing was reproduced in the real app, at 360 or 414, or for
JP-123 and JP-124, whose causes are read off the code. One Figma read (`get_metadata` on
`986:17577`, the 768 map) gave JP-124's frame facts.

**Pop is in `s.limeTree`** since the layout-4 sweep folded the pair (`0a5fe0b`), so every Lime
layout-2 block is Pop's too. A seam here is one of four kinds:
- a `pop &&` arm inside a shared block, where Pop moves and themes 1–3 are controls (JP-122 (a));
- the shared `s.limeTree` block, where themes 1–4 move and Retro is the control (JP-121);
- both bodies, the `s.limeTree` block and Retro's, where every template moves (JP-122 (b) on scope
  A, JP-123's look on the Lime tree with Retro already dimming);
- `data.js`, `sectionVm` or `EditPanel`, which every template reads (JP-123's data, JP-124).

`digest.mjs`'s default theme list is `0,2,3,4`, which **skips Lime**, so always pass `0,1,2,3,4`.

| ID | Where the cause sits | Templates | Digest themes |
|---|---|---|---|
| JP-121 | `HeaderV1`'s `s.limeTree` nav row at 390: the name is `flex: 'none'` in `labelStyle`'s `nowrap` with no fit, the burger's cell may collapse under it (`minWidth: 0`), and the pill's cell holds the pill whole, so the name pushes it off the page | reproduces under Pop and Editorial; Lime and Grunge fit the set by size alone; Retro's own bar pushes its pill (426) | 0–4, plus `&name=` |
| JP-122 (a) | the footer's `s.limeTree` block, Pop's `popEnd` small-print row at 390: no room kept for the corner sun | Pop alone, every page (one footer design) | 0–4 and `page=2`, plus `&name=` |
| JP-122 (b) | the same block's 390 wordmark row, and Retro's: the name's measure is the column, and the seal stands over the row's right end | reproduces under Pop, Editorial and Retro; Lime and Grunge fit the set | 0–4 and `page=2`, plus `&name=` |
| JP-123 | `slotsVal` (`EditPanel`) dates the seed from the canvas's `open`, 2025-06-12, and `SlotsField` writes the whole array on the first keystroke; under the Lime tree a past row keeps full ink (user call, 2026-09-17) | every template (the data and the panel); the look under Lime, Grunge, Editorial and Pop | 0–4 `live=1`, plus `&today=` and `&cj=` |
| JP-124 | `mapRadiusSeed(d)`: only `d === 2` takes its frames' value, so layout 2 seeds `MAP_RADIUS`, *12 mile radius* | every template | 0–4 |

## The report (translated)

> **JP-121 — Mobile: a long name in the header's logo runs onto the burger, and BOOK NOW goes past
> the screen's edge.** Severity: Medium (proposed). Steps: Pop → Feature spread → Header → Title =
> *Florence and the Machine* (or *Maximilian Featherstonehaugh*) → Publish → Open at 390. Expected:
> the logo stands between the burger and BOOK NOW, as KAI MERCER does in frame `986-17581`. Actual:
> the logo's text neither wraps nor shrinks. *Florence…* starts at x 41, and the burger takes x
> 20–82, so the text lies on the burger. With *Maximilian…* the logo takes x 36–284 and BOOK NOW is
> pushed to x 300–410, its arrow cut off by the edge. Falsifying checks: *Kai Mercer* at 390 renders
> fine; at 768 and 1440 the long name renders fine; on Pop layout 1 the logo wraps onto two lines.
> So the bug is Header layout 2 at 390 alone. Note: you accepted the same symptom on Editorial
> layout 2 on 07.10 as a remainder of JP-101. This is another template, so I am showing it, but the
> call is yours: file it as a bug, or accept it as there. Screenshot:
> `JP-121-pop-layout2-mobile-header-long-name-over-burger.jpg`.
>
> **JP-122 — Mobile: in the footer, a long name puts the copyright under the lime starburst and the
> logo under the seal.** Severity: Medium (proposed). Steps: Title = *Florence and the Machine* →
> Publish → Open at 390 → scroll to the foot of the footer. Expected: the row *C 2026 KAI MERCER   A
> JUSTPAY PRODUCT* stands to the right of the starburst, as in `986-17581`. Actual: the copyright
> wraps onto two lines, starts at x 10 and runs under the starburst, which takes x −104…94. The
> line's start (*C 20…*) is covered. With *Maximilian Featherstonehaugh* the footer's logo also runs
> under the seal: at a point at the logo's end, the topmost element is the seal's text. Falsifying
> checks: with *Kai Mercer* the copyright starts at x 79 and covers nothing. On Pop · Hero at 390
> with *Florence* the copyright hides under the starburst the same way. So the problem is in the
> whole Pop template's footer, not layout 2's alone. Not checked: 360 and 414. Screenshot:
> `JP-122-pop-mobile-footer-long-name-under-starburst-and-seal.jpg`.
>
> **JP-123 — Booking Calendar layout 2: changing the text in a date row moves every date into 2025,
> and none can be picked.** Severity: Major (proposed; the final call is yours). The visitor sees
> four "available" dates from the past, with no warning in the editor or on the page. Steps: Pop →
> Feature spread → Publish → Open at 1440. The calendar shows OCT 08 / OCT 10 / OCT 16 / OCT 31
> (2026), so the dates count from today. Booking Calendar → Dates on offer → row 1: change *Evening*
> to *Late set*. Publish → Open. Expected: the dates still count from today. The hint on *Opens on*
> says so: "layout 2's seeded dates count from it until you edit them". I did not change the dates
> themselves. Actual: JUN 12 / JUN 14 / JUN 20 / JUL 05 of 2025 (JUN 12 is a Thursday, so 2025). A
> real click on a row does nothing, and the foot stays *Pick a date to enquire*. Putting *Evening*
> back leaves the dates in 2025. Falsifying checks: changing only the Heading keeps the October
> dates; changing only the price line (*From £1,200* → *From £1,300*) moves them to 2025. So any
> text change inside a *Dates on offer* row triggers it. Scope: the published page at 1440, one
> browser, one template. Most likely the cause is in layout 2's calendar itself and every template
> has it, but I did not check the others. Screenshot:
> `JP-123-booking-calendar-layout2-slot-edit-freezes-past-dates.jpg`.
>
> **JP-124 — Events Map layout 2: the default *12 mile radius*.** The same page says *120 mi
> standard travel radius* (the header's card) and *120 mi standard* (the line under the map). It is
> the same bug as JP-105, on layout 2: JP-105's fix touched layout 3 alone. At 768 *12 mile radius*
> fills its whole column and runs right up against the next column's *~2 hrs*. The design has a
> short *100 mi* there. Screenshot: `JP-124-events-map-layout2-default-12-mile-radius.jpg`.

Screenshots (the tester's):
- `986-17581`'s 390 header with *KAI MERCER* centred between the burger and BOOK NOW, beside the
  published 390 with *Florence and the Machine* (FLO… on the burger) and *Maximilian
  Featherstonehaugh* (MAX… on the burger, BOOK NOW cut at the edge).
- The 390 footer: the frame's top (the wordmark, the rule into the seal) and foot (*C 2026 KAI
  MERCER   A JUSTPAY PRODUCT* right of the starburst), beside the build's with *MAXIMILIAN
  FEATHERSTONEHAU* under the seal and the copyright wrapped under the starburst.
- The published 1440 calendar before (OCT 08 … OCT 31) and after the edit (JUN 12 … JUL 05, *Late
  set* boxed).
- `986-17562`'s 768 travel card (*100 mi*) beside the build's (*12 mile radius* against *~2 hrs*).

## Status

| Order | ID | Report (short) | Verdict | Size | Decision | Status |
|---|---|---|---|---|---|---|
| 1 | JP-124 | *12 mile radius* at layout 2 | **Confirmed, and recorded**: JP-105 kept layouts 1 and 2 on `MAP_RADIUS` on purpose, layout 2's *100 mi* parked for the designer; the frame itself says 100 once and 120 three times | S | **user**: *120 mi* or *100 mi*. **Decided A, *120 mi*** (2026-10-09) | **done** (30 of 660 + 30 of 660, the named set; Retro's 768 card 22.5 shorter) |
| 2 | JP-121 | 390: a long name over the burger, the pill off the page | **Confirmed, shared, and named** (Editorial retest's *Seen at triage, not filed*, `:1104`–`:1111`): the layout-2 bar's 390 name has no fit; Editorial reproduces it too | S–M | **user**: fix or accept, the scope, the room | open |
| 3 | JP-122 | 390 footer: the copyright under the sun, the name under the seal | **Confirmed, two faults**: (a) Pop's small print keeps no corner for the sun; (b) the wordmark's measure ignores the seal, under Pop, Editorial and Retro | S–M | **user**: (b)'s scope, (a)'s shape | open |
| 4 | JP-123 | an edited slot row freezes the dates in 2025 | **Confirmed, every template, and recorded twice**: the first-edit write-out (JP-052) and the full-ink past row (2026-09-17), whose own comment states a premise JP-052 retired | M | **user**: four questions | open |
| 5 | — | End-of-pass sweep | — | S | — | open |

**Why this order:**
- **By footprint, smallest first.** JP-124 is one arm in `mapRadiusSeed` with a named text diff.
  JP-121 and JP-122 are long-name fits whose seed diff should be zero; JP-121 runs first because it
  reads JP-101's machinery (`fitName`, `vm.navNameFit`), which JP-122 does not.
- **JP-123 last, though it is the batch's Major.** It carries the most decisions and the only data
  change (a slot row's shape, `SLOT_KEYS`, the panel), and no other entry waits on it. Nothing
  depends on the order, so if the user wants the Major first, it runs first.

**"Decision"** means the entry lists options with a recommendation. The session starts by asking
the user (one `AskUserQuestion`, up to four questions of up to four options) and records the answer
under **Decided** before writing code.

## How each session runs

As [`qa-fixes.md`](./qa-fixes.md)'s *How each session runs* (`:191`), with these differences:

1. The *Evidence* line numbers are from the triage (2026-10-09, `d36797f`). Re-check them.
2. **Reproduce first**, on HEAD, in the real app: Pop **card 2**, the tester's steps, Publish,
   Open, at 1440, 768 and 390, and for the 390 tickets at **360 and 414** too (the tester did not
   check them). Then the harness at the ticket's width. The triage probe's numbers are below; take
   them again.
3. **Layout 2 has no composed page**, so there is no `&column=` surface. The published desktop lays
   out at 1180 and zooms (`min(w, 1440) / 1180`), and the editor's Desktop canvas is 1088 in a 1440
   window. None of these tickets is desktop-only, but JP-123 is reported at 1440 and JP-124 reads
   all three widths.
4. **Long names go through `&name=`** in the harness, and through the fiber `st` dispatch in the real
   app (`browser-tool-choice`). The set: *Kai Mercer* (the seed); *Florence and the Machine* and
   *The Chemical Brothers* (several words); *Maximilian Featherstonehaugh* (one long word);
   *Supercalifragilistic* (a single word).
5. **An entry that reverses a recorded call** (JP-121, JP-122, JP-123, JP-124) adds a *reversed*
   or *answered* pointer where the call was recorded, and rewrites any CLAUDE.md, README or `notes/`
   line that states the old call as a rule. Each entry's *Docs* names the sites.
6. **The real app is Pop card 2.** Add Lime's, Grunge's and Editorial's card 2 for every entry that
   moves the shared block or the data (all four), and Retro's card 2 for every entry that reaches its
   body or the data (JP-122 (b) on scope A, JP-123, JP-124). **The footer has one design**, so JP-122
   also walks Pop card 1 (the tester's *Hero* check) and one more card.
7. **Pop's layout-2 frames are bound** (`layout-2.md`, *Pop's layout-2 mode*): the variable tools
   answer Pop's values, and a raw hex is a leak. The footer's frames are layout 1's, **unbound**
   (`layout-1.md`), so read their nodes' own `fills`, `fontName` and `absoluteRenderBounds`.
8. **The harness renders 390 at mobile and no other narrow width.** 360 and 414 are the published
   tab's, resized (`verifying-the-published-tab`).

**Do not refresh the root `index.html` per entry.** The sweep does it once.

---

## JP-124 — layout 2's Max travel seeds *12 mile radius*

**Verdict: confirmed, and recorded.** JP-105 (user call, 2026-10-06) gave the map's `radius` a
per-layout seed, `mapRadiusSeed(d)`, and took layout 3 to its frames' *120 mi radius*. It left
layouts 1 and 2 on `MAP_RADIUS` on purpose: "layout 1's frame prints *12 Mile Radius* beside its
heading, and layout 2's *100 mi* is with the designer" (`notes/map.md:173`–`:184`; the `data.js`
comment at `:1270`–`:1276`). This is the ticket that waited.

**The frame contradicts itself, so the value is a call.** Read at triage (`get_metadata`, Pop's 768
map `986:17577`):
- the travel card's *Max travel* cell types **100 mi** (`I986:17577;861:11188`);
- the map's *Footer Data Bar* types **UK · 8 pins · 120 mi radius** (`I986:17577;861:11283`), and
  its rings are 30mi / 60mi / **120mi**.

The seeded layout-2 page makes three more coverage claims, each a frame's own bytes:
- the header's place card, *Available across the UK · 120 mi standard travel radius.* (`PLACE_BODY`,
  `data.js:985`; JP-059);
- the line under the map, *120 mi standard · further on request · 5 pins* (`MAP_TERMS`, `:1281`,
  printed at layout 2 in both bodies, `EncoreSection.jsx:21349`, `:21789`);
- the form's third promise, *Covers 120 mi from Manchester* (`FORM_PROMISES`, `:1321`; the session
  confirms layout 2's form prints it).

So the seeded page says 120 in three places and *12 mile radius* in one, and the frame says 120 in
two and 100 in one. The stat row's own comment (`data.js:1296`–`:1303`) already argues against two
coverages on one page: "Max travel … is MAP_RADIUS rather than a field of its own, so a seeded page
cannot claim two different coverages".

**The 768 touch.** The three stat cells are fixed thirds (100.67 in the frame, `I986:17577;861:11186`
on). *12 mile radius* in the value's type fills its third; *100 mi* and *120 mi* are under half of
it. The session reads the cell's width and whether it wraps under each template on HEAD before
naming the diff.

**Evidence.**
- `data.js:1270`–`:1279`: `MAP_RADIUS`, `MAP_RADIUS_3`, `mapRadiusSeed`.
- `data.js:2232`–`:2235`: the `radius` field, *Coverage*, `in: [0, 1, 2]`, and its hint naming
  layout 3's seed.
- `EncoreBuilder.jsx:1906`–`:1907`: `vm.mapRadius = cv('radius', mapRadiusSeed(d))`.
- `EncoreBuilder.jsx:4340`: `EditPanel`'s chain arm, gated on `map`.
- `EncoreSection.jsx:20818`: the stats array `{ k: 'radius', l: s.mapRadiusLabel, v: s.mapRadius }`,
  shared by both bodies.
- [`../grunge/layout-4-qa-fixes.md`](../grunge/layout-4-qa-fixes.md) `:2120`–`:2127` (the follow-up
  and designer note 10) and [`../editorial/layout-2-qa-fixes.md`](../editorial/layout-2-qa-fixes.md)
  `:935` (the unfiled seat on JP-096's screenshot).

**Decision.**
- **A (recommended). *120 mi* at layout 2**: `MAP_RADIUS_2 = '120 mi'`, and `mapRadiusSeed` returns
  it at `d === 1`. It agrees with the rest of the seeded page and with the frame's own data bar and
  rings, and it is as short as the frame's *100 mi*, so the 768 cell clears *~2 hrs*. The designer
  is told the cell's 100 contradicts the frame's 120s.
- **B. *100 mi* at layout 2**, the cell's own bytes: JP-105's rule, each layout its own frame. The
  page then claims 120 in three places and 100 in one, which is the tester's complaint, smaller.
- **C. One seed at every layout, layout 1 included.** Not recommended: layout 1's frame prints *12
  Mile Radius* beside its heading, and nobody reported it. Layout 1's own contradiction (its frame
  also prints *120 mi standard · further on request*) goes in the designer note.

**Expected after-diff (named before the code).** Map `arch 1` × themes 0–4 × three widths × both
surfaces, 30 files: the Max travel value's text and width. Where *12 mile radius* wraps in its third
on HEAD (the session reads it first), the stat row's height drops and every row under it moves; name
those files by template and width before the code. Map `arch 0`, `2` and `3`: 0.

**Verify.**
- The digest as named, with `textContent` beside it (the digest's text column cuts at 40).
- A typed Coverage still wins at layouts 1, 2 and 3 (`&cj={"radius":"ZQ coverage"}`), and emptied it
  behaves as on HEAD at each.
- In the real app on card 2 under all five templates: the panel's *Coverage* reads the seed, and at
  768 the value's `Range` ends short of *~2 hrs*' by at least the cells' gap. Cards 1 and 3 keep
  theirs.

**Docs.** The `MAP_RADIUS` comment (`:1270`) and the stat-row comment (`:1296`); the field's hint;
`notes/map.md`'s JP-105 bullet; *answered* pointers at `../grunge/layout-4-qa-fixes.md:2120` (layout
2 now) and at JP-105's Settled in `../editorial/layout-3-qa-fixes.md` ("layouts 1 and 2 stay open").
A designer note.

**Re-checked** (2026-10-09, HEAD `41425f3`). Every *Evidence* line holds as the triage gave it:
`MAP_RADIUS` / `MAP_RADIUS_3` / `mapRadiusSeed` at `data.js:1277`–`:1279` under the comment at
`:1270`–`:1276`; the stat-row comment `:1296`–`:1303`; the field `:2232` (`in: [0, 1, 2]`), its hint
`:2233`–`:2235`; `vm.mapRadius` `EncoreBuilder.jsx:1907`; the chain arm `:4340`; the stats array
`EncoreSection.jsx:20818`, drawn at `:21038` (the `s.limeTree` block, `row(0, …)`) and `:21472`
(Retro's body, `row(u(18), …)`). `PLACE_BODY` `data.js:985`, `MAP_TERMS` `:1281` (printed at
`EncoreSection.jsx:21349` and `:21789`), `FORM_PROMISES` `:1321`.

**Reproduced** (2026-10-09, a HEAD worktree on :5174; puppeteer from the scratchpad: template → card
2 → *Back to page list* → Events Map → Publish → Open, the tab at 1440, 768 and 390). Under all five
templates the panel reads *Events Map layout 2* and its *Coverage* box *12 mile radius*, and the stat
row prints it as Max travel at every width. No console errors. In the tab (1440 is zoomed 1.22):

| Template | 1440: cell · ink · gap to *~2 hrs* | 768: cell · ink · lines · gap | 390: cell · ink · gap |
|---|---|---|---|
| Pop, Lime, Grunge, Editorial | 203.98 · 102.05 · 101.94 | **100.66 · 96.52 · 1 · 4.14** | 110 · 96.52 · 13.48 |
| Retro | 192.09 · 102.83 · 107.31 | 88.66 · 48.63 · **2** · 58.03 | 98 · 96.52 · 19.48 |

The tester's 768 touch is the first row: the twins' and Pop's cells are the frame's thirds (100.67,
`row(0, …)`), and the value fills 96% of one and ends 4.14 short of the next value. Retro's body
gaps its cells 18, so its 768 third is 88.66 and *12 mile radius* wraps to two lines there (the row
91.8 tall against 69.3 at 390). Nothing wraps at 1440 or 390.

**Measured before asking** (the harness, map `arch 1`, themes 0–4, three widths, canvas and
`live=1`, on :5174; the two surfaces agree in every render, and the desktop render is the tab's 1440
÷ 1.22). With `&cj={"radius":"120 mi"}` the value inks 45.7 at 768 and 390 (39.61 at desktop; Retro
39.92) and with `"100 mi"` 46.03 (39.89; Retro 40.2): **one line under every template at every
width, and at least 54.6 clear of *~2 hrs* at 768.** So A and B cure the touch alike; the choice is
the number. Retro's 768 row drops 91.8 → 69.3 under either, and its section 771.02 → 748.52; no
other height moves. The value `<span>` is stretched to its cell (`col()`'s default
`align-items`), so its box is the cell's under every value.

**Expected after-diff, named before the code** (on A or B). Map `arch 1` × themes 0–4 × three widths
× both surfaces, **30 files**:
- **28 files: the value `<span>`'s text alone.** Its box is the cell, so no geometry moves.
- **2 files, Retro (theme 0) at tablet, canvas and `live=1`:** the span 45 → 22.5 tall, its cell
  and the stat row 91.8 → 69.3, the travel card and the root 22.5 shorter (771.02 → 748.52), and
  every row under the stat row 22.5 up.
- Map `arch 0`, `2` and `3`: **0 files.** On C, map `arch 0` × themes 0–4 × 3 × 2 moves as well.

**Decided** (user, 2026-10-09): **A. *120 mi* at layout 2**, `MAP_RADIUS_2`, returned by
`mapRadiusSeed` at `d === 1`. Layout 1 keeps *12 mile radius*. The designer is told the cell's 100
contradicts the frame's 120s.

**Settled** (2026-10-09).
- **The code** (`data.js` and one comment in `EncoreBuilder.jsx`; `EncoreSection.jsx` is untouched).
  - `data.js:1280`: `MAP_RADIUS_2 = '120 mi'`, and `mapRadiusSeed` (`:1282`) returns it at `d ===
    1`, so `sectionVm` (`EncoreBuilder.jsx:1908`) and `EditPanel`'s chain arm (`:4341`) both take it
    with no edit of their own. The comment above (`:1270`–`:1278`) names each layout's source and
    JP-124's reason. The stat-row comment (`:1300`–`:1304`) now says Max travel is `radius`, and
    that layout 2's seed is the page's 120.
  - The field keeps `d: MAP_RADIUS` and `in: [0, 1, 2]`, so no `reach.mjs` run is owed. Its hint
    (`:2237`–`:2239`) adds "…as Max travel on the travel card, where it starts from “120 mi”", and
    its comment names JP-124.
- **Digest: 30 of 660 per surface, the named set and nothing else**, themes 0–4, against a HEAD
  worktree on :5174 and a fresh tree server on :5177. The harness was proved first: 0 of 660 per
  surface, unedited. The 30 are map `arch 1` × themes 0–4 × three widths × canvas and `live=1`.
  - **28 files: one row each**, the value `<span>`'s text, *12 mile radius* → *120 mi*. No
    geometry moves.
  - **Retro (theme 0) at tablet, canvas and `live=1`: 77 rows each.** The span 45 → 22.5, its cell
    65.8 → 43.3, the stat row 91.8 → 69.3, the travel card and the left column 22.5 shorter, and
    the root 771 → 748.5. The pill row and the gig list beneath move 22.5 up.
  - **Not in the named diff:** the right column moves too. The map card stretches to the left
    column's height (Retro's 768 master states both at 703; its fit declined that stretch,
    `../retro/layout-2.md:1232`, so the card follows its neighbour's content). So the card and its
    viewport are 22.5 shorter (659 → 636.5, 467 → 444.5). The rings, centred in the viewport, move
    11.2–11.3 up. The pins, placed in % of it, move 5.8–17.1 up. The terms bar at its foot moves
    22.5 up. No other template's row wrapped, so none of this happens there.
  - Map `arch 0`, `2` and `3`, and every other category: 0.
- **`textContent`**: the Max travel value reads *120 mi* in all 30 renders. In the digest, layout
  1 prints *12 mile radius* in 30 files and layout 3 *… 5 pins · 120 mi radius* in 30.
- **A typed Coverage still wins, and emptied matches HEAD.** `&cj={"radius":"ZQ coverage"}` and
  `{"radius":""}` on map `arch 0`–`3` × themes 0–4 × three widths × both surfaces: **0 of 60** per
  label against HEAD. Typed, the marker prints at `arch 0`, `1` and `2` (30 of 30 each) and not at
  `arch 3`, and no seed prints anywhere. Emptied, no seed and no layout-3 coverage clause print.
- **The real app** (:5177, the edited tree; the repro above re-run). On card 2 under all five
  templates the panel's *Coverage* reads *120 mi*. The tab prints it once as Max travel at 1440,
  768 and 390, one line everywhere. At 768 its ink is 45.7, and it ends **54.96** short of *~2 hrs*
  (Retro **60.96**; the cells' gap is 0 and 18). The section heights match HEAD at every width,
  except Retro's 768 (771.02 → 748.52). Cards 1 and 3 keep *12 mile radius* and *120 mi radius*
  in the panel and the tab under all five. *45 miles* typed into card 2's box, under Pop and
  Retro, prints on the canvas and in the tab at all three widths. No console errors.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed.
- **Torn down** before the commit: :5174 and :5177 were stopped and the HEAD worktree removed. The
  probes stayed in the session's scratchpad, so nothing landed in `source/scripts/`. :5173 and :5175
  (this tree) and :5176 (another job's worktree) are not this session's and still run.
- **Docs.** `notes/map.md`'s JP-105 bullet now states layout 2's seed and why, and its JP-096
  *unfiled seats* line points at it. *Answered* pointers went at `../grunge/layout-4-qa-fixes.md`'s
  `MAP_RADIUS` follow-up and designer note 10, at JP-105's Settled in
  `../editorial/layout-3-qa-fixes.md` ("layouts 1 and 2 stay open"), and at the unfiled seat in
  `../editorial/layout-2-qa-fixes.md`'s JP-096 table. CLAUDE.md and README name no coverage seed,
  so they are unchanged. The designer note below is updated.

Reply (JP-124): **fixed.** Events Map layout 2 now shows *120 mi* under Max travel by default. That
matches the rest of the page (*120 mi standard travel radius* in the header, *120 mi standard*
under the map) and the design's own 120 mi rings and data bar. At 768 it now ends well clear of
*~2 hrs*: 55px under every template, where it used to come within 4px (under Retro it used to
wrap). The design's *100 mi* in that cell contradicts its own 120s, so it went to the designer.
Layout 1 keeps *12 mile radius*, from its own design, and anything typed into Coverage still shows
on every layout.

---

## JP-121 — 390: a long name in the layout-2 header runs over the burger and pushes the pill off

**Verdict: confirmed, shared, and named before.** The probe (header `arch 1`, `w=mobile`,
`live=1`; x in section px):

| Theme | Name size | *Kai Mercer* | *Florence and the Machine* | *Maximilian Featherstonehaugh* | Burger capsule · pill (seed) |
|---|---|---|---|---|---|
| 0 Retro | 17 | 141.8–220.3 | 80–264.7, fits | 80–302.3; pill **334.3–426.3**, `scrollWidth` 426 | 10–74 · 288–380 |
| 1 Lime | 14 | 169.7–220.3 | 134.8–255.2 | 122.5–267.5 | 10–72 · 298–380 |
| 2 Grunge | 10.5 | 171.8–218.2 | 140.5–249.5 | 129.3–260.7 | 20–82 · 279.5–370 |
| 3 Editorial | 13.54 | 153.6–236.4 | **40.6**–242, over the capsule | **36**–279.2; pill **295.2–407.2** | 20–82 · 258–370 |
| 4 Pop | 13.72 | 152.3–237.7 | **41.4**–243.5, over the capsule | **36**–283.5; pill **299.5–410.1** | 20–82 · 259.5–370 |

Pop's row is the tester's. At 768 *Featherstonehaugh* fits under Pop (225.8–508.8, the pill at 582),
as the tester found. Under Retro the burger's capsule is squeezed from 64 to 38 wide by the long
names, a fault of its own.

**The cause is two parts of one row** (`HeaderV1`'s `s.limeTree` nav, the `nav` const):
- **the name** is `labelStyle(s, s.labelLg, { …, flex: 'none' })` (`EncoreSection.jsx:2594`), and
  `labelStyle` sets `whiteSpace: 'nowrap'` (`:106`–`:112`). It has no fit: `vm.navNameFit` is built
  for designs 0 and 3 alone (`EncoreBuilder.jsx:842`);
- **the two cells**: the left one is `flex: '1 1 0'` with `minWidth: nar ? (s.navFits ? 'max-content'
  : 0)` (`:2571`–`:2574`), so it collapses under the name and the burger's capsule overflows it. The
  right one is a `row` with no `minWidth` (`:2595`), so its min-content holds the pill whole and the
  name pushes it off the page.

Lime and Grunge fit the set only because their 390 names are smaller; a longer name does the same.

**Recorded.** JP-101's entry scoped this out: "Layouts 2 and 3 draw their own name spans, not
`NavBar` … under Pop at layouts 2 (*Featherstonehaugh*, 410) … That is a different fault … see *Seen
at triage, not filed*" (`../editorial/retest-qa-fixes.md:496`–`:504`, `:1104`–`:1111`). Editorial's
layout-2 QA named its 360 case ("with *Featherstonehaugh* the Book pill ends at **361.42**",
`../editorial/layout-2-qa-fixes.md:638`–`:641`). That triage found Lime, Grunge and Editorial fitting
at 390; Editorial reproduces now because its face became Gloock after it (2026-10-05,
`../editorial/display-face.md`), which sets the name wider.

**The tester's "accepted on 07.10".** No plan or note records a call accepting Editorial's layout-2
case. The nearest are the two *named, not fixed* items above, and JP-101's reply, which logged only
Editorial's layout 3 and Retro at 360 as separate. The session asks the user whether there was a
call (question 1) and quotes the answer in the reply.

**Siblings, not filed:**
- **Layout 3's centred name** (`HeaderV2`'s `s.limeTree` row, `:3385`–`:3392`; its right cell lets
  the pill overrun into the spacer, so the name runs *over* the pill rather than pushing it). The
  probe at `arch 2`: Pop *Florence* 93.9–296.1 against the pill at 245.5, *Featherstonehaugh*
  71.2–318.8; Editorial 94.3–295.7 and 73.4–316.6 against 243.7. Lime and Retro fit; Grunge's name
  did not resolve in the probe. Named in `layout-3.md` section 1 (`:1182`) and `notes/nav.md`.
- **Retro's layout-2 bar** (`:2989`–`:3013`): the name is `labelStyle` at 17 between two `flex: 1`
  spacers, and *Featherstonehaugh* pushes the pill to 426.

**Evidence.**
- `HeaderV1` (`:2420`); its block's nav row (`:2548`–`:2642`): `navInset` 10 at 390 (`:2520`), the
  row's `minHeight` (`:2550`), the left cell (`:2571`), the name (`:2594`), the right cell (`:2595`)
  and `BookPill` at 12.07 (`:2631`).
- **The row is no query container at 390**: `containerType: nar ? undefined : 'inline-size'`
  (`:2551`), so a `cqi` room resolves against nothing there. JP-101 made the capsule's left half the
  container (`NavBar`, `:1953`); here the row, or a wrapper round the name, has to become one at
  narrow.
- The desktop bar's own rule, in the comment at `:2553`–`:2570`: "the name stays centred whenever
  the links fit their half and slides right when they do not".
- `fitName` / `fitBox` / `fitRow` (`:888`–`:895`), and NavBar's narrow `fit` (`:1915`–`:1931`).
- `EncoreBuilder.jsx:796`–`:850`: `navFace`, `vm.navNameEms`, `vm.cardNameEms`, `vm.navNameFit`.

**Decision.**
1. **Fix or accept, and the scope.**
   - **A (recommended). Fix it in `HeaderV1`'s `s.limeTree` block**: Lime, Grunge, Editorial and Pop
     at once, since it is one row and the mechanism exists. Retro's bar and layout 3's name are
     named and logged for their own tickets.
   - **B. A, plus Retro's bar, by a plain wrap**: the name `whiteSpace: 'normal'` and
     `textWrap: 'balance'` between pinned cells, with no ems table. No word of the set outruns
     Retro's room at its 17, so no size fit is needed there.
   - **C. A, plus layout 3's centred name** (`HeaderV2`), the same fit in its row, Pop and Editorial
     reproducing.
   - **D. Accept it**, as the tester says Editorial's was: a reply.
2. **The room.**
   - **A (recommended). Centred while it fits, sliding when it does not**, the desktop bar's own rule.
     At 390 the cells grow equally from 0 and never shrink below their content (`minWidth:
     'max-content'`), so the name stays centred until the narrower side runs out. The room is then
     the row less the capsule, the pill and the two gaps: under Pop about 350 − 62 − 110.5 − 32 ≈ 145.
     *Florence and the Machine* sets two balanced lines at its own 13.72. *Featherstonehaugh*'s word
     (about 153 at 13.72) takes about 13 on a line of its own.
   - **B. Always centred**: the room is the row less twice the wider side, about 97 under Pop.
     *Florence* shrinks to about 12.7, and *Featherstonehaugh*'s word to about 8.7, under the floor.

   Either way the name takes JP-101's `narrow` fit (`fitName`'s narrow arm and `fitBox`): its size
   while one line fits, else two balanced lines at the size the longer fits, a 12 floor (Grunge's
   nominal 16, as `NavBar`'s), a third line below it, and the widest word under the floor. So
   `vm.navNameFit` is built for `d === 1` too. The row states its height as a minimum (`:2550`), so a
   second line grows the bar rather than overlapping the spread. Two lines at 13.72 × 1.1 are about
   30, under the row's 34, so the set does not grow it.

**Expected after-diff (named before the code): zero** on the seed, themes 0–4, both surfaces. *Kai
Mercer* fits one line under all five, and the cells' new minimum is under their seeded width. Header
`arch 1` and `5` (a fold of design 1) are the files at risk. With `&name=`, header `arch 1` × themes
1–4 (and 0 on B, `arch 2` on C) × mobile moves, and 768 and desktop do not.

**Verify.**
- The long-name set at 360, 390 and 414 on the published tab and the canvas at Mobile, under all
  five templates. The name's `Range` is clear of the capsule and the pill by at least the row's gap.
  The pill ends inside the page, and the document's `scrollWidth` is its width. No word breaks
  inside itself: a word wider than the room at the floor takes a size under it (JP-101's Verify).
  The burger opens (`live`).
- 768 and 1440 do not move (the tester's control), and neither does Pop layout 1's capsule.
- Card 2 in the real app with *Maximilian Featherstonehaugh*: the spread under the bar does not move
  unless the name took a third line.

**Docs.** The nav row's comment in `HeaderV1`. `notes/nav.md`'s JP-101 bullet (`:106`), which gains
layout 2, and its layout-3 clause on C. The `vm.navNameFit` comment. *Answered* pointers at
`../editorial/retest-qa-fixes.md:1104` and `../editorial/layout-2-qa-fixes.md:638`. On C, a pointer
at `layout-3.md:1182`.

---

## JP-122 — 390 footer: a long copyright runs under the sun, a long name under the seal

**Verdict: confirmed, two faults.** The probe (footer `arch 0`, `w=mobile`, `live=1`; x in section
px):

| Theme | Seal | Name ends: *Kai* / *Florence* / *Featherstonehaugh* | Copyright starts: *Kai* / long | Sun |
|---|---|---|---|---|
| 0 Retro | 249.8–367.2 | 143.9 / **275.1** / **321.6** | 10 / 10 (the row in halves) | — |
| 1 Lime | 267.2–372.3 | 112.5 / 202.3 / 233.8 | 10 / 10 | — |
| 2 Grunge | 261.7–361.2 | 90.4 / 148.6 / 169.4 | 10 / 10 | — |
| 3 Editorial | 264.1–365.9 | 136.8 / 247 / **285.8** | 10 / 10 | — |
| 4 Pop | 254.8–362.1 | 129.6 / 242.3 / **286.1** | **78.8** / **10** | −103.6…94 |

These are x-extents. The tester's hit test confirms the y-overlap for Pop; the session confirms it
for Retro and Editorial. The sun's 197.6 is the bounding box of a turned 151.67 × 151 drawing, not
its ink: the seed's copyright at 78.8 is inside the box and clear of the ink.

**(a) The small print, Pop alone.** Pop's 390 row packs both strings to the right (`popEnd`:
`justifyContent: 'flex-end'`, gap 10, and no `half` rule on either span, `:29667`–`:29695`). When they
no longer fit one line, both spans shrink and wrap, and the copyright's left edge becomes the
column's x 10, under the corner sun (`:29706`–`:29713`, drawn at `:29740` with its centre 4.79 past
the page's left and 6.17 above its foot). The twins and Retro draw no sun and split the row in
halves, so nothing covers theirs.

**(b) The wordmark, every footer with a seal over its row.** `wordmark` (`:29491`–`:29510`) is
JP-092 (rest)'s rule: the 150 rule takes what the name leaves, down to a 30 floor, and past the
floor the name wraps between words. The measure is the column. But the seal stands absolute over
the row's right end (`:29583`–`:29600`; under Pop at 390 an 84.05 disc centred 71.58 in from the
content's right and 7.3 down), so a long name reaches the disc before it wraps. Retro's body is the
same (the name `:29808`, the seal `:29788`–`:29795` and `:29828`). Lime and Grunge fit the set by
width alone.

**Evidence.** As above, and the narrow layout (`:29720`–`:29743`, the column `containerType:
'inline-size'` under Editorial and Pop alone, `:29727`). JP-092 (rest)'s Settled in
`../editorial/retest-qa-fixes.md`. `notes/footer.md`.

**Decision.**
1. **(b)'s scope.**
   - **A (recommended). Every footer at 390 whose seal stands over the wordmark row**: the
     `s.limeTree` block and Retro's body. The name's box (not the row) is capped at the room before
     the disc, less a gap, so the rule still runs under the seal as every frame draws it, the rule
     yields first as before, and then the name wraps between words. 768 and desktop are measured
     first and touched only if a seal reaches its row there.
   - **B. Pop alone**, what was filed.
2. **(a)'s shape.**
   - **A (recommended). The row keeps the sun's corner and wraps as a whole.** It starts right of the
     sun's ink at the row's height. The session measures that ink. The seed's copyright starts at
     78.8, so a pad up to the seed's own start (about 69 past the column's edge at x 10) moves
     nothing. While the copyright and the credit fit one line, they
     stand side by side as now. Otherwise the credit drops under the copyright, both right-aligned (the
     seed's packing). A copyright longer than the room wraps between words, and breaks inside a word
     only when one outruns it. The row's 68 holds three lines of 12.48.
   - **B. The corner is kept, and the two spans stay side by side**, each wrapping in its own column:
     today's behaviour, moved clear of the sun.
   - **C. The sun steps aside when the row needs its corner.** Not recommended: the sticker is the
     frame's, and the seed never needs it to move.

**Expected after-diff (named before the code): zero** on the seed, themes 0–4, both surfaces, and the
`page=2` footer: no seeded name reaches a disc, and Pop's pad is under the seed's own start. With
`&name=`: the footer × the scoped themes × mobile.

**Verify.**
- The long-name set at 360, 390 and 414 on the published tab and the canvas, on Pop card 2 and card
  1, then Editorial and Retro (on A).
- `elementFromPoint` at each copyright line's first glyph, and at the name's last, returns the text,
  not the sun or the seal (the tester's test; inner points, after `scrollIntoView`).
- The copyright's lines are right-aligned, and the credit keeps its words.
- The page's `scrollWidth` is its width.
- 768 and 1440 do not move.

**Docs.** The two comments (`wordmark`, `smallPrint`). `notes/footer.md`. An *answered* pointer at
JP-092 (rest)'s Settled.

---

## JP-123 — editing a slot row writes the canvas's 2025 dates, and the published rows die

**Verdict: confirmed, every template, and recorded twice.**

**The mechanism.**
- The published page reads `c.slots` when it is an array, and otherwise `slotSeed(slotBase)`, whose
  base is `max(open, today)` live (`EncoreBuilder.jsx:1693`–`:1694`).
- The panel's `slotsVal` hands `SlotsField` `slotSeed(openVal('open'))`, the canvas's dates
  (`:4266`–`:4269`). Off `CAL_OPEN`, `2025-06-12` (`data.js:1481`), those are 2025-06-12 / 06-14 /
  06-20 / 07-05.
- `SlotsField` rewrites the whole array on any keystroke (`setAt`, `:3294`). So the first edit of a
  kind or a price stores those four 2025 dates.
- Live, each is before today, so `dead` (`:1485`) takes its handler and its foot line. Under the Lime
  tree a dead row keeps full ink (`EncoreSection.jsx:18078`–`:18083`), so the page shows four
  ordinary-looking rows that do nothing. Retro's body dims them, the booked look without the strike
  (`notes/calendar.md:24`–`:31`).
- Typing the old text back leaves the array, so the dates stay in 2025.

**Recorded, twice.**
- **The write-out is JP-052's** (`../lime/layout-4-qa-fixes.md:477`–`:482`, `:518`–`:525`): "slotsVal
  writes the canvas's dates out on the first edit", so the canvas would not jump. `notes/calendar.md`
  (`:58`–`:63`) states it. The `open` hint (`data.js:2141`–`:2145`) says "layout 2's seeded dates
  count from it until you edit them", which the tester read as "until you edit the dates".
- **The full-ink past row is the 2026-09-17 user call.** Its own comment states its premise: "since
  the seeded slots have no editor and are all past on a published page" (`:18080`–`:18082`). Both
  halves have been false since JP-052: the slots have an editor, and the seed counts from today
  live.

The Major part is the silence. Before any edit the panel's four date boxes already read June 2025
(the canvas's base), and nothing on either surface says a date has passed.

**Evidence.**
- `data.js:1497`–`:1531`: `CAL_SLOTS` (four `{ after, kind, price }` offsets), `SLOT_KEYS`,
  `slotSeed()`.
- `data.js:2141`–`:2145` and `:2172`–`:2173`: the `open` and `slots` hints.
- `EncoreBuilder.jsx:1678`–`:1720`: `vm.calSlots`. `:1485`: `dead`. `:3273`–`:3370`: `SlotsField`.
  `:4266`–`:4269`: `slotsVal`. `:3862`–`:3866`: `BookedField`, which reads today.
- `EncoreSection.jsx:18078`–`:18083`: the dim rule; `:18099`: `slotRow`.
- CLAUDE.md's repeater rule: each seed resolver in `EditPanel` resolves exactly what `sectionVm`
  resolves. `notes/list-editors.md` (`SlotsField`, `blankRow`).

**Decision (four questions).**
1. **What a seeded row keeps when the artist edits its kind or price.**
   - **A (recommended). Its offset, until its date is typed.** A seeded row stays `{ after, kind,
     price }`, `CAL_SLOTS`' own shape. `sectionVm` dates it from the base it already uses: `open` on
     the canvas, `max(open, today)` live. Typing a date writes `date`, which wins while it is there
     (question 4 says what clearing it does). So the canvas keeps the frame's picture, the published
     page keeps counting from today however long after the edit it is opened, and the hint becomes
     true as read. A row the artist adds has no `after`: it is dated by hand, as now.
     - Costs: `SLOT_KEYS` and `blankRow` learn `after`, and `slotsVal` stops dating the seed.
     - The panel's date box shows an offset row's canvas date, with a line saying the published page
       counts it from today. The session picks the wording.
   - **B. The panel dates the seed from `max(open, today)`**, BookedField's precedent, so the first
     edit writes the dates the published page shows that day.
     - One line.
     - But the canvas jumps from June 2025 to today's dates on the first edit.
     - The dates freeze that day: a page edited today is all past again in a few weeks.
   - **C. By design**: the hint rewritten ("…until you edit the list").
2. **A past row's look on the published page, under Lime, Grunge, Editorial and Pop.**
   - **A (recommended). It dims like a booked row** (.38, no strike — the state their cells and
     Retro's rows already take), reversing 2026-09-17, whose premise is gone.
   - **B. Full ink, as now.**
3. **A warning in the panel.**
   - **A (recommended). A typed date before today gets a line under its row**: "This date has passed,
     so visitors can't pick it." It reads today as BookedField does, and it is derived from the
     stored value (`UrlInput`'s pattern). On 1A a seeded row never warns, since it counts from today.
   - **B. None.**
4. **Clearing a typed date on a seeded row** (on 1A; a one-way door otherwise).
   - **A (recommended). The row counts from today again.** It keeps its `after` beside a typed
     `date`, and an empty date box gives the count back, so the artist can always undo a date.
   - **B. The row stays undated**: `date: ''`, listed but never picked, as an emptied date is today.
     Only removing the row or *Start fresh* brings the seed back.

**Expected after-diff: zero** on the seed, themes 0–4, both surfaces. The digest edits nothing, and
`today` is opt-in. 2A moves only a live render holding a past slot. Probe it with `&today=` and
`&cj={"slots":[…]}` (a typed past date, a typed future one, an offset row), and name the rows: under
the Lime tree, the past row's opacity.

**Verify.**
- The tester's steps on Pop card 2, then Lime's, Grunge's, Editorial's and Retro's card 2: edit a
  kind, edit a price, type the old text back. Publish, then Open at 1440, 768 and 390. The rows count
  from today, a click picks, and the foot prints the slot's line.
- Then type a date. It stays put on both surfaces. A past one dims live (2A) and warns in the panel
  (3A).
- Remove a row, add one, and empty a seeded row's kind and price: the row keeps its date on 1A, as
  `blankRow` now says. Type a date into a seeded row and clear it: on 4A it counts from today again.
- The canvas keeps June 2025 on the seed (the frame's picture, by design).
- `slotsVal` and `sectionVm` resolve the same rows (the repeater rule).

**Docs.** `notes/calendar.md` (the first-edit sentence at `:63` and the 2026-09-17 exception at
`:27`–`:28`). `notes/list-editors.md` (the row shape). The `CAL_SLOTS` comment. The `open` and
`slots` hints. The dim rule's comment. *Reversed* pointers at `../lime/layout-4-qa-fixes.md:477` and
at the 2026-09-17 call's own record (the session greps for it).

---

## End-of-pass sweep

1. A full digest against a `main` worktree on :5174 (port and `?t=` normalised): every category ×
   themes `0,1,2,3,4` × three widths × canvas and `live=1`, the footer's `page=2` render included.
   Every diff must be one a *Settled* above names.
2. The repro sets re-run on the final tree, read off the DOM:
   - JP-121's long names at 360 / 390 / 414 under all five templates (and layout 3 on C);
   - JP-122's long names at 360 / 390 / 414, on Pop cards 1 and 2 and the scoped templates;
   - JP-123's edit sequences, live, with `&today=`;
   - JP-124's `textContent` at three widths.
3. `reach.mjs` for any `in` that moved. None is expected.
4. Walk Pop card 2 in the real app and the published tab at 1440 / 768 / 390, the tester's steps for
   each ticket. Walk Lime's, Grunge's and Editorial's card 2 once, Retro's card 2 for the calendar and
   the map, and Pop card 1 for the footer.
5. `npm run build:standalone`, then `cp source/dist-standalone/index.html index.html`, in its own
   commit. Then a two-build digest (`build-digest.mjs`), whose diff should be only the named rows.
   Check the editor's 1088 Desktop canvas by name.
6. `plans/README.md`'s Pop *Layout 2 QA fixes* row, and one reply line per ticket for QA (fixed / by
   design / logged). Head them with the retest-against-the-stamp line (`curl -sI
   https://siniiitsa.github.io/js-plus-prototype-2/`; the triage read `Thu, 08 Oct 2026 20:39:30
   GMT`, 9,910,327 bytes). JP-121's reply answers the tester's 07.10 question with the user's answer.
7. *Notes for the designer* at the plan's foot.

---

## Notes for the designer

Gathered as the entries run; the sweep finalises them. Seeded at triage:
- **Layout 2's travel card says *Max travel 100 mi*** beside a map whose rings run to 120mi and whose
  data bar reads *UK · 8 pins · 120 mi radius*. On the same page, the header's place card claims
  *120 mi standard travel radius*. The build now seeds *120 mi* in the cell (JP-124, user call,
  2026-10-09). If 100 is meant, the cell, the rings, the data bar and the page's other three 120s
  all have to change together. Layout 1's frame does the same with *12 Mile Radius* beside *120 mi
  standard · further on request*. The build keeps layout 1's *12 mile radius*.
- **The 390 header and footer frames are drawn for *Kai Mercer*'s ten letters.** No frame shows a
  name that does not fit between the burger and the pill, or a copyright that reaches the corner
  sun (JP-121, JP-122).
