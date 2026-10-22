# Pop layout 2 — inline editing pass

Pass 9 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `363ed33`. Date 2026-10-22.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Pop --layout 2 --width 1440,768 --check
```

## Baseline (before any change)

`--check` FAIL, on the seven UNLEDGERED groups `Lime.1`, `Grunge.1` and `Editorial.1` had, and nothing else: **0 WRONG, 0 NOT-RESTORED,
0 MISSING** at both widths. The `*.1.` `INLINE_PART` / `INLINE_LINES` rows from Retro's pass 5 carried over to Pop's blocks unchanged,
and Pop's lime cards on white and its `onScheme` nodes needed nothing from the hit-test.

| Section | 1440 hit | 768 hit | WRONG | MISSING |
|---|---|---|---|---|
| header | 12 | 12 | 0 | 0 |
| bio | 5 | 5 | 0 | 0 |
| media | 14 | 15 | 0 | 0 |
| repertoire | 21 | 21 | 0 | 0 |
| gallery | 1 | 2 | 0 | 0 |
| pricing | 22 | 21 | 0 | 0 |
| calendar | 12 | 12 | 0 | 0 |
| map | 48 | 47 | 0 | 0 |
| form | 13 | 13 | 0 | 0 |
| testimonials | 8 | 8 | 0 | 0 |
| footer | 11 | 11 | 0 | 0 |

(Hits are clicks.) Totals 155 slots hit at 1440, 156 at 768. UNLEDGERED: `header.kicker`, `header.tags` ×6, `media.tracks[].sub` ×5,
`repertoire.songs[].length` ×12, `calendar.prompt`, `form.fields[].placeholder` ×3, `testimonials.quotes[].when` ×5.

## After

`--check` **PASS**: 155 hit at 1440 and 156 at 768, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, 0 UNLEDGERED, with the seven ledger rows below and the one
generic fix below in. (The gallery's `railLabel` is hit at 768 and *not drawn* at 1440: the union rule, no row.)

## Generic fixes

One, **found by the fan check, not by `--check`**; **earlier pages re-run: yes** (Retro, Lime, Grunge, Editorial and Pop L1, and Retro, Lime,
Grunge, Editorial and Pop L2, `--width 1440,768 --check`, ten probes in parallel, ~10 min): all PASS **with the counts they had** (156 / 143,
156 / 143, 157 / 144, 155 / 142, 155 / 142; 156 / 157, 155 / 156, 155 / 156, 155 / 156, 155 / 156).

1. **A slot under an opaque element is not what the pointer is on** (`inlineFieldAt`, `EncoreBuilder.jsx`). The stack rule lets a slot lower in
   `elementsFromPoint` win over `e.target`'s when its own text box under the pointer is the smaller. In the media fan the cards overlap, and a
   back card's title lies under the front card's: a click on the *visible* glyphs of *Echo & The Floor* (a 151 px box) landed inside
   *Roomtone*'s smaller box (94 px) behind it and **opened Roomtone's field**. The probe aims at the middle of a node's first line, so it never
   saw it; `scratchpad/fan3.mjs` clicks the centre of every character whose topmost element is the title's own node, in all five fan titles, and
   reports the slot that opens. Before the fix, on layout 2 (wrong opens / characters swept): Pop 8 of 26 (*Manchester at 3am* 3 of 5, *Echo* 5 of 5), Retro 3 of 28 (*Echo* 3 of 3), Lime 4 of 27 (*Manchester* 1 of 7, *Echo* 3 of 4), Grunge 2 of 26 (*Echo* 2 of 2), Editorial 1 of 25 (*Echo* 1 of 4). After: **every visible character opens its own card on all five templates**, both widths measured on Pop and Editorial (1440 on the rest).
   The fix: a lower candidate is skipped when an element *above it in the stack* that does not contain it paints a ground of its own
   (`paintsOver`: an image or gradient, or a colour at alpha ≥ .5), since text under such an element is hidden. A bare text overlay (Pop L1's
   title over the kicker, where nothing opaque sits between) is untouched: Pop L1's probe is as before. I also tried taking the pointer back
   through the tilt before measuring the text box, since a tilted range is a bounding box that grows with the angle; with the opaque rule in
   place it changed nothing, so it was dropped.

## Part slots / marks

None added, **no mark**. The `*.1.` rows from pass 5 are **proved on Pop** as well: `header.availability`, `media.listLabel` / `totalLabel`,
`pricing.kicker` / `reviews` / `rating`, `calendar.dateLabel`, `map.terms` / `expand`, `form.bookings`, `testimonials.kicker`, and the
`INLINE_LINES` for `calendar.availLabel`, `media.chipLabel` and the map's gig cells. The map's five *Manchester*s gave 0 WRONG in Titan One.

## Ledger (`INLINE_OFF`, `Pop.1.…`)

Each confirmed by the probe at both widths **and read off Pop's own DOM** (`scratchpad/reasons.mjs`, edited for Pop: each string, searched in the
section's text and HTML), not copied from Editorial's.

| Row | Reason |
|---|---|
| `header.kicker` | not drawn: the layout-2 header prints no kicker (`DJ · Live Act` is in no header node, whose text holds `DJ & selector`; the form's credit prints it) |
| `header.tags` | not drawn: no tag chips in the header (`Default` is nowhere in it; the bio prints them) |
| `repertoire.songs.length` | not drawn: `3:54` is nowhere in the section; only layout 3 prints a song's length |
| `calendar.prompt` | not drawn: shows only while no day is cued, and the canvas opens with one cued |
| `form.fields.placeholder` | not drawn: the card's boxes print the uppercased label (`EVENT DATE`); no `dd / mm / yyyy` in the HTML, no `input` in the section, no `--ph` |
| `testimonials.quotes.when` | not drawn: no `Reviewed` in the section's HTML; only the `s.v0` branch draws it |
| `media.tracks.sub` | derived value: the seeded page prints the release and the running time as two nodes (`Single`, `5:42`); the joined `Single · 5:42` is in no node |

Also reported, not ledgered (`*.*` rows, the union rule or paging): `tiers.tags` / `songs.tags`; `gallery.railLabel` at 1440; *paged* rows (the
repertoire's last two songs, pricing's other two plans, the testimonials after the first). Four clicks at 1440 and three at 768 are "unhit under
an overlay": the fan's back cards' subtitles and titles under the front card, as on Editorial.

## Learned

- **The new ground needed no code.** Pop's lime cards on a white page (`cardOnPage`) and its `s.onScheme[n]` nodes are colour only; the hit-test
  reads text. `scratchpad/seats.mjs` (edited for Pop, all eleven sections, both widths) compares every box's `caretColor`, face, size, weight and
  `text-transform` with its node's computed values: **2 boxes flagged per width (`bio.credit` and the fan's back card), neither a fault; every other box matches**. 1440: 165 boxes over header (12), bio (5), media
  (15), repertoire (21), gallery (1), pricing (22), calendar (12), map (45), form (13), testimonials (8), footer (11); 768: 165 (media 16, gallery 2, pricing 21, map 44).
  (a) `bio.credit`, clicked on its second half: the caret is the lead's accent, as designed (Editorial's pass). (b) the fan's back card *Manchester at 3am*, whose
  first-line middle is under *Slow Burn*: the box is the front card's (violet on lime, Titan One 15.68 px uppercase, which is what is on top). Titan One is
  one weight (400) and `uppercase` on every head, pill and card title, in the node and in the box; the white page, the lime media / calendar cards, the
  blue form band (`rgb(37, 99, 255)`) and the pink footer give every ground, and the pills' caret (Book pills on `[3]`, `[4]`, `[6]`) is the pill text's own
  (pass 8's fix).
- **The sticky form card** (`scratchpad/sticky.mjs Pop 2 1440|768`, opened on *Event date*, scrolled 0, +60, +120): the box is exactly on the node at each step
  (0 px), including the release at the foot of the row at 1440 (node y 179 → 136, the box with it). At 768 the card is stuck throughout (y 193).
- **The featured gig chip has no dead zone on Pop.** Inter 10 px, 63 px wide; a click swept along it (`scratchpad/chip2.mjs`) opens `month` from the left
  edge, `day` from 19 px and `time` from 33 px, no gap (Grunge's and Editorial's result, not Lime's 11 px chip).
- **Rotation**: the fan's five cards tilt as on Grunge and Editorial (matrix angles about ±10.6° and ±5.3°); pricing's one plan card leans 3° and carries
  19 text nodes; the map's ring labels (a translate only) and the footer's two nested `KAI MERCER` wordmarks are the rest. The boxes follow each
  `matrix()`: the pricing amount `450` in Titan One lies on its glyphs on the leaning card.
- **No placeholder is drawn on the canvas at layout 2** (the Pop `--ph` 0.8 is layout 1's form and repertoire search; layout 2's boxes are `--ph: 1` and
  none is an `input` on the canvas), so there is nothing to measure in the box. Pop's layout-2 form prints the uppercased label, which is what `fields.label`'s
  boxes follow.
- **Screenshots** (textarea tinted, 1440; 165 boxes measured by `boxcheck.mjs`, 18 flagged, ~10 shots viewed): the box lies on the glyphs for the availability pill
  (bullet left out), the hero CTA (arrow left out), the fan's front title, the pricing amount on the 3° card, the calendar's `Availability` (arrow left out), the
  testimonials kicker (`✎` left out) and the form's two-line heading on the blue band. The 18 flags are the classes passes 3–8 recorded, in the same places: part
  slots measured against the whole line (`availability`, `chipLabel`, `kicker`, `dateLabel`, `terms`, the testimonials kicker, `pricing.reviews`'s `·`), a `·`
  or `· 21:00` node, the price's `£` and the amount in Titan One (box `line-height` against the content rect), and `availLabel` / the rows' cities, whose
  reference is another node of equal text. No style mismatch, no weight mismatch.
- **For pass 10 (Retro L3):** the stack rule now has the opaque-element guard, so a composed page's cards that overlap (the sticky calendar over the bio column,
  layout 3's wall) are covered the same way; look at the box under the sticky cell with `sticky.mjs`'s shape (open a box on a stuck node, scroll, compare). Run
  `fan3.mjs`'s shape (every visible character of an overlapping group opens its own slot) wherever cards overlap: the probe's line-middle aim cannot see
  this class. A good candidate to fold into `inline-probe.mjs` as a second aim (the first visible character) if a later pass finds another.
- **Open (carried from pass 5):** (a) a state-aware ledger for `tracks.sub`; (b) the bio→header cross-section question (the bio's role line and tag chips are
  printed from the header's keys, with no slot of their own); (c) pass 4's over-cap title finding (the opaque rule does not touch it: a clamped title word is a
  non-slot over the kicker, not an opaque ground). All three left as asked.
- A check run is ~9 minutes for both widths; ten in parallel took ~10.
