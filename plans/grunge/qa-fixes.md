# Grunge QA fixes — bug-by-bug plan

Working checklist for the tester's first batch against the **Grunge template, layout 1** (card 1
of the setup modal, *Hero spread*): JP-056, JP-057 and JP-058. It works like
[`../lime/retest-qa-fixes.md`](../lime/retest-qa-fixes.md): **one entry per session, with context
cleared between sessions**, and each session writes what it settled back into this file.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then *How each
session runs* and *Verification harness* in `../retro/qa-fixes.md` (the `&cj=` harness), then the
memory notes `verifying-the-published-tab` and `browser-tool-choice`.
[`layout-1.md`](./layout-1.md) holds the Figma node ids of every Grunge layout-1 frame (its
*Sections* table). Its *Settled in session 0* and *Settled in section 1* hold the font call that
JP-056 asks about again.

Branch: **`grunge-qa-fixes`, forked from `main`** (`8a8d3ed`, after PR #37). One commit per entry
(`Fix JP-058: …`).

**The tester's build is current.** At triage (2026-09-28) the Pages build's `last-modified` was
`Mon, 28 Sep 2026 08:20:45 GMT`, 8,748,639 bytes, which is byte-identical in size to `main`'s
root `index.html` (`b7e4a8c`, the Editorial layout-3 refresh). So all three reports reproduce on
HEAD. None is a stale-build echo.

**Two of the three are not Grunge's.**
- **JP-058** is the pricing card's price split. It is one regex, copied into six sites, so it hits
  **every template** at pricing layouts 1, 2 and 3.
- **JP-057** is `SealBadge`. All three seal branches with equator marks have it: Retro's §10.2
  seal, the Lime / Grunge disc and Editorial's arm. Pop's starburst has no marks, so it does not.
- **Only JP-056 is Grunge's**, and it is a question for design, not a defect.

## The report (translated)

> **JP-056 — Medium — Grunge headings use a plain font instead of the distressed one.** Dev Mode
> names Display/XL with `--font-display` Stones Crush, a worn face. The build sets the hero title,
> the other heads, the nav, the track and song titles and the button labels in Anton, a clean
> face, and "the page code has no reference to Stones Crush anywhere". Every section, three
> widths. The tester asks design: is there a web licence, and if not, which substitute? No AC.
>
> **JP-057 — Medium — the seal's circles sit on the letters of the name.** Design: the name runs
> round the ring *between* the two small circles. Build: both circles land on letters
> ("STAT◯C"). All four seals (header, bio, pricing, footer), three widths. The Title was set to
> the design's own "Static Youth" and the overlap stays, "so it isn't about the name's length".
> No AC.
>
> **JP-058 — Medium — Pricing splits the price's first character off as a currency sign.**
> Price `From £1,200` → Publish shows a small `F` and a big `rom £1,200`. `£650` is right.
> `450` gets no sign at all. The placeholder is `£450`, no hint limits the format, the 16.09 rule
> says a price may be fixed or a range, and the calendar's own sample prices read
> `From £1,200`. Other templates and pricing layouts were not checked. No AC.

## Status

| Order | ID | Report (short) | Verdict | Size | Decision needed? | Status |
|---|---|---|---|---|---|---|
| 1 | JP-058 | `From £1,200` prints as a small `F` + `rom £1,200` | **Confirmed, and shared**: `/^[^\d]/` takes the first character of any price that does not start with a digit, in six sites (pricing layouts 1–3, every template) | S | **user: B, everything before the first digit** | **done** |
| 2 | JP-057 | The seal's two small circles sit on the name's letters | **Confirmed, and shared**: only the name ring spins (`.seal-spin`, 14 s), and the marks stand still, so the name walks through them. At rotation 0 the picture is the frame's | S–M | **user: A, the marks spin with the name** | **done** |
| 3 | JP-056 | Headings set in Anton, not the distressed Stones Crush | **By design so far**: Anton is the named stand-in (user call, 2026-09-21). The tester's licence question is real and is the PO's to carry | — (reply) | **user: A, a reply naming the stand-in** | **done** (reply; licence with the PO) |
| 4 | — | End-of-pass sweep | — | S | — | **done** |

**Why this order:** JP-058 is the smallest diff and should prove a zero seeded diff. JP-057
changes a shared helper and has a predictable digest after-diff. JP-056 goes last and inside this
batch is **a decision and a reply only**. If the answer is a licence (B) or a mask (C), it leaves
this batch for its own plan file (`plans/grunge/display-face.md`). Either one moves every Grunge
digest at all four layouts, and the two shared fixes want a clean base to digest against.

**"Decision needed"** means the entry lists options with a recommendation. The session starts by
asking the user (one `AskUserQuestion`) and records the answer under **Decided** before writing
code.

## How each session runs

As `../lime/retest-qa-fixes.md`, with these differences:

1. Re-check the *Evidence* line numbers. They are from the triage (2026-09-28, `8a8d3ed`).
2. **Themes per entry, not 0, 1, 2 by habit.** JP-058's six sites are read by every template, Pop
   included, so it digests themes **0–4**. JP-057's three branches are Retro, Lime / Grunge and
   Editorial, so it digests themes **0–3**. `digest.mjs`'s default theme list is `0,2,3,4`, which
   **skips Lime**. Always pass the list explicitly.
3. Verify at **all three widths** and on **both surfaces** (canvas and `live=1`). Digest against a
   **HEAD worktree** on :5174 (`node_modules` symlinked, port normalised in `background-image`
   URLs). **Name the expected after-diff before writing code.**
4. **`digest.mjs` skips `.seal-spin`** (a running animation). Anything under it is proved by
   shots with the spin stopped (reduced motion, or `document.getAnimations()` with a set
   `currentTime`), per CONVENTIONS' *Measure anything under `.seal-spin` with the animation
   stopped*.
5. Drive anything live-only in the popup from the opener, per `verifying-the-published-tab`.
6. Update the docs the entry names. Commit, fill in **Settled** and the status row, then print
   the hand-off prompt for the next entry and stop.

**Do not refresh the root `index.html` per bug.** The sweep does it once.

---

## JP-058 — the price's first character is split off as a currency sign

**Verdict: confirmed, and not Grunge's.** Every pricing layout that draws the frame's small
currency sign beside a big numeral finds it the same way: *whatever the first character is, if it
is not a digit*. `£650` works by luck, `From £1,200` gives `F` + `rom £1,200`, and `POA` would give
`P` + `OA`. A price is free text (`TiersField`'s placeholder is `£450`, and `FIELDS.pricing.tiers`
names no format), and the calendar's own seed prices read `From £1,200` (`CAL_SLOTS`,
`data.js:1016`). So the report is right: the split assumes a format the field never asked for.

**Evidence.**
- `EncoreSection.jsx`, six copies of the same three lines
  (`const symbol = /^[^\d]/.test(money) ? money[0] : ''`, then
  `amount = symbol ? money.slice(1) : money`):
  - layout 1: `:8352` (the `s.limeTree` block, which Lime, Grunge and Editorial draw) and `:8518`
    (the shared body: Retro and Pop);
  - layout 2: `:8815` (the `s.limeTree` block) and `:9085` (the shared body);
  - layout 3: `:9472` (the `s.limeTree` block) and `:9714` (the shared body).
- Three of those numerals are `whiteSpace: 'nowrap'` at display size: `:8406`, `:8900` and `:9516`
  (the `s.limeTree` blocks). That matters for option A below.
- Pricing layout 4 (`:10110`, `:10258`, `:10330`) prints `t.price` whole, so it has no bug. So do
  the calendar's package card (`pkg.price`, `:16106`) and the form's price row (`s.formPrice`,
  `:23153`).
- `EncoreBuilder.jsx:897`: `vm.tiers[].price` is the trimmed string, and `sectionVm` does no split.
  The split is composition work in `EncoreSection`, which CLAUDE.md says composes nothing.
- The seed (`TIERS`, `data.js:689`–`696`) is `£450`, `£650`, `£1,200`. Every seeded price starts
  with the sign, so the seeded picture never showed the bug.

**Decision.** What goes in the small seat?
- **A. A leading currency sign only** (`/^\p{Sc}/u`). `£650` → `£` + `650`. `From £1,200` → no
  split, and the whole string sits in the numeral seat. `450` and `POA` → no split. This is the
  smallest rule, and it is the frame's own reading (the seat holds a currency sign). Its cost:
  `From £1,200` sits whole in a `nowrap` display-size seat, so before recommending it the
  session measures `scrollWidth` at 390 for layouts 1–3 × themes 0–4 with that price.
- **B (recommended). Everything before the first digit, when there is a digit.** `£650` → `£` +
  `650`. `From £1,200` → `From £` + `1,200`. `450` → no split. `POA` / `On request` (no digit) →
  no split, whole in the numeral seat. This keeps the frame's hierarchy for the one non-bare
  format this app itself seeds (the calendar's `From £…`), and it keeps the numeral short in
  the `nowrap` seats. A named oddity: `Up to 120 guests: £900` splits at the `1`
  (`Up to` + `120 guests: £900`). Name it and do not fix it.
- **C. Never split.** The whole price always sits in the numeral seat. That is the frame's
  picture broken for every seeded price, so it is not recommended.

**Decided** (2026-09-28, user call): **B**, everything before the first digit, trimmed. No digit
means no split. The `Up to 120 guests: £900` oddity is named and left alone.

**Fix (either A or B).** The split moves out of `EncoreSection`:
- A pure helper in `data.js` beside `tierFeats()` (for example `priceParts(raw)` →
  `{ lead, amount }`).
- In `sectionVm`, `vm.tiers[]` gains two keys **beside** `price`, not in place of it. Layout 4,
  the calendar's package card (`pageTiers`) and the calendar's mailto still read the whole
  string.
- The six sites read `t.lead` / `t.amount`, and the regex goes. Each site keeps its own markup:
  the `!!symbol &&` guards become `!!t.lead &&`. Two shared bodies render the symbol span with no
  guard (layout 1 at `:8589`, layout 2 at `:9143`), so an empty lead there is an empty span in the
  row's gap today. Keep that as it is, or guard it and name the diff it causes for bare prices
  such as `450`.
- `EncoreSection` stays free of string work.
- If B, the lead is trimmed, so `From £` keeps its inner space and loses a trailing one, and the
  row's own gap does the spacing.

**Expected after-diff (named before the code): zero** on both surfaces, themes 0–4, all pricing
`arch`, because every seeded price starts with its sign. The proof is the repro set below.

**Verify.**
- **The seed.** Digest pricing, themes 0–4, three widths, canvas and `live=1`, against a HEAD
  worktree: byte-identical.
- **The repro set**, by `&cj=` over pricing's `tiers`, for every `arch` × themes 0–4 × three
  widths:
  - `From £1,200` → under B, a small `From £` and a big `1,200`;
  - `450` → no small seat;
  - `£650` → unchanged from the seed;
  - `POA` → no split;
  - `£1,200–£2,000` → `£` + `1,200–£2,000`;
  - an all-spaces price → no small seat and no stray span.
  Read the result off the DOM (the lead span's text, and the numeral's), not only the digest.
- `scrollWidth` equals the width at 390 for `From £1,200` and for `£1,200–£2,000`, at layouts
  1–3 × themes 0–4.
- **The tester's steps**, in the real app on Grunge card 1: Pricing → a package's Price =
  `From £1,200` → Publish → Open. Check 1440 and 390.
- Also check Lime and Retro once, since the tester did not.

**Docs.**
- CLAUDE.md, if the pricing paragraph names the numeral's seat. Otherwise nothing, since the
  behaviour was never documented.
- README, only if it describes the card's price row.
- The hint on `FIELDS.pricing.tiers` should say, in one clause, what the small seat takes (for
  example "a currency sign or a word like *From* before the amount prints small").

**Settled** (2026-09-28). The Evidence held, one line lower throughout: the six sites at `:8353`,
`:8519`, `:8816`, `:9086`, `:9473` and `:9715`, and the unguarded spans at `:8592` and `:9143`.
- **Code.** `priceParts()` sits in `data.js` beside `tierFeats()`. `vm.tiers[]` spreads its
  `lead` and `amount` beside `price`, which stays whole for layout 4, the calendar's package card
  and its mailto. The six sites read `t.lead` / `t.amount`, and the regex is gone, so
  `EncoreSection` does no string work here. The two unguarded lead spans (Retro and Pop's shared
  bodies, layouts 1 and 2) are now `!!lead &&`, like the `s.limeTree` twins.
- **One layout change beyond the extraction.** In Retro and Pop's layout-1 row the lead is
  `nowrap` and the row is `flexWrap: 'wrap'`. The 768 card, three to a row, has 218px. There
  `From £` + `1,200` + `/event` does not fit, and the lead broke to `From` over a dangling `£`.
  Now the unit takes the second line. `nowrap` alone would push the row past the card.
- **Docs.** The layout-3 comment that called the first-character split "deliberately not
  corrected" was rewritten. `FIELDS.pricing.tiers`' hint gained one clause. CLAUDE.md and the
  README name neither the seat nor the split, so neither changed.
- **The seed.** The digest ran over pricing × themes 0–4 × three widths × canvas and `live=1`,
  against a HEAD worktree on :5174. **0 of 120 files differ**, as named. The unedited tree
  diffed 0 of 60 against HEAD first, which proved the harness.
- **The repro digest.** Three packages at one price, 60 renders per price per surface:
  `&cj=` is `{ unit: '/UNIT', tiers: ['A', 'B', 'C'].map((name) => ({ name, price, tags: '' })) }`
  through `EXTRA` to `digest.mjs … 0,1,2,3,4 pricing` on both servers, one label per price.
  Canvas and live gave the same counts:
  - `From £1,200` and `POA`: 45 each, which is arch 0–2 at every theme and width, and arch 3
    zero.
  - `£650`: 0.
  - `450` and an all-spaces price: 12 each, all Retro and Pop at arch 0–1. The empty 0×0 lead
    span leaves, and the numeral moves into its gap.
  - `£1,200–£2,000`: 3, from the wrap above (Retro 768 and 390, Pop 768).
- **Off the DOM.** `From £1,200` reads `From £` + `1,200` in all 105 rows (themes 0–4 × arch 0–2
  × three widths). No lead or numeral wraps, and nothing passes its card with the seeded unit.
  HEAD at 768 broke the display numeral `rom £1,200` over two lines under Retro and Pop, and
  pushed it 6–30px past the card under Lime, Grunge and Editorial. `POA` and `450` stand whole.
  The all-spaces price draws no lead span. No 390 render overflows the page for either
  `From £1,200` or the range.
- **The tester's steps.** Grunge, Lime and Retro card 1: Pricing, the first package's Price =
  `From £1,200`, Publish, Open. At 1440 and 390 the published row reads `From £` | `1,200` |
  `/event`, `£650` is unchanged, nothing overflows, and there are no errors.
- **Named, not fixed.**
  - A range at Retro and Pop's layout-1 768 card: the numeral is wider than the card, so the `£`
    now takes the first line alone, above the numeral's two lines. HEAD set the `£` beside them.
    At Retro 390 the range got better: one line with the unit under it, where HEAD pushed the
    unit to the right edge.
  - An empty price still prints an empty numeral before the unit in layouts 1 and 2, on every
    template, as before. Layout 3 drops the row.
  - `Up to 120 guests: £900` splits at the `1`, per the decision.
  - **Closed by JP-074** ([`layout-3-qa-fixes.md`](./layout-3-qa-fixes.md), 2026-09-28): the
    first bullet above. `priceParts()` gained a `tail`, so the numeral is the first number alone
    and a range's second half sets small beside it. At that card the numeral is one line again.

Reply: **fixed.** The small seat beside a package's big price now takes everything before the
price's first digit, so `From £1,200` prints a small `From £` and a big `1,200`. A price with no
digit (`POA`) or that starts with one (`450`) prints whole in the big seat. This was every
template's bug at pricing layouts 1–3, not Grunge's, and the fix covers all of them.

---

## JP-057 — the seal's circles sit on the letters of the name

**Verdict: confirmed. The cause is the spin, not the layout and not the name's length**, which
bears out the tester's own control.
- Every seal with equator marks draws the name inside `<g className="seal-spin">`, which turns
  at `14s linear infinite` (`index.css:150`, SPEC §10.2).
- The two small marks are drawn **outside** that group, so they stand still while the name
  sweeps through them twice a turn.
- At rotation 0 the picture is the frame's: the name is centred at 6 and 12 o'clock
  (`startOffset` 25% and 75% on a counter-clockwise path from 9 o'clock), and the marks sit at 9
  and 3 o'clock. Under `prefers-reduced-motion` the spin stops and the seal reads as the design
  does.
- The tester's screenshot is simply a frame of the animation.

The frames are static, so they cannot say whether the seal should spin. The spin is SPEC §10.2's
("the whole seal sits a third of a turn off square; only the type ring spins"), and it predates
every designed template's marks.

**Evidence.**
- `EncoreSection.jsx:983`: `SealBadge`. Its three branches with equator marks:
  - **Editorial** (`:1058`): the marks are `<circle>`s at `:1074`–`1075`, outside the spin group
    at `:1079`.
  - **Lime / Grunge** (`:1091`): the marks at `:1108`–`1109`, outside the spin group at `:1116`.
  - **Retro §10.2** (`:1162`; `classic` callers under the other templates too, such as Lime's
    and Grunge's layout-3 bio at `:4586`). The spin group is at `:1182`, and the two asterisk
    marks at `:1209`–`1218` are outside it. The name runs at r 36 with the marks at r 33.5–44.5,
    so this branch overlaps too. The tester did not see it because they tested Grunge.
- The flat starburst (`:1129`, Pop) has no marks. The whole starburst spins, so it is unaffected.
- Seal call sites at triage:
  - `HeaderV0` `:1763`, `:1791`;
  - `HeaderV1` `:2348`;
  - `HeaderV3` `:3328`, `:3504`;
  - `HeaderV4` `:3575`;
  - `HeaderV5` `:3612`;
  - the bio `:3860` (layout 1, `s.limeTree`), `:3935` (layout 1, the shared body), `:4586`
    (layout 3, `s.limeTree`) and `:4832` (layout 3, the shared body);
  - pricing `:8458` (layout 1, `s.limeTree`);
  - the calendar `:14881`;
  - the footer `:25110` (`s.limeTree`) and `:25278`.
  The session turns that list into a per-template, per-layout table for the digest's named
  after-diff. Under Grunge: layout 1 has the header, bio, pricing and footer seals; layout 2 the
  footer's; layout 3 the bio's (`classic`) and the footer's; layout 4 the header's and the
  footer's.
- Frames: the Grunge bio's seal `964:58600` "Frame 178". The footer's `964:58610` is the same
  component. Read both once at rotation 0 to confirm the static geometry above.

**Decision.** How should the marks and the name relate while the seal turns?
- **A (recommended). The marks spin with the name.** Move the two marks into the `seal-spin`
  group in all three branches. The disc, the outer ring and the centre (Grunge's reticle,
  Editorial's sparkle, Retro's asterisk or globe) stay still. The type ring and its punctuation
  turn as one, so the frame's relationship holds at every instant. The reduced-motion picture is
  unchanged, and so is the SPEC's spin. Every template moves the same way.
- **B. Stop the spin on the designed templates.** Drop `seal-spin` from the three branches (Pop's
  starburst keeps it). That matches the static frames exactly, but it removes a SPEC §10.2
  behaviour, and it is a design call rather than a fix.
- **C. Spin the whole seal**, centre included. The reticle's four ticks and Editorial's sparkle
  would visibly turn, which no frame suggests. Not recommended.

**Decided** (2026-09-28, user call): **A**, the marks spin with the name. The disc, the outer
ring and the centre stay still.

**A sub-point to record, not to fix: the long-name edge.** At rotation 0, a name whose arc is
longer than the half-circle minus a mark's width still reaches the marks, whatever spins. The
tester's control shows that length is not this bug. The session measures the longest name that
fits between the marks in each face (Anton at `faced` 14.05 tracked 4.21, Bebas under Lime,
Space Mono at 8.46 tracked 2.54, Retro's label face at 9 tracked 1.4) and records it. Squeezing a
long name with `textLength` is a possible later option. Do not do it in a QA pass.

**Expected after-diff (named before the code, on A).** `digest.mjs` skips `.seal-spin`, so moving
the marks inside it makes their rows **disappear** from every section that carries a seal, on
themes 0–3. The diff is **deletions only**, and every deleted row is a mark (`circle`, or Retro's
`line`s). A row that *changes* instead of vanishing means some geometry moved, and that is a
failure. List the expected sections per theme (from the call-site table) before running.

**The call-site table, as rendered** (a census of every `.seal-spin` on the HEAD harness, all
categories × `arch` × three widths × themes 0–4 × canvas and `live=1`, 188 renders with a seal,
exactly one seal in each). The branch is the one `SealBadge` takes:

| Theme | Sections carrying a marked seal (`arch`) | Branch | Files per surface |
|---|---|---|---|
| 0 Retro | header 0, 1, 3, 4, 5; bio 0, 2; footer 0 and `page=2`, at three widths; calendar 0 at 1440 and 768 only (`!s.mob`) | §10.2 | 29 |
| 1 Lime | header 3; bio 0; footer 0 and `page=2` | Lime / Grunge | 12 |
| 1 Lime | bio 2 (`classic`) | §10.2 | 3 |
| 2 Grunge | header 0, 3, 4; bio 0, 2; pricing 0; footer 0 and `page=2` | Lime / Grunge | 24 |
| 3 Editorial | header 3; bio 0; footer 0 and `page=2` | Editorial | 12 |
| 4 Pop | bio 0, 2; calendar 0; footer 0 and `page=2` | starburst, no marks | 0 |

Grunge's layout-1 page is the tester's four: header 0, bio 0, pricing 0, footer 0.

**The named after-diff:** **160 files** of the 1,056 (80 of 528 per surface) that themes 0–3
render, and each
diff is **deletions only**:
- the Lime / Grunge and Editorial branches: **2 rows**, the two mark `CIRCLE`s. They have to
  carry `fill="none"` and the stroke into the spin group with them. The outer ring bounds its
  group, so the group's row does not move.
- the §10.2 branch: **10 rows**. That is the marks' `G` and its 8 `LINE`s, plus the
  `<g stroke={ink} strokeLinecap="round">` wrapper they shared with the centre glyph. With the
  marks gone, that wrapper's box would shrink to the glyph's, so its row would *change*. So the
  wrapper goes, and its stroke and linecap move onto the glyph's own group. The digest records
  no stroke, so the glyph's rows stay byte-identical.
- The paint order is kept. Lime / Grunge and Editorial draw the marks before the name, so they
  go first in the spin group. The §10.2 branch draws them after it, so they go after the
  `<text>`.
- Pop: zero, and so is every other file.

**Verify (on A).**
- **Static.** Shots under reduced motion, before and after, of every seal Grunge draws (layout 1
  at three widths, plus one seal each from layouts 2–4), and one seal each under Retro, Lime and
  Editorial. They must be pixel-identical. Rotation 0 is the frame's picture.
- **In motion.** With the animation running, set `document.getAnimations()`' `currentTime` to 0,
  ¼, ½ and ¾ of 14 s and shoot the four Grunge layout-1 seals. In every phase the marks must sit
  between the two names.
- **The outer ring.** Confirm it stays concentric. That guards the group's
  `transformOrigin: '50% 50%'`: on an SVG `<g>` it resolves against the viewBox, but confirm it
  rather than assume it.
- **The tester's control.** Title = `Static Youth` and the seeded `Kai Mercer`, published tab,
  1440 and 390.
- **The digest.** Deletions only, exactly the named sections.

**Docs.**
- `SealBadge`'s §10.2 comment (`:1162`–`1164`, "only the type ring spins") and the Lime / Grunge
  and Editorial comments, which should say the marks turn with the name.
- CONVENTIONS' *Measure anything under `.seal-spin`* row, which should say it now covers the
  marks too.
- CLAUDE.md and README only if they describe the seal's spin (grep `spin`).
- SPEC is history. Do not edit it.

**Settled** (2026-09-28). The Evidence held. `SealBadge` has not moved (`:983`, with its branches
at `:1058`, `:1091` and `:1162`). The call sites below pricing are where the hand-off put them:
pricing `:8455`, the calendar `:14868`, the footer `:25097` / `:25265`.
- **Code.** The change is in the three branches with marks, and Pop's starburst is untouched.
  - **Lime / Grunge and Editorial:** the two mark `<circle>`s move into `seal-spin`, ahead of the
    name. They sit in their own `<g>`, which carries the `fill="none"`, stroke and stroke width
    they used to inherit.
  - **§10.2:** the marks' `<g>` moves in after the `<text>` and takes `strokeLinecap="round"`
    with it. The shared `<g stroke={ink} strokeLinecap="round">` wrapper is gone, and its stroke
    and linecap moved onto the globe's and the asterisk's own groups.
  - The paint order against the name is kept in all three. In §10.2 the marks now paint before
    the centre glyph, where they used to paint after it. The two never overlap, and the shots
    below are byte-identical.
  - The §10.2, Lime / Grunge and Editorial comments now say the marks turn with the name.
- **Docs.** CONVENTIONS' *Measure anything under `.seal-spin`* row now names the marks. CLAUDE.md
  and the README do not describe the spin (the README's "honours `prefers-reduced-motion`" still
  holds), so neither changed. `digest.mjs`' comment is still true.
- **The harness.** The unedited tree against HEAD came out 0 of 1,056 after two normalisations:
  the port, and a `?t=` HMR stamp that the long-running :5173 server had put on two Editorial
  photo URLs (`editorial-hero.jpg`, `editorial-stage.jpg`). **The next session should normalise
  `\.jpg\?[^|]*` in `src` as well as the port**, or restart :5173.
- **The digest.** Themes 0–3, three widths, canvas and `live=1`: **160 of 1,056 files differ,
  exactly the census's 160**, and every one is deletions only.
  - 2 `circle` rows per Lime / Grunge and Editorial seal (72 + 24 files).
  - 10 `g` / `line` rows per §10.2 seal (64 files).
  - No row added or changed anywhere.
  - Pop, digested as an extra: 0 of 132.
- **Reduced motion.** There are 160 element shots, one of every marked seal the census found, and
  HEAD and the tree are **byte-identical**. That stands in for the Evidence's rotation-0 read of
  `964:58600` / `964:58610`, which was not taken: the rest picture is exactly HEAD's, the
  frame's name between the marks.
- **Four phases** (`getAnimations()` paused at 0, 3.5, 7 and 10.5 s). This covered Grunge layout
  1's four seals at three widths, plus Retro's header 0 and bio 0 and 2, Lime's bio 0 and its
  `classic` bio 2, Editorial's bio 0 and Grunge's bio 2.
  - **The metric** is the angular gap between each glyph cell and each mark. The cell corners
    are mapped through the text's screen CTM, and each mark's half-width is
    `asin((r + stroke/2) / d)`.
  - **HEAD:** Grunge clears by +12.2° at 0 and ½ turn, and by **−11.5° at ¼ and ¾**. That is the
    report.
  - **The tree:** the gap is **constant at every phase**. Grunge +12.1° to +12.8° at every width,
    Lime +9.9°, Editorial +21.1°. The contact sheets show the marks between the two names in
    every frame.
  - **A metric trap:** the first run read the scale off the rotated disc's
    `getBoundingClientRect`. That is the box of a rotated *square*, ×1.34 at 26°. Read the scale
    off `svg.getScreenCTM()` instead.
- **Concentric.** Each mark's distance from the disc centre is the same at every phase: 37.76 /
  38.41 viewBox units (the frame's `cx` 12.24 / 88.41) and §10.2's 39 / 39. So
  `transformOrigin: '50% 50%'` resolves to (50, 50) of the viewBox.
- **The tester's control.** Grunge card 1 in the real app, with Title = `Static Youth` and then
  the seeded `Kai Mercer`, then Publish and Open, at 1440 and 390.
  - The tree: all four seals clear at all four phases, by +5.1° to +5.4° for `Static Youth` and
    +12.2° to +12.6° for `Kai Mercer`.
  - HEAD: −11.1° to −11.5° at ¼ and ¾. Its shot reads "STATI◯OUTH", the tester's picture.
  - The tab title follows the name, and there were no errors.
- **Named, not fixed.**
  - **§10.2's rest picture.** Each name starts at `startOffset` 2%, 7.2° past its mark, so the
    asterisk stands right against the first letter like a bullet. The cell metric reads that as
    −4°. It is the rest picture HEAD drew, pixel for pixel, and the fix only makes it the
    picture at every phase.
  - **The long-name edge**, at rotation 0 with the same cell metric (which errs on the safe side):

    | Face | `Kai Mercer` | `Static Youth` | Longest name that clears |
    |---|---|---|---|
    | Grunge: Anton at `faced` 14.05, tracked 4.21 | 12.2° | 5.1° | 12 characters (`THE MIDNIGHT`); 9 M, 13 E |
    | Lime: Bebas at 14.05, tracked 4.21 | 9.9° | 2.4° | 12 (`THE MIDNIGHT`); 9 M, 12 E |
    | Editorial: Space Mono at 8.46, tracked 2.54 | 21.1° | 12.2° | 15 of anything (monospace) |
    | §10.2: Anton at 9, tracked 1.4, start-anchored, read at its running end | 77.7° | 61.8° | 19 (`THE MIDNIGHT STATIC`); 12 M, 19 E |

    A longer name still reaches the marks, whatever spins. `textLength` is the later option, not
    this pass's.

Reply: **fixed.** The seal's name ring turns (a slow 14-second spin), and the two small circles
did not turn with it, so the name passed through them twice a turn. Your screenshot is one frame
of that, and the still design was always right. The circles now turn with the name, so they sit
between the two names at every moment, on all four seals and at every width. Retro's, Lime's and
Editorial's seals had the same bug and are fixed with it. One separate limit remains: in Grunge's
face, a name longer than about 12 characters still reaches the circles.

---

## JP-056 — the headings are Anton, not the distressed Stones Crush

**Verdict: by design so far, and the tester's question is a real one for the PO.** Grunge
layout 1's session 0 (2026-09-21) asked exactly this. Stones Crush is not a Google Font, and the
user chose a free substitute and delegated the pick ("pick the closest"). The pick was Anton, the
frame's silhouette without the distress. Grunge section 1 then set it at 0.75 of the token
(`faced()`), because Anton is a third larger per em. The plan's open questions 1 and 6 already
say "worth telling the designer". This report is that conversation reaching QA first.

The tester's "no reference to Stones Crush anywhere" is true of the built page, since no face by
that name is loaded, but the source names it: `THEMES[2]`'s comment in `data.js:99`–`108` records
the stand-in and why. The reply can point there.

**Facts gathered at triage (2026-09-28), for the PO and the designer.**
- **Stones Crush** is by **Ryan Creative**. On 1001Fonts it is under the *1001Fonts Free For
  Personal Use* licence: free for personal use, **not for commercial use**
  ([1001fonts.com/stones-crush-font.html](https://www.1001fonts.com/stones-crush-font.html)).
- A commercial listing exists on Creative Fabrica as **"Stones Crush 2"**
  ([creativefabrica.com/product/stones-crush-2](https://www.creativefabrica.com/product/stones-crush-2/)).
  That page returned 403 at triage, so it is **unverified** whether it is the same face and
  whether its licence covers **webfont embedding** (self-hosting a `.woff2` on a public site).
  Several free-font mirrors offer webfont downloads. Their terms are not a licence.
- The face is **caps-only**. That matches session 0's casing call (`'title'`, with per-site
  `textTransform: 'uppercase'`), which would then become harmless rather than necessary.

**Evidence.**
- `data.js:99`–`114`: the Grunge theme's `display` / `label` = Anton, `faceK: 0.75`, and the
  stand-in comment.
- `EncoreSection.jsx:104`–`105`: `faced()` / `facedLh()`. There are 69 `faced(s, …)` sites,
  plus `labelStyle`, `Title` and the Grunge `Wordmark`, which apply it centrally.
- `data.js`: `antonEms()` × 0.75 is Grunge's nav fit (`vm.navEms`) and its head fits.
- `index.html` / `preview.html`: the Google Fonts link loads Anton, and there is no
  `@font-face` in the repo.
- `plans/grunge/layout-1.md`: *The three decisions* §1, *Settled in session 0*, *Settled in
  section 1*, open questions 1 and 6.

**Decision (PO / design).**
- **A (recommended for this batch). Reply: a named stand-in.** No code. Hand the licence question
  to the PO / designer with the facts above. Append them to `layout-1.md`'s open question 1.
- **B. A licence is bought, and the real face ships.** This is its own plan
  (`plans/grunge/display-face.md`), not a QA session. It costs:
  - the `.woff2` self-hosted in `source/src/builder/fonts/`, with an `@font-face` in `index.css`
    **and** `preview.html`;
  - checks that it survives `dressPublishedWindow`'s style clone into the popup and that
    `vite-plugin-singlefile` inlines it (note the size);
  - `faceK` → 1 and `faced()` retired for Grunge;
  - a Stones Crush advance table in place of `antonEms × 0.75` in the nav fit;
  - every Grunge head and title fit re-measured (the `navFits` counts in CLAUDE.md, the form's
    Anton head at 484 against 501, the testimonials' breaks);
  - every Grunge digest moving at all four layouts;
  - the licence text kept in the repo.
- **C. Distress Anton with a mask.** Session 0's own note: "if it is ever wanted, it is a mask
  over the type, not a face". A greyscale distress raster applied as `mask-image` to Grunge's
  display type, through a helper beside `faced()` and the three central helpers. This gives the
  worn look without a licence, but the glyph shapes stay Anton's. It costs:
  - a new raster in `photos.js` (not `data.js`);
  - the ~69 sites;
  - a legibility call at label sizes (the nav, the pills), where a mask eats thin strokes, so
    probably display sizes only;
  - every Grunge digest's style rows moving.
  This is its own plan too.
- **D. A free distressed Google face.** Session 0 already found none that is both condensed and
  distressed. The Rubik distressed family is wide, so every measured fit would break. Not
  recommended.

**Decided** (2026-09-28, user call): **A**, a reply naming the stand-in. No code. The licence
question goes to the PO / designer with the facts above.

*Reversed* (2026-09-29, `retest-qa-fixes.md` JP-056 · JP-068): the tester re-filed it, and no web
licence has been bought, so the user took **C**, a distress mask over Anton, on its own branch
after the retest batch merges. [`display-face.md`](./display-face.md) is written from option C
above. B still replaces it if a licence arrives.

**Fix.** On A: none. Record the facts in `layout-1.md`'s open question 1, and write the reply. On
B or C: write `plans/grunge/display-face.md` and stop there. That plan is its own branch, after
this batch merges.

**Docs.** On A: `layout-1.md` open question 1 only.

**Settled** (2026-09-28). The Evidence held: `data.js:99`–`114` and `EncoreSection.jsx:104`–`105`
have not moved, since JP-057's growth is all below them. There are **68** `faced(s, …)` call
sites. The triage's 69 also counted a `faced(s.dispLg)` inside a comment (`:23894`).
- **No code**, per A. Nothing under `source/` changed, so there is no digest.
- **Docs.** `layout-1.md`'s open question 1 now carries the triage facts: the personal-use-only
  licence, the unverified Creative Fabrica listing and the caps-only face. It also points at
  option B here as the cost of shipping the real face. Open question 6 (Anton at 0.75) is part
  of the same conversation with the designer and is unchanged.
- **With the PO / designer:** whether to buy a licence that covers webfont embedding. If one is
  bought, `plans/grunge/display-face.md` is written from option B, on its own branch after this
  batch merges.

Reply: **by design; the licence question needs the PO.** Grunge's headings are set in Anton on
purpose. Stones Crush cannot ship as things stand, because its free download (1001Fonts) is
licensed for personal use only, and this product and the artists' sites it publishes are not
personal use. Anton was chosen on
2026-09-21 as the closest free face: heavy and condensed like Stones Crush, but without the worn
texture. It is set at 0.75 of the design's size so its capitals match the design's height. The
code names the stand-in and the reason in the Grunge theme's comment in `data.js`. Shipping the
real face needs a licence that covers web embedding. A "Stones Crush 2" is sold on Creative
Fabrica, but it is not yet confirmed to be the same face, or that its licence covers the web. If
the PO buys one, fitting the face is its own piece of work, not a QA fix.

---

## End-of-pass sweep

1. Full digest against a `main` worktree on :5174 (port normalised), all categories × themes 0–4
   × three widths × canvas and `live=1`. Every diff must be one a Settled above names. On
   JP-057 A, the mark rows vanish from the seal-carrying sections of themes 0–3, and nothing
   else moves.
2. The repro digest: JP-058's `&cj=` price set re-run on the final tree, with the results read
   off the DOM.
3. `reach.mjs` only if an `in` moved. None is expected.
4. Walk Grunge card 1 in the real app and the published tab at 1440 / 768 / 390:
   - the four seals at two spin phases (the marks between the names);
   - a package priced `From £1,200` (small `From £`, big `1,200`, on B);
   - `450` and `£650`.
   Then walk Retro card 1 and Lime card 1 once, the pricing card and one seal each.
5. `npm run build:standalone`, then `cp source/dist-standalone/index.html index.html`, in its own
   commit. Then a two-build digest (`build-digest.mjs`), whose diff should be only the named rows.
6. `plans/README.md`'s row, and one reply line per ticket for QA (fixed / by design / needs PO),
   headed by the retest-against-the-stamp line
   (`curl -sI https://siniiitsa.github.io/js-plus-prototype-2/`).

**Settled** (2026-09-28, all six steps; the push, the PR, the merge and the build stamp are the
user's).
- **The harness.** A `main` worktree (`8a8d3ed`) in the scratchpad, `node_modules` symlinked,
  served on :5174. The :5173 server had run for five days, so it was left alone and its digest
  files were normalised instead: the port, and the `?t=` stamps (`\.jpg\?[^|]*`). To prove the
  harness, the worktree first went to HEAD (`6c8c088`), and both servers came out **0 of 1,320**
  files (660 + 660, themes 0–4). The worktree then went back to `8a8d3ed` on a fresh server.
- **1. Full digest against `main`.** All categories × themes 0–4 × three widths × canvas and
  `live=1`: **160 of 1,320 files differ (80 + 80)**. Each one is in JP-057's census, checked by
  file name, not only by count.
  - 64 files lose 10 `g` / `line` rows (§10.2), and 96 lose 2 `circle` rows (Lime / Grunge and
    Editorial).
  - Every one is deletions only, with the remaining rows in order.
  - Themes 0–3 are 160 of 1,056, as named. Pop is 0 of 264.
  - Pricing moves only in Grunge `arch 0`'s seal, so JP-058's seeded diff is 0. JP-056 moves
    nothing.
- **2. The repro set.** JP-058's six prices through `&cj=` (its recipe, `/UNIT`), 60 renders per
  price per surface on both servers. Canvas and live agree. The counts are JP-058's Settled
  plus JP-057's seal in Grunge `arch 0`, which is 3 files per price (circle deletions only)
  wherever the split does not already move that file:
  - `From £1,200` and `POA`: 45 each (arch 0–2 at every theme and width; arch 3 zero);
  - `£650`: 3;
  - `450` and all-spaces: 15 each;
  - `£1,200–£2,000`: 6.

  **Off the DOM** (a one-off puppeteer script, deleted): 720 renders of the tree, themes 0–4 ×
  arch 0–3 × three widths × both surfaces.
  - `From £1,200` reads `From £` | `1,200` in all 105 rows per surface.
  - `450` and `POA` stand whole with no lead, and `£650` reads `£` | `650`.
  - The all-spaces price draws no lead span. Layouts 1 and 2 print an empty numeral before the
    unit (named in JP-058), and layout 3 drops the row.
  - Layout 4 prints every price whole.
  - No lead or numeral wraps and nothing passes its card, except the range at layout 1's 768
    card (below, and JP-058's Retro and Pop item).
- **Named, not fixed (new here): the range at 768 under Lime, Grunge and Editorial.** At layout
  1's 768 card, the `nowrap` display numeral `1,200–£2,000` passes the card. With `/UNIT` it is
  22 / 3 / 30 px past; with the seeded `/event` it is 27 / 7 / 35 px, and Editorial's section
  overflows by 5px. `main` measures the same to the tenth of a pixel, so this predates the
  batch. JP-058's Settled named only Retro and Pop's two-line numeral at that card. With
  `/event`, `main` also has at least 10 violations that the tree does not: Retro's `From` and
  range overflows at 768 and its range wrap at 390, all fixed by JP-058. It is a floor, because
  the probe finds the numeral by its text, and `main`'s `rom £1,200` never matches `1,200`.
  **Closed by JP-074** ([`layout-3-qa-fixes.md`](./layout-3-qa-fixes.md), 2026-09-28).
  `priceParts()` gained a third part, `tail`. The display numeral is `1,200`, and `–£2,000` sets
  small beside it. Re-measured first on HEAD (22.2 / 2.6 / 30.4 and 26.6 / 6.9 / 34.8, and
  Editorial's section 5 over), the range now ends 20 / 20 / 20 px inside the card with `/UNIT`
  and 18.3 / 20 / 17.2 with `/event`, and no section overflows.
- **3. Reach.** Skipped, because no `in` line moved between `8a8d3ed` and HEAD. `data.js`'s diff
  is `priceParts()` and one clause of `FIELDS.pricing.tiers`' hint.
- **4. The real app** (a one-off puppeteer script, deleted). Card 1 of Grunge, Retro and Lime;
  the Pricing panel's first three prices typed as `From £1,200`, `450` and `£650`; Publish,
  Open, and the tab at 1440 / 768 / 390. There were no page errors in either window.
  - **Pricing.** The panel holds the three strings. On all three templates, the canvas and the
    published tab read `From £ | 1,200 | /event`, `450 | /event` and `£ | 650 | /event` at
    every width. No lead or numeral wraps, nothing passes its card, and the page does not
    overflow.
  - **Seals.** Every seal's animation was paused at 0 and at 3.5 s (a quarter turn, the phase
    the report shows). The ring's computed rotation reads 0° then 90°, both marks are inside
    `.seal-spin`, and the gap from each mark to the nearest glyph cell of the name is the same
    at both phases:
    - Grunge's four (header, bio, pricing, footer): +12.1° to +12.6° at all three widths;
    - Lime's two (bio, footer): +9.7° to +9.9°;
    - Retro's four §10.2 seals (header, bio, calendar, footer; three at 390): −4.1° / −4.2°,
      which is JP-057's named rest picture, the asterisk standing against the first letter
      like a bullet.

    Each mark stays 37.76 / 38.41 viewBox units from the centre (§10.2: 39 / 39), so the marks
    stay concentric with the ring.
  - **Shots.** All 24 Grunge seal shots show the marks between the two names, and so do Lime's.
    Retro's bio seal at 768 and 390 shot the wrong area. That seal bleeds off the page's left
    edge (x −29 and −11), and an element clip there comes out garbled. A viewport shot shows
    it in place, and a hit test at its centre lands in its SVG. Its position is `main`'s, since
    the digest moves only its mark rows.
- **5. `index.html`** refreshed in `5bed233` (8,748,860 bytes, up from 8,748,639), from
  `npm run build:standalone`. The two-build digest (`build-digest.mjs`, both files from
  `127.0.0.1:8931`, reduced motion) was proved first: the old build walked twice diffs to 0 of
  16. Old against new moves exactly the seals' mark rows, deletions only:
  - Retro −40 / −40 / −30 at 1440 / 768 / 390;
  - Lime −4, Grunge −8 and Editorial −4 at each width;
  - Pop 0, and the setup modal's card counts are unchanged.
- **6.** `plans/README.md`'s row, and the replies below. At the sweep the deployed build still
  read `Mon, 28 Sep 2026 08:20:45 GMT`, 8,748,639 bytes, which is the tester's.

**Replies to QA, one line per ticket.** **Retest against the Pages build whose `last-modified`
is later than `Mon, 28 Sep 2026 08:20:45 GMT`** (the build these reports were filed against,
8,748,639 bytes; `curl -sI https://siniiitsa.github.io/js-plus-prototype-2/`). An older tab or
cached build will still show all three.
- **JP-058 — fixed.** The small seat beside a package's big price now takes everything before
  the price's first digit, so `From £1,200` prints a small `From £` and a big `1,200`. A price
  with no digit (`POA`) or that starts with one (`450`) prints whole in the big seat. This was
  every template's bug at pricing layouts 1–3, and the fix covers all of them.
- **JP-057 — fixed.** The seal's name turns slowly (one turn every 14 seconds), and the two
  small circles did not turn with it, so twice a turn the name passed through them. Your
  screenshot is one frame of that. The circles now turn with the name and stay between the two
  names at every moment, on all four seals and at every width. Retro's, Lime's and Editorial's
  seals had the same bug and are fixed too. One separate limit remains: in Grunge's face, a
  name longer than about 12 characters still reaches the circles.
- **JP-056 — by design; the licence question is with the PO.** Grunge's headings use Anton on
  purpose, as the closest free stand-in for Stones Crush: heavy and condensed, without the worn
  texture, and set at 0.75 of the design's size so its capitals match. Stones Crush's free
  download is licensed for personal use only, so it cannot ship on artists' public sites. A web
  licence is the PO's call. A "Stones Crush 2" is sold on Creative Fabrica, but it is not yet
  confirmed to be the same face, or that its licence covers the web. Fitting the real face
  would be its own piece of work.
