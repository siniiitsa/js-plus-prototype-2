# Pop layout 1 — inline editing pass

Pass 4 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `34e5327`. Date 2026-10-21.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Pop --layout 1 --width 1440,768 --check
```

## Baseline (before any change)

`--check` FAIL, on exactly the two UNLEDGERED groups the plan predicted; nothing else. Pop's 768, unmeasured until now,
is as clean as its 1440.

| Section | 1440 hit | 768 hit | WRONG / NOT-RESTORED / MISSING |
|---|---|---|---|
| header | 13 | 13 | 0 |
| bio | 3 | 3 | 0 |
| media | 14 | 14 | 0 |
| gallery | 6 | 5 | 0 |
| repertoire | 31 | 13 | 0 |
| map | 31 | 31 | 0 |
| pricing | 34 | 34 | 0 |
| calendar | 2 | 2 | 0 |
| form | 22 | 22 | 0 |
| testimonials | 4 | 4 | 0 |
| footer | 11 | 11 | 0 |

(Hits are clicks; the totals are distinct slots.) Totals 155 slots hit at 1440, 142 at 768, 0 WRONG, 0 NOT-RESTORED,
0 MISSING. UNLEDGERED: `repertoire.songs.length` ×12, `calendar.prompt`. (Gallery's `sourceLabel` is *not drawn* at 768
and hit at 1440: the union rule, no row. The repertoire's 31 → 13 is its pager: six songs at 768, the rest *paged*.)

## After

`--check` **PASS**: 155 hit at 1440, 142 at 768, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, 0 UNLEDGERED. The only change is
the two ledger rows below.

## Generic fixes

None. No hit-test or box-placement change, so no earlier page was re-run (a two-line edit to the `INLINE_OFF` table,
keyed `Pop.0`, cannot reach Retro, Lime, Grunge or Editorial).

## Part slots / marks

None. Pass 1's two gallery marks (`railLabel`, `sourceLabel`) cover Pop: its gallery block reads them through the `pt`
helper, and both hit at 1440 (the second is desktop-only).

## Ledger (`INLINE_OFF`, `Pop.0.…`)

| Row | Reason |
|---|---|
| `repertoire.songs.length` | not drawn: only layout 3 prints a song's length |
| `calendar.prompt` | not drawn: it shows only while no day is cued, and the canvas opens with one cued |

Also reported, not ledgered here: `tiers.tags` and `songs.tags` (`*.*`, derived chips), *paged* rows (the testimonials'
reviews after the first at both widths; the repertoire past the sixth song at 768).

## Learned

- **The tie-break was tested for the first time, and it holds in the seed state.** Pop's header stands the location and
  kicker (12.74px) *inside* the title's content box at 1440 (kicker rect 380–394, title rect 374–490), and the title's
  words are the topmost elements over them: the probe's `over` readings are exactly these two (`span`, over
  `header.location` and `header.kicker`), and both still open their own field, so the smallest-box rule is what is
  working there. A harness (scratchpad, not committed) then separated *ink* from boxes: it screenshots the header with
  the title hidden, with the small type hidden, and with neither, takes the pixels that differ as each one's ink,
  and clicks every 2px point of the title / kicker / location region (700 clicks at 1440, 674 at 768), recording the
  field that opens against what is under the pointer.
  - *On the small type's ink* (311 clicks at 1440, 319 at 768): the location or the kicker opened every time, never the
    title.
  - *On the title's ink* (304 and 274): the title, every time.
  - *Title ink inside a small type box (±3px)*: **no such point exists** at either width. The title's caps start at
    y≈398 and the small type ends at 394 (its 3px pad ends at 397), so the two only share *empty* box space. Inside
    the small type's own line rect the small type wins every time (45 of 45 blank points at 1440, besides the 311
    on its ink); in the 3px ring just outside that rect the title wins most (29 of 40: 6 location, 5 kicker), which
    is the boxes' own edges, not the ink. At 768 the small type lies wholly above the title's box.
    So the display-word-over-small-label contest the plan feared is geometrically empty at this layout; the rule is
    still the default, now checked on the real overlap.
- **A title over its cap makes the whole header dead to a click — a limit of the "non-slot on top" rule, not fixed
  here.** Pop layout 1's Title cap is 13; stored copy over it renders clamped (`Mercer…`). That word is then no slot
  (its text is not the field's), and since it is the topmost element over the kicker and location, `inlineFieldAt`
  returns nothing for `e.target` and never walks the stack (the rule that a lower slot may not win past a non-slot
  element on top, kept because a seal over small print opened the line, Phase 0). Measured: `Kai Mercer Jrr` (14)
  → the kicker, location and the title word itself all open nothing; `Kai Mercer Jr` (13) opens all three. Reachable
  by switching to a smaller cap after typing a longer name: another header layout (Pop L2 and L3 allow 18) or, more
  ordinarily, another *theme* (the theme pick patches `theme` alone and keeps every section's copy; Grunge L1 allows
  19, Retro L1 23, against Pop's 13). The panel is the way in, as for every clamped field ("known and accepted", the plan's hazards). Two ways out if the
  user wants it fixed: let the stack walk resume when `e.target` is an HTML text element whose own text box does not
  hold the pointer (risk: a pill's padding over a label would then open the label, and that rule touches every page, so
  it needs the full re-run); or make the clamped title word a slot through the stem rule `findFieldNode` already has.
  Neither is done. Not measured elsewhere: it needs a clamped word standing over another field's copy, which of the
  pages passed so far only Pop's header does.
- **No sticker stood over a slot's copy.** Pop's stickers, scribbles and dot grids are beside the type or
  `pointer-events: none`; the probe's `over` readings are the two header words above, the gallery's literal `04 — 07`
  counter and the form seal's ring (`KAI MERCER` twice, which the page prints and no field owns: only the header's seal
  has a `badgeText`). 0 WRONG, so nothing unseen was caught by a sentinel.
- **The 80% placeholders.** The form's four label-in-box inputs are hit as `form.fields[n].placeholder`; on `Full name`
  and `you@email.com` the textarea is 52×14 on a 50×14 line (the 2px slack) and its caret is `rgba(255, 255, 255, 0.8)`,
  the placeholder's own white. The repertoire's search field is live-only (`s.live` is false on the canvas) and its
  placeholder is a literal no field owns, so there is no slot and no box to measure.
- **Screenshots** (textarea tinted magenta, 1440, viewport clips with `captureBeyondViewport: false`, 13 viewed of
  78 taken over every section; the scratchpad `boxcheck.mjs` of pass 3, now taking `Pop 1`). Every box lies on its
  glyphs: the nav brand and the h1 (both open `header.title`, the ranking rule), the location and kicker over the photograph,
  Titan One's price amount on a leant pricing card, the heading over the violet and the red,
  the form's label and heading on pink and violet, the track card's title, the calendar's heading and the footer's Book
  Now pill (the arrow is not in the box: pass 2's fix holds). The comparison of the box against the text's own rect
  flagged 17 of 169 boxes, none a fault, in the classes pass 3 recorded: six `·` punctuation nodes beside a song's
  artist (the click opens the artist); four map cities and the map's `Upcoming gigs · N` (a part of a longer line; the
  reference was not the part); three `£` leads whose `overflow` flag was read before the box grew (60 / 60 after
  typing); and three Titan One price amounts, whose box is `line-height` tall, 13.8px short of the content rect and
  centred on it (the display-face class again).
- **No section's rendering, `vm` keys, fields or live behaviour changed**, so the only `notes/` edits are the two ledger
  rows' mentions in `repertoire.md` and `calendar.md`.
- A check run is ~9 minutes for both widths; the tie-break harness ~2 minutes and the box harness ~3 alongside it.
