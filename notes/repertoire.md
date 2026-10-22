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
