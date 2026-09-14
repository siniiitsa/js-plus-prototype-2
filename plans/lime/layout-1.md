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
| 0 | *foundation* | `964:58587` *(page)* | Lime mode → `THEMES[1]`, ramp, fonts, `s.lime`, photos | — | `986:39875` | — | `986:39888` | — | — | done `dc30dec` |
| 1 | `header` | `964:58588` | Headers — hero | 1440 × 750 | `986:39876` | 768 × 1024 | `986:39889` | 390 × 844 | `964:58576` | done `f4ab4e0` |
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

Under Lime, every section showed **initials placeholders instead of photographs**, because
`photos.js` seeded Retro only. **Session 0 corrected this plan's assumption that Lime reuses
Retro's photographs: it does not.** An image-hash walk of both pages found a different shoot for
the artist's own pictures — the hero (`51d68654`), the header portrait card (`e3790c2c`), the
bio's arch (`fa453f7d`), the calendar photograph (`dc450d0a`, which is *not* the bio's, where
Retro uses one `stage` for both), the form avatar (`f821adc2`) and the gallery spotlight
(`3a59b4d1`). Shared with Retro: the six strip thumbnails, the five track covers and the map
raster (`8cd103b8`). So `photos.js` now seeds by theme name (`SEEDS`) with a `LIME_PHOTOS` row,
and `vm.mapSrc` is Retro's *and* Lime's. The frame's own oddity: its glowing thumbnail 4 is
Retro's spotlight (`3f0c98b4`) while the viewer shows `3a59b4d1`; one image serves both here.

## Lime's Figma mode

The file's variables are four collections, and session 0 read them directly with `use_figma`
(`figma.variables.getLocalVariablesAsync()`), which is more reliable than `get_variable_defs`:

- **`1 · Primitives`** — modes Retro / **Lime** / Static Youth / Sienna Vale / Pop. Fonts, sizes,
  radii, borders, and every `scheme/N/*` colour.
- **`0 · Device`** — Desktop / Tablet / Mobile. Aliases `size/*` to `size-tablet/*` and
  `size-mobile/*`, which are themselves primitives, so **the 768 and 390 ramps are in the dump**
  and need no per-page `get_variable_defs`.
- **`2 · Scheme`** — Scheme 1…9. Aliases `sem/*` to `scheme/N/*`. **Each section instance picks
  its own scheme** (`node.explicitVariableModes`), so a `sem/*` value depends on the section.
- **`3 · Tokens`** — `comp/*` aliases of `sem/*` and the radii.

The table this plan first carried was a `get_variable_defs` read of the *page*, which mixed three
schemes into one list (its `sem/inactive/bg #D9FF7F` is Scheme 3's). The corrected values:

| Token | Retro | Lime | `THEMES` key |
|---|---|---|---|
| `font/display` / `label` / `ui` / `body` | Soulway / Anton / Inter / Inter | Bebas Neue / Bebas Neue / **Chakra Petch** / Inter | `display` / `label` / `ui` / `body` |
| `size/display-xl` / `-lg` / `-md` / `-sm` | 128 / 96 / 48 / 40 | 200 / 130 / 72 / 50 | ramp `dispXl` / `dispLg` / `dispMd` / `dispSm` |
| `size/title` / `list` | 24 / 16 | 36 / 24 | `title` / `list` |
| `size/label-lg` / `-md` / `-sm` / `-xs` | 24 / 20 / 16 / 20 | 32 / 24 / 18 / 20 | `labelLg` / `labelMd` / `labelSm` / `labelXs` |
| `size/body-lg` / `-md` / `-sm`, `chip`, `eyebrow` | 16 / 14 / 12, 12, 15 | 16 / 14 / 13, 13, 15 | `bodyLg` / `bodyMd` / `bodySm`, `chip`, `eyebrow` |
| tablet `size-tablet/*` (xl lg md sm · title list · lLg lMd lSm lXs · bLg bMd bSm · chip eyebrow) | 77 60 38 32 · 19 12 · 16 14 13 14 · 15 13 12 · 11 12 | 120 81 50 40 · 28 19 · 21 17 14 14 · 15 13 13 · 12 12 | |
| mobile `size-mobile/*`, same order | 48 40 30 26 · 18 13 · 14 13 12 12 · 15 13 12 · 11 11 | 72 54 40 32 · 26 18 · 14 13 12 12 · 15 13 12 · 11 11 | |
| `radius/card` / `control` / `chip` / `pill` | 20 / 14 / 8 / 999 | 26 / 13 / 6 / 999 | `radius` / `radiusSm` / `radiusChip` / `btnR` |
| `border/hairline` / `thin` / `default` / `heavy` | 1 / 2 / 3 / 5 | 1 / 2 / 3 / 3 | `bw` is `border/thin` |
| letter spacing | 0 on every style | 0 on every style | `dls` |
| line heights | display-xl .75, display-lg .89, display-md/-sm 1, label 1.1, list 1.2, label-xs 1.26, body 1.5, body-sm 1.4, eyebrow 1.3 | the same | — |

**The schemes Lime's layout-1 page uses**, by instance (`explicitVariableModes` on collection
`VariableCollectionId:187:129`; the mode id is not the scheme number — `187:1` is Scheme 1,
`187:7` Scheme 2, `187:8` Scheme 3, `187:9` Scheme 4):

| Section | Scheme | `bg` | `text1` | `text2` | `box1` | `box2` | `box3` | `active` bg/text | `inactive` bg/text/border | `stroke1` | `stroke2` | `glow` | `tag1` / `tag2` bg/text |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| header, bio, gallery, repertoire, pricing, calendar, testimonials, footer | **1** | `#15180F` | `#AFE335` | `#F2FFD0` | `#2E3928` | `#394732` | `#101309` | `#AFE335` / `#0D1F03` | `#2E3928` / `#AFE335` / `#2E3928` | `#F2FFD0` 15% | `#AFE335` | `#A6E22E` | `#2E3928`/`#AFE335`, `#AFE335`/`#0D1F03` |
| media | **2** | `#2E3928` | `#AFE335` | `#F2FFD0` | `#394732` | `#43523B` | `#263020` | `#AFE335` / `#0D1F03` | `#43523B` / `#AFE335` / `#394732` | `#F2FFD0` 15% | `#AFE335` | `#A6E22E` | `#AFE335`/`#0D1F03`, `#394732`/`#AFE335` |
| map, form | **4** | `#F2FFD0` | `#15180F` | `#15180F` | `#D5E3B2` | `#F2FFD0` | `#D5E3B2` | `#15180F` / `#C7FF3C` | `#D5E3B2` / `#15180F` / `#F2FFD0` | `#15180F` 15% | `#15180F` | `#15180F` | `#2E3928`/`#AFE335`, `#C7FF3C`/`#15180F` |
| *(form's contact panel, nested)* | **3** | `#AFE335` | `#15180F` | `#15180F` | `#CCFA61` | `#D9FF7F` | `#9CCF23` | `#15180F` / `#AFE335` | `#D9FF7F` / `#15180F` / `#CCFA61` | `#15180F` 15% | `#15180F` | `#15180F` | `#15180F`/`#C7FF3C`, `#2E3928`/`#AFE335` |

`THEMES[1].sem` carries Scheme 1. A section on Scheme 2, 3 or 4 writes that scheme's values as
named literals behind `s.lime`, which is how Retro's own header (an instance on **Scheme 3**) was
fitted. Retro's other ten layout-1 instances carry no explicit scheme and inherit its page's
Scheme 1.

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
   - `tags`: **not** as a free rewrite; see step 9
   - the semantic colours the three-colour palette cannot derive (`box1`–`box3`, `glow`,
     `inactiveBg`, `activeFg`, `stroke1`) as an optional **`sem` object**, resolved onto the vm
     in `sectionVm` so `EncoreSection` still does no colour maths. Retro has no `sem` key and must
     not grow one.
3. **Add a `ui` font key.** Set `THEMES[0].ui` to Inter, which leaves Retro unchanged, set Lime's
   to Chakra Petch, and pass **`vm.ui = T.ui ?? T.body`** through. Grunge, Editorial and Pop
   carry no `ui` key, and a reader switched to `s.ui` would otherwise render `undefined`. Find which v0 text is `Label/XS` from the fit
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
   voice as the one on `retro`. Then take inventory of **every Retro name gate outside
   `EncoreSection`**, and decide for each whether Lime shares it:
   - `retro` (`EncoreBuilder.jsx`, in `sectionVm`)
   - `vm.grainSrc` / `vm.mapSrc`
   - **`gigDark`**, `cat === 'map' && vm.v0 && T.name === 'Retro'`, which grounds the gig
     rows' colours. Lime's map stands on a *light* band, so it is not Retro's dark one.
   - `headerFamily` (`data.js`), handled in section 1
   - `isRetro` (`photos.js`)
7. **Seed Lime's photographs.** In `photos.js`, widen `isRetro` to a set of seeded themes for
   these:
   - `defaultImage`, `defaultImages`, `defaultTrackArt`
   - `RETRO_HEADER_AVATAR`

   Leave `grainSrc` alone (Lime has no grain). **Check the map tile before widening `mapSrc`**:
   Lime's map is a light, desaturated raster on a pale card, so `get_design_context` on
   `964:58593` and compare its asset to `photos/map.jpg`. If it differs, add `lime-map.jpg`
   rather than filtering Retro's.
8. **Casing.** `THEMES[1].casing` is `'upper'`, and `caseText` (`data.js`) upper-cases the
   string itself. That is moot wherever the face is Bebas Neue, which is caps-only. It is
   **wrong** for the frame's Chakra Petch and Inter strings, which are mixed case in the render:
   header chips "Sold Out" and "New Release", repertoire chips "Weddings" and "Birthdays", pricing
   chips "Private Event", form types "Wedding" and "Party". `cased()` reaches about 30 vm keys in
   `sectionVm`, including `repChips`, `tierChips`, `formTypes`, `vm.chips`, gig chips, quotes,
   footer links and titles (`grep -n "cased(" source/src/builder/EncoreBuilder.jsx`). Evaluate
   **`casing: 'title'`** (a passthrough, Retro's own) for Lime, and let the Bebas face do the
   capitals. Check every casing site against the frame rather than assuming, and record the
   answer under *Conventions*.
9. **The `tags` hue list is Retro's seat system, and Lime's mode has no such system.** Seventeen
   sites in `sectionVm` read `T.tags`:
   - the darkest-hue minimum behind `vm.deep` / `deepFg` / `mapBg`
   - `vm.chips`' seat per index
   - the header pill colour
   - pricing's `tierHues` / `tierHero` / `tierRow` / `tierFeatSeats`
   - `vm.repHue`
   - the testimonials and map row hues

   Retro's frames paint one palette hue per card. Lime's have exactly **two tag styles**:
   `sem/tag/1` (`#2E3928` fill, lime text) and `sem/tag/2` (lime fill, `#0D1F03` text), which
   alternate in the header chip row. Its pricing cards are all one `sem/box/1` fill, with a glow
   marking the featured card. So: `grep -n "T\.tags" source/src/builder/EncoreBuilder.jsx`, check
   that each site survives a short array (`% T.tags.length`), and decide the array. Two entries is
   the likely answer. Also decide **which sites Lime overrides in its section instead**, behind
   `s.lime`, so that no later session has to fight a hue session 0 gave it. Record the
   per-site answer under *Conventions*.

**Verification for session 0:**
- **Exit criterion. Retro, Grunge, Editorial and Pop do not move.** Take a digest of all 14 categories × 3 widths
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

Read off all three pages' instances in section 1's session (a `use_figma` walk of each section's
fills and every full-width shape under 260 tall). **The ground sequence is identical at 1440, 768
and 390.** What the first draft of this table got wrong is ownership: **a seam is not drawn by the
section below it.** Each is a 44-tall, full-width `VECTOR` *inside* the band whose ground differs,
at its own head (y −1) **and** its own foot, filled in the neighbouring band's colour. So media,
map and form each own both of their seams, and gallery, pricing and testimonials own none, and no
two sessions can claim one. The 768 media's two vectors are 1438 wide (the desktop number leaking
into a narrow instance, so clip them to the section), and the 390 map's and form's are 384. The arc's
depth and direction are still unmeasured; read them off the vector in the owning session.

| # | Section | Ground | Seams it draws (head · foot) |
|---|---|---|---|
| 1 | header | photograph, full-bleed | — |
| 2 | bio | `sem/bg` `#15180F` | none: the hero fades into it |
| 3 | media | `sem/box/1` `#2E3928` | `#15180F` · `#15180F` ("Vector 1", "Vector 2") |
| 4 | gallery | `#15180F` | none |
| 5 | repertoire | `#15180F` | none |
| 6 | map | `sem/text/2` `#F2FFD0` (light band; the map card and list panel are a darker tint of it) | `#15180F` · `#15180F` |
| 7 | pricing | `#15180F` | none |
| 8 | calendar | `#15180F` | none |
| 9 | form | `#F2FFD0` | `#15180F` · **`#2E3928`**, testimonials' ground ("Vector 3", "Vector 2") |
| 10 | testimonials | `#2E3928` | none |
| 11 | footer | `#15180F`, hairline rules | none: a straight edge |

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

Settled in session 0 (the foundation):

- **`THEMES` ↔ Figma tokens.** `display` / `label` / `ui` / `body` are `font/*`. `radius` is
  `radius/card`, `radiusSm` `radius/control`, `btnR` `radius/pill`, `bw` `border/thin` — proved by
  Retro's own mode, whose 20 / 14 / 999 / 2 are exactly those four. `radiusChip` is `radius/chip`
  (Lime 6; Retro has no key and `s.radiusChip` falls back to its token, 8). `dls` is 0 for both,
  since every text style states letterSpacing 0. `border/default` (3) and `border/hairline` (1)
  have no key: write them as named literals.
- **The ramp is theme-aware.** `THEME_RAMP.Lime` (`EncoreBuilder.jsx`, beside `RAMP`) is laid
  over the `Z` spread in `sectionVm` by `SIZES[].dev`. Under Lime, **every** size key is its token
  at that width: `s.dispXl` / `dispLg` / `dispMd` / `dispSm` / `title` / `list` / `labelLg` /
  `labelMd` / `labelSm` / `labelXs` / `bodyLg` / `bodyMd` / `bodySm` / `chip` / `eyebrow`, with
  desktop at × 0.82 rounded to whole px and 768 / 390 verbatim. So **a Lime branch reads `s.*`
  rather than writing a per-width literal table** the way Retro's `v1`–`v3` branches do.
  `RAMP_REST` gives Retro and the flat three the eight keys `RAMP` never had, from Retro's own mode,
  so a shared read is never undefined. Retro's seven original keys are **not** all its tokens
  (mobile `dispXl` 77 vs 48, tablet `title` 22 vs 19, tablet `dispLg` 64 vs 60, …): they were fitted
  to renders before the variable file existed, and stay. `preview.jsx`'s `Z` is a hand copy of
  `SIZES` + `RAMP` + `RAMP_REST` + `WIDE` and now carries `dev`; keep it in step.
- **`s.ui` is `font/ui`, the `Label/XS` face** — Chakra Petch under Lime, and Inter under Retro,
  spelled identically to `body` so the switch is byte-equal. Thirteen readers were switched from
  `s.body`: every `fontFamily: s.body` at `lineHeight: 1.26` whose size is `labelXs` (TagChips'
  Retro branch, the pricing v0 feature lines, and eleven `v1`–`v3` sites). The `u(T.eyebrow)` rows
  at 1.26 and the bio v1 chips at a literal 13px were left on `body`. **A `v0` element the Lime frame
  sets in Chakra Petch that is not at 1.26 in the code** (the calendar's day numbers, the form's
  promise lines, the bio's "KM BIO") is the section session's to switch.
- **Semantic colours are flat vm keys, undefined outside Lime**: `s.box1`, `box2`, `box3`, `glow`,
  `activeBg`, `activeFg`, `inactiveBg`, `inactiveFg`, `inactiveLine`, `stroke1`, `stroke2`, `hl`,
  from `THEMES[1].sem`, which is **Scheme 1**. Read them behind `s.lime` only. A section on another
  scheme (media on 2, map and form on 4, the form's contact panel on 3) takes its values from the
  scheme table under *Lime's Figma mode* as named literals.
- **Casing is `'title'`** (a passthrough). Bebas Neue is caps-only, so the display and label faces
  need nothing; the frame's Chakra Petch and Inter strings are mixed case ("Sold Out", "Full name",
  "Replies within 24 hrs"). The frame's uppercase eyebrows ("MEDIA", "KM BIO") are typed that way
  or want a per-site `textTransform`, never `casing`.
- **`T.tags` is `['#2E3928', '#AFE335']`**, Scheme 1's alternating tag1 / tag2 seats, with
  `sem.tagFg: ['#AFE335', '#0D1F03']` parallel to it. `vm.chips` reads `tagFg`; every other site
  still uses `contrast()`. Every site is `% T.tags.length`-safe. What they yield at two seats, and
  who overrides:
  - `vm.chips` — alternates box1/lime with the frame's own inks. **Correct as it stands** for the
    header chip row; TagChips itself still draws the flat 9px caps for Lime (its `s.retro` gate is
    the header session's).
  - `deep` `#2E3928`, `deepFg` `#FFFFFF` (the frame's ink on box1 is lime or pale lime), `mapBg`
    `#444F3A`. Sections standing on box1 should take `s.box1` and a sem ink instead.
  - `pillBg` / `pillFg` are **`sem.activeBg` / `sem.activeFg`** (`#AFE335` / `#0D1F03`), set in
    `sectionVm` for any theme with a `sem`. The tag walk alone left `#2E3928`, and that dimmed
    everything reading `pillBg` as a *colour on the page* — the footer's small print, the
    testimonials arrows — to dark-on-dark in the first after-render. The frames draw every pill in
    that pair, so no override is owed; a pill with `bg` as its ink (the header's Book Now) is a
    one-key change in its session. **The enquiry form moved with it**: its v0 shell paints its
    contact half in `pillBg`, so under Lime the whole card is now lime and the submit pill (accent
    on that ground) has lost its fill. The frame's contact panel *is* lime — the nested Scheme 3 —
    with a `#15180F` pill, so the form session starts closer than it looks, but owes the pill.
  - `tierHero`, `tierRow` — card `#AFE335`, ink `#2E3928`; `tierFeatSeats` box1/white and
    lime/`#141414`; the deck alternates lime, box1, lime. **The frame's cards are all `box1` with a
    glow marking the featured one**: the pricing session overrides.
  - `repHue` `#AFE335` (legible against `bg`) — probably right; the repertoire session checks.
  - map row hues alternate `#F2FFD0` / `#AFE335` on the page ground, because `gigDark` stays
    **Retro's alone** — Lime's map stands on Scheme 4's light band, so its session supplies ink.
  - testimonials' and the calendar's `T.tags` seats — alternate the same two; their sessions check.
- **Photographs are per theme** (`SEEDS` in `photos.js`). Lime's six new files are `lime-*.jpg`
  in `src/builder/photos/`, exported from the frame's assets as JPEG (the MCP asset endpoint serves
  every image as a ~2 MB 1536 × 1024 PNG): the hero as-is (its `imageTransform` carries a flip,
  which Figma ignores under `FILL` — the render is unflipped), the bio at its `CROP` (x 0.183 to
  0.685 of the width, a 771 × 1024 portrait), the two avatars as centre squares at 384 and 240, and
  the calendar and gallery spotlight at 1200 × 800.
- **Harness fonts.** `preview.html` now loads Bebas Neue and Chakra Petch, so a `theme=1` render
  is in its real faces. Every `theme=1` picture taken before session 0 is in fallback faces.
- **The digest is committed: `source/scripts/digest.mjs`** (and `shots.mjs` for before/after
  JPEGs), on `puppeteer-core` (a devDependency) driving the `chrome-headless-shell` that
  chrome-devtools-mcp already caches in `~/.cache/puppeteer`. Session 0 wrote it when
  chrome-devtools MCP dropped its connection mid-digest and stayed down. With the dev server up:
  `node scripts/digest.mjs before 0,2,3,4` before editing, `node scripts/digest.mjs after 0,2,3,4`
  after, then `cmp` each file in `$OUT/after` against `$OUT/before` (`OUT` defaults to the system
  temp dir). All 14 categories × every layout × 3 widths × 4 themes is 648 renders in about 50 s,
  and an unchanged tree diffs to zero, so every differing file is real. `WIDTHS=` and
  `EXTRA='&live=1'` narrow or vary a run. The row is
  `[tag, x, y, w, h, background, backgroundImage, colour, border, radius, font size / family /
  weight, line height, letter spacing, text transform, transform, box shadow, opacity, src, text]`,
  relative to `#root`, skipping `.seal-spin`.
- **Pricing's card accent reads the *local* `pillBg`** in `sectionVm` (`tierHues`' `accHue`), not
  `vm.pillBg`. That is deliberate under Lime: the local tag walk's olive is what reads on a lime
  card, where `vm.pillBg`'s lime would vanish. Retro's two are one value, so nothing moved.

Settled in section 1 (the header):

- **Lime is its own header family, `'lime'`**, with four layouts. `HEADER_NAMES.lime` slices
  photographic's first four, so a rename reaches both templates. `flatHeader` is false under Lime,
  and the template card, its thumbnail and the four modal cards all render `HeaderV0`…`V3`. The
  root's `bleed` is `(s.retro || s.lime)`.
- **Check a narrow master's Device mode before trusting `s.*` on it.** Lime's 390 hero (`986:39889`)
  is the one instance on its 390 page set explicitly to **Device: Tablet**, so its type is the 768
  ramp's (title 120 on two lines, name 21, list 19, chips 14), where `s.dispXl` would give 72.
  `HeaderV0` carries those four as a named `tk` table, and `Wordmark` takes an additive `size`.
  Every other section on both narrow pages inherits its page's mode. Some carry an explicit mode
  that equals the page's (the 390 gallery, calendar and testimonials say Mobile; the 768 calendar
  says Tablet), so their `s.*` is right. One `use_figma` over the page frame's children, reading
  `explicitVariableModes` against `getLocalVariableCollectionsAsync()`' mode names, returns every
  section's Device and Scheme at once.
- **`BookPill` has a Lime branch, and every Lime pill already moved to it.** It draws Display/List
  type (lh 1.2, tracking 0) in `sem/bg` on `pillBg` (`sem/active/bg`), flush against a 46 × 44
  disc in the type's ink with a lime arrow, and no offset block. `glyph` is ignored, because Lime
  draws no asterisk. The scales are Retro's (768 × 1, 1180 × 0.82, a 390 caller × 0.62, and `full`
  opts back up), and the small pill's type is the 768 type × 0.62, 11.8, since the 390 master's
  own 9.9 renders in a fallback face. The branch moved the bio a1, calendar a0–a3, footer, map
  a1–a2, media a0 (Soundcloud), pricing a0–a3 and testimonials a1 pills. A section whose frame
  draws a different pill overrides through `bg` / `fg` / `size` / `disc` / `discFg` / `style`;
  do not fork the branch.
- **`TagChips`' designed branch is `s.retro || s.lime`** (`s.ui`, `labelXs`, 1.26), at 4.1 / 9
  padding on Lime's desktop. The header passes `radius={s.radiusChip}`; the tags section's a2/a3
  still pass `u(8)`, and that is its own session's call.
- **`labelStyle` still tracks `0.02em`**, and Lime's mode states 0. The header passes
  `letterSpacing: s.dls` at each of its sites rather than changing the helper, which would move
  every Lime label at once. Do the same per site, or make the helper theme-aware in one deliberate
  commit that names what moved.
- **Under Lime `pillBg` IS the accent** (`#AFE335`, from `sem.activeBg`). Any branch that pairs
  `s.pillBg` with `s.ac`, which is Retro's mustard beside its rust, draws lime on lime. `HeaderV1`
  and `V2` read `mustard = s.lime ? s.box1 : s.pillBg`. Grep `pillBg` in the section you fit and
  sample its render at `theme=1` before believing it.
- **No glow in the header.** The portrait card is a 1px `sem/stroke/2` rule at radius 55, and the
  frame's only effect is the nav capsule's `BACKGROUND_BLUR`, dropped here because the fill under
  it is opaque. The plan's "glow-outlined avatar card" was a guess, and so is every entry in
  *Glows* above until a node's `effects` confirm it.
- **The nav capsule is `NavBar`'s, so `HeaderV3` has it too.** Its desktop corner is the one-row
  bar's half-height (30.35), not `btnR`. The seeded eleven sections give nine links, which wrap the
  1180 canvas and the 1440 published tab onto a second row (104 tall), and a pill radius there drew
  a lozenge. Retro's bar wraps the same way.
- **The reticle takes the seal's seat and its `showBadge` switch** (`Reticle`, beside `SCRIM`),
  transcribed from the frame's vectors with strokes that scale with the box. Under Lime's header,
  `badgeText` edits nothing. The bio and footer seals are their own sessions'.
- **Harness scripts.** A one-off puppeteer script has to live in `source/scripts/` (it resolves
  `puppeteer-core` from there; the scratchpad cannot) and be deleted after, and the Bash cwd resets
  to the repo root between calls, so give it absolute paths. chrome-devtools' `take_screenshot`
  refuses a scratchpad `filePath`; omit it and Read the temp path it reports. In the published tab
  an emulated 768 viewport renders the **390** layout (the capsule measured 370), so prove the 768
  burger in the harness (`w=tablet&live=1`), not there.

## Open questions

1. **Five flags by template five.** `s.retro` plus `s.lime` is cheap for cold-start sessions,
   because the Retro plans document the idiom at length. But Grunge, Editorial and Pop would make
   every decoration a five-way branch. The alternative is a token-driven decoration layer
   (`s.deco.edge = 'torn' | 'arc' | …`). Revisit when the second non-Retro template gets a plan,
   not in this pass.
2. **Header cards 2–4 under Lime** render Retro's `HeaderV1`–`V3` in Lime tokens. How rough they
   look is not known until section 1 renders them. Record what each needs so its layout pass can
   start from there.
   *Rendered in section 1.* All three render at three widths and publish: the nav links scroll,
   the burger opens, and Book Now reaches `#form`. None is fitted.
   - **Card 2, Feature spread (`HeaderV1`).** Legible only once `mustard` became `s.box1`. Its
     two-tone title's first word is box1 on `bg` (dim), and the cream face card's body copy is
     pale lime on cream. It still carries Retro's checker ribbon, the flat starburst seal and
     cream mounts.
   - **Card 3, Inset Hero (`HeaderV2`).** An olive sheet in a lime rule where Retro's is mustard.
     It keeps the checker ribbon and the cream polaroid.
   - **Card 4, Stacked (`HeaderV3`).** It already has Lime's capsule, globe and pill through
     `NavBar`. Its title is `paper`, not lime, and it keeps the flat starburst seal and the ribbon.

   Each is Retro's layout-N component re-skinned, so its pass starts from Lime's layout-N page, the
   same way this one did.
3. **Track art.** Lime's frame dresses the media rows with the same real album covers Retro's
   did, and Retro ships neutral crops instead (`RETRO_TRACK_ART`). Lime inherits the crops
   through session 0. *Settled in session 0:* the covers' image hashes are identical on both
   pages, so sharing `ROW_ART` is the faithful answer, not a stand-in.
4. **Arc seams against a reordered page.** An arc is drawn in the colour of the band it
   assumes sits above it, and a user can reorder sections. Retro accepted the same cost for its
   torn edges. Confirm in section 3 whether an arc can read `s.bg` of its own section and stay
   transparent above, which would make the problem go away.
5. **`tags`, `audio` and `video` have no Lime layout-1 frame.** They pick up session 0's tokens and
   nothing else. Check after session 0 that they still render legibly at `theme=1`, but do not
   design them. *Checked in session 0:* all three are legible at desktop — the tags row alternates
   box1 and lime pills with the frame's inks, the audio list sets its titles in mixed-case Inter
   under a Bebas head, and the video card is unchanged but for its radius.
6. **Chakra Petch versus Archivo.** Removing Archivo from Lime is session 0's call. Check whether
   anything besides Lime loads it before dropping it from `index.html`. *Settled in session 0:*
   Lime no longer reads Archivo, but Pop's label and body do and so does the builder chrome
   (five `fontFamily` literals in `EncoreBuilder.jsx`), so the link keeps it.
