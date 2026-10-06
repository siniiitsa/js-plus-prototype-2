# Grunge retest QA fixes — bug-by-bug plan

Working checklist for the tester's **retest** of the Grunge QA batches against layouts 1 and 3:
JP-056, JP-066, JP-068, JP-069, JP-070 and JP-071. Every one of them is a ticket an earlier batch
closed, wholly or partly, **as a reply**. The tester has read the replies and re-filed. This
batch reverses those calls where there is a fix to make, and routes the rest to the people who
can answer them. It works like [`../lime/retest-qa-fixes.md`](../lime/retest-qa-fixes.md): **one
entry per session, with context cleared between sessions**, and each session writes what it
settled back into this file.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then *How each
session runs* in [`layout-3-qa-fixes.md`](./layout-3-qa-fixes.md) (the digest recipe, the harness
parameters, `reach.mjs`), *Verification harness* in `../retro/qa-fixes.md`, then the memory notes
`verifying-the-published-tab` and `browser-tool-choice`. Then the entry that each ticket
reverses; each entry names it. [`layout-3.md`](./layout-3.md) holds the Figma node ids of every
Grunge layout-3 frame, with Lime's and Retro's twins beside them. The shapes the entries copy:
- JP-059 in [`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md): a frame literal becomes a seeded,
  emptiable field;
- JP-070 (heads) in [`layout-3-qa-fixes.md`](./layout-3-qa-fixes.md): `HEADING_3`, a per-layout
  seed resolved in `sectionVm` and `EditPanel` alike;
- JP-054 in [`../lime/layout-4-qa-fixes.md`](../lime/layout-4-qa-fixes.md) and its retest: a
  per-layout seed for a list (`FORM_FIELDS_4`, gated on the absent key and `d`);
- JP-077 · JP-078 in [`layout-4-qa-fixes.md`](./layout-4-qa-fixes.md): a frame claim re-seated as
  a repeater column, seeded verbatim;
- `BookedField` (CLAUDE.md, *Ten list-shaped contents*): a structured field that is not a list.

Branch: **`grunge-retest-qa-fixes`, forked from `main`** (`525dcab`, after PR #41). One commit per
entry (`Fix JP-069: …`). The decision-only entry commits the plan alone.

**Every report reproduces on HEAD.** The layout-3 screenshots are against the Pages build
`Tue, 29 Sep 2026 08:18:02 GMT`, which is the `99ebc8a` refresh (the Grunge layout-3 QA fixes).
JP-056's is against the older `Mon, 28 Sep 2026 11:47:52 GMT`. At triage (2026-09-29) the deployed
build read `Tue, 29 Sep 2026 12:40:40 GMT`, 8,763,002 bytes, byte-identical in size to `main`'s
root `index.html` (`9f16854`, the layout-4 QA refresh). Nothing these six tickets touch moved
between those builds. One thing in the screenshots did move: the bio's *Genres* row shows five
chips, and `main` seeds six (JP-081, "All Access"). That is not a report, and nothing here acts on
it.

**What reaches which templates.**
- **Grunge alone: JP-056**, the display face.
- **Every template: JP-066, JP-069, JP-070 and JP-071.** Each is a shared seam, in both halves
  (the `s.limeTree` block and Retro's and Pop's body) or above them in `sectionVm`.
- **Every template's frame, one question: JP-068.** All four layout-3 media heads read "KM BIO".

## The report (translated)

> **Layout 1**
> - **JP-056 — not fixed, stays awaiting fix.** The build still defines Grunge as `display:
>   'Anton'`. The heading, the section titles and the nav are all Anton. "Stones" appears nowhere
>   in the build, and no font file for it is loaded. Checked on layouts 1 and 4, desktop 1440.
>
> **Layout 3 — not fixed**
> - **JP-066:** the set cards still show *N SONGS* and the artist. There are no fields for the
>   mood, the set's length or a track's length; a song still has only Title / Artist / Tags.
> - **JP-068:** the media kicker still reads *Top tracks*, where the design reads *KM BIO*. The
>   question whether the design's copy is a slip is still open.
> - **JP-071:** *PERFORMING SINCE:*, *CURRENT ROLE:*, *BASED IN:*, *[ ABOUT ]*, *Genres*, *Gigs &
>   travel*, *● Testimonials* and *● Popular* still have no fields.
>
> **Layout 3 — partly fixed**
> - **JP-069:** the time is now in the row, "Manchester · 22:00", as the design has it. The date
>   disc still has no weekday: *JUL / 12* where the design has *JUL / 12 / SAT*.
> - **JP-070:** the Repertoire, Gallery, Events Map, Enquiry Form and Testimonials heads, the form's
>   boxes and the Pricing button now match the design. Still different: the Pricing intro ("The
>   quote covers the whole booking.") and the chips *All / Solo / Trio / Band* (design: *Duo /
>   Trio / Band*).

## Status

| Order | ID | Report (short) | Reverses | Verdict | Size | Decision | Status |
|---|---|---|---|---|---|---|---|
| 1 | JP-056 · JP-068 | Anton, not Stones Crush · the media kicker's "KM BIO" | `qa-fixes.md` JP-056 (A); `layout-3-qa-fixes.md` the three replies (JP-068 A) | **Both need an answer from outside the code**: a web licence (the PO) and the frame's intent (the designer) | — (decisions) | **user: C on its own branch; A** | **done** (no code; [`display-face.md`](./display-face.md) written; JP-068's reply stands) |
| 2 | JP-070 (rest) | The pricing intro and chips | `layout-3-qa-fixes.md` JP-070 (heads), "keep" and the chips' reply | **Named fit diffs**: the intro's count claim was dropped; the chips derive from one tag list for every layout | S–M | **user: B; A** | **done** (30 files, as named) |
| 3 | JP-069 (weekday) | No weekday in the date disc | `layout-3-qa-fixes.md` JP-069, the weekday half | **A data-model gap**: a gig has no year | S–M | **user: A** | **done** (a `year` column; 30 files, as named) |
| 4 | JP-071 | Eight section labels no field reaches | `layout-3-qa-fixes.md` the three replies (JP-071 A) | **The product's label rule**, now reversed for these eight | M | **user: A, A, glyphs in the markup** | **done** (eight seeded fields; 0 of 1,320, as named) |
| 5 | JP-066 | Set cards: no mood, set length or track length | `layout-3-qa-fixes.md` the three replies (JP-066 A) | **A data-model gap**: a set is a tag, and a song has no length | L | **user: A, A, A, A** | **done** (a `length` column and `SetsField`; 30 files, as named) |
| 6 | — | End-of-pass sweep | — | — | S | — | **done** (90 of 1,320 against `main`, as named; `index.html` refreshed) |

**Why this order:**
- **The two outside questions first.** Entry 1 writes no code. Its answers go out to the PO and the
  designer while the code entries run. If an answer turns into code (JP-056's mask, JP-068's
  derived kicker), it becomes its own entry, appended before the sweep.
- **Then by footprint**: JP-070's two seeds, JP-069's one column, JP-071's eight fields (whose
  seeded after-diff should be zero), and JP-066 last, which adds a repeater column and a twelfth
  structured editor and moves the most files.

**"Decision"** means the entry lists options with a recommendation. The session starts by asking
the user (one `AskUserQuestion`, up to four questions) and records the answer under **Decided**
before writing code.

## How each session runs

As `layout-3-qa-fixes.md`'s *How each session runs*, steps 1–8, with these differences:

1. The *Evidence* line numbers are from the triage (2026-09-29, `525dcab`). Re-check them.
2. **Every entry reverses a recorded call.** Its *Docs* adds a *reversed* (or *fixed since*)
   pointer in the entry it reverses, the Lime retest's pattern, and rewrites any CLAUDE.md or
   branch comment that states the old call as a rule.
3. **Themes 0–4, every entry**, at all three widths, canvas and `live=1`, against a HEAD worktree
   on :5174. Prove the harness first and **name the expected after-diff before writing code.**
4. **The real app is Grunge card 3** (*Inset Hero*), then Lime's, Editorial's and Retro's card 3,
   since every code entry here is shared.

**Do not refresh the root `index.html` per entry.** The sweep does it once.

---

## JP-056 · JP-068 — the two outside questions

One session, no code: one `AskUserQuestion` with the questions below, then **Decided**, the reply
lines, and whatever the answers ask for: a separate plan (JP-056's B or C) or an appended entry
(JP-068's B).

### JP-056 — the headings are Anton, not Stones Crush

**Reverses** `qa-fixes.md` JP-056, decided A on 2026-09-28: "a reply naming the stand-in; the
licence question is with the PO". The tester has now filed it as *awaiting fix*, so the reply did
not close it. Everything that entry gathered still holds; read it whole (its *Facts gathered at
triage* and its options B, C and D). In short:
- **Stones Crush** (Ryan Creative) is free for personal use only on 1001Fonts. A "Stones Crush 2"
  is sold on Creative Fabrica. Whether it is the same face, and whether its licence covers
  **webfont embedding**, was unverified.
- It is caps-only, which suits the `'title'` casing with per-site `textTransform`.

**Evidence** (re-checked at triage).
- `data.js:99`–`115`: the Grunge theme's `display` / `label` = Anton, `faceK: 0.75`, and the
  stand-in comment.
- `EncoreSection.jsx:104`–`105`: `faced()` / `facedLh()`. The 68 `faced(s, …)` sites, plus
  `labelStyle`, `Title` and the Grunge `Wordmark`, go through it.
- `data.js`: `antonEms()` × 0.75 is Grunge's nav fit (`vm.navEms`) and its head fits.

**The one fact that decides it**: has the PO bought, or agreed to buy, a Stones Crush licence that
covers web embedding on the artists' public sites?

**Decision.**
- **B (if yes). Ship the real face.** Write `plans/grunge/display-face.md` from `qa-fixes.md`'s
  option B (self-hosted `.woff2`, `@font-face` in `index.css` **and** `preview.html`, the popup's
  style clone, the single-file build's size, `faceK` → 1, a Stones Crush advance table in place of
  `antonEms × 0.75`, every Grunge head and nav fit re-measured, every Grunge digest at all four
  layouts moving, and the licence text kept in the repo). It is its own branch, after this batch
  merges.
- **C (if no; recommended while there is no licence). Distress Anton with a mask.** This gives
  the worn texture without a licence. The glyph shapes stay Anton's, and the reply must say so,
  because the tester will see it. Write `plans/grunge/display-face.md` from `qa-fixes.md`'s
  option C, with these additions:
  - **A candidate with no raster**: an inline SVG `feTurbulence` + `feComponentTransfer`
    threshold as a `data:` URI `mask-image` (and `-webkit-mask-image`), sized in `em`, so the
    speckle scales with the type. That puts nothing in `photos.js`. The session should compare it
    against a raster cut from the frame's own glyphs before choosing.
  - **Display sizes only**. The nav, the pills and the label-face chips keep clean Anton, because
    a mask eats thin strokes at 14–18px. Where exactly the cut falls is the plan's first
    measurement.
  - **Which spans**: a two-tone title (STATIC white, YOUTH red) takes the mask per span.
  - Every Grunge digest's style rows move at all four layouts, and no text or geometry should.
  - A second question: does C run as entries appended to this batch, before the sweep, or on its
    own branch after it merges? It moves every Grunge digest, so **its own branch is
    recommended**. That keeps this batch's digests readable.
- **A. Reply again.** Not recommended: the tester has refused it once.

### JP-068 — the media kicker reads *Top tracks*, the frame *KM BIO*

**Reverses** (if taken) `layout-3-qa-fixes.md`'s JP-068 A, "the frame's copy is a slip". The
reply said the slip had been passed to the designer (the layout-3 sweep's *Notes for the
designer*). The tester says the question is still open, so it is waiting on the designer.

**Evidence.** `FIELDS.media.kicker` at `data.js:1461` (`d: 'Top tracks'`, `in: [0, 2]`),
`vm.mediaKicker` at `EncoreBuilder.jsx:778`. Every layout-3 media head (`964:68698`, `964:68666`,
`964:68731`, and Editorial's) reads "KM BIO" over "Five worth your ear". That is the bio head's own
string (`964:68690` / `964:68658` / `964:68722`). Retro's fit named the duplication in its branch
comment above the media head (`EncoreSection.jsx:7021`). The bio's own layout-3 eyebrow already
spells its "KM" from `vm.initials` (`EncoreBuilder.jsx:535`; the comment at
`EncoreSection.jsx:4450`).

**Decision.**
- **A (recommended unless the designer says otherwise). The reply stands**, and the user relays
  the question to the designer again, by name, with both node ids.
- **B (if the designer says it is intended). Seed layout 3's kicker from the name**: the artist's
  initials plus " Bio" (`KAI MERCER` → "KM Bio", `STATIC YOUTH` → "SY Bio"), composed in
  `sectionVm` from `vm.initials`, the key the bio's own eyebrow reads, at `d === 2 && c.kicker ===
  undefined`, with the same arm in `EditPanel`'s chain (`formHeading3()`'s shape). It is appended
  as its own entry. Its after-diff is media `arch 2` × themes 0–4 × 3 × 2 = 30 files, the kicker
  row alone.
- The literal "KM BIO" is not an option: "KM" is the mock artist's initials, and it would be wrong
  for every real name.

**Decided** (user, 2026-09-29).
1. **JP-056: C, a distress mask over Anton.** No web licence has been bought or agreed.
   [`display-face.md`](./display-face.md) is written from option C.
2. **C runs on its own branch** (`grunge-display-face`) after this batch merges, not as entries
   appended here. So this batch's digests carry no Grunge style rows, and no entry is appended
   for it.
3. **JP-068: A, the reply stands.** The designer has not answered. The seed stays "Top tracks",
   and the user relays the question again by name, with both node ids. No entry is appended.

Asked over the evidence, re-checked on HEAD (`1d93e07`; no source has changed since `525dcab`).
Every line above held: `data.js:97`–`114` (the stand-in comment at `:99`, `faceK: 0.75` at
`:114`), `faced` / `facedLh` at `EncoreSection.jsx:104`–`105`, **68** `faced(s, …)` sites,
`antonEms` × 0.75 in `navFace` (`EncoreBuilder.jsx:644`), Anton the only face `index.html` and
`preview.html` load, and no `@font-face` or "Stones" anywhere in `source/`. Also
`FIELDS.media.kicker` at `data.js:1461`, `vm.mediaKicker` at `EncoreBuilder.jsx:778`,
`vm.initials` at `:535`, and the "KM BIO" comments at `EncoreSection.jsx:4450` and `:7021`.

**Settled** (2026-09-29, no code).
- **Nothing under `source/` changed**, so there is no digest.
- **`display-face.md`** takes option C with the three additions this entry named: the inline-SVG
  `feTurbulence` candidate against a raster cut from the frame's glyphs, display sizes only, and
  the mask on the element that paints only its text, which is per span on a two-tone title. Writing
  it found four more things, and the plan carries them:
  - `digest.mjs` and `build-digest.mjs` do not read `mask-image`, so teaching them is its step 0.
  - The raster candidate carries its own licence question, since it is derived from renders of a
    personal-use-only face.
  - `feTurbulence` needs a pinned `seed`, or the renders are not deterministic.
  - The mask reaches `EncoreSection` as a vm key (`vm.distress`), undefined off Grunge, so themes
    0, 1, 3 and 4 digest zero.
- **Docs.** A *reversed* pointer on `qa-fixes.md` JP-056's Decided, and `layout-1.md` open
  question 1 now points at `display-face.md` as written from C. Open question 6 (Anton at 0.75) is
  unchanged, since the mask keeps the scale. `plans/README.md`'s row is the sweep's (step 5).
- **JP-068's designer line is already in the sweep** (step 5, "JP-068 (if still open)"), so this
  entry adds nothing there.
- **The reply lines**, in the sweep's shape so step 6 can use them unchanged:
  - **JP-056 — planned for a later build; the licence stays with the PO.** This build is
    unchanged: the headings are still Anton, and nothing named Stones Crush is loaded. Its only
    free licence is for personal use, and no licence covering web use has been bought. A later
    build adds the design's worn texture as a mask cut into Anton's large headings. The letter
    shapes stay Anton's, and small type (the nav, the buttons, the labels) stays clean, because
    the texture eats thin strokes at those sizes. If the PO buys a web licence, the real face
    replaces the mask.
  - **JP-068 — by design; with the designer again.** The Media Player's small heading is its
    **Kicker** field (Media Player → Kicker), which starts as "Top tracks". The design's "KM BIO"
    is the Bio's heading (`964:68690`) repeated over the Media Player (`964:68698`), with the
    mock artist's initials. The question is back with the designer, naming both frames. If they
    confirm it is intended, the kicker will start from the artist's own initials plus "Bio",
    never the literal "KM". To match the design now, type `KM BIO` into Kicker.

---

## JP-070 (rest) — the pricing intro and chips

**Reverses** `layout-3-qa-fixes.md` JP-070 (heads), decision 2 ("the pricing intro stays") and
decision 4 (the chips as a reply).

**Evidence.**
- **The intro.** `FIELDS.pricing.intro` (`data.js:1503`, *Intro line*, `def: 'pricingIntro'`,
  `in: [2]`), `DEFS.pricingIntro` 'The quote covers the whole booking.' (`data.js:1005`),
  `vm.pricingIntro` (`EncoreBuilder.jsx:868`). Every layout-3 frame reads "Four ways to book this
  act. Choose by the kind of night you're throwing — the quote covers the whole booking." The first
  sentence is a count, and the frame draws three packages. The *intro* reaches layout 3 alone, so
  a layout-3 seed is the same as replacing the default. It is still written as
  `PRICING_INTRO_3` beside `PRICING_HEADING_3`, for the table's sake.
- **The chips.** `repChips()` over `TIERS`' tags (`data.js:702`–`714`): The House Party *Solo*, The
  Wedding Set *Solo, Trio, Band*, The Festival Set *Trio, Band*, behind `REP_ALL`. One tag list
  serves every layout, and the frames disagree on it: Retro layout 1 draws Solo / Trio / Band,
  Grunge layout 1 Private Event / Club Night / Festival, and every layout-3 frame Duo / Trio / Band
  with **Duo picked** and all three rows shown under it. `All` is layout 1's named intended diff
  (CLAUDE.md, *The pricing cards filter*). `tiersVal` is at `EncoreBuilder.jsx:3792` and
  `pageTiers()` at `data.js:1860`. The calendar's layout-4 wizard reads name and price only, so a
  layout-3 seed that differs from `TIERS` **in tags alone** does not reach it.

**Frame first.** Read the Grunge layout-3 pricing master (`964:68712`, and `984:13925` /
`984:13956`) for **which tags each of the three rows carries**, if the frame says so (a row's own
chips), and for what the capsule does. It shows all three rows under a picked Duo, so either every
row is a Duo package, or the pick filters nothing in the frame's picture.

**Decision** (one `AskUserQuestion`).
1. **The intro.**
   - **A. The frame verbatim** at layout 3, both sentences. "Four ways" is then false on the
     seeded page, which has three packages.
   - **B (recommended). The frame's second sentence**: "Choose by the kind of night you're
     throwing — the quote covers the whole booking." The first sentence goes to the designer
     note. The tester will see it missing, and the reply says why.
   - **C. Keep**, a reply again.
2. **The chips.**
   - **A (recommended). A layout-3 tag seed**: `TIERS_3`, the same three packages with the
     frame's tags, at `d === 2 && c.tiers === undefined`, `FORM_FIELDS_4`'s gate, in `sectionVm`
     and `tiersVal` alike. `All` stays, as the one way a filter clears. The chips then read *All /
     Duo / Trio / Band*.
   - **A+. A, and layout 3 drops `All`**, with chip 0 picked at rest on both surfaces (*answered
     differently* by Editorial's JP-089 (rest), 2026-10-05,
     [`../editorial/retest-qa-fixes.md`](../editorial/retest-qa-fixes.md): `All` goes, and the row
     rests with **no** chip picked, so the first paint filters nothing): the form
     chip's rule, "the picture *is* a choice". This is coherent only if the frame read shows every
     seeded package carrying the first tag, since the frame draws three rows under Duo. Otherwise
     the first paint filters rows away. The canvas's "pins chip 0 and filters nothing" becomes
     "pins chip 0 and filters by it".
   - **B. Retag the one seed** (*Solo* → *Duo*). This moves layout 1's chips on every template,
     against Retro layout 1's own frame. Not recommended.
   - **C. Reply again.**

**Expected after-diff** (named in the session once the answers are in): pricing `arch 2` × themes
0–4 × 3 × 2 = **30 files** for either half. The intro's text row, and any reflow under it. The
chips' labels (A), or their count and the rows shown (A+). Pricing `arch 0`, `1` and `3` and the
calendar are **0**. That is the check on `pageTiers`.

**Verify.** The seed digest. The panel at layout 3 shows the frame's intro and the layout-3 tags
in *Packages*, and at layouts 1, 2 and 4 today's. An edited package list is the artist's at every
layout. The published filter at 1440 / 768 / 390: each chip filters, and the FEATURED seat moves
as JP-048 says.

**Docs.** CLAUDE.md's pricing paragraph (the chip row, and "the canvas pins chip 0" on A+). A
*reversed* pointer in `layout-3-qa-fixes.md` JP-070 (heads), decisions 2 and 4. `./layout-3.md`'s
pricing Settled.

**Decided** (user, 2026-09-29; two questions, each the recommendation).
1. **The intro: B, the frame's second sentence.** Layout 3 seeds "Choose by the kind of night
   you're throwing — the quote covers the whole booking." as `PRICING_INTRO_3`. "Four ways to
   book this act." goes to the sweep's designer note, and the reply says why it is missing.
2. **The chips: A, a layout-3 tag seed.** `TIERS_3` is `TIERS` with *Solo* → *Duo* (The House
   Party *Duo*, The Wedding Set *Duo, Trio, Band*, The Festival Set *Trio, Band*). It is read only
   while `c.tiers` is absent at layout 3 (`d === 2`, `FORM_FIELDS_4`'s gate), in `sectionVm` and
   `tiersVal` alike. `All` stays in front, and the canvas still pins it, so the chips read *All /
   Duo / Trio / Band* and the seeded picture shows all three rows with FEATURED on the Festival
   Set. **The `All` half is reversed** (Editorial's JP-089 (rest), user call, 2026-10-05,
   [`../editorial/retest-qa-fixes.md`](../editorial/retest-qa-fixes.md)): the capsule reads *Duo /
   Trio / Band* with none lit at rest. The seeded picture still shows all three rows with FEATURED
   on the Festival Set.

Asked over the frame read, which held at all three widths (`964:68712`, `984:13925`,
`984:13956`). **No row carries chips of its own**, and the capsule's `opt-active` is *Duo*, over
all three rows, with the badge on the Festival Set. So the frame does not say which package
carries which tag. A+ would have needed the Festival Set tagged *Duo* too, a tag the frame never
states, to keep the frame's three rows under a picked Duo. The masters also carry a foot line,
"Prices may vary by date, location, and length of set.". That is already `DEFS.pricingSub`, so it
is not part of this report.

The evidence, re-checked on HEAD (`921e6cb`): `FIELDS.pricing.intro` at `data.js:1503`,
`DEFS.pricingIntro` at `:1005`, `vm.pricingIntro` at `EncoreBuilder.jsx:868`, `TIERS` at
`data.js:702`–`714`, `tiersVal` at `EncoreBuilder.jsx:3792`, `pageTiers()` at `data.js:1860`,
and `repChips()` at `:2109`. Every line held. `tierList` is at `EncoreBuilder.jsx:920`, and
`vm.tierChips` at `:1000`.

**The harness proof** (before the edit): the HEAD worktree on :5174 against the tree on :5173,
every category × themes 0–4 × three widths, canvas and `live=1`, gave **0 of 1,320**.

**The expected after-diff**, named before the code: **30 files**, pricing `arch 2` × themes 0–4 ×
three widths × both surfaces. In each file the intro's `<p>` text and its height where it wraps
to more lines, with the capsule, rows and foot moving down under it. Also the second chip's
label, *Solo* → *Duo*, with its width and everything after it in the capsule (the offer line's
x). Pricing `arch 0`, `1` and `3`, the calendar, and every other category: **0**.

**Settled** (2026-09-29).
- **Code.**
  - `data.js`: `TIERS_3` below `TIERS`, written as `TIERS.map` with the three tag strings
    swapped in, so names, prices, blurbs and features have one source. `PRICING_INTRO_3` sits
    beside `PRICING_HEADING_3`, and `FIELDS.pricing.intro` takes it as a plain `d`. The intro
    reaches layout 3 alone, so a per-layout gate would add nothing. `DEFS.pricingIntro` is gone;
    it had no other reader. The *Packages* hint now says layout 3 starts as Duo, Trio and Band
    until the list is edited. `pageTiers()`' comment says why it keeps `TIERS`.
  - `EncoreBuilder.jsx`: `tierList` reads `d === 2 ? TIERS_3 : TIERS` on the absent key.
    `tiersVal` reads `design === 2 ? TIERS_3 : TIERS`, which is `formFieldsVal`'s shape.
    `vm.pricingIntro` is `cv('intro', PRICING_INTRO_3)`.
  - `EncoreSection.jsx`: the layout-3 branch comment on the intro and the capsule. No render
    code moved.
- **After: 30 files, as named** (`TIERS_3` confirmed in :5173's module first). Pricing `arch 2` ×
  themes 0–4 × three widths × both surfaces. The other 1,290 renders are 0, including pricing
  `arch 0`, `1` and `3` and the calendar, whose layout-4 package card reads `pageTiers()`. Rows
  added or removed: none.
  - At 1440 and 768 each file moves **7 rows**: the intro `<p>` (one line at both widths, 434.2
    wide at 1440 under Grunge), the *Solo* → *Duo* chip (43.8 → 42.1 wide), and the chips and
    offer after it.
  - At 390 every row moves (109–116 per file). The intro wraps to two lines (39 tall), and the
    capsule and the stack drop under it.
- **The published filter** (a one-off puppeteer probe over the harness, `live=1`, themes 0–4 ×
  three widths, deleted). Every render reads *All / Duo / Trio / Band* (*ALL / DUO / TRIO /
  BAND* under Pop's casing). **All** shows all three rows with FEATURED on the Festival Set.
  **Duo** shows the House Party and the Wedding Set, and FEATURED moves to the Wedding Set.
  **Trio** and **Band** show the Wedding Set and the Festival Set, with FEATURED on the Festival
  Set. That is JP-048's last-row-on-show rule. Nothing overflows, and there are no page errors.
- **States** (`&cj=`). An edited list at layout 3, tagged *Solo*, is the artist's: the chips
  read *All / Solo / Trio / Band* and filter. An emptied intro drops the `<p>`, and a typed one
  prints as typed.
- **The real app** (a one-off puppeteer script at 1600 × 1000, deleted): Grunge card 3, then
  Lime's, Editorial's and Retro's. The steps were *Use this header*, the Pricing row, then the
  layout picker through 1, 2 and 4 and back to 3.
  - **Layout 3.** *Intro line* reads the frame's sentence with no note. *Packages* reads *Duo* /
    *Duo, Trio, Band* / *Trio, Band*. The canvas capsule reads *All / Duo / Trio / Band*.
  - **Layouts 1, 2 and 4.** *Packages* reads *Solo* / *Solo, Trio, Band* / *Trio, Band*, and
    *Intro line* carries "Not shown in this layout". Layout 1's canvas reads *All / Solo / Trio /
    Band*.
  - **Published at layout 3.** At 1440, 768 and 390 the tab prints the intro and *All / Duo /
    Trio / Band*. Duo filters to two rows with FEATURED on the Wedding Set, and there is no
    horizontal scroll.
  - **An edit makes the list the artist's.** Renaming the first package at layout 3 and then
    switching to layout 1 leaves *Packages* on the Duo tags and the renamed row, and the canvas
    reads *All / Duo / Trio / Band*. This is the `FORM_FIELDS_4` rule, as decided.
  - No page errors on any of the four templates.
- **Reach.** Neither key's `in` moved (`intro` `[2]`; `tiers` has none), so no `reach.mjs` run
  was owed.
- **Docs.** CLAUDE.md's pricing paragraph (layout 3's own tags, and the intro beside the offer)
  and *Ten list-shaped contents*' seed list. *Reversed* pointers in `layout-3-qa-fixes.md`:
  JP-070 (heads) decisions 2 and 4, its reply's *Not changed*, the sweep's reply line, and
  designer note 4. The pricing Settled in `./layout-3.md`. One-line pointers in
  `../lime/layout-3.md`'s named diffs and `../retro/layout-3.md`'s intro lesson.
- **For the sweep's designer note.** "Four ways to book this act." counts packages over a frame
  that draws three. The page now keeps the rest of the paragraph. The frame also never says which
  package carries which tag, so `TIERS_3` puts *Duo* where `TIERS` has *Solo*.
- **For JP-069 (weekday).** This entry moved its evidence. As it stands now: `GIGS` at
  `data.js:816`, `GIG_KEYS` at `:824`, `CAL_OPEN` at `:1025`. The weekday comments are at
  `EncoreSection.jsx:18634` (the `s.limeTree` block) and `:19318` (Retro / Pop). Each month site
  moved down by 2 as well (about `:18954` and `:19322`).

Reply: **JP-070 (rest) — fixed.** Layout 3's Pricing now starts from the design's intro and
chips.
- The intro under "Pricing" starts as "Choose by the kind of night you're throwing — the quote
  covers the whole booking.". The design's first sentence, "Four ways to book this act.", is
  left out: it counts the packages, the design itself shows three, and the count would be wrong
  for any artist with a different number. It is still the *Intro line* field, so it can be
  changed or emptied.
- The chips start as "All / Duo / Trio / Band". In layout 3 the three packages start tagged
  Duo / Duo, Trio, Band / Trio, Band (Pricing → Packages → Tags). The other layouts keep Solo,
  as Retro's layout-1 design does. "All" stays first, because it is the only way to clear the
  filter. Once the packages are edited, the list is the artist's at every layout.
- On every template.

---

## JP-069 (weekday) — the date disc has no weekday

**Reverses** the weekday half of `layout-3-qa-fixes.md` JP-069 ("a gig has no year, so SAT cannot
be derived; a data-model question for the BA").

**Evidence.**
- `GIGS` / `GIG_KEYS` at `data.js:805`–`813`: `{ venue, city, time, month, day, link }`. `month` is
  free text ("Jul") and `day` a string ("12").
- The layout-3 disc: the `s.limeTree` block's month at `EncoreSection.jsx:18952`, and the comment
  naming the missing weekday at `:18632`. The Retro / Pop body's month at `:19320`, with the
  weekday comment at `:19316`.
- Frames: every layout-3 row reads "JUL / 12 / SAT", "JUL / 25 / FRI", "AUG / 02 / SAT", "AUG / 16 /
  SAT", "AUG / 30 / SAT". Those are **2025's weekdays**, the year of `CAL_OPEN` (`'2025-06-12'`,
  `data.js:1024`).

**Frame first.** Check whether the map's layouts 1, 2 and 4 frames draw a weekday anywhere
(layout 4's ticker, layout 2's featured panel). If one does, it reads the same key.

**Decision.**
- **A (recommended). A `year` column** in `GigsField`, seeded `2025` on all five gigs and never
  printed. `sectionVm` derives `vm.gigs[].weekday` through `Date.UTC`:
  - the month is parsed by its first three letters, case-folded;
  - a day that does not round-trip (31 Jun) gives no weekday;
  - an empty or unparseable year, month or day gives no weekday, and the disc's third line is not
    drawn.

  `GIG_KEYS` gains `year`, so a row holding only a year is not blank. The weekday is cased in the
  disc's own style (`SAT`). Upcoming / Past (JP-047) becomes derivable, but it stays out of scope
  and is named in the reply.
- **B. A typed `weekday` column**, JP-077's re-seat shape, seeded verbatim. It is cheaper, and it
  can contradict the date.
- **C. Reply again.**

**Expected after-diff (A):** map `arch 2` × themes 0–4 × 3 widths × both surfaces = **30 files**,
the disc's third line and the disc's height where it grows. Add any other layout the frame read
adds.

**Verify.** The seed reads SAT / FRI / SAT / SAT / SAT on both surfaces. `&cj=` edges: no year;
"july"; "Sept"; 31 Jun; a two-digit year. `GigsField` shows the column. A blank row is still
dropped. The city chips, the pager and the lit row still work.

**Docs.** CLAUDE.md's `c.gigs` shape (*Ten list-shaped contents*) and the `GIG_KEYS` list. The two
branch comments. A *reversed* pointer in `layout-3-qa-fixes.md` JP-069.

**Decided** (user, 2026-09-29): **A, a `year` column.**
- `GigsField` gains a *Year* box. `GIGS` seeds `'2025'` on all five gigs, and nothing prints it.
- `sectionVm` derives `vm.gigs[].weekday` through `Date.UTC` (`gigWeekday()` in `data.js`, beside
  `weekdayOf()`):
  - the month is matched by its first three letters, case-folded, against `MONTHS`;
  - the year must be four digits, because `Date.UTC(25, …)` is 1925;
  - the day must exist in that month (31 Jun gives nothing);
  - anything else gives `''`, and the disc draws no third line.
- `GIG_KEYS` gains `year`, so a row holding only a year is not blank.
- Upcoming / Past (JP-047) becomes derivable. It stays out of scope, and the reply names it.

Asked over the frame read and the harness proof below.

**The frame read** (`get_design_context`, read-only):
- **Map layouts 1, 2 and 4 draw no weekday and no year** in any of the nine Grunge frames or the
  1440 twins:
  - layout 1: `964:58605`, `986:44063`, `986:44075`; Lime `964:58593`, Retro `964:58581`;
  - layout 2: `964:64632`, `986:13767`, `986:13786`; the twins `964:64594` and `964:64651`;
  - layout 4: `964:73019`, `971:8136`, `977:12363`; the twins `964:72924` and `964:72830`.

  Layout 1 prints month over day. Layout 2 prints a day tile and `Manchester · JUL`, and its
  featured panel prints no date at all. Layout 4's ticker reads `Manchester · JUL 12 · 22:00`.
  So no other arch joins the after-diff.
- **Layout 3 draws the third line at all three widths.** Grunge `964:68713` / `984:13926` and the
  twins `964:68649` / `964:68681` each have six discs, and the 390 master `984:13957` has one:
  `JUL/12/SAT`, `JUL/25/FRI`, `AUG/02/SAT`, `AUG/16/SAT`, `AUG/30/SAT`, and the frame's past row
  `JUN/14/SAT`. Those are 2025's weekdays.
- **The weekday takes the month's style**: `Label/XXXS`, `font/body` at a literal 7, line height
  1.3, typed in capitals, in the disc's own ink.
- **The disc is a fixed 56 × 56**, vertical, with 0 gap, centred. The three lines stack to about
  43, so the disc does not grow.

**The harness proof** (before the edit): the HEAD worktree (`cd3afb6`) on :5174 against the tree
on :5173, every category × themes 0–4 × three widths, canvas and `live=1`: **0 of 1,320**.

**The expected after-diff**, named before the code: **30 files**, map `arch 2` × themes 0–4 × three
widths × both surfaces. Each disc gains one 7px row, the weekday, and the month and day rows move
up by half its height inside the fixed disc. Nothing outside the disc moves. Map `arch 0`, `1` and
`3` and every other category: **0**. Layout 2's `when` and layout 4's `meta` never read `year`, and
that is what holds them at 0.

**Settled** (2026-09-29).
- **The evidence, re-checked on HEAD** (`cd3afb6`). Every line held as entry 2 left it:
  - `GIGS` at `data.js:816`, `GIG_KEYS` at `:824`, `CAL_OPEN` at `:1025`;
  - the weekday comments at `EncoreSection.jsx:18634` (the drops list above the `s.limeTree`
    block) and `:19318` (Retro / Pop);
  - the month sites at `:18954` and `:19322`.

  Nothing but the layout-3 branch reads `gg.month` / `gg.day` as a disc. Layout 1's chip (about
  `:17227`) and layout 2's tile (about `:17904` and `:18328`) do not share the disc.
- **Code.**
  - `data.js`:
    - `GIGS` (`:820`) seeds `year: '2025'` on all five rows, under a comment naming why 2025.
    - `GIG_KEYS` (`:829`) gains `year`.
    - `gigWeekday()` (`:2214`) sits beside `weekdayOf()`. It uses `MONTHS`, `monthSpan()` and
      `CAL_DAYS`, so there is no new table.
    - `FIELDS.map`'s gigs comment and hint now name the year.
  - `EncoreBuilder.jsx`:
    - `vm.gigs[].weekday` (`:1499`) is added beside `month` / `day`. `when` and `meta` are
      untouched.
    - In `GigsField` (`:2732`), the month / day pair is a row of three with a *Year* box
      (`inputMode="numeric"`, placeholder "Year"). `add()`'s blank row carries `year: ''`.
    - At layout 3 alone (`design === 2`), a row that is not blank but names no day prints "No
      weekday: the date needs a real day and a four-digit year." It appears only once one of the
      three date boxes is filled, so a new row holding only a venue shows no hint while it is
      being filled in. No other layout prints the weekday, so no other layout carries the line.
    - The header comment's "Nothing here parses them" is rewritten.
  - `EncoreSection.jsx`: a third span in both halves' disc (`:18961` and `:19336`), gated on
    `!!gg.weekday`. It is in the month's style: body, a literal 7, line height 1.3, uppercase in
    CSS, as the month is. Two more comments changed:
    - the drops list's weekday now reads *since restored*;
    - the chip-row comment says a year would make Upcoming / Past derivable on the published tab,
      and that it is out of scope.
  - There is no gate on `d`: the seed is one list for every layout, and only layout 3's branch
    prints the key. The panel gates its hint on `design`.
- **After: 30 files, as named** (`gigWeekday` confirmed in :5173's modules first). Map `arch 2`
  × themes 0–4 × three widths × both surfaces. The other 1,290 renders are 0, including map
  `arch 0`, `1` and `3`.
  - Every file is exactly **two moved rows and three new ones per disc**: five discs at 1440 and
    768, one at 390, checked by count on all 30.
  - The month and day rise by half the new line inside the fixed disc: 3.7 at 1440, where
    Grunge's 7 renders at 5.7 under the 0.82 scale, and 4.5–4.6 at 768 and 390. The weekday row
    lands below them.
  - The disc keeps its size, and nothing outside it moves.
- **The seed on both surfaces** (a one-off probe over the harness, deleted). Themes 0–4 × three
  widths, canvas and `live=1`, read `JUL/12/SAT JUL/25/FRI AUG/02/SAT AUG/16/SAT AUG/30/SAT`. At
  390 live, the pager walked all five and clamped at the last.
- **Edges** (`&cj=`, `live=1`, themes 0–4, 1440 and 390):
  - "july" → `JULY/12/SAT`. The month prints as typed, as before.
  - "Sept" 6 → `SEPT/6/SAT`.
  - 31 Jun → `JUN/31`, with no third line.
  - A two-digit year "25" → `JUL/12`, with none.
  - A row with no `year` key (a list stored before this entry) → `JUL/12`, with none, and no
    error.
  - A row holding only a year is kept, as an empty disc. An all-empty row is dropped.
  - 29 Feb 2028 → `FEB/29/TUE`.
- **Live controls**: at 1440 the *Lake District · 1* chip filters to `AUG/02/SAT` alone. A click on
  Mint Lounge lights its row, black on `#DF262C` under Grunge. No page errors.
- **The real app** (a one-off puppeteer script at 1600 × 1000, deleted). Each template was opened
  at card 3 through *Use this header*, then *Back to page list* → Events Map.
  - **Grunge, Lime, Editorial and Retro alike**:
    - The panel shows five *Year* boxes reading 2025 and no hint. The canvas reads SAT / FRI /
      SAT / SAT / SAT.
    - Typing "26" into row 1 drops its weekday and prints the hint. "2026" gives
      `JUL/12/SUN`, and the hint goes.
    - Published and opened, the tab reads `JUL/12/SUN JUL/25/FRI AUG/02/SAT AUG/16/SAT
      AUG/30/SAT` at 1440 and 768, and `JUL/12/SUN` at 390. No page errors.
  - **Grunge, at layout 1** (the layout picker's item 0): with row 2's year emptied, the panel
    keeps the *Year* boxes and prints no hint. At layout 3 it printed one.
  - Screenshots of Grunge's and Retro's 1440 discs read as the frame's `JUL / 12 / SAT`.
  - **The panel row** (Grunge, 1600 × 1000): *Jul* / *12* / *2025* sit on one line, three boxes
    of 61 in the 195-wide column with 6 gaps, with none past its edge. *Add gig* plus "Gorilla"
    prints no hint, and typing a month then prints one.
- **Reach.** `FIELDS.map.gigs` has no `in`, and the year prints nowhere, so no `reach.mjs` run was
  owed.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed; the sweep does
  that.
- **Docs.**
  - CLAUDE.md: the `c.gigs` shape with `year` and `gigWeekday()`, and the map paragraph (the
    disc's weekday; Upcoming / Past derivable and out of scope). `GIG_KEYS` is named there by
    name, so its list needed no edit.
  - README's `GigsField` shape.
  - *Reversed* pointers in `layout-3-qa-fixes.md`, at five places:
    - its status row;
    - the JP-069 Decided;
    - the reply's weekday half;
    - the sweep's reply line;
    - the BA note beside JP-066.
  - *Since* lines on the Lime retest's JP-047 and on `layout-4-qa-fixes.md`'s ticker option
    (`:1198`, "a gig has no year").
- **For JP-071.** This entry's hunks in `EncoreSection.jsx` all sit inside `EventsMap`, so the
  bio and media labels did not move. Re-grepped on this tree:
  - the bio's stats at `:4594`–`4596` and `:4820`–`4822`, `[ About ]` at `:4661` / `:4907`, and
    *Genres* at `:4769` / `:5361`;
  - media's `● Popular` at `:6611`, `:6927`, `:7330` and `:7458`;
  - the map's *Gigs & travel* at `:18899` / `:19269`;
  - the testimonials' `● Testimonials` at `:21925` / `:21977`;
  - the "● Popular precedent" comments at `:16012`, `:21132` and `:21969`.

Reply: **JP-069 (weekday) — fixed.** The Events Map's date disc in layout 3 now reads "JUL / 12 /
SAT", as the design does.
- Each gig has a new **Year** box (Events Map → Upcoming gigs), beside the month and the day. The
  five starting gigs are set to 2025, the year whose weekdays the design shows. The year itself is
  not printed anywhere.
- The weekday is worked out from the date, never typed, so it cannot contradict it. Change the day
  or the year and the weekday follows.
- The month can be written as "Jul", "July" or "Sept". The year needs four digits. If the date is
  not a real day (for example 31 Jun, or a two-digit year), the disc shows only the month and day,
  and in layout 3 the gig's editor says why.
- On every template, in the editor and on the published page, at every width. The other map
  layouts show no weekday in the design, and they are unchanged.
- With a year on each gig, "Upcoming" / "Past" could now be worked out. It is not part of this
  fix.

---

## JP-071 — eight section labels no field reaches

**Reverses** `layout-3-qa-fixes.md`'s JP-071 A, "by design, the product's rule for labels", which
rests on Retro layout 2's rule (`../retro/layout-2.md:348`–`350`: a frame label stays a literal).
The reversal is **scoped to the eight labels reported**. The siblings nobody reported stay
literals and are named in the reply: the bio's `Bio` eyebrow, media layout 2's `● Featured`, the
calendar legend's three labels, and testimonials layout 2's `✎ What clients say`. *(Two of them
were reported since and are fields now, `● Featured` and `✎ What clients say`, with six more
layout-2 labels: JP-095 (a), [`../editorial/layout-2-qa-fixes.md`](../editorial/layout-2-qa-fixes.md).)*

**Evidence** (triage, `525dcab`).

| Label | `s.limeTree` block | Retro / Pop body | Also printed |
|---|---|---|---|
| Bio `Performing\nsince:` / `Current\nrole:` / `Based\nin:` | `EncoreSection.jsx:4594`–`4596` | `:4820`–`4822` | — |
| Bio `[ About ]` | `:4661` | `:4907` | — |
| Bio `Genres` | `:4769` | — | bio layout 4, `:5361` |
| Media `● Popular` | `:7330`, `:7458` | — | media layout 2, `:6611`, `:6927` |
| Map `Gigs & travel` | `:18894` | `:19257` | — |
| Testimonials `● Testimonials` | `:21906` | `:21958` | — |

Re-grep before trusting these. The three stat labels are `stat('Performing\nsince:', …)` calls
(their break is in the literal), the map's is `Gigs &amp; travel`, and the testimonials' is
`&#9679; Testimonials`. `FIELDS.map` and `FIELDS.testimonials` carry no eyebrow key today
(`heading` / `sub` only), and `FIELDS.media.kicker` is the media head's eyebrow, not the list's
`● Popular`.

**Decision** (one `AskUserQuestion`).
1. **Scope.** **A (recommended): the eight reported**, one key each, reaching every layout that
   prints the same word through the same key (bio layout 4's *Genres*, media layout 2's
   `● Popular`), with measured `in`s. **B**: the eight plus the four siblings, which is the
   whole-product label sweep.
2. **The stat labels' line break.** The frames break each before its last word. **A
   (recommended)**: single-line fields, and `sectionVm` breaks before the last word (a composed
   line, the calendar's rule). That reproduces all three seeds, and a typed label keeps the frame's
   shape. **B**: textarea fields seeded with the break.
3. **The glyphs.** **Recommended**: `●` and the brackets of `[ About ]` stay the block's, and the
   field is the word. An emptied field drops the whole label, glyph included.

**Shape (A).** JP-059's: each key seeded with the literal it replaces (a `d`), uncased (every site
keeps its own casing), emptiable, drawn only when filled. The stat labels are also gated on their
value, as today. Key names are the session's to choose (e.g. `sinceLabel`, `roleLabel`,
`baseLabel`, `aboutLabel`, `tagsLabel`; media `listLabel`; map and testimonials `kicker`).

**Expected after-diff: zero.** Every seed is the literal it replaces, so the seeded page is
byte-identical on both surfaces at every width. That is the check. Then `&cj=` states: each label
typed and emptied, at 1440 / 768 / 390, with a `textContent` read beside the digest, since the
digest's text column is short.

**Docs.** CLAUDE.md, where it cites the "● Popular precedent" (the gallery and calendar
paragraphs, and the testimonials eyebrow comment at `:21950`). The branch comments at `:16010`,
`:21113` and `:21950`. A *reversed* pointer in `layout-3-qa-fixes.md`'s JP-071, and a line in
`../retro/layout-2.md` beside the rule it narrows.

**Decided: A, A, glyphs in the markup** (user, 2026-09-29).
1. **The eight reported**, one key each, reaching every layout that prints the same word through
   the same key. Bio layout 4's prose "Performing since {date}" (`:5189` / `:5398`) is a sentence
   prefix before the value, not the stat label, so it stays a literal and is named with the four
   siblings.
2. **Single-line stat labels**; `sectionVm` breaks each before its last word (no break in a
   one-word label), so the seeds render as today and a typed label keeps the frame's shape.
3. **The field is the word**: `●` and `[ ]` stay the markup's, and an emptied field drops the
   whole label, glyph included.

Asked over the entry's evidence, re-grepped on `da5e77b`: every site at the line the Evidence
names. The harness was proved first: a HEAD worktree on :5174 against the tree, themes 0–4, three
widths, canvas and `live=1`, **0 of 1,320**. **Expected after-diff: zero.**

**Settled** (2026-09-29).
- **Eight fields, each seeded with the literal it replaces.** The constants sit beside `BIO_TAG`
  in `data.js`: `BIO_SINCE_LABEL` "Performing since:", `BIO_ROLE_LABEL` "Current role:",
  `BIO_BASE_LABEL` "Based in:", `BIO_ABOUT_LABEL` "About", `BIO_TAGS_LABEL` "Genres",
  `MEDIA_LIST_LABEL` "Popular", `MAP_KICKER` "Gigs & travel" and `TESTI_KICKER` "Testimonials".
  - **Bio rows** (after `since`): `sinceLabel` *Performing since label*, `roleLabel` *Current role
    label*, `baseLabel` *Based in label*, `aboutLabel` *About label*, all `in: [2]`, and
    `tagsLabel` *Genres label*, `in: { Lime: [2], Grunge: [2], Editorial: [2, 3], '*': [3] }`.
  - **Media**: `listLabel` *List label*, `in: [1, 2]`, after `heading`.
  - **Map and testimonials**: `kicker` *Kicker*, `in: [2]`, ahead of `heading`. The key is free in
    both sections, and the header's `kicker` is read off the header alone (`own`).
  - Each has a hint that says where it prints and what emptying it does.
- **`sectionVm`**: `vm.sinceLabel` / `roleLabel` / `baseLabel` go through one `breakLast()`, which
  trims and puts a `\n` before the last word, so the seeds are the old literals byte for byte and
  a one-word label stays one line. `vm.aboutLabel`, `vm.tagsLabel`, `vm.listLabel`, `vm.mapKicker`
  and `vm.testiKicker` are plain `cv()` reads. All uncased. None has a per-layout seed, so
  `EditPanel`'s fallback chain needed nothing.
- **`EncoreSection`**, both halves wherever a label has two:
  - `stat(key, label, value)` keys on the slot (`since` / `role` / `base`), no longer on the
    label text, which two emptied labels would now share. An emptied label leaves the value
    alone in its column. The label takes `overflowWrap: 'break-word'` as the value beside it does.
  - `[ {aboutLabel} ]`, `● {listLabel}` and `● {testiKicker}` keep the glyph in the markup, and
    each is not rendered when empty.
  - **Media's counter row**: with the label emptied the row is `flex-end`, so the "5 Featured /
    5 Max" counter keeps its right-hand seat (measured: its right edge does not move). The label
    wraps (`whiteSpace: 'normal'`, `minWidth: 0`, `overflowWrap: 'anywhere'`) with the row's gap
    at 12. That was the one failure the states run found: an 85-character label ran Lime's layout
    2 13px past the page at 1440, since its chip style is `nowrap`. The seeded row has free
    space, so neither change moves it.
  - The comments that cited the "● Popular precedent" are rewritten: the map's and testimonials'
    eyebrows (now fields), and the calendar legend and testimonials layout 2's `✎ What clients
    say` (unreported siblings, literals by Retro layout 2's rule).
- **Digest.** Themes 0–4, three widths, every category, canvas and `live=1`, against the HEAD
  worktree: **0 of 1,320**, before and after the wrap fix. As named.
- **Reach** (`reach.mjs`, eight new rows, themes 0–4): each key moves exactly the designs its
  `in` names. `tagsLabel` moves bio layout 3 under Lime, Grunge and Editorial, and bio layout 4
  under Retro, Pop and Editorial at 4 of 6 (1440 and 768; layout 4 draws no Genres line at 390).
- **States** (a scratch puppeteer run, `textContent` beside the digest): 300 drawn states, each
  label at its layouts × themes 0–4 × three widths × both surfaces, typed, at 85 characters, as
  one 53-character word, and emptied.
  - A typed stat label breaks before its last word ("Years on the\nroad:"), and a one-word one
    ("Since:") does not.
  - Emptied: the word and its glyph are gone, no bare `● ` or `[  ]` is left, and the stat's
    value is still printed.
  - No state widens the page after the wrap fix.
- **The real app** (1600 × 1000, card 3): Grunge, then Lime, Editorial and Retro.
  - Each of the eight fields, typed, moves the canvas and reaches the published tab.
  - Emptied and republished, no seed word, typed word or bare glyph is left on either surface.
  - Under Retro, *Genres label* prints "Not shown in this layout": Retro's bio layout 3 draws no
    Genres row, as reach says. No page errors.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed; the sweep does
  that.
- **Docs.**
  - CLAUDE.md: a JP-071 sentence after JP-059's in the *artist's name* bullet (the eight keys, the
    break, the glyphs, the siblings). CLAUDE.md never cited the "● Popular precedent" itself; the
    citations the entry named were the code comments, rewritten above.
  - *Reversed* pointers in `layout-3-qa-fixes.md`'s JP-071: its status row, the Decided, the reply
    and the sweep's reply line.
  - `../retro/layout-2.md`: a *narrowed since* line beside the rule. `../retro/layout-3.md:658`
    (the calendar legend, "the ● Popular precedent"): a line that the legend stays a literal.
  - `reach.mjs`: the eight probes.

Reply: **JP-071 — fixed.** The eight labels are now editable. Each starts as the design's text,
and each can be emptied to hide it.
- **Bio** (layout 3's card): *Performing since label*, *Current role label*, *Based in label*,
  *About label* and *Genres label*. A stat label is typed on one line and breaks before its last
  word, as the design does. *Genres label* also changes the "Genres" line in Bio layout 4.
- **Media Player**: *List label*, the "● Popular" over the track list in layouts 2 and 3.
- **Events Map** and **Testimonials**: *Kicker*, the small line over the heading in layout 3
  ("Gigs & travel", "● Testimonials").
- The "●" and the brackets of "[ About ]" belong to the design and go when the word is emptied.
  A stat label still shows only while its value is filled.
- On every template, in the editor and on the published page, at every width. Labels nobody
  reported stay as the design draws them: the Bio's "Bio" eyebrow, the Media Player's
  "● Featured" (layout 2), the Booking Calendar's legend and the Testimonials' "✎ What clients
  say" (layout 2). *(The Media Player's and the Testimonials' were reported since: JP-095 (a),
  `../editorial/layout-2-qa-fixes.md`.)*

---

## JP-066 — set cards: no mood, set length or track length

**Reverses** `layout-3-qa-fixes.md`'s JP-066 A (by design, a data-model question for the BA),
which rests on Retro layout 3's call (`../retro/layout-3.md:674`–`683`).

**Evidence.**
- `SONGS` / `SONG_KEYS` at `data.js:775`–`790`: `{ title, artist, tags }`.
- `repSet` in `EncoreBuilder.jsx` (the meta line `${n} songs` at `:1095`, with its comment at
  `:1091`–`1094`); `vm.repSets` at `:1112`.
- The row's right column is the artist, in both halves of repertoire layout 3 (the `s.limeTree`
  block and the Retro / Pop body; re-grep `artist` inside `Repertoire`'s `if (s.v2)`).
- Frames: "Cocktail hour · MELLOW · 45 MIN", "Dinner · EASY LISTENING · 60 MIN", "Party peak · HIGH
  ENERGY · 90 MIN". Every row has a length and no artist. Grunge's 390 master (`984:13951`) gives
  all twelve seeded songs' lengths (the list is in `layout-3-qa-fixes.md`'s JP-066 evidence).
- **The set's length is not a sum**: "45 MIN" heads four tracks of about 4 minutes. So it is a
  per-set fact, not derived from the songs. The earlier option B's Σ would print "17 min".

**Frame first.** Check whether repertoire layouts 1, 2 and 4 draw a track length anywhere. If one
does, it reads the same column.

**Decision** (one `AskUserQuestion`).
1. **Track length.** **A (recommended): a `length` column** in `SongsField` (`SONG_KEYS` gains it),
   seeded with the frame's twelve. Layout 3's row prints it in the artist's seat.
2. **A song with no length.** **A (recommended): the seat is empty**, the frame's row, which has
   no artist. **B**: the artist stands in.
3. **Mood and set length.** **A (recommended): a *Sets* field** (`SetsField`) that is not a list,
   `BookedField`'s precedent. It lists the sets the songs' tags derive, each with a *Mood* and a
   *Length* box, stored as `c.sets = { [case-folded tag]: { mood, length } }`. The card's meta is
   `[mood, length]` joined on ` · `, and the song count while both are empty. Details for a tag
   no song carries any more stay stored and come back with the tag; the field shows only live
   sets. **B**: a mood and a length per song row, read off the set's first song. Cheaper, and
   wrong-shaped.
4. **The seed.** The frame's three moods and lengths mapped onto our three sets **in order**:
   Weddings → Mellow · 45 min, Pubs → Easy listening · 60 min, Birthdays → High energy · 90 min.
   **Recommended.** The set *titles* (Cocktail hour / Dinner / Party peak) stay our tags. Retagging
   the songs would move the chip rows of repertoire layouts 1, 2 and 4, so it is named and not
   taken unless the user asks.

**Expected after-diff (A, A, A, A):** repertoire `arch 2` × themes 0–4 × 3 widths × both surfaces =
**30 files**: each card's meta line and every row's right column. Add any other layout the frame
read adds. The fallback card (`REP_ALL`, when the tags do not reach every song) prints the count.

**Verify.** The seed reads the frame's lengths and "Mellow · 45 min"-style meta lines on both
surfaces, under each template's casing. `&cj=` edges: songs with no lengths; a set with a mood and
no length; a tag renamed, then renamed back; a blank song row. The *View full set* reveal still
reaches the fifth song, and the 390 carousel still centres the second set (JP-075). `SongsField`
and `SetsField` in the real app: typing reaches the canvas, and Publish reaches the tab.

**Docs.** CLAUDE.md's *Ten list-shaped contents* (the `c.songs` shape, `SONG_KEYS`, and a
*twelfth structured field* beside `BookedField`) and its repertoire mentions. The `repSet` comment.
A *reversed* pointer in `layout-3-qa-fixes.md`'s JP-066 and `../retro/layout-3.md:674`–`683`.
README's section on structured editors, if it counts them.

**Decided: A, A, A, A** (user, 2026-09-29).
1. **A `length` column** in `SongsField`, and `SONG_KEYS` gains it. A row holding only a length
   is therefore not blank. It is seeded with the frame's lengths. Our seed's twelfth row is a
   second Valerie, where the frame lists Get Lucky (4:08), so that row takes Valerie's 3:54 too.
   Layout 3's row prints the length in the artist's seat. **At 768 the length stands under the
   title**, so JP-044's stack stays. The reason was measured at triage: on one row, a length at
   body-sm fits beside every seeded title under Lime and Grunge, but Editorial's Noto "DON'T STOP
   ME NOW" (160 of a 175 row) would be cut.
   *(Reversed for the stack by JP-104, user call, 2026-10-06: the 768 row is one row again, the
   length on the right, and a title too long for its room wraps to a second line, clamped by
   CSS, so Editorial's Gloock "DON'T STOP ME NOW" wraps whole. The length column stands.
   `../editorial/layout-3-qa-fixes.md`, entries 1 and 5.)*
2. **A song with no length leaves the seat empty.** Layout 3 prints no artist, as the frame
   draws none.
3. **`SetsField`**, a structured field that is not a list (`BookedField`'s precedent), stored as
   `c.sets = { [case-folded tag]: { mood, length } }`. The meta line is `[mood, length]` joined
   on ` · `, and the song count while both are empty.
4. **The seed in order**: Weddings → Mellow · 45 min, Pubs → Easy listening · 60 min, Birthdays →
   High energy · 90 min. The tags are not renamed.

**Frame first**: repertoire layouts 1, 2 and 4 draw no length. The Grunge masters at all three
widths and Retro's desktop masters were checked (`964:58604`, `964:64627` / `986:13762` /
`986:13781` / `964:64646`, `964:73011` / `971:8128` / `977:12355` / `964:72822`). Every row is a
title and an artist, and no text node reads `d:dd` or "min". So the length reaches layout 3 alone.
The harness was proved first: **0 of 1,320**. **Expected after-diff: 30 files**, repertoire
`arch 2` × themes 0–4 × three widths × both surfaces (each card's meta line and every row's right
column), and nothing else.

**Settled** (2026-09-29).
- **`data.js`.**
  - `SONGS` rows gain `length`, the frame's twelve, and `SONG_KEYS` gains `'length'`.
  - `REP_SETS` is the seed: `weddings` / `pubs` / `birthdays` → Mellow · 45 min / Easy listening ·
    60 min / High energy · 90 min.
  - `repSetsOf(c)` is the one resolver. It returns `c.sets` when that is a plain object, else the
    seed. `sectionVm` and `EditPanel` both call it.
  - `repSetLine(d)` joins the mood and the length on ` · `, dropping each when empty. It gives `''`
    when both are.
  - `FIELDS.repertoire` gains `sets` (*Sets*, `type: 'sets'`, `in: [2]`). The `songs` hint now says
    that layout 3 groups the songs into sets and shows each length.
- **`sectionVm`.**
  - `vm.songs[].length` is trimmed and uncased.
  - `repSet`'s meta is `repSetLine()` of the tag's own entry (an own key only, so a tag named
    "constructor" still counts), else the count. The `All` fallback card always counts.
  - The meta is uncased, since the caps are a style.
- **`EncoreSection`**, both halves of repertoire layout 3 (the `s.limeTree` block and the Retro /
  Pop body):
  - The right-hand seat prints `sg.length` where it printed `sg.artist`, and nothing when the
    length is empty.
  - The 768 stack stays, for the reason under Decided.
  - The fit's "Three readings" comment, JP-044's stack comment and the type ramp's note are
    rewritten.
- **`EncoreBuilder`.**
  - `SongsField` has a 64px *Length* box beside *Artist*, placeholder "3:54". A new row carries
    `length: ''`.
  - `SetsField` is new. It lists `repChips()` over the resolved songs less their blank rows: one
    card per set, the tag as typed, with *Mood* and *Length* boxes (placeholder "45 min"). With no
    tags it prints "Tag your songs to make sets.".
  - Every keystroke writes the whole resolved object, so the first edit keeps the other two
    seeded lines. That was measured in the real app: the Pubs card kept its line after the
    Weddings mood was typed.
  - `EditPanel` has a `sets` rung that passes the songs as a second value, BookedField's `open`
    rule. The two comments that called BookedField the only such editor are rewritten.
- **Digest.** Themes 0–4, three widths, every category, canvas and `live=1`, against the HEAD
  worktree: **30 of 1,320**, exactly `cat_repertoire_arch_2_theme_{0–4}_w_{desktop,tablet,mobile}`
  on both surfaces. As named, and nothing else. Inside each file every differing row keeps its
  geometry and changes only its text.
- **Reach** (`reach.mjs`, two probes, themes 0–4): `repertoire.songs.length` (a one-song list
  with the length empty against filled) and `repertoire.sets` (the `weddings` entry) each move
  repertoire layout 3 alone, 6 of 6, on every template.
- **States** (`&cj=`, at 1440 / 768 / 390, both surfaces). No state widens the page, and there are
  no page errors.
  - Songs with no lengths: every seat is empty and the title stands alone.
  - Mood alone reads "MELLOW", length alone "60 MIN", and a blank entry the count, "7 SONGS".
  - Weddings renamed Ceremonies falls back to "6 SONGS". Renamed back as "WEDDINGS", the line
    comes back through the case fold.
  - A blank song row is dropped. A row holding only a length is kept, untagged, so the `All`
    fallback card is appended: at 390, live, one press of next shows it, "13 SONGS". A tag
    "constructor" prints "1 SONG". `sets: {}` prints the three counts.
  - *View full set* on the live Weddings card still reaches its fifth and sixth songs.
  - The 390 geometry is unchanged, so JP-075's centred second set holds.
- **The real app** (1600 × 1000, card 3): Grunge, then Lime, Editorial and Retro.
  - *Sets* shows at layout 3 with no "Not shown" note.
  - Song 1's *Length* typed "9:99" and *Weddings mood* typed "Zzmood" reach the canvas
    ("ZZMOOD · 45 MIN", "9:99" in both Valerie rows) and, after Publish → Open, the tab.
  - No page errors.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed; the sweep does
  that.
- **Docs.**
  - CLAUDE.md, *Ten list-shaped contents*: `SetsField` is the twelfth structured field, with the
    `c.songs` shape and `length`.
  - README's Repertoire paragraph.
  - *Reversed* pointers in `layout-3-qa-fixes.md`'s JP-066 (the status row, Decided, the reply
    and the sweep's reply line) and `../retro/layout-3.md` ("Look for the derivation…").
  - *Since* lines where the diff was restated: `../lime/layout-3.md`, `./layout-3.md` and
    `../editorial/layout-3.md`.
  - `reach.mjs`: the two probes.

Reply: **JP-066 — fixed.** The set cards now show a mood and a set length, and each song shows its
length.
- **Songs**: each song has a new **Length** box beside Artist. In layout 3 the length shows on the
  song's row, where the artist was, as the design has it. A song with no length shows none.
- **Sets**: a new **Sets** field lists one set per tag on your songs, each with a **Mood** and a
  **Length** box. The card shows them as "MELLOW · 45 MIN". If both are empty, it shows the
  song count.
- It starts from the design: Weddings "Mellow · 45 min", Pubs "Easy listening · 60 min",
  Birthdays "High energy · 90 min", and the design's lengths for every song. The set names stay
  your tags. To match the design's "Cocktail hour", tag the songs `Cocktail hour`.
- A set's length is typed, not added up: the design's "45 MIN" covers more than its four songs.
- On every template, in the editor and on the published page, at every width. The other
  Repertoire layouts show no lengths in the design, and they are unchanged.

---

## End-of-pass sweep

1. A full digest against a `main` worktree on :5174 (port normalised), all categories × themes 0–4
   × three widths × canvas and `live=1`. Every diff must be one a Settled above names.
2. `reach.mjs` for every new or re-scoped field.
3. Walk Grunge card 3 in the real app and the published tab at 1440 / 768 / 390, then Lime's,
   Editorial's and Retro's card 3 once, over every entry's panel and page.
4. `npm run build:standalone`, then `cp source/dist-standalone/index.html index.html`, in its own
   commit. Then a two-build digest (`build-digest.mjs`) whose diff is only the named rows.
5. `plans/README.md`'s row, plus a row and a tree line for `display-face.md` (planned, its own
   branch). A note for the designer: JP-068 (if still open), the pricing intro's
   "Four ways" (if B), and whatever JP-056's answer leaves for them.
6. One reply line per ticket for QA (fixed / by design / needs PO / needs the designer), headed by
   the retest-against-the-stamp line (`curl -sI https://siniiitsa.github.io/js-plus-prototype-2/`).

**Settled** (2026-09-29, all six steps; the push, the PR, the merge and the build stamp are the
user's).
- **The harness.** A scratchpad worktree of `main` (`525dcab`) with an APFS clone of
  `node_modules` and its `.vite` removed, served on :5174, against the tree (`7db7337`) on :5173.
  Every category × themes 0–4 × three widths, the footer's `page=2` render included, canvas and
  `live=1`, compared by `cmp` after `sed` normalised the port and `\.jpg\?[^|]*` on both sides.
- **1. Full digest against `main`: 45 of 660 per surface (90 of 1,320)**, the same set on both
  surfaces once `_live_1` is stripped. Every differing file is one a Settled names, and every
  named file differs:

  | Entry | Named | Differ | Row shape (canvas; `live=1` the same) |
  |---|---|---|---|
  | JP-070 (rest) | 30 | 30 | pricing `arch 2`: 7 rows at 1440 and 768 (the intro `<p>`, *Solo* → *Duo*, the chips and offer after it); at 390 every row (109–116 per file), the intro wrapping to two lines |
  | JP-069 (weekday) | 30 | 30 | map `arch 2`: per disc, the month and day moved up and one weekday row added (5 discs at 1440 and 768, 91 → 96 rows; 1 at 390) |
  | JP-071 | 0 | 0 | — |
  | JP-066 | 30 | 30 | repertoire `arch 2`: 15 rows, three meta lines and twelve right-hand seats (the artist → the length) |

  Two of the entries' own wordings are looser than their diffs, and the diffs are what stand:
  - **JP-069**'s Settled says "two moved rows and three new ones per disc". The digest has **one**
    new row per disc (the weekday) beside the two moved ones, three differing rows in all, which
    is what its expected after-diff named.
  - **JP-066**'s Settled says every differing row "keeps its geometry and changes only its text".
    Each row keeps its y and height, but a right-aligned seat's x and width follow its text
    (`Amy Winehouse` 76.9 wide → `3:54` 21.5). And under Pop at 768 one title widens
    (`Superstition` 62 → 64.8), taking room the upper-cased artist used to squeeze: a 16th row in
    those two files, a consequence of the shorter seat and not a regression.
- **2. Reach** (`reach.mjs` in full, themes 0–4, 24,360 renders, then a throwaway script, deleted,
  that checked every plain `<cat>.<key>` probe against `fieldReach()`). Two probes were added and
  are committed: `pricing.intro`, and `map.gigs.year` (one gig on both sides, with and without a
  four-digit year, since the year prints nowhere). **Every probe of this pass moves exactly the
  designs its `in` names, on every template:**
  - `pricing.intro`: pricing layout 3. `map.gigs.year`: map layout 3 (the weekday).
  - `bio.sinceLabel` / `roleLabel` / `baseLabel` / `aboutLabel`: bio layout 3. `bio.tagsLabel`:
    layout 3 under Lime, Grunge and Editorial, and layout 4 under Retro, Editorial and Pop at 4 of
    6 (no Genres line at 390), JP-071's reading. `media.listLabel`: layouts 2 and 3. `map.kicker`
    and `testimonials.kicker`: layout 3.
  - `repertoire.songs.length` and `repertoire.sets`: repertoire layout 3.

  The rest of the file is unchanged. The only other disagreements with `in` are all known: Pop's
  header (no `in` row, so no note, as CLAUDE.md says), `calendar.email` at 3 of 6 (JP-076's live
  pills), and `header.cta2` at 4 of 6 on layouts 2, 3 and 6, which is byte-identical on `main`
  (re-run over :5174), so it predates this branch.
- **3. The real app** (a one-off puppeteer script, trusted clicks and typing, the editor at
  1600 × 1000, deleted after). Card 3 through *Use this header*; each panel read off *Back to page
  list* and the section's row. **No failed check and no page error on any template, and no
  published width scrolls sideways.**
  - **The panels, all four templates.** *Intro line* is the frame's second sentence with no note,
    and *Packages* reads *Duo* / *Duo, Trio, Band* / *Trio, Band*. Events Map shows five *Year*
    boxes at 2025, no weekday hint, and *Kicker* "Gigs & travel". Bio's four labels read
    "Performing since:", "Current role:", "Based in:" and "About" with no note, and *Genres label*
    "Genres", marked "Not shown in this layout" under Retro alone. *List label* "Popular" and
    Testimonials *Kicker* "Testimonials", unmarked. Repertoire's twelve *Length* boxes are filled
    (3:54, 4:26, 4:30, …), and *Sets* lists Weddings Mellow / 45 min, Pubs Easy listening /
    60 min and Birthdays High energy / 90 min, unmarked.
  - **The seed, Grunge on the canvas at Desktop, Tablet and Mobile and in the tab at 1440, 768 and
    390; Lime, Editorial and Retro once, at Desktop and 1440.** The intro prints, and the chips
    read *All / Duo / Trio / Band* with no *Solo*. The discs read SAT / FRI / SAT / SAT / SAT (SAT
    alone at 390), under "Gigs & travel". The bio prints its three broken stat labels, *About* and
    *Genres* (not under Retro). Media prints "Popular" and the testimonials "Testimonials". The
    set cards read "Mellow · 45 min", "Easy listening · 60 min" and "High energy · 90 min", and the
    rows print lengths and no artist.
  - **Typed, Grunge, then republished into the same tab.** *Intro line*, row 1's *Year* "2026",
    both *Kicker*s, all five bio labels ("Years on the road:" among them), *List label*, song 1's
    *Length* "9:99" and *Weddings mood* "Zzmood". On the canvas and in the tab at 1440, 768 and
    390, each word replaced its seed. The first disc reads SUN, the stat label breaks as
    "Years on the\nroad:", and the Weddings card reads "Zzmood · 45 min", with "9:99" in its
    rows.
- **4. `index.html`** refreshed in `aff0f52` from `npm run build:standalone`: **8,769,163
  bytes**, up from 8,763,002.
  - **The two-build digest** used `build-digest.mjs`, `CARD=2` (0-based card 3), reduced motion,
    and both files from `127.0.0.1:8931`, the old one digested before the `cp`. Old against new,
    **15 of 15** theme × tab files differ, Pop included: its card 3 is its layout-3 page too, and
    every entry here is shared.
  - A throwaway copy wrote each root's rows as JSON, keyed by the vm's `anchor`, re-based on the
    root's own origin, deleted after. Compared at 0.2px, **only pricing, map and repertoire
    move**, as the harness did: pricing 7 rows wide and 107–114 at Mobile; map 10 changed and 5
    added wide, 2 and 1 at Mobile; repertoire 15. Under Pop at Tablet the repertoire moves 22:
    the editor's 768 column is narrower than the harness's, so seven titles, not one, widen into
    the room the upper-cased artist left, with no height change. The only other rows are the
    footer seal's 0×0 `<defs>` / `<path>` at Mobile (2 per tab under themes 0–3, under the taller pricing; Pop draws no seal), which
    report the viewport origin. The modal's card counts (4 / 4 / 4 / 4 / 3) do not change.
- **5.** `plans/README.md`: this pass's row rewritten as swept, and a row and a tree line for
  [`display-face.md`](./display-face.md) (planned, `grunge-display-face`, after this batch
  merges). The designer note is below: JP-068 asked again, the pricing intro's "Four ways", which
  package carries which tag, and JP-056's mask.
- **6.** At the sweep the deployed build read `Tue, 29 Sep 2026 12:40:40 GMT`, **8,763,002
  bytes**, which is `main`'s root `index.html` (`9f16854`, the layout-4 QA refresh). The replies
  are each entry's, lifted unchanged.

**Replies for QA.** Retest against the Pages build whose `last-modified` is later than `Tue, 29
Sep 2026 12:40:40 GMT` (`curl -sI https://siniiitsa.github.io/js-plus-prototype-2/`); that build
carries this batch. On *Inset Hero* (card 3) unless a line says otherwise.
- **JP-056 — needs the PO (planned for a later build; the licence stays with the PO).** This
  build is unchanged: the headings are still Anton, and nothing named Stones Crush is loaded. Its
  only free licence is for personal use, and no licence covering web use has been bought. A later
  build adds the design's worn texture as a mask cut into Anton's large headings. The letter
  shapes stay Anton's, and small type (the nav, the buttons, the labels) stays clean, because the
  texture eats thin strokes at those sizes. If the PO buys a web licence, the real face replaces
  the mask.
- **JP-066 — fixed.** The set cards now show a mood and a set length, and each song shows its
  length.
  - **Songs**: each song has a new **Length** box beside Artist. In layout 3 the length shows on
    the song's row, where the artist was, as the design has it. A song with no length shows none.
  - **Sets**: a new **Sets** field lists one set per tag on your songs, each with a **Mood** and a
    **Length** box. The card shows them as "MELLOW · 45 MIN". If both are empty, it shows the song
    count.
  - It starts from the design: Weddings "Mellow · 45 min", Pubs "Easy listening · 60 min",
    Birthdays "High energy · 90 min", and the design's lengths for every song. The set names stay
    your tags. To match the design's "Cocktail hour", tag the songs `Cocktail hour`.
  - A set's length is typed, not added up: the design's "45 MIN" covers more than its four songs.
  - On every template, in the editor and on the published page, at every width. The other
    Repertoire layouts show no lengths in the design, and they are unchanged.
- **JP-068 — by design; with the designer again.** The Media Player's small heading is its
  **Kicker** field (Media Player → Kicker), which starts as "Top tracks". The design's "KM BIO" is
  the Bio's heading (`964:68690`) repeated over the Media Player (`964:68698`), with the mock
  artist's initials. The question is back with the designer, naming both frames. If they confirm
  it is intended, the kicker will start from the artist's own initials plus "Bio", never the
  literal "KM". To match the design now, type `KM BIO` into Kicker.
- **JP-069 (weekday) — fixed.** The Events Map's date disc in layout 3 now reads "JUL / 12 / SAT",
  as the design does.
  - Each gig has a new **Year** box (Events Map → Upcoming gigs), beside the month and the day. The
    five starting gigs are set to 2025, the year whose weekdays the design shows. The year itself
    is not printed anywhere.
  - The weekday is worked out from the date, never typed, so it cannot contradict it. Change the
    day or the year and the weekday follows.
  - The month can be written as "Jul", "July" or "Sept". The year needs four digits. If the date is
    not a real day (for example 31 Jun, or a two-digit year), the disc shows only the month and
    day, and in layout 3 the gig's editor says why.
  - On every template, in the editor and on the published page, at every width. The other map
    layouts show no weekday in the design, and they are unchanged.
  - With a year on each gig, "Upcoming" / "Past" could now be worked out. It is not part of this
    fix.
- **JP-070 (rest) — fixed.** Layout 3's Pricing now starts from the design's intro and chips.
  - The intro under "Pricing" starts as "Choose by the kind of night you're throwing — the quote
    covers the whole booking.". The design's first sentence, "Four ways to book this act.", is
    left out: it counts the packages, the design itself shows three, and the count would be wrong
    for any artist with a different number. It is still the *Intro line* field, so it can be
    changed or emptied.
  - The chips start as "All / Duo / Trio / Band". In layout 3 the three packages start tagged
    Duo / Duo, Trio, Band / Trio, Band (Pricing → Packages → Tags). The other layouts keep Solo,
    as Retro's layout-1 design does. "All" stays first, because it is the only way to clear the
    filter. Once the packages are edited, the list is the artist's at every layout.
  - On every template.
- **JP-071 — fixed.** The eight labels are now editable. Each starts as the design's text, and
  each can be emptied to hide it.
  - **Bio** (layout 3's card): *Performing since label*, *Current role label*, *Based in label*,
    *About label* and *Genres label*. A stat label is typed on one line and breaks before its last
    word, as the design does. *Genres label* also changes the "Genres" line in Bio layout 4.
  - **Media Player**: *List label*, the "● Popular" over the track list in layouts 2 and 3.
  - **Events Map** and **Testimonials**: *Kicker*, the small line over the heading in layout 3
    ("Gigs & travel", "● Testimonials").
  - The "●" and the brackets of "[ About ]" belong to the design and go when the word is emptied.
    A stat label still shows only while its value is filled.
  - On every template, in the editor and on the published page, at every width. Labels nobody
    reported stay as the design draws them: the Bio's "Bio" eyebrow, the Media Player's
    "● Featured" (layout 2), the Booking Calendar's legend and the Testimonials' "✎ What clients
    say" (layout 2).

## Notes for the designer

*(What this batch found worth telling the designer, gathered by the sweep into one note to forward,
in the layout-3 batch's shape. Each is shipped as described.)*

1. **The media head still reads "KM BIO"** (JP-068, asked again). Every layout-3 Media Player head
   (`964:68698`, `964:68666`, `964:68731`, and Editorial's) prints "KM BIO" over "Five worth your
   ear". That is the bio's own head (`964:68690` / `964:68658` / `964:68722`), with the mock
   artist's initials. The page keeps the media's *Kicker*, "Top tracks". If it is intended, the
   kicker will start from the artist's own initials plus "Bio" ("SY Bio" for Static Youth), never
   the literal "KM".
2. **The pricing intro's "Four ways to book this act."** (JP-070) counts packages over a frame
   that draws three. The page now seeds the rest of the paragraph, "Choose by the kind of night
   you're throwing — the quote covers the whole booking.", and leaves the count out, since it
   would be false for any other number of packages.
3. **Which package carries which tag?** (JP-070) The layout-3 capsule reads Duo / Trio / Band with
   Duo picked over all three rows, and no row carries chips of its own (`964:68712`, `984:13925`,
   `984:13956`). The page seeds layout 3's packages Duo / Duo, Trio, Band / Trio, Band (Retro's
   layout-1 Solo becoming Duo), so a picked Duo shows two rows, not three.
4. **The display face is a mask over Anton, not Stones Crush** (JP-056, planned on its own
   branch, [`display-face.md`](./display-face.md)). No web licence has been bought, so a later
   build cuts a worn texture into Anton's display sizes only; the nav, the pills and the labels
   stay clean Anton. Open question 6 in [`layout-1.md`](./layout-1.md) (Anton at 0.75 of the
   token) is unchanged.
