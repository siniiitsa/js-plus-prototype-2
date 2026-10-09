# Pop QA fixes — bug-by-bug plan

Working checklist for the tester's first batch against the **Pop template, layout 1** (card 1 of the
setup modal, *Hero*): JP-111 … JP-120. It works like
[`../editorial/qa-fixes.md`](../editorial/qa-fixes.md), Editorial's first batch against its own
layout 1: **one entry per session, with context cleared between sessions**, and each session writes
what it settled back into this file.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then *How each
session runs* in [`../editorial/layout-4-qa-fixes.md`](../editorial/layout-4-qa-fixes.md) and the
files it points at: the recipe in [`../grunge/layout-3-qa-fixes.md`](../grunge/layout-3-qa-fixes.md),
the deltas in [`../editorial/layout-2-qa-fixes.md`](../editorial/layout-2-qa-fixes.md) and
[`../editorial/layout-3-qa-fixes.md`](../editorial/layout-3-qa-fixes.md), and *Verification harness*
in [`../retro/qa-fixes.md`](../retro/qa-fixes.md). Then read the memory notes
`verifying-the-published-tab` and `browser-tool-choice`, plus `figma-frame-reading` for any entry
that reads a frame. Then read the section's `notes/` file, which each entry names, and **the call
each ticket reverses**, read whole. [`layout-1.md`](./layout-1.md) holds the Figma node ids of every
Pop layout-1 frame (*The Figma source* and *The sections*, `:111`–`:187`; the page is `964:58623` /
`986:52418` / `986:52431`), and its *Settled in section N* bullets are the fits each entry moves.

The shapes the entries copy:
- **JP-120 (form)** in `notes/form.md:82` (merged in PR #53, 2026-10-07): a 390 credit row that
  yields to a long name, in both bodies. This is the earlier ticket with the same number, below.
  It is JP-113's shape.
- **JP-090** in [`../editorial/qa-fixes.md`](../editorial/qa-fixes.md), after JP-071 in
  [`../grunge/retest-qa-fixes.md`](../grunge/retest-qa-fixes.md): a frame label becomes a seeded,
  uncased field, dropped when emptied, with `map.kicker` extended to a layout it did not reach. This
  is JP-120 (gallery)'s shape.
- **JP-091** in [`../editorial/qa-fixes.md`](../editorial/qa-fixes.md): measure the capsule first,
  then ask; the name gives way before the links. JP-114 · JP-115 reopen its rule under Pop.
- **JP-094** in [`../editorial/layout-2-qa-fixes.md`](../editorial/layout-2-qa-fixes.md) and
  **JP-103** in [`../editorial/layout-3-qa-fixes.md`](../editorial/layout-3-qa-fixes.md): each
  section pads its frames' own top and foot through a per-layout arm in `vm.pad`. This is JP-116's
  shape.
- **JP-085** in [`../editorial/qa-fixes.md`](../editorial/qa-fixes.md) and **JP-056** in
  [`../grunge/qa-fixes.md`](../grunge/qa-fixes.md): a display face the design names but nobody can
  ship. Both replies were refused and re-filed. That is JP-111's warning.

Branch: **`pop-qa-fixes`, forked from `main`** (`a35a92c`, after PR #55). One commit per entry
(`Fix JP-118: …`). A decision-only entry commits the plan alone.

**The ticket number JP-120 is taken twice.** The tester's JP-120 here (the gallery's literals) reuses
the number of an earlier, merged ticket: *the layout-2 form's 390 credit row yields to a long name*
(`1fdf5d5`, branch `fix-jp-120`, PR #53, `notes/form.md:82`). Until the tester renumbers it, this
plan, its commits and every doc it touches write **JP-120 (gallery)** for the new ticket and
**JP-120 (form)** for the old one. The sweep's reply asks for a fresh number.

**Build and reproduction.** None of the reports names a build. At triage (2026-10-08) the deployed
Pages build read `Thu, 08 Oct 2026 12:09:04 GMT`, 9,908,045 bytes. That is byte-identical in size to
`main`'s root `index.html` (`5056eaf`, the Pop layout-4 refresh), so the tickets were filed against
PR #55's build, and every cause is in HEAD's code (below).

**Nothing was reproduced or measured in the app at triage.** Every number below is read off the
code, the plans or the frames, and the session re-takes it. The frames were read once, read-only
(`use_figma`, 2026-10-08), for four facts: the footers' copyright, the form's placeholder fill, the
map heading's and scribble's ink, and the gallery's text nodes. Those are quoted where they are
used.

**Pop is in `s.limeTree` since the layout-4 sweep folded the pair** (`0a5fe0b`). So every Lime
layout-1 block is Pop's too, except the media player: its block steps Pop out (`&& !s.pop`) and Pop
dresses Retro's body instead. A seam here is therefore one of three kinds:
- a `pop &&` arm inside a shared block, where Pop moves and themes 1–3 are controls;
- the shared `s.limeTree` block, where themes 1–4 move and Retro is the control;
- both bodies (the `s.limeTree` block and Retro's), where every template moves.

`digest.mjs`'s default theme list is `0,2,3,4`, which **skips Lime**, so always pass the list
explicitly.

| ID | Where the cause sits | Templates | Digest themes |
|---|---|---|---|
| JP-111 | `THEMES[4]`'s `display` / `label`, Titan One (layout-1.md decision 1, user call, 2026-10-02) | Pop alone | — (decision) |
| JP-112 | the repertoire's `s.limeTree` layout-1 block, its `pop &&` sticker layer: the heart is seated off the content's foot, which has no pager under the seeded twelve songs (a recorded fit note) | Pop alone, desktop | 0–4 |
| JP-113 | the gallery's layout-1 head row, **both bodies**: the credit is `nowrap`, and the `s.limeTree` row does not wrap (named in Editorial's retest sweep) | every template | 0–4, plus `&name=` |
| JP-114 · JP-115 | `NavBar`'s desktop `s.limeTree` fit (JP-091) under Pop: nine Titan links at the 12px floor leave the name about 77px, and Pop's two-line cap (18.45) sits above its own size (16.4) | Pop (probe Lime, Grunge and Editorial with the same names) | 0–4, plus `&name=` |
| JP-116 | `vm.pad` has no layout-1 arm, so every section pads `padY`; the fit recorded each diff as inherited | Pop (the twins' layout-1 frames decide the scope) | 0–4 |
| JP-117 | the map's `s.limeTree` layout-1 block, its `pop &&` scribble anchor (a recorded fit call: "not re-anchored") | Pop alone, desktop | 0–4 |
| JP-118 | `copyrightOf()` in `data.js`, which every footer reads; **every footer frame types a capital C** | every template | 0–4 (and `page=2`) |
| JP-119 | the form's `s.limeTree` layout-1 block: Pop's canvas draws the frame's 80% placeholder, the live box keeps `::placeholder`'s .45 (a recorded accepted diff) | Pop alone, published | 0–4 `live=1` |
| JP-120 (gallery) | four literals in gallery layout 1, **both bodies**; `railLabel` is `in: [1]` | every template | 0–4 |

## The report (translated)

> **JP-111 — Pop: the display face is Titan One, not Chunko.** The design's display face is Chunko
> Bold Demo; the build sets Titan One everywhere: the hero name, the section heads, the nav, the
> buttons. It affects the whole template. Steps: Pop → Hero → Publish → Open at 1440, compared with
> `964-58623`. Expected: `font-family: var(--font-display, "Chunko Bold Demo")`, read in Dev Mode,
> mode Pop. Actual: the theme table says `display: 'Titan One'`. The page mentions "Chunko" zero
> times; the loaded fonts are Titan One and others. Scope: checked through the theme table and
> `document.fonts`, on the published page at 1440. The claim about every section rests on all of
> them taking the face from the theme table. Falsifying check: is it a deliberate substitution? The
> theme names Titan One outright, so the difference is real. What replaces the demo face is the BA's
> call. Related: JP-085 (Editorial), JP-056 (Grunge).
>
> **JP-112 — Repertoire layout 1, desktop: the heart covers the last row.** The teal heart covers
> song 12's artist (· AMY WINEHOUSE), because it stands at the section's bottom right and there is no
> pager. Steps: Pop → Hero with the default 12 songs → Publish → Open at 1440 → scroll to the end of
> the Repertoire. Expected: as designed, the heart in the pager's row, beside the song rows. Actual:
> the heart lies over row 12 and the artist cannot be read. This is the default state. Scope: the
> published page at 1440. Tablet is not affected (no heart in the design or the build). On mobile the
> heart runs onto the → button, as in the design. Falsifying check: with a 13th song the pager
> appears and the heart stands in its row, with no overlap. So the bug appears only when there is no
> pager (≤ 12 songs, which is the default).
>
> **JP-113 — mobile 390: a long name in the Gallery runs off the screen.** The label over the photo
> (NAME / GALLERY) does not wrap, and the page scrolls sideways by 30px. Steps: Title *Maximilian
> Featherstonehaugh* → Publish → Open at 390 → the Media / Gallery section. Expected: the label fits
> the screen's width, as KAI MERCER / GALLERY does in `986-52431`. Actual: the span runs x 164–420 at
> a width of 390, `scrollWidth` 420; only MAXIMILIAN FEATHERSTONEHA and GAL are visible. Scope: the
> published page at 390, `clientWidth` 390 confirmed. Falsifying check: with *Kai Mercer* and with
> *Florence and the Machine*, `scrollWidth` equals 390; at 768 and 1440 the long name does not
> overflow. So it happens only with a long word without spaces, on mobile. Related: JP-092, JP-102,
> JP-109 (the long-name family).
>
> **JP-114** — at 1440 the logo KAI MERCER, the default name, wraps onto two lines, where the design
> has one. The cause is `max-width: 77px` on the logo's text, apparently a consequence of JP-091's
> fix.
>
> **JP-115** — at 1440 with a long name (*Florence and the Machine*, *Maximilian…*) the header's nav
> wraps, and REVIEWS drops to a second row. In Editorial this is JP-091's family, and it was fixed
> there.
>
> **JP-116** — the vertical gaps between sections do not match the design. In the build every
> section pads 80 / 80. The differences at 1440: Bio → Top Tracks +82 px; Top Tracks → Media +86 px;
> Media → Repertoire +42 px; the footer's top +41 px; Events Map → Pricing −55 px; Repertoire → Shows
> −28 px. At tablet the difference reaches +50 px. There, too, the Testimonials arrows stand 30px
> from the edge, where the design has 60.
>
> **JP-117** — the scribble under MANCHESTER (Events Map, desktop) is drawn under the word, where
> the design's crosses the lower half of the letters.
>
> **JP-118** — the footer's copyright reads *C 2026 Kai Mercer*, the letter C instead of ©. The
> *Small print* default is `` `C 2026 ${name}` `` and reaches every template.
>
> **JP-119** — the Enquiry Form's placeholders are white at 45% on pink, a contrast of ≈ 1.7–1.8 : 1;
> the design's is ≈ 3 : 1. The fields have labels above them, so this is Low.
>
> **JP-120 (gallery)** — Gallery layout 1 prints texts with no field to edit them: the MEDIA kicker,
> BACK TO BEGINNING and two GALLERYs. The *Gallery label* field is marked "Not shown in this layout".
> JP-090's family.

The tester's section names are the nav's: *Top Tracks* is the media player, *Media* the gallery,
*Shows* the events map.

Screenshots (the tester's):
- `964-58623` beside the published 1440: the Chunko and Titan heads; the logo on one line and on
  two; the nav on one row and, with *Florence and the Machine*, REVIEWS on a second.
- The repertoire's foot: the heart in the frame's pager row, and over the build's row 12.
- `986-52431` beside the published 390 with *Maximilian Featherstonehaugh*: the credit's box past
  the page, and the page's scrollbar.
- Three seams at 1440 boxed in the frame and the build: Bio → Top Tracks, Top Tracks → Media, and
  the footer's top.
- MANCHESTER's scribble across the word and under it.
- One enquiry box in each: the frame's 3.0 : 1 and the build's 1.8 : 1.
- The 1440 gallery with its four literals boxed, beside the panel's *Gallery label* "Not shown in
  this layout".

## Status

| Order | ID | Report (short) | Verdict | Size | Decision | Status |
|---|---|---|---|---|---|---|
| 1 | JP-111 · JP-117 · JP-118 · JP-119 | the face · the scribble · © · the placeholders | four calls; no code | — (decisions) | **user**: A · A · A · A | **done** (2026-10-08) |
| 2 | JP-118 | *C 2026* where © is meant | **Confirmed, but the frames type it**: all five footer frames carry a capital C (U+0043); the seed copies them | S | entry 1: **A**, © on every template | **done** (2026-10-08) |
| 3 | JP-120 (gallery) | four literals, the label "Not shown" | **Confirmed**: JP-090's rule, four more sites, both bodies | S–M | **user**: 1A (three keys + `railLabel`), 2A (an emptied control label reads its seed) | **done** (2026-10-08) |
| 4 | JP-113 | 390 credit runs off the page | **Confirmed, and named** (Editorial's retest sweep, `:688`, `:1241`): every `s.limeTree` template; on HEAD a squeeze of the back link since JP-120 (gallery) | S | no (JP-120 (form)'s shape) | **done** (2026-10-08) |
| 5 | JP-119 | live placeholders at .45 | **Confirmed, and recorded**: the canvas draws the frame's .8; the live box keeps JP-093's .45 | S | entry 1: **A**, `--ph: 0.8` | **done** (2026-10-08) |
| 6 | JP-112 | the heart over song 12 | **Confirmed, and recorded**: seated off the content's foot because the seed draws no pager | S | **user**: **A**, the pager's seat at desktop; 390 as is | **done** (2026-10-08) |
| 7 | JP-117 | the scribble under the word | **Confirmed, and recorded**: the frame's offsets kept against a Titan word they were not measured on | S | entry 1: **A**, the frame's fractions | **done** (2026-10-08) |
| 8 | JP-114 · JP-115 | the logo on two lines · the nav wraps | **Confirmed, and recorded** (layout-1.md `:1085`): JP-091's rule under Pop's room (77px at the 12px floor); the cap is not the lever | M | **user**: **B**, the floor 11 at desktop layout 1; no C; Pop alone (Editorial named) | **done** (2026-10-08) |
| 9 | JP-116 | section gaps off the frames | **Confirmed, and recorded as inherited** in every section's *Settled*; the two "content" seams measure as the map's own insets | M–L | **user**: A (Pop alone) · A (pad the map) · A (arrows at 60, 1440 and 768) · A (footer on every page) | **done** (2026-10-08) |
| 10 | — | End-of-pass sweep | 58 of 660 a surface against `main`, exactly the named union; every repro holds; `index.html` refreshed | S | — | **done** (2026-10-08) |

**Why this order:**
- **The decisions first.** Entry 1 writes no code. JP-111 is the PO's and the BA's question, and it
  goes out while the code entries run. If it turns into code (a licence), that is its own plan,
  `plans/pop/display-face.md`, on its own branch after this batch merges, as Grunge's and
  Editorial's were. JP-117, JP-118 and JP-119 each reverse a recorded call or copy a frame
  literally, so each is a question before it is code. **JP-114 · JP-115 sit on Titan's widths**, so
  a face change re-measures them, not the other way round.
- **Then by footprint, zero-diff first.** JP-118 is one function, with one text row per footer.
  JP-120 (gallery) is four seeded fields (zero on the seed). JP-113 is a wrap rule (zero on the
  seed). JP-119 is one custom property, which the digest does not read. JP-112 and JP-117 each move
  one Pop file per surface.
- **The two measured entries last.** JP-114 · JP-115 have to be measured before they can be decided,
  as JP-091 was. JP-116 is the largest footprint (every layout-1 section's root), and it reads gaps
  that JP-112's decision moves (the repertoire's foot), so it runs after JP-112.

**"Decision"** means the entry lists options with a recommendation. The session starts by asking
the user (one `AskUserQuestion`, up to four questions) and records the answer under **Decided**
before writing code.

## How each session runs

As [`../editorial/layout-4-qa-fixes.md`](../editorial/layout-4-qa-fixes.md)'s *How each session
runs* and the files it points at, with these differences:

1. The *Evidence* line numbers are from the triage (2026-10-08, `a35a92c`). Re-check them.
2. **Reproduce first**, on HEAD, in the real app: Pop **card 1**, Publish, Open, the tester's steps
   at 1440, 768 and 390. Then the harness at the ticket's width. Nothing was measured in the app at
   triage, so take the numbers fresh.
3. **Layout 1 has no composed page**, so there is no `&column=` surface. The published desktop
   **lays out at 1180 and zooms** (`min(w, 1440) / 1180`): the tester's "80 / 80" is the canvas's
   `padY` 80, which reads 97.6 in a 1440 tab, and a frame inset `v` is `round(v × 0.82)` on the
   canvas. The editor's own Desktop canvas is **1088** in a 1440 window: JP-091's sweep found its
   rule firing there and not at 1180, so the header entries read 1088 too.
4. **Long names go through `&name=`** in the harness, and through the fiber `st` dispatch in the real
   app (`browser-tool-choice`). The set:
   - *Kai Mercer*, the seed;
   - *Florence and the Machine* and *The Chemical Brothers*, several words;
   - *Maximilian Featherstonehaugh*, one long word;
   - *Supercalifragilistic*, a single word.
5. **An entry that reverses a recorded call** (JP-112, JP-114, JP-116, JP-117, JP-119) adds a
   *reversed* pointer where the call was recorded: the `layout-1.md` *Settled* bullet each entry
   cites, and the code comment. It also rewrites any CLAUDE.md, README or `notes/` line that states
   the old call as a rule. JP-113 adds an *answered* pointer at Editorial's retest sweep (`:688`,
   `:1241`).
6. **The real app is Pop card 1.** Add Lime's, Grunge's and Editorial's card 1 for every entry that
   moves the shared block (JP-113, JP-120 (gallery)), and Retro's card 1 for every entry that
   reaches both bodies (JP-113, JP-118, JP-120 (gallery)).
7. **Pop's frames at layout 1 are unbound** (layout-1.md *Pop's Figma mode*), and the desktop page
   frame is in **Lime's** mode. So the variable tools answer Lime's values or nothing, three heads
   render in **Bebas** (a mode leak), and a stated box can be a leaked one. Read the node's own
   `fills`, `fontName` and `absoluteRenderBounds` (`figma-frame-reading`).

**Do not refresh the root `index.html` per entry.** The sweep does it once.

---

## Entry 1 — JP-111 · JP-117 · JP-118 · JP-119: the decisions

One session, and no code. Re-check each ticket's *Evidence* below, then ask one `AskUserQuestion`
with four questions: JP-111's option, JP-117's, JP-118's and JP-119's. Record each answer under its
ticket's **Decided**. JP-111's facts (who sells Chunko, and on what terms) are gathered *before*
asking, since the reply leans on them. The entry commits the plan alone.

---

## JP-111 — the heads are Titan One, not Chunko Bold Demo

**Verdict: by design so far: a named stand-in, already chosen by rendering.** Pop's session 0
asked exactly this ([`layout-1.md`](./layout-1.md) decision 1, `:317`, settled 2026-10-02, user
call). The mode names **Chunko Bold Demo** for display and label. That is a demo licence, Fisterra
Fora's and Stones Crush's situation again, and Google Fonts has no Chunko.

Unlike Grunge's and Editorial's first replies, **the render-and-score that Editorial's
`display-face.md` ran only after its re-file was done for Pop before the fit.** Session 0 read
Chunko's own ink off the frame's single-line strings, rendered thirteen candidates, and scored them
on cap height, width against the frame and stem against the cap (`:921`–`:945`):
- **Titan One** is the only one with Chunko's weight (I stem .388 against .385), its widths (1.033
  at `faceK` 1, so **1.2% wide at the shipped 0.98**) and its cap (.735 against .720) at once.
- What Titan lacks is Chunko's **squared counters and ink traps**: its corners are soft.
- Rubik 900 is the squarer drawing but 7% light. Paytone One is width-exact but light-stemmed
  (.319).

**Warn the reply's author.** Grunge's JP-056 and Editorial's JP-085 were both closed as replies and
both re-filed (`../grunge/retest-qa-fixes.md`, `../editorial/retest-qa-fixes.md`). A reply that
only names the stand-in reads as closing a visible difference. So this one opens on who holds the
next step (the PO: a licence; the BA: whether the soft corners are acceptable) and cites the
measurement, rather than arguing it.

**Facts to gather in-session (not guessed at triage)**, for the PO:
- Who makes and sells Chunko, and whether a commercial licence offers **webfont embedding on the
  artists' public sites**. Give the price, the page-view tier, and whether one licence covers every
  site the builder publishes (JP-085's TipoType question).
- Whether the face is caps-only (the frames never show its lowercase, layout-1.md `:323`). This
  decides whether Pop's `'title'` casing with per-site uppercase is harmless or necessary.
- Whether it carries the glyphs the build sets in the display face: `’`, `"`, `&`, `·`, and `©`
  if JP-118 takes A.
- Whether every display node names it. Session 0 found the header bound and the rest raw, so sample
  the nav, two heads and a pill (`fontName`).

**Evidence.**
- `data.js:316`: `THEMES[4]`, `display` / `label` Titan One, and `faceK` 0.98.
- `data.js:771`–`:786`: `TITAN_EM` and `titanEms()`, which every Pop nav, title and head fit is in.
- `index.html` / `preview.html`: the `Titan+One` Google Fonts entry.
- `layout-1.md`: decision 1 (`:317`), its evidence (`:921`–`:945`), *What session 0 settled*
  (`:947`). The 0.14em glyph-floor lifts are Titan's, not Chunko's (*Inherited and used*).

**Decision (PO / BA).**
- **A (recommended for this batch). Reply: a stand-in chosen by rendering, with the licence question
  handed to the PO.** No code. Append the gathered facts to `layout-1.md` as an open question.
- **B. A web licence is bought, and Chunko ships.** Its own plan (`plans/pop/display-face.md`), on
  its own branch after this batch merges. It costs what JP-085's B listed:
  - the `.woff2` self-hosted in `source/src/builder/fonts/`, with an `@font-face` in `index.css`
    **and** `preview.html`;
  - a check that it survives `dressPublishedWindow`'s style clone, and that
    `vite-plugin-singlefile` inlines it (the size);
  - the Titan link entry retired;
  - a Chunko advance table in place of `TITAN_EM`, and `faceK` re-measured;
  - every 0.14em / 0.1em glyph lift re-measured, every Pop head fit at all four layouts
    re-measured, and **JP-114 · JP-115's and JP-117's results re-measured**;
  - every Pop digest moving, and the licence text kept in the repo.
- **C. A different free face.** Not recommended: session 0 already scored the field, and every
  other candidate is lighter or wider.

**Fix.** On A: none. On B: write `display-face.md` and stop there.

**Docs.** On A: `layout-1.md`, a new open question holding the facts, and the reply.

**Decided** (user, 2026-10-08): **A.** The answer is a reply. Titan One stays, the stand-in session 0
chose by rendering. The next step is the PO's: a written question to Zarma Type, since no licence on
sale plainly covers the builder. The facts are open question 12 in [`layout-1.md`](./layout-1.md),
gathered in entry 1, with their sources and quotes. In short:
- **The face.** It is Zarma Type's *Chunko Bold*. The frames' *Chunko Bold Demo* is its free demo,
  for personal use only. The demo file is the frames' face: its six strings match session 0's widths
  to 0.1%.
- **The licences.** Zarma sells:
  - Webfont at $79: 1 domain and its sub-domains, up to 500,000 views a month;
  - Server at $649: "1 Website", written for print-on-demand design apps;
  - Corporate at $3,499: unlimited views, one brand.

  Creative Market's terms keep a webfont to sites the licensee "owns or controls" and bar end-user
  font use in cloud apps. Fontspring's page was not readable (403).
- **Not caps-only.** The demo draws a full, distinct lowercase. So under Chunko, Pop's per-site
  uppercase is necessary, and it is already in place.
- **Glyphs.** The demo lacks © ’ “ ” · (its cmap ends at U+007D, plus `˜` and `€`), and has `"`,
  `&` and `'`. The commercial file's set could not be verified.

**The reply** (a draft for the sweep's list), opening on who holds the next step, per the warning
above:

> *JP-111 — needs the PO.* Titan One is a deliberate stand-in. It was chosen by rendering thirteen
> free faces against the frame: it has Chunko's weight, its cap height and its widths within 1.2%
> (`layout-1.md` decision 1). Its corners are soft, where Chunko's are squared. *Chunko Bold Demo* is
> Zarma Type's personal-use demo and cannot ship. **PO:** ask Zarma Type for a licence that covers a
> builder whose published artist sites embed the face. None on sale covers it: the $79 Webfont is one
> domain at 500,000 views a month, and the $649 Server is one website. Ask for the character set with
> the quote, since the demo has no © ’ “ ” ·. **BA:** whether Titan's soft corners are acceptable in
> the meantime.

**Left for the sweep:** `data.js:763`'s comment calls Chunko "caps-only". Correct it (comment only, 0
files).

---

## JP-118 — the copyright reads *C 2026*, where © is meant

**Verdict: confirmed, but the frames type it.** `copyrightOf = (name) => `C 2026 ${name}``
(`data.js:2444`) has seeded every footer since Retro's layout-1 rebuild (`8fa8ff4`). At triage every
footer frame was read: **all five type a capital C**, character code 67, then a space and 2026:

| Footer | Node | Text | Face |
|---|---|---|---|
| Retro | `964:58586` | `C 2026 Kai Mercer` | Soulway |
| Lime | `964:58598` | `C 2026 Kai Mercer` | Bebas Neue |
| Grunge | `964:58610` | `C 2026 Kai Mercer` | Stones Crush |
| Editorial | `964:58622` | `C 2026 Kai Mercer` | Fisterra Fora |
| Pop | `964:58634` · `986:52430` · `986:52442` | `C 2026 KAI MERCER` | Chunko Bold Demo |

So the build copies the frames, and the designer's C almost certainly stands for the sign. The
tester reads it as one too.

**Evidence.**
- `data.js:2400`: `FIELDS.footer` `{ k: 'copyright', l: 'Small print' }`, special-cased.
- `data.js:2444`: `copyrightOf()`.
- `EncoreBuilder.jsx:2050`: `vm.copyright = cv('copyright', copyrightOf(artistName))`.
- `EncoreBuilder.jsx:4270`: `EditPanel`'s mirror.
- `EncoreSection.jsx:29586` and `:29789`: the two footer bodies print `s.copyright`.
- CLAUDE.md, JP-050: "Header `badgeText` and footer `copyright` have no static default". The seed
  follows the name, and the absent-key gate keeps a typed line the artist's.

**Decision.**
- **A (recommended). Seed `© 2026 ${name}` on every template**, since the five frames agree. It is one
  function with two readers. An artist's typed small print is untouched (the seed applies only while
  the key is absent). Check that every footer face renders © from its own font (Titan One, Bebas
  Neue, Anton, Gloock and Retro's face), not a fallback glyph that would change the row's
  metrics, and that `cased()` leaves it alone.
- **B. Pop alone.** Not recommended: the frames are one string on all five.
- **C. A reply, by design**: the frames type C, so the designer is asked. A note for the designer
  goes at the plan's foot whichever is taken.

**Expected after-diff (on A, named before the code).** The footer × themes 0–4 × three widths, on
both surfaces, plus the footer's `page=2` render: the small print's text, and its width where ©
and C advance differently. Every other section: 0.

**Verify.** The seed digest as named. On the published tab of each card 1, the line reads
`© 2026 <name>` at 1440, 768 and 390, and the glyph is the face's own: a `Range` over the `©`
reports the section's family through `document.fonts`, or its advance matches a rendered `©` in that
face. A typed small print stays the artist's at every layout. The edit panel shows the seed.

**Docs.** The `copyrightOf` comment. `notes/footer.md` if it states the seed. A *Notes for the
designer* line.

**Decided** (user, 2026-10-08): **A.** `copyrightOf()` seeds `© 2026 ${name}` on every template,
since the five frames are one string and the © reading holds for all of them. Small print the
artist typed stays theirs. Entry 2 checks that each footer face draws its own ©, not a fallback, and
that the row moves only by ©'s advance against C's.

A fact found in entry 1, for the reply and the designer: **Pop's frame face, Chunko Bold Demo, has
no © at all** (its cmap, JP-111). So the designer could not have typed the sign in it. Grunge's and
Editorial's footers are set in demo faces too (Stones Crush, Fisterra Fora), so the same may hold
there. That was not checked, so it supports A without proving it for all five.

**Settled** (2026-10-08, on `96d0e44`).
- **The evidence held** at triage's lines: `data.js:2400` and `:2444`, `EncoreBuilder.jsx:2050`
  and `:4270`, `EncoreSection.jsx:29586` (the `s.limeTree` body) and `:29789` (Retro's).
- **Reproduced** on HEAD, card 1 of all five templates: the canvas (Desktop, Tablet and Mobile
  tabs), the edit panel's *Small print* box and the published tab at 1440, 768 and 390 all read
  `C 2026 Kai Mercer` (capitals under Grunge, Editorial and Pop, by CSS `text-transform`).
- **The code**: `copyrightOf()` returns `` `© 2026 ${name}` ``, and its comment says why the seed
  leaves the frames' C. `sectionVm` and `EditPanel`'s chain both call it, so neither changed.
  `notes/footer.md` and CLAUDE.md name the function, not its string, so neither changed either.
- **Each face draws its own ©.** The build's small-print faces are **Fraunces** (Retro), **Bebas
  Neue** (Lime), **Anton** (Grunge), **Gloock** (Editorial) and **Titan One** (Pop): the frames'
  Soulway, Stones Crush, Fisterra Fora and Chunko are not shipped. CDP's
  `CSS.getPlatformFontsForNode` on the span names one web face at ×17 on every reading (×16 at
  Retro's two-line 390, the break space, as on HEAD), so nothing fell back. The row grew by the
  glyph's own advance and nothing else. The whole text's `Range` grew by as much as the first
  character's did, on the desktop canvas: Lime +7.09 against +7.10, Grunge +3.00 against +3.00,
  Retro +2.61 against +2.59, Editorial +1.94 against +1.93, Pop +0.35 against +0.34. The fonts are Google's full families (the `latin` subset
  holds U+00A9) in `index.html`, `preview.html` and the standalone build alike.
- **Casing**: no theme cases `'upper'` today, and `vm.copyright` never passes through `caseText`.
  `caseText('© 2026 Kai Mercer', 'upper')` keeps U+00A9, and CSS `text-transform: uppercase`
  renders `© 2026 KAI MERCER` (`innerText`, all three uppercase templates).
- **Digest** (all categories, themes 0–4, three widths, canvas and `live=1`; HEAD worktree :5174
  against a fresh tree server :5177). Before the edit: 0 of 660 a surface. After: **30 of 660 a
  surface, every one `cat=footer`** (arch 0 and `page=2`), one row each, the small print's span:
  - its text at every width;
  - its width at desktop and tablet (Retro +2.6 / +3.2, Lime +7.1 / +6.8, Grunge +3.0 / +2.9,
    Editorial +1.9 / +1.6, Pop +0.4 / +0.4);
  - at 390 the text alone (the span is a fixed half), except Pop's right-packed row, x −0.4 and
    width +0.4. Retro's two-line 390 keeps its 39.5 height.
  Every other section: 0.
- **Typed small print stays the artist's**: `C 2026 Mercer Music Ltd` through `st`'s dispatch,
  on card 1 of all five, reads unchanged on the canvas, in the panel and on the published tab at
  three widths. Through the harness (`&cj=`), seed and typed across pages 0–3, themes 0–4, three
  widths, both surfaces: 120 of 120 `© 2026 Kai Mercer` and 120 of 120 the typed line.
- **The edit panel** shows `© 2026 Kai Mercer` as the box's value under every template.
- The designer note was seeded at triage, so it is not repeated.

---

## JP-120 (gallery) — four literals no field reaches

**Verdict: confirmed: JP-090's rule, four more sites, in both bodies.** The frames' text nodes
(Pop's `964:58627` and Retro's `964:58579`, read at triage) are: MEDIA, the heading, GALLERY (the
open row), YOUTUBE, INSTAGRAM, TIKTOK, ←, **BACK TO BEGININNING** (the frame's typo; the build
spells it right), KAI MERCER, GALLERY, `02 — 15`, and Retro's rail *Gallery*. The build:

| Literal | Sites (`EncoreSection.jsx`) | Reached by |
|---|---|---|
| `Media`, the kicker | `:15190` (`s.limeTree` block, `pt` / `eyebrow`), `:15713` (Retro's body) | every template, gallery layout 1. Gallery layout 4 prints its own `Media` eyebrow too (`:16946` `s.limeTree`, `:17120` Retro's): a sibling, see the decision |
| `Back to beginning`, the rewind control | `:15317`, `:15631` | every template; a control on the published page (`setPick(0)`) |
| `Gallery`, the credit's second line | `:15321`, `:15640` | every template |
| `Gallery`, the open source row's label | `GALLERY_SOURCES[0].l` (`data.js:1303`) through `vm.gallerySources` (`EncoreBuilder.jsx:1395`); printed at desktop alone in the `s.limeTree` block (`:15261`), at every width in Retro's (`:15562`) | every template |

The tester's second point is `railLabel`. The field exists, seeded *Gallery*
(`GALLERY_RAIL_LABEL`, `data.js:1058`) and `in: [1]` (`data.js:2097`), the 768 head row of layout 2
alone (JP-098). So at layout 1 the panel marks it "Not shown in this layout", where two *Gallery*s
stand.

**Siblings that stay literals**, named in the reply:
- *YouTube*, *Instagram* and *TikTok*, the services' own names, which say where each row goes (and
  which the published page hides until an address is typed);
- the counter `02 — 15`, a count;
- Retro's rail *Gallery* (`:15588`, `:15600`), unless the decision folds it into `railLabel`.

**Evidence.**
- `FIELDS.gallery` (`data.js:2091`–`:2104`).
- `vm.galRailLabel` (`EncoreBuilder.jsx:1386`).
- `EditPanel`'s seed chain: its `kicker` arms are gated on the map and the testimonials
  (`mapKickerSeed`, `testiKickerSeed`). A gallery `kicker` with a plain `d` needs no arm, but it
  must not fall into theirs.
- CLAUDE.md's JP-071 / JP-090 / JP-095 / JP-098 paragraph, and its list of unreported siblings.

**Decision.**
1. **The shape.**
   - **A (recommended).** Three new keys, plus `railLabel` widened:
     - `gallery.kicker` *Kicker* (`Media`);
     - `gallery.backLabel` *Back link* (`Back to beginning`);
     - `gallery.sourceLabel` *Gallery row label* (`Gallery`), beside the services' literal names;
     - `railLabel` reaching layout 1 for the credit's second line, since that is the gallery's name
       under the artist's, the job its 768 row does at layout 2. Its hint is rewritten.

     JP-090's shape: each is seeded with the literal and uncased (every site keeps its own casing).
     `in` is **measured with `reach.mjs`**, not written: `kicker` may reach layout 4's eyebrow as
     well, as `map.kicker` reached layouts 1 and 3.
   - **B. One field for both *Gallery*s**: `railLabel` widened to the credit and the open row. It is
     fewer fields, but the two seats need different empty rules (below).
   - **C. Four new keys**, with `railLabel` untouched.
2. **An emptied control label** (*Back link*, and on A the open row's label).
   - **A (recommended). It reads its seed again**, the rule of the map's `venueCta` / `routeCta` and
     the calendar's `prompt`: both are controls on the published page.
   - **B.** The word drops, and the control keeps its glyph alone (the ← for the back link; the disc
     and cross for the row).

   An emptied kicker or credit line is simply not drawn, and takes no question.

**Expected after-diff (named before the code): zero** on the seed, themes 0–4, both surfaces, since
every field is seeded with the literal it replaces. The proof is a marker through `&cj=` on each
key, moving exactly its text row, and an emptied value removing exactly its node (or, for a
control, reading the seed).

**Verify.**
- The seed digest: 0 files.
- The marker set, per key, under all five templates at three widths, canvas and `live=1`.
- `reach.mjs` for the new keys and the widened `railLabel`.
- The panel no longer says "Not shown" for *Gallery label* at layout 1.
- The tester's set: a unique marker in every gallery text field leaves no literal but the
  siblings above.
- A typed long label wraps rather than scrolling the 390 page (JP-090's wrap fix, and JP-113's
  row).

**Docs.**
- CLAUDE.md's label paragraph: the keys, `railLabel`'s new reach and the siblings list.
- `notes/gallery.md`.
- `reach.mjs` probes.

**Decided** (user, 2026-10-08): **1A, 2A**, both recommendations.
1. **Three new keys, and `railLabel` widened.** Each key is seeded with the literal it replaces,
   byte for byte, and uncased:
   - `gallery.kicker` *Kicker* (`Media`). It also reaches **layout 4's `Media` eyebrow**
     (`:16946`, `:17120`), the same word doing the same job, by JP-071's rule. `reach.mjs`
     should read `[0, 3]`. Emptied, it is not drawn.
   - `gallery.backLabel` *Back link* (`Back to beginning`).
   - `gallery.sourceLabel` *Gallery row label* (`Gallery`), seeded off `GALLERY_SOURCES[0].l`. The
     three services keep their names.
   - `railLabel` also prints **layout 1's credit line**, under the artist's name, at every width.
     Its hint is rewritten. Emptied, the line is not drawn.
2. **An emptied *Back link* or *Gallery row label* reads its seed again**: the rule of `venueCta` /
   `routeCta`, `prompt` and `typeLabel`. The back link is a control on the published page, and the
   open row always stands (`srcRows` keeps `i === 0`), so each keeps its word.

**Retro's rail wordmark stays a literal**, the third *Gallery*, which only Retro draws and the tester
did not report (Pop has no rail). The question named it, and the user did not fold it in.

Asked over what the session found first, on HEAD (`e0d6287`):
- **Every *Evidence* line held** at the triage's numbers (`e0d6287`'s edit sits at `data.js:2444`,
  after every gallery reference).
- **One row of the table was wrong.** Retro's open-row label (`:15562`) sits in the `desk` branch of
  `sources` (`:15514`). The narrow branch draws icon-only tiles. So the open row prints its label
  **at desktop alone in both bodies**, and `sourceLabel`'s reach is a desktop partial at layout 1,
  as `railLabel`'s is at layout 2.
- **Reproduced in the real app** (puppeteer on the HEAD worktree, :5174; card 1 of Pop, Lime,
  Grunge, Editorial and Retro). The canvas's three tabs and the published tab at 1440, 768 and 390
  print *Media*, *Back to beginning* and the credit's *Gallery* at every width. The open row's
  *Gallery* prints at desktop only. Retro adds its rail's *Gallery* at every width. In the panel,
  *Gallery label* reads "Not shown in this layout" under all five. No page errors, and no page
  scroll at any width.
- **The harness was proven first**: a HEAD worktree at `e0d6287` on :5174 against a fresh tree
  server on :5177, every category, themes 0–4, three widths: **0 of 660 on each surface**.
- **Expected after-diff, named before the code: zero** on the seed, every category, both surfaces.

**Settled** (2026-10-08).
- **`data.js`.**
  - `GALLERY_KICKER` "Media" and `GALLERY_BACK_LABEL` "Back to beginning" sit beside
    `GALLERY_RAIL_LABEL`.
  - `FIELDS.gallery` adds `kicker` *Kicker* (`in: [0, 3]`, ahead of `heading`), `backLabel` *Back
    link* (`in: [0]`) and `sourceLabel` *Gallery row label* (`in: [0]`, `d: GALLERY_SOURCES[0].l`).
  - `railLabel` is `in: [0, 1]`. Its hint names layout 1's credit line and layout 2's tablet row.
  - `sourceLabel`'s hint says "on desktop only", since `in` names no width. Each new hint says
    what emptying does.
  - `EditPanel`'s chain needed nothing: every seed is a plain `d`, and the gallery's `kicker` falls
    through the map's and the testimonials' arms, which are gated on their categories.
- **`sectionVm`.**
  - `vm.galKicker = cv('kicker', GALLERY_KICKER)`, dropped when emptied.
  - `vm.galBackLabel` is trimmed and reads `GALLERY_BACK_LABEL` again when emptied (`venueCta`'s
    shape).
  - `vm.gallerySources[0].label` reads `sourceLabel` the same way, uncased. The other three rows
    keep `cased(g.l)`, and `cased()` is a passthrough under every theme today (`casing: 'title'`),
    so dropping it from row 0 moved nothing.
  - `vm.galRailLabel` is unchanged.
- **`EncoreSection`, both bodies.**
  - **Layout 1**: the kicker, the back link and the credit's second line print the keys. The
    kicker and the credit line are not rendered when empty.
  - **Layout 4's eyebrow** (`s.limeTree` and Retro's) prints `s.galKicker`, with
    `overflowWrap: 'anywhere'`, since its column is `flex-start`. Retro's comment there, "costs no
    literal", now says the word is layout 1's kicker.
  - **The wrap.** Each layout-1 label site takes `whiteSpace: 'normal'`, `overflowWrap: 'anywhere'`
    and `minWidth: 0` (JP-090's fix). The Lime-tree sites pass them to `eyebrow()` / `pt()` through
    `extra`, so the helpers are untouched (the counter still uses them `nowrap`). The credit line
    is also `textAlign: 'right'`, the column's own `flex-end`.
  - **Retro's open-row label wraps** rather than pushing the cross out. The Lime-tree capsule's
    label keeps its ellipsis, because the capsule is a fixed height.
  - **Left alone**: the head row's own wrap and the name's `nowrap`, which are JP-113's, below.
- **Digest** (the HEAD worktree on :5174 against :5177, every category, themes 0–4, three widths,
  port and photo stamps normalised): **0 of 660 on each surface**, as named. No empty renders.
- **Reach** (`reach.mjs`, three new rows plus `railLabel`'s, run from a filtered scratchpad copy
  with `gallery.heading` as the control, themes 0–4, 1,200 renders). Every template reads the
  same:
  - `kicker`: layouts 1 and 4;
  - `railLabel`: layout 1, and layout 2 at 2/6 (tablet, as JP-098 left it);
  - `backLabel`: layout 1;
  - `sourceLabel`: layout 1 at 2/6, the desktop canvas and live renders;
  - `heading`: layouts 1–4, unchanged.

  `fieldReach` gives the same designs in Node under all five theme names, and `fieldNowhere` is
  false for all four.
- **States** (a scratch harness probe, 2,040 renders). Each key at gallery layouts 1–4 × themes
  0–4 × three widths × both surfaces, as a marker, emptied, 85 characters and one 53-character
  word:
  - **A marker moves exactly its own text row**, at exactly the designs reach names, with no root
    height change.
  - **Emptied**: the kicker removes exactly its node at layouts 1 and 4, and the credit line
    removes exactly its own at layout 1 and at layout 2's tablet row. The root shrinks by the line
    and its gap where that column sets the height (tablet kicker −52). The back link and the row
    label read their seeds again, so nothing moves.
  - **Long and one-word labels**: no text `Range` runs past the section root's edge, outside an
    ancestor that clips it (the Lime-tree capsule's ellipsis), at any width or surface.
- **One interaction, left for JP-113.** Under Lime, Grunge, Editorial and Pop, the layout-1 head
  row is a no-wrap `space-between` row. So a long credit line now squeezes the back link, which
  can shrink since its word wraps, onto 2–4 lines: Pop at 390 reads 4, breaking inside
  *BEGINNING*. On HEAD, the same credit would have run off the page. Retro's row already wraps,
  so its back link keeps its line. JP-113's `flexWrap` on that row gives the back link its line
  back, and its verify should type a long *Gallery label* as well as a long name. *Answered* by
  JP-113 (below, 2026-10-08): the row wraps, and the back link keeps one line.
- **The real app** (puppeteer on :5177, card 1 of Pop, Lime, Grunge, Editorial and Retro;
  content written through `st`'s dispatch; the canvas's three tabs, then Publish, Open, at 1440,
  768 and 390):
  - **The tester's set**: a unique marker in every `FIELDS.gallery` text field, and an address in
    each social field. No literal is left but the siblings: *YouTube*, *Instagram* and *TikTok*
    (desktop), the ←, the counter, and Retro's rail *Gallery*.
  - **Emptied** (the four label keys alone, `??`): no kicker and no credit line. The page prints
    *Back to beginning* and, at desktop, the row's *Gallery* again.
  - **Long**: the page's `scrollWidth` equals its width at all three widths, under all five.
  - **Live**: the marked back link rewinds (05 → 01) after a step, emptied or seeded alike.
  - **The panel** shows the four seeds. No gallery field reads "Not shown in this layout" at
    layout 1, *Gallery label* included.
  - No page errors.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed; the sweep does
  that.
- **Docs.**
  - CLAUDE.md's label paragraph: JP-098's `railLabel` sentence no longer says `in: [1]`, and a
    JP-120 (gallery) sentence names the four keys, `railLabel`'s reach and the empty rules. Retro's
    rail wordmark joins the siblings list, and *YouTube* / *Instagram* / *TikTok* are named as the
    services' names.
  - `notes/gallery.md`: a bullet, and `backLabel` beside the rewind.
  - `reach.mjs`: three probes, and `railLabel`'s comment.

Reply: **JP-120 (gallery) — fixed.** The four texts in the Gallery's layout 1 are now editable on
every template, in the editor and on the published page. Each starts as the design's text.
- **Kicker**: the "MEDIA" line over the heading. It also changes the same line in Gallery
  layout 4. Left empty, it is not drawn.
- **Gallery label**: the "GALLERY" under the artist's name. It no longer says "Not shown in this
  layout", and still sets the tablet label in layout 2. Left empty, it is not drawn.
- **Back link**: "BACK TO BEGINNING". **Gallery row label**: the first row's "GALLERY", shown on
  desktop. Each left empty shows its original text again, since the link and the row always
  stand.
- A long text wraps rather than running off a phone screen. *YouTube*, *Instagram* and *TikTok*
  stay the services' names, the "04 — 07" counter is a count, and Retro's sideways "Gallery"
  beside the photo stays as the design draws it.

---

## JP-113 — 390: a long name runs the gallery's credit off the page

**Verdict: confirmed, and already named.** Editorial's retest sweep logged it, found and not fixed
(`../editorial/retest-qa-fixes.md:688`, `:1241`): under Pop, *Florence* at 360 (378) and
*Featherstonehaugh* at 360–414 (421 / 433); under Editorial, Lime and Grunge, a longer name (413).
It is the only page scroll on card 1.

The cause: the `s.limeTree` block's head row (`EncoreSection.jsx:15309`) is a no-wrap
`space-between` row, and the credit beside the back link prints the name `nowrap`:
- Pop's `pt(s.brand, 11, 2, …)` is Inter Bold 11, tracked 2 (`:15175`, `:15320`), the widest of
  the four;
- the twins' `eyebrow(s.brand)` is Inter Bold at `s.eyebrow` (`:15165`).

**Retro's row already wraps** (`:15614`, `flexWrap: 'wrap'`), so its credit drops under the back
link. But its column is `nowrap` too (`:15635`), so a name wider than the whole measure would still
run off.

**Evidence.**
- `EncoreSection.jsx:15309`–`:15324`: the `s.limeTree` head row, the back link and the credit
  column (`col(u(2), { alignItems: 'flex-end' })`).
- `:15614`–`:15641`: Retro's.
- JP-120 (form)'s fix (`notes/form.md:82`), the shape: at 390 the row wraps, and the credit
  shrinks (`0 1 auto`) and wraps between words, inside one with `break-word`.

**Decision.** None needed: JP-120 (form)'s shape and JP-090's wrap rule. The seed keeps the frame's
one row. If the session finds a reason to depart from it, ask.

**Fix.** Both bodies, at every width (only a long name ever triggers it):
- The `s.limeTree` row may wrap, with the credit `flex: '0 1 auto'` and `minWidth: 0`. Its two lines
  take `whiteSpace: 'normal'` and `overflowWrap: 'anywhere'`, right-aligned (`textAlign: 'right'`,
  the column's own `flex-end`). So a name wraps between words, and breaks inside a word only when
  one word alone outruns the measure.
- Retro's column takes the same three properties.
- **Not a shrink.** This is an 11px credit, not the display name, and JP-092 / JP-102 / JP-109's
  widest-word fit would set it illegibly small.

**Expected after-diff (named before the code): zero** on the seed, themes 0–4, both surfaces. *Kai
Mercer* fits one row at every width, and the digest does not record `whiteSpace` or
`overflowWrap`.

**Verify.**
- The long-name set at 360, 390 and 414 on the published tab, and the canvas at Mobile, under all
  five templates. The page's `scrollWidth` equals its width. No word's `Range` breaks inside itself
  except one wider than the measure (the 20-letter single word). The back link keeps its line.
- At 768 and 1440 nothing moves (the tester's control).
- Retro with the long single word.
- **A long *Gallery label* as well** (JP-120 (gallery)'s *Settled*): the credit's second line is
  the artist's now, and in the no-wrap Lime-tree row it squeezes the back link onto 2–4 lines on
  HEAD. With the row wrapping, the back link keeps its line.

**Docs.** The head row's comment. `notes/gallery.md`. The *answered* pointers at
`../editorial/retest-qa-fixes.md:688` and `:1241`.

Found first, on HEAD (`ff7d698`):
- **The Evidence moved with JP-120 (gallery)**, which also did part of the fix. The Lime-tree head
  row is `const top` at `:15313`, and the credit column is `:15323`. Retro's row is `:15624`, and
  its `nowrap` credit column is `:15647`. JP-120 (gallery) had already let the back link's word
  and the credit's second line wrap.
- **Reproduced in the real app.** This was puppeteer on a HEAD worktree (:5174), card 1 of all
  five templates, with the name written through `st`'s dispatch. It read the Mobile, Tablet and
  Desktop canvases, then Publish → Open at 360, 390, 414, 768 and 1440. **The tester's overflow
  had become a squeeze.** The back link's word can now wrap (`minWidth: 0`, `anywhere`), so the
  no-wrap Lime-tree row shrank the back link instead of running the credit off:
  - 2 lines: Pop with *Florence* and *The Chemical Brothers* at 360, and Lime, Grunge and
    Editorial with *Featherstonehaugh* at 360;
  - 3 lines: Pop with *Featherstonehaugh* at 360, and Lime, Grunge and Editorial with
    *…Windsor* at 360;
  - 4–8 lines: Pop with a 34-letter word;
  - 15 lines: Pop with *Maximilian Featherstonehaugh Windsor*. Its credit was 328 wide, and the
    page was **379 at 360**.

  A long *Gallery label* did the same at 360–414, and at the 1088 Desktop canvas under Lime and
  Editorial. A long one-word label broke inside itself though it fit the measure. The tester's
  *Featherstonehaugh* at 390 no longer scrolls on HEAD; the back link takes 2 lines instead.
  Retro's row already wrapped, so its gallery stayed inside the page with every name.
- **The harness was proven first.** The HEAD worktree (:5174) was digested against a fresh tree
  server on :5177: every category, themes 0–4, three widths. **0 of 660 on each surface.**
- **Expected after-diff, named before the code: zero** on the seed, both surfaces.

**Settled** (2026-10-08).
- **`EncoreSection`, both bodies, at every width.** No width gates a longhand, so a resize logs no
  "Removing a style property".
  - **The Lime-tree row** (`const top`) takes `flexWrap: 'wrap'`. Its credit column takes
    `flex: '0 1 auto'` and `minWidth: 0`. The name line takes `textAlign: 'right'` and the
    block's `wrap` (`whiteSpace: 'normal'`, `overflowWrap: 'anywhere'`, `minWidth: 0`), through
    `pt()`'s and `eyebrow()`'s `extra`.
  - **Retro's credit column** takes `flex: '0 1 auto'` and `minWidth: 0`. It keeps its `nowrap`
    for the inheritance. The name span takes the three wrap properties and `textAlign: 'right'`,
    as the second line already did.
  - **Not a shrink.** The credit keeps its 11px.
  - **A dropped credit stands at the row's start.** A lone item on a `space-between` line stands
    at the line's start, as in Retro's row and JP-120 (form)'s credit. So `textAlign: 'right'`
    aligns the lines inside the credit once it wraps. It does not hold the credit at the row's
    right edge. This follows the precedent: no `marginLeft: 'auto'`.
- **Digest** (the HEAD worktree against the tree, every category, themes 0–4, three widths, port
  and photo stamps normalised): **0 of 660 on each surface**, as named. No empty renders.
  - **Positive control:** with `&name=Maximilian Featherstonehaugh Windsor&live=1` at 390, the
    gallery moves at layout 1 under themes 1–4 alone (4 of 20 files). Retro and layouts 2–4 do not
    move.
- **The real app** (the same probe on :5177). Thirteen cases:
  - the tester's five names and *…Windsor*;
  - a 34-letter word and a 45-letter word (*Pneumonoultramicroscopicsilicovolcanoconiosis*);
  - a long *Gallery label*, with the seed name and with *Featherstonehaugh*;
  - a 34-letter label and a 45-letter label;
  - the label emptied.

  The results:
  - **At 360, 390 and 414, and on the Mobile canvas, under all five:**
    - no gallery text `Range` runs past the section;
    - **the back link keeps one line in every case**, long labels included;
    - no word breaks inside itself except the 45-letter name under Pop and Retro. That word is
      wider than the 340 / 370 measure at Inter Bold 11 tracked 2, so it breaks.
  - **Lime's, Grunge's and Editorial's eyebrow fits the 45-letter word whole** (326 wide).
  - **The page's `scrollWidth` equals its width** for every name in the tester's set and for
    *…Windsor*.
  - **At 768, 1440 and the Tablet and Desktop canvases, the tester's control holds.** With the
    name set alone (the five names, *…Windsor* and the 34-letter word), the head row's boxes and
    line counts equal HEAD's under all five.
  - **What moves wide** is 14 rows. Each one is under Lime, Grunge or Editorial, with a long label
    or the 45-letter word, at the 1088 Desktop canvas or at 1440. HEAD squeezed the back link onto
    2–4 lines there. Now it keeps one, and the credit drops.
  - No page errors.
- **One plan expectation did not hold.** The *Verify* named the 20-letter *Supercalifragilistic*
  as the word wider than the measure. It is about 200 wide and never breaks. The 45-letter word is
  the positive control.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed; the sweep does
  that.
- **Docs.**
  - The head row's comment in both bodies, and the `wrap` const's comment.
  - `notes/gallery.md`, a bullet after the labels'.
  - *Answered* pointers at `../editorial/retest-qa-fixes.md:688` and `:1241`, and at JP-120
    (gallery)'s *One interaction* above.
  - CLAUDE.md and README state no rule about this row, so they are untouched.
- **Named, not fixed: the footer scrolls the page with a one-word name of 34 or 45 letters.**
  - Retro: 404 with the 34-letter word, and 539 with the 45-letter word, at 360 and 390.
  - Lime: 396 with the 45-letter word.
  - Editorial: 479 with the 45-letter word, and 361 with the 34-letter word at 360.
  - Pop fits.

  Hiding the footer brings each page back to its width. None of these is in the tester's set.
  The issue belongs to the long-name family (JP-092, JP-102, JP-109) and is left for its own
  ticket.

Reply: **JP-113 — fixed.** In the Gallery's layout 1, a long artist name or Gallery label no longer
runs off a phone screen. It also no longer squeezes "Back to beginning".
- **What changed:** when the name does not fit beside the link, it moves to its own line under the
  link and wraps between words. One word is broken only when it alone is wider than the screen.
- **What stays the same:** the default name keeps the design's single row. With the report's
  names, 768 and 1440 do not change, and that holds on every template.
- **Found while checking:** a one-word name of 34 letters or more still scrolls the page, from the
  footer, on Retro, Lime and Editorial. It is logged for its own ticket.

---

## JP-119 — the published placeholders draw at .45, where the frame's are .8

**Verdict: confirmed, and recorded as an accepted diff.** Pop's frame (`964:58632`, read at triage)
fills its three placeholders, *Full name*, *you@email.com* and *Tell me about your event…*, white at
**0.8** over the `#EE138B` box. The canvas draws exactly that (`POP_FORM.ph`,
`rgba(255, 255, 255, 0.8)`, `EncoreSection.jsx:505`, read as `G.ph`). The live box keeps `index.css`'s
`::placeholder { opacity: var(--ph, .45) }`. So **the canvas and the published tab disagree today**,
and the published one is the tester's 1.8 : 1.

Pop's form fit recorded it: "the live `::placeholder` at the page's .45 against the frame's .8 (a
hint under a label, JP-093 — Repertoire's accepted diff)" (layout-1.md `:1933`–`:1935`). JP-093
(user call, 2026-10-01) set `--ph: 1` on the four label-in-box inputs alone and kept every other
placeholder at .45 as a hint. CLAUDE.md states that rule.

**Evidence.**
- `index.css:120`–`:122`.
- `EncoreSection.jsx:26512`–`:26519`: Pop's live input; `:26521`–`:26525`: the canvas span and its
  comment; `:26760`: the live textarea.
- CLAUDE.md `:61`–`:65`: the `--ph` paragraph.
- The repertoire's search hint (`:12896`) carries the same accepted diff (the frame's white at 50%,
  the live .45).

**Decision.**
- **A (recommended). `'--ph': 0.8` on Pop's layout-1 live boxes**, the three inputs and the message
  textarea: `POP_FORM.ph`'s alpha on the box's own white, so the published tab draws what the frame
  and the canvas draw. It is the fifth input set to carry `--ph`. CLAUDE.md's rule becomes "a box
  whose frame states its placeholder's strength sets it; every other placeholder is a hint at
  .45".
- **B. A, plus every live box whose canvas span draws a stated strength other than .45**: Pop's
  repertoire search (.5) and whatever the session's grep finds (`accepted diff`). Each is one more
  `--ph`. The session lists the sites before asking.
- **C. A reply**: a hint under a label, Low. The canvas keeps the frame's .8.

**Expected after-diff (on A): zero** on both surfaces. The digest does not read `::placeholder`,
and the canvas span is unchanged.

**Verify.** First, the colour: `::placeholder` is `color: inherit`, so it takes the box's own
`color`, which under Pop is `G.on` = `S3.text3` (`:26412`). `--ph: 0.8` reproduces the frame's
`rgba(255, 255, 255, 0.8)` only if that resolves to white; if it does not, the fix needs a colour as
well as an alpha. Then, on the published tab at three widths,
`getComputedStyle(input, '::placeholder').opacity` reads 0.8 on Pop's four boxes and .45 on every other hint. The composite's contrast over `#EE138B`
is the frame's (the tester's ≈ 3 : 1). Typed text is unaffected. Lime's, Grunge's and Editorial's
layout-1 forms are unchanged.

**Docs.** The live input's comment. CLAUDE.md's `--ph` paragraph and `index.css`'s comment. A
*reversed* pointer at layout-1.md `:1933`. `notes/form.md`.

**Decided** (user, 2026-10-08): **A.** `'--ph': 0.8` goes on every live box that Pop's layout-1 form
block draws: each input and the message textarea.
- **The count.** The seed draws **five** boxes, not the "three inputs" above: `FORM_FIELDS` at
  `d === 0` has four rows (Name, Email, Event date, Guests), and the message is the fifth. So the fix
  goes on each live control, or on `box()` where the live controls use it, rather than on a count.
- **The colour, checked in entry 1.** The box's `color` is `G.on` = `S3.text3` = `#FFFFFF`
  (`data.js:411`). So `::placeholder`'s `color: inherit` at 0.8 is exactly the frame's
  `rgba(255, 255, 255, 0.8)`, and the fix needs no colour.
- **The contrast.** The composite over `#EE138B` is **3.0 : 1** at 0.8 and **1.7 : 1** at today's
  .45 (WCAG luminance). Those are the tester's numbers.
- **What stays.** Pop's repertoire search keeps its accepted .45, since B was not taken.
- **The rule.** CLAUDE.md's becomes: "a box whose frame states its placeholder's strength sets it;
  every other placeholder is a hint at .45".

The Evidence lines drift by one on HEAD: the live input is `:26512`–`:26520`, its canvas comment
`:26522`–`:26524`, and the textarea `:26759`.

**Re-checked on HEAD** (`ff4b6f8`, entry 5). JP-120 (gallery) and JP-113 moved the block by about
+44:
- `index.css:120`–`:122` is unchanged.
- `POP_FORM` is at `EncoreSection.jsx:505`, bound to `G.ph` at `:26457`.
- The live input is `:26556`–`:26564`, and its canvas span with the "accepted diff" comment is
  `:26566`–`:26569`.
- The live textarea is `:26803`–`:26811`, and its canvas span `:26812`–`:26815`.
- JP-093's four `'--ph': 1` sites are `:27500`, `:27905`, `:28308` and `:28497`.

**Reproduced in the real app.** This was puppeteer on a HEAD worktree (:5174). Each card was
published, then *Open* at 1440, 768 and 390. The probe read `getComputedStyle(box, '::placeholder')`
on every live box, with the contrast composited over the box's ground:
- **Pop card 1:** all five boxes (*Full name*, *you@email.com*, *dd / mm / yyyy*, *approx.* and the
  message) were **.45 white on `#EE138B`, 1.69 : 1** at every width. That is the tester's number.
- **The controls, card 1, at .45:**
  - Lime: `#15180F` on `#D9FF7F`, 2.87;
  - Grunge: white on `#F52E34`, 1.73;
  - Editorial: `#F6F0E8` on `#C86E52`, 1.75;
  - Retro: 1.96.
- **Pop's repertoire search** was .45 (white on `#9162FF`, 1.93).
- **Pop's cards 2 and 3** (JP-093's three label-in-box inputs) were 1. **Card 4's** boxes, its
  message and the wizard's date cell were .45.
- No page errors.

**The harness was proven first.** The HEAD worktree (:5174) was digested against a fresh tree
server on :5177: every category, themes 0–4, three widths. **0 of 660 on each surface** after the
port and stamp normalisation (168 raw canvas files differed, all on the port). No empty renders.

**Expected after-diff, named before the code: zero** on both surfaces.

**Settled** (2026-10-08).
- **`EncoreSection`, the `s.limeTree` layout-1 form block: two sites, five boxes.** `field()`'s
  live `<input>` draws all four of the seed's inputs, and the message `<textarea>` is the fifth.
  Each adds `...(G.ph && { '--ph': 0.8 })` to its own style.
  - **The gate is `G.ph`**, which Pop's arm of `G` alone sets. So Lime's, Grunge's and Editorial's
    boxes never carry the property.
  - **It stays out of `box()`**, JP-093's rule. The canvas spans draw their placeholder in their
    own `color: G.ph` and carry no dead property. The textarea's goes through `box()`'s `extra` at
    the call site.
  - **No colour change.** The probe read the placeholder's colour as `rgb(255, 255, 255)` (`G.on`,
    `S3.text3`) before and after.
- **Digest** (the HEAD worktree against the tree, every category, themes 0–4, three widths):
  **0 of 660 on each surface**, as named. No empty renders.
- **The positive control: the computed `::placeholder` on the published tab.** The digest cannot
  see it. The same probe ran on :5177: eight cards, three widths, 132 rows.
  - **Exactly 15 rows moved.** These are Pop card 1's four inputs and message at 1440, 768 and 390.
    Each went from 0.45 to **0.8**, with the inline `--ph` 0.8 and a contrast of 1.69 → **3.0 : 1**,
    the frame's.
  - Their placeholder colour and the box's own colour and opacity did not move.
  - **The other 117 rows are identical:**
    - Lime's, Grunge's, Editorial's and Retro's card 1, at .45;
    - Pop's repertoire search, at .45 (B was not taken);
    - Pop's cards 2 and 3, at JP-093's 1;
    - Pop's card 4, at .45.
- **Typed text is unchanged.** Trusted keystrokes went into each of the five boxes at 1440 and 390,
  on HEAD and on the tree. The output was byte-identical: the value white at opacity 1, on the
  same ground and ring, in the same box.
- **The canvas span is unchanged.** The canvas digest, colour column included, is 0.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed; the sweep does that.
- **Docs.**
  - The live input's comment and the canvas span's (*reversed*), and the textarea's.
  - `index.css`'s comment.
  - CLAUDE.md's `--ph` paragraph. The rule is now "a box whose frame states its placeholder's
    strength sets it". It names its two sets and the repertoire search, which stays a hint. So a
    box joins by a call, not by the rule alone.
  - README: the same rule (`:78`–`:83`), and the form's accepted-diff paragraph (`:473`–`:483`).
    The entry did not name README, but *How each session runs* step 5 does.
  - `notes/form.md`: a *reversed* parenthetical after JP-093's.
  - A *reversed* pointer at `layout-1.md:1936`.

Reply: **JP-119 — fixed.** On Pop's *Hero* layout, the Enquiry Form's placeholders on the published
page now draw at the design's strength: white at 80% on the pink boxes, about 3.0 : 1 where they
were 1.7 : 1.
- **What changed:** all five boxes, *Full name*, *you@email.com*, *dd / mm / yyyy*, *approx.* and
  *Tell me about your event…*, at every width.
- **What stays the same:**
  - typed text;
  - the editor's canvas, which already drew 80%;
  - the other templates' *Hero* forms;
  - Pop's repertoire search, which keeps the lighter hint.

---

## JP-112 — the heart covers song 12 when there is no pager

**Verdict: confirmed, and recorded.** Pop's repertoire fit seated the heart **off the content's
foot**, "not the pager — the seeded twelve songs draw no pager at 1440, and the heart stays beside
the list there" (layout-1.md `:1471`–`:1478`; the code comment at `EncoreSection.jsx:12796`–`:12806`).
In the frame (`964:58628`) the content's foot *is* the pager row, and the heart (100.44 × 91) stands
in it, 60.78 in from the right with its foot 9 past.

Without a pager, the content's foot is row 12, so the same offsets put the heart over that row's
artist. The fit's render check at 1440 missed that the artist sits under it. With a 13th song, or at
390 where the pager stands, it is the frame's.

**Evidence.**
- `EncoreSection.jsx:12807`–`:12823`: the `pop &&` layer, the heart at
  `right: calc(padX + u(60.78)), bottom: calc(padY − u(9))` at desktop and not drawn at 768.
- `:13010`–`:13020`: the pager, drawn while `labels.length > 0`.
- `POP_HEART_D` (`:418`).

**Decision.**
- **A (recommended). The list keeps the pager's seat at desktop.** While no pager is drawn, the
  column ends in an empty seat the pager's size. That seat is three parts, each × 0.82: the
  column's gap (`col(u(32))`), the pager wrapper's `paddingTop: u(8)`, and the pager's own height.
  Reserve less and the heart still touches row 12. So the heart stands beside the rows' foot as
  drawn, and the section is the frame's height. The
  cost is a pager-high band under twelve songs: the frame's picture without its pills. It also
  lengthens the Repertoire → Shows gap toward the frame's (JP-116, below).
- **B. The heart is not drawn while there is no pager** (desktop alone; 390 keeps it).
- **C. The heart hangs in the root's foot padding**, seated off the rows' foot plus the pager's row,
  and the root's own clip cuts whatever runs past.

**Expected after-diff (on A).** Repertoire `arch 0` × Pop × desktop, both surfaces (1 file a
surface): the root grows by the pager row, and the heart moves down by it. The rows do not move.
With `n=240` (a pager): 0. Themes 0–3: 0.

**Verify.** The published 1440 with 12 songs: no song row's text under the heart (each row's
artist `Range` clear of the heart's box), and the heart beside the rows' foot as in the frame. With
13 songs and with 240: the heart in the pager row, as HEAD. At 390 unchanged; at 768 still not
drawn. The pager's discs still hit-test to themselves.

**Docs.** The layer's comment (*reversed*). A *reversed* pointer at layout-1.md `:1471`.

**Re-checked on HEAD** (`40c1041`, entry 6). The layer's comment is `:12795`–`:12806` and the `pop &&`
layer `:12807`–`:12823`. The pager is `:13010`–`:13020`, inside `paddingTop: u(8)`, and the column's
gap `col(u(32))` is at `:12794`. `POP_HEART_D` is at `:426` (the triage said `:418`).

**Reproduced in the real app.** Puppeteer on the HEAD worktree (:5174): Pop card 1, Publish, Open,
the songs written through the fiber `st` dispatch. All numbers are tab px off the repertoire root's
top-left, and the desktop is zoomed 1.22.
- **1440, the seeded 12:** there is no pager. The heart is at y 816.1–907.1 and x 1222.7–1323.2,
  and the rows' foot is 898.1. **Row 12's pill and its "· AMY WINEHOUSE" Range are under the heart**,
  the tester's picture. The root is 995.7.
- **1440, 13 and 240 songs:** the pager stands at 930.1–992.2. The heart is at 910.2–1001.2: 12.1
  below the rows' foot and its own foot 9.0 past the pager's (7.4 × 1.22), the frame's. No row is
  hit. The root is **1089.8, so the pager's seat is 94.1** (26.2 + 6.6 + 44.3 on the canvas, × 1.22:
  the column gap, the wrapper's 8 and the pager's 54).
- **6 songs at 1440 reproduces it too** (row 6's pill and artist). So the condition is *no pager*,
  not *twelve*. A live chip or search that leaves one page is the same state.
- **768:** no heart at any count.
- **390:** the pager stands at 12, 13 and 240 songs, and the heart runs over the → disc (and the
  last page pill at 13 and 240), as the master draws it. Every disc hit-tests to itself at three
  inner points.
- **390 with 6 songs** (off the seed: the narrow page holds 6, so no pager): the heart's top crosses
  the last pill's lower-right ring by 12. No text is under it.
- No sideways scroll anywhere. No page errors.

**The harness was proven first.** The HEAD worktree (:5174) against a fresh tree server (:5177),
every category, themes 0–4, three widths: **0 of 660** on the canvas and on `live=1`. The repertoire
at `&n=240`, themes 0–4, three widths: **0 of 60** on each surface. No empty renders.

**Decided** (user, 2026-10-08): **A**, and **390 is left as is**.
- **The desktop keeps the pager's seat.** While no pager is drawn, the column ends in an empty seat
  of the pager's size: the column's gap, the wrapper's `paddingTop: u(8)` and a `u(54)` box. The gate
  is `pop && !s.narrow && labels.length === 0`, not a count, so it covers 12 songs or fewer, a live
  chip or search that leaves one page, and the empty list's "No songs match that.".
- **The section grows by the seat**, 995.7 → 1089.8 in the tab, the 13-song height. The heart lands
  where it stands with 13 songs. The rows do not move.
- **390 with 6 songs or fewer keeps the 12 over the ring.** No text is covered, it is the overlap the
  master draws over the → disc, and the seed always pages there.
- **JP-116** re-measures the Repertoire → Shows seam afterwards. The section's box grows by 94.1, and
  the heart's foot stays 9 past the content's foot.

**Expected after-diff, named before the code:**
- `cat_repertoire_arch_0_theme_4_w_desktop`, on the canvas and on `live=1`: **1 file a surface**. The
  root grows by the seat, the heart moves down by it, and the seat's two rows appear (the wrapper and
  its box). The rows do not move.
- `&n=240`: **0** (the pager stands).
- Themes 0–3: **0**. 768 and 390: **0**.

**Settled** (2026-10-08).
- **`EncoreSection`, the `s.limeTree` repertoire block: one sibling after the pager.** It reads
  `pop && !s.narrow && labels.length === 0` and draws `<div aria-hidden style={{ paddingTop: u(8) }}>`
  round a `u(54)`-tall box: the pager's own wrapper and the height of its row. The column's
  `col(u(32))` gap comes with it as a flex child.
  - The structure mirrors the pager rather than summing one height, so the border-box reset cannot
    shrink it, and the seat is the pager's box to the 1/64 px: 50.9 on the canvas, round a 44.3 box.
  - The heart's layer is unchanged. It still reads `s.padY`, and the content's foot is now the
    pager's row in every desktop state.
  - The pager's own block is untouched, so every paged render is byte-identical.
- **Digest** (the HEAD worktree :5174 against the tree :5177, every category, themes 0–4, three
  widths): **1 of 660 on the canvas and 1 of 660 on `live=1`**, the named
  `cat_repertoire_arch_0_theme_4_w_desktop`. Inside it:
  - the root and its content box grow by 77.1 (815.1 → 892.2);
  - the heart moves 668 → 745;
  - the seat's two rows appear (761.3, 50.9 tall; 767.9, 44.3);
  - every other row is unchanged.
  The repertoire at `&n=240`: **0 of 60** on each surface. No empty renders.
- **The real app, Pop card 1, Publish, Open** (:5177; tab px off the root, zoom 1.22):
  - **1440, the seeded 12:** the root is **1089.8** and the heart **910.2–1001.2**, both exactly the
    13-song values. The rows' foot is unchanged at 898.1, so the heart is 12.1 below it, beside the
    rows as in `964:58628`. **No song row's title, artist Range or pill is under the heart.**
  - **13 and 240 songs:** byte-identical to HEAD, with the heart in the pager row.
  - **6 songs at 1440:** +94.1 (681.3 → 775.4) and clear.
  - **768:** no heart, unchanged. **390:** unchanged at every count, including 6 songs' 12 over the
    ring (decided).
  - **The live states, 13 songs at 1440:** each chip that leaves one page (Weddings 7 rows, Pubs 5,
    Birthdays 7) and a search that matches nothing draw the seat. The heart is 12.1 below the rows'
    foot, or under "No songs match that.", in every one.
  - **Hit-tests:** every pager disc at 1440, 768 and 390 hit-tests to itself at three inner points,
    the → disc under the 390 heart included. No sideways scroll at any width. No page errors.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed; the sweep does that.
- **Docs.**
  - The layer's comment (*reversed*) and the seat's own comment.
  - A *reversed* pointer at `layout-1.md:1480`.
  - No `notes/`, CLAUDE.md or README line states the old seat. `notes/templates.md:312` and
    README `:652` only list the heart as a sticker.
- **For JP-116.** Pop's repertoire root at desktop under the seed is now **94.1 taller in the tab**
  (77.1 on the canvas). So the Repertoire → Shows seam is measured on this tree, not on the
  triage's numbers. The heart's layer still reads `s.padY` (`:1258`'s double-count trap stands). The
  map's missing pager (`:1251`, `:1288`) is unanswered: JP-112's call was Pop's repertoire alone.

Reply: **JP-112 — fixed.** On Pop's *Hero* layout at desktop, the Repertoire keeps the pager's row
even when there is only one page of songs. The teal heart stands in that row, beside the last row of
songs, as the design draws it, and no longer covers *· AMY WINEHOUSE*.
- **What changed:** with 12 songs or fewer, or when a filter chip or the search leaves a single
  page, the section is as tall as it is with a pager (about 94px more at 1440). The heart sits where
  it does with 13 songs.
- **What stays the same:**
  - with 13 songs or more the page is unchanged;
  - tablet still draws no heart;
  - mobile is unchanged, the heart over the → button as designed.

---

## JP-117 — the map's scribble sits under MANCHESTER, not across it

**Verdict: confirmed, and recorded.** The fit kept the frame's offsets, (208.68, 27.91) from the
heading's text box × 0.82, and found the scribble "sweeps under the tail of the Titan word and
touches its foot, which is the page's idiom … so it was not re-anchored" (layout-1.md
`:1564`–`:1570`). But the offsets were measured on a box that is **a leak**. The frame sets this
heading in **Bebas Neue 130** (Lime's mode, a box 528 × 116), where the build sets Titan at Pop's
Display/LG (82, a box of 73). So the same offsets land the stroke under a shorter word.

**The frame's relation, read at triage** (`964:58629`, `absoluteRenderBounds`):
- The heading's ink is 519.65 × 93.08 (the cap). The scribble's ink (`I964:58629;446:6437`) is
  410.85 × 74.20, turned −3.98°.
- **Its top is 43.57 below the cap's top, 0.468 of the cap**, and its foot runs **24.69 past the
  baseline, 0.265 of the cap**.
- It starts **198.68 into the word's ink, 0.382 of its width**, and ends 89.9 past the word's end.

So it crosses the lower half of the letters, as the tester says.

**Evidence.**
- `EncoreSection.jsx:20082`–`:20096`: `scribble()`, the turned box and its comment.
- `:20100`–`:20103`: the `h2`, lifted `top: −0.14em`.
- `:20126`–`:20131`: the Pop-only wrapper and the desktop call.
- `:20132`–`:20137`: the 390 call under the radius label, which stands.
- layout-1.md `:1577`–`:1581`: the heading's leaked boxes.

**Decision.**
- **A (recommended). Re-anchor the scribble to the Titan word's ink, by the frame's fractions**:
  its ink top 0.468 of the cap below the cap's top, starting 0.382 into the word. Set it in ems of
  the heading, so it follows the size. 768 (not drawn) and 390 (under the radius label) are
  unchanged.
- **B. A reply**: the recorded call, the page's own idiom (the hero's scribble and this frame's 390
  one sit under their heads).

**Expected after-diff (on A).** Map `arch 0` × Pop × desktop, both surfaces (1 file a surface): the
scribble's svg box alone. Themes 0–3, and Pop at 768 and 390: 0.

**Verify.** On the published 1440, the scribble's ink against the heading's (`Range` and the svg's
own box, or a pixel scan of `#C6F200` on the headless canvas): the top at 0.47 of the cap ± 2px,
starting 0.38 into the word. A screenshot beside the frame's, for the user. The seeded *Manchester*
and a long typed heading: the scribble stays inside the root, and the root's clip does not cut it.

**Docs.** The `scribble()` comment. A *reversed* pointer at layout-1.md `:1564`.

**Decided** (user, 2026-10-08): **A.** The scribble is re-anchored to the Titan word's ink by the
frame's fractions: its ink top sits 0.468 of the cap below the cap's top, and it starts 0.382 into
the word's ink. Both are set in ems of the heading, so they follow its size. 768 (not drawn) and 390
(under the radius label) are unchanged. This reverses layout-1.md's "not re-anchored" call
(`:1564`–`:1570`).

**Nothing was measured in entry 1.** The fractions are the frame's, read at triage (`964:58629`).
Entry 7 takes every number on HEAD before writing code: where the stroke's ink sits today against
the Titan cap, and the turned box's offsets that the fractions imply.

**Re-checked on HEAD** (`db4c109`, entry 7). The triage's lines had drifted by +61. `scribble()`'s
comment and definition are `:20143`–`:20157`, `POP_MAP_SCRIBBLE_D` is at `:444`, the `h2` (lifted
`top: −0.14em` under Pop) is `:20161`–`:20164`, the Pop-only wrapper and the desktop call
`!s.narrow && scribble(u(208.68), u(27.91), z)` are `:20188`–`:20191`, and the 390 call under the
radius label is `:20195`–`:20199`. `designCount('map')` is 4, the digest's four map layouts, so
`arch 0` alone renders design 0.

**Reproduced in the real app.** This was puppeteer on a HEAD worktree (:5174): Pop card 1, Publish,
Open. Every scan isolates one node: the map root is hidden for the reference, then only the `h2` is
shown, then only the svg. Each is clipped at 4× and read at 50% coverage. The desktop tab is zoomed
1.2203.
- **1440, the seed:** the Titan word inks 555 × 58.5 tab px (454.8 × 47.9 on the canvas). **The
  stroke's ink tops 0.962 of the cap below the cap's top**, 2.2 px above the baseline, and starts
  0.362 into the word. Its foot runs 1.23 of the cap past the baseline, and it ends 0.103 of the
  width past the word's end. So it sits under the word, the tester's picture. The frame's are 0.468
  and 0.382.
- **768:** no scribble. **390:** the svg at (59.06, 16.46) under the radius label.
- No sideways scroll and no page errors.

**What the fractions imply, measured before the code** (canvas px off the `h2`'s wrapper, the
heading at 65.66):
- **The turned path's own ink** (`getPointAtLength` over `POP_MAP_SCRIBBLE_D`, turned +3.98° about
  the box's corner) is 410.85 × 74.22 viewBox units, the frame's 410.85 × 74.20. So the path and the
  turn are the frame's. Its ink starts 4.93 left of the box's corner and tops 27.59 below it.
- **The seeded word** inks x 2.66 → 457.45 and y −0.78 → 47.16, the 0.14em lift included. In ems
  that is 0.0406 → 6.9670 across and −0.0119 → 0.7182 down.
- So the frame's relation puts the stroke's ink corner at (176.39, 21.65) = **(2.686em, 0.330em)**,
  and the box's corner at (180.4, −0.97), where HEAD has it at (171.1, 22.9).

**The harness was proven first.** The HEAD worktree (`db4c109`, :5174) against a fresh tree server
(:5177), every category, themes 0–4, three widths: **0 of 660** on the canvas and **0 of 660** on
`live=1`. No one-row renders.

**Expected after-diff, named before the code:**
- `cat_map_arch_0_theme_4_w_desktop`, on the canvas and on `live=1`: **1 file a surface**. Inside it
  are exactly the `svg` and `path` rows, whose x and y move. Their size and the matrix do not, nor
  does the `h2` or the wrapper.
- Themes 0–3: **0**. Pop at 768 and 390: **0**.

**Settled** (2026-10-08).
- **`EncoreSection`, the `s.limeTree` map block: the desktop call alone.** It is now
  `scribble(calc(fs × 2.686 + u(4.93)), calc(fs × 0.33 − u(27.59)), z)`, where `fs` is
  `faced(s, s.dispLg)`, the `h2`'s own size string.
  - The ems are the heading's through that string. The svg's parent is the wrapper, whose font is
    the section's 16px, so a bare `em` would be wrong by 4×. A `fontSize` on the wrapper would add
    a row to the diff.
  - `scribble()` and the 390 call are untouched, so the 390 box is byte-identical.
  - The size stays the frame's × 0.82, as the decision fixed only the top and the start.
- **Digest** (the HEAD worktree :5174 against the tree :5177, every category, themes 0–4, three
  widths): **1 of 660 on the canvas and 1 of 660 on `live=1`**, the named
  `cat_map_arch_0_theme_4_w_desktop`. Inside it, the `svg` and `path` rows move (271.6, 127) →
  (280.9, 103.2): +9.3 and −23.8. They stay 338.6 × 100.9 under the same matrix. Every other row is
  unchanged (the port normalised). No one-row renders.
- **The real app, Pop card 1, Publish, Open** (:5177, 4× scans):
  - **1440, the seed: the ink tops 0.466 of the cap below the cap's top and starts 0.3815 into the
    word**, 0.13 and 0.25 tab px off the frame's 0.468 and 0.382. The root (988.7) and the `h2` are
    unchanged.
  - The stroke keeps the frame's size against the smaller Titan cap. So **its foot runs 0.735 of the
    cap past the baseline (the frame's 0.265), and it ends 0.123 of the word's width past the word's
    end (the frame's 0.173)**. The lower arm reads further below the word than in the frame. That
    is the decision's consequence, not a slip.
  - **768:** still none. **390:** the svg box byte-identical to HEAD's.
  - **Typed headings at 1440** (written through the fiber `st` dispatch into the map's `heading`):
    *Maximilian Featherstonehaugh*, *Supercalifragilistic*, *Florence and the Machine*, *Manchester,
    Liverpool, Leeds and Sheffield* and *Leeds*.
    - The stroke keeps its em offsets off the heading's start, so on a two-line heading it crosses
      the first line.
    - It stays inside the root (tab x 271.0–682.3 in 1440; the root's overflow is visible, so
      nothing clips it) and clear of the radius label (from x 1227.5).
    - There is no sideways scroll.
    - A short word (*Leeds*) leaves it running past the word's end, as the seed's offsets imply.
  - **The editor's 1088 Desktop canvas** (1440 window, header panel open): the `h2` at 65.66 and the
    svg's `left` / `top` at 180.363 / −0.932, the published tab's unzoomed values. The word's Range
    in the wrapper is identical. The svg's right edge (559.5) is clear of the radius label (913.9).
  - **The comparison shot**, the frame `964:58629` (`get_screenshot`) over HEAD's and the tree's
    published 1440, cropped off each kicker's corner, was shown to the user.
  - No page errors.
- **Named, not fixed (for the sweep).** At 390 a long single-word map heading scrolls the page
  sideways: *Supercalifragilistic* to 433, *Maximilian Featherstonehaugh* to 416. HEAD does the same.
  The heading does not break inside a word. It is not the scribble's: the 390 call is unchanged. The
  shared `s.limeTree` block's `h2` sets no `overflowWrap`, so the twins likely do the same; they
  were not probed.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed; the sweep does that.
- **Docs.**
  - The `scribble()` comment (*reversed*): the 390 anchor kept, the desktop relation and its numbers
    written out.
  - A *reversed* pointer under layout-1.md's scribble bullet (`:1570`).
  - No `notes/`, CLAUDE.md or README line states the anchor. `notes/templates.md:312` and README
    `:653` / `:666` only list the scribble as a sticker. The block comment's "a lime scribble
    crosses the heading at 1440" is now true as written.

Reply: **JP-117 — fixed.** On Pop's *Hero* layout at desktop, the lime scribble now crosses the
lower half of MANCHESTER, as the design draws it, instead of running under the word.
- **What changed:** the stroke is placed by the design's own relation to the word. Its top sits
  about halfway down the letters and it starts about 38% of the way into the word. It is set
  relative to the heading's size.
- **What stays the same:**
  - tablet draws no scribble, as before;
  - mobile is unchanged, the scribble under *12 MILE RADIUS*.
- **One difference from the frame, by design:** the stroke keeps the design's size, while the
  build's heading face is shorter than the frame's (the frame renders this heading in Bebas, a mode
  leak). So its lower arm reaches further below the word than in the frame.

---

## JP-114 · JP-115 — the logo wraps on the seed, and a long name wraps the nav

**Verdict: confirmed, and recorded as JP-091's rule at work.** Pop's header fit recorded the seed's
two lines as designed: "The seeded nine links (the frame has eight — no Availability) sit at the
12px floor on the 1180 canvas and the name wraps to two lines at 16 — JP-091's designed 'the name
gives way first'" (layout-1.md `:1079`–`:1085`).

The tester's 77px is `fitBox`'s `maxWidth: max(room, two × size)` (`EncoreSection.jsx:892`), which
is **the room** JP-091 leaves the name: the capsule, less the mark and its gaps, the pill, and the
nine links at their floor (`:1917`).

Two things make the room this small under Pop. The session confirms both numerically before asking:
- **(a) Pop's cap sits above its own size, so the name never shrinks on one line.** `fitName` is
  `min(own, max(floor, room / one, min(cap, room / two)))` (`:887`). Under Pop the name's own size
  is `s.list` 16.4 and its two-line cap 18.45 (`:1918`; the name stands at line 1.2). So whenever
  one line misses the room, `min(cap, room / two)` beats `room / one`, and the name keeps 16.4 on
  two lines. Under Editorial (26.2 against a 20.1 cap) the same rule shrinks on one line first,
  which is why its seed stayed one line.
- **(b) The room is mostly the ninth link.** *Availability* is on the seeded page and in no frame's
  nav (`notes/nav.md:23`–`:26`, user call, 2026-09-18). Titan's widths run 1.2% wide of Chunko's
  (JP-111), too little to matter. The frame's eight links at 13.12 and its name at 16.4 fit one
  row; the build's nine at 12 do not leave the name its line.

**JP-115 is JP-091's documented last resort.** When even the best two-line split at the 12px floor
is wider than the room, the name's box grows to it and the links wrap. That fires on Editorial only
for a 34-letter word, and under Pop's ~77 for *Florence and the Machine* (two lines at 12 ≈ 85).

**Evidence.**
- `EncoreSection.jsx:1880`–`:1990`: `NavBar`. The desktop `fit` is at `:1916`–`:1919`, the links'
  clamp `clamp(12px, 100cqi / navEms, labelSm)` at `:1980`–`:1989`, and the gap `23/16 em` under
  `sm`.
- `:887`–`:893`: `fitName` / `fitBox`. `:895`: `Wordmark`'s Pop arm (`s.list`, line 1.2).
- `EncoreBuilder.jsx:759`: `vm.navEms`. `:800`–`:811`: `vm.navNameFit`.
- `data.js:771`: `TITAN_EM`.
- [`../editorial/qa-fixes.md`](../editorial/qa-fixes.md) JP-091, its *Measured* (`:1054`) and
  *Settled* (`:1132`), the method to follow.

**First step, before any decision: measure** (JP-091's method), on the published tab at 1180, 1440
and 1920 and on the canvas at 1180 **and 1088**:
- the capsule's inner width, the mark, the pill, and the nine links' ems (`s.navEms`) and their
  width at the 12px floor;
- the room that leaves the name, and what *Kai Mercer* needs on one line at 16.4;
- the same with **eight** links (no Availability) at the frame's 13.12, to confirm (b);
- the long-name set (*How each session runs*, step 4) under Pop, and under Lime, Grunge and
  Editorial as controls.

From that, the longest name one row holds at the floor. Record it in the entry, then ask.

**Decision (after measuring).** The lever for both tickets is the room or the cap:
- **A. Under Pop, prefer one line**: the cap at or below the name's own size, so the name shrinks on
  one line before it takes two. *Kai Mercer* then sets on one line at about `room / one`. This fixes
  JP-114's look alone.
- **B. A lower link floor under Pop at layout 1.** JP-091's C, rejected for Editorial on its numbers.
  Remember the zoom: 11px on the canvas is 13.4 in a 1440 tab, and 10.5 is 12.8. It grows the room
  by `navEms × Δ`, and helps both tickets.
- **C. The name's own floor below the links'** (10, say) before the links wrap. This is for JP-115's
  single long words, which no room holds at 12.
- **D. The burger at desktop** when the row cannot hold the links at their floor (JP-091's B).
- **E. Drop *Availability* from the seeded nav.** This reverses the 2026-09-18 user call on every
  template. Not recommended.

The recommendation waits on the numbers. The likely shape is B, then A if the room still misses
*Kai Mercer* on one line, then C for words no room holds.

**Expected after-diff.** Named after the decision. The header `arch 0` × Pop × desktop alone on the
seed under A or B. 768, 390 and themes 0–3: 0 (Pop's arm only). Layout 4's capsule (`links`) is
untouched.

**Verify.** The long-name set at 1088, 1180, 1440 and 1920 on Pop card 1:
- the links on one row;
- nothing past the capsule;
- the pill on the row;
- the name clear of the nav and never broken inside a word;
- the bar's height unchanged (60.64).

Lime, Grunge and Editorial card 1 are byte-for-byte HEAD.

**Docs.** The `fit` comment in `NavBar` and `fitName`'s. `notes/nav.md`'s JP-091 bullet. A
*reversed* pointer at layout-1.md `:1085`.

**Measured** (2026-10-08, on HEAD `005f95a`).
- **Every *Evidence* line held**, with one correction. `fitName` `:887`, `fitBox` `:890`, `Wordmark`
  `:895`; `NavBar` `:1880`, its `floor` `:1890`, the desktop `fit` `:1916`–`:1919` (the cap
  `:1918`); `vm.navEms` `:759`, `vm.navNameFit` `:801`–`:808`; `TITAN_EM` `:771`. The links'
  clamp is **`:1987`**; `:1984` is layout 4's `links` clamp.
- **How.** A scratchpad puppeteer probe on the HEAD worktree (:5174), card 1 of Pop, Lime, Grunge
  and Editorial.
  - For each name, the header's `title` was written through the fiber `st` dispatch, and the
    tab's `<title>` read back as the name, so the key took.
  - The editor's Desktop canvas was read (1088 in a 1440 window, the header's panel open). Then
    Publish → Open, and the popup was read at 1180, 1440 and 1920.
  - Every width is in layout px (a rect ÷ the zoom). Every line is read off per-character
    `Range`s.
  - The arithmetic beside it, off `data.js`'s em tables, lands on the measured room to 0.02.
- **Two of the entry's numbers are the frame's, not the build's.** `THEME_RAMP.Pop.desktop` rounds
  the frame's 20 and 16 × 0.82: `list` is **16** and `labelSm` **13**. So the name's own size is 16
  (15.68 faced) and the links' cap 13 (12.74). The two-line cap, 18.45 (44.28 / 2.4), is as
  stated.
- **The capsule.**
  - Inner **1063.4** × 44.27 at 1180 and 1440 (1062.75 at 1920), **971.4** on the 1088 canvas. The
    bar is 60.64 everywhere.
  - Pop's fixed boxes: the mark 29.5, its 11, the halves' 24.6, the pill's 19, and the pill
    **155.45** (its BOOK NOW label 88.2 at 15.68).
  - **The nine links are 62.185 Titan em** (× 0.98, gaps 23/16 em, the 1% spare), so **746.2px at
    the 12px floor**.
  - **That leaves the name 77.14 at 1180** (the measured box 77.16, the tester's 77), and
    **−14.9 on the 1088 canvas**.
- **What *Kai Mercer* needs:** 6.156 em on one line, so **98.5 at 16** (101 at the frame's 16.4).
  Its best split is MERCER, 4.145 em, so 66.3 at 16 on two lines.
- **The longest name one row holds at the floor, at 1180:** 4.77 Titan em on one line at its own
  16, or two lines whose wider one is 6.36 em at 12. *Kai Mercer* fits only on two lines.

  | Name | Pop, 1180 / 1440 / 1920 | Pop, 1088 canvas | Editorial, 1180 / 1440 / 1920 |
  |---|---|---|---|
  | Kai Mercer | 16, KAI / MERCER; links 1 row at 12.01 | 12, 2 lines; **Reviews** wraps | 16.78, 2 lines; links 1 row (1088: 12, Reviews wraps) |
  | Florence and the Machine | 12, FLORENCE AND / THE MACHINE; **Reviews** wraps | 12; Enquiries, Reviews wrap | 12, 2 lines; **Reviews** wraps |
  | The Chemical Brothers | 12, 2 lines; links 1 row (box 87.7 > room, absorbed by the 1% spare) | 12; Enquiries, Reviews wrap | 12, 2 lines; **Reviews** wraps |
  | Maximilian Featherstonehaugh | 12, 2 lines; **Reviews** wraps | 12; Enquiries, Reviews wrap | 12, 2 lines; **Reviews** wraps |
  | Supercalifragilistic | 12, 1 line; **Reviews** wraps | 12; Enquiries, Reviews wrap | 12, 1 line; **Reviews** wraps |

  - **Lime and Grunge hold one row with all five names**, at 1180–1920 and on the 1088 canvas.
    Lime's name stays 26 on one line (the links 15.7–20). Grunge's stays 22.125 (the links
    17.07–20), and on the canvas *Florence* shrinks to 21.07 and *Maximilian* to 17.46.
  - Everywhere: the bar 60.64, nothing past the capsule, the pill on the row, no word broken, and
    the tab's title the name.
- **(a) is true, but it is not the lever.** At 1180 *Kai Mercer*'s one-line size is room / one =
  **12.53**, and its two-line size is min(18.45, room / two = 18.61). So the rule sets two lines at
  its own 16.
  - A cap at or below 16 changes nothing: two lines at 16 (or at the cap) still beat 12.53.
  - Only a cap under 12.53 lets one line win, and then the name sets at 12.5, the links' own
    size.
  - Under Editorial in Noto (JP-091) one line won because room / one stayed above the 20.1 cap.
- **(b) is confirmed by a render.** With the calendar dropped (the frame's eight links), the seed
  sets **KAI MERCER on one line at 16** with the links at their 13 cap, at 1180, 1440 and 1920.
  - On the 1088 canvas it takes two lines at 16, with the links one row at 12.
  - *Florence* sets two lines at 16, with the links one row at 12.01.
  - By the numbers: *Availability* is 8.54 em, 102.5px at 12. The frame's eight at 13.12 are
    703.8, which leaves 119.5 against the 101 its name needs at 16.4.
- **The levers, by the numbers** (Pop's nine links; nominal sizes at 1180 / on the 1088 canvas;
  *wraps* = the name's box grows past the room, so the links take a second row):

  | Lever | Room | Kai Mercer | Florence | Chemical | Maximilian | Supercali |
  |---|---|---|---|---|---|---|
  | HEAD, floor 12 | 77.1 / −14.9 | 16, 2 lines / wraps | wraps | 12, 2 lines (spare) / wraps | wraps | wraps |
  | **B, floor 11.5** | 108.2 / 16.2 | **16, 1 line** / wraps | 14.31, 2 lines / wraps | 14.81, 2 lines / wraps | wraps | wraps |
  | **B, floor 11** | 139.3 / 47.3 | **16, 1 line** / 11.42, 2 lines | 16, 2 lines / wraps | 16, 2 lines / wraps | 12.1, 2 lines / wraps | 11.72, 1 line / wraps |
  | **B, floor 10.5** | 170.4 / 78.4 | **16, 1 line** / 16, 2 lines | 16, 2 lines / wraps | 16, 2 lines / 10.73 | 14.8, 2 lines / wraps | 14.34, 1 line / wraps |
  | A, cap 16 / 14 / 12.6 | 77.1 | 16 / 14 / 12.6, **2 lines** | wraps | wraps | wraps | wraps |
  | C, the name's floor 10 (links 12) | 77.1 | 16, 2 lines | 10.2, 2 lines | 10.56, 2 lines | wraps | wraps |

  - **At 11 the links render 10.78 on the canvas and 13.15 in a 1440 tab.** Today they are 11.76
    and 14.35, and the frame's are 16.
  - **The longest name one row holds at 11 (1180):** 8.62 Titan em on one line at 16, or a
    two-line split whose wider line is 12.54 em, which is a single word of about 18 letters.
- **Named, not fixed here.**
  - **Editorial is in Pop's position on HEAD.** Its nine Gloock links are 59.979 em, 719.7 at 12,
    which leaves the name **70.87**.
    - The seed's two lines at 16.78 are a user call (`../editorial/display-face.md` `:423`,
      2026-10-05).
    - **But all four long names now wrap *Reviews* at 1180–1920.** That is JP-115 under Editorial.
      JP-091's settled rows (*Florence* at 20.1 on two lines, the links at 12.01) held in Noto, and
      have not held since the Gloock swap. Nobody recorded it.
  - **On the 1088 canvas both seeds already wrap *Reviews***: Pop's and Editorial's name sits at
    the floor on two lines.
  - **Pop's layout-4 capsule shares `floor`.** It passes no `links`, so it reads the same clamp,
    and its seed wraps *Reviews* (`../pop/layout-4.md`, open question 10). A lower floor has to be
    gated to design 0 at desktop, or it moves layout 4 too.

**Decided** (user, 2026-10-08, over the numbers above):
1. **B: a lower floor.** Under Pop, in layout 1's capsule at desktop, the links' floor drops to
   **11px**. The name's floor is the links' own, as in JP-091, so it drops with them.
   - The links render 10.78 on the canvas and 13.15 in a 1440 tab.
   - At 1180–1920 the seed sets KAI MERCER on one line at its own 16 (JP-114). Every name in the
     set holds the links on one row (JP-115).
   - This reverses Pop's header fit, "the name wraps to two lines at 16" (layout-1.md `:1085`).
   - A is out by the numbers. D and E were not taken.
2. **The floor is 11**, not 11.5 (which leaves both single words wrapping) or 10.5.
3. **No C.** A word too long for the room at 11 keeps JP-091's documented last resort: the name's
   box grows to it, and the links wrap. That is a single word past about 12.5 Titan em, roughly 18
   letters; none in the set.
4. **Pop alone.** Lime's, Grunge's and Editorial's card 1 stay byte-for-byte HEAD. Editorial's
   long-name wrap under Gloock is named above, and goes into the sweep's reply for its own ticket.
   Layout 4's capsule, 768 and 390 are untouched.

**Expected after-diff, named before the code.** The new floor is gated to Pop's desktop design 0,
which header arch 4 folds onto (`designCount('header', 'Pop')` is 4).
- **The seed:** `cat_header_arch_0_theme_4_w_desktop` and `cat_header_arch_4_theme_4_w_desktop`,
  on the canvas and on `live=1`, so **2 files a surface**.
  - The room grows 77.14 → 139.33, so the name sets KAI MERCER on one line at 16 (15.68). Its
    row's width and height move, and so does the left half's width.
  - The nav narrows by the name's growth: about 746.7 → 726.3. So the links' row size goes
    12.008 → about 11.68 (11.45 faced), and every link's x, width and size moves.
  - The capsule, the glass, the pill and the bar's 60.64 do not move.
- **The `&name=` renders** (header, themes 0–4, three widths, both surfaces): the same 2 files a
  surface for each long name, and nothing else.
- **Every other render is 0:** themes 0–3, Pop at 768 and 390, Pop's header arch 1, 2, 3 and 5,
  and every other category.

**The harness was proven first.** The HEAD worktree (`005f95a`, :5174) was diffed against a fresh
tree server (:5177). Every category, themes 0–4, three widths: **0 of 660 on the canvas and 0 of
660 on `live=1`**. The `&name=` header renders, for each of the four long names (themes 0–4, three
widths, both surfaces), were **0 of 90** each. No one-row renders.

**Settled** (2026-10-08).
- **Code: `NavBar`'s `floor`, one line.**
  - It is now `s.grunge ? 16 : pop && s.v0 && !s.narrow && !links ? 11 : 12`.
  - Its two desktop readers move together: the `fit`'s `room` and `floor`, and the links' clamp
    (`:1987` before the edit).
  - The 390 `narrow` fit reads it under `s.mob`, where the gate is false. Layout 4's capsule is
    `s.v3`. So both keep 12.
  - The cap, 18.45, is untouched. By the numbers it was never the lever.
- **Digest** (HEAD :5174 against the tree :5177): **2 of 660 on the canvas and 2 of 660 on
  `live=1`**, the named `cat_header_arch_0_theme_4_w_desktop` and `…_arch_4_…`.
  - Each `&name=` set is **2 of 90** on each surface, the same two renders.
  - Inside the seed's file, exactly the named rows move:
    - the left half and the wordmark's row (117.7 × 38.4 → 138 × 29.5);
    - the name (77.2 × 38.4 → **97.5 × 19.2, one line**, still 15.68);
    - the right half and the nav (746.7 → 726.4);
    - the links' row (12.008 → 11.68) and every link (11.77 → 11.45 faced).
  - The capsule, the mark, the glass, the pill and the root do not move. No one-row renders.
- **The real app** (the same probe on :5177, Pop card 1; nominal sizes):

  | Name | 1180 / 1440 / 1920 | 1088 canvas |
  |---|---|---|
  | Kai Mercer | **16, KAI MERCER on one line**; links 11.68, one row | 11.42, KAI / MERCER; links one row at 11.01 (HEAD: Reviews wrapped) |
  | Florence and the Machine | **16**, FLORENCE AND / THE MACHINE; links 11.01, **one row** | 11; Reviews wraps |
  | The Chemical Brothers | **16**, THE CHEMICAL / BROTHERS; links 11.01, one row | 11; Reviews wraps |
  | Maximilian Featherstonehaugh | **12.1**, MAXIMILIAN / FEATHERSTONEHAUGH; links 11.01, **one row** | 11; Enquiries, Reviews wrap |
  | Supercalifragilistic | **11.72, one line**; links 11.04, **one row** | 11; Enquiries, Reviews wrap |

  - At 1920 the capsule is 1062.75, so *Maximilian* sets at 12.04 and *Supercali* at 11.67.
  - **Every reading passes:**
    - the links on one row at 1180–1920;
    - nothing past the capsule;
    - the pill on the row (x 924.4–1079.8, top 8.19, 44.27 tall);
    - the name clear of the nav by 36.5 at least, and never broken inside a word;
    - the bar 60.64;
    - the tab's title the name;
    - no sideways scroll and no page errors.
  - **Lime, Grunge and Editorial card 1: 60 of 60 readings identical to HEAD.**
  - **The 1088 canvas, named:** the seed's links now hold one row, where HEAD wrapped *Reviews*.
    The long names still wrap there (Decided, 2).
  - Clips of the capsule at 1440 and on the 1088 canvas, HEAD against the tree, with the seed and
    *Florence*, were read and handed to the user. They are not kept.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed; the sweep does that.
- **Torn down:** :5174, :5177 and the HEAD worktree (`git worktree remove --force`). :5173 is the
  user's, and :5175 and :5176 belong to other jobs; all three still run.
- **Docs.**
  - The `floor` comment in `NavBar` (new). The `fit` comment says why the cap is not the lever.
    The links' clamp comment and `fitName`'s comment name the 11.
  - `notes/nav.md`: a paragraph under JP-091's bullet, covering Pop's floor and Editorial named.
    "A 34-letter word under Editorial" now reads "in Noto".
  - A *reversed* pointer under layout-1.md's nav bullet (`:1087`).
  - No CLAUDE.md or README line states the floor.

Reply: **JP-114 · JP-115 — fixed.** On Pop's *Hero* layout at desktop, the header now holds the
name and the menu on one bar:
- **JP-114:** *KAI MERCER* sits on one line at its design size, as in the frame.
- **JP-115:** a long name no longer pushes REVIEWS onto a second row. *Florence and the Machine* and
  *The Chemical Brothers* wrap onto two lines at the logo's size. *Maximilian Featherstonehaugh* and
  *Supercalifragilistic* shrink to about 12px.
- **How:** the menu's smallest size under Pop is now 11px on the 1180 layout, which is about 13px
  in a 1440 window (it was 12, about 14.5). That gives the name the room it was missing. The page
  carries nine menu links where the frame draws eight (*Availability*, a ninth section), which is
  why the frame's sizes cannot hold.
- **Unchanged:** tablet, mobile and the layout-4 header. The bar's height and the Book Now button
  are unchanged.
- **Still possible:** a single word of about 18 letters or more still wraps the menu, the
  documented last resort. In the editor's own preview, which is narrower than the published page
  in a 1440 window, a long name can still wrap the menu.
- **Logged separately:** Editorial's header has the same long-name wrap since its face changed to
  Gloock.

---

## JP-116 — the gaps between sections are not the frames'

**Verdict: confirmed, and recorded section by section as inherited.** Layout 1 has **no arm in
`vm.pad`**: layout 2 has JP-094's (`EncoreBuilder.jsx:497`–`:514`) and layout 3 JP-103's and its
neighbours' (`:554`–`:625`), so every layout-1 root pads `padY` (80 / 56 / 44, `:95`–`:97`). Every
section of Pop's fit recorded its frame's insets against that as "Inherited, not Pop's", Lime's
diff and Editorial's before it. The records (layout-1.md; re-read each, since some state only a top):

| Section | Recorded against the root's 80 / 56 / 44 | Line |
|---|---|---|
| bio | the masters' 56 / 60 / 24; the 390's 10 inset against 20 | `:1199` |
| media | the frame's 56 / 30 / 10 | `:1303` |
| gallery | top 56 / 30 / 20 | `:1395` |
| repertoire | top 96 / 60 / 40; the 390's 10 inset against 20 | `:1500` |
| map | top 126 / 60 / 30, foot 156 / 60 / 10 | `:1600` |
| calendar | top 100 / 100 / 60 | `:1819` |
| form | top 120 / 30 / 30, foot 120 / 60 / 30 | `:1933` |
| testimonials | the arrows at `padX` (45.9 / 30) against the frame's 60 | `:2028` |
| footer | the frames' 56 | `:2133` |

**Two of the six seams are not padding.** Name them in the reply rather than pad them away:
- **Repertoire → Shows −28** is the map heading's **Bebas leak**. The frame's head is a Bebas 130
  box, 116 tall, where Pop's Titan 82 box is 73 (layout-1.md `:1577`–`:1581`: "36 / 26 / 15
  shorter"). That is 36 × 0.82 = 29.5 on the canvas.
- **Events Map → Pricing −55** is the map's **missing pager**: "no pager seeded, so the desktop
  cards stand 498.7 tall against the frame's 683 × 0.82" (`:1600`–`:1603`, Lime's "the frame's 686
  less its pager" case). That is 61.4 on the canvas. It is JP-112's question again, on a shared
  `s.limeTree` block.

**The double-count trap.** Several Pop and Lime-tree blocks already subtract `padY` from their own
inset, so a `vm.pad` arm moves them twice unless they are rewritten together:
- the testimonials' `pad()` and `popFoot` (`EncoreSection.jsx:24109`–`:24115`);
- the form shells' `calc(u(n) − s.padY)`;
- the heart's and the rule's layers off `s.padY` (JP-112);
- Lime's old `calc(u(56) − padY)` margins.

Each seam's number is therefore the frame's foot plus the next frame's top (the page frames stack
edge to edge; the desktop frame's sections sum to 9389.7) against the build's box to box, read
together with *where* the build's inset is set today.

**Evidence.** As above. `DEV_SEAT` and JP-094's `[[top, foot] × 3]` table are the shape. The
footer has one design, so a footer row moves Pop's footer on every page, and the digest's `page=2`
footer with it.

**First step, before any decision: measure.** On the published tab at 1440, 768 and 390, and on
the canvas, Pop card 1:
- every seam box to box against the frames';
- each section's own inset, and where it is set;
- the 768 testimonials arrows' x against the master's 60.

Then the same seams on Lime's, Grunge's and Editorial's card 1 against their layout-1 frames
(Lime's `964:58588`…, Grunge's `964:58600`…, Editorial's `964:58612`…; the ids in their
`layout-1.md`), so the scope question has numbers.

**Decision (after measuring).**
1. **Scope.**
   - **A. Pop alone**, what was filed.
   - **B. Every `s.limeTree` template at layout 1** whose frames state the same insets. This is
     JP-094's precedent, where the four frames agreed to the pixel. The twins' records say "Lime's,
     as Editorial recorded", so they may.
   - The recommendation waits on the twins' numbers.
2. **The two content seams.**
   - **A (recommended).** Leave them, named: the heading's height is the face's, and the map's
     pager seat is JP-112's question on a shared block, for its own ticket.
   - **B.** Pad them to the frames' totals. Not recommended: the padding then fakes content.

**Fix (on the decision).** A `d === 0` arm in `vm.pad`, JP-094's shape: a `[top, foot]` per section
per width, desktop × 0.82 rounded to 0.1. Each block that subtracts `padY` today is rewritten in the
same commit, so no inset counts twice. The 768 testimonials arrows take the master's 60.

**Expected after-diff.** Named after measuring: each layout-1 root whose inset changes, × the scoped
themes × the widths whose frames differ, geometry only, plus `page=2`'s footer.

**Verify.**
- Every seam box to box on the published tab at three widths against the frames, within 1px: the
  two content seams named, not fixed.
- The 768 arrows at 60.
- No section's content moves inside its root (the digest re-based per root).
- `page-check.mjs` on Pop card 1.

**Docs.** The `vm.pad` comment, a new layout-1 paragraph. *Reversed* pointers at each "Inherited, not
Pop's" line it closes in layout-1.md (and the twins', on scope B). `notes/templates.md` if it states
the insets.

**Measured** (2026-10-08, on HEAD `629cd5f`).
- **Every *Evidence* line held, re-based.**
  - `EncoreBuilder.jsx`: `RAMP`'s `padY` `:95`–`:97`; layout 2's arm `:501`–`:514`; layout 3's arms
    `:552`–`:626`.
  - `EncoreSection.jsx`: the testimonials' `pad()` `:24203` and `popFoot` `:24206`; the root's
    `padding: bleed ? 0 : s.pad` `:30037` (the header bleeds, so it pads 0).
  - The entry's table cites the triage's lines. The six records are at `layout-1.md` `:1205`
    (bio), `:1309` (media), `:1401` (gallery), `:1511` (repertoire), `:1618` (map), `:1837`
    (calendar), `:1951` (form), `:2048` (testimonials) and `:2152` (footer).
- **The double-count trap, site by site** (layout 1 alone):
  - **Pop reads `padY` at four sites.**
    - Pricing's rings: `bottom: calc(padY − 13.08z)` (`:10049`).
    - The repertoire heart: `bottom: calc(padY − u(9))`, and `calc(padY − 79px)` at 390
      (`:12835`–`:12836`).
    - The footer's Line 19: `marginTop: calc(−1 × padY)` (`:29755`).
    - The footer's small print: `marginBottom: calc(−1 × padY)` (`:29681`–`:29682`). The footer
      is one block for all four `s.limeTree` templates.
  - **The testimonials' `pad()` and `popFoot` take back the root's `padY` at both ends.** So the
    band's insides are already the frames' absolute numbers: the band is 730.5 tall at 1440,
    against the frame's 730.
  - **Under the twins alone:**
    - Grunge's form shell, `calc(u(170 / 100 / 60) − padY)` (`:26546`);
    - the bleeds `Grain`, `TornEdge` and `ArcEdge` (`:189`, `:205`, `:242`);
    - the map's and the form's `Grain` insets (`:20454`, `:26903`), and Lime's media (`:7125`).

    None of them draws under Pop: `ArcEdge` is `s.lime`'s, the other two Retro's and Grunge's.
  - **Pop's form `G` carries no `pad`** (`:26505`). Its media is Retro's v0 body, which reads no
    `padY`. "Lime's old `calc(u(56) − padY)` margins" are layout 2's, folded in by JP-094.
- **How.** `seams.mjs`, a scratchpad puppeteer probe on :5174.
  - Card 1 → Publish → Open, and the popup laid out at 1180 (the canvas), 1440, 768 and 390.
  - Per section root, it reads the padding and the union of painted descendants: text `Range`s,
    img and svg, fills off the page ground, borders and shadows. The union is clipped by the root
    and by every clipping ancestor. A root painted off the page ground counts its own edge.
  - A seam is the next union's top less this one's foot, in screen px. The 1440 tab is the
    frame at 1:1.
- **The frames** (one `use_figma` read of the twelve page frames).
  - Each page stacks its sections with `itemSpacing` 0. Each section's inset is read box to box:
    text boxes, not glyph ink, and the page ground's fills and the section's own are left out.
  - Pop's own 10px INSIDE top rules are edges: pricing's blue, the repertoire's lime, the
    calendar's pink and the testimonials' violet. So is the header's 10px lime foot rule.
- **Pop, card 1: the published tab on HEAD / the frame:**

  | Seam | 1440 | 768 | 390 |
  |---|---|---|---|
  | header → bio | 97.6 / 56 | 56 / 60 | 44 / 24 |
  | bio → media | 188.6 / 105.4 | 112 / 90 | 88 / 50 |
  | media → gallery | 195.3 / 112 | 112 / 60 | 88 / 30 |
  | gallery → repertoire | 97.6 / 56 | 56 / 30 | 44 / 30 |
  | repertoire → map | 97.6 / 126 | 56 / 60 | 44 / 30 |
  | map → pricing | 97.6 / 156 | 56 / 60 | 44 / 10 |
  | pricing → calendar | 84.5 / 86.9 | 40 / 44 | 4 / 0 |
  | calendar → form | 28.4 / 50.8 | 56 / 30 | 44 / 30 |
  | form → testimonials | 97.6 / 120 | 56 / 60 | 44 / 30 |
  | testimonials → footer | 0 / 0 | 0 / 0 | 0 / 0 |
  | the footer's top, inside its band | 97.6 / 56 | 56 / 56 | 44 / 56 |

  The tester's six reproduce: +83.3 (theirs +82), +83.3 (+86), +41.6 (+42), the footer's +41.6
  (+41), −58.4 (−55) and −28.4 (−28). No sideways scroll and no page errors at any width.
- **Each section's own inset, and where it is set.** On HEAD every root pads `padY` (80 on the
  canvas and 97.6 in the tab, 56, 44), and the header pads 0. The frames' `[top, foot]`, at 1440
  / 768 / 390, are each section's padding, except the gallery's, whose root pads 0: its row is
  its inner frames' content inset.

  | Section | 1440 | 768 | 390 |
  |---|---|---|---|
  | bio | 56 / 56 | 60 / 60 | 24 / 40 |
  | media | 56 / 56 | 30 / 30 (the master in `986:52421`) | 10 / 10 |
  | gallery | 56 / 56 | 30 / 30 | 20 / 30 |
  | repertoire | 96 / 96 | 60 / 60 | 40 / 40 |
  | map | 126 / 156 | 60 / 60 | 30 / 10 |
  | pricing | 100 / 100 | 60 / 60 | 24 / 40 |
  | calendar | 100 / 100 | 100 / 50 | 60 / 40 |
  | form | 120 / 120 | 30 / 60 | 30 / 30 |
  | footer | 56 / 0 | 56 / 0 | 56 / 0 |

  - The footer's foot is 0 because its small print stands on the floor.
  - The testimonials master is an absolutely laid out (layout `NONE`) 730 band, its card 165 /
    205.5 / 205.2 down. The block's `pad()` gives those already.
  - **Three in-block offsets ride on the inset.** The media's sticker stands 6.6 above its card
    (the build draws it only at 1440). The form's sticker stands 69.2 above its content (1440).
    Pricing's rings hang 13.08 / 15.96 / 40 under its content's foot.
- **The two "content seams" are padding seams.**
  - Box to box, repertoire → map is the map's own top inset: 126, which every template's 1440
    map frame states (Lime's, Grunge's and Editorial's too).
  - Map → pricing is the map's own foot, 156, against pricing's 10px rule.
  - The Bebas leak and the missing pager are inside the map. They shorten its height (the head
    36 × 0.82 = 29.5, the tile 683 × 0.82 − 498.7 = 61.4) and move no seam.
  - Editorial, whose 1440 map frame is Pop's, reads the same −28.4 / −58.4.
- **The testimonials' arrows.** Every master, Pop's and Lime's, at all three widths, seats the
  arrow row (`Frame`) at x 60. The build seats it at `padX`: 45.9 on the canvas (56.0 in the 1440
  tab, so −4), 30 at 768 (−30), and 60 at 390, which matches.
- **The footer is one component on every Pop page.** Layouts 1–4 all instance it (`907:12019` /
  `446:8697`, `907:12261`, `907:12502`). Its first line stands 56 down at 1440, and 61.68 narrow
  (56, plus the wordmark row's centring). Its small print is a 68 row on the floor. So a footer
  row is right on every Pop page, which it moves anyway, being one design.
- **The twins, card 1 on HEAD against their own frames** (the 1440 tab / the frame):

  | Seam | Lime | Grunge | Editorial |
  |---|---|---|---|
  | header → bio | 96.6 / 56 | 96.6 / 56 | 96.6 / 56 |
  | bio → media | 98.7 / 56 | 98.7 / 56 | 98.7 / 56 |
  | media → gallery | 97.6 / 56 | 97.6 / 56 | 97.6 / 56 |
  | gallery → repertoire | 195.3 / 152 | 195.3 / 152 | 97.6 / 56 |
  | repertoire → map | 97.6 / 96 | 97.6 / 96 | 97.6 / 126 |
  | map → pricing | 92.6 / 100 | 94.6 / 0 (its ring) | 97.6 / 156 |
  | pricing → calendar | 188.3 / 148 | 113.3 / 48 | 91.6 / 98 |
  | calendar → form | 97.6 / 98 | 97.6 / 98 | 97.6 / 98 |
  | form → testimonials | 0 / 0 | 119.1 / 119 | 119.1 / 119 |
  | testimonials → footer | 0 / 0 | 145.1 / 145 | 146.3 / 145 |

  - Grunge's 94.6 is read to pricing's type. The probe does not count the root's inset ring,
    which the frame counts as an edge.
  - At 768 and 390 the twins are off by −52 to +26: the gallery's 30 tops +26, and Lime's
    768 pricing → calendar −52.
  - **Their frames agree with Pop's at all three widths in four sections**: the bio, the
    gallery, the repertoire and pricing (and the map, at 1440 alone). None of the four reads
    `padY` in its layout-1 block under the twins.
  - **They part elsewhere.**
    - Media: 98 / 108 at 1440, against Pop's 56 / 56.
    - Calendar: 48 / 98 (Lime, Grunge) or 98 / 98 (Editorial), against Pop's 100 / 100.
    - Form: Grunge's 170 / 170, and the twins' 100 / 100 at 768, against Pop's 30 / 60.
    - Map: 100 / 100 and 60 / 60 narrow (Lime, Grunge).
  - Their bands also bleed off `padY` at both ends (`ArcEdge`, `TornEdge`, `Grain`). So the
    sections they do not share need per-template rows, plus those rewrites.

**Decided** (user, 2026-10-08, over the numbers above; all four recommendations):
1. **Scope A: Pop alone.** A `d === 0` arm under Pop carries the *Measured* rows for every section
   but two. The header bleeds, and the testimonials' `pad()` already gives their frame's absolute
   insets. The bands' insides are included: the repertoire, the calendar and the footer.
   - Pop's four `padY` reads are rewritten in the same commit.
   - Lime's, Grunge's and Editorial's card 1 stay byte-for-byte HEAD. Their numbers go in the
     reply, for a ticket of their own. B (the four shared sections) and C (every template) were
     not taken.
2. **The map's two seams: A, pad them.** They are the map's own 126 / 156 (60 / 60, 30 / 10),
   not content. The reply names the Bebas head (−29.5) and the missing pager (−61.4) as height
   differences inside the map. This reverses the triage's "two content seams".
3. **The testimonials' arrows: A, at the masters' 60 at 1440 and 768**, Pop alone. 390 already
   reads 60.
4. **The footer: A, on every Pop page.** Every Pop footer frame on all four pages is the one
   component, 56 down to its first line. So the row is not gated on the page, and the digest's
   `page=2` footer moves with it.

**Expected after-diff, named before the code.** Theme 4 alone, geometry only, **30 files a
surface** (canvas and `live=1`):
- **24 files: eight sections' `arch 0` at three widths.** In each, the root's height moves by
  its inset change and every row inside moves rigidly by the top's change. Desktop is × 0.82
  rounded to 0.1; the root's padding on HEAD is 80 / 56 / 44.

  | Section | Desktop | 768 | 390 |
  |---|---|---|---|
  | bio | 45.9 / 45.9 | 60 / 60 | 24 / 40 |
  | media | 45.9 / 45.9 | 30 / 30 | 10 / 10 |
  | gallery | 45.9 / 45.9 | 30 / 30 | 20 / 30 |
  | repertoire | 78.7 / 78.7 | 60 / 60 | 40 / 40 |
  | map | 103.3 / 127.9 | 60 / 60 | 30 / 10 |
  | pricing | 82 / 82 | 60 / 60 | 24 / 40 |
  | calendar | 82 / 82 | 100 / 50 | 60 / 40 |
  | form | 98.4 / 98.4 | 30 / 60 | 30 / 30 |

  - Pricing's 10px rule stays on the root's top edge. Its rings, which read the root's foot,
    move with the content.
  - The repertoire's rule stays on the root's top edge too. Its heart reads the root's foot and
    moves with the content.
- **4 footer files:** `arch 0` and `page=2`, desktop and 390. The top goes 80 → 45.9 and 44 →
  56, and Line 19 follows the top. 768 is 56 already, so it moves 0. The foot keeps `padY`,
  which the small print takes back.
- **2 testimonials files:** `arch 0` at desktop and 768. Only the two arrows move, in by 3.3
  (the block's `u(60)` is 49.2, against `padX`'s 45.92) and by 30. The card stays centred
  between them.
- **Every other render moves 0:** themes 0–3, Pop's header, Pop's other layouts, and Pop's
  testimonials at 390.
- **The editor's 1088 canvas follows the digest's 1180.** The arm has no width term but the
  device.

**The harness was proven first.** A fresh HEAD worktree (`629cd5f`, :5174) was diffed against the
unedited tree (:5177): every category, themes 0–4, three widths, the footer's `page=2` included.
It came to **0 of 660 on the canvas and 0 of 660 on `live=1`**, with no one-row renders.

**Settled** (2026-10-08).
- **`sectionVm`** (`EncoreBuilder.jsx`, before layout 2's arm): a `d === 0` arm under Pop alone.
  - It holds one `[top, foot]` row per section per width, read off the frames (the *Measured*
    table), and sets `vm.pad` from it. Desktop is × 0.82 rounded to 0.1, JP-094's `z`.
  - `null` keeps `padY`: the footer's foot, which its small print takes back.
  - The header (it bleeds) and the testimonials (their `pad()` is in-block) have no row.
  - **Two new keys, `vm.padTop` and `vm.padFoot`**, are read off `vm.pad` after every arm, at
    every layout and under every template. They are the root's own top and foot, and they equal
    `padY` wherever no arm moved them.
- **`EncoreSection`: every block that reached across the root's padding now reads them, not
  `padY`.**
  - Pricing's rings and the repertoire heart: `padFoot`.
  - The footer's Line 19 (`padTop`) and its small print (`padFoot`).
  - The testimonials' `pad()` and `popFoot` (`padTop` / `padFoot`). Under every template these
    are still `padY`, the same strings.
  - The testimonials' desktop and 768 row pads in to the masters' 60 under Pop:
    `calc(u(60) − padX)` at each side.
- **Digest** (HEAD :5174 against the tree :5177): **30 of 660 on the canvas and 30 of 660 on
  `live=1`, exactly the 30 named.** The two surfaces' file lists are identical, and every file is
  geometry only.
  - **Re-based per root** (`rebase.mjs`, scratchpad), each root's height moves by its inset
    change, and every content row moves rigidly by the top's change: −34.1 / +4 / −20 (bio),
    −34.1 / −26 / −34 (media), −34.1 / −26 / −24 (gallery), −1.3 / +4 / −4 (repertoire),
    +23.3 / +4 / −14 (map), +2 / +4 / −20 (pricing), +2 / +44 / +16 (calendar), +18.4 / −26 /
    −14 (form), and −34.1 / +12 for the footer at desktop and 390.
  - **The rows that stay put are the root's own edges**, which belong there: the pricing,
    repertoire and calendar 10px rules and their root-sized layers, the footer's hairline and
    Line 19 (its height −34.1), and the seal's 0×0 `<defs>` / `<path>`. `live=1` adds the media's
    hidden 0×0 `<audio>`.
  - **The testimonials move only their arrows**: +3.3 / −3.3 at desktop (the block's `u(60)` is
    49.2) and +30 / −30 at 768. The card does not move.
  - Themes 0–3, Pop's header, Pop at layouts 2–4 and Pop's 390 testimonials: 0.
- **The real app** (`seams.mjs` on :5177, Pop card 1, the published tab):

  | Seam | 1440 (frame) | 768 (frame) | 390 (frame) |
  |---|---|---|---|
  | header → bio | 56.0 (56) | 60 (60) | 24 (24) |
  | bio → media | 105.4 (105.4) | 90 (90) | 50 (50) |
  | media → gallery | 112.0 (112) | 60 (60) | 30 (30) |
  | gallery → repertoire | 56.0 (56) | 30 (30) | 30 (30) |
  | repertoire → map | 126.1 (126) | 60 (60) | 30 (30) |
  | map → pricing | 156.1 (156) | 60 (60) | 10 (10) |
  | pricing → calendar | 87.0 (86.9) | 44.0 (44.0) | 0 (0) |
  | calendar → form | 50.8 (50.8) | 30 (30) | 30 (30) |
  | form → testimonials | 120.1 (120) | 60 (60) | 30 (30) |
  | testimonials → footer | 0 (0) | 0 (0) | 0 (0) |
  | the footer's top | 56.0 (56) | 56 (56) | 56 (56) |

  - **Every seam is within 0.1 of its frame.** The tester's six read +0.0, +0.0, 0.0, the footer
    0.0, +0.1 and +0.1.
  - *Measured* first read bio → media's 768 and 390 frame gaps as 83.4 and 40, off a vector whose
    box stands above the card. That vector is the desktop's sticker at the desktop's x (1079 /
    1039), past the narrow frames' edge, so it is not on those pages. The frames' gaps are 90 and
    50, and the table above is corrected.
  - **The stickers keep the frames' offsets** (1440, the root's top or foot to the svg, HEAD →
    tree, frame):
    - the calendar's 10.6 → 13.0 (13.03);
    - the form's 28.4 → 50.8 (50.8);
    - the media's 91.0 → 49.4 (49.38);
    - the repertoire's Union 56.8 → 55.3 (54.27), and its heart's foot 88.6 → 87.0 (87);
    - pricing's rings' foot 84.5 → 87.0 (86.93).
  - **The arrows:** 60.0 in the 1440 tab, 60 at 768 and 60 at 390, the masters' 60.
  - **Section heights in the 1440 tab now match the frames**: the bio 769 (769), media 1055
    (1055), gallery 789 (788), repertoire 1087 (1087), calendar 885 (885), form 854 (853),
    testimonials 730 (730) and footer 481 (479.7).
    - The map is 1076 against 1192, the Bebas head and the pager, named.
    - Pricing is 775 against 801, its content's own.
  - No sideways scroll and no page errors at any width.
  - **Past 1440** the tab widens `padX` alone, a plain `Npx`, so `padTop` / `padFoot` parse
    the same. At 1600 and 1920 Pop's seams read the 1440 row above, and the footer pads 56.0 /
    97.6. Lime's readings at both widths are identical to HEAD's.
  - **Lime, Grunge and Editorial card 1: 12 of 12 readings identical to HEAD** (each section's
    box, padding, painted union and seams, at 1180, 1440, 768 and 390).
- **`page-check.mjs Pop 0`** (:5177): no console errors or warnings. Every nav, footer and Book
  link scrolls to its section, and every probed control changes state. `overflow390` is 0, the
  burger opens, and the 1440 and 390 seam clips are clean.
- **The editor's 1088 Desktop canvas**, named: Pop's roots pad the arm's desktop rows there,
  45.9 / 78.7 / 103.3 / 127.9 / 82 / 98.4. Each root's height moves by the same delta as at 1180
  (pricing 647.3 → 651.3, its content wrapping taller at 1088). The header and the testimonials
  are unchanged.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed; the sweep does
  that.
- **Torn down:** :5174, :5177 and the HEAD worktree (`git worktree remove --force`). :5173 is the
  user's, and :5175 and :5176 belong to other jobs; all three still run. The probes (`seams.mjs`,
  `sum.mjs` with `frames.json`, `rebase.mjs`, `canvas1088.mjs`) stay in this session's scratchpad.
- **Docs.**
  - The arm's comment, and the `padTop` / `padFoot` comment, in `sectionVm`.
  - The in-block comments at pricing's rings, the repertoire heart, the testimonials' `pad()`,
    the footer's small print, its *56 above the wordmark* and Line 19.
  - README's vertical-inset paragraph (*The desktop page is the 1440 frame at 0.82*) gains Pop's
    layout 1 and the two keys.
  - *Reversed* pointers in `layout-1.md`: the bio (`:1205`), media (`:1309`), the gallery
    (`:1401`), the repertoire (`:1511`), the map (`:1618`, with the triage's content-seam
    reading), the calendar (`:1837`), the form (`:1951`), the testimonials' arrows (`:2048`)
    and the footer (`:2152`).
  - CLAUDE.md and `notes/` state no inset, so neither changes.
- **Named, not fixed.**
  - **The twins carry the same diff.** Their 1440 seams run +40.6 to +43.3 on their first four
    seams (the *Measured* table), Grunge's map → pricing and pricing → calendar are off by more,
    and their 768 / 390 seams by −52 to +26. Their frames agree with Pop's in four sections
    (bio, gallery, repertoire, pricing) and part elsewhere, and their bands bleed off `padY`. That
    is their own ticket: decided 1's B or C.
  - **The map is 116 shorter than its 1440 frame:** the head's Bebas leak (29.5 × 1.22) and the
    pager the seeded five gigs do not draw. It moves no seam.
  - **Lime's and Retro's testimonials arrows stand at `padX`**, against their masters' 60.

Reply: **JP-116 — fixed.** On Pop's *Hero* layout the space between sections now follows the
design at every width.
- **How:** each section takes the top and bottom spacing its own design frame states. The frames
  stack the sections with no extra space, so the gaps are the design's.
- **At 1440** your six now read on the design to within 0.1px: Bio → Top Tracks 105, Top Tracks
  → Media 112, Media → Repertoire 56, the footer's top 56, Repertoire → Shows 126 and Events Map
  → Pricing 156.
- **Tablet and mobile** match the design too. At tablet the Testimonials arrows stand 60px from
  the edge, as designed, and so do the desktop's (they were 56).
- **The two short seams were spacing, not content.** Repertoire → Shows and Events Map →
  Pricing were the map's own top and bottom spacing (126 and 156 in the design).
- **Still different, and not a gap:** the map section is 116px shorter than the design's at
  1440. Its heading is drawn in Bebas in the design file (a mode leak), and the design draws a
  pager that the default five gigs do not need. Neither moves a gap.
- **Unchanged:** the footer's new top spacing applies on all four Pop layouts, whose footers are
  the same component. Lime, Grunge and Editorial are unchanged; their first layout has the same
  extra spacing, which we will log separately.

---

## End-of-pass sweep

1. A full digest against a `main` worktree on :5174 (port and `?t=` normalised): all categories ×
   themes 0–4 × three widths × canvas and `live=1`, the footer's `page=2` render included. Every
   diff must be one a *Settled* above names.
2. The repro sets re-run on the final tree, read off the DOM:
   - JP-113's long names at 360 / 390 / 414 (the page its width);
   - JP-120 (gallery)'s markers;
   - JP-114 · JP-115's names at 1088 / 1180 / 1440 / 1920;
   - JP-112's heart with 12, 13 and 240 songs;
   - JP-117's scribble against the word;
   - JP-119's `::placeholder` opacity;
   - JP-116's seams.
3. `reach.mjs` for every `in` that moved (JP-120 (gallery)'s keys and `railLabel`).
4. Walk Pop card 1 in the real app and the published tab at 1440 / 768 / 390, the tester's steps for
   each ticket. Then walk Lime's, Grunge's and Editorial's card 1 once, and Retro's card 1 for the
   gallery and the footer.
5. JP-111's comment fix: `data.js:763` stops calling Chunko caps-only, since the demo draws a full
   lowercase (open question 12). It is a comment only, so 0 files.
6. `npm run build:standalone`, then `cp source/dist-standalone/index.html index.html`, in its own
   commit. Then a two-build digest (`build-digest.mjs`), whose diff should be only the named rows.
   Check the editor's 1088 Desktop canvas by name.
7. `plans/README.md`'s Pop *QA fixes* row, and one reply line per ticket for QA (fixed / by design /
   needs PO). JP-111's is drafted under its **Decided**. Head them with the
   retest-against-the-stamp line (`curl -sI https://siniiitsa.github.io/js-plus-prototype-2/`; the triage read
   `Thu, 08 Oct 2026 12:09:04 GMT`, 9,908,045 bytes). **Ask for a fresh number for JP-120 (gallery).**
8. *Notes for the designer* at the plan's foot.

**Settled** (2026-10-08, all eight steps, on `b956cde`, then `43d00c7` and `a6e3d3a`; the push, the
PR, the merge and the deployed build stamp are the user's).
- **1. Digest against `main`: 58 of 660 on the canvas and 58 of 660 at `live=1`**, exactly the
  union of the named after-diffs, file for file.
  - **The harness.** A scratchpad worktree of `main` (`a35a92c`, `git worktree add --detach`), its
    `source/node_modules` a `cp -Rc` clone with `.vite` removed, served on **:5174**. The tree was
    served fresh on **:5177**. :5173, :5175 and :5176 were left alone. Every category × themes
    **`0,1,2,3,4` explicit** × three widths, the canvas and `live=1`, 660 each with the footer's
    `page=2` render. Each file was compared with `localhost:517[0-9]` masked and the photo `?t=`
    stamp normalised, then re-based per root (`rebase.mjs`). **No file on any of the four labels is
    a one-row (blank) render.**
  - **The two surfaces' file lists are identical**, and so is every file's re-based shape. `live=1`
    adds only the media's hidden 0×0 `<audio>` row, as JP-116 named.

    | Entry | Named | Differ | Row shape (each file, both surfaces) |
    |---|---|---|---|
    | JP-118 | the footer `arch 0` and `page=2` × themes 0–4 × three widths (30) | 30 | The small print's span: its text, and its width at desktop and tablet. At 390 the text alone, except Pop's right-packed row (x −0.4, width +0.4). Themes 0–3 move that one row and nothing else |
    | JP-116 | theme 4: eight sections' `arch 0` × three widths (24), the footer's `arch 0` and `page=2` at desktop and 390 (4, inside JP-118's 30), the testimonials at desktop and 768 (2) | 26 + 4 | Each root moves by its inset change and its content rigidly by the top's: bio −34.1 / +4 / −20, media −34.1 / −26 / −34, gallery −34.1 / −26 / −24, repertoire −1.3 / +4 / −4, map +23.3 / +4 / −14, pricing +2 / +4 / −20, calendar +2 / +44 / +16, form +18.4 / −26 / −14, footer −34.1 / 0 / +12. The rows left behind are the root's own edges (the 10px rules and their root-sized layers, the footer's hairline and Line 19, the seal's 0×0 `<defs>` / `<path>`). The testimonials move their arrows alone, ±3.3 at desktop and ±30 at 768 |
    | JP-112 | repertoire `arch 0` × theme 4 × desktop (1, inside JP-116's) | — | The root 815.1 → 889.6: the seat's +77.1 less JP-116's 2 × 1.3. The content box +77.1, the heart +75.7 (its +77.1 under the top's −1.3), the seat's two rows appended (760, 50.9; 766.6, 44.3), every other row −1.3 |
    | JP-117 | map `arch 0` × theme 4 × desktop (1, inside JP-116's) | — | The `svg` and `path` rows: x +9.3, and y −0.5 after the re-base (JP-117's −23.8 under JP-116's +23.3). Their size and matrix do not move |
    | JP-114 · JP-115 | header `arch 0` and `arch 4` × theme 4 × desktop (2) | 2 | 15 rows each: the left half and the wordmark (117.7 × 38.4 → 138 × 29.5), the name (77.2 × 38.4 → 97.5 × 19.2, one line), the right half and the nav (746.7 → 726.4), the links' row (12.008 → 11.6806px) and the nine links (11.77 → 11.45 faced). The root, the capsule and the pill do not move |
    | JP-120 (gallery) · JP-113 · JP-119 | 0 | 0 | — |

    **58 = 30 + 26 + 2.** Nothing else moves: themes 0–3 move only their footers' small print, and
    Pop's header at 768 and 390, its other header layouts, its layouts 2–4 and its 390
    testimonials move nothing.
  - **Not in the digest:** the `&name=` / `&cj=` controls (each entry took them against its HEAD),
    `::placeholder` (JP-119), and the editor's 1088 Desktop canvas (step 6).
- **2. Every ticket's repro, re-run on the final tree (:5177), reads its entry's *Settled*.** Each
  entry's own probe, copied from its session's scratchpad and run through `createRequire`, so no file
  landed in `source/scripts/`. Every run passed `BASE=:5177` (the probes default to :5174, which is
  `main` here). Reduced motion where the probe sets it; rows appended to JSONL sinks; one template per
  process under `perl -e 'alarm N'`. **No page or console error on any run.**
  - **JP-113** (`jp113.mjs`, card 1 of all five, 13 cases × the Mobile, Tablet and Desktop canvases
    and the tab at 360 / 390 / 414 / 768 / 1440; 520 reads). In every read the gallery's text stays
    inside its root, **the back link keeps one line**, and no word breaks inside itself except the
    45-letter word under Pop and Retro (wider than the measure). **The tester's five names,
    *…Windsor* and the long *Gallery labels* scroll no page: 0 of 275 tab reads.** The page scrolls
    only with the one-word names entry 4 named, from the footer: Lime 396 (45 letters), Editorial
    361 (34, at 360) and 479–491 (45), Retro 404–416 (34) and 539–551 (45). Pop scrolls with none.
  - **JP-120 (gallery)** (`sweep.mjs`, card 1 of all five; the canvas's three tabs and the tab at
    1440 / 768 / 390):
    - **marked:** every gallery text field takes its marker, and the only literals left are the
      siblings: *YouTube*, *Instagram*, *TikTok* (desktop), the ←, *Kai Mercer*, the counter, and
      Retro's rail *Gallery*;
    - **emptied** (Pop, the four label keys alone): no kicker and no credit line; *Back to
      beginning* and, at desktop, the row's *Gallery* again;
    - **long** (Pop, 85 characters): no text past the root, and the page its width at all three;
    - the marked back link rewinds (05 → 01), and **no gallery field reads "Not shown in this
      layout"** in the panel.
  - **JP-114 · JP-115** (`probe114.mjs`, Pop and Editorial card 1, the five names; the 1088 canvas
    and the tab at 1180 / 1440 / 1920). Pop reads the *Settled* table to the hundredth (faced sizes
    ÷ 0.98):
    - *Kai Mercer* one line at 16 with the links at 11.68 on one row;
    - *Florence* and *Chemical* two lines at 16;
    - *Maximilian* 12.1 (12.04 at 1920) and *Supercali* 11.72 (11.67), the links one row at 11.01;
    - on the 1088 canvas the seed's links one row at 11.01 and the long names wrapping *Reviews*
      (or *Enquiries* and *Reviews*), as named.

    Everywhere: nothing past the capsule, the pill on the row (top 8.19, 44.27 tall), the name clear
    of the nav by 36.5 at least and never broken inside a word, the bar 60.64, and the tab's title
    the name. **Editorial**, for the new ticket: its seed sets two lines at 16.78 with the links on
    one row, and **all four long names wrap *Reviews* at 1180, 1440 and 1920** (two lines at the 12
    floor).
  - **JP-112** (`heart.mjs`, Pop card 1, the tab at 1440 / 768 / 390):
    - **12 and 13 songs read identically at 1440:** the root 1086.6 and the heart 908.6–999.6, 12.1
      below the rows' foot (896.5), with no song row's title, artist or pill under it. The root is
      JP-112's 1089.8 less JP-116's 2 × 1.3 × 1.22.
    - 240 songs: the same. 6 songs: the seat, and clear.
    - 768: no heart. 390: the heart over the → disc (and the last page pill at 13 and 240), and 6
      songs' 12 over the last pill's ring, as decided.
    - Every pager disc hit-tests to itself. No sideways scroll.
  - **JP-117** (`probe117.mjs`, Pop card 1, 4× isolation scans): at 1440 **the ink tops 0.466 of the
    cap below the cap's top and starts 0.3815 into the word**, the svg at `left` / `top` 180.363 /
    −0.932. Its foot runs 0.735 of the cap past the baseline, and it ends 0.1225 of the word past the
    word's end. Those are JP-117's numbers. The map root is 1075.6, JP-117's 988.7 plus JP-116's
    +71.2 × 1.22. 768: none. 390: the svg at 59.06 / 16.46, unchanged.
  - **JP-119** (`ph-probe.mjs`, eight cards, 132 rows): **Pop card 1's five boxes at 0.8, 3.0 : 1, at
    all three widths** (15 rows). Every other box reads entry 5's value: Pop's repertoire search .45,
    Pop's cards 2 and 3 at JP-093's 1, Pop's card 4 at .45, and Lime's, Grunge's, Editorial's and
    Retro's card 1 at .45.
  - **JP-116** (`seams.mjs`, Pop card 1). **Every seam is within 0.1 of its frame at 1440, 768 and
    390**, the *Settled* table to the tenth. `frames.json` was corrected first: it still held
    *Measured*'s first reading of bio → media at 768 and 390 (83.38 and 40), not the corrected 90 and
    50. The arrows stand at 60.0 in the 1440 tab, 60 at 768 and 60 at 390. **Lime's, Grunge's and
    Editorial's card 1 read the same on the tree as on `main`: 12 of 12** (each section's box,
    padding, ink and seams at 1180, 1440, 768 and 390).
  - **JP-118** (`smallprint.mjs`, card 1 of all five): `© 2026 Kai Mercer` in the panel, on the
    canvas and on the tab at three widths. CDP names one web face at ×17 for every reading (×16 at
    Retro's two-line 390, the break space): Titan One, Bebas Neue, Anton, Gloock and Fraunces.
- **3. Reach: only JP-120 (gallery)'s four rows moved, and each reads its `in`.** `git diff main..HEAD
  -- source/src/builder/data.js` changes four `in` rows and no other. `reach.mjs`, filtered to the
  gallery's probes plus `gallery.heading` as the control (a scratchpad copy through `createRequire`),
  themes `0,1,2,3,4`, 1,200 renders a server:

  | Key | The tree (:5177), all five templates | `main` (:5174) | `in` |
  |---|---|---|---|
  | `kicker` | layouts 1 and 4 | — (no key) | `[0, 3]` |
  | `railLabel` | layout 1, and layout 2 at 2/6 (tablet, JP-098) | layout 2 at 2/6 | `[0, 1]` |
  | `backLabel` | layout 1 | — (no key) | `[0]` |
  | `sourceLabel` | layout 1 at 2/6 (desktop, canvas and live) | — (no key) | `[0]` |
  | `heading` (control) | layouts 1–4 | layouts 1–4 | — |

  In Node, `fieldReach(f, name, a % designCount('gallery', name))` gives the same designs under all
  five theme names, and `fieldNowhere` is false for all four.
- **4. The real app, card 1 of all five templates** (`page-check.mjs <template> 0`, `BASE=:5177`,
  `OUT` in the scratchpad; one template per process). The tester's steps per ticket are step 2's
  probes, which drive the same app: Pop card 1 → the edit, then Publish → Open, the tab at 1440,
  768 and 390. This is the whole-page walk on top of them, Pop's first.

  | Card 1 | Errors · warnings | Links (nav, Book, footer) | Audio · form | `overflow390` · burger | Footer at 1440 |
  |---|---|---|---|---|---|
  | Pop | 0 · 0 | 22, each to its section | plays · mailto composed | 0 · opens | 481 |
  | Lime | 0 · 0 | 23, each to its section | plays · mailto composed | 0 · opens | 522 |
  | Grunge | 0 · 0 | 23, each to its section | plays · mailto composed | 0 · opens | 522 |
  | Editorial | 0 · 0 | 22, each to its section | plays · mailto composed | 0 · opens | 522 |
  | Retro | 0 · 0 | 23, each to its section | plays · mailto composed | 0 · opens | 597 |

  - **Every probed control changes state** but two on every template: the *All* chip and the
    gallery's picked tile, which are already the active ones. Pop's report is identical to entry
    9's (`page-check.mjs Pop 0` on its tree) in its controls, links, `overflow390`, burger and
    warnings.
  - Pop's section heights at 1440 are entry 9's: the bio 769, media 1055, gallery 789, repertoire
    1087, map 1076, pricing 775, calendar 885, form 854, testimonials 730, footer 481.
  - The 1440 and 390 seam clips are clean on all five. The tab's title is *Kai Mercer*.
  - Retro's gallery and footer, the two sections it shares with the batch (JP-113, JP-118, JP-120
    (gallery)), are step 2's `jp113.mjs`, `sweep.mjs` and `smallprint.mjs` rows.
- **5. JP-111's comment** (`43d00c7`). `TITAN_EM`'s comment (`data.js:763`) no longer calls Chunko
  Bold Demo caps-only: the frames type it in capitals, and the face draws a full lowercase (open
  question 12). No other comment, note or doc says it. A canvas re-digest of the tree after the edit
  against the step-1 label: **0 of 660**.
- **6. The root `index.html`** (`a6e3d3a`, its own commit). `npm run build:standalone` on `43d00c7`
  gives **9,910,327 bytes, up from 9,908,045** (the deployed build's size). The repo root was served
  on :8931, and `build-digest.mjs` walked the committed `index.html` (`?v=old`, before the copy) and
  `source/dist-standalone/index.html`: the picker, the setup modal's first card, then the editor's
  Desktop, Tablet and Mobile tabs under all five templates. The Desktop tab is the **1088 canvas**.
  A scratchpad copy tagged every row with its section root and re-based it there.
  - **Themes 0–3: the footer's © span alone**, at all three tabs: its text, and its width at Desktop
    and Tablet (Retro +2.6 / +3.2, Lime +7.1 / +6.8, Grunge +3.0 / +2.9, Editorial +1.9 / +1.6).
  - **Theme 4, Tablet and Mobile:** the dev digest's rows exactly. JP-116's eight roots, the footer
    at 390, the 768 arrows ±30, and the © span.
  - **Theme 4, the 1088 Desktop canvas, named:**
    - **the header** (JP-114 · JP-115), 15 rows: the name 12 → **11.42** nominal, still KAI /
      MERCER, and the links' row from two rows (*Reviews* wrapped on `main`) to **one row at 11.01**;
      the bar is unchanged;
    - the bio, media and gallery roots −68.3 with their content −34.1; the repertoire 815.1 → 889.6
      with the seat's two rows appended and the heart +75.7; the map +71.2 (content +23.3) with its
      svg x +9.3; **pricing 647.3 → 651.3**, as entry 9 named for 1088; the calendar +4; the form
      +36.8;
    - the testimonials' arrows ±3.3, and the footer −34.1 with Line 19 and the © span.

    Nothing else moves. The rest is the seals' 0×0 `<defs>` / `<path>`, which report the viewport
    origin. The modal offers four cards under every template, as before.
  - **Pop card 1 walked on the built file** (`page-check.mjs`, `BASE` the :8931 copy): identical to
    the dev server's walk in every field but the audio's playback position.
- **7.** `plans/README.md`'s row says the pass is swept. The replies are below, under the retest line,
  with the request for a fresh number for JP-120 (gallery). Five items found by the entries are
  logged there for new tickets: the twins' layout-1 insets and Editorial's long-name nav wrap first,
  as the sweep was asked, then the three other *Named* items. At the sweep the deployed build
  still read `Thu, 08 Oct 2026 12:09:04 GMT`, 9,908,045 bytes (19:43 GMT), which is `main`'s root
  `index.html`.
  - **One named item was widened by the sweep.** JP-117 found Pop's 390 map heading scrolling the
    page with a long one-word heading and left the twins unprobed. The harness at 390 (`live=1`,
    themes 0–4) puts the word's right edge at 433 / 416 under Pop (*Supercalifragilistic* /
    *Featherstonehaugh*) and **539 / 547 under Editorial**. Lime (378 / 365), Grunge (291 / 278)
    and Retro (348 / 351) fit.
- **8.** *Notes for the designer* are finalised and numbered, seven of them. Notes 1, 4, 5 and 7 end
  on the designer's question: the © in the frames, a desktop frame in Pop's mode, the map's pager
  seat, and nine links against the frames' eight. Note 5 adds the 390 heart, as decided in JP-112.
- **Named, not fixed, found by the sweep:** none new. Step 7's widening is item 4 of the list below.
- **Torn down:** :5174, :5177 and :8931, then the `main` worktree (`git worktree remove --force`,
  its `node_modules` clone with it; `git worktree prune`). :5173, :5175 and :5176 are not this
  session's and still run. The probes and their sinks stay in the session's scratchpad.

## Replies

**Retest against the Pages build whose `last-modified` is later than `Thu, 08 Oct 2026 12:09:04
GMT`** (9,908,045 bytes; `curl -sI https://siniiitsa.github.io/js-plus-prototype-2/`). All ten tickets
were filed against that build, which was still the deployed one at the sweep, so an older tab or a
cached build still shows every one of them. The refreshed build is 9,910,327 bytes.

**Please give JP-120 (gallery) a fresh number.** JP-120 is already the merged ticket *the layout-2
form's 390 credit row yields to a long name* (PR #53). Until the new one is renumbered, this batch, its
commits and its docs call it **JP-120 (gallery)**.

One line per ticket. Each full reply stands under its entry above, as *Reply* (JP-111's under its
**Decided**).
- **JP-111** (the display face is Titan One, not Chunko) — **needs the PO**, and a BA call. Titan One
  is a deliberate stand-in, chosen by rendering against the frame. *Chunko Bold Demo* is a
  personal-use demo and cannot ship, and no licence on sale covers a builder's published sites. The
  PO's question goes to Zarma Type; the BA decides whether Titan's soft corners do meanwhile.
- **JP-112** (the heart covers song 12) — **fixed**. At desktop the Repertoire keeps the pager's row
  when there is one page of songs, so the heart stands beside the last row, as designed.
- **JP-113** (390: a long name runs the gallery's label off the screen) — **fixed**, on every
  template. The name drops under *Back to beginning* and wraps. A one-word name of 34 letters or
  more still scrolls the phone page from the footer (logged, 3).
- **JP-114** (the logo on two lines at 1440) — **fixed**. *KAI MERCER* sits on one line at its
  design size.
- **JP-115** (a long name pushes REVIEWS to a second row) — **fixed**. Pop's menu now sets down to
  about 13px in a 1440 window, which holds every name in the report on one bar. Editorial has the
  same wrap (logged, 2).
- **JP-116** (the gaps between sections) — **fixed**. Every Pop gap matches the design to 0.1px at
  1440, 768 and 390, and the Testimonials arrows stand 60px in. The map section is still 116px
  shorter than the design's, which is not a gap. The other templates' gaps are logged (1).
- **JP-117** (the scribble under MANCHESTER) — **fixed**. It crosses the lower half of the word, by
  the design's own relation. Its lower arm reaches further below the word than in the design, by
  design: the design's heading is drawn in Bebas, a mode leak.
- **JP-118** (*C 2026*) — **fixed**, on every template. The small print reads *© 2026* and the
  artist's name, and small print the artist typed is untouched.
- **JP-119** (the placeholders at 45%) — **fixed**. Pop's *Hero* form draws them at the design's 80%
  on the published page, 3.0 : 1.
- **JP-120 (gallery)** (four texts no field reaches) — **fixed**, on every template. *Kicker*,
  *Gallery label*, *Back link* and *Gallery row label* edit them, and *Gallery label* no longer
  reads "Not shown in this layout".

**Logged for new tickets.** Each was found by an entry and left out of this batch on purpose.
1. **Lime's, Grunge's and Editorial's layout-1 section gaps** (JP-116's *Named*; the user took scope
   A, Pop alone). Their card 1 pads 80 / 56 / 44 everywhere, so their 1440 gaps run +40.6 to +43.3
   wide on the first four seams (Lime's and Grunge's gallery → repertoire 195.3 against 152), Lime's
   pricing → calendar 188.3 against 148, and their 768 and 390 seams −52 to +26. Their frames agree
   with Pop's insets in the bio, gallery, repertoire and pricing (and the map at 1440), and part from
   them in the media (98 / 108), the calendar (48 / 98 or 98 / 98), the form (Grunge's 170) and the
   narrow map. Their bands bleed off `padY` (`ArcEdge`, `TornEdge`, `Grain`), so a fix is
   per-template rows plus those rewrites (decided 1's B or C).
2. **Editorial's long-name nav wrap under Gloock** (JP-114 · JP-115's *Named*). At 1180, 1440 and
   1920, all four long names in the report set two lines at the 12px floor and wrap *Reviews* (the
   sweep re-measured it). Nine Gloock links are 59.979 em, which leaves the name 70.87 at 1180.
   JP-091's settled rows held in Noto and have not held since the Gloock swap (2026-10-05). On the
   editor's 1088 canvas the seed wraps *Reviews* too. Its seed's two lines at 16.78 are a user call.
   Pop's fix (an 11 floor at layout 1) is gated to Pop; Editorial needs its own measure.
3. **A one-word name of 34 letters or more scrolls the 390 page from the footer** (JP-113's *Named*,
   which its reply promises). Retro 404 (34 letters) and 539 (45) at 360 and 390, 416 / 551 at 414;
   Lime 396 (45); Editorial 361 (34, at 360) and 479–491 (45). Pop fits. Hiding the footer brings
   each page back to its width. The long-name family (JP-092, JP-102, JP-109).
4. **A long one-word map heading scrolls the 390 page** (JP-117's *Named*, widened by the sweep).
   The layout-1 `s.limeTree` map's `h2` sets no `overflowWrap` and no fit, so *Supercalifragilistic*
   runs to 433 under Pop and 539 under Editorial, and *Featherstonehaugh* to 416 and 547. Lime,
   Grunge and Retro fit.
5. **The layout-1 testimonials arrows stand at `padX` under every template but Pop** (JP-116's
   *Named*, re-read by the sweep): 45.9 on the canvas, 56 in a 1440 tab and 30 at 768, under Lime,
   Grunge, Editorial and Retro alike (60 at 390, which matches). Lime's and Retro's masters seat them
   at 60; Grunge's and Editorial's masters were not read. Pop's moved to 60 in JP-116.

Already open, so not new: Pop layout 4's capsule reads the same 12px link floor, and its seed wraps
*Reviews* (`layout-4.md`, open question 10). JP-114 · JP-115 gated the 11 floor to layout 1.
*Fixed* by JP-127 (user call, 2026-10-09, [`layout-4-qa-fixes.md`](./layout-4-qa-fixes.md)):
layout 4's capsule now takes the 11 floor and the name fit under Pop.

---

## Notes for the designer

Gathered as the entries ran, seeded at triage and finalised by the sweep (2026-10-08).

1. **Every footer frame types `C 2026`, a capital C, not ©** (JP-118), on all five templates. The
   build now seeds `© 2026 <name>` on every template (decided A), drawn in each footer's own face.
   Pop's frame face, Chunko Bold Demo, has no © glyph (nor ’, “ ” or ·), which probably explains the
   C there. **Could the frames carry the ©**, so the next comparison against them agrees?
2. **Pop's display face is a personal-use demo** (JP-111). Titan One stands in for it until the PO
   hears from Zarma Type about a licence (`layout-1.md` open question 12). The demo draws a full
   lowercase, so the frames' capitals are a styling choice, and Pop sets them per site. A licensed
   file's character set matters too: the demo lacks © ’ “ ” ·, which the build sets.
3. **The gallery's back link is typed *BEGININNING*** in Pop's and Retro's layout-1 frames
   (`964:58627`, `964:58579`). The build spells it right, and the text is now the artist's *Back
   link* field (JP-120 (gallery)).
4. **The desktop page frame is still in Lime's mode**, so the map's heading renders in Bebas 130,
   not Chunko 82 (JP-117's anchor). That makes the frame's map 29.5 taller on the canvas than Pop's
   face would draw it, which moves no gap: JP-116 measured the −28 above it as the map's own 126 top
   inset. The map's scribble is drawn to that Bebas word. JP-117 places it by its relation to the
   word and keeps its size, so against the shorter Chunko or Titan cap its lower arm runs further
   below the word (0.735 of the cap past the baseline, against the frame's 0.265). **A frame in
   Pop's mode would settle the stroke's size.**
5. **The repertoire and the map draw a pager the seeded page does not have** (twelve songs, five
   gigs), so a sticker that hangs off the pager has nothing to stand on (JP-112).
   - Pop's repertoire now keeps the pager's seat at desktop whenever one page of songs is shown, so
     its heart stands beside the last row as the frame draws it. The section is 94 taller for it in
     a 1440 window.
   - **The map does not** (JP-112's call was the repertoire's alone): it is 61.4 shorter on the
     canvas than its frame, and no gap moves (JP-116: the −55 under it was the map's own 156 foot).
     **Should the map keep a pager's seat too, or is the shorter map right?**
   - At 390 the heart runs over the → disc, as the master draws it. With six songs or fewer (no
     pager at 390) it crosses the last song pill's ring by 12, over no text. That was left as is.
6. **Lime's, Grunge's and Editorial's layout-1 frames state their own section insets** (JP-116),
   which the build does not pad yet: their 1440 gaps run about 41 wide on the first four seams. Their
   frames agree with Pop's in the bio, gallery, repertoire and pricing, and part from them in the
   media (98 / 108), the calendar (48 / 98 or 98 / 98) and the form (Grunge's 170). Logged for a
   ticket of its own.
7. **The frames' nav draws eight links**, and the seeded page carries a ninth, *Availability*
   (JP-114 · JP-115). Nine Titan links do not fit beside the name at the frame's 16. So Pop's
   layout-1 menu now sets down to 11 on the 1180 layout, about 13 in a 1440 window, which keeps the
   name on one line. Eight links at the frame's size would hold the frame's row (confirmed by
   render). **Is the smaller menu acceptable, or should the frames make room for nine?** Editorial's
   Gloock menu has the same squeeze with a long name (logged).
