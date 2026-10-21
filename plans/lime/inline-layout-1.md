# Lime layout 1 — inline editing pass

Pass 1 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `0f51a06`. Date 2026-10-21.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Lime --layout 1 --width 1440,768 --check
```

## Baseline (before any change)

`--check` FAIL, on exactly the four UNLEDGERED groups; nothing else.

| Section | 1440 hit | 768 hit | WRONG / NOT-RESTORED / MISSING |
|---|---|---|---|
| header | 12 | 12 | 0 |
| bio | 3 | 3 | 0 |
| media | 15 | 15 | 0 |
| gallery | 3 | 3 | 0 |
| repertoire | 37 | 19 | 0 |
| map | 31 | 32 | 0 |
| pricing | 34 | 34 | 0 |
| calendar | 2 | 2 | 0 |
| form | 21 | 21 | 0 |
| testimonials | 4 | 4 | 0 |
| footer | 11 | 11 | 0 |

Totals 154 hit at 1440, 142 at 768, 0 WRONG, 0 NOT-RESTORED, 0 MISSING. UNLEDGERED: `gallery.railLabel`,
`gallery.sourceLabel`, `repertoire.songs.length` ×12, `calendar.prompt`.

## After

`--check` **PASS**: 156 hit at 1440, 143 at 768, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, 0 UNLEDGERED.
Gallery 3 → 5 hits at 1440 (both labels), 3 → 4 at 768 (`sourceLabel` is desktop-only).

## Generic fixes

None. No hit-test or box-placement change; nothing in the shared inline machinery moved, so no earlier page needed
a full re-run. (Retro, Grunge, Pop and Editorial layout 1's **gallery** were re-run at both widths, since the marks
below sit in a block they share: all PASS, see Learned.)

## Part slots / marks

Two marks added, **no new mark names**: `railLabel` and `sourceLabel`, the two `EncoreSection` already carried for
Retro, now also set in the gallery's Lime-tree layout-1 block (`s.limeTree`: Lime, Grunge, Editorial, Pop).

- **Why a mark, and why text cannot do it.** Lime's gallery draws *Gallery* twice at desktop: the open source row's
  label (20px, `g.label` of row 0) and the credit line's second line under the name (12px, `s.galRailLabel`). Two
  different fields with the same copy; no part slot (neither is inside a longer line) and no rank (they are
  different fields, not repeats of one). The seat was probed first: both nodes are unmarked in the DOM, and the
  probe's `marked` slots need the mark to count a node as printing them, so before the change both read as *not
  drawn*, a false reading.
- **How.** The block's `eyebrow` and `pt` helpers take an optional third argument, `mark`, written as
  `data-inline={mark}`; the credit passes `'railLabel'` (Lime / Grunge / Editorial through `eyebrow`, Pop through
  `pt`), and the source label span carries `data-inline={g.on ? 'sourceLabel' : undefined}`, Retro's own rule (the
  open row, which on the canvas is row 0 and the slot's `gallerySources[0].label`).
- **Budget.** The plan's rule is a handful of marks for the whole plan and "stop and ask past ~3". This is two
  mark names at two more sites, and one edit serves passes 2–4 for this branch.

## Ledger (`INLINE_OFF`, `Lime.0.…`)

| Row | Reason |
|---|---|
| `repertoire.songs.length` | not drawn: only layout 3 prints a song's length |
| `calendar.prompt` | not drawn: it shows only while no day is cued, and the canvas opens with one cued |

Also reported, not ledgered here (already covered by `*.*` rows or by the union rule): `tiers.tags` and `songs.tags`
(`*.*`, derived chips); `gallery.sourceLabel` at 768 (*not drawn*, desktop-only, hit at 1440); *paged* rows (the
testimonials' reviews after the first at both widths; the repertoire past the sixth song at 768).

## Learned

- **Marks, not the stack, were the whole story.** The pass was expected near-free and was: no WRONG at all, and the
  only real gap was the two missing marks. **Phase 0's reading of Grunge and Pop** ("`railLabel` / `sourceLabel`
  drawn at no width") **was the same missing mark**, not an absent node. Re-running Grunge, Pop and Editorial L1's
  gallery with `--cat gallery --width 1440,768` after the edit gives 5 hit at 1440 and 4 at 768, 0 not-drawn at
  1440, PASS on each. Their passes (2–4) therefore ledger only `songs.length` and `calendar.prompt`.
- **Screenshots, step 3** (textarea tinted red with a magenta outline, one per section, 1440): the box lies on the
  glyphs over every Lime ground, the dark header and the lime and pale-green bands, for the header (nav brand →
  `header.title`, kicker), bio heading, media heading, gallery (kicker, back link, both *Gallery* labels),
  repertoire, map, pricing, calendar, form, testimonials and footer. No decoration sat over a slot's text in those
  shots (the bio's seal is beside the heading, the header's globe beside the brand); the probe's one "unhit under
  an overlay" is the gallery's literal `04 — 07` counter, which no field owns. Not eyeballed: the pricing and map
  rows past the first, which the probe proves by node and sentinel only.
- **The nav brand and the h1 both read the artist's name**: the click on the brand opens `header.title` (the
  ranking rule, JP-146); no collision at Lime layout 1.
- The box's tie-break (smallest text box) is still only eyeballed: nothing in Lime layout 1 stacks small type under
  a display word, so nothing here tests it.
- **A harness trap** (cost a few minutes): section ids are numbers; setting `selectedId` to a *string* leaves the
  section unselected, so the first click never opens a box. Pass the id as a value (`page.evaluate(fn, sid)`), not
  through a template string.
- One check run is ~9 minutes for both widths.
