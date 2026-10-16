# Editor — QA fixes (JP-141 … JP-151)

The tester's batch against the three editor features of 14 Oct: the header's **Tags as rows**
(`60ef561`), the **panel field → canvas box** (`d821577`) and **the canvas following a moved
section** (`2937b0c`). All eleven are in builder chrome (`EncoreBuilder.jsx`); none touches
`EncoreSection` rendering, `sectionVm` or the caps, so the batch is filed against every template
at once, like [`photo-focus-qa-fixes.md`](./photo-focus-qa-fixes.md). The tester's repros are
Retro, at 1440 / 768 / 390; the code is template-blind.

Branch `editor-qa-fixes`, from `main` (`ae7b47a`). Three fix sessions, one per group below, then
a short sweep. Triage is **read off the code, not yet reproduced** — each session starts by
reproducing its tickets (step 1 of the procedure) and corrects this file where the cause differs.

## The batch, as filed

(Translated from the tester's Ukrainian.)

> **JP-141** (Medium, proposed) — A comma typed from the keyboard does not split a tag. Retro,
> Header L1 → Add tag → type "Jazz, Soul". Expected 2 rows ("typing … a comma splits", the
> developer's own comment). Actual: one tag "Jazz Soul" and an empty row under it; the comma
> vanishes, the cursor stays in the same row. Falsifying check: pasting the same text gives 2
> rows, so only a *typed* comma is wrong. No AC covers this.
> **JP-142** (Medium, proposed) — A comma at 8 of 8 silently deletes the last tag. 8 tags, cursor
> at the end of row 4, type ",": an empty row 5 appears, the last tag "Soul" is gone, no
> message. Cmd+Z does not bring it back.
> **JP-143** (Medium, proposed) — Editing after a switch to a layout with a lower count limit
> deletes the extra tags. L1, 8 tags → Header layout 5 (limit 6): counter "8 of 6 · shortened"
> → type one letter in row 4. Actual: tags 7 and 8 are gone for good. Falsifying check: without
> an edit, going back to L1 restores all 8.
> **JP-144** (Low) — Backspace in a row longer than the limit cuts the row to the limit. L1 →
> tag "Corporate Events Party" (22) → L5 (limit 15) → one Backspace. Actual: "Corporate Event",
> seven characters lost. Control: the Title field in the same state (30 / 20) loses one.
> **JP-145** (Low) — A paste over the count limit silently drops the rest. 6 tags + an empty row
> → paste "Jazz, Soul, Funk, Disco, Blues". Actual: Jazz and Soul added; Funk, Disco, Blues gone,
> no message. Other lists in the editor reject such a paste whole.
> **JP-146** (Low) — Focus on Title or Badge text outlines the nav logo. Both hold "Kai Mercer";
> the first match in the DOM is taken, so the box is round the small "KAI MERCER" in the nav, not
> the hero title or the badge. Control: Badge text "Night Owl" does outline the badge.
> **JP-147** (Low) — Focus on a tag row gives no box (checked with a real click). The box shows
> only while typing.
> **JP-148** (Low) — The badge's box is offset: it covers only the lower-right quarter of the
> badge and runs outside it.
> **JP-149** (Low) — A clamped title gets no box. Header L5, Title "The Midnight Hour Wedding
> Band" → the page shows "The Midnight Hour…" → focus Title: no box. The developer named
> "clamped text" among his own checks.
> **JP-150** (Low) — Focus on Photo in the Bio does not scroll. The section shows only as a 69 px
> strip at the foot (tablet), the photo itself (y 967) is off screen. Such a strip counts as "in
> view".
> **JP-151** (Medium, proposed) — On a phone a moved section jumps up. Edit drawer closed, Bio
> mid-screen (250 px) → ↓ on the toolbar. Actual: the section jumps to 16 px, the toolbar goes
> from y 308 to 93, the second tap lands on the photo. Control: a section already at the top
> stays put.

## Triage

| Ticket | Site | Verdict (from the code) | Size | Status |
|---|---|---|---|---|
| JP-141 | `LineListField.edit` | **Reproduced**: the typed comma splits into two rows, but focus stays on row `i`, whose text is now "Jazz"; the next keystroke lands there, and the blank row below is the one the tester sees. A paste never has a caret to keep | S | fixed (session 1) |
| JP-142 | `LineListField.edit`, `next.slice(0, max(max, i+1))` | **Reproduced**: a split at the cap makes 9 rows, and the slice drops the *last* | S | fixed (session 1) |
| JP-143 | the same slice | **Reproduced**: `max` bounds the result, not the growth, so *any* edit at 8 / 6 cuts to 6 | S | fixed (session 1) |
| JP-144 | `LineListField.edit`, `t.slice(0, cap.chars)` on every piece | **Reproduced**: the slice runs on a single-item edit too, so a delete in an over-long row snaps to the cap (22 → 15) | S | fixed (session 1) |
| JP-145 | the same slice | **Reproduced**: the slice is the only guard; `CappedText`'s list guard (`capExcess`) refuses the edit whole | S | fixed (session 1) |
| (found in triage) | the row `Input`'s `maxLength={cap.chars}` | **Latent, reproduced**: the browser truncates a multi-item paste *by total length* before `edit` sees it — "Corporate Events, Weddings, Festivals" (37) into a 22-cap row arrives as "Corporate Events, Wedd", two pieces, the second mangled, no count limit involved. `CappedText` omits `maxLength` for list fields for exactly this reason | S | fixed (session 1) |
| (found in session 2) | `findFieldNode` on a tag row | **Latent, reproduced**: a one-word tag ("Live") matched the first element holding the word, the kicker or the subtitle, so the box landed on a sentence, and on layouts that draw no chips (Retro 2, and layout 2 of every template) there is no chip at all. A tag row now takes only the chip that is the row (or its `…`), else no box | S | fixed (session 2) |
| JP-146 | `findFieldNode`, `!best \|\| best.contains(el)` | **Reproduced, and the default state on every template**: the first non-nested match in DOM order wins, and the nav brand precedes the hero. `badgeText` has no static default (it is seeded from the name, `CLAUDE.md`'s artist-name paragraph), so Title, Badge text, the nav brand and the seal's `<textPath>`s all hold the same text on every template's header out of the box, not on Retro alone. Text cannot tell two fields with the same text apart | M | fixed (session 2) |
| JP-147 | `onFocusField`, wrapper `onFocus` passes `val` | **Reproduced**: `tags` has no `type`, so `val` is the whole comma string, which no element holds. Typing passes `e.target.value`, the row, which does | S | fixed (session 2) |
| JP-148 | `findFieldNode` on the seal | **Reproduced**: the seal's name is two `<textPath>`s, the first of them the match, so the box is one arc's bounding box (rotated, `seal-spin`), not the disc; and the tilted svg's own box is 1.38x the disc, so the fix reads the disc off `getScreenCTM()` | S | fixed (session 2) |
| JP-149 | `findFieldNode`'s retry | **Reproduced**: the second try is the first *16 characters*, "themidnighthourw", and the page holds "themidnighthour…" | S | fixed (session 2) |
| JP-150 | `scrollFieldIntoView`, no-node arm | **Read off the code** (the 69 px strip cannot be set up exactly, scroll range clamps it; checked after the fix at 148 / 300 / 500 px visible of a 422 threshold: scrolls, scrolls, stays): "in view" is any overlap of the section with the band, so a 69 px strip passes | S | fixed (session 2) |
| JP-151 | `markFollow` / `scrollFieldIntoView` band | **Likely**: on a phone the band is the top 16vh *always*, though it is the Edit drawer that leaves only that strip. With the drawer shut, a section at 250 is "unseen" and is scrolled to the top | S | open |

## Calls

Put to the user in one sitting (2026-10-16). **Decided: calls 1 and 2 as recommended.** Call 3 was
not asked, since it has no real alternative.

1. **Over a limit, refuse the edit whole** (**decided**; session 1). A typed comma at the cap
   (JP-142), an over-long paste (JP-145) and a character past a row's cap are refused, not
   trimmed. It is `CappedText`'s own rule (`capExcess(next) > capExcess(prev)` → return), so the
   list editors agree, nothing is lost silently, and the counter under the rows (`n of cap`) is
   what says why. Alternative: take what fits and say so in a line under the rows — more code,
   a state that has to clear, and unlike every other list.
2. **Two fields with the same text: rank, do not mark** (**decided**; session 2; JP-146).
   `findFieldNode` collects every minimal match and the *field's key* picks among them (`title`:
   the largest font; `badgeText`: the match inside an `svg`; every other key: the first, as now).
   `CLAUDE.md` bars field markers in `EncoreSection` "without a reason the text match cannot
   meet" — this is one, but a ranking in chrome meets it with no change to the section. Markers
   come in only if the probe finds a collision the ranking cannot settle.
3. **Taken as the default, no call needed.** An edit that does not raise the excess is always
   allowed, so at 8 of 6 the artist may edit, shorten or remove rows (JP-143); stored copy is
   never trimmed by an edit, only by the clamp at render, as `CLAUDE.md` says of every field.
   On a phone the 16vh band exists only while a drawer covers the canvas (JP-151).

## Per-session procedure

One session per group, clear context between them; git and this file are the memory.

1. Read `CLAUDE.md`, this file, and the notes the session names. Read the memory notes
   `browser-tool-choice` (chrome-devtools MCP for the real-app steps; `scripts/digest.mjs` on the
   cached headless shell when it drops) and `verifying-the-published-tab`.
2. **Session 1 only, first:** `git switch -c editor-qa-fixes main`, then commit this plan and the
   `plans/README.md` row as `Plan: editor QA fixes (JP-141 … JP-151)`.
3. **Reproduce each ticket in the real app** (`npm run dev`, Retro, the ticket's own steps and
   width) and check its *falsifying control*. Where the cause differs from the triage table,
   correct the table before writing code. The fixes are chrome, so the builder's `st` and the
   DOM are the evidence; read `st` through the fiber tree as `browser-tool-choice` records.
4. Fix, then re-run the steps and the controls, then the session's own *Check* list.
5. Record the decisions in the notes file the session names, tick the table's *Status*, and run
   `npm run build` once.
6. **Stop and hand off:** say the unit is closed and print the next session's opening prompt,
   filled in. No `index.html` refresh before the sweep.

## Session 1 — Tag rows (JP-141 … JP-145)

Reads: `notes/list-editors.md` (§ *Delimited lists as rows*), `CappedText` and `capExcess`
(`data.js`). All in `LineListField` (`EncoreBuilder.jsx`).

**One guard replaces three rules.** Drop `maxLength` from the row `Input`s, and drop the
`slice` and the per-piece `t.slice(0, cap.chars)` from `edit`. After building `next`, refuse
the edit (`return`, so the controlled box snaps back) when
`capExcess(join(next), cap) > capExcess(join(rows), cap)`, and also when
`next.length > max && next.length > rows.length` — `join` drops blank rows, so without the
second test a blank row at the cap gets in, and nobody can type in it. Walked through the
tickets:

| Ticket | Edit | Excess before → after | Row count | Result |
|---|---|---|---|---|
| JP-142 | `,` in row 4 at 8 of 8 | 0 → 0 | 8 → 9, grows past 8 | **refused** by the row-count test (the excess alone would let a dead blank row in) |
| JP-143 | a letter in row 4 at 8 of 6 | 2 → 2 | unchanged | **allowed**, rows 7 and 8 stay |
| JP-144 | Backspace, 22 → 21 at cap 15 | 7 → 6 | unchanged | **allowed**, one character lost, as Title |
| JP-145 | paste of 5 into a blank row, 6 + blank, max 8 | 0 → 3 | grows | **refused** whole, as the other lists |
| JP-141 | `Jazz,` in the blank row at 7 rows of 8 | 0 → 0 | 7 → 8 | **allowed**, the split proceeds |
| latent | paste of 3 items, each ≤ 22, into a 22-cap row | 0 → 0 | grows within max | **allowed**, whole: no browser truncation |

- **JP-141.** When an edit splits a row (`pieces.length > 1`), move focus to the row holding the
  caret: refs to the row inputs, a pending `{ row, caret }` set in `edit` and applied in a layout
  effect once the rows are committed. A typed comma lands the caret at the *start* of the
  remainder (the new row, or the next piece); a paste lands it at the end of the last piece. Work
  the caret out of `e.target.selectionStart` against the pieces' untrimmed offsets. A single
  item's *leading* space is dropped as typed (`trimStart`; the trailing one stays, it starts the
  next word), so " Soul" typed into a fresh row shows as "Soul".
- **Check.** The tickets' own steps and controls (paste still splits; Title unchanged; L5 → L1
  restores 8). Add: comma in the middle of a row (both halves kept, caret at the start of the
  second); comma on a blank row (nothing lost); a paste with a blank piece ("Jazz,,Soul"); the
  multi-item paste into a capped row above (not truncated); a character typed at the cap is
  refused; Remove on an over-limit list; layout swap and undo still rebuild the rows
  (`emitted`). Run it once more on a template with another cap table (Pop: count 6, chars 22).
- **Notes.** `notes/list-editors.md`: the guard, why there is no `maxLength`, focus after a split.

## Session 2 — Field → canvas box (JP-146 … JP-150)

Reads `CLAUDE.md`'s *A focused panel field walks the canvas* paragraph and `notes/templates.md`
for the seal. `findFieldNode`, `scrollFieldIntoView`, `onFocusField` and the EditPanel wrapper's
`onFocus`.

- **JP-147.** The wrapper's `onFocus` reports `e.target.value` when the target is an input or a
  textarea (as `onInput` already does), else `val`. The select / repeater arms are untouched
  (`text` is `''` for them).
- **JP-149.** Retry by *word prefixes*, longest first (all the first line's words, then one fewer,
  …), not a fixed 40 / 16 characters. A prefix is tried only down to two words or ~8 squashed
  characters, to keep a lone "The" from matching a paragraph.
- **JP-146.** `findFieldNode(root, text, key)` collects every minimal match (today's loop, kept
  as the default: the first) and ranks by the field's key, per call 2. **The key rides in
  `focusF`** (`{ sid, text, key }`): the box-following `useLayoutEffect` calls `findFieldNode`
  too, and without the key it would pick a different node than the scroll did.
- **JP-148.** When the winner is inside an `svg`, box its outermost `svg` (or the disc wrapper if
  the seal's root is rotated), not the text element. Probe the real DOM first: which element wins
  at each of the seal's four arms (lines ~1474, 1509, 1561, 1596 of `EncoreSection.jsx`), and
  whether the spinning `seal-spin` group moves the box between frames.
- **JP-150.** The no-node arm counts a section as in view only when at least
  `min(its height, half the band)` of it is inside the band. Same helper as session 3's band, so
  keep its band argument.
- **Check.** Each ticket's steps at the width it names. Controls: "Night Owl" still boxes the
  badge; every `FIELDS` text key in the header, bio and calendar still boxes what it did (a
  before / after pass over the existing keys through the real app, since this is chrome and no
  digest sees it — a harness walk that focuses each field and records the box vs the section's
  rect). A collision-less field must pick the same node as before. **The collision probe runs on
  all five templates' header layout 1 and on layout 5, not on Retro's alone**: the seal's text
  size and arm differ by template (Lime's name is 17.61 round a 109.3 circle) and the default
  state collides everywhere.
- **Notes.** `CLAUDE.md`'s *A focused panel field walks the canvas* paragraph (ranking, word
  prefixes, the seal, the in-view floor) — it is the only place the feature is recorded.

## Session 3 — A moved section on a phone (JP-151)

Reads `CLAUDE.md`'s phone paragraph on the Edit drawer. `markFollow`, `followSection` and
`scrollFieldIntoView`'s band.

- Compute the band once, `canvasBand(scroller, covered)`: the whole scroller unless `covered`,
  then its top 16vh. `covered` is a drawer that hides the canvas: `isMobile` and
  (`st.editSheet && selectedSec` or `st.sheet`). `move` and `reorder` read it, so add it to their
  deps, and `onFocusField` keeps passing `isMobile` only if the Edit drawer is the sole way to
  focus a field on a phone (it is: `editSheet`).
- Then JP-151's own case is `seen = true`, and `followSection` keeps the section where it was.
  The drawer-open case (a move from the Sections sheet, or the Edit drawer) keeps the old rule.
- **Check.** 390 × 844, Bio at 250: ↓ twice, the toolbar stays put, the second tap moves Bio
  again. Bio already at the top stays. Bio out of view (a move from the Sections sheet) is still
  scrolled to, under the sheet. The desktop and tablet sidebar arrows and drag are unchanged.
- **Notes.** One line in `CLAUDE.md` where the phone band is described (the field-walk
  paragraph says "the top 16vh the Edit drawer leaves free").

## Sweep (after the three)

- `npm run build` and `npm run build:standalone` clean; the two-build digest is expected to move
  **nothing** (no `EncoreSection` or `data.js` change) — a diff is a finding.
- A pass over every `list: ','` / `'\n'` field that has no `rows` yet is **not** in scope; the
  note in `notes/list-editors.md` says they can opt in the same way, and the next opt-in inherits
  these fixes.
- Refresh `index.html` and `published.html` as the separate step `CLAUDE.md` describes.

## Not done / out of scope

- An undo for tag edits (JP-142's "Cmd+Z"): the fix removes the loss, and the editor has no
  text undo stack; not taken.
- Markers on `EncoreSection` for the field walk (see call 2).
- The root `index.html` refresh and the commit, push and PR are the user's.
