# Retro QA fixes — bug-by-bug plan

Working checklist for a batch of QA reports against the Retro template. It works like the layout
plans: **one bug per session, with context cleared between sessions**, and each session writes
what it settled back into this file. Unlike the layout plans, nothing here is fitted to Figma. Each
entry is a behaviour defect, and the fix has to leave every fitted picture unchanged unless the
entry says otherwise.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then the memory
notes `verifying-the-published-tab` and `browser-tool-choice`. The layout plans' *Conventions* are
background. Read them only where an entry points you to one.

Branch: **`artist-name-from-title`**. Every fix goes on this branch as its own commit, and no new
branch is cut. The branch already carries one QA fix: `0e93400` derives the artist's name from the
header's Title (reported as "name hardcoded", not numbered in this list).

**Report IDs are the tester's own** (F2, F4, …). The gaps belong to reports that were not handed
over, so do not renumber.

## Status

| Order | ID | Report (short) | Verdict | Size | Decision needed? | Status |
|---|---|---|---|---|---|---|
| 1 | F4 | Long venue name widens the gig cards on mobile | **Confirmed**: layout 1 (spaced name) and layout 2 (one long word) | S | no | **done** |
| 2 | F10 | An empty media player shows the hardcoded "Night Rain" | **Confirmed** | S | no | **done** |
| 3 | F2 | Four fields edit nothing in layout 1 | **Confirmed**, and it is one case of a wider class | M | **yes** | **done** (A) |
| 4 | F9 | Enquiry form can lose every box, Email included | **Confirmed** | S | small | **done** (block and explain) |
| 5 | F18 | Link fields don't validate (`not a url`, `javascript:`) | **Confirmed** | M | small | **done** (drop `//host` and `localhost`) |
| 6 | F25 | Footer link to a deleted section stays as a dead label | **Confirmed**: currently *documented as intended* | S | **yes** | **done** (A) |
| 7 | F24 | Delete has no confirm or Undo, and re-adding resets the content | **Confirmed** | M | **yes** | **done** (A) |
| 8 | F20 | Published calendar lets a visitor pick a past date | **Confirmed**: collides with a documented rule | M | **yes** | **done** (A, opens on max(open, today)) |
| 9 | F15 | Photo over ~4 MB is ignored silently | **Not reproduced as stated**: see entry | S | **yes** | **done** (three changes, 4 000 000 bytes) |
| 10 | — | End-of-pass sweep | — | S | yes (three) | **done** |

**Why this order:** the self-contained render fixes come first (F4, F10), then the editor-side
fixes. F18 goes before F25 because both touch how a footer row's target resolves. F24 goes before
F20 and F15 because it adds state to `st`. F15 is last because its first step is agreeing what the
bug is.

**"Decision needed"** means the entry lists options with a recommendation. The session starts by
asking the user (one `AskUserQuestion`) and records the answer here before writing code.

## How each session runs

1. Read the entry. Re-check the *Evidence* line numbers: they are from the triage and will drift.
2. If the entry needs a decision, ask for it and record it under **Decision**.
3. Fix, then verify at **all three widths** and on **both surfaces** (canvas and `live`) wherever
   the entry touches `EncoreSection`.
4. **Retro first, but not Retro only.** Most of these seams are shared: `sectionVm`, `EditPanel`,
   `extUrl`, the `v0` branches Lime draws inside. Check Lime (theme 1) and one flat theme
   (theme 2) for every shared change, and say so in the commit if one of them moves.
5. Update the docs the entry names. Several of these bugs are behaviours that `CLAUDE.md` *states
   as intended*, so a fix that changes the behaviour without rewriting that paragraph leaves the
   docs lying.
6. Commit one bug per commit (`Fix F4: …`), fill in **Settled** and the status row, then stop and
   print the hand-off prompt for the next entry.

**Do not refresh the root `index.html` per bug.** The sweep does it once.

### Verification harness

`source/src/preview.jsx` can seed only list-shaped content (`&n=`) and a few named keys. The
triage needed arbitrary content (a 40-character venue), so it used a throwaway copy that took
`&cj=<url-encoded JSON>` and merged it into `c`. **Session 1 should add `&cj=` to `preview.jsx`
itself**: a few lines after the existing `c` is built (`const c = { ...c0, ...cj }`), plus a
comment in the file's own style. Later entries lean on it. Drive the harness with puppeteer-core on
the cached headless shell (`scripts/headless-shell.mjs`), the way `scripts/digest.mjs` does, and
keep one-off scripts in the scratchpad, not under `scripts/`.

---

## F4 — a long venue name widens the gig cards on mobile

> At Mobile width, a venue name longer than ~35 characters pushes the gig cards past the screen edge.

**Verdict: confirmed, in two layouts, for two different reasons.** Measured in the harness at 390
(document `scrollWidth`):

| Venue | L1 | L2 | L3 | L4 |
|---|---|---|---|---|
| seed / ≤ 30 chars | 390 | 390 | 390 | 390 |
| 35 chars, spaced | 391 | 390 | 390 | 390 |
| 41 chars, spaced (`The Old Royal Victoria Concert Hall Annex`) | **437** | 390 | 390 | 390 |
| 39 chars, one word (`Kulturzentrumschlachthofwerkstattbuehne`) | **446** | **395** | 390 | 390 |

Canvas and `live=1` measure the same. Layouts 3 and 4 have decorative spans past the edge in
the baseline too (the radial map's ring labels), but they are clipped and do not move
`scrollWidth`.

**Evidence.**
- *Layout 1* (`EventsMap`, `s.v0`, the gig list near `EncoreSection.jsx:14240`): the venue span is
  already `nowrap` + `ellipsis`, and its own column is `minWidth: 0`. The widening happens higher
  up. The topmost overflowing boxes are the two cards ("Based in Manchester…" and "Upcoming gigs
  · 2 …"), both 415 wide, so an ancestor between the row and the section still has
  `min-width: auto` and takes the nowrap string's full width as its minimum. Find it by walking
  up from the row. The likely suspects are the card and the grid/flex cell that holds it.
- *Layout 2* (`s.v1`, the featured panel's `<h3>{g.venue}</h3>` near `:15040`, and the rows): a
  word with no break opportunity sets the panel's min-content width. There is no
  `overflowWrap`.

**Fix.**
- L1: put `minWidth: 0` on the ancestor that is missing it. Do not add a second ellipsis. The
  row's existing one is the design's answer and simply was never allowed to engage.
- L2: `overflowWrap: 'anywhere'` on the featured venue (a display head wraps, it does not
  ellipsise) and on any list row that prints the venue unclipped.
- Sweep the same two strings (`g.venue`, `g.city`) through L3 and L4 and through Lime's blocks in
  all four layouts with the one-word name. The table above covers only Retro.

**Verify.** Re-run the table, plus Lime, at 390, and also at 768. `scrollWidth` must equal the
width everywhere. The seeded picture must not move: diff with `scripts/digest.mjs` for
`map`, themes `0,1`.

**Docs.** None expected, unless the L1 cause turns out to be a shared helper.

**Settled.** 2026-09-17.
- **Harness.** `preview.jsx` takes `&cj=<url-encoded JSON>`, applied *last* with
  `Object.assign(c, …)`, so it overrides `&n=` and the other named keys. Rows it supplies are whole
  rows.
- **The re-run was wider than the triage table.** With the long venue on gigs 1 and 2 (one
  featured, one in the list), layout 2 overflowed with *spaced* names too (462 / 517 at 390), and
  also at 768 (981 with the one word; Lime 783 with 41 spaced characters). A one-word **city**
  (`Llanfairpwll…`, 39 characters) broke both layouts as well. Lime's layout 1 was already
  clean.
- **L1 cause: the grid, not a flex cell.** The tile/list grid was `1fr` / `1fr 1.15fr`, which is
  `minmax(auto, …)`, so each track floored at its content's min-content, and that was the
  venue's whole nowrap string. It is now `minmax(0, 1fr)` / `minmax(0, 1fr) minmax(0, 1.15fr)`,
  the same columns Lime's layout-1 block already had. The row's own ellipsis now engages. The
  city · time line gained `overflowWrap: 'anywhere'`.
- **L2, Retro/flat and Lime alike:** the same grid cause (`1fr` / `1fr 1fr`, now `minmax(0, …)`),
  plus `overflowWrap: 'anywhere'` on the featured `<h3>` venue, its city line and the travel card's
  Venue-location city. Retro's row city line wraps (`anywhere`). Lime's is `nowrap` by design, so
  it took `overflow: hidden` + ellipsis instead, matching the venue above it.
- **L3 / L4** needed nothing: 390 / 768 held for every case in Retro, Lime and Grunge.
- **Verified:** `scrollWidth` equals the width for seed, 35 and 41 spaced characters, a 39-character
  word and a 39-character city × layouts 1–4 × themes 0, 1, 2 × 390, 768, on the canvas and with
  `live=1`. The `map` digest for themes 0 and 1 (canvas and `live=1`, all three widths) is
  **byte-identical**. Theme 2 (Grunge) moves in **layout 2 at 768 and 390 only**, and that is the
  fix taking effect on the seed. Courier Prime is wide enough that the seeded rows already overflowed
  (a 364px left column in a 346px measure at 390, and 376 + 376 columns at 768 instead of equal
  halves). Now "The Deaf Institute" ellipsises and the columns are equal. The end-of-pass sweep
  should expect that diff.
- **Trap:** an `Edit` whose `old_string` ended in `· ` came back with the trailing space
  dropped (`{gg.city} ·<span…`). The digest caught it as a 4px shift. Diff the digest before
  trusting an edit to a JSX text run.

---

## F10 — an empty media player shows the hardcoded "Night Rain"

> An empty Media Player shows a hardcoded track, "Night Rain".

**Verdict: confirmed.** `NOW_PLAYING` (`data.js:366`) is
`{ track: 'Night Rain', at: '02:28', of: '04:22', pct: 34 }`. `Media` resolves
`title = track ? track.name : np.track` (`EncoreSection.jsx:~4433`), so with `c.tracks = []` the
now-playing block names a song that is not on the page, and the canvas also draws the mid-song
clock (02:28 / 04:22, 34 %) under it. Layouts 1–4 all print `now.track` (`:4584`, `:4782`,
`:4951`, `:5786`, `:5903`, `:6148`, `:6456`).

**Fix.** `vm.nowPlaying` keeps only the *clock* as decoration. The fallback title is not
content any more (CLAUDE.md already says the card "names the track the player is on"). With no
tracks:
- the title is empty, or better a neutral prompt owned by the view-model (`vm.mediaEmpty`,
  e.g. "No tracks yet"; the pricing deck's one-message rule);
- the clock and the progress bar read 00:00 / 00:00 / 0 %, because a mid-song clock with nothing
  cued is a lie;
- transport and play buttons stay a picture: there is nothing to play (check `goTo` with an
  empty list, since `% 0` is `NaN`).

Drop `track` from `NOW_PLAYING` so nothing can reach it again. Check each layout's empty state
at three widths: layout 2's fan with zero seats and layout 4's tile grid with zero tiles are the
likely breakages. `preview.html?cat=media&n=0` is the existing empty harness.

**Docs.** CLAUDE.md's media paragraph ("the card still names and shows track one") and the
comment on `vm.nowPlaying` in `sectionVm`.

**Settled.** 2026-09-17.
- **`NOW_PLAYING` is `{ at, of, pct }`** now. `vm.nowPlaying` moved below the `tracks` block in
  `sectionVm` (it has to read them): with tracks it is the mid-song clock as before, and with none
  it is `00:00 / 00:00 / 0` on both surfaces. `Media`'s fallback title is `vm.mediaEmpty`
  (`'No tracks yet.'`, **uncased**, like pricing's and the repertoire's messages). The four
  hardcoded `No tracks yet.` in layouts 3 and 4 read the same key, so the message has one home.
  One test covers every design, because `tracks3` is a prefix of `tracks`.
- **`goTo` was already guarded.** `if (!a || !count) return` comes before the modulo, and
  `toggle`, `pick` and `onEnded` all go through it. Verified live with `&n=0&live=1`: every
  `cursor: pointer` element in layouts 1–4 × themes 0, 1, 2 × three widths was clicked, with no
  page error, no `NaN` in the text and no `src` on the `<audio>`. **Named edge:** those dead
  controls still show a pointer cursor when the list is empty, because roughly 20 sites gate on
  `s.live` alone. Not chased.
- **Layouts 2 and 4 did not break** at 0 tracks at any width, before or after. Layout 2's fan and
  list are simply blank (the design's empty state), and its bar ellipsises "No tracks yet." at the
  same width "Night Rain" had. Layout 4 now prints the message twice, as the sleeve's title and
  in the tile grid's place. That is accepted: it is one string saying the same thing in two
  seats. Layout 3 already drew no now-playing card when empty, and it did not move. Lime layout 1
  at 390 draws the title over the sleeve's `KM` placeholder, as it did with "Night Rain".
- **Digest** (media, themes 0, 1, 2, three widths): the seed is **byte-identical** on the canvas
  and with `live=1`. With `&n=0` (canvas and live) only layouts 1, 2 and 4 (`arch` 0, 1, 3) move,
  and only in the title text, the two clock strings and the bar fill (34 % → 0, plus the Grunge
  layout-4 playhead dot that rides it).
- **Docs:** the CLAUDE.md media paragraph, README's player paragraph, the `NOW_PLAYING` comment,
  the `vm.nowPlaying` comment and `Media`'s now-playing comment.

---

## F2 — Subtitle, Secondary button, Paragraph 2 and Calendar Heading edit nothing in layout 1

> Header → Subtitle, Header → Secondary button, Bio → Paragraph 2 and Booking Calendar → Heading
> change nothing in layout 1.

**Verdict: confirmed, and the four are symptoms of one design choice.** Which Retro layouts read
each key today:

| Field | Key | Read by (Retro) | Not read by |
|---|---|---|---|
| Header → Subtitle | `subtitle` | header layouts **2, 5** (`HeaderV1`, `HeaderV4`) | 1, 3, 4, 6 |
| Header → Secondary button | `cta2` (`ListenLink`) | header layouts **2, 3, 5**, and bio layout 4 | 1, 4, 6 |
| Bio → Paragraph 2 | `para2` | bio layout **3** only | 1, 2, 4 |
| Booking Calendar → Heading | `heading` | calendar layouts **2, 3, 4** (Lime draws it at 1 too) | Retro 1 |

`FIELDS.header`'s own comment states the rule: *"Every element appearing in any header layout
is exposed. A layout that does not consume a key simply ignores it."* Layout 1 is the §10.2
reference design, and its Figma frame has no subtitle, no Listen link, one paragraph, and no
calendar head (Retro). Other fields already carry the workaround in their label or hint
("Button (layouts 1 and 4)", "Layouts 2 and 3 draw no photograph."). These four don't, so the
panel shows them as if they worked.

**Decision needed.** Options:

- **A. Mark the field, per layout (recommended).** Give a field an optional `in` list of the
  *designs* that read it (per template where Lime differs: `in: { Retro: [1, 4], Lime: [0, 1, 4] }`,
  0-based like `d`), and have `EditPanel` render a quiet line under the label, e.g. "Not shown in
  this layout", when the section's current design is not in it. Keep the field editable, because
  the rule that switching layouts never discards copy still holds. This fixes the whole class,
  not four instances, and makes the hand-written "(layouts 1 and 4)" labels derivable. Cost: an
  audit of every field's reach, which the CLAUDE.md paragraphs already record per section.
- **B. Hide the field when the current layout doesn't read it.** Cleaner panel, but the copy
  becomes invisible and uneditable until the layout changes, and a user who switches layouts sees
  fields appear and disappear.
- **C. Draw them in layout 1.** Add a subtitle and a Listen link to `HeaderV0`, a second paragraph
  to bio v0, and a heading to Retro calendar v0. This departs from the reference frame. Lime's
  calendar v0 already has a head to copy, but the header and the bio have no designed seat, so
  this means inventing design.
- **D. Hints only.** Add the four missing "(layouts …)" hints. Smallest diff, and it leaves the
  class open.

**Fix (if A).** Add `in` to the fields in `data.js`; add a `fieldReach(f, themeName, design)`
helper beside `fieldDefault`; render the note in `EditPanel` next to `f.hint`. Do the four
reported fields first, then the audit, section by section, against the "reaches layouts …"
statements in CLAUDE.md. Replace the hand-written layout suffixes in labels only if the note
makes them redundant.

**Verify.** Pick each layout 1–4 of header, bio and calendar in Retro and Lime. The note appears
exactly on the fields that do nothing there. Type into each one and confirm the canvas does not
change where the note shows, and does where it doesn't.

**Docs.** The `FIELDS.header` comment, and a line in CLAUDE.md ("A layout that does not consume a
key simply ignores it" gains "and the panel says so").

**Decision.** 2026-09-17: **A** (mark the field per layout; the field stays editable).

**Settled.** 2026-09-17.
- **Shape.** `in` is an array of 0-based designs (`arch % designCount`), or an object keyed by
  template name with `'*'` for any template it does not name. No `in` means every design reads
  the key. `fieldReach(f, themeName, design)` sits under `fieldDefault` in `data.js`. `EditPanel`
  reuses its existing `design` and prints an italic "Not shown in this layout" between the label
  and `f.hint`, in the hint's style. The header's `in` is always `{ Retro, Lime }`. The flat
  three's header family is undesigned (its `FlatNav` ignores even `navMode`), so it carries no
  note rather than being folded onto either list.
- **The reach was measured, not read.** A scratch probe rendered `preview.html` for every
  field × design × theme 0, 1, 2 × three widths × canvas and `live=1`, once with a sentinel in
  `&cj=` (a string, a data-URI photo, the other select option, one custom list row, every June
  date booked, `open` = March) and once without, and compared `#root.innerHTML`. `title` was
  skipped: it is the artist's name and reaches every header. The `in` tables are that output
  verbatim. An assertion over `fieldReach` gave 999 checks and 0 mismatches (Grunge included,
  except its header).
- **What the probe corrected in the triage table.** `para2` is read by bio layouts 3 **and 4**.
  `cta2` is `{ Retro: [1, 2, 4], Lime: [1, 2] }` and `subtitle` is `{ Retro: [1, 4], Lime: [1] }`.
  Calendar `heading` is `{ Lime: all four, '*': [1, 2, 3] }`, and the flat three match Retro.
  Unmarked fields the audit also caught: header `kicker`, `location`, `showTags`, `showBadge`,
  `badgeText` (Lime layout 4 only) and `align` (layout 1 only); bio `heading` (not layout 2);
  media `kicker` (layouts 1 and 3 only) and `soundcloud`; calendar `image`, `time`, `cta`; map `terms` (not
  layout 3); testimonials `heading` (not layout 1) and `sub`; form `promises` (not layout 3, so
  CLAUDE.md's "reaches layout 4 alone" was wrong and is fixed).
- **Lime differs outside the header in two places.** Its pricing layout 2 is its own composition
  and draws none of `images` / `reviews` / `rating` / `cta` / `note` (`PRICING_CARD` =
  `{ Lime: [], '*': [1] }`). Its testimonials layout 2 prints no `stars`.
- **Two dead fields.** `bio.statement` and `map.sub` are read only by the fallthrough after
  `v0`–`v3`, which `arch % 4` never reaches, so they are `in: []` and carry the note everywhere.
  Their labels lost the suffixes that named layouts that no longer exist ("centred layout",
  "full map layout"). **Removal is left to the sweep** (the fallthrough branches with them).
- **Suffix rule.** A `(layout …)` suffix was dropped only where the hint already names the
  layout, or where the suffix named a layout that does not exist. It was kept where it tells two
  same-named fields apart (the "Button" pairs in pricing, calendar and form). By that rule only
  calendar's "Event types" lost one. "Ring labels (layout 3)" was **wrong** (layouts 3 and 4 read
  it) and now says so. **Named edge:** under Lime, pricing layout 2's "Review count (layout 2)"
  and its siblings show the note *on* layout 2. The suffix is Retro's truth and the note is
  Lime's. Not chased.
- **Named edge:** header `cta2` is also bio layout 4's Listen label. The bio panel has no such
  field, so the note on the header speaks for the header alone.
- **Verified in the editor** (puppeteer on the real app, 1600 wide): Retro and Lime × setup card
  1–4 × Header, Bio, Booking Calendar. The notes matched the probe on every panel. Typing into
  each text field (132 fields in all) moved the canvas exactly where no note stood (0
  contradictions). Select and photo fields are covered by the probe alone.
- **Digest** (all categories, themes 0, 1, 2, three widths, canvas and `live=1`):
  **byte-identical**, as expected for a chrome-only change.
- **Docs:** the §4.8 `FIELDS` comment, the `FIELDS.header` and `FIELDS.calendar` comments, a new
  CLAUDE.md bullet under *Navigation and state*, the `promises` sentence in CLAUDE.md, and a
  README *Scope boundaries* bullet.

---

## F9 — the enquiry form can lose every box, Email included

> Every field can be deleted from the Enquiry Form, Email included, with no warning.

**Verdict: confirmed.** `FormFieldsField.removeAt` (`EncoreBuilder.jsx:~2184`; `:~2360` at the sweep) filters with no
guard, and the `kind` select can also turn the last `email` row into `text`. The published form
then still sends (`enquiryMailto` needs only the artist's address), with an empty body or none,
and the artist has no field that asks for a reply address. The mail client does supply the
sender, so replies are still *possible*. That makes this a quality problem, not a broken submit.

**Decision (small).** Recommended: **block and explain.**
- The trash button of the **last `email` row** is disabled, with a tooltip or hint: "Visitors
  need somewhere to leave an address."
- Changing that row's `kind` away from `email` is refused the same way (disable the other
  options, or keep the select but show the hint).
- An emptied list is still allowed only if the design copes with it. Check that `formRows` = []
  renders at all four layouts. If it does not, keep at least one row, and the email rule already
  guarantees that.
- The seed already satisfies the rule: `FORM_FIELDS` carries an `email` row.

Alternative: allow it but show a persistent warning above the repeater. It is softer, and the
guard is what the report asks for.

**Verify.** In the editor, try deleting every row and flipping `kind`. In the published tab, the
form still submits (`getAttribute('href')` on the pill).

**Docs.** CLAUDE.md's `FIELDS.form.fields` paragraph (the "load-bearing order" block) gets the
invariant.

**Decision.** 2026-09-17: **block and explain** (the last `email` row cannot be deleted or
retyped; the persistent warning was declined).

**Settled.** 2026-09-17.
- **The empty list is fine, so it stays allowed.** `&n=0` renders at layouts 1–4 × themes 0, 1,
  2 × three widths, canvas and `live=1`, with no page error and `scrollWidth` equal to the
  width. Layouts 1 and 4 keep the message box. Layouts 2 and 3 fall back to the price card and
  its pill. Live, the pill is still a `mailto:` with an empty body. In practice the editor
  cannot reach an empty list anyway: the seed has an email row and a new row is `text`.
- **Guard.** `FormFieldsField` counts the `email` rows. A row is locked when it is `email` and
  that count is 1 (`lastEmail(f)`). Its trash button is `disabled`, drawn at `.35` opacity with a
  `not-allowed` cursor, and carries the reason as a `title`. Its `SelectItem`s for Text and Number
  are `disabled`, so they stay in the list. Under the select, a hint line in the panel's hint
  style reads `FORM_EMAIL_HINT` ("Visitors need somewhere to leave an address."). Because the
  seed's Email row is locked, that hint is always visible on a fresh page. A second email row
  unlocks both, and the lock moves to whichever one remains.
- **Verified in the editor** (puppeteer, 1600 wide, Retro): repeated delete-all left only the
  Email row, and a forced click on its disabled button did nothing. Its options read
  `Text(disabled) · Email · Number(disabled)`, and picking Text kept Email. After *Add field*
  and switching the new row to Email, both rows unlocked. Switching the original to Number
  locked the new row, and the original could then be removed. No page errors. **Published tab:**
  the form draws one `email` input plus the message, and the pill's `href` is
  `mailto:bookings@kaimercer.co.uk?subject=Wedding%20enquiry&body=`. Once the boxes are filled,
  the body carries `Detail: fan@example.com` (an empty label falls back to "Detail") and the
  message. Submitting shows the "Check your mail app" confirmation.
- **Digest** (`form`, themes 0, 1, 2, three widths; seed and `&n=0`, each on the canvas and
  with `live=1`): **byte-identical**, as expected for a chrome-only change.
- **Docs:** the `FormFieldsField` comment, CLAUDE.md's `c.fields` sentence (the invariant), and
  README's form paragraph.

---

## F18 — link fields don't validate addresses

> Link fields don't check the address: "not a url" publishes as `https://not a url`, and a
> `javascript:` link publishes as a link that doesn't work.

**Verdict: confirmed.** `extUrl()` (`data.js:~1146`; `:~1250` at the sweep) prefixes `https://` onto anything with no
scheme, spaces included. Anything that looks like it *has* a scheme passes through untouched, and
that includes `javascript:`, which React 19 then replaces with a throwing URL. The result is a
link that does nothing and logs an error. It reaches every outbound seam: `soundcloud`,
`tracks[].audio`, the gallery's three social rows, `gigs[].link`, and footer `links[].url`.

**Fix.**
- `extUrl()` returns `''` for anything it cannot make into a real address: a scheme outside
  `http`, `https`, `mailto` and `tel` (`javascript:`, `data:`, `vbscript:`, …), any whitespace
  inside, or, for the schemeless case, a host with no dot. `''` is already each seam's "no link"
  state (the Soundcloud rule, the gallery's hide-the-row rule, a gig row staying a picture), so
  nothing downstream changes.
- Put the check in one exported helper, `urlProblem(v)` → `null | 'message'`, and have
  `extUrl` use it, so the editor can say *why*: render the message under the input in every
  field that takes an address (the Soundcloud input, `TracksField`'s audio,
  the gallery's three social fields, `GigsField`'s link, `LinksField`'s url). Validate on blur, not on
  every keystroke.
- `tracks[].audio` goes through `extUrl` onto `vm.tracks[].src`, so an invalid address becomes an
  unplayable row, which is the existing no-audio state.

**Verify.** Unit-check `extUrl` in node against a table: `''`, `soundcloud.com/x`, `http://a.b`,
`HTTPS://A.B`, `mailto:a@b.c`, `not a url`, `javascript:alert(1)`, ` JavaScript:…`, `data:…`,
`//cdn.x/y`, `localhost`. Then in `live=1`, confirm that no `href` starts with anything but
`https?:`/`mailto:`/`tel:`.

**Docs.** The `extUrl` comment and CLAUDE.md's `extLink()`/`extUrl()` sentence in the `s.live`
paragraph.

**Decision.** 2026-09-17: **drop both** — `//host` (protocol-relative) and bare `localhost` are
refused like any other address `extUrl` cannot make real.

**Settled.** 2026-09-17.
- **`urlProblem(v, web = false)`** sits above `extUrl` in `data.js` and returns `null` or one
  sentence. Empty is `null`: it is the no-link state, not a mistake. It refuses, in order:
  whitespace or a control character anywhere; a leading `//`; a scheme outside `http`, `https`,
  `mailto`, `tel`; a `mailto:` without `x@y.z`; a `tel:` without a digit; `http(s):` not followed
  by `//`; and a host (schemeless, or after `http(s)://`) that is not dot-separated labels, which
  is what refuses `localhost` and `https://localhost`. Last comes a `new URL()` parse. **A
  `host:port` is not a scheme**: `example.com:8080/x` matched the old scheme regex and passed
  through relative. It is now schemeless and gets `https://`. `extUrl(v, web)` returns `''`
  whenever `urlProblem` objects. Otherwise it passes the four schemes through as typed
  (`HTTPS://A.B` stays uppercase) and prefixes `https://` to the rest.
- **`web` mode is an addition to the plan.** The live check found `mailto:` and `tel:` in a
  track's audio reaching `<audio>` (`ERR_UNKNOWN_URL_SCHEME`). `sectionVm` now calls
  `extUrl(t.audio, true)`, and `TracksField`'s input passes `web`, so both refuse anything but
  http(s) with "This needs a web address — https://…". In that mode the `host:port` exemption
  applies only to unknown schemes. Without that, `tel:441234` (a digit right after the colon) got
  through.
- **Editor.** `UrlInput` (beside `FIELD_BOX`) wraps the shadcn `Input`. It validates on blur, and
  a keystroke clears the line as soon as the value is fixed. It never raises one while typing.
  The message stores the value it was computed for and shows only while the box still holds that
  value, so a repeater row deleted above it (rows key on index) cannot pass its line to the row
  that moves up. The box border turns `#B3261E` and the line is a `role="alert"` `<p>` in the
  hint's 10px. It is used by `FIELDS` entries with the new **`type: 'url'`** (media
  `soundcloud`, gallery `youtube` / `instagram` / `tiktok`) and by the audio column in
  `TracksField`, the link column in `GigsField` and the url column in `LinksField`. The stored
  value is kept as typed: the view-model refuses it, and the editor does not rewrite it.
- **Verified.** In node, the plan's table plus 20 more cases (ports, `a..b`, `ftp:`, tab inside
  `java\tscript:`, the web-mode five): all pass. **Live** (`&live=1&cj=`, media / gallery /
  map / footer × layouts 1–4 × themes 0, 1, 2 × three widths, with every pointer control clicked
  to page the lists): seven bad addresses in every slot give 0 external hrefs outside
  `https?:`/`mailto:`/`tel:`, no `<audio>` source and no console error. Seven good ones all come
  through (`HTTPS://A.B` as typed, `www.x.io` → `https://www.x.io`, and so on). **Editor**
  (puppeteer, 1600, Retro): all six inputs show the right sentence after blur, show nothing while
  typing, and clear on a fixing keystroke. No page errors.
- **Harness trap:** `page.screenshot({ clip })` resizes the viewport and remounts `EditPanel`,
  which drops `UrlInput`'s local state, so the shot showed no message. Pass
  `captureBeyondViewport: false`. A real resize across the sidebar/sheet breakpoint drops the
  line the same way. That is accepted, and the next blur brings it back.
- **Digest** (all categories, themes 0, 1, 2, three widths, canvas and `live=1`):
  **byte-identical**. No seed carries an address that the new rule refuses.
- **Named edges.** A `tel:` with spaces (`tel:+44 20 …`) is refused by the whitespace rule. So
  is a `user:pw@host` URL, and so is an IPv6 literal. The generic "e.g. soundcloud.com/you"
  example also appears under the audio box.
- **Docs:** the `extUrl` / `urlProblem` comments, the §4.8 `FIELDS` comment (`type: 'url'`), the
  `vm.tracks` comment in `sectionVm`, CLAUDE.md's `extLink()` / `extUrl()` sentence, and README's
  outbound-links paragraph.

---

## F25 — a footer link to a deleted section stays as a dead label

> A Footer link to a deleted section stays on the page with no href and leads nowhere.

**Verdict: confirmed, and it is the documented behaviour.** `sectionVm` resolves `to` against
`navSections` and yields `undefined` when the section is gone (`EncoreBuilder.jsx:~1177`), and
CLAUDE.md says so on purpose: *"the label keeps its place in the design and simply does not
link."* So the fix is a product change, and the doc has to change with it.

**Decision needed.** Options:
- **A. Drop it on the published page, flag it in the editor (recommended).** When `s.live`, the
  footer does not render a row whose target resolved to nothing. That is the gallery's
  hide-the-empty-row rule, and a visitor gains nothing from a dead word. The canvas keeps it, so
  the artist can see the row, and `LinksField` marks the row "Section not on the page" (the
  `FOOTER_TARGETS` rule that the select still names it stays). The two-column halving must run on
  the *rendered* list, or the columns go lopsided in the published tab only.
- **B. Clean up on delete.** Deleting a section also rewrites the footer's `c.links`. This is
  destructive to content the artist typed, and it fights F24's Undo.
- **C. Keep the label but point it somewhere.** Fall back to the top of the page. That is
  misleading.

**Also check** the header's *Minimal* nav mode: its Music / Shows / Book labels resolve the same
way, and CLAUDE.md mentions the same deleted-target case for them. The fix should treat both
consistently, or record why not.

**Verify.** Delete `media` on the seeded page. The canvas footer still shows the row with an
editor mark, and the published footer does not. Also delete enough sections that column two
empties.

**Docs.** CLAUDE.md's footer paragraph (§4.3a sentence, "which is also the whole of
`BLANK_PAGE`'s footer"). Decide what `BLANK_PAGE` shows once dead rows are dropped: probably the
pill alone.

**Decision.** 2026-09-17: **A**. The published footer drops a row whose section is not on the
page. The canvas keeps the row, and `LinksField` marks it "Section not on the page". The columns
are halved from the rendered list.

**Settled.** 2026-09-17.
- **`sectionVm`** builds `vm.footerLinks` with `flatMap`. When `live`, a row whose `to` is a
  section id not in `navSections` is dropped. The canvas keeps it (its `to` is `undefined`, as
  before). `footHalf` runs on the result, so the published columns are halved from what renders,
  and the existing "drop an empty column two" rule then applies to the rendered list.
- **Only a missing section is dropped.** A `none` row is a plain label the artist chose, and it
  stays. So does a `link` row whose address `extUrl` refuses, which is F18's no-link state and
  already has `UrlInput`'s message. An empty or absent `to` now reads as `none`, which is what
  the select shows for it.
- **Minimal nav: handled the same way.** `vm.navLinks` drops a Music / Shows / Book label with
  no candidate when `live`. The filter runs before `navEms` measures the row. A Lime page with a
  dropped label was not rendered, since the run was Retro and the harness cannot shrink
  `navSections`. The canvas keeps the label. `EditPanel` prints
  "Music, Shows: section not on the page — left off the published nav." above the header's
  Navigation links select, and only while Minimal is selected. The header's *Book Now* /
  *Listen* pills are unchanged: a pill with no target stays a span. §4.3a in `data.js` now
  says that pills keep their place and labels are dropped.
- **Editor mark.** `LinksField` takes `navSections` and prints `LINK_GONE_HINT` ("Section not on
  the page — left off the published footer.") under a row's select, in the panel's hint style.
  The mark lives in the editor, not in `EncoreSection`: the canvas is a picture of the site, so
  it draws the label unmarked.
- **`BLANK_PAGE`'s published footer is the Book pill alone**, and the pill is a span because
  nothing on the page takes a booking. Column two is dropped, and the header's nav is empty.
  The canvas still draws all eight labels.
- **Harness.** `preview.jsx`'s `navSections` is now `EXAMPLE_PAGE` minus the header and footer.
  It used to be a hand list of six, which left `gallery`, `repertoire`, `map` and
  `testimonials` off the page. Four of the eight `FOOTER_LINKS` rows point at those four, so the
  harness's `live=1` footer would have lost half its rows, a footer no seeded page publishes.
  **The harness header now draws nine nav links, not five**, on both surfaces. The before and
  after digests were both taken with the new list.
- **Digest** (all categories, themes 0, 1, 2, three widths): the canvas, `live=1`, and `live=1`
  with `navMode: minimal` on the header are all **byte-identical**. The seed deletes nothing:
  `FOOTER_LINKS` points at `bio`, `media`, `gallery`, `repertoire`, `map`, `pricing`, `form`
  and `testimonials`, which are all on `EXAMPLE_PAGE`.
- **Verified in the editor** (puppeteer, 1600, Retro, published tab at 1440 / 768 / 390). On the
  seed the published columns are 4 | 4, and all links go to their sections. **After deleting
  `media`**, the canvas is still 4 | 4 and the *Top Tracks* row carries the mark. The published
  footer is 4 | 3 (*About, Media, Repertoire, Shows/Coverage* | *Pricing, Enquiries, Reviews*),
  and the header nav loses Media Player. **With `testimonials` the only target left**, the
  published footer is one column (*Reviews* plus *Book Now* → `#calendar`). Minimal at 1440
  reads *Shows, Book, Book Now*, and the panel names Music. **With `calendar` and
  `testimonials` gone too**, the published footer has no links (the pill is a span), the
  header nav is empty, and the hint names all three labels. No page errors, and `scrollWidth`
  equals the width throughout. **Harness** (`&cj=` with gone, `none`, bad-`link`, good-`link`
  and target-less rows; themes 0, 1, 2 × three widths × both surfaces): 54/54 fit, and there
  are no page errors.
- **Docs:** the `sectionVm` footer and nav comments, `data.js` §4.3a, `FOOTER_LINKS` and
  `FOOTER_TARGETS`, `LinksField`'s select comment, the published-tab listener comment,
  CLAUDE.md's footer paragraph, and README's footer and header-nav paragraphs.

---

## F24 — delete is instant, can't be undone, and re-adding resets the content

> A section is deleted immediately, with no confirmation and no Undo. Adding it back resets its
> content to the defaults.

**Verdict: confirmed.** `del` (`EncoreBuilder.jsx:~3490`) filters the section out of `st.sections`,
and the content goes with it. `addSection` (`:~3500`) builds `{ c: {} }`. There are three call
sites: the section's dropdown menu (`:~1488`), the edit panel's delete (`:~2763`) and the mobile
list's trash icon (`:~4025`). At the sweep these sit at `:~3783`, `:~3809`, `:~1538`, `:~2989` and
`:~4338`.

**Decision needed.** Options:
- **A. Undo toast + remembered content (recommended).** Delete stays one click. The toast
  becomes "Media player removed · Undo" (sonner's `action`). Undo reinserts the section object
  at its old index. Separately, `st.removed[cat]` keeps the last deleted section's `{ arch, c }`,
  and `addSection` restores it when that category is added again. That is safe because
  categories are unique per page. Offer "Start fresh" in the add composer when there is something
  to restore.
- **B. Confirm dialog.** An `AlertDialog` before deleting. Heavier on every delete, and it does
  nothing for the re-add half.
- **A + B.** Probably overkill: Undo already makes the delete recoverable.

**Notes for the fix.**
- The toast helper allows one toast at a time and dismisses the previous one. An Undo toast must
  not be dismissed by an unrelated toast within its lifetime, or must be made longer. Decide which
  and record it.
- Uploaded images live in `c` as data URIs, so `st.removed` holds them too. Fine: there is no
  persistence, and it is one entry per category.
- Undo after a reorder: reinsert at `min(oldIndex, sections.length - 1)` so the footer stays last
  (`canMove`'s invariant).
- Selection: undo should not reopen the edit panel.

**Verify.** Delete, then Undo, at each call site, desktop and mobile. Delete, add again, and the
content is back. Delete, edit another section, add again, and the content is still back. Publish
after an Undo.

**Docs.** CLAUDE.md's *Navigation and state* (a new `st` key), and README if it lists `st`.

**Decision.** 2026-09-17: **A**, an Undo toast plus remembered content. There is no confirm
dialog. Sub-decisions made in the session:
- **Toast lifetime: longer, still replaceable.** The Undo toast lives 6 s, not 2.4, and the next
  toast replaces it like any other. It is not pinned against other toasts, because `st.removed`
  keeps the content either way. A toast that gets bumped early loses the shortcut, not the content.
- **Layout on re-add: the composer's pick wins.** The composer *opens* on the remembered
  `arch` (`openAdd` and the category select both seed it), and the content comes back whatever
  layout is picked. Switching layouts never discards copy.
- **Start fresh is a checkbox** (`st.add.fresh`), not a button that discards at once. Nothing
  is thrown away until *Add section* is pressed.

**Settled.** 2026-09-17.
- **State.** `st.removed = { [cat]: { arch, c } }` holds `c` whole, data URIs included. Its keys
  are only ever categories *not* on the page: `addSection` consumes the entry whether it
  restores or starts fresh, Undo consumes it, and `TemplateStage`'s `onPick` resets it to `{}`.
  `st.add` gains `fresh`.
- **The three call sites are unchanged**, because `del` owns the toast. They are the list row's
  `…` menu (`SectionList`, used by the sidebar and the mobile Sections sheet), `EditPanel`'s
  Delete (sidebar and mobile edit drawer), and the **canvas toolbar's trash**. The plan
  called that last one "the mobile list's trash icon". It is the overlay toolbar
  (`vm.showOverlay`), shown on hover on desktop and after a tap on mobile.
- **Undo** reinserts the same section object (same id) at `min(i, sections.length - 1)` and
  touches neither `selectedId` nor `editSheet`. If the category is already back on the page, it
  does nothing. In practice that guard is unreachable, because re-adding toasts "… added",
  which replaces the Undo toast. It stays as a guard anyway.
- **Trap: don't set a flag inside the `patch` updater.** The first cut used `addSection`'s
  own pattern and captured `{ sec, i }` inside the updater, which is `let added` in the old code.
  The first delete toasted. The second did not: React computes an updater eagerly only when
  the fiber has no pending work, and otherwise runs it at render, after the handler has
  returned. `del` and `addSection` now read the rendered `st.sections` and keep the updater
  pure. The old `addSection` had the same latent bug, so its "added" toast could go missing.
- **Mobile, found in verification.** (1) The Undo toast sat over the add-composer drawer's
  *Add section* button. While any drawer is open (`st.add || st.sheet || st.editSheet`), the
  toaster now drops from the top at `12px + safe-area`, since every drawer leaves the top
  16–40 % free. (2) **A pre-existing bug:** below 600 px sonner reads `mobileOffset`, not
  `offset`, so the 72 px bottom-nav clearance never applied on a phone and the toast sat 16 px
  from the bottom, over the nav. Both props now get the value. (3) The four `DrawerContent`s
  take `onPointerDownOutside={keepOnToast}`, which is **defensive only**. With the prop removed,
  a trusted tap or click on Undo still left the Sections sheet open (measured), and the sheet
  closing in the first mobile run was the harness trap below. (4) **Named, not a bug:** the
  toaster keys its list by position, so closing a drawer while the Undo toast is up remounts
  the toast at the bottom. It replays its fade-in and restarts its 6 s.
- **Verified** with puppeteer (`scratchpad/f24.mjs`, 1600 and 390 with touch emulation, Retro;
  all Undo clicks are trusted `ElementHandle.click()`). Desktop passed 42 checks and mobile 43,
  with no app errors. The checks: delete → Undo at all three call sites (content back, same
  index, toast gone, no panel or edit drawer opened, and on mobile the Sections sheet stays
  open); delete → re-add (the composer opens on Media Player with the *Start fresh* line, and
  the content is back); delete → edit Bio → re-add (both edits kept); Start fresh (default
  heading, entry spent); layout 3 → delete → the composer shows layout 3 → re-added on layout
  3 with its content; delete → move a section → Undo (back at its index, footer last); and on
  mobile, the composer's *Add section* is not covered. **F25 crossover:** with media deleted,
  the Footer panel shows one "Section not on the page" hint and the published footer drops a
  row (9 → 8 anchors, pill included). After Undo the hint is gone with the panel still open,
  and a republish brings the row back (9, identical list). The sentinel heading is published
  after Undo. The only page errors in the mobile run are vaul's `setPointerCapture`, raised
  when the script opens the layout picker inside the edit drawer with a synthetic
  `pointerdown`. A trusted click or tap on the toast raises none (checked separately).
- **Harness trap:** opening the list row's `…` menu with the synthetic
  `pointerdown`+`mousedown` recipe **closes the mobile Sections sheet** on the next trusted click
  in the menu. That looked like an app bug and was not one: open the trigger with a trusted
  `ElementHandle.click()` and the sheet stays open.
- **Digest** (all categories, themes 0, 1, 2, three widths, canvas and `live=1`): **387 + 387
  byte-identical** against HEAD, as expected for a chrome-only change.
- **Docs:** comments on `st.removed`, `toast`, `del` and `addSection`, `openAdd`, `AddComposer`,
  `keepOnToast` (whose comment calls it a guard) and the `Toaster`; CLAUDE.md's *Navigation and state*; README deviation 6
  (toast positions) and a new *Scope boundaries* bullet. README lists no `st` keys beyond
  `stage` and `onboard`, so it gets prose, not a key list.

---

## F20 — the published calendar allows picking a past date

> The calendar on the published page lets a visitor pick a date in the past.

**Verdict: confirmed, and it collides with a documented rule.** Nothing in the builder reads the
clock: there is no `Date.now` or `new Date()` anywhere. CLAUDE.md says why: *"the calendar opens
on the artist's date, not on today, or the canvas's picture would drift off the reference frame's
June overnight."* The seed opens on `CAL_OPEN = '2025-06-12'`, which is itself in the past
(today is 2026-09-17), so the **seeded published calendar is entirely in the past** and every day
in it can be picked.

**Decision needed.** Options:
- **A. Clock in the published tab only (recommended).** `sectionVm` takes a `today` ISO argument,
  passed **only when `live`** (`PublishedPage` computes it once, in UTC, as the date maths
  already is). With `today` set: cells before it get the booked state's look without the strike
  (a *dead* flag, not `booked`), have no handler and have no enquiry line; slot rows before it die
  the same way; and a cued `open` date in the past cues nothing, so the foot prints `calPrompt`,
  exactly as a blocked cue does. The canvas stays the reference picture.
  - Sub-decision: with `open` in the past, should the published grid **open on today's month**
    instead of `open`'s? Recommended: yes, `max(open, today)` for the opening month only, because a
    published page that opens on a dead month is the visible half of this bug. The arrows' wrap
    window (`CAL_SPAN`) then counts from that month.
  - The first published paint then differs from the canvas. That is the accepted cost, and a
    named one, like Repertoire's placeholder diff.
- **B. Validate in the editor only.** Warn when `open` is in the past. The visitor can still pick
  past days, so this does not fix the report.
- **C. Move the seed forward.** Doesn't fix it: a seed ages too.

**Also:** layout 4's enquiry wizard and layout 2's slot list share `sel`, and `booked`/`dead`
must be one test (`hit`) so a past day and a blocked day behave identically.

**Verify.** With `?live=1` and a `today` override in the harness (add `&today=` in the same
session), check all four layouts: past cells dead, the first published month right, arrows
wrapping, and the foot prompt when the cue is dead. The canvas digest must be unchanged
(`scripts/digest.mjs`, `calendar`, themes `0,1`).

**Docs.** CLAUDE.md's calendar paragraph: "Nothing reads the clock" becomes "Nothing on the
canvas reads the clock", plus the new live-only rule. Also the `data.js:~1246` comment.

**Decision.** 2026-09-17: **A**, a clock in the published tab only. Sub-decision: **yes**, the
published grid opens on `max(open, today)`'s month, and the `CAL_SPAN` window counts from it.

**Settled.** 2026-09-17.
- **`sectionVm({ …, today })`** takes an ISO date and reads it only when `live`
  (`parseDate(today)` under `live`, else null), so "the canvas never reads the clock" is
  structural, not a caller convention. In the calendar block, `dead(iso)` is a string compare
  against today (strictly before, so today itself is pickable). `vm.calMonths` cells and
  `vm.calSlots` rows carry `dead` beside `booked`. A dead cell's `line` and `short` are `''`,
  and so is a dead slot's `line`. `vm.calPick` is `''` when the cue is booked *or* dead. The
  window starts on `open`'s month, or on today's when `open` is dead.
- **`PublishedPage`** reads today once, `useState(() => new Date().toISOString().slice(0, 10))`
  (UTC, like every other date sum), and passes it to every `sectionVm` call. A republish
  re-renders the same root, so a tab left open past midnight keeps the day it opened on. That
  is accepted.
- **`EncoreSection`** has one predicate after the hooks, `blocked = (x) => x.booked || x.dead`.
  It replaces `.booked` at the four `hit` sites (layouts 1–4) and at every handler gate and
  every fill / colour / opacity read: Retro and Lime layout 1's cell, Retro's layout 2 row and
  Lime's `dim`, the layout 3 dots in both, and the layout 4 rows in both. Every `line-through`
  still reads `booked` alone. **Layout 4's wizard needed nothing**: its date box is free text
  with a placeholder, and its *Send Enquiry* is a fragment link. The featured card and the
  stack are layout 4's only date controls, and they follow `hit` (a dead cue features nothing,
  and the card prints `calPrompt`).
- **Harness.** `preview.jsx` takes `&today=` beside `&cj=`, and **it is opt-in**: with no
  `&today=` a `live=1` render reads no date, so `scripts/digest.mjs`'s live output does not move
  from day to day. The prompt's expected "`live=1` calendar changes" therefore lands only with
  `EXTRA='&live=1&today=…'`, and in the real published tab.
- **Digest** (all categories, themes 0, 1, 2, three widths, 387 renders each), against HEAD:
  canvas **byte-identical**; canvas with `&today=2026-09-17` **byte-identical** (ignored
  without `live`); `live=1` **byte-identical**; `live=1&today=2026-09-17` differs in **36
  files, all `cat_calendar_*`** (4 layouts × 3 themes × 3 widths). That is the named cost:
  the seed's `open` is in the past.
- **Harness behaviour** (`scratchpad/f20-probe.mjs`, `&live=1&today=2026-09-17`, layouts 1–4
  × themes 0, 1, 2 × three widths, five cases, no page errors):
  - **Seed:** layouts 1 and 3 open on September 2026, only 17–30 take a handler, and the foot
    prints the prompt. Layout 1's left arrow wraps to August 2027. Layouts 2 and 4 have no
    pickable row (every seeded slot is 2025), and their foot prints the prompt.
  - **`open=2026-09-10`:** the same, because a cue earlier in today's month is dead.
  - **`open=2026-11-05`:** the grid opens on November with the 5th cued, all 30 days are
    pickable, and the left arrow wraps to October 2027.
  - **Slots 09-10 / 09-17 / 10-01 with the cue on 09-17:** layout 2 offers the last two, and
    its foot reads "Thursday late selected". Layout 4 features 09-17 and offers only 10-01.
  - **The same slots with the cue on 09-10:** the prompt, and layout 4 offers 09-17 and 10-01.
  - **Everywhere:** no dead item is struck through. Lime dims a dead item to .38.
  - **Screenshots** (Retro layouts 1 and 2 with 09-22 booked) show a dead item muted with no
    strike and the booked one struck.
- **Published tab** (`scratchpad/f20-pub.mjs`, the editor at 1600, Retro, *Publish* → *Open*,
  trusted clicks), 19/19. The canvas still shows June 2025 with the 12th cued and no day
  handlers. The popup at 1440, 768 and 390 opens on today's month (September 2026), offers
  exactly today..30, prints the prompt, does not overflow, ignores a trusted click on the 1st,
  and picks today on a trusted click. No page errors.
- **Named edges.**
  - **UTC:** a visitor at UTC−10 late in the evening finds their own today already dead, and
    one at UTC+10 early in the morning can still pick their own yesterday.
  - **`BookedField` cannot reach the published window.** The editor's month picker covers
    `CAL_SPAN` months from `open`. With the seed that is June 2025 – May 2026, while the
    published page shows September 2026 – August 2027, so the artist cannot block a date a
    visitor can pick until they move `open` forward. The `open` hint now says a past date opens
    the published page on today's month. Left for the sweep.
  - The published first paint no longer matches the canvas whenever `open` is in the past.
    This is accepted and named in CLAUDE.md.
- **Docs:** `sectionVm`'s calendar comment and its slot comment, `PublishedPage`, the
  `blocked` comment and layout 1's three-states comment in `EncoreSection`, `preview.jsx`'s
  `&today=` comment, `data.js` §4.10 (now at `:~1345`, not `:~1246`), the `CAL_SPAN` comment and
  the `open` field hint, CLAUDE.md's calendar paragraph ("Nothing on the canvas reads the
  clock" plus the live-only rule), and README's calendar paragraph.

---

## F15 — a photo over ~4 MB is ignored without a message

> A photo larger than ~4 MB is silently ignored, with no message.

**Verdict: not reproduced as stated.** `readImage` (`EncoreBuilder.jsx:~1507`; `:~1576` after the fix) rejected over
4 MiB with the toast "That image is too large — 4 MB maximum", and the toast renders. It was
checked in headless Chrome by uploading 5 MB `.png` and `.jpg` files to the header's Background
photo, on the dev build and on the committed root `index.html`, at 1600 (toast bottom-centre over
the canvas) and at 390 (in the mobile edit sheet). Every upload path (`ImageField`,
`ImagesField`, `RowThumb`, file input and drop) goes through the same function.

**What may have been seen instead.**
1. **The message is easy to miss.** On desktop the toast appears at the bottom-centre of the
   *canvas*, ~600 px from the field in the sidebar, for 2.4 s, and the dropzone itself does not
   change. That reads as "ignored".
2. **A replaced toast.** `toast()` dismisses the previous toast, so if anything else toasts
   within 2.4 s (e.g. the gallery's "Room for 7 photos here" on a multi-select), the size
   message disappears.
3. **A drop onto a filled `ImageField`.** The filled state has no drop handlers, so the browser
   handles the drop instead (it may open the file in the tab). That is not size-specific, but it
   is silent.
4. **4 "MB".** Finder's 4.2 MB is 4.0 MiB. The limit is in MiB, so a "4.1 MB" file is refused
   while the message says 4 MB. That is not silent, but confusing.

**Decision needed.** First ask the tester or the user for the exact steps (which field, drop or
click, which browser, which build). Then, recommended regardless:
- An **inline error** under the control that refused the file, persisting until the next
  successful pick, in addition to the toast. This fixes (1) and (2).
- Drop handlers on the filled `ImageField` (drop = replace), which fixes (3).
- Say "4 MB" and mean 4 000 000 bytes, or keep MiB and print the file's own size in the
  message ("This image is 4.3 MB — the limit is 4 MB").

**Verify.** Upload 3.9 MB, 4.1 MB (decimal) and 5 MB files through every control, by click and by
drop. Check that the error sits next to the control, and that a following valid pick clears it.

**Decision.** 2026-09-17. The tester's exact steps are **unknown**, so the three recommended
changes all go in: an inline line beside the refusing control (with the toast), drop handlers on
a filled `ImageField`, and the limit and wording below. **"4 MB" means 4 000 000 bytes**, the
decimal megabyte Finder prints, so a file Finder calls 4.1 MB is refused and one it calls 3.9 MB
is not.

**Settled.** 2026-09-17.
- **`imageProblem(file)`** (beside `readImage`, `EncoreBuilder.jsx:~1567`) returns `null` or one
  sentence, the `urlProblem` shape: "Please choose a PNG or JPG", or "That image is 4.1 MB — the
  limit is 4 MB" against **`IMAGE_MAX = 4_000_000`**. The size is rounded **up** to one decimal,
  so 4 000 001 bytes prints 4.1 and never a "4.0 MB" that reads as under the limit. `readImage`
  now only reads. **`vetImages(files, onToast)`** vets one pick: it toasts the line and returns
  `{ ok, msg }`, or `null` for a pick that carries no file (a text drag), which leaves the line
  up. Two or more refusals in one batch give one line, "2 photos were not added — each must be
  a PNG or JPG of 4 MB or less", instead of toasts that replace each other.
- **The line is decided at pick time, never as the reads land.** A `FileReader` finishes later,
  so clearing the line in `onload` would let the good files in a mixed batch wipe a refusal. A
  pick sets the line to its own verdict: a refusal replaces the line, and a clean pick clears it.
  **Remove does not clear it**, since it is not a pick. The line is a `role="alert"` `<p>` in
  `ERR_LINE` (now shared with `UrlInput`), and the control's border turns `#B3261E` while it is
  up (the dashed zone, the filled photo, the `Add` tile, the row thumb).
- **Where it sits.** `ImageField`: under the dropzone, or under Replace / Remove. `ImagesField`:
  under the "n of 7" line, kept when the grid is full, because the good files in the refused
  batch can fill the last slot. **The room is counted in files that pass**: the pick is vetted
  first and `ok` is then cut to the room, so a refused file takes no slot (before this, with
  three slots left, `[5 MB, a, b, c, d]` landed only `a, b`). The room toast fires only when
  more *good* files arrive than there is room for, and it fires before the refusal toast, so
  the refusal is the toast left standing. **`RowThumb` holds no line**, because its 46px column has no
  room for one. It takes `onFail(msg | null)` and `failed`, and `TracksField` keeps one
  `refused = { i, msg }` and prints it under row `i` (the row wraps; the line is indented to the
  thumb). `removeAt` shifts or drops it, so the line moves with its track rather than passing to
  the row that moves up (rows key on index). A clean pick on another row leaves it.
- **A filled `ImageField` is a dropzone.** The wrapper round the photo and its buttons takes the
  same `dragover` / `drop` handlers, so a drop replaces the photo, and a refused drop keeps the
  old one and prints the line. A multi-file drop takes the first file, as the empty zone always
  did. The filled `RowThumb` already took drops.
- **`EditPanel` is keyed on `selectedSec.id`** (sidebar and edit drawer). The fields key on
  `f.k`, and header and bio both have `image`, so clicking Bio on the canvas while the header
  panel was open would have handed the header's line to Bio's photo. `EditPanel` holds no state
  of its own, so the key only remounts the fields. This also fixes the same latent case for
  `UrlInput`.
- **The limit is stated up front**: the captions read "PNG or JPG up to 4 MB · from your device".
- **Verified** (`scratchpad/f15.mjs`, dev build, Retro, 1600 and 390 with touch, 64 checks
  each, all pass, no page errors). Zero-filled `.png` / `.jpg` files by click
  (`ElementHandle.uploadFile`) and synthetic `DataTransfer` drops:
  - **`ImageField`** (header *Background photo*, filled): 5 MB, 4.1 MB, 4 000 001 bytes and a
    `.txt` are each refused with the right line and toast, and the photo is kept. 3.9 MB and a
    JPG replace the photo, and exactly 4 000 000 bytes is accepted. This holds by click and by
    drop. After Remove, a drop and a click on the empty zone are refused, and a small PNG fills
    it and clears the line. A two-file drop is decided by its first file, and a file-less drop
    leaves the line.
  - **Section switch:** Bio's *Photo* shows no line after a canvas click.
  - **`ImagesField`** (gallery, emptied): single refusals and accepts by click and drop, the
    mixed batches (the two-refusal line and one photo added; a click batch), and the overflow
    cases: a refused file takes no slot and its line stays on the full grid, Remove keeps the
    line, two good files into one slot give the room toast and clear the line, and a refused
    file plus a good one into one slot land the good one with no room toast. A final clean pick
    fills the grid and clears the line. (A dismissed toast stays in the DOM, still marked
    visible, for about a second while it animates out, so a toast check has to wait that out.)
  - **`RowThumb`** (media tracks): the line appears under the refusing row, moves between rows,
    survives a clean pick on another row, clears on a clean pick on its own row, follows its
    track when row 1 is deleted and goes when its row is deleted. An added empty row is refused
    by drop and then filled by click.
  - **Everywhere:** each line sits 3–6px under its control (or inside its row, left-aligned with
    the thumb), is on screen once scrolled to, is the topmost element at its point, and
    `scrollWidth` does not grow. Screenshots at 1600 and 390 were taken with
    `captureBeyondViewport: false`.
- **Digest** (all categories, themes 0, 1, 2, three widths): canvas **387** and `live=1`
  **387**, all **byte-identical** against HEAD. The change is chrome-only, like F24.
- **Named, not fixed.** A drop that lands off the zone (the gap under it, the line itself, a
  thumb's round Remove) is still the browser's to handle. Windows Explorer prints MiB as "MB",
  so a Windows user's "3.9 MB" file (4 089 446 bytes) is refused with "That image is 4.1 MB".
  The message prints the decimal size, so it names the file's actual size.
- **Docs:** the `IMAGE_MAX`, `imageProblem`, `readImage` and `vetImages` comments, `RowThumb`'s,
  `TracksField`'s `refused`, the filled-zone comment in `ImageField`, `ImagesField`'s line, and
  the `EditPanel` key. README and CLAUDE.md name no upload limit, so neither changed.

---

## End-of-pass sweep

- Re-read every entry's **Docs** line and check that CLAUDE.md and the comments agree with the
  code.
- `npm run build` and `npm run build:standalone`, then `cp source/dist-standalone/index.html
  index.html` and commit it separately ("Refresh index.html for the Retro QA fixes").
- Digest themes `0,1,2` before and after the whole branch. The only moved files should be the
  ones entries F4 (overflow cases, plus Grunge's seeded `map` layout 2 at 768 / 390, see its
  *Settled*), F10 (not seeds) and F2 (option C only) name.
- Update `plans/README.md`'s Retro table row for this plan.
- Decide whether to delete `bio.statement` and `map.sub` along with the unreachable fallthrough
  branches that read them (F2's *Settled*).
- A field added by any entry needs its `in` (F2): re-measure, don't guess.
- Under Lime, pricing layout 2 shows "Review count (layout 2)" and its four siblings with the
  note directly beneath (F2's *Settled*). Decide whether those labels lose the suffix.
- `BookedField` pages `CAL_SPAN` months from `open`, but the published window starts at
  `max(open, today)` (F20). With a past `open`, the artist cannot block a date that a visitor
  can pick. Decide whether the picker should follow the same rule, or whether the `open` hint
  is enough.

**Decision.** 2026-09-17:
- **(a) Delete** `bio.statement` and `map.sub`, together with the unreachable fallthrough
  branches that read them.
- **(b) Drop the "(layout 2)" suffix** from the five Lime-contradicted pricing labels. The hint
  names the layout, and the note under Lime tells the truth.
- **(c) `BookedField` pages from `max(open, today)`**, the published window, so the artist can
  block any date a visitor can pick. The canvas still reads no clock.
- The user asked for the result to be **checked in a real browser** as well as in the headless
  harness.

**Settled.** 2026-09-17.
- **(a) Deleted:** the `bio.statement` and `map.sub` fields, `DEFS.statement`, `DEFS.mapSub`,
  `vm.bioQuote`, `vm.mapSub`, the bio and map fallthrough branches in `EncoreSection` (each
  function now ends in a commented `return null`), and `kickerStyle`, whose only caller was the
  bio fallthrough. **Named, not done:** the other seven NVAR-4 sections (media, pricing,
  repertoire, gallery, calendar, testimonials, form) still end in an unreachable fallthrough.
  The decision covered the two that read dead fields. Deleting the rest would also take
  `vm.cities`, `s.tracks3` and the flat pricing and form bodies, so it is a follow-up of its own.
  CLAUDE.md now says so: a field no design reads is deleted, not kept at `in: []`.
- **(b)** The five labels read *Reviewer photos*, *Review count*, *Rating*, *Plan card button* and
  *Line beside the plan card button*. Their hints name a place on the card, not a layout
  number. `cta` is named for its card so that it still reads apart from `rowCta`'s
  "Button (layout 4)", following F2's rule for same-named pairs. **In the browser:** under Retro
  layout 2 the five show no note. Under Lime layout 2 all five carry "Not shown in this layout",
  and no label contradicts it any more.
- **(c)** `calStart(open, today)` (`data.js`, beside `isoDate`) is the one statement of
  `max(open, today)`. `sectionVm` calls it with `live ? today : null`, and `BookedField` reads
  today once per mount (`useState`, UTC, `PublishedPage`'s recipe) and pages from it. A day
  before today is faded (.4), `disabled` and has no hover, unless it is already blocked: a
  blocked past day can still be unblocked. With a past `open`, the panel now pages months the
  canvas does not draw (the canvas stays on `open`'s June 2025). That is named in the hint and in
  CLAUDE.md, and is the price of letting the artist block what a visitor can pick.
  **In the browser** (chrome-devtools, 1600, Retro, the real app):
  - The panel opens on September 2026 with 1–16 disabled. A trusted click on the 6th does
    nothing, and a trusted click on the 22nd blocks it ("1 blocked · 1 in September 2026").
  - The left arrow wraps to August 2027, which has no disabled days, and the right arrow returns.
  - After *Publish* → *Open* (trusted), the published calendar shows September 2026 with the 22nd
    struck, and 17–30 minus the 22nd are pickable. There is no overflow and the popup console is
    clean.
  - **At 390** (headless, touch, in the edit drawer): the same month, 16 disabled days, a tap on
    the 22nd blocks it, the 3rd ignores a click, and `scrollWidth` is 390.
- **F15 in the browser** (chrome-devtools `upload_file`, header *Background photo*): a 4.1 MB
  file prints "That image is 4.1 MB — the limit is 4 MB" under Replace / Remove with the same
  toast, and the photo is kept. A 248 KB JPG replaces the photo and clears the line.
- **Console, named:** the editor logs one 404 and six React "Updating a style property during
  rerender … background / backgroundImage / backgroundPosition / backgroundSize" errors on a
  Lime → Retro switch. The **branch base (61fd5ff) logs the identical seven**, so they predate
  this pass. Left for a later session.
- **Docs audit** (every entry's Docs line, by a read-only agent, then fixed): three "the published
  tab alone knows the date" comments (data.js §4.10, the `sectionVm` calendar comment,
  `PublishedPage`); "flat layout" wording for code that is now named unreachable (`vm.cities`,
  calendar layout 3's `heading` comment, CLAUDE.md's calendar and form sentences, and the
  `tracks3` sentence in the media paragraph); README's layout-folding bullet (seven of ten
  non-header categories offer more numbers than designs, not all ten); and the triage-era line
  references in F9, F18 and F24, which are now annotated with their sweep positions.
- **No field was added after F2** (`git diff 4fbc829 HEAD -- data.js`). F18 only gave four
  existing fields `type: 'url'` and left their measured `in` as it was, so there is nothing to
  re-measure.
- **Digest, branch base → HEAD** (all categories, themes 0, 1, 2, three widths, canvas and
  `live=1`, 387 + 387; the base at 61fd5ff served from a worktree on :5190 with HEAD's
  `preview.jsx`, because F25 changed the harness's `navSections`). Normalising the port and
  Vite's `?t=` HMR stamps (the probe cuts `src` at 40 characters, so a stamp can survive as a bare
  `?t` or `?`) leaves **exactly 2 + 2 moved files**: `map` layout 2 under Grunge at 768 and 390,
  on both surfaces. That is F4's named diff. F10 and F2 moved no seed, and F20 moves only with
  `&today=`.

## Conventions learned on this pass

*(Filled in as sessions settle things.)*

- **A grid track that holds user text is `minmax(0, 1fr)`, not `1fr`** (F4). A bare `fr` floors at
  min-content, so a descendant's `nowrap` + ellipsis never engages and the page widens instead.
  Lime's blocks mostly write it already; Retro's older `v0` / `v1` branches do not.
- **Seed a harness case with `&cj=`** (F4): `encodeURIComponent(JSON.stringify({ gigs: [...] }))`.
  Keep the case script in the scratchpad, drive it with puppeteer-core plus
  `scripts/headless-shell.mjs`, and measure `document.documentElement.scrollWidth`.
- **A field's reach is measured** (F2): render with and without a sentinel in `&cj=` and compare
  `#root.innerHTML` at three widths, on the canvas and with `live=1`. A field no design reads
  still keeps its copy, and its `in` says so.
- **A guarded choice in a Radix `Select` disables items and keeps them** (F9). An item that
  disappears can leave the value naming nothing, and the trigger then renders blank. To drive
  the editor, click *Back to page list* first, because the editor opens on the header's panel.
- **An address field is a `UrlInput`** (F18): `type: 'url'` in `FIELDS`, or the component
  itself in a repeater. Its rule is `urlProblem()`, and `extUrl()` returns `''` for anything that
  rule refuses. A new outbound seam reads `extUrl()`, and its editor input uses `UrlInput`.
- **A label with nothing to point at is dropped from the published page and kept on the canvas**
  (F25). The editor names it: the canvas stays unmarked, because it is a picture of the site.
  Pills are different: one with no target stays a span. The drop happens in `sectionVm` under
  `live`, before anything is measured or halved from the list.
- **A `patch` updater stays pure** (F24). Read what a handler needs off the rendered `st`.
  React may run the updater after the handler returns, so a flag set inside it can still be
  unset when the next line reads it.
- **Open a Radix trigger inside a vaul drawer with a trusted click** (F24). The synthetic
  `pointerdown` recipe (F9) is fine on desktop, but inside a mobile drawer it leaves the drawer
  closing on the next trusted press.
- **The clock is read in the published tab only, once, and passed down** (F20). `sectionVm`
  ignores `today` unless `live`, and the harness's `&today=` is opt-in, so neither the canvas
  nor the `live=1` digest moves from day to day. A past day is `dead`, not `booked`, and the
  section tests both through one `blocked()`.
- **An upload refusal is printed beside the control as well as toasted** (F15). It is decided
  at pick time (`vetImages`) and never when a read lands. A control too small for a sentence
  hands the line to its repeater (`RowThumb`'s `onFail`), and the repeater moves the line with
  its row. A field's local line survives only within its own section, because `EditPanel` is
  keyed on the section id.
- **Digest across a branch needs the same harness on both sides** (sweep). Serve the base from
  a worktree with HEAD's `preview.jsx` copied in and a cloned (`cp -Rc`), not symlinked,
  `node_modules`, because a symlink shares `.vite` with the live server and re-optimises it.
  Normalise the port and `?t=` stamps before `cmp`.
- **A field no design reads is deleted** (sweep), together with the branch that read it. `in: []`
  is a way station, not a state.
