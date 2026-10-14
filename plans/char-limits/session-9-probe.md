# Character limits — session 9 probe readout (the testimonials' own fields)

`scripts/limits.mjs testimonials` output, 2026-10-13, every template, design and width, for the
testimonials' own text keys and the `quotes` columns
(`--keys=kicker,heading,sub,rating,stars,cta,quotes.who,quotes.quote,quotes.role,quotes.when`), the
list built from `FIELDS.testimonials`. `IDENTITY_CHARS.testimonials` is session 1's and was not
re-measured: `--check`'s `who.*` rows re-verify it. Each cell is the largest passing length at that
surface, then the test the next length failed (none: a sample failed it, `400+`: open), then
`×grow`, the seat's width at the cap over the seed's. *probe* is the minimum over the surfaces. The
cap written into `data.js` applies the session's rules to it (`plans/char-limits.md`, *Session 9*).

- **A review's columns are written into every row** (`rowsAt` in `limits.mjs`): the walls (layouts
  3 and 4) seat each row in a cell of its own width, and row 0's is not the narrowest (row 4's
  trailing cell at 1440, rows 0–3 at 768). The reference is row 0's seed in every row.
- **`heading` is read as a display head, not a block** (`probesOf`: a `heading` of `type: 'area'`
  takes the lines test). The samples carry no line break; layout 2's seed carries one.
- **Retro's layout-1 `quotes.who` and `quotes.role` are the second run**, with
  `--extra-lines=quotes.who,quotes.role`: the first run read the composed byline (*HANNAH L. ·
  PRIVATE HOST*), whose wrap is designed (16 and 18, `lines` at 390 and 768). The second reads the
  pills under it (28 each). The first run's numbers were Retro who 16, role 18.
- **Editorial's and Pop's layout-4 heading without a shrink floor** (`--no-floor=heading`):
  Editorial 30 / 26 / 21 (lines at 1440 and 390), Pop 42 / 31 / 22. Strict, Editorial's 390 reads
  6 (`shrink`): the head is fitted to its widest word.

| field | template | layout | seed | 1440 | 768 | 390 | 1440 column | probe |
|---|---|---|---|---|---|---|---|---|
| testimonials.cta | Retro | 2 | 8 | 186 ×8.49 | 127 ×5.31 | 53 ×2.71 |  | 53 |
| testimonials.cta | Lime | 2 | 8 | 154 ×8.52 | 102 ×5.25 | 48 ×2.77 |  | 48 |
| testimonials.cta | Grunge | 2 | 8 | 167 ×8.78 | 111 ×5.33 | 54 ×2.89 |  | 54 |
| testimonials.cta | Editorial | 2 | 8 | 92 ×6.1 | 61 box ×3.9 | 28 page ×2.08 |  | 28 |
| testimonials.cta | Pop | 2 | 8 | 111 ×7.01 | 69 ×4.24 | 34 page ×2.33 |  | 34 |
| testimonials.heading | Retro | 2 | 38 | 59 ×1.29 | 68 ×1.11 | 21 ×1 |  | 21 |
| testimonials.heading | Retro | 3 | 12 | 124 ×1 | 40 ×1 | 26 ×1 |  | 26 |
| testimonials.heading | Retro | 4 | 22 | 48 ×1 | 34 ×1 | 24 ×1 |  | 24 |
| testimonials.heading | Lime | 2 | 38 | 55 lines ×1 | 43 lines ×1 | 49 ×1 |  | 43 |
| testimonials.heading | Lime | 3 | 12 | 52 ×1 | 40 lines ×1 | 26 lines ×1 |  | 26 |
| testimonials.heading | Lime | 4 | 22 | 43 lines ×1 | 32 ×1 | 23 ×1 |  | 23 |
| testimonials.heading | Grunge | 2 | 38 | 60 ×1.36 | 49 ×1.17 | 26 box ×1.07 |  | 26 |
| testimonials.heading | Grunge | 3 | 12 | 58 ×1 | 44 ×1 | 30 lines ×1 |  | 30 |
| testimonials.heading | Grunge | 4 | 22 | 49 ×1 | 37 ×1 | 30 ×1 |  | 30 |
| testimonials.heading | Editorial | 2 | 38 | 47 ×1 | 44 ×1 | 31 box ×1 |  | 31 |
| testimonials.heading | Editorial | 3 | 12 | 65 ×1 | 26 lines ×1 | 17 lines ×1 |  | 17 |
| testimonials.heading | Editorial | 4 | 22 | 30 lines ×1 | 26 ×1 | 6 shrink ×1 |  | 6 |
| testimonials.heading | Pop | 2 | 38 | 49 ×1.16 | 63 lines ×1 | 45 ×1 |  | 45 |
| testimonials.heading | Pop | 3 | 12 | 99 ×1 | 32 ×1 | 22 lines ×1 |  | 22 |
| testimonials.heading | Pop | 4 | 22 | 42 lines ×1 | 31 lines ×1 | 22 ×1 |  | 22 |
| testimonials.kicker | Retro | 2 | 16 | 232 ×12.33 | 120 ×6.46 | 61 ×3.41 |  | 61 |
| testimonials.kicker | Retro | 3 | 12 | 232 ×1 | 120 ×1 | 61 ×1 |  | 61 |
| testimonials.kicker | Lime | 2 | 16 | 206 ×10.85 | 111 ×5.95 | 61 ×3.41 |  | 61 |
| testimonials.kicker | Lime | 3 | 12 | 206 ×1 | 111 ×1 | 61 ×1 |  | 61 |
| testimonials.kicker | Grunge | 2 | 16 | 227 ×12.02 | 120 ×6.46 | 61 ×3.41 |  | 61 |
| testimonials.kicker | Grunge | 3 | 12 | 228 ×1 | 120 ×1 | 61 ×1 |  | 61 |
| testimonials.kicker | Editorial | 2 | 16 | 227 ×12.02 | 120 ×6.46 | 61 ×3.41 |  | 61 |
| testimonials.kicker | Editorial | 3 | 12 | 228 ×1 | 120 ×1 | 61 ×1 |  | 61 |
| testimonials.kicker | Pop | 2 | 16 | 227 ×12.02 | 120 ×6.46 | 61 ×3.41 |  | 61 |
| testimonials.kicker | Pop | 3 | 12 | 228 ×1 | 120 ×1 | 61 ×1 |  | 61 |
| testimonials.quotes.quote | Retro | 1 | 66 | 400+ | 400+ | 400+ |  | 400 |
| testimonials.quotes.quote | Retro | 2 | 66 | 400+ | 400+ | 400+ |  | 400 |
| testimonials.quotes.quote | Retro | 3 | 66 | 400+ | 400+ | 400+ |  | 400 |
| testimonials.quotes.quote | Retro | 4 | 66 | 400+ | 400+ | 400+ |  | 400 |
| testimonials.quotes.quote | Lime | 1 | 66 | 65 overlap ×1 | 400+ | 400+ |  | 65 |
| testimonials.quotes.quote | Lime | 2 | 66 | 400+ | 400+ | 400+ |  | 400 |
| testimonials.quotes.quote | Lime | 3 | 66 | 400+ | 400+ | 400+ |  | 400 |
| testimonials.quotes.quote | Lime | 4 | 66 | 400+ | 400+ | 400+ |  | 400 |
| testimonials.quotes.quote | Grunge | 1 | 66 | 68 ×1 | 400+ | 400+ |  | 68 |
| testimonials.quotes.quote | Grunge | 2 | 66 | 400+ | 400+ | 400+ |  | 400 |
| testimonials.quotes.quote | Grunge | 3 | 66 | 400+ | 400+ | 400+ |  | 400 |
| testimonials.quotes.quote | Grunge | 4 | 66 | 400+ | 400+ | 400+ |  | 400 |
| testimonials.quotes.quote | Editorial | 1 | 66 | 57 overlap ×1 | 400+ | 400+ |  | 57 |
| testimonials.quotes.quote | Editorial | 2 | 66 | 400+ | 400+ | 400+ |  | 400 |
| testimonials.quotes.quote | Editorial | 3 | 66 | 400+ | 400+ | 400+ |  | 400 |
| testimonials.quotes.quote | Editorial | 4 | 66 | 400+ | 400+ | 400+ |  | 400 |
| testimonials.quotes.quote | Pop | 1 | 66 | 400+ | 400+ | 400+ |  | 400 |
| testimonials.quotes.quote | Pop | 2 | 66 | 400+ | 400+ | 400+ |  | 400 |
| testimonials.quotes.quote | Pop | 3 | 66 | 400+ | 400+ | 400+ |  | 400 |
| testimonials.quotes.quote | Pop | 4 | 66 | 400+ | 400+ | 400+ |  | 400 |
| testimonials.quotes.role | Retro | 1 | 26 | 69 ×1 | 39 box ×1.02 | 28 box ×1.02 |  | 28 |
| testimonials.quotes.role | Retro | 2 | 26 | 198 ×14.59 | 89 ×7.54 | 48 ×4.15 |  | 48 |
| testimonials.quotes.role | Retro | 3 | 26 | 35 ×1 | 23 ×1 | 51 ×1 |  | 23 |
| testimonials.quotes.role | Retro | 4 | 26 | 44 ×1 | 29 ×1 | 41 ×1 |  | 29 |
| testimonials.quotes.role | Lime | 1 | 26 | 53 ×3.91 | 45 ×3.18 | 48 ×3.17 |  | 45 |
| testimonials.quotes.role | Lime | 2 | 26 | 175 ×13.81 | 81 ×6.84 | 48 ×4.15 |  | 48 |
| testimonials.quotes.role | Lime | 3 | 26 | 32 ×1 | 22 lines ×1 | 52 ×1 |  | 22 |
| testimonials.quotes.role | Lime | 4 | 26 | 40 ×1 | 27 ×1 | 41 ×1 |  | 27 |
| testimonials.quotes.role | Grunge | 1 | 26 | 51 ×3.76 | 37 ×2.68 | 28 ×2.09 |  | 28 |
| testimonials.quotes.role | Grunge | 2 | 26 | 194 ×15.6 | 89 ×7.54 | 48 ×4.15 |  | 48 |
| testimonials.quotes.role | Grunge | 3 | 26 | 36 ×1 | 25 ×1 | 54 ×1 |  | 25 |
| testimonials.quotes.role | Grunge | 4 | 26 | 44 ×1 | 29 ×1 | 41 ×1 |  | 29 |
| testimonials.quotes.role | Editorial | 1 | 26 | 30 lines ×2.49 | 22 lines ×1.78 | 17 lines ×1.37 |  | 17 |
| testimonials.quotes.role | Editorial | 2 | 26 | 192 ×8.4 | 87 ×4.91 | 48 ×2.93 |  | 48 |
| testimonials.quotes.role | Editorial | 3 | 26 | 36 ×1 | 25 ×1 | 54 ×1 |  | 25 |
| testimonials.quotes.role | Editorial | 4 | 26 | 44 ×1 | 29 ×1 | 41 ×1 |  | 29 |
| testimonials.quotes.role | Pop | 1 | 26 | 35 lines ×2.7 | 25 lines ×1.94 | 18 ×1.43 |  | 18 |
| testimonials.quotes.role | Pop | 2 | 26 | 193 ×10.27 | 87 ×5.71 | 48 ×3.48 |  | 48 |
| testimonials.quotes.role | Pop | 3 | 26 | 36 ×1 | 25 ×1 | 54 ×1 |  | 25 |
| testimonials.quotes.role | Pop | 4 | 26 | 44 ×1 | 29 ×1 | 41 ×1 |  | 29 |
| testimonials.quotes.when | Retro | 1 | 21 | 78 lines ×1 | 41 lines ×1 | 30 lines ×1 |  | 30 |
| testimonials.quotes.when | Lime | 1 | 21 | 86 ×1 | 60 ×1 | 46 ×1 |  | 46 |
| testimonials.quotes.when | Grunge | 1 | 21 | 86 ×1 | 60 ×1 | 46 ×1 |  | 46 |
| testimonials.quotes.when | Editorial | 1 | 21 | 86 ×1 | 60 ×1 | 46 ×1 |  | 46 |
| testimonials.quotes.when | Pop | 1 | 21 | 75 lines ×1 | 44 lines ×1 | 30 lines ×1 |  | 30 |
| testimonials.quotes.who | Retro | 1 | 13 | 69 ×1 | 39 box ×1.02 | 28 box ×1.02 |  | 28 |
| testimonials.quotes.who | Retro | 2 | 13 | 162 ×14.61 | 97 ×7.43 | 48 ×4.1 |  | 48 |
| testimonials.quotes.who | Retro | 3 | 13 | 29 lines ×1 | 25 lines ×1 | 52 ×1 |  | 25 |
| testimonials.quotes.who | Retro | 4 | 13 | 37 ×1 | 27 ×1 | 37 ×1 |  | 27 |
| testimonials.quotes.who | Lime | 1 | 13 | 39 overlap ×3.61 | 45 ×3.88 | 48 ×3.77 |  | 39 |
| testimonials.quotes.who | Lime | 2 | 13 | 134 ×14.2 | 76 ×6.84 | 45 ×4.21 |  | 45 |
| testimonials.quotes.who | Lime | 3 | 13 | 25 lines ×1 | 20 ×1 | 48 ×1 |  | 20 |
| testimonials.quotes.who | Lime | 4 | 13 | 40 ×1 | 27 ×1 | 38 ×1 |  | 27 |
| testimonials.quotes.who | Grunge | 1 | 13 | 37 ×3.44 | 37 ×3.33 | 28 ×2.56 |  | 28 |
| testimonials.quotes.who | Grunge | 2 | 13 | 147 ×15.98 | 85 ×7.55 | 50 ×4.24 |  | 50 |
| testimonials.quotes.who | Grunge | 3 | 13 | 29 lines ×1 | 25 lines ×1 | 55 ×1 |  | 25 |
| testimonials.quotes.who | Grunge | 4 | 13 | 40 ×1 | 27 ×1 | 38 ×1 |  | 27 |
| testimonials.quotes.who | Editorial | 1 | 13 | 18 overlap ×1.86 | 22 lines ×2.21 | 17 lines ×1.7 |  | 17 |
| testimonials.quotes.who | Editorial | 2 | 13 | 79 ×8.54 | 45 lines ×4.98 | 27 lines ×3 |  | 27 |
| testimonials.quotes.who | Editorial | 3 | 13 | 15 ×1 | 13 lines ×1 | 29 lines ×1 |  | 13 |
| testimonials.quotes.who | Editorial | 4 | 13 | 41 ×1 | 27 ×1 | 38 ×1 |  | 27 |
| testimonials.quotes.who | Pop | 1 | 13 | 48 ×4.57 | 28 lines ×2.72 | 18 lines ×1.83 |  | 18 |
| testimonials.quotes.who | Pop | 2 | 13 | 98 ×10.55 | 53 lines ×5.8 | 32 lines ×3.54 |  | 32 |
| testimonials.quotes.who | Pop | 3 | 13 | 19 ×1 | 15 ×1 | 35 ×1 |  | 15 |
| testimonials.quotes.who | Pop | 4 | 13 | 40 ×1 | 27 ×1 | 38 ×1 |  | 27 |
| testimonials.rating | Retro | 3 | 3 | 8 lines ×2.5 | 10 ×1 | 20 ×1 |  | 8 |
| testimonials.rating | Lime | 3 | 3 | 7 lines ×2.67 | 10 ×1 | 20 lines ×1 |  | 7 |
| testimonials.rating | Grunge | 3 | 3 | 9 lines ×3.07 | 12 ×1 | 25 lines ×1 |  | 9 |
| testimonials.rating | Editorial | 3 | 3 | 5 lines ×2.25 | 7 lines ×1 | 13 ×1 |  | 5 |
| testimonials.rating | Pop | 3 | 3 | 7 lines ×2.86 | 9 ×1 | 18 lines ×1 |  | 7 |
| testimonials.stars | Retro | 2 | 5 | 168 ×15.36 | 82 box ×7.78 | 44 ×4.23 |  | 44 |
| testimonials.stars | Retro | 3 | 5 | 35 ×3.33 | 35 ×3.33 | 51 ×4.87 |  | 35 |
| testimonials.stars | Lime | 2 | 5 | 175 ×16.07 | 81 ×7.68 | 44 ×4.23 |  | 44 |
| testimonials.stars | Lime | 3 | 5 | 32 ×3.05 | 33 ×3.17 | 52 ×4.98 |  | 32 |
| testimonials.stars | Grunge | 2 | 5 | 175 ×16.07 | 81 ×7.68 | 44 ×4.23 |  | 44 |
| testimonials.stars | Grunge | 3 | 5 | 36 ×3.44 | 37 ×3.47 | 54 ×5.12 |  | 36 |
| testimonials.stars | Editorial | 2 | 5 | 174 ×16 | 79 ×7.55 | 44 ×4.23 |  | 44 |
| testimonials.stars | Editorial | 3 | 5 | 36 ×3.44 | 37 ×3.47 | 54 ×5.12 |  | 36 |
| testimonials.stars | Pop | 2 | 5 | 175 ×16.07 | 79 ×7.55 | 44 ×4.23 |  | 44 |
| testimonials.stars | Pop | 3 | 5 | 36 ×3.44 | 37 ×3.47 | 54 ×5.12 |  | 36 |
| testimonials.sub | Retro | 2 | 67 | 198 ×2.74 | 114 ×1.6 | 114 ×1 |  | 114 |
| testimonials.sub | Retro | 3 | 67 | 86 ×1 | 96 ×1 | 96 ×1 |  | 86 |
| testimonials.sub | Lime | 2 | 67 | 209 ×2.9 | 114 ×1.6 | 114 ×1 |  | 114 |
| testimonials.sub | Lime | 3 | 67 | 87 ×1 | 97 ×1 | 96 ×1 |  | 87 |
| testimonials.sub | Grunge | 2 | 67 | 209 ×2.9 | 114 ×1.6 | 114 ×1 |  | 114 |
| testimonials.sub | Grunge | 3 | 67 | 64 ×1 | 65 ×1 | 102 lines ×1 |  | 64 |
| testimonials.sub | Editorial | 2 | 67 | 209 ×2.9 | 114 ×1.6 | 114 ×1 |  | 114 |
| testimonials.sub | Editorial | 3 | 67 | 64 ×1 | 65 ×1 | 102 lines ×1 |  | 64 |
| testimonials.sub | Pop | 2 | 67 | 209 ×2.9 | 114 ×1.6 | 114 ×1 |  | 114 |
| testimonials.sub | Pop | 3 | 67 | 64 ×1 | 65 ×1 | 102 lines ×1 |  | 64 |
