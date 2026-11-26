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

## Headliner · layout 1 (plans/headliner/layout-1.md, section 5, 2026-11-23)

Frames `1:4830` · `1:15602` · `1:16651` (1067 / 1067 / 1603 tall). An own tree, `HeadlinerRepertoire` (`EncoreSection.jsx`, after `HeadlinerGallery`), `HEADLINER_REP` its frame numbers (frame px verbatim at 1440 / 768 / 390, `u()` in cqw of a
`containerType: inline-size` stage, vertical insets in a child, `vm.pad = '0px <surplus>'`; `vm.titleWordEms` = `antonEms(w, -0.005)`). Dispatched in `Repertoire`'s `if (s.lattice || s.paperback || s.headliner)` **after the seam**: `active`, `filtered`, `shown`, `columns`, `labels`, `at`
and the search / chip / pager closures are `Repertoire`'s and go over in `g`, so the published controls are the shared seam in a new picture. **Four seam conditions now name Headliner** (the dispatch, `perPage` 12 at every width, `columns` two at 768, `pageWindow`'s keep-4 at all three widths: the 390 frame draws `1 2 3 … 20` too, so
it takes Lattice's arm, not Paperback's `!s.mob`). The head reads `g.title`, not `s.title`, so the live count follows a chip and the search (`37 Songs` → `18` → `7` → `0`, checked at three widths).

- **A cream band, no card** (Scheme 2, the root's own ground). Desktop and tablet **centre their content in a 1067 box** (161.74 + 743.52 + 161.74; 153 + 761 + 153: the media's 768 padded, this one does not), 390 pads 58: `minHeight` plus centring over a 96 / 77 / 58 padding, so more songs grow the section.
- **The head is the count and an empty box beside it** (`1:4841` 239.67 x 82.06, 147.72 derived at 768, `1:16662` 141.02 x 128.69), a flex row on a 28 gap, bottom-aligned. The frame's two-line `240 / SONGS` at 768 and 390 is **that box squeezing the count, not a forced break and not a measure of the column**
  (`240 SONGS` sets 378 at 93 and 244 at 60), so the tree keeps the box as an empty spacer: at 390 it is `flex: none` and the count shrinks to the 172.97 left (height 128.69, which seats the count 11.09 down and makes the section 1603); at 768 the count's box is the frame's 254.55 (`hMax`) and the search takes the rest of the row
  (261.5); at 1440 `hMax` is 670, the room the 380 search leaves, and the count (608.56) stands on one line. The first cut let the left column flex-shrink to its min-content and set the search 287 wide, not 261.5: the frame's left is not clamped there, so `left` is `flex: none` and the count carries the measure. The word fit is `min(u(h2), u(fitW) / ems)`, `fitW` 850 / 316 / 173.
  The eyebrow `— REPERTOIRE` has no field: its 31.75 is padding.
- **Rows** are `1 + 16 + title box (32 / 29 / 27) + 16` = 65 / 62 / 60 on `HL_GAL_HAIR` (`rgba(30,30,30,.18)`) rules, contiguous at 1440 and 768 and **28 apart at 390** (an 88 pitch, a rule on each; the list's own foot rule closes it), in a grid (`gridAutoFlow: column`, `repeat(n, auto)` rows) so the two columns' rules stay level when a title wraps. Number Anton 15 in `s.text3` (maroon) in a 40 box, a 14 gap (10 at 390), the title Anton 30 / 27 / 25 in `s.activeFg` (`paddingTop` 2 inside the box, the frame's text offset) and the artist Inter Tight 15 at -0.015em in `s.text1` flush right. Both clip with an ellipsis at the row's width, and **an artist too long to stand beside its title drops under it** (JP-136's rule, a flex wrap), so a long pair never crushes the title.
- **The pager** draws only past twelve songs and **holds no seat** (every template's rule): the seeded twelve leave the section 74 shorter than the frame at 390 (1529.1 against 1603) and the content 37 lower than the frame's at 1440 and 768, where it is centred in the 1067. With 120 songs the pager stands where the frame's does (1440: top 861.9 against 861.26, 44 squares on a 50 pitch; 390: the five middle buttons 43.6 wide across the 342). The arrows are the frame's 16 x 14 line arrows at stroke 2.4 (the gallery's), the current page a filled `s.text1` square with sand (`s.onScheme[1].bg`) type.
- **Chips** are 40 tall, 1 px `s.text1` outlines on a 999 radius, Anton 15, padding 18 (the frame's 58.1 / 97.1 / 67.5 / 99.8 widths to 0.4 on the 1.22-scaled border), the active one filled `s.text1` with sand type, an 8 gap (a second row at 390, where `Birthdays` wraps as the frame's does).
- **The search** is a square 1 px `s.text1` box, 52 tall, 380 / 261.5 / full wide, Inter Tight 16 at -0.015em; its hint is the placeholder at the global .45 and the canvas span the same (see the user call below).
- **Caps** (`limits.mjs repertoire --themes=7 --designs=0`, then `--check` 0 failing and `--seeds` 0 over): `heading` **8** (the seed's floor; the probe reads 10 / 14 / 6, a seventh letter shrinking the count at 390, which the word fit allows), `songs.title` **17** (the seed's floor: 37 / 13 / 17 with an overlap at 390; a longer title ellipsises), `songs.artist` **29** (78 / 29 / 32), tags 18 x 4 held by the shared rows (`songs.tags[]` reads 400 / 197 / 47, `tags#` 5 at 390). Layouts 2-4 are Grunge's rows, written out (`heading` `Headliner: [8, 38, 25, 20]`, title `[17, 26, 23, 26]`, artist `[29, 25, null, 42]`, `length` `[null, null, 22]`, `sets.mood` `[null, null, 17]`).
- **Ledger**: `INLINE_OFF` `Headliner.0.repertoire.songs.length` (only layout 3 prints a song's length). `reach.mjs 7`: the repertoire's `in` rows do not move (`sets` and `songs.length`, layout 3 alone).
- **Proof.** `inline-probe --theme Headliner --layout 1 --cat repertoire --width 1440,768 --check`: PASS (25 slots hit, 0 WRONG / NOT-RESTORED / MISSING / UNREACHED / UNLEDGERED, 0 dead click). `photo-probe` `--check`: PASS (no photo slots). `focus-probe --prime --check`: 43 controls, 0 failing, both widths. Live (`&live=1`, 37 songs, three widths): page 2 starts at 13, page 4 holds the 37th, a chip filters (Pubs: 18, two pages) and the head count follows, a search narrows (`art 3` → 7), an unmatched one leaves no row, no sideways scroll, no console error.

## Backline · layout 1 (plans/backline/layout-1.md, section 5, 2026-11-24)

Frames `1:6031` · `1:17818` · `1:19154` (1067 / 1067 / 1532.94 tall). An own tree, `BacklineRepertoire` (`EncoreSection.jsx`, after `BacklineGallery`), `BACKLINE_REP` its frame numbers
(frame px verbatim at 1440 / 768 / 390, `u()` in cqw of a `containerType: inline-size` root, vertical insets in a child, `vm.pad = '0px <surplus>'`; the Backline line in `EncoreBuilder.jsx` now names
`bio`, `media`, `gallery` and `repertoire`). Dispatched in `Repertoire`'s `if (s.lattice || s.paperback || s.headliner || s.backline)` **after the seam**, so the search, the chips, the pager and the
count (`g.title`, which follows a chip and the search) are `Repertoire`'s, handed over in `g`. **Four seam conditions name Backline** (the dispatch; `perPage` 12 at every width; `columns` two at 768;
`pageWindow`'s keep-4 at all three widths: the 390 frame draws `1 2 3 … 20` as the others do). **The 390 master is one column of twelve rows** (298 wide, 28 between, a 342 x 1073 card); 768 keeps two columns of 297.

- **A dark olive band** (Scheme 2, the root's own ground, olive grain) **under a torn paper head**: `BacklineTear tear="repertoire"` in `s.onScheme[1].bg`, `ground="paper"`, 88 tall and 1 px above the band, `u(1440)` wide
  and clipped at the narrow widths. **The contour is a fifth traced path** (`BACKLINE_TEARS.repertoire`, 7.0 KB). The section-1 correlation test on the master's 88 px raster against the four held:
  **the repertoire's strip is the head's, shifted 148 px** (`rep[x] = head[x - 148]`, 1.000 over 1,292 columns) and the media's is the head's shifted the other way (`media[x] = head[x + 498]`): the head, media and
  repertoire rasters are windows of one longer torn strip, and the gallery's and the form's match nothing (best 0.70 and 0.74). The new path is traced whole (per-column lowest opaque row, RDP at 0.5 px) rather than composed from the
  head's, so the kit stays five self-contained paths; **a later section (the map, pricing, calendar, testimonials, footer) should run the same test against all five first**, since two of the three may reuse one and a shifted window costs no bytes.
  The paper is the gallery's (`#EAECD7`, sampled), the tone `paper`.
- **The content is centred in a 1067 box** (the bio's and gallery's rule: padding 112 / 90 / 67 on the 1440 / 768 / 390 frames, a `minHeight` of 1067 / 1067 / 1532.94 so more songs grow the section) and **holds no seat for what it
  does not draw**: `04 ┈┈ REPERTOIRE`, `SETLIST — KAI MERCER — GORILLA, MCR`, the boxed `SIDE A / SIDE B` and `encore: whatever they shout loudest` have no field (call 1 A), so their space is the card's padding (88 above the
  rows, 64 / 64 / 78 below), which is the frame's card height. With one page there is no pager and no seat for it, so the seeded twelve stand 37 px lower than the frame's 240-song picture at 1440 and 768 (centred) and the section
  is the frame's height at 390.
- **The head** is the count in TT2020 (`240 ` cream, the last word, `songs.`, in the tail colour: **moss `s.chips[2].bg` at 1440, mustard `s.activeBg` at 768 and 390**, the frames' two readings, as the media's `your ear.`) at 123.84 / 77 / 50,
  tracking -0.045em, lower-case, wrapping in the room the search leaves and fitted to its widest word (`vm.titleWordEms`, `ttEms`; the word fit is `min(u(h2), u(fitW) / ems)`, `fitW` 938 / 349 / 342). The count wraps to `240 / songs.` at 768 (line height 0.955, so the frame's 73.5 pitch;
  the head's padding 22.44 where the others' is 30.94, so the row keeps the frame's height) and stays one line at 1440 and 390. At 390 the search drops under the count (full width), the count's seat lifted 2.5 px to the frame's.
  **The heading is the count unless typed** (`fieldSeed`'s songs branch, `vm.title`, both through `repCountWord(themeName, design)`: Backline's layout 1 is `songs.` with the full stop, Paperback's `songs`, every other `Songs`).
- **The search** is a 50-tall box with the frame's underline, **2 px on and 1 px off, 1 px tall** (a repeating gradient: the frame's dash pattern, which CSS `dashed` and `dotted` both draw differently) in the cream, the text 16 in; the hint is
  the placeholder at the global .45 (no `--ph`; the frame's `#757575` on the olive is a user call, below) and the canvas a span of the same hint at the same opacity. 380 wide at 1440 and 768 (`flex: 0 1 380`, the same shrink the frame's row gives it), full width at 390.
- **Chips** are 42-tall square 1 px cream outlines (Archivo Backline 13, padding 16, a 6 gap), the active one a filled cream with ink type; **the pager** is 44 squares on a 6 gap (the frame's 16 x 14 line arrows at stroke 2 and the page numbers; at 390 the numbers stretch across the 342), the current page filled cream; it **draws only past twelve songs**.
- **The published pager holds the tallest page** (JP-172's Backline half, 2026-11-26; QA: at 1440, page 3 drew the pager 127 px higher, since the 1067 box re-centres a shorter card). `Repertoire`'s seam builds a page's columns in `columnsOf(p)` and hands
  `g` the page (`pg`) and, live and past one page, `sheets` (every page's columns of the **filtered** list; every layout-1 design reads it since the same day, below). Backline lays them in one grid cell, the others `visibility: hidden` and `aria-hidden`. The 390 title
  back-shift (`below`) restarts on each sheet. The canvas and a one-page list render as before; 60 songs make at most five sheets. Walked with 13, 25 and 60 songs, and a wrapping title on the last page, at three widths: the root's height and the
  pager's offset are the same on every page. **A named canvas / live difference:** a published list whose later page is taller than its first opens taller than the canvas (at 768, 25 songs: 1191.38 against 1141.38). **Not changed:** a chip or a search still changes the card's height, and the box re-centres it, so the head can move while a visitor filters.
- **The card** is `BL_TICKET` paper (`#E0DFC2`, the media ticket's) turned **-0.5 degrees** (measured off the edges: the 390 master's left edge runs 20 to 29 over 1,035 px, which ours matches to the pixel), the frames' two shadows, half-strength paper grain, two `BacklineTape` strips in the card's own
  coordinates (centres 153.94 / 1161.23 at 1440, 110.1 / 591.56 at 768, 83.94 / 251.2 at 390, 4 down, turned -5 and +4). Rows are 599 / 297 / 298 wide in a column-flow grid (`gridAutoFlow: column`, `repeat(n, auto)`), so a wrapped title keeps the two columns' rules level; a 56 gap between the columns at 1440 and 768, a 28 gap between rows at 390.
- **A row**: the number (Archivo Backline 12, `s.onScheme[1].text3`, olive, in a 52 / 52 / 35 column), the title TT2020 28 / 25 / 23 at -0.045em in `text1`, the artist TT2020 14 at -0.02em flush right, on a dashed `BL_BIO_RULE` top border (11 / 11, 9.41 / 12.59, 9.4 / 12.6 padding). **A single word that would outrun the room the artist leaves it
  steps down a size** (22 / 22 / 20: the 768 master's *Superstition* and *September*, the 390's *Superstition*), read from `vm.songs[].ems` / `.aems` (TT2020 is monospaced: 0.502 em a title letter, 0.527 an artist letter at -0.02; `sectionVm` writes them, since `EncoreSection` imports nothing from `data.js`); **a phrase wraps** in what the artist leaves it (*Mr. Brightside* is two lines at 768 and 390, one at 1440), and the artist's own room is capped at 62 % of the row so a long one ellipsises instead of crushing the title.
  **At 390 the frame stands every title on one x** (78 to 79 over 860 px) while the numbers and artists turn with the card, so a title there is moved back by what the card's turn carried it (`tan(0.5deg)` of its row's distance below the first, the rows' heights estimated from the line count): without it the last rows' titles sit 7 px right of the master's.
- **Measured against the three masters** (ink boxes of the same copy in the frame's and our renders, 240 songs): the title, artist and number boxes within 1 px at 768 and 390 and within 1 to 2.5 px at 1440; the head's count within 1 px (768's first line 2 px high: a line-height rounding); the chips, the pager squares and the search underline to the pixel; the root 1067 / 1067 / 1532.94.
- **Caps** (`limits.mjs repertoire --themes=8 --designs=0 --extra-lines=songs.title`, then `--check` 0 failing and `--seeds` 0 over): `heading` **13** (15 / 19 / 13: the count wraps and shrinks), `songs.title` **18** (60 / 18 / 20 with the extra line: the frame wraps a phrase to two lines, a third fails at 768), `songs.artist` **20** (46 / 20 / 22: the room the 62 % rule leaves),
  tags per song 3 at 18 (`tags#` reads 12 / 6 / 3: four chips with `All` fill the 342 at 390, a fifth wraps; `Backline: [3, 4, 3, 3]` as Lattice's). `FIELDS.repertoire` gains a `Backline` row for `heading` (`[13, 25, 17, 10]`, layouts 2–4 Pop's), `songs.title` (`[18, 17, 17, 17]`), `songs.artist` (`[20, 25, null, 19]`) and the tag count; `length` falls to Pop's.
- **Ledger**: `INLINE_OFF` `Backline.0.repertoire.songs.length` (only layout 3 prints a song's length). `reach.mjs 8` (the scratch copy, `ONLY=repertoire`, 288 renders): the repertoire's `in` rows do not move (`sets` and `songs.length`, layout 3 alone).
- **Proof.** `inline-probe --theme Backline --layout 1 --cat repertoire --width 1440,768 --check`: PASS (25 slots hit, 0 WRONG / NOT-RESTORED / MISSING / UNREACHED / UNLEDGERED; **one reported dead click, the heading's `12`**, which is the seeded page's twelfth row number: the heading `12 songs.` begins with the same two characters, so the probe pairs a node that prints a hit slot's words with the slot that does not own it. With any other count it does not exist; the click opens the row-number node's nothing, as the frame's row number is markup). `photo-probe`: not run (no photo slot). `focus-probe --prime --check`: 43 controls, 0 failing, both widths.
  Live (`&live=1`, 240 songs, desktop and mobile): page 3 starts at 25, a chip filters (Pubs: 100, nine pages) and the count follows, a search narrows (`queen`: 20, two pages), an unmatched one draws *No songs match that.*, no console error.


## Inline editing — a repeated set line (JP-173, 2026-11-26)

Layout 3's `mood · length` line was dead on the canvas when a set past the third card repeated a drawn set's line. The fix is the events map's, shared through `LINE_PAIRS` and `pairLine` ([map.md](./map.md), *a pair line repeated past the pager*).

## The published pager on every template (JP-172, 2026-11-26)

Layout 1's other eight designs hold the tallest page as Backline does, through `heldPages` ([map.md](./map.md), *The published pager on every template*). `Repertoire`'s seam builds `sheets` once, above the template branches: Lattice's, Paperback's and Headliner's blocks take it in `g`, and the shared Lime tree and Retro's block read it directly. Each draws one page through one function (`sheet` / `songGrid`), so a sheet's own row count, border and column gap travel with it. `sheets` is the **filtered** list's, so a chip or a search resizes the held stack and returns to page 1. The canvas and a one-page list are the same markup as before.

Walked with 25 and 60 songs, long copy on the last song, and long copy on songs 13 to 24 of 25 (`&noclamp=1`), at three widths: the pager's top is the same on every page, and the root's height too, bar the 768 pager wrap, since fixed (below). Before, a short last page drew the pager 125 to 1100 px higher (the most on the 390 own-tree lists), and a taller later page moved it further (Lattice's 390: 2090). Chips and search checked live.

**Canvas / live difference**: a published list whose later page is taller than its first opens taller than the canvas (390, 25 or 60 songs: 15 to 19 px on the older five, 44 on Lattice).

**The sideways faults seen on that walk, fixed the same day** (layout 1 only; the map and the repertoire's other layouts take `pageWindow` and `Pager` as before). Both came from a row that did not draw the same on every page: Paperback's next arrow was clipped on page 3 of 5 at 390 (`1 … 3 … 5`, 344 px in 294), Lime, Grunge and Pop wrapped at 768 on pages 4 to 7 of 10 (+62 px, the next arrow 269 sideways), and the arrows shifted 9 px at 390 on the older five, 31 px at 768 on all five at ten pages, and under 1 px on Paperback.

- **Rows of four or five numbers hold page 1's label count** (`pageWindow`'s `hold`, passed by this seam alone). With a gap on both sides it drops the page before the current one: ten pages at 768 read `1 … 4 5 … 10` where they read `1 … 3 4 5 … 10`. That ends the wrap and the 31 px shifts.
- **Rows of three numbers (390) keep their labels.** 1, the current page, the last and two gaps are five labels to page 1's four, so the geometry holds the arrows. **Retro and the shared Lime tree** pass `Pager` a `pin` (live, 390): page 1's button count. The two arrows keep the width an equal split gives them there, and the pages share the rest. **Paperback**'s live number pills at 390 may shrink: 44 wide while they fit, 34 with five of them. The arrows stay 44.
- **Paperback wider than 390**: a pill sizes to its glyph, so each live pill takes its width from the label page 1 draws in the same seat (an unseen copy) and draws its own label over it.

**The canvas is unchanged** (every `#root` `innerHTML` identical: repertoire layouts 1 to 4 and map layouts 1 to 4, nine templates, three widths), and the published page 1 draws the canvas's pager (135 pagers compared, largest box difference 0.02 px). The only live first paints whose markup moved are this layout's, on the first five templates at 390 and Paperback at every width.

**Proof**: real clicks in `preview.html?cat=repertoire&arch=0&live=1`, 13, 19, 25, 31, 37, 43, 49, 55 and 60 songs (the panel's cap) at three widths, all nine templates, by next to the end, prev back and every number: both arrows' x, y, width and height are the same on every page, no button leaves the card, and the row and root heights hold. 25 and 60 also at 360 and 414 (`&fw=`): arrows still. Two pages at 390 (7 and 12 songs, the first five templates) too, page 1 matching the canvas exactly.

**The other callers** take the same markup as before. At their longest lists, repertoire layout 2 does not move and neither does map layout 1 (27 renders: 18 by the arrows; Paperback's, Headliner's and Backline's 9, which draw numbers alone, by the numbers). Map layout 2's pager does move, vertically: [map.md](./map.md), *Seen: layout 2's pager rides a short page*.
