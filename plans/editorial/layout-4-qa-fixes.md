# Editorial layout 4 QA fixes — bug-by-bug plan

Working checklist for the tester's batch against the **Editorial template, layout 4** (card 4 of the
setup modal, *Stacked*): JP-108 … JP-110. It works like
[`layout-3-qa-fixes.md`](./layout-3-qa-fixes.md): **one entry per session, with context cleared
between sessions**, and each session writes what it settled back into this file.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then *How each
session runs* in [`layout-3-qa-fixes.md`](./layout-3-qa-fixes.md) and the files it points at (the
recipe in [`../grunge/layout-3-qa-fixes.md`](../grunge/layout-3-qa-fixes.md), the deltas in
[`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md), *Verification harness* in
[`../retro/qa-fixes.md`](../retro/qa-fixes.md)), then the memory notes `verifying-the-published-tab`
and `browser-tool-choice` (and `figma-frame-reading` for any entry that reads a frame). Then the
section's `notes/` file, which each entry names, and **the call each ticket reverses**, read whole.
[`layout-4.md`](./layout-4.md) holds the Figma node ids of every Editorial layout-4 frame and its Lime
and Grunge twins (*The sections* table, `:254`–`264`; the page is `964:73037` / `971:9537` /
`977:13155`), and its section *Settled* bullets are the fits each entry moves. The shapes the entries
copy:
- JP-102 in [`layout-3-qa-fixes.md`](./layout-3-qa-fixes.md) (entry 3), after JP-092 in
  [`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md): a display name fitted to its widest word on an
  `inline-size` container, `min(ramp, calc(100cqi / s.cardNameEms))`, never broken inside a word, and
  widened from Editorial to every `s.limeTree` template — JP-109;
- the same rule applied to a string that is not the name: `vm.titleWordEms`
  (`EncoreBuilder.jsx:1234`, `navFace` over `vm.title`), which the layout-4 bio's head reads — JP-110;
- JP-105 in [`layout-3-qa-fixes.md`](./layout-3-qa-fixes.md) (entry 4): a ticket whose answer the
  frames disagree on, decided before code, with the designer's half kept in *Notes for the designer*
  — JP-110;
- the layout-4 bio's 390 photo stage (`f74a4ff`, Lime layout 4, user call, 2026-09-18) is the call
  JP-108 reopens; nothing earlier has moved it.

Branch: **`editorial-layout-4-qa-fixes`, forked from `main`** (`e54a3ba`, after PR #51). One commit per
entry (`Fix JP-109: …`). A decision-only entry commits the plan alone.

**Build and reproduction.** None of the three tickets names a build. At triage (2026-10-06) the
deployed Pages build read `Tue, 06 Oct 2026 12:41:04 GMT`, 9,824,192 bytes, which is byte-identical in
size to `main`'s root `index.html` (`6ba9885`, the layout-3 QA refresh). So the tickets were filed
against PR #51's build, and all three causes are in HEAD's code (below). **Nothing was reproduced or
measured at triage.** Every number below is read off the code or the plans, and the session re-takes
it. Each session reproduces first (Editorial card 4, Publish, Open) and records anything that does not
reproduce.

**None of the three is Editorial's alone in code.** Every seam is a `s.v3 && s.limeTree` block, so
Lime and Grunge move with Editorial, and Retro and Pop (Retro's half: Pop has no layout-4 fit) are the
controls. `digest.mjs`'s default list is `0,2,3,4`, which **skips Lime**, so always pass the list
explicitly.

| ID | Where the cause sits | Templates | Digest themes |
|---|---|---|---|
| JP-108 | the bio's `s.limeTree` layout-4 block: at 390 the photograph fills a fixed 400 stage, not the card (`stageH`, the 2026-09-18 call) | Lime, Grunge, Editorial | 0–4 |
| JP-109 | `HeaderV3`'s `s.limeTree` block: the h1 fits the whole column, and at 768 the seal stands inside that column; the fit is Editorial's alone | Lime, Grunge, Editorial (Retro's half: name it) | 0–4, plus `&name=` controls |
| JP-110 | the events map's layout-4 `s.limeTree` stat cell: the value is the flat numeral with `overflowWrap: 'anywhere'` | Lime, Grunge, Editorial (only Editorial is known to break) | 0–4 |

## The report (translated)

> **JP-108 · Mobile 390: the Bio card runs past the photo.**
> Steps: Editorial → Stacked → Publish → Open at 390 → the Bio section.
> Expected: as in `977-13155`, the photo continues under the card with the name and the text, down to
> the card's foot.
> Actual: the photo is cut off at the KAI MERCER line. The rest of the card (≈ 250 px) hangs below the
> photo on the section's ground.
> Checked: with one paragraph of text, as in the design, the card still runs past, so the text's length
> is not the cause. At desktop and tablet all is fine.
>
> **JP-109 · Tablet 768: a long one-word name runs under the seal.**
> Steps: Header → Title = *Maximilian Featherstonehaugh* → Publish → Open at 768.
> Expected: the name is not covered by the seal, as in `971-9537`.
> Actual: the seal covers the tops of the letters "UGH".
> Also checked: at 1440 the name reaches the tags but does not overlap them. At 390 the name fits. A
> name of several words (*Florence and the Machine*) wraps fine.
> This is the same group as JP-086 / JP-092 / JP-102, only for layout 4.
>
> **JP-110 · Events Map, the BASE card: the city breaks in the middle of a word.**
> At 1440 the default value reads MANCHESTE / R, UK, where the design reads MANCHESTER, / UK. A typed
> city breaks too: WOLVERHAM / PTON.
> Cause: `overflow-wrap: anywhere` and a wider face (related to JP-085).
> Question for the designer: the mobile frame itself draws MANCHEST / ER. Is a break like that
> acceptable, or should the value shrink to fit?

Screenshots (the tester's): `971-9537` 768 default name beside the build's 768 long one-word name,
the seal boxed over "UGH"; `977-13155` 390 beside the build's 390, the card's lower ≈ 250 boxed below
the photo; `964-73037` 1440 Base card beside the build's MANCHESTE / R, UK.

## Status

| Order | ID | Report (short) | Verdict | Size | Decision | Status |
|---|---|---|---|---|---|---|
| 1 | JP-108 · JP-109 (scope) · JP-110 | 390 card past the photo · long name under the seal · Base breaks inside a word | **JP-108 a recorded user call** (2026-09-18) whose cost the tester has found; **JP-109 confirmed** (the fit ignores the seal, and is Editorial's only); **JP-110 confirmed, but the frames disagree** (1440 breaks between words, 390 inside one) | — (decisions) | **user: JP-108 A; JP-109 (ii), scope A; JP-110 A, no floor, three templates** (2026-10-06) | **done** (all three reproduced on HEAD; **the 768 seed reproduces JP-109**, E R under the seal; *WOLVERHAMPTON* breaks under Lime and Grunge too; the twins' 390 bios FILL) |
| 2 | JP-109 | Long name under the seal at 768 | **Confirmed, `s.limeTree`**: the shrink term's measure is the column; the seal sits inside it at 768 alone. **The seed's own line reaches it** (663 against the disc's 591), so (ii) | S | **(ii)** the line fit to the room beside the seal, held by a floor, capped by the word fit; **A** (Lime and Grunge widened; Retro's half named) | open |
| 3 | JP-110 | Base value breaks inside a word | **Confirmed, `s.limeTree`**: the numeral is the flat ramp, so `anywhere` is what keeps a wide word inside the cell | S | **A** (widest-word fit, no floor; Lime, Grunge, Editorial; Pop's seed break named) | open |
| 4 | JP-108 | 390 card past the photo | **Confirmed, `s.limeTree`**: the photograph is a fixed 400 band; the panel is content-tall below it | S–M | **A** (the photo fills the card; the 340 stage kept) | open |
| 5 | — | End-of-pass sweep | — | S | — | open |

**Why this order:**
- **The decisions first.** Entry 1 writes no code. JP-108 reverses a user call, JP-110 waits on a
  question the frames themselves cannot answer, and JP-109 has a scope question (Editorial only, or
  every `s.limeTree` template, as JP-102 went).
- **Then by footprint, zero-diff first.** JP-109 moves nothing on the seed if the seed's line clears
  the seal (shape (i); the positive controls are the long names). If it does not, it moves the 768
  header under the fitted themes, still the smallest footprint. *(Entry 1: the seed does not clear.
  Under (ii) the seed moves Editorial's 768 header alone, since Lime's and Grunge's seeds clear the
  seal.)* JP-110
  moves the Base cell under Editorial, 1–3 files a surface. JP-108 moves the 390 bio under three
  templates, geometry, and its photo crop is a visual call the user signs off on.

**"Decision"** means the entry lists options with a recommendation. The session starts by asking
the user (one `AskUserQuestion`, up to four questions) and records the answer under **Decided**
before writing code.

## How each session runs

As [`layout-3-qa-fixes.md`](./layout-3-qa-fixes.md)'s *How each session runs*, with these
differences:

1. The *Evidence* line numbers are from the triage (2026-10-06, `e54a3ba`). Re-check them.
2. **Reproduce first**, on HEAD, in the real app: Editorial **card 4**, Publish, Open, the tester's
   steps at 1440, 768 and 390. Nothing was measured at triage; take the numbers fresh.
3. **Layout 4 has no composed page**, so there is no `&column=` surface. The published desktop still
   **lays out at 1180 and zooms** (`min(w, 1440) / 1180`): a canvas inset of `round(v × 0.82)` is the
   frame's `v` at a 1440 window.
4. **Every seam is the `s.v3 && s.limeTree` block**: themes 1–3 move, and 0 (Retro) and 4 (Pop,
   which renders Retro's layout-4 half) are controls that must not move. Pop layout 3 is open on its
   own branch (`pop-layout-3`), but it does not touch layout 4, so there is nothing to coordinate.
5. **An entry that reverses a recorded call** (JP-108 on a code option; JP-110 if it reverses
   `display-face.md`'s accepted 768 wrap) adds a *reversed* pointer where the call was recorded and
   rewrites any CLAUDE.md, README or `notes/` line that states the old call as a rule. JP-109 adds an
   *answered* pointer where a long-name clip at layout 4 was named, if one was (grep
   `display-face.md`, `layout-4.md` and the two layout-4 QA plans for *Featherstonehaugh* /
   *long name*).
6. **The real app is Editorial card 4**, then Lime's and Grunge's card 4, and Retro's card 4 as the
   control. Under Lime, Grunge and Editorial header arch 4 and 5 fold onto 0 and 1, so a layout-4
   header hit is arch 3 alone.

**Do not refresh the root `index.html` per entry.** The sweep does it once.

---

## Entry 1 — JP-108 · JP-109 (scope) · JP-110: the decisions

One session, no code: one `AskUserQuestion` with four questions (JP-108's option; JP-109's shape;
JP-109's scope; JP-110's option), then **Decided**
written under each ticket below. Reproduce all three first (card 4, Publish, Open), so the questions
carry real numbers. **The first measurement is the seed at 768** (JP-109: does *KAI MERCER*'s line
reach the seal?), because it decides which JP-109 shapes are on the table.

### JP-108 — 390: the bio card runs past the photograph

**Verdict: confirmed, and a recorded user call shared by Lime, Grunge and Editorial.**

**What the page does.** The bio's layout-4 `s.limeTree` block (`EncoreSection.jsx:5903`–`6105`) sets,
at 390 only, `stageH = 400` and `stageOver = 60` (`:5935`–`5936`). The card is content-tall over a
536 floor (`:6040`). Its photograph fills a fixed top band, `top: 0; height: 400px` (`:6050`–`6052`),
and the card pads its top `stageH − stageOver` = 340 (`:6047`), so the glass panel starts 60 above the
photograph's foot. Below 400 the card shows its own well, `s.box3`. Under Editorial the 390 glass is
**opaque** `s.bg`, the section's ink (`:5922`), so the panel reads as hanging on the section's
ground: that is the tester's ≈ 250. Under Lime and Grunge the glass is translucent and blurred, so the
same band shows the well through the glass.

**What the frame does** (`977:13164`, 370 × 536, in Section `977:13157`). The photograph fills the
whole card, and the panel stands at its foot inside a 10 inset, so the photograph shows round the
panel on three sides, down to the card's foot. Read the twins' 390 masters too (`977:8875` Lime,
`977:12052` Grunge) and record whether their photograph is FILL under the glass as well. The comment
at `:6046` (*"its blur carrying the picture's last strip"*) suggests it is.

**The record.** Lime layout 4, `f74a4ff` (2026-09-18), the comment at `:6042`–`6047`: *"At 390 the
content-tall panel covered all but the top ~130 of the photograph, cutting the artist off at the
forehead (user call, 2026-09-18)."* Restated as a named diff at `layout-4.md:1194` (*"The 390 card
keeps Lime's 400 photo stage (a user call), so the card is 733 against 536"*) and
`../grunge/layout-4.md:890`. The tester's one-paragraph check is consistent with this: the panel's
height is not the cause, the photograph's band is.

**Decision.**
- **A (recommended). The photograph fills the whole card at 390 too** (`inset: 0`, as at 768 and
  1440); the 340 top padding stays, so the 2026-09-18 call's clear stage above the panel is kept. The
  photograph then runs under the panel to the card's foot, and under Editorial the 10 gutters round
  the opaque panel show it, which is the frame's look. Costs to measure in the session:
  - the seeded photograph (`editorialStage`, `limeStage`, `grungeStage`) is now cover-cropped to
    about 370 × 733 rather than 370 × 400, so it crops harder at the sides and scales up. Record
    where the subject's face lands, and whether an `objectPosition` (for example `center top`, via
    `Photo`'s `style`, `:1648`) is owed to keep it in the clear stage;
  - under Lime and Grunge the photograph becomes visible behind the whole translucent panel, which is
    what their frames draw if the reading above holds;
  - an emptied slot: `Photo`'s initials placeholder centres in its box, so in a 733-tall box the
    initials fall under the panel. Keep them in the stage (the placeholder box stays 400 tall, or the
    initials are aligned to the top band).
  Root heights unchanged.
- **B. A, under Editorial alone** (`ed && s.mob`). Lime and Grunge keep today's band. Only worth it
  if their frames turn out not to FILL under the glass.
- **C. The frame literally**: the card is a fixed 536, the photograph fills it, the panel at its foot.
  Reverses the 2026-09-18 call: with the seeded two paragraphs the panel covers all but the top ≈ 130
  of the photograph again, the forehead cut the call was made to stop.
- **D. Reply: by design**, citing the 2026-09-18 call.

**Expected after-diff** (bio `arch 3` × 390, canvas and `live=1`): A themes 1–3, 3 + 3 files, the
photograph's box rows only, roots unchanged; B theme 3, 1 + 1; C themes 1–3, roots shorter by
≈ 197 (733 → 536 under Editorial, per `layout-4.md:1194`); D none.

**Docs** (A–C). The comment at `:6042`; *reversed* (C) or *amended* (A, B) pointers at
`layout-4.md:1194`, `../grunge/layout-4.md:890` and the Lime layout-4 bio *Settled* bullet that
records the call; `notes/templates.md` if it states the stage.

**Reproduced** (2026-10-06, HEAD `80543c5`, the real app: card 4 → Publish → Open, the tab at 390,
puppeteer on :5173). Under all three `s.limeTree` templates, as the triage read it:

| 390 | card | photo band | panel (top → foot) | panel past the photo |
|---|---|---|---|---|
| Editorial | 370 × 733 | 0 → 400 | 340 → 723, opaque `#141414` | 323 (the tester's ≈ 250) |
| Lime | 370 × 735 | 0 → 400 | 340 → 725, `#2E3928` at .71, blur 27 | 325, the well `#263020` through the glass |
| Grunge | 370 × 733 | 0 → 400 | 340 → 723, `#DF262C` at .5, blur 27 | 323, the well `#82211B` through the glass |

768 and 1440 fill the card (`inset: 0`, 708 × 720 at 768), as the tester said. **The frames:** all three
390 masters (`977:13164` Editorial, `977:8875` Lime, `977:12052` Grunge, 370 × 536 each, a single
`stage` child) draw the photograph across the whole card, with the panel standing in the 10 inset at its foot. So the
twins FILL under the glass too, and option B has no case. **Option A, tried on HEAD** (the stage
div set to `top: 0; bottom: 0` in the published tab): the seeded photo cover-crops to 370 × 733.
Editorial's singer, Lime's DJ and Grunge's drummer all keep their faces inside the 340 clear stage at
the default `50% 50%`, so no `objectPosition` is owed for the seeds. Grunge's drummer loses the most
at the sides. Not measured: an emptied slot's initials (`Photo` centres them, so a 733 box puts them
under the panel) and `&noimage=1`. Both are entry 4's.

**Decided** (user, 2026-10-06): **A.** At 390, under Lime, Grunge and Editorial, the photograph fills
the whole card. The 340 top padding (the 2026-09-18 call's clear stage) stays. Entry 4 keeps an
emptied slot's initials in the stage and puts the before / after in front of the user. The 2026-09-18
call is **amended**, not reversed: its clear stage survives, and only the photograph's band goes.

### JP-109 — 768: a long one-word name runs under the seal

**Verdict: confirmed, `s.limeTree`.** The scope is the question, not the fix.

**What the page does.** `HeaderV3`'s `s.limeTree` block (`EncoreSection.jsx:3837`–`4110`). The id
block is `containerType: inline-size` under Editorial alone (`:3930`), and the h1 is
`min(s.dispXl, calc(100cqi / s.cardNameEms))` under Editorial, the flat `s.dispXl` under Lime and
Grunge (`:3954`–`3955`). At 768 the id block is the column's whole width (`width: '100%'`, `:3929`,
708 inside the 30 insets). The seal is absolute: at 768 it is 125.37 across, `bottom: 185.46`,
`right: 51.17` (`:4092`–`4097`), so it stands **inside** the column's right ≈ 147 at the height of the
name's last line. A word fitted to 708 (FEATHERSTONEHAUGH) therefore runs under it.

Why only 768: at 1440 the seal hangs from the top (`top: u(168.46)`) and the id block shares its row
with the 344 tag column, so the name ends at the tags (the tester's "reaches the tags but does not
overlap"). At 390 the seal is 85 at `top: 134.35`, far above the floor-anchored name block. Only the
768 seal is anchored from the floor (Retro's reason, `:4085`), level with the name.

**Measure the seed first: it may already reach the seal.** On code alone, the seeded *KAI MERCER*
at the 768 ramp (`s.dispXl` 120, faced) is ≈ 630 on one line (the 390 note at `:3949`–`3952` gives
378.8 at 72). From x = 30 it would end at ≈ 660, and the seal's left edge is ≈ 768 − 51.17 − 125.37
≈ 591. Vertically, the seal spans ≈ 713–838 from the header's top, and the floor-anchored name line
sits near it. So MERCER's last ≈ 65 may sit under the seal on the seeded page today. The tester did
not report it, and `display-face.md`'s step 4 re-measured this header in Gloock, so it may not
reproduce. **The first measurement of entry 1 is Editorial card 4 at 768 on the seed**: the name
line's right edge against the seal's left edge, and their vertical overlap. Then the long name.

`sealReach` below is the seal's left edge measured from the column's right edge, plus a gap. Read it
off `971:9538` (the seal's box, and the name's nearest approach to it in the frame), not the estimate
above.

**Three shapes, chosen by that measurement:**
- **(i) Word fit with the seal's room.** Leave the text box at `100cqi` and change only the shrink
  term: `min(ramp, calc((100cqi − sealReach) / s.cardNameEms))` at 768 alone. A single word wider
  than the room beside the seal shrinks to clear it. The seed is unmoved, but **a whole line is not
  fitted**: if the seed's line runs under the seal, it still will, and so will a two-word line such as
  *Kai Featherstone*. Enough only if the seed clears.
- **(ii) Whole-line fit at 768.** `vm.navNameEms` already exists (`EncoreBuilder.jsx:749`, the brand
  on one line in the same ems). `min(ramp, calc((100cqi − sealReach) / s.navNameEms))`, with the word
  fit still the floor for a name that wraps. The seed stays on the frame's one line and shrinks just
  enough to clear the seal (≈ 10% if the estimate holds). A long multi-word name shrinks a lot before
  it wraps, so combine it with (i) as `max` of the two terms, or cap it, and measure *Florence and
  the Machine*.
- **(iii) Box the h1 to the column less the seal**, with the word fit inside it. The seed wraps to
  two lines at 768, as it already does at 390 (accepted, `display-face.md` step 4, layout 4). Simple,
  and it covers every line, but it departs from the frame's one line.

If the seed clears the seal, (i) is the fix, and the multi-word overrun is a residual for the designer
(note 2). If it does not, (i) is not enough, and the user picks between (ii) and (iii) with the
numbers in front of them.

**Scope.** JP-102 widened the layout-3 fit from Editorial to every `s.limeTree` template. Here Lime
and Grunge use the flat `s.dispXl` (Bebas / Anton, 120 at 768). Probe their 768 renders with
*Maximilian Featherstonehaugh* before asking: if the word runs past the column or under the seal there,
the widening is owed. Grunge's name is `inline` and `twoTone` at every width (`:3955`): check
that the fit holds on its one-line spelling.

**Decision.**
Two questions, asked once the seed is measured: the shape ((i), (ii) or (iii) above), and the scope:
- **A (recommended). Widened to Lime and Grunge**: the `inline-size` container and the fit at every
  width under all three, as JP-102 did, with the seal's room at 768 alone (the twins' seal boxes are
  Lime's). Retro's half (Retro and Pop) is named, not fitted, as JP-102 named it.
- **B. Editorial alone.** Lime and Grunge keep the flat ramp.
- **C. Reply.** Not recommended: the frame does not overlap, and the tester's case is real.

**Expected after-diff, conditional on the seed measurement.** If the seed clears and (i) is taken: **0
files** on the seed under every theme (the canvas and `live=1`). If (ii) or (iii): header `arch 3` ×
768 × the fitted themes, the h1's rows (and under (iii) its height), on the seed. In every case, with
`&name=` (JP-102's controls: *Maximilian Featherstonehaugh*, *Supercalifragilistic*, *Florence and the
Machine*, *Kai Mercer*), header `arch 3` × 768 × the fitted themes, and under A Lime's and Grunge's
long names at 1440 and 390 too, wherever the flat ramp outran the column.

**Docs.** The comment at `:3943`–`3953`; `vm.cardNameEms`' comment (`EncoreBuilder.jsx:750`–`759`)
names HeaderV3; the `display-face.md` / `layout-4.md` long-name line, if one exists, gets the
*answered* pointer.

**Reproduced** (2026-10-06, HEAD `80543c5`, card 4 → Publish → Open; *Title* written through `st`,
republished; seal spin stopped with reduced motion). **The seed reproduces at 768.** Under Editorial,
*KAI MERCER* sets one line at the faced ramp, 103.47px, from x 30 to **663.3**. The seal's disc
(125.37, centre 654.1 / 775.9 from the header's top) has its left edge at **591.4** and spans
713–839 vertically, and the name's line box spans 763–887. So the disc covers the tops of the E and
R (the shot shows the seal over them). The tester did not report it. **The frame `971:9538`**:
the disc spans x 592–716, centre 654 / 775, so ours stands exactly where the frame's does. The
frame's name ink ends at **536**, 56 short of the disc, because Fisterra sets *KAI MERCER* ≈ 506 wide
where Gloock sets 633: the 25% is the whole bug. So `sealReach` = 738 − 591.4 ≈ **146.6** plus a gap.

Widths are the tab's own px. At 1440 they are zoomed ×1.2203, the column 983.7 wide and ending at 1039.8.

| Name | Theme | 1440 | 768 | 390 |
|---|---|---|---|---|
| *Kai Mercer* (seed) | Editorial | 142.1, fits | 103.5, ends 663: **E R under the seal** | 61.9, two lines (accepted), fits |
| | Lime | 164, fits | 120, ends 464, clear | 72, fits |
| | Grunge | 121.5, fits | 71.25, ends 345, clear | 39, fits |
| *Maximilian Featherstonehaugh* | Editorial | 69.2 (fitted), ends 1033, fits | 60.8 (fitted), ends 733: **U G H under the seal** | 30.1, fits |
| | Lime | 164 flat: ends **1370**, over the chips | 120 flat: ends **818**, under the seal and off the page (clipped) | 72 flat: ends **493**, off the page |
| | Grunge | 121.5 flat: ends **1207**, over the chips | 71.25, ends 583, 8 clear | 39, fits |
| | Retro (control) | fits | 77 flat: ends 687, **U G H under the seal** | fits |
| *Kai Featherstone* | Editorial | fits | 89.7 (fitted), ends 733: **O N E under the seal** | fits |
| *Supercalifragilistic* | Editorial | fits | 61.6, ends 731: under the seal | fits |
| *Florence and the Machine* | Editorial | fits | 103.5, three lines, the last (*Machine*) ends 519, clear | fits |

The 768 seed is the only seal hit on the seed under any theme (Retro and Pop clear it too). The
shapes, tried on HEAD at 768 by restyling the h1 in the tab:
- **(ii)** `font-size: calc(546px / 6.12)`, where 6.12 = 633.3 / 103.47 is the line's ems and
  546 ≈ 708 − 146.6 − 16. The seed sets **89.2**, one line, ending at **576.1**, 15 clear of the disc.
  The id block is 11 shorter and nothing else moves.
- **(iii)** the h1 boxed to 546: *KAI / MERCER* on two lines at 103.47. The id block is +80 tall, and
  since it stands on the floor, the kicker and the portrait arch (580.8 → 500.6) rise 80. Nothing
  overlaps.

So (i) is out: it leaves the seed's E R under the seal.

**Decided** (user, 2026-10-06): **shape (ii), scope A.**
- **(ii)**: at 768 the whole line is fitted to the room beside the seal, so the seed stays on the frame's
  one line at ≈ 89. A name too long for one line wraps at a floor instead of collapsing, with each word
  fitted to the room. *Florence and the Machine*'s line is ≈ 15 ems, so a pure line fit would set it at
  ≈ 37. **Note for entry 2:** `max(line fit, word fit)` is *not* that combination. `room / lineEms ≤
  room / wordEms` always holds, so the `max` is the word fit, which is (i). The combination is
  `min(ramp, calc(room / wordEms), max(calc(room / lineEms), floor))`: the line fit, held up by a
  floor, and capped by the word fit and the ramp. Entry 2 picks and records the floor (a fraction of
  the ramp or a px), and measures the multi-word residual against it.
- **A**: Lime and Grunge get the `inline-size` container and the word fit at every width, as JP-102
  did. Lime's long name overruns at all three widths and Grunge's at 1440. The seal's room applies at
  768 under all three (the twins' seal boxes are Lime's). Lime's and Grunge's seeds clear the seal
  (464 / 345 against 591), so the line fit is a no-op on them.
- **Retro's half** (Retro, Pop) is named, not fitted. Retro's flat 77 puts the long name's U G H under
  the 768 seal. It goes in *Notes for the designer*, note 3.

### JP-110 — the Base card breaks its value inside a word

**Verdict: confirmed, `s.limeTree`; the frames disagree on the answer.**

**What the page does.** The events map's layout-4 `s.limeTree` block (`EncoreSection.jsx:22404`ff.).
Each stat cell is a flex column padded 18 / 20 (`:22540`–`22547`). The value is `s.display` at the flat
`numeral` (`s.dispSm` faced, lh 1, at 1440 and 768; 23 faced at 390 under Editorial, `:22433`–`22435`)
with `overflowWrap: 'anywhere'` (`:22554`), uppercased and lifted 0.07em under Editorial. Gloock is
wider than the frame's Fisterra Fora (JP-085's stand-in), so *MANCHESTER,* does not fit the 1440
cell's content box, and `anywhere` breaks it, MANCHESTE / R. The comment at `:22560`–`22561`
already accepted the seed's two lines at 768 (*"306 in its 276"*) without saying where the break
falls. `vm.mapStats` (`EncoreBuilder.jsx:1778`) carries no width. The value has been the artist's
since JP-077 · JP-078, so *WOLVERHAMPTON* is a real input.

**What the frames do.** `964:73110` (1440) sets *MANCHESTER, / UK*, a break **between** words.
`977:13475` (390) sets *MANCHEST / ER*, a break **inside** the word, in the frame's own face. So the
designer's own frames give no single rule, and the tester's question is real. Read both, and `971:9608`
(768), and record each frame's break and the cell's content width.

**Measure in the session**, at 1440, 768 and 390, under Editorial, Lime and Grunge: each cell's
content width; *MANCHESTER,*, *MANCHESTER, UK* and *WOLVERHAMPTON* at the faced numeral. Lime's Bebas and
Grunge's Anton are narrow, so they may never break; if so, say so and keep them as controls.

**Decision.**
- **A (recommended). The value fits its widest word**, JP-102's rule: a per-row widest-word ems in
  `sectionVm` (`navFace` over each `mapStats[].value`, beside `vm.titleWordEms`), `containerType:
  inline-size` on the cell, and the value's size `faced(s, min(s.dispSm, calc(100cqi / ems)))`, and
  `faced(s, min(23px, …))` at 390 under Editorial. CSS only, no effect. `faced()` goes **outside** the
  `min()` on the unfaced token, as in every other fit in this family (HeaderV2's JP-062 note, the bio
  head at `:5967`): `numeral` is already faced, so `min(numeral, …)` would compare a faced size with
  an unfaced one. `overflowWrap: 'anywhere'` stays as the last resort for a word with no table entry. The
  value wraps between words and never inside one, which is what every other display fit in this family
  does (JP-086, JP-092, JP-102, and the bio head's `titleWordEms`). At 1440 the seed gets the frame's
  *MANCHESTER, / UK*; at 390 it departs from the frame's MANCHEST / ER on purpose. Risk to name: no
  floor, so a very long word in a 159-wide 390 cell sets small. Measure *WOLVERHAMPTON* there. Under
  Lime and Grunge the fit is a no-op on the seed if the measurements above hold.
- **B. Park for the designer** (JP-105's first round): a reply that names the two frames'
  disagreement, the question in *Notes for the designer*, no code.
- **C. Wrap between words only** (`overflowWrap: 'normal'`) with no fit: a word wider than the cell
  overruns the cell's dashed edge. Not recommended.

**Expected after-diff** (map `arch 3`, canvas and `live=1`): A theme 3 at each width where the seed's
widest word outruns its cell (1440 known, 768 and 390 to measure), 1–3 files a surface, the value's
span rows and possibly the cell's height (a two-line value is still two lines); themes 1–2 only if
they break today. B and C: B none; C the same files as A.

**Docs.** The comment at `:22556`–`22561`; `display-face.md`'s step-4 layout-4 line on the seed's 768
wrap gets a pointer if A changes it; `notes/map.md`'s stat-wall paragraph.

**Reproduced** (2026-10-06, HEAD `80543c5`, card 4 → Publish → Open; the stats written through `st`
with the Base value replaced). **Units:** at 1440 a line's width is the tab's zoomed px, while the
cell's content box (`clientWidth` − padding) is the 1180 layout's. The zoomed content box is 208.2 ×
1.2203 = **254**. The Base cell's content box is **254** (zoomed) at 1440, **276** at 768 and **119** at
390, the same under all five themes to 1px.

| Value | Theme | 1440 | 768 | 390 |
|---|---|---|---|---|
| *Manchester, UK* (seed) | Editorial (35.78 zoomed / 34.81 / 22.24) | **Manchest / er, UK** | Manchester, / UK (between words, accepted) | **Manches / ter, UK** |
| | Lime (Bebas 41 / 40 / 26) | Manchester, / UK | one line | Manchester, / UK |
| | Grunge (Anton 30.75 / 30 / 19.5) | one line | one line | Manchester, / UK |
| | Retro (control) | Manchester, / UK | one line | Manchester, / UK |
| | Pop (control, Retro's half) | **Mancheste / r, UK** | one line | **Manchester / , UK** |
| *Wolverhampton* | Editorial | **Wolverha / mpton** | **Wolverhampt / on** | **Wolverh / ampton** |
| | Lime | **Wolverhampto / n** | one line | **Wolverhampt / on** |
| | Grunge | one line | one line | **Wolverhampto / n** |

The tester's MANCHESTE / R is one glyph off ours. The break point moves with the face's shaping, and
the defect is the same. **The frames:**
- `964:73110` (1440): the cell is 294, content 254, and it sets *MANCHESTER, / UK*, with
  MANCHESTER, inked ≈ 248.
- `971:9608` (768): it sets *MANCHESTER, UK* on one line in the 276.
- `977:13475` (390): the cell is 159, content 119, and it sets *MANCHEST / ER, UK*, inside the word, in
  the frame's own face.

So the premise that Lime and Grunge "may never break" is false for a typed value. *WOLVERHAMPTON*
breaks under both, so the fit covers all three `s.limeTree` templates.

**What A sets** (Gloock's ems from the 768 widths: *MANCHESTER,* ≈ 7.15, *WOLVERHAMPTON* ≈ 9.47):

| Value | 1440 (layout px) | 768 | 390 |
|---|---|---|---|
| Seed | 29.32 → 29.13, *MANCHESTER, / UK* as the frame | 34.81, unchanged | 22.24 → **16.65**, *MANCHESTER, / UK* |
| *Wolverhampton* | 29.32 → 22.0 | 34.81 → 29.1 | 22.24 → **12.6** |

That 12.6 is the cost of having no floor: it is smaller than the cell's sub line. Lime's and Grunge's
seeds are unmoved.

**Decided** (user, 2026-10-06): **A, under Lime, Grunge and Editorial, no floor.**
- The value is fitted to its widest word, JP-102's rule: a per-row widest-word ems in `sectionVm`
  beside `vm.titleWordEms`, `containerType: inline-size` on the cell, and
  `faced(s, min(token, calc(100cqi / ems)))` with `faced()` outside the `min()`.
- `overflowWrap: 'anywhere'` stays as the last resort for a word with no table entry.
- At 390 the seed departs from the frame's MANCHEST / ER on purpose.
- Pop's seed break (Retro's half, the same `anywhere` at `:22806`) is named as a residual in *Notes for
  the designer*, note 4, not fitted.
- Note 1's question is answered by this call. The designer is told what was done, and why.

---

## Entry 2 — JP-109: the seal-aware name fit

**Read first**: JP-102 in [`layout-3-qa-fixes.md`](./layout-3-qa-fixes.md) (entry 3, whole) and JP-092
in [`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md); [`layout-4.md`](./layout-4.md) section 1's
*Settled*; `notes/templates.md` (header families); [`display-face.md`](./display-face.md) step 4,
layout 4.

As entry 1 decides. Read `sealReach` off `971:9538`. Prove the seed at 0 files first, then the `&name=`
controls. In the real app: card 4 under Editorial, Lime, Grunge and Retro, *Maximilian
Featherstonehaugh* typed into *Title* and republished, the tab at 1440, 1180, 1024, 820, 768, 744 and
390. At each width, no glyph under the seal, no word broken inside itself, no sideways scroll. Record
the multi-word residual's probe.

**Settled**: —

## Entry 3 — JP-110: the Base value

**Read first**: `notes/map.md`; [`layout-4.md`](./layout-4.md) section 6's *Settled*; Grunge's JP-077 ·
JP-078 entry in [`../grunge/layout-4-qa-fixes.md`](../grunge/layout-4-qa-fixes.md) (the stat wall
became the artist's); `vm.titleWordEms` and `navFace` in `EncoreBuilder.jsx`.

As entry 1 decides. If A: the per-row ems in `sectionVm`, the cell's container, the size. No field
changes, so `reach.mjs` is not owed. In the real app: card 4, *Map* → *Stats* → the Base card's value
set to *Wolverhampton*, *Manchester, UK* and a 20-letter word, at 1440, 768 and 390. Record that no
value breaks inside a word, and each fitted size.

**Settled**: —

## Entry 4 — JP-108: the 390 photograph

**Read first**: [`layout-4.md`](./layout-4.md) section 2's *Settled*; Lime layout 4's bio *Settled*
and `f74a4ff`'s message; `notes/photography.md` (the seeds, `null` against absent).

As entry 1 decides. Screenshot the 390 card under Editorial, Lime and Grunge before and after, with
`&noimage=1` too. Put the before / after pair in front of the user before committing: where the face
lands is a visual call. Check that the 768 and 1440 cards are byte-identical in the digest.

**Settled**: —

## Entry 5 — the end-of-pass sweep

As [`layout-3-qa-fixes.md`](./layout-3-qa-fixes.md)'s entry 8, with no `&column=` surface. The digest
against `main` (themes 0–4, three widths, canvas and `live=1`, the footer's `page=2` render included)
must equal exactly the union of the named after-diffs. Then `reach.mjs` (none expected: no field
moves); the real app on card 4 under all five templates; the root `index.html` refreshed
(`cp source/dist-standalone/index.html index.html`); `plans/README.md`'s row; a reply line per ticket;
and the designer's notes.

**Settled**: —

## Replies

Written at the sweep, by ticket, under a retest line that names the deployed build to retest against.

## Notes for the designer

Written as each entry settles. Two are already known to be wanted:

1. **The Base card's long value** (JP-110). The 1440 frame breaks *MANCHESTER, / UK* between words,
   and the 390 frame breaks *MANCHEST / ER* inside the word. Is a break inside a word acceptable, or
   should the value shrink to fit its widest word? (The tester's question, verbatim in substance.)
   *Entry 1 (user, 2026-10-06): answered by a fit to the widest word, with no floor. At 390 the seed
   sets MANCHESTER, / UK at 16.65 rather than the frame's MANCHEST / ER at 23, and a long city such
   as WOLVERHAMPTON sets at 12.6. The note tells the designer this, and asks whether a floor is
   wanted.*
2. **A long name beside the 768 seal** (JP-109's residual). The frame gives the name the full column,
   and the seal stands in its right ≈ 150 at the name's height. Should a multi-word line stop short
   of the seal, as a single word now does? *Entry 1: under (ii) the line is fitted to the room beside
   the seal down to a floor, and only below the floor does a name wrap. So the residual is the wrapped
   name's lines, which entry 2 measures.*
3. **Retro's half at 768** (JP-109, named, not fitted). Under Retro (and Pop, which renders Retro's
   layout-4 header) a long one-word name at the flat 77 runs under the 768 seal: *Maximilian
   Featherstonehaugh*'s U G H, ending at 687 against the disc's 591.
4. **Pop's Base value** (JP-110, named, not fitted). Retro's half keeps `overflowWrap: 'anywhere'`,
   and Pop's Titan One breaks the seed MANCHESTE / R, UK at 1440 and MANCHESTER / , UK at 390.
