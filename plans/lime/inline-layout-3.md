# Lime layout 3 — inline editing pass

Pass 11 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `4f4ceed`. Date 2026-10-22.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Lime --layout 3 --width 1440,768 --check
```

## Baseline (before any change)

`--check` FAIL, on six UNLEDGERED groups and nothing else: **0 WRONG, 0 NOT-RESTORED, 0 MISSING** at both widths, 167 slots hit at each. Retro's pass 10 had two
WRONG rows (the second *Valerie*); Lime's did not, because `INLINE_HEAD` is scoped `*.2.` and carried over: the probe already listed the undrawn songs as `off`
(`songs[].title` ×4, `.artist` ×4, `.length` ×4).

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

(Hits are clicks.) *Not drawn* at both widths (so UNLEDGERED): `header.kicker`, `media.tracks[].sub` ×5, `repertoire.songs[].artist` ×8, `calendar.prompt`,
`form.fields[].placeholder` ×3, `testimonials.quotes[].when` ×5. Retro's five rows, one for one, plus `header.kicker`; its `artist` is ×8 here, not ×12, because four
of the twelve are the head rows the `INLINE_HEAD` rule already ledgers.

## After

`--check` **PASS**: 167 slots hit at 1440 and 167 at 768, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, 0 UNLEDGERED, 59 `off` (36 before the ledger rows). The six rows below
are the whole change to `data.js`.

## Generic fixes

**None.** Nothing in shared inline code moved (`data.js` gained ledger rows only), so no earlier page was re-run. The plan's rule (a generic fix re-runs Retro, Lime,
Grunge, Editorial and Pop L1 and L2 and Retro L3) did not trigger.

## Part slots / marks

None added, and **no mark**. The `*.2.` `INLINE_PART` rows (Retro's pass 10: `bio.aboutLabel`, `media.listLabel` / `totalLabel`, `map.base` / `radius` / `expand`,
`form.bookings`, `testimonials.kicker`) are keyed `*` for the template and **proved on Lime**; every one hit on its own words. Where Retro printed `● Popular` and
`● Testimonials` in one text node, Lime's markup puts the bullet in its own span, so the node is the bare word and the part row has less to do; the rule still holds
(the box is on `Popular`, the bullet left out).

**`INLINE_HEAD` was checked before it was trusted** (the brief's step 4). Lime's layout-3 repertoire is `limeCard`, with the same `cap = 4` and `perPage = 3` as Retro's
`card` (one `if (s.v2)` block, `sets.slice(pg * perPage, (pg + 1) * perPage)`), so `drawnRows` is right for it. By name against `texts.mjs` and the seed (`SONGS`, tags
in brackets): Weddings draws rows 0 1 2 3 and hides 8 *September* and 10 *Rather Be*; Pubs draws 0 4 6 9 and hides 11 (the second *Valerie*); Birthdays draws 2 3 5 6
and hides 7 *I Wanna Dance*, 8 *September* and 9 (*Don't Stop Me Now*, which the Pubs card does draw). So the rows no card draws are **7, 8, 10, 11**, ×4 each for `title`, `artist` and
`length`, which is what the probe lists as `off` (read from its JSONL: `songs[7|8|10|11].title` and `.length`, at both widths). None of those four titles is anywhere in the section's text. `valerie.mjs` (Lime) at both widths: both drawn
*Valerie*s open `repertoire.songs[0].title`, typing rewrites both nodes (`nodes printing ZZ: 2`), row 11 is untouched, and Escape restores.

## Ledger (`INLINE_OFF`, `Lime.2.…`, and `INLINE_HEAD`)

Each confirmed by the probe at both widths and read off Lime's own DOM (`scratchpad/texts.mjs`: every text node of the page at 1440 and 768, identical).

| Row | Reason |
|---|---|
| `header.kicker` | not drawn: the layout-3 card prints `cardLine` (*Performing since 2021*) in the seat the kicker holds on Retro's polaroid; the kicker is a shared identity key whose box is the header's panel, and only the bio's role line prints it (*DJ · Live Act*: once on the whole page; the form's layout-3 card does not, unlike the `Lime.1` row's reason) |
| `repertoire.songs.artist` | not drawn: layout 3 prints a song's length in the seat the artist holds elsewhere |
| `calendar.prompt` | not drawn: shows only while no day is cued, and the canvas opens with one cued (the page prints `Enquiry About June 12`) |
| `form.fields.placeholder` | not drawn: the card's boxes print the uppercased label (`EVENT DATE`, `EVENT TYPE`, `YOUR EMAIL`), and a placeholder only once the label is emptied |
| `testimonials.quotes.when` | not drawn: layout 3's wall has no seat for it (`Reviewed …` is nowhere in the section) |
| `media.tracks.sub` | derived value: the seeded page prints the release and the running time as two nodes (`Single`, `5:42`) |
| `*.2.repertoire.songs` (`INLINE_HEAD`, rows only) | live-only copy, unchanged from pass 10: the seed's rows 7, 8, 10 and 11 |

Also reported, not ledgered (the `*.*` rows): `tiers.tags` ×6 and `songs.tags` ×18.

## Learned

- **The composed page needed nothing, and the box follows it.** At 1440 `pageRows` stands the calendar in the sticky right column (heading at x 1061). `sticky3.mjs`: a box
  opened on `Book Me` is stuck at y 123 from scrollTop 806 to ~2000, released at the row's end, and **the box is 1.8 px under the node at every step, including the release**
  (`stickyrel.mjs`, 120 px steps through scrollTop 5246: `d 1.7` / `1.8` throughout; Retro 1.1–1.2, the difference being Bebas Neue's content box). The bio's heading, a left-column
  node, is a constant 16.4 px as it scrolls off (Retro 13.5: the display type's box offset, constant). At 768 nothing composes: 1.1 px on the calendar, 12.5 px on the bio heading,
  constant. Screenshot: the box lies on *BOOK ME* in the stuck cell.
- **Every visible character of every text node opens its own slot.** `charsweep.mjs` (up to 10 characters of each of 286 nodes, 1834 clicks a width): 9 nodes flagged at both widths,
  **the same nine as Retro's**, all by design: the three set lines and the map's five `City · time` rows (two slots in one node, so "several slots" is two opens by position) and
  `Based in … · 5 pins · 120 mi radius` (two slots), with 1–2 clicks on a `·` or `5 pins` opening nothing. The one dead zone class is the separator between two slots of a line; left.
  No overlapping-card group at layout 3.
- **Seats** (`seats.mjs`, all eleven sections, both widths): every box's `caretColor`, face, size, weight and `text-transform` equal its node's on 14 / 11 / 11 / 28 / 1 / 1 / 40 /
  30 (31 at 768) / 11 / 20 / 11 boxes, **0 mismatches**. Bebas Neue (display) and Inter (body) are one weight each (400) in the boxes; the set cards' `uppercase` meta, the lime
  and olive cards' ink and the footer's accent ground are the node's.
- **Rotation** (`tilt.mjs`): none on a slot. Lime's layout-3 header is an upright card, not Retro's polaroid (the header has no tilted node at all); the bio's and the footer's
  KAI MERCER ring wordmarks are seals with no slot, and the map's `30mi` / `60mi` / `120mi` ring labels are translate-only.
- **Screenshots** (textarea tinted, 1440; 178 boxes by `boxcheck.mjs`, 16 flagged, 12 shots viewed): the box lies on the glyphs for `[ ABOUT ]`'s word (brackets left out), `● POPULAR`
  (bullet left out), the set line's `MELLOW` (the rest left out), the map line's `Manchester` on the lit row, the pricing `450` in Bebas Neue, the header title over the photograph,
  the form's heading, and `● Testimonials`. The 16 flags are the classes pass 10 recorded, in the same places: part slots measured against the whole line (`[`, `]`, the three set
  lines), the price `£` and amount in the display face (box `line-height` against the content rect), and the map rows' cities, whose reference is another node of equal text. No weight
  or case mismatch.
- **For pass 12 (Grunge L3):** expect the same: the `*.2.` part rows and the `INLINE_HEAD` rule carry over (check Grunge's `cap` and `perPage` first, as here: the `if (s.v2)`
  block is shared, but each template has its own card), and the ledger is `Grunge.2.…` with the five Retro rows. **`header.kicker` is a sixth only where the layout-3 header draws the
  card line instead of the kicker** (`HeaderV2`, the Lime / Grunge / Editorial / Pop shared block), so expect it on Grunge, Editorial and Pop too; read it off each template's DOM, since
  Retro's polaroid prints the kicker and has no row. Grunge adds tape and rotation: run `tilt.mjs` (THEME / LAYOUT env) and look at the header's card.
- **Open (carried):** (a) a state-aware ledger for `tracks.sub`; (b) the bio→header cross-section question; (c) pass 4's over-cap title finding; (d) two different rows with the same
  title both drawn at layout 3 open nothing. All left as asked.
- A check run is ~9 minutes for both widths.
