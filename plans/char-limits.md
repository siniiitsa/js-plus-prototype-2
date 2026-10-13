# Character limits on every text field

## Context

Nothing in the builder limits how much text a field takes. `FIELDS` (`source/src/builder/data.js:1803`) has
~115 text keys, the eleven repeaters have their own text columns, and none of them has a cap.
`max` exists only as a row count on the repeaters. Long copy overlaps neighbours, runs out of fixed cards,
or wraps buttons, pills and labels that the Figma frames draw on one line. The goal is a per-field,
**per-template, per-layout** character cap, enforced in the edit panel and on the page, with every number
measured: Figma says how a text block is meant to look, and the browser says how many characters fit it.

This is a pass over every section, so it runs the way the design passes do: one plan file, one section per
session, a handoff prompt between sessions. Step 0 copies this plan to `plans/char-limits.md` and adds a row
to `plans/README.md`.

## Decisions (user calls, 2026-10-13)

1. **Hard stop with a counter.** `maxLength` on the input, so typing and pasting stop at the cap. A small
   `n / cap` counter appears at 80% of the cap.
2. **Clamp on render, keep the copy.** When a layout switch puts stored text over the new cap, `sectionVm`
   trims what it renders (at a word boundary, ending in `…`, inside the cap) and `c` keeps the full text.
   The panel's counter turns red and reads *"34 / 25 · shortened on the page"*. Switching back restores it.
3. **Measured with realistic prose.** Seed-like copy: real words, mixed case, average glyph widths. Each cap
   is the minimum over three prose samples.
4. **One-line seats keep Figma's line count exactly.** These are buttons, pills, labels, eyebrows, chips
   and headings, held to the lines their frame box draws. Block text (`type: 'area'`: paragraphs, quotes,
   intro lines) may wrap past Figma's lines until it would overlap, clip, run out of a fixed card or push
   a fixed-height box.
5. **Every repeater text column gets a cap**: tracks, songs, gigs, tiers, quotes, links, stats, steps,
   form boxes, slots and sets.
6. **Seats that already ellipsize or shrink get capped too.** Examples are the media track titles, the
   Lime-tree capsule label, `vm.cardNameEms` and the h1's `titleWordEms`. The cap sits where the frame's
   look stops holding, and the ellipsis or shrink stays as a fallback.
7. **Shared identity keys** (header `title`/artist name, `kicker`, `location`, `tags`) use the tightest
   cap among the sections on the page at their current layouts. A later layout change elsewhere is covered
   by that section's render clamp.
   *Amended for the name in session 1 (user call, 2026-10-13):* the artist's name takes the header's own
   cap, and every other seat that prints it (a byline, a display head, a seal's ring) clamps its own copy.
8. **Lists** (`tags`, `types`, `promises`, tier features, `rings`, …) get a per-item cap and an item count.
   An edit that pushes any item past its cap, or the list past its count, is refused, and the page clamps
   any item that is over.

## Mechanism (session 0)

**Data shape, in `data.js`.** A `chars` key goes on a `FIELDS` entry. It has `in`'s shape: a number, an
array indexed by design, or an object keyed by template with `'*'` for the rest. A list field adds `list:
','` or `list: '\n'` and `count`, and its `chars` is then the per-item cap. A repeater entry adds `cols: {
title: <chars spec>, sub: … }`. Identity consumers get one table, `IDENTITY_CHARS = { [cat]: { title,
kicker, location, tags } }`, in the same spec shape. It holds the caps of sections that print the header's
keys but have no field for them.

**Resolvers, beside `fieldReach()` (`data.js:2562`).** These reuse `reachOf`'s template lookup:
- `fieldChars(f, themeName, design)` returns the field's cap for that template and design, or undefined.
- `colChars(f, col, themeName, design)` does the same for one repeater column.
- `identityChars(key, sections, themeName)` returns the minimum over the header's own cap and every page
  section's `IDENTITY_CHARS` entry at its design. EditPanel uses it for the header's four shared keys.
- `clampText(s, cap)` cuts at the last space at or after 60% of the cap and appends `…` within the cap.
  `clampList` clamps each item and the item count.
- `clampContent(cat, c, themeName, design)` returns a shallow copy with every capped string key, list and
  repeater column clamped. It leaves `url`, `email`, `date` and `select` types and non-strings alone.
- `clampIdentity(cat, identity, artistName, themeName, design)` clamps the identity strings and the artist
  name against that section's own caps.

**Render.** At `sectionVm`'s head (`EncoreBuilder.jsx:284`), once `design` is known and before any read of
`c`, `identity` or `artistName`, put `c = clampContent(…)` and clamp the identity. Doing it there covers
the canvas, `PublishedPage`, `LayoutPicker` thumbnails, the setup modal and the preview harness at once.
Seeds are absent keys, so the clamp never touches them. The seed check (below) guarantees every seed fits.
`EncoreSection` stays untouched, with zero logic and no new imports.

**Panel (`EditPanel`, `EncoreBuilder.jsx:4281`).**
- Pass `maxLength={cap}` to the generic `Input` and `Textarea` and to `NameInput`. The cap comes from
  `fieldChars`, or from `identityChars` for the shared keys. EditPanel already receives `navSections`;
  pass the page's sections if those aren't enough.
- Add one `CharCount` component under the box. It shows `n / cap` from 80% of the cap, in red past it,
  with the "shortened on the page" note.
- List fields use a guarded `onChange` that keeps the previous value when the new one breaks an item cap or
  the count. Their counter reports the longest item and the item count.
- Each repeater takes a `caps` prop, resolved from `cols`, and passes `maxLength` plus the same counter to
  each column's `Input`/`Textarea`: `TracksField`, `SongsField`, `SetsField`, `GigsField`, `TiersField`,
  `FormFieldsField`, `QuotesField`, `LinksField`, `SlotsField`, `StatsField` and `StepsField`, all in
  `EncoreBuilder.jsx` around lines 2800–4250.

Session 0 wires all of this up with no caps written yet. With no caps, the builder's output is byte-identical
to before.

## Measurement method

**A. Figma census: the intended look.** File `uFoUbPaBrDicjyuSBEbtGT`. Call `create_session`, then load the
`figma-use` skill. Then run one read-only `use_figma` walk per master frame. That is 5 templates × 4 layouts
× 3 widths. The frame ids are in each `plans/<template>/layout-N.md` header. Retro layout 1 is `964:58575`,
and its narrow frames and Retro's layout-2 desktop are found as `figma-frame-reading.md` describes. Each
walk collects every TEXT node as `{id, chars (first 60), w, h, textAutoResize, lineHeightPx, fontSize,
textTruncation, maxLines}` and computes `lines = round(h / lineHeight)`. Keep each return under 20 KB.
- **Join to fields by `characters`.** Seeds are the frames' own bytes. Pop sets its strings in capitals,
  so compare case-insensitively. A field with no match falls back to its seed's rendered line count, and
  the plan records that.
- **What the census gives each seat:** the allowed lines per width, and whether it is a fixed or hug box.
  A `WIDTH_AND_HEIGHT` box is one line. A fixed-height box is `floor(h / lh)` lines. A hug-height Input
  field uses its frame line count. An `area` field is a block.
- The results live in `plans/char-limits/census/`: twenty `<Template>-<design>.json`, plus
  `seeds.json`, the walk `census.js` and the frame table `FRAMES.md`. The probe reads them
  directly (`censusLines()` in `limits.mjs`).

**B. Browser probe: the number.** Add `source/scripts/limits.mjs`, modelled on `scripts/reach.mjs`. It runs
puppeteer-core on `headlessShell()` against `preview.html?cat=&arch=&theme=&w=` with `&cj=`, `&who=`,
`&name=`, `&tiers=`, and `&column=` for layout 3's composed desktop column. Write the file once, while no
digest is running, because a new file in `scripts/` reloads Vite. Iterate on one-off copies in the
scratchpad.
- **Probe list.** It is generated from `FIELDS`: every text key, every repeater column (one row, the other
  rows left at their seeds), and every identity key through each consumer section.
- **Sample.** A prose sample that starts with a distinctive word, so the seat can be found. The seat is the
  deepest element whose text contains it, case-insensitively. The sample is built up to N characters. There
  are three different samples, and the cap is the minimum over them.
- **The test at length N.** A length fails if any of the following holds; otherwise it passes:
  1. The line count (`Range.getClientRects()` grouped by top) exceeds the census's allowed lines. This test
     applies to one-line seats only.
  2. Ink falls outside a clipping ancestor or the section root. This means `scrollWidth > clientWidth` on an
     ancestor with overflow hidden or clip, or a rect past the root.
  3. The seat overlaps another leaf element (text, image, button) that it did not overlap at seed length.
  4. An ellipsis engages.
  5. A shrink seat's font size drops below the floor its header session sets.
  6. A fixed-height card or box grows.
- **Search.** Bisect N between the seed's length and 400, then confirm N passes and N+3 fails. The cap is
  the minimum over the three widths, on the canvas. Live renders are spot-checked only for the seats that
  print live alone.
- **Output.** JSONL in the scratchpad, plus a summary table of `field | template | design | 1440 / 768 /
  390 | cap`. The table goes into the section's part of `plans/char-limits.md`.
- **Modes.** `--check` re-renders every field at its cap with the three samples and an all-lowercase one,
  and expects zero failures. `--seeds` asserts every seed is at most its cap at every design that reads it.
  A seed over its cap means the cap is wrong.

## Sessions

| # | Scope |
|---|---|
| 0 | `plans/char-limits.md`, the mechanism (no caps), `limits.mjs`, the Figma census for all frames, and a pilot on Retro's header to validate the method |
| 1 | header: its own keys, the artist name, the identity consumers' `IDENTITY_CHARS`, and the h1 and card-name shrink floors |
| 2–11 | bio, media, pricing, repertoire, gallery, calendar, map, testimonials, form, footer: one section per session |
| 12 | Sweep: the bio heading's widest-word fit at 1440 (session 2, judgement 1; user call, 2026-10-13); the full `--check` and `--seeds`; the build digest at seeds byte-identical to `main`; one cross-cutting bullet in `CLAUDE.md` and a README paragraph; `npm run build:standalone` and copying it to the root `index.html` |

Each section session does the following:
1. Probe its fields over all five templates, its designs and the three widths.
2. Write `chars`, `list`/`count` and `cols` into `FIELDS`.
3. Record the table and any judgement calls, such as a frame whose own string is a floor, in the plan and
   in `notes/<section>.md`. Per-section decisions don't go into `CLAUDE.md`.
4. Verify in the real app.
5. Print the paste-ready handoff prompt for the next session, then stop.

## Critical files

- `source/src/builder/data.js`: `FIELDS`, the `chars`/`cols`/`list` specs, `IDENTITY_CHARS`, the resolvers
  and the clamps.
- `source/src/builder/EncoreBuilder.jsx`: the clamp at `sectionVm`'s head, `EditPanel`'s inputs,
  `NameInput`, the eleven repeater fields, and the new `CharCount`.
- `source/scripts/limits.mjs`: new, modelled on `reach.mjs`, and reusing `headless-shell.mjs`.
- `plans/char-limits.md`, `plans/char-limits/census/`, `plans/README.md`, and `notes/*.md`.
- `EncoreSection.jsx` stays unchanged.

## Verification

- `node scripts/limits.mjs --check` and `--seeds` both report zero failures.
- `scripts/build-digest.mjs` at seeded content shows no diff against `main`. The clamps are inert on seeds.
- Real app, through chrome-devtools MCP (`npm run dev`):
  1. Typing past a cap stops, and pasting a long string truncates.
  2. The counter appears at 80% of the cap.
  3. A tag longer than its item cap is refused.
  4. Switching a section to a tighter layout shows the trimmed text with `…` on the canvas and the
     published tab, and the counter goes red. Switching back restores the full text.
  5. The header's kicker cap tightens when a bio layout that prints it in a narrow seat is on the page.
- `npm run build` and `npm run build:standalone` both pass.

## Session 0: done (2026-10-13)

**Landed, with no caps written yet.** With no caps, the builder's output is unchanged, because
`clampContent` returns `c` itself when nothing is over a cap.
- `data.js` gains the following beside `fieldReach()`:
  - `IDENTITY_CHARS` (empty), `fieldCap`, `colCaps`, `identityCap`, `clampText`, `clampList`,
    `clampCapped`, `capExcess`, `clampContent` and `clampIdentity`.
  - `fieldSeed()`. EditPanel's seed chain moved here unchanged, together with `HEADING_3` /
    `HEADING_4` (out of `EncoreBuilder.jsx`), so the panel and the probe resolve one seed.
- `sectionVm` clamps `c`, `identity` and `artistName` at its head. `clamp: false` is the
  harness's way to switch that off, and `preview.jsx` passes it on `&noclamp=1`.
- `EditPanel` and its repeaters:
  - Every generic text box and every repeater text column (33 of them) is a `CappedText`.
    Uncapped, it renders the bare `Input` / `Textarea`. Capped, its placing styles move to a
    column round the box, with `CharCount` under it.
  - `NameInput` takes a `cap`.
  - The header's shared keys and Title take `identityCap` over the page's sections. EditPanel
    gets a new `sections` prop for this.
- `scripts/limits.mjs` is the probe, with `--check`, `--seeds` and `--seed-list` modes.
- `plans/char-limits/census/` holds the Figma census: twenty `<Template>-<design>.json`,
  `seeds.json`, the walk `census.js` and the frame table `FRAMES.md`.

**Verified in the real app.** The test set temporary in-memory caps: header Kicker 16, Tags
10 per item × 6, bio Heading 20 / 20 / 12 / 20, track title 14.
- Typing stopped at 16 and the counter read `16 / 16`.
- A 20-character bio heading, switched to layout 3, printed `Reads every…` on the canvas and in
  the layout picker's thumbnail, with the counter red: `20 / 12 · shortened on the page`.
  Switching back restored the full text.
- The track rows kept their layout with a counter under the title.
- To mutate `FIELDS` in a running dev page, import the module by the `?t=` URL that
  `performance.getEntriesByType('resource')` lists. The bare `/src/builder/data.js` is a
  different instance once the file has been hot-reloaded.

**Probe refinements the pilot forced.** These are all in `limits.mjs` now.
- **The reference is the seed's own render.** A short "Kestrel" render was the reference at
  first. It seats in a different element than a multi-word value (a one-word name sits in the
  h1's word span), so every comparison misaligned.
- **A seat keeps the seed's own line count** where the seed already wraps more than the census
  allows. The output flags it as `[seed N lines, frame M]` rather than failing it.
- **Text on an SVG path is exempt from the lines and box tests.** The seal's ring is one example.
- **A seat's own box counts as `self`** on both sides of the box comparison.
- The bisection floor is 1. The upper bound starts at twice the seed and doubles to 400.
- Each surface reports `×grow`: the seat's width at the cap against the seed's.

**Pilot: Retro's header** (4 keys × 6 designs, about 60 s). These calls are open for session 1.
1. **The name (`title`)** caps at 11–20 at layouts 1–4, wherever the h1 must stay on the
   frame's own line count. Layout 5 is 6 at 768: the nav brand runs under the card. A single
   seven-letter word ("Kestrel") is the binding case. Names longer than that are common, so
   decide between this and letting the h1 take one more line, or set a shrink floor through
   `FLOOR`.
2. **One-line pills, buttons and metadata** pass at 5–13× their seed width at 1440: Location
   reached 152 characters on one line. The 390 width binds every one of them (28–59), so the
   caps hold. Read `×grow` before taking a number, and cap a seat the frame clearly sizes,
   such as a pill in a nav row, nearer the seed.
3. **Block fields come back `open`** at 400 where the column grows freely: the header subtitle
   at layout 2 is one. They need a ceiling rule. A proposal: the binding break or 3× the seed,
   whichever is lower, rounded down to 10.
4. **Retro's header layouts 5 and 6 have no Figma page.** Their lines come from the seed's
   render, and layout 5's card already covers the nav brand at the seed.

**Notes for later sessions.**
- `--check` and `--seeds` cover the `who.*` probes through `identityCap`, so `IDENTITY_CHARS` is
  re-verified with the fields.
- `CappedText`'s wrapper was looked at on `TracksField` only. The first session that caps a
  `GigsField` `pair()` column, or `SongsField`'s 64px length box, should check that row once.
- The counter reads "shortened on the page" for a seed that sits over a cap, although seeds are
  never clamped. Real caps can't cause that, because `--seeds` fails it, so it is not a clamp
  bug.

## Session 1: the header (2026-10-13)

**User calls (2026-10-13), answering session 0's three and two the probe raised.**
- **(a) The name** may take one line more than the frame and shrink to 75% of its seed's size.
  That is `FLOOR` and `EXTRA_LINES` in `limits.mjs`, keyed `title`, for every seat the header
  prints it in: the h1, the nav brand and the layout-3 card name. No other field gets either.
- **(b) Block fields that come back `open`** cap at the lower of the measured break and 3× the
  seed, rounded down to 10. A measured break is taken as it is.
- **(c) One-line hug seats.** Most take the measured cap, which 390 binds. A seat the frame
  clearly sizes caps at `min(measured, max(2 × seed, seed + 8))`. The sized seats are the
  buttons and pills (`cta1`, `cta2`, `heroCta`, `availability`), the seal's `badgeText` and the
  tag chips, both the header's and the bio's. `kicker`, `location`, `cardLine` and `faceTitle`
  are metadata and take the measured number.
- **(d) A seal's ring clamps its own copy of the name.** A seal sets the name twice round a
  circle wherever Badge text is empty. That is the header's seal, the footer's on every page,
  bio layouts 1 and 3, Retro's calendar layout 1, Pop's form layout 1 and Grunge's pricing
  layout 1. Its fit is 10–19 characters. `sectionVm` shortens the ring's copy to that fit
  (`sealCap()`), so the ring never caps the name.
- **(e) The name's panel cap is the header's own** (it amends decision 7, above). Even with the
  rings left out, consumer seats cap the name at 9–14:
  - media layout 2's track byline runs into the ♡ at 11, on every template;
  - form layout 3's *Book <name>* head caps it at 9–13;
  - bio layout 3's ID-card name caps it at 14–20;
  - Pop's footer brand line caps it at 10.

  Each of those clamps its own copy (`IDENTITY_CHARS[cat].title`). EditPanel's Title box takes
  `fieldCap(title)`. `kicker`, `location` and `tags` keep decision 7 (`identityCap`).

**Judgement calls.**
- **The consumers' copies of the name take (a) too** (`who.title` in `FLOOR` and `EXTRA_LINES`).
  The user's call was about the h1. Display heads that print the name want the same rule: bio
  layout 3's ID-card name and form layout 3's *Book <name>*. The bylines (media layout 2's track
  line, Pop's footer brand line) get it by extension. That loosens their numbers against a strict
  one-line reading, but under (e) they only clamp their own copy.
- **A cap never goes under its seed's length.** The frame's own string fits where prose of that
  length may not: "DJ · Live Act" is narrower than "Kestrel night". Four places hit this:
  - the header's kicker at layout 4: 11–12 measured, 13 written;
  - Retro's header name at layout 5: 6 measured at 768, 10 written. The card already covers the
    nav brand at the seed, which is session 0's note;
  - the bio's kicker at layout 3, in the composed column at 1440: 11 measured, 13 written;
  - form layout 3's name under Editorial: 9 measured, 10 written.

  `--check` reports a cap at the seed's length that fails prose as `floor`, not `FAIL`.
- **The seal was unmeasurable by the box tests.** The first run read `badgeText` at cap 1. Its
  seats are the ring's `textPath`s, at a fixed 9px, while its seed, the name, also seats in the
  16px h1, and the copies' bounding boxes are arcs'. The probe now reads a ring by its geometry
  (`ringOf()` in `measure`). Each copy's span is measured along the path from `startOffset`,
  `text-anchor` and `getComputedTextLength()`, and each mark by its nearest point on the path.
  A length fails if a copy runs off its path, meets the other copy, or meets a mark it did not
  meet at the seed. Only the seal's probes read a ring: `badgeText` and the new `who.seal`. Every
  other probe leaves ring seats alone, and the seal's probes leave every other seat alone.
- **The consumers' name caps are written even where they cannot bind** (60–106, above any
  header cap), as the measured record. A consumer never prints a name longer than the header's
  cap anyway.
- **Unseen readings are not caps.** Map layout 4's `who.location` matched a gig's city,
  "Manchester, UK", not the location, so it is unseen, as the bio's layout 4 and the calendar's
  kicker are. Nothing is written for them.
- **The header's `tags`** gains `list: ','`, so `fieldCap` resolves its item and count caps.

**What landed.**
- **`data.js`.** `chars` on every header text field, plus `count` on `tags`. `IDENTITY_CHARS`
  covers `bio`, `calendar`, `footer`, `form`, `gallery`, `map`, `media`, `pricing` and
  `testimonials`. `sealCap(cat, themeName, design)` reads the header's `badgeText` cap, or
  `IDENTITY_CHARS[cat].seal`.
- **`EncoreBuilder.jsx`.** EditPanel's Title box (`NameInput`) takes the header's own
  `fieldCap`. `vm.badgeText` is the name clamped to `sealCap` when no Badge text is set, unless
  `clamp: false`. `EncoreSection.jsx` is unchanged.
- **`plans/char-limits/rules.mjs` and `table.mjs`**, beside `census.js`. `rules.mjs` applies the
  rules above to a probe JSONL and prints the `chars` specs. `table.mjs` prints the per-width
  readout (`session-1-probe.md`). Run them as `node plans/char-limits/rules.mjs <file.jsonl…>`.
- **`limits.mjs`.** `FLOOR` and `EXTRA_LINES` for the name. The ring test, and the `who.seal` and
  `who.tags#` probes. `--check` now runs the fourth, all-lower-case sample the plan asked for and
  session 0 had left out, and reports `floor` as above.

**The caps written** (by layout 1, 2, …; `–` where the layout does not read the field). The
probe's readout, per width, is [`char-limits/session-1-probe.md`](./char-limits/session-1-probe.md).

| field | rule | Retro | Lime | Grunge | Editorial | Pop |
|---|---|---|---|---|---|---|
| `title` (name, panel) | name | 23 22 23 14 10 31 | 14 19 22 12 | 19 20 26 17 | 12 15 15 12 | 13 18 18 11 |
| `kicker` | metadata | 59 – 17 13 – 39 | 55 – – 13 | 61 – – 13 | 33 – – 13 | 47 – – 13 |
| `location` | metadata | 55 15 19 20 – 42 | 24 24 14 17 | 24 29 15 24 | 22 15 30 19 | 23 15 36 36 |
| `cardLine` | metadata | – | – – 22 | – – 23 | – – 23 | – – 29 |
| `faceTitle` | metadata | – 22 | – 24 | – 29 | – 19 | – 20 |
| `cta1` | sized | 16 | 16 | 16 | 16 16 10 16 | 16 |
| `cta2` | sized | 14 | 14 | 14 | 14 | 14 |
| `heroCta` | sized | – 34 | – 35 | – 40 | – 21 | – 25 |
| `availability` | sized | – 38 | – 44 | – 44 | – 44 | – 40 |
| `badgeText` (ring) | sized | 19 | – – – 13 | 14 – – 14 | – – – 10 | 12 – – 10 |
| `tags` per chip | sized | 22 – 22 22 15 22 | 22 – 22 22 | 22 – 22 22 | 22 – 22 22 | 22 – 22 22 |
| `tags` count | count | 8 – 7 7 6 6 | 8 – 6 6 | 8 – 6 6 | 8 – 6 6 | 6 – 6 6 |
| `subtitle` | block | – 310 – – 104 | – 310 | – 310 | – 310 | – 310 |
| `faceBody` | block | – 180 | – 180 | – 180 | – 180 | – 180 |
| `placeBody` | block | – 160 | – 160 | – 160 | – 160 | – 160 |

| `IDENTITY_CHARS` | Retro | Lime | Grunge | Editorial | Pop |
|---|---|---|---|---|---|
| bio `kicker` | 19 20 13 47 | 20 23 21 47 | 20 20 13 47 | 20 20 13 47 | 26 22 13 47 |
| bio `location` | 23 23 15 – | 24 26 25 – | 24 23 15 – | 24 33 15 – | 27 34 15 – |
| bio `tags` per chip / count | – 22/7 – 22/7 | – 22/6 22/8 22/8 | same | same | same |
| bio `title` | – 55 19 48 | – 49 20 49 | – 65 18 60 | – 37 14 31 | – 37 17 39 |
| bio `seal` | 19 – 19 – | 13 – 22 – | 14 – 14 – | 16 – – – | – – 12 – |
| form `kicker` | 43 38 | 30 40 | 30 40 | 30 40 | 39 40 |
| form `title` | 76 50 13 | 61 40 13 | 50 85 23 | 27 42 10 | 55 54 11 |
| form `seal` | – | – | – | – | 12 (1440 only) |
| calendar `location` | 22 – – 67 | – – – 64 | – – – 55 | – – – 67 | – – – 67 |
| calendar `title` | – 64 | – 64 | – 64 | – 64 | – 64 |
| calendar `seal` | 19 | – | – | – | – |
| map `location` | – 18 | – 15 | – 17 | – 17 | – 18 |
| media `title` | 91 11 20 30 | 76 11 19 29 | 40 11 21 31 | 43 11 11 31 | 11 11 13 31 |
| footer `title` / `seal` | 24 / 19 | 46 / 13 | 54 / 14 | 39 / 16 | 10 / 12 |
| gallery `title` | 80 29 | 106 28 | 106 28 | 106 28 | 80 29 |
| pricing `seal` | – | – | 14 – – – | – | – |
| testimonials `title` | – – 65 | – – 60 | – – 67 | – – 67 | – – 67 |

**Checks.** `--seeds` over the header and every consumer: 0 seeds over their caps.
`--check` over the header (every field) and every consumer's `who.*` keys, with the three samples
and the lower-case one: 0 failures. The first run failed Pop's header name at layout 1, written
at 14. "Kestrel Bookin" (14) wraps the h1 into the seal where "Kestrel Booking" (15) does not,
because its longer widest word shrinks the fitted head. The bisection's confirm step, from
session 0, stepped down to 14 and then tested only 13 and 12, never 14 itself. The step now
re-tests every length it lands on. Pop's layout-1 name re-measured at 13, which is written. Every
other cap already passed `--check` at its written number. Ten caps report `floor`, all at their
seed's length: the header's kicker at layout 4 (768, four templates), Retro's header name at
layout 5 (768), the bio's kicker at layout 3 (1440 column, and 390 under Grunge and Pop) and
Editorial's form name at layout 3 (1440).

**Real app.** Tested with chrome-devtools on a Grunge page laid out by header layout 2 (Feature
spread), every section at layout 2, the canvas at 1440.
- **Kicker.** The header itself does not print it at layout 2. Its cap is the page's tightest,
  bio layout 2's 20. Typing *Wedding DJ and Saxophonist* stopped at `Wedding DJ and Saxop` with
  the counter at `20 / 20`. The bio and the form's credit row printed it in full.
- **Bio to layout 3.** The layout picker's layout-3 thumbnail already printed `Wedding DJ…`. After
  the pick, the canvas bio's Current role read `WEDDING DJ…` while the form kept the full 20.
  Back in the header panel the kicker box's cap had tightened to 13, and the counter read
  `20 / 13 · shortened on the page` in red. Location's cap moved from 17 to 15 the same way, both
  bounds reading off the bio.
- **The name.** Title's cap was the header's own 20, not the page's tightest (media layout 2's
  11). *Florence and the Machine Tribute* stopped at `Florence and the Mac` (`20 / 20`):
  - the nav brand, the h1 and the footer's copyright printed it whole;
  - media layout 2's byline printed `Florence… · Single`;
  - the footer's seal ring printed `FLORENCE AND…`, Grunge's fit of 14.
- **Published tab.** It matched the canvas on all of the above, its `<title>` the full name.

**Notes for later sessions.**
- The bio session (2) inherits its `IDENTITY_CHARS.bio` row. Its own fields have no caps yet.
  The kicker it prints at layout 3 (13 in the composed column) is the tightest kicker seat on any
  page.
- The form session (10): layout 3's head composes the name (`formHeading3`). It now clamps at
  `IDENTITY_CHARS.form.title` (10–23), and the form's own `heading` field at layout 3 should be
  measured with that in mind.
- The media session (3): layout 2's track-card byline clamps the name at 11 on every template.
- **For the sweep (12): the clamped string is never rendered.** `--check` renders N prose
  characters at a cap, but a clamped page prints at most N−1 characters plus `…`, and the
  ellipsis is wider than an average letter. On a seal ring at cap 10 (the Editorial and Pop
  layout-4 headers) that margin is thin. Render the clamped string once per seat kind.
- **For the sweep (12): the full name is printed in two places.** The published tab's `<title>`
  and `copyrightOf()` read the unclamped name. A name typed under header layout 3 (Pop 18) and
  moved to layout 4 (11) prints two spellings: the full one there, the clamped one in the h1.
  Nothing overflows. Decide whether that is intended.
- A section that gains a seal, or a seal that moves, needs a `who.seal` probe and an
  `IDENTITY_CHARS[cat].seal` entry, or the ring's copy of a long name sets its two copies over
  each other.

## Session 2: the bio (2026-10-13)

**Scope.** These are the bio's fourteen own text keys: `heading`, `refLabel`, `tag`, `para1`,
`para2`, `credit`, `cta`, `since`, `sinceLabel`, `roleLabel`, `baseLabel`, `aboutLabel`,
`tagsLabel` and `cta2`. `IDENTITY_CHARS.bio` is session 1's and was not re-measured. The probe
ran on a fresh Vite server (`BASE=http://localhost:5199`), since the :5173 one had been up for
three weeks. Its per-width readout is
[`char-limits/session-2-probe.md`](./char-limits/session-2-probe.md). The decisions are in
`notes/bio.md`, a new file, now in `CLAUDE.md`'s notes table. The JP-090 bullet moved there from
`notes/templates.md`.

**Rules.** These are session 1's calls, unchanged. `rules.mjs` gains the bio's sized keys
(`tag`, `cta`, `cta2`) and blocks (`para1`, `para2`). Everything else is metadata.

**The caps written** (by layout 1, 2, 3, 4; `–` where the layout does not read the field; `15f`
is the seed's floor).

| field | rule | Retro | Lime | Grunge | Editorial | Pop |
|---|---|---|---|---|---|---|
| `heading` | meta | 20 – 19 23 | 15f – 18 21 | 21 – 20 18 | 15f – 15 17 | 15f – 17 15f |
| `refLabel` | meta | 30 | 40 | 36 | 36 | 50 |
| `tag` | sized | – 18 | – 18 | – 18 | – 18 | – 18 |
| `credit` | meta | – 43 | – 43 | – 43 | – 43 | – 43 |
| `cta` | sized | – 16 | – 16 | – 16 | – 16 | – 16 |
| `para1` | block | 390 | 390 | 390 | 390 | 390 |
| `para2` | block | – – 340 340 | same | same | same | same |
| `since` | meta | – – 9f 31 | – – 22 31 | – – 20 31 | – – 20 31 | – – 20 31 |
| `sinceLabel` | meta | – – 17f | – – 17f | – – 17f | – – 17f | – – 17f |
| `roleLabel` | meta | – – 14 | – – 14 | – – 14 | – – 14 | – – 14 |
| `baseLabel` | meta | – – 16 | – – 16 | – – 19 | – – 19 | – – 19 |
| `aboutLabel` | meta | – – 56 | – – 56 | – – 56 | – – 59 | – – 48 |
| `tagsLabel` | meta | – – – 58 | – – 49 | – – 49 | – – 49 49 | – – 49 |
| `cta2` | sized | – – – 14 | – – – 14 | – – – 14 | – – – 14 | – – – 14 |

**Judgement calls.**
1. **The heading is word-bound at 1440 in four designs: Lime's, Editorial's and Pop's layout 1,
   and Pop's layout 4.** This one is open, and it is the user's call. Each design stacks the
   heading one word to a line beside the photograph. At the seed's own size, a seven-letter
   word runs under the arch or past its column, or into Pop's dot grid. The probe read 5–6 there
   (box or overlap), because every sample opens with "Kestrel". That number is the widest word,
   not a length. The floor rule writes 15, the seed's length, and `--check` reports it as
   `floor`. Session 1's floors were 1–2 characters off the seed. This one is a different kind:
   **a cap cannot hold it**. A 15-character heading with a word longer than about six letters
   still overruns at 1440, and `--check` passes it. The fix is a widest-word fit, the header's
   JP-092 / JP-102 / JP-109 shape (`vm.cardNameEms` / `titleWordEms`). That changes
   `EncoreSection`, so it is outside this pass. Session 1's (a) also gave `FLOOR` and
   `EXTRA_LINES` to the name alone. The same four designs take 15–24 at 768 and 390.
2. **Retro's `since` at layout 3 is 9, the seed's floor.** In the composed 1440 column the ID
   card's stat cell holds "June 2021" (80px) and nothing longer. A tenth character wraps it out of
   the cell. So "March 2019" is refused, and in the real app "September 2021" stopped at
   "September". The other templates take 20–22 there.
3. **`sinceLabel` is 17, the seed's floor; 14 was measured.** `sectionVm` breaks each ID-card
   label before its last word, so the label draws two lines and the first one binds. "Kestrel
   Sound" wraps where "Performing" does not. That happens at 768 on every template, in the column
   on Retro and Lime, and at 390 on Retro, Grunge and Pop. `roleLabel` (14, seed 13) and
   `baseLabel` (16–19, seed 9) did not need a floor.
4. **The sized seats are well under their measures.** At 390 the pill measured 41–79, the button
   41–79 and the Listen link 44. The sized rule writes 18, 16 and 14. Lime's and Grunge's 390
   button was the one place the page scrolled sideways (at 72 and 79).
5. **The blocks came back open** at 400 at every width and design (the cards hug their copy). So
   they take 3 × the seed, rounded down to 10: `para1` 390 (seed 131) and `para2` 340 (seed 114).
6. **The one-word labels take long caps.** *About* is 48–59, *Genres* 49–58 and the
   reference line 30–50. They are metadata, and 390 binds them on one line. Their seats are
   stretched blocks, so `×grow` reads 1.
7. **Retro's layout 4 draws no Genres line at 390** (`!s.mob`). Its row there is `unseen`, and
   its 58 comes from 1440 and 768.

**Checks.**
- `--seeds` over every bio key: 0 seeds over their caps.
- `--check` over every bio key, with the three samples and the lower-case one: 0 failures. The
  `who.*` row is included, so `IDENTITY_CHARS.bio` is re-verified. Thirteen rows report `floor`,
  and only the expected ones:
  - the heading at 1440 in the four word-bound designs (judgement 1);
  - `sinceLabel` (judgement 3);
  - session 1's `who.kicker` at layout 3: in the 1440 column on four templates, and at 390 on
    Grunge and Pop.
- Retro's `since` at 9 passes outright: prose of nine characters fits where ten does not.

**Real app.** Tested with chrome-devtools on the :5199 server: a Retro page laid out by header
layout 4 (Stacked), the canvas at 1440.
- **Bio at layout 4.** Every field showed its cap: heading 23, paragraphs 390 / 340, Performing
  since 31, Genres 58, Listen 14. Typing *Reads the room and the floor* stopped at 23, with the
  counter at `23 / 23`.
- **The layout picker.** With the heading at *Reads the room and more* (23), the thumbnails
  printed `Reads the room and…` at layout 1 (20) and `Reads the room…` at layout 3 (19), and the
  full text at layout 4.
- **Bio to layout 3.** The canvas printed `Reads the room…`. The box kept all 23 characters
  (`maxLength` 19), and the counter read `23 / 19 · shortened on the page` in red. Performing
  since took 9: typing *September 2021* stopped at `September` (`9 / 9`). The ID card's labels
  showed their counters at the seed (`17 / 17`, `13 / 14`).
- **Published tab.** It printed `Reads the room…`, and its `<title>` was the name.
- **Back to layout 4.** The canvas printed the full text, and the counter read `23 / 23`. Opening
  the tab again re-rendered it with the full heading. A republish only reaches an open tab
  through the dialog's *Open*.

**Notes for later sessions.**
- **Media (3).** Layout 2's track-card byline clamps the name at 11 on every template (session 1).
  Layout 3 has a composed 1440 column (`COLUMN.media = 'left'`). Judging by the bio's ID card,
  that is where its labels will bind.
- **For the sweep (12), or a session of its own.** The bio heading's widest-word fit (judgement 1)
  is the user's call.

## Session 3: the media player (2026-10-13)

**Scope.** These are the media's own text keys: `kicker`, `heading`, `listLabel`, `countLabel`,
`totalLabel`, `chipLabel` and `cta`, and the first repeater columns, `tracks.title` and
`tracks.sub`. `soundcloud` is a url and is skipped. `IDENTITY_CHARS.media` is session 1's (the
layout-2 byline's 11) and was not re-measured. The probe ran on a fresh Vite at :5199. Its
per-width readout is [`char-limits/session-3-probe.md`](./char-limits/session-3-probe.md), and
the decisions are in `notes/media.md`.

**Rules.** These are session 1's calls, unchanged. `rules.mjs` gains the media's sized keys,
`cta` and `chipLabel`; the chip is a pill on the fan's front card. There are no blocks.
Everything else is metadata.

**The caps written** (by layout 1, 2, 3, 4; `–` where the layout does not read the field; `f`
marks a cap at its floor that prose fails at some width).

| field | rule | Retro | Lime | Grunge | Editorial | Pop |
|---|---|---|---|---|---|---|
| `kicker` | meta | 46 – 51 | 55 – 55 | 55 – 55 | 55 – 55 | 42 – 55 |
| `heading` | meta | 20 20 25 20 | 20 20 20f 20f | 30 20f 20f 25 | 20f 20f 20 20 | 20f 20f 20 23 |
| `listLabel` | meta | – 29 41 | – 34 41 | same | same | same |
| `countLabel` | meta | 42 40 51 | 51 44 51 | 30 44 51 | 51 44 51 | – 44 51 |
| `totalLabel` | meta | – 35 46 | – 39 46 | same | same | same |
| `chipLabel` | sized | – 14 | – 12 | – 13 | – 13 | – 13 |
| `cta` | sized | – | 16 | 16 | – | – |
| `tracks.title` | meta | 17f 17f 25 17f | 40 17f 19 17f | 27 17f 21 17f | 17 17f 17f 17f | 17f 17f 17f 17f |
| `tracks.sub` | meta | 33f 33f 33f 33f | 33 33f 33f 33f | 33 33f 33f 33f | 33 33f 33f 33f | 33f 33f 33f 33f |

**Judgement calls.**
1. **A repeater column's floor is its longest seeded row** (the advisor's catch, taken). The
   probe changes row 0, *Late Lights* (11) and *Single · 5:42* (13), but the seeded list holds
   *Manchester at 3am* (17) and *Live at the Deaf Institute · 7:01* (33), and the frames draw
   both. Seeds are an absent key, so nothing is clamped at first. But the first edit to any row
   stores the whole array, and a cap under 17 would then shorten the seeded titles and paint
   their counters red. So `tracks.title` is 17 wherever the probe read less: layouts 2 and 4 on
   every template (10–15), Retro's layout 1, Editorial's layout 3 and Pop's layouts 1 and 3.
   Editorial's layout 1 measured 17 exactly. `sub` is 33 at every design. The probe read 11–33,
   and Lime's, Grunge's and Editorial's layout 1 measured 33 and pass outright. At 17 a title behaves as the seeded *Manchester at
   3am* already does, checked in screenshots:
   - the layout-2 fan clips it under the next card;
   - the layout-4 tiles and the layout-2 bar ellipsize it;
   - the layout-4 now-playing title takes a second line (Editorial's seed already does at 1440).
   Decision 6's ellipsis is the fallback there. The census has the same row-0 bias:
   `latelights` is 1 line at Retro's layout 1 and `manchesterat3am` 2. That is why Retro's 768
   read 12.
2. **The heading is held at its seed, 20, at most designs, and eight of them are floors.** The
   frame's box is two lines at a fixed width. *FIVE WORTH / YOUR EAR.* fills it, while prose
   whose first two words cannot share a line takes three (*KESTREL SOUND / B* at 15, Editorial
   390 and Pop 768, which read 14). This is line packing, not session 2's widest-word bound.
   *Kestrel* fits a line here. A length cap cannot do better, and `--check` reports `floor`.
   Retro's layout 3 (25), Grunge's layouts 1 (30) and 4 (25) and Pop's layout 4 (23) have room.
3. **`countLabel` read 1 at layout 2 on every template.** That was a probe artefact: the fan
   chip's seed is the same *Featured*, so the seed's render seated both, and the counter was
   compared with the chip. Re-probed with the twin renamed, it reads 40–44. `chipLabel`'s first
   reading had the same flaw and re-read the same (12–15), its ×grow now ≥1.
4. **The sized seats are well under their measures.** The Book pill measured 46–51 at 390, so
   it is 16. The chip measured 12–15, so it takes the measure.
5. **The counter's words are long** (40–51), and Grunge's layout-1 counter is 30. It is metadata
   in a row that wraps, and 390 binds it. At Grunge's 390 the next length overlaps a neighbouring
   seat.

**Probe fixes** (`scripts/limits.mjs`; they apply to every later session).
- **`artOf()` reads the seeded track art on the worker's own page**, cached as a promise. It used
  `pages[0]`, which another worker could be navigating, and the first run died with
  `ERR_ABORTED`.
- **`twinsOf()`.** A text probe renames any sibling field whose seed prints the same string
  (judgement 3).
- **`seedsOf()` / `floorOf()`.** A repeater column's seed is every seeded row. `--seeds` checks
  each row, and `--check`'s `floor` and the row's `seedLen` read the longest one (judgement 1).

**Checks.**
- `--seeds` over every media key: 0 seeds over their caps, with every seeded track row checked.
- `--check` over every media key, with the three samples and the lower-case one: 0 failures
  in 231 rows. The `who.*` row is included, so `IDENTITY_CHARS.media` is re-verified. 39 rows
  report `floor`, all expected: `tracks.title` (14) and `tracks.sub` (17) under judgement 1, and
  the heading (8) under judgement 2.

**Real app.** Tested with chrome-devtools on the :5199 server: a Retro page laid out by header
layout 3 (Inset Hero), with the media in the composed column at 1440.
- **Media at layout 3.** The panel showed track title 25, sub 33, kicker 51, heading 25, list
  41, counter 51 / 46. The track rows kept their layout, with the counter under the box
  (`29 / 33` under the seeded subs).
- **Typing.** Track 1's title, typed *Midnight on the Northern Line*, stopped at `Midnight on the
  Northern ` (`25 / 25`). The heading, typed *Songs for the late crowd. Always.*, stopped at
  `Songs for the late crowd.` (`25 / 25`).
- **The layout picker.** The thumbnails printed `Songs for the late…` and `Midnight on the…` at
  layouts 1, 2 and 4, and the full text at layout 3.
- **Media to layout 1.** The canvas printed `Songs for the late…` and `MIDNIGHT ON THE…` in the
  stack and the player. Both boxes kept their 25 characters, with the counters red:
  `25 / 20 · shortened on the page` and `25 / 17 · shortened on the page`. The seeded *Manchester
  at 3am* read `17 / 17`, unclamped.
- **Published tab** (through the dialog's *Open*). It printed the same clamped heading and
  title, and its `<title>` was the name.
- **Back to layout 3.** The canvas printed the full text, and the counters read `25 / 25`.
  Opening the tab again re-rendered it in full.

**User call (2026-10-13): the bio heading's widest-word fit is left to the sweep (12).** This is
session 2's judgement 1: the bio heading at 1440 in Lime's, Editorial's and Pop's layout 1 and
Pop's layout 4. The media's heading floors are line packing, not that, and need nothing.

**Notes for later sessions.**
- **Every repeater session (4 pricing, 5 repertoire, 7 calendar, 8 map, 9 testimonials, 10 form,
  11 footer).** The column floor is the longest seeded row (`floorOf`). Look at the seeded rows
  before reading the table, because a short row 0 under-reads the floor.
- **Fields sharing a seed string** are now separated by `twinsOf`. A probe that reads 1 at a
  layout where the seat is plainly fine is the first thing to suspect.
- **Pricing (4), first thing: `seedsOf()` covers text columns only.** For an item or count
  column (`tiers.tags[]` / `#`, `tiers.feats[]` / `#`, and later `songs.tags[]`) it still returns
  row 0's list, which is the same row-0 under-read judgement 1 fixed for titles. `tiersSeed()`
  also differs by template and design. Extend it to every row's list before trusting pricing's
  floors, while no probe is running.
