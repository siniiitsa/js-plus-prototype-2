# Inline editing on every template and layout — plan

Working checklist for taking canvas inline editing ([`inline-edit.md`](./inline-edit.md): click the text, edit it
there) from **Retro layout 1** to **every template at every layout**. Same shape as the design passes: one
*pass* per page (a template's layout N, all its sections), one session per pass, clearing context between
passes, the pass's memory written back into its own file as it goes.

**Read first, every session:** [`CLAUDE.md`](../CLAUDE.md) (the "Clicking text on the canvas" bullet), then
[`inline-edit.md`](./inline-edit.md) (how the machinery works), then this file, then the `notes/` file of every
section the pass touches, and [`notes/templates.md`](../notes/templates.md).

Branch: **`inline-edit-all`**, with one commit per pass (`inline-edit-<template>-layout-<n>` if a pass needs its own
branch). The Retro layout-1 work is commit `2b985a3`; Phase 0 is the commit after it.

## What "all" means (the done test)

For every (template, layout, section), every `FIELDS` key of type text, area or list, and every text cell of a
repeater, that **`fieldShown` says the layout reads and the canvas actually draws**, opens its own box on a click
at desktop or tablet (the union of the two), types into the clicked node, and Escape restores it.

What the canvas does not draw is **panel-only, and written down**: the pass file's ledger lists each such field
with its reason. The only reasons accepted are:

| Reason | Example |
|---|---|
| live-only copy (`s.live` is false on the canvas) | the layout-4 wizard's steps, the repertoire's *View full set* rows, the map's city chips |
| not drawn at the widths we edit | a field only the 390 frame prints (phones are out) |
| not text | images, selects, URLs, `booked` dates, `open` |
| the field has no node (emptied label) or the page prints a derived value | `tiers.tags`, `songs.length` |
| a node text can never settle, and a mark would cost more than it buys | decided per case, user call |

Nothing else may be left out silently. A probe `--check` (Phase 0) enforces the test, as `limits.mjs --check` does
for caps.

**Out of scope, unless asked:** phones (the Edit drawer covers the canvas); the page's literal copy that no field
owns (the bio's `Bio` eyebrow, the calendar legend, the repertoire's `All` chip, the footer's *A JustPay Product*);
the published tab, the preview overlay and the thumbnails (none mount the editor).

## The sizes

5 templates × 4 layouts, plus Retro's header has 6 designs (layouts 5 and 6 are header-only). Retro layout 1 is
done. Per category, the fields the panel lists (text / area / list) and the repeaters:

| Cat | Text keys | Repeaters | Not in the Retro-1 machinery yet |
|---|---|---|---|
| header | 14 | — | — |
| bio | 14 | — | — |
| media | 7 | `tracks` | — |
| pricing | 14 | `tiers` | — |
| repertoire | 1 | `songs`, `sets` | `sets` |
| gallery | 5 | — | — |
| calendar | 8 | `booked`, `slots` | `slots` (`booked` stays panel-only: dates) |
| map | 23 | `gigs`, `stats` | `stats` |
| testimonials | 6 | `quotes` | — |
| form | 15 | `fields`, `steps` | `steps` |
| footer | 3 | `links` | — |

Retro layout 1 uses a fraction of those keys (the others are read at layouts 2–4 or by other templates), so
most of the work is *proving* keys at new layouts, not writing new code. The new code is: the gate, four
repeaters (`sets`, `slots`, `stats`, `steps`), and whatever the hit-test needs for decoration.

## Phase 0 — foundations (one session, before any pass) — DONE 2026-10-21, see the log below

0. **Commit the Retro layout-1 work** (user's say-so) so every later diff is a pass.
1. **Make the probe a committed script.** The sentinel probe lives only in a browser page (`window.__probe`).
   Write `source/scripts/inline-probe.mjs` on the model of `scripts/digest.mjs` (puppeteer-core on the cached
   chrome-headless-shell, per the browser-tool-choice memory): args `--theme --layout --cat --width`, it opens the
   app on `startTheme`, picks the header card for that layout in the setup modal (which writes the page's layout and
   order, as a user does), then for every text node of every section clicks it, types `ZZQ`, and reports
   `hits` by label, **WRONG** (the sentinel landed elsewhere), **NOT-RESTORED** (Escape did not restore) and, new,
   **MISSING**: every field the done test above requires that no click reached. `--check` exits non-zero on any of
   the three; JSONL out for long runs. A positive control (a key known to hit) runs first. This is the pass's
   coverage proof; without it "all" is a claim.
2. **Replace the allowlist with a default and exclusions.** Five templates × four layouts × eleven sections of
   `INLINE_KEYS` is unmaintainable and was only needed while each key was a bet. Make a key editable when
   `fieldShown(f, theme, design)` says the layout reads it and its type is text / area / list, minus
   **`INLINE_OFF`**, a table of measured exclusions keyed `template.design.cat.key` (with a reason string, the
   ledger's). `INLINE_MARKED` and `INLINE_PART` gain the same optional `template.design` scope (today they are keyed
   `cat.key`, which two layouts of one section may not share). `inlineOn` becomes "not a phone" (the phone gate
   already exists). The principle survives: a key is only *known* good because the probe passed it.
3. **Hit-test by the stack under the pointer, not by `e.target` alone.** Lime, Grunge, Editorial and Pop draw tape,
   stickers, sparkles, grain and overlays, some with `pointer-events` and some without (a `pointer-events: none`
   sticker is never `e.target`; an overlay over text is). Spike: walk `document.elementsFromPoint(x, y)` (the stack,
   top first) and take the first slot node in it. Measure on Pop and Grunge layout 1 before the rule is final; keep
   `e.target`'s chain as the fallback. This is the one real piece of new design; everything else is tables.
4. **The four repeaters.** `repeaterRows` and `INLINE_ROWS` cases for `sets` (repertoire L3), `slots` (calendar),
   `stats` (map L3/L4's wall) and `steps` (form). Read `notes/list-editors.md` first: each seed resolver in
   `EditPanel` must resolve exactly what `sectionVm` resolves, and the `*Val` closures should delegate to
   `repeaterRows` as the existing six do.
5. **Optional, by size:** if `INLINE_OFF` / marks pass ~60 lines, move the inline block out of `EncoreBuilder.jsx`
   into `src/builder/inline.jsx` (chrome-only, imports `data.js`), leaving the wiring behind. CLAUDE.md's "Source
   files" paragraph then names it. Decide at the end of step 4, not before.
6. **Exit check:** Retro layout 1 re-run through the committed probe with `--check` passes and matches the old
   result (the ledger for that pass = the four "still out" items in `inline-edit.md`).

### Phase 0 log

**0 · commit.** Already `2b985a3` when the session began (tree clean).

**1 · the probe** — `source/scripts/inline-probe.mjs`, flags in its header. What it does that the plan did not say:
- `--width 768` keeps the window at 1440 and **clicks the Tablet tab**; a 768 window is the phone chrome, where inline
  editing is off. `App.jsx`'s `startTheme` is hard-wired to `"Picker"`, so the probe drives the picker as `page-check.mjs`
  does (template → *Open the editor* → the modal's card N−1 → *Use this header*).
- The universe is the app's own: `inlineSlots(sec, theme, name, true)` (exported) lists every slot with its `off` reason,
  so the probe and the editor cannot disagree about what a field is. Each box carries `data-inline-slot` (an id,
  `cat.key[row].col#item.part`) and `data-inline-float`.
- Phase 1 clicks the middle of every text node's first line. Phase 2 re-aims at the *words* of any part slot still
  unhit (a long line's middle is not its time or its artist). Then each universe slot with no hit is `MISSING` if a node
  prints it (counted against its rank among slots with the same words, and with exact-other-field copy discounted),
  `paged` if its row is not drawn but the column's other rows are hit, `not drawn` otherwise, `off` if in the ledger.
- WRONG is a box on a slot that does not print the clicked copy (punctuation-only nodes excepted) **or** a sentinel that
  did not land under the box; NOT-RESTORED compares `c` (hashed, off the fiber's `st`) and the section's HTML after
  Escape. Controls: the header title must open `header.title` first (exit 2 otherwise), and breaking `onRevert` makes
  it report NOT-RESTORED.
- **What `--check` fails on:** WRONG, NOT-RESTORED, MISSING, and **UNLEDGERED** — a slot that no width draws, no click
  reached and `INLINE_OFF` does not name. UNLEDGERED needs both widths in one invocation (`--width 1440,768`; with one
  it says it skipped), because a field only one width draws (`gallery.sourceLabel`) is undrawn at the other. So green
  means the done test holds: every slot is hit, ledgered, or drawn nowhere *and* ledgered. `not drawn` at one width
  and `paged` are listed but do not fail. `paged` is a row nothing prints in a column whose earlier rows are hit and
  whose later rows are all undrawn (the app's `prefixSlot` reading), so a mid-column gap is a MISSING, not paging.
- One run is ~4 minutes per width for a whole page; a JSONL row per click goes to `$OUT/inline-probe/`.

**2 · default-on.** `INLINE_KEYS` and `inlineOn` are gone. `INLINE_OFF`, `INLINE_MARKED`, `INLINE_PART` and `inlineRule`
are in `data.js` (keys `Template.design.cat.key[.col[.part]]`, `*` wildcards). Default-on exposed **no new key at Retro
layout 1**: everything the layout reads was already covered, or sits in the ledger. It did surface three things the
allowlist had hidden, all fixed in shared code:
- `header.badgeText` joined the exact-text map and made the Title ambiguous (both read the artist's name); the seal is
  reached through its svg, so it stays out of that map.
- **A part slot's words inside another field's copy**: the artist *Queen* is inside the title *Dancing Queen*, and the
  row holding both became a "peer", so *Queen* never opened. Peers are now taken minimal first, then the exact copy of
  another field is dropped.
- **A pager hides the second of two equal rows** (the seed repeats *Valerie*; 768 draws six songs): `prefixSlot` pairs
  the nth drawn node with the nth slot when what is drawn of the column reads as the head of its slots.

**3 · the hit-test spike** (Grunge and Pop layout 1, desktop). Result, against the plan's hypothesis:

| | Grunge L1 | Pop L1 |
|---|---|---|
| `e.target` alone | 155 hit · 0 WRONG · 0 MISSING | 151 hit · 2 WRONG · 2 MISSING |
| stack walked top first, first slot wins | same hits, **1 WRONG** (a seal over the pricing small print opened it) | identical to `e.target` |
| `e.target` + the smallest text box under the pointer wins (shipped) | 155 hit · 0 WRONG · 0 MISSING | 153 hit · 0 WRONG · 0 MISSING |

No tape, sticker or grain hid a slot from `e.target` at layout 1 on either template (the two clicks "under an overlay"
are a literal range and a form seal with no slot). What does go wrong is a **box over another field's text**: Pop's title
words stand across its kicker and location. Range rects are the font's content box, so "on the glyphs" cannot tell a
display word from small text beside it; the smaller box wins. A non-slot element on top (a seal) keeps `e.target`'s
answer (nothing), because letting a lower slot win past it was the regression. **The tie-break is a judgement call the
probe cannot test**: a text box is a rectangle, not the glyphs, and the probe aims at the small text's centre, so it
always agrees with the rule. Where the pointer is on a display word's ink and a small label's box lies under the same
pixel, the label wins. It is the default (small type sits on a display line's box far more often than the reverse) and
is in the class of the table's last row, "a node text can never settle", decided by default and checked by eye: the
pass procedure's step 3 screenshots, not `--check`, are what test it. Passes 2–4 should expect the stack to
matter less than the plan said: **Grunge and Pop layout 1 already pass at 1440 with only the 15 undrawn slots to
record** (`songs.length`, `calendar.prompt`, and `gallery.railLabel` / `sourceLabel`, which the probe finds drawn at no
width on either — *corrected by pass 1: those two are drawn, and were missing their `data-inline` marks in the Lime
tree's gallery block, now added; Grunge, Editorial and Pop L1's galleries pass with them, so passes 2–4 ledger only
`songs.length` and `calendar.prompt`*), and Grunge also passes at 768 (143 hit, 0 WRONG, 0 MISSING; Pop's 768 is unmeasured). With the
UNLEDGERED rule, `--width 1440,768 --check` on Grunge L1 fails today on exactly those four groups, which is the
ledger rows its pass adds (`Grunge.0.…`).

**4 · the four repeaters.** `repeaterRows` gains `sets` (the drawn sets as `{ key, mood, length }`; `slotWrite` puts the
whole `repSetsOf` object back), `slots`, `stats` and `steps`; `INLINE_ROWS` lists their text cells; `slotsVal`,
`statsVal` and `stepsVal` delegate (`setsVal` keeps the object). Run on the pages that draw them: Retro L2 calendar
`slots` kind/price ×4, L3 `sets` mood/length ×3, L4 map `stats` ×12 cells and form `steps` ×6, all hit and restored.
**Not proved by step 6 (nothing at Retro layout 1 draws them): their first proof is passes 5, 10 and 15.**

**5 · module split — not done.** The inline block is ~530 lines of `EncoreBuilder.jsx`, but the tables the plan's ~60-line
test measures went to `data.js` and are ~35 lines with five rows of ledger. Revisit when `INLINE_OFF` passes ~60 lines.

**6 · exit check.** `node scripts/inline-probe.mjs --theme Retro --layout 1 --width 1440,768 --check` → exit 0, `PASS`:
156 slots hit at 1440 and 143 at 768, 0 WRONG, 0 NOT-RESTORED, 0 MISSING. Against the legacy-allowlist baseline run
first: no slot lost, three gained (*Queen*, the second *Valerie* at 768, the calendar time — the last because the old
ad-hoc probe aimed at a line's middle). The ledger is the plan's four items plus the pager:
`tiers.tags` and `songs.tags` (derived chips, `*.*`), `Retro.0` `songs.length` and `calendar.prompt` (not drawn),
and *paged* rows (the testimonials after the first, the repertoire past the sixth song at 768).
`gallery.sourceLabel` is "not drawn" at 768 and hit at 1440: desktop alone, no ledger row (the union rule).

**Open for later passes, found on the way.**
- *Repertoire layout 3 draws a song once per tag*, so document order is not row order: a click on the Pubs card's *Valerie*
  (row 0 again) was paired with row 11. Pass 10 and its twins; see `notes/list-editors.md`.
- Retro L2 calendar: the heading and `availLabel` both read *Availability* (pass 5). Retro L4 map: the top gig's city
  and time are not reached (pass 15). These and the other misses on layouts 2–4 are the passes' baselines.
- Every page is now editable but only Retro layout 1 is proved. Nothing is published (`index.html` is untouched).

## The passes

Order is **layout-major**, not template-major: layout N of the four non-Retro templates shares the `s.vN` branch
with Retro (their decoration is `s.lime` / `s.editorial` / `s.pop` inside it), so a hit-test fix for a branch
carries across templates, and layout 1 of Lime, Grunge, Editorial and Pop should be nearly free. Within a layout:
Retro, Lime, Grunge, Editorial, Pop (build order).

| # | Page | Plan file | Expect | Status |
|---|---|---|---|---|
| 1 | Lime L1 | `lime/inline-layout-1.md` | the shared `s.v0` DOM: mostly free | **done 2026-10-21**: `--check` PASS (156 / 143 hit), two marks added in the Lime tree's gallery, two `Lime.0` ledger rows |
| 2 | Grunge L1 | `grunge/inline-layout-1.md` | tape and rotation: `placeBox` | **done 2026-10-21**: `--check` PASS (157 / 144 hit), two `Grunge.0` ledger rows, one generic fix (`textRange` no longer spans a pill's arrow); Retro, Lime and Grunge L1 re-run, all PASS |
| 3 | Editorial L1 | `editorial/inline-layout-1.md` | `cased()`, Gloock one weight, per-design schemes | **done 2026-10-21**: `--check` PASS (155 / 142 hit), no code change, two `Editorial.0` ledger rows; `text-transform` and Gloock's 400 hold in the box |
| 4 | Pop L1 | `pop/inline-layout-1.md` | stickers (`pointer-events`), 80% placeholders | |
| 5 | Retro L2 | `retro/inline-layout-2.md` | media fan (overlapping cards), tile rails | |
| 6 | Lime L2 | `lime/inline-layout-2.md` | | |
| 7 | Grunge L2 | `grunge/inline-layout-2.md` | | |
| 8 | Editorial L2 | `editorial/inline-layout-2.md` | `[desktop, tablet, mobile]` seats | |
| 9 | Pop L2 | `pop/inline-layout-2.md` | lime cards on white, `onScheme` nodes | |
| 10 | Retro L3 | `retro/inline-layout-3.md` | composed page (`column: true`, sticky cell), `sets`, the 5-cell wall | |
| 11 | Lime L3 | `lime/inline-layout-3.md` | | |
| 12 | Grunge L3 | `grunge/inline-layout-3.md` | | |
| 13 | Editorial L3 | `editorial/inline-layout-3.md` | | |
| 14 | Pop L3 | `pop/inline-layout-3.md` | | |
| 15 | Retro L4 | `retro/inline-layout-4.md` | `stats`, the ticker's repeated copy, the arrows | |
| 16 | Lime L4 | `lime/inline-layout-4.md` | | |
| 17 | Grunge L4 | `grunge/inline-layout-4.md` | | |
| 18 | Editorial L4 | `editorial/inline-layout-4.md` | | |
| 19 | Pop L4 | `pop/inline-layout-4.md` | the four `SealBadge` arms | |
| 20 | Retro headers 5 and 6 | `retro/inline-header-5-6.md` | header-only designs | |
| 21 | End-of-plan sweep | — | all 20 pages `--check`ed once more, docs, `index.html` refresh | |

A pass's file is created when its session starts (not now) from the template below and filled as it goes.

## Per-pass procedure (one session)

1. Read the files above; start the dev server on a fresh port; run
   `inline-probe.mjs --theme T --layout N --width 1440` then `--width 768`. The first run is the baseline: every
   miss is a to-do.
2. **Triage each miss** into exactly one of:
   - *generic fix* — the hit-test or box placement is wrong for a class of node (a transform, an overlay, a clamp,
     `text-transform`, `white-space`). Fix it in the shared code, then **re-run Retro layout 1 and every earlier
     pass's page** (a loop over the table with `--check`) — a shared fix is the only thing that can break an
     earlier pass.
   - *part slot* (`INLINE_PART`) — the page prints the copy inside a longer line.
   - *mark* (`data-inline`) — text cannot tell two fields apart. `EncoreSection` carries two today; every new one
     needs the reason in the pass file and a check that no text rule can do it instead. Budget: a handful over the
     whole plan, not per page.
   - *panel-only* — an `INLINE_OFF` row with one of the accepted reasons above.
3. Re-run to green (`--check`, `--width 1440,768` in one invocation, which is what lets it fail on UNLEDGERED: every
   slot that no width draws needs an `INLINE_OFF` row with a reason). Also eyeball a screenshot of the box over a decorated node per
   section: the probe proves the node, not that the textarea lies exactly on the glyphs.
4. Record: the pass file (ledger: every `INLINE_OFF` row, mark and part slot with its reason, and what was
   learned), the touched sections' `notes/` files (a short *Inline editing* heading — section-level decisions live
   there, not in CLAUDE.md), and this table's status.
5. `npx vite build`, `git diff --stat`, commit. **Do not refresh the root `index.html`** (that is the last
   session). Print the next pass's hand-off prompt and stop.

### Pass file template

```
# <Template> layout <N> — inline editing pass
Branch · probe command lines · baseline (hits / WRONG / NOT-RESTORED / MISSING per section, both widths)
## Generic fixes     (what changed in shared code; earlier pages re-run: yes/no)
## Part slots / marks (each with its reason)
## Ledger            (INLINE_OFF rows: section.key — reason)
## Learned           (what the next page should know)
```

## Hazards, by where they will bite

- **Overlays and stickers** (Grunge tape and grain, Pop stickers, Editorial/Lime sparkles): the click may not
  reach the text's own node. Phase 0 step 3 is the answer; Pop's `pointer-events: none` stickers are the test.
- **Case and faces:** `cased()` / `text-transform` — the textarea copies the computed style, so it should hold;
  confirm for Editorial (Gloock is one weight; no bold must be synthesised) and for any face with an ems table.
- **Repeated copy:** the map ticker, marquee strips, the media fan and the testimonials' wall repeat text; the
  nth-peer rule (`minimalPeers`) covers a repeat *within* one field, not the same text in two fields — those take a
  mark only if no part slot or rank settles it.
- **Stacked or hidden copy:** the media fan overlaps its cards (topmost card wins; the others are reachable by
  their own click). The testimonials carousel draws one review, so the others are panel-only *until paged* — on the
  canvas `cur` is fixed; this is "not drawn", accepted, and listed. Same for the pricing chip filter.
- **Live-only copy:** the layout-4 calendar wizard, *View full set*, city chips, the footer's live columns: panel
  only, listed once per template in the ledger.
- **Composed layouts:** layout 3's right column is sticky and built with `column: true`; check the box follows a
  stuck cell (`placeBox` measures at click time and on layout effect, but a scroll under a sticky cell moves it —
  confirm the box tracks scroll as the blue field box does).
- **Width-split fields:** `fieldShown` does not know widths (`railLabel` is tablet-only at layout 2), so the probe
  takes the union of desktop and tablet; a field neither width draws is in the ledger as "390 only".
- **The clamp:** text over its cap is whole in the box and clamped on the page. Known and accepted; the box does
  not shrink a typed value.
- **`sectionVm` mirrors:** a repeater's seeds must match `EditPanel`'s resolver exactly (list-editors rule). Each
  new repeater case is a pair-edit; the probe's Escape-restore check catches a mismatch as NOT-RESTORED.

## Decisions I have defaulted (change before Phase 0 if you disagree)

1. **Default-on with a measured exclusion table**, not an allowlist per page (Phase 0, step 2).
2. **Layout-major order**, not template-major.
3. **`booked`, images, selects and URLs stay panel-only**, as does the page's literal copy no field owns.
4. **Phones stay out.**
5. **Marks stay rare.** If a template needs more than ~3, stop and ask, because that is the "tag EncoreSection" door
   CLAUDE.md keeps shut.
6. **No `index.html` refresh until pass 21.**

## Sizing

Phase 0 is one long session. Passes 1–4 are expected to be short (shared `s.v0` DOM); layouts 2–4 are medium to
long, and a pass that finds a generic fix re-runs every earlier page, so allow a second session for any of 10, 15
and 19 (the composed page, the ticker and stat wall, the seals). About 21 sessions in all, 24 with overruns.
