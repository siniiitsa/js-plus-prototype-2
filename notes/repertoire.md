# The repertoire — working notes

Created on 2026-10-13 for the character-limit pass (`plans/char-limits.md`, session 5). The
songs, the sets and the heading's fallbacks are in `notes/list-editors.md` (`SongsField`,
`SetsField`, `repSetsOf`, `HEADING_3` / `HEADING_4`). "Above" and "below" may point into
`CLAUDE.md` or another `notes/` file.

- **Character caps** (session 5 of the character-limits pass, 2026-10-13;
  `plans/char-limits.md`, *Session 5*, and the per-width readout in
  `plans/char-limits/session-5-probe.md`). `heading` has a `chars` row, `songs` has `cols` for
  `title`, `artist`, `length` and `tags` (item and count), and `sets` has `cols` for `mood` and
  `length`. The calls to keep:
  - **The heading is the song count at layouts 1 and 2** (*12 Songs*, 8), and layout 1 binds it
    hard: 8–14 at 768 and 390, its display head beside the search box. Editorial's 768 is the
    tightest: an eight-letter word in Gloock outruns the head's column into the search, where
    *12 SONGS*' narrow digits fit, so it holds the seed's 8 as a floor (session 2's word-bound
    heading again). Layout 2's head has room (21–38), and layouts 3 and 4 read 10–25 against
    *Curated sets* and *Repertoire*. Pop's layout 4 holds *Repertoire*'s 10 as a floor at 390.
  - **A column's floor is the longest seeded row**: *Don't Stop Me Now* (17) for the title,
    *Earth, Wind & Fire* (18) for the artist. Seven designs read the title under 17, and the
    seeds already show what a longer title does there: at 390 the title ellipsizes beside its
    artist (Pop's *SEPTEM…*, Editorial's layout-4 *DON'T STOP ME NO…*), and at layout 3's 768 the
    seeded *Dancing Queen* and *Don't Stop Me Now* already take JP-104's second line.
  - **The title and the artist share a row**, and each is measured beside the other's seed. An
    artist at its cap (73–74 under Lime and Grunge at layout 1) squeezes the title to its first
    word and an ellipsis. That was decision 6's fallback, left as it was until JP-136 (QA,
    2026-10-15: *Don't Stop Me Now* beside *Earth, Wind & Fire, The Emotions* read "Don'…" in
    every template). **Layout 1's row now wraps**: the inner row is `flexWrap: wrap`, the
    title and the artist each `maxWidth: 100%` with their own ellipsis, so an artist that
    cannot stand beside its title drops under it, at the left, and a row that fits stays on one
    line (the seeds are byte-identical). **Pop took the other course at first** (user call, 2026-10-15): its row is a
    pill, and a wrapped pill would be a tall oval, so the title kept its width (`flex: none`)
    and the artist gave way — `flex: 0 1 auto`, capped at 60%, with its own ellipsis. **QA's
    retest (2026-10-20) reopened that at 390**: the artist read "EART…" and even the seeded
    "STEVIE WOND…", against an Expected that wants both columns readable. So at 390 alone
    (`popWrap = pop && s.mob`) Pop wraps like the others — the 999px radius stays round on a
    two-line row — while 768 and 1440, where the frame's one line fits, keep the title-holds-
    its-width rule and the 60% cap. A row that fits stays on one line.
  - **A tag is 18 at every layout and template** (the sized rule on *Birthdays*' 9). A tag is a
    chip at layouts 1 and 2 and a set's name at layout 3, and there it is also the key of the
    set's details in `c.sets` (case-folded). A clamped tag would be a different key and lose its
    mood and length on the page, so the cap is one number everywhere and a stored tag is never
    clamped by a layout or template switch. Layout 4 prints no tags and takes the same 18.
  - **A tag count bounds one song, never the page.** The chip row (and layout 3's set cards) is
    the union of every song's tags. Twelve songs with two distinct tags each draw 24 chips, and
    no per-song cap can stop that. The count is how many distinct chips the binding row holds,
    so one song can carry every chip the row shows: 4 at layouts 1 and 2 (3 at Editorial's layout
    1, at 390), and 3 at layout 3, where a fourth set card starts a new row. Layout 4 takes the
    tightest, 3, so a list typed there is not cut elsewhere.
  - **The set line is one budget.** `repSetLine()` prints *MOOD · LENGTH* in a `nowrap` span
    that clips without an ellipsis, so each column at its own measure (mood 16–22, length 14–20)
    clipped mid-word with both full. The caps are a joint split, verified with both at their caps:
    the length takes up to 10 (*90 minutes*) and the mood the rest, never under *Easy listening*'s
    14. That gives mood 17 and length 10 under Retro, Grunge and Editorial, 14 and 10 under Pop,
    and 14 and 7 under Lime, whose 768 card the seed already fills.
  - **The song's length is layout 3's alone** (14–23), and the artist is every other layout's.
    Each column is capped only where it prints.
  - **The panel's Length box follows that** (user call, 2026-10-14): `SongsField` draws it only
    where `colCaps` gives `length` a cap, so layouts 1, 2 and 4 show Artist full width. Stored
    lengths stay in `c.songs` and return with layout 3. The Artist box is still drawn at layout 3
    (its cap is `null` there), which prints no artist.

## Inline editing (plans/inline-edit-all.md, Grunge layout 1, 2026-10-21)

`songs.length` is *not drawn* at layout 1 of Lime, Grunge, Editorial and Pop (only layout 3 prints a song's length): ledgered as
`<Template>.0.repertoire.songs.length` in `INLINE_OFF`, one row per template, and the song's `title` / `artist` are
hit at 1440 and (the first six songs) at 768. Rows past the pager are *paged*, not a gap.

## Inline editing (plans/inline-edit-all.md, Lime layout 2, 2026-10-21)

Layout 2 draws no song length: `Lime.1.repertoire.songs.length`. `title` / `artist` hit; the last two songs are *paged*.

## Inline editing (plans/inline-edit-all.md, Grunge layout 2, 2026-10-22)

Layout 2 draws no song length: `Grunge.1.repertoire.songs.length`. `title` / `artist` hit; the last two songs are *paged*.

## Inline editing (plans/inline-edit-all.md, Retro layout 3, 2026-10-22)

Layout 3 draws **a song once per tag, four rows a card, three cards a page** (`EncoreSection`'s `cap` and `perPage`; the All card closes the list
when a song has no tag and stands on the next page), so a song can be drawn twice and a later one not at all. `INLINE_HEAD` (`*.2.repertoire.songs`,
`data.js`) names the group; `drawnRows()` (`EncoreBuilder.jsx`) works out which rows the cards draw from the same tags, and `inlineSlots` ledgers the rest
(*live-only copy*: behind *View full set* or the pager). The seed's row 11 (*Valerie*, Pubs) is the Pubs card's fifth song, so the two drawn *Valerie*s both
open row 0, and typing in either rewrites both. `songs.artist` is not drawn (`Retro.2.repertoire.songs.artist`); `title` and `length` hit; `sets.mood` /
`sets.length` are parts of the set line (`Mellow · 45 min`). The 4 and 3 are copied from the section: change them there, change them in `drawnRows`.
Two different rows with one title, both drawn, open nothing (the counts differ); the panel is the way in.

## Inline editing (plans/inline-edit-all.md, Lime layout 3, 2026-10-22)

Lime's `limeCard` draws the same four rows a card and three cards a page as Retro's, so `INLINE_HEAD` / `drawnRows` carry over unchanged: the seed's rows 7, 8, 10 and 11 are ledgered and the two drawn *Valerie*s open row 0 (`valerie.mjs`). `songs.artist` is not drawn (`Lime.2.repertoire.songs.artist`); `sets.mood` / `sets.length` are parts of the set line.

## Inline editing (plans/inline-edit-all.md, Retro layout 4, 2026-10-22)

Layout 4 draws **every song, sorted by title** (all twelve seeded songs at both widths), so `INLINE_HEAD` does not apply and the two seeded *Valerie*s are two drawn nodes: the first opens row 0, the second row 11, and typing in one leaves the other (`valerie.mjs`, both widths). `songs.length` is not drawn (`Retro.3.repertoire.songs.length`). The A–Z rail is the one sticky box on the page (1440 only) and carries no slot; a box on a title scrolls with its row at a constant 1.2 px (768: 1.5 px).

## Inline editing (plans/inline-edit-all.md, Lime layout 4, 2026-10-22)

Layout 4 draws every song sorted by title, so `INLINE_HEAD` has no work and both *Valerie*s open their own rows (`valerie.mjs`, both widths). `songs.length` is ledgered (`Lime.3.repertoire.songs.length`: no song length is printed). The A–Z rail is the only sticky box (1440 alone) and holds no slot.

## Inline editing (plans/inline-edit-all.md, Grunge layout 4, 2026-10-22)

Layout 4 draws every song sorted by title, so `INLINE_HEAD` has no work and both *Valerie*s open their own rows (`valerie.mjs`, both widths). `songs.length` is ledgered (`Grunge.3.repertoire.songs.length`: no song length is printed). The A–Z rail is the only sticky box (1440 alone) and holds no slot.

## Inline editing (plans/inline-edit-all.md, Editorial layout 4, 2026-10-22)

Layout 4 draws every song sorted by title, so `INLINE_HEAD` has no work and both *Valerie*s open their own rows (`valerie.mjs`, both widths). `songs.length` is ledgered (`Editorial.3.repertoire.songs.length`: no song length is printed). The A–Z rail is the only sticky box (1440 alone) and holds no slot.

## Inline editing (plans/inline-edit-all.md, Pop layout 4, 2026-10-22)

Layout 4 draws every song sorted by title, so `INLINE_HEAD` has no work and both *Valerie*s open their own rows (`valerie.mjs`, both widths). `songs.length` is ledgered (`Pop.3.repertoire.songs.length`: no song length is printed). The A–Z rail is the only sticky box (1440 alone) and holds no slot.
- **The live heading counts the filtered list** (QA, 2026-11-16). At layouts 1 and 2, while the heading is the
  song-count fallback (`c.heading` absent), `sectionVm` sends `vm.repCountTitles`, the cased "N Songs" for every
  count 0..songs, and `Repertoire` indexes it by `filtered.length` (chip and search, across all pages) when `s.live`.
  The canvas and the panel keep the total. A typed heading, and layouts 3 and 4 (which overwrite the title), never
  read it. Data, not a closure, so `EncoreSection` still does no casing.

## Lattice · layout 1 (plans/lattice/layout-1.md, section 5, 2026-11-19)

Frames `1:673` · `1:9306` · `1:10278`. A block of its own, `LatticeRepertoire` (`EncoreSection.jsx`), standing in `Repertoire`'s `if (s.limeTree)` **after the seam**: `active`,
`filtered`, `shown`, `columns`, `labels` and `at` stay `Repertoire`'s and go over in `g`, with the search / chip / pager closures, so the published search, chips and pager are
the shared seam in a new picture. The section's root carries the warm glow as its own `radial-gradient` (60% x 55% at 15% / 20%, `s.text3` at 14% to 0 at 70%, `s.re && s.v0 && s.lattice`).

- **A page is twelve songs at every width** (`perPage` is 12 under Lattice, 6 on every other template's narrow frames): two columns of six at 768, one of twelve at 390, so `columns` splits
  down two columns at tablet for Lattice alone (`s.narrow && !(s.lattice && !s.mob)`). `pageWindow` takes an optional fourth argument (the numbered-button count), and Lattice passes 4:
  the frames draw `01 02 03 … 20`, not `01 02 03 04 … 20`. The numerals are zero-padded in the markup (`01`), the arrows their own spans (Arial 13.33).
- **The rows**: a 1px `s.tx` 3px-radius box, min 66 tall, padded 10 / 20 (12 at 390), 16 apart (28 at 390), the number in a 40 box (22 at 390), the title Archivo 400 at 20 (the body face, not
  the display alias), the artist an orange mono 11 label. **The title never breaks inside a word** (`minWidth: min-content`): the frame sets 768's *September* at 18 to keep it beside *Earth, Wind
  & Fire*, which a fixed 20 cannot, so the artist wraps under itself there (two lines in a 66 row). *I Wanna Dance* wraps between its words at 768, as the frame does.
- **No eyebrow.** `[ 004 ] ——— REPERTOIRE` is not drawn: no field holds it and the standing removals hold (plan call 1). `vm.pad` is the frame's 113.6 / 116.77 / 58 top and foot, so the head
  starts where the eyebrow did and the section is 42.4 shorter.
- **No pager seat is held.** With one page (the seeded twelve) no pager is drawn, as at every other template, so the section is 78 shorter again (the pager's 46 and the 32 above it):
  776.2 / 946.6 / 1434.2 against the frames' 874.9 / 1067 / 1554.6. Past twelve songs the pager stands exactly where the frame's does (checked with 240 songs: arrows 36.08 and pages 37.72
  at 1440, 44 / 46 with the 6 gaps at 768 and 390, the 390 row spans the measure to 328 + 38).
- **The hint is typed in capitals** (`SEARCH SONGS OR ARTISTS…`), so the live box's placeholder (index.css: ink at .45, which is the frame's `#757575` on `#111`) and the canvas span read the same with no
  `--ph`, and what the visitor types keeps its case.
- **Caps** (`limits.mjs repertoire --themes=5 --designs=0 --check`, 0 fail; `--seeds` 0 over): heading 12 (1440 12, 768 17, 390 12), song title 17 (Pop's, the seeded *Don't Stop Me Now*'s floor at 768; measured 48 / 13 / 18),
  artist 22 (measured 44 / 22 / 22), tags per song 3 (390's four chips end at 320 of 342, so a fifth wraps). Layouts 2-4 stay Pop's rows.
- `INLINE_OFF`: `Lattice.0.repertoire.songs.length`. `inline-probe` (1440 and 768) PASS, 25 slots hit, 0 UNLEDGERED; `photo-probe` PASS (it has no photo slots); `focus-probe --prime` PASS (43 controls).

## Paperback · layout 1 (plans/paperback/layout-1.md, section 5, 2026-11-20)

Frames `1:2689` · `1:11313` · `1:12499`. An own tree, `PaperbackRepertoire` (`EncoreSection.jsx`, after `LatticeRepertoire`), `PAPER_REP` its frame numbers (frame px verbatim at 1440 / 768 / 390, `u()` in cqw of a
`containerType: inline-size` stage, vertical insets in a child, `vm.pad = '0px <surplus>'`). Dispatched in `Repertoire`'s `if (s.lattice || s.paperback)` **after the seam**: `active`, `filtered`, `shown`, `columns`, `labels`, `at` and the
search / chip / pager closures are `Repertoire`'s and go over in `g`, so the published controls are the shared seam in a new picture. The frame is a **yellow card** (`s.onScheme[1].box2`, radius 40, `margin: 0 u(side)`) with an orange blob
(`PaperbackArt blobOrange`) on the white page, the media's card mechanism.

- **A page is twelve songs at every width**, two columns of six at 1440 and 768 (a grid with `gridAutoFlow: column`), one of twelve at 390 (Lattice's rule: `perPage`, `columns` and `pageWindow`'s fourth argument widened to Paperback; at 390 the pager shows `1 2 … 4`, as the frame's).
- **The head** is the count (`240 songs`) in Bricolage with the heart-in-vinyl disc hung off its right end (`left: calc(100% + u(discAt[0]))`), so the disc follows the words. **Paperback prints `songs` lowercase** (the frame's), in three places that must agree: `vm.title`, `vm.repCountTitles` (`EncoreBuilder.jsx`) and `fieldSeed`'s heading fallback (`data.js`). No script `Repertoire` and no ring text on the disc: no field carries either (the media's call).
- **The rows** are 60-tall white pills (28 apart at 390): a number in a 40 box (22 at 390), the title in Bricolage inside its own `containerType: inline-size` box at `u(rowT)` with `min(1em, calc(100cqi / ems))` on the span (the container's own font-size, not a `cqw`, since a nested container's `cqw` resolves against itself), and an artist chip (26 tall, `maxWidth: 55%`, ellipsis) coloured by the row's place: `[lilac, pink, yellow, cyan, magenta, ink, orange]` then repeating (pink and ink take white type), as the frame colours rows 1–12.
- **Title fit.** `vm.songs[].ems` is Bricolage's table at 1000 px times 1.13 (small type sets 11-12% wider than the table reads: measured 1.109–1.121), so a long word shrinks as the frame's does and never breaks inside the word.
- **The pager** is round 44 buttons (`paperArrow`), page pills, the active one ink; it draws only past twelve songs and the card's foot grows by it then (`pagerFoot`, 58.2 at 390; at 1440 the frame's pager stands at 856.3, 44 tall, 6 apart — checked with 37 songs). **With one page no pager and no seat for it**, so the seeded section is shorter than the frame by the pager's rows (994.5 / 994.97 / 1525.9 against the frame's card heights, desktop and tablet within 0.5, mobile frame minus the pager seat plus the 58.2 foot).
- **The search** is a white pill with a 2px ink ring (an inset `box-shadow`, since Blink floors fractional borders); on the canvas a span with the hint `Search songs or artists…` at `.45` (no `--ph`: the frame's grey), live an `<input>`.
- Empty and no-match: a white pill row, *No songs yet.* / *No songs match that.*

**Caps** (`limits.mjs repertoire --themes=6 --designs=0`, then `--check --extra-lines=songs.title`: 0 failing; `--seeds`: 0 over): heading 13 (1440 13, 768 13, 390 14), song title 17 (the seed's floor at 768; measured 66 / 15 / 19 with the extra line),
artist 22 (the chip ellipsises past it; 1440 holds 48), tags per song 4 at 18 characters. `FIELDS.repertoire` gains a `Paperback` row for `heading` and `songs.artist`; the title falls to Pop's 17. Layouts 2–4 stay Pop's rows.
`--extra-lines=songs.title` because the frame wraps a long title to a second line in its 60-tall row; run `--check` with the same flag.

**Proof.** `INLINE_OFF`: `Paperback.0.repertoire.songs.length`, and for the placeholder cards `.1` / `.3` `songs.length` and `.2` `songs.artist` (Pop's reasons). `inline-probe` repertoire at layouts 1–4, 1440 and 768: PASS (layout 1: 25 slots hit, 0 WRONG / MISSING / UNREACHED / UNLEDGERED).
`photo-probe` PASS (no photo slots), `focus-probe --prime --check` layouts 1–4 PASS (43 controls at layout 1). Live (`&live=1`, 37 songs): page 2 starts at 13, page 4 holds the 37th, a chip filters (nine *Pubs*, the pager gone), the search narrows to the matching songs and an unmatched one draws *No songs match that.*

## Paperback layouts 2–4: the caps (session 12, 2026-11-21, plans/paperback/layout-1.md)

- Layouts 2–4 are still Lime's / Pop's tree in Paperback's tokens. Every cap now has a `Paperback` row (none reads Pop's through `specAt`), measured by `limits.mjs repertoire --themes=6 --designs=1,2,3 --upright`, then `--check` (0 failing) and `--seeds` (0 over). **The rule is lower-only and never under the seed:** a number the placeholder card cannot bear came down to what it bears, and one that bore more was left, so no cap rose. Lowered (layouts 2, 3, 4, an index per layout; `–` not read): `songs.length` [–,14,–] → [–,10,–]; `heading` [25,17,10] → [22,17,10].
- **Rough edges (the seed is wider than the card holds a prose line of its length):** `songs.title` L3 and L4 (17 against 9 / 11). The cap holds at the seed, `--check` reads it as `(floor)`, and the card draws the seed as it does at the other templates. A layout-2–4 pass with frames replaces all of these.
