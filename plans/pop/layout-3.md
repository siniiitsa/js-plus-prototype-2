# Pop layout 3 — section-by-section plan

This is the working checklist for bringing **layout 3** of the Pop template up to its Figma
designs, the way [`../lime/layout-3.md`](../lime/layout-3.md), [`../grunge/layout-3.md`](../grunge/layout-3.md)
and [`../editorial/layout-3.md`](../editorial/layout-3.md) did for the other three. It runs one unit
per session, all three widths together, clearing context between units. Layouts 1 (`s.v0`) and 2
(`s.v1`) under `s.pop` are fitted and closed; nothing here should move either.

**This plan is Editorial layout 3 again, with Pop layout 2's idiom.** It does not repeat either:
the composed page, the wrapper insets, the scheme mechanisms (the seat, the card seated on its own
scheme with the root painting `vm.pageBg` round it, `s.onScheme`), the procedure, the harness, the
digest and the verification are Editorial's and Lime's layout-3 ones, verbatim, with `theme=3` read
as `theme=4`. The gates (`s.pop`, the widened pair `(s.limeTree || s.pop)`), Titan One at `faceK`
0.98 through `faced` / `facedLh`, `'title'` casing with uppercase per site, route A′, `PopSun` /
`PopDots`, the `titanEms` fits and the 0.14em lift are [`layout-1.md`](./layout-1.md)'s and
[`layout-2.md`](./layout-2.md)'s, and they carry over whole. What is written here is only what
differs — and what differs most is that **this page is layout 2's bound page again, on Lime's
layout-3 tree, with the header's card on violet and five sections standing cards on other schemes**:

- **Every variant but the footer is bound**, as on layout 2's page: the planning walk (2026-10-05)
  found **one** raw paint outside the footer on all 39 masters — the bio's teal sparkle — and no
  leaked face. The variable tools work, the bindings are the source, and a raw hex is a leak
  (layout 2, decision 2). Body copy is `sem/text/2`, `s.tx`, violet; `text/3` is read only where a
  node binds it (the header's white name, Listen and location under Scheme 6).
- **The page is Lime's layout-3 tree, node for node**, as Editorial's was — but for the bio, which
  trades Lime's seal for **Pop's smiley-globe seal on Scheme 4**, a **teal sparkle**, a **lime
  scribble** under the name and a **5px pink rule** at the card's foot. The header draws **no**
  sticker this time: its tree is Lime's 44 whole.
- **It stands on white**, broken by a violet header card, a lime gallery sheet and a blue map
  band, then the pink footer; its cards and cells stand on **seven** schemes (2–8), every one
  already in `THEMES[4]`.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then
- the whole *Conventions* of [`layout-2.md`](./layout-2.md) and its *Settled in session 0* — the bound
  page's rules (a raw hex is a leak; body copy is `s.tx`; a Scheme 2 card binds `box/1`, not
  `sem/bg`; the pager's dress for a control no master draws; a plan token read off the string's
  own text style) — and its *Learned on the end-of-pass sweep* (where every pair stands)
- the *Conventions* and *Settled in session 0* of [`layout-1.md`](./layout-1.md) — the foundation
  (`s.pop`, the face and `faceK`, casing, `text3`, route A′, the stickers)
- the *Conventions* and *Settled in session 0* of [`../editorial/layout-3.md`](../editorial/layout-3.md)
  — the composed page under a fourth mode, `s.onScheme` on a light page, and the light-page arm
  every Lime layout-3 block now carries
- [`../CONVENTIONS.md`](../CONVENTIONS.md), groups **A, B, C and D3**, and the bullets they point at
- the section's *Settled in section N* bullets in [`../lime/layout-3.md`](../lime/layout-3.md),
  [`../grunge/layout-3.md`](../grunge/layout-3.md) **and** [`../editorial/layout-3.md`](../editorial/layout-3.md)
  — the block you are widening, and the two widenings of it already done, Editorial's the one on a
  light page with nested schemes
- the section's entries in the QA batches that moved those blocks after their *Settled* bullets:
  [`../lime/layout-3-qa-fixes.md`](../lime/layout-3-qa-fixes.md),
  [`../lime/retest-qa-fixes.md`](../lime/retest-qa-fixes.md) (JP-043 … JP-048),
  [`../grunge/layout-3-qa-fixes.md`](../grunge/layout-3-qa-fixes.md) (JP-061 … JP-075) and
  [`../grunge/retest-qa-fixes.md`](../grunge/retest-qa-fixes.md) (JP-066, JP-069 … JP-071), and
  JP-039 in [`../lime/layout-2-qa-fixes.md`](../lime/layout-2-qa-fixes.md) for the header
- the *Conventions* **and the 2026-09-15 Addendum** of [`../retro/layout-3.md`](../retro/layout-3.md),
  which built every `s.v2` branch
- the *Per-session procedure* of [`../lime/layout-3.md`](../lime/layout-3.md)

Then the memory notes `figma-frame-reading`, `verifying-the-published-tab` and
`browser-tool-choice`. `SPEC.md` lives in git history: `git show 8fa8ff4:SPEC.md`.

Branch: **`pop-layout-3`, forked from `pop-layout-2`** (`f998160`, its sweep's last commit), not
from `main`: `pop-layout-2` was closed but not merged when this pass was planned (33 commits, PR
still open), and a fork from `main` would carry neither layout 2's code nor its plan — Lime's and
Grunge's layout-2 passes forked from their unmerged predecessors the same way (user call,
2026-10-05). The planning session created it and committed this plan there. Rebase onto `main`
once `pop-layout-2` merges; nothing in this pass depends on the merge.

## What the pass must deliver

1. **Every layout-3 section works in the published tab under Pop**: every `s.v2` control CLAUDE.md
   lists under *`s.live` is false everywhere except the published tab* — including the **controls
   the frames do not draw** (the gallery's fullscreen viewer, the repertoire's *View full set*
   reveal and its 390 carousel, the map's city chips, zoom and *See all gigs*, the pricing stack's
   moving FEATURED seat). Each session drives them at `theme=4&live=1` and checks their overlay,
   scrim, lit and idle states read on this page's grounds: **lime on lime and colour on colour are
   this template's risks** — the gallery's rings and viewer stand on a lime sheet, the map's lit
   row is a lime pill on a blue band, and the testimonials' six cells run six schemes side by side.
2. **Every layout-3 section looks as close to its Figma frame as possible**, at 1440 (× 0.82 onto
   the 1180 canvas), 768 and 390 — and, for the three composed sections, at the column widths
   `pageRows` gives them (709 : 334.5 on the 1180 canvas, 864.8 : 408.2 in the published 1440 tab;
   Editorial layout 3, section 2).
3. **The setup modal's card 3, "Inset Hero", lays out a fitted page.** `pickHeader` writes arch 2
   to every section and reorders the page into `PAGE_ORDERS[2]`, so this pass turns card 3 from its
   placeholder (layout 1, open question 8: Retro's `HeaderV2` path, the checker ribbon) into Pop's
   own page. The header session verifies it **in the builder**, and the bio session verifies the
   composed row under Pop at desktop, canvas and published tab both.
4. **The sidebar's layout-picker thumbnails for layout 3** under Pop look like their sections; check
   them once, in the sweep.

## What this pass actually is

**Pop's layout-3 page is Lime's layout-3 page in a fifth variable mode**, as Editorial's was in the
fourth. The evidence, read at planning time (2026-10-05) with one `use_figma` walk per page frame
(main components, `explicitVariableModes` and `resolvedVariableModes`, every nested mode, bound
paints resolved to `collection/name`, effects, rotations, strokes and radii, image hashes and
`scaleMode`s, text styles, nodes past the root), then the node walker per section at all three
widths, and the longest common subsequence of every visible node's `(depth, type, lower-cased
name)` against Lime's and Editorial's instances at the same width, **by traversal order**:

| Section | Pop nodes 1440 (768 / 390) | LCS with Lime / Editorial (1440; 768 and 390 the same unless said) | What only Pop draws |
|---|---|---|---|
| header | 44 | **44** / 41 | — (Editorial's three extra are its mock "Sienna Vale" names) |
| bio | 39 (39 / 38) | 24 / 24 (390: 25 / 23) | **Pop's smiley-globe seal** (`Layer_1`, Scheme 4) where Lime draws `Frame 248` and Editorial its tape; a **teal sparkle** (`Vector` 90 × 91, raw `#00E0C4`); a **lime scribble** under the name (`Vector` 114.5 × 32.8); a **5px pink rule** at the card's foot (`Frame` 858 × 5) |
| Genres (`Tags — Frame`) | 18 | **18 / 18** | — |
| media card (`Audio Player — H · Bar-meter`) | 72 | **72 / 72** | — |
| media list | 41 | **41 / 41** | — |
| calendar (the instance) | 65 | **65 / 65** | — |
| repertoire | 57 (390: 63) | **57 / 57** | — |
| gallery | 17 | **17 / 17** | — |
| pricing | 115 | **115 / 115** | — |
| map | 141 (142 / 83) | **141 / 141** (768: 141 / 142 — `Frame 304`, the twins' rename) | — |
| form | 27 | **27 / 27** | — |
| testimonials | 44 | 43 / **44** | the stat numeral's node name ("5.9", Editorial's) |
| footer | 51 | — | **layout 1's footer** (below) |

- Every instance is the **`Theme=Pop` variant** of the set the twins instantiate (`Headers — D ·
  Inset Hero` `624:5487` / `787:10032` / `878:11034`, the bio's `675:1765` / `878:12771`, the tags'
  `690:3519`, the audio card's `697:2341`, the list's `690:4082`, the calendar's `722:2385`, the
  repertoire's `745:2244` / `860:13337` / `880:18762`, the gallery's `710:2514` / `860:13644` /
  `880:19054`, pricing's `718:2993` / `859:12256` / `880:12703`, the map's `731:3151` / `861:10531`
  / `880:22417`, the form's `725:3269` / `859:14324` / `880:14754`, the testimonials' `753:2220` /
  `861:12574` / `880:24452`), and carries `1 · Primitives` → **Pop**. Ids differ per variant, so
  diff **by traversal order**, and **case-insensitively** (Pop types most display strings in
  capitals).
- **No Device override on any instance**, at any width: every root resolves its page's Desktop /
  Tablet / Mobile, the 768 bio included (it is the desktop component, `675:1765`, as on every
  twin's page). Each session re-checks its own three.
- **No effect on any master** — not one shadow or blur on the 39 masters. Layout 2's `Retro/Poster`
  5 / 5 pill blocks and the bio photo's soft shadow have no seat here.
- **No seams and no rules between bands.** Every band meets its neighbour on a straight edge at all
  three widths; no 10px rule (layout 1), no 5px media rule (layout 2). The only edge strokes are
  pricing's root (1px pink, **at every width** — layout 2's was narrow only) and the footer's
  layout-1 hairline.
- **The footer is layout 1's, and out of scope** — the instances are `446:8697` (1440, layout 2's
  desktop footer, identical to layout 1's node for node) and layout 1's own `907:12261` / `907:12502`
  narrow, 51 nodes each, **still unbound** (layout 1's 41 raw solids). **All three instances set
  `2 · Scheme` → Scheme 2 explicitly, and it paints nothing**: no node in them binds a variable, so
  the frames render layout 1's pink band (sampled in the 768 and 390 renders). So unlike
  Editorial's layout-3 footer there is **no seat by page** — `SCHEMES_OF.Pop[0].footer` (3) stands
  at every page, and session 0 proves it (the footer's `page_2` digest file does not move).
  **The 1440 render draws no type**: all 13 text nodes report `hasMissingFont: true` (a Chunko
  style the file lacks, on this instance's overrides alone) and no render bounds; the nodes are
  visible and layout 1's. A Figma artefact, not a design (open question 6). The row is closed at
  planning time.
- **No video frame**; the `Tags — Frame` instance under the bio card is drawn by the bio block's
  Genres row, as under the twins.

So, as under Editorial's layout 3 and Pop's layout 2: **no Pop-only branches and no Pop-only ternary
trees.** The work is Pop deltas inside **Lime's layout-3 blocks**, each widened from `s.limeTree`
to `(s.limeTree || s.pop)` (layout 2's decision 1, per site) with `const pop = s.pop` naming the
deltas — or a fourth arm on the block's `G`, whose Lime, Grunge and Editorial arms stay
byte-identical. **Themes 1, 2 and 3 are the digests at risk**: every widened block is one Lime,
Grunge *and* Editorial render. The bio is the exception to the tree, and its session reads it
(*The second session*).

**Where each Lime block sits decides how it widens** — Editorial's placements, now gated
`s.limeTree` (walked at planning time from each gate to its enclosing branch):

- `if (s.limeTree) { … return }` **at the head of `HeaderV2`**. Widening it makes Retro's half
  unreachable under Pop. **There is no Pop arm in Retro's half to delete** (grepped — Editorial's
  layout-3 pass deleted its own `mustard` arm, and layout 1 gave Pop none).
- `if (s.v2 && s.limeTree)` **ahead of `Bio`'s `if (s.v2)`** — the bio, which has no state.
- `if (s.limeTree)` **inside `if (s.v2)`, after the seam** — media (after `nHot`), repertoire
  (after `arrow`), calendar (after `line`), pricing (after `shown`), map (after `litRow`), form
  (after `up`), testimonials (after `template`).
- **No block** — the gallery: `const grunge = s.grunge`, `ed` and a dozen `s.limeTree` /
  `(s.lime || grunge)` / `ed` reads through `Gallery`'s `if (s.v2)` (the sheet, ink, well, ring,
  tile ratio, `cream`, the viewer's `ctlBg` and `scrim`, the head's size and case, the tiles'
  border and `Photo`'s backdrop). It widens site by site, from the frame — Pop layout 2's section
  5 and Editorial layout 3's section 6 are the models.
- **The footer has no layout-3 block**: it is layout 1's `Footer` block, already `(s.limeTree ||
  s.pop)`, and its seat does not move (above).

**Inheritance** ([`../CONVENTIONS.md`](../CONVENTIONS.md)): **A** and **B** always; **C**, since this
is another variable mode of a page already fitted three times; **D3**, since its blocks are Lime's
layout-3 blocks, widened as Grunge and Editorial widened them. Not D1 or D2: the helpers layout 1
widened (`BookPill`, `Pager`, `TagChips`, `labelStyle`, `LogoMark`, `NavBar`, `SealBadge`'s Pop arm)
already switch on under Pop's layout-3 branches; what they draw here is each session's to check.
Keep the running *Inherited and used* list below; the sweep folds it into that file as a *Leaned on
in Pop (layout 3)* column and gives D3 a Pop column.

### The composed page is already Pop's

Layout 3's 1440 page stands the bio and the media player in a left column and the booking calendar
in a right one. **Pop's `Frame 299` (`964:68752`, 1440 × 2523) is Grunge's and Editorial's inset for
inset**, read at planning time frame by frame:

| Frame | Pop | Editorial | |
|---|---|---|---|
| `Frame 299` | H, padding 0 / 56 / 56 / 56, gap 45, **explicit Scheme 3, no fill** | the same, no mode | 2523 against 2415; the mode is inert (below) |
| `left column` (`964:68753`) | 878 at x 56, V, padding 50 / 10 / 10 / 10, gap 80 | the same | |
| bio `Section` (`964:68754`) | 858 × 1145 at (66, 950), gap 30, `#FFFFFF`, **Scheme 1**: head `Frame` 128, the instance **directly** at 158 (no `Frame 302`), Tags at 1070 | 858 × 1227: head 160, `Frame 302` | Editorial's `Frame 302` was its tape's clearance; Pop has no tape |
| media `Section` (`964:68762`) | 858 × 1182 at y 2175, gap 30, `#FFFFFF`, Scheme 1: head 201, `Frame 301` at 231 (the card, 30, the list) | 858 × 992: head 265 | the heads are the type; the list is 678 against 424 (the pills, below) |
| `Frame 300` (`964:68772`) | 405 at x 979, V, padding 50 / 0 / 56 / 0, gap 30; "BOOK ME" 124 × 31 at y 50, the instance at 111 | the same frame; "Book Me" 123 × 35, the instance at 115 | |

The narrow wrappers are the twins' too: at 768 the `left column` (`984:15357`, padding 50 / 30 /
10 / 30, gap 80) holds the bio `Section` (`984:15358`, head `984:15359` 93 tall, the instance at
123) and the media `Section` (`984:15366`, head `984:15367`) whose `Frame 301` (`984:15373`) holds
the audio card, the list **and the repertoire** (`984:15376`); the calendar's `Frame 300`
(`984:15377`, padding 50 / 30 / 56 / 30) stands "Book Me" at 30 · 50 and the instance at 30 · 104.
At 390 the `left column` (`984:15388`, 50 / 10 / 10 / 10) holds the bio and media `Section`s
(`984:15389`, `984:15397`, heads 77); the repertoire (`984:15407`) is a top-level child; `Frame 300`
(`984:15408`, 40 / 10 / 40 / 10) stands "Book Me" at 10 · 40 and the instance at 10 · 92.

So **the row already composes under Pop — expect no change to `pageRows`, `arrangeRows` or
`COLUMN_SPLIT`** (they key on `designCount`), and `preview.jsx`'s `&column=left|right` stands.
**Every instance root pads exactly as Editorial's does** at all three widths (read on both pages at
planning time: header 20 / 10 / 10, repertoire 56 · 60 / 0 · 60 / 0, gallery 56 · 60 / 30 · 60 /
20, pricing 56 / 56 / 32 / 56 · 30 / 30 / 32 / 30 · 60 / 20, map 56 · 56 / 30 · 60 / 10, form 0 ·
0 · 60 / 0, testimonials 56 · 30 / 30 / 56 / 30 · 30 / 10 / 60 / 10), so **every `vm.pad` arm at
`d === 2` takes Pop on its existing numbers** — the composed row's (bio, media, calendar), pricing's
foot 32 and the form's and testimonials' insets — **each in its own session**, the composed row's
rule (CONVENTIONS C, *the composed row's pad arm moves per section*: the heads part until the
calendar closes the row).

**`Frame 299`'s Scheme 3 is inert**: it has no fill; the two `Section`s set Scheme 1 and paint
white; the calendar instance sets Scheme 2; and the one node that inherits it, "BOOK ME", binds
`sem/text/2`, which is `#6B2CFF` under Scheme 3 and Scheme 1 alike. Nothing reads it.

### Whose branch draws what in the composed region

Lime's table holds; what changes is the face, the ink and the case. "KM BIO" (both heads) is
Chakra Petch `Label/XS` 20 / 14 / 12 at lh 1.26 in `sem/text/2`, **violet**; "READS THE ROOM." and
"FIVE WORTH YOUR EAR" are Chunko `Display/LG` 82 / 51 / 36 at lh .89 in `sem/text/1`, **pink, one
tone**; "Five worth your ear" sits in the twins' **632.16** box at 1440 *and 768* (370 at 390);
"BOOK ME" is `Display/Title` **28 / 22 / 20** at lh 1.1 in `sem/text/2`, violet. **The narrow
masters type all three heads in mixed case** — "Reads the room.", "Five worth your ear", "Book Me"
— where 1440 types them in capitals: layout 2's media-head slip, now on every composed head
(decision 2). Each wrapper `Frame` also holds two hidden Soulway texts ("the", "room."), Retro's
leftovers, invisible on every twin's page; not drawn.

## The Figma source

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Frame 259 | `964:68750` | 1440 × 8557.5 |
| Tablet | Frame 266 | `984:15355` | 768 × 9459.3 |
| Mobile | Frame 267 | `984:15386` | 390 × 9517.7 |

- Desktop: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=964-68750&m=dev>
- Tablet: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=984-15355&m=dev>
- Mobile: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=984-15386&m=dev>

`fileKey` = `uFoUbPaBrDicjyuSBEbtGT`. All three sit on the page **Layout 3** (`964:58573`) beside
Retro's (`964:68621` / `977:21117` / `982:8748`), Lime's (`964:68653` / `984:10739` / `984:10770`),
Grunge's (`964:68685` / `984:13899` / `984:13930`) and Editorial's (`964:68717` / `984:16811` /
`984:16842`); found with `page.children` and matched on width and primitives mode (the frames are
"Frame 259 / 266 / 267"). `use_figma` reads on descendants want `await
figma.setCurrentPageAsync(await figma.getNodeByIdAsync('964:58573'))` first. **The page frames are
set right** (Pop, Scheme 1, Device Tablet / Mobile on the narrow two) — but read a section node,
never the page.

**Match on node id and width, never on the name** — the misnomers are the twins', one for one: the
composed instances are "— Desktop" at every width (the bio at 768, the audio card, the list, the
calendar); the narrow footers are "Footer — Component 3 / 4 — Desktop" and the desktop one
"Component 2"; the tags instance is "— Desktop" everywhere. The full-width sections' narrow masters
are honestly named.

**No page renders wider than its frame**: every section's render bounds lie inside 0–1440 / 0–768
/ 0–390, the footer's layout-1 hairline (to 1441.24) aside. Nothing runs past a root for a session
to clip — the first Pop page of the three with no overflow to chase.

## The sections

Page order — `PAGE_ORDERS[2]`, the narrow pages'. Sizes are the frames' own. Each row's three
masters are one session. **Lime block** is where that section's Lime layout-3 block sits in
`EncoreSection.jsx` (grep a twin's desktop id to find it); it is the gate the session widens.

| # | Cat | Desktop node | Size | Tablet node | Size | Mobile node | Size | Scheme 1440 / 768 / 390 (nested) | Lime twin (1440 / 768 / 390) | Editorial twin (1440 / 768 / 390) | Lime block | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | *foundation* | `964:68750` *(page)* | — | `984:15355` | — | `984:15386` | — | — | — | — | `SCHEMES_OF.Pop[2]`, `cardOnPage` at `d === 2`, `navModeDefault` (decision 1) | open |
| 1 | `header` | `964:68751` | 1440 × 900 | `984:15356` | 768 × 1024 | `984:15387` | 390 × **606.5** | **1 / 6 / 6** (`hero-card` **6** at 1440; the rings, capsule ring and chips name Scheme 1) | `964:68654` / `984:10740` / `984:10771` | `964:68718` / `984:16812` / `984:16843` | `if (s.limeTree) { … return }` at the head of `HeaderV2` | open |
| 2 | `bio` | `964:68760` *(head `964:68755`, in Section `964:68754`)* | 858 × 882 | `984:15364` *(head `984:15359`)* | 708 × 912 | `984:15395` *(head `984:15390`)* | 370 × **893** | 1 (seal **4**) | `964:68663` / `984:10748` / `984:10779` | `964:68728` / `984:16820` / `984:16851` | `if (s.v2 && s.limeTree)` ahead of `Bio`'s `if (s.v2)` | open |
| 3 | `media` | `964:68771` list + `964:68770` card *(head `964:68763`)* | 858 × **678** + 858 × 243 | `984:15375` + `984:15374` *(head `984:15367`)* | 708 × 647 + 708 × 243 | `984:15406` + `984:15405` *(head `984:15398`)* | 370 × 647 + 370 × 243 | 1 (card **2**; rows **3 / 4 / 5 / 7 / 8**) | `964:68674` + `964:68673` / `984:10759` + `984:10758` / `984:10790` + `984:10789` | `964:68739` + `964:68738` / `984:16831` + `984:16830` / `984:16862` + `984:16861` | `if (s.limeTree)` inside `Media`'s `if (s.v2)`, after `nHot` | open |
| 4 | `repertoire` | `964:68775` | 1440 × 621 | `984:15376` *(in `984:15373`)* | 708 × **628** | `984:15407` | 390 × **693** | 1 (sets **2 / 3 / 4**) | `964:68678` / `984:10760` / `984:10791` | `964:68743` / `984:16832` / `984:16863` | `if (s.limeTree)` inside `Repertoire`'s `if (s.v2)`, after `arrow` | open |
| 5 | `calendar` | `964:68774` *(in `964:68772`; "BOOK ME" `964:68773`)* | 405 × **481.9** | `984:15379` *(in `984:15377`; `984:15378`)* | 708 × **445.9** | `984:15410` *(in `984:15408`; `984:15409`)* | 370 × **427.9** | **2** (the instance; its pill names 2 again) | `964:68677` / `984:10763` / `984:10794` | `964:68742` / `984:16835` / `984:16866` | `if (s.limeTree)` inside `Calendar`'s `if (s.v2)`, after `line` | open |
| 6 | `gallery` | `964:68776` | 1440 × 789 | `984:15380` | 768 × **857** | `984:15411` | 390 × **579** | **2** (tile rings name Scheme 1) | `964:68679` / `984:10764` / `984:10795` | `964:68744` / `984:16836` / `984:16867` | **no block** — `s.limeTree`, `(s.lime \|\| grunge)` and `ed` reads through `Gallery`'s `if (s.v2)` | open |
| 7 | `pricing` | `964:68777` | 1440 × **1093** | `984:15381` | 768 × **1010** | `984:15412` | 390 × **1419** | 1 (featured row **2**) | `964:68680` / `984:10765` / `984:10796` | `964:68745` / `984:16837` / `984:16868` | `if (s.limeTree)` inside `Pricing`'s `if (s.v2)`, after `shown` | open |
| 8 | `map` | `964:68778` | 1440 × **809** | `984:15382` | 768 × **827** | `984:15413` | 390 × **880** | **4** (lit row, *See all gigs* and `radius-map` **3**; the viewport inherits 3) | `964:68681` / `984:10766` / `984:10797` | `964:68746` / `984:16838` / `984:16869` | `if (s.limeTree)` inside `EventsMap`'s `if (s.v2)`, after `litRow` | open |
| 9 | `form` | `964:68779` | 1440 × **553** | `984:15383` | 768 × **667** | `984:15414` | 390 × **716** | 1 (card **2**) | `964:68682` / `984:10767` / `984:10798` | `964:68747` / `984:16839` / `984:16870` | `if (s.limeTree)` inside `EnquiryForm`'s `if (s.v2)`, after `up` | open |
| 10 | `testimonials` | `964:68780` | 1440 × 790 | `984:15384` | 768 × **775** | `984:15415` | 390 × **1050** | 1 (cells **3 / 7 / 2 / 4 / 5 / 6**) | `964:68683` / `984:10768` / `984:10799` | `964:68748` / `984:16840` / `984:16871` | `if (s.limeTree)` inside `Testimonials`' `if (s.v2)`, after `template` | open |
| — | `footer` | `964:68781` | 1440 × 479.5 | `984:15385` | 768 × 720.4 | `984:15416` | 390 × 720.4 | *(explicit 2, inert)* — renders 3, layout 1's pink | — | — | — | **out of scope**: layout 1's footer, closed at planning time |
| — | `tags` | `964:68761` | 858 × 75 | `984:15365` | 708 × 67 | `984:15396` | 370 × 97 | 1 | — | — | — | **not in the project**; its Genres row is drawn inside the bio's block |

**One section changes scheme between widths: the header** — its root is Scheme 1 at 1440 and
Scheme 6 at 768 and 390, while its `hero-card` is Scheme 6 at every width (nested at 1440, the
root's own narrow). That is decision 1. Every other root and nested node reads the same scheme at
all three widths.

**Cite branches by id, never by line number**: the file is ~28 600 lines and every session moves it.
**Re-measure from the Pop frame; never reuse a twin's block sizes.**

### Sizes: re-measure, and expect the type and the pills to be the difference

| Section | Pop 1440 / 768 / 390 | Editorial | Lime |
|---|---|---|---|
| header | 900 / 1024 / **606.5** | 900 / 1024 / 663.5 | 900 / 1024 / 606.5 |
| bio | 882 / 912 / **893** | 882 / 912 / 811 | 882 / 912 / 878 |
| media list · card | **678** / 647 / 647 · 243 | 424 / 647 / 647 · 243 | the same as Editorial |
| calendar (instance) | **481.9 / 445.9 / 427.9** | 521.6 / 471.6 / 443.6 | 538.6 / 483.6 / 450.6 |
| repertoire | 621 / **628** / **693** | 621 / 648 / 704 | 621 / 655 / 709 |
| gallery | 789 / **857** / **579** | 789 / 877 / 587 | 789 / 884 / 591 |
| pricing | **1093** / 1010 / **1419** | 1109 / 975 / 1383 | 1199 / 1072 / 1474 |
| map | 809 / **827** / 880 | 813 / 858 / 883 | 819 / 831 / 887 |
| form | **553** / **667** / **716** | 589 / 711 / 741 | 570 / 734 / 755 |
| testimonials | 790 / 775 / 1050 | 790 / 784 / 1044 | 790 / 790 / 1108 |
| composed `Frame 299` | **2523** | 2415 | 2398 |

Pop's ramp is layout 1's mode table (`display-lg` 82 / 51 / 36, `-md` 45 / 36 / 28, `-sm` 36 / 29
/ 24, `title` 28 / 22 / 20, `list` 20 / 16 / 15, `label-lg` 24 / 16 / 14, `label-sm` 16 / 13 / 12,
`label-xs` 20 / 14 / 12), and every text style on the page resolves in it. Three things move the
frames:

- **The desktop media list is 678 where every twin's is 424**: its five rows are layout 2's
  **pills** — 116.8 tall on a 10 gap, each on its own scheme (3 / 4 / 5 / 7 / 8), ringed 4px, the
  cover in a 4px `scheme/1/stroke/2` ring — where the twins' 1440 rows are ruled lines. At 768 and
  390 they are 110.8 and land on the twins' 647. Layout 2's section 3 (`popRow`, `art()`'s
  `well` / `ink` / `ring`) is the recipe.
- **The calendar is 40 shorter at 1440**: its numeral is `Display/LG` 82 where Editorial's is 118.
- **The 390 bio is 82 taller than Editorial's**: the card carries the whole about paragraph at
  370 (306 × 280 of prose).

Three heads the planning read flags, each for its session to check before choosing (Titan's ems off
`titanEms` × 0.98):

- **The testimonials' "EXPERIENCES."** breaks inside the word at 1440 ("EXPERIENC / ES.") in the
  frame's own 306 box, as Editorial's did — the demo face's measure. The twins dropped that cap and
  print `HEADING_3`'s "Experiences." on one line (JP-070); expect Pop's to do the same.
- **The media head at 390**: the master's mixed-case "Five worth your ear" holds one line in its
  370 box (356 wide at 36); uppercased in Titan it does not (layout 2's 390 master needed its 251
  cap to break it), so expect two lines where the frame draws one — named, not fitted. At 768 the
  uppercased head fits the 632 box on one line (layout 2's 768 head set ~597 at the same size).
- **The bio's "READS THE ROOM."** fits every width: 715 of 718 at 82 in Chunko, ~593 on the 709
  composed column in Titan; no fit owed.

## Pop's layout-3 mode

Pop's nine schemes are in [`layout-1.md`](./layout-1.md) and [`layout-2.md`](./layout-2.md), and
Schemes 1–8 in `THEMES[4]` (`palette` / `sem` / `tags`, `schemes[2]` … `schemes[8]`). **This page
needs no new scheme** — every scheme it names is already in the code. Layout 2's traps hold: Scheme
1's active pair **black** and idle pair **lime**, `stroke1` opaque pink, Scheme 2's `pillBg` pink and
`stroke1` violet, **a Scheme 2 card binds `box/1` `#D7FF23`, not `sem/bg`** (the audio card, the
calendar card, the form's card, the pricing row, the testimonials' quote cell — read each), and
body copy is `s.tx`.

**Schemes by node** (`resolvedVariableModes` on each root, every nested `explicitVariableModes`, all
three widths — identical at every width but the header's root). **Read each node's `boundVariables`
before believing a token**, with its collection: on this page as on layout 2's, a node names
`scheme/1/…` outright inside a section seated elsewhere.

| Section | Root | Nested (every width unless said) | What it paints (bindings read at planning time) |
|---|---|---|---|
| header | **1 at 1440; 6 at 768 and 390** | `hero-card` (1400 × 860 / 748 × 1004 / 370 × 586.5): **6** at 1440 (the root's own narrow) | the root `sem/bg` (**white** at 1440, **violet** narrow) round the card, padded 20 / 10 / 10; the card `box/2` `#5C22E6` under the photograph and one floor fade (`box/3` `#4612BE` → transparent, Lime's `[[0, −1, 1], [1, 0, 0]]`), radius 30, ringed **8 / 8 / 2** INSIDE in `scheme/1/stroke/2` lime; the capsule `sem/bg` violet ringed 1px `scheme/1/stroke/1` pink, links `text/1` **lime** (Label/SM); the name and Listen `text/3` **white**; the Book pill `sem/bg` violet (145.3 × 34.9, radius 57.18), its label and disc `text/1` lime round a violet arrow; the foot's name `text/1` lime at Display/LG, **one tone**; the location dot `text/1`, the location `text/3` white; six chips on `scheme/1/tag1…6/bg` lettered `scheme/1/tag1/text`, `scheme/1/tag2/text` ×2, `scheme/4/tag1/text`, `scheme/5/tag2/text` and `sem/tag/7/bg`; the card `text/1` **lime** ringed 4px `scheme/1/stroke/1` pink (radius 27; 21 at 390), its portrait `box/1` `#8451FA` ringed 4px `stroke/2` pink (radius 21), the name `sem/bg` violet (Display/Title), the line `text/2` pink |
| bio | Scheme 1 | the seal `Layer_1` (174.8 / 174.8 / 62.7): **4** | the root `sem/bg` white at radius 50 (0 at 390), unclipped; the card `box/1` `#F5F5F5` ringed 1px `stroke/1` pink at radius 50 (**no ring, radius 30 at 390**); the photo well `box/3` black at radius 15; the name `text/1` pink at Display/SM with a lime scribble under it (`scheme/1/tag1/bg`); the ID labels `text/1`, values `text/2` (Chakra Label/XS); `[ ABOUT ]` `text/1`, the paragraph `text/2`; a 5px `text/1` pink rule at the card's foot; the seal's disc `sem/bg` **blue**, globe `text/2` **yellow**, smiley `text/1` **teal**, features `text/3` white, name `text/2`; the sparkle **raw `#00E0C4`** |
| Genres (tags) | Scheme 1 | — | "Genres" `text/1` (Body/LG); six chips on `scheme/1/tag1…6/bg` at radius 8, **Label/XS 20 / 14 / 12 — the ramp**, not layout 2's hand-scaled 15.37; inks `scheme/1/tag1/text`, `scheme/1/tag2/text`, `scheme/3/inactive/text`, `scheme/4/tag1/text`, `scheme/5/tag2/text`, `sem/tag/6/text` |
| media | list 1 | the audio card **2** (on the instance); the five rows **3 / 4 / 5 / 7 / 8** | the card `box/1` `#D7FF23` at radius 50, **unringed**; played bars `text/1` pink, idle bars `box/2`, type `text/2` violet, the play disc `box/1` at radius 22. The list: "● POPULAR" and "5 FEATURED / 5 MAX" `text/2`; each row a pill `sem/bg` ringed 4px INSIDE in `stroke/2`, `stroke/1`, `stroke/2`, `stroke/2`, `stroke/1`, every leaf `text/1`; the 64 discs `box/2` in a 4px `scheme/1/stroke/2` ring — **layout 2's list exactly** |
| repertoire | Scheme 1 | the three `set` cards **2 / 3 / 4** | the head `text/2` violet (Display/LG); each set `box/1` (`#D7FF23` / `#FF63B8` / `#3F76FF`) ringed **4px** `stroke/1` (violet / violet / teal) at radius 50; the set name `text/2`, meta `text/1`, rows ruled 1px `stroke/1` at the foot, titles `text/2` (Display/List); at 390 a carousel (the three at x −260 / 50 / 360, the centred one Scheme 3) over two 180 × 54 pager pills ringed 1px `text/1` pink at radius 60 |
| calendar | **Scheme 2** | the foot pill (365 × 54 / 668 × 54 / 330 × 54): **2** again | the card `box/1` `#D7FF23` ringed **4px** `stroke/1` violet at radius **36**; "11" `text/2` at Display/LG, JUNE at Display/SM; day names `text/2`; dots booked `box/2`, picked `text/1` pink, free `box/1` in a 2px `stroke/1` ring, today 32 in a 2px `text/2` ring; the pill `text/1` pink (radius 67), its label and disc `sem/bg` lime round a pink arrow |
| gallery | **Scheme 2** | — | the sheet `sem/bg` lime; the head `text/1` **pink** (Display/LG); twelve tiles `box/3` `#8CA51E` under the photograph, radius 30, ringed **5px** INSIDE in `scheme/1/stroke/2` — **lime on the lime sheet**; one tile `active/bg` pink under its photograph |
| pricing | Scheme 1 | the featured `row` (1328 × 254 / 708 × 251 / 350 × 360): **2** | the root ringed 1px `stroke/1` pink **at every width**; the head "PRICING" `text/2` at **Display/Title**; the toggle `box/1` ringed `stroke/1` pink, its pick `text/1` pink under a `sem/bg` label; plain rows `sem/bg` white ringed 1px `stroke/2` **lime** at radius 50; names `text/2` (Display/List), the price `text/1` pink (Display/MD), the rest `text/2`; pills `text/1` pink (radius 67) round `sem/bg` labels and discs; the featured row `sem/bg` lime ringed `stroke/2` pink, its badge `box/1` (radius 4) lettered `text/2` |
| map | **Scheme 4** | the lit row (634 × 84 / 339 × 85), *See all gigs* (212 × 54 / 186 × 54 / 370 × 54) and `radius-map` (634 × 697 / 339 × 697 / 370 × 360): **3**; the `Map View Container` **inherits 3** | the band `sem/bg` **blue**; chips ringed 1px `stroke/1` teal, All filled `text/1` teal under a `sem/bg` label; rows ruled 1px `stroke/1` teal at the foot, date discs `box/1` `#3F76FF` ringed 2px `stroke/1` at radius 999, type `text/2` **yellow**; **the lit row a pill** `text/1` **lime** ringed 2px `stroke/1` violet, its venue and city `sem/bg` pink, its chip `sem/bg` in a `stroke/1` ring; *See all gigs* `text/1` lime round a `sem/bg` pink label and disc. The panel `box/1` `#FF63B8` at radius 50; the status pill `sem/bg` pink lettered `text/1` lime; title and sub `text/2` violet; the container `box/1` ringed 1px `stroke/1` violet at radius 25 (20 narrow); rings, labels and centre disc `sem/bg` **pink** (the 120 mi ring dashed 4, 4), labels lettered `text/2`, the centre disc's 2px ring `text/2`; idle dots `text/2` violet; zoom `box/2` ringed `stroke/1` at radius 8 |
| form | Scheme 1 | the card (634 × 373 / 708 × 354 / 370 × 349): **2** | the root `sem/bg` **white — no band**, with a 1440 × 1152 `sem/bg` bleed frame; the eyebrow `text/2`; the head `text/1` pink at Display/LG; the sub `text/2`; the card `box/1` `#D7FF23` ringed 1px `stroke/1` violet at radius 50; the price `text/1` pink, unit `text/2`, stars `text/1` beside a `text/2` count; three boxes `box/1` ringed 1px `stroke/1` at radius 999, labels `text/2` at **Label/SM** 16 / 13 / 12; the pill `text/1` pink (radius 67) round `sem/bg` lime |
| testimonials | Scheme 1 | `rating` **3**, the first `name-cell` **7**, `quote-cell` **2**, the second `name-cell` **4**, `small-quote` **5**, `feat-quote` **6** | the head `text/2` violet at **Display/MD**; six cells `box/1` at radius 50, each ringed 1px in its own `stroke/1` but `quote-cell` (unringed) — pink / coral / lime / blue / teal / violet; the rating's numeral `text/1` lime at Display/MD; the discs `text/1` ringed `stroke/1`, their initials `sem/bg`; quotes at **Label/LG** 24 / 16 / 14 in `text/2` (`text/1` in `quote-cell` and `small-quote`); the four 24² avatars ringed 2px `box/2` |
| footer | *(explicit 2)* | — | layout 1's raws: pink band, lime statement, white links — no binding, so the mode paints nothing |

Seven traps in that table:

1. **The header changes ground by width, not by card.** Every leaf inside `hero-card` stands on
   Scheme 6 at every width; only the instance root's own frame round it — 20 at 1440, 10 narrow —
   is white at 1440 and violet at 768 and 390. Layout 2's open question 7 and its note for the
   designer read this as "card 3 stands on Scheme 1 at 1440 and Scheme 6 narrow"; the card does
   not move (corrected there). Decision 1.
2. **Nodes name Scheme 1 outright under other seats** (CONVENTIONS A): the header's hero ring
   (`scheme/1/stroke/2`), capsule ring and card ring (`scheme/1/stroke/1`) and chips
   (`scheme/1/tagN`) under Scheme 6; the gallery's tile rings (`scheme/1/stroke/2`) under Scheme 2;
   the media discs' rings. Under a seat, each reads `s.onScheme[1]`. And the header's chips and the
   Genres chips letter themselves in **four other schemes' inks** (`scheme/3/inactive/text`,
   `scheme/4/tag1/text`, `scheme/5/tag2/text`, `sem/tag/7/bg`): resolve each to its hex before
   writing a key.
3. **The gallery's rings are lime on a lime sheet**: 5px INSIDE in `scheme/1/stroke/2` on Scheme 2's
   `sem/bg` — both `#C6F200`. Invisible as a colour, but a 5px ring that eats 5px of the photograph
   at every edge: follow it as the inset it is (layout 2's section 5: an overlay, not a border).
4. **The map's viewport is not Scheme 4** — Editorial's was explicitly 4; Pop's `Map View
   Container` states no mode and inherits `radius-map`'s Scheme 3, so its rings, labels and centre
   disc are `sem/bg` **pink**, not the seat's blue, and its dots violet.
5. **The map's lit row and *See all gigs* are Scheme 3 pills on a Scheme 4 band**: lime fills with
   pink type — the frame draws the lit state, so it is followed (CONVENTIONS C, *a twin's redrawn
   state is read against this frame*).
6. **The testimonials stand six cells on six schemes**, one per cell (3 / 7 / 2 / 4 / 5 / 6), where
   Lime's register is three seats, Grunge's two and Editorial's three: a six-entry `REG` in `G`,
   written fresh in Retro's `SEATS` order — never a remap of a twin's (CONVENTIONS A, *seat the
   schemes off the master, never remap the twin's register*).
7. **One raw hex, and it reads as Pop**: the bio's sparkle `#00E0C4` is Scheme 1's `tag4` (teal) to
   the byte — `s.chips[3].bg` — at every width. Layout 2's decision 2: followed, through the key.

### Grounds

Sampled off the three renders. **The sequence is the same at every width** (768 and 390 stack the
composed region: bio, media, repertoire, then the calendar):

| # | Section | Ground | What stands on it |
|---|---|---|---|
| 1 | header | **white at 1440, violet narrow** (the root's 20 / 10 frame) | the **violet card** (Scheme 6) ringed lime round the photograph; a violet capsule with lime links; the lime name; the six chips; a **lime card** ringed pink |
| 2 | bio | white | a `#F5F5F5` card ringed pink (none at 390), the blue seal on the photograph's corner, a teal sparkle, a lime scribble, a pink rule at its foot |
| 3 | media | white | the **lime** audio card (Scheme 2); five coloured pill rows |
| 4 | repertoire | white | three sets: **lime, pink, blue**, each ringed 4px |
| 5 | calendar | white (the composed column) | the **lime** card (Scheme 2) ringed violet |
| 6 | gallery | **full-bleed lime sheet** (Scheme 2) | twelve tiles in lime rings |
| 7 | pricing | white, **ringed 1px pink at every width** | white rows ringed lime; the featured one lime |
| 8 | map | **full-bleed blue band** (Scheme 4) | teal-ruled rows; a lime lit row; the **pink panel** (Scheme 3) round a dark viewport |
| 9 | form | white — **no band** (layout 2's form was blue) | the pink head; a **lime card** (Scheme 2) |
| 10 | testimonials | white | six cells: pink, coral, lime, blue, teal, violet |
| — | footer | pink, layout 1's | — |

**No root flag widens but `cardOnPage`** (session 0): `bleed`, `darkMap`, `cream`, `limeBand`,
`limeLight`, `grungeBand`, `editorialRule`, `popMediaRule` and `popClip` gate on `s.v0`, `s.v1` or
another template. Under route A′ a whole-band section needs no flag — the root paints the seat's
`s.bg` — so the gallery and the map take their grounds from session 0's seats alone, and a Lime
block that paints its own sheet paints nothing under `pop` (Grunge's `G.sheet` `undefined`) or the
seat's `s.bg`. The two cards on the page — the calendar's (as at layout 2) and the header's at 1440
(decision 1) — need `cardOnPage`'s.

## The decisions this plan makes or hands over

### 1. The header's ground — **a user call, asked in session 0**

The header's frames say two things: the card (`hero-card`, the photograph and everything over it) is
Scheme 6 at every width, and the instance root's frame round it is Scheme 1 (white) at 1440 and
Scheme 6 (violet) at 768 and 390. Layout 2's mechanisms can say both; which reads the frames best:

- **A (recommended): seat the header on 6 at every width, and let the root paint `vm.pageBg` round
  the card at desktop.** `SCHEMES_OF.Pop[2].header = 6`; `cardOnPage` gains `s.hd && s.v2 && s.pop
  && !s.narrow` (and `s.ca && s.v2 && s.pop` for the calendar, below). Every leaf of Lime's block
  then reads `s.*` on Scheme 6 — the card, the capsule, the links, the name, the pill, the foot —
  and only the `scheme/1/…` leaves (the hero ring, the capsule ring, the card ring, the chips) read
  `s.onScheme[1]`, Editorial's layout-3 header exactly. One flag, one row.
- **B: a `[1, 6, 6]` triple.** The root's `s.bg` is right at every width by itself, but at 1440
  every leaf inside the card then reads Scheme 1 and needs an `s.onScheme[6]` arm — about twenty
  arms for a ground three of them would carry under A.

Either way the seeded page and every other card move nothing. Session 0 asks this and records the
answer here.

### 2. Leaks and case on a bound page — **settled by layout 2; one carry-over**

Layout 2's decision 2 holds whole: a raw hex is a leak, judged per site by CONVENTIONS A; a leaked
face is set in Pop's own; a hand-scaled instance is not the ramp. This page has **one** raw hex
outside the footer (trap 7, followed through `s.chips[3].bg`) and **no** leaked face. Two hand-scaled
instances: the header's chips (Chakra Petch 15.04 / 10.53 / 9.02 at radius 6.01 — Lime's Tags
numbers), and the map's two unstyled Inter Bold 20s (the twins'). **The case slip is now the
narrow masters' rule, not one string's**: "Reads the room.", "Five worth your ear" and "Book Me" are
typed mixed at 768 and 390 and in capitals at 1440 — every display string is uppercased at every
width, layout 2's media head reading. Not asked again.

### 3. `navModeDefault`, `navFits`, `navGapEm` and `cardLine` at `d === 2` — **not a user call; session 0 and the header session**

JP-039's rule is the user's: Minimal where a template's layout-2 and -3 masters draw Music / Gigs /
About. Pop's layout-3 masters do at 1440 and 768 (390 is the burger), so `navModeDefault` gains Pop
at `d === 2` — session 0, since it moves only the seeded header's mode. The rest is the header
session's:
- **`navGapEm`** is 0 at Pop `d === 1` and 23/16 elsewhere; the 768 capsule is gapped a **fixed 18**
  (MUSIC ends at 102, GIGS starts at 120, padding 18), so it is 0 at `d === 2` too.
- **`vm.navFits`** falls through to Retro's Anton arm at Pop `d === 2` today: it takes the
  fixed-18 arm (`Grunge || Editorial || Pop at d === 1`) against **684** — the 768 bar runs from
  the capsule's 42 to the pill's 726, the twins' number — links at Label/SM 13, the name at
  Label/LG 16.
- **`FIELDS.header.cardLine`** is `'*': []`, which marks Pop "Not shown in this template"; this
  frame's card prints "Performing since 2021" (`text/2`, Body/SM) under the name, so it gains
  `Pop: [2]`, confirmed by `scripts/reach.mjs 4`.

### 4. `plans/CONVENTIONS.md` — **the sweep folds this pass in**

Keep *Inherited and used* below, one line per bullet leaned on; the sweep adds a *Pop (layout 3)*
column on A, B, C and D3 (D3's first Pop column), and any row this pass leaned on three times that
the file does not name.

## Session 0 — the data

Layout 2's session 0 again, smaller: **every mechanism and every scheme exists**, so it is one data
row and one-word gates. It touches no section's layout code.

0. **Branch and plan** — done at planning time (`pop-layout-3`). With the dev server up, take the
   pass's "before" pictures at `theme=4&arch=2` for all eleven categories at all three widths
   (`node scripts/shots.mjs before 4 2 desktop`, then `tablet`, `mobile`, each width with its own
   `OUT` — Editorial layout 3's session 0) into the scratchpad.
1. **Ask decision 1.** Nothing below but the header's seat and its `cardOnPage` arm depends on it.
2. **One commit, themes 0, 1, 2 and 3 at zero rows, canvas and live; theme 4 moves only in arch-2
   files:**
   - **`SCHEMES_OF.Pop[2] = { header: 6, calendar: 2, gallery: 2, map: 4 }`** (under A; B writes
     `header: [1, 6, 6]`), with a comment naming this page's nodes. Everything else stands on
     Scheme 1. **No `footer` entry**: the footer's explicit Scheme 2 paints nothing, so row 0's 3
     stands at every page.
   - **`cardOnPage`** (the root's `(s.me || s.ca) && s.v1 && (s.editorial || s.pop)`) gains the
     calendar at layout 3 under Pop — `s.ca && s.v2 && s.pop` — so the root paints `vm.pageBg`
     (white) round the lime card in the composed column, and (under A) `s.hd && s.v2 && s.pop &&
     !s.narrow`.
   - **`navModeDefault`** gains Pop at `d === 2` (decision 3).
3. **Name what moved and why** in *Settled in session 0*, as layout 2's did: the flat `s.v2` arms
   and `HeaderV2`'s Retro half now stand on the frames' grounds — the header violet, the gallery
   lime, the map blue, the calendar a lime card on white — and their own readings (`paper`,
   `deep`, `pillBg`) will go wrong there in ways their sessions fix. **Expect the map's flat
   mustard sheet (`pillBg`) to turn teal** (Scheme 4's `activeBg` `#00E0C4`), layout 2's form trap,
   and the header's placeholder half to put Scheme 6's pink `s.tx` and lime `s.ac` where its Retro
   inks stood.
4. **`preview.jsx`** needs nothing (its `Z` carries `dev`); confirm at all three widths that the
   gallery is lime, the map blue and the 1440 header's frame white round a violet card.

**Verification for session 0:** themes 0, 1, 2 and 3 at zero rows, canvas and live (`node
scripts/digest.mjs before 0,1,2,3` / `after`, then `EXTRA='&live=1'`); theme 4 filtered to
`_arch_0_` and `_arch_1_` (**zero** — layouts 1 and 2 must not move) and `_arch_3_` (zero — layout 4
is a later pass's placeholder), and listed by category for the rest: **header, calendar, gallery and
map at arch 2**, and nothing else. **The footer's `page_2` file must not move** — the proof that the
footer's explicit Scheme 2 is inert. Header arch 2 has **no fold partner** (`HEADER_COUNT.pop` is 4),
so three header files a surface. Keep before / after shots of all eleven at all three widths.

## The header, and card 3

`HeaderV2`'s Lime block is where deliverable 3 is met.

- **The block widens at its head** to `(s.limeTree || s.pop)`, `const pop = s.pop`. Retro's half
  becomes unreachable under Pop; nothing in it needs deleting (grepped).
- **The tree is Lime's 44 whole** (LCS 44 / 44) at every width, and **the 390 master is Lime's
  606.5**, not Editorial's 663.5 — Lime's written-out 390 (D3, *the 390 master is written out, not
  derived*) is the nearer start; read Editorial's arm for the light page and `s.onScheme`.
- **Under decision 1's A the seat is Scheme 6**, so most of what the block reads is already the
  binding: the card's `box/2` well and its `box/3` fade, the capsule `sem/bg` violet, the links
  `text/1` lime, the foot's name `text/1` lime and the location dot, the card `text/1` lime, the
  portrait `box/1` in `stroke/2`, the card's name `sem/bg`, its line `text/2`. The deltas the
  planning walk found:
  - **the frame round the card**: white at 1440 (`vm.pageBg`, the root), violet narrow (the seat);
    padded 20 / 10 / 10, the twins' numbers;
  - **the hero ring**: 8 / 8 / **2** INSIDE in `scheme/1/stroke/2` (`s.onScheme[1].stroke2`,
    lime) at radius 30 — the narrowest ring of any template's 390 hero;
  - **the capsule** violet ringed 1px `scheme/1/stroke/1` (pink), 219 × 34 at 1440, 191 × 30 at 768
    (gapped a fixed 18, padding 18); at 390 the burger capsule (62 × 34) with three `text/2` pink
    bars;
  - **the name and Listen** `text/3` **white** — Pop's `text3`, the first `s.text3` read on a
    layout-3 page; the name Label/LG 24 / 16 / 14;
  - **the Book pill** is the seat's own `sem/bg` violet on the violet card (145.32 × 34.93 at radius
    57.18, Lime's `pk` box; 129.3 at 768, 123.3 at 390), its label and disc `text/1` lime round a
    violet arrow, **no block** (no effect anywhere on the page) — read the render: it is a violet
    pill on violet, outlined by nothing; follow it;
  - **the foot**: the name `text/1` lime at Display/LG, **one tone**; the location `text/3` white at
    Display/List beside a `text/1` dot (radius 8); the six chips the header's hand-scaled Tags
    instance (Chakra 15.04 / 10.53 / 9.02, radius 6.01) on `s.onScheme[1].chips` with trap 2's inks;
  - **the card**: `text/1` lime ringed 4px `scheme/1/stroke/1` pink (radius 27; **21 at 390**, where
    it turns horizontal, 350 × 127, Lime's), the 87 portrait `box/1` ringed 4px `stroke/2` pink at
    radius 21, the name `sem/bg` violet at Display/Title 28 / 22 / 20, the line "Performing since
    2021" `text/2` pink at Body/SM 12 — `vm.cardLine` (decision 3).
- **The photographs are the seeds** (`f70d25d3` `FILL` = `popHero`; the portrait `0b079033`, a
  `CROP` over the top 80% at 1440 and `FILL` narrow = `POP_HEADER_AVATAR`, the top square).
- **Decision 3's nav work**: `navGapEm`, `vm.navFits` against 684, `cardLine`'s reach. Measure the
  seeded fold at 768 with `&nav=`, layout 2's walk.
- **`showBadge` and `badgeText`** stay off design 2 (the header draws no seal; the bio's seal is
  the bio's). `cta2` holds `[1, 2]` (390 drops LISTEN, confirmed on the master).
- **The 0.14em lift** (CONVENTIONS B's Pop row): scan the foot's name and the card's name per
  width before lifting.
- **Digest**: `HEADER_COUNT.pop` is 4, so header arch 2 has **no fold partner** — three theme-4
  files a surface.
- **In the builder** (`node scripts/page-check.mjs Pop 2,0,1,3` — card 3 first gets the full walk):
  the modal shows four Pop cards; card 3 opens every section at arch 2 in `PAGE_ORDERS[2]`, the
  bio and the calendar composed at desktop, the footer at arch 0 (pink); publish, every nav link
  scrolls, the burger opens at 390, Book Now reaches `#form`.
- **`scripts/reach.mjs 4`** re-measures the header's Pop row over the fitted card (the card-3
  entries — kicker, tags and showTags `[0, 2, 3]`, location all four, cta2 `[1, 2]` — were measured
  over the placeholder's Retro `HeaderV2`), with `cardLine` gaining `[2]`.

## Pop's layout-3 decorative language

Everything here is behind `s.pop`, the widened pair or a named arm, and replaces what the Lime block
gates on `s.lime`, Grunge's arms on `s.grunge` and Editorial's on `s.editorial`.

- **Rings, not dashes or glows.** Every card edge is a solid INSIDE stroke — an inset `boxShadow`
  (CONVENTIONS C), on an overlay where an image or a child paints over it. The weights are Pop's
  own and differ per node: **8 / 8 / 2** (the header's photograph), **5** (the gallery tiles), **4**
  (the header card and portrait, the media rows and discs, the repertoire sets, the calendar card),
  **2** (the map's date discs, lit row and centre disc, the calendar's dots, the testimonials'
  avatars), **1** (the capsule, the bio card, pricing's root and rows, the map's chips, rows and
  container, the form's card and boxes, the testimonials' cells). Read each.
- **Stickers, on the bio alone**: Pop's **smiley-globe seal** (`Layer_1`, 174.8 at 1440 and 768,
  62.7 at 390, Figma −19.5° → **CSS +19.5°**) on Scheme 4 — blue disc, yellow globe, teal smiley,
  white features, its name `text/2` — on the photograph's top-right corner, where layout 1's form
  and footer seals are raw (`#3C5BAA`). `SealBadge`'s Pop arm and its `face` / `features` props are
  layout 1's form session's; read what it takes for Scheme 4's inks. A **teal sparkle** (90 × 91 at
  every width, Figma 17.93° → **CSS −17.93°**, raw `#00E0C4` = `s.chips[3].bg`) at the card's lower
  left (lower right at 390); a **lime scribble** (`Vector` 114.5 × 32.8, `scheme/1/tag1/bg`) under
  the name — transcribe both off `fillGeometry` (CONVENTIONS A, *icons and stickers … transcribed
  off the node's own geometry*), and check layout 1's transcriptions first. **No sticker on any
  other section**, the header included (Lime's tree whole).
- **A 5px pink rule** at the bio card's foot (`Frame` 858 × 5, `text/1`) — the one rule on the page.
- **Pills where the twins draw rules**: the media rows (layout 2's), the map's lit row, every pill
  CTA (radius 67) and every chip (999).
- **Radii** are Pop's: the header card 30, its card 27 (21 at 390), portrait 21; the bio card 50
  (30 at 390), its well 15; the audio card 50; the sets 50; the calendar card **36**; the gallery
  tiles 30; pricing's rows 50; the map panel 50, its container 25 (20 narrow), its date discs 999;
  the form card 50, its boxes 999; every testimonials cell 50. Read each per master.
- **No effect, no seam, no texture, no tilt** but the bio's two stickers.
- **Type**: every display and label string uppercase at its own site, in Titan One through `faced`
  (`faceK` 0.98), **never with a `fontWeight`**, and lifted 0.14em where a scan shows it (layout 2's
  rule, per site). Every head is one tone and on the ramp: Display/LG for the bio, media,
  repertoire, gallery, form and calendar numeral, **Display/MD for the testimonials** (head and
  numeral), **Display/Title for pricing's head and "BOOK ME"**, Display/SM for the bio's name and
  the calendar's month. The quotes are **Label/LG** 24 / 16 / 14, Editorial's and Lime's token.

## Photography

Every photograph this page draws in its own right is **already seeded** (`SEEDS.Pop` in
`photos.js`); no export is owed. Image hashes, read off all 39 masters:

| Section | Slot (frame box) | Hash | Seeded | Verdict |
|---|---|---|---|---|
| header | the card 1400 × 860 / 748 × 1004 / 370 × 586.5 | `f70d25d3`, `FILL` | `popHero` | ✓ — a centred cover (`FILL` ignores the transform) |
| header | the portrait 87 × 87 | `0b079033`, `CROP` `[[1, 0, 0], [0, 0.8003, 0]]` at 1440, `FILL` narrow | `POP_HEADER_AVATAR` | ✓ — the top square already |
| bio | photo 798 × 380 / 648 × 380 / 350 × 259 | **`51d06990` under `CROP` `[[1, 0, 0], [0, 0.3571, 0.0637]]`** at 1440 and 768, `FILL` at 390 — over **`fa453f7d`** (Lime's stage shot) at `FILL` in the `box/3` well | `POP_PHOTOS.bio` (`popStage`) | **Grunge's and Editorial's case again**: rows 6.4–42.1% of the seed, full width; correlate the render and take an `objectPosition` (Grunge's section 2), not a landscape export. The covered leak is the designer's (open question 2) |
| media | five 64² covers | `8c7fa7d8` `4e7cc529` `b737c3e0` `40041573` `21e9622c` | `ROW_ART.media` | ✓ the shared five |
| gallery | twelve tiles 326 × 185.3 / 230.7 × 150 / 111.3 × 83.8 | Retro's (`3f0c98b4` ×2, `b35b6507` ×2, `b073b46f`), Grunge's (`221f121f` ×2, `8031d0f3`), Editorial's (`9d20fe0d`, `ae069c14` — a `CROP` at 1440), **Pop's own** (`f70d25d3`, `0b079033`) and **`3a59b4d1`**, in no seed | `POP_PHOTOS.gallery`, seven slots | **layout 1's departure again**: the seven Pop slots stand (open question 3) |
| map | `Map Texture` 570 × 472 / 315 × 521 / 350 × 164 | `e089bd11` | `vm.mapRadialSrc` | ✓ — on the pink panel's `box/1` container; sample the plate |
| testimonials | four 24² `av` | `ef14e35b` `ae0de808` `2de917bf` `fbe69d03` | — | nothing: the stat card draws `vm.quotes[].mark` discs (the twins' reading) |

## What already renders, and the traps in it

A code survey at planning time (every `s.v2` gate mapped to its enclosing branch; every `T.name`
gate at `d === 2` in `sectionVm` read):

- **`HeaderV2` renders Retro's half** under Pop — layout 1's card-3 placeholder (its open question
  8): the checker ribbon, Retro's composition in Scheme 1 tokens. It carries no Pop arm.
- **Every other `s.v2` branch renders Retro's arm under Pop**, flat: no layout-3 site reads `s.pop`
  (grepped — the ten Lime blocks are `s.limeTree`, the gallery's reads `s.limeTree`, `grunge` and
  `ed`). So goal 1 is met before any session runs, and each session still runs `theme=4&live=1`
  for layout 1's two reasons: a decoration can cover a control, and a live state can stop reading
  — here colour on colour, with Scheme 1's active pair black and idle pair lime.
- **`sectionVm`'s `d === 2` arms name Lime, Grunge and Editorial alone**, each for its session to
  widen (every number matches, *The composed page*):
  - the composed row's **`vm.pad`** (bio / calendar / media: top 50, feet 30 / `padY` / 20 · 34 ·
    26) — bio, media and calendar sessions, one each; the heads part until the calendar closes the
    row;
  - pricing's footnote (**32** at 1440 and 768) — the pricing session;
  - the form's and testimonials' insets (form foot 90 / 60; testimonials head 56 / 30, foot 56) —
    each in its own session;
  - **`navModeDefault`** (Pop at `d === 1` only) — session 0; **`navGapEm`** (Pop 23/16 at
    `d === 2`) and **`vm.navFits`** (Pop falls to Retro's Anton arm at `d === 2`) — the header's
    (decision 3).
- **Already Pop's at every design**: `vm.titleWordEms` (`titanEms` × 0.98), `HEADING_3` and
  `formHeading3()` (every template at `d === 2`), `Photo`'s backdrop (`s.pop ? s.tx`, layout 1's).
- **`cardOnPage`** is `(s.me || s.ca) && s.v1 && (s.editorial || s.pop)` — layout 2's; session 0
  widens it (decision 1).
- **`footerBand`** is Lime's and Grunge's at `page === 2` and `undefined` under Pop, so the pink
  footer stands on card 3's page with no change.
- **`FIELDS` rows keyed by template**: the header's Pop row (card-3 entries measured over the
  placeholder; the header session re-measures), `cardLine`'s `'*': []` (decision 3),
  `FIELDS.media.countLabel`'s `Pop: [1, 2]` (this frame draws "5 FEATURED / 5 MAX" — confirm), and
  `FIELDS.calendar.heading`'s `Pop: [0, 1, 2, 3]`. Each session re-measures the rows its category
  owns with `scripts/reach.mjs 4`.
- **`onScheme` keys 1–8 under Pop** (layouts 1 and 2), so every Editorial `s.onScheme[n]` read in a
  widened layout-3 block works under Pop as it stands.

## Per-session procedure

[`../lime/layout-3.md`](../lime/layout-3.md)'s *Per-session procedure*, steps 1–9, with:

- step 2: session 0's (above), not the header's.
- step 3: `get_metadata` on the three Pop nodes and the Lime and Editorial desktop nodes, then the
  paired diff walk (CONVENTIONS A) against Lime's — **by traversal order and case-insensitively**.
- step 4: `get_variable_defs` on all three nodes (top-level ids only), and **one
  `explicitVariableModes` walk per master** (the header's root moves by width). Then the node
  walker (Grunge layout 2, *Conventions*) with per-side stroke weights, radii, rotations, effects
  and **bound-variable names with their collection** (trap 2) — its raw paints listed separately,
  since on this page each is a leak. On a section with a nested scheme, read each nested node's
  leaves against `s.onScheme[n]`, not `s.*`.
- step 5: widen the section's **Lime layout-3 block** at the placement the sections table names to
  `(s.limeTree || s.pop)`, `const pop = s.pop`, reading its **Editorial** arm first (the light page
  and `s.onScheme`), then Grunge's; a fourth arm in `G` where the block has one, new leaves falling
  back through `??`. Never edit a Retro, Lime, Grunge or Editorial literal to make Pop look right.
  Desktop numbers × 0.82, 768 and 390 verbatim; every display string uppercase at its site, through
  `faced`.
- step 6: the harness is `preview.html?cat=<cat>&arch=2&theme=4&w=desktop|tablet|mobile` (pass
  `arch=2`), with `&column=left|right` for the bio, the media player and the calendar at desktop;
  function at `theme=4&live=1`; **zero rows at themes 0, 1, 2 and 3** before and after, every
  session (`node scripts/digest.mjs before 0,1,2,3` / `after`, then `cmp`); then theme 4, where
  every differing file must be this section's category at **arch 2**. **A theme-4 diff in any
  `arch_0` or `arch_1` file — or in the header's `arch_4` / `arch_5`, which fold onto designs 0 and
  1 — is a regression of a closed pass**, and one in `arch_3` moves layout 4's placeholder.
- step 9's hand-off prompt:

  ```
  Continue the Pop layout-3 pass with section N, `cat`.

  Read CLAUDE.md, then plans/pop/layout-3.md, then the Conventions and Settled in session 0 of
  plans/pop/layout-2.md, plans/pop/layout-1.md and plans/editorial/layout-3.md, then
  plans/CONVENTIONS.md (groups A, B, C and D3), then this section's Settled notes in
  plans/lime/layout-3.md, plans/grunge/layout-3.md and plans/editorial/layout-3.md (and its
  entries in plans/lime/layout-3-qa-fixes.md, plans/lime/retest-qa-fixes.md,
  plans/grunge/layout-3-qa-fixes.md and plans/grunge/retest-qa-fixes.md), then the Conventions
  and the 2026-09-15 Addendum of plans/retro/layout-3.md, then the `figma-frame-reading`,
  `verifying-the-published-tab` and `browser-tool-choice` memory notes, and follow the
  per-session procedure.

  The three Pop masters are `<desktop node>` (<W> × <H>), `<tablet node>` (768 × <H>) and
  `<mobile node>` (390 × <H>) in Figma file uFoUbPaBrDicjyuSBEbtGT, page 964:58573, on Scheme
  <N> (nested: <…>); the Lime twin is `<lime nodes>` and the Editorial twin `<editorial nodes>`.
  This page is bound — read the variables; a raw hex is a leak. Widen the Lime block <placement>
  of `<Component>` in EncoreSection.jsx to `(s.limeTree || s.pop)`, Pop's deltas behind `s.pop`,
  reading its Editorial arm first. Themes 0, 1, 2 and 3 must digest to zero rows, and theme 4
  may differ only in `<cat>` arch 2.

  <the two or three conventions most likely to bite this section>

  Branch: pop-layout-3. Do not refresh the root index.html.
  ```

Do **not** refresh the root `index.html` per section; it is the sweep's last step, with the
two-build digest (`scripts/build-digest.mjs`, `CARD=2` for card 3). The seeded `EXAMPLE_PAGE` is
arch 0 throughout, so the page walk will show no difference at any theme; the proof that this pass
shipped is card 3 in both builds' setup modals.

### The second session: the bio

The composed row's proof is the bio's (deliverable 3), and the bio is this page's one tree exception:
- **The seal is Pop's, not Lime's.** Lime's block passes `SealBadge … classic={!grunge}` (Lime's
  `Frame 248`); under `pop` it draws Pop's smiley-globe seal on Scheme 4 instead (*decorative
  language*), read through `s.onScheme[4]`; Editorial's arm draws none (its tape).
- **No `Frame 302`**: the card stands directly under its head, 30 below, as Lime's and Grunge's do —
  Editorial's 50 of tape clearance is not Pop's.
- **The card**: `#F5F5F5` ringed 1px pink at radius 50 at 1440 and 768; **no ring and radius 30 at
  390**. The instance root is `sem/bg` white at radius 50 (0 at 390) and clips nothing — read
  `clipsContent` before deciding whose radius the card is (Editorial's section 2). The 5px pink rule
  at the foot is a node of Pop's own: read where Lime's divider stood before drawing it.
- **The photograph**: the `CROP` band as an `objectPosition` (Grunge's section 2), correlated
  against the render; `FILL` at 390.
- **The head**: "READS THE ROOM." one tone in `s.ac` at Display/LG, uppercased at 768 and 390
  (decision 2). It fits every width.
- **The Genres row**: Label/XS on the ramp, each chip on its own `scheme/1/tagN` with trap 2's
  inks.
- **The builder**: Pop → card 3 → *Use this header*; the bio and the calendar in one grid row at
  709 : 334.5 on the canvas and 864.8 : 408.2 in the published 1440 tab, media under the bio.

## The end-of-pass sweep

Written now from what the plan can see; the sections add to it. One session, in this order:

1. **CLAUDE.md, README.md and `notes/`**, wherever they describe Pop as designed at layouts 1 and 2,
   or a layout-3 state as Lime's, Grunge's and Editorial's alone. The known sites: the *Pop's
   layout-1 frames … Its layout-2 frames …* sentences of the scheme bullet (`SCHEMES_OF.Pop` gains
   row 2; `cardOnPage`'s reach); `navModeDefault`'s sentence in `notes/nav.md`; the `vm.pad`
   comments at `d === 2` ("all three templates"); `cardLine`'s *`'*': []` marks Retro and Pop*
   sentence (Pop now reads it); the `s.live` list's layout-3 controls; `notes/templates.md`'s
   per-layout paragraphs. Grep for "layout 3", "Pop" and "placeholder".
2. **One whole-page published check under Pop at layout 3** — `node scripts/page-check.mjs Pop
   2,0,1,3` plus the layout-3 controls the builder walk cannot reach, driven in the harness (the
   gallery viewer — open, arrow, Escape, scroll lock — on the lime sheet; the repertoire's reveal at
   `n=20` and its 390 carousel; the pricing stack's moving seat; the map's zoom and *See all gigs* at
   `n=30`) — then 180px seam clips at every band edge at 1440 and 390: the 1440 header's white frame,
   the lime gallery sheet, the blue map band and the pink footer are the full-bleed edges;
   **`overflow` 0 at 768 and 390**.
3. **The layout-picker thumbnails** for arch 2 under Pop (deliverable 4) — the header violet (white
   frame at desktop), the gallery lime, the map blue.
4. **The other three header cards** still render and publish; card 4 stays a placeholder (layout 1,
   open question 8).
5. **`scripts/reach.mjs 4`** over the whole template; the header's Pop row re-measured over the
   fitted card 3.
6. **Every `(s.limeTree || s.pop)` and every `s.limeTree` left in layout-3 code**, listed with why
   Pop does or does not share it — beside layouts 1's and 2's 31. With card 3 fitted, three of Pop's
   four families are fitted; the fold (layout 2's decision 1) is still the family's last pass's.
7. **`plans/README.md`**: mark the pass closed; **`CONVENTIONS.md`** (decision 4).
8. **Notes for the designer**, gathered from the open questions, layout 2's shape.
9. **Refresh the root `index.html`** with the two-build digest (`CARD=2`, reduced motion on — the
   footer's seal spins): zero rows at every theme on the seeded page; the shipped-it tell is card 3
   in the two builds' setup modals (the old one's checker ribbon and Retro's composition; the new
   one's violet card in its lime ring, the capsule and the lime card).

## Conventions

Append as the pass goes. Do not repeat layout 1's, layout 2's, Editorial's, Lime's, Grunge's or
Retro's bullets; name them.

- **Layouts 1's and 2's conventions all hold**: the gates are `s.pop`, the widened pair, the named
  pairs and `s.designed`; never edit another template's literal; uppercase per site, through
  `faced`, with no `fontWeight` on Titan One; body copy is `s.tx`; a raw hex is a leak; a Scheme 2
  card binds `box/1`; themes 0, 1, 2 and 3 at zero rows.
- **Harness:** `theme=4`, `arch=2`, every width, `&column=` for the three composed sections.
- **Read a scheme per master — and per node, at the root too**: the header's root moves by width
  while its card does not (trap 1).
- **Diff by traversal order and case-insensitively, never by id.**
- **Every head on this page is one tone and on the ramp**, and its token is read off its own text
  style: the testimonials' head and the pricing head are not Display/LG.
- **The narrow masters type their composed heads in mixed case**; uppercase every width.

### Seen at planning time, per section

From the renders and the planning walk — impressions to confirm, not measurements.

1. **header** — see *The header, and card 3*.
2. **bio** — see *The second session*. The ID card's labels pink over violet values in Chakra
   Petch; the name pink at Display/SM over its lime scribble; the paragraph violet (Body/MD); the
   blue seal over the photograph's top-right corner; the teal sparkle half over the card's
   lower-left edge (390: the right edge, over the prose).
3. **media** — the **lime** audio card (`s.onScheme[2]`, `box/1`, radius 50, unringed): played bars
   pink, idle bars `box/2`, type violet; the list **layout 2's pills** on Schemes 3 / 4 / 5 / 7 / 8
   (*Sizes*); the head pink at Display/LG in the 632 box, two lines at 1440, one at 768, one in the
   master at 390 (two expected — *Sizes*).
4. **repertoire** — three sets, **lime / pink / blue** (`s.onScheme[2]` / `[3]` / `[4]`), seated by
   rendered place (the 390 carousel centres the pink one, seat 1 = Scheme 3 — Lime's discriminator),
   each ringed 4px in its own `stroke/1`; meta `text/1` (pink / lime / teal), titles and times
   `text/2` (violet / violet / yellow); the 390 pager two 180 × 54 pills ringed pink; the head
   "CURATED SETS" violet (ours `vm.title`).
5. **calendar** — a **lime** card (`box/1` `#D7FF23`) ringed **4px violet** at radius 36 — Lime's
   is a 2px ring, Editorial's a dash; the numeral violet at Display/LG with Titan's J to check in
   "JUNE" at Display/SM; dots `box/2` booked, pink picked, ringed free; the pill pink on Scheme 2,
   **Lime's own** (Editorial turned it to 1); "BOOK ME" violet at Display/Title.
6. **gallery** — the **lime** sheet by the seat (the root paints it); tiles `box/3` `#8CA51E` in
   **5px lime** rings (trap 3), one on pink; the head **pink** (`s.ac` under the seat); the viewer's
   scrim and controls are this template's call (no frame draws them) — on a lime page.
7. **pricing** — white in a 1px pink ring at every width; plain rows white ringed **lime**, the
   featured one lime (`s.onScheme[2]`) ringed pink with a `box/1` badge; prices pink at Display/MD,
   "PRICING" at Display/Title; the toggle in a pink ring with a pink pick; pills pink with white
   labels (lime on the featured row).
8. **map** — a **blue** band (seat 4; `G.sheet` undefined, the root paints it); rows ruled teal,
   type yellow, date discs `#3F76FF` in teal rings; **the lit row a lime pill** (`s.onScheme[3]`,
   trap 5) under pink type, followed; *See all gigs* lime round a pink disc; the panel **pink**
   (`s.onScheme[3]`), its viewport on Scheme 3 too (trap 4) — pink rings and labels, violet dots;
   the head yellow ("Where I'm playing." — ours `vm.title`).
9. **form** — **white, no band**; the head pink at Display/LG, two lines at 1440 (BOOK KAI FOR /
   YOUR EVENT in the 634 box — the twins' fit to its widest word to check, `titleWordEms` is Pop's
   already); the card lime (`s.onScheme[2]`, `box/1`) in a 1px violet ring; boxes white-on-lime
   pills ringed violet with violet labels at Label/SM; the pill pink. The four label-in-box inputs
   keep `--ph: 1` (JP-093); the refused box's colour is this session's (CONVENTIONS C).
10. **testimonials** — a **six-register** wall (trap 6): rating pink (3), name-cell coral (7),
    quote-cell lime (2, unringed), name-cell blue (4), small-quote teal (5), feat-quote violet (6);
    the rating's numeral lime at Display/MD; the quotes at Label/LG; the head violet at Display/MD,
    one line once the 306 cap is dropped (*Sizes*).

### Settled in session 0 (the data)

*(Empty until session 0 runs.)*

### Inherited and used

*(The running list the sweep folds into [`../CONVENTIONS.md`](../CONVENTIONS.md): each time a
session leans on a bullet from Pop's layout 1 or 2, Editorial's, Lime's, Grunge's or Retro's
Conventions, name it here in one line, with the plan it came from, a blank line between sessions.)*

## Open questions

1. **Decision 1** — the header's ground: seat 6 with `cardOnPage` at desktop (A, recommended) or a
   `[1, 6, 6]` triple (B). Session 0 asks.
2. **The bio well's covered leak** is Lime's `fa453f7d` under Pop's own photograph, painted over —
   Grunge's and Editorial's layout-3 open question again. Worth telling the designer.
3. **The gallery's twelve tiles** are placeholders from four templates (Retro's, Grunge's,
   Editorial's and two of Pop's) plus `3a59b4d1`, which no template seeds; the seven Pop slots
   stand (layout 1, open question 6). Worth telling the designer with it.
4. **The narrow masters type their three composed heads in mixed case** where 1440 types capitals
   — layout 2's media slip on every composed head. Uppercased everywhere (decision 2). Worth telling
   the designer.
5. **The testimonials' head breaks inside the word** at 1440 ("EXPERIENC / ES.") in its capped 306
   box — Editorial's case; the twins' dropped cap stays dropped. Worth telling the designer.
6. **The 1440 footer instance draws no type in Figma**: its 13 text nodes report a missing Chunko
   style (`hasMissingFont`) and no render bounds, where the narrow instances and layout 2's desktop
   footer render. And all three footer instances set Scheme 2 explicitly on an unbound tree, which
   paints nothing. The page draws layout 1's pink footer. Worth telling the designer.
7. **`Frame 299` sets Scheme 3 and nothing reads it** — inert (*The composed page*). Worth a line to
   the designer only if the column was meant to be pink.
8. **Header card 4** stays a placeholder: Retro's `HeaderV3` path. Its own pass's (layout 2 recorded
   its frame on Scheme 3 at every width — that pass re-reads it).
