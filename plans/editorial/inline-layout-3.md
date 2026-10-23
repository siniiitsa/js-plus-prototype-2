# Editorial layout 3 — inline editing pass

Pass 13 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `4da3f96`. Date 2026-10-22.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Editorial --layout 3 --width 1440,768 --check
```

## Baseline (before any change)

`--check` FAIL on six UNLEDGERED groups and nothing else: **0 WRONG, 0 NOT-RESTORED, 0 MISSING** at both widths, **167 slots hit at each**
(Lime's and Grunge's count, and shape; 1440 and 768 read the same). The positive control passed (Editorial's title is one node, in the nav
brand, the card and the h1: no `twoTone`, which is Grunge's alone), so the pass-12 probe fix was not needed here.

| Section | 1440 hit | 768 hit | WRONG | MISSING |
|---|---|---|---|---|
| header | 14 | 14 | 0 | 0 |
| bio | 11 | 11 | 0 | 0 |
| media | 11 | 11 | 0 | 0 |
| repertoire | 31 | 31 | 0 | 0 |
| calendar | 1 | 1 | 0 | 0 |
| gallery | 1 | 1 | 0 | 0 |
| pricing | 40 | 40 | 0 | 0 |
| map | 37 | 37 | 0 | 0 |
| form | 11 | 11 | 0 | 0 |
| testimonials | 20 | 20 | 0 | 0 |
| footer | 11 | 11 | 0 | 0 |

(Hits are clicks.) *Not drawn* at both
widths: `header.kicker`, `media.tracks[].sub` ×5, `repertoire.songs[].artist` ×8, `calendar.prompt`, `form.fields[].placeholder` ×3,
`testimonials.quotes[].when` ×5 — Lime's and Grunge's six, one for one.

## After

`--check` **PASS**: 167 slots hit at 1440 and 167 at 768, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, 0 UNLEDGERED, 59 `off` (36 before the rows). The six rows
below are the whole change to `data.js`.

## Generic fixes

**None**, in the app or in the probe. Nothing in the shared inline machinery moved (`data.js` gained ledger rows only), so the plan's re-run rule did not
trigger and **no earlier page was re-run**.

## Part slots / marks

None added, and **no mark**. The `*.2.` `INLINE_PART` rows (Retro's pass 10) are proved on Editorial as on Lime and Grunge; every one hit on its own words
(`bio.aboutLabel`, `media.listLabel` / `totalLabel`, `map.base` / `radius` / `expand`, `form.bookings`, `testimonials.kicker`).

**`INLINE_HEAD` was checked before it was trusted.** Editorial's layout-3 repertoire is the Lime tree's `limeCard` (`ed` arms: a `DashRule` round the card and
under each row, `position: relative`, nothing that changes what is drawn), in the same `if (s.v2)` block as Retro's `card`: `cap = 4` and
`perPage = s.mob ? 1 : 3` are declared once, above both, and `limeCard` reads `st.songs.slice(0, cap)` and `sets.slice(pg * perPage, (pg + 1) * perPage)`. By name
against `texts.mjs` (Editorial's own DOM, both widths, identical): Weddings draws *Valerie, Superstition, Uptown Funk, Dancing Queen* (rows 0 1 2 3); Pubs *Valerie, Sex on
Fire, Mr. Brightside, Don't Stop Me Now* (0 4 6 9); Birthdays *Uptown Funk, Dancing Queen, Crazy in Love, Mr. Brightside* (2 3 5 6). So the rows no card draws are 7, 8, 10, 11
and the probe's JSONL (`Editorial-L3-1440.jsonl` and `-768`) lists exactly `songs[7|8|10|11]` `.title`, `.artist` and `.length` as `off` with the INLINE_HEAD reason, at both
widths. `valerie.mjs` (Editorial): both drawn *Valerie*s open `repertoire.songs[0].title`, typing rewrites both nodes (`nodes printing ZZ: 2`), row 11 is untouched, Escape
restores — at 1440 and 768.

## Ledger (`INLINE_OFF`, `Editorial.2.…`, and `INLINE_HEAD`)

Each confirmed by the probe at both widths **and read off Editorial's own DOM** (`scratchpad/texts.mjs`: every text node of the page at 1440 and 768, identical; each string
searched across the sections), not copied from Grunge's.

| Row | Reason |
|---|---|
| `header.kicker` | not drawn: the layout-3 card prints `cardLine` (*Performing since 2021*) in the kicker's seat. `DJ · Live Act` is in **one** section's text, the bio's (its *Current role*); the header's nodes hold the name, the card line, `Manchester, UK` and the six chips, and the form's layout-3 card does not print it |
| `repertoire.songs.artist` | not drawn: layout 3 prints a song's length in the seat the artist holds elsewhere (*Amy Winehouse* is nowhere on the page) |
| `calendar.prompt` | not drawn: shows only while no day is cued, and the canvas opens with one cued (the page prints `Enquiry About June 12`; no *Pick a date* in the section) |
| `form.fields.placeholder` | not drawn: the card's boxes print the uppercased label (`EVENT DATE`, `EVENT TYPE`, `YOUR EMAIL`); no `dd / mm / yyyy` in the section |
| `testimonials.quotes.when` | not drawn: layout 3's wall has no seat for it (no `Reviewed …` in the section) |
| `media.tracks.sub` | derived value: the seeded page prints the release and the running time as two nodes (`Single`, `5:42`); `Single · 5:42` is in no node |
| `*.2.repertoire.songs` (`INLINE_HEAD`, rows only) | live-only copy, unchanged from pass 10: the seed's rows 7, 8, 10 and 11 |

Also reported, not ledgered (`*.*` rows, or paging): `tiers.tags` / `songs.tags`.

## Learned

- **Editorial's layout 3 is Grunge's with a different skin, and nothing it adds reaches the box.** The title is one node (no `twoTone`), so the control passes and the caret is the
  node's own. The header card is upright (`tilt.mjs`: header 0 transformed text nodes; the bio's and the footer's `KAI MERCER` wordmarks are rotated ring text with no slot, and the map's
  `30mi` / `60mi` / `120mi` are translate-only). **No tape sits over text on this page**: "unhit under an overlay" is 0 and `charsweep` finds no dead character on a node.
- **The scheme seats are invisible to the box.** `seats.mjs` over all eleven sections at both widths (14 / 11 / 11 / 28 / 1 / 1 / 40 / 31 / 11 / 20 / 11 boxes): **0 mismatches** between a
  node's computed colour, face, size, weight and `text-transform` and the textarea's caret colour, face, size, weight and transform. That takes in the layout-3 seats (the header on Scheme 3
  with its `[5]` / `[1]` nodes, the gallery on 2, the map on 4, the audio card's `[2]`, the repertoire's three sets `[4]` / `[2]` / `[3]`, pricing's
  featured row and the map's panel `[3]`, the testimonials' three registers): the box takes the node's computed style at click time, so whichever scheme the node stands on is the box's. The caret
  is a colour-checked fact since pass 8 (the caret was the first element child's colour; fixed there), and holds on the card heads and the pills here.
- **Gloock's single weight and `text-transform` hold:** 77 Gloock nodes in `boxcheck.mjs`, all `400` in the node and `400` in the textarea, `uppercase` on the heads, set titles, pills and
  testimonial names, `none` on nothing but Inter body copy. No weight or case mismatch flagged on any box.
- **The composed page needed nothing, and the box follows it.** At 1440 the calendar's heading stands in the sticky right column (x 1061). `sticky3.mjs`: a box opened on `Book Me` is stuck at
  y 123 from scrollTop 806 to ~2360 and released at the row's end, and **the box is 1.1 px under the node at every step, including the release** (`stickyrel.mjs`, 120 px steps through scrollTop 5246: `d 1.1`
  throughout; Grunge 0.3, Lime 1.8, Retro 1.2 — each display face's content box). The bio's heading, a left-column node, is a constant 12.8 px as it scrolls off. At 768 nothing composes: 0.8 px on
  the calendar, 10 px on the bio heading, constant. Screenshot: the box lies on *BOOK ME*.
- **Every visible character of every text node opens its own slot.** `charsweep.mjs` (up to 10 characters of each of 286 nodes, 1831 clicks at 1440): 9 nodes flagged at both widths, **the same nine as
  Retro's, Lime's and Grunge's**, all by design (the three set lines and the map's five `City · time` rows, two slots in one node; and `Based in … · 5 pins · 120 mi radius`, with 1–2 clicks on a `·` or `5
  pins` opening nothing). The dead zone is the separator between two slots of a line; left. No overlapping-card group at layout 3.
- **Screenshots** (textarea tinted, 1440; 179 boxes by `boxcheck.mjs`, 17 flagged, 4 shots viewed): the box lies on the glyphs for the header's `KAI MERCER`, the sticky `BOOK ME`, the set line's
  `EASY LISTENING` (the rest of the line left out) and the form's two-line `BOOK KAI MERCER…` heading. The 17 flags are the classes passes 3–12 recorded, in the same places: part slots measured against
  the whole line (`[`, `]`, the three set lines, `Based in…`), the price `£` and the amount in Gloock (box `line-height` against the content rect: 8 px shorter on the amount, still over the glyphs),
  and the map rows' cities, whose reference is another node of equal text. No weight or case mismatch.
- **For pass 14 (Pop L3):** expect the same shape: the `*.2.` part rows and `INLINE_HEAD` carry over (Pop uses the same `limeCard`, `cap = 4`, `perPage = 3`; read its `pop` arms), and the ledger is
  `Pop.2.…` with the same six, **after reading each reason off Pop's own DOM**. Pop's L3 has its own seats (the header on 6 with the page's white round the card at desktop through `cardOnPage`,
  the calendar on 2, the gallery on 2, the map on 4) and its stickers (`pointer-events: none`): run `seats.mjs` (THEME=Pop LAYOUT=3) over every section and check the caret, not only the geometry. Titan One
  is one weight (400); `uppercase` comes from `text-transform`. Pop's layout-3 header card (`HeaderV2`, the Pop arm) may be tilted: run `tilt.mjs`. If the positive control aborts, read the header's text
  nodes with `hdr.mjs` before touching anything (pass 12's lesson). `stickyrel.mjs` and `valerie.mjs` have the theme hard-coded: `perl -pi -e "s/open\('Editorial'/open('Pop'/"`.
- **Open (carried):** (a) a state-aware ledger for `tracks.sub`; (b) the bio→header cross-section question; (c) pass 4's over-cap title finding; (d) two different rows with the same title both drawn at
  layout 3 open nothing. All left as asked.
- A check run is ~9 minutes for both widths; `seats`, `tilt`, `charsweep` at both widths and `boxcheck` ran beside it, and `sticky3`, `stickyrel` and `valerie` too, without trouble.
