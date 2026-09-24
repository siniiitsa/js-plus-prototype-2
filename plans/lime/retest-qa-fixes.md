# Lime retest QA fixes — bug-by-bug plan

Working checklist for the tester's **retest** of the three Lime QA batches (`qa-fixes.md`,
`layout-2-qa-fixes.md` … `layout-4-qa-fixes.md`), plus the five layout-3 reports (JP-043 …
JP-047) that `layout-3-qa-fixes.md` records as "not handed over". It works like
[`layout-4-qa-fixes.md`](./layout-4-qa-fixes.md): **one entry per session, with context cleared
between sessions**, and each session writes what it settled back into this file.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then *How each
session runs* and *Verification harness* in `../retro/qa-fixes.md`, then the memory notes
`verifying-the-published-tab` and `browser-tool-choice`. [`layout-3.md`](./layout-3.md) and
[`layout-4.md`](./layout-4.md) hold the Figma node ids.

Branch: **`lime-retest-qa-fixes`, forked from `main`** (`a0baef8`). One commit per entry
(`Fix JP-049: …`).

**The tester's build is current.** At triage (2026-09-24) the Pages build's `last-modified` was
`Thu, 24 Sep 2026 10:10:38 GMT` — `main` at `a0baef8`, PR #33. So every report below reproduces
on HEAD; none is a stale-build echo.

**Most of this is not Lime's.** Only JP-044 sits inside an `s.lime` block (widened to Grunge).
Every other seam is shared, so Retro, Grunge and the flat two move with it. Verify themes 0, 1
and 2.

## The report (translated)

> **Partly fixed.**
> - **JP-038:** at 1440 the side inset is now 78px on 9 of 11 sections and 56 on Repertoire and
>   Enquiry Form (was 189; design ~55), so neighbouring sections disagree by 22. Layout 4 is
>   aligned (56 at 1440, 10 at 390) except the Footer: 78 and 22.
> - **JP-048:** empty packages no longer show. But FEATURED still follows position: a fourth
>   package with only a name takes it, and The Festival Set loses it. There is no field for it.
> - **JP-049:** `mailto:not-an-email` is no longer composed — with a bad address CHECK
>   AVAILABILITY does nothing, and the field's hint says so. But the field itself shows nothing
>   when the address is invalid. Your call: accept, or keep open for a proper warning.
>
> **Not fixed.**
> - **JP-043:** at 1440 the right column is empty the whole time the left one scrolls. The
>   calendar card ends at y 1569 and does not stick.
> - **JP-044:** at 768 the Repertoire's song titles are still truncated: VALE…, SUPER…,
>   UPTOWN …, MR. BRIGH…. Checked on the published page.
> - **JP-045:** all five gigs have an empty Tickets link, yet the editor draws Tickets → five
>   times. The published page draws none.
> - **JP-046:** there is no *Save 15% on bundles* line, and the Pricing panel has no field for it.
>
> **Open questions, still open.**
> - **JP-047:** unchanged. The Events Map's filters are cities, not Upcoming / Past.
> - **JP-054:** closer to the design (Contact Us / Enquire, Check Availability), but the Event
>   type and Location boxes are still missing.

## Status

| Order | ID | Report (short) | Verdict | Size | Decision | Status |
|---|---|---|---|---|---|---|
| 1 | JP-049 | A stored bad enquiry address shows no warning under the box | **Confirmed**: `UrlInput`'s error is blur-only local state, lost on remount | S | no | **done** |
| 2 | JP-045 | Tickets → / ↗ on the canvas for gigs with no link | **Confirmed**: map layouts 2 and 3 split canvas from live on purpose | S | **user: drop on both** | open |
| 3 | JP-044 | Repertoire layout-3 titles cut off at 768 | **Confirmed, Lime/Grunge only**: a 19px title beside a `flex: none` artist in a ~148px card | S–M | no (named diff) | open |
| 4 | JP-046 | *Save 15% on bundles* missing, no field | **A named diff of the fit** (dropped in Retro L3, inherited) | S | **user: add the field** (by the plan) | open |
| 5 | JP-048 | FEATURED follows position | **Confirmed**: the seat is `i === shown.length - 1` | M | **user: a Featured tick, layout 3 only** | open |
| 6 | JP-054 | Form layout 4 lacks Event type and Location | **Named diff**, kept on 2026-09-23 | S | **user: seed `FORM_FIELDS_4`** (reverses 2026-09-23) | open |
| 7 | JP-043 | The composed page's right column does not stick | **Confirmed**: nothing is sticky; `align-items: start` leaves ground under the calendar | S | **user: sticky, published** | open |
| 8 | JP-038 | Sections disagree on their side inset (78 vs 56, footer 78 / 22) | **Confirmed**: the remaining gap is `padX` itself | L | **user: `padX` becomes the frame's inset, footer included** | open |
| — | JP-047 | Map chips are cities, not Upcoming / Past | **By design**: a gig has no year, so nothing can place it against `today` | — | **user: reply only** | reply in the sweep |
| 9 | — | End-of-pass sweep | — | S | — | open |

**Why this order:** the chrome-only and single-seam entries first, each with a small named
after-diff. JP-038 last, because it moves every digest of every template and every earlier entry
should be digested against a clean base.

## How each session runs

As `layout-4-qa-fixes.md`, with these differences:

1. Re-check the *Evidence* line numbers. They are from the triage (2026-09-24, `a0baef8`).
2. **Themes 0, 1 and 2, every entry**, at all three widths, canvas and `live=1`. Digest against a
   **HEAD worktree** on :5174 (`node_modules` symlinked, port normalised). Name the expected
   after-diff before writing code.
3. A new field gets a measured `in` (`source/scripts/reach.mjs`: add a `PROBES` row).
4. Drive live-only behaviour in the popup from the opener, per `verifying-the-published-tab`.
5. Update the docs the entry names. Commit, fill in **Settled** and the status row, then print
   the hand-off prompt for the next entry and stop.

**Do not refresh the root `index.html` per bug.** The sweep does it once.

---

## JP-049 — a bad enquiry address shows no warning under the box

**Verdict: confirmed.** The warning exists but is easy never to see.

**Evidence.**
- `EncoreBuilder.jsx:2126`–`2150` — `UrlInput` sets `err` in `onBlur` only (`setErr({ v: value,
  msg })`), as local `useState`, and prints `<p role="alert" style={ERR_LINE}>` with
  `aria-invalid`.
- `EncoreBuilder.jsx:3505`–`3506` — the form's `email` is a `UrlInput` with
  `check={emailProblem}`.
- So the line appears only after a blur inside the panel, and it is **lost on remount**:
  switching sections or reopening the form shows a stored bad address with no warning, only the
  static hint.

**Fix.** Derive the line from the stored value: show `check(value)` whenever it is truthy and the
box is not focused. A remount with a stored bad address shows it at once. Keep `aria-invalid`,
`ERR_LINE` and the red border. This reaches every `UrlInput` (Soundcloud, the social rows, a gig's
link, a track's audio, a footer link row, the enquiry email), so check each.

**Verify.** Real app: type `not-an-email`, blur → the line; switch section and back → still there;
correct it → gone. The same for a Soundcloud address `foo`. Digest: zero change (chrome only).

**Docs.** CLAUDE.md's `UrlInput` clause ("prints that reason under the box on blur").

**Settled** (2026-09-24). The Evidence lines held.
- **Code.** `UrlInput` keeps one `editing` flag (set on focus, cleared on blur) in place of the
  blurred `err`, and the line is `check(value)` whenever the box is not focused. The `onChange`
  clear-on-correction branch went with it: a passing value simply has no reason.
- **Real app** (one-off puppeteer, Lime card 3, deleted): Enquiry Form's email typed
  `not-an-email` shows nothing while focused; blur → *That email address looks incomplete.*;
  Pricing and back (a remount) → **still there**, which is the ticket; `me@band.co` → gone. The
  seeded Media Player, Events Map, Gallery and Footer panels print no alert (the seeded track
  audio addresses pass). No page errors.
- **Digest.** Not run: the change is in `EditPanel`'s chrome, which the section harness never
  renders, so it is byte-identical by construction.
- **Docs.** CLAUDE.md's `UrlInput` clause.

Reply: **fixed.** A bad address now shows its warning under the box whenever the box is not
being typed in, including after switching sections and coming back. This reaches every address
box, not only the enquiry email.

---

## JP-045 — Tickets → on the canvas for gigs with no link

**Verdict: confirmed, and written on purpose.** The canvas keeps the label "that being the
reference design"; live drops it. Layouts 1 and 4 keep a picture on both surfaces; layouts 2 and 3
split.

**Evidence.**
- `data.js:606`–`611` — all five `GIGS` have `link: ''`.
- `EncoreSection.jsx` ~17243 (Lime/Grunge `gigRowL`) and ~17589 (Retro `gigRow`):
  `showTix = !!tix || !s.live`. `extLink` (~503) is null unless `s.live && url`.
- Layout 2's row ↗: `(tix || !s.live)` at ~16276 (Lime) and ~16693 (Retro).

**Decided** (2026-09-24, user): an empty or refused link draws **no** Tickets → and no ↗ on
**either** surface, layouts 2 and 3. The test reads `vm.gigs[].url` (resolved on both surfaces),
not `extLink`.

**Expected after-diff.** Map `arch 1` and `arch 2`, themes 0, 1, 2, three widths, **canvas only**
(the seed has no links, so the column and ↗ go). Live is byte-identical. A `&cj=` gig list with
links must show them on both surfaces.

**Docs.** CLAUDE.md's map paragraph; the JP-048 Settled note in `layout-3-qa-fixes.md` that cites
"JP-045's rule".

**Settled.** —

---

## JP-044 — Repertoire layout-3 titles cut off at 768

**Verdict: confirmed, Lime and Grunge only.** The title is `nowrap` + ellipsis at every width,
beside the artist at `flex: none`. At 768 the card is 216 wide with 34 padding, so the title gets
~40–50px at 19px. Retro's title is 12px there and fits.

**Evidence.** `EncoreSection.jsx` ~10847 (the `(s.lime || s.grunge)` block), ~10891–10896 (title
and artist styles), ~10936 (the three-column grid at 768). `plans/lime/layout-3.md:738`–`775`
("the right-hand column is the artist, not a duration" — the substitution that made it tight).

**Frame first.** Read the 768 master (`984:10760`) for what the frame does with a long title.

**Fix.** In the Lime/Grunge block at tablet (and at 390 if it truncates there too), stack the
artist under the title so neither clips; a named diff from the frame's one row. Retro untouched.

**Expected after-diff.** Repertoire `arch 2`, themes 1 and 2, at 768 (and 390 if touched), both
surfaces.

**Verify.** The published tab at 768: no seeded title ends in an ellipsis (`scrollWidth >
clientWidth` on none of the title nodes).

**Docs.** Lime L3's repertoire Settled (a *Reversed* note); Grunge L3 if its reading differs.

**Settled.** —

---

## JP-046 — *Save 15% on bundles*

**Verdict: a named diff of the fit.** Retro L3 dropped it as "a discount no field states"
(`EncoreSection.jsx` ~8502, commit `ecba065`); Lime (~8755) and Grunge L3 inherited it.

**Fix (the plan's call, 2026-09-24).** A new emptiable `FIELDS.pricing` key seeded with the
frame's copy — JP-040's precedent — drawn beside the segmented capsule in Retro's `v2` body and in
the Lime/Grunge block. Read the 768 and 390 masters (Lime `984:10765` / `984:10796`, Retro
`977:23149` / `982:10274`) for where it sits and whether it is drawn. Expected `in`: `[2]`,
measured with a `reach.mjs` row.

**Expected after-diff.** Pricing `arch 2`, themes 0, 1, 2, the widths whose master draws it, both
surfaces.

**Docs.** The two "stays dropped" comments; *Reversed* notes in Lime L3 and Grunge L3's pricing
Settled; CLAUDE.md's pricing layout-3 sentence.

**Settled.** —

---

## JP-048 — FEATURED follows position

**Verdict: confirmed.** The seat is `shown.length > 1 && i === shown.length - 1`
(`EncoreSection.jsx` ~8649 Lime/Grunge, ~8862 Retro). A package with only a name is not blank, so
it survives `blankRow` and takes the last seat. Retro L3's open question 12
(`plans/retro/layout-3.md:1236`–`1248`) named a flag as what "would retire the whole question".

**Decided** (2026-09-24, user): **a per-package Featured tick, layout 3 only.**
- `TiersField` gains a raw checkbox per row (the *Start fresh* precedent), behaving as a radio:
  ticking one clears the others; unticking leaves none.
- `featured` is **not** in `TIER_KEYS`, so `blankRow` ignores it (`FORM_FIELD_KEYS` leaves out
  `kind` the same way).
- `sectionVm` carries `vm.tiers[].featured`. Layout 3 seats FEATURED on the flagged row when it is
  on show after the chip filter, and otherwise on the last row on show (today's rule), so the
  seed — which flags nothing — keeps its picture. Layout 1's glow stays positional.
- `tiersVal` resolves the same list.

**Expected after-diff.** None on the seed. A `&cj=` with The Festival Set flagged and a
name-only fourth package: FEATURED stays on The Festival Set, both surfaces.

**Docs.** CLAUDE.md's pricing layout-3 sentences (the seat the filter moves); the field's hint.

**Settled.** —

---

## JP-054 — form layout 4 lacks Event type and Location

**Verdict: the 2026-09-23 named diff** ("the boxes stay the artist's one list").

**Decided** (2026-09-24, user): **seed the frame's boxes at layout 4.** `FORM_FIELDS_4` in
`data.js` beside `FORM_FIELDS`: Your name (text), Email (email), Event date (text), Event type
(text), Location (text), placeholders read off `964:72940`. The frame's Message is the existing
`message` textarea. Resolved by layout like `FORM_BTN_4`: `sectionVm`'s `formList` at `d === 3`,
and `formFieldsVal` at `design === 3`. Exactly one `email` row, so the guard holds. Once the
artist edits the list it applies at every layout (the heading and button defaults' rule).

**Expected after-diff.** Form `arch 3`, themes 0, 1, 2, three widths, both surfaces.

**Docs.** CLAUDE.md's form layout-4 sentences; a *Reversed* note on JP-054's Settled in
`layout-4-qa-fixes.md`.

**Settled.** —

---

## JP-043 — the composed page's right column does not stick

**Verdict: confirmed.** `arrangeRows()` (`EncoreBuilder.jsx:4175`–`4188`) draws the row as a grid
with `alignItems: 'start'`; the right cell is exactly the calendar's height, and nothing is
sticky. The comment at `:4150` accepts the bare ground ("as the frame does").

**Frame first.** Read Frame 300 (Lime `964:68675`, Retro `964:68643`) for a declared `sticky`, and
record what it says.

**Decided** (2026-09-24, user): **sticky in the published tab.** `position: sticky; top: 0;
alignSelf: start` on the **right cell div**, not the calendar root. The canvas card is
`overflow: hidden`, so sticky is inert there — named, accepted (the canvas is a picture).

**Verify.** In the popup at 1440 and 1600, under the `zoom` wrapper: the calendar stays in view
while the left column scrolls and stops at the row's end, overlapping nothing. Digest: zero change
(the harness renders sections, not rows).

**Docs.** CLAUDE.md's composed-page bullet; the `:4150` comment.

**Settled.** —

---

## JP-038 — sections disagree on their side inset

**Verdict: confirmed, and the remaining gap is `padX` itself** — option C of the 2026-09-23 entry,
deferred then as "its own plan", taken now by the user. Measured on HEAD (`inset.mjs Lime <card>`,
1440): layout 1 is uniform at 78; layout 2 has repertoire and form at 56 (their sheets re-pad
`gPad`); layout 3 has gallery and map at 56; layout 4 is 56 everywhere but the footer (78 / 22).
The tester's "Repertoire and Enquiry Form" is layout 2's pair.

**Decided** (2026-09-24, user): **`padX` becomes the frame's inset everywhere, the footer
included**, not theme-gated (the layout-4 arm was not).

**Measure first.** `get_metadata` on the 768 and 390 masters of a page-ground section at layouts
1–3, Lime and Retro: confirm 30 / 10. Run `inset.mjs Lime,Retro,Grunge {1,2,3,4}` as the baseline.

**Fix.** `RAMP.*.padX` → 45.92 / 30 / 10 (confirmed values) and `SIZES.*.pad` with it. Reach every
reader: `PublishedPage`'s `SIZES[key].padX` and surplus, `contentWidth()` (`:4167`), the composed
row's gutter, `preview.jsx:14`–`44`'s hand-copied `padX` / `pad`. Delete the `d === 3` arm
(`:421`–`436`). Audit every `padX`-relative literal: the footer's `calc(10px - padX)` (~23229) and
bottom bar (~23304), `bleedX`, `bleedTo`, `TornEdge`, `ArcEdge`, and each sheet's
`calc(surplus + gPad | u(56))` re-pad.

**Verify.** `inset.mjs` after: every section's text edge at 56 / 30 / 10 at every layout (inner
panels named). Digest: broad, every change an x shift or a width change; inspect a sample of
screenshots. `scrollWidth` holds at 390.

**Docs.** README's desktop-page bullet, CLAUDE.md's pricing layout-4 and footer "keeps `padX`"
sentences, the `bleedX` comment.

**Settled.** —

---

## JP-047 — map chips are cities, not Upcoming / Past

**By design; reply only** (user, 2026-09-24). A gig is `{ venue, city, time, month, day, link }`
with free-text month and day and **no year**, so nothing can place it before or after `today`
(which the published tab does read since F20, for the calendar). Retro L3
(`plans/retro/layout-3.md:892`–`901`) chose cities for that reason and for the section's own head,
"Where I'm playing". Reply: a dated gig (a real date per row) is what Upcoming / Past needs; it is a
repeater change, offered separately.

---

## End-of-pass sweep

1. Full digest against `main`, themes 0, 1, 2, canvas and `live=1`: every diff named above.
2. `reach.mjs 0,1,2`: 0 mismatches.
3. The real app, Lime cards 1–4 at 1440 / 768 / 390, each tester step repeated; Retro once.
4. `npm run build:standalone`, `cp source/dist-standalone/index.html index.html`, its own commit.
5. `plans/README.md`'s row, and a reply line per ticket (fixed / by design), headed by the
   retest-against-the-stamp line.

**Settled.** —
