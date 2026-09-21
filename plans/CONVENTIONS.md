# Shared conventions

The conventions a **third** template leaned on. `plans/README.md` asked for this file "once a
second template shows which is which"; Lime showed it, and Grunge's layout-1 pass tested it:
every bullet below is one a Grunge session actually used (its running list is *Conventions →
Inherited and used* in [`grunge/layout-1.md`](./grunge/layout-1.md)), not one that merely reads
as general.

This file **names and locates; it does not restate.** Each line is the bullet's own bold title,
the plan and heading it lives under, and the Grunge sections that leaned on it. Read the bullet
where it was written — its numbers and its reasons are there. Line numbers drift, so search the
title.

A new template's first plan says which group it inherits: **A** and **B** always; **C** if it
is another variable mode of a page already fitted (Editorial and Pop will say, from the Figma
file, whose twin they are); **D** only if its blocks are widened Lime layout-1 blocks, as
Grunge's are.

## A. Reading Figma

Sources: the `figma-frame-reading` memory note, [`retro/layout-2.md`](./retro/layout-2.md) and
[`lime/layout-1.md`](./lime/layout-1.md).

| Convention | Where | Leaned on in Grunge |
|---|---|---|
| *`get_variable_defs` resolves a node's mode; the emitted tokens are the desktop default* | memory: `figma-frame-reading` | every section |
| *Read a section node, never the desktop page, for variables* (the page frame is set to another template's mode) | grunge/layout-1, *Conventions* | every section |
| *A rotated group's metadata x/y is a bounding box* | memory: `figma-frame-reading` | header (the seal) |
| *The emitted DOM order is the frame's paint order* | memory: `figma-frame-reading` | media, map |
| *The emitted `var(--token, #hex)` fallback is the component's default, not the instance's* | retro/layout-2, *Conventions* (media) | header, bio |
| *Check a narrow master's Device mode before trusting `s.*` on it* | lime/layout-1, *Settled in section 1* | header |
| *Leaked tops are followed where they show, dropped where they don't* | lime/layout-1, *Settled in section 4* | gallery, footer |
| *A leak that shows and reads as a defect is overridden* | grunge/layout-1, *Settled in section 4* | pricing, calendar |
| *An opacity-0 node is a spacer* | lime/layout-1, *Settled in section 3* | media |
| *A stated list height is a column minimum* | lime/layout-1, *Settled in section 3* | media |
| *`get_variable_defs` mixes nested schemes in one list; the `use_figma` fills settle which node is on which* | lime/layout-1, *Settled in section 9* | form |
| *Every glow is a guess until the node's `effects` confirm it; scan before deciding on a drop shadow* | lime/layout-1, *Lime's decorative language* and *Settled in section 10* | bio, gallery, pricing, calendar (every guess wrong: each ring was a plain stroke) |
| *Load a Google Font the frames name; substitute only on a user call* | memory: `load-figma-fonts`; grunge/layout-1, *decision 1* | session 0 |

## B. Measuring and proving

Sources: [`retro/layout-2.md`](./retro/layout-2.md), [`lime/layout-1.md`](./lime/layout-1.md),
and the `verifying-the-published-tab` and `browser-tool-choice` memory notes.

| Convention | Where | Leaned on in Grunge |
|---|---|---|
| *The digest is committed: `source/scripts/digest.mjs`* — before / after, `cmp` per file, the other four themes at zero rows every session | lime/layout-1, *Settled in session 0* | every section |
| *One five-theme digest is the whole proof for a shared-helper change*; filter on `_theme_N_` | lime/layout-1, *Learned on the end-of-pass sweep* | repertoire (`Pager`), the sweep (`Photo`) |
| *`textTransform` is a digest column* | grunge/layout-1, *Settled in section 5* | repertoire, footer |
| *A seeded page cannot show an empty slot* — `&noimage=1` | lime/layout-1, *Learned on the end-of-pass sweep* | the sweep |
| *Divide the face out before comparing any width* | retro/layout-2, *Learned on the header's narrow masters* | header (it became `faced()`) |
| *Place a seal by its disc's centre, off the edges of what it hangs on* | lime/layout-1, *Settled in section 2* | bio, pricing, footer |
| *Measure anything under `.seal-spin` with the animation stopped* | lime/layout-1, *Settled in section 2* | bio |
| *The popup is `about:blank`: drive it from the opener* | memory: `verifying-the-published-tab` | every live check |
| *The whole-page published check is one puppeteer script* — now committed, `source/scripts/page-check.mjs <Template>` | lime/layout-1, *Learned on the end-of-pass sweep* | the sweep |
| *The two-build digest walks the editor* — old build digested **before** the `cp` | lime/layout-1, *Learned on the end-of-pass sweep* | the sweep |
| *Field reach is measured, not read off the prose* — `source/scripts/reach.mjs` | CLAUDE.md, the `FIELDS` bullet | the sweep (the header's `Grunge` rows) |

## C. Dressing a shared branch in a second mode

Sources: [`lime/layout-1.md`](./lime/layout-1.md); the gate idiom is
[`grunge/layout-1.md`](./grunge/layout-1.md), *decision 2*.

| Convention | Where | Leaned on in Grunge |
|---|---|---|
| *The gates are the template's flag, the named pairs, and `s.designed`*; widen per site from the frame, never by grep; never edit another template's literal | grunge/layout-1, *decision 2* and *Conventions* | every section |
| *A section whose live seam is hoisted above its branches can always take a block* | lime/layout-1, *Settled in section 3* | media, form |
| *Where the seam lives inside the branch, the block goes after the seam* | lime/layout-1, *Settled in section 4* | gallery, repertoire, map |
| *Retro's live states vanish under Lime; redraw them, never inherit them* | lime/layout-1, *Settled in section 6* | repertoire, map, calendar, form (four redrawn states) |
| *A refused box changes colour, not weight alone, when the idle ring is already full ink* | CLAUDE.md, the enquiry form (Lime's layout 4) | form |
| *`vm.title` shadows the ramp's `title` size* — write the size as a literal | lime/layout-1, *Settled in section 6* | header, media, map, testimonials |
| *Under Lime `pillBg` IS the accent* — a second hue on an accent sheet needs a named stand-in | lime/layout-1, *Settled in session 0* / *section 1* | header cards 2 and 3 |
| *Emptied content drops its node* | lime/layout-1, *Settled in section 7* | pricing |
| *A stand-in face is scaled to the frame's glyph size, its line height divided back out* (`faced`, `facedLh`) | grunge/layout-1, *Settled in section 1* | every display string |
| *Casing stays the theme's; an all-caps face's strings take `textTransform` per site* | grunge/layout-1, *Settled in session 0* | every display string |
| *Do not refresh the root `index.html` per section; it is the sweep's last step* | lime/layout-1, *Per-session procedure* | the pass |

## D. Lime's layout-1 blocks, inherited by a template that widens them

These are facts about eleven particular blocks, not conventions a new composition would meet.
Grunge inherited each unchanged because its page *is* those blocks. All are in
[`lime/layout-1.md`](./lime/layout-1.md) under the section named.

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

## What is deliberately not here

- **A template's decorative language** — Retro's grain, torn edges, checkerboard and offset
  shadows; Lime's arcs and glows; Grunge's tears, lighten grain and seals. Each plan's
  *decorative language* section owns its own.
- **The `sectionVm` and live-seam rules.** They are CLAUDE.md's, and every plan reads that first.
- **The per-session procedure and the sweep list.** Lime layout 1's are the canonical ones; a new
  plan writes deltas against them, as Grunge's does.
