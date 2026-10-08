# The enquiry form — working notes

Moved word for word out of `CLAUDE.md`'s *Intentional limits — not bugs* on 2026-09-30, so it
loads only when a session works on it. "Above" and "below" may point into `CLAUDE.md` or
another `notes/` file.

- **The enquiry form fills in and sends, in the published tab only.** It was the last §10.2
  section whose every control was a picture, and the one the whole page points at:
  `CTA_TARGETS.book` starts at `form`, so the header's Book Now, the pricing pills and the
  calendar's foot pill all scroll the visitor to a set of `<span>`s. Four of its seven values also
  bypassed `cv()` — `FORM_PROMISES`, `FORM_FIELDS`, `FORM_TYPES`, `FORM_MESSAGE` were constants —
  and `email` was a field that edited nothing, `cta`'s and `para`'s state on the calendar. It is
  now what the form is *for*: **the submit is a `mailto:`**, composed by `enquiryMailto()` in
  `data.js` beside `extUrl()` (whose comment already said a `mailto:` is passed through untouched),
  bound in `sectionVm` over the address and labels, and rendered as an **`<a href>`, never a
  `<form>`**. That is load-bearing: a `<form>` here has no action, so submitting it — which an
  Enter key in any text box does — posts to `<base href>`, the opener's URL, and the published tab
  reloads into the builder. The `document.write` failure through a different door. There is no
  `<form>` element in the section and there must never be one; with none, Enter does nothing at
  all. The `<a>` is also what makes the whole thing testable from the opener: fill the boxes
  synthetically and read the composed address off `getAttribute('href')`. An empty `email`, or
  one `emailProblem()` in `data.js` refuses (JP-049 — the one email test, which `urlProblem`'s
  `mailto:` branch and `formErrors` ask too; a pasted `mailto:` is taken off, and the field is a
  `UrlInput` taught `check={emailProblem}`), composes to `''` and the pill goes back to being a span — the Soundcloud rule, not the gallery's
  hide-the-row rule: a form the artist has not addressed is still the picture their page is built
  around. The chip starts at **0**, not the `-1` the player's `cur`, the gallery's `pick`, the
  map's `sel` and the calendar's `''` start at — the frame draws chip 0 filled, so here the
  picture *is* a choice, and pricing's `active` pins 0 on the canvas for the same reason; do not
  "fix" it to -1. It is clamped for pricing's reason too, since Publish re-renders the tab that is
  already open. `showTypes` is `s.v0 && nTypes`, and the **mailto reads it rather than the count**:
  a layout that draws no chip row sends the bare `Enquiry` rather than claiming a type
  the visitor was never offered. **No palette has a red**, so a refused box is an *inset* rule in
  `ctlInk` — inset, so the frame's stated 60 does not grow — under a prompt line (Lime's boxes
  are pills, so there its hairline thickens to a 2px inset ring of full ink, layout 2's rule; Grunge's idle
  ring is already full black, so its refused box is 2px of `s.tx` — colour, not weight alone,
  Lime's layout-4 rule; Editorial's idle mark is a 56% dashed rule under the box, so a refusal
  drops the dashes for a solid 2px inset rule of full paper — colour, weight and dash at once;
  Pop's boxes are Lime's pills in a 31% white hairline on its pink half, so a refusal is a 2px
  inset ring of the half's own full white — colour and weight at once);
  errors are
  `useState`, set on a refused submit and cleared per box as it is corrected, because there is
  still no effect in the file. A valid submit swaps the **mustard half only** for a confirmation
  that prints the address in **plain text**, since a browser that opened no mail app must still
  show one; the olive half, the shell and the one sheet of grain do not move, and *Write another*
  keeps what was typed. Two more rules: the boxes are **paired two to a row in `sectionVm`**
  (`vm.formRows`), not auto-flowed, because all three frames space the two fields *inside* a row
  by 12 (10 at 390) and the rows themselves by the panel's own 14 — one grid has a single
  `rowGap` — and an odd count trails one half-width cell, the pricing deck's rule; and a published
  placeholder draws at `::placeholder`'s `.45` where the canvas span draws it full, which is
  **Repertoire's accepted diff**, not a new one, and is why no fourth `.hv-*` class was added.
  *(Reversed for layouts 2 and 3 by JP-093, user call, 2026-10-01: there the placeholder is the
  box's only label, so their inputs set `--ph: 1` and it draws full, below. Layouts 1 and 4 keep
  the .45, since their placeholder is a hint under a label, Pop's layout 1 aside.)*
  *(Reversed for Pop's layout 1 by JP-119, user call, 2026-10-08: its frame fills the hint white
  at 80%, which the canvas span always drew (`POP_FORM.ph`, read as `G.ph`). So each live box
  sets `--ph: 0.8` on its own style, never in `box()`, gated on `G.ph`: the seed's four inputs
  and the message. The colour needs nothing, since `::placeholder` inherits the box's `G.on`,
  `S3.text3` white. The published tab now draws the frame's 3.0 : 1 on the `#EE138B` box, where
  the .45 drew 1.7 : 1. Lime's, Grunge's and Editorial's layout 1 share the block and keep the
  .45, as does every layout 4.)*
  **Everything in this paragraph from "The chip starts at 0" on is layout 1's**: layout 2 is a
  narrow sidebar card on a full-bleed mustard sheet (pale under Lime; Grunge's frame paints no
  sheet at all, its Scheme 4 being its Scheme 1; under Editorial the sheet is the root's own
  terracotta, the section seated on Scheme 4; under Pop the root's own blue, Scheme 4 again, with
  the card a lime nested Scheme 2 read through `s.onScheme[2]`), and it shares the seam whole rather than
  growing one — the same `vals`, the same `errs`, the same `sent`, the same `<a href="mailto:">`
  and the same *Write another*. What it does not draw is the chip row (so `showTypes` stays
  `!!s.v0 && nTypes` and its mailto sends the bare `Enquiry`), the message textarea, or the
  boxes' placeholders: its box holds the field's **label** instead, uppercased as a *string* so
  the live input can carry it as a placeholder without also shouting whatever the visitor types,
  which is what keeps the published first paint the canvas's picture. The input also sets
  `--ph: 1` inline, so that placeholder draws at full strength, as the canvas span does, where
  `index.css`'s `var(--ph, .45)` dims every hint (JP-093). Its refused box thickens an
  inset **ring** where layout 1 draws an inset rule — a rule under a 999px pill reads as a smear
  (under Lime the ring is 2px of full ink, Lime's layout-1 rule, and under Grunge 2px of `s.tx`,
  the idle ring being the white 15%; Editorial's boxes are square and dashed 6, 6 in full ink, so
  its refusal drops the dash for a solid 2px ring of paper — colour, weight and dash at once; Pop's
  are Lime's pills in a 1px hairline of full violet on the lime card, so a refusal is 2px of the
  card's own pink, `G.badRing` — colour and weight at once) —
  and its card carries the frame's price row, `★★★★★ 42 bookings` line, "Check Availability"
  label and "No charge to enquire" line as fields seeded with the frame's copy (`price`,
  `priceUnit`, `bookings`, `cta`, `note`), each dropping when emptied except the label, which is
  the submit and falls back to `button` (Lime's card draws all five, the stars in ink, since
  Scheme 4 binds both of the line's colours to it; Grunge's, Editorial's and Pop's line is two-tone, the
  stars in the accent — paper under Editorial, the card's pink under Pop — and the count in ink). The stage photograph above the heading is
  `FIELDS.form.photo`, a **third single-photo slot** beside `image` and `avatar`, because this
  section's `image` **is** the artist: the header's pair is the other way up,
  and layout 1 has drawn `image` as the 48px circle since it was fitted.
  **The credit row yields at 390** (JP-120, user call, 2026-10-07, every template): the
  promises / credit row was a no-wrap space-between row with the credit `flex: 'none'`, so a
  long name squeezed the promises to a word a line and, under Editorial's Gloock, ran past the
  page (*Maximilian Featherstonehaugh*, 375 wide on a 370 measure). At 390 the row now wraps as
  1440's does, the promises hold half of it (`flex: '1 1 0'` floored at `50%` less half the gap —
  a zero basis, because the line break reads the flex-base size and the promises' max-content
  would have wrapped Kai Mercer's credit too), and the credit shrinks (`0 1 auto`), so a name
  wider than the other half stands under the promises and wraps between words, inside one with
  `break-word`. The seeded name keeps the frame's row (its credit is 128–169 of 370); only the
  promises' box widens into the space-between gap. 1440 and 768 do not move.
  **Layout 3 is layout 2's card again, beside a display head instead of under a
  photograph**, and it shares the seam whole for the second time — the same `vals`, the
  same `errs`, the same `sent`, the same `<a href="mailto:">`, the same *Write another*,
  the same label-in-the-box and the same bare `Enquiry` subject, since `showTypes` is
  still `!!s.v0`. What it does not draw is the portrait, so **`image` now reaches layouts
  1 and 2 alone** — the frame has no credit row. Its eyebrow is `available`, seeded with
  the frame's "Available 2025 / 2026" and emptiable; `para` takes the paragraph under the
  head; and the card carries **layout 2's own card fields** — the price row, the
  `★★★★★ 42 bookings` line, the `cta` submit label and the `note` line under the pill —
  because it is the same card component (QA, 2026-09-15). So `promises` skips layout 3:
  layouts 1 and 2 read it (layout 4 numbers `steps` instead, JP-079). **Its head is the frame's, off the artist's name**
  (JP-070, user call, 2026-09-29): every layout-3 frame reads "Book Kai for / your event",
  naming its mock artist, so with `heading` absent `sectionVm` resolves `formHeading3(name)`,
  "Book {name} for\nyour event" (the break folds to a space here), and `EditPanel`'s chain
  carries the same arm, `copyrightOf()`'s rule; a typed head stops following the name and an
  emptied one stays empty. Under Lime and Grunge a refused box takes layout 2's 2px
  ring of full ink, and under Editorial — whose card and boxes are square, dashed 10, 10 and
  6, 6 in terracotta on the paper page — the dash gives way to a solid 2px ring of ink `s.tx`
  (colour, weight and dash at once). Under Pop the section is the white page with no band and
  the card a nested Scheme 2 node, so every card leaf reads `s.onScheme[2]` (the block's
  `card`, `s` itself under the twins): `box/1` `#D7FF23` in a 1px violet hairline, its boxes
  the same pills, its pill pink lettered and disced in Scheme 2's `sem/bg` lime — the block's
  own `pill()`, not `BookPill`, so the trap was `s.bg`'s white, not `pillBg`'s black — and a
  refusal is 2px of the card's own pink, layout 2's Pop call (colour and weight at once).
  Under Lime, Editorial and Pop the desktop
  head shrinks to fit its widest word in the half column (`vm.titleWordEms`, beside
  `navNameEms` and the header card's `vm.cardNameEms`, JP-062) rather than breaking inside it —
  Grunge's Anton at 0.75 set the old seed's UNFORGETTABLE.
  at 484 against the 501 column, so the key was measured and left out for Grunge here.
  Editorial's arm is Gloock's (`gloockEms` × `faceK`, `navFace`'s table), one table for this
  head at design 2 and its layout-1 statement (below), both set at Gloock's one weight, 400
  (`plans/editorial/display-face.md` step 3; Noto's 540 and Bold tables are gone). Pop's is
  Titan's (`titanEms` × `faceK`, `navFace`'s table), read by this head and by its layout-1
  statement, which fits the frame's fixed 313.43 box rather than its column. The old seed
  set at 100 under Lime and 70 under Editorial; the name-derived one fits at the ramp's 107 and
  97, and Pop's 67 (65.66 faced), so the fit bites only on a long word the artist types or a
  long one-word name.
  Two things in the branch are not the frame's: its `flex-[1_0_0]` halves are written as
  two `minmax(0, 1fr)` grid columns, because a zero flex-basis resolves against the
  *content* box whatever `box-sizing` says and the padded card came out 41 wider than the
  block beside it; and the card's stated `sticky` is dropped rather than written inert,
  since the frame's own `items-center` gives it nowhere to travel where layout 2's
  `alignSelf: stretch` made it real.
  **Layout 4 is the editorial band, and it shares the seam whole for the third time** —
  the same `vals`, `errs`, `sent`, `<a href="mailto:">` and *Write another*, so its whole
  live surface is four handlers and the only line outside the branch is one comment. It
  is a display head over a 4px mustard rule (1px of `s.stroke1` under Lime, 1px of
  `s.stroke2` under Grunge, 1px of `s.stroke2` dashed 10, 10 under Editorial, 1px of
  `s.stroke1` under Pop, which is full pink there), a small-caps
  line under it (`FIELDS.form.sub`, layout 4 alone, emptiable),
  and then two columns: the boxes over a mustard submit pill (pale `s.tx` under Lime, white
  under Grunge, ink under Editorial, violet under Pop), and the artist's steps numbered
  01 / 02 / 03 beside them. **Its head, that line and its pill seed the frame's own copy**
  (JP-054, user call, 2026-09-23; Retro's frame and Lime's agree, so no theme gate — Grunge's
  and Editorial's masters print the component's unoverridden "KAI MERCER" and keep the shared
  seed, a named diff and the user's call, JP-081's reply):
  `FORM_HEADING_4` "Contact Us" joins `HEADING_4`, `sub` defaults to `FORM_SUB_4` "Enquire"
  (the line printed `s.brand` until then), and `button` falls back to `FORM_BTN_4` "Check
  Availability" at this layout and "Book Now" at the others — each resolved in `sectionVm`
  **and** in `EditPanel`'s fallback chain. *(Since JP-089, user call, 2026-09-30: layout 1 under
  Lime, Grunge and Editorial falls back to `FORM_BTN_1` "Enquire", their frames' submit, where
  Retro's frame reads Book Now. `formBtnSeed(themeName, d)` in `data.js` is the one expression
  both callers use. Pop's frame reads Enquire too (964:58632), named beside `limeTreeTheme()`
  there until Pop's layout-4 sweep folded it inside. Layouts 2 and 3's `formCta` falls back to `button` only when its own `cta` is
  emptied, and `d` is 1 or 2 there, so it still reads Book Now.)* **So do its boxes** (JP-054 again, user call,
  2026-09-24, reversing the 2026-09-23 "the boxes stay the artist's one list"): with `fields`
  absent, layout 4 seeds `FORM_FIELDS_4`, the frame's five — Your name, Email, Event date,
  Event type, Location over its own placeholders, one `email` row so the guard holds, and the
  frame's Message being the `message` textarea — where layout 1 seeds `FORM_FIELDS`' four and
  layouts 2 and 3 their card's three, **`FORM_FIELDS_CARD`** (JP-070, user call, 2026-09-29):
  Event date, Event type, Your email, the email row last for the first time, which is safe
  because every reader finds it by `kind`. `sectionVm`'s `formList` gates on `d` and
  `formFieldsVal` on `design`, the seed-resolver rule. The gate is on the absent key alone,
  `FORM_BTN_4`'s: once the artist edits the list it is theirs at every layout. **Its steps
  are the frames' too** (JP-079 · JP-081, user call, 2026-09-29, reversing JP-054's "the steps
  stay one line"): `FIELDS.form.steps`, a repeater of `{ title, sub }` at layout 4 alone,
  seeded `FORM_STEPS` with all nine frames' three — Send your details / Date, type &
  location; I check availability / Reply within 24 hrs; Quote & confirm / Tailored package +
  price — each a title over a second line at the frame's gap of 2, each line drawn only when
  filled. The column numbered the one-line promises until then. Three things it does that no other layout here does. It draws
  a **label above a box *and* a placeholder inside it**, which is layout 1's pair and
  brings both `message` and the rows' `placeholder` column back after two layouts that
  spend their one slot on the label; a **trailing odd field runs the full measure** where
  layout 1 trails a half-width cell, the frame's own fifth box (the seed's Location) at all three widths
  (`vm.formRows` is unchanged — the pairing is the vm's and what a row of one does is the
  branch's); and it **reorders its two columns**, the form leading at 1440 and the
  steps leading at 768 and 390. Its steps are `vm.formSteps`, a blank row dropped before
  they are numbered in `sectionVm`, because this file pads nothing —
  and with none, the column is not drawn at all and the form takes the measure (the
  footer's empty-second-column rule). It draws no chip row, so `showTypes` stays
  `!!s.v0` and the mailto sends the bare `Enquiry` for the third time; `image`, `photo`
  and `para` reach none of it. Its boxes' outline and its step rules are **`vm.formRule`,
  which is `vm.tierRow.card`** — the pricing stack's own guarded walk, aliased in the
  form block rather than read across sections, because an outline standing on the page
  ground is exactly what that walk was written for. Under Lime none of that is read: the
  step rules are 1px of `s.stroke1`, the box ring is `s.ac`, and a refused box changes
  colour rather than weight alone — 2px of `s.tx`, since the idle ring is already lime. Grunge
  widens that block: the head rule and the box ring are 1px of `s.stroke2` (`#FF0000`, the
  box ring's binding on both templates, Lime's `stroke2` being its accent), and Lime's 2px of
  `s.tx` is white against the idle red, so the refusal needed no arm. Editorial widens it
  again with the frame's own dress: the head's rule is 1px of `s.stroke2` terracotta dashed
  10, 10 under a 42 pad; every box is an **underline** — paper, square, padded 12 / 0 so the
  placeholder stands on the label's edge, with a bottom-only 10, 10 terracotta dash (a
  `DashRule` on the field's column) — and a row's two boxes stand 44 apart; the step rules are
  1px of ink dashed 2, 2 and the step squares square; the submit is the ink `s.tx` pill with a
  paper label and disc. A refused box drops its dash for a solid 2px **ink underline** (`inset 0
  -2px 0`, layout 1's shape in layout 3's ink), colour, weight and dash at once, and never a
  ring, since the idle mark has one edge. Its head fits its widest word at every width, in its
  own div's `100cqi` — layout 3's desktop fit, and every layout-4 head's under Editorial.
  Pop widens it a fourth time with no dress of its own (Pop layout 4, section 9): every node
  binds Lime's key, so the mode swaps the values — a pink head over a 1px pink rule, violet
  labels and steps, white pill boxes in a 1px lime ring (`sem/stroke/2`, so `s.stroke2`,
  Grunge's arm, where Lime's block writes its own `s.ac`), pink step squares lettered white,
  the violet pill — and Display/Title is 28 / 22 / 20. Lime's refusal holds unchanged: 2px of
  violet `s.tx` against the idle 1px lime is colour and weight at once (the idle ring is thin,
  so the calendar's keep-the-idle-weight rule beside it does not apply), and the calendar's
  violet on the same page. The head fits its widest word in Titan, Editorial's fit widened;
  Titan lifts by token — the head 0.14em, ENQUIRE 0.1, the labels 0.08.
- **The chip row's label is the artist's** (JP-090, user call, 2026-09-30): `FIELDS.form.typeLabel`,
  *Event type label*, `in: [0]`, seeded `FORM_TYPE_LABEL` "Event type" beside `messageLabel`,
  and on its rule. The row it heads always stands, so `vm.formTypeLabel` reads the seed again
  when the field is emptied (trimmed, `FORM_EMAIL_LABEL`'s rule). It stays raw, and both bodies
  upper-case it in CSS. **It never reaches the mailto**: `enquiryMailto()` puts the picked chip
  in the subject (`Wedding enquiry`) and the body carries no row for it, so an edited or emptied
  label sends the same mail. The four live lines (`formPrompt`, `formSentTitle`, `formSentBody`,
  `formAgain`) and layout 4's `formStepsLabel` are still literals the view-model owns.
