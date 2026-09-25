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
    layout-3-qa-fixes.md
    layout-4-qa-fixes.md
    retest-qa-fixes.md
  grunge/
    layout-1.md
    layout-2.md
    layout-3.md
    layout-4.md
  editorial/
    layout-1.md
    layout-2.md
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
| Layout 2 QA fixes | [`lime/layout-2-qa-fixes.md`](./lime/layout-2-qa-fixes.md) | `lime-layout-2-qa-fixes`, forked from `main` (swept; push, PR, merge and the deployed build stamp still open) | Not a fit: the tester's layout-2 reports (JP-036 … JP-042, plus JP-033 re-filed with JP-041), one entry per session, plus the end-of-pass sweep. Several are shared seams, so Retro moved with them. Six fixed (JP-040 on the PO's call, A), JP-038 and JP-041 closed as by design (JP-038 and JP-039 reopened 2026-09-23 on branch `lime-qa-reopen`: the published desktop zooms to the frame, and layouts 2 and 3 default to Minimal — entries appended); the sweep's Settled carries a reply line per ticket. |
| Layout 3 QA fixes | [`lime/layout-3-qa-fixes.md`](./lime/layout-3-qa-fixes.md) | `lime-layout-3-qa-fixes`, forked from `main` (swept, with the root `index.html` refreshed; push, PR, merge and the deployed build stamp still open) | Not a fit: the tester's layout-3 reports (JP-048 blank packages, JP-049 the unchecked enquiry address, JP-050 the empty Title, JP-051 a blank form field), one entry per session, plus the end-of-pass sweep. None is inside an `s.lime` block, so every template moves. All four fixed (JP-050 under decision A: the Title is required); JP-051 extended the blank-row rule to all seven repeaters. The seeded page is byte-identical to `main` (387 + 387); the sweep's Settled carries a reply line per ticket. JP-045 is not in this batch. |
| Layout 4 QA fixes | [`lime/layout-4-qa-fixes.md`](./lime/layout-4-qa-fixes.md) | `lime-layout-4-qa-fixes`, forked from `main` (`01fa29b`; swept, with the root `index.html` refreshed; push, PR, merge and the deployed build stamp still open) | Not a fit, though two entries refit: the tester's layout-4 reports (JP-052 Book Us' right column misreads the frame as `CAL_SLOTS`, JP-053 the wizard's answers go nowhere, JP-054 the form's layout-4 copy, JP-055 a blank track and gig, and JP-038 filed a third time as a section-inset mismatch between page-ground and sheet sections), one entry per session, plus the end-of-pass sweep. JP-048 to JP-051 were re-reported from a build older than PR #31, so they get reply lines only. The calendar and form seams are shared, so Retro moves with them. Four fixed: JP-052 (the right column is the wizard's summary, and layout 2's slots get `SlotsField`), JP-053 (the wizard mails), JP-054 (PO call A) and JP-038 (layout 4's page-ground sections take the frame's inset). JP-055 did not reproduce on `main`. Against `main`, the seeded page moves in exactly map, pricing, calendar and form `arch 3` (36 + 36 of 387 + 387), and every one of those is named. The sweep's Settled carries a reply line per ticket. |
| Retest QA fixes | [`lime/retest-qa-fixes.md`](./lime/retest-qa-fixes.md) | `lime-retest-qa-fixes`, forked from `main` (`a0baef8`; swept, with the root `index.html` refreshed; push, PR, merge and the deployed build stamp still open) | Not a fit: the tester's retest of the three Lime QA batches against the current build, plus the layout-3 reports JP-043 … JP-047 never handed over before, one entry per session, plus the end-of-pass sweep. Eight fixed: JP-049's warning, JP-045's canvas Tickets →, JP-044's clipped titles, JP-046's bundle line (a new *Offer line* field), JP-048's Featured tick, JP-054's layout-4 boxes, JP-043's sticky column and JP-038's `padX`, which is now the frames' own 56 / 30 / 10 on every section, the footer included. JP-047 closed as by design (reply only). Only JP-044 sits in an `s.lime` block, so Retro and Grunge move with the rest. Against `main`, entries 1–7 move exactly their named files (38 canvas + 20 live of 387 + 387), and JP-038 moves 234 + 234, geometry only apart from three named consequences. The sweep's Settled carries a reply line per ticket. |

**Reading order in a Lime session:** `CLAUDE.md`, then the plan, then the sections it names at its top. Layout 2 also reads layout 1's whole *Conventions*, since that pass built the foundation; layout 3 reads both, and Retro layout 3's *Conventions* and *Addendum*, since that pass built the branches it dresses; layout 4 reads all three Lime *Conventions*, and Retro layout 4's *Conventions* and *Addendum*.

## Grunge

| Pass | Plan | Branch | Fitted |
|---|---|---|---|
| Layout 1 | [`grunge/layout-1.md`](./grunge/layout-1.md) | `grunge-layout-1`, forked from `main` (merged) | Retro and Lime layout 1's eleven components in the Figma mode **Static Youth**: a token foundation (session 0, which opens on a user call — the display face, Stones Crush, is not a Google Font), then `s.grunge` decoration inside the shared `s.v0` branches, a shared `s.designed` gate, the header's four modal cards, plus the end-of-pass sweep, which extracted [`CONVENTIONS.md`](./CONVENTIONS.md). Written as deltas against Lime layout 1. Card 1 of the setup modal is a fitted page; cards 2–4 are placeholders that render and publish, each its own layout pass's to fit. |
| Layout 2 | [`grunge/layout-2.md`](./grunge/layout-2.md) | `grunge-layout-2`, forked from `grunge-layout-1` (merged, PR #28, with the root `index.html` refreshed) | Lime layout 2's ten compositions in Static Youth: each Lime layout-2 block widened to `(s.lime || s.grunge)` with the Grunge deltas inside it, all three widths per session, plus the end-of-pass sweep. Written as deltas against Lime layout 2 and Grunge layout 1. Card 2 of the setup modal is a fitted page; the footer is layout 1's. The sweep folded what the pass leaned on into [`CONVENTIONS.md`](./CONVENTIONS.md) (the *L2* entries and group D2) and taught `page-check.mjs` and `build-digest.mjs` to walk any card. |
| Layout 3 | [`grunge/layout-3.md`](./grunge/layout-3.md) | `grunge-layout-3`, forked from `main` (merged, PR #29, with the root `index.html` refreshed) | Lime layout 3's ten compositions in Static Youth: each Lime layout-3 block widened to `(s.lime || s.grunge)` with the Grunge deltas inside it — `HeaderV2`'s block at its head, the bio's ahead of its branch, the rest after their seams, the gallery's ternaries — all three widths per session, the composed page inherited (it already composes under Grunge), plus the end-of-pass sweep. Written as deltas against Lime layout 3 and Grunge layouts 1 and 2. The page walk found no effect on any master, one `#171716` sheet (the gallery), no map sheet (Scheme 4 ≡ 1), the bio's seal swapped for layout 1's red one, and five nested sites (eight nodes) on a different scheme from Lime's — so the plan's first rule was to read every nested scheme off the Grunge master. Card 3 of the setup modal is a fitted page; the footer is layout 1's. The sweep folded the pass's three new rules into [`CONVENTIONS.md`](./CONVENTIONS.md) (the *L3* markers and group D3) and hardened `page-check.mjs`'s media probe. |
| Layout 4 | [`grunge/layout-4.md`](./grunge/layout-4.md) | `grunge-layout-4`, forked from `main` (closed, with the root `index.html` refreshed; push, PR and merge still open) | Lime layout 4's ten compositions in Static Youth: each Lime layout-4 block widened to `(s.lime || s.grunge)` with the Grunge deltas inside it — `HeaderV3`'s at its head, the bio's, the media player's and the form's ahead of their branches, the other six after their seams (the gallery a block this time, not ternaries) — all three widths per session, plus the end-of-pass sweep. Written as deltas against Lime layout 4 and Grunge layouts 1–3. The planning walk found a black page with four red grounds (Scheme 3: the header's floor, the bio, the gallery, the repertoire) and one `#171716` band, **torn seams** (layout 1's vector, not Lime's arcs), the testimonials' Scheme 4 sheet collapsed onto the page, two moved bindings (the repertoire and Book Us panels), two width traps (the bio card 1 / 3 / 3, the seal 4 / 3 / 3), four backdrop blurs and no other effect, and **no desktop form on the page** (the main component `725:2990` stands in). Card 4 of the setup modal is a fitted page, which **closes the Grunge family**: all four of its header cards lay out fitted pages. The footer is layout 1's. The sweep folded the pass into [`CONVENTIONS.md`](./CONVENTIONS.md) (the *L4* markers, group D4, and four rows it leaned on three times: a widened block needing no `G`, Scheme 4 ≡ 1 collapsing a sheet, a seam's binding lying, and the black-run depth method). |

**Reading order in a Grunge session:** `CLAUDE.md`, then the plan, then [`CONVENTIONS.md`](./CONVENTIONS.md)
and the bullets it points at, and Lime layout 1's *Per-session procedure*. The layout-2 pass also reads
layout 1's whole *Conventions*, since that pass built the foundation, and — because each session widens
a Lime layout-2 block — that section's *Settled* bullet in Lime layout 2's *Conventions* and the Lime
layout-2 QA entries that moved the same seam. The layout-3 pass reads layouts 1's and 2's *Conventions*,
Lime layout 3's *Conventions* and the section's *Settled* bullet (the block it widens), and Retro
layout 3's *Conventions* and 2026-09-15 Addendum (the branch that block sits in). The layout-4 pass
reads all three Grunge *Conventions* (layout 1's for the torn seam this page brings back), Lime
layout 4's *Conventions*, the section's *Settled* bullet and its entry in the Lime layout-4 QA
fixes where it has one (the block it widens, as QA left it), and Retro layout 4's *Conventions*
and 2026-09-15 Addendum.

## Editorial

| Pass | Plan | Branch | Fitted |
|---|---|---|---|
| Layout 1 | [`editorial/layout-1.md`](./editorial/layout-1.md) | `editorial-layout-1`, forked from `main` (merged, PR #35, with the root `index.html` refreshed) | Retro, Lime and Grunge layout 1's eleven component sets in their fourth variant, `Theme=Editorial`, in the Figma mode **Sienna Vale**: a token foundation (session 0, which opens on two user calls — the display face, Fisterra Fora, is a Fontspring demo, and six of the eleven sections stand on another scheme, four of them on ink), then Editorial decoration inside Lime's layout-1 blocks, widened under a new group flag `s.limeTree` with the deltas behind `s.editorial`, the header's four modal cards, plus the end-of-pass sweep. Written as deltas against Lime and Grunge layout 1. The planning walk found the first **light** page (paper, taupe and ink bands on straight edges — no seams, no band grain), a decorative language of its own (dashed rules, tape, tilted polaroids with real drop shadows, sparkles, a terracotta seal), and Editorial frames on all four layout pages, so card 1 is fitted and cards 2–4 are placeholders. Inherits `CONVENTIONS.md` A, B, C and D1. Session 0 settled both calls — Noto Serif Display at wdth 62.5 for the demo face, and each section's scheme resolved in `sectionVm` — and every section widened its Lime block to `s.limeTree` with no Editorial branch of its own. The sweep widened `Photo`'s empty backdrop to the fitted card, gave the header's `in` an Editorial row, folded the pass into [`CONVENTIONS.md`](./CONVENTIONS.md) as a *Leaned on in Editorial* column with four new rows, and gathered what is worth telling the designer into one note at the plan's foot. |
| Layout 2 | [`editorial/layout-2.md`](./editorial/layout-2.md) | `editorial-layout-2`, forked from `main` (`b38daf1`; closed, with the root `index.html` refreshed; push, PR and merge still open) | Lime layout 2's ten compositions in Sienna Vale: a small session 0 — Scheme 4 into `THEMES[3]`, `SCHEMES_OF.Editorial[1]`, and one user call on three things layout 1's route A could not yet say, answered with a per-width `SCHEMES_OF` triple read off `Z.dev`, a card seated on its own scheme with the root painting the page's ground round it (`vm.pageBg`, `editorialCard`) and a nested-node key (`vm.onScheme`) — then each Lime layout-2 block widened to `s.limeTree` with the Editorial deltas behind `s.editorial`, all three widths per session, plus the end-of-pass sweep. Written as deltas against Grunge layout 2 and Editorial layout 1. The planning walk found every section Lime's tree node for node, the footer layout 1's (closed at planning time), a **paper** page where both twins' are dark, **two sections on a different scheme at 1440 than at 768 and 390** (the repertoire terracotta / paper, pricing ink / paper), two Scheme 2 cards on the page (media, calendar), eight nested nodes on other schemes, dashed rules on nine sections, and no tape, leant print, sparkle or seal. Inherits `CONVENTIONS.md` A, B, C and D2. Card 2 of the setup modal is a fitted page; cards 3 and 4 stay placeholders. The sweep made a four-sided `DashRule` crisp at DPR 1 (its inset moved onto the rect; only svg rows moved), folded the pass into [`CONVENTIONS.md`](./CONVENTIONS.md) as a second Editorial column with four new rows and an Editorial column on D2, and gathered what is worth telling the designer into one note at the plan's foot. |

**Reading order in an Editorial session:** `CLAUDE.md`, then the plan, then
[`CONVENTIONS.md`](./CONVENTIONS.md) groups A, B, C and D1 and the bullets they point at, the
section's *Settled* bullets in both Lime layout 1 and Grunge layout 1 (the block it widens, and the
one widening already done), and Lime layout 1's *Per-session procedure*. The layout-2 pass reads
layout 1's whole *Conventions* (the foundation), groups A, B, C and **D2**, the section's *Settled*
bullets in Lime layout 2 and Grunge layout 2 and its Lime layout-2 QA entries, Retro layout 2's
*Conventions* and narrow-masters notes, and Lime layout 2's *Per-session procedure*. A later pass
reads layout 2's *Conventions* too: it holds the per-width scheme, the card on the page and the
nested-scheme key, and the rules for re-reading a twin's width-bound or redrawn call.

## Other templates

Pop works, but it renders flat (see CLAUDE.md, *Retro, Lime, Grunge and Editorial are designed*). When it gets
its first plan:

- Start its folder here, and add a table to this file.
- Say which groups of [`CONVENTIONS.md`](./CONVENTIONS.md) it inherits — the file Grunge's sweep
  extracted, from the bullets a third template actually leaned on. Reading Figma, and measuring and
  proving, always carry over; a template's decorative language (`s.retro`'s grain and torn edges,
  Lime's arcs, Grunge's tears, Editorial's dashed rules and tape) never does. Keep a running *Inherited and used* list as Grunge's plan
  did, and fold what it confirms back into that file in the sweep.

`SPEC.md`, which the plans number against, lives in git history: `git show 8fa8ff4:SPEC.md`.
