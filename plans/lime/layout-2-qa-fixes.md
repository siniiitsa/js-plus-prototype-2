# Lime layout 2 QA fixes — bug-by-bug plan

Working checklist for a batch of QA reports against the **Lime template, layout 2** (card 2 of the
setup modal). It works like [`../retro/qa-fixes.md`](../retro/qa-fixes.md): **one entry per
session, with context cleared between sessions**, and each session writes what it settled back
into this file. Nothing here is a fit. Each entry is a behaviour or editor defect, and the fix has
to leave every fitted picture unchanged unless the entry says otherwise.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then *How each
session runs* and *Verification harness* in `../retro/qa-fixes.md` (the harness it built —
`&cj=`, `&today=`, `&who=` — is what these sessions drive), then the memory notes
`verifying-the-published-tab` and `browser-tool-choice`. [`layout-2.md`](./layout-2.md) holds the
Figma node ids of every layout-2 frame; read it only where an entry sends you to a frame.

Branch: **`lime-layout-2-qa-fixes`, forked from `main`** (`476f5c7`). One commit per entry
(`Fix JP-042: …`).

**The triage was taken on a stale `main` (`7e15144`), one merge short.** PR #24 — the layout-1
pass, [`qa-fixes.md`](./qa-fixes.md), which owns the `lime-qa-fixes` branch name — had already
landed on `origin/main`. Session 1 fast-forwarded, renamed this file and its branch, and checked
JP-042's evidence against the new tree. **JP-033 + JP-041 must be re-triaged in its own session**:
PR #24 shipped `navLabel()` (`data.js`, the `nav` word per category, seeding `FOOTER_LINKS` too),
which is that entry's option A for the header. What is left is whatever the tester still sees on
the new build, and `vm.calFlow`. Every other entry's line numbers are 7e15144's and drift by
PR #24's diff as well as the usual.

**Report IDs are the tester's own** (JP-033 …). The gaps (034, 035) were not handed over, so do
not renumber. The tester's two lists (UI, editing) are merged here; JP-036 appeared in both and
is one entry.

## Status

| Order | ID | Report (short) | Verdict | Size | Decision needed? | Status |
|---|---|---|---|---|---|---|
| 1 | JP-042 | Two help texts lie: header Location's hint, the form-fields counter | **Confirmed** | S | no | **done** (four texts, not two) |
| 2 | JP-036 | Pricing's *Plan card button* / *Line beside…* edit nothing; card prints BOOK NOW | **Confirmed**: F2 named it as an edge and did not chase it | S | none — the frame answered it | **done** |
| 3 | JP-037 | Four drawn elements have no field: hero CTA, bio credit line, bio pill, bio chips | **Confirmed**, and two of the four are Retro's too | M | **yes** (three) — A, A, A, five chips | **done** |
| 4 | JP-033 + JP-041 | Header nav and the calendar card's links print section *type* names | **Re-triaged**: PR #24 closed the labels and JP-041; the count survived | S | **yes** — Minimal is the frame's Music / Gigs / About; default stays `sections`; JP-041 held | **done** |
| 5 | JP-039 | 768 header is a burger; the frame draws the links | **Documented as intended**; the tester's Minimal control undercuts the documented reason | M | **yes** — A, fit-gated; layouts 2 + 3, both templates | **done** |
| 6 | JP-038 | Desktop side gutter 189px vs the frame's ~55 | **By construction, not a padding bug** — see entry; the constant 189 did not reproduce (114–429 measured), no stale-width bug | S | **yes** — A, by design | **done** (README bullet + `scripts/gutter.mjs`, no app code) |
| 7 | JP-040 | Events Map layout 2 draws none of In transit / ring labels / EXPAND VIEW / Updated 2m ago | **Documented drop**; a BA/PO question, as the tester says | S–M | **blocked on PO** | todo |
| 8 | — | End-of-pass sweep | — | S | — | todo |

**Why this order:** the two text-only editor fixes first (042, 036). JP-037 before JP-033 because
both add header-adjacent fields and 037's are the simpler shape. JP-033+041 before JP-039 because
whether three links fit at 768 depends on what the labels *are*. JP-038 is late because its first
step is agreeing what the bug is, and JP-040 last because it cannot start without an answer from
outside the session.

**"Decision needed"** means the entry lists options with a recommendation. The session starts by
asking the user (one `AskUserQuestion`) and records the answer under **Decision** before writing
code.

## How each session runs

As `../retro/qa-fixes.md`, with these differences:

1. Re-check the *Evidence* line numbers; they are from the triage (2026-09-21, `7e15144` — see the note under *Branch*) and
   will drift.
2. **Lime first, but not Lime only.** Layout 2 is the shared `s.v1` branches with `s.lime` blocks
   inside them, and several of these defects live in Retro's half of the same branch (JP-037's
   bio line is hardcoded at both `:3264` and `:3433`; JP-033, JP-041 and JP-042 are in
   `sectionVm` / `data.js` and reach every template). Fix both halves, check Retro (theme 0) and
   one flat theme (theme 2), and say in the commit which moved.
3. Verify at **all three widths** and on **both surfaces** (canvas and `live=1`) wherever the
   entry touches `EncoreSection` or `sectionVm`; digest before and after
   (`scripts/digest.mjs`, themes `0,1,2`). A chrome-only change must be byte-identical.
4. **A new or re-scoped field gets a measured `in`** — type into it and watch the section's HTML
   (CLAUDE.md, the `FIELDS` bullet). The probe is `source/scripts/reach.mjs` (JP-037): add a row
   to its `PROBES`, do not rebuild it.
5. Update the docs the entry names. Commit, fill in **Settled** and the status row, then print
   the hand-off prompt for the next entry and stop.

**Do not refresh the root `index.html` per bug.** The sweep does it once.

---

## JP-042 — the editor describes its own output wrongly, twice

> Header → Location: the help says "The bio and the booking calendar print it too" — 1 hit in the
> header, 1 in the bio, 0 in the booking calendar. Enquiry Form → Form fields: the field's help
> says "one to a row in layouts 2 and 3", the counter under the list says "two to a row on the
> published page"; it renders one to a row.

Per the 2026-09-18 ruling, help text is the spec where there is no AC, so these are spec errors.

**Verdict: confirmed, both.**

**Evidence.**
- `data.js:852` — Location's hint is unconditional, but F1 gave `location` to calendar
  **layouts 1 and 4 only** (the polaroid stamp, the summary card; CLAUDE.md, *The artist's role
  and town*). Layout 2's slot list and layout 3 print neither. `data.js:846` (Kicker: "The bio
  and the enquiry form print it too") has the same shape — measure it the same way before
  assuming it is right at every form layout.
- `EncoreBuilder.jsx:2515` — `FormFieldsField`'s counter says "two to a row on the published
  page" whatever the design, contradicting `data.js:1101`, which has it right (two in layouts 1
  and 4, one in 2 and 3). The component comment at `:2418` repeats the claim.

**Fix.**
- Hints: name the layouts ("The bio prints it too, and the booking calendar in layouts 1 and
  4."). **Measure first** (F2's probe: a sentinel in `&who=` / the header's `c`, diff the bio,
  calendar and form HTML at designs 0–3, Retro and Lime) — the bio's reach may also be partial,
  and the hint must say what the probe says, not what this entry guesses.
- Counter: `EditPanel` already has `design`; pass it to `FormFieldsField` and print "two to a
  row" only for designs 0 and 3, "one to a row" for 1 and 2 — or drop the clause and let the
  field hint carry it. Prefer passing `design`: the counter sits where the artist is looking.
- Sweep for the class: grep `FIELDS` hints for "too", "also", "published page" and any layout
  number, and check each against the probe. This entry fixes what the sweep finds, not only the
  two reported.

**Verify.** Editor, Lime and Retro × setup cards 1–4: open Header and Enquiry Form, read the
hint and the counter against the canvas. Digest byte-identical (chrome only).

**Docs.** The `FIELDS.header` comment above `kicker` (`data.js:~842`), `FormFieldsField`'s
comment.

**Settled** (2026-09-21).
- **Housekeeping first.** The triage's `main` was one merge stale; see the note under *Branch*.
  JP-042's evidence held on the new tree (`data.js:869/875/1135`, `EncoreBuilder.jsx:2526`).
- **The identity reach, measured** (a sentinel in `&who=`; every non-header category × designs
  0–3 × themes 0, 1, 2 × three widths × canvas and `live=1`, 666 renders; a hit is all six
  renders of a design or none, never partial). **JP-037 extends `headerIdentity` and should
  rerun this, not re-derive it.**

  | | bio | calendar | form | every other section |
  |---|---|---|---|---|
  | `kicker` | layouts 1–4 | — | layouts 1, 2 (the credit row) | — |
  | `location` | layouts 1–3 | layouts 1, 4 — **Lime: 4 only** | — | — |

  Retro and Grunge agree everywhere. Lime's calendar layout 1 is its own block
  (`if (s.lime)` inside `v0`) and draws no polaroid stamp, which is a fit, not a defect
  (`layout-1.md`, the calendar's Settled: "None of Retro's `nav` / `cell` / `dayName` / `print` /
  `stack` is read").
  So **both** hints were wrong, the Kicker's too: the form prints it in two layouts of four.
- **The hints say the table.** Kicker: "The bio prints it too, and the enquiry form in layouts
  1 and 2." Location: "The bio prints it too in layouts 1 to 3, and the booking calendar in
  layouts 1 and 4 (in Lime, layout 4 only)." Hints stay plain strings; no per-template hint
  mechanism was built for one parenthesis.
- **The counter, and what the probe added.** Counting `<input>` tops under `live=1` with four
  boxes: layouts 1 and 4 pair, 2 and 3 stack, **and layout 1 stacks at 390** — deliberate, both
  halves' `fieldRow` comments say the 390 master stacks the pair. `FormFieldsField` takes
  `design` and prints "two to a row on the published page, one on a phone" (layout 1), "two to
  a row…" (4), "one to a row…" (2, 3). The field hint gained "(layout 1 stacks them on a
  phone)".
- **The sweep found one more of the class: `GigsField`'s footnote** said "5 to a page" whatever
  the design. Measured with `&n=8`: 5 / 5 / 5 in layouts 1 and 2, **5 / 5 / 1 in layout 3**,
  1 / 1 / 1 in layout 4. It takes `design` too — "5 to a page", "…, one on a phone", "one at a
  time" — and the `gigs` hint gained layout 3's phone. Every other hint naming a layout, a
  template or another surface was checked against its measured `in` (F2's) or probed
  (`tiers` tags / feats / `unit`, `songs` tags, `quotes` `when` / `role`, form `placeholder`):
  all true. The Quotes, Links and Tracks footnotes are true at every design.
- **Verified in the real app** (puppeteer, 1600 wide): Retro and Lime × setup cards 1–4 ×
  Header, Enquiry Form, Events Map; the two hints and both footnotes read as the tables say on
  all eight pages. **Cards are picked by index over `/ABOUT TOP TRACKS/`** — only cards 1 and 4
  lead with `KAI MERCER`, so the earlier pass's `^KAI MERCER` finds two of four.
- **Digest** (all categories, themes 0, 1, 2, three widths, canvas and `live=1`, 774 files):
  **byte-identical**. Chrome only; no template moved.
- **Docs:** the `FIELDS.header` comment above `kicker` (it now carries the reach and "change a
  reader, change the hint"), `FormFieldsField`'s and `GigsField`'s comments, and CLAUDE.md's
  *role and town* paragraph (Lime's layout-1 calendar draws no stamp).

---

## JP-036 — Pricing's plan-card button and its line edit nothing; the card prints BOOK NOW

> *Plan card button* ("Enquire about a date") and *Line beside the plan card button* ("3 dates
> open for Sept '26") are filled by default, marked "Not shown in this layout", and render in
> none of the 8 pricing layouts. Emptying them does not remove the hardcoded BOOK NOW.

**Verdict: confirmed under Lime; Retro is fine.** `PRICING_CARD = { Lime: [], '*': [1] }`
(`data.js:823`), so under Lime both fields are dead at every layout — F2's Settled recorded
exactly this ("Lime's pricing layout 2 is its own composition and draws none of `images` /
`reviews` / `rating` / `cta` / `note`") and named the label edge as *not chased*. The tester is
right that "not shown in this layout" undersells it: under Lime they are shown in **no** layout.

**Evidence.**
- Retro's layout 2 reads them: `EncoreSection.jsx:7526-7541` (`s.pricingCta`, `s.pricingNote`,
  each dropped when emptied).
- Lime's layout-2 block (`:7204`) draws `<BookPill s={s} to={s.tierBookTo} full={s.mob} />` at
  `:7312` with **no label**, and `BookPill` falls back to `s.cta1` (`:558`) — which `sectionVm`
  resolves per section, so on pricing it is the static default "Book Now". That is also why the
  tester's rename of Header → Primary button moved only the nav pill.

**Fix.**
- `:7312` takes `label={s.pricingCta}` and is not drawn when it is empty (Retro's rule at
  `:7526`). `cta`'s `in` becomes `[1]` for every template.
- **The canvas picture changes**: the Lime card's pill reads "Enquire about a date" where the
  frame reads BOOK NOW. **Small decision:** (A, recommended) seed Lime's `cta` with the frame's
  own "Book Now" via a per-template default, so the fitted picture holds and the field is live;
  (B) accept the seeded copy changing. Check how `fieldDefault` handles per-template defaults
  before choosing (`FIELDS.header.kicker` has a Lime-layout-3 default — `data.js:~675`).
- `note`: open the Lime layout-2 pricing frame (ids in `layout-2.md`) and see whether it draws
  a line beside the pill. If it does, draw `s.pricingNote` there. If it does not, `note` stays
  legitimately unreached under Lime and the fix is to **say so honestly**: a field whose `in` is
  empty for the active template should read "Not shown in this template", not "…in this layout"
  (`fieldReach` / `EditPanel`'s note; one extra branch). Apply the same wording to `images` /
  `reviews` / `rating` if they stay `Lime: []`.

**Verify.** Lime layout 2, three widths, both surfaces: type into *Plan card button*, the pill
follows; empty it, the pill goes. Retro layout 2 unchanged (digest). The note wording in the
panel under Lime vs Retro.

**Docs.** The `PRICING_CARD` comment; CLAUDE.md's pricing paragraph if the Lime card gains the
fields; F2's "named edge" in `../retro/qa-fixes.md` gets a pointer here.

**Settled** (2026-09-21).
- **The frame answered the decision, against this entry's premise.** Lime's cta-row
  (`I964:64591;715:2527`, and the 390 master's `I986:11878;880:11446`) reads **"Enquire about a
  date"** on the arrow-disc pill (248 × 54) with **"3 dates open for Sept '26"** beside it in
  Body/SM at 16 — Retro's copy exactly, stacked under the pill at 390. "BOOK NOW" was never the
  frame's: it was the label-less `BookPill` default the layout-2 fit shipped, and that fit's
  "stays dropped (Retro's claim rule)" was out of date once Retro's line became a field. So
  there is no per-template seed and nobody was asked: `PRICING_CTA` / `PRICING_NOTE` already are
  the frame's words, and wiring the fields moves the canvas **toward** the frame.
- **The fix.** Lime's layout-2 block draws Retro's row — `col(16)` at 390, a wrapping `row(16)`
  otherwise — holding `BookPill` with `label={s.pricingCta}` (only the label; Retro's `bg` / `fg`
  / `disc` / `size` would repaint it) and `s.pricingNote` in `body(s.bodySm, 1.4)` / `s.tx`.
  Emptied label drops the pill, emptied line its span, both the row. `PRICING_CARD` is `[1]` for
  every template, and the two fields gained hints (they had none).
- **Measured** (Lime, arch 1, canvas = `live=1`): pill 205 × 44.3 / 212.9 × 54 / 206 × 54 against
  the frame's 248 × 0.82 = 203.4 × 44.3, 213 × 54 at 768 (`986:11859`, a row like desktop's)
  and 205 × 54 at 390; the line 13 (16 × 0.82) / 16 right
  of the pill, 16 under it at 390. Live, the pill is `<a href="#form">`. "Book Now" no longer
  appears in the section.
- **Reach, probed** (sentinels through `&cj=`, themes 0, 1, 2 × arch 0–3 × three widths × both
  surfaces, 72 renders): both keys move the HTML at design 1 and nowhere else, on all three
  themes. `in: [1]` is measured.
- **One edge found and closed:** a 43-character label is `nowrap` in `labelStyle` and took the
  390 page to 392. The Lime pill passes `whiteSpace: 'normal'`, `maxWidth: '100%'`, so a long
  label wraps inside the card (390 / 768 / 1180 all hold `scrollWidth`); the seeded pill's box is
  unchanged. Retro's at the same label already held 390.
- **"Not shown in this template."** Nothing in pricing needs it any more, but
  `FIELDS.media.cta` (`{ Lime: [0], '*': [] }`) had the tester's complaint on Retro and the flat
  three: "this layout" promises a layout that reads it. `fieldNowhere()` in `data.js` (the
  template's row is an empty array) switches `EditPanel`'s note to "Not shown in this template".
  Checked by calling both helpers over `media.cta`, `pricing.cta` / `note` / `intro` × Retro,
  Lime, Grunge × designs 0–3; not walked in the real app.
- **Digest** (all categories, themes 0, 1, 2, three widths, canvas and `live=1`, 774 files):
  exactly **pricing arch 1 at theme 1**, three widths, both surfaces — six files. Retro and
  Grunge byte-identical; only Lime moved.
- **Docs:** the `PRICING_CARD` and `FIELDS.pricing` comments, the Lime block's pill comment,
  CLAUDE.md (the pricing paragraph, the `FIELDS` bullet, the media `cta` sentence), README's
  *Fields a layout does not read*, F2's named edge in `../retro/qa-fixes.md`, and a correction
  on `layout-2.md`'s pricing Settled.

---

## JP-037 — four drawn elements have no field

> Layout 2 draws four things no panel can reach: the hero CTA "Enquire about a date"; the bio
> card's line "Five years of rooms read & floors moved"; the BOOK NOW pill beside it; the bio's
> chip row (six, with a spare *All Access* — the design has five). Renaming Header → Primary
> button changed only the navbar pill; Header → Tag chips → Hide did not hide the bio's chips.

**Verdict: confirmed, all four.** The artist cannot change or hide a CTA and a claim about
themselves on their own published page.

**Evidence.**
- **Hero CTA** — `HeaderV1` hardcodes `label="Enquire about a date"` in both halves: Lime
  `EncoreSection.jsx:1523`, Retro `:1786`.
- **Bio credit line** — a literal two-tone span in both halves: Lime `:3264`, Retro `:3433`.
- **Bio pill** — `BookPill` with no label (Lime's `pill` near `:3250`, Retro `:3440`), so
  `s.cta1` resolved on the *bio's* content: the static "Book Now" (JP-036's mechanism).
- **Chips** — `s.chips` is `TAGS` (`data.js:371`, six strings ending *All Access*) mapped in
  `sectionVm` (`EncoreBuilder.jsx:487`); no field names it, in any section, and the bio's rows
  (`:3213`, `:3413`) do not read `showTags`, which is the header's own key.

**Trap — `vm.chips` is a palette as much as a chip row.** `s.chips[3]?.bg`,
`s.chips[4 % n].bg` and friends are colour seats at ~20 sites across header, media, map and
pricing. **`TAGS` and `vm.chips` must not change length or order.** Editable chip *labels* are a
separate list (`vm.chipLabels` or similar) that the drawn rows read, zipped onto the seats by
index and wrapping.

**Decision needed** (one `AskUserQuestion`, three questions):

1. **Hero CTA.** (A, recommended) a new header field, *Hero button*, seeded with the frame's
   "Enquire about a date", `in: { Retro: [1], Lime: [1] }`, emptied → not drawn. The picture
   holds. (B) read `cta1`: no new field, but the fitted hero changes to "Book Now" and nav pill
   and hero can never differ, which the frame's own copy does.
2. **Bio line and pill.** (A, recommended) two bio fields: *Credit line* (seeded with the frame
   copy; emptied → the line is dropped and the pill keeps the row) and *Button* (seeded "Book
   Now"; emptied → dropped; both empty → the row is not drawn). The frame sets the line two-tone
   ("Five years of" in the accent), so the split needs a rule once the copy is the artist's:
   accent the **first three words**, computed in `sectionVm` as `vm.bioCredit = { lead, rest }`
   since `EncoreSection` composes nothing. (B) one field for the line, pill reads the header's `cta1` through
   `identity` (F1's route) — fewer fields, but the tester's control (rename → bio follows)
   becomes a cross-section dependency the bio panel cannot explain.
3. **Chips.** (A, recommended) one header field, *Tags* — a comma textarea seeded from `TAGS`
   **minus *All Access*** if the frames agree on five (check the header and bio frames at
   layouts 1–4 for both templates first; if any frame draws six, seed six and let the artist
   trim) — flowing to the bio through `headerIdentity` like `kicker` / `location`, and the bio's
   rows honouring the header's `showTags` the same way. The hint says the bio prints them too
   (and JP-042's lesson: name the layouts, measured). Layout 3 and 4's **Genres row**
   (`:3657`, `:3912`) reads the same chips — it follows too. (B) a separate bio field: two lists
   to keep in step for what every frame draws as one set.

**Fix (if A, A, A).** `data.js`: the fields with measured `in`, `headerIdentity` extended with
`tags` / `showTags`. `sectionVm`: `vm.heroCta`, `vm.bioCredit`, `vm.bioCta`, the label list.
`EncoreSection`: the six literal sites above plus every `s.chips.map` that *prints* `c.label`
(leave the `.bg` / `.fg` reads alone). Harness: `&who=` must carry the new identity keys.

**Verify.** Each new field at layouts 1–4 × Retro, Lime, Grunge × three widths × both surfaces:
it moves the HTML exactly where `in` says. Emptied states (line only, pill only, both, zero
tags, one tag, twelve tags — `scrollWidth` equals the width at 390). Seeded digest: byte-identical
except the chip rows if *All Access* is dropped, which is then the named diff.

**Docs.** CLAUDE.md's *The artist's role and town are the header's too* paragraph (identity now
carries tags), the `FIELDS.header` / `FIELDS.bio` comments, the `TAGS` comment (palette vs
labels), README's field list if it has one.

**Decision** (user, 2026-09-21): **A, A, A — and the chips seed five.**
1. Hero CTA: a new header field seeded with the frame's "Enquire about a date" (read off
   `964:64580`'s own text node, `I964:64580;624:4884` — the frame's copy, not a default).
2. Bio: two fields, *Credit line* and *Button*. The pill's "Book Now" **is** the frame's text
   (`I964:64581;676:2215`), so JP-036's mechanism (a label-less `BookPill`) produced the right
   word here by accident; the seed is the frame's. The frame's line is typed lowercase — "five
   years of rooms read & floors moved" (`I964:64581;676:2212`) — check how it is cased before
   seeding. Accent = the first three words, split in `sectionVm`.
3. Chips: one header *Tags* field through `headerIdentity`, **seeded without *All Access***. This
   reverses `../retro/layout-2.md`'s "render all of `s.chips`, do not slice" (the five were read
   there as the Tags component's default): the bio's instance (`I964:64581;676:2209`) carries the
   sixth chip as a `hidden` frame, and the user chose the frames' five. Named diff: every chip
   row on every template loses a chip. `TAGS` / `vm.chips` keep six seats.

**Settled** (2026-09-21).
- **The frames were read before the questions were asked** (JP-036's lesson). All three strings
  are the frames' own, Lime's and Retro's (`964:64638`) alike — so unlike JP-036 no seed moved a
  pill — with one exception: **both frames type the credit line lowercase**, "five years of…",
  and the fit had shipped a capital F. `BIO_CREDIT` is the frame's, a named one-letter diff.
- **Four fields.** `FIELDS.header.heroCta` (`HERO_CTA`, `in: { Retro: [1], Lime: [1] }`),
  `FIELDS.header.tags` (`TAG_LABELS`, a comma `area`, `showTags`' own `in`), `FIELDS.bio.credit`
  and `FIELDS.bio.cta` (`in: [1]`). `vm.heroCta` and `vm.bioCta` are uncased (the footer pill's
  rule); `vm.bioCredit` is `{ lead, rest }`, split on whitespace in `sectionVm`, three words or
  fewer being all lead. The space between the halves now sits outside the accent span.
- **The palette / label split is real, not documented.** `vm.chips` lost its `label` and is six
  seats off `TAGS`; `vm.tagChips` is the labels seated on it by index, wrapping, in `vm.chips`'
  shape, so the six row sites (`TagChips`, the three header rows, both bio layout-2 rows) were a
  one-token swap and every `.bg` / `.fg` seat read is untouched. Lime's bio row alternates
  `i % 2`, and six seats being even keeps its parity past the wrap.
- **`showTags` travels through `identity` with the tags, and an emptied list folds into it**
  (`vm.showTags = tags.length && own.showTags !== 'hide' ? 'show' : 'hide'`): every reader of the
  key is a chip-row gate, so a list of none hides the row without spending its gap or the Lime
  bio's 22.19 padding. Both bio layout-2 rows gained the guard; the layout 3 / 4 Genres rows
  already had it, unreachable until now (`../retro/layout-4.md`'s "cannot fire").
- **The probe is committed: `source/scripts/reach.mjs`** (JP-042's lived in a scratchpad and was
  gone). 6,264 renders, themes 0, 1, 2 × three widths × both surfaces, a hit always 6/6.
  It reproduces JP-042's `kicker` / `location` table exactly, and adds:

  | | reach |
  |---|---|
  | `who.tags`, `who.showTags` | bio layouts 2 and 4; **Lime: 3 as well**. No other section |
  | `header.tags`, `header.showTags` | Retro 1, 3, 4, 5, 6 · Lime 1, 3, 4 (5 folding onto 1) · Grunge 1, 4 — `showTags`' existing `in` |
  | `header.heroCta` | layout 2, Retro and Lime (Lime's 6 folds onto 2); nothing on Grunge |
  | `bio.credit`, `bio.cta` | layout 2, all three themes |

  The hints say the table: Tags "…The bio prints them too in layouts 2 and 4 (in Lime, layout 3
  as well)", Tag chips "Hides the bio's chips as well."
- **States** (bio layouts 2 and 4 and header layout 2, Retro and Lime, three widths, `live=1`,
  `scrollWidth` = width in every one): line only, pill only (the row takes `flex-end`, so the
  pill keeps the frame's right-hand seat), neither (no row), a two-word line, a 120-character
  line with a 43-character label, zero / one / twelve tags, hidden. **One edge found and
  closed:** a 47-character hero label took the 390 page to 435 (Retro) and 400 (Lime); both hero
  pills take JP-036's `whiteSpace: 'normal'`, `maxWidth: '100%'`, and the seeded header
  re-digested byte-identical.
- **Digest** (774 files): 108 moved, **exactly the probe's chip-row set** on all three themes —
  header 1, 3, 4, 5, 6 (Retro) / 1, 3, 4, 5 (Lime) / 1, 4 (Grunge), bio 2 and 4, Lime's bio 3 —
  so Retro and Grunge moving is the named diff. Less geometry, every differing row is the
  removed chip or (bio layout 2) the two credit spans. **Header layout 2 is byte-identical.**
- **Real app** (puppeteer, 1600 wide, Lime and Retro, setup card 2): the panel lists *Hero
  button* and *Tags*; typing moves the hero pill; the header's tags land in the bio's row, which
  is the tester's control (layout 2's header draws no chips of its own); *All Access* is gone.
  The published tab was not walked — `live=1` in the harness stands in for it.
- **Docs:** CLAUDE.md (*role and town*: tags, the palette / label split, the three literals),
  the `TAGS`, `FIELDS.header`, `FIELDS.bio` and `headerIdentity` comments, `preview.jsx`'s
  `&who=`, the two stale `TagChips` comments in `EncoreSection`, and `../retro/layout-2.md`
  (its "do not slice" ruling reversed, its open question 3 closed).

---

## JP-033 + JP-041 — visitor-facing links print section *type* names

> JP-033: the header nav prints nine section-type names where the design has three (MUSIC / GIGS
> / ABOUT). No *Navigation links* option gives the design: Minimal has the right shape but
> hardcodes MUSIC / SHOWS / BOOK. JP-041: the Booking Calendar card's quick links print
> *Booking Calendar / Pricing / Enquiry Form* where the design has *Available dates / Packages /
> Enquire*, and there is no field. Same root, different component — verifying one does not
> cover the other.

**Verdict: confirmed, one root.** `navSections` is `{ cat, label: catName(cat) }`
(`EncoreBuilder.jsx:~3564` and the editor's twin), and `catName` is the **builder's** name for a
section type — right for the sidebar, wrong for a visitor. Two consumers print it: the header's
`vm.navLinks` in `sections` mode, and `vm.calFlow` (`EncoreBuilder.jsx:1011-1018`). The footer
does not have the bug: `FOOTER_LINKS` (`data.js`) already carries visitor labels per category
(*About, Media, Shows…*) and the artist can edit them. One ticket, **two verification
surfaces**; it is Retro's bug as much as Lime's.

Two separable halves:
- **What a link says** (both tickets) — no decision needed on *whether*; only on where the words
  live.
- **How many links the header draws** (JP-033 only) — "Follow my sections" giving nine is the
  option doing what it says. The design's three is what Minimal is for, and Minimal's triple
  (Music / Shows / Book) is not the frame's (Music / Gigs / About).

**Decision needed.**

1. **Where the visitor label lives.**
   - **A (recommended). One per-category visitor label in `data.js`** (`NAV_LABELS`: `bio` →
     About, `media` → Music, `map` → Gigs, `calendar` → Dates, `pricing` → Packages, `form` →
     Enquire …), used by `navSections` for the header, seeding `FOOTER_LINKS`' labels so the two
     cannot drift, plus a three-entry `CAL_FLOW_LABELS` for the calendar card's longer frame copy
     (*Available dates / Packages / Enquire*). No new fields; the header stays derived. The
     artist still cannot *rename* a nav link — record that as the named limit.
   - **B. A, plus an editable override**: a `LinksField`-style repeater on the header
     (`{ label, to }`) replacing `navMode`. It is the footer's editor reused and gives the
     design exactly, but it is an L, it retires `navMode` / `NAV_MINIMAL` / the F25 Minimal
     hint, and the seeded nav would no longer follow the page as sections are added. Not
     recommended in a QA pass.
   - **C. A per-section "Menu label" field** on every category. Eleven panels grow a field for
     one row of type.
2. **Minimal's triple.** Re-seed `NAV_MINIMAL` to the frame's Music / Gigs / About
   (`['About', ['bio']]` replacing Book — the Book pill already stands beside the links), or
   keep Book. Recommended: the frame's. It changes Retro's Minimal nav too; check Retro's
   layout-2 768 master, which CLAUDE.md says draws the same three.
3. **Default `navMode`.** Stays `sections` (recommended — a fresh page advertising every section
   it has is the builder's own reading, and JP-039 is where the three-link state gets its room),
   or flips to `minimal` so the seeded header is the frame's picture.

**Fix (if A).** `data.js`: the label map beside `CATS`; `FOOTER_LINKS` rows written from it.
Both `navSections` builders and `preview.jsx`'s. `sectionVm`'s calendar block maps
`CAL_FLOW_LABELS[n.cat] ?? n.label`. **`navEms` measures the labels** — shorter words change
Lime's capsule fit at desktop; re-check the header at layouts 1–4. Labels that are the artist's
to see in the *sidebar* (`catName`) do not move.

**Verify.** *Surface 1, header:* both nav modes × layouts 1–4 (Retro's six) × three widths ×
both surfaces; F25's dropped-label behaviour still holds in Minimal with the new triple.
*Surface 2, calendar layout 2 head* (`EncoreSection.jsx:12563`, `:12682`): three labels, the
section's own dotted and unlinked, a page missing `pricing` or `form` still reads right.
*Footer:* the seeded columns read exactly as before (digest). Published tab: every nav and
flow link still scrolls (fragment → `scrollIntoView`).

**Docs.** CLAUDE.md's header-nav paragraph (`navSections` is `{ cat, label }`; key on `label`
— Minimal's two labels can still resolve to one section), the calendar paragraph's `vm.calFlow`
sentence, `data.js` §4.3a, README's header-nav paragraph.

**Re-triage (2026-09-21, on `3628b2b`).** Measured on the harness, `live=1`, Retro and Lime,
header layout 2 at 1440: `sections` prints *About · Top Tracks · Media · Repertoire ·
Shows/Coverage · Pricing · Availability · Enquiries · Reviews*; `minimal` prints *Music · Shows ·
Book*; calendar layout 2's head prints *● Availability · Pricing · Enquiries*. So PR #24 closed
the **label half** of both tickets — decision 1 above is gone, and `CAL_FLOW_LABELS` with it:
JP-033's Decision in [`qa-fixes.md`](./qa-fixes.md) read this very frame (`964:64593`, "●
Available dates · Packages · Enquire") and chose the nav's words as a named diff. What survives
is the **count half**, decisions 2 and 3. The frames' text nodes make it per-layout, which the
triage had not seen: **layouts 2 and 3 draw Music / Gigs / About** (Lime `964:64580`, its 768
`986:11848`, Lime layout 3 `964:68654`, Retro layout 2 `964:64637`), **layouts 1 and 4 draw the
eight** (`964:58588`, `964:72849`), and layout 2's 390 (`986:11867`) draws no link words at all.
The plan's "check Retro's layout-2 768 master" is answered by the same read.

**Decision** (user, 2026-09-21).
1. Where the label lives — **moot**, shipped as `navLabel()` by PR #24.
2. Minimal's triple — **the frame's, Music / Gigs / About.**
3. Default `navMode` — **stays `sections` at every layout.** The seeded header is therefore the
   frame's picture at layouts 1 and 4 only; at 2 and 3 the artist picks Minimal. Named diff.
4. JP-041 — **held: closed by JP-033.** No `CAL_FLOW_LABELS`; the reply to the tester names the
   calendar head's words an intended diff.

**Settled** (2026-09-21).
- **What changed.** `NAV_MINIMAL` is Music → `media`/`repertoire`, Gigs → `map`/`calendar`
  (Shows' own list), About → `bio`; Book and its list are gone, its pill standing beside the
  links in every frame. The `navMode` option reads "Minimal (Music · Gigs · About)". Nothing
  else is code: `minimalNav`, the F25 drop and the hint above the select all read the constant
  (a page with no bio keeps About on the canvas, names it in the hint and leaves it off the
  published nav — checked through `minimalNav()` directly, the harness having no way to take a
  section off its page). No new field, so no `reach.mjs` row: the digest is the measurement.
- **Which templates move: Retro and Lime, Minimal mode only.** The flat three's `FlatNav`
  still hardcodes Music / Shows / Book and reads none of this (named in `qa-fixes.md`, not
  fixed here either).
- **Digest** (themes 0, 1, 2; three widths; canvas and `live=1`). `sections` mode, `header` +
  `calendar` + `footer`: **zero files** on both surfaces. Minimal mode
  (`&cj={"navMode":"minimal"}`), `header`: **14 + 14 files, the same set on both surfaces** —
  Retro's six and Lime's six arch rows at desktop (12) and Retro layouts 5 and 6 at tablet (2,
  the `NavLinks` pair); Grunge zero. That is JP-033's first-pass set exactly.
- **Fit.** `live=1`, every Retro and Lime header layout at 1440 (and Retro 5/6 at 768): one row,
  no overflow, Music → `#media`, Gigs → `#map`, About → `#bio`. Lime's links draw at 20px
  (layouts 1, 4) and 15px (2, 3) — the triple is shorter than the old one, so `navEms` only
  relaxes.
- **Named, not chased.** Layouts 1 and 4's frames write "Shows/coverage" with a small c where
  `navLabel` and the footer seed say "Shows/Coverage"; Lime's nav is Bebas caps, Retro's nav is
  uppercased, and the tester passed the footer against the frame. At 768 layout 2 still folds to
  the burger where its master draws these three links — that is **JP-039**, next, and the
  three-word Minimal is what makes its row fit.
- **Reply to the tester.** JP-033: labels fixed in the layout-1 pass; the design's three are
  *Navigation links → Minimal*, now Music / Gigs / About; the default stays "Follow my
  sections" by product call. JP-041: intended — the calendar head uses the page's one word per
  section (Availability · Pricing · Enquiries), decided 2026-09-18 and held 2026-09-21.

---

## JP-039 — the 768 header folds to a burger where the frame keeps the links

> At 768 the header collapses to a burger; the design keeps the nav in a row. Control: with
> Minimal (three items) it is still a burger, so this is a breakpoint rule, not a consequence of
> nine generated items.

**Verdict: documented as intended — and the tester's control is a fair hit on the documented
reason.** CLAUDE.md: "Layout 2's 768 master draws the links instead, and is **not** followed:
its three are the Figma component's default, where `navLinks` is the artist's page and the
seeded eleven sections give nine — 765px of type in a 688px canvas." The Lime block says the
same at `EncoreSection.jsx:1451-1453`. The reason given is "nine do not fit". Three do, and the
code never asks: `nar ? <NavMenu/> : <nav>` (`:1458`).

**From entry 4 (2026-09-21).** Minimal is now **Music / Gigs / About** — the very three this
frame's 768 master (`986:11848`) draws, in a 145px capsule at 15px type — and `navMode` still
defaults to `sections`, so the seeded 768 header is nine words whichever option wins. The
CLAUDE.md sentence quoted above now reads 576px of type / 720 with gaps (re-measured by PR #24).
Retro's layouts 5 and 6 (`NavLinks`) already draw their row at 768. Lime layout 3's master
(`964:68654`) draws the same three at desktop; its 768 was not read.

**Decision needed.**
- **A (recommended). Fit-gated links at tablet.** `sectionVm` already measures the row
  (`vm.navEms`, Bebas advance widths). Add `vm.navFits`: at tablet, the links draw when
  `navEms × size + gaps` clears the room the row leaves (the desktop `minWidth` expression at
  `:1456` is the same sum); otherwise the burger, as now. 390 is always the burger — its master
  draws one. With JP-033's shorter labels, Minimal fits and *Follow my sections* on a full page
  does not, which is the frame's state for the frame's content and the documented fallback for
  everything else. No effect, no measuring in `EncoreSection` — the gate is a vm boolean.
- **B. Links at 768 whenever `navMode` is `minimal`**, burger otherwise. Simpler, but a
  five-section page in `sections` mode would fit and still get the burger.
- **C. Keep the burger**, and rewrite the documented reason so it is true ("a row that changes
  shape with the section count is not drawn at tablet").

**Scope question inside A:** Lime layout 2 only (the report), or every header whose 768 master
draws links? Check the 768 masters of Lime layouts 1, 3, 4 and Retro's six in the session;
recommended: gate every header whose master draws links, leave the rest on the burger, and list
which is which under Settled. The capsule the burger stands in (`:1459`) is the 390 master's and
stays for the burger state.

**Verify.** 768, canvas and `live=1`: Minimal draws three links in the frame's capsule;
`sections` with nine draws the burger; walk the count down (delete sections in the editor)
and find the flip — no state where the capsule wraps to two rows or the name is pushed out
(`scrollWidth` = 768). The links scroll in the published tab. `NavMenu` still opens where it is
drawn. 1440 and 390 digests byte-identical.

**Docs.** CLAUDE.md's header-nav paragraph (the "is **not** followed" sentence), the `:1440`
comment block, `layout-2.md`'s header Settled gets a pointer here.

**Decision (user, 2026-09-21).** **A — fit-gated links at tablet**, scoped to **layouts 2 and 3
in both templates**, which are exactly the headers whose 768 master draws links. Read this
session: Lime 2 `986:11848`, Retro 2 `984:34438`, Lime 3 `984:10740` and Retro 3 `977:22532` all
draw Music / Gigs / About in a capsule (the two layout-3 instances return an empty `hero-card`
from `get_metadata`; `get_design_context` has the three `<p>`s); Lime 1 `986:39876`, Lime 4
`971:5299` and Retro 4 `964:77544` carry all eight link nodes `hidden="true"` beside a `burger`
frame. Retro 1's 768 was not read — it is Lime 1's component. Layouts 1 and 4 stay on the
burger. `vm.navEms` is Lime-only, so Retro gets an Anton advance table beside `bebasEms`.

**Settled (2026-09-21).**
- **`vm.navFits`**, set in `sectionVm` for `cat === 'header'` at tablet, designs 1 and 2, Retro
  and Lime, on a non-empty nav. One sum per bar — capsule + wordmark + Listen + pill at the
  master's own sizes — against the measured row: **688** in layout 2, **684** in layout 3
  (the card insets it 10 + 32 a side). Lime's sum is HeaderV1's desktop `reserve` unscaled
  (`navEms × labelSm + navNameEms × labelLg + navCtaEms × labelSm + 138.32`); Retro's is
  `antonEms()` (new, `data.js`: Anton's advances by canvas `measureText`, 0.02em tracking folded
  in, within 1% and over) at 16 / 20 in layout 2 and 13 / 16 in layout 3, plus 38 of capsule,
  four 16 gaps, Listen's 12 and the pill's 59.
- **Four sites, one gate each**: Lime `HeaderV1`, Retro `HeaderV1`, Lime `HeaderV2`, Retro
  `HeaderV2`. Tablet links draw at the bar's own Label/SM (Lime 14, Retro 16 / 13 — Listen's
  size beside them), never on the desktop `cqi` budget; Lime's left cell is pinned at
  `max-content` so the capsule cannot wrap. The burger state keeps the 390 master's capsule.
- **Which is which.** Links at 768 when they fit: layouts 2 and 3, both templates. Burger at
  768 always: layouts 1 and 4, both templates (their masters). `NavLinks` row: Retro 5 and 6,
  untouched. Flat three: `FlatNav`, untouched.
- **The flip, walked** (harness `&nav=<n>`, new and opt-in, seeded names): Retro 2 draws up to
  4 links, Retro 3 up to 5, Lime 2 and 3 up to 6; past that the burger. Every state is one
  row, no element past the section's right edge, canvas `href` absent and `live=1` `#media`.
  Past its half of the bar Lime's capsule slides the name off centre (5+ links) — the desktop
  rule, not a new one. Minimal: capsule 180 (Retro 2), 160 (Retro 3), 136 (Lime, against the
  master's 145 at its leaked desktop type).
- **Digest** (`header`, themes 0,1,2, canvas and `live=1`, `sections` and Minimal; 4 × 54
  files): 1440 and 390 byte-identical in all four; `sections` byte-identical at all three
  widths; the only diffs are tablet + Minimal at arch 1 and 2 of Retro and Lime, and Lime arch 5
  (layout 2 folded, `5 % 4`). Grunge zero. No new field, so no `reach.mjs` row.
- **The burger still opens** where it is drawn: `live=1`, tablet, `sections`, all four sites —
  a click adds the panel's ten fragment links.
- **Named.** Lime 3's and Retro 3's `get_metadata` is an empty `hero-card`; use
  `get_design_context`. HeaderV2's Lime comment claimed both narrow masters draw a burger — it
  was wrong about 768 and is corrected.
- **Reply to the tester.** Fixed: at 768 layouts 2 and 3 draw the links whenever they fit on
  the bar's one row — Minimal does under the seeded name (the wordmark is in the sum); *Follow my sections* does on a short page. The
  seeded nine cannot (720px of row in a 688px bar), so that state keeps the burger, by design.

---

## JP-038 — the desktop side gutter is 189px where the frame has ~55

> On desktop the side padding is a hard 189px against ~55 in the design. Measured at six widths
> from 1170 to 1910 — always 189, so it is padding and not a max-width. All 11 sections; the
> content column is 21% narrower.

**Verdict: the number is real, the diagnosis is not — and half of the report is unexplained.**

- **There is no 189 anywhere in the source.** The desktop canvas is **1180 wide, not 1440**
  (`SIZES.desktop.canvasW`, `EncoreBuilder.jsx:66`): every desktop value is the Figma value
  × 1180/1440 ≈ 0.82 (`:73-74`), because the editor draws the desktop page beside a sidebar.
  The gutter is `padX: 64px` and the column is 1180 − 128 = **1052**. The frame's column is
  1440 − 2·55 = 1330. **1052 / 1330 = 0.79 — the tester's "21% narrower", to the percent.** So
  the column is not narrow because of padding; the whole desktop page is a 0.82 scale of the
  frame, type and all, and the gutter scaled with it (then was rounded up to 64).
- **Past 1180 the published tab folds the surplus into the gutter on purpose**
  (`PublishedPage`, `:3540-3561`, and its comment): the column holds 1052 and the bands bleed.
  At a 1440 window with a ~10px scrollbar that is 64 + (1430 − 1180)/2 = **189**. That is where
  the number comes from.
- **"Always 189 from 1170 to 1910" does not follow from the code**, which gives 64 at 1180 and
  429 at 1910. *First step of the session: reproduce it.* Suspects, in order: the popup was
  resized while in the background (memory note `verifying-the-published-tab`: background tabs
  do not fire `resize`, so `w` goes stale); the six widths were DevTools device emulation of a
  fixed-size popup; the measurement was taken on the editor canvas, which is capped at 1180 and
  centred. If a foreground resize really leaves the gutter at 189, that is a **real bug** in
  `PublishedPage`'s resize handling and gets fixed whatever the decision below.

**Decision needed** (after the reproduction):
- **A (recommended). Works as designed; answer the ticket.** The 0.82 desktop is the
  architecture of all eight fitted pages (every `u()` in `EncoreSection`, every Settled number
  in seven plans). Reply to QA with the three bullets above, and fix only the stale-width bug
  if it reproduces.
- **B. Let the published column grow past 1052** — a second desktop frame for wide windows:
  between 1180 and 1440 the surplus goes to *scale* (the page approaches the true 1440 frame,
  k: 0.82 → 1) before any goes to the gutter. This is what the tester is actually asking for,
  and it is an **L outside a QA pass**: `u()`, `contentWidth`, `COLUMN_SPLIT`, the ramp and
  every `0.82` literal assume one desktop scale. If chosen, it gets its own plan
  (`plans/published-scale.md`), not a session here.
- **C. Trim the gutter only** (64 → 45 = 55 × 0.82). Widens the column by 38px at every
  desktop width and moves every desktop digest of both designed templates for a change no one
  can see beside the scale question. Not recommended.

**Verify.** The reproduction script (puppeteer, published tab, *foreground* resizes to the
tester's six widths, reading the first section's `padding-left`). If B or C: out of scope here.

**Docs.** If the stale-width bug is real, `PublishedPage`'s comment. If A, a README *Scope
boundaries* bullet saying in one line what the tester had to discover: the desktop page is the
1440 frame at 0.82, and windows past 1180 widen the gutters, not the column.

**Decision.** **A** (user, 2026-09-21), after the reproduction: works as designed, answer the
ticket, no app code.

**Settled.**
- **The constant 189 does not reproduce, and there is no stale-width bug.**
  `source/scripts/gutter.mjs` drives the real published tab in Chrome for Testing and resizes
  its *window* (`Browser.setWindowBounds` — viewport emulation fires `resize` whatever the
  tab's state and would prove nothing). With the tab in front the gutter is **241 / 114 / 194 /
  274 / 354 / 429** at 1170 / 1280 / 1440 / 1600 / 1760 / 1910, each `64 + (clientWidth −
  1180) / 2` to the pixel (1170 is under 1180, so it is the tablet frame: `40 + (1170 − 768) /
  2`). Resized with the *editor* in front, the hidden tab simply keeps the size it was hidden
  at — `clientWidth` and the gutter both — and lands on the same six numbers the moment it is
  shown. So suspect 1 is cleared: `w` never disagrees with the window. `PublishedPage` is
  untouched.
- **Where 189 comes from:** a 1440 window with a classic ~10px scrollbar — 64 + (1430 − 1180)
  / 2. Headless Chrome has overlay scrollbars, hence 194 above. One stuck width of 1430 is
  also the only input that gives 189 at all six sizes, so the six "widths" were not six window
  sizes as the page saw them — suspect 2 (emulating sizes over a popup that stayed 1440) is
  the reading left standing; it cannot be told from here and does not need to be.
- **Suspect 3 cannot give it either:** the editor canvas's own gutter is `padX` 64 at any
  window, and at 1170 `useTabletCap` has already forced the tablet canvas.
- **The reply to QA:** (1) the desktop page is the 1440 frame at 0.82 everywhere — canvas
  1180, gutter 64, column 1052 against the frame's 1330, which is the reported 21%; (2) past
  1180 the published tab puts the surplus in the gutters by design, the bands bleeding and the
  column holding the measure the type was tuned for; (3) the gutter is not a constant — the
  six measured values above, script attached — and 189 is the 1440-window value.
- **The header's root has no padding** (its compositions apply the gutter themselves), so a
  script that reads "the first section's `padding-left`" gets 0; `gutter.mjs` reads the second.
- README *Scope boundaries* has the bullet; `headless-shell.mjs` gained `chromeForTesting()`
  for the script. No file under `src/` changed, so every digest is byte-identical by
  construction.

---

## JP-040 — Events Map layout 2 draws none of four things its frame shows

> Layout 2 does not draw the rows' *In transit* chip, the 30mi / 60mi / 120mi ring labels,
> EXPAND VIEW, or *Updated 2m ago*. All four exist as filled fields marked "(layout 3)" and
> render as soon as the section is switched to layout 3 — the feature works; design and spec
> disagree. Severity pending; a question for BA/PO, not a defect.

**Verdict: a documented drop, and the tester has filed it correctly.** Retro's layout-2 fit
dropped them deliberately — `../retro/layout-2.md:633-634`: "Still dropped, as claims: IN
TRANSIT, Updated 2m ago, the rows' In transit, the ring labels, the zoom controls and EXPAND
VIEW" — and Lime's pass inherited it (`layout-2.md:~834`). The reasoning then: each is a
*claim* the builder cannot stand behind (a live status, a freshness stamp) or a control with
nothing behind it. Layout 3's QA (2026-09-15) later re-seated the same four as **fields**
(`status`, `updated`, `rings`, `expand`; `data.js:1039-1045`), which is what makes layout 2 now
look inconsistent: the objection "it is a claim" was answered by "make it the artist's claim".

**Blocked on the PO answer. No code until it is recorded here.** What to put in front of them:
- **A (recommended if they want parity). Draw them in layout 2 from the existing fields** —
  `rings` and `updated` on the map tile, `expand` wired to layout 3's own `zoom` state (the map
  is the same raster in both designed templates), `status` as the rows' chip. `in` for the four
  becomes `[1, 2]` / `[1, 2, 3]`, the "(layout 3)" suffixes go, no new fields. Caveats to
  state: *In transit* on **every** row is one section-wide word, not a per-gig status (the
  pricing `unit` precedent — CLAUDE.md, `vm.tierKind`); an emptied field drops its element.
  Size M, Retro and Lime together.
- **B. Keep the drop**; close as by-design, and make the panel honest — JP-036's
  "this template / this layout" wording already covers it.
- Note for the PO: the tester links this to an older open bug against Retro layout 2 (their
  "#4", four separate omissions). That number is not in these plans; whatever is decided here
  closes both.

**Verify (if A).** Layout 2 × Retro, Lime, Grunge × three widths × both surfaces; each field
empties cleanly; the zoom does not fight the featured-gig `sel`; the one-pin-per-gig rule
still holds; layout 3 and 4 digests byte-identical.

**Docs (if A).** CLAUDE.md's events-map paragraph (layout 2's state list, "its other state is
layout 3's `zoom`" now has a third reader), `FIELDS.map` labels and `in`, both layout-2 plans'
"still dropped" lines get a pointer here.

**Decision.** —

**Settled.** —

---

## End-of-pass sweep

1. Full digest, all categories × themes 0, 1, 2 × three widths × canvas and `live=1`, against
   `main`: every diff is one a Settled above names.
2. The editor probe from F2 (`fieldReach` vs measured reach) re-run over every field this pass
   added or re-scoped: 0 mismatches.
3. Walk card 2 of Lime's setup modal end to end in the real app and the published tab at 1440 /
   768 / 390 against the tester's six screenshots.
4. `npm run build:standalone`, `cp source/dist-standalone/index.html index.html`, its own
   commit (`Refresh index.html for the Lime QA fixes`).
5. `plans/README.md`'s row, and a reply line per ticket for QA (fixed / by design / needs PO).
