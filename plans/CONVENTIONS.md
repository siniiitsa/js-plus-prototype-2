# Shared conventions

The conventions a **third** template leaned on. `plans/README.md` asked for this file "once a
second template shows which is which"; Lime showed it, and Grunge's layout-1 pass tested it:
every bullet below is one a Grunge session actually used (its running lists are *Conventions →
Inherited and used* in [`grunge/layout-1.md`](./grunge/layout-1.md) and
[`grunge/layout-2.md`](./grunge/layout-2.md)), not one that merely reads as general. The
layout-2 pass added the rows it leaned on three times or more that the file did not name, and
its sections are listed after the layout-1 ones as *L2:*.

This file **names and locates; it does not restate.** Each line is the bullet's own bold title,
the plan and heading it lives under, and the Grunge sections that leaned on it. Read the bullet
where it was written — its numbers and its reasons are there. Line numbers drift, so search the
title.

A new template's first plan says which group it inherits: **A** and **B** always; **C** if it
is another variable mode of a page already fitted (Editorial and Pop will say, from the Figma
file, whose twin they are); **D** only if its blocks are widened Lime blocks, as Grunge's are —
D1 for Lime's layout-1 blocks, D2 for its layout-2 ones.

## A. Reading Figma

Sources: the `figma-frame-reading` memory note, [`retro/layout-2.md`](./retro/layout-2.md) and
[`lime/layout-1.md`](./lime/layout-1.md).

| Convention | Where | Leaned on in Grunge |
|---|---|---|
| *`get_variable_defs` resolves a node's mode; the emitted tokens are the desktop default* | memory: `figma-frame-reading` | every section; L2: every section |
| *Read a section node, never the desktop page, for variables* (the page frame is set to another template's mode) | grunge/layout-1, *Conventions* | every section |
| *A rotated group's metadata x/y is a bounding box* | memory: `figma-frame-reading` | header (the seal) |
| *The emitted DOM order is the frame's paint order* | memory: `figma-frame-reading` | media, map |
| *The emitted `var(--token, #hex)` fallback is the component's default, not the instance's* | retro/layout-2, *Conventions* (media) | header, bio; L2: header (a node's font too), bio, testimonials |
| *Check a narrow master's Device mode before trusting `s.*` on it* | lime/layout-1, *Settled in section 1* | header; L2: every section |
| *Leaked tops are followed where they show, dropped where they don't* | lime/layout-1, *Settled in section 4* | gallery, footer; L2: gallery |
| *A leak that shows and reads as a defect is overridden* | grunge/layout-1, *Settled in section 4* | pricing, calendar; L2: gallery, calendar (turned round: a rule the twin declined, drawn) |
| *An opacity-0 node is a spacer* | lime/layout-1, *Settled in section 3* | media |
| *A stated list height is a column minimum* | lime/layout-1, *Settled in section 3* | media |
| *`get_variable_defs` mixes nested schemes in one list; the `use_figma` fills settle which node is on which* | lime/layout-1, *Settled in section 9* | form; L2: header, media, calendar, map |
| *Every glow is a guess until the node's `effects` confirm it; scan before deciding on a drop shadow* | lime/layout-1, *Lime's decorative language* and *Settled in section 10* | bio, gallery, pricing, calendar (every guess wrong: each ring was a plain stroke); L2: every section (no Lime glow survived on any Grunge node) |
| *The node walker, kept* — one `use_figma` call per master returning every box, paint, stroke, effect, radius and text segment | grunge/layout-2, *Conventions* | L2: sections 2–7 |
| *The paired diff walk* — flatten the master and its twin in traversal order and return only what differs; keep per-node fields short, since a return truncates at 20 KB | grunge/layout-2, *Settled in section 8* | L2: map, form, testimonials |
| *Read a fill's `scaleMode` before believing its `imageTransform`; correlate the render with the seed when in doubt* | grunge/layout-2, *Settled in section 1* | L2: header, bio |
| *Load a Google Font the frames name; substitute only on a user call* | memory: `load-figma-fonts`; grunge/layout-1, *decision 1* | session 0 |

## B. Measuring and proving

Sources: [`retro/layout-2.md`](./retro/layout-2.md), [`lime/layout-1.md`](./lime/layout-1.md),
and the `verifying-the-published-tab` and `browser-tool-choice` memory notes.

| Convention | Where | Leaned on in Grunge |
|---|---|---|
| *The digest is committed: `source/scripts/digest.mjs`* — before / after, `cmp` per file, the other four themes at zero rows every session | lime/layout-1, *Settled in session 0* | every section; L2: every section |
| *Theme 1 is the digest at risk in a widened block* — every edit sits inside a block the twin renders | grunge/layout-1, *Settled in section 2* | L2: every section (zero nine times) |
| *One five-theme digest is the whole proof for a shared-helper change*; filter on `_theme_N_` | lime/layout-1, *Learned on the end-of-pass sweep* | repertoire (`Pager`), the sweep (`Photo`) |
| *`textTransform` is a digest column* | grunge/layout-1, *Settled in section 5* | repertoire, footer |
| *A seeded page cannot show an empty slot* — `&noimage=1` | lime/layout-1, *Learned on the end-of-pass sweep* | the sweep |
| *Divide the face out before comparing any width* | retro/layout-2, *Learned on the header's narrow masters* | header (it became `faced()`) |
| *Place a seal by its disc's centre, off the edges of what it hangs on* | lime/layout-1, *Settled in section 2* | bio, pricing, footer |
| *Measure anything under `.seal-spin` with the animation stopped* | lime/layout-1, *Settled in section 2* | bio |
| *The popup is `about:blank`: drive it from the opener* | memory: `verifying-the-published-tab` | every live check |
| *The whole-page published check is one puppeteer script* — now committed, `source/scripts/page-check.mjs <Template> [cards]`, the first card listed getting the full walk | lime/layout-1, *Learned on the end-of-pass sweep* | the sweep; L2: header, the sweep |
| *The two-build digest walks the editor* — old build digested **before** the `cp` | lime/layout-1, *Learned on the end-of-pass sweep* | the sweep; L2: the sweep |
| *Field reach is measured, not read off the prose* — `source/scripts/reach.mjs` | CLAUDE.md, the `FIELDS` bullet | the sweep (the header's `Grunge` rows); L2: header, map, form, the sweep |

## C. Dressing a shared branch in a second mode

Sources: [`lime/layout-1.md`](./lime/layout-1.md); the gate idiom is
[`grunge/layout-1.md`](./grunge/layout-1.md), *decision 2*.

| Convention | Where | Leaned on in Grunge |
|---|---|---|
| *The gates are the template's flag, the named pairs, and `s.designed`*; widen per site from the frame, never by grep; never edit another template's literal | grunge/layout-1, *decision 2* and *Conventions* | every section |
| *A section whose live seam is hoisted above its branches can always take a block* | lime/layout-1, *Settled in section 3* | media, form; L2: bio, form |
| *Where the seam lives inside the branch, the block goes after the seam* | lime/layout-1, *Settled in section 4* | gallery, repertoire, map; L2: repertoire, gallery, calendar, map, testimonials |
| *The `G` lookup at the block's head, whose twin's arm is today's literals* — so the twin digests to zero | grunge/layout-1, *Settled in sections 4–10* | L2: pricing, calendar, map, form, testimonials |
| *A section on another scheme writes that scheme's values as named literals*, since no vm key holds them — and one twin literal can map to two (Grunge's two Scheme 3 reds) | grunge/layout-1, *Settled in section 1* (`HeaderV0`'s `G2`); grunge/layout-2, *Conventions* | L2: media, calendar, map, testimonials |
| *A frame's inside stroke is an inset `boxShadow`, on an overlay where an image or a child paints over it*, so every stated height holds | lime/layout-2, *Settled in section 1* (the `sem/stroke/2` bullet) | L2: header, repertoire, pricing, calendar |
| *A hard offset shadow goes through the caller's `style`, never a shared pill's props* | lime/layout-2, *Settled in section 2* (open question 2's route 1) | L2: header, bio, calendar |
| *Retro's live states vanish under Lime; redraw them, never inherit them* | lime/layout-1, *Settled in section 6* | repertoire, map, calendar, form (four redrawn states) |
| *A refused box changes colour, not weight alone, when the idle ring is already full ink* | CLAUDE.md, the enquiry form (Lime's layout 4) | form; L2: form |
| *`vm.title` shadows the ramp's `title` size* — write the size as a literal | lime/layout-1, *Settled in section 6* | header, media, map, testimonials |
| *Under Lime `pillBg` IS the accent* — a second hue on an accent sheet needs a named stand-in | lime/layout-1, *Settled in session 0* / *section 1* | header cards 2 and 3; L2: header |
| *Emptied content drops its node* | lime/layout-1, *Settled in section 7* | pricing |
| *A stand-in face is scaled to the frame's glyph size, its line height divided back out* (`faced`, `facedLh`) | grunge/layout-1, *Settled in section 1* | every display string; L2: every display string |
| *Casing stays the theme's; an all-caps face's strings take `textTransform` per site* | grunge/layout-1, *Settled in session 0* | every display string |
| *Do not refresh the root `index.html` per section; it is the sweep's last step* | lime/layout-1, *Per-session procedure* | the pass; L2: the pass |

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

## What is deliberately not here

- **A template's decorative language** — Retro's grain, torn edges, checkerboard and offset
  shadows; Lime's arcs and glows; Grunge's tears, lighten grain and seals. Each plan's
  *decorative language* section owns its own.
- **The `sectionVm` and live-seam rules.** They are CLAUDE.md's, and every plan reads that first.
- **The per-session procedure and the sweep list.** Lime layout 1's are the canonical ones; a new
  plan writes deltas against them, as Grunge's does.
