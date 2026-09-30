# Editorial QA fixes — bug-by-bug plan

Working checklist for the tester's first batch against the **Editorial template, layout 1** (card 1
of the setup modal, *Hero*): JP-085 … JP-091. It works like
[`../grunge/qa-fixes.md`](../grunge/qa-fixes.md): **one entry per session, with context cleared
between sessions**, and each session writes what it settled back into this file.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then *How each
session runs* in [`../grunge/layout-3-qa-fixes.md`](../grunge/layout-3-qa-fixes.md) (the digest
recipe, the harness parameters, `reach.mjs`), *Verification harness* in
[`../retro/qa-fixes.md`](../retro/qa-fixes.md) (the `&cj=` harness), then the memory notes
`verifying-the-published-tab` and `browser-tool-choice`. Then the section's `notes/` file, which
each entry names. [`layout-1.md`](./layout-1.md) holds the Figma node ids of every Editorial
layout-1 frame (its *The sections* table; the page is `964:58611` / `986:48237` / `986:48250`), and
its *Settled in section N* bullet is the fit each entry moves. The shapes the entries copy:
- JP-071 in [`../grunge/retest-qa-fixes.md`](../grunge/retest-qa-fixes.md): a frame label becomes a
  seeded, uncased, emptiable field;
- JP-054 / `FORM_BTN_4` in [`../lime/layout-4-qa-fixes.md`](../lime/layout-4-qa-fixes.md): a
  per-layout seed, gated on the absent key and `d`, mirrored in `EditPanel`'s seed chain;
- JP-062 in [`../grunge/layout-3-qa-fixes.md`](../grunge/layout-3-qa-fixes.md): a display name
  fitted to its widest word (`vm.cardNameEms`), never broken inside a word;
- JP-056 in [`../grunge/qa-fixes.md`](../grunge/qa-fixes.md) and its reversal in
  `../grunge/retest-qa-fixes.md`: a display face the design names but nobody can ship.

Branch: **`editorial-qa-fixes`, forked from `main`** (`bec23d0`, after PR #44). One commit per
entry (`Fix JP-086: …`). A decision-only entry commits the plan alone.

**Build and reproduction.** At triage (2026-09-30) the deployed Pages build read
`Wed, 30 Sep 2026 15:07:50 GMT`, 8,776,960 bytes, byte-identical in size to `main`'s root
`index.html` (`ab598a7`, the Editorial layout-4 refresh). The report does not name its build.
**Every verdict below is from reading HEAD, not from running it**: each session reproduces its
ticket on HEAD (canvas and `live=1`, and the tester's steps in the real app) before writing code,
and records it if something does not reproduce.

**What reaches which templates.** This decides each entry's digest theme list. `digest.mjs`'s
default list is `0,2,3,4`, which **skips Lime**, so always pass the list explicitly.

| ID | Where the cause sits | Templates | Digest themes |
|---|---|---|---|
| JP-085 | `THEMES[3]`'s `display` / `label` | Editorial alone | — (decision) |
| JP-086 | `HeaderV0`'s 390 title size, `ed` arm | Editorial alone (probe Lime and Grunge) | 1–3 |
| JP-087 | gallery layout 1's 390 source row, **both** bodies | every template | 0–4 |
| JP-088 | calendar layout 1's foot pill, `s.limeTree` block | Lime, Grunge, Editorial | 0–3 |
| JP-089 | three layout-1 seeds; Lime's fit recorded all three as named diffs | Lime, Grunge, Editorial | 0–4 |
| JP-090 | four literals, each in **both** bodies (the triage read the map's two as `s.limeTree`-only) | every template | 0–4 |
| JP-091 | `NavBar`'s `s.limeTree` arm (HeaderV0) | Lime, Grunge, Editorial (probe Retro) | 0–3 |

## The report (translated)

> **JP-085 — the headings are set in a different face from the design.** Editorial → Hero → Use
> this header → Publish → Open, 1440, against Figma `964:58611`. Dev Mode names
> `var(--font-display, "FONTSPRING DEMO - Fisterra Fora")`, 179px, line-height 75%. The build sets
> every head — the hero name, the section heads, the nav, the buttons — in Noto Serif Display. The
> design's face is heavy, with curly serifs and ligatures; the build's is thin and narrow, and the
> page looks different for it. The whole theme. "The same story as JP-056 on Grunge (Stones Crush →
> Anton)." The design uses a Fontspring demo, so BA / design must first decide whether there is a
> web licence or what replaces it. Not checked: exact sizes; whether every node uses the face.
>
> **JP-086 — 390: a long name in the hero is cut off on the right.** Header Title = *Florence and
> the Machine*, Publish, Open at 390. The name is always 107px on mobile, so any word of 8+ letters
> runs off the edge and is clipped: FLORENC / AND THE / MACHIN, and CHEMICA / BROTHE for *The
> Chemical Brothers*. There is no horizontal scroll, so the visitor just sees a clipped name.
> Controls: *Kai Mercer* and *Sienna Vale* fit; 768 and 1440 shrink the name (43.9 / 71.5px);
> Grunge with the same name fits at 390. Not checked: 360, 414, a real phone.
>
> **JP-087 — 390: the TikTok tile in the gallery wraps onto its own row.** Gallery → fill the
> YouTube, Instagram and TikTok links → Publish → Open at 390. Expected: four tiles on one row; in
> `986:48250` the row scrolls sideways and TikTok is partly visible. Actual: three tiles, then
> TikTok alone on a second row.
>
> **JP-088 — calendar layout 1: an extra "Check a date" button in the card.** Publish → Open at
> 1440, the calendar. Expected: the card's foot holds only "Enquiry for …", no button (`964:58611`).
> Actual: a CHECK A DATE → pill bottom right, set by the calendar's *Button* field, "a deliberate
> decision the design does not have". Frontend or design to decide whether it is needed.
>
> **JP-089 — default copy differs from the design.** Calendar head *AVAILABILITY* where the design
> reads *BOOK NOW*; the form's submit *BOOK NOW* where it reads *ENQUIRE*; pricing chips *All /
> Solo / Trio / Band* where it reads *Private Event / Club Night / Festival*. All editable, so only
> the defaults need to change.
>
> **JP-090 — texts on the page that no field reaches.** The tester put a unique marker into each
> of the 249 text fields; these stayed: *[ 001 ] STRUCTURE · BIO_01* (bio), *Shows/coverage* and
> *UPCOMING GIGS ·* (events map), *EVENT TYPE* (form). And the map's *Kicker* field is marked "Not
> shown in this layout" although *Shows/coverage* stands in exactly its seat. Expected: every
> visible label has a field, as Grunge does after JP-071.
>
> **JP-091 — 1440: with a long name the header nav wraps to two lines.** Title = *Florence and the
> Machine*, Publish, Open at 1440. Expected: the nav on one line, as designed. Actual: the links
> wrap onto two lines inside the capsule. With *Kai Mercer* it is one line.

## Status

| Order | ID | Report (short) | Verdict | Size | Decision | Status |
|---|---|---|---|---|---|---|
| 1 | JP-085 | Heads in Noto Serif Display, not Fisterra Fora | **By design so far**: the named stand-in (layout-1.md decision 1, user call, 2026-09-24). The licence question is the PO's | — (decision) | **user: A, a reply; the licence with the PO** | **done** (no code; the facts in `layout-1.md` open question 1) |
| 2 | JP-089 | Three layout-1 seeds differ from the frame | **Confirmed, and recorded**: Lime layout 1 named all three as diffs; Grunge and Editorial inherited them | S | **user: 1A, 2A** | **done** |
| 3 | JP-090 | Four literals no field reaches; the map's Kicker says "Not shown" | **Confirmed**: JP-071's rule, four more sites, every template (the map's two in both bodies too) | S–M | **user: 1A, the whole bio line, 2A** | **done** |
| 4 | JP-088 | Calendar layout 1's *Check a date* pill | **Confirmed, and recorded**: Retro's deliberate addition, kept by Lime's fit | S | **user: A, the line links only on a picked day** | **done** |
| 5 | JP-086 | 390 hero name clipped | **Confirmed**: Editorial's 390 title is a flat 107px, the only width it is not fitted | S | no | **done** |
| 6 | JP-087 | 390 gallery: TikTok wraps to a second row | **Confirmed, and recorded**: wrapping is the shared rule, chosen over the frame's run-off | S–M | **yes** | open |
| 7 | JP-091 | 1440 nav wraps with a long name | **Confirmed in the code, size unmeasured**: below the links' 12px floor the row wraps, a recorded "least bad" | M | **yes, after measuring** | open |
| 8 | — | End-of-pass sweep | — | S | — | open |

**Why this order:**
- **The outside question first.** JP-085 writes no code. Its answer goes to the PO while the code
  entries run. If it turns into code (a licence), that is its own plan, `display-face.md`, on its
  own branch after this batch merges, as Grunge's did.
- **Then by footprint.** JP-089's three seeds, then JP-090's four fields (whose seeded after-diff
  should be zero), then JP-088 (one pill, three templates), JP-086 (one size, one template),
  JP-087 (every template's gallery row), and JP-091 last: it has to be measured before it can be
  decided, and it moves a bar all three `s.limeTree` templates share.

**"Decision"** means the entry lists options with a recommendation. The session starts by asking
the user (one `AskUserQuestion`, up to four questions) and records the answer under **Decided**
before writing code.

## How each session runs

As `../grunge/layout-3-qa-fixes.md`'s *How each session runs*, with these differences:

1. The *Evidence* line numbers are from the triage (2026-09-30, `bec23d0`). Re-check them.
2. **Reproduce first**, on HEAD, since the triage only read the code: the tester's steps in the real
   app (Editorial card 1, Publish, Open) and the harness at the ticket's width.
3. **Themes per entry, from the table above**, at all three widths, canvas and `live=1`, against a
   HEAD worktree on :5174 (`node_modules` symlinked; normalise the port and `\.jpg\?[^|]*` in `src`,
   or restart :5173). Prove the harness (0 differences, tree against HEAD, unedited) and **name the
   expected after-diff before writing code.**
4. **An entry that reverses a recorded call** (JP-087, JP-088, JP-089, JP-091) adds a *reversed*
   pointer where the call was recorded (Lime layout 1's *Settled* bullet, the code comment) and
   rewrites any CLAUDE.md or `notes/` line that states the old call as a rule.
5. **The real app is Editorial card 1**, then Lime's and Grunge's card 1 for every entry that
   reaches them, and Retro's card 1 for JP-087 and JP-090.
6. Drive anything live-only in the popup from the opener, per `verifying-the-published-tab`. The
   published desktop **lays out at 1180 and zooms** (`min(w, 1440) / 1180`): a width measured in
   the tab at 1440 is a 1180 layout width times 1.22.
7. Update the docs the entry names. Commit, fill in **Settled** and the status row, then print the
   hand-off prompt for the next entry and stop.

**Do not refresh the root `index.html` per entry.** The sweep does it once.

---

## JP-085 — the heads are Noto Serif Display, not Fisterra Fora

**Verdict: by design so far.** Editorial layout 1's session 0 asked exactly this
([`layout-1.md`](./layout-1.md), *The decisions* §1 and *Settled in session 0*, 2026-09-24). The
frame's face is a Fontspring **demo** ("FONTSPRING DEMO - Fisterra Fora"), whose demo licence
cannot ship, and the user chose a free substitute and delegated the pick. The pick was Noto Serif
Display pinned to **wdth 62.5, wght 540–700**, with `faceK` 1: its cap height is the frame's within
1.4% (.715 against .725) and its **stem is the frame's to the pixel** (.154 of the cap), measured.
Open question 1 already says "worth telling the designer the shipped face is a free stand-in, and
that its title sets about 9% wider". This report is that conversation reaching QA first.

**Warn the reply's author:** Grunge's JP-056 is this ticket's twin, was closed as a reply
(2026-09-28), and was **re-filed and reversed a day later** (`../grunge/retest-qa-fixes.md`), because
a reply that only names the stand-in does not close a visible difference for the tester. So the
reply here must say plainly who holds the next step (the PO: a licence), not read as closing it.

**The tester's "thin" is a judgement against a measurement.** Session 0 matched the stem; what
Noto does not have is Fisterra's swash serifs and ligatures (the bio's "THE" in the report's
screenshot), which no free condensed serif has. The hero is also Noto's widest head (×1.09).

**Facts to gather in-session (not guessed at triage)**, for the PO:
- Who sells Fisterra Fora, and whether Fontspring's (or the foundry's) licence offers **webfont
  embedding** on the artists' public sites, and at what price and pageview tier. The "FONTSPRING
  DEMO -" prefix is Fontspring's demo scheme, so a commercial licence is probably on sale there.
- Whether the face is caps-only (layout-1.md says so; `casing: 'title'` with per-site
  `textTransform: 'uppercase'` would then be harmless rather than necessary).
- Whether every display node on the page names it (the tester read the hero only). Sample the
  section heads, the nav and one pill with `get_variable_defs`.

**Evidence.**
- `data.js:180`–`201`: `THEMES[3]`, `display` / `label` = Noto Serif Display, and the stand-in
  comment.
- `data.js:501`–`527`: `NOTO_EM`, `notoEms()`, `notoBoldEms()` — every Editorial nav, title and head
  fit is in these ems.
- `index.html` / `preview.html`: one pinned Google Fonts entry,
  `family=Noto+Serif+Display:wdth,wght@62.5,540..700` (CLAUDE.md: never a second).
- `layout-1.md`: *The decisions* §1 (`:260`), *Settled in session 0* (`:767`–`:813`), open
  question 1 (`:2030`).

**Decision (PO / design).**
- **A (recommended for this batch). Reply: a named stand-in, with the licence question handed to
  the PO.** No code. Append the facts above to `layout-1.md`'s open question 1.
- **B. A web licence is bought, and Fisterra Fora ships.** Its own plan
  (`plans/editorial/display-face.md`), its own branch after this batch merges. It costs what
  Grunge's JP-056 B listed: the `.woff2` self-hosted in `source/src/builder/fonts/` with an
  `@font-face` in `index.css` **and** `preview.html`; a check that it survives
  `dressPublishedWindow`'s style clone and that `vite-plugin-singlefile` inlines it (the size); the
  Noto link entry retired; a Fisterra advance table in place of `NOTO_EM` / `notoBoldEms` in every
  fit (`vm.navEms`, `navNameEms`, `cardNameEms`, `titleWordEms`, the form statement's, the
  testimonials'); every Editorial head fit re-measured at all four layouts; every Editorial digest
  moving; the licence text kept in the repo.
- **C. A heavier Noto at display sizes** (wght 700 on the heads, which the pinned instance already
  serves). Not recommended: the stem was measured equal at 540, so 700 would be *heavier* than the
  frame, and every head fit would have to move to `notoBoldEms`. Listed because the tester's
  complaint is weight; if taken, it is its own plan too.

**Fix.** On A: none. Record the facts in `layout-1.md`'s open question 1 and write the reply. On B
or C: write `display-face.md` and stop there.

**Docs.** On A: `layout-1.md` open question 1 only.

**Decided** (2026-09-30, user call): **A**, a reply naming the stand-in, with the licence question
handed to the PO. No code. B replaces it if a licence is bought. It would then be
`display-face.md` on its own branch, and the licence could be TipoType's self-hosted file or
Adobe Fonts' hosted link, which the facts now name as a second route.

Asked over the facts, gathered in-session and re-checked on HEAD (`50b165c`). Every *Evidence*
line held: the stand-in comment at `data.js:186`, `display` / `label` at `:200`–`201`, `NOTO_EM`
at `:508`, `notoEms` at `:518` and `notoBoldEms` at `:526`. `index.html:11` and `preview.html:10`
each hold one pinned Noto Serif Display entry. There is no `@font-face` in `source/`.

**Settled** (2026-09-30, no code).
- **Nothing under `source/` changed**, so there is no digest.
- **The facts are in `layout-1.md`'s open question 1**, with their URLs and what could not be
  verified. In short:
  - TipoType sells a self-hosted web licence direct, one-time, from **$69 (10k page views a month)
    to $5,037 (20M)**.
  - Its EULA is non-sublicensable. So whether one licence covers every artist site the builder
    publishes, or needs the Corporate & Enterprise licence (price on request), is the question for
    TipoType.
  - Fontspring's pages refused every fetch.
  - Adobe Fonts lists the family, and whether it covers Fora and customers' sites is unverified.
  - The face is caps-only by the foundry's own description.
  - `get_variable_defs` finds it on every display and label node — the hero, the wordmark, the
    section heads, the nav links and the *Book Now* pill. The chips are Chakra Petch.
- **The tester's "thin" stays a judgement against a measurement.** The stem was matched at 540
  (session 0). What Noto lacks is Fisterra's swash serifs and ligatures, which the reply names
  rather than argues.
- **The reply line.** It is in the sweep's shape so step 6 can use it unchanged. It opens on who
  holds the next step, because Grunge's JP-056 reply was refused for reading as closed:
  - **JP-085 — needs the PO: a web licence. Nothing changes in this build.** Editorial's heads —
    the hero, the section heads, the nav and the buttons — are set in Noto Serif Display on
    purpose. The design's Fisterra Fora is a Fontspring *demo*, and the demo licence cannot ship
    on artists' public sites. Noto is the closest free stand-in: the same cap height within 1.4%
    and the same stroke weight, measured. What it lacks is Fisterra's swash serifs and ligatures,
    and no free condensed serif has those. Fisterra is sold by its foundry, TipoType, as a web
    licence from $69 (10k page views a month) to $5,037 (20M). Its terms do not let one licence be
    passed on, so before buying, the PO has to ask TipoType whether one licence covers every
    artist's site the builder publishes or whether that needs their Corporate licence (price on
    request). It is also on Adobe Fonts, whose terms for a builder are not yet confirmed. **The
    next step is the PO's.** Once a licence covering the published sites is in hand, the real face
    replaces Noto in its own piece of work, re-fitting every Editorial heading.
- **Docs.** `layout-1.md`'s open question 1 only, as the entry named. *Notes for the designer* 1
  already says the face is a stand-in. `plans/README.md`'s row is the sweep's (step 6).

---

## JP-089 — three layout-1 seeds differ from the frame

**Verdict: confirmed, and each one was a recorded named diff.** Lime layout 1 fitted the calendar,
the form and pricing against Lime's frames and recorded all three as diffs it chose to keep:
- *"The seed prints AVAILABILITY where the frame types BOOK NOW, `TITLES.calendar`'s precedent"*
  (`../lime/layout-1.md:1014`);
- *"The frame types Enquire where `vm.formBtn` seeds Book Now"* (`:1073`; Grunge's
  `layout-1.md:945` and Editorial's `layout-1.md:1500` repeat it);
- pricing's chips: the frames draw *Private Event / Club Night / Festival* (`:245`), and the row is
  **derived from the packages' tags** (`notes/pricing.md`), seeded from Retro's layout-1 frame's
  *Solo / Trio / Band* behind an `All` chip.

So the three are Lime's, Grunge's and Editorial's alike. **Retro layout 1 does not share them**: it
never reads the calendar heading (`FIELDS.calendar.heading`' `'*': [1, 2, 3]`), and its pricing
frame is Solo / Trio / Band (`data.js:743`, `:762`). The session reads Retro's layout-1 form submit off its
frame before choosing that seed's gate.

**Evidence.**
- Calendar: `FIELDS.calendar.heading` `d: 'Availability'` (`data.js:1708`); `TITLES.calendar`
  (`data.js:1084`); the per-layout table `HEADING_3` / `HEADING_4` (`EncoreBuilder.jsx:250`), and
  `CAL_HEADING_3 = 'Book Me'` (`data.js:1178`).
- Form: `vm.formBtn = cv('button', d === 3 ? FORM_BTN_4 : 'Book Now')` (`EncoreBuilder.jsx:1690`);
  `FIELDS.form.button` (`data.js:1891`); `EditPanel`'s mirror (`EncoreBuilder.jsx:4016`).
- Pricing: `TIERS` (`data.js:747`), `TIERS_3` for layout 3 (JP-070, `:770`), `tierList`
  (`EncoreBuilder.jsx:941`), `vm.tierChips = repChips(tierList)` (`:1021`), `tiersVal` in `EditPanel`.
- `EditPanel`'s seed chain already has `themeName` and `design` in scope
  (`EncoreBuilder.jsx:4008`–`4022`; `navModeDefault(themeName, design)` is a per-template seed).

**Decision.**
1. **Scope.**
   - **A (recommended). Lime, Grunge and Editorial at layout 1**, since all three frames type the
     same three. Seeds gated on the absent key, `d === 0` and the template (FORM_BTN_4's shape plus
     a template test). The calendar heading needs no template gate (Retro's layout 1 never prints
     it); the form's and pricing's do, unless Retro's layout-1 form frame also reads *Enquire*.
   - **B. Editorial alone**, what the tester filed. Leaves Lime and Grunge with the same named
     diffs, which the tester will file next.
2. **Pricing's tags.** The chips are the tags the packages carry, so seeding three chips means
   seeding each package's tags.
   - **A (recommended). One tag each, in the frame's order** — *Private Event* on the first
     package, *Club Night* on the second, *Festival* on the third — unless the frame's cards carry
     a tag row that says otherwise (read `964:58618` first). The `All` chip stays, as
     `notes/pricing.md` records ("the extra `All` chip on the reference picture is the intended
     diff"), and the canvas pins it. The frame's *Club Night* lit is not reproduced.
   - **B. Overlapping tags**, mirroring the seed's current *Solo* / *Solo, Trio, Band* shape.
     Only if the frame shows it.

**Fix (on 1A, 2A).**
- `data.js`: `CAL_HEADING_1 = 'Book Now'`, `FORM_BTN_1 = 'Enquire'` (the frame's copy, uncased —
  `cased()` sets it), and `TIERS_1` — `TIERS` with the three tags replaced and nothing else, as
  `TIERS_3` is.
- `sectionVm`: each read on the absent key at `d === 0` under a `s.limeTree` template (read `T.name`
  or the `limeTree` group the way `sectionVm` already does). `tierList` picks `TIERS_1` there, so
  `vm.tiers` and `vm.tierChips` move together.
- `EditPanel`'s chain: the heading and button arms beside `HEADING_3` / `FORM_BTN_4`, and `tiersVal`
  beside its `TIERS_3` arm. **Each resolver resolves exactly what `sectionVm` resolves**
  (CLAUDE.md, *Repeaters*).
- The fields' hints: pricing's tags hint names the per-layout seeds (it already names layout 3's).

**Expected after-diff (named before the code).** Calendar `arch 0`, pricing `arch 0` and form
`arch 0` under themes 1–3, three widths, both surfaces: the head's text (and any wrap it causes),
the submit's label, and the chip row and each card's tag row. Retro and Pop: 0. Pricing `arch 0`'s
calendar package card reads `vm.tiers` too — check whether the calendar at layout 1 prints the tag.
`vm.formCta` falls back to `vm.formBtn` (`EncoreBuilder.jsx:1700`) only when the artist empties its
own `cta` (seeded `FORM_CTA`), so it is not in the seeded after-diff; the emptied-`cta` case goes
under *Verify*.

**Verify.** The seed digest as named; the chip row filters on the published tab under each of the
three templates (All, then each tag shows its one package); an emptied heading and an emptied
button behave as before; an edited tag list is the artist's at every layout (the absent-key gate);
`EditPanel` shows the seeded values on card 1 and the old ones on Retro's card 1. With the form's `cta` emptied,
whatever reads `vm.formCta` prints *Enquire* under the three templates.

**Docs.** `notes/pricing.md` (the per-layout tag seeds), `notes/calendar.md` and `notes/form.md` if
they name the seeds; a *reversed* pointer on the three named diffs in `../lime/layout-1.md`.

**Decided** (2026-09-30, user call): **1A, 2A.** Lime, Grunge and Editorial at layout 1, and one tag
per package in the frame's order behind the `All` chip. Asked over what the session read first:
- **Pricing.** `964:58618` and its twins `964:58594` (Lime) and `964:58606` (Grunge) draw
  *Private Event / Club Night / Festival* with **no tag row on the cards** and no `All`. Club Night
  is lit over the second card.
- **Form.** Retro's layout-1 form (`964:58584`) reads **Book Now**, so the form seed takes a
  template gate. Editorial's (`964:58620`) reads *Enquire*.
- **Calendar.** Editorial's (`964:58619`) head reads *Book Now*.
- **Reproduced on HEAD** (`69e5c3b`). Editorial card 1, published and opened, prints *AVAILABILITY*,
  *All Solo Trio Band* and a *Book Now* submit at 1440, 768 and 390. The panel shows *Availability*,
  *Book Now* and *Solo / Solo, Trio, Band / Trio, Band*, and Retro's card 1 the same. The harness
  agrees under themes 1–3, canvas and `live=1`.
- **The harness was proven first.** A HEAD worktree on :5174 against the tree diffed to 0 of 180,
  on both surfaces.
- **Expected after-diff.** Calendar, form and pricing `arch 0` × themes 1–3 × three widths = 27
  files a surface, 54 in all, and nothing else under themes 0–4.

**Settled** (2026-09-30). Every *Evidence* line held at `69e5c3b`.
- **Code.**
  - `data.js` adds `TIERS_1` beside `TIERS_3`: `TIERS` with the tags *Private Event*, *Club Night*
    and *Festival*, and nothing else.
  - It adds `CAL_HEADING_1` "Book Now" and `FORM_BTN_1` "Enquire" beside `FORM_BTN_4`, and three
    functions:
    - `limeTreeTheme(name)`, `sectionVm`'s `limeTree` test by name;
    - `tiersSeed(themeName, d)`;
    - `formBtnSeed(themeName, d)`.
  - **All three seeds are template-gated, the calendar's included.** The Decision said the
    heading needed no gate, since Retro's layout 1 never prints it. Without one, though, Retro's
    panel would show *Book Now* under "Not shown in this layout", and *Verify* wants Retro's
    card 1 on the old values.
  - `sectionVm`'s `tierList` and `EditPanel`'s `tiersVal` both call `tiersSeed()`, and `vm.formBtn`
    and the chain's `button` arm both call `formBtnSeed()`. So each pair resolves one expression
    by construction rather than by mirroring. The calendar is one arm on each side, after the
    `HEADING_4` arm: `d === 0 && vm.limeTree` in `sectionVm`, and `design === 0 &&
    limeTreeTheme(themeName)` in the chain.
  - `EncoreBuilder.jsx` no longer imports `TIERS`, `TIERS_3` or `FORM_BTN_4`.
  - The *Button* and *Packages* hints name the layout-1 seeds.
  - **Pricing arch 4 folds onto `d === 0`, so it takes `TIERS_1` too.** That is correct, and it
    is not in the digest's four layouts.
- **Digest.** The tree against the HEAD worktree on :5174, **every category**, themes 0–4, three
  widths, canvas and `live=1`, port and photo stamps normalised. **Exactly the 54 named files
  differ** (27 of 660 a surface): calendar, form and pricing `arch 0` × themes 1–3 × three widths.
  - Only text rows and the chips' widths moved. No row count changed.
  - The chip row stays one line at every width: 390 ends inside its canvas, 768 ends at 654, and
    the desktop row stays right-aligned, its last chip ending at 1194 as before.
  - The calendar head's text changed and nothing wrapped.
  - Retro, Pop, calendar layout 4's *Package ›* (`pageTiers()`, name and price) and every other
    section: 0.
- **Verify.**
  - **The real app** (a scratch puppeteer script, deleted). Lime's, Grunge's and Editorial's
    card 1, published and opened, print *Book Now* over the month, *Enquire* on the submit and
    *All · Private Event · Club Night · Festival* at 1440, 768 and 390.
  - **The published chip filter works** under all three: *All* shows the three packages, and
    each tag shows its one.
  - **The edit panel** shows *Book Now*, *Enquire* and the three tags on card 1. Retro's card 1
    shows *Availability*, *Book Now* and *Solo / Solo, Trio, Band / Trio, Band*, and publishes
    exactly as before.
  - **`&cj=` against HEAD, 0 of 60 on both surfaces, themes 0–4, every layout of the section:**
    - an emptied `heading` (calendar);
    - an emptied `button` with `cta` emptied as well (form);
    - an edited two-package `tiers` list (pricing). The artist's list is theirs at every layout.
- **The entry's `formCta` Verify line cannot hold, and was not made to.** `vm.formCta` is read at
  layouts 2 and 3 alone (`FIELDS.form.cta` `in: [1, 2]`). With `cta` emptied it falls back to
  `vm.formBtn` at `d` 1 or 2, which stays *Book Now*, as the `&cj=` digest shows. Layout 1's
  `button` is the only seed JP-089 moves.
- **Docs.**
  - **Reversed pointers**:
    - Lime `layout-1.md`'s section 8 calendar bullet and section 9 *Named diffs*;
    - a new section 7 bullet, since Lime's pricing *Settled* never recorded the chip copy. Its
      item 8, the `:245` the entry cites, named the chips only for casing;
    - Grunge `layout-1.md`'s and Editorial `layout-1.md`'s repeats of the form diff;
    - the two `EncoreSection` comments, the calendar head's and the form block's.
  - **Rewritten**: `notes/pricing.md`'s per-layout tag seeds and `notes/form.md`'s
    "Book Now at the others". There is a new `notes/calendar.md` bullet and a README clause on the
    pricing seeds.
  - `CLAUDE.md` states none of the three seeds, so it is unchanged.

---

## JP-090 — four labels no field reaches

**Verdict: confirmed.** JP-071 (`../grunge/retest-qa-fixes.md`) turned eight frame labels into
seeded fields and left the unreported siblings as literals (CLAUDE.md lists four: the bio's `Bio`
eyebrow, media layout 2's `● Featured`, the calendar legend, testimonials layout 2's `✎`). The
tester has now reported four more, and one of them sits in the seat of a field that already exists.

| Literal | Sites | Reached by | Fix shape |
|---|---|---|---|
| `[ 001 ] Structure · Bio_01` | `EncoreSection.jsx:3913`, `:3918` (`s.v0 && s.limeTree`), `:4071` (`s.v0`, Retro and Pop) | every template, bio layout 1 | new `FIELDS.bio` field, JP-071's shape |
| `Shows/coverage` | `:17498`, `:17922` (the map's `s.v0` → `s.limeTree` block, `:17371` / `:17437`) | Lime, Grunge, Editorial, map layout 1 | **extend** `FIELDS.map.kicker` (`data.js:1763`, `in: [2]`) to layout 1 with a per-layout seed |
| `Upcoming gigs · N` | `:17668`, `:17831` (the same block) | Lime, Grunge, Editorial, map layout 1 | new `FIELDS.map` field; `· N` stays the markup's |
| `Event type` | `vm.formTypeLabel = 'Event type'` (`EncoreBuilder.jsx:1774`), printed at `:23438` (`s.limeTree`) and `:23717` (Retro and Pop) | every template, form layout 1 | new `FIELDS.form.typeLabel`, beside `messageLabel` |

The map's *Kicker* is the tester's second point: the field exists, seeded *Gigs & travel* for
layout 3 (`MAP_KICKER`), and layout 1 prints its own literal where the field would go. The code's
own comment at `:19655` records that JP-071 moved layout 3's eyebrow into `kicker` and named
layout 1's "Shows/coverage" as the precedent literal.

**Decision.**
1. **The three new fields and the kicker** — **A (recommended).** JP-071's shape: seeded with the
   frame's literal, uncased (every site keeps its own casing), dropped when emptied, with the `·`,
   `[ ]` and count glyphs the markup's. The kicker's `in` becomes
   `{ Lime: [0, 2], Grunge: [0, 2], Editorial: [0, 2], '*': [2] }`, and its seed per layout:
   `MAP_KICKER_1 = 'Shows/coverage'` on the absent key at `d === 0`, `MAP_KICKER` elsewhere, in
   `sectionVm` and `EditPanel`'s chain alike. Names: `bio.refLabel`, `map.gigsLabel` (*Upcoming
   gigs*), `form.typeLabel` — or whatever the session finds reads best in the panel.
2. **An emptied *Event type***. The label also keys the mailto body (`Event type: Wedding`).
   - **A (recommended). `messageLabel`'s rule** (JP-082): the chip row always stands, so an emptied
     label reads the seed again, in the page and the mailto.
   - **B.** An emptied label drops from the page, and the mailto keeps `Event type`.

**Expected after-diff (named before the code): zero** on the seed, themes 0–4, both surfaces —
every field is seeded with the literal it replaces. The proof is a marker set through `&cj=` (each
new key, and `kicker` at map `arch 0`) moving exactly its text row, and an emptied value removing
exactly its node.

**Verify.** The seed digest (0 files); the marker set, per key, under the templates that reach it;
`reach.mjs` for the four keys (the `in` lines are measured, not read off the prose — CLAUDE.md);
the panel no longer says "Not shown" for Kicker on Editorial card 1; the form's mailto body on the
published tab with an edited and with an emptied label.

**Docs.** CLAUDE.md's JP-071 paragraph ("eight frame labels"): the count, the three new keys and
the kicker's new reach; its list of unreported siblings is unchanged. `notes/form.md`,
`notes/map.md` and the bio's notes (`notes/templates.md` if it has none) for each key.

**Decided** (2026-09-30, user call): **1A, the whole bio line, 2A.**
1. JP-071's shape: seeded with the literal, uncased, not drawn when emptied. The keys are
   `bio.refLabel` *Reference line*, `map.listLabel` *List label* (media's name for the label over a
   list; `· N` stays the markup's) and `form.typeLabel` *Event type label* (beside *Message label*).
   `map.kicker` reaches layout 1 through `mapKickerSeed(d)`.
2. **The bio's field is the whole line**, `[ 001 ] Structure · Bio_01`, brackets and index
   included. The entry's glyph rule did not settle it: the `001` is an index, not a count.
3. **An emptied *Event type label* reads the seed again**, `messageLabel`'s rule, since both head
   a control that always stands.

Asked over what the session found first, on HEAD (`f6e5f0e`):
- **Every *Evidence* line** was re-grepped. The bio's three sites and the form's two render sites
  held (`:3913`, `:3918`, `:4071`; `:23439`, `:23718`); `vm.formTypeLabel` is at
  `EncoreBuilder.jsx:1781`, `FIELDS.map.kicker` at `data.js:1795` and `MAP_KICKER` at `:734`.
- **The table's map row was wrong.** `:17498` / `:17668` are the `s.limeTree` block, but `:17831` /
  `:17922` are **Retro's and Pop's** layout-1 body. Retro's frame (`964:58581`) prints both
  *Shows/coverage* and *UPCOMING GIGS · 5*, as Editorial's (`964:58617`) does. So the map's two
  literals reach every template, like the other two, and the kicker's `in` is measured, not the
  per-template object the entry proposed.
- **Question 2's premise did not hold.** The label never reaches the mailto: `enquiryMailto()` puts
  the picked chip in the subject (`Wedding enquiry`), and the body has no label row. So the choice
  was the page's alone, and the recommendation rested on the sibling rule instead.
- **Figma.** Editorial's bio (`964:58613`) and Retro's (`964:58577`) both type `[ 001 ] STRUCTURE ·
  BIO_01`. The forms (`964:58620`, `964:58584`) both type `EVENT TYPE` beside `MESSAGE`. Every
  seed stays the build's mixed-case literal, which each site already upper-cases in CSS.
- **Reproduced on HEAD.** A marker in every bio, map and form text field through `&cj=` left all
  four literals at map / bio / form layout 1, on themes 0–4, three widths, canvas and `live=1`. In
  the real app, Editorial card 1 with every field marked, published and opened, printed all four at
  1440, 768 and 390, and the panel marked the map's *Kicker* "Not shown in this layout".
- **The harness was proven first.** The HEAD worktree on :5174 against the tree diffed to 0 of 180
  on each surface (bio, map, form × themes 0–4 × three widths).
- **Expected after-diff: zero** on the seed, every category, themes 0–4, both surfaces.

**Settled** (2026-09-30).
- **Code.**
  - `data.js` adds `BIO_REF_LABEL` "[ 001 ] Structure · Bio_01", `MAP_KICKER_1` "Shows/coverage",
    `MAP_LIST_LABEL` "Upcoming gigs" and `FORM_TYPE_LABEL` "Event type" beside `MAP_KICKER`. It also
    adds `mapKickerSeed(d)`, which `sectionVm`'s `vm.mapKicker` and `EditPanel`'s chain (an arm
    gated on `map`, since the testimonials carry a `kicker` too) both call.
  - **The fields.**
    - `bio.refLabel` *Reference line* and `map.listLabel` *List label* are `in: [0]`, dropped when
      emptied.
    - `form.typeLabel` *Event type label* is `in: [0]`. Emptied, it reads the seed again
      (`vm.formTypeLabel`, trimmed).
    - `map.kicker` is `in: [0, 2]`, a plain array, as measured. The hints say so.
  - **`EncoreSection`, both bodies at each site.**
    - An emptied bio line leaves an empty `<span>` seat at desktop (and Retro's 768), where
      the column is `space-between` with no gap. So the heading does not slide to the column's
      foot; it moves 8px, half the line's height. At the gapped narrow columns the line simply
      goes: the first cut kept the seat there too and left a dead 29 (Lime-tree) or 16 (Retro,
      390) under the heading, measured and fixed before the amend.
    - An emptied gig label takes its count and wrapper with it, and under Grunge its rule too.
    - The label prints as two text nodes, `"<label> · "` and the count, as the literal did. The
      first cut split off the ` · `, and that moved the label's width by 0.1px under Lime and
      Grunge (4 files a surface), so it was put back.
  - **Typed labels wrap.** The states run found every `nowrap` site overflowing with a long typed
    label: the bio line up to +201px at 390, the kicker +285, and the gig label +328 at 390 and
    +61 in the Lime-tree panel at desktop. So each takes `whiteSpace: 'normal'`,
    `overflowWrap: 'anywhere'` and `minWidth: 0`, JP-071's fix. The seeds fit on one line, so
    nothing seeded moves.
  - **Stale comments rewritten.** `formStepsLabel`'s ("`formTypeLabel`'s rule") and layout 4's
    form comment no longer cite `formTypeLabel` as a literal. The map's layout-3 eyebrow comment
    no longer names "Shows/coverage" as a literal precedent. The chain's "the kicker left the
    chain" now says it is the header's.
- **Digest.** The tree against the HEAD worktree on :5174, every category, themes 0–4, three
  widths, port and photo stamps normalised: **0 of 660 on each surface**, before and after the
  wrap fix. As named.
- **Reach** (`reach.mjs`, three new probes plus `map.kicker`'s, themes 0–4, 6/6 each):
  `bio.refLabel` moves bio layout 1, `map.kicker` map layouts 1 and 3, `map.listLabel` map
  layout 1 and `form.typeLabel` form layout 1, on all five templates.
- **States** (a scratch puppeteer run, deleted): each key at its layouts × themes 0–4 × three
  widths × both surfaces, as a marker, emptied, 85 characters and one 53-character word.
  - A marker moves exactly its own row. Under Grunge the gig label also moves the rule beside
    it, by width.
  - An emptied value removes exactly its node. The gig label takes its wrapper too, and under
    Grunge the rule. The bio line leaves its empty seat at desktop. An emptied *Event type label* moves
    nothing, because the seed reads again.
  - After the wrap fix, no label's text runs past its section (measured on the text's own Range,
    since a stretched `nowrap` span keeps its container's width) and no page scrolls sideways.
- **The tester's marker set.** On the harness, with a marker in every bio, map and form text
  field, none of the four literals is left on themes 0–4, three widths, canvas and `live=1`.
- **The real app.** Card 1 of Editorial, Lime, Grunge and Retro, with every field marked through
  `st`, then published and opened:
  - The published tab prints no literal at 1440, 768 or 390.
  - The panel seeds the four fields with the literals, and *Kicker* no longer says "Not shown in
    this layout".
  - **The mailto.** It is `subject=<chip> enquiry` with no type row in the body, whether the
    label is edited or emptied. Emptied, the page prints *Event type* again.
  - No page errors.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed; the sweep does
  that.
- **Docs.**
  - CLAUDE.md's JP-071 paragraph: the four keys, the kicker's reach, the mailto and the wrap. The
    unreported siblings are unchanged.
  - `notes/form.md` and `notes/map.md` each get a bullet.
  - `notes/templates.md` gets one for the bio's line, since the bio has no notes file.
  - `reach.mjs` gets the three probes.

Reply: **JP-090 — fixed.** The four labels are now editable on every template, in the editor and
on the published page. Each starts as the design's text.
- **Bio** (layout 1): *Reference line*, the "[ 001 ] STRUCTURE · BIO_01" line. Left empty, it is
  not drawn.
- **Events Map** (layout 1): *Kicker* now changes "Shows/coverage" and no longer says "Not shown in
  this layout". Layout 3 still starts from "Gigs & travel". *List label* changes "Upcoming gigs"
  (the count after it is the page's). Left empty, each is not drawn, and the list label takes its
  count with it.
- **Enquiry Form** (layout 1): *Event type label*. Left empty, it shows "Event type" again, as
  *Message label* does, because the chips always need a heading. The enquiry email never carried
  it: the chosen type goes in the subject.
- A long label wraps rather than running off a phone screen. Labels nobody reported stay as the
  design draws them.

---

## JP-088 — calendar layout 1's *Check a date* pill

**Verdict: confirmed, and recorded.** The pill is Retro's layout-1 calendar's "one deliberate
addition" (a way from a picked date to the form), and Lime's fit kept it: *"The foot keeps Retro's
BookPill … It makes the foot 110 / 134 / 149 where the frames' are 83 / 100 / 100"*
(`../lime/layout-1.md:1016`). Grunge and Editorial inherited it through the `s.limeTree` block.

**The cost of simply dropping it:** on the published page the calendar would have no way on to the
form. A visitor picks a day, the foot says "Enquiry for …", and nothing takes them further.

**Evidence.**
- `EncoreSection.jsx:15194` (`BookPill s={s} to={s.calBookTo} label={s.calCta}`, layout 1's
  `s.limeTree` foot) and `:15417` (Retro and Pop's).
- `vm.calCta = cased(cv('cta', 'Check a date'))` (`EncoreBuilder.jsx:1292`); `FIELDS.calendar.cta`
  `in: [0, 3]` (`data.js:1725`), also layout 4's *Send Enquiry* (JP-082).
- `vm.calBookTo` (`notes/calendar.md`): `bookTo` minus the calendar itself.

**Decision.**
- **A (recommended). Drop the pill from the `s.limeTree` layout-1 foot, and make the foot's line the
  link on the published page** — the same `calBookTo` target, the line's own type and the frame's
  picture on the canvas (a span there, as every live seam). The visitor keeps the way on; the frame
  gets its foot back. `FIELDS.calendar.cta`' `in` becomes
  `{ Lime: [3], Grunge: [3], Editorial: [3], '*': [0, 3] }`, so the panel says "Not shown in this
  layout" there. Retro keeps its pill.
- **B. Drop the pill and add no link.** The frame exactly; the published calendar becomes a picture
  with a date picker.
- **C. Keep it, with a reply** naming the reason (the only way on from a picked date). The tester
  explicitly asked frontend or design to decide, so C is a legitimate answer.

**Expected after-diff (on A).** Calendar `arch 0` under themes 1–3, three widths, both surfaces: the
pill's rows go, the foot shrinks toward the frames' 83 / 100 / 100, and everything below it in the
section moves up. On `live=1` the line becomes an `A` row. Retro and Pop: 0.

**Verify.** The foot's height against the frames at three widths (`964:58619`, `986:48246`,
`986:48258`); on the published tab, picking a day and clicking the line reaches the next section in
`calBookTo` order; the canvas line carries no href and no cursor; Lime's and Grunge's card 1 the
same.

**Docs.** `notes/calendar.md` (the foot's link), a *reversed* pointer on Lime layout 1's *Settled*
bullet, the field's hint (layout 1's button is Retro's).

**Decided** (2026-09-30, user call): **A, and the line links only while it names a picked day.**
Drop the pill from the `s.limeTree` layout-1 foot. On the published page the foot's *Enquiry for …*
line is an `<a>` to `calBookTo`; the *Pick a date to enquire* prompt stays text, since linking
"Pick a date" to the form would contradict it. On the canvas the line is a span with no cursor. Retro
and Pop keep the pill. Asked over what the session found first, on HEAD (`df10738`):
- **Every *Evidence* line held** at the new numbers: the two `BookPill` sites at
  `EncoreSection.jsx:15205` (the `s.limeTree` foot) and `:15428` (Retro and Pop's), `vm.calCta` at
  `EncoreBuilder.jsx:1300`, `vm.calBookTo` at `:1493`, `FIELDS.calendar.cta` at `data.js:1774`, and
  Lime's call at `../lime/layout-1.md:1022`.
- **Figma: no frame draws the pill, Retro's included.** Every foot is the enquiry line alone:
  - Editorial `964:58619` / `986:48246` / `986:48258`, and Lime's and Grunge's twins, measure
    1328 × 101, 708 × 100 and 370 × 100, with 40 padding.
  - Retro's `964:58583` is 1328 × 77.44, with 30.22 padding and the line in mono caps.
  - So Retro's pill was always its "one deliberate addition", not the frame's. The entry's
    "83 / 100 / 100" was the 1440 frame's 101 at the canvas's 0.82.
- **Reproduced on HEAD.** Card 1 of Editorial, Lime and Grunge, published and opened, draws an
  `<a href="#form">` *Check a date* pill in the foot at 1440, 768 and 390, and so does Retro's.
  - The foot is 134 at 1440 (110 laid out at 1180, zoomed 1.22) and 134 at 768.
  - At 390 it is 113.5 on the prompt, and 168.5 once a picked *Enquiry for Wednesday, September
    30 …* wraps the pill under it.
  - On the canvas the foot is 109.9 and the pill a span.
  - The harness agrees under themes 1–3 at all three widths: a `SPAN` pill on the canvas, an `A`
    on `live=1`.
- **The harness was proven first.** The HEAD worktree on :5174 against the tree diffed to 0 of 60
  on each surface (calendar × themes 0–4 × three widths).
- **Expected after-diff (named before the code).** Calendar `arch 0` × themes 1–3 × three widths
  = 9 files a surface, 18 in all. The pill's rows go, the foot shrinks, and the rows after it move
  up. On `live=1` the line becomes an `A`: the harness passes no `&today=`, so the cued June 12
  is picked. Retro, Pop and every other section: 0.

**Settled** (2026-09-30).
- **Code.**
  - `EncoreSection`'s `s.limeTree` layout-1 block drops the `BookPill`. The foot's line takes its
    job through two locals, `lineHref = cur ? navHref(s, s.calBookTo) : undefined` and `LineTag`:
    an `<a>` in the line's own type with a pointer and no underline while it names a picked day,
    else the span it was, with no cursor.
  - `navHref` carries the `live` gate, so the canvas never links, and neither does a page with
    no `calBookTo`.
  - Retro's and Pop's body is untouched.
  - `FIELDS.calendar.cta`'s `in` is `{ Lime: [3], Grunge: [3], Editorial: [3], '*': [0, 3] }`.
    Its hint leads on layout 4's Send Enquiry and says layout 1's button is Retro's and Pop's.
  - The `vm.calCta` comment says the same.
- **Digest.** The tree against the HEAD worktree on :5174, every category, themes 0–4, three
  widths, port and photo stamps normalised.
  - **Canvas: exactly the 9 named files of 660.** On `live=1` there were 11: the 9 named, plus
    pricing `arch 0` and repertoire `arch 1` under Editorial at 390. Those two HEAD files were
    blank renders under load (one row each). Re-rendered, they diffed to 0 of 8. So the diff is
    the named 18.
  - In those files, the foot is **82.1 / 99.5 / 99.5**, against the frames' 101 × 0.82 = 82.8,
    100 and 100. The line is a `SPAN` on the canvas and an `A` on `live=1` at every width.
- **Reach** (`reach.mjs`'s existing `calendar.cta` probe, themes 0–4): Retro and Pop move layouts
  1 and 4; Lime, Grunge and Editorial layout 4 alone. `fieldReach()` in Node agrees.
- **The real app** (a scratch puppeteer script, deleted): card 1 of Editorial, Lime, Grunge and
  Retro, published and opened.
  - **Lime, Grunge and Editorial draw no pill.**
    - The foot is **100.2 at 1440 and 99.5 at 768 and 390**, against 101 / 100 / 100.
    - A picked *Enquiry for Wednesday, September 30 at 9:00pm* wraps to two lines at 390 (119).
      The seeded June line does not.
    - The prompt is a span with no cursor.
    - Picking a day turns the line into `<a href="#form">` with a pointer and no underline.
      Clicking it calls `scrollIntoView` on `form` (hooked), the first of `CTA_TARGETS.book`
      minus the calendar, at all three widths.
    - On the canvas the line is a span with no href and no cursor (82.1).
  - **Retro's card 1 is unchanged**: the *Check a date* pill (a span on the canvas, `<a
    href="#form">` published), and the foot at 102 / 102 / 135.8, as on HEAD.
  - No page errors.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed; the sweep does that.
- **Docs.**
  - **Reversed pointers**: Lime `layout-1.md`'s foot bullet (`:1022`), and its repeats in Grunge's
    and Editorial's `layout-1.md`.
  - **Rewritten**: `notes/calendar.md`'s "intended diffs" sentence (the pill is Retro's and
    Pop's). There is a new bullet for the foot's link.
  - CLAUDE.md's `s.live` list names the foot's line beside the pill.
  - The code comment at the foot.

Reply: **JP-088 — fixed.** Under Lime, Grunge and Editorial, layout 1's calendar card no longer has
the *Check a date* button, so its foot is the design's: the *Enquiry for …* line alone.
- On the published page, whenever the line names a day (the one the visitor picked, or the opening
  date while it is still ahead), that line is the link. It takes them to the
  enquiry form, or to Pricing where the page has no form, which is what the button did.
- The *Pick a date to enquire* prompt is not a link.
- The calendar's *Button* field now says "Not shown in this layout" at layout 1 under these
  templates; it still labels layout 4's Send Enquiry.
- Retro's layout 1 keeps its button, unchanged. Its design draws none either, so if that is
  wanted gone too, it is its own ticket.

---

## JP-086 — 390: a long hero name is clipped

**Verdict: confirmed, and Editorial's alone.** `HeaderV0` fits Editorial's title at 1440 and 768
(`min(dispXl, calc(100cqi / s.navNameEms))`, the whole name on one line) but not at 390, where its
master (`986:48251`, in the Tablet device mode) sets a flat **107px** that its column wraps to two
lines. Any word wider than the column at 107px is clipped. Noto's ems at 107px: FLORENCE 4.341 em
= 464px, CHEMICAL 4.371 em = 468px, MACHINE 3.961 em = 424px, against a column of about 370. The
seed's KAI and MERCER (3.412 em = 365px) fit, which is why the picture never showed it.

Grunge's 390 title (95px, Anton at 0.75) and Lime's (120px Bebas) take other arms. The tester found
Grunge fitting; the session probes both with the same names and records the result.

**Evidence.**
- `EncoreSection.jsx:1627`: `tk` at 390 under Editorial, `dispXl: '107px'`.
- `:1777`: the `Title`'s size — the fit is `ed && !s.mob`.
- `:1741`: the column's `containerType: 'inline-size'` is also `ed && !s.mob`, so at 390 there is
  no container for `100cqi` to resolve against. The fix has to give it one (the column is
  `width: '100%'` there; `flex` must not come with it).
- `vm.cardNameEms` (`EncoreBuilder.jsx:673`, JP-062): the brand's widest word in `navFace` ems,
  which for Editorial is Noto's 540 table.

**Fix.** At 390, `min(107px, calc(100cqi / s.cardNameEms))` — the name wraps between words as the
frame's does and shrinks only when its widest word would outrun the column (`titleWordEms`' rule,
never inside a word). `faced()` stays outside the fit (`faceK` is 1 under Editorial anyway). Give
the column its `inline-size` container at 390 too.

**Expected after-diff: zero** on the seed (KAI and MERCER fit at 107), themes 1–3. The fix is
Editorial's arm alone; Lime and Grunge render the same bytes.

**Verify.** A repro set through `&cj=` on the header's `title`: *Florence and the Machine*, *The
Chemical Brothers*, *Kai Mercer*, *Sienna Vale*, and one long single word (*Supercalifragilistic*),
at 360, 390 and 414 on the published tab: `scrollWidth` equals `clientWidth` on the title and the
section, no word breaks inside itself, and the seeded two stay 107px. Probe the same names on Lime
and Grunge card 1 at 390, and on Editorial's header layouts 2–4 at 390 (their titles are other
arms), and **name** any clip found there rather than fix it in this entry.

**Docs.** The `Title` comment at `:1769`–`1780` (390 is fitted too). `notes/templates.md` if it
describes the hero's 390 title.

**Reproduced** (2026-10-01, on HEAD `d85b2bc`). Every *Evidence* line held at `d85b2bc`:
`dispXl: '107px'` at `EncoreSection.jsx:1627`, the column's container at `:1741`, the fit at `:1783`
and `vm.cardNameEms` at `EncoreBuilder.jsx:673`.
- **The tester's steps.** A scratch puppeteer script published Editorial card 1, set the Title
  through `st` and opened the tab with `pop.setViewport`. At 390 the title is 107px in a 370
  column, and it clips as reported:
  - FLORENCE ends 84.6 past the page, AND THE 11.7 and MACHINE 41.7.
  - CHEMICAL and BROTHERS end 87.8 and 87.5 past.
  - *Supercalifragilistic* ends 654 past.
  - KAI MERCER and SIENNA VALE fit, with MERCER 5.4 inside the column.
- **The report's check does not catch it.** The title's and the section's `scrollWidth` equal
  their `clientWidth` throughout: the h1 box grows to 465, and the section clips. What does catch
  it is each word's `Range` against the section's right edge, and the h1's width against the
  column's.
- **Two widths the report did not check.**
  - At **360** the column is 340, so the *seeded* MERCER already ran 14.6 past the page.
  - At **414** the column stays 370 (the 24 extra go to the gutter), so 414 reads as 390.
- **Lime card 1 at 390** (120px Bebas): the four real names stay inside the page. BROTHERS ends
  5.0 past its column, but inside the 10px gutter. *Supercalifragilistic* clips, 439 past the page.
- **Grunge card 1 at 390** (95 × 0.75 = 71.25px): the four real names fit, as the tester found.
  *Supercalifragilistic* clips, 200 past the page.
- **The harness was proven first.** Diffing the HEAD worktree on :5174 against the tree gave 0 of
  660 on each surface (every category, themes 0–4, three widths, port and photo stamps
  normalised).
- **Expected after-diff (named before the code): zero.** That is every category, both surfaces.
  - At 390 the seed's widest word is MERCER, 3.412 em. 370 / 3.412 = 108.4 > 107, so the `min()`
    computes to 107.
  - The container goes on a column that is already `width: 100%`, so no geometry moves.

**Settled** (2026-10-01).
- **Code.** In `HeaderV0`, under Editorial:
  - The column takes `containerType: 'inline-size'` at every width. `flex: '1 1 0'` still comes
    only above 390.
  - The `Title` is `min(107px, calc(100cqi / s.cardNameEms))` at 390, where it was a flat 107.
    Above 390 it keeps `s.navNameEms`.
  - `faced()` stays outside the fit (it is 1 under Editorial anyway).
  - Lime's and Grunge's arms are untouched.
- **Digest.** The tree against the HEAD worktree came to **0 of 660 on the canvas and 0 of 660 on
  `live=1`**, as named.
- **The published tab** (the same scratch script, Editorial card 1). The fitted sizes are the ems'
  own, so `100cqi` resolved against the column, not against the viewport:

  | Name | 360 | 390 | 414 |
  |---|---|---|---|
  | FLORENCE AND THE MACHINE | 78.32 | 85.23 | 85.23 |
  | THE CHEMICAL BROTHERS | 77.38 | 84.21 | 84.21 |
  | KAI MERCER | 99.65 | **107** | **107** |
  | SIENNA VALE | **107** | **107** | **107** |
  | SUPERCALIFRAGILISTIC | 35.06 | 38.16 | 38.16 |

  - No word breaks inside itself: every word's `Range` has one rect.
  - Every word ends inside the section: the widest ends 9.9 short of its right edge at 360 and
    390, and 21.9 short at 414.
  - The h1's width is at most the column's, except FLORENCE, whose Range is 370.1 against the
    370 column. That 0.1 lands in the 10px gutter and is not a clip.
  - The title's and the section's `scrollWidth` equal their `clientWidth`.
  - The seeded KAI MERCER keeps 107 at 390 and 414. At 360 it shrinks to 99.65, which is the fix
    working, since HEAD clipped it there.
- **The harness** (`&cj=` on `title`, Editorial arch 0 at `w=mobile`, canvas and `live=1`). It
  matches the published tab at 390, name for name. HEAD reads 107 throughout, with FLORENCE 84.6
  past the page.
- **Lime and Grunge card 1 at 390**: byte-for-byte the HEAD readings above, the same four names
  plus *Supercalifragilistic*.
- **Named, not fixed here** (probed at 390 unless a width is given):
  - *Supercalifragilistic* clips on **Lime's** card 1 (439 past the page) and on **Grunge's**
    (200 past).
  - It also clips on **Editorial's layout-2** header, 84 past; there the section's `scrollWidth`
    reads 474, so the *page* scrolls sideways. And on Editorial's **layout-3** header, 94 past.
  - Editorial's **layout-4** header fits it, at 36.09px. Layouts 2–4 fit all four real names.
  - **The 390 nav wordmark** (`Wordmark`'s `nowrap` name in NavBar's `minWidth: 0` row): with
    *Florence and the Machine* it runs under the Book pill and the burger, and ends at 392.3 at
    360 and at 390. The header clips it, so 2.3 of the last E is lost at 390 and 32 at 360. At
    414 it fits. HEAD is the same.
  - **The footer at 360** overflows with the two long names (`scrollWidth` 390 and 370 against
    360), so the page scrolls sideways there. HEAD is the same. The footer fits at 390 and 414.
- **Build.** `npm run build` is clean. The root `index.html` is not refreshed.
- **Docs.**
  - The `Title` comment (390 is fitted to the widest word).
  - The `tk` comment on the 107.
  - The column's comment (a container at 390, without `flex`).
  - The `vm.cardNameEms` comment, which now names HeaderV3 and HeaderV0 at 390 as readers.
  - `notes/templates.md` does not describe the hero's 390 title, so it is untouched.

Reply: **JP-086 — fixed.** On Editorial's Hero at 390, a long name now shrinks until its widest
word fits the page, and it still wraps between words, never inside one. *Florence and the Machine*
sets at about 85px and *The Chemical Brothers* at about 84px, with nothing clipped. At 360 it goes
a little smaller: 78px and 77px. Names whose words already fit, *Kai Mercer* and *Sienna Vale*,
keep the design's 107px.
- One thing the report did not check: at 360 even the default *Kai Mercer* was clipped. It now
  shrinks to 100px.
- Not changed, and logged separately:
  - At 390 the menu bar's name runs under the Book button with a name this long.
  - At 360 the footer scrolls sideways with it.
  - A single 20-letter word still clips on Lime's and Grunge's Hero, and on Editorial's layouts 2
    and 3.

---

## JP-087 — 390: TikTok wraps onto a second row

**Verdict: confirmed, and a recorded call.** Every layout-1 gallery master at 390 runs its fourth
tile off the page (Retro's, Lime's `989:22110`, Grunge's `989:22292`, Editorial's `989:22410`). The
build **wraps** instead, deliberately: *"the fourth, TikTok, was the one off the page. Four
content-sized tiles come to ~430px against a 390 frame … wrapping keeps every Figma dimension
exactly as drawn and spends a second row instead"* (`EncoreSection.jsx:13013`–`13020`), and Lime's
fit repeated it (*"The 390 source row wraps where the frame runs TikTok off the page — the rule this
section already has"*). The tester reads the frame as a row that scrolls sideways.

**Evidence.**
- `EncoreSection.jsx:13171`: the `s.limeTree` block's row, `flexWrap: 'wrap'` at `s.mob`.
- `:13419`: Retro's and Pop's row, the same.
- `srcRows` (`:13039`): on the published page a social tile with no address is not drawn, so the
  row holds one to four tiles; the canvas always holds four.

**Decision.**
- **A (recommended). One row that scrolls sideways on the published page, clipped on the canvas.**
  At 390, `flexWrap: 'nowrap'` with `overflowX: s.live ? 'auto' : 'hidden'` (and the scrollbar
  hidden, so the row reads as the frame's run-off). The canvas is the frame's picture exactly,
  TikTok cut at the edge; a scrollable region on the canvas would be interaction, which CLAUDE.md
  gates on `s.live`. The open tile's offset shadow must not be clipped by the scroller (give it the
  padding it needs). Every template, both bodies.
- **B. Shrink four tiles to fit** the 350–370 column. Every Figma dimension changes.
- **C. By design**, with a reply: wrapping shows every link the artist typed without a gesture.

**Expected after-diff (on A).** Gallery `arch 0` at 390, themes 0–4, both surfaces: the fourth
tile's row moves from the second row to the first (off the right edge), the row's height loses a
row, and everything below it in the section moves up. 1440 and 768: 0.

**Verify.** 390 published, with all three addresses and with one: the row scrolls by touch
emulation and by shift-wheel, and each tile's link still opens; `scrollWidth` of the *page* equals
its width; the canvas row does not scroll. Retro, Lime, Grunge and Editorial card 1.

**Docs.** The comment at `:13009` (*reversed*), the Lime / Grunge / Editorial block comments that
repeat it (`:13059`–`13062`), `notes/gallery.md` (the strip and its mobile window), and a *reversed*
pointer on Lime layout 1's gallery *Settled* bullet.

**Settled.** —

---

## JP-091 — 1440: a long name wraps the nav onto two lines

**Verdict: confirmed in the code; its size is not yet measured.** `NavBar`'s `s.limeTree` arm (the
layout-1 capsule of Lime, Grunge and Editorial) sizes the links to the room the wordmark and the
pill leave, `clamp(12px, calc(100cqi / s.navEms), s.labelSm)` under Editorial (Grunge's floor 16,
faced to 12), and **below the floor it wraps** — the recorded call: *"Below the floor it wraps,
which is the least bad of the options left"* (`EncoreSection.jsx:1528`–`1540`). *Florence and the
Machine* is 12.31 Noto em against *Kai Mercer*'s 5.07, so the name takes roughly 180 more pixels
of the bar at its desktop size, and nine links at 12px no longer fit beside it. The seeded bar
already carries **nine** links where the frame draws eight (*Availability*), so the seeded row is
already below the frame's 16px.

**Evidence.**
- `EncoreSection.jsx:1491`–`1573`: `NavBar`, the `lime` arm at `:1528`–`1558`
  (`flexWrap: 'wrap'`), the Wordmark at `:1511` (its row `flex: '0 1 auto'`, `minWidth: 0`).
- `vm.navEms`, `vm.navNameEms` (`EncoreBuilder.jsx:666`), `vm.navFits` (the 768 rule, `:700`–`707`):
  a precedent for deciding in `sectionVm` whether a row holds.
- `notes/nav.md`: `navFits` at 768, the burger.
- Retro's arm (`:1562`) also wraps; probe it with the same name, do not fix it here.

**First step, before any decision: measure.** On the published tab at 1440 (a 1180 layout, zoomed
×1.22), and on the canvas: the capsule's inner width, the wordmark's width at its desktop size, the
pill, the nine links' ems (`s.navEms`) and so the width they need at 12px, for *Kai Mercer*, *Sienna
Vale*, *Florence and the Machine* and *The Chemical Brothers*, under Editorial, Lime and Grunge.
From that, the longest name the one row holds at the floor. Record it in the entry, then ask.

**Decision (after measuring).**
- **A. The name gives way first**: the wordmark shrinks toward a floor, then wraps between words
  inside the capsule, so the links keep one row. Computed in `sectionVm` from the same ems.
- **B. The burger at desktop** when the row cannot hold the links at their floor: `vm.navFits`'
  768 rule extended to 1440 for the `s.limeTree` arm. One row, but the links hide behind the menu.
- **C. A lower floor** for the links (10px, say). One row further, but at 10px the labels are
  small on a 1440 page.
The recommendation waits on the numbers: A if a long name's two lines fit the capsule's height, B
if not.

**Expected after-diff: zero** on the seed under A or B (the seeded row holds at 12px or above; the
measure confirms it), themes 0–3. The repro set moves only the header.

**Verify.** The four names at 1180, 1440 and 1920 on the published tab and at the canvas' 1180,
Editorial, Lime and Grunge: the links on one row, nothing past the capsule, the pill on the row;
the burger (under B) opening and scrolling to each section.

**Docs.** The `lime` arm's comment (*reversed*), `notes/nav.md`, and CLAUDE.md only if it describes
the desktop wrap.

**Settled.** —

---

## End-of-pass sweep

1. Full digest against a `main` worktree on :5174 (port and `?t=` normalised), all categories ×
   themes 0–4 × three widths × canvas and `live=1`. Every diff must be one a Settled above names.
2. The repro sets re-run on the final tree: JP-086's names at 390, JP-090's markers, JP-091's names
   at 1440, read off the DOM.
3. `reach.mjs` for every `in` that moved (JP-088's `cta`, JP-090's four keys).
4. Walk Editorial card 1 in the real app and the published tab at 1440 / 768 / 390 — the tester's
   steps for each ticket — then Lime's and Grunge's card 1 once, and Retro's card 1 for the gallery
   and the four labels.
5. `npm run build:standalone`, then `cp source/dist-standalone/index.html index.html`, in its own
   commit. Then a two-build digest (`build-digest.mjs`), whose diff should be only the named rows.
6. `plans/README.md`'s Editorial row, and one reply line per ticket for QA (fixed / by design /
   needs PO), headed by the retest-against-the-stamp line
   (`curl -sI https://siniiitsa.github.io/js-plus-prototype-2/`; the triage read
   `Wed, 30 Sep 2026 15:07:50 GMT`, 8,776,960 bytes).

**Settled.** —
