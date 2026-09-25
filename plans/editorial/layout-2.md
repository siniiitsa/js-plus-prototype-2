# Editorial layout 2 — section-by-section plan

This is the working checklist for bringing **layout 2** of the Editorial template up to its Figma
designs, the way [`../lime/layout-2.md`](../lime/layout-2.md) did for Lime and
[`../grunge/layout-2.md`](../grunge/layout-2.md) for Grunge. It runs one unit per session, all three
widths together, clearing context between units. Layout 1 (`s.v0` under `s.editorial`) is fitted and
closed; nothing here should move it.

**This plan is Grunge layout 2 again, with Editorial layout 1's idiom.** It does not repeat either:
the tree evidence, the wrapper insets, the procedure, the harness, the digest and the verification
are Lime's and Grunge's, verbatim, with `theme=2` read as `theme=3`. The gates (`s.limeTree`,
`s.editorial`), route A's scheme resolution, `DashRule`, `notoEms` and the uppercase-per-site rule
are [`layout-1.md`](./layout-1.md)'s, and they carry over whole. What is written here is only what
differs — and what differs most is that **Lime's and Grunge's layout-2 pages are dark, and this one
is paper**, with five of its ten sections standing a card or a band on another scheme, two of them
on a *different* scheme at 1440 than at 768 and 390.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then
- the whole *Conventions* of [`layout-1.md`](./layout-1.md) — the foundation (`s.limeTree` /
  `s.editorial`, `SIENNA_MEDIA`, `DashRule`, `notoEms`, route A, the fitted-statement recipe) — and
  its *Settled in session 0*, since this pass extends that session's scheme resolution
- [`../CONVENTIONS.md`](../CONVENTIONS.md), groups **A, B, C and D2**, and the bullets they point at
- the section's *Settled in section N* bullets in **both** [`../lime/layout-2.md`](../lime/layout-2.md)
  and [`../grunge/layout-2.md`](../grunge/layout-2.md) — the block you are widening, and the one
  widening of it already done — and the section's entries in
  [`../lime/layout-2-qa-fixes.md`](../lime/layout-2-qa-fixes.md) (JP-037 and JP-039 header, JP-037
  bio, JP-036 pricing, JP-040 map, JP-041 calendar), which moved those blocks after they were fitted
- the *Conventions* **and the narrow-masters notes** of [`../retro/layout-2.md`](../retro/layout-2.md),
  which built every `s.v1` branch
- the *Per-session procedure* of [`../lime/layout-2.md`](../lime/layout-2.md)

Then the memory notes `figma-frame-reading`, `verifying-the-published-tab` and
`browser-tool-choice`. `SPEC.md` lives in git history: `git show 8fa8ff4:SPEC.md`.

Branch: **`editorial-layout-2`, forked from `main`** (`b38daf1`, which carries the merged
`editorial-layout-1`, PR #35). Session 0 creates it and commits this plan there.

## What the pass must deliver

1. **Every layout-2 section works in the published tab under Editorial**: every `s.v1` control
   CLAUDE.md lists under *`s.live` is false everywhere except the published tab*.
2. **Every layout-2 section looks as close to its Figma frame as possible**, at 1440 (× 0.82 onto
   the 1180 canvas), 768 and 390.
3. **The setup modal's card 2, "Feature spread", lays out a fitted page.** `pickHeader` writes arch 1
   to every section, so this pass turns card 2 from its placeholder (layout 1, open question 4:
   Retro's `HeaderV1` in Scheme 1 tokens, the checker ribbon, `mustard` standing in as `s.box3`)
   into Editorial's own page. The header session verifies it **in the builder**, not only the
   harness.
4. **The sidebar's layout-picker thumbnails for layout 2** under Editorial look like their
   sections. They render `sectionVm` at `SIZES.desktop`, so they follow the desktop fit — including
   the desktop's own schemes (below) — for free; check them once, in the sweep.

## What this pass actually is

**Editorial's layout-2 page is Lime's layout-2 page in a fourth variable mode**, as its layout-1 page
was Lime's layout-1 page. The evidence, read at planning time (2026-09-25) with one `use_figma` walk
per page frame (main component, `resolvedVariableModes`, every nested `explicitVariableModes`,
effects, `dashPattern`s, rotations, image hashes, text faces) and the longest common subsequence of
every visible node's `(depth, type, name)` against the three twins' desktop instances:

| Section | Editorial nodes | LCS with Retro / Lime / Grunge | What only Editorial draws |
|---|---|---|---|
| header | 40 | 37 / **39 / 39** | the mock name "Sienna Vale" (Lime's and Grunge's are their own) |
| bio | 41 | 39 / **39 / 39** | the mock name |
| media (the `Section`) | 97 | **97 / 97 / 97** | — |
| repertoire | 85 | **85 / 85 / 85** | — |
| gallery | 18 | **18 / 18 / 18** | — (Retro's and Grunge's carry one more node, a grain rect) |
| pricing | 67 | **67 / 67 / 67** | — |
| calendar (the instance) | 47 | **47 / 47 / 47** | — |
| map | 123 | **123 / 123 / 123** | — |
| form | 42 | **42 / 42 / 42** | — |
| testimonials | 26 | **26 / 26 / 26** | — |
| footer | 35 | — / 30 / 30 | **layout 1's footer** (below) |

- Every instance is the **`Theme=Editorial` variant** of the set the twins instantiate
  (`Headers — E · Feature Spread — Desktop / Theme=Editorial` `624:5303`, the bio's `676:1978`, the
  form's `725:2582`, …) and carries `1 · Primitives` → **Sienna Vale**. Ids differ per variant, so
  diff **by traversal order** (layout 1, *What this pass actually is*).
- **No Device override on any instance.** The 390 header is *named* "— Tablet", as Lime's and
  Grunge's are, but its `resolvedVariableModes` is `Device: Mobile`; layout 1's 390-hero trap does
  not recur. Each session re-checks its own three.
- **No seams, no tape, no tilted print, no sparkle, no grain, no seal but the footer's.** The page
  walk found no vector wider than 60 outside the footer, no grain raster (`b74be8bc`) and no
  rotation but the media fan's ±5.33 / ±10.66 (the twins' `k * 5.33`) and the footer seal's
  −25.03. Layout 1's `Tape`, its leant prints and `GrungeStar` sparkles have no seat on this page;
  **`DashRule` has one in nine sections** (*decorative language*).
- **The footer is layout 1's, and out of scope.** The narrow masters are the very components layout
  1 fitted (`907:12166`, `907:12467`); the desktop one is an instance of `446:8698` ("Component 2 /
  Property 1=editorial") where layout 1's is `907:11924`, and the two trees are identical node for
  node at all three widths (35 each, name and size). `NVAR.footer` is 1, and
  `SCHEMES_OF.Editorial[0].footer` (3) is read at every page layout — the layout-2 frame's footer is
  Scheme 3 too. The row is closed at planning time.

So, as under Grunge's layout 2: **no Editorial-only branches and no Editorial-only ternary trees.**
The work is Editorial deltas inside **Lime's layout-2 blocks**, each widened from `(s.lime ||
s.grunge)` to `s.limeTree` with `const ed = s.editorial` naming the deltas — or a third arm at the
head of the block's `G`, whose Lime and Grunge arms stay byte-identical. **Themes 1 and 2 are the
digests at risk**: every widened block is one Lime *and* Grunge render. A section whose tree turns
out not to be the twins' is the exception; record it under *Conventions* before branching.

**Where each Lime block sits decides how it widens** — the same placements as Grunge's (its sections
table), found at planning time by walking each `(s.lime || s.grunge)` gate to its enclosing branch:

- `if (s.lime || s.grunge) { … return }` **at the head of `HeaderV1`**. Widening it makes Retro's
  half unreachable under Editorial, so layout 1's two `s.editorial` placeholder arms in that half
  (`const mustard = s.editorial ? s.box3 : s.pillBg` and the place card's `s.editorial ? cream :
  ink` body) become dead code and are **deleted**; the theme-0 digest proves nothing moved.
- `if (s.v1 && (s.lime || s.grunge))` **ahead of `if (s.v1)`** — the bio and the form.
- `if (s.lime || s.grunge)` **inside `if (s.v1)`, after the seam** — media, repertoire, pricing,
  calendar, map, testimonials.
- **No block** — the gallery: `const grunge = s.grunge` and a handful of `(s.lime || grunge)`
  ternaries through `Gallery`'s `if (s.v1)`. It widens ternary by ternary, from the frame.

**Inheritance** ([`../CONVENTIONS.md`](../CONVENTIONS.md)): **A** and **B** always; **C**, since
this is another variable mode of a page already fitted; **D2**, since its blocks are Lime's layout-2
blocks, widened as Grunge widened them. Not D1: its helpers (`BookPill`, `Pager`, `TagChips`,
`labelStyle`, `NavBar`, `SealBadge`) were widened to `s.limeTree` in layout 1 and already switch on
under Editorial's layout-2 branches; what they draw here is each session's to check, not a D1
bullet to lean on. Keep the running *Inherited and used* list below; the sweep folds it into that
file as a *Leaned on in Editorial (layout 2)* column.

**Video is not a category.** The pages carry a *Video Players — A · Dashboard player* frame in
fourth place (`964:64607` / `986:15666` / `986:15685`); no `Video` component exists, so it is not a
row here, as on Lime's and Grunge's pages.

## The Figma source

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Frame 252 | `964:64598` | 1440 × 9719.5 |
| Tablet | Frame 261 | `986:15657` | 768 × 11333.3 |
| Mobile | Frame 262 | `986:15676` | 390 × 10936.4 |

- Desktop: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=964-64598&m=dev>
- Tablet: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=986-15657&m=dev>
- Mobile: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=986-15676&m=dev>

`fileKey` = `uFoUbPaBrDicjyuSBEbtGT`. All three sit on the page **Layout 2** (`964:58572`) beside
Retro's (`964:64636` …), Lime's (`964:64579` …), Grunge's (`964:64617` …) and Pop's (`964:64560` …).
`use_figma` reads on descendants want `await figma.setCurrentPageAsync(await
figma.getNodeByIdAsync('964:58572'))` first; `getNodeByIdAsync` on an instance id works without it.
**The page frames are set right this time** (Sienna Vale, Scheme 1; layout 1's desktop page was set
to Lime) — but read a section node, never the page, all the same.

**Match on node id and width, never on the name** — the misnomers are the twins', one for one:
- The 390 header (`986:15677`) is called "— **Tablet**" and resolves `Device: Mobile`.
- The 768 calendar (`986:15671`) is called "— **Desktop**"; the 390 one (`986:15690`) "— Mobile".
- The footers are "Component 2" at 1440 and "Footer — Component 3 / 4 — **Desktop**" at 768 and 390.
- **The 390 page renders 667 wide**: the 390 bio's credit box (`Frame 6`, inside `Frame 260` — the
  planning read called it the chip row; section 2 corrected it) is a 637-wide no-wrap box in a 330
  column. The block follows its height, never its width, so it does not reproduce (open question 7).

**Two sections are wrapped**, exactly as on the twins' pages:
- **media** is a `Section` (1440, `964:64601`) or `Frame 299` (narrow) holding **`Frame 297`, the
  Scheme 2 panel** (`964:64602` / `986:15661` / `986:15680`), which holds `Frame 296` — the *"Five
  worth your ear"* heading (`964:64604` / `986:15663` / `986:15682`) over the fanned carousel
  (`964:64605` / `986:15664` / `986:15683`) — beside, or above, the editorial numbered list
  (`964:64606` / `986:15665` / `986:15684`). The panel stands in its wrapper at **56·86, 30·60 and
  10·40** (the twins' own, by the sizes: 1440 − 1328 and 965 − 793 halved, and so on). Panel
  padding and gap: **60 all round, gap 50,
  horizontal** at 1440 (the list at x 739); **60 / 30, gap 50, vertical** at 768 (heading 648 ×
  130, fan at y 140, list at y 850); **40 / 20, gap 50, vertical** at 390 (heading 251 × 86, fan at
  y 36 — the twins' −50 overlap — list at y 726, against Grunge's 722 and Lime's 736). Fit the whole
  wrapper.
- **calendar**'s `Frame 298` only insets the instance — **56·56, 30·56 and 10·40**, the twins' own
  — and sets no mode: the Scheme 2 instance is a card on the page's paper. Fit the instance.

## The sections

Page order — `PAGE_ORDERS[1]`, which is the frames' order less the video frame. Sizes are the
frames' own. Each row's three masters are one session. **Lime block** is where that section's Lime
layout-2 block sits in `EncoreSection.jsx` (grep the Lime or Grunge twin's desktop id to find it);
it is the gate the session widens. The narrow twins are in Grunge's sections table.

| # | Cat | Desktop node | Size | Tablet node | Size | Mobile node | Size | Scheme 1440 / 768 / 390 | Lime twin | Grunge twin | Lime block | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | *foundation* | `964:64598` *(page)* | — | `986:15657` | — | `986:15676` | — | — | — | — | Scheme 4, `SCHEMES_OF.Editorial[1]`, decision 1's mechanisms | **done** (`e0526e7`, `088845d`) |
| 1 | `header` | `964:64599` | 1440 × 900 | `986:15658` | 768 × 1024 | `986:15677` | 390 × 932 | 1 (nav pill **4**) | `964:64580` | `964:64618` | `if (s.lime \|\| s.grunge) { … return }` at the head of `HeaderV1` | **done** `41ca390` |
| 2 | `bio` | `964:64600` | 1440 × 760 | `986:15659` | 768 × 1217.8 | `986:15678` | 390 × 880.3 | 1 (pill **4**) | `964:64581` | `964:64619` | `if (s.v1 && (s.lime \|\| s.grunge))` ahead of `Bio`'s `if (s.v1)` | **done** `cbff882` |
| 3 | `media` | `964:64601` *(Section; panel `964:64602`)* | 1440 × 965 | `986:15660` *(Frame 299; `986:15661`)* | 768 × 1626 | `986:15679` *(Frame 299; `986:15680`)* | 390 × 1442 | page 1, **panel 2** | `964:64582` | `964:64620` | inside `Media`'s `if (s.v1)`, after `nowArt` | **done** `0118702` |
| 4 | `repertoire` | `964:64608` | 1440 × 792 | `986:15667` | 768 × 792 | `986:15686` | 390 × 594 | **4 / 1 / 1** | `964:64589` | `964:64627` | inside `Repertoire`'s `if (s.v1)`, after `pageWindow()` | **done** `f592f45` |
| 5 | `gallery` | `964:64609` | 1440 × 675 | `986:15668` | 768 × 468 | `986:15687` | 390 × 364 | 1 | `964:64590` | `964:64628` | **no block** — `(s.lime \|\| grunge)` ternaries through `Gallery`'s `if (s.v1)` | **done** `a888524` |
| 6 | `pricing` | `964:64610` | 1440 × 715 | `986:15669` | 768 × 924 | `986:15688` | 390 × 865 | **3 / 1 / 1** | `964:64591` | `964:64629` | inside `Pricing`'s `if (s.v1)`, after `sel` / `t` | **done** `4fd0b57` |
| 7 | `calendar` | `964:64612` *(in `964:64611`)* | 1328 × 1072 *(1440 × 1184)* | `986:15671` *(in `986:15670`)* | 708 × 803 *(915)* | `986:15690` *(in `986:15689`)* | 370 × 774 *(854)* | page 1, **card 2** (head band **1 / 3 / 3**) | `964:64593` | `964:64631` | inside `Calendar`'s `if (s.v1)`, after `want` / `hit` / `cur` / `line` | — |
| 8 | `map` | `964:64613` | 1440 × 833 | `986:15672` | 768 × 823 | `986:15691` | 390 × 1286 | 1 (travel card **3**, map card **2**, viewport **3**) | `964:64594` | `964:64632` | inside `EventsMap`'s `if (s.v1)`, after `stats` | — |
| 9 | `form` | `964:64614` | 1440 × 802 | `986:15673` | 768 × 877 | `986:15692` | 390 × 925 | **4** | `964:64595` | `964:64633` | `if (s.v1 && (s.lime \|\| s.grunge))` ahead of `EnquiryForm`'s `if (s.v1)` | — |
| 10 | `testimonials` | `964:64615` | 1440 × 831.9 | `986:15674` | 768 × 863 | `986:15693` | 390 × 939 | 1 (card and picked tile **3**) | `964:64596` | `964:64634` | inside `Testimonials`' `if (s.v1)`, after `rail` | — |
| — | `footer` | `964:64616` | 1440 × 479.5 | `986:15675` | 768 × 692.3 | `986:15694` | 390 × 736.3 | 3 | — | — | — | **out of scope**: layout 1's footer, closed at planning time (above) |
| — | `video` | `964:64607` | 1440 × 782 | `986:15666` | 768 × 1111.2 | `986:15685` | 390 × 1118.8 | 1 | — | — | — | **not a category** |

**Cite branches by id, never by line number**: the file is ~24 500 lines and every session moves it.
**Re-measure from the Editorial frame; never reuse Lime's or Grunge's block sizes.**

### Sizes: re-measure, and expect the type to be the difference

Sienna Vale's ramp is Grunge's but for the display rows and `title` (layout 1's mode table:
`display-lg` 118 / 73 / 48, `-md` 64 / 45 / 36, `-sm` 45 / 36 / 30, `title` 32 / 25 / 23), and
Noto Serif Display at wdth 62.5 is its own width (`faceK` 1; layout 1's header found the big title
~9% wider than Fisterra's). The frames move where the type is the content:

| Section | Editorial 1440 / 768 / 390 | Lime | Grunge |
|---|---|---|---|
| header | 900 / 1024 / **932** | 900 / 1024 / 890 | 900 / 1024 / 886 |
| bio | 760 / **1217.8** / 880.3 | 760 / 1191.8 / 909.3 | 760 / 1138.8 / 881.3 |
| media | 965 / **1626** / 1442 | 965 / 1568 / 1452 | 965 / 1568 / 1438 |
| repertoire | 792 / 792 / 594 | the same | the same |
| gallery | 675 / 468 / 364 | the same | the same |
| pricing | **715** / 924 / **865** | 730 / 946 / 879 | 708 / 923 / 871 |
| calendar (instance) | 1072 / **803** / 774 | 1071 / 844 / 766 | 1068 / 841 / 734 |
| map | **833** / 823 / 1286 | 867 / 823 / 1286 | 858 / 823 / 1286 |
| form | **802** / 877 / 925 | 812 / 889 / 933 | 812 / 849 / 929 |
| testimonials | **831.9** / **863** / **939** | 855.9 / 824 / 917 | 853.9 / 803 / 840 |

Three heads the planning read already flags, each a *head that must fit its measure* (CONVENTIONS
C) for its session to check before choosing:

- **The testimonials' head overruns its own frame.** "Honest feedback / from people who booked" is
  a `WIDTH_AND_HEIGHT` text node **1333 wide in the 1328 column** at 118 — five over even in
  Fisterra — and Noto runs wider. At 390 it wraps to four lines at 48 (350 wide, `HEIGHT`), which
  is why that master is 939 tall.
- **The calendar's slot marks** ("JUN 12", Display/LG 118 / 73 / 48) — Lime's block pins its date
  column at a width it measured for Bebas, Grunge's re-measured it for Anton (`u(desk ? 287 :
  179)`); Noto is a third width. Re-measure the pin at all three widths with `&open=` looping every
  month (Retro layout 2, *measure the pin, never transcribe it*). **The frame cannot be the ruler
  here**: its "JUN 14" row renders as "JUN 1" and a DEMO mark — the demo face drops the 4 there, as
  it drops `'` and `&` (trap 5).
- **The header's title** at `display-lg` 118 in the spread's right column ("SIENNA VALE" on one
  line at 1440, two at 768 and 390) — layout 1's header fitted `KAI MERCER` to its column through
  `navNameEms`; this one is the Lime block's, so read what it does before reusing that recipe.

## Editorial's layout-2 mode

Sienna Vale's Schemes 1–3 are in [`layout-1.md`](./layout-1.md), *Editorial's Figma mode*, and in
`THEMES[3]` (`palette` / `sem` / `tags`, `schemes[2]`, `schemes[3]`), with that plan's five traps.
All five recur here; trap 1 (Scheme 1's `stroke1` is opaque ink) most of all, since six of the ten
sections stand on paper.

**Scheme 4 is new to the code**, and read at planning time off the file (`2 · Scheme` resolved
through the Sienna Vale primitives, the method layout 1's session 0 used):

| | **Scheme 4** · terracotta | `THEMES` key |
|---|---|---|
| `bg` / `text1` / `text2` | `#C86E52` / `#F6F0E8` / `#141414` | `palette` |
| `box1` / `box2` / `box3` | `#DA7C5E` / `#EF9173` / `#BE6346` | `sem` |
| `active` bg / text | `#141414` / `#C86E52` | `activeBg` / `activeFg` |
| `inactive` bg / text / border | `#C86E52` at alpha 0 / `#F6F0E8` / `#F6F0E8` | `inactiveBg` (`'rgba(200, 110, 82, 0)'`) / `inactiveFg` / `inactiveLine` |
| `stroke1` / `stroke2` | `#F6F0E8` 56% / `#141414` | |
| `glow`, `media`, `box/N/text` | `#C86E52`, `#E6B6A0`, `#FFFFFF` | `glow`, `SIENNA_MEDIA`, `hl` |
| `tag1` / `tag2` bg · text | **`#141414` · `#C86E52`** / **`#EF9173` · `#141414`** | `tags` `['#141414', '#EF9173']`, `tagFg` `['#C86E52', '#141414']` |

**Layout 1's table had Scheme 4's two tag seats the other way round** (it read tag1 `#EF9173`,
tag2 `#141414`), the same slip its session 0 found in Scheme 2's; the file is above. Tags 3–7
alternate the same two. Under Scheme 4 `pillBg` (`activeBg`) is **ink**, `s.ac` is **paper**, and
`deep` — the darkest tag — is ink.

**Schemes by node** (`resolvedVariableModes` on the root, every nested `explicitVariableModes`,
all three widths). **Read each node's `boundVariables` before believing a token** — CONVENTIONS A's
*a scheme that did not move can still move the binding* was the whole of most layout-1 sessions:

| Section | 1440 | 768 | 390 | Nested (every width unless said) |
|---|---|---|---|---|
| header | 1 | 1 | 1 | the nav's Book pill (139 × 35 / 124 × 35 / 91 × 26): **Scheme 4** |
| bio | 1 | 1 | 1 | the card's Book pill (139 × 35 / 124 × 35 / 119 × 35): **Scheme 4** |
| media | `Section` 1 | wrapper none (page 1) | wrapper none | **`Frame 297`, the panel: Scheme 2** |
| repertoire | **4** | **1** | **1** | — |
| gallery | 1 | 1 | 1 | — |
| pricing | **3** | **1** | **1** | — |
| calendar | wrapper none; instance **2** | the same | the same | the head band (1328 × 363 / 708 × 261 / 370 × 279): **Scheme 1 at 1440, Scheme 3 at 768 and 390** |
| map | 1 | 1 | 1 | the travel card (`Frame`, 652 × 354): **3**; `radius-map` (652 × 721): **2**; `Map Viewport` (588 × 492): **3** |
| form | **4** | **4** | **4** | — |
| testimonials | 1 | 1 | 1 | `big-card` (1199 × 330): **3**; the picked `ts-photo` tile: **3** |
| footer | 3 | 3 | 3 | — (layout 1's) |

Six traps in that table — the first three new to this template, each a place where layout 1's
route A as it stands cannot say what the frame says:

1. **Two sections change scheme between widths.** The repertoire is a terracotta sheet at 1440 and
   paper at 768 and 390; pricing an ink band at 1440 and paper narrow — the renders agree (the
   dashes are paper at 1440 and ink narrow in both). `SCHEMES_OF` is keyed by template, design and
   category, **not width** (`sectionVm` reads `SCHEMES_OF[theme.name]?.[d]?.[cat]`), so today it
   can seat either section on one scheme at every width. Grunge's layout 4 met the same thing on
   nested nodes (its bio 1 / 3 / 3, its seal 4 / 3 / 3) and wrote literals per width; here it is a
   **whole section's** ground. Decision 1(a).
2. **Two sections are a card on another scheme standing on the page.** The media panel and the
   calendar instance are Scheme 2 (taupe) cards inset in Scheme 1 (paper) wrappers. Route A seats a
   *section*, and the root paints `s.bg`, so seating either on Scheme 2 would paint the gutters
   taupe; leaving it on Scheme 1 leaves every leaf of the card to be restated as Scheme 2. Decision
   1(b).
3. **Eight nested nodes stand on another scheme** — the header's and the bio's Book pills (4), the
   calendar's head band (1 / 3 / 3), the map's travel card (3), map card (2) and viewport (3), the
   testimonials' big card and picked tile (3). Layout 1 had one such site (pricing's pills) and
   wrote it as named literals; eight, most of them whole cards, is route B again by the back door.
   Decision 1(c).
4. **The calendar band's binding hides its flip.** Its fill binds `sem/text/1` — terracotta in
   Scheme 1 *and* Scheme 3, so the band is terracotta at every width — but its type binds `sem/bg`:
   **paper at 1440, ink at 768 and 390**. Both renders show it. Read the rest of the band's
   bindings before choosing a mechanism.
5. **Scheme 4's accent is paper and its active pair is ink under terracotta**, so a Lime block's
   `s.pillBg`-beside-`s.ac` pairing draws an ink pill with paper type, and `legible()` computes
   against terracotta — the repertoire's pager draws exactly that (ink arrows) at 1440. Read the
   render.
6. **Lime's and Grunge's layout-2 pages are dark; six of Editorial's ten sections stand on paper**
   (header, bio, gallery, map, testimonials, and the repertoire and pricing at 768 and 390). The
   blocks' assumptions — pale type on a dark ground, a bright accent — hold on the ink and taupe
   sites and break on the paper ones, where layout 1's own paper sections (its bio, gallery, map,
   calendar and testimonials *Settled* bullets) are the nearer precedent than either twin's arm.

### Grounds

Sampled off the three renders. **The sequence differs by width** (trap 1):

| # | Section | 1440 | 768 and 390 | What stands on it |
|---|---|---|---|---|
| 1 | header | paper | paper | an arch photograph in a terracotta ring; the capsule nav on the ground; a dashed paper face card and an ink place card |
| 2 | bio | paper | paper | a `box1` card dashed terracotta; a mounted photo card under a soft shadow |
| 3 | media | paper | paper | **the taupe panel** (Scheme 2), square |
| 4 | repertoire | **full-bleed terracotta sheet** (Scheme 4) | **paper** | dashed rows, the pager |
| 5 | gallery | paper | paper | photographs |
| 6 | pricing | **full-bleed ink band** (Scheme 3) | **paper** | a dashed card |
| 7 | calendar | paper | paper | **the taupe card** (Scheme 2) under a terracotta head band |
| 8 | map | paper | paper | an ink travel card, `box1` gig rows, a taupe map card round an ink viewport |
| 9 | form | **full-bleed terracotta band** (Scheme 4) | the same | a stage photograph, a `box1` sidebar card dashed ink |
| 10 | testimonials | paper | paper | an ink review card beside a rail of dashed tiles |
| — | footer | ink, layout 1's | the same | — |

At 768 and 390 the repertoire, gallery and pricing are one paper run, and with straight edges they
merge — the frames' own picture, accepted as layout 1's merged neighbours were. *(Section 4: the
repertoire does not — its sheet is `box1` `#FFF9F2` closed by a solid ink ring. Section 6: nor
does pricing — the instance's own `stroke/1` closes it in an ink ring too, so at 768 and 390 the
run is two ringed paper boxes with the gallery's bare paper between.)* **No root flag
widens**: `bleed`, `darkMap`, `cream`, `limeBand`, `limeLight`, `grungeBand`, `grungeRule` and
`editorialRule` all gate on `s.v0`. Under route A a whole-band section needs no flag (the root
paints `s.bg`); a card section needs decision 1(b)'s.

## The decisions this plan hands over

### 1. Schemes this page's route A cannot yet say — **settled: all three recommendations**

*Settled in session 0 (2026-09-25):* the user took the recommendation on all three parts: (a) a
`SCHEMES_OF` triple read off `Z.dev`, (b) media and the calendar seated on their cards' Scheme 2
with the root painting the page's paper round them, and (c) a flat `vm.onScheme[n]`. See
*Conventions → Settled in session 0* for the mechanisms. The rest of this heading is kept as the
record of the question.

Layout 1's route A (its decision 3) seats a section on a scheme by design; this page needs three
things it does not do. Each has a recommendation, and each part can be answered on its own.

**(a) A section's scheme by width.** *Recommended:* an entry of `SCHEMES_OF` may be a number (every
width, as today) or a `[desktop, tablet, mobile]` triple, read by `Z.dev` in `sectionVm`'s head —
`repertoire: [4, 1, 1]`, `pricing: [3, 1, 1]`. Everything derived below the head follows, as it
does today. Every caller already passes a `Z` carrying `dev` (checked at planning time): the
canvas's `makeVm` and `PublishedPage` by width, `LayoutPicker`, `TemplatePreview` and
`HeaderChoices` at `SIZES.desktop`, and `preview.jsx` its own `Z[device]` — so the published
desktop (which zooms, JP-038) and every thumbnail and modal card take the desktop scheme, and no
fallback is owed. *The alternative* is Grunge layout 4's: seat the
section on one scheme and write the other width's values as literals in its block.

**(b) A card on another scheme.** *Recommended:* seat the section on the card's scheme (`media: 2`,
`calendar: 2`) so every leaf of the card reads `s.*`, and have the root paint the **page's** ground
round it — a vm key holding the theme's own `palette[0]` (Scheme 1's paper, unaffected by the
seat) and one root expression beside `editorialRule`, gated `(s.me || s.cal) && s.v1 &&
s.editorial`. The block paints the card itself, as Lime's blocks already paint their panels. What
it costs: `s.bg` inside those two sections is the card's ground, not the page's (layout 1's
decision 3 already named that meaning for route A); a reordered page puts the card on whatever
the page is, which is paper under Editorial always. *The alternative* is to leave both sections on
Scheme 1 and restate the card's leaves through (c).

**(c) A nested node on another scheme.** *Recommended:* one additive vm key — call it
`vm.onScheme`, not `schemes`, which is the theme's own (theme-shaped) key — resolving **every**
scheme of a theme that carries `schemes` into the flat keys a block reads (`bg`, `ac`, `tx`, the
`sem` keys, and the two chip seats with their inks), keyed by scheme number with Scheme 1 as the
theme's own; undefined for every other theme. A nested node then reads `s.onScheme[3].bg` rather
than a literal, and the calendar's band picks its scheme by width with the same triple as (a). *The alternative* is layout 1's rule for its one site, named literals per node
(pricing's `PILL`), eight times over — the travel card alone has a dozen leaves.

Session 0 asks this and records the answer here, as layout 1's session 0 recorded its decisions 1
and 3. Everything below is written for the recommendations; where the alternative would cost more,
it is the media, calendar, map and testimonials sessions.

### 2. `navModeDefault` and the 768 nav fit — **not a user call; the header session's**

JP-039's rule (CLAUDE.md, the header's nav) is already the user's: Minimal where a template's
layout-2 and -3 masters draw Music / Gigs / About. Editorial's layout-2 masters do, at 1440 and 768
(390 is the burger), so `navModeDefault` gains Editorial **at `d === 1` only** — its layout 3 is
still a placeholder, whose pass adds `d === 2` — and `vm.navFits` gains an Editorial arm summed off
this master's own capsule. Layout 1's `navGapEm` of 23/16 is Editorial's at *every* layout today;
this capsule's gap is to be read (the planning read found the capsule `Frame 251` at 249 × 34 with
item spacing 10, and the right cell's gap 12), and `navGapEm` narrowed to layout 1 if it differs.

### 3. `plans/CONVENTIONS.md` — **the sweep folds this pass in**

Editorial's second pass is the file's first second-layout column for a template that built its own
foundation. Keep *Inherited and used* below, one line per bullet leaned on; the sweep adds the
column and any row this pass leaned on three times that the file does not name (the per-width
scheme and the nested-scheme key are likely ones).

## Session 0 — the schemes

Layout 1's session 0 with a much smaller brief: it touches no section's layout code.

0. **Branch and plan.** `git switch -c editorial-layout-2 main`, commit this plan and
   `plans/README.md` there. With the dev server up, take the pass's "before" pictures at
   `theme=3&arch=1` for all eleven categories at all three widths (`node scripts/shots.mjs before 3
   1 desktop`, then `tablet`, `mobile`) into the scratchpad.
1. **Ask decision 1.** Nothing below depends on the answer's details but (a)–(c)'s mechanisms.
2. **Commit (a), pure refactors — all five themes digest to zero rows, every layout:** the
   `SCHEMES_OF` triple read by `Z.dev` (no triple in the data yet), the page-ground key and its root
   expression (no section gated on yet), `vm.onScheme` (no reader). Under the alternatives, the
   commit is smaller or empty.
3. **Commit (b), the data — themes 0, 1, 2 and 4 at zero rows; theme 3 moves only in design-1
   files:** `THEMES[3].schemes[4]` from the table above (Scheme 1's shape; `inactiveBg` as
   `'rgba(200, 110, 82, 0)'`); `SCHEMES_OF.Editorial[1] = { media: 2, repertoire: [4, 1, 1],
   pricing: [3, 1, 1], calendar: 2, form: 4 }`; the root's page ground switched on for media and
   calendar. **Theme 3's `arch_0` files must not move** — layout 1's row is untouched — and every
   theme-3 file that does move must be `media`, `repertoire`, `pricing`, `calendar` or `form` at
   **arch 1** (the digest walks each category's four designs, so nothing else folds onto it; only
   the header's arch 5 does, and the header has no row). Keep before / after shots of those five
   at all three widths.
4. **Name what moved and why** in *Settled in session 0*, as layout 1's did: the flat `s.v1`
   branches (Retro's arms) now stand on the frames' grounds, so the repertoire and the form turn
   terracotta, pricing ink at 1440, and media and calendar taupe inside paper — expect the flat
   branches' own readings (`deep`, `paper`, `pillBg`) to go wrong on them in ways their sessions fix.
5. **`preview.jsx`** needs nothing if `sectionVm` reads the triple off `Z.dev` (its `Z` carries
   `dev`); confirm at `w=tablet` that the repertoire is paper and at `w=desktop` terracotta.

**Verification for session 0:** commit (a) at all five themes, canvas and live
(`node scripts/digest.mjs before 0,1,2,3,4` / `after`, then `EXTRA='&live=1'`); commit (b) at
themes 0, 1, 2 and 4, and theme 3 filtered to `_arch_0_` (zero) and the five categories above.

## The header, and card 2

`HeaderV1`'s Lime block is where deliverable 3 is met.

- **The block widens at its head** to `s.limeTree`, `const ed = s.editorial`. Retro's half becomes
  unreachable under Editorial: delete layout 1's two placeholder arms there (above), and nothing
  else — `Checkerboard` in Retro's half is Retro's.
- **The header is on Scheme 1 — paper — where both twins' are dark.** Every `s.*` the block reads
  resolves to paper's values, so the block's pale-on-dark assumptions break here first (trap 6). Its
  nav pill is **nested Scheme 4** (decision 1(c)): a terracotta pill, paper type, a paper disc
  round a terracotta arrow, and the `Retro/Poster` effect style's **paper 5 / 5 block** (3.77 at
  390) — which draws nothing on the paper page. Sample the render before drawing it (Grunge's
  header: *the nav pill is two nodes, two pairs*).
- **What the frame draws** (desktop render; confirm each against Lime's and Grunge's arms before
  inventing anything): the links Music / Gigs / About in terracotta in an **outlined terracotta
  capsule**, no fill; the wordmark ink, centred; Listen ink; the Book pill above. An **arch
  photograph** (636 × 688; the hero `ae069c14` at `CROP` at 1440, `FILL` narrow — read its
  `imageTransform`) in a terracotta ring, where Lime's is a rounded card under a glow and
  Grunge's a red-ringed one; an outlined terracotta "Available for bookings" chip with a dot; the
  **title one tone in ink** at `display-lg`; the subtitle terracotta; the "Enquire about a date"
  pill terracotta with a paper disc; the **face card** on `box1` dashed 10, 10 terracotta round an
  89² portrait (`488cc3d7`, `CROP` at 1440), its title ink and body terracotta; the **place card**
  ink, dashed terracotta, its pin tile outlined paper and its type paper. No seal, no checker, no
  sparkle, no mount, no tilt. 768 stacks the photograph (708 × 495) over the title (two lines)
  beside the two cards; 390 is the burger capsule, the photograph 370 × 227, and the cards
  full-width.
- **One leak to name at 390**: the nav pill's label is set in **Anton 12.07** (47 × 13), the only
  Anton on the page — a designer's slip, not a face to load.
- **Decision 2's nav work**: `navModeDefault` at `d === 1`, `navFits`' Editorial arm, the
  capsule's gap. The 768 master draws Music / Gigs / About; the seeded nine fold to the burger.
- **Digest**: `HEADER_COUNT.editorial` is 4, so header arch 5 folds onto arch 1 — **six** theme-3
  files for any header change, the arch-5 ones byte-identical to arch 1 (Grunge's *What already
  renders*).
- **In the builder** (`node scripts/page-check.mjs Editorial 1,0,2,3` — card 2 first gets the full
  walk): the modal still shows four Editorial cards; card 2 opens the editor on a page whose every
  section is arch 1 and the footer arch 0; publish, then every nav link scrolls, the burger opens at
  390 (and at 768 only when the seeded nine do not fit), Book Now reaches `#form`.
- **`scripts/reach.mjs 3`** re-measures the header's Editorial rows over the fitted card — layout
  1's sweep measured `subtitle` / `heroCta` `[1]`, `cta2` `[1, 2]` and `badgeText` `[1, 3]` over
  placeholder card 2, which drew Retro's seal; this frame draws none, so expect `showBadge` and
  `badgeText` to lose design 1.

## Editorial's layout-2 decorative language

Everything here is behind `s.editorial`, `s.limeTree` or a named pair, and replaces what the Lime
block gates on `s.lime` and Grunge's arms on `s.grunge`.

- **No seams, no band grain, no tape, no leant print, no sparkle, no seal but the footer's.** Every
  band and card meets its neighbour on a straight edge at all three widths. Layout 1's `Tape`, its
  drop-shadowed prints, `GrungeStar` and `SealBadge` have no seat on this page — so none of the
  sessions should find itself calling one; and the twins' layout-2 glows (Lime) and rings (Grunge)
  are replaced by the dashed rule wherever this frame draws one.
- **Dashed rules** — the language's main device again, on nine sections. All 1px; the table is the
  planning walk's (node, `dashPattern`, the stroke's hex at 1440 — read the binding, and each
  node's `strokeAlign` and per-side weights, before drawing):

  | Section | Node | Dash | Ink |
  |---|---|---|---|
  | header | the face card and the place card (310 × 362 / 324 × 149 / 370 × 149) | 10, 10 all | `#C86E52` |
  | bio | the card (865 × 648 / 708 × 420 / 370 × 448) · its divider | **10, 11** all · 10, 10 | `#C86E52` |
  | media | the bar (629 × 108) · the list head and five rows | 10, 10 | `#E6B6A0` (Scheme 2 `stroke2`) |
  | repertoire | the head block (1440 × 205), the toggle, the search, the list column, ten rows | 5, 5 | `#F6F0E8` 56% at 1440 (Scheme 4 `stroke1`) · **`#141414` at 768 and 390** |
  | pricing | the plan card (640 × 584) · its divider | 10, 10 | `#F6F0E8` 56% at 1440 (Scheme 3 `stroke1`) · **`#141414` narrow** |
  | calendar | the column head · four slot rows | 10, 10 | `#F6F0E8` (Scheme 2 `stroke1`) |
  | map | the travel card's rules · four gig rows (652 × 75, all round) · the 120 mi ring | 10, 10 · 10, 10 · **4, 4** | `#E6B6A0` · `#C86E52` · `#141414` |
  | form | the sidebar card (450 × 377) · three boxes (402 × 42) | 10, 10 · **6, 6** | `#141414` (Scheme 4 `stroke2`) |
  | testimonials | the rail's three tiles (97 × 102) | 5, 5 all | `#141414`, the picked one `#F6F0E8` (Scheme 3; 56% if `stroke1`) |

  `DashRule` draws every one: `side` 'top' / 'bottom' for a rule, `side="all"` with `radius` for a
  card (layout 1, *Conventions*). The gallery draws none.
- **Effects**, every one read off the nodes (`DROP_SHADOW` unless said), and **no other effect on
  any master**:
  - the **nav's Book pill**: paper, offset 5 / 5 (3.77 / 3.77 at 390), blur 0 — the `Retro/Poster`
    effect style, resolving in its own mode (`figma-frame-reading`); paper on paper draws nothing;
  - the **bio's Book pill**: the same paper block, **at 768 and 390 only**;
  - the **bio's photo card**: soft, 1.25 / 1.25, blur 10.81, black 16%, at all three widths — the
    twins' own;
  - the **calendar's foot pill**: the paper 5 / 5 block, at all three widths — an ink pill on taupe,
    where it shows. A hard offset shadow goes through the caller's `style`, never `BookPill`'s props
    (CONVENTIONS C).
- **The arch** — the header's photograph, 636 × 688 in a terracotta ring (layout 1's bio arch, its
  radius clamped to the semicircle by CSS as by Figma).
- **The fan** keeps the twins' angles (`k * 5.33`); the cards read translucent taupe in the render
  — read their fills and opacities.
- **Type**: every display and label string uppercase at its own site, in Noto (`faceK` 1, so
  `faced` is the identity). Every head on this page is **one tone** and every size is the ramp's —
  no hand-scaled Bold outside the footer (the page walk's text faces: Fisterra Regular at ramp sizes
  only, Inter, Chakra Petch, and the footer's Bold 57.84). The demo face's DEMO marks stand in for
  `'`, `&`, `(` and `)` throughout (trap 5), and the render shows one in place of the **4** of "JUN
  14": "PLANS & PRICING", "LET'S MAKE", "LATE LIGHTS (ORIGINAL MIX)", "SARAH & TOM", "JUN 14". Noto
  has them all.

## Photography

Every photograph this page draws is **already seeded** (`SEEDS.Editorial` in `photos.js`); no
export is owed. Image hashes, read off the frames at all three widths:

| Section | Slot (frame box) | Hash | Seeded | Verdict |
|---|---|---|---|---|
| header | scene 636 × 688 / 708 × 495 / 370 × 227 | `ae069c14` (**`CROP`** at 1440, `FILL` narrow) | `editorialHero` | ✓ — read the crop's `imageTransform` against our `objectPosition` |
| header | portrait tile 89² | `488cc3d7` (`CROP` at 1440) | `editorialHeaderAvatar` | ✓ |
| bio | photo 413 × 628 / 688 × 628 / 350 × 342 | `9d20fe0d` | `editorialStage` | ✓ |
| media | five covers | `21e9622c` `40041573` `b737c3e0` `4e7cc529` `8c7fa7d8` | `ROW_ART.media` | ✓ the shared five |
| gallery | hero 784 × 583 / 342 × 392 / 253 × 284 | `90514a32` (`CROP` at 1440) | `editorialGallery4`, slot 3 = `galActive()` | ✓ — the canvas opens on the frame's own hero |
| gallery | six tiles (ten at 390) | Retro's strip (`b35b6507`, `b073b46f`, `8f69a4a6`, `35ae28b9`, `3f0c98b4`) | the shoot's other six | **layout 1's departure again**: the frame's strip is a placeholder; the seeds stand |
| pricing | three 28² `av` | Retro's reviewers (`fbe69d03`, `ef14e35b`, `2de917bf`) | `REVIEWERS` | ✓ |
| map | raster 588 × 492 / 318 × 523 / 346 × 302 | `e089bd11` | `vm.mapSrc` | ✓ — the olive in the render is the twins' plate and blend; read them |
| form | stage photo 838 × 437 / 334 × 437 / 370 × 262 | `ae069c14`, the hero | `photo` = `editorialHero` | ✓ (layout 1's session 0 seeded it for this frame) |
| form | credit avatar 48 | **`f821adc2` — Lime's colour avatar** | `editorialHeaderAvatar` | **a placeholder leak**, Grunge's second: the component's default picture. Keep the seed; named departure |

## What already renders, and the traps in it

A code survey at planning time (`grep` for every `(s.lime || s.grunge)` gate and every
`s.editorial` / `s.limeTree` read, mapped to its enclosing branch):

- **`HeaderV1` renders Retro's half in Scheme 1 tokens** — its Lime block is not widened — with the
  two placeholder arms above and Retro's checker ribbon (layout 1, open question 4).
- **Every other `s.v1` branch renders Retro's arm under Editorial**, flat: no layout-2 branch reads
  `s.editorial` or `s.limeTree` anywhere. So goal 1 is met before any session runs (every control is
  shared `v1` code), and each session still runs `theme=3&live=1` for layout 1's two reasons: a
  decoration can cover a control, and a live **state** can stop reading — here light on light on
  the paper sections, and ink on ink on the pricing band and the map's travel card.
- **The shared helpers layout 1 widened are already on here**, drawn inside Retro's arms:
  `BookPill`'s Lime branch, `Pager`'s Editorial arm, `TagChips`' designed branch, `labelStyle`'s
  untracked Noto, `NavBar` (card 4). What a widened block passes them is each session's; expect
  the theme-3 digest of a session to move only its own category.
- **`sectionVm`'s layout-2 arms**: `navModeDefault` and `vm.navFits` (decision 2), `navGapEm`
  (Editorial's 23/16 at every layout), `navNameEms` / `navCtaEms` (already `notoEms` under
  Editorial), and the testimonials' `TESTI_HEADING_2` fallback at `d === 1` (every template's). The
  `d === 2` arms are **layout 3's** — Grunge's layout-2 plan misfiled them once; leave them.
- **`FIELDS` rows keyed by template**: the header's Editorial row (above; re-measured by the header
  session) and `FIELDS.calendar.heading`'s `Editorial: [0, 1, 2, 3]`. Each session re-measures the
  rows its category owns with `scripts/reach.mjs 3` after fitting.
- **`deep` / `mapBg` are terracotta under Scheme 1** (layout 1, session 0), so the flat map plate
  at arch 1 is terracotta today; the Lime block reads neither — its raster sits on Retro's own
  `#292A1C` plate, a literal, which is the olive the frame's render shows.

## Per-session procedure

[`../lime/layout-2.md`](../lime/layout-2.md)'s *Per-session procedure*, steps 1–9, with:

- step 2: session 0's (above), not the header's.
- step 3: `get_metadata` on the three Editorial nodes and **both twins'** desktop nodes, then the
  paired diff walk (CONVENTIONS A) against the nearer twin — **by traversal order**.
- step 4: `get_variable_defs` on all three nodes, and **one `explicitVariableModes` walk per
  master** — this page's schemes move between widths (the table above), so a mode read at 1440 is
  not the 768 one's. Then the node walker (Grunge layout 2, *Conventions*) with `dashPattern`,
  per-side weights and bound-variable names (layout 1's additions).
- step 5: widen the section's **Lime layout-2 block** at the placement the sections table names to
  `s.limeTree`, `const ed = s.editorial`, reading its Grunge arm first; a third arm in `G` where
  the block has one. Never edit a Retro, Lime or Grunge literal to make Editorial look right.
  Desktop numbers × 0.82, 768 and 390 verbatim; every display string uppercase at its site.
- step 6: the harness is `preview.html?cat=<cat>&arch=1&theme=3&w=desktop|tablet|mobile` (`arch`
  defaults to 1 here, but pass it); function at `theme=3&live=1`; **zero rows at themes 0, 1, 2
  and 4** before and after, every session (`node scripts/digest.mjs before 0,1,2,4` / `after`, then
  `cmp`); then theme 3, where every differing file must be this section's category at arch 1 (the
  header: arch 1 and arch 5, which folds onto it). **A theme-3 diff in any `arch_0` file — or in
  the header's `arch_4`, which folds onto design 0 — is a layout-1 regression.**
- step 9's hand-off prompt:

  ```
  Continue the Editorial layout-2 pass with section N, `cat`.

  Read CLAUDE.md, then plans/editorial/layout-2.md, then the Conventions of
  plans/editorial/layout-1.md, then plans/CONVENTIONS.md (groups A, B, C and D2), then this
  section's Settled notes in plans/lime/layout-2.md and plans/grunge/layout-2.md (and its
  entries in plans/lime/layout-2-qa-fixes.md), then the Conventions and narrow-masters notes of
  plans/retro/layout-2.md, then the `figma-frame-reading`, `verifying-the-published-tab` and
  `browser-tool-choice` memory notes, and follow the per-session procedure.

  The three Editorial masters are `<desktop node>` (<W> × <H>), `<tablet node>` (768 × <H>) and
  `<mobile node>` (390 × <H>) in Figma file uFoUbPaBrDicjyuSBEbtGT, page 964:58572, on Scheme
  <N at 1440 / 768 / 390>; the Lime twin is `<lime nodes>` and the Grunge twin `<grunge nodes>`.
  Widen the Lime block <placement> of `<Component>` in EncoreSection.jsx to `s.limeTree`,
  Editorial's deltas behind `s.editorial`. Themes 0, 1, 2 and 4 must digest to zero rows, and
  theme 3 may differ only in `<cat>` arch 1.

  <the two or three conventions most likely to bite this section>

  Branch: editorial-layout-2. Do not refresh the root index.html.
  ```

Do **not** refresh the root `index.html` per section; it is the sweep's last step, with the
two-build digest. The seeded `EXAMPLE_PAGE` is arch 0 throughout, so the page walk will show no
difference at any theme; the proof that this pass shipped is card 2 in both builds' setup modals
(`build-digest.mjs`'s `CARD=1`).

## The end-of-pass sweep

Written now from what the plan can see; the sections add to it. One session, in this order:

1. **CLAUDE.md and README.md**, wherever they describe Editorial as designed at layout 1 only, or a
   layout-2 state as Lime's and Grunge's alone. The known sites: the *Editorial is designed at layout
   1* paragraph and its "cards 2–4 are placeholders"; the per-section scheme rule (decision 1's
   answer — a scheme by width, a card on the page, the nested key); `navModeDefault`'s sentence
   (Minimal at layout 2 of four templates); every layout-2 paragraph naming a Lime-and-Grunge state
   (the calendar's dimmed row, the form's refused ring, the map's compact pager and raster plate,
   the testimonials' widened tile) owes an Editorial clause where its session found the same or
   another; the file table's line counts. Grep both files for "layout 2", "Editorial" and
   "placeholder".
2. **One whole-page published check under Editorial at layout 2** —
   `node scripts/page-check.mjs Editorial 1,0,2,3` — then 180px seam clips at every band edge at
   1440 and 390: at 1440 the repertoire's terracotta sheet, pricing's ink band and the form's
   terracotta band are the full-bleed edges; at 390 the repertoire and pricing are paper, so check
   the paper run reads as the frames' and nothing of the desktop grounds leaks.
3. **The layout-picker thumbnails** for arch 1 under Editorial (deliverable 4) — they are desktop,
   so the repertoire terracotta and pricing ink.
4. **The other three header cards** still render and publish; cards 3 and 4 keep Retro's checker
   ribbon as placeholders, each its own pass's.
5. **`scripts/reach.mjs 3`** over the whole template.
6. **Every `(s.lime || s.grunge)` left in layout-2 code**, listed with why Editorial does not share
   it (layout 1's item 3).
7. **`DashRule side="all"` at DPR 1** (section 2): its svg's 0.5 inset is pixel-snapped, so a
   four-sided dash is two 50% rows on a DPR-1 screen. Moving the inset onto the rect's `x` / `y`
   (the svg at 0, 0) would make it crisp, but it moves every layout-1 four-sided caller's digest
   rows at theme 3 — decide, and if taken, prove it is the svg rows alone. Section 4 adds a DPR-2
   case: on the 1440 repertoire the head's four-sided dash lands one device pixel inside the
   sheet's solid ring (the root's fractional `padX` 45.92), where at 768 and 390 the two coincide.
8. **`plans/README.md`**: mark the pass closed; **`CONVENTIONS.md`** (decision 3).
9. **Notes for the designer**, gathered from the open questions, layout 1's shape.
10. **Refresh the root `index.html`** with the two-build digest: zero rows at every theme on the
   seeded page; the shipped-it tell is card 2 in the two builds' setup modals (the old one's
   checker ribbon and Retro's composition in Scheme 1 tokens; the new one's arch photograph and
   dashed cards).

## Conventions

Append as the pass goes. Do not repeat layout 1's, Lime's, Grunge's or Retro's bullets; name them.

- **Layout 1's conventions all hold**: the gates are `s.editorial`, `s.limeTree`, the named pairs
  and `s.designed`; never edit another template's literal; uppercase per site; `DashRule` for every
  dash; `SIENNA_MEDIA` for `sem/media`; themes 0, 1, 2 and 4 at zero rows.
- **Harness:** `theme=3`, `arch=1`, and every width — this page's schemes move between them.
- **Read a scheme per master, never per section.** The repertoire, pricing and the calendar's band
  stand on a different scheme at 1440 than at 768 and 390; a session that reads the desktop's modes
  and fits three widths from them fits two of them wrong.
- **Diff by traversal order, never by id**: each template is its own variant.
- **Every head on this page is one tone and on the ramp.** Grunge's positional two-tone rules and
  layout 1's three fitted Bold statements have no site here but the footer, which is layout 1's.
- **Judge a dash's ink in a DPR-2 shot** (section 2): `DashRule side="all"` insets its svg 0.5,
  which Chrome pixel-snaps at DPR 1, so a crisp 1px card edge lands as two 50% rows and reads pale;
  at DPR 2 it is full ink. A `side` 'top' / 'bottom' rule is crisp at both.
- **A dash's pattern can be uneven, and `DashRule` takes it** (section 2): `gap` beside `dash`,
  defaulting to it. Read the `dashPattern` pair, never assume it repeats.
- **A card seated on its own scheme is `s.bg`** (section 3): under decision 1(b) the section's
  `s.*` is the card's scheme, so the card's `sem/bg` is `s.bg` — where the twins paint the same
  panel `s.box1` (Lime's Scheme 2 `sem/bg` *is* its Scheme 1 `box/1`). Every twin read of `box1`,
  `stroke1` or `s.ac` in such a block names a different node here; resolve each binding.
- **A dashed capsule's `DashRule` radius is half its height, never 999** (section 4): SVG sets
  `ry` to `rx` and clamps each to its own half-side, so the CSS box's `999px` on a wide pill draws
  an ellipse. Compute the one-row height off the same rounded `u()` values the box renders at
  (the repertoire's `togR`). Pricing's chips and the form's boxes are the next pill-shaped dashes.
- **`DashRule` takes an upright `side`, 'left' or 'right'** (section 4), for a column's inside
  edge; the caller is `position: relative` and stretches to the column's height.
- **A frame's image anchor is evidence for its own photograph only** (section 5): where the node
  holds our seed (its hash in *Photography*), sweep cover anchors against the render and follow
  the minimum; where it holds a placeholder, keep the anchor that serves our seeds, and name it.
- **On this paper page `s.muted` is ink, so an empty slot on a dark well needs `Photo`'s `ink`**
  (section 5): check `&n=0` wherever a Lime block's well is `s.box3` or another ink fill.
- **A twin's redrawn state is read against this frame before it is inherited** (section 6):
  the twins redrew pricing's picked chip in `sem/active` because their frames' pick was the
  card's own colour; Editorial's `toggle-a` is visible, so its binding is followed and the
  redraw is not. Where a twin's *Settled* says "invisible, so redrawn", read the Editorial
  node's paint first.

### Seen at planning time, per section

From the renders and the planning walk — impressions to confirm, not measurements. The paper
sections (header, bio, gallery, map, testimonials, and the repertoire and pricing narrow) are where
the twins' dark-ground assumptions break (trap 6).

1. **header** — see *The header, and card 2*.
2. **bio** — Scheme 1: a `box1` card dashed terracotta **10, 11** (the only uneven dash on the page)
   holding an outlined "Featured" chip, the paragraph in ink, a dashed divider, the tag chips in
   Chakra Petch alternating blush and terracotta, the credit row ("five years of" terracotta, the
   rest ink) and a **nested Scheme 4** Book pill; beside it a light mount under the twins' soft
   shadow, the photograph, and a paper name plate with a blush disc. The 390 credit box (not the
   chip row) is the 637-wide leak (open question 7). *Settled in section 2.*
3. **media** — the taupe panel, square: the head in paper, one tone, two lines at 118; the fan's
   five cards translucent with the Featured tab in ink; the bar dashed blush with an ink transport,
   the sleeve disc and the title in the display face; the list's "● POPULAR" and "5 FEATURED /
   5 MAX", rows ruled dashed blush, numerals, titles and times in ink. At 390 the bar's title and
   byline run off the master (x 293, 184 wide) — open question 7.
4. **repertoire** — at 1440 a full-bleed terracotta sheet: the head "REPERTOIRE" in ink, the
   toggle a dashed capsule with a paper "Wedding" pill in terracotta type, the search a dashed
   underline, two columns of dashed rows, songs in the display face and artists in Inter, all ink;
   the pager ink arrow pills (Scheme 4's `active/bg`) and paper page pills with terracotta numerals,
   **no page marked** in the render (read it). At 768 and 390 the same on paper, dashed ink, the
   pager's pills terracotta. *Settled in section 4: the sheet is `box1` in a solid ring at every
   width, so narrow it is a lighter sheet, not the page; the mark is ours, an ink ring.*
5. **gallery** — paper: the hero (784 × 583) in what reads as a thin ink ring, six masonry tiles
   unringed, a blush caption chip in Inter Bold ink; no dash. 768 adds a head row ("Gallery",
   "View (4)"); 390 is the hero over ten small tiles, the loop. The 768 master has **two tiles at 1px
   tall** (`8f69a4a6`, `b35b6507`) — open question 7. *Settled in section 5: the tiles are edged
   1px terracotta, not unringed; the head row reads "View list" and ✕, both dropped as the twins
   drop them.*
6. **pricing** — at 1440 a full-bleed ink band in what reads as a hairline root ring (Lime and
   Grunge: *the pricing instance's hairline ring*; read it): "[ PRICING ]" paper, the head in
   terracotta, the review quote paper with the avatars and terracotta stars; the plan card dashed
   paper-56 on a slightly lighter fill, a paper "Per event" chip and an outlined blush "Custom
   brief" one, the name paper, the price terracotta, the pill terracotta with ink type and an ink
   disc, the features Chakra Petch paper behind terracotta `+`s; the small print paper. At 768 and
   390 all of it on paper, dashed ink. *Settled in section 6: the hairline is the instance's own
   `stroke/1` ring on all four sides at every width, drawn; the "Per event" chip is the frame's
   visible pick, followed rather than redrawn.*
7. **calendar** — the taupe card, square, under a terracotta head band: "Book Kai®", the flow
   list and the head **paper at 1440 and ink at 768 and 390** (trap 4); column heads in Chakra
   Petch; rows dashed paper; the slot marks ink at 118; the foot's paper "JUN 12" chip, the ink
   line, and an ink "Star Enquiry" pill with a paper disc over the paper 5 / 5 block. The 390 master
   has four more nodes than the other two (the stacked foot; Lime's *the 390 foot stacks*).
8. **map** — paper: the travel card **ink (Scheme 3)** with paper type, an outlined paper
   "Confirmed" chip, dashed blush rules, a terracotta Venue Link pill with an ink disc and an
   outlined terracotta Get Directions; "Other upcoming · 4" ink over four `box1` rows dashed
   terracotta all round, the venue in the display face, an outlined ink "In transit" chip; the map
   card **taupe (Scheme 2)** with a paper head over an ink viewport **(Scheme 3)** in a paper ring,
   the raster olive (the twins' plate — read it), ink ring labels, a dashed 4, 4 ink ring, ink zoom
   buttons ringed paper. The ring labels run past the 768 and 390 masters (x 786 / 414), clipped by
   the viewport.
9. **form** — a full-bleed terracotta band at every width (Scheme 4): the stage photograph in a
   thin paper ring, the head paper and one tone at 45, the promises Chakra Petch paper behind ✓,
   the credit (the leaked avatar, the name in the display face, "DJ · Live band") in ink; the
   sidebar card `box1` dashed ink, its price paper, stars paper, three boxes dashed ink 6, 6 with ink
   labels in the display face, the pill **paper** with a terracotta label and disc, "No charge to
   enquire" ink. Scheme 4's `pillBg` is ink and its `s.ac` paper (trap 5) — the pill's binding will
   say which keys it reads.
10. **testimonials** — paper: the eyebrow and the head ink, one tone, at 118 (the overrun above);
    the sub ink; the rail's tiles `box1` dashed ink, the picked tile **ink (Scheme 3)** dashed paper
    with paper initials; the big card **ink (Scheme 3)** with paper quote marks, quote, name, role
    and stars; the Book pill terracotta. At 390 the sub is a 431-wide no-wrap line clipped by the
    card (open question 7), and the rail stands under the card.

### Settled in session 0 (the schemes)

- **Decision 1 is the three recommendations** (user call, 2026-09-25), built as two commits:
  `e0526e7` the mechanisms, all five themes at zero rows canvas and live (1290 renders), and
  `088845d` the data, themes 0, 1, 2 and 4 at zero rows canvas and live.
- **(a) A seat by width is a triple read at `sectionVm`'s head**: `const seat =
  SCHEMES_OF[theme.name]?.[d]?.[cat]`, then `theme.schemes?.[Array.isArray(seat) ?
  seat[DEV_SEAT[Z.dev]] : seat]`, `DEV_SEAT` being `{ desktop: 0, tablet: 1, mobile: 2 }` beside
  `paperOf`. A 1 in a triple needs no entry: `schemes` has no key 1, so it falls through to the
  theme, which is Scheme 1. Proved in the page (below) with a temporary `[3, 1, 2]`: ink, paper,
  taupe. Every caller's `Z` names its width — `PublishedPage` `SIZES[key]`, `LayoutPicker`,
  `TemplatePreview` and `HeaderChoices` `SIZES.desktop`, `preview.jsx` `Z[device]` — so no
  fallback was owed and **`preview.jsx` needed nothing** (step 5: the digest's root row is
  terracotta at `w=desktop` and paper at `w=tablet` and `w=mobile`).
- **(b) A card on another scheme: `vm.pageBg` and the root's `editorialCard`.** `pageBg` is
  `theme.palette[0]` — the **theme's**, not `T`'s, so it is the page's paper whatever the section
  is seated on. The root reads it through `const editorialCard = (s.me || s.ca) && s.v1 &&
  s.editorial`, beside `editorialRule`, ahead of `s.footerBand || s.bg`. It went in with (a),
  inert by construction — with nothing seated, `pageBg` and `bg` were the same paper — so (b)
  was data alone. The root's `color` stays `s.tx`, the card's; Scheme 2's `text2` is Scheme 1's
  ink anyway. **The block paints the card**, and the flat `s.v1` arms already paint a panel in
  `s.bg`: media and the calendar are taupe cards on paper today, each filling the root's padding
  box (46 · 80 at desktop, 30 · 56 at 768, 10 · 44 at 390). The frames' insets are 56·86 / 30·60 /
  10·40 (media) and 56·56 / 30·56 / 10·40 (calendar) — the media and calendar sessions'.
- **(c) `vm.onScheme[n]`** is `flatScheme()` beside `paperOf` over the theme (`1`) and over each of
  its `schemes` laid on the theme: `bg`, `ac`, `tx`, `acFg`, the twelve `sem` keys (`box1` …
  `hl`), `pillBg` / `pillFg` (the scheme's `activeBg` / `activeFg`) and `chips` — **the scheme's
  own two tag seats** with their inks, not `vm.chips`' six. No `muted`, `line`, `paper` or `deep`:
  additive when a session needs one. It is undefined under every other theme, so a reader sits
  behind `s.editorial` (or inside a block already gated on it). The calendar's head band picks
  its scheme per width in its block, off `s.dev` (`1` at desktop, `3` narrow) — no second triple
  in the data.
- **Scheme 4 is the plan's table.** `get_variable_defs` on the form (`964:64614`) and the
  repertoire (`964:64608`), both Scheme 4 at 1440, agreed on every token they read: `sem/bg`
  `#c86e52`, `text/1` `#f6f0e8`, `text/2` `#141414`, `box/1` `#da7c5e`, `box/2` `#ef9173`,
  `stroke/1` `#f6f0e88f` (56%), `stroke/2` `#141414`. Neither reads a tag seat, so those — ink /
  salmon — are the planning walk's.
- **What moved: 22 files, theme 3, arch 1, the five categories** — media, calendar and form at
  all three widths, the repertoire and pricing at desktop only; none in an `arch_0` file. The
  pictures (`shots.mjs` before / after in the session scratchpad) differ from step 4's prediction
  in two places, because **the flat `s.v1` arms paint a full-size sheet over the root**:
  - **The repertoire reads cream, not terracotta, at 1440.** The root is `#C86E52`, but the flat
    arm's sheet is `s.paper` (`s.retro ? '#FAECD5' : s.paper`), and `paperOf(#C86E52, #141414)`
    finds neither colour above 0.6 luminance and falls back to Retro's `#FBF6EA`. Its head, in
    `s.ac` — Scheme 4's paper — nearly vanishes on it, and the pager's pills lose their fill.
  - **The form reads ink, not terracotta.** Its flat sheet is `ground = s.pillBg`, and Scheme 4's
    `activeBg` is `#141414` (trap 5); the root under it is terracotta. Its submit pill is now ink
    on the paper card.
  - **Pricing is the ink band at 1440** — its flat arm paints no sheet, so the root shows.
  - **Media and the calendar are taupe cards inside paper.** The media list's terracotta rows
    turned paper and its featured fan card pale; the calendar's head band, terracotta before, is
    now paper, and its foot pill's label no longer reads. Neither was traced to its key — the
    sections' blocks replace them.
  All of it is the flat arms' `paper` / `deep` / `pillBg` readings on a new ground, which each
  section's widened block replaces; none of it is chased here.
- **The header and footer shots differ while their digests do not**: each carries a `.seal-spin`
  seal, which `shots.mjs` does not stop and `digest.mjs` skips.
- **Probing a vm key no section reads yet**: the digest cannot see one, so `sectionVm` was called
  in the page through `import()`. After an HMR edit `EncoreBuilder.jsx` imports `data.js` under a
  `?t=` stamp, so a bare `import('/src/builder/data.js')` is **another module instance** and a
  mutation of its `SCHEMES_OF` changes nothing; fetch `/src/builder/EncoreBuilder.jsx`, take the
  `data.js` URL out of its transformed source, and import that.
- **For the sweep's CLAUDE.md pass**: the per-section scheme paragraph (the *A page section is*
  bullet) now owes the triple, `pageBg` / `editorialCard` and `onScheme`; not written here.

### Settled in section 1 (the header)

- **The block widened whole: `if (s.limeTree) { … return }` at the head of `HeaderV1`, `const ed =
  s.editorial`** (about a dozen arms, no `G`). The tree is the twins' node for node at all three
  widths, on **Scheme 1 with no Device override** (`resolvedVariableModes` Desktop / Tablet /
  Mobile; the "— Tablet" 390 master is Mobile), and `get_variable_defs` is `THEME_RAMP.Editorial`
  exactly — labelLg 20 / 16 / 14, labelSm 13 / 13 / 12, dispLg 97 / 73 / 48, list 20 / 19 / 18,
  bodyLg 13 / 15 / 15, bodySm 10 / 12 / 12 — so every leaf reads `s.*` and there is no `tk`.
  Retro's half lost layout 1's two placeholder arms (`mustard` is plain `s.pillBg` again, the
  place card's body plain `ink`) and nothing else; themes 0, 1, 2 and 4 digest to zero.
- **Trap 6 did not bite here: on paper, every `s.*` the block reads is the frame's binding.** The
  capsule (`sem/bg` in a `scheme/1/stroke/2` ring), the links (`text/1`, the accent), the name and
  Listen (`text/2`, ink), the chip, the title (**one tone**, `text/2`), the subtitle and the hero
  pill (BookPill's Lime defaults — `text/1` under `sem/bg`, which are `pillBg` / `bg` under Scheme
  1) needed nothing. The twins' dark-ground assumptions live in the *other* leaves — the glow,
  the grain, the radii — which are deltas anyway.
- **The deltas**, read off the three walks (node walker plus `dashPattern`, per-side weights and
  resolved binding names):
  - **the nav is Grunge's box** — 1176 centred at 1440 (`navInset` `u(76)`), 708 at 768, 350 at
    390 (inset 10) — and Grunge's row tops at 1440 and 768 (40 / 30, spread gaps 81.07 / 35.07);
    **its 390 row stands 20 lower**: the nav at y 22 padded 10 puts the capsule's top at 32
    (sampled: its ring runs 32–65, the pill 36–61), so `navTop` 32, `navH` 34, `navGap` 24;
  - **the capsule is gapped a fixed 18** at 16px type and at 13 (`H/18/8/18/8/18` at all three
    widths) — Grunge's mechanism, so `navGaps` and the `<nav>`'s gap take `grunge || ed`. The
    planning read's "10 in `Frame 251`" was the gap between the capsule and its empty spacer
    cell, and "12" the right cell's Listen-to-pill gap (already in the 138.32);
  - **the photograph is an arch**, 340 / 340 / 0 / 0 on `s.box3` in a **3px** `sem/stroke/2`
    inside ring (`u(3)` on the 1180 canvas), 495 / 227 tall narrow, no glow, no grain. CSS clamps
    the radii to a semicircle at 1440 and 390 and leaves 28px of flat top at 768 — the renders
    agree;
  - **the cards are square**, padded 18 · 16 (8 · 10 at 390), dashed **10, 10 in `sem/text/1`**
    (`s.ac`) all round — a `DashRule side="all"` overlay, the card `position: relative` under
    `ed` only — where the twins ring them; tiles square at **89** at every width (`u(89)` = 73 on
    desktop), still ringed in `s.stroke2`; titles uppercase (`grunge || ed`);
  - **the narrow cards are 148.5 tall**, content centred: the 390 pair is a fixed 313 column
    under a 226 identity block, so nothing stretches it — the component states it. Drawn as a
    `minHeight`, so a long town still grows the card;
  - **the place card's pin tile is outlined, not filled**: 89 × 90.65, no fill, the `sem/bg` ring
    round the paper pin. `LimePin` took an additive `fill` (default `s.ac`; `'transparent'`
    here) — the same vector, 0.3px off the frame's inset in its own viewBox;
  - **the 768 row tops its halves** (`MIN`) where the twins' centre them;
  - **the nav pill is its Scheme 4 node** at all three widths — fill `sem/bg`, label and disc
    `text/1`, arrow `sem/bg` — so `bg={s.onScheme[4].bg} fg={s.onScheme[4].ac}`, the key's first
    reader. Under Scheme 4 that is terracotta under paper, which happens to be Scheme 1's own
    `pillBg` / `bg` pair, so the picture would have held on the defaults; the binding is what
    decided. Its `Retro/Poster` paper 5 / 5 block (3.77 at 390) is paper on paper and not drawn.
- **The 1440 photograph is a stretched `CROP`, and the stretch is not drawn.** The fill maps
  53.9% of the 1536 × 1024 image's width into a 636 × 688 box whose cover needs 61.6% — a 14%
  horizontal stretch, which the render correlates with at **0.997**. An artist's upload must not
  be distorted, so the cover is anchored at the crop window's own centre (u 0.674), which is
  **`objectPosition: '95% 50%'`**; a sweep of cover anchors against the render plateaus at
  0.47–0.52 from 92% to 100% (the lower two-thirds) and falls away below 90. Named departure.
  The narrow fills are `FILL`, a centred cover, and the portrait tile's `CROP` is a centred cover
  to 0.7%.
- **The 390 pill's label is the Anton 12.07 leak** (open question 7); Lime's precedent is taken,
  `s.labelSm` 12 in Noto — the leak's own 16 × 0.7547 to 0.6%. The pill is **99.3 × 26.4** against
  the master's 91.01 × 26.36 (Noto's "BOOK NOW" is wider than Anton's), flush right; named.
- **Decision 2, done.** `navModeDefault` is Minimal at Editorial `d === 1` only (card 3 is a
  placeholder); `navGapEm` is `d === 1 ? 0 : 23 / 16` under Editorial — card 1 (`d === 0`) and
  card 4's `NavBar` (`d === 3`) keep layout 1's em gap; and `vm.navFits` takes **Grunge's arm**
  at Editorial `d === 1` (the same 138.32, 18 gaps, links at Label/SM 13, name at Label/LG 16,
  against 708), not at `d === 2`, where card 3's Retro `HeaderV2` would move. Walked in the
  harness (`&nav=`, `navMode: 'sections'`, `live=1`): **up to five links** draw at 768 on one row
  with nothing past the edge, six fold to the burger. Minimal's three draw at 1440 and 768; at
  1440 *Follow my sections*' nine sit on one row at 12.87px with the name sliding right (852
  against the centred 590) — Lime's rule.
- **The title fits without the layout-1 recipe.** Lime's block sets `s.dispLg` inline, and the
  seeded "KAI MERCER" (5.068 Noto ems) comes to 490 at 97px in the 521 desktop column — one line,
  as the frame's — and wraps at the word at 768 (73px, two lines, the frame's own two) and fits
  one line at 390 (243 of 370; **the frame's 390 title is one line too**, 43 tall — *The header,
  and card 2* said two). No `cqi` fit was owed.
- **Measured against the masters' content edges** (harness, `getBoundingClientRect`): desktop
  capsule at (108.2, 33.4) against 132 × 0.82 / 40.47 × 0.82, name centred at 590, pill right
  edge 1071.7 against 1072.6 and 28.6 tall, photo (45.9, 127.9) 521.1 × 564.2, chip 132.9 × 23.8
  at 613, h1 at 166.5 (frame 166.5) 86.3 tall, subtitle at 267.6, tiles 73 × 73; 768 capsule
  (30, 32.3), name centred at 384, pill right edge 738, photo (30, 100) 708 × 495, chip at 651, h1
  at 697.8 (698) two lines, cards 324 × 148.5 at 651 and 815.5 (the frame's own), tiles at 680.7
  and 844.4 (680.75 / 844.43); 390 burger capsule (20, 32.3) 62 × 33.5, name centred at 195,
  photo (10, 90) 370 × 227, chip at 353, h1 at 399.8 (400), cards 370 × 148.5 at 607.5 and 772
  (609 / 773.5 — the subtitle's line box, 45 against 46). **Named diffs, the twins'**: the seeded
  subtitle runs 2 / 3 / 2 lines against the frame's 1 / 2 / 2, so the desktop hero pill and cards
  stand 19.5 lower and the cards come out 277 against 297, and at 768 the identity block is 334
  against the cards' 313 (topped, `MIN`); the hero pill is 263.8 / 268.8 / 258.9 wide against
  249.3 / 258 / 249 (Noto against Fisterra); the capsule 155.8 / 168.8 against 162.4 / 175.
- **The published tab** (`page-check.mjs Editorial 1,0,2,3`): the modal offers four Editorial
  cards; card 2 opens the page in layout 2's order with layout-2 controls in every section (the
  calendar's slot rows, the testimonials' initial rail, pricing's per-package chips), the footer
  layout 1's; Music → `#media`, Gigs → `#map`, About → `#bio`, Listen → `#media`, Book Now and the
  hero pill → `#form`, every other anchor and footer link on its id; the burger at 390 opens a
  three-link panel on `s.box3` with its pill on `#form`; `overflow390` 0; no console error or
  warning on any card. The published 1440 header is the frame at 1:1 (the zoom), near
  indistinguishable from the render. Cards 1, 3 and 4 render and publish.
- **`FIELDS.header` under Editorial** (`scripts/reach.mjs 3`, 3,312 renders): `showBadge`
  `[0, 3]` and `badgeText` `[3]` — each lost design 1, the placeholder's Retro seal gone; kicker,
  tags and showTags `[0, 2, 3]`, subtitle and heroCta `[1]`, location all four, cta2 `[1, 2]`
  (4/6: Listen is dropped at 390), align `[0]` — unchanged.
- **Digest**: themes 0, 1, 2 and 4 zero files of 645, canvas and `live=1`; theme 3 exactly
  header arch 1 and arch 5 at three widths on both surfaces (12 files), arch 5 byte-identical
  to arch 1.
- **For the sweep's CLAUDE.md pass**: the `navModeDefault` sentence ("Editorial's cards 2 and 3
  are placeholders") is now card 3 alone, and the *Editorial is designed at layout 1* paragraph's
  "cards 2–4 are placeholders" is cards 3 and 4; `LimePin`'s `fill` is additive and needs no
  line. Not written here.
- **For the bio**: its Book pill is the second `s.onScheme[4]` reader, but **not the header's
  `pk` box**: the planning table gives it 139 × 35 / 124 × 35 / **119 × 35** — the 390 one is
  full size, not hand-shrunk (Lime's *the 115 × 35 pale pill is not always hand-shrunk at 390*),
  so read its box rather than reuse `27.6 * pk`. Its paper 5 / 5 block is drawn at 768 and 390
  only, and it stands on the card's `box1` (`#FFF9F2`), not the page — sample whether paper on
  `box1` shows.

### Settled in section 2 (the bio)

- **The block widened whole: `if (s.v1 && s.limeTree)` ahead of `Bio`'s `if (s.v1)`, `const ed =
  s.editorial`**, plus `const mount = grunge || ed` for the photo card's 10 mount (about a dozen
  arms, no `G`). The tree is Lime's node for node at all three widths (the walker, all three
  masters, and a traversal-order compact walk against `964:64581`) but for **one node only
  Editorial draws, the divider** (below); on **Scheme 1 with no Device override** (Desktop /
  Tablet / Mobile), the pill's `Frame` nested **Scheme 4** (`187:9`) at every width. Every size is
  the ramp's (label-sm 16 / 13 / 12, label-lg 24 / 16 / 14, body-lg 16 / 15 / 15, body-sm 12) and
  the Tags instance the twins' hand-scaled 264.4 (15.37 / 10.76 / 9.22, radius 4.61 — Sienna
  Vale's chip 6 × 0.7686, so Lime's number, not Grunge's 3.07).
- **Trap 6 did not bite, a second time**: on paper every ink the block reads is the binding — the
  `/featured` chip `sem/text/2` in a `scheme/1/stroke/2` ring (`s.tx` in `s.stroke2`), the
  paragraph, the credit (`scheme/1/text1` lead over `text2`), the name and role line, all `s.tx` /
  `s.ac` already. The deltas are fills, radii, dashes and one node.
- **The text card is square `s.box1` dashed 10, 11** in `sem/stroke/2` all round, INSIDE 1 — a
  `DashRule side="all"`, which took an **additive `gap`** (default `dash`, so layout 1's even
  callers are untouched; `gap={11 * z}`). Sampled: 10 on, 11 off on both edges, a 5 at the
  corner (ours starts on a full dash — phase, named). No `s.stroke1` ring. The desktop card
  clips its content (`clipsContent`, not the narrow ones) and ours does not: inert, since nothing
  in it overflows — not a rule for a panel whose contents do.
- **The divider is the node the twins do not draw**: a 1px frame between the prose and the foot,
  `scheme/1/stroke/2`, dash 10, 10 — and **its stroke weight is 8 INSIDE on a 1px clipped frame**,
  which the render draws as a 1px 10, 10 rule with a ~7px solid cap at each end (the side strokes).
  The cap is the weight's slip and is not drawn; `DashRule side="top"` in a 1px relative div.
  **Its width follows the padding, which turns round at 390**: at 1440 and 768 the card pads
  nothing and its two groups pad 30, so the rule runs the card's full width (sampled edge to
  edge); at 390 the card pads 20 and the groups nothing, so it is inset 20. Written as the frame
  is — card `padding` 0 / 0 / 20, `gpad` `u(30)` on both groups at 1440 and 768 — which also drops
  Lime's `'10px 0'` 390 foot padding under `ed` (the Editorial foot pads 0).
  `space-between` with gap 18 centres the divider in the desktop gap as the frame does.
- **An emptied foot drops with its divider, under Editorial only** (chips hidden, `credit` and
  `cta` emptied): otherwise a dashed rule stands over 60 of padding (seen, 768). The twins keep
  their empty foot element, as they always have — theme 1 and 2 unchanged. **For the sweep's
  CLAUDE.md pass**: the *role and town* paragraph's bio foot row ("each drops when emptied and the
  row with both") owes a clause — under Editorial the divider goes with an emptied foot.
- **Every chip sits on its own tag**: the instance binds `scheme/1/tagN/bg` for all five
  (blush, terracotta by parity), so `ed || i % 2 ? c.bg` — no dark seat (Lime's `s.box2` is taupe
  here). The fourth chip's type binds `scheme/4/text1` (paper) at 1440 but `scheme/4/tag1/text`
  (**ink**) at 768 and 390 — the twins' leak again; `c.fg` stands, a named one-chip diff at two
  widths.
- **The pill is its Scheme 4 node on the bio's box**: `bg={s.onScheme[4].bg}
  fg={s.onScheme[4].ac}` (fill `sem/bg`, label and disc `text/1`, arrow `sem/bg`) — the header's
  pair, the key's second reader — with Lime's bio recipe unchanged (27.6 disc, 4.27 / 17.92, `k`
  0.82 / 1 / 1: the 390 box is full size, 119.32 = 17.92 + 61 + 8.53 + 27.6 + 4.27). Its label is
  Fisterra label-sm 12 at 390, not the header's Anton leak. **The paper block shows**: the
  `Retro/Poster` 5 / 5 at 768 and 390 (none at 1440) samples `#F6F0E8` for 4–5px beside and
  under the pill on the card's `#FFF9F2`, so `boxShadow: 5px 5px 0 ${s.onScheme[4].ac}` on `nar`
  (route 1; `BookPill` untouched).
- **The photo card is Grunge's 10 mount, square**: the outer frame `sem/tag/4/text` (paper,
  `s.chips[3].fg` — the seat the binding names) padded 10, no radius, under the twins' soft
  `1.25 / 1.25 / 10.81` black 16%; the inner clip `sem/tag/5/bg` (blush, `s.chips[4].bg`, seen only
  under `&noimage=1`), no radius, no effect, no grain; the caption block's 30 / 30 / 31.88 and the
  648 / 648 / 362 heights are Grunge's arithmetic exactly. So `mount` replaces `grunge` at those
  five sites and at the glow's gate. The caption card is square `s.box1`; its disc binds
  `sem/tag/1/bg`, **blush** (`s.chips[0].bg`), where the twins' is `box1`.
- **The photograph is a centred cover** — `scaleMode: FILL` under an `imageTransform` it ignores,
  Grunge's rule: the render's photo region correlates **0.996 / 1.0 / 0.993** with ours (0.016
  mirrored), `objectPosition` 50% 50%. The ⏵⏵ glyph is missing from the 1440 render's disc and
  present narrow (Figma's fallback face); ours types it, the twins' rule.
- **Open question 7's "390 chip row" is the credit box**: the 637.5 × 39 no-wrap node that renders
  the 390 master 667 wide is `Frame 6`, **the credit line's** leaked desktop box (in the 390 credit
  column, beside the Tags instance, which wraps at 264.4 as everywhere). Lime's block already
  follows it as a `minHeight: u(39)` and never its width, so ours stays 390 — corrected below.
- **Measured against the masters' content edges** (harness, `getBoundingClientRect`): desktop card
  708.5 × 531.4 at 45.9 (865 × 648 × 0.82), chips at 479.1 (479.6), credit at 555.8 (554.8), pill
  107.7 × 28.6 at 556.5 (556.4) with its right edge at 729.8 (730.6), `/Featured` 81.7 × 23.6
  (86.4 × 24.1), the well 338.7 × 515 at 787.2 (788.0), the disc 29.5²; 768 `/Featured` 30 in
  (30), 86.8 × 25.6 (91.35 × 25.34), pill 118.2 × 34.9 (124.32 × 34.93) flush right at 708, the
  well 688 × 628 30 under the card, the disc 570.5 under the photo card's top (570.13); 390 the
  divider 330 wide at x 30, `/Featured` 82.3 × 24.5 (86.35 × 24.34), pill 113.6 × 34.9 (119.32 ×
  34.93) 47.7 under the credit (48.65), the well 350 × 342 10 under the card, the disc 285.6
  under its top (285.62). **Named diffs**: the seeded paragraph is 2 / 2 / 3 lines against the
  frame's 3 / 3 / 6, so the narrow cards are 395.1 / 377.1 against 419.75 / 448.33 and the desktop
  divider sits 10.6 high (space-between centres it); the pill and chip are Noto against Fisterra,
  4–6% narrower; the roots' `padY` (80 / 56 / 44 against 46 / 60 / 30) is inherited.
- **`DashRule side="all"` is soft at DPR 1**: its svg's 0.5 inset is pixel-snapped, so the 1px
  edge lands as two 50% rows (the dashes read pale in a DPR-1 shot); at DPR 2 it is two full
  device rows, crisp. Layout 1's four-sided callers share it; a sweep item, not chased here.
- **`live=1`**: the pill is `<a href="#form">` at all three widths, carrying the paper block at
  768 and 390 only; nothing else in the section is live. Emptied `credit` keeps the pill in its
  right-hand seat; `&noimage=1` shows the initials on the Photo placeholder inside the mount.
- **`FIELDS.bio` under Editorial** (`scripts/reach.mjs 3`, 3,312 renders, confirm-only):
  `bio.credit` and `bio.cta` reach bio layout 2 alone; `who.tags` / `who.showTags` bio 2 and 4,
  `who.kicker` all four, `who.location` 1–3 — Grunge's table. Nothing in `FIELDS` moved.
- **Digest**: themes 0, 1, 2 and 4 zero files of 645, canvas and `live=1`; theme 3 exactly bio
  arch 1 at three widths on both surfaces (6 files), no `arch_0` file.

### Settled in section 3 (the media player)

- **The block widened whole: `if (s.limeTree)` inside `Media`'s `if (s.v1)`, after `nowArt`,
  `const ed = s.editorial`** (a dozen arms, a `barBg` and a `dash` helper, no `G`). The tree is the
  twins' node for node at all three widths — Section / Frame 297 / Frame 296 / the two instances,
  the five cards at the twins' sizes, angles (±5.33 / ±10.66) and opacities (.82 / .64), the 108
  bar, the 44 / 43 counter row and the 125.8 / 110.6 rows — on **Scheme 1 with Frame 297 on
  Scheme 2** and no Device override (Desktop / Tablet / Mobile). `get_variable_defs` is the ramp
  (display-lg 118 / 73 / 48, list 24 / 19 / 18, body-lg 16 / 15 / 15, body-md 14 / 13 / 13,
  body-sm 12, chip 12 / 11 / 11) but for Display/Title, **32 / 25 / 23** in `tk` (`s.title` is the
  heading string). The hooks sit above the branches, so the published player needed nothing.
- **Decision 1(b)'s seat does all the colour work — no `G`, no `onScheme`.** Seated on Scheme 2,
  every binding is a key: the panel `sem/bg` → **`s.bg`** (the twins read `s.box1`, which is
  `#BAA499` here); the cards `box/1` → `s.box1`; the wells `box/2` → `s.box2`; every ink but the
  heading `sem/text/2` → `s.tx`; the card rings `sem/stroke/2` → `s.stroke2` (the twins'
  `stroke1` is paper here); the Featured chip `sem/tag/1/bg` → `s.chips[0].bg`, blush, lettered
  `s.tx` (the twins' `s.ac` is paper). "Translucent taupe" is solid `#BAA499` at the nodes' own
  .82 / .64 — `CARD[].op`, no delta.
- **The heading is `sem/text/1`, paper, at every width**, where Lime flips `s.tx` / `s.ac` by
  width, and it **takes no cap**: Lime's 4.6em would break Noto's "FIVE WORTH" (5.22 ems) itself,
  and the column alone breaks each master's way — after "worth" at 1440 (506 of 516 at 97) and 390
  (250 of 330 at 48), after "your" at 768 (561 of 648 at 73). Measured: 172.7 / 129.9 / 85.4
  tall against 172.2 / 130 / 86, two lines each.
- **Radii**: the panel **0 at 1440** and 30 narrow (Frame 297 states no radius at desktop); the
  cards 0; the bar 0; the wells 4 and the sleeve a circle, unchanged.
- **The bar is an outline on the panel's own ground**: `sem/bg` (`barBg`, the panel's taupe, not
  the cards' `box/1`), dashed 10, 10 all round in `sem/stroke/2`, INSIDE 1 — `DashRule
  side="all"` in place of the twins' ring overlay — and its inner pill carries **no fill**. At
  DPR 2 the dash samples `#E6B6A0` full ink. No glow, no effect on any node.
- **The list's rules are the other way up**: the counter row and **all five** track rows are
  stroked `0/0/1/0` INSIDE, dashed 10, 10 in `sem/stroke/2` — so a rule stands under the counter
  and under the last row, where Lime's top-only rules leave the last row open. `DashRule
  side="bottom"` in each, the row `position: relative` under `ed`.
- **One named departure, for the bar's title at 1440**: Noto's "SLOW BURN" is 128 wide at 32 ×
  0.82 and the twins' desktop box left it 112 ("SLOW B…"). The inner pill is unfilled, so its 10
  and 12 sides are spacing alone; both go at 1440 and the box is 130.4. 768 (140.2 for 140) and
  390 (115.5 for 116, through the twins' override) needed nothing. The frame's own bar clips its
  longer "Slow Burn (Edit)" at every width.
- **The 390 bar leak is overridden by the twins' shared override** (open question 7): the master
  seats the transport and a sliver of sleeve and runs the title off at x 293; ours drops the clock
  and icons and closes the padding, so the track the player is on is named.
- **No pill**: none of the three masters has a pill node (the twins' finding), so `FIELDS.media`
  moves nothing — `cta`'s `'*': []` row already reads "Not shown in this template" here and
  `soundcloud` reaches layout 1 alone. No `reach.mjs` run was owed. The 1440 Section's 5px
  `scheme/1/stroke/2` top and bottom stroke is `visible: false` (the twins' hidden stroke) and is
  not drawn.
- **The wrapper's vertical inset is named, not fitted**: `padX` is the frames' 56 / 30 / 10
  already, so the panel's sides are the frame's; above and below, the root's `padY` 80 / 56 / 44
  stands against the wrapper's 86 × 0.82 / 60 / 40 (70.5 / 60 / 40) — the page gutter every
  section here keeps (the bio's *roots' `padY`* diff), and a `sectionVm` arm for one section would
  part it from its neighbours. The calendar's card meets the same question (56 · 56 / 30 · 56 /
  10 · 40).
- **Measured against the masters** (harness, `getBoundingClientRect`, from the section root):
  desktop panel (45.9, 80) 1088.2 × 650.3 (1089 × 650.3), heading at the panel's 49.2, the fan
  band 271 (271.4), the centre card 180.4 × 233.7 at 256.4 under the panel's top (256.7), its chip
  at 21.7 / 21.3 (26.5 / 26 × 0.82), bar at 512.5 (512.5) 88.6 tall, list at x 606 (606), counter
  36.2 (36.1), rows 103.1 (103.2); 768 panel 708 × 1505.9 (1506), fan at 199.9 (200), bar at 692
  (692), list at 850 (850), counter 43, rows 110.6; 390 panel 370 × 1361.4 (1362), fan at 75.4
  (76, the −50), bar at 567.4 (568), list at 725.4 (726), rows 110.6. **Named diffs**: the top
  inset above; the centre card 3.4 / 3.6 left of the frame's at every width (the frames stand it
  ~4 right of the band's centre; the shared seats centre it — not checked against the twins); the
  canvas clock is the shared `02:28 / 04:22` against "1:38 / 4:55"; the frame's fan art is its own
  mock (the Who sleeve on "Slow Burn", which its list puts on "Late Lights") and ours follows the
  list.
- **`live=1`** (puppeteer, `--autoplay-policy=no-user-gesture-required`, 1440 and 390): the
  outermost card clicked on its visible edge deals Slow Burn to the centre and plays it; a row
  plays and a second click pauses it (the glyph goes pause → play, ink on taupe); back from track
  one wraps to Roomtone and next wraps to Late Lights; the centre card, the bar's title and the
  row's glyph follow together. No page errors. `n=8`: the fan clips at the column, the desktop
  rows share it at 64.5, the "KM" wells read ink on `box/2`, 390 grows to 1632. `n=0`: the
  counter alone over its rule; 390 is 896.
- **Digest**: themes 0, 1, 2 and 4 zero files of 645, canvas and `live=1`; theme 3 exactly media
  arch 1 at three widths on both surfaces (6 files), no `arch_0` file.
- **For the repertoire**: it is seated on the triple `[4, 1, 1]`, so `s.stroke1` is already each
  width's dash ink — Scheme 4's paper 56% at 1440, Scheme 1's opaque ink narrow — and the flat
  arm's cream `s.paper` sheet (session 0) is the Lime block's to replace. Under Scheme 4 `pillBg`
  is ink and `s.ac` paper (trap 5): read the pager's bindings before trusting `Pager`'s Lime arm.

### Settled in section 4 (the repertoire)

- **The block widened whole: `if (s.limeTree)` inside `Repertoire`'s `if (s.v1)`, after
  `pageWindow()`, `const ed = s.editorial`** (about fifteen arms and a `dash` helper, no `G`). The
  tree is the twins' node for node at all three widths (`phone` / `sticky-head` / `Frame 286` /
  `list` / `pagination`, the two columns of five, the seven-slot pager), on **Scheme 4 at 1440
  and Scheme 1 at 768 and 390** (`resolvedVariableModes` Desktop / Tablet / Mobile, no Device
  override), no effect on any node, no rotation. `get_variable_defs` is the ramp (display-sm 45 /
  36 / 30, list 24 / 19 / 18, label-sm 16 / 13 / 12, body-md 14 / 13 / 13, body-sm 12), so every
  size reads `s.*`. The hooks sit above the branches, so the published search, chips and pager
  needed nothing.
- **Trap 5 did not bite the toggle: every fill and ink is a key the block already reads, in
  either scheme.** The sheet is `sem/box/1` (`#DA7C5E` at 1440, `#FFF9F2` narrow — `s.box1`, as
  Lime's), the heading, field, numbers, titles and artists `sem/text/2` (`s.tx`, ink at every
  width), and the toggle's pill `sem/text/1` under `sem/bg` type — Lime's `s.ac` / `s.bg`, which
  is the frame's paper pill in terracotta at 1440 and its terracotta pill in paper narrow. The
  session-0 cream sheet was the flat arm's, and the block replaced it.
- **`s.stroke1` is each width's dash ink, and the 5, 5 is everywhere**: one `use_figma` tally
  of every stroked node at all three widths found `sticky-head` dashed on all four sides, the
  toggle all round, the search `0/0/1/0`, `Frame 288` `0/1/0/0` and all ten rows `0/0/1/0`, every
  one 1 INSIDE dash 5, 5 in `sem/stroke/1` — `rgba(246, 240, 232, 0.56)` under Scheme 4, `#141414`
  under Scheme 1. So every Lime ring or inset shadow is a `DashRule` under `ed`: `side="all"` on
  the head and the toggle, `side="bottom"` on the field, every row and the empty-state row.
- **`DashRule` took an additive `side` 'left' / 'right'** for the column's inside edge — the same
  line stood upright, starting on a dash at the top; no earlier caller reaches it. **A dashed
  capsule's `radius` is half its height, never 999**: SVG sets `ry` to `rx` and clamps each to its
  own half-side, so a 999 on the 224-wide toggle draws an ellipse. `togR` is the toggle's one-row
  half-height off the same rounded `u()` values the box renders at (14.4 / 17.4 / 17.4); a toggle
  that wraps rounds one row's worth, named (no frame draws it).
- **The sheet's own ring is drawn, Grunge's overlay**: `phone` carries a **solid** 1px INSIDE
  `sem/stroke/1`, visible on Grunge and Editorial and hidden on Lime (the twins' read, both
  confirmed), so the overlay widens to `grunge || ed`. The render samples it on all four edges,
  with the head's dashes stacked on it along the top and sides — 241 on 234 in the 1440 render,
  where the 56% paper doubles. Ours stacks the same at 768 and 390; at 1440 the dash lands one
  device pixel inside the ring at DPR 2 (the root's fractional `padX` 45.92 snapping the SVG and
  the box-shadow apart), so the two overlap by half — a sub-pixel diff, named, for sweep item 7.
- **The field is no box**: no fill of its own worth drawing, radius 0, **padding 0 at the
  sides** (the glyph at the column's own x 1004 / 358 / 10), ruled along its foot alone; the 36
  height and Lime's centring stand.
- **The rows pin at 84.2 / 82.8 / 59.4** — neither twin's at 1440 or 768 (83.2 / 82): Noto's
  display-sm leaves each master's head at 205 / 204 / 203 against Lime's 210 / 208 / 205, so the
  list the rows divide is 421 / 414 / 297. The desktop 56 / 56 and 20 / 20 row paddings are the
  component's on all three templates (read on both twins), so Lime's reading of them stands.
- **Type**: the heading and the titles uppercase (`grunge || ed`); `faced` is the identity.
- **The pager is filled, and `Pager` took an additive `endBox`.** All seven `pg` nodes carry a
  solid 1px `sem/bg` ring: the arrows `sem/text/2` (ink at every width) round a `sem/bg` glyph,
  the pages `sem/text/1` round `sem/bg` numerals — paper pills in terracotta under Scheme 4, and
  terracotta pills in paper under Scheme 1. One binding set serves both schemes, so the block
  passes `frame.lime = { box: s.ac, endBox: s.tx, ring: s.bg, ink: s.bg, idle: s.bg, onEdge:
  s.tx, on: s.tx }` under `ed`; `Pager`'s layout-1 Editorial arm (unfilled, `stroke1` rings) is
  that page's frame, not this one. `btn`'s ends read `t.endBox ?? 'transparent'`, so every caller
  written before it is untouched — the map's layout-1 pager and repertoire a0 digest to zero.
- **The frame marks no page; the mark is this file's.** Two were tried in the render. **Filling
  the current page ink failed**: it dresses the page as an arrow, and at the seeded two pages the
  row reads ink / ink / paper / ink, so the one paper pill looks chosen. What stands is **layout
  1's own Editorial mark in this frame's ink**: the current pill keeps its fill and takes a
  `sem/text/2` numeral in a 1px `sem/text/2` ring (`onEdge` / `on` `s.tx`) — ink on paper at 1440,
  ink on terracotta narrow (about 5 : 1 against the paper numerals' 3 : 1). Named, the rule for a
  live state no frame draws.
- **Measured against the masters** (harness, `getBoundingClientRect` from the section root):
  desktop section 649.6 (792 × 0.82 = 649.4), head 168.3 (168.1), h2 at (46, 46) at 37px, field
  311.6 × 29.5 at x 822.4 (823.3), rows 69.0 (69.04), pager band 136.3 at 513.3; 768 section 792,
  head 204 (204), h2 at 60, field 380 × 36 at (358, 108) (the frame's), rows 82.8, pager band 174
  at 618 (618); 390 section 593.8 (594), head 202.8 (203), field 370 × 36 at 126.8 (127), rows
  59.4 in 297, pager band 94 at 499.8 (500). **Named diffs, the twins'**: the seeded four chips
  against the frame's three (toggle 224.2 / 270.6 against 211 × 0.82 / 211); the seeded twelve
  make two pages, so four buttons divide the measure (267 / 171 / 86.5) where the frames draw a
  fictional seven; "12 Songs" against "Repertoire"; the title at x 64.9 / 53 / 32 on Lime's
  pinned number against the frame's 62.3 / 50 / 30.
- **`live=1`** (puppeteer mouse clicks, `n=240`, all three widths): Next moves the list to 11 and
  the mark to page 2; the "24" button reaches 231 with the mark on it; Prev steps back to 221; a
  chip re-derives the pager (24 → 9 pages) and resets to page 1; a no-match search prints *No
  songs match that.* over its dashed rule and drops the pager; clearing it restores the list.
  No page errors.
- **The narrow sheet does not merge with the gallery** — the planning read's *Grounds* table
  said it would: it is `#FFF9F2` on the `#F6F0E8` page, closed by a solid ink ring on all four
  sides. The sweep's seam clips at 390 should expect that ring between the repertoire and the
  gallery.
- **`FIELDS.repertoire` has no `in` row** (Grunge's finding), so no `reach.mjs` run was owed.
- **Digest**: themes 0, 1, 2 and 4 zero files of 645, canvas and `live=1`; theme 3 exactly
  repertoire arch 1 at three widths on both surfaces (6 files), no `arch_0` file.
- **For the sweep's CLAUDE.md pass**: the *Editorial is designed* paragraph's "the repertoire's
  pager marks its page in a terracotta ring (`Pager`'s Editorial arm…)" is layout 1's; layout
  2's pager is filled and its ink-ring mark is ours. `DashRule`'s description ("on a row's edge
  or `side="all"` round a card") gains a column's side. Not written here.
- **For the gallery**: it stands on paper directly under this sheet's solid ring (ink at 768 and
  390, paper 56% at 1440 on the terracotta), so the seam is the repertoire's and the gallery owes
  it nothing. It has no block — `(s.lime || grunge)` ternaries through `Gallery`'s `if (s.v1)` —
  so each widens from the frame, one ternary at a time.

### Settled in section 5 (the gallery)

- **No block, for the second time: Lime's and Grunge's ternaries through `Gallery`'s `if (s.v1)`
  widen one by one**, `const ed = s.editorial` beside `const grunge`, at eight sites — `bw`, the
  well, `r`, the tiles' corner rule, the two chip-type sites (the 768 head and the caption), the
  caption's ink gate, and the hero's ring and radius — plus one new `wellInk`. The tree is Lime's
  node for node at all three widths (18 / 23 / 22; Grunge carries one more, its grain rect), on
  **Scheme 1 with no Device override** (`resolvedVariableModes` Desktop / Tablet / Mobile), **no
  effect and no dash on any node**, so Lime's `s.lime &&` glow and Grunge's `Grain` both drop by
  construction and `DashRule` has no seat. `size/chip` is 12 / 11 / 11 — `THEME_RAMP.Editorial`'s
  chip 10 / 11 / 11, so `s.chip` exactly, as under Grunge. One walker call over the three masters
  and one paired diff (by traversal order, all three widths, against both twins) were the whole
  read. The hooks sit above the branches, so the published picks needed nothing.
- **Trap 6 did not bite, a third time: on paper every ink is the binding.** The wells are
  `sem/box/3` (`s.box3`, `#141414`), the tiles' edge `sem/text/1` (`s.ac`, terracotta — the `edge`
  already drawn), the caption `sem/tag/1/bg` (blush, `s.chips[0].bg`) lettered `sem/text/2`
  (`s.tx`), the 768 head `sem/text/2`. **The caption's fill is Retro's own arm**: `(s.lime ||
  grunge) ? s.box1 : s.chips[0].bg` already reads the binding under Editorial, so that ternary is
  left as it is with a comment saying the else-arm is the binding and not a default; the ink gate
  widens to `(s.retro || s.limeTree)` only to name `s.tx` (`s.chips[0].fg` is the same ink).
- **What moves is the shape.** The hero's outer frame states **no radius** — a square in a 1px
  INSIDE `scheme/1/stroke/1` ring (`s.stroke1`, opaque ink; the same value as Retro's `s.tx`
  fallthrough, named for the binding) — and its image frame's own radius 4 lands under the ring:
  the render samples `#141414` to the corner pixel and no paper wedge, so it is not drawn (in CSS
  the photo sits inside the border's padding box, where a 4 *would* show). **Every tile rounds
  whole at a raw 3** at 1440 and 768 (`u(3)`, 2.5 on the canvas) — the first and last in each
  column included, where Lime's frames square off the corners their dropped borders run through
  (`0 0 30 30` / `30 30 0 0`) — so the tile's corner rule takes `(s.mob || ed)`. The render shows
  it: the first tile's top corners round with no top stroke. The 390 rail keeps its 10.
- **The 1440 hero photograph is a `CROP` that is a cover, and it is followed.** The fill maps full
  width × 0.5954 of the 900 × 1125 seed (`editorialGallery4`, the frame's own `90514a32`) into the
  784 × 583 box, whose cover needs 0.8 / 1.3448 = 0.5949 — the window is the box's aspect to
  0.1%, so no stretch (the header's `CROP` was one), and its 0.0749 offset is **18.5%** of the
  slack. A sweep of cover anchors against the render bottoms out there (mean |Δ| 2.96 against
  30.3 top-anchored); the narrow `FILL`s bottom out at **50%** (1.73 at 768, 1.52 at 390). So the
  hero takes `ed ? (desk ? '50% 18.5%' : '50% 50%') : '50% 0%'`, and each of the other six seeds,
  picked into the seat, keeps its face at 18.5% (the stage portrait and the avatar included).
- **The tiles keep the twins' top anchor — a named departure from the frame's `FILL`.** The
  frames fill their strip centred, but the strip is Retro's placeholders (open question 3), so
  the anchor says nothing about our seeds; centred, the stage portrait in the right column's
  first tile lost the singer's head above the mouth (tried and seen at 1440 and 768). Reversible
  in one line at the tile's `Photo`.
- **An empty well's initials take the page's paper.** `Photo` draws them in `ink ?? s.muted`, and
  Editorial's `muted` is ink at a lower alpha — ink on the `#141414` well, invisible, where the
  twins' pale `muted` reads (Grunge's `n=0` passed on that). `wellInk` is `ed ? s.bg : undefined`
  on both `Photo`s, so every other theme still resolves to `s.muted`; `&n=0` at DPR 2 shows paper
  `KM` on ink at all three widths. The hero's ink ring on the ink well disappears there, as the
  frame's would.
- **Open question 7's 768 tiles are overridden, as the twins' are**: the master's last tile in
  each column is 1px tall (its siblings keep their desktop 123 / 215 and 194 / 242 in a 358
  band), and the inherited `flex: h 1 auto` divides the band in the frame's proportions so all six
  show — Retro's *honouring a squeeze costs content*. **The 390 right column's first-tile wrapper
  carries Grunge's `[0, 0, 40, 40]` stray again** (`880:19258`; its own image frame says 10, as
  Lime's wrapper does), and the render shows its capsule foot on that one tile. Not followed, on
  Grunge's reasoning — one seat of ten. And **the right column's first-tile wrapper at 1440 and
  768 is square** (`710:2633` / `860:13848`) round an image frame of 3: its stroke lands over the
  arc, so the tile reads as every other; not a delta.
- **Measured against the masters' content edges** (harness, `getBoundingClientRect` from the
  section root): desktop hero 642.1 × 478.1 (784 × 583 × 0.82 = 642.9 × 478.1) at (45.9, 80),
  ring 1px `#141414` at radius 0; caption 102.8 × 39.7 at (33.8, 33.8) inside the hero (40 × 0.82
  plus the ring), 10px Inter 700 at −0.6px, `#E6B6A0` under `#141414`; tiles 209.1 wide (255 ×
  0.82) at 100.9 / 176.3 / 184.5 and 159.1 / 198.5 / 104.1, radius 2.5, edge 1px `#C86E52` —
  Grunge's numbers, the rail at x 707.7 against 708.5 (the hero's flex share, the twins'); 768
  hero 343 × 392 (342 × 392), head *See us in action* at 11px / −0.66px in ink, caption 89.4 × 31
  at (41, 41), tiles 165.5 wide (166) at 73.9 / 129.3 / 134.8 and 116.3 / 145.4 / 76.3; 390 ten
  tiles 36.5 × 48.8 at radius 10, caption 115.7 × 46 at (41, 41). **Named diffs**: the roots'
  `padY` 80 / 56 / 44 against the masters' 46 / 30 / 40 (every section's); and **at 390 the hero
  is 273 wide against 253** — the master pads its own sides 20 where the root's `padX` is 10
  (JP-038's page inset), so the hero takes the 20 and the rail stands 10 right of the frame's.
  The twins render the same since JP-038; a `sectionVm` arm for one section would part it from
  the page, the media session's reasoning.
- **`live=1`** (puppeteer mouse clicks, 1440 and 390): each of six tiles moves the hero to its
  slot and rings itself (`s.ac` inset, 2.5 at desktop and 2 at 390, one ring — two at 390, where
  the ten tiles repeat six slots and a pick rings its twin), reading at DPR 2 as a terracotta ring
  inside the 1px edge; a second click on the ringed tile hands the hero back to `galActive()`'s
  slot with no ring; a hero click changes nothing. No page errors or warnings.
- **`FIELDS.gallery` has no template-keyed `in` row**, so no `reach.mjs` run was owed.
- **Digest**: themes 0, 1, 2 and 4 zero files of 645, canvas and `live=1`; theme 3 exactly gallery
  arch 1 at three widths on both surfaces (6 files), no `arch_0` file.
- **For pricing**: it is seated on the triple `[3, 1, 1]` — the full-bleed ink band at 1440 and
  paper at 768 and 390 — so read the scheme per master (the repertoire's lesson), and every
  `s.stroke1` is each width's dash ink (Scheme 3's paper 56% at 1440, ink narrow), dash 10, 10
  on the plan card and its divider. Its Lime block (after `sel` / `t`) has Grunge's `G` at its
  head, so Editorial is a third arm there. The planning table dashes only the card and its
  divider; if a chip's outline turns out dashed too, its radius is half its height (section 4's
  convention names pricing's chips as the next case). Session 0 found the flat arm paints no sheet at 1440, so the root
  shows through; read the planning table's "hairline root ring" off the node before drawing it.

### Settled in section 6 (pricing)

- **The block widened: `if (s.limeTree)` inside `Pricing`'s `if (s.v1)`, after `sel` / `t`,
  `const ed = s.editorial` and a third arm at the head of `G`** — the pass's first `G`, Lime's and
  Grunge's arms byte-identical — plus six `ed` sites (the display sites' uppercase, the picked
  chip's three leaves, the card's and the divider's `DashRule`, the ring overlay, the foot rule).
  The tree is the twins' node for node at all three widths: one paired diff by traversal order
  against both desktop twins came back 67 = 67 = 67, with no binding difference but the card's
  stroke, dash, radius and padding, the faces' and chips' radii and the divider. **Scheme 3 at
  1440, Scheme 1 at 768 and 390** (`resolvedVariableModes` Desktop / Tablet / Mobile), no Device
  override, no nested scheme, no effect, no rotation. `get_variable_defs` is
  `THEME_RAMP.Editorial` exactly at all three (display-md 64 / 45 / 36, display-sm 45 / 36 / 30,
  body-lg 16 / 15 / 15, body-md 14 / 13 / 13, body-sm 12, chip 12 / 11 / 11, label-xs 20 / 14 /
  12, eyebrow 15 / 12 / 11, list 24 / 19 / 18), so every size reads `s.*`. The hooks sit above
  the block, so the published package toggle needed nothing.
- **The triple did all the colour work — no `onScheme`, no literal.** Every paint binds the twins'
  token and each resolves through the seat: the root `sem/bg` (ink / paper), the card `sem/box/1`
  (`#1D1D1D` / `#FFF9F2`), the heading, numeral, `+`s, stars and rating `text/1` (terracotta in
  both), everything else `text/2` (paper / ink), the faces' ground `box/1`. Read per master:
  `s.stroke1` is Scheme 3's paper 56% at 1440 and Scheme 1's opaque ink narrow, `s.stroke2` blush
  at 1440 and terracotta narrow.
- **The pill is `BookPill`'s Lime defaults in both schemes**: fill `text/1`, label and disc
  `sem/bg`, arrow `text/1`. Scheme 3's `activeBg` is terracotta as Scheme 1's is, so `pillBg` /
  `bg` is the frame's pair at every width — ink on terracotta at 1440, paper on terracotta
  narrow. The prompt's worry that the active pair is "another ink" is Scheme 4's (trap 5), not
  Scheme 3's. JP-036's label and line carry.
- **The frame's picked chip is visible, so it is followed, not redrawn** — the twins' *the
  frame's selected chip is invisible, so it is redrawn* turned round. `toggle-a` binds
  `sem/tag/1/bg` (`s.chips[0].bg`: paper on the `#1D1D1D` card at 1440, blush on `#FFF9F2`
  narrow), `toggle-b` no fill, and both a 1px INSIDE `sem/stroke/2` ring under `text/1` type. So
  under `ed` the picked chip keeps its ring and its `s.ac` type and only the fill moves, and the
  canvas's pinned chip 0 is the frame's own picture — no intended chip diff, unlike the twins'.
  The three leaves are `G.chipOn` / `chipOnFg` / `chipOnRing`, in the Editorial arm alone and
  read `G.chipOn ?? s.pillBg` (CONVENTIONS C: new leaves fall back through `??`). Terracotta on
  blush is about 2 : 1 at 768 and 390 — the frame's pair; the fill, not the type, marks the pick.
- **The card is square `s.box1` dashed 10, 10 in `s.stroke1`** — `DashRule side="all"`, the card
  `position: relative` under `ed` and `G.ring` undefined — padded Lime's 42 (30 / 20 at 390).
  **The divider is a stroked 1px frame, not a fill** (the twins fill theirs
  `scheme/6/stroke/1`): 10, 10 INSIDE on all four sides, which on a 1px frame is one dashed line,
  so `DashRule side="top"` in the span, its fill transparent under `ed` (the bio's divider
  recipe, without the bio's 8px weight slip). **The faces are circles** (999, where the twins'
  are 13 / 8) in Grunge's `2px solid ${s.stroke1}`, `faceR` `'999px'`. The chips keep
  `s.radiusChip`, 6 unscaled at desktop (Lime's reading of `radius/chip`).
- **The instance ring is drawn: Grunge's overlay, widened to `grunge || ed`.** The root binds
  `sem/stroke/1` 1px INSIDE, solid, and every render samples it on all four edges —
  `(147, 143, 139)` round the 1440 ink band (paper at 56%, to the unit) and `(20, 20, 20)` round
  the narrow paper. The desktop foot rule keeps its box and paints transparent under `ed` too, or
  the 56% would stack under the overlay. Pricing stands between the gallery's bare paper and the
  calendar's wrapper at every width, so nothing doubles; at 768 and 390 the section is a paper
  box closed by an ink ring on the paper page (the frame's picture), as the repertoire's narrow
  sheet is two sections up. Lime alone declines the ring (its user call, 2026-09-17).
- **Type**: `disp()` uppercases under `grunge || ed` (the heading, the name, the numeral);
  `faced` is the identity. Every Inter and Chakra Petch string is the twins'.
- **Measured against the masters' content edges** (harness, `getBoundingClientRect` from the
  section root, DPR 2): desktop card 558.8 × 406.2 at (575.3, 80), chips 23.2 tall (28 × 0.82 =
  23) 34.4 in, name 37px at 149.1, pill 263.8 × 44.3 (304 × 0.82 = 249.3), divider 490 wide,
  faces 23² circles, small print 12px; 768 card 708 × 450.8 at 307.5 (the left block 219.5
  against 220), chips 27 at x 72 (72), name 36px, pill 268.8 × 54 (258 × 54), divider 624 (624),
  faces 28²; 390 card 370 × 474.5, chips 27 with the seeded third on a second row, name 30px,
  pill 258.9 × 54 `full` (249 × 54) with the line stacked under it, divider 330 at x 30 (30),
  small print 11px. **Named diffs, the twins'**: the desktop card is 558.8 wide against 524.8,
  since `flex: 1 1 0` counts the card's padding into its basis (Lime's head column is 490 today
  as well; it read 540.7 before JP-038 moved `padX`); the seeded three chips against the frame's
  two, wrapping at 390; the seeded two feature rows against four, so the cards stand 406.2 /
  450.8 / 474.5 against 478.9 / 512 / 510; the seeded heading 3 / 2 / 2 lines against the frame's
  typed 2 / 2 / 2; the roots' `padY` 80 / 56 / 44 against 56 × 0.82 / 60 / 30; Noto's pill 4–6%
  wider than Fisterra's (the header's diff).
- **`live=1`** (puppeteer clicks, 1440 and 390): chips 2, 1 and 0 each move the fill (paper at
  1440, blush at 390) and swap the name and price (1,200 / 650 / 450); cursors are live-gated;
  the pill is `<a href="#form">`. `n=0` keeps the dashed card with *No packages yet.* (`s.muted`,
  paper or ink at 64%) and drops the divider; `n=1` draws no chips; `n=8` wraps the chips to three
  rows at 390. No page errors or warnings.
- **Open question 4 is closed**: the credit row is the block's (`hasCredit`), and
  `EDITORIAL_PHOTOS.pricing` is `REVIEWERS` — the frame's own three faces (`fbe69d03`,
  `ef14e35b`, `2de917bf`) — so the canvas draws the frame's avatars, stars and "32 reviews ·
  4.9 ★".
- **`FIELDS.pricing` has no template-keyed `in` row** (`PRICING_CARD` and `PRICING_CREDIT` are a
  flat `[1]`), so no `reach.mjs` run was owed.
- **Digest**: themes 0, 1, 2 and 4 zero files of 645, canvas and `live=1`; theme 3 exactly
  pricing arch 1 at three widths on both surfaces (6 files), no `arch_0` file.
- **For the sweep's CLAUDE.md pass**: the pricing paragraph's layout-2 sentence ("…stacked under
  it at 390, in Retro's card, Lime's and Grunge's alike") owes Editorial's card; and its picked
  chip, where Retro's and the twins' are named, is the frame's `tag/1/bg` under Editorial. Not
  written here.
- **For the calendar**: it is seated on Scheme 2, the card's, with the root painting the page's
  paper round it (`editorialCard`), and its Lime block (inside `Calendar`'s `if (s.v1)`, after
  `want` / `hit` / `cur` / `line`) has Grunge's `G` at its head, so a third arm again. Its head
  band is this route's one nested scheme left: fill `sem/text/1` (terracotta at every width) but
  type `sem/bg`, **paper at 1440 and ink narrow** (trap 4), picked per width off `s.onScheme` as
  session 0 set out — but resolve every band leaf's binding first. The slot marks' pin is
  re-measured in Noto with `&open=` looping every month (the frame cannot be the ruler: its
  "JUN 14" renders "JUN 1"), and the foot pill's paper 5 / 5 block goes through the caller's
  `style`.

### Inherited and used

*(The running list the sweep folds into [`../CONVENTIONS.md`](../CONVENTIONS.md): each time a
session leans on a bullet from Editorial layout 1's, Lime's, Grunge's or Retro's Conventions, name
it here in one line, with the plan it came from, a blank line between sessions.)*

- Session 0: *A section's colour scheme is resolved in `sectionVm`, not restated in its block*
  (editorial/layout-1, *decision 3* and *Settled in session 0*) — extended by a width triple, a
  page ground and a nested-scheme key.
- Session 0: *`get_variable_defs` resolves a node's mode* (memory: `figma-frame-reading`) — Scheme
  4 confirmed off the form's and the repertoire's desktop masters.
- Session 0: *The digest is committed* (lime/layout-1, *Settled in session 0*) — five themes
  canvas and live for (a), and the theme-3 filter by `_arch_1_` and category for (b).

- Header: *The first layout-2 block: `if (s.lime) { … return }` at the head of `HeaderV1`*
  (lime/layout-2, D2) — widened to `s.limeTree`, a dozen `ed` arms, no `G`.
- Header: *The capsule's links hold one row by budgeting the whole bar* (lime/layout-2, D2) and
  Grunge's fixed-gap variant of it (grunge/layout-2, *Settled in section 1*) — `navGaps`, `navFits`'
  Grunge arm and `navGapEm` 0, all at Editorial `d === 1`.
- Header: *The Scheme 4 nav pill recipe* and *`pk` 0.7547* (lime/layout-2, D2) — the box whole, the
  pair off `s.onScheme[4]`, the 390 label Lime's `s.labelSm`.
- Header: *The digest's header arch 5 folds onto arch 1* (lime/layout-2, D2) — 12 files, arch 5
  byte-identical.
- Header: *The node walker, kept* (grunge/layout-2) with layout 1's `dashPattern` / binding-name
  additions — three walks were the whole read.
- Header: *Read a fill's `scaleMode` before believing its `imageTransform`; correlate the render
  with the seed* (grunge/layout-2, *Settled in section 1*) — turned round: the `CROP` *was* read,
  and the correlation proved it a stretch, so an anchor was chosen instead.
- Header: *A frame's inside stroke is an inset `boxShadow`, on an overlay where an image paints
  over it* (lime/layout-2, *Settled in section 1*) — the arch's 3px ring; a dashed stroke is
  `DashRule` (editorial/layout-1, *Conventions*).
- Header: *A stated list height is a column minimum* (lime/layout-1, *Settled in section 3*) — the
  narrow cards' 148.5.
- Header: *Field reach is measured, not read off the prose* (CLAUDE.md; `scripts/reach.mjs`) —
  `showBadge` / `badgeText` lost design 1.
- Header: *The whole-page published check is one puppeteer script* (lime/layout-1) —
  `page-check.mjs Editorial 1,0,2,3`.

- Bio: *The second layout-2 block, ahead of `Bio`'s `if (s.v1)`* (lime/layout-2, D2) — widened to
  `s.limeTree`, a dozen `ed` arms and a `mount` pair, no `G`.
- Bio: *The 115 × 35 pale pill is not always hand-shrunk at 390* (lime/layout-2, D2) — `k` 0.82 /
  1 / 1, the box read off each master (139.32 / 124.32 / 119.32).
- Bio: *A hard offset shadow goes through the caller's `style`* (lime/layout-2, C) — the paper
  block, sampled to show on `box1`.
- Bio: *A chip standing on `s.box1` takes a darker seat* (lime/layout-2, D2) — turned round: the
  binding is each chip's own tag, so no dark seat.
- Bio: *The photo card keeps the frame's 10 mount* (grunge/layout-2, *Settled in section 2*) —
  Grunge's arithmetic whole, square and re-inked.
- Bio: *Read a fill's `scaleMode` before believing its `imageTransform`; correlate the render with
  the seed* (grunge/layout-2, A) — `FILL`, 0.996 / 1.0 / 0.993.
- Bio: *A dashed rule is `DashRule`* (editorial/layout-1, *Conventions*) — `side="all"` for the
  card with an additive `gap` for the 10, 11, and `side="top"` for the divider.
- Bio: *Emptied content drops its node* (lime/layout-1, C) — the divider with an emptied foot.
- Bio: *The node walker, kept* (grunge/layout-2) and *field reach is measured* (`reach.mjs 3`).

- Media: *The third block, after `nowArt`* (lime/layout-2, D2) — widened to `s.limeTree`, a dozen
  `ed` arms, no `G`.
- Media: *A widened block can need no `G` at all* (grunge/layout-3, C) — the section seated on
  Scheme 2, every leaf a key.
- Media: *`tilt()` is Retro's alone, so a Lime fan writes its angle out* and *the featured tag sits
  at the frame's 26.5 / 26* (lime/layout-2, D2) — both kept whole.
- Media: *Row rules are top-only* (lime/layout-2, D2) — turned round: bottom-only on the head and
  all five rows, so a rule stands under the last.
- Media: *A dashed rule is `DashRule`* (editorial/layout-1, *Conventions*) — `side="all"` on the
  bar, `bottom` on six rules; ink judged at DPR 2 (this plan).
- Media: *`vm.title` shadows the ramp's `title` size* (lime/layout-1, C) — 32 × 0.82 / 25 / 23 in
  `tk`.
- Media: *A leak that shows and reads as a defect is overridden* (grunge/layout-1, A) — the 390
  bar, through the twins' shared override.
- Media: *A section's colour scheme is resolved in `sectionVm`* (editorial/layout-1, C) with
  session 0's `pageBg` / `editorialCard` — the first block to stand on it.
- Media: *The node walker, kept* (grunge/layout-2) with the binding names — three walks.

- Repertoire: *The fourth block, after the seam* (lime/layout-2, D2) — widened to `s.limeTree`,
  about fifteen `ed` arms and a `dash` helper, no `G`.
- Repertoire: *Rows pin at each master's division result* (lime/layout-2, D2) — re-read per
  master: 84.2 / 82.8 / 59.4, neither twin's at 1440 or 768.
- Repertoire: *The sheet's ring is drawn* (grunge/layout-2, *Settled in section 4*) — the overlay
  widened to `grunge || ed`, the head's dashes stacked on it.
- Repertoire: *A widened block can need no `G` at all* (grunge/layout-3, C) — every fill a key in
  both of the section's schemes.
- Repertoire: *Retro's live states vanish under Lime; redraw them, never inherit them*
  (lime/layout-1, C) — the pager's mark, layout 1's Editorial ring in this frame's ink.
- Repertoire: *A dashed rule is `DashRule`* (editorial/layout-1, *Conventions*) — `side="all"`
  on the head and the toggle (a capsule's radius is half its height), `bottom` on the field and
  the rows, and a new upright `right` for the column.
- Repertoire: *Read a scheme per master, never per section* (this plan) — Scheme 4 at 1440,
  Scheme 1 narrow, one binding set for the pager across both.
- Repertoire: *The node walker, kept* (grunge/layout-2) with the binding names — three walks, and
  one stroke tally across all three masters.

- Gallery: *The first layout-2 section with no block: `s.lime` ternaries through `Gallery`'s
  `if (s.v1)`* (lime/layout-2, D2) and Grunge's widening of them (grunge/layout-2, *Settled in
  section 5*) — eight sites under `ed`, one caption ternary left on its Retro arm by binding.
- Gallery: *`size/chip` is `s.chip` exactly* (lime/layout-2, D2) — 12 / 11 / 11, Editorial's chip
  10 / 11 / 11.
- Gallery: *Read a fill's `scaleMode` before believing its `imageTransform`; correlate the render
  with the seed* (grunge/layout-2, A) — the 1440 `CROP` proved a cover at 18.5%, the narrow `FILL`s
  centred, by an anchor sweep.
- Gallery: *A leak that shows and reads as a defect is overridden* (grunge/layout-1, A) — the 390
  wrapper's `[0, 0, 40, 40]`, Grunge's call again; and Retro's *honouring a squeeze costs content*
  (retro/layout-2, the gallery's narrow masters) for the 768 1px tiles.
- Gallery: *A seeded page cannot show an empty slot* — `&n=0` (lime/layout-1, B) — which is what
  found the ink-on-ink initials.
- Gallery: *The paired diff walk* (grunge/layout-2, A) — by traversal order, all three widths,
  both twins in one call.

- Pricing: *The fifth block, after `sel` / `t`* (lime/layout-2, D2) — widened to `s.limeTree`,
  a third `G` arm and six `ed` sites.
- Pricing: *The `G` lookup at the block's head* (grunge/layout-1, C) — the pass's first; the
  Editorial-only leaves (`chipOn`, `chipOnFg`, `chipOnRing`) sit in its arm alone, read through
  `??`.
- Pricing: *The frame's selected chip is invisible, so it is redrawn* (lime/layout-2, D2) —
  turned round: visible here, so its binding is followed.
- Pricing: *The pill is `BookPill`'s defaults exactly* (lime/layout-2, D2) — in both of the
  section's schemes.
- Pricing: *The instance ring is drawn* (grunge/layout-2, *Settled in section 6*) — the overlay
  widened, sampled on every edge at every width.
- Pricing: *A dashed rule is `DashRule`* (editorial/layout-1, *Conventions*) — `side="all"` on the
  card, `top` on the divider (section 2's divider recipe).
- Pricing: *Read a scheme per master, never per section* (this plan) — Scheme 3 at 1440, Scheme 1
  narrow, one binding set.
- Pricing: *The paired diff walk* (grunge/layout-2, A) — both twins in one call, 67 = 67 = 67;
  and *the node walker, kept* with the binding names — three walks.

## Open questions

1. **Decision 1** — schemes by width, a card on the page, a nested node on another scheme.
   *Settled in session 0: all three recommendations.*
2. **The form's credit avatar** is Lime's `f821adc2`, the component's default picture through an
   Editorial instance; the seed (`editorialHeaderAvatar`) stands. Worth telling the designer.
3. **The gallery strip** repeats Retro's placeholder thumbnails again; the seeds stand (layout 1,
   open question 3). Worth telling the designer with it.
4. **The pricing credit row** — the frame draws the three avatars, the stars and "32 reviews ·
   4.9"; Lime's block draws the row (Grunge section 6's correction), so the widened one does too.
   *Settled in section 6: drawn, and `EDITORIAL_PHOTOS.pricing` is `REVIEWERS`, the frame's own
   three faces.*
5. **The demo glyphs** — layout 1's open question 5, with one addition: the calendar's "JUN 14" row
   renders as "JUN 1" and a DEMO mark, so the slot-mark pin cannot be read off the frame. Worth
   telling the designer with layout 1's note.
6. **The testimonials' head overruns its own frame** (1333 in 1328 at 118, in the demo face). The
   testimonials session decides between the frame's size wrapping to three lines and fitting the
   widest line to the column (CONVENTIONS C, *a head fitted to its widest word*, which at this size
   is a line). Worth telling the designer.
7. **The narrow masters' leaks**, each for its session to follow or override (CONVENTIONS A, *leaked
   tops are followed where they show*, *a leak that shows and reads as a defect is overridden*):
   - the 390 bio's ~~chip row~~ **credit box** (`Frame 6`, the credit line's leaked desktop 637.5
     × 39), 637 wide in a 330 column — the reason the 390 page renders 667 wide. *Settled in
     section 2: followed as Lime's `minHeight` only, never its width, so ours stays 390*;
   - the bio's divider stroked **8** INSIDE on a 1px frame, drawn by Figma with a ~7px solid cap at
     each end — *section 2: not drawn, the rule alone*;
   - the 768 and 390 bio's fourth chip in ink (`scheme/4/tag1/text`) where 1440's is paper —
     *section 2: `c.fg` stands, one chip*;
   - the 390 header's nav pill label in Anton 12.07 — *overridden in section 1*: `s.labelSm` 12
     in Noto, Lime's precedent;
   - the 390 media bar's title and byline, 184 wide from x 293 — off the master (its inner pill
     is 22.9 wide, the title column 1). *Section 3: overridden by the shared 390 override the
     twins already run* (clock and icons dropped, padding 16, gaps 14, the inner pill's sides
     0), so "SLOW BURN" is whole at 23;
   - the 768 gallery's two 1px tiles — *section 5: overridden, as the twins' are*: the inherited
     `flex: h 1 auto` divides the band in the frame's proportions, so all six show;
   - the 390 gallery's right-column first-tile wrapper at `[0, 0, 40, 40]` (Grunge's stray
     again), whose capsule foot shows on one tile — *section 5: not followed*, Grunge's call;
   - the 390 testimonials' sub, a 431-wide no-wrap line clipped by the card;
   - the map's ring labels past the 768 and 390 masters, clipped by the viewport.
8. **Header cards 3 and 4** stay placeholders (layout 1, open question 4): `HeaderV2` / `V3` in
   Scheme 1 tokens, Retro's checker ribbon, `mustard` as `s.box3`. Each is its own pass's.
9. **The footer** is layout 1's, closed at planning time: the desktop instance's main component
   (`446:8698`) is not layout 1's (`907:11924`), but the trees are identical.
