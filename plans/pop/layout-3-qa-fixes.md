# Pop layout-3 QA fixes — JP-125 · JP-126

The tester's batch after Pop's layout-2 QA (`layout-2-qa-fixes.md`). It was filed while working on
the Pop template, and both tickets turned out to be about **Pricing layout 3** (`Pricing`'s
`if (s.v2)` branch), not layout 2. JP-125 names layout 3 outright. JP-126's numbers fit layout 3
alone: layout 2's 390 pricing pads 30 / 10, which its frame states (JP-094), and its card stands
10–380 in both. So this is a layout-3 file (user call, 2026-10-09). The two entries are small, and
one session ran both.

**Read first:** [`CLAUDE.md`](../../CLAUDE.md), [`notes/pricing.md`](../../notes/pricing.md),
[`layout-3.md`](./layout-3.md) *Settled in section 7 (pricing)* (`:1813`), whose named diffs JP-126
reverses, and *How each session runs* in [`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md).

Branch: **`pop-layout-3-qa-fixes`**, forked from `main` (`b2ba14e`, after PR #58). One commit per
entry, then the sweep, which refreshes the root `index.html`.

| ID | Where the cause sits | Templates | Digest themes |
|---|---|---|---|
| JP-125 | both layout-3 bodies print `WHAT’S INCLUDED` and `FEATURED` as literals (`EncoreSection.jsx`, the `s.limeTree` block's `packRow` and Retro's); `FIELDS.pricing.featsLabel` is `in: [1]` | every template | 0–4, plus `&cj=` |
| JP-126 | `sectionVm`'s layout-3 pricing arm is `Z.dev !== 'mobile'`, so 390 pads `padY` 44 / `padX` 10 against the masters' 60 / 20 | Lime, Grunge, Editorial and Pop (Retro is its own body) | 0–4 |

## The report (translated)

> **JP-125 — Pricing layout 3: no field changes the WHAT'S INCLUDED label.** The *Features label*
> field is marked "Not shown in this layout", but layout 3 prints that label over every package's
> features. A marker typed into the field did not reach the page. Emptying the field does not remove
> the label (3 of 3 remain), although the hint says "Left empty, it is not drawn". The text is
> hard-coded in the page's code. The FEATURED chip has no text field either. No AC covers this. The
> same family as JP-119 / JP-107.
>
> **JP-126 — Pricing at 390: the side inset is 10 px instead of the design's 20.** This affects the
> heading and the package cards (card x 10–380, design 20–370). The section's top inset is smaller
> too: 44 against 61. The other sections on mobile match the design, and so do 768 and 1440 (56 / 56
> and 29 / 29). No AC covers this.

## Status

| Order | ID | Report (short) | Verdict | Size | Decision | Status |
|---|---|---|---|---|---|---|
| 1 | JP-125 | WHAT'S INCLUDED and FEATURED have no field at layout 3 | **Confirmed, every template**: the two literals, and `featsLabel`'s `in` naming layout 2 alone | S | **user**: FEATURED, a field or a literal. **Decided: a field, emptied drops the badge** (2026-10-09) | **done** |
| 2 | JP-126 | 390 pricing pads 10 / 44 against 20 / 60 | **Confirmed, and recorded** as a named diff of all four layout-3 pricing passes | S | **user**: scope and insets. **Decided: Lime, Grunge, Editorial and Pop; the master's full 60 / 20 / 60 / 20** (2026-10-09) | **done** |
| 3 | — | End-of-pass sweep | — | S | — | **done** |

---

## JP-125 — layout 3's features label and FEATURED badge

**Verdict: confirmed, every template.** Layout 3 draws the label over each package's features as
`<span>WHAT&rsquo;S INCLUDED</span>`, in the `s.limeTree` block's `packRow` and in Retro's. It
draws the badge as `>FEATURED<`, in both bodies too. JP-095 (a) made `featsLabel` the artist's at
layout 2 (`in: [1]`), and layout 3's copy of the same words was not joined. The FEATURED badge had
no field: it was a literal on a derived seat (JP-048). The panel's "Not shown in this layout" was
`fieldReach` reading `in: [1]` correctly; the `in` row was what was wrong.

**Decided** (user, 2026-10-09):
- **`featsLabel` is `in: [1, 2]`**, printed by both layout-3 bodies behind `!!s.featsLabel`. The
  `t.feats.length > 0` gate stays, so the label stands only over a package that lists features.
- **FEATURED is a new field, `badgeLabel`** (*Featured badge*, `in: [2]`, seeded `PRICING_BADGE`,
  `vm.tierBadge`). It is JP-095 (a)'s shape: printed as typed, and emptied it is not drawn. The
  featured row keeps its fill, ring and inks, since `feat` still seats them.

**Expected after-diff, named before the code:** **0 of 660 per surface on the seed.** The
constant's `’` is U+2019, the same character as the JSX `&rsquo;`. With `&cj=`, `featsLabel` moves
pricing `arch 1` and `arch 2`, `badgeLabel` moves `arch 2` alone, and `arch 0` and `arch 3` do not
move.

**Settled** (2026-10-09).
- **The code.**
  - `data.js`: `PRICING_BADGE = 'FEATURED'` beside `PRICING_FEATS_LABEL`. `featsLabel` is
    `in: [1, 2]`, and its hint names both layouts. The new `badgeLabel` field follows it. The
    `tiers` hint says "layout 3’s Featured badge".
  - `EncoreBuilder.jsx`: `vm.tierBadge = cv('badgeLabel', PRICING_BADGE)` beside `vm.featsLabel`.
    `EditPanel` needs no chain arm, since the field's `d` is its seed.
  - `EncoreSection.jsx`: both bodies print `{s.featsLabel}` and `{s.tierBadge}` behind their own
    gates, and the comments that called them literals are updated.
- **Digest, seed: 0 of 60 per surface** on pricing (themes 0–4, three widths, canvas and
  `live=1`), against a HEAD worktree on :5190 from the tree on :5191. The digest prints the server's
  port inside the grain's `url()`, so files are compared with `localhost:<port>` normalised. Without
  that, Retro's `arch 0` reads 3 false files a surface. The whole 660 is in the sweep.
- **Positive control** (pricing, themes 0–4, three widths, against the tree's own seed):
  - `featsLabel` `"ZQ"` or `""` moves **30 of 60**, `arch 1` and `arch 2` × 15.
  - `badgeLabel` `"ZQ"` or `""` moves **15 of 60**, `arch 2` alone.
  - `live=1` moves the same files.
  - In the `arch 2` files the marker replaces all three labels (`ZQ` × 3, `WHAT` × 0), and emptied,
    none is left. The badge's marker prints once.
  - Emptied, the badge's span is gone and the name row narrows (Pop 390: 210 → 133.7). The row's
    lime fill and pink ring rows are unchanged.

Reply (JP-125): **fixed.** On Pricing layout 3, *Features label* now sets the WHAT'S INCLUDED line
over every package, and the panel no longer marks it "Not shown in this layout". Emptied, the line
goes from all three packages. Layout 2's plan card reads the same field, as before. FEATURED has
its own field now, *Featured badge* (layout 3 only), seeded *FEATURED*. Emptied, the badge goes and
the featured package stays highlighted. This is every template's layout 3, not Pop's alone.

---

## JP-126 — layout 3's 390 pricing pads 10 / 44 against the master's 20 / 60

**Verdict: confirmed, and recorded.** All four Lime-tree 390 masters stand the head, the capsule,
the rows and the small print at x 20, the head at y 60, and the small print 60 above the foot.
Read again with `get_metadata`: Pop's `984:15412` (head 20 / 60, rows 350 wide, the small print's
foot at 1359 of 1419) and Lime's `984:10796` (the same, 1414 of 1474). Grunge's and Editorial's
passes record the same 60 / 20. `sectionVm`'s layout-3 pricing arm was `Z.dev !== 'mobile'`, so
390 kept `padY` 44 and JP-038's `padX` 10. Each pass named that as a diff:
- [`layout-3.md`](./layout-3.md) `:1880`–`:1887`;
- `../editorial/layout-3.md` `:1610` and `:1619`;
- `../grunge/layout-3.md` `:1146`;
- the arm's own comment ("390 keeps its 44, under the master's 60").

The tester's 61 is the 60 plus the root's 1px ring. Their 768 and 1440 sides, *29* and *56*, are
the 30 and the 56 × 0.82 zoomed, both already the frames'.

**Decided** (user, 2026-10-09): **Lime, Grunge, Editorial and Pop, the master's full 60 / 20 / 60 /
20 at 390.** 768 keeps `padY` 56 over its head, which JP-103 reported as matching. Retro's body is
not in the arm and does not move.

**Expected after-diff, named before the code:** **8 files**, pricing `arch 2` × mobile × themes
1–4 × both surfaces. The rows narrow from 370 to 350, the root's top and foot go from 44 to 60, and
whatever rewraps in the narrower rows moves with it. Retro, 768, desktop and every other category
show 0.

**Settled** (2026-10-09).
- **The code** (`EncoreBuilder.jsx`, the arm after the repertoire's JP-103 arm). The condition
  drops `Z.dev !== 'mobile'`. At mobile it sets `vm.padX = '20px'` and `vm.pad = '60px 20px 60px'`,
  three values, so `padTop` / `padFoot` still split it. This is the first section outside `column`
  to move `padX`. No node in the layout-3 `s.limeTree` block reads `s.padX`: its ring overlay is
  `inset: 0`, and the page gutter reads `Z.padX`, not the view-model.
- **Digest: 4 of 660 per surface, the named set and nothing else** (themes 0–4, three widths,
  canvas and `live=1`, HEAD worktree on :5190 against the tree on :5191, ports normalised): pricing
  `arch 2` × mobile × themes 1–4. Every row in each file moves. Retro, 768, desktop and every other
  category show 0. The roots, against the masters' 390 heights:

  | Theme | Root, HEAD → tree | Rows (frame) | Head · foot |
  |---|---|---|---|
  | 1 Lime | 1426 → 1488.2 (1474) | 337.9 / 406.4 / 391.3 (338 / 406 / 376) | 60 · 60 |
  | 2 Grunge | 1329.7 → 1392 | 315.9 / 369.2 / 354.1 | 60 · 60 |
  | 3 Editorial | 1320.4 → 1382.6 (1383) | 313.9 / 367.2 / 352.1 (314 / 367 / 352) | 60 · 60 |
  | 4 Pop | 1372.6 → 1434.8 (1419) | 322.3 / 390.8 / 375.6 (322 / 390 / 360) | 60 (the h2's box 58, its 0.1em lift) · 60 |

  - Every row stands at x 20–370, 350 wide, and so do the head and the small print.
  - The extra height is the 32 of padding plus what rewraps in the narrower rows. Under Editorial
    the rows land on the frame's to the pixel. Under Pop and Lime the third row is 375.6 / 391.3
    against 360 / 376 because *Visual sync available* wraps in its 123 cell, where the frame's
    113-wide box overflows its item without wrapping. That is Lime's named diff from its layout-3
    pass, and now Pop shows it too.
- **The published tab** (`scripts/inset.mjs Pop,Lime,Grunge,Editorial 3`, HEAD and tree): the one
  line that moved under each template is pricing at 390, `pad 10, text left 10` → `pad 20, text
  left 20`. 1600, 1440 and 768 read HEAD's. `scrollWidth` equals the window at every width.
- **360 and 414** (the published tab resized, the same four templates on card 3): pricing pads 20
  and its text starts at 20 at both. `scrollWidth` equals the window, and every row's Book pill
  stands inside its row (rows 20–340 at 360, 20–394 at 414).
- **Build.** `npm run build` is clean.
- **Docs.** README's JP-038 paragraph now says layout 3's pricing took its 20. `notes/pricing.md`
  has a new bullet, and its layout-4 bullet names the exception. The arm's comment in `sectionVm`
  and the Lime block's comment state the 60 / 20. *Reversed* pointers went at `layout-3.md`'s
  named diffs (two), `../editorial/layout-3.md` (two) and `../grunge/layout-3.md` (one). The `Z`
  tables' `padX` comment at the head of `EncoreBuilder.jsx` names the exception. Lime's
  plan predates JP-038's `padX` and records no 390 inset diff, so it has no pointer.

Reply (JP-126): **fixed.** On Pricing layout 3 at 390, the heading, the filter, the package cards
and the small print now stand 20px in, as the design does (cards 20–370). The section starts 60
down and ends 60 under the small print. This applies to Pop, Lime, Grunge and Editorial, which
share the design. 768 and 1440 are unchanged. One leftover from the design: under Pop and Lime,
the third card's *Visual sync available* wraps to two lines where the design's text box overflows
its cell without wrapping, so that card is 16px taller than the design's.

---

## End-of-pass sweep

- **The real app, Pop card 3** (puppeteer from the scratchpad: template → card 3 → *Use this
  header* → *Back to page list* → Pricing):
  - On HEAD the panel's *Features label* reads "Not shown in this layout" and there is no
    *Featured badge*. That is the tester's report.
  - On the tree neither field carries the note. Typed markers reach the canvas (3 labels, 1 badge)
    and the published tab at 1440, 768 and 390, with no WHAT'S INCLUDED or FEATURED left.
  - Emptied, the tab prints neither at any width.
  - The only console error is the dev server's `favicon.ico` 404.
- **The root `index.html` is refreshed** (`npm run build:standalone`, 9,912,591 bytes).
- **Torn down**: :5190, :5191 and the HEAD worktree. The probes stayed in the session's
  scratchpad.

## Replies

**JP-125: fixed.** On Pricing layout 3, *Features label* now sets the WHAT'S INCLUDED line over
every package, and the panel no longer marks it "Not shown in this layout". Emptied, the line goes
from all three packages. Layout 2's plan card reads the same field, as before. FEATURED has its own
field now, *Featured badge* (layout 3 only), seeded *FEATURED*. Emptied, the badge goes and the
featured package stays highlighted. This is every template's layout 3, not Pop's alone.

**JP-126: fixed.** On Pricing layout 3 at 390, the heading, the filter, the package cards and the
small print now stand 20px in, as the design does (cards 20–370). The section starts 60 down and
ends 60 under the small print. This applies to Pop, Lime, Grunge and Editorial, which share the
design. 768 and 1440 are unchanged. Under Pop and Lime the third card's *Visual sync available*
wraps to two lines where the design's text overflows its cell, so that card is 16px taller than the
design's.

## Notes for the designer

- **Pricing layout 3 at 390 (Pop and Lime):** the third card's *Visual sync available* is a
  113-wide text box inside a 125 item that does not wrap. The build wraps it in its 123 cell, so
  the card is 16px taller than the frame's (375.6 against 360 under Pop). Under Editorial the
  same words fit.
