# The bio — working notes

Created on 2026-10-13 for the character-limit pass (`plans/char-limits.md`, session 2). The
JP-090 bullet came over word for word from `notes/templates.md`. "Above" and "below" may point
into `CLAUDE.md` or another `notes/` file.

- **The bio's layout-1 reference line is the artist's** (JP-090, user call, 2026-09-30).
  `FIELDS.bio.refLabel`, *Reference line*, `in: [0]`, is seeded
  with the whole `[ 001 ] Structure · Bio_01` that every template's frame types under the
  heading (Editorial's `964:58613`, Retro's `964:58577`), brackets and index included, since the
  `001` is an index and not a count. `vm.bioRef`, uncased: all three bodies upper-case it in CSS
  (the widened block's eyebrow for Grunge and Editorial and its Space Mono line for Pop, Body/SM
  for Lime, and Retro's flank `label()`). Emptied, an empty `<span>` keeps the desktop heading column's three
  rows, so the heading does not slide to the foot of its `space-between` column (it moves by
  half the line). The narrow columns are gapped instead, so there the seat would be a dead band
  of the gap and the line simply goes (Retro's 768 is ungapped and keeps it). A typed line wraps,
  inside a word too, where the seed's `nowrap` let an 85-character line run 200px past a 390 page.
- **Every bio text field has a character cap** (`plans/char-limits.md`, session 2, the user's
  rules of 2026-10-13). The caps are `chars` on `FIELDS.bio`, per template and design, measured
  by `scripts/limits.mjs bio`. The readout is `plans/char-limits/session-2-probe.md`.
  - **Labels and headings** take the measured cap, usually set by 390 or by layout 3's composed
    1440 column.
  - **Pills and buttons** take `min(measured, max(2 × seed, seed + 8))`: the pill `tag` 18, the
    button `cta` 16 and layout 4's Listen `cta2` 14. That matches the header's Listen.
  - **The two paragraphs** came back open at 400 at every width, so they take 3 × the seed,
    rounded down to 10: `para1` 390 and `para2` 340.
  - The header's keys as the bio prints them (`kicker`, `location`, the tags, the name and the
    seal) are `IDENTITY_CHARS.bio`, from session 1.
- **The heading is fitted to its widest word where 1440 stacks it a word a line**
  (`plans/char-limits.md`, session 12; the user's call of 2026-10-13 left it to the sweep).
  These are Lime's, Editorial's and Pop's layout 1 and Pop's layout 4. At the token a
  seven-letter word ran past the flank (Lime, Pop layout 1), under Editorial's arch, or into Pop's
  layout-4 dot grid, and no length cap could hold that. Now:
  - **Layout 1** sets the h2 at `min(dispLg, 100cqi / vm.titleWordEms)` on the flank, an
    `inline-size` container (the header name's JP-092 rule, `navFace`'s ems, `faced()` outside
    the fit). Grunge has no ems table and no fit; its seeded room holds.
  - **Editorial's seed binds.** Its Gloock *ROOM.* at the token, 93.8px, ran 59px past the flank
    and about 19px into the seal's disc on the seeded 1440 page. The fit sets it at 77.3px, 0.82
    of the token, 7px clear of the seal. That is the one seeded change, desktop only.
  - **Pop's layout 4** was already fitted, to the frame's 572.9 measure, which lays over the dot
    grid: *KESTREL* ran 16px into the dots. At 1440 the fit's measure is now the room left of the
    grid, 533.97 (437.9px). The seed's widest word takes 348 of it, so it does not bind.
  - **The caps**: the head may shrink to 75% of the seed's size there (the name's floor,
    `FLOOR_AT` in `limits.mjs`), and 768 and 390 now bind: Lime 19, Editorial 15, Pop 17 at
    layout 1 and 19 at layout 4. Editorial's 1440 reads 14 under the floor, so it reports
    `floor`; with no floor it reads 21.
- **Retro's Performing since is 9 at layout 3**, the seed's own "June 2021". In the composed
  1440 column the ID card's stat cell is 80px wide, so a tenth character wraps the value out of
  its cell. So "March 2019" is refused, and typing "September 2021" stops at "September". Lime
  takes 22 there, and Grunge, Editorial and Pop take 20. Layout 4's overlay line takes 31 on
  every template.
- **The ID card's labels draw two lines by design.** `sectionVm` breaks each one before its
  last word (`breakLast`), so the first line is the one that binds. *Performing since:* measured
  14 at 768 (and in the column on Retro and Lime, at 390 on Retro, Grunge and Pop), under its own
  17. So its cap is the seed's 17, and `--check` reports `floor`. *Current role:* takes 14 and
  *Based in:* takes 16–19. With caps this close to the seeds, the 80% counter is already showing
  at the seed (`17 / 17`, `13 / 14`). That is the mechanism working, not a bug.
- **Retro's layout 4 draws no Genres line at 390** (`!s.mob`, `EncoreSection.jsx`), so its
  `tagsLabel` cap of 58 comes from 1440 and 768. The one-word labels, *About* (48–59) and
  *Genres* (49–58), take their measured numbers. Their seats are stretched blocks, so the probe's
  `×grow` reads 1.

## Inline editing (plans/inline-edit-all.md, Retro layout 3, 2026-10-22)

Layout 3's `aboutLabel` is printed `[ About ]` (three text nodes of one span): a `*.2.` part row, box on the word, brackets left out.

## Inline editing (plans/inline-edit-all.md, Retro layout 4, 2026-10-22)

Layout 4's overlay card prints `Performing since <date>` in one span and the Listen link beside its arrow (`Listen ↗`), so `since` and `cta2` are `*.3.` part rows (`INLINE_PART`, design index 3), box on the date and on `Listen`; the literal *Performing since* and the `↗` open nothing. The card's name, role line and six tag chips are the header's identity keys with no bio field: unhit, as at every layout (the open cross-section question).

## Inline editing (plans/inline-edit-all.md, Lime layout 4, 2026-10-22)

The `*.3.` part rows (`since`, `cta2`) carry over and hit on Lime. `tagsLabel` is **not read** at Lime's layout 4 (`in: { Lime: [2], … }`), so the overlay card draws the six chips with no *Genres* line and the field is outside the universe, unlike Retro's layout 4, which hits it.
