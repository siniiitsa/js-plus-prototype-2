# Character limits — session 3 probe readout (the media player's own fields)

`scripts/limits.mjs media` output, 2026-10-13, every template, design and width, for the media
player's own text keys (`--keys=kicker,heading,listLabel,countLabel,totalLabel,chipLabel,cta,
tracks.title,tracks.sub`). `IDENTITY_CHARS.media` (the `who.*` rows) is session 1's and was not
re-measured. Each cell is the largest passing length at that surface, then the test the next
length failed (none: a sample failed it, `400+`: open), then `×grow`, the seat's width at the cap
over the seed's. *probe* is the minimum over the surfaces; the cap written into `data.js` applies
the session's rules to it (`plans/char-limits.md`, *Session 3*).

- `countLabel` and `chipLabel` are the re-probe with `twinsOf()` (*Session 3*, probe fixes): the
  first run read `countLabel` at 1 at layout 2, because the fan chip's seed is the same
  "Featured" and the reference seated both.
- The track columns' *seed* is the longest seeded row, the floor the rules apply: `title` 17
  (*Manchester at 3am*), `sub` 33 (*Live at the Deaf Institute · 7:01*). The probe changes row 0
  (*Late Lights*, *Single · 5:42*) and measures its seats.

| field | template | layout | seed | 1440 | 768 | 390 | 1440 column | probe |
|---|---|---|---|---|---|---|---|---|
| media.chipLabel | Retro | 2 | 8 | 14 ×1.34 | 14 ×1.35 | 26 ×2.3 |  | 14 |
| media.chipLabel | Lime | 2 | 8 | 12 ×1.2 | 14 ×1.35 | 29 lines ×2.5 |  | 12 |
| media.chipLabel | Grunge | 2 | 8 | 13 ×1.27 | 15 ×1.44 | 29 lines ×2.5 |  | 13 |
| media.chipLabel | Editorial | 2 | 8 | 13 ×1.27 | 15 ×1.44 | 29 lines ×2.5 |  | 13 |
| media.chipLabel | Pop | 2 | 8 | 13 ×1.27 | 15 ×1.44 | 29 lines ×2.5 |  | 13 |
| media.countLabel | Retro | 1 | 8 | 65 ×5.35 | 86 ×6.98 | 42 lines ×3.64 |  | 42 |
| media.countLabel | Retro | 2 | 8 | 70 ×4.56 | 89 ×5.75 | 40 lines ×2.89 |  | 40 |
| media.countLabel | Retro | 3 | 8 | 197 ×11.76 | 110 ×6.89 | 51 ×3.49 | 123 ×7.62 | 51 |
| media.countLabel | Lime | 1 | 8 | 70 ×5.81 | 94 lines ×7.71 | 51 ×4.37 |  | 51 |
| media.countLabel | Lime | 2 | 8 | 61 ×4.07 | 89 ×5.74 | 44 lines ×3.13 |  | 44 |
| media.countLabel | Lime | 3 | 8 | 173 ×10.45 | 99 lines ×6.29 | 51 lines ×3.49 | 109 ×6.87 | 51 |
| media.countLabel | Grunge | 1 | 8 | 70 ×5.81 | 94 lines ×7.71 | 30 overlap ×2.77 |  | 30 |
| media.countLabel | Grunge | 2 | 8 | 68 ×4.41 | 99 lines ×6.29 | 44 lines ×3.13 |  | 44 |
| media.countLabel | Grunge | 3 | 8 | 193 ×11.54 | 109 ×6.87 | 51 lines ×3.49 | 121 ×7.47 | 51 |
| media.countLabel | Editorial | 1 | 8 | 70 ×5.81 | 94 lines ×7.71 | 51 ×4.37 |  | 51 |
| media.countLabel | Editorial | 2 | 8 | 68 ×4.41 | 99 lines ×6.29 | 44 lines ×3.13 |  | 44 |
| media.countLabel | Editorial | 3 | 8 | 193 ×11.54 | 109 ×6.87 | 51 lines ×3.49 | 121 ×7.47 | 51 |
| media.countLabel | Pop | 2 | 8 | 68 ×4.41 | 99 lines ×6.29 | 44 lines ×3.13 |  | 44 |
| media.countLabel | Pop | 3 | 8 | 193 ×11.54 | 109 ×6.87 | 51 lines ×3.49 | 121 ×7.47 | 51 |
| media.cta | Lime | 1 | 8 | 155 ×8.58 | 100 ×5.15 | 46 ×2.67 |  | 46 |
| media.cta | Grunge | 1 | 8 | 169 ×8.85 | 110 ×5.31 | 51 ×2.75 |  | 51 |
| media.heading | Retro | 1 | 20 | 20 ×1 | 20 ×1 | 20 ×1 |  | 20 |
| media.heading | Retro | 2 | 20 | 20 ×1 | 23 ×1 | 33 ×1 |  | 20 |
| media.heading | Retro | 3 | 20 | 59 ×1.56 | 25 ×1.25 | 37 ×1.05 | 34 ×1.02 | 25 |
| media.heading | Retro | 4 | 20 | 30 lines ×1 | 24 lines ×1 | 20 ×1 |  | 20 |
| media.heading | Lime | 1 | 20 | 20 ×1 | 20 ×1 | 20 ×1 |  | 20 |
| media.heading | Lime | 2 | 20 | 20 ×1 | 22 lines ×1 | 20 ×1 |  | 20 |
| media.heading | Lime | 3 | 20 | 21 lines ×1 | 24 lines ×1.23 | 19 lines ×0.98 | 21 lines ×1 | 19 |
| media.heading | Lime | 4 | 20 | 28 lines ×1 | 23 lines ×1 | 19 lines ×1 |  | 19 |
| media.heading | Grunge | 1 | 20 | 42 overlap ×1 | 35 ×2 | 30 overlap ×1.54 |  | 30 |
| media.heading | Grunge | 2 | 20 | 18 lines ×1 | 25 lines ×1 | 31 lines ×1 |  | 18 |
| media.heading | Grunge | 3 | 20 | 18 lines ×1 | 27 lines ×1.36 | 25 lines ×1.28 | 18 lines ×1 | 18 |
| media.heading | Grunge | 4 | 20 | 32 lines ×1 | 26 lines ×1 | 25 lines ×1 |  | 25 |
| media.heading | Editorial | 1 | 20 | 30 lines ×1 | 30 lines ×1.6 | 14 ×1.28 |  | 14 |
| media.heading | Editorial | 2 | 20 | 23 lines ×1 | 23 ×1 | 19 lines ×1 |  | 19 |
| media.heading | Editorial | 3 | 20 | 23 lines ×1 | 22 ×1 | 20 lines ×1 | 23 lines ×1 | 20 |
| media.heading | Editorial | 4 | 20 | 33 ×1 | 30 lines ×1 | 20 lines ×1 |  | 20 |
| media.heading | Pop | 1 | 20 | 28 ×1 | 14 ×1.27 | 30 lines ×1.52 |  | 14 |
| media.heading | Pop | 2 | 20 | 20 lines ×1 | 20 ×1 | 19 lines ×1 |  | 19 |
| media.heading | Pop | 3 | 20 | 20 ×1 | 20 ×0.98 | 31 lines ×1 | 20 ×1 | 20 |
| media.heading | Pop | 4 | 20 | 26 ×1 | 23 lines ×1 | 31 lines ×1 |  | 23 |
| media.kicker | Retro | 1 | 10 | 125 ×1 | 91 box ×1.9 | 46 box ×1.56 |  | 46 |
| media.kicker | Retro | 3 | 10 | 111 ×10.37 | 84 lines ×8.02 | 51 lines ×4.88 | 71 ×6.77 | 51 |
| media.kicker | Lime | 1 | 10 | 139 ×1 | 98 box ×1.88 | 55 ×1.46 |  | 55 |
| media.kicker | Lime | 3 | 10 | 124 ×11.51 | 92 ×8.74 | 55 ×5.19 | 79 ×7.55 | 55 |
| media.kicker | Grunge | 1 | 10 | 139 ×1 | 75 ×2.06 | 55 ×2.43 |  | 55 |
| media.kicker | Grunge | 3 | 10 | 124 ×11.51 | 92 ×8.74 | 55 ×5.19 | 79 ×7.55 | 55 |
| media.kicker | Editorial | 1 | 10 | 139 ×1 | 98 box ×1.6 | 55 ×1.25 |  | 55 |
| media.kicker | Editorial | 3 | 10 | 124 ×11.51 | 92 ×8.74 | 55 ×5.19 | 79 ×7.55 | 55 |
| media.kicker | Pop | 1 | 10 | 123 overlap ×1 | 78 box ×1.26 | 42 box ×1.54 |  | 42 |
| media.kicker | Pop | 3 | 10 | 124 ×11.51 | 92 ×8.74 | 55 ×5.19 | 79 ×7.55 | 55 |
| media.listLabel | Retro | 2 | 7 | 61 lines ×6.58 | 78 lines ×8.52 | 29 lines ×3.34 |  | 29 |
| media.listLabel | Retro | 3 | 7 | 187 ×19.48 | 99 lines ×10.73 | 41 lines ×4.6 | 114 ×12.04 | 41 |
| media.listLabel | Lime | 2 | 7 | 52 lines ×5.68 | 78 ×8.51 | 34 lines ×3.82 |  | 34 |
| media.listLabel | Lime | 3 | 7 | 163 ×17.16 | 88 lines ×9.49 | 41 lines ×4.55 | 99 lines ×10.61 | 41 |
| media.listLabel | Grunge | 2 | 7 | 59 ×6.33 | 88 lines ×9.46 | 34 lines ×3.82 |  | 34 |
| media.listLabel | Grunge | 3 | 7 | 182 ×19 | 99 lines ×10.61 | 41 lines ×4.55 | 111 ×11.69 | 41 |
| media.listLabel | Editorial | 2 | 7 | 59 ×6.33 | 88 lines ×9.46 | 34 lines ×3.82 |  | 34 |
| media.listLabel | Editorial | 3 | 7 | 182 ×19 | 99 lines ×10.61 | 41 lines ×4.55 | 111 ×11.69 | 41 |
| media.listLabel | Pop | 2 | 7 | 59 ×6.33 | 88 lines ×9.46 | 34 lines ×3.82 |  | 34 |
| media.listLabel | Pop | 3 | 7 | 182 ×19 | 99 lines ×10.61 | 41 lines ×4.55 | 111 ×11.69 | 41 |
| media.totalLabel | Retro | 2 | 3 | 66 ×4.6 | 84 lines ×5.77 | 35 lines ×2.87 |  | 35 |
| media.totalLabel | Retro | 3 | 3 | 192 ×11.8 | 105 ×6.93 | 46 lines ×3.52 | 119 ×7.62 | 46 |
| media.totalLabel | Lime | 2 | 3 | 57 ×4.1 | 85 lines ×5.77 | 39 lines ×3.08 |  | 39 |
| media.totalLabel | Lime | 3 | 3 | 168 ×10.45 | 94 lines ×6.26 | 46 lines ×3.5 | 104 ×6.86 | 46 |
| media.totalLabel | Grunge | 2 | 3 | 64 ×4.49 | 94 lines ×6.26 | 39 lines ×3.08 |  | 39 |
| media.totalLabel | Grunge | 3 | 3 | 188 ×11.58 | 104 lines ×6.86 | 46 lines ×3.5 | 116 ×7.45 | 46 |
| media.totalLabel | Editorial | 2 | 3 | 64 ×4.49 | 94 lines ×6.26 | 39 lines ×3.08 |  | 39 |
| media.totalLabel | Editorial | 3 | 3 | 188 ×11.58 | 104 lines ×6.86 | 46 lines ×3.5 | 116 ×7.45 | 46 |
| media.totalLabel | Pop | 2 | 3 | 64 ×4.49 | 94 lines ×6.26 | 39 lines ×3.08 |  | 39 |
| media.totalLabel | Pop | 3 | 3 | 188 ×11.58 | 104 lines ×6.86 | 46 lines ×3.5 | 116 ×7.45 | 46 |
| media.tracks.sub | Retro | 1 | 33 | 67 ×1 | 73 ×1 | 15 ×1 |  | 15 |
| media.tracks.sub | Retro | 2 | 33 | 13 ×1 | 13 ×1 | 15 ×1 |  | 13 |
| media.tracks.sub | Retro | 3 | 33 | 105 ×1 | 48 ×1 | 20 ×1 | 63 ×1 | 20 |
| media.tracks.sub | Retro | 4 | 33 | 41 ×1 | 16 ×1 | 23 ×1 |  | 16 |
| media.tracks.sub | Lime | 1 | 33 | 83 ×1 | 86 ×1 | 33 ×1 |  | 33 |
| media.tracks.sub | Lime | 2 | 33 | 12 ×1 | 12 ×1 | 15 ×1 |  | 12 |
| media.tracks.sub | Lime | 3 | 33 | 94 ×1 | 44 ×1 | 20 ×1 | 55 ×1 | 20 |
| media.tracks.sub | Lime | 4 | 33 | 34 ×1 | 17 box ×1 | 18 ×1 |  | 17 |
| media.tracks.sub | Grunge | 1 | 33 | 92 ×1 | 93 ×1 | 33 ×1 |  | 33 |
| media.tracks.sub | Grunge | 2 | 33 | 13 ×1 | 13 ×1 | 15 ×1 |  | 13 |
| media.tracks.sub | Grunge | 3 | 33 | 104 box ×1 | 48 ×1 | 20 ×1 | 62 ×1 | 20 |
| media.tracks.sub | Grunge | 4 | 33 | 41 ×1 | 16 ×1 | 23 ×1 |  | 16 |
| media.tracks.sub | Editorial | 1 | 33 | 92 ×1 | 93 ×1 | 33 ×1 |  | 33 |
| media.tracks.sub | Editorial | 2 | 33 | 13 ×1 | 13 ×1 | 15 ×1 |  | 13 |
| media.tracks.sub | Editorial | 3 | 33 | 104 box ×1 | 48 ×1 | 20 ×1 | 62 ×1 | 20 |
| media.tracks.sub | Editorial | 4 | 33 | 41 ×1 | 16 ×1 | 23 ×1 |  | 16 |
| media.tracks.sub | Pop | 1 | 33 | 72 ×1 | 63 ×1 | 11 ×1 |  | 11 |
| media.tracks.sub | Pop | 2 | 33 | 13 ×1 | 13 ×1 | 15 ×1 |  | 13 |
| media.tracks.sub | Pop | 3 | 33 | 104 box ×1 | 48 ×1 | 20 ×1 | 62 ×1 | 20 |
| media.tracks.sub | Pop | 4 | 33 | 37 ×1 | 12 ×1 | 20 ×1 |  | 12 |
| media.tracks.title | Retro | 1 | 17 | 46 ×1.01 | 12 ×1 | 14 lines ×1.25 |  | 12 |
| media.tracks.title | Retro | 2 | 17 | 11 overlap ×1 | 11 overlap ×1 | 12 ×1 |  | 11 |
| media.tracks.title | Retro | 3 | 17 | 88 ×1 | 59 ×1 | 25 ×1 | 55 ×1 | 25 |
| media.tracks.title | Retro | 4 | 17 | 15 ×1 | 20 ×1 | 28 lines ×1 |  | 15 |
| media.tracks.title | Lime | 1 | 17 | 51 ×1 | 77 ×1 | 40 ×1 |  | 40 |
| media.tracks.title | Lime | 2 | 17 | 17 box ×1 | 12 overlap ×1 | 14 overlap ×1 |  | 12 |
| media.tracks.title | Lime | 3 | 17 | 70 ×1 | 48 overlap ×1 | 19 box ×1 | 42 ×1 | 19 |
| media.tracks.title | Lime | 4 | 17 | 13 ×1 | 15 ×1 | 22 box ×1 |  | 13 |
| media.tracks.title | Grunge | 1 | 17 | 43 ×1 | 54 ×1 | 27 ×1 |  | 27 |
| media.tracks.title | Grunge | 2 | 17 | 10 ×1 | 10 ×1 | 11 overlap ×1 |  | 10 |
| media.tracks.title | Grunge | 3 | 17 | 77 ×1 | 47 ×1 | 21 ×1 | 47 box ×1 | 21 |
| media.tracks.title | Grunge | 4 | 17 | 16 lines ×1 | 15 ×1 | 23 box ×1 |  | 15 |
| media.tracks.title | Editorial | 1 | 17 | 29 overlap ×1 | 39 overlap ×1 | 17 overlap ×1 |  | 17 |
| media.tracks.title | Editorial | 2 | 17 | 10 ×1 | 12 ×1 | 12 ×1 |  | 10 |
| media.tracks.title | Editorial | 3 | 17 | 41 ×1 | 25 box ×1 | 11 box ×1 | 25 box ×1 | 11 |
| media.tracks.title | Editorial | 4 | 17 | 17 lines ×1 | 12 lines ×1 | 17 lines ×1 |  | 12 |
| media.tracks.title | Pop | 1 | 17 | 24 overlap ×1 | 19 ×1 | 15 ×1.47 |  | 15 |
| media.tracks.title | Pop | 2 | 17 | 11 ×1 | 14 ×1 | 10 ×1 |  | 10 |
| media.tracks.title | Pop | 3 | 17 | 51 ×1 | 30 box ×1 | 13 box ×1 | 31 ×1 | 13 |
| media.tracks.title | Pop | 4 | 17 | 10 ×1 | 10 ×1 | 12 box ×1 |  | 10 |
