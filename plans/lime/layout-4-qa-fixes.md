# Lime layout 4 QA fixes — bug-by-bug plan

Working checklist for a batch of QA reports against the **Lime template, layout 4** (card 4 of the
setup modal, *Stacked*). It works like [`layout-3-qa-fixes.md`](./layout-3-qa-fixes.md): **one
entry per session, with context cleared between sessions**, and each session writes what it
settled back into this file. Unlike the last batch, **two entries here are refits**: JP-052 and,
if its decision says so, JP-054 change a fitted picture on purpose. Every other entry has to leave
every fitted picture unchanged.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then *How each
session runs* and *Verification harness* in `../retro/qa-fixes.md` (the harness it built —
`&cj=`, `&today=`, `&who=` — is what these sessions drive), then the memory notes
`verifying-the-published-tab` and `browser-tool-choice`. [`layout-4.md`](./layout-4.md) holds the
Figma node ids of every Lime layout-4 frame, and its *Settled in section 8* (the calendar) and
*section 9* (the form) are the fits two of these entries revisit. Retro's
[`../retro/layout-4.md`](../retro/layout-4.md) section 10 (*Learned on the booking calendar*) is
the reading JP-052 overturns. Read it before that session.

Branch: **`lime-layout-4-qa-fixes`, forked from `main`** (`01fa29b`). One commit per entry
(`Fix JP-052: …`).

**Report IDs are the tester's own** (JP-052 …). The screenshots are in the hand-over message,
not the repo. The ones that matter are the Lime frame's Book Us, whose summary card reads
*Summer wedding · Lake District · Outdoor / GUESTS 120 / SET LENGTH 4 hrs / BUDGET £1,200 / SOUND
Provided*, then a *SAT, JUNE 12 · Arrival 6pm · 9pm* card, a *LIVE BAND — FULL · 5-piece + DJ ·
Package ›* card and *SEND ENQUIRY*. The Lime frame's form reads *CONTACT US / ENQUIRE*, six boxes
(*Your name, Email, Event date, Event type, Location, Message*), *CHECK AVAILABILITY* and
two-line steps.

**The build the tester used is older than the deployed one.** Four of the "known bugs"
(JP-048 … JP-051) are fixed on `main` in PR #31, and JP-050's report (an empty h1, Kai Mercer ×12)
is exactly the pre-fix behaviour. The Pages build was checked at triage: `last-modified: Wed, 23
Sep 2026 12:53:20 GMT`, **byte-identical to the root `index.html` on `main`** (7,932,003 bytes,
carrying "Your name is required", "looks incomplete" and seven "aren’t shown"). So JP-048 … JP-051
get no entry. They get a reply line in the sweep. JP-055 is the same family and gets a
verification-only entry.

**Retro moves with most of this.** The calendar and form seams sit in the shared `if (s.v3)`
bodies (the Lime blocks read the branch's hoisted state), and JP-038 is `padX`. Grunge renders
layout 4 through the shared branches flat (card 4 is a placeholder), so it moves wherever Retro
does. Verify themes 0, 1 and 2.

## Status

| Order | ID | Report (short) | Verdict | Size | Decision needed? | Status |
|---|---|---|---|---|---|---|
| 1 | JP-055 | A blank track and a blank gig render in media / map layout 4 | **Expected fixed on `main`** (the JP-051 sweep, `0b7e497`). Verify, and fix only if it reproduces | S | no | **done** (does not reproduce) |
| 2 | JP-054 | Form layout 4's copy is not the frame's (head, sub-line, boxes, button, two-line steps) | **Named diffs of the fit** (L4 §9 Settled). The tester is right that nothing picks a side | S–M | **yes** (PO call): **A** | **done** |
| 3 | JP-038 (layout 4) | Adjacent sections disagree on their side inset: 189 vs 171 at desktop, 22 vs 10 at 390 | **Confirmed, and not the gutter question already settled**: page-ground sections keep `padX`, while sheets put the frame's own inset back | M | **yes** (user call): **B** | **done** |
| 4 | JP-052 | Book Us' right column prints dates and prices no field edits, and ignores the wizard | **Confirmed. It is a misreading of the frame**: the card is the wizard's summary, and the fit read it as `CAL_SLOTS` | L | **yes**: **1 A (Package › cycle), 2 (i)**; JP-053 **A** | **done** |
| 5 | JP-053 | The wizard's Send Enquiry is `#form`: the answers go nowhere, and there is no confirmation | **Confirmed.** Documented as a fragment link, but the tester is right that it loses everything | M | decided in entry 4: **A** | **done** |
| 6 | — | End-of-pass sweep | — | S | — | open |

**Why this order:** JP-055 is a check with no decision. JP-054 and JP-038 are single questions
with small diffs. JP-052 is the largest refit and it asks the decision that JP-053 builds on, so
it goes late. JP-053 goes after it because it sends what JP-052's summary card shows.

**"Decision needed"** means the entry lists options with a recommendation. The session starts by
asking the user (one `AskUserQuestion`) and records the answer under **Decision** before writing
code.

## How each session runs

As `layout-3-qa-fixes.md`, with these differences:

1. Re-check the *Evidence* line numbers. They are from the triage (2026-09-23, `01fa29b`) and
   will drift.
2. **Themes 0, 1 and 2, every entry.** Lime's blocks read the shared branch's state, so a seam
   change moves Retro's layout 4 and Grunge's flat card 4 too. Say in the commit which moved.
3. Verify at **all three widths** and on **both surfaces** (canvas and `live=1`), and digest
   before and after (`scripts/digest.mjs`, themes `0,1,2`). For a base, use a **worktree of
   `main` on :5174 with `node_modules` symlinked, and normalise the port** in `background-image`
   URLs before comparing (the L3 sweep lost a round to that). A refit entry names its expected
   after-diff *before* the code: which category, which `arch`, which themes and widths.
4. **The wizard, the summary card and the form's submit are live-only.** Drive them in the
   popup, from the opener, per `verifying-the-published-tab`. Use a capture-phase
   `preventDefault` on any `mailto:` so the test does not open a mail app.
5. **Canvas and published agree.** The canvas is the frame's picture, and the published first
   paint is the canvas's by construction. Where an entry breaks that (an empty wizard has no
   answers to summarise), it names the diff.
6. A new or re-scoped field gets a measured `in` (`source/scripts/reach.mjs`: add a row to
   `PROBES`, do not rebuild it). A new repeater follows the JP-051 pattern whole: `*_KEYS` beside
   its seed, `blankRow`, a `*Val` resolver in `EditPanel` that resolves exactly what `sectionVm`
   does, and the "Empty … aren’t shown." hint.
7. Update the docs the entry names. Commit, fill in **Settled** and the status row, then print
   the hand-off prompt for the next entry and stop.

**Do not refresh the root `index.html` per bug.** The sweep does it once.

---

## JP-055 — a blank track and a blank gig render

> Media Player → Add track, left empty; Events Map → Add gig, left empty; Publish. The media grid
> gains a sixth card with no title, only the KM monogram, under a heading still reading "Five
> worth your ear". The map's counter reads *Gigs 6 upcoming* against five real gigs, and ‹ from
> the first gig pages the ticker to an empty ‹ › slide.

**Verdict: expected to be fixed on `main`.** The JP-051 sweep (`0b7e497`, PR #31) applied
`blankRow` to all seven repeaters, and the deployed build is `main`'s.

**Evidence.**
- `EncoreBuilder.jsx:676` — `vm.tracks = c.tracks.filter((t) => !blankRow(t, TRACK_KEYS))`.
  `TracksField`'s add row (`:2276`) is `{ title: '', sub: '', image: null, audio: '' }`, and
  `blankRow` reads `null` as `''`.
- `EncoreBuilder.jsx:1197` — `gigList` is filtered the same way (`GIG_KEYS`). `GigsField`'s add
  row (`:2394`) is all `''`.
- `EncoreSection.jsx:17779` — the stat card's `nGigs = s.gigs.length`, the filtered list. The
  ticker pages `s.gigs` too.
- **The heading is not a count.** `TITLES.media` is the artist's copy, *"Five worth your ear."*.
  Retro's layout-4 pass ruled that a count in a head is the frame's claim, not the artist's
  (`../retro/layout-4.md`, *"Six Worth Your Ears"*). An artist with six tracks edits the heading.
  That half of the report is by design.

**Fix.** None expected. Reproduce first. If either family still renders a blank row on HEAD, the
fix is the JP-051 pattern for that family, and this entry records why the sweep missed it.

**Verify.** `&cj=` = the explicit seed + `{}` and + an all-spaces row, for media (`tracks`,
art-less rows carrying `image: null`) and map (`gigs`), each × layouts 1–4 × themes 0, 1, 2 ×
three widths × both surfaces: byte-identical to the explicit seed. Then the tester's steps end to
end on Lime card 4, in the editor and the published tab. Also check the map at 390, where
`perPage` is 1: ‹ from gig one wraps to gig five, not to an empty slide.

**Docs.** None if it does not reproduce.

**Settled** (2026-09-23, `8a3c243`, no code). **Does not reproduce on HEAD.** The Evidence line
numbers still hold (`:676`, `:1197`). The tester's build predates the JP-051 sweep.
- **Harness.** The explicit seed (`TRACKS` in `TracksField`'s row shape with `image: null`, and
  `GIGS`) against the same list + `{}`, + an all-`''` row (the add row's own shape) and + an
  all-spaces row, for media and map × layouts 1–4 × themes 0, 1, 2 × three widths × canvas and
  `live=1`. That is 12 comparisons of 36 renders each, and **every one is byte-identical**. As a
  positive control, the same list + one named row moved all 36 renders of both families, so the
  `&cj=` override was reaching the section. (The sixth gig's name paints in no render,
  because it sits past the first page at every `perPage`. What moves is the stat's count and the pager.)
- **The tester's steps, Lime card 4, real app** (puppeteer, trusted clicks): Add track and Add gig
  left empty. Each repeater prints its "Empty … aren’t shown." hint. Publish → Open: at 1440 and
  390 the media grid lists the five seeded tracks under *Five worth your ear.*, and the map's stat
  reads *Gigs 5 upcoming*. At 390, ‹ from Hidden Warehouse walks Gorilla → Mint Lounge → Private
  wedding → The Deaf Institute → Hidden Warehouse, and › walks the same five forward. No empty
  slide, no page errors.
- **One canvas change on Add track that is not this bug.** The first repeater edit writes
  `c.tracks` from the seed, and the explicit branch sets `rel = sub` (TracksField has no
  duration field). So media layout 4's release line goes from *Single* to *Single · 5:42* on
  every card, whether the new row is blank or not. That is `sectionVm`'s documented seed-only
  `rel` (the comment above `vm.tracks`). It was left alone.
- **The heading** stays the artist's copy, as the verdict says.

Reply: **fixed in PR #31 (the JP-051 sweep), deployed 2026-09-23 12:53:20 GMT**. The report's
sixth card and *Gigs 6* come from the pre-fix build. The "Five worth your ear" heading is the
artist's own copy, not a count.

---

## JP-054 — form layout 4 prints the shared seed, not the frame's copy

> Frame: **CONTACT US** over **ENQUIRE**; boxes *Your name, Email, Event date, Event type,
> Location, Message*; **CHECK AVAILABILITY**; each "What happens next" step has two lines. Build:
> the shared heading, the artist's name as the sub-line, *Name, Email, Event date, Guests,
> Message*, **BOOK NOW**, one-line steps. The tester files it as an open question (not theirs to
> pick a side on): Event types says "Layout 1 only", Location can be added through *Add field*,
> and the head and button are editable defaults.

**Verdict: named diffs of the fit, not defects.** Lime L4 §9 Settled: "`heading` heads the
design, `s.brand` is the ENQUIRE line, the steps are `vm.formSteps` with the frame's sub-line
dropped, the frame's five boxes are the seed's four, and the pill prints `vm.formBtn`'s *Book
Now* against the frame's 'Check Availability'". Those are Retro's readings restated. The
question for the PO is whether layout 4's **defaults** should be the frame's. There is a
precedent for that: layout 4's calendar, gallery, map and testimonials heads already resolve
their own `*_HEADING_4` in `sectionVm` **and** `EditPanel` (`data.js:831`, `EncoreBuilder.jsx:216`).

**Evidence.**
- `EncoreBuilder.jsx:1340` — `vm.formBtn = cv('button', 'Book Now')`.
- `EncoreBuilder.jsx:1351`–`1364` — `vm.formPromises` / `vm.formSteps` from one newline list
  (`FORM_PROMISES`, `data.js:652`), one line per step.
- `data.js:655` — `FORM_FIELDS`, one list for all four layouts (layouts 2 and 3 print the label
  in the box).
- `EncoreSection.jsx:22122` — the Lime block (`if (s.v3 && s.lime)`). The sub-line is `s.brand`
  and the head is `s.title`.
- Frames: `964:72940` / `971:5627` / `977:9201` (Lime). Retro's twin is layout 4's form in
  `../retro/layout-4.md`. Read whether its copy is the same before choosing, since a
  per-layout default moves Retro too.

**Decision.** Which of the frame's copy should layout 4 seed?
- **A (recommended). The head, the sub-line and the button**, as per-layout defaults on the
  `CAL_HEADING_4` pattern: `FORM_HEADING_4 = 'Contact Us'`, `FORM_BTN_4 = 'Check Availability'`
  and a layout-4 sub-line default of `Enquire`. The sub-line needs a field: it is `s.brand` today,
  so it becomes a new `sub` key (or reuses one; read `FIELDS.form` first) whose layout-4 default
  is *Enquire*, measured into `in`. The boxes stay the artist's one list, since layout 4 is not
  the only layout that reads them and the tester agrees Location is one *Add field* away. The
  steps stay one line.
- **B. A, plus two-line steps.** `promises` gains a second line per row (`Title — sub`, split in
  `sectionVm`) and layouts 1–3 print only the first half. It is a new delimiter in a shared field,
  so it needs its own hint and a reach row. Not recommended in a QA pass.
- **C. By design; reply only.** The defaults are content, and the artist edits them.

**Decided** (2026-09-23, user call): **A.** Retro's frame (`964:72845`) and Lime's (`964:72940`)
carry the same copy at 1440: *Contact Us* over a rule, *ENQUIRE*, *Check Availability*. So the
defaults are per-layout, not per-theme, and themes 0, 1 and 2 all move. (Retro's narrow masters
read *KAI MERCER* in the head, which is the un-retyped layer name. Retro L4's section-11 lesson
reads the 1440 one as the authored copy.) `FIELDS.form` has no `sub` key. The only neighbour is
`available`, layout 3's eyebrow ("Available 2025 / 2026"). Reusing it would carry one layout's
eyebrow copy into another's small-caps line, so the sub-line gets a new `sub` key.

**Fix (on A).** The three resolutions in `sectionVm` and in `EditPanel`'s fallback chain (the
`TESTI_HEADING_2` / `CAL_HEADING_4` pairing: change one, change both). This is an intended
after-diff: form `arch 3`, themes 0, 1 and 2 if Retro's frame agrees (otherwise gate it and say
why), three widths, both surfaces.

**Verify.** The digest's after-diff is exactly form arch 3 on the themes the decision names.
Every other file is byte-identical. The editor's Heading / Button boxes show the layout-4
defaults at layout 4 and the shared ones at layouts 1–3. A stored value wins at every layout.

**Docs.** CLAUDE.md's enquiry-form layout-4 sentences, README's matching passage, and Lime L4 §9
Settled (append that the named diff was reversed, with the date).

**Settled** (2026-09-23). The Evidence lines had not drifted: `formBtn` at `:1340`, the Lime
block at `:22122`.
- **Code.** `data.js` has `FORM_HEADING_4` / `FORM_BTN_4` / `FORM_SUB_4` beside `CAL_HEADING_4`,
  and a new `FIELDS.form.sub` ("Line under the heading", `in: [3]`, emptiable). The `button` hint
  names the layout-4 start. In `EncoreBuilder.jsx`, `HEADING_4` gains `form`, so the head
  resolves in `sectionVm` and in `EditPanel` through the existing pair. `vm.formBtn` falls back
  to `FORM_BTN_4` at `d === 3`, and `EditPanel` has a matching `button` arm. `vm.formSub` is new.
  Layouts 2 and 3's `formCta` still falls back to *Book Now*, since `d` is 1 or 2 there. In
  `EncoreSection.jsx`, the Lime block and Retro's `v3` body print `s.formSub` where they printed
  `s.brand`, and drop the span when it is empty. The artist's name therefore has no seat in form
  layout 4, which matches the frame.
- **Digest** (`main` worktree on :5174 against HEAD on :5173, themes 0, 1, 2, canvas and
  `live=1`, port normalised): **exactly the 18 named files differ**, form arch 3 × three themes
  × three widths × both surfaces. The text rows are the h2 (*Let's make / your night
  unforgettable.* → *Contact Us*, one line: Lime's desktop h2 goes 190.4 → 95.2 against the
  frame's 95.1), the small-caps span (*Kai Mercer* → *Enquire*) and the pill (*Book Now* →
  *Check Availability*, at the same height at every width). Editorial and Pop move identically,
  because it is the same branch (not digested; `reach.mjs` covered them).
- **Reach** (new `PROBES` rows `form.sub` and `form.button`, themes 0–4): `sub` → layout 4 alone,
  `button` → layouts 1 and 4, which matches both `in`s.
- **Real app** (puppeteer, Lime / Retro / Grunge card 4 and Retro card 1): at layout 4 the panel's
  Heading / Line under the heading / Button read *Contact Us* / *Enquire* / *Check Availability*
  and the canvas agrees. At layout 1 the panel reads the shared heading and *Book Now*, and `sub`
  prints "Not shown in this layout". A typed Button (*ZZ Ask me*) wins on the canvas and in the
  published tab, and an emptied sub-line drops on both. The published form fills, composes
  `mailto:bookings@…?subject=Enquiry&body=…` and swaps in the sent block. No page errors.
- **Docs.** CLAUDE.md's form layout-4 sentences, and Lime L4 §9 Settled (a *Reversed* bullet).
  README has no layout-4 form passage and no per-layout heading defaults, so it is unchanged.

Reply: **fixed.** Layout 4 now opens on the frame's *Contact Us / ENQUIRE / Check Availability*
under every template. The small-caps line is a new field ("Line under the heading"). The boxes
stay the artist's one list (Location is one *Add field* away), and the steps stay one line.

---

## JP-038 (layout 4) — adjacent sections disagree on their side inset

> Events Map, Pricing, Book Us, Enquiry Form and Footer inset 189px at desktop, the rest 171.
> At 390 the same five inset 22 against 10, where the design has ~10 everywhere. The shift shows
> between neighbouring sections (the tester's
> `JP-038-layout4-mobile-section-inset-map-vs-repertoire.jpg`).

**Verdict: confirmed, and a different complaint from the one decided on 2026-09-21 and
2026-09-23.** Those decisions were about the page's *gutter* (the 0.82 desktop, then the
published zoom). This one is about sections on the same page disagreeing with each other. The
tester's absolute numbers are from a build that predates the zoom (189 is the pre-zoom 1440
gutter), but the 18px and 12px *differences* survive it:
- Sections that paint a full-bleed **sheet** (media, gallery, repertoire, testimonials, the header
  and the bio card) bleed, and put the frame's own inset back inside it. That is 56 × 0.82 ≈ 46 at
  desktop and 10 at 390 (Lime L4 line 878: "the bled sheet's own 10 inset gives it the frame's
  370, not the root's 346").
- **Page-ground** sections (map, pricing, calendar, form, and the footer, which is layout 1's)
  keep the root's `padX`: **64 / 40 / 22** (`EncoreBuilder.jsx:79`–`81`). Lime L4 line 1231 names
  it for pricing: "the 390 content column is the root's 346 (`padX` 22) against the frame's 370".
- 64 − 46 = 18 and 22 − 10 = 12. Those are the tester's deltas.

**Evidence.** `RAMP.*.padX` (`EncoreBuilder.jsx:79`–`81`). `bleedTo()` / `bleedX` in
`EncoreSection` (each sheet section's inset). The reopened JP-038 Settled in
`layout-2-qa-fixes.md`: "the remaining 23 is the desktop `padX` rounding (45 up to 64), which was
not chosen." `scripts/gutter.mjs` reads a root's padding in screen pixels.

**First step: measure.** Extend `gutter.mjs` (or a sibling script) to read each layout-4
section's **content left edge**, not its padding, at 1440 / 768 / 390 in the published tab, Lime
and Retro. Compare that to the frame's content edge per section (read off the masters:
`get_metadata` on each section's 1440 / 768 / 390 instance). The claim to test is "every master
insets ~55 / ~30 / 10". The tablet width is unreported, so find out whether it disagrees too.

**Decision.**
- **A. Accept and reply.** It is the fit's named choice: page-ground sections keep the root
  column. No code.
- **B (recommended). Layout 4's page-ground sections take the frame's inset**, the way the sheets
  already do: map, pricing, calendar and form at `arch 3` bleed and put the frame's inset back.
  Pricing's layout-4 rule row already bleeds with `bleedX`, so the mechanism exists. Moves those
  four at three widths, on themes 0, 1 and 2. The footer is layout 1's (`NVAR.footer` is 1) and
  sits on every page, so leave it as it is and say so.
- **C. Change `padX` itself** to the frame's (45 / 30? / 10) for the designed templates. It moves
  every section of every layout of every designed template, so it gets its own plan and is not a
  QA session.

**Decided** (2026-09-23, user call): **B.** Measured first (`source/scripts/inset.mjs`, the
published tab, card 4, the leftmost / rightmost glyph off each section root in screen px):
the sheets (header, bio, media, gallery, testimonials) start their text at **56 / 30 / 10**, the
frames' own inset. Map, pricing and form start at **78.1 / 40 / 22** (`padX` 64 / 40 / 22, with
the desktop zoom of 1440 / 1180), and the calendar's panel content at **138.1 / 90 / 32** against
the frame's 116 / 80 / 20, since its panel stands at `padX` where the frame stands it at 56 / 30 / 10.
Retro, Lime and Grunge read identically. The masters (`get_metadata`: map `964:72924` / Frame 319
`971:5606` / `977:9180`, pricing `964:72926`, calendar Section `964:72927` / `971:5614` /
`977:9188`, form `964:72940` / `971:5627` / `977:9201`) all inset 56 / 30 / 10. So **tablet
disagrees too**, by 10 (the report named only desktop and 390). The deltas are 22 / 10 / 12.

**Expected after-diff (named before the code).** Map, pricing, calendar and form at `arch 3`,
themes 0, 1 and 2, all three widths, canvas and `live=1`: the section's padding goes from `padX` to
the frame's inset, so every x in those 36 × 2 files moves, and pricing's rows and form's boxes
widen (at 390 the pricing feature rows get 370 wide instead of 346, so row heights move too).
Nothing else changes. That includes the footer, which is layout 1's (`NVAR.footer` is 1), sits
on every page and keeps `padX`, and the same four sections at `arch` 0–2. The arm is not gated
by theme, because the sheets' `u(56)` is not either, so Editorial and Pop move the same way. The
base is a worktree of **HEAD** (`5250117`) on :5174, not of `main`: `main` predates JP-054, whose
18 form `arch 3` files would otherwise land in this diff too.

**Verify (on B).** The measure script shows every layout-4 section's content edge within ±1px of
its neighbour's at all three widths (the footer excepted, if left). The digest's after-diff is
exactly map / pricing / calendar / form `arch 3`, themes 0, 1 and 2, three widths. Check
`scrollWidth` holds at 390.

**Docs.** CLAUDE.md, only if a rule changes. Lime L4's line-1231 note and README's *Scope
boundaries* JP-038 bullet (add one line: layout 4's page-ground sections inset at the frame's
numbers).

**Settled** (2026-09-23). The Evidence lines had not drifted: `RAMP.*.padX` is still at
`EncoreBuilder.jsx:79`–`81`, pricing's `bleedX` is at `EncoreSection.jsx:8944`, and the Lime
L4 notes are at lines 878 and 1231.
- **Code.** One arm in `sectionVm`, after the `d === 2` padding overrides. At `d === 3`, outside
  a column, map / pricing / calendar / form set `vm.padX` to the frame's inset plus the surplus
  (`56 × 0.82` = 45.92, which is the sheets' own `u(56)`, then 30, then 10), rebuild `vm.pad`
  from it, and set `vm.contentW` to match (no layout-4 branch reads it; it is set so it does not
  go stale). No branch changed. Pricing's `bleedX` reads `s.padX`, so its rule still reaches the
  page edges. The calendar's panel stands at the new `padX` with its own 60 / 50 / 10 inside, so
  its content lands on the frame's 116 / 80 / 20. The arm is not theme-gated.
- **Measure after** (`scripts/inset.mjs`, a new sibling of `gutter.mjs`, committed): on
  Retro, Lime and Grunge card 4, every section's text now starts at **56 / 30 / 10** except
  these: the repertoire and the calendar (116 / 80 / 40 and 116 / 80 / 20), which are their own
  inner panels and match the frame; media at 768 (56, its own tablet fit, unchanged and not
  this report); and the footer (78.1 / 40 / 22), which is left at `padX` as decided. At 1600
  every gutter widens by the same 80.6 (136.6 against the sheets' 136.5), so the surplus
  survives. `scrollWidth` equals `clientWidth` at 1600 / 1440 / 768 / 390 on all three themes.
- **Digest** (a HEAD worktree on :5174 against the edit on :5173, themes 0, 1, 2, canvas and
  `live=1`, port normalised): **exactly the 72 named files differ**, map / pricing / calendar /
  form `arch 3` × three themes × three widths × both surfaces. Nothing else moved, including those
  four at `arch` 0–2 and the footer. A theme-3 spot check (pricing, every arch) moved `arch 3`
  alone at all three widths, so Editorial and Pop move as predicted.
- **Docs.** CLAUDE.md's pricing layout-4 sentence, which said the content "keeps the column" of
  the page, now names the frame's inset and the footer. README's desktop-page bullet under *Scope
  boundaries* has one more line. Lime L4 line 1231 has a *reversed* note, and the `bleedX` comment
  in `EncoreSection` gives the new column (1088 / 708 / 370).

Reply: **fixed.** On layout 4, the events map, pricing, Book Us and the enquiry form now inset
their content at the frame's 56 / 30 / 10 like their neighbours, at desktop, tablet (which
disagreed too, 40 against 30) and mobile. The footer is shared with layout 1, sits on every page
and keeps the page gutter, deliberately.


---

## JP-052 — Book Us' right column is the wrong content

> Lime → Stacked → Publish. The Book Us summary card shows *JUN 12 · Thursday · SET Evening ·
> PRICE From £1,200 · TIME 9:00pm*. Where the frame has a package card, there are three dated
> rows with prices (*JUN 14 From £2,400*, *JUN 20 From £1,400*, *JUL 05 From £2,800*). The pill
> is *CHECK A DATE*. Controls: no field edits any of those dates or prices, and replacing every
> Pricing price with a marker changes none of them. Setting *Opens on* to 2026-11-05 still shows
> June and July. The cards take no click (`cursor: auto`). Wizard answers (300 guests, £3,000)
> never reach the summary. Critical under §14 (a visitor sees prices the owner never typed), or
> Major for a prototype.

**Verdict: confirmed, and it is a misreading of the frame, not a styling bug.** Retro's layout-4
pass had the right reading first and talked itself out of it. Its open question 5 read the master
(*"Booking Calendar — D · Enquiry summary stack"*, `964:72844`) as the wizard's output, with the
*"Live band — full / 5-piece + DJ"* row as a pricing package. Then its section-10 lesson
overturned that from `CAL_SLOTS`' own comment ("a date, what the artist plays that night, and what
it starts from"). The code shows that the first reading was right: **the wizard's step 2 asks
exactly the frame's four summary cells**, `guests / length / budget / sound`
(`EncoreBuilder.jsx:1073`–`1077`). Lime's fit inherited Retro's reading (L4 §8 Settled: "the
composed enquiry line taken apart into a 2×2").

Each of the tester's controls follows from that reading:
- **Prices no field edits.** `CAL_SLOTS` (`data.js:807`) is seeded "in the row shape a repeater
  would edit" and has **no editor**. CLAUDE.md says so ("the slot list is the one list-shaped
  content with no editor").
- **June and July whatever *Opens on* says.** Slot dates are the seed's own, 2025. `open` only
  cues which slot is featured.
- **Not clickable.** Every seeded slot is in 2025, so on a 2026 published page every row is
  `dead` (past), which means handlerless by design. The seed is stale, not the handler.
- **The summary card still shows a past cue.** `vm.calCue` lets the past through for Lime
  layout 4 alone (user call, 2026-09-18) so the 2×2 would not vanish. That call was a patch over
  the same misreading.
- **`CAL_SLOTS` is shared with calendar layout 2**, which tables the same four slots with the same
  prices, on every template. The Critical is live there too.

**Evidence.**
- `EncoreBuilder.jsx:1054`–`1063` — `vm.calPick`, `vm.calCue`, `vm.calCta` (`'Check a date'`).
- `EncoreBuilder.jsx:1069`–`1090` — `vm.calWizard`: steps, the step-2 boxes, `date`.
- `EncoreBuilder.jsx:1112` — `vm.calSlots` from `c.slots ?? CAL_SLOTS`. No `FIELDS.calendar.slots`.
- `EncoreSection.jsx:13004` — `Calendar`. `:13022`–`13024` — the hoisted `wStep` / `wType` /
  `wVals`. `:14548` — the wizard's `wAt`. `:14685` — `sendLink = { href: '#' + calBookTo }`.
  `:14737` — the Lime block (`if (s.lime)` inside `if (s.v3)`). `:14747` — `limeWant` /
  `limeHit`, the featured slot.
- Frames: Lime `964:72939` + wizard `964:72938` / `971:5626` + `971:5625` / `977:9200` +
  `977:9199`; Retro `964:72844` + `964:72843` / `964:79434` + `964:79037` / `977:8514` +
  `977:8513`. Re-read the summary card, the date card and the package card on both.

**Decision.** Two questions, asked together.
1. **What the right column is.**
   - **A (recommended). The frame's reading: a live summary of the wizard.** The summary card
     prints the visitor's answers: the event type chip, then guests, set length, budget and sound
     from `wVals`. Its head line comes from the frame's *Summer wedding · Lake District*, so it
     needs a source. Propose the type plus the artist's `location`, and read the frame first. The
     date card prints the wizard's date and the section's `time`, and a `booked` or past date is
     refused there with the prompt. That is what "check a date" means. The package card names a
     package from the **Pricing section** (`vm.tiers`, read across sections the way `identity`
     and `calFlow` read the page), picked in the wizard. It needs a step-2 picker or a
     *Package ›* cycle on the card, so choose one. With no pricing section it is not drawn. The
     pill is `vm.calWizard.send` (Send Enquiry), which JP-053 makes real. **Canvas:** the frame's
     picture needs sample answers. Seed them as the wizard's placeholders (`e.g. 120`, …), which
     `vm.calWizard` already carries, so the canvas prints the frame's example. Live, an unanswered
     cell prints its placeholder in the placeholder style, so the published first paint stays the
     canvas's picture. **No price is ever invented**: the budget is the visitor's, and the package
     price is the artist's own pricing. Moves calendar `arch 3` on themes 0, 1 and 2 (Retro
     reverses its section-10 call). `vm.calCue` goes.
   - **B. Keep the slot list and give it an editor.** A `SlotsField` repeater (`date`, `kind`,
     `price`), the eighth repeater, following the JP-051 pattern, with a current seed. It fixes
     "no field", "stale dates" and "not clickable". It leaves the wizard's answers going nowhere,
     and the card still is not the frame.
2. **Layout 2's slots.** Under A, layout 2 still reads `CAL_SLOTS`. Either **(i, recommended)**
   ship `SlotsField` for layout 2 as well, in this entry. It needs a seed that is not all past
   on a published page, so relate the seed to `CAL_OPEN`, and to `calStart()`'s
   `max(open, today)`, rather than hardcoding 2025. Or **(ii)** leave layout 2 and say in the reply that its slots
   still have no editor. Under B, (i) is the fix itself.

**Decided** (2026-09-23, user call): **1 A, the package picked by a *Package ›* cycle on the
card, 2 (i)**, and JP-053 **A** (the wizard mails, like the form). The frames were re-read
first: Lime's `964:72939` and Retro's `964:72844` carry the same content at 1440 — *Summer
wedding / Lake District · Outdoor / GUESTS 120 / SET LENGTH 4 hrs / BUDGET £1,200 / SOUND
Provided*, then *Sat, June 12 · Arrival 6pm · 9pm*, then *Live band — full · 5-piece + DJ ·
Package ›*, then *Send Enquiry* — and the wizard `964:72938` is step 1 of the same three steps
(`Event / Details / Contact`, `Wedding · Birthday · Corporate · Festival`, `dd / mm / yyyy`).
So the four summary cells are step 2's four boxes, and the head line is step 1's type.

Settled before the code (each changes what gets built):
- **The summary card.** Head line: the picked event type (step 1's chip; the canvas's is chip 0,
  *Wedding*). Under it: the artist's `location` (through `identity`, as today), and the disc
  keeps `image`. The four cells are step 2's boxes. **The canvas prints the frame's bare
  examples** (`120`, `4 hrs`, `£1,200`, `Provided`: each box carries `ph` and a new `eg`). **Live, an
  unanswered cell prints its placeholder with the `e.g.`** (*e.g. £1,200*) at `::placeholder`'s
  .45, so it cannot be read as a quote. That is a named canvas/live diff (rule 5): the canvas
  is the frame's picture of a filled-in wizard, and the live page is an empty one.
- **The date card** reads the wizard's typed date through a **`sectionVm` closure**
  (`vm.calWizard.dateOf(raw)`). It is the form's `formMailto` rule, because the input is the visitor's
  keystrokes. `parseDate` is ISO-only, so `data.js` gains a day-first `parseDayFirst()`
  (`dd / mm / yyyy`, `dd/mm/yyyy`, ISO too). With nothing typed the card shows the section's cue
  (`vm.calPick`, which is `open`, blank when `open` is booked or past), so the canvas reads *Thu, June 12* and
  *Opens on* moves it. Typed but unparseable: the card prints the format hint. Booked or past
  (`dead`, live only): the date shows, and the line under it is refused, reading `calPrompt`. The
  right-hand slot is `vm.calTime`. The frame's *Arrival 6pm* has no source; the line under the
  date is the year.
- **The package card** is the Pricing section's packages, read across sections
  (`pageTiers(sections)` in `data.js`, beside `headerIdentity`, passed as `sectionVm({ tiers })`
  on the canvas, the published tab, `LayoutPicker`, `AddComposer` and `EditPanel`'s previews,
  plus `&tiers=` in the harness, defaulting to the seed). It prints the package's name and **its
  price**. The frame's second line is a line-up (*5-piece + DJ*), but the tester's control is
  "Pricing prices replaced with markers show on the card", and the price is the artist's own.
  That is a named diff. *Package ›* steps and wraps, live only. At one package the card stays and
  the chevron and the handler go (the pager's not-at-one rule). With no packages it is not drawn.
- **One Send.** The column's foot pill is `BookPill` labelled `vm.calWizard.send` on
  `calBookTo`, the same target as the wizard's last-step Send, so JP-053 changes one link.
  `cta` loses its layout-4 seat (`in: [0]`).
- **Layout 2's slots** get `SlotsField` (`{ date, kind, price }`, `SLOT_KEYS`, `blankRow`,
  `slotsVal`, "Empty slots aren't shown."). An absent key resolves as the seed's **day offsets
  from the base date** (0 / +2 / +8 / +23). The base is `open` on the canvas and in the editor, and
  `max(open, today)` by day on the published page, which is layout 1's F20 diff, already accepted. The
  offsets reproduce Jun 12 / 14 / 20 / Jul 05 from `CAL_OPEN`. `slotsVal` materialises the
  canvas's dates on the first edit. Layout 4 no longer reads the slots, so `vm.calCue` goes.
- **`booked` at layout 4** is now read only through a typed date, live. Its hint says so.

**Expected after-diff (named before the code).** Calendar `arch 3` × themes 0, 1, 2 × three
widths × canvas and `live=1` = **18 files**, nothing else. Calendar `arch 1` stays
**byte-identical on both surfaces**: the offsets reproduce the seed's dates, and `&today=` is
opt-in. If `arch 1` moves, the seed resolution is wrong. Base: a HEAD (`4d92ffe`) worktree on
:5174.

**Fix.** Per the decision. Things any version must get right:
- The summary, date and package cards read **only** hoisted state (`wType`, `wVals`, `sel`) and
  vm values. Every string, date format and join is composed in `sectionVm` (`vm.calWizard` grows
  a `summary` shape). `EncoreSection` composes nothing.
- A cross-section read (Pricing's tiers for the package card, and JP-053's address) goes through
  `sectionVm`'s arguments. Name the precedent (`identity`) and resolve it on the canvas, the
  published tab and `LayoutPicker` alike. The harness gets a flag if it needs one (`&who=`'s
  shape).
- `FIELDS.calendar` reach (`in`) re-measured for every key whose seat moved (`image`, `time`,
  `cta` (which loses its layout-4 seat if the pill becomes Send Enquiry), `booked`, `open`).
- Lime's block and Retro's body change together. Grunge's card 4 reads Retro's body flat.

**Verify.** The expected after-diff is named before the code. The tester's controls, re-run:
Pricing prices replaced with markers show on the package card (A). *Opens on* 2026-11-05 moves
what it should. No dated row or price is left that no field edits (`grep` the rendered HTML for
`£` against the fields' values). Live: the wizard's 300 / £3,000 appear in the summary as they
are typed, and a booked or past date is refused in the date card. `n`-style edge cases: no
pricing section, no types, an emptied `time`. Digest: calendar `arch 3` (and `arch 1` under
2(i)) moves, and nothing else does.

**Docs.** CLAUDE.md's calendar paragraph (the layout-4 half is rewritten, and so is the "slot list
has no editor" sentence under 2(i)), README's matching passage, Lime L4 §8 Settled and Retro L4
section 10 (append the reversal with the date, and leave the old text), `CAL_SLOTS`' comment.

**Settled** (2026-09-23). The Evidence lines had drifted by the JP-054 / JP-038 commits
(`vm.calWizard` was at `EncoreBuilder.jsx:1099`, `vm.calSlots` at `:1129`, and the Lime block at
`EncoreSection.jsx:14737`). The frames were re-read at 1440 and agree, Lime's and Retro's.
- **Code.** In `data.js`: `CAL_SLOTS` is four day offsets, and `slotSeed(base)` dates them. `SLOT_KEYS`,
  `parseDayFirst()`, `pageTiers(sections)` (beside `headerIdentity`), `FIELDS.calendar.slots`
  (`in: [1]`), and `cta` down to `in: [0]` as *Button (layout 1)*; the `booked` / `time` hints name
  the new seats. In `sectionVm`: a new `tiers` argument threaded through all five call sites
  (canvas, `PublishedPage`, `LayoutPicker`, `AddComposer`, `EditPanel`); step 2's boxes carry
  `eg`; `vm.calWizard.dateOf(raw)`, a closure, and `.pkg` (*Package ›*); `vm.calPackages`;
  `vm.calCue` gone; and `vm.calSlots` from `c.slots ?? slotSeed(max(open, today-if-live))`,
  blank rows dropped. `SlotsField` + `slotsVal` (the canvas's `open`), with "Empty slots aren’t
  shown.". The harness takes `&tiers=<json>` / `&tiers=none`, defaulting to the seed. In
  `EncoreSection`: `wPkg` appended after `wVals`, and the summary column's content (`sumHead`,
  `sumCells`, `dc`, `pkg`, `onPkg`) resolved once in the shared seam, then painted by Retro's
  body and Lime's block. One `infoRow` each draws the date card and the package card, the frame's
  one repeating element. The foot pill is `W.send`. The slot rows, the featured stat cells,
  `want` / `hit` / `cur` / `feat` and Lime's `limeWant` / `limeHit` are gone from layout 4.
- **Digest** (a HEAD `4d92ffe` worktree on :5174 against the edit on :5173, themes 0, 1, 2, all
  categories, canvas and `live=1`, port normalised): **exactly the 18 named files differ**,
  calendar `arch 3` × three themes × three widths × both surfaces. Calendar `arch 1` is
  byte-identical on both surfaces, so the offset seed reproduces the frame's dates. Retro, Lime
  and Grunge's flat card 4 all moved, as named.
- **Reach** (new `PROBES` rows, themes 0–4): `cta` → layout 1; `time` and `image` → 1 and 4;
  `slots` → 2; `types` and `&tiers` → 4; `open` → all four; `who.location` unchanged. Every row
  matches its `in`.
- **The tester's controls** (puppeteer, harness and real app, Lime card 4 at 1440 and 390, Retro
  and Grunge at 1440). Published first paint: *Pick a date to enquire* (the seeded `open` is past),
  the cells at .45 *e.g.* placeholders, *The House Party £450 Package ›*, and Send Enquiry →
  `#form`. The run: Festival + `14/11/2026` gives *Festival* and *Sat, November 14 · 2026 ·
  9:00pm*. Next, then 300 / 5 hrs / £3,000 / Needed, gives exactly those four in the card. *Package ›*
  gives *The Wedding Set £650*. `01/01/2020` gives *Not available. Pick another date*, dimmed. `next week`
  gives the format hint. `2026-11-14` is accepted. Harness: `&booked=2026-11-14` refuses it. `open=2026-11-05` gives
  *Thu, November 5* on the canvas and live. `&tiers` markers show on the card. One package drops the
  chevron and the pointer. `&tiers=none` drops the card. Emptied `types` heads the card with the name,
  and emptied `time` drops the end. The only `£` in the column is the visitor's, the placeholder's
  *e.g.*, or the Pricing section's. Real editor: a Pricing price set to `ZZ£450` reaches the
  canvas card and the republished card. On Lime card 2, *Dates on offer* lists 2025-06-12 / 14
  / 20 / 07-05, an edited price reaches the canvas, and *Add slot* prints the blank hint.
  `scrollWidth` holds, and there are no page errors anywhere.
- **Named diffs.** The canvas prints the frame's examples where live prints *e.g.* placeholders.
  The package card's second line is the price, where the frame's is a line-up. The date card's
  line is the year, where the frame's *Arrival 6pm* has no source. Published slots and the
  published date card follow `max(open, today)`, layout 1's F20 diff.
- **Docs.** CLAUDE.md (the closures sentence, the `s.live` list, the calendar paragraph's layout-2
  seed and the whole layout-4 half, the Lime past-row exception, and the repeater counts to eight
  with `SLOT_KEYS` / `slotsVal`). README (the closures sentence, a slots-and-summary paragraph,
  the blank-row list). Lime L4 §8 and Retro L4 section 10 have *Reversed* notes, and `CAL_SLOTS`
  has a new comment.

Reply: **fixed.** Book Us' right column is now the wizard's summary, as the frame reads. It shows
the visitor's event type and answers as they type them, the date they asked about (a booked or
past date is refused), and a package from the artist's own Pricing section (*Package ›* cycles).
No date or price appears that the artist did not type. Layout 2's slots now have an editor
(*Dates on offer*) and a seed that is never all past. Sending the enquiry is JP-053.

---

## JP-053 — the wizard's Send Enquiry loses what the visitor typed

> Book Us → Festival, 14/11/2026 → Next Step; 300 / 5 hrs / £3,000 / Needed → Next Step; name and
> email → Send Enquiry. Expected: the enquiry is sent (a `mailto:` like the form's) or carried
> into the form, then confirmed. Actual: Send Enquiry is `<a href="#form">`. The form below is
> empty (0 of 5), its mailto carries nothing from the wizard, and the wizard stays on *Step 3 of
> 3*. Major.

**Verdict: confirmed.** CLAUDE.md documents it ("the last step's Send Enquiry is a fragment link
to `calBookTo` — the section has no address to mail"), but the tester's point stands: the
visitor finishes a three-step form and nothing records or confirms it.

**Evidence.** `EncoreSection.jsx:14685` — `sendLink`. `data.js` — `enquiryMailto()`,
`emailProblem()` and `formErrors()` (JP-049's one email test). `EncoreBuilder.jsx:1340`-ish — the
form's `vm.formMailto` / `vm.formCheck` closures, which are the only function-valued vm keys.

**Decision** (asked in entry 4, with JP-052's):
- **A (recommended). The wizard mails, like the form.** Send Enquiry is an `<a href="mailto:">`
  composed by `enquiryMailto()` over the wizard's answers (type, date, the four details, and the
  package under JP-052 A), addressed to the **enquiry form section's `email`**, read across
  sections through `sectionVm` (JP-052's cross-section read). That makes the calendar the second
  section with function-valued vm keys (`vm.calMailto` / `vm.calCheck`), and CLAUDE.md's "the
  only function-valued keys" sentence changes. Step 3 checks name and email with `formErrors()`'
  rules. A valid send swaps the wizard card for a confirmation that prints the address in plain
  text, with a *Start again* that keeps the answers (the form's *Write another*). With no form
  section, or no valid address, the pill stays a span (the Soundcloud rule).
- **B. Carry the answers into the form below.** Send Enquiry scrolls to `#form` with the boxes
  filled. Sections share no state, so `PublishedPage` would have to own the wizard's values and
  pass them to the form, which is a new cross-section live channel with no precedent. Not
  recommended.
- **C. Give the calendar its own `email` field.** That is a second copy of the one address the
  whole page points at. Not recommended.

**Decided** (2026-09-23, user call, asked in entry 4): **A.** JP-052 left both Send Enquiry
pills (the wizard's last step and the column's foot) on the one `calBookTo` fragment, so this
entry changes one link. `vm.calWizard.dateOf` already made the calendar the second section
with a function-valued vm key, and CLAUDE.md's sentence already names it, so this entry adds
`calMailto` / `calCheck` to it.

**Fix (on A).** `<a href>`, never a `<form>` (CLAUDE.md's load-bearing rule: Enter in a box would
post to `<base href>`). Errors are `useState`, cleared per box. There is no effect, as in the rest
of the file. The confirmation is a state of the wizard card only; the summary column does not
move.

**Verify.** Live, themes 0, 1 and 2, at 1440 and 390: the tester's run composes
`mailto:<form email>?subject=…&body=` carrying Festival, 14/11/2026, 300, 5 hrs, £3,000, Needed,
the name and the email (read off `getAttribute('href')`, with a capture-phase `preventDefault`).
An empty name, or `not-an-email`, is refused in place. After the send, the confirmation shows and
*Start again* returns to step 1 with the answers. With the form section deleted, or its email
emptied, the pill is a span. Canvas unchanged except where JP-052 already moved it.

**Docs.** CLAUDE.md's calendar layout-4 wizard sentences and the architectural rule's "only
function-valued keys" sentence, README's matching passage.

**Settled** (2026-09-23). The Evidence lines had drifted with JP-052: `sendLink` was at
`EncoreSection.jsx:14663`, the Lime block's foot `BookPill` at `:14939` and Retro's at `:15031`,
`vm.formMailto` / `vm.formCheck` at `EncoreBuilder.jsx:1483`–`1489`, and `enquiryMailto()` /
`emailProblem()` / `formErrors()` at `data.js:1582` / `:1528` / `:1606`.
- **Expected after-diff, named before the code: zero digest files** on both surfaces. The digest
  records no `href`, the canvas's `sendLink` is null, and live both Send pills were already `<a>`
  (to `#form`), so the tag does not change either.
- **Code.** In `data.js`: `FORM_EMAIL` (the seed, now also `FIELDS.form.email`'s `d`, whose hint
  names the wizard) and `pageEmail(sections)` beside `pageTiers`, which resolves exactly what the
  form's `vm.formEmail` does and is `''` with no form section. In `sectionVm`: an `email` argument
  threaded beside `tiers` through the same five call sites, plus `&email=<address>` / `&email=` /
  `&email=none` in `preview.jsx`. `vm.calEmail`, and `sentTitle` / `sentBody` / `again` (*Start
  again*) / `prompt` on `vm.calWizard`. `vm.calMailto({ ti, vals, pi })` composes through
  `enquiryMailto()` with the **raw** labels (`wizSteps`' own, as the form's labels stay raw) and the
  raw package off `tiers` (`name · price`). The date goes as typed. `vm.calCheck({ vals })` is
  `formErrors()` over name (text) and email (email), keyed `{ name, email }`. In `EncoreSection`:
  `wErrs` / `wSent` appended after `wPkg`, and one send seam in the shared body (`sendHref`,
  `onSend`, `onAgain`, `setBox`, `refused`, `wPrompt`) that Retro's body and Lime's block both paint.
  The wizard's `NextTag` and the foot `BookPill` share `sendHref`. The foot pill sends from any
  step, and a refusal there walks to step 3. A refused box is Retro's hairline doubled inside, or
  Lime's `inset 0 0 0 2px s.tx`. The prompt stands under the buttons while a box is still marked.
  The confirmation replaces the card's parts: the title, the line, the address in plain text and
  *Start again* on the Back pill. **Two shared seams moved, both additive in effect**: `extLink()`
  gives a `mailto:` / `tel:` no `target` (the form's rule, since a mailto in a new tab leaves an
  empty tab behind), which is what lets the foot pill take `BookPill`'s `ext`. A footer mailto row
  gets the same fix, and so does a gig's tickets link. `BookPill` also gained `onClick`. Both were
  chosen over a second href prop on `BookPill`, so a mailto has one rule wherever it is linked.
- **Digest** (a HEAD `240d0aa` worktree on :5174 against the edit on :5173, themes 0, 1, 2, all
  categories, three widths, port normalised): **0 of 387 files differ on the canvas, and 0 of 387
  with `&live=1`**, as named.
- **Live run** (puppeteer in the `live=1` harness, themes 0, 1, 2 at 1440 and 390, capture-phase
  `preventDefault` on mailto). Festival, then `14/11/2026`, then 300 / 5 hrs / £3,000 / Needed,
  then *Package ›*, then Ana Lopes / `ana@example.com` gives `mailto:bookings@kaimercer.co.uk`,
  subject *Festival enquiry*, and the body *Approx. date: 14/11/2026 / Guests: 300 / Set length:
  5 hrs / Budget: £3,000 / Sound: Needed / Package: The Wedding Set · £650 / Name: Ana Lopes /
  Email: ana@example.com*. Both pills carry the same href, with no `target`. An empty send is
  refused in place: both boxes are ringed, the prompt shows, and the wizard stays on step 3.
  Typing the name clears its ring alone. `not-an-email` is refused, with the email ring kept.
  A valid send shows the confirmation with the address. The summary keeps 300 / £3,000, and the
  foot pill turns to a span. *Start again* returns to step 1 with `14/11/2026` still typed. The
  foot pill clicked on step 1 walks to step 3 and marks the boxes. `&email=none`, `&email=` and
  `&email=not-an-email` leave both pills spans at every theme. There were no page errors.
  Screenshots of the refused and sent states (Lime 1440, Retro 390) read right.
- **Real app** (Lime card 4, then Retro card 4, at a 1600 window: *Publish*, *Open*, the run in the
  popup). The first paint's foot pill is `mailto:bookings@kaimercer.co.uk`. The run composes the
  body above, with the real Pricing section's *The House Party · £450*. After the confirmation and
  *Start again* the pills are links again. Then the form's email: emptied, the pills are spans.
  `not-an-email` gives spans. `me@band.co` gives `mailto:me@band.co`. Deleting the form section
  gives spans. There were no errors. One trap: the popup keeps its React state across a
  republish, so a wizard left in its sent state reads as spans. Press *Start again* before the
  next check.
- **Named diffs.** At 768 and 390 the summary column stacks under the wizard card, so it rides up
  while the shorter confirmation card shows. At 1440 the grid holds it still. `reach.mjs` was not
  re-run, because no `in` moved (`email` has none; only its hint changed).
- **Docs.** CLAUDE.md: the closures sentence gains `calMailto` / `calCheck`. The layout-4 wizard
  passage loses "the section has no address to mail", gains the send paragraph, and the foot
  pill is now "on the same mailto". README: the closures sentence and the summary paragraph.
  The comments on `vm.formMailto`, the calendar's `v3` head and the foot pill are rewritten.

Reply: **fixed.** The wizard's Send Enquiry (on the last step, and the pill under the summary)
now opens the visitor's mail app with the enquiry addressed to the Enquiry Form's email. It
carries the event type, the date, guests, set length, budget, sound, the package, the name and
the email. It is refused until a name and a valid email are in, and then it confirms in place,
with *Start again*. With no Enquiry Form on the page, or no valid address in it, the pill is not a
link.

---

## End-of-pass sweep

1. Full digest, all categories × themes 0, 1, 2 × three widths × canvas and `live=1`, against
   `main` (worktree on :5174, port normalised). Every diff is one a Settled above names.
2. The repro digest: every `&cj=` override the entries used, re-run on the final tree.
3. `reach.mjs 0,1,2` if any `in` moved: 0 mismatches.
4. Walk card 4 of Lime's setup modal in the real app and the published tab at 1440 / 768 / 390,
   repeating the tester's steps: a blank track and gig, the form's copy, the section insets, and
   the wizard end to end to its `mailto:`. Then Retro's card 4 once.
5. `npm run build:standalone`, `cp source/dist-standalone/index.html index.html`, its own commit.
6. `plans/README.md`'s row, and a reply line per ticket for QA (fixed / by design / needs PO),
   headed by the retest-against-the-stamp line. Include one line for the re-reported JP-048,
   JP-049, JP-050 and JP-051: **fixed in PR #31, deployed 2026-09-23 12:53:20 GMT; the report's
   symptoms (an empty h1, Kai Mercer ×12, blank packages and fields, `mailto:not-an-email`) are
   the pre-fix build's.** Add a JP-038 line that separates the gutter (decided and shipped:
   the published zoom) from this batch's section-inset finding.

**Settled.** —
