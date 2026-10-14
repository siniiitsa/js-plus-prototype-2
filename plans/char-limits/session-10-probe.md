# Character limits — session 10 probe readout (the enquiry form's own fields)

`scripts/limits.mjs form` output, 2026-10-13, every template, design and width, for the form's own
text keys and the `steps` and `fields` columns
(`--keys=heading,sub,para,promises[],promises#,steps.title,steps.sub,fields.label,fields.placeholder,types[],types#,typeLabel,message,messageLabel,button,price,priceUnit,bookings,cta,note,available`),
the list built from `FIELDS.form` (`image`, `photo` and `email` skipped). `IDENTITY_CHARS.form` is
session 1's and was not re-measured: `--check`'s `who.*` rows re-verify it. Each cell is the largest
passing length at that surface, then the test the next length failed (none: a sample failed it,
`400+`: open), then `×grow`, the seat's width at the cap over the seed's. *probe* is the minimum
over the surfaces. The cap written into `data.js` applies the session's rules to it
(`plans/char-limits.md`, *Session 10*).

- **`heading` is read as a display head, not a block** (session 9's `probesOf` rule). The samples
  carry no line break; layouts 1 and 2's seed carries one. At layout 3 the probe types a head, which
  replaces the composed *Book Kai Mercer for your event* (its seed and floor, 30).
- **`promises#` is read as a block** (`probesOf`: the count of a field-level `'\n'` list): the
  promises stand one a line down a column that hugs them. Open is 16 items.
- **Row 0 is every repeater's narrowest row** (a scratchpad check, `rowseats10.mjs`): the boxes of a
  layout are one width, but layout 4's odd fifth, and the three steps are one width.
- **`fields.placeholder` is unseen at layouts 2 and 3**: the card sets the label in the box and prints
  no placeholder while a label is there.
- **`price` is read as prose**: the card sets it whole, with no `priceParts()` split.

| field | template | layout | seed | 1440 | 768 | 390 | 1440 column | probe |
|---|---|---|---|---|---|---|---|---|
| form.available | Retro | 3 | 21 | 98 lines ×1 | 119 ×1 | 61 ×1 |  | 61 |
| form.available | Lime | 3 | 21 | 87 lines ×1 | 109 ×1 | 61 ×1 |  | 61 |
| form.available | Grunge | 3 | 21 | 96 lines ×1 | 119 ×1 | 61 ×1 |  | 61 |
| form.available | Editorial | 3 | 21 | 96 lines ×1 | 119 ×1 | 61 ×1 |  | 61 |
| form.available | Pop | 3 | 21 | 96 lines ×1 | 119 ×1 | 61 ×1 |  | 61 |
| form.bookings | Retro | 2 | 11 | 57 ×1 | 35 ×1 | 41 ×1 |  | 35 |
| form.bookings | Retro | 3 | 11 | 91 box ×1 | 103 ×1 | 41 ×1 |  | 41 |
| form.bookings | Lime | 2 | 11 | 48 ×1 | 32 ×1 | 42 ×1 |  | 32 |
| form.bookings | Lime | 3 | 11 | 78 ×1 | 95 box ×1 | 42 ×1 |  | 42 |
| form.bookings | Grunge | 2 | 11 | 55 ×1 | 36 ×1 | 42 ×1 |  | 36 |
| form.bookings | Grunge | 3 | 11 | 89 ×1 | 104 box ×1 | 42 ×1 |  | 42 |
| form.bookings | Editorial | 2 | 11 | 55 ×1 | 36 ×1 | 42 ×1 |  | 36 |
| form.bookings | Editorial | 3 | 11 | 89 ×1 | 104 box ×1 | 42 ×1 |  | 42 |
| form.bookings | Pop | 2 | 11 | 55 ×1 | 36 ×1 | 42 ×1 |  | 36 |
| form.bookings | Pop | 3 | 11 | 89 ×1 | 104 box ×1 | 42 ×1 |  | 42 |
| form.button | Retro | 1 | 8 | 98 ×1.08 | 65 ×1 | 29 box ×1 |  | 29 |
| form.button | Retro | 4 | 18 | 79 ×1 | 119 ×1 | 48 ×1 |  | 48 |
| form.button | Lime | 1 | 7 | 88 lines ×1 | 85 ×1 | 39 lines ×1 |  | 39 |
| form.button | Lime | 4 | 18 | 66 ×1 | 96 lines ×1 | 45 lines ×1 |  | 45 |
| form.button | Grunge | 1 | 7 | 97 ×1 | 95 lines ×1 | 42 ×1 |  | 42 |
| form.button | Grunge | 4 | 18 | 72 ×1 | 104 ×1 | 50 ×1 |  | 50 |
| form.button | Editorial | 1 | 7 | 49 lines ×1 | 47 lines ×1 | 19 ×1 |  | 19 |
| form.button | Editorial | 4 | 18 | 39 lines ×1 | 57 lines ×1 | 27 lines ×1 |  | 27 |
| form.button | Pop | 1 | 7 | 75 ×1 | 55 ×1 | 22 lines ×1 |  | 22 |
| form.button | Pop | 4 | 18 | 47 ×1 | 65 ×1 | 32 lines ×1 |  | 32 |
| form.cta | Retro | 2 | 18 | 42 ×1 | 36 ×1 | 40 ×1 |  | 36 |
| form.cta | Retro | 3 | 18 | 69 ×1 | 109 ×1 | 40 ×1 |  | 40 |
| form.cta | Lime | 2 | 18 | 36 ×1 | 30 lines ×1 | 37 ×1 |  | 30 |
| form.cta | Lime | 3 | 18 | 59 ×1 | 87 ×1 | 37 ×1 |  | 37 |
| form.cta | Grunge | 2 | 18 | 41 lines ×1 | 33 ×1 | 41 ×1 |  | 33 |
| form.cta | Grunge | 3 | 18 | 65 ×1 | 97 ×1 | 41 ×1 |  | 41 |
| form.cta | Editorial | 2 | 18 | 22 lines ×1 | 18 lines ×1 | 22 lines ×1 |  | 18 |
| form.cta | Editorial | 3 | 18 | 35 lines ×1 | 53 lines ×1 | 22 lines ×1 |  | 22 |
| form.cta | Pop | 2 | 18 | 27 lines ×1 | 20 ×1 | 26 ×1 |  | 20 |
| form.cta | Pop | 3 | 18 | 42 ×1 | 61 lines ×1 | 26 ×1 |  | 26 |
| form.fields.label | Retro | 1 | 10 | 66 ×1 | 49 lines ×1 | 51 ×1 |  | 49 |
| form.fields.label | Retro | 2 | 10 | 54 ×1 | 46 box ×1 | 57 ×1 |  | 46 |
| form.fields.label | Retro | 3 | 10 | 80 ×1 | 112 ×1 | 57 ×1 |  | 57 |
| form.fields.label | Retro | 4 | 10 | 31 ×1 | 46 lines ×1 | 22 lines ×1 |  | 22 |
| form.fields.label | Lime | 1 | 10 | 47 lines ×1 | 47 lines ×1 | 52 lines ×1 |  | 47 |
| form.fields.label | Lime | 2 | 10 | 59 lines ×1 | 52 ×1 | 69 ×1 |  | 52 |
| form.fields.label | Lime | 3 | 10 | 87 ×1 | 131 ×1 | 69 ×1 |  | 69 |
| form.fields.label | Lime | 4 | 10 | 36 ×1 | 51 ×1 | 27 ×1 |  | 27 |
| form.fields.label | Grunge | 1 | 10 | 52 ×1 | 52 ×1 | 58 ×1 |  | 52 |
| form.fields.label | Grunge | 2 | 10 | 74 ×1 | 62 ×1 | 76 ×1 |  | 62 |
| form.fields.label | Grunge | 3 | 10 | 111 ×1 | 156 ×1 | 76 ×1 |  | 76 |
| form.fields.label | Grunge | 4 | 10 | 40 lines ×1 | 57 ×1 | 30 lines ×1 |  | 30 |
| form.fields.label | Editorial | 1 | 10 | 24 lines ×1 | 24 lines ×1 | 27 lines ×1 |  | 24 |
| form.fields.label | Editorial | 2 | 10 | 40 lines ×1 | 33 lines ×1 | 41 ×1 |  | 33 |
| form.fields.label | Editorial | 3 | 10 | 61 lines ×1 | 84 ×1 | 41 ×1 |  | 41 |
| form.fields.label | Editorial | 4 | 10 | 20 lines ×1 | 29 lines ×1 | 14 ×1 |  | 14 |
| form.fields.label | Pop | 1 | 10 | 42 ×1 | 32 ×1 | 32 lines ×1 |  | 32 |
| form.fields.label | Pop | 2 | 10 | 39 lines ×1 | 33 lines ×1 | 40 ×1 |  | 33 |
| form.fields.label | Pop | 3 | 10 | 59 ×1 | 82 lines ×1 | 40 ×1 |  | 40 |
| form.fields.label | Pop | 4 | 10 | 26 ×1 | 36 ×1 | 19 ×1 |  | 19 |
| form.fields.placeholder | Retro | 1 | 15 | 54 ×1 | 37 ×1 | 39 ×1 |  | 37 |
| form.fields.placeholder | Retro | 4 | 15 | 40 ×1 | 49 ×1 | 23 ×1 |  | 23 |
| form.fields.placeholder | Lime | 1 | 15 | 54 ×1 | 41 ×1 | 42 ×1 |  | 41 |
| form.fields.placeholder | Lime | 4 | 15 | 42 ×1 | 50 ×1 | 24 lines ×1 |  | 24 |
| form.fields.placeholder | Grunge | 1 | 15 | 54 ×1 | 41 ×1 | 42 ×1 |  | 41 |
| form.fields.placeholder | Grunge | 4 | 15 | 42 ×1 | 50 ×1 | 24 lines ×1 |  | 24 |
| form.fields.placeholder | Editorial | 1 | 15 | 54 ×1 | 41 ×1 | 44 ×1 |  | 41 |
| form.fields.placeholder | Editorial | 4 | 15 | 44 ×1 | 51 ×1 | 25 ×1 |  | 25 |
| form.fields.placeholder | Pop | 1 | 15 | 50 ×1 | 36 ×1 | 35 ×1 |  | 35 |
| form.fields.placeholder | Pop | 4 | 15 | 42 ×1 | 50 ×1 | 24 lines ×1 |  | 24 |
| form.heading | Retro | 1 | 36 | 45 ×1 | 65 ×1 | 45 ×1 |  | 45 |
| form.heading | Retro | 2 | 36 | 88 lines ×1 | 24 ×1 | 60 ×1 |  | 24 |
| form.heading | Retro | 3 | 30 | 32 ×1 | 48 ×1 | 37 ×1 |  | 32 |
| form.heading | Retro | 4 | 10 | 30 lines ×1 | 25 ×1 | 20 ×1 |  | 20 |
| form.heading | Lime | 1 | 36 | 37 ×1 | 37 ×1 | 56 lines ×1 |  | 37 |
| form.heading | Lime | 2 | 36 | 47 ×1 | 37 ×1 | 61 ×1 |  | 37 |
| form.heading | Lime | 3 | 30 | 32 lines ×1 | 43 lines ×1 | 33 ×1 |  | 32 |
| form.heading | Lime | 4 | 10 | 28 lines ×1 | 24 lines ×1 | 19 lines ×1 |  | 19 |
| form.heading | Grunge | 1 | 36 | 30 ×1 | 30 ×1 | 49 lines ×1 |  | 30 |
| form.heading | Grunge | 2 | 36 | 67 ×1 | 40 lines ×1 | 53 lines ×1 |  | 40 |
| form.heading | Grunge | 3 | 30 | 41 lines ×1 | 49 ×1 | 46 ×1 |  | 41 |
| form.heading | Grunge | 4 | 10 | 32 lines ×1 | 27 lines ×1 | 25 lines ×1 |  | 25 |
| form.heading | Editorial | 1 | 36 | 26 lines ×0.78 | 26 lines ×0.61 | 26 lines ×0.92 |  | 26 |
| form.heading | Editorial | 2 | 36 | 45 lines ×1 | 42 lines ×1 | 57 lines ×1 |  | 42 |
| form.heading | Editorial | 3 | 30 | 27 lines ×1 | 30 lines ×1 | 30 lines ×1 |  | 27 |
| form.heading | Editorial | 4 | 10 | 19 lines ×1 | 15 ×1 | 12 ×1 |  | 12 |
| form.heading | Pop | 1 | 36 | 31 ×1 | 31 ×1 | 30 ×1 |  | 30 |
| form.heading | Pop | 2 | 36 | 53 lines ×1 | 47 ×1 | 40 lines ×1 |  | 40 |
| form.heading | Pop | 3 | 30 | 30 lines ×1 | 42 lines ×1 | 31 lines ×1 |  | 30 |
| form.heading | Pop | 4 | 10 | 26 ×1 | 23 lines ×1 | 17 lines ×1 |  | 17 |
| form.message | Retro | 1 | 25 | 120 ×1 | 88 ×1 | 39 ×1 |  | 39 |
| form.message | Retro | 4 | 25 | 92 lines ×1 | 109 ×1 | 53 ×1 |  | 53 |
| form.message | Lime | 1 | 25 | 120 ×1 | 96 ×1 | 42 ×1 |  | 42 |
| form.message | Lime | 4 | 25 | 96 ×1 | 110 ×1 | 54 ×1 |  | 54 |
| form.message | Grunge | 1 | 25 | 120 ×1 | 96 ×1 | 42 ×1 |  | 42 |
| form.message | Grunge | 4 | 25 | 96 ×1 | 110 ×1 | 54 ×1 |  | 54 |
| form.message | Editorial | 1 | 25 | 122 ×1 | 97 ×1 | 44 ×1 |  | 44 |
| form.message | Editorial | 4 | 25 | 100 ×1 | 114 ×1 | 58 ×1 |  | 58 |
| form.message | Pop | 1 | 25 | 114 ×1 | 86 ×1 | 35 ×1 |  | 35 |
| form.message | Pop | 4 | 25 | 96 ×1 | 110 ×1 | 54 ×1 |  | 54 |
| form.messageLabel | Retro | 1 | 7 | 135 ×1 | 103 lines ×1 | 51 ×1 |  | 51 |
| form.messageLabel | Retro | 4 | 7 | 65 ×1 | 96 ×1 | 45 lines ×1 |  | 45 |
| form.messageLabel | Lime | 1 | 7 | 98 ×1 | 99 lines ×1 | 52 lines ×1 |  | 52 |
| form.messageLabel | Lime | 4 | 7 | 75 ×1 | 108 ×1 | 59 lines ×1 |  | 59 |
| form.messageLabel | Grunge | 1 | 7 | 108 ×1 | 108 ×1 | 58 ×1 |  | 58 |
| form.messageLabel | Grunge | 4 | 7 | 83 lines ×1 | 118 ×1 | 64 ×1 |  | 64 |
| form.messageLabel | Editorial | 1 | 7 | 69 ×1 | 74 ×1 | 37 ×1 |  | 37 |
| form.messageLabel | Editorial | 4 | 7 | 45 lines ×1 | 65 ×1 | 35 lines ×1 |  | 35 |
| form.messageLabel | Pop | 1 | 7 | 92 lines ×1 | 70 ×1 | 33 lines ×1 |  | 33 |
| form.messageLabel | Pop | 4 | 7 | 55 ×1 | 74 ×1 | 41 lines ×1 |  | 41 |
| form.note | Retro | 2 | 20 | 68 ×1 | 47 ×1 | 54 ×1 |  | 47 |
| form.note | Retro | 3 | 20 | 102 ×1 | 114 ×1 | 54 ×1 |  | 54 |
| form.note | Lime | 2 | 20 | 61 ×1 | 43 ×1 | 54 ×1 |  | 43 |
| form.note | Lime | 3 | 20 | 91 ×1 | 106 ×1 | 54 ×1 |  | 54 |
| form.note | Grunge | 2 | 20 | 67 ×1 | 47 ×1 | 54 ×1 |  | 47 |
| form.note | Grunge | 3 | 20 | 100 ×1 | 115 ×1 | 54 ×1 |  | 54 |
| form.note | Editorial | 2 | 20 | 67 ×1 | 47 ×1 | 54 ×1 |  | 47 |
| form.note | Editorial | 3 | 20 | 100 ×1 | 115 ×1 | 54 ×1 |  | 54 |
| form.note | Pop | 2 | 20 | 67 ×1 | 47 ×1 | 54 ×1 |  | 47 |
| form.note | Pop | 3 | 20 | 100 ×1 | 115 ×1 | 54 ×1 |  | 54 |
| form.para | Retro | 3 | 70 | 400+ | 400+ | 400+ |  | 400 |
| form.para | Lime | 3 | 70 | 400+ | 400+ | 400+ |  | 400 |
| form.para | Grunge | 3 | 70 | 400+ | 400+ | 400+ |  | 400 |
| form.para | Editorial | 3 | 70 | 400+ | 400+ | 400+ |  | 400 |
| form.para | Pop | 3 | 70 | 400+ | 400+ | 400+ |  | 400 |
| form.price | Retro | 2 | 6 | 35 ×4.63 | 32 ×4.29 | 39 ×5.12 |  | 32 |
| form.price | Retro | 3 | 6 | 53 ×7 | 76 ×10.05 | 39 ×5.12 |  | 39 |
| form.price | Lime | 2 | 6 | 31 ×5 | 28 lines ×4.51 | 35 lines ×5.6 |  | 28 |
| form.price | Lime | 3 | 6 | 45 ×7.09 | 67 ×10.57 | 35 lines ×5.6 |  | 35 |
| form.price | Grunge | 2 | 6 | 35 lines ×5.8 | 32 lines ×5.32 | 39 lines ×6.47 |  | 32 |
| form.price | Grunge | 3 | 6 | 50 ×8.3 | 74 ×12.23 | 39 lines ×6.47 |  | 39 |
| form.price | Editorial | 2 | 6 | 21 lines ×4.29 | 19 lines ×3.85 | 23 lines ×4.74 |  | 19 |
| form.price | Editorial | 3 | 6 | 30 lines ×6.29 | 45 lines ×9.1 | 23 lines ×4.74 |  | 23 |
| form.price | Pop | 2 | 6 | 23 ×4.06 | 22 lines ×3.88 | 26 ×4.66 |  | 22 |
| form.price | Pop | 3 | 6 | 34 ×6 | 50 ×8.92 | 26 ×4.66 |  | 26 |
| form.priceUnit | Retro | 2 | 12 | 68 ×5.57 | 47 ×3.93 | 54 ×4.45 |  | 47 |
| form.priceUnit | Retro | 3 | 12 | 102 ×8.45 | 114 ×9.25 | 54 ×4.45 |  | 54 |
| form.priceUnit | Lime | 2 | 12 | 61 ×5.06 | 43 ×3.56 | 54 ×4.45 |  | 43 |
| form.priceUnit | Lime | 3 | 12 | 91 ×7.51 | 106 ×8.64 | 54 ×4.45 |  | 54 |
| form.priceUnit | Grunge | 2 | 12 | 67 ×5.53 | 47 ×3.93 | 54 ×4.45 |  | 47 |
| form.priceUnit | Grunge | 3 | 12 | 100 ×8.32 | 115 ×9.3 | 54 ×4.45 |  | 54 |
| form.priceUnit | Editorial | 2 | 12 | 67 ×5.53 | 47 ×3.93 | 54 ×4.45 |  | 47 |
| form.priceUnit | Editorial | 3 | 12 | 100 ×8.32 | 115 ×9.3 | 54 ×4.45 |  | 54 |
| form.priceUnit | Pop | 2 | 12 | 67 ×5.53 | 47 ×3.93 | 54 ×4.45 |  | 47 |
| form.priceUnit | Pop | 3 | 12 | 100 ×8.32 | 115 ×9.3 | 54 ×4.45 |  | 54 |
| form.promises# | Retro | 1 | 3 | 400+ | 400+ | 400+ |  | 16 |
| form.promises# | Retro | 2 | 3 | 400+ | 400+ | 400+ |  | 16 |
| form.promises# | Lime | 1 | 3 | 400+ | 400+ | 400+ |  | 16 |
| form.promises# | Lime | 2 | 3 | 400+ | 400+ | 400+ |  | 16 |
| form.promises# | Grunge | 1 | 3 | 400+ | 400+ | 400+ |  | 16 |
| form.promises# | Grunge | 2 | 3 | 400+ | 400+ | 400+ |  | 16 |
| form.promises# | Editorial | 1 | 3 | 6 overlap ×1 | 400+ | 400+ |  | 6 |
| form.promises# | Editorial | 2 | 3 | 400+ | 400+ | 400+ |  | 16 |
| form.promises# | Pop | 1 | 3 | 9 overlap ×1 | 400+ | 400+ |  | 9 |
| form.promises# | Pop | 2 | 3 | 400+ | 400+ | 400+ |  | 16 |
| form.promises[] | Retro | 1 | 29 | 45 ×1 | 100 ×1 | 47 ×1 |  | 45 |
| form.promises[] | Retro | 2 | 29 | 85 ×2.57 | 44 ×1.36 | 32 ×1 |  | 32 |
| form.promises[] | Lime | 1 | 29 | 34 ×1.67 | 98 lines ×4.75 | 54 ×2.63 |  | 34 |
| form.promises[] | Lime | 2 | 29 | 91 lines ×4.41 | 47 ×2.33 | 34 ×1.68 |  | 34 |
| form.promises[] | Grunge | 1 | 29 | 34 ×1.67 | 98 lines ×4.75 | 54 ×2.63 |  | 34 |
| form.promises[] | Grunge | 2 | 29 | 91 lines ×4.41 | 47 ×2.33 | 34 ×1.68 |  | 34 |
| form.promises[] | Editorial | 1 | 29 | 34 ×1.67 | 92 lines ×4.48 | 47 ×2.33 |  | 34 |
| form.promises[] | Editorial | 2 | 29 | 91 lines ×4.41 | 47 ×2.33 | 28 lines ×1.39 |  | 28 |
| form.promises[] | Pop | 1 | 29 | 51 ×2.49 | 99 lines ×4.8 | 42 ×2.05 |  | 42 |
| form.promises[] | Pop | 2 | 29 | 91 lines ×4.41 | 47 ×2.33 | 31 ×1.54 |  | 31 |
| form.steps.sub | Retro | 4 | 24 | 95 lines ×1 | 105 ×1 | 44 ×1 |  | 44 |
| form.steps.sub | Lime | 4 | 24 | 83 ×1 | 97 ×1 | 44 ×1 |  | 44 |
| form.steps.sub | Grunge | 4 | 24 | 93 ×1 | 105 ×1 | 44 ×1 |  | 44 |
| form.steps.sub | Editorial | 4 | 24 | 93 ×1 | 105 ×1 | 44 ×1 |  | 44 |
| form.steps.sub | Pop | 4 | 24 | 93 ×1 | 105 ×1 | 44 ×1 |  | 44 |
| form.steps.title | Retro | 4 | 20 | 78 ×1 | 97 ×1 | 41 ×1 |  | 41 |
| form.steps.title | Lime | 4 | 20 | 83 ×1 | 97 ×1 | 41 ×1 |  | 41 |
| form.steps.title | Grunge | 4 | 20 | 83 ×1 | 97 ×1 | 41 ×1 |  | 41 |
| form.steps.title | Editorial | 4 | 20 | 83 ×1 | 97 ×1 | 41 ×1 |  | 41 |
| form.steps.title | Pop | 4 | 20 | 83 ×1 | 97 ×1 | 41 ×1 |  | 41 |
| form.sub | Retro | 4 | 7 | 88 ×1 | 60 ×1 | 33 lines ×1 |  | 33 |
| form.sub | Lime | 4 | 7 | 107 ×1 | 72 lines ×1 | 40 lines ×1 |  | 40 |
| form.sub | Grunge | 4 | 7 | 117 ×1 | 79 ×1 | 44 ×1 |  | 44 |
| form.sub | Editorial | 4 | 7 | 71 ×1 | 48 lines ×1 | 27 lines ×1 |  | 27 |
| form.sub | Pop | 4 | 7 | 79 ×1 | 54 ×1 | 30 lines ×1 |  | 30 |
| form.typeLabel | Retro | 1 | 10 | 135 ×1 | 103 lines ×1 | 51 ×1 |  | 51 |
| form.typeLabel | Lime | 1 | 10 | 98 ×1 | 99 lines ×1 | 52 lines ×1 |  | 52 |
| form.typeLabel | Grunge | 1 | 10 | 108 ×1 | 108 ×1 | 58 ×1 |  | 58 |
| form.typeLabel | Editorial | 1 | 10 | 69 ×1 | 74 ×1 | 37 ×1 |  | 37 |
| form.typeLabel | Pop | 1 | 10 | 92 lines ×1 | 70 ×1 | 33 lines ×1 |  | 33 |
| form.types# | Retro | 1 | 5 | 11 lines ×1 | 9 lines ×1 | 8 lines ×1 |  | 8 |
| form.types# | Lime | 1 | 5 | 12 lines ×1 | 10 lines ×1 | 5 lines ×1 |  | 5 |
| form.types# | Grunge | 1 | 5 | 12 lines ×1 | 10 lines ×1 | 5 lines ×1 |  | 5 |
| form.types# | Editorial | 1 | 5 | 11 lines ×1 | 9 lines ×1 | 8 lines ×1 |  | 8 |
| form.types# | Pop | 1 | 5 | 11 lines ×1 | 9 lines ×1 | 8 lines ×1 |  | 8 |
| form.types[] | Retro | 1 | 7 | 400+ | 187 ×4.06 | 45 ×3.77 |  | 45 |
| form.types[] | Lime | 1 | 7 | 400+ | 196 ×4.25 | 54 ×4.17 |  | 54 |
| form.types[] | Grunge | 1 | 7 | 400+ | 196 ×4.25 | 49 ×4.25 |  | 49 |
| form.types[] | Editorial | 1 | 7 | 219 ×4.25 | 193 ×4.25 | 42 ×3.7 |  | 42 |
| form.types[] | Pop | 1 | 7 | 400+ | 194 ×4.17 | 42 ×3.62 |  | 42 |

**The message placeholder with one line more** (`--extra-lines=message`; the written caps hold it
to the frame's one line, judgement 6):

| field | template | layout | seed | 1440 | 768 | 390 | 1440 column | probe |
|---|---|---|---|---|---|---|---|---|
| form.message | Retro | 1 | 25 | 240 ×1 | 171 ×1 | 79 lines ×1 |  | 79 |
| form.message | Retro | 4 | 25 | 182 ×1 | 218 ×1 | 106 lines ×1 |  | 106 |
| form.message | Lime | 1 | 25 | 240 ×1 | 187 ×1 | 84 lines ×1 |  | 84 |
| form.message | Lime | 4 | 25 | 187 ×1 | 219 ×1 | 107 lines ×1 |  | 107 |
| form.message | Grunge | 1 | 25 | 240 ×1 | 187 ×1 | 84 lines ×1 |  | 84 |
| form.message | Grunge | 4 | 25 | 187 ×1 | 219 ×1 | 107 lines ×1 |  | 107 |
| form.message | Editorial | 1 | 25 | 241 ×1 | 196 ×1 | 86 lines ×1 |  | 86 |
| form.message | Editorial | 4 | 25 | 198 ×1 | 229 ×1 | 114 ×1 |  | 114 |
| form.message | Pop | 1 | 25 | 229 ×1 | 169 ×1 | 66 ×1 |  | 66 |
| form.message | Pop | 4 | 25 | 187 ×1 | 219 ×1 | 107 lines ×1 |  | 107 |
