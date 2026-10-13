# Character limits — session 6 probe readout (the gallery's own fields)

`scripts/limits.mjs gallery` output, 2026-10-13, every template, design and width, for the
gallery's own text keys (`--keys=kicker,heading,railLabel,backLabel,sourceLabel`). The three
social addresses are `url` fields and are skipped. `IDENTITY_CHARS.gallery.title` is session 1's
and was not re-measured: `--check`'s `who.*` rows re-verify it. Each cell is the largest passing
length at that surface, then the test the next length failed (none: a sample failed it, `400+`:
open), then `×grow`, the seat's width at the cap over the seed's. *probe* is the minimum over the
surfaces. The cap written into `data.js` applies the session's rules to it (`plans/char-limits.md`,
*Session 6*).

- This is the second run, after the first of this session's two probe fixes (*Session 6*). The
  second, a literal's seat read as `unseen`, came later, for `--check`. The first fix: a drawing or a turned picture is met
  by its painted pixels, not its bounding box. The first run read Pop's layout-4 kicker at 33
  and its heading at 9 (the smiley sun's turned square), and Editorial's layout-1 rail label at
  13 (the tilted tape's box). It read 39, 20 and 32 under the fix. Pop's layout-1 heading, where
  the asterisk really does meet the head, still reads 10. That is the positive control.
- **Width-gated fields.** `railLabel` prints at layout 2 at 768 alone, and `sourceLabel` at
  desktop alone (the narrow source rows are icon-only tiles). Their other surfaces are `unseen`
  (`–`), which is correct.
- **Retro's `sourceLabel` probe column reads 1.** That is not a cap. Its seed *Gallery* is also
  Retro's rail wordmark, a literal, which the seed's render seats at 768 and 390, where the row
  prints no label. Those surfaces are `unseen`, and `rules.mjs` drops them. The cap is
  desktop's 42.
- `IDENTITY_CHARS.gallery.title` (session 1's) was re-checked by `--check` and lowered at
  layout 2, from 28–29 to 26–27. Its 390 caption line ellipsizes there, which session 1's box test
  missed (*Session 6*, judgement 6).
- `backLabel` is sized (the bio's Listen link's precedent): 34, under every measure here (48–52).
- The heading's floors are its seed: Editorial's and Pop's layout 1 (16: line packing, and Pop's
  asterisk) and Editorial's layout 4 (20: the head's widest-word fit shrinks at the first
  seven-letter word).

| field | template | layout | seed | 1440 | 768 | 390 | 1440 column | probe |
|---|---|---|---|---|---|---|---|---|
| gallery.backLabel | Retro | 1 | 17 | 80 lines ×4.7 | 96 lines ×5.65 | 48 lines ×2.83 |  | 48 |
| gallery.backLabel | Lime | 1 | 17 | 63 ×3.62 | 95 lines ×5.51 | 52 lines ×3.02 |  | 52 |
| gallery.backLabel | Grunge | 1 | 17 | 68 ×3.9 | 95 lines ×5.51 | 52 lines ×3.02 |  | 52 |
| gallery.backLabel | Editorial | 1 | 17 | 63 ×3.62 | 95 lines ×5.51 | 52 lines ×3.02 |  | 52 |
| gallery.backLabel | Pop | 1 | 17 | 86 lines ×5.05 | 96 lines ×5.65 | 48 lines ×2.83 |  | 48 |
| gallery.heading | Retro | 1 | 16 | 20 ×1 | 43 lines ×1 | 37 ×1 |  | 20 |
| gallery.heading | Retro | 2 | 16 | 104 ×7.03 | 39 box ×2.68 | 27 box ×1.86 |  | 27 |
| gallery.heading | Retro | 3 | 7 | 30 lines ×1 | 25 ×1 | 18 ×1 |  | 18 |
| gallery.heading | Retro | 4 | 20 | 24 ×1 | 25 ×1.22 | 37 ×1.01 |  | 24 |
| gallery.heading | Lime | 1 | 16 | 19 lines ×1 | 19 lines ×1 | 19 lines ×1 |  | 19 |
| gallery.heading | Lime | 2 | 16 | 92 box ×6.22 | 35 box ×2.42 | 26 ×1.83 |  | 26 |
| gallery.heading | Lime | 3 | 7 | 28 lines ×1 | 24 lines ×1 | 18 lines ×1 |  | 18 |
| gallery.heading | Lime | 4 | 20 | 23 ×1 | 24 lines ×1.19 | 33 ×1 |  | 23 |
| gallery.heading | Grunge | 1 | 16 | 29 lines ×1 | 42 lines ×1 | 40 lines ×1 |  | 29 |
| gallery.heading | Grunge | 2 | 16 | 102 box ×6.89 | 38 box ×2.59 | 26 ×1.83 |  | 26 |
| gallery.heading | Grunge | 3 | 7 | 32 lines ×1 | 27 lines ×1 | 23 ×1 |  | 23 |
| gallery.heading | Grunge | 4 | 20 | 24 ×1 | 27 lines ×1.31 | 25 lines ×1.23 |  | 24 |
| gallery.heading | Editorial | 1 | 16 | 14 ×1 | 30 lines ×1 | 14 ×1 |  | 14 |
| gallery.heading | Editorial | 2 | 16 | 102 box ×6.89 | 38 box ×2.59 | 26 ×1.83 |  | 26 |
| gallery.heading | Editorial | 3 | 7 | 19 lines ×1 | 15 ×1 | 11 ×1 |  | 11 |
| gallery.heading | Editorial | 4 | 20 | 6 shrink ×0.95 | 30 lines ×1 | 20 lines ×1 |  | 6 |
| gallery.heading | Pop | 1 | 16 | 10 overlap ×1 | 30 overlap ×1 | 31 lines ×1 |  | 10 |
| gallery.heading | Pop | 2 | 16 | 103 box ×6.92 | 39 box ×2.66 | 27 box ×1.85 |  | 27 |
| gallery.heading | Pop | 3 | 7 | 26 ×1 | 23 lines ×1 | 15 ×1 |  | 15 |
| gallery.heading | Pop | 4 | 20 | 23 lines ×1 | 32 ×1 | 20 ×1 |  | 20 |
| gallery.kicker | Retro | 1 | 5 | 72 lines ×1 | 86 lines ×1 | 44 lines ×1 |  | 44 |
| gallery.kicker | Retro | 4 | 5 | 49 lines ×9.15 | 98 lines ×18 | 55 ×10.06 |  | 49 |
| gallery.kicker | Lime | 1 | 5 | 68 ×1 | 98 lines ×1 | 55 ×1 |  | 55 |
| gallery.kicker | Lime | 4 | 5 | 51 lines ×9.41 | 98 lines ×18 | 55 ×10.06 |  | 51 |
| gallery.kicker | Grunge | 1 | 5 | 71 ×1 | 98 lines ×1 | 55 ×1 |  | 55 |
| gallery.kicker | Grunge | 4 | 5 | 51 lines ×9.41 | 98 lines ×18 | 55 ×10.06 |  | 51 |
| gallery.kicker | Editorial | 1 | 5 | 68 ×1 | 98 lines ×1 | 55 ×1 |  | 55 |
| gallery.kicker | Editorial | 4 | 5 | 51 lines ×9.41 | 98 lines ×18 | 55 ×10.06 |  | 51 |
| gallery.kicker | Pop | 1 | 5 | 77 lines ×1 | 86 lines ×1 | 44 lines ×1 |  | 44 |
| gallery.kicker | Pop | 4 | 5 | 39 overlap ×7.28 | 82 overlap ×15.23 | 44 ×8.25 |  | 39 |
| gallery.railLabel | Retro | 1 | 7 | 79 lines ×11.26 | 94 lines ×13.32 | 49 lines ×4.54 |  | 49 |
| gallery.railLabel | Retro | 2 | 7 | – | 70 ×9.56 | – |  | 70 |
| gallery.railLabel | Lime | 1 | 7 | 65 ×8.45 | 98 lines ×12.76 | 55 ×7.24 |  | 55 |
| gallery.railLabel | Lime | 2 | 7 | – | 64 ×8.81 | – |  | 64 |
| gallery.railLabel | Grunge | 1 | 7 | 71 ×9.33 | 98 lines ×12.76 | 55 ×7.24 |  | 55 |
| gallery.railLabel | Grunge | 2 | 7 | – | 70 ×9.65 | – |  | 70 |
| gallery.railLabel | Editorial | 1 | 7 | 39 overlap ×5.16 | 66 ×8.58 | 32 ×4.28 |  | 32 |
| gallery.railLabel | Editorial | 2 | 7 | – | 70 ×9.65 | – |  | 70 |
| gallery.railLabel | Pop | 1 | 7 | 85 lines ×12.12 | 94 lines ×13.32 | 49 lines ×6.94 |  | 49 |
| gallery.railLabel | Pop | 2 | 7 | – | 70 ×9.65 | – |  | 70 |
| gallery.sourceLabel | Retro | 1 | 7 | 42 ×1 | – | – |  | 1 |
| gallery.sourceLabel | Lime | 1 | 7 | 49 ×1 | – | – |  | 49 |
| gallery.sourceLabel | Grunge | 1 | 7 | 58 ×1 | – | – |  | 58 |
| gallery.sourceLabel | Editorial | 1 | 7 | 37 box ×1 | – | – |  | 37 |
| gallery.sourceLabel | Pop | 1 | 7 | 50 box ×1 | – | – |  | 50 |
