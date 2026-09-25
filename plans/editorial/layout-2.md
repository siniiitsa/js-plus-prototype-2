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
- **The 390 page renders 667 wide**: the 390 bio's chip row (`Frame 6`, inside `Frame 260`) is a
  637-wide no-wrap row in a 330 column. `TagChips` wraps, so it does not reproduce; the bio session
  names it (open question 7).

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
| 0 | *foundation* | `964:64598` *(page)* | — | `986:15657` | — | `986:15676` | — | — | — | — | Scheme 4, `SCHEMES_OF.Editorial[1]`, decision 1's mechanisms | — |
| 1 | `header` | `964:64599` | 1440 × 900 | `986:15658` | 768 × 1024 | `986:15677` | 390 × 932 | 1 (nav pill **4**) | `964:64580` | `964:64618` | `if (s.lime \|\| s.grunge) { … return }` at the head of `HeaderV1` | — |
| 2 | `bio` | `964:64600` | 1440 × 760 | `986:15659` | 768 × 1217.8 | `986:15678` | 390 × 880.3 | 1 (pill **4**) | `964:64581` | `964:64619` | `if (s.v1 && (s.lime \|\| s.grunge))` ahead of `Bio`'s `if (s.v1)` | — |
| 3 | `media` | `964:64601` *(Section; panel `964:64602`)* | 1440 × 965 | `986:15660` *(Frame 299; `986:15661`)* | 768 × 1626 | `986:15679` *(Frame 299; `986:15680`)* | 390 × 1442 | page 1, **panel 2** | `964:64582` | `964:64620` | inside `Media`'s `if (s.v1)`, after `nowArt` | — |
| 4 | `repertoire` | `964:64608` | 1440 × 792 | `986:15667` | 768 × 792 | `986:15686` | 390 × 594 | **4 / 1 / 1** | `964:64589` | `964:64627` | inside `Repertoire`'s `if (s.v1)`, after `pageWindow()` | — |
| 5 | `gallery` | `964:64609` | 1440 × 675 | `986:15668` | 768 × 468 | `986:15687` | 390 × 364 | 1 | `964:64590` | `964:64628` | **no block** — `(s.lime \|\| grunge)` ternaries through `Gallery`'s `if (s.v1)` | — |
| 6 | `pricing` | `964:64610` | 1440 × 715 | `986:15669` | 768 × 924 | `986:15688` | 390 × 865 | **3 / 1 / 1** | `964:64591` | `964:64629` | inside `Pricing`'s `if (s.v1)`, after `sel` / `t` | — |
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
merge — the frames' own picture, accepted as layout 1's merged neighbours were. **No root flag
widens**: `bleed`, `darkMap`, `cream`, `limeBand`, `limeLight`, `grungeBand`, `grungeRule` and
`editorialRule` all gate on `s.v0`. Under route A a whole-band section needs no flag (the root
paints `s.bg`); a card section needs decision 1(b)'s.

## The decisions this plan hands over

### 1. Schemes this page's route A cannot yet say — **session 0 asks**

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
7. **`plans/README.md`**: mark the pass closed; **`CONVENTIONS.md`** (decision 3).
8. **Notes for the designer**, gathered from the open questions, layout 1's shape.
9. **Refresh the root `index.html`** with the two-build digest: zero rows at every theme on the
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

### Seen at planning time, per section

From the renders and the planning walk — impressions to confirm, not measurements. The paper
sections (header, bio, gallery, map, testimonials, and the repertoire and pricing narrow) are where
the twins' dark-ground assumptions break (trap 6).

1. **header** — see *The header, and card 2*.
2. **bio** — Scheme 1: a `box1` card dashed terracotta **10, 11** (the only uneven dash on the page)
   holding an outlined "Featured" chip, the paragraph in ink, a dashed divider, the tag chips in
   Chakra Petch alternating blush and terracotta, the credit row ("five years of" terracotta, the
   rest ink) and a **nested Scheme 4** Book pill; beside it a light mount under the twins' soft
   shadow, the photograph, and a paper name plate with a blush disc. The 390 chip row is the 637-wide
   leak (open question 7).
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
   pager's pills terracotta.
5. **gallery** — paper: the hero (784 × 583) in what reads as a thin ink ring, six masonry tiles
   unringed, a blush caption chip in Inter Bold ink; no dash. 768 adds a head row ("Gallery",
   "View (4)"); 390 is the hero over ten small tiles, the loop. The 768 master has **two tiles at 1px
   tall** (`8f69a4a6`, `b35b6507`) — open question 7.
6. **pricing** — at 1440 a full-bleed ink band in what reads as a hairline root ring (Lime and
   Grunge: *the pricing instance's hairline ring*; read it): "[ PRICING ]" paper, the head in
   terracotta, the review quote paper with the avatars and terracotta stars; the plan card dashed
   paper-56 on a slightly lighter fill, a paper "Per event" chip and an outlined blush "Custom
   brief" one, the name paper, the price terracotta, the pill terracotta with ink type and an ink
   disc, the features Chakra Petch paper behind terracotta `+`s; the small print paper. At 768 and
   390 all of it on paper, dashed ink.
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

### Inherited and used

*(The running list the sweep folds into [`../CONVENTIONS.md`](../CONVENTIONS.md): each time a
session leans on a bullet from Editorial layout 1's, Lime's, Grunge's or Retro's Conventions, name
it here in one line, with the plan it came from, a blank line between sessions.)*

## Open questions

1. **Decision 1** — schemes by width, a card on the page, a nested node on another scheme.
   *Session 0 asks.*
2. **The form's credit avatar** is Lime's `f821adc2`, the component's default picture through an
   Editorial instance; the seed (`editorialHeaderAvatar`) stands. Worth telling the designer.
3. **The gallery strip** repeats Retro's placeholder thumbnails again; the seeds stand (layout 1,
   open question 3). Worth telling the designer with it.
4. **The pricing credit row** — the frame draws the three avatars, the stars and "32 reviews ·
   4.9"; Lime's block draws the row (Grunge section 6's correction), so the widened one does too.
5. **The demo glyphs** — layout 1's open question 5, with one addition: the calendar's "JUN 14" row
   renders as "JUN 1" and a DEMO mark, so the slot-mark pin cannot be read off the frame. Worth
   telling the designer with layout 1's note.
6. **The testimonials' head overruns its own frame** (1333 in 1328 at 118, in the demo face). The
   testimonials session decides between the frame's size wrapping to three lines and fitting the
   widest line to the column (CONVENTIONS C, *a head fitted to its widest word*, which at this size
   is a line). Worth telling the designer.
7. **The narrow masters' leaks**, each for its session to follow or override (CONVENTIONS A, *leaked
   tops are followed where they show*, *a leak that shows and reads as a defect is overridden*):
   - the 390 bio's chip row, 637 wide in a 330 column — the reason the 390 page renders 667 wide;
   - the 390 header's nav pill label in Anton 12.07;
   - the 390 media bar's title and byline, 184 wide from x 293 — off the master;
   - the 768 gallery's two 1px tiles;
   - the 390 testimonials' sub, a 431-wide no-wrap line clipped by the card;
   - the map's ring labels past the 768 and 390 masters, clipped by the viewport.
8. **Header cards 3 and 4** stay placeholders (layout 1, open question 4): `HeaderV2` / `V3` in
   Scheme 1 tokens, Retro's checker ribbon, `mustard` as `s.box3`. Each is its own pass's.
9. **The footer** is layout 1's, closed at planning time: the desktop instance's main component
   (`446:8698`) is not layout 1's (`907:11924`), but the trees are identical.
