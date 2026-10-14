# Character limits — session 4 probe readout (pricing's own fields)

`scripts/limits.mjs pricing` output, 2026-10-13, every template, design and width, for pricing's
own text keys and the `tiers` columns (`--keys=kicker,heading,unit,intro,offer,quote,reviews,
rating,cta,note,featsLabel,badgeLabel,rowCta,sub,tiers.name,tiers.price,tiers.tags[],tiers.tags#,
tiers.blurb,tiers.feats[],tiers.feats#`). `IDENTITY_CHARS.pricing` (the `who.*` rows) is session
1's and was not re-measured. Each cell is the largest passing length at that surface, then the
test the next length failed (none: a sample failed it, `400+` / `16`: open), then `×grow`, the
seat's width at the cap over the seed's. *probe* is the minimum over the surfaces; the cap written
into `data.js` applies the session's rules to it (`plans/char-limits.md`, *Session 4*).

- The rows for `tiers.name`, `tiers.price`, `unit`, `rowCta`, `tiers.feats[]`, `tiers.feats#`,
  `tiers.tags#`, `cta`, `note`, `featsLabel`, `rating` and `reviews` are the re-probe after three
  probe fixes (*Session 4*): lines counted upright on a leant card, a sibling holding the seed
  inside its copy renamed as a twin, and a one-a-line list's count tested as a block.
- `tiers.price` is read with digit-led samples (`£475 — £1,450 per evening…`), its small tail
  growing. The prose reading (the whole string in the big numeral, *Price on application*) is the
  second table.
- `tiers.tags[]` / `#` at layout 2 read a seat that is not a tag (the seed *Solo* inside the
  feature *Solo DJ setup*); layout 2 prints no tags, and nothing is written there.
- `tiers.tags#` at layout 4 under Lime, Grunge, Editorial and Pop was re-probed with the wider
  count pool (*Session 4*, checks) and reads 5 at 390; the table below keeps the first reading.
- The column *seed* is the longest seeded row of that design. The floors written are the longest
  of any design's (*Session 4*, judgement 2).

| field | template | layout | seed | 1440 | 768 | 390 | 1440 column | probe |
|---|---|---|---|---|---|---|---|---|
| pricing.badgeLabel | Retro | 3 | 8 | 118 ×8.28 | 74 ×5.34 | 63 ×4.51 |  | 63 |
| pricing.badgeLabel | Lime | 3 | 8 | 104 box ×7.59 | 64 ×4.68 | 54 ×3.99 |  | 54 |
| pricing.badgeLabel | Grunge | 3 | 8 | 115 ×8.11 | 73 ×5.35 | 59 ×4.31 |  | 59 |
| pricing.badgeLabel | Editorial | 3 | 8 | 115 ×8.11 | 73 ×5.35 | 59 ×4.31 |  | 59 |
| pricing.badgeLabel | Pop | 3 | 8 | 112 ×7.92 | 70 ×5.06 | 54 ×3.99 |  | 54 |
| pricing.cta | Retro | 2 | 20 | 65 ×2.34 | 104 ×3.23 | 44 ×1.69 |  | 44 |
| pricing.cta | Lime | 2 | 20 | 60 ×2.34 | 82 lines ×2.91 | 39 lines ×1.58 |  | 39 |
| pricing.cta | Grunge | 2 | 20 | 67 ×2.53 | 94 ×3.18 | 42 ×1.65 |  | 42 |
| pricing.cta | Editorial | 2 | 20 | 35 ×1.6 | 48 ×2.04 | 23 lines ×1.13 |  | 23 |
| pricing.cta | Pop | 2 | 20 | 40 ×1.73 | 57 lines ×2.25 | 27 lines ×1.23 |  | 27 |
| pricing.featsLabel | Retro | 2 | 15 | 59 ×2.93 | 68 ×3.33 | 48 ×2.44 |  | 48 |
| pricing.featsLabel | Retro | 3 | 15 | 124 ×6.13 | 57 ×2.87 | 70 ×3.49 |  | 57 |
| pricing.featsLabel | Lime | 2 | 15 | 104 lines ×5.19 | 120 ×5.87 | 68 ×3.36 |  | 68 |
| pricing.featsLabel | Lime | 3 | 15 | 111 ×5.44 | 51 ×2.56 | 64 ×3.18 |  | 51 |
| pricing.featsLabel | Grunge | 2 | 15 | 115 ×5.67 | 134 ×6.64 | 68 ×3.36 |  | 68 |
| pricing.featsLabel | Grunge | 3 | 15 | 122 ×6.04 | 55 ×2.74 | 66 ×3.28 |  | 55 |
| pricing.featsLabel | Editorial | 2 | 15 | 112 ×5.53 | 130 ×6.43 | 68 ×3.36 |  | 68 |
| pricing.featsLabel | Editorial | 3 | 15 | 122 ×6.04 | 55 ×2.74 | 66 ×3.28 |  | 55 |
| pricing.featsLabel | Pop | 2 | 15 | 35 ×1.77 | 41 ×2.05 | 68 ×3.36 |  | 35 |
| pricing.featsLabel | Pop | 3 | 15 | 122 ×6.04 | 57 ×2.86 | 64 ×3.18 |  | 57 |
| pricing.heading | Retro | 1 | 42 | 61 ×1 | 41 ×1.02 | 60 ×1 |  | 41 |
| pricing.heading | Retro | 2 | 42 | 56 lines ×1 | 40 ×0.99 | 50 ×1 |  | 40 |
| pricing.heading | Retro | 3 | 7 | 126 ×16.14 | 84 ×11.11 | 44 ×5.9 |  | 44 |
| pricing.heading | Lime | 1 | 42 | 65 ×1 | 50 ×1.24 | 61 ×1 |  | 50 |
| pricing.heading | Lime | 2 | 42 | 42 lines ×1 | 40 lines ×0.99 | 48 ×1 |  | 40 |
| pricing.heading | Lime | 3 | 7 | 107 ×15.31 | 72 lines ×10.56 | 37 ×5.35 |  | 37 |
| pricing.heading | Grunge | 1 | 42 | 73 lines ×1 | 55 ×1.35 | 74 ×1 |  | 55 |
| pricing.heading | Grunge | 2 | 42 | 48 ×1 | 44 ×1.1 | 59 ×1 |  | 44 |
| pricing.heading | Grunge | 3 | 7 | 117 ×16.87 | 79 ×11.63 | 41 ×6 |  | 41 |
| pricing.heading | Editorial | 1 | 42 | 40 lines ×1 | 50 ×1 | 39 lines ×1 |  | 39 |
| pricing.heading | Editorial | 2 | 42 | 42 lines ×1 | 49 ×1 | 45 ×1 |  | 42 |
| pricing.heading | Editorial | 3 | 7 | 71 ×10.19 | 48 lines ×7.04 | 25 lines ×3.73 |  | 25 |
| pricing.heading | Pop | 1 | 42 | 49 ×1 | 63 ×1 | 48 ×1 |  | 48 |
| pricing.heading | Pop | 2 | 42 | 42 lines ×1 | 61 ×1 | 40 lines ×1 |  | 40 |
| pricing.heading | Pop | 3 | 7 | 79 ×11.26 | 54 ×7.69 | 28 ×4.05 |  | 28 |
| pricing.intro | Retro | 3 | 81 | 400+ | 400+ | 400+ |  | 400 |
| pricing.intro | Lime | 3 | 81 | 400+ | 400+ | 400+ |  | 400 |
| pricing.intro | Grunge | 3 | 81 | 400+ | 400+ | 400+ |  | 400 |
| pricing.intro | Editorial | 3 | 81 | 400+ | 400+ | 400+ |  | 400 |
| pricing.intro | Pop | 3 | 81 | 400+ | 400+ | 400+ |  | 400 |
| pricing.kicker | Retro | 2 | 7 | 121 ×11.04 | 147 ×13.47 | 74 ×7 |  | 74 |
| pricing.kicker | Lime | 2 | 7 | 101 lines ×9.37 | 133 ×12.27 | 74 ×6.94 |  | 74 |
| pricing.kicker | Grunge | 2 | 7 | 112 ×10.21 | 146 ×13.25 | 74 ×6.94 |  | 74 |
| pricing.kicker | Editorial | 2 | 7 | 111 ×10.11 | 146 ×13.25 | 74 ×6.94 |  | 74 |
| pricing.kicker | Pop | 2 | 7 | 118 ×10.74 | 146 ×13.25 | 74 ×6.94 |  | 74 |
| pricing.note | Retro | 2 | 25 | 100 lines ×3.93 | 111 ×4.27 | 54 ×2.12 |  | 54 |
| pricing.note | Lime | 2 | 25 | 93 ×3.67 | 100 ×3.95 | 55 ×2.15 |  | 55 |
| pricing.note | Grunge | 2 | 25 | 104 ×4.09 | 111 ×4.3 | 55 ×2.15 |  | 55 |
| pricing.note | Editorial | 2 | 25 | 103 lines ×4.04 | 109 ×4.28 | 55 ×2.15 |  | 55 |
| pricing.note | Pop | 2 | 25 | 95 ×3.7 | 109 ×4.25 | 55 ×2.14 |  | 55 |
| pricing.offer | Retro | 3 | 19 | 234 ×10.72 | 122 ×5.64 | 63 ×2.93 |  | 63 |
| pricing.offer | Lime | 3 | 19 | 209 ×9.52 | 114 ×5.28 | 59 ×2.76 |  | 59 |
| pricing.offer | Grunge | 3 | 19 | 229 ×10.49 | 122 ×5.64 | 59 ×2.76 |  | 59 |
| pricing.offer | Editorial | 3 | 19 | 229 ×10.49 | 122 ×5.64 | 59 ×2.76 |  | 59 |
| pricing.offer | Pop | 3 | 19 | 229 ×10.49 | 122 ×5.64 | 59 ×2.76 |  | 59 |
| pricing.quote | Retro | 2 | 89 | 400+ | 400+ | 400+ |  | 400 |
| pricing.quote | Lime | 2 | 89 | 400+ | 400+ | 400+ |  | 400 |
| pricing.quote | Grunge | 2 | 89 | 400+ | 400+ | 400+ |  | 400 |
| pricing.quote | Editorial | 2 | 89 | 400+ | 400+ | 400+ |  | 400 |
| pricing.quote | Pop | 2 | 89 | 400+ | 400+ | 400+ |  | 400 |
| pricing.rating | Retro | 2 | 3 | 96 ×16.93 | 107 ×18.18 | 47 ×8.44 |  | 47 |
| pricing.rating | Lime | 2 | 3 | 76 ×13.26 | 99 box ×17.36 | 47 ×8.44 |  | 47 |
| pricing.rating | Grunge | 2 | 3 | 89 ×15.5 | 107 ×18.18 | 47 ×8.44 |  | 47 |
| pricing.rating | Editorial | 2 | 3 | 87 ×15.07 | 107 ×18.18 | 47 ×8.44 |  | 47 |
| pricing.rating | Pop | 2 | 3 | 95 box ×16.46 | 107 ×18.18 | 47 ×8.44 |  | 47 |
| pricing.reviews | Retro | 2 | 10 | 104 ×6.01 | 115 ×6.47 | 54 ×3.31 |  | 54 |
| pricing.reviews | Lime | 2 | 10 | 85 ×4.99 | 106 ×6.11 | 55 ×3.34 |  | 55 |
| pricing.reviews | Grunge | 2 | 10 | 96 ×5.57 | 115 ×6.47 | 55 ×3.34 |  | 55 |
| pricing.reviews | Editorial | 2 | 10 | 95 ×5.5 | 115 ×6.47 | 55 ×3.34 |  | 55 |
| pricing.reviews | Pop | 2 | 10 | 102 ×5.9 | 115 ×6.47 | 55 ×3.34 |  | 55 |
| pricing.rowCta | Retro | 1 | 8 | 33 ×2.37 | 12 lines ×1.16 | 28 lines ×2.09 |  | 12 |
| pricing.rowCta | Retro | 3 | 4 | 75 ×5.54 | 53 ×3.55 | 41 lines ×3.05 |  | 41 |
| pricing.rowCta | Retro | 4 | 13 | 101 ×4.44 | 126 ×4.83 | 51 ×2.36 |  | 51 |
| pricing.rowCta | Lime | 1 | 8 | 28 lines ×2.03 | 14 lines ×1.24 | 31 lines ×2.02 |  | 14 |
| pricing.rowCta | Lime | 3 | 4 | 61 ×4.88 | 40 lines ×3.07 | 30 lines ×2.46 |  | 30 |
| pricing.rowCta | Lime | 4 | 13 | 80 ×3.92 | 100 ×4.33 | 46 ×2.26 |  | 46 |
| pricing.rowCta | Grunge | 1 | 8 | 31 lines ×2.12 | 16 ×1.28 | 34 ×2.04 |  | 16 |
| pricing.rowCta | Grunge | 3 | 4 | 68 ×5.07 | 45 ×3.22 | 36 ×2.66 |  | 36 |
| pricing.rowCta | Grunge | 4 | 13 | 89 ×4.18 | 110 ×4.54 | 51 ×2.37 |  | 51 |
| pricing.rowCta | Editorial | 1 | 8 | 15 ×1.34 | 9 ×0.98 | 18 shrink ×1.47 |  | 9 |
| pricing.rowCta | Editorial | 3 | 4 | 37 lines ×3.84 | 24 lines ×2.53 | 20 lines ×2.12 |  | 20 |
| pricing.rowCta | Editorial | 4 | 13 | 48 overlap ×2.93 | 60 page ×3.26 | 27 page ×1.71 |  | 27 |
| pricing.rowCta | Pop | 1 | 8 | 12 ×1.15 | 10 ×1.01 | 11 overlap ×1.08 |  | 10 |
| pricing.rowCta | Pop | 3 | 4 | 44 ×4.31 | 28 lines ×2.71 | 20 ×2.05 |  | 20 |
| pricing.rowCta | Pop | 4 | 13 | 61 ×3.28 | 68 ×3.4 | 33 page ×1.86 |  | 33 |
| pricing.sub | Retro | 1 | 53 | 229 ×1 | 133 ×1 | 138 lines ×1 |  | 133 |
| pricing.sub | Retro | 2 | 53 | 181 ×1 | 119 ×1 | 67 ×1 |  | 67 |
| pricing.sub | Retro | 3 | 53 | 181 ×3.39 | 119 ×2.26 | 67 ×1.29 |  | 67 |
| pricing.sub | Retro | 4 | 53 | 181 ×1 | 119 ×1 | 67 ×1 |  | 67 |
| pricing.sub | Lime | 1 | 53 | 186 ×1 | 119 ×1 | 67 ×1 |  | 67 |
| pricing.sub | Lime | 2 | 53 | 186 ×1 | 119 ×1 | 67 ×1 |  | 67 |
| pricing.sub | Lime | 3 | 53 | 186 ×3.48 | 119 ×2.26 | 63 ×1.21 |  | 63 |
| pricing.sub | Lime | 4 | 53 | 186 ×1 | 119 ×1 | 67 ×1 |  | 67 |
| pricing.sub | Grunge | 1 | 53 | 167 ×1 | 101 ×1 | 36 ×1 |  | 36 |
| pricing.sub | Grunge | 2 | 53 | 186 ×1 | 119 ×1 | 67 ×1 |  | 67 |
| pricing.sub | Grunge | 3 | 53 | 186 ×3.48 | 119 ×2.26 | 63 ×1.21 |  | 63 |
| pricing.sub | Grunge | 4 | 53 | 186 ×1 | 119 ×1 | 67 ×1 |  | 67 |
| pricing.sub | Editorial | 1 | 53 | 186 ×1 | 119 ×1 | 67 ×1 |  | 67 |
| pricing.sub | Editorial | 2 | 53 | 186 ×1 | 119 ×1 | 67 ×1 |  | 67 |
| pricing.sub | Editorial | 3 | 53 | 186 ×3.48 | 119 ×2.26 | 63 ×1.21 |  | 63 |
| pricing.sub | Editorial | 4 | 53 | 186 ×1 | 119 ×1 | 67 ×1 |  | 67 |
| pricing.sub | Pop | 1 | 53 | 161 overlap ×1 | 80 overlap ×1 | 103 ×1 |  | 80 |
| pricing.sub | Pop | 2 | 53 | 186 ×1 | 119 ×1 | 67 ×1 |  | 67 |
| pricing.sub | Pop | 3 | 53 | 186 ×3.48 | 119 ×2.26 | 63 ×1.21 |  | 63 |
| pricing.sub | Pop | 4 | 53 | 186 ×1 | 119 ×1 | 67 ×1 |  | 67 |
| pricing.tiers.blurb | Retro | 1 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.blurb | Retro | 2 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.blurb | Retro | 3 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.blurb | Retro | 4 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.blurb | Lime | 1 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.blurb | Lime | 2 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.blurb | Lime | 3 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.blurb | Lime | 4 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.blurb | Grunge | 1 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.blurb | Grunge | 2 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.blurb | Grunge | 3 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.blurb | Grunge | 4 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.blurb | Editorial | 1 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.blurb | Editorial | 2 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.blurb | Editorial | 3 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.blurb | Editorial | 4 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.blurb | Pop | 1 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.blurb | Pop | 2 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.blurb | Pop | 3 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.blurb | Pop | 4 | 55 | 400+ | 400+ | 400+ |  | 400 |
| pricing.tiers.feats# | Retro | 1 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats# | Retro | 2 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats# | Retro | 3 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats# | Retro | 4 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats# | Lime | 1 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats# | Lime | 2 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats# | Lime | 3 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats# | Lime | 4 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats# | Grunge | 1 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats# | Grunge | 2 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats# | Grunge | 3 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats# | Grunge | 4 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats# | Editorial | 1 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats# | Editorial | 2 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats# | Editorial | 3 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats# | Editorial | 4 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats# | Pop | 1 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats# | Pop | 2 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats# | Pop | 3 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats# | Pop | 4 | 5 | 400+ | 400+ | 400+ |  | 16 |
| pricing.tiers.feats[] | Retro | 1 | 24 | 34 ×1 | 23 lines ×1 | 50 ×1 |  | 23 |
| pricing.tiers.feats[] | Retro | 2 | 24 | 21 ×1.5 | 28 overlap ×2.03 | 23 lines ×1.65 |  | 21 |
| pricing.tiers.feats[] | Retro | 3 | 24 | 28 lines ×2.05 | 33 ×2.4 | 22 lines ×1.54 |  | 22 |
| pricing.tiers.feats[] | Retro | 4 | 24 | 64 ×4.06 | 103 lines ×6.15 | 59 ×3.52 |  | 59 |
| pricing.tiers.feats[] | Lime | 1 | 24 | 32 ×2.33 | 24 ×1.75 | 45 ×3.29 |  | 24 |
| pricing.tiers.feats[] | Lime | 2 | 24 | 29 lines ×2.15 | 41 ×2.97 | 24 lines ×1.76 |  | 24 |
| pricing.tiers.feats[] | Lime | 3 | 24 | 29 ×2.15 | 33 ×2.42 | 19 ×1.4 |  | 19 |
| pricing.tiers.feats[] | Lime | 4 | 24 | 68 ×4.26 | 107 ×6.35 | 62 ×3.73 |  | 62 |
| pricing.tiers.feats[] | Grunge | 1 | 24 | 32 ×2.33 | 25 lines ×1.84 | 45 ×3.29 |  | 25 |
| pricing.tiers.feats[] | Grunge | 2 | 24 | 29 ×2.15 | 43 ×3.15 | 24 lines ×1.76 |  | 24 |
| pricing.tiers.feats[] | Grunge | 3 | 24 | 30 lines ×2.21 | 34 ×2.49 | 20 ×1.45 |  | 20 |
| pricing.tiers.feats[] | Grunge | 4 | 24 | 69 ×4.34 | 107 ×6.35 | 62 ×3.73 |  | 62 |
| pricing.tiers.feats[] | Editorial | 1 | 24 | 32 ×2.33 | 25 lines ×1.84 | 45 ×3.29 |  | 25 |
| pricing.tiers.feats[] | Editorial | 2 | 24 | 29 lines ×2.15 | 41 ×2.97 | 24 lines ×1.76 |  | 24 |
| pricing.tiers.feats[] | Editorial | 3 | 24 | 30 lines ×2.21 | 34 ×2.49 | 20 ×1.45 |  | 20 |
| pricing.tiers.feats[] | Editorial | 4 | 24 | 60 ×3.82 | 107 ×6.35 | 62 ×3.73 |  | 60 |
| pricing.tiers.feats[] | Pop | 1 | 24 | 51 ×3.72 | 26 ×1.91 | 41 ×2.96 |  | 26 |
| pricing.tiers.feats[] | Pop | 2 | 24 | 18 ×1.32 | 27 ×1.96 | 24 lines ×1.75 |  | 18 |
| pricing.tiers.feats[] | Pop | 3 | 24 | 29 ×2.15 | 33 ×2.42 | 19 ×1.4 |  | 19 |
| pricing.tiers.feats[] | Pop | 4 | 24 | 63 ×3.97 | 107 ×6.35 | 62 ×3.73 |  | 62 |
| pricing.tiers.name | Retro | 1 | 16 | 65 ×4.22 | 19 ×1.25 | 40 page ×2.63 |  | 19 |
| pricing.tiers.name | Retro | 2 | 16 | 18 overlap ×1.08 | 23 ×1.35 | 27 ×1.6 |  | 18 |
| pricing.tiers.name | Retro | 3 | 16 | 86 ×4.95 | 67 ×3.89 | 53 ×3.13 |  | 53 |
| pricing.tiers.name | Retro | 4 | 16 | 15 ×1 | 35 lines ×1 | 22 lines ×1 |  | 15 |
| pricing.tiers.name | Lime | 1 | 16 | 41 ×2.67 | 30 lines ×1.99 | 55 ×3.55 |  | 30 |
| pricing.tiers.name | Lime | 2 | 16 | 33 ×2.16 | 44 lines ×2.89 | 28 ×1.84 |  | 28 |
| pricing.tiers.name | Lime | 3 | 16 | 70 ×4.48 | 53 lines ×3.45 | 42 ×2.75 |  | 42 |
| pricing.tiers.name | Lime | 4 | 16 | 23 lines ×1 | 50 ×1 | 32 ×1 |  | 23 |
| pricing.tiers.name | Grunge | 1 | 16 | 53 ×3.48 | 40 ×2.63 | 61 ×4 |  | 40 |
| pricing.tiers.name | Grunge | 2 | 16 | 37 ×2.4 | 50 ×3.3 | 34 lines ×2.24 |  | 34 |
| pricing.tiers.name | Grunge | 3 | 16 | 79 lines ×5.19 | 60 ×3.9 | 51 ×3.34 |  | 51 |
| pricing.tiers.name | Grunge | 4 | 16 | 25 lines ×1 | 55 ×1 | 38 ×1 |  | 25 |
| pricing.tiers.name | Editorial | 1 | 16 | 28 lines ×1.89 | 22 lines ×1.46 | 33 lines ×2.18 |  | 22 |
| pricing.tiers.name | Editorial | 2 | 16 | 22 lines ×1.45 | 28 lines ×1.9 | 18 lines ×1.18 |  | 18 |
| pricing.tiers.name | Editorial | 3 | 16 | 42 ×2.77 | 32 lines ×2.11 | 27 lines ×1.79 |  | 27 |
| pricing.tiers.name | Editorial | 4 | 16 | 14 ×1 | 33 lines ×1 | 21 lines ×1 |  | 14 |
| pricing.tiers.name | Pop | 1 | 16 | 19 ×1.25 | 22 lines ×1.4 | 15 ×0.99 |  | 15 |
| pricing.tiers.name | Pop | 2 | 16 | 15 ×0.99 | 18 overlap ×1.17 | 23 lines ×1.48 |  | 15 |
| pricing.tiers.name | Pop | 3 | 16 | 51 ×3.24 | 36 ×2.33 | 30 lines ×1.96 |  | 30 |
| pricing.tiers.name | Pop | 4 | 16 | 18 lines ×1 | 40 ×1 | 25 lines ×1 |  | 18 |
| pricing.tiers.price | Retro | 1 | 6 | 23 ×1 | 8 lines ×1 | 20 ×1 |  | 8 |
| pricing.tiers.price | Retro | 2 | 6 | 56 ×1 | 74 ×1 | 33 lines ×1 |  | 33 |
| pricing.tiers.price | Retro | 3 | 6 | 114 ×4.04 | 35 ×1 | 31 lines ×1 |  | 31 |
| pricing.tiers.price | Retro | 4 | 6 | 43 box ×7.78 | 44 ×8.01 | 25 lines ×4.84 |  | 25 |
| pricing.tiers.price | Lime | 1 | 6 | 46 ×2.4 | 12 ×1 | 30 lines ×1 |  | 12 |
| pricing.tiers.price | Lime | 2 | 6 | 64 lines ×1 | 76 lines ×1 | 35 lines ×1 |  | 35 |
| pricing.tiers.price | Lime | 3 | 6 | 61 ×3.89 | 35 ×1 | 25 ×1 |  | 25 |
| pricing.tiers.price | Lime | 4 | 6 | 45 box ×9.56 | 48 lines ×10.06 | 29 lines ×6.1 |  | 29 |
| pricing.tiers.price | Grunge | 1 | 6 | 49 ×2.49 | 14 lines ×1 | 30 lines ×1 |  | 14 |
| pricing.tiers.price | Grunge | 2 | 6 | 66 lines ×1 | 149 ×1 | 35 lines ×1 |  | 35 |
| pricing.tiers.price | Grunge | 3 | 6 | 64 ×4.16 | 60 ×1 | 30 lines ×1 |  | 30 |
| pricing.tiers.price | Grunge | 4 | 6 | 51 box ×10.57 | 53 ×10.98 | 34 lines ×7.02 |  | 34 |
| pricing.tiers.price | Editorial | 1 | 6 | 41 ×2.11 | 11 ×1 | 29 lines ×1 |  | 11 |
| pricing.tiers.price | Editorial | 2 | 6 | 61 ×1 | 134 ×1 | 33 lines ×1 |  | 33 |
| pricing.tiers.price | Editorial | 3 | 6 | 61 ×3.42 | 57 ×1 | 27 lines ×1 |  | 27 |
| pricing.tiers.price | Editorial | 4 | 6 | 32 ×7.07 | 35 ×7.71 | 20 ×4.25 |  | 20 |
| pricing.tiers.price | Pop | 1 | 6 | 23 ×2.59 | 10 lines ×1.42 | 18 ×2.13 |  | 10 |
| pricing.tiers.price | Pop | 2 | 6 | 97 ×1 | 134 ×1 | 34 lines ×1 |  | 34 |
| pricing.tiers.price | Pop | 3 | 6 | 114 ×4.11 | 51 ×1 | 25 ×1 |  | 25 |
| pricing.tiers.price | Pop | 4 | 6 | 38 box ×8.32 | 39 ×8.67 | 23 ×4.93 |  | 23 |
| pricing.tiers.tags# | Retro | 1 | 3 | 400+ | 9 lines ×3.84 | 4 lines ×1.01 |  | 4 |
| pricing.tiers.tags# | Retro | 3 | 3 | 400+ | 10 lines ×13.2 | 5 lines ×6.92 |  | 5 |
| pricing.tiers.tags# | Retro | 4 | 3 | 11 lines ×4.15 | 12 lines ×5.88 | 6 lines ×3.21 |  | 6 |
| pricing.tiers.tags# | Lime | 1 | 1 | 9 lines ×8.23 | 6 lines ×5.37 | 4 lines ×3.55 |  | 4 |
| pricing.tiers.tags# | Lime | 3 | 3 | 400+ | 10 lines ×13.26 | 4 lines ×5.75 |  | 4 |
| pricing.tiers.tags# | Lime | 4 | 3 | 10 lines ×4.27 | 12 lines ×6.4 | 6 lines ×3.35 |  | 6 |
| pricing.tiers.tags# | Grunge | 1 | 1 | 9 lines ×8.23 | 6 lines ×5.37 | 4 lines ×3.55 |  | 4 |
| pricing.tiers.tags# | Grunge | 3 | 3 | 400+ | 10 lines ×13.2 | 4 lines ×5.75 |  | 4 |
| pricing.tiers.tags# | Grunge | 4 | 3 | 11 lines ×4.45 | 12 lines ×6.12 | 6 lines ×3.35 |  | 6 |
| pricing.tiers.tags# | Editorial | 1 | 1 | 9 lines ×8.23 | 6 lines ×5.37 | 4 lines ×3.55 |  | 4 |
| pricing.tiers.tags# | Editorial | 3 | 3 | 400+ | 10 lines ×13.2 | 4 lines ×5.75 |  | 4 |
| pricing.tiers.tags# | Editorial | 4 | 3 | 9 lines ×3.63 | 12 lines ×6.12 | 6 lines ×3.35 |  | 6 |
| pricing.tiers.tags# | Pop | 1 | 1 | 4 overlap ×3.51 | 3 overlap ×2.35 | 3 lines ×2.35 |  | 3 |
| pricing.tiers.tags# | Pop | 3 | 3 | 400+ | 10 lines ×13.2 | 4 lines ×5.75 |  | 4 |
| pricing.tiers.tags# | Pop | 4 | 3 | 10 lines ×4.05 | 12 lines ×6.12 | 6 lines ×3.35 |  | 6 |
| pricing.tiers.tags[] | Retro | 1 | 4 | 400+ | 207 ×1.82 | 55 ×1.01 |  | 55 |
| pricing.tiers.tags[] | Retro | 2 | 4 | 1 lines ×4.8 | – | 1 lines ×4.66 |  | 1 |
| pricing.tiers.tags[] | Retro | 3 | 4 | 400+ | 214 ×6 | 59 ×6 |  | 59 |
| pricing.tiers.tags[] | Retro | 4 | 4 | 400+ | 400+ | 72 ×2.47 |  | 72 |
| pricing.tiers.tags[] | Lime | 1 | 13 | 400+ | 201 ×3 | 63 ×2.91 |  | 63 |
| pricing.tiers.tags[] | Lime | 2 | 4 | 1 lines ×4.85 | – | 1 lines ×4.93 |  | 1 |
| pricing.tiers.tags[] | Lime | 3 | 4 | 400+ | 204 ×6.21 | 56 ×6 |  | 56 |
| pricing.tiers.tags[] | Lime | 4 | 4 | 400+ | 400+ | 72 ×2.59 |  | 72 |
| pricing.tiers.tags[] | Grunge | 1 | 13 | 400+ | 201 ×3 | 63 ×2.91 |  | 63 |
| pricing.tiers.tags[] | Grunge | 2 | 4 | 1 lines ×4.93 | – | 1 lines ×4.93 |  | 1 |
| pricing.tiers.tags[] | Grunge | 3 | 4 | 400+ | 214 ×6 | 56 ×6 |  | 56 |
| pricing.tiers.tags[] | Grunge | 4 | 4 | 400+ | 400+ | 72 ×2.59 |  | 72 |
| pricing.tiers.tags[] | Editorial | 1 | 13 | 400+ | 201 ×3 | 63 ×2.91 |  | 63 |
| pricing.tiers.tags[] | Editorial | 2 | 4 | 1 lines ×4.85 | – | 1 lines ×4.93 |  | 1 |
| pricing.tiers.tags[] | Editorial | 3 | 4 | 400+ | 214 ×6 | 56 ×6 |  | 56 |
| pricing.tiers.tags[] | Editorial | 4 | 4 | 400+ | 400+ | 72 ×2.59 |  | 72 |
| pricing.tiers.tags[] | Pop | 1 | 13 | 35 ×2.22 | 209 ×2.96 | 58 ×2.96 |  | 35 |
| pricing.tiers.tags[] | Pop | 2 | 4 | 1 lines ×5.19 | – | 1 lines ×4.87 |  | 1 |
| pricing.tiers.tags[] | Pop | 3 | 4 | 400+ | 214 ×6 | 56 ×6 |  | 56 |
| pricing.tiers.tags[] | Pop | 4 | 4 | 400+ | 400+ | 72 ×2.59 |  | 72 |
| pricing.unit | Retro | 1 | 6 | 31 overlap ×5.14 | 7 overlap ×1.16 | 19 box ×3.11 |  | 7 |
| pricing.unit | Retro | 2 | 6 | 67 ×10.37 | 87 ×13.32 | 37 ×5.77 |  | 37 |
| pricing.unit | Retro | 3 | 6 | 68 ×10.76 | 36 ×5.74 | 32 ×5.08 |  | 32 |
| pricing.unit | Retro | 4 | 6 | 119 | 124 | 69 |  | 69 |
| pricing.unit | Lime | 1 | 6 | 23 ×3.55 | 13 ×1.98 | 35 ×5.54 |  | 13 |
| pricing.unit | Lime | 2 | 6 | 75 ×11.91 | 87 ×13.64 | 40 ×6.28 |  | 40 |
| pricing.unit | Lime | 3 | 6 | 69 ×10.79 | 36 ×5.74 | 28 box ×4.49 |  | 28 |
| pricing.unit | Lime | 4 | 6 | 133 | 147 | 88 |  | 88 |
| pricing.unit | Grunge | 1 | 6 | 25 box ×3.96 | 15 ×2.32 | 37 ×5.74 |  | 15 |
| pricing.unit | Grunge | 2 | 6 | 78 ×12.39 | 91 ×14.31 | 41 ×6.46 |  | 41 |
| pricing.unit | Grunge | 3 | 6 | 74 ×11.73 | 41 ×6.46 | 33 ×5.28 |  | 33 |
| pricing.unit | Grunge | 4 | 6 | 168 | 174 | 98 |  | 98 |
| pricing.unit | Editorial | 1 | 6 | 22 ×3.36 | 12 ×1.85 | 34 ×5.37 |  | 12 |
| pricing.unit | Editorial | 2 | 6 | 71 ×11.27 | 84 ×13.36 | 37 ×5.77 |  | 37 |
| pricing.unit | Editorial | 3 | 6 | 68 ×10.61 | 36 ×5.74 | 29 ×4.69 |  | 29 |
| pricing.unit | Editorial | 4 | 6 | 92 | 96 box | 53 box |  | 53 |
| pricing.unit | Pop | 1 | 6 | 37 ×5.69 | 11 ×1.64 | 29 box ×4.53 |  | 11 |
| pricing.unit | Pop | 2 | 6 | 68 ×10.61 | 86 ×13.2 | 39 ×6.1 |  | 39 |
| pricing.unit | Pop | 3 | 6 | 70 ×11 | 35 ×5.56 | 27 ×4.28 |  | 27 |
| pricing.unit | Pop | 4 | 6 | 89 | 92 | 51 |  | 51 |

## `tiers.price`, prose samples (`--prose`)

| field | template | layout | seed | 1440 | 768 | 390 | 1440 column | probe |
|---|---|---|---|---|---|---|---|---|
| pricing.tiers.price | Retro | 1 | 6 | 17 overlap ×0.84 | 6 overlap ×0.67 | 14 ×0.77 |  | 6 |
| pricing.tiers.price | Retro | 2 | 6 | 9 overlap ×0.34 | 11 ×0.29 | 20 ×0.8 |  | 9 |
| pricing.tiers.price | Retro | 3 | 6 | 48 ×3.73 | 20 ×0.91 | 22 ×0.91 |  | 20 |
| pricing.tiers.price | Retro | 4 | 6 | 41 ×7.19 | 44 ×7.82 | 26 ×4.72 |  | 26 |
| pricing.tiers.price | Lime | 1 | 6 | 18 box ×2.34 | 12 box ×0.92 | 24 box ×0.95 |  | 12 |
| pricing.tiers.price | Lime | 2 | 6 | 23 box ×0.97 | 35 box ×0.98 | 22 page ×0.93 |  | 22 |
| pricing.tiers.price | Lime | 3 | 6 | 23 ×3.93 | 19 ×0.96 | 19 box ×0.98 |  | 19 |
| pricing.tiers.price | Lime | 4 | 6 | 44 ×9.61 | 46 lines ×10.05 | 27 ×5.9 |  | 27 |
| pricing.tiers.price | Grunge | 1 | 6 | 20 ×2.31 | 14 ×0.92 | 29 ×0.96 |  | 14 |
| pricing.tiers.price | Grunge | 2 | 6 | 26 box ×0.98 | 40 box ×0.98 | 26 page ×0.95 |  | 26 |
| pricing.tiers.price | Grunge | 3 | 6 | 26 ×4.21 | 23 box ×0.99 | 24 page ×0.97 |  | 23 |
| pricing.tiers.price | Grunge | 4 | 6 | 48 ×10.4 | 51 ×10.8 | 33 lines ×7.07 |  | 33 |
| pricing.tiers.price | Editorial | 1 | 6 | 15 ×1.9 | 11 box ×0.92 | 20 ×0.92 |  | 11 |
| pricing.tiers.price | Editorial | 2 | 6 | 15 ×0.93 | 23 box ×0.98 | 14 page ×0.89 |  | 14 |
| pricing.tiers.price | Editorial | 3 | 6 | 15 ×3.25 | 13 box ×0.95 | 13 ×0.94 |  | 13 |
| pricing.tiers.price | Editorial | 4 | 6 | 28 box ×7.35 | 30 lines ×7.9 | 18 lines ×4.62 |  | 18 |
| pricing.tiers.price | Pop | 1 | 6 | 17 box ×2.64 | 9 box ×1.4 | 13 ×2.02 |  | 9 |
| pricing.tiers.price | Pop | 2 | 6 | 20 ×0.94 | 28 ×0.96 | 18 page ×0.91 |  | 18 |
| pricing.tiers.price | Pop | 3 | 6 | 22 box ×3.94 | 15 ×0.93 | 15 ×0.93 |  | 15 |
| pricing.tiers.price | Pop | 4 | 6 | 35 box ×8.29 | 37 ×8.68 | 22 lines ×5.15 |  | 22 |
