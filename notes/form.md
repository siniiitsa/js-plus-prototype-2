# The enquiry form — working notes

> **Four layouts, named (2026-11-16, user call, every template).** The picker offered six rows for four designs;
> `CATS.form.n` is now 4 and the rows read *Classic form · Price & form · Simple form · Step by step*
> (`LAYOUT_NAMES` / `layoutLabel()` in `data.js`, shared by `LayoutPicker` and `makeVm`'s `layoutLabel`). A stored
> `arch` 4 / 5 (an in-session draft, a restored removed section, a harness `&arch=`) folds onto 1 / 2 through
> `pageLayout`, content untouched; nothing else moved.

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
- **Character caps** (`plans/char-limits.md`, session 10, 2026-10-13; the table and the readout are
  there). Every text key and both repeaters' columns carry a cap per template and layout.
  - **The heading is a display head**, held to its frame's lines though it is a textarea for layout
    2's typed break. At layout 3 its cap is a typed head's: a typed head replaces
    `formHeading3(name)` whole, and the composed line's copy of the name clamps apart, at
    `IDENTITY_CHARS.form.title`. The untouched box shows the composed seed with the real name, so a
    name 1–2 characters short of its own cap can turn the counter red over a head the page prints
    whole; flooring layout 3's cap at 20 + that cap is the user's call.
  - **`promises` is a `'\n'` list** (`list` on the field): each promise one line, 9 a column (6 at
    Editorial's layout 1, whose bottom-aligned column climbs into the head at 7). Its count is a
    block's, the package features' rule.
  - **`types` is a `','` list**: 15 a chip, 5 chips under Lime and Grunge and 8 elsewhere.
  - **`fields.placeholder` is uncapped at layouts 2 and 3**, which print no placeholder while a
    label is set; a box with an emptied label prints its placeholder there uncapped.
  - **The price row wraps by design** (`flexWrap: 'wrap'` in every block): price and unit are capped
    apart, and a long price drops the unit under it.
  - **The mailto heads an answer with the label as the page prints it**, clamped at a layout that
    shortens it, since `formMailto` reads the clamped `vm.formFields`. Left for the sweep.

## Inline editing (plans/inline-edit-all.md, Retro layout 2, 2026-10-21)

The sticky card's box follows the card as the canvas scrolls (`EncoreBuilder` re-places the box on the scroller's scroll;
measured at 1440 and 768, 60 and 120 px under a stuck card). The card's boxes print the *label*, so
`fields.placeholder` is ledgered (`Retro.1.form.fields.placeholder`): it prints only once the label is emptied, and the
ledger takes it out of the canvas whatever the label holds. `bookings` (`★★★★★  42 bookings`) is an `INLINE_PART` row.

## Inline editing (plans/inline-edit-all.md, Lime layout 2, 2026-10-21)

Lime's layout-2 card prints the uppercased label in each box and no placeholder (checked in the card's HTML), so
`Lime.1.form.fields.placeholder` is ledgered as Retro's is. The sticky card's box tracks a stuck card at 1440 and 768 (within 1 px at 0, +60
and +120 px of scroll). `bookings` is the `*.1.` part row.

## Inline editing (plans/inline-edit-all.md, Grunge layout 2, 2026-10-22)

Grunge's layout-2 card prints the uppercased label in each box and no placeholder (checked in the card's HTML), so
`Grunge.1.form.fields.placeholder` is ledgered as Lime's is. The sticky card's box sits exactly on the node at 1440 and 768 at 0, +60 and
+120 px of scroll, and follows the card's release at the row's foot. `bookings` is the `*.1.` part row.

## Inline editing (plans/inline-edit-all.md, Pop layout 2, 2026-10-22)

The sticky card's box follows it on Pop's blue band as on the other templates (0 px at every scroll step, 1440 and 768). `fields.placeholder` is ledgered
(`Pop.1.form.fields.placeholder`): the layout-2 card prints the uppercased label, no `input` stands in the section on the canvas, and the 80% `--ph` is layout 1's.

## Inline editing (plans/inline-edit-all.md, Retro layout 3, 2026-10-22)

Layout 3's `bookings` is printed `★★★★★ 42 bookings` (a `*.2.` part row); `fields.placeholder` is ledgered (`Retro.2.form.fields.placeholder`, the label is what
the boxes print) as at layout 2.

## Inline editing (plans/inline-edit-all.md, Lime layout 3, 2026-10-22)

`bookings` is the `*.2.` part row (`★★★★★ 42 bookings`); `fields.placeholder` is ledgered (`Lime.2.form.fields.placeholder`: the boxes print the uppercased label).

## Inline editing (plans/inline-edit-all.md, Retro layout 4, 2026-10-22)

`steps` has its first proof here: the three `title` / `sub` pairs are six slots, hit at both widths, and Escape restores `c.steps` (`FORM_STEPS` and the panel's `stepsVal` resolve alike). The numerals (`01`–`03`) and arrows are literal. `fields.placeholder` hits (layout 4 prints the placeholders in its boxes).

## Date boxes (2026-11-06)

A row's `kind` is `text`, `email`, `number` or **`date`** (`FORM_KINDS`); the three seeded `Event date` rows (`FORM_FIELDS`, `_4`, `_CARD`) are `date`. A date box is a masked text input, never `type="date"` (the native picker cannot be styled onto the panels): `EnquiryForm`'s `setAt` runs `maskDate()` (a module-local helper in `EncoreSection`, which imports nothing from `data.js`), so only digits are kept and the slashes are put in as they type, `dd/mm/yyyy`; `inputMode` is `numeric`. `formErrors(fields, vals, today)` refuses a date row that is empty, is not a real day (`parseDayFirst`), or, once `today` is known (published tab only, `vm.formCheck` passes `sectionVm`'s), is before today. The marked box is the generic one and carries `aria-invalid`; `formErrors` also returns `m[]`, a message for a date row (*Type the date as dd / mm / yyyy.*, *That date has already passed.*), and the form's prompt line prints the first one in place of the generic prompt (2026-11-11, QA: `99/99/9999` showed no reason). A year below 1900 is not a date (`MIN_YEAR`: `Date.UTC` reads 0–99 as 1900–1999). The wizard's date is unchanged (not gated). The placeholder keeps the frames' `dd / mm / yyyy`. The calendar wizard's `Approx. date` box is masked by the same helper (`setBox`).

## Validation before the handoff (QA, 2026-11-13 / 15)

The form used to compose its mailto href on every render and only refuse on the click, so the link payload
carried whatever was typed (`QA123`, `bad-email`, a past date, `0` guests) and no control reported a validity.
Now **no href exists until every box the layout shows passes `formCheck`**, which is `enquiryErrors()` in
`data.js` (the calendar wizard's `vm.calCheck` keeps the older `formErrors()`, unchanged).

- **Rules.** Required: the **name** (a row of the new `name` kind, seeded as layout 1's *Name* and layout 4's
  *Your name*; `nameProblem()`: trimmed, a letter, no `\p{N}` in any script, so accents, spaces, `'`, `’`, `-` pass),
  the **email** (`emailProblem()` and no internal whitespace) and the **message** where the layout draws one
  (`vm.formNeedsMsg`, layouts 1 and 4; whitespace alone is empty). Optional, checked only when typed: a
  **`number`** row (`countProblem()`: digits only, at least 1, so `0`, `-1`, `1.5` and text fail) and a **`date`**
  row (a real dd/mm/yyyy day, not before `today`; `today` is the published tab's and Preview's clock, never the canvas).
  A blank or whitespace-only optional box is omitted. This reverses the old "every box is required".
- **The pill.** Valid: `<a href="mailto:…">`, the click sets `sent`. Invalid but addressed: the same `<a>` with
  **no href**, `role="button"` and `tabIndex=0`; click, Enter and Space all run `refuse()`: the errors are set,
  the first refused control (`verdict.first`, a row index or `'msg'`) takes focus through the `ctls` ref map (set in
  the handler, no effect), and every entry stays. Unaddressed (no recipient): the inert span, as before. Still no `<form>`.
- **Per control.** `cp(key)` spreads `ref`, `aria-describedby` (the prompt line, which is `role="alert"` and carries
  the first refused control's own message: *Enter your name…*, *Enter a valid email address.*, *Enter a whole number,
  1 or more.*, the date messages, *Write a short message.*) and calls `setCustomValidity` with the current verdict,
  so `input.validity` agrees with what the page says. The message box takes the layout's refused ring (`msgBad`).
  A fresh callback ref each render is what keeps the custom message following the box's value.
- **Probe.** `scripts/page-check.mjs` types valid data per kind; reading the href before the form is valid now
  gives nothing. All 20 template × layout pages were driven at Desktop, Tablet and Mobile with the QA cases
  (invalid blocks and focuses, valid hands off trimmed, guests / dates / spaces-only edge cases).

## Lattice — layout 1 (plans/lattice/layout-1.md, section 9, 2026-11-19)

`LatticeForm` (`EncoreSection.jsx`, dispatched in `EnquiryForm` on `s.v0 && s.limeTree && s.lattice` **after** the seam, ahead of Lime's block). Frames `1:1147` · `1:9778` ·
`1:10748` (1440 x 689 / 768 x 990 / 390 x 1230). A block of its own, not Lime's *Split context + form* nor its widenings: the inventory is Lime's, no leaf is (the verdict is in the plan's
*Seen at planning time*). Everything the seam resolves goes over in one object `g` — `at`, `setAt`, `msg`, `setMessage`, `ti`, `setType`, `showTypes`, `errs`, `msgBad`, `sent`, `setSent`, `Pill`,
`pillLink`, `onSubmit`, `cp`, `pid` — so the boxes, the chip, the mailto, the refusal and the sent state are the one seam in a new picture. **No `<form>`, and the chip still starts at 0** (the frame
draws *Wedding* lit, so rule and frame agree). The block owns no hook.

- **The card** is one 1px, 20-radius box on the section's own Scheme 8 ground (`#111`, ink `#F2F2F2`; no other scheme: the lit chip and the bar bind the page's `sem/bg` over `#111` text, which is
  `s.tx` over `s.bg`). Desktop: the context panel is a fixed 485 (x .82) of `s.box1` (`#1B1B1B`), the form half is *unfilled*, so the root's glow shows through. 768 and 390: the panel stacks on top at the
  card's full width. `vm.pad` (`EncoreBuilder.jsx`, after the calendar's arm): 78.72 / 77 / 58 top and foot with the content insets (40.15 / 26.11 / 24), the frames' own (card 496.55 / 835.72 /
  1114.11 tall in sections 689 / 990 / 1230).
- **The glow is the root's own `radial-gradient`** (`s.fo && s.v0 && s.lattice` in the root style): `ellipse 60% x 55% at 20% / 50%`, `s.text3` (the orange) 14% to 0 at 70%, which all three masters'
  `gradientTransform`s reduce to. No `url()` and no node, so `limits.mjs` counts no picture.
- **The context panel** pads 32 (27 / 24 at 768, 22 / 16 at 390), 28 between blocks. The avatar row: a 44 square at radius 3 (the form's `image`, `SEEDS.Lattice` seats `lattice-alt`), the name
  (`s.brand`, mono 12) over the role line (`s.kicker`, mono 11, orange), 4 apart; each drops when empty. The head is `Archivo Lattice` 40 / 32 / 26 at line 1, uppercase, in the frame's 419 measure at
  1440 and the column narrow, fitted to its widest word by `vm.titleWordEms` (`form` joins the Lattice list in `sectionVm`). The promises are a **ruled list** (a 1px top rule, each row 14 / 14 with a 1px
  rule under it): an orange `01 / 02 / 03` numeral (a count derived from the row's place, not a field) and the promise in mono 12. The list is the render's 382.688 (x .82) at 1440, where the avatar row and
  the list stop short of the panel's padding (the masters' own boxes), and the column narrow.
- **The boxes** are 48-tall 3px boxes in a 1px ring of full ink over an orange mono label (11, 8 above); text Archivo 16. Pairs are two to a row (`vm.formRows`) with an 18 column gap at 1440 and 768,
  and stacked at 390 with 28 between everything; the rows are 16 / 18 / 28 apart. The canvas draws the placeholder as a span at the ink's 45%, which is what `::placeholder` draws live (index.css) and the
  frame's `#757575` on `#111`, so no `--ph` and no literal. **A refused box** changes colour as well as weight (the idle ring is already full ink): its ring and a 1px inset of the label's orange, 2px in
  all, so the 48 holds. The prompt line (`role="alert"`, `id={pid}`) prints in the same orange.
- **The chip row**: the legend is a 26-tall box over a 13.2 line (so the chips stand 34 under its top, not 21), the chips 44-tall 3px boxes in a 1px ring with 14 padding, 6 apart, wrapping at 390 with
  the lit one filled ink. **The frames' fieldset box is 8 short of its content at 768 and 390**, so the message label stands 10 and 20 under the chips there (16 at 1440, where the box is whole); the block
  follows the render with a `-8` bottom margin narrow. The message box is 81 tall at every width (padding 14 / 16).
- **The submit** is a plain full-width square bar (ink ground, `s.bg` label, mono 12 `BOOK NOW` and `→` in its own span), **48 tall at every width**: the 1440 master's 50 is its content running 2 past the
  card's clipped foot (the card is 496.55 = 2 + 494.55). It is the seam's `Pill`, so it is the `<a href="mailto:">`, the `role="button"` refusal or the inert span; *Write another* is the same bar.
- **No eyebrow.** None of the three masters draws a `[ 00N ]` line anywhere (the context panel opens on the avatar). `typeLabel` and `messageLabel` seat only *EVENT TYPE* and *MESSAGE*, and the section is
  not shorter for it. `formBtnSeed` seeds *Book Now* at Lattice (`limeTreeTheme` excludes it) and the frame agrees.

**Calls for the user to confirm.**
1. **The placeholders print as seeded**, `dd / mm / yyyy` and `approx.`, where the frame types `DD / MM / YYYY` and `Approx.`: a difference of case. A Lattice-only seed would need `FORM_FIELDS` forked and
   `EditPanel`'s `formFieldsVal` mirrored; not done.
2. **The role line prints the header's kicker** (`DJ · Live Act`), where the frame types `DJ · LIVE BAND`: the artist's copy, `IDENTITY_READS.kicker.form` read `[0, 1]` already.
3. **The list's rules stop short** (382.688 at 1440) as the render draws them, and the head sets in 419, although the panel's content box is 421; stacked they take the column.
4. **The 10 and 20 under the chips** at 768 and 390 follow the render, not the frames' 16 gap; the row looks tight at 768.
5. **A refused box is 2px of orange**, a call: no palette has a red.
6. **`button` is capped at 35** (measured), where the shared 15 is Retro's and Lime's pill; the bar has nothing to crowd.

**Fields and caps** (`limits.mjs form --themes=5 --designs=0`, then `--check`: 0 fail; `--seeds`: 0 over). Each has an explicit `Lattice` row, layouts 2-4 copied from Pop's (unmeasured): `heading` **37** (37 / 56 /
44), `fields.label` **40** (50 / 42 / 40), `fields.placeholder` **36** (47 / 39 / 36), `typeLabel` **40**, `messageLabel` **40**, `message` **39** (110 / 92 / 39), `button` **35**, `promises` chars **33** (the 390 row wraps past it) and
count 9 (16 measured, open), `types` count 8 (the chip row: 10 / 9 / 8), `IDENTITY_CHARS.form.title` **59** and `kicker` **33**. `fields` has no item-chars row, and `types` measured 38 a chip but is held to the shared 15. Still Pop's, unmeasured: `sub` and `steps` (layout 4), `para`, and layouts 2-4 of every other row. `FIELDS.form` `in` rows are all arrays, so no row
names a template; `image` reaches layouts 1 and 2 as before (`photo` is layout 2's), so `PHOTO_OFF` needs no row. No `INLINE_OFF` row: `inline-probe` reports 0 UNLEDGERED.

## Paperback — layout 1 (plans/paperback/layout-1.md, section 9, 2026-11-21)

`PaperbackForm` (`EncoreSection.jsx`, dispatched in `EnquiryForm` on `s.v0 && s.limeTree && s.paperback`, after the seam and ahead of Lattice's block). Frames `1:3269` · `1:11931` · `1:13112`
(687 / 898 / 1193 tall). Layouts 2–4 are still the placeholders. Everything the live seam owns (boxes, date mask, chip at 0, refusal, `role="alert"` line, mailto submit, sent state) goes over in `g`;
the block is only a new picture, and `PaperbackPill` took `as` / `tagProps` so the submit is the shared pill as the seam's `Pill`.

- **Stage**: `PAPER_FORM` holds the frame numbers per width, `u(v)` in `cqw`, `vm.pad = '0px <surplus>'` (`form` joins the Paperback pad condition in `EncoreBuilder.jsx`). At 1440 the card is two halves,
  an indigo panel (Scheme 3, 447.34 wide) and an orange form (Scheme 4, 894.72); narrow it stacks. The card clips (`overflow: hidden`) its blob art (`blobIndigo`).
- **The panel**: a 58 avatar with a 3px white ring (the form's `image`), the name over the role line, a Bricolage 800 head 52 / 42 / 34 and the promises (a 24 yellow disc with a ✓, Figtree 600 16).
  The head is fitted to its widest word by `vm.titleWordEms` (`form` joins the Paperback list) times `fit`, set on the **container's** font-size and read as `min(1em, calc(100cqi / ems))` on the h2, because a
  `cqw` inside a nested container resolves against that container. **`fit` is 1.12 at every width**: the table is read at 1000px, where the face sets narrowest; a word shrunk to 20–52px sets 7–12% wider
  (measured on five words: 1.068 at 52, 1.083 at 42, 1.096 at 34, 1.117 at 20). A per-width 1.07 / 1.078 / 1.09 broke a 34-letter word mid-word at 390.
- **The form half**: 52-tall boxes (2px ink border, radius 8, white), pairs 16 apart at 1440 and 768, one column at 390 (28 apart). A refused box takes the pink `s.ac` border and a 2px inset pink.
  The chip row is 44 tall, lit ink under white; the message box is 89 tall at radius 24; Book Now is the ink pill. **A placeholder draws at `--ph: 0.565`** (the frame's ink at that tint on white); the canvas spans use the same opacity.
- **The chat bubble** is a yellow disc with a 3px ink ring, tilted `rotate(8deg)` (clockwise, checked on a 4× export), seated off the panel/form seam by `bubble: [disc, art, right, top]`.
- **The sent state** holds the card's height (`sentH`, 443.39 / 443.39 / 746.97) so the page below does not jump; *Write another* keeps the typed values and the chip.
- **Caps** (measured 2026-11-21, `limits.mjs form --themes=6 --designs=0 --upright`, `--check` and `--seeds` clean): heading 41 (the 1440 measure's fourth line), fields.label 45, placeholder 34, types 6 chips of 15,
  promises 5 rows of 29 (the seed is the floor; one line at 390 holds 20), message 37, `typeLabel` / `messageLabel` 45, button 34; identity: title 60, kicker 37.
- **Ledgers**: `Paperback.1.form.fields.placeholder` and `.2.` in `INLINE_OFF` (layouts 2 and 3 are Pop's placeholder cards: the label sits in the box). Layout 1 passes whole (inline-probe 21 slots, photo-probe 1 slot
  plus `--blank` and `--drop`, focus-probe 27 controls); the photo is the avatar. Digest themes 0–6 at three widths: only theme 6 form layout 1 moved.

## Paperback layouts 2–4: the caps (session 12, 2026-11-21, plans/paperback/layout-1.md)

- Layouts 2–4 are still Lime's / Pop's tree in Paperback's tokens. Every cap now has a `Paperback` row (none reads Pop's through `specAt`), measured by `limits.mjs form --themes=6 --designs=1,2,3 --upright`, then `--check` (0 failing) and `--seeds` (0 over). **The rule is lower-only and never under the seed:** a number the placeholder card cannot bear came down to what it bears, and one that bore more was left, so no cap rose. Lowered (layouts 2, 3, 4, an index per layout; `–` not read): `heading` [40,30,17] → [36,30,17]; `promises` [34,–,–] → [29,–,–]; `sub` [–,–,30] → [–,–,23]; `steps.title` [–,–,41] → [–,–,34]; `fields.placeholder` [–,–,24] → [–,–,20]; `steps.sub` [–,–,44] → [–,–,41]; `fields.label` [33,40,19] → [27,30,15]; `messageLabel` [–,–,41] → [–,–,33]; `message` [–,–,54] → [–,–,44]; `button` [–,–,36] → [–,–,31]; `price` [22,26,–] → [20,24,–]; `priceUnit` [47,54,–] → [45,52,–]; `bookings` [36,42,–] → [34,40,–]; `note` [47,54,–] → [45,52,–]; `available` [–,61,–] → [–,54,–]; `title` [54,11,–] → [32,11,–].
- **Rough edges (the seed is wider than the card holds a prose line of its length):** `heading` L2 (36, 31), `promises` L2 (29, 28). The cap holds at the seed, `--check` reads it as `(floor)`, and the card draws the seed as it does at the other templates. A layout-2–4 pass with frames replaces all of these.

## Headliner — layout 1 (plans/headliner/layout-1.md, section 9, 2026-11-24)

`HeadlinerForm` (`EncoreSection.jsx`, before `EnquiryForm`; dispatched there on `s.v0 && s.limeTree && s.headliner` after the seam and ahead of Paperback's). Frames `1:5385` · `1:16159` · `1:17207`
(714.05 / 1066.11 / 1309.13 tall). Everything the live seam owns (the typed boxes, the date mask, the chip at 0, the refusal, the `role="alert"` line, the mailto submit, the sent state) goes over in `g`,
the same object as Lattice's and Paperback's; the block owns no hook and there is no `<form>`.

- **Stage**: `HEADLINER_FORM` holds each width's numbers, `u(v)` in `cqw`, `vm.pad = '0px <surplus>'` (`form` joins the Headliner line in `EncoreBuilder.jsx`). **One flat square card** 48.96 / 26.11 / 24 in from the
  edges of the cream page (Scheme 2, the section's own seat: no `cardOnPage`), nothing centred in a taller box (96 / 76.99 / 58 round it). A grid: the panel `447.344` then the rest at 1440, a single column narrow.
  Sections measure 713.9 / 1066.0 / 1308.9 (frames 714.05 / 1066.11 / 1309.13); every box within 0.5 (the canvas draws 1 px rules unscaled: a 1 px border is 1.22 frame px at 1440).
- **The panel** (maroon, `s.onScheme[3].bg`): a 52 square photograph (the form's `image`; an unset one draws the initials on `O[3].box1`) beside the name (Anton 16, sand) over the role (Anton 13, amber), 14 apart, 4 between the lines;
  the head (Anton 64 / 48 / 38, lh .98, -0.005em, orange, 26 under the avatar row); the list (three 45-tall rows on `HL_HAIR`, an Inter Tight 16 `#f4f4f4` promise and an Anton 14 amber numeral derived from the row's place,
  the list's foot rule closing it). **At 1440 the panel is stretched to the form half and the list is foot-anchored** (`marginTop: auto` over a 26 padding, the frame's `List:align`); narrow it is its own height.
- **The head wraps at the content box by measure and is not forced**: `LET'S MAKE / YOUR NIGHT / UNFORGETTABLE.` at 1440 (the last word overhangs the 367.344 box by about 11 into the panel's padding, as the frame's
  381-wide text node does, so the h2 sets `overflow-wrap: normal` against the section's `anywhere`), two lines at 768 and three at 390. It is fitted to its widest word against `room` (393.344 / 655.766 / 302, content plus
  the 1440 overhang) with `vm.titleWordEms` = `antonEms(w, -0.005)` (`form` joins the Headliner line in `sectionVm`): a longer word shrinks the type (a 37-letter word sets 19.9 / 40.5 / 18.6 px) instead of breaking.
- **The boxes** are 50-tall 1 px `#1E1E1E` squares on cream (`O[2].bg`), padding 14, an Anton 14 label 8 above at lh 14.6875; two to a row on a 20 gap at 1440 and 768 and one column at 390, the blocks 18 apart (28 at 390).
  **A refused box changes colour as well as weight**: the ring and a 1 px inset in the panel's maroon (2 px in all, the 50 held); the prompt line is Anton 14 in the same maroon. The event-type chips are 40-tall 1 px pills
  (Anton 14, padding 16, 6 apart, wrapping: `Other` takes a second row at 390), the lit one `#1E1E1E` under sand; the message box is 90 tall; **the submit is `HeadlinerPill` with `as={Pill}` and `tagProps`**
  (new props: the seam's `<a href="mailto:">`, refusing `role="button"` or inert span, in the pill's own 46-tall box; the other callers are unchanged).
- **The sent state** swaps the form half alone and holds its height (`sentH` 442.05 / 442.05 / 729.44, the frames' content heights; measured 585.08 against 585.02 at 1440, 1066.03 / 1309.03 narrow), an Anton head over two
  Inter Tight lines and the address in plain text, then *Write another* (the orange pill); it keeps the typed values and the chip.
- **Not drawn** (no removal is owed: the frame prints no eyebrow, script or ring text): no wave field, no bubble, no radius, no shadow. The frame's `KAI MERCER` / `DJ · LIVE BAND` are `vm.brand` and `vm.kicker`.
- **Caps** (2026-11-24, `limits.mjs form --themes=7 --designs=0`, then `--check` and `--seeds`: 0 failing, 0 over): `heading` **36** (the seed, a floor: the probe reads 31 at 1440, a fourth line, 61 / 46 narrow; a 32-36
  character head sets four lines at 1440 and the card absorbs it, the panel and the half growing together), `fields.label` 48, `fields.placeholder` 39, `typeLabel` / `messageLabel` 48, `message` 41, `button` 39, `promises[]` 39 (9 rows, 16
  measured, open), `types` 8 chips of the shared 15, identity `title` 33 and `kicker` 40. Layouts 2-4 are Grunge's rows, written out (`heading` `[36, 40, 41, 25]`, `fields.label` `[.., 62, 76, 30]`, `messageLabel` `[.., 64]`).
  **`in` rows unchanged** (`reach.mjs 7`: `button` and `messageLabel` layouts 1 and 4, `promises` 1 and 2, `typeLabel` 1, `steps` and `sub` 4; `who.kicker` reads the form at 1 and 2). `FIELDS.form.image`'s hint is now an
  object (the Headliner photograph is square).
- **Ledgers**: none (`INLINE_OFF` and `PHOTO_OFF` gain no row). `inline-probe`, layout 1 at 1440 and 768: PASS (21 slots hit, 5 unhit: the name, the role and the three numerals, which are no slot); `photo-probe`
  `--check`, `--blank` and `--drop`: PASS (the avatar, 1 slot); `focus-probe --prime --check`: PASS (27 controls, 0 failing, both widths).
- **Placeholders draw at the global .45**, where the frame's `#757575` on cream is about .59 of the ink (the repertoire's search, section 5): `--ph` is the user's call.
- **Seeds are the shared ones**: `Book Now` (the frame's `Book now`), the head `Let's make your night unforgettable.`, the three promises, the five chips and `Message` / `Event type` match the frame's words. The placeholders print
  as seeded, `dd / mm / yyyy` and `approx.`, where the frame types `DD / MM / YYYY` and `Approx.` (Lattice's call: a Headliner-only seed would fork `FORM_FIELDS` and `formFieldsVal`).

