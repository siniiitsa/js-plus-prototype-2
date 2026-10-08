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
| 5 | JP-119 | live placeholders at .45 | **Confirmed, and recorded**: the canvas draws the frame's .8; the live box keeps JP-093's .45 | S | entry 1: **A**, `--ph: 0.8` | open |
| 6 | JP-112 | the heart over song 12 | **Confirmed, and recorded**: seated off the content's foot because the seed draws no pager | S | **user**: the pager's seat | open |
| 7 | JP-117 | the scribble under the word | **Confirmed, and recorded**: the frame's offsets kept against a Titan word they were not measured on | S | entry 1: **A**, the frame's fractions | open |
| 8 | JP-114 · JP-115 | the logo on two lines · the nav wraps | **Confirmed, and recorded** (layout-1.md `:1085`): JP-091's rule under Pop's room and cap | M | **measure, then decide** | open |
| 9 | JP-116 | section gaps off the frames | **Confirmed, and recorded as inherited** in every section's *Settled*; two of the six seams are content shortfalls, not padding | M–L | **measure, then decide** the scope | open |
| 10 | — | End-of-pass sweep | — | S | — | open |

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

---

## Notes for the designer

Gathered as the entries run; the sweep finalises them. Seeded at triage:
- **Every footer frame types `C 2026`, a capital C, not ©** (JP-118), on all five templates. Entry 2
  seeds `© 2026` instead (decided A). Pop's frame face, Chunko Bold Demo, has no © glyph (nor ’,
  “ ” or ·), which probably explains the C there.
- **Pop's display face is a personal-use demo** (JP-111). Titan One stands in for it until the PO
  hears from Zarma Type about a licence (`layout-1.md` open question 12).
- **The gallery's back link is typed *BEGININNING*** in Pop's and Retro's layout-1 frames
  (`964:58627`, `964:58579`). The build spells it right.
- **The desktop page frame is still in Lime's mode**, so the map's heading renders in Bebas 130,
  not Chunko 82 (JP-116's Repertoire → Shows −28, JP-117's anchor).
- **The repertoire and the map draw a pager the seeded page does not have** (twelve songs, five
  gigs), so a sticker or a height that hangs off the pager has nothing to stand on (JP-112, JP-116).
- **The frames' nav draws eight links**, and the seeded page carries a ninth, *Availability*
  (JP-114 · JP-115).
