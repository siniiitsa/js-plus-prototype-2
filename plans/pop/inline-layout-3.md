# Pop layout 3 — inline editing pass

Pass 14 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `03a93ce`. Date 2026-10-22.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Pop --layout 3 --width 1440,768 --check
```

## Baseline (before any change)

`--check` FAIL on six UNLEDGERED groups and nothing else: **0 WRONG, 0 NOT-RESTORED, 0 MISSING** at both widths, **167 slots hit at each**
(Retro's, Lime's, Grunge's and Editorial's count and shape). The positive control passed: the header's text nodes (`hdr.mjs`-style, `texts.mjs`) hold the name as one node in the nav
brand and the card and as two word nodes in the h1 (`Kai` / `Mercer`, Grunge's shape), and the control, which has accepted a word of the name since pass 12, opens `header.title` on it.

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
| testimonials | 21 | 20 | 0 | 0 |
| footer | 11 | 11 | 0 | 0 |

(Hits are clicks; the testimonials' 21st at 1440 is the kicker's `●`, see *Learned*.) *Not drawn* at both widths: `header.kicker`, `media.tracks[].sub` ×5,
`repertoire.songs[].artist` ×8, `calendar.prompt`, `form.fields[].placeholder` ×3, `testimonials.quotes[].when` ×5 — Editorial's six, one for one.

## After

`--check` **PASS**: 167 slots hit at 1440 and 167 at 768, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, 0 UNLEDGERED, 59 `off` (36 before the rows). The six rows below
are the whole change to `data.js`.

## Generic fixes

**None**, in the app or in the probe. `data.js` gained ledger rows only, so the plan's re-run rule did not trigger and **no earlier page was re-run**.

## Part slots / marks

None added, and **no mark**. The `*.2.` `INLINE_PART` rows (Retro's pass 10) are proved on Pop as on the other four (`bio.aboutLabel`, `media.listLabel` / `totalLabel`,
`map.base` / `radius` / `expand`, `form.bookings`, `testimonials.kicker`).

**`INLINE_HEAD` was checked before it was trusted.** Pop's layout-3 repertoire is the Lime tree's `limeCard` (`G` has a `pop` arm for its radius, padding and row
height; `disp` is uppercase), in the same `if (s.v2)` block as Retro's `card`: `cap = 4` and `perPage = s.mob ? 1 : 3` are declared once, above both, and `limeCard` reads
`st.songs.slice(0, cap)` and `sets.slice(pg * perPage, (pg + 1) * perPage)`. The probe's JSONL (`Pop-L3-1440.jsonl`, and `-768`) lists exactly `songs[7|8|10|11]`
`.title`, `.artist`, `.length` and `.tags` as `off`, the first three with the INLINE_HEAD reason, at both widths: the same four rows Retro, Lime, Grunge and
Editorial draw no card for (the seed's Weddings 0 1 2 3, Pubs 0 4 6 9, Birthdays 2 3 5 6). `valerie.mjs` (Pop): both drawn *Valerie*s open `repertoire.songs[0].title`,
typing rewrites both nodes (`nodes printing ZZ: 2`), row 11 is untouched, Escape restores — at 1440 and 768.

## Ledger (`INLINE_OFF`, `Pop.2.…`, and `INLINE_HEAD`)

Each confirmed by the probe at both widths **and read off Pop's own DOM** (`scratchpad/texts.mjs`: every raw text node of the page at 1440 and 768, identical;
each string searched across the sections, case-insensitively, since Pop's `uppercase` makes `innerText` read `DJ · LIVE ACT`; `reasons.mjs` for the HTML),
not copied from Editorial's.

| Row | Reason |
|---|---|
| `header.kicker` | not drawn: the layout-3 card prints `cardLine` (*Performing since 2021*) in the kicker's seat. `DJ · Live Act` is in **one** section's text, the bio's (its *Current role*); the header's nodes hold the name, `Manchester, UK`, the six chips and the card line |
| `repertoire.songs.artist` | not drawn: layout 3 prints a song's length in the seat the artist holds elsewhere (*Amy Winehouse* is nowhere on the page) |
| `calendar.prompt` | not drawn: shows only while no day is cued, and the canvas opens with one cued (the page prints `Enquiry About June 12`; no *Pick a date* in the section) |
| `form.fields.placeholder` | not drawn: the card's boxes print the uppercased label (`EVENT DATE`, `EVENT TYPE`, `YOUR EMAIL`); no `dd / mm / yyyy` in the section's text or HTML |
| `testimonials.quotes.when` | not drawn: layout 3's wall has no seat for it (no `Reviewed …` in the section) |
| `media.tracks.sub` | derived value: the seeded page prints the release and the running time as two nodes (`Single`, `5:42`); `Single · 5:42` is in no node |
| `*.2.repertoire.songs` (`INLINE_HEAD`, rows only) | live-only copy, unchanged from pass 10: the seed's rows 7, 8, 10 and 11 |

Also reported, not ledgered (`*.*` rows, or paging): `tiers.tags` / `songs.tags`.

## Learned

- **Pop's layout 3 is Editorial's with a different skin, and nothing it adds reaches the box.** The control passes (above). **The header card is upright**
  (`tilt.mjs`, both widths: header 0 transformed text nodes; the only rotated text is the bio's and the footer's `KAI MERCER` ring wordmarks, which have no slot, and the
  map's `30mi` / `60mi` / `120mi`, translate-only). So the tilted-card concern did not arise. The bio's stickers (the smiley-globe seal, the sparkle, the scribble) are
  `pointer-events: none` and the probe reports 0 *unhit under an overlay* at both widths.
- **The scheme seats are invisible to the box, but one box was the wrong node.** `seats.mjs` (THEME=Pop LAYOUT=3, all eleven sections, both widths: 14 / 11 / 11 / 28 / 1 / 1 / 40 / 31 / 11 /
  21 or 20 / 11 boxes) compares each node's computed colour, face, size, weight and `text-transform` with the textarea's caret colour, face, size, weight and transform:
  **0 mismatches at 768, 1 at 1440 (below), none a style fault**. That takes in the layout-3 seats (the header on Scheme 6 with the page's white round the card through
  `cardOnPage`, the calendar's lime card on the composed column, the gallery's lime sheet, the map's blue band, the audio card, the repertoire's three sets, pricing's
  featured row, the testimonials' cells): the box takes the node's computed style at click time, so whichever scheme the node stands on is the box's. Caret colours are
  the nodes' own (violet on white, white on blue, lime on pink); Titan One is `400` and `uppercase` on every head, set title, pill and testimonial name, in the node and in the box.
- **Found, not fixed — a click on the lower half of the testimonials kicker's `●` opens the heading, at 1440 only.** Pop lifts the heading 0.14em (`position: relative; top: -0.14em`),
  so its element box (y 109) starts 6 px inside the kicker line (y 103–115, the `●` span 9 × 12 at x 370). `e.target` there is the `h2`, a slot, and the bullet is no slot (it is the
  kicker's markup), so nothing competes: `dot2.mjs` swept the glyph — y 103–108 opens nothing, y 109–115 (x 371–374) opens `testimonials.heading`; the kicker's word from x 377 on opens
  `testimonials.kicker` at every y (the smaller box wins). The heading's own ink starts about y 118, so it is the *text box*, not the glyph, that gets the click: pass 4's class
  (range rects are the font's content box). It surfaced as `seats.mjs`'s one mismatch (the `●` node's centre is y 109); the probe passes it as punctuation-only and `charsweep` skips it
  (the topmost node at the character's centre is the `h2`). Left, because a fix is generic (a non-slot text node under the pointer would block a slot below it, which Pop L1's title over its
  kicker and every `·` and `£` node would feel) and costs fourteen re-runs for a 5 px strip of a decorative glyph. At 768 the kicker sits clear of the heading. Open for a user call. **Closed in pass 21** (`../inline-edit-all.md`): `inlineFieldAt` now lets a smaller non-slot text box under the pointer veto the slot; the `●` opens nothing at any y, the kicker's word still opens the kicker, and the per-character sweep moved only that one click.
- **The composed page needed nothing, and the box follows it.** At 1440 the calendar's heading stands in the sticky right column (x 1061). `sticky3.mjs`: a box opened on *Book Me* is stuck at y 122
  from scrollTop 806 to ~1526 and released at the row's end, and **the box is 0.3 px under the node at every step, including the release** (`stickyrel.mjs`, 120 px steps through scrollTop 5246:
  `d 0.3` throughout, Grunge's number; Lime 1.8, Editorial 1.1, Retro 1.2). The bio's heading, a left-column node, is a constant 1 px as it scrolls off. At 768 nothing composes: 0.4 px on the
  calendar, 1.5 px on the bio, constant. Screenshot: the box lies on *BOOK ME* in the stuck cell.
- **Every visible character of every text node opens its own slot.** `charsweep.mjs` (up to 10 characters of each of 286 nodes, 1831 clicks, both widths): 9 nodes flagged at each, **the same
  nine as Retro's, Lime's, Grunge's and Editorial's**, all by design (the three set lines and the map's five `City · time` rows, two slots in one node; and `Based in … · 5 pins · 120 mi radius`,
  with 1–2 clicks on a `·` or `5 pins` opening nothing). The dead zone is the separator between two slots of a line; left.
- **Screenshots** (textarea tinted, 1440; 179 boxes by `boxcheck.mjs`, 18 flagged, 6 shots viewed): the box lies on the glyphs for the header's `KAI MERCER` (the nav brand), the sticky
  `BOOK ME`, the pricing amount `450` (Titan One), the form's two-line `BOOK KAI MERCER…` heading on the white card, a set's first song `VALERIE` and the testimonials' `EXPERIENCES.`. The 18 flags are the
  classes passes 3–13 recorded, in the same places — part slots measured against the whole line (`[`, `]`, the three set lines, `Based in…`), the price `£` and the amount in Titan One (box
  `line-height` against the content rect), and the map rows' cities, whose reference is another node of equal text — plus the `●` above, flagged for a face mismatch because it opened the heading.
  No weight or case mismatch on any real slot.
- **For pass 15 (Retro L4):** layout 4 is where `stats` first draws (the map's wall, 12 cells), the ticker repeats copy, and the carousels have arrows. Expect the `*.3.` part rows to be new work; the
  ledger will be `Retro.3.…`. Read `notes/map.md`, `notes/list-editors.md` and `plans/retro/layout-4.md`; the stat wall and the ticker need the claims-and-ranks machinery, not marks.
- **Open (carried):** (a) a state-aware ledger for `tracks.sub`; (b) the bio→header cross-section question; (c) pass 4's over-cap title finding; (d) two different rows with the same title both drawn at
  layout 3 open nothing; (e) new here, the `●` above. All left as asked.
- A check run is ~9 minutes for both widths; `seats`, `tilt`, `charsweep` at both widths, `boxcheck`, `sticky3`, `stickyrel` and `valerie` ran beside it without trouble.
