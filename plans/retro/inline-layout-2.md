# Retro layout 2 — inline editing pass

Pass 5 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `ce99f87`. Date 2026-10-21.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Retro --layout 2 --width 1440,768 --check
```

## Baseline (before any change)

`--check` FAIL. The first page of the plan whose own DOM (not the shared `s.v0`) is probed: 126 slots hit at both
widths, 2 WRONG, 0 NOT-RESTORED, 16 MISSING, 22 UNLEDGERED groups. 768 reads the same as 1440 but for the gallery's
`railLabel`.

| Section | 1440 hit | 768 hit | WRONG | MISSING |
|---|---|---|---|---|
| header | 13 | 13 | 0 | 0 |
| bio | 5 | 5 | 0 | 0 |
| media | 12 | 12 | 0 | `countLabel` |
| repertoire | 21 | 21 | 0 | 0 |
| gallery | 1 | 1 | 0 | 0 |
| pricing | 18 | 18 | 0 | 0 |
| calendar | 9 | 9 | 0 | `heading`, `availLabel` |
| map | 29 | 29 | 2 (`Manchester` opened `map.heading`) | `radius`, `rings#2`, 8 gig cells |
| form | 11 | 11 | 0 | 0 |
| testimonials | 7 | 7 | 0 | 0 |
| footer | 11 | 11 | 0 | 0 |

Reported *not drawn* at both widths (so UNLEDGERED): `header.kicker`, `header.availability`, `header.tags` ×6,
`media.listLabel` / `totalLabel` / `chipLabel`, `media.tracks[].sub` ×5, `repertoire.songs[].length` ×12,
`gallery.railLabel`, `pricing.kicker` / `reviews` / `rating`, `calendar.prompt` / `dateLabel`, `map.terms` /
`expand` / `gigs[].day` / `gigs[].month`, `form.bookings`, `form.fields[].placeholder` ×3, `testimonials.kicker`,
`testimonials.quotes[].when` ×5. *Paged*: the repertoire's last two songs, pricing's other two tiers, the
testimonials after the first.

## After

`--check` **PASS**: 156 slots hit at 1440 and 157 at 768, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, 0 UNLEDGERED. (The gallery's
`railLabel` is hit at 768 and *not drawn* at 1440: the union rule, no row.) Retro, Lime, Grunge, Editorial and Pop
layout 1 re-run at `--width 1440,768 --check` twice, the second time on the final code: all PASS, both times with the
counts they had (156 / 143, 156 / 143, 157 / 144, 155 / 142, 155 / 142).

Most of the baseline was **not** missing copy. 22 groups read "not drawn" and 16 slots MISSING, and only seven of those
groups are drawn at no width. The rest were the page printing a slot's words inside one node with decoration (`● Popular`,
`[ PRICING ]`, `Availability ↓`, `Expand view→`), or a word two fields share, which the matcher refused.

## Generic fixes

All in `EncoreBuilder.jsx` / `data.js` / `scripts/inline-probe.mjs`; **earlier pages re-run: yes** (five layout-1 pages, above).

1. **`INLINE_LINES`: a slot can declare the forms its line is printed in** (`data.js`; one template per form, `{}` the
   slot's copy, `{cell}` a sibling cell of its row, scoped like `INLINE_PART`). `inlineSlots` fills them into `slot.lines`
   (a pair's `line` is `[line]` now). `inlineFieldAt` takes a node as a framed slot's when it prints exactly one of the
   lines and the click is near the slot's words; two slots sharing a line (the city, month and time of a row) settle on the
   click; and **a node that prints exactly another field's line is not a peer of this one's words** (`others`), which is what
   keeps the chip's `● Featured` from being the counter's `Featured`. The box is narrowed to the words and typed in the
   face of the element that holds them (a month in its own uppercase span).
2. **Exact collisions have an order now.** `exact` slots that stand in several fields were skipped; they are settled by
   (a) *claims*: a framed slot whose line is drawn is spoken for (per field, as many rows as nodes print the line), so the
   bare `Manchester` nodes belong to the fields left; (b) *the copy as typed* (`120 mi` the stat, `120mi` the ring, equal
   once squashed); (c) *the heading or title on the largest type* (JP-146's rank), the other nodes going to the other
   field. The old rule opened the one exact slot from any node that printed its copy: the map's *Manchester* in the
   featured panel opened `map.heading`.
3. **The box follows a sticky card.** The form's layout-2 card sticks on the canvas; the box was placed once, so after a
   scroll under a stuck card it hung off the card (57 px at +60 and 144 at +120 at 1440, 57 and 177 at 768). A scroll listener on
   the canvas re-places the box and the blue field box (`refit`), as it already does on typing. Measured after: 3 px at every
   scroll, the offset the box has at open. It should serve layout 3's composed cell and layout 4's rail, which are unprobed.
4. **`tiltChain` refuses vertical type anywhere inside the node.** The header's polaroid prints *Manchester, UK* down its
   edge (`writing-mode: vertical-rl` on an inner span) and the same words on a horizontal wrapper; the wrapper was boxed
   as horizontal text, a 27 × 25 box on a 28 × 106 run. Found by eye (the probe saw a hit, since the sentinel landed
   within its 6 px pad of the wrong box); `header.location` is still reached from the place card.
5. **The gallery's two marks are scoped to layout 1** (`*.0.gallery.railLabel` / `sourceLabel`). Layout 2 draws `railLabel`
   once, at 768, and its block has no mark, so the unscoped rule made it unreachable.
6. **The probe** reads `lines`, counts a line among a slot's printed forms, takes other fields' lines out of a part slot's
   peers, and its second phase aims at framed slots as well as part slots (a month in `● Jul 12 · 22:00` is not the line's
   middle).

## Part slots / marks

No mark added, and two removed from layout 2. **`INLINE_PART`, scoped `*.1.`**, each a slot whose words are unique on the
page and sit in a longer node: `header.availability` (`● Available for bookings`), `media.listLabel` (`● Popular`),
`media.totalLabel` (`5 Featured / 5 Max`, beside the existing `countLabel`), `pricing.kicker` (`[ PRICING ]`),
`pricing.reviews` and `pricing.rating` (`32 reviews · 4.9 ★`), `calendar.dateLabel` (`Date ↓`), `map.terms`
(`… · 5 pins`), `map.expand` (`Expand view→`), `form.bookings` (`★★★★★  42 bookings`), `testimonials.kicker`
(`✎ What clients say`). **`INLINE_LINES`, scoped `*.1.`**, where the words are not unique: `calendar.availLabel`
`'{} ↓'` (the heading, and the top bar's literal `● Availability`), `media.chipLabel` `'● {}'` (the counter's `Featured`),
and the map's gig cells (`city` and `time`: `{city} · {month} · {time}`; `month` and `time` and `day`: `● {month} {day} · {time}`).
The map's `LINE_PAIRS` line (`City · time`, layout 1's) steps aside where `INLINE_LINES` names the cell.

## Ledger (`INLINE_OFF`, `Retro.1.…`)

| Row | Reason |
|---|---|
| `header.kicker` | not drawn: the layout-2 header prints no kicker (a shared identity key; the bio's role line and the form print it) |
| `header.tags` | not drawn: the layout-2 header prints no tag chips (a shared identity key; the bio prints them) |
| `repertoire.songs.length` | not drawn: only layout 3 prints a song's length |
| `calendar.prompt` | not drawn: it shows only while no day is cued, and the canvas opens with one cued |
| `form.fields.placeholder` | not drawn: the card's boxes print the label, and a placeholder only once the label is emptied |
| `testimonials.quotes.when` | not drawn: layout 2's card has no seat for it |
| `media.tracks.sub` | derived value: the seeded page prints the release and the running time as two nodes, and the whole line only once the list is stored |

The first two stretch the plan's "not drawn" reason: a shared header key the header does not draw at any width, the
fields the panel already marks "Not shown in this layout". The bio's role line and tag chips are printed from them, but a
bio has no field of its own for either, so no bio slot can open them: cross-section editing is the open question below.
Also reported, not ledgered here: `tiers.tags` and `songs.tags` (`*.*`, derived chips); *paged* rows (the repertoire's last two
songs, pricing's other two plans, the testimonials after the first); `gallery.railLabel` at 1440.

## Learned

- **The sticky card is the one the plan named, and it was a real bug** (generic fix 3). Layout 3's composed cell and
  layout 4's rail stick the same way and are unprobed, so pass 10 and 15 should look at the box under a stuck cell with
  `scratchpad/sticky.mjs`'s shape (open a box on a stuck node, scroll the scroller, compare the box with the node).
- **`tracks.sub` is a seed-only shape** and a ledger row loses it after the list is stored, when the whole line *is* drawn
  (twice, in the release and the time nodes) and an edit would work. `INLINE_OFF` knows no state. If that matters, a row that
  reads "seeded page only" is a small change to `inlineSlots`; left for the user (Open, below).
- **Why the baseline lied, for the next layout-2 pages.** The probe's `printed` and the app's exact path both want a node
  whose squashed text *equals* the slot's. Lime, Grunge, Editorial and Pop's layout 2 are the same blocks in other modes, so
  every `*.1.` part and line row here is expected to carry over; only a layout-2-specific shape (Pop's cards, Editorial's
  `[desktop, tablet, mobile]` seats) should be new. Expect pass 6 to be mostly the `Lime.1` ledger rows and a re-proof of these tables.
- **The fan.** Every card's title and the list rows under it hit; a card behind the front one opens by its visible words
  (the probe's two "unhit under an overlay" are the back cards' subtitles, `tracks.sub`, covered by another card). The box
  takes each card's tilt: *Late Lights* on the leaning card lies on its glyphs, *Manchester at 3am*'s box runs under the front
  card, as its words do.
- **The map's five *Manchester*s** are the best test the claim rule will get: heading, travel card, featured panel and three
  list rows, all one string in the seed. Typed apart they would have settled by text; seeded they cannot, and claims plus the
  largest-type rule do it. The layout-4 map's top gig (pass 15) is the same shape.
- **Header L2's newer fields all hit**: `subtitle`, `heroCta`, `faceTitle`, `faceBody`, `placeBody`, and `availability` as a
  part slot (the bullet is its own span's). The bio at layout 2 reads `tag`, `para1`, `credit` and `cta` only; its ID-card
  labels are other layouts' and other templates', so their `squash` check belongs to those passes.
- **Screenshots** (textarea tinted, 1440, viewport clips, 67 taken by the scratchpad `boxcheck.mjs` over every section, 14
  viewed, ten before the last two fixes and four after): the box lies on the glyphs for the availability pill, the chip and the list label (bullet left out), the
  calendar's `Availability` (arrow left out), the featured chip's day and each row's month and time, the pricing amount and
  `32 reviews`, the form heading, and the fan's leaning titles. 23 of 170 boxes were flagged by the rect-vs-rect comparison,
  none a fault, in the classes passes 3 and 4 recorded: part slots (the reference is the whole line), punctuation nodes (a
  `·` opens its neighbour), the price amount in Fraunces (box `line-height`, 9.5 px short of the content rect), and
  `availLabel` / the rows' cities, whose reference the harness takes from another node of equal text. No style mismatch
  remains (before fix 1 the month's box was `none` over an uppercase span).
- **Open:** (a) a state-aware ledger for `tracks.sub`; (b) whether the bio's role and tag chips should open the header's
  fields from the bio (cross-section; today panel-only at every layout that prints them elsewhere); (c) pass 4's finding that
  an over-cap title kills the header's clicks, left as asked.
- One check run is ~9 minutes for both widths; six in parallel (five layout-1 pages and this one) took ~10.
