# Retro layout 3 — inline editing pass

Pass 10 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `54199d3`. Date 2026-10-22.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Retro --layout 3 --width 1440,768 --check
```

## Baseline (before any change)

`--check` FAIL. The first layout-3 DOM probed, and a smaller baseline than pass 5's: **2 WRONG, 0 NOT-RESTORED, 2 MISSING**, and 15
UNLEDGERED groups. 1440 and 768 read the same: the composition (the calendar in a sticky right column beside bio and media) moves
boxes, not copy.

| Section | 1440 hit | 768 hit | WRONG | MISSING |
|---|---|---|---|---|
| header | 14 | 14 | 0 | 0 |
| bio | 7 | 7 | 0 | 0 |
| media | 9 | 9 | 0 | 0 |
| repertoire | 29 | 29 | **2** (`Valerie` opened `songs[11].title`, `3:54` opened `songs[11].length`) | `songs[11].title`, `songs[11].length` |
| calendar | 1 | 1 | 0 | 0 |
| gallery | 1 | 1 | 0 | 0 |
| pricing | 40 | 40 | 0 | 0 |
| map | 34 | 34 | 0 | 0 |
| form | 10 | 10 | 0 | 0 |
| testimonials | 19 | 19 | 0 | 0 |
| footer | 11 | 11 | 0 | 0 |

(Hits are clicks.) 158 slots hit at both widths. *Not drawn* at both (so UNLEDGERED): `bio.aboutLabel`, `media.listLabel` / `totalLabel` /
`tracks[].sub` ×5, `repertoire.songs[].artist` ×12 / `title` ×3 / `length` ×3, `calendar.prompt`, `map.radius` / `base` / `expand`,
`form.bookings` / `fields[].placeholder` ×3, `testimonials.kicker` / `quotes[].when` ×5.

Most of those were not missing copy but the page printing a slot's words inside one node with decoration (`[ About ]`, `● Popular`,
`★★★★★ 42 bookings`), pass 5's shape; eight of the fifteen are `*.2.` part rows.

## After

`--check` **PASS**: 166 slots hit at 1440 and 166 at 768, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, 0 UNLEDGERED, 58 `off` (24 before the pass), with the
one generic mechanism below, eight part rows and the ledger below. Retro, Lime, Grunge, Editorial and Pop L1 and Retro, Lime, Grunge,
Editorial and Pop L2 re-run at `--width 1440,768 --check` with Retro L3, eleven probes in parallel (~10 min): all PASS **with the counts they had** (156 / 143, 156 / 143, 157 / 144, 155 / 142, 155 / 142; 156 / 157, 155 / 156, 155 / 156, 155 / 156, 155 / 156), Retro L3 166 / 166.

## Generic fixes

One, in shared code (`inlineSlots` and `data.js`), found by the baseline's two WRONG rows; **earlier pages re-run: yes**.

1. **`INLINE_HEAD`: a repeater the canvas draws only a head of** (`data.js`; `drawnRows` and `inlineSlots`, `EncoreBuilder.jsx`). Repertoire layout 3 stands
   the songs in **one card per tag, four rows a card, three cards a page** (`EncoreSection`'s `cap` and `perPage`; an All card closes the list when some
   song carries no tag, and sits on the next page). So a song is drawn once per card it is in, and a later song not at all: the seed's row 0 (*Valerie*,
   tagged Weddings and Pubs) is drawn twice, and row 11 (also *Valerie*, tagged Pubs, the Pubs card's fifth song) in neither. The nth-peer rule ("document order is row
   order") paired the Pubs card's *Valerie* and its `3:54` with row 11 (pass 5's open item from Phase 0). The fix is on the slots, not the click:
   `drawnRows(sec, 'songs')` computes, from the same tags, caps and page size, which rows the cards draw, and `inlineSlots` puts every other row of a group
   `INLINE_HEAD` names in the ledger with a reason (`off`) — they are not drawn, so nothing is lost, and the rows that are drawn are the only candidates the
   exact-copy pairing sees (one `Valerie` slot, two nodes: both open row 0, and typing in either rewrites both). The ledger is by row, state-aware, and
   follows the artist's edits (a tag changed, a row blanked, a fourth set): the first state-aware ledger rule in the plan. Scoped `*.2.repertoire.songs`,
   so layouts 1, 2 and 4 are untouched; the four other templates' layout 3 share the tree and are expected to carry over (passes 11–14). The coupling is
   two numbers (4 and 3) copied from `EncoreSection`. A section that draws *fewer* rows than `drawnRows` says leaves a row nothing prints (MISSING). One that draws
   *more* would have `drawnRows` ledger a row the page prints: so a ledgered row carries `head`, and **the probe reports a head row some node prints as MISSING,
   not `off`** (unless another row shares its words, as the second *Valerie* does, which cannot be told from the first's two nodes and is not checked). Negative
   control: `drawnRows` at 3 rows a card against the section's 4 made `--check` fail on `songs[9].title` and `.length`; reverted. The page count (`slice(0, 3)`) is the
   section's `sets.slice(pg * perPage, (pg + 1) * perPage)`, a pager and not a wrap.
   Not done, on purpose: pairing by drawn order, which would also settle **two different rows with the same title both drawn** (a user types *Valerie*
   into row 1). There the counts differ and the click opens nothing; the panel is the way in. No wrong write.

## Part slots / marks

No mark. **`INLINE_PART`, scoped `*.2.`**, each a slot whose words are unique in the section and sit in a longer node (a single text node, or three
React text nodes of one span): `bio.aboutLabel` (`[ About ]`), `media.listLabel` (`● Popular`), `media.totalLabel` (`5 Featured / 5 Max`, beside the global
`countLabel`), `map.base` and `map.radius` (`Based in Manchester · 5 pins · 120 mi radius`: two slots in one line, settled on the click), `map.expand`
(`Expand view→`), `form.bookings` (`★★★★★ 42 bookings`), `testimonials.kicker` (`● Testimonials`). No `INLINE_LINES` row: pass 5's line rows were for the
map's gig cells at layout 2 and the layout-3 rows print `City · time` (`LINE_PAIRS`, hit as before), and no claim or rank was needed.

## Ledger (`INLINE_OFF`, `Retro.2.…`, and `INLINE_HEAD`)

Each confirmed by the probe at both widths and read off Retro's own DOM (`scratchpad/texts.mjs`: every text node of the section).

| Row | Reason |
|---|---|
| `repertoire.songs.artist` | not drawn: layout 3 prints a song's length in the seat the artist holds elsewhere |
| `calendar.prompt` | not drawn: shows only while no day is cued, and the canvas opens with one cued |
| `form.fields.placeholder` | not drawn: the card's boxes print the label (`EVENT DATE`), and a placeholder only once the label is emptied |
| `testimonials.quotes.when` | not drawn: layout 3's wall has no seat for it (`Reviewed …` is nowhere in the section) |
| `media.tracks.sub` | derived value: the seeded page prints the release and the running time as two nodes (`Single`, `5:42`) |
| `*.2.repertoire.songs` (`INLINE_HEAD`, rows only) | live-only copy: a song past a card's fourth row, or on a card the pager holds back, is behind *View full set* (the seed: rows 7, 8, 10 and 11, *I Wanna Dance*, *September*, *Rather Be* and the second *Valerie*) |

Also reported, not ledgered (the `*.*` rows): `tiers.tags` ×6 and `songs.tags` ×18 (derived chips). The plan's other live-only items at layout 3 need no row:
the map's city chips and *See all gigs* are derived or literal (`map.cta` is the field, and hits), the Upcoming / Past pill is a derived `status`, and
`repertoire.sets` has a slot for every card drawn.

## Learned

- **The composed page needed no code, and the box follows it.** At 1440 `pageRows` stands the calendar in the right cell (heading at x 1061) and it is
  sticky on the canvas; at 768 nothing composes (the calendar sits in flow, `PAGE_ORDERS[2]`). `scratchpad/sticky3.mjs` (`sticky.mjs` generalised: cat and
  text as arguments) opens a box on a node, scrolls the canvas and compares the box's top with the node's: the calendar's `Book Me` is stuck at y 162 from
  scrollTop 806 to ~2000, released at the row's end, and **the box is 1.1–1.2 px under the node at every step, including the release** (`stickyrel.mjs`,
  120 px steps through scrollTop 5246); a left-column node (`Reads the room.`, `Five worth your ear.`) is a constant 13.5 px (the display type's box offset)
  as it scrolls off. At 768: 1.5 px (calendar) and 10.3 px (bio heading), constant. Pass 5's scroll listener (generic fix 3) serves the composed cell as it
  was expected to.
- **`sets` has its first proof.** `repertoire.sets[0..2].mood` and `.length` are hit at both widths (6 slots), each a part of the line `Mellow · 45 min`,
  and Escape restores `c.sets` (0 NOT-RESTORED): the object `SetsField` keeps is written back whole and deleted again. The box lies on the word (the
  `MELLOW` of `MELLOW · 45 MIN`).
- **The testimonials wall's five cells repeat nothing** (five distinct names, roles and quotes), so no claim was needed; 20 slots hit. The 5 `when`s are
  not drawn. Pricing's layout-3 stacked rows hit 40 clicks, `featsLabel` and `badgeLabel` among them.
- **Every visible character of every text node opens its own slot.** `scratchpad/charsweep.mjs` (the plan's `fan3.mjs` shape, over the whole page, not
  only a fan): up to 10 evenly spread characters of each of 279 text nodes whose topmost element at the character is the node, clicked, at both widths:
  1784 clicks a width. Flagged: 9 nodes at each width, all by design: the three set lines and the map's `City · time` lines (two slots in one node, so
  "several slots" is two opens by position), and `Based in … · 5 pins · 120 mi radius` (two slots), with 1–2 clicks on a `·` or on `5 pins` opening nothing
  (a separator is no slot's words, and the count is derived). Nothing opened a slot whose copy the node does not print. **The one dead zone class is the
  separator between two slots in a line** (a click on the `·`: the 4 px of slack either side is not enough for the glyph's centre at 10–11 px type); left.
  There is no overlapping-card group at layout 3 (the media list, the set cards and the wall stand beside each other).
- **Seats** (`scratchpad/seats.mjs`, all eleven sections, both widths): every box's `caretColor`, face, size, weight and `text-transform` equal its node's on 14 / 10
  / 12 (11 at 768) / 28 / 1 / 1 / 40 / 31 / 11 / 20 / 11 boxes, **0 mismatches** at both widths. Fraunces (display) and Inter (body) are one face each in the
  boxes; the set cards' `uppercase` meta and the dark / olive / rust cards' type colours are the node's.
- **Rotation** (`scratchpad/tilt.mjs`): the header's polaroid (4.4°: *Kai Mercer*, *DJ · Live Act*), the bio's and the footer's KAI MERCER wordmarks (a
  seal and a rotated ring, no slot) and the map's ring labels (translate only). The polaroid's boxes follow the matrix: the title's lies on its glyphs at 4×
  zoom, the kicker's on *DJ · Live Act* (the count reads `13 / 13`, the identity cap).
- **Screenshots** (textarea tinted, 1440; 179 boxes by `boxcheck.mjs`, 18 flagged, 10 shots viewed): the box lies on the glyphs for `[ About ]`'s word (brackets
  left out), `● Popular` (bullet left out), the set line's `MELLOW`, the map line's `Based in Manchester` (the rest left out), `Book Me` on the sticky cell,
  `● Testimonials`, the form's two-line heading on the hero (both lines), the header title and kicker on the tilted polaroid. The 18 flags are the classes
  passes 3–9 recorded, in the same places: part slots measured against the whole line (`[`, `]`, `●` clicks reach `aboutLabel` / `listLabel`, the set lines, the map line),
  the price `£` and the amount in Fraunces (box `line-height` against the content rect), and the map rows' cities, whose reference is another node of equal
  text. No weight or case mismatch.
- **For pass 11 (Lime L3):** expect the `*.2.` part rows, the ledger (`Lime.2.…`, five rows, with `repertoire.songs.artist` and the `INLINE_HEAD` rule carrying
  over), and Lime's media list and wall to pass as Retro's did. A new ground only: read the ledger off Lime's own DOM (`texts.mjs`), run `seats.mjs`
  (THEME / LAYOUT env), `charsweep.mjs` and `sticky3.mjs` (`calendar "Book Me"`); `valerie.mjs` is the repertoire pairing check.
- **`chip2.mjs` was not run**: layout 3 has no featured-gig chip (that is layout 2's `● Jul 12 · 22:00`). Its question, a dead zone between two slots of one line,
  is `charsweep`'s: the gig rows' `City · time` and the set lines have one dead click in ten on the `·`.
- **Open (carried):** (a) a state-aware ledger for `tracks.sub` (the `INLINE_HEAD` rule is one now; `tracks.sub` could be the second); (b) the bio→header
  cross-section question; (c) pass 4's over-cap title finding. All left as asked. New: two different rows with the same title both drawn at layout 3 open nothing.
- A check run is ~9 minutes for both widths; eleven in parallel took ~10.
