# Lime layout 1 — section-by-section plan

This is the working checklist for bringing **layout 1** of the Lime template up to its Figma
designs, the way Retro's four passes did for Retro. It runs one unit per session, clearing
context between units.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then these
Retro sections, which are background for how the shared branches were built:
- the *Conventions* of [`../retro/layout-2.md`](../retro/layout-2.md), the one that defines the
  `v0`/`v1` branch idiom, the × 0.82 rule and the harness
- the *Per-session procedure* of [`../retro/layout-4.md`](../retro/layout-4.md)

Then read the three memory notes `figma-frame-reading`, `verifying-the-published-tab` and
`browser-tool-choice`. `SPEC.md` lives in git history: `git show 8fa8ff4:SPEC.md`.

Branch: **`lime-layout-1`**.

## What the pass must deliver

1. **Every section works in the published tab under Lime**: every control CLAUDE.md lists under
   *`s.live` is false everywhere except the published tab*.
2. **Every section looks as close to its Figma frame as possible**, at 1440 (× 0.82 onto the
   1180 canvas), 768 and 390.
3. **Lime's template card** on the template picker, both the big preview and its filmstrip
   thumbnail, looks like Lime's layout-1 header.
4. **The setup modal** ("Choose your header") shows **four** Lime cards, and each one looks like a
   header. Card 1 is the fitted Hero. Cards 2–4 are the three layouts later Lime passes will fit;
   in this pass they only need to render and work (see *The header, and the four cards*).

## What this pass actually is

**Lime's layout 1 uses the same eleven Figma components as Retro's layout 1, in a different
variable mode.** The evidence:

- Retro's layout-1 page is instances `964:58576`…`964:58586`. Lime's is `964:58588`…`964:58598`:
  the same composition names, in the same order, with node ids offset by exactly 12.
- `get_variable_defs` on the two header instances returns the same token **names** with
  different values.

So this is **not** a from-scratch fit. The `s.v0` branch of every section already renders under
Lime (a code survey confirmed it: no branch condition reads `s.retro`), with Retro's decoration
switched off and the three-colour palette standing in. That is also why the published page
already works for ten of the eleven sections. The work is three things:

1. **Make Lime's theme carry its Figma mode completely**: fonts, type ramp, radii, borders and
   the semantic colours. This is session 0, and it changes all eleven sections at once.
2. **Add Lime's own decoration inside the shared `s.v0` branches**, behind a new `s.lime` flag,
   the way Retro's sits behind `s.retro`. Lime has no grain, torn edges, checkerboard, tilts or
   hard offset shadows. What it has instead is listed under *Lime's decorative language*.
3. **Let `HeaderV0` render for Lime**, which is what fixes the one broken published section, the
   picker card and the modal card, all in one change.

**Do not write Lime-only section branches.** A separate branch per section would duplicate the
v0 code only to change token values, and the two copies would drift apart. The exception is a
section where Lime's frame turns out to be a different *composition*, not the same one
re-skinned. Decide that per section from the `get_metadata` tree, write it down under
*Conventions*, and only then branch.

## The Figma source

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Frame 266 | `964:58587` | 1440 × 9543.7 |
| Tablet | Frame 272 | `986:39875` | 768 × 11633.4 |
| Mobile | Frame 273 | `986:39888` | 390 × 10591.5 |

- Desktop: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=964-58587&m=dev>
- Tablet: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=986-39875&m=dev>
- Mobile: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=986-39888&m=dev>

`fileKey` = `uFoUbPaBrDicjyuSBEbtGT`.

**Match on node id and width, never on the name.** Several instance names on these pages are
wrong:
- The 390 gallery (`989:22110`) and the 390 testimonials (`986:39898`) are both called "— Tablet".
- The booking calendar is called "— Desktop" at all three widths.
- The media player's 768 master sits inside a wrapper frame (`986:39878`, "Frame 272", which is
  also the tablet page's own name).
- The footer is *Component 2* at 1440, *Component 3* at 768 and *Component 4* at 390. The first
  is the same component Retro's fitted footer came from.
- The 390 testimonials master is **730 tall at every width**, the same as desktop, which suggests
  a desktop number leaking into the narrow instance. Read its render before trusting the height.

## The sections

Session 0 comes first, then eleven sections in the page's order. Sizes are the frames' own. Each
row's three masters are fitted in one session.

| # | Cat | Desktop node | Composition | Size | Tablet node | Size | Mobile node | Size | Retro twin | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| 0 | *foundation* | `964:58587` *(page)* | Lime mode → `THEMES[1]`, ramp, fonts, `s.lime`, photos | — | `986:39875` | — | `986:39888` | — | — | todo |
| 1 | `header` | `964:58588` | Headers — hero | 1440 × 750 | `986:39876` | 768 × 1024 | `986:39889` | 390 × 844 | `964:58576` | todo |
| 2 | `bio` | `964:58589` | Bios — A · Flanked portrait | 1440 × 769 | `986:39877` | 768 × 1144 | `986:39890` | 390 × 739 | `964:58577` | todo |
| 3 | `media` | `964:58590` | Media Player — D · Floating cards stack | 1440 × 1153 | `986:39879` *(in `986:39878`)* | 768 × 1512 | `986:39891` | 390 × 1191 | `964:58578` | todo |
| 4 | `gallery` | `964:58591` | Gallery Sections — Component 1 | 1440 × 822 | `986:39880` | 768 × 1119 | `989:22110` | 390 × 776 | `964:58579` | todo |
| 5 | `repertoire` | `964:58592` | Repertoire — A · Two-column dense | 1440 × 1063 | `986:39881` | 768 × 872 | `986:39893` | 390 × 838 | `964:58580` | todo |
| 6 | `map` | `964:58593` | Events Map — D · Compact tile | 1440 × 1151 | `986:39882` | 768 × 1326 | `986:39894` | 390 × 1167.2 | `964:58581` | todo |
| 7 | `pricing` | `964:58594` | Pricing — B · 3-col in soft panel | 1440 × 895 | `986:39883` | 768 × 769 | `986:39895` | 390 × 1520 | `964:58582` | todo |
| 8 | `calendar` | `964:58595` | Booking Calendar — A · Scheduler | 1440 × 869 | `986:39884` | 768 × 1376 | `986:39896` | 390 × 999 | `964:58583` | todo |
| 9 | `form` | `964:58596` | Enquiry Forms — B · Split context+form | 1440 × 862 | `986:39885` | 768 × 1114 | `986:39897` | 390 × 1168 | `964:58584` | todo |
| 10 | `testimonials` | `964:58597` | Testimonials H — Stacked tag card | 1440 × 730 | `986:39886` | 768 × 730 | `986:39898` | 390 × 730 | `964:58585` | todo |
| 11 | `footer` | `964:58598` | Footer — Component 2 / 3 / 4 | 1440 × 479.7 | `986:39887` | 768 × 647.4 | `986:39899` | 390 × 619.4 | `964:58586` | todo |
| — | `tags`, `audio`, `video` | *none* | — | — | — | — | — | — | — | **not on this page.** They take session 0's tokens and nothing else; see open question 5 |

The "Retro twin" is the instance Retro's `s.v0` branch was fitted from. Its fit comments in
`EncoreSection.jsx` cite that node id, so grep for it to find the branch.

**Re-measure from the Lime frame; never reuse Retro's block sizes.** It is the same component,
but auto layout at Lime's `size/display-xl` of 200 (Retro's is 128) does not produce Retro's
heights × anything. The tablet map, for example, is 1326 tall here.

## What already works, and what doesn't

A code survey at the start of this pass found this for a Lime page at `arch 0`:

| Section | Renders under Lime | Published-tab controls |
|---|---|---|
| **header** | `FlatHeader` v0 (`EncoreSection.jsx` `FlatHeader`), **not** `HeaderV0` | **Broken.** `FlatNav` hardcodes Music / Shows / Book on `#music` / `#shows` / `#book`, which no section's id matches. It ignores `navLinks`, `navHref`, `s.live` and the burger menu, its CTAs are `<span>`s, and it reads none of `image`, `avatar`, `kicker`, `location` or `showBadge`. |
| bio, tags | `s.v0` | nothing interactive in layout 1 |
| media | `s.v0` | works. `TRACK_AUDIO` is not gated on Retro, so the player plays. |
| repertoire, gallery, pricing, calendar, map, form, testimonials, footer | `s.v0` | wired |

So **goal 1 is mostly met already, and the header session is where it gets met in full**. Every
section session still runs `theme=1&live=1`, because two things can break a working control. A
Lime decoration layer can cover it (a glow or an arc edge drawn over a chip row). And a live
*state* can stop reading in Lime colours: a chip that is active on `#AFE335` must still be
distinguishable from one inactive on `#2E3928`, and the form's refused-box rule draws in `ctlInk`.

Under Lime, every section today shows **initials placeholders instead of photographs**, because
`photos.js` seeds Retro only. Lime's Figma uses the same photographs Retro seeds (the hero, the
stage shot, the gallery set, the form avatar), so session 0 widens that gate.

## Lime's Figma mode

This is `get_variable_defs` on the desktop page `964:58587`. It is the desktop mode: re-run the
call on the 768 and 390 pages before trusting any `size/…` value at those widths.

| Token | Lime | Notes |
|---|---|---|
| `font/display` | Bebas Neue | `THEMES[1].display` already |
| `font/label` | Bebas Neue | `THEMES[1].label` is **Archivo** today |
| `font/ui` | **Chakra Petch** | no `ui` key exists. Retro's is Inter, collapsed into `body` |
| `font/body` | Inter | `THEMES[1].body` is **Archivo** today |
| `size/display-xl` / `-lg` / `-md` / `-sm` | 200 / 130 / 72 / 50 | Retro's display-xl is 128. `RAMP.desktop.dispXl` 105 = 128 × 0.82 |
| `size/title` / `list` | 36 / 24 | |
| `size/label-lg` / `-sm` / `-xs` | 32 / 18 / 20 | |
| `size/body-lg` / `-md` / `-sm`, `size/eyebrow` | 16 / 14 / 13, 15 | eyebrow is Inter Bold |
| line heights | display-xl .75, display-lg .89, display-md/-sm 1, title/label 1.1, list 1.2, label-xs 1.26, body 1.5, body-sm 1.4, eyebrow 1.3 | |
| `radius/card` / `control` / `chip` | 26 / 13 / 6 | pills are 999 where a frame draws one |
| `border/default` / `thin` / `hairline` | 3 / 2 / 1 | |
| `sem/bg` | `#15180F` | `palette[0]` |
| `sem/text/1`, `sem/active/bg`, `sem/stroke/2`, `sem/tag/2/bg`, `sem/inactive/text`, `sem/tag/1/text` | `#AFE335` | `palette[1]` |
| `sem/text/2` | `#F2FFD0` | `palette[2]`, and the ground of the light bands |
| `sem/box/1`, `sem/tag/1/bg`, `sem/state/inactive/border` | `#2E3928` | the olive-dark band and card fill |
| `sem/box/2` | `#394732` | raised card |
| `sem/box/3` | `#101309` | sunk well |
| `sem/active/text`, `sem/tag/2/text` | `#0D1F03` | ink on lime, **not** `contrast(ac)` |
| `sem/inactive/bg` | `#D9FF7F` | light-band inactive fill |
| `sem/glow` | `#A6E22E` | the glows |
| `sem/stroke/1` | `#F2FFD0` at 15% (`#f2ffd026`) | hairlines |

## Session 0 — the foundation

This session touches no section's layout code. Its job is to make every later session a matter
of decoration and measurement.

1. **Map `THEMES` keys to Figma tokens before changing any value.** It is not yet verified which
   Figma token `radius` / `radiusSm` / `btnR` / `bw` stand for: is `radius` `radius/card`, and is
   `bw` `border/thin`? Settle it by reading Retro's mode. Run `get_variable_defs` on the Retro
   layout-1 page, the parent of `964:58576`; find it with one `use_figma` page query (load the
   `figma-use` skill first) rather than by probing ids. Diff that mode against Lime's with
   `THEMES[0]` beside it. Write the mapping into *Conventions*.
2. **Rewrite `THEMES[1]`** (`source/src/builder/data.js`):
   - display and label Bebas Neue, body Inter
   - the mapped radii and borders
   - `tags` so that `vm.deep` and friends resolve to the mode's boxes
   - the semantic colours the three-colour palette cannot derive (`box1`–`box3`, `glow`,
     `inactiveBg`, `activeFg`, `stroke1`) as an optional **`sem` object**, resolved onto the vm
     in `sectionVm` so `EncoreSection` still does no colour maths. Retro has no `sem` key and must
     not grow one.
3. **Add a `ui` font key.** Set `THEMES[0].ui` to Inter, which leaves Retro unchanged, set Lime's
   to Chakra Petch, and pass `vm.ui` through. Find which v0 text is `Label/XS` from the fit
   comments (`grep -n "label-xs\|Label/XS\|labelXs" source/src/builder/EncoreSection.jsx`). Where
   Retro reads `s.body` for it, switch those readers to `s.ui`.
4. **Make the type ramp theme-aware.** `RAMP` (`EncoreBuilder.jsx`, beside `SIZES`) is keyed by
   canvas only, and its numbers are Retro's mode (desktop `dispXl` 105 = 128 × 0.82). Give Lime
   its own ramp, applied in `sectionVm` over the `Z` spread, with desktop values at × 0.82 and
   768 / 390 values verbatim from `get_variable_defs` on the two narrow pages. **Retro's values
   must stay byte-identical.** Leave them in place and layer Lime's over them, and do not
   re-derive Retro's. This is the biggest single cost of the pass. Check `preview.jsx` too, which
   carries its own copy of `Z`.
5. **Load the fonts.**
   - `source/index.html`: add Chakra Petch (Bebas Neue and Inter are already there).
   - `source/preview.html`: add Bebas Neue and Chakra Petch. The harness loads only Anton, Inter
     and Fraunces, so every `theme=1` check is wrong until this is fixed.
   - Leave Archivo in the link, since Grunge/Editorial/Pop may use it (check first).
6. **Add `lime: T.name === 'Lime'`** beside `retro` in `sectionVm`, with a comment in the same
   voice as the one on `retro`.
7. **Seed Lime's photographs.** In `photos.js`, widen `isRetro` to a set of seeded themes for
   these:
   - `defaultImage`, `defaultImages`, `defaultTrackArt`
   - `RETRO_HEADER_AVATAR`

   Leave `grainSrc` alone (Lime has no grain). **Check the map tile before widening `mapSrc`**:
   Lime's map is a light, desaturated raster on a pale card, so `get_design_context` on
   `964:58593` and compare its asset to `photos/map.jpg`. If it differs, add `lime-map.jpg`
   rather than filtering Retro's.
8. **Casing.** `THEMES[1].casing` is `'upper'`. Bebas Neue is caps-only, so display casing is
   moot. Confirm that `caseText` never reaches body copy the frame sets in mixed case ("DJ and
   selector based in Manchester…").

**Verification for session 0:**
- **Retro, Grunge, Editorial and Pop do not move.** Take a digest of all 14 categories × 3 widths
  at `theme=0,2,3,4` before and after the change: zero differing rows (skip `.seal-spin`).
- **Lime changes on purpose.** Screenshot the eleven sections at `theme=1` before and after, at
  desktop only, and keep them in the scratchpad as the pass's "before" pictures.

## The header, and the four cards

**Section 1 unbreaks three things at once.** `TemplatePreview` renders
`sectionVm({ cat: 'header', arch: 0 })`, and `HeaderChoices` renders one `sectionVm` per card,
so once `HeaderV0` renders for Lime, the picker card, its filmstrip thumbnail and modal card 1
all follow.

- **Families.** `headerFamily('Lime')` is `'flat'` today, which gives three `FlatHeader` layouts
  (Centred / Split / Rule). Change it as follows:
  - Give Lime its own family: `headerVariants` **4**, and `HEADER_NAMES.lime` =
    Hero / Feature spread / Inset Hero / Stacked. That is photographic's first four, because
    header card N lays out the *whole page* as layout N, so Lime's later layout passes will be
    Retro's layout-2…4 components in Lime mode, exactly as this one is.
  - Set `vm.flatHeader` false for Lime, so the root's dispatch reaches `HeaderV0`…`V3`.
  - Grunge, Editorial and Pop stay `'flat'`.
- **Cards 2–4 are placeholders, and must still work.** They render `HeaderV1`…`V3` in Lime tokens,
  with `s.retro` off and `s.lime` on. Nobody has fitted them to Lime, and they may look rough. But
  they carry `navLinks`, `NavMenu` and `BookPill`, so they work when published, which the
  `FlatHeader`s they replace did not. Check each renders legibly at three widths and publishes;
  fix only what is broken, and note the rest for its layout pass.
- **The page fold.** `pickHeader` writes `pageLayout(cat, i, 'Lime')` to every section. With
  cards 2–4 every other section takes `v1`–`v3`, which are Retro's layouts 2–4 in Lime tokens, also
  placeholders. No change is needed, but say so in the modal session's verification.
- **The root's `bleed` flag** is `s.hd && s.v0 && !s.flatHeader && s.retro`. The hero is
  full-bleed in Lime's frame too, so widen it to `(s.retro || s.lime)`.
- **Aspect.** Lime's hero is 1440 × 750, 768 × 1024 and 390 × 844, which matches `WIDE.heroH`
  (614 = 750 × 0.82, then 1024 and 844), so `SPOT_ASPECT` holds and the picker frame needs no change.
- **What Lime's hero draws that Retro's may not:** a reticle mark top-right, a rounded
  glow-outlined avatar card, a chip row in `sem/box/1` with lime-filled active chips, and a
  capsule nav bar with a lime Book Now pill. Check each against `HeaderV0`'s existing props before
  inventing one.

**Verify in the builder, not only the harness**, with chrome-devtools MCP:
- the template stage shows Lime's big card and its filmstrip thumbnail as the hero, with the
  photograph
- the setup modal shows **4** Lime cards named Hero / Feature spread / Inset Hero / Stacked
- clicking card 1 opens the editor on the Lime page
- publish, then in the popup: the nav scrolls to each section, the burger opens at 768 and 390,
  and Book Now reaches the form

The `verifying-the-published-tab` note covers the popup.

## Lime's decorative language

This replaces Retro's grain / torn edge / checkerboard / tilt / hard offset. Everything here is
behind `s.lime`.

- **Curved seams between bands.** The page alternates grounds, and every change of ground is a
  shallow arc, never a straight edge or a tear. Build one `ArcEdge` helper, in the first session
  that meets a seam (section 3, media), mirroring `TornEdge`'s props. Measure each arc's depth
  and direction from its frame, not from this table.
- **Glows**, in `sem/glow`: the bio portrait's outline, the media sleeve card, the featured
  pricing card, the calendar's panel border and picked day, and the active pager pill. Each is a
  `boxShadow`. Read the effect's radius and spread off the node's `effects` with one `use_figma`
  read rather than guessing from the render.
- **Radii** of 26 on cards, 13 on controls, 6 on chips and 999 on pills, applied through the
  session-0 keys.
- **The bio portrait is an arch-topped rounded rectangle**, not Retro's tilted polaroid.
- **The seal** (bio, footer) is kept, in lime on the dark ground. `SealBadge` becomes Lime's as
  well as Retro's.
- **No texture at all.** A stddev scan of Lime's render should come back flat over every band.
  If one doesn't, the Figma node has a texture this list has missed.

### The band table

This is read off the desktop render. **Each seam belongs to the section *below* it**, which draws
the arc at its own head, so that no two sessions both claim one. Confirm the 768 and 390 pages
follow the same sequence in section 1's session (the header owes nothing, but it is the first
session with the three renders open).

| # | Section | Ground | Head seam (owned) |
|---|---|---|---|
| 1 | header | photograph, full-bleed | — |
| 2 | bio | `sem/bg` `#15180F` | none: the hero fades into it |
| 3 | media | `sem/box/1` `#2E3928` | **arc** from bio's `#15180F` |
| 4 | gallery | `#15180F` | **arc** from media's `#2E3928` |
| 5 | repertoire | `#15180F` | none: same ground as gallery |
| 6 | map | `sem/text/2` `#F2FFD0` (light band; the map card and list panel are a darker tint of it) | **arc** from `#15180F` |
| 7 | pricing | `#15180F` | **arc** from `#F2FFD0` |
| 8 | calendar | `#15180F` | none |
| 9 | form | `#F2FFD0` | **arc** from `#15180F` |
| 10 | testimonials | `#2E3928` | **arc** from `#F2FFD0` |
| 11 | footer | `#15180F`, hairline rules | straight edge |

The root's `cream` / `darkMap` flags (`EncoreSection` default export) are Retro's, keyed on
`s.retro`. **Do not reuse them for Lime.** Add a separate Lime ground expression beside them,
extended one section at a time. A section standing on a light band has to take a readable
foreground there. `Photo`'s `ink` and `Pager`'s `idle` are the precedents for passing that pair
down.

A section moved out of this order lands its arc against the wrong ground. That is accepted, the
same as Retro's torn edges; see open question 4.

## Per-session procedure

One unit per session, **all three widths together**. Clear context between units; git and this
file are the memory.

1. Read `CLAUDE.md`, this file, the Retro sections named at the top, and the three memory notes.
2. **Session 0 only:** follow *Session 0* above, then go to step 7.
3. `get_metadata` on **all three** of the row's nodes, side by side, and on its Retro twin's
   desktop node. Compare the two trees: the same children with different sizes means decoration
   work inside `s.v0`. Different children means the section is a different composition; stop
   and record that under *Conventions* before writing code.
4. `get_screenshot` on each node (`maxDimension` 1400–2000). The asset URL is short-lived, so
   `curl` it in the very next call. Then load the `figma-design-to-code` skill and run
   `get_design_context`. **Run `get_variable_defs` on all three nodes**, since each resolves its
   own mode. Read fills, strokes, effects and radii off the node with one `use_figma` read when a
   token looks wrong (the memory note's gallery trap).
5. **Implement inside the section's existing `s.v0` branch, gated on `s.lime`.** Every Lime-only
   value sits behind `s.lime`, the same way Retro's sit behind `s.retro`. Desktop numbers are the
   Lime frame's × 0.82; the 768 and 390 frames are verbatim. Prefer session-0 tokens (`s.ui`,
   `s.box1`, `s.glow`, the Lime ramp) over literals, and name any literal the mode doesn't carry.
6. **Verify** with the preview harness and chrome-devtools MCP (`--isolated --viewport 1440x900`):

   ```
   cd source && npm run dev
   http://localhost:5173/preview.html?cat=bio&arch=0&theme=1&w=desktop     # &w=tablet | mobile
   ```

   - **Look:** compare the Lime frame's render with `theme=1`, and read the geometry with
     `getBoundingClientRect()`, comparing numbers, not screenshots. Check against **content**
     edges, not frame `y` (the `padX` / `padY` trap in `figma-frame-reading`).
   - **Function:** `theme=1&live=1`. Drive every control the section has, and confirm its
     active, idle and refused states read on Lime's colours.
   - **Retro does not move:** a zero-row digest at `theme=0` across all three widths, taken before
     and after in the same tab. The brace-depth walk (every added line inside an `s.lime`
     conditional) is the quick first check, but the digest is the proof, because these edits sit
     inside branches Retro renders.
   - **The flat three do not move:** `theme=2,3,4`, the same digest.
7. Commit with the section named in the subject.
8. Set the row's Status to `done <sha>`, add anything the next unit needs to *Conventions*, and
   commit that too.
9. **Stop and hand off.** Say the unit is closed and that this is the moment to `/clear`, then
   print the next unit's opening prompt as a filled-in fenced block:

   ```
   Continue the Lime layout-1 pass with section N, `cat`.

   Read CLAUDE.md, then plans/lime/layout-1.md, then plans/retro/layout-2.md's Conventions,
   then the `figma-frame-reading`, `verifying-the-published-tab` and `browser-tool-choice`
   memory notes, and follow the per-session procedure there.

   The three Lime masters are `<desktop node>` (1440 × <H>), `<tablet node>` (768 × <H>) and
   `<mobile node>` (390 × <H>) in Figma file uFoUbPaBrDicjyuSBEbtGT; the Retro twin is
   `<retro node>`. Fit them inside the existing `s.v0` branch of `<Component>` in
   EncoreSection.jsx, gated on `s.lime`. Retro (theme=0) must digest to zero rows.

   <the two or three conventions most likely to bite this section>

   Branch: lime-layout-1. Do not refresh the root index.html.
   ```

Do **not** refresh the root `index.html` per section. That is one deliberate step at the end of
the pass: `npm run build:standalone`, then `cp source/dist-standalone/index.html index.html`,
with the two-build checks in `../retro/layout-2.md`'s *Learned on the end-of-pass refresh*. This
time the digest is **expected to differ at `theme=1`** and must be zero everywhere else.

## The end-of-pass sweep

The pass leaves these documents false, so correct them in one session after section 11:

- **CLAUDE.md:**
  - *Only Retro is designed* (Lime now is)
  - *Retro seeds photography; the other four do not*
  - the `headerFamily` / "six photographic header layouts where the others get three flat ones"
    sentence
  - the `photos.js` rows in the file table
- **README.md:** "Scope boundaries", and any "flat four" wording.
- **Code comments that say "Retro's alone"** or "the other four render flat": in `sectionVm`'s
  `retro` comment, `headerFamily`, `photos.js`' header comment and the root's flag comments.
  Grep for `other four` and `Retro's alone`.
- **`plans/README.md`:** mark the pass closed.
- **Refresh the root `index.html`** as above.

## Conventions

Everything a fresh session would otherwise have to work out again. Append to this list as the
pass goes on.

- **The gate is `s.lime`, and it composes with `s.retro` rather than replacing it.** A value both
  designed templates share, such as the seal, the photographs or the full-bleed hero, is gated
  `(s.retro || s.lime)`. A value only Lime has is `s.lime`. Never edit a Retro literal to make
  Lime look right.
- **Lime reads the fitted `v0` structure.** Before adding any Lime element, check whether the
  branch already draws it for Retro behind `s.retro`, and widen that gate if Lime's frame draws
  the same thing.
- **Harness:** `arch` defaults to **1** in `preview.jsx`, so always pass `arch=0`. `theme` is a
  numeric index: Retro 0, Lime 1.
- *(Session 0 adds the `THEMES` ↔ token mapping here.)*

## Open questions

1. **Five flags by template five.** `s.retro` plus `s.lime` is cheap for cold-start sessions,
   because the Retro plans document the idiom at length. But Grunge, Editorial and Pop would make
   every decoration a five-way branch. The alternative is a token-driven decoration layer
   (`s.deco.edge = 'torn' | 'arc' | …`). Revisit when the second non-Retro template gets a plan,
   not in this pass.
2. **Header cards 2–4 under Lime** render Retro's `HeaderV1`–`V3` in Lime tokens. How rough they
   look is not known until section 1 renders them. Record what each needs so its layout pass can
   start from there.
3. **Track art.** Lime's frame dresses the media rows with the same real album covers Retro's
   did, and Retro ships neutral crops instead (`RETRO_TRACK_ART`). Lime inherits the crops
   through session 0.
4. **Arc seams against a reordered page.** An arc is drawn in the colour of the band it
   assumes sits above it, and a user can reorder sections. Retro accepted the same cost for its
   torn edges. Confirm in section 3 whether an arc can read `s.bg` of its own section and stay
   transparent above, which would make the problem go away.
5. **`tags`, `audio` and `video` have no Lime layout-1 frame.** They pick up session 0's tokens and
   nothing else. Check after session 0 that they still render legibly at `theme=1`, but do not
   design them.
6. **Chakra Petch versus Archivo.** Removing Archivo from Lime is session 0's call. Check whether
   anything besides Lime loads it before dropping it from `index.html`.
