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
| 1 | JP-085 · JP-098 (*View list ✕*) | Noto, not Fisterra Fora · what *View list ✕* does | `qa-fixes.md` JP-085 (A); `layout-2-qa-fixes.md` JP-098 decision 3 (A) | **Both need an answer from outside the code**: a web licence (the PO) and the controls' meaning (the BA) | — (decisions) | **user** | open |
| 2 | JP-092 (rest) | 390: the footer's rule scrolls the page with a long name | `layout-2-qa-fixes.md` JP-092 *Named, not fixed* (the footer's rule) and `qa-fixes.md` JP-086's footer item | **Confirmed, shared**: the rule is `flex: 'none'` in both footer trees; it never yields | S | light | open |
| 3 | JP-101 | 390: a long name in the nav runs under BOOK NOW | `qa-fixes.md` JP-086 *Named, not fixed* (`:806`–`809`) and JP-091's scope (desktop only) | **Confirmed, shared**: the narrow wordmark is `nowrap` with no fit under Lime, Grunge, Editorial and Pop | S–M | **user** | open |
| 4 | JP-099 | 390 player: no ♡ ↓ ⋯ | `layout-2-qa-fixes.md` JP-099 (A, a reply) | **Recorded call, refused twice**: Retro's 390 override, every template | S | **user** | open |
| 5 | JP-089 (rest) | The extra `All` chip | `qa-fixes.md` JP-089 decision 2A ("the `All` chip stays"); `notes/pricing.md`'s "intended diff" | **Recorded call**: `repChips()` always leads with `All` | S–M | **user** | open |
| 6 | JP-098 (rest) | 768 gallery: six tiles, no *View list ✕* | `layout-2-qa-fixes.md` JP-098 decisions 1A and 3A | **Waits on entry 1**: code only if the BA's answer asks for it | S–M (or none) | entry 1's | open |
| 7 | — | End-of-pass sweep | — | — | S | — | open |

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

**Decided** — *(the session fills this in.)*

**Settled** — *(the session fills this in: the reply lines, in the sweep's shape, opening on who
holds the next step, since a reply that reads as closed is refused.)*

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

**Decided** — *(the session fills this in.)*

**Settled** — *(the session fills this in, with the reply line.)*

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

**Decided** — *(the session fills this in.)*

**Settled** — *(the session fills this in, with the reply line.)*

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

**Decided** — *(the session fills this in.)*

**Settled** — *(the session fills this in, with the reply line.)*

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

**Decided** — *(the session fills this in.)*

**Settled** — *(the session fills this in, with the reply line.)*

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
