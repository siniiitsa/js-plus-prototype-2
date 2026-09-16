# Lime layout 2 — section-by-section plan

This is the working checklist for bringing **layout 2** of the Lime template up to its Figma
designs. It runs one section per session, all three widths together, clearing context between
sections. Layout 1 (`s.v0` under `s.lime`) is fitted and closed; nothing here should move it.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then:
- the whole *Conventions* of [`layout-1.md`](./layout-1.md) — it is this pass's foundation
  (`s.lime`, the Lime ramp, the `sem` keys, `BookPill` / `Pager` / `SealBadge`'s Lime branches, the
  block-placement rule, the digest)
- the *Conventions* **and the narrow-masters notes** of [`../retro/layout-2.md`](../retro/layout-2.md),
  which built every `s.v1` branch this pass dresses, at all three widths
- the *Per-session procedure* of [`../retro/layout-4.md`](../retro/layout-4.md)

Then read the three memory notes `figma-frame-reading`, `verifying-the-published-tab` and
`browser-tool-choice`. `SPEC.md` lives in git history: `git show 8fa8ff4:SPEC.md`.

Branch: **`lime-layout-2`, forked from `lime-layout-1` (`049eace`), not from `main`.**
`lime-layout-1` is closed but unmerged, 39 commits ahead of `main`, and everything this pass
stands on — `s.lime`, `THEME_RAMP.Lime`, `THEMES[1].sem`, `SEEDS`, the Lime branches of the shared
components, `digest.mjs` — exists only there. Merging layout 1 first is the user's call; if it
lands, rebase this branch onto `main` rather than re-forking.

## What the pass must deliver

1. **Every layout-2 section works in the published tab under Lime**: every `s.v1` control
   CLAUDE.md lists under *`s.live` is false everywhere except the published tab*.
2. **Every layout-2 section looks as close to its Figma frame as possible**, at 1440 (× 0.82 onto
   the 1180 canvas), 768 and 390.
3. **The setup modal's card 2, "Feature spread", lays out a fitted page.** `pickHeader` writes
   arch 1 to every section, so this pass is what turns card 2 from Retro's layout 2 in Lime tokens
   (layout-1 plan, open question 2) into Lime's own page. The header session verifies this **in the
   builder**, not only the harness, the way layout 1's section 1 did.
4. **The sidebar's layout-picker thumbnails for layout 2** under Lime look like their sections.
   They render `sectionVm` at `SIZES.desktop`, so they follow the desktop fit for free; check them
   once, in the end-of-pass sweep.

## What this pass actually is

**Lime's layout-2 page is Retro's layout-2 page re-skinned, the way layout 1 was.** The evidence,
read in the planning session with one `use_figma` walk per page:

- The Lime instances are `964:64580`…`964:64597`, and Retro's are `964:64637`…`964:64654`. They
  have the same composition names in the same order, with node ids offset by exactly −57.
- **The main components are not shared.** Every Lime instance points at its own component id
  (header `624:4875` against Retro's `430:477`). **That was already true of layout 1** (Lime
  `446:453` against Retro's `446:455`, and so on for all eleven), so it is not a warning. The test
  that matters is the tree.
- **The trees match.** Each section's descendants to depth 6 were compared as a multiset of
  `type:name`, and this is what came back:

| Section | 1440 | 768 | 390 | What differs |
|---|---|---|---|---|
| header | 0.20 | 0.20 | 0.20 | **Only Retro's decoration**: the 132-cell checker ribbon (`Frame 173`), the seal (`Frame 248`: two `TEXT_PATH`s, a `Group`, its grain), the "Manchester, UK" rail text and two grain rects. Both trees are two 636-wide columns at x 56 / 748 under the same five-child `nav`. Same skeleton, every decoration gone — layout 1's bio case, not a new composition. |
| bio | 0.95 | 0.95 | 0.95 | Retro's `image #` grain rect |
| media (both instances) | 1.00 | 1.00 | 1.00 | — |
| video | 1.00 | 1.00 | 1.00 | — |
| repertoire | 1.00 | 1.00 | 1.00 | — |
| gallery | 0.94 | 0.96 | 0.95 | Retro's `image #` grain rect |
| pricing | 1.00 | 1.00 | 1.00 | — |
| calendar | 1.00 | 1.00 | 1.00 | — |
| map | 1.00 | 1.00 | 1.00 | — |
| form | 1.00 | 1.00 | 1.00 | — |
| testimonials | 1.00 | 1.00 | 1.00 | — |
| footer | 0.69 | 0.69 | 0.69 | vs Retro's. **1.00 against Lime layout 1's own footer at all three widths**, so it is out of scope (below). |

- **No seams.** No full-width vector under 260 tall exists on any of the 36 masters, and the three
  renders show straight edges throughout. Layout 2 draws **no `ArcEdge`**.
- **No Device-mode overrides** anywhere on the 768 and 390 pages. Layout 1's 390 hero trap (a
  Mobile page carrying a Tablet section) does not recur, so `s.*` from the Lime ramp is right on
  every narrow master. Re-check per section anyway; the walk looked at `explicitVariableModes`
  only.
- **The narrow shapes are Retro's.** Same trees at 768 and 390, so Retro's narrow-master notes
  (768 keeps the columns, 390 stacks; the media and calendar wrappers; the map's 390 stack) apply
  as written. Re-measure every number, since the sizes are not Retro's (see *Sizes*).

So the work is the layout-1 pass's work one branch over: **Lime decoration and Lime tokens inside
the existing `s.v1` branches, gated on `s.lime`**. No token foundation is owed (layout 1's session
0 built it), and no section needs a component of its own.

**Do not write Lime-only section components.** Decide per section between ternaries and a
`s.lime` block by layout 1's count-the-leaves rule (its section 2 *Conventions*), and place a block
by layout 1's seam rule: ahead of `if (s.v1)` as `if (s.v1 && s.lime)` when the section's live state
is hoisted above its branches, or as `if (s.lime)` *inside* `if (s.v1)`, after the seam, when the
state is computed inside the branch.

## The Figma source

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Frame 251 | `964:64579` | 1440 × 9801.5 |
| Tablet | Frame 257 | `986:11847` | 768 × 11252.4 |
| Mobile | Frame 258 | `986:11866` | 390 × 10815.5 |

- Desktop: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=964-64579&m=dev>
- Tablet: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=986-11847&m=dev>
- Mobile: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=986-11866&m=dev>

`fileKey` = `uFoUbPaBrDicjyuSBEbtGT`. All three frames, and Retro's layout-2 frames, are on the
**Layout 2** page, `964:58572`. `use_figma` reads on descendants want
`await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('964:58572'))` first.

**Match on node id and width, never on the name.** The misnamed ones here are the same as on Retro's
layout-2 page:
- The 390 header (`986:11867`) is called "— **Tablet**".
- Both narrow editorial list players (`986:11855`, `986:11874`) and the 768 calendar
  (`986:11861`) are called "— **Desktop**".
- The footer is *Component 2* at 1440 and "Footer — Component 3 / 4 — **Desktop**" at 768 and 390.

**Two sections are wrapped**, as on Retro's page:
- **media** is a `Section` (1440) or `Frame 299` (narrow) holding `Frame 297` (the Scheme 2 panel),
  which holds `Frame 296` (the *"Five worth your ear"* heading over **Media Player — B · Fanned
  carousel**) beside, or above, **Media Player — A · Editorial numbered list**. The insets for
  297 / 296 / the list are 56·86 / 60·60 / x 739 at 1440, 30·60 / 30·60 / y 792 at 768, and
  10·40 / 20·40 / y 736 at 390. Fit the whole wrapper.
- **calendar**'s `Frame 298` only insets the instance: 56·56, 30·56 and 10·40. Fit the instance.

## The sections

Page order. Sizes are the frames' own. Each row's three masters are fitted in one session.

| # | Cat | Desktop node | Size | Tablet node | Size | Mobile node | Size | Retro twin (1440 / 768 / 390) | Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `header` | `964:64580` | 1440 × 900 | `986:11848` | 768 × 1024 | `986:11867` | 390 × 890 | `964:64637` / `984:34438` / `984:34636` | done `ab83542` |
| 2 | `bio` | `964:64581` | 1440 × 760 | `986:11849` | 768 × 1191.8 | `986:11868` | 390 × 909.3 | `964:64638` / `984:34877` / `984:34834` | done `bbc6904` |
| 3 | `media` | `964:64582` *(Section)* | 1440 × 965 | `986:11850` *(Frame 299)* | 768 × 1568 | `986:11869` *(Frame 299)* | 390 × 1452 | `964:64639` / `984:35122` / `984:35396` | done `5a9cf76` |
| 4 | `video` | `964:64588` | 1440 × 782 | `986:11856` | 768 × 1123.2 | `986:11875` | 390 × 1125.8 | `964:64645` / `984:35259` / `984:35737` | **dropped** — the section is being removed from the project, so it is not fitted (its code still exists) |
| 5 | `repertoire` | `964:64589` | 1440 × 792 | `986:11857` | 768 × 792 | `986:11876` | 390 × 594 | `964:64646` / `984:35876` / `984:35961` | done `405efb0` |
| 6 | `gallery` | `964:64590` | 1440 × 675 | `986:11858` | 768 × 468 | `986:11877` | 390 × 364 | `964:64647` / `984:36046` / `984:36070` | done `3c0abaa` |
| 7 | `pricing` | `964:64591` | 1440 × 730 | `986:11859` | 768 × 946 | `986:11878` | 390 × 879 | `964:64648` / `986:10425` / `986:10492` | done `d50a23c` |
| 8 | `calendar` | `964:64593` *(in `964:64592`)* | 1328 × 1071 | `986:11861` *(in `986:11860`)* | 708 × 844 | `986:11880` *(in `986:11879`)* | 370 × 766 | `964:64650` / `986:10607` / `986:10800` | done `206c596` |
| 9 | `map` | `964:64594` | 1440 × 867 | `986:11862` | 768 × 823 | `986:11881` | 390 × 1286 | `964:64651` / `986:10974` / `986:11467` | — |
| 10 | `form` | `964:64595` | 1440 × 812 | `986:11863` | 768 × 889 | `986:11882` | 390 × 933 | `964:64652` / `986:11591` / `986:11633` | — |
| 11 | `testimonials` | `964:64596` | 1440 × 855.9 | `986:11864` | 768 × 824 | `986:11883` | 390 × 917 | `964:64653` / `986:11675` / `986:11701` | — |
| — | `footer` | `964:64597` | 1440 × 479.5 | `986:11865` | 768 × 647.4 | `986:11884` | 390 × 619.4 | — | **out of scope** — the same tree as Lime layout 1's footer (`964:58598` / `986:39887` / `986:39899`), fitted in that pass's section 11, and `NVAR.footer` is 1 |
| — | `tags`, `audio` | *none* | — | — | — | — | — | — | **not on this page**; see open question 1 |

The Retro twin's node id is what `EncoreSection.jsx`'s fit comments cite, so grep for it to find the
branch. **Cite branches by that id, never by line number**: the file is ~16 000 lines and every
session moves it.

### Sizes: re-measure, and expect the calendar to overflow first

Lime's display ramp is larger than Retro's (`dispXl` 200 against 128, `dispLg` 130 against 96).
The frames grow where the type is the content:

| Section | Lime 1440 / 768 / 390 | Retro 1440 / 768 / 390 |
|---|---|---|
| header | 900 / 1024 / 890 | 888 / 1024 / 926 |
| bio | 760 / 1191.8 / 909.3 | 760 / 1138.8 / 881.3 |
| media | 965 / 1568 / 1452 (heading 232 tall, fan 441) | 965 / 1549 / 1428 (heading 170, fan 503) |
| video | 782 / 1123.2 / 1125.8 | 782 / 1112.2 / 1101.8 |
| pricing | 730 / 946 / 879 | 707 / 915.4 / 849.4 |
| **calendar** | **1071 / 844 / 766** | 896 / 741 / 698 |
| map | 867 / 823 / 1286 | 780 / 823 / 1286 |
| form | 812 / 889 / 933 | 792 / 865 / 912 |
| testimonials | 855.9 / 824 / 917 | 782 / 796 / 870.3 |

**The calendar's slot marks** ("JUN 12") set in Bebas at the display ramp are the likeliest
overflow. Retro's branch pins its date column at a width it *measured* for Fraunces (Retro layout-2
section 8, "measure the pin, never transcribe it"). Re-measure that pin in Bebas at Lime's size, at
all three widths, with the harness's `&open=` looping every month.

## Lime's layout-2 mode

The page frame is **Primitives: Lime, Scheme 1**; the 768 and 390 frames add **Device: Tablet /
Mobile**, and no section below them overrides it. Layout 1's scheme table (its *Lime's Figma mode*)
already carries every value these schemes resolve to.

**Schemes by node**, from `explicitVariableModes` (instance, then nested):

| Section | Instance | Nested |
|---|---|---|
| header | Scheme 1 | nav Book pill (115 × 35) **Scheme 4**, `#F2FFD0`. ~~The walk missed at least one more Scheme 4 node~~ — *settled in section 1:* the `#C7FF3C` block is the place card, and it is **Scheme 1**'s `sem/box/1/text`, which is `s.hl`. No other nested scheme. |
| bio | Scheme 1 | the same 115 × 35 pill, **Scheme 4** |
| media | Section: Scheme 1 | `Frame 297`, the 1328 × 793 panel: **Scheme 2**, `#2E3928` (`s.box1`) |
| video, repertoire, gallery, pricing, testimonials | inherit Scheme 1 | testimonials: `big-card` (1207 × 331) and `ts-photo` (the rail tiles) **Scheme 3**, `#CCFA61` |
| calendar | **Scheme 2**, `#2E3928` | — |
| map | Scheme 1 | featured panel (652 × 363) **Scheme 3** `#CCFA61`; `radius-map` (652 × 755) **Scheme 2** `#394732`; `Map Viewport` Scheme 3 |
| form | **Scheme 4**, `#F2FFD0` | — |
| footer | Scheme 1 | — |

Scheme 3's fill on these nodes is its `box/1`, `#CCFA61`, not its `sem/bg` (`#AFE335`, which is
`s.ac`). Layout 1's form named `lift` `#D9FF7F` (Scheme 3 `box/2`) and `mist` `#D5E3B2` (Scheme 4
`box/1`) as literals, and `#CCFA61` wants a name the same way. The other two colours here already
have keys: `#394732` (Scheme 2 `box/1`, the media transport bar and the map's `radius-map` card) is
Scheme 1's `box/2`, so it is `s.box2`, and `#101309` (the header's and the gallery's photo wells) is
`s.box3`. **Read each node's
`fills` before believing a token** — the `get_variable_defs` list mixes the schemes, and layout 1's
map and form sessions both needed the fills to sort them.

### Grounds

Sampled from all three renders at the band edges and the middle. **The sequence is identical at
1440, 768 and 390.**

| # | Section | Ground | What stands on it |
|---|---|---|---|
| 1 | header | page `#15180F` | a photograph card (636 × 688, `#101309` well) beside a text column; nav on the ground |
| 2 | bio | page | a `#2E3928` card, 865 × 648, radius 30 |
| 3 | media | page | the Scheme 2 panel `#2E3928`, radius 50; the transport bar `#394732` |
| 4 | video | page | the player, `#2E3928`, radius 50 |
| 5 | repertoire | **full-bleed `#2E3928` sheet** (`phone`, 1440 × 792; `sticky-head` 210 the same) | — |
| 6 | gallery | page | photographs |
| 7 | pricing | page | the plan card (session reads its fill) |
| 8 | calendar | page | the Scheme 2 instance `#2E3928`, radius 50, with a **lime `#AFE335` head band** (1328 × 318) over the slot rows (653) and the foot (100) |
| 9 | map | page | the Scheme 3 panel `#CCFA61` and the Scheme 2 map card `#394732` |
| 10 | form | **full-bleed Scheme 4 `#F2FFD0` band** | a photograph (838 × 437) and the sidebar card |
| 11 | testimonials | page | pale `#F2FFD0` head type, a Scheme 3 `#CCFA61` card, radius 50 |
| — | footer | page, layout 1's | — |

**No root flag widens.** `bleed`, `darkMap`, `cream`, `limeBand` and `limeLight` all gate on `s.v0`,
and Retro's layout 2 never widened one: its two sheets — the repertoire's box/1 cream and the form's
mustard — are painted **in the branch** by the written-out bleed margin (Retro layout-2 repertoire
*Conventions*, "A full-bleed layout 2 does not need the root's flags"). Lime's two sheets are those
same two, in `s.box1` and `s.tx`. The form's light band then needs its own ink inside the branch
(`s.bg`), since the root's `color` stays `s.tx`: layout 1's `limeLight` did that at the root, and
here it is the branch's job.

## Lime's layout-2 decorative language

Everything here is behind `s.lime`, and replaces what the Retro branch gates on `s.retro`.

- **No grain, no torn edges, no checkerboard, no seal, no tilt.** Every `Grain`, `Checkerboard`,
  `SealBadge` and `tilt()` in the ten `s.v1` branches is Retro's and stays gated off. The header's
  checker ribbon and seal are the bulk of its tree difference.
- **Glows**, every one node-confirmed as an `INNER_SHADOW`, offset 0, spread 0. **Mind the hue:**
  the radius-34 and radius-14 glows are `#AFE335`, which is `s.ac` (= `pillBg` = `activeBg`), **not**
  `sem/glow` — `s.glow` is `#A6E22E` and only the pager's glow is that. Layout 1's "glows in
  `sem/glow`" would put these one hue off. An effect *style* resolves its variables in the style's own
  mode (`figma-frame-reading`), so confirm one of the four off the node before trusting the rest.
  - radius 34 `#AFE335` on the **header photograph** (636 × 688), the **bio photograph**
    (433 × 648), the **gallery hero** (784 × 583) and the **form photograph** (838 × 437)
  - radius 14 `#AFE335` on the **media transport bar** (629 × 108, `#394732`)
  - radius 17 `#A6E22E` on the **repertoire's current page pill** (`pg`, 183 × 54, `#394732`) — which
    is `Pager`'s Lime branch exactly (box `sem/box/2`, the current pill lit by an inset glow). Layout
    1's section 5 recorded that the repertoire's layout 2 owes `frame.lime`; the sheet is now olive,
    not the pale sheet that note feared.
  - Paint a glow over a photograph as layout 1's bio did: an `inset` box shadow on an overlay, since
    an inset shadow on the `<img>`'s own container paints under it.
- **One soft drop shadow**: the bio's photo card, `DROP_SHADOW` 1.25 / 1.25 blur 10.81, 16% black.
  Scan the render before drawing it (layout 1: the bio's 4/4/9 drew nothing, the testimonials'
  0/4/4 did).
- **Two hard offset shadows — which layout 1's decorative language says Lime does not have.** Both
  are `DROP_SHADOW` offset 5 / 5, blur 0, spread 0, on a pill:
  - the **header nav's Book pill** (115 × 35, Scheme 4 `#F2FFD0`), shadow `#15180F`
  - the **calendar's foot pill** (184 × 54, `#F2FFD0`), shadow `#AFE335`

  `BookPill`'s Lime branch "draws no offset block" and ignores `glyph`; it does honour `bg` / `fg` /
  `size` / `disc` / `discFg` / `style`. The header session decides whether `BookPill`'s Lime branch
  honours `shadow` (additive: every layout-1 Lime caller passes none) or whether the two callers
  pass it through `style`. Take the call once and write it under *Conventions*; the calendar session
  inherits it. Note that the header's shadow is the page ground on the page ground, so check the
  render for whether it shows at all before drawing it.
- **The pale pill.** Both 115 × 35 pills are Scheme 4, pale `#F2FFD0` — not the lime `sem/active` pill
  layout 1's `BookPill` defaults to. Pass `bg={s.tx}` and the Scheme 4 ink.
- **Radii** are raw 50 on the big panels (media, video, calendar, testimonials) and 30 on the bio
  card, matching Retro's layout-2 radii — so the Retro branch's numbers may already be right. Check
  each against `get_design_context` rather than reaching for `s.radius` (26), which none of these
  binds as far as the walk shows.

## Photography

Every photograph this page draws is **already in `photos.js`**, but three slots seed a different
picture from the one the frame shows. Image hashes, read off the frames:

| Section | Slot (frame box) | Hash | Seeded today | Verdict |
|---|---|---|---|---|
| header | scene 636 × 688 | `51d68654` | `limeHero` (`LIME_PHOTOS.header`) | ✓ |
| header | portrait 107 × 107 | `e3790c2c` | `limeHeaderAvatar` | ✓ — check the crop at 107 |
| bio | photo 433 × 648 | `fa453f7d` | `limeStage` | ✓ — layout 1 cropped it for a 488 × 648 arch; check this 433 × 648 box |
| media | covers | the five shared covers | `ROW_ART.media` | ✓ |
| video | poster 896 × 523 | **`51d68654`, the hero** | **`limeStage`** (`LIME_PHOTOS.video`) | **differs** — the video session decides; the poster (`FIELDS.video.image`) fills the player in layouts 2 **and 4**, so re-seeding it moves Lime's layout 4 too (unfitted, but say so) |
| video | list thumbnails | Retro's gallery set | `ROW_ART.video` (`RETRO_VIDEO_ART`) | ✓ |
| gallery | hero + six | Lime layout 1's set, spotlight `3a59b4d1` | `LIME_PHOTOS` gallery | ✓ |
| pricing | three 28 × 28 `av` | Retro's | — | nothing: Retro's layout-2 fit dropped the credit row that carries them |
| map | raster 588 × 519 | `e089bd11` | `vm.mapSrc` = `RETRO_TEXTURE.map` (`8cd103b8`, layout 1's) | Retro's own layout 2 carries `e089bd11` too and renders `mapSrc`; follow whatever Retro's branch settled, and record it |
| form | stage photo 838 × 437 | **`f821adc2`, the avatar image** | **`limeStage`** (`SEEDS.Lime.photo`) | **differs** — layout 1 exported `f821adc2` only as a 240 × 240 centre square (`lime-avatar.jpg`), so a wide `lime-form-photo.jpg` is probably owed |
| form | avatar 48 × 48 | `f821adc2` | `limeAvatar` | ✓ |

A new file follows layout 1's session-0 recipe: export the frame's asset as JPEG at the box it fills,
into `src/builder/photos/lime-*.jpg`, imported by `photos.js` alone.

## What already renders, and the traps in it

A code survey at the start of this pass. **Every `s.v1` branch already renders under Lime.** No
branch condition reads `s.retro`; the `s.retro` hits are decoration ternaries inside the branch. The
only Lime code in any of them is `HeaderV1`'s `mustard = s.lime ? s.box1 : s.pillBg`.

| Branch | `s.retro` reads | Decoration calls | `pillBg` reads | `s.paper` reads | Shared controls |
|---|---|---|---|---|---|
| `HeaderV1` | 5 (+1 `s.lime`) | 5 | 2 | 2 | 2 `BookPill` |
| `Bio` v1 | 6 | 1 | 0 | 3 | `BookPill` |
| `Media` v1 | 13 | 1 | 0 | 4 | — |
| `Video` v1 | 11 | 1 | 1 | 2 | — |
| `Pricing` v1 | 0 | 1 | 0 | 0 | `BookPill` |
| `Repertoire` v1 | 10 | 0 | 1 | 4 | `Pager` |
| `Gallery` v1 | 2 | 1 | 0 | 0 | — |
| `Calendar` v1 | 9 | 0 | 0 | 5 | `BookPill` |
| `EventsMap` v1 | 15 | 0 | 0 | 5 | `BookPill`, `Pager` |
| `Testimonials` v1 | 8 | 0 | 0 | 2 | `BookPill` |
| `EnquiryForm` v1 | 6 | 1 | 2 | 3 | — |

The traps these counts point at:

- **Under Lime, `pillBg` *is* the accent** (`#AFE335`, layout 1's session 0). Every `pillBg` read above
  is a candidate lime-on-lime pairing. The worst case is **`EnquiryForm` v1, whose sheet is
  `ground = s.pillBg`**: the form's band is lime today, where the frame's is Scheme 4 `#F2FFD0`, and
  everything inked against it moved with it.
- **Under Lime, `s.paper` is `s.tx`** (`paperOf` returns the lightest of `bg` / `tx`), so every flat-
  theme "cream panel" fallback is pale lime. Where the Lime frame draws an olive panel instead
  (bio, media, video, calendar), the branch wants `s.box1` behind `s.lime`, with its own inks.
- **Retro's `v1` branches carry per-width literal type tables** (`T` objects of Retro's tokens behind
  `z = desk ? 0.82 : 1`). Under Lime every size is its token at that width already (`s.dispLg`,
  `s.labelSm`, …; layout 1 *Conventions*, "The ramp is theme-aware"), so a Lime leaf reads `s.*`
  rather than growing a second literal table. `u()`'s `z` switch stays right for boxes.
- **`vm.title` shadows the ramp's `title` size** (layout 1, open question 7). Write Display/Title as
  the frame's own numbers.
- **Card 2's known state** (layout 1, open question 2): legible only since `mustard` became `s.box1`;
  its two-tone title's first word is box1 on `bg` (dim); the face card's body copy is pale lime on
  cream; it still draws Retro's checker ribbon, the Lime seal at Retro's seat, and cream mounts.
  The Lime frame draws none of the ribbon, seal or mounts.
- **Retro layout-2 open question 15**: the media bar's `<Photo>` falls to the initials placeholder
  with `s.muted` ink on a track with no art. Lime seeds every cover, so it is only seen with `&n=8`;
  pass `ink` in the Lime leaf.
- **`HeaderV1` renders under Retro and Lime only** (`headerFamily`), so the header needs the theme=0
  digest and not the flat three's. Every other section needs both.

## Per-session procedure

One section per session, **all three widths together**. Clear context between sections; git and
this file are the memory.

1. Read `CLAUDE.md`, this file, and the reading list at the top.
2. **Section 1 only, first:** `git switch -c lime-layout-2 lime-layout-1` (if the branch does not
   exist yet) and commit this plan there. Then, with the dev server up, take the pass's "before"
   pictures at `theme=1&arch=1` for all eleven categories at desktop (`node scripts/shots.mjs`, see
   layout 1 *Conventions*) and keep them in the scratchpad.
3. `get_metadata` on **all three** of the row's nodes and on its Retro twin's 1440 node, side by
   side. Read them as arithmetic first (Retro layout-4 procedure, step 2). Compare against the twin
   to confirm the tree table above; a child that exists on one side only is decoration to gate or a
   node to add.
4. `get_screenshot` on each node (`maxDimension` 1400–2000). The asset URL is short-lived, so `curl`
   it in the very next call. Load the `figma-design-to-code` skill and run `get_design_context`.
   **Run `get_variable_defs` on all three nodes**, and read fills, strokes, effects and radii off the
   nodes with one `use_figma` read wherever a token or colour looks wrong (layout 1's gallery trap:
   `get_screenshot`'s SVG assets can be in Retro's mode; `exportAsync` is not).
5. **Implement inside the section's existing `s.v1` branch, gated on `s.lime`.** Ternaries or a block
   by layout 1's rule; every Lime-only value behind `s.lime`; desktop numbers × 0.82, 768 and 390
   verbatim. Prefer session-0 tokens (`s.ui`, `s.box1`, `s.glow`, the Lime ramp) over literals, and
   name every literal the mode doesn't carry.
6. **Verify** with the preview harness (`preview.jsx`'s `arch` defaults to 1, but pass it):

   ```
   cd source && npm run dev
   http://localhost:5173/preview.html?cat=bio&arch=1&theme=1&w=desktop     # &w=tablet | mobile
   ```

   - **Look:** compare the Lime frame's render with `theme=1`, reading geometry with
     `getBoundingClientRect()`. Check against **content** edges, not frame `y` (the `padX` / `padY`
     trap in `figma-frame-reading`).
   - **Function:** `theme=1&live=1`, plus `&n=` / `&booked=` / `&open=` where the section reads them.
     Drive every control, and confirm its active, idle and refused states read on Lime's colours.
   - **Nothing else moves:** `node scripts/digest.mjs before 0,2,3,4` before editing and `after`
     after, then `cmp` — **zero differing files** across all 14 categories × every layout × 3 widths.
     Then the same at theme 1: the differing files must all be `_arch_1_` (filter on `_theme_1_`),
     and all this section's category. A theme-1 diff in any `arch_0` file is a layout-1 regression.
7. Commit with the section named in the subject.
8. Set the row's Status to `done <sha>`, add anything the next section needs to *Conventions*, and
   commit that too.
9. **Stop and hand off.** Say the section is closed and that this is the moment to `/clear`, then
   print the next section's opening prompt as a filled-in fenced block:

   ```
   Continue the Lime layout-2 pass with section N, `cat`.

   Read CLAUDE.md, then plans/lime/layout-2.md, then the Conventions of plans/lime/layout-1.md,
   then the Conventions and narrow-masters notes of plans/retro/layout-2.md, then the
   `figma-frame-reading`, `verifying-the-published-tab` and `browser-tool-choice` memory notes,
   and follow the per-session procedure there.

   The three Lime masters are `<desktop node>` (<W> × <H>), `<tablet node>` (768 × <H>) and
   `<mobile node>` (390 × <H>) in Figma file uFoUbPaBrDicjyuSBEbtGT; the Retro twin is
   `<retro node>`. Fit them inside the existing `s.v1` branch of `<Component>` in
   EncoreSection.jsx, gated on `s.lime`. Themes 0, 2, 3 and 4 must digest to zero rows, and
   theme 1 may differ only in `<cat>` arch 1.

   <the two or three conventions most likely to bite this section>

   Branch: lime-layout-2. Do not refresh the root index.html.
   ```

Do **not** refresh the root `index.html` per section. That is one deliberate step at the end of the
pass, with the two-build digest in layout 1's *Learned on the end-of-pass sweep*. Expect zero rows at
themes 0, 2, 3 and 4. The seeded `EXAMPLE_PAGE` is arch 0 throughout, so at theme 1 as well the page
walk will show **no** difference: prove this pass shipped by choosing card 2 in the setup modal of
both builds (Retro layout-2's *Learned on the end-of-pass refresh*: "a two-build diff of the seeded
page proves the absence of a regression, not the presence of the new work").

### The first session: the header

`HeaderV1` is where deliverable 3 is met, so its verification is the builder's, not only the
harness's. With chrome-devtools MCP or a puppeteer script (layout 1's sweep notes give the route and
the selectors):
- the setup modal still shows **four** Lime cards, and card 2 renders the fitted header
- choosing card 2 opens the editor on a page whose every section is arch 1
- publish, then in the popup: every nav link scrolls, the burger opens at 390 (and at 768 only with a
  viewport of 800 or more — layout 1's `clientWidth` trap), Book Now reaches `#form`
- the Retro header at theme 0 digests to zero rows

The header also settles the **hard offset shadow** call for `BookPill`, above.

## The end-of-pass sweep

Written when section 11 closes, from what the sections defer. What it will contain at least:

1. **CLAUDE.md and README.md**, wherever they describe a layout-2 state as Retro's alone.
2. **`plans/README.md`:** mark the pass closed.
3. **One whole-page published check under Lime at layout 2**: builder → Lime → card 2 → Publish →
   Open, then every `s.v1` control on the page, and the band edges against their real neighbours
   (the repertoire's olive sheet and the form's pale band are the two full-bleed ones).
4. **The layout-picker thumbnails** for arch 1 under Lime (deliverable 4).
5. **The other three header cards** still render and publish, since this pass will move shared
   components (`BookPill` at least).
6. **Refresh the root `index.html`** with the two-build digest.

## Conventions

Everything a fresh session would otherwise have to work out again. Append to this list as the pass
goes on.

- **Layout 1's conventions all hold.** The gate is `s.lime` and composes with `s.retro`; Lime reads
  the fitted structure and widens a Retro gate rather than redrawing what the frame shares; never edit
  a Retro literal to make Lime look right; the harness's `theme` is a numeric index (Retro 0, Lime 1).
- **The page walk is cheap, and it answered the pass's first question.** One `use_figma` read per
  page — main component, `explicitVariableModes`, fills, full-width vectors — plus one depth-6
  `type:name` multiset comparison per section pair. Similarity near 1 means "same tree, dress it";
  a low score has to be read for *what* is missing before it means anything (the header's 0.20 is
  132 checker cells). Re-run it rather than re-deriving a section by eye.
- **Layout 2 is a dark page.** Every section but the repertoire's sheet and the form's band stands on
  `#15180F`, with olive panels on it. There are no seams; `ArcEdge` is layout 1's alone.

Settled in section 1 (the header):

- **The first layout-2 block: `if (s.lime) { … return }` at the head of `HeaderV1`**, the footer's
  placement — the component *is* the v1 branch, and it has no state to share (`navHref`, `NavMenu`,
  `BookPill to=`, `ListenLink to=` are the whole live seam). Count-the-leaves said block: the photo
  card loses the mount, rail, tilt, grain and seal and gains a glow; both sub-cards change fill,
  stroke, radius and padding; every nav leaf changes face or ink. Retro's code below it is
  untouched but for `mustard`, which is plain `s.pillBg` again (its `s.lime ? s.box1` arm is
  unreachable now).
- **No Device override on any of the three instances, and no box token.** `get_variable_defs` matches
  `THEME_RAMP.Lime` at all three widths (dispLg 130 / 81 / 54, labelLg 32 / 21 / 14, list 24 / 19 / 18,
  bodySm 13 / 13 / 12), so every leaf reads `s.*` and there is no `tk` table. Radii 50 (photo, wide
  cards) / 30 (narrow cards) / 20 (tiles) and every padding are raw numbers: × 0.82 on desktop through
  a local `u()`, verbatim below. Expect the same of most sections; check each `modes` read anyway.
- **The photo glow is confirmed off the node**: `INNER_SHADOW` radius 34, spread 0, `#AFE335` (`s.ac`,
  not `s.glow`), on an overlay span over a `s.box3` well, × 0.82 on desktop. The desktop frame crops
  its photograph `left −19.04%` at `w 185.61%`, which is `objectPosition: '22% 50%'`; the narrow
  masters cover-centre.
- **Every `sem/stroke/2` rule is an inside stroke, drawn as `inset 0 0 0 1px`** on the box (chip,
  capsule, cards) or on an overlay where an image would paint over it (the avatar tile), so each
  stated height stays the frame's.
- **The Scheme 4 nav pill recipe**, which the bio's identical 115 × 35 pill inherits verbatim:
  `bg={s.tx} fg={s.bg} size={s.labelSm} disc={27.6 * k}` plus
  `style={{ padding: 4.27 / 4.27 / 4.27 / 17.92 × k, gap: 8.53 × k, lineHeight: 1.1 }}`, with `k`
  0.82 / 1 / 0.7547 (the 390 master hand-shrinks the 768 pill; its 12.07px Anton type is a fallback
  face, and `s.labelSm` 12 stands in). The hero's "Enquire about a date" is `BookPill`'s Lime defaults
  exactly, `full` at 390.
- **The capsule's links hold one row by budgeting the whole bar, and the name slides off centre only
  when it has to.** The frame centres the wordmark between two equal cells, and a cell is far too
  narrow for the artist's section names: sized against the cell, the seeded nine hit the 12px floor
  and wrapped to two rows in the editor (cell 420), the setup modal's card 2 and the published 1440
  (cell 466). So the nav row is the query container, the links' size is
  `clamp(12px, (100cqi − reserve) / s.navEms, s.labelSm)`, and the left cell's `minWidth` is that one
  row (`min()`'d with the room, so below the floor it stops and the capsule wraps). `reserve` is the
  name and Listen + the pill's label in their own Bebas ems — **two new Lime-only vm keys,
  `s.navNameEms` and `s.navCtaEms`**, beside `navEms` in `sectionVm` — plus every fixed box beside
  the links (138.32 × z). Result: the harness's six sit at 15 with the name centred; the seeded nine
  sit at 15 on one row everywhere, the capsule 630 wide in a 637 cell, the name to its right.
- **`ListenLink`'s base `fontWeight: 700` synthesises a bold on Bebas Neue**; pass `fontWeight: 400`
  with `labelStyle`. The 768 master's three nav links are the component's default again, so 768 keeps
  the burger in the capsule, as Retro's does.
- **Under Lime the digest's header arch 5 folds onto arch 1** (`HEADER_COUNT.lime` is 4), so a
  layout-2 header change is six theme-1 files, not three; the arch 5 files were byte-identical to arch 1.
- **Named diffs.** The seeded subtitle is longer than the frame's, so it runs 2 / 3 / 3 lines against
  1 / 2 / 2: the desktop cards come out 267 tall against 287, the 768 identity block is taller (still
  centred on the cards), and the 390 section is 945 against 890 plus our `padY`. The hero pill is 205
  against 201.7, and the 390 nav pill 82 against 91 (Bebas against the master's Anton). The card copy
  ("The face of the act", "Same person you'll meet…", "Available across the UK…") stays Retro's
  literals, as in the frame.
- **Measured against the masters' content edges**: desktop capsule top 32.4 (39.47 × 0.82) and 29.6
  tall, spread at 128 (156 × 0.82), photo 503 × 564.2, chip 25.2, h1 107px at 167.9, nav pill 95.2 ×
  28.6 flush right with Listen 9.9 before it, cards' tiles 87.7 and 72.2 × 73 at 21.3 / 23 in, the
  wordmark centred at 590; 768 nav 36, spread 100, photo 688 × 511, cards 314 × 140 / 141 at 667 and
  823 (the frame's own), pill 102.6 × 34.9; 390 nav 11, spread 90, photo 346 × 236, chip at 362, h1
  at 408.8, cards 346 × 120 / 121.
- **Verified in the builder** (one puppeteer script, deleted): the setup modal offers four Lime
  cards and card 2 draws the `#C7FF3C` place card and the `#101309` well with no checker (cards 3
  and 4 still carry the ribbon — unfitted); after *Use this header*, *Back to page list* shows every
  section at "layout 2" and the footer at "layout 1". In the published tab at 1440 the header's
  twelve fragment links (nine nav, Listen, Book Now, the hero pill) called `scrollIntoView` on
  twelve matching ids, Book Now and the hero pill on `form`; at 390 the burger opens a nine-link
  panel whose links scroll; at 820 (fresh tab) the burger stands in the capsule and opens. No page
  errors. Digest: themes 0, 2, 3 and 4 zero files; theme 1 exactly header arch 1 and arch 5 at
  three widths.

Settled in section 2 (the bio):

- **The second layout-2 block: `if (s.v1 && s.lime)` ahead of Retro's `if (s.v1)` in `Bio`**, layout
  1's seat for the same section. `Bio` has no state, so the whole live seam is `BookPill to=`. Retro's
  tree less its `image #` grain; roughly twenty leaves change, so a block, and the diff is pure
  additions (137 / 0).
- **A chip standing on `s.box1` takes `s.box2` as its dark seat.** `vm.chips`' dark seat is
  `T.tags[0]`, `#2E3928`, which is the olive card itself. The Tags instance's own fill is
  `sem/box/2`. The lime seat and both inks stay `vm.chips`' (`c.bg` / `c.fg`); the frame's `#C7FF3C`
  and `#15180F` on its third and fourth chips are other schemes' tokens leaking through the
  component, not a third seat. Any later section that drops `vm.chips` onto an olive panel meets this.
- **A hand-scaled instance is not the ramp.** The Tags instance is fixed at 264.4 (× 0.7686), so its
  type is 15.37 / 10.76 / 9.22 (Chakra Petch, 1.26), padding 3.84 / 8.45, radius 4.61, gap 6.15 —
  raw per-width numbers, `u()`'d on desktop, not `s.labelXs`. `get_variable_defs` does not say
  this; the node walk's `fontSize` does.
- **The 115 × 35 pale pill is not always hand-shrunk at 390.** The header's 390 pill was (`pk`
  0.7547); the bio's is the same 27.6 disc and 4.27 / 17.92 padding at all three widths, and only
  Label/SM ramps (18 / 14 / 12). So `k` is 0.82 / 1 / 1 here. Read `Frame 174`'s size per master
  before reusing either recipe.
- **Open question 2's route 1 is taken: the hard shadow goes through `style`.** The 768 and 390
  pills carry `DROP_SHADOW 5/5 r0 #15180F`, which reads on the olive card; the desktop pill carries
  none (read off each node's `effects`, and the fig-t render shows the block). `boxShadow:
  5px 5px 0 ${s.bg}` on `nar` only; `BookPill` is untouched. The calendar's `#AFE335` shadow should
  do the same.
- **The frame's photo crop is `limeStage`'s crop.** Every master's `imageTransform` is
  `[[0.502, 0, 0.183], [0, 1, 0]]`, the exact slice layout 1 exported, so a centred cover is the
  frame's own picture at 433 × 648, 708 × 700 and 370 × 390. No `photos.js` change. The frame's two
  nested clips (55 outside, 47 inside, one size) draw the 55.
- **The soft drop shadow is drawn** (`1.25 / 1.25 / 10.81` at 16% black, × 0.82): a PIL scan of the
  1440 render darkens the ground from 21 to 19–20 for ~6px beside and under the card.
- **The leaked 637.5 × 39 credit box is followed as a `minHeight`** at all three widths. It sets the
  foot row's height and stands the line high beside the centred pill; without it the desktop chips
  sat 2.8 low.
- **The caption's `⏵⏵` is typed** (pricing's typed-tick rule) and renders in a fallback face in
  the harness. The disc is 36 × 36 on desktop and hugs its line at 36 × 18 below it (Retro's note).
- **Measured against the masters' content edges**: desktop text card 672.4 × 531.4 (648 × 0.82;
  37 narrower, our content width), /Featured 25.8 tall at 24.6 in, paragraph at 71.3 (71.2), chips
  at 399.1 (399.6) on a 26.9 pitch, pill 95.2 × 28.6 flush right, photo card 355 × 531.4, caption
  322.3 × 76.8 at 16.4 from the foot; 768 pill 102.6 × 34.9, photo 688 × 700, caption 81.3, stack
  gap 30; 390 /Featured 69 × 24.5, pill 96.2 × 34.9 standing 125.5 under the chips (126.4), photo
  346 × 390, caption 72.2. The text cards run shorter than the frames' by the seeded paragraph,
  which is a line or two shorter than the frame's. `live=1`: the pill is `<a href="#form">` (a
  span on the canvas) and carries the shadow at 390 only. No page errors. Digest at themes 0–4, all
  810 renders: exactly bio arch 1 at theme 1, three widths.

Settled in section 3 (the media player):

- **The third layout-2 block, and the first *inside* a v1 branch: `if (s.lime)` within `Media`'s
  `if (s.v1)`, after `nowArt`** — the gallery's layout-1 placement. `CARD`, `step`, `seat`,
  `anchor`, `centre` / `nowTitle` / `nowArt` and `u` / `off` / `pad` are computed in the branch, and
  the player hooks above it, so all of them are shared whole and the published fan, bar and list
  needed nothing new. That was only safe because **Lime's five fan cards stand at Retro's exact
  offsets, sizes, angles and opacities at all three widths**: one `use_figma` over both pages'
  carousel instances (card centres against the band's centre, `rotation`, `opacity`) returned
  identical numbers, including Retro's 390 step. Retro's `FAN`, `ROWS`, `panel` and `ink` are not
  read. The diff is pure additions (288 / 0).
- **`tilt()` is Retro's alone, so a Lime fan writes its angle out**: `rotate(${k * 5.33}deg)`,
  the emitted (CSS-clockwise) sign. The plan's "no tilt" is about Retro's decorative lean. The
  fan's rotation is the composition's, and the Lime frame draws it.
- **Scheme 2 by node**: the panel is its `sem/bg`, `s.box1`; the cards, the bar and the bar's
  inner pill are its `box/1` `#394732`, which is Scheme 1's `s.box2`; every artwork well is its
  `box/2` `#43523B`, the testimonials' `dusk`, still a local literal. The stroke is `s.stroke1`.
  Every artwork passes `ink={s.tx}` on the `dusk` well, which **closes Retro layout-2 open
  question 15** under Lime: `n=8` draws "KM" tiles that read.
- **The heading's ink flips by width**: `sem/text/2` (`s.tx`) at 1440, `sem/text/1` (`s.ac`) at 768
  and 390. `get_variable_defs` lists both tokens at the narrow widths, and the text node's fills
  settle which one applies. The 4.6em measure (layout 1's) breaks it after "worth" at 1440 and 390, and 768 sets it on
  one line with no cap. The 390 master's own box is 251 wide at 54 (4.65em).
- **The 1440 `Section` carries a 5px `#AFE335` top stroke that renders nothing** (the render samples
  flat `#15180F` in the top rows), so it is a hidden paint and is not drawn. Sample before
  believing a node's `strokes`.
- **The bar's glow is confirmed off the node**: INNER_SHADOW 14, spread 0, `#AFE335` = `s.ac`, not
  `s.glow`. It is one `boxShadow` with the 1px ring, on a last-child overlay, so it paints over
  the children as Figma does and the stated 108 stands. The inner pill shares the bar's fill, so
  it reads only as spacing.
- **`LimeTransportGlyph`** (beside `LimeSkip`, which is layout 1's smaller, different skip) is
  "Group 4" transcribed: skip 27.81 × 14.56, pause 12.88 × 14.56, 24.28 apart, back = skip turned
  180°. The frame never draws Play, and the live paused state needs one. It is a single
  triangle in the pause's own 12.88 box, so the swap moves nothing. The canvas keeps Pause, the
  frame's mid-song picture, as Retro's does.
- **Body/Chip tracking is `-0.06em`** at `s.chip`, so it ramps with the token (Retro froze
  `u(-0.72)`). Every list/fan type is the Lime ramp's `s.*` except Display/Title, which is the
  frames' 36 × 0.82 / 28 / 26 (`s.title` is the heading string).
- **The featured tag sits at the frame's 26.5 / 26 off the card's edge.** Retro's `u(25.5)` /
  `u(25)` stand inside its 1px border, and a card whose ring is an inset shadow has none to
  stand inside. Any Lime redress of a Retro bordered box meets this.
- **Two named departures, both for the bar's title.** (1) Desktop does not split the columns
  `629fr / 529fr` as Retro does. Our columns come to 953.6 against the frame's 990.6 (1208 × 0.82),
  and the split left the bar's title box 86 wide where the seeded "Slow Burn" needs 102 at 29.52.
  So the left column is the frame's `u(629)` and **the list takes all 37**: 396.8 against 433.8,
  its title column still 254 for "Late Lights". (2) At 390, on top of Retro's override (clock and
  icons dropped, transport gap 14, inner right padding 0), the bar's side padding closes 20 → 16
  and the inner pill's left 10 goes. Those 18px take the title box from 74 to 92, and "Slow Burn"
  is 90 wide at 26. The list rows' 390 gap is Retro's 14 as well; the master keeps 20 and
  hard-clips its titles.
- **The number keeps a 21 slot**, the widest of the frame's hugging numbers ("03", "04"), so the
  art lands within 3px of the frame's x and the live Play/Pause swap moves nothing.
- **Row rules are top-only**, `inset 0 1px 0 s.stroke1`, so the 14 padding stays the frame's and
  the last row has nothing under it, as in the render. The counter row's middle "Frame" is an
  empty spacer, not a rule.
- **Measured against the masters' content edges**: desktop panel 650.3 (793 × 0.82), heading 190.4
  (232 × 0.82) at 107, fan band from 239.6, 253.2 tall (309 × 0.82 less the 24 gap's rounding), bar
  at 512.5 (625 × 0.82) and 88.6 tall, left column 515.8, list at x 606 with rows 102.9 (125.6 ×
  0.82) under a 37.2 counter; 768 panel 1448.1 (1448), heading 72.1 at 81, fan at 142.1 (142),
  bar at 634.1 (634), list at 792.1 (792), rows 110.4, counter 44; 390 panel 1372.1 (1372),
  heading 96.1 at 54 on two lines, fan at 86.1 (86, the −50 leaving 61 clear of the centre card),
  bar at 578.1 (578), list at 736.1 (736), rows 110.6. The bar's title box is 106 / 114 / 92 for
  "Slow Burn" at 102 / 114 / 90.
- **`live=1` at desktop and 390** (puppeteer with `--autoplay-policy=no-user-gesture-required`,
  probe scripts deleted): the outermost card, clicked on its visible edge (the rotated bounding
  box's `x + 12` misses the card, `x + 45` does not), deals Echo & The Floor to the centre and
  plays it. A list row plays, and clicking it again pauses (the toggle glyph goes pause `rect`s →
  play `path`). Next and back step, back wraps from track 1 to Roomtone, and the centre card, the
  bar and the row's glyph follow together. The clock runs from the element at desktop, and cursors
  are live-gated: the canvas section has zero pointer cursors. `n=0`: the counter alone, and the
  390 section drops to 907. `n=1`: one card, no clip. `n=8`: the fan clips at the column (Retro's
  rule), the desktop rows share the stretched column at 64.5, and 390 grows to 1643. No page
  errors. Digest at themes 0–4, all 810 renders: exactly media arch 1 at theme 1, three widths.
- **The track art in the harness is the neutral crops** (`ROW_ART.media` = `RETRO_TRACK_ART`, layout 1's open question
  3), not the frame's album covers, so the look check compares composition and not pictures.

Settled in section 5 (the repertoire):

- **The fourth layout-2 block, after the seam: `if (s.lime)` within `Repertoire`'s `if (s.v1)`,
  after `pageWindow()`.** `active`, `filtered`, `pg`, `shown`, `columns`, `labels` / `at` and Retro's
  `u` / `desk` / `tab` are shared whole, so the published search, chips and pager needed nothing new.
  **The Lime frames' insets are Retro's to the pixel** (56 / 30 / 10 across, 56 / 60 / 40 over the
  head, 56 / 60 / 20 round the pager), so `padH`, `headPadY` and `footPadY` are read too. Retro's
  `sheet`, `ink`, `hue`, `chipRow` and `searchBox` are not. Pure additions (154 / 0).
- **Every size is a ramp token** (`get_variable_defs`: display-sm 50 / 40 / 32 = `s.dispSm`, list
  24 / 19 / 18 = `s.list`, label-sm = `s.labelSm`, body-md 14 / 13 / 13, body-sm 13 / 13 / 12). The
  heading is Display/SM in `sem/text/2` (`s.tx`), lh 1: **pale, not lime**, where layout 1's is lime.
- **Every hairline is `sem/stroke/1` drawn as an inset shadow**, sampled off the 1440 render: the
  head's ring on **all four sides** (it shows at both page edges and under the head), each row's
  foot, the divider down the inside of the left column (`inset -1px 0 0`), and the toggle's and
  field's rings. Nothing closes the sheet under the pager, where Retro draws a hairline.
- **Rows pin at each master's division result**: 83.2 (× 0.82 = 68.2) / 82 / 59, Retro's 84.2 / 82.6
  / 58 being its own frames'. The number hugs in the frame (7–9 wide); it is a `minWidth` of 9 (8 at
  390), so the title lands at 64.9 / 53 / 32 against the frame's 63.1 / 51–53 / 30–32 (the
  desktop "1" hugs at 7 × 0.82) and "10" pushes its own by ~4. The toggle wraps with Retro's
  `rowGap` 6, a state no frame draws.
- **The pager is `Pager`'s Lime branch with `grow` and no `frame.lime`**: the sheet is Scheme 1's
  `box/1`, which is what the defaults were written for, and the frame's pills (`box/2`, the glow-lit
  current one, the ringed arrows, radius 60 at 54 tall) are that branch exactly. This **closes the
  layout-1 note that repertoire a1's pills stretched and its arrows vanished** on Retro's pale
  sheet under Lime.
- **The field's glyph is the typed `⌕`**, as the frame types it (the bio's typed-tick rule), not
  layout 1's transcribed search vector, and its 10 vertical padding is dropped for Retro's reason
  (a 36 box round a 21 line).
- **Measured against the masters**: desktop section 650.2 (792 × 0.82 = 649.4), head 173 (172.2),
  field 311.6 × 29.5, toggle 30.2 tall (29.5; the ramp's 11px body-sm), rows 68.2, pager 44.3 tall at
  46 in; 768 section 792.2, head 208.2, toggle 36.2, field 380 × 36 at x 358, rows 82, title at x 53,
  pager 54 at 60 down its 174 band; 390 section 593.8 (594), head 204.8 (205), field 370 × 36 at 128.8
  (129), rows 59, title at x 32, pager band 94. `live=1`: the pager steps and lights, a page-number
  click past the end does nothing, chips filter and relight (Weddings leaves one page, so no pager),
  search and chip combine, a no-match search shows the message (the live `::placeholder` at .45 is
  Retro's accepted diff, as in layout 1); `n=30` pages 1 → 2 → 3 → 2 at 390;
  `n=0` shows *No songs yet.* at 768. No page errors. Digest at themes 0–4, all 810 renders:
  exactly repertoire arch 1 at theme 1, three widths.

Settled in section 6 (the gallery):

- **The first layout-2 section with no block: `s.lime` ternaries through `Gallery`'s `if (s.v1)`.**
  One `use_figma` walk of all three instances (fills, strokes and their per-side weights, effects,
  radii, paddings, gaps, text) returned Retro's twin's numbers at every node: gaps 24 / 14, radii
  30 and the 390 rail's 10, the pill's 4 / 10·14 / gap 4 at 40 in, the 768 head's 20, the 390 rail's
  ten tiles. Only paint and type differ, and `Grain` already returns null outside Retro. So
  count-the-leaves said ternaries, seven of them: `bw` widened to `(s.retro || s.lime)` (Lime's
  `s.bw` is 2; the frame strokes 1 inside); the hero ring `s.ac` where Retro's is ink; a `well`
  (`s.box3`) passed as `Photo`'s `style`, which only an empty slot shows; the caption's fill
  `s.box1` and its ink gate widened to `s.tx`; and the caption's and the 768 head's type,
  `s.chip` at `-0.06em`. The glow is one new `s.lime &&` overlay. The diff is 27 / 10, and the
  five-theme digest is its proof.
- **`size/chip` is 13 / 12 / 11 on these masters, which is `s.chip` exactly** (13 × 0.82 rounds to
  11), so Body/Chip needs no per-width table. Retro's `u(desk ? 12 : 11)` stays Retro's.
- **The hero glow is confirmed off the node**: INNER_SHADOW 34, spread 0, `#AFE335` (`s.ac`), on the
  image frame that *contains* the caption. It is a last-child overlay after the caption, the media
  bar's reading of Figma's paint order, × 0.82 on desktop. The frame's 4 and 3 radii on the inner
  image frames are clipped by the 30 outside (nested clips: the largest draws).
- **The 768 head's 204 × 1 spacer carries no paint**, so dropping it with Retro's *View list* and
  `✕` loses nothing. *Gallery* is title case in Inter Bold at Body/Chip, `s.tx`.
- **Photography needs nothing**: the hero's hash is `3a59b4d1`, `limeGallery4`, which is slot 3 and
  `galActive()`, so the canvas opens on the frame's own hero. The six tiles are Retro's shared
  strip in the frame too; their order is the seat rotation's, Retro's accepted diff.
- **Measured against the masters' content edges**: desktop row 478.1 (583 × 0.82), hero 605.9 (the
  37 out of the hero, Retro's rule), caption 33.8 in from the hero's outer edge (40 × 0.82 plus the
  1px ring) at 11px, glow 27.9; 768 hero 333 × 392, caption and head 12px, the head's text 4 down
  its 20 row (the frame's own), grid 358 under it; 390 hero 249 × 284, tiles 36.5 × 88 at 10. `live=1`
  at desktop: three tile clicks rotate the hero through three slots, a hero click changes nothing
  (the glow's `pointerEvents: none`), no page errors. `n=0` at desktop and 390: dark wells, `KM`
  in `s.muted` reads on them, the glow and caption stand. Digest at themes 0–4, all 810 renders:
  exactly gallery arch 1 at theme 1, three widths.

Settled in section 7 (pricing):

- **The fifth layout-2 block, after the seam: `if (s.lime)` within `Pricing`'s `if (s.v1)`, after
  `sel` / `t`.** Those two and `desk` / `u` are shared whole, so the published package toggle and the
  pill needed nothing new. Retro's `T`, `h` (`vm.tierHero`), `chipType`, `left` and `card` are not
  read, which closes session 0's "the pricing session overrides" for layout 2 the way layout 1
  closed it. Pure additions (154 / 0).
- **No `T` table and no literal.** All 24 type numbers from the three `get_variable_defs` are
  `THEME_RAMP.Lime` exactly (desktop chip 11 / dispMd 59 / dispSm 41 / bodyLg 13 / bodyMd 11 /
  labelXs 16 / eyebrow 12 / list 20). Scheme 1 throughout: card `s.box1`, ring `s.stroke1`, heading
  and numeral `s.ac`, everything else `s.tx`. The one bound box token is the chips' `radius/chip`
  (`s.radiusChip`); card radius 50, padding 42 (`30px 20px` at 390), gaps 30 / 14 / 48 / 32 / 24 are
  raw. **No tilt** — Lime's `right` has no rotation on any master, where Retro's turns −3° / −1°.
- **The frame's selected chip is invisible, so it is redrawn.** `toggle-a`'s fill is
  `sem/tag/1/bg`, `#2E3928`, the card's own colour; both chips are outlined lime and read the same.
  The picked chip is `sem/active` (`s.pillBg` / `s.activeFg`, layout 1's Lime chip pair), the idle
  ones the frame's 1px `s.ac` inset ring. The canvas pins chip 0, so its picture shows one filled
  chip where the frame shows two outlines: the intended diff. Section 6's "redraw live states" rule
  of layout 1, met again in a frame that never drew the state at all.
- **The instance carries a 1px `sem/stroke/1` inside ring on all four sides** — the only one of the
  ten layout-2 sections that does, and it renders (row 0 and column 0 of all three renders sample
  `(54, 58, 44)`). **Declined**: Retro's twin carries the same ring in `#111` at all three widths,
  and Retro's branch never drew it; it is the component frame's stroke, and stacked bands would
  double it. The footer's layout-1 top hairline is a different case (one side, the band table's
  edge).
- **The pill is `BookPill`'s Lime defaults exactly** — `<BookPill s={s} to={s.tierBookTo}
  full={s.mob} />`. Retro's `bg` / `fg` / `disc` / `size` would all be honoured by the Lime branch
  and repaint it wrong. "3 dates open…" stays dropped (Retro's claim rule), so the 390 master's
  stacked cta-row has nothing to stack.
- **The narrow price row FILLs its numeral**, standing the unit at the card's right edge (layout 1's
  Lime pricing rule again); 1440 hugs. Emptied content drops its node (symbol, unit, blurb, quote,
  small print; the rule and the includes block go with an empty feature list), where Retro's branch
  keeps empty spans. The frame's last three features in Body/MD are normalised to Label/XS.
- **Named diffs.** The credit row is dropped (Retro's), so the 768 card stands at 218.5 against the
  frame's 263 and the 390 one at 220 against 265. The desktop card is 540.7 wide against 640 × 0.82
  = 525 (our content width split by the same `flex: 1 1 0`). At 390 our 306 measure wraps the
  seeded third chip onto a second row. The seeded heading wraps on its column, where the frame's
  break after "Personalised" is typed.
- **Measured against the masters' content edges**: desktop chips 24.2 tall (23.8) at 34.4 in (42 ×
  0.82), heading at 27.4 (27.1), pill 130.5 × 44.3, card 419.2 tall for the seeded content; 768
  chips 28 at 42 in, pill 142.1 × 54, name 40, numeral 50 with the unit flush right; 390 chips 27 at
  20 in, pill 138.9 × 54 (`full`), numeral 40, features 12. `live=1` at desktop and 390: each chip
  swaps name and price (450 / 650 / 1,200) and moves the lime fill, the lit chip reads `#0D1F03`,
  cursors are live-gated (the canvas chips are `auto`), the pill is `<a href="#form">`. `n=0` keeps
  the card with *No packages yet.* and drops the rule; `n=1` draws no chips; `n=8` wraps the chips
  to three rows at 390. No page errors. Digest at themes 0–4, all 810 renders: exactly pricing
  arch 1 at theme 1, three widths.

Settled in section 8 (the booking calendar):

- **The sixth layout-2 block, after the seam: `if (s.lime)` within `Calendar`'s `if (s.v1)`, after
  `want` / `hit` / `cur` / `line`.** Those and `desk` / `z` / `u` are shared whole, so the published
  row picking, the head's links and the foot pill needed nothing new. **Every box is Retro's twin's**
  (`get_metadata` arithmetic: head `28 + 62 + 28 + (text + 20) + 36`, column head `18 + line + 18`,
  rows `16 + line + 16`, foot 100 / 100 / 84, insets 40 / 40 / 10, the rows' 66), so `padX` and
  `gap` are read too. Retro's `T`, `dateCol`, `panel` … `hue`, `flow`, `head`, `colHead` and
  `slotRow` are not. Pure additions (143 / 0).
- **No `T` table**: all 24 sizes on the three masters are `THEME_RAMP.Lime` (dispMd 72 / 50 / 40,
  dispLg 130 / 81 / 54, labelXs 20 / 14 / 12, bodyLg 16 / 15 / 15, bodyMd 14 / 13 / 13, bodySm
  13 / 13 / 12, chip 13 / 12 / 11, list 24 / 19 / 18). The mark is `s.dispLg` at lh 0.89; the chip
  tracks `-0.06em`.
- **Scheme 2 by node, and its inks are not the obvious keys.** The panel is `sem/bg`, `s.box1`, at
  radius **50** (Retro's twin is 30) with no ring and no effect. The head band is `s.ac` and
  **every ink on it is `s.box1`** (Scheme 2's `sem/bg`, not `s.bg`). The foot chip is `s.ac`
  with a `s.box1` label, not `pillFg`. Column heads are `s.ac`, rows `s.tx`, hairlines `s.stroke1`
  as bottom inset shadows, so every stated height holds.
- **The heading's `sem/stroke/2` rule is declined**: it is `#AFE335` on the `#AFE335` band and
  paints nothing (the header's nav-pill shadow case). Its 20 of padding stays.
- **The pin is re-measured for Bebas Neue, and the frame's 350 is not followed.** The widest mark
  is `MAR 01`: 299.3 at 130, 246.3 at 107, 186.5 at 81, and `JUN 12` at 54 is 110.9, the 390
  frame's own hug, which proves the face. The frames state 350 at 1440 *and* 768. At 1440 that
  clears Bebas; at 768 it is the desktop number leaked (the row is 350 + 66 + 69 + 66 + 77, the
  whole inner width), and our 608 column would leave the weekday 46. So the pin is
  `u(desk ? 301 : 187)`, Retro's measure-don't-transcribe rule. The cost is that the desktop
  weekday stands at 333.7 against the frame's 374. The Lime frames' column head lines up with the
  weekday by construction (418 = 350 + 66 + 2), which the shared pin reproduces exactly.
- **The pill is `BookPill`'s Lime branch with Scheme 2's pale recipe**: `bg={s.tx} fg={s.box1}
  discFg={s.ac} full={s.mob}` plus the hard block through `style`. The branch's own `k` gives
  the frames' 54-tall box and `s.list` label at all three widths: 150.6 × 44.3 / 161.2 × 54 /
  157.1 × 54, the last being the 390 frame's exact 157. None of Retro's `disc` / `size` / `glyph`.
- **A blocked slot takes layout 1's Lime state**: opacity .38 on the row's three children, no
  strike, no handler (Lime's layout-2 frame draws none; Retro's branch strikes and mutes). The
  row's hairline stays at full strength. The emptied list prints *No dates yet.* at the same .38.
- **The 390 foot stacks, Retro's departure**: the master leaves the composed line 63px beside the
  157 pill (346 − 40 − 157 − 16 − 58 − 12), which would break inside "Thursday,". The foot is 129
  against the frame's 84.
- **Measured against the masters' content edges**: desktop column head 49.8 (61 × 0.82), rows
  121.4 (148 × 0.82), foot 82, h2 59 at 98.8 in; 768 column head 53.6 (54), rows 104.1 (104),
  foot 100, h2 at 571 wide; 390 column head 51.1 (51), rows 95.2 (95), marks 48 tall. Every head is
  one heading line shorter than its frame (203.7 / 224.6 / 210.4 against 260.8 / 274 / 251), since
  the seed prints AVAILABILITY where the frame sets a two-line sentence. `live=1` at desktop and
  390: a row click moves the chip and the line to JUN 14, a second click falls back to the cued
  JUN 12, the pill is `<a href="#form">`, and the flow is `span` (this section) plus `#pricing` and
  `#form` links. `&booked=2025-06-14,2025-06-12`: both rows dimmed with `cursor: auto` and no
  state change, the chip is gone and the foot prints the prompt. `n=0` at 390 and 768 and `n=8` at
  390 all hold. No page errors. Digest at themes 0–4, all 810 renders: exactly calendar arch 1 at
  theme 1, three widths.

## Open questions

1. **`tags` and `audio` have no layout-2 frame** on Lime's page, as on Retro's. They keep their
   generic `v1` in Lime tokens. Check once, in the sweep, that they are legible at `theme=1&arch=1`,
   the way layout 1's session 0 checked their `v0`; do not design them.
2. **The hard offset shadows** (header nav pill, calendar foot pill) contradict layout 1's "Lime has no
   hard offset shadows". The header session decides how `BookPill` draws them, or whether they draw
   nothing on this ground.

   *Settled in section 1:* the header's draws nothing — `#15180F` on the `#15180F` page, sampled
   flat under the pill in the 1440 render — so it is not drawn, and **`BookPill`'s Lime branch is
   untouched**. The calendar's (`#AFE335` on `box1`) does show; that session either passes
   `boxShadow` through `style` (no shared change) or makes the Lime branch honour `shadow`. The
   second is only safe with the five-theme digest as its proof: Retro-era callers pass `shadow`
   into branches Lime still renders unfitted (the other sections' v1–v3 and `HeaderV2` / `V3`),
   and every one of them would start drawing under Lime. Find them with
   `grep -n "shadow=" EncoreSection.jsx`, not a one-line `BookPill.*shadow=` grep, which misses
   the multi-line props.

   *Section 2:* the bio's 768 and 390 pills carry the same `#15180F` 5/5 shadow on the olive card,
   where it shows, and took the first route (`boxShadow` in `style`). The calendar should follow.

   *Section 8:* it did — `boxShadow: ${u(5)} ${u(5)} 0 ${s.ac}` in `style`, at all three widths.
   **Closed**: `BookPill` never learned `shadow` under Lime.
3. **The form's `photo` slot seeds the wrong picture** (`limeStage` where the frame shows the full
   `f821adc2`), and the video poster seeds `limeStage` where the frame shows the hero. *The video
   half is moot: the section is being removed from the project (row 4, dropped).* Both are
   `photos.js` one-liners once the files exist; the form may need a new export.
4. **The footer is shared with layout 1**, and that is structural rather than a Lime decision
   (`NVAR.footer` is 1). If a later Lime page draws a different footer, it will need an `NVAR` bump
   first.
