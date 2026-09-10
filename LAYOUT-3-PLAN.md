# Retro layout 3 — section-by-section plan

Working checklist for fitting **layout 3** of every Retro section to Figma, one section per
session, clearing context between sections. Layouts 1 (`s.v0`) and 2 (`s.v1`) are fitted and
signed off at all three widths; nothing here should touch either.

**Read first, every session:** [`CLAUDE.md`](./CLAUDE.md), then this file, then
[`LAYOUT-2-PLAN.md`](./LAYOUT-2-PLAN.md)'s *Conventions* section — ~110 bullets, every one of
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

**Twelve to fit.** Sizes are the frames' own; the desktop numbers land on the 1180 canvas at
**× 0.82** as before, and the 768 / 390 frames are used **verbatim**. Each row's three masters are
one session.

| # | Cat | Desktop node | Frame name | Size | Tablet node | Size | Mobile node | Size | Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `header` | `964:68622` | Headers — **D · Inset Hero** | 1440 × 900 | `977:22532` | 768 × 1024 | `982:9583` | 390 × 930.5 | todo |
| 2 | `bio` | `964:68631` | Bios — **E · Stacked ID card** | 858 × 882 | `977:22717` | 708 × 912 | `982:10013` | 370 × 860 | todo |
| 3 | `tags` | `964:68632` | **Tags — Frame** | 858 × 75 | `977:22718` | 708 × 67 | `982:9769` | 370 × 97 | todo |
| 4 | `audio` | `964:68641` | Audio Player Componenets — **H · Bar-meter player** | 858 × 243 | `977:22727` | 708 × 243 | `982:9778` | 370 × 243 | todo |
| 5 | `media` | `964:68642` | Media Player — **A · Editorial numbered list** | 858 × 647 | `977:22728` | 708 × 647 | `982:9779` | 370 × 647 | todo |
| 6 | `calendar` | `964:68645` | Booking Calendar — **C · Mobile availability** | 405 × 497.9 | `984:10605` | 708 × 456.9 | `984:10673` | 370 × 433.9 | todo |
| 7 | `repertoire` | `964:68646` | Repertoire — **E · Curated set-list cards** | 1440 × 621 | `977:23041` | 708 × 636 | `982:10193` | 390 × 697 | todo |
| 8 | `gallery` | `964:68647` | Gallery Sections — **B · Masonry grid** | 1440 × 789 | `977:23131` | 768 × 865 | `982:10257` | 390 × 678 | todo |
| 9 | `pricing` | `964:68648` | Pricing — **F · Stacked rows** | 1440 × 1022 | `977:23149` | 768 × 941 | `982:10274` | 390 × 1358 | todo |
| 10 | `map` | `964:68649` | Events Map — **A · Split list + map** | 1440 × 804 | `977:23264` | 768 × 809 | `982:10389` | 390 × 878 | todo |
| 11 | `form` | `964:68650` | Enquiry Forms — **F · Full-bleed hero form** | 1440 × 548 | `977:23406` | 768 × 680 | `982:10472` | 390 × 722 | todo |
| 12 | `testimonials` | `964:68651` | Testimonials — **D · Bento wall** | 1440 × 790 | `982:8584` | 768 × 777 | `982:10499` | 390 × 1076 | todo |
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

1. Read `CLAUDE.md`, this file, `LAYOUT-2-PLAN.md`'s *Conventions*, and the two memory notes.
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

   Read CLAUDE.md, then LAYOUT-3-PLAN.md, then LAYOUT-2-PLAN.md's Conventions section,
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

`LAYOUT-2-PLAN.md`'s ~110 bullets all still apply and are not repeated. This list starts with what
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
- **Media's layout 3 is layout 2's right column.** "Media Player — A · Editorial numbered list" is
  the same component already fitted inside `Media`'s `v1` branch (layout 2's `media` section was a
  `Section` holding the fanned carousel *beside* this list). The session decides whether to lift
  the list into a shared inner component used by both branches or to write it again; if it lifts,
  the `git stash` desktop digest has to prove `v1` byte-identical.
- **The audio bar-meter draws a transport.** CLAUDE.md's standing rule is that the audio section
  is still a picture — the media player is the only one that plays. Default is to fit it as a
  picture; making it play is a separate merge, the way `media-player-playback` was. Open question
  2 below.
- **The repertoire's tablet master is inside the composed column** (`977:23041`), not a top-level
  child of the tablet page. Its desktop and mobile masters are standalone.

## Open questions

1. **What the columned five do at 1052.** Stated in full under *The composed page* above: the
   desktop column is 1052 and the ramped instances are 704, so bio, tags, audio, media and the
   calendar all have to be either stretched half again past any drawn state or capped. **The bio
   session decides for all five and records the decision in *Conventions*.** The calendar is the
   extreme case — 405 → 1052, and its two drawn widths disagree about the composition rather than
   only its size — so check the Components page for a wider master of "Booking Calendar — C ·
   Mobile availability" before its session commits to anything.
2. **Whether the bar-meter player plays.** The frame draws a real transport — a waveform, a
   playhead and a scrubber — over `FIELDS.audio.tracks`, which is a delimited textarea, not the
   media player's `c.tracks` repeater with its per-row `audio` address. So making it play would
   need a field the section does not have, on top of the `s.live` work. Fitting it as a picture
   keeps CLAUDE.md's rule intact and loses nothing the artist typed. This is a scope call, not a
   fidelity one.
3. **Whether `tags` and `audio` should have been fitted at layout 1.** Neither has ever been
   Figma-fitted — no commit in the repo's history fits either, and both components are generic
   flat designs with no `s.retro` gating — so both are getting their first Figma design at
   layout 3, and a user who picks layout 1 or 2 for either still gets the flat one. That is
   layout 2's open question 2 resolved the only way this page allows
   — there is no layout-1 or layout-2 frame for either — but it does mean the two categories'
   layout numbering no longer reads "the fitted ones first".
4. **`video` has no layout-3 design**, so the twelve fitted sections are not the fourteen
   categories, and a page can be set to layout 3 throughout only if it carries no video section.
   Same shape as layout 2's missing `tags`/`audio`, and the same answer: leave it.
5. **The composed page's two display heads are borrowed.** *"Reads the room."* and *"Five worth
   your ear"* live in the wrapper frames, not in the instances, so bio and audio are each taking
   a heading the Figma component itself does not draw. Both sections have a `heading` field —
   and **`FIELDS.bio.heading`'s default is already the literal string "Reads the room."**, which
   is about as strong as evidence gets that the wrapper's head is the bio's own copy. Audio's
   `heading` defaults to "Selected Tracks" against the frame's *"Five worth your ear"*, so its
   case rests on the mirrored structure rather than on matching copy. Worth naming because it is
   the first time a section takes copy from outside its own instance; the "KM BIO" eyebrow above
   each head is the part that is *not* claimed.
