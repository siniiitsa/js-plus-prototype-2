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
