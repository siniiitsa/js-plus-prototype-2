# Editorial layout 2 — inline editing pass

Pass 8 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `ed92d23`. Date 2026-10-22.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Editorial --layout 2 --width 1440,768 --check
```

## Baseline (before any change)

`--check` FAIL: **1 WRONG** at each width, 0 NOT-RESTORED, 0 MISSING, and the seven UNLEDGERED groups `Lime.1` and `Grunge.1`
had. The `*.1.` `INLINE_PART` / `INLINE_LINES` rows from Retro's pass 5 carried over to Editorial's blocks unchanged.

| Section | 1440 hit | 768 hit | WRONG | MISSING |
|---|---|---|---|---|
| header | 12 | 12 | 0 | 0 |
| bio | 5 | 5 | 0 | 0 |
| media | 13 | 14 | **1** (`Manchester at 3am` opened `tracks[2].title`) | 0 |
| repertoire | 21 | 21 | 0 | 0 |
| gallery | 1 | 2 | 0 | 0 |
| pricing | 22 | 21 | 0 | 0 |
| calendar | 12 | 12 | 0 | 0 |
| map | 48 | 47 | 0 | 0 |
| form | 13 | 13 | 0 | 0 |
| testimonials | 8 | 8 | 0 | 0 |
| footer | 11 | 11 | 0 | 0 |

Totals 155 hit at 1440, 156 at 768. UNLEDGERED: `header.kicker`, `header.tags` ×6, `media.tracks[].sub` ×5,
`repertoire.songs[].length` ×12, `calendar.prompt`, `form.fields[].placeholder` ×3, `testimonials.quotes[].when` ×5.

## After

`--check` **PASS**: 155 hit at 1440 and 156 at 768, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, 0 UNLEDGERED. (The gallery's `railLabel`
is hit at 768 and *not drawn* at 1440: the union rule, no row.)

## Generic fixes

Two, both found by this pass; **earlier pages re-run: yes** (Retro, Lime, Grunge, Editorial and Pop L1, and Retro, Lime and
Grunge L2, `--width 1440,768 --check`, nine probes in parallel, ~10 min): all PASS **with the counts they had** (156 / 143,
156 / 143, 157 / 144, 155 / 142, 155 / 142; 156 / 157, 155 / 156, 155 / 156).

1. **The caret took the colour of the node's first *element child*** (`startInline`, `EncoreBuilder.jsx`). That rule is
   from the pilot (`2b985a3`) and serves a two-tone line, whose accent lead is the first child. It misfires on every **Book
   pill**: the first child is the arrow disc, whose colour is the pill's own ground, so the caret was the pill's colour on the pill
   (terracotta on Editorial's terracotta header, bio, pricing, map, testimonials and footer pills; paper on the form's paper
   pill) and the pill's text could be typed into with no caret in sight. `32 reviews · 4.9 ★` took the star's accent in the
   same way. It predates the pass and is on every template's layout-2 pills (Retro L2's pricing pill: the disc's cream on
   its sand, faint). Earlier passes' shots tinted the textarea magenta with an outline, which hides it, and `--check` does
   not look at colour. **Fix:** the caret is the colour of the element holding the first of the words (`textRange`'s
   start text node for a part slot, else the first non-blank text node of the node), so `bio.credit`'s accent lead is
   still accent and a pill's text is its own. **Verified** with `scratchpad/seats.mjs`: every box on the page, both widths,
   the textarea's `caretColor` against the node's computed `color`, face, size, weight and transform: before, 14 boxes at 1440 and
   13 at 768 differed, every one in `caretColor` (the pills, `32 reviews`, `Expand view`, the calendar's `Start Enquiry`); after, none apart from
   `bio.credit` (clicked on the credit's second half, caret the lead's accent, as designed). Zoomed untinted shots of the header's and the pricing pill's caret show it drawn, in the text's colour.
2. **The probe's WRONG no longer counts a click on a covered node** (`scripts/inline-probe.mjs`). The aim is the middle of a
   node's first text rectangle; the fan's back card *Manchester at 3am* wraps to two lines under Gloock, and that point
   lies inside the front card's *Slow Burn* title, which is on top. The app opened `tracks[2].title`: right for the pixel, and
   Retro / Lime / Grunge never met it, because on their narrower faces the point fell on artwork (a non-slot element: "unhit under
   an overlay"). `__aim` now also returns the covering element's text, and a result that would be WRONG is `unhit` (counted
   under an overlay) when the slot that opened prints *exactly* that text. A slot that prints neither the clicked node's copy
   nor the covering element's is still WRONG. The slot stays proved: `media.tracks[1].title` hits through the list row.
   *This changes the probe, not the app.* The nine re-runs above were taken with it.

## Part slots / marks

None added, **no mark**. The `*.1.` rows from pass 5 are proved on Editorial as well: `header.availability`, `media.listLabel` /
`totalLabel`, `pricing.kicker` / `reviews` / `rating`, `calendar.dateLabel`, `map.terms` / `expand`, `form.bookings`,
`testimonials.kicker`, and the `INLINE_LINES` for `calendar.availLabel`, `media.chipLabel` and the map's gig cells. The map's
five *Manchester*s gave 0 WRONG in Gloock too.

## Ledger (`INLINE_OFF`, `Editorial.1.…`)

Each confirmed by the probe at both widths **and read off Editorial's own DOM** (`scratchpad/reasons.mjs`: each string,
searched in the section's text and HTML), not copied from Grunge's.

| Row | Reason |
|---|---|
| `header.kicker` | not drawn: the layout-2 header prints no kicker (`DJ · Live Act` is in no header node; the subtitle holds `DJ & selector`; the form's credit prints it) |
| `header.tags` | not drawn: no tag chips in the header (the bio prints them) |
| `repertoire.songs.length` | not drawn: `3:54` is nowhere in the section; only layout 3 prints a song's length |
| `calendar.prompt` | not drawn: shows only while no day is cued, and the canvas opens with one cued |
| `form.fields.placeholder` | not drawn: the card's boxes print the uppercased label (`EVENT DATE`); no `dd / mm / yyyy` in the HTML |
| `testimonials.quotes.when` | not drawn: no `Reviewed` in the section's HTML; only the `s.v0` branch draws it |
| `media.tracks.sub` | derived value: the seeded page prints the release and the running time as two nodes (`Single`, `5:42`); the joined `Single · 5:42` is in no node |

Also reported, not ledgered (`*.*` rows, the union rule or paging): `tiers.tags` / `songs.tags`; `gallery.railLabel` at 1440; *paged*
rows (the repertoire's last two songs, pricing's other two plans, the testimonials after the first).

## Learned

- **The `[desktop, tablet, mobile]` seats are not a problem for the box.** The box copies the node's computed style at click time, so it
  takes whichever seat `DEV_SEAT` resolved for the width. Measured over every text node of repertoire (`[4, 1, 1]`) and pricing
  (`[3, 1, 1]`), both widths (`scratchpad/seats.mjs`): repertoire's ground is terracotta at 1440 (its song tiles a lighter terracotta) and paper at 768 (the tiles cream), pricing's is ink at 1440 and paper at 768, and on all 21 repertoire boxes at each width and 22 / 21 pricing boxes the textarea's face,
  size, weight and text-transform equal the node's (the caret colour too, after fix 1). Nothing reads `s.bg`.
- **Gloock's single weight and `text-transform` hold at layout 2**: 66 Gloock nodes in `boxcheck.mjs`, all `400` in the node and
  `400` in the textarea, `uppercase` on the heads, pills, card titles and the fan, `none` on the price amounts; no weight or
  transform mismatch flagged on any box.
- **The sticky form card** (`scratchpad/sticky.mjs`, opened on *Event date*, scrolled 0, +60, +120): the box is **exactly on the node** at
  every step at 1440 (including the release at the foot of the row, node y 182 → 149, the box with it) and within 1 px at 768.
- **The featured gig chip has no dead zone on Editorial.** Inter 10 px, 63 px wide, the separator at 30–33 px from the left; a click
  swept along it (`scratchpad/chip2.mjs`) opens `month` from the left edge, `day` from 19 px and `time` from 33 px, no gap — Grunge's
  result, not Lime's 11 px chip.
- **Rotation**: the fan's five cards tilt as on Grunge (±10.6°, ±5.3°); the box follows each card's `matrix()`. In the shots the box lies on
  the leaning titles and on the front card's *Slow Burn*, and the back cards' title stays reachable by the words
  that show beside the front card.
- **Screenshots** (textarea tinted, 1440; 164 boxes measured by `boxcheck.mjs`, 18 flagged, ~12 shots viewed): the box lies on the glyphs
  for the availability pill (bullet left out), the hero CTA, the fan, the price amount, the pricing pill, the calendar's `Availability` (arrow left out),
  the testimonials kicker (`✎` left out) and the form's two-line heading. The 18
  flags are the classes passes 3–7 recorded, in the places they were on Lime and Grunge: part slots measured against the whole line
  (`availability`, `chipLabel`, `kicker`, `dateLabel`, `terms`, the testimonials kicker), a `·` or `· 21:00` node, the price's `£` and
  the amount in Gloock (box `line-height` against the content rect; `scrollLeft` stays 0 after typing), and `availLabel` / the
  rows' cities, whose reference is another node of equal text. No style mismatch, no weight mismatch.
- **For pass 9 (Pop L2):** the pills' caret and the covered-node rule are generic now and need nothing from Pop. Expect the `*.1.` rows to carry over
  again and the seven ledger rows, read off Pop's own DOM; the new ground is the lime cards on white (`cardOnPage`) and the `onScheme`
  nodes, so run `seats.mjs` (edit its theme) over every section: a box whose caret or face differs from its node is the only way a
  scheme seat can show. Run the **caret check**, not only the geometry: `--check` does not see colour.
- **Open (carried from pass 5):** (a) a state-aware ledger for `tracks.sub`; (b) the bio→header cross-section question (the bio's role line
  and tag chips are printed from the header's keys, with no slot of their own); (c) pass 4's over-cap title finding. All three left as asked.
- A check run is ~9 minutes for both widths (nine in parallel, ~10).
