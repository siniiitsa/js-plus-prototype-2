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
| 1 | JP-124 | *12 mile radius* at layout 2 | **Confirmed, and recorded**: JP-105 kept layouts 1 and 2 on `MAP_RADIUS` on purpose, layout 2's *100 mi* parked for the designer; the frame itself says 100 once and 120 three times | S | **user**: *120 mi* or *100 mi*. **Decided A, *120 mi*** (2026-10-09) | **done** (15 of 660 + 15 of 660, the named set; Retro's 768 card 22.5 shorter) |
| 2 | JP-121 | 390: a long name over the burger, the pill off the page | **Confirmed, shared, and named** (Editorial retest's *Seen at triage, not filed*, `:1104`–`:1111`): the layout-2 bar's 390 name has no fit; Editorial reproduces it too | S–M | **user**: fix or accept, the scope, the room. **Decided A with Editorial kept out** (its 2026-10-07 acceptance stands), **room A** (2026-10-09) | **done** (0 of 660 per surface on the seed; `&name=` 4 of 180, Pop's 390 alone) |
| 3 | JP-122 | 390 footer: the copyright under the sun, the name under the seal | **Confirmed, two faults**: (a) Pop's small print keeps no corner for the sun; (b) the wordmark's measure ignores the seal, under Pop, Editorial and Retro | S–M | **user**: (b)'s scope, (a)'s shape. **Decided (b) A, every seal footer; (a) A, the row wraps as a whole** (2026-10-09) | **done** (0 of 660 per surface on the seed; `&name=` 4 / 4 / 6 / 2 of 30 per surface, as named) |
| 4 | JP-123 | an edited slot row freezes the dates in 2025 | **Confirmed, every template, and recorded twice**: the first-edit write-out (JP-052) and the full-ink past row (2026-09-17), whose own comment states a premise JP-052 retired | M | **user**: four questions. **Decided 1 A, 2 A, 3 A, 4 A** (2026-10-09) | **done** (0 of 660 per surface on the seed, 0 of 60 live with `&today=`; the mixed `&cj=` rows move as named) |
| 5 | — | End-of-pass sweep | — | S | — | **done** (15 + 15 of 660 against `main`, JP-124's set exactly; every repro reads its entry's after-sink; root `index.html` refreshed, `67d4356`) |

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
- **Digest: 15 of 660 per surface, 30 in all, the named set and nothing else** (first written
  "30 of 660 per surface"; the sweep corrected the count, since map `arch 1` × five themes ×
  three widths is 15 a surface), themes 0–4, against a HEAD worktree on :5174 and a fresh tree
  server on :5177. The harness was proved first: 0 of 660 per
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

**Re-checked** (2026-10-09, HEAD `7349509`). Every *Evidence* line holds as the triage gave it:
`HeaderV1` `:2420`, its nav row `:2548`–`:2642` (`navInset` `:2520`, `minHeight` `:2550`,
`containerType` `:2551`, the left cell `:2571`, the name `:2594`, the right cell `:2595`, `BookPill`
`:2631`); `fitName` / `fitBox` / `fitRow` `:888`–`:895`; NavBar's narrow `fit` `:1915`–`:1931`;
`navFace` … `vm.navNameFit` `EncoreBuilder.jsx:796`–`:850`, built at `:842` for designs 0 and 3.
Retro's bar name is `:3002`, `HeaderV2`'s centred name `:3389`. `vm.navNameFit` is read by `NavBar`
alone (`:1925`–`:1930`), and `HeaderV1` calls no `NavBar`, so building it at design 1 reaches this
row and nothing else.

**Reproduced** (2026-10-09, a HEAD worktree on :5174; puppeteer from the scratchpad: template → card
2 → *Use this header* → the Title through `st` → Publish → Open, the tab at 360, 390, 414 and 768;
the name's text `Range`, the burger's capsule and the pill, x in page px). No console errors.
- **Pop**, the tester's numbers to the pixel: *Florence* 41.36–243.48 over the capsule (20–82),
  *Featherstonehaugh* 36–283.55 and the pill 299.55–**410.06** at 390. At 360 *Florence* (36),
  *Chemical* (36) and *Supercalifragilistic* (49.17) run over the capsule too, and the pill ends at
  364.64 and 410.06. At 414 the 390 row again (the row is 350 at both). **Pop's tab clips the
  pill**: the document's `scrollWidth` stays the window's.
- **Editorial**: the same overlaps (*Florence* from 40.56, *Featherstonehaugh* from 36, the pill to
  407.2 at 390), and **its page scrolls sideways**: `scrollWidth` 407 at 390, 419 at 414, and 365 at
  360 with *Florence*.
- **Lime and Grunge fit all five names at 360, 390 and 414**: the name never reaches the capsule,
  and the pill ends at the row's end.
- **768 fits every name under all four**, the tester's control.
- **The harness** (header `arch 1` and `5`, themes 0–4, `w=mobile`, canvas and `live=1`) gives the
  triage table to the hundredth, the two surfaces alike, and `arch 5` alike to `arch 1` under themes
  1–4 (Retro's six do not fold). Retro's *Florence* also squeezes its burger capsule to 38 and runs
  its pill 8.6 past the row's inset (388.63).
- **The room, measured** (390; at 360 every row is 30 shorter): the row 350 (Lime 370); the capsule
  62 (`26 + 2 × 18`); the gaps 2 × 16; the pill 110.52 (Pop), 81.95 (Lime), 90.53 (Grunge), 112.05
  (Editorial). The pill's box in the faces' ems (`navNameFit.pill`, the label at 12.07 or Label/SM,
  plus `(4.27 + 17.92 + 8.53 + 27.6) × 0.7547`) comes to Lime's and Grunge's to the hundredth and
  0.4 wide under Editorial and Pop, the safe side. **Grunge's label is Anton at an unfaced 12.07**
  (`fontSize` spread after `labelStyle`), so its term divides `faceK` back out of `navFace`'s 0.75.
- **What the two rooms do to the set** (the fit in the faces' ems, size / lines). Room A (the row
  less the capsule, the pill and the gaps) is Pop's 145.5 at 390 and 115.5 at 360. *Florence* and
  *Chemical* take two lines at 13.72. *Featherstonehaugh* sets at 12.38 at 390 and 9.83 at 360, and
  *Supercalifragilistic* at 12 and 9.52. Room B (the row less twice the pill and the gaps) is 97
  and 67. Under it *Featherstonehaugh* sets at 8.25 and 5.7, and **at 360 the seed wraps** under Pop
  and Editorial. Under Lime and Grunge both rooms leave every name its size, one line at 390.

**Decided** (user, 2026-10-09):
1. **A, the `s.limeTree` block, but Editorial stays out.** The tester's *accepted on 07.10* was a
   call: on 2026-10-07 the user accepted Editorial's layout-2 case as a remainder of JP-101, and it
   stands. It was never written down, so this entry records it. The fit is Lime's, Grunge's and
   Pop's. Editorial's 390 row stays HEAD's, its page scrolling sideways with
   *Featherstonehaugh*. Retro's bar and layout 3's centred name stay named for their own tickets.
2. **A, centred while it fits, sliding when not**: the desktop bar's rule, both cells pinned at
   their content, the name's room the row less the capsule, the pill and the two gaps.

**Expected after-diff, named before the code.** Everything is gated on `s.mob` and `!ed`. So 768,
the published 1180 / 1440 desktop and the editor's **1088 Desktop canvas** cannot move by
construction, and neither can Editorial or Retro (its own body). The row becomes a query
container at 390 (it already is one at desktop). Chrome 151 makes no containing block of it for
NavMenu's `position: fixed` panel (proved in the scratchpad: a fixed `inset: 0` child of a
`container-type: inline-size` box measures the viewport).
- **The seed: 0 of 660 per surface**, themes 0–4. The files at risk are header `arch 1` and `5` ×
  mobile × themes 1, 2 and 4 × both surfaces. *Kai Mercer* fits room A at its own size under all
  three, the cells' minimum is under their seeded width, and `containerType`, `whiteSpace`,
  `maxWidth` and `textAlign` are not digest columns.
- **Positive control, `&name=`**: *Florence and the Machine* and *Maximilian Featherstonehaugh*
  each move **4 files per name**: header `arch 1` and `5` × mobile × Pop × canvas and `live=1`. The
  moving rows are the name's (its size, box and lines) and the left cell's: on HEAD the cell
  collapses to 0 and the capsule overflows it, and now the cell holds the capsule's 62. The pill's
  row moves where HEAD pushed it (*Featherstonehaugh*). Lime and Grunge fit every name at 390, so they show
  0, as do Editorial (out), Retro, and every 768 and desktop render. Lime and Grunge would move
  only at 360, which the harness does not render.

**Settled** (2026-10-09).
- **The code** (`EncoreSection.jsx` and `EncoreBuilder.jsx`).
  - `HeaderV1`'s `s.limeTree` row (`EncoreSection.jsx:2549`–`:2572`): `fit`, built at `s.mob` and
    not under Editorial. Its room is `100cqi` less the capsule (`26px + 2 × u(18)`), the pill and
    `2 × u(16)`. The pill is BookPill's padding, gap and disc as the call below passes them
    (`pp(17.92)`, `pp(8.53)`, `27.6 × pk`, `pp(4.27)`) plus `pillEms` × the label's size. That is
    12.07 under Pop and Grunge, and Grunge's ems are `navNameFit.pill / s.faceK`, since its label
    is Anton unfaced. Elsewhere it is `s.labelSm`. `two` and `word` come from `navNameFit`, and the
    floor is 12 (Grunge 16).
  - The row is the query container at 390 under `fit` (`:2576`). The left cell's minimum is
    `max-content` under `fit` (`:2599`), and so is the right cell's (`:2625`). The name takes
    `fitName` / `fitBox` and `textAlign: center` (`:2622`–`:2624`). With no `fit` every value is
    HEAD's.
  - `sectionVm` builds `navNameFit` at design 1 too (`EncoreBuilder.jsx:845`). `NavBar` is its
    only other reader, and `HeaderV1` calls none.
- **Digest: 0 of 660 per surface on the seed**, themes 0–4, as named, against the HEAD worktree on
  :5174 from a fresh tree server on :5177. The harness was proved first, 0 of 660 per surface,
  unedited. No label held an empty render.
- **Positive control, as named:** the header digest with `&name=` (themes 0–4, three widths,
  both surfaces) differs in **4 of 180 files per name**: header `arch 1` and `5` × mobile × Pop ×
  canvas and `live=1`. Retro, Lime, Grunge and Editorial show 0, and so does every 768 and desktop
  render.
  - *Florence*: 2 rows. The left cell goes 5.4 → 62.4, and the name's box 202.1 × 15.4 → 145.1 ×
    30.8, two lines at its 13.72.
  - *Featherstonehaugh*: 8 rows. The cell goes 0 → 62.4, the name's box 247.5 → 145.1 at 12.35 on
    two lines, and the right cell, the pill and its disc move 40 left.
  - The cell's 62.4 is the capsule's 62 plus the pill estimate's 0.4 spare under Pop. `arch 5`
    moves as `arch 1`, and `live=1` as the canvas (the pill is an `A` there).
- **The real app** (:5177; Pop, Lime, Grunge and Editorial card 2; the tester's steps through
  `st`; the five names plus *Maximilian Featherstonehaugh Windsor*; the tab at 360, 390, 414 and
  768). HEAD was walked beside it. No console errors.

  | Pop, 390 | Size · lines | Ink | To the capsule · to the pill | Pill |
  |---|---|---|---|---|
  | Kai Mercer | 13.72 · 1 | 152.33–237.66 | 70.33 · 21.82 (HEAD) | 259.48–370 |
  | Florence and the Machine | 13.72 · 2 | 118.53–223.36 | 36.53 · 36.12 | 259.48–370 |
  | The Chemical Brothers | 13.72 · 2 | 120.3–221.59 | 38.3 · 37.89 | 259.48–370 |
  | Maximilian Featherstonehaugh | 12.35 · 2 | 99.95–241.94 | 17.95 · 17.54 | 259.48–370 |
  | Supercalifragilistic | 11.96 · 1 | 100.25–243.48 | 18.25 · 16 | 259.48–370 |
  | …Windsor | 11.76 · **3** | 103.3–238.61 | 21.3 · 20.87 | 259.48–370 |

  - **Every name clears the capsule by 17.6 or more and the pill by 16 or more**, at 360, 390 and
    414. The pill ends at the row's end, the document's `scrollWidth` is the window's, and no word
    breaks inside itself.
  - At 360, *Featherstonehaugh* sets at 9.79 and *Supercalifragilistic* at 9.49, each widest word
    filling the room under the floor, as JP-101's rule says. 414 reads 390's row 12 to the right.
  - **A wrapped name's box is the room**, so its lines centre between the capsule and the pill,
    not on the row. *Florence* sits 36.5 from each, 24 left of the row's centre. CSS cannot
    shrink a box to its balanced lines.
  - **The spread moves only for a third line**: *…Windsor* at 390 and 414 grows the bar 34 → 39.61,
    and the spread drops 90 → 95.61. Every other name keeps HEAD's 90. Two lines at 13.72 fit the
    bar's 34.
  - **The burger opens and closes** (a trusted click) for every name at 360 and 390. Its fixed
    panel measures the viewport (360 × 900, 390 × 900), so the row being a container does not
    trap it. **On HEAD Pop's burger could not be opened** with *Florence* or *Featherstonehaugh*
    at 360 or 390: the name covered it, and the tap landed on the name.
  - **The seed and 768 are HEAD's** under all four. Lime and Grunge read HEAD's numbers for the
    five names at 360–414. *…Windsor* moves under them, on HEAD 66.17 / 64.36 over the capsule at
    360. Lime's now wraps at 360, and Grunge's at 360–414, where at 390 it stood 12.4 from the
    capsule, inside the gap.
  - **Editorial reads HEAD everywhere**, by the call. Its page still scrolls sideways (407 with
    *Featherstonehaugh* at 390, 476 with *…Windsor*). Its burger cannot be opened where the name
    covers the burger's centre: *Florence* at 360 and 390, *Chemical* at 360, and
    *Featherstonehaugh* and *…Windsor* at both.
  - Grunge's pill estimate is 0.01 short, so with *…Windsor* its pill ends at 370.02, past the
    row's end by 0.02 and inside the page's 10 inset.
- **The editor's Mobile canvas** (Pop card 2, the device tab through `pointerdown`) reads the
  published 390 to the hundredth. On HEAD the pill ran to 1083 and 1154 past the frame's 1043.
- **1088 Desktop canvas, 768 and the published desktop: unchanged by construction.** `fit` is
  `s.mob` only, every other branch is HEAD's, and the positive control's 768 and 1180 renders are
  0.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed.
- **Torn down** before the commit. :5174 and :5177 were stopped and the HEAD worktree removed. The
  probes stayed in the session's scratchpad, so nothing landed in `source/scripts/`. :5173 and
  :5175 (this tree) and :5176 (another job's) are not this session's and still run.
- **Docs.** `notes/nav.md` has a new bullet beside JP-101's: layout 2's bar, Editorial's call, and
  what stays named. The `fitName` comment, the `vm.navNameFit` comment and the row's comments in
  `HeaderV1` are updated. *Answered* pointers went at `../editorial/retest-qa-fixes.md`'s *Seen at
  triage, not filed*. An *accepted* pointer went at `../editorial/layout-2-qa-fixes.md`'s
  *Editorial's 390 nav at 360*, which records the 2026-10-07 call. CLAUDE.md and README do not
  describe the nav's name, so they are unchanged. Checked by grep: `JP-101`, *centred*, *Feature
  spread* and *burger* find only README's generic burger line (`:259`).

Reply (JP-121): **fixed for Pop, and for Lime and Grunge with longer names; Editorial stays as
accepted.** On layout 2 at 390, a long name now gives way between the menu button and BOOK NOW.
It stays centred while it fits. Otherwise it wraps onto two balanced lines, and shrinks only as
far as it must: *Florence and the Machine* keeps its size on two lines, and *Maximilian
Featherstonehaugh* sets at about 12px. BOOK NOW stays whole inside the page, and the menu
button can be tapped again (on the old build a long name covered it). 768 and 1440 are
unchanged, and so is the default *Kai Mercer*. Editorial layout 2 is left as it is: you accepted
it on 07.10 as a remainder of JP-101, and that stands. Lime and Grunge fit every name in your
set already; the change only shows there with a longer name.

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

**Re-checked** (2026-10-09, HEAD `780abdb`). Every *Evidence* line sits 30 lower, as JP-121's +30
above the footer predicted. In `EncoreSection.jsx`:
- `Footer` is at `:29418`, the `wordmark` at `:29521`–`:29540` (its JP-092 comment at `:29516`);
- the seal at `:29613`–`:29630` (its placement comment at `:29587`–`:29612`);
- `popEnd` / `smallPrint` at `:29699`–`:29726`, the sun at `:29736`–`:29743`;
- the narrow layout at `:29750`–`:29773`: the column's `containerType` at `:29757`, the corner sun at
  `:29770`;
- Retro's `sealSize` / `sealPos` at `:29818`–`:29825`, its `wordmark` at `:29834`–`:29845` (the
  name at `:29838`), its seal at `:29857` and its `smallPrint` at `:29913`.

**Reproduced** (2026-10-09). Puppeteer ran from the scratchpad against a HEAD worktree on :5174. The
recipe was JP-121's: template → card → *Use this header* → the Title through `st` → Publish → Open,
with the tab at 360, 390, 414 and 768. It walked Pop card 2 and card 1, Editorial, Retro, Lime and
Grunge card 2, with the five names. There were no console errors. The harness was proved first: the
HEAD worktree against a fresh tree server on :5177, every category, themes 0–4, three widths, gave
**0 of 660 per surface**.
- **The tester's hit test.** `elementFromPoint` at the name's last glyph returns the seal's
  `circle` / `textPath` where the name runs under it. For the sun it proves nothing: `PopSun` is
  `pointer-events: none`, so the test returns the copyright on HEAD too. The sun is tested on its
  painted path instead: its `pointer-events` are turned on for the probe alone, and a glyph counts
  as covered when an inner point hits a sun `path`, not the svg's box.
- **The sun's ink**, mapped row by row over the small print's 68 (section px): it reaches **64.25**
  across the band where one to three lines can stand (dy 15–53), and 69 only at the row's foot
  (dy 62). The frame (`986:52442`, `absoluteRenderBounds`) prints *C 2026 KAI MERCER* from 81.14
  and the credit from 233, one line at y 680–690.5, with the sun clipped to x 0–94.
- **The seal's disc** is the wrapper's computed width / 2 about the box's centre. At 390 (section
  px), the disc's left edge and radius are:

  | Template | Left · R |
  |---|---|
  | Retro | 266 · 42.5 |
  | Lime | 280.5 · 39.25 |
  | Grunge | 274.22 · 37.2 |
  | Editorial | 276.69 · 38.31 |
  | Pop | 266.41 · 42.02 |

  Each disc's equator lies within the wordmark row.
- **The name under the seal** (glyph box to disc, negative = under; the last glyph's hit is the
  seal):

  | Template | Name | Widths |
  |---|---|---|
  | Pop | *Featherstonehaugh* | 360 (−42), 390 (−19.66), 414 |
  | Pop | *Florence* | 360 (−5.86) |
  | Editorial | *Featherstonehaugh* | 360 (−35.4), 390 (−8.93), 414 |
  | Retro | *Florence* | 360 (−39.1), 390 (−9.09), 414 |
  | Retro | *Chemical* | 360 (−12.5) |
  | Retro | *Featherstonehaugh* | 390 and 414 (−42.5); at 360 it already wraps clear |

  Editorial's *Florence* at 360 grazes the disc (−0.15). Lime and Grunge clear every name by 16.7
  or more.
- **The copyright under the sun** (Pop, cards 1 and 2 alike): every long name starts the copyright
  at x 10 (360, 390) or 22 (414), with 3–6 glyphs per line on the sun's ink. **The seed itself
  touches it at 360**: it starts at 48.75, and its © is on a ray (the ink reaches 65.25 there).
  At 390 and 414 the seed starts at 78.75 and 90.75, clear.
- The pages that scroll sideways (Editorial 365 / 407 / 419, Retro 389 / 367 / 426 / 438) are the
  layout-2 headers' scrolls, already named and called (JP-121, Retro's hero). The footer adds none.
- **768 and desktop**: no seal reaches its wordmark row under any of the five. Each disc's top sits
  below the row's foot (768: 43.5–53; desktop: 39.6–73). The nearest name to a disc is 224.76 at
  768 (Retro *Featherstonehaugh*) and 111.31 at desktop (Editorial *Featherstonehaugh*).

**Decided** (user, 2026-10-09):
1. **(b) A, every footer whose seal stands over the wordmark row**: the `s.limeTree` block and
   Retro's body, at 390 alone. The name group stops the wordmark's own 20 short of the disc's left
   edge, and the rule still runs under the seal. A hidden seal frees the room. Retro's *The
   Chemical Brothers* newly wraps at 390, where HEAD left it 17.5 clear. A single word wider than
   the room still reaches the seal, as before (JP-113's named footer item).
2. **(a) A, the row keeps the sun's corner and wraps as a whole.** It starts right of the sun's ink
   at the text's height (54.25 past the column's edge) plus the row's 10. The two strings stand side
   by side while they fit; otherwise the credit drops under the copyright, both right-aligned. At
   360 the seeded *Kai Mercer* row changes: its credit drops, since HEAD's © sits on a ray there.

**Expected after-diff, named before the code.**
- **The seed: 0 of 660 per surface**, themes 0–4, canvas and `live=1`, the `page=2` footer
  included. *Kai Mercer*'s group never reaches a cap (it ends at 143.9 at most, under Retro, against
  caps of 236 or more). Pop's pad of 64.25 is under the seed's own start at 390 (68.75 past the
  column's edge). `flexWrap`, `alignContent`, `paddingLeft`, `maxWidth`, `overflowWrap` and
  `textAlign` move no seeded rect.
- **The harness never renders 360**, so the seed's 360 change is a real-app check.
- **Positive control** (`&name=`, mobile, `arch 0` and `page=2`, per surface):

  | Name | Moves | Files of 30 |
  |---|---|---|
  | *Florence*, *Chemical* | Pop (a), Retro (b) | 4 each |
  | *Featherstonehaugh* | Pop (a + b), Retro, Editorial | 6 |
  | *Supercalifragilistic* | Pop (a) | 2 |
  | *Kai Mercer* | nothing | 0 |

  Lime and Grunge stay at 0, and so does every 768 and desktop render.

**Settled** (2026-10-09).
- **The code** (`EncoreSection.jsx`, `Footer`).
  - **The `s.limeTree` block, (b).** The `wordmark` moved below the seal so it can read the disc,
    at `:29612`–`:29644`. `sealRoom` (`:29621`) is `inX × scale + disc / 2 + 20` at `s.mob` with
    the seal shown, and 0 otherwise. Under it the mark-and-name group takes `maxWidth: calc(100% −
    sealRoom)` and `minWidth: 'min-content'`. The rooms are Pop's 133.6, Editorial's 123.34,
    Lime's 119.5 and Grunge's 125.8.
  - **The same block, (a).** Under `popEnd` (`:29711`–`:29747`) the row takes `flexWrap: 'wrap'`
    and `alignContent: 'center'`. Its `gap` is `0 10px`, the same shorthand at every width, so a
    resize logs no "Removing a style property". Its left padding is `px(64.25)`, and its height
    a `minHeight`. The copyright takes `0 1 auto`, `minWidth: 0`, `textAlign: 'right'` and
    `overflowWrap: 'anywhere'`. Every other template's row is HEAD's.
  - **Retro's body, (b).** `sealRoom` (`:29860`) is `parseFloat(sealPos.right) + sealSize + 20`,
    134 at 390, and its group takes the same two properties.
- **Digest: 0 of 660 per surface on the seed**, themes 0–4, canvas and `live=1`, as named. It ran
  against the HEAD worktree on :5174 from the tree's fresh server on :5177, and the harness had
  been proved first, 0 of 660 per surface, unedited. No label held an empty render.
- **Positive control, as named** (footer, themes 0–4, three widths, `arch 0` and `page=2`): per
  surface, *Florence* 4 of 30, *Chemical* 4, *Featherstonehaugh* 6, *Supercalifragilistic* 2 and
  *Kai Mercer* 0. Lime, Grunge, 768 and desktop are 0, and the canvas and `live=1` alike.
  - **Pop, *Florence*: 2 rows.** The copyright stands on one line from 117.3 to the row's end,
    and the credit drops under it.
  - **Editorial, *Featherstonehaugh*: 3 rows.** The group goes 275.8 → 246.7 and the name 1 → 2
    lines. The rule goes 74.2 → 103.3, and the row keeps the star's 40.2.
  - **Pop, *Featherstonehaugh*: 43 rows.** The group goes 276.1 → 236.4, the row 27.4 → 32, and
    the footer +4.6. The small print moves too.
  - **Retro, *Chemical*: 41 rows.** The group goes 238.5 → 236, the row 31 → 46.2, and the
    footer +15.2.
- **The real app** (:5177). The same walk as *Reproduced* covered Pop cards 1 and 2 and Editorial,
  Retro, Lime and Grunge card 2, with the five names plus *Maximilian Featherstonehaugh Windsor*,
  at 360, 390, 414 and 768. There were no console errors. In the Pop table, "clear of the seal"
  is the glyph box's distance to the disc.

  | Pop, 390 | Name: lines · clear of the seal | Copyright starts · lines | Credit |
  |---|---|---|---|
  | Kai Mercer | 1 · 136.77 | 78.75 · 1 (HEAD) | beside it |
  | Florence and the Machine | 1 · 24.14 | 117.34 · 1 | under it |
  | The Chemical Brothers | 1 · 45.16 | 139.92 · 1 | under it |
  | Maximilian Featherstonehaugh | **2** · 67.17 (HEAD −19.66) | 237 / 216.5 · 2 | under it |
  | Supercalifragilistic | 1 · 60.59 | 156.52 · 1 | under it |
  | …Windsor | 3 · 67.17 | 237 / 142.75 · 2 | under it |

  - **The tester's tests pass.** At 360, 390 and 414 no name's last glyph hits a seal. The seal
    test is valid as the plan states it. No copyright glyph touches the sun's painted path; the
    plan's hit test is vacuous for the sun, since `PopSun` is `pointer-events: none`. HEAD had 3–6
    glyphs per line on it.
  - **The layout.** The copyright's lines end at the row's end, right-aligned, and the credit
    keeps one line. 414 reads 390's row 12 to the right.
  - **The seed at 360** changed as named. The copyright stands from 208.31, and the credit drops
    under it. On HEAD the © sat on a ray. At 360 *Florence* (58.69 clear) and *Chemical* take
    two name lines too, since the room is 30 shorter there.
  - **Editorial**: *Featherstonehaugh* takes two lines at 360–414 (42.05 / 71.88 clear), and
    *Florence* takes two at 360, where HEAD grazed the disc.
  - **Retro**: *Florence* and *Chemical* take two lines at 360–414; *Chemical* is newly wrapped at
    390, as named. *Featherstonehaugh* takes two lines at 18.88 / 48.88 clear.
  - **Lime and Grunge.** Under Lime, *Featherstonehaugh* now wraps at 360, where HEAD left it
    16.67 clear, and *…Windsor* wraps at 360–414. Grunge's cap (`calc(100% − 125.8px)`, read off
    the group) is reached only by a four-word name, which wraps clear by 69.83.
  - **Retro's *Supercalifragilistic* at 360** is the one-word case. It is wider than the room, so
    it keeps HEAD's place, 9.8 clear of the disc.
  - **No footer scrolls a page.** Every section root's own `scrollWidth` was read. The sideways
    scrolls left are all the header's: Editorial 365 / 407 / 419 / 476 / 488, by JP-121's call,
    and Retro 389 / 367 / 426 / 438 / 490 / 502, Retro's layout-2 hero. The footer's text ends at
    the row's end in every case.
  - **768 equals HEAD on all six cards** (names, rules, copyright, credit and discs).
- **1088 Desktop canvas, 768 and the published desktop: unchanged by construction.** Both caps
  and every `popEnd` property are gated on `s.mob`, every other branch is HEAD's, and the positive
  control's 768 and 1180 renders are 0.
- **The editor's Mobile canvas** (Pop, Retro and Editorial card 2, the device tab through
  `pointerdown`) reads the harness's and the tab's 390 to the hundredth, on HEAD and on the tree.
- **Edge cases, harness, against HEAD.**
  - **A hidden seal** (`&cj={"showBadge":"hide"}`) gives HEAD's name back under all five: no cap.
  - **A 34-letter one-word name** leaves the name and the rule exactly as HEAD under all five. Its
    word still reaches the seal, JP-113's named footer item. Pop's copyright with it now stands
    from 86.53, where HEAD began it at 6.3, past the column's edge.
  - **A long typed Small print** under Pop sets four lines from 84.05 with none on the sun. HEAD
    ran four lines from x 10 onto the ink, and broke the credit over three.
- **The sun's ink and the pad.** Mapped row by row (*Reproduced*), the ink reaches 54.25 past the
  column's edge where one to three lines stand, and 59 at the foot. Above the row it stays under
  10. So the 64.25 pad clears every height a grown row can reach.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed.
- **Torn down** before the commit. :5174 and :5177 were stopped and the HEAD worktree removed.
  The probes stayed in the session's scratchpad. :5173, :5175 and :5176 are not this session's.
- **Docs.**
  - The two comments: the `wordmark`'s in both trees, Retro's pointing at Lime's, and the
    `smallPrint`'s Pop paragraph.
  - `notes/footer.md` has a bullet after JP-092's.
  - An *answered* pointer went at JP-092 (rest)'s Settled in `../editorial/retest-qa-fixes.md`.
  - A line went in *Notes for the designer* below.
  - CLAUDE.md, README and `notes/templates.md` state no rule about the footer's name or small
    print, so they are unchanged. The grep was for *small print*, *wordmark*, *PopSun* and
    *JP-092*.

Reply (JP-122): **fixed, for Pop and for every template whose footer has a seal.** At phone
width a long name in the footer now stops before the round seal and wraps onto a second line,
breaking between words. With *Maximilian Featherstonehaugh* it takes two lines and stays about
67px clear of the seal at 390. The decorative line beside it still runs under the seal, as in the
design. The same applies on Editorial and Retro, where the name also reached the seal, and on Lime
and Grunge with longer names.
- **The copyright under Pop's starburst.** The bottom row keeps clear of the starburst. While the
  copyright and *A JustPay Product* fit one line they stand side by side, as in the design.
  Otherwise *A JustPay Product* drops under the copyright, both right-aligned. *© 2026 Florence
  and the Machine* now reads in full, clear of the starburst, on Pop's Hero and Feature spread
  alike.
- **360, which was not checked.** Even the default *Kai Mercer* line reached a ray there, so at
  360 *A JustPay Product* drops under it.
- **What stays the same.** 768 and 1440 do not change, and neither does the default footer at 390
  and 414.
- **Not changed, logged.** A single word wider than the room (34 letters or more) still reaches
  the seal.

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

**Decided** (user, 2026-10-09): **1 A, 2 A, 3 A, 4 A.**
1. **A seeded row keeps its offset until a date is typed into it.** It stays `{ after, kind, price }`,
   and the published page counts it from `max(open, today)`. A row the artist adds is dated by hand.
2. **A past row dims like a booked one** under Lime, Grunge, Editorial and Pop: .38, no strike. This
   reverses 2026-09-17.
3. **A typed date before today gets a line under its row**: "This date has passed, so visitors can't
   pick it."
4. **Clearing a typed date on a seeded row gives the count back.** The row keeps `after` beside a
   typed `date`.

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

**Reproduced** (2026-10-09, HEAD `c0f533d` on :5174). The real app ran Pop, Lime, Grunge, Editorial
and Retro card 2. `SlotsField` was driven through its own inputs (the native value setter and an
input event). Then Publish → Open, and at 1440, 768 and 390 the tab took a trusted click on every
row. Today was 2026-10-09.
- **The seed** publishes OCT 09 / 11 / 17 / NOV 01 under all five templates, and every row picks.
  The tester's OCT 08 … OCT 31 are the same rows one day earlier.
- **Row 1's kind → *Late set*** stores `{ date: '2025-06-12', … }` × 4 in `st`. Every template
  then publishes JUN 12 / 14 / 20 / JUL 05 at all three widths, with `cursor: auto` and no pick.
  The foot stays *Pick a date to enquire*. The price edit and typing the old text back leave
  the same rows.
- **The look.** Under Lime, Grunge, Editorial and Pop the dead rows read opacity 1, the full ink.
  Retro's mute to `rgba(17, 17, 17, .64)`.
- **The panel's boxes read June 2025** before any edit, and nothing warns.
- **The harness** (calendar `arch 1`, themes 0–4, three widths, `live=1&today=2026-10-09`) read
  the triage facts. Its `&cj=` rows were a typed past date (SEP 29), a typed future one (NOV 18),
  an offset row `{ after: 5 }`, and `{ after: 2, date: '2026-10-01' }`. The two past rows are
  handlerless at opacity 1 under themes 1–4, and muted under Retro. The offset row has no date
  on either surface, since HEAD reads `date` alone.

**Settled** (2026-10-09).
- **The code.**
  - **`data.js`.** `slotDate(row, base)` (`:1541`) replaces `slotSeed()`. A trimmed `date` wins
    (null if it does not parse, so the row keeps its place and does not pick). Otherwise an
    integer `after` counts days from `base`. Otherwise the row has no date. `SLOT_KEYS`
    (`:1535`) gains `after`. Since `blankRow` stringifies with `??`, `after: 0` is `'0'`, so a
    seeded row emptied of kind and price keeps its date. The `CAL_SLOTS` comment carries the
    reversal. The `open` hint now says layout 2's seeded dates count from it "until you type a
    date of your own", and from today on the published page once it has passed. The `slots`
    hint (`:2188`) says the same, adding that a cleared date counts again.
  - **`sectionVm`** (`EncoreBuilder.jsx:1698`) resolves `c.slots`, else `CAL_SLOTS`, and dates
    each row by `slotDate(sl, slotBase)` over HEAD's `slotBase`.
  - **`slotsVal`** (`:4310`) returns `CAL_SLOTS` itself. It and `sectionVm` resolve the same
    rows (the repeater rule), and the first edit writes `{ after, kind, price }` out.
  - **`SlotsField`** (`:3312`) takes `open` (`openVal('open')`, BookedField's prop, `:4438`) and
    reads today once per mount.
    - Each box shows `slotDate(g, open)`, the canvas's date.
    - A row counted by `after` prints `slotCountHint()` under it: "The Opens on date, or today on
      the published page once that has passed. Type a date to fix it." Other rows read "N days
      after Opens on, or after today …".
    - A typed date before today prints `PAST_SLOT_LINE` (`role="alert"`, `ERR_LINE`) and rings
      the box red. Both are derived from the stored value and held while the box has focus,
      `UrlInput`'s rule.
    - The ring is the whole `border` shorthand, because a lone `borderColor` logged React's
      "Removing borderColor border" warning when the line cleared. The first walk caught it.
    - **While the box has focus it shows its own value** (`draft`, NameInput's pattern). A native
      date box reports `''` for a cleared or half-typed segment. The first build put the count's
      date back on that keystroke, so Backspace on a seeded row did nothing visible, and an
      invalid step (31 September, a month of 20) refilled the box under the artist's typing. A
      keyboard probe on the headless shell (day-first segments) caught it after the commit.
      Now Backspace empties the box until blur, which shows the count again (4A), and a date
      typed segment by segment never snaps back.
    - **A typed date shows as typed** (`shown`), not as `slotDate` parses it. Chrome's year runs
      to 275760, so a stray digit stores `202655-07-05`, which `parseDate` refuses. Showing the
      parse would leave an empty box that could not be cleared. HEAD showed the raw value too.
  - **`EncoreSection.jsx`**: the Lime tree's `dim` reads `blocked(sl)` at its three sites
    (`:18148`, `:18155`, `:18170`), so a past row takes the booked row's .38. Its comment
    (`:18108`–`:18113`) carries the reversal. Retro's body is untouched.
- **Digest: 0 of 660 per surface on the seed**, themes 0–4, canvas and `live=1`, against the HEAD
  worktree on :5174 from a fresh tree server on :5177. Also **0 of 60** for the calendar at
  `live=1&today=2026-10-09`, since the seed counts from today and has no past row. The harness was
  proved first, 0 of 660 per surface and 0 of 60, unedited. No label held a one-row file. The
  `draft` and `shown` follow-ups came after the digest, and they touch `SlotsField` alone, which
  no harness render draws.
- **Positive control, as named** (the harness's mixed `&cj=` rows, themes 0–4, three widths).
  - Live, themes 1–4: SEP 29 and the dated OCT 01 go from opacity 1 to **.38** on every leaf,
    with no handler.
  - The offset row gains **OCT 14** (today + 5), takes a pointer, and a click prints *Wednesday
    koffset selected*.
  - Retro: the offset row gains its date and its pick. Its past rows keep HEAD's muted colour.
  - Canvas: the offset row reads **JUN 17** (`open` + 5). Nothing else moves, and nothing is
    dimmed or pickable.
- **The real app** (:5177, all five templates' card 2, at 1440, 768 and 390). The walk was the
  tester's steps, then a typed past date, a panel remount, a typed future date, a cleared date,
  remove, add, and an emptied kind and price.
  - **Kind, price and the old text back** keep OCT 09 / 11 / 17 / NOV 01. Every row picks, and
    the foot prints its line (*Friday late set selected*). `st` holds
    `{ after, kind, price }` rows with no `date` key.
  - **A typed SEP 29** publishes dimmed (.38) and handlerless under the four, and muted under
    Retro. The panel warns under it, the line survives *Back to page list* and reopening, and
    the canvas prints SEP 29.
  - **A typed NOV 18** stays put on both surfaces, with no warning.
  - **Clearing SEP 29** gives the count back. The box reads 2025-06-14 again with its count line,
    the canvas reads JUN 14, and the tab reads OCT 11. `st` holds `date: ''` beside `after: 2`
    (4A).
  - **Remove** drops the row, and **Add** prints *Empty slots aren't shown.* and nothing else.
  - **Emptying row 1's kind and price** keeps JUN 12 on the canvas and OCT 09 in the tab, a
    dated row with no kind. The foot reads *Friday selected*.
  - **The canvas keeps June 2025 on the seed.** No console errors, after the border fix (Pop and
    Retro re-walked).
  - **After the `draft` fix**, Pop was re-walked on :5175 (this tree) at 1440 and 390 through the
    native setter, with the same rows. The keyboard probe covered Backspace on a seeded row, a
    date typed by segments, an invalid 31 September fixed to the 29th, which warns after blur
    and clears back to the count, and a 6-digit year shown and cleared. No console errors.
- **Named diffs.** None on the seed. A seeded row the artist edits now keeps counting from today
  on the published page, where HEAD froze it in 2025. A past typed date under Lime, Grunge,
  Editorial and Pop dims. The panel's box for a seeded row still reads the canvas's June 2025,
  with its count line beside it.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed.
- **Torn down** before the commit. :5174 and :5177 were stopped and the HEAD worktree removed.
  The probes stayed in the session's scratchpad. :5173, :5175 and :5176 are not this session's.
- **Docs.**
  - `notes/calendar.md`: the past-row exception rewritten (`:28`–`:31`), the seed's sentence and a
    new paragraph on the edited row, the panel and the warning (`:61`–`:76`), and `SlotsField`
    beside `BookedField` as a reader of the clock.
  - `notes/list-editors.md`: the row shape's `after`.
  - README's calendar passage: the clock's two readers, and the edited seeded row.
  - *Reversed* pointers at `../lime/layout-4-qa-fixes.md` (JP-052's write-out bullet) and at the
    two plan records of the full-ink row, `./layout-2.md` (section 7's notes bullet) and
    `../editorial/layout-2.md` (the sweep's CLAUDE.md pass).
  - **The 2026-09-17 call has no plan record of its own.** Its only sources were commit
    `9590959`'s message, the code comment and `notes/calendar.md` (moved out of CLAUDE.md on
    2026-09-30). All three now state the reversal, the commit by this one.
  - CLAUDE.md names neither rule, so it is unchanged. Its repeater rule holds as written. The
    grep was for `slotsVal`, *first edit*, *full ink*, *past row* and `slotSeed`.

Reply (JP-123): **fixed, on every template.** Editing a date row's text (*Evening* → *Late set*,
or a price) no longer moves its date. The default dates keep counting from today on the
published page, however long after the edit it is opened, and every row can be picked. The
editor keeps showing the design's June dates for those rows, with a line under each saying the
published page counts it from today. A date only stops counting once you type one into the row,
and clearing it makes the row count again.
- **No more silent past dates.** If you type a date that has passed, the editor says so under
  the row ("This date has passed, so visitors can't pick it.").
- **The look.** On Lime, Grunge, Editorial and Pop such a row is now faded on the published page,
  like a booked one. Before, it looked like any other row and just did nothing. Retro already
  faded it.

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

**Settled** (2026-10-09, all seven steps, on `fdbdc7f`, then `67d4356`; the push, the PR, the merge
and the deployed build stamp are the user's).
- **1. Digest against `main`: 15 of 660 on the canvas and 15 of 660 at `live=1`**, exactly JP-124's
  named set, file for file. JP-121, JP-122 and JP-123 add none on the seed, as each *Settled*
  says.
  - **The harness.** A scratchpad worktree of `main` (`d36797f`, `git worktree add --detach`), its
    `source/node_modules` a `cp -Rc` clone with `.vite` removed, served on **:5174**. The tree was
    served fresh on **:5177**. :5173, :5175 and :5176 were left alone. Every category × themes
    **`0,1,2,3,4` explicit** × three widths, canvas and `live=1`, 660 each with the footer's
    `page=2` render. Each file was compared with `localhost:517[0-9]` masked and the photo `?t=`
    stamp normalised. **Proved first:** a second canvas run on each server diffed **0 of 660**
    against its first, and **no file on any label is a one-row (blank) render.**
  - **The 15, the same on both surfaces:** map `arch 1` × themes 0–4 × three widths.
    - **14 files: one row**, the Max travel value `<span>`'s text, *12 mile radius* → *120 mi*.
      Its box is the cell, so nothing else moves.
    - **Retro at tablet: 77 rows**, JP-124's *Settled* to the row. The span 45 → 22.5, its cell
      65.8 → 43.3, the stat row 91.8 → 69.3, the root 771 → 748.5, the right column's map card
      and viewport 22.5 shorter with its rings and pins, and the rows under the stat row 22.5 up.
  - **JP-124's count, corrected.** Its *Settled* and the Status row first said "30 of 660 per
    surface". Map `arch 1` × five themes × three widths is 15 a surface, and its own list (28
    one-row files plus Retro's two) is 30 in all. Both now read 15 + 15.
  - **`&today=`:** the calendar at `live=1&today=2026-10-09`, themes 0–4, three widths, is **0 of
    60**. The seed counts from today and has no past row, so JP-123's dim cannot show there.
  - **`textContent`** (map `arch 0`–`3` × themes 0–4 × three widths, both surfaces, on :5177):
    layout 1 prints *12 mile radius* in 15 of 15 a surface, layout 2 *Max travel 120 mi* in 15 of
    15 and no *12 mile radius*, layout 3 *… 120 mi radius* in 15 of 15, and layout 4 none.
- **2. Every ticket's repro, re-run on the final tree (:5177), reads its entry's after-sink.** Each
  probe was copied from its session's scratchpad and run through `createRequire`, so no file
  landed in `source/scripts/`. Rows went to JSONL sinks, one template per process under
  `perl -e 'alarm N'`. **No page or console error on any run, and no React style warning**: the
  sinks and logs were grepped for `borderColor` and `Removing`, with no hit.
  - **JP-121** (`repro.mjs`, card 2, the five names plus *…Windsor*, the tab at 360 / 390 / 414 /
    768, the burger clicked at 360 and 390). **Pop, Lime, Grunge and Editorial: 24 of 24 rows
    each equal JP-121's after-sink.** Every name clears the capsule and the pill as its table
    says, the pill ends at the row's end, and the burger opens and closes. Retro, which the entry
    did not walk, reads `main` (:5174) row for row (24 of 24). Its bar still pushes the pill to
    426 and 490 and scrolls the page, as named.
  - **JP-122** (`walk.mjs`, Pop cards 1 and 2, then Editorial, Retro, Lime and Grunge card 2, the
    six names, 360 / 390 / 414 / 768). **144 of 144 rows equal JP-122's after-sink** on every key
    it took. The probe has since gained `over`, `textR` and `groupMax`. In every row the name's
    last glyph hits the name, and so does every name line's end. Every copyright line's first
    glyph hits the copyright, and no Pop copyright glyph touches the sun's painted path. The
    footer's text never ends past the page.
    - **Found by the probe, the same on `main`:** Pop card 2's header root reads `scrollWidth` 385
      at 360 and 783 at 768. Card 1's pricing root reads 382 / 411 / 423 at 360 / 390 / 414. Both
      are clipped inside their roots, and the document's `scrollWidth` stays the window's. Not
      chased.
    - **The pages that scroll sideways are the header's:** Editorial 365 / 407 / 419 / 476 / 488,
      by JP-121's call, and Retro 389 / 367 / 426 / 438 / 490 / 502, Retro's bar. The footer adds
      none.
  - **JP-123.**
    - **`repro.mjs`, all five templates' card 2** (seed, kind, price, back, a past date, remount,
      a future date, clear, remove, add, empty; the tab at 1440 / 768 / 390; today 2026-10-09 in
      every tab row): **33 of 33 tab rows and 11 of 11 canvas rows equal JP-123's after-sink
      under each template.** The edited rows publish OCT 09 / 11 / 17 / NOV 01, and each picks.
      A typed SEP 29 dims under the four and mutes under Retro, and clearing it counts again.
    - **`harness.mjs`, the mixed `&cj=` rows** (themes 0–4, three widths): **15 of 15** live rows
      equal the entry's after-sink, and 15 of 15 canvas. `main` reads the entry's HEAD sink, 15 of
      15 on each surface. Live under themes 1–4, SEP 29 and the dated OCT 01 stand at .38 with no
      handler, and the offset row reads OCT 14 and picks. On the canvas the offset row reads JUN
      17, and nothing dims.
    - **`keys.mjs`** (Pop, the date box's keyboard) reads the *Settled*'s `draft` and `shown`
      behaviour step for step:
      - Backspace on a seeded row empties the box until blur, which shows the count again.
      - A date typed by segments never snaps back.
      - 31 September stays empty until the day is fixed to the 29th, then warns after blur and
        clears back to the count.
      - A 6-digit year shows as typed and clears.
  - **JP-124**: step 1's `textContent`.
- **3. Reach: no `in` moved, so `reach.mjs` was not rendered.** `git diff main..HEAD --
  source/src/builder/data.js` changes no `in` row. In Node, both `data.js` files give the same
  `in` and the same `fieldReach(f, name, d)` for all 141 fields × five theme names × four
  designs: 0 differ. The field set is unchanged too. JP-123's `after` is a slot row's key, not a
  field. Earlier sweeps rendered only the rows that moved, and here there were none.
- **4. The real app** (`page-check.mjs`, `BASE=:5177`; Pop card 2 first, then Pop card 1 and
  Lime's, Grunge's, Editorial's and Retro's card 2; one template per process). The tester's
  steps per ticket are step 2's probes, which drive the same app: card 2, the edit, Publish,
  Open, the tab at 1440, 768 and 390. This walk covers the whole page on top of them. **Each
  report equals `main`'s (:5174, the same six runs) in every field but the audio's playback
  position.**

  | Card | Errors · warnings | Links (nav, anchors, footer) | Audio · form | `overflow390` · burger | Footer at 1440 |
  |---|---|---|---|---|---|
  | Pop card 2 | 0 · 0 | 21, each to its section | plays · mailto composed | 0 · opens | 481 |
  | Pop card 1 | 0 · 0 | 22, each to its section | plays · mailto composed | 0 · opens | 481 |
  | Lime card 2 | 0 · 0 | 21, each to its section | plays · mailto composed | 0 · opens | 522 |
  | Grunge card 2 | 0 · 0 | 21, each to its section | plays · mailto composed | 0 · opens | 522 |
  | Editorial card 2 | 0 · 0 | 21, each to its section | plays · mailto composed | 0 · opens | 522 |
  | Retro card 2 | 0 · 0 | 21, each to its section | plays · mailto composed | 0 · opens | 597 |

  Retro's card 2 walk covers the calendar and the map, the two sections it shares with the batch,
  alongside step 2's `repro.mjs` rows (JP-123) and JP-124's harness. Pop card 1 is the footer's
  walk (JP-122's `walk.mjs` rows, and this report).
- **5. The root `index.html`** (`67d4356`, its own commit, after the teardown below).
  `npm run build:standalone` on `fdbdc7f` gives **9,912,242 bytes, up from 9,910,327** (`main`'s
  and the deployed build's size). The repo root was served on :8931, and `build-digest.mjs` walked
  the committed `index.html` (`?v=old`, before the copy) and `source/dist-standalone/index.html`.
  It took the picker, the setup modal's card, then the editor's Desktop, Tablet and Mobile tabs
  under all five templates. **`CARD=1`** walked the batch's layout-2 page and **`CARD=0`** layout
  1's. A second walk of the old build, taken after the new labels, diffed **0 of 15**.
  - **`CARD=0`: 0 of 15.**
  - **`CARD=1`: 15 of 15 files, JP-124's row and nothing else.**
    - **The 1088 Desktop canvas, named:** every Desktop tab's root is 1088 wide, and each
      template's tab moves **one row**, the Max travel value's text. Its cell is 142 under Retro
      and 151.8 under the others, one line on both builds.
    - **The Mobile tabs: one row each**, the same text.
    - **The Tablet tabs: one row each under themes 1–4.** Retro moves 197 rows. Split by
      row, **30 are the map's own** (the root, the card, the left column, the stat row, its cell,
      the span, the right column's card, viewport, rings and pins), and **166 are a rigid −22.5
      shift** with every other column equal: the map's lower rows and every section under it. The
      build digest measures from the header's origin, so the shift does not re-base away. The
      dev digest's 77 rows, seen from the page.
    - JP-121, JP-122 and JP-123 move nothing on either card. Both rules are gated on `s.mob`, and
      the seed's name fits. The canvas keeps June 2025.
    - The modal offers four cards under every template, as before.
  - **Pop card 2 walked on the built file** (`page-check.mjs`, `BASE` the :8931 copy) equals the
    dev server's walk in every field but the audio's playback position.
- **6.** `plans/README.md`'s row says the pass is swept. The replies are below, under the retest
  line. At the sweep (14:08 GMT) the deployed build still read `Thu, 08 Oct 2026 20:39:30 GMT`,
  9,910,327 bytes, which is `main`'s root `index.html` (`a6e3d3a`).
- **7.** *Notes for the designer* are finalised and numbered, two of them. JP-121 and JP-123 add
  none of their own.
- **Named, not fixed, found by the sweep:** none new. Step 2's root `scrollWidth`s are the same on
  `main` and scroll no page.
- **Torn down** before either commit: :5174, :5177 and :8931 were stopped, then the `main` worktree
  was removed (`git worktree remove --force`, its `node_modules` clone with it; `git worktree
  prune`). :5173, :5175 and :5176 are not this session's and still run. The probes and their sinks
  stay in the session's scratchpad.

## Replies

**Retest against the Pages build whose `last-modified` is later than `Thu, 08 Oct 2026 20:39:30
GMT`** (9,910,327 bytes; `curl -sI https://siniiitsa.github.io/js-plus-prototype-2/`). All four
tickets were filed against that build, which was still the deployed one at the sweep. An older tab
or a cached build still shows every one of them. The refreshed build is 9,912,242 bytes: the fixed
build is the one whose `last-modified` reads `Fri, 09 Oct 2026 14:41:46 GMT` (PR #57).

One line per ticket. Each full reply stands under its entry above, as *Reply*.
- **JP-121** (390: a long name over the burger, BOOK NOW off the page) — **fixed** for Pop, and for
  Lime and Grunge with longer names. The name stays centred while it fits, else wraps onto two
  balanced lines and shrinks only as far as it must, and the menu button can be tapped again.
  **Your 07.10 question:** yes, Editorial layout 2 was accepted on 07.10 as a remainder of JP-101,
  and that call stands, so Editorial is left as it is.
- **JP-122** (390 footer: the copyright under the starburst, the name under the seal) —
  **fixed**, for Pop and for every template whose footer has a seal. The name stops before the
  seal and wraps between words. Pop's bottom row keeps clear of the starburst on Hero and Feature
  spread alike. At 360 the default *A JustPay Product* drops under the copyright. A single word of
  34 letters or more still reaches the seal (logged under Pop's first batch).
- **JP-123** (an edited date row moves every date into 2025) — **fixed**, on every template. An
  edited row keeps counting from today on the published page, and every row can be picked. A
  typed date that has passed is flagged in the editor, and on Lime, Grunge, Editorial and Pop it
  is faded on the page, like a booked one.
- **JP-124** (*12 mile radius* on Events Map layout 2) — **fixed**, on every template. Max travel
  reads *120 mi*, matching the page's other 120s, and at 768 it ends 55px clear of *~2 hrs*. The
  design's *100 mi* there went to the designer. Layout 1 keeps *12 mile radius*.

**Logged for new tickets.** Each was found by an entry and left out of this batch on purpose.
1. **Retro's layout-2 390 bar** (JP-121's *Siblings, not filed*): the name sets at 17 between two
   `flex: 1` spacers, so a long name squeezes the burger's capsule from 64 to 38 and pushes the
   pill off the page. *Featherstonehaugh* runs the pill to 426, *…Windsor* to 490. The page
   scrolls at 360–414: 389 / 367 / 426 / 438 / 490 / 502.
2. **Layout 3's centred name at 390** (`HeaderV2`'s `s.limeTree` row, JP-121's *Siblings, not
   filed*): its right cell lets the pill overrun into the spacer, so a long name runs *over* the
   pill under Pop and Editorial. Pop's *Florence* sets 93.9–296.1 against the pill at 245.5.
   Lime and Retro fit. Named in `layout-3.md` section 1 and `notes/nav.md`.

Already logged, so not new: a one-word name of 34 letters or more reaches the 390 footer's seal
(JP-122's edge case) and scrolls the page. It is Pop's first batch's logged item 3. Editorial's
layout-2 390 bar is accepted, not logged (JP-121, decided 1).

---

## Notes for the designer

Gathered as the entries ran, seeded at triage and finalised by the sweep (2026-10-09).

1. **Layout 2's travel card says *Max travel 100 mi*** beside a map whose rings run to 120mi and
   whose data bar reads *UK · 8 pins · 120 mi radius*. On the same page, the header's place card
   claims *120 mi standard travel radius*. The build now seeds *120 mi* in the cell (JP-124, user
   call, 2026-10-09). **If 100 is meant**, the cell, the rings, the data bar and the page's other
   three 120s all have to change together. Layout 1's frame does the same with *12 Mile Radius*
   beside *120 mi standard · further on request*. The build keeps layout 1's *12 mile radius*.
2. **The 390 header and footer frames are drawn for *Kai Mercer*'s ten letters.** No frame shows
   a name that does not fit between the burger and the pill, or a copyright that reaches the
   corner sun (JP-121, JP-122). The build wraps such a name between the burger and the pill and
   keeps the footer's small print clear of the sun. At 360 even the seed's copyright reaches a ray
   of the sun, so the build drops its credit under it there (JP-122, user call, 2026-10-09).
   **If the frame's single line matters at 360**, the sun has to move or shrink there.
