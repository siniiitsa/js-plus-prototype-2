# Grunge layout 4 QA fixes — bug-by-bug plan

Working checklist for the tester's batch against the **Grunge template, layout 4** (card 4 of the
setup modal, *Stacked*): JP-076 … JP-084. It works like
[`layout-3-qa-fixes.md`](./layout-3-qa-fixes.md): **one entry per session, with context cleared
between sessions**, and each session writes what it settled back into this file.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then *How each
session runs* and *Verification harness* in `../retro/qa-fixes.md` (the `&cj=` / `&who=` harness),
then the memory notes `verifying-the-published-tab` and `browser-tool-choice`.
[`layout-4.md`](./layout-4.md) holds the Figma node ids of every Grunge layout-4 frame (its
*Sections* table, with Lime's and Retro's twins beside them, and *Grunge's layout-4 mode*). The
desktop form is the main component `725:2990`, since the 1440 page carries no form instance.
Editorial has no fitted layout 4. The shapes the entries copy:
- JP-052, JP-053 and JP-054 in [`../lime/layout-4-qa-fixes.md`](../lime/layout-4-qa-fixes.md):
  the wizard's summary, the wizard's mailto and `pageEmail()`, and a per-layout seed for the
  form's copy;
- JP-054's retest in [`../lime/retest-qa-fixes.md`](../lime/retest-qa-fixes.md): `FORM_FIELDS_4`,
  a layout-4 seed gated on the absent key;
- JP-065 and JP-070 in [`layout-3-qa-fixes.md`](./layout-3-qa-fixes.md): a frame claim re-seated
  as a field over its derived fallback; `HEADING_3`, a per-layout button seed (`rowCta`) and a
  name-derived head (`formHeading3()`);
- JP-071 there, and JP-059's census in [`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md): labels
  are vocabulary, and a control is not a label;
- JP-051 and JP-052 for the repeater shape: `SlotsField`, a `*_KEYS` beside the seed, `blankRow`
  (CLAUDE.md's repeaters paragraph);
- `../retro/layout-4.md`: open question 6 (the map's stat wall), open question 8 (the
  repertoire's head) and the `#` rule at `:913`–`915` (the A–Z rail). These are the fit calls that
  four of these tickets reopen.

Branch: **`grunge-layout-4-qa-fixes`, forked from `main`** (`65dd1bc`, after PR #40). One commit
per entry (`Fix JP-083: …`); the replies entry commits the plan alone.

**Every report reproduces on HEAD.** At triage (2026-09-29) the Pages build's `last-modified` was
`Tue, 29 Sep 2026 08:18:02 GMT`, 8,754,810 bytes, which is byte-identical in size to `main`'s root
`index.html` (`99ebc8a`, the Grunge layout-3 QA refresh). None is a stale-build echo.

**Almost nothing here is Grunge's alone.**
- **Editorial has no fitted layout 4.** Its card 4 is a placeholder that renders Retro's
  `HeaderV3`, and every other section at `arch 3` renders **Retro's shared body** in Editorial's
  Scheme 1 tokens, flat, as Pop does. So each layout-4 seam has two halves: the
  `(s.lime || s.grunge)` block (Lime and Grunge) and Retro's `if (s.v3)` body (Retro, Editorial
  and Pop).
- **Grunge only: JP-080's idle dots.** Grunge's frame draws them white at .6, which reads grey;
  the block inherited Lime's full-strength redraw (Lime's own dots are ink, and vanish).
- **Every template: JP-076, JP-077 · JP-078, JP-079, JP-080 (the month and "Next:"), JP-082's
  three controls, JP-083, JP-084 and JP-081's repertoire head.** Each is resolved in `sectionVm`
  or drawn in both halves.
- **JP-081's tags** reopen a user call (JP-037). Option A reaches every chip row on every
  template; option B reaches Lime and Grunge.
- **By design, a reply each: JP-081's media head, track names, bio prose and form head, JP-082's
  labels, and JP-080's ×.** Each is a call already made and named in an earlier plan. The form head
  is JP-054's, and Grunge's layout-4 pass left it as its open question 2.
- **JP-082 has four halves**: the map, the Book Us wizard, the form and the bio. Its **labels** get
  one question, JP-071's rule, in the replies entry. Its **three controls** (Send Enquiry, the
  bio's Listen, the form's *Message* label) get entry 3. The map's **card names** go with the stat
  wall (entry 7), whose shape decides them.

## The report (translated)

> **JP-076 — severity proposed, the call is ours — With the Enquiry Form deleted, both SEND
> ENQUIRY pills in Book Us stop working.** Grunge → *Stacked* → the Enquiry Form's ⋯ menu →
> Delete → Publish → Open → in Book Us walk steps 1–3, fill in the name and email → SEND ENQUIRY
> (step 3's pill, or the right column's). Expected: a mail opens with the enquiry, as before the
> section was deleted, or a clear message. Actual: nothing happens. The page does not change, no
> mail opens and no message shows, though the pill looks live, so the visitor's enquiry is simply
> lost. Cause (a hypothesis for the developer to confirm): the address comes from the Enquiry
> Form's *Email address*, so with the section gone the pills have none. Control: with the form on
> the page, both pills open a mail to bookings@kaimercer.co.uk carrying every answer. The Booking
> Calendar's hints do not mention the limit. Not checked: a real mouse click, other templates.
>
> **JP-077 — The Events Map's stat cards are not the design's.** All three widths. Design:
> RADIUS 120 / miles · standard; CITIES 21 / played in; GIGS YTD 48 / played this year; BASE /
> MANCHESTER, UK / further on request. Build: COVERAGE / 12 MILE RADIUS (the badge's text) / 120 mi
> standard · further on request; CITIES 2 / playing in; GIGS 5 / upcoming; and the fourth card
> (BASED IN MANCHESTER) with no label and no caption. The card names are in the code; no field
> holds them.
>
> **JP-078 — Emptying *Coverage* or *Based in* leaves empty cards.** The first card shows only
> its name, COVERAGE, and the fourth becomes an empty frame. The section's other fields hide when
> emptied, and the hints say nothing of this case.
>
> **JP-079 — The form's *What happens next* prints each step on one line.** In the design
> (tablet and mobile) each step has a title and a second line: "Send your details / Date, type &
> location". *Promises* takes one line per step; the separators —, | and : give no second line.
>
> **JP-080 — The map's gig row and pins differ from the design.** No "Next:" prefix; a › on the
> right where the design has ×; the month reads "Jul" where the design reads "JUL". The map
> draws a red pin and white dots; the design only grey dots.
>
> **JP-081 — Default texts differ from the design:** "Five worth your ear." for "Six worth your
> ears"; "12 Songs" for "Repertoire"; "Contact Us" for "Kai Mercer"; five tags for six (no "All
> Access"); and the track names, the Bio text and the steps' texts.
>
> **JP-082 — Labels the editor cannot edit:** the Events Map's stat card names and "Travel &
> reach"; every text of the Book Us wizard (What's the occasion?, Step x of 3, Type of event,
> Guests, Next Step, Pick a date to enquire, Package › and the rest); the Enquiry Form's
> *Message* label (every other box label is editable) and its "What happens next" head; the
> Bio's "Listen ↗" link.
>
> **JP-083 — A song starting with a digit ("99 Problems") lands in a group "9", and the A–Z index
> has no button for it.**
>
> **JP-084 — A long track title in the Media Player ends in an ellipsis that runs into the
> previous-track button with no gap.**

## Status

| Order | ID | Report (short) | Verdict | Size | Decision needed? | Status |
|---|---|---|---|---|---|---|
| 1 | JP-081 · JP-082 (replies) | Media head, track names, bio prose, form head; the labels no field reaches | **By design, all of them**: "Six" counts the frame's filler tile; the tracks are layout 1's frame's; the prose's lead names the mock artist; "Contact Us" is JP-054's call; the labels are JP-071's | — (replies) | **yes** — the labels A / B, the form head A / B / C, the media head A / B, the prose and tracks A / B | **done** (A, A, A, A; four replies, no fix) |
| 2 | JP-076 | With the form deleted, both Send Enquiry pills do nothing | **Confirmed, shared.** A known state (JP-053) with no face and no fix path but the form; `BookPill`'s span keeps its pointer. **Proposed: Medium** | S–M | **yes** — 1 A (a calendar address that follows the form's) / B (one address); 2 (a) a panel note / (b) inert pills / (c) a visitor line | **done** (1 A, 2 (a); the calendar's own `email` follows the form's, and a panel note) |
| 3 | JP-082 (controls) | Send Enquiry, the bio's Listen and the form's *Message* label have no field | **Confirmed, shared**: a submit, a link and a box label are not vocabulary. The census named Listen for this batch; *Message* is the one box label left a literal | S | **yes** — each: A (a field) / reply | **done** (A, A, A; `cta` reaches layout 4 seeded "Send Enquiry", a bio *Listen link*, a form *Message label*) |
| 4 | JP-083 | "99 Problems" files under "9"; no rail cell | **Confirmed, shared.** The fit's `#` rule was written down and never coded; a leading non-letter group also leaves the rail unlit | S | **yes** — A (a `#` group and a `#` cell while needed) / B / C; (a) / (b) for punctuation | **done** ((a), A; punctuation skipped, a `#` cell ahead of A while a `#` group exists) |
| 5 | JP-084 | A long title's ellipsis touches the prev button | **Confirmed, both halves**: the now-playing row has gap 0. The seeded "Manchester at 3am" already hits it live at 1440 on every template | S | **yes** — A (the transport's 14 and a two-line wrap, as the frame's text wraps) / B (the gap alone) / C | **done** (A; `u(14)` in both halves, the title clamped at two lines; the seed moves widths only) |
| 6 | JP-080 | The ticker lacks "Next:", has ›, prints "Jul"; a red pin and white dots | **"JUL" confirmed, shared. Grunge's dots confirmed.** "Next:" and × are named fit calls (Retro L4); the lit pin is the product's pairing | S | **yes** — "Next:" A / B; the pin A / B / C; × a reply | **done** (1 A, 2 A; "Next:" on the first gig, the month upper-cased, Grunge's dots at .6; the pin and × replies) |
| 7 | JP-077 · JP-078 · JP-082 (map) | The stat wall: frame copy, empty cards, fixed names | **Named fit call** (Retro L4 open question 6), whose "claims, not fields" JP-065 reversed. **JP-078 confirmed**: the card box is never dropped | M | **yes** — A (a `stats` repeater) / B (JP-065 per card) / C (JP-078 alone) | **done** (A; `stats` seeded with the frame's four, the ninth repeater; the desktop floor on the grid, not the viewport) |
| 8 | JP-079 · JP-081 (steps) | *What happens next* prints one line per step, and not the design's steps | **A named fit call the user kept once** (JP-054: "the steps stay one line"). All nine frames draw the same three two-line *steps*; the seed prints three *promises* | M | **yes** — A (a `steps` repeater) / B (a delimiter) / C (reply) | open |
| 9 | JP-081 (repertoire head) | "12 Songs" for "Repertoire" | **Named fit call** (Retro L4 open question 8), the precedent JP-070 reversed at layout 3; all three frames agree | S | **yes** — A (a `HEADING_4` arm) / B (reply) | open |
| 10 | JP-081 (tags) | Five chips for the frame's six | **By design (JP-037, a user call)**, on a premise only two frames bear out | S (A) / M (B) | **yes** — A (six everywhere, reopens JP-037) / B (a Lime and Grunge layout-4 seed) / C (reply) | open |
| 11 | — | End-of-pass sweep | — | S | — | open |

**Why this order:**
- The replies first, so a reply the user turns into a fix can be appended before the digests
  start. JP-082's label rule is asked there once, since its labels sit in four sections.
- Then the three entries whose seeded after-diff is zero. JP-076 goes before JP-082 (controls),
  since both add calendar fields to `FIELDS.calendar` and `EditPanel`'s chain. JP-083 goes before
  the repertoire head (entry 9), which is in the same branch.
- Then the named diffs, 30 files each, smallest first. JP-084 (widths only), then JP-080, then the
  stat wall, which moves the same map `arch 3` files as JP-080 and so digests against it landed.
  Then JP-079, then the repertoire head.
- The tags last: they reopen a user call, and option A moves every chip row on the header and the
  bio (≈ 180 files).

**"Decision needed"** means the entry lists options with a recommendation. The session starts by
asking the user (one `AskUserQuestion`, up to four questions) and records the answer under
**Decided** before writing code.

## How each session runs

As [`layout-3-qa-fixes.md`](./layout-3-qa-fixes.md), with these differences:

1. Re-check the *Evidence* line numbers. They are from the triage (2026-09-29, `65dd1bc`), and
   every entry that lands moves them.
2. **Themes per entry, always explicit.** `digest.mjs`'s default list is `0,2,3,4`, which
   **skips Lime**. Every entry here digests **0–4**: the block entries move Lime and Grunge, and the
   rest are the controls, or move too.
3. Verify at **all three widths** and on **both surfaces** (canvas and `live=1`). Digest against a
   **HEAD worktree** on :5174 (`node_modules` an APFS clone, `cp -Rc`, with its `.vite`
   removed). Normalise the port in `background-image` URLs, and `\.jpg\?[^|]*` in `src` if :5173
   has been running long enough to stamp photo URLs with `?t=`. **Prove the harness first** (the
   worktree against the tree before the edit diffs to 0), and **name the expected after-diff
   before writing code.**
4. **The digest's text column is short** (40 characters). A longer string, or a one-glyph change
   at the same width, needs a `textContent` read beside the digest. That covers the ticker's month,
   the steps' second lines and the stat cards' subs.
5. **Harness parameters these entries lean on:** `&cj=` (contents), `&email=` (the page's
   enquiry address as the calendar reads it: an address, empty, or `none` for no form section),
   `&tiers=`, `&who=` (the header's identity, as the bio and the map would read it), `&name=`
   (the header's name), `&n=` (a list of that many generated rows for the section's repeater) and
   `&today=` (opt-in; a `live=1` digest without it never moves with the date). Layout 4 composes
   nothing, so `&column=` and `&page=2` have no work here.
6. **A new or re-scoped field gets a measured `in`**: add a row to `source/scripts/reach.mjs`'s
   `PROBES` (do not rebuild it) and write the `in` and the hint from what it prints. `in` is
   0-based designs, so a layout-4 hit is design 3.
7. **The real app is Grunge card 4** (*Stacked*), then Lime's card 4, then Retro's card 4 where the
   entry reaches Retro's body, and Editorial's card 4 once where it does (Retro's body in Scheme 1
   tokens). `node scripts/page-check.mjs Grunge 3,0,1,2` walks card 4 in full. Drive anything
   live-only in the popup from the opener, per `verifying-the-published-tab`, with trusted
   clicks: the tester did not check a real mouse click.
8. Update the docs the entry names. Commit, fill in **Settled** and the status row, then print
   the hand-off prompt for the next entry and stop.

**Do not refresh the root `index.html` per bug.** The sweep does it once.

**Two entries may add a repeater** (entry 7's `stats`, entry 8's `steps`). Whichever lands first is
the **ninth** structured editor and updates CLAUDE.md's count and lists ("Eight list-shaped contents
…", the `*_KEYS` list, the seed list); the second makes it ten.

---

## JP-081 · JP-082 — the replies

One session, no code: one `AskUserQuestion` with four questions, then the reply lines written here.
A reply the user turns into a fix becomes its own entry, appended before the sweep with its own
Evidence, after-diff and Verify.

### JP-082 (labels) — the labels no field reaches

**Verdict: by design, JP-071's rule** (user call, 2026-09-28: the design's labels stay literals;
a field per label is a product-wide label sweep and its own plan). Three things in the same report
are not labels, so they get entry 3: Send Enquiry (the wizard's submit), the bio's Listen (a link
the census named for this batch) and the form's *Message* label (the one box label still a
literal). The map's four card names go with the stat wall (entry 7), whose shape decides them.

**Evidence** (triage 2026-09-29, `65dd1bc`). Every wizard string is resolved in `sectionVm` onto
`vm.calWizard`, shared by every template (`EncoreBuilder.jsx`):

| Literal | Line | Kind |
|---|---|---|
| Event / Details / Contact (the step names) | `:1258`, `:1259`, `:1263` | label |
| "What's the occasion?" (the frame's) · "Tell us the details" · "How do we reach you?" (ours) | the same | a step's heading, the wizard's own question |
| "Step n of 3" | `:1283` | a counter over the steps |
| Guests · Set length · Budget · Sound · Name · Email, their `ph`, and the summary's `eg` | `:1260`–`1264` | box labels over fixed boxes (JP-052), their hints, and the canvas's picture of a filled-in wizard |
| "Type of event" · "Approx. date" · `dd / mm / yyyy` | `:1286`–`1287` | label |
| Back · Next Step | `:1288` | navigation |
| "Package ›" | `:1291` | a control's label |
| "Pick a date to enquire" (`vm.calPrompt`, also the foot of layouts 1 and 3) | `:1236` | prompt |
| "Not available. Pick another date" · "Type the date as dd / mm / yyyy" | `:1279`–`1280` | system message |
| the sent title and body, *Start again*, the refusal prompt | `:1318`–`1323` | system message (the form's are literals too, `:1689`–`1692`) |
| the mailto body's "Approx. date" / "Package" | `:1341`, `:1343` | label, raw |

- The event types are already a field (`types`, `data.js:1550`, `in: [3]`). The summary's head is
  the picked type (or `s.brand`) over the header's `location` (`EncoreSection.jsx:16142`,
  `:16208`).
- Step 1's copy is the frame's on every master: Grunge's `Frame 324` `964:73023` / `971:8139` /
  `977:12366`, Lime's `964:72938` and Retro's `964:72843`. No frame draws steps 2 or 3.
- The map's eyebrow "Travel & reach": `EncoreSection.jsx:20005` (the block) and `:20230` (Retro's
  body), beside the `span` field ("Live · last 12 months").
- The form's column head "What happens next": `vm.formStepsLabel`, `EncoreBuilder.jsx:1640`.

**Decision.**
- **A (recommended). Reply: by design**, JP-071's rule.
- **B. A field each for the few that head a block**: the three step headings as one `area` field
  (one per line); a *Panel title (layout 4)* for "Travel & reach", with the head row dropping when
  both it and `span` are empty; a *Steps heading* for "What happens next" (only with entry 8's A,
  where the column becomes the artist's list). Not recommended: it opens the sweep JP-071 deferred,
  and the step headings ask for boxes the product fixes.

### JP-081 (form head) — "Contact Us" where Grunge's frames print "KAI MERCER"

**Verdict: a recorded user call, and an open question the user has not been asked.**
- JP-054 (2026-09-23) seeded layout 4's head "Contact Us" on every template. Retro's and Lime's
  1440 instances are retyped to it (their layer is still named "KAI MERCER"), and that retyping was
  read as the authored copy, over the narrow masters' untouched default.
- Grunge's page has **no desktop instance**. Its 1440 master is the main component `725:2990`, and
  the component and both narrow instances print the component's default, "KAI MERCER".
- Grunge's layout-4 pass named the diff and left it as open question 2 (`./layout-4.md:520`–`525`,
  `:1360`–`1363`, `:1613`–`1619`): a head that is the artist's name on one template would be the
  first theme-gated copy default.
- Across the nine frames, **seven print "KAI MERCER"** (every narrow master, and Grunge's
  component) and **two print "Contact Us"** (Retro's and Lime's desktop instances).
- JP-070 (form) has since set the precedent for a head that names the mock artist
  (`formHeading3()`, layout 3).

**Evidence.**
- `data.js:1098`: `FORM_HEADING_4`. `EncoreBuilder.jsx:252`–`255`: `HEADING_4.form`, resolved in
  `sectionVm` at `:1037` and in `EditPanel`'s chain at `:3636`–`3637`. The layout-3 name arms:
  `:1040` and `:3629`; `formHeading3` at `data.js:1760`.
- The `heading` row's hint names layout 4's "Contact Us" (`data.js:1649`–`1654`).
- The comments naming the diff: `EncoreSection.jsx:24550`–`24557` and `:24572`–`24574` (the
  block), `:24785`–`24791` (the body).
- Frames: the text "Contact Us" on a layer named `<KAI MERCER>` in `964:72940` and `964:72845`;
  "KAI MERCER" in the other seven (Grunge `725:2990` / `971:8151` / `977:12378`, Lime `971:5627` /
  `977:9201`, Retro `964:79477` / `977:8663`).

**Decision.**
- **A (recommended). Reply.** JP-054's call stands, and the *Heading* field edits the head. Open
  question 2 closes on its default, with a line in the designer note.
- **B. Grunge's layout-4 head from the name.** With `heading` absent, `T.name === 'Grunge' &&
  d === 3` resolves `artistName`; the block upper-cases it. `EditPanel`'s chain carries the same
  arm ahead of `HEADING_4` (the `formHeading3` pair). A typed head stops following the name, and
  an emptied one stays empty. The first theme-gated copy default. Form `arch 3` × theme 2 × 3
  widths × both surfaces = **6 files** (the `<h2>`'s text); confirm the head block's height holds.
- **C. The name at layout 4 on every template**, the seven-of-nine reading. It reverses JP-054's
  head for Retro and Lime, whose authored desktop says "Contact Us". 30 files. Not recommended.

### JP-081 (media head) — "Five worth your ear." for "Six Worth Your Ears"

**Verdict: by design, named three times.** The frame's sixth tile is a filler, a second "Roomtone /
Hidden Sessions Vol. 2", so "Six" counts it over the seed's five tracks; the fit's reading is one
tile per track.
- Named at `../retro/layout-4.md:141`, `:380`–`382` and `:1571`, at `../lime/layout-4.md:410`–`412`,
  and at `../lime/layout-4-qa-fixes.md:110`–`112`. The comment is at `EncoreSection.jsx:8130`–`8132`.
- Layouts 1–3's frames read the seed's words (Grunge `964:58602` "Five worth \nyour ear.",
  `964:64620` "Five Worth your ear", `964:68698` "Five worth your ear"). Layout 4's read "Six Worth
  Your Ears" under Grunge (`964:72954` / `971:10395` / `977:12177`), Lime (`964:72858`) and Retro
  (`964:72523` / `971:14889`).

**Decision.**
- **A (recommended). Reply**: a count in a head is the frame's claim, and an artist with six
  tracks edits it.
- **B. A count-derived layout-4 head**, "{n} worth your ears", spelled one to eight (`max: 8`), in
  `sectionVm` and `EditPanel`. The seed then reads "Five worth your ears". Every template, 30 files;
  every such head measured on one line at 1440.
- **C. A `HEADING_4` arm "Six worth your ears".** Not recommended: false over five tracks.

### JP-081 (bio prose and track names) — the product's own copy

**Verdict: by design, both.**
- **The bio.** Every layout-4 bio frame (Grunge `964:72945` / `971:7824` / `977:12045`, Lime
  `964:72857` / `971:5307` / `977:8875`, Retro `964:72519` / `964:76446` / `971:14479`) differs from
  ours in four seats:

  | Seat | Frame | Ours |
  |---|---|---|
  | Prose | **one** paragraph: "Kai Mercer — the act you'll be working with on the night. DJ and selector based in Manchester. Five years of reading rooms…" | `para1` ("DJ and selector based in Manchester. Five years…") and `para2` ("Residencies at Roomtone and The Warehouse Project…"), two paragraphs |
  | Meta row | "DJ & selector" | "DJ · Live Act" |
  | Meta row | "Performing since 2021" | "Performing since June 2021" |
  | Card name | "Staticyouth" | the artist's name |

  The prose is `para1` behind a lead clause naming the mock artist. The kicker is the header's, one
  seed at every layout (JP-061, user call, 2026-09-28). `since` has one seed, taken from layout 3's
  frame. The name is JP-050's rule. Evidence: `data.js:967`–`970` (`DEFS.bioP1` / `bioP2`), `:1375`
  (`para2`, `in: [2, 3]`), `:1388` (`since`); the block's prose at `EncoreSection.jsx:5263`–`5266`
  and Retro's body at `:5469`–`5477`, whose comment ("the seeded `para1` verbatim") is not quite
  right, since the masters lead with the name clause.
- **The tracks.** `TRACKS` (`data.js:626`–`632`) is **layout 1's frame's** list (`964:58602`: LATE
  LIGHTS / MANCHESTER AT 3AM / SLOW BURN / ECHO & THE FLOOR / ROOMTONE). The frames of layouts 2–4
  suffix two of them ("Late Lights (Original Mix)", "Slow Burn (Edit)"), named at
  `../editorial/layout-2.md:1100` and `../editorial/layout-3.md:1274`. Layout 4's grid adds the filler
  sixth tile, and its sleeve names "Night Rain / Kai Mercer": F10's rule (`../retro/qa-fixes.md:148`),
  the now-playing block names the cued track, and `FIELDS.media` has no now-playing field.

**Decision.**
- **A (recommended). Reply to both.** Correct the comment at `EncoreSection.jsx:5469`.
- **B (the bio). A layout-4 seed, gated on the absent key**: `para1` at `d === 3` becomes
  `${name} — the act you'll be working with on the night. ${DEFS.bioP1}`, derived like
  `formHeading3()`, with `EditPanel`'s chain arm; `para2` unseeded at layout 4. Bio `arch 3` × themes
  0–4 × 3 × 2 = **30 files**, and the first per-layout seed for a *paragraph*.
- **B (the tracks). Suffix the seeds everywhere.** Layout 1's frame then differs, and at layout 4
  "Late Lights (Original Mix)" truncates at 1440 on every template (−63 Retro, −85 Lime, −61 Grunge,
  −122 Pop; −20 / −37 / −14 / −77 at 768), so it leans on JP-084's B. Per-layout track seeds are not
  offered: a row carries art and audio, which are never re-seeded by index. Not recommended.

**Decided: A, A, A, A** (user, 2026-09-29; four questions, each the recommendation). All four are
replies. None becomes a fix, so no entry is appended.
- **JP-082 (labels): A, a reply.** JP-071's rule: the design's labels stay literals, and a field
  per label is a product-wide label sweep and its own plan. This decides **"Travel & reach"** (the
  map's eyebrow, entry 7) and **"What happens next"** (the form's column head, entry 8) here. Both
  stay literals whatever those entries decide. Under entry 8's A the list under the head becomes
  the artist's `steps`, but the head still names what stands beside it. Send Enquiry, the bio's
  Listen and the form's *Message* label are still entry 3's, and the map's four card names are
  still entry 7's.
- **JP-081 (form head): A, a reply.** JP-054's call stands: "Contact Us" on every template, and
  the *Heading* field edits it. **Grunge layout 4's open question 2 closes on its default**
  (`./layout-4.md:1613`–`1619`), and the diff goes into the sweep's designer note.
- **JP-081 (media head): A, a reply.** The frame's "Six" counts its own filler tile. An artist with
  six tracks edits *Heading*.
- **JP-081 (bio prose and track names): A, a reply to both.** The prose's lead names the mock
  artist, and the tracks are layout 1's frame's list. **The comment correction A names**
  (`EncoreSection.jsx:5469`–`5474`: "the seeded `para1` verbatim", where the masters lead with a
  clause naming the artist) is code. This session writes none, so it moves to **entry 3's Docs**,
  which edits the same body's `ListenLink` site.

Asked over the evidence, re-checked on HEAD (`ff5fcd0`). No source has changed since the triage's
`65dd1bc` (`git diff --stat` touches only `plans/`), so every Evidence line above stands. Spot
reads: `FORM_HEADING_4` at `data.js:1098` and `formHeading3` at `:1760`; the media head's comment at
`EncoreSection.jsx:8130`–`8132`; the bio block's prose at `:5263`–`5266`; Retro's body prose and its
comment at `:5469`–`5477`; `FIELDS.map.span` at `data.js:1599` (*Panel note (layout 4)*).

**Settled** (2026-09-29, no code).
- **No entry appended**: every answer is a reply.
- **Entries 7 and 8 do not ask about their heads.** Each points back here. Entry 7's A does not
  touch "Travel & reach", and entry 8's A does not touch "What happens next".
- **Carried to entry 3's Docs:** the `EncoreSection.jsx:5469` comment (above).
- **Carried to the sweep:** a *closed* pointer on `./layout-4.md`'s open question 2 (step 6). The
  designer note's three lines for the form head, "Six Worth Your Ears" and the bio prose are
  already in step 5.
- **The reply lines**, in the sweep's shape so step 6 can lift them as they stand, are below.

Reply (JP-082, the labels): **JP-082 (labels) — by design.** These are the design's labels, not the
artist's content, and they name what stands beside them, so they stay as the design draws them
(the rule we gave for JP-071). That covers every text of the Book Us wizard: the step names,
*What's the occasion?*, *Step 1 of 3*, *Type of event*, *Approx. date*, the boxes' names (*Guests*,
*Set length*, *Budget*, *Sound*, *Name*, *Email*), *Back* / *Next Step*, *Package ›*, *Pick a date
to enquire* and its messages. It also covers the Events Map's *Travel & reach* and the Enquiry
Form's *What happens next*. What they label is editable:
- the wizard's event types are the Booking Calendar's *Event types*;
- its date starts from *Opens on*;
- its package card lists the Pricing section's packages;
- the note beside *Travel & reach* is the Events Map's *Panel note (layout 4)*;
- the list under *What happens next* is the Enquiry Form's (see JP-079).

Making labels editable would be a product-wide change, which we can plan as its own piece of work.
Three things in the report are not labels and are fixed separately: *Send Enquiry*, the Bio's
*Listen ↗* and the form's *Message* label (JP-082, controls). The Events Map's four stat card names
are handled with JP-077.

Reply (JP-081, the form head, the media head, the bio prose and the track names):
- **JP-081 (form head) — by design.** Layout 4's form opens on *Contact Us* on every template. That
  was a product call (JP-054), taken from the Retro and Lime desktop designs, which set that
  heading. Grunge's design shows *KAI MERCER* there because its form was never given a heading of
  its own: that is the design component's placeholder, the mock artist's name. We keep *Contact Us*
  and have asked the designer which is meant. To show the artist's name instead, type it into
  Enquiry Form → *Heading*.
- **JP-081 (media head) — by design.** "Six Worth Your Ears" counts the design's six tiles, and its
  sixth tile is a filler, a second copy of *Roomtone*. The page seeds five tracks and draws one tile
  per track, so its heading says five. An artist with six tracks changes Media Player → *Heading*.
- **JP-081 (bio prose and track names) — by design.**
  - The design's bio paragraph opens with "Kai Mercer — the act you'll be working with on the
    night.", a sentence about the mock artist. The rest is our *Paragraph 1* word for word.
    *Paragraph 2* is the artist's second paragraph, and emptying it leaves one paragraph as the
    design draws.
  - The bio card's other differences are fields too. Its "DJ · Live Act" is the Header's
    *Kicker*, which has one seed at every layout (JP-061), where this design has "DJ & selector".
    Its "Performing since June 2021" is the Bio's *Performing since*, seeded from the Layout 3
    design. Its name is the artist's name, where the design prints its mock name, "Staticyouth".
  - The track names are the Layout 1 design's own list. Layouts 2–4 add "(Original Mix)" and
    "(Edit)" to two of them. The tracks are one list for the whole page, so it cannot follow every
    design at once. Media Player → *Tracks* edits them.

---

## JP-076 — with the Enquiry Form deleted, Book Us' Send Enquiry does nothing

**Proposed severity: Medium.** The loss is silent, and sending enquiries is what the page is for.
But reaching it takes a step the artist has to choose, deleting the Enquiry Form, and the seeded
page works. The same state was already reachable, and accepted, by emptying the form's own address:
the form's submit goes silent then too.

**Verdict: confirmed, and a known state that has no face and no fix path.**
- CLAUDE.md names it: with no form section, or an address `emailProblem()` refuses, both pills stay
  spans, "the form's no-address state". JP-053 took the address from the form on purpose, and
  turned down its option C, a calendar field of its own, as "a second copy of the one address the
  whole page points at".
- The ticket shows two gaps:
  - **(a) Both pills still look live, and a click does nothing at all.** No check runs, nothing
    walks to step 3, and no line appears.
  - **(b) A page cannot have a working Book Us without an Enquiry Form.** The only fix path is to
    add the form back.
- **Every template.** The send seam is resolved above the layout-4 block and shared whole.

**Evidence** (triage 2026-09-29, `65dd1bc`).
- `data.js:1785`–`1796`: `pageEmail()` is `''` when no form section is on the page. `:1103`:
  `FORM_EMAIL`. `:1882`–`1896`: `emailProblem()` and `emailAddr()`.
- `pageEmail()` feeds five call sites: the published page (`EncoreBuilder.jsx:4340`), the canvas
  (`:4557`, which passes `email` on to `EditPanel`, `LayoutPicker` and `AddComposer`) and the harness
  (`preview.jsx:246`–`248`).
- `EncoreBuilder.jsx:1311`–`1317`: `vm.calEmail = email`, `sectionVm`'s argument. `:1338`:
  `vm.calMailto` composes on that `email`. `:1350`: `vm.calCheck`.
- `EncoreSection.jsx`:
  - `:16173`–`16178`: `sendHref` is `''` with no address, so `onSend` is `undefined`. Nothing checks
    step 3 and nothing walks to it.
  - `:16437`–`16439`: `sendLink` is null and `onNextTag = onSend`, so the last step's pill is a span
    with no handler.
  - Where the two pills are drawn:

    | Pill | Lime / Grunge block | Retro's body |
    |---|---|---|
    | Step 3's Send | `:16703`–`16708` | `:16789`–`16795` |
    | The foot pill (`BookPill ext={sendHref} onClick={onSend}`) | `:16769` | `:16890` |

  - **Why it "looks active":** `BookPill`'s span keeps `cursor: 'pointer'` whether or not it has a
    link or a handler (`:775`). The step-3 pill drops the pointer (`cursor: onNextTag ? 'pointer' :
    undefined`) but is otherwise drawn live.
- The form's own no-address state is the same rule, the Soundcloud rule: `EncoreSection.jsx:22549`–
  `22555` (`href` `''` means no `onSubmit`, and a span).
- **The panel says nothing about it.** `FIELDS.calendar` (`data.js:1527`–`1552`) has no address
  field and no hint names the dependency. `FIELDS.form.email`'s hint (`:1678`–`1679`) names the
  wizard, but that panel is gone once the form is deleted. `EditPanel` already receives `email`
  (`EncoreBuilder.jsx:3527`) and only passes it to `LayoutPicker`.
- A precedent for a panel note about a section that is not on the page: `LINK_GONE_HINT` and
  `navGoneHint` (`EncoreBuilder.jsx:3417`–`3421`), and the Minimal nav's note above its select
  (`:3662`).
- Frames: no master draws Send Enquiry in a disabled state (Grunge `964:73034` / `971:8150` /
  `977:12377`, Lime `964:72939`, Retro `964:72844`).

**Decision** (one `AskUserQuestion`, two questions).
1. **Where the address comes from.**
   - **A (recommended). A calendar address that follows the form's until one is typed.**
     - A `FIELDS.calendar` row `{ k: 'email', l: 'Email address', in: [3] }` with no static `d`,
       resolved in `sectionVm` as `c.email !== undefined ? emailAddr(c.email) : email` (the page's
       `pageEmail()`).
     - `EditPanel` gets a chain arm (`f.k === 'email' && sec.cat === 'calendar' ? email`), so the box
       shows the form's address while the key is absent: the `copyrightOf()` / `formHeading3()`
       shape. The box is a `UrlInput` with `check={emailProblem}`.
     - It reverses JP-053's C in part, and the chain answers JP-053's objection: by default there is
       still one address, and a second exists only once the artist types it. The hint says so.
     - It closes (b): with the form deleted, the box stands empty in the calendar's own panel, and
       the artist can type an address there.
     - Cost: once typed, the calendar's address stops following the form's. That is `copyright`'s
       accepted behaviour.
   - **B. Keep one address (JP-053).** The fix path is to add the Enquiry Form back; JP-073 returns
     it to its seat, address and all. (b) is then a named limitation: Book Us cannot stand without an
     Enquiry Form.
   - **Not offered: keeping the deleted form's address alive** (`pageEmail()` falling back to
     `st.removed.form`). It would make the tester's steps work unchanged, but the address would be
     hidden state no panel shows or edits, and it stretches what `st.removed` is for.
2. **How the no-address state shows.** Needed under A or B, since an emptied or refused address
   still reaches it.
   - **(a) (recommended). The panel says so.** At layout 4, while the resolved address is `''`, the
     calendar's panel prints a line under the field (the `navGoneHint` precedent): "Send Enquiry needs
     an email address. There's no Enquiry Form on the page — type one here." or its form-address
     variant. The `types` / `email` hints and `FIELDS.form.email`'s hint name the dependency. The
     published pills keep the Soundcloud rule, as the form's own submit does.
   - **(b) Also draw both Send pills inert** while there is no address: no pointer, and the wizard's
     refused .38, on both surfaces, since `vm.calEmail` is known on both. The form's submit then owes
     the same state, which widens the entry to every form layout. Name it rather than take it quietly.
   - **(c) A line for the visitor after a click.** Not recommended: the page would tell visitors it is
     misconfigured.

**Fix (A, (a)).**
- `data.js`: the new row after `types`, with a hint. Correct `pageEmail()`'s comment and
  `FIELDS.form.email`'s hint ("…and the Booking Calendar's layout-4 Send Enquiry, until the calendar
  has an address of its own").
- `sectionVm`: resolve the calendar's `email` ahead of `vm.calEmail` and `vm.calMailto` (`:1317`,
  `:1338`).
- `EditPanel`: the chain arm (`:3627`), and the no-address line under the field at design 3.
- `preview.jsx`: nothing. `&cj={"email":…}` reaches the calendar's key, and `&email=` stays the
  page's.
- `BookPill`'s span pointer (`:775`) is left alone under (a): it is shared by every pill that lacks a
  target, and the fix is (b)'s question.

**Expected after-diff (named before the code): zero.** The seeded page carries the form and the
calendar's key is absent, so it follows the form: calendar × every `arch` × themes 0–4 × 3 widths ×
both surfaces = **0 files**. `&email=none` is also 0 under (a), since the pills were spans already;
under (b) it is calendar `arch 3` × themes 0–4 × 3 × 2 = **30 files**, under `&email=none` only.

**Verify.**
- **Before the edit**, reproduce at `live=1&email=none`: both pills are spans with no handler, and
  a click on the foot pill neither checks nor walks to step 3.
- **The seed.** Digest calendar × themes 0–4 × 3 × 2: 0 files.
- **Reach.** A `calendar.email` row in `PROBES` (`{ email: 'zq@example.test' }`, `live=1`, read off
  the pills' `href`): layout 4 on all five templates.
- **States** (`live=1`, three widths, themes 0–4):
  - `&email=none&cj={"email":"me@band.co"}`: both pills are `mailto:me@band.co`, carrying JP-053's
    whole body;
  - `&cj={"email":""}` and `&cj={"email":"not-an-email"}`: spans;
  - the key absent: the page's `&email=` still reaches the pills;
  - the confirmation prints the calendar's own address.
- **The tester's steps**, in the real app on Grunge card 4, with trusted clicks:
  1. Enquiry Form ⋯ → Delete. The calendar's panel shows an empty *Email address* and the note.
  2. Type `me@band.co`, Publish → Open (press *Start again* first if the popup is already open:
     JP-053's trap).
  3. Walk steps 1–3. Both pills open `mailto:me@band.co` with every answer.
  4. Add the Enquiry Form back. With the calendar's key never typed, its box shows the form's
     address again; once typed, it keeps its own. Undo after the delete restores the form, and the
     pills follow it.
  5. Then Lime's card 4, Retro's card 4 once, and Editorial's card 4 (Retro's body).

**Docs.** CLAUDE.md's layout-4 wizard passage ("The address is the **enquiry form section's
`email`** … with no form section … both pills stay spans"). The comments at `EncoreBuilder.jsx:1311`–
`1316` and `EncoreSection.jsx:16038`–`16042` and `:16163`–`16171`. `pageEmail()`'s comment. A pointer
on JP-053's Decided in `../lime/layout-4-qa-fixes.md` ("C taken in part by JP-076, as a
follow-the-form chain").

**Decided** (2026-09-29, user call): **1 A, 2 (a).** The Booking Calendar gets an *Email address*
of its own, which follows the Enquiry Form's until one is typed (the `copyrightOf()` /
`formHeading3()` chain shape). This takes JP-053's option C in part. The no-address state is a note
in the calendar's panel at layout 4. The published pills keep the Soundcloud rule, and
`BookPill`'s span pointer is left alone.

**Settled** (2026-09-29). Every Evidence line held at the start, since source had not changed
since the triage.
- **The fix.**
  - `data.js`: `FIELDS.calendar`'s `email` row after `types` (`:1556`, no `d`, `in: [3]`, a hint
    saying it follows the form until typed). `FIELDS.form.email`'s hint gains "…until the calendar
    has an address of its own". `pageEmail()`'s comment (`:1793`–`1802`) says it is the wizard's
    address only while the calendar's key is absent.
  - `sectionVm`: `const sendTo = emailAddr(cv('email', email))` (`EncoreBuilder.jsx:1321`) is
    resolved once, and **both** `vm.calEmail` and `vm.calMailto` (`:1343`) read it, so the
    confirmation and the mail cannot name different addresses.
  - `EditPanel`: the chain arm `f.k === 'email' && sec.cat === 'calendar' ? email` (`:3643`), and
    `calNoMailHint` (`:3431`, beside `navGoneHint`) printed above the box by `noMail` (`:3667`).
    `noMail` holds at layout 4 while the resolved address is `''` and no typed address is refused
    (`UrlInput` already prints that one). It has three variants: no form on the page, the form's
    address empty or refused, and the calendar's own box emptied. The form's presence is read off
    `navSections`, which carries `form`, so no prop was threaded.
  - `EncoreSection`: comments only (`:16038`–`16044`, `:16164`–`16173`). `BookPill`'s span
    pointer (`:775`) is untouched, as decided.
  - `preview.jsx`: nothing.
  - `reach.mjs`: a `calendar.email` row.
- **The harness was proved first.** A HEAD worktree on :5174 against the tree on :5173 gave
  0 of 60 per surface at the seed and at `&email=none`. **After-diff, named before the code:
  zero.** Calendar × themes 0–4 × 3 widths × both surfaces: **0 of 60 per surface**, at the seed
  and at `&email=none`. The form, whose hint alone changed: **0 of 60 per surface**.
- **Reach** (`calendar.email`, `live=1` included): **layout 4 on all five templates**, 3 of 6
  renders each, all three of them live. The canvas's `sendHref` is `''`, so `in: [3]` and the
  hint stand as written.
- **Before the edit** (HEAD, `live=1&email=none`): both pills were spans, the foot pill kept
  `cursor: pointer`, and a click on it left the wizard on step 1 with no prompt. That reproduces
  the ticket.
- **States** (`live=1`, themes 0–4 × 3 widths, a one-off probe clicking with puppeteer's
  trusted clicks):
  - `&email=none&cj={"email":"me@band.co"}`: both pills are `mailto:me@band.co`, the foot pill at
    step 1 walks to step 3 with the prompt, a filled send reaches the confirmation, and the
    confirmation prints `me@band.co`: **15 of 15**.
  - `{"email":""}` and `{"email":"not-an-email"}`: spans, 15 of 15 each.
  - The key absent with `&email=other@x.test`: `other@x.test`, 15 of 15.
  - Typed `me@band.co` beside `&email=other@x.test`: the calendar's own wins.
- **The tester's steps, in the real app** (a one-off puppeteer script, trusted clicks, deleted
  after), on Grunge's, Lime's, Retro's and Editorial's card 4:
  - Delete the form. The panel's box is empty under "Send Enquiry needs an email address.
    There's no Enquiry Form on the page — type one here."
  - Undo. The box shows `bookings@kaimercer.co.uk` again, with no note.
  - Delete again and type `me@band.co`. Publish → Open, walk steps 1–3 (Festival, 14/11/2026, 300 /
    5 hrs / £3,000 / Needed, a name and an email). **Both pills are `mailto:me@band.co` carrying
    every answer and the package.** Send shows the confirmation with `me@band.co`.
  - *+ Add section* brings the form back, and the calendar's box keeps `me@band.co`.
  - Lime also published straight after the Undo: both pills were `mailto:bookings@kaimercer.co.uk`,
    so the pills follow the restored form. Its republish then went through *Start again*.
  - No page errors on any run.
  - The other two variants, on Grunge: with the form's address emptied or refused, the note reads
    "The Enquiry Form's is empty or not valid — fix it there, or type one here." With the
    calendar's box typed and then emptied, it reads "Type one here." With the box holding
    `not-an-email`, there is no note, only `UrlInput`'s "That email address looks incomplete."
- **Docs**: CLAUDE.md's layout-4 wizard passage, README's matching passage, the comments above,
  and the pointer on JP-053's Decided in `../lime/layout-4-qa-fixes.md`.
- **Lines for entry 3** (after this commit): `FIELDS.calendar.cta` `data.js:1547`,
  `vm.calWizard.send` `EncoreBuilder.jsx:1288`, the chain's form `button` arm `:3653`,
  `vm.formTypeLabel` / `vm.formMsgLabel` `:1692` / `:1693`, `msgLabel` `:1710`, the bio's
  `vm.cta2` `:559`, the pills `EncoreSection.jsx:16705` / `:16771` (block) and `:16791` /
  `:16892` (Retro's body), and the bio-prose comment `:5469`.

Reply: **JP-076 — fixed.** The Booking Calendar now has its own *Email address* (layout 4). Until
you type in it, it shows and uses the Enquiry Form's address, so a page that never touches it
still has one address. With the Enquiry Form deleted, the box is empty and the panel says "Send
Enquiry needs an email address. There's no Enquiry Form on the page — type one here." Type an
address there and both Send Enquiry pills mail it every answer, with the confirmation naming it,
whether or not the form is on the page. The panel also says when the form's own address is empty
or not valid. The published pills stay pictures while there is no address, as the form's own
submit does. Undo after the delete, or adding the form back, restores its address to the pills,
as long as the calendar's box was never typed in. Checked on Stacked under Grunge, Lime, Retro
and Editorial, at 1440, 768 and 390.

---

## JP-082 (controls) — Send Enquiry, the bio's Listen and the form's *Message* label

**Verdict: confirmed, three controls, every template.** JP-071's rule is that a label names what
stands beside it. These three are not that: a submit, a link, and a box label among box labels that
are all the artist's. The entry is one session with three small questions, all with a zero seeded
after-diff.

### Send Enquiry — the wizard's submit

- Every other calendar layout's pill is a field: `cta` at layout 1 (`FIELDS.calendar.cta`,
  `{ l: 'Button (layout 1)', d: 'Check a date', in: [0] }`, `data.js:1546`; `vm.calCta`,
  `EncoreBuilder.jsx:1239`) and `slotCta` at layout 2. Layout 4's foot pill held `cta`'s "Check a
  date" until JP-052 refitted the column (the comment at `EncoreSection.jsx:16868`–`16873`).
- "Send Enquiry" is `vm.calWizard.send`, a literal at `EncoreBuilder.jsx:1288`, printed by step 3's
  pill and the foot pill (the table in JP-076).
- The widening precedent is JP-070's `rowCta`: one field across layouts 1, 3 and 4, a per-layout seed
  (`PRICING_ROW_CTA_3`, `PRICING_ROW_CTA`), resolved in `sectionVm` and `EditPanel`'s chain
  (`:3627`–`3640`).

**Decision.**
- **A (recommended). Widen `cta` to `in: [0, 3]`** with a per-layout seed: "Check a date" at layout
  1, a `CAL_SEND_4` "Send Enquiry" at layout 4 (`FORM_BTN_4`'s shape), in `sectionVm` and the chain.
  Relabel it *Button*, with a hint naming both seats at layout 4. **An emptied label at layout 4 falls
  back to the seed** rather than dropping, since it is the only submit (the form card's `cta` rule).
  The same field reaches every template's wizard.
- **B. Reply**, with the labels.

### The bio's "Listen ↗"

- The bio's layout-4 meta row prints `ListenLink`, which prints `s.cta2`. For the bio that is
  `cv('cta2', 'Listen')` on the bio's **own** content (`EncoreBuilder.jsx:559`), and `FIELDS.bio`
  (`data.js:1367`–`1390`) has no `cta2`.
- JP-059's census (`./layout-2-qa-fixes.md:413`–`417`) classed it as "one control label no field
  reaches", not a label, corrected `FIELDS.header.cta2`'s comment (`data.js:1337`–`1341`) and left it
  for a later batch. This is that batch.
- The header's *Secondary button* cannot reach it, and on *Stacked* it reads "Not shown in this
  layout" anyway (`in`: Retro `[1, 2, 4]`, Lime / Grunge / Editorial `[1, 2]`).
- `ListenLink` (`EncoreSection.jsx:868`–`877`) prints `{s.cta2}{after}`, so an empty label would print
  a bare " ↗". The bio's two sites: `:5189`–`5190` (the block) and `:5393`–`5394` (Retro's body),
  both `textTransform: 'none'`, `after=" ↗"`.
- Frames: every layout-4 bio reads "Listen ↗" at all three widths (the ids in the replies entry).

**Decision.**
- **A (recommended). A bio field on the key it already reads**: `{ k: 'cta2', l: 'Listen link',
  d: 'Listen', in: [3], hint: 'The link beside Performing since, to your Media Player on the
  published page. Leave it empty to hide it.' }`. `sectionVm` needs nothing; both sites drop the link
  when the label is empty. Uncased, as today; the `↗` stays in the markup.
- **B. The header's *Secondary button*, read through `identity`**: one Listen word per page. Not
  recommended: on *Stacked* the header's own field would read "Not shown in this layout" while the bio
  prints it, JP-061's trap.
- **C. Reply.** Not recommended: the census said it is not a label.

### The form's *Message* label

- Every box on the form is a row of `FIELDS.form.fields` and carries its own label. The message box's
  is the one literal: `vm.formMsgLabel = 'Message'` (`EncoreBuilder.jsx:1688`, beside
  `formTypeLabel` at `:1687`, under the comment at `:1682`–`1686`). Its placeholder is already a field
  (`message`, *Message placeholder*, `data.js:1676`, `in: [0, 3]`).
- The same string heads the visitor's message in the mailto body: `formMailto` passes it as
  `msgLabel` (`:1701`–`1706`), and `enquiryMailto()` writes `${msgLabel}:` over the message
  (`data.js:1936`–`1944`). An empty label would send a bare ":".
- Layouts 1 and 4 draw the box: `EncoreSection.jsx:22882` (the block) and `:23163` (Retro's and Pop's
  body) at layout 1; `:24680` and `:24998` at layout 4. The comment that lists it as a literal:
  `:24804`–`24807`.
- Frames: "MESSAGE" over the box on all nine layout-4 frames (Grunge `725:2990` / `971:8151` /
  `977:12378`, Lime `964:72940` / `971:5627` / `977:9201`, Retro `964:72845` / `964:79477` /
  `977:8663`), in Display/List, the box labels' own style.
- The unreported sibling is layout 1's chip-row label, `vm.formTypeLabel` "Event type" (`:1687`), over
  the `types` field: the same shape, at layout 1 alone.

**Decision.**
- **A (recommended). A `messageLabel` field** beside `message`: `l: 'Message label'`,
  `d: FORM_MSG_LABEL` ('Message'), `in: [0, 3]`, raw (the render upper-cases it, as today).
  **Emptied, it reads "Message" on the box and in the mailto alike**: the guarded email row's rule
  (`FORM_EMAIL_LABEL`, JP-051), since the box always stands. Hint: "Layouts 1 and 4. Also heads the
  message in the email you receive. Left empty, it shows Message."
- **A+. Also a `typesLabel` for layout 1's "Event type".** Not recommended in this batch: nobody
  reported it, and it is layout 1's.
- **B. Reply**, by JP-071's rule. Weaker here than for its labels.

**Fix (A, A, A).**
- `data.js`: `CAL_SEND_4` beside the calendar constants and `cta`'s row widened; the bio's `cta2`
  row; `FORM_MSG_LABEL` beside `FORM_MESSAGE` (`:908`) and the `messageLabel` row after `message`.
- `EncoreBuilder.jsx`: `vm.calWizard.send` (`:1288`, today `cased('Send Enquiry')`) from `cta` at
  design 3, through the same `cased()`, with the seed as its fallback;
  `vm.formMsgLabel = String(cv('messageLabel', FORM_MSG_LABEL)).trim() || FORM_MSG_LABEL` (`cv` does
  not trim, `:292`); and **`EditPanel`'s chain arm** (`f.k === 'cta' && sec.cat === 'calendar' &&
  design === 3 ? CAL_SEND_4`, beside the form's `button` arm at `:3638`), or the panel shows "Check a
  date" over a canvas printing "Send Enquiry". The bio and the form need no arm: their `d` is the seed
  at every layout.
- `EncoreSection.jsx`: the bio's two `ListenLink` sites drop the link on an empty label. Nothing else;
  the other sites already read the keys.

**Expected after-diff (named before the code): zero.** Every seed is today's words. Calendar, bio and
form × themes 0–4 × 3 widths × both surfaces = **0 files**.

**Verify.**
- **The seed.** Digest calendar, bio and form × themes 0–4 × 3 × 2: 0 files.
- **Reach.** Re-measure `calendar.cta` (layouts 1 and 4, all five templates); new rows `bio.cta2`
  (layout 4) and `form.messageLabel` (layouts 1 and 4).
- **The panel.** The calendar's *Button* reads "Send Enquiry" at layout 4 and "Check a date" at layout
  1, and never "Not shown in this layout" at either. Without the chain arm the panel would show "Check
  a date" over a canvas printing "Send Enquiry" (entry 9's trap, and JP-070's `rowCta`).
- **States** (`&cj=`, `live=1`, three widths, themes 0–4):
  - `{"cta":"Enquire now"}` changes step 3's pill and the foot pill at `arch 3`, and layout 1's pill
    at `arch 0`; `{"cta":""}` at `arch 3` prints "Send Enquiry"; the mailto is unchanged;
  - `{"cta2":"Hear the set"}` prints "Hear the set ↗"; `{"cta2":""}` drops the link with no bare
    arrow; live, the link still scrolls to `#media`, and with no media section it is a span;
  - a marker `messageLabel` prints over the box at `arch 0` and `arch 3`; emptied, it prints "Message";
    live, fill the boxes and a message and read `getAttribute('href')`: the body ends
    `%0D%0A%0D%0A<label>%3A%0D%0A<message>`, and an emptied label sends `Message%3A`.
- **The tester's steps**, in the real app on Grunge card 4: the panels list *Button* (Booking
  Calendar), *Listen link* (Bio) and *Message label* (Enquiry Form), none marked "Not shown in this
  layout"; type a marker into each, then Publish → Open at 1440 / 768 / 390. Then Lime's card 4, and
  Retro's card 1 and card 4 once (layout 1's and layout 4's shared body).

**Docs.** CLAUDE.md's layout-4 wizard passage ("`cta` not at all" becomes its reach) and its `s.live`
list, where it names "the bio's own Listen". The comments at `EncoreSection.jsx:16868`–`16873`,
`data.js:1337` (the bio's `cta2` is now a bio field), `EncoreBuilder.jsx:1682`–`1686` and
`EncoreSection.jsx:24804`–`24807`. The hints of `cta`, `message` and `FIELDS.form.email`.
**Carried from the replies entry:** Retro's body's bio prose comment at `EncoreSection.jsx:5469`–`5474`
("The masters set one paragraph — the seeded `para1` verbatim") becomes "`para1` behind a lead clause
naming the mock artist" (JP-081, a reply).

**Decided** (2026-09-29, user call): **A, A, A.** The calendar's `cta` widens to layouts 1 and 4
as *Button*, seeded "Check a date" at layout 1 and `CAL_SEND_4` "Send Enquiry" at layout 4, an
emptied label at layout 4 falling back to the seed. The bio gets a *Listen link* field on the
`cta2` key it already reads, and an emptied one drops the link. The form gets a *Message label*
field, and an emptied one reads "Message" on the box and in the mailto. No `typesLabel`.

**Settled** (2026-09-29). Every line in JP-076's drift table held at the start.
- **The fix.**
  - `data.js`: `FORM_MSG_LABEL` beside `FORM_MESSAGE` (`:913`) and `CAL_SEND_4` beside
    `CAL_SLOT_CTA` (`:1147`). The calendar's `cta` row (`:1565`) is now *Button*,
    `in: [0, 3]`, with a hint naming both seats and the layout-4 seed. The bio's `cta2` row
    (`:1403`) is *Listen link*, `d: 'Listen'`, `in: [3]`. The form's `messageLabel` row
    (`:1707`) sits after `message`. The header `cta2` comment now points at the bio's field.
  - `sectionVm`: `vm.calWizard.send` is `cased(String(cv('cta', CAL_SEND_4)).trim() ||
    CAL_SEND_4)` (`EncoreBuilder.jsx:1293`). No `d` gate is needed, because only design 3
    reads the wizard. `vm.calCta` is untouched, so layout 1's emptied label behaves as before.
    `vm.formMsgLabel = String(cv('messageLabel', FORM_MSG_LABEL)).trim() || FORM_MSG_LABEL`
    (`:1701`), and `formMailto` already read it. The bio needed nothing, since `vm.cta2` was
    already `cv('cta2', 'Listen')` on its own content.
  - `EditPanel`: one chain arm, `f.k === 'cta' && sec.cat === 'calendar' && design === 3 ?
    CAL_SEND_4` (`:3663`), beside the form's `button` arm.
  - `EncoreSection`: the bio's two `ListenLink` sites sit behind `s.cta2 &&` (`:5190` block,
    `:5398` Retro's body), the `s.since` test beside them. The rest is comments: the foot pill's
    (`~:16880`), the form's literal list (`~:24812`), Retro's bio meta row and its prose comment,
    which now reads "`para1` behind a lead clause naming the mock artist" (JP-081's reply).
  - `reach.mjs`: `bio.cta2` and `form.messageLabel` rows, and a note on `calendar.cta`.
- **A consequence, FORM_BTN_4's rule.** Only the absent key seeds per layout. A label typed at
  layout 1 follows the artist to layout 4's Send Enquiry, and the reverse.
- **Left as they are.** `calNoMailHint` and both `email` hints still say "Send Enquiry". They name
  the seed, as `FIELDS.form.button`'s hint names "Check Availability". The header's five
  `ListenLink` sites are untouched. `message`'s hint ("Layouts 1 and 4.") still holds, so it
  was not touched. The bio's `s.cta2 &&` drops `''` but not a whitespace-only label, which
  would still print a bare `↗`. That is every other drop-when-emptied field's test (`since`,
  `heroCta`, `credit`, the bio's `cta`). Only the two fields that fall back to a seed trim.
- **The harness was proved first.** A HEAD worktree on :5174 against the tree on :5173:
  calendar, bio and form × themes 0–4 × 4 layouts × 3 widths gave **0 of 180 per surface**.
  **After-diff, named before the code: zero.** Measured: **0 of 180 per surface.**
- **Reach** (a filtered throwaway copy, themes 0–4): `calendar.cta` reaches layouts 1 and 4,
  `bio.cta2` layout 4, and `form.messageLabel` layouts 1 and 4. That holds on all five templates,
  6 of 6 renders each. The canvas moves at layout 4 too: the foot pill prints `W.send` as a span.
  So each `in` stands as written.
- **States** (a throwaway harness probe, `live=1` unless noted, themes 0–4 × 3 widths): **315 of
  315 pass.**
  - `{"cta":"Enquire now"}` at `arch 3`: the foot pill reads it, and so do both pills after
    two trusted *Next Step* clicks. The href is byte-identical to the seed's. At `arch 0`,
    layout 1's pill reads it.
  - `{"cta":""}` live and `{"cta":"  "}` on the canvas both print "Send Enquiry".
  - `{"cta2":"Hear the set"}`: one `<a href="#media">` reading `Hear the set ↗`. With
    `&nav=1`, a page with no media section, it is a `<span>`. `{"cta2":""}` leaves no `↗` in
    the section on either surface.
  - `messageLabel`: a marker prints over the box at `arch 0` and `arch 3`, and `""` or `"  "`
    prints "Message". With a message typed, the submit's href ends
    `%0D%0A<label>%3A%0D%0AHi%20there`, and an emptied label sends `Message%3A`.
    - The plan's `%0D%0A%0D%0A` assumed filled boxes. With none filled, the body opens on
      one `%0D%0A`, and HEAD does the same.
- **The tester's steps, in the real app** (a one-off puppeteer script, trusted clicks and keys,
  deleted after), on Grunge's, Lime's and Retro's card 4 and Retro's card 1:
  - At card 4 the panels read *Button* "Send Enquiry", *Listen link* "Listen" and *Message
    label* "Message", none marked "Not shown in this layout".
  - At card 1, *Button* reads "Check a date" and *Message label* "Message", both unmarked.
    *Listen link* is marked "Not shown in this layout", which is right: layout 1's bio has no
    Listen.
  - Typed "Enquire now", "Hear the set" and "Your note", then Publish → Open. At 1440, 768 and
    390 the calendar's pill, the bio's `Hear the set ↗` and the form's `Your note` all printed.
  - A trusted click on Listen scrolled to `media`.
  - The form's mailto ended `Your%20note%3A%0D%0AHi%20there`.
  - At card 4, two trusted *Next Step* clicks showed both pills reading "Enquire now" on
    `mailto:bookings@kaimercer.co.uk`.
  - Card 1's layout-1 pill printed "Enquire now".
  - No page errors on any run. The wizard was walked once per popup, so JP-076's *Start again*
    trap did not arise.
- **Docs**: CLAUDE.md's `s.live` list (the bio's Listen is worded by its own `cta2`), its wizard
  passage (`cta` is the submit's label now, not "not at all") and its guarded-row passage (the
  message label's rule), README's wizard passage, and the comments above.

Reply: **JP-082 (controls) — fixed, all three.**
- **Send Enquiry.** The Booking Calendar's *Button* now reaches layout 4. On *Stacked* it shows
  "Send Enquiry" and edits both Send Enquiry pills, on the wizard's last step and at the foot of
  the summary. Empty it there and the pills read "Send Enquiry" again, since the wizard has no
  other way to send. Layout 1 still starts from "Check a date". A label you type is yours at
  every layout.
- **Listen ↗.** The Bio has a *Listen link* field (layout 4). It changes the word, and emptying
  it hides the link, arrow and all. On the published page it still scrolls to the Media Player,
  and with no Media Player on the page it is plain text.
- **Message.** The Enquiry Form has a *Message label* field (layouts 1 and 4). It changes the
  label over the message box and the heading over the message in the email you receive. Emptied,
  both read "Message", since the box always stands.
- The seeded page is unchanged. Checked on *Stacked* under Grunge, Lime and Retro, and on Retro's
  layout 1, at 1440, 768 and 390.

---

## JP-083 — "99 Problems" files under "9", and the A–Z rail has no cell for it

**Verdict: confirmed, and shared. The fit's own `#` rule was written down and never coded.**
- Retro's layout-4 pass states the rule twice: `../retro/layout-4.md:913`–`915` ("A title starting
  with a digit or a symbol heads its own `#` group in the list and lights nothing — the rail is a
  fixed A–Z that no content can extend"), and the comment at `EncoreBuilder.jsx:1118`–`1121`.
- The code at `:1128` is `(sg.title.normalize('NFD').charAt(0) || '#').toUpperCase()`. Only an
  **empty** title reaches `#`; everything else files under its own first character.
- **A second symptom follows.** `at` falls back to `groups[0].letter` (`EncoreSection.jsx:12270`), so
  whenever the list opens on a non-letter group the rail lights **no cell**. The tester's shot shows
  exactly this.
- **Every template.** The grouping is in `sectionVm`, and the rail is drawn twice from the same
  literal: in the Lime / Grunge block and in Retro's body (Retro, Editorial and Pop).

**Evidence** (triage 2026-09-29, `65dd1bc`).
- `EncoreBuilder.jsx:1008`–`1015`: `vm.songs`, titles trimmed. `:1114`–`1133`: `byLetter`, sorted
  by `localeCompare(…, { sensitivity: 'base' })` and grouped at `:1128`. `vm.repGroups` is read by
  repertoire `s.v3` alone.
- `EncoreSection.jsx`: `alpha` / `anchors` at `:10650`–`10651`; `letters` / `at` / `jump` at
  `:12266`–`12274`. The block at `:12342`: `railCell` at `:12352`, the literal
  `'ABCDEFGHIJKLMNOPQRSTUVWXYZ'` at `:12384`, the group ref at `:12393`. Retro's body: `railCell` at
  `:12457`, the literal at `:12506`, the ref at `:12527`.
- **Probed** (`&cj=` songs `99 Problems`, `'Til Tuesday`, `(I Can't Get No) Satisfaction`,
  `Éclair`, `eleanor rigby`, `Valerie`, `Щедрик` and one untitled row; themes 2, 0 and 3; canvas and
  `live=1`): the groups come out `#` (the untitled row), `'`, `(`, `9`, `E`, `V`, `Щ`. The rail has 26
  cells, handlers on E and V alone, and no cell lit on the canvas. The accent fold already works:
  `Éclair` and lower-case `eleanor` share E.
- Frames: every layout-4 rail is a fixed 26 cells, 32 × 32 at gap 8 (Grunge `964:73011` / `971:8128`
  / `977:12355`, Lime `964:72916` / `971:5604` / `977:9178`, Retro `964:72822` / `964:78509` /
  `977:8166`).
- **No seeded song starts with anything but a Latin capital** (`SONGS`, `data.js:773`–`786`).

**Decision.**
1. **What files under `#`.**
   - **(a) (recommended).** A title whose first letter or digit, after NFD, is not A–Z: digits,
     non-Latin scripts, and an empty title. **Leading punctuation is skipped**, so `'Til Tuesday`
     files under T and `(I Can't Get No) Satisfaction` under I. The sort takes
     `ignorePunctuation: true`, so that the list agrees with the grouping (the accent fold's own
     argument). On the seed it reorders nothing: `Dancing Queen` still sorts before `Don't Stop Me
     Now`.
   - **(b)** The fit's rule verbatim: any non-A–Z first character, punctuation included, files under
     `#`.
2. **The rail.**
   - **A (recommended). A `#` cell ahead of A, drawn only while a `#` group exists**, with the other
     cells' handler rule; it is the lit seat when the `#` group leads the list. The cell list is built
     in `sectionVm` as `vm.repRail`, so `EncoreSection` composes nothing and both rails read it. At 27
     cells no width gains a row: desktop's six a row goes 6·6·6·6·2 → 6·6·6·6·3, 768's fifteen a row
     15 + 11 → 15 + 12, 390's seven a row 7·7·7·5 → 7·7·7·6. Every letter shifts one seat right.
   - **B. The `#` group alone, no cell** (the fit's "lights nothing"). `at` must then skip `#` to the
     first letter group, or the mark still vanishes.
   - **C. Always 27 cells.** It moves the seed (30 files) and draws a cell no frame does. Not
     recommended.
- **Named either way:** the frames' rail is Latin, so a Cyrillic repertoire files entirely under `#`.
  A question for the PO or the designer, not this ticket.

**Fix (A, (a)).** In `sectionVm`, the letter is the first `\p{L}|\p{N}` character of the NFD'd title
when it is A–Z, and `#` otherwise; the sort adds `ignorePunctuation: true`; `vm.repRail =
[...(has('#') ? ['#'] : []), ...'A…Z']`. Both rails map `s.repRail` in place of the literal. The `at`
fallback is unchanged, since `#` is now a cell.

**Expected after-diff (named before the code): zero.** No seeded title reaches `#`, and none carries
punctuation that `ignorePunctuation` could reorder.

**Verify.**
- **The seed.** Digest repertoire × themes 0–4 × 3 widths × both surfaces: 0 files.
- **States** (`&cj=` over the probe list above, canvas and `live=1`, themes 0–4, three widths): the
  groups are `#`, E, I, T, V, with Щ inside `#`; the rail has 27 cells with `#` first; on the canvas
  `#` is lit; live, `#` scrolls to its group; the rows per width are unchanged (5 / 2 / 4). With the
  digit and Cyrillic songs deleted the rail is 26 again; with the untitled row alone, `#` still stands.
- **The tester's steps**, in the real app on Grunge card 4: add `99 Problems`, Publish → Open at
  1440 / 768 / 390. `#` leads the list and the rail, and the `#` cell jumps. Then Lime's card 4, then
  Retro's.

**Docs.** The comment at `EncoreBuilder.jsx:1114`–`1124` (now true, plus the punctuation clause). The
rail comments ("all twenty-six" at `EncoreSection.jsx:12166` and `:12200`–`12203`, the wrap note at
`:12485`–`12489`). CLAUDE.md's A–Z rail sentences (`:299`–`301`). A pointer at `../retro/layout-4.md:913`.

**Decided** (2026-09-29, user call): **(a), A.** A title files under the first letter or digit
of its NFD form when that is A–Z, and under `#` otherwise (digits, non-Latin scripts, an empty
title); leading punctuation is skipped, and the sort takes `ignorePunctuation: true`. The rail
draws a `#` cell ahead of A only while a `#` group exists, built in `sectionVm` as `vm.repRail`
and mapped by both rails.

**Settled** (2026-09-29). The drift the hand-off named held at the start (`vm.songs` `:1008`,
`byLetter` `:1125`, the two literals `:12392` and `:12514`).
- **The fix.**
  - `sectionVm` (`EncoreBuilder.jsx:1114`–`1147`): the letter is the first `[\p{L}\p{N}]` of the
    NFD'd title, upper-cased, kept when it is A–Z and `#` otherwise. The sort adds
    `ignorePunctuation: true`. `vm.repRail` is `['#']` while a `#` group exists, then A–Z.
  - **One thing the entry did not spell out: the groups take the rail's order**, `#` first and
    then A–Z, and not the order the sorted songs first reach them. Two titles broke the old
    order. A Cyrillic title collates after Z, so a `#` holding only `Щедрик` would have been
    listed last while its cell led the rail, and the `at` fallback would have lit another
    letter. And `ignorePunctuation` does not skip a *symbol*: `★Star` and `$ale` sort ahead of
    `Apple` while they file under S and A. Inside a group the songs keep the sort's order, so
    `★Star` still sorts ahead of `Sale` in S. On a Latin, unpunctuated list both orders agree,
    which is why the seed does not move.
  - `EncoreSection`: both rails map `s.repRail` in place of the literal (`:12397` the Lime /
    Grunge block, `:12520` Retro's body). `letters`, `at`, `jump` and the anchors needed nothing:
    `#` is a group letter like any other. Comments: the design's head, the rail-jumps paragraph,
    the mark paragraph, and the wrap note (27 cells gain no row).
- **The harness was proved first.** A HEAD worktree on :5174 against the tree on :5173:
  repertoire × themes 0–4 × 4 layouts × 3 widths gave **0 of 60 per surface**.
  **After-diff, named before the code: zero.** Measured: **0 of 60 per surface**, and again after
  the group order. A node check
  of the seed titles under both sort options gave the same order.
- **States** (a throwaway harness probe, themes 0–4 × 3 widths × canvas and `live=1`; every
  line identical across the five themes):
  - The probe list (the untitled row given an artist, or `blankRow` drops it): groups
    `#` (the untitled row, `99 Problems`, `Щедрик`), E (`Éclair`, `eleanor rigby`), I, T, V.
    27 cells, `#` first and lit on both surfaces. Rows 6·6·6·6·3 / 15·12 / 7·7·7·6. Live, the
    handlers are `#EITV`, and none on the canvas.
  - Digit, Cyrillic and untitled rows deleted: 26 cells, E lit, rows 6·6·6·6·2 / 15·11 /
    7·7·7·5, as before.
  - The untitled row and `Valerie` alone: `#` stands and is lit.
  - `Valerie`, `Щедрик`, `Dancing Queen`: `#` (`Щедрик`) leads the list, then D and V, and `#` is
    lit. `$ale`, `Apple`, `Sale`, `★Star`, `Zed` (themes 0–2, desktop): A (`$ale`, `Apple`),
    S (`★Star`, `Sale`), Z, with A lit. Both are the rail order above.
  - The jump, at a 200px viewport so it can be seen: a trusted click on `#` from lower on the
    page brings the `#` group to top 0 at all 15 renders. V, the control, does the same at
    desktop and 768; at 390 it stops at 29–33 because the page ends.
- **The tester's steps, in the real app** (a one-off puppeteer script, trusted clicks and keys,
  deleted after), on Grunge's, Lime's and Retro's card 4: *Back to page list* → Repertoire →
  *Add song* → typed `99 Problems`. The canvas rail read `#ABC…Z` with `#` lit. Publish → Open.
  At 1440, 768 and 390 the list opened `#: 99 Problems`, then C and D, the rail had 27 cells
  with `#` lit, and the rows were 6·6·6·6·3 / 15·12 / 7·7·7·6. A trusted click on `#` from the
  foot of the page brought its group to top 0. No page errors.
- **Named, not fixed** (as the entry said): the frames' rail is Latin, so a Cyrillic repertoire
  files entirely under `#`.
- **Docs**: the `sectionVm` comment (the fit's rule, now coded, with the punctuation clause and
  the pin), the rail comments above, CLAUDE.md's A–Z rail sentence (the `#` clause), and a
  pointer at `../retro/layout-4.md:913`.

Reply: **JP-083 — fixed.**
- A song whose title starts with a digit, like "99 Problems", now files under **#** instead of
  "9". So does a title in a non-Latin script, and a song with no title yet.
- Leading punctuation is skipped. "'Til Tuesday" files under T, and "(I Can't Get No)
  Satisfaction" under I. The list sorts the same way.
- The A–Z index gets a **#** button ahead of A whenever a # group exists. It is lit when the # group
  leads the list, and on the published page it jumps to that group. With no such song, the index
  is the design's 26 letters, as before.
- The seeded page is unchanged. Checked on *Stacked* under Grunge, Lime and Retro at 1440, 768 and
  390.

---

## JP-084 — a long track title's ellipsis runs into the previous-track button

**Verdict: confirmed, and in both halves.** The now-playing row is `row('0', …)`: a **zero gap**
between the text column (`flex: 1 1 auto; minWidth: 0`) and the transport (`flex: none`), so a
truncating title's ellipsis ends exactly at the prev glyph's box.
- **The seed shows it live.** A visitor who plays track 2, "Manchester at 3am", at 1440 sees it
  truncate against the button on every template: short by 5 px under Retro, 26 Lime, 12 Grunge and
  54 Pop (Pop also by 12 at 768). The canvas and the published first paint cue "Late Lights", which
  fits.
- **Every template:** the Lime / Grunge block (`EncoreSection.jsx:7686`) and Retro's body (`:7996`,
  Retro, Editorial and Pop).

**Evidence** (triage 2026-09-29, `65dd1bc`).
- The block `if (s.v3 && (s.lime || s.grunge))` at `:7631`: `nowPlaying` at `:7685`–`7712`. `skip()`
  at `:7659`–`7664` pads its hit target 11 / 7 and takes the padding back in its margin, so the target
  overlaps the title's last 5.7 px at desktop and 7 narrow (measured): live, a click on the ellipsis
  steps back a track.
- Retro's body at `:7916`: `nowPlaying` at `:7995`–`8031`, lucide `SkipBack` at `:8014`, and the
  comment on the truncation at `:7997`–`8000`.
- **Measured** with the title `Late Lights (Extended Club Mix) feat. Somebody`, canvas px, the same on
  both surfaces, and the same under Editorial as under Retro:

  | | 1440 | 768 | 390 |
  |---|---|---|---|
  | title box right → prev glyph box left | 0 | 0 | 0 |
  | → the prev glyph's *ink*, Lime / Grunge (`LimeSkip`) | 1.7 | 2.1 | 2.1 |
  | → the prev glyph's *ink*, Retro / Editorial / Pop (lucide's viewBox margin) | 3.1 | 3.8 | 3.8 |

- **Seeded titles cued first** (px to spare after the ink):

  | | Retro 1440 | Lime 1440 | Grunge 1440 | Pop 1440 | Pop 768 |
  |---|---|---|---|---|---|
  | Late Lights | 64 | 55 | 67 | 34 | — |
  | Echo & The Floor | 7 | **1** | 17 | **−36** | 6 |
  | Manchester at 3am | **−5** | **−26** | **−12** | **−54** | **−12** |

  Every seeded title fits at 768 and 390 but Pop's "Manchester at 3am" at 768.
- **Frames.** `Frame 24` (`I964:72959;692:4062` / `I971:7955;868:9787` / `I977:12182;888:10507`;
  Lime's `I964:72864;692:4011` … and Retro's `I964:72526;1:7146` … are identical) is `SPACE_BETWEEN`
  with `itemSpacing` 0; the text column HUGs (119 for "Night Rain" at 1440, 93 at 768 and 390); the
  transport HUGs at 108.1 (16 · 14 · 48 · 14 · 16). So **the frame states no minimum gap**, and its own
  title leaves 81 of 308 and 158 of 370. Its text is `textAutoResize: HEIGHT`, `textTruncation:
  DISABLED`: the frame never truncates, and the ellipsis is the fit's own reading.

**Decision** (a real call: the two options trade a truncation for a reflow).
- **A (recommended). A gap equal to the transport's own 14, and the title wraps to two lines, then
  clamps** (`-webkit-line-clamp: 2`): the frame's `HEIGHT` reading. The gap is `u(14)` (11.5 at
  desktop, 14 narrow), in both halves, and the Lime / Grunge hit padding then no longer overlaps the
  title. Every seeded title shows whole at every width, including the "Manchester at 3am" that
  truncates live today. Cost: the block grows a line when a title wraps. At 1440 and 768 the sleeve
  (`flex: 1 0 0`) gives the line back; **at 390 the column grows, so the page below moves when a
  visitor changes to a track whose title wraps.** Measure that shift in the session and name it.
- **B. The gap alone, one line and its ellipsis.** It fixes the touch and nothing else, and it worsens
  the truncation the frame does not have: two seeded titles that fit today truncate live at desktop,
  "Echo & The Floor" under Retro (7 → −4.5) and Lime (1 → −10.5); Grunge keeps 5.5.
- **C. Reply.** Not recommended: the seed reproduces it live.

**Fix (A).** `row(u(14), …)` in place of `row('0', …)` at `:7686` and `:7996`. The title span trades
its one-line clip (`whiteSpace: 'nowrap'` and the ellipsis) for a two-line clamp (`display:
'-webkit-box'`, `WebkitBoxOrient: 'vertical'`, `WebkitLineClamp: 2`, `overflow: 'hidden'`,
`overflowWrap: 'anywhere'` for a single long word), in both halves; the row centres the transport
against the column as it does today. The sub line keeps its one-line clip.

**Expected after-diff (named before the code).** **A: 30 files**, media `arch 3` × themes 0–4 × 3
widths × both surfaces: the text column and its two spans narrow by 11.5 at desktop and 14 at 768 and
390, and the title's style changes. No seeded first track wraps (34 − 11.5 px spare at worst), so no
height moves on the seed; no glyph, disc or bar moves. **B: the same 30, widths only.**

**Verify.**
- **The seed.** Digest media × themes 0–4 × 3 × 2: exactly the 30, widths only. Read the column's
  `getBoundingClientRect().right` plus the gap against the prev glyph's left.
- **States** (`&cj=` tracks, the long title and each seeded title cued first, themes 0–4, three widths,
  both surfaces): the gap is 11.5 / 14 everywhere; under Lime and Grunge the skip's padded box no longer
  meets the title's; `scrollWidth` equals the width at 390. Under A: a two-line title stays centred
  against the transport, three lines clamp to two with the ellipsis clear of the gap, and the 390
  shift on changing to a wrapping track is measured (`live=1`, the section's height before and after
  `›`).
- **The tester's steps**, in the real app on Grunge card 4: track 1's title = `Late Lights (Extended
  Club Mix)`, Publish → Open at 1440 / 768 / 390; then play the seeded track 2 at 1440 in the tab.
  Then Lime's card 4, then Retro's.

**Docs.** The comment at `EncoreSection.jsx:7997`–`8000` (a gap now separates the title from the
transport) and the block's matching line. CLAUDE.md names nothing here (checked). Layouts 1–3's
transports were not measured; a line in the sweep if one shows the same.

**Decided** (2026-09-29, user call): **A.** A gap of the transport's own 14 (`u(14)`: 11.5 at
desktop, 14 narrow) between the text column and the transport, in both halves, and the title wraps
to two lines and then clamps (`-webkit-line-clamp: 2`, `overflowWrap: 'anywhere'`), the frame's
`textAutoResize: HEIGHT` reading. The sub line keeps its one-line clip. At 390 the column grows when
a visitor changes to a wrapping track; the shift is measured and named below.

**Settled** (2026-09-29). The drift the hand-off named held (the block `:7639`, `skip()` `:7667`,
its `nowPlaying` `:7693`; Retro's body `:7924`, `nowPlaying` `:8003`).
- **The fix.** Both rows are `row(u(14), …)` (11.5 at desktop, 14 narrow). In the Lime / Grunge
  block the title spreads a new `clamp2` (`display: '-webkit-box'`, `WebkitBoxOrient: 'vertical'`,
  `WebkitLineClamp: 2`, `overflow: 'hidden'`, `overflowWrap: 'anywhere'`) in place of `clip`, which
  the sub line keeps; Retro's body writes the same five inline in place of its one-line clip. The
  computed `-webkit-line-clamp` reads `2`. Comments: Retro's truncation comment is rewritten (the
  gap, the wrap, the clamp, and where the page grows), and the block's `nowPlaying` gains a line
  pointing at it.
- **The harness was proved first.** A HEAD worktree on :5174 against the tree: media × themes 0–4
  × 4 layouts × 3 widths gave **0 of 60 per surface**.
- **After-diff, named before the code: 30 files. Measured: exactly those 30** (media `arch 3` ×
  themes 0–4 × 3 widths, 15 per surface), each **three rows**: the text column and its two spans,
  and only their width, −11.5 at desktop and −14 at 768 and 390. No height, glyph, disc or bar
  moved. The digest records no `display`, `white-space` or line clamp, so the clamp is proved by the
  states below, not by the digest.
- **States** (a throwaway harness probe, themes 0–4 × 3 widths × canvas and `live=1`; the two
  surfaces measured identically). The titles cued first were the long `Late Lights (Extended Club
  Mix) feat. Somebody`, `Manchester at 3am (Extended)`, a 40-letter single word, and each seeded
  title.
  - **Gap** (the column's right to the transport's left) is 11.5 / 14 / 14 in every case. The prev
    glyph's box is the same distance away on every template, since `LimeSkip` and lucide both start
    their box at the transport's edge.
  - **The skip's padded hit box, Lime and Grunge**, now starts **5.8 / 7 / 7 clear** of the title,
    where it overlapped by 5.7 / 7. A click on the title's last glyphs no longer steps back.
  - **The clamp.** The long title and the single word take exactly two lines everywhere, clamped at
    1440 and 768 on every template. At 390 they are whole under Retro, Lime and Grunge, and
    clamped under Editorial and Pop. The title's box
    ends at the column's right edge in every case, so the ellipsis stays clear of the gap. The
    transport's centre sits on the column's centre (Δ 0) at one line and at two.
  - **The seed.** `Echo & The Floor` wraps to two lines at 1440 under Retro, Lime and Pop (Pop at
    768 too), and `Manchester at 3am` at 1440 on every template but Editorial (Pop at 768 too). Both
    now **show whole**, where they truncated. Every seeded title is one line at 390.
  - **`scrollWidth`** equals the width in every case.
  - Editorial's and Lime's one-line titles read `scrollHeight > clientHeight` at some widths. That
    is the display face's ink running past its 1.1 line box (Noto under Editorial, Bebas under
    Lime), under the
    same `overflow: hidden` the old one-line clip had, so nothing new is clipped.
- **Where the page grows.** This is measured `live=1`, as the section's height before and after
  `›`. The rule the entry predicted holds wherever the tile grid is at least as tall as the column.
  - **The seed: 0 at every width, on every template**, `›` to `Manchester at 3am` included. At
    1440 and 768 the sleeve's `flex: 1 0 0` gives the second line back, and no seeded title wraps
    at 390.
  - **At 390, a wrapping title grows the section.** It grows by 14.6 under Retro, Editorial and
    Pop, and by 30.8 under Lime and Grunge. It is one title line less the slack the 48 disc
    leaves beside a one-line column, since the row was the disc's height. The page below moves by
    that much when a visitor changes to such a track, and back when they leave it.
  - **Named, not in the entry: a short list moves the wide widths too.** With three tracks the
    grid is shorter than the column, so the sleeve sits at its floor and cannot give the line
    back. There, `›` to a wrapping title grows the section by 21 (Retro, Editorial, Pop) or 32.4
    (Lime, Grunge) at 1440, and by 14.6 or 30.8 at 768. With the seeded five it is 0.
- **Layouts 1–3 were measured** with the long title (themes 0–4 × 3 widths, `live=1`). Layout 1's
  title ends 25–32 before its nearest glyph, and layout 3's 24.6 / 30 / 30. Layout 2 has no
  transport glyph on the title's line. None shows the same, so there is no sweep line.
- **The tester's steps, in the real app** (a one-off puppeteer script, trusted clicks and typing,
  deleted after), on Grunge's, Lime's and Retro's card 4. The steps: *Back to page list* → Media
  Player → track 1's title typed as `Late Lights (Extended Club Mix)`.
  - The canvas read gap 11.5, two lines, and the hit box 5.8 clear under Grunge and Lime.
  - Publish → Open. At 1440, 768 and 390 the title took two whole lines 14 from the transport, and
    `scrollWidth` equalled the width. At 1440 the 14 is 11.5 under the tab's 1440 / 1180 zoom.
  - At 1440 in the tab, a trusted click on track 2's tile played `Manchester at 3am` (the audio
    unpaused and advanced) and printed it whole on two lines, 14 clear.
  - No page errors.
- **Docs**: the two comments above. CLAUDE.md names nothing here. The designer note in the sweep
  is kept, with our reading beside it.

Reply: **JP-084 — fixed.**
- The Media Player's now-playing title now keeps a gap from the previous-track button. The gap is
  the same as the one between the player's own buttons.
- A long title now wraps onto a second line instead of cutting off early, as the design's text
  does. Only a title longer than two lines ends in "…", and the "…" stays clear of the button.
- So the seeded "Manchester at 3am" and "Echo & The Floor" now show in full at 1440, where they
  were cut off.
- On a phone, changing to a track whose title needs two lines makes the player one line taller. The
  seeded titles all fit on one line there.
- Clicking the end of a long title no longer skips back a track.
- Checked on *Stacked* under Grunge, Lime and Retro at 1440, 768 and 390, and by playing track 2.

---

## JP-080 — the ticker's "Next:", ×, "Jul", and the pins

**Verdict: four parts. Two confirmed, two named fit calls.**
- **"JUL" is confirmed, and shared.** The frame's line is typed "Manchester · JUL 12 · 22:00"
  (`textCase` ORIGINAL on all nine masters). Every other map layout upper-cases the month: layout 1's
  disc, layout 2's meta line (an uppercase span) and layout 3's disc. Layout 4 composes `meta` as one
  string with the month as typed, and its comment ("the frame's own 'JUL 12' is its styling")
  misreads the frame.
- **The dots are confirmed, for Grunge alone.** Grunge's five dots are `#FFFFFF` at .6, which reads
  grey on the dark plate, as the tester's design shot shows. Lime's are `#15180F` at .6 and truly
  vanish (checked on Lime's desktop render), which is why Lime's fit redrew them at full strength.
  Retro's are `#FBF6EA` at .6, and Retro's body already draws them at .6. Grunge inherited Lime's
  redraw, and Grunge's pass named rather than fitted it.
- **"Next:" and × are named fit calls.** Retro layout 4 dropped "Next:" because "on page 3 the gig on
  show is not the next one", and made × the `›` that pairs the frame's `‹`, since "a dismiss with no
  state to dismiss".
- **The red lit pin is the product's pin / row pairing** (CLAUDE.md's map paragraph: "the gig on show
  lights the one it was paired with, by identity"). The canvas lights gig 0's pin by construction.

**Evidence** (triage 2026-09-29, `65dd1bc`).
- **Frames.** All nine masters (Grunge `964:73019` / `971:8136` / `977:12363`, Lime `964:72924` /
  `971:5612` / `977:9186`, Retro `964:72830` / `964:78599` / `977:8322`) read "‹" | "Next: Hidden
  Warehouse" / "Manchester · JUL 12 · 22:00" | "×". Every viewport carries five 8px ellipses at
  opacity .6, their fills bound to the viewport scheme's `sem/text/2` (Grunge `#FFFFFF`, Lime
  `#15180F`, Retro `#FBF6EA`), and no lit dot. The dots are absolute pixels leaked to every width: at
  390 two sit off the 370 viewport, the fit's reason for `vm.pins`.
- **`meta`**: `EncoreBuilder.jsx:1474`–`1483`, the month as typed, the comment at `:1480`. The seeded
  months are "Jul" / "Aug" (`data.js:803`–`809`).
- **The other layouts' months**: `EncoreSection.jsx:17455` (layout 1's disc, `textTransform:
  'uppercase'`), `:17890` and `:18310` (layout 2's meta line), `:18921` and `:19289` (layout 3's disc).
- **The ticker**: the block at `:20069`–`20085` (venue `:20080`, `meta` `:20081`, `›` `:20083`);
  Retro's body at `:20290`–`20306` (venue `:20302`, `›` `:20305`). The fit's calls at `:19697`–`19699`
  (×) and `:19712`–`19716` ("Next:"). `pg` is 0 on the canvas (`:19801`).
- **The pins**: the block at `:19950`–`19961` (idle `s.tx` at full strength, 8 × 0.82; lit `s.ac` at
  14 in a 2px `G.vpInk` ring); Retro's body at `:20157`–`20168` (`plateFg` at .6, already the
  frame's). The redraw was Lime's (`../lime/layout-4.md:1127`–`1131`, and the block's comment at
  `EncoreSection.jsx:19853`–`19856`) and named for Grunge at `./layout-4.md:1122`–`1124`.
- **Found, not reported**: CLAUDE.md says the ticker "is **not drawn at one gig**", but the code
  (`:20069`, `!!gig`) draws it at one gig without arrows, as Lime's Settled records ("`n=1` draws the
  ticker with no arrows"). The doc is wrong, not the code.

**Decision** (one `AskUserQuestion`).
1. **"Next:"**
   - **A (recommended). On the ticker's first gig alone** (`pg === 0`), a literal (a label, JP-071's
     rule). The canvas and the published first paint then read the frame's "Next: Hidden Warehouse",
     and paging on drops it. It assumes the list runs in date order, the assumption the "upcoming"
     wording and layout 1's list already make; a gig has no year (JP-047).
   - **B. Reply**: the fit's call.
2. **The lit pin.**
   - **A (recommended). Keep it, and reply.** It is the product's pairing at every map layout,
     documented, and the only thing on the map that follows the ticker.
   - **B. Unlit on the canvas, lit live.** The canvas becomes the frame's picture, but the published
     first paint stops matching the canvas: a named canvas / live diff (JP-063 A′'s shape).
   - **C. No lit pin at layout 4.** It drops the pairing; CLAUDE.md's paragraph is rewritten.
3. **×** is a reply, with no question: the fit's call, with its reason.

**Fix (no decision, either way).**
- `meta` upper-cases the month where it is composed (`String(g?.month ?? '').trim().toUpperCase()`),
  the other layouts' CSS rule applied to one string. The `:1480` comment is corrected.
- Grunge's idle dots take the frame's .6 through a `G` key (`dotOp: 0.6` under Grunge, `1` under
  Lime), still `s.tx`. Lime's redraw stands.

**Fix (1A).** Both halves print ``pg === 0 ? `Next: ${gig.venue}` : gig.venue`` in the venue span,
which already clips.

**Expected after-diff (named before the code; 1A, 2A): 30 files.** Map `arch 3` × themes 0–4 × 3
widths × both surfaces. In every file the meta line ("Jul 12" → "JUL 12") and the venue line ("Next: "
prefixed); in Grunge's six, also the four idle dots' opacity. 2B and 2C add no files (2B's 15 canvas
files lose the lit pin inside the same 30).

**Verify.**
- **The seed.** Digest map × themes 0–4 × 3 × 2: exactly the 30, and the ticker's two lines read with
  `textContent`.
- **Live** (`live=1&n=8`, three widths, themes 0–4; `&n=`'s generated gigs drop the time on every
  fourth row and always carry a month, so the month cases go through `&cj=`): `›` drops "Next:" and
  moves the lit pin; `‹` wraps to gig 0 and "Next:" returns; the fourth gig reads "Manchester · JUL 10"
  with no stray separator; `&cj=` gigs with no month ("city · day · time") and a month typed "july"
  ("JULY"); a long venue still ellipsises at 390 with the prefix;
  Grunge's idle dots compute to opacity .6, and Lime's to 1.
- **The tester's steps**, in the real app on Grunge card 4: Publish → Open at 1440 / 768 / 390. The
  ticker reads "Next: Hidden Warehouse" / "Manchester · JUL 12 · 22:00" and the dots read grey. Then
  Lime's card 4, and Retro's card 4 once.

**Docs.** The comments at `EncoreSection.jsx:19697`–`19716`, `:19853`–`19856` and
`EncoreBuilder.jsx:1474`–`1480`. A pointer at `./layout-4.md:1122`–`1124` (the dots). CLAUDE.md's
"not drawn at one gig", corrected whatever is decided; its map paragraph only on 2B or 2C.

**Decided** (2026-09-29, user call): **1 A, 2 A.** "Next: " is a literal label on the ticker's
first gig alone (`pg === 0`), in both halves, so the canvas and the published first paint read the
frame's "Next: Hidden Warehouse" and paging on drops it; it assumes the list runs in date order. The
lit pin stays, the product's pin / row pairing, and is a reply. × is a reply with no question. The
no-decision fixes land with it: `meta` upper-cases the month, and Grunge's idle dots take the
frame's .6 through a `G` key, Lime's redraw standing.

**Settled** (2026-09-29). The drift the hand-off named held (`meta` `EncoreBuilder.jsx:1508`; the
map's `if (s.v3)` `EncoreSection.jsx:19747`, `pg` `:19831`, the block's pins `:19980`, its ticker
`:20099`, Retro's pins `:20187` and ticker `:20320`).
- **The fix.** `meta` composes `String(g?.month ?? '').trim().toUpperCase()`, and its comment now
  says why the month is cased there (the frame types "JUL"; one composed string cannot take the
  other layouts' CSS for its month alone). The branch computes `venue` once beside `pg`: ``pg === 0
  && gig.venue ? `Next: ${gig.venue}` : gig.venue``, read by both halves' venue spans, which already
  clip. An emptied venue on gig 0 prints nothing rather than a bare "Next:" (not in the entry). The
  block's `G` gains `dotOp` (0.6 under Grunge, 1 under Lime) on the idle dots' `opacity`, the lit
  pin at 1. Comments: the branch header (the "Next:" rule and its date-order assumption, and that
  the ticker stands without arrows at one gig), the block's pin paragraph and its Grunge list.
- **The harness was proved first.** A HEAD worktree on :5174 against the tree: map × themes 0–4
  × 4 layouts × 3 widths gave **0 of 60 per surface**.
- **After-diff, named before the code: 30 files. Measured: exactly those 30** (map `arch 3` ×
  themes 0–4 × 3 widths, 15 per surface). Each moves **two rows**, the ticker's two lines' text
  ("Hidden Warehouse" → "Next: Hidden Warehouse", "Manchester · Jul 12 · 22:00" → "Manchester ·
  JUL 12 · 22:00"), with no geometry. Grunge's six also move **four rows**, the idle dots' opacity
  1 → 0.6. Only layout 4 reads `gigs[].meta`, so no other layout or category can move.
- **States** (a throwaway harness probe, themes 0–4 × 3 widths; the `&cj=` cases on both
  surfaces). Every case read the same on all five themes.
  - `live=1&n=8`: the first paint reads "Next: Venue number 1" and lights pin 0. `›` reads "Venue
    number 2" and lights pin 1. `‹` returns to "Next: …" and pin 0. `‹` from gig 0 wraps to "Venue
    number 8" ("Leeds · AUG 18", no stray separator) and pin 2. `›` from there wraps back to
    "Next:". The fourth gig reads "Venue number 4" / "Manchester · JUL 10".
  - A gig with no month reads "Manchester · 14 · 20:00", and a month typed "july" reads "JULY".
  - A 51-character venue carries the prefix and ellipsises at 390 (`scrollWidth` 396 / 376 against
    278–298, `text-overflow: ellipsis`). It fits at 1440 and 768.
  - At one gig the ticker stands with no arrows, which confirms CLAUDE.md's correction.
  - The idle dots compute to opacity .6 under Grunge, Retro, Editorial and Pop, and 1 under Lime.
- **The tester's steps, in the real app** (a one-off puppeteer script, trusted clicks, deleted
  after), on Grunge's, Lime's and Retro's card 4.
  - The canvas and the published tab read "Next: Hidden Warehouse" / "Manchester · JUL 12 · 22:00"
    at 1440, 768 and 390.
  - A trusted `›` read "The Deaf Institute" / "Manchester · JUL 25 · 21:00" and lit pin 1, and `‹`
    brought "Next:" and pin 0 back.
  - Grunge's idle dots are `rgb(255, 255, 255)` at .6 and read grey on the 1440 shot. Lime's are
    `rgb(242, 255, 208)` at 1, and Retro's `rgb(251, 246, 234)` at .6.
  - No horizontal scroll and no page errors.
- **Docs**: the comments above; a closed pointer at `./layout-4.md`'s idle-dots line; CLAUDE.md's
  "not drawn at one gig" corrected (it stands without its arrows). The map paragraph is otherwise
  unchanged, since the pin stays.

Reply: **JP-080 — fixed in part; the rest by design.**
- **"JUL"**: fixed. The ticker's month is now upper-case, as in the design and as every other map
  layout prints it. A month typed "july" prints "JULY".
- **"Next:"**: fixed. The ticker's first gig reads "Next: Hidden Warehouse", as in the design. It
  assumes the gigs are listed in date order. Paging to a later gig drops the word, since that gig
  is not the next one.
- **The grey dots**: fixed on Grunge. The map's dots are now the design's white at 60%, which reads
  grey. Lime keeps its full-strength dots, because its design's dots are dark and vanish on the map.
- **The red pin**: by design. It marks the gig the ticker is showing and moves with the arrows. It
  is the same pin / gig pairing every Events Map layout has.
- **× on the right**: by design. There is nothing for the ticker to close, so that seat holds the
  › that pairs with the design's own ‹ and steps to the next gig.
- Checked on *Stacked* under Grunge, Lime and Retro at 1440, 768 and 390, paging with the arrows.

---

## JP-077 · JP-078 · JP-082 (map) — the stat wall: its copy, its empty cards, its names

**Verdict: all three confirmed. The wall is a named fit call whose reasoning has since been reversed
once (JP-065).** Retro layout 4 made the four frame cards two derivations and two fields (open
question 6, settled on `0cbf413`), and Lime and Grunge took that whole:
- *CITIES* is a count of the gig list's distinct cities.
- *GIGS YTD* is `s.gigs.length`; "YTD" and "played this year" were dropped as claims about the clock.
- *RADIUS* over `s.mapRadius` became **COVERAGE**, because "Radius / 12 mile radius" stutters.
- *BASE* over `s.mapBase` ("Based in Manchester") lost its label outright, and its sub with it.

So **JP-077** is the named diff; **JP-078** is a real gap — each leaf drops when empty but the card
never does, and card 1's label is a literal, so an emptied `radius` leaves "COVERAGE" over the sub and
an emptied `base` an empty ringed box; and **JP-082 (map)** is the four card names, all literals. (The
eyebrow "Travel & reach" is the replies entry's: it stays a literal, decided there.) **Every template**: the `stats` array sits above
the seam and both halves render it — Lime and Grunge in the block, Retro in the body with its own
seats, Editorial and Pop in the body's flat seats.

**Evidence** (triage 2026-09-29, `65dd1bc`).
- **Frames: all nine agree, word for word** (the ids in JP-080). Every visible text node,
  `textCase` ORIGINAL: "TRAVEL & REACH" | "LIVE · LAST 12 MONTHS"; "RADIUS" "120" "miles ·
  standard"; "CITIES" "21" "played in"; "GIGS YTD" "48" "played this year"; "BASE" "Manchester, UK"
  "further on request". No theme gate is needed.
- **The fit's reasoning**: the branch header at `EncoreSection.jsx:19672`–`19686` ("Do not 'fix' one
  to match the other"); `../retro/layout-4.md:1420`–`1438`, open question 6 ("*RADIUS 120* itself was
  never a candidate: our field is a phrase, not a numeral with a unit under it"); named again in
  `../lime/layout-4.md:1085`–`1174` and `./layout-4.md:1130`.
- **The array**: `EncoreSection.jsx:19805`–`19813`.
- **The renders**, each leaf gated alone and the card box never: the block at `:20012`–`20029` (the
  gates at `:20020`–`20027`, the eyebrow at `:20005`); Retro's body at `:20237`–`20257`, reading
  `seats[i]` (four fixed hues, `:19778`–`19786`), the eyebrow at `:20230`.
- **The view-model**: `EncoreBuilder.jsx:1525` (`vm.gigCityCount`, read at `:19810` alone) and
  `:1530`–`1532` (`mapRadius` / `mapBase` / `mapTerms`); `data.js:812`–`814` (`MAP_RADIUS` '12 mile
  radius', `MAP_BASE` 'Based in Manchester', `MAP_TERMS` '120 mi standard · further on request').
- **The fields** (`data.js`): `radius` at `:1576` (*Coverage*, no `in`; its hint names "the Coverage
  card"), `base` at `:1579` (no `in`), `terms` at `:1580` (`in: [0, 1, 3]`), `gigs` at `:1559`–`1570`
  (its hint: "layout 4 counts them"). `base` is read at every layout (`:17130`, `:17377`, `:17783`,
  `:18174`, `:19159`, `:19570`).
- **BASE's value already exists page-wide.** The header's `location` seed is "Manchester, UK"
  (`data.js:1308`), the frame's BASE value byte for byte, and it reaches every section as
  `vm.location` through `identity` (`EncoreBuilder.jsx:551`–`553`, F1). The map does not read it.
- **A trap any card-dropping fix meets:** the desktop viewport has no height of its own; it stretches
  to the wall (`:19919`, `desk ? null : { aspectRatio … }`; `:20102` in the body). A wall that loses a
  row halves the desktop map. The frame's card is 555 tall; the seeded wall is 455.2 (555 × 0.82).
- **Found, not reported**: the seeds disagree at layouts 1–3. `MAP_RADIUS` says "12 mile radius"
  where `MAP_TERMS` says "120 mi standard" and the rings run to 120mi. Under A, layout 4 stops
  printing it; the seed is the sweep's question.
- **The precedent that reverses the fit's reasoning**: JP-065 (`./layout-3-qa-fixes.md`, Decided A,
  2026-09-28), a frame claim re-seated as a typed field with the derivation kept only as its emptied
  fallback. JP-040 and JP-046 are the same shape for this section's layouts 2 and 3.

**Decision** (one `AskUserQuestion`).
- **A (recommended). The wall is the artist's: a `stats` repeater**, `{ label, value, sub }`, layout
  4 alone, seeded with the frame's four cards verbatim (`MAP_STATS_4`: Radius / 120 / miles ·
  standard; Cities / 21 / played in; Gigs YTD / 48 / played this year; Base / Manchester, UK / further
  on request).
  - One mechanism closes all three tickets: the copy is the frame's, each leaf drops when emptied, a
    blank row is dropped by `blankRow(row, STAT_KEYS)` (JP-051's rule: every key, never the printed
    ones), and the card names are the artist's words.
  - `max` 4, the frame's 2 × 2. An odd count trails one half-width cell, the pricing deck's rule.
  - The two derivations go, JP-065's reversal taken whole: a stat is a claim the artist types.
    `vm.gigCityCount` is deleted, since nothing else reads it.
  - `radius`, `base` and `terms` leave layout 4: `in` becomes `[0, 1, 2]` for `radius` and `base` and
    `[0, 1]` for `terms`, and `radius`' hint loses "the Coverage card".
  - A new repeater (the ninth or tenth, with entry 8's), the `QuotesField` shape (no assets, no
    delimiters): `STAT_KEYS`, `statsVal` in `EditPanel` resolving exactly what `sectionVm` does, and
    "Empty stats aren't shown."
- **B. JP-065's shape per card, no repeater.**
  - *Cities* is a field seeded '21'; filled, its sub is "played in"; emptied, it falls back to
    `gigCityCount` / "playing in".
  - *Gigs YTD* is a field seeded '48'; filled, it prints "GIGS YTD / played this year"; emptied, the
    count under GIGS / "upcoming".
  - *BASE* reads `vm.location` under the frame's BASE label, with no stutter; the map's own `base`
    then reaches layouts 1–3 alone, and `location`'s hint gains the map.
  - *COVERAGE* stays: a phrase under a numeral's label still stutters. The labels stay literals, so
    JP-082 (map) is a reply. Two new flat keys; RADIUS and two subs stay named diffs.
- **C. JP-078 alone, and replies to JP-077 and JP-082 (map).** A card with no value is not drawn,
  since its literal label and sub describe the value. Zero seeded files.

**Fix (A).**
- `data.js`: `MAP_STATS_4` and `STAT_KEYS` beside `MAP_SPAN`; `FIELDS.map.stats` (*Stats*,
  `type: 'stats'`, `max: 4`, `in: [3]`); the `in` rows and hints of `radius`, `base`, `terms` and
  `gigs`.
- `sectionVm`: `vm.mapStats`, the list filtered by `blankRow` before anything indexes it, values
  uncased as today; `vm.gigCityCount` deleted.
- `EncoreSection`: both halves map `s.mapStats` in place of `stats`; the body reads `seats[i %
  seats.length]`. **The desktop viewport takes the frame's 555 as a floor** (`minHeight: u(555)`) in
  both halves: the seed's 455.2 already clears it, so it moves no seeded file, and it holds the map's
  size when a row goes.
- `EditPanel`: `StatsField` beside `QuotesField`, `statsVal`, and a `type === 'stats'` branch beside
  `'slots'` (`EncoreBuilder.jsx:3682`).

**Fix (C)**, for comparison: filter `stats` on `value`, and the same floor.

**Expected after-diff (named before the code).**
- **A: 30 files**, map `arch 3` × themes 0–4 × 3 widths × both surfaces. In every file the four cards'
  label, value and sub rows change text. At 390, where the cells hug, the card's height and the
  ticker's y move with the shorter copy (the seeded COVERAGE sub wraps at 390 today). At 1440 and 768
  the cells' minimums hold the heights. The floor is inert on the seed.
- **B: the same 30** (label, value and sub in cards 2–4; card 1 does not move).
- **C: 0.**
- On top of JP-080's landing: the same files, so the digest base is the tree with JP-080 in.

**Verify.**
- **The seed.** Digest map × themes 0–4 × 3 × 2 against a HEAD worktree carrying JP-080: exactly the
  named files; each card's `textContent` read whole, since the 390 heights are the point.
- **Reach**: `map.stats` → `[3]` on every template; `map.radius` re-measured → `[0, 1, 2]`; a new
  `map.base` probe → `[0, 1, 2]`; `map.terms` → `[0, 1]`. (B instead: the two new keys → `[3]`, and
  `who.location` gains map `[3]`.)
- **States** (`live=1`, three widths, themes 0–4): `&cj={"stats":[]}` (the head row alone, and the
  desktop map keeps the frame's height); three stats (the third trails half-width); a row with only a
  value; a row with its value emptied (label and sub stand, each dropping alone); an all-blank row
  (dropped); a 60-character value (wraps inside its cell, `scrollWidth` equal to the width). Under B
  or C: the tester's pair emptied — two cards in one row, and the map holds its desktop height.
- **The tester's steps**, in the real app on Grunge card 4: Events Map → *Stats* lists the frame's
  four; empty RADIUS's value and blank the BASE row, Publish → Open at 1440 / 768 / 390: no empty card
  is drawn. Then Lime's card 4, and Retro's card 4 once (the body's seats).

**Docs.** The branch header at `EncoreSection.jsx:19672`–`19686`, rewritten. CLAUDE.md's repeater
paragraph ("Eight list-shaped contents …", with `STAT_KEYS`, `statsVal` and `MAP_STATS_4` in its
lists) and its "Layout 4 is the pager alone" paragraph (a sentence on the wall). The four hints.
Pointers at `../retro/layout-4.md`'s open question 6 and the layout-4 map Settled of
`../lime/layout-4.md` and `./layout-4.md`.

**Decided** (2026-09-29, user call): **A.** The wall is the artist's: a `stats` repeater
`{ label, value, sub }`, layout 4 alone, seeded with the frame's four cards verbatim
(`MAP_STATS_4`), `max` 4, a blank row dropped by `blankRow(row, STAT_KEYS)` before anything
indexes it, and each leaf dropping alone when emptied. Both derivations go (`vm.gigCityCount` is
deleted), and `radius`, `base` and `terms` leave layout 4. The desktop viewport takes the frame's
555 as a floor in both halves (moved to the stat grid in the fix; see Settled). It is the **ninth**
structured editor.

**Settled** (2026-09-29). The drift the hand-off named held (the branch header's stat paragraph
`EncoreSection.jsx:19702`, the `stats` array `:19845`, the block's renders `:20053`, Retro's
`:20278`; `vm.gigCityCount` `EncoreBuilder.jsx:1554`; `FIELDS.map` `data.js:1587`).
- **The fix.** `data.js`: `MAP_STATS_4` (the frame's twelve strings) and `STAT_KEYS` beside
  `MAP_SPAN`; `FIELDS.map.stats` (*Stats*, `type: 'stats'`, `max: 4`, `in: [3]`, last in the
  panel); `radius` and `base` take `in: [0, 1, 2]` and `terms` `[0, 1]`, and the hints of
  `radius`, `gigs` and `span` lose their layout-4 clauses. `sectionVm`: `vm.mapStats`, the list
  filtered by `blankRow(r, STAT_KEYS)` and each part trimmed, uncased (`cv` is raw, the card's CSS
  upper-cases the label, and the frame's value and sub are its own casing). `vm.gigCityCount` is
  deleted with its comment. `EditPanel`: `StatsField` after `SlotsField` (SlotsField's shape:
  the label on the header line, value and sub paired under it, the frame's first card as
  placeholders, "Empty stats aren't shown."), `statsVal`, and a `'stats'` rung beside `'slots'`.
  SlotsField's header no longer calls itself "the last list-shaped content to get one".
  `EncoreSection`: both halves map `s.mapStats`; the body reads `seats[i % seats.length]`.
- **The floor moved from the viewport to the wall** (not in the entry). `minHeight: u(555)` on the
  desktop viewport was **not** inert: the seeded wall renders at **455.0** under Retro's body
  (Retro, Editorial, Pop) and **454.6** under Lime, not the 455.2 the branch header sums, and
  `u(555)` is 455.1. It moved the desktop by 0.1 on three themes and 0.6 on Lime. So the desktop
  stat grid takes `gridTemplateRows: repeat(2, minmax(cellMin, auto))` instead, the cell's own
  minimum (the block's `G.cellMin`, the body's 227.5). The seed's two rows already fill both, so
  it is the seed by construction. A shorter list keeps the empty second row, and the viewport
  keeps its stretch. The picture is the one the viewport floor gave, with the cards under the
  head and the air below. The branch header says why.
- **The labels wrap** (not in the entry; the advisor's catch). The cell's label took the head
  row's `nowrap` chip style, harmless while it was a literal. A 34-character label overran its
  159 cell at 390 on all five themes. The cell's label now spreads `whiteSpace: 'normal'` and
  `overflowWrap: 'anywhere'`, and the head row's chips keep `nowrap`. No seeded label wraps, and
  the digest confirmed it: a re-digest after the change matched the one before it, 0 of 660 per
  surface.
- **The harness was proved first.** A HEAD worktree at `3f7d265` on :5174 against the tree: all
  eleven categories × themes 0–4 × every layout × 3 widths gave **0 of 660 per surface**.
- **After-diff, named before the code: 30 files. Measured: exactly those 30** (map `arch 3` ×
  themes 0–4 × 3 widths, 15 per surface). At **1440** only the eleven text spans move: three
  labels (BASE gains one), four values and four subs (BASE gains a sub). No container moves.
  **768** is the same. At **390** the cells hug, so the rows and the ticker's y move. Retro's
  body rows are 116.4 / 100 → 100 / 119.4 (card 577.9 → 580.9). Lime's are 108.4 / 137 against
  its master's 109 / 138 (card 596.2 → 579.4). Grunge's card is 567.6 → 579.4. The style
  columns change only by the two new BASE rows, which take the existing label and sub styles.
  Every seeded card's `textContent`, read whole on both surfaces and every theme and width: "Radius |
  120 | miles · standard", "Cities | 21 | played in", "Gigs YTD | 48 | played this year", "Base |
  Manchester, UK | further on request".
- **Reach** (`reach.mjs`, map probes, themes 0–4): `map.stats` → layout 4; `map.radius` and a new
  `map.base` → layouts 1–3; a new `map.terms` → layouts 1–2. Every template agrees, so the `in`
  rows are plain arrays.
- **States** (`live=1`, themes 0–4 × 3 widths, a throwaway probe). Every case read the same on
  all five themes.
  - `stats: []`: no cells, and the desktop card keeps the seed's height (455.0 / 454.6 / 455.2).
  - Three stats: the third trails half-width under the first.
  - A value-only row prints the numeral alone.
  - A row with its value emptied prints its label and sub.
  - An all-blank row (a label of one space) is dropped, and the next row takes its seat.
  - The tester's case (RADIUS's value emptied, BASE blank) leaves three cards, none empty.
  - A 60-character value wraps inside its cell with no overflow and no page scroll. It grows the
    desktop card to 584, which is content, not a regression.
  - A 34-character label wraps inside its 390 cell.
- **The tester's steps, in the real app** (a one-off puppeteer script, trusted clicks, deleted
  after), on Grunge's, Lime's and Retro's card 4.
  - Events Map → *Stats* lists the frame's four. Coverage, Based in and Travel terms read "Not
    shown in this layout".
  - Emptying RADIUS's value and blanking the BASE row shows the blank row's hint.
  - The canvas and the published tab at 1440, 768 and 390 draw three cards: "Radius | miles ·
    standard", then CITIES and GIGS YTD whole. No card is empty. The published desktop map
    holds 555 (554.7 on Lime).
  - No horizontal scroll and no page errors. The 1440 and 390 shots read right.
- **Docs**: the branch header's two paragraphs, rewritten; CLAUDE.md's repeaters paragraph
  (nine, `StatsField`, `STAT_KEYS`, `statsVal`, `MAP_STATS_4`, and `booked` a tenth structured
  field) and a sentence on the wall in its "Layout 4 is the pager alone" paragraph; pointers at
  `../retro/layout-4.md`'s open question 6, the head of `../lime/layout-4.md`'s section 6
  Settled, and `./layout-4.md`'s named diffs.
- **Found, not reported, left for the sweep**: `MAP_RADIUS` "12 mile radius" still disagrees with
  `MAP_TERMS` "120 mi standard" at layouts 1–3.

Reply: **JP-077, JP-078 and JP-082 (the map's card names) — fixed.**
- **JP-077**: the Events Map's stat cards now start from the design's four: RADIUS 120 / miles ·
  standard, CITIES 21 / played in, GIGS YTD 48 / played this year, and BASE Manchester, UK /
  further on request.
- **JP-082 (card names)**: the cards are the artist's. The Events Map has a new *Stats* list, up
  to four cards, each with a name, a value and a line under it, all editable. The cards are no
  longer counted from the gig list, since "21 cities played in" is something only the artist
  knows. *Coverage*, *Based in* and *Travel terms* now say "Not shown in this layout" on layout
  4, as they only appear in layouts 1–3.
- **JP-078**: a card never shows as an empty box. Each part of a card hides when emptied. A card
  with nothing in it is not shown, and the editor says so under that row. The map keeps its full
  height at desktop however many cards are left.
- "Travel & reach" stays a fixed label, as decided in the labels reply.
- Checked on *Stacked* under Grunge, Lime and Retro at 1440, 768 and 390, with RADIUS's value
  emptied and the BASE row blanked.

---

## JP-079 · JP-081 (steps) — *What happens next* prints one line per step

**Verdict: a named fit call the user has kept once, and the frames do not bear it out.**
- **How the build prints it.** Layout 4's column prints `vm.formSteps`, which is `promises` numbered.
  A promise is one string, so each row is one line.
- **How the call was made.** Retro's fit chose it on purpose (`../retro/layout-4.md:1167`–`1178`): it
  read row 02's sub, "Reply within 24 hrs", as `FORM_PROMISES[0]` "almost verbatim" ("the *frame*
  quoted the seed"), and ruled a per-row second line "a gloss". Lime's and Grunge's fits widened that
  reading. JP-054 put exactly this to the user as option B, not recommended, and the user took A,
  "the steps stay one line" (`../lime/layout-4-qa-fixes.md:188`–`194`, reply `:251`). So this is
  JP-054's steps half coming back, as its boxes half came back on the retest (`FORM_FIELDS_4`,
  `../lime/retest-qa-fixes.md:332`).
- **What the full read shows.** All **nine** frames draw the same three **process steps**, each a
  title over a second line — *Send your details / Date, type & location*, *I check availability /
  Reply within 24 hrs*, *Quote & confirm / Tailored package + price* — at 1440 too, not only at 768
  and 390. One sub-line echoes a promise; the titles are steps. So the seed prints three **promises**
  ("Replies within 24 hrs / Free, no-obligation quote / Covers 120 mi from Manchester") under a head
  that asks a different question.
- **Every template.** The list resolves in `sectionVm` and both halves draw it. JP-081's "step texts"
  are this entry's seed. The column's head, "What happens next", is the replies entry's: it stays a literal under A, B
  or C, decided there.

**Evidence** (triage 2026-09-29, `65dd1bc`).
- `data.js:852`: `FORM_PROMISES`. `:1659`–`1661`: `FIELDS.form.promises`, `in: [0, 1, 3]`, hint "One
  per line … Layout 4 numbers them down its right-hand column". `tierFeats()` (`:1987`) splits on
  newlines only, so none of the tester's `—`, `|` and `:` can make a second line.
- `EncoreBuilder.jsx:1627`: `vm.formPromises`. `:1628`–`1637`: `vm.formSteps` (`{ n, label }`), whose
  comment says "The frame's second line per row has no seat — a promise is one string, and a gloss for
  it would be a claim the artist never typed". `:1640`: `formStepsLabel`.
- Who reads `promises`: layout 1 (`EncoreSection.jsx:22815`–`22817` block, `:23085` body), layout 2
  (`:23444`–`23447`, `:23823`), layout 4 (the block's column at `:24704`–`24726`, one `st.label` span at
  `:24719`; the body's at `:25029`–`25064`, `:25053`–`25056`). Layout 3 reads none of it, so "the same
  list layout 3 runs together as one line" is **stale** where it appears: CLAUDE.md `:946`–`947` and
  `EncoreSection.jsx:24799`–`24801`.
- The fit's comments: `:24552`–`24554` (block), `:24797`–`24803` (body).
- Frames, every text node read: Grunge `725:2990` / `971:8151` / `977:12378`, Lime `964:72940` /
  `971:5627` / `977:9201`, Retro `964:72845` / `964:79477` / `977:8663`. Every step row is a 56px
  numeral square, a vertical auto-layout box (**gap 2**, FILL) and ↘; the title Inter Body/MD (14 / 13
  / 13 at 1.5), the sub Inter Body/SM at 1.4 (each theme's own `s.bodySm`), both `sem/text/2`. **The
  row is 88 = 16 + 56 + 16 at every width**, and the text box (39–41) sits inside the square's 56, so a
  second line does not grow the row.

**Decision** (one `AskUserQuestion`).
- **A (recommended). A `steps` list of its own for layout 4**, a new repeater (the ninth or tenth,
  with entry 7's).
  - `FIELDS.form.steps` (`l: 'Steps'`, `type: 'steps'`, `max: 6`, `in: [3]`), rows `{ title, sub }`;
    a `StepsField` about `SlotsField`'s size (`EncoreBuilder.jsx:2798`–`~2870`), "Empty steps aren't
    shown." under a blank row; `STEP_KEYS = ['title', 'sub']` beside the seed; `stepsVal` mirroring
    `sectionVm`.
  - The `songs` rule: an absent key is the seed `FORM_STEPS`, the frames' three byte for byte, and an
    emptied array is none. **All nine frames agree, so no theme gate.**
  - Blank rows drop before the numbering (JP-048's order). Each line renders or not (the
    testimonials' rule), so a row holding one of the two is one line in that line's own style.
  - `promises` goes back to layouts 1 and 2 (`in: [0, 1]`), and its hint loses layout 4.
- **B. A delimiter inside `promises`, and a layout-4 seed.** `FORM_STEPS_4` in the delimited form,
  gated on the absent key (`FORM_FIELDS_4`'s shape), split at the first ` | ` in `sectionVm` (of the
  tester's three, the one prose rarely holds; `—` and `:` both occur in a promise); layouts 1 and 2
  print the first half. Costs: a syntax the hint has to teach, and once the artist edits the list at
  any layout it is theirs at every layout, so layout 1's ticked list would read "Send your details" —
  steps under ticks. JP-054 named this the not-recommended option.
- **C. Reply**: JP-054's call stands.

**Fix (A).**
- `data.js`: `FORM_STEPS` and `STEP_KEYS` beside `FORM_PROMISES`; the `steps` row after `promises`;
  `promises`' `in` and hint.
- `EncoreBuilder.jsx`: `vm.formSteps` from `c.steps` as `{ n, title, sub }`; `stepsVal`, `StepsField`,
  and a `type === 'steps'` branch beside `'slots'` (`:3682`).
- `EncoreSection.jsx`, at both step sites (`:24719`, `:25053`): the span becomes a column at the
  frame's gap of 2 (× 0.82 at desktop), the title body-md / 1.5, the sub body-sm / 1.4 (`s.bodySm` in
  the block, `u(T.bodySm)` in the body); the square and the ↘ unchanged; with no steps, still no
  column.
- The comments at `EncoreBuilder.jsx:1628`–`1634` and `EncoreSection.jsx:24552`–`24554`,
  `:24716`–`24718`, `:24797`–`24803`, `:25049`–`25052`.

**Expected after-diff (named before the code).**
- **A: 30 files**, form `arch 3` × themes 0–4 × 3 widths × both surfaces: each row's text changes from
  a promise to a title, and each row gains a sub span. The rows should hold at 88 (72.2 at desktop),
  since the text box fits inside the square — **unless a promise wraps today at 390 and its title
  does not**, when the column shortens and, at 768 and 390 where the steps lead, the form under it
  rides up. **Measure today's row heights before the code and name what you find.**
- Form `arch 0`–`2`: 0 files. B: the same 30.

**Verify.**
- **The seed.** Digest form × themes 0–4 × 3 × 2: exactly the 30; each row's two lines read whole with
  `textContent`.
- **Reach**: a `form.steps` row (layout 4 on every template); `form.promises` re-measured ([0, 1]).
- **States** (`&cj=` over `steps`, `live=1`, three widths, themes 0, 1 and 2): a title alone; a sub
  alone; a blank row (dropped, numbered 01 / 02 with no gap); an emptied list (no column; the form
  takes the measure at 1440 and leads at 768 / 390); a 60-character title at 390 (wraps, the square
  stays centred, nothing overflows); six steps.
- **The panel**: at layout 4, *Steps* lists the frames' three; at layouts 1–3 it reads "Not shown in
  this layout", and *Promises* no longer names layout 4.
- **The tester's steps**, in the real app on Grunge card 4: Publish → Open at 1440 / 768 / 390; the
  rows read the frames' three steps, two lines each. Then Lime's card 4 and Retro's card 4, and
  Editorial's card 4 once (Retro's body).

**Docs.** CLAUDE.md: the form's layout-4 sentences ("The steps stay one line.", `:939`; "Its promises
are `vm.formSteps`, the same list layout 3 runs together as one line", `:946`–`947`, stale either way);
the repeaters paragraph (the list, `STEP_KEYS` among the `*_KEYS`, the seed list, and "The one other
repeated field is a delimited textarea, `FIELDS.form.promises` — whose rows the enquiry form's layout 4
numbers 01 / 02 / 03", `:1151`–`1153`). *Reversed* pointers at `../retro/layout-4.md:1167`–`1178`,
JP-054's Decided and Reply in `../lime/layout-4-qa-fixes.md` (`:190`, `:251`, `:815`),
`../lime/layout-4.md:1400`, `:1430`, `:1434`, and `./layout-4.md:1357` ("one-line steps against two").

**Decided.** —

**Settled.** —

Reply: —

---

## JP-081 (repertoire head) — "12 Songs" for "Repertoire"

**Verdict: a named fit call whose precedent has since been reversed.** All three layout-4 frames print
"Repertoire" over "All songs · A–Z" (Grunge's panels `964:73007` / `971:8124` / `977:12351`, Lime's
`964:72916` Section, Retro's `964:72817`). Retro's fit settled its open question 8
(`../retro/layout-4.md:1468`–`1476`, `104530e`) as `s.title` with the count fallback, "the literal
would leave `heading` editing nothing". JP-070 (user call, 2026-09-28) reversed exactly that at layout
3: `HEADING_3`'s "Curated sets" wins over the count, and the field still edits it. **Every template.**

**Evidence** (triage 2026-09-29, `65dd1bc`).
- `EncoreBuilder.jsx:252`–`255`: `HEADING_4` has no `repertoire` key. `:1027`: the count. `:1037`:
  `HEADING_4` is assigned *after* the count, so a repertoire arm already wins in `sectionVm`.
- **`EditPanel`'s chain is the trap**: the count arm at `:3632` sits **ahead of** the `HEADING_4` arm at
  `:3636`–`3637`. The key alone would leave the panel reading "12 Songs" over a canvas reading
  "Repertoire", so the arm moves up beside the `HEADING_3` arm (`:3630`–`3631`).
- `data.js:1082`–`1098`: the `*_HEADING_4` constants. `:1489`–`1493`: `FIELDS.repertoire.heading`'s
  comment names only layout 3's exception.
- **Measured** with `&cj={"heading":"Repertoire"}`: one line at every width and theme; the least room
  is Pop's caps at 390, with 77px to spare.

**Decision.**
- **A (recommended). `REP_HEADING_4 = 'Repertoire'` joins `HEADING_4`** (JP-070's shape), and
  `EditPanel`'s `HEADING_4` arm moves ahead of the count; nothing else in the chain moves. An emptied
  heading stays empty at every layout; the count does not come back.
- **B. Reply**: the count stands at layout 4, and Retro's open question 8 holds.

**Expected after-diff (named before the code; A): 30 files**, repertoire `arch 3` × themes 0–4 × 3 ×
2: the head's text and box width. It digests against a tree with JP-083 landed (the same branch).

**Verify.**
- **The seed.** Digest repertoire × themes 0–4 × 3 × 2: exactly the 30, and `arch 0`–`2` unchanged.
- **The panel**: at layout 4, *Heading* shows "Repertoire" as its value; typed over it holds; emptied it
  stays empty and the count does not return. At layouts 1 and 2, the count; at 3, "Curated sets".
- **The tester's steps**, in the real app on Grunge card 4, then Lime's and Retro's.

**Docs.** CLAUDE.md's "Layout 3 is the exception" sentence (`:1172`–`1178`, now layouts 3 and 4). The
`HEADING_4` comment (`data.js:1082`–`1086`). `FIELDS.repertoire.heading`'s comment.
`EncoreSection.jsx:12189`–`12198` (the head is no longer "12 Songs"). A pointer at
`../retro/layout-4.md`'s open question 8.

**Decided.** —

**Settled.** —

Reply: —

---

## JP-081 (tags) — five chips for the frame's six

**Verdict: by design (JP-037, a user call, 2026-09-21), on a premise only two frames bear out.** The
call was "the Tags component hides its sixth chip", read off Lime's **layout-2 bio**, where
`964:64581` shows five. JP-037's own recommendation (`../lime/layout-2-qa-fixes.md:288`–`291`) was "if
any frame draws six, seed six and let the artist trim"; the user chose five. The visible chip labels,
read now:
- **six** in the header at layout 1 (Grunge `964:58600`, Lime `964:58588`, Retro `964:58576`);
- **six** in the header at layout 3 (Grunge `964:68686` and its 390 `984:13931`, Lime `964:68654`,
  Retro `964:68622`, Editorial `964:68718`);
- **six** in the header at layout 4 (Grunge `964:72944` / `971:7823` / `977:12044`, Lime `964:72849` /
  `971:5299` / `977:8867`);
- **six** in Grunge's layout-4 bio Genres row (Section `964:72945` at 1440 and 390; the 768 re-read was
  inconsistent, so the session re-reads it): "Default · Sold Out · New Release · Archive · Live · All
  Access";
- **five** in Retro's layout-4 header (`964:72511` / `964:77544` / `971:14040`), which has no sixth
  node, and in Lime's layout-2 bio;
- layout 2's header draws no chips; Lime's layout-4 bio twin was not read.

**Evidence.** `data.js:660`–`668`: `TAGS` (six palette seats) and `TAG_LABELS` (five). `:1347`–`1350`:
`FIELDS.header.tags`' `in`. `EncoreBuilder.jsx:741`: `tagList` seeds `TAG_LABELS` for the header, and
for the bio through `identity`. CLAUDE.md `:190`–`191`.

**Decision** (ask it plainly, with the census above: it reopens a user call).
- **A (recommended, reopens JP-037). Seed six everywhere**: `TAG_LABELS` gains "All Access". One
  constant, and the majority of the frames. Named cost: Lime's layout-2 bio and Retro's layout-4 header
  then draw a chip their frame lacks. **Before recommending it in the session, measure that six fit
  Retro's layout-4 header row at 390 and every bio row that wraps.**
- **B. A layout-4 seed under Lime and Grunge**, `TAG_LABELS_4` gated on the absent key
  (`FORM_FIELDS_4`'s shape). The header seeds it at its own design 3. The bio reads the header's tags
  through `identity`, and `headerIdentity(sections)` (`data.js:1768`) returns the header's raw
  `c.tags` with no design or theme, so the bio's fallback cannot see the seed there without a new
  argument — JP-061's trap, where the header seeds one thing and the bio prints another. The bio
  keys it instead on **`sectionVm`'s `page` argument**, the header's design, which the published page
  and the canvas already pass to every section for the footer's seat (`pageDesignOf()`,
  `EncoreBuilder.jsx:262`, already folded; passed at `:4350` and `:4741`): `own.tags` absent (the
  resolution at `:741`), Lime or Grunge, and `page === 3` seed `TAG_LABELS_4`. `EditPanel`'s `tags` fallback mirrors the header's arm. The
  layout picker's previews carry no page, so they show five; Editorial's card 4 (Retro's `HeaderV3`)
  and Retro keep five. Named cost: a second place that knows a seed depends on the header's design.
- **C. Reply**: JP-037 stands, and the artist types a sixth.

**Expected after-diff (named before the code).**
- **A: ≈ 180 files**, every chip row reading `tagChips`: the header at Retro `arch` 0 / 2 / 3 / 4 / 5
  and Lime, Grunge and Editorial `arch` 0 / 2 / 3 / 4 (17 × 3 × 2 = 102), and the bio at `arch` 1 and 3
  on every template plus `arch` 2 on Lime, Grunge and Editorial (13 × 3 × 2 = 78). The session
  re-measures the set with `reach.mjs`'s `header.tags` row, and checks whether Pop's header prints
  chips at all.
- **B**: header `arch 3` × Lime and Grunge × 3 × 2 = **12** in the default digest, and the bio **0**
  there, since the harness passes no `page` unless asked. A second render, `EXTRA='&page=3'` over the
  bio, moves every bio design that prints chips — `arch 1`, `2` and `3` under Lime and Grunge — × 2 ×
  3 × 2 = **36**. The picker's thumbnails do not move.
- **C**: 0.

**Verify.**
- **The seed.** Digest header and bio × themes 0–4 × 3 × 2: exactly the named files; each chip row's
  labels read whole.
- **States** (`live=1`, three widths): the list emptied (the row hidden, `vm.showTags`); seven tags
  (the row wraps; `scrollWidth` equal to the width at 390).
- **The panel**: *Tags* lists six (A) or six at Lime's and Grunge's layout 4 (B).
- **The tester's steps**, in the real app on Grunge card 4, then Lime's, then Retro's card 4 and card 1.

**Docs.** CLAUDE.md `:190`–`191` ("five — the Tags component hides its sixth chip"). The `TAGS`
comment. A *reopened* pointer on JP-037's Settled in `../lime/layout-2-qa-fixes.md`.

**Decided.** —

**Settled.** —

Reply: —

---

## End-of-pass sweep

1. Full digest against a `main` worktree on :5174 (port and `?t=` stamps normalised), all categories ×
   themes 0–4 × three widths × canvas and `live=1`, plus the footer at `page=2`. Prove the harness
   first: the worktree at HEAD against the tree diffs to 0. Reconcile by file: every differing file
   is one a Settled names, and every named file differs.
2. `reach.mjs` for every new or re-scoped key: `calendar.email`, `calendar.cta`, `bio.cta2`,
   `form.messageLabel`, `form.steps` and `form.promises`, `map.stats` (or entry 7's per-card keys) and
   `map.radius` / `map.base` / `map.terms`, `header.tags` if it moved.
3. Walk Grunge card 4 in the real app and the published tab at 1440 / 768 / 390: first
   `page-check.mjs Grunge 3,0,1,2`, then every entry's tester steps with trusted clicks, JP-076's
   delete → Publish → Send path included. Then Lime's, Retro's and Editorial's card 4 once each.
4. `npm run build:standalone`, then `cp source/dist-standalone/index.html index.html`, in its own
   commit. Then a two-build digest (`build-digest.mjs`, reduced motion, `CARD=3`: the card is
   0-based), whose diff should be only the named rows.
5. **A note for the designer**, at this plan's foot, gathered from the entries as they settled. The
   triage found these candidates:
   - Grunge's layout-4 page has no desktop form instance, and seven of the nine form frames print the
     component's default "KAI MERCER" where Retro's and Lime's desktop instances print "Contact Us":
     which is meant (JP-081)?
   - The map's five dots are absolute pixels leaked to all three masters, two off the 390 viewport;
     Lime's are ink on a dark plate and cannot be seen; the ticker's "‹ … ×" has no forward control
     (JP-080).
   - The now-playing title has no truncation rule: HUG and `HEIGHT`, so a longer title pushes the
     transport off the 308 column (JP-084). Ours gaps it by the transport's 14 and wraps it to two
     lines before an ellipsis.
   - "Six Worth Your Ears" counts a filler sixth tile (JP-081).
   - The layout-4 bio prose leads with the mock artist's name, in one paragraph where the section
     carries two; its "since 2021" is layout 3's "June 2021" (JP-081).
   - Lime's layout-2 bio and Retro's layout-4 header draw five tags where every other page draws six
     (JP-081).
   - The A–Z rail has no cell for digits or non-Latin titles (JP-083).
   - No master draws Send Enquiry without an address (JP-076).
   - The form's steps are steps where the seed held promises, if entry 8 takes A.
6. `plans/README.md`'s row, and one reply line per ticket for QA, headed by the
   retest-against-the-stamp line: retest against the Pages build whose `last-modified` is later than
   `Tue, 29 Sep 2026 08:18:02 GMT` (`curl -sI https://siniiitsa.github.io/js-plus-prototype-2/`).
   Also the two seed and doc slips the triage found outside any ticket: `MAP_RADIUS`' "12 mile radius"
   against the 120mi terms and rings (a question for the user), and CLAUDE.md's ticker "not drawn at
   one gig" (JP-080's Docs, if not already done). And a *closed* pointer on `./layout-4.md`'s open
   question 2 (`:1613`–`1619`): "Closed on its default by JP-081's reply (user, 2026-09-29):
   'Contact Us' stays on every template."

**Settled.** —

**Replies to QA, one line per ticket.** —
