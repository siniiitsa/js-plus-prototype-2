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
| 1 | JP-058 | `From £1,200` prints as a small `F` + `rom £1,200` | **Confirmed, and shared**: `/^[^\d]/` takes the first character of any price that does not start with a digit, in six sites (pricing layouts 1–3, every template) | S | **yes**: what goes in the small seat | open |
| 2 | JP-057 | The seal's two small circles sit on the name's letters | **Confirmed, and shared**: only the name ring spins (`.seal-spin`, 14 s), and the marks stand still, so the name walks through them. At rotation 0 the picture is the frame's | S–M | **yes**: spin the marks with the name, or stop the spin | open |
| 3 | JP-056 | Headings set in Anton, not the distressed Stones Crush | **By design so far**: Anton is the named stand-in (user call, 2026-09-21). The tester's licence question is real and is the PO's to carry | — (reply) / L (own plan) | **yes (PO / design)**: reply, licence, or a distress mask | open |
| 4 | — | End-of-pass sweep | — | S | — | open |

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

**Settled.** *(open)*

Reply: *(open)*

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

**Settled.** *(open)*

Reply: *(open)*

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

**Fix.** On A: none. Record the facts in `layout-1.md`'s open question 1, and write the reply. On
B or C: write `plans/grunge/display-face.md` and stop there. That plan is its own branch, after
this batch merges.

**Docs.** On A: `layout-1.md` open question 1 only.

**Settled.** *(open)*

Reply: *(open)*

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

**Settled.** *(open)*

**Replies to QA, one line per ticket.** *(open)*
