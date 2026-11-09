# Field → canvas box — stale and missing boxes (JP-165)

The tester's report (2026-11-09), as given:

> The highlighted boxes that show which field you are editing in the template are not always
> correct — it seems to stay on the most recent field the user has clicked on.

Everything is in builder chrome (`EncoreBuilder.jsx`: `onFocusField`, `refit`, `startInline`,
`closeInline`). `EncoreSection`, `sectionVm`, the caps and `INLINE_*` are untouched, so the fix is
filed against every template at once, like [`editor-qa-fixes.md`](./editor-qa-fixes.md) (JP-146 …
JP-150 are this box's earlier tickets). The ticket number is proposed; renumber to the tracker's.

Branch `focus-box-qa-fixes`, from `main`. One fix session (A + B). C1 and D only on the user's call.

## What was tested

A real-mouse sweep of the panel, every template, every layout — **22 pages**: Retro 1–6, Lime /
Grunge / Editorial / Pop 1–4. **Correction (session 1): that first, throwaway sweep ran at the
Mobile tab's 390 canvas, not at 1440 and 768 as first written.** Its control selector included
`[role=tab]`, which matches the top bar's Desktop / Tablet / Mobile tabs, so each section's walk began
by clicking all three and ended on Mobile. The finding below (every layout, every template) stands
at that width, and the real 1440 / 768 / 390 are covered by `focus-probe` (B), which leaves the tabs
out and records no walk it cannot place. For
every section of each page, every control of the open panel was clicked and the box read back: the
builder's `focusF` (from the fiber tree) and the blue box's rectangle, and the text the box covers,
compared with the focused field's value. Two modes:

- **plain** — panel fields only.
- **primed** — first click copy on the canvas (the inline editor opens), press Escape (it closes,
  `inline` is null, `focusF` is null: the page is clean), *then* walk the panel's fields. This is
  "the most recent field the user clicked on" as the tester describes it.

A real phone is out: no inline editor, so the path cannot arise.

## Findings

| | Result |
|---|---|
| Plain mode | On every plain focus the box covered the field's own copy (the check is that the covered text holds the value's first 12 characters, so it would not catch a box on the wrong one of two same-text nodes, JP-146's class, or on a paragraph that merely contains the value). The only repeats of the previous field's box are the 14 shared-line cases in D. Enough to say the reported bug needs a canvas click first. |
| Primed mode | **Wrong on all 44 pages**: 1,758 failing text-field focuses. 1,748 of them are the box on the canvas text that was clicked, not the field's own; the other 10 are the shared-line case in D (layout-3 media's *Counter total label*), not this bug. |

Primed failures, text fields focused after a canvas click (the throwaway sweep, Mobile-tab canvas, all templates): header
436 of 472, bio 280 of 470, form 390 of 862, map 286 of 2078, pricing 196 of 1482, media 80 of
828, testimonials 80 of 990, video 10 of 390; gallery, repertoire, calendar and footer 0. Per
template the share is the same (Retro 460, Lime 320, Grunge 320, Editorial 330, Pop 328 failing
rows). The unaffected rows are fields that do not box at all (C), and sections where the clicked
node did not survive the re-render.

Example, Retro layout 1 (reproduced by hand-driven sweep): click "Kai Mercer" on the canvas,
Escape, focus *Location* in the panel → the box sits on "Kai Mercer". *Kicker*, *Primary button*
and every *Tags* row do the same. In the bio, click "Reads the room.", Escape, focus *Paragraph 1*
→ the box is on the heading.

## A. The cause — `inlineNode` is never cleared (the reported bug)

`startInline` stores the clicked node in the ref `inlineNode.current` (EncoreBuilder.jsx, near
`const inlineNode = useRef(null)`) so the box follows the node that was clicked when a label
repeats (each tier's Book pill). `refit` then reads it **whenever `focusF.text` is set**:

```js
const mine = inlineNode.current?.isConnected && wrap?.contains(inlineNode.current) ? inlineNode.current : null
const node = wrap && focusF.text ? mine ?? findFieldNode(wrap.firstElementChild, focusF.text, focusF.key) : …
```

Nothing resets it: not `closeInline`, not `onFocusField`, not `onBlurField`. So after any canvas
click, every later panel focus *in the same section* resolves to the old node while it stays
connected (React keeps the DOM node across the revert and re-renders), and so does typing in a panel
field (`onInput` reports `typing`, which re-runs `refit`). It lasts until the section changes. Plain
mode never touches the ref, which is why panel-only use looks right and the report is "intermittent":
it needs a canvas click first.

**Confirmed, not only read off the code**: with `inlineNode.current = null` added to `closeInline`
alone (a temporary edit, since reverted), the primed sweep on Retro and Pop, layouts 1 and 2, 1440,
header / bio / form / pricing, went from failing in every section to **414 of 415 focuses correct**;
the one left is the shared-line case (D). The two-line gate in step 2 is therefore belt and braces.

**Fix** (S):

1. Reset `inlineNode.current = null` in `closeInline`, in `onFocusField` and in `onBlurField` (the
   panel taking over is the end of the canvas click).
2. Belt and braces: in `refit`, use `mine` only while an inline editor is open **for this focus** —
   `inline && inline.sid === focusF.sid && inline.k === focusF.key` — so a leftover ref can never
   win. `refit` is rebuilt each render and reached through `refitRef`, so it reads the current
   `inline`.
3. Check by hand that nothing regresses on what `mine` was for: Book pills on pricing, a repeated
   label with the inline editor open (the box and the editor stay on the clicked pill), and the
   box following a typed value on the canvas (`onChange` → `setFocusF`). The gate in step 2
   compares `inline.k` with `focusF.key`, and `onChange` sets `focusF.key` from `slotWrite`'s
   returned `k` where `startInline` uses `hit.k`: type into an open inline box on a repeater cell
   (a tier's price, a gig's city, a song's title) and confirm the box stays on the clicked node and
   does not jump to `findFieldNode`'s first match. If `k` differs for repeaters, compare on the slot
   id (`inline.id`) instead.

## B. A regression probe

`source/scripts/focus-probe.mjs`, promoted from the throwaway sweep and written in the shape of
`inline-probe.mjs` / `photo-probe.mjs` (same `--theme`, `--layout`, `--width`, `--cat`, `--check`,
JSONL sink, last line `focus-probe: PASS` or `FAIL`, a positive control first):

- `--prime` is mode two above; without it, mode one.
- Verdicts: **STALE** (a different field's box left in place), **WRONG-NODE** (the box covers text
  that does not hold the field's value), **BOX-ON-NONTEXT** (a select, switch or toggle with a
  box), `FOCUSF-OTHER-SECTION`. Pass = none.
- **The panel must have mounted before it is walked.** The sweep's fixed 350 ms wait found only 4
  controls in map, pricing, form, testimonials and footer under ten parallel runs, silently (it
  looked like a pass). The probe waits until the control count is stable, and fails a section that
  has none, instead of passing it.
- The 14 shared-line cases (D) are ledgered with their reason, the way `INLINE_OFF` is.
- Run the layouts at 1440 and 768, plus 390; run sequentially or in at most three processes.
- Needs `npm run dev` (BASE=). **Add the script before starting the dev server**, or run against a
  second port: a file landing in `source/scripts/` reloads Vite, and a probe running then reads
  empty renders. The throwaway version is
  `…/scratchpad/sweep.mjs` with `lib.mjs` beside it, from the session of 2026-11-09; its results are
  in `…/scratchpad/res` and `res2`.

Done when `focus-probe --check` and `--check --prime` pass on all 22 pages at 1440 and 768.

## C. Fields that never draw a box (already the documented design)

Found alongside, **not what was reported**: in plain mode 21 panel labels never drew a box on any
layout (of 121 seen). The big ones are the repeaters' cells — map *Upcoming gigs* (1540 focuses),
pricing *Packages* (1252), repertoire *Songs* (960), testimonials *Reviews* (880), media *Tracks*
(660), video *Videos* (360), footer *Footer links* (352), form *Form fields* (332), map *Stats*
(120), repertoire *Sets*, form *Steps*. Cause: `onFocusField` passes copy only for `f.type` of
undefined, `area`, `url` or `email`, so a repeater cell reports `text: ''` and `refit` has no node.

**This is the recorded design**: CLAUDE.md's JP-150 line already says "a section with no node to
box (photos, repeaters, selects)", and the town and radius are skipped on purpose. So **C2 is the
state of the code and nothing is asked of the user**. **C1 is an enhancement**, not implied by the
report, and only if they want it: a repeater cell reports its own value and slot id, and `refit` finds
its node by the inline editor's pairing (`inlineSlots`, `drawnSeq`, `prefixSlot`, `INLINE_HEAD`),
not by text, since a bare `Manchester` or `12` prints in many rows (M).

Also never boxed, to triage in the fix session (probably "not drawn at that layout / width" or a
clamp, not bugs; check before closing): gallery *Kicker* and *Heading*, footer *Button* and *Small
print*, form *Email address*, calendar *Prompt*, media *SoundCloud link*, video *List link address*.

## D. A box that covers a shared line (optional, low)

14 plain-mode results, one per layout-3 media page (5 templates × 2 widths, *Counter total label*
`Max`, printed in one line with `5 Featured / 5 Max`) and Editorial L1 / Pop L1's bio (*Location*,
printed in `DJ · Live Act · Manchester, UK`): the box is the whole line, so it equals the previous
field's box, which the sweep reads as STALE. Not wrong: both fields are in that line. Boxing only
the field's words is possible (`placeBox` already takes `words` for the inline editor's part
slots) but is a design call, so the default is **leave it and ledger it in the probe**.

## Status — session 1 (2026-11-09): A and B done

- **A**: `inlineNode` is declared above `onFocusField`, cleared in `onFocusField`, `onBlurField` and
  `closeInline`, and `refit` reads it only while `inline` is open on that field
  (`inline.sid === focusF.sid && inline.k === focusF.key`). `slotWrite` returns `ed.k`, the key
  `startInline` stores, so the gate holds for repeater cells: the inline box on a tier's price or a
  gig's city never falls to `findFieldNode`.
- **B**: `source/scripts/focus-probe.mjs`. Positive control: the header Title draws a box. Negative
  control, run on this very build with A stashed: Retro layout 1 at 1440 primed, header + bio +
  pricing, **17 of 56 focuses failed**; with A, 0 of 56.
- **The matrix, with A**: `--prime` at 1440 and 768 on all 22 pages, plain at 1440 on all 22, `--prime`
  at 390 on all 22: **88 page runs, 23,088 controls, all PASS**; no NO-PANEL section, no error, every
  section's canvas copy primed. The ledgered shared-line cases (D) are listed, not failed.
- A step 3, driven with a real mouse (Retro and Lime, pricing): the second `Book Now` and the second
  `/event` clicked with the inline editor open each keep the box on the clicked node, not the first
  match (box centre inside the clicked text's rectangle). Not driven: typing in an open box on a
  repeater cell and watching the box follow; the gate reads `inline.k`, which `slotWrite` returns
  unchanged (`ed.k`), so it should hold.
- Still open: C1 and D, only if the user asks.

## Order of work

1. A and B together (one session): reproduce with `focus-probe --prime` on Retro layout 1, fix, run
   the whole matrix, then `focus-probe` plain too.
2. C stays as designed unless the user asks for C1; D defaults to ledger.
3. Docs: the CLAUDE.md paragraph *A focused panel field walks the canvas…* gets one sentence (the
   clicked node is the box's only while the inline editor is open); the `plans/README.md` row;
   `editor-qa-fixes.md` gets a pointer.
4. No `index.html` refresh is implied by this plan; refreshing the committed build stays the
   separate, deliberate step.
