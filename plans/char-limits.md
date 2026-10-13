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
| 12 | Sweep: the full `--check` and `--seeds`; the build digest at seeds byte-identical to `main`; one cross-cutting bullet in `CLAUDE.md` and a README paragraph; `npm run build:standalone` and copying it to the root `index.html` |

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
