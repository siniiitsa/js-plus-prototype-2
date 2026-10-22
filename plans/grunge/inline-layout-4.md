# Grunge layout 4 — inline editing pass

Pass 17 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `6c8071f`. Date 2026-10-22.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Grunge --layout 4 --width 1440,768 --check
```

## Baseline (before any change)

`--check` FAIL, on five UNLEDGERED groups and nothing else: **0 WRONG, 0 NOT-RESTORED, 0 MISSING** at both widths, 151 slots hit at 1440 and 148 at 768, Lime's counts
exactly. The `*.3.` part and line rows from pass 15 are keyed `*` for the template and applied to Grunge's own DOM untouched: the bio's `since` and `cta2`, the price's
`£` and numeral, the ticker's venue and its four columns all hit.

| Section | 1440 hit | 768 hit | WRONG | MISSING |
|---|---|---|---|---|
| header | 13 | 13 | 0 | 0 |
| bio | 5 | 5 | 0 | 0 |
| media | 7 | 7 | 0 | 0 |
| gallery | 2 | 2 | 0 | 0 |
| repertoire | 30 | 33 | 0 | 0 |
| map | 22 | 22 | 0 | 0 |
| pricing | 30 | 30 | 0 | 0 |
| calendar | 8 | 8 | 0 | 0 |
| form | 21 | 21 | 0 | 0 |
| testimonials | 13 | 10 | 0 | 0 |
| footer | 11 | 11 | 0 | 0 |

(Hits are clicks. One fewer than Retro's 152 / 149, as Lime: Retro hits `bio.tagsLabel`, which `FIELDS.bio.tagsLabel.in` gives Retro and Editorial at layout 4 but Grunge
(`Grunge: [2]`) only at layout 2, so Grunge's overlay card draws the chips with no label and the field is outside the universe. The header is the same eleven slots: title, `cta1`,
kicker, location, six chips and the seal's badge text.) *Not drawn* at both widths (so UNLEDGERED): `media.tracks[].sub` ×5, `repertoire.songs[].length` ×12, `pricing.unit`,
`calendar.prompt`, `testimonials.quotes[].when` ×5 — **Retro's and Lime's five rows, one for one**, and no `header.kicker` row: layout 4's header draws the kicker (`DJ · Live Act`).

## After

`--check` **PASS**: **151 slots hit at 1440 and 148 at 768**, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, 0 UNLEDGERED, 48 `off`, 23 / 26 *paged* (rows 1–4 of the ticker, the testimonials past
the fourth / third). The five rows below are the whole change to `data.js`.

## Generic fixes

**None.** No shared code moved (`EncoreBuilder.jsx`, `EncoreSection.jsx` and the probe are untouched; `data.js` gained ledger rows only), so the plan's re-run rule did not trigger and
**no earlier page was re-run**.

## Part slots / marks

None added, and **no mark**. The four `*.3.` `INLINE_PART` rows and the four per-column `*.3.` `INLINE_LINES` rows are **proved on Grunge**: the bio's date and `Listen`, a price's amount and
`£`, the ticker's `Next: Hidden Warehouse` and `Manchester · JUL 12 · 22:00`. With the time emptied the ticker prints `Manchester · JUL 12` and city, month and day still open (`blank.mjs`, Grunge).

## Ledger (`INLINE_OFF`, `Grunge.3.…`)

Each confirmed by the probe at both widths and read off Grunge's own DOM (`scratchpad/texts.mjs`: every text node of the page at 1440 and 768, searched case-insensitively: no `pick a date`,
no `reviewed`, no `/event`, no `5:42`, no `3:54`; the only `m:ss` strings are `2:28` and `4:22` (the player's clock) and `9:00pm` (the wizard's summary)).

| Row | Reason |
|---|---|
| `repertoire.songs.length` | not drawn: only layout 3 prints a song's length (no `m:ss` song length in the repertoire at either width) |
| `calendar.prompt` | not drawn: shows only while no day is cued, and the canvas opens with one cued (no *Pick a date* in the section) |
| `testimonials.quotes.when` | not drawn: layout 4's wall has no seat for it (no *Reviewed …* in the section) |
| `media.tracks.sub` | derived value: the list tile prints the release alone (`Single`); `02:28` / `04:22` are the player's clock, so `Single · 5:42` is in no node |
| `pricing.unit` | derived value: layout 4 drops the leading slash, so the page prints `event` where the field holds `/event` |

Also reported, not ledgered: `tiers.tags` ×6 and `songs.tags` ×18 (`*.*`); the ticker's rows 1–4 and the testimonials past the fourth (1440) / third (768) (*paged*, the arrows are live-only).

## Learned

- **A pure carry-over, as forecast.** Pass 15's tables were `*`-scoped and every row applied to Grunge unchanged; the pass is five ledger rows. Grunge's layout-4 markup differs from Retro's and Lime's
  in nothing a click can tell: the same ticker (a red-ringed dark capsule, the same two lines), the same stat wall, the same overlay card.
- **No tape and no tilted text.** `tilt.mjs` (THEME=Grunge LAYOUT=4, both widths): the only rotated text is the header's and the footer's `KAI MERCER` seal rings (no slot, nested matrices of
  about 17–26°) and the map's `30mi` / `60mi` / `120mi` (translate only). **The header's title block and the bio's overlay card are upright**: screenshots of both sections show no tape over any text,
  and `charsweep` finds no dead character on a node, so the tilted-box path (`placeBox`) did not arise, as at Grunge's layout 3. The probe's "unhit under an overlay" is 0 at both widths.
- **The title is two spans again, and the control and hit-test hold.** Grunge's header prints `Kai` (white) and `Mercer` over the photograph, so the control passes through pass 12's relaxation. Every
  character of the title opens `header.title` (`charsweep`: header 161 clicks at 1440, 89 opened, 0 nodes flagged; the rest are the nav links, which hold no slot). The box lies on both words (screenshot).
  **`Mercer` is the node's near-black on the red hero, and the box's one caret is the first word's white** (`seats.mjs`: 1 "mismatch" at each width, `header.title`'s `Mercer`, same face, size, weight and
  case: Anton 400, uppercase, 121.5 px / 71.25 px), the layout-3 class. Left.
- **The fitted stat value wraps and the box follows it** (`stat.mjs`): the Base cell's `Manchester, UK` is two lines at 1440 (box 159 × 82) and one at 768 (190 × 40); a click on either word opens
  `map.stats[3].value` and the textarea covers both lines. The stat labels open their own cells.
- **Layout 4 draws every song, sorted by title**, so `INLINE_HEAD` has no work: `valerie.mjs` (Grunge) at both widths: the first drawn *Valerie* opens `songs[0].title`, the second `songs[11].title`,
  typing rewrites only its own node and Escape restores.
- **Sticky:** only the repertoire's A–Z rail at 1440 (`sticky4.mjs`: nothing at 768), and it holds no slot (`slotsInside=26` is the script counting the 26 letter cells, as in the earlier passes' logs).
  A box scrolls with its node at a constant offset (`sticky3.mjs`): a repertoire title 0.3 px at 1440 and 0.6 px at 768 (Anton's content box), the map's `Gigs YTD` 1.0 / 1.5 px, the bio's date −1.2 / −1.7 px.
- **Seats** (`seats.mjs`, THEME=Grunge LAYOUT=4, all eleven sections, both widths): every box's caret colour, face, size, weight and `text-transform` equal its node's on 12 / 5 / 7 / 2 / 30 (33) / 19 / 27 / 8 / 21 /
  13 (10) / 11 boxes; **the only mismatch is the title's `Mercer` caret, above**. Anton (display, 400 in every box) and Inter (body, 400, and 700 in four boxes); `uppercase` holds in the box.
- **Every visible character** (`charsweep.mjs`, up to 10 characters of each node, 1842 clicks at 1440 and 1730 at 768): 5 nodes flagged at each width, **the same five as Retro's and Lime's**, all by
  design: the three price nodes (two slots in one node), the ticker line (four slots in one node, 1 dead click on a `·`) and `Next: Hidden Warehouse` (3 of 10 characters are the literal `Next:`).
  Nothing opened a slot whose copy the node does not print.
- **Screenshots** (textarea tinted, 1440; 155 boxes by `boxcheck.mjs`, 10 flagged, 74 shots taken and 6 viewed plus the header and bio sections whole): the box lies on the glyphs for the header’s `KAI MERCER` (the nav brand and the h1, both words), the bio's heading `READS`, its date `June 2021` (*Performing since* left out), the ticker's `JUL` (the rest of the line left out). The 10 flags are the classes passes 3–16 recorded: the
  repertoire's five `·` separators opening their neighbour artist, the two part slots measured against their whole line (`Next: …`, the ticker) and the three price amounts in Anton (box `line-height` against the
  content rect). No weight or case mismatch.
- **The ticker still holds the stored `Jul` where the page draws `JUL`** (the markup upper-cases it, not CSS): the box lies on `JUL`, the type is transparent, so nothing doubles. Not fixed, as on Retro and Lime.
- **For pass 18 (Editorial L4):** expect the same carry-over: the five rows repeat as `Editorial.3.…`, **each read off Editorial's own DOM** (`texts.mjs`, case-insensitively; Gloock is one weight and
  `cased()` / `text-transform` must hold in the box). **Unlike Lime and Grunge, Editorial reads `bio.tagsLabel` at layout 4** (`Editorial: [2, 3]`), so expect Retro's 152 / 149, one more than here, with the
  *Genres* line over the chips hit (and capped 49, `chars: Editorial: [null, null, 49, 49]`). Editorial's layout 4 has its own scheme seats (header, bio, gallery and repertoire on 3; media on 2; testimonials on 4,
  and nested `[1]` / `[4]` nodes), a `twoTone` title only on Grunge, so the title is one node. The harnesses with a hard-coded template are `valerie.mjs`, `sticky4.mjs`, `blank.mjs`, `stat.mjs`, `dbg.mjs` and
  `stickyrel.mjs` (`open('Grunge'` → `open('Editorial'`); `sticky3.mjs` (positional: theme layout width cat "text"…), `seats.mjs`, `tilt.mjs` (THEME / LAYOUT env), `charsweep.mjs`, `boxcheck.mjs` and `words.mjs`
  take the theme. Keep the harnesses in the scratchpad, not `source/scripts/`: a new file there reloads Vite.
- **Open (carried):** (a) a state-aware ledger for `tracks.sub`, with `pricing.unit` as its second member; (b) the bio→header cross-section question (the layout-4 card prints the name, role line and six chips
  with no bio field); (c) pass 4's over-cap title finding; (d) two different rows with the same title both drawn at layout 3 open nothing (layout 4 pairs them by position and is fine); (e) Pop L3's
  testimonials kicker `●` strip: **deferred to the end-of-plan sweep (pass 21) by the user**, not fixed here.
- The probe ran faster than the ~9 minutes forecast (the baseline and the re-run each finished well inside the wait); `seats`, `tilt`, `texts` and `charsweep` ran beside the baseline without trouble.
