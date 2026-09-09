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
of its section unless the two turn out to be different compositions. Every row is `todo` unless a
Status says otherwise.

| # | Cat | Tablet node (768) | Size | Mobile node (390) | Size | Status |
|---|---|---|---|---|---|---|
| 1 | `header` | `984:34438` | 768 × 1024 | `984:34636` | 390 × 926 | **done** `16304dc` |
| 2 | `bio` | `984:34877` | 768 × 1138.8 | `984:34834` | 390 × 881.3 | **done** `7c18379` |
| 3 | `media` | `984:35122` *(wrapper)* | 768 × 1549 | `984:35396` *(wrapper)* | 390 × 1428 | **done** `9bc548d` |
| 4 | `video` | `984:35259` | 768 × 1112.2 | `984:35737` | 390 × 1101.8 | **done** `dc07cb8` |
| 5 | `repertoire` | `984:35876` | 768 × 792 | `984:35961` | 390 × 594 | **done** `46747ad` |
| 6 | `gallery` | `984:36046` | 768 × 468 | `984:36070` | 390 × 364 | **done** `7c43ca6` |
| 7 | `pricing` | `986:10425` | 768 × 915.4 | `986:10492` | 390 × 849.4 | todo |
| 8 | `calendar` | `986:10607` *(in `986:10606`)* | 708 × 741 | `986:10800` *(in `986:10751`)* | 370 × 698 | todo |
| 9 | `map` | `986:10974` | 768 × 823 | `986:11467` | 390 × 1286 | todo |
| 10 | `form` | `986:11591` | 768 × 865 | `986:11633` | 390 × 912 | todo |
| 11 | `testimonials` | `986:11675` | 768 × 796 | `986:11701` | 390 × 870.3 | todo |
| — | `footer` | `986:11787` | 768 × 721 | `986:11727` | 390 × 721 | out of scope |

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
  desktop composition simply reflows. *(The gallery turned out not to be one: both of its narrow
  masters are the desktop row, and the 364 is the band getting shorter — see its notes below.
  The events map's 1286 is still unread.)*
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
   Use `get_metadata` for the subtree when you need child ids and sizes — in the narrow pass read
   it *first*, because it is where a master that changes shape rather than shrinking shows up.
   And **always `get_variable_defs` on the node**: it resolves that master's mode, so every
   `size/…`, `border/…` and `radius/…` the emitted code prints as the desktop default comes back
   at its real value. One call, and it settles the type ramp the four sections before it measured.
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

Learned on the header's narrow masters (section 1, and the first of the narrow pass):

- **The narrow frames are the desktop component at its *own* numbers, and only
  the type ramps.** Every box dimension in both header masters is the 1440
  frame's unscaled value — the mount's padding is 20 at 768 where the 1180
  canvas draws 16, the rail 90 where it draws 74, the card's rule 3 where it
  draws 2.5 — so a padding can be *larger* at 768 than at desktop and still be
  right. What does ramp is the type: `size/label-lg` goes 24 → ~19 → ~17 across
  the three widths. Transcribe the boxes, measure the type.
- **`var(--size/…, N)` is the component's default, and at these widths that
  bites three times.** The wordmark emits 24 at both narrow widths and measures
  20 and 17; the rail label emits 20 and measures 17 and 16; the hero emits
  `display-lg 96` at both and is 59.5 at 768 (the 768 text node's own 106 over
  two lines at leading .89) and 40 at 390. **A node's measured width or height
  is a fact; a token in the emitted CSS is a default.** Where they disagree the
  geometry wins.
- **Divide the face out before comparing any width.** The frames' face runs
  **~0.76 of Anton's set width** (and Fraunces is wider than Soulway the same
  way — the calendar's lesson). So "our line is 30% longer than the frame's" is
  the expected reading at the *right* size, not evidence of the wrong one. Two
  ways to size against it: match the ink **cap band**, or divide the measured
  set width by 0.76. They agreed to within a pixel on every string here; the
  raw width alone said 16 where the truth was 20.
- **When the wider face will not fit, the decoration is what gives way.** The
  390 rail is 169 tall and holds a globe, `s.location` and a rule. At the
  frame's own label size our line ate the lot, clipped, and pushed the rule out
  of the rail entirely. `flex: 0 1 auto` on the rule and `overflow: hidden` on
  the rail is the fix: the rule shrinks from 37 to whatever is left, and a long
  city clips the way the frame's own `overflow-clip` rail does. Do not shrink
  the artist's line to protect a hairline.
- **A frame's *count* is still the component's default, even in the chrome.**
  The 768 nav draws three links; `navLinks` is the artist's page and the seeded
  eleven sections give nine, which at the master's own 16px is 765px of type in
  a 688px canvas. The burger therefore holds at 768 — the bio's five-chip rule
  reaching the navigation — and what the masters settle is the *capsule* the
  burger stands in (the 390 one draws the burger inside the very pill the 768
  one fills with links), the wordmark, Listen and the pill's scale. Check the
  real count against the real width before transcribing a nav.
- **A rotated square in the metadata is a bounding box; a rotated *disc* is
  not.** The seal's `173.02` at 768 is the 1.38 inflation the memory note
  describes, and the disc is 125. But because a circle's bbox is itself, the
  "the 32° rotation adds ~20 to the box" worry the desktop fit wrote down was
  never real — both narrow seals sit inside the root's padding at the frame's
  own offsets (centred 63 from the mount's right edge and 4.6 above its bottom
  at 768; 55 and 0 at 390).
- **`Checkerboard`'s `cell` is the repeating tile, which is two squares wide.**
  The desktop fit read it as the square and drew four 5px rows where its own
  comment claimed two of 9.7. Its `height` default is one tile, so stating
  `cell` alone is both correct and self-documenting. Worth grepping for: any
  caller passing `cell` *and* a height is asserting something.
- **Take the desktop before/after digest by `git stash`, not from a second
  build.** One tab, one origin, one window size: stash the file, reload, walk
  the section into `localStorage`, pop, reload, diff in the page. It caught
  exactly one row here (the checker) out of 86 and cost two navigations — far
  cheaper than the two-server recipe in `verifying-the-published-tab`, which
  exists for comparing two *builds*.
- **`headerFamily()` renders `HeaderV1` under Retro alone**, so the header is
  the one §10.2 section where the `theme=1…4` check does not apply. Every other
  section still needs it.

Learned on the bio's narrow masters (section 2):

- **"Only the type ramps" is true but not uniform — it ramps by *face*, and
  every token has to be measured on its own.** Both masters emit the desktop
  component's `var(--size/…, N)` for all of them, and the three renders say
  otherwise in three different ways: the Anton labels drop hard (label-lg
  24 → 16 → 14, label-sm 16 → 13 → 12), the Tags component dropped into the
  card drops hardest (15.4 → 11 → 9.5), Inter's **body-sm does not move at
  all** — the caption's sub line measures 201px in all three renders — and
  body-lg gives up a single point, 16 → 15. The header's "measure the type"
  is right; what it does not say is that one measurement does not settle the
  next.
- **Two ways to measure a label, and the integrated one is better.** A set
  width off the render tells you a ratio; the **card's own height** tells you
  the size *and* checks the paddings around it in one number. The caption card
  is `36 + 1.1·T + 4 + 16.8`, so 83 / 75 / 71 across the three widths pins the
  title at 24 / 16 / 14 and confirms the 18px padding is verbatim at the same
  time. Prefer a box whose height is a sum of the things you are transcribing.
- **The body face is Inter on both sides, so body widths compare directly** —
  unlike the header's Anton/Soulway and the calendar's Fraunces/Soulway, where
  the ~0.76 division applies. Our 11px chip came out 54.3 against the frame's
  53. Check which face a token uses before reaching for a correction factor.
- **A component's fixed height is no more its instance's than a type token
  is.** The caption's 36px disc is a circle on desktop and a 36 × 16.8 **pill**
  in both narrow instances, because there the height hugs its one 12px line.
  The emitted class list is the tell — `w-[36px]` with no `h-[…]` — so read hug
  vs fixed on every small box, not just the type.
- **A leaked desktop width can be the thing that produces the frame's layout,
  which makes the layout an artefact.** The 390 credit row still carries the
  desktop component's `w-[637.498px]`, and that is *why* the pill wraps under
  the line. The master itself is a column at `gap-[9.644px]` — so transcribe
  the column, not the wrap. (The memory note's "absolute numbers leak
  unadapted" case, one step on: here the leak is invisible because Figma's own
  wrap absorbs it.)
- **The narrow canvas is narrower than the frame, and a stated height does not
  care.** 688 against the frame's 708 at 768, 346 against 370 at 390 — so a
  card given `h-[648px] w-full` lands 3% and 6.5% more upright than the master
  draws it. That is the honest transcription and it is worth naming in the
  commit; deriving the height from the width instead would have been inventing
  a number the frame does not state.
- **A `git stash` desktop digest is two navigations and settles the whole
  question.** 35 rows here, zero differing. Take it in the *harness* rather
  than the editor — `?w=desktop` needs no clicks, no sidebar state and no
  popup, so the "canvas width is the digest's whole premise" trap in
  `verifying-the-published-tab` does not arise.
- **The `/featured` pill is 2.3px taller than the frame's, and that is a
  geometry diff, not a content one.** Figma strokes an auto-layout frame without
  growing it (the repertoire's lesson) and this pill's 1.417 rule is drawn
  outside our padding, so 27.6 stands against the master's 25.34. It was left
  that way to match what the *desktop* branch of the same element already does —
  consistency inside one branch beat accuracy in half of it — but the
  `calc(padding − border)` fix is the correct one if this element is ever
  revisited, at all three widths together.

Learned on the media player's narrow masters (section 3):

- **Make the ×0.82 a variable, not a search-and-replace.** The header's "the
  narrow frames are the desktop component at its own numbers" is a statement
  about the *whole* branch, so the honest expression is one `z = desk ? 0.82 : 1`
  inside the existing `u()` and `off()`. Here that one line carried the fan's
  five hand-set card states, the bar's 108 and its 60px sleeve, the rows' 64px
  artwork, the Featured tab's offsets and a dozen paddings — and what was left
  to write was only the handful of places the masters genuinely differ. It also
  makes the desktop digest a real test: every number in the branch now flows
  through the switch, so a slip shows up at `?w=desktop` immediately.
- **A master can overlap its own blocks, and the arithmetic is what proves it
  rather than a guess.** The 390 Frame 296 is 622 tall where a 72 heading, a 10
  gap, a 468 band, a 24 gap and a 108 bar come to 682 — so it reclaims 49 of the
  fan band's empty top rather than stacking the two. Read it off the *bar*: its
  top is 514 down the column in both the metadata and a PIL row scan, and
  `71.2 + g + 468 + 24 = 514` gives `g = −49.2` exactly. Then state the
  collision bound in the comment (62px clear of the first card, a third title
  line spends 36 of it) — a negative margin without one is a trap.
- **A frame's own render can be the artefact, and the tell is that it destroys
  its own content.** The 390 bar emits the desktop 40/24 into a 330px pill and
  leaves the track it is playing a sliver of its sleeve; the 390 rows emit 30/20
  and hard-clip "Manchester at 3am" mid-word. Both are the leaked-desktop-number
  case (`figma-frame-reading`'s fourth bullet) at the point where honouring the
  absence would publish a player naming nothing. Override at 390 only, keep 768
  verbatim, and say in the commit which numbers went and what paid for what.
  Once the call is made it applies consistently: having decided the bar's
  padding pays for the track, the transport's internal gap does too.
- **`flex: 1 1 auto` + a `minHeight` on the column is how a frame's stated
  instance height survives a variable list.** Both masters state the list at 596
  and let five rows divide what the counter row and the gaps leave — 574, so each
  row takes a fifth of the 22 over and stands at 100.4. `1 1 0` would squeeze
  eight rows into the same 596; `flex: none` would give up the 22 and run 4.4px
  short per row. This is the gallery's `flex: h 1 auto` rule with the basis left
  to the content. **And drop the minimum when the list is empty** — the number is
  a division target, so with nothing to divide it is 596px of hole.
- **Both narrow canvases are narrower than their frame, and for a centred
  composition that is a clip, not a reflow.** 688 against 708 at 768 and 346
  against 370 at 390. Bleeding the fan band back over the panel's own padding
  (`margin: 0 -pad; width: calc(100% + 2·pad)`) is what keeps the loss to twelve
  pixels at 390 instead of forty — the repertoire's written-out-margin pattern
  used for a band inside a panel rather than a sheet on the page.
- **`tab ? s.h1 : s.dispLg` is the display head's ramp on this page.** 60 at 768
  is the masters' measured 59.5 to within half a pixel and 40 at 390 is exact,
  which is the same call `HeaderV1`'s hero makes. Measure it off the line
  box — 53 on one line, 72 on two at leading .89 — never off the emitted
  `size/display-lg`, whose 96 is the component's default at all three widths.
  And **drop a desktop `maxWidth` at narrow**: layout 1's 5.8em measure exists to
  reproduce a break the 1440 frame draws, and forcing it at 768 would break a
  line the master sets whole.
- **The face factor is per *token*, not per face, because Fraunces is optically
  sized.** At `size/title` 24 ours runs ~1.3× the frame's set width — the
  header's ~0.76 the other way up — so the 390 master shows "Late Lights" in
  99px of Soulway where Fraunces needs 130, and a title that fits there
  truncates here. But at the display head's 60 ours came out *narrower*: 531px
  against the master's ~612 of ink for the same string. Same two faces, opposite
  directions. So do not carry a correction factor from one token to the next —
  measure each, and never conclude a display size is wrong because a body-sized
  ratio says so. And check a truncation against the frame's own clipping before
  calling it a defect: both narrow masters clip these titles too.
- Sizes that did **not** ramp at either narrow width, measured rather than
  assumed: `size/title` 24 (the row and bar titles), `size/body-sm` 12, `chip`
  12. The 390 row's title-plus-sub block is 47.2 tall and sits centred in a
  100.4 row, which is the one arithmetic that pins both at once.

Learned on the video section's narrow masters (section 4):

- **Read the masters' *structure* out of `get_metadata` before believing they
  only shrink.** The media player's "only the type ramps" is not a general law:
  here the panel leaves the stage's side for a full-width block, its list goes
  to two columns, the row's thumbnail moves from beside its lines to above them
  at 390, and the artist row's controls drop to a line of their own. All four
  are visible in the metadata's x/y before any render is fetched — the giveaway
  is two children sharing a `y` (a grid) or a child whose `x` is 0 under a
  sibling (a stack). Only after that does the `z = desk ? 0.82 : 1` switch carry
  the rest, and here it carried a great deal: every box in the player, the
  stage's gaps, the artist row, the panel's rule and corner, the list's 23s.
- **A narrow master can be a flattened raster.** Both players here are a single
  image node with no children, so the transport bar's discs, gaps, paddings and
  track are simply not in the emitted code. Measure them off the PNG — find the
  bar's own fill inside the player, then take the columns that are *not* that
  fill and read the runs. That gave 28px discs at 768 (the desktop number) and
  22 at 390, with the gaps and paddings falling out of the same scan.
- **Two independent readings pin a type size; one does not.** For every token
  here the text node's height over its own leading and the set width as a ratio
  of the 1440 node's agreed to within a rounding: label 20 → 14 → 13,
  display/list 16 → **12 → 13**, body-md 14 → 13 → 13, body-sm 12 throughout.
  Take both readings — the ratio is what catches a leading you assumed wrong,
  and the height is what catches a string whose glyphs differ.
- **A type ramp need not be monotonic, and the reason is the column.** The row
  title is *smaller* at 768 than at 390 because the 768 grid's columns are
  150.5 and the 390 grid's are 163.5. Write the reason in the comment or the
  next reader will "fix" it.
- **Where the master shrinks a control instead of dropping it, follow it.** The
  fallback this replaced dropped the bar's Maximize and ⋮ at 390, on the media
  player's rule; the master keeps all six discs and pays out of their size and
  spacing. Both are legitimate answers to the same squeeze — which is why the
  master has to be *read* rather than reasoned from the section next door.
- **Transcribe a stack; do not leave it to `flexWrap`.** The 390 artist row
  wraps in the frame at a fixed point (name, then controls 25 below). A
  `flexWrap` row with a `flex: 1` spacer wraps wherever the artist's own name
  runs out, which is a different picture on every page. Name the two halves and
  branch the wrapper.
- **Figma states a padded, stroked box's inset *including* the stroke.** The
  panel's 30 (768) and 10 (390) each already contain the 3px rule, so a plain
  `padding` runs 3px wide — the repertoire's `calc(padding − border)` case,
  third sighting. Left as it is here because the desktop half of the very same
  property carries the same drift and moving it is a signed-off change. (At 390
  the 6px it costs happens to be cancelled by the rows measuring 1.8 short —
  a coincidence in the panel's total height, not a reason the drift is safe.)
- **`&n=7` is the odd-count check a 2-column grid needs** — four rows with the
  last a single half-width cell — and there is no `live=1` check to run: video
  is one of the two categories with no `s.live` seam at all.

Learned on the repertoire's narrow masters (section 5):

- **`get_variable_defs` resolves the mode's tokens outright — call it on every
  narrow master, first.** It is the tool the four sections before this one did
  without, and it answers in one call what they each spent a session measuring:
  on this section it returned `size/display-sm` 32, `size/list` 12,
  `size/body-md` 13, `size/body-sm` 12 and `border/default` 3 for the 768
  master and the same list with 26 and 13 for the 390 one. The header's
  "`var(--size/…, N)` is the component's default, and a node's measured width is
  a fact" still holds for what the *emitted code* says — every one of these came
  back in the emitted CSS as the desktop default — but the variable defs are a
  third source that is neither, and they are exact. Measure only to confirm.
- **Do not size a token off a Figma text node's stated height.** They are line
  boxes rounded to whole pixels, which is far too coarse: 14 and 16 here are
  12 × 1.2 and 13 × 1.2 rounded, and reading them as exact gives 11.67 and 13.33
  — a ratio of 1.14 where the rendered set widths (43 → 47) say 1.08. The
  widths are the honest measurement, the token is better than both, and the
  height's only real use is a box whose height is a *sum* of things you are
  transcribing (the bio's caption card).
- **A type ramp can go back up at 390, and the reason need not be the column.**
  `size/list` is 16 → 12 → **13** with the column going 529 → 384 → 195. The
  video section's non-monotonic row title had a column-width explanation; this
  one does not, and inventing one would have been worse than saying so. Write
  the token values in the comment and leave the cause alone.
- **The masters can keep a two-column grid a phone has no business with.**
  195px columns at 390, five rows in each. The unfitted fallback had collapsed
  to one column of six — which is what layout 1's own 390 master does — so the
  narrow pass here *removed* a device branch rather than adding one. Read the
  metadata's x/y before assuming a narrow master reflows: two children sharing a
  `y` is the video section's giveaway and it fires here too.
- **The frames' page inset stops being one number below desktop.** 56 all round
  at 1440, but 30 horizontal / 60 vertical at 768 and 10 / 40 at 390 — and the
  pager band takes 20 rather than 40 at 390, so even the two vertical insets
  part company. For a **bleed** design, which supplies its own, that is three
  constants to write out (`padH`, `headPadY`, `footPadY`); `s.gPad` matched the
  frame only at desktop (46 = 56 × 0.82) and is 32 against 30 and 20 against 10
  below it. The 10 is worth taking rather than rounding up to `gPad`: it is what
  leaves the 390 row its 155px of title.
- **`gap` and `rowGap` are the same axis once a row becomes a column.** The head
  sets `gap` for the desktop row and `rowGap` for its wrapped chips; at 390,
  where `flexDirection` flips, the master's 10 has to go in the `rowGap` or the
  wrap's 12 silently wins — worth 2px, and the whole section stood 2px tall
  until the digest caught it. `alignItems` flips with it, the testimonials'
  lesson: `stretch` blew the 217px toggle out to the full measure.
- **`pageWindow`'s `narrow` argument is layout 1's answer, not the section's.**
  Its three-button mode is what layout 1's 390 master draws; this composition
  draws the desktop's seven-slot row at both narrow widths and fits it by
  dividing the measure (46 at 390 against 94.3 at 768). Pass `false`, and note
  that our row runs one button longer than the frames' at their fictional
  twenty pages — an existing desktop diff, not a new one.
- **The `git stash` desktop digest is the whole safety net for a `z` switch.**
  81 elements at `?w=desktop`, zero rows differing — which is only meaningful
  because every number in the branch now flows through `z`, `bw` (`u(3)`)
  included. Take it in the harness, in one tab, before committing.

Learned on the gallery's narrow masters (section 6):

- **A master can *unhide* a node the desktop master hides, and that is the
  cleanest kind of narrow diff there is.** The 768 head row is
  `hidden="true"` on the 1440 master (`get_metadata` prints the attribute;
  the emitted code simply omits the node, so `get_design_context` alone would
  never have shown it) and absent from the 390 sub-component, so it belongs to
  one width. Read the desktop metadata beside the narrow one for exactly this:
  it is how you tell "the master added a row" from "the desktop fit missed a
  row".
- **A slot that appears at one width only is where a field the design had
  nowhere for finally goes.** The heading was the caption pill's first line
  because the desktop frame had no other place; at 768 it has one, so it moves
  and the pill keeps the artist's name alone. Allocate each field exactly once
  (the events map's rule) rather than printing it in both — and check the
  *frame's* own copy for the same duplication before transcribing it.
- **`flex: 1 0 0` under siblings carrying leaked desktop heights is the tell
  for a squeezed master.** The 768 masonry's third tile in each column is a
  fill; its two siblings still state 123/215 and 194/242 against a 358 band,
  so Figma collapses the fill to `min-h-px` and the render shows four tiles
  where the component has six. That is not a four-tile tablet design — a
  designer does not leave two 1px frames in one. Divide the band in the
  frame's proportions instead: it shows all six, and it is what the desktop
  branch's `flex: ${h} 1 auto` already does. **Honouring a squeeze costs
  content**, which is the one thing a fidelity argument never buys.
- **When every tile in a rail is `flex: 1 0 0`, the count is the design and
  the height is derived.** The 390 rail seats ten at 48.8; the section has
  six, so the same mechanism at our count stands them at (284 − 20) / 3 = 88.
  No ramp, no invented number, and nothing to reconcile with the frame — the
  frame states the mechanism, not the pixels. Contrast the bio's five chips
  (a *count* default to ignore) — here the count is ours by construction.
- **Wrap at the width that needs it, not at all three.** The head row wants a
  column round it; putting that column in at every width inserts an element
  into the desktop tree and every row of the `git stash` digest shifts under
  it. `tab ? <div col>{head}{grid}</div> : grid` keeps the desktop DOM
  identical, which is what makes the digest a test rather than a diff to read.
- **`size/chip` is 12 at 1440 and 11 at both narrow widths** — one
  `get_variable_defs` call, and the only token in this section that is not the
  desktop number verbatim. Everything else the two masters state (the 30
  radius, the 10 gaps, the pill's 40/14/10/4, the 1px hairlines) is the
  desktop component's own value unscaled, the header's rule holding for a
  fourth section.
- **A placeholder ramp is still an invented number; say so where it is
  written.** `Photo`'s `initialsSize` goes 52/34/26 on the hero and 26/20/10
  on the tiles, read off each master's tile *width*. The frames are
  photographs throughout and Retro seeds them, so this is only ever seen on
  the flat four and mid-edit — which is the reason it is allowed to be
  approximate and the reason it has to be commented.

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
15. **The media player's bar draws an invisible sleeve on the flat four.**
   Its `<Photo>` falls through to the initials placeholder when the track
   has no artwork — which is every track on Lime, Grunge, Editorial and
   Pop, since only Retro seeds photography — and the placeholder's ink
   defaults to `s.muted`, an rgba of the *page's* text colour, against a
   bar standing on its own near-white ground. On Grunge the initials
   vanish outright. This is the enquiry form's `Photo` `ink` lesson (the
   prop exists for exactly this) reaching a branch fitted before it, and
   it is **desktop's**, not the narrow masters': the same hole renders at
   all three widths, and it was found running the `theme=1…4` check for
   the narrow pass rather than introduced by it. Left alone deliberately —
   fixing it moves a signed-off design and shows up in the desktop
   digest. It is one `ink` prop on the bar's `<Photo>`, and the fan
   cards' and the rows' want checking at the same time.
