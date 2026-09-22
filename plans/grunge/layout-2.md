# Grunge layout 2 — section-by-section plan

This is the working checklist for bringing **layout 2** of the Grunge template up to its Figma
designs, the way [`../lime/layout-2.md`](../lime/layout-2.md) did for Lime. It runs one section per
session, all three widths together, clearing context between sections. Layout 1 (`s.v0` under
`s.grunge`) is fitted and closed; nothing here should move it.

**This plan is Lime layout 2 again, with deltas — and the deltas are layout 1's idiom.** It does
not repeat Lime's plan: the tree evidence, the wrapper insets, the procedure, the harness, the
digest and the verification are Lime's, verbatim, with `theme=1` read as `theme=2`. What is
written here is only what differs. And it does not repeat [`layout-1.md`](./layout-1.md) either:
the gates, `faced` / `facedLh`, the uppercase-per-site rule, the `G` lookup and the four-theme
digest are that pass's, and they carry over whole.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then:
- the whole *Conventions* of [`layout-1.md`](./layout-1.md) — the foundation (`s.grunge`, the
  Anton stand-in at 0.75, `'title'` casing with `textTransform` per site, `Grain`'s and
  `TornEdge`'s opt-in `grunge`, `SealBadge`'s `line`, the `G` lookup) — and its *Settled* notes for
  the section you are about to fit, since the same Scheme-2 and two-reds traps recur here
- the *Conventions* of [`../lime/layout-2.md`](../lime/layout-2.md), the section you are fitting
  above all: **its block is the block you widen**, and its *Settled* bullets say what that block
  reads, what it drops and what it measured
- [`../CONVENTIONS.md`](../CONVENTIONS.md), groups **A**, **B** and **C** (this plan inherits all
  three; group D is layout 1's blocks and does not apply — the Lime layout-2 *Settled* bullets
  play its part here)
- the *Settled* notes of [`../lime/layout-2-qa-fixes.md`](../lime/layout-2-qa-fixes.md) for the
  section's entries — JP-037 and JP-039 (header), JP-037 (bio), JP-036 (pricing), JP-040 (map),
  JP-041 (calendar): those seams are already inside the Lime blocks the sessions widen, and the
  frames were read before they were written
- the *Conventions* **and the narrow-masters notes** of [`../retro/layout-2.md`](../retro/layout-2.md),
  which built every `s.v1` branch
- the *Per-session procedure* of [`../lime/layout-2.md`](../lime/layout-2.md)

Then the memory notes `figma-frame-reading`, `verifying-the-published-tab` and
`browser-tool-choice`. `SPEC.md` lives in git history: `git show 8fa8ff4:SPEC.md`.

Branch: **`grunge-layout-2`, forked from `grunge-layout-1`, not from `main`.** At planning time
(2026-09-22) `grunge-layout-1` is closed and swept but unmerged, 38 commits ahead of `main` with
`main` wholly contained, and everything this pass stands on — `s.grunge`, `s.designed`,
`THEME_RAMP.Grunge`, `THEMES[2].sem`, `SEEDS.Grunge`, `faced`, the widened helpers, the two
committed scripts — exists only there. Merging layout 1 first is the user's call; if it lands,
rebase this branch onto `main` rather than re-forking (Lime layout 2's precedent).

## What the pass must deliver

1. **Every layout-2 section works in the published tab under Grunge**: every `s.v1` control
   CLAUDE.md lists under *`s.live` is false everywhere except the published tab*.
2. **Every layout-2 section looks as close to its Figma frame as possible**, at 1440 (× 0.82 onto
   the 1180 canvas), 768 and 390.
3. **The setup modal's card 2, "Feature spread", lays out a fitted page.** `pickHeader` writes
   arch 1 to every section, so this pass is what turns card 2 from its placeholder (layout 1, open
   question 4: Retro's cream mount and checker floor in Grunge tokens, `mustard` a stand-in) into
   Grunge's own page. The header session verifies this **in the builder**, not only the harness.
4. **The sidebar's layout-picker thumbnails for layout 2** under Grunge look like their sections.
   They render `sectionVm` at `SIZES.desktop`, so they follow the desktop fit for free; check them
   once, in the end-of-pass sweep.

## What this pass actually is

**Grunge's layout-2 page is Lime's layout-2 page in a third variable mode, the way its layout-1
page was Lime's layout-1 page.** The evidence, read at planning time with one `use_figma` walk per
page frame (main component, `explicitVariableModes`, fills, image hashes, effects, every vector
wider than 1000 at any depth) and the depth-6 `type:name` multiset comparison Lime's plan used:

- The three page frames are **Static Youth, Scheme 1** throughout; the 768 frame adds
  `Device: Tablet` and the 390 frame `Device: Mobile`. Every instance is Static Youth. **The desktop
  page frame itself is set right this time** (layout 1's page was set to Lime), but read a section
  node, never the page, all the same.
- **The main components are not shared**, as on both earlier pages (Grunge's header is `624:5089`
  against Lime's `624:4875`, and the offsets vary per section). The test is the tree.
- **The trees match.** The multiset difference between each Grunge desktop instance and its Lime
  twin is: header `+ RECTANGLE:image 1` (a grain rect) and the mock name's text node; bio
  `+ RECTANGLE:image 1`; gallery `+ RECTANGLE:image 1`; footer the mock name and its seal frame;
  **every other section identical**. The narrow pages repeat the same wrapper structure (`Frame 299`
  / `297` / `296` round the media player, `Frame 298` round the calendar) with Lime's own insets.
- **No seams.** No vector wider than 1000 exists on any Grunge layout-2 master, visible or hidden
  — layout 1's hidden `Layer_1` tears in the repertoire and testimonials are not here either. Layout
  2 draws **no `TornEdge`**, as Lime's draws no `ArcEdge`.
- **No Device-mode override on any instance** (`explicitVariableModes` lists Scheme only). The 390
  header is *named* "— Tablet", as Lime's is, but `get_variable_defs` on it returns the mobile
  ramp (display-lg 46, list 18, label-lg 14, body-lg 15), so layout 1's 390-hero trap does not
  recur. Checked on the header only; each session re-checks its own three.
- **The narrow shapes are Lime's, which are Retro's.** Retro's narrow-master notes apply as
  written; re-measure every number, since the sizes are not Lime's (see *Sizes*).

So, as under layout 1: **no Grunge-only section blocks, and no Grunge-only ternary trees.** The
work is `s.grunge` deltas *inside the Lime layout-2 blocks*, each widened from `if (s.lime)` to
`if (s.lime || s.grunge)` with `const grunge = s.grunge` naming the deltas — or, where the deltas
run past a handful, the **`G` lookup at the block's head** (layout 1, sections 4–10), whose Lime arm
is today's literals so that theme 1 digests to zero. **Theme 1 is the digest at risk in a widened
block, not theme 0** (layout 1, section 2): every edit sits inside a block Lime renders.

**Where each Lime block sits decides how it widens** (Lime layout 2's *Settled* bullets, one per
section; the placements are in the sections table below):

- `if (s.lime) { … return }` **at the head of the component** — the header. Widening the gate
  makes Retro's half unreachable under Grunge, so the three `s.grunge ?` placeholder arms that
  layout 1 left in Retro's half of `HeaderV1` (`mustard`, the face card's title ink, the place
  card's fill) become dead code and are **deleted**; the theme-0 digest proves nothing moved.
- `if (s.v1 && s.lime)` **ahead of `if (s.v1)`** — the bio and the form, whose state is hoisted.
- `if (s.lime)` **inside `if (s.v1)`, after the seam** — media, repertoire, pricing, calendar, map,
  testimonials. The seam stays shared; widen the inner gate.
- **No block at all** — the gallery: seven `s.lime` ternaries and one `s.lime &&` glow overlay
  through `Gallery`'s `if (s.v1)`. It widens ternary by ternary, from the frame, and the glow
  overlay becomes a ring (below).

A section whose `get_metadata` tree differs from Lime's is the exception; record it under
*Conventions* before writing anything of its own. None was found at planning time.

**Video is not a category any more.** The pages carry a *Video Players — A · Dashboard player*
frame in fourth place (`964:64626` / `986:13761` / `986:13780`); the section was removed from the
project in the QA passes and no `Video` component exists, so the frame is not a row here. Lime's
plan dropped it for the same reason one pass earlier.

## The Figma source

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Frame 253 | `964:64617` | 1440 × 9765.5 |
| Tablet | Frame 259 | `986:13752` | 768 × 11101.4 |
| Mobile | Frame 260 | `986:13771` | 390 × 10642.5 |

- Desktop: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=964-64617&m=dev>
- Tablet: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=986-13752&m=dev>
- Mobile: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=986-13771&m=dev>

`fileKey` = `uFoUbPaBrDicjyuSBEbtGT`. All three, Lime's three and Retro's three are on the
**Layout 2** page, `964:58572`. `use_figma` reads on descendants want
`await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('964:58572'))` first.

**Match on node id and width, never on the name** — the misnomers are Lime's page's, one for one:
- The 390 header (`986:13772`) is called "— **Tablet**" (and, above, reads the mobile ramp).
- Both narrow editorial list players (`986:13760`, `986:13779`) and the 768 calendar (`986:13766`)
  are called "— **Desktop**".
- The footer is *Component 2* at 1440 and "Footer — Component 3 / 4 — **Desktop**" at 768 and 390.

**Two sections are wrapped**, exactly as on Lime's page — the insets were read and are Lime's:
- **media** is a `Section` (1440) or `Frame 299` (narrow) holding `Frame 297` (the Scheme 2 panel),
  which holds `Frame 296` (the *"Five worth your ear"* heading over the fanned carousel) beside, or
  above, the editorial numbered list. 297 / 296 / list: 56·86 / 60·60 / x 739 at 1440, 30·60 / 30·60
  / y 792 at 768, 10·40 / 20·40 / **y 722** at 390 (Lime's is 736: the 390 heading box is 251 × 82
  here and the fan is stated at y 32 inside 296, overlapping it — read that master before trusting
  either number). Fit the whole wrapper. *Confirmed in section 3:* both numbers are the one
  arithmetic — the heading is two lines at 46 × 0.89 = 82, Frame 296's gap is −50, so the fan's
  32 is 82 − 50 and the list's 722 is 40 + (82 − 50 + 600) + 50; ours lands at 721.9.
- **calendar**'s `Frame 298` only insets the instance: 56·56, 30·56 and 10·40. Fit the instance.

## The sections

Page order — which is `PAGE_ORDERS[1]` less the video frame. Sizes are the frames' own. Each row's
three masters are fitted in one session. **Lime block** is where that section's Lime layout-2 block
sits in `EncoreSection.jsx` (grep the Retro twin's desktop id to find the branch, then the Lime id
for the block); it is the gate this session widens.

| # | Cat | Desktop node | Size | Tablet node | Size | Mobile node | Size | Lime twin (1440 / 768 / 390) | Retro twin (1440 / 768 / 390) | Lime block | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `header` | `964:64618` | 1440 × 900 | `986:13753` | 768 × 1024 | `986:13772` | 390 × 886 | `964:64580` / `986:11848` / `986:11867` | `964:64637` / `984:34438` / `984:34636` | `if (s.lime) { … return }` at the head of `HeaderV1` | done `2478039` |
| 2 | `bio` | `964:64619` | 1440 × 760 | `986:13754` | 768 × 1138.8 | `986:13773` | 390 × 881.3 | `964:64581` / `986:11849` / `986:11868` | `964:64638` / `984:34877` / `984:34834` | `if (s.v1 && s.lime)` ahead of `Bio`'s `if (s.v1)` | done `0cc99f0` |
| 3 | `media` | `964:64620` *(Section; fan `964:64624` 629 × 441, list `964:64625` 529 × 673, heading `964:64623`)* | 1440 × 965 | `986:13755` *(Frame 299; `986:13759` + `986:13760`)* | 768 × 1568 | `986:13774` *(Frame 299; `986:13778` + `986:13779`)* | 390 × 1438 | `964:64582` / `986:11850` / `986:11869` | `964:64639` / `984:35122` / `984:35396` | `if (s.lime)` inside `Media`'s `if (s.v1)`, after `nowArt` | done `334f580` |
| 4 | `repertoire` | `964:64627` | 1440 × 792 | `986:13762` | 768 × 792 | `986:13781` | 390 × 594 | `964:64589` / `986:11857` / `986:11876` | `964:64646` / `984:35876` / `984:35961` | `if (s.lime)` inside `Repertoire`'s `if (s.v1)`, after `pageWindow()` | — |
| 5 | `gallery` | `964:64628` | 1440 × 675 | `986:13763` | 768 × 468 | `986:13782` | 390 × 364 | `964:64590` / `986:11858` / `986:11877` | `964:64647` / `984:36046` / `984:36070` | **no block** — seven `s.lime` ternaries and one `s.lime &&` overlay through `Gallery`'s `if (s.v1)` | — |
| 6 | `pricing` | `964:64629` | 1440 × 708 | `986:13764` | 768 × 923 | `986:13783` | 390 × 871 | `964:64591` / `986:11859` / `986:11878` | `964:64648` / `986:10425` / `986:10492` | `if (s.lime)` inside `Pricing`'s `if (s.v1)`, after `sel` / `t` | — |
| 7 | `calendar` | `964:64631` *(in `964:64630`)* | 1328 × 1068 *(wrapper 1440 × 1180)* | `986:13766` *(in `986:13765`)* | 708 × 841 *(953)* | `986:13785` *(in `986:13784`)* | 370 × 734 *(814)* | `964:64593` / `986:11861` / `986:11880` | `964:64650` / `986:10607` / `986:10800` | `if (s.lime)` inside `Calendar`'s `if (s.v1)`, after `want` / `hit` / `cur` / `line` | — |
| 8 | `map` | `964:64632` | 1440 × 858 | `986:13767` | 768 × 823 | `986:13786` | 390 × 1286 | `964:64594` / `986:11862` / `986:11881` | `964:64651` / `986:10974` / `986:11467` | `if (s.lime)` inside `EventsMap`'s `if (s.v1)`, after `stats` | — |
| 9 | `form` | `964:64633` | 1440 × 812 | `986:13768` | 768 × 849 | `986:13787` | 390 × 929 | `964:64595` / `986:11863` / `986:11882` | `964:64652` / `986:11591` / `986:11633` | `if (s.v1 && s.lime)` ahead of `EnquiryForm`'s `if (s.v1)` | — |
| 10 | `testimonials` | `964:64634` | 1440 × 853.9 | `986:13769` | 768 × 803 | `986:13788` | 390 × 840 | `964:64596` / `986:11864` / `986:11883` | `964:64653` / `986:11675` / `986:11701` | `if (s.lime)` inside `Testimonials`' `if (s.v1)`, after `rail` | — |
| — | `footer` | `964:64635` | 1440 × 479.5 | `986:13770` | 768 × 647.4 | `986:13789` | 390 × 619.4 | `964:64597` | — | — | **out of scope**, expected: the same tree as Lime's layout-2 footer but for the mock name and its seal frame, and `NVAR.footer` is 1. **Confirmed in section 1** against Grunge's own layout-1 footer (`964:58610` / `986:44068` / `986:44080`): the depth-6 `type:name` multisets are identical at all three widths, 47 nodes each, mock name and seal frame included. The row is closed. |
| — | `video` | `964:64626` | 1440 × 782 | `986:13761` | 768 × 1112.2 | `986:13780` | 390 × 1119.8 | `964:64588` | — | — | **not a category** (above) |

`EncoreSection.jsx`'s fit comments cite the Retro twin's and the Lime twin's node ids, so grep for
either to find the branch and its block. **Cite branches by id, never by line number**: the file
is ~22 000 lines and every session moves it. **Re-measure from the Grunge frame; never reuse
Lime's block sizes** — the radii alone differ on nearly every panel (below).

### Sizes: re-measure, and expect the type to be the difference

Grunge's ramp is Lime's but for the display sizes (layout 1's mode table: `display-xl` 198 / 95 /
52, `display-lg` 130 / 81 / 46, `-md` 72 / 50 / 38, `-sm` 50 / 40 / 30; label-lg / -md / -sm 24 /
20 / 16 at desktop), and
Anton at 0.75 runs narrower than Bebas Neue per em. The frames move where the type is the content:

| Section | Grunge 1440 / 768 / 390 | Lime 1440 / 768 / 390 |
|---|---|---|
| header | 900 / 1024 / **886** | 900 / 1024 / 890 |
| bio | 760 / **1138.8** / **881.3** | 760 / 1191.8 / 909.3 — the Grunge narrow heights are **Retro's exactly** (1138.8 / 881.3) |
| media | 965 / 1568 / **1438** | 965 / 1568 / 1452 |
| repertoire | 792 / 792 / 594 | the same |
| gallery | 675 / 468 / 364 | the same |
| pricing | **708** / **923** / **871** | 730 / 946 / 879 |
| calendar (instance) | **1068** / **841** / **734** | 1071 / 844 / 766 |
| map | **858** / 823 / 1286 | 867 / 823 / 1286 |
| form | 812 / **849** / **929** | 812 / 889 / 933 |
| testimonials | **853.9** / **803** / **840** | 855.9 / 824 / 917 |

**The calendar's slot marks** ("JUN 12", Display/LG) are the likeliest overflow again. Lime's
block pins its date column at `u(desk ? 301 : 187)`, a width it *measured* for Bebas; Anton at
0.75 is a different width. Re-measure the pin at all three widths with the harness's `&open=`
looping every month (Retro layout 2, "measure the pin, never transcribe it"), and note that the
390 master hugs its own "JUN 12" — that is the number that proves the face.

## Grunge's layout-2 mode

Static Youth's four schemes are in [`layout-1.md`](./layout-1.md), *Grunge's Figma mode*, with
the three traps under it (the leaked Lime inks `#15180F` / `#0D1F03`, `stroke2` `#FF0000`, and
Scheme 4 ≡ Scheme 1 byte for byte). All three recur here.

**Schemes by node**, from `explicitVariableModes` (instance, then nested), and what each resolves
to in Static Youth. **Read each node's `fills` before believing a token** — `get_variable_defs`
mixes the schemes, and the fills below were read that way at planning time:

| Section | Instance | Nested | What it paints |
|---|---|---|---|
| header | Scheme 1 | the nav's Book pill, 108 × 35 / 99 × 35: **Scheme 3**; at 390 (91 × 26) **Scheme 4** | ~~the pill renders red with black type at all three widths~~ *corrected in section 1:* the 390 pill is **black under red type** (fill `#000000`, text `#DF262C`, a red disc round a black arrow) with a **red** 3.77 / 3.77 offset block that shows — the render draws it so, and the walk's fills say so. At 1440 and 768 it is red under black type, the black block invisible. Two nodes, two pairs; no raw fill |
| bio | Scheme 1 | — | card `#1A1A1A` (`s.box1`), photo frame `#1A1A1A` |
| media | Section: Scheme 1 | `Frame 297`, the 1328 × 793 panel: **Scheme 2** | panel **`#171716`**, the bar `#000000` |
| repertoire, gallery, pricing, testimonials | Scheme 1 | testimonials: `big-card` and `ts-photo` **Scheme 3** | the sheet `#1A1A1A`; the wells `#0E0E0E`; the big card **`#9E1F17`** |
| calendar | **Scheme 2** | — | panel **`#171716`**, head band `#DF262C` |
| map | Scheme 1 | travel card (652 × 359) **Scheme 3**; `radius-map` (652 × 746) **Scheme 1**; `Map Viewport` Scheme 3 | travel card **`#F52E34`**; `radius-map` `#1A1A1A`; map container `#1A1A1A` |
| form | **Scheme 4** | — | the root `#000000`: **no band** |

Five traps in that table, each a place where Lime's block reads a key that lands on the wrong
value under Grunge — **the key changes, not only the value**:

- **Scheme 2's `sem/bg` is `#171716`, not `s.box1`.** Lime's media and calendar blocks paint their
  panels `s.box1` because under Lime Scheme 2's bg *is* Scheme 1's box/1. Under Grunge `s.box1` is
  `#1A1A1A` and the panel is `#171716`. Layout 1's rule holds: a section on another scheme writes
  that scheme's values as named literals — `HeaderV0`'s `G2 = { bg: '#171716', box3: '#353535' }`
  is the precedent, and the map session of layout 1 named Scheme 2's `box/2` `#222222`. The
  calendar's head-band inks are Scheme 2's `sem/bg` too (Lime reads `s.box1`), so they are
  `#171716` on red, not `#1A1A1A`; sample before choosing which near-black to write.
- **`radius-map` is Scheme 1 here where Lime's was Scheme 2.** Lime's block reads `s.box2` for it,
  which under Grunge is `#383838`; the frame's fill is `#1A1A1A`, `s.box1`.
- **Scheme 3 is red, and Lime's one `lime3` literal maps to two Grunge hexes.** The map's travel
  card is Scheme 3's **`box/2`, `#F52E34`**; the testimonials' big card (and, to be read, the picked
  rail tile) is Scheme 3's **`box/1`, `#9E1F17`**. Lime named both `#CCFA61`. The name does not
  carry; each session names its own, and the `hair` `#15180F26` ink hairline on those cards is a
  **black** 15% here (`#000000@0.15` on both), which is neither `s.stroke1` (white 15%) nor a Lime
  literal.
- **Scheme 4 ≡ Scheme 1, so the form has no band.** Lime's block paints a full-bleed `s.tx` sheet
  and flips the ink to `s.bg`; under Grunge `s.tx` is white and the frame's root is plain
  `#000000`, the page ground. The sheet paint, the ink flip, `mist`, `hair` and the turned-round
  pill all change, so expect a `G` lookup rather than a few ternaries.
- **The leaked inks and the two reds are followed**, layout 1's open question 5: the render draws
  `#15180F` on the red chips and `#FF0000` where `stroke2` is bound. Where a Grunge node is bound
  to `sem/active/text`, the code reads `s.activeFg`, which is that leaked ink already.

### Grounds

Sampled off the three renders at the band edges and the middle. **The sequence is identical at
1440, 768 and 390.**

| # | Section | Ground | What stands on it |
|---|---|---|---|
| 1 | header | page `#000000` | a photograph card (636 × 688, `#0E0E0E` well, red ring) beside a text column; the capsule nav on the ground |
| 2 | bio | page | a `#1A1A1A` card, 865 × 648, radius 30, in a `stroke1` hairline |
| 3 | media | page | the Scheme 2 panel `#171716`, radius 15; the transport bar `#000000` in a red ring, radius 92 |
| 4 | repertoire | **full-bleed `#1A1A1A` sheet** (`phone`, 1440 × 792; `sticky-head` 210 the same), both in a `stroke1` hairline ring | — |
| 5 | gallery | page | photographs, every one red-ringed |
| 6 | pricing | page, in the instance's own `stroke1` hairline ring | the plan card `#1A1A1A`, radius 15, in a `#FF0000` ring |
| 7 | calendar | page | the Scheme 2 instance `#171716`, radius 15, with a **red `#DF262C` head band** (1328 × 315) over the slot rows (653) and the foot (100) |
| 8 | map | page | the Scheme 3 travel card `#F52E34` and the `#1A1A1A` map card, both radius 15 |
| 9 | form | **page** (no band) | a red-ringed photograph (838 × 437 on a `#383838` well) and the `#1A1A1A` sidebar card |
| 10 | testimonials | page | white head type, a `#9E1F17` card, radius 15 |
| — | footer | page, layout 1's | — |

**No root flag widens**, Lime's rule again: `bleed`, `darkMap`, `cream`, `limeBand`, `limeLight`,
`grungeBand` and `grungeRule` all gate on `s.v0`. Lime's two layout-2 sheets were painted in the
branch by the written-out bleed margin; Grunge keeps the repertoire's (in `s.box1`, the same key)
and **loses the form's**. `grungeBand` (`#171716`) is layout 1's Scheme-2 band and stays `s.v0`'s;
the media and calendar panels here are cards on the page, not bands.

## Grunge's layout-2 decorative language

Everything here is behind `s.grunge` (or a named pair), and replaces what the Lime block gates on
`s.lime` and the Retro branch on `s.retro`.

- **No grain on the bands, no torn edges, no checkerboard, no tilt, no seal but the footer's.** Every
  `Grain`, `Checkerboard`, `SealBadge` and `tilt()` in the ten `s.v1` branches is Retro's and stays
  gated off. The three `image 1` rects are grain **inside photographs** only (below).
- **Rings, not glows.** Every Lime layout-2 `INNER_SHADOW` glow — the radius-34 on the header,
  bio, gallery and form photographs, the radius-14 on the media bar, the radius-17 on the
  repertoire's current page pill — is **gone**: no node on any of the thirty masters carries an
  inner shadow. In its place is a **1px INSIDE stroke**, layout 1's lesson ("every glow is a guess
  until the node's `effects` confirm it") turned into the rule. Two reds do that work, both to be
  followed (layout 1, open question 5), and they are not interchangeable:
  - **`#FF0000`, `sem/stroke/2`**: the header's photograph (636 × 688, r15), capsule (163 × 29,
    r999), dark sub-card (310 × 351, r15), avatar tile (107, r6) and hero pill (149 × 34, r999); the
    media bar (629 × 108, r92); the pricing card (640 × 577, r15) and its chips (`toggle-b`, r4);
    the calendar head's rule (`Frame 42`, 1248 × 164 — `#FF0000` on the `#DF262C` band, which Lime
    declined as lime-on-lime; sample before deciding here, the two reds differ).
  - **`#DF262C`, the accent**: the gallery's six tiles (its hero is `#FF0000`), the form's
    photograph (838 × 437, r15), the map's three rings (w 1 / 1.5 / 2).
  - **`#FFFFFF`**: the header's white place card (310 × 351, r15, white on white — sample whether it
    shows at all).
  - **`stroke1`** (white 15%) on everything else that Lime hairlined: the bio card, the fan cards,
    the list rows, the repertoire sheet and rows, the search and toggle, the pager pills, the
    calendar rows, the map rows and container, the form card and its boxes.
  - Draw each as an inset `boxShadow` (Lime's rule, so every stated height holds), on an overlay
    where an image would paint over it.
- **Grain inside three photographs**, the `b74be8bc` raster (`vm.grainSrc`, already widened),
  each the frame's `image 1` under `Grain`'s opt-in `grunge` with `exact`:
  - **header**: 733 × 733 at (−49, −23) inside the 636 × 688 photo frame, node `LIGHTEN` at .29,
    a second gradient paint **hidden** — layout 1's photograph recipe;
  - **gallery**: 831 × 831 at (1, 0) inside the 784 × 583 hero, `LIGHTEN` .29, gradient hidden;
  - **bio**: 433 × 650 at (0, 0) inside the 413 × 628 photo (bigger than its parent, so clipped),
    node **`SCREEN` at opacity 1**, one paint. A screened raster at full strength would wash the
    photograph; the render does read lighter than the other two. **Sample before drawing** —
    PIL mean and stddev inside the photo against the header's — and if the node is what it says,
    draw it and name the diff.
  - Media, repertoire, pricing, calendar, map, form and testimonials carry **none**. A stddev scan
    that finds grain on one of them means this list missed a layer.
- **Effects**, every one read off the nodes (`DROP_SHADOW` unless said):
  - the **header nav's Book pill**: offset 5 / 5, blur 0, **black** at 1440 and 768 — and **red
    `#DF262C` at 3.77 / 3.77 at 390**. It is the `Retro/Poster` effect *style* bound to
    `sem/text/1`, which an effect style resolves in the style's own mode (`figma-frame-reading`):
    black on the black page draws nothing at the wide widths, as Lime's drew nothing on its page.
    Sample the render at all three widths before drawing any of it.
  - the **bio's photo card**: soft 1.25 / 1.25 blur 10.81 at 16% black, all three widths — Lime
    drew it and a scan proved it; on black it may show only at the card's own foot;
  - the **bio's pill**: 5 / 5 **red** at 768 and 390, none at 1440 (Lime's was `#15180F`, the same
    widths). Route 1 — `boxShadow` through `style`, `BookPill` untouched (Lime 2, open question 2);
  - the **calendar's foot pill**: 5 / 5 **red** at all three widths (Lime's was `#AFE335`), the same
    route.
  - **No other effect on any master.**
- **Radii are 15 where Lime's blocks hardcode 50** — the media panel, calendar panel, pricing card,
  map cards, form photo and card, testimonials card; the header's photo and sub-cards too. The bio
  card **keeps 30**, its photo frame 26.25 / 21.44 (the nested clips), the pricing chip 4, the map
  container 8, the media bar 92 (a capsule), the boxes 999. Read each off `get_design_context` or
  the node; `s.radius` is 8 and none of these binds it, as layout 1 found (raw 13 / 15 throughout).
- **Type**: every display and label string is `faced` / `facedLh` and uppercase at its own site
  (layout 1, session 0). The positional two-tone rules recur: the header's title is `HeaderV1`'s
  `twoTone` already (STATIC white, YOUTH red); the form's head is "LET'S MAKE" red over "YOUR NIGHT
  UNFORGETTABLE." white — two block lines, layout 1's form rule in the other tone order; the
  pricing head "PERSONALISED / PLANS & PRICING" is all red; the media head is **white at 1440 and
  red at 768 and 390** (Lime's own flip, `sem/text/2` then `sem/text/1`, and the same tokens); the
  repertoire's "REPERTOIRE", the testimonials' two-line head and the calendar's black-on-red head are
  one tone each. Every heading's line count is measured, not transcribed — Anton at 0.75 breaks
  differently from both Bebas and Stones Crush (layout 1, section 10).
- **The header is the capsule composition** (layout 1, section 1): a `#FF0000`-ringed capsule of
  Music / Gigs / About in red type at 1440 and 768, the burger in the same capsule at 390, the
  wordmark centred, Listen and a red Book Now pill with a dark disc at the right. That is Lime's
  layout-2 nav with the ring's colour changed, so `NavBar` / `Wordmark` / `LogoMark` / `NavMenu`
  should need nothing beyond what section 1 of layout 1 gave them — check each against the render.

## Photography

Every photograph this page draws is **already in `photos.js`**, and no new export is owed. Image
hashes, read off the frames at all three widths:

| Section | Slot (frame box) | Hash | Seeded today | Verdict |
|---|---|---|---|---|
| header | scene 636 × 688 / 708 × 535 / 370 × 263 | `221f121f` | `grungeHero` | ✓ |
| header | portrait tile 107 / 88 / 88 | **`e3790c2c` — Lime's colour avatar** | `grungeHeaderAvatar` (`3ef9ee55`, the singer) | **a placeholder leak**: the component's default picture through a Grunge instance. Keep the seed; named departure |
| bio | photo 413 × 628 / 688 × 628 / 350 × 342 | `8031d0f3` | `grungeStage` (the drummer) | ✓ — the crop at these boxes is the session's check |
| media | five covers | the shared five | `ROW_ART.media` | ✓ |
| gallery | hero 784 × 583 / 342 × 392 / 253 × 284 | `a746e7e4` | `grungeGallery4`, slot 3 = `galActive()` | ✓ — the canvas opens on the frame's own hero |
| gallery | six tiles | Retro's colour strip (`b35b6507`, `b073b46f`, `8f69a4a6`, `35ae28b9`, `3f0c98b4`) | the shoot's six other pictures | **layout 1's departure again**: the frame's strip is a placeholder; the seven Grunge slots stand |
| pricing | three 28 × 28 `av` | Retro's | — | nothing: Retro's fit dropped the credit row (its claim rule — "32 reviews · 4.9" is a fabricated metric), Lime inherited the drop, Grunge does too |
| map | raster 588 × 512 / 318 × 520 / 346 × 298 | `e089bd11` | `vm.mapSrc` under Retro's screened invert on its `#292A1C` plate | Retro's and Lime's call; the plate's colour against this frame's map card is the session's sample |
| form | stage photo 838 × 437 / 334 × 437 / 370 × 262 | `81e1c9a9` | `grungeFormPhoto` (`SEEDS.Grunge.photo`, the whole pub shot) | ✓ |
| form | credit avatar 48 | **`f821adc2` — Lime's colour avatar** | `grungeAvatar` (the pub shot's centre square) | **the second leak**; keep the seed |

**The greyscale is in the assets** (layout 1, session 0), so nothing here desaturates and the two
leaked colour pictures are the only colour on the page — which is how they give themselves away.

## What already renders, and the traps in it

A code survey at the start of this pass (`grep -n "s.grunge\|const grunge" EncoreSection.jsx`,
filtered to the `s.v1` branches):

- **`HeaderV1` renders Retro's half in Grunge tokens** — its `if (s.lime)` block is not widened —
  with three `s.grunge ?` placeholder arms layout 1 left there so card 2 would publish: `mustard =
  s.grunge ? s.tx : s.pillBg`, the face card's title in `s.ac`, the place card on `s.box1`. Open
  question 4 of layout 1 describes the picture (cream mount, checker floor, sub-cards). All three
  arms leave with this pass's first session.
- **Every other `s.v1` branch renders Retro's arm flat under Grunge** — the Lime blocks are gated
  `s.lime` alone, and nothing in them reads `s.grunge`. So goal 1 is met before any session runs
  (every control is shared `v1` code, as in layout 1), and each session still runs
  `theme=2&live=1` for layout 1's reason: a live **state** can stop reading — red on red is this
  template's risk, and the map's travel card, the calendar's head band and the testimonials' card
  are red grounds.
- **Under Grunge `pillBg` is the accent** (layout 1, session 0, from Lime's), so every
  `s.pillBg`-beside-`s.ac` pairing in a Lime block draws red on red. Lime's blocks were written
  knowing that for lime; the same sites need the same care for red, and the frame's answer is
  usually `s.bg` type on the red pill (the calendar's chip) or a `#1A1A1A` seat.
- **Under Grunge `s.paper` is `s.tx`** (white), as under Lime: the flat-theme "cream panel"
  fallbacks in Retro's arms are white. They are unreachable once the block widens, but the
  `mustard` / `cream` locals in `HeaderV1`'s Retro half still read that way until section 1.
- **`sectionVm` carries Lime-keyed layout-2 arms that do not fire under Grunge.** Each session
  reads its frame's insets and widens the arm to `(T.name === 'Lime' || T.name === 'Grunge')` only
  where the frame's numbers match Lime's:
  - ~~`vm.pad` at `d === 2` for `bio` / `calendar` / `media` (top 50, feet 30 / `padY` / 37 · 47 · 35),
    for `pricing` (foot 32) and for `form` / `testimonials` (form foot 90 / 60; testimonials head
    56 / 30, foot 56);~~ *Misfiled — corrected in section 2:* `d` is the 0-based design, so
    `d === 2` is **layout 3's** (the comments cite `964:68655` and its column heads). Layout 2 has
    no `vm.pad` arm under any template; the bio, media, calendar, pricing, form and testimonials
    sessions of this pass widen nothing there and stand on the root's `padY` / `padX`, as Lime's
    layout-2 blocks do.
  - `vm.navNameEms` and `vm.navCtaEms`, Lime-only and in `bebasEms` — the header needs both in
    Anton × 0.75, the way `vm.navEms` already takes `navFace`;
  - `vm.navFits` (JP-039) has a Lime arm and a Retro arm and **no Grunge arm**, so the 768 header
    would fold to the burger where the frame draws Music / Gigs / About. The Grunge arm is
    Lime's sum in `navFace`'s ems against the same 688 row, with the capsule's fixed boxes
    re-measured off the Grunge master.
- **`FIELDS` rows keyed by template** already carry `Grunge` beside `Lime` for the header's keys
  (`heroCta` `{ Retro: [1], Lime: [1], Grunge: [1] }`, `subtitle`, `cta2`, `showBadge`,
  `badgeText`, `location`, `kicker`, `tags`, `align` — layout 1's sweep measured them over the
  placeholder cards) and for `FIELDS.media.cta` (`{ Lime: [0], Grunge: [0], '*': [] }`). Each
  session re-measures the rows its category owns with `scripts/reach.mjs` after fitting — the
  layout-1 sweep said each layout pass re-measures its card, and the header's `[1]` rows were
  measured over a placeholder.
- **The gallery's two layout-2 sites are a named debt.** Layout 1's session 0 left `Gallery`'s
  `bw` gate and its caption ink at `(s.retro || s.lime)` as "not this pass's frame". They are this
  pass's: Grunge's `s.bw` is 2 and the frame strokes 1 inside, so the gate widens to
  `(s.retro || s.lime || s.grunge)` or Grunge takes its own 1; the hero's ring is `#FF0000` where
  the six tiles' are `#DF262C`; and the `s.lime &&` glow overlay becomes the ring. The section has
  no block, so these are ternaries widened one by one.
- **Retro layout-2 open question 15** (the media bar's initials placeholder in `s.muted`) is
  closed under Lime by passing `ink` in the Lime leaf; the widened leaf inherits the fix, and
  `n=8` is still the only way to see it.
- **`HeaderV1` renders under Retro, Lime and Grunge only** (`headerFamily`), so the header needs
  the theme-0 and theme-1 digests and not the flat two's. Every other section needs all four.
- **Under Grunge the digest's header arch 5 folds onto arch 1** (`HEADER_COUNT.grunge` is 4, as
  Lime's), so a layout-2 header change is **six** theme-2 files, not three; the arch-5 files must be
  byte-identical to the arch-1 ones.

## Per-session procedure

[`../lime/layout-2.md`](../lime/layout-2.md)'s *Per-session procedure*, steps 1–9, with:

- step 2 (section 1 only): `git switch -c grunge-layout-2 grunge-layout-1` and commit this plan
  there; then the "before" pictures at `theme=2&arch=1` for all eleven categories at desktop
  (`node scripts/shots.mjs before 2 1`) into the scratchpad.
- step 3: `get_metadata` on the three Grunge nodes **and both twins'** desktop nodes.
- step 5: implement inside the section's existing **Lime layout-2 block**, widened to
  `(s.lime || s.grunge)` at the placement the sections table names, with `const grunge = s.grunge`
  or the `G` lookup; read the block's *Settled* bullet in Lime's plan first — it says what the
  block reads and does not read. Never edit a Lime or Retro literal to make Grunge look right.
  Desktop numbers × 0.82, 768 and 390 verbatim; every display string `faced` / `facedLh` /
  uppercase at its site.
- step 6: the harness is `preview.html?cat=<cat>&arch=1&theme=2&w=desktop|tablet|mobile`
  (`arch` defaults to 1 here, but pass it); function at `theme=2&live=1`; **zero rows at themes
  0, 1, 3 and 4** before and after, every session (`node scripts/digest.mjs before 0,1,3,4` /
  `after`, then `cmp`), because these edits sit inside blocks Lime renders and branches Retro
  renders; then the same at theme 2, where the differing files must all be `_arch_1_` and this
  section's category (the header: arch 1 and arch 5). A theme-2 diff in any `arch_0` file is a
  layout-1 regression.
- step 9's hand-off prompt:

  ```
  Continue the Grunge layout-2 pass with section N, `cat`.

  Read CLAUDE.md, then plans/grunge/layout-2.md, then the Conventions of plans/grunge/layout-1.md
  and its Settled notes for this section, then the Conventions and this section's Settled notes
  of plans/lime/layout-2.md, then plans/CONVENTIONS.md, then the Conventions and narrow-masters
  notes of plans/retro/layout-2.md, then the `figma-frame-reading`, `verifying-the-published-tab`
  and `browser-tool-choice` memory notes, and follow the per-session procedure.

  The three Grunge masters are `<desktop node>` (<W> × <H>), `<tablet node>` (768 × <H>) and
  `<mobile node>` (390 × <H>) in Figma file uFoUbPaBrDicjyuSBEbtGT, page 964:58572; the Lime
  twin is `<lime nodes>` and the Retro twin `<retro nodes>`. Widen the Lime block
  `<placement>` of `<Component>` in EncoreSection.jsx to `(s.lime || s.grunge)` and fit the
  Grunge deltas inside it. Themes 0, 1, 3 and 4 must digest to zero rows, and theme 2 may differ
  only in `<cat>` arch 1.

  <the two or three conventions most likely to bite this section>

  Branch: grunge-layout-2. Do not refresh the root index.html.
  ```

Do **not** refresh the root `index.html` per section. It is the sweep's last step, with the
two-build digest (`scripts/build-digest.mjs`, layout 1's sweep). The seeded `EXAMPLE_PAGE` is arch
0 throughout, so the page walk will show no difference at any theme; the proof that this pass
shipped is card 2 in both builds' setup modals, as it was for Lime.

### The first session: the header

`HeaderV1` is where deliverable 3 is met, so its verification is the builder's, not only the
harness's. With `scripts/page-check.mjs Grunge 1` (it takes the template and a 0-based card list,
so card 2 is `1`) or a puppeteer script off it:
- the setup modal still shows **four** Grunge cards, and card 2 renders the fitted header;
- choosing card 2 opens the editor on a page whose every section is arch 1 and the footer arch 0;
- publish, then in the popup: every nav link scrolls, the burger opens at 390 (and at 768 only
  when the seeded nine do not fit — JP-039; Minimal's three do), Book Now reaches `#form`;
- the Retro header at theme 0 and the Lime header at theme 1 digest to zero rows;
- `scripts/reach.mjs 2` re-measures the header's `Grunge` rows over the fitted card, and
  `FIELDS.header`'s `in` is corrected where the placeholder measurement differs.

Three things the header settles for the pass:
- **`navFits` under Grunge** — the Grunge arm of the JP-039 sum, and `navNameEms` / `navCtaEms` in
  `navFace`'s ems. The 768 master draws the three Minimal links in the capsule; the seeded nine
  are the burger, as under Lime.
- **The nav pill's shadow** — the effect-style trap above; whichever widths draw it, it goes
  through `style`, never a `BookPill` change (Lime 2, open question 2, closed the same way).
- **The rings' colour under Grunge** — `#FF0000` on the photo and the capsule is the first
  `stroke2` ring of the pass; write it as `s.stroke2` and every later section reads the same key.

## The end-of-pass sweep

Written now from what the plan can see; the sections add to it. One session, in this order:

1. **CLAUDE.md and README.md**, wherever they describe Grunge as designed at layout 1 only or a
   layout-2 state as Retro's and Lime's alone. The known sites: CLAUDE.md's "**Grunge is designed at
   layout 1 only**" paragraph and its "Retro, Lime and Grunge" header line; README's "Grunge is
   designed at layout 1" and "only Hero is fitted"; `data.js`'s `headerFamily` comment ("only its
   Hero is fitted so far"); every layout-2 paragraph in CLAUDE.md that names a Lime-only state
   (the calendar's dimmed row, the form's 2px ring, the map's compact pager and raster plate, the
   testimonials' widened tile) owes a Grunge clause where the session found the same or another
   state. Grep both files for "layout 2", "Grunge" and "flat three".
2. **The branch-local "flat three" comment** in `EventsMap`'s layout-2 branch (the zoom controls
   "stay gone under Retro and the flat three; Lime's block draws them" — JP-040's seat): true until
   the map session, false after it. `Bio`'s two hits are in its layouts 3 and 4 and stay.
3. **One whole-page published check under Grunge at layout 2** — `scripts/page-check.mjs Grunge 1`
   (card 2, 0-based) plus the layout-2 controls Lime's sweep listed (header nav and burger, bio pill, media fan /
   bar / list with audio, repertoire search / chips / pager, gallery tiles, pricing chips and pill,
   calendar rows and pill, map rows / pins / Venue Link, form refused and valid submits,
   testimonials tiles and pill, footer links). Then 180px seam clips at every band edge at 1440 and
   390: the repertoire's `#1A1A1A` sheet is the one full-bleed edge on this page, and the form now
   stands on the page ground between the map's cards and the testimonials' head.
4. **The layout-picker thumbnails** for arch 1 under Grunge (deliverable 4).
5. **The other three header cards** still render and publish. No shared component should move in
   this pass (`BookPill`, `Pager`, `SealBadge`, `Grain` are all widened already); cards 3 and 4 keep
   Retro's checker ribbon as placeholders, each its own pass's.
6. **`scripts/reach.mjs 2`** over the whole template: every `Grunge` row in `FIELDS` measured
   over fitted layouts 1 and 2 and placeholder 3 and 4.
7. **`plans/README.md`**: mark the pass closed; **`CONVENTIONS.md`**: fold in whatever *Inherited
   and used* below confirmed a fourth time, and add any bullet that a second layout of a widened
   template leaned on and the file does not yet name.
8. **Refresh the root `index.html`** with the two-build digest: zero rows at every theme on the
   seeded page; the shipped-it tell is card 2 in the two builds' setup modals, as Lime's sweep
   proved it (the old build's card 2 carries the checker ribbon and the cream mount; the new one
   the red-ringed photograph and the white place card).

## Conventions

Append as the pass goes. Do not repeat layout 1's, Lime's or Retro's bullets; name them.

- **Layout 1's conventions all hold**: the gates are `s.grunge`, the named pairs and `s.designed`;
  never edit a Lime or Retro literal; `faced` / `facedLh` and uppercase per site; the `G` lookup
  whose Lime arm is today's literals; theme 1 is the digest at risk.
- **Harness:** `theme=2`, `arch=1`.
- **Layout 2 is a black page with rings.** Every section but the repertoire's `#1A1A1A` sheet
  stands on `#000000`, with `#1A1A1A` and `#171716` cards on it, and every card and photograph is
  outlined — in `#FF0000`, `#DF262C` or `stroke1` — where Lime's was glowed. There are no seams.
- **Scheme 2 is a literal, not `s.box1`**, and Scheme 3 is two literals, not one (`#F52E34` on the
  map, `#9E1F17` on the testimonials). A session on either scheme names its values, layout 1's
  header rule.
- **The page walk is cheap, and it answered the pass's first question** (Lime 2's bullet): one
  `use_figma` read per page frame plus the multiset comparison. Re-run it rather than re-deriving
  a section by eye; the script's shape is in this plan's planning session and Lime's.
- **The node walker, kept** (section 2 rewrote section 1's from nothing — a cleared context has
  no transcript). One `use_figma` call per master, `getNodeByIdAsync` on the instance id with no
  page switch; it returns every node's box relative to the master, fills (hex, opacity, blend,
  image hash, `scaleMode`, `imageTransform`), strokes with weight and align, effects, radius,
  auto-layout paddings and gaps, and each text node's styled segments (face, size, line height,
  ink, `textCase`). Everything a session reads off a frame is in one return:

  ```js
  const root = await figma.getNodeByIdAsync('964:64619')
  const hex = (c) => '#' + [c.r, c.g, c.b].map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('')
  const paint = (p) => {
    const o = { t: p.type, vis: p.visible, op: +(p.opacity ?? 1).toFixed(3), bm: p.blendMode }
    if (p.type === 'SOLID') o.c = hex(p.color)
    if (p.type === 'IMAGE') { o.hash = (p.imageHash || '').slice(0, 8); o.scale = p.scaleMode; o.tr = p.imageTransform }
    if (p.type?.startsWith('GRADIENT')) o.stops = p.gradientStops.map((s) => hex(s.color) + '@' + s.color.a.toFixed(2) + '/' + s.position.toFixed(2))
    return o
  }
  const rx = root.absoluteBoundingBox.x, ry = root.absoluteBoundingBox.y, out = []
  const walk = (n, d) => {
    const b = n.absoluteBoundingBox || { x: 0, y: 0, width: 0, height: 0 }
    const r = { d, id: n.id.split(';').pop(), name: n.name.slice(0, 28), type: n.type, x: +(b.x - rx).toFixed(2), y: +(b.y - ry).toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2), vis: n.visible }
    if (n.opacity !== undefined && n.opacity !== 1) r.op = n.opacity
    if (n.blendMode && n.blendMode !== 'PASS_THROUGH' && n.blendMode !== 'NORMAL') r.bm = n.blendMode
    if ('fills' in n && Array.isArray(n.fills) && n.fills.length) r.fills = n.fills.map(paint)
    if ('strokes' in n && n.strokes.length) { r.strokes = n.strokes.map(paint); r.sw = n.strokeWeight; r.sa = n.strokeAlign }
    if ('effects' in n && n.effects.length) r.fx = n.effects.map((e) => ({ t: e.type, vis: e.visible, c: e.color ? hex(e.color) + '@' + e.color.a.toFixed(2) : null, off: e.offset, r: e.radius, sp: e.spread }))
    if ('cornerRadius' in n && n.cornerRadius !== 0) r.rad = typeof n.cornerRadius === 'number' ? +n.cornerRadius.toFixed(2) : [n.topLeftRadius, n.topRightRadius, n.bottomRightRadius, n.bottomLeftRadius].map((v) => +v.toFixed(2))
    if ('layoutMode' in n && n.layoutMode !== 'NONE') r.lay = [n.layoutMode, n.itemSpacing, n.paddingTop, n.paddingRight, n.paddingBottom, n.paddingLeft, n.primaryAxisAlignItems, n.counterAxisAlignItems, n.layoutWrap].join('/')
    if (n.type === 'TEXT') r.seg = n.getStyledTextSegments(['fontName', 'fontSize', 'lineHeight', 'fills', 'textCase']).map((s) => ({ f: s.fontName.family + '/' + s.fontName.style, sz: s.fontSize, lh: s.lineHeight.unit === 'PERCENT' ? s.lineHeight.value + '%' : s.lineHeight.unit === 'PIXELS' ? s.lineHeight.value + 'px' : 'auto', c: s.fills[0]?.type === 'SOLID' ? hex(s.fills[0].color) : '?', tc: s.textCase, ch: s.characters.slice(0, 16) }))
    if (n.type === 'INSTANCE' && n.explicitVariableModes) r.modes = Object.values(n.explicitVariableModes)
    if (n.clipsContent === true) r.clip = 1
    out.push(r)
    if ('children' in n && d < 9) for (const c of n.children) walk(c, d + 1)
  }
  walk(root, 0)
  return out
  ```

  Read it as arithmetic first (a chip's height less twice its padding is its line box; a caption
  card's height pins its title size), and the `modes` on the root are `[Device, Scheme]` ids.

### Settled in section 1 (the header)

- **No Grunge block, as under layout 1: Lime's `if (s.lime) { … return }` at the head of
  `HeaderV1` is `(s.lime || s.grunge)`**, `const grunge = s.grunge` naming the deltas (eleven
  sites — a `G` lookup was not worth it). The tree is Lime's node for node at all three widths,
  on **Scheme 1**, with **no Device override** (`get_variable_defs` returns 130 / 81 / 46 and
  16 / 13 / 12 on the three), so every leaf reads `s.*` and there is no `tk` table. Every node's
  `fills`, `strokes`, `effects`, radius, blend and text segments were read in one `use_figma`
  walk per master before anything was written; the walker is worth keeping (it is in this
  session's transcript, ~30 lines). Retro's half lost its three `s.grunge ?` placeholder arms;
  the theme-0 digest is zero.
- **Rings, not glows — confirmed off every node.** Nothing on the three masters carries an
  effect but the nav pill (below). The photo is a 1px inside `#FF0000` ring (`s.stroke2`) on the
  `s.box3` well at a raw 15, drawn as Lime's inset overlay; the chip, the face card and its
  tile read `s.stroke2` already in Lime's block, so those three needed nothing. The place card's
  ring is `scheme/3/stroke/2`, **white on white** (sampled: nothing shows), so it is `s.hl`.
- **The photograph is a plain centred cover.** Its fill carries `imageTransform
  [[-1, 0, 1], [0, 0.781, 0.109]]` — a mirror and a vertical crop — under `scaleMode: FILL`,
  which ignores the transform: the render correlates **0.98** with the seed as it is and 0.07
  mirrored (PIL, all three widths). So Lime's `objectPosition: '22% 50%'` is not read and no
  `scaleX(-1)` is drawn. Read a fill's `scaleMode` before believing its `imageTransform`, and
  correlate the render with the seed when in doubt — a mirror is one PIL line to prove.
- **Grain inside the photo is the hero's recipe on a fixed sheet**: `image 1`, a 733.18 square
  at (−48.59, −22.59) / (−12.59, −99.09) / (−181.59, −235.09) off the photo's top-left, lighten
  .29, its gradient paint hidden. Passed through `Grain`'s `style` as **one four-value `inset`
  shorthand** plus `width` / `height` — not `inset` beside `left` / `top`, which is the
  shorthand-longhand mix open question 1 is about.
- **The nav is narrower than the spread.** A 1176 box centred in the 1440 frame (x 132 against
  the spread's 56; `get_design_context` emits it `left-1/2 -translate-x-1/2 w-[1176px]`), 708
  at 768 (flush with the spread), 350 at 390 (x 20 against 10). Drawn as the row's own
  horizontal margin — `u(76)` / 0 / 10 — so the `100cqi` budget shrinks with it. Row tops are
  the tallest child's: **40 / 30 / 12**, heights 34.93 / 34.93 / 34, gaps to the spread
  **81.07 / 35.07 / 44** (the spreads start at Lime's 156 / 100 / 90).
- **The capsule's gap is a fixed 18 at every width** (16px type at 1440, 13 at 768), where
  Lime's block and `vm.navEms` carry it as 23/24 em. So `navEms` under Grunge at `d === 1`
  is the **labels alone** (`navGapEm` 0 in `sectionVm`), and `HeaderV1` adds `(n − 1) × u(18)`
  to the desktop `reserve` and the left cell's `minWidth`; the 768 `navFits` arm adds
  `(n − 1) × 18` to Lime's sum against the same 688 and the same 138.32 of fixed boxes (the
  walk's paddings, gap and disc are Lime's to the hundredth). `navNameEms` / `navCtaEms` take
  Grunge through `navFace`. Measured: Minimal's capsule **134** at 768 against the master's 135,
  **121** at 1440 against 149 × 0.82 = 122.2.
- **The desktop links' 12px floor holds under Grunge, and `NavBar`'s 16 does not carry.** This
  bar caps its links at Label/SM — 13.12 unfaced, 9.84 rendered — and CSS `clamp` lets a floor
  above the cap win outright, so a 16 floor set every link at 16 (12 rendered), a size the
  frame never draws (tried and re-digested: desktop theme 2 moved; reverted). `NavBar`'s 16 is
  for a bar capped at `s.list`. Under Grunge the links can shrink only from 9.84 to 9 before
  the capsule wraps; a floor is nearly a fixed size here, and the seeded nine never reach it.
- **Anton at 0.75 is narrow, so the flip sits higher than Lime's**: at 768 the seeded names
  draw up to **eight** links (Lime's six), nine fold to the burger; `scrollWidth` is 768 at
  every count and the name stays centred to five links. At 1440 the seeded nine sit at the
  full 13.12px on one row (483 wide) and the name slides right (659 against 590) — Lime's rule,
  "the name slides off centre only when it has to"; Minimal centres it.
- **The nav pill is two nodes, two pairs.** 1440 and 768 are Scheme 3's: red under black type,
  a black disc round a red arrow — `BookPill`'s Grunge defaults, passed `bg={s.pillBg}
  fg={s.bg}` — with a black 5 / 5 block that draws nothing on the black page (sampled). **390 is
  Scheme 4's, turned round**: black under red, a red disc round a black arrow, and a **red
  `#DF262C` 3.77 / 3.77 block that shows** (sampled) — `bg={s.bg} fg={s.ac}` and the block
  through `style` (Lime 2, route 1; `BookPill` untouched). Same `pk` 0.7547 recipe as Lime's:
  the walk's 20.83 disc, 3.22 / 13.52 padding and 6.44 gap are 27.6 / 4.27 / 17.92 / 8.53 ×
  0.7547.
- **The 390 pill's label is the one node on the page set in Anton itself** — `Anton/Regular
  12.073`, Retro's component default leaking (the `Retro/Poster` effect style is on the same
  node) where every other string is Stones Crush. It is taken **at that size, undivided**, via
  `style.fontSize: '12.07px'`: `faced` divides out a face that is not there, and the
  convention is "scaled to the frame's glyph size". Result: the pill is **90.5 × 26.4 against
  the master's 91.01 × 26.36**, where Lime's precedent (`s.labelSm` standing in) would have
  set it at 9px Anton and ~76 wide. Lime's own 390 pill was named 82 against 91.
- **Cards**: a raw 15 at every width (Lime 50 / 30), padded 20 / 20 / **10** (Lime 28·26 / 26 /
  16), the tile a raw 6 on `s.box2` in the same `s.stroke2` ring, gap 8, `space-between` —
  the frame's `Frame 2` at y 260 in a 351 card. `cardText`'s title is a direct `s.display`
  site: `faced(s, s.list)` / `facedLh(s, 1.2)` unconditionally (identity off Grunge) and
  `textTransform` behind `grunge`, a digest column. Body copy stays Lime's literals, as in the
  frame; the tile's picture stays `grungeHeaderAvatar` (the frame's `e3790c2c` is Lime's
  avatar, the plan's named leak).
- **The title is two-tone** (`Title twoTone toneA={s.tx} toneB={s.ac}`), the hero's own split
  — STATIC white, YOUTH red on the frame; KAI white, MERCER red on ours.
- **`FIELDS.header` under Grunge: `showBadge` and `badgeText` are `[0, 3]`** (were
  `[0, 1, 3]` over the placeholder card), measured with `scripts/reach.mjs 2` (2,784 renders):
  kicker / tags / showTags `[0, 2, 3]`, subtitle and heroCta `[1]`, location all four, cta2
  `[1, 2]` (4/6 hits — Listen is dropped at 390 in every block, Lime's too), align `[0]`. The
  edit panel on card 2 prints "Not shown in this layout" under Corner badge and Badge text.
- **Verified in the builder** (one puppeteer script, deleted): the setup modal offers four
  Grunge cards; card 2 lays out every section at layout 2 and the footer at layout 1 (the
  page list read after *Back to page list*); in the published tab at 1440 the header's twelve
  fragment links (nine nav, Listen, Book Now, the hero pill) call `scrollIntoView` on their
  ids, Book Now and the hero pill on `form`; the burger opens at 768 (3 → 13 links) and
  toggles at 390; `scrollWidth − innerWidth` is 0 at all three. One link per run reads no
  target — a puppeteer click landing during the previous smooth scroll (a different one each
  run) — so a walk is two runs, not one. Minimal at 768 was proved in the harness
  (`live=1`, three links on `#media` / `#map` / `#bio`), not the builder.
- **Measured against the masters' content edges**: desktop spread at 127.9 (156 × 0.82 =
  127.9), photo 503 × 564.2, grain 601.2 at (−39.8, −18.5), chip 132.9 × 23.8 (163 × 29 ×
  0.82), h1 95.2 tall at 80.25px, hero pill 191.3 × 44.3 (241 × 54 × 0.82 = 197.6 — Anton
  narrower), cards 245 × 268.4, tile 87.7 at radius 4.92 in 16.3 (20 × 0.82), nav pill 85.4 ×
  28.6 flush right; 768 photo 688 × 535 at y 100, chip at **691**, h1 72.1, cards 314 × 128 /
  129, tile 88 at 6 in 20, pill 95.9 × 34.9; 390 photo 346 × 263 at y 90, chip at **389**, h1
  40.9, cards 346 × 108 / 109, tile 88 at 6 in 10, pill 90.5 × 26.4 at y 15.8 (the master's
  15.82). **Named diffs, Lime's**: the seeded subtitle runs 2 / 3 / 3 lines against the frame's
  1 / 2 / 2, so the hero pill and the cards stand ~19 / 21 / 21 lower and the desktop cards
  come out 268 against 288; the section is 941 at 390 against 886 plus our `padY`; the root's
  40 / 22 side padding against the masters' 30 / 10.
- **Digest**: themes 0, 1, 3 and 4 zero files, canvas and `live=1`; theme 2 exactly header
  arch 1 and arch 5 at three widths on both surfaces, arch 5 byte-identical to arch 1.

### Settled in section 2 (the bio)

- **No Grunge block, as under layout 1: Lime's `if (s.v1 && s.lime)` ahead of `Bio`'s
  `if (s.v1)` is `(s.lime || s.grunge)`**, `const grunge = s.grunge` naming eleven deltas at
  seven sites. The tree is Lime's node for node at all three widths (the `+ RECTANGLE:image 1`
  the page walk saw is the grain, below), on **Scheme 1** with **no Device override**
  (`get_variable_defs`: label-sm 16 / 13 / 12, label-lg 24 / 16 / 14, body-lg 16 / 15 / 15,
  body-sm 12 throughout), so every leaf reads `s.*` and there is no `tk` table. Section 1's
  walker ran once per master before anything was written. The theme-1 digest — the one at risk
  — is zero, and so are 0, 3 and 4, canvas and `live=1`.
- **Five of Lime's leaves needed nothing**: the text card (`s.box1`, the `s.stroke1` hairline as
  an inset ring, radius 30, padding 30 / 30 / 20, gap 18), the `/Featured` chip (its 1.417
  inside stroke is `s.stroke2`, which is `#FF0000` here — the pass's first `stroke2` ring
  outside the header; `labelStyle` faces, uppercases and sets the 999), the paragraph, the
  credit line (`s.ac` lead over `s.tx`, the leaked 637.5 × 39 box as a `minHeight`) and the
  390 column with the pill under the line. The Tags instance is the same hand-scaled 264.4
  (15.37 / 10.76 / 9.22, padding 3.84 / 8.45, gap 6.15): only its **dark seat is `sem/box/3`**
  (`#0E0E0E`, `grunge ? s.box3 : s.box2`) and its **radius the mode's own chip 4 × 0.7686 =
  3.07** (Lime's 4.61 is its 6). The fourth chip's white `scheme/4/tag1/text` is the same class
  of leak Lime's bullet ruled "not a third seat" — `c.fg` stands, so both red chips print
  `#0D1F03`, and the frame's white *Archive* is the named one-chip diff.
- **The pill is Scheme 4 turned round, the header's 390 pair at every width**: `bg={s.bg}
  fg={s.ac}` — black under red type, a red disc round a black arrow — with the same 27.6 disc
  and 4.27 / 17.92 padding at all three widths (`k` 0.82 / 1 / 1, Lime's bio recipe, not the
  header's `pk`). Its label is **Stones Crush 12 at 390**, not the header's leaked Anton, so
  `s.labelSm` is right throughout and `faced` applies; `lineHeight` goes through `facedLh`
  (the raw 1.1 in `style` would undo `BookPill`'s faced line box — identity under Lime). Both
  narrow masters carry `DROP_SHADOW 5 / 5` in **`#DF262C`** — `Retro/Poster` bound to
  `sem/text/1`, the accent here — and the render shows it, so `boxShadow: 5px 5px 0 ${s.ac}`
  on `nar`, route 1 again; the desktop pill carries none. Measured **85.4 × 28.6 / 95.9 × 34.9
  / 93 × 34.9** against the masters' 108.32 × 34.93 × 0.82 = 88.8 / 99.32 / 96.32 — Anton at
  0.75 narrower than Stones Crush by 3px, Lime's own diff; flush right at desktop and 768.
- **The photo card keeps the frame's 10 mount, which Lime's frame closes**: `#1A1A1A`
  (`s.box1`) at radius **26.25** with `padding` 10, the photo and its grain in an inner clip at
  **21.44** (`inset: u(10)`, `overflow: hidden` — the absolute photo div grows the clip, so Lime's
  DOM is unchanged), 648 / 648 / 362 tall (Lime 648 / 700 / 390). **No glow and no ring**: neither
  node carries a stroke or an inner shadow (`!grunge &&` on Lime's glow span), and the soft
  `1.25 / 1.25 / 10.81` at 16% black is Lime's, drawn — on black it samples nothing. The
  caption block's 20 inset is measured from the clip, so the wrapper pads **30 / 30 / 31.88**
  (the clip's own 1.875 foot). The caption card is `s.box1` at radius **9** (Lime `s.box2` at
  29), so its `s.box1` disc vanishes into it — the frame's own (`sem/tag/1/bg` *is* box/1); the
  36 disc hugs to 36 × 16.8 narrow as before.
- **The photograph is a plain centred cover, section 1's rule a second time**: the fill's
  `imageTransform [[1, 0, 0], [0, 0.381, 0.169]]` sits under `scaleMode: FILL`, which ignores it —
  the render correlates **0.92** with `grungeStage` cover-fitted as it is and 0.17 mirrored (PIL,
  desktop). No `objectPosition`, no `photos.js` change.
- **Open question 4 closes: the bio's `SCREEN` at 1 is meant.** `image 1` is the **outer card's
  box plus 2.32 tall** (433 × 650.32 / 708 × 650.32 / 370 × 364.32), hung 0.2 down the inner
  clip's top-left and overrunning it right and below, the 740² raster under `FILL` (a centre
  crop, `Grain`'s own `cover`), blend `SCREEN`, opacity 1, one paint. Drawn as `<Grain exact
  grunge blend="screen" opacity={1}>` with **one four-value `inset` plus `width` / `height`**
  (`calc(100% + 20)` / `calc(100% + 22.32)`), section 1's shorthand rule. Sampled: the frame's
  photo region reads **73.3 / 39.2** (mean / stddev) where the seed cover-fitted reads 42.5 /
  43.9, and ours renders **73.0 / 39.5** — the lift is the node's, to the level. The mount strip
  and the text card still sample `#1A1A1A` and the page `#000000`: nothing outside the clip
  lifted.
- **Measured against the masters' content edges**: desktop text card 672.4 × 531.4 (Lime's,
  our content width), `/Featured` 61.6 × 23.6 (76.35 × 29.34 × 0.82 = 62.6 × 24.1), chips 22.1
  tall on a 27.2 pitch with *Default* 55.7 wide (67.91 × 0.82 = 55.7), chip row at 479.1
  (479.6), credit at 554.8 (554.8), photo card 355 × 531.4 at 21.53, clip 338.7 × 515 at 17.58,
  grain 355.1 × 533.3, caption card 305.9 × 68.8 with its foot 26.1 above the card's (31.875 ×
  0.82); 768 chip 66.7 × 25.6 (67.35 × 25.34), chips 21.2 tall, pill flush right, photo 688 ×
  648 with the clip 668 × 628, caption 628 × 74.4 (648 × 75), stack gap 30; 390 chip 63.8 ×
  24.5 (64.35 × 24.34), chips 19.3 tall, pill 48.7 under the credit line (48.65), photo 346 ×
  362, caption 286 × 72.2 (310 × 72), stack gap 10. **Named diffs, Lime's**: the seeded
  paragraph runs 2 / 2 / 4 lines against the frame's 3 / 3 / 6, so the text cards come out
  531.4 (stretched to the photo) / 316.1 / 400.6 against 648 / 340.75 / 449.33; the root's
  40 / 22 side padding against the masters' 30 / 10.
- **`live=1`**: the pill is `<a href="#form">` at all three widths and carries the red block at
  768 and 390 only; nothing else in the section is live. No page errors or warnings.
- **`FIELDS.bio` has no template-keyed row** (`credit` and `cta` are `in: [1]` for every
  template), so `reach.mjs 2` was a confirm-only run (2,784 renders): `bio.credit` and `bio.cta`
  reach bio layout 2 alone; `who.tags` / `who.showTags` reach bio layouts 2 and 4, `who.kicker`
  all four bios and `who.location` layouts 1–3 — the hints' own table. Nothing in `FIELDS`
  moved.

### Settled in section 3 (the media player)

- **No Grunge block, for the third time in this pass: Lime's `if (s.lime)` inside `Media`'s
  `if (s.v1)`, after `nowArt`, is `(s.lime || s.grunge)`**, `const grunge = s.grunge` naming the
  deltas at nine sites. The tree is Lime's node for node at all three widths — Section / Frame
  297 / Frame 296 / the two instances, the fan's five cards at Retro's offsets, sizes, angles and
  opacities — on **Scheme 1** with Frame 297 on **Scheme 2** and **no Device override**
  (`get_variable_defs`: display-lg 130 / 81 / 46, list 24 / 19 / 18, title 36 / 28 / 26, chip
  12 / 11 / 11, body-lg 16 / 15 / 15, body-md 14 / 13 / 13, body-sm 12), so every ramp size reads
  `s.*` and there is no `tk` table beyond Lime's Display/Title. Section 1's walker ran once per
  master before anything was written. The hooks sit above the branches, so the published player
  needed nothing: at `theme=2&live=1`, desktop and 390, the outermost card clicked on its visible
  edge deals Echo & The Floor to the centre and plays it, a row plays and a second click pauses
  it (the row's glyph goes pause → play), back from track one wraps to Roomtone, and the centre
  card, the bar's title and the row's glyph follow together. No page errors.
- **Scheme 2 is three literals, `G2`, the plan's first trap met**: `sem/bg` `#171716` on the
  panel (Lime reads `s.box1`, which is `#1A1A1A` here), `box/1` `#000000` on the fan cards, the
  bar and its inner pill (Lime `s.box2`; the value is `s.bg`'s and is written as the scheme's,
  layout 1's header rule), `box/2` `#222222` on every artwork well (Lime's `dusk` `#43523B`;
  layout 1's card fill). `stroke1` and the Featured chip's `s.ac` / `s.tx` pair read the same
  keys on both templates and needed nothing.
- **Rings, not glows — confirmed off every node**: no effect on any of the three masters (the
  panel, the band, the cards and the bar all `effects: []`). The bar's ring is a 1px inside
  `sem/stroke/2` (`#FF0000`, `s.stroke2`) and its inner shadow is gone, so the overlay is the
  ring alone; the cards keep their 1px inside `stroke1`; the rows' rule is **top-only at all
  three widths** (`strokeTopWeight` 1, the other three 0 — the desktop instance's rows read via
  `findOne` after a constructed `I964:64625;690:3710` id returned null; `figma-frame-reading`'s
  route). Radii are the mode's own: the panel a raw **15** at desktop and 30 narrow (Lime 50 /
  30), the cards **8** (Lime 13), the bar **92** (a full capsule on 108 either way, stated), the
  wells 4 and the sleeve 64 unchanged. The 1440 Section's `#FF0000` stroke is `visible: false`
  and not drawn — Lime's hidden 5px lime top stroke, the same class.
- **Type**: the heading (`s.dispLg`, lh 0.89), the card titles (`s.list`, lh 1.2) and
  `titleType` (Display/Title, lh 1.1 — the bar's and the rows') are `faced` / `facedLh` and
  uppercase through one `disp` spread. The heading is **one tone per width** — white at 1440,
  `s.ac` at 768 and 390, Lime's flip on the same keys — so layout 1's two-tone block-line rule
  does not carry and Lime's `maxWidth` cap does. **The 390 master breaks after "your"** where
  Lime's breaks after "worth": its box is the frame's own 251 at 46, which holds "FIVE WORTH
  YOUR" (`antonEms` 6.43 × 0.75 × 46 = 222) and not "EAR.", so under Grunge the 390 cap is
  `251px`; the desktop cap stays Lime's 4.6em, whose Bebas number lands between Anton's "FIVE
  WORTH" 4.31 and "…YOUR" 6.43 and so still breaks after "worth" — a coincidence, named in the
  comment. Line boxes 95.23 / 72.09 / 40.94 land the masters' 232 / 72 / 82 on 2 / 1 / 2 lines.
- **The 390 fan band does not clip where the 768 and 1440 bands do** (`clipsContent` false on
  `879:10429`), but Frame 297 clips at 370, and Lime's bleed of the band over the panel's 20
  padding is exactly that clip; nothing moves.
- **Measured against the masters' content edges**: desktop panel 650.3 (793 × 0.82) at radius
  12.3, heading 190.4 (232 × 0.82) at 80.25px on two lines, fan band from 239.6, bar at 512.5
  (625 × 0.82) and 88.6 tall at radius 75.4 in the `#FF0000` ring, list at x 606 with rows
  103.1 (125.8 × 0.82) under a 36.2 counter, bar and row titles 22.125px (36 × 0.82 × 0.75) in
  a 32.45 line box, card titles 15px in 24; 768 panel 1448.1 (1448), heading 72.1 on one line
  in red, fan at 142.1 (142), bar at 634.1 (634) at radius 92, list at 792.1 (792), rows 110.6
  (110.6), counter 43; 390 panel 1357.9 (1358), heading 251 × 81.9 on two lines, fan at 71.9
  (72), bar at 563.9 (564), list at 721.9 (722), rows 110.6. Eleven `#222222` wells (five
  cards, five rows, the sleeve). **Named diffs, Lime's**: the root's 40 / 22 side padding
  against the masters' 30 / 10; the narrow canvases 688 / 346 against 708 / 370, a clip on the
  centred fan; the harness's neutral track art against the frame's covers; Anton at 0.75
  against Stones Crush.
- **`FIELDS.media` moves nothing**: `cta` is `{ Lime: [0], Grunge: [0], '*': [] }` and layout 2
  draws no pill (the walk has none), `soundcloud` reaches layout 1 alone, and `reach.mjs`
  carries no media probe, so no run was owed.
- **Digest**: themes 0, 1, 3 and 4 zero files, canvas and `live=1`; theme 2 exactly media arch
  1 at three widths on both surfaces.

### Inherited and used

*(One line each time a session leans on a bullet from `CONVENTIONS.md`, layout 1's or Lime's
Conventions, with the plan it came from — layout 1's running list, kept for the sweep's item 7.)*

- *Check a narrow master's Device mode before trusting `s.*`* (A) — all three header nodes,
  none overridden.
- *Every glow is a guess until the node's `effects` confirm it* (A) — every ring on the page is
  a plain stroke; the one effect is the pill's block, sampled at each width.
- *`get_variable_defs` mixes nested schemes; the fills settle which node is on which* (A) — the
  nav pill's two schemes.
- *The emitted `var(--token, #hex)` fallback is the component's default* (A) — and so is a
  node's *font*: the 390 pill's Anton is Retro's.
- *A stand-in face is scaled to the frame's glyph size* (C) — read literally on the one node
  whose glyphs are already Anton's.
- *Under Lime `pillBg` IS the accent* (C) — the nav pill's pair is the frame's own, so no
  stand-in.
- *`vm.title` shadows the ramp's `title` size* (C) — not met: this header's Display/List sites
  are `s.list`.
- *The first layout-2 block: `if (s.lime) { … return }` at the head of `HeaderV1`* and *the
  capsule's links hold one row by budgeting the whole bar* (Lime 2, header) — widened; the
  budget gained the fixed gaps.
- *The Scheme 4 nav pill recipe* and *`pk` 0.7547* (Lime 2, header) — the same boxes.
- *Open question 2's route 1: the hard shadow goes through `style`* (Lime 2, bio) — the 390
  pill's red block.
- *Under Lime the digest's header arch 5 folds onto arch 1* (Lime 2, header) — six theme-2
  files, not three, again.
- *`vm.navFits`: one sum per bar* (Lime 2 QA, JP-039) — the Grunge arm.
- *Field reach is measured, not read off the prose* (B) — `reach.mjs 2` over the fitted card.
- *The whole-page published check is one puppeteer script* (B) — a one-off off
  `page-check.mjs`'s `publish`, since that script only renders and publishes cards past 0.
- *Every glow is a guess until the node's `effects` confirm it* (A) — the bio's photo card,
  a second time: no stroke, no inner shadow, only Lime's soft drop shadow.
- *Check a narrow master's Device mode before trusting `s.*`* (A) — all three bio nodes, none
  overridden.
- *The emitted `var(--token, #hex)` fallback is the component's default* (A) — the chips'
  `sem/box/3` and `radius/chip` read off the nodes, not the emitted `#0e0e0e` / `3.074px`.
- *The second layout-2 block: `if (s.v1 && s.lime)` ahead of `Bio`'s `if (s.v1)`* and *a chip
  standing on `s.box1` takes `s.box2` as its dark seat* (Lime 2, bio) — widened; the seat is
  box/3 here, read off the instance.
- *A hand-scaled instance is not the ramp* (Lime 2, bio) — the same 264.4 Tags instance, its
  radius the one number that moved.
- *The 115 × 35 pale pill is not always hand-shrunk at 390* (Lime 2, bio) — `k` 0.82 / 1 / 1
  again, and the label is the ramp's, not section 1's Anton leak.
- *Open question 2's route 1: the hard shadow goes through `style`* (Lime 2, bio) — the
  narrow pills' red block.
- *The photograph is a plain centred cover; read a fill's `scaleMode` before its
  `imageTransform`* (section 1) — correlated again, 0.92 against 0.17.
- *Grain inside a photo: one four-value `inset` shorthand plus `width` / `height`* (section 1)
  — the bio's sheet, screened at 1.
- *A stand-in face is scaled to the frame's glyph size* (C) — every label in the block through
  `labelStyle` / `faced`; `facedLh` passed where a caller's `style` would override the line box.
- *Theme 1 is the digest at risk in a widened block* (layout 1, section 2) — zero.
- *Check a narrow master's Device mode before trusting `s.*`* (A) — all three media nodes, none
  overridden.
- *Every glow is a guess until the node's `effects` confirm it* (A) — the bar's glow is gone
  from the node; every ring on the section is a plain stroke.
- *`get_variable_defs` mixes nested schemes; the fills settle which node is on which* (A) — the
  panel's `#171716` beside the instances' `#000000` cards, read off the fills.
- *`getNodeByIdAsync` on the instance id works without a page switch; walk down with `findOne`*
  (memory: `figma-frame-reading`) — the desktop rows' per-side strokes, after the constructed id
  returned null.
- *The third layout-2 block: `if (s.lime)` within `Media`'s `if (s.v1)`, after `nowArt`*, *the
  featured tag sits at the frame's 26.5 / 26*, *row rules are top-only* and *`tilt()` is
  Retro's alone, so a Lime fan writes its angle out* (Lime 2, media) — widened; all four held.
- *Read a hand-fanned stack's states off the frame; do not ramp them* (Retro 2, media) — the
  same five states, shared.
- *Scheme 2 is a literal, not `s.box1`* (this plan's Conventions) — the first section to meet
  it: three literals.
- *A stand-in face is scaled to the frame's glyph size* (C) — heading, card, bar and row titles.
- *Theme 1 is the digest at risk in a widened block* (layout 1, section 2) — zero, a second
  time.

## Open questions

1. **The `rowGap` shorthand warning** — layout 1's sweep saw React's "removing `rowGap` … `gap`"
   once on cards 2 and 3 under four templates, traced to a node in `HeaderV1` that drops an inline
   `rowGap` on resize, and left it for this pass. ~~Section 1 reads the node and either fixes it in
   the widened block or records why it is Retro's.~~ *Answered in section 1:* **it is not the
   header's** — `HeaderV1` carries no `rowGap` at all. The warning (arguments read off the
   console: `Removing`, `rowGap`, `gap`) fires in the *editor's* console because the published
   root runs in the opener's JS, and it fires when the published tab is resized from desktop to
   narrow: the only layout-2 rows that hold `rowGap` conditionally are **`EnquiryForm`'s**, in
   both halves — `...(desk ? { flexWrap: 'wrap', rowGap: u(20) } : null)` inside a `row()`
   whose `gap` is set — and `EventsMap`'s layout-2 and -3 rows (`...(s.mob ? { flexWrap,
   rowGap } : null)`), which fire on a resize into or out of 390 — card 3's logging is
   presumably the map's layout-3 row; not verified. The fix is to state `rowGap` unconditionally (it is inert without `flexWrap`); the
   form session (9) and the map session (8) take their own rows.
2. **The pricing credit row** — the frame draws the three avatars, the stars and "32 reviews ·
   4.9", as Lime's did. Retro's claim rule dropped it and Lime inherited the drop; this plan inherits
   it too. Worth telling the designer with layout 1's list.
3. **The two leaked colour pictures** (the header's avatar tile and the form's credit avatar are
   Lime's `e3790c2c` / `f821adc2`) — the seeds stand. Worth telling the designer: the Grunge
   instances carry the component's default pictures in two slots.
4. ~~**The bio grain's `SCREEN` at 1.0** — the session's sample decides whether the node means it.~~
   *Answered in section 2:* it does. The frame's photo region samples 73.3 / 39.2 against the
   seed's 42.5 / 43.9, and ours 73.0 / 39.5 with the raster screened at 1 — the lift is the
   node's, to the level, and the mount and the page do not move. Drawn as stated; not a diff.
5. **The pricing instance's hairline ring** — visible here as under Lime, where section 7 declined
   it as the component frame's stroke (Retro's branch never drew it, and stacked bands would double
   it). Layout 1's pricing drew its root rule (`grungeRule`) because there it was the only visible
   root stroke on the page. Here the repertoire's sheet carries one too. The pricing session takes
   the call once and the repertoire session inherits it.
6. **The footer is shared with layout 1** (`NVAR.footer` is 1), which is structural; section 1's
   comparison against Grunge's own layout-1 footer is what closes the row.
