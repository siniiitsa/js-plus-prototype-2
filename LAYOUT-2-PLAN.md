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

**The same page exists at both narrow widths** (this closes open question 11 — every one of the
eleven options has a 768 and a 390 master):

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Frame 254 | `964:64636` | 1440 × 9410 |
| Tablet | Frame 255 | `984:33491` | 768 × 11057.4 |
| Mobile | Frame 256 | `984:34437` | 390 × 10711.8 |

- Tablet: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=984-33491&m=dev>
- Mobile: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=984-34437&m=dev>

## The sections

**Desktop is fitted, all eleven.** Tablet (768) and mobile (390) are the next pass and come after
the desktop half is signed off. Sizes below are the 1440 frame's; the 1180 canvas takes them
× 0.82 (§5.5, and see *Conventions* below). The 768 and 390 frames are used **verbatim** — no
ramp — so the narrow pass reads its numbers straight off the tables further down.

| # | Cat | Figma node | Frame name | Size | Status |
|---|---|---|---|---|---|
| 1 | `header` | `964:64637` | Headers — **E · Feature Spread** — Desktop | 1440 × 888 | **done** (desktop) |
| 2 | `bio` | `964:64638` | Bios — **F · Portrait + sub-cards** — Desktop | 1440 × 760 | **done** (desktop) |
| 3 | `media` | `964:64639` | *Section* wrapper — see note below | 1440 × 965 | **done** (desktop) `44405c6` |
| 4 | `video` | `964:64645` | Video Players — **A · Dashboard player** — Desktop | 1440 × 782 | **done** (desktop) `33e4d97` |
| 5 | `repertoire` | `964:64646` | Repertoire — **G · Mobile list** — Desktop | 1440 × 792 | **done** (desktop) `2bb0637` |
| 6 | `gallery` | `964:64647` | Gallery Sections — **C · Split showcase** — Desktop | 1440 × 675 | **done** (desktop) `4b4ca5a` |
| 7 | `pricing` | `964:64648` | Pricing — **D · Single big plan** — Desktop | 1440 × 707 | **done** (desktop) `4f8ec90` |
| 8 | `calendar` | `964:64650` | Booking Calendar — **E · Bold slot list** — Desktop | 1328 × 896 | **done** (desktop) `d78619c` |
| 9 | `map` | `964:64651` | Events Map — **B · Featured gig + route** — Desktop | 1440 × 780 | **done** (desktop) `22e5ea1` |
| 10 | `form` | `964:64652` | Enquiry Forms — **E · Sticky sidebar card** — Desktop | 1440 × 792 | **done** (desktop) `9619235` |
| 11 | `testimonials` | `964:64653` | Testimonials — **A · Editorial feature** — Desktop | 1440 × 782 | **done** (desktop) `5a56bb6` |
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

## The narrow masters

The next pass. One section per session as before, and each session fits **both** narrow canvases
of its section unless the two turn out to be different compositions. Every row is `todo`.

| # | Cat | Tablet node (768) | Size | Mobile node (390) | Size |
|---|---|---|---|---|---|
| 1 | `header` | `984:34438` | 768 × 1024 | `984:34636` | 390 × 926 |
| 2 | `bio` | `984:34877` | 768 × 1138.8 | `984:34834` | 390 × 881.3 |
| 3 | `media` | `984:35122` *(wrapper)* | 768 × 1549 | `984:35396` *(wrapper)* | 390 × 1428 |
| 4 | `video` | `984:35259` | 768 × 1112.2 | `984:35737` | 390 × 1101.8 |
| 5 | `repertoire` | `984:35876` | 768 × 792 | `984:35961` | 390 × 594 |
| 6 | `gallery` | `984:36046` | 768 × 468 | `984:36070` | 390 × 364 |
| 7 | `pricing` | `986:10425` | 768 × 915.4 | `986:10492` | 390 × 849.4 |
| 8 | `calendar` | `986:10607` *(in `986:10606`)* | 708 × 741 | `986:10800` *(in `986:10751`)* | 370 × 698 |
| 9 | `map` | `986:10974` | 768 × 823 | `986:11467` | 390 × 1286 |
| 10 | `form` | `986:11591` | 768 × 865 | `986:11633` | 390 × 912 |
| 11 | `testimonials` | `986:11675` | 768 × 796 | `986:11701` | 390 × 870.3 |
| — | `footer` | `986:11787` | 768 × 721 | `986:11727` | 390 × 721 | 

Five things about these that a fresh session would otherwise re-derive.

- **Match on width, never on the name.** The rule the memory note already states, and this page
  is full of examples: the *mobile* header is called "Headers — E · Feature Spread — **Tablet**"
  at 390 wide, both media-player lists are called "— **Desktop**" at 648 and 330, both booking
  calendars are "— **Desktop**" at 708 and 370, and both footers are "— **Desktop**". Only the
  size is trustworthy.
- **`media` and `calendar` keep their desktop wrappers**, at the narrow insets: the media
  `Section` is `Frame 299` → `Frame 297` → `Frame 296` (the *"Five Worth your ear"* heading over
  the fanned carousel) beside the numbered list, and the calendar's `Frame 298` exists only to
  inset its instance. Fit the wrapper's *contents*, as desktop did.
- **The frames' own insets are not our `padX`/`padY`, and at these widths the gap is real.** The
  media wrapper insets 30/60 at 768 and 10/40 at 390; the calendar's 30/56 and 10/40. Our
  canvases carry `padX` 40 / `padY` 56 at tablet and 22 / 44 at mobile. So a line that "just
  fits" in the frame may not here — verify against **content** edges, never against frame `y`.
- **Two sections change shape rather than shrink.** The events map goes 823 → 1286 (the featured
  panel stacks over the list) and the gallery 468 → 364. Read the render before assuming the
  desktop composition simply reflows.
- **The footer stays out of scope** at both widths, for the desktop reason: `NVAR.footer` is 1
  and the fitted footer is already this design.

## Per-session procedure

One section per session. Clear context between sections; git and this file are the memory. The
session that finishes a section does not start the next one — it hands over a paste-ready prompt
and stops (step 7). **In the narrow pass a session takes one section's tablet *and* mobile
masters together** — they are two states of one branch, the `s.narrow` / `s.mob` split every
fitted layout 1 already carries, and splitting them across sessions would have the second one
re-deriving the first's decisions.

1. Read `CLAUDE.md`, this file, and the two memory notes.
2. `mcp__plugin_figma_figma__get_screenshot` on the row's node (`maxDimension` 1400–2000 for
   detail), then load the `figma-design-to-code` skill and `get_design_context` on the same node.
   Use `get_metadata` for the subtree when you need child ids and sizes.
3. Implement it as the `s.v1` branch of the section's component in `EncoreSection.jsx` — see
   *Conventions*. Numbers are the 1440 values × 0.82 on desktop, and the 768 / 390 frames'
   **verbatim** on the two narrow canvases. Every desktop fit already left a narrow fallback in
   place — it degrades on the page's own ramp (`s.gPad`, `s.gGap`, `s.dispLg`) and says so in a
   comment — so the narrow pass is replacing a stated placeholder, not filling a hole. Delete the
   "the 768 and 390 masters are not fitted yet" comment as you go.
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

   In the narrow pass the middle paragraph names both masters instead, and drops "desktop only":

   ```
   The masters are `<tablet node>` (768 × <H>) and `<mobile node>` (390 × <H>) in Figma
   file uFoUbPaBrDicjyuSBEbtGT — the same option this section's desktop fit came from.
   Fit both inside the existing `s.v1` branch of `<Component>` in EncoreSection.jsx,
   using its `s.narrow` / `s.mob` split; the 768 and 390 frames are used verbatim, with
   no × 0.82. Replace the branch's "the 768 and 390 masters are not fitted yet" comment.
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
  `(s.v0 || s.v1)`". It does not, and should not: a block whose margin is
  `calc(-1 * ${s.padY}) calc(-1 * ${s.padX})` covers the root's border box
  exactly, so the sheet paints its own ground, the rules run to the page edges,
  and the diff stays inside the section. Write that margin out in the section —
  `bleedTo()` is not it, because it returns left/right and *one* side, for a
  decoration on a seam rather than a sheet on both. `-padX` is enough on a
  window wider than the canvas because `padX` already carries `surplus`
  (`EncoreBuilder.jsx:2733`), which is also why the sheet's own inset has to add
  `surplus` back to re-centre its content. Widening `cream`
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

Learned on the gallery (section 6):

- **A frame that draws only pictures may still need none of its own copy.**
  Sort the frame's strings the video section's way, then check what the
  *section* has that the frame left no room for. Here the answer was the
  heading — and the pill it went in was already there, so nothing was
  invented and no field was left editing nothing. Prefer that over a literal
  every time: the bio's credit line (open question 3) is the case where it
  was not available.
- **A design with the same count as an existing seam is a seat problem, not a
  content problem.** Seven photographs, seven slots — so the hero is a seat
  and the slots *rotate* through the seats, wrapping, exactly as the media
  player's fan rotates tracks. That reuses `pick` whole, keeps the geometry
  attached to the seat rather than the photograph, and makes the published
  first paint the canvas's picture for free. It also makes "the hero plus the
  other six in order" and "seat j holds slot (active + j) % 7" the same
  sentence, so there is no branch for the hero.
- **`flex: <n> 1 0` is not the way to divide a frame's fixed heights.**
  `box-sizing: border-box` floors a `0`-basis item at its own border, which is
  not proportional — a 1px hairline landed the six tiles up to 0.6px off the
  frame. `flex: ${h} 1 auto` with `height: u(h)` is exact where the container
  is the frame's own height (free space is nil, so each tile is its basis) and
  still divides any surplus in the frame's proportions on a canvas that is
  taller. Figma strokes inside the height it states, so the basis already
  carries the hairline.
- **A flex item wrapping a `<Photo>` needs `minHeight: 0` *and* `overflow:
  hidden`, and the photo needs an `inset: 0` wrapper** — the video panel's
  ~270px thumbnail bug in a different coat: the `<img>`'s intrinsic height
  otherwise floors the item during the `min-height: auto` pass and blows the
  column open. `overflow: hidden` is wanted for the radius anyway.
- **`&n=` now fills `c.images`**, one `null` per slot, so `&n=0` is an emptied
  gallery. A `null` slot and an absent one are not the same thing (`photos.js`'s
  Remove rule) but both render the placeholder here, so the switch proves the
  geometry holds and not much else — the seat rotation is what `live=1` proves.

Learned on the pricing section (section 7):

- **A layout that draws one of something has to reach all of it.** The
  frame shows a single plan; the section holds a list. Wiring the
  frame's in-card toggle row to the *packages* — one chip per package,
  the card showing the one selected — is what stops the design stranding
  every package but the first, which is exactly the defect
  `c.quotes` was written to fix in the testimonials. It also reuses the
  section's existing chip state whole: same `useState`, same `s.live`
  gate, same clamp, same pinned 0 on the canvas, same not-drawn-at-one.
  Prefer that to inventing a control, and prefer it to reproducing a
  frame's own stranding.
- **A hue that has to survive a control belongs to the seat.** The card
  cannot take the *selected* package's colours — it would recolour on
  every toggle (the media player's fan rule) and open on whichever hue
  package 0 happens to draw. `vm.tierHero` pins one, computed by the
  same `tierHues()` the deck's cards now share, and it doubles as the
  empty state's card so both states are one composition.
- **Check the shared pill against the ground you put it on.**
  `BookPill`'s flat branch ignored `bg`/`fg` and painted `ac` on `acFg`,
  which is right on the page ground and invisible on a card in the
  accent hue — Pop's `T.tags[1]` **is** its accent, so layout 1's third
  card was already drawing a pill with only its type showing. Honouring
  them with `?? s.ac` / `?? s.acFg` is additive; the only other caller
  that passes them is `HeaderV1`, which `headerFamily()` renders under
  Retro alone, so the flat diff is confined to this section. Grep the
  callers before touching a shared component — that is what settles
  whether the fix is the component's or the section's.
- **A frame's own copy can be a claim.** Sort it the video section's
  way, and note that dropping a *number* can strip the block around it:
  with `32 reviews · 4.9 ★` gone the avatars and the five stars
  substantiate nothing, so the whole credit row went and only the quote
  stayed — which then needed a `FIELDS.pricing` entry, `FIELDS.video`'s
  `image`/`avatar` case.
- **Two gaps in one grid beat a paired-rows vm key.** The enquiry form
  pairs its boxes in `sectionVm` because its rows and its columns are
  spaced differently; a CSS grid with `columnGap` and `rowGap` carries
  exactly that on its own, and an odd count trails one half-width cell
  regardless. Reach for the vm key only when the pairing is content, not
  spacing.
- **A frame that sets four of eight list items in a second type style is
  an artefact, not a design** — normalise, and say so in the commit.
- **An emptied list leaves a content-sized card very short** (46px here).
  That is accepted rather than floored: nothing else in the file pins a
  height for an empty state, and any minimum would be a made-up number.
  It is only ever seen mid-edit.

Learned on the booking calendar (section 8):

- **When a frame wants a list the section has no field for, check what
  the section's *existing* fields can still reach through it before
  reaching for the seeded constant — and then reach for it anyway.**
  The slot list is genuinely new content (`booked` is the artist's
  negative space; inverting it prints every remaining day of the
  month), so it is `CAL_SLOTS` in the repeater row shape, the video
  section's `VIDEOS` rule. What made that cheap rather than a second
  design was seeding slot one at `CAL_OPEN`: `calPick` then lights it,
  `booked` strikes a slot through as it strikes a cell, `sel` stays the
  same ISO date, and the two layouts share the *whole* live seam
  instead of layout 2 growing one of its own. A layout 2 that leaves
  the section's core fields unread is worse than open questions 4/7/8 —
  those were outbound links.
- **A frame's second column can be ragged because its display numerals
  are.** Its four weekdays land on four different x, and its own column
  head sits 66 to the left of the column it heads. Both are hand-set
  type, not a design (the pricing deck's normalise-and-say-so rule):
  pin the column and give the head the rows' gap. **Measure the pin,
  never transcribe it** — the frame's 330 is what Soulway needs; the
  widest mark Fraunces draws at u(96) is `MAR 09` at 304.6, so the pin
  is u(372), which also clears the flat four's display faces. Loop all
  12 abbreviations × 31 days in the harness rather than eyeballing the
  seeded four.
- **Retro's `paper` IS its page ground** (`paperOf()` returns `bg` when
  the background is the palette's lightest colour), so a frame's cream
  *panel* is a literal under Retro and `s.paper` on the flat four —
  and there it needs an outline too, or a palette whose lightest colour
  is its background draws the card as a hole in the page. Sample the
  wrapper node's ground before assuming a panel bleeds or a root flag
  has to widen; this one stands on the beige page ground and nothing
  shared moved.
- **A desktop-only fit still has to not break the other two canvases.**
  The editor renders all three, and u(96) display type overflowed the
  390 panel outright. Degrade on the page's *own* ramp rather than on
  invented numbers — `s.dispLg` for the mark, `s.gPad`/`s.gGap` for the
  frame's 40/66 insets, and drop the pinned column once the row wraps —
  and say in the branch that the narrow masters are still unfitted.
- **The harness now takes `&booked=2025-06-14,2025-06-20`**, which
  reaches both layouts. `CAL_BOOKED` is empty on purpose, so it is the
  one calendar state no seed shows, and it is what proves the dead row
  really is handlerless (`cursor: auto`, no state change on click).

Learned on the events map (section 9):

- **A frame that features one row of a list has already told you what
  the section's live state means here.** The map's `sel` lit a row in
  layout 1; in layout 2 it *is* the featured gig, and `page` pages the
  same list at the same `gigPage`. Nothing new was added — no state, no
  vm key, no field — and the two halves of the section stay one seam,
  the calendar's slot-list rule. Two consequences fall straight out:
  the list beside the panel is the page **minus** the featured gig, so
  the frame's own "Other upcoming · 4" beside five gigs is *derived*
  rather than transcribed; and the map still draws exactly one pin per
  gig on the page, so the pins can never collide however many gigs the
  artist adds. A layout 2 that paged differently from layout 1 would
  have had to invent its own answer to that.
- **`s.live` state that must always hold something is picked, not
  toggled.** Layout 1's row toggles back to nothing; a featured panel
  cannot, so `onPick` sets rather than flips, and `feat` falls back to
  the page's first gig whenever `sel` is off-page (which covers the
  canvas, the -1 start and a gig deleted under the visitor at once — no
  clamp of its own). Read it as `sel >= first && sel < first + shown.length`,
  not as a clamp: a clamp would drag a pick from page 3 onto page 1.
- **Sort the frame's copy before writing any of it, and count the
  section's own fields against the slots that survive.** Eleven strings
  here were claims (two fabricated metrics, three statuses, three ring
  labels, two dead controls) and each one freed a slot that a real field
  or a real fact could take: the coverage badge went in the chip, the
  travel terms along the map's foot, the gig's hour in the row chip, its
  date and set time in the stat row. **Allocate each field exactly
  once** — the first draft here put `mapTerms` in two places and lost a
  cell to it. Where a frame label duplicates what our field's own copy
  says ("Based in" over `base`, whose default *is* "Based in
  Manchester"), drop the label, not the field.
- **The flat four's dark card needs an outline as much as the cream one
  does.** `deep` is the darkest *tag*, which on Grunge is `#000000` —
  the page ground itself. The calendar's note only covered a palette
  whose lightest colour is its background; this is the same hole at the
  other end, and `line2` (rgba(tx, .4)) is the token that reads against
  the page whichever way the palette runs.
- **`BookPill`'s `bg`/`fg` are a Retro literal here, not a flat fix.**
  Passing `s.pillBg`/`s.pillFg` for all five themes — the pricing
  section's "pass them when the ground is not the page's" — made
  Editorial's pill pale-on-pale. On a *dark* card the accent pair
  BookPill already defaults to is legible by construction, so the
  override is `{...(s.retro ? { fg: '#5B5E2E' } : null)}`. Its
  `shadow="transparent"` is how a frame that draws no offset block asks
  for one.
- **There is no `rgba()` in `EncoreSection` and there should not be.**
  A translucent wash of a colour the branch chose (the lit pin's halo)
  is either an existing vm token, an `opacity` on an element that is
  only a border, or a different design — here a 2px ring instead of a
  halo.
- **The harness's `&n=` rows should exercise the seam, not just the
  count.** `LIST.map` gives every other gig a tickets address and every
  fourth an empty time, so one `live=1` render shows the ↗ present and
  absent, the pill flipping span↔anchor as a linked and an unlinked gig
  is featured, and the chip that drops. The seeded five carry no links
  at all and prove none of it.

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

Learned on the enquiry form (section 10):

- **A section with two photographs is not always `image` + `avatar`.**
  The header's and the video section's `image` is the scene and their
  `avatar` the artist; this section's `image` had been the *artist* since
  layout 1 drew it as a 48px circle, so layout 2's stage shot could not
  take either key without moving a signed-off layout. It is a third key,
  `photo`, resolved in `sectionVm`'s form block and seeded by one line in
  `defaultImage` — `imgVal(f.k)` passes the key straight through, so
  `EditPanel` needed nothing. Check which of a section's photographs its
  existing key already means before assuming the pair.
- **A frame's box can hold a label *or* a placeholder, and the canvas
  decides.** Layout 1 draws both (label above, placeholder inside);
  layout 2 has one slot and the frame fills it with the label. Since the
  published first paint must be the canvas's picture, one string has to
  serve both surfaces — so it is uppercased as a **string** rather than
  by `textTransform`, and the live `<input>` carries it as its
  placeholder without also shouting whatever the visitor types. The
  row's `placeholder` column then reaches layout 1 alone, which is open
  question 4's case at the level of a *column of a repeater* rather than
  a field.
- **`Photo` now takes `ink`** — the initials placeholder's colour,
  defaulting to `s.muted`. `Pager`'s `idle` and `BookPill`'s `glyph`
  precedent: additive, so every caller written before it is untouched.
  A section standing on its own sheet needs it, and the wrapper's own
  ground with it: `soft` and `muted` are both rgba of the PAGE's text
  colour, so on Lime (whose `tx` IS the sheet) a 686 × 358 empty photo
  slot came back as an outlined rectangle with invisible initials in it.
  The repertoire's lesson reaches the shared components too.
- **Three unread fields is the frame's answer, not a failure to try.**
  The types, the message placeholder and the rows' placeholders all have
  no home in the sidebar card. The discriminating question is whether
  the frame draws the control: a textarea would have meant pinning a
  height nothing measures (the pricing deck's invented-number rule), and
  a chip row would have been the gallery's hide-the-empty-TikTok rule in
  reverse. `enquiryMailto` already drops both clauses, so a details-only
  enquiry is a complete one — which is what makes the absence honest
  rather than a hole.
- **A refused control on a 999px pill marks itself with an inset ring,
  not an inset rule.** Layout 1's `inset 0 -3px 0` is a rule under a
  14px-radius box; on a fully rounded one it reads as a smear. `inset 0
  0 0 2px` in the card's accent is the same no-red constraint kept, the
  same no-layout-change, and it reads as the box thickening.

Learned on the testimonials (section 11):

- **A frame's padding can be inert, and transcribing it is then a
  defect.** The rail's three tiles measure 98.63, which is the column
  divided three ways — not the 36 + 19 + 36 the emitted code states,
  and the tiles carry `min-h-px` besides. Keeping the padding floors a
  tile at 74 and stands the rail past the card the moment a fifth
  review is added; dropping it in the column direction (and keeping it
  for the row the narrow canvases lay out) reproduces the frame at
  three and degrades to small legible pills at eight. Multiply the
  frame's own numbers out before transcribing any of them: `98.63 × 3 +
  12 × 2 = 319.9` says which mechanism is real.
- **A `flex-basis: 0` item's border is added after its share is worked
  out**, so the frame's 2px selected tile came out 2px taller than its
  1px neighbours and the column stopped dividing evenly. The extra px
  is an inset ring — the enquiry form's refused-box rule, load-bearing
  here rather than cosmetic.
- **`alignItems` is the cross axis, so a `desk ? row : column` wrapper
  has to swap it too.** `flex-start` is right for the desktop row (the
  card is the taller column and stretching it hands a short review the
  rail's slack) and wrong stacked, where it shrank both blocks to their
  content and stood them off the left gutter. The same call flips the
  card's own `flex: 1 1 0` to `width: 100%`, the pricing card's rule.
- **The stars go, and their slot is where the freed field lands.** This
  is the third frame to draw a rating nobody typed (the pricing deck's
  `32 reviews · 4.9 ★`, the enquiry form's `★★★★★ 42 bookings`), so the
  call was already made; what it bought here was the one place `when`
  could go, which is what leaves every column of `c.quotes` read. Sort
  the copy first, then check which of the section's own fields the
  survivors can carry — the events map's rule.
- **Initials are content, so they are composed in `sectionVm`.**
  `vm.quotes[].mark` sits beside `byline` and carries its own empty-name
  fallback (the row's number). `initialsOf` splits on whitespace alone,
  so the frame's own "Sarah & Tom" marks a tile `S&` unless the
  punctuation is spaced out first — put that case in the harness rows.
- **A section can reach layout 2 with a field that edits nothing
  today.** `FIELDS.testimonials.heading` drew in the flat tail and in
  neither fitted layout; layout 2 is the first design to head the
  section, so it took the field rather than a literal, and the two new
  plain-text fields beside it (`sub`, `cta`) cost a line each in
  `FIELDS`, in `DEFS` and in `sectionVm`. Check what the section already
  has before writing a literal sentence — the bio's credit line
  (question 3) is the case where nothing was available.

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
7. **The gallery's three social links have no home in layout 2.** The split
   showcase is seven photographs and a caption pill: it draws no media-source
   rows, so `FIELDS.gallery`'s `youtube` / `instagram` / `tiktok` — the
   section's three *outbound links*, and the subject of CLAUDE.md's
   hide-the-empty-row rule — have no effect on it. That is open question 4
   (the media player's Soundcloud button) three times over, and the same call
   was made: inventing a row the frame does not draw would be worse than the
   absence. The three hints now say "Layout 1 only". If the addresses should
   follow the artist across layouts, that is a design call for all of them at
   once, not a fidelity fix here.
8. **The pricing section's tags have no home in layout 2.** The single big
   plan names the *packages* in its chip row, so `s.tierChips` — the row
   derived from `FIELDS.pricing.tiers`' tags, and the whole reason the tags
   are a field — reaches layout 1 only. That is open question 4 (the media
   player's Soundcloud button) and open question 7 (the gallery's three social
   addresses) a third time, and the same call was made: a tag row the frame
   does not draw would be worse than the absence. The field's hint now says
   which layout reads them. If the tags should follow the artist across
   layouts, that is one design call for all three cases at once.
9. **The calendar's slot list has no editor.** `c.slots` is resolved by
   `sectionVm` in the shape a repeater would write and today always falls
   through to the seeded `CAL_SLOTS`, so an artist can set the heading, the
   button, the hour, the opening date and the days they are booked — all of
   which layout 2 reads — but not the four slots themselves. This is open
   question 5 (the video list) a second time, and cheaper: `SlotsField` is
   `GigsField` with three plain columns and no assets, so it is that repeater
   copied down rather than `VideosField`'s `RowThumb` work — ~40 lines, a
   `slotsVal` seed resolver in `EditPanel` and one `FIELDS.calendar` entry,
   with no change on the rendering side. It would close this question and
   question 5's sibling half at once if both are done together.
10. **Layout 2's photo field edits nothing.** `FIELDS.calendar.image` fills
   layout 1's polaroid stack, and the slot list draws no photograph at all.
   That is `FIELDS.media.soundcloud`'s case again — the hint now says
   "Layout 1 only" — and unlike questions 4, 7 and 8 nothing is lost by it:
   a table of dates has nowhere a photograph belongs.
11. ~~**Tablet and mobile.**~~ *Settled.* The 1440 page is not the only one: **Frame 255**
   (`984:33491`, 768 × 11057.4) and **Frame 256** (`984:34437`, 390 × 10711.8) carry the same
   eleven options at the two narrow widths, and their per-section nodes are tabled under *The
   narrow masters* above. No `page.query` was needed — the user supplied the two frame links and
   one `get_metadata` on each listed every child. The masters are misnamed even more freely than
   the layout-1 ones (a 390 header called "— Tablet"), so match on width.
12. **Three of the enquiry form's fields have no home in layout 2.** The
   sidebar card draws no chip row, so `FIELDS.form.types` reaches layout 1
   alone; it draws no textarea, so `message` does too; and its boxes hold the
   field's *label*, so each row's `placeholder` column does as well. That is
   open question 4 (the media player's Soundcloud button), 7 (the gallery's
   socials) and 8 (the pricing tags) a fourth, fifth and sixth time, and the
   same call was made three more times: a control the frame does not draw
   would be worse than the absence, and `enquiryMailto` already drops the
   type clause and the message clause, so a details-only enquiry is a
   complete one rather than a crippled one. All three hints now say which
   layout reads them. The `placeholder` case is the first at the level of a
   *column of a repeater* rather than a whole field — if the addresses,
   tags, types and placeholders should all follow the artist across layouts,
   that is one design call for six cases at once.
13. **Layout 2's stage photo is not editable in layout 1, and layout 1's
   own photo is the artist.** `FIELDS.form.photo` is new and reads in one
   layout, which is question 10's shape (the calendar's polaroid) the other
   way round — nothing is lost by it, since a split context panel has
   nowhere a 437px scene belongs. Worth naming only because the section's
   two image fields are now `image` = the artist and `photo` = the scene,
   which is the *opposite* of the header's and the video section's
   `image`/`avatar` pair. Renaming either would move a signed-off layout.
14. **The testimonials' three head fields reach layout 2 alone.** Layout 1
   is the card and nothing else, so `heading` drew in the flat tail only
   and the new `sub` and `cta` draw nowhere else either. That is question
   10's and 13's shape — a field reaching one layout rather than a layout
   missing a field — and it is the friendlier half of it, since nothing
   the artist typed goes unread: layout 2 is the first design here to
   have anywhere to put a head. It is only worth naming because the
   section is now the one place where **layout 1 reads strictly fewer
   fields than layout 2**. Giving layout 1 a head would move a
   signed-off design, which is a design call and not a fidelity one.
