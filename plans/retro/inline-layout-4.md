# Retro layout 4 — inline editing pass

Pass 15 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `55ee0b0`. Date 2026-10-22.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Retro --layout 4 --width 1440,768 --check
```

## Baseline (before any change)

`--check` FAIL. The first layout-4 DOM probed: **0 WRONG, 0 NOT-RESTORED, 2 MISSING** and 14 UNLEDGERED groups, 139 slots hit at 1440 and 136 at 768 (the
testimonials draw four reviews at 1440 and three at 768; everything else reads the same at both widths).

| Section | 1440 hit | 768 hit | WRONG | MISSING |
|---|---|---|---|---|
| header | 13 | 13 | 0 | 0 |
| bio | 4 | 4 | 0 | 0 |
| media | 7 | 7 | 0 | 0 |
| gallery | 2 | 2 | 0 | 0 |
| repertoire | 37 | 37 | 0 | 0 |
| map | 17 | 17 | 0 | `gigs[0].city`, `gigs[0].time` |
| pricing | 24 | 24 | 0 | 0 |
| calendar | 8 | 8 | 0 | 0 |
| form | 21 | 21 | 0 | 0 |
| testimonials | 13 | 10 | 0 | 0 |
| footer | 11 | 11 | 0 | 0 |

(Hits are clicks.) **`stats` (12 cells) and `steps` (6) hit at both widths and Escape restored them**: their first proof, which Phase 0 could not give.
*Not drawn* at both widths (so UNLEDGERED): `bio.since`, `bio.cta2`, `media.tracks[].sub` ×5, `repertoire.songs[].length` ×12, `map.gigs[].venue` / `month` /
`day` ×5, `city` / `time` ×4, `pricing.unit`, `pricing.tiers[].price.lead` / `amount` ×3, `calendar.prompt`, `testimonials.quotes[].when` ×5.

Most of those were not missing copy: the page printed the slot's words inside a longer node (`Performing since June 2021`, `Listen ↗`, `£450`,
`Next: Hidden Warehouse`, `Manchester · JUL 12 · 22:00`), pass 5's shape.

## After

`--check` **PASS**: **152 slots hit at 1440 and 149 at 768**, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, 0 UNLEDGERED, 48 `off`, 23 / 26 *paged* (rows 1–4 of the ticker, the testimonials past the
fourth / third). Run twice: once on the first rows and once on the final ones (the line variants below). Only `data.js` changed.

Against the baseline only three sections moved, at both widths: bio 4 → 6 (`since`, `cta2`), map 17 → 22 (the ticker's five cells) and pricing 24 → 30 (the three plans' `£` and numeral). The other eight read as before.

## Generic fixes

**None**: no shared code moved (`EncoreBuilder.jsx`, `EncoreSection.jsx` and the probe are untouched), only table rows in `data.js`. The plan's re-run rule did not trigger, so **no earlier page
was re-run**. Open item (e) was put to the user, who chose the end-of-plan sweep for its fix (below).

## Part slots / marks

**No mark.** `INLINE_PART`, scoped `*.3.`, each a slot whose words are unique in the section and sit in a longer node:
`bio.since` (`Performing since June 2021`: one span, two text nodes, the label a literal), `bio.cta2` (`Listen ↗`), `pricing.tiers.price` (one row covers `lead` and `amount`: layout 4
prints `£450` as one text node and the tail is empty, so never a slot; two slots in one node, settled on the click) and `map.gigs.venue` (`Next: Hidden Warehouse`: the `Next: ` is the frame's,
on the first gig alone, which the canvas always is).

**`INLINE_LINES`, scoped `*.3.`, per column** (`map.gigs.city`, `.month`, `.day`, `.time`; not one `map.gigs` row, which `inlineRule` would also hand the venue): the ticker prints the
one gig on one line, `Manchester · JUL 12 · 22:00` (`vm.gigs[].meta`), and drops a piece the artist emptied with its separator, so the table lists the full line and the shorter forms
(`{city} · {month} {day}`, `{month} {day} · {time}`, `{month} {day}`, `{city} · {time}`). The first version had the full line alone and **a stored first gig with its time emptied
opened nothing** (`scratchpad/blank.mjs`), so the variants were added and re-measured (city, month and day open). The forecast of *claims and ranks* was not needed: the ticker repeats
no other field's copy (the stat's `Manchester, UK` is another string, and layout 4's heading is not a gig's city).

## Ledger (`INLINE_OFF`, `Retro.3.…`)

Each confirmed by the probe at both widths and read off Retro's own DOM (`scratchpad/texts.mjs`: every text node of the page at 1440 and 768; each string searched, case-insensitively).

| Row | Reason |
|---|---|
| `repertoire.songs.length` | not drawn: only layout 3 prints a song's length |
| `calendar.prompt` | not drawn: shows only while no day is cued, and the canvas opens with one cued (no *Pick a date* in the section) |
| `testimonials.quotes.when` | not drawn: layout 4's wall has no seat for it (no *Reviewed …* in the section) |
| `media.tracks.sub` | derived value: the list tile prints the release alone (`Single`); `02:28` / `04:22` are the player's clock, so `Single · 5:42` is in no node |
| `pricing.unit` | derived value: layout 4 drops the leading slash, so the page prints `event` where the field holds `/event` |

Also reported, not ledgered: `tiers.tags` ×6 and `songs.tags` ×18 (`*.*`, derived chips); the ticker's rows 1–4 (*paged*: the arrows are live-only); the testimonials past the fourth (1440) and third (768)
(*paged*, the arrows). The wizard's steps, *Guests* / *Set length* / *Budget* / *Sound*, the step numerals and the A–Z rail are literal or derived and own no slot.

## Learned

- **`stats` and `steps` work as written**: 12 + 6 cells hit at both widths, 0 NOT-RESTORED, so `statsVal` / `stepsVal` resolve what `sectionVm` does (`notes/list-editors.md`).
- **Layout 4 draws every song, sorted by title**, so `INLINE_HEAD` has no work: the two seeded *Valerie*s are two drawn nodes and `valerie.mjs` (pointed at layout 4) shows the first opens
  row 0, the second row 11, typing in one rewrites only its own, Escape restores — at both widths. Layout 3 needed the ledger because it drew a song twice and another not at all.
- **The first slot whose node case differs from the stored copy through the markup**: the ticker prints the month upper-cased in the string (`meta`), not by CSS, so the textarea holds `Jul`
  while the page draws `JUL`. The probe matched it (`textRange` and `squash` are case-insensitive), the sentinel lands, and the box lies on `JUL` (screenshot). The type is transparent, so nothing
  doubles; the caret ends where `Jul` would. Not fixed.
- **Sticky:** the only sticky box is the repertoire's A–Z rail at 1440 (`sticky4.mjs`: nothing else at either width), and it holds no slot. A box on a title scrolls with its row at a constant
  1.2 px (768: 1.5 px) (`sticky3.mjs`).
- **Seats** (`seats.mjs`, THEME=Retro LAYOUT=4, all eleven sections, both widths): every box's caret colour, face, size, weight and `text-transform` equal its node's on 12 / 6 / 7 / 2 / 37 / 19 /
  27 / 8 / 21 / 13 (10 at 768) / 11 boxes, **0 mismatches** at both widths. Fraunces (display) and Inter (body) one face each; no Gloock here.
- **Rotation** (`tilt.mjs`): layout 4's header has no polaroid, and the only rotated text on the page is the header's and the footer's `KAI MERCER` seal rings (no slot) and the
  map's `30mi` / `60mi` / `120mi` (translate only). So the tilted-box path did not arise.
- **Every visible character** (`charsweep.mjs`, up to 10 characters of each node, 1841 clicks at 1440 and 1737 at 768): 5 nodes flagged at each width, all by design: the three price nodes (two slots in
  one node), the ticker line (four slots in one node; 1 dead click on a `·` at 768) and `Next: Hidden Warehouse` (3 of 10 characters are the literal `Next:`). Nothing opened a slot whose copy the node does not print.
- **Screenshots** (textarea tinted, 1440; 163 boxes by `boxcheck.mjs`, 17 flagged; 9 shots viewed): the box lies on the glyphs for the ticker's `JUL` and the venue's words (the `Next:` left out),
  `450` (Fraunces) beside its `£`, `June 2021`, `Listen`, the stat label `GIGS YTD`, a repertoire title (`Crazy in Love`), the calendar's `Wedding` chip and the form's `Contact Us`. The 17 flags
  are the classes passes 3–14 recorded: the repertoire's twelve `·` separators opening their neighbour artist, the two part slots measured against their whole line, and the price amount in Fraunces
  (box `line-height` against the content rect). No weight or case mismatch.
- **The calendar's *Wedding* is drawn twice** (the type chip and the wizard's summary echo) and both open `types#0`, the two-*Valerie* shape; the summary mirrors the chip.
- **Known limit:** an emptied month or day alone (the page prints `Manchester · JUL · 22:00`) matches none of the ticker's line forms and opens nothing; the panel is the way in.
- **For pass 16 (Lime L4):** expect the `*.3.` part and line rows to carry over unchanged and the five ledger rows to repeat as `Lime.3.…`, each read off Lime's own DOM (`texts.mjs`). New ground: Lime's
  ticker is an olive capsule (`s.limeTree`, not Retro's mustard one), its stat cells are fitted per word (`wordEms`), and its pager is compact; `sticky4.mjs`, `seats.mjs` (THEME / LAYOUT env),
  `charsweep.mjs`, `valerie.mjs` (the open row is `open('Retro', 4, …)`) are the checks.
- **Open (carried):** (a) a state-aware ledger for `tracks.sub`, now with `pricing.unit` as its second member (a printed-form transform, not a seed shape); (b) the bio→header cross-section question (the layout-4
  card prints the name, role line and six chips with no bio field); (c) pass 4's over-cap title finding; (d) two different rows with the same title both drawn at layout 3 open nothing (layout 4 pairs them
  by position and is fine); (e) Pop L3's testimonials kicker `●` opens the lifted heading on its lower half at 1440: **answered by the user, 2026-10-22: fix it at the end-of-plan sweep (pass 21)**.
- A check run is ~9 minutes for both widths; `seats`, `tilt`, `charsweep` at both widths and `boxcheck` ran beside it without trouble.
