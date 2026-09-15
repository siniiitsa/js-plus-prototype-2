# Retro layout 3 — section-by-section plan

Working checklist for fitting **layout 3** of every Retro section to Figma, one section per
session, clearing context between sections. Layouts 1 (`s.v0`) and 2 (`s.v1`) are fitted and
signed off at all three widths; nothing here should touch either.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then
[`layout-2.md`](./layout-2.md)'s *Conventions* section — ~110 bullets, every one of
them still true, and this file does **not** repeat them — then the two memory notes
`figma-frame-reading` and `verifying-the-published-tab`. `SPEC.md` lives in git history —
`git show 8fa8ff4:SPEC.md`.

Branch: **`retro-layout-3`**.

## The Figma source

Layout 3 is a third full page composed of a third option for each section, and — unlike layout 2
— **all three canvases were supplied up front**, so there is no desktop-then-narrow split this
time (see *Per-session procedure*).

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Frame 255 | `964:68621` | 1440 × 8481.5 |
| Tablet | Frame 260 | `977:21117` | 768 × 9427.9 |
| Mobile | Frame 261 | `982:8748` | 390 × 9929.4 |

- Desktop: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=964-68621&m=dev>
- Tablet: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=977-21117&m=dev>
- Mobile: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=982-8748&m=dev>

`fileKey` = `uFoUbPaBrDicjyuSBEbtGT`.

**Frame names collide across pages — match on node id, never on the name.** This desktop page is
called "Frame 255", which is also the name of layout 2's *tablet* page (`984:33491`). Layout 2's
rule that the per-section masters are misnamed holds here and then some: every one of the tablet
page's bio/tags/audio/media/calendar instances is called "— Desktop", and both narrow footers are
too. Only the width is trustworthy.

## The sections

**Twelve to fit — and all twelve are fitted** (the testimonials closed the list at
`21a5afa`). Sizes are the frames' own; the desktop numbers land on the 1180 canvas at
**× 0.82** as before, and the 768 / 390 frames are used **verbatim**. Each row's three masters are
one session.

What is left of the pass is the **end-of-pass `index.html` refresh**, which is one deliberate
step and not a section: `npm run build:standalone`, `cp source/dist-standalone/index.html
index.html`, and the checks in `layout-2.md`'s *Learned on the end-of-pass refresh*. Expect
the two-build digest to come back at **zero rows** — `EXAMPLE_PAGE` is `arch 0` throughout, so it
renders layout 1 for every section and layout 3 appears only in the sidebar's layout-picker
thumbnails — and prove the new work shipped by grepping the built file for a value only these
branches emit.

| # | Cat | Desktop node | Frame name | Size | Tablet node | Size | Mobile node | Size | Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `header` | `964:68622` | Headers — **D · Inset Hero** | 1440 × 900 | `977:22532` | 768 × 1024 | `982:9583` | 390 × 930.5 | **done 43fa3ae** |
| 2 | `bio` | `964:68631` | Bios — **E · Stacked ID card** | 858 × 882 | `977:22717` | 708 × 912 | `982:10013` | 370 × 860 | **done dac7d44** |
| 3 | `tags` | `964:68632` | **Tags — Frame** | 858 × 75 | `977:22718` | 708 × 67 | `982:9769` | 370 × 97 | **done 3df9565** |
| 4 | `audio` | `964:68641` | Audio Player Componenets — **H · Bar-meter player** | 858 × 243 | `977:22727` | 708 × 243 | `982:9778` | 370 × 243 | **done 47b9d22** |
| 5 | `media` | `964:68642` | Media Player — **A · Editorial numbered list** | 858 × 647 | `977:22728` | 708 × 647 | `982:9779` | 370 × 647 | **done 16d28b0** |
| 6 | `calendar` | `964:68645` | Booking Calendar — **C · Mobile availability** | 405 × 497.9 | `984:10605` | 708 × 456.9 | `984:10673` | 370 × 433.9 | **done f9c768e** |
| 7 | `repertoire` | `964:68646` | Repertoire — **E · Curated set-list cards** | 1440 × 621 | `977:23041` | 708 × 636 | `982:10193` | 390 × 697 | **done 8c09b90** |
| 8 | `gallery` | `964:68647` | Gallery Sections — **B · Masonry grid** | 1440 × 789 | `977:23131` | 768 × 865 | `982:10257` | 390 × 678 | **done c1836da** |
| 9 | `pricing` | `964:68648` | Pricing — **F · Stacked rows** | 1440 × 1022 | `977:23149` | 768 × 941 | `982:10274` | 390 × 1358 | **done ecba065** |
| 10 | `map` | `964:68649` | Events Map — **A · Split list + map** | 1440 × 804 | `977:23264` | 768 × 809 | `982:10389` | 390 × 878 | **done 791e0c1** |
| 11 | `form` | `964:68650` | Enquiry Forms — **F · Full-bleed hero form** | 1440 × 548 | `977:23406` | 768 × 680 | `982:10472` | 390 × 722 | **done 262b968** |
| 12 | `testimonials` | `964:68651` | Testimonials — **D · Bento wall** | 1440 × 790 | `982:8584` | 768 × 777 | `982:10499` | 390 × 1076 | **done 21a5afa** |
| — | `video` | *none* | — | — | *none* | — | *none* | — | **no layout-3 design on this page** |
| — | `footer` | `964:68652` | Component 2 | 1440 × 479.5 | `982:8688` | 768 × 721 | `982:10543` | 390 × 721 | **out of scope** |

- **`video` has no layout-3 design.** This page omits it, the way layout 2's page omitted `tags`
  and `audio`. `NVAR.video` stays 2 and the section keeps its fitted `v0`/`v1`.
- **`tags` and `audio` get their first Figma fit ever.** Layout 2's open question 2 — "they keep
  their generic flat `v1` unless a frame turns up" — is answered: a frame has turned up for both.
  Their `v0` and `v1` stay generic flat.
- **The footer stays out of scope**, for layout 2's reason: `NVAR.footer` is 1, and these are the
  same three designs the fitted footer already is (`Component 2` at 1440 × 479.5 against layout
  2's 1440 × 480; both narrow ones 721 tall, as layout 2's were).

## The composed page, and what our page does instead

This is the thing layout 3 has that layout 2 did not, and it has to be settled before section 2.

The 1440 page does **not** stack twelve full-width bands. Five of the twelve sit inside a composed
two-column region, `964:68623` ("Frame 299", 1440 × 2528):

```
Frame 299  (1440 × 2528)
├─ left column                      (878 wide at x 56)
│  ├─ Section  964:68625            (858 × 1157)
│  │  ├─ Frame 964:68626  (858 × 140)   "KM BIO" eyebrow + "Reads the room."  ← display head
│  │  ├─ Bios — E · Stacked ID card     (858 × 882)
│  │  └─ Tags — Frame                   (858 × 75)
│  └─ Section  964:68633            (858 × 1175)
│     ├─ Frame 964:68634  (858 × 225)   "KM BIO" eyebrow + "Five worth your ear"  ← display head
│     └─ Frame 301  964:68640           Audio (858 × 243) over Media (858 × 647)
└─ Frame 300  964:68643             (405 × 659.9 at x 979)
   ├─ "Book Me"  964:68644          (106 × 26)                                    ← head
   └─ Booking Calendar — C · Mobile availability  (405 × 497.9)
```

Our page has no columns: `EncoreBuilder` stacks sections, each at the content column's full
width. So **the composition is not reproduced — the instances are.** Four rules follow, and they
are the whole reason this heading exists:

- **No master shows the columned five at our desktop width, and that is open question 1.** Our
  desktop content column is `canvasW` 1180 − 2 × `padX` 64 = **1052**. Transcribed at the pass's
  × 0.82, the 858-wide instances ramp to **704** — and 704 is almost exactly what the tablet page
  draws them at (708). So the tablet master is *not* a preview of what our canvas asks for; it is
  a preview of the ramped instance, and the column is ~50% wider than any state these designs
  have been drawn in. The calendar is the same problem at its extreme (405 → 1052), not a
  different one.

  Two answers are available — fill 1052 and say which parts stretch, or cap the block at 704 and
  choose left-aligned against the column or centred in it — and the point is that **all five have
  to give the same answer**. `bio` is first of the five, so **its session takes the decision once,
  records it in *Conventions* below, and tags, audio, media and calendar follow it.** Do not
  re-open it per section. What the tablet and mobile pages *do* prove is that these designs are
  fluid rather than pinned at 858: both give every one of these instances their page's full
  content width (708 and 370).
- **Check the Components page for a wider master first** — for the calendar especially, whose two
  drawn widths disagree about the composition rather than just its size. A 1440-wide master of
  "Booking Calendar — C · Mobile availability" would settle its half of question 1 outright.
- **The two display heads belong to sections, not to wrappers.** Each `Section` wrapper is one
  head over one or two instances. *"Reads the room."* heads bio + tags — **bio takes it**, tags
  renders headless. *"Five worth your ear"* heads audio + media — **audio takes it**, media's
  numbered list stands alone. *"Book Me"* is the calendar's own head. Settling this here is what
  stops two sessions each claiming one heading.
- **`Tags — Frame` is the `tags` section, not the bio's chip row.** The bio+tags Section mirrors
  the audio+media Section exactly: one head over two independent category instances. Reading the
  chip row as part of the bio would leave `tags` with no layout-3 design at all and no other
  frame to fit.

The narrow pages compose the same five differently again, which is more evidence that the
composition is the page's and not the sections':

- **Tablet** keeps the two `Section` wrappers (`977:22711`, `977:22719`) but drops the right
  column: the calendar becomes a sibling frame (`984:10603`, 768 × 613.9, instance at 708 wide),
  and **the repertoire moves *inside* the second Section**, under the media list (`977:23041`,
  708 × 636). That is where to find the repertoire's tablet master — it is not a top-level child.
- **Mobile** keeps the two Sections (`982:9762`, `982:9770`) and puts both the repertoire
  (`982:10193`, full-width 390) and the calendar (`984:10671`, instance at 370) back at top
  level.

The stacked order the two narrow pages settle on — header, bio, tags, audio, media, repertoire,
calendar, gallery, pricing, map, form, testimonials, footer — is what our page renders anyway.

**Both head frames carry the eyebrow "KM BIO"** — including the one over audio + media, where it
is plainly the page's own label and not the audio section's copy. Layout 2's "a frame's own copy
can be a claim" applies: read it before deciding the eyebrow is a field.

Two things inside those wrappers to ignore: each head frame carries hidden `the` / `room.` text
nodes (leftovers, `hidden="true"`), and each `Section` carries a `Vector 2` whose x puts it well
off the frame.

## Where layout 3 goes, and the NVAR bump

`sectionVm` derives the design from `d = arch % designCount(cat)` and sets `v0`…`v5`
(`EncoreBuilder.jsx:219`). Layout 3 is **`s.v2`** — a new `if (s.v2) { … }` block after the `v1`
block and before the generic flat tail.

**`NVAR[cat]` is 2 for ten of the twelve, so `s.v2` is unreachable until it is bumped to 3.**
That is a `data.js` edit — the first shared-file change this pass needs, and layout 2's "keep the
diff inside your section" convention has to be relaxed by exactly this much.

- **Bump the section's own `NVAR` entry in the same commit as its `v2` branch**, never all of
  them up front. Bumping ahead of the fit would point layout 3 at the never-designed generic tail
  for every category not yet done.
- **`audio` needs no bump** — `NVAR.audio` is already 3, and its `v2` is an existing *invented*
  flat design that this pass replaces. Precedent is layout 2's settled open question 1: `HeaderV1`
  was an invented "Framed" design and became the frame's *Feature spread*.
- **`header` needs no bump either** — `NVAR.header` is 6 under Retro. Its layout-3 slot is
  `HeaderV2`, today the invented *Gradient stage · Colour wash*, which this pass replaces with
  *Inset Hero*. Rename `HEADER_NAMES[2]` in `data.js` and the list in `README.md:150` with it, as
  the layout-2 header session did for `HEADER_NAMES[1]`.
- **The bump costs nothing elsewhere.** The layout picker counts `layoutCount()` off `CATS[].n`,
  not `NVAR`, and every category already offers ≥ 3 rows (`tags` 3, `gallery` 4, the rest more),
  so no picker card appears or moves. There is no persistence, so no stored page has to migrate.
  The seeded page is `arch 0` throughout, so the end-of-pass two-build digest is unaffected. The
  one visible change is intended: a section a user had set to layout 3 stops rendering layout 1's
  design and starts rendering this one.
- **Once `v2` lands, the generic tail is dead code for that category.** Leave it. Deleting it is a
  separate decision about the flat four and is not this pass's job.

## Per-session procedure

One section per session, **all three widths together**. Clear context between sections; git and
this file are the memory.

Layout 2 split desktop from narrow only because the narrow frames did not exist when it started
(its open question 11). Here all three are known from the start and the whole narrow convention
set is already written down, so splitting would only make the second session re-derive the
first's decisions — the same argument that made layout 2's narrow pass take tablet and mobile
together.

1. Read `CLAUDE.md`, this file, `layout-2.md`'s *Conventions*, and the two memory notes.
2. `get_metadata` on **all three** of the row's nodes first — beside each other, not one at a
   time. It is where a master that changes shape rather than shrinking shows up, and on this page
   it is also where a master turns out to live inside a wrapper.
3. `get_screenshot` on each node (`maxDimension` 1400–2000 for detail), then load the
   `figma-design-to-code` skill and `get_design_context`. **`get_variable_defs` on all three
   nodes**, not just the desktop one: it resolves each master's mode, so every `size/…`,
   `border/…` and `radius/…` the emitted code prints as the desktop default comes back at its
   real value.
4. Implement as the `s.v2` branch of the section's component in `EncoreSection.jsx`, and bump the
   category's `NVAR` entry in the same change. Desktop numbers are the frame's × 0.82; the 768 and
   390 frames are verbatim, with no ramp. Follow the `v0`/`v1` convention exactly — one branch for
   all five themes, decoration gated on `s.retro`, palette-derived values standing in for Retro's
   literal hexes.
5. Verify with the preview harness. It already takes `arch=2`, so no harness change is needed —
   but the `NVAR` bump has to land first or `arch=2` renders layout 1.

   ```
   cd source && npm run dev
   http://localhost:5173/preview.html?cat=bio&arch=2&w=desktop     # &w=tablet | mobile
   ```

   `arch=0` / `arch=1` render the two signed-off layouts for comparison, `theme=1…4` checks the
   flat four, `n=8` fills the section's list-shaped content, `live=1` renders it as the published
   page does. Drive it with **chrome-devtools MCP** (`--isolated --viewport 1440x900`); compare
   **numbers, not screenshots**, via `getBoundingClientRect()`.
6. Commit, with the section named in the subject.
7. Flip the row's Status to `done <sha>`, add anything the next section needs to *Conventions*
   below, and commit that too.
8. **Stop there and hand off.** Do not start the next section in the same context. Say the
   section is closed, that this is the moment to `/clear`, and print the next section's opening
   prompt as a fenced block filled in ready to paste:

   ```
   Continue the Retro layout-3 pass with section N, `cat`.

   Read CLAUDE.md, then plans/retro/layout-3.md, then plans/retro/layout-2.md's Conventions section,
   then the `figma-frame-reading` and `verifying-the-published-tab` memory notes, and
   follow the per-session procedure there.

   The three masters are `<desktop node>` (<W> × <H>), `<tablet node>` (768 × <H>) and
   `<mobile node>` (390 × <H>) in Figma file uFoUbPaBrDicjyuSBEbtGT. Fit all three as a
   new `s.v2` branch of `<Component>` in EncoreSection.jsx, and bump `NVAR.<cat>` from 2
   to 3 in the same commit.

   <the two or three conventions most likely to bite this section>

   Branch: retro-layout-3. Do not refresh the root index.html.
   ```

   **Two rows swap that `NVAR` line out.** `header` keeps `NVAR.header` 6 and instead renames
   `HEADER_NAMES[2]` in `data.js` and the list at `README.md:150`; `audio` keeps `NVAR.audio` 3
   and replaces the invented flat `v2` in place. Both are refits of an existing slot, not new
   ones.

Do **not** run `npm run build:standalone` / refresh the root `index.html` per section — that is
one deliberate step at the end of the whole pass (`cp source/dist-standalone/index.html
index.html`), and layout 2's *Learned on the end-of-pass refresh* notes say how to check it.

Suggested order is the table's, which is the page's. The header first is deliberate: it is the
one section that is Retro-only (`HeaderV0`–`V5` never render for the flat four, so it needs no
`theme=1…4` check) and it settles the refit-an-invented-design pattern that `tags` and `audio`
then follow.

## Conventions

`layout-2.md`'s ~110 bullets all still apply and are not repeated. This list starts with what
is known about *this* page before any section has been fitted; append to it as the pass goes on.

- **Match on node id.** Frame names collide across the three pages, and the misnaming falls in a
  pattern worth knowing: the seven full-width sections' narrow masters are honestly named
  "— Tablet" / "— Mobile", and **the columned instances are the ones called "— Desktop" at every
  width** — `tags`, `audio`, `media` and `calendar` at both narrow widths, and `bio` at tablet
  (its 390 master *is* named "— Mobile"). Both narrow footers are "— Desktop" too. Width and id
  are the only trustworthy fields.
- **704 is the ramped instance; 1052 is our column.** The columned five's desktop frames are
  858 wide because the *page* columned them, and 858 × 0.82 = 704 ≈ the 708 the tablet page draws
  — which makes the tablet master a useful reading of the ramped design and a misleading one of
  our desktop canvas. See open question 1: the bio session takes the fill-or-cap decision for all
  five and it is recorded here.
- **`audio` and `media` have no real narrow masters.** Audio is 243 tall at 858, 708 *and* 370;
  media is 647 tall at all three. Those are the desktop component narrowed with its fixed heights
  leaking (layout 2's conventions about leaked desktop numbers and flattened narrow masters).
  Fit the narrow widths from the row structure and the type ramp, and do not transcribe those
  heights.
- ~~**Media's layout 3 is layout 2's right column.**~~ *Settled on the media player (section 5):
  written again, not lifted* — see *Learned on the media player* below for the four
  disagreements that decided it. "Media Player — A · Editorial numbered list" is indeed the same
  component (`432:2092`) already fitted inside `Media`'s `v1` branch.
- **The audio bar-meter draws a transport.** CLAUDE.md's standing rule is that the audio section
  is still a picture — the media player is the only one that plays. Default is to fit it as a
  picture; making it play is a separate merge, the way `media-player-playback` was. Open question
  2 below.
- **The repertoire's tablet master is inside the composed column** (`977:23041`), not a top-level
  child of the tablet page. Its desktop and mobile masters are standalone.

Learned on the header (section 1):

- **`get_metadata` is one level deep on this page, and it stops at the section's own
  outer frame.** All three header masters came back as an `<instance>` holding one
  `hero-card` frame with no children, and querying that child returned it as a leaf. It
  is not a flattened raster — `get_design_context` returns the full tree — so the
  layout-2 habit of reading structure off the metadata's x/y (the video section's
  two-children-sharing-a-y trick, the pricing deck's two-children-at-x-0) simply does
  not work here. **Call `get_design_context` on all three masters and read the
  structure out of the emitted flex declarations instead**, then `get_variable_defs` on
  each for the type. Budget for it: the checkerboard alone is ~120 absolute divs per
  master.
- **Sample a margin pixel of each render before deciding what a section stands on.**
  One `PIL` read settled the header's whole DOM shape: the frames' ground is `#D8A227`
  (Retro's `T.tags[2]`, `s.pillBg`) where a 238px-wide thumbnail of the *page*
  (`964:68621`) samples `#EAD7B8` all the way down — so the mustard is the section's own
  sheet and the design is a bleed. That thumbnail is worth taking once for the whole
  pass: everything from the header's floor to the footer samples the beige except an
  olive tail at y≈5600–5760 and a second mustard band at y≈5900–6510. The table's own
  heights stack to 8481.5 with no gaps — header 0–900, Frame 299 900–3428, repertoire
  3428–4049, gallery 4049–4838, pricing 4838–5860, map 5860–6664, form 6664–7212,
  testimonials 7212–8002, footer 8002–8481.5 — so the olive is the **pricing** section's
  tail and the mustard band is the **events map**, which therefore stands on its own
  sheet here as it stands on `mapBg` at layout 1. Add that y-range table to your reading
  before attributing a colour to a section.
- **Figma's stated padding includes an INSIDE stroke on some nodes and not others, and
  the render is the only arbiter.** The header card's `pt-[16px]` contains its 5px rule
  (the pill's top edge measures 51.5 against the card's outer 20 + 16 + 16); the nav
  pill's `py-[8px]` does *not* contain its 1px one (35.5 tall against a 33.6 inset box).
  So the repertoire's `calc(padding − border)` is a per-node reading, not a page-wide
  one — take it where a box's own measurement says to, and check the neighbour rather
  than carrying it down. Both were settled by a single-column PIL scan of the 1440
  render.
- **A rotated card's Figma wrapper is exactly the CSS bounding box, so for once the
  inflated metadata is the number to take.** The polaroid's 242.292 × 250.575 wrapper is
  225 × 234 at 4.4°, and `getBoundingClientRect()` on our rotated card returns
  198.68 × 205.47 = the same numbers × 0.82. Transcribing the wrapper and centring the
  card in it keeps the tilt's overhang out of the parent's padding — which matters here,
  because the card that holds it is `overflow: hidden` for its own radius.
- **The rotation sign was clockwise, and the render says so unambiguously**: for a
  clockwise turn the topmost corner is the top-*left* and the leftmost is the
  bottom-left, which is what a cream-pixel scan of the polaroid found. `tilt(s, 4.4)`
  — the memory note's CSS-clockwise rule, confirmed a second time. Do not eyeball it.
- **`BookPill`'s `full` scale IS this page's pill.** The frame's 4.267/17.921 padding,
  8.534 gap and 27.6 disc are `full`'s 4/4/4/18, 10 and 27 to within a rounding, at all
  three widths — so desktop takes the automatic `mid` (that box × 0.82) and only 390 has
  to pass `full`. Its label is `size/label-sm`, so `size` is passed at all three
  (16 × 0.82 / 13 / 12) where the automatic pick would draw 20px at 768. Third section
  running where the box does not ramp and the label does.
- **`s.dispLg` and `s.h1` are already this page's display ramp.** `size/display-lg`
  96/60/40 lands on `dispLg` 79 (96 × 0.82 = 78.7), `h1` 60 and `dispLg` 40 — the exact
  `tab ? s.h1 : s.dispLg` call `HeaderV1` makes. Worth checking against `Z` before
  writing a literal.
- **The header's `showBadge` reaches layout 3 no more than layout 2's dropped fields
  reach theirs.** This frame draws no seal, so the toggle edits nothing here. Same shape
  as layout 2's open questions 4/7/8/12, and the same call: inventing a seal the frame
  does not draw would be worse than the absence.

Learned on the bio (section 2):

- **Open question 1, settled for all five: the card fills 1052, and *which parts* stretch is
  read off the master's emitted flex declarations rather than decided.** `flex: 1 0 0` fills —
  the photograph, the stat block, the prose column, both rules — and `shrink-0` / `max-width`
  holds at the frame's own number: the name's 179 cap, the 188 spacer, every stat column. That
  is a better rule than any width, because `tags`, `audio`, `media` and the calendar each have
  their own declarations to read. **Run `get_design_context` for them; `get_metadata` alone
  cannot tell a fill from a hug.** What decided *fill* over a 704 cap: there is no wider master
  (the bio's main component, `432:607`, is 858 itself — check yours the same way), both narrow
  pages give every one of these instances their page's whole content width, and a 704 box
  centred in 1052 would be plainly wrong for a chip row and a player bar, which is what `tags`
  and `audio` are.
- **Name the fill's costs; do not engineer them away.** Three here, all written into the
  branch: the photograph goes 2.1:1 → 3.2:1 because its 380 height is *stated* and the bio's
  own layout-2 rule forbids deriving a height from a width; the head row trails ~508px of air,
  because its stat columns are `shrink-0` at a fixed 100 gap (the frame's own slack grows
  linearly with its width — 42 at 708, 129 at 858); and the prose measure reaches 813 where the
  widest master draws 566. A `maxWidth` on the prose would have been the one place a stated
  mechanism was overridden, so it was not added.
- **A `flex: 1 0 0` item never takes a slot in a CSS wrap, and Figma's "wrap" is not CSS's.**
  The 1440 head row emits `flex-wrap` with `gap-[10px_40px]`, and the 390 sub-component is
  visibly that row wrapped — same 10, same 179 cap. Transcribing it as `flexWrap` fitted both
  blocks on one line at 390 and overflowed the card by 60px, because both are zero-basis. Write
  the stack (the video section's rule, and the testimonials' basis lesson from the other side).
- **A column's stated height is what keeps a row's baseline where the frame draws it.** Each
  stat column is `h-[96px] justify-end`, and the 96 is also what makes the head band 144 (=
  24 + 96 + 24) at 1440 and 768 and 180 at 390. Put the height on the *column*, not on the row:
  on the row alone the columns centre in it and the values float 15px above the floor. Our
  values are one line where the frame hand-breaks its own to two, so the box carries dead space
  at the top — that is the bottom-justify working, not a defect.
- **A rotated seal wrapper is the bounding box, and its offset is worth checking against the
  *band* rather than the card.** 173.02 / 1.38 = 125.37 at 1440 *and* 768 (a leaked desktop
  number that is right anyway), 86.51 / 1.38 = 62.68 at 390. The two wider masters put its
  centre 150.4 down and 105.6 in from the about band's top-left — identical to the pixel, where
  the offset from the card's foot differs by 30 — so anchor to the band. And **give the band a
  `minHeight` of `seal top + seal size + the band's own bottom padding`**: the masters' bands are
  248/278 tall only because their prose is 600 characters of filler, ours is two real
  paragraphs, and the card is `overflow-clip`.
- **Two tokens needed the flat four's own pair, both already documented.** The foot rule is
  `pillBg` under Retro, which is the palette's lightest tag where `paper` is its lightest colour
  outright — so on Lime and Grunge the two are the same value and the rule vanished into the
  card (the repertoire's lesson); the flat four take `paperLine`. And the master outlines the
  card at 1440 and 768 and not at 390: only Retro follows that absence, because `paperOf()`
  returns the page ground itself on Editorial and Pop (the calendar's lesson). `theme=1…4` at
  390 is what shows both.
- **The wrapper's display head is reachable with nothing invented.** `s.title` is
  `cased(cv('heading', TITLES.bio))` and `TITLES.bio` *is* "Reads the room."; the "KM" of "KM
  BIO" is `s.initials`, which v0 already draws. Its eyebrow is `size/label-xs` in **Inter**, not
  the label face — `get_variable_defs` on the head frame is the only thing that says so. Audio's
  head (section 4) has the same shape but no matching copy, so check its own frame before
  assuming its `heading` fits.
- **`get_variable_defs` on all three masters replaced every measurement.** display-lg 96/60/40,
  display-sm 40/32/26, label-lg 24/16/14, label-xs 20/14/12, chip 12/11/11, body-md 14/13/13 —
  and none of them line up with `RAMP`'s `dispSm`/`labelMd`/`eyebrow`, so write a per-width `T`
  table and run it through `u()`. Every *box* number is the desktop component's own, unscaled at
  768 and 390: the header's rule, holding for a fifth section.
- **A brace-depth walk of the diff beats a browser digest.** All 242 added lines in
  `EncoreSection.jsx` fell inside the new `if (s.v2)` block, its comment header, or one blank
  separator — which proves v0 and v1 unchanged at every width, theme and layout at once, and
  costs one script rather than two navigations (the end-of-pass refresh's rule).
- **The seeded canvas can honestly draw fewer of something than the frame.** The master's three
  stat columns are two facts and a duplicate; `since` has no default, so the reference picture
  shows two. That is the pricing chip row's `All` diff again — intended, and named in the commit.
- **A state the seed cannot reach still has to be rendered, and a field with no default has no
  other way in.** `since` was fitted and shipped without one render at three columns, and the
  three-column state clips: the masters seat three because they hand-break their *values* to two
  lines (57 and 30 wide against our one-line 70 and 92), and our canvases are 20 and 24 narrower
  than the frames besides, so at 390 "Manchester, UK" lost its "UK" behind the head's
  `overflow-clip`. The row wraps now (the media player's rule — a frame's own squeeze is an
  artefact once it destroys content the artist typed). **Add the harness switch in the same
  session you add the field**: `preview.jsx` takes `&since=` beside `&booked=`, and `&name=` now
  overrides the artist, which is how any display slot gets checked against a string that is not
  "Kai Mercer".
- **`overflow-clip` on a `leading-none` text frame cuts every descender off at the baseline.** The
  master's name frame states it, and neither of the two names Figma draws has a descender to show
  it — "Poppy Jaeggy" loses four. It was inert besides, `maxWidth` and `wordBreak` already
  bounding the width. Check any transcribed clip against a string the frame never set.
- **Put a frame's stated box on the element whose *unwrapped* picture needs it.** The stat
  columns state 96 each; carried on the column it is right unwrapped and opens a 58px hole
  between wrapped rows, because our values are one line where the frame's are two. Carried on the
  row as `minHeight` with `alignContent: flex-end` it is the same picture unwrapped — the head
  band still measures the frame's 144 — and tight when it wraps.

Learned on the tags row (section 3):

- **`get_metadata` is deep again here, and it is worth calling first after all.** The header's
  lesson was that this page's metadata stops at the section's outer frame; that is a property of
  the *header's* masters, not of the page. All three tags masters came back as a full tree with
  every chip's x/width, which settled the 8px gap, the 11/5 padding and the mobile 4 + 2 wrap
  before a single screenshot. Call it on all three, then decide whether
  `get_design_context` still owes you the structure.
- **Check whether an earlier section already fitted your Figma component.** The chip row here
  *is* `TagChips`, fitted when the layout-3 header dropped the same component into its identity
  column — same face, same 1.26, same 5/11, same 8 gap, same `radius/chip` 8. Reusing it turned
  a section into eight lines. Grep the component for the frame's distinctive number (`5px 11px`)
  before writing a second copy; `media`'s layout 3 has the same shape of question waiting for it
  (*Media's layout 3 is layout 2's right column*, above), and there the answer may go the other
  way because the thing to share is a whole branch rather than a leaf.
- **Extend a shared leaf with an additive prop, and say which branch it reaches.** `TagChips`
  gained `size` beside the header's `radius`, defaulting to `s.labelXs` so all four earlier
  callers are untouched by inspection — but it is applied in the **Retro branch only**. The flat
  templates' 9px tracked-out caps are their own design, and a `size` that crossed the branch
  would have stood the header's chips at 9 beside this row at 16.4 on the same flat page.
- **Reuse costs the box ramp, and that is the right trade.** The component's 5/11 padding and
  8px gap are literals, so at desktop the chips run ~4px wide of the frame × 0.82 (30.7 tall
  against 28.7). One chip everywhere beats two that disagree by 2px; name it rather than
  parameterising the component's whole box.
- **`vm.chips[].fg` is `contrast(bg)` and the frame's is a cream, which inverts two chips, not
  one.** Retro's mustard (lum .64) *and* its pink (lum .61) both clear `contrast`'s 0.58
  threshold. Compute the luminances before claiming how many chips a colour rule moves.
- **A dead `TITLES` entry is free to re-point.** `TITLES.tags` was 'Tags' and read by nothing —
  no field named `heading`, and neither flat layout drew `s.title` — so moving it to the frame's
  'Genres' and adding the mirroring `FIELDS` entry (the `media` pattern, where `d` *is*
  `TITLES[cat]`) changed no rendering anywhere. Grep `vm.title`'s readers before assuming a
  title field is load-bearing.
- **Open question 7's objection is what tells you whether to add the field.** The bio declined
  `kicker`/`location` because two signed-off layouts would newly honour the edit; `tags` takes
  `heading` because none does. That is the discriminator, not "is the seat reachable" — and
  unlike `since`, a default is honest here, because the frame's word is a label the design chose
  rather than a fact about the artist. A field with a default needs no harness switch.
- **`&n=` cannot reach a comma string.** `FIELDS.tags.tags` is the one list-shaped content that
  is not an array, so the harness took `&tags=` beside `&booked=` and `&since=`. Empty is the
  emptied-row state.
- **The chip's `whiteSpace: 'nowrap'` is `TagChips`' and pre-dates this pass.** A single tag over
  ~46 characters overflows the 346 mobile column. Twelve tags including a 25-character one wrap
  cleanly, so it was left alone rather than moved under four signed-off callers — but a section
  that adopts this component and expects long labels owns that decision.
- **Lime's third tag hue is its page background**, so chip 3 vanishes into the page on that
  theme. It is a property of `vm.chips` and shows in every layout that draws them, v0 included —
  not this branch's regression, and not this pass's to fix.

Learned on the audio player (section 4):

- **A frame that draws one of a list is a stranding, and on this page the reason it is
  not the designer's mistake is the section next door.** The bar-meter is a single
  now-playing bar because the composed page puts the whole list in the *media* instance
  under it. Our sections are independent, so the card became the row and the section the
  stack — the pricing deck's and the testimonials' rule, and here with no control in the
  frame to wire to the list instead. What made it cheap: card 0 keeps the frame's played
  head and every card below it is unplayed, which is the media player's `cur = -1` cue
  rule and leaves the top of the stack the master's picture bar for bar. **Media (section
  5) is the other half of that same Section and draws the same `vm.tracks`** — so a page
  carrying both at layout 3 now prints the same five tracks twice, ~1200px of cards and
  then a numbered list of the identical five. On the Figma page that pairing is intended,
  but the intent rested on the bar being *singular*; it no longer is. Read this paragraph
  before deciding how tall media's list is, whether it draws a head, and whether it should
  page rather than print. Do not "fix" it by shrinking the audio stack back to one card —
  that re-strands the list.
- **A tall layout is fine in the layout picker.** `LayoutPicker` renders at `Z:
  SIZES.desktop` into a ~390px pane, so `ScaledPreview`'s scale is `390 / 1180 ≈ 0.33` and
  its `autoMax` of 210 shows the top ~636 CSS px of the render — here the head and two
  cards — then clips, which is what `autoMax` is documented to do. No thumbnail check is
  needed for a design that simply runs long; media layout 2 already exercised the path.
- **When a frame's fixed-size children fill its own width, the pitch is the design and
  the count is derived.** 57 bars at `shrink-0 w-[10px] gap-[4px]` fill the 810 box
  exactly; the narrow masters keep the *same* absolute positions under `justify-center` +
  `overflow-clip`, so 708 clips half the played head off and **390 renders no accent bar
  at all**. That is the gallery rail's `flex: 1 0 0` rule the other way up, and the media
  player's destroys-its-own-content rule with a pixel scan to prove it.
- **`EncoreSection` cannot measure, but it does know the content column: 1052 / 688 /
  346.** It is `canvasW − 2·padX` in the editor *and* in the published tab, because
  `PublishedPage` folds the surplus past the canvas into `padX` and it cancels. So a
  design whose count has to come off a width can have one, keyed on `desk`/`tab`/`s.mob`,
  with a published window under 390 the single case it overshoots — absorbed by the
  frame's own clip. Write the arithmetic out rather than the three answers.
- **`s.pillBg` is a page token and dies on a paper card.** Retro's is the mustard and
  `pillFg` resolves to the rust ▶ by construction — the frame exactly — but `pillBg` is
  the lightest *tag* where `paper` is the palette's lightest colour outright, so Lime,
  Grunge and Pop all drew the disc in the card's own colour. `s.ac` is no better (acid
  green on pale lime). The pair that is legible on paper by construction is `paperFg` on
  `paper`, and it is what the names and the played bars take too. The repertoire's lesson,
  now with a shared *token* rather than a shared component as the carrier.
- **Size an icon off its ink, not off the token that sets it.** The frame's ▶ is a
  body-md text node in a 21px line box and its triangle measures **9 × 10** inside the 44
  disc on all three renders; lucide's fills 14/24 of its `size`, so `size` 15.5 is what
  draws the frame's 9. The header's divide-the-face-out rule, for an icon. A Figma text
  node's box is no more the glyph than it is the type size.
- **`&n=` reaches a delimited string by joining the rows.** `audio` is the second
  list-shaped content that is not an array (`tags` was the first), so the harness builds
  the rows and `.join('\n')`s them for that one category rather than growing a second
  switch. Its rows drop every third duration and lengthen every fourth title, which is
  what shows the meter's right-hand scale absent and both foot blocks ellipsising.
- **A brace-depth walk of the diff is still the whole safety net, and a *replacement*
  makes it a two-sided one.** All 237 added lines fell inside the new `if (s.v2)` block,
  its comment header, the module-level `WAVE` constant or one blank separator, and all 13
  removed lines inside the old `{s.v2 && …}` block — so v0 and v1 are byte-identical at
  every width, theme and layout without a browser digest at all.
- **A module-level decoration constant belongs in `EncoreSection`, not `data.js`.**
  `WAVE` is the frame's own 57 bar heights; `GRAIN_URL`, `TORN_D` and `SCRIM` are the
  precedent, and the alternative would have been a vm key for something that is not
  content — `CITIES` and `PINS` reach the file through `sectionVm` because they *are*.

Learned on the media player (section 5):

- **The lift-or-rewrite question is settled by counting how many things the two branches
  disagree about, not by whether the Figma component is the same one.** It *is* the same
  component — `432:2092`, layout 2's right column — and it was still written again, because the
  type ramps here (`size/title` 24/**19**/**18**, chip 12/11/11, body-lg 16/15/15, body-md
  14/13/13) where layout 2's masters measured every one of them **flat** at the desktop number;
  because the ground is the beige page rather than a cream panel; because the rows are
  content-tall here and divide a stated column height there; and because 390 is a hand-set
  deviation on both sides. A shared leaf would have had to take a type table, a ground *and* a
  height mechanism — the component rewritten with a signed-off branch hanging off it. The tags
  row's `TagChips` reuse is the other side of the same rule: **grep first, then count the
  disagreements.** One page's mode is not another's, so re-run `get_variable_defs` even on a
  component an earlier layout already fitted.
- **A stated instance height is the page's number when the same component states three of
  them.** 673 in layout 2's desktop panel, 596 in its narrow ones, 647 here — and *within* this
  page the row residue is 110.6 at 858 and 110.**8** at 708 and 370, which is the events map's
  quarter-pixel proof that a division is not a design. So the row is its own content (64 sleeve
  + 2 × 14 + the 2px rule = 96) and the section stands 574 unscaled where the frame draws 647.
  Two independent readings before declining a parent's constant: **the residue's decimals, and
  the same component under a different page.**
- **The cheapest master this pass has had, and `get_metadata` said so in one glance.** Every box
  number is the desktop component's own at all three widths — 30 radius, 2 rule, 30/14 padding,
  20 gap, 64 sleeve, 4 sleeve corner, 16 head padding, 10 column gap — so the whole branch is
  one `z`, one type table and one 390 override. The enquiry form's "read the three metadata
  calls as arithmetic *first*" holds for a sixth section: sleeve x at 68/70/71 against a number
  at x 30 gives the 20 gap and the flowing numeral in the same line.
- **A frame's `flex-[1_0_0]` spacer with no fill is a `space-between`, not a rule.** The counter
  row's 681 × 1 child emits no `bg-…` class and the render draws nothing there. Check the
  emitted class list before transcribing a hairline out of the metadata's `height="1"`.
- **A section standing on the page ground needs no colour literal at all.** The frame's
  `sem/text/2` is `#111111`, which *is* Retro's `tx` — so the counter row takes `s.tx` and the
  flat four are right by construction, where every cream-panel section in this file needs a
  literal and a `paperFg` fallback beside it. Sample the wrapper's ground (`#EAD7B8` exactly
  here) and check the page palette before reaching for a pair.
- **Copy a branch's *spelling*, not its slips.** Layout 2's list was the model for the row, and
  two things were deliberately not carried across: its tracking is frozen at the desktop
  `-0.72px` where the honest expression is `-0.06 × T.chip` (the pricing lesson), and its
  release line renders blank rather than not at all, which spends a 4px gap and a line box and
  pushes the title off the row's middle on a page whose `c.tracks` is a typed textarea. What
  *was* carried is the 2px rule unscaled at desktop against the frame's 1.64 — a drift, but the
  same drift in both halves of one section.
- **`{audio}` is not optional, and it is easy to lose when the frame draws no transport.** Every
  earlier media layout tucks the element inside a bar; this one has none, so it rides at the
  foot of the column. Without it `el.current` is null and every row click is dead — which no
  geometry digest would ever show.
- **The `list` const above the branches is the one line outside it, and it has to move.**
  `s.v0 || s.v1 ? s.tracks : s.tracks3` would have paged three tracks under a list of five.
  Name it in the brace-depth walk and argue the no-op: v0's and v1's truthiness is unchanged.
- **`&n=` can never show this section's running time, in any layout.** `sectionVm` gives an
  array-shaped `c.tracks` row `dur === rel === sub` — TracksField has no duration column — and
  every layout drops the time where the two are equal, so the seeded five are the only duration
  check there is. A vm fact, not a harness gap: do not "fix" `LIST.media` by adding a duration
  the editor cannot type.

Learned on the booking calendar (section 6):

- **The cheapest master this pass has had, and three `get_metadata` calls read as arithmetic
  said so before a render was fetched.** Every box is the desktop component's own at all three
  widths, and the sums prove it in one pass: the 18 between every block, the 20 padding, the
  176.132 grid frame *identical* at 405, 708 and 370, the 8 between its rows, the 21 between
  the legend's three labels, the foot's 54 on a 46 disc inset 5. What is left after that sum is
  a type table and two structural questions. The enquiry form's rule, and this is the first
  section in the pass whose branch needs **no width branch at all** — no `desk ?`, no `s.mob ?`
  outside `u()`'s own `z` and BookPill's three numbers.
- **Find the main component before deciding what a design's width means.** `436:1634` is
  **340** wide, narrower than every instance on the page, which is what closed open question
  1's remaining half: there is no wider master, so the bio's fill rule applies unchanged. The
  instance ids give it away for free — a child is `I<instance>;<componentChild>`, so the
  component's own child is the id after the semicolon and its parent is one below. One probe,
  not a `use_figma` query.
- **Four widths agreeing on a `shrink-0` size is a stronger statement than any one of them.**
  The dot is 30.713 at 340, 370, 405 *and* 708 while its pitch goes 44.9 → 49.9 → 55.7 → 106.
  So the dot is the design and the spacing fills — and at our 1052 the pitch is 145, which is
  where the fill's cost stops being a proportion and starts being a reading: the field is a
  calendar at 390, sparse at 768, and seven columns of dots at 1052. It is shipped that way and
  named, because the plan's own rule is to name the fill's costs rather than engineer them
  away, and because every alternative is either a cap (question 1, settled against) or an
  invented number. **This is the pass's clearest instance of what filling 1052 costs** — worth
  reading before the remaining six sections decide how much of their own frame to trust.
- **Two rows of one grid that Figma laid out by two different mechanisms are an artefact.** The
  day-name row is seven `flex: 1 0 0` cells and the dot rows are `justify-between` over fixed
  dots, so the frame's own letters miss the columns they head — by 11px at 405 and **32 at
  708**, where it is plainly visible in the render. The pricing deck's normalise-and-say-so
  rule, and the discriminator is that it gets monotonically worse with width: at 1052 it would
  be 60. One `repeat(7, 1fr)` grid carries both rows, the day names centred and the dots
  `justifySelf: center`, and the day-name row is simply its first seven cells.
- **A frame with no navigation is a frame whose state cannot leave its own page.** There are no
  month arrows here, so `mi` reaches nothing (layout 2's case) and the grid is `calMonths[0]`.
  That is what lets the head be resolved against **month 0 alone** rather than layout 1's
  `reduce` over the whole CAL_SPAN window: `sel` can only ever name a day the visitor clicked
  in the month on screen, so the numeral, the lit dot and the pill agree by construction. A
  window search would have let a republished `open` print a numeral from a month the grid does
  not draw.
- **A design that draws no numerals makes its readout load-bearing.** The dots carry no dates,
  so the head is the only place the picked day is named — which is why it is 96px tall, why
  both halves of it are rendered or not rather than printed blank, and why `booked=<the opening
  day>` is the state worth rendering at all three widths: the card then opens on the month
  alone and the pill prints `calPrompt`. The weekday comes off the **grid**, not a date
  function: `at % 7` on the cell's index in `month.cells` is the weekday column, because the
  lead blanks are in that array. `EncoreSection` does no date maths, still.
- **`&open=` was the missing harness switch and the gap was invisible until it existed.**
  CAL_OPEN's June 2025 starts on a Sunday and runs to five rows, so the seed is the one month
  that shows **neither a leading blank nor a sixth row** — every render before the switch was
  added exercised a lead-blank-free grid. March 2025 (`&open=2025-03-29`, lead 6, six rows, a
  longer month name and a Saturday pick) is the far end of it. The bio's "add the harness
  switch in the same session" rule, reaching a field that already had a default.
- **A frame's legend is vocabulary, not a summary of the page.** All three rows are drawn
  whatever the month holds — the gallery's hide-the-empty-row rule is about a tile promising
  somewhere to go, and a key that dropped "Booked" on a month with no bookings would leave the
  visitor unable to read the tan dot when one appears. Its three labels are the frame's own
  literals, the media player's "● Popular" precedent.
- **`BookPill` now takes `style`, spread last in both branches** — ListenLink's precedent, and
  the first prop added to it that is not a scale or a glyph. Two things needed it: `width: 100%`
  + `justifyContent: space-between`, which a hug-width inline-flex cannot be told from outside,
  and `whiteSpace: 'normal'`, because `labelStyle` pins `nowrap` and the flat branch sets it
  outright. Our label is `enquiryLine`'s whole sentence where the frame's is four words, so it
  takes a second line on the flat four at 390 and the pill grows. Grep first: no caller written
  before it passes one, so the spread is `...undefined` for all 26 of them.
- **`size` goes in at all three widths on a fresh branch.** Layout 2 kept desktop `undefined`
  because that half was signed off and its drift had to stay consistent; there is nothing here
  to match, so `size/list` is passed at 16 × 0.82 / 12 / 13 and the pill's label is right at
  every width. `disc={desk ? 38 : 46}` and `full` at 390 are layout 2's spelling copied verbatim
  — the box does not ramp, for the fourth section running.
- **The dot's ring is 2.559, and it is a raw value on the ellipse rather than `border/thin`.**
  `get_variable_defs` returned no `radius/` or ring token for this component at any width, which
  is the events map's tell — the SVG the emitter exports is the only source, and one `curl` of
  it gave the stroke, the fill and the fact that the free dot's fill is the card's own cream.
  The card's own outline *is* `border/thin` 2, so the two are written differently on purpose.

Learned on the repertoire (section 7):

- **The first master in this pass that wants content the section does not have, and the
  answer was a *reading* of the content it does.** "Curated sets" over four songs and a
  duration each is not a flat tagged song list — until you notice that `repChips` already
  calls the tags the section's own curation, that the seeded three tags are the frame's three
  cards, and that a mood and a card title are the same slot. Grouping by the tag row beat
  every alternative: a `SETS` constant in the repeater row shape (the video section's
  `VIDEOS` rule) would have left `c.songs` unread, which the calendar's note says is worse
  than any unread field. **Look for the derivation before reaching for the seeded constant;
  the constant is for content that genuinely does not exist yet.**
- **A grouping can strand what a filter cannot, and this section has already written down
  what to do about it.** `vm.repFlat`'s own comment — *"it takes the artist's songs, so
  swapping layouts never silently discards what they typed"* — is the constraint, and it is
  what forced the `All` card. Where it goes is the interesting half: **appended when the tag
  cards do not already reach every song**, not led with always. Always-drawn was the first
  answer and it is wrong at this scale — pricing's extra `All` *chip* is a 60px control that
  does something, where an `All` *card* on a fully-tagged page duplicates every song and
  costs a whole card at every width. **Ask what the extra thing costs before calling it the
  pricing chip row's intended diff.** The condition is stated over the vm (`reached.size <
  songs.length`), not as "some song is untagged", so the sentence names the promise rather
  than the special case.
- **A frame that draws a control beside a truncated list has told you the truncation is
  real.** Four rows *and* a *View full set →* is the design saying the card is a subset — so
  the four is not the bio's five-chip component default, and the honest fit is to wire the
  frame's own link to a reveal (the pricing deck's rule) rather than to drop the cap, drop
  the link, or leave it dead. A **reveal, not a toggle**: no second label had to be invented,
  and the link is simply not drawn on a set of four or fewer. Key the state by the row's
  **label**, not its index.
- **`justify-center` over the whole row IS the seat rotation, at the master's own count.**
  The 390 grid emits `flex gap-20 items-center justify-center` at 390 wide over three 290
  cards — 910 of track centred, which is exactly the −260 the metadata shows — so the
  "translate" the positions look like is not one. Reading the emitted flex declarations is
  what settled translate-vs-rotate: rotation keeps both peeks filled at page 0, where a
  translated track bares the left gutter and hands the canvas a picture the master does not
  draw. Below three sets there is nothing to peek with, so the row is the current card alone.
- **A seat wrapper must be a `grid`, not a `flex`.** The peek seats are fixed 290 boxes, and
  as a row-flex the card inside sat at its own **content** width (214) — which put the left
  peek's card entirely outside the clipped viewport and drew no peek at all, while the centre
  card rendered 78px narrow. A grid item stretches on both axes, so one word fixes both.
  **And the tell was invisible to `getBoundingClientRect` on the *seat*:** the wrapper
  measured 290 correctly. What caught it was a PIL scan of the render disagreeing with the
  rects — measure the *card*, not the box you put it in, and when a pixel scan and a rect
  disagree, the rect you took is of the wrong element.
- **Two counts derived from the same list make the pager agree with three masters at once.**
  `perPage` 3 / 3 / **1** turns "the two wide frames draw no pager and the phone draws two
  arrows" into one derived row that is not rendered at one page. It also answers the
  four-sets question without a second mechanism: a fourth set is a second **page**, not a
  second row, which bounds the section's height at any tag count where the pricing deck's
  wrap does not — and the lone card then stands in column one of the three, which is the
  pricing deck's picture anyway.
- **`tierHues` is reusable from another section's block, and reusing it is what buys the
  legibility guards.** It is a `const` at `sectionVm`'s top level, above the repertoire's, so
  `...tierHues(hue)` hands over the card's ink *and* the mustard second hue with its 0.22
  luminance check already written. What it does not give is the card's **outline**, which the
  frame pairs the other way — `#111` on the olive and rust cards, cream on the near-black one
  — and that is `tierHues`' own `accHue` shape written out one line: `card === deep ? paper :
  deep`. On Lime and Grunge the darkest tag IS the page ground, so the outline is the whole of
  what keeps the card visible (the events map's lesson).
- **Derive the hue *pool*, not the hue list.** The frame's three cards are ink, olive and
  rust and it sets cream type on all three — so the pool is the tag hues dark enough to carry
  cream (`contrast(h) !== '#141414'`), and walking it backwards lands on exactly those three
  under Retro. Retro's mustard and pink are excluded by the same test that explains why the
  designer skipped them. Compute the luminances before writing an index sequence: `T.tags[(5
  − 2i)]` reproduces the same three and cycles only those three forever.
- **A `<div>` wrapping one `<span>` takes the *card's* inherited strut, not the span's
  line-height.** The frame's `view` frame came out 10px taller than its stated 47 at desktop
  because the wrapper was a block. `display: flex` on it makes the span a flex item and the
  height is its own line box again. Worth checking on any single-line block whose height is
  part of a sum you are transcribing.
- **`&n=` rows are where a grouping's states live.** The old `LIST.repertoire` gave every song
  exactly one of three tags, so neither the `All` card nor a song in two sets had ever
  rendered. One untagged row every fifth and a two-tag row every seventh reach both, and a
  long title and artist every fourth is what shows the row's ellipsis at 290. The bio's
  add-the-switch-in-the-same-session rule, for a *shape* of row rather than a field.

Learned on the gallery (section 8):

- **The header's y-range table is one band short: the gallery stands on its own cream sheet.**
  A column scan of the 1440 page samples `#FBF6EA` from 4049 to 4838 where the sections either
  side sample the beige `#EAD7B8` — a third full-bleed sheet beside the pricing tail's olive
  (5600–5760) and the events map's mustard (5900–6510). The 238px thumbnail that table was read
  off was too coarse to separate the two creams. **Re-sample your own band before trusting it**,
  and `get_variable_defs` will corroborate: `sem/bg` came back `#fbf6ea` here where the media
  player's came back as the page's beige.
- **A bleed is not only a fidelity choice — it hands the section the frame's own measure.**
  Every other section this pass has fitted lives inside the root's `padX`, so its desktop content
  is 1052 against the frame's 1088 and the narrow ones 688/346 against 708/350. A sheet that
  bleeds and then re-insets at the frame's own number gets 708 and 350 back exactly: the tablet
  and mobile tiles measure **230.7 × 150 and 111.3 × 107.5, their masters' numbers to the pixel**,
  and desktop lands within 0.2. That is the cheapest fidelity in the pass and it came free with a
  decision made for a different reason. Worth checking on any remaining section whose frame paints
  its own ground.
- **The count is the section's when a field states it.** The masters draw twelve tiles;
  `FIELDS.gallery.images` is `max: 7` and both fitted layouts already walk a fixed seven, so
  twelve is the Figma component's own default padded with repeated photographs (its rows repeat
  images 1, 2 and 4 — check for duplicates before reading a count as a design). The bio's
  five-chip rule, now with the section's own field settling it rather than a judgement.
- **A frame with no short row cannot tell you what a short row does, so read the other two
  masters.** The desktop master's grid is a `flex-wrap` row of `flex-[1_0_0] min-w-[298px]`
  children, which at seven would widen the second row's three tiles to a third of the measure
  each — and, with the aspect below, heighten them too. Twelve into four never leaves a short row,
  so the master is silent; both narrow masters are explicit
  `grid-cols-[repeat(3,…)] grid-rows-[repeat(4,…)]` grids, which are not, and 4 + 3 / 3 + 3 + 1
  with trailing empty cells is the pricing deck's odd-count rule anyway. **Also check the min-w
  across widths before deriving a count from it**: 298 gives 4 columns at our 1052 and *2* at the
  tablet master's own 688, against the 3 it draws — so it is a desktop artefact and the three
  counts are literals.
- **A tile whose height comes from the page's own section height is a residue, and it travels as
  a ratio.** 789 less its insets, its head and the 32 leaves 560, three rows of which is 181.33;
  the 768 master states `h-[660px]` and the 390 one is `flex-[1_0_0]` of the section's 678. Three
  different aspects (1.798 / 1.538 / 1.036), none of them designed — the events map's
  derived-viewport rule, and the first time in this pass it has decided a whole grid.
- **`Photo`'s `ink` is owed by every section on its own sheet, and the tell is which layout you
  copied from.** Layout 2's gallery passes none because its tiles stand on the page ground;
  layout 3's stand on `paper`, and the default `s.muted` is an rgba of the **page's** `tx`, which
  on Lime is the same pale lime the sheet is. `ink={s.retro ? undefined : s.paperFg}` keeps
  Retro's softer placeholder and fixes the four. `theme=1&n=0` is the render that shows it.
- **Grep the file before gating a radius on `s.retro`.** Nearly every fitted branch writes the
  frame's corner as a bare `u(30)` for all five themes, layout 2's gallery included, so a `s.retro
  ? u(30) : s.radius` here would have been the outlier rather than the correction. One grep for
  `borderRadius: u(` settles it.
- **`s.ac` on a `paper` sheet is a known cost, not a new one.** Retro's rust, Grunge's red and
  Editorial's and Pop's accents all read on their sheets; Lime's acid green on pale lime does not,
  and this is the second head to ship that way after the repertoire's. The conventions already
  name the property twice ("the accent is not guaranteed against `paper`"), and the alternative —
  `s.paperFg` for the flat four — flattens three themes to fix one. `EncoreSection` does no colour
  maths, so there is no third answer. Name it in the commit.
- **The whole section can be one `col()` with a padding.** No width branch outside `u()`'s `z`,
  the column count, the ratio and the two insets; no state, no handler, no decoration, no
  `s.retro` gate beyond the sheet's two literals. The booking calendar held the record for the
  cheapest master in the pass; this one is cheaper, and the diff is 130 lines of which 61 are the
  comment.

Learned on the pricing section (section 9):

- **A frame that marks one row of a list is naming a *seat*, and the discriminator for
  which seat is what the section already calls decoration.** The FEATURED badge and the
  olive fill sit on the frame's third and last package, and nothing in `c.tiers` ranks a
  package — so the honest fit is the **last rendered row**, which is layout 1's own rule
  that its tilt and its mobile overlap take the rendered index while the card's *hue* keys
  on `t.n`. That also settles what a live filter does with it: hiding the artist's last
  package promotes whatever now ends the stack, because the climax belongs to the
  composition and not to a package. Not drawn at one row, the pager's and the chip row's
  rule — a distinction that distinguishes nothing is not a design. This is the pass's
  first content rule whose *label* is invented on the artist's own data; see question 12.
- **A seat hue that has to read against the *page* needs a guarded walk, not an index.**
  `tierHero` pins `T.tags[1]` outright and gets away with it because it only ever paints a
  card. This one outlines the plain rows *and* fills the featured one, so a tag that
  matches the page ground draws neither — and **Grunge's `T.tags[3]` IS its black
  background.** `vm.tierRow` therefore rotates from the frame's own index and takes the
  first tag clearing `tierHues`' own 0.22: olive on Retro and pale lime on Lime (both
  index 3), the stamp red on Grunge, and on Editorial the terracotta rather than the
  `#E6B6A0` wash that misses the threshold by 0.035. **Run the five palettes through
  `lum()` before pinning any index** — four of them agreed with the frame and the fifth
  drew nothing at all.
- **The one thing in a branch that does not stand on the page ground is the one thing that
  needs `paperFg`.** Everything here inherits `s.tx` correctly because the page is its
  ground; the selector capsule is `sem/box/1`, and its outline and idle labels first went
  in as `s.tx` — which on Lime is the same pale lime `paperOf()` returns and on Grunge the
  same white. Both rendered a capsule with nothing in it. `s.retro ? s.tx : s.paperFg` is
  the calendar's own pairing and Retro keeps the frame's `#111` exactly. **A five-theme
  colour digest is what caught it**, and it is worth running even on a branch that looks
  palette-safe by inspection: `theme=0…4` in five hidden iframes, reading
  `backgroundColor` / `borderTopColor` / `color` off the same four nodes, is one script.
- **`sem/box/1` resolves against whatever it stands on, so the same token is two different
  answers in one frame.** It is `#FAECD5` on the capsule (the beige page lifted) and
  `#6D7040` on the badge (the olive row lifted) — which is exactly `rgba(the card's ink,
  0.11)`, so `tierHues` gained a `badge` key rather than the section gaining a literal. An
  alpha rather than a `mix()` because it composites to the same colour and is the shape
  `soft`, `acFg12` and `deepFg25` already have.
- **`get_metadata` is deep here and reads as arithmetic, but it cannot tell 1fr from a
  fixed 248** — and this is the first master in the pass where the two columns' *ratio*
  changes between widths. Desktop emits `flex-[1_0_0]` on both (616/616 of 1232); tablet
  emits `flex-[1_0_0]` on the left and `w-[248px]` on the includes panel, which is why the
  measured 364/248 is not the 306/306 the metadata alone would have implied. The bio's
  rule, and note that **an instance-child `get_design_context` returns the node with
  `size-full` and no children** — the fill/hug information only comes back when the call
  is made on the top-level instance.
- **Figma's stated padding contains the stroke here, and the row's own sum proves it
  without a render.** 28 padding on a 1328 box leaves 1272 of content — 616 + 40 + 616 —
  where a border outside the padding would leave 1270. So both boxes that carry a hairline
  take `calc(u(n) - 1px)`, and the capsule then measures the master's 35 (28.5 at × 0.82)
  instead of 37. **The hairline itself does not ramp**: `border/hairline` is 1 at all three
  widths and `u(1)` would draw 0.8 at desktop.
- **Check the palette for a second small-print field before adding one.** `DEFS.pricingSub`
  was already the frame's foot line verbatim, and `TITLES.pricing`, `PRICE_UNIT` and the
  whole of `TIERS` were already the frame's own copy — the seeded three packages *are* its
  three rows, names, prices, blurbs and features. Only the head paragraph had no seat, and
  question 7's discriminator let it in: `intro` is read by no signed-off layout.
- **A default that repeats the section's own heading is worse than a shorter default.** The
  frame's paragraph opens "Four ways to book this act." — a count of the artist's packages,
  dropped the video section's way — and continues "Choose by the kind of night you're
  throwing", which is `TITLES.pricing`'s "Choose the set that's right for your night" almost
  word for word. The frame gets away with it because *its* title is the single word
  "Pricing"; stacked under ours it stutters. `DEFS.pricingIntro` is the closing clause
  alone. **Render the head and read it** before taking a frame's sentence whole.
- **Copying a branch's spelling means copying its slips — so describe what the code does,
  not what you assumed it did.** The media player's rule is to copy a branch's spelling and
  not its slips; this is the same rule met from the other side. Both earlier layouts split
  the price as `/^[^\d]/.test(money) ? money[0] : ''`, which takes the **first character**
  when it is not a digit — so "POA" sets its P small and "OA" in the display size. The
  expression was copied correctly and then described in the branch header as a guard it is
  not ("a price with no digit keeps the whole string"), which is worse than the slip: the
  next session would have believed the fallback existed. Keeping the slip is right — a
  v2-only correction would make one page print the same `price` two ways depending on the
  layout picked, the tags row's one-chip-everywhere rule from the wrong end, and it is one
  expression in `sectionVm` when it is worth fixing. **Run a transcribed expression against
  the inputs the comment claims for it before writing the claim down.**
- **A `<a href>`-shaped seam is testable in one `evaluate_script`.** Clicking the capsule's
  chips through `s.live` and reading back each row's `backgroundColor` and whether its text
  contains FEATURED proves the filter, the clamp *and* the moving seat at once — All gives
  three rows with the Festival Set filled, Solo gives two with the Wedding Set filled, Band
  gives two with the Festival Set filled again. React commits asynchronously, so the clicks
  need a `setTimeout` chain (the published-tab note's rule, which bites through the preview
  harness too).

Learned on the events map (section 10):

- **The clearest case yet for deriving a control from the artist's data rather than
  dropping it — and the discriminator is the section's own heading.** The frame's
  All / Upcoming · 5 / Past · 3 / Filter ↓ is three claims and a dead control: nothing in
  this file reads the clock, so "upcoming" and "past" are unknowable (the calendar's rule,
  met from the other side). What made *cities* the right axis rather than an invention is
  that `TITLES.map`'s own head is "Where I'm playing." — the row is asking the question the
  section already asks. It is `repChips`' shape without being `repChips`: one chip per
  distinct city with the count the frame's own `· 5` carries, deduped case-insensitively,
  the match key case-folded in `sectionVm` beside the label (`vm.gigs[].cityKey`), and
  **not built below two cities**, because All plus one chip filters to the same list twice.
  A gig with no city joins no chip and is reachable under All alone, `repFlat`'s promise.
- **A filter breaks an invariant a pager does not, and the fix that closes it opens
  something worse.** CLAUDE.md's standing rule is that a page never lights the same dot
  twice, which holds for v0 and v1 because `perPage` **is** `PINS.length` and
  `PINS[i % 5]` therefore never repeats inside a page. Filtering punches holes in the
  indices, so a filtered page of six gigs or more can seat two gigs ≡ mod 5. Pairing by the
  row's place on the *page* closes it exactly — and at 390, where a page is one gig, would
  pin every gig to dot 0 and stop the map moving on every page-turn. **Visible-every-time
  beats rare-edge**; the edge is written into the branch rather than engineered away.
- **A `desk ? … : …` count is not the only shape a derived count takes: `s.mob` is.**
  `perPage` is `s.mob ? 1 : s.gigPage` — the two wide masters draw six rows and no pager,
  the phone draws **one** row and two arrows. That is the repertoire's derived 3/3/1 in
  this section's numbers, and the six is the Figma component's own default content where
  five is the section's rule (the gallery's "the count is the section's when a field states
  it"). The arrows are `Pager` with **`pages: []`** and `frame.grow` — the component
  already renders prev and next unconditionally, so the master's two full-measure pills
  cost no new component and the guard becomes `pages > 1` rather than `labels.length > 0`.
- **`feat`'s on-page test has to be `some`, not layout 2's contiguous range.** `sel >= first
  && sel < first + shown.length` assumes the page's indices run consecutively; under a
  filter they do not. One `shown.some((r) => r.i === sel)` covers the canvas, the -1 start,
  a filter that hides the picked gig, a page turned away from it and a gig deleted under
  the visitor — no clamp of its own, layout 2's rule with a wider test.
- **A frame's "hand-shifted" row can be the design stating an inset.** The 1440 master's
  third row puts its date circle at x 10 where every other row puts it at 0, and its
  Tickets at 549 where the others sit at 578 — which reads as a slip in `get_metadata` and
  is `pl-[10px] pr-[29px]` in the emitted code: the lit pill insets its own content.
  **Read the emitted padding before calling an offset an artefact**, and note that the same
  master's day numerals (label-xs 20 / body-md 14 / body-lg 16 across six rows) genuinely
  *are* hand-set — normalised to `Label/XS`, which is the token that ramps 20/14/12 and the
  one whose 1.26 leading matches every measured text height.
- **A 2px rule that does not grow its row is an inset shadow, not a border.** Every row in
  the frame measures 84 whether it carries a rule or not (Figma strokes an auto-layout
  frame without growing it), and `calc(padding − border)` — the repertoire's usual fix —
  would have moved the row's *content* up by 2 rather than its edge. `boxShadow: inset 0
  -2px 0` is the enquiry form's refused-box spelling used for a divider, and it costs the
  layout nothing. The rule is suppressed on the lit pill **and on the row above it**, which
  is what the frame's own `border-b-2` pattern says.
- **Clip the viewport, not the container it shares with the foot bar.** Only the 390 master
  states `overflow-clip` on the Map Viewport; without it a 480px ring in a 166px viewport
  draws straight across the travel line below it, because the container's clip is one level
  too far out. At desktop the same clip costs four pixels of a 30%-opacity edge, so it goes
  in at all three widths.
- **Render the head and read it — again, and this time it cost a field its first seat.**
  `base` went in the frame's eyebrow on the gallery's prefer-a-field rule and printed
  "Based in Manchester" over "Manchester", `TITLES.map`'s own default. The eyebrow keeps
  the frame's label (layout 1's call in this very section, "Shows/coverage"), and the frame's
  foot line — "UK · 8 pins · 120 mi radius", a region, a count and a distance — is what
  seats `base` and `radius` instead, split across the bar with the count between them.
  **A composed foot line can absorb two fields where two separate slots absorb one each.**
- **The pass's first `mob`-only stack that is also a `mob`-only *count*.** Five of the
  branch's width tests are `s.mob` (the grid, the row's axis, the foot bar's axis, the
  panel's horizontal inset, `perPage`) and three are `desk` (`u()`'s `z`, the map corner,
  the pill's numbers) — the testimonials' "re-ask every `desk`" holding for a fifth section.
- **`{n} pins` is layout 2's expression copied, plural bug and all** ("1 pins" on a
  one-gig page). Correcting it in `v2` alone would print the same count two ways depending
  on the layout picked — the pricing deck's copy-the-spelling-not-the-slip rule met from
  the wrong end. It is one expression in each branch when it is worth fixing.
- **The live seam is testable in two `evaluate_script` calls and it is worth both.** Filter
  → three rows and the pager gone; click a row → the lit row, the panel and the 14px dot
  all move together; back to All → the pick survives the filter change; next page → `feat`
  falls back to the new page's first gig. React commits asynchronously, so the clicks need
  a `setTimeout` chain.

Learned on the enquiry form (section 11):

- **A frame whose name promises a photograph can draw none, and the emitted code is the
  only place that says so.** "Full-bleed hero form" opens on a 1440 × 1147 child that
  `get_metadata` reports as a bare `Frame` and that `get_design_context` prints as
  `bg-[sem/bg] inset-[0_0_-599px_0]` — the *page's own beige*, bleeding 599 past the
  section's floor. A bleed that paints the page colour is a no-op, so this is not the
  gallery's sheet case at all: the section stands on the page ground inside the root's
  padding and there is nothing to write. **Sample the render before believing a frame's
  name**, and read a full-height child's *fill* before assuming it is an image the
  instance failed to set.
- **The lift-or-rewrite question, asked a second time, and answered the same way with a
  much stronger case for lifting.** This IS layout 2's card component: the two agree on
  every box number — 24/28 padding, 14 gaps, 30 radius, 10 between boxes, the pill's
  21/5, the 46 × 44 disc, even the boxes' 42/38/37 — *and* on `size/title` 24/19/18,
  `size/list` 16/12/13 (the same non-monotonic 390 step), `size/label-sm` 16/13/12 and
  `size/body-sm` 12/12/12. It was still written again, because the disagreements are five
  and they are structural rather than numeric: the card's ground, the pill's whole
  palette, the column mechanism, the left half's content and the sheet. **The media
  player's rule survives its hardest case: the test is what the two branches disagree
  about, not how much they agree about**, because a shared leaf carrying all five would be
  the component rewritten with a signed-off branch hanging off it. Where the reuse
  actually happened is in the *spelling* — `up()`, `boxShell`, `pill()`, `arrowDisc` and
  the `sent` block are layout 2's, transcribed with this frame's numbers and colours.
- **`flex: 1 0 0` on two children does NOT split a row equally when one of them carries
  padding.** The masters emit it on both halves and it measured 481 / 522 in our 1052: a
  zero flex-basis is resolved against the **content** box whatever `box-sizing` says, so
  the card's 24/28 and its hairline land outside its share. Two `minmax(0, 1fr)` grid
  columns are the frame's equal halves, and they cannot be blown out by a long display
  word either — the repertoire's grid lesson in a new dress. **Measure both children of a
  transcribed `flex-[1_0_0]` pair; equal declarations are not equal boxes.**
- **A frame property that another layout made real can be inert here, and the honest move
  is to drop it rather than write it.** Both masters state `sticky top-0` on this card.
  Layout 2 made it travel with `alignSelf: stretch`; here the frame's own `items-center`
  gives a flex item a box exactly its content height, and stretching it would undo the
  centring that IS this composition. Named in the branch, not written.
- **Two prose seats and one prose field is a real allocation question, and the field's own
  label settles it.** The frame sets a paragraph under the display head *and* a centred
  line under the submit; `FIELDS.form.para` is called "Paragraph", so it takes the
  paragraph, and layout 2 only put it in the 12px foot because it has no paragraph slot.
  What then fills the foot is the audio player's stranding read the same way — the frame's
  "No charge to enquire" is a promise in `FORM_PROMISES`' own register, so
  `vm.formPromiseLine` runs the artist's list together with ` · ` (the testimonials'
  `byline` rule, the events map's composed foot line). The seeded three come to one line
  at 586 and 660 and two at 322, which keeps the frame's single-line picture at both wide
  widths.
- **An eyebrow that makes a claim about the clock has to be re-seated, and the section's
  own dropped content is the first place to look.** "AVAILABLE 2025 / 2026" is unknowable
  (the booking calendar's rule). It takes `s.brand`: v0 and v1 both pair the artist's name
  with this very heading in a credit row, and it is this frame's *composition* that drops
  the row — so the name returns in the one small caps line the design does draw. That is a
  reading of content the section already has, which beats both a `vm` literal and a new
  field with an invented default. Its `chipType` is the bio ID card's object verbatim,
  same `size/chip` token and same `-0.06em`.
- **The half standing on the page ground needs no colour, and mixing the two halves' pairs
  is the easy slip.** `sem/text/2` is `#111111`, which IS Retro's `tx`, so the eyebrow and
  the paragraph inherit and the flat four are right by construction (the media player's
  rule). The paragraph shipped its first draft with the card's `ink` — `s.paperFg`, which
  on Lime is the near-black that reads on pale lime and *is* that theme's page ground.
  **A branch with two grounds wants the five-theme digest run over both**, not just over
  the card.
- **The pill is the audio player's `s.pillBg`-dies-on-paper lesson, exactly.** The frame
  stands `sem/text/3` on `sem/box/1`, which under Retro is the mustard on the cream and
  reads — but `pillBg` is the lightest *tag* where `paper` is the lightest colour
  outright, and on Lime and Grunge the two resolve to the same value, drawing a mustard
  pill on a mustard card. The flat four therefore **invert** the frame's relationship to
  `paperFg` on `paper` (a dark pill carrying a light disc), which is what layout 2's
  near-black pill already does. Four values move together: pill ground, pill ink, disc
  ground, disc glyph.
- **The whole live seam is one `evaluate_script` in a hidden iframe.** Arm a capture-phase
  `preventDefault` on `a[href^="mailto:"]`, click the pill empty (four rings + the prompt),
  fill through the native setter with the popup's own `Event`, read the composed href off
  `getAttribute`, click again (the sent card), then *Write another* (the values survive).
  React commits asynchronously, so each step wants ~250ms — the published-tab note's rule,
  biting through the harness as it did for the pricing deck.

Learned on the testimonials (section 12):

- **A frame that draws the same string twice is telling you its cell count is
  placeholder content, and that is the cheapest reading of a "wall" there is.** Row 1's
  two cells carry one string and row 2's first two carry another — the gallery's
  repeated-photographs tell, twice in one frame — so the six-cell bento is *one card per
  review* plus the stat card, and the seeded three simply draw a shorter wall. The
  alternative readings all break on the same fact: five seats fed by three reviews either
  duplicates a quote on a published page or strands reviews 6–8 of a `max: 8` field
  (`repFlat`'s promise). **Diff the frame's own strings against each other before reading a
  count as a design** — it is the gallery's rule met at the level of copy rather than
  photography.
- **A section can lose its whole live seam and lose nothing, and this is the first time in
  the pass that is true.** The gallery's question 11 gave up a viewer the visitor could
  otherwise have used; here `cur` reaches nothing because the wall shows every review at
  once, so there is nothing to page. The discriminator is not "does the frame draw a
  control" — it is **what the missing control would have reached**. Layouts 1 and 2 page
  because they draw one card; a design that draws all of them owes no pager.
- **Two seats, not a column count, is what makes a bento generalise.** The 275 leading row
  0 and the 276 trailing row 1 are the frame's own numbers at 1440 *and* 768 — where they
  are the **widest** cells on their row, so "narrow seat" is a misnomer for a *stated* one
  — and everything else is `minmax(0, 1fr)`. The 276 is taken only when row 1 is full, so a
  short last row fills by construction and the seeded third review runs the whole measure.
  **Rows past the second are three equal fills**: the frame states two and an alternation
  extrapolated from two samples is engineering, where the pricing deck's
  a-fourth-package-wraps rule is already written down.
- **Grid columns, not a flex row, for any row of padded cells** — the enquiry form's
  `flex: 1 0 0` lesson, and here it also gives the two stated seats a template for free.
  One `gridTemplateColumns` expression covers all four cases (mobile, row 0, a full row 1,
  everything else) and the desktop measurements land on 225.5 / 400.2 / 400.2 and
  399.8 / 399.8 / 226.3 — the frame's grid to the tenth.
- **The rendered-or-not rule can *be* a second cell design.** The frame draws a named cell
  and a quote-only cell; one template whose disc, name and role are each rendered or not
  (layout 1's own rule for this very section) collapses to the bare cell exactly when the
  review has neither `who` nor `role`. No `named`/`bare` branch, no derivation to justify,
  and nothing discarded — which is what the alternative, alternating the two kinds by
  index, would have done to two reviewers in five.
- **`&n=` could not reach that state and the gap was invisible until the branch needed
  it.** `LIST.testimonials` empties `who` every fifth row and `role` every third, so the
  two first coincide at row 15 — past `max: 8`. Emptying `role` on the `who` row too is one
  expression. The bio's add-the-switch-in-the-same-session rule, for a *combination* of
  columns rather than a column.
- **A dropped claim can be replaced by the section's own arithmetic, not only by a
  field.** Every earlier session re-seated a claim with a field (`base`, `radius`, `sub`) or
  dropped it outright; the `4.9 /5` becomes the **review count**, which is neither. It is
  the events map's `{n} pins` promoted to a display numeral, and it makes the stat card
  read at any count including zero. Note what that then forbids: the `★★★★★` beside the
  faces would naturally have taken "3 reviews" too, and does not, because the numeral
  already has it — allocate-each-field-once reaching a *derivation*.
- **`s.pillBg` is legible on `s.deep` by construction, which is the audio player's
  dies-on-paper lesson from the useful end.** The lightest tag on the darkest tag needs no
  literal and no `contrast()` call, and under Retro it resolves to the frame's own
  `#D8A227` exactly. Reach for it whenever a dark card needs a highlight; reach for
  `paperFg`/`paperFg` when the card is light.
- **`line2`, not `deepFg25`, is the hairline on a `deep` card — the events map wrote the
  rule down and then shipped the other value.** `deep` is the darkest *tag*, which **is**
  the page ground on Lime and Grunge, so the outline is the whole of what parts the card
  from the page; `rgba(tx, .4)` reads on exactly the two palettes that need it and is
  inertly invisible on the three whose card already contrasts. Copy the convention, not the
  neighbouring branch's code.
- **A frame's gap is measured against the frame's own glyph.** The `4` `/5` pair sits at
  gap 4 because `/` is its own separator; the same 4 under a *word* reads "3reviews". The
  calendar's "our content is longer than the frame's, so its squeeze is not transferable",
  at the scale of one character.
- **Check a `whitespace-nowrap` against the seed, not against the frame's copy.** The
  `inf` block states it inside an `overflow-clip` cell, and the seeded second review's own
  "Venue manager, Albert Hall" is 160px of Inter in the 130px measure a 768 fill leaves.
  The media player's destroys-its-own-content rule, caught by reading `QUOTES` rather than
  the render.
- **The whole branch is one `z`, one type table, one colour block and a four-armed
  template.** No state, no handler, no decoration, no `s.retro` gate beyond the literals —
  a stddev scan of all three renders is 0 over the page *and* every cell, so there is
  neither grain nor a torn edge and the root's `cream` flag stays `s.v0`'s. Cheaper than
  the gallery's, which held the record.

## Open questions

1. ~~**What the columned five do at 1052.**~~ *Settled on the bio (section 2), for all five, and
   the calendar's half closed on section 6.* **Fill, and the masters' own flex declarations say
   which parts stretch** — see *Learned on the bio* in *Conventions*. No 1440-wide master of
   "Booking Calendar — C · Mobile availability" exists: its main component (`436:1634`) is
   **340** wide, narrower than any of the three instances, so the rule applied unchanged. What
   the calendar adds is the price — see *Learned on the booking calendar*, where a 25px dot ends
   up in a 144px column. All five columned sections are now fitted.
2. ~~**Whether the bar-meter player plays.**~~ *Answered on the audio player (section 4): it
   does not.* The frame draws a real transport — a waveform, a playhead and a scrubber — over
   `FIELDS.audio.tracks`, which is a delimited textarea, not the media player's `c.tracks`
   repeater with its per-row `audio` address. So making it play would need a field the section
   does not have, on top of the `s.live` work. It is fitted as a picture, which keeps CLAUDE.md's
   rule intact, and it now **loses nothing the artist typed** — that claim was only true once the
   card became one per track. There is no handler and therefore no pointer cursor on the five
   discs (the calendar's rule). Making it play stays a separate merge, the way
   `media-player-playback` was, and it would want a per-row address field first.
3. **Whether `tags` and `audio` should have been fitted at layout 1.** *Answered on the tags row
   (section 3) and again on the audio player (section 4), and the answer stands:* each now has one
   fitted layout out of three,
   and a user who picks layout 1 or 2 still gets an invented flat design. Nothing about fitting
   it made the numbering read better and nothing about it needed to. Neither has ever been
   Figma-fitted — no commit in the repo's history fits either, and both components are generic
   flat designs with no `s.retro` gating — so both are getting their first Figma design at
   layout 3, and a user who picks layout 1 or 2 for either still gets the flat one. That is
   layout 2's open question 2 resolved the only way this page allows
   — there is no layout-1 or layout-2 frame for either — but it does mean the two categories'
   layout numbering no longer reads "the fitted ones first".
4. **`video` has no layout-3 design**, so the twelve fitted sections are not the fourteen
   categories, and a page can be set to layout 3 throughout only if it carries no video section.
   Same shape as layout 2's missing `tags`/`audio`, and the same answer: leave it.
5. **The header's seal has nowhere to go in layout 3.** *Named, not open.* The Inset Hero frame
   draws no seal, so `FIELDS.header.showBadge` edits nothing while layout 3 is selected. That is
   layout 2's open questions 4/7/8/12 in the header — a field reaching some layouts and not
   others — and the same answer: a seal the frame does not draw would be worse than the absence.
   Layout 3 is also the second header layout to read `avatar`, which it draws as the polaroid.
6. **The composed page's two display heads are borrowed.** *"Reads the room."* and *"Five worth
   your ear"* live in the wrapper frames, not in the instances, so bio and audio are each taking
   a heading the Figma component itself does not draw. Both sections have a `heading` field —
   and **`FIELDS.bio.heading`'s default is already the literal string "Reads the room."**, which
   is about as strong as evidence gets that the wrapper's head is the bio's own copy. Audio's
   `heading` defaults to "Selected Tracks" against the frame's *"Five worth your ear"*, so its
   case rests on the mirrored structure rather than on matching copy. Worth naming because it is
   the first time a section takes copy from outside its own instance; the "KM BIO" eyebrow above
   each head is the part that is *not* claimed.

   *Settled on the audio player (section 4).* The seat is the wrapper's and the copy is the
   section's: `s.title` heads it and the default stays "Selected Tracks", because re-pointing it
   the way `TITLES.tags` was re-pointed would make v0 and v1 newly honour a different word —
   question 7's objection, and the discriminator the tags row already wrote down. The eyebrow is
   taken as a *pattern* rather than a string: the second wrapper still carries the bio head's
   hidden `the` / `room.` nodes, which is what proves it is the bio's Section duplicated, so
   "KM BIO" over a track head is a leftover and the eyebrow is the initials plus the category's
   own name. It is written out as a literal — `EncoreSection` imports nothing from `data.js`, so
   `catName()` is not reachable and must not be made so.

   *The other half, on the media player (section 5): media takes none of it.* The wrapper's one
   head went to audio, so media's layout 3 is the frame's instance and nothing else — which
   leaves `FIELDS.media.heading` (and `kicker`) editing nothing while layout 3 is selected, the
   header's seal in question 5 and layout 2's questions 4/7/8/12. The frame's counter row —
   *● POPULAR … 5 FEATURED / 5 MAX* — is the section's own top line and reads as one, which is
   what makes the absence honest rather than a hole. Note that `TITLES.media` already *is* the
   wrapper's "Five worth your ear." — a stronger copy match than audio's — so the seat was
   allocated by the plan's mirrored-structure reading and not by the copy; had it gone the other
   way, audio would have been the headless one.
7. **The bio's `kicker` and `location` are not editable.** `FIELDS.bio` names neither, so
   `cv('kicker', …)` and `cv('location', …)` always resolve to the page-level literals "DJ ·
   Live Act" and "Manchester, UK". Layout 3's ID card now sets them as two of its three stats,
   where v0 prints them as a credit line and v1 as a caption — so all three layouts print copy
   the artist cannot change. Adding the two `FIELDS.bio` entries is two lines and would change
   no default rendering, but it *would* make two signed-off layouts newly honour an edit, which
   is a design call rather than a fidelity one. Named here rather than taken; `since` was added
   because layout 3 draws a seat nothing could reach, which is not this case.
8. **The booking calendar's `cta` has nowhere to go in layout 3.** *Named, not open.* The frame's
   foot **is** the pill, and what it carries is the enquiry line — so the pill takes `line`, and
   `FIELDS.calendar.cta` edits nothing while layout 3 is selected. That is the header's seal
   (question 5) and media's `heading` (question 6) a third time, and here the trade was between
   two fields rather than between a field and a literal: labelling the pill `calCta` would have
   dropped the composed line, which is the section's own output and the only thing on the card
   that names the hour `time` sets. The card's other borrowed seat went the other way — the
   wrapper's "Book Me" is `s.title`, and `TITLES.calendar` stays "Availability", because
   re-pointing it would move layout 2's signed-off head (question 7's discriminator, the tags
   row's rule).
9. **The repertoire's search box and its filter chips have nowhere to go in layout 3.** *Named,
   not open.* The frame draws neither, so `q` and `chip` reach nothing while layout 3 is
   selected — the header's seal (5), media's `heading` (6) and the calendar's `cta` (8) a
   fourth time, and the mildest of the four: the section's tags are read *harder* here than in
   either fitted layout, since the set cards **are** the chip row, and every song reaches a
   card. What is genuinely absent is the search, which is a control rather than a field and
   has no editor entry to leave editing nothing.
10. **Layout 3's `All` card is drawn conditionally, which is the first content rule in this
    pass whose *presence* depends on the artist's data.** A page whose songs are all tagged
    shows the frame's three cards; adding one untagged song adds a fourth card holding the
    whole list, and at the two wide widths that also brings the pager in. Both are derived and
    both are named in the branch, but it is a bigger jump than any other diff this pass ships
    and it is worth watching if the remaining five sections meet the same shape. The
    alternative — `All` always, at the front — was tried and rejected on the ground that a card
    duplicating every song on a fully-tagged page is a design defect rather than a fidelity
    diff; see *Learned on the repertoire*. Its far end is a page whose songs carry **no**
    tags at all: `repChips` is `[All]`, so `repSets` is the one card, and `repeat(3, 1fr)`
    seats it in column one at a third of the measure. `&n=` cannot reach that state (only
    every fifth row is untagged), it is only ever seen mid-edit, and it is the pricing deck's
    lone-fourth-card picture — left as it is rather than special-cased into a full-width card,
    which would be a second composition for one state.
11. **The gallery's layout 3 has no live seam at all**, which is the fifth sighting of a
    control or field a layout cannot reach — the header's seal (5), media's `heading` (6), the
    calendar's `cta` (8) and the repertoire's search (9) — and the first where the *whole* seam
    goes. The masonry frame draws no viewer, no arrows, no thumbnail strip and no source rows,
    so `pick` reaches nothing while layout 3 is selected and `youtube` / `instagram` / `tiktok`
    have no row to go in. The three addresses are layout 2's Soundcloud call already made
    (their `FIELDS` hints say "Layout 1 only", which stays true), so what is genuinely new is
    that a section CLAUDE.md lists among the fourteen `s.live` readers now has a layout in
    which it reads nothing. *Named, not open*: a lightbox is a control the frame does not draw,
    and the video and audio sections are the precedent for a §10.2 section that is a picture on
    both surfaces. Worth watching if the remaining four sections meet the same shape — it is
    the one thing this pass has dropped that a visitor could otherwise have used.
12. **Layout 3's FEATURED badge is the first label this pass puts on the artist's own
    content that no field backs.** Every earlier invention has been either a literal the
    design chose about itself (the calendar's three legend labels, the media player's
    "● POPULAR", `WHAT'S INCLUDED`) or a derivation of what the artist typed (the
    repertoire's set cards, the pricing chip row). This is a *claim about one package*,
    and the package it lands on is chosen by position rather than by anything the artist
    said. The precedent is the media player's fan, whose centre seat "is the accent and
    carries the Featured tab" — but that seat is the track being *played*, which the
    visitor chose, where this one is the row that happens to end the stack. It is shipped
    that way because every alternative is worse: dropping the badge loses the frame's
    whole hierarchy (the fill would then mark a row for no stated reason), parsing `price`
    for the dearest package breaks on "POA" and "From £2k", and a `featured` flag on
    `c.tiers` is a seventh column on a repeater the deck's own layout would then have to
    honour or ignore. Worth watching if the remaining three sections meet the same shape —
    and worth revisiting if `TiersField` ever grows a column for another reason, since a
    checkbox there would retire the whole question.
13. **`FIELDS.pricing` now has two fields reaching exactly one layout each and a third
    reaching two** — `quote` (layout 2), `intro` (layout 3) and the tags inside `tiers`
    (layouts 1 and 3, so layout 2 reads none of them). That is
    `FIELDS.media.soundcloud`'s case three times in one editor, and the panel says so in
    each hint, but it is the densest concentration of it in the file: an artist editing
    this section sees two fields doing nothing whatever layout they pick. *Named, not
    open* — the alternative is a per-layout editor, which is a much larger design than
    this pass — but it is the clearest evidence yet that the hints are carrying weight the
    panel's own structure should.
14. **The events map's layout 3 is the first design in this pass to give a section a
    *new control* rather than a new seat for an old one.** Its chip row filters the gig
    list by city — derived from `c.gigs`, so nothing is invented and no field is added —
    but the section's other two layouts have no filter at all, which means the same page
    gains and loses a control as the layout is switched. That is the reverse of questions
    5/6/8/9/11, where a layout *lost* something the section had. It is shipped because the
    frame draws the row and because dropping it would leave a visible hole under the head,
    but it is worth watching: `s.live` state that only one layout can reach is a shape this
    file has not carried before, and if a fourth layout ever wants a filter the derivation
    belongs beside `repChips` in `data.js` rather than in `sectionVm`.
15. **`FIELDS.map` now has one field reaching exactly one layout** — `cta` (layout 3) —
    beside `sub`, which has reached only the flat tail since it was added. That is
    `FIELDS.media.soundcloud`'s case again and the hint says so, but it is the second
    editor in this pass to grow one (question 13 is the first, with three), and the
    pattern is now general enough to be worth naming as a pass-level cost rather than a
    per-section note.
16. **The enquiry form's `image`, `photo`, `types` and `message` all reach layouts other
    than 3**, which is the sixth sighting of questions 5/6/8/9/11's shape and the widest
    yet: four of the section's ten fields edit nothing while layout 3 is selected, where
    the earlier cases lost one apiece. Two were already single-layout before this session
    (`types` and `message` say "Layout 1 only"; `photo` says "Layout 2 only"), so what is
    new is only `image` — the portrait v0 draws as a 48px circle and v1 as the same circle
    in its credit row. The frame draws no credit row at all, and the artist's *name* comes
    back in its eyebrow instead, so the absence is the photograph's alone. *Named, not
    open*: inventing a credit row this frame does not draw would be worse, and the hint
    now says which layouts the portrait reaches. It does mean this editor has overtaken
    the pricing section's three (question 13) as the file's densest concentration of
    fields whose panel gives no clue they are idle beyond their own hint text.
17. **The testimonials' layout 3 gives up the section's whole live seam, and it is the
    first time in this pass that costs the visitor nothing.** Question 11 said the
    gallery's masonry was "the one thing this pass has dropped that a visitor could
    otherwise have used"; the bento wall drops more — no arrows, no rail, no `cur` at all
    — and drops nothing, because every review is on the wall and a pager exists in layouts
    1 and 2 only to reach the reviews their one card cannot show. **`s.live` state is owed
    by a design that shows part of a list, not by a section**, which is the answer question
    11 could not give and the thing to check first the next time a frame draws no control.
    Nothing else is lost either: `heading`, `sub` and every column of `c.quotes` but one
    are read, and `sub` *gains* a layout here (its hint now names two).
18. **`FIELDS.testimonials.when` and `cta` have no seat in layout 3** — the seventh
    sighting of questions 5/6/8/9/11's shape, and the mildest since the repertoire's. `cta`
    is a whole field (the wall carries no pill, and inventing one the frame does not draw
    would be worse); `when` is a *column* of a repeater, which is the enquiry form's
    `placeholder` case (layout-2 question 12) a second time — the frame's `inf` block is
    two lines and a third would be invented. Both hints say so. What is worth watching is
    that this section's three layouts now read three different subsets of one repeater row:
    layout 1 puts `when` above the quote, layout 2 opposite the byline, layout 3 nowhere.
19. **Layout 3's review count is a derivation in a display slot, which is *not* question
    12's shape and the distinction is worth keeping.** The pricing deck's FEATURED badge is
    a claim about one package chosen by position; this numeral is arithmetic over the whole
    list, the events map's `{n} pins` promoted from a foot line to 48px of display type. It
    can be wrong about nothing. Named here only because a big mustard numeral *looks* like
    the frame's rating and a later reader might take it for one — it is `s.quotes.length`,
    and the frame's own `4.9 /5` is gone.

## Addendum, 2026-09-15 — QA against the frames

Reversals and fixes after QA compared the built page with the layout-3 frames. Branch
`retro-layout-3-qa-fixes`, one section at a time.

- **Bio — the composed page is reproduced after all.** Open question 1's "fill 1052" is
  reversed: QA read the full-width card (and its 3.2:1 torso crop) as not the design. At
  desktop, `pageRows` (`data.js`) groups a calendar on layout 3 with the run of bio / media
  sections on layout 3 directly above it, and `arrangeRows` (`EncoreBuilder.jsx`) lays that
  row out as Frame 299: a grid at 858fr : 405fr, 45 apart (55 × 0.82), inside the page
  gutter. Its sections are built with `sectionVm({ column: true })`, which zeroes `padX` and
  `surplus` and keeps `padY`. The editor canvas and the published tab share both helpers;
  tablet and mobile still stack. The columns come out 684 and 323 wide at 1180.
  `PAGE_ORDERS[2]` is new — header, bio, media, **calendar**, repertoire, … — because the
  columns are built from adjacency; the narrow pages' calendar-after-repertoire is the named
  cost. The "columned five" of this plan are three now (`tags` and `audio` left the project
  in `d734992`), and the Genres chip row under the card is **not** drawn (decided at QA).
- **Bio — photograph.** The ID card's slot is the frame's whole Velvet Note stage shot, not
  `stage.jpg`'s portrait slice of it: `photos/bio-stage.jpg` (1200 × 675), seeded for Retro
  at layout 3 alone through `SEEDS.Retro.layouts` and a `design` argument to
  `defaultImage` (`sectionVm` and `EditPanel` both pass it). Layout 1's polaroid keeps the
  portrait.
- **Bio — stats.** `since` is seeded with the frame's "June 2021" (`DEFS.since`, reaching
  layout 4's overlay line too), so the seeded card draws three columns. The stat row no
  longer wraps: columns shrink and values break between words, as the frame's two-line
  values do, and each value reserves two lines (`minHeight: 2.2em`), so a one-line value
  keeps its column level with its neighbours — labels share a top, each value sits straight
  under its label, and the group stands on the 96 box's floor, as all three masters draw it. A before/after digest (themes 0–4, every cat × layout ×
  width) moved bio arch 2 and bio arch 3 only — the latter being layout 4's overlay line
  now printing "Performing since June 2021", which that frame draws.
