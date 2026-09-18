# Lime QA fixes — bug-by-bug plan

Working checklist for a batch of QA reports against the Lime template, layout 1 (the *Hero*
header card). It works like [`retro/qa-fixes.md`](../retro/qa-fixes.md): **one bug per session,
with context cleared between sessions**, and each session writes what it settled back into this
file. Nothing here is fitted to Figma. Each entry is a behaviour defect, and the fix has to leave
every fitted picture unchanged unless the entry names the diff.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then the memory
notes `verifying-the-published-tab` and `browser-tool-choice`, then the *Conventions learned on
this pass* of [`retro/qa-fixes.md`](../retro/qa-fixes.md) — this plan does not repeat them, and
three of them (the `&cj=` harness, "a label with nothing to point at is dropped from the published
page and kept on the canvas", "digest across a branch needs the same harness on both sides") are
leaned on below. Lime layout 1's *Conventions* ([`layout-1.md`](./layout-1.md)) are background;
read them where an entry points at one.

Branch: **`lime-qa-fixes`**, cut from `main`. Every fix is its own commit on it.

**Report IDs are the tester's own** (JP-033, JP-034, JP-035). Do not renumber. JP-035 is the
second filing of the report the Retro plan calls **F1**.

**The tester's build is stale against `main`, and that is the first finding.** Every report is
keyed to the deployed page's `Last-Modified: Thu, 17 Sep 2026 15:17:22 GMT`. F1's fix (`2fd4d23`)
was merged as PR #23 on 18 Sep at 15:14 +0300, and GitHub Pages served it from
`Fri, 18 Sep 2026 12:15:15 GMT` (measured with `curl -sI` during the triage). So the "Не
виправлено" on F1 and the whole of JP-035 describe a build that predates the fix. JP-033 and
JP-034 are untouched by anything merged since and stand as reported.

## Status

| Order | ID | Report (short) | Verdict | Size | Decision needed? | Status |
|---|---|---|---|---|---|---|
| 1 | JP-035 / F1 | Header Kicker and Location do not reach the bio's foot line and the enquiry form's credit | **Already fixed** in `2fd4d23`; the tester's build predates it | XS (verify only) | no | **done** (verified on the 18 Sep 12:15:15 GMT build; nothing to fix) |
| 2 | JP-034 | Media player's SOUNDCLOUD pill publishes as a dead `<span>`; it can be neither renamed nor hidden, and the frame draws BOOK NOW there | **Confirmed** — currently *documented as intended* | S | **yes** → A | **done** |
| 3 | JP-033 | Header nav prints section type names (BIO · MEDIA PLAYER · …) instead of the frame's labels, and a ninth link | **Confirmed** — a shared seam, Retro and Lime (the flat three's header hardcodes its nav) | M | **yes** → A, A1 "Availability" | **done** |
| 4 | — | End-of-pass sweep, deploy, hand the tester the new build stamp | — | S | no | **swept and pushed**; PR, merge and the stamp are open (no `gh` here) |

**Why this order:** JP-035 costs one verification and closes the tester's loudest complaint.
JP-034 is one block in one section. JP-033 is last because it moves the header's digest in every
theme and the sweep should diff against a tree where that is the only intended movement left.

**"Decision needed"** means the entry lists options with a recommendation. The session starts by
asking the user (one `AskUserQuestion`) and records the answer under **Decision** before writing
code.

## How each session runs

1. Read the entry. Re-check the *Evidence* line numbers: they are from the triage (`main` at
   `7e15144`) and will drift.
2. If the entry needs a decision, ask for it and record it.
3. Fix, then verify at **all three widths** and on **both surfaces** (canvas and `live`) wherever
   the entry touches `EncoreSection` or `sectionVm`.
4. **Lime first, but not Lime only.** Both open bugs sit on shared seams. Check Retro (theme 0)
   and one flat theme (theme 2) for every change, and say in the commit which of them moves.
5. Update the docs the entry names. Both open bugs are behaviours `CLAUDE.md` or a code comment
   *states as intended*; a fix that changes the behaviour without rewriting that text leaves the
   docs lying.
6. Commit one bug per commit (`Fix JP-034: …`), fill in **Settled** and the status row, then stop
   and print the hand-off prompt for the next entry.

**Do not refresh the root `index.html` per bug.** The sweep does it once.

Harness: `source/src/preview.jsx` already takes `&cj=` (arbitrary content), `&who=` (the header's
identity), `&live=1` and `&today=`. Drive it with puppeteer-core on the cached headless shell
(`scripts/headless-shell.mjs`, the way `scripts/digest.mjs` does); one-off scripts live in the
scratchpad, not under `scripts/`.

---

## JP-035 / F1 — Kicker and Location reach only the header

> Kicker = "QK Kicker Singer", Location = "QLOC Leeds, UK". Published: the bio's foot line still
> prints "DJ · Live Act · Manchester, UK" (~1217 px) and the line under the enquiry form's
> portrait "DJ · Live Act" (~6249 px). Neither panel has a field for them. Control: Title reaches
> 11 places and leaves none behind.

**Verdict: already fixed; the report is against the build before the fix.** See the stale-build
note at the top for the two timestamps. The fix and its verification are written up under **F1**
in [`retro/qa-fixes.md`](../retro/qa-fixes.md): `headerIdentity()` in `data.js`, `sectionVm({
identity })`, `vm.roleLine`. That entry's real-app check already covered **Lime cards 1 and 3**
(canvas and published tab: 0 × "Manchester, UK", 0 × "Live Act" with the tester's values), so
this session is a confirmation on the tester's exact path, not work.

**Do.**
- `curl -sI https://siniiitsa.github.io/js-plus-prototype-2/` and record `Last-Modified`. It must
  be 18 Sep 12:15 GMT or later.
- On the **deployed** page, not the dev server: Lime → *Hero* → set the two fields to the
  tester's strings → *Publish* → *Open*. In the published tab count occurrences of
  `QK Kicker Singer`, `QLOC Leeds, UK`, `Live Act` and `Manchester, UK` at 1440. Expected: the
  old role **0**; the old town **only** inside the bio's *Paragraph 1* ("based in Manchester" is
  the artist's own prose, the F1 entry's named case — check whether the Lime seed says
  "Manchester, UK" there verbatim, because the tester counts strings and will count that one).
- Repeat at 390 (burger header) on the dev build.

**If anything still prints the seed**, it is a Lime-layout-1 seat the F1 sweep missed: grep the
`s.v0 && s.lime` blocks of `Bio`, `Calendar` and `EnquiryForm` for a literal `DJ`, `Live Act` or
`Manchester`, and for `DEFS.`/`cv('kicker'` reads that bypass `identity`. Fix it as F1 did and
say so under **Settled**.

**Docs.** None expected. The reply to the tester names the build stamp to retest against.

**Settled** (2026-09-18, verify only, no code changed).
- **Build stamp.** `curl -sI` on the Pages URL: `last-modified: Fri, 18 Sep 2026 12:15:15 GMT`,
  the build that carries `2fd4d23`. The tester's was 17 Sep 15:17:22 GMT.
- **Deployed page, the tester's path** (one puppeteer script, editor at 1600: Lime thumbnail →
  big card → the modal's first card, *Hero* → *Use this header* → Kicker and Location typed into
  the header's panel → *Publish* → *Open*, popup at 1440). Occurrences, case-folded, in the
  published tab: `QK Kicker Singer` **3** (header, bio, form), `QLOC Leeds, UK` **2** (header,
  bio), `Live Act` **0**, `Manchester, UK` **0**. The canvas's eleven roots give the same four
  counts. The two leaves the tester named sit at the tester's own offsets: the bio's foot line
  reads "QK Kicker Singer · QLOC Leeds, UK" at **1217 px**, and the form's credit
  "QK Kicker Singer" at **6249 px**. The calendar's Lime layout 1 prints neither string. No
  page errors in the editor, none in the popup from the resize on (the listener was attached
  after first paint; the sweep does the full pass); `scrollWidth` equals 1440.
- **Dev build** (`main` at `7e15144`, same script): identical counts at 1440 and at **390**
  (popup `setViewport` plus a dispatched `resize`; the header's ten fragment links collapse to
  one, the burger's state — that count is the probe; `svg.lucide-menu` matched nothing at either
  width, so do not copy it). At 390 the two leaves are at 1548 px and 8447 px, `scrollWidth`
  equals 390, no page errors.
- **The "Manchester, UK" the tester might still count does not exist.** The Lime seed never says
  it verbatim outside the header's Location default. A bare `Manchester` survives **9** times
  and all nine are the artist's own copy, each editable in its own panel: the bio's
  *Paragraph 1* ("based in Manchester", F1's named case) 1, the media player's track
  "Manchester at 3am" 1, the map's heading, "Based in Manchester" and four gig cities 6, and the
  form's promise "Covers 120 mi from Manchester" 1. The reply to the tester should name these,
  since a plain-text search for the town still finds them.
- **No Lime-layout-1 seat was missed**, so the grep the entry keeps in reserve was not needed.
- The one-off script lived in `source/scripts/` (where `puppeteer-core` resolves) and is deleted.

---

## JP-034 — the media player's SOUNDCLOUD pill is a dead span

> Nothing edited, *SoundCloud link* empty (the default). Published, under the track list: a lime
> pill SOUNDCLOUD ↗ that is a `<span>` — no `<a>`, no `<button>`, `cursor: auto`. Figma
> 964-58587 draws BOOK NOW in that seat. There is a link field but no label field, so the artist
> can neither rename nor remove it. Falsifying check: emptying the calendar's *Button* removes
> CHECK A DATE, so "empty = hidden" exists in the product and this pill falls outside it.

**Verdict: confirmed, and it is documented behaviour on three levels.**

**Evidence.**
- Lime layout 1's block (`Media`, `if (s.v0 && s.lime)`, `EncoreSection.jsx:~4493`) draws
  `<BookPill s={s} label="Soundcloud" ext={s.soundcloud} fg={s.box1} full={s.mob} />` at
  `:~4663`. `BookPill` with an empty `ext` and no `to` is a span.
- The block's own comment (`:4490`–`4492`) names the label as a deliberate departure: *"The pill
  says Soundcloud, not the frame's 'Book Now': it is the section's Soundcloud link, and the
  frame's label is the shared pill component's default."* So the tester's reading of the frame is
  right, and the code chose otherwise on purpose.
- The field's hint (`data.js:905`): *"Leave empty and it stays a picture."* `in: [0]` — it
  reaches layout 1 alone.
- `CLAUDE.md` cites the "Soundcloud rule" (an unfilled outbound seam stays a picture, as opposed
  to the gallery's hide-the-empty-row rule) about twenty times, for the gig rows, the enquiry
  form's submit, the calendar's `time`, the footer's `link` rows.
- Retro's and the flat three's layout 1 (`:~4839`–`4854`) draw the same pill by the same rule.
  **The frames disagree per template:** Retro's frame `446:2265` literally draws a Soundcloud
  pill (the comment there describes it as "the inverse of the Book Now pill"); Lime's draws Book
  Now. Re-read both nodes at the start of the session to confirm before building on it.
- One later branch already renders the pill **only when filled**: `{s.soundcloud && (…)}` at
  `:~6689`, with the comment "so a layout switch never grows a button that leads nowhere".

**Why the tester's check holds.** The calendar's pill drops when its *label* is emptied; here
there is no label to empty and no target by default, so a fresh page publishes a button that
does nothing, in the template's accent colour, directly under the player. The F25 convention
says a *label* with nothing to point at is dropped from the published page while a *pill* stays
a span — but every other pill that rule covers resolves to something on a seeded page (`bookTo`
finds the form). This is the one pill that is dead **on the seed**.

**Decision needed.** Options:

- **A. In Lime, the seat is the frame's Book pill; Soundcloud appears only when filled
  (recommended).** Inside the `s.v0 && s.lime` block only: the pill becomes
  `BookPill label={s.mediaCta} to={s.bookTo}` from a new `FIELDS.media.cta` (`d: 'Book Now'`,
  `in: { Lime: [0] }`, "Empty drops the button" — the footer `cta`'s rule, uncased like
  `vm.footerCta`). `media` is not in `CTA_TARGETS.book`, so `vm.bookTo` needs no self-exclusion.
  The Soundcloud address keeps working: when filled, a second pill beside it, the `:6689` rule.
  The default picture becomes the frame's, the default pill scrolls to the enquiry form, and the
  artist can rename or remove it. Retro's `:4843`–`4853` is untouched, because its frame *is* a
  Soundcloud pill. Cost: a second pill's seat has to be laid out at three widths with no frame
  to read it from (the 390 pill is `full`), and Retro's layout 1 keeps the dead span — name it
  under **Settled** as Retro's frame-faithful state, or take B for Retro in the same commit.
- **B. Hide when empty, published only; canvas keeps it.** One line per block
  (`s.live && !s.soundcloud ? null : pill`), both blocks, every template. It is F25's
  canvas-keeps / published-drops rule extended to the one pill that is dead on the seed. Cost:
  it does not give the tester BOOK NOW, the default Lime page publishes with no pill where the
  frame draws one, and the artist still cannot rename it.
- **C. A label field on the existing pill.** `soundcloudLabel`, `d: 'Soundcloud'`, empty drops
  it on both surfaces. Answers "cannot rename, cannot hide"; leaves the default page publishing
  a dead span.
- **D. A + B.** Lime takes A; Retro and the flat three take B. Every template stops publishing a
  dead pill, each stays on its own frame.

**Fix (if A or D).**
- `data.js`: the `cta` field in `FIELDS.media` after `soundcloud`; rewrite `soundcloud`'s hint
  (it no longer "stays a picture" under Lime — say what it does per the decision).
- `sectionVm`: `vm.mediaCta = cv('cta', 'Book Now')` beside `vm.soundcloud` (`:~523`), with the
  comment in that block's style. `EncoreSection` composes nothing.
- `EncoreSection.jsx`: the Lime block's pill row; rewrite the comment at `:4490`–`4492` — the
  departure it names is gone.
- `fieldReach`: measure `cta`'s and `soundcloud`'s `in` the F2 way (sentinel in `&cj=`, compare
  `#root.innerHTML`, three widths, both surfaces) rather than reading it off this plan.
- Check the `EditPanel` note "Not shown in this layout" appears for `cta` on Retro and on Lime
  layouts 2–4.

**Verify.**
- Lime, layout 1, `live=1`, three widths: with the seed the pill is an `<a>` whose href is the
  form's fragment and the published click scrolls there (drive it from the opener — memory note
  `verifying-the-published-tab`); with `cj={"cta":""}` no pill; with a Soundcloud address a
  second `<a target="_blank">` and no overflow at 390 (`scrollWidth` equals the width).
- Canvas: no `href` on either pill (`navHref()`'s gate).
- Digest, `media`, themes 0, 1, 2, three widths, both surfaces: **Lime layout 1 moves** (the
  label text, and the element type under `live=1`) and nothing else does — unless D, where
  Retro's and Grunge's `live=1` layout 1 lose the pill and their canvases do not move.
- A page with no form, calendar or pricing: the Lime pill is a span again. That is the F25
  convention's pill rule and is accepted; say so under **Settled**.

**Docs.** `CLAUDE.md`'s `s.live` bullet ("the media player's Soundcloud button" among the four
sets of outbound links) and the media-player paragraph; the `FIELDS.media.soundcloud` comment and
hint; the Lime block comment; [`layout-1.md`](./layout-1.md)'s media entry, which records the
"Soundcloud, not Book Now" departure. **The name "Soundcloud rule" survives**: the gig rows, the
form's submit and the rest still follow it, so do not rename it across the docs — add one
sentence where it is first defined saying the button it is named after no longer does under
Lime.

**Decision.** **A** (user, 2026-09-18), after the re-read confirmed the frames disagree: Retro's
`446:2265` is a literal SOUNDCLOUD pill, and Lime's media frame `964:58590` (the section inside
page `964:58587`) draws BOOK NOW → under the track list. Lime layout 1 takes the frame's Book
pill from a new `cta` field; Soundcloud is a second pill, only when filled. Retro and the flat
three are untouched.

**Settled** (2026-09-18).
- **What changed.** `FIELDS.media.cta` (`d: 'Book Now'`), `vm.mediaCta = cv('cta', 'Book Now')`
  (uncased, `vm.footerCta`'s rule), and the `s.v0 && s.lime` block's pill seat: a wrapping flex
  row of `BookPill label={s.mediaCta} to={s.bookTo}` and, when `s.soundcloud` is filled, a second
  `BookPill label="Soundcloud" ext=…`, both `fg={s.box1}` and `full` at 390. **The caller drops
  the pill, not `BookPill`** — `label ?? s.cta1` would turn `''` into a wordless pill — and with
  neither pill the row is not drawn, since `col` would spend its gap on it (the section is 72px
  shorter at 1440, 94 at 768 and 390). Retro's and the flat three's block is untouched.
- **`in`, measured** (sentinel in `&cj=`, `#root.innerHTML`, themes 0/1/2 × four layouts × three
  widths × both surfaces). `cta` moves Lime layout 1 alone, on both surfaces. `soundcloud` moves
  layout 1 alone: both surfaces under Lime (the pill appears), **`live` only** under Retro and
  Grunge (span → a; the canvas is the same picture). So `soundcloud` stays `in: [0]`. The
  `{s.soundcloud && …}` the Evidence cites at `:~6689` is in the **unreachable fallthrough**
  after `v3`, not in layout 4: no reachable design but layout 1 reads the address.
- **`cta`'s `in` is `{ Lime: [0], '*': [] }`, and the `'*'` row is load-bearing.** `fieldReach`
  leaves a template the object does not cover *unmarked* (the flat three's header), so
  `{ Lime: [0] }` alone would print no note on Retro. Checked in the real editor: the media
  panel under Lime layout 1 lists *Button* with no note, the same panel under Retro prints "Not
  shown in this layout" under it; `fieldReach` called directly gives Lime `true false false
  false`, Retro and Grunge all `false`.
- **Digest**, `media`, themes 0, 1, 2, three widths, canvas and `live=1` (72 renders a side):
  exactly the six **Lime layout 1** files move — the wrapper SPAN is a DIV, the pill is 15.5px
  narrower at 1440 (14 at 768 and 390; "Book Now" for "Soundcloud") at the same x, y and
  height, and under `live=1` it is an `A`. Retro and Grunge: zero files, both surfaces.
- **Harness states**, Lime layout 1, three widths. Canvas: no `href` on either pill. `live=1`:
  seed → one `<a href="#form">`; `{"cta":""}` → no pill; a schemeless Soundcloud address → a
  second `<a href="https://…" target="_blank">` 12px to the right on the same line, 304px of
  pills in the 390 column, the section's `scrollWidth` equal to its width everywhere.
- **Real app** (the JP-035 puppeteer path: Lime → *Hero* → *Use this header* → *Publish* →
  *Open*; popup at 1440, 768, 390 by `setViewport` plus a dispatched `resize`). A trusted click
  on the pill leaves the enquiry form's top at **0**, the popup still `about:blank`,
  `scrollWidth` equal to the width, no Soundcloud pill in `#media`, no page errors in either
  window.
- **Accepted: a page with no form, calendar or pricing publishes the Lime pill as a span.**
  Measured by deleting the three in the real editor. That is the F25 convention's pill rule
  (a *label* with nothing to point at is dropped, a *pill* stays a picture), and unlike the old
  Soundcloud pill it is not the seeded state — the artist has removed every place to book.
- **Accepted: Retro and the flat three still publish a Soundcloud span on the seed.** That is
  Retro's frame-faithful state (`446:2265` is a literal SOUNDCLOUD pill) and the user chose A
  over D. The tester's report is against Lime; if it is re-filed against Retro, option B is one
  line in that block.
- **No frame draws the second pill.** It is the same lime pill twice; nothing marks Soundcloud
  as secondary. Named here as the design's open seat rather than invented.
- One-off scripts lived in `source/scripts/` and are deleted. `index.html` not refreshed.

---

## JP-033 — the header nav prints section type names

> Lime → *Hero*, nothing edited, published at 1440. Expected (Figma 964-58587), 8 links: ABOUT ·
> TOP TRACKS · MEDIA · REPERTOIRE · SHOWS/COVERAGE · PRICING · ENQUIRIES · REVIEWS. Actual, 9:
> BIO · MEDIA PLAYER · GALLERY · REPERTOIRE · EVENTS MAP · PRICING · BOOKING CALENDAR · ENQUIRY
> FORM · TESTIMONIALS. The footer's eight default labels match the frame exactly. Same labels in
> the burger at 768 and 390, and in Retro's preview on the start screen. Falsifying checks: a
> section's Kicker moves neither list; reordering the page moves the header and not the footer.

**Verdict: confirmed, and the tester's "Related" is right — it is the header component, in every
template.** The nav prints the *editor's* name for each section (`catName`, the sidebar's words)
on the *visitor's* page.

**Evidence.**
- All four builders of `navSections` write `label: catName(cat)`:
  `EncoreBuilder.jsx:~3564` (`PublishedPage`), `:~3777` (the editor), `:~3291` (`previewNav`,
  which is why the start screen's Retro card shows it), and `preview.jsx:58` (the harness).
- `vm.navLinks` (`EncoreBuilder.jsx:~448`) maps them through unchanged in `sections` mode.
- `FOOTER_LINKS` (`data.js:553`) already holds the frame's eight words against the eight
  categories: About→`bio`, Top Tracks→`media`, Media→`gallery`, Repertoire→`repertoire`,
  Shows/Coverage→`map`, Pricing→`pricing`, Enquiries→`form`, Reviews→`testimonials`. No
  `calendar`.
- Row 1 of SPEC's decisions table (`git show 8fa8ff4:SPEC.md`, line ~1886) asked exactly this —
  *"The reference designs list real sections (About, Top Tracks, Media, Repertoire,
  Shows/Coverage, Pricing, Enquiries, Reviews)"* — and answered "Yes — `navMode: 'sections'`".
  The decision was about **following the page**; the labels fell out of the implementation as
  `catName`, which nobody chose.
- The ninth link is the calendar: the seeded page carries it, the frame's nav does not.

**Two consumers move with the label and are intended diffs, not regressions:**
- `vm.calFlow` (`:~1011`) prints `cased(n.label)` in calendar layout 2's head — "Booking
  Calendar · Pricing · Enquiry Form" becomes the visitor's words there too. Read that frame's
  three labels before deciding the calendar's word; they may settle it.
- Lime's `vm.navEms` (`:~456`) sums `bebasEms()` over the labels and sizes the capsule's type.
  The new set is shorter, so the links can only grow back toward `s.labelSm`. `BEBAS_EM` already
  carries `/` (0.389), so "Shows/Coverage" measures; nothing to add. `navNameEms` / `navCtaEms`
  do not move.

**Decision needed.** Options:

- **A. A visitor-facing word per category, one source for header and footer (recommended).**
  `CATS[]` gains `nav` (`{ id: 'bio', name: 'Bio', nav: 'About', … }`) and `data.js` a
  `navLabel(id)` beside `catName(id)`, falling back to the name. The four `navSections` builders
  call it; `FOOTER_LINKS` seeds its labels from it (`{ label: navLabel('bio'), to: 'bio' }`), so
  the tester's "no shared source" closes at the seed while the footer rows stay the artist's to
  edit. `catName` keeps every editor-side use (sidebar, toasts, layout names, `FOOTER_TARGETS`'
  select — that one is editor chrome and should keep saying "Events Map"). The nav still follows
  the page's order and presence, which the tester observed working and SPEC decided.
- **B. A `LinksField` repeater on the header, seeded with `FOOTER_LINKS`.** Fully editable
  labels. Cost: the nav stops following the page — a reorder or a delete no longer reaches it
  without the artist's help — which undoes SPEC's decision and the F25 machinery would have to be
  repeated for a second list. A third `navMode` option ("Custom") is the way to have both; it is
  a feature, not this bug.
- **C. Hints only.** Leaves the visitor's page saying EVENTS MAP.

**Sub-decision under A — the calendar.** The frame's nav and the footer's seed both omit it;
the seeded page carries it.
- **A1 (recommended).** Give it a word (`Availability`, or whatever calendar layout 2's frame
  calls itself in its own flow list) and accept the ninth link as the named diff from the frame:
  a section the visitor cannot reach from the nav is a worse defect than a nav one item longer
  than the picture, and `navEms` exists precisely so nine fit.
- **A2.** `nav: null` leaves a category out of the header nav (it stays a Book Now target). Eight
  links, the frame's picture, and the calendar is reachable only by scrolling or via the form's
  neighbours. If A2, `calFlow` must not lose its leading entry — it needs the calendar's label
  from somewhere other than `navSections`.

**Fix (if A).**
- `data.js`: `CATS[].nav`, `navLabel()`, `FOOTER_LINKS` re-seeded from it (check `linksVal` in
  `EditPanel` resolves the same array — the seed-resolver rule), and the §4.3a comment block.
- The four builders. Consider one exported `navSectionsOf(cats)` in `data.js` so the editor,
  `PublishedPage`, `previewNav` and `preview.jsx` cannot drift again; all four are the same
  filter-and-map.
- `key={l.label}` in the nav maps (`EncoreSection.jsx:502`, `:525`, `:1168`, `:1180`, `:1469`,
  `:1678`, …): the nine words must stay distinct. "Media" (gallery) beside "Top Tracks" (media
  player) is distinct; confirm nothing collides with Minimal's Music / Shows / Book, which are a
  different mode and never share a row.
- `navMode`'s option label "Follow my sections" still says the truth. Add a hint naming where
  the words come from only if the panel needs it.
- `CLAUDE.md` says of layout 2's 768 master: *"the seeded eleven sections give nine — 765px of
  type in a 688px canvas"*. Re-measure with the new words and rewrite the number, or the
  conclusion if nine now fit.

**Verify.**
- Published, Lime layout 1, 1440: the eight frame words plus the calendar's, in page order; the
  burger panel at 768 and 390 lists the same; each click scrolls to its section (drive from the
  opener).
- Reorder and delete a section: the nav follows, as before. Minimal mode is byte-identical.
- All four Lime header layouts and all six Retro ones, plus one flat theme, three widths, both
  surfaces: no second row in Lime's capsule (layouts 1 and 2 size off `navEms`), no overflow
  (`scrollWidth` equals the width), burger below `desktop` unchanged in structure.
- The start screen's template cards and the setup modal's four header cards show the new words.
- Calendar layout 2, all themes: `calFlow`'s head links read the new words, the calendar's own
  entry still leads and still does not link to itself.
- Digest: `header` moves in **every** theme and layout at desktop (link text; under Lime the
  computed link size as well) and in the burger panel where a digest opens it; `calendar` layout
  2 moves; `footer` must be **byte-identical**, which is the proof the re-seed kept its words.
  Nothing else moves.

**Docs.** `CLAUDE.md`'s header-nav bullet (`navSections` is `{ cat, label }` — say whose words
the label is) and the layout-2 768 sentence above; `data.js`'s §4.3a block and the `CATS` comment;
README's nav paragraph if it names `catName`.

**Decision.** **A**, and under it **A1 with "Availability"** (user, 2026-09-18), after reading
calendar layout 2's Lime frame `964:64593`. Its head lists "● Available dates · Packages ·
Enquire" — the flow's **own** vocabulary, not the nav's: the frame's nav and footer say Pricing
and Enquiries where the flow says Packages and Enquire, so the frame offers a word for the
calendar and does not settle the other two. "Availability" is the section's own default heading
(`TITLES.calendar`) and that frame's column head, and three glyphs shorter in a nine-link
capsule. The ninth link is the named diff from the frame's eight, and `calFlow` reads
"Availability · Pricing · Enquiries", the nav's words, as a named diff from its frame's three.

**Settled** (2026-09-18).
- **What changed.** `CATS[].nav` on the nine linkable categories, `navLabel(id)` beside
  `catName(id)`, and one `navSectionsOf(cats)` in `data.js` that the editor, `PublishedPage`,
  `previewNav` and `preview.jsx` all call — it takes category **ids**, because the four callers
  hold three shapes. `FOOTER_LINKS` is eight ids mapped through `navLabel()`, the same array
  `linksVal` and `sectionVm` both import. `catName` keeps every editor-side use: the sidebar still
  reads "Media Player", "Events Map", and so does `FOOTER_TARGETS`' select. `EncoreSection` gained
  no code, only a re-measured comment. The nine words are distinct, so `key={l.label}` holds.
- **Which templates move: Retro and Lime — not "every one".** The entry's Verdict was wrong about
  the flat three: their header is `FlatNav`, which **hardcodes Music / Shows / Book** and never
  read `navLinks`, so Grunge's header digest is zero files on both surfaces, in both modes. The
  flat three move only in calendar layout 2. Named for the sweep, not fixed here: `FlatNav`'s
  three links carry literal `#music` / `#shows` / `#book` hrefs on both surfaces, which is the
  dead-fragment shape `navHref()` was written to remove, and `navMode` edits nothing under a
  flat theme.
- **Digest** (all categories, themes 0, 1, 2, three widths, canvas and `live=1`, 387 renders a
  side, BEFORE on a clean HEAD). Moved, identically on both surfaces: `header` × Retro's six and
  Lime's six arch rows at **desktop** (12), Retro header layouts 5 and 6 at **tablet** (2 — they
  are `NavLinks`, which draws the link row down to 768 and the burger only at 390; `CLAUDE.md` said
  "all six Retro layouts" collapse below desktop; corrected in this commit, with the two
  `EncoreSection` comments that repeated it), and
  `calendar` layout 2 × three themes × three widths (9). **`footer`: zero files**, the proof the
  re-seed kept its words. Nothing else moves. Minimal mode (`&cj={"navMode":"minimal"}`, header,
  54 renders a side, both surfaces): **zero files**.
- **What the moves are.** Link text and the x positions after it; every root height is unchanged.
  Lime layouts 1 and 4: the links grow from 18.64px back to `s.labelSm`'s **20px**, one row,
  ending at the same right edge (1036). Lime layouts 2 and 3: 15px before and after, one row,
  the row 53px shorter. Retro: one row in every layout, and layout 6's desktop row, which
  wrapped to two before, is now one. Calendar layout 2: the flow block is 37px narrower at
  desktop and reads "● Availability / Pricing / Enquiries"; the leading entry is still a span.
- **Accepted: calendar layout 2's seeded head now says "Availability" three times** — the flow's
  leading entry, the `H2` (`TITLES.calendar`; the frame's own head is "Find a date that works
  for your event") and the column head "Availability ↓". The last two were already there. The
  user chose the word knowing it is the section's default heading; the heading is a field.
- **The 768 sentence, re-measured** (Retro layout 2's own links set to the master's 16px in the
  harness and read off `getBoundingClientRect`): **576px of type, 720 with the capsule's eight
  18px gaps**, against 651 / 795 for the old names by the same method. Still over a 688px canvas
  that also seats the wordmark, Listen and the pill, so the burger holds at 768 and the
  conclusion stands. `CLAUDE.md` and the `HeaderV1` comment carry the new numbers.
- **Real app** (the JP-035 path, dev build). Start screen, Retro and Lime spotlights: 0 × each
  of the five old names, 3 × "Top Tracks" / "Shows/Coverage" / "Availability". Setup modal: four
  cards, 0 × old names, each card listing the words in **its own page order** (card 2 reads
  About · Top Tracks · Repertoire · Media …). Published, Lime *Hero*, 1440: About · Top Tracks ·
  Media · Repertoire · Shows/Coverage · Pricing · Availability · Enquiries · Reviews, each an
  `<a href="#cat">`; a click on each of the nine and on Book Now leaves its section's top at
  **0** (read 3 s after the click — at 1.2 s the smooth scroll to the last two was still
  running), the popup still `about:blank`, `scrollWidth` 1440. At 768 and 390 the closed header
  carries one fragment link, the burger panel lists the same nine in the same order, and
  Shows/Coverage scrolls the map to 7 / 0; `scrollWidth` equals the width. Deleting the media
  player and moving the events map up, then republishing: the nav drops Top Tracks and reads
  About · Media · Shows/Coverage · Repertoire …, the page's own order. No page errors in either
  window.
- **The ninth link is the named diff from the frame**, and the footer still lists eight: no
  calendar row was added to `FOOTER_LINKS`, so the two lists agree on the eight words and the
  header alone carries Availability.
- `npm run build` passes. One-off scripts lived in `source/scripts/` and are deleted.
  `index.html` not refreshed.

---

## End-of-pass sweep

1. Full digest against `main` (all categories, themes 0, 1, 2, three widths, canvas and
   `live=1`), served the Retro plan's way: base from a worktree with HEAD's `preview.jsx` and a
   cloned `node_modules`, port and `?t=` stamps normalised. The moved set must be exactly the
   diffs the two entries named.
2. Real app, Lime cards 1–4 and Retro card 1, 1600 and 390: *Publish* → *Open*, no page errors,
   `scrollWidth` equals the width, the nav scrolls, the media pill does what its entry settled.
3. `npm run build:standalone`, `cp source/dist-standalone/index.html index.html`, commit
   (`Refresh index.html for the Lime QA fixes`), PR, merge.
4. **After the merge, `curl -sI` the Pages URL until `Last-Modified` moves, and record the stamp
   here.** The tester keys every report to it; the F1 re-report happened because a fix and a
   retest crossed. The reply to the tester names the stamp to retest against, lists JP-033 and
   JP-034 with what each now does (including any accepted diff from the frame: the ninth nav
   link, a second pill), and says JP-035 was fixed by the 18 Sep 12:15 GMT build.
5. Update [`plans/README.md`](../README.md)'s Lime table row for this pass.

**Settled** (2026-09-18, steps 1–3 up to the push and step 5; the PR, the merge and step 4 are
the user's, see the last bullet).
- **The sweep found one defect, and it was JP-033's own commit.** `bb76030` left a comment's
  continuation line in `HeaderV2` without its `//` (`(5 and 6 keep NavLinks' row down to 768).`),
  so `EncoreSection.jsx` did not parse: the dev server answered 500 and the digest's HEAD side
  rendered 387 empty roots — every file "moved". That entry's "`npm run build` passes" was
  measured before the docs edit that broke it. Fixed in `86e46ba`, its own commit; `npm run
  build` and `build:standalone` pass on it. An all-files diff is a broken side, not a finding:
  `wc -l` the smallest file first.
- **Digest, `main` → HEAD** (all categories, themes 0, 1, 2, three widths, canvas and `live=1`,
  387 renders a side a surface; base from a worktree of `main` on :5190 with a cloned
  `node_modules`, port and `?t=` normalised). **The base ran `main`'s own `preview.jsx`, not
  HEAD's** — the Retro convention departed from on purpose: HEAD's harness imports
  `navSectionsOf`, which `main`'s `data.js` does not export, and the harness's only change is the
  label source, which is JP-033's intended move. Moved: **26 + 26 files, the same set on both
  surfaces**, and exactly the two entries' named diffs — `header` × Retro's six and Lime's six
  at desktop (12) and Retro layouts 5 and 6 at tablet (2), `calendar` layout 2 × three themes ×
  three widths (9), `media` Lime layout 1 × three widths (3). `footer`: zero. Grunge: calendar
  layout 2 only.
- **Real app, on the deliverable** — `source/dist-standalone/index.html`, the bytes that became
  the root `index.html`, served from `127.0.0.1:8931`; editor at 1600, one fresh editor and
  popup per run, popup at **1440 and 390** (`setViewport` plus a dispatched `resize`),
  `pageerror` and console-error listeners attached to both windows, the popup's on the `popup`
  event itself. Lime cards 1–4 and Retro card 1, ten runs. Every run: **no page errors in either
  window**, popup still `about:blank` after every click, `scrollWidth` equal to the width before
  and after, eleven sections. At 1440 every fragment link in the header (the nine nav words,
  Book Now, and cards 2 and 3's Listen and card 2's "Enquire about a date") leaves its section's
  top at **0**, read 3 s after a trusted click. At 390 the closed header carries only its pills,
  the burger opens, its panel lists the same nine words in the page's order, and each leaves its
  section at **0** (scrolled back to the top and the burger reopened between clicks). The nine
  words follow each card's own page order (card 2: About · Top Tracks · Repertoire · Media ·
  Pricing · Availability · Shows/Coverage …). **Media pill:** Lime card 1 publishes one
  `<a href="#form">` "Book Now", no Soundcloud pill, and a click leaves the form at 0, at both
  widths; Lime cards 2–4 draw no pill (their layouts never did); Retro card 1 publishes the
  `SPAN` "Soundcloud" JP-034 accepted. The modal's cards are picked by index
  (`[role=dialog] button[aria-pressed]`), since two of the four labels now start
  `KAI MERCER ABOUT`.
- **"1600 and 390" was read as the popup's widths** (with 1440 for the wide one, the entries'
  own). Publishing from the editor's phone chrome was not driven; nothing on this branch touches
  the chrome.
- **Docs audit.** `CLAUDE.md`'s media-player and header-nav paragraphs, `layout-1.md`'s media
  entry (the "Soundcloud, not Book Now" departure is struck through and reversed) and README's
  nav paragraph were all rewritten by their entries; nothing left to correct.
- **Named, not fixed: `FlatNav`'s dead fragments** (JP-033's *Settled*). The flat three's header
  hardcodes Music / Shows / Book on literal `#music` / `#shows` / `#book` hrefs on both surfaces,
  and `navMode` edits nothing there. It predates the branch, no report names it, and fixing it
  here would add moves to a digest whose premise is "exactly the named set". A follow-up of its
  own, beside the seven unreachable NVAR-4 fallthroughs the Retro sweep named.
- `index.html` refreshed in `3f07358` (6,958,977 bytes against 6,958,675). One-off scripts lived
  in `source/scripts/` and are deleted; the worktree is removed.
- **`gh` is not installed on this machine**, so the branch is pushed and the PR and merge are
  the user's. Step 4 follows the merge: `curl -sI https://siniiitsa.github.io/js-plus-prototype-2/`
  until `last-modified` moves past `Fri, 18 Sep 2026 12:15:15 GMT`, and write the stamp below.
  Any later push to `main` redeploys and moves it again, so the reply asks for that stamp **or
  later**, not for an exact match.

**Reply to the tester** (fill in the stamp):

> Retest against a build whose `Last-Modified` is `<stamp>` or later.
> - **JP-035** — fixed by the build of Fri, 18 Sep 2026 12:15:15 GMT; your report was against the
>   17 Sep 15:17 build. With your values the published page prints "QK Kicker Singer" 3×,
>   "QLOC Leeds, UK" 2×, "Live Act" 0× and "Manchester, UK" 0×. A plain search for "Manchester"
>   still finds 9, all the artist's own copy and each editable in its panel: the bio's
>   Paragraph 1, the track "Manchester at 3am", the map's heading, "Based in Manchester" and four
>   gig cities, and the form's promise "Covers 120 mi from Manchester".
> - **JP-034** — Lime's media-player pill is the frame's BOOK NOW: a link that scrolls to the
>   enquiry form, with a new *Button* field in the Media Player panel; emptying it removes the
>   pill. A Soundcloud pill appears beside it only when *SoundCloud link* is filled (no frame
>   draws that second pill — an accepted diff). Retro's frame draws a Soundcloud pill, so Retro
>   is unchanged.
> - **JP-033** — the header nav prints About · Top Tracks · Media · Repertoire · Shows/Coverage ·
>   Pricing · Availability · Enquiries · Reviews, in the page's order, at all three widths, on
>   the start screen and in the setup modal. The ninth link, Availability, is a deliberate diff
>   from the frame's eight: the seeded page carries a booking calendar and the nav should reach
>   it. The footer's seed uses the same words (it still lists eight). Grunge, Editorial and Pop
>   keep their fixed Music / Shows / Book nav.

**Deployed build stamp:** *(to fill in after the merge)*

---

## Conventions learned on this pass

- **A field one template reads is `in: { Name: […], '*': [] }`.** Without the `'*'` row
  `fieldReach` leaves every other template unmarked (JP-034).
- **A caller that wants "empty drops the pill" tests the label itself.** `BookPill` falls back to
  `s.cta1` only on a nullish label and draws `''` as a wordless pill (JP-034).
- **The real-app path, as a script** (JP-035, reused in JP-034): buttons are found by
  `aria-label || innerText` — `^Lime$`, `^Open the editor with the Lime`, the modal's first card
  `^KAI MERCER ABOUT` (it was `^KAI MERCER BIO` before JP-033: a card's label is its nav's
  words), `^Use this header`, `^Publish$`, `^Open`, and the popup off
  `page.once('popup')`. A section's panel is `^Back to page list` then its row
  (`^Media Player Media Player`), and the panel's own `^Delete$` removes it.
- **Collapse whitespace before matching a button's label.** `innerText` puts a newline between
  a row's two lines, so `^Media Player Media Player` only matches after `.replace(/\s+/g, ' ')`
  (JP-033).
- **Read a nav click's scroll 3 s after it, not 1 s.** The published tab scrolls smoothly, and a
  jump to the foot of a Lime page was still 17–41px short at 1.2 s (JP-033).
- **The flat three's header nav is a constant.** `FlatNav` reads neither `navLinks` nor
  `navMode`, so a nav fix moves Retro and Lime only; check the digest before writing "every
  template" into a commit (JP-033).
- **Build after the last docs edit, not before it.** JP-033 measured `npm run build`, then
  reworded a comment and dropped a `//`; the branch did not parse until the sweep. A digest in
  which *every* file moves is a side that failed to render (sweep).
- **Serve the digest's base with its own harness when HEAD's harness imports something the base
  lacks.** The Retro convention (copy HEAD's `preview.jsx` into the worktree) assumes the
  harness changed independently of the code; here it calls `navSectionsOf` (sweep).
- **Pick a setup-modal card by index.** Cards 1 and 4 share a page order, so their labels are
  the same string (sweep).
