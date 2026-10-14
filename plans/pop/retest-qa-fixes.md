# Pop — retest QA fixes

The tester's retest of Pop's first two QA batches ([`qa-fixes.md`](./qa-fixes.md),
[`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md)), build `09.10 18:08`. It re-files three items,
one per entry below. It works like those two plans, at a smaller scale: one triage pass, the
user's four calls in one sitting (2026-10-12), and then the fixes.

The tester's numbering is not the plan's. The retest's "JP-118" (placeholders) is **JP-119**
here; the plan's JP-118 is the © fix, which the retest does not mention.

Branch `pop-retest-qa-fixes`, forked from `main` (`3772f28`, after PR #60).

## The retest, as filed

> **Not fixed.** JP-111 — Pop still sets Titan One rather than Chunko. There is no mask or texture
> over the font either.
>
> **Partly fixed.** JP-121 — fixed on layout 2. On layout 3 at 390 a long name in the logo still
> sets on one line and runs under BOOK NOW. *Maximilian…* also reaches the burger.
> JP-118 [JP-119] — the Enquiry Form placeholders are fixed at 3.0:1. The Repertoire search
> placeholder has not changed: 1.93:1.

## Triage

| Ticket | Where | Verdict | Size | Call (2026-10-12) | Status |
|---|---|---|---|---|---|
| JP-111 | `THEMES[4]`'s face | **No texture in the design**: the frames' type is a flat fill. The difference is Chunko's ink traps | — | **reply again**, no code | **done** (reply) |
| JP-121 | `HeaderV2`'s `s.limeTree` row at 390 | **Confirmed**: layout 2's *Logged* item 2, the sibling left unfitted | S | **Lime, Grunge and Pop** (Editorial stays named); **keep the master's seed** | **done** |
| JP-119 | the repertoire's layout-1 search, Pop | **Confirmed, and recorded**: JP-119's option B, not taken | S | **80%, canvas and live** | **done** |

## JP-111 — still Titan One; "no mask or texture"

**Verdict: no texture exists in the design.** The hero's *KAI MERCER* (`I964:58624;446:422`,
`get_screenshot` of `964:58624` at 1×) is flat white type. Layout 1's census found no texture on
any Pop section (`layout-1.md:501`). What differs from the build is how Chunko is drawn: its
squared counters and ink traps (the A's and R's notches). Titan One's corners are soft (decision 1's
table). Neither a mask nor a texture would reproduce that; only the face would.

**Decided** (user, 2026-10-12): **reply again**, no code. Titan One stays. The licence question to
Zarma Type is still the PO's (`layout-1.md` open question 12, which now carries this retest).

**Reply:**

> *JP-111 — needs the PO, as before.* Neither the design nor the build has a mask or texture: in the
> frames, the Chunko headings are a flat fill (checked on the hero's *KAI MERCER*). What you see is
> Chunko's own drawing, its squared counters and ink traps, which Titan One (the stand-in) does not
> have. No texture can add that; only the font can. *Chunko Bold Demo* is Zarma Type's personal-use
> demo and cannot ship. **PO:** ask Zarma Type for a licence covering a builder whose published
> artist sites embed the face. None on sale covers it, so ask for the character set too. **BA:**
> whether Titan One's soft corners are acceptable until then.

## JP-121 — layout 3, 390: a long name runs under the pill and over the burger

**Verdict: confirmed; the sibling layout 2's batch logged.** The row is
`HeaderV2`'s `s.limeTree` nav. At 390:
- the row is no query container;
- the left cell is `minWidth: 0`, so it collapses under the burger's capsule;
- the right cell is `minWidth: 0`, so the pill overruns;
- the name is `labelStyle`'s `nowrap`, with no fit.

The probe (header `arch 2`, `w=mobile`, `live=1`, x in section px; row 20–370):

| Theme | *Kai Mercer* | *Florence and the Machine* | *Maximilian Featherstonehaugh* | Pill (seed) |
|---|---|---|---|---|
| 1 Lime | 169.7–220.3 | 134.8–255.2 | 122.5–267.5 | 273.8 |
| 2 Grunge | 171.8–218.2 | 140.5–249.5 | 129.3–260.7 | 277 |
| 3 Editorial | 153.6–236.4 | 94.3–**295.7** | 73.4–**316.6** | 243.7 |
| 4 Pop | 152.3–**237.7** | 93.9–**296.1** | **71.2**–318.8, over the capsule (20–82) | 245.5 |

**The seed's own overrun.** Pop's seed name stops 7.8 short of the pill, against the row's 16 gap:
the pill (124.5 wide) runs 8.2 into the gap, because its cell's half is 116.3. Editorial's runs
8.7. Lime's and Grunge's pills fit their half, with 50 or more to spare. So pinning the right cell
plainly would move Pop's seed about 8 toward the burger.

**Decided** (user, 2026-10-12):
1. **Scope: Lime, Grunge and Pop**, gated `!ed` as at layout 2. Editorial's layout 3 stays named.
2. **Keep the master's seed**: *Kai Mercer* does not move. The pill keeps its overrun.

**Settled.**
- `sectionVm` builds `navNameFit` at design 2 (`EncoreBuilder.jsx`, the gate beside 0, 1 and 3).
- **`HeaderV2`, at `s.mob` and `!ed`.**
  - The row is the query container.
  - Both cells hold their content (`minWidth: max-content`).
  - The name takes `fitName` / `fitBox`'s `narrow` fit, centred.
  - The room is `100cqi` less the capsule (26 + 18 + 18), less the pill's box (17.92 + 8.53 + 27.6 +
    4.27, plus `navNameFit.pill` × `s.labelSm`), less the two 16 gaps, plus `allow`.
  - The pill's label is `labelStyle`-faced here, as `navFace` is, so unlike HeaderV1's 390 Grunge
    label there is no `faceK` term.
- **`allow`** is 9 under Pop and 0 under Lime and Grunge. It is a `marginLeft: -9px` on the pill,
  not on the cell.
  - The cell's min-content counts the margin, so a long name stops 7 short of the pill.
  - A cell wider than its pill never sees the margin, so the seed stays centred where it stood.
  - On the cell itself, the margin would widen both flex shares (not measured, since it was not
    shipped).
- **The probe, after.** The 360 and 414 rows narrow the harness root's 390 box.
  - **390, Pop:** *Kai Mercer* 152.3–237.7 (unchanged). *Florence* sets two lines, 116–220.9. *…Featherstonehaugh* sets two lines at 11.93, 99.9–237.0: the word under the floor, JP-101's `word`. *Charlotte Elizabeth Mountbatten-Windsor* sets two lines at 10.39. The box runs 98.4–238.5 against the capsule's 82 and the pill's 245.5.
  - **390, Lime:** *…Featherstonehaugh* sets one line, 112.7–257.8, 16 off the pill at 273.8. *…Windsor* sets two lines.
  - **390, Grunge:** the same as Lime: one line for *…Featherstonehaugh*, two for *…Windsor*.
  - **360:** Pop's names end at 208.5 or less, against the pill at 215.5. *…Featherstonehaugh* sets at 9.37 and *…Windsor* at 8.17: the `word` rule, as at layout 2. **The seed moves here, by design.** On HEAD *Kai Mercer* sat centred at 137.3–222.7, 7.2 *under* the pill. It now stands at 123.2–208.5, 7 clear of it. The seed is kept at 390, the master's width, alone.
  - **414:** every name is clear.
  - Editorial and Retro are byte-identical to HEAD at every width.
- **Digest** (a HEAD worktree on :5178 against the tree on :5179, every category, themes 0–4, three
  widths, port normalised): **0 of 660 on the canvas, 0 of 660 live**, beside JP-119's three named
  files below. The header `arch 2` seed does not move under any theme. The digest's mobile is 390;
  the 360 and 414 rows are the harness probe, not the published tab.

**Reply:**

> *JP-121 — fixed on layout 3.* At 390 a long name now wraps between the burger and BOOK NOW, on
> two balanced lines, and shrinks only when a single word would not fit. It no longer reaches the
> pill or the burger. *Kai Mercer* stands exactly where it did. The same applies under Lime and
> Grunge with long names. Editorial's layout 3 is not changed, as on layout 2.

## JP-119 (the retest's "JP-118") — Pop's repertoire search placeholder at 1.93 : 1

**Verdict: confirmed, and recorded.** The frame's hint is Space Mono 13, white at **50%** on the
`#9162FF` box. The canvas drew that (`G.hintOp` 0.5). The live input set no `--ph`, so it drew
`index.css`'s .45 (1.93 : 1). JP-119 offered this as option B, and it was not taken
(`qa-fixes.md`, JP-119's *Decided*). Matching the frame would only reach **2.07 : 1**. At 80%, the
form's strength, it is **3.07 : 1** (WCAG luminance, white composited over `#9162FF`).

**Decided** (user, 2026-10-12): **80% on both the canvas and the live box.** This departs from the
frame's 50%, which goes to the designer (note 1).

**Settled.**
- `G.hintOp` becomes 0.8 in Pop's arm of the repertoire's layout-1 `G`.
- The live input spreads `...(G.hintOp && { '--ph': G.hintOp })`. Only Pop's arm sets `hintOp`, so
  no other template's box carries it.
- **Digest:** exactly the three expected files differ, `cat=repertoire&arch=0&theme=4` at three
  widths. In each, only the hint span's `opacity` field moves, from 0.5 to 0.8 (field by field).
  Live: 0 of 660.
- **`::placeholder` probe** (repertoire and form, `arch` 0–3, themes 0–4, desktop and mobile, 60
  rows):
  - exactly Pop's layout-1 search moves, from 0.45 to **0.8**, in `rgb(255, 255, 255)`;
  - the form's 0.8 and 1 and every other hint's .45 are unchanged.
- **Docs.** The comments at the input and in `index.css`. CLAUDE.md's `--ph` paragraph, now three
  sets. README's rule and its form paragraph. A *reversed* pointer under JP-119's *Decided* in
  `qa-fixes.md`.

**Reply:**

> *JP-119 (your JP-118) — fixed.* Pop's Repertoire search placeholder now draws white at 80%, 3.07 :
> 1, the same strength as the Enquiry Form's. This applies on the editor's canvas and on the
> published page, at every width. The design states 50%, which would be only 2.07 : 1, so this is a
> deliberate departure, noted for the designer.

## Logged for new tickets

1. **Pop's layout-2 repertoire search draws its hint at 2.13 : 1.** It is the live box at `arch 1`,
   violet `#6B2CFF` at the .45 hint on `#F5F5F5`, at all three widths (probe, 2026-10-12). It is
   the same family as this retest's search, and the tester has not filed it. Pop's layouts 3 and 4
   draw no live search box. Its frame's stated strength was not read.

## Notes for the designer

1. **Pop's layout-1 repertoire search states its hint at 50% white** on the `#9162FF` box, which
   is 2.07 : 1. The build draws 80% (3.07 : 1), the Enquiry Form's strength, by a user call. **If
   50% is meant**, the contrast question comes back.
2. **Layout 3's 390 header is drawn for *Kai Mercer***, with BOOK NOW already running 8px into the
   gap beside it. The build wraps a longer name between the burger and the pill. It keeps that
   8px overrun, so the seed stands where the frame puts it.

---

# Second retest — build `Tue, 13 Oct 2026 08:45:12 GMT` (etag `6acdef98-9745b9`)

The tester re-files two items: **JP-111** (Pop's heads are still Titan One) and **JP-116** (three
pairs re-measured; the rest "nothing to compare with"). No code changed in this round.

## JP-111 — third filing: still Titan One

**Verdict: unchanged, and not ours to close.** `chunko` appears 0 times in the build, as it must:
Chunko Bold Demo is Zarma Type's personal-use demo (`layout-1.md` open question 12). Titan One was
chosen by rendering thirteen candidates (decision 1) and re-confirmed on 2026-10-08 and 2026-10-12.

**Reply** (names the owners, since two replies that only named the stand-in were re-filed):

> *JP-111 — blocked on the PO, no change.* Titan One is the deliberate stand-in. Chunko Bold Demo
> is a personal-use demo and cannot ship, and no licence on sale covers a builder that publishes
> artist sites. **PO:** request a quote from Zarma Type, with the character set. **BA:** whether
> Titan's soft corners are acceptable until then. Nothing in the build can close this.

## JP-116 — three pairs "112 / 112 / 62", the tester's design reads 120 / 119 / ≈69

**The design was walked again (2026-10-14)**, independently of the 2026-10-08 read: the three page
frames of Pop's layout 1 (`964:58623`, `986:52418`, `986:52431`), every section's painted insets
by `use_figma` (visible, non-empty nodes; decorations and the section's own full-bleed fills left
out; both layout boxes and render/ink bounds). Against the published tab on HEAD.

| Pair, 1440 | Tester: build / "design" | Build | Frames, box to box | Frames, ink |
|---|---|---|---|---|
| Bio → Top Tracks (media) | 112 / 120 | 112 | 56 + 56 = **112** | 58.4 + 56 = 114.4 |
| Top Tracks → Media (gallery) | 112 / 119 | 112 | 56 + 56 = **112** | 56 + 58.9 = 114.9 |
| Footer top → first row | 62 / ≈69 | 61.7 | **61.68** (the wordmark text: 56 + 5.68); the link column starts at **56** | same |

- The build equals the frames on every pair. Nothing in the frames reads 120, 119 or ≈69, by box,
  by ink, or on the media's sticker (which stands 6.6 above its card: 105.4 on that basis).
- The tester's 12.10 footer reading (56) and this one (62) are the link column and the wordmark.
  Both are the frame's.
- **The other seams, re-read** (insets, frame / build, 1440 · 768 · 390): bio 56 · 60 · 24 top and
  56 · 60 · 40 foot; media 56 · 30 · 10; gallery 56 · 30 · 20 / 56 · 30 · 30; repertoire 96 · 60 ·
  40; map 126 / 156 · 60 / 60 · 30 / 10; pricing 100 · 60 · 24 top, the rings 13 / 16 / 40 under its
  foot; calendar 100 / 100 · 100 / 50 · 60 / 40; form 120 / 120 · 30 / 60 · 30 / 30. Every one is
  the build's `vm.pad` arm, to 0.1. Seams at 1440, frame = build: header → bio 56, bio → media 112,
  media → gallery 112, gallery → repertoire 152, repertoire → map 222, map → pricing 256, pricing
  → calendar 200, calendar → form 220, form → testimonials 120. The tablet row's insets are the
  same read.
- **Where the read is noisy.** The repertoire's, calendar's and form's *decorations* (the heart,
  the scribbles, the sticker) poke into the inset and read as 54 / 87, 13 / 100 and 51 / 120 if
  counted. The 2026-10-08 pass left them out as decoration and the tab stands on the text and card
  boxes. That is the same call, not a difference.

**Reply:**

> *JP-116 — matches the design; please check the reference values.* At 1440 the published page
> reads Bio → Top Tracks 112, Top Tracks → Media 112 and the footer's top → wordmark 61.7. The
> Figma frames give 112, 112 and 61.68 (the bio's content ends 56 above its foot, the media's
> starts 56 below its top, and the footer's wordmark row sits 56 down, plus 5.68 for its text).
> We re-read every section's insets at 1440, 768 and 390 against the build, and they match. We
> can't find 120, 119 or ≈69 in the frames. Please send the node ids you measured.

**Open (user):** close on this reply, or ask the designer which frame the 120 / 119 / ≈69 come from.
