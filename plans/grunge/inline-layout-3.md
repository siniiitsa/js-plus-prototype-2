# Grunge layout 3 — inline editing pass

Pass 12 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `d932f82`. Date 2026-10-22.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Grunge --layout 3 --width 1440,768 --check
```

## Baseline (before any change)

The first run **aborted at the probe's positive control** (`a click on the header's title opened no header.title box`), exit 2, before a
single section was clicked. It was the control, not the page: it looked for one text node reading exactly the artist's name, and Grunge's
layout-3 header prints the name as **two word spans** (`Title`'s `twoTone` arm: `Kai` white, `Mercer` red, in the h1, the nav brand and the
card; Lime's nav brand and card are one node, which is what the control found). A click on either word walks up to the h1 whose text is
`Kai Mercer`, so the title was reachable all along. See *Generic fixes*.

With the control fixed, `--check` FAIL on six UNLEDGERED groups and nothing else: **0 WRONG, 0 NOT-RESTORED, 0 MISSING** at both widths,
167 slots hit at each (Lime L3's count and shape; 1440 and 768 read the same).

| Section | 1440 hit | 768 hit | WRONG | MISSING |
|---|---|---|---|---|
| header | 16 | 16 | 0 | 0 |
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

(Hits are clicks.) *Not drawn* at both widths: `header.kicker`, `media.tracks[].sub` ×5, `repertoire.songs[].artist` ×8, `calendar.prompt`,
`form.fields[].placeholder` ×3, `testimonials.quotes[].when` ×5 — Lime's six, one for one.

## After

`--check` **PASS**: 167 slots hit at 1440 and 167 at 768, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, 0 UNLEDGERED, 59 `off` (36 before the rows). The six
rows below are the whole change to `data.js`.

## Generic fixes

**None in the app.** Nothing in the shared inline machinery moved (`data.js` gained ledger rows only), so the plan's re-run rule did not trigger.

**One in the probe** (`scripts/inline-probe.mjs`): the positive control accepts the largest node that is the name whole *or one of its words*
(`kai mercer`, `kai`, `mercer`), not only the whole name. It still requires the click to open `header.title`; a word of a two-span title lands there
through the h1. A relaxation, so it cannot hide a failure the old control caught: re-run with `--cat header --width 1440` on Retro, Lime, Grunge,
Editorial and Pop L1 and Retro, Lime, Editorial and Pop L3, all PASS with the control satisfied (and Grunge L3's own header, 16 hit). Passes 13 and 14
would have hit the same abort on Editorial or Pop if their `twoTone` card split the name too; they will not now.

## Part slots / marks

None added, and **no mark**. The `*.2.` `INLINE_PART` rows (Retro's pass 10) are proved on Grunge as they were on Lime; every one hit on its own words
(`bio.aboutLabel`, `media.listLabel` / `totalLabel`, `map.base` / `radius` / `expand`, `form.bookings`, `testimonials.kicker`). The brackets of `[ About ]` and
the `●` of `● Popular` are left out of the box.

**`INLINE_HEAD` was checked before it was trusted.** Grunge's layout-3 repertoire is the Lime tree's `limeCard` (`s.limeTree`, which Lime, Grunge, Editorial and Pop
share), inside the same `if (s.v2)` block as Retro's `card`: `cap = 4` and `perPage = s.mob ? 1 : 3` are declared once, above both, and `limeCard` reads
`st.songs.slice(0, cap)` and `sets.slice(pg * perPage, (pg + 1) * perPage)`. By name against `texts.mjs` and the seed: Weddings draws *Valerie, Superstition, Uptown
Funk, Dancing Queen* (rows 0 1 2 3); Pubs *Valerie, Sex on Fire, Mr. Brightside, Don't Stop Me Now* (0 4 6 9); Birthdays *Uptown Funk, Dancing Queen, Crazy in Love, Mr.
Brightside* (2 3 5 6). So the rows no card draws are 7, 8, 10, 11, and *I Wanna Dance*, *September* and *Rather Be* are in none of the section's text (0 matches
each). The probe's own JSONL (`Grunge-L3-1440.jsonl` and `-768`) lists exactly `songs[7|8|10|11]` `.title`, `.artist` and `.length` as `off` with the INLINE_HEAD reason,
identical at both widths. `valerie.mjs` (Grunge): both drawn *Valerie*s open `repertoire.songs[0].title`, typing rewrites both nodes (`nodes printing ZZ: 2`),
row 11 is untouched, Escape restores.

## Ledger (`INLINE_OFF`, `Grunge.2.…`, and `INLINE_HEAD`)

Each confirmed by the probe at both widths and read off Grunge's own DOM (`scratchpad/texts.mjs`: every text node of the page at 1440 and 768, identical; each
string searched across the sections).

| Row | Reason |
|---|---|
| `header.kicker` | not drawn: the layout-3 card prints `cardLine` (*Performing since 2021*) in the kicker's seat. `DJ · Live Act` is in **one** section's text, the bio's (its *Current role*); the header's nodes hold the name, the card line, `Manchester, UK` and the chips, and the form's layout-3 card does not print it (the `Grunge.1` row's "and the form print it" is layout 2's) |
| `repertoire.songs.artist` | not drawn: layout 3 prints a song's length in the seat the artist holds elsewhere (*Amy Winehouse* is nowhere in the section) |
| `calendar.prompt` | not drawn: shows only while no day is cued, and the canvas opens with one cued (the page prints `Enquiry About June 12`) |
| `form.fields.placeholder` | not drawn: the card's boxes print the label (`EVENT DATE`, `EVENT TYPE`, `YOUR EMAIL`); no `dd / mm / yyyy` in the section |
| `testimonials.quotes.when` | not drawn: layout 3's wall has no seat for it (`Reviewed …` is nowhere in the section) |
| `media.tracks.sub` | derived value: the seeded page prints the release and the running time as two nodes (`Single`, `5:42`); `Single · 5:42` is in no node |
| `*.2.repertoire.songs` (`INLINE_HEAD`, rows only) | live-only copy, unchanged from pass 10: the seed's rows 7, 8, 10 and 11 |

Also reported, not ledgered (the `*.*` rows): `tiers.tags` ×6 and `songs.tags` ×18.

## Learned

- **The title is two spans on Grunge, and the hit-test already handles it.** `inlineFieldAt` walks up from the clicked node and tests each ancestor's whole text, so a click on
  `Kai` or `Mercer` reaches the h1 (and the nav brand's and the card's wrapper, ranked by largest type, JP-146). Every one of the title's characters opens `header.title`
  (`charsweep`: header 118 clicks, 104 opened, 0 flagged). Only the probe's control assumed one node. The box lies on both words (screenshot: `KAI MERCER` in the h1, the box over
  both). **The caret is the h1's colour, white**, where `Mercer` is red (`seats.mjs`: 3 "mismatches", all `header.title`'s `Mercer`: the box's one caret over a two-tone
  line is the first word's, 15, 80.25 and 22.14 px in Anton, which is the node's face, size, weight and case). Left: a caret at the end of the line sits white beside a red word.
- **The composed page needed nothing, and the box follows it.** At 1440 the calendar's heading stands in the sticky right column (x 1061). `sticky3.mjs`: a box opened on `Book Me`
  is stuck at y 124 from scrollTop 806 to ~2000, released at the row's end, and **the box is 0.3 px under the node at every step, including the release** (`stickyrel.mjs`, 120 px
  steps through scrollTop 5246: `d 0.2`–`0.3` throughout; Lime 1.7–1.8, Retro 1.1–1.2, the difference being each display face's content box). The bio's heading, a left-column
  node, is a constant 12.4 px as it scrolls off. At 768 nothing composes: 0.6 px on the calendar, 9.5 px on the bio heading, constant. Screenshot: the box lies on *BOOK ME*.
- **Every visible character of every text node opens its own slot.** `charsweep.mjs` (up to 10 characters of each of 289 nodes, 1834 clicks a width): 9 nodes flagged at both
  widths, **the same nine as Retro's and Lime's**, all by design (the three set lines and the map's five `City · time` rows, two slots in one node; and `Based in … · 5 pins · 120 mi
  radius`, with 1–2 clicks on a `·` or `5 pins` opening nothing). The dead zone is the separator between two slots of a line; left. No overlapping-card group at layout 3.
- **Seats** (`seats.mjs`, all eleven sections, both widths): every box's `caretColor`, face, size, weight and `text-transform` equal its node's on 16 / 11 / 11 / 28 / 1 / 1 / 40 /
  31 / 11 / 20 / 11 boxes; the only mismatches are the title's `Mercer` caret, above. Anton (display), Chakra Petch (the chips) and Inter (body) are one weight each in the
  boxes; the set cards' `uppercase` meta and the red and ink cards' type colours are the node's.
- **Rotation** (`tilt.mjs`): none on a slot, and **the header's card is upright** (Grunge's layout-3 header, like Lime's, is `HeaderV2`'s inset card, not Retro's tilted polaroid:
  header 0 transformed text nodes). The bio's and the footer's `KAI MERCER` wordmarks are rotated ring text (seals with no slot, about 19–26°, nested), and the map's `30mi` / `60mi` /
  `120mi` ring labels are translate-only. **No tape sits over text on this page** (layout 3's bio borrows the tape; the probe's "unhit under an overlay" is 0 and `charsweep`
  finds no dead character on a node), so none of the hit-test fixes had to take it up.
- **Screenshots** (textarea tinted, 1440; 178 boxes by `boxcheck.mjs`, 17 flagged, 4 shots viewed): the box lies on the glyphs for the header's `KAI MERCER` (both words, the
  distress mask under it), the sticky `BOOK ME`, the set line's `MELLOW` (the rest left out) and the form's heading. The 17 flags are the classes passes 3–11 recorded, in the
  same places: part slots measured against the whole line (`[`, `]`, the three set lines, `Based in…`), the price `£` and the amount in Anton (box `line-height` against
  the content rect: 8 px shorter on the amount, 4 px lower, still over the glyphs), and the map rows' cities, whose reference is another node of equal text. No weight or case
  mismatch.
- **For pass 13 (Editorial L3):** expect the same shape: the `*.2.` part rows and `INLINE_HEAD` carry over (Editorial uses the same `limeCard`, `cap = 4`, `perPage = 3`; check it
  in `limeCard`'s `ed` arms, since its card draws a `DashRule`), and the ledger is `Editorial.2.…` with Lime's six, **after reading each reason off Editorial's own DOM**. Gloock is one
  weight and `cased()` / `text-transform` must hold in the box. Editorial's layout 3 has its own scheme seats (the header on 3 with `[5]` / `[1]` nodes, the gallery on 2, the map on 4);
  the header card's `twoTone` is Grunge's only (`twoTone={grunge}`), so the title there is one node and the control passes either way.
- **Open (carried):** (a) a state-aware ledger for `tracks.sub`; (b) the bio→header cross-section question; (c) pass 4's over-cap title finding; (d) two different rows with the same
  title both drawn at layout 3 open nothing. All left as asked.
- A check run is ~9 minutes for both widths; `charsweep` at both widths, `boxcheck` and the control sweep ran beside it without trouble.
