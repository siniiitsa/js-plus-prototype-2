# Character limits — session 11 probe readout (the footer's own fields)

`scripts/limits.mjs footer` output, 2026-10-14, every template and width, for the footer's own text
keys and the `links` column (`--keys=statement,links.label,cta,copyright`), the list built from
`FIELDS.footer` (`showBadge` is a select). The footer has one design (`NVAR.footer` 1), and its seat
(`SCHEMES_OF[theme][page].footer`, Lime's and Grunge's `footerBand`) moves no text: every text rect
and every ring `textPath` reads the same at `&page=` 0–3 as without it, at all fifteen surfaces (a
scratchpad check, `rowseats11.mjs --pages`), so the harness's page-less render is the one reading.
`IDENTITY_CHARS.footer` is session 1's and was not re-measured: `--check`'s `who.*` rows re-verify it.
Each cell is the largest passing length at that surface, then the test the next length failed (none:
a sample failed it, `400+`: open), then `×grow`, the seat's width at the cap over the seed's. *probe*
is the minimum over the surfaces. The cap written into `data.js` applies the session's rules to it
(`plans/char-limits.md`, *Session 11*).

- **`statement` is read as a display head, not a block** (`probesOf`'s `HEADS`). The samples carry
  no line break; the seed carries one after *make*.
- **`links.label` is written into every row at once** (`rowsAt`): the eight rows are halved into two
  columns side by side, so the reading is both columns at the cap. The reference prints *About* in
  every row. Under Pop and Editorial the second column wraps at 390 by design (*SHOWS/* over
  *COVERAGE*), so it may take one line more there (`EXTRA_AT`; every other link seat is `nowrap`).
- **`copyright` is read beside the credit**, *A JustPay Product*, a literal. Pop's row is re-read
  under `DROPS`: past its room at 390 the row wraps as a whole and the credit drops under the
  copyright (JP-122), and at the row's 0.86 line the two lines' text boxes overlap where their ink
  does not. The first run read that as an overlap at 16.
- **`cta`'s column is the pill's own seat, not the cap.** The probe watches the pill alone, and it
  stands in the first link column, so it also squeezes the second. The written caps (16; Editorial
  12, Pop 11) come from the joint check with the labels at their caps (`joint11.mjs`) and from the
  seeded labels' line counts beside the pill (`pill11.mjs`), both in the session's scratchpad.

| field | template | layout | seed | 1440 | 768 | 390 | 1440 column | probe |
|---|---|---|---|---|---|---|---|---|
| footer.copyright | Retro | 1 | 17 | 104 ×5.15 | 44 ×2.24 | 31 ×1 |  | 31 |
| footer.copyright | Lime | 1 | 17 | 139 ×7.47 | 69 ×3.76 | 28 ×1 |  | 28 |
| footer.copyright | Grunge | 1 | 17 | 154 ×8.42 | 78 ×4.36 | 32 lines ×1 |  | 32 |
| footer.copyright | Editorial | 1 | 17 | 101 ×6.07 | 55 lines ×3.34 | 24 lines ×1 |  | 24 |
| footer.copyright | Pop | 1 | 17 | 136 ×8.02 | 49 ×2.95 | 35 lines ×2.12 |  | 35 |
| footer.cta | Retro | 1 | 8 | 79 ×5.11 | 53 box ×3.57 | 20 ×1.62 |  | 20 |
| footer.cta | Lime | 1 | 8 | 69 ×4.14 | 75 ×4.04 | 32 page ×2.04 |  | 32 |
| footer.cta | Grunge | 1 | 8 | 83 page ×4.71 | 85 ×4.29 | 36 ×2.14 |  | 36 |
| footer.cta | Editorial | 1 | 8 | 60 ×4.12 | 36 ×2.54 | 24 page ×1.83 |  | 24 |
| footer.cta | Pop | 1 | 8 | 79 ×4.81 | 33 ×2.3 | 36 ×2.49 |  | 33 |
| footer.links.label | Retro | 1 | 14 | 45 ×8.1 | 35 box ×6.42 | 19 box ×3.5 |  | 19 |
| footer.links.label | Lime | 1 | 14 | 56 ×9.63 | 65 box ×11.11 | 40 ×7 |  | 40 |
| footer.links.label | Grunge | 1 | 14 | 61 ×10.89 | 70 ×12.67 | 41 ×7.3 |  | 41 |
| footer.links.label | Editorial | 1 | 14 | 38 box ×6.29 | 27 box ×4.49 | 20 lines ×3.27 |  | 20 |
| footer.links.label | Pop | 1 | 14 | 10 ×1.63 | 13 ×2.2 | 13 lines ×2.2 |  | 10 |
| footer.statement | Retro | 1 | 36 | 65 lines ×1 | 65 lines ×1 | 13 ×1 |  | 13 |
| footer.statement | Lime | 1 | 36 | 45 ×1 | 47 ×1 | 19 ×1 |  | 19 |
| footer.statement | Grunge | 1 | 36 | 45 ×1 | 49 ×1 | 59 ×1 |  | 45 |
| footer.statement | Editorial | 1 | 36 | 24 ×0.8 | 26 ×0.8 | 31 ×1 |  | 24 |
| footer.statement | Pop | 1 | 36 | 49 ×1 | 49 ×1 | 10 ×1 |  | 10 |

**One line more** (`--extra-lines=statement,copyright`), the alternative a user call would allow.
Pop's copyright row here predates `DROPS`; re-read with the credit's drop allowed it is 64 (390).

| field | template | layout | seed | 1440 | 768 | 390 | 1440 column | probe |
|---|---|---|---|---|---|---|---|---|
| footer.copyright | Retro | 1 | 17 | 229 ×5.79 | 106 ×2.83 | 44 ×1 |  | 44 |
| footer.copyright | Lime | 1 | 17 | 295 ×8.05 | 158 ×4.39 | 56 lines ×1 |  | 56 |
| footer.copyright | Grunge | 1 | 17 | 328 ×9.02 | 170 ×4.9 | 60 ×1 |  | 60 |
| footer.copyright | Editorial | 1 | 17 | 218 ×6.63 | 126 ×3.89 | 42 lines ×1 |  | 42 |
| footer.copyright | Pop | 1 | 17 | 293 ×8.73 | 113 ×3.53 | 16 ×0.95 |  | 16 |
| footer.statement | Retro | 1 | 36 | 86 ×1 | 86 ×1 | 13 ×1 |  | 13 |
| footer.statement | Lime | 1 | 36 | 45 ×1 | 67 ×1 | 19 ×1 |  | 19 |
| footer.statement | Grunge | 1 | 36 | 46 ×1 | 68 ×1 | 85 ×1 |  | 46 |
| footer.statement | Editorial | 1 | 36 | 32 ×0.8 | 32 ×0.8 | 40 ×1 |  | 32 |
| footer.statement | Pop | 1 | 36 | 61 ×1 | 61 ×1 | 10 ×1 |  | 10 |

**The statement as a block** (the lines test off, a scratchpad copy of the probe with `statement` out
of `HEADS`): Retro 130 / 400+ / 13, Lime 45 / 400+ / 19, Grunge 46 / 400+ / 145, Editorial 400+ /
400+ / 80, Pop 120 / 400+ / 10 (1440 / 768 / 390). The block rule would write Retro 36, Lime 36,
Grunge 46, Editorial 80, Pop 36.
