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
| 1 | `header` | `964:64637` | Headers — **E · Feature Spread** — Desktop | 1440 × 888 | **done** (desktop) |
| 2 | `bio` | `964:64638` | Bios — **F · Portrait + sub-cards** — Desktop | 1440 × 760 | **done** (desktop) |
| 3 | `media` | `964:64639` | *Section* wrapper — see note below | 1440 × 965 | **done** (desktop) `44405c6` |
| 4 | `video` | `964:64645` | Video Players — **A · Dashboard player** — Desktop | 1440 × 782 | **done** (desktop) `33e4d97` |
| 5 | `repertoire` | `964:64646` | Repertoire — **G · Mobile list** — Desktop | 1440 × 792 | **done** (desktop) `2bb0637` |
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

One section per session. Clear context between sections; git and this file are the memory. The
session that finishes a section does not start the next one — it hands over a paste-ready prompt
and stops (step 7).

1. Read `CLAUDE.md`, this file, and the two memory notes.
2. `mcp__plugin_figma_figma__get_screenshot` on the row's node (`maxDimension` 1400–2000 for
   detail), then load the `figma-design-to-code` skill and `get_design_context` on the same node.
   Use `get_metadata` for the subtree when you need child ids and sizes.
3. Implement it as the `s.v1` branch of the section's component in `EncoreSection.jsx` — see
   *Conventions*. Numbers are the 1440 values × 0.82.
4. Verify with the **preview harness** — `source/preview.html` + `source/src/preview.jsx`, added
   for this pass. It renders one section at one canvas with no editor chrome, so nothing has to be
   clicked and no popup has to be driven:

   ```
   cd source && npm run dev
   # then open, or point chrome-devtools MCP at:
   http://localhost:5173/preview.html?cat=bio&arch=1&w=desktop     # &w=tablet | mobile
   ```

   `arch=1` is layout 2 (`s.v1`); `arch=0` renders the fitted layout 1 beside it for comparison,
   `theme=1…4` checks that the other four templates still render flat, and `n=8` fills the
   section's list-shaped content with that many rows. Screenshot it against the Figma render,
   then read the real geometry with `evaluate_script` and compare **numbers, not screenshots** —
   `getBoundingClientRect()` on the section's own boxes. The `verifying-the-published-tab` note
   still applies for anything that has to be checked live.

   `live=1` renders the section as the published page does, so anything gated on `s.live` can be
   exercised here instead of by driving the editor, publishing and hooking the popup. Note that a
   *synthetic* click proves the wiring but never the sound: `play()` is refused with
   `NotAllowedError` until the document has a real user gesture, and neither a coordinate click
   nor a `find` ref click delivered one in this harness (`navigator.userActivation.hasBeenActive`
   stays false). Hook `HTMLMediaElement.prototype.play` to record which file it was called on and
   how it settled — that is the whole of what can be proved from here; the last step is a human
   clicking it.

   Note the dev server takes 5174, 5175… when another session holds 5173, and
   **chrome-devtools MCP refuses to start while another Chrome holds its profile** — the
   claude-in-chrome tools drive an ordinary `http://` harness page perfectly well, so use those
   rather than killing someone else's browser.
5. Commit, with the section named in the subject.
6. Flip the row's Status to `done <sha>`, add anything the next section needs to *Conventions*,
   and commit that too.
7. **Stop there and hand off.** Do not start the next section in the same context. Say that the
   section is closed and that this is the moment to `/clear`, then print the next section's
   opening prompt as a fenced block the user can paste straight into a fresh window — filled in,
   not a template to complete. Keep it to the shape below: the row's facts, the reading list, and
   whichever two or three conventions this pass has learned that the next section is most likely
   to trip over.

   ```
   Continue the Retro layout-2 pass with section N, `cat`.

   Read CLAUDE.md, then LAYOUT-2-PLAN.md, then the `figma-frame-reading` and
   `verifying-the-published-tab` memory notes, and follow the per-session procedure there.

   The frame is `<node id>` — "<frame name>", <W> × <H> — in Figma file
   uFoUbPaBrDicjyuSBEbtGT. Fit it as the `s.v1` branch of `<Component>` in
   EncoreSection.jsx, desktop only.

   <the two or three conventions most likely to bite this section>

   Branch: retro-layout-2. Do not refresh the root index.html.
   ```

   The clearing is not about running out of room — the window is large and summarises itself. It
   is what proves this file is complete: every convention below was written because a fresh
   session would otherwise have re-derived it, and one of them (the cream aside) was found to be
   *wrong* only because a later session read it cold.

Do **not** run `npm run build:standalone` / refresh the root `index.html` per section — that is one
deliberate step at the end of the whole pass (`cp source/dist-standalone/index.html index.html`).
The `media-player-playback` merge is the one exception so far, and it said why in its own commit.

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
- **The section root's ground flags gate on `s.v0`** — `bleed`, `darkMap` and `cream` near the
  foot of `EncoreSection.jsx`. Each is a per-design decision, so a layout 2 that stands on cream
  would have to widen its own flag to `(s.v0 || s.v1)` rather than inherit it. **None has needed
  to yet, and the media player — the one this note used to name — is the counter-example:** its
  layout 2 keeps the beige page ground and paints a cream *panel* inside it. Sample the frame's
  own ground before assuming.
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
  React imports beyond `useId`/`useState`/`useRef` (the third arrived with the media player's one
  `<audio>` element; there is still no effect anywhere in the file).

Learned on the bio (section 2):

- **The section is shorter than its frame, by design.** The frame's 56px inset × 0.82 is 46, and
  the page supplies `padY` 80 / `padX` 64 instead — so a 760-high frame lands 691 high and its
  content column is 1052 wide, not 1089. Fit the **card**, not the frame height.
- **`BookPill` now takes `glyph="arrow"`** — the layout-2 frames swap the asterisk for an arrow in
  a filled disc flush in the pill's right end. The header's layout-2 frame uses the same pill.
  Default is `"star"`, so every fitted layout-1 caller is untouched.
- **Retro's chips are cream on every hue** in these frames, including the light mustard — the
  palette's own `c.fg` computes to ink there, so pass `s.retro ? '#FBF6EA' : c.fg`.
- **The preview harness has no Tailwind preflight unless `index.css` is imported**, and without it
  `box-sizing` is `content-box`, which silently inflates every padded box by its padding. It is
  imported; do not remove it, and distrust any geometry digest that is off by exactly a padding.
- Two creams, both literal under Retro, whose `paper` IS the page ground: `#FAECD5` (Figma box/1 —
  the text card, the caption card) and `#FBF6EA` (the portrait card's mount, and cream type).
- **A frame that drops in the Tags component shows five chips; render all of `s.chips`.** The five
  are that component's *default*, not a statement that the row holds five — our `TAGS` has six, so
  the row wraps one line further than the frame does. Do not slice.
- **The pickers are safe for fixed widths.** All three `ScaledPreview` call sites pass
  `Z: SIZES.desktop` and lay the render out at a fixed `base = 1180` before CSS-scaling it, so a
  column pinned at a px width cannot collapse in a thumbnail.
- **The harness's `Z` is a hand copy of `SIZES` + `RAMP` + `WIDE`.** If a digest ever disagrees
  with the app, diff those three objects against `EncoreBuilder.jsx` before believing the digest.

Learned on the media player (section 3):

- **Check what the published page already does before fitting a section.** The media player's
  layout 1 plays; layout 2 had to be wired to the same hooks after the fact (see CLAUDE.md, "The
  media player plays"). A layout 2 is not finished when it matches the frame on the canvas — the
  section's live seam has to reach it too. `git branch -a` is part of that check: the live work
  for eight sections sat on an unmerged branch, and a section can look inert here and not be.

- **The emitted `var(--token, #hex)` fallback is the *component's* default, not the instance's.**
  The transport bar came back as `bg-[var(--sem/box/1,#faecd5)]`; the render is `#FFFEFB`, and the
  five fanned cards are a register lighter than the same hues in the list beside them. Sample the
  PNG for every fill that matters — a `python3` + PIL scan of the render also settles the corner
  radius (walk the corner until the edge column stops moving), whether there is a shadow, and
  whether the frame carries grain at all (stddev 0 over a flat patch means it does not).
- **A fixed-composition frame has to be told which way to lose its 20px.** The panel is the page's
  *content* width, 1052, where the frame's is 1089, so an `fr` split lands each column ~20px under
  the frame's. Anything centred (this fan) can simply ride into the panel's padding — keep it
  `overflow: visible` on desktop and clip only where the canvas cannot afford it. Anything
  left-aligned would have to give the 20 back somewhere visible.
- **Centre absolutely-positioned decoration with `calc(50% ± …)`, not `translate(-50%,-50%)`** —
  the transform slot is wanted for `tilt()`, and the sizes are known anyway. `zIndex` off the
  distance from the middle reproduces the frame's paint order without reordering the map.
- **Read a hand-fanned stack's states off the frame; do not ramp them.** Figma resized these five
  cards by hand, so width, height and artwork step at three different rates and a linear ramp is
  ~7px out at |k| = 1 — which the geometry digest then flags as a defect.
- **A vm key is the honest fix when a design columns apart what layout 1 sets on one line.**
  `sectionVm` gained `rel` (the track subline minus its running time) rather than v1
  string-stripping the ` · 5:42` off `sub`. Additive keys are safe; changing an existing one is
  not, because `dur` is the audio player's whole right-hand column.
- **`paperLine` and `paperFg` are the two that read on a `paper` panel.** `line2` is
  `rgba(paper, .4)` — meant for the dark page ground, invisible on the panel — and the accent is
  not guaranteed against it either (Lime's is acid green on pale lime). Retro keeps the frame's
  literal olive and rust; the flat four take the paper pair.
- **The frame's own `overflow-clip` frames rarely clip on desktop.** Check before inheriting one:
  this fan's cards fit their 371px band with room to spare, and the clip only starts mattering on
  the 390 canvas.
- **Render the list-shaped contents past the count the seed happens to hold.** The harness now
  takes `&n=8`, which fills `c.tracks` with n rows (the array shape, so it also exercises
  art-less rows and the `dur === rel` case). `FIELDS.media.tracks` allows 8 where the frame seats
  5, and the two extra cards fanned straight over the list beside them — a defect no screenshot
  of the seeded five could show. The repertoire (`c.songs`) will want the same check.

Learned on the video section (section 4):

- **A frame can ask for content the section has no field for, and the answer is
  not always to invent one.** This one wanted six videos, a view count, a follower
  count, a like/dislike pair and a verified tick. Sort them: a **list** gets a
  seeded constant in `data.js` written in the row shape a future repeater would
  edit (`VIDEOS`, exactly as `GIGS` and `TIERS` existed before theirs), resolved
  in `sectionVm` by the `songs` rule, so adding the editor later changes nothing
  in `EncoreSection`; a **fabricated metric** gets *dropped*, because a published
  page printing a number the artist never typed is making a claim, which is the
  gallery's hide-the-empty-TikTok rule read one step on. A frame **label**
  ("Top music video", "View All ›", "Follow") stays a literal, the media
  player's "● Popular" precedent. Say in the commit which strings went, verbatim,
  so the call can be reversed.
- **A field the frame needs and no layout has is cheap; a repeater is not.**
  `FIELDS.video` gained `image` and `avatar` — two `type: 'image'` entries, which
  `EditPanel`'s `imgVal`/`ImageField` already handle generically, so the diff is
  the two lines plus one category in `defaultImage`'s avatar branch. A ninth
  structured editor would have been a session of its own. Both live in a layout
  the section's *other* layouts do not draw, which is `FIELDS.media.soundcloud`'s
  case the other way round — say so in the hint.
- **`defaultTrackArt` is a lookup now**, not a `cat === 'media'` test, so a second
  list of per-row seeded artwork costs a line. It is still one of photos.js's
  three resolvers, and `sectionVm`'s `seedArt` is already in scope where the video
  keys are resolved.
- **Match the frame's flex mechanism only where its inputs exist.** The panel's
  rows divide a fixed height and let the thumbnail take its width from that; ours
  have no height to divide, because the list is what makes the panel tall. Sizing
  the thumbnail by *width* at the number the frame's own division lands on (142.9)
  gets the same picture and holds at any count. The `height: 100%` + `aspectRatio`
  transcription silently blew the thumbnails up to ~270px, which no reading of the
  emitted code predicts.
- **Two columns the frame draws flush need not be made flush.** Stretching one to
  the other means the taller column hands its slack to something — and at twelve
  videos that is 250px, which nothing in the stage should take. `items-start` (the
  frame's own) leaves the panel ~20px past the stage's rule at the seeded six, and
  degrades honestly. `marginTop: auto` looks right at six and absurd at twelve.
- **The flat four need their own pairs wherever Retro takes two frame hues.**
  `s.chips[2]` is an arbitrary tag colour that can land on the page ground, and
  the accent is not guaranteed on `paper` — so the discs take `s.ac`/`s.acFg` and
  `s.pillBg`/`s.pillFg`, the list titles take `paperFg`, and the progress track's
  unfilled half takes `line2`, since `paper` on a `bg` bar vanishes on Pop.
- **The emitted colour vars lie about the instance here too**, the media player's
  lesson again: the transport pill came back as `sem/bg` and *is* `#EAD7B8`, but
  its progress track came back as `sem/box/1` and is the cream — sampling the two
  neighbouring pixels is what settles it. The frame carries **no grain** (stddev 0
  over the page ground and the panel).
- **The harness's `&n=` now fills the key the section reads** (`c.tracks` for
  media, `c.videos` for video), and `&n=0` is how the emptied-list state is seen.

Learned on the repertoire (section 5):

- **A full-bleed layout 2 does not need the root's flags.** The convention above
  says a layout 2 standing on cream "would have to widen its own flag to
  `(s.v0 || s.v1)`". It does not, and should not: a block carrying `bleedTo`'s
  own negative margins (`margin: calc(-1 * padY) calc(-1 * padX)`) covers the
  root's border box exactly, so the sheet paints its own ground, the rules run
  to the page edges, and the diff stays inside the section. Widening `cream`
  would also have been the *wrong* cream — the frame stands on box/1 `#FAECD5`
  where layout 1 stands on `#FBF6EA`. Verify by reading the section root's and
  the sheet's `getBoundingClientRect()`: they must be identical.
- **A bleed design's own inset is `s.gPad` (+ `s.surplus` horizontally), not
  `s.padX`.** That is HeaderV0's rule and it is there for the published tab: on
  a window wider than the canvas the sheet keeps bleeding while its content
  stays on the page's measure. At desktop `gPad` is 46, which is exactly the
  frames' usual 56 × 0.82 — the two agree, unlike `padX`'s 64.
- **A section standing on `paper` has to re-token the flat four, all of them.**
  The media player's note named `paperLine`/`paperFg` for *type*; the whole
  palette is affected. `repHue` is `legible()` against the page, and `soft2`,
  `muted` and `line2` are all `rgba(tx, …)` — on Grunge (white `paper` over a
  black page) the entire pager came back white on white and vanished. Worse,
  `pillBg` is the palette's lightest tag hue and `paper` its lightest colour
  outright, so the *filled* current-page button was the same white as its
  neighbours: the mark had to move to an accent **edge**. Retro's own literals
  hid all of this — check `theme=1…4` before believing a design is done.
- **Figma strokes an auto-layout frame without growing it**, so a `border-box`
  transcription of "padding 6, border 3" stands 5px taller than the frame's own
  41. Layout 1 already said this ("the frames' own padding less the border they
  draw inside"); it costs `calc(${u(6)} - ${bw})` and it is worth doing, because
  every such box below it inherits the drift.
- **Pin what the frame lets flow, when the frame only ever drew five of it.**
  The row's number is `shrink-0` with a 14px gap after it — 20px in all for a
  single digit, and the frame never draws a tenth row. Pinning the number at
  that same 20 with the gap folded in puts the title exactly where the frame
  puts it *and* stops "10" shunting its own row's title right.
- **`Pager` now takes `frame.idle`** — the unselected buttons' fill, defaulting
  to transparent. `BookPill`'s `glyph`/`disc` precedent: additive, so every
  caller written before it is untouched.
- **A pager row that is derived can vanish, and the block below it must not.**
  At one page `pageWindow` returns nothing; the foot inset stays (dropping to
  the head's own `gPad`) or the sheet ends flush on the last row's rule.

Learned on the header (section 1):

- **A frame that floats something above its own content inset has to rise out of the root's
  padding.** The header's nav sits 30px from the frame top where the spread starts at 144, and the
  root pads 80 — so the nav carries a `marginTop` of `calc(38px - s.padY)`, which adapts on
  the two narrow canvases. Without it the bar sat 55px lower than the frame's and the section
  opened on dead air. Nothing else in the frame needs this; the body still follows the root.
- **Decoration that hangs off a card can spill off a narrow page.** The seal overhangs the mount
  by 21px, and its 32° rotation adds ~20 more to the box — inside the desktop 64px padding, but
  past the edge at `padX` 22. It tucks in under `s.narrow`.
- **`BookPill` also takes `disc`** (the arrow disc's diameter). The same pill appears twice in this
  frame at two sizes, and only the disc changes; the arrow scales with it at 0.6.
- **`ListenLink` now spreads a `style` prop last** — the frame sets it in the label face beside the
  wordmark, not in the flat templates' tracked-out bold.
- The mount is a **third** Retro cream, `#F3E3C8` (Figma tag/6/text), a shade deeper than box/1's
  `#FAECD5`.

## Open questions

1. ~~**The header.**~~ *Settled.* `HeaderV1` was the invented "Framed" full-bleed; it is now the
   frame's *Feature spread*, and `HEADER_NAMES` (and the README's list) were renamed with it, so
   the setup modal offers "Feature spread · Photo beside the details". Layouts 3–6 are still
   invented designs with no Figma frame behind them.
2. **`tags` and `audio` have no layout-2 design.** This page omits both. They keep their generic
   flat `v1` unless a frame turns up.
3. **The bio's credit line is fixed copy.** Layout 2's foot sets *"Five years of rooms read &
   floors moved"* two-tone, and the bio has no field for it, so it is a literal — prose that will
   read as the artist's own on a published page. Precedent exists for literal *labels* in these
   designs; this is the first literal *sentence*. It needs a `FIELDS.bio` entry if that matters.
4. **The media player's layout 2 has no Soundcloud control.** The frame draws none, so
   `FIELDS.media.soundcloud` — layout 1's one *outbound link* — has no effect on layout 2.
   Inventing a home for it on the bar's `↓` or `⋯` glyph would be worse than the absence, so it
   is left out; if the field should follow the artist across layouts, that is a design call, not
   a fidelity one. (Layout 2 is not otherwise dead on the published page: since the
   `media-player-playback` merge it plays, through the same `<audio>` element layout 1 uses.)
5. **The video section's list has no editor.** `c.videos` is resolved by
   `sectionVm` in the shape a repeater would write, and today always falls
   through to the seeded `VIDEOS`, so an artist can change the poster, the
   heading, the description, the running time and their own photograph but not
   the six videos beside them. Adding `VideosField` — the ninth structured editor
   and the eighth repeater, rows of `{ title, sub, length, when, image }` with a
   `RowThumb`, `TracksField`'s shape minus the audio — is a session of its own,
   and it needs no change on the rendering side. `FIELDS.video` would also want
   the panel's own heading ("Top music video", a literal today, `mediaKicker`'s
   case) if that editor lands.
6. **The repertoire's chip row is not gated at one chip.** With an emptied song
   list the toggle draws a lone `All` inside its outline — a filter that can
   filter nothing. Pricing's row *is* gated ("not rendered at one chip") and the
   repertoire's, in both layouts, is not; layout 2 follows layout 1 deliberately
   rather than making the two halves of one section disagree. If the rule should
   be the section's, it belongs in `Repertoire` once, not in the v1 branch.
7. **Tablet and mobile.** This page is 1440 only. Whether each option has 768/390 masters is
   unverified — check with one `use_figma` `page.query('[name^=…]')` when the desktop pass is
   signed off.
