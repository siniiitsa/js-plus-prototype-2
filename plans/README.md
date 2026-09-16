# Design-pass plans

Each pass of fitting a template to Figma gets its own working checklist, and the work goes one section
per session, clearing context between sections. A plan is also that pass's memory: what each
section settled gets written back into it as the pass goes.

## Layout

One folder per template, one file per pass:

```
plans/
  retro/
    layout-2.md
    layout-3.md
    layout-4.md
  lime/
    layout-1.md
    layout-2.md
    layout-3.md
  grunge/      ← not started
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

**Reading order in a Retro session:** read `CLAUDE.md` first, then the current plan, then the
*Conventions* of every earlier plan, newest first. Each plan says it doesn't repeat its
predecessors' bullets, so layout 4's session also reads the Conventions of layouts 3 and 2.

## Lime

| Pass | Plan | Branch | Fitted |
|---|---|---|---|
| Layout 1 | [`lime/layout-1.md`](./lime/layout-1.md) | `lime-layout-1` (merged) | Retro layout 1's eleven components in Lime's Figma mode: a token foundation (session 0), then `s.lime` decoration inside the shared `s.v0` branches, and the header's four modal cards, plus the end-of-pass sweep. |
| Layout 2 | [`lime/layout-2.md`](./lime/layout-2.md) | `lime-layout-2`, forked from `lime-layout-1` (merged, PR #14) | Retro layout 2's eleven compositions in Lime's mode: `s.lime` decoration inside the shared `s.v1` branches, all three widths per session (video dropped), plus the end-of-pass sweep. Card 2 of the setup modal is a fitted page. |
| Layout 3 | [`lime/layout-3.md`](./lime/layout-3.md) | `lime-layout-3`, forked from `main` (closed, not yet merged) | Retro layout 3's ten compositions in Lime's mode — `s.lime` decoration inside the shared `s.v2` branches, and a Lime `HeaderV2` (a different composition, not only a re-ink) — all three widths per session, the composed page inherited from Retro's QA, plus the end-of-pass sweep. Card 3 of the setup modal is a fitted page. |

**Reading order in a Lime session:** `CLAUDE.md`, then the plan, then the sections it names at its top. Layout 2 also reads layout 1's whole *Conventions*, since that pass built the foundation; layout 3 reads both, and Retro layout 3's *Conventions* and *Addendum*, since that pass built the branches it dresses.

## Other templates

Grunge, Editorial and Pop work, but they render flat (see CLAUDE.md, *Only Retro is
designed*). When one of them gets its first plan:

- Start its folder here, and add a table to this file.
- Say which of Retro's Conventions it inherits. Many are about reading Figma, verifying the
  published tab and the `sectionVm` rules, and those carry over. Others are about Retro's decorative
  language (`s.retro`, grain, torn edges, seeded photography), and those don't. Once a second
  template shows which is which, pull the shared ones out into a `plans/CONVENTIONS.md`.

`SPEC.md`, which the plans number against, lives in git history: `git show 8fa8ff4:SPEC.md`.
