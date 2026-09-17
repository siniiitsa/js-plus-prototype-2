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
| 1 | F4 | Long venue name widens the gig cards on mobile | **Confirmed**: layout 1 (spaced name) and layout 2 (one long word) | S | no | open |
| 2 | F10 | An empty media player shows the hardcoded "Night Rain" | **Confirmed** | S | no | open |
| 3 | F2 | Four fields edit nothing in layout 1 | **Confirmed**, and it is one case of a wider class | M | **yes** | open |
| 4 | F9 | Enquiry form can lose every box, Email included | **Confirmed** | S | small | open |
| 5 | F18 | Link fields don't validate (`not a url`, `javascript:`) | **Confirmed** | M | small | open |
| 6 | F25 | Footer link to a deleted section stays as a dead label | **Confirmed**: currently *documented as intended* | S | **yes** | open |
| 7 | F24 | Delete has no confirm or Undo, and re-adding resets the content | **Confirmed** | M | **yes** | open |
| 8 | F20 | Published calendar lets a visitor pick a past date | **Confirmed**: collides with a documented rule | M | **yes** | open |
| 9 | F15 | Photo over ~4 MB is ignored silently | **Not reproduced as stated**: see entry | S | **yes** | open |
| 10 | — | End-of-pass sweep | — | S | no | open |

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

**Settled.** —

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

**Settled.** —

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

**Decision.** —  **Settled.** —

---

## F9 — the enquiry form can lose every box, Email included

> Every field can be deleted from the Enquiry Form, Email included, with no warning.

**Verdict: confirmed.** `FormFieldsField.removeAt` (`EncoreBuilder.jsx:~2184`) filters with no
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

**Decision.** —  **Settled.** —

---

## F18 — link fields don't validate addresses

> Link fields don't check the address: "not a url" publishes as `https://not a url`, and a
> `javascript:` link publishes as a link that doesn't work.

**Verdict: confirmed.** `extUrl()` (`data.js:~1146`) prefixes `https://` onto anything with no
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

**Decision.** Whether to keep `//host` (protocol-relative) and bare `localhost`. The
recommendation is to drop both.  **Settled.** —

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

**Decision.** —  **Settled.** —

---

## F24 — delete is instant, can't be undone, and re-adding resets the content

> A section is deleted immediately, with no confirmation and no Undo. Adding it back resets its
> content to the defaults.

**Verdict: confirmed.** `del` (`EncoreBuilder.jsx:~3490`) filters the section out of `st.sections`,
and the content goes with it. `addSection` (`:~3500`) builds `{ c: {} }`. There are three call
sites: the section's dropdown menu (`:~1488`), the edit panel's delete (`:~2763`) and the mobile
list's trash icon (`:~4025`).

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

**Decision.** —  **Settled.** —

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

**Decision.** —  **Settled.** —

---

## F15 — a photo over ~4 MB is ignored without a message

> A photo larger than ~4 MB is silently ignored, with no message.

**Verdict: not reproduced as stated.** `readImage` (`EncoreBuilder.jsx:~1507`) rejects over
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

**Decision.** —  **Settled.** —

---

## End-of-pass sweep

- Re-read every entry's **Docs** line and check that CLAUDE.md and the comments agree with the
  code.
- `npm run build` and `npm run build:standalone`, then `cp source/dist-standalone/index.html
  index.html` and commit it separately ("Refresh index.html for the Retro QA fixes").
- Digest themes `0,1,2` before and after the whole branch. The only moved files should be the
  ones entries F4 (overflow cases only, not seeds), F10 (not seeds) and F2 (option C only) name.
- Update `plans/README.md`'s Retro table row for this plan.

## Conventions learned on this pass

*(Filled in as sessions settle things.)*
