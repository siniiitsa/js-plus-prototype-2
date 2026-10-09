# Pop layout-4 QA fixes — JP-127 · JP-128

The tester's batch against the **Pop template, layout 4** (card 4 of the setup modal, *Stacked*):
JP-127 and JP-128. It works like [`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md): **one entry per
session, with context cleared between sessions**. Each entry opens on the user's call, and each
session writes what it settled back into this file.

**Both tickets are recorded calls, not regressions.** The layout-4 pass named each one and left it
in place:
- JP-127 is open question 10 in [`layout-4.md`](./layout-4.md). JP-091's scope keeps the layout-4
  capsule's wrap, and JP-114 · JP-115 gated their 11px floor to layout 1.
- JP-128 is open questions 15 and 16 in the same file. Settled §4 and §5 put each sticker behind its
  head, following layout 3's *a sticker the frame seats beside its own short copy*.

So every entry here **reverses a recorded call**. It adds the *reversed* pointers that
[`qa-fixes.md`](./qa-fixes.md)'s *How each session runs*, step 5, asks for. Each ticket's **Docs**
names those pointers.

**Read first, every session:**
- [`CLAUDE.md`](../../CLAUDE.md), then this file.
- *How each session runs* in [`qa-fixes.md`](./qa-fixes.md) (`:191`) and the files its read-first
  line points at.
- The memory notes `verifying-the-published-tab` and `browser-tool-choice`, plus
  `figma-frame-reading` for an entry that reads a frame.
- The section's notes file: [`notes/nav.md`](../../notes/nav.md) for JP-127 and
  [`notes/gallery.md`](../../notes/gallery.md) for JP-128. There is no `notes/repertoire.md`, so
  the repertoire's record is [`layout-4.md`](./layout-4.md) *Settled in section 5* alone.
- **The call each ticket reverses, read whole:**
  - JP-127: `layout-4.md` *Settled in section 1* (the links bullet, `:1398`) and open question 10
    (`:2826`), and `qa-fixes.md` JP-114 · JP-115 (`:1246`–`:1512`), whose measure and options this
    entry copies.
  - JP-128: `layout-4.md` *Settled in section 4* (`:1691`; the sun bullet `:1757`) and *Settled in
    section 5* (`:1816`; the starburst at `:1858`), open questions 4, 15 and 16 (`:2806`,
    `:2858`, `:2864`), and the *Conventions* bullet at `:1074`. In `layout-3.md`, read decision 2 (uppercase
    at every width) and the *Conventions* bullet at `:864`.

[`layout-4.md`](./layout-4.md) *The Figma source* and *The sections* (`:240`–`:322`) hold every
node id. The page is `964:73127` / `971:10835` / `977:14267`. The header is `964:73128` /
`971:10836` / `977:14268`. The gallery is wrapper `964:73173` / `971:10859` / `977:14537`, with its
head `964:73174` / `971:10860` / `977:14538`. The repertoire is Section `964:73215` / `971:10895` /
`977:14574`, panel `964:73216` / `971:10896` / `977:14575`.

Branch: **`pop-layout-4-qa-fixes`, forked from `main`** (`6c989b7`, after PR #59). One commit per
entry (`Fix JP-127: …`), then the sweep, which refreshes the root `index.html`.

**Build and reproduction.** Neither report names a build. `main`'s root `index.html` is PR #59's,
with the layout-3 QA fixes. Neither ticket's code was touched after the layout-4 pass's sweep
(`0a5fe0b`). So every cause is in HEAD's code, and the tester's numbers match HEAD's harness (below).

**Reproduced in the harness at triage** (2026-10-09, `6c989b7`, the user's dev server on :5173; a
puppeteer probe in the session's scratchpad, `triage.mjs`; harness coordinates are in layout px):

- **JP-127** (`cat=header&arch=3&w=desktop`):

  | Theme | Nav width | Rows | Links' size | Note |
  |---|---|---|---|---|
  | 4 Pop | 702.2 | **2** (*Reviews* alone) | 12px (the floor) | the bar holds 60.64; the wrap is inside it |
  | 4 Pop, `&nav=8` (the first eight: *Reviews* dropped, *Availability* kept) | 702.2 | 1 | 12.52 | eight links fit; **not** the frame's eight |
  | 3 Editorial | 680.5 | **2** | 12px | the same wrap, named in `layout-4.md` |
  | 1 Lime · 2 Grunge | 754.9 · 788.3 | 1 | 20 · 16 | controls |
  | 0 Retro | 940.3 | 1 | 16 | its own bar |
  | 4 Pop, *Florence and the Machine* | 535.3 | 2 | 12 | no name fit at layout 4 |
  | 4 Pop, *Maximilian Featherstonehaugh* | 470.4 | 2 | 12 | |
  | 4 Pop, *Supercalifragilistic* | 589.3 | 2 | 12 | |

  The tester's figures are these numbers × 1.22 (the 1180 layout zoomed to a 1440 window). Their
  857 of room is 702.2 × 1.22. Their ~865 of need is ~709 in layout px. The pass measured the row
  at 733.6 with its spare (open question 10), and the session re-measures it.
  **1280 and 1366 are the same 1180 layout zoomed** (`min(w, 1440) / 1180`), and so is everything
  up to 1920, where only the gutters grow. One measurement answers the tester's "not checked".

- **JP-128** (`arch=3&theme=4`; x in the section root's coordinates; the sticker's box is its turned
  bounding box, and the disc's ink starts inside it):

  | Site | Head's ink | Sticker's box | Sticker's ink (pass's read) | Frame's mixed-case ink ends |
  |---|---|---|---|---|
  | gallery 768 | one line, 30 → **641** at 49.98 | sun 563 → 768 (205 square) | disc from ~588 | 582.5 |
  | gallery 390 | SNAPS FROM THE 10 → **323**; NIGHT 10 → 121, at 35.28 | sun 282 → 487 | disc from ~306 | 295.2 |
  | repertoire 390 | REPERTOIRE 40 → **268** (panel x 30 → 258) at 35.28 | starburst 259 → 364 (panel 249 → 354) | its left point at 249.3 | 229.4 (panel) |
  | gallery 1440 | three lines, ends 444 | sun 356 → 524 | — | (capitals; covers nothing) |
  | repertoire 768 · 1440 | ends 402 · 579 | starburst 590 · 1003 | — | (187 and 424 short) |

  Both stickers are `zIndex: -1`. That is the layout-4 pass's call, so the letters paint over them,
  which is what the tester's shots show. The tester's 768 *x 30–641* is the first row exactly.

| ID | Where the cause sits | Templates | Digest themes |
|---|---|---|---|
| JP-127 | `NavBar` (`EncoreSection.jsx`): `floor` is `pop && s.v0 && …`, and the desktop name `fit` is `… && s.v0`. In layout 4's capsule nothing gives way, so nine Titan links at the 12px floor wrap | Pop. Editorial's layout-4 capsule wraps the same way through its own `links` clamp: named, and a scope question | 0–4, plus `&name=` |
| JP-128 | the layout-4 `s.limeTree` blocks of `Gallery` (`if (s.v3)`, the head after `from`) and `Repertoire` (`if (s.v3)`, after `jump`): under `pop` the head is fitted to its widest word in the full column, and the sticker stands behind it at `zIndex: -1` | Pop alone (no other template draws these stickers) | 0–4, plus `&cj=` long headings |

## The report (translated)

> **JP-127 — Desktop: the header's menu wraps onto a second row, even with the default name.**
> Steps (UI): Pop → Stacked → Publish → open the published page at 1440. The name is the default,
> *Kai Mercer*. Expected: the whole menu on one row, as in design `964-73127`. Actual: REVIEWS drops
> to a second row under ENQUIRIES, and the header's capsule gets taller. The items need ~865 px, and
> there is 857 px of room. Likely cause: the wider Titan One face (JP-111), and the extra
> AVAILABILITY item (accepted by a decision on 23.09). Without AVAILABILITY the menu fits. Related:
> JP-115. There the layout-1 menu wrapped only with a long name, so its fix may not reach layout 4.
> Not checked: widths 1280 and 1366.
>
> **JP-128 — Tablet and mobile: the section heads run onto their stickers.** Steps (UI): Pop →
> Stacked → Publish → the published page at 768, the Gallery section. Expected: a gap between the
> head and the sticker, as in designs `971-10835` and `977-14267`. Actual: at 768, the heading SNAPS
> FROM THE NIGHT spans x 30–641, and the letters HT lie over the blue smiley. At 390, THE in the
> Gallery and the last E in the Repertoire touch their stickers.

Screenshots (the tester's):
- `964-73127`'s capsule (eight links on one row) beside the published 1440 (nine, REVIEWS on a
  second row).
- `971-10835`'s 768 gallery head (*Snaps from the night*, mixed case, ending before the sun) beside
  the build's (NIGHT over the sun).
- `977-14267`'s 390 gallery and repertoire heads beside the build's (THE and RE over their
  stickers).

**Two corrections to the report, for the replies:**
- **The capsule does not grow.** Its height stays 60.64 (73.98 in a 1440 tab), and the second row
  sits inside it. The pass measured this (`layout-4.md` `:1393`). Re-check it on the published tab
  before the reply repeats either claim.
- **The *Availability* call is 2026-09-18** (`notes/nav.md:25`): a ninth link for the calendar,
  which no frame's nav draws. The tester's *23.09* is most likely JP-039 reopened (the nav's
  Full / Minimal mode, 2026-09-23). The reply should name the right call.

## Status

| Order | ID | Report (short) | Verdict | Size | Decision | Status |
|---|---|---|---|---|---|---|
| 1 | JP-127 | nine links wrap REVIEWS at desktop, on the seed | **Confirmed, and recorded** (open question 10; JP-091's and JP-114's scope) | S (a gate), M with the name fit | **user**, after measuring: **B** (the 11 floor and the name fit), **Pop alone** | **done** |
| 2 | JP-128 | 768 and 390 heads over their stickers | **Confirmed, and recorded** (Settled §4 and §5; open questions 15 and 16) | S–M | **user**: the lever (A / B / C / D), and at 768 whether the gallery head wraps or shrinks | todo |
| 3 | — | End-of-pass sweep | — | S | — | todo |

**Why this order.** JP-127 is the smaller change, with the most precedent: JP-114 · JP-115's
measure, options and probe carry over almost whole, and on lever A its footprint is one file per
surface. It runs first, so the batch's harness and HEAD worktree are proven on a one-file diff.
JP-128 touches two sections and may need a new view-model key (lever B). It runs second. Neither
entry reads anything the other moves.

## How each session runs

As `qa-fixes.md`'s *How each session runs* (`:191`), with these differences:

1. The *Evidence* line numbers are from the triage (2026-10-09, `6c989b7`). Re-check them. Cite
   branches by id or gate, never by line number alone: the file is ~30,100 lines.
2. **Reproduce first, on HEAD, in the real app.** Use Pop **card 4** (template → card 4 → *Use this
   header*), then Publish → Open, at 1440, 768 and 390. Then use the harness at the ticket's width.
   The triage measured only the harness.
3. **Layout 4 has no composed page**, so there is no `&column=` surface. The published desktop
   lays out at 1180 and zooms (step 3 in `qa-fixes.md`). The editor's Desktop canvas is **1088** in
   a 1440 window. JP-114 found its own rule firing differently there, so JP-127 reads 1088 too.
4. **Long names go through `&name=`** in the harness, and through the fiber `st` dispatch in the
   real app. The set is *Kai Mercer*, *Florence and the Machine*, *The Chemical Brothers*,
   *Maximilian Featherstonehaugh* and *Supercalifragilistic*. **Long headings go through `&cj=`**
   (`{"heading": …}`). The set is the seed, *Supercalifragilistic*, *Unforgettable nights at the
   Comedy Club* and *Repertoire tonight*, the strings the pass probed.
5. **360 and 414.** Every recent plan checks them, and JP-128's stickers are placed differently:
   the sun from the left off `s.surplus`, the starburst from the right. So a fix that clears the
   sticker at 390 has to clear it on a wider and a narrower phone too. Resize the published tab.
6. **Pop's layout-4 frames are bound** (`layout-4.md` *Pop's layout-4 mode*), so the variable tools
   answer. Read `absoluteRenderBounds` for ink, not the text box (`figma-frame-reading`).
7. **The digest:** a HEAD worktree on one port, the tree on another, ports normalised in the
   files (the grain's `url()` prints the port; `layout-3-qa-fixes.md` JP-125). Always pass themes
   `0,1,2,3,4`, since `digest.mjs`'s default skips Lime. Both surfaces, the canvas and `live=1`.

**Do not refresh the root `index.html` per entry.** The sweep does it once.

---

## JP-127 — layout 4's capsule wraps REVIEWS at desktop

**Verdict: confirmed, and recorded as JP-091's scope at work.** Layout 4's capsule is
`HeaderV3`'s `s.limeTree` block. Under Pop it calls `NavBar` with no `links`: its Label/SM links a
fixed 23 apart are NavBar's own em reading at the cap (`navGapEm`'s Pop arm at `d === 3`). So it
reads the shared clamp, `clamp(${floor}px, calc(100cqi / ${s.navEms}), s.labelSm)`. Two gates leave
layout 4 where layout 1 was before JP-114:
- `floor` is `s.grunge ? 16 : pop && s.v0 && !s.narrow && !links ? 11 : 12`. That is 11 for layout
  1 alone (JP-114 · JP-115, user call, 2026-10-08), so layout 4 keeps 12.
- The desktop name `fit` (JP-091, user call, 2026-10-01: the name gives way first) is
  `!s.narrow && !links && s.v0`, so it is layout 1's alone too. At layout 4 the name keeps
  `s.labelLg` on one line whatever its length.

At 12 the nine Titan links need more than the 702.2 the capsule leaves them, and the row wraps
*Reviews*. The pass named this (`layout-4.md` `:1398`–`:1407`, open question 10) and gave the same
two answers this entry offers: "give layout 4's capsule JP-091's name fit … or lower the links'
floor there". It found Editorial's layout-4 capsule doing the same on HEAD (Gloock, 718.8 in 680.5,
through its own `links` clamp, whose 12 is a literal). Pop's layout-1 QA logged that as Editorial's
own ticket (`qa-fixes.md` sweep, item 2). It is now named a second time.

**Evidence** (`6c989b7`):
- `EncoreSection.jsx` `NavBar` (`:1882`): `floor` `:1900`, the desktop `fit` `:1926`–`:1932` (its
  room's constants are layout 1's: the mark's 11, the halves' 24.6, the pill's 19 and
  `82 * 0.82`, and the pill's label at `s.list`), and the shared clamp `:2001`. The `links` arm's
  literal `clamp(12px, …)` is at `:1998` (Editorial's and Grunge's layout 4).
- `HeaderV3`'s `s.limeTree` block, its `<NavBar>` at `:4252`: `nameSize` `s.labelLg` under Pop,
  `mark` `{ glyph: 29.5, gap: '11px' }` at desktop, and `links` for Grunge and Editorial only.
- `EncoreBuilder.jsx`: `vm.navEms` and `vm.navNameFit` (`:811`, `:860`).
- `notes/nav.md:88`–`:107`: the 11 floor, and "Layout 4's capsule … keep their wrap".

**First step, before any decision: measure** (JP-114's method, its probe rebuilt in the
scratchpad). On the published tab at 1180, 1440 and 1920, and on the canvas at 1180 **and 1088**:
- the capsule's inner width, the mark, the pill, the name at `s.labelLg`, and the nine links' ems
  and their width at 12 and at 11;
- the row's need against its room, so the 733.6-vs-709 question above is settled by a reading;
- the frame's own eight as a control: take the calendar out of `navSections` (JP-114's render), not
  `&nav=8`, which slices the *last* link off and so keeps *Availability* and drops *Reviews*;
- the long-name set under Pop, with Editorial, Lime and Grunge as controls;
- the bar's height on the published tab (the report's "the capsule gets taller").

By the pass's number (733.6 at 12), nine links at 11 need ~672.5 of 702.2. That leaves ~30 spare,
so the seed should hold one row at about 11.5 (about 14 in a 1440 tab; the frame's is 16). The
long names leave the nav 470–589, below 672.5 at any floor near 11, so lever A alone does not hold
them. **The 1088 canvas** has about 92 less, so its seed may still wrap at 11. Measure it, and name
it if it does, as JP-114's reply did.

**Decision (after measuring).** Ask in one `AskUserQuestion` (the two questions below):
- **The lever:**
  - **A. The 11 floor at layout 4 too (recommended, on the triage's numbers).** `floor`'s gate
    becomes `pop && (s.v0 || s.v3) && !s.narrow && !links`. It is one condition, the 390 fit keeps
    12 (`s.narrow`), and it fixes the ticket's case, the default name. Long names still wrap
    *Reviews*. Name that in the reply (JP-115's analogue at layout 4) and log it.
  - **B. A, plus JP-091's name fit in layout 4's capsule.** The `fit` takes `s.v3` beside `s.v0`.
    It is a re-derivation, not a flag flip: layout 4's capsule has its own mark and gap, its pill
    (155.5 × 44.3 at desktop, measured in the pass), and its name at `s.labelLg`, not `s.list`. So
    the room's constants and the two-line cap need re-measuring for the layout-4 bar. It holds the
    long-name set's row too, at the price of the name shrinking or wrapping, as layout 1's does.
  - **Not offered: dropping *Availability*.** It reverses the 2026-09-18 call on every template.
    JP-114 offered and declined it as option E. The reply says why the frame's eight fit and the
    page's nine do not.
- **The scope:** **Pop alone** (recommended; the ticket's, and JP-114's precedent), or **Pop and
  Editorial**. Editorial's capsule passes `links`, so its fix is an arm in the `links` clamp's
  literal 12 (Gloock: 718.8 at 12, so ~659 at 11, in 680.5). That moves theme 3's header `arch 3`
  as well.

**Expected after-diff, named before the code.** On A, Pop alone: `cat_header_arch_3_theme_4_w_desktop`,
canvas and `live=1`, **1 file a surface**. Pop's header has four designs, so `arch 3` has no folded
twin (`arch 4` and `arch 5` fold onto 0 and 1). In it, the links' row size and every link's x, size
and row move, and nothing else. The name, the mark, the pill and the capsule hold. Each `&name=`
render moves the same file. Themes 0–3, 768, 390 and every other category show 0. On B, add the
left half and the name's box and size. On Editorial in scope, add `…theme_3…`.

**Verify.** The long-name set at 1088, 1180, 1440 and 1920 on Pop card 4:
- the links on one row (on A, for the seed; on B, for the set);
- nothing past the capsule, and the pill on the row;
- the name clear of the nav and never broken inside a word;
- the bar's height;
- no sideways scroll.

Lime's, Grunge's and Retro's card 4 stay byte-for-byte HEAD, and Editorial's does too unless it is
in scope. Pop card 1 is a control: its 11 floor and fit must not move.

**Docs.** The `floor` comment in `NavBar` (it names "Desktop design 0 alone: layout 4's capsule …
keep 12") and the `fit` comment ("Layout 4's capsule … keeps its wrap"), plus the shared clamp's
comment. `notes/nav.md:88`–`:107`. *Reversed* pointers at `layout-4.md` `:1398` (the links bullet)
and open question 10 (`:2826`). A line under `qa-fixes.md`'s *Already open, so not new* (`:2180`).
On Editorial in scope, a pointer at its layout-4 plan's capsule bullet.

**Measured** (2026-10-09, on HEAD `b122d93`).
- **Every *Evidence* line held.** `NavBar` `:1882`, its `floor` `:1900`, the desktop `fit`'s gate
  `:1929`, the `links` clamp `:1998`, the shared clamp `:2001`; `HeaderV3`'s `<NavBar>` `:4252`;
  `vm.navEms` `:811`, `vm.navNameFit` `:860`.
- **How.** A scratchpad puppeteer probe (`cap.mjs`) on a HEAD worktree (:5174), card 4 of Pop,
  Editorial, Lime and Grunge, and card 1 of Pop as the control.
  - Each name was written through the fiber `st` dispatch, and the tab's `<title>` read back as the
    name.
  - The editor's Desktop canvas was read (1088 in a 1440 window, the header's panel open). Then
    Publish → Open, and the popup was read at 1180, 1440 and 1920.
  - Widths are in layout px (a rect ÷ the zoom). Lines are read off per-character `Range`s. Sizes
    are nominal, the faced size (× 0.98) in brackets where it matters.
- **The capsule** is layout 1's to the pixel.
  - Inner **1063.6** at 1180 and 1440 (1062.9 at 1920), **971.6** on the 1088 canvas.
  - The mark 29.5 and its 11, the halves' 24.6, the pill's 19, and the pill **155.45 × 44.27**:
    the same boxes as layout 1's capsule.
  - The name is `s.labelLg` 20 (19.6), KAI MERCER on one line, 121.9 wide. So **the nav has
    702.2** at 1180–1920, and 610.2 on the canvas.
- **The nine links are 61.13 Titan em** (measured, as laid out), so they need **733.6 at the 12px
  floor and 672.5 at 11**. The pass's 733.6 holds. The tester's "~865 of need" was low: the row
  wants 895 in a 1440 tab, against their 857 of room.
- **The bar does not grow.** It is **60.64 at 1180, 1440 and 1920 for every name** in the set,
  with *Reviews* on a second row inside it. The report's "the capsule gets taller" is wrong on the
  published tab. On the 1088 canvas a third row does grow it: *Maximilian Featherstonehaugh* sets
  three rows there, and the bar reads 90.48.
- **The frame's eight** (the calendar taken out of the page's sections, so *Reviews* stays) are
  52.9 em, 635.1 at 12. They hold **one row at the 13 cap** at 1180–1920. On the 1088 canvas they
  still wrap *Reviews* at 12, so the canvas misses even the frame's count.
- **HEAD, card 4** (links' rows; the bar is 60.64 on every published row):

  | Name | Pop nav, 1180–1920 | Pop, 1088 canvas | Editorial nav, 1180–1920 | Editorial, 1088 canvas |
  |---|---|---|---|---|
  | Kai Mercer | 702.2: **Reviews** wraps | 610.2: Enquiries, Reviews wrap | 680.5: **Reviews** wraps | 588.5: Enquiries, Reviews |
  | Florence and the Machine | 535.3: Availability, Enquiries, Reviews | 443.3: Pricing → Reviews | 511.0: Availability → Reviews | 419.0: Pricing → Reviews |
  | The Chemical Brothers | 566.5: Availability → Reviews | 474.5: Pricing → Reviews | 543.0: Availability → Reviews | 451.0: Pricing → Reviews |
  | Maximilian Featherstonehaugh | 470.4: Pricing → Reviews | 378.4: three rows, bar 90.48 | 451.3: Pricing → Reviews | 359.3: three rows, bar 93.7 |
  | Supercalifragilistic | 589.3: Enquiries, Reviews | 497.3: Availability → Reviews | 578.6: Enquiries, Reviews | 486.6: Availability → Reviews |

  - **Editorial** needs 718.8 at 12 and **658.9 at 11** (Gloock), against 680.5. So 11 would hold
    its seed by 21.6, and none of its long names (511–579 of nav).
  - **Lime and Grunge hold one row with every name**, at 1180–1920 and on the canvas. Lime's links
    shrink (20 → 15.7 at 1180, 13.2 on the canvas). Grunge's stay 16.
  - **Pop card 1** reads exactly JP-114 · JP-115's *Settled* table.
  - Nothing runs past any capsule, the pill stays on the row (x 924.55, top 8.19), and nothing
    scrolls sideways.
- **The two levers, prototyped in the tree** (:5177, Pop card 4; reverted before asking):

  | Name | A (floor 11): 1180–1920 | A: 1088 canvas | B (A + the name fit): 1180–1920 | B: 1088 canvas |
  |---|---|---|---|---|
  | Kai Mercer | **one row at 11.29**, name 20 on one line | Reviews wraps | **one row at 11.29**, name 20 on one line | one row at 11.01; name **11.47, KAI / MERCER** |
  | Florence and the Machine | Enquiries, Reviews wrap | Availability → Reviews | **one row**; name **18.45** (the cap), two lines | Reviews wraps; name 11, two lines |
  | The Chemical Brothers | Enquiries, Reviews wrap | Availability → Reviews | **one row**; name 18.45, two lines | Reviews wraps; name 11, two lines |
  | Maximilian Featherstonehaugh | Availability → Reviews | three rows, bar 84.28 | **one row**; name 12.12, two lines | Enquiries, Reviews; name 11, two lines |
  | Supercalifragilistic | Enquiries, Reviews wrap | Availability → Reviews | **one row**; name 11.74, one line | Enquiries, Reviews; name 11, one line |

  - In a 1440 tab A's 11.29 reads 13.77 (HEAD's 12 reads 14.64; the frame's links are 16).
  - **B is a gate, not a re-derivation** (the entry expected one). The layout-4 capsule's boxes are
    layout 1's, so the `fit`'s room constants and its 18.45 cap carry over unchanged, and
    `vm.navNameFit` is already built for design 3 (JP-101's 390 fit). B is A's floor gate plus
    `(s.v0 || pop && s.v3)` on the `fit`'s gate. Lime's layout-4 capsule passes no `links` either,
    hence the `pop`.
  - **B's price is the 1088 canvas seed:** KAI MERCER drops to 11.47 on two lines there, where
    A keeps it at 20 and wraps *Reviews*. At 1180–1920 A and B draw the seed identically.
  - **Editorial** can take A only. Its capsule passes `links`, so its fix is an arm in the `links`
    clamp's literal 12. A name fit there would need a new room, since that clamp counts the gaps as
    fixed px, not `navEms × floor`.

**Decided** (user, 2026-10-09, over the numbers above):
1. **B: the 11 floor and JP-091's name fit, in layout 4's capsule under Pop.** `floor`'s gate
   takes `s.v3` beside `s.v0`, and so does the desktop `fit`'s, behind `pop`. The room's constants
   and the cap are layout 1's, unchanged.
   - At 1180–1920 the seed holds one row with KAI MERCER at its own 20 on one line (JP-127).
   - Every name in the long-name set holds the row there too, the name giving way first.
   - On the 1088 canvas the seed's name takes two lines at about 11.5, and the long names still
     wrap there. Named, as JP-114's reply named its canvas.
   - This reverses JP-091's scope at layout 4 ("Layout 4's capsule … keeps its wrap") for Pop,
     and the pass's open question 10.
2. **Pop alone.** Editorial's layout-4 capsule keeps its wrap, logged a second time for its own
   ticket. Lime's, Grunge's, Editorial's and Retro's card 4 stay byte-for-byte HEAD.
3. *Availability* stays (the 2026-09-18 call).

**Expected after-diff, named before the code.** Both gates are Pop's, desktop's (`!s.narrow`) and
design 3's. Pop's header has four designs, so header arch 3 has no folded twin.
- **The seed:** `cat_header_arch_3_theme_4_w_desktop`, on the canvas and on `live=1`, so **1 file a
  surface**. In it the links' row size moves 12 → about 11.29, and so does every link's x, width,
  size and row. The name keeps 20 on one line, so its box and the left half hold (the `fit`'s
  `whiteSpace` / `maxWidth` / `containerType` are not digest columns). The mark, the pill, the
  glass, the capsule and the root hold.
- **The `&name=` renders** (header, themes 0–4, three widths, both surfaces): the same 1 file a
  surface. In it the name's size, lines and box, the left half and the nav move as well.
- **Every other render is 0:** themes 0–3, Pop at 768 and 390, Pop's header arch 0, 1, 2, 4 and 5,
  and every other category.
- **Not in the digest:** the 1088 canvas, where the seed's name moves to two lines (above).

**Settled** (2026-10-09).
- **Code: `NavBar`, two gates.**
  - `floor` is now `s.grunge ? 16 : pop && (s.v0 || s.v3) && !s.narrow && !links ? 11 : 12`.
  - The desktop `fit`'s gate is now `!s.narrow && !links && (s.v0 || pop && s.v3)`.
  - The room's constants, the 18.45 cap and `vm.navNameFit` are untouched. The 390 fit (`s.mob`)
    and the 768 burger (`s.narrow`) keep 12.
- **Digest** (HEAD worktree :5174 against the tree :5177, themes 0–4, three widths, ports
  normalised): **1 of 660 on the canvas and 1 of 660 on `live=1`**, the named
  `cat_header_arch_3_theme_4_w_desktop`.
  - Each `&name=` set (the four long names, header, themes 0–4) is **1 of 90** on each surface,
    the same render.
  - Inside the seed's file exactly 11 rows move: the nav, its row (12 → 11.29) and the nine links
    (11.76 → 11.07 faced), all now on one row. The name, the mark, the left half, the pill, the
    capsule and the root hold.
  - Inside the long names' files the left half and the name's box and size move as well.
  - No file is one row long (no empty renders).
- **The real app** (`cap.mjs` on :5177, Pop card 4; nominal sizes; the bar 60.64 on every row):

  | Name | 1180 / 1440 / 1920 | 1088 canvas |
  |---|---|---|
  | Kai Mercer | **links one row at 11.29**; KAI MERCER 20, one line | links one row at 11.01; KAI / MERCER at 11.47 (HEAD: 20, Enquiries and Reviews wrapped) |
  | Florence and the Machine | **one row** at 11.01; 18.45, FLORENCE AND / THE MACHINE (18.36 at 1920) | Reviews wraps; 11, two lines |
  | The Chemical Brothers | **one row** at 11.01; 18.45, two lines | Reviews wraps; 11, two lines |
  | Maximilian Featherstonehaugh | **one row** at 11.01; 12.12, two lines (12.06 at 1920) | Enquiries, Reviews wrap; 11, two lines |
  | Supercalifragilistic | **one row** at 11.04; 11.74, one line (11.68 at 1920) | Enquiries, Reviews wrap; 11, one line |

  - **Every reading passes** at 1180–1920:
    - the links on one row;
    - nothing past the capsule;
    - the pill on the row (top 8.19, 44.27 tall);
    - the name clear of the nav by 36.2 at least, and never broken inside a word;
    - the bar 60.64;
    - the tab's title the name;
    - no sideways scroll and no page errors.
  - **Editorial's, Lime's and Grunge's card 4: 60 of 60 readings identical to HEAD. Pop card 1:
    20 of 20 identical.** Retro's card 4 was read too and is identical, but only as a control: the
    probe takes its pill (an `<a>` inside its `nav`) for a link, so its rows do not describe its
    bar. Its real control is the digest's theme 0, which shows 0.
  - **The 1088 canvas, named:** the seed now holds one row there, with its name on two lines at
    11.47. The long names still wrap there (Decided, 1).
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed; the sweep does that.
- **Torn down:** :5174, :5177 and the HEAD worktree. :5173 is the user's, and :5175 and :5176
  belong to other jobs; all three still run.
- **Docs.**
  - `NavBar`: the `floor` comment, the `fit` comment, and the shared clamp's comment.
  - `notes/nav.md`: a paragraph for Pop's layout-4 capsule under JP-091's bullet, *reversing* the
    old "wraps the same way" lines. Editorial's layout-4 wrap is named there again.
  - *Reversed* pointers at `layout-4.md`'s links bullet (section 1) and open question 10, and a
    *Fixed* line under `qa-fixes.md`'s *Already open, so not new*.
  - No CLAUDE.md or README line states the floor or the fit's scope.
- **For the sweep's replies and log:**
  - The report's "the capsule gets taller" is wrong on the published tab: the bar held 60.64 on
    HEAD, with Reviews on a second row inside it.
  - The tester's "~865 of need" was low: nine links need 733.6 layout px at 12, which is 895 in a
    1440 tab.
  - *Logged for new tickets:* Editorial's layout-4 capsule (its seed wraps Reviews at 1180–1920),
    and the 1088 canvas, where the long names still wrap.

---

## JP-128 — the 768 and 390 heads run onto their stickers

**Verdict: confirmed, and recorded as a deliberate call.** The narrow masters type the heads in
mixed case: *Snaps from the night*, *Repertoire*. Layout 3's decision 2 uppercases every display
string at every width (`layout-4.md` open question 4). Titan's capitals then run past the frame's
ink: 59 further at 768 and 27 at 390 in the gallery, and 28 in the 390 repertoire, which takes the
head 8 under the starburst's point. The pass measured all three and chose to put each sticker
**behind** its head (`zIndex: -1` in an `isolation: isolate` sheet or panel). That is layout 3's
*a sticker the frame seats beside its own short copy goes behind the artist's longer copy*. The
open questions name the alternative: "either the narrow heads were meant in mixed case, or the sun
wants room beside the capitals at those two widths".

The frame does draw a gap at these sites, so "by design" is not a reply the tester can check
against the frame. The look they report is the call working as recorded: the head's letters over
the sticker.

**Evidence** (`6c989b7`; re-check):
- `Gallery`'s layout-4 `s.limeTree` block. Its head is
  `fontSize: faced(s, (ed || pop) && s.titleWordEms ? min(s.dispLg, 100cqi / s.titleWordEms) : …)`
  (`:17065`, in the block whose fit comment opens at `:16815`, citing `964:73214`). `PopSun`
  (`:17041`) is at `zIndex: -1`, placed from the top-left off `s.surplus`.
- `Repertoire`'s layout-4 `s.limeTree` block (its fit comment `:14622`, the head `:14796`): the
  same head rule. `POP_STAR_D` (`:14788`) is anchored from the right (127.29 / 42.98 / 15.29) at
  `zIndex: -1`.
- `layout-4.md` `:1757`–`:1764` and `:1857`–`:1864`: the two *Settled* bullets. `:1074`–`:1083`:
  the *Conventions* bullet that generalised them.
- `notes/gallery.md:102`–`:104`: "the smiley sun behind the head (Titan's capitals run under it at
  768 and 390, where the frame's mixed case stops short)".

**First step: read each sticker's ink edge as an expression**, not a number. At 768, 390, 360 and
414 (the published tab resized), take the sun's leftmost disc ink and the starburst's leftmost
point in the column's own coordinates. Then write each as the block already places the sticker:
the sun off `s.surplus` from the left, the starburst off the panel's right. A measure built from
the same terms holds at every phone width. Read the frames' own clearance as well (the mixed-case
ink end to the sticker's ink, `absoluteRenderBounds`): 6 / 11 at the gallery's 768 / 390 and 20 at
the repertoire's 390, by the pass's reads.

**Decision.** Ask in one `AskUserQuestion` (up to three questions):
- **The lever:**
  - **A. The head's measure stops short of the sticker, at 768 and 390, under Pop (recommended).**
    The head is fitted in a column that ends at the sticker's ink less a clearance, and the
    existing widest-word fit and wrap do the rest. **The reserve has to enter the fit's divisor**:
    the size is `calc(100cqi / s.titleWordEms)`, and `100cqi` reads the *container's* inline size,
    not the h2's box. A `maxWidth` or `paddingRight` on the h2 alone rewraps the gallery but does
    not shrink REPERTOIRE. So write `(100cqi - reserve) / titleWordEms`, or give the head its own
    `inline-size` container. Either way:
    - the 390 repertoire's one word shrinks to fit: REPERTOIRE ~35.3 → ~31–32, depending on the
      clearance;
    - the 390 gallery stays two lines, rebroken: SNAPS FROM / THE NIGHT, by the triage's widths;
      confirm it;
    - the 768 gallery wraps to two lines (SNAPS FROM THE / NIGHT), and the root grows about one
      line (~44.5 of the master's 751).

    It is one rule at both sites. A long heading cannot reach the sticker at any width, and the
    1440 heads do not move.
  - **B. A, but the 768 gallery keeps one line by shrinking.** The head sets one line at the size
    that clears the sun (~45 for the seed, against 49.98), down to a floor, and wraps below the
    floor. The root holds the master's 751. It needs a whole-heading em key from `sectionVm`
    (`vm.navNameFit.one`'s shape, in Titan's table), which no head reads yet.
  - **C. Mixed case at 768 and 390**, following the narrow masters. Not recommended: it reverses
    layout 3's decision 2 for six heads on this page and three on layout 3's, and the 1440 heads
    stay capitals.
  - **D. Keep it, and reply by design**, with the designer note the pass already wrote. Not
    recommended: the frame draws the gap, and the tester measured against it.
- **The clearance:** **the frame's own** (the head stops where the frame's mixed-case ink stops:
  6 / 11 / 20), or **one value at every site** (for example 20, the repertoire's). Recommend the
  frame's own. It is what the tester compared against, and it keeps the 768 gallery's sun as close
  as the frame has it.
- **The paint order:** once no heading can reach the sticker, should the stickers return to the
  frame's order (over the sheet, `zIndex` dropped)? Recommend **keep `zIndex: -1`**. It costs
  nothing, it covers a sticker edge that the turned box's corner might still meet, and dropping it
  moves the digest for no visible gain.

**Expected after-diff, named before the code.** On A: `cat_gallery_arch_3_theme_4_w_tablet`,
`…_w_mobile` and `cat_repertoire_arch_3_theme_4_w_mobile`, **3 files a surface**. If the measure
is written for the narrow widths as one rule, the 768 repertoire's head box narrows too, without a
size change, which makes **4**. Name which before the code. In the gallery 768 file, the head's box
and everything below it moves down by the new line, and the root grows. The 390 files move the
head's box and, for the repertoire, its size. 1440, themes 0–3 and every other category show 0. On
B, the 768 gallery file moves the head's size, not its line count, and the root holds.

**Verify.**
- The seed and the `&cj=` heading set at 768, 390, 360 and 414, harness and published tab: the
  head's last ink stands clear of the sticker's ink by the decided clearance, with no word broken
  and no sideways scroll.
- *Supercalifragilistic* still fits its widest word.
- 1440 is byte-for-byte HEAD.
- The gallery's asterisk (anchored from the foot) keeps its corner on the spotlight when the head
  gains a line.

**Docs.**
- The two blocks' fit comments.
- `notes/gallery.md:102`–`:104`.
- *Reversed* pointers at `layout-4.md`:
  - `:1757` (the sun) and `:1858` (the starburst);
  - open questions 15 and 16;
  - the *Conventions* bullet `:1074`, which gains a qualifier: behind the head only where the
    head's measure cannot be kept short of the sticker;
  - the named-diffs lines in *Settled* §4 and §5 (`:1806`, `:1907`);
  - designer note 4's paragraph (`:2935`).
- `layout-3.md`'s *Conventions* bullet at `:864` is a cross-layout rule. It gets a pointer, not a
  rewrite, since layout 3's sparkle covered the artist's copy, not a frame head.

---

## End-of-pass sweep

- The digest against `main` (themes 0–4, three widths, both surfaces, ports normalised) moves
  exactly the union of the two entries' named files.
- `reach.mjs` is not owed: neither entry adds a field.
- The real app, Pop card 4, with each ticket's steps at 1440, 768 and 390, plus 360 and 414 for
  JP-128. Pop card 1 is JP-127's control. Lime's, Grunge's, Editorial's and Retro's card 4 are the
  controls for both.
- `npm run build` is clean. `npm run build:standalone` and `cp source/dist-standalone/index.html
  index.html` refresh the root `index.html`.
- `plans/README.md`'s Pop row for this file is updated with the outcome.
- A reply line per ticket, a *Logged for new tickets* list (on JP-127 A: the long-name wrap at
  layout 4; Editorial's layout-4 capsule unless it was in scope; the 1088 canvas if its seed still
  wraps), and the designer's notes.
- Tear down every port and worktree the batch started. :5173 is the user's.

## Replies

*Written by the sweep.*

## Notes for the designer

Seeded at triage. The sweep finalises them.

1. **The layout-4 nav draws eight links, and the page carries nine** (*Availability*). Layout 1's
   note 7 in `qa-fixes.md` asks the same question. The answer now covers both layouts.
2. **The narrow masters type the display heads in mixed case**, where 1440 types capitals
   (`layout-4.md` note 4). The stickers were placed beside the shorter mixed-case string. If the
   capitals are meant at every width, the stickers want the room the capitals take. If mixed case is
   meant narrow, say so, and the build can follow it.
