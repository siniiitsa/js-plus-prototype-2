# Editorial layout 2 QA fixes — bug-by-bug plan

Working checklist for the tester's batch against the **Editorial template, layout 2** (card 2 of the
setup modal, *Feature spread*): JP-092 … JP-100. It works like [`qa-fixes.md`](./qa-fixes.md):
**one entry per session, with context cleared between sessions**, and each session writes what it
settled back into this file.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then *How each
session runs* in [`../grunge/layout-3-qa-fixes.md`](../grunge/layout-3-qa-fixes.md) (the digest
recipe, the harness parameters, `reach.mjs`), *Verification harness* in
[`../retro/qa-fixes.md`](../retro/qa-fixes.md) (the `&cj=` harness), then the memory notes
`verifying-the-published-tab` and `browser-tool-choice` (and `figma-frame-reading` for any entry
that reads a frame). Then the section's `notes/` file, which each entry names.
[`layout-2.md`](./layout-2.md) holds the Figma node ids of every Editorial layout-2 frame and its
Lime and Grunge twins (*The sections* table; the page is `964:64598` / `986:15657` / `986:15676`,
on the Figma page **Layout 2** `964:58572`), and its *Settled in section N* bullet is the fit each
entry moves. The shapes the entries copy:
- JP-090 in [`qa-fixes.md`](./qa-fixes.md): a frame label becomes a seeded, uncased, emptiable
  field, and an existing key reaches another layout through a per-layout seed (`mapKickerSeed(d)`)
  that `sectionVm` and `EditPanel`'s chain both call;
- JP-071 in [`../grunge/retest-qa-fixes.md`](../grunge/retest-qa-fixes.md): the label shape itself
  (the `●`, `[ ]`, `↓` and `·` are the markup's and go with an emptied word);
- JP-086 in [`qa-fixes.md`](./qa-fixes.md): a display name fitted to its widest word on an
  `inline-size` container, `min(ramp, calc(100cqi / s.cardNameEms))`, never broken inside a word;
- JP-060 in [`../grunge/layout-2-qa-fixes.md`](../grunge/layout-2-qa-fixes.md): Lime's layout-2 fit
  drew Retro's **pre**-QA state, and Grunge and Editorial inherited it (JP-100 is that again);
- the layout-3 `vm.pad` arms in `sectionVm` (`EncoreBuilder.jsx:459`–`531`, the Editorial layout-3
  sweep's user call, 2026-09-26): a section's vertical inset read off its own frames (JP-094).

Branch: **`editorial-layout-2-qa-fixes`, forked from `main`** (`84be5f3`, after PR #45). One commit
per entry (`Fix JP-092: …`). A decision-only entry commits the plan alone.

**Build and reproduction.** At triage (2026-10-01) the deployed Pages build read
`Thu, 01 Oct 2026 10:11:08 GMT`, 8,779,739 bytes, byte-identical in size to `main`'s root
`index.html` (`97ac77e`, the Editorial QA refresh). The report names JP-086, which that build
shipped, as related, so it was most likely filed against it. The triage read HEAD and ran the
harness (`preview.html`, `&cj=`,
`live=1`): JP-092, JP-093, JP-094, JP-095, JP-099 and JP-100 reproduce there, with the numbers
below; JP-096, JP-097 and JP-098 were read off the code and the frames. **Nothing was reproduced in
the real app.** Each session does that first (Editorial card 2, Publish, Open) and records anything
that does not reproduce.

**None of the nine is Editorial's alone.** Five are layout-2 bodies every template draws, and the
other four are the `s.limeTree` blocks (Lime, Grunge and Editorial). This decides each entry's
digest theme list. `digest.mjs`'s default list is `0,2,3,4`, which **skips Lime**, so always pass
the list explicitly.

| ID | Where the cause sits | Templates | Digest themes |
|---|---|---|---|
| JP-092 | `HeaderV1`'s `s.limeTree` block: the title is the flat ramp, with no container | Lime, Grunge, Editorial (Retro's half overflows too: probe, name) | 0–3 |
| JP-093 | the global `::placeholder { opacity: .45 }`, over the boxes whose placeholder **is** their label (form layouts 2 and 3, both bodies) | every template | 0–4 (the digest cannot see it) |
| JP-094 | no layout-2 arm in `vm.pad`: every section pads `padY` 80 / 56 / 44 | Lime, Grunge, Editorial (their frames agree; Retro's too, but for its header) | 0–4 |
| JP-095 | 17 literals in **both** layout-2 bodies, and `vm.calPrompt` (every layout) | every template | 0–4 |
| JP-096 | the travel card, both bodies; `base`'s seed | every template | 0–4 |
| JP-097 | the bar's byline, both bodies | every template | 0–4 |
| JP-098 | `Gallery`'s shared `if (s.v1)` (no block) | every template | 0–4 |
| JP-099 | the 390 bar override, both bodies | every template | 0–4 |
| JP-100 | the calendar's `s.limeTree` 390 foot | Lime, Grunge, Editorial | 0–3 |

## The report (translated)

> **JP-092 — a long name in the hero fits at no width.** Header → Title = *Maximilian
> Featherstonehaugh* → Publish → Open, at 1440, 768 and 390 separately. Expected: the name fits, as
> in layout 1, where the size shrinks at 1440. Actual: at **1440** the size stays 97px, the word
> runs out of the window and the page scrolls sideways 433px; at **768** even a 12-letter word
> (*Shostakovich Collective*) runs under the *The face of the act* / *Manchester* cards; at **390**
> the word is clipped and the page scrolls sideways 76px. Control: *Florence and the Machine* and
> *Kai Mercer* fit at every width, so the problem is a long single word: ≥12 letters at tablet,
> ≥14 at desktop. Published page, one browser. Related: JP-086 (layout 1, mobile).
>
> **JP-093 — the Enquiry Form's box labels are barely visible.** EVENT DATE, EVENT TYPE and YOUR
> EMAIL are placeholders in `#141414` at 45% opacity on `#DA7C5E`, about 2.3:1. In the design
> (`964-64598`) they are solid dark, about 6:1. The boxes have no other label. Published page at
> 1440; the same CSS applies at every width, but 768 and 390 were not measured. Proposed Medium for
> readability; the severity is ours to set.
>
> **JP-094 — the vertical gaps between sections are larger than the design's.** Desktop 1440,
> design → build: header → bio 112 → 197; bio → media 141 → 198; gallery → pricing 45 → 97; map →
> form 58 → 99. Mobile, header → bio 41 → 90. At tablet the difference is only about 13px.
>
> **JP-095 — labels no field reaches on layout 2** (JP-090's family). After replacing every field
> with a marker, these remained: **Pricing** `[ PRICING ]`, *WHAT'S INCLUDED*; **Events Map**
> *Travel radius*, *Home location*, *Venue location*, *Max travel*, *Travel time*, *Booking fee*,
> *Venue Link*, *Get Directions*, *Other upcoming ·*; **Booking Calendar** *Date ↓*,
> *Availability ↓*, *Pick a date to enquire*; **Media** *● Featured*, *Featured / Max*;
> **Testimonials** *✎ What clients say*, though its *Kicker* field is marked "Not shown in this
> layout".
>
> **JP-096 — Events Map, the travel radius card.** The design has small labels *Based in* and
> *Willing to travel to* over the values. The build has no second one at all, and "Based in" is
> simply typed into the field's default value (*Based in Manchester*).
>
> **JP-097 — the player's byline.** The design reads *Kai Mercer · Single*; the build *Kai Mercer*
> alone, at every width.
>
> **JP-098 — tablet, Gallery.** Six thumbnails on the right where the design has four, and no
> *Gallery · View list ✕* row.
>
> **JP-099 — mobile, the player.** No ♡ ↓ ⋯ icons. Seen before on Grunge layout 2, never numbered.
>
> **JP-100 — mobile, the Booking Calendar.** START ENQUIRY stands on its own row under the chip; in
> the design it is all one row. Seen before on Lime and Grunge, never numbered.

## Status

| Order | ID | Report (short) | Verdict | Size | Decision | Status |
|---|---|---|---|---|---|---|
| 1 | JP-099 | 390 player: no ♡ ↓ ⋯ | **Confirmed, and recorded**: Retro's 390 override, shared by every template, because the master pays for the icons with the track's whole title | S (or none) | **yes** — reply (A), or icons with the sleeve dropped (C) | open |
| 2 | JP-093 | Form box labels at 45% | **Confirmed**: the global `::placeholder` .45, recorded as "Repertoire's accepted diff", lands on boxes with no other label | S | **yes** — mechanism and scope | open |
| 3 | JP-092 | Long hero name overflows | **Confirmed, and shared**: `HeaderV1`'s `s.limeTree` title is the flat ramp with no container; the fit was declined on the seed alone | S | light — Retro's half | open |
| 4 | JP-095 (a) | Pricing, calendar, media, testimonials labels | **Confirmed**: JP-090's rule, eight literals, every template; two are CLAUDE.md's named "unreported siblings" | M | **yes** — keys, emptied rules | open |
| 5 | JP-095 (b) · JP-096 | The map's nine labels; *Based in* / *Willing to travel to* | **Confirmed, and recorded**: Retro dropped *Based in* because `base`'s seed says it | M | **yes** — the home value, emptied pills | open |
| 6 | JP-100 | 390 calendar foot: pill on its own row | **Confirmed, a fit slip**: Lime's fit drew Retro's pre-QA stack (JP-060's shape) | S | light — Editorial's line | open |
| 7 | JP-097 | Byline lacks *· Single* | **Confirmed, a fit slip of every template**: the bar prints the artist alone; layouts 3 and 4 print the release | S | no | open |
| 8 | JP-098 | 768 gallery: six tiles, no *Gallery · View list ✕* | **Confirmed, and recorded**: Retro's squeeze override and head-row allocation, every template | S | **yes** — tiles, head row, dead controls | open |
| 9 | JP-094 | Section gaps too large | **Confirmed, and recorded**: layout 2 stands every section on `padY`; the frames' own insets differ by up to 85px at 1440 and 48 at 390 | L | **yes** — scope, widths | open |
| 10 | — | End-of-pass sweep | — | S | — | open |

**Why this order:**
- **The likely reply first.** JP-099's recommendation writes no code, so its reply is ready while
  the code entries run.
- **Then by footprint, zero-diff entries first.** JP-093 moves no digest file (the digest reads no
  `::placeholder`), JP-092 none on the seed, and the two JP-095 entries none if every key is seeded
  with its rendered bytes. JP-096 moves map `arch 1` alone, JP-100 six files, JP-097 thirty, and
  JP-098 ten on its code options.
- **JP-094 last.** It moves the geometry of most `arch 1` files under three themes (about 150), so
  every earlier entry's after-diff has to be named against a base without it, and the sweep's
  reconciliation is simplest with it on top.
- **JP-095 is two entries, split by section, the map's half with JP-096**: the two share the travel
  card and its stat row, and seventeen keys in one session is twice JP-090's.

**"Decision"** means the entry lists options with a recommendation. The session starts by asking
the user (one `AskUserQuestion`, up to four questions) and records the answer under **Decided**
before writing code. "Light" is one question.

## How each session runs

As [`qa-fixes.md`](./qa-fixes.md)'s *How each session runs*, with these differences:

1. The *Evidence* line numbers are from the triage (2026-10-01, `84be5f3`). Re-check them.
2. **Reproduce first**, on HEAD, in the real app: Editorial **card 2**, Publish, Open, the tester's
   steps at 1440, 768 and 390. The harness numbers below are the triage's; re-take them.
3. **Themes per entry, from the table above**, at all three widths, canvas and `live=1`, against a
   HEAD worktree on :5174 (`node_modules` an APFS clone, `cp -Rc`, with its `.vite` removed;
   normalise the port and `\.jpg\?[^|]*` in `src`, or restart :5173). Prove the harness (0
   differences, tree against HEAD, unedited) and **name the expected after-diff before writing
   code.**
4. **An entry that reverses a recorded call** (JP-092, JP-093, JP-094, JP-096, and JP-098 and
   JP-099 on their code options) adds a *reversed* pointer where the call was recorded (the plan's *Settled*
   bullet, the code comment) and rewrites any CLAUDE.md, README or `notes/` line that states the old
   call as a rule. A **fit slip** (JP-097, JP-100) adds the pointer and says how it happened.
5. **The real app is Editorial card 2**, then Lime's and Grunge's card 2 for every entry that
   reaches them, and Retro's card 2 for every entry that reaches every template. Under Lime, Grunge
   and Editorial the header's arch 5 folds onto 1, so a layout-2 header hit is arch 1 **and** 5;
   Retro's six do not fold.
6. **A new or re-scoped field gets a measured `in`**: a row in `source/scripts/reach.mjs`'s `PROBES`
   (do not rebuild it), and the `in` and the hint written from what it prints.
7. **The digest's text column is short** (40 characters, the element's own text nodes): a longer
   string, or one glyph changed at the same width, needs a `textContent` read beside it.
8. Drive anything live-only in the popup from the opener, per `verifying-the-published-tab`. The
   published desktop **lays out at 1180 and zooms** (`min(w, 1440) / 1180`): a width measured in
   the tab at 1440 is a 1180 layout width times 1.22, which is how the tester's 197 is the canvas's
   160.
9. Update the docs the entry names. Commit, fill in **Settled** and the status row, then print the
   hand-off prompt for the next entry and stop.

**Do not refresh the root `index.html` per entry.** The sweep does it once.

---

## JP-099 — 390: the player has no ♡ ↓ ⋯

**Verdict: confirmed, and a recorded call every template shares.** At 390 both layout-2 bars drop
the clock and the three icons, close the padding and narrow the gaps, so the track the player is on
is named. Retro made the call (*"A frame's own render can be the artefact … The 390 bar emits the
desktop 40/24 into a 330px pill and leaves the track it is playing a sliver of its sleeve …
honouring the absence would publish a player naming nothing. Override at 390 only"*,
`../retro/layout-2.md:891`–`899`). Lime added its padding on top (`../lime/layout-2.md:631`–`635`),
Grunge inherited it silently, and Editorial named it (`layout-2.md:1101`–`1103`, open question 7,
designer note 6).

**What the master does.** The 390 bar (`I986:15683;879:10509`) is 330 × 108, padded 40 / 40, gap
24. The transport is 117.1. The inner pill (sleeve and title) is **22.9 wide**, clipped: the sleeve
is a sliver at x 191.1, the title column starts at x 263.1 and its 184-wide text runs off the bar,
and the clock (x 276) is off it too. **The icons sit inside, at x 228–290** (62 wide, gap 12,
13px). So 40 + 117.1 + 24 + 22.9 + 24 + 62 + 40 = 330: the master pays for the icons with the
whole title.

**What the page does** (harness, Editorial; Lime and Grunge identical): the bar 330, padded 16, gap
14, transport 96.5, the inner pill 187.5 (sleeve 60, gap 12, title box 115.5). The seeded SLOW BURN
is 115.5 at 23px. Retro's bar pads 20, its title box 103.5 at 18px.

**The icons are inert everywhere.** At 1440 and 768 they are plain spans with no handler, cursor,
href or label, on both surfaces and on the published page.

**What the icons would cost at 390.** The cluster at 768's size (13px, gap 12) is 61.1, plus the
bar's 14 gap, 75.1:
- with the sleeve: the title box goes 115.5 → **40.4**, two or three letters of SLOW BURN;
- with the sleeve dropped (−72): about **112.4**, "SLOW BU…";
- transcribing the frame (padding 40, gap 24): 22.9 for the sleeve and the title together, the
  frame's own picture.

**Evidence.**
- The `s.limeTree` bar: padding `0 ${s.mob ? '16px' : u(40)}` (`EncoreSection.jsx:6709`), gaps
  (`:6710`, `:6712`), the inner pill's sides (`:6728`–`6731`, comment `:6714`–`6725`), the clock
  `{!s.mob && …}` (`:6737`), the icons `{!s.mob && (…)}` (`:6739`–`6743`).
- Retro's and Pop's bar: padding 20 at 390 (`:7002`), gaps 14 (`:7003`, `:7010`), the clock
  (`:7045`), the icons (`:7048`–`7052`), comments `:6996`–`7001`, `:7026`–`7031`, `:7041`–`7044`.

**Decision.**
- **A (recommended). Keep the override, with a reply.** The master hides the track's title to fit
  three icons that do nothing; the page keeps the title. Already a designer note (6).
- **B. Draw the icons, the title ellipsises** to about 40px.
- **C. Draw the icons and drop the sleeve at 390**, the title about 112 ("SLOW BU…"). The closest
  thing to the frame that still names the track: the frame's sleeve is a sliver anyway.
- **D. The icons on a second line.** The bar's fixed 108 grows.

**Expected after-diff.** A: none. B–D: media `arch 1` at mobile × themes 0–4 × both surfaces, 10
files, the bar's rows.

**Verify** (B–D). The seed and `live=1`'s cued LATE LIGHTS at 360, 390 and 414: nothing past the
bar, the icons inside it, the title's ellipsis on its own box; Retro's 103.5 box the same check.

**Docs.** A: the reply alone. B–D: the three override comments, *reversed* pointers at
`../retro/layout-2.md:891`, `../lime/layout-2.md:631` and `layout-2.md:1101` / `:2132` / `:2193`,
and `notes/media.md`.

**Settled.** —

---

## JP-093 — the form's box labels are faint

**Verdict: confirmed, and a recorded "accepted diff" that does not fit these boxes.**
`index.css` gives every placeholder `opacity: .45`. At form layouts 2 and 3 the box holds no
placeholder in that sense: it holds the field's **label**, and the boxes have no other one. The
canvas draws that label as a full-ink span, so the canvas and the published page disagree on
every template. The recorded call was made for layout 1, where the label stands above the box and
the box holds a real hint: *"a published placeholder draws at `::placeholder`'s `.45` where the
canvas span draws it full, which is Repertoire's accepted diff … why no fourth `.hv-*` class was
added"* (`notes/form.md:46`–`48`; README `:470`–`472`; repeated in Lime's, Grunge's and Editorial
layout 4's plans). Its layout-2 half (`notes/form.md:56`–`57`) already says the box "holds the
field's **label** instead".

**Figma: every label is solid**, full opacity, no ancestor opacity: Editorial `964:64614` /
`986:15673` / `986:15692` `#141414` (`sem/text/2`), Lime `964:64595` `#15180f`, Grunge `964:64633`
`#ffffff`, Retro `964:64652` `#fbf6ea`; layout 3's (Editorial `964:68747`, Lime `964:68682`,
Grunge `964:68714`) the same.

**Contrast at 1440, `live=1`** (computed `::placeholder`, now → solid):

| Theme | Layout 2 (`arch 1`) | Layout 3 (`arch 2`) |
|---|---|---|
| Editorial (`#141414` on `#DA7C5E`; on `#FFF9F2` at layout 3) | **2.29 → 6.16**, the tester's | 2.96 → 17.62 |
| Lime | 2.76 → 13.22 | 3.69 → 11.54 |
| Grunge | 4.47 → 17.40 | 4.47 → 17.40 |
| Retro (`#FBF6EA` on `#E8B33B`) | 1.30 → **1.78** | 2.95 → 16.21 |
| Pop | 2.99 → 18.42 | 2.99 → 18.42 |

Retro's own frame pair is 1.78:1 even solid: a designer note, not this ticket's.

**Evidence.**
- `source/src/index.css:120`: `input::placeholder, textarea::placeholder { color: inherit; opacity: .45; }`,
  a global rule the published tab clones in.
- Layout 2, `s.limeTree` block (`EncoreSection.jsx:23921`): the canvas span in `box(bad)` with
  `color: ink` (`:24002`–`24008`), the live `<input placeholder={up(f.label)}>` (`:24187`–`24195`).
  Retro's and Pop's body (`if (s.v1)` at `:24287`): `:24574`.
- Layout 3: the `s.limeTree` block (`:24806`) at `:24939`, Retro's and Pop's at `:25123`.
- **Not these boxes:** layouts 1 and 4 hold a real `f.placeholder` under a visible label (`:23369`,
  `:23688`, `:25349`); the repertoire search (`:11123`, `:11287`, `:11709`, `:11861`) and the
  calendar wizard's cells (`:16769`, `:17078`) are hints too.

**Decision.**
1. **Mechanism.**
   - **A (recommended). A custom property on the global rule**: `opacity: var(--ph, .45)`, and
     the four label-in-box inputs set `--ph: 1` inline. One CSS line, no new class, every other
     placeholder unchanged, and the canvas and the page agree by construction. It is `--ac`'s
     mechanism (an inline custom property a stylesheet reads), so CLAUDE.md's "only `.hv-indent`,
     `.hv-acbord` and `.hv-acfill` cross the boundary" gains a clause.
   - **B. An overlay span over an empty input**, `pointerEvents: none`, in the canvas span's style.
     No CSS, but the native placeholder goes (an `aria-label` replaces it) and `live=1` gains rows.
   - **C. A reply**, the recorded accepted diff. Weak here: unlike the repertoire's, these boxes
     have no other label.
2. **Scope.**
   - **A (recommended). The four label-in-box sites, every template** (form layouts 2 and 3, both
     bodies): every box whose placeholder is its only label.
   - **B. Editorial layout 2 alone** (an `ed` gate). Leaves the same defect on four templates and
     on layout 3.
   - **C. Every placeholder.** Not owed: the others are hints under a visible label.

**Expected after-diff (on 1A, 2A): zero digest files on both surfaces.** The digest reads no
`::placeholder` and no custom property, and the canvas span is already full ink. The proof is a
`getComputedStyle(input, '::placeholder').opacity` read per site: 1 at the four sites, .45 at every
other input.

**Verify.** That read on `live=1` at three widths × themes 0–4 × form `arch 1` and `arch 2`, and on
`arch 0` / `arch 3` and the repertoire search (still .45); the contrast table re-taken off the
computed colour; Editorial's card 2 published at 1440, 768 and 390, empty boxes then typed (the
typed value's colour unchanged); the refused box's ring still reads.

**Docs.** `notes/form.md:46`–`48` (the accepted diff is layout 1's and 4's; the label-in-box
layouts draw it full); README `:470`–`472`; CLAUDE.md's boundary sentence (under 1A); the comments
at the four sites.

**Settled.** —

---

## JP-092 — a long hero name overflows at every width

**Verdict: confirmed, and shared by the three `s.limeTree` templates.** `HeaderV1`'s block sets the
title at the flat ramp (`s.dispLg`: Editorial 97 / 73 / 48, Lime 107 / 81 / 54, Grunge 107 / 81 /
46 faced × 0.75), in a column that is no container, and `Title` has no `overflowWrap`. Under
`alignItems: flex-start` a long word takes its min-content width and runs out of the column. The fit
was declined on the seed: *"The title fits without the layout-1 recipe … the seeded "KAI MERCER"
(5.068 Noto ems) comes to 490 at 97px in the 521 desktop column … No `cqi` fit was owed"*
(`layout-2.md:931`–`935`). JP-086 then named this header's clip with *Supercalifragilistic* at 390
(`qa-fixes.md:795`–`800`), and its reply logged it.

**The column** is 521.1 / 324 / 370 on the canvas: desktop's two `flex: 1 1 0` halves with a
`u(56)` gap, 768's two halves 60 apart (under `ed` topped, so the overrun lands on the cards), 390's
one column. **The 768 half is narrower than the 390 column**, so a fitted long word sets smaller at
768 than at 390. There is no floor (JP-086 had none).

**Reproduced in the harness** (`header&arch=1&live=1&cj={"title":…}`): px past the column / past
the section, and at 768 over the cards' left edge. No word broke inside itself.

| Theme | Width | Featherstonehaugh | Shostakovich | Florence… / Kai Mercer | Supercalifragilistic |
|---|---|---|---|---|---|
| **3 Editorial** | desktop 97 | +401 / **+355** (× 1.22 = the tester's 433) | +100 / **+54** | fit | +416 / +370 |
| | 768 73 | cards **+310** | cards **+83** | fit | cards +321 |
| | 390 48 | +86 / **+76** | fit | fit | +94 / +84 |
| 1 Lime | desktop 107 | +181 / +135.5 | fit | fit | +209 / +163 |
| | 768 81 | cards +148 | +37 into the gap | fit | cards +169 |
| | 390 54 | fit | fit | fit | fit |
| 2 Grunge | desktop 80.25 | +102 / +56 | fit | fit | +131.5 / +86 |
| | 768 60.75 | cards +87.5 | +4 into the gap | fit | cards +110 |
| | 390 34.5 | fit | fit | fit | fit |
| 0 Retro | desktop 79 | +153 / +107 | fit | fit | +146 / +100 |
| | 768 60 | cards +128 | +31 into the gap | fit | cards +122 |
| | 390 40 | fits; **the Book pill 36.3 past the section** | fit | fit | fit |

The tester's "≥14 letters at desktop" is generous: *Shostakovich* (12) already scrolls Editorial's
1440 page by about 66px.

**The arithmetic.** `vm.cardNameEms` (the widest word in `navFace` ems: `notoEms`, `bebasEms`,
`antonEms × 0.75`) is the right key under all three. The seed's MERCER needs 3.412 / 2.453 / 2.248
ems, so `min(ramp, 100cqi / ems)` resolves to the ramp at every width under all three templates
(Editorial's limits 152.7 / 95.0 / 108.4 px against 97 / 73 / 48). Fitted, Editorial's
FEATHERSTONEHAUGH is 54.3 / 33.7 / 38.5 and SHOSTAKOVICH 80.2 / 49.8 / 48.

**Evidence.**
- `HeaderV1` at `EncoreSection.jsx:1917`; its `if (s.limeTree) { … return }` block `:1918`–`2283`,
  no `ed` arm on the title.
- The title: `<Title s={s} size={s.dispLg} color={s.tx} lh={0.89} inline twoTone={grunge} …/>`
  (`:2159`–`2160`), in `identity`, `col(u(18), { alignItems: 'flex-start', minWidth: 0 })`
  (`:2151`). No ancestor is a container (the nav row's, `:2024`, is a sibling); `identity` is sized
  by its parent at every width, so it can take one without moving.
- The rows: desktop `:2270`–`2279`, 768 `:2260`–`2269` (topped under `ed`, `:2265`), 390
  `:2252`–`2259`.
- `Title` (`:935`–`958`): no `overflowWrap` or `wordBreak`.
- `vm.cardNameEms` (`EncoreBuilder.jsx:674`), `vm.navNameEms` (`:666`, the whole name on one line:
  wrong here, since the seed wraps at 768 by design), `navFace` (`:651`–`652`); JP-086's fit
  (`EncoreSection.jsx:1826`); `THEME_RAMP` (`EncoreBuilder.jsx:115`–`133`).
- Retro's half: `<Title size={tab ? s.h1 : s.dispLg} … twoTone>` (`:2470`–`2471`), 79 / 60 / 40;
  its 768 row centred (`:2549`). Retro's face is Fraunces, which has no ems table (`navFace` is null).

**Fix.** In the `s.limeTree` block: `identity` takes `containerType: 'inline-size'` at every width,
and the title is `s.cardNameEms ? min(${s.dispLg}, calc(100cqi / ${s.cardNameEms})) : s.dispLg`,
passed unfaced (`Title` applies `faced()`). It wraps between words and shrinks only when its widest
word would outrun the column. Lime's and Grunge's desktop scroll and 768 overlap go with it: one
block, one key, each twin's `cardNameEms` already in its own face.

**Decision (light).** Retro's half overflows the same way (desktop +107, 768 over the cards by
128), and at 390 its **nav** pushes the Book pill 36px past the page with *Featherstonehaugh*.
- **A (recommended). Name it, not fixed here.** No Retro ticket, and a fit needs a Fraunces ems
  table.
- **B. A Fraunces ems table** (`frauncesEms`, `NOTO_EM`'s recipe) and the same fit in Retro's half.
  M, its own entry after this one.
- **C. `overflowWrap: 'break-word'` in Retro's half.** No table, but it breaks inside a word, the
  thing every Lime-tree name fit avoids (CLAUDE.md, JP-062).

**Expected after-diff: zero** on the seed, every category, themes 0–3, both surfaces: the `min()`
resolves to the ramp under all three, and `identity` is already parent-sized. Header `arch 1` and
`5` are the files at risk.

**Verify.** The five names (above) at 1180, 1440 and 1920 on the published tab, 768, and 360 / 390
/ 414, under Editorial, Lime and Grunge: every word's `Range` one rect, ending inside the column (at
768 short of the cards' left edge) and inside the section; the section's and the document's
`scrollWidth` equal to the width; the seed at the ramp (97 / 73 / 48 under Editorial). Card 2 in the
real app with *Maximilian Featherstonehaugh* at the three widths. The nav wordmark with the same
names (it did not overflow under the three at triage).

**Docs.** `HeaderV1`'s identity and title comment (`:2146`–`2160`); the `vm.cardNameEms` comment
(add `HeaderV1` to its readers); `notes/templates.md`'s *Feature spread* clause; a *reversed*
pointer on `layout-2.md:931`; the answer to `qa-fixes.md:798`'s named layout-2 item.

**Settled.** —

---

## JP-095 (a) — pricing, calendar, media and testimonials labels no field reaches

**Verdict: confirmed, JP-090's rule again.** The triage's marker sweep (every text field and list
row of the category set to a marker, `arch 1`, themes 0–4, three widths, `live=1`) leaves every
reported literal on **all five templates**: each sits in both layout-2 bodies (the `s.limeTree`
block and Retro's and Pop's), but for the calendar's prompt, which `sectionVm` composes for every
layout. Two of them are CLAUDE.md's named exceptions: *"The unreported siblings stay literals: the
bio's `Bio` eyebrow, media layout 2's `● Featured`, the calendar legend and testimonials layout 2's
`✎ What clients say`"* — now reported.

| Literal | `s.limeTree` site | Retro / Pop site | Other layouts | Seat for a key |
|---|---|---|---|---|
| `[ PRICING ]` | `EncoreSection.jsx:9165` | `:9377` | — | new (pricing has no kicker) |
| `WHAT’S INCLUDED` | `:9280` | `:9542` | — | new |
| `Date ↓` / `Availability ↓` | `:15774`–`15775` | `:15877`–`15878` | — | new, two |
| *Pick a date to enquire* | `vm.calPrompt` (`EncoreBuilder.jsx:1312`), read at `:15585` | the same | layouts 1, 3 and 4 (`:15033`, `:16105`, the layout-4 date card via `EncoreBuilder.jsx:1376`) | new, `in` all four |
| `● Featured` (fan card 0's chip) | `:6684` | `:6980` | — | new |
| `{n} Featured / {n} Max` (counter row) | `:6797` | `:7118` | layout 3 (`:7519`, `:7648`); layout 1 prints `{n} / {n} Featured` (`:5884`, `:6230`) | new |
| `✎ What clients say` | `:21525` | `:21692` | layout 3 prints `● {s.testiKicker}` | **`testimonials.kicker`**, `in: [2]`, seeded `TESTI_KICKER` 'Testimonials' (`data.js:735`): the same seat |

- **The prompt is the build's, not a frame's.** The frame's foot reads *Thursday evening selected*;
  the prompt prints whenever no day is cued, which on the published page is always, since the seeded
  `CAL_OPEN` (2025-06-12) has passed. Its siblings, the slot line's " selected"
  (`EncoreBuilder.jsx:1478`–`1482`), went unreported.
- **"Max" is the track count again**, not a maximum (`TracksField`'s cap is 8). The frame reads
  *5 FEATURED / 5 MAX*. The counter's other end is `media.listLabel` (*● Popular*, `in: [1, 2]`,
  JP-071).
- **Casing decides the zero diff.** `[ PRICING ]` and `WHAT’S INCLUDED` (a curly `&rsquo;`) are
  capitals in the JSX; the digest compares `textContent`. Every other literal is mixed case under a
  CSS `uppercase`. So either those two seed the capitals they print, or they seed the frame's case
  under an added `textTransform` and name text-only rows (the convention every other label follows).

**Evidence.** The table, and:
- `notes/media.md`, `notes/calendar.md`, `notes/pricing.md`, `notes/testimonials.md`: none names
  these as calls; `../retro/layout-2.md:350`–`356` (*"A frame label … stays a literal, the media
  player's '● Popular' precedent"*, annotated as narrowed by JP-071 to unreported labels).
- `EditPanel`'s chain: the `kicker` arm is gated on `map` "since the testimonials carry a `kicker`
  too" (`EncoreBuilder.jsx:4052`), so the testimonials' per-layout seed needs an arm of its own.
- `reach.mjs` already has `testimonials.kicker` (`:99`).

**Decision.**
1. **The keys** — **A (recommended). JP-071's shape**, seeded with the literal, uncased, dropped
   when emptied, markup (`[ ]`, `↓`, `●`, `✎`, the counts) the site's:
   - pricing `kicker` (*Pricing*) and a features label (*What’s included*), `in: [1]`;
   - calendar `dateLabel` and `availLabel`, `in: [1]`;
   - media: the chip's word and the counter's two words, `in` as measured (the counter at layouts
     2 and 3, and layout 1's *Featured* if the same key reads there);
   - testimonials: **extend `kicker`** to `[1, 2]` through a per-layout seed (*What clients say* at
     `d === 1`, `TESTI_KICKER` at 2), `mapKickerSeed`'s shape, with its own chain arm.

   The session picks the names the panel reads best.
2. **The media counter** — **A (recommended). Two word fields** (*Featured*, *Max*), so the row's
   counts stay derived. **B.** One key for both of media's *Featured*s (the chip and the counter).
   Against "each field allocated exactly once". **C.** The counter's words stay, as derived
   markup, with a reply.
3. **The prompt** — **A (recommended). A field that reads its seed again when emptied**
   (`messageLabel`'s rule), `in` all four layouts: an empty foot would read as broken. **B.**
   Dropped when emptied.
4. **The unreported siblings** (the repertoire's `All` chip, `REP_ALL`, and its search placeholder;
   the slot line's " selected"; the footer's *A JustPay Product*) — **A (recommended). Named, not
   fielded**, the rule CLAUDE.md states, with the sibling list rewritten. **B.** Field them now, ahead
   of the next report.

**Expected after-diff (on 1A): zero** on the seed, every category, themes 0–4, both surfaces, if
each key reproduces its rendered bytes; otherwise exactly the named text rows of pricing `arch 1`.
The proof is the tester's marker sweep: each new key moves exactly its text row, and an emptied
value removes exactly its node (or reads its seed again, for the prompt).

**Verify.** The seed digest; the marker sweep per key under themes 0–4 at three widths, canvas and
`live=1`; `reach.mjs` for every new or re-scoped key; Editorial card 2 in the real app with every
field marked, published at 1440 / 768 / 390, none of the eight left; the testimonials' *Kicker*
loses its "Not shown in this layout" on card 2; long typed labels wrap (JP-090's `nowrap` sites:
`whiteSpace: 'normal'`, `overflowWrap: 'anywhere'`, `minWidth: 0`).

**Docs.** CLAUDE.md's JP-071 / JP-090 paragraph (the keys, the testimonials kicker's reach, and the
sibling list, which loses `● Featured` and `✎`); `notes/pricing.md`, `notes/calendar.md`,
`notes/media.md`, `notes/testimonials.md`; `reach.mjs`.

**Settled.** —

---

## JP-095 (b) · JP-096 — the map's travel card and list labels

**Verdict, JP-095: confirmed**, nine literals in both bodies, every template, two of them in the
seat of a key that already exists. **JP-096: confirmed, and a recorded call.** Every frame —
Editorial `964:64613` / `986:15672` / `986:15691`, Lime `964:64594`, Grunge `964:64632`, Retro
`964:64651` / `986:11467` — types the card in the same order:

> Travel radius · Venue Distance · ● Confirmed · **Based in** · Manchester, UK · Home location ·
> ──●── · **Willing to travel to** · Lake District · Venue location · Max travel · 100 mi · Travel
> time · ~2 hrs · Booking fee · £1,200 · Venue Link · Get Directions · Other upcoming · 4

Retro's fit printed two lines a column where the frame prints three, on purpose: *"Where a frame
label duplicates what our field's own copy says ('Based in' over `base`, whose default is 'Based in
Manchester'), drop the label, not the field"* (`../retro/layout-2.md:606`–`608`; the code comment
at `EncoreSection.jsx:18675`–`18678`, "printing both would stutter"). Lime, Grunge and Editorial
inherited it (`layout-2.md:1587`).

| Literal | `s.limeTree` site | Retro / Pop site | Seat for a key |
|---|---|---|---|
| *Travel radius* (eyebrow over the h2) | `:18282` | `:18658` | **`map.kicker`**, `in: [0, 2]`, `mapKickerSeed(d)` (`data.js:748`): extend to `d === 1` |
| *Home location* / *Venue location* | `:18303` / `:18319` | `:18694` / `:18712` | new, two |
| *Max travel* / *Travel time* / *Booking fee* | the `stats` array, `:18155`–`18157`, shared by both bodies | the same | new, three; each heads a field (`radius` *Coverage* — JP-060 —, `travelTime`, `fee`) |
| *Venue Link* (a `BookPill` label) | `:18359` | `:18754` | new (`map.cta` is layout 3's *See all gigs*) |
| *Get Directions* | `:18366` | `:18771` | new |
| `Other upcoming · {n}` | `:18434` | `:18854` | **`map.listLabel`**, `in: [0]`, seeded *Upcoming gigs* (JP-090): the same seat and `· N` markup; extend through a per-layout seed |

**The home and venue values.** Home prints `s.mapBase` = `cv('base', MAP_BASE)`
(`EncoreBuilder.jsx:1635`), `MAP_BASE = 'Based in Manchester'` (`data.js:944`), `FIELDS.map.base`
*Based in*, `in: [0, 1, 2]` (`data.js:1832`). Venue prints the featured gig's `g.city`, which no
field reaches. `base` also prints at layout 1 beside the globe (`:17637`, `:17889`; its frame types
*Based in Manchester*, where the seed came from) and in layout 3's foot line `[base, 'N pins',
radius].join(' · ')` (`:19688`, `:20108`). The header's `location` (`vm.location`, seeded
*Manchester, UK*) is the frame's home value exactly, and reaches every section through `identity`.

**Seen on the tester's screenshot, not filed:**

| Seat | Frame | Build | Reads |
|---|---|---|---|
| card h2 | Venue Distance | MANCHESTER | `FIELDS.map.heading`, `d: 'Manchester'` (`TITLES.map`), no `d === 1` seed (`TESTI_HEADING_2`'s arm is the pattern, `EncoreBuilder.jsx:1075`, chain `:4048`) |
| chip | ● Confirmed | ● Jul 12 · 22:00 | `g.when`, JP-060's decision A |
| venue | Lake District | Manchester | the featured gig, which falls back to the page's first; the frame features its third |
| Max travel | 100 mi | 12 mile radius | `MAP_RADIUS` (`data.js:943`), already a follow-up with the designer (`../grunge/layout-4-qa-fixes.md:2120`–`2123`, note 10) |

**Evidence.** The two tables, and `notes/map.md:31` (*Other upcoming* is derived: only the words are
a literal), `:94`–`107` (JP-090: `mapKickerSeed`, the chain arm gated on `map`, the list label as
two text nodes — splitting the `·` moved Lime's and Grunge's widths by 0.1); JP-040 in
`../lime/layout-2-qa-fixes.md:722`–`798` (the card's claims re-seated as fields); `reach.mjs` has
`map.kicker` (`:98`), `map.listLabel` (`:103`) and `map.base`.

**Decision.**
1. **JP-095's keys** — **A (recommended).** JP-071's shape for the two captions and the three stat
   labels, `in: [1]`; `map.kicker` and `map.listLabel` extended to layout 2 through per-layout seeds
   (*Travel radius*, *Other upcoming*), in `sectionVm` and the chain alike.
2. **The two pill labels** — **A (recommended). Read the seed again when emptied**
   (`messageLabel`'s rule): a pill with no label is a broken control. **B.** Dropped, and the pill
   with it.
3. **JP-096, the home value** under its new *Based in* label (and *Willing to travel to* over the
   venue, both JP-071's shape, `in: [1]`):
   - **A. Re-seed `base` at layout 2 alone** (*Manchester, UK*, `mapBaseSeed(d)`, mirrored). Once
     the artist types `base`, one value serves every layout: a typed *Manchester, UK* reads bare at
     layout 1, and a typed *Based in X* stutters at layout 2 (`tiersSeed`'s caveat).
   - **B. The labels alone.** Reprints *Based in / Based in Manchester*, the stutter Retro dropped
     the label to avoid.
   - **C (recommended). Layout 2's home value reads the header's `location`**, the frame's own
     *Manchester, UK*, which the artist already types once (F1). No new seed, no stutter; `base`
     drops to `in: [0, 2]` and its panel says so at layout 2, and `who.location`'s reach gains map
     layout 2 (its `reach.mjs` probe and the header field's hint move too).

   Whichever is chosen, the new label cannot read as the same panel row as `base`, which is already
   labelled *Based in*: name it *Home label* or the like.
4. **The unfiled seats** — **A (recommended). Named, not fixed**: none is reported, and two are
   recorded calls (JP-060, `MAP_RADIUS`). **B.** Seed the h2 *Venue distance* at `d === 1`.

**Expected after-diff.** JP-095's keys (1A): zero on the seed, themes 0–4, both surfaces. JP-096:
map `arch 1` × themes 0–4 × three widths × both surfaces: the two label rows added, and under 3C or
3A the home value's text (*Manchester, UK*), and the card taller by a label line a column. Layouts
1, 3 and 4: 0. The session names the rows before the code.

**Verify.** The seed digest; the marker sweep per key at `arch 1` (and `kicker` and `listLabel` at
`arch 0` and `arch 2` unchanged); an emptied label removes its node (a pill reads its seed again);
`reach.mjs` for every new or moved key, `map.base` re-run (and `who.location` under 3C); under 3C a
`&who=` run with a typed location, which the home value must follow; the card at 390 and 768 with long typed
labels (wrapping, no overflow); the pill row at 768 still wraps under Editorial (layout-2.md's
section 8 override); card 2 in the real app, every field marked, none of the nine left.

**Docs.** CLAUDE.md's JP-071 / JP-090 paragraph (the keys and `kicker`'s and `listLabel`'s reach);
`notes/map.md`; a *reversed* pointer at `../retro/layout-2.md:606` and on the code comment at
`:18675`; `layout-2.md:1587`'s *Inherited whole* clause.

**Settled.** —

---

## JP-100 — 390: the calendar's Start Enquiry stands on its own row

**Verdict: confirmed, and a fit slip (JP-060's shape), not a call.** Retro's QA (`cd8c114`,
2026-09-15, PR #10) shortened the foot's line to *Thursday evening selected* and turned its 390
stack into one row, the frames' own. **Lime's fit (`206c596`, 2026-09-16) does not have `cd8c114`
as an ancestor**, so it drew Retro's pre-QA stack, and its comment still argues from the old long
line: *"The 390 master keeps the pill beside the line and leaves the line 63px — a break inside
'Thursday,' for our composed sentence — so the pill takes its own row, Retro's departure for the
same reason"* (`EncoreSection.jsx:15783`–`15785`). Grunge and Editorial inherited it
(`../lime/layout-2.md:823`–`825`, `../grunge/layout-2.md:1128`–`1131`, `layout-2.md:1470`–`1471`).
`notes/calendar.md:69`–`70` already says "chip, line and pill on one row at every width", which is
false today under the three.

**Figma: one row in every 390 master**, 370 × 84, `HORIZONTAL`, padded 12 / 20, gap 16, `NO_WRAP`;
the left group fills, a 58 × 23 chip then the line at gap 12, three lines and 60 tall.

| Master | Line | Pill | Pill label |
|---|---|---|---|
| Editorial `986:15690` | 60 | 184 | "Star Enquiry" in the demo face, 102 at 18 |
| Lime `986:11880` | 87 | 157 | 75 |
| Grunge `986:13785` | 90 | 154 | 72 |

**The page at 390** (harness, canvas and `live=1` alike):

| Theme | Foot | Height | Pill | Room for the line beside chip and pill |
|---|---|---|---|---|
| Retro, Pop | one row | 84 | 158.1 / 154.2 | 86.9 / 88.7 |
| Lime | stacked | 113 | 164.5 | **80.3** |
| Grunge | stacked | 113 | 155.8 | **88.8** |
| Editorial | stacked | 113 | **198.0** | **46.6** |

The line's widest words (Inter 13): *Thursday* 57.9, *Wednesday* 72.2 (`&today=` can cue any
weekday), *Pick a date to enquire* 46.3. **Lime and Grunge hold one row on every line**, at their
frames' own 80–90. **Editorial does not**: Noto's START ENQUIRY label is about 116 against the demo
face's 102, so the line gets 46.6.

**Evidence.**
- The `s.limeTree` foot, `:15783`–`15812`: `(s.mob ? col : row)(u(s.mob ? 12 : 24), …)`, the
  group `width: '100%'` at 390, `BookPill … full={s.mob}`.
- Retro's and Pop's foot, `:15960`–`16001`: `row(u(s.mob ? 16 : 24))`, the group `flex: '1 1 0',
  minWidth: 0`, the line `flex: '1 1 0'` at 390 (*"The foot is one row at every width, the frames'
  own"*).
- The line `vm.calSlots[].line` (`EncoreBuilder.jsx:1477`–`1482`), the prompt `vm.calPrompt`
  (`:1312`).

**Fix.** Retro's one row in the `s.limeTree` foot at 390: the pill on the row, not `full`, and the
left group `flex: 1 1 0; minWidth: 0`.

**Decision (light): Editorial's line**, which does not fit beside the chip.
- **A (recommended). The left group wraps** (`flexWrap: 'wrap'`, the line's minimum its widest
  word), so the line drops under the chip only when it cannot stand beside it. One rule for all
  three: Lime and Grunge stay chip-beside-line (their frames'), Editorial's line takes the cell's
  116 under the chip, and the pill stays on the row at every template.
- **B. Editorial's pill label fitted to the frame's 184** (about 15.8px, off the ramp). The frame's
  picture, but the plan's heads stay on the ramp (`layout-2.md`'s sections 9 and 10).
- **C. Editorial stays stacked** where the row does not fit (`flexWrap` on the foot), named as
  Noto's wider pill. The ticket's own template keeps the defect.

**Expected after-diff (on A).** Calendar `arch 1` at mobile × themes 1–3 × both surfaces, 6 files:
the foot 113 → about 84 under Lime and Grunge, Editorial's shorter by the pill's row less the chip's
(named in-session), and the section shorter by the same. Retro, Pop, 1440 and 768: 0.

**Verify.** The four seeded days, `&today=` on a Wednesday, and `&booked=` (the prompt, no chip) at
360, 390 and 414, under the three: the pill on the row, nothing past the panel, no word broken
inside itself; the pill still `<a href="#form">` on `live=1`; card 2 in the real app at 390.

**Docs.** The foot's comment (`:15783`, *reversed*, with how it happened); *reversed* pointers at
`../lime/layout-2.md:823`, `../grunge/layout-2.md:1128` and `layout-2.md:1470`; `notes/calendar.md`
(true again, with Editorial's wrap under A).

**Settled.** —

---

## JP-097 — the player's byline lacks *· Single*

**Verdict: confirmed, and a fit slip in every template** (no plan names it). Every layout-2 frame
types the bar's byline *Kai Mercer · Single* — Editorial `964:64601` (`I964:64605;690:4279`),
`986:15660`, `986:15679`; Lime `964:64582`; Grunge `964:64620`; Retro `964:64639` — the playing
track's release after the artist. Both bodies print `now.by`, the artist alone. **Every other place
already prints the release**: layouts 3 and 4 put `track.rel` under `now.by`, and layout 2's own fan
cards and list rows print `t.rel`. Layout 2's bar is the one that does not.

**Evidence.**
- The `s.limeTree` bar: `<span style={{ ...bodySm, ...clip }}>{now.by}</span>`
  (`EncoreSection.jsx:6735`); Retro's and Pop's: `<span style={subType}>{now.by}</span>` (`:7040`,
  `subType` ellipsises, `:6878`).
- `now.by` = `np.by` (`:5806`) = `vm.nowPlaying.by = cased(artistName)`
  (`EncoreBuilder.jsx:883`–`885`).
- `TRACKS` is `[name, dur, release]` (`data.js:657`–`663`); Slow Burn and Late Lights are *Single*.
  `vm.tracks[].rel` (`EncoreBuilder.jsx:868`–`870`) is the release for the seed and the row's whole
  `sub` once the artist edits the list (`:862`–`866`; the seed resolver writes `${rel} · ${dur}`,
  `:3949`–`3950`). `TRACK_KEYS` has no release column (`data.js:680`).
- Layouts 3 and 4: `:7501`–`7502`, `:7625`–`7626`. Layout 2's fan cards `:6672`, `:6973`, rows
  `:6823`, `:7160`.

**Fix.** The bar prints `by · rel` for the playing track, dropping the ` · ` when `rel` is empty —
composed in `sectionVm` (a per-track `by`, `vm.quotes[].byline`'s precedent), so `EncoreSection`
composes nothing. Once the artist edits the list, `rel` is the row's whole subtitle, so the byline
reads *Kai Mercer · Single · 4:55*: the same line the row under it prints, as layouts 3 and 4
already do. A separate release column would be a repeater change (`notes/list-editors.md`), not
owed by this ticket.

**Expected after-diff.** Media `arch 1` × themes 0–4 × three widths × both surfaces, 30 files, the
byline's text row only (the canvas plays Slow Burn and `live=1` cues Late Lights; both *Single*).
The 390 `s.limeTree` box is 115.5 and the byline about 106 at 12, so it fits; **Retro's 390 box is
103.5 and ellipsises it** ("…Singl…"), named.

**Verify.** The digest as named; `&cj=` with an edited track list (the byline follows the row's
subtitle), with an emptied subtitle (no dangling ` · `) and with a long one (the ellipsis on its own
box); `live=1`: each track played moves the byline with the title.

**Seen, not filed.** On the published 1440 the cued LATE LIGHTS ellipsises in the bar's title box
(138 in 129.6) — the tester's "LATE LIG…". Section 3 widened that box for SLOW BURN only
(`layout-2.md:1096`). Name it in the reply's *not changed* list.

**Docs.** `notes/media.md`'s now-playing paragraph (`:15`–`24`); the `vm.nowPlaying` comment
(`EncoreBuilder.jsx:876`–`885`).

**Settled.** —

---

## JP-098 — 768: six gallery tiles, and no *Gallery · View list ✕*

**Verdict: confirmed, and two recorded calls, every template's** (the gallery's layout 2 is one
shared branch; Lime, Grunge and Editorial differ only through ternaries).

**What the 768 master draws** (`986:15668`; Lime `986:11858`, Grunge `986:13763` and Retro
`984:36046` are the same tree):
- the right column is a **head row** (342 × 20) over a band (342 × 358, `clipsContent`): *Gallery*
  (Inter Bold 11, `#141414`), a spacer, *View list* (Inter 12) and *✕* (Inter 13);
- the left column's tiles are 123, 215 and a **1px** fill tile, the right's 194, 242 and a 1px one,
  so the band shows three whole tiles and the 242 cut to 154 at its foot — the tester's four;
- the caption reads *MTV "MOOD SWING"* / *FEATURED REEL* at every width;
- the 1440 (`964:64609`) and 390 (`986:15687`) masters have **no head row**.

**What the page draws.** Six tiles at 768, each `flex: ${h} 1 auto`, dividing the 358 band in the
frame's proportions. The head row prints the gallery's *Heading* (seeded *See us in action*) and
not *Gallery*; the caption prints the artist's name alone at 768 and heading + name at 1440 and 390.

**The recorded calls (Retro's, inherited by all three twins):**
- the tiles: *"a designer does not leave two 1px frames in one. Divide the band in the frame's
  proportions instead … Honouring a squeeze costs content"* (`../retro/layout-2.md:1056`–`1064`):
  four tiles would leave two of the seven slots unreachable at 768;
- the head row: *"where a field the design had nowhere for finally goes … the heading … moves and
  the pill keeps the artist's name alone"* (`:1043`–`1055`), and *"The row's own 'View list' and '✕'
  are dead controls and are dropped, named here so the call can be reversed"* (`EncoreSection.jsx:13750`–`13757`);
- Lime `../lime/layout-2.md:721`–`722`, Grunge `../grunge/layout-2.md:950`–`951` and `:980`,
  Editorial `layout-2.md:1279`–`1282`, `:1294`, open question 7 and designer note 6;
  `notes/gallery.md:38`–`45`.

Nothing in the file is a precedent for a gallery list view. The only gallery ✕ is layout 3's
fullscreen viewer, which no frame draws.

**Evidence.**
- `Gallery`'s `if (s.v1)` (`EncoreSection.jsx:13777`); `COLUMNS` (`:13851`–`13853`); the tile's
  `flex: ${h} 1 auto` (`:13899`); the head, `const head = tab && s.title ? …` (`:13946`–`13954`),
  wrapped in a column at 768 alone (`:14047`); the caption, `const lines = (tab ? [s.brand] :
  [s.title, s.brand])` (`:13961`); the claims comment (`:13724`–`13731`) and the squeeze comment
  (`:13762`–`13769`).
- `FIELDS.gallery.heading` (`data.js:1735`), `TITLES.gallery` (`:1115`).

**Decision.**
1. **The tiles** — **A (recommended). Keep six, with a reply**: the 1px tiles are a leaked desktop
   height, and four would hide two photos from a tablet visitor. **B. The frame's four**: [123, 215]
   on the left, [194, 242] on the right, the 242 cut by the band. Two slots unreachable at 768.
2. **The head row** — **A. As it is**: the *Heading* in the row, the name alone in the caption.
   **B (recommended). The frame's allocation**: a new *Gallery label* field (JP-071's shape, seeded
   *Gallery*, `in: [1]`, printed at 768) in the row, and the heading back in the 768 caption, as it
   already is at 1440 and 390. The frame's picture, at no cost to content.
3. **View list / ✕** — **A (recommended). Dropped, with a reply**: two controls that would do
   nothing on the published page. **B.** Drawn as inert spans.

**Expected after-diff.** 1B, 2B or 3B: gallery `arch 1` at tablet × themes 0–4 × both surfaces, 10
files. 1440 and 390: 0. On 1A, 2B, 3A: the head row's text and the caption's lines at 768.

**Verify** (on 2B). 768 on both surfaces: the row reads *Gallery*, the caption heading and name; an
emptied label drops the row (or the session's rule); the marker sweep; `reach.mjs` for the new key;
`live=1`: every tile still picks.

**Docs.** On 2B: CLAUDE.md's JP-071 / JP-090 paragraph, `notes/gallery.md`, the head comment
(`:13942`–`13945`), a *reversed* pointer at `../retro/layout-2.md:1043`. On 1B or 3B: the squeeze
and dead-controls comments, `notes/gallery.md:38`–`45`, *reversed* pointers at
`../retro/layout-2.md:1056`, `../lime/layout-2.md:721`, `../grunge/layout-2.md:950`,
`layout-2.md:1279`.

**Settled.** —

---

## JP-094 — the gaps between sections are too large

**Verdict: confirmed, and a recorded call that layout 3 has already reversed.** Every layout-2
section pads the page's `padY` (80 / 56 / 44) above and below, so each gap is that twice. Retro's
fit chose it: *"The section is shorter than its frame, by design. The frame's 56px inset × 0.82 is
46, and the page supplies `padY` 80 … Fit the card, not the frame height"*
(`../retro/layout-2.md:270`–`274`). Every Editorial layout-2 section named it as an inherited diff
(bio `layout-2.md:1050`; media `:1109`–`1114`, *"a `sectionVm` arm for one section would part it
from its neighbours"*; gallery `:1296`; pricing `:1384`; map `:1605`; form `:1679`; testimonials
`:1782`), and Grunge said it outright: *"Layout 2 has no `vm.pad` arm under any template"*
(`../grunge/layout-2.md:399`–`405`). Two exceptions already stand, both Lime's user call of
2026-09-17 (`9590959`): the calendar's `calc(u(56) - padY)` margin at both ends and the map's at its
top, at desktop, in the `s.limeTree` blocks. **Layout 3 reversed the same call** section by section,
and its sweep fitted the last gap on a user call (2026-09-26): the `vm.pad` arms at
`EncoreBuilder.jsx:459`–`531`.

**The frames.** The page frames stack their sections with no spacing; each section states its own
padding. Editorial (`964:64598` / `986:15657` / `986:15676`), top / foot:

| Section | 1440 | 768 | 390 | Ground |
|---|---|---|---|---|
| header | (nav) / **56** | (nav) / **60** | (nav) / **10** | paper |
| bio | 56 / 56 | 60 / 60 | 30 / 30 | paper |
| media | **86 / 86** | 60 / 60 | 40 / 40 | paper; Scheme 2 panel |
| repertoire | 0 / 0 | 0 / 0 | 0 / 0 | its own sheet |
| gallery | 46 / 46 | **30 / 46** | 40 / 40 | paper |
| pricing | 56 / **32** | 60 / 60 | 30 / 30 | ink band at 1440; paper, ringed, narrow |
| calendar | 56 / 56 | 56 / 56 | 40 / 40 | Scheme 2 card on paper |
| map | 56 / 56 | 60 / 60 | 40 / 40 | paper |
| form | 60 / 60 | 60 / 60 | 40 / 40 | terracotta band |
| testimonials | 56 / 56 | 60 / 60 | 40 / 40 | paper |

**Lime's and Grunge's frames state the same padding for every section at all three widths**
(Lime `964:64579` / `986:11847` / `986:11866`, Grunge `964:64617` / `986:13752` / `986:13771`).
Retro's (`964:64636` / `984:33491` / `984:34437`) do too, but for its header (144 / 86, 100 / 100,
90 / 40).

**The gaps** (A's foot plus B's top; a band's or a ring's edge counts as 0; desktop in canvas px,
the frame × 0.82, and the published tab's × 1.22):

| Pair | 1440: frame / page (→ tab) | 768: frame / page | 390: frame / page |
|---|---|---|---|
| header → bio | **91.8 / 160 → 195** (the tester's 112 / 197) | 120 / 112 | **40 / 88** |
| bio → media | **116.4 / 160 → 195** | 120 / 112 | 70 / 88 |
| media → repertoire | 70.5 / 80 | 60 / 56 | 40 / 44 |
| repertoire → gallery | 37.7 / 80 | 30 / 56 | 40 / 44 |
| gallery → pricing | **37.7 / 80 → 98** | 46 / 56 | 40 / 44 |
| pricing → calendar | 45.9 / 45.9 ✓ | 56 / 56 ✓ | 40 / 44 |
| calendar → map | 91.8 / 91.8 ✓ | 116 / 112 | 80 / 88 |
| map → form | **45.9 / 80 → 98** | 60 / 56 | 40 / 44 |
| form → testimonials | 45.9 / 80 | 60 / 56 | 40 / 44 |
| testimonials → footer | 45.9 / 80 | 60 / 56 | 40 / 44 |

The tester's four desktop pairs and the 390 header → bio reproduce within 3px. **Their "~13 at
tablet" is not an inset**: at 768 the seeded subtitle runs a line longer than the frame's (a named
diff, `layout-2.md:944`–`948`), so the header's cards end about 21 above the identity block's foot.
The real 768 differences are the gallery's 30 top (+26) and −4 to −8 elsewhere. Under Lime, pricing
at 1440 is page ground, so its own 80 top shows as well.

**Evidence.**
- `Z.padY` 80 / 56 / 44 (`EncoreBuilder.jsx:91`–`93`), `SIZES.*.pad` (`:68`–`70`),
  `PublishedPage`'s `pad: ${base.padY} ${padX}` (`:4760`); the root's `padding: bleed ? 0 : s.pad`
  (`EncoreSection.jsx:26439`).
- The layout-3 arms (`EncoreBuilder.jsx:459`–`531`), each gated on Lime, Grunge and Editorial by name.
- The layout-2 in-block overrides: `HeaderV1`'s nav `margin: calc(u(navTop) - padY)` (`:2023`;
  Retro's `:2352`), pricing's desktop foot span (`:9328`–`9341`), the calendar's margin
  (`:15744`–`15748`), the map's (`:18634`–`18636`).
- **The trap: bleeds that assume the root pads exactly `padY`** (`calc(-1 * s.padY)`): pricing's
  foot span (`:9340`), Retro's pricing sheet (`:9584`), the repertoire's sheets (`:11651`,
  `:11878`), the form's sheets (`:24054`, `:24433`), and the helpers `Grain`, `TornEdge`, `ArcEdge`
  (`:202`, `:218`, `:255`). An arm that sets `vm.pad` without the keys these read misplaces them.
  Sections with unequal top and foot (the header, the gallery at 768, pricing at 1440) need per-side
  keys or a per-site audit.

**Decision.**
1. **Scope.**
   - **A (recommended). Lime, Grunge and Editorial** (`s.limeTree`), a `d === 1` arm in `sectionVm`
     beside layout 3's: their frames agree to the pixel, and it is layout 3's precedent.
   - **B. Editorial alone.** The twins keep the same gaps, which the tester will file next.
   - **C. Every template.** Reverses Retro's original call; Retro's header insets differ, and Retro's
     and Pop's bodies carry their own sheet bleeds.
2. **Widths** — **A (recommended). All three**, the frames' own numbers (390's header → bio is 88
   against 40). **B. Desktop alone**, where the reported gaps are.

**Fix (on 1A, 2A).** A `d === 1` arm in `sectionVm` setting each section's top and foot from the
table (× 0.82 at desktop), with per-side keys the bleed sites read, so every `calc(-1 * padY)` and
in-block `u(56)` margin stays right; the calendar's and the map's in-block margins fold into the arm
where that is simpler. The repertoire and the form keep theirs (sheet and band, their own insets);
the header's top stays its nav margin's. The session audits every `s.padY` read inside a section the
arm changes before writing it.

**Expected after-diff (on 1A, 2A).** Geometry only, under themes 1–3: header `arch 1` and `5`, bio,
media, gallery, pricing, map and testimonials `arch 1` at three widths, and the calendar at 390 —
about 75 files a surface. Each pair in the table above that already matches moves 0. Themes 0 and 4:
0. The session names the exact list from a re-taken table before the code. The layout picker's
thumbnails and card 2 follow through `sectionVm`.

**Verify.** Every pair of the table re-measured on the canvas and in the published tab (× 1.22 at
1440) against the frames, under the three templates, three widths; the bleeds (repertoire sheets,
pricing's band and foot span, the form's sheet) still meet their edges; the calendar's and the map's
desktop insets unchanged if their margins fold in; Retro and Pop byte-identical; card 2 in the real
app, the tester's four pairs and 390's header → bio.

**Docs.** The comment block at `EncoreBuilder.jsx:459` (a layout-2 arm beside layout 3's); the
in-block comments at `EncoreSection.jsx:9328`, `:15744`, `:18634`; *reversed* pointers at
`layout-2.md` `:1050`, `:1109`, `:1296`, `:1384`, `:1471`, `:1605`, `:1782` and
`../grunge/layout-2.md:399`, and at `../retro/layout-2.md:270` under 1C; README's *the desktop page
is the 1440 frame at 0.82* (`:644`) gains a clause on the vertical inset at layouts 2 and 3.

**Settled.** —

---

## End-of-pass sweep

1. Full digest against a `main` worktree on :5174 (port and `?t=` normalised), all categories ×
   themes 0–4 × three widths × canvas and `live=1`, the footer's `page=2` render included. Every
   diff must be one a Settled above names, and every named file must differ.
2. The repro sets re-run on the final tree, read off the DOM: JP-092's five names at the seven
   widths (1180 / 1440 / 1920, 768, 360 / 390 / 414); JP-093's `::placeholder` opacity per site; JP-094's gap table; the marker sweeps of both
   JP-095 entries (none of the seventeen left); JP-100's foot at 360 / 390 / 414 with the four days.
3. `reach.mjs` for every `in` that moved (both JP-095 entries, JP-096's labels and `map.base`,
   JP-098's label if added).
4. Walk Editorial card 2 in the real app and the published tab at 1440 / 768 / 390 — the tester's
   steps for each ticket — then Lime's and Grunge's card 2 once, and Retro's card 2 for every entry
   that reaches every template.
5. `npm run build:standalone`, then `cp source/dist-standalone/index.html index.html`, in its own
   commit. Then a two-build digest (`build-digest.mjs`, `CARD=2`), whose diff should be only the
   named rows.
6. `plans/README.md`'s Editorial row, and one reply line per ticket for QA (fixed / by design /
   needs PO), headed by the retest-against-the-stamp line
   (`curl -sI https://siniiitsa.github.io/js-plus-prototype-2/`; the triage read
   `Thu, 01 Oct 2026 10:11:08 GMT`, 8,779,739 bytes). Gather what is worth telling the designer —
   Retro's form label pair at 1.78:1 even solid (JP-093), the 390 bar and the 768 gallery's leaks if
   their calls stand — into a note at the plan's foot.

**Settled.** —
