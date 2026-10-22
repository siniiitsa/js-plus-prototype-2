# Editorial layout 4 — inline editing pass

Pass 18 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `e4096de`. Date 2026-10-22.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Editorial --layout 4 --width 1440,768 --check
```

## Baseline (before any change)

`--check` FAIL, on five UNLEDGERED groups and nothing else: **0 WRONG, 0 NOT-RESTORED, 0 MISSING** at both widths, **152 slots hit at 1440 and 149 at 768, Retro's counts exactly**
(Lime's and Grunge's were one fewer). The `*.3.` part and line rows from pass 15 are keyed `*` for the template and applied to Editorial's own DOM untouched: the bio's `since` and `cta2`,
the price's `£` and numeral, the ticker's venue and its four columns all hit.

| Section | 1440 hit | 768 hit | WRONG | MISSING |
|---|---|---|---|---|
| header | 13 | 13 | 0 | 0 |
| bio | 6 | 6 | 0 | 0 |
| media | 7 | 7 | 0 | 0 |
| gallery | 2 | 2 | 0 | 0 |
| repertoire | 25 | 27 | 0 | 0 |
| map | 22 | 22 | 0 | 0 |
| pricing | 30 | 30 | 0 | 0 |
| calendar | 8 | 8 | 0 | 0 |
| form | 21 | 21 | 0 | 0 |
| testimonials | 13 | 10 | 0 | 0 |
| footer | 11 | 11 | 0 | 0 |

(Hits are clicks.) **The bio's six are Retro's**: `bio.tagsLabel` is read at Editorial's layout 4 (`FIELDS.bio.tagsLabel.in`: `Editorial: [2, 3]`), so the *Genres* line over the chips is a slot and
opens (screenshot), which Lime's and Grunge's cards, with no such line, do not have. The header is the same eleven slots as Grunge's (title, `cta1`, kicker, location, six chips, the seal's badge
text); `header.kicker` is drawn at layout 4, so no row for it. The repertoire's click count (25 / 27) is lower than Retro's 37 and Grunge's 30, though its page has the same 73 text nodes (`texts.mjs`) as Grunge's and 0 are MISSING; the cause was not investigated (a click count, not a slot count). *Not drawn* at both widths (so UNLEDGERED): `media.tracks[].sub` ×5, `repertoire.songs[].length` ×12, `pricing.unit`, `calendar.prompt`, `testimonials.quotes[].when` ×5 —
**Retro's, Lime's and Grunge's five rows, one for one**.

## After

`--check` **PASS**: **152 slots hit at 1440 and 149 at 768**, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, 0 UNLEDGERED, 48 `off`, 23 / 26 *paged* (rows 1–4 of the ticker, the testimonials past the
fourth / third). The five rows below are the whole change to `data.js`.

## Generic fixes

**None.** No shared code moved (`EncoreBuilder.jsx`, `EncoreSection.jsx` and the probe are untouched; `data.js` gained ledger rows only), so the plan's re-run rule did not trigger and
**no earlier page was re-run**.

## Part slots / marks

None added, and **no mark**. The four `*.3.` `INLINE_PART` rows and the four per-column `*.3.` `INLINE_LINES` rows are **proved on Editorial**: the bio's date and `Listen`, a price's amount and
`£`, the ticker's `Next: Hidden Warehouse` and `Manchester · JUL 12 · 22:00`. With the time emptied the ticker prints `Manchester · JUL 12` and city, month and day still open (`blank.mjs`, Editorial).

## Ledger (`INLINE_OFF`, `Editorial.3.…`)

Each confirmed by the probe at both widths and read off Editorial's own DOM (`scratchpad/texts.mjs`: every text node of the page at 1440 and 768, searched case-insensitively: no `pick a date`,
no `reviewed`, no `/event`, no `5:42`, no `3:54`; the only `m:ss` strings are `02:28` and `04:22` (the player's clock) and `9:00pm` (the wizard's summary)).

| Row | Reason |
|---|---|
| `repertoire.songs.length` | not drawn: only layout 3 prints a song's length (no `m:ss` song length in the repertoire at either width) |
| `calendar.prompt` | not drawn: shows only while no day is cued, and the canvas opens with one cued (no *Pick a date* in the section) |
| `testimonials.quotes.when` | not drawn: layout 4's wall has no seat for it (no *Reviewed …* in the section) |
| `media.tracks.sub` | derived value: the list tile prints the release alone (`Single`); `02:28` / `04:22` are the player's clock, so `Single · 5:42` is in no node |
| `pricing.unit` | derived value: layout 4 drops the leading slash, so the page prints `event` where the field holds `/event` |

Also reported, not ledgered: `tiers.tags` ×6 and `songs.tags` ×18 (`*.*`); the ticker's rows 1–4 and the testimonials past the fourth (1440) / third (768) (*paged*, the arrows are live-only).

## Learned

- **A pure carry-over, as forecast.** Pass 15's tables were `*`-scoped and every row applied to Editorial unchanged; the pass is five ledger rows. The one difference from Lime and Grunge is the
  *Genres* line (`bio.tagsLabel`), which Editorial's layout 4 reads, so the counts are Retro's.
- **No tape and no tilted text.** `tilt.mjs` (THEME=Editorial LAYOUT=4, both widths): the only rotated text is the header's and the footer's `KAI MERCER` seal rings (no slot) and the map's
  `30mi` / `60mi` / `120mi` (translate only). The header's title (one node: no `twoTone`, so the control passed without pass 12's relaxation) and the bio's overlay card are upright; the probe's
  "unhit under an overlay" is 0 at both widths, so the tilted-box path (`placeBox`) did not arise.
- **Gloock's single weight and `text-transform` hold, and so do the layout-4 scheme seats.** `seats.mjs` (all eleven sections, both widths): **0 mismatches** between a node's computed colour, face, size,
  weight and `text-transform` and the textarea's caret colour, face, size, weight and transform, on 12 / 6 / 7 / 2 / 25 (27) / 19 / 27 / 8 / 21 / 13 (10) / 11 boxes. `boxcheck.mjs`: 77 Gloock nodes, all `400` in
  the node and in the textarea, `uppercase` on the heads, set titles, pills and prices, `none` on Inter body copy; no weight mismatch. The seats (header, bio, gallery and repertoire on Scheme 3, the media
  on 2, the testimonials on 4, and the nested `[1]` / `[4]` nodes) are invisible to the box, which takes the node's computed style at click time.
- **The fitted stat value wraps and the box follows it** (`stat.mjs`): the Base cell's `Manchester, UK` is two lines in Gloock at 1440 (box 186 × 53) and one at 768 (251 × 72); a click on
  either word opens `map.stats[3].value` and the textarea covers both lines (screenshot).
- **Layout 4 draws every song, sorted by title**, so `INLINE_HEAD` has no work: `valerie.mjs` (Editorial) at both widths: the first drawn *Valerie* opens `songs[0].title`, the second `songs[11].title`,
  typing rewrites only its own node and Escape restores.
- **Sticky:** only the repertoire's A–Z rail at 1440 (`sticky4.mjs`: nothing at 768), and it holds no slot. A box scrolls with its node at a constant offset (`sticky3.mjs`): the bio's date −1.2 px at
  1440; at 768 a repertoire title 0.8 px and the map's `Gigs YTD` 1.5 px (the script's bio run at 768 left the node below the fold, so no 768 bio offset was read; the probe hit `bio.since` there).
- **Every visible character** (`charsweep.mjs`, 1848 clicks at 1440): 5 nodes flagged at each width, **the same five as Retro's, Lime's and Grunge's**, all by design: the three price nodes (two slots in
  one node), the ticker line (four slots in one node, 1 dead click on a `·`) and `Next: Hidden Warehouse` (3 of 10 characters are the literal `Next:`). Nothing opened a slot whose copy the node does not print.
- **Screenshots** (textarea tinted, 1440; `boxcheck.mjs` shot 72 boxes, flagged 5; viewed the header's `KAI MERCER`, the *Genres* line, the ticker's `JUL`, the bio's `June 2021` and the Base stat): the box
  lies on the glyphs in each. The 5 flags are the classes passes 3–17 recorded: the two part slots measured against their whole line and the three price amounts in Gloock (box `line-height` against the
  content rect). No weight or case mismatch.
- **The ticker still holds the stored `Jul` where the page draws `JUL`** (the markup upper-cases it, not CSS): the box lies on `JUL`, the type is transparent, so nothing doubles. Not fixed, as on Retro,
  Lime and Grunge.
- **For pass 19 (Pop L4):** expect the same carry-over: the five rows repeat as `Pop.3.…`, **each read off Pop's own DOM** (`texts.mjs`, case-insensitively: Titan One is one weight and `uppercase` comes from
  `text-transform`, so `innerText` changes case). Read `bio.tagsLabel`'s `in` for Pop at layout 4 first (it decides 151 / 148 or 152 / 149). New ground: the four `SealBadge` arms (the header's seal at
  1440, 768 and 390; the footer's), Pop's stickers (`pointer-events: none`), the header seal's badge text edited in a floating box and boxed as its disc (`fieldRect`), and the layout-4 seats (header, bio,
  gallery and repertoire on 3, the media on 2, the testimonials on 4; the 390 seal on `[5]`). Run `tilt.mjs` (THEME=Pop LAYOUT=4): the seal rings rotate and may carry a slot. The harnesses with a
  hard-coded template are `valerie.mjs`, `sticky4.mjs`, `blank.mjs`, `stat.mjs`, `dbg.mjs` and `stickyrel.mjs` (`open('Editorial'` → `open('Pop'`); `stat.mjs`'s `SP` names the scratchpad and its
  screenshot wants `captureBeyondViewport: false`. Keep the harnesses in the scratchpad, not `source/scripts/`.
- **Open (carried):** (a) a state-aware ledger for `tracks.sub`, with `pricing.unit` as its second member; (b) the bio→header cross-section question (the layout-4 card prints the name, role line and six
  chips with no bio field); (c) pass 4's over-cap title finding; (d) two different rows with the same title both drawn at layout 3 open nothing (layout 4 pairs them by position and is fine); (e) Pop L3's
  testimonials kicker `●` strip: **deferred to the end-of-plan sweep (pass 21) by the user**, not fixed here.
