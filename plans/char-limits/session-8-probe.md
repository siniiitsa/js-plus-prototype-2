# Character limits — session 8 probe readout (the events map's own fields)

`scripts/limits.mjs map` output, 2026-10-13, every template, design and width, for the map's own
text keys and its two repeaters' columns
(`--keys=gigs.venue,gigs.city,gigs.time,gigs.month,gigs.day,kicker,listLabel,heading,radius,base,terms,travelTime,fee,homeLabel,homeCaption,venueLabel,venueCaption,radiusLabel,travelTimeLabel,feeLabel,venueCta,routeCta,cta,status,updated,rings[],expand,span,stats.label,stats.value,stats.sub`),
the list built from `FIELDS.map`. `rings#` is not probed: the map slices its labels to its three
rings. `IDENTITY_CHARS.map` is session 1's and was not re-measured: `--check`'s `who.*` rows
re-verify it. Each cell is the largest passing length at that surface, then the test the next
length failed (none: a sample failed it, `400+`: open), then `×grow`, the seat's width at the cap
over the seed's. *probe* is the minimum over the surfaces. The cap written into `data.js` applies
the session's rules to it (`plans/char-limits.md`, *Session 8*).

- **The gig columns are read solo here, each beside the others' seeds.** City, time, month and day
  share a line (the meta line, layout 2's when-chip, layout 4's ticker), so the written caps are a
  joint split (`plans/char-limits.md`, *Session 8*, judgement 2), not these numbers.
- **Layout 2's gig columns are written into rows 0 and 1** (`rowsAt` in `limits.mjs`): the panel
  features row 0 and the list is the page minus it, so row 0 never reaches a list row.
- **`gigs.month` and `gigs.day` take `KEY_SAMPLES`**: month names (*September*, *February*,
  *December*) and digit-led dates (*28th–30th*, *31st & 1st*, *17th to 19th*).
- **Twelve keys are the second run** (`gigs.venue`, `gigs.city`, `gigs.month`, `gigs.day`,
  `heading`, `radius`, `venueLabel`, `venueCaption`, `venueCta`, `status`, `stats.value`,
  `stats.sub`), after the confirm step stopped testing lengths under the seed's (*Probe fixes*).
  Only layout 2's day moved, from 2 to 3.

| field | template | layout | seed | 1440 | 768 | 390 | 1440 column | probe |
|---|---|---|---|---|---|---|---|---|
| map.base | Retro | 1 | 19 | 45 ×2.14 | 57 ×2.69 | 29 ×1.41 |  | 29 |
| map.base | Retro | 3 | 19 | 49 ×1.65 | 35 ×1 | 33 ×1.28 |  | 33 |
| map.base | Lime | 1 | 19 | 42 ×2.12 | 61 ×3.04 | 35 ×1.77 |  | 35 |
| map.base | Lime | 3 | 19 | 40 ×1.43 | 27 ×1 | 33 ×1.28 |  | 27 |
| map.base | Grunge | 1 | 19 | 42 ×2.11 | 63 ×3.1 | 39 ×1.94 |  | 39 |
| map.base | Grunge | 3 | 19 | 48 ×1.64 | 35 ×1 | 33 ×1.28 |  | 33 |
| map.base | Editorial | 1 | 19 | 27 lines ×1.41 | 40 lines ×2.07 | 24 lines ×1.26 |  | 24 |
| map.base | Editorial | 3 | 19 | 48 ×1.64 | 35 ×1 | 33 ×1.28 |  | 33 |
| map.base | Pop | 1 | 19 | 36 ×1.83 | 41 ×2.07 | 24 lines ×1.22 |  | 24 |
| map.base | Pop | 3 | 19 | 48 ×1.64 | 35 ×1 | 33 ×1.28 |  | 33 |
| map.cta | Retro | 3 | 12 | 86 ×4.33 | 59 ×2.83 | 52 ×1 |  | 52 |
| map.cta | Lime | 3 | 12 | 72 box ×3.92 | 47 box ×2.55 | 47 ×1 |  | 47 |
| map.cta | Grunge | 3 | 12 | 79 box ×4.1 | 52 ×2.62 | 53 page ×1 |  | 52 |
| map.cta | Editorial | 3 | 12 | 42 ×2.92 | 28 box ×2.01 | 28 page ×1 |  | 28 |
| map.cta | Pop | 3 | 12 | 52 ×3.28 | 33 box ×2.14 | 33 ×1 |  | 33 |
| map.expand | Retro | 2 | 11 | 75 ×5.47 | 36 ×2.77 | 41 overlap ×3.1 |  | 36 |
| map.expand | Retro | 3 | 11 | 174 ×12.19 | 92 page ×6.64 | 54 ×3.99 |  | 54 |
| map.expand | Lime | 2 | 11 | 66 ×4.8 | 33 overlap ×2.53 | 41 overlap ×3.08 |  | 33 |
| map.expand | Lime | 3 | 11 | 154 ×10.88 | 83 page ×6.05 | 54 ×3.96 |  | 54 |
| map.expand | Grunge | 2 | 11 | 73 ×5.32 | 36 ×2.75 | 41 overlap ×3.08 |  | 36 |
| map.expand | Grunge | 3 | 11 | 170 ×11.88 | 92 page ×6.6 | 54 ×3.96 |  | 54 |
| map.expand | Editorial | 2 | 11 | 73 ×5.32 | 36 ×2.75 | 41 overlap ×3.08 |  | 36 |
| map.expand | Editorial | 3 | 11 | 170 ×11.88 | 92 page ×6.6 | 54 ×3.96 |  | 54 |
| map.expand | Pop | 2 | 11 | 73 ×5.32 | 36 ×2.75 | 41 overlap ×3.08 |  | 36 |
| map.expand | Pop | 3 | 11 | 170 ×11.88 | 92 page ×6.6 | 54 ×3.96 |  | 54 |
| map.fee | Retro | 2 | 6 | 24 ×1 | 11 ×1 | 12 ×1 |  | 11 |
| map.fee | Lime | 2 | 6 | 25 ×1 | 13 ×1 | 14 ×1 |  | 13 |
| map.fee | Grunge | 2 | 6 | 25 ×1 | 13 ×1 | 14 ×1 |  | 13 |
| map.fee | Editorial | 2 | 6 | 25 ×1 | 13 ×1 | 14 ×1 |  | 13 |
| map.fee | Pop | 2 | 6 | 25 ×1 | 13 ×1 | 14 ×1 |  | 13 |
| map.feeLabel | Retro | 2 | 11 | 32 ×1 | 14 ×1 | 17 lines ×1 |  | 14 |
| map.feeLabel | Lime | 2 | 11 | 30 ×1 | 15 ×1 | 18 ×1 |  | 15 |
| map.feeLabel | Grunge | 2 | 11 | 33 ×1 | 17 lines ×1 | 18 ×1 |  | 17 |
| map.feeLabel | Editorial | 2 | 11 | 33 ×1 | 17 lines ×1 | 18 ×1 |  | 17 |
| map.feeLabel | Pop | 2 | 11 | 33 ×1 | 17 lines ×1 | 18 ×1 |  | 17 |
| map.gigs.city | Retro | 1 | 13 | 71 lines ×1.05 | 77 lines ×1.7 | 30 lines ×1.16 |  | 30 |
| map.gigs.city | Retro | 2 | 13 | 35 ×1 | 18 ×1 | 19 ×1 |  | 18 |
| map.gigs.city | Retro | 3 | 13 | 62 ×1 | 53 ×1.09 | 41 ×1 |  | 41 |
| map.gigs.city | Retro | 4 | 13 | 201 ×1 | 92 box ×1 | 31 ×1 |  | 31 |
| map.gigs.city | Lime | 1 | 13 | 58 ×0.89 | 86 ×1.67 | 30 box ×0.94 |  | 30 |
| map.gigs.city | Lime | 2 | 13 | 30 lines ×1 | 15 ×1 | 18 lines ×1 |  | 15 |
| map.gigs.city | Lime | 3 | 13 | 64 ×1 | 48 ×1.08 | 41 ×1 |  | 41 |
| map.gigs.city | Lime | 4 | 13 | 181 ×1 | 86 ×1 | 34 ×1 |  | 34 |
| map.gigs.city | Grunge | 1 | 13 | 58 ×0.99 | 86 ×1.85 | 30 box ×1.22 |  | 30 |
| map.gigs.city | Grunge | 2 | 13 | 33 lines ×1 | 17 lines ×1 | 20 ×1 |  | 17 |
| map.gigs.city | Grunge | 3 | 13 | 64 ×1 | 53 ×1.09 | 41 ×1 |  | 41 |
| map.gigs.city | Grunge | 4 | 13 | 200 ×1 | 95 ×1 | 34 ×1 |  | 34 |
| map.gigs.city | Editorial | 1 | 13 | 60 ×0.61 | 85 ×1.11 | 39 ×0.77 |  | 39 |
| map.gigs.city | Editorial | 2 | 13 | 38 ×1 | 18 ×1 | 23 ×1 |  | 18 |
| map.gigs.city | Editorial | 3 | 13 | 67 ×1 | 53 ×1.09 | 41 ×1 |  | 41 |
| map.gigs.city | Editorial | 4 | 13 | 200 ×1 | 95 ×1 | 34 ×1 |  | 34 |
| map.gigs.city | Pop | 1 | 13 | 47 box ×0.86 | 56 box ×1.59 | 16 box ×0.79 |  | 16 |
| map.gigs.city | Pop | 2 | 13 | 38 ×1 | 18 ×1 | 23 ×1 |  | 18 |
| map.gigs.city | Pop | 3 | 13 | 64 ×1 | 53 ×1.09 | 41 ×1 |  | 41 |
| map.gigs.city | Pop | 4 | 13 | 200 ×1 | 95 ×1 | 34 ×1 |  | 34 |
| map.gigs.day | Retro | 1 | 2 | 5 lines ×0.08 | 5 lines ×0.07 | 5 lines ×0.13 |  | 5 |
| map.gigs.day | Retro | 2 | 2 | 5 box ×0.52 | 5 box ×0.72 | 5 box ×0.63 |  | 5 |
| map.gigs.day | Retro | 3 | 2 | 5 lines ×0.21 | 12 lines ×0.31 | 8 lines ×0.2 |  | 5 |
| map.gigs.day | Retro | 4 | 2 | 196 box ×1 | 84 box ×1 | 22 box ×1 |  | 22 |
| map.gigs.day | Lime | 1 | 2 | 6 lines ×0.07 | 6 lines ×0.06 | 6 lines ×0.13 |  | 6 |
| map.gigs.day | Lime | 2 | 2 | 3 box ×0.46 | 4 box ×0.76 | 11 lines ×0.79 |  | 3 |
| map.gigs.day | Lime | 3 | 2 | 5 lines ×0.19 | 12 lines ×0.33 | 8 lines ×0.21 |  | 5 |
| map.gigs.day | Lime | 4 | 2 | 175 box ×1 | 79 box ×1 | 25 box ×1 |  | 25 |
| map.gigs.day | Grunge | 1 | 2 | 6 lines ×0.08 | 6 lines ×0.07 | 6 lines ×0.13 |  | 6 |
| map.gigs.day | Grunge | 2 | 2 | 3 box ×0.47 | 4 box ×0.69 | 11 lines ×0.79 |  | 3 |
| map.gigs.day | Grunge | 3 | 2 | 5 lines ×0.21 | 12 lines ×0.31 | 8 lines ×0.21 |  | 5 |
| map.gigs.day | Grunge | 4 | 2 | 195 box ×1 | 88 box ×1 | 25 box ×1 |  | 25 |
| map.gigs.day | Editorial | 1 | 2 | 6 lines ×0.08 | 6 lines ×0.07 | 6 lines ×0.13 |  | 6 |
| map.gigs.day | Editorial | 2 | 2 | 3 box ×0.47 | 4 box ×0.69 | 11 lines ×0.79 |  | 3 |
| map.gigs.day | Editorial | 3 | 2 | 5 lines ×0.21 | 12 lines ×0.31 | 8 lines ×0.21 |  | 5 |
| map.gigs.day | Editorial | 4 | 2 | 195 box ×1 | 88 box ×1 | 25 box ×1 |  | 25 |
| map.gigs.day | Pop | 1 | 2 | 6 box ×0.09 | 6 box ×0.08 | 6 box ×0.15 |  | 6 |
| map.gigs.day | Pop | 2 | 2 | 3 box ×0.47 | 4 box ×0.69 | 11 lines ×0.79 |  | 3 |
| map.gigs.day | Pop | 3 | 2 | 5 lines ×0.21 | 12 lines ×0.31 | 8 lines ×0.21 |  | 5 |
| map.gigs.day | Pop | 4 | 2 | 195 box ×1 | 88 box ×1 | 25 box ×1 |  | 25 |
| map.gigs.month | Retro | 1 | 3 | 7 box ×2.33 | 7 box ×2.33 | 7 box ×2.33 |  | 7 |
| map.gigs.month | Retro | 2 | 3 | 58 lines ×3.87 | 13 lines ×1.62 | 17 ×1.8 |  | 13 |
| map.gigs.month | Retro | 3 | 3 | 11 ×3.55 | 11 ×3.69 | 11 ×3.69 |  | 11 |
| map.gigs.month | Retro | 4 | 3 | 157 box ×1 | 66 ×1 | 18 ×1 |  | 18 |
| map.gigs.month | Lime | 1 | 3 | 5 box ×1.65 | 6 box ×2.13 | 7 box ×2.52 |  | 5 |
| map.gigs.month | Lime | 2 | 3 | 43 ×3.17 | 5 ×1.14 | 12 box ×1.56 |  | 5 |
| map.gigs.month | Lime | 3 | 3 | 12 lines ×4 | 12 lines ×4.15 | 12 lines ×4.15 |  | 12 |
| map.gigs.month | Lime | 4 | 3 | 141 box ×1 | 63 box ×1 | 21 box ×1 |  | 21 |
| map.gigs.month | Grunge | 1 | 3 | 5 box ×1.65 | 6 box ×2.13 | 7 box ×2.52 |  | 5 |
| map.gigs.month | Grunge | 2 | 3 | 51 box ×3.55 | 8 box ×1.36 | 12 box ×1.56 |  | 8 |
| map.gigs.month | Grunge | 3 | 3 | 12 lines ×4 | 12 lines ×4.15 | 12 lines ×4.15 |  | 12 |
| map.gigs.month | Grunge | 4 | 3 | 156 ×1 | 69 ×1 | 21 box ×1 |  | 21 |
| map.gigs.month | Editorial | 1 | 3 | 5 box ×1.7 | 6 ×2.17 | 7 box ×2.52 |  | 5 |
| map.gigs.month | Editorial | 2 | 3 | 51 box ×3.55 | 8 box ×1.36 | 12 box ×1.56 |  | 8 |
| map.gigs.month | Editorial | 3 | 3 | 12 lines ×4 | 12 lines ×4.15 | 12 lines ×4.15 |  | 12 |
| map.gigs.month | Editorial | 4 | 3 | 156 ×1 | 69 ×1 | 21 box ×1 |  | 21 |
| map.gigs.month | Pop | 1 | 3 | 9 box ×2.93 | 9 box ×3 | 9 box ×3 |  | 9 |
| map.gigs.month | Pop | 2 | 3 | 51 box ×3.55 | 8 box ×1.36 | 12 box ×1.56 |  | 8 |
| map.gigs.month | Pop | 3 | 3 | 12 lines ×4 | 12 lines ×4.15 | 12 lines ×4.15 |  | 12 |
| map.gigs.month | Pop | 4 | 3 | 156 ×1 | 69 ×1 | 21 box ×1 |  | 21 |
| map.gigs.time | Retro | 1 | 5 | 66 lines ×3.22 | 72 lines ×4.24 | 25 lines ×1.9 |  | 25 |
| map.gigs.time | Retro | 2 | 5 | 65 ×1 | 12 ×1 | 17 ×1 |  | 12 |
| map.gigs.time | Retro | 3 | 5 | 55 ×1 | 24 ×1 | 35 ×1 |  | 24 |
| map.gigs.time | Retro | 4 | 5 | 195 ×1 | 85 ×1 | 25 ×1 |  | 25 |
| map.gigs.time | Lime | 1 | 5 | 52 ×3.21 | 79 ×4.76 | 24 box ×1.86 |  | 24 |
| map.gigs.time | Lime | 2 | 5 | 55 ×1 | 9 ×1 | 17 ×1 |  | 9 |
| map.gigs.time | Lime | 3 | 5 | 58 ×1 | 24 ×1 | 35 ×1 |  | 24 |
| map.gigs.time | Lime | 4 | 5 | 174 ×1 | 78 ×1 | 29 ×1 |  | 29 |
| map.gigs.time | Grunge | 1 | 5 | 52 ×3.37 | 79 ×4.76 | 24 box ×1.92 |  | 24 |
| map.gigs.time | Grunge | 2 | 5 | 64 ×1 | 12 ×1 | 17 ×1 |  | 12 |
| map.gigs.time | Grunge | 3 | 5 | 58 ×1 | 24 ×1 | 35 ×1 |  | 24 |
| map.gigs.time | Grunge | 4 | 5 | 195 ×1 | 89 ×1 | 29 ×1 |  | 29 |
| map.gigs.time | Editorial | 1 | 5 | 53 ×1.48 | 78 ×2.14 | 33 ×1.09 |  | 33 |
| map.gigs.time | Editorial | 2 | 5 | 55 ×1 | 12 ×1 | 17 ×1 |  | 12 |
| map.gigs.time | Editorial | 3 | 5 | 60 ×1 | 27 ×1 | 35 ×1 |  | 27 |
| map.gigs.time | Editorial | 4 | 5 | 195 ×1 | 89 ×1 | 29 ×1 |  | 29 |
| map.gigs.time | Pop | 1 | 5 | 42 box ×2.39 | 51 box ×2.75 | 11 box ×1.03 |  | 11 |
| map.gigs.time | Pop | 2 | 5 | 59 ×1 | 12 ×1 | 17 ×1 |  | 12 |
| map.gigs.time | Pop | 3 | 5 | 58 ×1 | 24 ×1 | 35 ×1 |  | 24 |
| map.gigs.time | Pop | 4 | 5 | 195 ×1 | 89 ×1 | 29 ×1 |  | 29 |
| map.gigs.venue | Retro | 1 | 18 | 60 ×3.07 | 80 ×4.11 | 34 ×1.76 |  | 34 |
| map.gigs.venue | Retro | 2 | 18 | 44 ×1 | 21 ×1 | 26 ×1 |  | 21 |
| map.gigs.venue | Retro | 3 | 18 | 52 ×1 | 66 ×1 | 41 ×1 |  | 41 |
| map.gigs.venue | Retro | 4 | 18 | 180 ×1 | 93 ×1 | 36 ×1 |  | 36 |
| map.gigs.venue | Lime | 1 | 18 | 57 box ×3.25 | 84 ×4.81 | 32 ×1.84 |  | 32 |
| map.gigs.venue | Lime | 2 | 18 | 40 overlap ×1 | 18 box ×1 | 23 box ×1 |  | 18 |
| map.gigs.venue | Lime | 3 | 18 | 44 ×1 | 60 ×1 | 37 ×1 |  | 37 |
| map.gigs.venue | Lime | 4 | 18 | 191 ×1 | 96 ×1 | 40 ×1 |  | 40 |
| map.gigs.venue | Grunge | 1 | 18 | 63 ×3.39 | 94 box ×4.82 | 36 ×1.93 |  | 36 |
| map.gigs.venue | Grunge | 2 | 18 | 42 ×1 | 20 ×1 | 25 box ×1 |  | 20 |
| map.gigs.venue | Grunge | 3 | 18 | 49 ×1 | 64 ×1 | 41 ×1 |  | 41 |
| map.gigs.venue | Grunge | 4 | 18 | 191 ×1 | 96 ×1 | 40 ×1 |  | 40 |
| map.gigs.venue | Editorial | 1 | 18 | 26 box ×1.53 | 37 ×2.09 | 19 ×1.1 |  | 19 |
| map.gigs.venue | Editorial | 2 | 18 | 25 box ×1 | 19 box ×1 | 17 overlap ×1 |  | 17 |
| map.gigs.venue | Editorial | 3 | 18 | 29 lines ×1 | 60 ×1 | 25 lines ×1 |  | 25 |
| map.gigs.venue | Editorial | 4 | 18 | 191 ×1 | 96 ×1 | 40 ×1 |  | 40 |
| map.gigs.venue | Pop | 1 | 18 | 41 ×2.35 | 47 box ×2.71 | 17 box ×0.97 |  | 17 |
| map.gigs.venue | Pop | 2 | 18 | 29 box ×1 | 20 ×1 | 17 box ×1 |  | 17 |
| map.gigs.venue | Pop | 3 | 18 | 33 ×1 | 64 lines ×1 | 28 ×1 |  | 28 |
| map.gigs.venue | Pop | 4 | 18 | 191 ×1 | 96 ×1 | 40 ×1 |  | 40 |
| map.heading | Retro | 1 | 10 | 30 lines ×2.54 | 24 lines ×2 | 20 ×1.65 |  | 20 |
| map.heading | Retro | 2 | 10 | 44 ×0.79 | 20 ×0.52 | 25 lines ×0.58 |  | 20 |
| map.heading | Retro | 3 | 18 | 58 ×2.99 | 39 ×1.99 | 44 ×2.29 |  | 39 |
| map.heading | Retro | 4 | 22 | 59 ×1 | 25 ×1 | 37 ×1 |  | 25 |
| map.heading | Lime | 1 | 10 | 25 lines ×2.19 | 20 ×1.71 | 19 lines ×1.67 |  | 19 |
| map.heading | Lime | 2 | 10 | 37 ×0.78 | 17 lines ×0.52 | 22 lines ×0.58 |  | 17 |
| map.heading | Lime | 3 | 18 | 50 ×2.89 | 34 lines ×1.97 | 40 lines ×2.31 |  | 34 |
| map.heading | Lime | 4 | 22 | 28 lines ×1 | 24 lines ×1 | 33 ×1 |  | 24 |
| map.heading | Grunge | 1 | 10 | 16 overlap ×1.35 | 22 lines ×1.88 | 25 lines ×2.17 |  | 16 |
| map.heading | Grunge | 2 | 10 | 41 ×0.79 | 20 lines ×0.54 | 25 lines ×0.6 |  | 20 |
| map.heading | Grunge | 3 | 18 | 55 ×3.09 | 37 ×2.08 | 44 ×2.52 |  | 37 |
| map.heading | Grunge | 4 | 22 | 32 lines ×1 | 27 lines ×1 | 25 lines ×1 |  | 25 |
| map.heading | Editorial | 1 | 10 | 12 overlap ×1.04 | 11 ×0.93 | 12 ×1.04 |  | 11 |
| map.heading | Editorial | 2 | 10 | 25 lines ×0.81 | 19 ×0.57 | 23 ×0.6 |  | 19 |
| map.heading | Editorial | 3 | 18 | 33 lines ×2.01 | 22 lines ×1.34 | 27 lines ×1.66 |  | 22 |
| map.heading | Editorial | 4 | 22 | 22 ×1 | 30 lines ×1 | 20 lines ×1 |  | 20 |
| map.heading | Pop | 1 | 10 | 23 ×1.99 | 17 lines ×1.46 | 17 lines ×1.46 |  | 17 |
| map.heading | Pop | 2 | 10 | 28 ×0.79 | 21 lines ×0.57 | 31 ×0.6 |  | 21 |
| map.heading | Pop | 3 | 18 | 37 ×2.14 | 25 lines ×1.48 | 30 lines ×1.79 |  | 25 |
| map.heading | Pop | 4 | 22 | 39 lines ×1 | 23 lines ×1 | 31 lines ×1 |  | 23 |
| map.homeCaption | Retro | 2 | 13 | 42 ×1 | 18 lines ×1 | 20 lines ×1 |  | 18 |
| map.homeCaption | Lime | 2 | 13 | 38 ×1 | 16 ×1 | 20 lines ×1 |  | 16 |
| map.homeCaption | Grunge | 2 | 13 | 42 ×1 | 18 lines ×1 | 20 lines ×1 |  | 18 |
| map.homeCaption | Editorial | 2 | 13 | 42 ×1 | 18 lines ×1 | 20 lines ×1 |  | 18 |
| map.homeCaption | Pop | 2 | 13 | 42 ×1 | 18 lines ×1 | 20 lines ×1 |  | 18 |
| map.homeLabel | Retro | 2 | 8 | 42 ×1 | 18 lines ×1 | 20 lines ×1 |  | 18 |
| map.homeLabel | Lime | 2 | 8 | 38 ×1 | 16 ×1 | 20 lines ×1 |  | 16 |
| map.homeLabel | Grunge | 2 | 8 | 42 ×1 | 18 lines ×1 | 20 lines ×1 |  | 18 |
| map.homeLabel | Editorial | 2 | 8 | 42 ×1 | 18 lines ×1 | 20 lines ×1 |  | 18 |
| map.homeLabel | Pop | 2 | 8 | 42 ×1 | 18 lines ×1 | 20 lines ×1 |  | 18 |
| map.kicker | Retro | 1 | 14 | 164 ×1 | 87 lines ×1 | 44 ×1 |  | 44 |
| map.kicker | Retro | 2 | 13 | 85 ×3.81 | 30 lines ×1.73 | 34 ×2.04 |  | 30 |
| map.kicker | Retro | 3 | 13 | 111 ×8.71 | 58 ×4.65 | 63 ×4.99 |  | 58 |
| map.kicker | Lime | 1 | 14 | 186 ×1 | 119 ×1 | 67 ×1 |  | 67 |
| map.kicker | Lime | 2 | 13 | 73 ×3.22 | 26 ×1.44 | 34 ×1.85 |  | 26 |
| map.kicker | Lime | 3 | 13 | 99 lines ×7.8 | 53 ×4.26 | 63 ×4.99 |  | 53 |
| map.kicker | Grunge | 1 | 14 | 186 ×1 | 119 ×1 | 67 ×1 |  | 67 |
| map.kicker | Grunge | 2 | 13 | 83 lines ×3.66 | 30 lines ×1.7 | 34 ×2.04 |  | 30 |
| map.kicker | Grunge | 3 | 13 | 109 ×8.55 | 58 ×4.65 | 63 ×4.99 |  | 58 |
| map.kicker | Editorial | 1 | 14 | 186 ×1 | 119 ×1 | 67 ×1 |  | 67 |
| map.kicker | Editorial | 2 | 13 | 83 lines ×2.24 | 30 lines ×1.04 | 34 ×1.26 |  | 30 |
| map.kicker | Editorial | 3 | 13 | 109 ×8.55 | 58 ×4.65 | 63 ×4.99 |  | 58 |
| map.kicker | Pop | 1 | 14 | 164 ×1 | 87 lines ×1 | 44 ×1 |  | 44 |
| map.kicker | Pop | 2 | 13 | 83 lines ×2.52 | 30 lines ×1.15 | 34 ×1.42 |  | 30 |
| map.kicker | Pop | 3 | 13 | 109 ×8.55 | 58 ×4.65 | 63 ×4.99 |  | 58 |
| map.listLabel | Retro | 1 | 13 | 73 lines ×1 | 76 lines ×1 | 37 lines ×1 |  | 37 |
| map.listLabel | Retro | 2 | 14 | 111 ×1 | 54 ×1 | 60 ×1 |  | 54 |
| map.listLabel | Lime | 1 | 13 | 61 lines ×3.91 | 84 lines ×5.36 | 40 ×2.65 |  | 40 |
| map.listLabel | Lime | 2 | 14 | 99 lines ×1 | 50 ×1 | 60 ×1 |  | 50 |
| map.listLabel | Grunge | 1 | 13 | 62 ×3.97 | 85 ×5.38 | 41 ×2.71 |  | 41 |
| map.listLabel | Grunge | 2 | 14 | 108 ×1 | 54 ×1 | 60 ×1 |  | 54 |
| map.listLabel | Editorial | 1 | 13 | 61 lines ×3.91 | 84 lines ×5.36 | 46 lines ×3.03 |  | 46 |
| map.listLabel | Editorial | 2 | 14 | 108 ×1 | 54 ×1 | 60 ×1 |  | 54 |
| map.listLabel | Pop | 1 | 13 | 65 lines ×4.06 | 72 lines ×4.47 | 31 lines ×2.06 |  | 31 |
| map.listLabel | Pop | 2 | 14 | 108 ×1 | 54 ×1 | 60 ×1 |  | 54 |
| map.radius | Retro | 1 | 14 | 60 ×4.39 | 26 ×1.94 | 28 box ×2.07 |  | 26 |
| map.radius | Retro | 2 | 6 | 24 ×1 | 11 ×1 | 12 ×1 |  | 11 |
| map.radius | Retro | 3 | 13 | 41 ×1.64 | 29 ×1 | 25 ×1.28 |  | 25 |
| map.radius | Lime | 1 | 14 | 72 overlap ×5.26 | 51 ×3.73 | 75 ×5.48 |  | 51 |
| map.radius | Lime | 2 | 6 | 25 ×1 | 13 ×1 | 14 ×1 |  | 13 |
| map.radius | Lime | 3 | 13 | 32 ×1.43 | 20 ×1 | 26 ×1.3 |  | 20 |
| map.radius | Grunge | 1 | 14 | 74 ×5.42 | 45 ×3.3 | 44 ×3.27 |  | 44 |
| map.radius | Grunge | 2 | 6 | 25 ×1 | 13 ×1 | 14 ×1 |  | 13 |
| map.radius | Grunge | 3 | 13 | 40 ×1.61 | 30 lines ×1 | 26 ×1.3 |  | 26 |
| map.radius | Editorial | 1 | 14 | 28 overlap ×2.35 | 14 overlap ×1.15 | 27 page ×2.23 |  | 14 |
| map.radius | Editorial | 2 | 6 | 25 ×1 | 13 ×1 | 14 ×1 |  | 13 |
| map.radius | Editorial | 3 | 13 | 40 ×1.61 | 30 lines ×1 | 26 ×1.3 |  | 26 |
| map.radius | Pop | 1 | 14 | 58 ×4.45 | 29 overlap ×2.25 | 30 page ×2.34 |  | 29 |
| map.radius | Pop | 2 | 6 | 25 ×1 | 13 ×1 | 14 ×1 |  | 13 |
| map.radius | Pop | 3 | 13 | 40 ×1.61 | 30 lines ×1 | 26 ×1.3 |  | 26 |
| map.radiusLabel | Retro | 2 | 10 | 32 ×1 | 14 ×1 | 17 lines ×1 |  | 14 |
| map.radiusLabel | Lime | 2 | 10 | 30 ×1 | 15 ×1 | 18 ×1 |  | 15 |
| map.radiusLabel | Grunge | 2 | 10 | 33 ×1 | 17 lines ×1 | 18 ×1 |  | 17 |
| map.radiusLabel | Editorial | 2 | 10 | 33 ×1 | 17 lines ×1 | 18 ×1 |  | 17 |
| map.radiusLabel | Pop | 2 | 10 | 33 ×1 | 17 lines ×1 | 18 ×1 |  | 17 |
| map.rings[] | Retro | 2 | 5 | 23 ×3.31 | 25 overlap ×3.54 | 25 overlap ×3.54 |  | 23 |
| map.rings[] | Retro | 3 | 5 | 24 ×3.47 | 27 ×3.76 | 27 ×3.76 |  | 24 |
| map.rings[] | Retro | 4 | 5 | 25 overlap ×3.66 | 27 ×3.76 | 27 ×3.76 |  | 25 |
| map.rings[] | Lime | 2 | 5 | 22 overlap ×3.2 | 24 ×3.49 | 26 ×3.73 |  | 22 |
| map.rings[] | Lime | 3 | 5 | 21 ×3.11 | 24 ×3.49 | 27 ×3.78 |  | 21 |
| map.rings[] | Lime | 4 | 5 | 22 overlap ×3.2 | 24 ×3.49 | 27 ×3.78 |  | 22 |
| map.rings[] | Grunge | 2 | 5 | 24 overlap ×3.53 | 26 ×3.73 | 26 ×3.73 |  | 24 |
| map.rings[] | Grunge | 3 | 5 | 24 overlap ×3.53 | 27 ×3.78 | 27 ×3.78 |  | 24 |
| map.rings[] | Grunge | 4 | 5 | 24 overlap ×3.53 | 27 ×3.78 | 27 ×3.78 |  | 24 |
| map.rings[] | Editorial | 2 | 5 | 24 overlap ×3.53 | 26 ×3.73 | 26 ×3.73 |  | 24 |
| map.rings[] | Editorial | 3 | 5 | 24 overlap ×3.53 | 27 ×3.78 | 27 ×3.78 |  | 24 |
| map.rings[] | Editorial | 4 | 5 | 24 overlap ×3.53 | 27 ×3.78 | 27 ×3.78 |  | 24 |
| map.rings[] | Pop | 2 | 5 | 24 overlap ×3.53 | 26 ×3.73 | 26 ×3.73 |  | 24 |
| map.rings[] | Pop | 3 | 5 | 24 overlap ×3.53 | 27 ×3.78 | 27 ×3.78 |  | 24 |
| map.rings[] | Pop | 4 | 5 | 24 overlap ×3.53 | 27 ×3.78 | 27 ×3.78 |  | 24 |
| map.routeCta | Retro | 2 | 14 | 36 ×1 | 22 lines ×1 | 22 ×1 |  | 22 |
| map.routeCta | Lime | 2 | 14 | 32 lines ×1 | 17 ×1 | 20 ×1 |  | 17 |
| map.routeCta | Grunge | 2 | 14 | 35 lines ×1 | 19 ×1 | 23 lines ×1 |  | 19 |
| map.routeCta | Editorial | 2 | 14 | 41 lines ×2.04 | 24 lines ×1 | 28 lines ×1 |  | 24 |
| map.routeCta | Pop | 2 | 14 | 50 ×3.58 | 28 ×2.01 | 33 ×2.37 |  | 28 |
| map.span | Retro | 4 | 21 | 98 box ×5.04 | 114 ×5.82 | 58 ×3.01 |  | 58 |
| map.span | Lime | 4 | 21 | 86 ×4.42 | 104 box ×5.38 | 58 ×3 |  | 58 |
| map.span | Grunge | 4 | 21 | 96 box ×4.97 | 114 ×5.82 | 58 ×3 |  | 58 |
| map.span | Editorial | 4 | 21 | 96 box ×4.97 | 114 ×5.82 | 58 ×3 |  | 58 |
| map.span | Pop | 4 | 21 | 96 box ×4.97 | 114 ×5.82 | 58 ×3 |  | 58 |
| map.stats.label | Retro | 4 | 8 | 37 ×5.76 | 45 lines ×7.05 | 19 lines ×3.05 |  | 19 |
| map.stats.label | Lime | 4 | 8 | 34 lines ×5.42 | 41 lines ×6.59 | 19 lines ×3.05 |  | 19 |
| map.stats.label | Grunge | 4 | 8 | 37 ×5.88 | 45 lines ×7.11 | 19 lines ×3.05 |  | 19 |
| map.stats.label | Editorial | 4 | 8 | 37 ×5.88 | 45 lines ×7.11 | 19 lines ×3.05 |  | 19 |
| map.stats.label | Pop | 4 | 8 | 37 ×5.88 | 45 lines ×7.11 | 19 lines ×3.05 |  | 19 |
| map.stats.sub | Retro | 4 | 18 | 41 ×2.6 | 45 ×2.86 | 20 lines ×1.24 |  | 20 |
| map.stats.sub | Lime | 4 | 18 | 37 ×2.32 | 41 ×2.6 | 20 lines ×1.24 |  | 20 |
| map.stats.sub | Grunge | 4 | 18 | 41 ×2.59 | 45 ×2.86 | 20 lines ×1.24 |  | 20 |
| map.stats.sub | Editorial | 4 | 18 | 41 ×2.59 | 45 ×2.86 | 20 lines ×1.24 |  | 20 |
| map.stats.sub | Pop | 4 | 18 | 41 ×2.59 | 45 ×2.86 | 20 lines ×1.24 |  | 20 |
| map.stats.value | Retro | 4 | 14 | 13 ×3.38 | 18 ×4.65 | 13 ×2.54 |  | 13 |
| map.stats.value | Lime | 4 | 14 | 13 ×3.84 | 19 ×5.6 | 12 lines ×2.68 |  | 12 |
| map.stats.value | Grunge | 4 | 14 | 15 ×4.73 | 21 ×6.39 | 13 ×2.56 |  | 13 |
| map.stats.value | Editorial | 4 | 14 | 9 ×3.58 | 12 ×4.83 | 9 lines ×2.88 |  | 9 |
| map.stats.value | Pop | 4 | 14 | 11 lines ×3.6 | 15 ×5.16 | 9 ×2.61 |  | 9 |
| map.status | Retro | 2 | 10 | 64 ×4.53 | 18 overlap ×1.56 | 23 ×1.88 |  | 18 |
| map.status | Retro | 3 | 10 | 178 ×11.75 | 35 page ×2.65 | 54 ×3.82 |  | 35 |
| map.status | Lime | 2 | 10 | 53 ×3.99 | 13 ×1.25 | 21 ×1.76 |  | 13 |
| map.status | Lime | 3 | 10 | 157 ×10.93 | 30 page ×2.42 | 53 ×3.77 |  | 30 |
| map.status | Grunge | 2 | 10 | 63 ×4.49 | 18 overlap ×1.57 | 24 ×1.96 |  | 18 |
| map.status | Grunge | 3 | 10 | 174 ×11.62 | 35 page ×2.66 | 53 ×3.77 |  | 35 |
| map.status | Editorial | 2 | 10 | 40 ×3.06 | 13 ×1.24 | 9 overlap ×0.98 |  | 9 |
| map.status | Editorial | 3 | 10 | 174 ×11.62 | 35 page ×2.66 | 53 ×3.77 |  | 35 |
| map.status | Pop | 2 | 10 | 45 ×3.38 | 9 ×0.98 | 12 ×1.17 |  | 9 |
| map.status | Pop | 3 | 10 | 174 ×11.62 | 35 page ×2.66 | 53 ×3.77 |  | 35 |
| map.terms | Retro | 1 | 36 | 97 ×1 | 118 ×1 | 59 ×1 |  | 59 |
| map.terms | Retro | 2 | 36 | 68 ×1.72 | 50 ×1 | 55 ×1 |  | 50 |
| map.terms | Lime | 1 | 36 | 64 ×1 | 101 lines ×1 | 58 ×1 |  | 58 |
| map.terms | Lime | 2 | 36 | 58 ×1.51 | 41 ×1 | 56 ×1 |  | 41 |
| map.terms | Grunge | 1 | 36 | 59 ×1 | 95 lines ×1 | 58 ×1 |  | 58 |
| map.terms | Grunge | 2 | 36 | 67 ×1.71 | 51 ×1 | 56 ×1 |  | 51 |
| map.terms | Editorial | 1 | 36 | 60 ×1 | 98 lines ×1 | 58 ×1 |  | 58 |
| map.terms | Editorial | 2 | 36 | 67 ×1.71 | 51 ×1 | 56 ×1 |  | 51 |
| map.terms | Pop | 1 | 36 | 75 ×1 | 85 ×1 | 45 lines ×1 |  | 45 |
| map.terms | Pop | 2 | 36 | 67 ×1.71 | 51 ×1 | 56 ×1 |  | 51 |
| map.travelTime | Retro | 2 | 6 | 24 ×1 | 11 ×1 | 12 ×1 |  | 11 |
| map.travelTime | Lime | 2 | 6 | 25 ×1 | 13 ×1 | 14 ×1 |  | 13 |
| map.travelTime | Grunge | 2 | 6 | 25 ×1 | 13 ×1 | 14 ×1 |  | 13 |
| map.travelTime | Editorial | 2 | 6 | 25 ×1 | 13 ×1 | 14 ×1 |  | 13 |
| map.travelTime | Pop | 2 | 6 | 25 ×1 | 13 ×1 | 14 ×1 |  | 13 |
| map.travelTimeLabel | Retro | 2 | 11 | 32 ×1 | 14 ×1 | 17 lines ×1 |  | 14 |
| map.travelTimeLabel | Lime | 2 | 11 | 30 ×1 | 15 ×1 | 18 ×1 |  | 15 |
| map.travelTimeLabel | Grunge | 2 | 11 | 33 ×1 | 17 lines ×1 | 18 ×1 |  | 17 |
| map.travelTimeLabel | Editorial | 2 | 11 | 33 ×1 | 17 lines ×1 | 18 ×1 |  | 17 |
| map.travelTimeLabel | Pop | 2 | 11 | 33 ×1 | 17 lines ×1 | 18 ×1 |  | 17 |
| map.updated | Retro | 2 | 14 | 83 box ×5.03 | 35 ×2.13 | 59 ×3.55 |  | 35 |
| map.updated | Retro | 3 | 14 | 78 ×4.74 | 34 ×2.06 | 59 ×3.55 |  | 34 |
| map.updated | Lime | 2 | 14 | 72 ×4.33 | 31 ×1.91 | 59 ×3.55 |  | 31 |
| map.updated | Lime | 3 | 14 | 69 ×4.09 | 31 ×1.91 | 59 ×3.55 |  | 31 |
| map.updated | Grunge | 2 | 14 | 79 ×4.77 | 35 ×2.13 | 59 ×3.55 |  | 35 |
| map.updated | Grunge | 3 | 14 | 77 ×4.65 | 34 ×2.06 | 59 ×3.55 |  | 34 |
| map.updated | Editorial | 2 | 14 | 79 ×4.77 | 35 ×2.13 | 59 ×3.55 |  | 35 |
| map.updated | Editorial | 3 | 14 | 77 ×4.65 | 34 ×2.06 | 59 ×3.55 |  | 34 |
| map.updated | Pop | 2 | 14 | 79 ×4.77 | 35 ×2.13 | 59 ×3.55 |  | 35 |
| map.updated | Pop | 3 | 14 | 77 ×4.65 | 34 ×2.06 | 59 ×3.55 |  | 34 |
| map.venueCaption | Retro | 2 | 14 | 42 ×1 | 18 lines ×1 | 20 lines ×1 |  | 18 |
| map.venueCaption | Lime | 2 | 14 | 38 ×1 | 16 ×1 | 20 lines ×1 |  | 16 |
| map.venueCaption | Grunge | 2 | 14 | 42 ×1 | 18 lines ×1 | 20 lines ×1 |  | 18 |
| map.venueCaption | Editorial | 2 | 14 | 42 ×1 | 18 lines ×1 | 20 lines ×1 |  | 18 |
| map.venueCaption | Pop | 2 | 14 | 42 ×1 | 18 lines ×1 | 20 lines ×1 |  | 18 |
| map.venueCta | Retro | 2 | 10 | 30 lines ×1 | 11 lines ×1 | 12 ×1 |  | 11 |
| map.venueCta | Lime | 2 | 10 | 25 lines ×1 | 10 lines ×1 | 11 ×1 |  | 10 |
| map.venueCta | Grunge | 2 | 10 | 28 lines ×1 | 10 ×1 | 13 ×1 |  | 10 |
| map.venueCta | Editorial | 2 | 10 | 37 lines ×2.02 | 19 ×1 | 23 lines ×1 |  | 19 |
| map.venueCta | Pop | 2 | 10 | 45 lines ×2.02 | 23 lines ×1 | 27 lines ×1.94 |  | 23 |
| map.venueLabel | Retro | 2 | 20 | 42 ×1 | 18 lines ×1 | 20 lines ×1 |  | 18 |
| map.venueLabel | Lime | 2 | 20 | 38 ×1 | 30 lines ×1 | 20 lines ×1 |  | 20 |
| map.venueLabel | Grunge | 2 | 20 | 42 ×1 | 18 lines ×1 | 20 lines ×1 |  | 18 |
| map.venueLabel | Editorial | 2 | 20 | 42 ×1 | 18 lines ×1 | 20 lines ×1 |  | 18 |
| map.venueLabel | Pop | 2 | 20 | 42 ×1 | 18 lines ×1 | 20 lines ×1 |  | 18 |

## `stats.value` with one line more (`--extra-lines=stats.value`, judgement 4)

| field | template | layout | seed | 1440 | 768 | 390 | 1440 column | probe |
|---|---|---|---|---|---|---|---|---|
| map.stats.value | Retro | 4 | 14 | 22 ×3.71 | 33 ×5 | 22 ×2.88 |  | 22 |
| map.stats.value | Lime | 4 | 14 | 22 ×4.24 | 33 ×5.75 | 20 ×2.9 |  | 20 |
| map.stats.value | Grunge | 4 | 14 | 30 lines ×5.07 | 39 ×6.73 | 22 ×2.9 |  | 22 |
| map.stats.value | Editorial | 4 | 14 | 17 lines ×3.92 | 20 lines ×5.31 | 15 ×2.9 |  | 15 |
| map.stats.value | Pop | 4 | 14 | 19 lines ×3.92 | 30 lines ×5.41 | 17 lines ×2.9 |  | 17 |
