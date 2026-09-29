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
| 3 | JP-069 (weekday) | No weekday in the date disc | `layout-3-qa-fixes.md` JP-069, the weekday half | **A data-model gap**: a gig has no year | S–M | **yes** | todo |
| 4 | JP-071 | Eight section labels no field reaches | `layout-3-qa-fixes.md` the three replies (JP-071 A) | **The product's label rule**, now reversed for these eight | M | **yes** | todo |
| 5 | JP-066 | Set cards: no mood, set length or track length | `layout-3-qa-fixes.md` the three replies (JP-066 A) | **A data-model gap**: a set is a tag, and a song has no length | L | **yes** | todo |
| 6 | — | End-of-pass sweep | — | — | S | — | todo |

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
   - **A+. A, and layout 3 drops `All`**, with chip 0 picked at rest on both surfaces: the form
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
   Set.

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

**Decided.** —

**Settled.** —

---

## JP-071 — eight section labels no field reaches

**Reverses** `layout-3-qa-fixes.md`'s JP-071 A, "by design, the product's rule for labels", which
rests on Retro layout 2's rule (`../retro/layout-2.md:348`–`350`: a frame label stays a literal).
The reversal is **scoped to the eight labels reported**. The siblings nobody reported stay
literals and are named in the reply: the bio's `Bio` eyebrow, media layout 2's `● Featured`, the
calendar legend's three labels, and testimonials layout 2's `✎ What clients say`.

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

**Decided.** —

**Settled.** —

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

**Decided.** —

**Settled.** —

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

**Settled.** —
