# Character limits — session 7 probe readout (the booking calendar's own fields)

`scripts/limits.mjs calendar` output, 2026-10-13, every template, design and width, for the
calendar's own text keys
(`--keys=heading,time,prompt,cta,slots.kind,slots.price,dateLabel,availLabel,slotCta,types[],types#`).
`image`, `open` (a date), `booked` and `email` are skipped. `IDENTITY_CHARS.calendar` is session
1's and was not re-measured: `--check`'s `who.*` rows re-verify it. Each cell is the largest
passing length at that surface, then the test the next length failed (none: a sample failed it,
`400+`: open), then `×grow`, the seat's width at the cap over the seed's. *1440 column* is layout
3's composed right-hand column (`&column=right`). *probe* is the minimum over the surfaces. The cap
written into `data.js` applies the session's rules to it (`plans/char-limits.md`, *Session 7*).

- **`prompt` is staged on a booked cued day** (`KEY_CJ` in `limits.mjs`, reach.mjs's staging):
  it prints only while no day is cued.
- **Layout 2's `heading` and the Lime-tree `availLabel` rows are the second run**, after the
  path-first seat match (*Session 7*, probe fixes). The first run read 1 (`box`) on every template
  for the heading and on the four Lime-tree templates for `availLabel`, because the head's own
  link list prints *● Availability*, a literal, and the h2 was compared with that link's box.
- **`slots.kind` is read in its row alone** (judgement 2): the cued day is booked, so the foot
  prints the prompt rather than the slot's composed line. The first run, which read the foot,
  is the second table.
- **`types#`'s alternative** (judgement 4): with one chip row more than the seed's two
  (`--extra-lines=types#`) it reads 6 on every template and width.
- **`dateLabel` and `availLabel` share one row**, and the caps written are a joint split
  (judgement 3); the solo readings below overstate the pair at 768 and 390.

| field | template | layout | seed | 1440 | 768 | 390 | 1440 column | probe |
|---|---|---|---|---|---|---|---|---|
| calendar.availLabel | Retro | 2 | 12 | 81 ×6.41 | 44 ×3.63 | 47 ×3.85 |  | 44 |
| calendar.availLabel | Lime | 2 | 12 | 97 ×8.06 | 55 ×4.64 | 52 ×4.14 |  | 52 |
| calendar.availLabel | Grunge | 2 | 12 | 99 lines ×8.21 | 57 ×4.83 | 52 ×4.14 |  | 52 |
| calendar.availLabel | Editorial | 2 | 12 | 81 ×6.74 | 41 ×3.51 | 52 ×4.14 |  | 41 |
| calendar.availLabel | Pop | 2 | 12 | 95 lines ×7.87 | 53 ×4.52 | 52 ×4.14 |  | 52 |
| calendar.cta | Retro | 1 | 12 | 143 ×7.4 | 68 ×3.73 | 53 ×3.05 |  | 53 |
| calendar.cta | Retro | 4 | 12 | 65 ×1 | 111 ×1 | 51 ×1 |  | 51 |
| calendar.cta | Lime | 4 | 12 | 53 ×1 | 88 ×1 | 46 page ×1 |  | 46 |
| calendar.cta | Grunge | 4 | 12 | 59 ×1 | 98 ×1 | 51 ×1 |  | 51 |
| calendar.cta | Editorial | 4 | 12 | 32 box ×1 | 53 box ×1 | 27 page ×1 |  | 27 |
| calendar.cta | Pop | 4 | 12 | 39 box ×1 | 61 ×1 | 32 ×1 |  | 32 |
| calendar.dateLabel | Retro | 2 | 4 | 107 ×2.76 | 67 ×1.96 | 41 ×6.15 |  | 41 |
| calendar.dateLabel | Lime | 2 | 4 | 118 ×3.45 | 72 ×2.51 | 45 ×7.5 |  | 45 |
| calendar.dateLabel | Grunge | 2 | 4 | 118 ×3.63 | 72 ×2.63 | 45 ×7.5 |  | 45 |
| calendar.dateLabel | Editorial | 2 | 4 | 118 ×2.38 | 72 ×1.75 | 45 ×7.5 |  | 45 |
| calendar.dateLabel | Pop | 2 | 4 | 118 ×3.28 | 72 ×2.37 | 45 ×7.5 |  | 45 |
| calendar.heading | Retro | 2 | 12 | 25 ×1 | 32 ×1 | 25 ×1 |  | 25 |
| calendar.heading | Retro | 3 | 7 | 126 ×1 | 84 ×1 | 44 ×1 | 36 ×1 | 36 |
| calendar.heading | Retro | 4 | 7 | 27 ×1 | 22 ×1 | 18 ×1 |  | 18 |
| calendar.heading | Lime | 1 | 8 | 25 lines ×1 | 40 lines ×1 | 26 lines ×1 |  | 25 |
| calendar.heading | Lime | 2 | 12 | 22 lines ×1 | 32 lines ×1 | 24 lines ×1 |  | 22 |
| calendar.heading | Lime | 3 | 7 | 107 ×1 | 72 lines ×1 | 40 lines ×1 | 32 lines ×1 | 32 |
| calendar.heading | Lime | 4 | 7 | 26 lines ×1 | 20 ×1 | 18 lines ×1 |  | 18 |
| calendar.heading | Grunge | 1 | 8 | 28 lines ×1 | 44 ×1 | 30 lines ×1 |  | 28 |
| calendar.heading | Grunge | 2 | 12 | 24 ×1 | 35 ×1 | 28 ×1 |  | 24 |
| calendar.heading | Grunge | 3 | 7 | 117 ×1 | 79 ×1 | 44 ×1 | 35 lines ×1 | 35 |
| calendar.heading | Grunge | 4 | 7 | 28 ×1 | 23 lines ×1 | 23 ×1 |  | 23 |
| calendar.heading | Editorial | 1 | 8 | 14 ×1 | 22 lines ×1 | 17 lines ×1 |  | 14 |
| calendar.heading | Editorial | 2 | 12 | 14 ×1 | 21 lines ×1 | 15 ×1 |  | 14 |
| calendar.heading | Editorial | 3 | 7 | 71 ×1 | 48 lines ×1 | 27 lines ×1 | 21 lines ×1 | 21 |
| calendar.heading | Editorial | 4 | 7 | 17 lines ×1 | 13 ×1 | 11 ×1 |  | 11 |
| calendar.heading | Pop | 1 | 8 | 36 ×1 | 26 lines ×1 | 13 lines ×1 |  | 13 |
| calendar.heading | Pop | 2 | 12 | 20 ×1 | 26 ×1 | 20 ×1 |  | 20 |
| calendar.heading | Pop | 3 | 7 | 79 ×1 | 54 ×1 | 30 lines ×1 | 24 lines ×1 | 24 |
| calendar.heading | Pop | 4 | 7 | 24 lines ×1 | 19 ×1 | 15 ×1 |  | 15 |
| calendar.prompt | Retro | 1 | 22 | 138 ×6.49 | 72 lines ×3.44 | 33 ×1.59 |  | 33 |
| calendar.prompt | Retro | 2 | 22 | 157 ×7.14 | 71 ×3.3 | 24 ×1 |  | 24 |
| calendar.prompt | Retro | 3 | 22 | 173 ×1 | 111 ×1 | 41 ×1 | 39 ×1 | 39 |
| calendar.prompt | Retro | 4 | 22 | 74 ×3.45 | 97 ×4.48 | 50 ×2.34 |  | 50 |
| calendar.prompt | Lime | 1 | 22 | 195 ×8.71 | 101 ×4.68 | 44 ×2.07 |  | 44 |
| calendar.prompt | Lime | 2 | 22 | 160 ×7.24 | 68 ×3.11 | 23 ×1 |  | 23 |
| calendar.prompt | Lime | 3 | 22 | 143 ×1 | 88 ×1 | 39 lines ×1 | 33 lines ×1 | 33 |
| calendar.prompt | Lime | 4 | 22 | 63 ×2.88 | 86 ×3.97 | 47 ×2.2 |  | 47 |
| calendar.prompt | Grunge | 1 | 22 | 100 ×4.61 | 101 ×4.68 | 44 ×2.07 |  | 44 |
| calendar.prompt | Grunge | 2 | 22 | 163 ×7.35 | 70 ×3.23 | 24 ×1 |  | 24 |
| calendar.prompt | Grunge | 3 | 22 | 158 ×1 | 98 ×1 | 42 ×1 | 36 ×1 | 36 |
| calendar.prompt | Grunge | 4 | 22 | 72 ×3.36 | 97 ×4.48 | 50 ×2.34 |  | 50 |
| calendar.prompt | Editorial | 1 | 22 | 195 ×8.71 | 101 ×4.68 | 44 ×2.07 |  | 44 |
| calendar.prompt | Editorial | 2 | 22 | 149 ×6.76 | 60 ×2.77 | 29 lines ×1 |  | 29 |
| calendar.prompt | Editorial | 3 | 22 | 108 ×1 | 72 ×1 | 32 lines ×1 | 24 lines ×1 | 24 |
| calendar.prompt | Editorial | 4 | 22 | 72 ×3.36 | 97 ×4.48 | 50 ×2.34 |  | 50 |
| calendar.prompt | Pop | 1 | 22 | 134 lines ×6.08 | 67 lines ×3.04 | 31 lines ×1.41 |  | 31 |
| calendar.prompt | Pop | 2 | 22 | 153 ×6.96 | 62 ×2.89 | 32 ×1 |  | 32 |
| calendar.prompt | Pop | 3 | 22 | 104 ×1 | 61 ×1 | 27 lines ×1 | 24 lines ×1 | 24 |
| calendar.prompt | Pop | 4 | 22 | 72 ×3.36 | 97 ×4.48 | 50 ×2.34 |  | 50 |
| calendar.slotCta | Retro | 2 | 13 | 134 ×5.63 | 61 ×2.61 | 32 ×1.66 |  | 32 |
| calendar.slotCta | Lime | 2 | 13 | 144 ×6.54 | 88 ×3.88 | 41 ×2.07 |  | 41 |
| calendar.slotCta | Grunge | 2 | 13 | 158 ×7.01 | 98 ×4.12 | 46 ×2.2 |  | 46 |
| calendar.slotCta | Editorial | 2 | 13 | 86 ×4.8 | 53 box ×2.96 | 25 box ×1.63 |  | 25 |
| calendar.slotCta | Pop | 2 | 13 | 104 ×5.3 | 61 ×3.13 | 29 box ×1.7 |  | 29 |
| calendar.slots.kind | Retro | 2 | 8 | 107 ×13.42 | 46 ×5.84 | 33 ×4.2 |  | 33 |
| calendar.slots.kind | Lime | 2 | 8 | 123 ×15.51 | 54 ×6.8 | 36 ×4.57 |  | 36 |
| calendar.slots.kind | Grunge | 2 | 8 | 126 ×15.8 | 55 ×6.86 | 40 ×5 |  | 40 |
| calendar.slots.kind | Editorial | 2 | 8 | 104 overlap ×13.17 | 41 ×5.14 | 33 ×4.2 |  | 33 |
| calendar.slots.kind | Pop | 2 | 8 | 120 ×15.02 | 53 ×6.69 | 36 ×4.57 |  | 36 |
| calendar.slots.price | Retro | 2 | 11 | 125 ×10.09 | 50 ×4.11 | 36 ×2.96 |  | 36 |
| calendar.slots.price | Lime | 2 | 11 | 123 ×9.94 | 54 ×4.38 | 40 ×3.23 |  | 40 |
| calendar.slots.price | Grunge | 2 | 11 | 137 ×10.86 | 61 ×4.97 | 43 ×3.51 |  | 43 |
| calendar.slots.price | Editorial | 2 | 11 | 112 ×8.83 | 44 ×3.63 | 36 ×2.96 |  | 36 |
| calendar.slots.price | Pop | 2 | 11 | 133 ×10.56 | 58 ×4.71 | 40 ×3.23 |  | 40 |
| calendar.time | Retro | 1 | 6 | 106 ×3.6 | 40 lines ×1.9 | 33 ×1 |  | 33 |
| calendar.time | Retro | 4 | 6 | 47 ×6.17 | 70 ×9 | 34 ×4.4 |  | 34 |
| calendar.time | Lime | 1 | 6 | 163 ×4.74 | 67 ×2.45 | 13 ×1.12 |  | 13 |
| calendar.time | Lime | 4 | 6 | 44 ×5.73 | 68 ×8.67 | 32 ×4.16 |  | 32 |
| calendar.time | Grunge | 1 | 6 | 67 ×2.45 | 67 ×2.45 | 13 ×1.12 |  | 13 |
| calendar.time | Grunge | 4 | 6 | 48 ×6.27 | 71 ×9.22 | 37 overlap ×4.73 |  | 37 |
| calendar.time | Editorial | 1 | 6 | 163 ×4.74 | 67 ×2.45 | 13 ×1.12 |  | 13 |
| calendar.time | Editorial | 4 | 6 | 44 ×5.73 | 68 ×8.67 | 33 ×4.31 |  | 33 |
| calendar.time | Pop | 1 | 6 | 101 lines ×3.43 | 34 lines ×1.72 | 28 lines ×1 |  | 28 |
| calendar.time | Pop | 4 | 6 | 45 ×5.79 | 69 ×8.84 | 33 ×4.31 |  | 33 |
| calendar.types# | Retro | 4 | 4 | 4 lines ×1 | 4 lines ×1 | 4 lines ×1 |  | 4 |
| calendar.types# | Lime | 4 | 4 | 4 lines ×1 | 4 lines ×1 | 4 lines ×1 |  | 4 |
| calendar.types# | Grunge | 4 | 4 | 4 lines ×1 | 4 lines ×1 | 4 lines ×1 |  | 4 |
| calendar.types# | Editorial | 4 | 4 | 4 lines ×1 | 4 lines ×1 | 4 lines ×1 |  | 4 |
| calendar.types# | Pop | 4 | 4 | 4 lines ×1 | 4 lines ×1 | 4 lines ×1 |  | 4 |
| calendar.types[] | Retro | 4 | 9 | 33 ×2.38 | 33 ×2.42 | 13 ×1 |  | 13 |
| calendar.types[] | Lime | 4 | 9 | 34 ×2.53 | 33 ×2.42 | 13 ×1 |  | 13 |
| calendar.types[] | Grunge | 4 | 9 | 34 ×2.53 | 33 ×2.42 | 13 ×1 |  | 13 |
| calendar.types[] | Editorial | 4 | 9 | 34 ×2.53 | 33 ×2.42 | 13 ×1 |  | 13 |
| calendar.types[] | Pop | 4 | 9 | 34 ×2.53 | 33 ×2.42 | 13 ×1 |  | 13 |

**`slots.kind` read with the foot line (the first run; not written):**

| field | template | layout | seed | 1440 | 768 | 390 | 1440 column | probe |
|---|---|---|---|---|---|---|---|---|
| calendar.slots.kind | Retro | 2 | 8 | 107 ×4.63 | 41 ×2.22 | 13 ×1 |  | 13 |
| calendar.slots.kind | Lime | 2 | 8 | 123 ×5.24 | 37 ×2.05 | 12 ×1 |  | 12 |
| calendar.slots.kind | Grunge | 2 | 8 | 126 ×5.33 | 40 ×2.17 | 13 ×1 |  | 13 |
| calendar.slots.kind | Editorial | 2 | 8 | 104 overlap ×4.56 | 30 ×1.83 | 20 ×1.23 |  | 20 |
| calendar.slots.kind | Pop | 2 | 8 | 120 ×5.1 | 32 ×1.89 | 16 ×1 |  | 16 |
