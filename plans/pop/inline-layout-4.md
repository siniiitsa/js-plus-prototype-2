# Pop layout 4 — inline editing pass

Pass 19 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `1a91cd3`. Date 2026-10-22.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Pop --layout 4 --width 1440,768 --check
```

## Baseline (before any change)

`--check` FAIL, on five UNLEDGERED groups and one MISSING at 768:

| Width | hit | WRONG | NOT-RESTORED | MISSING |
|---|---|---|---|---|
| 1440 | **151** | 0 | 0 | 0 |
| 768 | 147 | 0 | 0 | **1** (`media.tracks[1].title`, *Manchester at 3am*) |

**151 at 1440 is the forecast**: `FIELDS.bio.tagsLabel.in` is `Pop: [2]`, so Pop's layout 4 does not read it (Lime's and Grunge's shape, one fewer than Retro's and
Editorial's 152). The `*.3.` part and line rows from pass 15 are `*`-scoped and applied to Pop's own DOM untouched: the bio's `since` and `cta2`, the price's `£` and
numeral, the ticker's venue and its four columns all hit. `header.kicker` is drawn at layout 4 (`DJ · Live Act`, a hit), so no row for it. The positive control passed (the
header title opens `header.title` on the nav brand).

| Section | 1440 hit | 768 hit | WRONG | MISSING |
|---|---|---|---|---|
| header | 13 | 13 | 0 | 0 |
| bio | 5 | 5 | 0 | 0 |
| media | 7 | 6 → 7 | 0 | 0 (1 at 768, below) |
| gallery | 2 | 2 | 0 | 0 |
| repertoire | 25 | 25 | 0 | 0 |
| map | 22 | 22 | 0 | 0 |
| pricing | 30 | 30 | 0 | 0 |
| calendar | 8 | 8 | 0 | 0 |
| form | 21 | 21 | 0 | 0 |
| testimonials | 13 | 10 | 0 | 0 |
| footer | 11 | 11 | 0 | 0 |

(Hits are clicks.) The header is the same eleven slots as Grunge's and Editorial's (title, `cta1`, kicker, location, six chips, the seal's badge text).
*Not drawn* at both widths (so UNLEDGERED): `media.tracks[].sub` ×5, `repertoire.songs[].length` ×12, `pricing.unit`, `calendar.prompt`, `testimonials.quotes[].when` ×5 —
**Retro's, Lime's, Grunge's and Editorial's five rows, one for one**.

## After

`--check` **PASS**: **151 slots hit at 1440 and 148 at 768**, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, 0 UNLEDGERED, 48 `off`, 23 / 26 *paged* (rows 1–4 of the ticker, the
testimonials past the fourth / third). The five rows below are the whole change to `data.js`; the probe's aim is the only other change.

## Generic fixes

**One, in the probe, not the app: aim at what a clipping ancestor leaves of a node.** At 768 Pop's media tiles are 136 wide, so the list tile's title (`overflow:
hidden; text-overflow: ellipsis; white-space: nowrap`) reads `MANCH…`, while its text node's range is the whole 172 px of *Manchester at 3am*. `__aim` clicked the middle
of that range, which lies past the clip, where the stack under the point is the tile's art and not the title: the probe reported the node `hidden` (*covered in section*)
and the slot MISSING. **The app was right**: `m768b.mjs` clicks the visible glyphs at 10, 30, 50 and 70 px in and each opens `media.tracks[1].title`. `__aim` now
intersects the first line's rect with every clipping ancestor (`overflow` not `visible`, on each axis) between the node and the section root, and aims at the middle of
what is left. A node that no ancestor clips gets the point it always did (the intersection is the rect), so only clamped nodes move.

Because the probe is shared, **every earlier page was re-run with it** (below).

## Part slots / marks

None added, and **no mark**. The four `*.3.` `INLINE_PART` rows and the four per-column `*.3.` `INLINE_LINES` rows are **proved on Pop**: the bio's date and `Listen`, a
price's amount and `£`, the ticker's `Next: Hidden Warehouse` and `Manchester · JUL 12 · 22:00`. With the time emptied the ticker prints `Manchester · JUL 12` and city,
month and day still open (`blank.mjs`, Pop).

## Ledger (`INLINE_OFF`, `Pop.3.…`)

Each confirmed by the probe at both widths and read off Pop's own DOM (`scratchpad/texts.mjs`: every text node of the page at 1440 and 768, searched
case-insensitively, since Pop's `uppercase` makes `innerText` read `MANCHESTER AT 3AM`: no `pick a date`, no `reviewed`, no `/event`, no `5:42`, no `3:54`; the only
`m:ss` strings are `02:28` and `04:22` (the player's clock) and `9:00pm` (the wizard's summary)).

| Row | Reason |
|---|---|
| `repertoire.songs.length` | not drawn: only layout 3 prints a song's length |
| `calendar.prompt` | not drawn: shows only while no day is cued, and the canvas opens with one cued (`Thu, June 12`) |
| `testimonials.quotes.when` | not drawn: layout 4's wall has no seat for it |
| `media.tracks.sub` | derived value: the list tile prints the release alone (`Single`); `02:28` / `04:22` are the player's clock |
| `pricing.unit` | derived value: layout 4 drops the leading slash, so the page prints `event` where the field holds `/event` |

Also reported, not ledgered: `tiers.tags` ×6 and `songs.tags` ×18 (`*.*`); the ticker's rows 1–4 and the testimonials past the fourth / third (*paged*, the arrows are live-only).

## Learned

- **A carry-over again, with one probe bug.** Pass 15's tables applied to Pop unchanged; the app needed no code. The only miss at 768 was the probe's aim at a clamped title
  (above), which Pop's narrow tiles and Titan One's width made the first page to show it: Editorial's Gloock fits the same tile.
- **The four `SealBadge` arms.** Pop's layout-4 header is not the Pop arm (the smiley globe) but Lime's disc tree on `scheme` 4 (1440, 768) and 5 (390), so the Pop arm
  steps aside for it; the footer's seal is the Pop arm (rotated 19.5°, `KAI MERCER` twice round a 157 circle). `seal.mjs` (both widths): the header's seal is one svg
  (viewBox 100 × 100, the ring text in `textPath`s that spin) under a `matrix` rotation; a click at its centre (and on the ring: the probe reaches it through the svg, not
  by text) opens `header.badgeText` in the **floating** box (160 × 30 under the disc, `data-inline-float`) and the field box is drawn round **the disc** (`fieldRect`, JP-148): the
  screenshots show a tight square on the disc at 1440 (137.5 px) and 768 (167.7 px), the ring spinning inside it, no dead zone. The footer's seal draws the artist's name
  but no field owns it, so a click opens nothing, as at the other four templates. (Phones are out; the 390 seal on Scheme 5 was not measured.)
- **`tilt.mjs`** (THEME=Pop LAYOUT=4, both widths): the only rotated text is the header's and the footer's `KAI MERCER` seal rings (no slot) and the map's `30mi` /
  `60mi` / `120mi` (translate only). No tape, no tilted title or card: the bio's overlay card is upright, so `placeBox`'s tilt path did not arise. The probe's *unhit under an
  overlay* is **0 at both widths**. Every sticker is `pointer-events: none` (`stick.mjs`: the bio's, media's and repertoire's dot grids and the footer's sticker at both widths, the gallery's
  smiley sun and asterisk); the only `auto` svgs are the two seals and the map's radius rings, whose `30mi` / `60mi` / `120mi` labels the probe hits.
- **Titan One's single weight, `uppercase` and the layout-4 scheme seats hold in the box.** `seats.mjs` (all eleven sections, both widths): **0 mismatches** between a node's
  computed colour, face, size, weight and `text-transform` and the textarea's caret colour, face, size, weight and transform, on 12 / 5 / 7 (6) / 2 / 25 / 19 / 27 / 8 / 21 /
  13 (10) / 11 boxes. `boxcheck.mjs`: Titan One `400` and `uppercase` in the node and in the textarea on every head, price, pill and set title; Inter `none` on body copy. The seats
  (header, bio, gallery and repertoire on Scheme 3, the media on 2, the testimonials on 4, and the nested `[1]` / `[4]` / `[5]` nodes) are invisible to the box, which takes the
  node's computed style at click time: caret colours are the nodes' own (white and lime on the blue and pink bands, violet on white).
- **The fitted stat value wraps and the box follows it** (`stat.mjs`): the Base cell's `Manchester, UK` is two lines in Titan One at 1440 (box 187 × 52) and one at 768 (256 × 29);
  a click on either word opens `map.stats[3].value` and the textarea covers both lines (screenshot).
- **A clamped title's box is as wide as the whole copy.** The media tile's `MANCHESTER AT 3AM` shows `MANCHESTER AT …` at 1440; the box is the width of the full text and runs past the `…`
  (the type is transparent, so nothing doubles). Known and accepted, the clamp's rule.
- **Layout 4 draws every song, sorted by title**, so `INLINE_HEAD` has no work: `valerie.mjs` (Pop) at both widths: the first drawn *Valerie* opens `songs[0].title`, the second
  `songs[11].title`, typing rewrites only its own node and Escape restores.
- **Sticky:** only the repertoire's A–Z rail at 1440 (`sticky4.mjs`: nothing at 768), and it holds no slot. A box scrolls with its node at a constant offset (`sticky3.mjs`): the bio's date
  −1.2 px at 1440 and −1.7 at 768, the map's `Gigs YTD` +1.0 and +1.5.
- **Every visible character** (`charsweep.mjs`, 1841 clicks at 1440 and 1712 at 768): 5 nodes flagged at each width, **the same five as Retro's, Lime's, Grunge's and Editorial's**, all by design:
  the three price nodes (two slots in one node), the ticker line (four slots in one node, 1 dead click on a `·`) and `Next: Hidden Warehouse` (3 of 10 characters are the literal `Next:`).
  Nothing opened a slot whose copy the node does not print.
- **Screenshots** (textarea tinted, 1440; `boxcheck.mjs` shot 72 boxes, flagged 5; viewed the header's `KAI MERCER`, the media's clamped `MANCHESTER AT …`, the Base stat and the header and
  footer seals): the box lies on the glyphs in each. The 5 flags are the classes passes 3–18 recorded: the two part slots measured against their whole line and the three price amounts in
  Titan One (box `line-height` against the content rect). No weight or case mismatch.
- **The ticker still holds the stored `Jul` where the page draws `JUL`** (the markup upper-cases it, not CSS): the box lies on `JUL`, the type is transparent. Not fixed, as on the other four.
- **For pass 20 (Retro headers 5 and 6):** header-only designs, `plans/retro/inline-header-5-6.md`. The header's slots are known (title, `cta1`, kicker, location, six chips, the seal's badge text where the
  design draws one); the sections below the header are the layout the user picked, so the probe's `--layout 5` / `6` is the page's header alone. Read the header's `FIELDS` rows for Retro at designs 4 and 5
  and which seal arm each draws (the `SealBadge` arms are above).
- **Open (carried):** (a) a state-aware ledger for `tracks.sub`, with `pricing.unit` as its second member; (b) the bio→header cross-section question (the layout-4 card prints the name, role line and six
  chips with no bio field); (c) pass 4's over-cap title finding; (d) two different rows with the same title both drawn at layout 3 open nothing (layout 4 pairs them by position and is fine); (e) Pop L3's
  testimonials kicker `●` strip: **deferred to the end-of-plan sweep (pass 21) by the user**, not fixed here.

## Re-runs after the probe change

`--width 1440,768 --check` on every earlier page, four at a time on one dev server: **all 19 PASS, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, with their old counts** (hit at 1440 / 768):

| | Retro | Lime | Grunge | Editorial | Pop |
|---|---|---|---|---|---|
| L1 | 156 / 143 | 156 / 143 | 157 / 144 | 155 / 142 | 155 / 142 |
| L2 | 156 / 157 | 155 / 156 | 155 / 156 | 155 / 156 | 155 / 156 |
| L3 | 166 / 166 | 167 / 167 | 167 / 167 | 167 / 167 | 167 / 167 |
| L4 | 152 / 149 | 151 / 148 | 151 / 148 | 152 / 149 | 151 / 148 (this pass) |

So the clamped-title aim moved no earlier result: no other page had a clamped title whose range middle fell in the clip. Four probes at once ran without flakiness (~15 minutes a batch).
