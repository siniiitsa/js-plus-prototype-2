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
| 2 | JP-045 | Tickets → / ↗ on the canvas for gigs with no link | **Confirmed**: map layouts 2 and 3 split canvas from live on purpose | S | **user: drop on both** | **done** |
| 3 | JP-044 | Repertoire layout-3 titles cut off at 768 | **Confirmed, Lime/Grunge only**: a 19px title beside a `flex: none` artist in a ~148px card | S–M | no (named diff) | **done** |
| 4 | JP-046 | *Save 15% on bundles* missing, no field | **A named diff of the fit** (dropped in Retro L3, inherited) | S | **user: add the field** (by the plan) | **done** |
| 5 | JP-048 | FEATURED follows position | **Confirmed**: the seat is `i === shown.length - 1` | M | **user: a Featured tick, layout 3 only** | **done** |
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

**Settled** (2026-09-24). The Evidence lines held (16276 / 16693 for the ↗, 17245 / 17591 for
`showTix`).
- **Code.** Four tests, one shape: layout 2's ↗ (Lime/Grunge and Retro) is `!!gg.url && …`, and
  layout 3's `showTix` (Lime/Grunge `gigRowL` and Retro `gigRow`) is `!!gg.url`. `tix` still picks
  the tag, so a linked row is a span on the canvas and an `<a>` live, as before. Retro's layout-3
  comment rewritten to say so.
- **Digest** (a HEAD `e0562c1` worktree on :5174 against the edit on :5173, themes 0, 1, 2, all
  categories, three widths, port normalised): **exactly the 18 named files differ on the canvas**
  (map arch 1 and 2 × three themes × three widths), **0 of 387 live**. Inside them: arch 1 loses
  its four ↗ rows, arch 2 its Tickets → (five wide, one at 390), and the rest is the room freed —
  venue lines widening (Lime's 768 "Hidden Warehouse" unwraps) and, at 390 under Lime and Grunge,
  the row's second line going, so the column shortens.
- **Links still show** (`&cj=` of three gigs — `tix.example.com/a`, `''` and the refused `foo` —
  map arch 1 and 2, themes 0, 1, 2, three widths, both surfaces): exactly **one** mark per render,
  a `SPAN` on the canvas and an `A` live, on the linked gig. Layout 2 needed the linked gig
  second, since its list is the page minus the featured one.
- **Docs.** CLAUDE.md's map paragraph (the "A gig's `link` reaches all three" sentence); a
  *fixed since* line on `layout-3-qa-fixes.md`'s "JP-045 was not in this batch". Its JP-048 note's
  "the JP-045 complaint not repeated" and CLAUDE.md's "JP-045's rule" still read true.

Reply: **fixed.** A gig with no tickets link — or one the address check refuses — no longer draws
Tickets → (map layout 3) or ↗ (map layout 2), in the editor or on the published page. A gig with a
link shows it on both.

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

**Settled** (2026-09-24). The Evidence lines held (10847 the block, 10891–10896 the title and
artist, 10936 the grid).
- **Frame.** `984:10760` has room because its right column is a duration ("3:54"): every title
  sits on one row with no truncation. Ours seats the artist there — the substitution, not the
  frame, is what ran out of room.
- **Measured first** (harness, every width, themes 0–2, both surfaces, `scrollWidth >
  clientWidth` on ellipsis spans): only **Lime at 768** cut anything — nine of twelve titles,
  the tester's list exactly. Grunge (168 measure, Anton × 0.75) and 390 cut none.
- **Code.** A `stack = tab` in the `(s.lime || s.grunge)` block: at 768 the row is a column of 2,
  centred in the pinned 57 / 62.5, title over artist, each line `nowrap` with its own ellipsis as
  a last resort. Desktop and 390 keep the frame's row. Grunge moves with it — one block, and a
  longer title clips there as it did under Lime. Retro untouched.
- **Digest** (HEAD `b3d3910` worktree on :5174 against the edit, themes 0, 1, 2, all categories,
  three widths, port normalised): **exactly repertoire arch 2 at 768, themes 1 and 2**, canvas
  and `live=1` — 2 of 387 files each. Card heights unchanged.
- **Published tab** (puppeteer: template → setup card 3 → Publish → Open, the popup at 1440 / 768 /
  390, Retro, Lime, Grunge): no ellipsis span in `#repertoire` has `scrollWidth > clientWidth`
  at any width. The same script on HEAD reproduces Lime's nine at 768. No page errors.
- **Docs.** A *Reversed in part* note on Lime L3's repertoire Settled; a *Since* note on Grunge
  L3's (its reading differs: it fit). CLAUDE.md states nothing about the row.

Reply: **fixed.** At tablet width the artist now sits under the song title in the Repertoire's
set cards, so every title shows in full, in the editor and on the published page.


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

**Settled** (2026-09-24, `1f18574`). The Evidence lines held (8502 Retro's comment, 8756 Lime's).
- **Frame.** All six masters draw it, at every width: Retro `964:68648` / `977:23149` /
  `982:10274`, Lime `964:68680` / `984:10765` / `984:10796`, Grunge `964:68712` / `984:13925` /
  `984:13956`. One `toggle-row`: the capsule, then the text, gap 14, `items-center`, no wrap;
  `Body/SM` (Inter 400, lh 1.4, the capsule labels' own size — Lime 13 at 1440 and 768, 12
  elsewhere) in `sem/text/2` (`#111` / `#F2FFD0` / white), sentence case.
- **Code.** `PRICING_OFFER` and `FIELDS.pricing.offer` ("Offer line", `d`, `in: [2]`, beside
  `intro`), `vm.pricingOffer = cv('offer', PRICING_OFFER)`, uncased; `EditPanel` resolves it
  through `fieldDefault`'s `d` like every seeded key. Both branches wrap the capsule in
  `row(u(14), { flexWrap: 'wrap' })` with the span after it, the span in the capsule's own type.
  The row stands on either half: packages with no tags draw no capsule but keep the line.
- **Reach** (`reach.mjs` row `pricing.offer`, themes 0–2): layout 3 only, 6/6 renders each.
- **Digest** (HEAD `f8f2ccf` worktree on :5174, themes 0, 1, 2, all categories, three widths,
  port normalised): **exactly pricing arch 2 × three widths × three themes**, 9 of 387 files on
  the canvas and 9 of 387 live. Each gains two rows (the row, the span) and nothing moves: the
  row is the capsule's own height. Span boxes: Lime 131 × 18 at 768 and 121 × 17 at 390, Retro
  and Grunge 121 × 17 — the masters' 130 × 18 / 120 × 17 — offset 9 down, as the frame's.
- **Emptied** (`&cj={"offer":""}`, pricing, themes 0–2, both surfaces): no render carries the
  text; the only row left over HEAD is the wrapper, at the capsule's own box. Packages without
  tags: the line alone, and with it emptied no row at all.
- **Real app** (one-off puppeteer, deleted; Retro, Lime, Grunge, setup card 3): the panel's
  *Offer line* holds the seeded copy with no "Not shown" note; canvas and published tab show the
  line; emptied, it is gone from the canvas and from the republished tab. No page errors.
- **Docs.** Both code comments; *Reversed* notes on Lime L3's and Grunge L3's pricing named
  diffs; a sentence in CLAUDE.md's pricing layout-3 paragraph.

Reply: **fixed.** Pricing layout 3 now shows *Save 15% on bundles* beside the Duo / Trio / Band
selector at every width, and the Pricing panel has an *Offer line* field for it. Empty the field
to remove the line.

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

**Settled** (2026-09-24, `6a01d4f`). The Evidence lines had moved with JP-046: the seat was at
8652 (Lime/Grunge) and 8878 (Retro); `shown` is computed once at 8563 for both.
- **Code.** One `featAt` beside `shown` — the index of the first ticked package on show, else
  `shown.length - 1`, and -1 at one row — read by both `packRow`s as `i === featAt`.
  `sectionVm` adds `featured: !!t.featured` to `vm.tiers[]`; `TIER_KEYS` is unchanged (a
  comment says why), so a ticked empty row is still blank and dropped. `TiersField` gains a raw
  checkbox labelled *Featured* under the features box; `feature(i, on)` rewrites the list with
  the key on row `i` alone, or on none, and drops it rather than writing `false`, so an
  untouched list keeps the seed's shape. `tiersVal` needed nothing: the flag rides on the row.
  Layout 1's glow and layouts 2 and 4 read no tick.
- **Digest** (HEAD `4b5c0b2` worktree on :5174, themes 0, 1, 2, all categories, three widths,
  port normalised): **0 of 387 on the canvas and 0 of 387 live**, as named.
- **`&cj=`** (the seeded tiers, The Festival Set ticked, plus a name-only *The Late Set*;
  pricing arch 2, themes 0–2, three widths, both surfaces): FEATURED on The Festival Set in all
  18 renders, where HEAD puts it on The Late Set. Live, the Solo chip (House Party, Wedding Set)
  moves it to The Wedding Set; Trio keeps it on The Festival Set.
- **Real app** (one-off puppeteer, deleted; Retro, Lime, Grunge, setup card 3): opened with no
  ticks and FEATURED on The Festival Set; a name-only fourth package took it (the report);
  ticking The Festival Set took it back; ticking The House Party cleared The Festival Set's tick
  and moved the seat; unticking left none ticked and the seat on the last row; the published
  tab showed it on the ticked package and the Solo chip moved it to The Wedding Set. No page
  errors.
- **Docs.** CLAUDE.md's pricing layout-3 sentences; the Packages hint; `TIER_KEYS`' and
  `TiersField`'s comments; a *Retired* line on Retro L3's open question 12.

Reply: **fixed.** Each package in the Pricing panel now has a *Featured* tick. Tick one to give
it the FEATURED badge in layout 3 (ticking another moves it); with none ticked, the badge goes
to the last package on show, as before. A package with only a name no longer takes it from the
one you ticked.

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
