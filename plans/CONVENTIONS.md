# Shared conventions

The conventions a **third** template leaned on. `plans/README.md` asked for this file "once a
second template shows which is which"; Lime showed it, and Grunge's layout-1 pass tested it:
every bullet below is one a Grunge session actually used (its running lists are *Conventions →
Inherited and used* in [`grunge/layout-1.md`](./grunge/layout-1.md),
[`grunge/layout-2.md`](./grunge/layout-2.md), [`grunge/layout-3.md`](./grunge/layout-3.md) and
[`grunge/layout-4.md`](./grunge/layout-4.md)), not one that merely reads as general. The
layout-2, layout-3 and layout-4 passes each added the rows they leaned on three times or more
that the file did not name, and their sections are listed after the layout-1 ones as *L2:*,
*L3:* and *L4:*.

This file **names and locates; it does not restate.** Each line is the bullet's own bold title,
the plan and heading it lives under, and the Grunge sections that leaned on it. Read the bullet
where it was written — its numbers and its reasons are there. Line numbers drift, so search the
title.

A new template's first plan says which group it inherits: **A** and **B** always; **C** if it
is another variable mode of a page already fitted (Editorial and Pop will say, from the Figma
file, whose twin they are); **D** only if its blocks are widened Lime blocks, as Grunge's are —
D1 for Lime's layout-1 blocks, D2 for its layout-2 ones, D3 for its layout-3 ones, D4 for its
layout-4 ones.

## A. Reading Figma

Sources: the `figma-frame-reading` memory note, [`retro/layout-2.md`](./retro/layout-2.md) and
[`lime/layout-1.md`](./lime/layout-1.md).

| Convention | Where | Leaned on in Grunge |
|---|---|---|
| *`get_variable_defs` resolves a node's mode; the emitted tokens are the desktop default* | memory: `figma-frame-reading` | every section; L2: every section; L3: every section |
| *Read a section node, never the desktop page, for variables* (the page frame is set to another template's mode) | grunge/layout-1, *Conventions* | every section; L3: every section |
| *A rotated group's metadata x/y is a bounding box* | memory: `figma-frame-reading` | header (the seal); L3: bio (the seal) |
| *The emitted DOM order is the frame's paint order* | memory: `figma-frame-reading` | media, map |
| *The emitted `var(--token, #hex)` fallback is the component's default, not the instance's* | retro/layout-2, *Conventions* (media) | header, bio; L2: header (a node's font too), bio, testimonials |
| *Check a narrow master's Device mode before trusting `s.*` on it* | lime/layout-1, *Settled in section 1* | header; L2: every section; L3: every section (none carried one); L4: every section (the media's 768 and 390 instances carry `Device: Tablet`) |
| *Leaked tops are followed where they show, dropped where they don't* | lime/layout-1, *Settled in section 4* | gallery, footer; L2: gallery; L4: pricing (the tag chips' `#F2FFD0` hairline) |
| *A leak that shows and reads as a defect is overridden* | grunge/layout-1, *Settled in section 4* | pricing, calendar; L2: gallery, calendar (turned round: a rule the twin declined, drawn) |
| *An opacity-0 node is a spacer* | lime/layout-1, *Settled in section 3* | media |
| *A stated list height is a column minimum* | lime/layout-1, *Settled in section 3* | media |
| *`get_variable_defs` mixes nested schemes in one list; the `use_figma` fills settle which node is on which* | lime/layout-1, *Settled in section 9* | form; L2: header, media, calendar, map; L3: calendar, map |
| *Every glow is a guess until the node's `effects` confirm it; scan before deciding on a drop shadow* | lime/layout-1, *Lime's decorative language* and *Settled in section 10* | bio, gallery, pricing, calendar (every guess wrong: each ring was a plain stroke); L2: every section (no Lime glow survived on any Grunge node); L3: every section — no node of the 39 masters carries an effect at all; L4: every section — effects are back, and all four are backdrop blurs, three behind opaque fills; every Lime glow is a ring |
| *The node walker, kept* — one `use_figma` call per master returning every box, paint, stroke, effect, radius and text segment | grunge/layout-2, *Conventions* | L2: sections 2–7; L3: header, bio, calendar, gallery, pricing |
| *The paired diff walk* — flatten the master and its twin in traversal order and return only what differs; keep per-node fields short, since a return truncates at 20 KB | grunge/layout-2, *Settled in section 8* | L2: map, form, testimonials; L3: media, repertoire, map, form, testimonials; L4: every section — the whole read, ten times |
| *Read a fill's `scaleMode` before believing its `imageTransform`; correlate the render with the seed when in doubt* | grunge/layout-2, *Settled in section 1* | L2: header, bio; L3: header, bio (the pass's one `CROP`); L4: header (the unmirrored photo), bio (the cover) |
| *Read every nested node's scheme off the master, never off the twin's row* — a widened page can put the same node on a different **scheme**, not only a different value | grunge/layout-3, *Conventions* | L3: repertoire, gallery, pricing, map, testimonials (five sites, eight nodes); L4: header (the seal, 4 / 3 / 3), bio (1 / 3 / 3), testimonials (*seat the schemes off the master, never remap the twin's register*) |
| *A scheme that did not move can still move the **binding**, and `explicitVariableModes` will not say so* — read `boundVariables` and resolve the variable's name | grunge/layout-3, *Conventions* (section 8) | L3: calendar, gallery, pricing, map, form; L4: header, bio, media, repertoire, map, calendar, form, testimonials (two panels and a media track moved binding) |
| *A seam's binding can lie — trust the render* — a torn seam's paint can be bound to a token that resolves red and still fill and render black; the seam is the neighbour's ground | grunge/layout-4, *Grunge's layout-4 mode* ("The media foot's binding lies") | L4: media (the 1440 foot, `sem/tag/2/bg`), repertoire (the 1440 foot, the same token), and the seam colour of every other layout-4 tear, read off the render |
| *Load a Google Font the frames name; substitute only on a user call* | memory: `load-figma-fonts`; grunge/layout-1, *decision 1* | session 0 |

## B. Measuring and proving

Sources: [`retro/layout-2.md`](./retro/layout-2.md), [`lime/layout-1.md`](./lime/layout-1.md),
and the `verifying-the-published-tab` and `browser-tool-choice` memory notes.

| Convention | Where | Leaned on in Grunge |
|---|---|---|
| *The digest is committed: `source/scripts/digest.mjs`* — before / after, `cmp` per file, the other four themes at zero rows every session | lime/layout-1, *Settled in session 0* | every section; L2: every section; L3: every section; L4: every section |
| *Theme 1 is the digest at risk in a widened block* — every edit sits inside a block the twin renders | grunge/layout-1, *Settled in section 2* | L2: every section (zero nine times); L3: every section (zero ten times); L4: every section (zero ten times) |
| *One five-theme digest is the whole proof for a shared-helper change*; filter on `_theme_N_` | lime/layout-1, *Learned on the end-of-pass sweep* | repertoire (`Pager`), the sweep (`Photo`) |
| *`textTransform` is a digest column* | grunge/layout-1, *Settled in section 5* | repertoire, footer |
| *A seeded page cannot show an empty slot* — `&noimage=1` | lime/layout-1, *Learned on the end-of-pass sweep* | the sweep; L3: bio |
| *Divide the face out before comparing any width* | retro/layout-2, *Learned on the header's narrow masters* | header (it became `faced()`) |
| *Place a seal by its disc's centre, off the edges of what it hangs on* | lime/layout-1, *Settled in section 2* | bio, pricing, footer; L3: bio |
| *Measure anything under `.seal-spin` with the animation stopped* | lime/layout-1, *Settled in section 2* | bio; L3: bio |
| *The popup is `about:blank`: drive it from the opener* | memory: `verifying-the-published-tab` | every live check |
| *The whole-page published check is one puppeteer script* — now committed, `source/scripts/page-check.mjs <Template> [cards]`, the first card listed getting the full walk | lime/layout-1, *Learned on the end-of-pass sweep* | the sweep; L2: header, the sweep; L3: every section and the sweep; L4: every section and the sweep (`Grunge 3,0,1,2`) |
| *The two-build digest walks the editor* — old build digested **before** the `cp` | lime/layout-1, *Learned on the end-of-pass sweep* | the sweep; L2: the sweep; L3: the sweep; L4: the sweep (`CARD=3`, reduced motion on) |
| *Field reach is measured, not read off the prose* — `source/scripts/reach.mjs` | CLAUDE.md, the `FIELDS` bullet | the sweep (the header's `Grunge` rows); L2: header, map, form, the sweep; L3: header, bio, the sweep; L4: header, calendar, the sweep — the first measurement with no placeholder card |
| *The black-run depth method* — a torn seam's depth is the maximum per-column run of its colour off the render, checked against the node arithmetic | grunge/layout-1, *Settled in section 3* | media, map, form; L4: media, gallery, repertoire |

## C. Dressing a shared branch in a second mode

Sources: [`lime/layout-1.md`](./lime/layout-1.md); the gate idiom is
[`grunge/layout-1.md`](./grunge/layout-1.md), *decision 2*.

| Convention | Where | Leaned on in Grunge |
|---|---|---|
| *The gates are the template's flag, the named pairs, and `s.designed`*; widen per site from the frame, never by grep; never edit another template's literal | grunge/layout-1, *decision 2* and *Conventions* | every section; L3: every section; L4: every section |
| *A section whose live seam is hoisted above its branches can always take a block* | lime/layout-1, *Settled in section 3* | media, form; L2: bio, form; L3: form; L4: bio, media, form |
| *Where the seam lives inside the branch, the block goes after the seam* | lime/layout-1, *Settled in section 4* | gallery, repertoire, map; L2: repertoire, gallery, calendar, map, testimonials; L3: media, repertoire, calendar, pricing, map, form, testimonials; L4: gallery, repertoire, map, pricing, calendar, testimonials |
| *The `G` lookup at the block's head, whose twin's arm is today's literals* — so the twin digests to zero | grunge/layout-1, *Settled in sections 4–10* | L2: pricing, calendar, map, form, testimonials; L3: media, repertoire, pricing, map, testimonials; L4: media, gallery, map, testimonials |
| *A widened block can need no `G` at all* — when every leaf resolves through the twin's keys, a `const grunge` and a handful of arms is the whole block, and `boundVariables` says so in one call | grunge/layout-3, *Settled in section 9* | L3: form; L4: repertoire, pricing, calendar, form |
| *A section on another scheme writes that scheme's values as named literals*, since no vm key holds them — and one twin literal can map to two (Grunge's two Scheme 3 reds) | grunge/layout-1, *Settled in section 1* (`HeaderV0`'s `G2`); grunge/layout-2, *Conventions* | L2: media, calendar, map, testimonials; L3: media, repertoire, calendar, gallery, pricing, map, testimonials; L4: media (Scheme 2's `#171716` / `#222222`), gallery (Scheme 3's `#82211B` / `#9E1F17`), map (`#F52E34` / `#00000026`), calendar (`#171716`) |
| *Scheme 4 ≡ Scheme 1 collapses a sheet onto the page* — a Lime block that paints a Scheme 4 sheet paints the page's own ground under Grunge; a twin that wrote the sheet's bindings resolved still needs a `G` | grunge/layout-1, *Conventions* ("Scheme 4 ≡ Scheme 1"); grunge/layout-2, *Conventions* ("Scheme 4 ≡ Scheme 1, so the form has no band") | L2: form; L3: map; L4: header (the seal's black disc), testimonials (no sheet) |
| *A frame's inside stroke is an inset `boxShadow`, on an overlay where an image or a child paints over it*, so every stated height holds | lime/layout-2, *Settled in section 1* (the `sem/stroke/2` bullet) | L2: header, repertoire, pricing, calendar; L3: header, media, repertoire, gallery, pricing, map, testimonials; L4: header (the avatar), media (the two rings) |
| *A hard offset shadow goes through the caller's `style`, never a shared pill's props* | lime/layout-2, *Settled in section 2* (open question 2's route 1) | L2: header, bio, calendar |
| *Retro's live states vanish under Lime; redraw them, never inherit them* | lime/layout-1, *Settled in section 6* | repertoire, map, calendar, form (four redrawn states); L3: the gallery's viewer, the map's pin and lit row; L4: the map's lit pin (a white ring) |
| *A refused box changes colour, not weight alone, when the idle ring is already full ink* | CLAUDE.md, the enquiry form (Lime's layout 4) | form; L2: form; L3: form — read and found **not** to apply, the hairline idle ring making Lime's 2px both at once; L4: calendar, form — met by Lime's 2px white against a 15% or red idle ring, no arm |
| *`vm.title` shadows the ramp's `title` size* — write the size as a literal | lime/layout-1, *Settled in section 6* | header, media, map, testimonials; L3: calendar, map, testimonials; L4: header (the kicker) |
| *Under Lime `pillBg` IS the accent* — a second hue on an accent sheet needs a named stand-in | lime/layout-1, *Settled in session 0* / *section 1* | header cards 2 and 3; L2: header |
| *Emptied content drops its node* | lime/layout-1, *Settled in section 7* | pricing |
| *A stand-in face is scaled to the frame's glyph size, its line height divided back out* (`faced`, `facedLh`) | grunge/layout-1, *Settled in section 1* | every display string; L2: every display string; L3: every display string **but one** — `faced` is for a glyph the frame states, and the testimonials' 24px face-stack disc has none (section 10), so its 11px mark was left where it is; L4: every display string, the testimonials' marks included — a stated glyph, so `faced` applies |
| *Casing stays the theme's; an all-caps face's strings take `textTransform` per site* | grunge/layout-1, *Settled in session 0* | every display string; L3: every display string; L4: every display string |
| *Do not refresh the root `index.html` per section; it is the sweep's last step* | lime/layout-1, *Per-session procedure* | the pass; L2: the pass; L3: the pass; L4: the pass |

## D. Lime's blocks, inherited by a template that widens them

These are facts about particular blocks, not conventions a new composition would meet. Grunge
inherited each unchanged because its pages *are* those blocks.

### D1. Lime's layout-1 blocks

All are in [`lime/layout-1.md`](./lime/layout-1.md) under the section named.

| Section | Bullets |
|---|---|
| 1 header | *`BookPill` has a Lime branch* (`Pager` took its shape in section 5) |
| 4 gallery | *Transcribed glyphs share one viewBox when they share a container* |
| 5 repertoire | *The 768 halves take `flex: 1 1 50%`*; *the search pill's ring is an inset `boxShadow`* |
| 6 map | *The 390 page is five gigs*; the compact `pageWindow` at every width; *the 390 band sheet is drawn full* (grunge/layout-1, section 6) |
| 7 pricing | *The glow is a seat: rendered index `i % 3 === 1`* (under Grunge the seat carries a rule) |
| 8 calendar | *The panel's ring is an overlay*; *booked is the frame's own state: opacity .38, no strike*; *the foot keeps Retro's BookPill* |
| 10 testimonials | *The backs are insets off the card*; *the 390 card bleeds into the root's padding*; *the wide arrows centre on the wrap* |
| 11 footer | *The tenth Lime block, at the head of `Footer`*; *three rules the twin does not draw*; *the 768 small print's 56 inset is a leak, and it is followed*; *the link cursor is not live-gated* |

### D2. Lime's layout-2 blocks

All are in [`lime/layout-2.md`](./lime/layout-2.md) under *Settled in section N* for the section
named (Lime's numbers counted the video frame, so they run one ahead from the repertoire on;
the rows here are Grunge's page order); the placement of
each block — which decides how it widens — is the sections table of
[`grunge/layout-2.md`](./grunge/layout-2.md). The footer is layout 1's (`NVAR.footer` is 1).

| Section | Bullets |
|---|---|
| 1 header | *The first layout-2 block: `if (s.lime) { … return }` at the head of `HeaderV1`*; *the capsule's links hold one row by budgeting the whole bar*; *the Scheme 4 nav pill recipe* and *`pk` 0.7547*; *the digest's header arch 5 folds onto arch 1* |
| 2 bio | *The second layout-2 block, ahead of `Bio`'s `if (s.v1)`*; *a chip standing on `s.box1` takes a darker seat*; *a hand-scaled instance is not the ramp*; *the 115 × 35 pale pill is not always hand-shrunk at 390* |
| 3 media | *The third block, after `nowArt`*; *the featured tag sits at the frame's 26.5 / 26*; *row rules are top-only*; *`tilt()` is Retro's alone, so a Lime fan writes its angle out* |
| 4 repertoire | *The fourth block, after the seam*; *rows pin at each master's division result* |
| 5 gallery | *The first layout-2 section with no block: `s.lime` ternaries through `Gallery`'s `if (s.v1)`*; *`size/chip` is `s.chip` exactly* |
| 6 pricing | *The fifth block, after `sel` / `t`*; *the frame's selected chip is invisible, so it is redrawn*; *the pill is `BookPill`'s defaults exactly* |
| 7 calendar | *The sixth block, after `want` / `hit` / `cur` / `line`*; *the pin is re-measured per face* (Retro 2: *measure the pin, never transcribe it*); *a blocked slot takes layout 1's Lime state*; *the 390 foot stacks* |
| 8 map | *The seventh block, after `stats`*; *the raster: Retro's call is followed* |
| 9 form | *The layout-2 block ahead of `EnquiryForm`'s `if (s.v1)`*; *the label is uppercased as a string* |
| 10 testimonials | *The ninth block, after `rail`*; *the rail's mechanism is the frame's at every width* |

### D3. Lime's layout-3 blocks

All are in [`lime/layout-3.md`](./lime/layout-3.md) under *Settled in section N* for the section
named (Lime's layout-3 numbering is Grunge's page order already). The placement of each block —
which decides how it widens — is the sections table of
[`grunge/layout-3.md`](./grunge/layout-3.md). The footer is layout 1's (`NVAR.footer` is 1), and
the bio, the media player and the calendar also render in the composed row's 684 / 323 columns.

| Section | Bullets |
|---|---|
| 1 header | *The first layout-3 block: `if (s.lime) { … return }` at the head of `HeaderV2`*; *the nav is HeaderV1's two halves, not the frame's five cells*; *the 390 master is written out, not derived* |
| 2 bio | *The first layout-3 block inside a section, ahead of `Bio`'s `if (s.v2)`*; *"`SealBadge`'s Lime branch" was wrong for this frame* (`Frame 248` is Retro's §10.2 seal — Grunge's is `Frame 178` instead); *`preview.jsx` takes `&column=left` / `&column=right`* |
| 3 media | *The first layout-3 block inside a branch, after `nHot`*; *the rows are content-tall*; *the heading's measure is the frame's own 632 box on desktop only* |
| 4 repertoire | *After `arrow`, the seat layouts 1 and 2 used*; *seat the schemes by rendered place, not by index* (Grunge re-reads the seating: its colours are a different set) |
| 5 calendar | *After `line`*; *the card's 2px ring*; *the pill is Scheme 2* |
| 6 gallery | *No block: `s.lime` ternaries through `Gallery`'s `if (s.v2)`*; *the tile ratio is re-derived, not inherited*; *the viewer is re-inked, not restructured* |
| 7 pricing | *After `shown`*; *a plain row is the page ground in a 1px `sem/stroke/2`*; *the featured row's pill is the pair* |
| 8 map | *After `litRow`*; *rings are the frame's weights, opacities and dash*; *the raster is drawn as it is* |
| 9 form | *After `up`*; *the desktop head shrinks to fit its widest word* (`vm.titleWordEms` — Lime's alone; Grunge measured 484 against the 501 column and kept it) |
| 10 testimonials | *After `template`*; *a three-entry `REG` over Retro's own `SEATS` order* (Grunge's is a two-register `REG` and a `SEATS` of its own) |

### D4. Lime's layout-4 blocks

All are in [`lime/layout-4.md`](./lime/layout-4.md) under *Settled in section N* for the section
named (Lime's layout-4 numbering is Grunge's page order already), as QA left them —
[`lime/layout-4-qa-fixes.md`](./lime/layout-4-qa-fixes.md) rebuilt the calendar's right column
and its mailto (JP-052, JP-053), the form's copy (JP-054) and the page-ground sections' inset
(JP-038). The placement of each block — which decides how it widens — is the sections table of
[`grunge/layout-4.md`](./grunge/layout-4.md); this is the first page where every section has a
block, the gallery included. The footer is layout 1's (`NVAR.footer` is 1). Grunge's seams are
`TornEdge`'s path, not the arcs, so Lime's arc bullets (media's open questions 1 and 2, the
gallery's open question 5) name what Grunge declined rather than inherited.

| Section | Bullets |
|---|---|
| 1 header | *The first layout-4 block: `if (s.lime) { … return }` at the head of `HeaderV3`*; *the nav is `NavBar`'s Lime capsule, reused whole* (Grunge added `links` and `mark`); *the seal is `SealBadge`'s Lime disc in another scheme's inks, and it changes colour* (Grunge added a `scheme` 4 arm); *the 1440 photograph is mirrored* (Lime's alone: Grunge's fill is `FILL`) |
| 2 bio | *The second layout-4 block: `if (s.v3 && s.lime)` ahead of `Bio`'s `if (s.v3)`*; *the instance changes scheme between widths, and the wells move with it*; *the Genres label is not drawn*; *the 1px `#000000` ring is a last-child overlay* |
| 3 media | *The third layout-4 block: `if (s.v3 && s.lime)` ahead of `Media`'s `if (s.v3)`*; *the insets are the band's and the instance's, added up*; *the second width trap, met: the 390 instance is in `Device: Tablet`* (Grunge's 768 and 390 both) |
| 4 gallery | *The fourth layout-4 block, and the first inside its branch*; *Lime's wide masters mark the active thumb, where Retro's did not* (Grunge keeps the 1 / 3 / 4 mechanism in black); *the lens, checked in the editor at all three widths* (under Grunge one dark tear); *the thumbs and the spotlight stay top-anchored* |
| 5 repertoire | *The fifth layout-4 block, inside its branch after the seam*; *the type is the ramp, and it is why the instance is taller*; *the foot seam is `s.bg` at every width* |
| 6 map | *The sixth layout-4 block, inside its branch after the seam*; *the card's ring is a last-child overlay*; *the viewport is layout 3's recipe verbatim* |
| 7 pricing | *The seventh layout-4 block, inside its branch after the seam*; *the rule is an inset shadow, not Retro's border*; *the pill is BookPill's Lime branch with the pair turned round* (needed nothing under Grunge) |
| 8 calendar | *The eighth layout-4 block, inside its branch after the seam*; *two pills in other schemes, read off `explicitVariableModes`* (Send Enquiry is Scheme 2 again); *Reversed* (JP-052's summary column) |
| 9 form | *The ninth layout-4 block, ahead of its branch*; *both rules are inset shadows, not borders*; *a refused box changes colour, not only weight: 2px of `s.tx`* (white on red under Grunge, no arm); *the vertical inset is the root's, named*; *Reversed 2026-09-23* (JP-054's copy) |
| 10 testimonials | *The tenth layout-4 block, inside its branch after the seam*; *the desktop cell is 344, not Retro's 406*; *the glyph is the frame's own → path*; *named diffs, inherited* (the unreachable fourth seat — red under Grunge) |

## What is deliberately not here

- **A template's decorative language** — Retro's grain, torn edges, checkerboard and offset
  shadows; Lime's arcs and glows; Grunge's tears, lighten grain and seals. Each plan's
  *decorative language* section owns its own.
- **The `sectionVm` and live-seam rules.** They are CLAUDE.md's, and every plan reads that first.
- **The per-session procedure and the sweep list.** Lime layout 1's are the canonical ones; a new
  plan writes deltas against them, as Grunge's does.
