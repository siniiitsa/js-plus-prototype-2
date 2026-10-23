# Grunge layout 2 — inline editing pass

Pass 7 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `dacd3a8`. Date 2026-10-22.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Grunge --layout 2 --width 1440,768 --check
```

## Baseline (before any change)

`--check` FAIL, on seven UNLEDGERED groups and nothing else: **0 WRONG, 0 NOT-RESTORED, 0 MISSING** at both widths. As on
Lime, the `*.1.` `INLINE_PART` / `INLINE_LINES` rows from Retro's pass 5 are keyed `*` for the template, so they applied to
Grunge's blocks without a change, and every one of them hit.

| Section | 1440 hit | 768 hit | WRONG | MISSING |
|---|---|---|---|---|
| header | 12 | 12 | 0 | 0 |
| bio | 5 | 5 | 0 | 0 |
| media | 15 | 16 | 0 | 0 |
| repertoire | 21 | 21 | 0 | 0 |
| gallery | 1 | 2 | 0 | 0 |
| pricing | 22 | 21 | 0 | 0 |
| calendar | 12 | 12 | 0 | 0 |
| map | 48 | 47 | 0 | 0 |
| form | 13 | 13 | 0 | 0 |
| testimonials | 8 | 8 | 0 | 0 |
| footer | 11 | 11 | 0 | 0 |

Totals 155 hit at 1440, 156 at 768. UNLEDGERED: `header.kicker`, `header.tags` ×6, `media.tracks[].sub` ×5,
`repertoire.songs[].length` ×12, `calendar.prompt`, `form.fields[].placeholder` ×3, `testimonials.quotes[].when` ×5 — the
same seven groups as `Lime.1` and `Retro.1`.

## After

`--check` **PASS**: 155 hit at 1440 and 156 at 768, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, 0 UNLEDGERED. The gallery's
`railLabel` is hit at 768 and *not drawn* at 1440 (the union rule, no row).

## Generic fixes

**None.** Nothing in the shared inline machinery moved, so no earlier page was re-run (the plan's rule only triggers on a
change to shared code). The one edit is seven `INLINE_OFF` rows in `data.js`.

## Part slots / marks

None added, **no mark**. The `*.1.` rows from pass 5 are **proved on Grunge** as well as Lime: `header.availability`,
`media.listLabel` / `totalLabel`, `pricing.kicker` / `reviews` / `rating`, `calendar.dateLabel`, `map.terms` / `expand`,
`form.bookings`, `testimonials.kicker`, and the `INLINE_LINES` for `calendar.availLabel`, `media.chipLabel` and the map's
gig cells. The map's five *Manchester*s gave 0 WRONG again, in Grunge's faces.

## Ledger (`INLINE_OFF`, `Grunge.1.…`)

Each confirmed by the probe at both widths **and read off Grunge's own DOM** (`scratchpad/reasons.mjs`: each string, searched in
the section's text and HTML), not copied from Lime's.

| Row | Reason |
|---|---|
| `header.kicker` | not drawn: the layout-2 header prints no kicker. `DJ · Live Act` is in no header node (its text holds `DJ & selector`, the subtitle); the form's credit prints it |
| `header.tags` | not drawn: no tag chips in the header (the bio prints them) |
| `repertoire.songs.length` | not drawn: `3:54` is nowhere in the section; only layout 3 prints a song's length |
| `calendar.prompt` | not drawn: shows only while no day is cued, and the canvas opens with one cued |
| `form.fields.placeholder` | not drawn: the card's boxes print the uppercased label (`EVENT DATE`, `YOUR EMAIL`…); no `dd / mm / yyyy` in the HTML |
| `testimonials.quotes.when` | not drawn: no `Reviewed` in the section's HTML; only the `s.v0` branch draws it |
| `media.tracks.sub` | derived value: the seeded page prints the release and the running time as two nodes (`Single`, `5:42`); the joined `Single · 5:42` is in no node |

Also reported, not ledgered (`*.*` rows, the union rule or paging): `tiers.tags` / `songs.tags`; `gallery.railLabel` at 1440;
*paged* rows (the repertoire's last two songs, pricing's other two plans, the testimonials after the first).

## Learned

- **Grunge's layout-2 page is Lime's, hit for hit** (155 / 156 against Lime's 155 / 156; the per-section counts agree but for the
  form, 13 against 12). The wildcarded `*.1.` rows did all the work; the pass was seven ledger rows and the checks below. Expect Editorial and
  Pop to differ only where their layout 2 differs from the shared blocks (Editorial's `[desktop, tablet, mobile]` seats, Pop's
  cards on white), and read each ledger reason off their own DOM as this pass did.
- **Rotation is the new ground, and it is only the fan.** A scan of every text node for a transformed ancestor
  (`scratchpad/tilt.mjs`) finds the media fan's five cards (about ±10.6° and ±5.3°, with `matrix()` on the card and an upright
  middle card), the map's `30mi` / `60mi` / `120mi` ring labels (a translate only) and the footer's two tilted `KAI MERCER`
  wordmarks (22° and 26°, nested). The wordmarks are the page's decoration, printed from the artist's name; they belong to no
  footer field and are 2 of the footer's 3 unhit nodes, as on layout 1. **The box follows the tilt**: on *Late Lights* (leaning
  left) and *Roomtone* (leaning right) the pink box lies on the rotated glyphs, and on *Slow Burn* (the front card) it is
  upright. A back card's title or subtitle under the front card is *unhit under an overlay* at the first click and is reached
  by its words, as at Retro and Lime. No tape sits over text on this page: Grunge's tape is the gallery's and the photo cards',
  and none of the five hit-test fixes had to take it up.
- **The sticky form card** (`scratchpad/sticky.mjs`, opened on the card's *Event date* label, scrolled 0, +60 and +120 px): the box
  is **exactly on the node** (0 px) at every step at 1440 and 768, including the step where the card releases at the foot of its
  row (1440, node y 186 → 158, the box with it). Retro's fix 3 serves Grunge unchanged.
- **The featured gig chip has no dead zone on Grunge.** Lime's pass found the click in the middle of `Jul 12 · 22:00` opening
  nothing: the ` · ` between `12` and `22:00` lies outside every word's ±4 px. Grunge's chip is Inter 10 px, 63 px wide, and
  sweeping a click along it at 2 px steps (`scratchpad/chip2.mjs`) opens `month` from the left edge, `day` from 19 px and `time`
  from 33 px, with **no gap**; the separator sits at 30–33 px, which the `day` word's tolerance and `time`'s cover. So Grunge
  needs nothing, and Lime's 11 px chip stays the one that would want the "nearest word wins inside a line's union" rule.
- **Screenshots** (textarea tinted, 1440; 165 boxes measured by `boxcheck.mjs`, 18 flagged, 9 shots viewed): the box lies on the
  glyphs for the availability pill (bullet left out), the fan's tilted titles, the glass card's `THE FACE OF THE ACT`, the
  calendar's `Availability` (arrow left out), the map row's `21:00` under the uppercase `JUL`, the pricing amount and the form's
  two-line heading. The 18 flags are the classes passes 3–6 recorded, in the same places as Lime's 18: part slots measured
  against the whole line (`availability`, `chipLabel`, `kicker`, `dateLabel`, `terms`, the testimonials kicker), a `·` or `· 21:00`
  node, the price's `£` and the amount in Anton (box `line-height` against the content rect: 8 px shorter on `450`, 4 px lower, still
  over the glyphs), and `availLabel` / the rows' cities, whose reference is another node of equal text. No style mismatch, no weight
  mismatch.
- **Open (carried from pass 5):** (a) a state-aware ledger for `tracks.sub`; (b) the bio→header cross-section question (the bio's
  role line and tag chips are printed from the header's keys, with no slot of their own); (c) pass 4's over-cap title finding.
  All three left as asked.
- A check run is ~9 minutes for both widths; the box harness and `sticky.mjs` ran beside it without trouble.
