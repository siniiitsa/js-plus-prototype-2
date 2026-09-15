# Retro layout 4 — section-by-section plan

Working checklist for fitting **layout 4** of every Retro section to Figma, one section per
session, clearing context between sections. Layouts 1 (`s.v0`), 2 (`s.v1`) and 3 (`s.v2`) are
fitted and signed off at all three widths; nothing here should touch any of them.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then
[`layout-3.md`](./layout-3.md)'s *Conventions* (~90 bullets) and
[`layout-2.md`](./layout-2.md)'s *Conventions* (~110 bullets) — every one of them still
true, and this file does **not** repeat them — then the two memory notes `figma-frame-reading` and
`verifying-the-published-tab`. `SPEC.md` lives in git history — `git show 8fa8ff4:SPEC.md`.

Branch: **`retro-layout-4`**.

**The pass is closed.** All twelve sections were fitted (`5bb8c9c` closed the last of them) and
the **end-of-pass sweep** — which this file had been collecting since section 1 — ran as one
session of its own: the three comment drifts under *Where layout 4 goes* and the four
"layouts 1, 2 and 3" documents in `80c557c`, then `npm run build:standalone`, the `cp` to the
root `index.html`, the two-build digest and the built-file tells in `9e0f726`. Nothing below is
owed a fit, and the only thing left open is question 10, which is an observation rather than a
task. See *Learned on the end-of-pass sweep* at the foot of *Conventions* for what this one cost
that layouts 2 and 3 did not.

## The Figma source

Layout 4 is a fourth full page composed of a fourth option for each section, and — as with layout
3 — **all three canvases were supplied up front**, so all three widths are one session.

| Canvas | Frame | Node | Size |
|---|---|---|---|
| Desktop | Frame 225 | `964:72510` | 1440 × 10186.5 |
| Tablet | Frame 265 | `964:76437` | 768 × 10735.4 |
| Mobile | Frame 270 | `971:12206` | 390 × 9813.5 |

- Desktop: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=964-72510&m=dev>
- Tablet: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=964-76437&m=dev>
- Mobile: <https://www.figma.com/design/uFoUbPaBrDicjyuSBEbtGT/SAAS-Final--Copy-?node-id=971-12206&m=dev>

`fileKey` = `uFoUbPaBrDicjyuSBEbtGT`.

**Frame names collide across pages, and the instance suffixes lie again — match on node id and
width, never on the name.** This desktop page is called "Frame 225"; its tablet sibling is "Frame
265", which is also the name of a *checkerboard strip* inside all three pages. The specific
offenders found so far: the `tags` instance is called "— Desktop" at all three widths; the bio's
tablet master is "— Desktop" (its 390 one is honestly "— Mobile"); and the **mobile** media
player, repertoire, enquiry wizard and booking calendar are all called "— Tablet". Both narrow
footers name components this page has not used before (*Component 3* at 768, *Component 4* at
390) where the desktop one is layout 2 and 3's *Component 2*.

## The sections

**Twelve to fit.** Sizes are the frames' own; the desktop numbers land on the 1180 canvas at
**× 0.82** as before, and the 768 / 390 frames are used **verbatim**. Each row's three masters are
one session.

| # | Cat | Desktop node | Frame name | Size | Tablet node | Size | Mobile node | Size | Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `header` | `964:72511` | Headers — **C · Stacked** | 1440 × 900 | `964:77544` | 768 × 1024 | `971:14040` | 390 × 844 | done e4e7b27 |
| 2 | `bio` | `964:72519` | Bios — **B · Portrait + overlays** | 664 × 720 | `964:76446` | 708 × 720 | `971:14479` | 370 × 536 | done `21bfa3c` |
| 3 | `tags` | `964:72516` | **Tags — Frame** | 457 × 118 | `964:76443` | 457 × 103 | `971:14238` | 370 × 58 | done `c583070` |
| 4 | `media` | `964:72526` | Media Player — **K · Turntable + playlist** | 1440 × 671 | `971:15190` | 768 × 569 | `971:14834` | 390 × 831 | done `62355c9` |
| 5 | `video` | `964:72777` | Video Players — **B · Cinematic minimal** | 1328 × 754 | `964:78455` | 708 × 402 | `971:15414` | 370 × 209 | done `5999dc1` |
| 6 | `gallery` | `964:72815` | Gallery Sections — **A · Spotlight + thumb rail** | 874 × 646 | `964:78491` | 768 × 594 | `977:8142` | 390 × 605.1 | done `d56fe1f` |
| 7 | `repertoire` | `964:72822` | Repertoire — **C · A-Z index rail** | 1208 × 452 | `964:78509` | 608 × 522 | `977:8166` | 310 × 596 | done `104530e` |
| 8 | `map` | `964:72830` | Events Map — **C · Dashboard split** | 1440 × 747 | `964:78599` | 768 × 870 | `977:8322` | 390 × 680 | done `0cbf413` |
| 9 | `pricing` | `964:72831` | Pricing — **G · Service rows** | 1440 × 522 | `964:78656` | 768 × 774 | `977:8440` | 390 × 846 | done `0e3fba6` |
| 10 | `calendar` | `964:72844` | Booking Calendar — **D · Enquiry summary stack** | 478 × 491 | `964:79434` | 608 × 472 | `977:8514` | 350 × 469 | done `5da1c3a` |
| 11 | `form` | `964:72845` | Enquiry Forms — **F · Editorial form** | 1440 × 814 | `964:79477` | 768 × 950 | `977:8663` | 390 × 920 | done `67c297a` |
| 12 | `testimonials` | `964:72846` | Testimonials — **I · Video story wall** | 1440 × 716 | `964:79536` | 768 × 604.4 | `977:8764` | 390 × 588.4 | done `5bb8c9c` |
| — | `audio` | *none* | — | — | *none* | — | *none* | — | **no layout-4 design on this page** |
| — | *(form #2)* | `964:72843` | Enquiry Forms — **C · Multi-step wizard** | 680 × 491 | `964:79037` | 608 × 466 | `977:8513` | 350 × 465 | **not fitted** — see open question 1 |
| — | `footer` | `964:72847` | Component 2 | 1440 × 479.5 | `964:79569` | 768 × 721 | `977:8806` | 390 × 721 | **out of scope** |

- **`audio` has no layout-4 design.** This page omits it, the way layout 3's page omitted `video`
  and layout 2's omitted `tags` and `audio`. What that costs is *not* the same as layout 3's
  video, because audio's fold lands on an invented design rather than a fitted one — open
  question 3.
- **`video` gets its third design and its first since layout 2.** It is the one category whose
  `NVAR` is 2, so its slot arithmetic needs a decision the other eleven do not — open question 2.
- **The page carries the `form` category twice** — the wizard inside the *Book Us* block and the
  editorial form as a full-width band below it. Our page can carry one `form` section, so one of
  them is the fit and the other is not. Open question 1, and it has to be settled before section
  10 (`calendar`), whose master is the wizard's other half.
- **The footer stays out of scope**, for layout 2 and 3's reason: `NVAR.footer` is 1 and these are
  the same three designs the fitted footer already is. Its narrow masters name *Component 3* and
  *Component 4* here, which is new — worth a look if the footer is ever reopened, and nothing to
  this pass.

## The composed page, and what our page does instead

Layout 3's page columned five sections; this one columns two (the bio block and the *Book Us*
block) and wraps six more in display heads. Our page has no columns and no wrappers:
`EncoreBuilder` stacks sections, each at the content column's full width. So **the composition is
not reproduced — the instances are**, and the heads are allocated to sections here, once, so that
two sessions never each claim one heading.

```
Frame 225  (1440 × 10186.5)
├─ Headers — C · Stacked                     964:72511  1440 × 900          y 0
├─ Section  964:72512   (1440 × 952, olive sheet)                           y 900
│  ├─ Frame  964:72513  (664 × 720 at x 56)
│  │  ├─ "KM BIO"           964:72514   ← page eyebrow
│  │  ├─ "Reads the room."  964:72515   ← display head          → bio
│  │  └─ Tags — Frame       964:72516   (457 × 118)             → tags
│  └─ Bios — B · Portrait + overlays  964:72519  (664 × 720 at x 720)
├─ Frame 317  964:72520  (1440 × 1012, cream sheet)                         y 1852
│  ├─ Frame 265  964:72527   checkerboard strip  1440 × 23.6  at y 22.6
│  ├─ "Six Worth Your Ears"  964:72523  (1328 × 85)             → media
│  ├─ Media Player — K · Turntable + playlist  964:72526  (1440 × 671)
│  └─ Frame 266  964:72650   checkerboard strip  1440 × 23.6  at y 1012
├─ Frame 318  964:72773  (1440 × 1155, page ground)                         y 2864
│  ├─ "See me in action"  964:72776                             → video
│  └─ Video Players — B · Cinematic minimal  964:72777  (1328 × 754)
├─ Gallery Sections — Component 1  964:72780  (1440 × 746, olive, torn top) y 4019
│  ├─ Frame 182  964:72781  → "MEDIA" eyebrow + "Snaps from the night"  → gallery
│  ├─ Frame 186  964:72785  hidden="true" — the four media-source rows
│  └─ Gallery Sections — A · Spotlight + thumb rail  964:72815  (874 × 646)
├─ Section  964:72817  (1440 × 947, olive, torn foot)                       y 4765
│  ├─ "Repertoire"  964:72819                                   → repertoire
│  └─ Repertoire — C · A-Z index rail  964:72822  (1208 × 452)
├─ Frame 319  964:72824  (1440 × 1037)                                      y 5712
│  ├─ "Distances we'll Travel"  964:72827  (1328 × 170)         → map
│  └─ Events Map — C · Dashboard split  964:72830  (1440 × 747)
├─ Pricing — G · Service rows  964:72831  (1440 × 522)                      y 6749
├─ Section  964:72832  (1440 × 906, tan panel on the page ground)           y 7271
│  ├─ "Book Us"  964:72839                                      → calendar (open question 1)
│  └─ Frame 320  964:72842
│     ├─ Enquiry Forms — C · Multi-step wizard          964:72843  (680 × 491)
│     └─ Booking Calendar — D · Enquiry summary stack   964:72844  (478 × 491 at x 730)
├─ Enquiry Forms — F · Editorial form  964:72845  (1440 × 814)              y 8177
├─ Testimonials — I · Video story wall  964:72846  (1440 × 716, mustard)    y 8991
└─ Component 2  964:72847  (1440 × 479.5, cream)                            y 9707
```

**Head allocation, settled here.** Each wrapper is one head over one or two instances, and the
head belongs to a section rather than to the wrapper:

| Head | Eyebrow | Goes to | Note |
|---|---|---|---|
| *"Reads the room."* | KM BIO | `bio` | `FIELDS.bio.heading`'s default **is** that string |
| *"Six Worth Your Ears"* | — | `media` | keep the "Five worth your ear." default; the count is the frame's claim |
| *"See me in action"* | — | `video` | **not** the gallery — see the trap below |
| *"Snaps from the night"* | MEDIA | `gallery` | `TITLES.gallery` is "See us in action" |
| *"Repertoire"* | — | `repertoire` | `vm.title` here is `"{n} Songs"`, not a word — open question 8 |
| *"Distances we'll Travel"* | — | `map` | `TITLES.map` is "Manchester" |
| *"Book Us"* | — | `calendar` | the layout-3 "Book Me" precedent; re-read if question 1 goes the other way |

- **The trap: `TITLES.gallery` is "See *us* in action" and the *video* band's head is "See *me*
  in action".** The near-match is a coincidence of the page's copy, not evidence. The gallery's
  own head is "Snaps from the night" under a "MEDIA" eyebrow. Do not re-point `TITLES.gallery`.
- **`tags` draws its own head this time**, so there is no contention of layout 3's kind: the
  457-wide instance carries the small rust "Genres" line above its chips, which is
  `TITLES.tags` / `FIELDS.tags.heading` as the layout-3 tags session left them.
- **Every head frame carries the same hidden `the` / `room.` leftovers** (`hidden="true"`), which
  is what proves each wrapper is the bio's Section duplicated — layout 3's reading, holding on a
  second page. The "KM BIO" and "MEDIA" eyebrows are the *page's* labels; take them as a pattern
  (initials + the category's own name, written out as a literal — `EncoreSection` imports nothing
  from `data.js`), not as strings, exactly as the layout-3 audio session settled it.

**The bands, and what each section stands on.** A single-column pixel scan of the 1440 page
thumbnail, with the table's own heights (which stack to 10186.5 with no gaps):

| y | Band | Ground |
|---|---|---|
| 0 – 900 | header | full-bleed photograph |
| 900 – 1852 | bio + tags | **olive** `#5B5E2E`, hard edges |
| 1852 – 2864 | media | **cream** `#FBF6EA`, a checkerboard strip at each end |
| 2864 – 4019 | video | page beige `#EAD7B8` |
| 4019 – 4765 | gallery | **olive**, torn top edge (the vector's crest is ~3484) |
| 4765 – 5712 | repertoire | **olive**, torn foot (~5647) — one band with the gallery |
| 5712 – 6749 | map | page beige |
| 6749 – 7271 | pricing | page beige |
| 7271 – 8177 | *Book Us* (wizard + calendar) | a tan rounded panel on the page beige |
| 8177 – 8991 | form | page beige |
| 8991 – 9707 | testimonials | **mustard** `#D8A227` |
| 9707 – 10186.5 | footer | cream |

**The narrow pages carry the same nine bands.** *Taken in the header session (§1), a column scan
of the very edge of each page thumbnail — x 0, so a full-bleed sheet reads as its own ground and
the page reads as the page.* Every band survives at both widths, in the same order and the same
colour; only the y-ranges move, so the table is the **grounds** rather than the geometry:

| Band | Ground | 768 y | 390 y |
|---|---|---|---|
| header | photograph (checker on its floor) | 0 – 1024 | 0 – 844 |
| bio + tags | **olive** `#5B5E2E` | 1025 – 2186 | 848 – 1700 |
| media | **cream** `#FBF6EA` | 2191 – 2869 | 1704 – 2748 |
| video | page beige `#EAD7B8` | 2869 – 3528 | 2775 – 3149 |
| gallery + repertoire | **olive** | 3533 – 5299 | 3154 – 4697 |
| map + pricing | page beige | 5299 – 6710 | 4706 – 5942 |
| *Book Us* + form | page beige | 6710 – 9408 | 5951 – 8502 |
| testimonials | **mustard** `#D8A227` | 9413 – 10013 | 8507 – 9091 |
| footer | cream | 10018 – 10735 | 9095 – 9814 |

So the media band's cream and the gallery/repertoire olive **hold at all three widths**, and no
section changes what it stands on as the page narrows. The layout-3 header session's rule still
applies per section — one margin-pixel read of your own master settles its DOM shape — but the
band it stands in is now settled for the whole pass.

**The two checkerboard strips are the media band's.** Desktop parents both to Frame 317 (its own
top and foot); the narrow pages reparent them to the bio Section's foot (`964:77903`, `971:14242`)
and the video frame's head (`964:78027`, `971:15256`) — the same two page lines either side of
the media band at all three widths. They are 1440 wide and 23.6 tall at every width, and they run
off both edges of the narrow pages (x −336 at 768, x −525 at 390), so they are a bleed and their
pitch is fixed, not fluid.

**What the narrow pages do with the two columned blocks**, which is more evidence that the
composition is the page's and not the sections':

- **Tablet** keeps the bio Section but stacks it — head + tags at 708 (`964:76440`), the bio
  instance under it at 708 (`964:76446`) — and stacks the *Book Us* pair too: wizard 608 × 466
  then calendar 608 × 472 at y 516 (`964:76769`). The media band becomes its own frame
  (`971:14886`).
- **Mobile** does the same again at 370 / 350, and insets the repertoire instance to **310**
  inside a 370 frame (`977:8162`) — a 30px inset our canvas does not have. Layout 2's rule
  applies: the frames' own insets are not our `padX`, so verify against content edges, never
  against frame `y`.

The stacked order both narrow pages settle on — header, bio, tags, media, video, gallery,
repertoire, map, pricing, calendar, form, testimonials, footer — is what our page renders anyway,
and it is the table's order above.

## Where layout 4 goes, and what it costs in `data.js`

`sectionVm` derives the design from `d = arch % designCount(cat)` and already sets `v0`…`v5`
(`EncoreBuilder.jsx:229`). Layout 4 is **`s.v3`** — a new `if (s.v3) { … }` block after the `v2`
block and before the generic flat tail. `s.v3` is unused today in every component but the header,
where `HeaderV3` exists.

**This pass edits more of `data.js` than layout 3 did, and one of the edits is visible in the
UI.** Take each in the section's own commit, never all of them up front:

- **`NVAR[cat]` 3 → 4** for `bio`, `tags`, `media`, `gallery`, `repertoire`, `pricing`,
  `calendar`, `map`, `testimonials`, `form` — ten categories, one per session. Bumping ahead of
  the fit would point layout 4 at the never-designed generic tail.
- **`CATS[].n` 3 → 4 for `tags` and `video`, in the same commit as their `NVAR` bump.** *`tags`
  done — `c583070`; `video` still owed.* Those two
  are the only categories offering fewer than four layout rows, and `pageLayout()`'s own comment
  rests on `designCount ≤ layoutCount` — bumping `NVAR` alone would leave the picker unable to
  highlight the row the fold names. **This is the first time the pass family adds a layout-picker
  card:** layout 3's plan could say "no picker card appears or moves", and this one cannot. Two
  cards appear, both at the end of their category's list, and no existing card moves.
- ~~**`video` needs a decision, not a bump**~~ *Done — `5999dc1`, and it took question 2's
  recommendation (a): `NVAR.video` 2 → 4, `CATS.video.n` 3 → 4, `if (s.v0)` widened to
  `if (s.v0 || s.v2)`, and one sentence added to `pageLayout()`'s comment.*
- ~~**`audio` needs neither**~~ *Settled — `5999dc1`, and `NVAR.audio` stays 3. See open
  question 3.*
- ~~**`header` needs neither.**~~ *Done — `e4e7b27`.* `HEADER_NAMES[3]` is **Stacked · Name
  stacked over the photo**, and all four "Polaroid" references went with it:
  `FIELDS.header.avatar`'s hint dropped its last sentence outright (Stacked *does* draw the
  avatar), and `README.md:142` / `EncoreBuilder.jsx:2806` lost the ratio as well as the name —
  Stacked is 738 against the hero's 614, not "half again as tall". `NVAR.header` stays 6.
- ~~**Three comments drift with the `CATS` and `NVAR` bumps, and all three join the end-of-pass
  sweep.**~~ *All three done — `80c557c`, one line each, taken once rather than eleven times as
  the plan asked.* The `data.js` §4.4 header and `CLAUDE.md`'s *Layout folding* bullet were the
  same claim in two documents; both now state the inequality (`at least as many as`) rather than
  the surplus, and the count they name was **counted rather than assumed** — it is six level
  categories, not the two this bullet predicted: `gallery` and `map` already offered four rows,
  so their `NVAR` bumps made them level without needing a `CATS` bump to show it. The setup
  modal's example (`EncoreBuilder.jsx`) was written once, and what it now names is the fact that
  changed rather than a list that will: the seeded page repeats from the fifth card, and `audio`
  at three is what still denies the cards a page number. `CLAUDE.md` also gained the hand-fold,
  since it repeated `pageLayout()`'s "lowest `arch`" promise that `video` broke.
- ~~**Three documents assert "layouts 1, 2 and 3"** and become four.~~ *Done — `80c557c`, all
  four in the one commit as the plan asked.* `README.md:154`'s "no single repeat period" example
  had to move with them: it named `video` (two designs), which now has four, so it is `audio`
  (three). Its list of one example per header layout gained Stacked's, so "four" is not asserted
  beside examples that stop at three. **Three sentences that also read "layouts 1, 2 and 3" were
  left alone on purpose** — `data.js:770`/`778`, `CLAUDE.md`'s pricing bullet and
  `EncoreSection.jsx:7111` each name which layouts *read a field*, and all of them are true.
- **The bump costs nothing else.** There is no persistence, so no stored page migrates; the seeded
  page is `arch 0` throughout, so the end-of-pass two-build digest is unaffected. The one intended
  change per category is that a section a user had set to layout 4 stops rendering layout 1's
  design and starts rendering this one.
- **Once `v3` lands, the generic tail is dead code for that category.** Leave it, as layout 3 did.

## Per-session procedure

One section per session, **all three widths together**. Clear context between sections; git and
this file are the memory.

1. Read `CLAUDE.md`, this file, then `layout-3.md`'s and `layout-2.md`'s *Conventions*,
   and the two memory notes.
2. `get_metadata` on **all three** of the row's nodes first, beside each other. It is where a
   master that changes shape rather than shrinking shows up, and on this page it is also where a
   master turns out to live inside a wrapper. Read the three calls as arithmetic before fetching a
   render (the enquiry form's rule, which has held for six sections).
3. `get_screenshot` on each node (`maxDimension` 1400–2000 for detail; the asset URL is
   **single-use — `curl` it in the very next call**, or it 404s), then load the
   `figma-design-to-code` skill and `get_design_context`. **`get_variable_defs` on all three
   nodes**, not just the desktop one: it resolves each master's mode, so every `size/…`,
   `border/…` and `radius/…` the emitted code prints as the desktop default comes back at its real
   value. One page's mode is not another's, so re-run it even on a component an earlier layout
   already fitted.
4. Implement as the `s.v3` branch of the section's component in `EncoreSection.jsx`, and take the
   category's `data.js` edit in the same change. Desktop numbers are the frame's × 0.82; the 768
   and 390 frames are verbatim, with no ramp. Follow the `v0`/`v1`/`v2` convention exactly — one
   branch for all five themes, decoration gated on `s.retro`, palette-derived values standing in
   for Retro's literal hexes.
5. Verify with the preview harness. It already takes any `arch`, so no harness change is needed —
   but the `data.js` edit has to land first or `arch=3` renders something else.

   ```
   cd source && npm run dev
   http://localhost:5173/preview.html?cat=bio&arch=3&w=desktop     # &w=tablet | mobile
   ```

   `arch=0…2` render the three signed-off layouts for comparison, `theme=1…4` checks the flat
   four, `n=8` fills the section's list-shaped content, `live=1` renders it as the published page
   does, and `&open=` / `&booked=` / `&since=` / `&tags=` / `&name=` reach the fields `n` cannot.
   Drive it with **chrome-devtools MCP** (`--isolated --viewport 1440x900`); compare **numbers,
   not screenshots**, via `getBoundingClientRect()`. A brace-depth walk of the diff is still the
   whole safety net for proving `v0`–`v2` untouched.
6. Commit, with the section named in the subject.
7. Flip the row's Status to `done <sha>`, add anything the next section needs to *Conventions*
   below, and commit that too.
8. **Stop there and hand off.** Do not start the next section in the same context. Say the section
   is closed, that this is the moment to `/clear`, and print the next section's opening prompt as
   a fenced block filled in ready to paste:

   ```
   Continue the Retro layout-4 pass with section N, `cat`.

   Read CLAUDE.md, then plans/retro/layout-4.md, then plans/retro/layout-3.md's and plans/retro/layout-2.md's
   Conventions sections, then the `figma-frame-reading` and `verifying-the-published-tab`
   memory notes, and follow the per-session procedure there.

   The three masters are `<desktop node>` (<W> × <H>), `<tablet node>` (768 × <H>) and
   `<mobile node>` (390 × <H>) in Figma file uFoUbPaBrDicjyuSBEbtGT. Fit all three as a
   new `s.v3` branch of `<Component>` in EncoreSection.jsx, and bump `NVAR.<cat>` from 3
   to 4 in the same commit.

   <the two or three conventions most likely to bite this section>

   Branch: retro-layout-4. Do not refresh the root index.html.
   ```

   **Three rows swap that `NVAR` line out.** `header` keeps `NVAR.header` 6 and instead renames
   `HEADER_NAMES[3]` and the four "Polaroid" references listed above; `tags` bumps `CATS` too;
   `video` takes open question 2's answer rather than a plain bump.

Do **not** run `npm run build:standalone` / refresh the root `index.html` per section — that is
one deliberate step at the end of the whole pass (`cp source/dist-standalone/index.html
index.html`), and layout 2's *Learned on the end-of-pass refresh* notes say how to check it.
Expect the two-build digest to come back at **zero rows**, as layout 3's did, and prove the new
work shipped by grepping the built file for a value only these branches emit.

*That step has now run — `9e0f726`.* The digest came back at zero rows **outside the rotating
seal**, which is a qualification layout 3's did not need; see *Learned on the end-of-pass sweep*
for that, for the Radix tablist that quietly defeats a synthetic click, and for the click that
proves the pass shipped better than any grep does.

Suggested order is the table's, which is the page's. The header first is deliberate for the third
pass running: it is the one section that is Retro-only (`HeaderV0`–`V5` never render for the flat
four, so it needs no `theme=1…4` check), it settles the refit-an-invented-slot pattern, and it is
the session that owes the narrow band table.

## Conventions

`layout-2.md`'s and `layout-3.md`'s bullets all still apply and are not repeated. This
list starts with what is known about *this* page before any section has been fitted; append to it
as the pass goes on.

- **Match on node id and width.** See *The Figma source* for this page's specific liars. The
  layout-3 pattern — "the columned instances are the ones called — Desktop at every width" — holds
  for `tags` and half-holds for `bio`, but the mobile media player, repertoire, wizard and
  calendar are all called "— Tablet", which is new.
- **Five of the twelve instances are 1440-wide bleeds** (`media`, `map`, `pricing`, `form` and
  `testimonials`, beside the header, which has always been one) where layout 3's columned five
  were 858. Their *content* sits
  inside the wrapper's own 56 padding — 1328 × 0.82 = 1089 against our 1052 content column — so
  the fill rule the bio settled for layout 3 applies to the inset, not to the sheet: **the
  section's sheet spans the canvas, the content fills 1052**, and which parts stretch is read off
  the master's emitted flex declarations rather than decided. `get_metadata` alone cannot tell a
  fill from a hug; run `get_design_context`.
- **Three instances are genuinely narrower than the column they sit in** and that is the design,
  not a crop: `tags` is 457 in a 664 column at desktop *and* 457 in a 708 one at tablet (it fills
  only at 390), and the gallery's spotlight is 874 of the page's 1440. Read the declarations
  before ramping either.
- **The count in a head is the frame's claim, not the artist's.** *"Six Worth Your Ears"* over a
  grid the seed fills with five, and the media player's own layout-3 head said five. Layout 2's
  "a frame's own copy can be a claim" — keep `TITLES.media`, draw one tile per track.
- **Two masters draw fewer of the artist's rows than the seed carries**, which is the audio
  player's stranding rule with the discriminator already written down: the pricing frame draws 2
  service rows against three seeded packages, and the testimonials wall draws 4 cards against
  three seeded reviews. One row per package, one card per review; the frame's count is its filler.
- **Four masters print numbers nothing in this file can know.** The video card's *"551 538 views ·
  02:05"*, the map dashboard's *RADIUS 120* and *"LIVE · LAST 12 MONTHS"*, and the calendar
  summary's *GUESTS / BUDGET / SOUND*. The video section's own rule (drop what the artist never
  typed) meets the booking calendar's (nothing reads the clock). What *is* derivable is named
  per-section in the open questions — do not invent a field to reach the rest.
- **The gallery's four media-source rows are `hidden="true"` in the wrapper at all three widths**,
  at identical coordinates (56 / 383, 608 × 383) — a leftover of the layout-1 composition this
  wrapper is a copy of. So layout 4's gallery is layout 1's spotlight with the rows replaced by a
  display head and the thumbnail rail stood **vertical**, which is a distinct design and not a
  duplicate. `youtube` / `instagram` / `tiktok` reach nothing again (layout 3's open question 11
  a second time), and their `FIELDS` hints already say "Layout 1 only", which stays true.
- **The narrow footers are different components** (*Component 3*, *Component 4*) where the desktop
  one is the familiar *Component 2*. Out of scope, recorded so nobody re-derives it.

Learned on the header (section 1):

- **The three "layouts 1, 2 and 3" documents were deliberately left alone, and should stay that
  way until the pass's last section.** `CLAUDE.md:86`, `README.md:150` and `data.js:188` all rest
  on *"layouts 1, 2 and 3 of every section are one Figma page each"* — the claim `pageLayout()`
  and the setup modal's page-wide write depend on. Until a **body** category is fitted at layout
  4 that claim is false at index 3: this session gave the header its layout-4 design, and every
  other category still folds `arch 3` onto an earlier one. Land all four edits (including
  `README.md:154`'s "three body designs") in one change at the end of the pass.
- **`get_metadata`'s x for a rotated group is wrong here by a constant 55px, at two widths, and
  the emitted `left` is right at all three.** The memory note says the metadata is in a rotated
  parent space and the emitted CSS is reliable; this page is the clearest confirmation yet — the
  seal's metadata x is 1280.17 / 625.38 / 307.35 where the *rendered* disc centres are 1308.9 /
  653.5 / 327 and the emitted `calc(83.33% + 25.09px)` / `calc(75% − 5.7px)` / `calc(100% −
  120px)` reproduce all three to within a pixel. Take the emitted `left`, then confirm with a PIL
  run-length scan over the disc's own colour — and scan for *any* non-photograph pixel, since a
  scan for the ground colour alone measures the gap between the seal's type rings, not the disc.
- **A section's whole nav can already be fitted by an earlier layout.** `NavBar` was written from
  HeaderV0's frame and *is* this one: 30/20/150/23 at 1440 are its 24/16/123/18 × 0.82, both
  narrow masters draw its burger-beside-the-pill arm at exactly its 23 and 10, and the rule ramps
  150/150/70 as it already does. The tags row's rule — grep first, count the disagreements —
  reaching a whole sub-component rather than a leaf. What reuse cost: the globe drawn cream where
  the frame sets #111111 (invisible on the photograph either way), and the rule in `T.tags[3]`
  against the frame's `sem/box/1`. Both were HeaderV0's calls, so taking them keeps one nav on
  the page rather than two that disagree.
- **`BookPill`'s automatic scale draws 20px type at 768 and needs `size` at every width — fourth
  sighting.** The events map, the booking calendar and the testimonials all wrote this down; here
  the 390 master adds a wrinkle, stating a **raw** 14.238 rather than that width's own
  `size/label-md` 13, because its whole pill is the desktop one at × 0.712 against BookPill's
  `small` × 0.62. Take the frame's raw number, not the token.
- **The page's own nav is longer than the frame's and the rule pays for it.** With nine section
  names the desktop left group shrinks its 123px rule to nothing — `NavBar`'s documented yield,
  and HeaderV0 already does the same, so it is an inherited diff rather than a new one. Both
  narrow arms keep the rule, because the burger frees the measure.
- **A `show…` key can be worth reading outside the component that owns it.** `TagChips` returns
  null when `showTags` is off, which in a `flex: 1 0 0` row would leave a 282px hole where the
  chip block stood. `sealGap`'s precedent: read the key beside the component and render neither.
- **`minHeight` beats `aspectRatio` + `maxHeight` for a stated-height bleed.** HeaderV0 clamps a
  ratio because the ratio is what it transcribes; where the master states a height outright the
  two are the same band at and past the canvas, and the floor lets a longer artist name grow the
  section where the clamp would crop it. The bleed itself is the repertoire's written-out margin
  (HeaderV2's spelling), so the root's `bleed` flag stays layout 1's for a third pass running.
- **A bleed hands the section the frame's own measure, for the second time.** The gallery wrote
  this down at layout 3; here the desktop panel comes back at 1088.2 against the frame's 1328 ×
  0.82 = 1089, and both narrow panels land on 708 and 350 exactly. Every section on this page
  whose frame paints its own ground gets the same for free.
- **Two type tokens this pass has not drawn before.** `size/display-xl` (128/77/**48** — and the
  390 value is *not* `s.dispXl`'s 77, where 1440 and 768 both are) and a kicker set in
  `Display/Title` rather than a label token. `size/list` goes back **up** at 390 (16 → 12 → 13)
  for the fourth time in the pass family.

Learned on the bio (section 2):

- **The olive band is a bleed, and the `tags` session inherits every number of it.** The band
  table's 900–1852 olive is the section's own sheet, painted the repertoire's way — a block
  carrying the root's padding back as a negative margin — with **no root flag touched**. The pair
  is `s.retro ? '#5B5E2E' : s.mapBg` for the ground and `s.retro ? '#FBF6EA' : s.mapFg` for the
  ink: `mapBg` is `deep` lifted 11% towards `paper`, which is the one token that is a *visible*
  dark band on all four flat palettes, where `deep` itself **is** the page ground on Lime and
  Grunge and would paint nothing. The insets are the frames' own — `calc(surplus + 46/30/10)`
  horizontally (56 × 0.82 at desktop) and **116/60/30** vertically, which is the one ramp on this
  page that is not monotonic-ish: 116 is the desktop band's vertical centring of a 720-tall
  two-column composition. **`tags` shares this band at all three widths and must take the same
  pair and the same horizontal inset**, or a layout-4 page shows olive, then beige, then olive at
  the seam. Two of the three vertical numbers are read off the Section wrappers (`964:72512` at
  1440, `964:76439` at 768, both symmetric); **the 390 bottom is inferred** — `971:14235` puts the
  head frame at y 30 and the band scan leaves ~41 below the instance, so 30 was taken as
  symmetric. One `get_metadata` on that head frame's parent settles it.
- **A stddev scan settled the whole of Retro's decoration in one call: there is none.** The sheet
  reads `#5B5E2E` at stddev 0 top and bottom, the olive beside the card is exactly the same value
  (so no shadow), and the frame draws no torn edge and no checkerboard. The branch has no
  `s.retro` gate at all beyond its four colour literals — the testimonials' layout-3 case, and it
  is worth running the scan before writing a single `Grain`.
- **Where a master lays a block out absolutely and its 390 sibling flows it, the 390 sibling is
  the design.** Both wide masters place the panel's head at `top-30` and its prose box at
  `top-139` inside a stated 305; the 390 master is a **different component** (`878:12228` against
  the wide pair's `432:244` — the metadata's instance-child id is the tell) authored as
  `flex-col gap-20 p-20`. Transcribing the absolutes would have pinned a 139 that is only right
  at one type size — it is 32 of gap at 1440 and 41.5 at 768, the same leak the bio's own layout-3
  head row met. Writing the flow at 30/30/20 lands within 2px of the 1440 master and is the only
  version that survives a second paragraph.
- **`sem/box/1` is `sem/bg` lifted 11% by `sem/text/2`, and the arithmetic is worth doing before
  reaching for a literal.** #6D7040 = 0.89 × #5B5E2E + 0.11 × #FBF6EA to the byte — the pricing
  deck's `tierHues().badge` relationship met again — so the prose box is the band **again**, with
  the lift as its own `opacity: .11` sheet. That is the file's sanctioned spelling for a
  translucent colour (there is no `rgba()` in `EncoreSection`), it is how Figma paints the 80%
  panel wash beside it, and it hands the flat four the same relationship with no `mix()`. **The
  box has to keep the opaque `background` underneath**: a column scan reads #6D7040 exactly where
  the panel next to it varies with the photograph, so the box hides the photo and the lift alone
  would not.
- **Display/XL's .75 leading is Retro-only, and this is the first branch outside the header to
  find out.** `headerFamily()` keeps `HeaderV3` to Retro, so the flat four had never seen it: at
  .75 a stacked line of caps collides outright in Titan One and Bebas Neue. They degrade to
  **.89**, the leading every other display head in this file already sets — the page's own ramp,
  not an invented number. A five-theme digest at `n=0` is what caught it; the colours it was run
  for were all fine.
- **`s.pillBg` is the mustard on every palette by construction and collapses into the cream on
  two.** Retro's lightest tag that is neither the page nor the accent **is** #D8A227, so the
  display head and the name need no literal (the testimonials' "reach for `pillBg` whenever a dark
  card needs a highlight"). On Lime and Grunge the lightest tag *is* the paper, so the head's
  two-tone flattens to one colour — legible, and the known cost the conventions already name
  twice.
- **A shared leaf can grow a prop for a glyph inside a link.** The frame writes the meta row's
  third item as "Listen ↗"; `ListenLink` renders `s.cta2` alone, so the arrow would have sat
  outside the anchor. `after` is additive (`Pager`'s `idle`, `BookPill`'s `glyph`), a
  `{undefined}` no-op for all four callers written before it. **That makes the bio the fifteenth
  reader of `s.live`**, so both enumerations moved in the same commit — `CLAUDE.md`'s list and
  `sectionVm`'s comment. A per-feature fact, unlike the deferred "layouts 1, 2 and 3" claim.
- **A stated text-node measure is worth transcribing where a stated *prose* measure is not.** The
  heading's 572.9 is on the text node at 1440 and 768 and is what hand-breaks it; the bio's own
  layout-3 note declined a `maxWidth` on the prose because the prose column states `flex: 1 0 0`
  and nothing else. Kept at both wide widths, dropped at 390 where the master states the full
  370 (the calendar's rule). What it then shows: **Fraunces is the wider face at body sizes and
  the narrower one at display-xl**, so every break falls a line later than the frame's — two
  lines at 1440 against its three, one at 768 and 390 against its two. The media player's
  per-token face factor, a third time.
- **`backdrop-filter` survives `ScaledPreview`, and it is the first branch in the pass to use
  one.** The panel's `blur(22.1px)` is the one compositor property no earlier branch draws, and a
  CSS `scale(0.33)` is where a filter can be dropped, drawn at the unscaled radius, or forced into
  a stacking context that escapes its parent's clip. Read off the open layout picker: the blur is
  applied, the panel's rect is inside the card's, the radius scales, and all six cards stay the
  same 248px `autoMax` height. Worth re-reading if another section takes one.
- **The brace-depth walk covers `EncoreSection.jsx` alone.** This commit touches three more files
  and each was read by hand: `EncoreBuilder.jsx` is one comment (the `s.live` enumeration),
  `data.js` is one digit and one hint, `CLAUDE.md` is the same enumeration. Say which files the
  walk covered, or the next session inherits a proof that looks complete and is not.
- **Name the fill's costs, again.** The card goes 664 × 720 → 1088 × 590, so `object-fit: cover`
  reframes the seeded portrait landscape and crops the head at desktop — the same thing layout 3's
  own 1052 × 311 photograph already does, and `Photo` has no `object-position`. The panel loses
  the frame's trailing air (305 stated against 281 content-tall at 1440, 299.5 at 768). And the
  390 meta row **wraps** with `since` filled, where the frame's three shorter strings fit its
  identical 310.

Learned on the tags row (section 3):

- **Two masters can be the same design and the fit still be a new branch — count what they
  disagree about, not what they share.** This instance is a *different* Figma component from
  layout 3's (`;690:34xx` against `;516:14xx`, the instance-child id again) and is numerically
  identical to it: same `body-lg` 16/15/15 head at 1.5, same 16 under it, same `label-xs`
  20/14/12 chips at 1.26, same `radius/chip` 8, same 8 gap both ways, same 5/11 padding, and
  `get_variable_defs` on all three masters returns layout 3's list token for token. The
  disagreements are **two, and both structural**: this one stands on the olive band, and its 390
  master hides the head. The media player's rule therefore said *write it again* — eight lines —
  where the same rule said *reuse* for `TagChips`, which is still shared. Writing it again is
  also what keeps v2 byte-identical for the brace-depth walk, which a widened `if (s.v2 ||
  s.v3)` would have destroyed for a saving of eight lines.
- **A narrow master can *hide* a node the wide ones draw, and `get_variable_defs` corroborates
  it for free.** The 390 head frame is `hidden="true"` and still carries the desktop component's
  1168 × 48; the 390 variable defs return neither `sem/text/1` nor `size/body-lg`, where both
  wider masters return both. That is the gallery's unhidden-node tell read the other way up —
  and the two sources agreeing is what makes it a design rather than a broken instance. A field
  can therefore reach two of three widths, which its hint now says.
- **The 390 band's bottom inset is 60, not the 30 the bio inferred — and it is declined at both
  sections.** `971:14234` is 871 tall with the bio instance ending at 811 (`30 + 205 + 40 + 536
  + 60`), and the same sum at 768 gives the band's 1161 as `60 + 297 + 24 + 720 + 60`. So the
  frame's own seam is 40 at 390 and 24 at 768, where two symmetric sheets give 60 and 120: the
  seam is not reproducible either way, which makes the *foot* the smaller of the two diffs and
  symmetry the property worth keeping — a section whose sheet is 30 at the head and 60 at the
  foot reads as a mistake the moment it is not followed by the other half, and either half can
  stand alone or be reordered. `630d7eb`'s "inherits whole" stands; this is the reading it
  asked for, recorded rather than applied.
- **Do not call `get_metadata` on a wrapper that parents a checkerboard strip.** `971:14234`
  came back with 128 tile children and cost ~200k tokens for four numbers. The narrow pages
  reparent both strips to the bio Section's foot and the video frame's head (the plan's own
  note, two paragraphs above the table) — so at 768 and 390 the bio/tags Section is exactly the
  wrapper to be careful with. Sum the band table against the instance heights instead, or query
  the *head* frame and derive the rest.
- **The seam has to be checked in the editor, not the harness.** `preview.html` renders one
  section, so two bleeds meeting is the one thing it cannot show. The flow is four
  `evaluate_script` calls: open the editor, pick **Stacked** in the setup modal, add a Tags
  section (`+ Add section` gives the first free category, which with `tags`/`audio`/`video`
  absent *is* `tags`), walk it up with the row's Move up, then read every `[--ac]` root's rect.
  Two facts fall out and both are page-wide: **every section root's `top` is the previous
  root's `bottom` to the tenth**, so two sheets that each cover their own root exactly must
  touch; and the bio's and the tags' sheets do (822→1838.1 and 1838.1→2091.7 at 1078). Worth
  re-running for any later section that bleeds.
- **`LayoutPicker` is a Radix `DropdownMenu` and a synthetic `pointerdown` will not open it.**
  Neither `.click()` nor a hand-built `PointerEvent` with `button: 0` did; `take_snapshot` +
  `click(uid)` — a **trusted** gesture — opened it first try, and the `[role=menuitem]` items
  then take the synthetic `pointerdown`/`pointerup`/`click` triple that the published-tab note
  already prescribes for a Radix `Select`. Add the trigger to that note's list.
- **`s.ac` on a dark sheet, with the frame itself setting a 1.41.** The head is `sem/text/1`,
  the rust, which is `s.ac` on every palette and needs no literal — and on the olive it is
  contrast **1.41**, which is the designer's choice and not a transcription slip. Run the five
  palettes before deciding whether to "fix" it: Lime 8.79, Editorial 3.85, Grunge 3.61 and Pop
  **1.50** — so the worst of the flat four is no worse than Retro's own, which is the cleanest
  argument this pass has had for keeping an accent the conventions twice warn about.
- **Retro's fourth tag IS the band, so one chip draws its box invisible** and only its cream
  label shows — in the frame as well as here, `contrast()` giving `vm.chips[].fg` the same cream
  by construction. Lime's third-tag-is-the-page-ground convention with the designer doing it on
  purpose, and the second reason (after the head's 1.41) this branch needs no correction it
  looks like it needs.
- **`TagChips`' `showTags` guard cannot fire on a tags section.** `showTags` is a
  `FIELDS.header` key and `cv('showTags', 'show')` has nothing to read on any other category, so
  the sheet can never render empty. Worth checking before wrapping a shared leaf in a sheet —
  `sealGap`'s read-the-key-beside-the-component rule, answered in the negative for once.
- **The width cost is the column's, not the design's.** 457 wraps six chips to two rows where
  our 1052 holds them on one; the row is `flex-wrap w-full` at every width and the 390 master
  wraps at 370 too, so there is nothing to reproduce. The chips' own 5/11 and 8 stay the
  component's unramped literals at desktop — layout 3's named reuse cost, unchanged.

Learned on the media player (section 4):

- **The media band's two checkerboard strips are this section's, and the video session must not
  draw one at its head.** The desktop band (`964:72520`) parents both, and the *render* puts them
  flush at its first and last row where `get_metadata` reports the first at y 22.6 — one column
  scan settles it. The narrow pages reparent them to the bio Section's foot and the video frame's
  head, which is the same two seams either side of the band, so drawing them at the head and the
  foot of the media sheet is the one placement that is right at all three widths whatever our page
  stacks around it. They are `Checkerboard` at HeaderV3's own `cell` (19.36 desktop / 23.61
  narrow — two rows of 11.8 squares, the tile being two squares wide) in the bio band's olive.
- **Add the band's inset and the instance's own padding before deciding anything about
  symmetry.** The bands give their head 132.4 / 50 / 60 of clear cream and their foot 76.4 / 0 /
  60, which looks like three disagreements; the instance then pads itself 56 / 56 / 10 *inside*
  that, so the sheet's real insets are 132.4 / 50 / 60 and 132.4 / 56 / 70 — near-symmetric at
  every width with nothing rounded to make it so, and the desktop sum lands the section on the
  frame's 1012 × 0.82 to the tenth. The tags row's take-the-head's-number rule was not needed
  here, and would have been wrong: it is the *sum* that is symmetric, not either term.
- **When nothing in a composition has an intrinsic height, the thing to state is the one whose
  ratio is a residue *and* whose count is the artist's.** Both columns here are `h-full` of a
  stated 671, the tiles are `1fr` rows of a `flex-[1_0_0]` grid and the sleeve is `flex-[1_0_0]`
  of its column — so the tile takes each master's own ratio (289.33/269.5, 136/139, 180/123.33,
  the gallery's rule) and the sleeve fills what the grid leaves, which is the masters' own
  declaration. The reference picture then holds at all three widths *because* five tiles wrap to
  the same rows as the frame's six.
- **Run a fill's arithmetic at the *low* count, not just the high one.** The obvious cost was the
  sleeve growing to 580 on a 252 column at `max: 8`; the real one was the other end — a 768 page's
  single tile row is 139 and the left column's fixed parts (40 + 40 + 48 + 11) are 139 exactly, so
  an artist with two singles would have published a 3px rust hairline where their artwork should
  be. That is the media player's own destroys-its-own-content rule, and it is not the pricing
  deck's mid-edit empty card: it is a real published page. The floor is the **390 master's own
  stated sleeve** (370 × 302) applied to the 308 column — cross-width borrowing, which the events
  map declined, taken here because every alternative is an invented number, and inert from four
  tracks up so the reference picture never sees it. It also carries the emptied-list state for
  free.
- **A frame's stated text measure can be inert at two widths and absent at the third.** The head's
  1019.18 is on the 1440 *and* 768 text nodes; at 768 the same string inks 655 in a 656 frame, so
  it wraps nothing, and the 390 master states a measure that breaks it in two. Declined, where the
  bio's 572.9 was kept — the discriminator is the booking calendar's: check whether the leak still
  *does* something at the narrow width. What our own head then does is the face factor a third
  time, in the opposite direction to the bio's: "Five worth your ear." in Fraunces at 40 fits the
  370 column on one line where the frame's longer string in Soulway takes two, so the 390 section
  stands 36px shorter than the band.
- **A mark that must survive the canvas is a seat, not a state.** The frame marks tile one and
  draws tile one's photograph as the sleeve, so the mark is `i === at` — which is 0 until the
  visitor picks and therefore the frame's own picture on the canvas — and never `chosen`. The
  media player's fan rule reaching a grid.
- **Mark a photographic tile with an inset shadow, and measure the photograph rather than the
  tile.** The first draft drew `border: 3px solid transparent` on the unmarked tiles so that
  picking one moved no geometry — and `inset: 0` resolves against the **padding** box, so all of
  them drew a 6px-smaller photograph at a 27px radius and the frame's gutter came out 6 wider
  (10 → **16** at 390, a 60% wider phone gutter). A `getBoundingClientRect` digest of the tile
  `div` cannot see it: it reads the frame's number and the `<img>` inside is the thing that
  moved (the repertoire's measure-the-card-not-the-seat lesson, at the level of a photograph).
  The events map's rule is the fix — a rule that does not grow its box is an inset `boxShadow` —
  and hanging it on the scrim overlay, which already paints over the photograph and under the
  label, is Figma's inside stroke exactly. Repeat the radius on that overlay, or the parent's
  clip squares the ring's inner corners. **Assert `img` rect == tile rect at all three widths**
  whenever a design layers type over a full-bleed photograph.
- **The section's live seam cost nothing.** `pick`, `goTo`, `toggle`, `now` and `audio` are all
  above the branch, so the whole of layout 4's playback is four `onClick`s; the only line outside
  the branch is `list`, widened to `|| s.v3` — a strict no-op while `NVAR.media` was 3, because
  `d` could never be 3. Both the comment above it and **CLAUDE.md's media paragraph quote that
  expression verbatim**, so all three moved together.
- **`NVAR` and `CATS.n` part company where `n` is already large.** `CATS.media.n` is 7, so no
  picker card appears — but cards 5, 6 and 7 now fold onto v0/v1/v2 where they used to fold onto
  v1/v2/v0. That is `arch % NVAR` working as documented (and it happened on the layout-3 bump
  too); the tags row's "no existing card moves" check is about the *list*, not about what each
  card renders.
- **Two glyphs the file cannot draw.** The frame's prev/next are a 16 × 8.4 double triangle with a
  bar; lucide's `SkipBack`/`SkipForward` are one triangle and a bar, taller than they are wide.
  Sized off their ink rather than their box (the audio player's rule) at `un(18)`, with the stroke
  left **on** — every earlier transport in this file passes `strokeWidth={0}`, which would drop
  the bar and leave a play triangle pointing backwards.

Learned on the video section (section 5):

- **An instance can clip its own component, and that is a *third* kind of narrow artefact
  beside the leaked number and the flattened raster.** The 768 instance is 708 × 402 — the
  page's number, and the same ~1.761 aspect the other two masters state — while the component
  inside it is `h-[567px] shrink-0`, so the instance's own `overflow-clip` cuts the head and
  foot bands away and its render is three discs on a photograph. `get_metadata` says it in one
  glance and it is the only place that does: **a child taller than its instance, at a negative
  `y`**. The media player's destroys-its-own-content rule then decides it in one step, because
  what the crop removes is the artist's name, the playhead and the running time. Check every
  narrow instance's child height against the instance's own before reading its render.
- **`use_figma` on the *head text node* is the cheapest call in the pass, and it answers two
  questions the arithmetic cannot.** One read — `getNodeByIdAsync` on the three instances, then
  each one's `parent` and `parent.children` — returned the head's `fontSize` (96/60/40 at
  leading .89, so this page's Display/LG ramp is *read* rather than inherited from the media
  session), its stated measure, the hidden `the`/`room.` leftovers, and the wrapper's own
  `itemSpacing`: **60 / 60 / 30**. The gap ramps, and the band arithmetic admitted both 60-with-
  small-insets and 40-with-large ones, so inferring it would have been wrong at 390. This is the
  tags row's query-the-head-never-the-strip-parenting-wrapper rule with the payoff named: do it
  for every remaining section whose head the page draws.
- **A frame's own token can be right in one place and wrong in another *within the same
  branch*, and the discriminator is what the element has to separate from.** `sem/text/1` is
  `s.ac` on every palette. The head keeps it (it stands on the page, Lime's acid green being the
  cost the conventions name twice) and so does the progress fill — but the transport **glyph**
  takes `paperFg` on the flat four, because it is a 15px stroke *inside* the cream disc with no
  ground of its own, which is exactly where the audio player's ▶ met this wall. The fill's half
  of that was found by rendering, not by reasoning: `paperFg` there is a near-black bar on a
  card whose own scrim is black, so the played portion vanished and **the bar read as filled
  from the right** on all four flat palettes. A five-theme *digest* would not have caught it —
  every value was legible against its stated neighbour; it took looking at Lime.
- **`Photo`'s `backdrop` is the answer whenever overlaid type has no scrim of its own.** The
  frame's gradient is transparent until 76.173%, so the head band's cream type sits directly on
  the poster — and on `sem/box/3` #CEB081 when there is none, which is 1.43 under Retro and
  invisible on Lime. `backdrop` is documented for precisely this ("a dark panel rather than a
  giant set of initials, so the overlaid type still reads"), it makes the frame's own box/3
  literal unnecessary, and it is what the flat four render at every width since Retro is the
  only theme that seeds this photograph.
- **A glyph the file cannot draw can be scaled off a *sibling frame's* answer.** The prev/next
  mark is 13.022 × 6.819 here against the media player's layout-4 16 × 8.4 — the same aspect at
  0.813 — so it is that branch's `un(18)` at 0.813, traceable rather than re-derived, with the
  stroke left on for the reason written there. The pause mark needed no judgement at all: 8.372
  wide and 11.189 tall are lucide's own 12 × 16 of 24 at **16.75 and 16.78**, two readings
  agreeing to a hundredth, which is the strongest an icon size has been pinned in this pass.
- **The head's stated measure was inert at all three widths, which is three noes in a row.**
  1019.18 is the string's own ink at 1440, that same leaked number overflowing a 708 frame and
  wrapping nothing at 768, and replaced by the full 370 column at 390. The booking calendar's
  check-whether-the-leak-*does*-anything rule; the media player declined the identical number on
  the identical component one section earlier.
- **The whole branch is one `z`, one type table, one colour block and three absolutely-
  positioned bands.** No state, no handler, no decoration, no `s.retro` gate beyond four colour
  literals, and **five** width tests outside `u()`'s `z` — all of them `s.mob`, none `desk` or
  `tab`: the three insets (24/24/10, 20/20/10, 16/16/10), the `aspectRatio` and the head gap.
  The card is an aspect box, so filling 1052 costs it nothing but height — 597
  against the frame's ramped 618 — and there is nothing in the composition that could have given
  anything back.
- **`arch`-level proof beats an argument about `arch`.** The hand-fold's no-op claim is exactly
  the kind of thing a comment usually asserts; here `git stash` + a nine-cell digest
  (`arch=0,1,2` × three widths) returned IDENTICAL on all nine, which covers the widened test,
  the `NVAR` bump and the `CATS` bump at once. Two navigations. Run it for any category whose
  fold changes.

Learned on the gallery (section 6):

- **`get_variable_defs` can be wrong, and the node's own `fills` is what settles it.** All three
  masters answer `sem/bg` = `#d8a227`; all three instances' `fills` is `#5B5E2E`, the olive the
  render plainly shows. Every *other* entry in that seven-item list is right (`sem/text/1` is the
  mustard, `sem/text/3` the #111 mount, `sem/box/3` the #C08A0F disc). The memory note's "call
  `get_variable_defs` first and measure only to confirm" still stands — but **read the fill through
  one `use_figma` before painting a ground with a token**, because the one entry that lied is the
  section's whole sheet. The same call is the cheapest reading there is of a rotated card: it
  returns `rotation` outright (2, which is CSS `-2`) beside the padding, radius and effects.
- **An effect style resolves its variables in the *style's* mode, not the node's.** "Retro/Poster"
  is `DROP_SHADOW … color: sem/text/1`, and the node's `sem/text/1` is the mustard while the
  rendered shadow is the rust `#C8461C`. So the disc's ring and its offset block are two different
  colours from one token name, and a pixel sample of the render is the only source that says so.
- **This component carries no `size/` or `radius/` token at all**, which `get_variable_defs`
  says by returning nothing but colours and effects at all three widths. Every box is therefore a
  raw number and identical at all three: 121.028 rail, 67.748 thumbnail, 55.514 disc, 50 between
  the halves, 25/30/20 radii, 12 and 10 gaps, 4 ring, 20 mount. What ramps is the type alone
  (eyebrow 15/12/11, head 96/60/40), read off the text nodes rather than the tokens.
- **Δbbox over a padding is one equation for a rotation angle.** Frame 183's metadata gives a
  609.248 × 554.299 box whose 20-padded child is 567.877 × 512.928; both differences are 41.3716,
  which is `40 (cos θ + sin θ)` and gives θ = 2° in one line — and the two simultaneous equations
  then give the true 590.97 × 534. Worth doing before fetching anything: it is what told the
  session the spotlight is a *rotated card* rather than an oddly-sized frame.
- **A rail's width can be its own control row's sum, and that is why it does not ramp.** 121.028 is
  55.514 × 2 + 10 exactly — two arrow discs and their gap — and the thumbnails take `w-full` of it.
  So the one number the whole right column is built from is a consequence of the arrows, which is
  also why both narrow masters keep it verbatim.
- **A frame that rings every row of a list is not marking one.** All six thumbnails carry the
  identical 4px mustard ring (a pixel sample of all six, not an eyeball), and the spotlight
  photograph *is* thumbnail 4 — which is `galActive()`'s slot 3 exactly. So the composition's own
  answer to "which one am I on" is the big picture, and adding a mark would have been inventing a
  state (the booking calendar's rule). **Sample every row's ring before concluding a design has no
  selected state — and then check whether the frame answers the question another way.**
- **A plain `border` is right where the media player's layout-4 tile needed an inset ring, and the
  discriminator is whether *every* cell carries it.** Figma strokes this frame inside its stated
  121.028 (a 390 row scan reads 4 / 113 / 4), so `border-box` reproduces it to the pixel; the media
  player's case only needed the ring because the *unmarked* tiles would otherwise have had to carry
  a transparent one.
- **Seven `flex: 1 0 0` items with a 4px border overflow their column by 56px.** The testimonials'
  and the enquiry form's basis lesson, at a count where it is fatal rather than cosmetic: a
  zero-basis item's border is added *after* its share. `gridTemplateRows: repeat(7, minmax(0, 1fr))
  auto` divides the same stated height and lets `border-box` do its job. **Reach for a grid the
  moment a divided track carries a border or a padding.**
- **A frame's own clip can hide the slot its own spotlight is showing.** The 390 strip is six
  `shrink-0 w-[121.028px]` tiles at gap 0 inside a 370 frame — three and a sliver — and its
  spotlight is thumbnail 4, off-page. That is the media player's destroys-its-own-content rule with
  the proof inside a single master, so the three visible tiles became a sliding window on layout
  1's own formula. **It is not `s.live`-gated**, and that is the point: gating it to keep the canvas
  on slots 0–2 would have broken "the published first paint is the canvas's picture", which is the
  one invariant every live seam in this file is built on. The canvas opens on slots 1–3 instead —
  an intended diff, and the better half of it.
- **Filling 1052 costs this section its aspect, and the frame's stated height is why.** 534 is
  stated on the row at 1440 *and* 768 (two very different content widths, so it is a design and not
  a residue — the events map's quarter-pixel test, passed the other way), so the desktop spotlight
  goes 590.97 × 534 → 947.8 × 437.9 and `cover` reframes the seeded photograph. Both narrow cards
  land on their masters' numbers exactly, the bleed handing the section 708 and 370 — **so the
  tablet render is the one to compare against Figma, and the desktop one will look wrong beside
  it.** The bio's layout-4 card made the same trade; naming it is the rule, and the next section
  whose frame states a height at two widths should expect the same.
- **A dark card cannot stay dark on this band, and the inversion costs one state.** `sem/text/3`
  #111 is a 16px mount that *is* the card, and the flat four cannot take `s.deep` — `deep` IS the
  page ground on Lime and Grunge while the sheet is `mapBg`, `deep` lifted 11%, so the mount would
  sit at contrast 1.4. They take the band's own ink instead (a light mount on a dark band). What
  that costs: `mapFg` **is** `paper`, so on the flat four the mount and the photograph's own cream
  backing are one colour and an *empty* slot draws no frame. Only ever seen mid-edit or on a theme
  Retro does not seed; with a photograph in it the mount reads. The bio's `edge`/`under` got away
  with `s.deep` because its card is a photograph and the edge a hairline — **re-ask `deep` whenever
  the dark thing is a block rather than a line.**
- **A wrapper's horizontal gutter is the vertical one once the page stops columning.** The desktop
  wrapper puts Frame 182 beside the instance at `itemSpacing: 0`, so the only gutter it states is
  each block's own 56 padding — 112 in all. At 768 and 390 the same sum is genuinely vertical (30 +
  30, 0 + 24), which is what makes 112 a reading rather than an invention. The band's insets fall
  out of the same sum: 100 + 56 / 100 + 30 / 60 + 0 above the eyebrow, and the instance's own 56 /
  30 / 40 below the row.
- **The torn edge is the band's, and `bleed={false}` is what a sheet that already bleeds wants.**
  `TornEdge`'s `bleed` pulls the strip out by the *root's* padding, which this sheet has already
  cancelled with a negative margin — so the strip wants the sheet's own edges, and the sheet needs
  `position: relative`, which the bio's did not. Its default `colour` is `s.bg`, which is the Figma
  vector's own fill (#EAD7B8) exactly. The vector is 1554 × 580.99 at all three widths and only its
  parent's padding moves, so what ramps is the *visible* 46.32 / 46.32 / 36.32, taken through `u()`
  the testimonials' way.
- **The repertoire (section 7) inherits this band.** Olive at all three widths, the same pair, the
  same `calc(surplus + 56/30/10)` horizontal inset — and it owns the **torn foot** (~5647 on the
  1440 page) where this section owns the head. The seam between them is this section's 56 / 30 / 40
  foot inset plus whatever the repertoire's head comes to; the tags row's editor check
  (`+ Add section`, walk it up, read every `[--ac]` root's rect) is how to see two bleeds meet,
  since `preview.html` renders one section.

Learned on the repertoire (section 7):

- **Walk `inst.parent` all the way to the Section and read every level's `fills` before deciding
  what the sheet is.** This plan's page tree lists the head and the instance as children of
  Section `964:72817`; there is a **Frame between them** (`964:72818` / `964:76745` /
  `977:8162`) that paints its own **#6D7040 at radius 60** with 60 / 50 / 40-30 of padding, and
  it is the block the whole design stands on. `get_metadata` on the instance cannot see it —
  the instance's `x`/`y` are relative to it and look like a plain inset — and `get_design_context`
  stops at the instance. The one call that says so is the same `use_figma` read the gallery
  prescribed for fills, extended one level up; **do it for the five sections left**, because a
  wrapper that paints is a wrapper the fit has to draw. It is also the gallery's
  fills-versus-token lesson from the other side: `get_variable_defs` binds this fill to **no
  token at all**, so there was never anything to resolve and the node is the only source.
- **A Section that states its own padding costs nothing to transcribe.** Where the gallery had to
  sum the band's inset out of two blocks' own paddings, this one answers outright — 100 / 100 /
  30 above, 150 / 150 / 60 below (the tear lives inside that), **56 / 30 / 10 either side, which
  is the gallery's own horizontal pair**. So the two sheets line up down the page, and the editor
  check confirms it: gallery root 2604.6→3423.8, repertoire root 3423.8→4697.4, both sheets
  covering their own root exactly and meeting at **gap 0**. The `+ Add section` walk was not
  needed — the setup modal's Stacked card already puts every section at `arch 3`.
- **Reaching the editor with every section at `arch 3` is two clicks, and matching the card by
  its text is what fails.** The template stage's card is
  `button[aria-label^="Open the editor"]` and takes a plain `.click()`; the setup modal's
  Stacked card is `[role=dialog] button` **index 3** and takes one too (the snapshot then reads
  `pressed` and "Stacked selected · 6 layouts for Retro"). What does not work is finding either
  by `textContent` — every card contains a whole rendered page preview, so a search for
  "Stacked" matches a preview's own copy first and the click lands on nothing. *Use this header*
  was driven with `take_snapshot` + `click(uid)` here and **not** tested synthetically; the
  `verifying-the-published-tab` note records a plain `.click()` working on it, so prefer that
  and keep the trusted click as the fallback.
- **Two masters can bind two different *tokens* for the same rule, and that is a design.** The
  desktop lh/row strokes are `sem/stroke/2` #D8A227; both narrow masters' are `sem/stroke/1`
  #111111 — corroborated by `get_variable_defs` naming a different key *and* by the node's own
  stroke hex, which is a stronger pair than a mode difference would give. Transcribed. What
  decided the flat four against it is the tags row's run-the-five-palettes test **failing** for
  once: Retro's ink rule reads at 3.63 on its own panel where Lime, Grunge, Editorial and Pop
  come back at 1.43–1.90, against the mustard's own 3.75–12.27. So the ramp is Retro's alone
  (`desk || !s.retro ? mustard : s.deep`, and `s.deep` **is** #111111 under Retro, so it costs no
  literal). **Run that test in both directions** — it has now argued for keeping an accent the
  conventions warn about and against keeping one they would have waved through.
- **A panel one register off its band is `mix(band, cream, 0.11)`, which is `mapBg`'s own
  formula applied twice.** Retro's #6D7040 on #5B5E2E is contrast **1.31**; the derivation lands
  the flat four at 1.20–1.41, the same register by construction. It went in as `vm.repPanel`
  rather than into the branch because `EncoreSection` does no colour maths — the one line of this
  fit that had to leave the file.
- **A frame's `sticky` is evidence *and* a declaration, and the leak rule does not reach it.**
  The desktop rail carries `sticky top-0`. Its being inert in Figma is the *canvas's*
  `overflow-clip`, not a design decision — so the booking calendar's
  check-whether-the-leak-*does*-anything rule, which was written for leaked **numbers**, is the
  wrong test. The first draft declined it and that was a mistake caught before the hand-off: the
  sticky is the half of the design that makes the jump usable, because a rail that scrolls away
  on the first jump cannot take a second. Taken at **desktop only**, where the rail is a column
  of its own; at 768 and 390 it is a full-width block above the list with **no ground of its
  own** (the frames give it none), so sticking it would smear twenty-six letters over the
  scrolling songs — the media player's destroys-its-own-content rule — and what that costs is
  named rather than fixed. Nothing moves on the canvas either way: a sticky box at scroll 0 is
  where a static one is, and the editor's canvas pane is an `overflow: hidden` ancestor, so the
  rail is inert there by construction. The published tab is the opposite — `PublishedPage`
  mounts sections straight into `#root`, `dressPublishedWindow`'s reset sets no `overflow` and
  the section root sets none, so the chain is clean and `live=1` in the harness pins the rail at
  viewport top 0 after a jump. **Read the whole ancestor chain's `overflow` before shipping a
  `sticky`, and read it in all three documents** — canvas, harness and popup are three different
  chains.
- **The sticky is also what settled the rail's verb.** A sticky rail only pays off beside a list
  that scrolls past it, which with the design's own name ("A-Z index rail") and twenty-six
  letters over a list of three settles open question 7 as a **jump** and not a filter. A filter
  would also have made the frame's own "All songs · A–Z" sub a lie the moment it was used.
- **This file can scroll, and it needs neither an effect nor the published tab's listener.**
  `scrollIntoView` off a **callback ref** (`useRef({})` keyed by letter — an `id` would collide
  across the dozen previews `LayoutPicker` mounts, `vm.anchor`'s own rule) is the second thing in
  `EncoreSection` to hold a ref, after the media player's `<audio>`, and for the same reason: a
  node to command rather than describe. `behavior` is left at the instant default — the header's
  nav reads `prefers-reduced-motion` off the popup's own `win`, which this file has no handle on.
  React batches the `setState`, so **a harness check that clicks and reads the mark in the same
  `evaluate_script` reads it stale**; await a tick.
- **A mark can be a seat over a *derived* list.** `alpha` starts empty and the lit letter falls
  back to `repGroups[0].letter`, which on the seeded page is the D the frame lights — so the
  canvas and the published first paint are one picture, with no `-1` sentinel needed on a value
  that is a string. Clamped against the groups (`letters.has(alpha)`) for pricing's reason: the
  artist can delete the last song a letter had while the published tab is open.
- **The rail's 26 cells and their wrap are the masters' own widths, not a count.** 32 × 32 at
  gap 8 at **all three** widths (`radius/chip` 8 and `border/hairline` 1 likewise), so six fit
  the desktop rail's stated 232 — which is exactly `6 × 32 + 5 × 8` — fifteen fit 608 and seven
  fit 310, and a plain `flex-wrap` reproduces all three without counting anything. The gallery's
  rail-width-is-its-own-control-row reading, one section later.
- **A letter no song starts with gets no handler, and that is the whole of the difference.** The
  frame draws all twenty-six alike, so nothing is dimmed; the cursor is read off the handler (the
  calendar's rule), which is what keeps an index rail from stranding a visitor on an empty group.
  A title starting with a digit or a symbol heads its own `#` group in the list and lights
  nothing — the rail is a fixed A–Z that no content can extend. An **accent is decomposed**
  before the initial is taken, so "Édith Piaf" files under E: `'É'.toUpperCase()` is `'É'`, and
  the grouping has to agree with the sort, which folds the two at `sensitivity: 'base'`.
- **`s.title` again, and for layout 2's reason.** Open question 8 is settled the way layout 2
  settled it: the display line is the heading field, the frame's "Repertoire" would leave that
  field editing nothing, and "12 Songs" on the seed is a diff this section already carries. The
  sub is the literal. **Three of four layouts now honour `heading` as the display line**, which
  is the discriminator the question asked for.

Learned on the events map (section 8):

- **A bleed that paints the page colour is not a bleed, and one `use_figma` read of the fill
  settles it before any sheet is written.** The instance's own fill is `#EAD7B8` at all three
  widths, and so is its wrapper's (Frame 319) and the page's — so this 1440-wide instance stands
  on the page ground *inside* the root's padding and there is nothing to paint. That is the
  enquiry form's layout-3 case rather than the gallery's sheet, and it is the fourth reading in
  a row where **the node's own `fills` was the only trustworthy source**: `get_variable_defs`
  answered `sem/bg` = `#5b5e2e` here, which is the *map plate's* colour, not the section's. The
  same call also closed the stat cell's padding question for free (`paddingTop: 18`,
  `strokeAlign: INSIDE`), which is the repertoire's `calc(padding − border)` for the sixth time.
- **A `bg-[var(--token, #hex)]` pair can have the *fallback* right and the token wrong, in the
  same frame where the reverse is true one line up.** The four stat cards all emit
  `bg-[var(--sem/box/1, …)]` with four different fallbacks (#df5b30 / #fffefb / #6d7040 /
  #e8b33b) — the render matches all four — while the card around them emits the same token with
  `#faecd5` and *that* is right too, against a `get_variable_defs` that resolves `sem/box/1` to
  #df5b30. So the emitted fallback is the instance's hand-set value and the token is the
  component default; a five-point pixel sample of the render is what decides which is which,
  and it costs one `python3` call.
- **Read a wrapper's `layoutSizing*`, not just its stated height, before transcribing one.**
  Both narrow map viewports come back `layoutSizingVertical: FILL` with a stated 320 / 278 —
  which is a *residue* of the instance's own 870 / 680, not a design. Every height in this
  master is one (card `flex-[1_0_0]` of the section, grid `flex-[1_0_0]` of the panel, cells
  `1fr` rows of the grid), and what decides which of them is still worth transcribing is
  **whether the frame itself shows the box hugging**: the 390 master's two grid rows are 100 and
  **120**, the second grown by BASE's value wrapping to two lines. So the cell took a
  `minHeight` of each master's own number and everything else was left derived — and the
  desktop sum is the check that it was transcription: 23 + 9.8 + 16.4 + (2 × 186.6 + 9.8) + 23 =
  **455.2**, the frame's 555 × 0.82 to the tenth, with the rendered card landing on 457. What
  the hug then costs is that it **inverts which 390 row grows**: ours are 136 / 100 against the
  master's 100 / 120, because our COVERAGE card's two-line sub (`mapTerms`) outgrows the frame's
  one-line "miles · standard" while our BASE value still fits. That is the mechanism working,
  not a slip — but it is the one place the phone's picture parts company with the master.
- **Two `flex-[1_0_0]` halves where one carries padding *and* a rule is the enquiry form's
  lesson at its plainest.** Written as `minmax(0, 1fr)` grid columns from the start, so the
  panel's 32/28 inset and its 1px divider cannot take the map's share. The divider itself is
  **desktop-only** — a column scan of both narrow renders shows the map running straight into
  the cream with no line at all — and its width comes out of the padding beside it.
- **A gap can be invisible and still be the design.** The 768 card puts 32 between the map and
  the stat panel and the 390 card puts 0; both are cream-on-cream, so the render shows nothing
  either way and only the metadata's y arithmetic (320 + 32 + 379 = 731) says so. Worth summing
  even where the picture cannot disagree with you.
- **The cheapest live seam in the pass, and it closed an invariant rather than opening one.**
  The ticker is this section's pager at `perPage` 1, so `page` is the whole state, `sel` reaches
  nothing, and the never-light-a-dot-twice rule holds by construction — where layout 3's filter
  had to have its counter-example written into the branch. The five dots are `vm.pins`' own
  seats and the gig on show lights the one `sectionVm` paired it with **by identity**
  (`vm.gigs[].pin` and `vm.pins` are the same five objects), which is zero maths in the file.
  **The frame's own five dots are absolute pixels leaked to all three masters** — 450 and 380 in
  a 370-wide viewport at 390 — so taking the section's percentages fixes the master's bug and
  keeps layout 1's vocabulary at the same time.
- **Wrap the arrows with the modulo on the *read*, not the click.** `((page % n) + n) % n` wraps
  both ways and survives the artist deleting gigs under an open published tab, which every
  other layout here writes out as a separate clamp. One expression instead of two.
- **When a frame's control has nothing behind it, check whether its *seat* has.** The ticker's
  `×` is a dismiss with no state to dismiss — but it stands opposite a `‹`, so the honest move
  was not to drop it but to make it the `›` that completes the pair. Contrast the zoom controls,
  which stand alone and simply went.
- **"Next:" is a claim a pager falsifies.** On page 3 the gig on show is not the next one, so
  the prefix went and the venue stands alone. The same family as the clock claims, one step
  subtler — it is the *control* that makes the label false, not the calendar.
- **Two stuttering labels, two different answers, and saying so is the point.** `FIELDS.map`'s
  own names are what broke the tie: `radius` is called "Coverage badge", so RADIUS over "12 mile
  radius" became COVERAGE and the label survived; `base` is called "Based in", which is the
  stutter itself, so BASE over "Based in Manchester" lost its label and the card is the value
  alone. **Look at the field's `l` before dropping its frame label** — and write the asymmetry
  down, or the next session evens them up.
- **`pillBg` collapsing onto `paper` is now a *pair* of seats, not one, and the outline is what
  parts them.** On Lime and Grunge seat 4's `pillBg` and seat 2's `paper` are the same value, so
  two of four cards would have been the identical box. Keeping seat 4's outline back to `s.ac`
  where seat 2's is `deep` costs one token and nothing on Retro. The conventions' thrice-named
  collapse, met at the first count where it is fatal rather than cosmetic.
- **Layout 3's plate, raster treatment and marker transcribe straight across, and the
  arithmetic says why.** A column scan of this map's ground reads (41, 42, 28) — layout 3's
  `#292A1C` to the byte — and layout 3's `invert(1) grayscale(1) contrast(1.6)` at opacity .26
  over it computes to (84, 85) against this master's measured road value of (91, 94). So the
  one place this branch reuses another's spelling wholesale is the one place a pixel sample
  proves it is the same picture, not a near miss.

Learned on the pricing section (section 9):

- **A frame can draw one list twice, and the tell that it is two fields is which row *omits*
  one.** The service rows carry a small hairline chip row and a big coloured one; row 2's four
  chips and its four pills are the **same four strings** in two orders, which reads as a
  duplicate — but row 1 has no chip row *and the frame it would stand in is absent from the
  component*, not `hidden`. An element that is optional by structure is an element with its own
  content, so the two rows took `tags` and `feats`. The count corroborates it: our packages carry
  1–3 tags and 4–5 features against the frame's four labels, so the other reading would have
  drawn the seeded first row as a single chip. Written down as reversible (layout 2's
  dropped-verbatim rule), because the hues give evidence both ways — they are the *tag* scheme's
  four, assigned by each label's place in the **chip** list and then reordered in the pill row.
- **An emitted colour literal can be a leak from another template, and the way to tell is to
  name it.** The chips' `rgba(242,255,208,.15)` is **#F2FFD0 — Lime's text colour** — at 15% over
  a beige, which measures (235,221,188) against the ground's (234,215,184): a border that is not
  there. `border/hairline` and `radius/pill` beside it are real tokens and were taken; the colour
  became `s.line`. The gallery's fill-versus-token lesson at the level of a single rgba.
- **Reuse a *seat* the way the last layout reused a colour.** The frame's `sem/stroke/2` rule is
  #5B5E2E, which is `vm.tierRow.card` exactly — layout 3's own walk for "the first palette tag
  that clears 0.22 against the page ground". A 4px rule and a stack's outline have the same job,
  so the seat was taken rather than a second derivation written. Zero new view-model, and Pop's
  teal is the only palette where the pair is a colour difference rather than a contrast one
  (1.69), which a 4px band carries and a hairline would not.
- **Bleed the border, not the block.** This instance paints no sheet (root fill = `sem/bg` = the
  page beige, the events map's case, stddev 0 over the ground), so there was nothing to stand out
  to the page edges except the one rule the frame runs full width. The row cancels `s.padX` and
  puts the **identical value** straight back as its own padding — not the frame's 46/30/10 — so
  the content column stays the page's 1052/688/346 and only the border reaches the edge. Checked
  in the editor as well as the harness: the rules span each `[--ac]` root exactly and
  `document.documentElement.scrollWidth` does not move.
- **A hug that the frame's own content made uniform.** Both of the frame's price columns come out
  at 186 because each one's price is narrower than its pill; ours are not — "BOOK NOW" is a
  shorter pill than "Star Enquiry" and a four-figure price a wider numeral — so a plain hug
  stepped the right column left on exactly the rows with the biggest numbers. The frame's own 186
  went in as a `minWidth`, which is the width it drew both rows at and still lets a longer price
  grow. **Read a hug's number at more than one row before transcribing the hug.**
- **The section's outer air is the root's padding *plus* the frame's own.** This instance has no
  band around it — it is a direct child of the page frame with `py-48/30/30` on each row — so the
  top and bottom rows sit at root `padY` (80/56/44) plus their own. Transcribed rather than
  special-cased: every row keeps its padding, so the rule's rhythm is the frame's and a deleted
  or added package cannot break the composition. The events map (section 8) kept root `padY` on
  the page ground too, which is what makes the two neighbours consistent.
- **`labelStyle` is where a moved field gets its casing.** `vm.tierKind` is composed in
  `sectionVm` (the slash) and upper-cased by the label face, so nothing in the branch transforms
  a string. Its sibling `tagLabels` had to be composed there for the opposite reason — `t.tags`
  is deliberately raw so a chip can match the tag it was derived from, and printing it would have
  read "Solo" on an upper-case theme where `vm.tierChips` reads "SOLO".
- **The `Frame 46` chip is the tags row's chip, and the tags row's own layout-4 branch says so.**
  `Label/XS` in the body face at 11/5 on a `radius/chip` 8 is exactly what `Tags`' `v3` passes
  TagChips (`radius={u(8)} size={u(T.chip)}`, 20/14/12). Written again rather than routed through
  it: TagChips is hardwired to `s.chips` *and* guarded on `showTags`, a header key with no
  business gating a package's features — three disagreements, so the media player's write-it-again
  rule rather than the tags row's reuse one.

Learned on the booking calendar (section 10):

- **Before deciding a frame draws another section's content, grep the seed constants'
  comments for the frame's own words.** Open question 5 had this master down as the enquiry
  wizard's output and its "Live band — full / 5-piece + DJ" row as a pricing package; the
  sentence that overturns both is in `data.js`, where `CAL_SLOTS` says a slot is *"a date,
  what the artist plays that night, and what it starts from"*. Three phrases, three seats.
  The section's own list had simply not been read, because the question was written from the
  Figma tree. **That is the cheapest check in the pass and it turned a decline into a fit** —
  and it generalises: the seeds were written in the row shape a repeater edits *and* with a
  sentence saying what each column is for, so they are a content dictionary as well as data.
- **Two adjacent frames that are structurally identical are one repeating element, whatever
  their copy says.** The date row and the package row disagree about everything visible —
  one holds a date and a time, the other a name and a link — and agree about every number:
  same 81 height, same `SPACE_BETWEEN` shell, same 18/24 padding, same display-over-sub left
  block. The pricing deck's rule was *which row omits something*; this is its complement,
  **which two rows omit nothing and measure the same**. The frame's count is its filler for
  the fourth time in this pass (2 rows against 4 seeded slots).
- **A fourth layout can share a third seam rather than growing one, and the saving is the
  whole branch.** `want` / `hit` / `cur` are copied from v1 unchanged, `sel` and `mi` are
  already above the layout branch, and the entire live surface of this design is **one
  `onClick` per row**. The events map's featured-panel rule came with its consequence
  attached — the featured row leaves the list, so `sel` is **picked, not toggled**, and there
  is nothing to toggle back to. Worth reaching for whenever a new layout's control is a list
  the section already resolves.
- **A frame that styles one cell of a grid differently is making a headline, and it is worth
  checking all three masters before normalising it.** `GUESTS` is Display/Title 24 where
  `SET LENGTH`, `BUDGET` and `SOUND` are Body/Chip 12 — which reads as an authoring slip
  until the 768 and 390 masters do the same thing. Present at three widths is a design (the
  gallery's sample-every-row rule, the other way up), and what it is *for* decided the
  content: a big first fact with three footnotes is exactly the shape of the composed enquiry
  line taken apart, so the date took the display cell.
- **Bind a dark card to `tx`, not `deep`, when the palette has to survive both directions.**
  The frame's card fill is `sem/text/2` — the *text* token, not a box one — and reading it
  that way is what makes the flat four work. `deep` IS the page ground on Lime and Grunge,
  and here it would also have collided with the panel (`edge` #323628 against `mapBg`
  #2D3124, contrast 1.03, which is the gallery's warning arriving through a second door).
  `tx` against `bg` is the palette's own guaranteed pair and measures 10.3 / 11.8 / 16.1 /
  12.4 / 5.0 against the panel. **Re-ask which token a fill is bound to before deriving one.**
- **The cost of that is named rather than fixed: on Lime and Grunge the card and the rows are
  one colour.** Both `tx` and `paper` resolve to the palette's lightest value on a dark
  palette, so the design's three-level tonal stack (page → panel → dark card over light rows)
  flattens to two. It stays legible — the card is taller, carries the name, the disc and four
  stats, and the rows keep a hairline the card does not — and the events map's
  *the-outline-is-what-parts-them* fix is therefore already in place by construction. Every
  alternative tried was worse: `paperFg` is a near-black on **all five**, which collides with
  the panel on the same two palettes from the other side, and `pillBg` collapses onto `paper`
  there as the conventions have warned three times.
- **A wrapper that paints is the fit's even when it wraps two instances.** Frame 324 is
  `sem/box/2` at radius 60 and holds the *Book Us* head beside both halves of the block; the
  repertoire's rule said to walk `inst.parent` and read every level's `fills`, and the reason
  to take it here rather than call it the page's composition is the head — allocated to this
  section by the plan, and inside the panel at all three widths, so drawing one without the
  other stands the head on a ground no master shows. Its ramp (60/60/30 vertical, 60/50/10
  horizontal, radius halving at 390, gap 50/50/20) is the **only** hand-ramped thing in the
  branch; the instance itself is one `z` and one type table with no width test.
- **A pure-insertion diff is a stronger proof than the brace-depth walk.** `git diff
  --unified=0` on `EncoreSection.jsx` reports one hunk, `@@ -9059,0 +9060,286 @@`, with zero
  deletions — so v0, v1 and v2 are byte-identical by construction and the walk had nothing to
  do. Worth running first for any fit that is a new branch rather than an edit. The other two
  files were read by hand (the bio's rule): `EncoreBuilder.jsx` is `vm.calTime` and one
  comment, `data.js` one digit, two hints and two comments.
- **The nine-cell `arch` digest has a known floor, and it is the seal.** Seven of nine cells
  matched exactly across a `git stash`; `arch=0` at desktop and tablet differed, and running
  the *same* code twice reproduced the difference — four lines, all `SealBadge`'s `<text>` /
  `<textPath>`, varying by ~0.1px in width and position. SVG text metrics are not
  deterministic here. **Diff the digest line-by-line before reading a mismatch as a
  regression**, and expect this one in any category whose layout 1 draws the seal.
- **A cased value beside an uncased one in the same block, named rather than fixed.** The
  card's head row is `s.brand` over `s.location`, and on the three upper-casing themes it
  reads "KAI MERCER / Manchester, UK": `brand` goes through `cased()` and `location` does not.
  This is the first place in the section to draw `location` outside `labelStyle` — layout 1's
  polaroid stamp upper-cases it through the label face, so the split had nowhere to show. It
  is the section's own `day`-raw / `kind`-cased asymmetry arriving in one row, and casing
  `vm.location` would move the header, which draws it in three fitted layouts. Left as it is.
- **`preview.html`'s `&booked=` is the state worth rendering for this section**, and it
  exercises three rules in one screenshot: the blocked cue features nothing, the card falls
  back to `calPrompt`, and the struck rows keep their place and lose their handler. The
  emptied-slot state is the same code path, which is why it needed no separate check.

Learned on the enquiry form (section 11):

- **A Figma layer's *name* is the string it was created with, so it is the component's
  default and never a third vote.** Two of the three masters draw "KAI MERCER" as the
  display head and the 1440 one overrides it to "Contact Us" — and `get_metadata` names
  the text node "KAI MERCER" at **all three**, including the desktop one whose render
  plainly reads "Contact Us". So the narrow pair are copies whose override was never
  re-typed, the desktop master is the authored one, and the head is a section heading
  rather than the artist's name. **Fetch the render before believing a layer name**, and
  where the instances disagree about a string, the one that disagrees with the *layer
  name* is the deliberate one. This is the gallery's fills-versus-token lesson at the
  level of copy, and it decided the section's whole head allocation in one screenshot.
- **A frame's two head slots can be another layout's two, in the opposite vertical
  order.** Layout 3 sets `s.brand` as the eyebrow over `s.title` as the display line;
  this frame draws the display line first and a small caps line under it. Giving the
  same two fields the same two *kinds* of slot — display and small caps — rather than
  the same positions is what kept `heading` as the display line in all four layouts and
  left nothing unread. **Match a slot by its type register, not by its place in the
  stack.**
- **The frame's own copy told us which of the section's lists its column wanted.** The
  01/02/03 rows read "Send your details / I check availability / Quote & confirm" with
  subs, and row 02's sub is *"Reply within 24 hrs"* — `FORM_PROMISES[0]` almost
  verbatim. That is the booking calendar's grep-the-seed-comments check arriving from
  the other side: the *frame* quoted the seed. Layout 3 had already read the same
  register the other way (running the promises together as one line), so the two
  layouts read one field two ways and neither invents anything.
- **A frame's per-row second line is a gloss, and a list of one-string rows has no seat
  for it.** The step rows are title + sub; a promise is one string, so the sub is
  dropped rather than filled — the video section's fabricated-metric rule reaching a
  *line* rather than a number. What that leaves is a row whose 88 is still its disc plus
  its padding, so nothing in the geometry had to move.
- **An outline that has to read against the page has one derivation in this file and it
  is not in this section.** `vm.formRule` is `vm.tierRow.card` — the pricing stack's own
  guarded walk — aliased in the form block rather than read across sections or written
  twice. The frame binds `sem/stroke/2`, which under Retro IS that walk's answer, and
  the guard earns its place twice over: Grunge's index-3 tag is its black background and
  Editorial's is a wash 0.185 off its cream page, so both would have drawn nothing.
  **Reach for `tierRow` whenever a rule or an outline stands on the page ground** — this
  is its second borrower after the pricing section's own 4px divider.
- **The axis diff was a reorder, and only `get_metadata` says so.** Both narrow masters
  put the steps column *first*; the desktop one puts the form first. The enquiry form's
  own layout-2 lesson said "re-ask every `desk`", and here the answer is that the one
  `desk` test carries three things at once — the grid's columns, its gap and the
  children's order. Two consts and one ternary; the testimonials' 390 reorder at the
  scale of a whole column.
- **A trailing odd cell is a per-layout decision and both answers are in the file now.**
  Layout 1 trails a half-width cell (the pricing deck's rule); this frame draws its
  fifth box at the full 644 under two rows of 315, at all three widths, so it is a
  design and not a residue. `vm.formRows` is untouched — the pairing is the vm's, and
  what a row of one *does* is the branch's.
- **The digest caught the one slip, and it was a token collision inside one style
  object.** Every small caps line here is the display face, so the first draft gave the
  head's sub the box labels' `size/list` — where the frame sets it in `size/title`
  (24/19/18 against 16/12/13). A screenshot would not have shown it; `fontSize` in a
  three-width digest did, in the same call that proved the 4px rule and the 0.82 ramp.
  **Two tokens in one face are two style objects**, the events map's which-of-two-16s
  lesson met at the level of a shared const.
- **A `boxShadow` digest has to search for `inset`, not test position 0.** Computed
  `box-shadow` serialises the colour first and the keyword *last*
  (`rgb(200, 70, 28) 0px 0px 0px 2px inset`), so a first-character test reports every
  refused box as unmarked and reads exactly like a broken live seam. Cost one round trip
  here; worth knowing before the next section writes an inset ring.
- **`&promises=A|B|C` is new in `preview.jsx`.** This section has *two* list-shaped
  contents and `&n=` reaches only `c.fields`, so the promises — and therefore the whole
  right-hand column, including its absence — had no switch at all. Pipes rather than
  escaped newlines, the `&tags=` shape. The bio's add-the-switch-in-the-same-session
  rule, for a second list on a category that already had one.
- **`NVAR` and `CATS.n` part company again, and the check is the same one.**
  `CATS.form.n` is 6, so no picker card appears — but cards 4, 5 and 6 now fold onto
  v3/v0/v1 where they folded onto v0/v1/v2. Cards 1–3 are untouched by arithmetic
  (`n % 3 === n % 4` for `n < 3`), which is why this fold change needed no nine-cell
  digest where the video section's did.

Learned on the testimonials (section 12 — the last):

- **A frame's own name can be aspirational, and the node tree is what settles it.**
  "Video story wall" has no video: the `sp` frame between each quote and its foot carries
  no fill, no children and no effects at any width, and the cell's own arithmetic names it
  outright (24 + 56 + 16 + quote + 16 + **sp** + 16 + 40 + 24 = the cell's height, twice
  over with a different quote each time). It is the spacer that parks the attribution on
  the floor. **Read a frame's empty frames before believing its title** — the enquiry
  form's fetch-the-render-before-believing-a-layer-name rule, one level up.
- **Two masters disagreeing about content while agreeing about a height is what proves the
  height is the design.** Both narrow cells report `layoutSizingVertical: HUG` and both
  land on **392.4** — with a 3-line quote at 768 and a 2-line one at 390, so their voids
  are 132.4 and 155.4. A true hug cannot do that, so the number is stored and the void is
  its residue; the desktop cell's 406 is the same box inside a stated 716. That settled
  `minHeight` on the **card** over `flex: 1 0 <void>` on the spacer, and the two spellings
  differ by ~60px at 390 — the events map's read-a-wrapper's-`layoutSizing`-before-
  transcribing-it lesson, decided by arithmetic rather than by the reported flag.
- **A fourth layout can share a third seam *and* re-read what it means.** `cur` is the
  review on show in layouts 1 and 2; here it is the review **leading the row**, and
  nothing else changed — no new state, no new view-model, two `onClick`s, and the modulo
  on the read (the events map's rule) wrapping both arrows. The booking calendar's
  share-the-seam rule with one extra degree of freedom: **a seam can be widened by
  reinterpreting its index, not only by copying its handlers.**
- **The seat rule and the pager rule together decide what the reference picture loses.**
  Hue belongs to the seat (the media player's fan), so the wall's composition survives
  paging — but the rust card is seat four, unreachable at 768 and 390 at any count. And
  the pager is derived from the list and not drawn at one page, so the seeded 1440 and 768
  renders carry no arrows where the frame draws them. **Two accepted diffs from one
  frame, both of them rules this pass had already written down**; name them in the branch
  rather than reaching for a fix.
- **`s.edge` is the file's third light register, and `s.bg` is not.** The frame's tan
  needed a flat-four counterpart distinct from `paper` — and `paperOf()` returns the page
  ground itself on Editorial and Pop (and on Retro, which takes literals and so never
  shows it), so `s.bg` collapses onto `paper` on exactly the palettes where it would
  have had to do the work. `edge` (`mix(bg, tx, .13)`) is distinct on all
  five: 11.80 and 16.10 against the band on Lime and Grunge, 1.22 and 1.08 on Editorial
  and Pop where it is a tonal step rather than a hue change. **Count the distinct
  registers per palette before choosing a token** — it is one `node -e` and it overturned
  the obvious answer.
- **Compute a palette test with `data.js`'s own `lum`, not WCAG's.** A first pass put
  Lime's head at contrast 1.44 and nearly argued the branch out of `s.pillFg`; the file's
  `lum` is the **perceived** 0.299/0.587/0.114 form, under which `pillFg` falls through to
  `contrast()` on Lime and the head is the ink at 17.54. The tags row's five-palette test
  is only as good as the luminance it is run with, and the render is what caught it.
- **A 390 master that overflows its own frame is a peek, not a bug.** Its grid is a
  380-wide strip of fixed 300px cards inside a 370 content box, so the next card shows by
  64 — the gallery's clipped-strip case with the opposite verdict, because the clip hides
  nothing the visitor needs. Reproduced at the content edge instead (`overflow: hidden` +
  `minWidth: 0`, the peek 54 against the frame's 64), which needs no negative margin; the
  full-measure card comes back at one review, where there is nothing to peek at.
- **The bleed handed this section all three of the frames' measures at once**, for the
  third pass running: 1052, and **708 and 370 exactly**, so the 768 render's cards land on
  the master's own 225.33 and both narrow cards on its 392.4 to the tenth. The desktop
  render is the one that will look wrong beside Figma (three fill cards at 353.9 against
  four at 262), and that is the short-row-fills rule, not a slip.

Learned on the end-of-pass sweep (`80c557c` and `9e0f726`):

- **Count the claim before rewriting it.** This file predicted two categories would go level
  with their design counts (`tags` and `video`, the two that needed a `CATS` bump). It is six:
  `gallery` and `map` already offered four rows, so their `NVAR` bumps made them level without
  anything visible happening. The bullet that named them was written from the *picker cards*
  that appeared, which is a different set from the categories at parity. One `node -e` over
  `CATS` and `NVAR` settles it, and it is the same reflex as the tags row's palette test.
- **`EncoreBuilder.jsx` was not byte-identical this time**, which the layout-2 and layout-3
  refreshes could both rely on. That is the pass family's one standing shortcut gone, and what
  replaces it is a walk of the diff's hunks rather than a walk of the file: eleven hunks, nine
  additive `vm.*` keys inside `sectionVm` and two comments, and the whole diff removing exactly
  one non-comment line (`tags: songTags(t?.tags)`, hoisted to a local two lines up so
  `tagLabels` could case it). Nothing outside `sectionVm`, so the chrome the digest is *driven
  by* is the old build's, which is what the byte-identity used to prove. Run
  `git diff <build commit> HEAD -- …EncoreBuilder.jsx | grep '^-' | grep -v comment` first —
  it is one call and it is the whole argument.
- **The rotating seal makes the digest non-zero, and the fix is a control walk rather than a
  filter.** 16 rows differ at both wide widths and 12 at 390, every one a `g` / `text` /
  `textPath` of `showBadge`'s stamp, whose `getBoundingClientRect` moves between any two
  samples. Walk the *same* build twice 400ms apart and diff that first: the self-diff row
  indices came back **identical** to the cross-build ones, and cross minus self is empty at all
  three widths. Do not suppress the rows — the control walk proves what a suppression would
  merely assume, and it costs one `sleep`.
- **The canvas tablist is Radix, so a synthetic `.click()` selects nothing.** The walk then
  silently repeats the previous width and three widths come back at 885 rows apiece. Dispatch
  `pointerdown` + `mousedown` (Radix commits on mousedown, not on click) or use a trusted
  click, and **assert the canvas width after every switch** — 1078 / 768 / 390 off the first
  `--ac` root. This is layout 2's "wedged renderer that silently stopped applying the device
  switch" arriving through a different door, and it produced the same shape of phantom: the
  identical 16 seal rows, which for a moment read as a finding.
- **The strongest proof the pass shipped is a click, not a grep.** `EXAMPLE_PAGE` is `arch 0`
  throughout, so the digest can only prove an absence. Drive the built file's setup modal and
  click the **fourth** card: the old build labels it *Polaroid* and takes all nine body sections
  to **layout 1** (`3 % 3`), the new one labels it *Stacked* and takes them to **layout 4**
  (`3 % 4`). One click, the whole pass, and the footer staying at layout 1 is the one-design
  category proving the fold is real. Keep the string tells as the cheap second check — here
  `All songs · A–Z`, `What happens next` and `Name stacked over the photo` (new only) and
  `Polaroid` (old only, twice).

## Open questions

1. ~~**The page carries the `form` category twice, and only one of them can be the fit.**~~
   *Settled on section 10 (`5da1c3a`), by the deadline the question itself set, and it took
   the recommendation unchanged: **`form` takes the editorial band**. What closed it is no
   longer only the argument below — the calendar's fit **drew the *Book Us* block's tan panel
   and its head**, so those two are spoken for, and the wizard is no longer fittable without
   reopening section 10. Section 11 should read this as closed rather than re-weighing the
   wizard.* The original text follows.

   The
   *Book Us* block's left half is *"Enquiry Forms — C · Multi-step wizard"* (a three-step card:
   `1 Event / 2 Details / 3 Contact`, a "Step 1 of 3" line, event-type chips, an approx-date box
   and Back / Next Step pills); the band below it is *"Enquiry Forms — F · Editorial form"* (a
   "Contact Us" display head over five boxes and a message, a mustard *Check Availability* pill,
   and a *WHAT HAPPENS NEXT* column of 01/02/03 rows). **Recommendation: `form` takes the
   editorial form.** It is a standalone full-width band at all three widths, it reads every field
   the section has — `c.fields` two to a row, `message`, the mailto submit, and `FORM_PROMISES` as
   the numbered column — and it needs no state the file does not already carry. The wizard needs a
   step counter, a three-way split of `c.fields` that `FormFieldsField` cannot express, and a
   *Next Step* control with nothing behind it; and `addSection()` refuses a second `form` section,
   so fitting both is not available. **Consequence:** the *Book Us* head goes to the calendar, and
   the wizard joins the layout-2 page's dropped `tags` / `audio` as a design this pass does not
   reach.
2. ~~**`video`'s slot arithmetic.**~~ *Settled on the video section (section 5), and it took
   answer (a) unchanged — `NVAR.video` 2 → 4, `CATS.video.n` 3 → 4, the fit as `v3`, and
   `if (s.v0)` widened to `if (s.v0 || s.v2)`. The no-op argument was **proved** rather than
   argued: a `git stash` digest of `?cat=video&arch=0,1,2` at all three widths came back
   IDENTICAL on all nine, so the picker's first three cards render exactly what they rendered
   before. `pageLayout()`'s comment gained the sentence the question asked for.* The original
   text follows.

   `NVAR.video` is 2, so `arch 3 → 3 % 2 = 1 → v1`: the fitted
   design would be unreachable at the page's own index. Three answers, and the **recommendation is
   the first**: (a) `NVAR.video` 2 → 4, `CATS.video.n` 3 → 4, the layout-4 fit as `v3`, and the
   `Video` component's `if (s.v0)` widened to `if (s.v0 || s.v2)` so layout 3 keeps rendering
   exactly what it renders today (`arch 2 → 2 % 2 = 0 → v0` before, `arch 2 → v2 → the same
   branch` after — a provable no-op, and the layout picker's row 3 goes on showing layout 1's
   design, which is the documented folding behaviour "Audio layouts 1, 4 and 7 render identically
   on purpose"); (b) `NVAR.video` 2 → 3 with the fit as `v2`, which puts a layout-4 design on the
   layout-3 card and breaks the page alignment the setup modal depends on; (c) `NVAR.video` 2 → 4
   with `v2` left to the generic flat tail, which silently regresses anyone on video layout 3 from
   a fitted design to an invented one. **(a) is the file's first hand-fold** — folding has only
   ever been `arch % NVAR` — so `pageLayout()`'s "lowest index that renders a given design"
   comment needs a sentence saying a category may now fold by hand as well.
3. ~~**`audio` has no layout-4 design, and its fold is worse than layout 3's.**~~ *Settled on the
   video section (section 5), in question 2's own commit as the plan asked: **leave it**, and the
   thing that settles it is evidence rather than a judgement.* **There is no such thing as "a
   layout-4 page carrying an audio section".** The setup modal's page-wide write only touches
   sections **already on the page**, `EXAMPLE_PAGE` carries no `audio` (nor `tags`, nor `video`)
   and `openAdd` opens the composer at **`arch: 0`** — so nothing can put an audio section at
   index 3 except a user picking "Audio Player layout 4" in the picker by hand, where folding
   onto layout 1 is the documented behaviour (`CLAUDE.md`: "Audio layouts 1, 4 and 7 render
   identically on purpose"), not a regression. **Check that same arithmetic before reading any
   remaining `NVAR` question as urgent**, and note what it does *not* undercut: `video` was
   bumped for a different reason — without `CATS.video.n` 4 its layout-4 design would have been
   **unreachable at any index**, which is not true of a design that does not exist. The original
   text follows.

   `NVAR.audio` is 3,
   so a layout-4 page renders `arch 3 → 3 % 3 = 0 → v0`, which is an **invented flat** design —
   where layout 3's missing `video` folded onto a *fitted* layout 1. Two options: leave it (the
   honest "no design exists" answer, and the one precedent points at), or `NVAR.audio` 3 → 4 with
   `if (s.v2 || s.v3)` so a layout-4 page shows the fitted bar-meter — question 2's hand-fold
   applied to a category with the opposite problem. Not decided here; whichever way, it is one
   line and it belongs in the same commit as whatever settles question 2.
4. ~~**Two layout-picker cards appear**, for `tags` and `video`.~~ *Both done — `c583070` and
   `5999dc1`.* Layout 3's plan could promise the
   picker would not change; this one cannot. Both new cards sit at the end of their category's
   list and nothing existing moves, but it is the first user-visible change this pass family has
   made outside a section's own rendering, and it is worth a line in the commit that makes it.
   *The Tags picker offers four cards, the fourth at the end, and a trusted-click check confirmed
   the three above it did not move; the Video picker now does the same, its third card still
   drawing layout 1's design through the hand-fold. No further card appears in this pass — every
   remaining category already offers more rows than it has designs.*
5. ~~**The booking calendar's master is the wizard's output, misfiled under the calendar's
   name.**~~ *Settled on section 10 (`5da1c3a`), and the answer was **neither** of the
   question's two: not fit-reduced and not declined, but fit **re-seated on the section's own
   slot list**. The question read the two cream rows as a date row plus a pricing package,
   which left three of the four blocks unbacked; what it was missing is `CAL_SLOTS`' own
   comment, which defines `kind` as **"what the artist plays that night"** — exactly what
   "Live band — full / 5-piece + DJ" is. Once that is seen the two rows are **one repeating
   element** (identical frames, same inner geometry, 81 tall apiece) over a list the section
   already owns and layout 2 already tables. So the card **features** a slot and the rows are
   the list minus it — the events map's layout-2 rule taken whole — and the design's own name
   is satisfied: the card is the enquiry the visitor is composing, out of what the artist is
   actually selling. **The discriminator for the next session: before calling a frame's
   content another section's, grep the seed constants' comments for the words the frame
   uses.** The four stats are the enquiry line taken apart (date, SET, PRICE, TIME) rather
   than the wizard's six, `NVAR.calendar` went to 4, and nothing was declined.* The original
   text follows.

   *"D · Enquiry summary stack"* is a dark card reading *Summer wedding / Lake District · Outdoor
   / GUESTS 120 / SET LENGTH 4 hrs / BUDGET £1,200 / SOUND Provided*, then *Sat, June 12 ·
   Arrival 6pm · 9pm*, then *Live band — full / 5-piece + DJ / Package ›*, then a *Send Enquiry*
   pill. Of that, the calendar can honestly draw the date row (`open` + `time`, which is
   `vm.calMonths`' composed line already) and the pill (`vm.calBookTo`); the dark card's six stats
   are an enquiry the visitor has not made, and the *Live band — full* row is a **pricing
   package**, which is another section's content. So the calendar's session begins with a
   fit-reduced-or-decline decision, not with `get_variable_defs`. If it declines, `NVAR.calendar`
   stays 3 and a layout-4 page folds the calendar to `v0` — question 3's shape on a section that
   *has* a frame, which would be new. Read question 1 first: if the wizard is fitted instead of
   the editorial form, this whole block is one composed design and the question changes.
6. ~~**The events map's dashboard is half derivable and half invented.**~~ *Settled on section 8
   (`0cbf413`), and the four stats were decided as one group as the question asked. Two are
   derivations — **CITIES** is a new `vm.gigCityCount` (`gigCities.size`, the map layout 3's
   filter row is already built from, read off it rather than recomputed, and **not** suppressed
   below two cities the way `gigChips` is: a stat reading "1 / CITIES" is a fact where a filter
   row of All plus one chip is not a distinction), and **GIGS** is `s.gigs.length` with the
   frame's "YTD" and "played this year" dropped, since nothing here reads the clock; the section's
   own word for that list in layout 1, "upcoming", is the sub. Two are fields, and **both of their
   labels stutter with their own defaults** — the events map's own drop-the-label-not-the-field
   rule met twice more — so they were resolved **differently on purpose**: RADIUS over
   `s.mapRadius` ("12 mile radius") becomes **COVERAGE**, which is `FIELDS.map.radius`'s own name
   and layout 1's eyebrow in this very section, while BASE over `s.mapBase` ("Based in
   Manchester") has no such synonym and **loses its label outright**. `s.mapTerms` takes the
   COVERAGE card's sub, which is where the frame's own "miles · standard" and "further on
   request" both come from. *RADIUS 120* itself was never a candidate: our field is a phrase, not
   a numeral with a unit under it. "LIVE · LAST 12 MONTHS" is dropped, and `s.mapSub` — the one
   field with no seat in any fitted layout — **was tried in that slot and refused**, because its
   default "12 dates · 8 cities · this season" does not merely repeat the two stat cards, it
   contradicts them on the seeded page (5 gigs, 2 cities). The ticker took the question's own
   reading: `page` over a `perPage` of 1, with the arrows wrapping and the `×` becoming the `›`
   that makes the frame's `‹` a pair.* The original text follows.

   *CITIES 21* is the distinct
   cities of `c.gigs` (`vm.gigChips` already computes exactly that, for layout 3's filter);
   *GIGS YTD 48* is `gigs.length` but its "YTD" is a claim about the clock; *BASE Manchester, UK*
   is `TITLES.map` or the bio's `location`; *RADIUS 120 miles · standard* and *LIVE · LAST 12
   MONTHS* are backed by nothing. The mustard foot ticker (*‹ Next: Hidden Warehouse / Manchester ·
   JUL 12 · 22:00 ›*) is the section's pager reduced to one gig and two arrows — the same `page`
   over a `perPage` of 1, which the 390 master of layout 3 already does. Decide the four stats as
   one group, the way layout 3's pricing decided its FEATURED badge.
7. ~~**The repertoire's A–Z rail is a new control in a single layout.**~~ *Settled on section 7
   (`104530e`), and it took the question's own answer: the derivation is `vm.repGroups` in
   `sectionVm`, not beside `repChips()` in `data.js`, because one layout wants it — move it if a
   second ever does. What the question left open was the **verb**, and the frame answered it
   twice over: the design is named "A-Z index rail" and its rail carries a `sticky top-0`, which
   only pays off beside a list that scrolls past it — and which is **taken at desktop**, not just
   read as evidence. So the rail **jumps** (`scrollIntoView` off
   a callback ref, live-gated, no handler on a letter no song starts with) rather than filtering,
   which would also have made the frame's own "All songs · A–Z" sub a lie the moment it was used.
   The lit letter is a **seat**, not the map's toggle: `alpha` starts empty and falls back to the
   first group's letter, which is the D the frame lights.* The original text follows.

   Layout 3's open question 14
   (the events map's city filter) a second time, and the answer that question gave should be taken
   now rather than re-derived: if a second layout ever wants the same derivation, it belongs beside
   `repChips()` in `data.js` rather than in `sectionVm`. The rail itself is honest — the letters
   are the first characters of `c.songs`' titles, the way the set cards were the tags — and the
   frame lights one letter, which is a `s.live` seam of the map's `sel` shape.
8. ~~**The repertoire's head is a word where `vm.title` is a count.**~~ *Settled on section 7
   (`104530e`): the display line is **`s.title`** and the frame's "Repertoire" is not drawn at
   all, which is layout 2's own call on this section — giving the display line to the literal
   would leave `heading` editing nothing here, and three of the four layouts now honour it as
   the display line. On the seeded page it reads "12 Songs", the diff layout 2 already carries.
   The "All songs · A–Z" sub is a **literal**: it describes the design rather than the artist,
   and it stays true at every state, which is half the argument that settled question 7.
   `TITLES` gained no `repertoire` entry and no default was re-pointed.* The original text
   follows.

   `TITLES` has no `repertoire`
   entry; `sectionVm` falls back to `"{n} Songs"` (`EncoreBuilder.jsx:542`, mirrored in
   `EditPanel`). The frame heads the card *"Repertoire"* over a *"All songs · A–Z"* sub. Decide
   whether the frame's word is `s.title` (which would print "7 Songs" on the seeded page, an
   intended diff), the category's own name as a literal (the eyebrow pattern), or the sub. The
   tags row's discriminator applies: re-pointing a default is free only where no signed-off layout
   would newly honour it, and here three would.
9. ~~**The pricing rows carry a *SET* / *PROJECT* kind label no field backs**, above the price.~~
   *Settled on section 9 (`0e3fba6`), and the answer was neither of the question's two: it is
   **`unit`**, moved. Layout 4 is the one pricing design that prints no suffix after its price,
   so the frame has simply put the unit above the numeral — `vm.tierKind` is `s.tierUnit` with a
   leading slash dropped ("/EVENT" over a price is a suffix that has lost its number) and the
   label face upper-cases the rest. What it costs is that one section-wide value prints on every
   row where the frame types a different word on each: EVENT / EVENT / EVENT on the seed. The
   discriminator the question was missing: **check what the layout stops drawing before deciding
   a slot is unbacked** — every per-package field here already had a seat, and the one field that
   lost its usual one was the only candidate left.* The original text follows.

   It
   is not `name`, not `price` and not a tag — the tags are the chip row beside it. Either it is
   the first line of `feats` read as a label, or it is layout 3's FEATURED badge again: a claim
   about a package that nothing the artist typed can supply. The frame's foot line is
   `DEFS.pricingSub` verbatim, so the rest of that section is well-supplied; this is the one seat
   to argue about.
10. **Three `FIELDS.header` entries have no seat in layout 4**, which is layout 3's open questions
    5/6/8/9/11 in the header again and the mildest of them: `subtitle` (no master draws a line of
    prose), `cta2` (no Listen link — the frame's bar is the burger arm at every width) and
    `align` (every master is left-aligned). Layouts 2 and 3 already drop `cta2` and `align`, so
    what is new here is only `subtitle`, and inventing a line the frame does not draw would be
    worse than the absence. The other side is worth naming too: **`showBadge` reaches layout 4**,
    where question 5 of the layout-3 plan recorded it reaching neither 2 nor 3 — all three masters
    draw the seal, so the toggle is real again for the first time since layout 1.

## Addendum, 2026-09-15 — QA against the frames

Reversals and fixes after QA compared the built page with the layout-4 frames. Branch
`retro-layout-4-qa-fixes`, forked from `retro-layout-3-qa-fixes` (it needs that branch's
five-review seed). A before/after digest (themes 0–4, every cat × layout × width) moved
exactly `arch 3` of bio, media, gallery, map, pricing, calendar and testimonials — 105 renders
— and nothing else.

- **Video — declined.** QA asked for the *See me in action* band. The section left the project
  in `d734992`, and the user chose to keep it out rather than restore it on layout 4's page.
- **Bio — the Section's columns, and the Genres row.** At 1440 the head is a 664 column beside
  the 664 × 720 card, 56 apart: eyebrow, display line and Genres `space-between` over the card's
  height (964:72512). Both narrow Sections stack eyebrow / head / Genres 30 apart over the card
  at 40. The Genres row is the removed tags section's layout-4 instance, drawn inside the bio
  (the user's call, rather than restoring `tags`): "Genres" in `body-lg` 16/15/15 in the accent
  over `TagChips` at `label-xs` 20/14/12, at the instance's 457 measure at 1440, reading
  `vm.chips` (TAGS). The 390 instance hides the line (58 tall against 103 at 768), and so does
  ours. The open-question-1 reading "the card fills" is reversed for this section.
- **Media — the foot strip.** The checkerboard under the cream band now checks it against the
  page beige (`s.bg`), where it had repeated the head strip's olive: 971:15256 is cream squares
  over the ground below the band.
- **Gallery — the head column.** At 1440 Frame 182 (566) holds the head 454 wide, centred in the
  646 band beside the 874 instance, so ours stands it 454 wide and 112 from the card and rail,
  centred on the 534 row; the 454 measure declined in section 6 comes back with its column. The
  spotlight lands on the master's 590.97 × 534 × 0.82. The heading falls back to "Snaps from
  the night" (`GALLERY_HEADING_4`) at layout 4.
- **Events map — layout 3's viewport, and the panel note.** The plate is `s.mapRadialSrc` drawn
  as it is — the frame's raster and `map-radial.jpg` differ by 3.5 in 255 — where the fit had
  inverted layout 1's Manchester tile. The ring labels are `rings` on each ring's right edge in
  an olive tag, the + / − controls step layout 3's `zoom` live (1.25× a step, −2..+3), and
  *LIVE · LAST 12 MONTHS* is a new emptiable field, `span` (`MAP_SPAN`), right of "Travel &
  reach". `mapSub` stays refused there. The heading falls back to "Distances we’ll Travel"
  (`MAP_HEADING_4`). The four stat cards, the "Next:" prefix and the ×, none of which QA
  marked, are unchanged.
- **Pricing — capitals and the frame's pill.** The package names are upper-cased, as the frame
  types them. The row pill reads a new `rowCta` field, "Start Enquiry" (`PRICING_ROW_CTA`, the
  frame's "Star Enquiry" read as `CAL_SLOT_CTA` reads it), in Display/List uncased under Retro,
  and drops its offset block at 1440, which the desktop master does not draw. The tags' and
  features' casing (upper in the frame) was not marked and is unchanged.
- **Calendar — Book Us, with the wizard.** Open question 1's "the wizard is no longer fittable"
  is reversed at the user's call: the calendar's layout 4 draws "Enquiry Forms — C · Multi-step
  wizard" (964:72843 · 964:79037 · 977:8513) inside the Book Us panel, 680 : 478 and 50 apart at
  1440, stacked 50 apart at 768 and 20 at 390. The card is `sem/box/1` on a `stroke/1` hairline,
  radius 30, padded 40/48 (30 narrow); stepper, title, "Step n of 3", body and pills
  `justify-between` over a minimum gap of 18.75 / 20 / 20; type 24/19/18 title, 12/11/11 chip,
  14/13/13 body-md, 16/12/13 list. Step 1 is the frame's: an event-type chip grid off a new
  `types` field (`CAL_TYPES`, the frame's four — not the form's `FORM_TYPES`, another section's
  content) and an APPROX. DATE box. The frame draws no step 2 or 3, so Details takes the summary
  card's GUESTS / SET LENGTH / BUDGET / SOUND and Contact a name and an email; every string is
  resolved onto `vm.calWizard`. Live, the chips pick, the boxes are real inputs (spans on the
  canvas), Back and Next Step move between steps, and the last step's pill is the frame's "Send
  Enquiry" as an `<a href="#form">` via `calBookTo` — the calendar has no address, so nothing is
  mailed. No `<form>`: Enter in a box does nothing, checked. The heading falls back to "Book Us"
  (`CAL_HEADING_4`).
- **Testimonials — the heading only.** QA's picture (three cards, no arrows) was the deployed
  `main`, which predates the five-review seed of `19f284f`; on this branch the 1440 row already
  draws four cards and both arrow discs. What remained was the frame's head, which falls back to
  "Client success stories" (`TESTI_HEADING_4`) at layout 4.
- **Heading fallbacks.** All four layout-4 heads are one `HEADING_4` map in
  `EncoreBuilder.jsx`, read by `sectionVm` and by `EditPanel`'s fallback, so the panel and the
  canvas agree. `TITLES` is not re-pointed. "Six Worth Your Ears" stays declined (a count).
