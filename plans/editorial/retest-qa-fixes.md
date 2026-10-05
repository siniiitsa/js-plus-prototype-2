# Editorial retest QA fixes — bug-by-bug plan

Working checklist for the tester's **retest** of the two Editorial QA batches against the current
build, plus one new report: JP-085, JP-089, JP-092, JP-098 and JP-099 come back from
[`qa-fixes.md`](./qa-fixes.md) (layout 1, card 1, *Hero*) and
[`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md) (layout 2, card 2, *Feature spread*), and JP-101 is
new. Every returning ticket was closed in its batch, wholly or partly, **as a reply** or as a
*named, not fixed* item. The tester has read the replies and filed them again. This batch reverses
those calls where there is a fix to make, and sends the rest to the people who can answer them. It
works like [`../grunge/retest-qa-fixes.md`](../grunge/retest-qa-fixes.md): **one entry per session,
with context cleared between sessions**, and each session writes what it settled back into this
file.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then *How each
session runs* in [`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md) and the base recipe it builds on
in [`../grunge/layout-3-qa-fixes.md`](../grunge/layout-3-qa-fixes.md) (the digest, the harness
parameters, `reach.mjs`), *Verification harness* in [`../retro/qa-fixes.md`](../retro/qa-fixes.md)
(the `&cj=` harness), then the memory notes `verifying-the-published-tab` and `browser-tool-choice`
(and `figma-frame-reading` for any entry that reads a frame). Then **the entry each ticket
reverses**, read whole: each entry below names it. [`layout-1.md`](./layout-1.md) and
[`layout-2.md`](./layout-2.md) hold the Figma node ids (layout 1's page is `964:58611` /
`986:48237` / `986:48250`; layout 2's is `964:64598` / `986:15657` / `986:15676`). The shapes the
entries copy:
- JP-056 · JP-068 in [`../grunge/retest-qa-fixes.md`](../grunge/retest-qa-fixes.md): an outside
  question (a licence, a designer's intent) answered with a decision-only entry, and a face the
  design names but nobody can ship turned into its own plan on its own branch
  ([`../grunge/display-face.md`](../grunge/display-face.md));
- JP-091 in [`qa-fixes.md`](./qa-fixes.md): the layout-1 capsule's name giving way before its
  links (`fit` in `NavBar`, `vm.navNameFit`) — JP-101 is the same rule at 390;
- §10.2's rule in `NavBar` (`EncoreSection.jsx:1888`–`1895`): a decorative rule that *yields*
  (`flex: 0 1 …`, a 30px floor) rather than push its row past the page — JP-092's footer;
- the repertoire's layout-3 *View full set* (`EncoreSection.jsx:13362`) and the gallery's own
  *second click resets* (`:15186`–`15192`): a live-only reveal and a live-only reset — JP-098;
- JP-070 (rest) in `../grunge/retest-qa-fixes.md`, option **A+** (`:277`–`281`): a chip row with
  no `All` — JP-089.

Branch: **`editorial-retest-qa-fixes`, forked from `main`** (`bb142de`, after PR #48). One commit
per entry (`Fix JP-101: …`). A decision-only entry commits the plan alone.

**Build and reproduction.** The report names its build: `Last-Modified Fri, 02 Oct 2026 22:25:49
GMT`, which is the deploy of PR #47's merge (`e4b7bc8`, Pop layout 1, 2026-10-02 22:24:56 UTC), so
it carries both Editorial QA batches (PR #45, PR #46). At triage (2026-10-05) the deployed build
read `Mon, 05 Oct 2026 12:57:01 GMT`, 9,819,684 bytes, byte-identical in size to `main`'s root
`index.html` (`f998160`, the Pop layout-2 sweep). Pop layout 2 widened several Lime blocks to
`(s.limeTree || s.pop)` between the two builds, the media bar and the footer among them, so
**each session reproduces on HEAD first**. The triage ran one harness probe on HEAD (`&name=`,
`live=1`, header `arch 0`–`3` and the footer, themes 0–4, 390 and 768, a scratch script, deleted),
and its numbers are the ones quoted below. **Nothing was reproduced in the real app.**

**What reaches which templates.** This decides each entry's digest theme list. `digest.mjs`'s
default list is `0,2,3,4`, which **skips Lime**, so always pass the list explicitly.

| ID | Where the cause sits | Templates | Digest themes |
|---|---|---|---|
| JP-085 | `THEMES[3]`'s `display` / `label` | Editorial alone | — (decision) |
| JP-098 | `Gallery`'s shared `if (s.v1)`, 768 | every template | 0–4 (on a code option) |
| JP-092 | `Footer`'s 150px rule, `flex: 'none'`, **both** trees | every template (Grunge fits on the probe) | 0–4 |
| JP-101 | `NavBar`'s lime arm, narrow branch: the `Wordmark` is `nowrap` with no fit | Lime, Grunge, Editorial, Pop (Retro fits) | 0–4 |
| JP-099 | the 390 bar override, both media bodies | every template | 0–4 |
| JP-089 | `repChips()`' leading `All`, and `Pricing`'s `chip` state | layout 1 under Lime, Grunge, Editorial and Pop at least (see its scope question) | 0–4 |

## The report (translated)

> **Not fixed**
> - **JP-085 (Medium, Editorial · Hero):** the headings are still Noto Serif Display, where the
>   design has Fisterra Fora. The build's theme has not changed, and Fisterra is not loaded on the
>   page. Probably the whole Editorial template (layout 2 has the same face; not compared
>   separately). Screenshot: `JP-085-retest-2026-10-05-editorial-font-still-noto-serif-display.jpg`.
> - **JP-099 (Editorial · Feature spread):** at mobile 390 the player has none of the design's
>   ♡ ↓ ⋯ icons. They are not there even hidden; the player has only its three transport buttons.
>   Screenshot: `JP-099-retest-2026-10-05-mobile-player-still-without-icons.jpg`.
>
> **Partly fixed**
> - **JP-092 (Editorial · Feature spread).** *Fixed:* a long name in the hero now shrinks and fits
>   at 1440, 768 and 390. *Left:* at 390 with a long name the page still scrolls sideways by 35px
>   (it was 76). The cause is now the footer: the long name pushes the 150px decorative rule past
>   the edge. With a short name (Kai Mercer) nothing scrolls. Screenshot:
>   `JP-092-retest-2026-10-05-390-page-still-scrolls-35px-footer-line.jpg`.
> - **JP-089 (Editorial · Hero).** *Fixed:* the calendar head *Book now*, the form's *Enquire*,
>   the chips *Private Event · Club Night · Festival*. *Left:* an extra *All* before the chips —
>   the same remainder as in JP-070, which you accepted on 30.09. Screenshot:
>   `JP-089-retest-2026-10-05-pricing-chips-extra-all.jpg`.
> - **JP-098 (Editorial · Feature spread).** *Fixed:* at tablet the row over the thumbnails now
>   reads *Gallery*, a new field. *Left:* 6 thumbnails where the design has 4 (their number
>   follows the 7 photos in the list), and no *View list ✕*. The question to the BA is open: what
>   should *View list ✕* do? Screenshot: `JP-098-retest-2026-10-05-tablet-gallery-still-6-thumbs.jpg`.
>
> **New**
> - **JP-101 (Editorial · Hero):** at mobile 390 a long name in the header's logo runs under
>   BOOK NOW and the burger. Steps: Header → Title = *Florence and the Machine* → Publish → Open at
>   390. Seen: the name on one line (16px, x 30–392 in a 390 width) runs under BOOK NOW (x 219–360)
>   and the burger. Only FLORENCE AN… reads; the rest is hidden or cut by the header's edge. No
>   horizontal scroll. Control: *Kai Mercer* fits at 390 (it ends at x 212, 7px short of the
>   button). The same long name fits on one line at 768. At 1440 it wraps onto two lines and the
>   menu stays on one. Expected: the name fits between the star and BOOK NOW — it wraps, shrinks
>   or is cut with an ….
>   Severity: Medium (proposed), since on a phone the header does not show the artist's name. The
>   final call is ours. Not checked: Editorial's other headers (layouts 2–4) and Retro / Lime /
>   Grunge; whether it was there on the earlier build; 360 / 414; a real phone.
>   Screenshot: `JP-101-editorial-mobile-header-long-name-under-book-now.jpg`.
>
> Build: `Last-Modified Fri, 02 Oct 2026 22:25:49 GMT`.

## Status

| Order | ID | Report (short) | Reverses | Verdict | Size | Decision | Status |
|---|---|---|---|---|---|---|---|
| 1 | JP-085 · JP-098 (*View list ✕*) | Noto, not Fisterra Fora · what *View list ✕* does | `qa-fixes.md` JP-085 (A); `layout-2-qa-fixes.md` JP-098 decision 3 (A) | **Both need an answer from outside the code**: a web licence (the PO) and the controls' meaning (the BA) | — (decisions) | **user**: JP-085 **C** ([`display-face.md`](./display-face.md), its own branch); JP-098 **B** (proposal to the BA) | **done** (2026-10-05, no code) |
| 2 | JP-092 (rest) | 390: the footer's rule scrolls the page with a long name | `layout-2-qa-fixes.md` JP-092 *Named, not fixed* (the footer's rule) and `qa-fixes.md` JP-086's footer item | **Confirmed, shared**: the rule is `flex: 'none'` in both footer trees; it never yields | S | light; **user**: **A** (the two 360 items named again) | **done** (2026-10-05) |
| 3 | JP-101 | 390: a long name in the nav runs under BOOK NOW | `qa-fixes.md` JP-086 *Named, not fixed* (`:806`–`809`) and JP-091's scope (desktop only) | **Confirmed, shared**: the narrow wordmark is `nowrap` with no fit under Lime, Grunge, Editorial and Pop | S–M | **user**: **1A, 2A**, the room up to the pill | **done** (2026-10-05) |
| 4 | JP-099 | 390 player: no ♡ ↓ ⋯ | `layout-2-qa-fixes.md` JP-099 (A, a reply) | **Recorded call, refused twice**: Retro's 390 override, every template | S | **user**: **C** (icons in, sleeve out at 390), then the 1px gap that keeps SLOW BURN whole | **done** (2026-10-05) |
| 5 | JP-089 (rest) | The extra `All` chip | `qa-fixes.md` JP-089 decision 2A ("the `All` chip stays"); `notes/pricing.md`'s "intended diff" | **Recorded call**: `repChips()` always leads with `All` | S–M | **user**: **1A, 2A**, no row at one tag | **done** (2026-10-05) |
| 6 | JP-098 (rest) | 768 gallery: six tiles, no *View list ✕* | `layout-2-qa-fixes.md` JP-098 decisions 1A and 3A | **Waits on the BA**: the proposal was sent on entry 1's B (2026-10-05); code only if they confirm or amend it | S–M (or none) | entry 1's (B) | waits on the BA |
| 7 | — | End-of-pass sweep | — | — | S | — | **done** (2026-10-05; entry 6 still with the BA) |

**Why this order:**
- **The outside questions first.** Entry 1 writes no code. Its questions go out to the PO and the
  BA while the code entries run. JP-085 turns into code only on a licence or a new stand-in, and
  then as its own plan on its own branch (Grunge's JP-056 route). JP-098's code, if the BA's answer
  asks for any, is entry 6, after the others, so the answer has time to come back.
- **Then by footprint, zero-diff entries first.** JP-092's rule and JP-101's wordmark should move
  no digest file on the seed (the seeded name fits everywhere; the probe's positive controls are
  the long names). JP-099 moves ten files (media `arch 1` at 390). JP-089 moves the most (pricing
  `arch 0`, and `arch 2` on its wider scope), so it comes last among the code entries.

**"Decision"** means the entry lists options with a recommendation. The session starts by asking
the user (one `AskUserQuestion`, up to four questions) and records the answer under **Decided**
before writing code. "Light" is one question.

## How each session runs

As [`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md)'s *How each session runs*, steps 1–9, with
these differences:

1. The *Evidence* line numbers are from the triage (2026-10-05, `bb142de`). Re-check them.
2. **Every entry reverses a recorded call, or answers a named item.** Its *Docs* adds a
   *reversed* (or *answered*) pointer in the entry it reverses, the Lime and Grunge retests'
   pattern, and rewrites any CLAUDE.md, README, `notes/` or code comment that states the old call
   as a rule.
3. **Reproduce first, in the real app**: the tester's steps on Editorial card 1 (JP-089, JP-101)
   or card 2 (JP-092, JP-098, JP-099), Publish, Open, at the ticket's width — then 360 and 414,
   which the tester did not check. Then the other templates the table names.
4. **Themes 0–4, every code entry**, at all three widths, canvas and `live=1`, against a HEAD
   worktree on :5174 (`node_modules` an APFS clone, `cp -Rc`, with its `.vite` removed; normalise
   the port and `\.jpg\?[^|]*` in `src`). Prove the harness first and **name the expected
   after-diff before writing code.** A zero-diff entry also needs a **positive control**: the same
   digest with `&name=` on a long name, which must differ in exactly the renders the entry fixes.
5. **Long names, one set for every entry**: *Kai Mercer* (the seed), *Florence and the Machine*
   (the tester's), *Maximilian Featherstonehaugh* (JP-092's) and *Supercalifragilistic* (one long
   word). Widths 360, 390, 414 and 768, and 1180 / 1440 / 1920 where the entry reaches desktop.
6. **The published desktop lays out at 1180 and zooms** (`min(w, 1440) / 1180`), as before.

**Do not refresh the root `index.html` per entry.** The sweep does it once.

---

## JP-085 · JP-098 — the two outside questions

One session, no code: one `AskUserQuestion` with the questions below, then **Decided**, the reply
lines, and whatever the answers ask for: a separate plan (JP-085's B or C) or entry 6's decision
(JP-098).

### JP-085 — the heads are Noto Serif Display, not Fisterra Fora

**Reverses** `qa-fixes.md` JP-085, decided A on 2026-09-30: "a reply naming the stand-in, with the
licence question handed to the PO". The tester has filed it again as *not fixed*, exactly as
Grunge's JP-056 was re-filed a day after its reply (`../grunge/retest-qa-fixes.md`, JP-056). Read
`qa-fixes.md` JP-085 whole and [`layout-1.md`](./layout-1.md)'s open question 1 (`:2035`–`2087`),
which holds the facts gathered for the PO: TipoType sells *Fisterra Web* direct, one-time, $69 (10k
page views a month) to $5,037 (20M), under a non-sublicensable EULA, so the PO has to ask TipoType
whether one licence covers every artist's site the builder publishes (or needs the Corporate &
Enterprise licence); Adobe Fonts lists the family, its terms for a builder unverified; the face is
caps-only; every display and label node names it.

**The tester's "probably the whole template" is right.** `font/display` and `font/label` name it on
every node (open question 1), and `THEMES[3]` sets both to Noto at every layout.

**Evidence** (re-checked at triage, `bb142de`).
- `data.js:182`–`201`: `THEMES[3]`, the stand-in comment (`:186`–`196`), `display` / `label` = Noto
  Serif Display (`:200`–`201`).
- `data.js:670`–`690`: the Noto ems tables every Editorial fit reads.
- `source/index.html:11` and `source/preview.html:10`: one pinned
  `family=Noto+Serif+Display:wdth,wght@62.5,540..700` entry each. No `@font-face` in `source/`.

**The one fact that decides it**: has the PO bought, or agreed to buy, a Fisterra licence that
covers web embedding on the artists' public sites, and asked TipoType the sublicensing question?

**Decision.**
- **B (if yes). Ship the real face.** Write `plans/editorial/display-face.md` from `qa-fixes.md`
  JP-085's option B: the `.woff2` self-hosted under `source/src/builder/fonts/` with an
  `@font-face` in `index.css` **and** `preview.html` (or Adobe's hosted `<link>`, if that is the
  licence); a check that it survives `dressPublishedWindow`'s style clone and that
  `vite-plugin-singlefile` inlines it (the size); the Noto entry retired from both links; a
  Fisterra advance table in place of the Noto ems in every fit (`vm.navEms`, `navNameEms`,
  `navNameFit`, `cardNameEms`, `titleWordEms`, `footerWordEms`, the form statement's, the
  testimonials'); every Editorial head re-measured at all four layouts; every Editorial digest
  moving; the licence text kept in the repo. Its own branch, after this batch merges.
- **C (if no; recommended while there is no licence). A closer free stand-in, chosen by
  rendering.** The tester's complaint is not the stem (session 0 matched it at wght 540) but the
  character: heavy, with curly serifs and ligatures, against a thin, narrow Noto. Grunge's answer,
  a mask, does not transfer: Fisterra's difference is shape, not texture. So C writes
  `plans/editorial/display-face.md` as a **comparison first**: a shortlist of free, web-licensed
  (OFL) display serifs with swash or wedge serifs and a condensed or condensable cut, each
  rendered against the frame's own hero (`964:58612`, *KAI MERCER* at 179) and a section head at
  the frame's size, scored on cap height, stem, width and the swash; Noto at wght 700 (option C
  of `qa-fixes.md` JP-085) is one row of it. The user picks from the renders, and then the plan is
  B's cost list with that face in Fisterra's place. Its own branch, after this batch merges.
- **A. Reply again.** Not recommended: Grunge's twin was refused twice, and this one has been
  refused once.

### JP-098 (*View list ✕*) — what the two controls would do

**Reverses** (if taken) `layout-2-qa-fixes.md` JP-098 decision 3A ("*View list* and ✕ stay
dropped, with a reply: two controls with nothing to do on the published page"), and maybe 1A (the
six tiles). The tester has handed the question to the BA, so the answer is theirs, not ours. What
the session can do is put a concrete proposal to them, because "what should it do?" with no
proposal tends to come back as "what the design shows".

**What the 768 master draws** (`986:15668`, re-read in `layout-2-qa-fixes.md` JP-098): a 342 × 20
head row — *Gallery*, a spacer, *View list*, ✕ — over a 358-tall clipped band whose two columns
hold tiles of 123 / 215 / **1** and 194 / 242 / **1**, so four tiles show, the 242 cut at the
band's foot. The 1440 and 390 masters have no head row.

**What the page draws** (`EncoreSection.jsx`, the shared `if (s.v1)` at `:15072`): six tiles at
768 (`COLUMNS` `:15160`–`15162`, `[[123,215,225],[194,242,127]]`, each `flex: ${h} 1 auto` at
`:15208`) showing slots 4, 5, 6 and 0, 1, 2 round the hero's slot 3 (`railSlot` `:15168`); the
head row prints `s.galRailLabel` (`:15260`–`15268`). The tester's "their number follows the 7
photos in the list" is right: six tiles are the seven slots less the one in the hero.

**A proposal to put to the BA** (the session's recommendation):
- ***View list*** **reveals the rest.** At rest the band draws the frame's four — the [123, 215]
  and [194, 242] columns, the 242 cut by the band, as the master does. *View list* lets the band
  show every tile (the six, at the frame's proportions, the band growing to hold them). The
  repertoire's layout-3 *View full set* is the precedent (`:13362`–`13368`): a live-only reveal,
  inert on the canvas. Whether it toggles back (*View list* → *Show less*) is the BA's call; the
  repertoire's has no way back.
- **✕ clears the pick.** The tiles already pick a photograph into the hero, and a second click on
  the picked tile resets it (`:15186`–`15192`). ✕ does that reset from the row: the hero returns
  to the featured photograph. Drawn only while a tile is picked (or always, inert at rest: the BA's
  call).
- **Neither is drawn at 1440 or 390**, as the masters have no row there.

**Decision.**
- **A. The reply stands until the BA answers.** No code in this batch; entry 6 closes as "waits on
  the BA".
- **B (recommended). Send the proposal above to the BA now, and run entry 6 on their answer.**
  If they confirm it (or amend it) before entry 6's session, entry 6 builds it; if they have not
  answered by then, entry 6 is skipped and the sweep's reply says the question is with them, with
  the proposal attached.
- **C. Draw both as inert spans and the frame's four tiles**, the picture alone. Not recommended:
  two photographs become unreachable at 768, and two controls do nothing — the reasons the last
  batch kept them out.

**Decided** (user, 2026-10-05).
1. **JP-085: C, a closer free stand-in, chosen by rendering.** No Fisterra web licence has been
   bought or agreed. [`display-face.md`](./display-face.md) is written from option C. It runs on its
   own branch (`editorial-display-face`) after this batch merges, not as entries appended here, so
   this batch's digests carry no Editorial face rows. If a licence is bought, `qa-fixes.md`
   JP-085's option B replaces it.
2. **JP-098: B, the proposal goes to the BA now.** The user relays *A proposal to put to the BA*
   above, as written: *View list* reveals the rest, ✕ clears the pick, neither at 1440 or 390.
   Entry 6 builds it if the BA confirms or amends it before entry 6's session. If not, entry 6 is
   skipped, and the sweep's reply says the question is with the BA, with the proposal attached.
   `layout-2-qa-fixes.md` JP-098's decisions 1A and 3A stand until then.

Asked over the evidence, re-checked on HEAD (`e953ec9`, the plan commit on `bb142de`; no source
has changed since the triage). Every line held:
- **JP-085**: `THEMES[3]` at `data.js:180`–`201`, the stand-in comment inside `:183`–`199`,
  `display` / `label` at `:200`–`201`; `NOTO_EM` at `:677`, `notoEms` at `:687` (and `notoBoldEms`
  at `:695`); one pinned `Noto+Serif+Display:wdth,wght@62.5,540..700` entry at `index.html:11` and
  `preview.html:10`; no `@font-face` in `source/`.
- **JP-098**: `Gallery`'s `if (s.v1)` at `EncoreSection.jsx:15072`, `COLUMNS` `:15160`–`15162`,
  `railSlot` `:15168`, the tile's click and reset `:15186`–`15192`, its `flex: ${h} 1 auto`
  `:15208`, the head row `:15260`–`15268`, the repertoire's *View full set* `:13362`–`13368`.

**Settled** (2026-10-05, no code).
- **Nothing under `source/` changed**, so there is no digest.
- **`display-face.md`** takes option C as a comparison first. Writing it found these, and the plan
  carries them:
  - **Session 0's table is the baseline.** Its seven measured rows are carried over, Noto 540
    among them. Noto at 700 (`qa-fixes.md` JP-085's option C) is a new row.
  - **Ten new rows, each confirmed served by Google Fonts with its axes** (2026-10-05). Two are
    roman–blackletter hybrids for *Fora*'s sharp angles (Grenze, Texturina). Two are narrow
    high-contrast cuts (Imbue, and Playfair with its width axis). Three are caps-only or titling
    faces (Cinzel, Castoro Titling, Elsie Swash Caps). Almendra Display and Pirata One mark the
    angular edge. Their character column is unrendered, so it is step 1's to fill.
  - **A fifth score column, *character***: wedge or angled serifs, R and Q tails, caps-only,
    ligatures. The tester's complaint is the face's shape, and session 0's four columns measured
    only proportions and weight.
  - **Fraunces is left out on purpose.** Its SOFT / WONK curls are already pinned for Retro, and a
    second instance would change the face Retro's sites are served.
  - **The cost list names every read of the Noto ems**: `navFace` (six vm keys and the calendar
    month), `titleWordEms`, and the testimonials and footer statements. `faceK` is re-measured, not
    assumed 1. CLAUDE.md's *Editorial's face* rule moves to the winner when it ships.
- **Docs.** A *reversed* pointer on `qa-fixes.md` JP-085's Decided. `layout-1.md` open question 1
  now points at `display-face.md`. `layout-2-qa-fixes.md` JP-098's Decided notes the proposal sent
  (not *reversed*, since 3A stands until the BA answers). `notes/gallery.md` is unchanged, since no
  code moved. `plans/README.md`'s row is the sweep's (step 6).
- **The reply lines**, in the sweep's shape so step 6 can use them unchanged. Each opens on who
  holds the next step:
  - **JP-085 — planned for a later build; the licence stays with the PO.** This build is
    unchanged: the headings are still Noto Serif Display, and nothing named Fisterra is loaded. No
    licence covering the artists' public sites has been bought, and the PO still has to ask
    TipoType whether one web licence covers every site the builder publishes. In the meantime, a
    later build replaces Noto with a closer free face. It is chosen by rendering candidates side by
    side against the design's *KAI MERCER* and a section heading. The test is the shape the report
    points at: the angled serifs, the tails on R and Q, the narrow capitals. Weight alone was
    matched already. It will still not be Fisterra Fora. If the PO buys a licence, the real face
    replaces it.
  - **JP-098 — with the BA, with a proposal.** This build is unchanged at tablet width: six
    thumbnails and no *View list* or ✕. We have sent the BA this proposal:
    - ***View list* reveals the rest.** At rest the tablet gallery shows the design's four
      thumbnails, the fourth cut at the band's foot. *View list* opens the band to every thumbnail,
      so no photo is out of reach.
    - **✕ clears the pick.** Clicking a thumbnail already puts its photo in the large frame, and
      clicking it again puts the featured photo back. ✕ does the same from the row.
    - **Neither is drawn at desktop or mobile**, since those designs have no such row.

    Whether *View list* folds back, and whether ✕ shows while nothing is picked, are for the BA to
    decide. If they confirm or amend the proposal, it is built as described. Until then the six
    thumbnails stay, so all seven photos remain reachable on a tablet.

---

## JP-092 (rest) — 390: the footer's rule scrolls the page with a long name

**Answers** the *named, not fixed* footer item in `layout-2-qa-fixes.md` JP-092's Settled
(`:636`–`640`) and the earlier one in `qa-fixes.md` JP-086 (`:810`–`813`), which now points there.
The hero half of JP-092 is fixed and holds: the tester confirms it at all three widths.

**Verdict: confirmed, every template but Grunge, at 390 and 414 (and 360 with shorter names).**
The footer's wordmark row is `[mark + name]`, a gap of 20, then a 150 × 2 rule set
`flex: 'none'`. The name is `nowrap` and nothing in the row has `minWidth: 0`, so a long name
pushes the rule past the page and the document scrolls.

**Reproduced in the harness** (triage, `cat=footer&w=mobile&live=1&name=…`, the section's
`scrollWidth` against 390; the tester's 35 is Editorial's):

| Theme | Kai Mercer | Florence and the Machine | Maximilian Featherstonehaugh |
|---|---|---|---|
| 0 Retro | 390 | **445** | **492** |
| 1 Lime | 390 | 390 | **404** |
| 2 Grunge | 390 | 390 | 390 |
| 3 Editorial | 390 | 390 | **425** (the tester's 35) |
| 4 Pop | 390 | **412** | **456** |

At 768 every footer fits. `layout-2-qa-fixes.md` read 414 too (Editorial 436.95, Lime 415.83) and,
at 360, the other long names as well. A section's `scrollWidth` also counts clipped overflow, so
the session confirms each row on the published document's `scrollWidth`; Editorial's, Lime's and
Retro's were confirmed there by `layout-2-qa-fixes.md`, Pop's are the probe's alone.

**Evidence.**
- `Footer` at `EncoreSection.jsx:27912`; `u()` is 1:1 at narrow widths (`:27913`–`27914`).
- The `s.limeTree || s.pop` tree (Lime, Grunge, Editorial, Pop) at `:27973`: the `wordmark`
  `:28009`–`28025`, `row(u(20))` › [`row(u(10))` › mark + name] + the rule
  `<span style={{ width: u(150), height: u(2), …, flex: 'none' }} />` (`:28023`). The name's
  style: Lime `{ ...face, whiteSpace: 'nowrap' }` (`:28021`), Grunge / Editorial `labelStyle`
  (`:28020`; `labelStyle` sets `nowrap` at `:110`), Pop `popType(…, { whiteSpace: 'nowrap' })`
  (`:28018`). The column is `col(u(20))` at 390 (`:28228`), `containerType: 'inline-size'` under
  Editorial and Pop (`:28230`) for the statement's fit, which the name does not read.
- Retro's tree: `wordmark` `:28304`–`28311`, `row(u(20), { height: u(31) })`, the same rule
  `flex: 'none'` (`:28310`), the name `labelStyle(s, u(21.4), …)` (`:28308`).
- The precedent, `NavBar`'s §10.2 rule (`:1888`–`1895`): `flex: 0 1 ${ruleW}`, `maxWidth: ruleW`,
  `minWidth: s.narrow ? '30px' : '0px'`, with the comment "It has to yield rather than push the
  Book Now pill onto a second line".
- `notes/footer.md` says nothing about the name or the rule.

**Fix** (both trees). The rule yields first, as `NavBar`'s does: `flex: '0 1 150px'` (`u(150)`),
`minWidth` 30 at narrow widths, and `minWidth: 0` on the rows round it so the shrink can happen.
Past the rule's floor the name wraps between words (`whiteSpace: 'normal'` on the name, never
`overflowWrap: 'anywhere'`: CLAUDE.md JP-062's rule for a display name), so no name scrolls the
page. Retro's row is `height: u(31)`: a wrapped name needs that to be a `minHeight`, which the
session checks against the seed (zero diff) before relying on it. The arithmetic says the rule
alone is enough for the tester's name: under Editorial the name and mark end at 425 − 170 = 255,
so the rule shrinks to about 115 and nothing wraps; under Retro the 492 leaves 322, so the rule
goes to 48.

**Decision (light).** The two other 360 items `layout-2-qa-fixes.md`'s sweep named with
*Featherstonehaugh* — Editorial's layout-2 nav Book pill at 361.42 / 360, and Editorial's
layout-2 form credit at 362.11 / 360 — are the same family, and the tester did not check 360.
- **A (recommended). Name them again, not fixed here.** No ticket, 360 untested, and each is 1–2px.
- **B. Fold them in**: the pill row's gap and the credit's `minWidth: 0` / wrap, in this entry.

**Expected after-diff: zero** on the seed, every category, themes 0–4, three widths, both
surfaces — *Kai Mercer* never fills the row, so the rule keeps its 150. **Positive control**: the
footer digest with `&name=Maximilian%20Featherstonehaugh` differs in the mobile renders of themes
0, 1, 3 and 4 (and 414 where the session renders it), the rule's width alone (and Retro's row
height, if the name wraps there); Grunge's and every 768 / desktop render: 0. The footer's
`page=2` render is included.

**Verify.** The four long names at 360, 390 and 414, all five templates, published tab: the
document's `scrollWidth` equals the width, the rule ≥ 30 and inside the page, every word one
`Range` rect. The seed's rule is 150 at every width. Card 2 and card 1 in the real app under
Editorial (the tester's steps), then Lime, Pop and Retro.

**Docs.** The two rule sites' comments; `notes/footer.md` (a bullet: the rule yields, the name
wraps past its floor); *answered* pointers at `layout-2-qa-fixes.md:636` and its reply's *Not
changed* line (`:2234`), and `qa-fixes.md:810`.

**Decided** (user, 2026-10-05). **A**: the two 360 items stay named, not fixed here (Editorial's
layout-2 nav Book pill and form credit with *Featherstonehaugh*). This entry fixes the footer's
rule alone.

**Settled** (2026-10-05).
- **Reproduced on HEAD in the real app**, card 2, the tester's steps (*Title* typed, Publish, Open),
  then 360 and 414. The published document's `scrollWidth` with *Featherstonehaugh*: Editorial
  425 / 425 / 437 at 360 / 390 / 414 (the tester's 35), Lime 404 / 404 / 416, Retro 492 / 492 /
  504. *Florence and the Machine* scrolled Editorial and Lime at 360 (390, 372) and Retro at every
  width (445, and 457 at 414). *Supercalifragilistic* scrolled Retro at 360 and 390 (396). **Pop
  does not scroll; it clips.** Its rule ran to 456 at 390 under a document of 390: the triage's Pop
  row was the section's `scrollWidth`, which counts clipped overflow. So under Pop the fault is a
  rule cut off at the page's edge, and the check there is the rule's right edge, not the
  document's. Grunge fits every name (its rule ends at 339 at 390). No console errors.
- **The fix, with one change from the plan.** The rule is `flex: '1 1 0'`, `maxWidth: u(150)`,
  `minWidth` 30 at narrow widths (0 at desktop, as NavBar's), not the plan's `0 1 150px`. Flex
  shares a deficit by `shrink × basis`, so a 150 basis beside a name that may now wrap would wrap
  the name while the rule still had room to give. At basis 0 the rule's shrink weight is 0: it
  grows back to 150 when there is room, and stands at its 30 floor before the name gives a pixel.
  The name drops `nowrap` in both trees (Lime's face and Pop's `popType` lose it; Grunge's and
  Editorial's `labelStyle` and Retro's take `whiteSpace: 'normal'`), never `overflowWrap:
  'anywhere'`. Retro's row is a `minHeight: u(31)`. **No `minWidth: 0` on the rows round it**:
  the wordmark row takes its width from the column's stretch, and the name group's `min-width:
  auto` (the mark and the longest word) is the right floor under JP-062's rule.
- **Harness proved** (HEAD worktree on :5174 against the unedited tree): 0 of 660 canvas, 0 of 660
  `live=1`. The first live pass read 71 theme-3 files at 0.1px, the cold-server Noto noise; a warm
  rerun took it to 0.
- **After-diff: 0 of 660 on both surfaces**, as named: *Kai Mercer* never fills the row.
- **Positive control, as named**: the footer digest with `&name=Maximilian%20Featherstonehaugh`
  differs in **16 of 60 files**, the `arch 0` and `page=2` mobile renders of themes 0, 1, 3 and 4 on
  both surfaces, each in **one row, the rule's width**: Retro 150 → 38.4, Lime → 126.2, Editorial
  → 105, Pop → 73.9. Grunge and every 768 and desktop render: 0. No name wraps at 390, so Retro's
  `minHeight` moves nothing there.
- **Verified in the real app** (card 2 on all five templates and Editorial's card 1; the four names
  at 360, 390 and 414, and 768 on card 2): the rule stays inside the page and at 30 or more in all
  92 rows, every word is one `Range` rect, and the seed's rule is 150 at every width. With
  *Featherstonehaugh* the rule now ends at 350 / 380 / 392 and is Editorial 75 / 105 / 105 wide,
  Lime 96 / 126 / 126, Pop 44 / 74 / 74 and Retro 30 / 38 / 38. **The one wrap is Retro at 360
  with *Featherstonehaugh***: the name takes two lines, the rule sits at its 30, the row is 46.19
  tall, and the statement moves down under it (looked at). **The other tree's wrap**, taken with a
  fifth name, *Maximilian Featherstonehaugh Windsor*: Editorial at 360 and Pop at 360 and 390 put
  the name on two lines with the rule at 30 and every word whole (Editorial's row stays the
  star's 40.23, Pop's is 32). Lime's rule holds it on one line (44 / 74), and Grunge's (126 /
  150). That name scrolls Editorial's and Pop's pages through the form (437, 434), the credit
  named below, not the footer. The footer no longer scrolls any page.
  What still does is named elsewhere and is the same on HEAD (found by hiding each section in
  turn):
  - **Retro's layout-2 hero** (`layout-2-qa-fixes.md` JP-092, *Retro's half*, Decided A): the
    header's `scrollWidth` is 389 at 360 with *Florence*, and 426 / 426 / 438 with
    *Featherstonehaugh*.
  - **Editorial's layout-2 form credit at 360** with *Featherstonehaugh*: 362 (below).
- **Named, not fixed here** (Decided A), both Editorial layout 2 at 360 with *Featherstonehaugh*:
  the nav Book pill ending at 361.42, and the form credit at 362.11. The tester has not checked
  360.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed.
- **Docs.** The rule's comment in both trees (Retro's points at Lime's). `notes/footer.md` gets a
  bullet: the rule yields, basis 0, the name wraps past the floor. *Answered* pointers at
  `layout-2-qa-fixes.md` JP-092's footer item and its reply's *Not changed* line, and at
  `qa-fixes.md` JP-086's footer item.
- **The reply line:**
  - **JP-092 — fixed.** At 390 a long name no longer makes the page scroll sideways. The footer's
    decorative line beside the name now gets shorter to make room for it, down to 30px. A name too
    long even for that goes onto two lines, breaking between words. With *Maximilian
    Featherstonehaugh* the line is about 105px under Editorial at 390 and 414, and 75px at 360. A
    name that fits, *Kai Mercer* included, keeps the design's 150px line. The same fix covers
    Retro, Lime and Pop. Under Pop the line used to be cut off at the page's edge rather than
    scroll it. Grunge's footer already fitted. *Not changed, logged separately:* at 360, the
    Enquiry Form's credit runs 2px past the page with that name, and the menu's Book Now pill runs
    1px past. Retro's Feature spread hero still overflows with a long name.

---

## JP-101 — 390: a long name in the nav runs under BOOK NOW

**Answers** `qa-fixes.md` JP-086's *named, not fixed* item (`:806`–`809`): "*Florence and the
Machine* runs under the Book pill and the burger, and ends at 392.3 at 360 and at 390 … At 414 it
fits." It also widens JP-091 (`qa-fixes.md`, Decided `:1091`, Settled `:1116`–`1193`), whose
give-way rule is desktop only: `fit` is `lime && !s.narrow && !links && s.navNameFit`.

**Verdict: confirmed, and not Editorial's alone.** At 390 the capsule is `NavBar`'s lime arm (Lime,
Grunge, Editorial and Pop), whose narrow branch draws the `Wordmark` `nowrap` at a flat size with
no fit, in a left half that is `flex: 1; minWidth: 0` with no overflow handling, beside a right
half of `BookPill` + the burger. The hero is `overflow: hidden`, so the run-off is clipped and
nothing scrolls — the tester's "no horizontal scroll".

**Reproduced in the harness** (triage, `cat=header&arch=0&w=mobile&live=1&name=…`; the name's
text `Range` right edge against the Book pill's left, in section px):

| Theme | Name size | Kai Mercer | Florence and the Machine | Maximilian Featherstonehaugh |
|---|---|---|---|---|
| 0 Retro | 14 | 112 / 251 | 199 / 251, fits | 230 / 251, fits |
| 1 Lime | 21 | 155 / 236 | **260 / 236** | **297 / 236** |
| 2 Grunge | 21 (28 × 0.75) | 160 / 239 | **285 / 239** | **330 / 239** |
| 3 Editorial | 25 | 212 / 219 (the tester's 212 and 7) | **392 / 219** (the tester's 392) | **460 / 219** |
| 4 Pop | 15.68 | 165 / 218 | **298 / 218** | **350 / 218** |

At 768 the long names fit under all five (Editorial's *Featherstonehaugh* ends 19 short of the
pill), as the tester found. **Layout 4 at 390** (`arch=3`, HeaderV3, which calls the same
`NavBar` with `links` and `nameSize={s.labelLg}`) overlaps too: Editorial *Florence* 251 / 213,
Pop 298 / 195; Lime, Grunge and Retro fit. Layouts 2 and 3 draw their own name spans, not
`NavBar`: under Lime, Grunge and Editorial they fit at 390 on the probe, but with a long name the
**Book pill** is pushed past the page under Retro at layout 2 (*Featherstonehaugh*, 426:
`layout-2-qa-fixes.md`'s named item) and under Pop at layouts 2 (*Featherstonehaugh*, 410) and 3
(*Florence* 434, *Featherstonehaugh* 480). That is a different fault (the pill, not the name) in
different headers, so it is not this entry's; see *Seen at triage, not filed*.

**The tester's 16px.** Editorial's 390 wordmark is 25px (`:1886`); 16px is Pop's. The session reads
the size in the real app on card 1 before quoting it in the reply.

**Evidence.**
- `NavBar` at `EncoreSection.jsx:1838`; `lime` `:1844`; the mark's `glyph` at 390 (Editorial
  44.93) `:1849`; JP-091's `fit` `:1852`–`1864` (room = the capsule's `100cqi` less the mark, the
  halves' gap, the pill and the links at their floor; `one` / `two` / `cap` / `floor`); the capsule
  `:1866`–`1878` (padding `10px 20px` at narrow, `containerType` only under `fit`); the left half
  `:1884`; the name's size at 390 (Grunge 28, Editorial 25, Pop 16, Lime 21) `:1886`; the narrow
  right half `:1897`–`1901`.
- `Wordmark`: `fitName` / `fitBox` `:864`–`878` (`whiteSpace: normal`, `textWrap: balance`,
  `maxWidth`), the Grunge / Editorial arm `:907`–`912` (`nowrap` at `:910`), the row span `:914`;
  Lime and Pop through `labelStyle` (`:890`, `nowrap` at `:109`). `LogoMark` `:834`–`851`.
- `BookPill`'s lime branch `:1096`–`1126` (k 0.62 at 390); the burger 26 wide, `flex: 'none'`
  (`:992`).
- `EncoreBuilder.jsx`: `navFace` `:712`–`713`, `vm.navNameEms` `:728`, `vm.navNameFit` `:740`–`753`
  (set only for `cat === 'header' && d === 0`).
- HeaderV0's call `:2091`–`2093`; HeaderV3's lime call `:3997`, Retro / Pop's `:4187`.
- `notes/nav.md:68`–`88`: JP-091's rule, desktop only; nothing on 390.

**The room at 390** (Editorial, from the probe): the capsule's content runs 30 → 360; the mark
44.93 and its 20 gap put the name at x 95. **The seed already overruns its own box**: a second
probe read the left half's box ending at **208.8**, *KAI MERCER* at **211.6**, the pill at 218.8
(the halves' gap is 10). So there are two rooms, and the choice decides the seed:
- **the half's box, about 114px**: a fit that sizes to it shrinks the seed to about 24.4px, or
  wraps it to *KAI / MERCER* — the seed moves (header `arch 0` × mobile × theme 3, both surfaces);
- **the half plus the halves' gap, about 124px** (recommended): the seed keeps its 25px with the
  7px to the pill that the tester measured, the frame's own picture, and only a name that would
  reach the pill gives way.

Under Lime, Grunge and Pop the seed ends 46–69 short of its box, so either room leaves it alone.
*Florence and the Machine* is 307 wide at 25px on one line, about 155 as two balanced lines
(*FLORENCE AND* / *THE MACHINE*), and *FLORENCE*, its widest word, about 97.

**Does the header grow?** HeaderV0's 390 hero read **844** tall with the seed and with *Florence*,
with no inline `height` or `minHeight` (layout 4's carries `minHeight: 844`), inside
`overflow: hidden`. The session reads where the 844 comes from before choosing 1A: if it is a
fixed height, a taller capsule pushes the hero's content down inside a clipped box rather than
growing the header, and 1A needs that height to become a minimum (JP-092's Retro row, the same
check).

**Decision.**
1. **How the name gives way.**
   - **A (recommended). JP-091's rule at 390**: one line at the ramp while it fits; otherwise two
     balanced lines (`textWrap: balance`, `fitBox`'s shape), set at the size where the longer line
     fits the room, floored at 12px; past the floor the name takes a third line. The capsule grows
     by the second line (the session measures it, and the hero's height question above), since at
     390 the bar has no links to protect and the pill is 0.62 of the desktop's. *Florence and the
     Machine* comes to about 18px on two lines under Editorial. `fit` gains a narrow arm (the
     `!s.narrow` term goes, for `s.mob`), its room the left half plus the halves' gap, a `cqi` on
     the capsule as at desktop.
   - **B. One line, shrinking, then an ellipsis.** The name keeps one line, sized to the room down
     to 12px, then cut with `…`. Under Editorial *Florence and the Machine* needs 9.3px for one
     line, so it reads *FLORENCE AND THE MA…* at 12. The tester's third option; it hides the name.
   - **C. An ellipsis at the ramp.** The smallest change: *FLORENCE A…*. Not recommended: the
     ticket is that the name cannot be read.
2. **Scope.**
   - **A (recommended). Layouts 1 and 4 at 390**, Lime, Grunge, Editorial and Pop: one narrow
     branch serves both headers, and layout 4 overlaps under Editorial and Pop on the probe.
     JP-091 kept layout 4 out at desktop because its capsule carries links; at 390 the links are
     in the burger, so the reason does not hold there. It costs two gate changes the session makes
     on purpose: `fit`'s `!links` term holds at desktop only (at 390 `links` no longer excludes),
     and `vm.navNameFit`, built only for `cat === 'header' && d === 0`
     (`EncoreBuilder.jsx:740`–`753`), is built at `d === 3` too. Layout 4's 390 name is
     `nameSize={s.labelLg}`, not layout 1's flat size, so the fit has two ramps (Editorial's seed
     ends 53 short of its box there).
   - **B. Layout 1 alone**, what the tester filed. Layout 4's overlap is then named in the reply.
   768 stays as it is under both: every name fits there (the session confirms with the four long
   names at 768 before closing that door).

**Expected after-diff: zero** on the seed, every category, themes 0–4, three widths, both surfaces,
**on the recommended room** (the half plus its gap): *Kai Mercer* fits one line at the ramp under
all five, Editorial's 7px to the pill the tightest. On the half's-box room it is **2 files**
instead, header `arch 0` × mobile × theme 3, the seed's size or wrap. Name which before the code.
The files at risk are header `arch 0`, `3` (and `4`, folding onto 0) at mobile: a `containerType`
added to a capsule that is already `width: 100%` moves nothing. **Positive control**: the header digest with
`&name=Florence%20and%20the%20Machine` differs in header `arch 0` (and `3` on 2A) at mobile under
themes 1–4, the wordmark's rows and the capsule's height (on 1A); Retro and every 768 / desktop
render: 0.

**Verify.** The four long names at 360, 390 and 414, card 1 (and card 4 on 2A) under Lime, Grunge,
Editorial and Pop, published tab: the name's `Range` rects end before the pill's left edge less the
gap; no word breaks inside itself; the pill and burger keep one row; the capsule's height on the
seed unchanged. The burger still opens (2 → 6 links). JP-091's desktop rows unchanged (the
1180 / 1440 / 1920 renders of the four names). The real app: the tester's steps on Editorial card 1
at 390.

**Docs.** JP-091's comment over `fit` (its scope sentence); `notes/nav.md`'s JP-091 paragraph
(the 390 arm); *answered* pointers at `qa-fixes.md:806` and its reply's *Not changed* line;
`notes/templates.md` if it states the wordmark's 390 size as fixed.

**Decided** (user, 2026-10-05, over the real-app reproduction below). **1A, 2A, the room up to the
pill.**
- **1A, the name wraps and the bar grows.** One line at the ramp while it fits; otherwise two
  balanced lines at the size where the longer line fits the room. Below 12px it takes a third
  line, and a single word too wide for the room at 12 goes below it (the widest word in the same
  ems), so no name runs under the pill and none breaks inside a word.
- **2A, layouts 1 and 4** at 390, Lime, Grunge, Editorial and Pop. Editorial's layout 3 and Retro
  at 360 are named, not fixed.
- **The room is up to the pill**: the left half plus the halves' gap. The wordmark's row is
  `flex: none` under the narrow fit, or the flex row itself would wrap the seed, whose 2.8px
  overrun of its half is the frame's own picture.

**Settled** (2026-10-05).
- **Evidence held at `f11cf44`.** `NavBar` at `EncoreSection.jsx:1838`, `fit` at `:1861`, the
  narrow name sizes at `:1886`, the §10.2 rule at `:1888`–`1895` (entry 2 touched only the
  Footer); `Wordmark` at `:879`, the Grunge / Editorial `nowrap` at `:910`; `vm.navNameFit` at
  `EncoreBuilder.jsx:748`–`753`. The hero is `aspectRatio: 390 / 844`, `overflow: hidden`,
  `justifyContent: space-between` (`:2050`–`2066`): a fixed height, so a taller capsule takes its
  extra from the empty middle, never the identity block.
- **Reproduced on HEAD in the real app** (a scratch puppeteer walk: picker, the card, the Title
  through `st`, Publish, Open; 320 readings, the name's `Range` against the pill's box, with a
  vertical-overlap test). No console errors.
  - **Card 1**: *Florence* runs under the pill under Editorial (392.3 against 218.8, the tester's
    numbers), Lime, Grunge and Pop at 360, 390 and 414; *Featherstonehaugh* likewise, and
    *Supercalifragilistic* under Editorial and Pop at all three, Lime and Grunge at 360.
    **Editorial's seed runs 22.8 under the pill at 360.** The size is 25 under Editorial; the
    tester's 16 is Pop's (15.68, faced).
  - **Card 4** (the same NavBar): Editorial and Pop with every long name at all three widths
    (Pop's seed 0.2 under at 360), Lime and Grunge with *Featherstonehaugh* at 360.
  - **Card 3 under Editorial** (`HeaderV2`'s centred `flex: none` name, not NavBar): *Florence*
    24.7 under the pill at 390, and the other long names at all three widths; Lime with
    *Featherstonehaugh* at 360. The triage's "layouts 2 and 3 fit" missed it.
  - **Retro** cards 1 and 4: only *Featherstonehaugh* at 360 (9.2, 16.6). Card 2 fits everywhere.
  - **768 fits every one of the four names on every card.**
- **The code.**
  - `NavBar`: at `s.mob` the fit is `narrow`, its room `100cqi + halves - glyph - markGap` with
    the **left half** the query container (the capsule stays one at desktop alone), for layouts 1
    and 4. The desktop fit is unchanged and now gated on `s.v0` beside `!links`, since
    `vm.navNameFit` exists at design 3 too (Lime's and Pop's layout-4 desktop pass no `links`).
    The halves' gap is hoisted (`halves`).
  - `Wordmark`: a `narrow` fit's size is `min(own, max(min(floor, room / word), room / two))`,
    its box `maxWidth: room`, and its row `flex: none` (`fitRow`).
  - `sectionVm`: `navNameFit` is built for designs 0 and 3, and carries `word`
    (`cardNameEms × 1.01`).
- **Harness proved** (HEAD worktree on :5174 against the unedited tree): **0 of 660 canvas, 0 of
  660 `live=1`**, no cold-server noise this time.
- **After-diff: 0 of 660 on both surfaces**, as named.
- **Positive control, as named**: the header digest with `&name=Florence%20and%20the%20Machine`
  differs in **10 of 90 files** on each surface: mobile `arch 0` and `4` under themes 1–4, and
  `arch 3` under Editorial and Pop. *Featherstonehaugh* moves the same 10 (at 390 it fits Lime's
  and Grunge's layout 4 at their 14). Retro and every 768 and desktop render: 0.
- **Verified in the real app** (cards 1 and 4 under Lime, Grunge, Editorial and Pop; the four
  names plus *Maximilian Featherstonehaugh Windsor*; 360, 390, 414 and 768; 160 readings): every
  name ends before the pill, by **1.0px** or more (a fitted name's 1% spare), every word is one
  `Range` rect, the pill and burger keep their row, and the burger opens (9 links) and closes.

  | 390, card 1 | Editorial | Lime | Grunge | Pop |
  |---|---|---|---|---|
  | Kai Mercer | 25, 1 line | 21, 1 | 21, 1 | 15.68, 1 |
  | Florence and the Machine | **20.94, 2** | 21, 2 | 21, 2 | 15.68, 2 |
  | Maximilian Featherstonehaugh | 13.8, 2 | 21, 2 | 21, 2 | 12.86, 2 |
  | Supercalifragilistic | 13.67, 1 | 21, 1 | 20.9, 1 | 12.46, 1 |
  | …Windsor | 12, **3** | 16.29, 2 | 14.96, 2 | 11.76, 3 |

  - **The bar grows** by the second line: Editorial 65.34 → 66.06 (the star is nearly as tall),
    Lime 56 → 66.19, Pop 53.45 → 58.41, and **Grunge 53.45 → 81.59**, more than the question's
    "about 13", because Anton's faced line box is the nominal 28 × 1.1 = 30.8. The hero's height
    does not move; under Grunge with *Florence* the capsule ends 4.4 above the seal's top, which
    floats beside it (looked at), and the identity block keeps its place.
  - **Every seed keeps its size and one line at 390 and 414.** At 360 **Editorial's *Kai Mercer***
    takes two lines at 25 (KAI / MERCER, the bar 75, looked at), and Pop's layout-4 seed takes
    two at 15.68: both ran under the pill on HEAD.
  - **The floor's yield**: Editorial's *Featherstonehaugh* at 360 sets at 10.71, Pop's layout-4 at
    8.28 at 360 and 10.83 at 390, its widest word filling the room. 3 lines only with *…Windsor*.
  - Card 4 under Lime and Grunge: *Featherstonehaugh* at 360 now takes two lines at their 14
    (Grunge 10.5 faced).
  - Retro (cards 1 and 4, the four names): HEAD's readings, the 360 overlap unchanged.
  - Desktop: the positive control's desktop renders are 0, so JP-091's rule is unchanged.
- **Named, not fixed here** (each reads the same on HEAD):
  - **Editorial's layout-3 nav** (`HeaderV2`, its own centred name): *Florence* 24.7 under the
    pill at 390, every long name at 360–414; Lime's with *Featherstonehaugh* at 360.
  - **Retro's narrow bar** (cards 1 and 4): *Featherstonehaugh* 9.2 / 16.6 under the pill at 360.
    Retro's face has no ems table.
  - **768 with *…Windsor*** under Editorial: the one-line name runs 85 under the pill. The four
    report names fit at 768.
  - **The burger's panel** draws its own `Wordmark` (`NavMenu`, no fit, `nowrap` at the narrow
    ramp), so a long name pushes its ✕ off the panel rather than run under it. The panel then
    scrolls sideways (`overflowY: auto` makes `overflowX` auto too). Editorial with *Florence* at
    360 and 390 (the ✕ ends at 410; at 414 it fits) and with *Featherstonehaugh* at every width
    (478); Grunge and Pop with *Featherstonehaugh* at 360 (366, 368). Lime and Retro fit. Measured
    after the fix with the ✕'s box; the code is HEAD's.
  - **The gallery at layout 1 scrolls the page** with long names: under Pop with *Florence* at
    360 (378), *Featherstonehaugh* at 360–414 (421, 433), and under Editorial, Lime and Grunge
    with *…Windsor* (413). Found by hiding each section in turn; the gallery reads the name.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed.
- **Docs.** The `fit` comment in `NavBar` (the 390 arm), `fitName` / `fitBox` / `fitRow`'s
  comment, the `vm.navNameFit` comment; `notes/nav.md`, a new bullet beside JP-091's; *answered*
  pointers at `qa-fixes.md` JP-086's nav-wordmark item and its reply's *Not changed* line, and at
  JP-091's "Untouched: the narrow branch". `notes/templates.md` does not state the 390 size, and
  CLAUDE.md does not describe the nav's name, so both are untouched.
- **The reply line:**
  - **JP-101 — fixed.** At 390 a long name in the menu bar no longer runs under BOOK NOW. It
    keeps the design's size while it fits on one line before the button; otherwise it wraps
    between words onto two balanced lines and the bar grows to hold them. *Florence and the
    Machine* reads FLORENCE AND / THE MACHINE at about 21px under Editorial. A longer name is set
    smaller so its two lines still fit, and a name too long even for that takes a third line at
    12px. The same holds at 360 and 414, on Lime, Grunge and Pop, and on the Stacked header
    (layout 4), which had the same fault. At 360 even the default *Kai Mercer* ran under the
    button under Editorial; it now takes two lines. The name's size there is 25px under
    Editorial; 16px is Pop's. *Not changed, logged separately:* Editorial's Inset Hero header
    (layout 3) and Retro's at 360 still run a long name under the button. In the open menu, a
    long name pushes the ✕ past the screen's edge under Editorial. Under Pop a long name
    makes the Gallery scroll the page sideways (*Florence and the Machine* at 360, *Maximilian
    Featherstonehaugh* at every width).

---

## JP-099 — 390: the player still has no ♡ ↓ ⋯

**Reverses** (if taken) `layout-2-qa-fixes.md` JP-099, decided A on 2026-10-01 ("keep the
override, with a reply"), and behind it Retro's call (`../retro/layout-2.md:891`–`899`), Lime's
padding (`../lime/layout-2.md:631`–`635`) and Editorial's note (`layout-2.md:1101`–`1103`, open
question 7, designer note 6). Read that entry whole: its *What the master does* and *What the
icons would cost at 390* are the numbers this entry chooses between. The tester has refused the
reply, and the designer has not answered.

**The master, in one line** (`I986:15683;879:10509`): 40 + 117.07 transport + 24 + **22.93** for
the sleeve, title and clock + 24 + 62 icons + 40 = 330. It pays for the icons with the whole title.

**The page at 390** (that entry's Settled): the bar 330, padded 16 (Retro 20), gap 14, the inner
pill 187.5 = sleeve 60 + 12 + a title box of **115.5** (Retro 103.5). The cued LATE LIGHTS is
already cut under Editorial (121.6 in 115.5) and Pop.

**Evidence** (moved since that entry; Pop layout 2 widened the block).
- The `s.limeTree || s.pop` bar (from `EncoreSection.jsx:7359`): the bar `:7523`–`7579`, height
  `u(108)` (`:7528`), padding `0 ${s.mob ? '16px' : u(40)}` (`:7529`), gaps 14 at 390
  (`:7530`, `:7532`), the 390-trade comment `:7537`–`7547`, the inner pill `:7548`–`7558` (sleeve
  `art(nowArt, u(60), …)` `:7552`, title box `:7553`–`7556`), the clock `{!s.mob && …}` `:7557`,
  the icons `{!s.mob && (…)}` `:7559`–`7563`.
- Retro's body: the bar `:7823`–`7890`, padding 20 at 390 (`:7837`, comment `:7833`–`7836`),
  gaps (`:7838`, `:7845`), the inner pill `:7867` (comment `:7861`–`7866`), sleeve
  `:7868`–`7871`, title box `:7872`–`7876`, clock `:7880`, icons `:7883`–`7887`.
- The icons are inert `<span>`s at every width (`:7562`, `:7886`).
- `notes/media.md` has no line on the 390 bar.

**Decision.**
- **C (recommended). Draw the icons, drop the sleeve at 390.** The cluster at 768's size (13px,
  gap 12) is 61.1, plus the bar's 14 gap: 75.1. Dropping the sleeve and its gap frees 72. So the
  title box goes **115.5 → about 112.4** (Retro 103.5 → about 100.4): the title keeps its room to
  within 3px, and the bar reads transport · title · ♡ ↓ ⋯, the frame's picture without the sliver
  of sleeve it shows. The clock stays dropped (the master runs it off the bar too). The icons stay
  inert, as at 768 and 1440.
- **D. The icons on a second line.** The bar's fixed 108 becomes a minimum; the sleeve and title
  keep their room. Further from the frame, which is one row.
- **B. Draw the icons, keep the sleeve**: the title box goes to about 40, two or three letters.
- **A. Keep the override, reply again.** Not recommended: refused once, and the designer has not
  answered.

**Expected after-diff** (C or D): media `arch 1` × mobile × themes 0–4 × both surfaces = **10
files**, the bar's subtree (the sleeve's `img` / backdrop removed, three spans inserted, the title
box's width). 768 and 1440: 0. Media `arch 0`, `2`, `3`: 0.

**Verify.** The seed (SLOW BURN on the canvas) and `live=1`'s cued LATE LIGHTS at 360, 390 and 414,
all five templates: nothing past the bar, the icons inside it, the title's ellipsis on its own box;
a played row moves the title and byline as before. The published tab on card 2 under Editorial,
Lime, Grunge, Pop and Retro (the tester's steps). Name, not fix, any title the box still cuts (LATE
LIGHTS under Editorial and Pop: it was cut before).

**Docs.** The two 390-trade comments; a `notes/media.md` bullet (the 390 bar: icons, no sleeve, no
clock); *reversed* pointers at `layout-2-qa-fixes.md`'s JP-099 Decided, `../retro/layout-2.md:891`,
`../lime/layout-2.md:631`, `layout-2.md:1101` and its designer note 6 (and `layout-2-qa-fixes.md`'s
designer note 2), `../pop/layout-2.md:1145`.

**Decided** (2026-10-05, user call): **C, draw the icons and drop the sleeve at 390.** The
question gave HEAD's published numbers and named C's two costs. First, Retro's cluster is 64, not
61.1, so its box goes to 97.5, not 100.4. Second, C newly cuts Grunge's LATE LIGHTS at 360, which
fits today by 0.2. **Follow-up, same day (user call):** C as first shipped cut Editorial's
canvas seed SLOW BURN by 0.2. The user said to "take the 1px, keep SLOW BURN whole", so the Lime
bar's glyph gap is 11 at 390.

Re-checked on HEAD (`aa2a381`). Every *Evidence* line held, **+26** as entry 3 predicted:
- the `(s.limeTree || s.pop)` bar `:7549`–`7605`: height `:7554`, padding `:7555`, gaps `:7556` /
  `:7558`, the 390-trade comment `:7563`–`7573`, the inner pill `:7574`–`7584` (sleeve `:7578`,
  title box `:7579`–`7582`), the clock `:7583`, the icons `:7585`–`7589`;
- Retro's bar `:7849`–`7916`: padding `:7863` (comment `:7859`–`7862`), gaps `:7864` / `:7871`,
  the inner pill `:7893` (comment `:7887`–`7892`), sleeve `:7894`–`7897`, title box
  `:7898`–`7902`, clock `:7906`, icons `:7909`–`7913`.

Retro's body is Retro's alone now: Pop renders through the Lime bar.

**Settled** (2026-10-05).
- **Reproduced in the real app on HEAD.** Card 2 was published under Editorial, Lime, Grunge, Pop
  and Retro (puppeteer, the tab caught from the opener). At 360, 390 and 414 no template drew
  ♡ ↓ ⋯ or the clock, and at 768 all five drew both. The title box was 115.5 at 390 and 414
  (85.5 at 360) under the four Lime-tree templates, Pop included, and 103.5 (73.5) under Retro.
  The prior entry's 105.5 for Pop predates Pop layout 2 moving it onto the Lime bar.
- **The harness.** A HEAD worktree on :5174 against the tree. The long-running :5173 carried 71
  Editorial live files 0.1px off (Noto shaping), on two reruns of both servers. A fresh tree server
  on :5175 diffed **0 of 660 on each surface**, themes 0–4. So :5173 was a stale server, not cold
  noise, and every after-label below was taken on :5175.
- **The fix**, both bodies, at `s.mob` alone. The sleeve is gated `!s.mob` (`art(…)` in the Lime
  bar, the `Photo` span in Retro's), and the glyph cluster's `!s.mob` gate is gone. The padding,
  the 14 gaps and the dropped clock stand. The glyphs keep 768's size (13 / 10.8 / 13.3;
  Retro's 14 / 11.7 / 14.3). Their gap is 12, except in the Lime bar at 390, where it is 11
  (the follow-up). So the cluster is 59.1 (Retro 64).
- **After-diff: exactly the named 10 files.** Media `arch 1` × mobile × themes 0–4 × canvas and
  `live=1`. In each, the inner pill and the sleeve's span and `img` go, three glyph spans and
  their row come in, and the title column narrows. Nothing else moves: 768, 1440 and media
  `arch 0`, `2`, `3` are 0. The follow-up was re-taken on a fresh :5175. It is the same 10
  files against HEAD. Against the first fix, it moves 4 per surface: themes 1–4. Retro's file
  is unchanged.
- **The published tab, after** (card 2, all five templates, 360 / 390 / 414 / 768). The page does
  not scroll sideways at any width. The glyphs sit inside the bar, `cursor: auto` with no handler.
  The title box is **114.4** at 390 and 414 (84.4 at 360), Retro's **97.5** (67.5). The first
  fix measured 112.4 (82.4), as predicted, and the follow-up's 2px make it 114.4.
  Playing row 03 moves the title to SLOW BURN with the byline, and the audio plays, under all five
  templates.

  | Template | LATE LIGHTS | 390 / 414 (box 114.4; Retro 97.5) | 360 (84.4; Retro 67.5) |
  |---|---|---|---|
  | Retro | 88.3 | whole | cut (was cut) |
  | Lime | 95.5 | whole | cut (was cut) |
  | Grunge | 85.3 | whole | **cut, new**, by 0.9 (fit by 0.2) |
  | Editorial | 121.6 | cut (was cut) | cut (was cut) |
  | Pop | 123.0 | cut (was cut) | cut (was cut) |

- **The seed on the canvas under Editorial (the follow-up).** C as first shipped left SLOW BURN
  112.6 in a 112.4 box, so the canvas read "SLOW BU…" at 390. The triage had foreseen that for C
  (`layout-2-qa-fixes.md` JP-099's option C). The user took 1px off the glyphs' gap in the Lime
  bar at 390, which departs from the frame's 12. The box is now 114.4 and the seed is whole
  (screenshot checked). Pop's seed (118.5) was cut before and still is. Retro's body keeps 12,
  since its seed (83.7 in 97.5) fits. The byline *Kai Mercer · Single* (106.8) now fits every
  390 box but Retro's.
- **Docs.** The comments are rewritten: the Lime bar's 390-trade comment and the clock and glyph
  notes, and Retro's inner-pill and clock comments. `notes/media.md` has a new bullet for the 390
  bar, and its byline line now gives the new boxes. *Reversed* pointers are in:
  - `layout-2-qa-fixes.md`'s JP-099 (a note over Decided, and *superseded* on its reply line) and
    its designer note 2;
  - `../retro/layout-2.md`'s "A frame's own render can be the artefact";
  - `../lime/layout-2.md`'s second named departure;
  - `layout-2.md`'s section-3 bullet, open question 7's media line and designer note 6;
  - `../pop/layout-2.md`'s named diffs, open question 6's media line and its leak list.
- **The reply line** (the sweep's shape):
  - **JP-099 — fixed, on every template.** At 390 (and 360 and 414) the Media Player's bar now
    shows ♡ ↓ ⋯, as the design does. To make room, the cover thumbnail in the bar goes at that
    width. The design's thumbnail is only a sliver there anyway, and this way the song's name
    stays readable. The running time stays hidden, as in the design. The icons do nothing at any
    width, as before. A long name such as *Late Lights* under Editorial still ends in "…" at 390,
    as it did before.

---

## JP-089 (rest) — the extra `All` chip

**Reverses** `qa-fixes.md` JP-089 decision 2A ("The `All` chip stays, as `notes/pricing.md`
records … and the canvas pins it"), and the call behind it: `All` as "layout 1's intended diff"
(`notes/pricing.md:18`–`28`, `README.md:343`–`344`). The tester ties it to JP-070, where Grunge's
retest kept `All` at layout 3 (`../grunge/retest-qa-fixes.md:300`–`309`, decided 2026-09-29) and
turned down **A+**, a row with no `All`, because layout 3's frame draws three rows under a picked
*Duo*.

**What the frames draw.** Editorial's layout-1 pricing (`964:58618`, and Lime's `964:58594`,
Grunge's `964:58606`): *Private Event / Club Night / Festival*, **no `All`**, *Club Night* lit,
and all three cards shown under it. So in the frame's picture the lit chip filters nothing. Retro's
layout-1 frame draws *Solo / Trio / Band* with no `All` either; layout 3's every frame *Duo / Trio /
Band*, *Duo* lit, three rows shown.

**What the page does** (`EncoreSection.jsx`, `Pricing` at `:9330`):
- `repChips()` (`data.js:2633`–`2640`) always leads with `{ label: REP_ALL, tag: null }`
  (`REP_ALL = 'All'`, `data.js:1167`); `vm.tierChips` at `EncoreBuilder.jsx:1133`, over
  `tierList` (`:1053`), which `tiersSeed()` (`data.js:1048`–`1049`) seeds with `TIERS_1` at layout
  1 under Lime, Grunge, Editorial and Pop (comment `data.js:1029`–`1034`: "…and the All chip
  stays").
- `const [chip, setChip] = useState(0)` (`:9335`). Layout 1: `active = s.live ? Math.min(chip, …)
  : 0`, and `shown` filters only when live, `active === 0` passing every package
  (`:9356`–`9363`). The `s.limeTree` row `:9544`–`9546` (comment `:9540`–`9543`, "ours pins chip 0
  (All) on the canvas"); Retro's `:9775`–`9777`.
- Layout 3 shares `active` / `shown` (`:10739`–`10743`; capsule `:10993`–`11001`, Retro's
  `:11082`–`11089`; comment `:10674`–`10680`, "The extra `All` … is layout 1's intended diff").
  Its FEATURED seat, `featAt` (`:10748`–`10749`), is the ticked package or the last on show, so it
  reads `shown`.
- Layout 2 has **no `All`**: one chip per package, picking the big plan (`:10232`, `:10500`).
- Layout 1's glow is a fixed seat, `i % 3 === 1` (`:9588`), whatever is on show.

**Decision.**
1. **The row's rest state.**
   - **A (recommended). The frame's chips alone, nothing picked at rest, a chip toggles.** `All` is
     gone. At rest no chip is lit and every package shows — the frame's three cards. A press lights
     the chip and filters to its packages; a second press on the lit chip clears it, the gallery
     tile's *second click resets* (`:15186`–`15192`). On the canvas nothing is lit and nothing is
     filtered, as today. `chip` starts at **-1** (not the form chip's 0, which is a choice the
     visitor must make; here "every package" is the useful rest). The one named diff left is the
     frame's lit *Club Night*, and the reply says why: a lit chip that filters nothing would lie on
     the published page.
   - **B. A+: no `All`, chip 0 lit at rest and filtering.** Layout 1 would open on *Private Event*
     alone, one card, where the frame shows three. Not recommended, for the reason Grunge's retest
     turned it down.
   - **C. Reply again.** Not recommended: the tester has now raised it on two templates.
2. **Scope.**
   - **A (recommended). Every pricing row that leads with `All`**: layout 1 and layout 3, on every
     template. No frame on any template draws `All`, and the tester has raised it at layout 3
     (JP-070) and layout 1 (here); one rule for the row closes both. Layout 3's FEATURED seat
     reads `shown`, which at rest is every package, so the badge's rest seat does not move.
   - **B. Layout 1 under Lime, Grunge, Editorial and Pop** (the `TIERS_1` seat), what was filed.
     Retro's layout 1 and every layout 3 keep `All`, and JP-070's remainder stays a named diff.

**Fix (on 1A).** `repChips()` takes an option to leave `All` out, or the pricing call site drops
the head (the repertoire's chip row, which also calls `repChips`, keeps its `All`: CLAUDE.md
names it a literal sibling, and its frames draw it). `Pricing`'s `chip` starts at -1;
`active`'s clamp and `shown`'s gate read `active < 0` as "every package"; a press on the lit chip
sets -1. **The canvas arm moves too**: `active = s.live ? … : 0` becomes `: -1` at layouts 1 and
3, or the canvas lights the first tag, *Private Event*, which this option says is unlit. `vm.tierChips`' index arithmetic, anywhere that offsets by the `All` head (`- 1`, `i + 1`),
moves with it — the session greps `tierChips` before the edit. A row of one chip (one tagged
package) still is not drawn, as now. **Layout 2 reuses `chip`** to pick its big plan
(`:9980`–`9990`, `sel` clamped and pinned to 0 on the canvas at `:10043`–`10044`), so a -1 start
must clamp to 0 there, or layout 2's seat and digest move; its after-diff is 0.

**Expected after-diff** (1A): pricing `arch 0` × themes 0–4 (2A) or 1–4 (2B) × three widths × both
surfaces — the `All` chip's span removed, the row re-flowed (right-aligned at desktop, so the
remaining chips hold their right edge), no chip lit (the canvas lit `All` before). On 2A, pricing
`arch 2` × themes 0–4 × three widths × both surfaces as well, the capsule likewise. **30 + 30 = 60
files on 2A, 24 on 2B.** Pricing `arch 1` (no `All`), `arch 3`, the calendar's *Package ›* and
every other category: 0.

**Verify.** The published filter on cards 1 and 3 under every template in scope, 1440 / 768 / 390:
at rest every package and no lit chip; each chip filters to its packages and lights; a second press
restores every package; layout 3's FEATURED moves with `shown` as JP-048 says, and sits at rest
where it sat under `All`. An edited package list (`&cj=`) whose tags yield one chip draws no row.
The panel: no field moved, so no `reach.mjs` run is owed.

**Docs.** `notes/pricing.md:18`–`28` (rewritten: no `All`; the toggle), `README.md:343`–`344`, the
two row comments (`:9540`, `:10674`) and `data.js:1029`–`1034`; *reversed* pointers at
`qa-fixes.md` JP-089 decision 2A, `../grunge/retest-qa-fixes.md` JP-070's decision 2 (and its
A+ text, which this answers differently), `../grunge/layout-3-qa-fixes.md:2150`–`2153`, and
`../lime/layout-1.md`'s pricing bullet.

**Decided** (user, 2026-10-05; three questions, each the recommendation): **1A, 2A**, and **no
row at one tag**.
1. **The rest state: A.** `All` goes. At rest no chip is lit and every package shows. A press
   lights a chip and filters, and a press on the lit chip clears it. `chip` starts at -1, and the
   canvas pins -1.
2. **Scope: A.** Every pricing row that led with `All`: layout 1's chip row and layout 3's capsule,
   on all five templates, Retro included. That also settles JP-070's remainder.
3. **One tag: no row** (a third question, asked because the entry's "a row of one chip … still is
   not drawn, *as now*" did not hold). On HEAD, one tag between the packages makes `[All, tag]`,
   two chips, so the `> 1` gate draws *All · tag*. Without `All`, the same page gives one chip.
   The user kept the `> 1` gate, so that page now draws no row. A lone toggling chip was the
   alternative.

Asked over what the session found first:
- **Evidence re-checked at `92403bd`.** Every line was where the brief said, +11 after entry 4:
  `chip` at `EncoreSection.jsx:9372`, layout 1's `active` / `shown` at `:9396`–`9400`, its two rows
  at `:9581` and `:9812`, the empty-state comment at `:9993`, layout 2's `sel` at `:10081`, layout
  3's comment at `:10711`–`10717`, its `active` at `:10776` and its two capsules at `:11030` and
  `:11119`. `vm.tierChips` is at `EncoreBuilder.jsx:1140`, `repChips()` at `data.js:2633`, and the
  `TIERS_1` comment at `:1029`–`1034`.
- **Layout 2 needs no edit.** Its `sel` already reads `Math.max(0, Math.min(chip, …))`, so a -1
  start floors to 0. Its after-diff is 0 by construction.
- **`tierChips` has one producer and no index arithmetic.** It is only built at `:1140`, and
  nothing offsets by the head. The repertoire's `.slice(1)` calls (`EncoreBuilder.jsx:1267`,
  `:2752`) read `vm.repChips` and stay as they are.
- **Reproduced in the real app** (a scratch puppeteer script, deleted). Cards 1 and 3 under all
  five templates, published and opened, at 1440, 768, 390, 360 and 414. Every row leads with a lit
  `All` over all three packages. That is *All · Private Event · Club Night · Festival* on card 1
  under Lime, Grunge, Editorial and Pop, *All · Solo · Trio · Band* under Retro, and *All · Duo ·
  Trio · Band* on every card 3. Each chip filters (layout 1: one package per occasion; Retro:
  two each; layout 3: two each, FEATURED moving to the Wedding Set under Duo). No width scrolls
  sideways.
- **The harness was proven first.** A HEAD worktree on :5174 against a **fresh** tree server on
  :5175 (not the long-running :5173): every category × themes 0–4 × three widths gave **0 of 660**
  on each surface, with `localhost:517[0-9]` and the photo stamps normalised. No render was empty.
- **Expected after-diff** (named before the code, on 2A): pricing `arch 0` and `arch 2` × themes
  0–4 × three widths × both surfaces, **60 files**. The `All` span goes, the row re-flows, and no
  chip is lit. Pricing `arch 1` and `arch 3`, the repertoire, the calendar's *Package ›* and every
  other category: 0.

**Settled** (2026-10-05).
- **Code.**
  - `vm.tierChips` is `repChips(tierList).slice(1)` (`EncoreBuilder.jsx`). It slices at the call
    site rather than adding an option to `repChips()`, the repertoire sets' own `.slice(1)`
    idiom. The repertoire's row keeps its `All`. A package tagged "All" now gets no chip, since
    `repChips()` already skips that tag. The `REP_ALL` comment says so.
  - `Pricing`'s `chip` starts at -1, and `pressChip(i, active)` sets -1 on the lit chip, else `i`.
    The four filter sites take it: layout 1's `(s.limeTree || s.pop)` row and Retro's, and
    layout 3's two capsules. Layout 2's two pickers keep `setChip(i)`.
  - Layouts 1 and 3 have the same `active`:
    `s.live && s.tierChips.length > 1 ? Math.min(chip, …) : -1`. Their `shown` gate reads
    `active < 0`. **The `length > 1` test goes beyond the entry's Fix.** Without it, a republish
    from three tags down to one would clamp a live `chip` to 0. That would filter by the lone tag
    while its row is not drawn, so nothing on the page could clear it. This was reasoned, not
    driven: the published `&cj=` renders below start from rest.
  - The comments are rewritten: layout 1's clamp and both rows, the empty-state comments at both
    layouts ("every chip exists because…"), layout 2's "same clamp, floored at 0", and layout 3's
    copy note and clamp. In `data.js`, the `TIERS_1`, `repChips()` and `REP_ALL` comments.
- **Digest.** The tree against the HEAD worktree, every category, themes 0–4, three widths,
  canvas and `live=1`: **exactly the 60 named files** (30 of 660 a surface).
  - In each file, one `SPAN` row goes (the `All` chip), and the row's other chips shift.
  - The lit background moves off `All` and lands on no chip.
  - No root height changes in any file.
  - Layout 1's desktop row stays right-aligned, its last chip ending at **1194.1** as before.
    The narrow rows and layout 3's capsule are left-aligned and end 35–53 sooner.
  - Pricing `arch 1` and `arch 3`, the repertoire and every other category: 0.
  - A re-take of pricing and the repertoire after the comment-only `data.js` edits: 0 of 120
    against the after-label.
- **Verify.**
  - **The published filter, after** (the same script, on :5175). Cards 1 and 3 under all five
    templates, at 1440 / 768 / 390, with 360 and 414 at rest. At rest every package is on show and
    no chip is lit. Each chip lights and filters to the same packages as on HEAD. A second press on
    the lit chip clears the filter, and the three packages come back. Layout 3's FEATURED sits on
    the Festival Set at rest, where it sat under `All`. It moves to the Wedding Set under Duo and
    back on the clear. All three widths gave identical sequences (50 steps, 0 differing). No page
    scrolls sideways.
  - **`&cj=` package lists**, HEAD against the tree, pricing × themes 0–4 × three widths × both
    surfaces:
    - **One tag** (*Club Night* on two packages, none on the third): HEAD draws *All · Club Night*
      at layouts 1 and 3. The tree draws **no row**, which is decision 3.
    - **Two tags** (*Gala*, *Gala, Party*, *Party*): three chips become two.
    - In both lists, pricing `arch 1` and `arch 3` differ by 0.
  - **The panel**: no field moved, so no `reach.mjs` run is owed.
- **Docs.**
  - `notes/pricing.md` is rewritten: the row carries no `All`, its rest and toggle, the -1 start,
    the one-tag rule, and layout 2's floor. So is `README.md`'s pricing paragraph.
  - *Reversed* pointers are in:
    - `qa-fixes.md` JP-089, decision 2A and its Decided;
    - `../grunge/retest-qa-fixes.md` JP-070, its A+ text (*answered differently*) and its
      decision 2;
    - `../grunge/layout-3-qa-fixes.md`'s "The chips: by design";
    - `../lime/layout-1.md`, a new pricing bullet after the JP-089 one.
  - CLAUDE.md states no `All` rule for pricing, so it is unchanged.
- **For the designer note** (the sweep's): every pricing frame lights a chip (*Club Night*, *Duo*)
  over every card, so in the frame's picture the lit chip filters nothing. The page lights none at
  rest, because a lit chip there would filter.
- **The reply line** (the sweep's shape):
  - **JP-089 — fixed, on every template.** The pricing chips no longer start with an extra
    *All*. Layout 1 reads *Private Event · Club Night · Festival* (Retro: *Solo · Trio · Band*),
    and layout 3's capsule reads *Duo · Trio · Band*, which also closes JP-070's remainder. At
    rest no chip is lit and every package shows. A chip filters, and pressing it again shows
    every package. The design's lit *Club Night* is not copied, because on the live page a lit
    chip would hide the other two packages.

---

## JP-098 (rest) — 768: six tiles, no *View list ✕*

**Runs only on entry 1's B, once the BA has answered.** If they have not answered by this session,
it is skipped: the status row reads *waits on the BA*, and the sweep's reply says so with the
proposal attached.

**Reverses** `layout-2-qa-fixes.md` JP-098 decisions 1A (the six tiles) and 3A (the controls
dropped), and behind them Retro's squeeze and dead-controls calls (`../retro/layout-2.md:1065`–
`1087`; `notes/gallery.md:45`–`51`; the banner bullets at `EncoreSection.jsx:15041`–`15064`).

**Evidence.** Entry 1's *What the page draws*, plus: the 768 wrapper `:15380` (`col(u(14))` over
`head` and `grid`), the grid's tablet sizing `:15173`, the tile's click and the reset
`:15186`–`15192`, the repertoire's reveal state `:11995`–`12001` and link `:13362`–`13368`.

**Fix (on the proposal as sent).** At tablet, under `s.live` and on the canvas alike, the band
draws the frame's four: columns `[123, 215]` and `[194, 242]` at those heights in the 358 band, the
second column clipped at its foot. `View list` (live-only `onClick`, inert span on the canvas)
switches the band to the six tiles at today's proportions, the band growing to hold them (or
scrolling: the BA's answer decides). ✕ calls the same reset as the second click (`setPick(-1)`),
drawn per the BA's answer. The row's three items are `galRailLabel`, then the two controls, so
an emptied *Gallery label* keeps the controls. Whether *View list* and ✕ are fields (their labels)
follows JP-071's rule: they are controls, so they stay literals unless the user says otherwise.

**Expected after-diff:** gallery `arch 1` × tablet × themes 0–4 × both surfaces, **10 files**: the
head row's two spans inserted, the band's tiles (two removed, four re-sized). 1440 and 390: 0.

**Verify.** 768 on both surfaces: four tiles at rest, the fourth cut; live, *View list* shows all
six and each picks; ✕ resets the hero; the canvas's controls do nothing and select nothing.
`page-check.mjs Editorial 1` for the controls.

**Docs.** `notes/gallery.md:38`–`51`, the banner bullets, CLAUDE.md's `s.live` list (two more
controls read it), *reversed* pointers at the JP-098 Decided and Retro's two calls.

**Decided** — *(the session fills this in.)*

**Settled** — *(the session fills this in, with the reply line.)*

---

## End-of-pass sweep

1. Full digest against a `main` worktree on :5174 (port and `?t=` normalised), all categories ×
   themes 0–4 × three widths × canvas and `live=1`, the footer's `page=2` render included. Every
   diff must be one a Settled above names, and every named file must differ.
2. The repro sets on the final tree, read off the DOM: JP-092's and JP-101's four long names at
   360 / 390 / 414 and 768 (document `scrollWidth`, the rule's width, the name against the pill),
   JP-091's desktop rows unchanged; JP-099's bar at 360 / 390 / 414; JP-089's filter at rest, each
   chip and the clear; JP-098's controls if built.
3. `reach.mjs` only if an `in` moved (none is expected).
4. Walk Editorial cards 1 and 2 in the real app and the published tab at 1440 / 768 / 390 — the
   tester's steps for each ticket — then Lime's, Grunge's, Pop's and Retro's cards 1 and 2 once,
   then `page-check.mjs Editorial 0,1`.
5. `npm run build:standalone`, then `cp source/dist-standalone/index.html index.html`, in its own
   commit. Then a two-build digest (`build-digest.mjs`; `CARD` is 0-based, so `CARD=0` and
   `CARD=1` for cards 1 and 2), whose diff should be only the named rows.
6. `plans/README.md`'s Editorial row, and one reply line per ticket for QA (fixed / by design /
   needs the PO / needs the BA), headed by the retest-against-the-stamp line
   (`curl -sI https://siniiitsa.github.io/js-plus-prototype-2/`; the triage read
   `Mon, 05 Oct 2026 12:57:01 GMT`, 9,819,684 bytes; the tester's build was
   `Fri, 02 Oct 2026 22:25:49 GMT`). Gather what is worth telling the designer — the 390 bar if
   JP-099 drops the sleeve, the lit chip that filters nothing (JP-089), the 768 gallery's 1px
   tiles if they stay — into a note at the plan's foot.

**Seen at triage, not filed** (the probe's by-catch; each needs a reading on its own before it is
anyone's ticket):
- **Pop's layout-2 and layout-3 headers at 390 push the Book pill past the page with a long
  name**: layout 2 (fitted, `../pop/layout-2.md`) with *Featherstonehaugh* to 410; layout 3 (a
  placeholder card while `pop-layout-3` runs) with *Florence and the Machine* to 434 and
  *Featherstonehaugh* to 480. Layout 3's is for `../pop/layout-3.md`'s header session; layout 2's
  is Retro's named layout-2 item on another template, and a candidate for the sweep's
  tickets-list note.
- The probe's section `scrollWidth` read 783 for Pop's layout-2 header at 768 with every name, the
  seed included. `scrollWidth` counts clipped overflow, so this may be a clipped decoration and
  not a scroll; the sweep reads the published document's `scrollWidth` at 768 under Pop once.

**Settled** (2026-10-05, all six steps; the push, the PR, the merge and the build stamp are the
user's).
- **Entry 6 did not run.** The BA has not answered entry 1's proposal (asked at the session's
  start). Its status row stays *waits on the BA*, and its reply below is entry 1's, with the
  proposal attached.
- **1. Full digest against `main`: 35 of 660 on each surface** (70 of 1,320), exactly the named
  files.
  - **The harness.** A scratchpad worktree at `main` (`bb142de`, PR #48), its `node_modules` an
    APFS clone with `.vite` removed, served on :5174, against a **fresh** tree server on :5175
    (`npx vite --port 5175`), not the long-running :5173. It ran every category × themes 0–4 ×
    three widths × canvas and `live=1`, the footer's `page=2` render included, with
    `localhost:517[0-9]` and the photo stamps normalised. No file was a blank render, and no
    Editorial file showed 0.1px shaping noise, so nothing was rerun.
  - **The reconciliation, per surface:**

    | Entry | Named | Differ |
    |---|---|---|
    | JP-092 (rest), JP-101 | 0 | 0 |
    | JP-099 | 5: media `arch 1` × mobile × themes 0–4 | the same 5 |
    | JP-089 (rest) | 30: pricing `arch 0` and `arch 2` × themes 0–4 × three widths | the same 30 |

    The canvas and `live=1` lists are the same files. Nothing else differs.
  - **The long-name controls** were re-taken against `main`: header and footer, themes 0–4, three
    widths, both surfaces.
    - ***Featherstonehaugh*: 18 of 120 on each surface.**
      - The footer's 8 match entry 2's 16 across both surfaces: `arch 0` and `page=2` × mobile ×
        themes 0, 1, 3 and 4.
      - The header's 10 match entry 3's: mobile `arch 0` and `4` × themes 1–4, and `arch 3` × 3
        and 4.
    - ***Florence and the Machine*: 16 of 120.**
      - The header's 10 are the same files.
      - The footer moves only under themes 0, 3 and 4 (6). Entry 2 did not count *Florence*. The
        walk's rule widths agree: at 390 Lime's and Grunge's rule stays 150, while Retro's is 84.9,
        Editorial's 140.3 and Pop's 117.7.
    - Every desktop and 768 render is 0 with both names. So JP-091's desktop rows are unchanged.
- **2. The repro sets on the final tree**, read off the DOM. A scratch puppeteer walk in
  `source/scripts/` (deleted) ran on :5175, one template per process under `perl -e 'alarm …'`, and
  wrote rows to a JSONL sink.
  - **What it drove:**
    - each card through the picker and the setup modal, then Publish and Open;
    - the four names set through `st` and republished;
    - every width read in the published tab.
  - **Coverage:** cards 1, 2 and 4 under all five templates at 360 / 390 / 414 / 768, which is 240
    readings. Card 4 is beyond the step, because JP-101 reaches it. Pricing on cards 1 and 3 took
    230 more. No window logged an error.
  - **JP-092** (card 2).
    - The rule is 150 with every seed, and with every name at 768.
    - With *Featherstonehaugh* at 360 / 390 / 414 it reads entry 2's widths: Editorial 75 / 105 /
      105, Lime 96.2 / 126.2 / 126.2, Pop 43.9 / 73.9 / 73.9, Retro 30 / 38.4 / 38.4, and Grunge
      150.
    - No rule runs under 30 or past the page.
  - **JP-101** (cards 1 and 4, Lime, Grunge, Editorial and Pop): **every name ends before the
    pill.** A fitted name ends 1.0px or more short of it. The one tighter row is a name the fit
    leaves alone: Lime's layout-4 *Florence* at 360 fits on one line at its own 14 and ends 0.2
    short.
    - Editorial, card 1, at 390: *Kai Mercer* is 25 on one line, *Florence* 20.94 on two,
      *Featherstonehaugh* 13.8 on two, and *Supercalifragilistic* 13.67 on one.
    - At 360 the seed takes two lines at 25, and *Featherstonehaugh* sets at 10.71.
    - Pop's layout-4 *Featherstonehaugh* is 8.28 at 360 and 10.83 at 390.
    - All of these are entry 3's table.
    - Retro's cards 1 and 4 still run *Featherstonehaugh* under the pill at 360, by 9.2 and 16.6.
      That is named and unchanged.
  - **JP-099** (card 2, all five templates).
    - ♡ ↓ ⋯ sit inside the bar at 360, 390 and 414 (16 from its right edge; Retro 22), and the
      bar holds no `img`.
    - The title box is 114.4 at 390 and 414 and 84.4 at 360. Retro's is 97.5 and 67.5.
    - *Late Lights* is whole at 390 under Lime, Grunge and Retro, and cut under Editorial and Pop
      (as before). At 360 it is cut everywhere, Grunge's being the cut entry 4 named.
    - At 768 every bar keeps its sleeve and its glyphs.
  - **JP-089** (cards 1 and 3, all five templates, at 1440 / 768 / 390, and 360 / 414 at rest).
    - **No row carries `All`.** At rest every chip has the same style, none lit, and all three
      packages show.
    - Each chip lights alone and filters, and a second press on it clears the filter.
      - Layout 1 shows one package per chip; Retro's shows two.
      - Layout 3 shows two. FEATURED sits on the Festival Set at rest, moves to the Wedding Set
        under *Duo*, and comes back on the clear.
    - All three widths gave identical sequences, and no page scrolled sideways.
    - The pricing root was found by a `data-probe` attribute set on the first read.
  - **The page scrolls only where an entry named it**, the same on `main`:
    - Retro's layout-2 hero: 389 at 360 with *Florence*, and 426 / 426 / 438 with
      *Featherstonehaugh*.
    - Editorial's layout-2 form credit: 362 at 360 with *Featherstonehaugh*.
    - Pop's layout-1 gallery: 378 at 360 with *Florence*, and 421 / 421 / 433 with
      *Featherstonehaugh*.
  - **Pop's layout-2 page at 768 is 768 wide with every name**, the seed included. So the triage's
    783 (*Seen at triage* above) was the section's clipped overflow, not a scroll.
- **3. Reach: none owed.** `data.js` changed in comments only, and no field's `in` moved.
- **4. The real app.**
  - **`page-check.mjs` on :5175:** `Editorial 0,1` and `Editorial 1,0` (each card given the full
    walk), then `Lime`, `Grunge`, `Pop` and `Retro` `0,1`. No window logged an error or a warning.
    - Every nav link, every in-page anchor and the nine footer links scroll to their sections.
    - The audio plays, and the form refuses an empty submit and then composes its mailto.
    - The resize walk logs no warning, `overflow390` is 0, and the burger opens: 1 → 11 links on
      card 1, 2 → 6 on card 2.
    - Every card publishes its eleven sections.
  - **The probe's pricing entries** read *Private Event · Club Night · Festival* on card 1 (Retro
    *Solo · Trio · Band*), each `true`, with no `All`.
  - **Card 2's control probe is the same, entry for entry, as `page-check.mjs Editorial 1` against
    `main`** (taken on :5174 before teardown). Its `false` entries are the selected tile or chip and
    the SVG nodes.
  - **How the tester's steps were covered.** The Title went in through `st`, not the panel's
    NameInput (entry 3's walk typed it). The canvas's three tabs were read by item 5's two-build
    digest, not by a tab walk. No panel check is owed, since no field moved.
- **5. `index.html`** refreshed in `71bfc93` from `npm run build:standalone`: 9,820,306 bytes, up
  from 9,819,684.
  - **The two-build digest** (`build-digest.mjs`, `CARD=0` and `CARD=1`, every theme, from
    `127.0.0.1:8931`). It took `index.html?v=old` before the `cp`, then
    `source/dist-standalone/index.html`. `modal.txt` is identical.
  - **Card 1:** the pricing chip row alone, under all five templates.
    - Desktop moves 3 rows: the row `DIV` narrows (Editorial 362.5 → 313.8) and the `All` span
      goes. The row stays right-aligned.
    - Tablet and Mobile move 9 rows: the row re-flows from its left edge, the `All` span goes, and
      no chip is lit.
  - **Card 2:** Mobile alone, 14 rows a template, the 390 bar.
    - The inner pill and the sleeve's span and `img` go.
    - The title column narrows to 114.4, and the glyph row and its three spans come in.
    - Desktop and Tablet: 0.
  - **The 1088 Desktop canvas:** only JP-089's 3 rows on card 1 move there. JP-092's rule and
    JP-101's fit move nothing at that width, as their Settleds expected at the harness's 1180: the
    seed's rule fits, and the name fit acts at `s.mob` alone.
  - No section below a changed row moves, under any theme.
- **6.** `plans/README.md`'s Editorial *Retest QA fixes* row is updated. The replies are below, and
  the note for the designer is at the plan's foot.
  - At the sweep the deployed build still read `Mon, 05 Oct 2026 12:57:01 GMT`, 9,819,684 bytes.
    That is `main`'s root `index.html`, which carries none of this batch.
- **Named, not fixed: found by the entries and the walk, outside every entry.** Each is the same on
  `main`, and each is left for its own ticket:
  - **The layout-1 gallery scrolls the page with a long name** (entry 3's Settled). Under Pop:
    *Florence* at 360 (378), and *Featherstonehaugh* at 360–414 (421 / 433), re-read by the walk.
    Under Editorial, Lime and Grunge: *…Windsor* (413), not re-read. It is the only page scroll on
    card 1.
  - **The burger panel's wordmark pushes its ✕ off the panel** (entry 3's Settled; not re-read).
    `NavMenu`'s `Wordmark` has no fit and is `nowrap` at the narrow ramp.
    - Editorial with *Florence* at 360 / 390, and with *Featherstonehaugh* at every width.
    - Grunge and Pop with *Featherstonehaugh* at 360.
  - **The entries' own named items stand** (and are named in their replies):
    - Retro's layout-2 hero, and its 360 nav with *Featherstonehaugh*;
    - Editorial's layout-3 nav;
    - Editorial's layout-2 nav Book pill and form credit at 360;
    - Editorial at 768 with *…Windsor*.
  - **Seen at triage** (above):
    - Pop's layout-2 and layout-3 headers pushing the Book pill past the 390 page with a long name.
      This is not re-read, and is left as the triage recorded it. Layout 3's is for
      `../pop/layout-3.md`'s header session, and layout 2's is a tickets-list candidate.
    - The 768 reading is now taken (item 2): no scroll.
- **Torn down:**
  - :5174, :5175 and :8931;
  - the `main` worktree (`git worktree remove --force`);
  - the scratch walk in `source/scripts/`.

  :5173 is the user's and still runs.

**Replies to QA, one line per ticket.** **Retest against the Pages build whose `last-modified` is
later than `Mon, 05 Oct 2026 12:57:01 GMT`** (`curl -sI
https://siniiitsa.github.io/js-plus-prototype-2/`). The reports were filed against `Fri, 02 Oct
2026 22:25:49 GMT`. The build deployed at the sweep (9,819,684 bytes) does not carry these fixes
either. An older tab or cached build still shows every one of them.
- **JP-085 — planned for a later build; the licence stays with the PO.** This build is unchanged:
  the headings are still Noto Serif Display, and nothing named Fisterra is loaded. No licence
  covering the artists' public sites has been bought, and the PO still has to ask TipoType whether
  one web licence covers every site the builder publishes. In the meantime, a later build replaces
  Noto with a closer free face. It is chosen by rendering candidates side by side against the
  design's *KAI MERCER* and a section heading. The test is the shape the report points at: the
  angled serifs, the tails on R and Q, the narrow capitals. Weight alone was matched already. It
  will still not be Fisterra Fora. If the PO buys a licence, the real face replaces it.
- **JP-089 — fixed, on every template.** The pricing chips no longer start with an extra *All*.
  Layout 1 reads *Private Event · Club Night · Festival* (Retro: *Solo · Trio · Band*), and layout
  3's capsule reads *Duo · Trio · Band*, which also closes JP-070's remainder. At rest no chip is
  lit and every package shows. A chip filters, and pressing it again shows every package. The
  design's lit *Club Night* is not copied, because on the live page a lit chip would hide the other
  two packages.
- **JP-092 — fixed.** At 390 a long name no longer makes the page scroll sideways. The footer's
  decorative line beside the name now gets shorter to make room for it, down to 30px. A name too
  long even for that goes onto two lines, breaking between words. With *Maximilian
  Featherstonehaugh* the line is about 105px under Editorial at 390 and 414, and 75px at 360. A
  name that fits, *Kai Mercer* included, keeps the design's 150px line. The same fix covers Retro,
  Lime and Pop. Under Pop the line used to be cut off at the page's edge rather than scroll it.
  Grunge's footer already fitted. *Not changed, logged separately:* at 360, the Enquiry Form's
  credit runs 2px past the page with that name, and the menu's Book Now pill runs 1px past.
  Retro's Feature spread hero still overflows with a long name.
- **JP-098 — with the BA, with a proposal.** This build is unchanged at tablet width: six
  thumbnails and no *View list* or ✕. We have sent the BA this proposal:
  - ***View list* reveals the rest.** At rest the tablet gallery shows the design's four
    thumbnails, the fourth cut at the band's foot. *View list* opens the band to every thumbnail, so
    no photo is out of reach.
  - **✕ clears the pick.** Clicking a thumbnail already puts its photo in the large frame, and
    clicking it again puts the featured photo back. ✕ does the same from the row.
  - **Neither is drawn at desktop or mobile**, since those designs have no such row.

  Whether *View list* folds back, and whether ✕ shows while nothing is picked, are for the BA to
  decide. If they confirm or amend the proposal, it is built as described. Until then the six
  thumbnails stay, so all seven photos remain reachable on a tablet.
- **JP-099 — fixed, on every template.** At 390 (and 360 and 414) the Media Player's bar now shows
  ♡ ↓ ⋯, as the design does. To make room, the cover thumbnail in the bar goes at that width. The
  design's thumbnail is only a sliver there anyway, and this way the song's name stays readable.
  The running time stays hidden, as in the design. The icons do nothing at any width, as before. A
  long name such as *Late Lights* under Editorial still ends in "…" at 390, as it did before.
- **JP-101 — fixed.** At 390 a long name in the menu bar no longer runs under BOOK NOW. It keeps
  the design's size while it fits on one line before the button; otherwise it wraps between words
  onto two balanced lines and the bar grows to hold them. *Florence and the Machine* reads FLORENCE
  AND / THE MACHINE at about 21px under Editorial. A longer name is set smaller so its two lines
  still fit, and a name too long even for that takes a third line at 12px. The same holds at 360
  and 414, on Lime, Grunge and Pop, and on the Stacked header (layout 4), which had the same
  fault. At 360 even the default *Kai Mercer* ran under the button under Editorial; it now takes
  two lines. The name's size there is 25px under Editorial; 16px is Pop's. *Not changed, logged
  separately:* Editorial's Inset Hero header (layout 3) and Retro's at 360 still run a long name
  under the button. In the open menu, a long name pushes the ✕ past the screen's edge under
  Editorial. Under Pop a long name makes the Gallery scroll the page sideways (*Florence and the
  Machine* at 360, *Maximilian Featherstonehaugh* at every width).

## Notes for the designer

*(What this batch found worth telling the designer, gathered by the sweep into one note to forward,
in the earlier batches' shape. Each is shipped as described. [`layout-1.md`](./layout-1.md)'s and
[`layout-2.md`](./layout-2.md)'s notes, and [`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md)'s
three, still stand; the first and third below update two of those.)*

1. **The 390 player bar now drops the cover for ♡ ↓ ⋯** (JP-099, on every template; it updates
   `layout-2-qa-fixes.md`'s note 2, which carries the *Reversed* line). The master
   (`I986:15683;879:10509`) seats the three icons by squeezing the sleeve, the title and the clock
   into 22.9px, so it names no track. The page keeps the title instead. At 390 it draws the
   transport, the title box (114.4px; Retro's 97.5) and the icons, with no sleeve and no clock. The
   icons' gap is 11 at 390 in the Lime-tree bar, 1px under the frame's 12, so that Editorial's
   seeded *SLOW BURN* stays whole. The icons do nothing at any width. If the designer wants the
   sleeve back at 390, the bar needs a layout of its own there, such as the icons on a second line.
2. **Every pricing frame lights a chip that filters nothing** (JP-089). Layout 1's frames light
   *Club Night* and layout 3's light *Duo*, each over all three cards. On the live page a lit chip
   is the filter, so lighting one at rest would hide the other packages. The page lights none at
   rest and drops the frames' *All*. A press lights a chip and filters, and a second press clears
   it. A page whose packages carry one tag between them draws no row.
3. **The 768 gallery's last tile in each column is still 1px tall** (JP-098;
   `layout-2-qa-fixes.md`'s note 3). The page still draws six tiles, and no *View list* or ✕, while
   the BA answers the proposal sent on 2026-10-05 (*JP-098 (View list ✕)* above). If they confirm
   it, the band draws the frame's four at rest, the fourth cut at its foot, and *View list* opens
   it to all six.
