# Character limits — session 1 probe readout (the header and its identity consumers)

`scripts/limits.mjs` output, 2026-10-13, every template, design and width. Each cell is the
largest passing length at that surface, then the test the next length failed (none: a sample
failed it, `400+`: open), then `×grow`, the seat's width at the cap over the seed's. *probe* is
the minimum over the surfaces; the cap written into `data.js` applies the session's rules to it
(`plans/char-limits.md`, *Session 1*). The name rows (`header.title`, `*.who.title`) are measured
under the name rule (one line past the frame, 75% shrink floor) with the seal rings left out;
`*.who.seal` reads the rings alone. The header's `badgeText` is in the plan, not here: its rows
came from the ring test (`limits.mjs header --keys=badgeText`), which this readout predates.

## The header's fields

| field | template | layout | seed | 1440 | 768 | 390 | 1440 column | probe |
|---|---|---|---|---|---|---|---|---|
| header.availability | Retro | 2 | 22 | 103 lines ×3.82 | 48 ×1.94 | 38 ×1.55 |  | 38 |
| header.availability | Lime | 2 | 22 | 93 ×3.58 | 44 ×1.82 | 57 ×2.24 |  | 44 |
| header.availability | Grunge | 2 | 22 | 103 ×3.86 | 48 ×1.95 | 57 ×2.24 |  | 48 |
| header.availability | Editorial | 2 | 22 | 103 ×3.86 | 48 ×1.95 | 57 ×2.24 |  | 48 |
| header.availability | Pop | 2 | 22 | 103 ×3.86 | 48 ×1.95 | 40 ×1.63 |  | 40 |
| header.cardLine | Lime | 3 | 21 | 27 lines ×1.21 | 22 ×0.96 | 33 ×1.5 |  | 22 |
| header.cardLine | Grunge | 3 | 21 | 23 ×1.02 | 23 ×1.02 | 33 ×1.5 |  | 23 |
| header.cardLine | Editorial | 3 | 21 | 23 ×1.02 | 23 ×1.02 | 32 ×1.44 |  | 23 |
| header.cardLine | Pop | 3 | 21 | 29 ×1.33 | 30 ×1.36 | 33 ×1.5 |  | 29 |
| header.cta1 | Retro | 1 | 8 | 20 overlap ×1.63 | 57 ×3.77 | 36 ×2.58 |  | 20 |
| header.cta1 | Retro | 2 | 8 | 122 ×7.88 | 61 ×3.94 | 28 page ×2.12 |  | 28 |
| header.cta1 | Retro | 3 | 8 | 154 ×9.12 | 82 box ×4.75 | 31 ×2.1 |  | 31 |
| header.cta1 | Retro | 4 | 8 | 130 ×8.02 | 82 overlap ×4.56 | 31 ×2.38 |  | 31 |
| header.cta1 | Retro | 5 | 8 | 135 ×8.24 | 28 ×2.11 | 45 ×3.1 |  | 28 |
| header.cta1 | Retro | 6 | 8 | 127 ×7.78 | 57 ×3.77 | 37 ×2.6 |  | 37 |
| header.cta1 | Lime | 1 | 8 | 116 ×6.54 | 65 ×3.56 | 59 ×3.28 |  | 59 |
| header.cta1 | Lime | 2 | 8 | 176 ×9.84 | 110 ×5.63 | 58 ×3.46 |  | 58 |
| header.cta1 | Lime | 3 | 8 | 177 ×9.91 | 106 ×5.46 | 49 ×2.74 |  | 49 |
| header.cta1 | Lime | 4 | 8 | 107 ×6.11 | 65 ×3.56 | 59 ×3.06 |  | 59 |
| header.cta1 | Grunge | 1 | 8 | 115 ×6.18 | 70 ×3.61 | 61 ×3.24 |  | 61 |
| header.cta1 | Grunge | 2 | 8 | 204 ×10.09 | 137 ×6.33 | 45 ×2.98 |  | 45 |
| header.cta1 | Grunge | 3 | 8 | 236 ×11.64 | 131 ×6.08 | 63 ×3.14 |  | 63 |
| header.cta1 | Grunge | 4 | 8 | 120 ×6.45 | 75 ×3.86 | 59 ×2.93 |  | 59 |
| header.cta1 | Editorial | 1 | 8 | 63 ×4.29 | 32 overlap ×2.3 | 29 overlap ×2.17 |  | 29 |
| header.cta1 | Editorial | 2 | 8 | 101 ×6.45 | 66 ×4.11 | 29 page ×2.26 |  | 29 |
| header.cta1 | Editorial | 3 | 8 | 118 ×7.33 | 64 ×4 | 10 ×0.98 |  | 10 |
| header.cta1 | Editorial | 4 | 8 | 57 overlap ×3.95 | 37 overlap ×2.55 | 32 overlap ×2.2 |  | 32 |
| header.cta1 | Pop | 1 | 8 | 76 ×5.03 | 44 overlap ×2.95 | 39 overlap ×2.63 |  | 39 |
| header.cta1 | Pop | 2 | 8 | 106 ×7.03 | 58 ×3.86 | 32 box ×2.45 |  | 32 |
| header.cta1 | Pop | 3 | 8 | 113 ×7.43 | 61 box ×4.02 | 30 box ×2.21 |  | 30 |
| header.cta1 | Pop | 4 | 8 | 78 overlap ×5.17 | 42 ×2.82 | 31 overlap ×2.24 |  | 31 |
| header.cta2 | Retro | 2 | 6 | 147 ×25.06 | 58 ×10.13 | – |  | 58 |
| header.cta2 | Retro | 3 | 6 | 151 ×25.97 | 78 box ×13.52 | – |  | 78 |
| header.cta2 | Retro | 5 | 6 | 129 ×21.37 | 19 overlap ×3.26 | 33 box ×5.6 |  | 19 |
| header.cta2 | Lime | 2 | 6 | 176 ×28.61 | 107 ×17.55 | – |  | 107 |
| header.cta2 | Lime | 3 | 6 | 173 ×28.19 | 102 ×16.86 | – |  | 102 |
| header.cta2 | Grunge | 2 | 6 | 216 ×37.3 | 133 ×23.26 | – |  | 133 |
| header.cta2 | Grunge | 3 | 6 | 248 ×43.04 | 128 ×22.39 | – |  | 128 |
| header.cta2 | Editorial | 2 | 6 | 107 ×18.07 | 63 page ×10.72 | – |  | 63 |
| header.cta2 | Editorial | 3 | 6 | 114 ×19.21 | 60 box ×10.26 | – |  | 60 |
| header.cta2 | Pop | 2 | 6 | 108 ×18.07 | 68 ×11.33 | – |  | 68 |
| header.cta2 | Pop | 3 | 6 | 110 ×18.29 | 58 box ×9.84 | – |  | 58 |
| header.faceBody | Retro | 2 | 60 | 206 ×1 | 400+ | 400+ |  | 206 |
| header.faceBody | Lime | 2 | 60 | 228 ×1 | 400+ | 400+ |  | 228 |
| header.faceBody | Grunge | 2 | 60 | 346 ×1 | 400+ | 400+ |  | 346 |
| header.faceBody | Editorial | 2 | 60 | 186 box ×1 | 400+ | 400+ |  | 186 |
| header.faceBody | Pop | 2 | 60 | 400+ | 400+ | 400+ |  | 400 |
| header.faceTitle | Retro | 2 | 19 | 22 ×1 | 22 ×1 | 22 ×1 |  | 22 |
| header.faceTitle | Lime | 2 | 19 | 29 lines ×1.62 | 24 lines ×1.34 | 36 ×2.02 |  | 24 |
| header.faceTitle | Grunge | 2 | 19 | 34 ×1.88 | 29 lines ×1.61 | 41 ×2.27 |  | 29 |
| header.faceTitle | Editorial | 2 | 19 | 19 lines ×1.06 | 29 lines ×1 | 22 lines ×1.22 |  | 19 |
| header.faceTitle | Pop | 2 | 19 | 20 lines ×1.1 | 30 lines ×1 | 23 ×1.29 |  | 20 |
| header.heroCta | Retro | 2 | 20 | 64 ×2.51 | 34 lines ×1.46 | 40 ×1.65 |  | 34 |
| header.heroCta | Lime | 2 | 20 | 65 ×2.5 | 35 ×1.48 | 45 lines ×1.77 |  | 35 |
| header.heroCta | Grunge | 2 | 20 | 70 ×2.63 | 40 lines ×1.6 | 50 ×1.89 |  | 40 |
| header.heroCta | Editorial | 2 | 20 | 39 lines ×1.74 | 21 lines ×1.05 | 27 lines ×1.27 |  | 21 |
| header.heroCta | Pop | 2 | 20 | 47 lines ×2 | 25 lines ×1.18 | 32 lines ×1.4 |  | 25 |
| header.kicker | Retro | 1 | 13 | 156 ×13.47 | 115 ×9.87 | 59 ×5.11 |  | 59 |
| header.kicker | Retro | 3 | 13 | 29 ×2.42 | 17 overlap ×1.36 | 21 ×1.69 |  | 17 |
| header.kicker | Retro | 4 | 13 | 66 ×6.09 | 11 overlap ×1.02 | 30 lines ×2.88 |  | 11 |
| header.kicker | Retro | 6 | 13 | 128 ×9.78 | 80 lines ×6.27 | 39 lines ×3.11 |  | 39 |
| header.kicker | Lime | 1 | 13 | 158 ×14.25 | 112 ×10.13 | 55 ×5.06 |  | 55 |
| header.kicker | Lime | 4 | 13 | 78 lines ×7.18 | 13 ×1.22 | 37 ×3.39 |  | 13 |
| header.kicker | Grunge | 1 | 13 | 173 ×14.96 | 118 ×10.12 | 61 ×5.32 |  | 61 |
| header.kicker | Grunge | 4 | 13 | 18 overlap ×1.59 | 12 overlap ×1.04 | 41 ×3.61 |  | 12 |
| header.kicker | Editorial | 1 | 13 | 75 ×7.13 | 48 ×4.73 | 33 box ×3.24 |  | 33 |
| header.kicker | Editorial | 4 | 13 | 53 lines ×5.11 | 11 overlap ×1.04 | 25 lines ×2.5 |  | 11 |
| header.kicker | Pop | 1 | 13 | 114 ×10.54 | 69 ×6.42 | 47 box ×4.48 |  | 47 |
| header.kicker | Pop | 4 | 13 | 59 ×5.51 | 11 overlap ×1.02 | 28 ×2.68 |  | 11 |
| header.location | Retro | 1 | 14 | 152 ×10.02 | 111 ×7.26 | 55 ×3.64 |  | 55 |
| header.location | Retro | 2 | 14 | 22 ×1 | 22 box ×1 | 15 ×1 |  | 15 |
| header.location | Retro | 3 | 14 | 19 ×1.18 | 73 ×4.37 | 55 ×3.29 |  | 19 |
| header.location | Retro | 4 | 14 | 137 ×7.99 | 20 ×1.2 | 55 ×3.29 |  | 20 |
| header.location | Retro | 6 | 14 | 139 ×8.36 | 87 lines ×5.32 | 42 lines ×2.66 |  | 42 |
| header.location | Lime | 1 | 14 | 24 overlap ×1.62 | 109 ×7.13 | 52 ×3.44 |  | 24 |
| header.location | Lime | 2 | 14 | 29 lines ×1.96 | 24 lines ×1.62 | 36 ×2.43 |  | 24 |
| header.location | Lime | 3 | 14 | 14 ×0.95 | 63 ×4.13 | 51 ×3.36 |  | 14 |
| header.location | Lime | 4 | 14 | 114 ×7.42 | 17 overlap ×1.14 | 51 ×3.36 |  | 17 |
| header.location | Grunge | 1 | 14 | 24 overlap ×1.61 | 114 ×7.51 | 58 ×3.87 |  | 24 |
| header.location | Grunge | 2 | 14 | 34 ×2.27 | 29 lines ×1.96 | 41 ×2.73 |  | 29 |
| header.location | Grunge | 3 | 14 | 15 overlap ×1.01 | 69 ×4.56 | 57 ×3.76 |  | 15 |
| header.location | Grunge | 4 | 14 | 24 overlap ×1.61 | 114 ×7.51 | 57 ×3.76 |  | 24 |
| header.location | Editorial | 1 | 14 | 22 overlap ×1.51 | 46 box ×3.15 | 30 box ×2.11 |  | 22 |
| header.location | Editorial | 2 | 14 | 19 lines ×1.31 | 15 ×1.03 | 22 lines ×1.51 |  | 15 |
| header.location | Editorial | 3 | 14 | 75 ×4.99 | 37 lines ×2.49 | 30 lines ×2.12 |  | 30 |
| header.location | Editorial | 4 | 14 | 68 ×4.46 | 19 overlap ×1.3 | 30 box ×2.12 |  | 19 |
| header.location | Pop | 1 | 14 | 23 ×1.55 | 67 ×4.46 | 44 ×2.99 |  | 23 |
| header.location | Pop | 2 | 14 | 20 lines ×1.33 | 15 ×1.04 | 23 ×1.56 |  | 15 |
| header.location | Pop | 3 | 14 | 93 ×6.21 | 43 lines ×2.91 | 36 ×2.46 |  | 36 |
| header.location | Pop | 4 | 14 | 82 ×5.5 | 72 box ×4.83 | 36 ×2.46 |  | 36 |
| header.placeBody | Retro | 2 | 56 | 246 ×1 | 400+ | 400+ |  | 246 |
| header.placeBody | Lime | 2 | 56 | 265 ×1 | 400+ | 400+ |  | 265 |
| header.placeBody | Grunge | 2 | 56 | 400+ | 400+ | 400+ |  | 400 |
| header.placeBody | Editorial | 2 | 56 | 186 box ×1 | 400+ | 400+ |  | 186 |
| header.placeBody | Pop | 2 | 56 | 400+ | 400+ | 400+ |  | 400 |
| header.subtitle | Retro | 2 | 104 | 400+ | 400+ | 400+ |  | 400 |
| header.subtitle | Retro | 5 | 104 | 400+ | 104 box ×1 | 400+ |  | 104 |
| header.subtitle | Lime | 2 | 104 | 400+ | 400+ | 400+ |  | 400 |
| header.subtitle | Grunge | 2 | 104 | 400+ | 400+ | 400+ |  | 400 |
| header.subtitle | Editorial | 2 | 104 | 400+ | 400+ | 400+ |  | 400 |
| header.subtitle | Pop | 2 | 104 | 400+ | 400+ | 400+ |  | 400 |
| header.tags# | Retro | 1 | 6 | 12 lines ×1 | 8 lines ×1 | 8 lines ×1 |  | 8 |
| header.tags# | Retro | 3 | 6 | 10 lines ×1.7 | 9 lines ×1 | 7 lines ×1 |  | 7 |
| header.tags# | Retro | 4 | 6 | 7 lines ×1 | 8 lines ×1 | 8 lines ×1 |  | 7 |
| header.tags# | Retro | 5 | 6 | 7 lines ×1 | 7 lines ×1 | 6 lines ×1 |  | 6 |
| header.tags# | Retro | 6 | 6 | 10 lines ×1 | 6 lines ×1 | 6 lines ×1 |  | 6 |
| header.tags# | Lime | 1 | 6 | 12 lines ×1 | 8 lines ×1 | 8 lines ×1 |  | 8 |
| header.tags# | Lime | 3 | 6 | 13 lines ×2.17 | 7 lines ×1.15 | 6 lines ×1 |  | 6 |
| header.tags# | Lime | 4 | 6 | 6 lines ×1 | 8 lines ×1 | 8 lines ×1 |  | 6 |
| header.tags# | Grunge | 1 | 6 | 12 lines ×1 | 8 lines ×1 | 8 lines ×1 |  | 8 |
| header.tags# | Grunge | 3 | 6 | 13 lines ×2.17 | 7 lines ×1.15 | 6 lines ×1 |  | 6 |
| header.tags# | Grunge | 4 | 6 | 6 lines ×1 | 8 lines ×1 | 8 lines ×1 |  | 6 |
| header.tags# | Editorial | 1 | 6 | 12 lines ×1 | 8 lines ×1 | 8 lines ×1 |  | 8 |
| header.tags# | Editorial | 3 | 6 | 13 lines ×2.17 | 7 lines ×1.15 | 6 lines ×1 |  | 6 |
| header.tags# | Editorial | 4 | 6 | 6 lines ×1 | 8 lines ×1 | 8 lines ×1 |  | 6 |
| header.tags# | Pop | 1 | 6 | 6 overlap ×1 | 8 lines ×1 | 8 lines ×1 |  | 6 |
| header.tags# | Pop | 3 | 6 | 13 lines ×2.17 | 7 lines ×1.15 | 6 lines ×1 |  | 6 |
| header.tags# | Pop | 4 | 6 | 6 lines ×1 | 8 lines ×1 | 8 lines ×1 |  | 6 |
| header.tags[] | Retro | 1 | 11 | 400+ | 197 ×4.94 | 51 ×4.94 |  | 51 |
| header.tags[] | Retro | 3 | 11 | 218 ×4.94 | 58 ×4.94 | 47 ×4.83 |  | 47 |
| header.tags[] | Retro | 4 | 11 | 33 ×3.6 | 131 ×4.94 | 58 ×4.76 |  | 33 |
| header.tags[] | Retro | 5 | 11 | 45 ×4.6 | 15 ×1.71 | 39 ×3.97 |  | 15 |
| header.tags[] | Retro | 6 | 11 | 68 ×4.94 | 41 ×4.19 | 22 box ×2.36 |  | 22 |
| header.tags[] | Lime | 1 | 11 | 400+ | 202 ×4.91 | 54 ×4.91 |  | 54 |
| header.tags[] | Lime | 3 | 11 | 400+ | 89 ×4.92 | 82 ×4.72 |  | 82 |
| header.tags[] | Lime | 4 | 11 | 35 ×3.89 | 201 ×4.91 | 60 ×4.66 |  | 35 |
| header.tags[] | Grunge | 1 | 11 | 400+ | 202 ×4.91 | 54 ×4.91 |  | 54 |
| header.tags[] | Grunge | 3 | 11 | 400+ | 89 ×4.92 | 82 ×4.72 |  | 82 |
| header.tags[] | Grunge | 4 | 11 | 35 ×3.89 | 201 ×4.91 | 60 ×4.66 |  | 35 |
| header.tags[] | Editorial | 1 | 11 | 400+ | 400+ | 54 ×4.91 |  | 54 |
| header.tags[] | Editorial | 3 | 11 | 400+ | 89 ×4.92 | 82 ×4.72 |  | 82 |
| header.tags[] | Editorial | 4 | 11 | 35 ×3.89 | 201 ×4.91 | 60 ×4.66 |  | 35 |
| header.tags[] | Pop | 1 | 11 | 73 ×5.27 | 55 ×4.91 | 54 ×4.91 |  | 54 |
| header.tags[] | Pop | 3 | 11 | 400+ | 89 ×4.92 | 82 ×4.72 |  | 82 |
| header.tags[] | Pop | 4 | 11 | 35 ×3.89 | 201 ×4.91 | 60 ×4.66 |  | 35 |
| header.title | Retro | 1 | 10 | 23 box ×2 | 35 ×1.83 | 25 ×1.47 |  | 23 |
| header.title | Retro | 2 | 10 | 22 ×1.32 | 26 ×1.08 | 24 page ×1.84 |  | 22 |
| header.title | Retro | 3 | 10 | 27 ×2.22 | 23 ×1.39 | 29 box ×1.74 |  | 23 |
| header.title | Retro | 4 | 10 | 39 ×2.36 | 14 ×1.24 | 30 box ×1.45 |  | 14 |
| header.title | Retro | 5 | 10 | 20 ×1.61 | 6 overlap ×0.92 | 20 box ×1.62 |  | 6 |
| header.title | Retro | 6 | 10 | 54 ×3.71 | 31 ×3.22 | 36 ×3.55 |  | 31 |
| header.title | Lime | 1 | 10 | 14 ×1.37 | 30 lines ×1.63 | 17 box ×1.26 |  | 14 |
| header.title | Lime | 2 | 10 | 22 lines ×1.35 | 19 lines ×1.11 | 33 ×1.89 |  | 19 |
| header.title | Lime | 3 | 10 | 22 ×2.11 | 29 lines ×1.5 | 32 ×1.79 |  | 22 |
| header.title | Lime | 4 | 10 | 32 lines ×2 | 12 overlap ×1.17 | 22 lines ×1.34 |  | 12 |
| header.title | Grunge | 1 | 10 | 20 ×1.87 | 42 lines ×2.25 | 19 ×1.17 |  | 19 |
| header.title | Grunge | 2 | 10 | 29 lines ×1.47 | 20 lines ×1.21 | 46 ×2.43 |  | 20 |
| header.title | Grunge | 3 | 10 | 26 box ×2.5 | 31 lines ×1.64 | 42 lines ×2.3 |  | 26 |
| header.title | Grunge | 4 | 10 | 29 lines ×1.5 | 17 ×1.59 | 39 lines ×2.03 |  | 17 |
| header.title | Editorial | 1 | 10 | 12 ×1 | 12 ×0.99 | 14 ×1 |  | 12 |
| header.title | Editorial | 2 | 10 | 17 lines ×1 | 15 lines ×1 | 20 lines ×1.3 |  | 15 |
| header.title | Editorial | 3 | 10 | 15 ×1.49 | 17 lines ×1.02 | 15 ×1.23 |  | 15 |
| header.title | Editorial | 4 | 10 | 23 lines ×1.36 | 12 ×0.99 | 17 lines ×1 |  | 12 |
| header.title | Pop | 1 | 10 | 14 ×1.37 | 15 ×1.18 | 22 lines ×1 |  | 14 |
| header.title | Pop | 2 | 10 | 20 ×1.28 | 18 lines ×1.04 | 31 lines ×1.69 |  | 18 |
| header.title | Pop | 3 | 10 | 18 lines ×1.76 | 21 lines ×1.41 | 30 lines ×1.6 |  | 18 |
| header.title | Pop | 4 | 10 | 23 ×1.91 | 11 ×1.04 | 20 lines ×1.25 |  | 11 |

## The identity consumers (`who.*`)

| field | template | layout | seed | 1440 | 768 | 390 | 1440 column | probe |
|---|---|---|---|---|---|---|---|---|
| bio.who.kicker | Retro | 1 | 13 | 19 lines ×1 | 73 ×1 | 39 lines ×1 |  | 19 |
| bio.who.kicker | Retro | 2 | 13 | 30 ×1 | 78 ×1 | 20 ×1 |  | 20 |
| bio.who.kicker | Retro | 3 | 13 | 54 ×4.71 | 31 ×1.77 | 13 ×1.13 | 11 lines ×0.93 | 11 |
| bio.who.kicker | Retro | 4 | 13 | 79 ×6.38 | 94 ×7.45 | 47 ×3.82 |  | 47 |
| bio.who.kicker | Lime | 1 | 13 | 20 ×1 | 80 ×1 | 39 lines ×1 |  | 20 |
| bio.who.kicker | Lime | 2 | 13 | 29 lines ×1 | 74 ×1 | 23 ×1 |  | 23 |
| bio.who.kicker | Lime | 3 | 13 | 51 ×4.66 | 23 ×1.59 | 21 lines ×1.92 | 32 box ×1.84 | 21 |
| bio.who.kicker | Lime | 4 | 13 | 84 ×6.78 | 95 lines ×7.56 | 47 ×3.82 |  | 47 |
| bio.who.kicker | Grunge | 1 | 13 | 20 ×1 | 80 ×1 | 39 lines ×1 |  | 20 |
| bio.who.kicker | Grunge | 2 | 13 | 30 ×1 | 78 ×1 | 20 ×1 |  | 20 |
| bio.who.kicker | Grunge | 3 | 13 | 54 ×4.99 | 22 ×1.54 | 11 ×1 | 11 ×1 | 11 |
| bio.who.kicker | Grunge | 4 | 13 | 84 ×6.78 | 95 lines ×7.56 | 47 ×3.82 |  | 47 |
| bio.who.kicker | Editorial | 1 | 13 | 20 ×1 | 80 ×1 | 39 lines ×1 |  | 20 |
| bio.who.kicker | Editorial | 2 | 13 | 30 ×1 | 78 ×1 | 20 ×1 |  | 20 |
| bio.who.kicker | Editorial | 3 | 13 | 54 ×4.99 | 22 ×1.54 | 14 ×1.31 | 11 ×1 | 11 |
| bio.who.kicker | Editorial | 4 | 13 | 84 ×6.78 | 95 lines ×7.56 | 47 ×3.82 |  | 47 |
| bio.who.kicker | Pop | 1 | 13 | 26 lines ×1 | 74 lines ×1 | 30 lines ×1 |  | 26 |
| bio.who.kicker | Pop | 2 | 13 | 32 ×1 | 81 ×1 | 22 ×1 |  | 22 |
| bio.who.kicker | Pop | 3 | 13 | 54 ×4.99 | 22 ×1.54 | 11 ×1 | 11 ×1 | 11 |
| bio.who.kicker | Pop | 4 | 13 | 84 ×6.78 | 95 lines ×7.56 | 47 ×3.82 |  | 47 |
| bio.who.location | Retro | 1 | 14 | 23 lines ×1 | 76 ×1 | 42 lines ×1 |  | 23 |
| bio.who.location | Retro | 2 | 14 | 76 ×1 | 82 ×1 | 23 ×1 |  | 23 |
| bio.who.location | Retro | 3 | 14 | 58 ×3.87 | 33 ×1.46 | 17 lines ×1.12 | 15 lines ×1.01 | 15 |
| bio.who.location | Lime | 1 | 14 | 24 lines ×1 | 85 ×1 | 42 lines ×1 |  | 24 |
| bio.who.location | Lime | 2 | 14 | 31 ×1 | 78 ×1 | 26 ×1 |  | 26 |
| bio.who.location | Lime | 3 | 14 | 55 ×3.64 | 32 ×1.46 | 25 lines ×1.7 | 42 lines ×1.58 | 25 |
| bio.who.location | Grunge | 1 | 14 | 24 lines ×1 | 85 ×1 | 42 lines ×1 |  | 24 |
| bio.who.location | Grunge | 2 | 14 | 33 ×1 | 82 ×1 | 23 ×1 |  | 23 |
| bio.who.location | Grunge | 3 | 14 | 58 ×3.92 | 31 ×1.43 | 15 ×1.03 | 15 ×1.04 | 15 |
| bio.who.location | Editorial | 1 | 14 | 24 lines ×1 | 85 ×1 | 42 lines ×1 |  | 24 |
| bio.who.location | Editorial | 2 | 14 | 33 ×1 | 82 ×1 | 57 lines ×1 |  | 33 |
| bio.who.location | Editorial | 3 | 14 | 58 ×3.92 | 31 ×1.43 | 18 ×1.23 | 15 ×1.04 | 15 |
| bio.who.location | Pop | 1 | 14 | 27 lines ×1 | 75 lines ×1 | 31 lines ×1 |  | 27 |
| bio.who.location | Pop | 2 | 14 | 34 ×1 | 85 ×1 | 61 ×1 |  | 34 |
| bio.who.location | Pop | 3 | 14 | 58 ×3.92 | 31 ×1.43 | 15 ×1.03 | 15 ×1.04 | 15 |
| bio.who.seal | Retro | 1 | 10 | 19 ×1.56 | 19 ×1.55 | 19 ×1.56 |  | 19 |
| bio.who.seal | Retro | 3 | 10 | 19 ×1 | 19 ×1 | 19 ×1 | 19 ×1 | 19 |
| bio.who.seal | Lime | 1 | 10 | 13 ring ×1.15 | 13 ring ×1.14 | 13 ring ×1.16 |  | 13 |
| bio.who.seal | Lime | 3 | 10 | 22 ring ×1 | 22 ring ×1 | 22 ring ×1 | 22 ring ×1 | 22 |
| bio.who.seal | Grunge | 1 | 10 | 14 ring ×1.19 | 14 ring ×1.19 | 14 ring ×1.18 |  | 14 |
| bio.who.seal | Grunge | 3 | 10 | 14 ring ×1 | 14 ring ×1 | 14 ring ×1 | 14 ring ×1 | 14 |
| bio.who.seal | Editorial | 1 | 10 | 16 ring ×1.33 | 16 ring ×1.33 | 16 ring ×1.33 |  | 16 |
| bio.who.seal | Pop | 3 | 10 | 12 ring ×1 | 12 ring ×1.01 | 12 ring ×1 | 12 ring ×1 | 12 |
| bio.who.tags# | Retro | 2 | 6 | 8 lines ×1 | 7 lines ×1 | 8 lines ×1 |  | 7 |
| bio.who.tags# | Retro | 4 | 6 | 7 lines ×1 | 8 lines ×1 | 9 lines ×1 |  | 7 |
| bio.who.tags# | Lime | 2 | 6 | 6 lines ×1 | 8 lines ×1 | 8 lines ×1 |  | 6 |
| bio.who.tags# | Lime | 3 | 6 | 12 lines ×1 | 8 lines ×1 | 9 lines ×1 | 8 lines ×1 | 8 |
| bio.who.tags# | Lime | 4 | 6 | 8 lines ×1 | 10 lines ×1 | 9 lines ×1 |  | 8 |
| bio.who.tags# | Grunge | 2 | 6 | 6 lines ×1 | 8 lines ×1 | 8 lines ×1 |  | 6 |
| bio.who.tags# | Grunge | 3 | 6 | 12 lines ×1 | 8 lines ×1 | 9 lines ×1 | 8 lines ×1 | 8 |
| bio.who.tags# | Grunge | 4 | 6 | 8 lines ×1 | 10 lines ×1 | 9 lines ×1 |  | 8 |
| bio.who.tags# | Editorial | 2 | 6 | 6 lines ×1 | 8 lines ×1 | 8 lines ×1 |  | 6 |
| bio.who.tags# | Editorial | 3 | 6 | 12 lines ×1 | 8 lines ×1 | 9 lines ×1 | 8 lines ×1 | 8 |
| bio.who.tags# | Editorial | 4 | 6 | 8 lines ×1 | 10 lines ×1 | 9 lines ×1 |  | 8 |
| bio.who.tags# | Pop | 2 | 6 | 6 lines ×1 | 8 lines ×1 | 8 lines ×1 |  | 6 |
| bio.who.tags# | Pop | 3 | 6 | 12 lines ×1 | 8 lines ×1 | 9 lines ×1 | 8 lines ×1 | 8 |
| bio.who.tags# | Pop | 4 | 6 | 8 lines ×1 | 10 lines ×1 | 9 lines ×1 |  | 8 |
| bio.who.tags[] | Retro | 2 | 11 | 32 ×3.66 | 46 ×4.8 | 54 ×4.84 |  | 32 |
| bio.who.tags[] | Retro | 4 | 11 | 44 ×4.73 | 197 ×4.94 | 61 ×4.76 |  | 44 |
| bio.who.tags[] | Lime | 2 | 11 | 34 ×3.77 | 50 ×4.83 | 59 ×4.72 |  | 34 |
| bio.who.tags[] | Lime | 3 | 11 | 400+ | 202 ×4.91 | 64 ×4.66 | 186 ×5.27 | 64 |
| bio.who.tags[] | Lime | 4 | 11 | 47 ×5.15 | 68 ×4.91 | 64 ×4.66 |  | 47 |
| bio.who.tags[] | Grunge | 2 | 11 | 34 ×3.77 | 50 ×4.83 | 59 ×4.72 |  | 34 |
| bio.who.tags[] | Grunge | 3 | 11 | 400+ | 202 ×4.91 | 64 ×4.66 | 186 ×5.27 | 64 |
| bio.who.tags[] | Grunge | 4 | 11 | 47 ×5.15 | 68 ×4.91 | 64 ×4.66 |  | 47 |
| bio.who.tags[] | Editorial | 2 | 11 | 34 ×3.77 | 50 ×4.83 | 59 ×4.72 |  | 34 |
| bio.who.tags[] | Editorial | 3 | 11 | 400+ | 202 ×4.91 | 64 ×4.66 | 186 ×5.27 | 64 |
| bio.who.tags[] | Editorial | 4 | 11 | 47 ×5.15 | 68 ×4.91 | 64 ×4.66 |  | 47 |
| bio.who.tags[] | Pop | 2 | 11 | 34 ×3.77 | 50 ×4.83 | 59 ×4.72 |  | 34 |
| bio.who.tags[] | Pop | 3 | 11 | 400+ | 202 ×4.91 | 64 ×4.66 | 186 ×5.27 | 64 |
| bio.who.tags[] | Pop | 4 | 11 | 47 ×5.15 | 68 ×4.91 | 37 ×3.6 |  | 37 |
| bio.who.title | Retro | 1 | 10 | 400+ | 400+ | 400+ |  | 400 |
| bio.who.title | Retro | 2 | 10 | 55 lines ×1 | 247 ×1 | 67 ×1 |  | 55 |
| bio.who.title | Retro | 3 | 10 | 23 ×1.01 | 19 ×1 | 22 ×1 | 23 ×1 | 19 |
| bio.who.title | Retro | 4 | 10 | 59 ×2.7 | 79 ×3.64 | 48 ×2.38 |  | 48 |
| bio.who.title | Lime | 1 | 10 | 400+ | 400+ | 400+ |  | 400 |
| bio.who.title | Lime | 2 | 10 | 49 ×1 | 158 ×1 | 100 lines ×1 |  | 49 |
| bio.who.title | Lime | 3 | 10 | 24 ×1 | 20 lines ×1 | 30 lines ×1 | 24 ×1 | 20 |
| bio.who.title | Lime | 4 | 10 | 59 ×3.01 | 80 ×4.06 | 49 ×2.67 |  | 49 |
| bio.who.title | Grunge | 1 | 10 | 400+ | 400+ | 400+ |  | 400 |
| bio.who.title | Grunge | 2 | 10 | 65 ×1 | 220 ×1 | 100 lines ×1 |  | 65 |
| bio.who.title | Grunge | 3 | 10 | 18 ×1.03 | 22 ×1 | 32 ×1 | 18 ×1.02 | 18 |
| bio.who.title | Grunge | 4 | 10 | 63 ×3.28 | 87 lines ×4.45 | 60 ×3.13 |  | 60 |
| bio.who.title | Editorial | 1 | 10 | 400+ | 400+ | 400+ |  | 400 |
| bio.who.title | Editorial | 2 | 10 | 37 ×1 | 122 ×1 | 49 ×1 |  | 37 |
| bio.who.title | Editorial | 3 | 10 | 14 ×1 | 16 lines ×1 | 17 lines ×1 | 14 ×1 | 14 |
| bio.who.title | Editorial | 4 | 10 | 38 ×2.04 | 55 lines ×2.76 | 31 lines ×1.74 |  | 31 |
| bio.who.title | Pop | 2 | 10 | 37 ×1 | 115 ×1 | 50 ×1 |  | 37 |
| bio.who.title | Pop | 3 | 10 | 22 lines ×1.36 | 17 ×1.35 | 19 ×1 | 22 lines ×1.33 | 17 |
| bio.who.title | Pop | 4 | 10 | 43 lines ×2.44 | 63 ×3.32 | 39 ×2.12 |  | 39 |
| calendar.who.location | Retro | 1 | 14 | 22 overlap ×1.45 | 23 overlap ×1.54 | 24 overlap ×1.61 |  | 22 |
| calendar.who.location | Retro | 4 | 14 | 106 lines ×3.46 | 78 ×4.94 | 67 ×2.45 |  | 67 |
| calendar.who.location | Lime | 4 | 14 | 104 lines ×3.43 | 75 ×4.73 | 64 ×2.24 |  | 64 |
| calendar.who.location | Grunge | 4 | 14 | 55 ×3.42 | 78 ×4.94 | 67 ×2.45 |  | 55 |
| calendar.who.location | Editorial | 4 | 14 | 111 ×3.63 | 78 ×4.94 | 67 ×2.45 |  | 67 |
| calendar.who.location | Pop | 4 | 14 | 111 ×3.63 | 78 ×4.94 | 67 ×2.45 |  | 67 |
| calendar.who.seal | Retro | 1 | 10 | 19 ×1.55 | 19 ×1.55 | – |  | 19 |
| calendar.who.title | Retro | 1 | 10 | 400+ | 400+ | – |  | 400 |
| calendar.who.title | Retro | 2 | 10 | 306 ×14.1 | 213 ×6.92 | 64 ×3.31 |  | 64 |
| calendar.who.title | Lime | 2 | 10 | 306 ×14 | 142 ×6.84 | 64 ×3.31 |  | 64 |
| calendar.who.title | Grunge | 2 | 10 | 307 ×14.09 | 143 ×6.92 | 64 ×3.31 |  | 64 |
| calendar.who.title | Editorial | 2 | 10 | 307 ×14.09 | 143 ×6.92 | 64 ×3.31 |  | 64 |
| calendar.who.title | Pop | 2 | 10 | 307 ×14.09 | 143 ×6.92 | 64 ×3.31 |  | 64 |
| footer.who.seal | Retro | 1 | 10 | 19 ×1.41 | 19 ×1.41 | 19 ×1 |  | 19 |
| footer.who.seal | Lime | 1 | 10 | 13 ring ×1.15 | 13 ring ×1.15 | 13 ring ×1 |  | 13 |
| footer.who.seal | Grunge | 1 | 10 | 14 ring ×1.19 | 14 ring ×1.19 | 14 ring ×1 |  | 14 |
| footer.who.seal | Editorial | 1 | 10 | 16 ring ×1.33 | 16 ring ×1.33 | 16 ring ×1 |  | 16 |
| footer.who.seal | Pop | 1 | 10 | 12 ring ×1.1 | 12 ring ×1.08 | 12 ring ×1.1 |  | 12 |
| footer.who.title | Retro | 1 | 10 | 53 ×3.11 | 48 ×2.51 | 24 ×1.08 |  | 24 |
| footer.who.title | Lime | 1 | 10 | 60 ×3.69 | 69 ×3.3 | 46 ×1.15 |  | 46 |
| footer.who.title | Grunge | 1 | 10 | 82 overlap ×4.97 | 105 ×4.01 | 54 ×1.12 |  | 54 |
| footer.who.title | Editorial | 1 | 10 | 39 overlap ×2.78 | 55 ×3.47 | 39 ×1.06 |  | 39 |
| footer.who.title | Pop | 1 | 10 | 62 ×4.12 | 55 ×2.81 | 10 ×0.96 |  | 10 |
| form.who.kicker | Retro | 1 | 13 | 43 ×3.42 | 102 ×7.72 | 44 ×3.39 |  | 43 |
| form.who.kicker | Retro | 2 | 13 | 79 ×6.32 | 38 ×3.01 | 51 ×4.11 |  | 38 |
| form.who.kicker | Lime | 1 | 13 | 30 lines ×2.53 | 91 lines ×7.52 | 46 ×3.85 |  | 30 |
| form.who.kicker | Lime | 2 | 13 | 86 ×7.09 | 40 ×3.31 | 54 ×4.47 |  | 40 |
| form.who.kicker | Grunge | 1 | 13 | 30 lines ×2.53 | 91 lines ×7.52 | 46 ×3.85 |  | 30 |
| form.who.kicker | Grunge | 2 | 13 | 86 ×7.09 | 40 ×3.31 | 54 ×4.47 |  | 40 |
| form.who.kicker | Editorial | 1 | 13 | 30 lines ×2.35 | 85 lines ×6.54 | 39 ×2.75 |  | 30 |
| form.who.kicker | Editorial | 2 | 13 | 86 ×5.29 | 40 ×2.28 | 54 ×2.76 |  | 40 |
| form.who.kicker | Pop | 1 | 13 | 48 ×3.3 | 99 lines ×6.75 | 39 ×2.65 |  | 39 |
| form.who.kicker | Pop | 2 | 13 | 86 ×6.37 | 40 ×2.6 | 54 ×3.24 |  | 40 |
| form.who.seal | Pop | 1 | 10 | 12 ring ×1.08 | – | – |  | 12 |
| form.who.title | Retro | 1 | 10 | 80 ×3.68 | 172 ×7.79 | 76 ×3.55 |  | 76 |
| form.who.title | Retro | 2 | 10 | 110 ×6.19 | 50 ×3.17 | 52 ×4.14 |  | 50 |
| form.who.title | Retro | 3 | 10 | 22 ×1 | 30 lines ×1 | 13 ×1 |  | 13 |
| form.who.title | Lime | 1 | 10 | 61 ×2.59 | 88 ×7.45 | 80 ×4.06 |  | 61 |
| form.who.title | Lime | 2 | 10 | 182 ×7.22 | 40 ×3.44 | 92 ×4.67 |  | 40 |
| form.who.title | Lime | 3 | 10 | 17 lines ×1 | 24 ×1 | 13 ×1 |  | 13 |
| form.who.title | Grunge | 1 | 10 | 50 ×2.59 | 133 ×7.49 | 65 ×3.97 |  | 50 |
| form.who.title | Grunge | 2 | 10 | 196 ×7.22 | 85 lines ×3.53 | 104 ×4.67 |  | 85 |
| form.who.title | Grunge | 3 | 10 | 23 lines ×1 | 31 lines ×1 | 28 ×1 |  | 23 |
| form.who.title | Editorial | 1 | 10 | 27 box ×2.67 | 67 ×6.4 | 29 box ×2.94 |  | 27 |
| form.who.title | Editorial | 2 | 10 | 107 lines ×5.38 | 42 lines ×2.43 | 56 lines ×2.88 |  | 42 |
| form.who.title | Editorial | 3 | 10 | 9 lines ×1 | 10 ×1 | 17 lines ×1 |  | 9 |
| form.who.title | Pop | 1 | 10 | 64 ×2.15 | 139 lines ×6.83 | 55 lines ×2.85 |  | 55 |
| form.who.title | Pop | 2 | 10 | 129 ×6.48 | 54 lines ×2.78 | 63 ×3.38 |  | 54 |
| form.who.title | Pop | 3 | 10 | 17 lines ×1 | 22 ×1 | 11 ×1 |  | 11 |
| gallery.who.title | Retro | 1 | 10 | 131 ×6.79 | 163 ×8.05 | 80 ×4.2 |  | 80 |
| gallery.who.title | Retro | 2 | 10 | 106 ×10.04 | 41 box ×3.82 | 29 box ×2.67 |  | 29 |
| gallery.who.title | Lime | 1 | 10 | 128 ×6.47 | 193 ×9.57 | 106 lines ×5.44 |  | 106 |
| gallery.who.title | Lime | 2 | 10 | 95 box ×9.05 | 37 box ×3.48 | 28 box ×2.67 |  | 28 |
| gallery.who.title | Grunge | 1 | 10 | 141 ×7.04 | 193 ×9.57 | 106 lines ×5.44 |  | 106 |
| gallery.who.title | Grunge | 2 | 10 | 104 box ×9.86 | 40 ×3.82 | 28 box ×2.67 |  | 28 |
| gallery.who.title | Editorial | 1 | 10 | 128 ×6.47 | 193 ×9.57 | 106 lines ×5.44 |  | 106 |
| gallery.who.title | Editorial | 2 | 10 | 104 box ×9.86 | 40 ×3.82 | 28 box ×2.67 |  | 28 |
| gallery.who.title | Pop | 1 | 10 | 146 ×7.24 | 163 ×8.05 | 80 ×4.2 |  | 80 |
| gallery.who.title | Pop | 2 | 10 | 104 ×9.89 | 40 ×3.84 | 29 box ×2.7 |  | 29 |
| map.who.location | Retro | 2 | 14 | 35 ×1 | 18 ×1 | 19 ×1 |  | 18 |
| map.who.location | Lime | 2 | 14 | 30 lines ×1 | 15 ×1 | 18 lines ×1 |  | 15 |
| map.who.location | Grunge | 2 | 14 | 33 lines ×1 | 17 lines ×1 | 20 ×1 |  | 17 |
| map.who.location | Editorial | 2 | 14 | 18 lines ×1 | 17 lines ×1 | 18 lines ×1 |  | 17 |
| map.who.location | Pop | 2 | 14 | 22 lines ×1 | 18 lines ×1 | 20 ×1 |  | 18 |
| media.who.title | Retro | 1 | 10 | 152 ×7.25 | 206 ×9.61 | 91 ×4.57 |  | 91 |
| media.who.title | Retro | 2 | 10 | 17 box ×1 | 17 box ×1 | 11 overlap ×1 |  | 11 |
| media.who.title | Retro | 3 | 10 | 85 ×7.23 | 53 ×4.62 | 20 ×1.74 | 51 ×4.39 | 20 |
| media.who.title | Retro | 4 | 10 | 30 ×1 | 30 ×1 | 40 ×1 |  | 30 |
| media.who.title | Lime | 1 | 10 | 76 ×1 | 206 ×1 | 104 lines ×1 |  | 76 |
| media.who.title | Lime | 2 | 10 | 11 ×1 | 12 ×1 | 11 ×1 |  | 11 |
| media.who.title | Lime | 3 | 10 | 70 ×6.65 | 43 box ×4.14 | 19 box ×1.86 | 42 ×4.07 | 19 |
| media.who.title | Lime | 4 | 10 | 29 box ×1 | 29 box ×1 | 37 ×1 |  | 29 |
| media.who.title | Grunge | 1 | 10 | 41 ×1 | 40 ×1 | 40 ×1 |  | 40 |
| media.who.title | Grunge | 2 | 10 | 15 ×1 | 16 ×1 | 11 ×1 |  | 11 |
| media.who.title | Grunge | 3 | 10 | 77 ×7.35 | 47 ×4.49 | 21 ×1.97 | 47 box ×4.5 | 21 |
| media.who.title | Grunge | 4 | 10 | 31 ×1 | 31 ×1 | 41 ×1 |  | 31 |
| media.who.title | Editorial | 1 | 10 | 60 ×1 | 55 ×1 | 43 ×1 |  | 43 |
| media.who.title | Editorial | 2 | 10 | 19 box ×1 | 16 ×1 | 11 ×1 |  | 11 |
| media.who.title | Editorial | 3 | 10 | 41 ×4.03 | 25 box ×2.53 | 11 box ×1.05 | 25 box ×2.53 | 11 |
| media.who.title | Editorial | 4 | 10 | 31 ×1 | 31 ×1 | 41 ×1 |  | 31 |
| media.who.title | Pop | 1 | 10 | 112 ×5.48 | 11 ×0.97 | 85 lines ×4.27 |  | 11 |
| media.who.title | Pop | 2 | 10 | 15 ×1 | 16 ×1 | 11 ×1 |  | 11 |
| media.who.title | Pop | 3 | 10 | 51 ×4.87 | 30 box ×2.94 | 13 box ×1.27 | 31 ×3.05 | 13 |
| media.who.title | Pop | 4 | 10 | 31 ×1 | 31 ×1 | 41 ×1 |  | 31 |
| pricing.who.seal | Grunge | 1 | 10 | 14 ring ×1.19 | 14 ring ×1.19 | 14 ring ×1.19 |  | 14 |
| pricing.who.title | Grunge | 1 | 10 | 400+ | 400+ | 400+ |  | 400 |
| testimonials.who.title | Retro | 3 | 10 | 66 ×1 | 65 ×1 | 104 lines ×1 |  | 65 |
| testimonials.who.title | Lime | 3 | 10 | 60 ×1 | 61 ×1 | 104 lines ×1 |  | 60 |
| testimonials.who.title | Grunge | 3 | 10 | 67 ×1 | 74 ×1 | 107 lines ×1 |  | 67 |
| testimonials.who.title | Editorial | 3 | 10 | 67 ×1 | 74 ×1 | 107 lines ×1 |  | 67 |
| testimonials.who.title | Pop | 3 | 10 | 67 ×1 | 74 ×1 | 107 lines ×1 |  | 67 |
