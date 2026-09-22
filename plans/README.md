# Design-pass plans

Each pass of fitting a template to Figma gets its own working checklist, and the work goes one section
per session, clearing context between sections. A plan is also that pass's memory: what each
section settled gets written back into it as the pass goes.

## Layout

One folder per template, one file per pass:

```
plans/
  CONVENTIONS.md   ← the conventions every template shares, named and located
  retro/
    layout-2.md
    layout-3.md
    layout-4.md
    qa-fixes.md
  lime/
    layout-1.md
    layout-2.md
    layout-3.md
    layout-4.md
    qa-fixes.md
    layout-2-qa-fixes.md
  grunge/
    layout-1.md
    layout-2.md
  editorial/   ← not started
  pop/         ← not started
```

A pass that fits layout N of every section is `layout-N.md`. A pass of some other kind gets a
name that says what it fits. The template folder names match `THEMES[].name` in
`source/src/builder/data.js`, lowercased.

## Retro

| Pass | Plan | Branch | Fitted |
|---|---|---|---|
| Layout 1 | — | — | Predates the plan files. It's the `s.v0` branch of every section. |
| Layout 2 | [`retro/layout-2.md`](./retro/layout-2.md) | `retro-layout-2` (merged) | `s.v1`, desktop first, then the 768 and 390 masters. |
| Layout 3 | [`retro/layout-3.md`](./retro/layout-3.md) | `retro-layout-3` (merged) | `s.v2`, all three widths per session. |
| Layout 4 | [`retro/layout-4.md`](./retro/layout-4.md) | `retro-layout-4` (merged) | `s.v3`, all three widths per session, plus the end-of-pass sweep. |
| QA fixes | [`retro/qa-fixes.md`](./retro/qa-fixes.md) | `artist-name-from-title` (done, not yet merged) | Not a fit: a batch of tester-reported defects (F2 … F25), one bug per session, plus the end-of-pass sweep. All nine fixed; the sweep deleted two dead fields and their fallthroughs, and made `BookedField` page the published window. |

**Reading order in a Retro session:** read `CLAUDE.md` first, then the current plan, then the
*Conventions* of every earlier plan, newest first. Each plan says it doesn't repeat its
predecessors' bullets, so layout 4's session also reads the Conventions of layouts 3 and 2.

## Lime

| Pass | Plan | Branch | Fitted |
|---|---|---|---|
| Layout 1 | [`lime/layout-1.md`](./lime/layout-1.md) | `lime-layout-1` (merged) | Retro layout 1's eleven components in Lime's Figma mode: a token foundation (session 0), then `s.lime` decoration inside the shared `s.v0` branches, and the header's four modal cards, plus the end-of-pass sweep. |
| Layout 2 | [`lime/layout-2.md`](./lime/layout-2.md) | `lime-layout-2`, forked from `lime-layout-1` (merged, PR #14) | Retro layout 2's eleven compositions in Lime's mode: `s.lime` decoration inside the shared `s.v1` branches, all three widths per session (video dropped), plus the end-of-pass sweep. Card 2 of the setup modal is a fitted page. |
| Layout 3 | [`lime/layout-3.md`](./lime/layout-3.md) | `lime-layout-3`, forked from `main` (merged, PR #15) | Retro layout 3's ten compositions in Lime's mode — `s.lime` decoration inside the shared `s.v2` branches, and a Lime `HeaderV2` (a different composition, not only a re-ink) — all three widths per session, the composed page inherited from Retro's QA, plus the end-of-pass sweep. Card 3 of the setup modal is a fitted page. |
| Layout 4 | [`lime/layout-4.md`](./lime/layout-4.md) | `lime-layout-4`, forked from `main` (closed, not yet merged) | Retro layout 4's ten compositions in Lime's mode — `s.lime` decoration inside the shared `s.v3` branches, a Lime `HeaderV3` (a glass nav capsule and no checker floor), and the page's first arc seams since layout 1 — all three widths per session, plus the end-of-pass sweep. Card 4 of the setup modal is a fitted page, which **closes the Lime family**: all four of its header cards lay out fitted pages. |
| QA fixes | [`lime/qa-fixes.md`](./lime/qa-fixes.md) | `lime-qa-fixes`, from `main` (swept and pushed; PR, merge and the deployed build stamp still open) | Not a fit: the tester's reports against layout 1 (JP-033 header nav labels, JP-034 the media player's dead Soundcloud pill, JP-035 = F1 re-filed against a stale build), one bug per session, plus a sweep that ends by handing the tester the deployed build stamp. |
| Layout 2 QA fixes | [`lime/layout-2-qa-fixes.md`](./lime/layout-2-qa-fixes.md) | `lime-layout-2-qa-fixes`, forked from `main` (swept; push, PR, merge and the deployed build stamp still open) | Not a fit: the tester's layout-2 reports (JP-036 … JP-042, plus JP-033 re-filed with JP-041), one entry per session, plus the end-of-pass sweep. Several are shared seams, so Retro moved with them. Six fixed (JP-040 on the PO's call, A), JP-038 and JP-041 closed as by design; the sweep's Settled carries a reply line per ticket. |

**Reading order in a Lime session:** `CLAUDE.md`, then the plan, then the sections it names at its top. Layout 2 also reads layout 1's whole *Conventions*, since that pass built the foundation; layout 3 reads both, and Retro layout 3's *Conventions* and *Addendum*, since that pass built the branches it dresses; layout 4 reads all three Lime *Conventions*, and Retro layout 4's *Conventions* and *Addendum*.

## Grunge

| Pass | Plan | Branch | Fitted |
|---|---|---|---|
| Layout 1 | [`grunge/layout-1.md`](./grunge/layout-1.md) | `grunge-layout-1`, forked from `main` (closed and swept; push, PR and merge are the user's call) | Retro and Lime layout 1's eleven components in the Figma mode **Static Youth**: a token foundation (session 0, which opens on a user call — the display face, Stones Crush, is not a Google Font), then `s.grunge` decoration inside the shared `s.v0` branches, a shared `s.designed` gate, the header's four modal cards, plus the end-of-pass sweep, which extracted [`CONVENTIONS.md`](./CONVENTIONS.md). Written as deltas against Lime layout 1. Card 1 of the setup modal is a fitted page; cards 2–4 are placeholders that render and publish, each its own layout pass's to fit. |
| Layout 2 | [`grunge/layout-2.md`](./grunge/layout-2.md) | `grunge-layout-2`, forked from `grunge-layout-1` (in progress since 2026-09-22; sections 1–9 — the header, the bio, the media player, the repertoire, the gallery, the pricing, the booking calendar, the events map and the enquiry form — done) | Lime layout 2's ten compositions in Static Youth: each Lime layout-2 block widened to `(s.lime || s.grunge)` with the Grunge deltas inside it, all three widths per session, plus the end-of-pass sweep. Written as deltas against Lime layout 2 and Grunge layout 1. Card 2 of the setup modal becomes a fitted page; the footer is layout 1's. |

**Reading order in a Grunge session:** `CLAUDE.md`, then the plan, then [`CONVENTIONS.md`](./CONVENTIONS.md)
and the bullets it points at, and Lime layout 1's *Per-session procedure*. The layout-2 pass also reads
layout 1's whole *Conventions*, since that pass built the foundation, and — because each session widens
a Lime layout-2 block — that section's *Settled* bullet in Lime layout 2's *Conventions* and the Lime
layout-2 QA entries that moved the same seam.

## Other templates

Editorial and Pop work, but they render flat (see CLAUDE.md, *Retro and Lime are designed*). When one
of them gets its first plan:

- Start its folder here, and add a table to this file.
- Say which groups of [`CONVENTIONS.md`](./CONVENTIONS.md) it inherits — the file Grunge's sweep
  extracted, from the bullets a third template actually leaned on. Reading Figma, and measuring and
  proving, always carry over; a template's decorative language (`s.retro`'s grain and torn edges,
  Lime's arcs, Grunge's tears) never does. Keep a running *Inherited and used* list as Grunge's plan
  did, and fold what it confirms back into that file in the sweep.

`SPEC.md`, which the plans number against, lives in git history: `git show 8fa8ff4:SPEC.md`.
