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
- **The heading is word-bound at 1440 in four designs** (open, the user's call). These are
  Lime's, Editorial's and Pop's layout 1 and Pop's layout 4. At 1440 each stacks the heading
  one word to a line beside the photograph, at display size (107px under Lime, 66px under
  Pop at layout 1). "Reads", "the" and "room." fit there,
  but a seven-letter word does not. At the seed's own size, "KESTREL" runs under the arch
  (Editorial) or past its column (Lime, Pop layout 1), or into the dot grid (Pop layout 4).
  The probe read 5–6 characters at those four surfaces, because every sample opens with a
  seven-letter word. That number is the widest word, not a length. The cap is the seed's 15
  (the floor rule), and `--check` reports it as `floor`. **A cap cannot hold this seat**: a
  15-character heading with a word longer than about six letters still overruns at 1440. The
  fix would be a widest-word fit, the header's JP-092 / JP-102 / JP-109 shape
  (`vm.cardNameEms`, `titleWordEms`). That touches `EncoreSection`, so it is outside the
  character pass. In the same four designs, 768 and 390 allow 15–24 characters.
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
