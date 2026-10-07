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
2026-10-05). The planning session created it and committed this plan there. **Rebased onto `main`
on 2026-10-06** (`e54a3ba`, after the Editorial layout-3 QA merge, #51). That was a fast-forward:
#48 merged `pop-layout-3` itself, which carried `pop-layout-2`'s 33 commits and this plan, so
the branch held nothing `main` lacked.
That QA batch moved two of the blocks this pass widens. *Inherited from Editorial layout 3's QA*,
under the header and under the repertoire (*Seen at planning time*, item 4), records what Pop
gets from it.
**Rebased again on 2026-10-07**, after section 1, onto `6c81448` (after #52, Editorial layout 4's
QA, and #53, JP-120). There was one conflict, in a comment. JP-109 and section 1 had both rewritten
`sectionVm`'s note over `vm.cardNameEms`, and the merged note names both. Neither batch touches a
layout-3 block: JP-108 … JP-110 are `s.v3`, and JP-120 is the layout-2 form. `git range-diff`
shows the four patches unchanged but for that comment. **The two-server digest against `main`**
(`main` in a worktree on `:5181`, the branch on `:5182`, the port normalised out of
`background-image`'s URLs) shows themes 0, 1, 2 and 3 at zero files of 660, canvas and `live=1`.
Theme 4 moves exactly 12 files on each surface: header, calendar, gallery and map at `arch_2`,
three widths each. Those are session 0's seats and section 1's header, and nothing else.

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
| 0 | *foundation* | `964:68750` *(page)* | — | `984:15355` | — | `984:15386` | — | — | — | — | `SCHEMES_OF.Pop[2]`, `cardOnPage` at `d === 2`, `navModeDefault` (decision 1) | **done** |
| 1 | `header` | `964:68751` | 1440 × 900 | `984:15356` | 768 × 1024 | `984:15387` | 390 × **606.5** | **1 / 6 / 6** (`hero-card` **6** at 1440; the rings, capsule ring and chips name Scheme 1) | `964:68654` / `984:10740` / `984:10771` | `964:68718` / `984:16812` / `984:16843` | `if (s.limeTree) { … return }` at the head of `HeaderV2` | **done** `469ffa3` |
| 2 | `bio` | `964:68760` *(head `964:68755`, in Section `964:68754`)* | 858 × 882 | `984:15364` *(head `984:15359`)* | 708 × 912 | `984:15395` *(head `984:15390`)* | 370 × **893** | 1 (seal **4**) | `964:68663` / `984:10748` / `984:10779` | `964:68728` / `984:16820` / `984:16851` | `if (s.v2 && s.limeTree)` ahead of `Bio`'s `if (s.v2)` | **done** `66cc709` |
| 3 | `media` | `964:68771` list + `964:68770` card *(head `964:68763`)* | 858 × **678** + 858 × 243 | `984:15375` + `984:15374` *(head `984:15367`)* | 708 × 647 + 708 × 243 | `984:15406` + `984:15405` *(head `984:15398`)* | 370 × 647 + 370 × 243 | 1 (card **2**; rows **3 / 4 / 5 / 7 / 8**) | `964:68674` + `964:68673` / `984:10759` + `984:10758` / `984:10790` + `984:10789` | `964:68739` + `964:68738` / `984:16831` + `984:16830` / `984:16862` + `984:16861` | `if (s.limeTree)` inside `Media`'s `if (s.v2)`, after `nHot` | **done** `8a386f5` |
| 4 | `repertoire` | `964:68775` | 1440 × 621 | `984:15376` *(in `984:15373`)* | 708 × **628** | `984:15407` | 390 × **693** | 1 (sets **2 / 3 / 4**) | `964:68678` / `984:10760` / `984:10791` | `964:68743` / `984:16832` / `984:16863` | `if (s.limeTree)` inside `Repertoire`'s `if (s.v2)`, after `arrow` | **done** `b5e832b` |
| 5 | `calendar` | `964:68774` *(in `964:68772`; "BOOK ME" `964:68773`)* | 405 × **481.9** | `984:15379` *(in `984:15377`; `984:15378`)* | 708 × **445.9** | `984:15410` *(in `984:15408`; `984:15409`)* | 370 × **427.9** | **2** (the instance; its pill names 2 again) | `964:68677` / `984:10763` / `984:10794` | `964:68742` / `984:16835` / `984:16866` | `if (s.limeTree)` inside `Calendar`'s `if (s.v2)`, after `line` | **done** `94d3c24` |
| 6 | `gallery` | `964:68776` | 1440 × 789 | `984:15380` | 768 × **857** | `984:15411` | 390 × **579** | **2** (tile rings name Scheme 1) | `964:68679` / `984:10764` / `984:10795` | `964:68744` / `984:16836` / `984:16867` | **no block** — `s.limeTree`, `(s.lime \|\| grunge)` and `ed` reads through `Gallery`'s `if (s.v2)` | **done** `0dd172e` |
| 7 | `pricing` | `964:68777` | 1440 × **1093** | `984:15381` | 768 × **1010** | `984:15412` | 390 × **1419** | 1 (featured row **2**) | `964:68680` / `984:10765` / `984:10796` | `964:68745` / `984:16837` / `984:16868` | `if (s.limeTree)` inside `Pricing`'s `if (s.v2)`, after `shown` | **done** `ed6432a` |
| 8 | `map` | `964:68778` | 1440 × **809** | `984:15382` | 768 × **827** | `984:15413` | 390 × **880** | **4** (lit row, *See all gigs* and `radius-map` **3**; the viewport inherits 3) | `964:68681` / `984:10766` / `984:10797` | `964:68746` / `984:16838` / `984:16869` | `if (s.limeTree)` inside `EventsMap`'s `if (s.v2)`, after `litRow` | **done** `1177b7f` |
| 9 | `form` | `964:68779` | 1440 × **553** | `984:15383` | 768 × **667** | `984:15414` | 390 × **716** | 1 (card **2**) | `964:68682` / `984:10767` / `984:10798` | `964:68747` / `984:16839` / `984:16870` | `if (s.limeTree)` inside `EnquiryForm`'s `if (s.v2)`, after `up` | **done** `bbf71a0` |
| 10 | `testimonials` | `964:68780` | 1440 × 790 | `984:15384` | 768 × **775** | `984:15415` | 390 × **1050** | 1 (cells **3 / 7 / 2 / 4 / 5 / 6**) | `964:68683` / `984:10768` / `984:10799` | `964:68748` / `984:16840` / `984:16871` | `if (s.limeTree)` inside `Testimonials`' `if (s.v2)`, after `template` | **done** `7868053` |
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
   Lime's register is three seats, Grunge's two and Editorial's three: a ~~six-entry~~ `REG` in
   `G`, written fresh in Retro's `SEATS` order — never a remap of a twin's (CONVENTIONS A, *seat
   the schemes off the master, never remap the twin's register*). *Section 10: five entries —
   the stat card's Scheme 3 is read through `card`, as under every twin.*
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

### 1. The header's ground — **settled: A, seat 6 with `cardOnPage` at desktop** (user call, 2026-10-06)

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

Either way the seeded page and every other card move nothing. **Session 0 asked: A** (user call,
2026-10-06), built as written — *Settled in session 0*.

### 2. Leaks and case on a bound page — **settled by layout 2; one carry-over**

Layout 2's decision 2 holds whole: a raw hex is a leak, judged per site by CONVENTIONS A; a leaked
face is set in Pop's own; a hand-scaled instance is not the ramp. This page has **one** raw hex
outside the footer (trap 7, followed through `s.chips[3].bg`) and **no** leaked face. Two hand-scaled
instances: the header's chips (Chakra Petch 15.04 / 10.53 / 9.02 at radius 6.01 — Lime's Tags
numbers), and the map's two unstyled Inter Bold 20s (the twins'). **The case slip is now the
narrow masters' rule, not one string's**: "Reads the room.", "Five worth your ear" and "Book Me" are
typed mixed at 768 and 390 and in capitals at 1440 — every display string is uppercased at every
width, layout 2's media head reading. Not asked again.

### 3. `navModeDefault`, `navFits`, `navGapEm` and `cardLine` at `d === 2` — **done: session 0 and the header session**

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
  width before lifting. **The foot's name is measured** (below): it wants the lift. The card's
  name is still to scan.
- **Inherited from Editorial layout 3's QA: JP-102** ([`../editorial/layout-3-qa-fixes.md`](../editorial/layout-3-qa-fixes.md),
  entry 3). That entry fitted this block's h1. `identity` is an `inline-size` container, and the
  title is `min(s.dispLg, calc(100cqi / s.cardNameEms))`, passed unfaced. Pop's `navFace` is
  Titan's ems × 0.98, so `s.cardNameEms` is set under Pop, and the widening carries the fit with
  no Pop arm.

  **Pre-measured on 2026-10-06, ahead of session 0, on a scratch widening.** A throwaway worktree
  of `e54a3ba` widened only this block's gate to `(s.limeTree || s.pop)` and served it on its own
  port. Nothing was committed, and the worktree is gone. No seat, no Pop delta and no lift were
  applied, so the measure covers geometry only, not colour. Two surfaces were measured:
  - the harness (`header&arch=2&theme=4&name=…`), canvas and `live=1`, at three widths;
  - the real app: Pop → card 3 → *Title* typed in the header's panel → the 1088 editor canvas →
    Publish → Open, the popup at 1440, 1180, 768, 414, 390 and 360.

  Each ran with four names: the seed, *Maximilian Featherstonehaugh*, *Supercalifragilistic
  Expialidocious* and *Florence and the Machine*. That is 52 renders.
  - **The fit.** Every computed font-size is `min(ramp, column ÷ ems) × 0.98` to within 0.001px.
    The column is `inline-size` in every render. It is 894.7 at 1440 and 1180 (zoomed 1.22 at
    1440), 802.7 on the canvas, 440 at 768, 350 at 414 and 390, and 320 at 360.
  - **The ramp holds at desktop.** The ramp is 67 / 51 / 36, which sets 65.66 / 49.98 / 35.28
    after facing. It never yields at desktop or on the canvas. FEATHERSTONEHAUGH ends 139.3 short
    of the 894.7 column and 47.3 short of the canvas's 802.7; SUPERCALIFRAGILISTIC ends 108.3 and
    16.3 short. The seed and *Florence and the Machine* keep the ramp at every width.

    | Fitted (px) | 1440 / 1180 | 1088 canvas | 768 | 414 / 390 | 360 |
    |---|---|---|---|---|---|
    | FEATHERSTONEHAUGH | 65.66 (ramp) | 65.66 (ramp) | 37.82 | 30.08 | 27.50 |
    | SUPERCALIFRAGILISTIC | 65.66 (ramp) | 65.66 (ramp) | 36.65 | 29.15 | 26.65 |

  - **No word breaks inside itself**: every word's `Range` is one rect. **Every word ends inside
    its column.** The fitted words end 0.8–5.0 short, since Titan's table is near exact
    (Editorial's Gloock ended 2.3–9 short). At 768 nothing runs under the card: every word ends at
    least 25.2 short of the card's left edge. Nothing runs past the well's clip, the root's and
    the document's `scrollWidth` equal the width everywhere, and there are no console errors.
  - **The triage's Pop row was not this block.** That row read +10.9 / +258.8 / +101.0. It
    measured Retro's half, card 3's placeholder, and does not describe this block.
  - **The lift: wanted, HeaderV1's arm verbatim.** HeaderV1's Pop h1 takes
    `style={pop ? { position: 'relative', top: '-0.14em' } : undefined}`, and `Title` spreads
    `style` last. Below, a "token-em" is the token's size, 82 / 51 / 36 before the 0.98 facing.
    - **The frame.** Read off `absoluteRenderBounds` on `964:68751` / `984:15356` / `984:15387`.
      The Chunko name is Display/LG at lh 0.89. Its ink starts 0.015–0.024 token-em above the line
      box (0.024 at 768), and its floor stands 0.185 token-em above the box's foot, at all three
      widths.
    - **Ours, unlifted.** Titan's line box is 0.908 of its own size (lh `facedLh` 0.89). Its ink
      starts 0.118–0.130 token-em below the box's top, and its floor stands 0.045–0.058 token-em
      above the box's foot. So both the top and the floor sit **0.13–0.145 token-em low**. The
      `-0.14em` lift is 0.137 token-em, since the h1's em is the faced size.
    - **The ink gap from the name's floor to the location's ink.** The frame's is 24.6 (1440 ×
      0.82), 24.1 and 21.0. Ours is 16.6 / 18.7 / 17.1 unlifted and 25.8 / 25.7 / 22.1 lifted.
      The 1.1–1.5 left over is the location's own Titan drop, at Display/List, which this
      measure did not look at.
  - **Seen, not measured**: the card's name (`s.cardNameEms` against `measure`) for the long
    names, and the location's lift. Both are this session's.
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
- **Before transcribing a sticker, test layout 1's at another scale** (section 2): when the node's
  width and height over a known drawing's give one ratio, check the path's first points by it. The
  bio's scribble is the hero's `POP_SCRIBBLE_D` at 0.3455, its sparkle the calendar's
  `POP_SPARKLE_D` verbatim; neither needed a new path.
- **A `FILL` child of a `FIXED` instance states its height** (section 2): read
  `layoutSizingVertical` before calling a band's height a hug. The bio's about band is 253 / 283
  only because the instance is 882 / 912, so it is a `minHeight`, and a short bio lands on the
  frame.
- **A sticker the frame seats beside its own short copy goes behind the artist's longer copy**
  (section 2; layout 1's hero scribble at −1): the 390 sparkle clears "DJ & / SELECTOR" and covered
  "MANCHESTER, UK". Where it covers no copy it keeps the frame's paint order.
- **A pill's height is its shape, so a pill row pins at its division result** (section 3). Where a
  master's rows `FILL` a stated list height and each row is a pill (radius 999), give each row
  the division result as its `minHeight`, never the list the stated height as a minimum: under
  the minimum one track stands as a list-tall stadium (512 on the canvas, 594 at 390). Layout 2's
  media list takes the minimum and does exactly that (open question 13). Prove the pin with
  `n=1`, `n=5` and `n=8`.
- **Titan at Display/Title, lh 1.1, takes 0.1em, not every head's 0.14** (section 5, the second
  site after the header card's name). "BOOK ME" scanned 0.10 / 0.08 / 0.15em low, as the card's
  name did, while the lh-0.89 and lh-1 strings in the same card took 0.14. Scan a Display/Title
  site before reaching for 0.14.
- **Scan a glyph floor with the string drawn alone** (section 5). Inside a card, a clip padded
  enough to catch a descender also catches the next string and the card's ring, and every row
  reads as ink. Hide every other node (`visibility: hidden`, the target `visible`, its fill and
  shadow cleared), scan on white, and correct for any lift the probe reads back, since a
  relative lift moves the element's own rect.
- **A ring the colour of its own sheet hides nothing that leaks past it** (section 6). The
  gallery's 5px `scheme/1/stroke/2` is lime on the lime sheet, so the photograph's
  anti-aliased edge, where the tile's round clip cuts it, showed as a dark arc outside each
  corner (17% darker on its one pixel at 1×), on the `n=0` wells as well. A coloured twin
  ring is darker than the leak and hides it. Clip the photograph inside the ring
  (`clipPath: inset(2px round r − 2px)`, 1px left a 5% fringe) and read the corner's diagonal
  pixels, not only a straight edge, which is pixel-aligned and clean either way. The clip
  keeps the cover box, so the crop is the frame's.
- **A Lime block's pill that leans on `BookPill`'s defaults is black under Pop** (section 7).
  The Lime branch fills `s.pillBg`, which is the accent under Lime, Grunge and Editorial but
  **black** on Pop's Scheme 1 (layout 1's trap 3), so a block whose twins pass no `bg` because
  "the defaults are the frame's" paints a black pill here. Read the pill's fill binding and pass
  it (`G.pillBg`, spread only where set, so the twins' spread stays `{}`). Under a seat whose
  `pillBg` is the frame's (the calendar's Scheme 2, pink) the default holds.
- **One lit pair in a twin can be two schemes here** (section 8). Every twin's map lights its
  chip and its row with one `lit` / `litFg`; Pop's chip is the band's own Scheme 4 pair and its
  lit row a nested Scheme 3 pill, so the pair split (`chipLit`, read `?? G.lit`). Where a block
  reuses one key for two nodes, read each node's `explicitVariableModes` before giving the key a
  value — and the same for every ink inside a nested node that does not state its own mode (the
  map's viewport letters Scheme 3's violet where the twins' `ink` was the band's, `vpInk`).
- **`Pager`'s Pop arm fills its ends** (section 8): `endBox: s.ac`, layout 1's Scheme 6 seat. A
  caller whose frame draws unfilled arrows passes `endBox: 'transparent'` in `frame.lime`, spread
  only where set; the map's 390 arrows were teal discs round a teal arrow until it did.
- **A nested card whose every leaf is the card's takes one alias, not a `G`** (section 9). Where
  a block reads the section's `s.*` for a card the frame nests on another scheme, and the
  twins' card is their section's own scheme, `const card = pop ? s.onScheme[n] : s` and
  `card.*` on the card's leaves keeps the twins' values byte-identical with no arm per leaf.
  **And read whose pill it is before naming its trap**: a block's own `pill()` on `s.ac` /
  `s.bg` is not `BookPill`, so under a nested card its trap is the section's `s.bg` (Scheme 1's
  white, where the frame binds the card's `sem/bg` lime), not `pillBg`'s black.
- **Count a register in the block's own terms, and read each register's ink off its cell**
  (section 10). The plan's "six-entry `REG`" counted the stat card's scheme, but every twin's
  `REG` holds the quote cells alone and the stat card reads `card` / `cardFg` / `num` / `hair`
  / `lift`, so Pop's is five registers seated by identity. And where a frame gives every cell
  its own scheme, the quote's ink is not one key across them: it binds `text/2` on three cells
  and `text/1` on two, so a register's `fg` is the cell's binding, never the scheme's `tx` by
  default.
- **Titan at Label/LG, lh 1.1, took 0.12em** (section 10): the quote and the disc's mark
  scanned 0.07–0.15 token-em low across the three widths (Blink's per-size rounding), between
  Display/Title's 0.1 at the same line height and the heads' 0.14. Display/List over a line of
  type took the map's 0.08 again. A disc's mark lifts inside the disc (layout 2's *lift the
  label, never the ring*).

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

   **Inherited from Editorial layout 3's QA: JP-104** ([`../editorial/layout-3-qa-fixes.md`](../editorial/layout-3-qa-fixes.md),
   entries 1 and 5). That entry gave this block the frame's one row at every width. The title is
   `flex: 1 1 0; maxWidth: max-content`. It is clamped at two lines at 768 and 390
   (`WebkitLineClamp: 2`, no `overflowWrap`), and keeps a one-line `nowrap` + ellipsis at
   desktop. The length is `flex: none` on the right, lowered by `lenDrop` onto the title's first
   line.

   **Pre-measured on 2026-10-06, on the same scratch widening.** The block's gate was widened,
   and `pop` was added to `disp`'s arm (below). The harness took
   `repertoire&arch=2&theme=4` at three widths, canvas and `live=1`, every *View full set*
   revealed. The rows read `G`'s fallback arm.
   - **One correction to entry 5's inheritance.** `disp()` is `grunge || ed ? { lineHeight:
     facedLh(s, lh), textTransform: 'uppercase' } : { lineHeight: lh }`, so a bare widening sets
     Pop's titles in mixed case at an unfaced lh 1.2. `lenDrop` reads `disp(1.2).lineHeight`, so it
     follows `faceK` only once `pop` joins that arm. **This session adds it:** `grunge || ed ||
     pop`.
   - **The frame's sets are Lime's box.** Padding 34 and radius 50. The 768 card is 222.67 wide,
     154.67 inside; the 390 card is 290, 222 inside. The rows (`sr`) are 50.25 / 57.5 / 57.5,
     padded 6, `justify-between` at gap 0. Titles are Display/List 20 / 16 / 15 at lh 1.2, and
     lengths Inter 12. `G`'s fallback arm (pad 34, radius 50, rows 39 / 57 / 57.5) differs only
     in two rows: desktop 39 against 50.25, and 768 57 against 57.5. Whether Pop takes its own
     arm for those is this session's call.
   - **The type.** Titan titles are 15.68 / 15.68 / 14.7 at a 19.2 / 19.2 / 18.0 line, uppercased.
     Pop's desktop `list` token is 16, which is 20 × 0.82 rounded, as its other desktop tokens
     are.
   - **The widest Titan word against the room beside the length.**
     - At 768 the room is 118.5–119.3: 154.67, less the length (≈ 26), less the block's 10 gap.
       Beside DANCING QUEEN's narrower 3:51 it is 121.8.
     - The widest seeded word is SUPERSTITION, 118.8 of advance in its 118.69 box. Its ink is
       118.2 wide, so it ends 0.5 inside the box and fits. BRIGHTSIDE is 97.0.
     - At 390 the room is 185.8–189.1, and SUPERSTITION is 111.4.
     - **No seeded title is cut at any width**: no `scrollWidth` or `scrollHeight` overflow and no
       ellipsis.
   - **Which titles wrap.** At 768 four seeded titles wrap to two lines, whole: DANCING QUEEN,
     MR. BRIGHTSIDE, DON'T STOP ME NOW and I WANNA DANCE, which are Editorial's four. The other
     seven are one line. **The frame** (every `sr` row of the three 768 sets read) fits 11 of its
     12 rows on one line at gap 0. DANCING QUEEN, MR. BRIGHTSIDE and I WANNA DANCE run 128 / 127 /
     126 beside lengths of 24–26, 0.7–2.7 to spare. **DON'T STOP ME NOW overruns**: its title is
     159 wide, so its length sits at 159–185, 30.3 past the 154.67 row and into the card's
     padding. That is Editorial's frame case again. So three of the four wraps come from Titan's
     width plus the block's 10 gap, and the fourth wraps a title the frame itself cannot hold. In
     every case the wrap is the clamp doing its job. At 390 the frame's twelve fit (DON'T STOP ME
     NOW 149 of 222), and so do ours; at desktop every seeded title is one line.
   - **Two Titan lines against the pinned row.** Two lines are 38.4 at 768 (in 57, or the frame's
     57.5) and 36.0 at 390 (in 57.5), so both fit. A two-line title's box starts at 9.3 and a
     one-line title's at 18.9, both centred. At desktop the fallback row is 32 (39 × 0.82), shorter
     than two lines, which is entry 5's reason for keeping the ellipsis there. The frame's 50.25 is
     41.2 on the canvas and would hold two lines (38.4). The ellipsis is the block's rule either
     way.
   - **`lenDrop`.** The length's centre sits exactly on the title's first-line centre (Δ 0.0) in
     every row, one line or two, at all three widths. Every length ends flush with the row's right
     edge, at least 10 after its title.
   - **`&cj=`.** One set of four songs: *Featherstonehaugh*, *Go Featherstonehaugh*, a 52-character
     title, and *Don't Stop Me Now* as the control. Canvas and `live=1` are identical.
     - **768.** FEATHERSTONEHAUGH (180.4) is clipped 61.8 past the box, as named. That is on line
       one when it stands alone and on line two after GO. The long title clamps 5 → 2.
     - **390.** FEATHERSTONEHAUGH fits (169.1 of 186.0). *Go Featherstonehaugh* wraps to two lines
       whole, and the long title clamps 3 → 2.
     - **Desktop.** The long title is one line, ellipsised.
     - Every length sits on its title's first line. The root's `scrollWidth` equals the width at
       all three widths.
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

- **Decision 1 is A** (user call, 2026-10-06): the header is seated on Scheme 6 at every width, and
  at desktop the root paints `vm.pageBg` round the card. One commit, data and one-word gates; no
  section's layout code moved.
- **`SCHEMES_OF.Pop[2] = { header: 6, calendar: 2, gallery: 2, map: 4 }`**, its comment naming the
  page frames and the four instances at three widths, with no footer entry (row 0's 3 at every
  page). `THEMES[4].schemes` 2, 4 and 6 were checked in Node first; no scheme was added.
- **`cardOnPage`** gained a second clause, `(s.ca || s.hd && !s.narrow) && s.v2 && s.pop`: the
  calendar at every width, the header at desktop alone. Layout 2's clause is unchanged.
- **`navModeDefault`**'s Pop clause is `(d === 1 || d === 2)`. In Node every template now reads
  `smms` over designs 0–3.
- **Digest: themes 0, 1, 2 and 3 at zero rows, canvas and live.** That is 660 renders a label, five
  themes, on a fresh `:5177` server; a second before-label diffed to zero against the first, and no
  file in any label held a single row. **Theme 4 moved 12 files, canvas and live alike**: header,
  calendar, gallery and map at `arch_2`, three widths each. Zero in every `_arch_0_`, `_arch_1_`
  and `_arch_3_` file, in the header's `_arch_4_` and `_arch_5_`, and in the footer's `page_2`
  (the footer's explicit Scheme 2 is inert, as planned). Only the 1440 header moved geometry; the
  other eleven are colour rows, every section root's height unchanged.
  - **Header** — the root is white at 1440 and violet at 768 and 390, inked Scheme 6's pink `s.tx`.
    At 1440 the bar lost six rows: Minimal draws Music / Gigs / About where Retro's placeholder
    wrapped nine links onto two rows. At 768 and 390 it is the burger either way.
  - **Calendar** — the root stays white (`cardOnPage`), its ink violet both before and after.
  - **Gallery** — the root and the flat sheet are lime (`#C6F200`).
  - **Map** — the root is blue (`#2563FF`), inked yellow.
- **What the pictures show** (`shots.mjs` before / after, all eleven at three widths, in the session
  scratchpad, one `OUT` per width) differs from the root rows. As at layout 2, **the flat `s.v2`
  arms paint over the root and read their own keys on the new ground**:
  - **The header's frame reads lime, not white or violet.** Retro's placeholder half paints its own
    ground over the root at every width. Its `s.ac` is now Scheme 6's lime, so the frame round the
    card, its 4px ring (pink before), the capsule and the Book pill are all lime. **The three
    Minimal links are lime on the lime capsule, so they are invisible.** The card's name is pink on
    cream, and the chips sit on Scheme 6's tag seats. The white 1440 root and the violet narrow one
    show nowhere until the header session's widened block stops painting over them.
  - **The map reads teal, as predicted**: the flat sheet is `pillBg`, Scheme 4's `activeBg`
    `#00E0C4`, over the blue root, which shows nowhere. The lit row is a black pill under teal type,
    and the panel is violet round a viewport ringed teal. At 390 the pager's two pills are teal on
    the teal sheet, ringed white.
  - **The calendar is a lime card on white**, but it is the flat arm's `s.bg` `#C6F200`, not the
    frame's `box/1` `#D7FF23`, and its 2px ring is still Retro's `#141414`. The foot pill turned
    pink with a lime label and disc (Scheme 2's `pillBg`), as at layout 2.
  - **The gallery is the frame's lime sheet** under a pink head (`s.ac` under the seat). Its tiles
    keep the flat arm's dark rings.
  - The bio's and footer's JPEGs differ before / after while their digest files are at zero: their
    seals turn (`.seal-spin`, which the digest skips). It is not a change.
  None of it is chased here; each section's widened block replaces the flat arm it stands on.
- **`preview.jsx` needed nothing**: its `Z` carries `dev`.
- **For the sweep's CLAUDE.md pass**: the per-section scheme bullet gains `SCHEMES_OF.Pop` row 2,
  the header seated on 6 with the page's white round its card at desktop, and `cardOnPage`'s reach
  to layout 3's calendar and header. `notes/nav.md`'s `navModeDefault` sentence gains Pop at
  layout 3. The code comments are written; the docs are not.

### Settled in section 1 (the header)

- **The block widened at its head: `if (s.limeTree || s.pop) { … return }`, `const pop = s.pop`**
  (about twenty arms, no `G`). The tree is Lime's node for node at all three widths (the
  planning LCS, 44 / 44), the 390 Lime's written-out 606.5; the root resolves Scheme 1 at
  1440 and Scheme 6 narrow, the `hero-card` Scheme 6 at every width, and no Device override
  anywhere (the walk's `resolvedVariableModes`: Desktop / Tablet / Mobile). Every paint on the
  three masters is bound; no effect. Retro's half is unreachable under Pop and was not touched.
- **Under the Scheme 6 seat most leaves were already the binding** (`bg` violet, `ac` lime, `tx`
  pink, `text3` white, `box1` / `box2` / `box3` `#8451FA` / `#5C22E6` / `#4612BE`, `stroke2`
  pink — checked in Node off `THEMES[4].schemes[6]`): the capsule's fill and links, the location's
  dot, the portrait's well. The deltas, off one node walk per master with bindings and their
  collections:
  - **the frame round the card**: `pop && desk ? s.pageBg : s.bg` on the block's own wrapper —
    the block paints over the root, so session 0's `cardOnPage` alone did not show; white at
    1440, the seat's violet narrow;
  - **the well**: radius 30 at every width (`u(30)`), faded off `sem/box/3` (`s.box3`) where
    Lime's is `s.box1`, and ringed **8 / 8 / 2** INSIDE in `scheme/1/stroke/2` lime
    (`s.onScheme[1].stroke2`, `u(s.mob ? 2 : 8)`);
  - **the capsule** ringed 1px `scheme/1/stroke/1` pink (`s.onScheme[1].stroke1`, Editorial's
    arm) and gapped a fixed 18 (`grunge || ed || pop` on `navGaps` and the `<nav>`'s gap);
  - **the name and Listen** `text/3`, `s.text3` white — the first `s.text3` read on a layout-3
    page;
  - **the Book pill** `bg={s.bg} fg={s.ac}`: the seat's violet on the violet card, lettered and
    disced lime round a violet arrow (BookPill's disc rule), Lime's box, no block — 119.5 × 28.6
    on the canvas (145.32 × 0.82 = 119.2), 130 × 34.9 at 768 (129.32), 124.5 at 390 (123.32);
  - **the title** `s.ac` lime, one tone, lifted `top: -0.14em` (HeaderV1's Pop arm, the
    pre-measure's verdict, which stands: a scan of the h1 against its own box cannot show a
    relative lift, since the box moves with the glyphs. Read lifted as the gap from its ink
    floor to the location's cap: **25.9 / 25.6 / 22.2** against the frame's 24.6 / 24.1 / 21.0,
    the 1.2–1.5 over being the unlifted location's own drop, below); the
    JP-102 fit needed nothing (`s.cardNameEms` is Titan's under Pop);
  - **the location** `s.text3` white, uppercased (`grunge || ed || pop`). **Not lifted**: it
    scans 1.1–1.4px (0.07–0.09em) low at Display/List lh 1.2, the token layout 2 measured "~1px
    low and left";
  - **the chips** read `s.onScheme[1].chips[i % 6]` (Scheme 1's six seats in order: lime, pink,
    blue, teal, violet, red), corner `u(6.01)` (`radius/chip` 8 × 0.752), Lime's hand-scaled
    type and padding. Each takes its own seat's ink, which is the frame's in four of six; **the
    fourth and sixth are not followed** — `scheme/4/tag1/text` `#141414` where Scheme 1's teal
    seat letters `#000000`, and `sem/tag/7/bg` `#FFFFFF` where its red seat letters `#F6F0E8`
    (Editorial's open question 4, the same call; open question 9);
  - **the card** `s.ac` lime in a 4px `scheme/1/stroke/1` pink ring (`ring(u(4), …)`), radius
    `u(27)` / 21 at 390, no glow; **its portrait centred** (`alignItems: 'center'` under `pop`,
    below), 87 on `s.box1` in a 4px `s.stroke2` pink ring; the name `s.bg` violet at
    Display/Title **28 / 22 / 20** (a literal — `vm.title` shadows the ramp), uppercased, lifted
    **`top: -0.1em`**; the line `s.tx` pink;
  - **`Photo`'s backdrop under Pop at `s.v2`** is `s.box2`: the frame states `sem/box/2` violet
    under the photograph, where layout 1's `s.tx` is pink under this seat. This block is the one
    Pop `backdrop` caller at `s.v2`. `&noimage=1`: a violet well under the `box/3` floor fade.
  - **NavMenu's panel under Pop at `s.v2`** is `[s.bg, s.text3]`: `mapBg` under Scheme 6 is its
    darkest tag, red, with Retro's fallback paper (`paperOf` misses on Scheme 6, layout 1's
    session 0), a panel no frame draws. Now the seat's violet with white links and the lime
    BookPill, the panel Pop's cards 1 and 2 open (`#7B43FF` / white, Scheme 1's `mapBg`).
- **The portrait is centred in every twin's frame and left-aligned in the block.** All four
  layout-3 frames stand the upright card's portrait at 66.5 in (`counterAxisAlignItems: CENTER`;
  Editorial's 136-wide one at 42); the block's `col()` stretches it to the padding edge, so
  Lime and Grunge draw it 26.5 left of centre and Editorial 2. Centred under `pop` only, since
  fixing the twins moves themes 1–3 — **named for a QA pass** (open question 10).
- **The card's name lift, scanned** (the frame's `absoluteRenderBounds` against our ink, rows
  read white on black in place): Titan sat **2.2 / 2.0 / 3.1px** (0.10 / 0.09 / 0.16em) low at
  its cap top and at its floor alike (read unlifted, before the edit); `-0.1em` levels 1440 and
  768 and leaves 390 1.2px low. Read lifted, the gap from its ink floor to the line's cap is
  **13.0 / 13.1 / 11.7** against the frame's 12.8 / 13.7 / 13.6.
- **The card's long names** (JP-062's probe set, `live=1`, three widths; px from the name's ink
  to the card's outer edge, the 4px ring inside it — 3.28 on the canvas):

  | | 1440 (canvas) | 768 | 390 (right edge) |
  |---|---|---|---|
  | Kai Mercer | 1 line, 20.2 | 1 line, 43 | 100.1 |
  | The Rolling Stones | 2 lines, 16.6 | 2 lines, 39.5 | 2 lines, 93.8 |
  | Florence and the Machine | 3 lines, 31.5 | 2 lines, 27.6 | 2 lines, 28.9 |
  | Supercalifragilistic | 12.29px, 16.6 | 14.99px, 20.2 | 17.66px, 10.6 |
  | Maximilian Featherstonehaugh | 12.69px, 2 lines, 17.3 | 15.47px, 2 lines, 21 | 18.22px, 2 lines, 12.4 |

  A size is named where the widest-word fit shrank the name. Every render passes: no word breaks
  inside itself (one `Range` rect a word), `card.scrollWidth === clientWidth`, the root at its
  width. The h1 beside it keeps the ramp at desktop for all five and ends inside its column
  everywhere (at 768 FEATHERSTONEHAUGH fits at 37.82, 29 short of the card; at 390 at 30.08).
- **Measured against the masters** (harness, `theme=4&arch=2`): desktop section 738 (900 × 0.82),
  the well (16.4, 16.4) radius 24.6 ringed 6.56; capsule (42.6, 43.2) 176.4 × 27.4 against
  (42.6, 43.0) 179.6 × 27.9 (Titan, layout 2's same 176.4); the nav name centred at 590; pill right
  edge 1137.4 (1138.2); location at 629.9 (629.3); chips at 673.7 (673.6), 54.5 wide (54.6);
  card (957, 498.7) 180.4 × 196.7 against (957.8, 498.6) 180.4 × 196.8, portrait at 1011.5
  (1012.3), its name at 620 (619.9) and line at 648.5 (648.6). 768: section 1024, capsule (42,
  44.3) 189.4 × 30.3 against (42, 44.5) 191 × 30, card (506, 749) 220 × 233 **exact**, portrait
  at 572.5 (exact), name at 897 (897), location 912 (912.5), chips 961.2 (961.5). 390: section
  606.4 (606.45), card (20, 459.4) 350 × 127 (exact), its name at 501.5 (501.45), chips 416.6
  (416.9), the burger capsule 62 × 33.5. The pictures read as the frames at every width.
- **Decision 3, done.** `navGapEm` is 0 at Pop `d === 1 || d === 2`; `vm.navFits`'s fixed-18 arm
  takes Pop at both designs (`T.name === 'Pop'`), against 684 at design 2. **The 768 fold, walked**
  (harness, `live=1`, `&cj={"navMode":"sections"}`, `&nav=` 2–9): *Follow my sections* draws **up
  to four** seeded links on one row (the name slides to 448.5 at four, Lime's rule); five and more
  fold to the burger, which opens (6 → 12 anchors at `nav=9`). Minimal's three draw at 1440 and
  768, the name centred at 384; desktop *Follow my sections* holds all nine on one row. Every
  root's `scrollWidth` equals its width. `live=1`: Music → `#media`, Gigs → `#map`, About →
  `#bio`, Listen → `#media`, Book Now → `#form`; the canvas anchors carry no href.
- **Long names** (`&name=`): *Maximilian Featherstonehaugh* fits the h1 at 390 on two lines and
  wraps the card's name (JP-062's measure); *Florence and the Machine* sets the h1 on two lines at
  desktop and the card's name on three. **Named, not fitted**: at 390 the nav's centred name runs
  under the pill with a long name — the block's own span, which JP-101 named and did not fit
  under any twin (`notes/nav.md`).
- **`FIELDS.header` under Pop** (`scripts/reach.mjs 4` over the fitted card): **`cardLine`
  `[2]`** (decision 3, as written) and **the kicker `[0, 3]`** — it lost design 2, JP-061's
  prediction once the card stopped being Retro's polaroid, so Pop's row is the twins'. Unchanged:
  showBadge / badgeText `[0, 3]` (off design 2, as planned), cta2 `[1, 2]` (4/6: Listen dropped at
  390), tags / showTags `[0, 2, 3]`, location all four, subtitle / heroCta / the four JP-059 keys
  `[1]`, align `[0]`. The rows' comments now name three fitted Pop cards and one placeholder.
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`** (a fresh `:5178`, both
  labels taken there, no one-row file in any); theme 4 exactly **header arch 2 at three widths**
  on each surface (6 files). `Photo`'s and NavMenu's arms are `s.pop && s.v2`, so their states
  (`&noimage=1`, the open panel) were proved by pictures, not the seeded digest.
- **In the builder** (`page-check.mjs Pop 2,0,1,3`; card 3's walk rerun alone after the known
  first-step reload trap): four modal cards; card 3 lays the page out in `PAGE_ORDERS[2]` with the
  calendar composed beside the bio (both at top 901 in the published 1440 tab), the header 901
  tall on white; Music → `#media`, Gigs → `#map`, About → `#bio`, Listen → `#media`, Book Now →
  `#form`, every other anchor and footer link on its id; the player plays; the form refuses and
  composes; the 390 burger opens (1 → 5); `overflow390` 0; no console error or warning on any
  card. Cards 1, 2 and 4 render and publish.
- **For the sweep's CLAUDE.md pass**: `notes/templates.md`'s Pop paragraph (*Inset Hero and Stacked
  placeholders* → Stacked alone; Inset Hero's dress); `notes/nav.md`'s *Pop's layout 3 is not in
  that list yet* sentence (Minimal at layouts 2 and 3) and its fit counts (*Follow my sections*
  fits **four** in Pop's layout 3 at 768); the `cardLine` sentence of the header-identity
  paragraph (*`'*': []` marks Retro and Pop* → Retro); and the `FIELDS` paragraph's *Pop's …
  re-measure their card* clause. Not written here.

### Settled in section 2 (the bio)

- **The block widened whole: `if (s.v2 && (s.limeTree || s.pop))` ahead of `Bio`'s `if (s.v2)`,
  `const pop = s.pop`** (about twenty arms, no `G`). The tree is Lime's at all three widths, on
  **Scheme 1 with no Device override** (`resolvedVariableModes`: Desktop / Tablet / Mobile), the
  seal `Layer_1` nested **Scheme 4** at every width; no effect on any node; every paint bound but
  the sparkle's. `get_variable_defs` is the ramp (display-sm 36 / 29 / 24, chip 12 / 11 / 11,
  label-xs 20 / 14 / 12, body-md 14 / 13 / 13), so every size is an `s.*` token. The deltas, off
  one node walk per master with bindings and their collections:
  - **no hairline rule**: `Frame 258` is the head band, the about band and a **5px `sem/text/1`
    bar** (858 × 5, full width at 390 too), so `{rule}` and the foot rule drop under `pop` and the
    bar (`s.ac`, `u(5)`) closes the column, 40 above the card's foot (the card's `paddingBottom`);
  - **the card** `box/1` `#F5F5F5` ringed 1px `stroke/1` pink at radius 50, **unringed at 30 at
    390** (Lime's ring overlay and `!s.mob` gate carry; the radius arm is `pop ? 30`). The
    instance root states `sem/bg` white at radius 50 at 1440 and 768 and clips nothing, on the
    white page — invisible, as Editorial's was; at 390 it states neither;
  - **the photograph** radius 15 on the `box/3` black well (`grunge || pop`), **no glow** (`!ed &&
    !pop`) and no grain; **initials white** (`ed || pop ? s.bg`, `&noimage=1`: `KM` white on black);
  - **labels and `[ ABOUT ]` `sem/text/1` pink** over `text/2` violet values (`labelInk`); the values
    take Grunge's Chakra Petch arm (`grunge || ed || pop`), 16 / 14 / 12 at 1.26;
  - **the name** `text/1` pink — Lime's own `s.ac` — uppercased, on the widest-word fit
    (`(ed || pop) && s.cardNameEms`, Titan's ems: the seed keeps the ramp, 29.4 / 28.42 / 23.52);
  - **the about band pads 32 at 390** (Lime's `pad` is 10 there), and its `minHeight` is **253 /
    283** at 1440 and 768: the instance is `FIXED` 882 / 912 and the band `FILL`s what is left
    (`layoutSizingVertical` read; 390 hugs), so a short bio lands the card on the frame's height —
    Lime's seal floor does not apply, the seal having left the band;
  - **the head** one tone in `s.ac`, uppercased at 768 and 390 where the masters type "Reads the
    room." (decision 2); "KM BIO" is Lime's span already (`text/2`, Label/XS).
- **The seal is SealBadge's Pop arm on `s.onScheme[4]`** (`classic={!grunge && !pop}`): `hue` its
  `bg` `#2563FF`, `ink` its `tx` `#FFF600` (the globe, the name and both dots bind `text/2`), `face`
  its `ac` `#00E0C4`, `features` its `text3` `#FFFFFF` — read off the DOM on the harness, the canvas
  and the published tab. Figma −19.5 → CSS **+19.5**. At 1440 its turned box sits flush in the
  instance's top-right corner (`absoluteBoundingBox` 634.88–858 × 0–223.12), so the disc's centre
  is **111.56 in from the right and 111.56 down**: `right` / `top` `u(24.16)` at 174.8. **The 768
  master keeps the desktop's x** in its 708 instance, standing the disc 125.8 past the card, and
  the Section's clip cuts it to a sliver at the photograph's top-right edge (`absoluteRenderBounds`
  73 of 223 wide; the render shows a quarter-seal). A leak that reads as a defect (CONVENTIONS A),
  so **768 takes the desktop's corner**, unscaled — Editorial's 768 tape call. The 390 seal
  (62.69) is Lime's seat to the hundredth (`right` 30.76, `top` 52.51). Both are children of the
  card, after its ring: the disc reaches no edge (24.16 from the right and top; its corner-most
  point is 0.34 from the r50 corner's centre).
- **The sparkle is `POP_SPARKLE_D`** — the calendar's layout-1 drawing to the hundredth — in
  Scheme 1's `tag4` (`s.chips[3].bg`, the frame's raw `#00E0C4`, trap 7), Figma 17.93 → CSS
  −17.93, seated by its centre: **(69.18, 837)** at 1440 — on the bar's top edge, 45 above the
  card's foot — and the same y in the 768 master's taller card, 75 above the foot; **(334.92,
  400)** at 390, by the card's right edge, where the Section's clip cuts it at 370. It is a child of
  the card, anchored to its **foot** at 1440 and 768 (`bottom`), so a longer bio does not walk it
  off the bar, and the card's clip is the 390 Section's. **At 390 it stands behind the card's
  content** (`zIndex: −1`, the card `isolation: isolate` under `pop`): the frame stands it beside
  its own hand-broken stats ("DJ & / SELECTOR"), but our one-line values run under it ("MANCHESTER,
  UK" was half covered). Layout 1's rule for a sticker meeting copy (the hero scribble at −1); at
  1440 and 768 it covers no copy and keeps the frame's paint order, over the bar.
- **The scribble is the hero's `POP_SCRIBBLE_D` at 0.3455** (114.48 / 331.36 = 32.82 / 95, point
  for point), not a new transcription, in `scheme/1/tag1/bg` (`s.chips[0].bg`), `viewBox` 331.36
  × 95 at 114.48 × 32.82. It hangs off the name's **wrapper**, not its lifted glyphs: top 3.82
  above the box's foot and 32.26 in at 1440 and 768 (the 768 master keeps the desktop's numbers;
  its one-line name stands on the same floor, 560), 6.41 above and 57.52 in at 390. Its foot runs
  5 past the head band, which the frame draws as `Frame 258`'s child outside the band's clip, so
  the band is `overflow: visible` under `pop`.
- **The photograph's `CROP`, correlated** (`51d06990` = `popStage`, over Lime's covered
  `fa453f7d`, open question 2): `[[1, 0, 0], [0, 0.3571, 0.0637]]` at 1440 and 768 — rows
  6.4–42.1% — and `FILL` at 390. A cover sweep against the renders (PIL, the seal's corner masked)
  peaks at **10%** at desktop (0.994; the band's own 9.9%), and at **7.5%** for the squashed 768
  band (0.565, a broad peak — Editorial's case; *follow the sweep's peak*); 390 is centred (0.992).
  `Photo`'s `style.objectPosition`, so an upload takes the same band.
- **The lifts, scanned** (the frame's `absoluteRenderBounds` against its text box; ours at DPR 4
  against the **unlifted** box — a relative lift moves the element's own rect, section 1's trap):
  the h2 sat 0.13–0.16 token-em low and the name (Display/SM, lh 1) 0.13–0.15, top and floor
  alike, so both take **`top: −0.14em`** under `pop`. Lifted, every floor is level with the
  frame's to within 0.011em at all three widths (the tops differ by Titan's taller cap).
- **Measured against the masters** (harness, `column=left` at desktop; the frame × 0.82 in
  brackets): card 709 × 723.2 (882), 24.6 under the head; photo (24.6, 24.6) 659.8 × 311.6; name
  (26.2, 399.2) 146.8 × 60 (400.2, 59 — Pop's desktop `dispSm` is a rounded 30); scribble (52.7,
  456) 93.9 × 26.9 (52.7, 456.1); label (205.8, 386.5) (386.2), value 418.8 (418.2); `[ ABOUT ]`
  (213.2, 498.5) (498.6); prose 518.3 (518.2); bar 686.3 (686.3); sparkle centre (56.7, 686.3)
  exact; seal centre 91.5 in and down at 143.3 exact. **768 exact**: card (30, 173) 708 × 912;
  name (32, 531); scribble (64.3, 556.2); label 487.7 (487), value 524.7 (524); about (260, 608);
  bar 867; sparkle (69.2, 837); seal (596.4, 111.6). **390 exact to the about band**: photo (10,
  10) 350 × 259, name (10, 303), scribble (67.5, 320.6), label 365.8 (366), value 402.8 (403),
  about (32, 501), sparkle (334.9, 400), seal (307.9, 83.8) at 62.69; the card is content-tall at
  742 against 893 — the seeded prose. Genres 24.6 / 30 / 30 under the card, chips 28.3 / 27.6 /
  25.1 tall.
- **Named diffs**: the values run one line where the frame hand-breaks "JUNE\n2021" (the twins');
  the 390 card is 151 short (the seeded prose), and stands at 151.1 in the root against the
  frame's 157 (`padY` 44 against the left column's 50, Lime's arm, which Editorial named the same
  way) — the 390 numbers above are card-relative; Pop's rounded desktop tokens (`dispSm` 30 against
  29.52, `bodyMd` 11 against 11.48 — every Pop section's); the Genres chips' corner is
  `s.radiusChip` 8 at desktop against 6.56 (TagChips' shared reading, the twins'); the third and
  fourth chips letter their seats' own `#F6F0E8` and `#000000` where the frame binds
  `scheme/3/inactive/text` `#FFFFFF` and `scheme/4/tag1/text` `#141414` — the header's open
  question 9 again; **the seal's name overlaps itself with a long name** (*Maximilian
  Featherstonehaugh* runs past half the circle) — SealBadge's Pop arm as layouts 1 and 2 left it,
  seen, not fitted.
- **`vm.pad`'s layout-3 arm takes the bio under Pop**: `|| (T.name === 'Pop' && cat === 'bio')`,
  Lime's numbers (top 50 / 50 / `padY`, foot 30), the wrappers Editorial's inset for inset. **The
  heads part until the calendar joins** (CONVENTIONS C): on the 1180 canvas "KM BIO" stands 41
  below the row's top and "Book Me" 80; in the published 1440 tab 50 and 97.6.
- **Long names** (`&name=`, `column=left` / 768 / 390): *Maximilian Featherstonehaugh* fits at
  12.62 / 15.39 / 15.39px and *Supercalifragilistic Expialidocious* at 12.23 / 14.91 / 14.91, two
  lines each; *Florence and the Machine* keeps the ramp at 390 (three lines) and fits FLORENCE at
  28.16 on the canvas. No word breaks inside itself (one `Range` rect a word), every word ends
  inside its 146.8 / 179 cap, the scribble stays under the name's box, every root's `scrollWidth`
  is its width.
- **`FIELDS` under Pop** (a bio-only copy of `scripts/reach.mjs 4`, 672 renders): the four ID-card
  labels reach bio layout 3, as their plain `[2]` says; **`tagsLabel` now reaches 3 and 4** (4/6,
  the known partial), so its row gains **`Pop: [2, 3]`** (it fell to `'*': [3]`); `who.tags` /
  `who.showTags` reach bios 2, 3 and 4, so `FIELDS.header.tags`' hint names Pop ("in Lime, Grunge,
  Editorial and Pop, layout 3 as well"). Kicker all four, location 1–3, unchanged. Every bio row
  checked against the measurement in Node (`fieldReach`), ten of ten.
- **No live control**: `live=1` is byte-identical to the canvas at all three widths.
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`** (a fresh `:5179`, both
  labels taken there, no one-row file in any); theme 4 exactly **bio arch 2 at three widths** on
  each surface.
- **In the builder** (a one-off puppeteer probe, Pop → card 3 → *Use this header*, reduced motion,
  then `page-check.mjs Pop 2,0,1,3`): the bio and the calendar stand in one grid row at **708.7 :
  334.5 on the 1180 canvas** (a 1760 window; 646 : 305 on the 1088 canvas of a 1440 one, the same
  858 : 405) and **864.8 : 408.2 in the published 1440 tab**, both at top 900.6 under the 901
  header, media under the bio at 2125.5. The seal's four fills, the sparkle and the scribble on
  both surfaces; no sideways scroll at 1440, 768 or 390. `page-check`: four modal cards; card 3's
  nav (Music → `#media`, Gigs → `#map`, About → `#bio`, Listen → `#media`, Book Now → `#form`),
  the calendar's and pricing's pills and every footer link on their ids; the player plays; the
  form refuses and composes; the 390 burger opens (1 → 5); `overflow390` 0; **no console error
  or warning on any of the four cards**.
- **For the sweep's CLAUDE.md pass**: the header-identity paragraph's *prints them in layouts 2
  and 4 and Lime's, Grunge's and Editorial's 3* gains Pop's; the `vm.pad` comment and CONVENTIONS
  C's *the composed row's pad arm* row (Pop: bio first); D3's bio row gains a Pop column (no seal
  of Lime's — Pop's own on Scheme 4, the sparkle and the scribble; `&column=` kept). Not written
  here.

### Settled in section 3 (the media player)

- **The block widened whole: `if (s.limeTree || s.pop)` inside `Media`'s `if (s.v2)`, after
  `nHot`, `const pop = s.pop`**, with a fourth `G` arm written first, a local `popRow` and a
  handful of arms. The Lime, Grunge and Editorial arms are byte-identical. The walk (bindings with
  their collections, all three widths) found the twins' tree node for node: the head, the card's
  24 / 16 / 96 / 44 boxes, the counter's 16 padding, and the rows' 14 padding and 20 gap. It is
  on **Scheme 1 with the card's instance on Scheme 2**, with no Device override (Desktop /
  Tablet / Mobile) and no effect on any node. Every paint is bound. The hooks sit above the
  branches, so the published player needed nothing.
- **The card is `s.onScheme[2]`**, every leaf a binding:
  - the `Card` binds **`sem/box/1` `#D7FF23`**, not `sem/bg` (layout 2's Scheme 2 card rule). It
    sits at **radius 50 at every width**, unstroked;
  - the played bars bind `sem/text/1`, pink (`S2.ac`). The idle bars bind `box/2` `#B7DD0D`;
  - **the disc binds `box/1`, the card's own fill**, so the disc is no shape and only the ▶ shows.
    That is followed: `G.disc` is `S2.box1`, and the live Pause / Play glyph reads violet on lime;
  - every ink binds `text/2`, violet (`S2.tx`).
- **The list is layout 2's, node for node.** The five rows are pills (radius 999) on Schemes **3 /
  4 / 5 / 7 / 8** by index. Each is ringed 4px INSIDE in `stroke/2`, `stroke/1`, `stroke/2`,
  `stroke/2`, `stroke/1` and padded 14 · 30, with every leaf in its `text/1`. The rows stand **10
  apart and 10 under the counter row**. The covers are 64 discs on the row's own `box/2`, under a
  4px `scheme/1/stroke/2` lime ring, named outright (`s.onScheme[1].stroke2`, an overlay over the
  photograph). The seat table is `popRow`, re-read off these masters' `explicitVariableModes` and
  written locally, so layout 2's block is not touched. The counter row is Body/Chip `text/2`,
  uppercase. The list instance's `sem/bg` white is the page's.
- **The rows pin at each master's division result: 116.8 at 1440, 110.8 at 768 and 390.** The
  master states the list at 678 / 647 and its rows `FILL` it: 44 + 10 + 5 × (116.8 + 10) − 10.
  A row's content is 92, so a content-tall row (the twins' rule, Lime's open question 3) would
  squash the pill's shape. The first build gave the list that height as a minimum, which is layout
  2's mechanism, but that stood `n=1` as one 512-tall stadium on the canvas and 594 at 390. So the
  row carries the `minHeight` (`u(116.8)` / `110.8px`, border-box, measured), and the list grows
  by the frame's pitch at any count (the new Conventions bullet).
- **The head**: Display/LG `sem/text/1` pink, Lime's `s.ac` already. It keeps **the frame's 632.2
  box at 1440 and 768** (`ed || pop`), uppercase (`disp` gains `pop`). Titan breaks it **FIVE
  WORTH / YOUR EAR.** at 1440, as the frame does, and sets one line at 768 (602.1 of 632.2, with
  the seed's full stop). At 390 it runs **two lines**, FIVE WORTH YOUR / EAR., where the master's
  mixed-case one holds one line. That was named at planning (*Sizes*). "KM BIO" is Lime's span,
  `text/2` at Label/XS.
- **The head's lift, scanned** at DPR 4. The frame's 1440 capitals ink 0.015 token-em above the
  box's top and float 0.185 above its foot; the narrow masters are mixed case, and their `y`
  descender reads 0, so the 1440 figure is the target at every width. Unlifted, Titan sat
  **0.131 / 0.118 / 0.125** token-em below the top and **0.056 / 0.057 / 0.050** above the foot,
  0.13–0.15 low at both ends. **`top: −0.14em`** under `pop`, the header's and the bio's
  number: lifted, the tops are −0.004 / −0.020 / −0.014 and the floors 0.190 / 0.194 / 0.189
  (≤ 0.6px off).
- **Display/Title is 28 / 22 / 20** (a literal; `vm.title` shadows the ramp), uppercase in Titan
  through `faced`. The card's names are `s.list`, uppercase.
- **Measured against the masters** (harness, `column=left` at desktop; the frame × 0.82 in
  brackets):
  - **desktop:** eyebrow 41 (the arm's 50); h2 44.8 under the eyebrow's top (45.1), two lines,
    119.3 (119.7), in 518.4; card 24.6 under (24.6), radius 41; counter 24.6 under the card,
    36.2 (36.1); first pill 8.2 under (8.2), **95.8 (95.8) on a 104 pitch (104)**, ring 3.3
    (3.28); list 556.1 (556). Root 995 → 1024.6.
  - **768:** h2 47.6 under (48), one line, 45.4 (45); card 30 under; counter 43 (43); pills
    **110.8 on 120.8**; list 647 (647). Root 1084.8 → 1120.8.
  - **390:** eyebrow 44 (`padY`, Lime's arm; the frame's 50); h2 two lines, 64.1; list 647,
    pills 110.8. Root 1076.1 → 1123.
- **Named diffs, all the twins' but the first**:
  - the 390 head's two lines (above);
  - the card is content-tall, **194.3 / 236.8 / 236.8** against the stated 199.3 / 243 / 243.
    That is 237 of content at 1440, the 243 instance's last 6 being its `FILL`;
  - the clock row reads 00:00 / the track's length, and the right-hand line is `track.rel`, where
    the frame types 1:00 / 2:00 and "Mix 028";
  - the narrow meters paint from the left. The masters centre a leaked 57-bar row and clip it:
    47 bars show at 708, 12 of them played, and 23 at 370, all idle;
  - at 390 the rows' gaps close to 14 and the title ellipsises (MANCHESTER…, ECHO & THE F…). The
    master's 20 gaps clip every title mid-word at 141 ("LATE LIGHTS (C"). That is Retro's
    override, and the pills keep their 30 side padding;
  - the seeded titles are shorter than the frame's ("Late Lights" for "Late Lights (Original
    Mix)"), the heading carries its full stop, and the eyebrow is `kicker`'s "Top tracks", where
    the frame repeats the bio's "KM BIO" (JP-068, by design);
  - Pop's rounded desktop tokens: `list` 16 against 16.4, `chip`.
- **Not drawn: the Section's `Vector 2`**, a 1437.8 × 44.2 arc turned 180°, filled `sem/bg` white,
  Scheme 1. It is the Section's child under `Frame 301` in paint order and inside the Section's
  clip, so it lies white under the list's foot on the white page. It is invisible, the twins'
  leftover, and shows in no render.
- **States**:
  - `n=0` prints the counter (0 FEATURED / 0 MAX) and *No tracks yet.*, with no card;
  - `n=1` is one 95.8 / 110.8 pill;
  - `n=8` is eight pills on the frame's pitch, cycling the five schemes (list 868.1 / 1009.4).
    Their art-less discs read "KM" in each row's `text/1` on its `box/2`;
  - no root's `scrollWidth` exceeds its width at any count or width.
- **`live=1`** (puppeteer, trusted clicks, autoplay allowed, desktop `column=left` and 390):
  - clicking row 2 plays *Manchester at 3am*, and the card names it. The row's number becomes
    Pause in its own `text/1`: teal on Scheme 4, pink on row 5's Scheme 8. The disc turns to
    Pause;
  - a second click pauses, and the disc plays it again;
  - every row is hit by `elementFromPoint` at its centre, cursor pointer;
  - the canvas carries **zero** pointer cursors, and there are no page errors or warnings.
- **`FIELDS.media` moves nothing.** A media-only copy of `reach.mjs` (a `kicker` probe added; themes
  4, 1 and 3, 720 renders, deleted after) gives Pop **`countLabel` layouts 2 and 3**, which
  confirms its `{ Pop: [1, 2] }` row. It also gives `kicker` 1 and 3, `listLabel` and `totalLabel` 2
  and 3, and `chipLabel` 2. Every hit is whole, and each matches `fieldReach` under Pop.
- **`vm.pad`'s layout-3 arm takes media under Pop**: `(T.name === 'Pop' && (cat === 'bio' ||
  cat === 'media'))`, with the shared feet **20 / 34 / 26**. Pop's list ends **122 / 90 / 70**
  above "CURATED SETS" (one `use_figma` over the three pairs). That matches the twins, the 678
  list included, so the feet carry *if* Pop's fitted repertoire seats its head at `padY` as the
  twins' do. **Section 4 re-checks that gap on the canvas**, since today's head is the flat arm's.
  The calendar still stands apart, so the heads part until section 5.
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`** (a fresh `:5180`, both
  labels taken there, no one-line file in any). Theme 4 moved exactly **media arch 2 at three
  widths** on each surface.
- **In the builder** (`page-check.mjs Pop 2,0,1,3`): four modal cards. On card 3's published
  1440 tab, media stands under the bio at **2126**, 1251 tall (1024.6 × 1.22), with the calendar
  beside the bio at 901. The player plays (`paused: false`, the playhead moved). The nav, the
  calendar's and pricing's pills and every footer link land on their ids. The form refuses and
  composes, the 390 burger opens (1 → 5), and `overflow390` is 0. **No console error or warning
  on any card.**
- **For the sweep's CLAUDE.md pass**: the `vm.pad` comment and CONVENTIONS C's *the composed
  row's pad arm* row (Pop: bio, then media); D3's media row gains a Pop column (a fourth `G` arm;
  the rows turned round again — pills pinned at the division, neither twin's content-tall rule;
  the 632 box at 1440 and 768, Editorial's); `notes/media.md`'s per-seat schemes gain layout 3's
  list. Not written here.

### Settled in section 4 (the repertoire)

- **The block widened whole: `if (s.limeTree || s.pop)` inside `Repertoire`'s `if (s.v2)`, after
  `arrow`, `const pop = s.pop`**, with a fourth `G` arm written first and two `pop` arms. The
  Lime, Grunge and Editorial arms are byte-identical. The walk (bindings with their collections,
  all three widths) found the twins' tree node for node: the head, the grid, three `set`s of name,
  `metaWrap`, four `sr` rows and `view`, and at 390 the head's `Frame 311` and the pager's
  `Frame 307`. It is on **Scheme 1 with the three sets on Schemes 2 / 3 / 4** at every width, with
  no Device override (Desktop / Tablet / Mobile) and no effect on any node. Every paint is bound.
  `get_variable_defs` is the ramp (display-lg 82 / 51 / 36, body-lg 16 / 15 / 15, chip
  12 / 11 / 11, list 20 / 16 / 15, body-sm 12) plus `border/default` 4 (and `border/hairline` 1
  at 390), so every size reads `s.*`. The hooks sit above the branch, so the reveal and the 390
  pager needed nothing.
- **Every card leaf is a `sem/*` binding in the card's own scheme, so each seat is
  `s.onScheme[n]`**, Editorial's `seat(n)`, and no literal is owed. `box/1` is the card
  (`#D7FF23` / `#FF63B8` / `#3F76FF`); `text/2` its name, titles, lengths and *View full set →*
  (violet / violet / yellow); `text/1` the meta line (pink / lime / teal); `stroke/1` its ring and
  the rows' foot rules, one binding (violet / violet / teal). No node names another scheme's
  variable. **Seated by rendered place**, Lime's rule unchanged: the 390 master centres the pink
  card, which is seat 1.
- **The `G` arm is Pop's own** (the plan's call): `seats: [seat(2), seat(3), seat(4)]`, Lime's pad
  34 and radius 50, the frame's rows **50.25 / 57.5 / 57.5**, and `ringW: 4`. The arm was owed
  anyway for the seats and the ring, so the frame's rows cost nothing. The fallback's 39 / 57 are
  Lime's: its 1440 card divides 369 under a 116 head, and Pop's 412 under Chunko's 73.
  - **The card's ring is `border/default` 4px INSIDE**, where the twins draw a hairline. `ringW`
    is a new key, since a seat's `ring` is Grunge's ring *colour*. The fallback stays the literal
    `'1px'` (`u(1)` would be 0.8 at desktop and move themes 1–3); Pop's is `u(4)`, 3.3 on the
    canvas. The rows' foot rules stay 1px.
  - **`disp()` gains `pop`** (the plan's *Seen at planning time*, item 4). The head and the
    titles are uppercase Titan through `faced`, and `lenDrop` follows `faceK`.
  - **Head `s.tx` and the 390 pills need nothing.** `s.tx` is `sem/text/2` violet. The pills'
    1px `s.ac` ring and arrow at radius 60 are the frame's `sem/text/1` pink, `border/hairline`
    1, `cornerRadius` 60.
- **The head's lift, scanned** at DPR 4. The frame's capitals ink 0.015 / 0.024 / 0.016 token-em
  above the box's top and float 0.185 / 0.186 / 0.184 above its foot, the media head's figures
  exactly. Unlifted, Titan sat **0.131 / 0.118 / 0.132** below the top and **0.047 / 0.062 /
  0.049** above the foot, 0.12–0.15 low at both ends. So **`top: −0.14em`** under `pop`, the
  header's, bio's and media's number. Lifted, the tops are −0.004 / −0.020 / −0.007 and the floors
  0.181 / 0.199 / 0.188 (≤ 0.7px off). The song titles are not lifted (lh 1.2, layout 2's call).
- **The desktop row keeps its one-line ellipsis.** The frame's 50.25 is 41.2 on the canvas, which
  *would* hold two Titan lines (38.4). But clamping only at 768 and 390 is the block's shared
  rule (JP-104, entry 5), and a Pop-only clamp would split the block's behaviour, not dress it.
  No seeded desktop title reaches it (DON'T STOP ME NOW 165.3 of ≈ 267 beside its length).
- **Measured against the masters** (harness; the frame × 0.82 in brackets):
  - **desktop:** head 59.6 tall (59.9); grid 19.7 under it (19.7); cards **351.8 × 337.8**
    (352.05 × 337.84), ring 3.3, radius 41, padding 27.9 (27.9); name at 27.9, meta at 55.6
    (55.8); rows **41.2** (41.2). Section 543.1 against 509.2: the shared `padY` 80 on top
    against the frame's 45.9, the foot JP-103's 46.
  - **768:** head 45.4 (45); cards **222.7 × 438.3** (222.67 × 439), ring 4, rows 57.5; section
    619.7 against 628 (`padY` 56 against 60, top and foot).
  - **390:** head 32 (32); cards 290 × 438.3 at **−260 / 50 / 360** (the master's x); pills
    **180 × 54** at 562.3 (the master's 579, less the 16 of `padY` 44 against 60, and the card's
    0.7); section 660.3 against 693.
  - Every length is centred on its title's first line (Δ 0.0) and ends flush with its row.
- **Which titles wrap** (the pre-measure, confirmed on the fitted rows). At 768 the seeded first
  fours wrap DANCING QUEEN, MR. BRIGHTSIDE and DON'T STOP ME NOW to two lines, whole; I WANNA
  DANCE wraps too once revealed. The frame holds three of them on one line at gap 0 and overruns
  with the fourth, so the block's 10 gap and Titan's 1.2% are the difference. It is named, not
  fitted: at gap 0 MR. BRIGHTSIDE would have 0.2px to spare. At 390 and at desktop every seeded
  title is one line. `&cj=` (JP-104's set) reads as the pre-measure: FEATHERSTONEHAUGH clipped at
  768 and fitting at 390, the 52-character title clamped to two lines at 768 and 390 and
  ellipsised at desktop, every length on its title's first line, the root at its width.
- **`live=1`** (puppeteer clicks):
  - **390:** the carousel opens Weddings | **Pubs** | Birthdays, lime | **pink** | blue. Next and
    Prev each walk three stops, wrapping, and the colours stay with the seats. The peeks take no
    pointer (`elementFromPoint` finds the row behind them). The centre's reveal (Pubs' fifth
    song) grows the three seats together and the root 660.3 → 671.
  - **`n=20`, desktop and 768:** *View full set →* reveals seven rows and the link goes. The wide
    pager turns to the *All* card, on seat 0's lime, and wraps back.
  - **Two sets (`&cj=`):** two cards at desktop, lime and pink with no pager. At 390 the lone
    card is pink (seat 1) and the pager turns it.
  - **`n=0`** prints *No songs yet.* in `s.muted`, violet at 64% on white. It reads, as layout
    2's did on `#F5F5F5`.
  - The canvas carries no pointer cursor. There were no page errors or warnings.
- **The gap under media, re-measured as section 3 asked: the feet carry.** In the real app on card
  3, from the media list's lowest box to the head's **unlifted** box: **100 on the canvas**
  (122 × 0.82), **90 at 768 and 70 at 390** in the published tab. That is the frames' 122 / 90 /
  70, since the head stands at the shared `padY` as the twins' do. The published 1440 tab reads
  120 until the lift is scaled: `getComputedStyle().top` is the unzoomed −9.19 inside the tab's
  1.22 zoom, so the corrected gap is 122.0. The media arm did not move.
- **`vm.pad`: JP-103's desktop arm takes Pop**, since the frame's root pads 56 / 56 at 1440. The
  repertoire's foot is 46 above the lime gallery band on the canvas and **56.1** in the published
  1440 tab (frame 56), on a straight edge (seam clip). The top stays `padY`, the twins' named diff.
  Pricing's half of JP-103 is the pricing session's.
- **Named diffs, the twins'**: the shared `padY` top (80 / 56 / 44 against 56 / 60 / 60, and the
  foot at 768 and 390); the seeded sets are the tags (Weddings / Pubs / Birthdays against Cocktail
  hour / Dinner / Party peak, JP-066's call); the 768 wraps (above); Pop's rounded desktop tokens
  (`list` 16 against 16.4, `bodyLg` 13 against 13.1, `chip` 10 against 9.8).
- **`FIELDS.repertoire` has no template-keyed row**, so no `reach.mjs` run was owed.
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`** (a fresh `:5181`, both
  labels taken there, no one-row file in any). Theme 4 moved exactly **repertoire arch 2 at three
  widths** on each surface.
- **In the builder** (`page-check.mjs Pop 2,0,1,3`): four modal cards on every card. On card 3's
  published 1440 tab the repertoire stands at **3376**, 663 tall (543.1 × 1.22), under media and
  over the gallery. Both reveals change state. The nav, the calendar's and pricing's pills and
  every footer link (Repertoire → `#repertoire`) land on their ids. The player plays, the form
  refuses and composes, the 390 burger opens (1 → 5), and `overflow390` is 0. **No console error
  or warning on any card.**
- **For the sweep's CLAUDE.md pass**: nothing in CLAUDE.md names the layout-3 repertoire's colours
  or rings. The JP-103 comment now names Pop. CONVENTIONS D3's repertoire row gains a Pop column (a
  fourth `G` arm, seated by rendered place on `s.onScheme[2]` / `[3]` / `[4]`, a 4px ring), and
  C's `G` row gains the repertoire. Not written here.

### Settled in section 5 (the booking calendar)

- **The block widened whole: `if (s.limeTree || s.pop)` inside `Calendar`'s `if (s.v2)`, after
  `line`, `const pop = s.pop`**, Editorial's shape: a handful of arms and no `G`. The Lime, Grunge
  and Editorial arms are byte-identical. The walk (bindings with their collections, all three
  widths) found the twins' tree node for node, 65 nodes against Lime's 65. The paired
  traversal-order diff against `964:68677` returned only the card's ring and radius, the dots'
  ring weight, one dot (below) and the type's boxes. The instance is **explicitly Scheme 2**, and so
  is its foot pill, with no Device override (Desktop / Tablet / Mobile) and no effect on any node.
  Every paint is bound. `get_variable_defs` is the ramp (display-lg 82 / 51 / 36, display-sm
  36 / 29 / 24, body-lg 16 / 15 / 15, body-md 14 / 13 / 13, body-sm 12, list 20 / 16 / 15) plus
  `border/default` 4, so every size reads `s.*`. The hooks sit above the block, so the published
  day picking, the month arrows and the pill needed nothing.
- **Under the Scheme 2 seat Lime's keys are the bindings.** The card is `s.box1`, which is
  `sem/box/1` `#D7FF23` here, so the Scheme 2 card rule (layout 2's) is met by Lime's own key
  with no arm. Every ink is `text/2` violet. The dots are `box/2` `#B7DD0D` booked, `text/1`
  pink picked and `box/1` free, and the legend's two marks take the same fills. The deltas,
  behind `pop`:
  - **the card's ring is `border/default`**, 4px of `sem/stroke/1` violet INSIDE, at radius
    **36**. Both scale at desktop (`lu(4)` 3.3, `lu(36)` 29.5), as every Pop ring does; Lime's
    is `s.bw`, 2px unscaled, at 50;
  - **the free dot's ring is a raw 2** (Lime's 2.559, Editorial's 1px), `lu(2)`, and the JP-063
    month arrows take it too, so they stay the free dot a size down;
  - **"BOOK ME" is Display/Title 28 / 22 / 20** at lh 1.1, a literal (`vm.title` shadows the
    ramp), and `disp()` gains `pop`, so the numeral, the month and the head are uppercase Titan
    through `faced` / `facedLh`. The narrow masters type "Book Me" (decision 2);
  - **the pill is Scheme 2's own and `BookPill`'s defaults under the seat**: `pillBg` pink,
    lettered and disced in `s.bg` `#C6F200` round a pink arrow. So Lime's `fg={s.box1}` is not
    passed (`ed || pop ? undefined`): it would have given the card's `#D7FF23`, one shade off
    the frame's `sem/bg`, Editorial's trap. Its label is Lime's `size/list` (`s.list`, 16 / 16
    / 15 against 16.4 / 16 / 15), Titan uppercase through `labelStyle`. The pill stays on
    Scheme 2, Lime's own; Editorial turned it to Scheme 1, and Pop's
    `explicitVariableModes` names 2 at all three widths.
- **The lifts, scanned** at DPR 4, each string drawn alone (*Conventions*), against the frames'
  `absoluteRenderBounds` in token-em:
  - **The numeral** (Display/LG, lh 0.89). The frame inks −0.005 / −0.014 / −0.006 above the
    box's top and floats 0.195 / 0.196 / 0.194 above its foot. Unlifted, Titan sat 0.131 /
    0.118 / 0.125 below the top and 0.054 / 0.066 / 0.056 above the foot. **`top: −0.14em`**
    lifts it to −0.007 / −0.020 / −0.012 and 0.191 / 0.204 / 0.194.
  - **The month** (Display/SM, lh 1). The frame inks 0.050 / 0.059 / 0.050 down and 0.24 /
    0.231 / 0.24 up; Chunko's J sits on the line. Titan sat 0.200 / 0.198 / 0.177 down and,
    its J aside, 0.092 / 0.095 / 0.114 up, so it takes **`−0.14em`** too: lifted, 0.063 / 0.061
    / 0.040 and 0.229 / 0.232 / 0.251. Editorial's `lift` gained the `pop` arm. **Titan's J
    descends**: lifted, its tail ends 9.4 / 10.4 / 10.2 above "2025"'s ink, against the
    frame's (J-less) 14.0 / 14.9 / 13.9. The non-J floor clears by 13.2 at desktop. Named.
  - **"BOOK ME"** (Display/Title, lh 1.1). The frame's floor, corrected for its whole-pixel
    line box (31 for 30.8), is 0.272 at 1440, and 0.258 / 0.29 at the narrow two in mixed case.
    Titan sat 0.176 / 0.179 / 0.137 up, so it takes **`−0.1em`**, the header card's name's
    number at the same token: lifted, 0.274 / 0.277 / 0.234. The gap from its ink to the card
    is then 30.9 on the canvas, the frame's 37.72 × 0.82 exactly.
  - **The pill's label is not lifted.** Against its own line box it sits 0.11–0.13 token-em
    (1.7–2.1px) low at lh 1.2, which is every Pop `BookPill` label's state; layout 2 left them
    at lh 1.2. A lift would have to wrap the label in a span inside the shared `BookPill`
    (*lift the label, never the ring*). Named.
- **Measured against the masters** (harness, `column=right` at desktop; the frame × 0.82 in
  brackets):
  - **desktop:** "BOOK ME" box at 41.05 (41), 25.3 tall (25.4); the card 24.6 under it at 90.9
    (91.0), radius 29.5, ring 3.3, padding 16.4; the numeral box 59.6 (59.9) at 65.66px, the
    month 30 (29.5; Pop's rounded `dispSm` 30); dots 25.2 (25.2) in a 1.6 ring; the legend 20.6
    (20.5); the pill 44.3 (44.3) on a 37.7 × 36.1 disc. The card is 425.8, the frame's 395.1
    plus one dot row (31.7).
  - **768:** "BOOK ME" at 50.05 (50), 24.2 (24); the card at 104.2 (104), radius 36, ring 4;
    numeral 45.4 (45), month 29 (29); the pill 54 on a 46 × 44 disc. The card is 482.8 against
    445.9 + 37.4.
  - **390:** "BOOK ME" at 44 against the frame's 40 (`padY`, the twins' named diff), 22 (22);
    numeral 32 (32), month 24 (24); the pill 54 `full`. The card is 464.5 against 427.9 + 37.4.
- **Named diffs**:
  - **the twins'**:
    - the seeded June runs five weeks where the frame draws four, so each card is one dot row
      taller;
    - the frame's four booked and seven selected dots are filler the section has no model
      for, and its "11 / Tue" is the seed's "12 / Thu";
    - the dot grid is Retro's seven-column normalisation;
    - the legend's ● and ○ are Inter's smaller glyphs;
    - the desktop foot is `padY` 80 against `Frame 300`'s 56 × 0.82, and the 390 top 44
      against 40;
  - **Pop's own**:
    - **the frame's one 31.99 dot ringed in `text/2`** (row 2, the Friday): a *today* neither
      twin's frame draws. It is the same violet as the free ring under Scheme 2, 1.3 larger.
      The canvas never reads the clock, so it has no seat (open question 14);
    - Pop's rounded desktop tokens (`dispSm` 30, `list` 16).
- **`live=1`** (puppeteer, trusted clicks, desktop `column=right` and 390):
  - **picking**: June 21 moves the head to *21 / JUNE / Sat* and the pill to *Enquiry About
    June 21*; a second click falls back to the cued 12th;
  - **the arrows**: Next shows JULY with the head the month alone and the pill still on
    June 12; the 15th gives *15 / JULY / Tue* and *Enquiry About July 15*; Prev shows JUNE,
    the month alone, the pill on July 15; Prev again wraps to MAY 2026;
  - **`&booked=2025-06-12,2025-06-20`**: both days take `box/2` with no handler (28
    pointers), and the pill prints *Pick a date to enquire*;
  - **`&today=2025-06-18&booked=2025-06-10,2025-06-24`**: the 17 days before today are the
    free dot at .38, the booked 10th among them (JP-064, past wins), and only the 24th takes
    `box/2`. A click on the 26th picks it. The dimmed violet rings read as quiet rings on the
    lime card;
  - **`&open=2025-03-29`**: opens on *29 / MARCH / Sat*;
  - **the pill** is `<a href="#form">` live and a span on the canvas;
  - **the canvas**: the dots and arrows carry no pointer and a click on Next leaves June.
    `BookPill`'s own `cursor: pointer` is every template's;
  - no page error or warning; the root's `scrollWidth` is its width at both widths.
- **The head's fit** (JP-063's risk in the column): SEPTEMBER, NOVEMBER, DECEMBER and FEBRUARY,
  each with a Wednesday picked, hold one line beside the pair and the weekday at all three
  widths, canvas and live. Nothing overflows the card's content box.
- **A long typed heading.** *Book me for your wedding party* wraps to two lines in the 335
  column. **A single 34-letter word runs past it** (466 in 335), because the h2 carries no
  `overflowWrap`. That is the shared block's behaviour: Lime's runs to 344 and Editorial's to
  506 with the same word. Named, not fitted; open question 15.
- **The composed row closes here.** `vm.pad`'s layout-3 arm folds Pop into the four templates
  (`… || T.name === 'Pop'`, the `(cat === …)` clause gone), as Editorial's calendar did. In the
  builder (a one-off puppeteer probe, Pop → card 3 → *Use this header*, a 1760 window):
  - **the heads**: "KM BIO" and "BOOK ME" stand at one top, **41 on the 1180 canvas** and
    **50 in the published 1440 tab**. Before this session they stood at 41 / 80 and 50 /
    97.6. Both are box tops, the head's 0.1em lift undone;
  - **the columns**: 708.7 : 334.5 and 864.8 : 408.2;
  - **the sticky cell (JP-043 / JP-072)**: on the canvas it pins at the scroller's top + 28 at
    ¼, ½ and ¾ of the row's travel (the scroller 944 tall, the cell 596.6). At 1.1 it is
    released, its bottom flush with the row's. In the tab it pins at 0 and is released the
    same way (row 2475.5, cell 655.3);
  - no sideways scroll at 1440, 768 or 390, and the calendar's root is white at each.
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`** (a fresh `:5182`,
  both labels taken there, no one-row file in any). Theme 4 moved exactly **calendar arch 2 at
  three widths** on each surface. The roots go 649.9 → 596.6, 660.7 → 643 and 611.8 → 604.4:
  the pad's top (80 → 41 at desktop) and the shorter type.
- **`FIELDS.calendar` moves nothing.** A calendar-only copy of `scripts/reach.mjs 4`, run from
  the scratchpad (768 renders), reads layout 2's list: `heading`, `open` and `prompt` reach all
  four layouts, so the `Pop: [0, 1, 2, 3]` heading row holds over the fitted card. `slots`,
  `dateLabel` and `availLabel` reach layout 2, `cta`, `types`, `tiers` and `who.location`
  layout 4, `image` and `time` layouts 1 and 4, and `email` layout 4 at 3/6, the known partial.
  All eleven rows match `fieldReach` under Pop in Node.
- **In the builder** (`page-check.mjs Pop 2,0,1,3`): four modal cards on every card. On card
  3's published 1440 tab the calendar stands beside the bio at **901**, 655 tall, under the
  901 header, with media under the bio at 2126. The tab reads the real clock (F20), so it opens
  on OCTOBER 2026 with the days before today dimmed and the pill on *Pick a date to enquire*,
  the named, accepted diff. The calendar's six probed controls all change state. The nav, the
  calendar's and pricing's pills and every footer link land on their ids. The player plays, the
  form refuses and composes, the 390 burger opens (1 → 5), and `overflow390` is 0. **No console
  error or warning on any card.**
- **For the sweep's CLAUDE.md pass**: CLAUDE.md names no layout-3 calendar colour, ring or
  radius, and the composed-row paragraph states no template list. `notes/calendar.md`'s
  layout-3 sentences name no template, so nothing is owed there either. The `vm.pad` comment is
  written. CONVENTIONS C's *the composed row's pad arm* row gains Pop (bio, media, then the
  calendar, which closes it). D3's calendar row gains a Pop column: no `G`; the 2px ring turned
  to a 4px one at radius 36; the pill kept on Scheme 2 at `BookPill`'s defaults under the seat,
  `fg` dropped. Not written here.

### Settled in section 6 (the gallery)

- **No block, for the fourth time: the twins' ternaries through `Gallery`'s `if (s.v2)` widen
  one by one under `const pop = s.pop`**, at eleven sites: `sheet`, `ink`, `well`, `ring` and a
  new `ringW`, the desktop and 390 halves of `ratio`, the viewer's `cream` / `ctlBg` / `scrim`,
  the head's size, casing and lift, and the tile's border gate, clip, `Photo` ink and well, and
  overlay gate. The Lime, Grunge and Editorial arms are byte-identical (the overlay's `'1px'`
  arm included). The walk (bindings with their collections, all three widths) found the twins'
  tree node for node, **17 / 17 / 17** against Lime's and Editorial's by traversal order: the
  56 / 60·30 / 60·20 insets, the 32 head gap, `columnGap` 8 with `rowGap` 8 / 20 / 20, the head
  row's `flex-[1_0_0] h-px` spacer (no fill). The paired diff returned leaves alone: the head's
  size and box, the tiles' residue, the ring's weight and binding, and Editorial's square
  corners. **Scheme 2 on all three roots, no Device override** (Desktop / Tablet / Mobile), no
  effect on any node, every paint bound. `get_variable_defs` is `size/display-lg` 82 / 51 / 36
  and the five colours below. The hooks sit above the branch, so the published viewer needed
  nothing.
- **The seat does the paint.** The sheet is `sem/bg` lime, so `(ed || pop) ? s.bg` (the flat
  arm's `s.paper` read the same lime through `paperOf`, by accident, Editorial's case). The
  head is `sem/text/1` pink (`s.ac`, already Lime's key), and each well `sem/box/3` `#8CA51E`
  (`s.box3` under the seat). The seventh tile's well is `sem/active/bg` pink under its
  photograph: it paints nothing and is not drawn, the twins' call on the identical slot. No
  tile carries an `s.ac` state at layout 3 (no pick ring; a pick opens the viewer), so Pop's
  ring hides no accent state.
- **Trap 3, the ring.** It names **`scheme/1/stroke/2`** (the `1 · Primitives` collection's
  scheme variable) at **5px INSIDE**, where both twins bind `scheme/1/stroke/1` at 1px. Inside
  the Scheme 2 seat it reads `s.onScheme[1].stroke2`, lime `#C6F200`, the sheet's own colour.
  Kept on the twins' mechanism, an inset `boxShadow` on a last-child overlay over the
  photograph, so the photograph fills the whole tile under it as the frame paints it, at
  `u(5)`: 4.1 / 5 / 5 computed. The tile's CSS border is gated off as Lime's is. Radius 30 at
  every width (24.6 on the canvas), Lime's.
- **The leak behind a sheet-coloured ring** (the new *Conventions* bullet). The first build
  showed a faint dark arc round every tile's corners, outside the invisible ring: the
  photograph's anti-aliased edge where the tile's round clip cuts it, (165, 198, 0) on the
  corner's one edge pixel against the sheet's (198, 242, 0), on the `n=0` wells too. The
  straight edges are pixel-aligned and were clean. Under `pop` the photograph's span is
  clipped `inset(2px round calc(r − 2px))` (1px left (189, 230, 0)); the corner diagonal now
  reads the sheet's lime on every pixel, at desktop and on the `n=0` wells. The cover box is
  unchanged, so the crop is the frame's; the 2px sits under the 4.1 / 5 ring. Proved at DPR 1
  alone; in the published desktop tab's 1.22 zoom the clip and the ring scale together, so it
  holds by construction. The clip also bounds the photograph's hit area, so a click in the
  outer 2px lands on the tile, which carries the handler.
- **The tile is a residue again**: **326 / 185.333** at desktop ((789 − 112 − 73 − 32 − 16) / 3,
  over this page's 73 head) and **111.333 / 83.75** at 390 ((579 − 120 − 32 − 32 − 60) / 4); 768
  states the same 660 grid, 230.667 / 150. Each matches the master's own tile to the hundredth.
- **The head**: `s.dispLg` at every width, where the flat arm stood the 768 head on Retro's
  `s.h1` (`tab && !(s.limeTree || pop)`), uppercased, so `HEADING_3`'s "Gallery" prints the
  frame's GALLERY. **The lift, scanned** at DPR 4 with the string drawn alone, against the
  frame's `absoluteRenderBounds` (ink top 0 and floor 0.185 / 0.186 / 0.184 token-em above the
  box's foot, the media and repertoire heads' figures again): unlifted, Titan sat **0.130 /
  0.118 / 0.125** below the top and **0.046 / 0.057 / 0.049** above the foot. **`top:
  −0.14em`** under `pop`: lifted, −0.004 / −0.020 / −0.014 and 0.180 / 0.194 / 0.188 (≤ 0.6px
  off).
- **The empty slot's initials take the seat's `text/3`, black** (`pop ? s.text3`): the twins'
  `s.tx` is violet at 2.2:1 on the `#8CA51E` well, white 2.8, pink 1.2, black 7.5. `&n=0`: seven
  olive wells in their lime rings with black `KM` at 32 / 28 / 14, `cursor: auto` canvas and
  live, and a click opens nothing. **`&noimage=1` is inert here** (the gallery's own slots stay
  seeded: seven `img`s and identical HTML at three widths), the positive control.
- **The viewer is re-inked a fourth time.** No frame draws it. Widened as written it would
  have been Retro's fallthrough (`#111` at .94, cream controls). The twins' key reading would
  put violet `s.tx` controls on the scrim, 3.2:1. So Editorial's reading in Pop's own keys:
  the scrim is Pop's darkest ink, **`#000000` at .94** (Scheme 1's `text/3` and `active/bg`;
  Grunge's literal, so `grunge || pop`), and the controls and counter **`s.ac`**, the head's
  own pink under the seat, on pink at 14%, 5.7:1 on the scrim. Pictured open over the lime
  sheet at desktop and 390: the page shows through as a faint olive tint at 6%, and the pink
  discs, arrows and counter read.
- **Measured against the masters' content edges** (harness; the frame × 0.82 in brackets):
  **desktop** the h2's box at 45.9 (45.9), 59.6 tall (59.9) at 65.66px; grid top 131.7 (132.0);
  tiles **267.1 × 151.8** (267.3 × 152.0) on a 273.7 / 158.4 pitch (273.9 / 158.5); ring 4.1,
  radius 24.6. **768** h2 at 60 (60), 45.4 (45); grid top 137.4 (137); tiles 230.7 × 150 on
  238.7 / 170, exact. **390** h2 at 60 (60), 32 (32); grid top 124 (124); tiles 111.3 × 83.7
  (83.75) on 119.3 / 103.8. Every root's `scrollWidth` is its width.
- **Named diffs, the twins'**: the sections are **487.9 / 687.4 / 475.3** against 647 / 857 /
  579, our seven tiles in two rows (three narrow) against the frame's twelve in three (four),
  one row's pitch short each; the frame's tiles are placeholders from four templates (open
  question 3), our seven Pop slots stand, centred covers (the frame's one `CROP` is its eighth
  tile at 1440, a seat we do not draw); Pop's rounded desktop `dispLg` 67 against 67.24.
- **`live=1`** (puppeteer, trusted clicks and keys, desktop and 390, the harness and the
  published tab at 1440 / 768 / 390): the third tile opens the viewer at 3 / 7
  (`pop-stage.jpg`) with focus inside and `hidden | stable | hidden` on `<html>` and `<body>`;
  Next steps to 4 / 7, → to 5 / 7, ← back to 4 / 7; Escape closes and restores all three; reopened
  on slot 1, a scrim click closes. Every tile hit-tests to itself at its centre (7 / 7) with
  `zoom-in`; the canvas carries no pointer cursor and a click opens nothing. No page errors or
  warnings. The digest's canvas and `live=1` files are byte-identical (the cursor is no column).
- **`FIELDS.gallery` has no template-keyed `in` row**, so no `reach.mjs` run was owed.
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`** (a fresh `:5183`, both
  labels taken there, no one-row file in any). Theme 4 moved exactly **gallery arch 2 at three
  widths** on each surface: seven rows more a width (the overlays), the roots 481.3 → 487.9,
  695.4 → 687.4 and 546.5 → 475.3.
- **In the builder** (`page-check.mjs Pop 2,0,1,3`, and a one-off probe of card 3's popup): four
  modal cards on every card, no console error or warning on any. Card 3's published 1440 tab
  stands the gallery at **4039**, 595 tall (487.9 × 1.22), under the repertoire (3376 · 663) and
  over pricing (4634). **Repertoire → band 56.1** (the frame's 56, JP-103's arm); band →
  pricing's head box is `padY` 97.6, pricing's session's (JP-103's other half). At 768 and 390
  the calendar stands above it, 56 and 44 off its card. The seam clips are straight at 1440 and
  390: white → full-bleed lime → white. No sideways scroll at 1440, 768 or 390. Every nav,
  anchor and footer link lands (Media → `#gallery`); the player plays; the form refuses and
  composes; the 390 burger opens (1 → 5); `overflow390` 0. page-check's generic probe lists no
  gallery control, since the viewer opens on a tile; it was driven above.
- **For pricing**: it stands on white, ringed 1px `sem/stroke/1` pink **at every width** (the
  block's 1px `s.stroke1` overlay on the root is `(grunge || ed)`-gated today — widen from the
  frame); its featured row is a
  nested **Scheme 2** node, lime, ringed `stroke/2` pink — read whether it binds `sem/bg` or
  `box/1` (layout 2's Scheme 2 card rule) before writing a key; the head "PRICING" is
  **Display/Title** 28 / 22 / 20, a literal (`vm.title` shadows the ramp), and Titan at
  Display/Title took 0.1em, not 0.14 (section 5); `vm.pad`'s layout-3 pricing arm (32 foot at
  1440 and 768, JP-103's 46 desktop top) names Lime, Grunge and Editorial and waits for Pop.
  Its block has `G` at its head, so Pop is a fourth arm.
- **For the sweep's CLAUDE.md pass**: CLAUDE.md names no gallery layout-3 colour or viewer
  palette. `notes/gallery.md` now carries Pop's viewer, its 5px ring with the 2px clip, and the
  black initials (written in this session's commit). CONVENTIONS D3's gallery row gains a Pop
  column (eleven sites under `pop`; the ratio re-derived, 326 / 185.333 and 111.333 / 83.75; the
  viewer re-inked a fourth time, black and pink), A's *a node can name another scheme's
  variable outright* row (the tiles' `scheme/1/stroke/2`), and C's *a twin's frame-less control
  is checked against its own surround* (the viewer) and *an empty slot … takes `Photo`'s `ink`*
  (black on the olive well). Not written here.

### Settled in section 7 (pricing)

- **The block widened: `if (s.limeTree || s.pop)` inside `Pricing`'s `if (s.v2)`, after `shown`,
  `const pop = s.pop`, `const S2 = pop ? s.onScheme[2] : null` and a fourth `G` arm written
  first**, the Lime, Grunge and Editorial arms byte-identical, plus five `pop` sites: `disp()`'s
  uppercase, the heading's size and lift, the numeral's lift, the plain pill's `bg`, the instance
  ring. One new leaf falls back through `??` — `pillBg`, the plain row's pill. The walk (bindings
  with their collection, all three widths) found the twins' tree node for node, **115 / 115 /
  115**, on **Scheme 1 with no Device override** (`resolvedVariableModes` Desktop / Tablet /
  Mobile), the featured `row` **explicitly Scheme 2** at every width, no effect and no rotation on
  any node, every paint bound, **no node naming `scheme/N/…` outright**. `get_variable_defs` is
  the ramp (title 28 / 22 / 20, display-md 45 / 36 / 28, list 20 / 16 / 15, body-lg 16 / 15 / 15,
  body-md 14 / 13 / 13, body-sm 12, label-xs 20 / 14 / 12, chip 12 / 11 / 11, eyebrow
  15 / 12 / 11), so every size reads `s.*` but Display/Title, the literal `u(28)` / 22 / 20
  (`vm.title` shadows the ramp). The hooks sit above the block, so the published filter, the
  moving FEATURED seat and the Book pills needed nothing.
- **Lime's geometry, Editorial's bindings.** The row's corner is **50** and its padding **38** at
  every width, and the 768 includes panel **240** (352 + 40 + 240 = the row's 632): Lime's arm's
  numbers. The bindings are Editorial's names, resolved with `resolveForConsumer` on each node:
  - a plain row is `sem/bg` white ringed 1px `sem/stroke/2` — **`s.stroke2`, lime `#C6F200`**
    (Lime's own key is `s.ac`) — with every ink `text/2` violet and the numeral `text/1` pink;
  - **the featured row binds `sem/bg`, not `box/1`** (the question layout 2's Scheme 2 card rule
    asks): its fill is Scheme 2's lime **`#C6F200`**, ringed `stroke/2` **pink**, its inks
    `text/2` violet, its numeral `text/1` pink, its badge **`box/1` `#D7FF23`** (radius 4)
    lettered `text/2`, and its pill `text/1` pink lettered and disced in `sem/bg` lime round a
    pink arrow — Editorial's arm read off `S2` key for key (`featBg` / `featRing` / `featInk` /
    `featNum` / `badgeBg` / `badgeFg` / `featPillBg` / `featPillFg`). `featInk` and `featNum`
    are the same hexes as Scheme 1's `s.tx` / `s.ac` and are read through `S2` anyway;
  - **the plain row's pill is not `BookPill`'s default under Pop**: the frame's is `text/1` pink
    lettered and disced in `sem/bg` white, and `BookPill`'s Lime branch fills `s.pillBg`, which is
    **black** on Pop's Scheme 1 (layout 1's trap 3). So the arm carries `pillBg: s.ac` and the
    spread passes `{ bg: G.pillBg }` only where it is set; the default `fg` (`s.bg` white) and the
    disc's arrow (`bg`, pink) are the frame's;
  - **the capsule needed nothing**: `sem/box/1` `#F5F5F5` in a 1px `sem/stroke/1` pink ring at
    `radius/pill`, the pick `sem/text/1` lettered `sem/bg`, the idle options `text/2` — the twins'
    five keys. The offer and the footnote are `text/2`, `s.tx`.
- **The instance ring is drawn at every width**: all three roots bind 1px INSIDE `sem/stroke/1`
  (pink) on `sem/bg` white, so Grunge's overlay widens to `grunge || ed || pop` — layout 2's root
  ring was narrow only. It stands between the lime gallery band and the map's band; nothing
  doubles (seam clips at 1440 and 390: straight edges, the ring visible at both).
- **The lifts, scanned** at DPR 4, each string drawn alone, against the frames'
  `absoluteRenderBounds` in token-em:
  - **"PRICING"** (Display/Title, lh 1.1). The frame's floor stands 0.276 / 0.263 / 0.29 up its
    line box (0.272 / 0.258 / 0.29 corrected for Figma's whole-pixel box — section 5's numbers to
    the thousandth). Titan sat **0.176 / 0.179 / 0.137**, so it takes **`top: −0.1em`**, "BOOK
    ME"'s number at the same token: lifted, 0.274 / 0.277 / 0.235, the tops 0.109 / 0.106 / 0.140
    against 0.111 / 0.108 / 0.09.
  - **The numeral** (Display/MD, lh 1), on a bottom-aligned row beside the Inter `£` (Editorial's
    *a numeral beside a bottom-aligned Inter glyph*). The frame's `450` / `650` floor stands 0.234
    / 0.24 / 0.24 up its box, its ink **4.55 / 2.64 / 0.72** frame px above the `£`'s (3.7 on the
    canvas). Unlifted, Titan stood 0.101 / 0.104 / 0.097 up, **1.75 / 2.75 / 3.76 below** the
    `£`'s. **`top: −0.14em`**, Titan's lh-1 number: lifted, 0.239 / 0.241 / 0.235 up its box and
    **3.31 / 2.19 / 0.07** above the `£`. The 0.4 / 0.45 / 0.65 left is the `£`'s own: Inter sits
    ~0.5px higher in its CSS 1.5 box than in Figma's (0.415 against 0.375 em at desktop). `1,200`
    reads its comma, so the floors came off `450` and `650`.
  - **The names are not lifted** (Display/List, lh 1.2): they sit 0.9–1.5px low, layout 2's
    titles' state, and stand centred beside the FEATURED badge (Editorial's call on the same node).
  - **The pills' labels are not lifted**: `BookPill`'s shared label, section 5's call.
- **Measured against the masters' content edges** (harness, DPR 1; the frame × 0.82 in brackets):
  - **desktop**: the h2's unlifted box at 46 (45.9), 25.3 tall (25.4); intro at 81.1 (81.2);
    capsule 135.5 × 28.8 (135.3 × 28.7), 19.7 under the intro; rows **1088.2 × 207.6** (1089 ×
    208.3) at radius 41 and padding 31.2, 13 apart (13.1); badge **60.8 × 15** (60.7 × 14.8);
    pills **113.1 × 44.3** (114 × 44.3); includes at x 606.4 (606.8); foot 26 (26.2). Section
    875.9 against 1093 × 0.82 = 896.3.
  - **768**: intro at 92.2; capsule 163.8 × 34.8 (165 × 35); rows **708 × 232.8 / 232.8 /
    250.5** (233 / 233 / 251); badge 68.3 × 17 (70 × 17); pills 127.9 × 54 (128 × 54); includes at
    460 (460); foot 32 (32). Section 1014.2 against 1010.
  - **390**: rows **370 × 322.3 / 375.6 / 360.5** (350 × 322 / 390 / 360); pills 125 × 54 (125 ×
    54); the includes stacked under the pill. Section 1372.6 against 1419.
- **Named diffs, the twins'**:
  - the section's 768 and 390 tops are the shared `padY` 56 / 44, not 30 / 60, and the 390 foot
    `padY` 44 against 60 (JP-103's arm is desktop alone);
  - the seeded intro is the frame's second sentence (`PRICING_INTRO_3`, JP-070 (rest)), one line at
    1440 and 768 where the frame's two-sentence paragraph is two;
  - the capsule rests with no chip lit (JP-089 (rest)), where the frame lights *Duo* over all three
    rows;
  - the unit is `/event` (`tierUnit`) where the frame types "— £1,400";
  - the 390 rows are 370 wide against the frame's 350 (JP-038's `padX` 10 against the root's 20),
    so the second row's blurb holds one line (375.6 against 390);
  - Pop's rounded desktop tokens (`list` 16 against 16.4, `bodyMd` 11 against 11.48).
- **Lime on lime, followed** (Grunge's red-on-red precedent): the badge's `box/1` `#D7FF23` on the
  row's `#C6F200` is **1.13 : 1**, so the tile all but vanishes and the word does the work (violet
  on `#D7FF23`, 5.31 : 1). The frame draws exactly that; nothing is overridden. Open question 16.
  The plain rows' lime ring on white (1.3 : 1) is the frame's too, as is the featured pill's lime
  label on pink (2.62 : 1).
- **`live=1`** (puppeteer, trusted clicks, desktop and 390):
  - every chip hit-tests to itself and lights pink lettered white, the idle labels violet;
    **the FEATURED seat follows the filter** — Duo seats The Wedding Set, Trio and Band The
    Festival Set, a second Band press clears to all three with The Festival Set — lime ringed
    pink wherever it lands on the white page, the plain rows white ringed lime;
  - **JP-048** (`&cj=`, `TIERS_3` with The Festival Set ticked plus a name-only *The Late Set*):
    FEATURED stays on The Festival Set; Duo moves it to The Wedding Set. Without the tick The Late
    Set takes it;
  - `n=0` prints *No packages yet.* violet in a lime ring (r41 / 50), no capsule; `n=1` seats
    nothing; `n=8` seats row 8, at three widths;
  - the pills are `<a href="#form">` live and spans on the canvas; the canvas chips carry
    `cursor: auto` and a click filters nothing;
  - no page error or warning; every root's `scrollWidth` is its width.
- **`FIELDS.pricing` has no template-keyed `in` row** (`heading` `[0, 1, 2]`, `intro` and `offer`
  `[2]`, `quote` `[1]`, `rowCta` `[0, 2, 3]`), so no `reach.mjs` run was owed — the twins' finding,
  re-checked.
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`** (a fresh `:5184`, both
  labels taken there, no one-row file in any). Theme 4 moved exactly **pricing arch 2 at three
  widths** on each surface: one row more (the ring overlay), the roots 905.3 → 875.9, 945.7 →
  1014.2 and 1274.6 → 1372.6.
- **In the builder** (`page-check.mjs Pop 2,0,1,3`, and a one-off probe of card 3's popup): four
  modal cards on every card, no console error or warning on any. Card 3's published 1440 tab
  stands pricing at **4634**, 1069 tall (875.9 × 1.22), under the gallery (4039 · 595) and over
  the map (5703). **JP-103's other half closes**: the lime band → the PRICING ink is **60** by a
  pixel scan (the frame's 56 + 3.1; it read `padY` 97.6 before), 58 at 768 and 47 at 390 (`padY`,
  the named diff). The three Book pills land on `#form`; Duo filters to two rows with FEATURED on
  The Wedding Set at 1440, 768 and 390; the root is white and ringed pink at each; no sideways
  scroll. The nav, every anchor and footer link (Pricing → `#pricing`) land; the player plays;
  the form refuses and composes; the 390 burger opens (1 → 5); `overflow390` 0. On the 1180
  canvas the pills are spans.
- **For the map**: its block (inside `EventsMap`'s `if (s.v2)`, after `litRow`) carries Grunge's
  `G` with Editorial's third arm and **Lime's one `ink` split five ways** (idle type, lit fill,
  the type on it, a box on it, its ink), so Pop is a fourth arm — read each against Pop's Scheme
  4, where `s.bg` is **blue**, `s.ac` (`text/1`) **teal** and `s.tx` (`text/2`) **yellow**. The
  band is the seat's (`G.sheet` undefined, the root paints blue); session 0 found the flat arm's
  sheet painting `pillBg` teal over it. **The lit row and *See all gigs* are Scheme 3 pills**
  (lime `text/1` fills, pink `sem/bg` type — trap 5, followed); the panel is `s.onScheme[3]`
  pink, and **its viewport inherits Scheme 3** (trap 4: pink rings, labels and centre disc,
  violet idle dots — Editorial's was the seat's 4). The head is `vm.title`, "Where I'm playing."
  — read its text style on the node before sizing it or choosing its lift (layout 2's *a plan's
  token for a string*), and scan it; the two unstyled Inter Bold 20s are the twins' hand-scaled
  instance.
- **For the sweep's CLAUDE.md pass**: CLAUDE.md names no layout-3 pricing colour. `notes/pricing.md`
  carries Pop's stack and now says the `vm.tierRow` walk at layout 3 is **Retro's alone** (written
  in this session's commit). The Retro fallthrough's own comments in `Pricing`'s `if (s.v2)` (the
  `h = s.tierRow` paragraph, "Lime drew pale lime on pale lime and Grunge white on white") describe
  a path Pop no longer reaches at layout 3. CONVENTIONS D3's pricing row gains a Pop column (a
  fourth `G` arm; Lime's box, the plain rows in `s.stroke2`; the featured pill's pair read off
  Scheme 2 as Editorial's off 3; the plain pill passed `s.ac`, `pillBg` being black), and C's
  *under Lime `pillBg` IS the accent* row (turned round again: black, so passed). Not written here.

### Settled in section 8 (the events map)

- **The block widened: `if (s.limeTree || s.pop)` inside `EventsMap`'s `if (s.v2)`, after
  `litRow`, `const pop = s.pop`, `S3` off `s.onScheme[3]` under `ed || pop`, and a fourth `G` arm
  written first**, the Lime, Grunge and Editorial arms byte-identical: Grunge's keys and
  Editorial's leaves read on Pop's schemes, plus **seven new leaves through `??`** (below) and a
  handful of `pop` sites — `disp()`'s uppercase, three lifts (`popLift`), the date disc's 2px
  ring. The walk (bindings with their collection, all three widths) found the twins' tree node
  for node, **141 / 142 / 83**, on **Scheme 4** with the lit row, *See all gigs* and
  `radius-map` **explicitly Scheme 3** and the `Map View Container` stating no mode, so the
  viewport **inherits 3** (trap 4); `resolvedVariableModes` Desktop / Tablet / Mobile, no effect
  on any node, **no raw paint** (every fill and stroke bound but the map texture `e089bd11`).
  `get_variable_defs` is the ramp (title 28 / 22 / 20, list 20 / 16 / 15, body-sm 12, body-md
  14 / 13 / 13, body-lg 16 / 15, label-xs 20 / 14 / 12, chip 12 / 11 / 11, eyebrow 15 / 12) plus
  `border/thin` 2 (the date discs' ring), so every size reads `s.*` but Display/Title, the literal
  `u(28)` / 22 / 20 (`G.title`; `vm.title` shadows the ramp). The hooks sit above the block, so
  the published filter, featuring, 390 pager, zoom, *See all gigs* and JP-106's pill needed
  nothing.
- **Under the Scheme 4 seat Grunge's split is the frame's** for the page side: idle type,
  the chips' and rows' hairlines and the date discs are `s.tx` yellow, `s.stroke1` teal and
  `s.box1` `#3F76FF`; the head and the venues bind `text/2`, the ink, so `head` and `venue` stay
  unset; the rows' foot rule is solid `stroke/1` (Lime's `hair` path, Editorial's dash unset);
  the band is the seat's (`G.sheet` undefined). **Lime's five-way `ink` split takes a sixth seat
  under Pop** (*Conventions*, the new bullet): the lit chip and the lit row stand on different
  schemes. The All chip fills Scheme 4's `text/1` teal lettered `sem/bg` blue (`chipLit` /
  `chipLitFg`, read `?? G.lit`), while `lit` / `litFg` stay the lit row's: Scheme 3's `text/1`
  lime under `sem/bg` pink type. On that row:
  - the row is ringed **2px `S3.stroke1` violet** INSIDE (`litRing`, `u(2)`: 1.6 on the canvas),
    padded Lime's 14 / 29 / 14 / 10 at radius 999, the place line Body/Eyebrow in pink;
  - its date disc **turns round** to Scheme 3's `box/1` `#FF63B8` in that violet ring
    (`litDisc`), lettered `text/1` lime (`litBoxFg`), where every twin keeps `mist` in both
    states; every idle disc is ringed **2px** in teal (`border/thin`, the twins' 1px hair);
  - its JP-106 pill fills `sem/bg` pink under `text/1` lime — the block's `G.litFg` / `G.lit`,
    already the frame's — but rings in the lit row's violet, not the hairline (`litRing`).
- ***See all gigs* is Scheme 3's pill**: `text/1` lime lettered and disced `sem/bg` pink round a
  lime arrow, `G.pillBg` / `G.pillFg` = `S3.ac` / `S3.bg` (`BookPill`'s Lime branch; `s.pillBg`
  is Scheme 4's teal, so passed — section 7's convention). Not lifted (`BookPill`'s label).
- **The panel is `S3`, Editorial's keys read on Pop's**: `box/1` `#FF63B8` for the card and the
  map container alike (`panel`, `mapBox` — one value, Lime's case), radius **50 / 30 / 30** and
  **25 / 20 / 20** (Lime's own numbers), padding 32 / 12 / 12·10; its type `text/2` violet
  (`panelInk`; *Updated* at the frame's own .6, the city .7); the status pill `sem/bg` pink
  lettered and dotted `text/1` lime (`statusBg` / `statusFg`); the container's ring, the data
  bar's rule and the zoom buttons' ring `stroke/1` violet (`hairP`); EXPAND VIEW's arrow `sem/bg`
  pink on the pink container — faint, the frame's own, followed as every twin's (`arrow`). The
  viewport's shape is the masters' **570 × 472, 315 × 521, 350 × 164** (`ratio`).
- **The viewport is Scheme 3, inherited** (trap 4): the rings, ring labels, centre disc and tail
  `sem/bg` pink (`acc`, at 1 / 1.5 / 2 and .3 / .5 / .8, the outer dashed 4, 4 — unchanged), and
  everything lettered inside it — the ring labels, the centre disc's 2px ring and glyph, the zoom
  buttons' glyphs — **Scheme 3's `text/2` violet** (`vpInk`), which every twin draws in the band's
  `ink` (right under theirs: Grunge's and Editorial's viewport letters what the band does). Here
  `ink` is the band's yellow, so the four sites read `G.vpInk ?? ink`. The zoom buttons are
  `box/2` `#F0138C` (`zoom`). **The frame's five dots are followed**: violet `text/2` at .6, which
  reads on the plate, layout 2's Pop reading (`dot` / `dotOp`). The plate stands a fifth time.
- **The lit pin is the lit row's own pair** (the one state no frame draws): lime `S3.ac` (`pin`,
  read `?? s.ac`, which is Scheme 4's teal) in a 2px violet `S3.stroke1` ring (`pinRing`) —
  Grunge's and Editorial's reading (the lit row's own fill), where layout 2's Pop took the centre
  marker's pair because that page has no lit row. Pictured lit over a pink ring at desktop and
  768: the violet ring parts it from the ring and from the pink centre marker.
- **The 390 pager's two arrows are unfilled**, ringed and lettered `text/1` teal (`pagerInk` =
  `s.ac`). `Pager`'s Pop arm fills its ends (`endBox: s.ac`), which made them teal discs round a
  teal arrow, so the block passes `endBox: 'transparent'` through a new `pagerBox` leaf, spread
  only where set, so the twins' `frame.lime` is unchanged (*Conventions*, the second new bullet).
- **The lifts, scanned** at DPR 4, each string drawn alone, against the frames'
  `absoluteRenderBounds` in token-em:
  - **Display/Title, lh 1.1** — the h2 and the panel's h3. The frame's floor is 0.276 / 0.263 /
    0.29 up the box (0.272 / 0.258 / 0.29 corrected for its whole-pixel line box — pricing's and
    "BOOK ME"'s figures to the thousandth). Titan sat **0.176 / 0.179 / 0.137**, so both take
    **`top: −0.1em`**: lifted, 0.274 / 0.277 / 0.235. The h3 replaces Editorial's `−0.055em` arm
    with Pop's.
  - **Display/List, lh 1.2** — the row venues, over their place line 3 below. The frame's floor
    is 0.34 / 0.309 / 0.323 and its cap top 0.14 / 0.175 / 0.157; Titan sat 0.247 / 0.247 / 0.25
    up and 0.234 / 0.234 / 0.233 down, **0.06–0.09em low at both ends**, so they take the
    measured **`top: −0.08em`**: lifted, 0.325 / 0.325 / 0.328 up, 0.156 down. Not layout 2's
    0.14 (a cap-top reading of the h2 and venues together), and not the repertoire's or pricing's
    "~1px low and left" (a title that stands alone or centred): this one stands over a line of
    type, Editorial's site rule.
  - **Titan's J clears**: `&cj=` with *Jumpin Jacks*, *Jam Jar Joinery* and *The Junction*,
    lifted, leaves 9.25–9.75px of blank between each venue's ink and its place line's at all
    three widths, J-less rows the same.
- **Measured against the masters' content edges** (harness; the frame × 0.82 in brackets):
  - **desktop**: root **662.3** (663.4); h2's unlifted box at 64.8 (64.8), 25.3 (25.4); chips at
    104.9 (105.0); rows **68.9** (68.9); discs 45.9 in a 1.6 ring; *See all gigs* 169.3 × 44.3
    (173.8 × 44.3); panel (614.6, 45.9) **519.5 × 570.5** (615, 45.9, 519.9 × 571.5), radius 41;
    status 82.3 × 19.8 at 72.1 (82 × 19.7 at 72.2); h3's unlifted box at 101.7 (101.7);
    container 467.1 × 423.8 (467.4 × 423.9) at 20.5; viewport **386.8** (387); zoom at (1070.2,
    471.3) (1070.9, 472.3); ring labels at 915.6 / 1053 (915.5 / 1052.9); bar 37 (36.9).
  - **768**: root 825.3 (827); h2 at 78.9 (79); chips 121 (121); rows 84; *See all gigs* 184.1 ×
    54 (186 × 54); panel (399, 56) 339 × 713.3; status 94.3 × 23 (95 × 23); h3 at 103 (103);
    container at 174.7 (175); viewport **315 × 521**, exact; zoom (680, 595.7) (680, 596); labels
    620 / 788.1 (620 / 787.5).
  - **390**: root 835.9 on the canvas, **874.7** live with a `today` (880); h2 at 82.8 (83); row
    84 / **122.8** with the pill (123); pager 181 × 54 (185 × 54); *See all gigs* 370 × 54 (370 ×
    54); panel 370 × 358.3 (360); viewport **350 × 164**, exact; bar 65.8 (67).
  - No root's `scrollWidth` exceeds its width.
- **Named diffs, the twins'**:
  - the chip row is Retro's normalisation (the lit *All* at Body/SM, 22.2 / 26.8 tall against
    the frame's Body/MD 25.4 / 30), so the list stands 3.2 higher;
  - the chips are the gigs' cities, the frame's six rows are our five gigs, the ↗ beside the
    venue is dropped (JP-045, re-asked by JP-106 and kept), and the day numerals are Label/XS
    throughout where the frame hand-sets Inter in four rows;
  - **768**: the frame's venues wrap beside the pill and *Tickets →* (HIDDEN / WAREHO / USE in
    an 89 box, rows 105 / 86 / 85 / 86 / 84 / 84); ours hold one line on the seed (no link, and
    no pill on the canvas), 84 each — the 768 section stays the panel's height either way; the
    data bar wraps the seeded "Based in Manchester · 5 pins · 120 mi radius" (61.6 against 45,
    the panel 713.3 against 697 — JP-105's named run, `base` the long part);
  - **390**: the pager's two pills sit `Pager`'s 8 apart (181 against the frame's flush 185);
    the frame's past row prints *Manchester · past* where ours keeps the hour (JP-106);
  - Pop's rounded desktop tokens (`list` 16 against 16.4).
- **`live=1`** (puppeteer, trusted clicks, 1440 and 390; probes in the scratchpad):
  - a row click features its gig and lights its row (Mint Lounge), a pin click does the same back
    (pin 2 → The Deaf Institute); the lit row is lime ringed violet with its pink disc, the lit
    pin lime 11.5 in its violet ring, the idle pins violet at .6;
  - the *Lake District · 1* chip lights teal lettered blue and filters to one row (no lit row,
    one pin), and *All* restores five with the pick kept;
  - two `+` clicks scale the layer to 1.5625, `−` back to 1.25;
  - the 390 arrows walk Hidden Warehouse → The Deaf Institute → Private wedding and back, the
    panel following;
  - `n=30`: *See all gigs* lists all 30 at 1440, 768 and 390, the pager gone;
  - `n=0` prints *No dates yet.* in both columns with no chips or pins; `n=1` draws no chip row
    and no lit row;
  - **JP-106's pill** at `today=2031-07-30` (two past, three upcoming), three widths: idle
    unfilled in a 1px teal ring under yellow, lit pink under lime in the violet ring, 78.2 × 24.8
    / 44.7 × 24.8 at 768 (78 × 25 / 46 × 25), the 768 lit row's pill standing where *Tickets →*
    would stack under it; `&cj=` links — one *Tickets →*, an `<a>` live and a span on the canvas,
    the refused `foo` none;
  - the canvas carries no link and no pointer but `BookPill`'s own; no page error or warning.
- **`FIELDS.map` has no template-keyed `in` row** (checked in Node: 25 rows, every `in` a flat
  array), so no `reach.mjs` run was owed — the twins' finding.
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`** (a fresh `:5185`, both
  labels taken there, no one-row file in any). Theme 4 moved exactly **map arch 2 at three
  widths** on each surface: four rows more a width, the roots 660.3 → 662.3, 824.7 → 825.3 and
  836.5 → 835.9.
- **In the builder** (`page-check.mjs Pop 2,0,1,3`): four modal cards on every card, no console
  error or warning on any. Card 3's published 1440 tab stands the map at **5703**, **808** tall
  (the frame's 809), under pricing (4634 · 1069) and over the form (6511); at 390 it is 875 (the
  tab reads today, so the pills draw; frame 880). The map's city chips and rows change state (the
  lit *All* and the lit first row idempotent), every nav link (Gigs → `#map`), anchor and footer
  link (Shows/Coverage → `#map`) lands, the player plays, the form refuses and composes, the 390
  burger opens (1 → 5), `overflow390` 0. **The seam clips are straight at 1440 and 390**:
  pricing's pink ring onto the blue band, the band onto the white form; the kicker stands 56 / 60
  under the band's top, the panel's foot 56 over its bottom — the roots' own insets, which the
  block writes out over a cancelled `padY` / `padX`, so `vm.pad` needed no map arm.
- **For the sweep's CLAUDE.md pass**: CLAUDE.md names no layout-3 map colour; its `s.live` list
  states no template for the layout-3 map. `notes/map.md`'s JP-106 pill sentence now names Pop's
  violet lit ring (written in this session's commit). CONVENTIONS D3's map row gains a Pop column
  (a fourth `G` arm; the split's sixth seat, `chipLit`; the lit row a nested Scheme 3 pill with its
  disc turned round; the viewport inheriting Scheme 3, `vpInk`; the rings kept; the plate sampled
  and kept), C's *Retro's live states vanish… redraw them* row (the lit pin, the lit row's pair)
  and *a twin's redrawn state is read against this frame* (the lit row, the frame's own,
  followed). Not written here.
- **For the form**: it stands on **Scheme 1, white, no band** (`SCHEMES_OF.Pop[2]` has no `form`
  entry) round a **nested Scheme 2 card** (634 × 373 / 708 × 354 / 370 × 349) — read whether it
  binds `box/1` `#D7FF23` or `sem/bg` before writing a key (layout 2's form card bound `box/1`;
  section 7's featured row bound `sem/bg`). Its block is **`if (s.limeTree)` inside `EnquiryForm`'s
  `if (s.v2)`, after `up`**, with no `G` (Grunge's section 9; Editorial's arms are `ed`), so
  expect `pop` arms and a `G` only if the leaves pile up. **`vm.pad`'s `d === 2` form /
  testimonials arm names Lime, Grunge and Editorial**: Pop joins for `cat === 'form'` alone, the
  composed row's precedent, until the testimonials close the pair — measure the root's 90 / 60
  foot first. The head is pink at Display/LG, `formHeading3()`'s "Book Kai Mercer for your
  event", on `vm.titleWordEms` (Pop's `titanEms` already) — read its text style on the node and
  scan its lift (Editorial's form head took one over its prose). **The submit pill**: the card is
  a nested Scheme 2 node on a Scheme 1 section, so `BookPill`'s default `pillBg` is Scheme 1's
  **black** there, not Scheme 2's pink (section 7's convention). The plan's table reads it
  `text/1` pink round `sem/bg` lime, Scheme 2's own pair — read the binding and pass it (`S2.ac`
  / `S2.bg`, as *See all gigs* passes `S3`'s here). The four label-in-box inputs keep
  `--ph: 1` (JP-093); the refused box's colour is a state no frame draws, checked against the
  lime card (CONVENTIONS C).

### Settled in section 9 (the enquiry form)

- **The block widened: `if (s.limeTree || s.pop)` inside `EnquiryForm`'s `if (s.v2)`, after
  `up`, `const pop = s.pop`, `const card = pop ? s.onScheme[2] : s`, and no `G`** — Grunge's
  section 9 and Editorial's again: a handful of `pop` arms, and the card's leaves read `card.*`
  (*Conventions*, the new bullet), which is `s` under the twins, so their values are
  byte-identical. The walk (bindings with their collection, all three widths) found the
  twins' tree node for node, **27 / 27 / 27**, and the paired traversal-order diff against
  Lime's (`964:68682` / `984:10767` / `984:10798`) returned **leaves alone**: the ramp, the face
  and the boxes' 42 / 38 / 37 (Lime 44 / 39 / 37) — every inset, gap, radius, ring weight and
  letter-spacing Lime's. **Scheme 1 on the root at every width** (explicit at 1440, inherited
  narrow), `resolvedVariableModes` Desktop / Tablet / Mobile, the card **explicitly Scheme 2**
  at every width, no effect and no rotation on any node, **every paint bound**.
  `get_variable_defs` is the ramp (display-lg 82 / 51 / 36, title 28 / 22 / 20, label-sm
  16 / 13 / 12, list 20 / 16 / 15, body-md 14 / 13 / 13, body-sm 12, chip 12 / 11 / 11) plus
  `border/hairline` 1 and the card's `sem/box/1` / `sem/stroke/1` in one mixed list, so every
  size is `s.*` but Display/Title, the literal `u(28)` / 22 / 20 (`vm.title` shadows the ramp).
  The hooks sit above the branch, so the published boxes, submit, sent card and *Write another*
  needed nothing.
- **The card binds `box/1`, not `sem/bg`** — the question the plan asked: `#D7FF23`, layout 2's
  form card again (pricing's featured row was the `sem/bg` one). So the card and each box are
  `card.box1` in a 1px `card.stroke1` **violet** ring, inset, at radius 50 (Lime's `u(50)`, 41
  on the canvas) and `radius/pill`; the box labels, the unit, the count, the note and the
  prompt `card.tx` violet; the price, the stars and the sent card's title `card.ac` pink. Each
  ink is the same hex as Scheme 1's (`text/1` / `text/2`) and is read through the card all the
  same. The head column is Scheme 1's own: the eyebrow (Body/Chip) and paragraph `text/2`
  `s.tx`, the head `text/1` `s.ac`, Lime's keys unchanged. The section's ground is the root's
  `s.bg` white — no band, no sheet, no flag.
- **The submit is not `BookPill`** — a correction to the plan's premise. The layout-3 block
  draws its own `pill()` on `background: s.ac, color: s.bg` and a `disc` on `s.bg` / `s.ac`, so
  the trap was **`s.bg`, Scheme 1's white**, not `pillBg`'s black: the frame binds the fill and
  the arrow `text/1` pink and the label and the disc `sem/bg` **`#C6F200`**, Scheme 2's own
  ground — one shade off the card's `#D7FF23`, both bound, both drawn (layout 2's two limes).
  `card.ac` / `card.bg` on both. The pill's 67 radius is `s.btnR` (999), its 5 / 5 / 5 / 21 and
  the 46 × 44 disc Lime's.
- **The refused box is 2px of the card's pink** (`pop ? card.ac : card.tx`). The idle ring is
  1px of full violet, so the twins' 2px of `s.tx` would have been weight alone (CONVENTIONS C);
  layout 2's Pop call on the same card, colour and weight at once. No frame draws it; it reads
  on the lime card (pictured at 1440 and 390, every box ringed, the heights unchanged).
- **The lifts, scanned**:
  - **the head** (Display/LG, lh 0.89, over prose), drawn alone at DPR 4: the frame's
    `absoluteRenderBounds` ink 0.015 / 0.024 / 0.016 token-em above the box's top and 0.185 /
    0.186 / 0.184 above its foot — the media, repertoire and gallery heads' figures. Unlifted,
    Titan sat **0.130 / 0.118 / 0.125** below the top and **0.050 / 0.064 / 0.050** above the
    foot, 0.12–0.145 low at both ends, so **`top: −0.14em`** under `pop`: lifted, −0.007 /
    −0.019 / −0.012 and 0.187 / 0.201 / 0.187. The ink gap from the head's floor to the
    paragraph's cap is then **32 / 34.5 / 30.5** against the frame's 33.4 / 34.7 / 31.9; with a
    J on the last line (`&cj=` *Join the jam in June*) it clears by 24.5 / 27 / 26, and the
    lines' own Js stand 2–3.5 apart at lh 0.89, the tight line box's, not the lift's
    (Editorial's finding);
  - **the price row** (Editorial's *a baseline-aligned row lifts as one*): the shared baseline,
    read off a zero-size inline-block marker, stood **0.913 / 0.909 / 0.95** of the price
    below the row's top, where the frame's stands **≈ 0.816 / 0.807 / 0.79** (off Inter's
    metrics in the unit's box and off Chunko's 0.72 digit height under the price's ink top,
    which agree to 0.15px). So the **row** is lifted **0.1em of the price**, Titan's
    Display/Title number, only when a price prints: the baseline then stands **41.70 / 45.81 /
    45.00** below the card's top against the frame's 41.70 / 45.85 / 43.85 — exact at 1440 and
    768, 1.2px low at 390, "BOOK ME"'s Blink whole-pixel residue at 20px;
  - **not lifted**: the box labels (live they are the placeholder, JP-093's agreement), the
    pill's label (every Pop pill label's state) and the Inter eyebrow.
- **The head needs no fit and keeps it**: `vm.titleWordEms` is Pop's at every design, so the
  block's desktop fit runs — MERCER, the widest seeded word, never bites (the ramp's 65.66px
  in the **519.5** half column). *Supercalifragilisticexpialidocious* sets at **24.5px** (13.5
  short of the column) and *Maximilian Featherstonehaugh* at **44.1px** (12.1 short),
  `min(ramp, column ÷ ems) × 0.98`; *Florence and the Machine* keeps the ramp on five lines. At
  768 and 390 the fit does not run, so a long one-word name breaks inside itself (the 34-letter
  word at both, FEATHERSTONEHAUGH at 390) — the block's shared `overflowWrap`, which JP-102's
  reply names for every template. Every root's `scrollWidth` is its width.
- **`vm.pad`'s layout-3 form / testimonials arm takes Pop's form alone**: `|| (T.name === 'Pop'
  && cat === 'form')`, the masters' 90 / 56 and 60 / 30 round the card (the taller half at
  1440, 373 against the head column's 240) — the twins' insets, so the foot is `u(90)` / 60 and
  390 keeps its `padY` 44. **The pair parts until section 10** (CONVENTIONS C, the composed row's
  rule).
- **Measured against the masters' content edges** (harness; the frame × 0.82 in brackets):
  - **desktop**: card (614.6, 80) **519.5 × 305.8** (615, 73.8, 519.9 × 305.9), radius 41, ring
    1px violet; price row 23 into the card (23), 25.3 tall (25.3); boxes **34.4** on a 42.6
    pitch (34.44 / 42.64), 480.1 wide (480.5); pill **44.3** (44.3) on a 37.7 × 36.1 disc (37.7 ×
    36.1); foot **74** (73.8). The head column (238.2: eyebrow, the h2's three lines 178.9
    tall at 65.66px, the paragraph's one) centres on the card (232.9 both). Root **459.8**
    against 453.5 — `padY` 80 on top against 73.8.
  - **768**: eyebrow at 56 (60), h2 at 87 (91) on two lines, **90.8** (90); paragraph 197.8
    (201); card at 249.3 (253), **708 × 354.4** (354); boxes 38 on 48; pill 54 on a 46 × 44
    disc; foot 60 (60). Root 663.7 against 667.
  - **390**: h2 at 75 on two lines, **64.1** (64); paragraph two lines; card **370 × 350.4**
    (349) at 230.1 (277 − 46); boxes 37 on 47; pill 54. Root 624.5 against 716, `padY` 44
    against the frame's 60 + 30 at both ends.
- **Named diffs, the twins'**:
  - the seeded head (`formHeading3()`, JP-070) *Book Kai Mercer for your event* sets **three
    lines at 1440** (BOOK KAI / MERCER FOR / YOUR EVENT) and two at 768 and 390, where the
    frame's *Book Kai for your event* is two at each; at 1440 the head column (238) stays the
    shorter half, so the frame's composition holds — the card the taller, the head centred on
    it (JP-103 (form)'s reply A: the card is not aligned to the head's foot);
  - the seeded paragraph is the twins' shorter one (one line at 1440 and 768, two at 390) where
    the frame's runs two, one and two;
  - the top inset is `padY` 80 / 56 / 44 against the frame's 90 / 60 / 90, and the 390 foot 44
    against 90;
  - the 390 card is 1.4 taller (350.4 against 349), layout 2's same card's same 1.4;
  - Pop's rounded desktop tokens (`dispLg` 67 against 67.24, `list` 16 against 16.4, `bodyMd`
    11 against 11.48);
  - a long one-word name breaks inside itself at 768 and 390 (above).
- **`live=1`** (puppeteer, trusted clicks and typing, three widths; a capture-phase
  `preventDefault` on the mailto):
  - every placeholder reads `--ph` **1** in violet at full opacity, `type=email` on the third;
  - an empty submit rings all three boxes in **2px pink** at unchanged heights (34.4 / 38 / 37)
    and prints *Add the missing details and try again.* in violet; typing into the first clears
    its ring alone;
  - the filled submit composes `mailto:bookings@kaimercer.co.uk?subject=Enquiry&body=Event
    date: 12/06/2027 / Event type: Wedding / Your email: jo@example.com` — the bare *Enquiry*;
  - its click swaps in the sent card (CHECK YOUR MAIL APP pink, uppercased by `disp()`, the
    address in plain text, WRITE ANOTHER the pink pill); *Write another* restores the three
    values;
  - every box hit-tests to itself; the canvas has no input, no anchor and no pointer cursor; no
    page error or warning. (The pill's dimmed look under the cursor is the global
    `a:hover { opacity: .72 }`, every template's.)
  - `n=0` is the card's price, stars, pill and note (178.1 / 210.4 / 209.4); `n=8` grows it
    (518.7 / 594.4 / 585.4), nothing overflowing. The layout-3 form draws no photograph, so
    `&noimage=1` is inert here.
- **`FIELDS.form` moves nothing**: every `in` row is a flat array (checked in Node: 20 rows, no
  template-keyed one), and the block reads the twins' keys (`available`, `heading`, `para`,
  `price`, `priceUnit`, `bookings`, `fields`, `cta`, `note`), each already `in` design 2 — so no
  `reach.mjs` run was owed.
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`** (a fresh `:5186`,
  both labels taken there, no one-row file in any). Theme 4 moved exactly **form arch 2 at three
  widths** on each surface, 24 rows each before and after, the roots 463.5 → 459.8, 674.7 →
  663.7 and 630.6 → 624.5. A form-only re-digest after the last (comment-only) edit matched
  byte for byte, 120 of 120.
- **In the builder** (`page-check.mjs Pop 2,0,1,3`): four modal cards on every card, no console
  error or warning on any. Card 3's published 1440 tab stands the form at **6511**, **561** tall
  (459.8 × 1.22; the frame's 553), under the map (5703 · 808) and over the testimonials (7073);
  its boxes 42 in the violet hairline, refused in 2px pink, the mailto composed and the sent card
  swapped in. The nav (Book Now → `#form`), the calendar's and pricing's pills (→ `#form`) and
  every footer link (Enquiries → `#form`) land; the player plays; the 390 burger opens (1 → 5);
  `overflow390` 0. **The seam clips are straight at 1440 and 390**: the map's blue band onto the
  white form.
- **For the sweep's CLAUDE.md pass**: CLAUDE.md names no layout-3 form colour; JP-093's `--ph`
  sentence holds as written. `notes/form.md`'s layout-3 sentences now name Pop's card, pill and
  refusal and `vm.titleWordEms`' Pop reader (written in this session's commit, beside the
  `titleWordEms` comment in `sectionVm`). CONVENTIONS D3's form row gains a Pop column (no `G`;
  the card one alias on `s.onScheme[2]`; Grunge's 42 / 38 / 37; the fit kept, Titan's ems), C's
  *a refused box changes colour* (2px of the card's pink against the full violet hairline) and
  *the composed row's pad arm* (the inset pair, the form first). Not written here.
- **For the testimonials**: the block (inside `Testimonials`' `if (s.v2)`, after `template`)
  carries Grunge's `G` with Editorial's third arm — `REG`, `SEATS`, `card`, `cardFg`, `hair`,
  `lift`, `radius`, `pad`, `quote` — so Pop is a fourth arm, written first. The wall stands
  **six cells on six schemes** (trap 6): `rating` 3, the first `name-cell` 7, `quote-cell` 2
  (unringed), the second `name-cell` 4, `small-quote` 5, `feat-quote` 6 — a **six-entry `REG`
  written fresh in Retro's `SEATS` order** off each cell's own `explicitVariableModes`, never a
  remap of a twin's; read whether each cell binds `box/1` or `sem/bg` (the Scheme 2 cell is the
  third Scheme 2 card of the pass). The head is `text/2` violet at **Display/MD** 45 / 36 / 28
  (read its text style on the node); the rating's numeral `text/1` lime at Display/MD; the
  quotes **Label/LG** 24 / 16 / 14 in `text/2` (`text/1` in `quote-cell` and `small-quote`);
  the discs `text/1` ringed `stroke/1`, lettered `sem/bg`. `HEADING_3`'s "Experiences." breaks
  inside the word in the frame's capped 306 box at 1440 (open question 5) — the twins' dropped
  cap stays dropped. **`vm.pad`'s form / testimonials arm folds back into one condition** once
  the roots' 56 · 30 / 30 / 56 / 30 are measured (the twins' numbers by the planning read).

### Settled in section 10 (the testimonials)

- **The block widened: `if (s.limeTree || s.pop)` inside `Testimonials`' `if (s.v2)`, after
  `template`, `const pop = s.pop`, `S3` off `s.onScheme[3]` under `ed || pop`, and a fourth `G`
  arm written first**, the Lime, Grunge and Editorial arms byte-identical: Editorial's keys read
  on Pop's schemes (no new leaf), a `popReg(n, ink)` helper for the register, and a handful of
  `pop` sites — `disp()`'s and the face stack's uppercase, the unringed seat, four lifts. The
  walk (bindings with their collection, all three widths) found the twins' tree node for node,
  **44 = 44 = 44** against both, and the paired traversal-order diff returned **leaves alone**:
  the ramp, Lime's corner **50** on Grunge's **solid** 1px INSIDE rings (Editorial's are square
  and dashed), and Editorial's **24** padding (28 on `quote-cell` and `feat-quote`, each row's
  last cell — the twins' majority call, taken again); every gap, inset, disc and seat (the
  14 / 16 / 24 gaps, the 56 and 24 discs at −8, the 275 / 276 seats) the twins'. **Scheme 1 on
  the root, every cell on its own scheme at every width** — `rating` 3, then 7 / 2 / 4 / 5 / 6
  (`explicitVariableModes`); `resolvedVariableModes` Desktop / Tablet / Mobile; no effect, no
  rotation, **every paint bound** but the four face photographs. `get_variable_defs` is the
  ramp (display-md 45 / 36 / 28, label-lg 24 / 16 / 14, list 20 / 16 / 15, body-lg 16 / 15 /
  15, body-md 14 / 13 / 13, body-sm 12), so every size reads `s.*`. The section has no control,
  so `live=1` is byte-identical to the canvas.
- **Five registers, not six — a correction to the plan's count** (the new *Conventions*
  bullet). Trap 6's "six-entry `REG`" counted the stat card, which every twin reads through
  `card` / `cardFg` / `num` / `hair` / `lift`, so the arm is **five registers in Retro's seat
  order, `SEATS` the identity** — `popReg(7, 'tx')`, `popReg(2, 'ac')`, `popReg(4, 'tx')`,
  `popReg(5, 'ac')`, `popReg(6, 'tx')` — each `box/1` (coral `#FF5A5A`, lime `#D7FF23`, blue
  `#3F76FF`, teal `#14F4D8`, violet `#8451FA`) ringed 1px in its `stroke/1` (lime, —, teal,
  violet, lime), its 56 disc `text/1` lettered `sem/bg` in that ring (Editorial's mapping:
  lime lettered `#FF1A1A`, teal lettered `#2563FF` on the two name-cells), checked in Node off
  `THEMES[4].schemes`. Every value is a binding; no literal.
  - **The quote's ink is read per cell**: `text/2` on both name-cells and `feat-quote` (violet,
    yellow, pink), `text/1` on `quote-cell` and `small-quote` (pink, violet). The name and role
    take the cell's ink too, so each cell reads in one — the name-cells' own rule (quote, name
    and role all `text/2` there).
  - **`quote-cell` is the one bare seat** (`G.bare = 1`, Editorial's call, its mechanism
    reached through `cell(reg, { boxShadow: undefined })` since Pop's rings are a `boxShadow`,
    not `DashRule`): a lime card on the white page is parted by its fill.
  - **The frame draws no disc on seats 1, 3 or 4** (`quote-cell`, `small-quote`, `feat-quote`);
    the seed's named reviews there take the name-cells' bindings — pink lettered lime in a violet
    ring, violet lettered teal, lime lettered violet — Editorial's extrapolation, named.
- **The stat card is `S3`, Editorial's keys read on Pop's**: `box/1` pink `#FF63B8` in a 1px
  `stroke/1` violet ring (`card` / `hair`), its ink `text/2` violet (`/5`, `sub`, `brand`), the
  numeral and the stars `text/1` lime (`num`, through the block's `numInk`), the face stack's
  2px ring `box/2` `#F0138C` (`lift`). The stack keeps the block's invented pair, the page's
  `s.bg` lettered `s.ac` — white lettered pink — the twins' reading (the frame's faces are
  photographs).
- **The lifts, scanned** at DPR 4, each string drawn alone with flat-bottomed `&cj=` strings
  ("The beat held", "The beat held til late", "Hal Bett", rating "5.9"), against the frames'
  `absoluteRenderBounds` in token-em, corrected for Figma's whole-pixel line boxes:
  - **the head** (Display/MD, lh 1): the frame inks 0.046 / 0.04 / 0.04 below the box's top and
    floats 0.234 / 0.24 / 0.24 above its foot (EXPERIENCES.'s round glyphs; pricing's numeral's
    figures). Titan sat **0.19 / 0.181 / 0.188** down and **0.108 / 0.111 / 0.107** up, 0.13–0.15
    low at both ends, so **`top: −0.14em`**: lifted, 0.053 / 0.044 / 0.051 and 0.245 / 0.248 /
    0.244. It stands over the wall, not prose — Editorial's head was not lifted there — but
    every Pop head so far has taken the lift its scan showed, the gallery's over a grid among
    them;
  - **the numeral row** (Display/MD, lh 1, baseline-aligned with Inter's `/5`; Editorial's *a
    baseline-aligned row lifts as one*): "5.9" sat 0.102 / 0.104 / 0.098 up against 0.234 /
    0.24 / 0.24, the head's figures, so the **row** takes the head's lift, `calc(−0.14 ×
    faced(dispMd))` — 0.239 / 0.241 / 0.235 lifted;
  - **the quote and the disc's mark** (Label/LG, lh 1.1): the frame's flat `IK` reads top
    **0.10** and floor **0.30** at every width once its 26 / 18 / 15 boxes are corrected to
    26.4 / 17.6 / 15.4. Titan sat 0.254 / 0.172 / 0.214 down and 0.152 / 0.199 / 0.171 up,
    0.07–0.15 low, varying with Blink's per-size rounding; **`top: −0.12em`** splits it:
    floors 0.270 / 0.317 / 0.289, within 0.7px at every width. The mark sits 0.10 token-em
    above its disc's centre in the frame (−1.97 / −1.6 / −1.4px); Titan's sat +1.06 / +0.38 /
    0px, and lifted 0.12em inside a span (the disc does not move) it sits −1.95 / −1.63 /
    −1.0px;
  - **the name** (Display/List, lh 1.2, over its role 4 below): the frame's 0.15 / 0.181 /
    0.167 down and 0.34 / 0.309 / 0.323 up; Titan's 0.229 / 0.234 / 0.233 and 0.256 / 0.263 /
    0.267, 0.05–0.08 low — the map's venues' case, **`top: −0.08em`**: 0.151 / 0.156 / 0.155
    and 0.334 / 0.341 / 0.345;
  - **not lifted**: the Inter strings, and the face stack's 11px marks (no frame glyph, the
    twins' rule).
- **`vm.pad`'s layout-3 form / testimonials arm is one condition again**: the three roots pad
  **56 / 56 / 56 / 56**, **30 / 30 / 56 / 30** and 30 / 10 / 60 / 10 — the twins' to the pixel
  — so the arm is `(Lime || Grunge || Editorial || Pop) && (form || testimonials)`, 390 keeping
  `padY` 44. **The inset pair closes**, as the composed row closed at the calendar.
- **Measured against the masters' content edges** (harness; the frame × 0.82 in brackets):
  - **desktop**: eyebrow at 45.9 (45.9); h2's unlifted box at 60 (59.9), 37 tall (36.9) at
    36.26px; grid at **116.7** against 153.3 (the frame's second head line, below); columns
    **225.5** / 418.3 / 418.3 and 417.8 / 417.9 / **226.3** (225.5 / 418.6 · 226.3); cells radius
    41, padding 19.7 (19.7), discs 45.9 (45.9), the quote at 19.6px, names 15.68px; the numeral
    box at 19.7 into the card (19.7) unlifted, `/5` 3.3 after it; faces 19.7 (19.7); rows 188.7 /
    210.7 against 217.7; foot 46 (45.9). Root **575.2** against 647.8.
  - **768**: eyebrow 30 (30), h2 at 46.8 (47) 36 tall (36); grid at 106.8 (107); columns
    **275** / 200.5 / 200.5 and 200 / 200 / **276**, exact; radius 50, padding 24, discs 56;
    rows 276.8 / 242.4 against 298; foot 56. Root **697.9** against 775.
  - **390**: h2 at 60.8 against 47 (`padY` 44 against 30); six stacked cells 370 wide, the stat
    card 211.3 (189), the name-cells 201.6 (the frame's 201); root **1440.6** against 1050.
- **Named diffs, the twins'**:
  - the head is one line where the frame's capped 306 box breaks EXPERIENC / ES. at 1440 (open
    question 5; the twins' dropped cap), so the 1440 wall stands 36.6 higher;
  - the rows are **content-tall** where the frame's are residues of a stated 790 / 775, so they
    run short at 1440 and 768;
  - **the 390 section's 1440.6 is the seed**: five named reviews, each a ~200-tall name-cell,
    where the master fills three of its five seats with bare quotes 63–86 tall;
  - the numeral is `rating`'s 4.9 where the frame types 5.9 (JP-065's typo, Editorial's);
    the faces are initials, not photographs, and the `®` stays out;
  - `quote-cell` and `feat-quote` pad 24 against the frame's 28;
  - Pop's rounded desktop tokens (`dispMd` 37 against 36.9, `labelLg` 20 against 19.68, `list`
    16 against 16.4);
  - the stat card's `/5` row stands 1.5 deeper than the frame's (Inter's 1.5 line box under a
    shallower Titan baseline), so `sub` sits 71.3 into the card against 69.7.
- **The pass's low-contrast pairs, all the frame's** (open question 18): `feat-quote` letters
  its quote `text/2` pink on its violet `box/1`, **1.35 : 1**, and the seed's named review there
  carries its name and role in the same ink at 15.7 / 10px on the canvas (the extrapolation,
  its role all but gone); the coral name-cell's violet is 2.0 : 1, the stat card's lime numeral on pink 2.1 : 1.
  Followed, Grunge's red-on-red and section 7's lime-on-lime precedent.
- **States** (`live=1`, three widths): `n=0` keeps the stat card at *4.9 /5* with no stack beside
  a coral *No reviews yet.* cell in violet — the name-cell's own pair, the frame's at 12px for
  its role, followed; `n=1` fills row 0; `n=8` gives row 1 the 276 seat and row 2 three equal
  fills, the seats cycling coral / lime bare / blue / teal / violet / coral / lime bare / blue,
  review 5 (no `who`, no `role`) collapsing to the frame's quote-only `feat-quote`, pink on
  violet, and the stack marking the named seven; an emptied `rating` prints *5 reviews*, an
  emptied `stars` drops the stars, a 42-character unbroken rating wraps inside the card, a
  34-letter word in a quote and *Maximilian Featherstonehaugh* stay inside their cell, an
  emptied heading drops the h2. Every text `Range` inside its cell, every root's `scrollWidth` its width, no
  pointer cursor, no anchor.
- **`FIELDS.testimonials` has no template-keyed `in` row** (checked in Node: `kicker` `[1, 2]`,
  `heading` `[1, 2, 3]`, `sub` `[1, 2]`, `rating` `[2]`, `stars` `[1, 2]`, `cta` `[1]`, `quotes`
  every layout), and the block reads the twins' keys alone, so no `reach.mjs` run was owed.
- **Digest: themes 0, 1, 2 and 3 zero files of 660, canvas and `live=1`** (a fresh `:5187`, both
  labels taken there, no one-row file in any). Theme 4 moved exactly **testimonials arch 2 at
  three widths** on each surface, the live files byte-identical to the canvas ones: five rows
  more a width (the disc marks' spans), the roots 683.2 → 575.2, 744.3 → 697.9 and 1516.6 →
  1440.6. A testimonials-only re-digest after the last (comment-only) edit matched 120 of 120.
- **In the builder** (`page-check.mjs Pop 2,0,1,3`): four modal cards on every card, no console
  error or warning on any. Card 3's published 1440 tab stands the wall at **7073**, **702** tall
  (575.2 × 1.22), under the form (6511 · 561) and over the footer (7775); at 390 it is 1441.
  `controls.testimonials` is empty (the wall pages nothing); the nav, every anchor and footer
  link (Reviews → `#testimonials`) land; the player plays; the form refuses and composes; the 390
  burger opens (1 → 5); `overflow390` 0. **The seam clips are straight at 1440 and 390**: the
  white form on into the white wall, and the wall onto the pink footer.
- **For the sweep's CLAUDE.md pass**: nothing owed — CLAUDE.md's and `notes/testimonials.md`'s
  layout-3 paragraph ("**Layout 3 is a bento wall and the one design here that pages
  nothing**") names no template's colours, radii or seats, the twins' finding. The `vm.pad`
  comment is written. CONVENTIONS: D3's testimonials row gains a Pop column (a fourth `G` arm;
  five registers, one to a seat, the quote's ink read per cell; `quote-cell` left bare,
  Editorial's call; Lime's 50 on solid rings with Editorial's 24); C's *the composed row's pad
  arm* (Pop: the inset pair closed by the testimonials); C's *a twin's redrawn state is read
  against this frame* (the bare seat); B's lift row (Label/LG at lh 1.1, 0.12em); A's *read
  every nested node's scheme off the master* (six cells on six schemes). Not written here.
- **This was the last section.** The footer is layout 1's and closed at planning time, so the
  next session is the end-of-pass sweep.

### Inherited and used

*(The running list the sweep folds into [`../CONVENTIONS.md`](../CONVENTIONS.md): each time a
session leans on a bullet from Pop's layout 1 or 2, Editorial's, Lime's, Grunge's or Retro's
Conventions, name it here in one line, with the plan it came from, a blank line between sessions.)*

- Session 0: *the digest is committed* (lime/layout-1) — 660 renders a label, five themes, canvas
  and live; *a section's colour scheme is resolved in `sectionVm`* (editorial/layout-1) and *a card
  on another scheme reads that scheme's keys* (editorial/layout-2) — row 2 and `pageBg` round the
  calendar's card and the 1440 header's, data only.

- Section 1: *a node can name another scheme's variable outright* (editorial/layout-3) — the well's,
  capsule's and card's rings and the chips on `s.onScheme[1]` under the Scheme 6 seat; *a widened
  block can need no `G`* (grunge/layout-3); *the node walker* and *read a scheme per master*
  (the root 1 / 6 / 6, the card 6); *a frame's inside stroke is an inset `boxShadow`, on an
  overlay* (lime/layout-2) — the 8 / 8 / 2 well ring and the portrait's 4px; *`vm.title` shadows
  the ramp* (lime/layout-1) — the card name's 28 / 22 / 20; *a stand-in face's glyph floor is
  measured per site* (editorial/layout-3) — the title 0.14em, the card's name 0.1em, the location
  left; *a twin's frame-less control is checked against its own surround* (editorial/layout-3) —
  the burger's panel; *an empty slot … takes the frame's own ground* (`&noimage=1`, the well's
  `box/2`); *field reach is measured* — `reach.mjs 4`; *the whole-page published check* —
  `page-check.mjs Pop 2,0,1,3`.

- Section 2: *the first layout-3 block inside a section, ahead of `Bio`'s `if (s.v2)`* (D3,
  lime/layout-3) — widened, no `G`; *a widened block can need no `G`* (grunge/layout-3); *read a
  fill's `scaleMode` … correlate the render* (grunge/layout-2) and *a `CROP` transform does not
  adapt when an instance is resized* (grunge/layout-3) — 10% / 7.5% / centred; *place a seal by
  its disc's centre* and *measure anything under `.seal-spin` with the animation stopped*
  (lime/layout-1) — the corner seat, reduced motion on every shot; *a rotated group's metadata is a
  bounding box* (memory) — the seal and the sparkle seated off `absoluteTransform`; *icons and
  stickers are transcribed off the node's own geometry* (lime/layout-1) — and found already
  transcribed, the scribble at 0.3455 and the sparkle verbatim; *a leak that shows and reads as a
  defect is overridden* (grunge/layout-1) — the 768 seal; *a stated list height is a column
  minimum* (lime/layout-1) — the about band's 253 / 283; *a stand-in face's glyph floor is
  measured per site* (editorial/layout-3) — the h2 and the name, 0.14em; *a head that must fit
  its measure is fitted to its widest word* (lime/layout-3, D3) — the name's `cardNameEms`; *an
  empty slot whose well `s.muted` does not read takes `Photo`'s `ink`* (editorial/layout-2) —
  white on black; *the composed row's pad arm moves per section* (grunge/layout-3) — the bio
  first; *`preview.jsx` takes `&column=`* (D3); *field reach is measured* — a bio-only
  `reach.mjs 4`.

- Section 3: *the first layout-3 block inside a branch, after `nHot`* (D3, lime/layout-3) —
  widened, a fourth `G` arm; *the `G` lookup at the block's head* (grunge/layout-1) — Pop's arm
  first, the twins' byte-identical; *a card on another scheme is that scheme's binding, not always
  its ground* (pop/layout-2) — the card's `box/1`, and the disc's; *a node can name another
  scheme's variable outright* (editorial/layout-3) — the discs' `scheme/1/stroke/2`; *read a scheme
  per master* and *the node walker* (the card 2, the rows 3 / 4 / 5 / 7 / 8 at every width); *a
  frame's inside stroke is an inset `boxShadow`, on an overlay* (lime/layout-2) — the rows' and
  discs' 4px; *rows pin at each master's division result* (D2, lime/layout-2's repertoire) — turned
  on a list after *a stated list height is a column minimum* (lime/layout-1) failed at `n=1`; *the
  heading's measure is the frame's own 632 box* (D3) at 1440 and 768, Editorial's reading; *a
  stand-in face's glyph floor is measured per site* (editorial/layout-3) — 0.14em; *`vm.title`
  shadows the ramp* (lime/layout-1) — Display/Title 28 / 22 / 20; *the composed row's pad arm moves
  per section* (grunge/layout-3) — media second; *field reach is measured* — a media-only
  `reach.mjs`; *the whole-page published check* — `page-check.mjs Pop 2,0,1,3`.

- Section 4: *after `arrow`, the seat layouts 1 and 2 used* (D3, lime/layout-3) — widened, a fourth
  `G` arm; *seat the schemes by rendered place, not by index* (D3) — `s.onScheme[2]` / `[3]` /
  `[4]`, the pink card centred; *the `G` lookup at the block's head* (grunge/layout-1) — Pop's arm
  first, `ringW` falling back to the twins' literal; *a nested node or a card on another scheme
  reads that scheme's keys* (editorial/layout-2) — every leaf off the card's own scheme; *read
  every nested node's scheme off the master* (grunge/layout-3) — 2 / 3 / 4 at every width; *a
  frame's inside stroke is an inset `boxShadow`* (lime/layout-2) — the 4px ring; *rows pin at each
  master's division result* (D2, Retro's rule) — 50.25 / 57.5 / 57.5; *a stand-in face's glyph
  floor is measured per site* (editorial/layout-3) — the head, 0.14em; *a twin's width-bound call
  is re-measured in the new face* (editorial/layout-2) — JP-104's clamp, the 768 wraps; *the
  whole-page published check* — `page-check.mjs Pop 2,0,1,3`.

- Section 5: *after `line`* (D3, lime/layout-3) — widened, no `G`; *a widened block can need no
  `G`* (grunge/layout-3) — Editorial's shape again; *a card on another scheme is that scheme's
  binding, not always its ground* (pop/layout-2) — the card's `box/1` met by Lime's `s.box1`, the
  pill's label and disc `sem/bg`, so `fg` dropped; *a nested node or a card on another scheme
  reads that scheme's keys* (editorial/layout-2) — seated on 2, `cardOnPage` round it; *read
  every nested node's scheme off the master* (grunge/layout-3) — the pill's Scheme 2, Lime's,
  where Editorial's turned to 1; *a frame's inside stroke is an inset `boxShadow`*
  (lime/layout-2) — the 4px ring and the dots' 2px; *a stand-in face's glyph floor is measured
  per site* (editorial/layout-3) — the numeral and month 0.14em, "BOOK ME" 0.1em, the pill's
  label left; *`vm.title` shadows the ramp* (lime/layout-1) — Display/Title 28 / 22 / 20; *the
  composed row's pad arm moves per section* (grunge/layout-3) — closed by the calendar; *a
  twin's width-bound call is re-measured in the new face* (editorial/layout-2) — JP-063's head
  fit with the longest months; *field reach is measured* — a calendar-only `reach.mjs`; *the
  whole-page published check* — `page-check.mjs Pop 2,0,1,3`.

- Section 6: *no block: ternaries through `Gallery`'s `if (s.v2)`* (D3, lime/layout-3) — eleven
  sites under `pop`, the twins' arms byte-identical; *the tile ratio is re-derived, not
  inherited* (D3) — 326 / 185.333 and 111.333 / 83.75; *the viewer is re-inked, not
  restructured* (D3) and *a twin's frame-less control is checked against its own surround*
  (editorial/layout-3) — black at .94, pink controls; *a node can name another scheme's
  variable outright* (editorial/layout-3) — the ring's `scheme/1/stroke/2` under the Scheme 2
  seat; *a Lime block paints its ground from Scheme 1 keys* (editorial/layout-4) — the sheet the
  seat's `s.bg`; *a frame's inside stroke is an inset `boxShadow`, on an overlay*
  (lime/layout-2) and *Pop's rings are thick* (pop/layout-2) — the 5px ring over the
  photograph, never a border; *an empty slot … takes `Photo`'s `ink`* (C) — black `text/3` on
  the olive well; *a seeded page cannot show an empty slot* — `&n=0`, `&noimage=1` inert; *a
  stand-in face's glyph floor is measured per site* (editorial/layout-3) — the head 0.14em;
  *the node walker* and *the paired diff walk* (A) — 17 / 17 / 17; *the whole-page published
  check* — `page-check.mjs Pop 2,0,1,3`.

- Section 7: *after `shown`* (D3, lime/layout-3) — widened, a fourth `G` arm; *the `G` lookup at
  the block's head* (grunge/layout-1) — Pop's arm first, `pillBg` falling back through `??`; *a
  card on another scheme is that scheme's binding, not always its ground* (pop/layout-2) — read
  and turned round: the featured row binds `sem/bg`, the badge `box/1`; *a nested node or a card
  on another scheme reads that scheme's keys* (editorial/layout-2) — the seat on `s.onScheme[2]`,
  Editorial's arm key for key; *read every nested node's scheme off the master* (grunge/layout-3)
  — Scheme 2 at every width; *under Lime `pillBg` IS the accent* (C) — turned round: black on
  Scheme 1, so the plain pill passes `s.ac`; *a frame's inside stroke is an inset `boxShadow`*
  (lime/layout-2) — the rows' 1px and the root's overlay at every width; *a stand-in face's glyph
  floor is measured per site* (editorial/layout-3) — the heading 0.1em, the numeral 0.14em
  against its `£` (*a numeral beside a bottom-aligned Inter glyph*), the names left; *`vm.title`
  shadows the ramp* (lime/layout-1) — Display/Title 28 / 22 / 20; *a twin's redrawn state is read
  against this frame* (C) — the capsule's pick, the twins' binding; *a twin's frame-less control
  is checked against its own surround* (editorial/layout-3) — the moving seat and *No packages
  yet.*, which needed nothing; *the whole-page published check* — `page-check.mjs Pop 2,0,1,3`.

- Section 8: *after `litRow`* (D3, lime/layout-3) — widened, a fourth `G` arm; *the `G` lookup at
  the block's head* (grunge/layout-1) — Pop's arm first, seven leaves falling back through `??`;
  *Lime's one `ink` was doing five jobs* (grunge/layout-3, section 8) — a sixth seat for the lit
  chip; *a nested node or a card on another scheme reads that scheme's keys* (editorial/layout-2)
  — the lit row, *See all gigs* and the panel on `S3`; *read every nested node's scheme off the
  master* (grunge/layout-3) — the viewport inheriting 3, not the seat's 4; *a Lime block paints
  its ground from Scheme 1 keys* (editorial/layout-4) — `G.sheet` undefined, the seat's blue;
  *under Lime `pillBg` IS the accent* (C) — turned round: Scheme 4's teal, so *See all gigs*
  passes `S3`'s pair; *rings are the frame's weights, opacities and dash* (D3) — kept; *the
  raster is drawn as it is* (D3) — the plate a fifth time; *a twin's redrawn state is read against
  this frame* (C) — the lit row, the frame's own, followed; *Retro's live states vanish… redraw
  them* (lime/layout-1) — the lit pin, the lit row's pair; *a frame's inside stroke is an inset
  `boxShadow`* (lime/layout-2) — the lit row's and discs' 2px; *a stand-in face's glyph floor is
  measured per site* (editorial/layout-3) — 0.1em at Display/Title, 0.08em on the venues;
  *`vm.title` shadows the ramp* (lime/layout-1) — Display/Title 28 / 22 / 20; *the whole-page
  published check* — `page-check.mjs Pop 2,0,1,3`.

- Section 9: *after `up`* (D3, lime/layout-3) — widened, no `G`; *a widened block can need no
  `G`* (grunge/layout-3) — a handful of `pop` arms and one `card` alias; *the paired diff walk*
  (A) — 27 / 27 / 27, leaves alone; *a card on another scheme is that scheme's binding, not
  always its ground* (pop/layout-2) — the card's `box/1`, the pill's label and disc `sem/bg`;
  *a nested node or a card on another scheme reads that scheme's keys* (editorial/layout-2) —
  every card leaf on `s.onScheme[2]`; *read every nested node's scheme off the master*
  (grunge/layout-3) — Scheme 2 at every width; *a refused box changes colour, not weight alone*
  (C) and *a twin's frame-less control is checked against its own surround* (editorial/layout-3)
  — 2px of the card's pink; *a stand-in face's glyph floor is measured per site* and *a
  baseline-aligned row lifts as one* (editorial/layout-3) — the head 0.14em, the price row 0.1em;
  *a head that must fit its measure is fitted to its widest word* (D3) — Titan's ems, kept;
  *`vm.title` shadows the ramp* (lime/layout-1) — Display/Title 28 / 22 / 20; *the composed row's
  pad arm moves per section* (grunge/layout-3) — the inset pair, the form first; *the whole-page
  published check* — `page-check.mjs Pop 2,0,1,3`.

- Section 10: *after `template`* (D3, lime/layout-3) — widened, a fourth `G` arm; *the `G` lookup
  at the block's head* (grunge/layout-1) — Pop's arm first, no new leaf; *seat the schemes off
  the master, never remap the twin's register* (grunge/layout-4) and *read every nested node's
  scheme off the master* (grunge/layout-3) — five registers on 7 / 2 / 4 / 5 / 6, the stat card
  on 3; *a nested node or a card on another scheme reads that scheme's keys*
  (editorial/layout-2) — every cell and the stat card on `s.onScheme`; *the paired diff walk*
  (A) — 44 / 44 / 44, leaves alone; *a twin's redrawn state is read against this frame* (C) —
  `quote-cell` left bare, Editorial's call; *a frame's inside stroke is an inset `boxShadow`*
  (lime/layout-2) — the cells' and discs' 1px, the faces' 2px; *a stand-in face's glyph floor
  is measured per site*, *a baseline-aligned row lifts as one* and *measure a floor with
  flat-bottomed glyphs, and correct the frame's for its whole-pixel line box*
  (editorial/layout-3) — 0.14em on the head and the numeral row, 0.12 on the quote and the
  mark, 0.08 on the name; *lift the label, never the ring* (pop/layout-2) — the disc's mark;
  *the composed row's pad arm moves per section* (grunge/layout-3) — the inset pair closed; *the
  whole-page published check* — `page-check.mjs Pop 2,0,1,3`.

### Learned on the end-of-pass sweep (`3007775`, `888330b`, `627d987` and this note)

- **The HEAD-side labels first**, on a fresh `:5188` (the user's `:5173`, `:5175` and `:5176`
  were days old): five themes, canvas and `live=1`, 660 + 660 files, no one-row file in either.
- **Item 1, the docs.** CLAUDE.md's header-identity paragraph names Pop's *Inset Hero* card as a
  `cardLine` reader, Pop's Genres row among the six-chip ones, and Pop's layout 3 among the bios
  that print the tags; the `FIELDS` paragraph records the card-3 re-measure (the kicker off design
  2, `cardLine` gaining Pop) and `cardLine`'s `'*': []` marking Retro alone. The scheme bullet
  gains Pop's layout-3 seats (`SCHEMES_OF.Pop[2]`: the header on 6, the calendar and the gallery
  on 2, the map on 4), `cardOnPage`'s reach to the layout-3 calendar and the desktop header (the
  card Scheme 6 at every width, the frame round it white at 1440 only), every layout-3
  `s.onScheme` reader, Schemes 5 and 8 seating layout 3's nested nodes too, and `text3` at
  layout 3 (the header's white name, Listen and location). `notes/nav.md`: Minimal at layouts 2
  and 3 of every template, *Follow my sections* fitting four in Pop's layout 3 at 768, the
  fixed-18 arm against 684, and Pop's centred 390 name named beside Editorial's (JP-101's span).
  `notes/templates.md`: Pop designed at layouts 1–3, Inset Hero fitted and Stacked the one
  placeholder, and a layout-3 paragraph in Editorial's shape. `notes/media.md`: layout 3's list
  on layout 2's five schemes by index, pinned at the division. README: Pop at layouts 1–3, its
  layout-3 page, the header family and its `vm.pad` arms, and one placeholder card left. One
  stale code comment fixed (§10.2's "Pop's layouts 2–4 take the shared structure undressed" →
  layout 4). The `vm.pad`, `SCHEMES_OF`, `cardOnPage`, `navModeDefault`, `navFits` and `FIELDS`
  comments were already the sessions'. **The flat four** prose in Retro's `s.v2` arms (pricing's
  `h = s.tierRow` paragraph among it) describes a path no designed template reaches at layout 3
  any more; it is Retro-pass prose, not a template list, and was not chased (Editorial's call).
- **Item 2: the published page passed first time.** `page-check.mjs Pop 2,0,1,3`: four modal
  cards on every card, no error or warning in either window on any. Card 3: Music → `#media`,
  Gigs → `#map`, About → `#bio`, Listen → `#media`, Book Now → `#form`; the calendar's pill and
  the three pricing pills → `#form`; the player plays (`paused: false`, the playhead moved); the
  form rings its three boxes 2px pink from 1px violet, composes the bare *Enquiry* mailto and
  swaps to *Check your mail app*; all nine footer links land; the 390 burger 1 → 5;
  `overflow390` 0. The published 1440 page: header 901, bio 1225 beside the calendar 655 (both at
  901), media 1251, repertoire 663, gallery 595, pricing 1069, map 808, form 561, testimonials
  702, footer 522. **Sideways overflow** in the popup (a scratch probe): the document 0 at 1440,
  1180, 768, 414, 390 and 360, and no section root wider than its box but the footer's 1181 /
  1180 at desktop, which card 1 shows too (layout 1's hairline; the document does not scroll).
  **The seams are straight at both widths**: at 1440 the white frame round the violet card, white
  into the lime gallery sheet, the sheet onto pricing's pink-ringed white, pricing onto the blue
  map band, the band onto the white form, the wall onto the pink footer; at 390 the violet frame
  onto the white bio, the calendar into the sheet and the rest the same.
  - **The harness controls** (`theme=4&arch=2&live=1`, one scratch script, trusted clicks): the
    gallery viewer opens on the third tile at 3 / 7 with focus inside and `hidden` / `stable` /
    `hidden` on `<html>` and `<body>`; Next → 4 / 7, → 5 / 7, ← 4 / 7; Escape closes and restores
    all three; reopened on tile 1, a scrim click closes. Scrim `rgba(0, 0, 0, .94)`, the controls
    and counter pink on pink at 14%, desktop and 390. The repertoire at `n=20`: *View full set →*
    reveals its card at all three widths (the section 101.4 / 145.7 / 78.2 taller, the link gone);
    the 390 carousel opens on Pubs and Next walks Birthdays → Weddings → Pubs, wrapping, Prev
    back. Pricing's FEATURED seat: rest → The Festival Set, Duo → The Wedding Set, Trio and Band →
    The Festival Set, a second Band press clearing to The Festival Set, lime wherever it lands,
    desktop and 390. The map at `n=30`: two `+` presses scale the layer to 1.5625 and `−` back to
    1.25, *See all gigs* lists all 30 at every width. No page error or warning; every root's
    `scrollWidth` its width. **One probe trap**: a reveal link found by text alone can be a
    390 peek's, which takes no pointer, so the first probe's click landed on nothing; pick the
    link whose `elementFromPoint` is itself.
- **Item 3: the thumbnails** (`browser-tool-choice`'s recipe, card 3): all eleven rows open; the
  header offers 4 items, the footer 1, the rest 6, 7, 7, 5, 4, 8, 4, 6, 8 in page order; every
  arch-2 item renders one `--ac` root and reads as its fitted section — the violet header card in
  its lime ring, the lime gallery sheet, the blue map round its pink panel, the white sections with
  their cards on their own schemes, the repertoire's lime / pink / blue sets, the wall's six
  cells; no editor error. **A finding outside the pass: the picker draws every seal at 16px.**
  The menu item is shadcn's `DropdownMenuItem`, whose `[&_svg:not([class*='size-'])]:size-4`
  sizes every `<svg>` that carries no `size-` class, and `SealBadge` sizes its svg by its
  `width` / `height` attributes, which any CSS rule outranks. So the bio's seal is a 16px dot in
  its 143px wrapper (Pop's here, Lime's layout-3 bio the same, the footer's on every template);
  `Photo`, the scribbles and the sparkles size by inline style and are right. The same item rule
  colours a class-less svg `text-muted-foreground`. Builder chrome, every template, older than
  this pass and invisible to `digest.mjs`; raised for a user call, not fixed here.
- **Item 4**: cards 1, 2 and 4 publish all eleven sections in `pageOrder(i)`'s order with no
  error or warning; card 1 is Hero, card 2 Feature spread, and card 4 keeps Retro's `HeaderV3`
  placeholder (the checker ribbon over the stacked floor), as layout 1's open question 8 leaves
  it.
- **Item 5: `reach.mjs 4`** (5,880 renders), every plain probe compared with
  `fieldReach(f, 'Pop', d)` in Node: **75 probes, no mismatch**. The header's rows are section
  1's over the fitted card (`cardLine` `[2]`, kicker / showBadge / badgeText `[0, 3]`, tags /
  showTags `[0, 2, 3]`, location all four, cta2 `[1, 2]` at 4/6, the layout-2 copy `[1]`, align
  `[0]`), the identity probes match CLAUDE.md (the tags at bios 2, 3 and 4; the kicker at every
  bio and forms 1 and 2; the location at bios 1–3, calendar 4 and map 2), and the partials are the
  known four (`header.cta2` 4/6, `calendar.email` 3/6, `bio.tagsLabel` 4/6 at layout 4,
  `gallery.railLabel` 2/6). Nothing in `FIELDS` moved.
- **Item 6: every pair, kept, none folded.** In layout-3 code: **nine blocks**, each
  `(s.limeTree || s.pop)` — `HeaderV2`'s at its head, the bio's ahead of its `if (s.v2)`, and
  media, repertoire, calendar, pricing, map, form and testimonials inside it after the seam — and
  **the gallery's five pair reads** inside its `if (s.v2)`, `(s.limeTree || pop)` (the ink, the
  768 head's size gate, the tile's border gate, the well's style, the overlay ring's gate). That
  is fourteen layout-3 sites beside layouts 1's and 2's 31: **45**. **One layout-3 `s.limeTree`
  stays unpaired on purpose**: the tile's `Photo` ink, `pop ? s.text3 : s.limeTree ? s.tx :
  s.paperFg`, where Pop has its own arm (black on the olive well). The gallery's other Pop sites
  are `(ed || pop)` or `pop ?` reads — the sheet, the well, the ring and `ringW`, the ratio, the
  viewer's three inks, the head's case and lift, the photograph's clip — not the pair. Beside
  them, as at layout 2, `SealBadge`'s `s.limeTree && !classic` and `Photo`'s backdrop
  `s.pop ? … : s.limeTree` keep Pop's own arms at every layout, and every `s.v3` block and
  `HeaderV3` are `s.limeTree` alone (layout 4's pass). In `data.js` and `EncoreBuilder.jsx` every
  `d === 2` name gate names Pop (the four `vm.pad` arms, `navModeDefault`, the `navFits` arm,
  `navGapEm`, `titleWordEms`); `footerBand` is Lime's and Grunge's by design (Pop's footer is
  pink on every page). With card 3 fitted, three of Pop's four layouts are; the fold (layout 2's
  decision 1) is still the family's last pass's.
- **Item 7**: `CONVENTIONS.md` took a *Pop (layout 3)* column on A, B and C and D3's first Pop
  column, and one row this pass leaned on four times that it did not name — *a card on another
  scheme is that scheme's binding, not always its ground* (C; written by layout 2's form
  session): the audio and calendar cards `box/1`, and of the three Scheme 2 cards the sessions
  asked about, two `box/1` (the form's card, the testimonials' `quote-cell`) to one `sem/bg`
  (pricing's featured row). Every other bullet in *Inherited and used* already had a row.
  `plans/README.md` closes the pass, its reading order gains layout 3's *Conventions*, and its Pop
  layout-2 row, still "push, PR and merge open", now says it merged inside this branch's PR #48.
- **Item 8**: *Notes for the designer*, at the plan's foot — eight notes from open questions 2–18
  (10, 13 and 15 are code calls, not the designer's; 8 is card 4's pass).
- **Item 9: the two-build digest** (the repo root on `127.0.0.1:8931`, the committed build — JP-120's
  refresh, `816941d` — digested on both cards before the build and the `cp`, reduced motion on).
  `CARD=0`: the seeded page is **byte-identical under all five templates** at Desktop, Tablet and
  Mobile, and `modal.txt` is identical (four cards each in both). `CARD=2`: card 3's page is
  identical under Retro, Lime, Grunge and Editorial and rebuilt under Pop (707 → 723, 691 → 712
  and 655 → 677 rows; 1,318–1,418 diff lines a tab). The tell: `repeating-conic` (Retro's checker
  ribbon) old-only at every tab; Minimal's *Music* new-only at Desktop and Tablet (390 is the
  burger); the header root white at Desktop and violet `#6B2CFF` at Tablet and Mobile in the new
  build, white at all three in the old; twenty lime inset rings new-only at each tab. The
  standalone file is **9,829,780 bytes** (was 9,824,811); only `EncoreSection.jsx`,
  `EncoreBuilder.jsx` and `data.js` changed in `src` since that refresh, every change named in
  this pass's sessions; no photograph was added (56 files).
- **Raised for the user, not decided**: open questions 10 (every twin's off-centre *Inset Hero*
  portrait), 13 (layout 2's one-track media stadium), 15 (the calendar's one-word heading) and 18
  (the testimonials' pink-on-violet `feat-quote`), and item 3's 16px seals in the layout picker.

## Open questions

1. ~~**Decision 1** — the header's ground: seat 6 with `cardOnPage` at desktop (A, recommended) or a
   `[1, 6, 6]` triple (B).~~ *Settled in session 0: A (user call, 2026-10-06).*
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
9. **The header's fourth and sixth chips are lettered in other schemes' inks** — `scheme/4/tag1/text`
   `#141414` on the teal seat and `sem/tag/7/bg` `#FFFFFF` on the red one, where Scheme 1's own
   seats letter `#000000` and `#F6F0E8`. Each chip takes its own seat's ink (Editorial's open
   question 4); the difference is a shade apiece. Worth a line to the designer.
10. **Every twin's *Inset Hero* card draws its portrait left of centre** (section 1): all four
    frames centre it (`counterAxisAlignItems: CENTER`, 66.5 in), the block's column stretches it
    to the padding edge, so Lime and Grunge stand it 26.5 left at 1440 (× 0.82) and 768, and
    Editorial 2. Pop's is centred behind `pop`; fixing the twins moves header arch 2 under themes
    1–3 at desktop and 768 (6 files a surface), a QA ticket's or the sweep's — **a user call**.
11. **The bio's 768 seal keeps the desktop's x** (section 2): in the 708 instance the disc stands
    125.8 past the card and the Section's clip cuts it to a quarter at the photograph's edge. Drawn
    in the desktop's corner seat instead. Worth telling the designer.
12. **The bio's 390 sparkle stands where our one-line stats run** (section 2): the frame's copy is
    hand-broken short ("DJ & / SELECTOR") and clears it; ours ("MANCHESTER, UK") runs under it, so
    at 390 the sparkle is drawn behind the card's content. Worth a line to the designer if a
    sticker is meant to stay clear of copy.
13. **Layout 2's media list stands one track as a list-tall stadium** (found in section 3). Its
    rows grow into the list's stated minimum, `1 1 0` on the desktop grid and `1 1 auto` over
    596 narrow, so at `n=1` the one pill is **508 / 543 / 543** tall (measured at
    `cat=media&arch=1&theme=4&n=1`). Layout 3 pins each row at its division result instead (the
    Conventions bullet). The fix there would be the same pin, 115.8 × 0.82 / 100.6. It moves media
    arch 1 under theme 4 alone, but the desktop rows also divide the grid's stretched height, so
    it wants its own check. Not touched here, since theme 4 may move only media arch 2. **A user
    call**, for a QA batch or the sweep.
14. **The calendar frame draws a *today*** (section 5): one dot in row 2 is 31.99 against
    30.71, on `box/1` ringed in `text/2` rather than `stroke/1`. Under Scheme 2 both are violet,
    so it reads as a slightly larger free dot. Neither twin's frame draws it, and the canvas
    never reads the clock, so it has no seat; a live-only today mark would be a new state.
    Worth a line to the designer, with the booked and selected filler beside it.
15. **A one-word typed heading runs out of the calendar's column** (section 5): the layout-3
    block's h2 carries no `overflowWrap`, so a 34-letter word sets 466 wide in the 335
    composed column under Pop. Lime's sets 344 and Editorial's 506 with the same word. A shared
    fix (`overflowWrap: 'anywhere'` on the h2) should move no seeded geometry (by inspection,
    not measured), but it is every template's; **a user call**, for a QA batch or the sweep.
16. **Pricing's FEATURED badge is lime on lime** (section 7): `box/1` `#D7FF23` on the featured
    row's `sem/bg` `#C6F200`, 1.13 : 1, so the tile all but vanishes and only its violet word
    (5.31 : 1) reads. Followed, as the frame draws it (Grunge's red-on-red badge, the same
    call). Worth a line to the designer.
17. **Two faint pairs on the map** (section 8), both the frame's and followed: EXPAND VIEW's
    arrow is `sem/bg` pink `#FF2DA0` on the pink container `#FF63B8`, and the lit row's date disc
    letters its 7px month and weekday in lime on that same pink. Every twin's arrow is faint the
    same way (Lime's on `lime3`, Grunge's red on red, Editorial's ink on ink). Worth a line to the
    designer with question 16.
18. **The testimonials' `feat-quote` is pink on violet** (section 10): its quote binds `text/2`
    `#FF2DA0` on Scheme 6's `box/1` `#8451FA`, **1.35 : 1**, and the seed's named review in that
    seat letters its name and its 10px role in the same ink (the frame draws no name there; the
    name-cells' binding, extrapolated), so the role all but vanishes. Followed, as the frame
    draws it; `text/3` white would read at 4.6 : 1 and is bound by no node. The coral cell's
    violet (2.0 : 1) and the stat card's lime numeral on pink (2.1 : 1) are the frame's too.
    Worth a line to the designer with questions 16 and 17; **a user call** if the seed's role
    should read.

## Notes for the designer

*(The open questions above that are worth telling the designer, gathered by the sweep into one
note to forward, in layout 2's shape. Each is shipped as described; where it says "one line", the
other answer is a one-line change. Layouts 1's and 2's notes still stand.)*

1. **Three pairs the frames draw too faint to read.** Each is followed as drawn, as the Grunge
   page's red-on-red badge was.
   - The testimonials' `feat-quote` letters its quote `text/2` pink `#FF2DA0` on Scheme 6's
     `box/1` violet `#8451FA`, 1.35 : 1. Where the seed puts a named review in that seat, its
     name and its 10px role take the same ink, so the role all but vanishes. `text/3` white would
     read at 4.6 : 1, but no node binds it. The coral name-cell's violet (2.0 : 1) and the stat
     card's lime numeral on pink (2.1 : 1) are faint the same way. *(18)*
   - Pricing's FEATURED badge is `box/1` `#D7FF23` on the featured row's `sem/bg` `#C6F200`,
     1.13 : 1, so the tile all but vanishes and only its violet word reads. *(16)*
   - On the map, EXPAND VIEW's arrow is `sem/bg` pink `#FF2DA0` on the pink map container
     `#FF63B8`, and the lit row's date disc letters its 7px month and weekday in lime on that same
     pink. *(17)*
2. **Two header chips are lettered in other schemes' inks.** The fourth chip binds
   `scheme/4/tag1/text` `#141414` on Scheme 1's teal seat and the sixth `sem/tag/7/bg` `#FFFFFF`
   on its red one, where those seats' own inks are `#000000` and `#F6F0E8`; the bio's Genres row
   letters its third and fourth chips `scheme/3/inactive/text` and `scheme/4/tag1/text` the same
   way. The page letters each chip in its own seat's ink. A shade apiece, the class of
   Editorial's layout-3 chips. *(9)*
3. **The bio's photograph hides another template's.** Under Pop's own stage photograph (a crop
   of rows 6.4–42.1%) the well carries Lime's stage shot (`fa453f7d`) at `FILL`, painted over and
   invisible — a leak in the component, as on Grunge's and Editorial's pages. *(2)*
4. **The gallery's twelve tiles are other templates' pictures.** Retro's, Grunge's and
   Editorial's placeholders with two of Pop's photographs and one (`3a59b4d1`) no template uses;
   the page shows the seven pictures of Pop's own shoot (layout 1's note, layout 2's note 2). *(3)*
5. **Two of the bio's stickers sit where they cannot at every width.** At 768 the seal keeps the
   desktop's x in the 708 instance, so it stands 125.8 past the card and the `Section`'s clip
   cuts it to a quarter at the photograph's edge; the page draws it in the desktop's corner. At
   390 the teal sparkle stands beside the frame's hand-broken "DJ & / SELECTOR", but a one-line
   value ("MANCHESTER, UK") runs under it, so the page draws it behind the card's copy there.
   *(11, 12)*
6. **The calendar's frame draws filler the page cannot model.** One dot in row 2 is a *today*
   (31.99 against 30.71, ringed `text/2` rather than `stroke/1`), which neither twin's frame
   draws and the canvas never knows; with it, four booked and seven selected dots that are no
   one's data. The page draws the seeded month's real state. *(14)*
7. **Two slips in the type.** The narrow masters type the three composed heads in mixed case —
   "Reads the room.", "Five worth your ear", "Book Me" — where 1440 types them in capitals (the
   page sets them in capitals at every width, layout 2's media head again). And the
   testimonials' "EXPERIENCES." breaks inside the word at 1440, EXPERIENC / ES., in its capped
   306 box in the demo face; the page drops the cap and prints its heading on one line, as Lime's,
   Grunge's and Editorial's do. *(4, 5)*
8. **The footer is still layout 1's unbound variant, and two schemes on the page paint
   nothing.** All three footer instances set Scheme 2 on a tree that binds no colour, so they
   draw layout 1's pink; the 1440 instance also draws no type in Figma (its 13 text nodes report
   a missing Chunko style). `Frame 299`, the composed region's wrapper, sets Scheme 3 with no fill
   and nothing reads it — worth a line only if the column was meant to be pink. *(6, 7)*
