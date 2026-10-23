# Lime layout 4 — inline editing pass

Pass 16 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `ffc7a3e`. Date 2026-10-22.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Lime --layout 4 --width 1440,768 --check
```

## Baseline (before any change)

`--check` FAIL, on five UNLEDGERED groups and nothing else: **0 WRONG, 0 NOT-RESTORED, 0 MISSING** at both widths, 151 slots hit at 1440 and 148 at 768. The `*.3.` part and
line rows pass 15 wrote are keyed `*` for the template and carried over untouched: the bio's `since` and `cta2`, the price's `£` and numeral, the ticker's venue and its four
columns all hit on Lime's own DOM with no change.

| Section | 1440 hit | 768 hit | WRONG | MISSING |
|---|---|---|---|---|
| header | 13 | 13 | 0 | 0 |
| bio | 5 | 5 | 0 | 0 |
| media | 7 | 7 | 0 | 0 |
| gallery | 2 | 2 | 0 | 0 |
| repertoire | 33 | 35 | 0 | 0 |
| map | 22 | 22 | 0 | 0 |
| pricing | 30 | 30 | 0 | 0 |
| calendar | 8 | 8 | 0 | 0 |
| form | 21 | 21 | 0 | 0 |
| testimonials | 13 | 10 | 0 | 0 |
| footer | 11 | 11 | 0 | 0 |

(Hits are clicks. Retro's layout 4 hit 152 / 149, one more than Lime's, all in the bio: Retro hits `bio.tagsLabel` (the *Genres* line over the chips), which `FIELDS.bio.tagsLabel.in` gives Retro and Editorial at layout 4 but
Lime (`Lime: [2]`) only at layout 3, so Lime's layout-4 card draws the chips with no label and the field is outside the universe, not a miss. The header is the same eleven slots on both: title, `cta1`, kicker, location,
six chips and the seal's badge text.) *Not drawn* at both widths (so UNLEDGERED): `media.tracks[].sub` ×5, `repertoire.songs[].length` ×12, `pricing.unit`, `calendar.prompt`, `testimonials.quotes[].when` ×5 — **Retro's five
rows, one for one**, and no `header.kicker` row: layout 4's header draws the kicker (`DJ · Live Act`), unlike layout 3's card.

## After

`--check` **PASS**: **151 slots hit at 1440 and 148 at 768**, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, 0 UNLEDGERED, 48 `off`, 23 / 26 *paged* (rows 1–4 of the ticker, the testimonials past the fourth / third).
The five rows below are the whole change to `data.js`.

## Generic fixes

**None.** No shared code moved (`EncoreBuilder.jsx`, `EncoreSection.jsx` and the probe are untouched; `data.js` gained ledger rows only), so the plan's re-run rule did not trigger and **no earlier page was re-run**.

## Part slots / marks

None added, and **no mark**. The four `*.3.` `INLINE_PART` rows and the four per-column `*.3.` `INLINE_LINES` rows are **proved on Lime**: the bio's date and `Listen`, a price's amount and `£`, the ticker's
`Next: Hidden Warehouse` and `Manchester · JUL 12 · 22:00`. With the time emptied, the ticker prints `Manchester · JUL 12` and city, month and day still open (`blank.mjs`, Lime).

## Ledger (`INLINE_OFF`, `Lime.3.…`)

Each confirmed by the probe at both widths and read off Lime's own DOM (`scratchpad/texts.mjs`: every text node of the page at 1440 and 768, searched case-insensitively).

| Row | Reason |
|---|---|
| `repertoire.songs.length` | not drawn: only layout 3 prints a song's length (no `m:ss` text in the repertoire at either width) |
| `calendar.prompt` | not drawn: shows only while no day is cued, and the canvas opens with one cued (no *Pick a date* in the section) |
| `testimonials.quotes.when` | not drawn: layout 4's wall has no seat for it (no *Reviewed …* in the section) |
| `media.tracks.sub` | derived value: the list tile prints the release alone (`Single`); `02:28` / `04:22` are the player's clock, so `Single · 5:42` is in no node |
| `pricing.unit` | derived value: layout 4 drops the leading slash, so the page prints `event` where the field holds `/event` |

Also reported, not ledgered: `tiers.tags` ×6 and `songs.tags` ×18 (`*.*`); the ticker's rows 1–4 and the testimonials past the fourth (1440) / third (768) (*paged*, the arrows are live-only).

## Learned

- **A pure carry-over, as forecast.** Pass 15's tables were written `*`-scoped and every row applied to Lime unchanged; the pass is five ledger rows. Nothing in Lime's layout-4 markup differs from Retro's in
  a way a click can tell: Lime's ticker is an olive capsule with the same two lines (`Next: Hidden Warehouse`, `Manchester · JUL 12 · 22:00`), and its stat cells are fitted per word (`wordEms`).
- **The fitted stat value wraps and the box follows it** (`stat.mjs`, scratchpad): the Base cell's `Manchester, UK` is two lines at 1440 (`MANCHESTER,` / `UK`, box 175 × 82) and one at 768 (210 × 40); a click on either word
  opens `map.stats[3].value` and the textarea covers both lines (screenshot). The stat labels (`GIGS YTD`, `BASE`, `RADIUS`) open their own cells.
- **The repertoire's hit count (33 / 35) is lower than Retro's (37 / 37) by separators alone**: both pages hit 25 slots at both widths (the heading, 12 titles, 12 artists), and the rest are clicks on the twelve `·` between a title and its artist, of which 8 (1440) / 10 (768) land in a neighbour's box on Lime and all 12 do on Retro. Not a coverage gap (0 MISSING).
- **Layout 4 draws every song, sorted by title**, so `INLINE_HEAD` has no work (as on Retro): `valerie.mjs` (Lime) at both widths: the first drawn *Valerie* opens `songs[0].title`, the second `songs[11].title`,
  typing rewrites only its own node and Escape restores.
- **Sticky:** only the repertoire's A–Z rail at 1440 (`sticky4.mjs`: nothing at 768), and it holds no slot. A box scrolls with its node at a constant offset: a repertoire title 1.8 px at 1440 and 1.1 px at 768 (Bebas Neue's
  content box), the map's `GIGS YTD` 1.5 px at both, the bio's date −1.2 px.
- **Seats** (`seats.mjs`, THEME=Lime LAYOUT=4, all eleven sections, both widths): every box's caret colour, face, size, weight and `text-transform` equal its node's on 12 / 5 / 7 / 2 / 33 (35) / 19 / 27 / 8 / 21 / 13 (10) / 11
  boxes, **0 mismatches** at both widths. Bebas Neue (display, 400 in every box) and Inter (body); the olive and lime grounds' ink and the footer's accent ground are the node's. No Gloock here.
- **Rotation** (`tilt.mjs`): the only rotated text is the header's and the footer's `KAI MERCER` seal rings (no slot) and the map's `30mi` / `60mi` / `120mi` (translate only); the tilted-box path did not arise.
- **Every visible character** (`charsweep.mjs`, up to 10 characters of each node, 1842 clicks at 1440 and 1720 at 768): 5 nodes flagged at each width, **the same five as Retro's**, all by design: the three price nodes (two slots in one
  node), the ticker line (four slots in one node, 1 dead click on a `·`) and `Next: Hidden Warehouse` (3 of 10 characters are the literal `Next:`). Nothing opened a slot whose copy the node does not print.
- **Screenshots** (textarea tinted, 1440; 158 boxes by `boxcheck.mjs`, 13 flagged, 69 shots taken and 11 viewed plus the stat's): the box lies on the glyphs for the header title over the photograph, the ticker's `JUL` (the rest of the line left out), the stat label `GIGS YTD`,
  the price `450` in Bebas Neue beside its `£`, the bio's `June 2021` (*Performing since* left out), the repertoire, form and media headings (Bebas Neue), the calendar's `Wedding` chip, a testimonial's two-line quote and the footer's `Book Now` pill (arrow disc left out). The 13 flags are the classes pass 15 recorded: the repertoire's eight `·` separators opening their neighbour artist, the two part
  slots measured against their whole line (`Next: …`, the ticker) and the three price amounts in Bebas Neue (box `line-height` against the content rect). No weight or case mismatch.
- **The ticker still holds the stored `Jul` where the page draws `JUL`** (the markup upper-cases it, not CSS): the box lies on `JUL`, the type is transparent, so nothing doubles. Not fixed, as on Retro.
- **For pass 17 (Grunge L4):** expect the same carry-over: the five rows repeat as `Grunge.3.…`, each read off Grunge's own DOM (`texts.mjs`, case-insensitively). New ground: Grunge's tape and rotation on the layout-4 header and
  bio overlay card (`tilt.mjs`, THEME=Grunge LAYOUT=4, and look at the card), and its own ticker and stat-wall treatment. The harnesses with a hard-coded template are `valerie.mjs`, `sticky4.mjs`, `blank.mjs`, `stat.mjs`, `dbg.mjs` and `stickyrel.mjs` (`open('Lime'` → `open('Grunge'`); `sticky3.mjs`, `seats.mjs`, `tilt.mjs`, `charsweep.mjs`, `boxcheck.mjs` and `words.mjs` take the theme.
  Expect `bio.tagsLabel` to be outside Grunge's layout-4 universe too (`Grunge: [2]`), so one slot fewer than Retro and no MISSING from it, and no `header.kicker` row (layout 4's header draws it).
- **Open (carried):** (a) a state-aware ledger for `tracks.sub`, with `pricing.unit` as its second member; (b) the bio→header cross-section question (the layout-4 card prints the name, role line and six chips with no bio
  field); (c) pass 4's over-cap title finding; (d) two different rows with the same title both drawn at layout 3 open nothing; (e) Pop L3's testimonials kicker `●` strip: **deferred to the end-of-plan sweep (pass 21) by the user**, not fixed here.
- A check run is ~9 minutes for both widths; `seats`, `tilt`, `charsweep` at both widths, `boxcheck` and `sticky3` ran beside it without trouble.
