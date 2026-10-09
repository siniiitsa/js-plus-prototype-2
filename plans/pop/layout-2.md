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
- **The 390 page renders 667 wide**: the bio's ~~chip row~~ **credit box** (`Frame 6`, 637.5 × 39 at x 30) is a
  no-wrap row running to 667, Editorial's leak again (its open question 7). *Corrected in section 2*: the
  chips wrap at the Tags instance's 264.4; the block follows the credit box as a `minHeight` only.

Inside a root, clipped by it (each its session's to read): the 390 media titles and bar byline (to
x 471), the map's ring labels past the 768 and 390 viewports (to 866 / 480), and the 390
testimonials' sub, a no-wrap line to 411 (*section 10*: 431 wide at x −20.5; it wraps).

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
| 1 | `header` | `964:64561` | 1440 × 974 | `986:17563` | 768 × 1024 | `986:17582` | 390 × 994 | 1 (Enquire pill **3**, place card **6**, Book pill **3 / 3 / 4**) | `964:64580` | `964:64599` | `if (s.limeTree) { … return }` at the head of `HeaderV1` | **done** `5bc12c1` |
| 2 | `bio` | `964:64562` | 1440 × 760 | `986:17564` | 768 × 1138.8 | `986:17583` | 390 × 881.3 | 1 (Book pill **4**) | `964:64581` | `964:64600` | `if (s.v1 && s.limeTree)` ahead of `Bio`'s `if (s.v1)` | **done** `3de6182` |
| 3 | `media` | `964:64563` *(Section; panel `964:64564`)* | 1440 × 965 | `986:17565` *(Frame 299; `986:17566`)* | 768 × 1541 | `986:17584` *(Frame 299; `986:17585`)* | 390 × 1420 | page 1, **panel 2** (fan cards 6 / 3 / 5 / 4 / 2, list rows 3 / 4 / 5 / 7 / 8) | `964:64582` | `964:64601` | inside `Media`'s `if (s.v1)`, after `nowArt` | **done** `5e8ea24` |
| 4 | `repertoire` | `964:64570` | 1440 × 792 | `986:17572` | 768 × 792 | `986:17591` | 390 × 594 | 1 (a `box/1` sheet) | `964:64589` | `964:64608` | inside `Repertoire`'s `if (s.v1)`, after `pageWindow()` | **done** `4e6c51f` |
| 5 | `gallery` | `964:64571` | 1440 × 675 | `986:17573` | 768 × 468 | `986:17592` | 390 × 364 | 1 | `964:64590` | `964:64609` | **no block** — `s.limeTree` reads and `(s.lime \|\| grunge)` / `ed` ternaries through `Gallery`'s `if (s.v1)` | **done** `d8a361e` |
| 6 | `pricing` | `964:64572` | 1440 × 719.7 | `986:17574` | 768 × 926.4 | `986:17593` | 390 × 841.4 | 1 (the plan card **7**, leant −3 / −3 / −1) | `964:64591` | `964:64610` | inside `Pricing`'s `if (s.v1)`, after `sel` / `t` | **done** `fb84f5b` |
| 7 | `calendar` | `964:64574` *(in `964:64573`)* | 1328 × 842 *(1440 × 954)* | `986:17576` *(in `986:17575`)* | 708 × 705 *(817)* | `986:17595` *(in `986:17594`)* | 370 × 698 *(778)* | page 1, **card 2** | `964:64593` | `964:64612` | inside `Calendar`'s `if (s.v1)`, after `want` / `hit` / `cur` / `line` | **done** `a204ba6` |
| 8 | `map` | `964:64575` | 1440 × 808 | `986:17577` | 768 × 823 | `986:17596` | 390 × 1286 | 1 (travel card **3**, map card **2**, viewport **3**) | `964:64594` | `964:64613` | inside `EventsMap`'s `if (s.v1)`, after `stats` | **done** `9567812` |
| 9 | `form` | `964:64576` | 1440 × 784 | `986:17578` | 768 × 856 | `986:17597` | 390 × 910 | **4** (sidebar card **2**) | `964:64595` | `964:64614` | `if (s.v1 && s.limeTree)` ahead of `EnquiryForm`'s `if (s.v1)` | **done** `58b37a8` |
| 10 | `testimonials` | `964:64577` | 1440 × 762.9 | `986:17579` | 768 × 730 | `986:17598` | 390 × 842 | 1 (big card **2**, picked tile **3**) | `964:64596` | `964:64615` | inside `Testimonials`' `if (s.v1)`, after `rail` | **done** `ab1ba50` |
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
- ~~**The testimonials' head is `Display/XL` 125** ("HONEST FEEDBACK / FROM PEOPLE WHO BOOKED", two
  lines at 1440 and 768, three at 390) — every twin's is `Display/LG`. Check it against its column
  before choosing (CONVENTIONS C, *a head that must fit its measure*; `titanEms` already serves
  Pop's quote and footer fits).~~ *Corrected in section 10*: the head is `Display/LG` 82 / 51 / 36,
  the twins' token, on all three masters; the 125 / 75 / 46 is the quote glyph's `Display/XL`.
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
   row — *section 7: CLAUDE.md carries none; `notes/calendar.md` is done* — the form's refused ring, the map's compact pager and raster plate, the testimonials' tile)
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
- **`Pager`'s Pop arm is layout 1's Scheme 6 seat; a layout-2 caller passes `frame.lime`** (section
  4): its defaults (`POP_REP.pill` pages, `s.ac` ends, an `s.bg` arrow, `s.tx` current page) read
  wrong on Scheme 1, and changing them moves layout 1's map a2. Read the pager's bindings off the
  master and pass all seven keys, Editorial's route — the map's layout-2 pager is the next caller.
- **The 0.14em head lift holds at lh 1 too** (section 4: measured, 0.13–0.16em at three widths),
  so the glyph floor is Titan's metrics, not the line height; the lh-1.2 list titles sit only
  ~1px low and are left. Scan each head all the same.
- **Pop's rings are thick, so a twin's border can stop being invisible** (section 5): a 1px
  CSS border insets nothing anyone sees, but the 5px one moves anything positioned off the
  padding box (the gallery's caption) and shrinks a cover box. Where a child is placed by the
  frame's offset from the outer edge, draw the ring as an overlay; where the border drops a
  side, keep it. And an accent state inside an accent ring vanishes, so read every twin's `s.ac`
  state against Pop's edge before inheriting it.
- **A frame's anchor for its own seed binds that slot, not the seat** (section 5): sweep it, and
  then picture every other seed in the seat. Where the frame's anchor costs another seed its
  face, key it to the slot (`active === home`).
- **A followed state's paint is read whole, label included** (section 6): pricing's picked chip
  is Editorial's visible pick, but Pop's binds the idle chips' lime on its yellow fill, 1.15 : 1
  in the frame's own render. The fill and ring are followed; the label took the fill's own ink
  (user call). Read every leaf of a state the plan calls "followed" before following it.
- **A leant card whose master spaces it by its rotated box turns in a slot wrapper** (section 6):
  a flex column taking the slot, the card inside it with `rotate(θ)` and `w·sin θ / 2` of
  vertical margin as a percentage (which resolves against the wrapper's width, the card's). The
  grid row then measures the rotated box's height at any content height; check the published
  page's `scrollWidth` before reaching for a clip.
- **A control no master of the section draws takes the one this page draws** (section 8): the
  map's layout-2 pager is drawn by no Pop map master, and `Pager`'s Pop arm is another page's
  seat, so the block passes the repertoire's layout-2 `frame.lime` — the same page, the same
  Scheme 1. Prove it at `n=30`: the seed is one page and draws no pager.
- **Lift the label, never the ring** (section 8): where a Titan string is a ringed element's own
  text (Get Directions), `top: -0.14em` on the element moves the ring with it; wrap the label in
  a span under `pop` and lift that.
- **A card on another scheme is that scheme's binding, not always its ground** (section 9):
  read the card's fill before writing `S.bg`. The form's Scheme 2 card binds `box/1` `#D7FF23`,
  one shade off `sem/bg` `#C6F200`, and its pill's label and disc bind `sem/bg` outright, so both
  limes are drawn. The testimonials' big card is the next Scheme 2 card.
- **A plan's token for a string is read off that string's own text style** (section 10): the
  planning walk gave the testimonials' head `Display/XL` 125, which is the quote glyph's style in
  the same section; the h2 is `Display/LG`, the twins' token. Read the style name on the node
  before sizing or fitting anything off a plan's number.

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
10. **testimonials** — white: "✎ What clients say" violet; the head at ~~**`Display/XL` 125**~~
    **`Display/LG` 82** (*section 10*) violet, one tone (above); the sub violet; the rail's three tiles `box/1` ringed 3px pink (radius 31),
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

### Settled in section 1 (the header)

- **The block widened at its head: `if (s.limeTree || s.pop) { … return }`, `const pop = s.pop`**
  (about twenty arms, no `G`). The tree is the twins' node for node at all three widths, on
  **Scheme 1 with no Device override** (`resolvedVariableModes`: Desktop / Tablet / Mobile — the
  "— Tablet" 390 master is Mobile), and `get_variable_defs` is `THEME_RAMP.Pop` exactly
  (display-lg 82 / 51 / 36, label-lg 24 / 16 / 14, label-sm 16 / 13, list 20 / 16 / 15, body-lg
  16 / 15 / 15, body-sm 12), so every leaf reads `s.*` and there is no `tk`. Retro's half is
  unreachable under Pop and was not touched: its placeholder seal, black place card and session
  0's dropped checker ribbon simply stop being drawn. Every paint on the three masters is bound
  but the sun's three face glyphs (raw `#FFFFFF`, followed as `s.bg`, the bio's precedent — white
  on white page, it reads as Pop) and the dot grid's children (under the `Union`'s bound fill).
- **On white, most of what the block reads is already the frame's binding**: the capsule
  (`sem/bg` in a `scheme/1/stroke/2` ring), the links (`text/1`, `s.ac`), the chip, the title
  (one tone, `text/2`, violet), the subtitle (`text/1`), the face card's copy (`text/2` /
  `text/1`). The deltas, off one node walk per master with the bindings and their collections:
  - **the nav** is inset **36 / 26 / 10** past the spread (1256 / 656 / 350 wide), its row tops
    the pill's at 1440 and 768 (y **70.04 / 36**, 34.93 tall) and the capsule's at 390 (**31**,
    34), the spreads at 156 / 100 / 90 — so `navGap` 51.03 / 29.07 / 25. The 768 numbers are
    Lime's; the other two are Pop's own;
  - **the capsule is gapped a fixed 18** at 16px type and at 13 (`H/18/8/18/8/18`), Grunge's
    mechanism: `navGaps` and the `<nav>`'s gap take `grunge || ed || pop`, and `sectionVm`'s
    `navGapEm` is **0 at Pop `d === 1`** (23/16 elsewhere — card 3's NavBar placeholder keeps
    it). Minimal's capsule is **176.4 × 27.4** on the 1180 canvas against 219 × 0.82 = 179.6, and
    **189.4** at 768 against 191 (Titan 1.2% narrow);
  - **the name is `sem/text/1` pink at 1440 and 768 and `text/2` violet at 390** (the burger's
    ink there, NavMenu's `s.tx`), and Listen is pink — where the twins' both read `s.tx`;
  - **the nav pill is two nodes on two schemes** — Scheme 3 at 1440 and 768 (pink under lime),
    Scheme 4 at 390 (blue under teal) — `navPill = s.onScheme[s.mob ? 4 : 3]`, `bg={navPill.bg}
    fg={navPill.ac}`, each over its own `Retro/Poster` block in `navPill.ac`: **lime 5 / 5 and
    teal 3.77** (`pp(5)`: the block × the hand-scale, 4.1 on the canvas), through `style` — the
    first of the three twins' pills whose block shows on its page. Its box is Lime's `pk` recipe
    to the hundredth (145.32 × 34.93 → **119.5 × 28.6** on the canvas; 130 × 34.9 at 768);
  - **the 390 pill's label is the Anton 12.07 leak set in Titan at that size** (decision 2),
    `faced` to 11.83: the pill is **110.5 × 26.4 against the master's 91.01 × 26.36**, flush
    right — Titan's BOOK NOW is wider than Anton's (Editorial's Noto was 99.3). Named;
  - **the Enquire pill is Scheme 3**: `bg={s.onScheme[3].ac} fg={s.onScheme[3].bg}`, lime under a
    pink label and disc, BookPill's box otherwise (257.3 × 44.3 against 312 × 54 × 0.82 = 255.8;
    272 at 768 against 266, 260.2 at 390 against 254 — Titan again);
  - **the photograph is a stadium**: radius `u(430)` on the 636 × 762 box, which CSS scales to
    the half-width as Figma clamps it (and at 768, 708 × 398, to the half-height), on the
    `s.box3` well in an **8px** `s.stroke2` inside ring (`u(8)`), 398 / 227 tall narrow, no glow,
    no grain; its fill is **FILL at every width**, a centred cover, so Lime's `22% 50%` is gated
    off; the desktop spread is **762** tall (`u(762)`, the twins' 688);
  - **the stickers hang off the photograph's box**: under `pop` a relative column wrapper stands
    in the photograph's seat (`hero`) and the photograph fills it. **The sun** is `PopSun`
    (154 → 126.28 on the canvas, 154 at 768, **85** at 390; `sem/tag/3/bg` = `s.chips[2].bg`;
    Figma −25.37 → CSS +25.37), placed by its disc's centre — (528.42, 83.59) off the
    photograph's corner at 1440, (650.14, 85.57) at 768, (318.19, 220.89) at 390 — and painted
    last, over the ring. **The dot grid** (`Union`, 328.02 × 238.58, `sem/text/1` pink) is the
    1440 master's alone, its first child, so the photograph paints over it and only the lower
    left shows: `PopDots` took an additive **`xs` / `vw`** (its five columns stand 80.81 / 67.81
    / 81.81 / 80.81 apart, where the bio's are an even 67.81; the dots and rows are the bio's),
    at (−4, 501.21) off the photograph's corner. The 390 sun's foot hangs 50 below the photograph
    into the gap over the chip, as the frame's does;
  - **the cards are stadiums at 1440** (`s.btnR` on 310 × 468) and **radius 60 narrow**, ringed
    **2px** inside (`u(2)`) — the face card in `sem/stroke/1` pink, the place card in
    `scheme/3/stroke/2` lime named outright (`s.onScheme[3].stroke2`). At 1440 a column centred
    both ways, 28 between tile and copy, padded 0 · 36 (the place card 18 · 36 — `card()`'s
    additive `py`), the copy centred; narrow a row centred across, gap 28, padded 16 / 10, the
    copy left beside the tile, hugging its 165 (197 / 185 tall, the frame's own);
  - **both tiles are arches, 107 × 165 at radius 110** — the pin tile **88** wide at 1440 — the
    portrait on `s.box2` in Lime's 1px `s.stroke2` overlay ring; the titles uppercase
    (`grunge || ed || pop`), Titan through `faced`;
  - **the place card is Scheme 6 filled `sem/text/2`** — `S6.tx`, pink, not the scheme's violet
    (trap 4) — its title `S6.ac` lime, its body `S6.text3` white; its pin tile has no fill, ringed
    and pinned in `S6.ac`. `LimePin` took an additive **`ink`** (ring and pin, default `s.bg`)
    and **`glyph`** (the drawing's own width, flex-centred, so the 88 × 89 pin keeps its 27.43 ×
    34.28 in the taller tile rather than grow with it).
- **The h1 is lifted `top: -0.14em`** under Pop through `Title`'s `style` (CONVENTIONS B's Pop
  row), and a pixel scan proves it: the violet ink runs box − 1 to + 34 at 768 in the frame and in
  ours (box − 0.8 to + 46.7 against − 0.5 to + 45.5 at 1440 × 0.82; 400–424 against 400–424 at
  390). The boxes land on the frame's: h1 166.5 (unlifted) against 203 × 0.82 at 1440, 399.8
  against 400 at 390.
- **Deliverable 3, the 768 sun**: the root clips sideways — `popClip` is now `(s.pr && s.v0 ||
  s.hd && s.v1) && s.pop`, `clip` not `hidden`. **Measured in the published tab** (card 2, the
  window at 768): `scrollWidth` **768 with the clip and 783 without it** — the frame's own 783,
  the positive control — and 1440 and 390 at their widths either way. The harness cannot show
  it: its page clips too (768 with the clip removed).
- **Decision 3, done.** `vm.navFits` takes the Grunge / Editorial arm at Pop `d === 1` against
  **656** (the frame's inset bar, not the twins' 708), the same 138.32 and fixed 18 gaps, links
  at Label/SM 13 and the name at Label/LG 16 in Titan × 0.98. Walked in the harness (`&nav=`,
  `navMode: 'sections'`, `live=1`): **up to three links** draw at 768 on one row with the name
  centred at 384; four fold to the burger. Minimal's three draw at 1440 and 768. At 1440 *Follow
  my sections* holds one row to eight links, the name sliding right from five (617.9 → 855.5);
  **the seeded nine wrap the capsule to two rows at the 12px floor** (11.76 rendered) — the
  block's designed below-the-floor fallback, reached for the first time by a seeded page because
  Titan is wide. Minimal is Pop's layout-2 default, so the seeded header never shows it. **Kept
  as the designed fallback** (user call, 2026-10-05; open question 10): the floor stays 12.
- **Named diffs**: the seeded subtitle runs 2 / 3 / 2 lines against the frame's 1 / 2 / 2 (the
  twins'), so the 768 identity block centres ~11 higher (h1 at 681 unlifted against 692); **the
  768 face card's title wraps** — Titan's THE FACE OF THE ACT outruns the 157 column, as the
  frame's own 163-wide box does (it runs 6 into the padding there); ours wraps inside the card's
  197, which does not grow. `&noimage=1`: the empty stadium is the black well with violet `KM`
  initials (legible), sun and dots in place.
- **`FIELDS.header` under Pop** (`scripts/reach.mjs 4`, every probe): **`showBadge` and
  `badgeText` `[0, 3]`** — each lost design 1, the placeholder's Retro seal gone; subtitle,
  heroCta, availability, faceTitle, faceBody and placeBody `[1]`; cta2 `[1, 2]` (4/6: Listen is
  dropped at 390); kicker, tags and showTags `[0, 2, 3]`; location all four; align `[0]` —
  unchanged.
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`**; theme 4 exactly
  header arch 1 and arch 5 at three widths on both surfaces (12 files), **arch 5 byte-identical
  to arch 1**; no `_arch_0_` file and no header `_arch_4_`. The two helper props are additive,
  and the digest is their proof.
- **The published tab** (`page-check.mjs Pop 1,0,2,3`): the modal offers four Pop cards; card 2
  opens the page in layout 2's order; Music → `#media`, Gigs → `#map`, About → `#bio`, Listen →
  `#media`, Book Now → `#form`; every other anchor and footer link on its id; the player plays;
  the form refuses and composes; `overflow390` 0; the burger at 390 opens (2 → 6); no console
  error or warning on any card. *Enquire about a date* read no scroll in that run — the known
  smooth-scroll click race (Grunge's *a walk is two runs*) — and scrolls to `#form` clicked from
  rest (a second script). Cards 1, 3 and 4 render and publish.
- **For the sweep's CLAUDE.md pass**: the *Pop is designed at layout 1* / card-2 placeholder
  sentences (card 2 is fitted now; cards 3 and 4 are placeholders), `popClip`'s reach in any line
  that names the root's clips, and `LimePin` / `PopDots`' props need no line. Not written here.
- **For the bio**: its Book pill is Scheme 4 at all three widths with a **teal 5 / 5 block at all
  three** (the plan's effects list) — the nav pill's recipe with `s.onScheme[4]` fixed, but read
  its box per master (145 / 129 / 123 × 35: the 390 one is not hand-shrunk to 91).

### Settled in section 2 (the bio)

- **The block widened whole: `if (s.v1 && (s.limeTree || s.pop))` ahead of `Bio`'s `if (s.v1)`,
  `const pop = s.pop`**, `mount` now `grunge || ed || pop` (nine arms, no `G`). The tree is Lime's
  node for node at all three widths (the walker, one call per master, bindings with their
  collection), on **Scheme 1 with no Device override**, the pill's `Frame` nested **Scheme 4** at
  768 and 390 (explicit) and resolving its values at 1440. Every size is the ramp's (label-sm 16 /
  13 / 12, label-lg 24 / 16 / 14, body-lg 16 / 15 / 15, body-sm 12) and the Tags instance the
  twins' hand-scaled 264.4 (15.37 / 10.76 / 9.22). **No raw hex on any master** — the bio has no
  leak but the credit box's width.
- **On white, most of the block is already the binding**: the `/FEATURED` pill (`sem/text/2` in a
  `scheme/1/stroke/2` ring — the seat is Scheme 1, so `s.tx` in `s.stroke2`, violet in lime), the
  paragraph (`s.tx`, violet — this page's body copy), the credit (`scheme/1/text1` pink lead over
  `text2`, i.e. `s.ac` / `s.tx`), the card's `box/1`, radius 30, padding 30 / 30 / 20, desktop
  `SPACE_BETWEEN`, the 390 foot's `10px 0`, and the caption card's `box/1`, name and role in
  `s.tx`. The deltas:
  - **the card's ring is 4px `sem/stroke/1` pink**, INSIDE: `ring(u(4), s.stroke1)` (Lime's 1px);
  - **every chip sits on its own tag** — `scheme/1/tag1…tag5/bg`, named outright, lime / pink /
    blue / teal / violet, which are `vm.chips`' seats since the bio stands on Scheme 1 — so `ed ||
    pop || i % 2 ? c.bg`, Editorial's turn-round; radius **6.15** (Pop's chip 8 × 0.7686; Lime's
    4.61, Grunge's 3.07). Inks: four of five are `c.fg`; the fourth binds `scheme/4/tag1/text`
    `#141414` where `c.fg` is Scheme 1's `tag4` ink `#000000` — the twins' one-chip leak, a
    named diff of one level. The sixth seeded chip (*All Access*, red) is JP-081's;
  - **the pill is Scheme 4**: `bg={s.onScheme[4].bg} fg={s.onScheme[4].ac}` — blue under a teal
    label and disc, the arrow blue — Editorial's pair, and its **teal `Retro/Poster` 5 / 5 block is
    on the 1440 pill too**, so `boxShadow` is drawn at all three widths, `${u(5)}` (4.1 on the
    canvas, 5px narrow — the string is the twins' `5px` there, byte for byte). The box is Lime's
    bio recipe (`k` 0.82 / 1 / 1), not the header's `pk`: **119.5 × 28.6** against 145.32 × 0.82 =
    119.2, **130 × 34.9** against 129.32, **124.5 × 34.9** against 123.32 (Titan against Chunko);
  - **the photo card is a 4 mount**, not the twins' 10: the outer frame `sem/text/1` (`s.ac`,
    pink) at Grunge's 26.25 padded 4, the inner clip `sem/tag/5/bg` (`s.chips[4].bg`, **violet**,
    Editorial's binding) at 21.44, under the twins' soft 1.25 / 1.25 / 10.81 at 16% black; no
    glow, no grain. The caption block's 20 stands **24 / 24 / 25.88** off the card (4 + 20, 4 +
    1.875 + 20); the caption card `box/1` at Grunge's 9, its disc `sem/tag/1/bg` lime
    (`s.chips[0].bg`). The heights are the mount's 648 / 648 / 362;
  - **the empty slot's initials are white** (`ink={pop ? s.bg : undefined}`, layout 1's bio):
    `&noimage=1` drew violet `KM` on the violet slot, invisible, before it.
- **The plan's "390 chip row" is the credit box** — `Frame 6`, 637.5 × 39 at x 30, is the credit
  line's leaked desktop box, as Editorial found; the Tags row wraps at 264.4 at every width. The
  block follows it as a `minHeight: u(39)` and never its width, so the 390 root's `scrollWidth`
  is 390. Corrected above and in open question 6.
- **The photograph is a centred cover** (`FILL`, `51d06990` = `POP_PHOTOS.bio`), the twins' rule;
  the frame's render and ours crop alike at all three widths.
- **Measured against the masters' content edges** (harness, `getBoundingClientRect`): desktop
  `/FEATURED` 95.7 × 23.6 (114.35 × 29.34 × 0.82 = 93.8 × 24.1), chips at 445 (543.29 × 0.82 =
  445.5) with *Live* at x 131.7 (132.1), credit at 521.7 (520.7), the pill's right edge 24.6 in
  from the card's, the photo card 355 × 531.4 at 779 (779.8), the clip inset 3.28 at 17.58, the
  name at 502 (502.8), the disc at 1068.5 × 506.9 (1069.3 × 507.3); 768 `/FEATURED` at 90 (90),
  the paragraph at 141.1 (140.85), the photo card 708 × 648; 390 the pill 47.6 under the credit
  (48.65), the photo card 370 × 362, the name 281.9 under its top (282.1). **Named diffs, the
  twins'**: the seeded paragraph is 2 / 2 / 3 lines against the frame's 3 / 3 / 6, so the narrow
  cards run 24 / 69 short; the caption names `s.brand` where the frame types "KAI MERCER · DJ";
  `/FEATURED` and the pill run ~2% wide in Titan.
- **`live=1`**: the pill is `<a href="#form">` at all three widths with its teal block (4.1 / 5 /
  5); nothing else in the section is live. No page errors or warnings.
- **`FIELDS.bio` under Pop** (`scripts/reach.mjs 4`, confirm-only, 5,880 renders): `bio.credit`,
  `bio.cta` and `bio.tag` reach bio layout 2 alone; `who.tags` / `who.showTags` bio 2 and 4;
  `who.kicker` all four bios; `who.location` 1–3; `bio.tagsLabel` layout 4 at 4/6 (the known
  partial). Nothing in `FIELDS` moved.
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`**; theme 4 exactly bio
  arch 1 at three widths on both surfaces (6 files), no `_arch_0_` file, no one-row file.

### Settled in section 3 (the media player)

- **The block widened whole: `if (s.limeTree || s.pop)` inside `Media`'s `if (s.v1)`, after
  `nowArt`, `const pop = s.pop`** (a dozen arms, two seat helpers, no `G`). The tree is the
  twins' node for node at all three widths — Section / Frame 297 / Frame 296 / the two
  instances, the fan at the twins' offsets, angles (±5.33 / ±10.66) and opacities (.82 / .64),
  the 108 bar — on **Scheme 1, Frame 297 on Scheme 2, no Device override**, each master read
  with one walker call (bindings with their collection). Every size is `THEME_RAMP.Pop`'s
  (display-lg 82 / 51 / 36, list 20 / 16 / 15, body-lg 16 / 15 / 15, body-md 14 / 13 / 13,
  body-sm 12, chip 12 / 11 / 11) but Display/Title, **28 / 22 / 20** in `tk` (`s.title` is the
  heading string). **No raw hex on any master**: the media has no leak but the 390 titles' run.
- **Under the Scheme 2 seat the panel, bar and heads are keys**: the panel `sem/bg` → `s.bg`
  (Editorial's arm), radius 50 / 30 / 30, the twins' padding and 629 column; the bar and its
  inner pill **`box/1`** (`s.box1` — where Editorial binds the panel's `sem/bg`), radius 92 as
  Grunge's, ringed **1px `sem/stroke/1`**, violet under the seat (trap 6, as the frame draws it),
  **no glow** (`effects: []` on every node); the sleeve's well `box/2`; every bar and counter ink
  `sem/text/2`, `s.tx`. The Featured chip is `sem/tag/1/bg` → `s.chips[0].bg`, pink (Editorial's
  arm), lettered violet.
- **Every fan card and every list row stands on its own scheme** (`explicitVariableModes`, the
  same at all three widths), read through `s.onScheme`:
  - **the fan's seats, left to right, 5 / 4 / 2 / 3 / 6** (teal, blue, lime, pink, violet) —
    each its `box/1` at **radius 8** in a 1px `stroke/1` ring round a `box/2` well, its title and
    sub `text/2`. Seats, not tracks (`notes/media.md`'s rule): `popCard(k)` clamps |k| to 2, so a
    sixth card keeps its side's outermost scheme. "Translucent" is the twins' `.82 / .64` on the
    seat's own fill, nothing new;
  - **the rows by index, 3 / 4 / 5 / 7 / 8** (pink, blue, teal, red, yellow; `i % 5` past five) —
    a **pill** (radius 999) on the scheme's `sem/bg`, padded 14 · 30, ringed **4px inside** in the
    stroke each node names — `stroke/2`, `stroke/1`, `stroke/2`, `stroke/2`, `stroke/1`,
    transcribed, not patterned (`popRow`) — inked **`text/1`** (`R.S.ac`: lime, teal, violet,
    lime, pink), the number, title, sub, time and the live Play / Pause alike;
  - **the cover is a 64 disc** on the row's own `box/2`, under a **4px inside ring of
    `scheme/1/stroke/2`**, lime, named outright (`s.onScheme[1].stroke2` — `s.stroke2` under the
    seat is pink): `art()` took three additive arguments (`well`, `ink`, `ring`), the ring an
    overlay that paints over the photograph.
- **The rows stand 10 apart** (the list's `itemSpacing`, which the twins' frames set 0), under the
  counter row too: the desktop column then divides to **115.8** a row (95 on the canvas) and the
  narrow 596 to **100.6**, the frames' own. Their rules are gone: a pill needs none.
- **Decision 2's open item, settled: the head is uppercase at every width, its ink per width.**
  The binding is Lime's flip on Lime's keys — `sem/text/2` violet at 1440, `sem/text/1` pink at
  768 and 390 — so the block's `desk && !ed ? s.tx : s.ac` already reads it, no arm; pink on lime
  reads in the render, so it is followed. The narrow masters' "Five Worth your ear" is the one
  mixed-case display string on the page, a slip, uppercased through `disp` as the 1440 master
  types it. **The breaks**: Titan's "FIVE WORTH" alone outruns Lime's 4.6em, and the 629 column
  breaks after it unaided, so desktop takes no cap; 768 holds one line in 648 (62 to 659 of
  ink); at 390 a 330 column would hold "FIVE WORTH YOUR", so the master's own **251** box is the
  cap (Grunge's). Two / one / two lines, the frames'. **Lifted 0.13em** (layout 1's media head, at
  the same lh 0.89; CONVENTIONS B), and a violet / pink ink-row scan proves it: 120–226 against the
  frame's 118.9–225.5 × 0.82 at 1180, 120 against 118 at 768 (cap tops), 80 against 79 at 390.
- **The 1440 Section's 5px lime rules are drawn** — `scheme/1/stroke/2` INSIDE, top and foot,
  **visible** on Pop's node where the twins' same stroke is a hidden paint, and in the render. The
  root draws them, `popMediaRule` (`s.me && s.v1 && s.pop && !s.narrow`): two inset shadows of
  4.1px (5 × 0.82) in `s.onScheme[1].stroke2`. The narrow wrappers carry none.
- **Open question 6's media line: the 390 titles are overridden, the twins' way.** The master's
  rows keep 30 · 20 and clip every seeded title mid-word at 101 ("LATE LIGH"), and its bar runs the
  title off at x 471 — both the twins' 390 artefact, so Retro's override stands: the rows' gaps
  close to 14 and the title ellipsises; the bar drops the clock and icons (*reversed in part*,
  JP-099, 2026-10-05: it now draws the icons and drops the sleeve instead). The pills keep their 30
  side padding, which their curve needs.
- **Measured against the masters** (harness, from the section root): desktop root **791.3**
  (965 × 0.82), h2 at x 95.1 (116 × 0.82), bar top 583 (711 × 0.82), rows at x 651.9 (795 × 0.82),
  first at 164.1 (200 × 0.82), 433 × 95 (529 / 115.8 × 0.82) on a 103.1 pitch; 768 root
  **1541.4** (1541), bar 667.4 (667), rows 878.4 (878) on 110.6, 100.6 tall; 390 root **1420.1**
  (1420), bar 586.1 (586), rows 797.1 (797). The fan is the twins' seats, untouched.
- **Named diffs**: **the desktop bar's SLOW BURN ellipsises** — Titan's 136.3 in a 112.4 box; the
  frame's own box is 109.8 on the canvas and its Chunko "SLOW BURN" (~136) would not fit it either,
  so the frame clips its own title there ("SLOW BUI"). Editorial's departure (both inner sides
  dropped) buys 18 of the 24, so it is not taken; the cued LATE LIGHTS (141.5) is JP-097's
  *not changed* line already, which this joins. 768 fits (130.4 in 140.2); 390 is JP-099's table
  (118.5 in 115.5; 114.4 since JP-099's reversal, 2026-10-05, which draws ♡ ↓ ⋯ and drops the
  sleeve at 390). The seeded heading carries its full stop ("…EAR."), the frame's none; the fan
  art is our seeds.
- **States**: `&n=8` — eight pills cycling the five schemes; the desktop rows share the stretched
  column, so each 52.5 disc is clipped by its pill's ~33 content box (the twins' 64.5 rows clip
  their tiles the same way, Retro's rule), and the fan clips at the column. Art-less tiles and
  discs read: `KM` in each card's `text/2` and each row's `text/1` on its own `box/2` (yellow on
  blue, violet on teal, pink on yellow), violet on the bar's `#B7DD0D`. `&n=0`: the counter row
  alone, "NO TRAC…" in the 390 bar (the twins' state).
- **`live=1`** (puppeteer, trusted clicks, `--autoplay-policy=no-user-gesture-required`, 1440 and
  390): row 2 plays Manchester at 3am and the bar names it, a second click pauses; the outermost
  left card, clicked on its visible edge, deals Roomtone to the centre and plays it; every row is
  hit by `elementFromPoint` at its centre; no sideways scroll; no page error or warning.
  **`page-check.mjs Pop 1`**: the modal's four cards, the player plays (`paused: false`),
  `overflow390` 0, the burger 2 → 6, no console error or warning; the published 1440 media is
  **966** tall (965), and its seam clip shows the lime rule on the media's top edge under the
  bio's white, 86 above the panel.
- **`FIELDS.media` under Pop** (`scripts/reach.mjs 4`, confirm-only): `countLabel` reaches media
  layouts 2 and 3 — its `{ Pop: [1, 2] }` row, as the frame's "5 FEATURED / 5 MAX" says;
  `listLabel` and `totalLabel` 2 and 3, `chipLabel` 2, every hit whole. Nothing in `FIELDS` moved.
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`**; theme 4 exactly media
  arch 1 at three widths on both surfaces (6 files), no `_arch_0_` file, no one-row file. The
  `art()` arguments are additive and the twins' calls pass none; the digest is their proof.
- **For the sweep's CLAUDE.md pass**: `popMediaRule` belongs beside `editorialRule` /
  `grungeRule` wherever a sentence names the root's rules, and the media's per-seat schemes
  are in `notes/media.md` already. `art()`'s arguments need no line. Not written here.

### Settled in section 4 (the repertoire)

- **The block widened whole: `if (s.limeTree || s.pop)` inside `Repertoire`'s `if (s.v1)`, after
  `pageWindow()`, `const pop = s.pop`** (seven sites, no `G`). The tree is the twins' node for node
  at all three widths (`phone` / `sticky-head` / `Frame 286` / `list` / `pagination`, two columns
  of five, the seven-slot pager), on **Scheme 1 with no Device override** (`resolvedVariableModes`
  Desktop / Tablet / Mobile) and **no nested scheme, no effect, no rotation** on any node, each
  master read with one walker call (bindings with their collection). `get_variable_defs` is
  `THEME_RAMP.Pop` (display-sm 36 / 29 / 24, list 20 / 16 / 15, body-md 14 / 13 / 13, body-sm 12),
  so every size reads `s.*`. The hooks sit above the branches, so the published search, chips and
  pager needed nothing.
- **On white, every fill and ink the block reads is already the binding**: the sheet `sem/box/1`
  `#F5F5F5` (`s.box1`); every ring and rule `sem/stroke/1`, **opaque pink** (`s.stroke1`) — the
  head on all four sides, the toggle, the field (radius 118), the column's inside edge, each row's
  foot; the heading, field, numbers, titles and artists `sem/text/2` violet (`s.tx`); the toggle's
  pill `sem/text/1` pink under `sem/bg` white type (Lime's `s.ac` / `s.bg`). The paddings, the 12
  head gap, the 42 row gap, the toggle's 3 and chips' 6 / 14, the 390 stack's 10 and the rows'
  56 / 20 / 30 / 10 insets are the twins' to the number. The deltas:
  - **the sheet's own ring is drawn** — `phone`'s 1px INSIDE `sem/stroke/1` is visible at every
    Pop width (Grunge's and Editorial's reading), so the overlay widens to `grunge || ed || pop`.
    Opaque, so where it stacks on the head's ring the render is one pink row (sampled at y 0 and x
    0 / 1439 of the 1440 render), not Grunge's 89-over-60 double;
  - **the rows pin at 86 / 84.2 / 60.6** — neither twin's: Titan's display-sm leaves each
    master's head at 196 / 197 / 197, so the list the rows divide is 430 / 421 / 303;
  - **the heading and titles are uppercase** (`grunge || ed || pop`), through `faced` (0.98);
  - **the heading is lifted 0.14em** (CONVENTIONS B's Pop row — measured, not inherited, since lh
    is 1 here): a violet ink-row scan put Titan 4.4 / 4.5 / 3.0 px under the frame's Chunko at the
    three widths (0.15 / 0.16 / 0.13 em, ink heights equal); lifted, 2.0 / 1.5 / 1.0 against 1.6 /
    1 / 1 off the box's top. **The song titles sit 1.0–1.7 px low** (~0.06–0.1 em at lh 1.2) and
    are left, as layout 1 left its row titles — it does not show;
  - **the pager passes the frame's own bindings** — `Pager`'s Pop arm is layout 1's Scheme 6 seat
    (the `#9162FF` pills, pink ends, a white arrow, a pink current pill read as `s.tx`) and reads
    wrong on Scheme 1 at four keys, so the block passes `frame.lime` under `pop`, Editorial's
    route, and `Pager` is untouched: `box: s.tx` (`sem/text/2`, violet pages), `endBox:
    s.chips[0].bg` (`sem/tag/1/bg`, lime arrows), `ink: s.tx`, `onBox: s.ac` (`sem/text/1`, the
    pink current page) — **the frame marks its page, so the mark is followed** — and the three
    leaks below.
- **Open question 9's leaks, read where each shows (decision 2), all followed** through layout 1's
  `POP_REP` names, the same leak on the same component (layout 1, section 5): `#AFE335` × 4 (the
  idle numerals, `POP_REP.song`) reads lime on violet; `#FBF6EA` (the current numeral,
  `POP_REP.paper`) off-white on pink; `#F2FFD0` × 2 (the arrows' 1px ring, `POP_REP.pale`) barely
  anything on lime (sampled `#F2FFD0` at x 56 of the 1440 render). **The two raw `#6B2CFF`** (the
  arrow glyphs) are `sem/text/2`'s own bytes — Pop's violet, not a leak in effect — so `s.tx`.
  **Anton 12** on the numerals is Pop's label face at that size, `Pager`'s Pop arm already
  (`labelStyle(s, u(12))`).
- **Measured against the masters** (harness, from the sheet's top-left): desktop section 650.1
  (792 × 0.82 = 649.4), head 161.3 (160.7), h2 at (46, 46), field 311.6 × 29.5 at x 822.4, rows
  70.5 (86 × 0.82), pager band 136.3 at 513.8 (513.3), pills 44.3 tall at 559.8; 768 section
  791.9 (792), head 197, h2 at (30, 60), field 380 × 36 at (358, 101), rows 84.2, pager band 174
  at 617.9 (618); 390 section 593.8 (594), head 196.8 (197), field 370 × 36 at 120.8 (121), rows
  60.6, pager band 94 at 499.8 (500), pills 54 at 519.8 (520). **Named diffs, the twins'**: the
  seeded four chips against the frame's three; the seeded twelve make two pages, so four buttons
  divide the measure (267 / 171 / 86.5) where the frames draw a fictional seven; "12 SONGS"
  against "REPERTOIRE"; the title at x 64.9 / 53 / 32 on Lime's pinned number against the
  frame's 62.3 / 50–52 / 30.
- **`live=1`** (puppeteer, `n=30`, three widths): Next lights page 2 and the list starts at 11;
  the "3" pill reaches 21; Prev steps back to 11; *Weddings* re-filters to one page and the pager
  drops; a no-match search prints *No songs match that.*; `&n=0` prints *No songs yet.*; every pill
  hit-tests to itself at its centre with a pointer cursor; no page error or warning. **The empty
  message keeps the twins' `s.muted`**, violet at 64% on `#F5F5F5`, which reads (shot) — layout
  1's re-ink was for 1.4 : 1 on its violet seat, not this.
- **`FIELDS.repertoire` has no template-keyed row** (`heading` and `songs` reach every layout,
  `sets` design 2), so no `reach.mjs` run was owed.
- **`page-check.mjs Pop 1`**: the modal's four cards; every nav, anchor and footer link on its
  id; the player plays; the repertoire's chips change state; `overflow390` 0; the burger 2 → 6;
  no console error or warning. The published 1440 repertoire is **793** tall (792). The seam
  clips: at 1440 the media's 5px lime foot rule stands directly on the sheet's pink ring, the
  frames' own adjacency; at 390 the sheet closes on its pink ring above the white gallery.
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`**; theme 4 exactly
  repertoire arch 1 at three widths on both surfaces (6 files), no `_arch_0_` file, no one-row
  file. `Pager` was not touched, so map a2 (layout 1's other Pop pager reader) did not move.
- **For the gallery**: it stands on white directly under this sheet's opaque 1px pink ring at
  every width, so the seam is the repertoire's and the gallery owes it nothing. It has no block —
  `s.limeTree` reads and `(s.lime || grunge)` / `ed` ternaries through `Gallery`'s `if (s.v1)` —
  so each widens from the frame, one site at a time (Editorial's section 5 is the model).
- **For the sweep's CLAUDE.md pass**: nothing new — the repertoire's paragraph names no
  layout-2 pager state. Not written here.

### Settled in section 5 (the gallery)

- **No block, for the third time: the sites through `Gallery`'s `if (s.v1)` widen one by one
  under `const pop = s.pop`**, at nine sites. They are `bw`, the well, `wellInk`, the hero's
  border (now an overlay), its anchor, the caption's ink gate, the caption's and the 768 head's
  chip type, and the pick ring's ink. The tree is Lime's node for node at all three widths
  (18 / 23 / 22), each master read with one walker call (bindings with their collection), on
  **Scheme 1 with no Device override** (`resolvedVariableModes` Desktop / Tablet / Mobile) and
  with **no effect, no rotation and no raw paint on any node**, so the gallery has no leak.
  `get_variable_defs` gives `size/chip` 12 / 11 / 11, which is `THEME_RAMP.Pop`'s chip (10 on
  the canvas, 11, 11), so `s.chip` exactly. The hooks sit above the branches.
  **The plan's census was one site off**: the `v1` branch holds one `(s.lime || grunge)`
  ternary, the caption's fill. The "tile ratio" and `cream` ternaries are layout 3's `v2`
  (the viewer), not this pass's. No Titan string is drawn here (the caption and the head are
  Inter Bold), so no 0.14em lift is owed.
- **On white, the inks are already the bindings**: the tiles' edge `sem/text/1` (`s.ac`, pink,
  the `edge` already drawn), the wells `sem/box/3` (`s.box3`, black), the caption's fill
  `sem/tag/1/bg` (`s.chips[0].bg`, lime), which is Retro's else-arm again, as under Editorial
  (its comment now names both), and the 768 head `sem/text/2` (`s.tx`). The radii are Lime's
  to the corner: the hero 30; the tiles 30 with the first and last in each column squared off
  where their dropped side runs (`0 0 30 30` / `30 30 0 0`, so neither `rTop` nor `ed`'s
  whole-corner rule applies); the 390 rail 10. The deltas:
  - **every ring is 5px INSIDE** where the twins' are 1px. The hero's is
    `scheme/1/stroke/2`, named outright (`s.stroke2`, lime, since the seat is Scheme 1), and
    the tiles' is `sem/text/1`, with the same per-side weights as the twins' (`[0, 5, 5, 5]`
    first, `[5, 5, 0, 5]` last). The tiles keep the twins' CSS border at `u(5)`, which is what
    drops their outer sides. The photograph's 4.1px inset under an opaque ring cannot show, and
    `flex: h 1 auto` already carries the border. **The hero's ring is an overlay** (`inset 0 0 0
    u(5)` in `s.stroke2`, after the caption), not the border. A 4.1px border would have put the
    caption 36.9 in rather than the frame's 32.8 and shrunk the cover box by 8 each way. Its
    image frame's own radius 4 lands under the ring, as on every twin. Computed: the overlay is
    4.1 / 5 / 5; the tiles' border computes **4px** at desktop (Chrome snaps a 4.1 border width
    to a whole pixel, at the digest's DPR 1 too), 5 / 5 narrow;
  - **the caption's ink is `sem/text/2`**, violet (`s.tx`), where Pop's tag-1 ink is `#141414`,
    so the gate takes `(s.retro || s.limeTree || pop)`. Its type and the 768 head's take `s.chip`
    at −0.06em, the twins' widening;
  - **the empty slot's initials are white** (`wellInk` `(ed || pop) ? s.bg`): Pop's `s.muted` is
    violet at .64 on the black well. `&n=0` shows white `KM` on black at all three widths, with
    the rings and caption in place. `&noimage=1` leaves the gallery's own slots seeded, so `&n=0`
    is this section's empty state.
- **The hero anchors by slot.** Its node holds our own seed (`b3a33296`, `popGallery4`,
  `galActive()`'s slot 3) as a `FILL` at all three widths. A sweep of cover anchors against the
  frames' renders bottoms out **centred**: mean |Δ| 3.5 / 2.2 / 2.1 at 50%, against 68 / 38 / 41
  top-anchored. But centred, three other seeds picked into the seat lose the singer's head at
  1440 (`pop-gallery-1`, `pop-stage`, `pop-avatar`; a montage at 0 / 25 / 50% is in the session
  scratchpad). Editorial's convention says *a frame's image anchor is evidence for its own
  photograph only*, so the anchor is `pop && active === home ? '50% 50%' : '50% 0%'`: the canvas
  and the published first paint get the frame's crop, and a pick gets the twins' top anchor.
  The tiles keep the top anchor too (open question 4: the frame's strip is Retro's
  placeholders). Reversible in one line at the hero's `Photo`.
- **The pick ring is re-inked lime** (CONVENTIONS C, *a twin's frame-less control is checked
  against its own surround*). No frame draws it. The twins' `s.ac` inset inside Pop's 4.1px pink
  edge read as the idle tile in the shot, so under `pop` it is `s.stroke2`, the hero's ring, at
  the twins' 2.5 / 2 weights. In the shot it reads clearly, and it tells the visitor which tile is
  in the hero.
- **The 390 right column's first-tile wrapper carries the `[0, 0, 40, 40]` stray** a third time
  (its own image frame says 10), and the frame's render shows the capsule foot. It is not
  followed, on Grunge's and Editorial's reasoning. The 768 master's 1px third tiles are divided
  in the frame's proportions (JP-098 kept the six). The head row reads *Gallery* (`railLabel`),
  and *View list* / ✕ are dropped, as the twins drop them.
- **Measured against the masters' content edges** (harness, from the section root): desktop
  root 553.5 (675 × 0.82), hero 642.1 × 478.1 at (45.9, 37.7) (784 × 583 × 0.82 = 642.9 ×
  478.1). The caption is 102.8 × 39.7 at **32.8, 32.8** in from the hero's outer edge (40 ×
  0.82, the frame's exactly; the twins' 33.8 counted their 1px border), 10px Inter 700 at
  −0.6px, violet on `#C6F200`. Tiles 209.1 wide at 100.9 / 176.3 / 184.5 and 159.1 / 198.5 /
  104.1 (the twins' numbers). 768: root 468, hero 342 × 392 at (30, 30), caption at **(70,
  336)** (the frame's to the pixel), head *Gallery* 33.8 × 11 at (396, 34.5) (the frame's
  396, 34.5), tiles 166 wide. 390: root 364, hero 273 × 284 at (10, 40), caption at (50, 238),
  ten tiles 36.5 × 48.8 at 10. **Named diffs, the twins'**: at 390 the hero is 273 wide
  against 253 and the caption 10 left of the frame's 60, since the root's `padX` is JP-038's
  10 against the master's 20; the caption reads the seeded heading and name ("SEE US IN ACTION
  / KAI MERCER") where the frame types "MTV 'MOOD SWING' / FEATURED REEL"; the seeded strip
  stands against the frame's placeholder six; and the 768 tiles land at 74.1 / 130 / 133.8 and
  115.7 / 145.9 / 76.5 against the twins' 73.9 / 129.3 / 134.8 and 116.3 / 145.4 / 76.3, since
  flex-shrink weighs the inner base size and a 5px border redistributes the 358 band (desktop's
  column has no free space, so it is exact).
- **`live=1`** (puppeteer, trusted clicks, three widths): tiles 0, 3 and 5 move the hero to
  `pop-calendar`, `pop-gallery-1` and `pop-stage` and ring themselves (at 390 tile 0 rings with
  its looped twin 6, and 3 with 9). A second click on the ringed tile hands the hero back to
  `pop-gallery-4` with no ring, and a hero click changes nothing. Every tile hit-tests to itself
  at its centre (6/6, 6/6, 10/10) with a pointer cursor. No page error or warning.
- **`FIELDS.gallery` has no template-keyed `in` row**, so no `reach.mjs` run was owed.
- **`page-check.mjs Pop 1`**: the modal's four cards; every nav, anchor and footer link on its id;
  the player plays; `overflow390` 0; the burger 2 → 6; no console error or warning. The published
  1440 gallery is **675** tall (675). The seam clips show the repertoire's opaque 1px pink ring
  closing the sheet over the white gallery at 1440 and 390, so the seam is the repertoire's.
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`**; theme 4 exactly
  gallery arch 1 at three widths on both surfaces (6 files), no `_arch_0_` file, no one-row
  file.
- **For pricing**: it stands on white, **ringed 1px pink at 768 and 390 only** (read that off
  the root's strokes per master), and its plan card is a **nested Scheme 7** leant −3 / −3 / −1
  (Figma → CSS +3 / +1), so spacing is read against the rotated box per master (CONVENTIONS A).
  Its Lime block (after `sel` / `t`) has Grunge's `G` at its head, with Editorial as the third
  arm, so Pop is a fourth.
- **For the sweep's CLAUDE.md pass**: nothing new. CLAUDE.md names no gallery layout-2 state;
  `notes/gallery.md` now carries Pop's pick ring and its anchor by slot.

### Settled in section 6 (pricing)

- **The block widened: `if (s.limeTree || s.pop)` inside `Pricing`'s `if (s.v1)`, after `sel` /
  `t`, `const pop = s.pop`, `const S7 = s.onScheme[7]` and a fourth `G` arm** (Grunge's,
  Editorial's and Lime's byte-identical), plus six `pop` sites: `disp()`'s uppercase and lift,
  the pill's pair, the slot wrapper, the root ring overlay, the transparent desktop foot rule and
  the empty message's ink. Four new leaves fall back through `??`: `chipFg`, `card`, `cardAc`
  and `div`. The tree is the twins' node for node at all three widths, on **Scheme 1 with no
  Device override** (`resolvedVariableModes` Desktop / Tablet / Mobile), the plan card `right`
  **explicitly Scheme 7** at every width, each master read with one walker call (bindings with
  their collection). Every size is `THEME_RAMP.Pop` (display-md 45 / 36 / 28, display-sm 36 / 29
  / 24, chip 12 / 11 / 11, body-lg 16 / 15 / 15, body-md 14 / 13 / 13, body-sm 12, label-xs 20 /
  14 / 12, eyebrow 15 / 12 / 11, list 20 / 16 / 15), so every size reads `s.*`. `get_variable_defs`
  mixes Scheme 1 and Scheme 7 in one list (`sem/bg` `#FF1A1A`, `sem/tag/1/bg` `#FFF600`) — the
  walker settled which node is on which. **No raw hex on any master, no effect** on any node.
  The hooks sit above the block, so the published toggle needed nothing.
- **The head is the block's Scheme 1 keys**: `[ PRICING ]`, the quote, the reviews and the small
  print `sem/text/2` (`s.tx`, violet); the heading, stars and rating `sem/text/1` (`s.ac`, pink);
  the faces `sem/box/1` in a 2px INSIDE `sem/stroke/1` ring at `radius/control` 8 — Grunge's
  `faceRing` / `faceR`, now pink.
- **The card is Scheme 7, read through `s.onScheme[7]`**: `sem/box/1` coral `#FF5A5A`
  (`G.card`) in a **4px** INSIDE `sem/stroke/1` lime ring (`inset 0 0 0 u(4)`), radius 50 and
  padding 42 / 42 / `30px 20px` (Lime's); the amount and the `+`s `sem/text/1`, lime
  (`G.cardAc`); the name, blurb, £, unit, note, features label and features `sem/text/2` —
  Scheme 7's violet is Scheme 1's `#6B2CFF` to the byte, so those sites keep `s.tx`; the rule
  `scheme/6/stroke/1` named outright (`G.div`, `s.onScheme[6].stroke1`, lime); the pill
  `BookPill`'s Lime branch on `bg={S7.ac} fg={S7.bg}` — lime under a red label and disc, the
  arrow lime — where its defaults would paint Scheme 1's black `pillBg`.
- **The picked chip: the frame's fill and ring, the tag's own ink** (user call, 2026-10-05).
  `toggle-a` fills `sem/tag/1/bg`, yellow `#FFF600`, `toggle-b` none, both ringed 1px INSIDE
  `sem/stroke/2` violet under `sem/text/1` lime — so the pick shows (Editorial's route, followed:
  `chipOn` / `chipOnRing`), but its label is lime on yellow, **1.15 : 1** and near-invisible in the
  frame's render. Asked; the label is `sem/tag/1/text`, `S7.chips[0].fg`, black. The idle chips'
  lime on coral (2.35 : 1) reads in the render and is followed (`G.chipFg`). **The lime price on
  coral** is the same 2.35 at display size and reads; followed.
- **The lean.** `right` is Figma −3° at 1440 and 768 and −1° at 390 (CSS +3 / +1). **Every master
  spaces it by its rotated bounding box**: the grid's height is that box's (588.73 = 640 sin 3° +
  556 cos 3° at 1440, a row; 532.37 at 768 and 502.38 at 390, stacks), and its centre is the
  slot's. So under `pop` the card turns about its centre inside a slot-sized flex-column wrapper
  (`display: flex` so the margins cannot collapse), with `margin: 2.6168% 0` / `0.8726% 0` —
  `w·sin θ / 2`, a percentage of the wrapper's width, which is the card's — leaving out
  `h(1 − cos θ) / 2`, 0.2px. Measured: the wrapper is the card plus 13.7 / 18.5 / 3.2 each way
  (the rotated box's height, 471.5 at 768 for our 435 card), at y 46 / 294 / 270 against the
  frame's 45.9 / 294 / 271.
- **The turned corners need no clip.** The published tab (card 2) reads `scrollWidth −
  innerWidth` **0 at 1440, 768 and 390** with the root unclipped (`overflowX: visible`), and the
  furthest box edge in the section is the root's own at each width (the card's visual box
  6–384 at 390, 19–749 at 768). `popClip` is untouched.
- **The root ring is drawn at 768 and 390 alone**: the narrow roots carry a 1px INSIDE
  `sem/stroke/1` (opaque pink) and the 1440 root no stroke at all. Grunge's overlay widens to
  `grunge || ed || (pop && !desk)`, and the desktop foot span keeps its box and paints
  `transparent` under `pop` too.
- **Type**: `disp()` uppercases under `pop` (the heading, the name, the numeral), `faced` at 0.98,
  and **lifts each 0.14em** — measured, not inherited: an ink-row scan put the head's baseline
  0.126 / 0.139 / 0.143em under the frame's at 1440 / 768 / 390, and lifted it lands within 0.4px
  at 1440 and on the frame's row at 768 and 390. The name and the numeral are the same face in
  the same lh-1 box, the numeral on the price row's `MAX` (bottom) alignment beside the £, so
  they take the same lift. Kicker and features label stay as typed (JP-095 (a)).
- **Measured against the masters' content edges** (harness, from the section root): desktop
  kicker at 45.9 (56 × 0.82), h2 at 72.3 (72.2) in 36.26px (45 × 0.82 × 0.98), chips 23 tall (28
  × 0.82), the pill 257 × 44 (312 × 54 × 0.82 = 255.8 × 44.3); 768 h2 at 91 (91) in 35.28px,
  chips 27, pill 272 × 54 (266); 390 h2 at 61 (61) in 27.44px, chips 27 with the seeded third on
  a second row, pill 260 × 54 (254), the note stacked. **Named diffs, the twins'**: the seeded
  heading's own words (two lines at every width, as the frame's typed break) and the seeded package's two
  features and one-line blurb, so the card stands 384 / 435 / 460 against 556 × 0.82 / 496 /
  496 and the roots 520 / 865 / 805 against 590 / 926 / 841; the seeded three chips against two;
  Titan's pill ~2% wide.
- **States**: `&n=0` keeps the leant card with *No packages yet.* — re-inked from `s.muted`
  (violet at .64, faint on coral) to Scheme 7's `text/2` (CONVENTIONS C, *a twin's frame-less
  control is checked against its own surround*); `&n=1` draws no chips; `&n=8` wraps them to
  three rows at 390 inside the card.
- **`live=1`** (puppeteer, trusted clicks, three widths): the third chip lights yellow and swaps
  in *The Festival Set* / 1,200, the second *The Wedding Set* / 650; every chip hit-tests to
  itself at its centre on the leant card; the pill is `<a href="#form">`; no page error or
  warning. **`page-check.mjs Pop 1`**: the modal's four cards, every nav, anchor and footer link
  on its id (*Enquire about a date* → `#form`), the player plays, the pricing chips change state,
  `overflow390` 0, the burger 2 → 6, no console error or warning; the published 1440 pricing is
  **635** tall (the seeded card's).
- **`FIELDS.pricing` has no template-keyed `in` row**, so no `reach.mjs` run was owed.
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`**; theme 4 exactly
  pricing arch 1 at three widths on both surfaces (6 files), no `_arch_0_` file, no one-row file.
- **For the calendar**: it is seated on Scheme 2 (the card, `editorialCard` painting white round
  it); its Lime block (inside `Calendar`'s `if (s.v1)`, after `want` / `hit` / `cur` / `line`) has
  Grunge's `G` with Editorial's third arm, so Pop is a fourth. Its head band reads Scheme 2's keys
  (read which), the first slot mark binds `sem/media` teal (trap 4), the pin is re-measured in
  Titan with `&open=` looping every month, and the foot pill's pink 5 / 5 block goes through the
  caller's `style`. The 390 instance is another main component with four more nodes.
- **For the sweep's CLAUDE.md pass**: nothing new in CLAUDE.md; `notes/pricing.md` carries Pop's
  card, its lean and the chip's label.

### Settled in section 7 (the booking calendar)

- **The block widened: `if (s.limeTree || s.pop)` inside `Calendar`'s `if (s.v1)`, after `want` /
  `hit` / `cur` / `line`, `const pop = s.pop` and a fourth `G` arm** (Grunge's, Editorial's and
  Lime's byte-identical), plus three `pop` sites: `disp()`'s uppercase gate and the two lifts. One
  new leaf falls back through `??` (`G.marks?.[i % 4]`, undefined on the twins, so their marks
  inherit the row's `s.tx`). The tree is the twins' node for node at all three widths (the head
  band, Frame 42, the column head, four rows, the foot; the 390 rows' `Frame 313`–`316` stacks),
  the instance **explicitly Scheme 2** with no Device override (`resolvedVariableModes` Desktop /
  Tablet / Mobile), each master read with one walker call (bindings with their collection).
  `get_variable_defs` is `THEME_RAMP.Pop` at all three (display-md 45 / 36 / 28, display-lg 82 /
  51 / 36, label-xs 20 / 14 / 12, body-lg 16 / 15 / 15, body-md 14 / 13 / 13, body-sm 12, chip 12
  / 11 / 11, list 20 / 16 / 15), so every size reads `s.*`. **No raw hex on any master**, and no
  effect but the pill's `Retro/Poster`. The hooks sit above the block, so the published row
  picking, the flow links and the pill needed nothing.
- **Every binding is a Lime key once `G.bg2` is `s.bg`** (Editorial's route under the seat): the
  card `sem/bg` lime at radius 50 (Lime's `u(50)`), no ring; the band `sem/text/1` (`s.ac`,
  pink) under `sem/bg` type (`G.bandInk ?? G.bg2`); the column heads `s.ac`; every row's 1px
  INSIDE foot rule `sem/stroke/1` — **violet** under the seat (trap 6), and the frame draws it, so
  `s.stroke1` is followed; the weekday, slot and price `sem/text/2` (`s.tx`); the chip `s.ac`
  under a `sem/bg` label; the pill `sem/text/2` violet round a `sem/bg` lime label and disc, its
  arrow and its 5 / 5 block `sem/text/1` pink — the twins' `BookPill` call unchanged.
- **The plan's two worries came out plain.** The head band has **no nested scheme at any width**
  (no `explicitVariableModes` on it in any master — Editorial's per-width `band` stays
  Editorial's), and its heading rule is `sem/stroke/2`, **pink on the pink band**: Lime's
  paints-nothing case, so `headRule` is `undefined` and the 20 of padding stays.
- **The marks are four colours, seated by row** (trap 4). They bind `sem/media` (teal,
  `POP_MEDIA`), `text/2` (violet, `s.tx`), `text/1` and `stroke/2` (pink, `s.ac` / `s.stroke2`),
  the same at all three widths, where Lime's and Editorial's four marks all bind `text/2`. The
  last three are not one colour, so this is a **row palette, not a pick state**: `G.marks[i %
  4]`, transcribed rather than patterned (the media rows' rule), by rendered row. The pick's cue
  stays the foot's chip (`notes/calendar.md`). `&n=8` cycles teal / violet / pink / pink; a booked
  row's mark dims with its row.
- **The pin is re-measured for Titan, and the frame's 350 is wider than it needs.** Every string
  of 12 × 31 swapped through the rendered mark span: the widest is **`MAR 06`, 259.2 at 1440**
  (82 × 0.82 × 0.98 = 65.66px) and **197.3 at 768** (49.98px), `JUN 12` 207.6 / 158.0. So the pin
  is `u(desk ? 317 : 198)` (259.9 / 198). The frame's 350 box is 287 on the canvas, so at 1440 the
  weekday and the column head's second cell stand at **423** (346.8 on the canvas) against the
  frame's 456 — the twins' named diff (Lime 407, Grunge 393, Editorial 458 at frame scale). At 768 the 350 is the
  leaked desktop number again: the weekday at 304 against 456. No pin at 390, where the mark stacks.
- **Titan sits 0.14em low at both display sites**, measured, not inherited (CONVENTIONS B's Pop
  row): an ink-row scan of the cap tops against the frame's Chunko put the marks (lh 0.89) 0.13 /
  0.12 / 0.13em low and the heading (lh 1) 0.13em low at the three widths. Both take `position:
  relative; top: -0.14em`, per site. Lifted, the marks' cap tops land at −0.003 / −0.02 / +0.014em
  against the frame's −0.012 / −0.02 / 0.0, and the heading's within 0.6px at every width (1.5 /
  1.6 / 2.6px against 1.6 / 2.0 / 2.0). **Titan's J descends where Chunko's does not**: lifted,
  the 390 JUL 05's tail ends 4px above the stacked weekday (ink 543–571, the weekday's box at
  574.9), so Editorial's `marginBottom` is not owed and the 390 rows are the master's 79.
- **The 390 foot is JP-100's rule, and Pop lands in Editorial's state**: Titan's START ENQUIRY
  pill is 201 against the master's 190, which leaves the line 44 beside the 57 chip, less than
  *Thursday*'s 58, so the line drops under the chip (two lines in 113). The foot is **98 on a
  picked day and 84 on the prompt**, against the master's 104, whose own line is squeezed to 54 and
  breaks inside *Thursday* (the leak JP-100 overrode). The pill fallback is not reached on the seed.
- **Measured against the masters' content edges** (harness, from the section root): desktop panel
  (45.9, 45.9) 1088.2 wide (1328 × 0.82 = 1089), the h2's box (unlifted, as are the narrow two) 94.6
  into it (115 × 0.82 = 94.3) at 36.26px,
  rows 85.8 (105 × 0.82 = 86.1), marks 59.6 tall (73 × 0.82 = 59.9), foot 82, chip 49.8 × 19.8
  (50.8 × 19.7), pill 195 × 44 with a 4.1 block (225 × 54 × 0.82 = 184.5 × 44.3); 768 panel 708 at
  (30, 56), h2 114.4 in (115), rows 77.4 (77), foot 100, chip 57.2 × 23 (58 × 23), pill 209 × 54
  (197); 390 panel 370 at (10, 40), h2 114.4 in (115), column head with *Availability ↓* flush
  right, rows 79.1 (79), pill 201 × 54 (190). **Named diffs, the twins'**: the seed prints
  AVAILABILITY on one line where the frame sets a two-line sentence, so the card is one heading
  line short (652.5 against 690.4 on the canvas; the published 1440 section **908** against 954);
  the pill reads `slotCta`'s START ENQUIRY in Titan against the frame's typo'd "Star Enquiry" in
  Chunko, 6% wide; the flow prints the page's own labels (JP-041); the weekday under the pin.
- **States, `live=1`** (puppeteer clicks, three widths): row 2 moves the chip and line to JUN 14 /
  *Saturday full day selected*, a second click falls back to the cued JUN 12, row 4 features JUL
  05; the pill is `<a href="#form">` live and a span on the canvas; `&booked=2025-06-12,2025-06-14`
  dims both rows to .38 (their teal and violet marks with them) with `cursor: auto` and no state
  change, and the foot prints *Pick a date to enquire*; `&today=2026-10-07` seeds OCT 07 … every
  row live; `n=0` prints *No dates yet.* at the twins' .38 violet on lime, faint but legible and of
  a piece with the dimmed booked rows, so kept; `n=8` draws eight rows with no overflow. No page
  error or warning.
- **The 571 cap re-measured in Titan with the frame's own sentence** (`&cj={"heading":"Find a date
  that works for your event"}`): two lines at 1440 (74 in the 468.2 cap) and 768 (72 in 571), the
  band 214.5 / 242.4 against the frame's 261 × 0.82 = 214 / 243. **At 390 it takes three lines**
  (84 against the master's 56 in its 350 box), the band 254.3 against 227: Titan's ~1.2% width
  tips the 350 measure. Named, not fitted — the seed is one word.
- **`FIELDS.calendar` under Pop** (`scripts/reach.mjs 4`, confirm-only): `heading`, `open` and
  `prompt` reach all four layouts (the `Pop: [0, 1, 2, 3]` heading row holds over the fitted
  card); `slots`, `dateLabel` and `availLabel` layout 2; `cta`, `types`, `tiers` and
  `who.location` layout 4; `image` and `time` 1 and 4; `email` 4 at 3/6 (the known partial).
  Nothing in `FIELDS` moved.
- **`page-check.mjs Pop 1`**: the modal's four cards, every nav, anchor and footer link on its id,
  the calendar's six probed controls all change state, `overflow390` 0, the burger 2 → 6, no
  console error or warning. The published calendar is 908 tall at 1440 and 730 at 390; the 1440
  seam clip shows pricing's white small print over the card's pink band.
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`**; theme 4 exactly
  calendar arch 1 at three widths on both surfaces (6 files), no `_arch_0_` file, no one-row file.
- **`notes/calendar.md`** now names Pop beside the three wherever its layout-2 sentences named the
  `s.limeTree` block's states (the past row's full ink — *reversed by JP-123*, user call,
  2026-10-09: a past row dims like a booked one, `layout-2-qa-fixes.md` — the dimmed booked row, JP-100's one-row
  foot), drops Pop from *Retro's foot never wraps* and JP-095 (a)'s ellipsis clause (both were
  Pop on Retro's body), and carries the marks bullet.
- **For the sweep's CLAUDE.md pass**: CLAUDE.md names no layout-2 calendar state (the dimmed row
  lives in `notes/calendar.md`, done here). Not written here.
- **For the map**: it stands on Scheme 1 (white) with **three nested schemes** — the travel card
  Scheme 3, `radius-map` Scheme 2, the `Map Viewport` Scheme 3 — so read each leaf's binding
  through `s.onScheme`, not `s.*`. Its Lime block (inside `EventsMap`'s `if (s.v1)`, after
  `stats`) has Grunge's `G` with Editorial's third arm, so Pop is a fourth. Its pager is the
  second layout-2 `Pager` caller: pass `frame.lime` with all seven keys read off the master
  (section 4's convention). Any display month there ("JUN") meets Titan's descending J.

### Settled in section 8 (the events map)

- **The block widened: `if (s.limeTree || s.pop)` inside `EventsMap`'s `if (s.v1)`, after
  `stats`, `const pop = s.pop`, `S2` / `S3` off `s.onScheme` under `ed || pop`, and a fourth `G`
  arm** (Lime's, Grunge's and Editorial's byte-identical), plus six `pop` sites: `display()`'s
  uppercase gate, a `lift` spread at five display strings, the venue city's face, the pill row's
  three wrap keys and the pager's `frame.lime`. No new leaf: every Pop key is one Editorial already
  reads through `??`. The tree is the twins' node for node, **123 = 123 = 123 at all three widths**
  (one walker call per master, bindings with their collection), on **Scheme 1 with the travel
  card and the `Map Viewport` on Scheme 3 and `radius-map` on Scheme 2** at every width
  (`explicitVariableModes`; `resolvedVariableModes` Desktop / Tablet / Mobile — no Device
  override). Every size is `THEME_RAMP.Pop`'s (Display/Title **28 / 22 / 20** in `G.title`,
  `vm.title` shadowing the ramp; list 20 / 16 / 15, body-sm 12, body-md 14 / 13 / 13, body-lg 16 /
  15 / 15, label-xs 20 / 14 / 12, chip 12 / 11 / 11). **No raw hex on any master, no effect on any
  node** — the map has no leak but the ring labels' run past the narrow viewports. The hooks sit
  above the block, so the published featuring, paging, zoom and links needed nothing.
- **Every leaf is Editorial's key read on Pop's schemes.** The travel card is `S3`: `box/1`
  `#FF63B8` (`G.card`) in a 1px `stroke/1` **violet** ring (`G.hair`), lettered `text/2` violet
  (`G.ink`), the chip and the stats row's two rules the same violet `stroke/1`, **solid** — so the
  stats row takes Lime's `hair` path and Editorial's dashed `statRule` stays unset; the pill
  `text/1` lime under a `sem/bg` pink label and disc round a lime arrow (`G.pillBg` / `G.pillFg`
  = `S3.ac` / `S3.bg`, BookPill's Lime branch) and Get Directions a 1px lime ring lettered lime.
  The rows stand on the page, Scheme 1's keys already: `box/1` `#F5F5F5` in a 1px `stroke/1`
  pink ring, violet type, the "In transit" chip ringed pink, the day tile `box/1` at
  `s.radiusChip` 8. The panel is `S2`: `box/1` `#D7FF23` (`G.panel`), the status pill `sem/bg`
  lime under `text/1` pink (`G.status` / `G.statusFg`, the dot too); the featured venue, the city,
  "Updated", the terms and EXPAND VIEW `text/2` — Scheme 2's violet is Scheme 1's to the byte, so
  `G.feat` stays unset and the panel's inherited `s.tx` stands; the map container and the foot rule
  `stroke/1` violet (`G.frame`). Inside the viewport, `S3`: the rings, the ring labels' fill, the
  centre disc and its tail `sem/bg` pink (`G.acc`), the labels' type, the disc's 2px ring and its
  glyph `text/2` violet (`G.ink` again), the zoom `box/2` `#F0138C` (`G.zoom`) in the violet
  ring. **Radii**: card, rows and panel **30** at every width (`G.r`, `G.panelR`), the map
  container **8 / 19 / 19** (`G.mapR`). The viewport's shape is the masters' stated **588 × 471,
  318 × 527, 346 × 305** (`G.aspect`).
- **The plate stands a fourth time**: the viewport states no fill, the texture is `e089bd11` at
  `FILL`, and the frame's render samples (42.8, 44.2, 29.4) / (40.4, 41.9, 28.0) / (42.1, 43.3,
  29.2) in three ring-free corners — Retro's `#292A1C`.
- **The frame's own dots are followed, the lit pin redrawn** (Editorial's reading): Pop's five dots
  are `S3` `text/2` violet at .6 and read on the plate (sampled (80, 43, 164)), so `G.dot` /
  `G.dotOp`; the lit pin is the centre marker's own pair, a pink disc in a 2px violet ring at 16.
  **EXPAND VIEW's arrow is `S2`'s `sem/bg`, lime on the `#D7FF23` bar** — faint but drawn
  (sampled `#C6F200`), followed as Editorial's taupe-on-taupe was (`G.arrow`, reversible in one
  line).
- **The venue city keeps the frame's Body/MD — Editorial's departure, widened to Pop.** The frame
  binds Inter `size/body-md` at all three widths, as every twin's does; Lime and Grunge normalise it
  to Display/List. Under Pop that broke the seeded canvas at 768: Titan's uppercase MANCHESTER is
  **109.4** in the 105 column, so it wrapped "MANCHESTE / R" (`overflowWrap: anywhere`). The home
  location stays Display/List (the frame's `size/list`) and wraps between words, "MANCHESTER, /
  UK", at 768 and 390, where the frame runs it past the 768 column (136 in 105) and wraps it at
  390 — JP-096's named run.
- **The 768 pill row wraps — Editorial's override, widened to Pop.** The 768 frame's pill is
  21 + 91 + 10 + 46 + 5 = 173 in a 146 half, VENUE LIN clipped under the disc; Titan's needs 176,
  and BookPill does not clip, so the disc stood over Get Directions (whose label wrapped to two
  lines in 121). Under `ed || pop` both pills keep `fit-content` and the row wraps: **at 768
  alone** they stack full-width and the card is 414.3 tall against 333; desktop halves at 247.5 /
  245.8; 390's 330 holds 169.9 + 10 + 147.3 on one row.
- **Titan sits 0.11–0.17em low, so five display strings take the 0.14em lift** (`lift`, one
  spread): the h2, the home location, each row venue, the panel's h3 and Get Directions (its label
  wrapped in a span, since the element is the ring). An ink-row scan of the h2 and the venues put
  the cap tops 2.44 / 2.82 / 3.4px under the frame's Chunko (`absoluteRenderBounds`: 3.12 × 0.82 /
  2.38 / 1.8 off the box) at the three widths; lifted, 0.7 high / 0.4 high / 0.46 low. Venue Link
  is BookPill's own label and is not lifted, as no Pop BookPill is. **Titan's J needs no clip
  reach**: `&cj=` with *Jumpin Jacks*, *The Junction* and *Jam Jar Joinery*, DPR 2 — the row
  venue's J ends 1.3px inside its lh-1.1 ellipsis box at 1440 and on its last row at 390, and the
  same row with Editorial's `paddingBottom: 0.1em` reach tried, so the foot is the glyph's, not the
  clip's; the reach was reverted. No display month here: the row month is Inter.
- **The pager wears the repertoire's dress** (section 4's convention, turned round): no Pop map
  master draws a pager at any width, so `Pager`'s Pop arm (layout 1's Scheme 6 seat) is not the
  frame's and the block passes the one pager this page *does* draw on Scheme 1 — the repertoire's
  seven keys: violet `s.tx` pages, lime `s.chips[0].bg` arrows ringed `POP_REP.pale`, a violet
  glyph, `POP_REP.song` numerals, the current page `s.ac` pink under `POP_REP.paper` (CONVENTIONS
  C, *a twin's frame-less control is checked against its own surround*: on white it reads, shot
  at `n=30`). `Pager` is untouched, so layout 1's map a2 did not move.
- **The ring labels follow the frame past the narrow viewports** (open question 6): 120mi runs
  off both at 786.6 / 414.6 (the frame's 785.5 / 413.5) and 60mi half off at 768, clipped by the
  viewport as the masters clip them — the twins' JP-040 reading.
- **Measured against the masters' content edges** (harness, from the section root): desktop root
  **662.3** (808 × 0.82 = 662.6), card 534.3 × 282.7 (652 × 345 × 0.82 = 534.6 × 282.9), rows
  58.2 (71 × 0.82), panel 534.3 × 569.7 (570.7), viewport 481.9 × 386 (482.2 × 386.2), labels at
  908.1 / 973.7 / 1045.7 (908.2 / 973.8 / 1045.5); 768 viewport 318 × 527, labels 618.5 / 698.5 /
  786.6 (618 / 698 / 785.5); 390 card 345.7 (347), viewport 346 × 305, labels 246.5 / 326.5 /
  414.6. **Named diffs, the twins'**: the 768 card 414.3 against 333 (the stacked pills, and the
  home value on two lines); the narrow rows hug at 64 / 61.8 where the masters divide their
  columns into 75.8 / 72.3 (Retro's declined residue); the terms line wraps in the narrow bar, so
  the panels are 719.3 / 495.1 against 703 / 479; the 768 row venues ellipsise ("THE DEAF
  INST…"); the seed's h2 is the heading (MANCHESTER) where the frame types VENUE DISTANCE, and
  the chip the gig's date (JP-060), as JP-095 (b) named.
- **`live=1`** (puppeteer, trusted clicks, 1440 and 390, `n=8`): a row click features its gig and
  the list rebuilds as the page minus it; a pin click features its gig and lights its pin (13.1 /
  16); `+` scales the layer to 1.25; `n=30`: Next features gig 6, marks page 2 pink and lists
  #7–#10, and Venue Link flips span → `<a>` on a linked gig; `n=0` prints *No dates yet.* with no
  rows and no pager; `n=1` draws no list and no pager. No page error or warning.
- **`page-check.mjs Pop 1,0,2,3`**: the modal's four cards; Gigs → `#map` and every other nav,
  anchor and footer link on its id; the player plays; the map's rows and pins change state;
  `overflow390` 0; the burger 2 → 6; no console error or warning on any card. The published 1440
  map is **808** tall (808); its seam clip shows the calendar's lime card closing over the white
  map root, 112 above the travel card (the calendar's 56 foot and the map's 56 top).
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`**; theme 4 exactly map
  arch 1 at three widths on both surfaces (6 files), no `_arch_0_` file, no one-row file.
- **`FIELDS.map` has no template-keyed `in` row**, so no `reach.mjs` run was owed; a
  confirm-only `reach.mjs 4` over the fitted block reports JP-040's `status`, `updated` and
  `expand` at layouts 2 and 3 and `rings` at 2–4, JP-095 (b)'s nine labels at 2 alone, `kicker`
  1–3, `listLabel` 1–2, `base` 1 and 3, and `who.location` reaching map layout 2 — every design
  6/6. The only partials are the known four (`bio.tagsLabel`, `calendar.email`,
  `gallery.railLabel`, `header.cta2`). Nothing in `FIELDS` moved.
- **For the sweep's CLAUDE.md pass**: the `s.live` list's *"its map zoom (layouts 3 and 4, and
  Lime's, Grunge's and Editorial's layout 2)"* owes Pop — its layout 2 reads `zoom` through the
  widened block now. `notes/map.md` already names Pop beside the three (the compact pager and its
  dress, the plate, `zoom`, the venue city's face and the 768 pill row). Not written here.
- **For the form**: it is seated on **Scheme 4 at every width** (`form: 4`), a full-bleed blue
  band, so `s.bg` is blue, `s.ac` teal, `s.tx` yellow and `pillBg` teal (session 0 found its flat
  sheet teal and its card `paper` yellow); its sidebar card is a **nested Scheme 2** (lime, so its
  `pillBg` pink — the Check Availability pill — and `stroke1` violet, trap 6), and its promises and
  credit bind `text/3`, white. Its Lime block (`if (s.v1 && s.limeTree)` ahead of
  `EnquiryForm`'s `if (s.v1)`) has Grunge's `G` with Editorial's third arm, so Pop is a fourth.
  The four label-in-box inputs keep `--ph: 1` (JP-093); the credit avatar is Lime's leak (open
  question 3).

### Settled in section 9 (the enquiry form)

- **The block widened: `if (s.v1 && (s.limeTree || s.pop))` ahead of `EnquiryForm`'s `if (s.v1)`,
  `const pop = s.pop`, `S2 = s.onScheme[2]` and a fourth `G` arm ahead of Editorial's** (Lime's,
  Grunge's and Editorial's byte-identical), plus five `pop` sites: `disp()`'s uppercase, the
  heading's positional split and its cap gate, the heading's lift and the two-tone stars' gate.
  Five new leaves fall back through `??` or are absent on the twins — `tick`, `cardInk`,
  `cardHead`, `star` and `badRing` (Editorial's, now read on the ring path too, `G.badRing ??
  ink`). The tree is the twins' node for node at all three widths (one walker call per master,
  bindings with their collection), on **Scheme 4 with no Device override**
  (`resolvedVariableModes` Desktop / Tablet / Mobile) and the card **explicitly Scheme 2** at
  every width. Every size is `THEME_RAMP.Pop`'s (display-sm 36 / 29 / 24, list 20 / 16 / 15,
  label-sm 16 / 13 / 12, label-xs 20 / 14 / 12, body-sm 12) but Display/Title, **28 / 22 / 20**
  in `G.title`. **No raw hex on any master and no effect on any node** — the form's only leak is
  the credit avatar (open question 3). The live seam is hoisted above the block, so nothing was
  owed.
- **Lime's one ink is three here.** The block cascades `ink` from the sheet into the promises,
  the credit and the card; under Pop those are three bindings: the sheet's `text/3` **white**
  (`G.ink = s.text3` — the promises, the name, the role), the ✓ `text/2` **yellow** (`G.tick =
  s.tx`, applied only where defined) and the card's `text/2` **violet** (`cardInk = G.cardInk ??
  ink`, `S2.tx` — the unit, the count, the box labels, the prompt, the note and the sent state).
  The head is `text/1` teal (`s.ac`, the twins' `G.head`); the price and the stars the card's
  `text/1` pink (`G.cardHead`, `G.star`, `S2.ac` — widening the stars' gate alone would have
  painted them teal). The root paints the blue `sem/bg`, so `G.sheet` is Grunge's `undefined`.
- **The card is `box/1`, not the scheme's ground** — `#D7FF23`, where Scheme 2's `sem/bg` is
  `#C6F200` — so *a card on another scheme is `s.bg`* (section 3) does not apply: `G.mist =
  S2.box1` in a 1px `S2.stroke1` **violet** hairline (trap 6) at radius 50, Lime's shape; every box
  the same fill and ring at `radius/pill`, Grunge's **42 / 38 / 37**. The pill is `text/1` pink
  round a `sem/bg` lime label and disc and a pink arrow (`S2.ac` / `S2.bg` / `S2.bg` / `S2.ac`) —
  two limes, both bound, so both drawn. The photograph is `box/2` `#1553ED` in a **4px** `text/1`
  teal INSIDE ring (`u(4)`; the twins' 1px), radius 50, no glow; the avatar's well `sem/bg` blue.
  The plan's "the Check Availability pill is Scheme 2's `pillBg`" was a guess: it binds `text/1`,
  which is pink too; the block reads no `pillBg`.
- **The refused box is pink.** The idle ring is 1px of **full** violet, so Lime's rule (2px of
  `ink`) would have been weight alone (CONVENTIONS C, *a refused box changes colour, not weight
  alone, when the idle ring is already full ink*): `G.badRing = S2.ac`, 2px of the card's own
  pink, the price's and the pill's colour. No frame draws the state. Reversible in one line.
- **The head needs no fit** (`vm.titleWordEms` checked against its column, not read): Titan ×
  0.98 sets the widest word UNFORGETTABLE. at 8.81em — 260 / 256 / 212px against the 686 / 334
  / 370 columns — and the second line at 15.18em, **448 in 686** (two lines), **440 past 334**
  (it wraps at the word: three lines, the frame's own 87) and **364 in 370** (two lines, 6 to
  spare). So the twins' positional split, words one and two a block, the rest a second, gives the
  frames' 2 / 3 / 2 at 60 / 87 / 48 tall; Lime's 9em / 5.2em caps are gated off with Grunge's and
  Editorial's. A longer typed word wraps inside itself (`break-word`), the twins' rule.
- **The head is lifted 0.14em** (CONVENTIONS B's Pop row, measured): an ink-row scan against the
  frame's Chunko put Titan's lines 4px low at 768 (29px, 0.138em) and 3px at 390 (24px, 0.125em),
  cap tops and feet alike. Lifted, lines two and three land on the frame's rows exactly at both
  widths (31–50 / 60–79 and 25–41 off the box). **Nothing else is lifted**: the price sits 1px
  low and the name within 1px; the pill's label 2px low, as every Pop pill label is left; and the
  box labels cannot be — live they are the input's placeholder, and a lifted canvas span would
  part from it (JP-093's agreement).
- **Measured against the masters' content edges** (harness, from the section root): desktop root
  **636.3** (784 × 0.82 = 642.9, less the twins' `gPad` 46 against 49.2 at both ends), photo
  686.2 × 358.3 at 46 (687.2 × 358.3), h2 at 428.9 on two lines 60, card 369 × **305.8** at x 765
  (450 × 373 × 0.82 = 369 × 305.9), boxes 329.6 × 34.4 on a 42.6 pitch (402 × 42, 52 × 0.82), the
  price at 784.7; 768 root **854.9** (856), photo 334 × 437 at (30, 60), h2 at (30, 527) on three
  lines 87 (87), card at (404, 60) 334 × **354.4** (354), boxes 286 × 38 on 48 at 157.6 (157), the
  price at (428, 88) (428, 88), the name at 751.5 (752.5); 390 root **910.8** (910), photo 370 ×
  262 at (10, 40), h2 at 332 on two lines 48 (48), card at 520.4 370 × 350.4 (521, 349), boxes 322
  × 37 on 47 at 617 (616), the note at 826 (825). **Named diffs, the twins'**: the seed types *DJ ·
  Live Act* where the frame types *DJ · Live band*; the credit avatar keeps the seed (open question
  3). The seeded three boxes are the frame's three (`FORM_FIELDS_CARD`, JP-070), so the card is the
  frame's height to the pixel — no box-count diff this time.
- **States**: `&noimage=1` gives the avatar white `KM` on its blue well, and `&cj={"photo":null}`
  the stage white `KM` on `#1553ED` in its teal ring — both read, so `Photo`'s `ink` stays `G.ink`.
  `&n=0&promises=` is the card's price, stars, pill and line with the credit at the row's end;
  `&n=8` grows the card (518.7 / 594.4 / 585.4) with nothing overflowing.
- **`live=1`** (puppeteer, typed and clicked, three widths): every placeholder reads `--ph` **1**
  in violet; an empty submit rings all three boxes in 2px pink with the heights unchanged (34.4 /
  38 / 37) and prints the prompt; typing clears its box's ring; the subject is the bare *Enquiry*
  with the three values in the body; a valid submit behind a capture-phase intercept swaps in the
  sent card (CHECK YOUR MAIL APP, uppercased by `disp()`); *Write another* restores the typed
  values; every box hit-tests to itself; no page error or warning.
- **`page-check.mjs Pop 1,0,2,3`**: the modal's four cards; every nav, anchor and footer link on
  its id (*Start Enquiry*, *Enquire about a date* and Book Now → `#form`); the player plays;
  `overflow390` 0; the burger 2 → 6; the published form refuses in 2px pink and composes; no
  console error or warning on any card. The published 1440 form is **777** tall (784, the `gPad`
  diff zoomed); the seam clips show the white map closing on a straight edge over the blue band at
  1440, and the band closing over the white testimonials at 390 — the frames' own adjacencies.
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`**; theme 4 exactly form
  arch 1 at three widths on both surfaces (6 files), no `_arch_0_` file, no one-row file.
- **`FIELDS.form` has no template-keyed `in` row**; a confirm-only `scripts/reach.mjs 4` (5,880
  renders) over the fitted block reports `button` and `messageLabel` at form layouts 1 and 4,
  `promises` and `who.kicker` 1 and 2, `typeLabel` 1, `steps` and `sub` 4 — each design whole,
  Pop's layout-1 table unchanged. The only partials are the known four (`bio.tagsLabel`,
  `calendar.email`, `gallery.railLabel`, `header.cta2`). Nothing in `FIELDS` moved.
- **`notes/form.md`** now names Pop in the layout-2 sentences (the band, the Scheme 2 card, the
  pink refusal, the two-tone stars).
- **For the sweep's CLAUDE.md pass**: CLAUDE.md names no layout-2 form state (the refused ring
  and the band live in `notes/form.md`, done here); JP-093's `--ph` sentence holds as written.
- **For the testimonials**: the page is Scheme 1 white with the big card nested **Scheme 2**
  (`s.onScheme[2]`, lime, its `stroke1` violet — trap 6) and the picked rail tile **Scheme 3**
  (pink, ringed violet); the head is ~~**`Display/XL` 125 / 75 / 46**~~ *`Display/LG` 82 / 51 /
  36, the twins' token (section 10)*, one tone in violet ~~, which every twin set at `Display/LG` —
  check it against its column (`vm.titleWordEms`, Titan's ems) before choosing~~, and scan its
  glyph floor; `TESTI_HEADING_2` is the fallback at `d === 1`; the
  Book pill is Scheme 1's `active/bg`, **black**; the 390 sub is a 411-wide no-wrap line (open
  question 6). Its Lime block (inside `Testimonials`' `if (s.v1)`, after `rail`) has Grunge's `G`
  with Editorial's third arm, so Pop is a fourth.

### Settled in section 10 (the testimonials)

- **The block widened: `if (s.limeTree || s.pop)` inside `Testimonials`' `if (s.v1)`, after
  `rail`, `const pop = s.pop`, `S3` off `s.onScheme[3]` under `ed || pop`, `S2` under `pop`, and a
  fourth `G` arm** (Lime's, Grunge's and Editorial's byte-identical), plus four `pop` sites:
  `dispType`'s uppercase, the h2's `pre-wrap` and its lift, and the tiles' sizing (Editorial's
  arms widened to `ed || pop`, `DashRule` and `position: relative` left on `ed`). Four new leaves
  fall back through `??`: `tileOn`, `tileOnInk`, `tileOnHair` and `ringW`. The tree is the twins'
  node for node, **26 = 26 = 26 at all three widths** (one walker call per master, bindings with
  their collection, and a paired read of Lime's and Editorial's desktop spacing — every gap and
  padding the same three ways), on **Scheme 1 with the card on Scheme 2 and the picked tile on
  Scheme 3** (`explicitVariableModes`; `resolvedVariableModes` Desktop / Tablet / Mobile, no
  override). Every size is `THEME_RAMP.Pop`'s (display-lg 82 / 51 / 36, display-xl 125 / 75 / 46
  on the glyph, list 20 / 16 / 15, body-lg 16 / 15 / 15, body-md 14 / 13 / 13, body-sm 12). **No
  raw hex on any master, no effect, no rotation.** The seam is shared whole, so the published
  rail and pill needed nothing.
- **The head is `Display/LG`, not the plan's `Display/XL`.** All three masters style the h2
  `Display/LG` at lh 0.89, the twins' token (146 / 90 / 96 tall: two / two / three lines); the 125
  / 75 / 46 is the quote glyph's `Display/XL`. So the plan's fit question has no site — the head
  is one tone, on the ramp, and `vm.titleWordEms` is not read. Corrected in *Sizes* and the
  section-9 hand-off above.
- **Every leaf is a binding.** The eyebrow, head, sub, idle marks and every string on both cards
  `sem/text/2` violet (`s.tx`; Scheme 2's and Scheme 3's `text/2` are the same `#6B2CFF`, so
  `G.ink = S2.tx` and `G.tileOnInk = S3.tx`). **The card is `S2.box1` `#D7FF23`, not `S2.bg`**
  (section 9's convention, the second Scheme 2 card to bind it), in a **3px** INSIDE `stroke/1`,
  violet under the seat (trap 6), radius 50. **The picked tile is not the card**: the twins' pick
  is the card's own fill, Pop's is Scheme 3's pink `box/1` `#FF63B8` in its own 3px violet
  `stroke/1` — hence the three `tileOn*` leaves. The idle tiles are the twins' keys, `s.box1`
  `#F5F5F5` ringed `s.ac` pink, at **3px** (`ringW`, `3 × z`: 2.5 on the canvas, 3 narrow), radius
  **31**. The pill is the twins' call as it stands: `sem/active/bg` black (`s.pillBg`) under a
  `sem/tag/2/text` `#F6F0E8` label and disc (`s.chips[1].fg`, Grunge's and Editorial's key) round a
  black arrow — BookPill's Lime branch paints the disc in `fg` and the arrow in `bg`.
- **Every tile FILLs both axes — Editorial's mechanism, not the twins' hug** (`layoutSizing` `FF`,
  grow, at every width, read before inheriting). So under `ed || pop` the column takes every
  tile across it with the frame's own **95 / 90** as its floor (77.9 on the canvas; the seeded
  marks sit under it) and the 390 row divides into equal parts, `flex: 1 1 0` with
  `minWidth: 'min-content'`. Seeded, the five 390 tiles are 64.4 each; at `n=8`, 35.8, every mark
  inside its ring.
- **The head keeps its typed break and wraps on the ramp — Editorial's call, at 768.** Titan's
  FROM PEOPLE WHO BOOKED is **911** in the 1088 column at desktop (the frame's Chunko 1111 × 0.82 =
  911 — two lines, the frame's) and three lines at 390 (the master's three), but **715.4 in the
  708 column at 768**, where Chunko sets 691: BOOKED drops to a third line (136.2 against the
  frame's 90). Fitting it would be 49.46px against the ramp's 49.98 (−1%) on a line-ems key no vm
  key gives, so it is named, as Editorial named its desktop third line. **Kept as named (user
  call, 2026-10-05).** Reversible in one `fontSize`.
- **The head is lifted 0.14em** (CONVENTIONS B's Pop row, measured): an ink scan against the
  frames put Titan's cap tops **0.154 / 0.144 / 0.147em** low at the three widths at lh 0.89.
  Lifted, they land 1.1 / 0.2 / 0.2px under the frame's rows. **Nothing else is lifted**: the
  glyph's ink top meets its box's top to the pixel at every width (Titan's ” is a taller drawing
  than Chunko's slab, 0.33em of ink against 0.15); the marks sit 1.6 / 1.6 / 0.9px low and the
  reviewer's name 1.2 / 0.9 / 0.7px at lh 1.2 — the repertoire's titles' case, left; the pill's
  label is left as every Pop pill label is.
- **The 390 sub wraps (open question 6, the last item)** — the twins' `<p>`, Retro's reading of
  the leak: the master's no-wrap line is **431** wide (x −20.5, not the plan's 411), and nothing
  in its layout depends on it. Two lines, 39 tall.
- **Measured against the masters' content edges** (harness, from the section root): desktop
  eyebrow at 45.9 (56 × 0.82), column **77.9** (95 × 0.82), card **984.1 × 246.2** at x 150 (1201 ×
  0.82 = 984.8), glyph 57 × 45.9 (67 × 55.91 × 0.82 = 54.9 × 45.8), pill **155.5 × 44.3** (191 × 54
  × 0.82 = 156.6 × 44.3); 768 root **729.2** (730) — the extra head line paid back by the seeded
  quote's one line — column 90 (90), card 586 wide at x 152 (152), pill 170.2 × 54 (169 × 54); 390
  card 370 wide, tiles 64.4 × 90 (108.67 × 90 for the frame's three), pill 164.7 × 54 (164 × 54).
  **Named diffs, the twins'**: the seed's five reviews to the frame's three and its quote on 1 / 1
  / 2 lines against 2 / 3 / 5, so the desktop root is 603.9 against 762.9 × 0.82 = 625.6 and the
  390 790.2 against 842; the 390 `padX` 10 against the master's 20 (JP-038), so the column is 370;
  canvas tile 0 lit where the frame lights the middle (`cur`'s pinned 0); the foot's 12 gap where
  every master (the twins' too) sets 16 — the twins' own, inherited; the 768 head's third line.
- **States**: `n=0` keeps the card with *No reviews yet.* in violet on lime and no rail; `n=1`
  draws no rail and the card takes the width (1088.2 / 708 / 370); `n=8` divides the desktop column
  into eight tiles and sets the 390 row on one line at 35.8; the root's `scrollWidth` is its width
  at every count and width.
- **`live=1`** (puppeteer, trusted clicks, 1440 and 390): tiles 3, 5, 5 again and 1 move the pink
  fill with the card (HANNAH L. → DAN WHITFIELD → OLIVIA B., idempotent, → HANNAH L.); every tile
  hit-tests to itself; the tiles carry a pointer live and `auto` on the canvas; the pill is
  `<a href="#form">` live and a span on the canvas; no page error or warning.
- **`page-check.mjs Pop 1,0,2,3`**: the modal's four cards; every nav, anchor and footer link on
  its id (the testimonials' Book Now → `#form`, the footer's *Reviews* → `#testimonials`); the
  player plays; the rail's idle tiles change state; `overflow390` 0; the burger 2 → 6; no console
  error or warning on any card. The published 1440 testimonials is **737** tall (the seed's); its
  seam clips show the blue form band closing on a straight edge over the white testimonials and
  the white testimonials over the pink footer, at 1440 and 390 — the frames' own adjacencies.
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`**; theme 4 exactly
  testimonials arch 1 at three widths on both surfaces (6 files), no `_arch_0_` file, no one-row
  file.
- **`FIELDS.testimonials` has no template-keyed `in` row** (`heading` `[1, 2, 3]`, `sub` `[1, 2]`,
  `stars` and `cta` `[1]`, `kicker` `[1, 2]`, every one drawn by the widened block), so no
  `reach.mjs` run was owed.
- **`notes/testimonials.md`** names Pop beside Editorial in the tile sentence (no tile wide; the
  pick its Scheme 3 pink and 3px violet ring, not the card's fill) and beside Grunge and Editorial
  in the `pre-wrap` clause (the long line wrapping on the ramp at 768).
- **For the sweep's CLAUDE.md pass**: CLAUDE.md names no layout-2 testimonials state (the tile
  and the head live in `notes/testimonials.md`, done here). Not written here.
- **This was the last section.** The footer is layout 1's and closed at planning time, so the next
  session is the end-of-pass sweep.

### Inherited and used

*(The running list the sweep folds into [`../CONVENTIONS.md`](../CONVENTIONS.md): each time a
session leans on a bullet from Pop layout 1's, Editorial's, Lime's, Grunge's or Retro's
Conventions, name it here in one line, with the plan it came from, a blank line between sessions.)*

- Session 0: *the digest is committed* (lime/layout-1) — 1320 renders a side, five themes, canvas
  and live; *a section's colour scheme is resolved in `sectionVm`* (editorial/layout-1) and *a card
  on another scheme reads that scheme's keys* (editorial/layout-2) — Schemes 5 and 8, row 1 and
  `pageBg` round the two lime cards, data only.

- Section 1: *the node walker, kept* (grunge/layout-2) with bound names and their collection
  (*a node can name another scheme's variable outright*, editorial/layout-3 — the capsule's and
  the place card's rings); *read a scheme per master* (editorial/layout-2 — the nav pill 3 / 3 /
  4); *a nested node reads that scheme's keys* (editorial/layout-2 — `[3]`, `[4]`, `[6]`); *a
  hard offset shadow goes through the caller's `style`* (lime/layout-2); *a frame's inside stroke
  is an inset `boxShadow`* (lime/layout-2 — the 8px and 2px rings); *a stand-in face's glyph
  floor* (editorial/layout-3, Pop layout 1's 0.14em, pixel-scanned); *place a seal by its disc's
  centre* (lime/layout-1 — the sun); *a widened block can need no `G`* (grunge/layout-3); *one
  five-theme digest is the whole proof for a shared-helper change* (lime/layout-1 — `PopDots`,
  `LimePin`); *field reach is measured* (CLAUDE.md); *the whole-page published check*
  (lime/layout-1) and *the popup is `about:blank`* (memory) — the 768 overflow measured in the
  popup with the clip removed as the positive control.

- Section 2: *the node walker, kept* (grunge/layout-2) with bound names and their collection (*a
  node can name another scheme's variable outright*, editorial/layout-3 — the chips' `scheme/1/tagN`
  and the pill ring's `scheme/1/stroke/2`, Scheme 1 being the seat); *a nested node reads that
  scheme's keys* (editorial/layout-2 — the pill's `[4]`); *a hard offset shadow goes through the
  caller's `style`* (lime/layout-2 — at all three widths here); *a hand-scaled instance is not the
  ramp* (lime/layout-2 — the Tags row); *a widened block can need no `G`* (grunge/layout-3); *a
  frame's inside stroke is an inset `boxShadow`* (lime/layout-2 — the 4px ring); *leaked tops are
  followed where they show* (lime/layout-1 — the credit box's height, never its width); *a seeded
  page cannot show an empty slot* (lime/layout-1 — `&noimage=1` found the violet-on-violet
  initials); *field reach is measured* (CLAUDE.md).

- Section 3: *the node walker, kept* (grunge/layout-2) with bound names and their collection (*a
  node can name another scheme's variable outright*, editorial/layout-3 — the discs' and the
  Section's `scheme/1/stroke/2`); *read every nested node's scheme off the master*
  (grunge/layout-3 — ten nodes on six schemes); *a nested node reads that scheme's keys* and *a
  card on another scheme is `s.bg`* (editorial/layout-2); *a frame's inside stroke is an inset
  `boxShadow`, on an overlay where an image paints over it* (lime/layout-2 — the rows' and the
  discs' 4px); *a stand-in face's glyph floor* (editorial/layout-3, Pop layout 1's 0.13em at lh
  0.89, pixel-scanned); *a twin's width-bound call is re-measured in the new face*
  (editorial/layout-2 — Lime's 4.6em dropped, Grunge's 251 kept); *a leak that shows and reads as
  a defect is overridden* (grunge/layout-1 — the 390 titles); *a seeded page cannot show an empty
  slot* (lime/layout-1 — `&n=8`'s art-less wells); *a widened block can need no `G`*
  (grunge/layout-3); *field reach is measured* (CLAUDE.md).

- Section 4: *the node walker, kept* (grunge/layout-2) with bound names and their collection,
  its raw paints the leak list; *where the seam lives inside the branch, the block goes after
  the seam* (lime/layout-1); *a widened block can need no `G`* (grunge/layout-3); *rows pin at
  each master's division result* (D2, re-pinned 86 / 84.2 / 60.6); *a frame's inside stroke is
  an inset `boxShadow`, on an overlay where a child paints over it* (lime/layout-2 — the sheet's
  ring); *a twin's redrawn state or live mechanism is read against this frame* (editorial/layout-2
  — the pager's mark, the frame's own, followed); *leaked tops are followed where they show*
  (lime/layout-1 — the three pager hexes, through layout 1's `POP_REP`); *a stand-in face's glyph
  floor* (editorial/layout-3 — the head's 0.14em measured at lh 1, the titles' ~1px left);
  *field reach is measured* (CLAUDE.md — no row owed).

- Section 5: *the node walker, kept* (grunge/layout-2) with bound names and their collection (*a
  node can name another scheme's variable outright*, editorial/layout-3 — the hero's
  `scheme/1/stroke/2`); *a frame's inside stroke is an inset `boxShadow`, on an overlay where an
  image paints over it* (lime/layout-2 — the hero's 5px; the tiles keep the twins' border);
  *a frame's image anchor is evidence for its own photograph only* (editorial/layout-2 — the
  hero centred on its own slot alone); *read a fill's `scaleMode` … correlate the render with
  the seed* (grunge/layout-2 — the `FILL` swept); *on a page where `s.muted` does not read, an
  empty slot on a dark well needs `Photo`'s `ink`* (editorial/layout-2 — white on black); *a
  twin's frame-less control is checked against its own surround* (editorial/layout-3 — the pick
  ring re-inked lime); *a leak that shows and reads as a defect is overridden* (grunge/layout-1 —
  the 390 wrapper's stray capsule, the 768 1px tiles); *a seeded page cannot show an empty slot*
  (lime/layout-1 — `&n=0`); *field reach is measured* (CLAUDE.md — no row owed).

- Section 6: *the node walker, kept* (grunge/layout-2) with bound names and their collection (*a
  node can name another scheme's variable outright*, editorial/layout-3 — the rule's
  `scheme/6/stroke/1`); *`get_variable_defs` mixes nested schemes in one list; the fills settle
  which node is on which* (lime/layout-1 — Scheme 7's red and yellow beside Scheme 1's white);
  *the `G` lookup at the block's head* (grunge/layout-1 — a fourth arm, new leaves through `??`);
  *a nested node reads that scheme's keys* (editorial/layout-2 — `[7]`, `[6]`); *a twin's
  redrawn state is read against this frame* (editorial/layout-2 — the pick followed, its label
  asked); *Figma auto-layout spaces a rotated child by its rotated bounding box — read it per
  master* (memory: `figma-frame-reading` — the rotated box at all three here); *a frame's inside
  stroke is an inset `boxShadow`* (lime/layout-2 — the card's 4px, the narrow root's 1px
  overlay); *a stand-in face's glyph floor* (editorial/layout-3 — 0.14em, ink-scanned); *a
  twin's frame-less control is checked against its own surround* (editorial/layout-3 — the empty
  message); *the popup is `about:blank`* (memory — `scrollWidth` read in the popup).

- Section 7: *the node walker, kept* (grunge/layout-2) with bound names and their collection —
  the marks' four keys; *the `G` lookup at the block's head* (grunge/layout-1 — a fourth arm,
  `marks` through `??`); *a card on another scheme is `s.bg`* (editorial/layout-2 — `G.bg2`);
  *the pin is re-measured per face* (D2; Retro 2's *measure the pin, never transcribe it* —
  317 / 198 in Titan); *a stand-in face's glyph floor* (editorial/layout-3 — 0.14em at both
  sites, ink-scanned, the J checked at 390); *a hard offset shadow goes through the caller's
  `style`* (lime/layout-2 — the twins' own call); *a twin's width-bound call is re-measured in the
  new face* (editorial/layout-2 — JP-100's foot, Titan's pill dropping the line under the chip);
  *a twin's frame-less control is checked against its own surround* (editorial/layout-3 — the
  empty message, kept); *field reach is measured* (CLAUDE.md).

- Section 8: *the node walker, kept* (grunge/layout-2) with bound names and their collection —
  three schemes in one section; *read every nested node's scheme off the master*
  (grunge/layout-3 — 3 / 2 / 3 at all three widths); *the `G` lookup at the block's head*
  (grunge/layout-1 — a fourth arm, no new leaf); *a nested node reads that scheme's keys*
  (editorial/layout-2 — `[2]`, `[3]`); *a twin's width-bound call is re-measured in the new face*
  (editorial/layout-2 — the venue city's Body/MD and the 768 pill row, both Editorial's
  overrides widened); *a stand-in face's glyph floor* (editorial/layout-3 — 0.14em at five
  strings, ink-scanned; the J tested with `&cj=` and found unclipped); *a twin's redrawn state or
  live mechanism is read against this frame* (editorial/layout-2 — the dots followed, the lit pin
  redrawn, EXPAND VIEW's arrow followed); *a twin's frame-less control is checked against its own
  surround* (editorial/layout-3 — the pager in the repertoire's dress); *leaked tops are followed
  where they show* (lime/layout-1 — the ring labels past the narrow viewports); *the raster:
  Retro's call is followed* (D2 — the plate sampled a fourth time); *the whole-page published
  check* (lime/layout-1); *field reach is measured* (CLAUDE.md — confirm-only).

- Section 9: *the node walker, kept* (grunge/layout-2) with bound names and their collection —
  two schemes, Scheme 4 and the card's 2; *the `G` lookup at the block's head* (grunge/layout-1 —
  a fourth arm, five leaves through `??`); *a nested node reads that scheme's keys*
  (editorial/layout-2 — `[2]`, the card turned round: `box/1`, not `s.bg`); *a refused box
  changes colour, not weight alone, when the idle ring is already full ink* (C — 2px of the card's
  pink); *a frame's inside stroke is an inset `boxShadow`* (lime/layout-2 — the photograph's 4px);
  *a head that must fit its measure* (C — checked, not needed: the widest word 260 in every
  column); *a stand-in face's glyph floor* (editorial/layout-3 — 0.14em, ink-scanned at 768 and
  390); *a seeded page cannot show an empty slot* (lime/layout-1 — `&noimage=1` and an emptied
  stage); *the whole-page published check* (lime/layout-1); *field reach is measured* (CLAUDE.md
  — confirm-only).

- Section 10: *the node walker, kept* (grunge/layout-2) with bound names and their collection —
  three schemes, the card's 2 and the tile's 3; *the paired diff walk* (grunge/layout-2 — Lime's
  and Editorial's spacing, by traversal order); *the `G` lookup at the block's head*
  (grunge/layout-1 — a fourth arm, four leaves through `??`); *a nested node reads that scheme's
  keys* (editorial/layout-2 — `[2]`, `[3]`; the card `box/1`, section 9's turn-round); *a twin's
  redrawn state or live mechanism is read against this frame* (editorial/layout-2 — every tile
  fills, Editorial's mechanism, no widened pick); *a twin's width-bound call is re-measured in the
  new face* (editorial/layout-2 — the typed break, 715 in 708 at 768, named); *a frame's inside
  stroke is an inset `boxShadow`* (lime/layout-2 — the 3px rings); *a stand-in face's glyph
  floor* (editorial/layout-3 — 0.14em on the head, ink-scanned; the glyph, marks and name read and
  left); *a leak that shows and reads as a defect is overridden* (grunge/layout-1 — the 390 sub);
  *the whole-page published check* (lime/layout-1); *field reach is measured* (CLAUDE.md — no row
  owed).

### Learned on the end-of-pass sweep (`0548f3d`, `92f7cf0`, `18f5c7e` and the refresh)

- **Item 7 was decided first**, so item 1 could write the final name once: CLAUDE.md names the
  flag, and a rename after the docs would have left them naming a const that no longer exists.
  **`editorialCard` is `cardOnPage`** (its definition, its one use and three block comments),
  with three stale comments fixed beside it — the design selector's "Pop at layout 1 so far",
  the `pop` flag's "its own layout-1 block", and `FIELDS`' header note, which now says Pop's row
  was re-measured over card 2. **Five-theme digest, canvas and live: zero files of 660 + 660**,
  no one-row file in any label, and `curl` on the served module as the positive control (five
  `cardOnPage`, the old name only in the comment that records it).
- **Item 1, the docs.** CLAUDE.md's scheme bullet now splits Pop's two pages — layout 1's seats
  inferred, layout 2's read off bound frames — and carries Schemes 5 and 8, `SCHEMES_OF.Pop[1]`,
  `cardOnPage` and every layout-2 `s.onScheme` reader, with the body-copy turn-round (`s.tx`,
  `text3` only where a node binds it); its header-`in` sentence names the card-2 re-measure, and
  the `s.live` list's map zoom names Pop. Two sentences the plan placed in CLAUDE.md live
  elsewhere: **`navModeDefault`'s is `notes/nav.md`'s** ("Pop is not in that list yet"), now
  Minimal at Pop's layout 2 with its 768 fit (three links, against 656), and **JP-094's is
  README's** (the vertical inset). README and `notes/templates.md` say Pop is designed at
  layouts 1 and 2; the templates note gained a layout-2 paragraph in Editorial's shape, where
  `popMediaRule` stands beside `grungeRule` and `editorialRule` and `popClip` reaches the
  layout-2 header. README's booked-day sentence named Grunge and Editorial alone and now names
  Pop. Every other notes file already carried Pop from its section's session.
- **Item 2: the published page passed first time** (`page-check.mjs Pop 1,0,2,3`). Card 2: Music,
  Gigs, About, Listen, Book Now and *Enquire about a date* scroll to `#media` / `#map` / `#bio` /
  `#form`; the bio's, pricing's and the testimonials' pills and the calendar's Pricing, Enquiries
  and Start Enquiry reach their ids; the player plays (`paused: false`); every section answers the
  probe; the form rings its three boxes in 2px pink (`#FF2DA0`) from 1px violet, composes the bare
  *Enquiry* mailto with the three values and swaps to *Check your mail*; all nine footer links
  scroll; the 390 burger opens (2 → 6); `overflow390` 0; no console error or warning in either
  window or across the resize walk. The published 1440 page: header 975, bio 760, media 966,
  repertoire 793, gallery 675, pricing 635, calendar 908, map 808, form 777, testimonials 737.
  **The 768 overflow**, read in the popup by a scratch script: `scrollWidth − innerWidth` **0**
  at 1440, 768 and 390, and **15 at 768 with the header's `overflowX` lifted** (the frame's 783,
  the positive control). **The seams are straight at both widths**: at 1440 the media's 5px lime
  top and foot, the foot standing on the repertoire sheet's pink ring, the sheet closing over the
  white gallery, pricing unringed, the blue form band square to the white map and testimonials,
  the white testimonials over the pink footer; at 390 pricing in its 1px pink ring, the rest the
  same.
- **Item 3: the thumbnails** (a scratch walk, the `browser-tool-choice` recipe, after a *Back to
  page list* — card 2 opens on the header's panel, so the first walk found no rows): all eleven
  rows open; the header offers 4 items, the footer 1, the rest 6, 7, 7, 4, 8, 5, 4, 6, 8 in page
  order; every arch-1 item renders exactly one `--ac` root and reads as its fitted section on the
  desktop seats — the lime media and calendar cards on white, the grey repertoire sheet, the
  leant coral plan card, the blue form band; no editor error.
- **Item 4**: cards 1, 3 and 4 publish all eleven sections in `pageOrder(i)`'s order with no
  error or warning; cards 3 and 4 are Retro's placeholder paths (the checker ribbon, the polaroid,
  the stacked floor), as layout 1's open question 8 leaves them.
- **Item 5: `reach.mjs 4`** (5,880 renders), then every plain probe compared with
  `fieldReach(f, 'Pop', d)` in Node: **75 probes, no mismatch**. The header's rows are section
  1's (`showBadge` and `badgeText` `[0, 3]`, the six layout-2 copy fields `[1]`, `cta2` `[1, 2]`,
  kicker, tags and showTags `[0, 2, 3]`, location all four, align `[0]`), and the partials are
  the known four (`header.cta2` 4/6, `calendar.email` 3/6, `bio.tagsLabel` 4/6,
  `gallery.railLabel` 2/6). Nothing in `FIELDS` moved. The compare script's own trap: a list
  column's probe (`repertoire.songs.length`, `map.gigs.year`) splits to its list's key on the
  first dot and reads as a mismatch; skip any name with two dots.
- **Item 6: every pair, kept, none folded.** In layout-2 code: **nine blocks**, each
  `(s.limeTree || s.pop)` — `HeaderV1`'s at its head, the bio's and the form's ahead of their
  `if (s.v1)`, and media, pricing, repertoire, calendar, map and testimonials inside it after the
  seam — and **the gallery's six reads** inside its `if (s.v1)`, `(s.limeTree || pop)` (the well,
  the caption's and the 768 head's chip size and tracking, the caption's ink beside `s.retro`).
  Beside layout 1's sixteen (six helpers, `Pager` and nine blocks), that is 31 sites. **Two layout-2
  sites stay unpaired on purpose**: the gallery's `bw`, `(s.retro || s.limeTree) ? '1px' : pop ?
  u(5)`, where Pop has its own arm, and the caption's fill, `(s.lime || grunge) ? s.box1 :
  s.chips[0].bg`, whose other arm is Pop's binding as it is Editorial's. The bio's
  `s.lime ? s.dls : 0` sits in Retro's `v1` body, which the block returns ahead of. In
  `data.js` and `EncoreBuilder.jsx` every name gate at `d === 1` names Pop (JP-094's pad arm,
  `navModeDefault`, the `navFits` arm, `navGapEm`, `titleWordEms`); every gate naming Lime,
  Grunge and Editorial without Pop is at `d === 2` (the composed row, pricing's footnote, the
  form's and testimonials' insets). The fold (decision 1) is still the family's last pass's.
- **Item 8**: `CONVENTIONS.md` took a *Pop (layout 2)* column on A, B, C and D2, and one row
  leaned on three times that it did not name — *an empty slot whose well `s.muted` does not read
  takes `Photo`'s `ink`* (C; the bio, the gallery and the form here, and every Editorial pass's
  gallery). Every other bullet in *Inherited and used* already had a row. `plans/README.md`
  closes the pass, and its Pop layout-1 row, still "push, PR and merge open", now says PR #47.
- **Item 9**: *Notes for the designer*, at the plan's foot — nine notes, the user's list plus the
  two type slips (the narrow media head's mixed case, the twins' "Star Enquiry").
- **Item 10: the two-build digest** (the repo root on `127.0.0.1:8931`, the committed build
  digested before the `cp`, reduced motion on). `CARD=0`: the seeded page is **byte-identical
  under all five templates** at Desktop, Tablet and Mobile, and `modal.txt` is identical (four
  Pop cards in both). `CARD=1`: card 2's page is identical under Retro, Lime, Grunge and
  Editorial and rebuilt under Pop (659 → 675, 660 → 657 and 666 → 665 rows; ~1,320 diff lines a
  width); the tell is `repeating-conic` (Retro's checker ribbon) old-only at every width and
  Minimal's *Music* new-only at Desktop and Tablet (390 is the burger). The standalone file is
  **9,819,684 bytes** (was 9,813,373); only `EncoreSection.jsx`, `EncoreBuilder.jsx` and
  `data.js` changed in `src` since the last refresh (`7a8a8df`), every change named in the pass's
  sessions; no photograph was added (56 files).

## Open questions

1. ~~**Decision 1** — the gate, `(s.limeTree || s.pop)` per site.~~ *Settled in session 0: the
   pair per site (user call, 2026-10-05).*
2. ~~**Decision 2** — leaks on a bound page, and the media head's case and ink.~~ *The rule settled
   in session 0 (user call, 2026-10-05); the head in section 3: uppercase at every width, the ink
   per width (violet at 1440, pink narrow), as the plan recommended.*
3. **The header's face-card portrait and the form's credit avatar** are Lime's `e3790c2c` and
   `f821adc2`, the components' default pictures through Pop instances; the seeds stand. Worth
   telling the designer, with Grunge's and Editorial's. *Section 9: confirmed — `f821adc2` `FILL` in
   the 48 avatar at all three widths; the seed (`popAvatar`) stands.*
4. **The gallery strip** repeats Retro's placeholder thumbnails again; the seeds stand (layout 1,
   open question 6). Worth telling the designer with it. *Section 5: confirmed — `b35b6507`,
   `b073b46f`, `8f69a4a6`, `35ae28b9`, `3f0c98b4` and `b35b6507` again at every width; the
   tiles keep the twins' top anchor. The 390 right column's first-tile wrapper carries the
   twins' `[0, 0, 40, 40]` stray a third time; worth the same note.*
5. ~~**`showBadge` / `badgeText` at layout 2** — the frame draws a sun, not a seal; recommended
   decoration, drawn always (*The header, and card 2*). The header session settles it.~~
   *Settled in section 1: the sun is drawn always; both fields measure `[0, 3]` under Pop.*
6. **The narrow masters' leaks**, each for its session to follow or override:
   - ~~the 768 header's sun, 15 past the page (the reason the 768 page renders 783 wide);~~
     *section 1: followed, and clipped by the root (783 → 768 in the published tab);*
   - ~~the 390 bio's chip row, a no-wrap row to 667 (the 390 page's 667);~~ *section 2: it is the
     credit box (`Frame 6`), followed as a `minHeight`, never its width — the root is 390;*
   - ~~the 390 header pill's label in Anton 12.07;~~ *section 1: set in Titan at 12.07, the
     pill 110.5 wide against 91;*
   - ~~the 390 media bar's title and byline and the list's titles, past the master;~~ *section
     3: overridden as the twins' are — the rows' gaps close to 14 and the titles ellipsise, the
     bar drops its clock and icons* (the icons are drawn since JP-099, 2026-10-05, the sleeve
     dropped instead);
   - ~~the map's ring labels past the 768 and 390 viewports, clipped;~~ *section 8: followed —
     120mi runs off both and 60mi half off at 768, clipped by the viewport as the masters clip
     them (the twins' JP-040 reading). The 768 pill row the frame clips under its disc is
     overridden, Editorial's way (the row wraps);*
   - ~~the 390 testimonials' sub, a 411-wide no-wrap line.~~ *section 10: 431 wide (x −20.5);
     it wraps, the twins' `<p>` — nothing in the master's layout depends on it.*
   - *section 7:* the 390 calendar foot squeezes its own line to 54 beside a 190 pill and breaks
     *Thursday* inside the word — the leak JP-100 overrode under the three twins; Pop takes the
     same rule (the line under the chip, the foot 98). Worth the designer's note.
7. **Header cards 3 and 4** stay placeholders (layout 1, open question 8): card 3's Pop frame stands
   on Scheme 1 at 1440 and **Scheme 6 at 768 and 390**, card 4's on Scheme 3. Each is its own pass's.
   *Corrected by layout 3's planning walk (2026-10-05): card 3's `hero-card` is Scheme 6 at every
   width (nested at 1440); only the instance root's 20 / 10 frame round it moves, white at 1440
   and violet narrow ([`layout-3.md`](./layout-3.md), trap 1 and decision 1).* *Card 4 closed by
   layout 4's section 1 ([`layout-4.md`](./layout-4.md), 2026-10-07): Scheme 3 at every width, as
   written, with its nav on Scheme 1 and its seal on Scheme 4 / 4 / 5.*
8. **The footer** is layout 1's, closed at planning time: the desktop instance's main component
   (`446:8697`) is not layout 1's (`907:12019`), but the trees are identical.
9. **The repertoire's leaks** — Lime's `#AFE335` × 4 and `#F2FFD0` × 2, Retro's `#FBF6EA`, two raw
   violets and Anton numerals in an otherwise bound variant, the same nodes at all three widths.
   Worth telling the designer once the session has found where they show. *Section 4: all on the
   pager — the idle numerals (`#AFE335`, lime on violet), the current numeral (`#FBF6EA` on
   pink), the arrows' 1px ring (`#F2FFD0` on lime) and glyphs (`#6B2CFF`, Pop's own violet) —
   each followed, layout 1's `POP_REP`; Anton set in Titan. Still worth telling the designer:
   the frame's own Scheme 1 has keys for all of them.*
10. ~~**The desktop capsule with *Follow my sections* on a full page** (section 1): the seeded nine
    wrap it to two rows at the 12px floor on the 1180 canvas (and so in the published 1440 tab,
    which zooms that layout), where Lime's, Grunge's and Editorial's hold one row — Titan is the
    widest of the four faces, and the block's below-the-floor fallback is a wrap. Minimal is Pop's
    layout-2 default, so the seeded header and the setup modal's card never show it; eight links
    hold one row. *Options*: accept it as the designed fallback (recommended — no frame draws
    nine links), or lower the floor under Pop (≈ 10.5px on the canvas, 12.8 in the published
    1440). A user call if it is to change.~~ *Settled (user call, 2026-10-05): the wrap stays as
    the designed fallback; the floor is not lowered under Pop.*
11. ~~**Pricing's picked chip label** (section 6): the frame binds the idle chips' lime
    (`sem/text/1`) on the pick's yellow `sem/tag/1/bg`, 1.15 : 1.~~ *Settled (user call,
    2026-10-05): the fill and ring are followed, the label takes the tag's own ink, black. Worth
    telling the designer — the frame's own render shows the label all but gone.*
12. ~~**The 768 testimonials head** (section 10): Titan's FROM PEOPLE WHO BOOKED is 715.4 in the
    708 column, so BOOKED wraps to a third line where the frame sets two; a −1% fit (49.46px)
    would hold two.~~ *Settled (user call, 2026-10-05): kept as named, on the ramp, Editorial's
    call.*

## Notes for the designer

*(The open questions above that are worth telling the designer, gathered by the sweep into one
note to forward, in Editorial layout 2's shape. Each is shipped as described; where it says "one
line", the other answer is a one-line change. Layout 1's notes — the unbound variants, the
gallery strip, the 390 pricing rings, the lime head on white — still stand.)*

1. **Two portraits are the components' default pictures.** The header's face card (107 × 165)
   shows Lime's colour avatar (`e3790c2c`) and the form's 48px credit circle shows Lime's other
   one (`f821adc2`), both through Pop instances at all three widths. The page shows Pop's own
   portraits there. *(3)*
2. **The gallery strip is Retro's placeholders again.** The hero is Pop's own photograph, but the
   six thumbnails beside it are five of Retro's pictures (one twice); the page's strip is the
   other pictures of Pop's shoot. And the 390 master's right-column first tile is rounded
   `0 0 40 40`, one tile of ten, where its own image says 10; the page does not follow it. *(4)*
3. **The 390 calendar foot breaks a word.** The master squeezes the foot's line to 54 wide beside
   a 190 pill, so *Thursday* breaks inside the word. The page drops the line under the date chip
   when it cannot fit (the rule Lime's, Grunge's and Editorial's pages already take); in Titan
   One the pill is 201 wide, so on the seeded page the line drops there. *(6)*
4. **Header cards 3 and 4 are next.** They stay placeholders until Pop's layout-3 and layout-4
   passes. One thing worth confirming before then: card 3's frame stands on Scheme 1 (white) at
   1440 and on **Scheme 6** (violet) at 768 and 390, a change of ground between widths no other
   Pop header makes; card 4's stands on Scheme 3 at every width. *(7)* *Corrected by layout 3's
   planning walk: the card itself is Scheme 6 at every width; only the frame round it is white at
   1440 and violet narrow.*
5. **The footer is the one unbound variant on this page.** Every other layout-2 variant binds
   its colours to the Pop mode; the footer still carries layout 1's 41 raw solids. Its desktop
   instance is also of another main component (`446:8697`) than layout 1's (`907:12019`), though
   the two trees match node for node. The page draws layout 1's footer on every page. *(8)*
6. **The repertoire's pager carries other templates' colours.** In an otherwise bound variant,
   its idle numerals are Lime's `#AFE335`, the current numeral Retro's `#FBF6EA`, the arrows' 1px
   ring Lime's `#F2FFD0`, and the numerals are set in Anton, at every width. Each is followed as
   drawn (Anton set in Pop's display face), but Scheme 1 has a key for every one of them. *(9)*
7. **Pricing's picked chip label is all but invisible.** The picked chip fills `sem/tag/1/bg`
   (yellow) and keeps the idle chips' `sem/text/1` label (lime), 1.15 : 1 — the frame's own
   render shows the label nearly gone. The page keeps the fill and ring and letters the label in
   the tag's own ink, black. *(11)*
8. **The testimonials head is wider than its 768 column in the stand-in face.** The head is
   `Display/LG` (82 / 51 / 36) on all three masters, the twins' token — not `Display/XL`, which
   is the quote glyph's. At 768, Titan One sets FROM PEOPLE WHO BOOKED 715 wide in the 708
   column (Chunko 691), so BOOKED wraps to a third line where the frame sets two. The page stays
   on the type ramp; one line to fit it instead (about 49.5px against the ramp's 50). *(12, and
   section 10)*
9. **Two slips in the type.** The narrow media masters type the head "Five Worth your ear" in
   mixed case, the only display string on the page not typed in capitals (the page sets it in
   capitals, as the 1440 master does); and the calendar pill reads "Star Enquiry", the twins'
   typo (the page says "Start Enquiry").
