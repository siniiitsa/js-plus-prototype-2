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

## Session 4: pricing (2026-10-13)

**Scope.** These are pricing's own text keys: `kicker`, `heading`, `unit`, `intro`, `offer`,
`quote`, `reviews`, `rating`, `cta`, `note`, `featsLabel`, `badgeLabel`, `rowCta` and `sub`, and
the `tiers` columns `name`, `price`, `tags` (item and count), `blurb` and `feats` (item and
count). `images` is skipped. `IDENTITY_CHARS.pricing` (Grunge's layout-1 seal) is session 1's and
was not re-measured. The probe ran on a fresh Vite at :5199. Its per-width readout is
[`char-limits/session-4-probe.md`](./char-limits/session-4-probe.md), and the decisions are in
`notes/pricing.md`.

**Rules.** These are session 1's calls, unchanged. `rules.mjs` gains the sized keys `cta`,
`rowCta`, `badgeLabel` and `tiers.tags[]`, and the blocks `intro`, `quote` and `tiers.blurb`.
`offer` is metadata: screenshots show it as plain text beside the chip capsule, not a pill.
Everything else is metadata, and the two counts take the measure.

**The caps written** (by layout 1, 2, 3, 4; `–` where the layout does not read the field; `f`
marks a cap at its floor that prose fails at some width).

| field | rule | Retro | Lime | Grunge | Editorial | Pop |
|---|---|---|---|---|---|---|
| `kicker` | meta | – 74 | same | same | same | same |
| `heading` | meta | 42f 42f 44 | 50 42f 37 | 55 44 41 | 42f 42 25 | 48 42f 28 |
| `unit` | meta | 7 37 32 69 | 13 40 28 88 | 15 41 33 98 | 12 37 29 53 | 11 39 27 51 |
| `intro` | block | – – 240 | same | same | same | same |
| `offer` | meta | – – 63 | – – 59 | – – 59 | – – 59 | – – 59 |
| `quote` | block | – 260 | same | same | same | same |
| `reviews` | meta | – 54 | – 55 | – 55 | – 55 | – 55 |
| `rating` | meta | – 47 | same | same | same | same |
| `cta` | sized | – 40 | – 39 | – 40 | – 23 | – 27 |
| `note` | meta | – 54 | – 55 | – 55 | – 55 | – 55 |
| `featsLabel` | meta | – 48 57 | – 68 51 | – 68 55 | – 68 55 | – 35 57 |
| `badgeLabel` | sized | – – 16 | same | same | same | same |
| `rowCta` | sized | 12 – 12 26 | 14 – 12 26 | 16 – 12 26 | 9 – 12 26 | 10 – 12 26 |
| `sub` | meta | 133 67 67 67 | 67 67 63 67 | 53f 67 63 67 | 67 67 63 67 | 80 67 63 67 |
| `tiers.name` | meta | 19 18 53 16f | 30 28 42 23 | 40 34 51 25 | 22 18 27 16f | 16f 16f 30 18 |
| `tiers.price` | meta | 8 33 31 25 | 12 35 25 29 | 14 35 30 34 | 11 33 27 20 | 10 34 25 23 |
| `tiers.tags` per chip | sized | 12 – 12 12 | 26 – 26 26 | same | same | same |
| `tiers.tags` count | count | 4 – 5 6 | 4 – 4 5 | 4 – 4 5 | 4 – 4 5 | 3 – 4 5 |
| `tiers.blurb` | block | 160 | 160 | 160 | 160 | 160 |
| `tiers.feats` per line | meta | 24f 24f 24f 59 | 24 24 24f 62 | 25 24 24f 62 | 25 24 24f 60 | 26 24f 24f 62 |
| `tiers.feats` count | count | 15 15 15 5 | same | same | same | same |

**Judgement calls.**
1. **The price is read with digit-led samples.** `priceParts()` sets everything before the first
   digit small, the first number big and the rest small, so a long price grows in its tail:
   *£475 — £1,450 per evening…*, *From £1,250 + VAT…*, *£685 per set…* (`KEY_SAMPLES` in
   `limits.mjs`). Prose has no digit, so it sets whole in the big numeral. That is the *Price on
   application* case, and `--prose` reads it (second table in the readout):
   Retro 6 9 20 26, Lime 12 22 19 27, Grunge 14 26 23 33, Editorial 11 14 13 18, Pop 9 18 15 22.
   The written caps are the digit-led ones, so a no-digit price at the cap can wrap the numeral.
   **This one is the user's to overrule.** Layout 1's deck holds 8–14, so the frames' own range
   form (*£450 — £1,400*, 13) does not fit every deck card.
2. **A column's floor is the longest seed of any design** (an extension of session 3's
   judgement 1). The first edit stores the seed that was showing, and that list then stands at
   every layout. `tiersSeed()` differs by template and design, and only in the tags. Under Lime,
   Grunge, Editorial and Pop the seeds hold *Private Event* (13, layout 1), so a tag chip is
   max(2 × 13, 13 + 8) = 26 at every design. Retro's seeds are *Solo*, *Trio*, *Band* and *Duo*,
   which gives 12. The tag count's floor is 3. `seedsOf()` now reads every design's rows.
3. **`tags` at layout 2 is not a cap.** Layout 2 prints no tags. The probe's 1 was the seed *Solo*
   seated inside the feature *Solo DJ setup*.
4. **The feature count is 15 at layouts 1–3 and 5 at layout 4.** One a line, the list grows down
   a hugging card. Its count was first read at 4 everywhere by the lines test (row 0 draws four).
   Tested as a block, it was open to the probe's 16, so it takes the block ceiling, three times
   the seed's 5. Layout 4 draws the features as a wrapping chip row, and the lines test bounds
   that at 5.
5. **Editorial's layout-1 Book pill is 9** (seed 8). The deck fits that label by its ems
   (`vm.tierRowCtaEms`), so the next character shrinks it at 390. A shrink floor for it, like the
   name's `FLOOR`, is the user's call. Pop's layout 1 reads 10 and Retro's 12, both on one line.
6. **`rating` is metadata (47)** because the session's sized list does not name it. Its seat grows
   8–18× its seed's width before 390 binds. If it should be sized, the rule gives 11.
7. **Floors** (prose fails, the seed fits; `--check` reports `floor`):
   - the heading at layouts 1 and 2 (line packing: 39–41 read);
   - the names at Pop's layouts 1 and 2 and at layout 4 under Retro and Editorial (14–15 read);
   - the features at layout 3 on every template (19–22 read) and at Retro's layouts 1–2 and Pop's
     layout 2;
   - Grunge's small print at layout 1, which already takes two lines at 390 (36 read).

**Probe fixes** (`scripts/limits.mjs`; they apply to every later session, and the sweep's full
`--check` re-runs earlier sections under them).
- **Lines are counted upright.** The deck cards at Retro's and Pop's layout 1 and Pop's layout-2
  plan card are turned, and a turned line's rects drift apart in `top`. `measure` sets every
  transformed ancestor upright while it counts lines, then restores them. Pop's layout-2 price
  went from 4 to 34. Pop's ±1° media cards (session 3) were read the old way, too strictly and
  never too loosely.
- **`twinsOf()` matches a sibling that holds the seed inside its own copy** (seeds of 3+
  characters). Layout 3's intro, *…covers the whole booking*, seated the Book pill's *Book*,
  and `rowCta` read 1 under Editorial and Retro.
- **A one-a-line list's count is a block** (`block` on the `#` probe of a `'\n'` column).
- **`seedsOf()` covers item and count columns and every design's rows** (judgement 2). The count
  probe's items are drawn from that pool and kept distinct, numbered past it. A chip row built
  by `repChips()` drops a repeat, so row 0's lone *Solo*, cycled, drew two chips at any count.
- **`KEY_SAMPLES`** overrides the prose for a key (`tiers.price`), and `--prose` turns it off.
  **`--designs=`** runs only the listed designs (0-based).

**Checks.**
- `--seeds` over every pricing key: 0 seeds over their caps.
- `--check` over every pricing key, with the samples and the lower-case one: 0 failures. The
  `who.*` row is included, so `IDENTITY_CHARS.pricing` is re-verified. 18 rows report `floor`,
  all of them judgement 7's. The first run failed `tags#` at layout 4 at 390 under the four
  Lime-tree templates, because judgement 2's wider pool adds *Private Event* and *Club Night*.
  Re-probed with that pool it reads 5, which is now written and passes.

**Real app.** Tested with chrome-devtools on the :5199 server: a Lime page laid out by header
layout 1 (Hero), the canvas at 1440.
- **Pricing at layout 1.** The panel showed heading 50, name 30, price 12, blurb 160, unit 13,
  Package button 14 and small print 67. Typing *Pick the night that suits your party and your
  guests best* stopped at 50 (`50 / 50`). Package 1's name, typed *The Midsummer Garden Party
  Package Deluxe*, stopped at 30 (`30 / 30`).
- **TiersField with caps on.** Each row kept its layout: the counter sits under the name, the
  price and tags pair splits evenly (94.5 px each), and the features read
  `longest 24 / 24 · 5 of 15`.
- **A tag.** Typing *, Sunset Rooftop Cocktail Hour Special* after *Private Event* stopped the
  new tag at 26 (`longest 26 / 26 · 2 of 4`). Pasting it whole (`insertText`) was refused, and
  the box kept *Private Event*.
- **The layout picker.** The thumbnails printed the heading in full at layout 1, as *…party and…*
  at layout 2 (42) and as *…suits your…* at layout 3 (37). The name printed in full at layouts 1
  and 3, as *…Party…* at layout 2 (28) and as *…Garden…* at layout 4 (23).
- **Pricing to layout 3.** The canvas printed `Pick the night that suits your…`. The box kept all
  50 characters (`maxLength` 37), and the counter read `50 / 37 · shortened on the page` in red.
- **Published tab** (through the dialog's *Open*). It printed the same clamped heading, the
  name in full, and the artist's name as `<title>`.
- **Back to layout 1.** The canvas printed the full heading, and the counter read `50 / 50`.
  Opening the tab again re-rendered it in full.

**Notes for later sessions.**
- **Repertoire (5).** `songs.tags` is a list column, and its chip row is `repChips()` too. The
  count probe now draws distinct items, so the reading is real. The repertoire's row carries
  `All`, so it holds one chip more than pricing's.
- **Any section whose seeds differ by design** (form's `FORM_FIELDS*`, session 10): `seedsOf()`
  already reads every design's rows, so the floor is the longest of them.
- **Calendar (7).** `KEY_SAMPLES` is keyed `tiers.price`. The slots' `price` column is a price
  too, and it gets prose unless session 7 gives it its own entry: judgement 1's call again.
- **Form (10).** The count-as-block rule covers the `#` probe of a repeater column's `'\n'` list
  only. The form's `promises` is a field-level `'\n'` list (`LISTS`), so it still takes the lines
  test. Session 10 decides whether it should.
- **For the sweep (12).** Judgements 1 (price samples), 5 (Editorial's Book pill fit) and 6
  (`rating`) are open for the user. The probe fixes above change how earlier sections measure,
  so the sweep's full `--check` is their first re-run.

## Session 5: the repertoire (2026-10-13)

**Scope.** These are the repertoire's own text keys: `heading`, the `songs` columns `title`,
`artist`, `length` and `tags` (item and count), and the `sets` columns `mood` and `length`. The
repertoire prints no header key, so it has no `IDENTITY_CHARS` row. The probe ran on a fresh Vite
at :5199. Its per-width readout is
[`char-limits/session-5-probe.md`](./char-limits/session-5-probe.md). The decisions are in
`notes/repertoire.md`, a new file, now in `CLAUDE.md`'s notes table.

**Rules.** These are session 1's calls, unchanged. `rules.mjs` gains one sized key,
`songs.tags[]`. Screenshots show the set cards' mood and length as a plain small-caps line under
the set's name, not pills, so `sets.*` is metadata. There are no blocks. The heading has no `d`:
its seed is *12 Songs* at layouts 1 and 2, *Curated sets* at 3 and *Repertoire* at 4.

**The caps written** (by layout 1, 2, 3, 4; `–` where the layout does not read the field; `f`
marks a cap at its floor that prose fails at some width).

| field | rule | Retro | Lime | Grunge | Editorial | Pop |
|---|---|---|---|---|---|---|
| `heading` | meta | 14 31 20 17 | 11 32 19 15 | 13 38 25 20 | 8f 21 12 10 | 11 25 17 10f |
| `songs.title` | meta | 17f 25 25 25 | 44 24 17 22 | 33 26 23 26 | 17 17f 17f 17f | 17f 17 17f 17f |
| `songs.artist` | meta | 32 25 – 41 | 73 25 – 37 | 74 25 – 42 | 35 25 – 18f | 18f 25 – 19 |
| `songs.length` | meta | – – 23 | – – 17 | – – 22 | – – 17 | – – 14 |
| `songs.tags` per chip | sized | 18 18 18 18 | same | same | same | same |
| `songs.tags` count | count | 4 4 3 3 | 4 4 3 3 | 4 4 3 3 | 3 4 3 3 | 4 4 3 3 |
| `sets.mood` | meta (joint) | – – 17 | – – 14 | – – 17 | – – 17 | – – 14 |
| `sets.length` | meta (joint) | – – 10 | – – 7 | – – 10 | – – 10 | – – 10 |

**Judgement calls.**
1. **A tag's cap is one number, 18, at every layout and template**, layout 4 included, which
   prints no tags. The sized rule gives max(2 × 9, 9 + 8) = 18 off *Birthdays*, under every
   measure (20–23 at layout 3, 43–61 at layouts 1 and 2). At layout 3 a tag is also the key of
   its set's details (`c.sets`, case-folded). A tag clamped by a layout or template switch would
   be another key, and the page would lose its mood and length. One number means a stored tag is
   never clamped.
2. **A tag count cannot bound the chip row.** The row, and layout 3's set cards, is the union of
   every song's tags, and the per-song count is the only lever. The first run read row 0's count
   with a *Kestrel* lead while the other rows kept *Weddings*, so every count drew one chip more
   than it named, and it read 2, the seed's own floor. The count probe now draws the seeded tags
   first (`UNION_COUNT` in `limits.mjs`), so it reads how many distinct chips the binding row holds:
   4 at layouts 1 and 2 at 390 (3 under Editorial at layout 1), and 3 at layout 3, where a fourth
   set card starts a second row. Counts 1–3 all draw the seed's three tags, so a reading under 3
   is 3. Layout 4 takes the tightest, 3. A page with more distinct tags than a row holds still
   wraps the row. That is the page's content, not one song's, and no cap reaches it. **This one is
   the user's to overrule.**
3. **The set line is one budget** (`repSetLine()`, a `nowrap` span that clips with no ellipsis).
   Mood and length were each read beside the other's seed, mood 16–22 and length 14–20. Both at
   those caps clipped the line mid-word at 768 (*KESTREL NIGHTS AND GOLDEN · KE*). The written caps
   are a joint split, bisected with both at their caps under all four samples (a scratchpad check,
   `joint.mjs`). The length takes up to 10 (*90 minutes*) and the mood the rest, never under its
   seed's 14 (*Easy listening*):
   - Retro, Grunge and Editorial: mood 17, length 10;
   - Pop: mood 14, length 10;
   - Lime: mood 14, length 7, because its 768 card is already full at the seed.

   Giving the mood more and the length less is the user's call.
4. **JP-104's two-line title at layout 3 is not in the caps.** The census holds layout 3's title
   to one line, and JP-104 (user call, 2026-10-06) wraps a long one to a second at 768 and 390,
   clamped by CSS. The seeded *Dancing Queen* already takes that second line under Pop and
   Editorial. The strict reading is written: Retro 25, Lime 17, Grunge 23, Editorial 17 and Pop 17.
   With one line more (`--extra-lines=songs.title`, the readout's second table) it is Retro 25,
   Lime 31, Grunge 41, Editorial 20 and Pop 19. **The user's to overrule.**
5. **The title and the artist share a row.** Each was read beside the other's seed. An artist at
   its cap (73–74 at Lime's and Grunge's layout 1) squeezes the title to *KESTREL …*. That is
   decision 6's ellipsis, which the seeds already show (Pop's 390 *SEPTEM…* beside *Earth, Wind &
   Fire*), so it is left as it is.
6. **Floors** (prose fails, the seed fits; `--check` reports `floor`):
   - the title holds *Don't Stop Me Now*'s 17 at seven designs (10–15 read): Retro's layout 1,
     Editorial's layouts 2–4 and Pop's 1, 3 and 4. The seeds already ellipsize or wrap there;
   - the artist holds *Earth, Wind & Fire*'s 18 at Pop's layout 1 and Editorial's layout 4, both
     at 390, where the seeds ellipsize the title beside them (Editorial's artist stops at 60%);
   - the heading holds *12 Songs*' 8 at Editorial's layout 1 at 768 (7 read: an eight-letter word
     outruns its column into the search box, session 2's word-bound heading) and *Repertoire*'s 10
     at Pop's layout 4 at 390 (9 read).
7. **The heading binds at layout 1** (8–14 at 768 and 390) more tightly than any earlier
   section's heading. A custom heading such as *Wedding favourites* (18) does not fit there.

**Probe fixes** (`scripts/limits.mjs`; they apply to every later section, and the sweep's full
`--check` re-runs earlier sections under them).
- **An enclosing box is a frame, not an overlap.** Editorial layout 2's chip capsule draws its
  dashed ring as an SVG after the chips. A new chip moved the ring's path, and `tags[]` read 1 on
  every width. An `others` box that encloses all of the seat's ink is now skipped.
- **The box test is tagged by kind**, `past` (ink over the box) or `cut` (the box clips its text).
  The set line's span is tracked −0.06em, so its ink overshoots its own box at the seed, and the
  seat counted as `self` on both sides. Its clip at 22 characters went unseen until the card's
  box failed, so `sets.mood` read 21–25 where the line clipped at 16–22. **Every earlier session
  measured under the old test.** A seat whose seed overshoots its own box was read too loosely,
  never too strictly. The sweep's `--check` is the place this shows.
- **`UNION_COUNT`** (judgement 2) and **`--extra-lines=<keys>`** (judgement 4).

**Checks.**
- `--seeds` over every repertoire key: 0 seeds over their caps.
- `--check` over every repertoire key, with the three samples and the lower-case one: 0 failures.
  The `who.*` rows are all `unseen`: the repertoire prints no header key. 11 rows report `floor`,
  all of them judgement 6's: the title (7), the artist (2) and the heading (2).
- The set line, checked jointly with both columns at their caps, every template and width, four
  samples each: 0 clips.

**Real app.** Tested with chrome-devtools on the :5199 server: a Lime page laid out by header
layout 2 (Feature spread), the canvas at 1440.
- **Repertoire at layout 2.** The panel showed heading 32, title 24 and artist 25, with the length
  uncapped (layout 2 does not print it). Song 1's title, typed *Midnight on the Northern Line
  Again*, stopped at `Midnight on the Northern` (`24 / 24`). The heading took *Wedding favourites
  and more* whole (`27 / 32`).
- **A tag.** Typing *, Sunset Rooftop Cocktail Hour* after *Weddings, Pubs* stopped the new tag at
  18 (`longest 18 / 18 · 3 of 4`). Pasting *Weddings, Sunset Rooftop Cocktail Hour* (`insertText`)
  was refused, and the box kept its list.
- **The layout picker.** The thumbnails printed `Wedding…` at layout 1 (11), the full heading at
  layout 2, `Wedding favourites…` and `Midnight on the…` at layout 3 (19, 17), and `Wedding
  favour…` at layout 4 (15).
- **Repertoire to layout 1.** The canvas printed `Wedding…`. The box kept all 27 characters
  (`maxLength` 11), and the counter read `27 / 11 · shortened on the page` in red.
- **Published tab** (through the dialog's *Open*). It printed `Wedding…`, and its `<title>` was
  the name.
- **Back to layout 2.** The canvas printed the full heading, and the counter read `27 / 32` in
  grey. Opening the tab again re-rendered it in full.
- **Layout 3** (a page laid out by Inset Hero). The panel showed the song length 17, mood 14 and
  set length 7. The Weddings mood, typed *Mellow and romantic first dances*, stopped at `Mellow and
  rom` (`14 / 14`), and the canvas line `Mellow and rom · 45 min` did not clip. Song 1's length,
  typed *3:54 with the long extended outro*, stopped at 17 (`17 / 17`) under its 64px box, the
  box's width unchanged (session 0's open item, closed).
- **Live alone, spot-checked in the published tab.** Layout 3's *View full set* revealed
  *September* and *Rather Be* in the Weddings card, and the link went. The typed length printed
  live. At layout 4, with song 1 retitled *99 Luftballons*, the A–Z rail led with a `#` cell and
  the list with a `#` group. A click on `S`, and then on `#`, scrolled that group to the top.

**Two fixes the real app found.**
- **`clampList` counted an item's trailing space** (`data.js`, session 0's mechanism). It kept an
  item's leading whitespace aside but not its trailing whitespace, while `capExcess`, the panel's
  guard and counter, trims both. So an item at exactly its cap with a space typed after it, the
  ordinary way to start the next tag, passed the panel but was clamped on the page:
  `Sunset Rooftop Coc ` printed as `Sunset Rooftop…` on the canvas and in every thumbnail. Both
  sides of the whitespace are now kept aside, so a list that fits rejoins byte for byte. This
  covers every list field (the header's tags, pricing's tags and features). `--seeds` over the
  header, bio, media, pricing and repertoire still reports 0.
- **A counter under one box stretched its neighbour.** In `SongsField`'s artist and length row,
  the uncapped artist box (layout 3) is a bare `Input` in a stretching flex row. It grew to 49px
  beside the length's counter. The row is top-aligned now, and so is `SetsField`'s.

**Notes for later sessions.**
- **Gallery (6).** The probe's two fixes this session (the enclosing frame and the kind-tagged
  box test) are in force, and earlier sections have not been re-measured under them; the sweep's
  full `--check` is that re-run. The gallery has no repeater text columns.
- **Every repeater session.** Where two columns share one line, measure them jointly (a scratchpad
  check like this session's `joint.mjs`). Each column read beside the other's seed overstates the
  pair. The map's gig rows (venue · city · time) and the calendar's slots (kind · price) are next.
- **For the sweep (12).** Judgements 2 (the tag count), 3 (the set line's split) and 4 (JP-104's
  second line) are open for the user. `clampList`'s fix changes nothing at a seed, but a stored
  list with a space after an item at its cap renders differently from before.

## Session 6: the gallery (2026-10-13)

**Scope.** These are the gallery's own text keys: `kicker` (`in: [0, 3]`), `heading`, `railLabel`
(`in: [0, 1]`), `backLabel` and `sourceLabel` (`in: [0]`). The three social addresses are urls
and are skipped. The gallery has no repeater, no list and no composed column. The probe ran on a
fresh Vite at :5199. Its per-width readout is
[`char-limits/session-6-probe.md`](./char-limits/session-6-probe.md), and the decisions are in
`notes/gallery.md`.

**Rules.** These are session 1's calls, unchanged. `rules.mjs` gains one sized key,
`gallery.backLabel` (judgement 1). There are no blocks. Everything else is metadata. Layout 2's
heading is the caption pill's first line. Sized or not, it takes the measure, because the sized
rule's 32 is above the 26–27 read.

**The caps written** (by layout 1, 2, 3, 4; `–` where the layout does not read the field; `f`
marks a cap at its floor that prose fails at some width).

| field | rule | Retro | Lime | Grunge | Editorial | Pop |
|---|---|---|---|---|---|---|
| `kicker` | meta | 44 – – 49 | 55 – – 51 | 55 – – 51 | 55 – – 51 | 44 – – 39 |
| `heading` | meta | 20 27 18 24 | 19 26 18 23 | 29 26 23 24 | 16f 26 11 20f | 16f 27 15 20 |
| `railLabel` | meta | 49 70 | 55 64 | 55 70 | 32 70 | 49 70 |
| `backLabel` | sized | 34 | 34 | 34 | 34 | 34 |
| `sourceLabel` | meta | 42 | 49 | 58 | 37 | 50 |
| `IDENTITY_CHARS.gallery.title` | (session 1) | 80 27 | 106 26 | 106 26 | 106 26 | 80 27 |

**Judgement calls.**
1. **The back link is sized: 34.** It is a text link, not a pill, but it is a control and reads
   its seed again when emptied. Session 2 put the bio's Listen link, which is drawn the same way
   (`ListenLink`, a `nowrap` uppercase text link), in SIZED. So it takes
   max(2 × 17, 17 + 8) = 34. It measured 48–52 at 390. **This one is the user's to overrule.**
2. **Two caps are width-gated, which `in` cannot say.** `railLabel` at layout 2 prints at 768
   alone (64–70). At layout 1 it is the credit line at every width (49–55, Editorial's 32).
   `sourceLabel` prints at desktop alone (37–58), because the narrow rows are icon-only tiles.
   Their other surfaces are `unseen`.
3. **Retro's `sourceLabel` is desktop's 42**, though the probe's own column reads 1. Its seed
   *Gallery* is also Retro's rail wordmark, a literal, which the seed's render seats at 768 and
   390, where the row prints no label. `rules.mjs` already dropped those surfaces. `--check`
   failed them until the probe learnt to tell a literal's seat from the field's (*Probe fixes*).
4. **Editorial's layout-1 credit is 32** (49–55 elsewhere). At 390 the credit wraps under the back
   link and then meets the tilted tape over the viewer. **Pop's layout-4 kicker is 39** (51 on
   the twins). At 1440, a 40th character's line runs into the smiley sun's spike (screenshot).
5. **The heading's floors** (`--check` reports `floor`):
   - Editorial's and Pop's layout 1 hold *See us in action*'s 16, measured at 14 and 10. That is
     line packing (*KESTREL NIGHTS* cannot share a line, media's judgement 2), and Pop's
     one-line head also meets the asterisk at 11.
   - Editorial's layout 4 holds *Snaps from the night*'s 20, measured at 6. That head is fitted to
     its widest word, so the first seven-letter word shrinks it, to 90% at 1440. A shrink floor
     for that fit, like the name's 75% (`FLOOR`), is the user's call. Session 4's judgement 5
     (Editorial's Book pill) is the same shape.
   - Editorial's layout 3 is 11 (seed 7): one line that fills its taupe band.
6. **`IDENTITY_CHARS.gallery.title` at layout 2 drops from 28–29 to 26–27.** `--check` failed
   session 1's numbers at 390. Layout 2's caption line ellipsizes past 26–27, and session 1's
   box test, which did not yet tell a clip from an overshoot (session 5), missed it.
   `EncoreSection` has not changed since session 1. A name of wide capitals
   (*Wolstenholme-Baxter*, *Featherstonehaugh*) ellipsizes there sooner, at 26. That is the
   prose method's limit, and decision 6's ellipsis is the fallback the caption already has. It
   is a consumer seat, so it only clamps its own copy.

**Joint checks** (a scratchpad script, `joint6.mjs`; every template and width, four samples).
- **Layout 1's head row** holds the back link (34), the name (the template's widest header cap,
  up to Retro's 31) and the credit (`railLabel` at its cap). Every value is at its cap at once,
  with lines, page scroll and painted hits compared with the seed's render. 0 failures. At 390
  the row wraps as JP-113 designed it: the back link keeps its line and the credit drops under
  it, clear of Editorial's tape.
- **Layout 2's caption pill** holds the heading at its cap over the name at its cap. The only
  failures are judgement 6's wide-capital names, which ellipsize without the heading too.

**Probe fixes** (`scripts/limits.mjs`; they apply to every later section, and the sweep's full
`--check` re-runs earlier sections under them).
- **A drawing or a turned picture is met by its painted pixels, not its box** (`paints`). The
  overlap test met Pop's layout-4 sun and Editorial's tilted tape by their turned squares'
  bounding boxes, where neither has ink. So an SVG or a turned picture's box hit is confirmed by
  a 6 × 6 grid of `elementsFromPoint` tests in the meet of the two boxes. Pointer events are
  switched on for the test and restored, a point is scrolled into view first, and an SVG root
  counts only through its shapes. The first run read Pop's layout-4 kicker at 33 and heading at 9,
  and Editorial's credit at 13. They read 39, 20 and 32 under the fix. Pop's layout-1 heading,
  where the asterisk really meets the head, still reads 10, which is the positive control. This
  fix only loosens false overlaps. Its scroll was checked: the preview's document is the
  scroller (1439–1446 tall at 390 under testimonials layout 3 and pricing layout 1), and a point
  1000px down is hit-testable after `scrollTo`, so a seat below the probe's 900px viewport is
  tested, not dismissed.
- **A seed a literal prints too is unseen where the field does not print.** Where the value at
  the seed's length has no seat but the seed's render had one, the reference seated a literal
  (Retro's wordmark), and the surface is `unseen` (judgement 3).

**Checks.**
- `--seeds` over every gallery key: 0 seeds over their caps.
- `--check` over every gallery key, with the three samples and the lower-case one: 0 failures
  in 170 rows. The `who.*` rows are included, so `IDENTITY_CHARS.gallery` is re-verified, with its
  `kicker`, `location` and `tags` rows `unseen`, because the gallery prints none of them. 3 rows
  report `floor`, all of them judgement 5's: the heading at Editorial's and Pop's layout 1 and at
  Editorial's layout 4. The first run failed 6. Five were judgement 6's `who.title`, and one was
  judgement 3's Retro `sourceLabel` at 768 and 390.

**Real app.** Tested with chrome-devtools on the :5199 server: an Editorial page laid out by
header layout 2 (Feature spread), the canvas at 1440.
- **Gallery at layout 2.** The panel showed Heading 26 and Gallery label 70. Typing *Snapshots from
  a summer of weddings* stopped at `Snapshots from a summer of` (`26 / 26`).
- **The layout picker.** The thumbnails printed `Snapshots from…` at layout 1 (16), the full
  heading at layout 2, `Snapshots…` at layout 3 (11) and `Snapshots from a…` at layout 4 (20).
- **Gallery to layout 3.** The canvas printed `Snapshots…`. The box kept all 26 characters
  (`maxLength` 11), and the counter read `26 / 11 · shortened on the page` in red. The published
  tab (through the dialog's *Open*) printed `Snapshots…`, and its `<title>` was the name.
- **Back to layout 2.** The canvas printed the full heading, and the counter read `26 / 26` in
  grey. Opening the tab again re-rendered it in full.
- **Layout 1.** The panel showed Kicker 55, Heading 16 (red, shortened), Gallery label 32, Back
  link 34 and Gallery row label 37. *Back to the very first photograph of the night* stopped at 34
  (`34 / 34`), and *Photographs by Harriet Lowe at the Midland Hotel* stopped at 32 (`32 / 32`).
  At 390 the head row wrapped, the credit under the back link and clear of the tape.
- **Live alone, spot-checked.** In the published tab at layout 1, the next arrow stepped the
  counter `01 — 07` to `02 — 07`, a thumbnail click moved it to `01 — 07`, and the typed back link
  rewound it. At layout 3, a tile opened the fullscreen viewer, which took focus and locked the
  page (`overflow: hidden`), and Escape closed it and unlocked the page. Layout 1's 390 source row
  (the harness with `&live=1`, every template, three addresses set) scrolls sideways when live
  (`overflow-x: auto`, 10–68px of run-off) and is `clip` on the canvas.

**Notes for later sessions.**
- **Calendar (7).** The slots' kind and price share a line, so measure them jointly. Decide
  whether the slot price takes `KEY_SAMPLES`' digit-led samples, as `tiers.price` does (session 4,
  judgement 1).
- **For the sweep (12).** Judgements 1 (the back link sized) and 5 (Editorial's layout-4 heading
  fit) are open for the user. Judgement 6 shows that every earlier `IDENTITY_CHARS` row was
  measured under the old box test. The sweep's full `--check` re-runs them, and this session's
  `paints` fix only loosens.

## Session 7: the booking calendar (2026-10-13)

**Scope.** These are the calendar's own text keys: `heading`, `time` (`in: [0, 3]`), `prompt`,
`cta`, `dateLabel`, `availLabel` and `slotCta` (`in: [1]`), the `slots` columns `kind` and
`price` (`in: [1]`), and `types` (`in: [3]`, a ',' list: item and count). `image`, `open` (a
date), `booked` and `email` are skipped. `IDENTITY_CHARS.calendar` is session 1's, re-verified by
`--check` (judgement 6). Layout 3 stands the calendar in the composed desktop column
(`&column=right`), the first section since the media to have one. The probe ran on a fresh Vite at
:5199. Its per-width readout is
[`char-limits/session-7-probe.md`](./char-limits/session-7-probe.md), and the decisions are in
`notes/calendar.md`.

**Rules.** These are session 1's calls, unchanged. `rules.mjs` gains three sized keys: `cta`
(Retro's layout-1 pill and layout 4's Send Enquiry), `slotCta` (layout 2's Start Enquiry pill)
and `types[]` (the wizard's event-type chips). There are no blocks: `types` is `type: 'area'`
but a ',' list, so it takes item and count caps. `prompt` is metadata. It is a pill's label at
layout 3 and a line at layouts 1, 2 and 4, and the layout-3 measure binds on its own.
Everything else is metadata.

**The caps written** (by layout 1, 2, 3, 4; `–` where the layout does not read the field). None
reports `floor` under `--check`; the `types` count is the seed's own 4, and four prose items pass
(judgement 4).

| field | rule | Retro | Lime | Grunge | Editorial | Pop |
|---|---|---|---|---|---|---|
| `heading` | meta | – 25 36 18 | 25 22 32 18 | 28 24 35 23 | 14 14 21 11 | 13 20 24 15 |
| `time` | meta | 33 – – 34 | 13 – – 32 | 13 – – 37 | 13 – – 33 | 28 – – 33 |
| `prompt` | meta | 33 24 39 50 | 44 23 33 47 | 44 24 36 50 | 44 29 24 50 | 31 32 24 50 |
| `cta` | sized | 24 – – 24 | – – – 24 | same | same | same |
| `slotCta` | sized | – 26 | – 26 | – 26 | – 25 | – 26 |
| `dateLabel` | meta (joint) | – 16 | same | same | same | same |
| `availLabel` | meta (joint) | – 33 | – 38 | – 38 | – 38 | – 38 |
| `slots.kind` | meta (row) | – 33 | – 36 | – 40 | – 33 | – 36 |
| `slots.price` | meta | – 36 | – 40 | – 43 | – 36 | – 40 |
| `types` per chip | sized | – – – 13 | same | same | same | same |
| `types` count | count | – – – 4 | same | same | same | same |
| `IDENTITY_CHARS.calendar.location` | (session 1) | **19** – – 67 | – – – 64 | – – – 55 | – – – 67 | – – – 67 |

**Judgement calls.**
1. **The slot price takes prose, not `KEY_SAMPLES`' digit-led samples** (decided before the
   probe). Both bodies set `sl.price` whole, in a `bodySm` `nowrap` span, with no `priceParts()`
   split. So a long price grows in the body face like any other line, and prose measures it.
   Session 4's judgement 1 is about pricing's split numeral and does not reach here.
2. **A slot's kind is capped by its row, not by the foot line.** The kind is printed twice: in
   its row, over the price, and in the foot's composed line (*Thursday evening selected*), since
   `open` cues slot one. The first run read the foot: 12–13 under Retro, Lime and Grunge, 16
   under Pop and 20 under Editorial, all at 390, where *Thursday kestrel nights selected* takes
   a fourth line beside the chip. That line is composed copy whose spill is already designed
   (`notes/calendar.md`): the Lime tree's line wraps, and drops under the chip when its widest
   word cannot stand beside it; Retro's ellipsizes at 1440 and 768. That is decision 6's
   fallback, session 5's judgement 5 shape. So the probe reads the kind in its row alone
   (`KEY_CJ` books the cued day, and the foot prints the prompt instead): 33–40, at 390. Checked
   in screenshots at 33 (*Ceremony, drinks and evening part*): the row's right column holds it on
   one line, the Lime-tree foot wraps it to five lines at 390, and Retro's 1440 foot runs it on
   one line. **This one is the user's to overrule.** The foot-bound numbers are the readout's
   second table.
3. **`dateLabel` and `availLabel` are a joint split.** The two share the slot list's head row,
   each `overflowWrap: anywhere`. Each was read beside the other's seed: Date 41–45 and
   Availability 41–52. Both at those caps took two lines each at 768 and 390 on every template (a
   scratchpad check, `joint7.mjs`; 40 of 120 renders failed). Bisected jointly at 768 and 390
   under all four samples (1440 passed at the solo caps): with Date at 16, Availability holds 33
   under Retro and 38 under the rest; with Date at 20, 29 and 33. Written: Date 16 (four times
   *Date*), Availability 33 / 38. The joint check passes with both at their caps: 0 failures in
   120 renders. Giving Date more and Availability less is the user's call.
4. **The event types are 13 a chip and 4 in all.** At 390 the wizard sets its chips in a
   two-column grid of fixed cells, and a 14-character type wraps its chip. The sized rule's 18 is
   above that, so the chip takes the measure. The count is the seed's 4, because the grid is two
   rows of two, and a fifth type starts a third row (lines 3 > 2 at every width). With one row
   more (`--extra-lines=types#`) it reads 6. The wizard card hugs its rows, so a third row
   pushes nothing, but it is not the frame's. **This one is the user's to overrule.**
5. **Layout 1's enquiry time is 13 under Lime, Grunge and Editorial.** The foot's *Enquiry for
   Thursday, June 12 at 9:00pm* is one line in their frames, the link that replaces the pill
   (JP-088), and at 390 a wider 14-character time takes a second line. *9pm till late* fits.
   Retro's foot reads 33 and Pop's 28.
6. **`IDENTITY_CHARS.calendar.location` at Retro's layout 1 drops from 22 to 19.** `--check`
   failed session 1's 22 at all three widths, and the re-probe reads 19 (overlap). The stamp sits
   on the front polaroid's foot, and at 22 the screenshot is clean. Its new overlaps are the
   photographs of the two polaroids behind, which the front card covers. `paints` (session 6)
   hit-tests with `elementsFromPoint`, which returns covered elements too. At the seed, the short
   stamp's meet box missed those photographs' ink, so they were not in the reference, and a
   longer stamp's met them. Session 6 said the fix "only loosens". It loosens the reference too,
   and here that tightened the reading. The prompt's rule is to lower a failing `who.*` row and
   never loosen the check, so it is 19 (seed 14). **For the sweep (12):** `paints` should ignore
   an element covered by the seat's own card; then this stamp can go back to its clean 22.
7. **`kind` and `price` are stacked, not side by side.** They are one `flex: none` column, each
   `nowrap` and right-aligned, so the column is as wide as the wider of the two, and each read
   beside the other's seed already is the joint reading. The joint check sets both at their caps
   in row 0 against the mark and weekday: 0 failures.
8. **The sized seats.** `cta` is max(2 × 12, 12 + 8) = 24 at both layouts, under every measure
   (27–53; Editorial's and Lime's layout 4 scroll the 390 page at 28 and 47). `slotCta` is 26,
   and Editorial's measure of 25 binds: its Gloock pill clips there. At 25 it stays one line and
   drops under the chip and line, which `notes/calendar.md` describes as the designed wrap.

**Probe fixes** (`scripts/limits.mjs`; they apply to every later section, and the sweep's full
`--check` re-runs earlier sections under them).
- **A seat is compared with the reference's seat at its own path first** (`verdict`), and by
  index only when no path matches. Layout 2's head link list prints the section's own nav label,
  *● Availability*, a literal that is also the heading's and `availLabel`'s seed. The seed's
  render seated the link and the h2, the value's render the h2 alone, and by index the h2 met the
  link's box. The heading read 1 (`box`) on every template and `availLabel` 1 on the four
  Lime-tree templates; they read 14–25 and 41–52 under the fix. The ring test already matched by
  path.
- **`KEY_CJ`**: content a key needs before it prints. The prompt shows only while no day is cued,
  so it is staged on `booked: [CAL_OPEN]`, `reach.mjs`'s staging, and `slots.kind` takes the
  same staging under judgement 2.

**Checks.**
- `--seeds` over every calendar key: 0 seeds over their caps.
- `--check` over every calendar key, with the three samples and the lower-case one: 0 failures
  and 0 floors in 210 rows. The `who.*` rows are included, so `IDENTITY_CHARS.calendar` is
  re-verified: the title at layout 2 (64), the location at layouts 1 and 4, and Retro's layout-1
  seal (19). The `kicker` and `tags` rows are `unseen`. The first run failed 1 row, judgement 6's
  location.
- The joint check (`joint7.mjs`, every template and width, four samples): the head row and the
  slot row, each pair at its caps, 0 failures in 120 renders.

**Real app.** Tested with chrome-devtools on the :5199 server: a Lime page laid out by header
layout 2 (Feature spread), the canvas at 1440.
- **Calendar at layout 2.** The panel showed Heading 22, Prompt 23 (its counter already at
  `22 / 23`, past 80%), each slot's kind 36 and price 40, Date 16, Availability 38 and Start
  Enquiry 26. *Date of the evening gig* stopped at `Date of the even` (`16 / 16`), and the
  canvas head printed `Date of the even ↓`. *Open dates this summer, book now* stopped at `Open
  dates this summer` (`22 / 22`).
- **The layout picker.** The thumbnails printed the full heading at layouts 1–3 and 5, and `Open
  dates this…` at layout 4 (18).
- **Calendar to layout 4.** The canvas printed `Open dates this…`. The box kept all 22 characters
  (`maxLength` 18), and the counter read `22 / 18 · shortened on the page` in red. The panel
  showed Enquiry time 32, Prompt 47 and Button 24.
- **The event types** (a `type: 'area'` list, the first capped). The box has no `maxLength`; the
  list guard holds it. Its counter read `longest 9 / 13 · 4 of 4`. Typing *, Private party night*
  after the four seeds was refused at its first letter (the comma and spaces went in, an empty
  item not counting). Retyping *Festival* as *Festival weekender* stopped at `Festival week`
  (`longest 13 / 13 · 4 of 4`), and the canvas chip printed it.
- **Published tab** (through the dialog's *Open*). It printed `Open dates this…` and the chip
  `Festival week`, and its `<title>` was the name.
- **Live alone, spot-checked in the published tab.** At layout 4, a click on *Birthday* moved the
  summary card's head line to `Birthday`; *Package ›* stepped the package from *The Wedding Set*
  to *The Festival Set*; *Next Step* opened `Step 2 of 3` with its four boxes live. At layout 1
  (republished), the heading printed in full (25); the month opened on today's, *October 2026*,
  since `open` has passed; the foot read the prompt as a span; a click on the 20th made it the
  link *Enquiry for Tuesday, October 20 at 9:00pm* (`#form`, JP-088's line-as-link); and the
  arrows stepped to *November 2026* and back.
- **Back to layout 2.** The canvas printed the full heading, and the counter read `22 / 22` in
  grey.
- **`SlotsField` with a counter showing** (session 0's open item, for this repeater). Slot 1's
  kind, typed *Ceremony, drinks and evening party*, took all 34 (`34 / 36`), and the kind and
  price boxes stayed level (both 31px tall, at one top) under the row's date box.

**Notes for later sessions.**
- **Map (8).** The gig rows' venue · city · time share a line: measure them jointly
  (`joint7.mjs`'s head-row split, bisected per template). Its layout-2 travel card's labels and
  values (session 1's `IDENTITY_CHARS.map.location` is there too) and layout 4's ticker are next.
  `seedRows` gives `D.GIGS`, so look at every seeded gig before the floors.
- **Every later session.** `verdict` now matches a seat to its reference by path first, so a
  literal printing the seed no longer misaligns the comparison. `KEY_CJ` stages content a key
  needs before it prints.
- **For the sweep (12).** Judgements 2 (the slot kind's row vs foot), 3 (the head row's split),
  4 (the types count) and 6 (`paints` and covered ink; the stamp's 22) are open for the user.
  The path-first match changes how earlier sections compare their seats, so the full `--check`
  re-runs them under it.

## Session 8: the events map (2026-10-13)

**Scope.** These are the map's own text keys, the list built from `FIELDS.map`:
- `kicker`, `listLabel`, `heading`, `radius`, `base`, `terms`, `travelTime` and `fee`;
- layout 2's travel card: `homeLabel`, `homeCaption`, `venueLabel`, `venueCaption`,
  `radiusLabel`, `travelTimeLabel`, `feeLabel`, `venueCta` and `routeCta`;
- layout 3's `cta` (*See all gigs*), the panel's `status`, `updated`, `rings` (item and count)
  and `expand`, and layout 4's `span`;
- the `gigs` columns `venue`, `city`, `time`, `month` and `day`, and layout 4's `stats` columns
  `label`, `value` and `sub`.

`year` and `link` are not text seats. `IDENTITY_CHARS.map` (session 1's layout-2 *Based in*) was
re-verified by `--check` and passes. The probe ran on a fresh Vite at :5199. Its per-width
readout is [`char-limits/session-8-probe.md`](./char-limits/session-8-probe.md), and the decisions
are in `notes/map.md`.

**Rules.** These are session 1's calls, unchanged. `rules.mjs` gains six sized keys, each
screenshotted first: the pills `venueCta`, `routeCta` and `cta`, the `status` chip (the panel's
tab, and layout 2's chip on every gig row), the `expand` text link (session 6's back-link
precedent) and the ring labels, `rings[]`, which are filled chips on the rings. There are no
blocks. Everything else is metadata.

**The caps written** (by layout 1, 2, 3, 4; `–` where the layout does not read the field; `f`
marks a cap at its floor that prose fails at some width).

| field | rule | Retro | Lime | Grunge | Editorial | Pop |
|---|---|---|---|---|---|---|
| `kicker` | meta | 44 30 58 | 67 26 53 | 67 30 58 | 67 30 58 | 44 30 58 |
| `listLabel` | meta | 37 54 | 40 50 | 41 54 | 46 54 | 31 54 |
| `heading` | meta | 20 20 39 25 | 19 17 34 24 | 16 20 37 25 | 11 19 22 22f | 17 21 25 23 |
| `radius` | meta | 26 11 25 | 51 13 20 | 44 13 26 | 14 13 26 | 29 13 26 |
| `base` | meta | 29 – 33 | 35 – 27 | 39 – 33 | 24 – 33 | 24 – 33 |
| `terms` | meta | 59 50 | 58 41 | 58 51 | 58 51 | 45 51 |
| `travelTime`, `fee` | meta | – 11 | – 13 | – 13 | – 13 | – 13 |
| `homeLabel`, `homeCaption`, `venueCaption` | meta | – 18 | – 16 | – 18 | – 18 | – 18 |
| `venueLabel` | meta | – 20f | – 20 | – 20f | – 20f | – 20f |
| `radiusLabel`, `travelTimeLabel`, `feeLabel` | meta | – 14 | – 15 | – 17 | – 17 | – 17 |
| `venueCta` | sized | – 11 | – 10 | – 10 | – 19 | – 20 |
| `routeCta` | sized | – 22 | – 17 | – 19 | – 24 | – 28 |
| `cta` | sized | – – 24 | same | same | same | same |
| `status` | sized | – 18 20 | – 13 20 | – 18 20 | – 10f 20 | – 10f 20 |
| `updated` | meta | – 35 34 | – 31 31 | – 35 34 | – 35 34 | – 35 34 |
| `rings` per chip / count | sized / count | – 13 13 13 / 3 | same | same | same | same |
| `expand` | sized | – 22 22 | same | same | same | same |
| `span` | meta | – – – 58 | same | same | same | same |
| `gigs.venue` | meta | 34 21 41 36 | 32 18 37 40 | 36 20 41 40 | 19 18f 25 40 | 18f 18f 28 40 |
| `gigs.city` | meta (joint) | 22 14 20 13 | 20 13 20 13 | 20 13 20 13 | 29 13 23 13 | 13 13 20 13 |
| `gigs.time` | meta (joint) | 13 5 13 10 | 13 5 13 13 | 13 5 13 13 | 13 5 13 13 | 8 5 13 13 |
| `gigs.month` | meta (joint at 2, 4) | 7 4 11 9 | 5 3 12 9 | 5 5 12 9 | 5 5 12 9 | 9 5 12 9 |
| `gigs.day` | meta (joint at 2, 4) | 5 5 5 5 | 6 3 5 5 | 6 3 5 5 | 6 3 5 5 | 6 3 5 5 |
| `stats.label` | meta | – – – 19 | same | same | same | same |
| `stats.value` | meta | – – – 14f | same | same | same | same |
| `stats.sub` | meta | – – – 20 | same | same | same | same |

**Judgement calls.**
1. **The key list is `FIELDS.map`'s, not the handoff's.** The handoff named the travel card, the
   pills, the gigs and the stats. The grep adds eleven keys: `radius`, `base`, `terms`,
   `travelTime`, `fee`, `cta`, `status`, `updated`, `rings`, `expand` and `span`. All eleven are
   probed and capped. **`rings`' count is 3 and was not probed:** every map slices the labels to
   its three rings (`s.mapRings.slice(0, ringW.length)`), and the hint says "up to three". The
   field gains `list: ','`, so the panel's list guard holds the items and the count.
2. **A gig's city, time, month and day share one line, so they are a joint split.**
   - **Where they meet.** City and time share the meta line at layouts 1 and 3. At layout 2 the
     list line is *city · MONTH · time*, and the featured gig's when-chip is *Jul 12 · 22:00*.
     Layout 4's ticker is *city · MON DD · time*. At layouts 1 and 3 the month and day sit in the
     stamp or the disc, apart from the line.
   - **The solo readings fail together.** Each column was first read beside the others' seeds.
     All of them at those caps failed 137 of 240 joint renders (`joint8.mjs` in the scratchpad):
     the lines wrap at layout 3 and clip or ellipsize at 1, 2 and 4.
   - **The rule** (`split8.mjs`, every template, design and width, four samples):
     - the date parts take a date's width: the month up to 9 (*September*), the day up to 5;
     - the time takes up to 13 (*9pm till late*);
     - the city takes the rest, never under its floor of 13 (*Lake District*);
     - where the city at its floor still fails, the time gives way, then the month, then the day.
   - **The result.** Layouts 1 and 3 hold a 20–29-character city beside a 13-character time; Pop's
     layout 1 holds 13 beside 8. Layout 4 holds 13 beside 13 (Retro 10).
   - **Layout 2 is the tight one.** Its list row's meta line at 768 is already full at the seeds
     (*Manchester · JUL · 21:00*). It holds the city at 13–14, the time at 5 (*22:00*, its floor:
     *9pm* fits and *9pm till late* does not), the month at 3–5 and the day at 3–5.
   - **Checked.** The joint check passes with every column at its written cap: 0 failures in 240
     renders.
   - **The user's to overrule.** The line ellipsizes by design (decision 6, session 5's judgement
     5 shape), so the solo caps would trade layout 2's room for an ellipsis there. Those are the
     readout's numbers.
   - **What the clamp prints there** (the real app, Lime). A *September* and a *28th*, typed at
     layout 3 and moved to layout 2 (month and day caps 3), print `Manchester · SE… · 21:00` on the
     list line and `28…` in the day chip. Both counters read red, `9 / 3` and `4 / 3 · shortened
     on the page`, and each wraps to three lines under its narrow box. That is cosmetic, and
     the boxes stay level.
3. **The month and day take `KEY_SAMPLES`, decided before the probe** (session 7's judgement 1
   shape). Both are date parts in fixed stamps and discs. The month is free text matched by its
   first three letters (`gigStamp`), so it is read as month names. The day is read as digit-led
   dates (*28th–30th*). A two-character prose needle would also seat *12 mile radius* and *120*.
   - The month stamp at layout 1 holds 5 under Lime, Grunge and Editorial: *SEPT* fits and
     *SEPTEMBER* does not. Retro's holds 7 and Pop's 9. Layout 3's disc holds 11–12.
   - A day cap over 2 is fit, not validation. `gigStamp` reads 1–2 digits, so a *28th* prints
     but has no weekday or Upcoming / Past pill, and `GigsField` already warns about that at
     layout 3.
4. **The stat value is held to one line, and 14 is its floor.** Row 0's *120* is one line in the
   frame. Prose reads 9–13 before a second line: the census holds the box to one, and lines
   bind, not JP-110's floorless fit, which never reached a shrink. The seeded fourth card,
   *Manchester, UK* (14), already takes two lines at 390, so the cap is the floor. `--check`
   reports `floor`. **The user's to overrule:** with one line more
   (`--extra-lines=stats.value`, the readout's second table) it reads Retro 22, Lime 20,
   Grunge 22, Editorial 15, Pop 17.
5. **Venue Link is at its seed (10–11) under Retro, Lime and Grunge.** At 768 the pill wraps any
   label longer than its seed (`vm.mapVenueCtaWraps`, the designed wrap of `notes/map.md`). So the
   11th character takes a second line, and the sized rule's 20 is not reachable. Editorial and Pop
   take 19 and 20.
6. **Floors** (prose fails, the seed fits; `--check` reports `floor`, 15 rows):
   - the venue holds *The Deaf Institute*'s 18 at Pop's layouts 1 and 2 and Editorial's layout 2
     (17 read at 390);
   - the heading holds *Distances we’ll Travel*'s 22 at Editorial's layout 4 (20 read);
   - the stat value is 14 (judgement 4);
   - ~~the `status` chip holds *In transit*'s 10 at Editorial's and Pop's layout 2 (9 read)~~ — moot since 2026-10-14: layout 2 no longer draws `status`;
   - *Willing to travel to*'s 20 is the floor of `venueLabel` at 768 on four templates. That seed
     already takes two lines there under Lime (`notes/map.md`), and prose reads 18.

**Probe fixes** (`scripts/limits.mjs`; they apply to every later section, and the sweep's full
`--check` re-runs earlier sections under them).
- **`rowsAt`.** At map layout 2 a gig column's value is written into rows 0 and 1. The panel
  features the page's first gig and the list is the page minus it, so row 0 never reached a list
  row: the first check seated *Kestrel nights* in the panel's h3 alone.
- **The confirm step does not test lengths under the seed's.** It tested `lo − 1` and `lo − 2`,
  and at a two-character seed that is one character. The needle *2* seats unrelated, smaller
  text, so it read `shrink`, and the day at layout 2 stepped down from 3 to 2. A length under
  the seed's is never a cap. Twelve keys were re-probed under the fix, and only that day moved.
  **For the sweep (12):** a seed of 3 or fewer characters measured before this fix can have been
  under-read the same way (the bio's `since` at 9 is not one).
- **`KEY_SAMPLES`** for `gigs.month` and `gigs.day` (judgement 3), and **`--no-floor=<keys>`**,
  which lets a key's fitted seat shrink without bound. It was written for the stat value and
  turned out not to be needed (judgement 4).

**Checks.**
- `--seeds` over every map key: 0 seeds over their caps.
- `--check` over every map key, with the three samples and the lower-case one: 0 failures in
  440 rows. The `who.*` rows are included: `IDENTITY_CHARS.map.location` at layout 2 (15–18)
  passes on every template, and the `kicker`, `tags`, `title` and `seal` rows are `unseen`. 15
  rows report `floor`, all of them judgement 6's.
- The joint check (`joint8.mjs`): every gig column at its cap, rows 0 and 1 at layout 2, every
  template, design and width, four samples. 0 failures in 240 renders.

**Real app.** Tested with chrome-devtools on the :5199 server: a Lime page laid out by header
layout 3 (Inset Hero), the canvas at 1440.
- **Map at layout 3.** The panel showed venue 37, city 20, time 13, month 12, day 5, Kicker 53,
  Heading 34, Coverage 20, Based in 27, See all gigs 24, Map tag 20, Map note 31 and Map link 22.
  The ring labels have no `maxLength`, since the list guard holds them, and read
  `5 / 13 · 3 of 3`.
- **Typing.**
  - *Where the summer weddings take me next* stopped at 34 (`34 / 34`).
  - Map link showed no counter at 17 characters (80% of 22 is 17.6). *Open the full map view of
    every gig* stopped at `Open the full map view` (`22 / 22`).
- **The layout picker.** The thumbnails printed `Where the summer…` at layouts 1, 2 and 4 (19, 17,
  24), and the full heading at layout 3.
- **Map to layout 2.** The canvas printed `Where the summer…`. The box kept all 34 characters
  (`maxLength` 17), and the counter read `34 / 17 · shortened on the page` in red. The published
  tab (through the dialog's *Open*) printed `Where the summer…`, and its `<title>` was the name.
- **`GigsField`'s `pair()` rows with counters showing** (session 0's open item, for this
  repeater). Row 2's city, typed *Wolverhampton Wanderers*, stopped at `Wolverhampton`
  (`13 / 13`), and the canvas line read `Wolverhampton · JUL · 21:00`. The city and time boxes
  stayed level. **The month · day · year row did not.** At layout 2 the month's counter is always
  showing (*Jul* is 3 / 3), and the uncapped year box stretched to 52px beside it. That is session
  5's `SongsField` defect, and the same fix applies: `pair()` is top-aligned now, and the three
  boxes stand at 31px on one top.
- **Back to layout 3**, republished. The published tab printed the full heading.
- **Live alone, spot-checked in the published tab**, with a sixth gig added (*Band on the Wall*,
  Leeds, Sep 06 2026):
  - Layout 2: a row click featured its gig in the panel (*Private wedding*), and `+` zoomed the
    map from `scale(1)` to `scale(1.25)`.
  - Layout 3: page 1 listed five rows, each with *Upcoming*. *See all gigs* listed all six, the
    sixth with *Past* (its date is before today). The chips were *All · Manchester · 4 · Lake
    District · 1 · Leeds · 1*, and *Leeds* filtered the list to that gig, which the panel then
    featured.
  - Layout 1: the head printed `Where the summer…` (19). The pager showed pages 1 and 2, with the
    sixth gig alone on page 2. A row click lit *Mint Lounge* and its pin (an ink disc in a lime
    ring, screenshotted), and a second click put both back.

**Notes for later sessions.**
- **Testimonials (9).** The quotes' who · role · when share a byline: measure them jointly, with
  `joint8.mjs`'s shape (every column at its cap, every seat compared by path). Check whether a
  layout's seat is fed by a row other than row 0, as map layout 2's list is (`rowsAt`). Layout
  2's tile rail prints initials (*HL*, *AO*, …), which look derived from `who`; check before
  probing them as a seat.
- **For the sweep (12).** Judgements 2 (layout 2's meta line), 4 (the stat value's line) and 5
  (Venue Link's wrap) are open for the user. The confirm-step fix can raise a short seed's earlier
  cap, never lower it.

## Session 9: the testimonials (2026-10-13)

**Scope.** These are the testimonials' own text keys, the list built from `FIELDS.testimonials`:
`kicker`, `heading`, `sub`, `rating`, `stars` and `cta`, and the `quotes` columns `who`, `quote`,
`role` and `when`. The grep adds three keys the handoff had not named, `rating`, `stars` and
`cta`; all three are probed and capped. `sub` resolves through `DEFS.testiSub` at every design
(`fieldSeed` has no testimonials arm for it), so it has one seed. `IDENTITY_CHARS.testimonials`
(layout 3's stat card, 60–67) is session 1's and was re-verified by `--check`. The probe ran on a
fresh Vite at :5199. Its per-width readout is
[`char-limits/session-9-probe.md`](./char-limits/session-9-probe.md), and the decisions are in
`notes/testimonials.md`.

**Rules.** These are session 1's calls, unchanged. `rules.mjs` gains one sized key, `cta` (the
Book Now pill under layout 2's card, screenshotted), and one block, `quotes.quote`. Everything
else is metadata: `sub` is a plain line, not `type: 'area'`, and the heading is a display head
(judgement 1).

**The caps written** (by layout 1, 2, 3, 4; `–` where the layout does not read the field; `f`
marks a cap at its floor that prose fails at some width).

| field | rule | Retro | Lime | Grunge | Editorial | Pop |
|---|---|---|---|---|---|---|
| `kicker` | meta | – 61 61 | same | same | same | same |
| `heading` | meta (head) | – 38f 26 24 | – 43 26 23 | – 38f 30 30 | – 38f 17 22f | – 45 22 22 |
| `sub` | meta | – 114 86 | – 114 87 | – 114 67f | – 114 67f | – 114 67f |
| `rating` | meta | – – 8 | – – 7 | – – 9 | – – 5 | – – 7 |
| `stars` | meta | – 44 35 | – 44 32 | – 44 36 | – 44 36 | – 44 36 |
| `cta` | sized | – 16 | same | same | same | same |
| `quotes.who` | meta (joint) | 28 48 25 27 | 39 45 20 27 | 28 50 25 27 | 17 27 13f 27 | 18 32 15 27 |
| `quotes.quote` | block | 190 190 190 190 | 66f 190 190 190 | 68 190 190 190 | 66f 190 190 190 | 190 190 190 190 |
| `quotes.role` | meta (joint) | 28 48 26f 29 | 45 48 26f 27 | 28 48 26f 29 | 26f 48 26f 29 | 26f 48 26f 29 |
| `quotes.when` | meta | 30 | 46 | 46 | 46 | 30 |

**Judgement calls.**
1. **The heading is a display head, not a block** (decided before the probe). It is
   `type: 'area'` only so layout 2's typed break holds; plan decision 4 lists headings among the
   seats held to their frame's lines. So it takes the measured cap, and `probesOf` gives no
   `heading` the block exemption (the form's heading, session 10, inherits this). The samples carry
   no line break, so a heading typed with one is not what `--check` renders. In the real app a typed
   break counts one character in Chrome's `maxLength`, as in `capExcess`: box and counter agree.
2. **A review is written into every row** (`rowsAt`, decided before the probe). Layouts 1 and 2
   show `cur` (row 0 on the canvas), but the walls give each row a cell of its own width: layout
   3's trailing 1440 cell (row 4) is 177–187 wide where rows 0–3 stand in 367–379, and at 768 rows
   0–3 are the 138–153 cells. Row 0 alone would read a wide cell. The reference is row 0's seed in
   every row. Layout 2's tile rail prints `mark`, two initials at most (`initialsOf`), so it is
   never a seat (checked).
3. **The quote is a block: 190**, three times the seeded 66 (*The room did not sit down once…*,
   row 1). The walls and layout 2 read open at 400, and at 190 every cell grows with its copy
   (screenshotted at Editorial's square layout-4 cells and Lime's layout-3 768 wall). Layout 1's
   desktop card has a 420 floor (`minHeight`) with the pills on it. Once the copy uses the floor up,
   the quote's line box meets the pill row: Lime at 65, Editorial at 57 and Grunge at 68. Lime and
   Editorial hold the seed's 66 (`floor`); Editorial's own row-1 seed already sets the pills flush.
   Retro's and Pop's cards keep a gap between quote and pills and grow, so they read open. The
   quote's `wordEms` fit (Editorial, Pop) never shrank: the seed's widest word, *"Professional*,
   is wider than any word in the samples, so no `--no-floor=quotes.quote` table was needed.
4. **Retro's layout-1 byline wraps by design.** Retro composes *HANNAH L. · PRIVATE HOST* into
   one span over the two pills, `whiteSpace: 'normal'` ("so it wraps rather than running off the
   card"), and the seeded row 1 takes two lines at 390. The first run read that span (who 16, role
   18). The pills under it are `nowrap`. Re-read with the byline allowed one line more, they hold
   28 each. That allowance is now standing (`EXTRA_AT` in `limits.mjs`, Retro's design 0 alone), so
   `--check` reads the same. Its first `--check` failed both keys at 28 for that reason.
5. **who · role · when were checked jointly** (`joint9.mjs` in the scratchpad: every column at its
   cap in every row, every template, design and width, four samples, the byline exempt from the
   lines test as judgement 4). Every failure, 26 of 240 renders, is the role at its floor taking a
   second line, which the solo probe reads too (judgement 7). Nothing fails jointly that fails
   alone. At layouts 2–4 the name and the role are stacked, and at the twins' layout 1 the two
   pills share a wrapping row, so no line is shared but Retro's byline.
6. **The layout-1 pills are metadata, not sized.** They print the artist's content (a name, a role),
   the frame's own second reading of the card. Sized, `who` would be 26 at layout 1 where Lime
   reads 39 and Retro and Grunge 28; `role`'s 52 never binds. **The user's to overrule.**
7. **Floors** (prose fails, the seed fits; `--check` reports `floor`, 16 rows):
   - the role holds *Venue manager, Albert Hall*'s 26 at layout 3 on every template (768, 22–25
     read) and at Editorial's and Pop's layout 1 (768 and 390, 17–18 read). That seed already takes
     a second line in those cells and pills;
   - the name holds *Dan Whitfield*'s 13 at Editorial's layout 3 (768);
   - the quote holds 66 at Lime's and Editorial's layout 1 (judgement 3);
   - the heading holds layout 2's 38 at 390 under Retro, Grunge and Editorial (21–31 read): the
     seed's typed break packs the frame's two lines, and prose with no break cannot (media's
     judgement 2, line packing). Editorial's layout-4 head holds 22: it is fitted to its widest
     word, so strict prose shrinks it at once (6 read). With `--no-floor=heading` it reads 21
     (lines at 390), so 22 either way. A shrink floor for that fit is session 6's judgement 5 shape;
   - `sub` holds its 67 on layout 3's stat card under Grunge, Editorial and Pop (64 read, 1440 and
     768): line packing again.
8. **The rating takes prose** (decided before the probe): one numeral set whole beside a literal
   `/5`, with no `priceParts()` split (session 7's judgement 1). It reads 5–9; Editorial's numeral
   row wraps first, at 1440. `stars` has no letters, so the census has no row for it, and it reads
   32–44 as metadata.
9. **The Book pill is 16** (`max(2 × 8, 8 + 8)`), under every measure (28–54; Editorial's and Pop's
   390 page scrolls at 29 and 35).

**Probe fixes** (`scripts/limits.mjs`; they apply to every later section, and the sweep's full
`--check` re-runs earlier sections under them).
- **A heading is never a block** (judgement 1). No earlier section's heading was `type: 'area'`.
- **`rowsAt` writes a review into every row** (judgement 2).
- **`EXTRA_AT`**: one line more for one key at one template's design (judgement 4).

**Checks.**
- `--seeds` over every testimonials key: 0 seeds over their caps.
- `--check` over every testimonials key, with the three samples and the lower-case one: 0
  failures in 255 rows. The `who.*` rows are included: `IDENTITY_CHARS.testimonials.title` at
  layout 3 (60–67) passes on every template, and the `kicker`, `location`, `tags` and `seal` rows
  are `unseen`. 16 rows report `floor`, all of them judgement 7's. The first run failed 2,
  judgement 4's Retro pills.
- The joint check (`joint9.mjs`): 26 failures in 240 renders, every one the role at its floor
  (judgement 5).

**Real app.** Tested with chrome-devtools on the :5199 server: a Lime page laid out by header
layout 2 (Feature spread), the canvas at 1440.
- **Testimonials at layout 2.** The panel showed Kicker 61, Heading 43, Intro line 114, each
  review's name 45, quote 190 and role 48, the date uncapped (layout 2 does not print it), Stars
  44 and Button 16.
- **Typing.** *Book your wedding date now* stopped at `Book your weddin` (`16 / 16`), and the canvas
  pill printed `BOOK YOUR WEDDIN`. The counter showed at 13 (`13 / 16`) and not at 12. *Honest
  feedback from every couple who booked us* stopped at 43 (`43 / 43`).
- **`QuotesField` with a counter showing** (session 0's open item, for this repeater). Row 2's
  role, typed *Venue manager, Albert Hall and Stoller Hall Manchester*, stopped at 48 (`48 / 48`).
  The uncapped date box beside it stretched to 49px against the role's 31: sessions 5's and 8's
  defect. `pair()` is top-aligned now, and both boxes stand at 31px on one top. The reviewer row
  is not: with a counter under the name (a 46-character name stopped at 45), the row number and
  the ✕ centre on box and counter, about 8px below the box's centre. `SongsField`'s title row is
  built the same way (`alignItems: 'center'`), so this is the repeaters' shared pattern, left for
  the sweep rather than patched in one of them.
- **The layout picker.** With the heading at *Honest words from every couple who booked* (41), the
  thumbnails printed it in full at layout 2, `Honest words from every…` at layout 3 (26) and
  `Honest words from…` at layout 4 (23). The role printed `Venue manager, Albert…` at both.
- **Testimonials to layout 4.** The canvas printed `Honest words from…`. The box kept all 41
  characters (`maxLength` 23), and the counter read `41 / 23 · shortened on the page` in red; the
  role read `48 / 27 · shortened on the page`. The published tab (through the dialog's *Open*)
  printed the same, and its `<title>` was the name.
- **Back to layout 2.** The canvas printed the full heading, and the counters read `41 / 43` and
  `48 / 48` in grey. Opening the tab again re-rendered it in full.
- **Live alone, spot-checked.** In the published tab at layout 4, the next disc moved the row from
  *Hannah L. … Imran K.* to *Amara Okafor … Olivia B.*, and two clicks back wrapped to *Olivia B.*
  first. At layout 2, the tiles *AO*, *OB* and *HL* each put their review on the card. Layout 1's
  arrows (the harness with `&live=1`, Retro, Lime and Editorial) stepped to *Amara Okafor*, back,
  and back again to *Olivia B.*, wrapping.

**Notes for later sessions.**
- **The form (10).** Its `heading` is `type: 'area'` too, and the probe now reads every heading
  with the lines test (judgement 1). Layout 3's head composes the name (`formHeading3`,
  `IDENTITY_CHARS.form.title` 10–23). `promises` is a field-level `'\n'` list, so its count still
  takes the lines test (session 4's note).
- **For the sweep (12).** Judgements 3 (layout 1's 420 floor), 6 (the pills as metadata) and 7
  (Editorial's layout-4 heading fit) are open for the user. The repeaters' first rows (a number, a
  box and a ✕, centred) drop their number and ✕ by half a counter's height when the box shows one
  (the *Real app* note above): one pass over every repeater.

## Session 10: the enquiry form (2026-10-13)

**Scope.** These are the form's own text keys, the list built from `FIELDS.form` (`image`, `photo`
and `email` skipped): `heading`, `sub`, `para`, `promises` (item and count), `types` (item and
count), `typeLabel`, `message`, `messageLabel`, `button`, layouts 2 and 3's card (`price`,
`priceUnit`, `bookings`, `cta`, `note`) and layout 3's `available`, and the `steps` columns `title`
and `sub` and the `fields` columns `label` and `placeholder`. The grep adds eight keys the handoff
had not named: `sub`, `message`, `price`, `priceUnit`, `bookings`, `cta`, `note` and `available`;
all eight are probed and capped. `IDENTITY_CHARS.form` (session 1's) was re-verified by `--check`
and passes. The probe ran on a fresh Vite at :5199. Its per-width readout is
[`char-limits/session-10-probe.md`](./char-limits/session-10-probe.md), and the decisions are in
`notes/form.md`.

**Rules.** These are session 1's calls, unchanged. `rules.mjs` gains three sized keys, each
screenshotted first: `button` and `cta` (the submits, full-measure pills) and `types[]` (the
event-type chips). It gains one block, `para`. Everything else is metadata: `available` is a plain
eyebrow line, not a pill, and the heading is a display head (session 9, judgement 1).

**The caps written** (by layout 1, 2, 3, 4; `–` where the layout does not read the field; `f`
marks a cap at its floor that prose fails at some width).

| field | rule | Retro | Lime | Grunge | Editorial | Pop |
|---|---|---|---|---|---|---|
| `heading` | meta (head) | 45 36f 32 20 | 37 37 32 19 | 36f 40 41 25 | 36f 42 30f 12 | 36f 40 30 17 |
| `sub` | meta | – – – 33 | – – – 40 | – – – 44 | – – – 27 | – – – 30 |
| `para` | block | – – 210 | same | same | same | same |
| `promises` per line | meta | 45 32 | 34 34 | 34 34 | 34 29f | 42 31 |
| `promises` count | count (block) | 9 9 | 9 9 | 9 9 | 6 9 | 9 9 |
| `types` per chip | sized | 15 | same | same | same | same |
| `types` count | count | 8 | 5 | 5 | 8 | 8 |
| `typeLabel` | meta | 51 | 52 | 58 | 37 | 33 |
| `message` | meta | 39 – – 53 | 42 – – 54 | 42 – – 54 | 44 – – 58 | 35 – – 54 |
| `messageLabel` | meta | 51 – – 45 | 52 – – 59 | 58 – – 64 | 37 – – 35 | 33 – – 41 |
| `button` | sized | 16 – – 36 | 15 – – 36 | 15 – – 36 | 15 – – 27 | 15 – – 32 |
| `price` | meta (row) | – 32 39 | – 28 35 | – 32 39 | – 19 23 | – 22 26 |
| `priceUnit` | meta (row) | – 47 54 | – 43 54 | – 47 54 | – 47 54 | – 47 54 |
| `bookings` | meta | – 35 41 | – 32 42 | – 36 42 | – 36 42 | – 36 42 |
| `cta` | sized | – 36 36 | – 30 36 | – 33 36 | – 18 22 | – 20 26 |
| `note` | meta | – 47 54 | – 43 54 | – 47 54 | – 47 54 | – 47 54 |
| `available` | meta | – – 61 | same | same | same | same |
| `steps.title` | meta | – – – 41 | same | same | same | same |
| `steps.sub` | meta | – – – 44 | same | same | same | same |
| `fields.label` | meta | 49 46 57 22 | 47 52 69 27 | 52 62 76 30 | 24 33 41 14 | 32 33 40 19 |
| `fields.placeholder` | meta | 37 – – 23 | 41 – – 24 | 41 – – 24 | 41 – – 25 | 35 – – 24 |

**Judgement calls.**
1. **Layout 3's heading cap is a typed head's, not the composed line's** (decided before the
   probe). `sectionVm` composes `formHeading3(name)` only while `heading` is absent, and a typed
   head replaces it whole, so the field's cap measures what the key holds. The composed line is the
   name's business: its copy of the name clamps at `IDENTITY_CHARS.form.title` (10–23), which
   `--check`'s `who.title` rows re-verify. The floor is the seed with the probe's *Kai Mercer*, 30.
   **One panel edge follows, and it is the user's call.** An untouched layout-3 heading box shows
   the composed seed with the artist's real name, and its counter compares that with the cap. With
   the name at its own layout-3 cap the seed is 20 + that cap: Retro 33, Lime 33, Grunge 43,
   Editorial 30, Pop 31, against the written 32, 32, 41, 30, 30. So a name of 12–13 characters
   (Retro, Lime), 22–23 (Grunge) or 11 (Pop) turns the counter red, *shortened on the page*, over a
   head the page prints whole. Session 0's note that real caps cannot do this does not hold for a
   seed composed from the name. The fix would floor layout 3's cap at 20 + `IDENTITY_CHARS.form.title`
   and teach `floorOf` the same, so `--check` reports it as `floor`.
2. **The heading's floors** (`--check` reports `floor`):
   - layout 1 under Grunge (30 read), Editorial (26) and Pop (30): line packing. The seed's typed
     break and its long last word set the frame's lines, and prose of 36 cannot. Editorial's head is
     fitted to its widest word, so prose, whose widest word is shorter than *unforgettable.*, sets
     *larger* and takes a fifth line (the seat 0.61–0.92 the seed's width);
   - Retro's layout 2 at 768 (24 read). Sample 3, *Kestrel Booking is open*, fills the 768 column
     exactly, and its last glyph's side bearing runs a fraction of a pixel past it (`box`, `past`),
     at 25, 27 and 36. The lines bound is somewhere in 37–71 (1440 reads 88, 390 reads 60), so the
     seed's 36 is written, a floor of the box test's strictness rather than of the frame;
   - Editorial's layout 3 at 1440 (27 read), line packing in the fitted half column.
3. **The promises' count is a block** (decided before the probe). Both layouts set the promises one
   a line down a column that hugs them, the package features' shape (session 4, judgement 4).
   `probesOf` now gives the count of a field-level `'\n'` list the block exemption. It reads open
   to 16 but at layout 1 under Editorial and Pop. There the column is bottom-aligned beside the
   head, so a seventh promise climbs into Editorial's head and a tenth into Pop's scribble
   (screenshotted). Open takes three times the seed's 3, so 9; Editorial's layout 1 is 6.
   `rules.mjs` now writes 3 × seed for a count that is open everywhere, which is how session 4's 15
   for the features was reached by hand. Each promise is held to its one line (29–45, 390 binding;
   Editorial's layout 2 holds *Covers 120 mi from Manchester*'s 29, a floor).
4. **Row 0 is every repeater's narrowest row, so `rowsAt` is unchanged** (a scratchpad check,
   `rowseats10.mjs`). Every box of a layout stands in one width, but layout 4's odd fifth (528 / 708 /
   370 against 258 / 347 / 178), and the three steps share one width. The column floors are the
   longest seed of any design: a label 10 (*Event date*, *Event type*, *Your email*), a placeholder
   15 (*Wedding, party…*), a step title 20 and a sub 24.
5. **The placeholders print, and only at layouts 1 and 4.** On the canvas every reachable layout
   draws a placeholder as a text span; the one `<input readOnly placeholder>` branch is layout 5+,
   which `NVAR.form` (4) never reaches. Layouts 2 and 3 set the label in the box and print no
   placeholder while a label is there, so `placeholder` is unseen and uncapped at both. A box whose
   label is emptied prints its placeholder there instead, uncapped; that is the one gap.
6. **The message placeholder is held to the frame's one line** (39–58). It sits in a three-row box,
   so a second line would not crowd anything. With one line more (`--extra-lines=message`, the
   readout's second table) it reads 66–86 at layout 1 and 106–114 at layout 4. **The user's to
   overrule.**
7. **The price takes prose** (decided before the probe): the card sets it whole in the display face,
   with no `priceParts()` split, session 7's judgement 1. **The price row wraps by design.** Price
   and unit share a baseline row that is `flexWrap: 'wrap'` in every template's block, so the
   frame's one row (*£1,200 from / event*) holds at the seeds, and a price of about ten characters
   or more drops the unit under it. With both at their caps (`joint10.mjs`, every template, both
   designs and width, four samples) the row wraps in 110–114 of 120 renders, and nothing fails
   jointly. The ten failures each run reports follow the substitute lead word the joint check
   gives one key (*Osprey* for *Kestrel*): swapping the leads moves them from the unit to the price.
   That is the prose method's sensitivity at an exact edge (session 6, judgement 6), not the pair.
   Holding the row to one line would be a joint split: **the user's to overrule.**
8. **The sized seats.** The layout-1 submit is max(2 × 8, 8 + 8) = 16 under Retro (*Book Now*) and
   max(2 × 7, 7 + 8) = 15 under the twins and Pop (*Enquire*), under every measure (19–42). Layout 4's
   *Check Availability* is 36, and Editorial's 27 and Pop's 32 bind. The card's submit is 36, and
   layout 2's measures bind under Lime (30), Grunge (33), Editorial (18, the seed: a 19th character
   wraps its Gloock pill at 768) and Pop (20). A type chip is 15, under every measure (42–54).
9. **The type count** is the seed's 5 under Lime and Grunge, whose 390 chip row wraps a sixth chip,
   and 8 under Retro, Editorial and Pop.
10. **Found in the real app, for the sweep (12): the mailto heads an answer with the clamped label.**
    `formMailto` is bound over `vm.formFields`, which reads `c` after the clamp at `sectionVm`'s
    head. So at a layout that shortens a label, the email reads `Preferred date of the…: Sat 14
    June 2027`. It matches the page, but the artist's full label is the better head for the email.

**Probe fixes** (`scripts/limits.mjs` and `rules.mjs`; they apply to every later section).
- **A field-level `'\n'` list's count is a block** (judgement 3). `promises` is the only one.
- **`rules.mjs` writes 3 × seed for a count that is open everywhere** (judgement 3).

**Checks.**
- `--seeds` over every form key: 0 seeds over their caps.
- `--check` over every form key, with the three samples and the lower-case one: 0 failures in 321
  rows. The `who.*` rows are included: `IDENTITY_CHARS.form`'s kicker (layouts 1–2), name (layouts
  1–3) and Pop's layout-1 seal pass on every template, and the `location` and `tags` rows are
  `unseen`. 7 rows report `floor`: judgement 2's five heading rows, Editorial's layout-2 promise
  line, and session 1's Editorial name at layout 3 (10).
- The joint check (`joint10.mjs`): 10 failures in 120 renders on each run, every one the key
  carrying the substitute lead word, and none of the pair (judgement 7).

**Real app.** Tested with chrome-devtools on the :5199 server: a Lime page laid out by header
layout 2 (Feature spread), the canvas at 1440.
- **The form at layout 2.** The panel showed Heading 37 (its counter at the seed, `36 / 37`, the
  typed break counting one), Promises `longest 29 / 34 · 3 of 9`, each box's label 52 with the
  placeholder uncapped, Price 28, Price note 43, Bookings 32, Button 30 and Note 43.
- **A label.** Box 1's label, typed *Preferred date of the wedding ceremony and the evening party*,
  stopped at 52 (`52 / 52`), and the canvas box printed it. Cut back to 41 the counter was gone,
  and at 42 it read `42 / 52` (80% of 52 is 41.6).
- **The heading.** *Plan the night your guests talk about for years* stopped at 37 (`37 / 37`).
  The layout picker's thumbnails printed it in full at layouts 1, 2, 5 and 6, as `Plan the night
  your guests…` at layout 3 (32) and as `Plan the night…` at layout 4 (19).
- **The form to layout 4.** The canvas printed `Plan the night…`. The box kept all 37 characters
  (`maxLength` 19), and the counter read `37 / 19 · shortened on the page` in red
  (`rgb(179, 38, 30)`). The 42-character label read `42 / 27 · shortened on the page` and printed
  `Preferred date of the…`. The panel showed Line under the heading 40, step titles 41 and subs 44,
  labels 27, placeholders 24, Message placeholder 54, Message label 59 and Button 36.
- **`FormFieldsField` and `StepsField` with counters showing** (session 0's open item, for these
  two). A placeholder typed *Any Saturday from June to late August* stopped at 24 (`24 / 24`). Its
  kind select stands under the box, not beside it, so nothing stretches: every box is 31 tall. Step
  1's title, typed *Send me your date, venue, guest count and a rough budget*, stopped at 41
  (`41 / 41`), and the canvas printed it. Both rows' number and ✕ centre on the box and its
  counter, the first-row pattern session 9 left for the sweep.
- **Published tab** (through the dialog's *Open*). It printed `Plan the night…`, `Preferred date
  of the…` and the step in full, and its `<title>` was the name.
- **Back to layout 1.** The canvas printed the full heading, and the counter read `37 / 37` in grey.
  The types read `longest 7 / 15 · 5 of 5`. A sixth, *, Corporate*, was refused at its first
  letter. *Other* retyped as *Corporate summer party* stopped at `Corporate summe` (`longest 15 / 15 ·
  5 of 5`), and the canvas chip printed it. A fourth promise, *Travel included anywhere in the North
  West*, stopped at 34 (`longest 34 / 34 · 4 of 9`).
- **Live alone, spot-checked in the published tab.** At layout 4 the boxes are inputs carrying
  the typed placeholders, and the submit is an `<a href="mailto:">`. Filled from the opener, its
  address read `subject=Enquiry` (layout 4 draws no chips), with each answer and the message in the
  body (judgement 10). At layout 1 (republished) the subject opened on chip 0, `Wedding enquiry`. A
  click on `Corporate summe` made it `Corporate summe enquiry`, and the body headed the first answer
  with the label in full (42, under Lime's 47 there).

**Notes for later sessions.**
- **The footer (11).** `statement` is `type: 'area'`, a display statement fitted to its widest word
  under Editorial and Pop (`vm.footerWordEms`). Decide before the probe whether it is a block or a
  head, given that Editorial's layout-1 form head here read *more* lines with prose, because the fit
  sets shorter widest words larger (judgement 2). `copyright` is composed from the name
  (`copyrightOf`), judgement 1's panel edge in another seat.
- **For the sweep (12).** Judgements 1 (layout 3's floor through the name), 6 (the message's one
  line), 7 (the price row's wrap) and 10 (the mailto's clamped label) are open for the user.

## Session 11: the footer (2026-10-14)

**Scope.** These are the footer's own text keys, the list built from `FIELDS.footer` (`showBadge` is
a select): `statement`, `cta`, `copyright` and the `links` column `label`. The grep found no key the
handoff had not named. The two link columns are derived from the rows (`vm.footerCols`, the rendered
list halved), so they are read through `links.label`. `IDENTITY_CHARS.footer` (session 1's) was
re-verified by `--check` and passes. The probe ran on a fresh Vite at :5199. Its per-width readout is
[`char-limits/session-11-probe.md`](./char-limits/session-11-probe.md), and the decisions are in
`notes/footer.md`.

**Rules.** These are session 1's calls, unchanged. `rules.mjs` gains two sized keys, each
screenshotted first: `cta` (the Book pill, a filled stadium with its arrow disc) and `links.label`
(text-link controls, session 6's back link and session 8's expand link). There are no blocks: the
statement is a display head (judgement 1). `copyright` is metadata.

**The caps written** (the footer has one design; `f` marks a cap at its floor that prose fails at
some width).

| field | rule | Retro | Lime | Grunge | Editorial | Pop |
|---|---|---|---|---|---|---|
| `statement` | meta (head) | 36f | 36f | 45 | 36f | 36f |
| `links.label` | sized (joint) | 19 | 28 | 28 | 20 | 14f |
| `cta` | sized (joint) | 16 | 16 | 16 | 12 | 11 |
| `copyright` | meta | 31 | 28 | 32 | 24 | 35 |
| `IDENTITY_CHARS.footer` title / seal | (session 1) | 24 / 19 | 46 / 13 | 54 / 14 | 39 / 16 | 10 / 12 |

**Judgement calls.**
1. **The statement is a display head, not a block** (decided before the probe). It is a hand-scaled
   h2 in a fixed measure, drawing the frame's three lines, `type: 'area'` only for its typed break
   after *make*: session 9's judgement 1 shape. `probesOf` now reads `HEADS` (`heading`,
   `statement`). Read as a block (probed with the lines test off) it would be Editorial 80 (390
   overlap) and Grunge 46 (1440), and 36 elsewhere, since the seal below binds there too; the
   768 surfaces are open. With one line more
   (`--extra-lines=statement`) it reads Grunge 46, Editorial 32, the rest under their floor.
   **The user's to overrule.**
2. **The statement's floors are two kinds, and one a cap cannot hold.**
   - **The seal at 390** (Retro 13, Lime 19, Pop 10 read). At 390 the seal's disc stands over the
     right end of the statement's first line. The seed's typed break keeps that line to *Let's
     make*, so the frame's disc clears it; a statement with no break fills the line and runs under
     the disc (screenshotted: *Kestrel nights and golden hour sets* under Retro's and Pop's discs,
     Lime's ring touching the N). Any first line past 10–19 characters does, so 36 does not bound
     it. The fix is layout, not length: the statement's first line keeping the disc's room at 390,
     JP-122's `sealRoom` for the wordmark row. That changes `EncoreSection`, so it is outside this
     pass: **for the sweep (12), the user's call**, session 2's judgement 1 shape.
   - **Editorial, every width** (24–31 read): line packing at 1440 and 768, where the seed's break
     packs the fixed 397 / 326 box's three lines; and at 390 session 10's warning, met. The head is
     fitted to its widest word, and the seed's *UNFORGETTABLE.* sets it at 41px where prose sets at
     the frame's 56, so prose takes a fifth line.
3. **A link label is written into every row** (`rowsAt`, decided before the probe). The rows are
   halved into two columns side by side: the first hugs its widest label or the pill, and the
   second starts after it (`rowseats11.mjs`: at 390 column 2 has 113–196px against column 1's
   139–231). So one column's label pushes the other's, and the joint reading is both at the cap.
   The reference prints *About* in every row. Under Pop and Editorial the second column fills the
   row at 390 and wraps by design (*SHOWS/* over *COVERAGE*, `notes/footer.md`), which the
   reference's *About* does not show, so that seat takes the frame's second line (`EXTRA_AT`,
   inert on every `nowrap` seat). Sized, a label is max(2 × 14, 14 + 8) = 28 off *Shows/Coverage*;
   Retro's 19 and Editorial's 20 bind (390 and 768 boxes, Editorial's 390 third line).
4. **Pop's link label is held at its floor, 14, and the sun can still meet it.** Prose reads 10 at
   1440: the second column's last row meets the corner sun from 11 characters, and a 14-character
   one touches its ray (screenshotted). The seeded *Shows/Coverage* stands in row 5, clear of it,
   as the frame placed the sun. At 768 and 390 it reads 13. A cap under the seed's 14 would clamp
   the frame's own label. **The user's to overrule**; the fix would be the sun's, not the cap's.
   At 390 Pop's second column breaks inside a word that outruns it (`overflowWrap: anywhere`, the
   designed wrap), which the seeded *Enquiries* does not.
5. **The pill and the labels share column 1's width, so they are a joint split** (`joint11.mjs`,
   every template and width, four samples). Under Retro, Lime and Grunge the sized 16 passes beside
   labels at their caps. At 390:
   - **Editorial** holds pill 16 with labels 14, or pill 12 with labels 20. Written: 12 and 20,
     which keeps a sitemap label's room over the pill's. **The user's to overrule.**
   - **Pop's pill pushes the seeded labels.** A 12-character pill breaks *Shows/Coverage* into three
     lines (and at 15, *COVERA / GE*, *ENQUIRI / ES*, *REVIEW / S*: screenshotted), so it is 11
     (`pill11.mjs`: every seeded label keeps its lines beside *Book Now*). Beside labels of 13 it
     holds 15. The joint check reports 4 failures in 60 renders, all Pop's label at its floor,
     which fail with the pill at its seed too.
6. **Found by a screenshot: the probe reads a seat, not what it pushes.** The `cta` probe read Pop's
   pill at 33, because its tests watch the pill's own seats. The seeded labels it squeezed broke
   mid-word, and no test saw them. **For the sweep (12):** a seat that moves a neighbour it does not
   hold (a pill in a column, a chip in a row) can have been read too loosely the same way.
7. **The copyright is read beside the credit.** *A JustPay Product* is `FOOTER_CREDIT`, a literal,
   so the solo probe is the row's joint reading. At Pop's 390 the row wraps as a whole past its
   room, the credit dropping under the copyright (JP-122). At the row's 0.86 line the two lines'
   text boxes overlap where their ink does not, and the first run read that as an overlap at 16. The
   probe now lets the copyright meet the credit there (`DROPS`), and it reads 35, the copyright's
   own one line. With one line more (`--extra-lines=copyright`) it reads Retro 44, Lime 56,
   Grunge 60, Editorial 42, Pop 64.
8. **The copyright box's counter, through the name** (session 10's judgement 1, in another seat).
   An untouched box shows `copyrightOf()` with the artist's real name, up to the header's cap,
   and its counter compares that with the cap. The page prints the name clamped to
   `IDENTITY_CHARS.footer.title` (24 / 46 / 54 / 39 / 10). The two disagree at the edges:
   - **A red counter over a whole line**: under Lime a 22-character name (the header's layout-3
     cap) makes the seed 29 against 28, and under Grunge a 26-character one 33 against 32. The page
     prints both whole.
   - **No counter over a shortened line**: under Pop a name of 11–13 characters prints
     `© 2026 Kestrel…` on the page (the real app, *Kestrel Sound*), while the box shows
     `© 2026 Kestrel Sound` at 20 / 35 with no counter. Retro's names past 24 are both red and
     shortened, so they agree.
   **The user's call**: flooring the cap at 7 + the header's widest name under Lime and Grunge (29,
   33), and teaching the counter the name's footer clamp.
9. **The page's seat moves no text** (checked before the probe). The footer's colour seat is read
   off the page (`SCHEMES_OF[theme][page].footer`, `footerBand`), but every text rect and every
   ring `textPath` reads the same at `&page=` 0–3 as without it, at all fifteen surfaces
   (`rowseats11.mjs --pages`; the SVG text of Pop's spinning seal excluded, since its rects move
   with the spin). So the probe's page-less render is the one reading, and `in` / `chars` need no
   page.

**Probe fixes** (`scripts/limits.mjs`; they apply to every later run).
- **`HEADS`**: `statement` is a display head, as `heading` is (judgement 1).
- **`rowsAt` writes a link label into every row** (judgement 3), and **`EXTRA_AT`** gives Pop's and
  Editorial's link seats the frame's second line.
- **`DROPS`**: a literal a row drops under the value by design, which the overlap test lets it
  meet (judgement 7). `measure` takes it as a second argument.

**Checks.**
- `--seeds` over every footer key: 0 seeds over their caps.
- `--check` over every footer key, with the three samples and the lower-case one: 0 failures in 50
  rows. The `who.*` rows are included: `IDENTITY_CHARS.footer`'s name (the brand line and the
  copyright's copy) and its seal's ring pass on every template, and the `kicker`, `location` and
  `tags` rows are `unseen`. 5 rows report `floor`: the statement under Retro, Lime and Pop (390) and
  Editorial (every width), and Pop's link label (every width).
- The joint check (`joint11.mjs`): 4 failures in 60 renders, all Pop's label floor (judgement 5).
  `pill11.mjs`: every template's seeded labels keep their lines beside the written pill.

**Real app.** Tested with chrome-devtools on the :5199 server: a Grunge page laid out by header
layout 1 (Hero), the canvas at 1440.
- **The footer under Grunge.** The panel showed Statement 45, each link label 28, Button 16 and
  Small print 32. The statement, typed *Let's make your wedding night one to remember forever*,
  stopped at 45 (`45 / 45`), and the canvas head printed it. Cut back, the counter read `36 / 45`
  at 36 and was gone at 35.
- **`LinksField` with a counter showing.** Row 5's label, typed *Upcoming shows and the travel map*,
  stopped at 28 (`28 / 28`), and the canvas column printed it. The target select stands under the
  box, so nothing stretches. The row's number and ✕ centre on the box and its counter, the
  repeaters' first-row pattern left for the sweep. The Button, typed *Book your wedding date now*,
  stopped at `Book your weddin` (`16 / 16`).
- **A template switch to Pop** (the footer has one design, so the tighter cap is a template's). The
  canvas printed `Let's make your wedding night one…` and `Upcoming show…`. The boxes kept their
  text, and the counters read `45 / 36 · shortened on the page` in red (`rgb(179, 38, 30)`) and
  `28 / 14 · shortened on the page`. The published tab (through the dialog's *Open*) printed the
  same, its `<title>` the name.
- **The copyright's copy of the name** (judgement 8). With the name *Kestrel Sound* (Pop's header
  stopped *Kestrel Soundsystem* at 13), the canvas printed `© 2026 Kestrel…`. So session 1's sweep
  note that `copyrightOf()` reads the unclamped name is stale for the footer: `vm.copyright` is
  built after the clamp at `sectionVm`'s head. The published `<title>` reads the full name.
- **Back to Grunge.** The canvas printed everything in full (`© 2026 Kestrel Sound` too), and the
  counters read `45 / 45` and `28 / 28` in grey. Opening the tab again re-rendered it in full.
- **Live alone, spot-checked in the published tab.** Every link carried its section's anchor
  (`#bio` … `#testimonials`, the pill `#form`). A click on *Pricing*, on the Book pill and on the
  clamped *Upcoming show…* scrolled `#pricing`, `#form` and `#map` to the top.

**Notes for later sessions.**
- **For the sweep (12).** Judgements 1 (the statement as a head), 2 (the statement's first line
  under the seal at 390: layout, not a cap), 4 (Pop's last link row and the sun), 5 (Editorial's
  pill-and-label split), 6 (seats that push a neighbour), 7 (the copyright's one line) and 8 (the
  copyright counter through the name) are open for the user. The probe fixes above change no
  earlier section's reading, but `HEADS` and `DROPS` are new names the full `--check` runs under.

## Session 12: the sweep (2026-10-14)

**Landed.** The bio heading's widest-word fit, the full `--check` and `--seeds`, the build digest, both
builds and the root `index.html`, the repeaters' first-row centring, and the cross-cutting `CLAUDE.md`
bullet and README paragraph.

**1. The bio heading's fit** (session 2, judgement 1; `notes/bio.md`).
- Layout 1's h2 is `min(dispLg, 100cqi / vm.titleWordEms)` on the flank, now an `inline-size`
  container, for Lime, Editorial and Pop (`!grunge`; Grunge's Anton has no ems table). It is the header
  name's JP-092 shape, with `faced()` outside the fit.
- **Pop's layout 4 was already fitted**, to the frame's 572.9 measure, which lies over its dot grid
  (grid at 589.97 × 0.82, head from 56 × 0.82): *KESTREL* ran into the dots. At 1440 the measure is now
  533.97 (`headMeasure`); 768 and 390 are unchanged.
- **Editorial's layout-1 seed binds.** Gloock *ROOM.* at the token (93.8px) ran 59px past the 273px
  flank into the seal's disc. It now sets at 77.3px at 1440 (0.82) and **64.3px on the editor's 1088
  Desktop canvas (0.69, under the name's 0.75 floor)**. Lime, Pop and every other width are unchanged.
- **Caps.** `limits.mjs` gains `FLOOR_AT` (the heading may shrink to 0.75 at those four designs; `--no-floor`
  still reads it floorless). Written: Lime layout 1 **19** (was 15f), Pop layout 1 **17** (15f), Pop
  layout 4 **19** (15f), Editorial layout 1 stays 15 (768 binds; 1440 reads 14 under the floor, 21
  floorless; `--check` reports `floor`).

**2. `--seeds` and the full `--check`** (fresh Vite on :5199, four samples, one batch of categories per
server). `--seeds` over all eleven: 0 seeds over their caps. `--check`, first run, 2,735 rows:

| cat | rows | FAIL | floor |
|---|---|---|---|
| header | 168 | 6 | 5 |
| bio | 226 | 2 | 10 |
| media | 231 | 7 | 40 |
| pricing | 385 | 0 | 17 |
| repertoire | 250 | 0 | 11 |
| gallery | 170 | 0 | 3 |
| calendar | 210 | 0 | 0 |
| map | 440 | 0 | 15 |
| testimonials | 255 | 0 | 16 |
| form | 320 | 0 | 7 |
| footer | 50 | 0 | 5 |

The 15 FAILs, each re-measured (`--keys` / `--themes` / `--designs`) and rewritten; none loosened a
check. After the rewrite, `--check` over header, bio and media: 0 failures, and `--seeds`: 0.

| row | was | now | binds |
|---|---|---|---|
| header `title`, Retro layout 3 | 23 | 14 | 1440 (768 and 390 read 20) |
| header `subtitle`, Grunge layout 2 | 310 | 197 | 390 |
| header `location`, layout 1: Lime / Grunge / Editorial / Pop | 24 / 24 / 22 / 23 | 20 / 19 / 19 / 20 | 1440 |
| bio `baseLabel`, Pop layout 3 | 19 | 14 | 390 |
| `IDENTITY_CHARS.bio.location`, Retro layout 1 (a `who.*` row) | 23 | 18 | 390 (overlap) |
| media `tracks.title`, Grunge layout 1 / Retro layout 3 | 27 / 25 | 24 / 20 | 390 |
| media `chipLabel`, layout 2: Retro / Lime / the rest | 14 / 12 / 13 | 10 / 9 / 10 | 1440, overlap |

Every one is a row an earlier session wrote under the old probe: the box test (session 5), `paints`
(6), path-first matching (7). Their readings now are the same seat read by the stricter, later test.
The five `chipLabel` rows all moved together, which fits a probe change, not five frame facts. All
seven categories after media passed first time.

**3. The build digest** (`build-digest.mjs`, `old` = the root `index.html`, which equals `main`'s;
`new` = `dist-standalone`; cards 0 and 3, 16 files each, `cmp` per file). Card 3 (layout 4, Pop's
fit): byte-identical. Card 0: identical but for **one row**, Editorial's bio `H2` on the 1088 canvas
(item 1: 93.8 → 64.3px, its height 259 → 177.6). Lime's and Pop's seeds do not bind.

**4. Builds.** `npm run build` and `npm run build:standalone` pass (9,930,747 bytes, +16,962);
copied to the root `index.html`.

**5. The repeaters' first row** (sessions 9–11). All ten head rows (Songs, Tracks, Gigs, Slots, Stats, Steps, Tiers,
FormFields, Quotes, Links; Sets has none) share one head row, now
`ROW_HEAD` (top-aligned), the number `ROW_BOX_H` (31px) high, the ✕ `ROW_X_TOP` down, so each stands in
the box's own height. Measured in the real app on Lime pages at layouts 1, 2 and 4, with and without
the counter showing: the number and ✕ sit within 0.1px of the box's centre in every repeater
(0.1px of 31.1). (The Slots row's counter did not show in that run: its box was not reached.)

**6. Docs.** `CLAUDE.md` gains one bullet (the cap mechanism), `README.md` a *Character limits*
section, `notes/bio.md` the heading's new state, `plans/README.md` the status row.

**Not done / honest limits.** The bio heading's fit was verified in the harness (sizes, edges, the dot
grid, the probe), not walked in the published tab. Items 1–6 are uncommitted.

### Open calls (every one the user's to overrule)
See the list printed at the end of the session; it is the handoff's list plus these four from this
session: **S12-a** Editorial layout 1's seed shrinks (0.82 at 1440, **0.69 at 1088**, below the 0.75
floor); alternative, a floor at 0.75 that lets the word touch the seal at 1088. **S12-b** the bio
heading's shrink floor is the name's 0.75 (`FLOOR_AT`); alternative, floorless (Editorial 21). **S12-c**
Pop layout 4's measure is the room left of the dot grid, not the frame's measure; alternative, keep the
frame's and let a long word cross the dots. **S12-d** 15 caps were lowered under later, stricter
probes (table above), `chipLabel` most, where Lime's 9 is a character past its seed.
