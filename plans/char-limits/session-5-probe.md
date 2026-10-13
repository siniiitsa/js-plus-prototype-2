# Character limits — session 5 probe readout (the repertoire's own fields)

`scripts/limits.mjs repertoire` output, 2026-10-13, every template, design and width, for the
repertoire's own text keys and columns (`--keys=heading,songs.title,songs.artist,songs.length,
songs.tags[],songs.tags#,sets.mood,sets.length`). The repertoire prints no header key, so it has
no `who.*` row. Each cell is the largest passing length at that surface, then the test the next
length failed (none: a sample failed it, `400+`: open), then `×grow`, the seat's width at the cap
over the seed's. *probe* is the minimum over the surfaces; the cap written into `data.js` applies
the session's rules to it (`plans/char-limits.md`, *Session 5*).

- This is the third run, after two probe fixes (*Session 5*): an overlap box that encloses all of
  the seat's ink is a frame round it (Editorial layout 2's dashed chip capsule read `tags[]` at 1),
  and a box test tagged by kind, `past` or `cut` (the set line's nowrap span overshoots its own box
  at the seed, which hid its clip: `sets.mood` read 21–25 where the line clips at 16–22).
- `songs.tags#` draws its items from the seeded tags first (*Weddings, Pubs, Birthdays*), so it
  reads how many distinct chips the row holds. Counts 1–3 all draw those three, the seed's own
  render, so a reading under 3 (layout 3, Editorial's layout 1) is 3: the fourth distinct tag fails.
- `sets.mood` and `sets.length` are each read beside the other's seed. They share one line, and
  the caps written are a joint split measured with both at their caps (*Session 5*, judgement 3).
- `songs.artist` at layout 3 and `songs.length` at layouts 1, 2 and 4 are `unseen` and left out,
  as are `songs.tags[]` / `#` at layout 4, which draws no chips.
- The column *seed* is the longest seeded row of that design (17, *Don't Stop Me Now*; 18, *Earth,
  Wind & Fire*).

| field | template | layout | seed | 1440 | 768 | 390 | 1440 column | probe |
|---|---|---|---|---|---|---|---|---|
| repertoire.heading | Retro | 1 | 8 | 30 lines ×3.45 | 18 page ×2.07 | 14 ×1 |  | 14 |
| repertoire.heading | Retro | 2 | 8 | 73 ×1 | 48 ×1 | 31 ×1 |  | 31 |
| repertoire.heading | Retro | 3 | 12 | 30 lines ×1 | 25 ×1 | 20 ×1 |  | 20 |
| repertoire.heading | Retro | 4 | 10 | 27 ×1 | 22 ×1 | 17 lines ×1 |  | 17 |
| repertoire.heading | Lime | 1 | 8 | 28 lines ×3.35 | 11 ×1 | 19 lines ×1 |  | 11 |
| repertoire.heading | Lime | 2 | 8 | 75 ×1 | 50 ×1 | 32 ×1 |  | 32 |
| repertoire.heading | Lime | 3 | 12 | 28 lines ×1 | 24 lines ×1 | 19 lines ×1 |  | 19 |
| repertoire.heading | Lime | 4 | 10 | 26 lines ×1 | 20 ×1 | 15 ×1 |  | 15 |
| repertoire.heading | Grunge | 1 | 8 | 32 lines ×3.88 | 13 ×1 | 25 lines ×1 |  | 13 |
| repertoire.heading | Grunge | 2 | 8 | 84 lines ×1 | 55 ×1 | 38 ×1 |  | 38 |
| repertoire.heading | Grunge | 3 | 12 | 32 lines ×1 | 27 lines ×1 | 25 lines ×1 |  | 25 |
| repertoire.heading | Grunge | 4 | 10 | 28 ×1 | 23 lines ×1 | 20 ×1 |  | 20 |
| repertoire.heading | Editorial | 1 | 8 | 17 lines ×1.98 | 7 overlap ×1 | 12 ×1 |  | 7 |
| repertoire.heading | Editorial | 2 | 8 | 51 lines ×1 | 33 lines ×1 | 21 lines ×1 |  | 21 |
| repertoire.heading | Editorial | 3 | 12 | 19 lines ×1 | 15 ×1 | 12 ×1 |  | 12 |
| repertoire.heading | Editorial | 4 | 10 | 17 lines ×1 | 13 ×1 | 10 ×1 |  | 10 |
| repertoire.heading | Pop | 1 | 8 | 26 ×3.35 | 11 lines ×1.36 | 13 ×1.65 |  | 11 |
| repertoire.heading | Pop | 2 | 8 | 61 lines ×1 | 40 ×1 | 25 lines ×1 |  | 25 |
| repertoire.heading | Pop | 3 | 12 | 26 ×1 | 23 lines ×1 | 17 lines ×1 |  | 17 |
| repertoire.heading | Pop | 4 | 10 | 20 ×1 | 15 ×1 | 9 lines ×1 |  | 9 |
| repertoire.sets.length | Retro | 3 | 6 | 48 ×1 | 20 box ×1 | 30 box ×1 |  | 20 |
| repertoire.sets.length | Lime | 3 | 6 | 40 box ×1 | 14 box ×1 | 28 box ×1 |  | 14 |
| repertoire.sets.length | Grunge | 3 | 6 | 48 box ×1 | 20 box ×1 | 30 box ×1 |  | 20 |
| repertoire.sets.length | Editorial | 3 | 6 | 48 box ×1 | 20 box ×1 | 30 box ×1 |  | 20 |
| repertoire.sets.length | Pop | 3 | 6 | 45 box ×1 | 17 box ×1 | 28 box ×1 |  | 17 |
| repertoire.sets.mood | Retro | 3 | 14 | 51 box ×1 | 22 box ×1 | 32 ×1 |  | 22 |
| repertoire.sets.mood | Lime | 3 | 14 | 41 ×1 | 16 box ×1 | 29 box ×1 |  | 16 |
| repertoire.sets.mood | Grunge | 3 | 14 | 50 ×1 | 22 box ×1 | 32 ×1 |  | 22 |
| repertoire.sets.mood | Editorial | 3 | 14 | 50 ×1 | 22 box ×1 | 32 ×1 |  | 22 |
| repertoire.sets.mood | Pop | 3 | 14 | 46 ×1 | 18 box ×1 | 29 box ×1 |  | 18 |
| repertoire.songs.artist | Retro | 1 | 18 | 76 ×4.95 | 82 ×5.32 | 32 overlap ×2.12 |  | 32 |
| repertoire.songs.artist | Retro | 2 | 18 | 109 ×1 | 50 ×1 | 25 ×1 |  | 25 |
| repertoire.songs.artist | Retro | 4 | 18 | 121 ×6.74 | 102 ×5.72 | 41 ×2.37 |  | 41 |
| repertoire.songs.artist | Lime | 1 | 18 | 82 overlap ×5.38 | 130 ×8.29 | 73 ×4.81 |  | 73 |
| repertoire.songs.artist | Lime | 2 | 18 | 96 ×1 | 46 ×1 | 25 ×1 |  | 25 |
| repertoire.songs.artist | Lime | 4 | 18 | 100 overlap ×6.47 | 80 ×5.29 | 37 ×2.46 |  | 37 |
| repertoire.songs.artist | Grunge | 1 | 18 | 104 ×6.63 | 152 ×9.63 | 74 ×4.78 |  | 74 |
| repertoire.songs.artist | Grunge | 2 | 18 | 106 ×1 | 50 ×1 | 25 ×1 |  | 25 |
| repertoire.songs.artist | Grunge | 4 | 18 | 102 ×6.55 | 91 overlap ×5.8 | 42 ×2.74 |  | 42 |
| repertoire.songs.artist | Editorial | 1 | 18 | 52 overlap ×3.5 | 77 ×5.14 | 35 ×2.4 |  | 35 |
| repertoire.songs.artist | Editorial | 2 | 18 | 106 ×1 | 50 ×1 | 25 ×1 |  | 25 |
| repertoire.songs.artist | Editorial | 4 | 18 | 38 box ×2.6 | 32 box ×2.21 | 17 box ×1.17 |  | 17 |
| repertoire.songs.artist | Pop | 1 | 18 | 34 ×2.27 | 37 ×2.43 | 17 box ×1.16 |  | 17 |
| repertoire.songs.artist | Pop | 2 | 18 | 106 ×1 | 50 ×1 | 25 ×1 |  | 25 |
| repertoire.songs.artist | Pop | 4 | 18 | 47 box ×3.14 | 37 ×2.43 | 19 ×1.32 |  | 19 |
| repertoire.songs.length | Retro | 3 | 4 | 55 ×12.05 | 23 overlap ×5 | 33 ×7.31 |  | 23 |
| repertoire.songs.length | Lime | 3 | 4 | 44 ×9.71 | 17 overlap ×3.64 | 30 overlap ×6.65 |  | 17 |
| repertoire.songs.length | Grunge | 3 | 4 | 54 ×12.19 | 22 ×4.69 | 33 ×7.31 |  | 22 |
| repertoire.songs.length | Editorial | 3 | 4 | 47 ×10.76 | 17 ×3.62 | 29 ×6.5 |  | 17 |
| repertoire.songs.length | Pop | 3 | 4 | 45 ×10.19 | 14 ×2.96 | 27 overlap ×5.92 |  | 14 |
| repertoire.songs.tags# | Retro | 1 | 2 | 14 lines ×1 | 8 lines ×1 | 4 lines ×1 |  | 4 |
| repertoire.songs.tags# | Retro | 2 | 2 | 400+ | 8 lines ×2.4 | 4 lines ×1.28 |  | 4 |
| repertoire.songs.tags# | Retro | 3 | 2 | 2 ×1 | 2 ×1 | 2 ×1 |  | 2 |
| repertoire.songs.tags# | Lime | 1 | 2 | 14 lines ×1 | 8 lines ×1 | 4 lines ×1 |  | 4 |
| repertoire.songs.tags# | Lime | 2 | 2 | 15 lines ×4.58 | 8 lines ×2.45 | 4 lines ×1.29 |  | 4 |
| repertoire.songs.tags# | Lime | 3 | 2 | 2 ×1 | 2 ×1 | 2 ×1 |  | 2 |
| repertoire.songs.tags# | Grunge | 1 | 2 | 14 lines ×1 | 8 lines ×1 | 4 lines ×1 |  | 4 |
| repertoire.songs.tags# | Grunge | 2 | 2 | 15 lines ×4.56 | 8 lines ×2.43 | 4 lines ×1.29 |  | 4 |
| repertoire.songs.tags# | Grunge | 3 | 2 | 2 ×1 | 2 ×1 | 2 ×1 |  | 2 |
| repertoire.songs.tags# | Editorial | 1 | 2 | 14 lines ×1 | 7 lines ×1 | 2 ×1 |  | 2 |
| repertoire.songs.tags# | Editorial | 2 | 2 | 15 lines ×4.56 | 8 lines ×2.43 | 4 lines ×1.29 |  | 4 |
| repertoire.songs.tags# | Editorial | 3 | 2 | 2 ×1 | 2 ×1 | 2 ×1 |  | 2 |
| repertoire.songs.tags# | Pop | 1 | 2 | 15 lines ×1 | 8 lines ×1 | 4 lines ×1 |  | 4 |
| repertoire.songs.tags# | Pop | 2 | 2 | 15 lines ×4.56 | 8 lines ×2.43 | 4 lines ×1.29 |  | 4 |
| repertoire.songs.tags# | Pop | 3 | 2 | 2 ×1 | 2 ×1 | 2 ×1 |  | 2 |
| repertoire.songs.tags[] | Retro | 1 | 9 | 400+ | 207 ×3.82 | 57 ×3.82 |  | 57 |
| repertoire.songs.tags[] | Retro | 2 | 9 | 400+ | 214 ×3.6 | 58 ×3.6 |  | 58 |
| repertoire.songs.tags[] | Retro | 3 | 9 | 47 ×1 | 23 ×1 | 32 ×1 |  | 23 |
| repertoire.songs.tags[] | Lime | 1 | 9 | 400+ | 206 ×3.89 | 61 ×3.8 |  | 61 |
| repertoire.songs.tags[] | Lime | 2 | 9 | 400+ | 204 ×3.7 | 59 ×3.6 |  | 59 |
| repertoire.songs.tags[] | Lime | 3 | 9 | 45 ×1 | 20 ×1 | 29 ×1 |  | 20 |
| repertoire.songs.tags[] | Grunge | 1 | 9 | 400+ | 206 ×3.89 | 55 ×3.89 |  | 55 |
| repertoire.songs.tags[] | Grunge | 2 | 9 | 400+ | 215 ×3.6 | 59 ×3.6 |  | 59 |
| repertoire.songs.tags[] | Grunge | 3 | 9 | 48 ×1 | 23 ×1 | 32 ×1 |  | 23 |
| repertoire.songs.tags[] | Editorial | 1 | 9 | 400+ | 206 ×3.89 | 43 ×3.48 |  | 43 |
| repertoire.songs.tags[] | Editorial | 2 | 9 | 400+ | 215 ×3.6 | 59 ×3.6 |  | 59 |
| repertoire.songs.tags[] | Editorial | 3 | 9 | 48 ×1 | 23 ×1 | 32 ×1 |  | 23 |
| repertoire.songs.tags[] | Pop | 1 | 9 | 400+ | 207 ×3.82 | 57 ×3.82 |  | 57 |
| repertoire.songs.tags[] | Pop | 2 | 9 | 400+ | 215 ×3.6 | 59 ×3.6 |  | 59 |
| repertoire.songs.tags[] | Pop | 3 | 9 | 45 ×1 | 20 ×1 | 29 ×1 |  | 20 |
| repertoire.songs.title | Retro | 1 | 17 | 41 ×5.63 | 41 ×5.65 | 15 ×2.13 |  | 15 |
| repertoire.songs.title | Retro | 2 | 17 | 87 ×1 | 55 ×1 | 25 ×1 |  | 25 |
| repertoire.songs.title | Retro | 3 | 17 | 47 ×6.61 | 25 box ×3.5 | 34 ×4.71 |  | 25 |
| repertoire.songs.title | Retro | 4 | 17 | 74 ×10.13 | 59 ×8.02 | 25 box ×3.51 |  | 25 |
| repertoire.songs.title | Lime | 1 | 17 | 44 ×6.38 | 82 box ×11.67 | 55 ×7.76 |  | 44 |
| repertoire.songs.title | Lime | 2 | 17 | 72 ×1 | 45 box ×1 | 24 box ×1 |  | 24 |
| repertoire.songs.title | Lime | 3 | 17 | 37 ×5.31 | 17 lines ×2.46 | 29 lines ×4.18 |  | 17 |
| repertoire.songs.title | Lime | 4 | 17 | 64 ×9.11 | 51 ×7.24 | 22 ×3.16 |  | 22 |
| repertoire.songs.title | Grunge | 1 | 17 | 44 ×6.54 | 68 ×9.8 | 33 box ×4.82 |  | 33 |
| repertoire.songs.title | Grunge | 2 | 17 | 80 ×1 | 49 ×1 | 26 ×1 |  | 26 |
| repertoire.songs.title | Grunge | 3 | 17 | 44 ×6.49 | 23 lines ×3.34 | 35 ×5.08 |  | 23 |
| repertoire.songs.title | Grunge | 4 | 17 | 65 ×9.44 | 57 ×8.28 | 26 box ×3.84 |  | 26 |
| repertoire.songs.title | Editorial | 1 | 17 | 24 box ×3.75 | 38 box ×5.79 | 17 box ×2.56 |  | 17 |
| repertoire.songs.title | Editorial | 2 | 17 | 43 box ×1 | 27 box ×1 | 14 box ×1 |  | 14 |
| repertoire.songs.title | Editorial | 3 | 17 | 23 box ×3.58 | 11 ×1.64 | 19 ×2.94 |  | 11 |
| repertoire.songs.title | Editorial | 4 | 17 | 38 box ×5.83 | 29 box ×4.58 | 10 ×1.44 |  | 10 |
| repertoire.songs.title | Pop | 1 | 17 | 25 box ×3.65 | 36 ×5.24 | 11 box ×1.55 |  | 11 |
| repertoire.songs.title | Pop | 2 | 17 | 53 ×1 | 31 box ×1 | 17 box ×1 |  | 17 |
| repertoire.songs.title | Pop | 3 | 17 | 27 ×3.91 | 11 ×1.57 | 20 ×2.85 |  | 11 |
| repertoire.songs.title | Pop | 4 | 17 | 44 ×6.41 | 34 ×4.91 | 13 ×1.88 |  | 13 |

## Layout 3's title with JP-104's second line

`--designs=2 --keys=songs.title --extra-lines=songs.title`: the title allowed one line past the
frame's, as JP-104 (user call, 2026-10-06) draws it at 768 and 390. Not written; the user's call
(*Session 5*, judgement 4).

| field | template | layout | seed | 1440 | 768 | 390 | 1440 column | probe |
|---|---|---|---|---|---|---|---|---|
| repertoire.songs.title | Retro | 3 | 17 | 47 ×6.61 | 25 box ×3.5 | 34 ×4.71 |  | 25 |
| repertoire.songs.title | Lime | 3 | 17 | 37 ×5.31 | 31 ×2.54 | 56 lines ×4.23 |  | 31 |
| repertoire.songs.title | Grunge | 3 | 17 | 44 ×6.49 | 41 lines ×3.39 | 64 ×5.28 |  | 41 |
| repertoire.songs.title | Editorial | 3 | 17 | 23 box ×3.58 | 20 lines ×1.93 | 33 ×3.03 |  | 20 |
| repertoire.songs.title | Pop | 3 | 17 | 27 ×3.91 | 19 ×1.83 | 38 ×3.05 |  | 19 |
