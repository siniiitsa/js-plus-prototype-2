# Pop layout 2 — section-by-section plan

This is the working checklist for bringing **layout 2** of the Pop template up to its Figma
designs, the way [`../lime/layout-2.md`](../lime/layout-2.md), [`../grunge/layout-2.md`](../grunge/layout-2.md)
and [`../editorial/layout-2.md`](../editorial/layout-2.md) did for the other three. It runs one unit
per session, all three widths together, clearing context between units. Layout 1 (`s.v0` under
`s.pop`) is fitted and closed; nothing here should move it.

**This plan is Editorial layout 2 again, with Pop layout 1's idiom.** It does not repeat either:
the tree evidence, the wrapper insets, the scheme mechanisms (the per-width triple, the card seated
on its own scheme with the root painting `vm.pageBg` round it, `s.onScheme`), the procedure, the
harness, the digest and the verification are Editorial's and Lime's, verbatim, with `theme=3` read
as `theme=4`. The gates (`s.pop`, the widened pair `(s.limeTree || s.pop)`), Titan One at `faceK`
0.98 through `faced` / `facedLh`, `'title'` casing with uppercase per site, `s.text3`, route A′,
`PopSun` / `PopDots` and the `titanEms` fits are [`layout-1.md`](./layout-1.md)'s, and they carry
over whole. What is written here is only what differs — and what differs most is that **this page
is the opposite of layout 1's trap**:

- **Pop's layout-2 variants are bound.** Layout 1's ten non-header variants were raw hexes and raw
  sizes in a page frame set to Lime's mode, so its sessions read everything off the node walker
  (layout 1, *Pop's Figma mode*, traps 1 and 2). This page's frames are set to `Primitives → Pop`,
  `Scheme → Scheme 1`, and **every solid paint in nine of the ten sections is bound to a variable**
  (the planning census: 27 of 27 in the bio, 93 / 93 media, 18 / 18 gallery, 47 / 47 pricing,
  40 / 40 calendar, 101 / 101 map, 31 / 31 form, 24 / 24 testimonials; the header's 23 raws are the
  dot grid's children under a bound `Union` fill and three white glyphs; the repertoire's nine are
  Lime's leaks). Every text style resolves in Pop's mode. **`get_variable_defs`,
  `explicitVariableModes` and `boundVariables` work again**, as they did for Editorial — and a raw
  hex on this page is a leak by construction, not Pop's own tint.
- **The page is Lime's layout-2 tree, node for node.** Not Retro's media player this time: all ten
  sections are Lime's blocks, as on Editorial's page. The header adds layout 1's stickers.
- **It stands on white, with coloured cards** — closer to Editorial's paper page than to Lime's and
  Grunge's dark ones, and its cards stand on **seven** schemes, two of them (teal 5, yellow 8) new
  to the code.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then
- the whole *Conventions* of [`layout-1.md`](./layout-1.md) and its *Settled in session 0* — the
  foundation (`s.pop`, the face and `faceK`, casing, `text3`, route A′, the band language) — and
  its *Learned on the end-of-pass sweep* (where every `(s.limeTree || s.pop)` stands, and why)
- the *Conventions* and *Settled in session 0* of [`../editorial/layout-2.md`](../editorial/layout-2.md)
  — the mechanisms this page leans on (`SCHEMES_OF` triples, `pageBg` / `editorialCard`,
  `onScheme`), and the light-page arm every Lime layout-2 block now carries
- [`../CONVENTIONS.md`](../CONVENTIONS.md), groups **A, B, C and D2**, and the bullets they point at
- the section's *Settled in section N* bullets in [`../lime/layout-2.md`](../lime/layout-2.md),
  [`../grunge/layout-2.md`](../grunge/layout-2.md) **and** [`../editorial/layout-2.md`](../editorial/layout-2.md)
  — the block you are widening, and the two widenings of it already done, Editorial's the one on a
  light page with nested schemes
- the section's entries in **all three layout-2 QA batches**, which moved those blocks after their
  *Settled* bullets: [`../lime/layout-2-qa-fixes.md`](../lime/layout-2-qa-fixes.md) (JP-036 …
  JP-042), [`../grunge/layout-2-qa-fixes.md`](../grunge/layout-2-qa-fixes.md) (JP-059, JP-060) and
  [`../editorial/layout-2-qa-fixes.md`](../editorial/layout-2-qa-fixes.md) (JP-092 … JP-100)
- the *Conventions* and the narrow-masters notes of [`../retro/layout-2.md`](../retro/layout-2.md),
  which built every `s.v1` branch
- the *Per-session procedure* of [`../lime/layout-2.md`](../lime/layout-2.md)

Then the memory notes `figma-frame-reading`, `verifying-the-published-tab` and
`browser-tool-choice`. `SPEC.md` lives in git history: `git show 8fa8ff4:SPEC.md`.

Branch: **`pop-layout-2`, forked from `main`** (`e4b7bc8`, which carries the merged `pop-layout-1`,
PR #47). The planning session created it and committed this plan there.

## What the pass must deliver

1. **Every layout-2 section works in the published tab under Pop**: every `s.v1` control
   CLAUDE.md lists under *`s.live` is false everywhere except the published tab*.
2. **Every layout-2 section looks as close to its Figma frame as possible**, at 1440 (× 0.82 onto
   the 1180 canvas), 768 and 390.
3. **The setup modal's card 2, "Feature spread", lays out a fitted page.** `pickHeader` writes arch 1
   to every section, so this pass turns card 2 from its placeholder (layout 1, open question 8:
   Retro's `HeaderV1` path, the place card black under Pop's `pillBg`, the desktop links wrapping
   the Retro bar onto two rows, `SealBadge`'s Pop arm) into Pop's own page. The header session
   verifies it **in the builder**, not only the harness.
4. **The sidebar's layout-picker thumbnails for layout 2** under Pop look like their sections. They
   render `sectionVm` at `SIZES.desktop`, so they follow the desktop fit for free; check them once,
   in the sweep.

## What this pass actually is

**Pop's layout-2 page is Lime's layout-2 page in a fifth variable mode**, as Editorial's was in the
fourth. The evidence, read at planning time (2026-10-05) with one `use_figma` walk per page frame
(main component, `explicitVariableModes` and `resolvedVariableModes`, every nested mode, bound
paints resolved to `collection/name`, effects, rotations, stroke weights and radii, image hashes,
text faces with their style names, nodes running past the root) and the longest common subsequence
of every visible node's `(depth, type, lower-cased name)` against the twins' desktop instances:

| Section | Pop nodes | LCS with Lime / Editorial | What only Pop draws |
|---|---|---|---|
| header | 66 | **40 / 39** (Lime's 40 whole) | a pink **dot grid** (`Union`, 328 × 239, 20 dots) and the blue **smiley sun** (`Layer_1`, 154, −25.37) — layout 1's stickers |
| bio | 40 | **40** / 39 | — |
| media (the `Section`) | 97 | **97 / 97** | — |
| repertoire | 85 | **85 / 85** | — |
| gallery | 18 | **18 / 18** | — |
| pricing | 67 | **67 / 67** | — |
| calendar (the wrapper) | 48 | **48 / 48** | — |
| map | 123 | **123 / 123** | — |
| form | 42 | **42 / 42** | — |
| testimonials | 26 | **26 / 26** | — |
| footer | 51 | — | **layout 1's footer** (below) |

- Every instance is the **`Theme=Pop` variant** of the set the twins instantiate (the header's
  `624:5517`, the bio's `676:2001`, the repertoire's `745:2793`, the gallery's `710:2637`, pricing's
  `715:2700`, the map's `731:3672`, the form's `725:2624`, the testimonials' `748:2163`), and
  carries `1 · Primitives` → **Pop**. Ids differ per variant, so diff **by traversal order**, and
  **case-insensitively** (Pop types most display strings in capitals; layout 1, *What this pass
  actually is*).
- **No Device override on any instance**: every master resolves its own page's Device. The 390
  header is *named* "— Tablet", as every twin's is, and resolves `Device: Mobile` — layout 1's
  390-hero trap does not recur. Each session re-checks its own three.
- **The footer is layout 1's, and out of scope.** The narrow masters are the very components layout
  1 fitted (`907:12261`, `907:12502`); the desktop one is an instance of `446:8697` ("Component 2 /
  Property 1=pop") where layout 1's is `907:12019`, and the two trees are identical node for node
  and box for box at all three widths (51 each; the only difference is the instance's name). It is
  still unbound (41 raw solids — layout 1's raws). `NVAR.footer` is 1, and `SCHEMES_OF.Pop[0].footer`
  (3, pink) is read at every page layout — this frame's footer is pink too. The row is closed at
  planning time.
- **Video is not a category.** The pages carry a *Video Players — A · Dashboard player* frame in
  fourth place (`964:64569` / `986:17571` / `986:17590`); no `Video` component exists, so it is not a
  row here, as on every twin's page.

So, as under Editorial's layout 2: **no Pop-only branches and no Pop-only ternary trees.** The work
is Pop deltas inside **Lime's layout-2 blocks**, each widened from `s.limeTree` to `(s.limeTree ||
s.pop)` (decision 1) with `const pop = s.pop` naming the deltas — or a fourth arm on the block's
`G`, whose Lime, Grunge and Editorial arms stay byte-identical. **Themes 1, 2 and 3 are the digests
at risk**: every widened block is one Lime, Grunge *and* Editorial render. A section whose tree
turns out not to be the twins' is the exception; record it under *Conventions* before branching.

**Where each Lime block sits decides how it widens** — Editorial's placements, now gated
`s.limeTree` (walked at planning time from each gate to its enclosing branch):

- `if (s.limeTree) { … return }` **at the head of `HeaderV1`**. Widening it makes Retro's half
  unreachable under Pop. Unlike Editorial's pass, **there is no Pop arm in Retro's half to delete**
  (grepped): layout 1's card-2 placeholder took no Pop fix, so its seal (`SealBadge`'s Pop arm), its
  black place card and its wrapping links simply stop being reached.
- `if (s.v1 && s.limeTree)` **ahead of `if (s.v1)`** — the bio and the form.
- `if (s.limeTree)` **inside `if (s.v1)`, after the seam** — media (after `nowArt`), repertoire
  (after `pageWindow()`), pricing (after `sel` / `t`), calendar (after `want` / `hit` / `cur` /
  `line`), map (after `stats`), testimonials (after `rail`).
- **No block** — the gallery: a dozen `s.limeTree` reads through `Gallery`'s `if (s.v1)`
  (`bw`, `well`, the caption's face and tracking, `ink`, the head's size, the tile borders, the
  empty slot's `ink` and `well`), plus three `(s.lime || grunge)` / `ed` ternaries — the caption's
  fill, which Editorial left on its Retro arm by binding, the tile ratio and `cream`. It widens site
  by site, from the frame.

**Inheritance** ([`../CONVENTIONS.md`](../CONVENTIONS.md)): **A** and **B** always; **C**, since
this is another variable mode of a page already fitted three times; **D2**, since its blocks are
Lime's layout-2 blocks, widened as Grunge and Editorial widened them. Not D1: its helpers
(`BookPill`, `Pager`, `TagChips`, `labelStyle`, `LogoMark`, `NavBar`) were widened to `(s.limeTree
|| s.pop)` in layout 1 and already switch on under Pop's layout-2 branches; what they draw here is
each session's to check. Keep the running *Inherited and used* list below; the sweep folds it into
that file as a *Leaned on in Pop (layout 2)* column.

## The Figma source

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Frame 250 | `964:64560` | 1440 × 9456.2 |
| Tablet | Frame 263 | `986:17562` | 768 × 10948.8 |
| Mobile | Frame 264 | `986:17581` | 390 × 10738.9 |

- Desktop: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=964-64560&m=dev>
- Tablet: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=986-17562&m=dev>
- Mobile: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=986-17581&m=dev>

`fileKey` = `uFoUbPaBrDicjyuSBEbtGT`. All three sit on the page **Layout 2** (`964:58572`) beside
Retro's (`964:64636` …), Lime's (`964:64579` …), Grunge's (`964:64617` …) and Editorial's
(`964:64598` …). `use_figma` reads on descendants want `await figma.setCurrentPageAsync(await
figma.getNodeByIdAsync('964:58572'))` first. **The page frames are set right** (Pop, Scheme 1, and
Device Tablet / Mobile on the narrow ones) — layout 1's desktop page was set to Lime — but read a
section node, never the page, all the same.

**Match on node id and width, never on the name** — the misnomers are the twins', one for one:
- The 390 header (`986:17582`) is called "— **Tablet**" and resolves `Device: Mobile`.
- The calendar instance is "— Desktop" at 1440 and 768; the 390 one (`986:17595`) is **another
  main component** (its children `I986:17595;880:20918 …` where the wider two read `…;722:2784 …`)
  with four more nodes — the stacked foot (Lime's *the 390 foot stacks*, since **made one row by
  JP-100**, which the widened block inherits).
- The footers are "Component 2" at 1440 and "Footer — Component 3 / 4 — **Desktop**" at 768 and 390.

**Two pages render wider than their frame**, each a leak for its session to follow or override
(CONVENTIONS A, *leaked tops are followed where they show*, *a leak that shows and reads as a
defect is overridden*):
- **The 768 page renders 783 wide**: the header's sun (`Layer_1`, 154 at x 644) runs 15 past its
  right edge. Clip it, or the published 768 page scrolls sideways — layout 1's pricing rings and
  `popClip` are the precedent.
- **The 390 page renders 667 wide**: the bio's chip row (`Frame 6`) is a no-wrap row running to 667,
  Editorial's leak again (its open question 7). `TagChips` wraps, so it does not reproduce.

Inside a root, clipped by it (each its session's to read): the 390 media titles and bar byline (to
x 471), the map's ring labels past the 768 and 390 viewports (to 866 / 480), and the 390
testimonials' sub, a no-wrap line to 411.

**Two sections are wrapped**, exactly as on the twins' pages:
- **media** is a `Section` (1440, `964:64563`) or `Frame 299` (narrow, `986:17565` / `986:17584`)
  holding **`Frame 297`, the Scheme 2 panel** (`964:64564` / `986:17566` / `986:17585`), which holds
  `Frame 296` — the head over the fanned carousel (`964:64565` / `986:17567` / `986:17586`) — beside,
  or above, the numbered list (`964:64568` / `986:17570` / `986:17589`). The panel stands in its
  wrapper at **56·86, 30·60 and 10·40**, the twins' own; panel padding 60 / 60·30 / 40·20, gap 50,
  radius **50 / 30 / 30**. **The desktop `Section` alone carries a 5px lime INSIDE stroke on its top
  and bottom** (`scheme/1/stroke/2`, named outright) — the narrow wrappers carry none.
- **calendar**'s `Frame 298` (`964:64573` / `986:17575` / `986:17594`) only insets the instance
  (`964:64574` / `986:17576` / `986:17595`) — **56·56, 30·56 and 10·40**, the twins' own — and sets
  no mode: the **Scheme 2** instance (radius 50 at every width) is a card on the page's white. Fit
  the instance.

## The sections

Page order — `PAGE_ORDERS[1]`, which is the frames' order less the video frame. Sizes are the
frames' own. Each row's three masters are one session. **Lime block** is where that section's Lime
layout-2 block sits in `EncoreSection.jsx` (grep a twin's desktop id to find it); it is the gate the
session widens. The narrow twins are in Editorial's and Grunge's sections tables.

| # | Cat | Desktop node | Size | Tablet node | Size | Mobile node | Size | Scheme 1440 / 768 / 390 (nested) | Lime twin | Editorial twin | Lime block | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | *foundation* | `964:64560` *(page)* | — | `986:17562` | — | `986:17581` | — | — | — | — | Schemes 5 and 8, `SCHEMES_OF.Pop[1]`, `editorialCard`, the JP-094 pad arm, `navModeDefault` | **done** |
| 1 | `header` | `964:64561` | 1440 × 974 | `986:17563` | 768 × 1024 | `986:17582` | 390 × 994 | 1 (Enquire pill **3**, place card **6**, Book pill **3 / 3 / 4**) | `964:64580` | `964:64599` | `if (s.limeTree) { … return }` at the head of `HeaderV1` | |
| 2 | `bio` | `964:64562` | 1440 × 760 | `986:17564` | 768 × 1138.8 | `986:17583` | 390 × 881.3 | 1 (Book pill **4**) | `964:64581` | `964:64600` | `if (s.v1 && s.limeTree)` ahead of `Bio`'s `if (s.v1)` | |
| 3 | `media` | `964:64563` *(Section; panel `964:64564`)* | 1440 × 965 | `986:17565` *(Frame 299; `986:17566`)* | 768 × 1541 | `986:17584` *(Frame 299; `986:17585`)* | 390 × 1420 | page 1, **panel 2** (fan cards 6 / 3 / 5 / 4 / 2, list rows 3 / 4 / 5 / 7 / 8) | `964:64582` | `964:64601` | inside `Media`'s `if (s.v1)`, after `nowArt` | |
| 4 | `repertoire` | `964:64570` | 1440 × 792 | `986:17572` | 768 × 792 | `986:17591` | 390 × 594 | 1 (a `box/1` sheet) | `964:64589` | `964:64608` | inside `Repertoire`'s `if (s.v1)`, after `pageWindow()` | |
| 5 | `gallery` | `964:64571` | 1440 × 675 | `986:17573` | 768 × 468 | `986:17592` | 390 × 364 | 1 | `964:64590` | `964:64609` | **no block** — `s.limeTree` reads and `(s.lime \|\| grunge)` / `ed` ternaries through `Gallery`'s `if (s.v1)` | |
| 6 | `pricing` | `964:64572` | 1440 × 719.7 | `986:17574` | 768 × 926.4 | `986:17593` | 390 × 841.4 | 1 (the plan card **7**, leant −3 / −3 / −1) | `964:64591` | `964:64610` | inside `Pricing`'s `if (s.v1)`, after `sel` / `t` | |
| 7 | `calendar` | `964:64574` *(in `964:64573`)* | 1328 × 842 *(1440 × 954)* | `986:17576` *(in `986:17575`)* | 708 × 705 *(817)* | `986:17595` *(in `986:17594`)* | 370 × 698 *(778)* | page 1, **card 2** | `964:64593` | `964:64612` | inside `Calendar`'s `if (s.v1)`, after `want` / `hit` / `cur` / `line` | |
| 8 | `map` | `964:64575` | 1440 × 808 | `986:17577` | 768 × 823 | `986:17596` | 390 × 1286 | 1 (travel card **3**, map card **2**, viewport **3**) | `964:64594` | `964:64613` | inside `EventsMap`'s `if (s.v1)`, after `stats` | |
| 9 | `form` | `964:64576` | 1440 × 784 | `986:17578` | 768 × 856 | `986:17597` | 390 × 910 | **4** (sidebar card **2**) | `964:64595` | `964:64614` | `if (s.v1 && s.limeTree)` ahead of `EnquiryForm`'s `if (s.v1)` | |
| 10 | `testimonials` | `964:64577` | 1440 × 762.9 | `986:17579` | 768 × 730 | `986:17598` | 390 × 842 | 1 (big card **2**, picked tile **3**) | `964:64596` | `964:64615` | inside `Testimonials`' `if (s.v1)`, after `rail` | |
| — | `footer` | `964:64578` | 1440 × 479.5 | `986:17580` | 768 × 720.4 | `986:17599` | 390 × 720.4 | 3 | — | — | — | **out of scope**: layout 1's footer, closed at planning time (above) |
| — | `video` | `964:64569` | 1440 × 782 | `986:17571` | 768 × 1112.2 | `986:17590` | 390 × 1107.8 | 1 | — | — | — | **not a category** |

**Cite branches by id, never by line number**: the file is ~28 100 lines and every session moves it.
**Re-measure from the Pop frame; never reuse a twin's block sizes.**

### Sizes: re-measure, and expect the type to be the difference

Pop's display ramp is the smallest of the five (layout 1's mode table: `display-xl` 125 / 75 / 46,
`-lg` 82 / 51 / 36, `-md` 45 / 36 / 28, `-sm` 36 / 29 / 24, `title` 28 / 22 / 20, `list` 20 / 16 /
15), and Titan One runs 2% narrower than Chunko at `faceK` 0.98. The frames move where the type is
the content:

| Section | Pop 1440 / 768 / 390 | Editorial | Lime |
|---|---|---|---|
| header | **974** / 1024 / **994** | 900 / 1024 / 932 | 900 / 1024 / 890 |
| bio | 760 / **1138.8** / 881.3 | 760 / 1217.8 / 880.3 | 760 / 1191.8 / 909.3 |
| media | 965 / **1541** / **1420** | 965 / 1626 / 1442 | 965 / 1568 / 1452 |
| repertoire | 792 / 792 / 594 | the same | the same |
| gallery | 675 / 468 / 364 | the same | the same |
| pricing | 719.7 / 926.4 / **841.4** | 715 / 924 / 865 | 730 / 946 / 879 |
| calendar (instance) | **842** / **705** / **698** | 1072 / 803 / 774 | 1071 / 844 / 766 |
| map | **808** / 823 / 1286 | 833 / 823 / 1286 | 867 / 823 / 1286 |
| form | **784** / **856** / **910** | 802 / 877 / 925 | 812 / 889 / 933 |
| testimonials | **762.9** / **730** / **842** | 831.9 / 863 / 939 | 855.9 / 824 / 917 |

- **The header is 74 taller at 1440**: its photograph is a 636 × **762** oval where the twins' is
  636 × 688, and the root pads 156 on top.
- **The calendar is 230 shorter at 1440**: its slot marks are `Display/LG` 82 where Editorial's are
  118, so the four rows and the head shrink with them. Re-measure Lime's pinned date column in Titan
  One at all three widths with `&open=` looping every month (Retro layout 2, *measure the pin,
  never transcribe it*; Editorial's section 7 re-pinned it for Noto). The frame is a fair ruler
  this time: Chunko draws "JUN 14" whole (Editorial's demo face dropped the 4).
- **The testimonials' head is `Display/XL` 125** ("HONEST FEEDBACK / FROM PEOPLE WHO BOOKED", two
  lines at 1440 and 768, three at 390) — every twin's is `Display/LG`. Check it against its column
  before choosing (CONVENTIONS C, *a head that must fit its measure*; `titanEms` already serves
  Pop's quote and footer fits).
- **The media head moves token and case between widths** — decision 2.

## Pop's layout-2 mode

Pop's Scheme 1 and the five schemes layout 1 seated (2, 3, 4, 6, 7) are in [`layout-1.md`](./layout-1.md), *Pop's Figma
mode*, and in `THEMES[4]` (`palette` / `sem` / `tags`, `schemes[2]`, `[3]`, `[4]`, `[6]`, `[7]`). Its
traps 3 and 5 recur here — Scheme 1's active pair **black** and idle pair **lime** (the
testimonials' Book pill is `sem/active/bg`: black), `stroke1` opaque pink. **Trap 4 is turned
round**: layout 1's rule was *a Pop arm reaches for `s.text3`, not `s.tx`, for body copy*, because
those unbound frames set it in black. This page binds its body copy to **`sem/text/2`** — violet,
`s.tx` — everywhere (the census: bio × 5, media × 28, repertoire × 39, map × 54, testimonials × 11;
the bio's paragraph, pricing's quote and the review render violet), and `sem/text/3` appears at two
sites only: the place card's body (white, under Scheme 6) and the form's promises and credit
(white, under Scheme 4). So on this page body copy is `s.tx`, and `s.text3` (or
`s.onScheme[n].text3`) is read only where a node binds `text/3`. Traps 1, 2, 6 and 7 do **not**
recur (above): read the bindings.

**Schemes 5 and 8 are new to the code**, read at planning time off `2 · Scheme` resolved through
`Primitives → Pop` — and identical, cell for cell, to layout 1's planning table:

| | **Scheme 5** · teal | **Scheme 8** · yellow | `THEMES` key |
|---|---|---|---|
| `bg` / `text1` / `text2` / `text3` | `#00E0C4` / `#6B2CFF` / `#FFF600` / `#000000` | `#FFF600` / `#FF2DA0` / `#6B2CFF` / `#000000` | `palette`, `text3` |
| `box1` / `box2` / `box3` | `#14F4D8` / `#0AC9B1` / `#06A893` | `#FFFB96` / `#EEE60B` / `#D4CC04` | `sem` |
| `active` bg / text | `#6B2CFF` / `#FFFFFF` | `#FF2DA0` / `#FFFFFF` | `activeBg` / `activeFg` |
| `inactive` bg / text / border | `#6B2CFF` / `#FFFFFF` / `#6B2CFF` | `#FF2DA0` / **`#000000`** / `#FF2DA0` | `inactiveBg` / `inactiveFg` / `inactiveLine` |
| `stroke1` / `stroke2`, `glow` | `#6B2CFF` / `#FFF600`, `#6B2CFF` | `#FF2DA0` / `#6B2CFF`, `#FF2DA0` | |
| `tag1` / `tag2` bg · text | `#6B2CFF` · `#F6F0E8` / `#FF1A1A` · `#F6F0E8` | `#C6F200` · `#141414` / `#FF2DA0` · `#F6F0E8` | `tags`, `tagFg` |

`sem/media` is `#41BFBA` in both, as in every scheme. Session 0 reads tags 3–7 of each and writes
them in Scheme 1's shape (`schemes[2]` is the model: seven `tags`, seven `tagFg`).

**Schemes by node** (`resolvedVariableModes` on each root, every nested `explicitVariableModes`, all
three widths). **Read each node's `boundVariables` before believing a token** — a binding resolves
in the scheme its node stands on, and three sites below say a different colour than their scheme's
name suggests:

| Section | 1440 | 768 | 390 | Nested (every width unless said) |
|---|---|---|---|---|
| header | 1 | 1 | 1 | the Enquire pill (312 × 54 / 266 × 54 / 254 × 54): **3**; the place card (310 × 468 / 324 × 197 / 370 × 185): **6**; the nav's Book pill (145 × 35 / 129 × 35 / 91 × 26): **3 at 1440 and 768, 4 at 390** |
| bio | 1 | 1 | 1 | the card's Book pill (145 / 129 / 123 × 35): **4** |
| media | `Section` 1 | wrapper none (page 1) | wrapper none | **`Frame 297`, the panel: 2**; the five fan cards **6 / 3 / 5 / 4 / 2** (the centre one 2); the five list rows **3 / 4 / 5 / 7 / 8** |
| repertoire | 1 | 1 | 1 | — (the `phone` sheet is `box/1`, ringed 1px `stroke/1`) |
| gallery | 1 | 1 | 1 | — |
| pricing | 1 | 1 | 1 | the plan card `right` (640 × 556 / 708 × 496 / 370 × 496): **7** |
| calendar | wrapper none; instance **2** | the same | the same | — (the head band reads Scheme 2's keys; read which) |
| map | 1 | 1 | 1 | the travel card (652 × 345 / 342 × 333 / 370 × 347): **3**; `radius-map` (652 × 696 / 342 × 703 / 370 × 479): **2**; `Map Viewport` (588 × 471 / 318 × 527 / 346 × 305): **3** |
| form | **4** | **4** | **4** | the sidebar card (450 × 373 / 334 × 354 / 370 × 349): **2** |
| testimonials | 1 | 1 | 1 | `big-card` (1201 × 325 / 586 × 341 / 350 × 365): **2**; the picked `ts-photo` tile: **3** |
| footer | — | — | — | layout 1's, unbound; seated 3 by row 0 |

Seven traps in that table and the walk:

1. **The page is bound; a raw hex is a leak.** Layout 1's census rows and its `POP_*` literal
   tables were written for unbound frames; here the bound name is the source, and the node walker's
   raw paints only find leaks (the repertoire's `#AFE335` × 4, `#F2FFD0` × 2, `#FBF6EA`, a raw
   `#6B2CFF` × 2, and Anton 12 on its pager numerals; the 390 header pill's label in Anton 12.07).
   Decision 2.
2. **Two schemes are missing from `THEMES[4]`.** The media fan's teal card and its teal and yellow
   list rows stand on Schemes 5 and 8; layout 1 seated nothing there. Session 0's data.
3. **A nested scheme moves by width**: the header's Book pill is Scheme 3 (a pink pill, lime label,
   a lime 5 / 5 block) at 1440 and 768, and **Scheme 4 at 390** (blue, teal label, a teal 3.77
   block). Editorial's calendar band is the precedent — the block picks `s.onScheme[s.mob ? 4 : 3]`;
   no second triple in the data, no new mechanism.
4. **Bindings that read another colour than their scheme's name.** The place card stands on Scheme
   6 (violet) and fills `sem/text/2` — **pink**; its ring names `scheme/3/stroke/2` (lime)
   outright. The header's dot grid is a `Union` whose own fill (`sem/text/1`, pink) paints over its
   twenty children's raw `#41BFBA`. The calendar's first slot mark binds `sem/media` (teal), the
   others Scheme 2's pink and violet. Resolve each.
5. **Nodes name Scheme 1's variables outright** (CONVENTIONS A, *a node can name another scheme's
   variable outright*): `scheme/1/stroke/2` on the header capsule's ring, the bio's "/Featured"
   pill and the media `Section`'s 5px rules; `scheme/1/tag1`…`tag4` on the bio's chips;
   `scheme/4/tag1/text` in the bio; `scheme/6/stroke/1` in pricing. Read the collection as well as
   the token.
6. **Scheme 2's `pillBg` is pink and its `stroke1` violet**: the media panel, the calendar card,
   the map card, the form's sidebar and the testimonials' big card are lime, so a Lime block's
   `s.pillBg` there is pink (the sidebar's Check Availability pill) and `s.stroke1` violet (the big
   card's 3px ring, the media bar's outline).
7. **Lime's and Grunge's layout-2 pages are dark; Pop's, like Editorial's, is light** — but white,
   not paper, with **lime** cards. Editorial's arms (paper page, taupe cards, `s.onScheme` for
   every nested node) are the nearer precedent for structure; neither twin's colours are.

### Grounds

Sampled off the three renders. **The sequence is the same at every width**:

| # | Section | Ground | What stands on it |
|---|---|---|---|
| 1 | header | white | an oval photograph in an 8px lime ring under a pink dot grid and the blue sun; a white capsule ringed lime; a grey face card and a pink place card, both pill-tall at 1440 |
| 2 | bio | white | a `box/1` card ringed 4px pink; a pink photo mount under a soft shadow |
| 3 | media | white, **5px lime rules top and bottom at 1440** | **the lime panel** (Scheme 2), radius 50 / 30 / 30 |
| 4 | repertoire | **a grey `box/1` sheet ringed 1px pink**, full-bleed | pink-ruled rows, the pager |
| 5 | gallery | white | photographs ringed lime and pink |
| 6 | pricing | white, **ringed 1px pink at 768 and 390** | **the coral plan card** (Scheme 7), leant |
| 7 | calendar | white | **the lime card** (Scheme 2) under a pink head band |
| 8 | map | white | a pink travel card, grey gig rows ringed pink, a lime map card round a dark viewport |
| 9 | form | **full-bleed blue band** (Scheme 4) | a stage photograph ringed teal, **the lime sidebar card** (Scheme 2) |
| 10 | testimonials | white | a lime review card beside a rail of ringed tiles; a black Book pill |
| — | footer | pink, layout 1's | — |

The page is a white run of cards, broken by the grey repertoire sheet and the blue form band, then
the pink footer. With straight edges, the white sections merge — the frames' own picture, accepted as
layout 1's white run was. **No root flag widens but `editorialCard`** (session 0): `bleed`,
`darkMap`, `cream`, `limeBand`, `limeLight`, `grungeBand` and `editorialRule` all gate on `s.v0`
or another template; a whole-band section needs no flag under route A′ (the root paints `s.bg`), and
the two cards on the page need `editorialCard`'s.

**No 10px rules on this page.** Layout 1's band language — a 10px INSIDE stroke where the ground
changes — has no site here; the only rules are the media `Section`'s 5px lime pair at 1440, the
repertoire sheet's 1px pink ring and pricing's narrow 1px pink ring.

## The decisions this plan makes or hands over

### 1. The gate — **settled: A, `(s.limeTree || s.pop)` per site, layout 1's idiom** (user call, 2026-10-05)

Layout 1's decision 3 widened each layout-1 block per site to the pair, and its sweep kept all
sixteen pairs, naming the fold for later: *widen `limeTree` (and `limeTreeTheme`) to Pop once its
family closes, deleting every `|| pop` at once*. Layout 2 is not the family's close, so:

- **A (recommended): the pair, per site, per session.** Each section widens **its own layout-2
  block's** gate — `HeaderV1`'s `if (s.limeTree)`, the bio's and form's `if (s.v1 && s.limeTree)`,
  the six in-branch `if (s.limeTree)`, the gallery's reads — to `(s.limeTree || s.pop)`, with Pop's
  deltas behind `s.pop` (`const pop = s.pop` and arms, or a fourth arm on `G`). Each session's
  theme-4 digest then moves its own category alone, and an unread block never lights.
- **B: a design-scoped join** — `limeTree: … || (T.name === 'Pop' && d === 1)`. One line, and the
  layout-2 pairs never exist. But every layout-2 Lime block lights in session 0, before any session
  has read it, with **Lime's literal arm** of every `G` (Lime's `#C7FF3C`s on a white page), and
  `limeTree` stops meaning "a template whose pages are Lime's tree" (it already does not under Pop
  at layout 1). Rejected for layout 1 for the same reason.

Under A, the sweep lists every layout-2 pair beside layout 1's sixteen (item 6).

### 2. Leaks on a bound page — **settled: CONVENTIONS A per site, layout 1's face rule** (user call, 2026-10-05; the media head's case and ink stay the media session's)

Layout 1's decision 5 was *follow every raw hex as a named literal* — right for an unbound page,
where a raw hex was Pop's own tint. Here every Pop colour is bound, so a raw hex is another
template's leftover. Recommended:

- **Raw hexes are leaks, each judged by CONVENTIONS A's two rows** — *followed where they show* if
  they read as Pop, *overridden* if they read as another template's. The repertoire's `#AFE335`,
  `#F2FFD0` and `#FBF6EA` are Lime's and Retro's; read where each shows before deciding.
- **Faces: layout 1's rule stands** — Anton on the repertoire's pager numerals and the 390 header
  pill's label (Anton 12.07, Editorial's leak too) is set in Pop's label face, as layout 1's pager
  numerals were.
- **Hand-scaled instances are not the ramp** (CONVENTIONS C): the bio's chips are Chakra Petch
  15.37 / 10.76 / 9.22 (Lime's hand-scaled `Tags` instance); the map's two unstyled Inter Bold 20s.
- **The media head is a read-against-the-frame item for the media session**: at 1440 it is "FIVE
  WORTH YOUR EAR" in `sem/text/2` (violet), typed in capitals; at 768 and 390 it is "Five Worth
  your ear" in `sem/text/1` (pink), **typed mixed** — the only display string on the page not typed
  in capitals. *Recommended:* the case is a slip and is uppercased at every width (every other
  Chunko string is capitals); the ink is a binding and is followed per width (pink narrow, violet
  wide), unless the render reads it as a defect. Settle it in the media session, with the frame
  open.

Asked once, here, rather than ten sessions deciding it ten ways.

### 3. `navModeDefault` and the 768 nav fit — **not a user call; session 0 and the header session**

JP-039's rule is the user's: Minimal where a template's layout-2 and -3 masters draw Music / Gigs /
About. Pop's layout-2 masters do, at 1440 and 768 (390 is the burger), so `navModeDefault` gains Pop
**at `d === 1` only** (its layout 3 is still a placeholder, whose pass adds `d === 2`) — session 0,
since it moves only the seeded header's mode. `vm.navFits` has **no Pop arm** at `d === 1` (Lime,
Grunge / Editorial and Retro have one): the header session sums one off this master's capsule
(219 × 34 at 1440; read the 768 one) with `titanEms`. `navGapEm` is 23/16 for Pop at every layout
today; read this capsule's gap and narrow it to layout 1 if it differs (Editorial's and Grunge's are
0 at `d >= 1`).

### 4. `plans/CONVENTIONS.md` — **the sweep folds this pass in**

Keep *Inherited and used* below, one line per bullet leaned on; the sweep adds a *Pop (layout 2)*
column on A, B, C and D2, and any row this pass leaned on three times that the file does not name.

## Session 0 — the data

Editorial layout 2's session 0, with a still smaller brief: **every mechanism exists**, so it is
data and one-word gates. It touches no section's layout code.

0. **Branch and plan** — done at planning time (`pop-layout-2`). With the dev server up, take the
   pass's "before" pictures at `theme=4&arch=1` for all eleven categories at all three widths
   (`node scripts/shots.mjs before 4 1 desktop`, then `tablet`, `mobile`) into the scratchpad.
1. **Ask decisions 1 and 2.** Nothing below depends on them.
2. **One commit, themes 0, 1, 2 and 3 at zero rows, canvas and live; theme 4 moves only in arch-1
   files** (and the header's arch 5, which folds onto it):
   - **`THEMES[4].schemes[5]` and `[8]`** from the table above, in `schemes[2]`'s shape, tags 3–7
     read off the file. The comment's "5, 8 and 9 … seat nothing at layout 1" gains layout 2.
   - **`SCHEMES_OF.Pop[1] = { media: 2, calendar: 2, form: 4 }`**, with a comment naming this
     page's nodes. Everything else stands on Scheme 1; the footer keeps row 0's 3.
   - **`editorialCard`** (the root's `(s.me || s.ca) && s.v1 && s.editorial`) widens to `(s.editorial
     || s.pop)`, so the root paints `vm.pageBg` (white) round the two lime cards. Its name now
     lies; the sweep decides whether to rename it (item 7).
   - **JP-094's `d === 1` pad arm** (`sectionVm`, the `inset` table) gains Pop. The planning walk
     read every row off Pop's roots and wrappers, and each is the twins' to the pixel:

     | | header | bio | media | gallery | pricing | calendar | map | testimonials |
     |---|---|---|---|---|---|---|---|---|
     | 1440 top / foot | 156 / 56 | 56 / 56 | 86 / 86 | 46 / 46 | 56 / 32 | 56 / 56 | 56 / 56 | 56 / 56 |
     | 768 | 100 / 60 | 60 / 60 | 60 / 60 | 30 / 46 | 60 / 60 | 56 / 56 | 60 / 60 | 60 / 60 |
     | 390 | 90 / 10 | 30 / 30 | 40 / 40 | 40 / 40 | 30 / 30 | 40 / 40 | 40 / 40 | 40 / 40 |

     (The header's top is `null` in the arm — its nav margin cancels it — and pricing's desktop
     foot too; the form's 60 / 60 / 40 is the root's own, as for the twins.)
   - **`navModeDefault`** gains Pop at `d === 1` (decision 3).
3. **Name what moved and why** in *Settled in session 0*, as Editorial's did: the flat `s.v1` arms
   now stand on the frames' grounds — the form's root blue, the media and calendar cards lime inside
   white — and their own readings (`paper`, `deep`, `pillBg`) will go wrong on them in ways their
   sessions fix. Expect `paperOf` on Scheme 4 to fall to Retro's `#FBF6EA` (no hue clears 0.6) and
   Scheme 2's `pillBg` to be pink.
4. **`preview.jsx`** needs nothing (its `Z` carries `dev`); confirm at all three widths that the
   form is blue and the media panel lime.

**Verification for session 0:** themes 0, 1, 2 and 3 at zero rows, canvas and live
(`node scripts/digest.mjs before 0,1,2,3` / `after`, then `EXTRA='&live=1'`); theme 4 filtered to
`_arch_0_` (**zero** — layout 1 must not move) and listed by category for the rest: media, calendar
and form for the seats, every arch-1 section for the pad arm, the header (arch 1 and 5) for
`navModeDefault`. Keep before / after shots of all eleven at all three widths.

## The header, and card 2

`HeaderV1`'s Lime block is where deliverable 3 is met.

- **The block widens at its head** to `(s.limeTree || s.pop)`, `const pop = s.pop`. Retro's half
  becomes unreachable under Pop; nothing in it needs deleting (above).
- **The header is on Scheme 1 — white — where Lime's and Grunge's are dark and Editorial's paper.**
  Every `s.*` the block reads resolves to white-page values; Editorial's arm (paper) is the nearer
  precedent. Three nested sites read `s.onScheme`: the **Enquire pill** on Scheme 3 (lime, pink
  label, a pink disc), the **place card** on Scheme 6 (trap 4: a pink fill, lime title, white body,
  a lime 2px ring named `scheme/3/stroke/2`) and the **Book pill** on Scheme 3 / 3 / 4 (trap 3),
  and **the Book pill alone** carries the `Retro/Poster` block — lime 5 / 5 at 1440 and 768, teal
  3.77 / 3.77 at 390 (a per-node effects read, not deduped, found no other effect in the header) —
  a hard offset shadow through the caller's `style` (CONVENTIONS C). Read `effects` per node, never
  off a deduplicated list.
- **What the frame draws** (desktop render; confirm each against the three twins' arms before
  inventing anything): the links Music / Gigs / About in pink in a **white capsule ringed 1px lime**
  (219 × 34; `scheme/1/stroke/2`); the wordmark pink, centred; Listen pink; the Book pill. An **oval
  photograph** (636 × 762, radius 430 — the hero `f70d25d3`, `FILL`) in an **8px lime INSIDE
  ring** on a black `box/3` well, where Lime's is a radius-50 card under a glow and Editorial's an
  arch; a **pink dot grid** (20 dots, 328 × 239) bleeding off its lower left; the **blue smiley
  sun** (`sem/tag/3/bg`, 154, Figma −25.37 → CSS +25.37) on its upper right — layout 1's bio
  sticker, `PopSun` and `PopDots`, reused at this frame's sizes; an outlined lime "● Available for
  bookings" chip with pink type; the **title one tone in violet** at `Display/LG` 82; the subtitle
  pink; the Enquire pill; the **face card** pill-tall (310 × 468, radius 999) on `box/1` ringed 2px
  pink round a 107 × 165 arch portrait (radius 110, ringed 1px lime), its title violet and body
  pink; the **place card** pill-tall beside it, its pin tile an outlined lime arch. No seal, no
  checker, no mount, no tilt. **768** puts the photograph on top as a 708-wide stadium with the
  sun at its top right (running 15 past the page — clip it), the identity block left, and the two
  cards stacked right, each a 60-radius card with its arch at the left; **390** is the burger
  capsule, the photograph a 370-wide stadium with an 85 sun on its lower right, and the cards
  full-width.
- **The 390 pill's label is Anton 12.07** (47 × 13) — decision 2: Pop's label face.
- **Decision 3's nav work**: `vm.navFits`' Pop arm and the capsule's gap. The 768 master draws
  Music / Gigs / About; the seeded nine fold to the burger.
- **`showBadge` and `badgeText`**: layout 1's sweep measured them `[0, 1, 3]` for Pop over
  placeholder card 2, which drew Retro's seal. This frame draws **no seal** — the sun carries no
  text. *Recommended:* the sun is decoration, drawn always, as the bio's and footer's suns are at
  layout 1, so both fields lose design 1 for Pop when `reach.mjs` re-measures.
- **Digest**: `HEADER_COUNT.pop` is 4, so header arch 5 folds onto arch 1 — **six** theme-4 files
  for any header change, the arch-5 ones byte-identical to arch 1.
- **In the builder** (`node scripts/page-check.mjs Pop 1,0,2,3` — card 2 first gets the full
  walk): the modal still shows four Pop cards; card 2 opens the editor on a page whose every section
  is arch 1 and the footer arch 0; publish, then every nav link scrolls, the burger opens at 390
  (and at 768 only when the seeded nine do not fit), Book Now reaches `#form`, and **the 768 page
  does not scroll sideways**.
- **`scripts/reach.mjs 4`** re-measures the header's Pop rows over the fitted card: subtitle,
  heroCta, availability, faceTitle, faceBody and placeBody `[1]`, cta2 `[1, 2]`, and the badge pair
  (above).

## Pop's layout-2 decorative language

Everything here is behind `s.pop`, the widened pair or a named arm, and replaces what the Lime block
gates on `s.lime`, Grunge's arms on `s.grunge` and Editorial's on `s.editorial`.

- **Rings, not dashes or glows.** Pop draws every card edge as a solid INSIDE stroke — an inset
  `boxShadow` (CONVENTIONS C, *a frame's inside stroke is an inset `boxShadow`*), never
  `DashRule`, and Lime's glows are gone. The weights are Pop's own and differ per node: 8 (the
  header photograph), 4 (the bio card, pricing's plan card), 3 (the testimonials' card and tiles),
  2 (the header's two cards), 1 (chips, capsules, the repertoire sheet, row rings). Read each.
- **Stickers, on the header alone**: the pink dot grid and the blue sun (above). No other section on
  this page carries a sticker, scribble, squiggle arrow or seal; the footer's seal and lime sun are
  layout 1's.
- **The leant plan card**: pricing's `right` on Scheme 7 turns **−3° at 1440 and 768 and −1° at
  390** (Figma → CSS +3 / +1). Layout 1's pricing seat is the precedent for a leant Pop card;
  read the auto-layout's spacing against the rotated box per master (CONVENTIONS A, *Figma
  auto-layout spaces a rotated child by its rotated bounding box*) and check the 390 page for the
  turned corners' overflow.
- **The fan** keeps the twins' angles (`k * 5.33`); its five cards each stand on their own scheme
  (6 / 3 / 5 / 4 / 2) — read their fills and opacities (the render reads them translucent).
- **The list rows are pill-shaped**, each on its own scheme (3 / 4 / 5 / 7 / 8) with a ring and a
  ringed cover disc.
- **Effects**, every one read off the nodes (`DROP_SHADOW`), and **no other effect on any master**:
  - the **nav's Book pill**: lime 5 / 5, blur 0, at 1440 and 768; **teal 3.77 / 3.77 at 390**;
  - the **bio's Book pill**: teal 5 / 5 at **all three widths** (Editorial's was narrow only);
  - the **bio's photo card**: soft, 1.25 / 1.25, blur 10.81, black 16%, at all three widths — the
    twins' own;
  - the **calendar's foot pill**: pink 5 / 5, at all three widths.
- **Radii** are Pop's: the photograph 430, the header cards 999 at 1440 and 60 narrow, the panels
  50 / 30 / 30, the calendar card 50, the bio card 30, the mount 26 and photo 21, pricing's card 50,
  the testimonials' card 50 and tiles 31, the Enquire pills 67. Read each per master.
- **Type**: every display and label string uppercase at its own site, in Titan One through `faced`
  (`faceK` 0.98 — not the identity), **never with a `fontWeight`** (Titan One has one weight; layout
  1, *What session 0 settled*). Every head on this page is **one tone** and every size the ramp's —
  no hand-scaled display string outside the footer, which is layout 1's.
- **No texture**, as at layout 1.

## Photography

Every photograph this page draws in its own right is **already seeded** (`SEEDS.Pop` in
`photos.js`); no export is owed. Image hashes, read off the 1440 frame (each session confirms its
narrow two):

| Section | Slot (frame box) | Hash | Seeded | Verdict |
|---|---|---|---|---|
| header | the oval 636 × 762 | `f70d25d3` (`FILL`) | `popHero` | ✓ |
| header | the face card's portrait 107 × 165 | **`e3790c2c` — Lime's colour avatar** | `POP_HEADER_AVATAR` (`0b079033`) | **a placeholder leak**, Grunge's layout-2 one: the component's default picture through a Pop instance. Keep the seed; named departure |
| bio | photo 425 × 640 | `51d06990` | `POP_PHOTOS.bio` (`popStage`) | ✓ |
| media | five covers | `21e9622c` `40041573` `b737c3e0` `4e7cc529` `8c7fa7d8` | `ROW_ART.media` | ✓ the shared five |
| gallery | hero 784 × 583 | `b3a33296` | `popGallery4`, `galActive()`'s slot | ✓ |
| gallery | six tiles | Retro's strip (`b35b6507`, `b073b46f`, `8f69a4a6`, `35ae28b9`, `3f0c98b4`) | the shoot's other six | **layout 1's departure again**: the frame's strip is a placeholder; the seeds stand |
| pricing | three 28² `av` | Retro's reviewers (`fbe69d03`, `ef14e35b`, `2de917bf`) | `REVIEWERS` | ✓ |
| map | raster 588 × 471 | `e089bd11` | `vm.mapSrc` | ✓ — read the plate and blend, Lime's again |
| form | stage photo 838 × 437 | `f70d25d3`, the hero | `photo` = `popHero` | ✓ (layout 1's session 0 seeded it for this frame) |
| form | credit avatar 48 | **`f821adc2` — Lime's colour avatar** | `POP_PHOTOS.form` (`popAvatar`, `59099150`) | **a placeholder leak**, Grunge's and Editorial's second; keep the seed |

## What already renders, and the traps in it

A code survey at planning time (every `s.limeTree` gate mapped to its enclosing branch; every
`T.name ===` in `sectionVm` read):

- **`HeaderV1` renders Retro's half** under Pop — layout 1's card-2 placeholder (its open question
  8): the place card black under `pillBg`, the desktop links wrapping, `SealBadge`'s Pop arm.
- **Every other `s.v1` branch renders Retro's arm under Pop**, flat: no layout-2 site reads `s.pop`
  anywhere. So goal 1 is met before any session runs (every control is shared `v1` code), and each
  session still runs `theme=4&live=1` for layout 1's two reasons: a decoration can cover a control,
  and a live **state** can stop reading — here colour on colour, with Scheme 1's active pair black
  and idle pair lime (trap 3 of layout 1) and the controls standing on white, lime, pink, coral and
  blue.
- **The shared helpers layout 1 widened are already on here**, drawn inside Retro's arms:
  `BookPill`'s Lime branch, `Pager`'s Lime branch, `TagChips`' padding, `labelStyle`'s tracking,
  `LogoMark`'s globe, `NavBar`'s capsule. What a widened block passes them is each session's; expect
  a session's theme-4 digest to move only its own category.
- **`sectionVm`'s layout-2 arms**: `navModeDefault` and `vm.navFits` (decision 3), `navGapEm` (Pop's
  23/16 at every layout), JP-094's pad arm (session 0), `vm.titleWordEms` (already Pop's
  `titanEms`), and the testimonials' `TESTI_HEADING_2` fallback at `d === 1` (every template's). The
  `d === 2` arms are **layout 3's**; leave them.
- **`FIELDS` rows keyed by template**: the header's Pop row (re-measured by the header session),
  `FIELDS.media.countLabel`'s `Pop: [1, 2]` (this frame draws "5 FEATURED / 5 MAX" — confirm), and
  `FIELDS.calendar.heading`'s `Pop: [0, 1, 2, 3]`. Each session re-measures the rows its category
  owns with `scripts/reach.mjs 4` after fitting.
- **`deep` / `mapBg` are violet under Scheme 1**; the Lime block reads neither — its raster sits on
  Lime's own plate, a literal. Read the viewport's plate off the frame (Scheme 3's `sem/bg` is pink;
  the render is the twins' dark olive).
- **`onScheme` is defined under Pop** (layout 1's session 0), so every Editorial `s.onScheme[n]`
  read in a widened block works under Pop once Schemes 5 and 8 exist.

## Per-session procedure

[`../lime/layout-2.md`](../lime/layout-2.md)'s *Per-session procedure*, steps 1–9, with:

- step 2: session 0's (above), not the header's.
- step 3: `get_metadata` on the three Pop nodes and the Lime and Editorial desktop nodes, then the
  paired diff walk (CONVENTIONS A) against Editorial's — **by traversal order and
  case-insensitively**.
- step 4: `get_variable_defs` on all three nodes (it works here — the page is bound), and **one
  `explicitVariableModes` walk per master** (trap 3: a nested scheme can move by width). Then the
  node walker (Grunge layout 2, *Conventions*) with per-side stroke weights, radii, rotations,
  effects and **bound-variable names with their collection** (trap 5) — and its raw paints listed
  separately, since on this page each is a leak (decision 2).
- step 5: widen the section's **Lime layout-2 block** at the placement the sections table names to
  `(s.limeTree || s.pop)`, `const pop = s.pop`, reading its **Editorial** arm first (the light page
  and `s.onScheme`), then Grunge's; a fourth arm in `G` where the block has one, new leaves falling
  back through `??`. Never edit a Retro, Lime, Grunge or Editorial literal to make Pop look right.
  Desktop numbers × 0.82, 768 and 390 verbatim; every display string uppercase at its site,
  through `faced`.
- step 6: the harness is `preview.html?cat=<cat>&arch=1&theme=4&w=desktop|tablet|mobile` (pass
  `arch=1`); function at `theme=4&live=1`; **zero rows at themes 0, 1, 2 and 3** before and after,
  every session (`node scripts/digest.mjs before 0,1,2,3` / `after`, then `cmp`); then theme 4,
  where every differing file must be this section's category at arch 1 (the header: arch 1 and arch
  5). **A theme-4 diff in any `arch_0` file — or in the header's `arch_4`, which folds onto design 0
  — is a layout-1 regression.**
- step 9's hand-off prompt:

  ```
  Continue the Pop layout-2 pass with section N, `cat`.

  Read CLAUDE.md, then plans/pop/layout-2.md, then the Conventions and Settled in session 0 of
  plans/pop/layout-1.md and plans/editorial/layout-2.md, then plans/CONVENTIONS.md (groups A, B,
  C and D2), then this section's Settled notes in plans/lime/layout-2.md, plans/grunge/layout-2.md
  and plans/editorial/layout-2.md (and its entries in the three layout-2 QA batches:
  plans/lime/layout-2-qa-fixes.md, plans/grunge/layout-2-qa-fixes.md,
  plans/editorial/layout-2-qa-fixes.md), then the Conventions and narrow-masters notes of
  plans/retro/layout-2.md, then the `figma-frame-reading`, `verifying-the-published-tab` and
  `browser-tool-choice` memory notes, and follow the per-session procedure.

  The three Pop masters are `<desktop node>` (<W> × <H>), `<tablet node>` (768 × <H>) and
  `<mobile node>` (390 × <H>) in Figma file uFoUbPaBrDicjyuSBEbtGT, page 964:58572, on Scheme
  <N> (nested: <…>); the Lime twin is `<lime node>` and the Editorial twin `<editorial node>`.
  This page is bound — read the variables; a raw hex is a leak. Widen the Lime block <placement>
  of `<Component>` in EncoreSection.jsx to `(s.limeTree || s.pop)`, Pop's deltas behind `s.pop`,
  reading its Editorial arm first. Themes 0, 1, 2 and 3 must digest to zero rows, and theme 4 may
  differ only in `<cat>` arch 1.

  <the two or three conventions most likely to bite this section>

  Branch: pop-layout-2. Do not refresh the root index.html.
  ```

Do **not** refresh the root `index.html` per section; it is the sweep's last step, with the
two-build digest. The seeded `EXAMPLE_PAGE` is arch 0 throughout, so the page walk will show no
difference at any theme; the proof that this pass shipped is card 2 in both builds' setup modals
(`build-digest.mjs`'s `CARD=1`).

## The end-of-pass sweep

Written now from what the plan can see; the sections add to it. One session, in this order:

1. **CLAUDE.md, README.md and `notes/`**, wherever they describe Pop as designed at layout 1 only,
   or a layout-2 state as Lime's, Grunge's and Editorial's alone. The known sites: the `s.pop` flag
   comment in `sectionVm` ("Pop at layout 1 so far"); the per-section scheme paragraph (`SCHEMES_OF.Pop`
   gains a row, `THEMES[4]` Schemes 5 and 8, `editorialCard`'s reach); `navModeDefault`'s sentence
   (Minimal at layout 2 of five templates); the JP-094 pad sentence ("the three templates whose pages
   are Lime's tree"); every layout-2 paragraph naming a Lime-and-twins state (the calendar's dimmed
   row, the form's refused ring, the map's compact pager and raster plate, the testimonials' tile)
   owes a Pop clause where its session found the same or another. Grep for "layout 2", "Pop" and
   "placeholder".
2. **One whole-page published check under Pop at layout 2** — `node scripts/page-check.mjs Pop
   1,0,2,3` — then 180px seam clips at every band edge at 1440 and 390 (the media `Section`'s lime
   rules, the repertoire sheet's ring, pricing's narrow ring, the blue form band into the white
   testimonials, the testimonials into the pink footer); **`overflow` 0 at 768 and 390** (the
   header's sun, the leant plan card).
3. **The layout-picker thumbnails** for arch 1 under Pop (deliverable 4).
4. **The other three header cards** still render and publish; cards 3 and 4 stay placeholders,
   each its own pass's (layout 1, open question 8).
5. **`scripts/reach.mjs 4`** over the whole template; the header's Pop row re-measured over the
   fitted card 2.
6. **Every `(s.limeTree || s.pop)` and every `s.limeTree` left in layout-2 code**, listed with why
   Pop does or does not share it — beside layout 1's sixteen. The fold (decision 1) is still the
   family's last pass's.
7. **`editorialCard`**: widened to Pop in session 0, so its name lies. Rename it (`cardOnPage`, or
   what reads best) if the five-theme digest stays at zero, or leave it named and commented.
8. **`plans/README.md`**: mark the pass closed; **`CONVENTIONS.md`** (decision 4).
9. **Notes for the designer**, gathered from the open questions, Editorial layout 2's shape.
10. **Refresh the root `index.html`** with the two-build digest (`CARD=1`, reduced motion on — the
    footer's seal spins): zero rows at every theme on the seeded page; the shipped-it tell is card 2
    in the two builds' setup modals (the old one's Retro composition with its black place card and
    seal; the new one's oval photograph, sun and pill-tall cards).

## Conventions

Append as the pass goes. Do not repeat layout 1's, Editorial's, Lime's, Grunge's or Retro's
bullets; name them.

- **Layout 1's conventions all hold**: the gates are `s.pop`, the widened pair, the named pairs and
  `s.designed`; never edit another template's literal; uppercase per site, through `faced`, with no
  `fontWeight` on Titan One; themes 0, 1, 2 and 3 at zero rows.
- **Body copy is `s.tx` here, not `s.text3`** — layout 1's reflex turned round (*Pop's layout-2
  mode*, trap 4): this page binds body copy to `sem/text/2`, violet; read `s.text3` only where a
  node binds `text/3` (the place card's body, the form's promises and credit).
- **Harness:** `theme=4`, `arch=1`, and every width — a nested scheme moves between them.
- **Read the variables; a raw hex is a leak.** Turned round from layout 1: this page's variants
  are bound, so `get_variable_defs` and `boundVariables` are the source, and the node walker's raw
  paints are the leak list (decision 2).
- **Read a scheme per master, never per section** (Editorial layout 2): the header's Book pill is
  Scheme 3 at 1440 and 768 and Scheme 4 at 390.
- **Diff by traversal order and case-insensitively, never by id**: each template is its own
  variant, and Pop types its display strings in capitals (all but one, decision 2).
- **Every head on this page is one tone and on the ramp.**

### Seen at planning time, per section

From the renders and the planning walk — impressions to confirm, not measurements. Where Editorial's
paper sections broke the twins' dark-ground assumptions (its trap 6), Pop's white ones do the same,
and its **lime** cards add a third ground the twins never had.

1. **header** — see *The header, and card 2*.
2. **bio** — Scheme 1: a `box/1` card ringed **4px pink** (radius 30) holding an outlined lime
   "/FEATURED" pill in violet, the paragraph in violet (`Body/LG`), the five tag chips in hand-scaled
   Chakra Petch on Scheme 1's tag seats 1–5 (lime, pink, blue, teal, violet — *Default, Sold Out,
   New Release, Archive, Live*) with their own inks, the credit row ("five years of" pink, the rest
   violet) and a **nested Scheme 4** Book pill (blue, teal label and disc, a teal 5 / 5 block);
   beside it a **pink mount** (433 × 648, radius 26) under the soft shadow, the photograph (radius
   21) on a violet well, and a `box/1` name plate (radius 9) with "KAI MERCER DJ" in violet and a
   lime disc. At 768 the card above the mount; at 390 the same, the Book pill under the credit.
3. **media** — the lime panel on white, with the **5px lime rules** on the desktop `Section`'s top
   and foot: the head (decision 2's item: violet capitals at 1440, pink mixed narrow, two lines at
   82); the fan's five cards each on its scheme (the centre one lime with a pink "● Featured" tab);
   the bar a **pill outlined violet** with a violet transport, the sleeve disc and the title in
   Titan; "● POPULAR" and "5 FEATURED / 5 MAX" violet; five **pill-shaped rows** on Schemes 3 / 4 /
   5 / 7 / 8, each ringed (blue on pink, teal on blue, yellow on teal, violet on red, pink on
   yellow — read each), numerals, titles in Titan and times in each row's inks, the covers in ringed
   discs. At 390 the bar's title and byline and the rows' titles run off the master (open question 6).
4. **repertoire** — a full-bleed grey `box/1` sheet ringed 1px pink on Scheme 1: "REPERTOIRE" at
   `Display/SM` 36 violet; the toggle a capsule ringed pink with a pink "Wedding" pill; the search
   a pill ringed pink; two columns of rows ruled pink, numerals, titles at `Display/List` 20 violet,
   artists violet; the pager lime arrow pills, a **pink current pill** and violet page pills —
   **Pop's frame marks the current page** (follow it, as layout 1 did) — with Anton numerals
   (decision 2). Lime's leaked hexes are somewhere here: find where they show.
5. **gallery** — white: the hero (784 × 583) ringed lime, the masonry tiles ringed pink on black
   `box/3` wells, a lime caption chip ("MTV 'MOOD SWING' FEATURED REEL") in violet `Body/Chip`. 768
   adds the head row ("Gallery", "View list ✕" — JP-098's `railLabel`); 390 is the hero over ten
   small tiles.
6. **pricing** — white (ringed 1px pink at 768 and 390 only): "[ PRICING ]" violet, the head at
   `Display/MD` 45 **pink**, two lines, the review quote violet with three ringed avatars, pink
   stars and "32 reviews · 4.9"; the **coral plan card** (Scheme 7's `box/1`, ringed 4px lime,
   radius 50) **leant −3°** (−1° at 390): a yellow "Per event" chip and an outlined "Custom brief"
   one, the name violet, the price lime beside a violet "£", "— £2,200/event" violet, a lime
   Enquire pill with a red disc, "3 dates open for Sept '26", a lime divider, "WHAT'S INCLUDED" and
   the features in Chakra Petch violet behind yellow `+`s; the small print violet bold. The
   render's lime price on coral is the frame's; read its legibility (layout 1's open question 10
   was lime on white).
7. **calendar** — the lime card (radius 50) on white under a **pink head band**: "Book Kai®", the
   flow list and the head ("FIND A DATE THAT WORKS FOR YOUR EVENT", `Display/MD` 45) lime; column
   heads "Date ↓" / "Availability ↓" pink; rows ruled violet; the slot marks at `Display/LG` 82 —
   **teal (`sem/media`), violet, pink, pink** — beside the weekday in Chakra Petch and the slot and
   price right; the foot's pink "JUN 12" chip, the violet line, and a **violet "STAR ENQUIRY" pill**
   with a lime label and disc over the pink 5 / 5 block. The frame's own typo, "Star", is the twins'
   too (Editorial noted it); the seed is the block's.
8. **map** — white: the travel card **pink (Scheme 3)**, ringed violet, with "Travel radius", "VENUE
   DISTANCE", an outlined "● Confirmed" chip, the home and venue columns, the route line, the stat
   row, a lime Venue Link pill with a pink disc and an outlined lime Get Directions; "Other upcoming
   · 4" violet over four **grey rows ringed pink**, pill-shaped, the venue at `Display/Title` 28
   violet with an outlined pink "In transit" chip; the map card **lime (Scheme 2)** with a pink "●
   IN TRANSIT" chip, "PRIVATE WEDDING" violet, the viewport **(Scheme 3)** dark with pink rings, pink
   ring labels and pink zoom buttons, "EXPAND VIEW". The ring labels run past the 768 and 390
   viewports, clipped.
9. **form** — a full-bleed **blue band (Scheme 4)** at every width: the stage photograph ringed
   teal; the head teal, one tone, at `Display/SM` 36; the promises white behind lime ✓s; the credit
   (the leaked avatar, the name in white display, "DJ · Live band" white); the sidebar card **lime
   (Scheme 2)**: "£1,200" pink with "from / event" violet, pink stars and "42 bookings", three
   **pill boxes ringed violet** with violet labels in the display face at `Label/SM` 16, the **pink**
   Check Availability pill (Scheme 2's `pillBg`) with a lime label and disc, "No charge to enquire"
   violet. The four label-in-box inputs set `--ph: 1` (JP-093).
10. **testimonials** — white: "✎ What clients say" violet; the head at **`Display/XL` 125** violet,
    one tone (above); the sub violet; the rail's three tiles `box/1` ringed 3px pink (radius 31),
    the picked one **pink (Scheme 3)** ringed violet; the big card **lime (Scheme 2)** ringed 3px
    violet (radius 50) with violet quote marks, quote, name, role and stars; a **black Book pill**
    (Scheme 1's `active/bg`) with a white disc. At 390 the rail stands under the card as a row, and
    the sub is a 411-wide no-wrap line clipped by the root (open question 6).

### Settled in session 0 (the data)

- **Decisions 1 and 2 are the recommendations** (user call, 2026-10-05): the pair `(s.limeTree ||
  s.pop)` per site, each section widening its own block; and on this bound page a raw hex is a
  leak judged per site by CONVENTIONS A, Anton set in Pop's label face, a hand-scaled instance not
  the ramp. The media head's case and ink stay the media session's. One commit, data and one-word
  gates; no section's layout code moved.
- **Schemes 5 and 8 are the plan's table, cell for cell**, read with one `use_figma` walk of every
  `2 · Scheme` colour variable, each alias resolved through `1 · Primitives` → Pop. **Scheme 2 was
  the positive control**: the same walk gave `schemes[2]`'s every key, tags 1–7 and their inks
  included. Tags 3–7, which the table left out: Scheme 5 `#FFF600` / `#C6F200` / `#FF2DA0` /
  `#2563FF` / `#FFFFFF`, inked `#000000` / `#141414` / `#F6F0E8` / `#F6F0E8` / `#000000`; Scheme 8
  `#2563FF` / `#00E0C4` / `#6B2CFF` / `#FF1A1A` / `#FFFFFF`, inked `#F6F0E8` / `#000000` /
  `#F6F0E8` / `#F6F0E8` / `#000000`. **`hl` is `sem/box/1/text`**: `#000000` under Scheme 5, where
  every other Pop scheme's is `#141414` or `#FFFFFF`. Both entries carry `schemes[2]`'s fourteen
  `sem` keys and seven-long `tags` / `tagFg` (checked in Node), since `flatScheme()` runs over every
  entry for every Pop render, layout 1's included. Scheme 9 still seats nothing.
- **`SCHEMES_OF.Pop[1] = { media: 2, calendar: 2, form: 4 }`**, with no footer entry (row 0's 3,
  pink, at every page); `editorialCard` widened to `(s.editorial || s.pop)`, its comment naming
  Pop's two cards and the rename left to the sweep; Pop joined JP-094's `d === 1` arm on the
  twins' table unchanged; `navModeDefault` gained its own clause, `(themeName === 'Pop' && d ===
  1)`, so Pop is Minimal at layout 2 alone (Node: `smss` over designs 0–3, the four others `smms`).
- **Digest: themes 0, 1, 2 and 3 at zero rows, canvas and live** (660 + 660 renders each side,
  no one-row file in any label). **Theme 4 moved 30 files, canvas and live alike**, every one
  arch 1 at all three widths: header (and **arch 5, byte-identical to arch 1** at each width), bio,
  media, gallery, pricing, calendar, map, testimonials and form. **No `_arch_0_` file moved, nor the
  header's arch 4**, so layout 1 is untouched; **the repertoire and the footer (`&page=2` too) did
  not move**, as neither has a seat or an inset row. Why each moved:
  - **The pad arm** — header, bio, media, gallery, pricing, calendar, map and testimonials, the
    root's height alone at most widths (the 1440 bio 691 → 623, gallery 638 → 553, testimonials 669
    → 601; at 768 most grow by 8, `padY` 56 to the frame's 60). The calendar at 768 kept its height,
    the frame's 56 being `padY`'s, and moved six colour rows only (the seat below).
  - **`navModeDefault`** — the 1440 header lost six rows: Retro's placeholder bar draws Music /
    Gigs / About where it wrapped nine links onto two rows. At 768 and 390 the bar is the burger
    either way, so only the foot moved.
  - **The seats** — media and the calendar are lime (`#C6F200`) cards in white roots
    (`vm.pageBg`), inset by the frames' own numbers (45.9 · 70.5 at 1440, 30 · 60 / 10 · 40 media
    and 30 · 56 / 10 · 40 calendar narrow); the form's root is blue (`#2563FF`) at every width.
    **`preview.jsx` needed nothing**: its `Z` carries `dev`.
- **What the pictures show** (`shots.mjs` before / after, all eleven at all three widths, in the
  session scratchpad) differs from the root rows in the two places Editorial's did, for its reason —
  **the flat `s.v1` arms paint full-size sheets and read their own keys on the new ground**:
  - **The form reads teal, not blue**: its flat sheet is `ground = s.pillBg`, Scheme 4's `activeBg`
    `#00E0C4` (black, Scheme 1's, before); the blue root shows nowhere. Its card turned yellow and
    its submit stayed violet. **Step 3's `paperOf` prediction was wrong**: Scheme 4's `tx` is
    `#FFF600`, which clears 0.6, so `paper` there is that yellow, not Retro's `#FBF6EA` — the card's
    yellow is `paper`.
  - **The media list's rows and the fan re-inked on lime** (the teal and blue rows went violet and
    teal), and **the calendar's foot pill turned pink** with a lime label — Scheme 2's `pillBg`, as
    the plan foresaw (trap 6). Its head band stayed pink.
  - **The header's checker ribbon dropped off the root.** Retro's placeholder half hangs it
    `bleedTo(s, 'bottom')` — `padY` below its container — and the pad arm made the foot the frame's
    45.9 / 60 / 10, so the ribbon now sits under the root, past the shot and the digest. Retro's half
    is unreachable under Pop once the header session widens the block, so it is named, not chased.
  None of it is chased here; each section's widened block replaces the flat arm it stands on.
- **For the sweep's CLAUDE.md pass**: the per-section scheme paragraph (`SCHEMES_OF.Pop` gains row
  1, `THEMES[4]` Schemes 5 and 8, `editorialCard`'s reach), `navModeDefault`'s sentence and the
  JP-094 comment's "Pop's included" — the code comments are written, the docs are not.

### Inherited and used

*(The running list the sweep folds into [`../CONVENTIONS.md`](../CONVENTIONS.md): each time a
session leans on a bullet from Pop layout 1's, Editorial's, Lime's, Grunge's or Retro's
Conventions, name it here in one line, with the plan it came from, a blank line between sessions.)*

- Session 0: *the digest is committed* (lime/layout-1) — 1320 renders a side, five themes, canvas
  and live; *a section's colour scheme is resolved in `sectionVm`* (editorial/layout-1) and *a card
  on another scheme reads that scheme's keys* (editorial/layout-2) — Schemes 5 and 8, row 1 and
  `pageBg` round the two lime cards, data only.

## Open questions

1. ~~**Decision 1** — the gate, `(s.limeTree || s.pop)` per site.~~ *Settled in session 0: the
   pair per site (user call, 2026-10-05).*
2. **Decision 2** — leaks on a bound page, and the media head's case and ink. *The rule settled in
   session 0 (user call, 2026-10-05); the media session settles the head.*
3. **The header's face-card portrait and the form's credit avatar** are Lime's `e3790c2c` and
   `f821adc2`, the components' default pictures through Pop instances; the seeds stand. Worth
   telling the designer, with Grunge's and Editorial's.
4. **The gallery strip** repeats Retro's placeholder thumbnails again; the seeds stand (layout 1,
   open question 6). Worth telling the designer with it.
5. **`showBadge` / `badgeText` at layout 2** — the frame draws a sun, not a seal; recommended
   decoration, drawn always (*The header, and card 2*). The header session settles it.
6. **The narrow masters' leaks**, each for its session to follow or override:
   - the 768 header's sun, 15 past the page (the reason the 768 page renders 783 wide);
   - the 390 bio's chip row, a no-wrap row to 667 (the 390 page's 667);
   - the 390 header pill's label in Anton 12.07;
   - the 390 media bar's title and byline and the list's titles, past the master;
   - the map's ring labels past the 768 and 390 viewports, clipped;
   - the 390 testimonials' sub, a 411-wide no-wrap line.
7. **Header cards 3 and 4** stay placeholders (layout 1, open question 8): card 3's Pop frame stands
   on Scheme 1 at 1440 and **Scheme 6 at 768 and 390**, card 4's on Scheme 3. Each is its own pass's.
8. **The footer** is layout 1's, closed at planning time: the desktop instance's main component
   (`446:8697`) is not layout 1's (`907:12019`), but the trees are identical.
9. **The repertoire's leaks** — Lime's `#AFE335` × 4 and `#F2FFD0` × 2, Retro's `#FBF6EA`, two raw
   violets and Anton numerals in an otherwise bound variant, the same nodes at all three widths.
   Worth telling the designer once the session has found where they show.
