# Retro layout 2 — section-by-section plan

Working checklist for fitting **layout 2** of every Retro section to Figma, one section per
session, clearing context between sections. Layout 1 (`s.v0`) is already fitted and signed off;
nothing here should touch it.

**Read first, every session:** [`CLAUDE.md`](./CLAUDE.md), then this file, then the two memory
notes `figma-frame-reading` and `verifying-the-published-tab` in the project memory directory.
`SPEC.md` lives in git history — `git show 8fa8ff4:SPEC.md`.

## The Figma source

One page in the file: `0:1 — Components`. Layout 1 was fitted from the sibling composition whose
instances are `964:58576`…`964:58586`. **Layout 2 is the frame `964:64636` ("Frame 254"), 1440 ×
9410**, a full page composed of a second option for each section:

<https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=964-64636&m=dev>

`fileKey` = `uFoUbPaBrDicjyuSBEbtGT`.

## The sections

Desktop only for now — tablet (768) and mobile (390) come after desktop is signed off. Sizes are
the 1440 frame's; the 1180 canvas takes them × 0.82 (§5.5, and see *Conventions* below).

| # | Cat | Figma node | Frame name | Size | Status |
|---|---|---|---|---|---|
| 1 | `header` | `964:64637` | Headers — **E · Feature Spread** — Desktop | 1440 × 888 | todo — see *Open questions* |
| 2 | `bio` | `964:64638` | Bios — **F · Portrait + sub-cards** — Desktop | 1440 × 760 | todo |
| 3 | `media` | `964:64639` | *Section* wrapper — see note below | 1440 × 965 | todo |
| 4 | `video` | `964:64645` | Video Players — **A · Dashboard player** — Desktop | 1440 × 782 | todo |
| 5 | `repertoire` | `964:64646` | Repertoire — **G · Mobile list** — Desktop | 1440 × 792 | todo |
| 6 | `gallery` | `964:64647` | Gallery Sections — **C · Split showcase** — Desktop | 1440 × 675 | todo |
| 7 | `pricing` | `964:64648` | Pricing — **D · Single big plan** — Desktop | 1440 × 707 | todo |
| 8 | `calendar` | `964:64650` | Booking Calendar — **E · Bold slot list** — Desktop | 1328 × 896 | todo |
| 9 | `map` | `964:64651` | Events Map — **B · Featured gig + route** — Desktop | 1440 × 780 | todo |
| 10 | `form` | `964:64652` | Enquiry Forms — **E · Sticky sidebar card** — Desktop | 1440 × 792 | todo |
| 11 | `testimonials` | `964:64653` | Testimonials — **A · Editorial feature** — Desktop | 1440 × 782 | todo |
| — | `tags` | *none* | — | — | **no layout-2 design on this page** |
| — | `audio` | *none* | — | — | **no layout-2 design on this page** |
| — | `footer` | `964:64654` | Component 2 | 1440 × 480 | **out of scope** — same design as the fitted footer, and `NVAR.footer` is 1 |

Three of those rows need their own note.

- **`media` is one composed section, not two.** `964:64639` is a `Section` frame holding
  `964:64640` (`Frame 297`, 1328 × 793 at 56/86) which holds, side by side: `964:64641`
  (`Frame 296`, 629 × 673) = the display heading *"Five Worth your ear"* (`964:64642`, 629 × 170)
  over **Media Player — B · Fanned carousel + player** (`964:64643`, 629 × 503); and beside it
  **Media Player — A · Editorial numbered list** (`964:64644`, 529 × 673 at x 739). Rendered: a
  cream rounded panel on the beige page, a fanned five-card stack with a pill transport bar under
  it on the left, a five-row numbered list of olive/mustard/rust cards on the right. Fit the whole
  `Section`, not either instance alone.
- **`calendar` is wrapped.** `964:64649` (`Frame 298`, 1440 × 1008) exists only to inset the
  instance by 56. Fit `964:64650`; the 56 is the page's own `padX`, which our canvas supplies.
- **"Repertoire — G · Mobile list" is a *desktop* frame.** "Mobile list" is the composition's
  name (a phone-style single-column list), not the device. The frame is 1440 wide.

## Per-session procedure

One section per session. Clear context between sections; git and this file are the memory.

1. Read `CLAUDE.md`, this file, and the two memory notes.
2. `mcp__plugin_figma_figma__get_screenshot` on the row's node (`maxDimension` 1400–2000 for
   detail), then load the `figma-design-to-code` skill and `get_design_context` on the same node.
   Use `get_metadata` for the subtree when you need child ids and sizes.
3. Implement it as the `s.v1` branch of the section's component in `EncoreSection.jsx` — see
   *Conventions*. Numbers are the 1440 values × 0.82.
4. Verify: run the app, put the section on the page at layout 2, and compare the desktop render
   against the Figma render. Compare **digests, not screenshots** where geometry matters — see the
   `verifying-the-published-tab` note, which also carries every trap for driving the published tab.
5. Commit, with the section named in the subject.
6. Flip the row's Status to `done <sha>`, add anything the next section needs to *Conventions*,
   and commit that too. Then clear.

Do **not** run `npm run build:standalone` / refresh the root `index.html` per section — that is one
deliberate step at the end of the whole pass (`cp source/dist-standalone/index.html index.html`).

## Conventions

Everything a fresh session would otherwise re-derive. Append to this list as the pass goes on.

- **Where layout 2 goes.** `sectionVm` sets `v0`…`v5` from `d = arch % NVAR[cat]`
  (`EncoreBuilder.jsx:219`). Every non-header component in `EncoreSection.jsx` is
  `function X({ s }) { if (s.v0) { …fitted design… } return <generic flat design/> }`. Layout 2 is
  a new `if (s.v1) { … }` block **between** those two. The generic tail stays: it is what layouts
  3+ still render.
- **Structure is shared, decoration is Retro's.** Follow the `v0` convention exactly — one branch
  for all five themes, with grain, torn edges, checkerboard, hard offset shadows and rotation gated
  on `s.retro`, and palette-derived values (`s.ac`, `s.bg`, `s.tx`) standing in for Retro's literal
  hexes elsewhere. Only Retro is designed; the other four must still render, flat.
- **The section root's ground flags gate on `s.v0`** — `bleed`, `darkMap` and `cream` at
  `EncoreSection.jsx:3324-3342`. Each is a per-design decision, so a layout 2 that stands on cream
  (the media player plainly does) has to widen its own flag to `(s.v0 || s.v1)`, not inherit it.
- **The desktop ramp.** The 1440 frame lands on the 1180 canvas at **× 0.82**; the 768 and 390
  frames are used verbatim when we get to them. Our canvases carry the page's own `s.padX`/`padY`,
  not the frames' insets — verify against **content** edges, never frame `y`.
- **The frame name's letter is Figma's option letter, not a layout index.** Match on the
  composition name. And the 768/390 masters are both misnamed "… — Desktop"; match on width.
- **Keep the diff inside your section.** `sectionVm`, `data.js`, `photos.js`, the palette and
  `s.padX`/`padY` are shared with the eleven fitted layout-1 designs. If a section genuinely needs
  a shared change, say why in the commit and re-render the fitted sections before committing.
- **New seeded photography** belongs in `photos.js`, never `data.js` (documented as pure,
  import-free data). `defaultImage()`/`defaultImages()`/`defaultTrackArt()` gate on
  `T.name === 'Retro'`; **Remove** writes `null`, not `undefined`.
- **`EncoreSection` stays inert.** No new interactivity unless it is gated on `s.live`, and no new
  React imports beyond `useId`/`useState`.

## Open questions

1. **The header.** All six header layouts already exist, but only layout 1 came from Figma —
   layouts 2–6 (`HeaderV1`…`HeaderV5`) were designed here, and their names are surfaced to the user
   in the setup modal (`HEADER_NAMES` in `data.js`). This page's header is
   *E · Feature Spread*, which is none of those six names. So fitting it means **replacing
   `HeaderV1` ("Framed", full-bleed) and renaming layout 2** in `HEADER_NAMES` — a user-visible
   change, unlike every other row here. Confirm before starting it, or do the header last.
2. **`tags` and `audio` have no layout-2 design.** This page omits both. They keep their generic
   flat `v1` unless a frame turns up.
3. **Tablet and mobile.** This page is 1440 only. Whether each option has 768/390 masters is
   unverified — check with one `use_figma` `page.query('[name^=…]')` when the desktop pass is
   signed off.
