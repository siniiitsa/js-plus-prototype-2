# Booking calendar — QA fixes (JP-152)

The tester's one ticket from the 19 Oct pass over sub-tasks 9–13: the booking calendar's month
arrows **wrap** from the last month of the window to the first, and from the first to the last,
where the developer's own comment on sub-task 11 says they should stop at the limit. It is one
cause at two sites — the published `Calendar` and the editor's `BookedField` — so it is one
session, filed against every template at once like [`editor-qa-fixes.md`](./editor-qa-fixes.md).
The tester's repro is Retro at 1440 (real clicks) and the other four (scripted); the code is
template-blind.

Branch `calendar-qa-fixes`, from `main` (`44c2461`). Triage is **read off the code, not yet
reproduced** — the session starts by reproducing the ticket (procedure step 3) and corrects this
file where the cause differs.

## The batch, as filed

(Translated from the tester's Ukrainian. Build: `fbda87c`.)

> **JP-152** — Booking Calendar: month arrows wrap from month 24 back to month 1 instead of
> stopping at the limit. On the last month of the window (September 2028) › / → shows October
> 2026; on the first month (October 2026) ‹ / ← shows September 2028. The arrows never stop or
> disable at either end, and nothing signals the jump back. On the published page the enquiry
> line keeps the picked date ("Enquiry for Saturday, September 16 at 9:00pm") over the October
> 2026 grid. Expected: the arrows stop at the ends of the window ("Check: page forward to the
> last month in both places, that the arrows stop at the limit"). No AC covers this. Surfaces:
> the editor's Booked dates picker, and the published page at layouts 1, 3 and 5, all five
> templates. Steps: Retro → Booking Calendar layout 1 → Booked dates → ‹ (September 2028) → ›;
> then Publish → Open → ← on October 2026 → →.
> Related: JP-027 (the same wrap at 12 months, closed to re-test 16.09.2026; the editor's
> picker did not exist then). `b39521a` only changed `CAL_SPAN` from 12 to 24, so the jump is
> now 23 months instead of 11.

## Triage

| Ticket | Site | Verdict (from the code) | Size | Status |
|---|---|---|---|---|
| JP-152 (published) | `Calendar`, `EncoreSection.jsx`: layout 1's `at = ((mi % n) + n) % n` (~17500) and `step`'s `setMi(v => v + dir)` (~17521); layout 3's `calMonths[((mi % n) + n) % n]` and its own `step` (~18772, ~18787) | **Read off the code.** The wrap is deliberate, written into the code, the `data.js` comment on `CAL_SPAN` and `notes/calendar.md` ("The arrows *wrap* at both ends rather than clamping, the media player's rule — a clamped first month opens the published page on a dead-looking arrow"). So `mi` is an unbounded counter, wrapped on read. Layouts 1 and 5 are one design (the calendar has four, `arch % 4`), layout 3 is `s.v2`; layouts 2 (slot list) and 4 (wizard) draw no month arrows. The four arrow draws (~17619 Lime-family disc, ~17882 Retro `nav`, ~18932 and ~19040 layout 3) all read `step(dir)` and take their cursor off whether it is a handler | M | open |
| JP-152 (editor) | `BookedField`, `EncoreBuilder.jsx` ~4284: `at = ((mi % CAL_SPAN) + CAL_SPAN) % CAL_SPAN`, `setMi(v => v + dir)` | **Read off the code.** Written to wrap "the way the published arrows do". `mi` is likewise unbounded | S | open |
| (the stale line) | the foot line / pill keep the pick across the jump | **Not a separate bug.** The pick is an ISO date searched through the whole window on purpose (JP-063), so it survives any month turn; with no wrap the "date over the wrong grid" picture goes away because the window's ends are real ends | — | follows JP-152 |

## Calls

Put to the user (2026-10-19). **Decided: stop, dimmed.**

1. **Clamp at both ends; the arrow that cannot go further is dimmed and handlerless**
   (**decided**; JP-152). Reverses `notes/calendar.md`'s "wrap, the media player's rule", whose
   reason was a first month opening on a dead-looking arrow. The reason is now met by *dimming*
   rather than by wrapping: a dim left arrow on the opening month is the end being signalled,
   which is what the tester asked for ("nothing signals the jump"). Alternatives put and not
   taken: clamp with an undimmed arrow (leaves "nothing signals the limit" open), and keep the
   wrap as by design (leaves the date-over-the-wrong-grid picture).
2. **Taken as the default, no call needed.**
   - **Live only, like the arrows themselves.** The canvas is a picture pinned to month 0 and
     keeps both arrows at full strength, so the dim is a **named canvas/live diff**: the
     published opening month's ‹ is dimmed where the canvas draws it solid. It is the same kind
     of diff as the foot's Book pill and the empty prompt, and `CLAUDE.md` already counts the
     published first paint as only the canvas's picture "while `open` is today or later".
   - **Dim = `opacity: .38` on the arrow, no handler** (the booked day's dim in Lime's frame is
     .38 as well), so the existing "cursor read off the handler" rule drops the pointer for free.
     The ring and fill are unchanged, so the template's own arrow is still recognisable.
   - **`mi` is clamped at the write, not only on the read** (`setMi(v => clamp(v + dir))`), so
     it can never run past an end and need two clicks back. Read-side clamping stays as a guard.
   - **The editor's picker** disables the button (`disabled`, opacity .4, `cursor: default`, as
     its own past-day cells), since it is chrome on Tailwind-free inline styles already.
   - **A one-month window** (nothing today draws one, `CAL_SPAN` is 24) would dim both arrows;
     no special case.
   - Layouts 2 and 4 are untouched: no arrows, and `Package ›` in the wizard is a different
     control (below).

## Per-session procedure

One session; git and this file are the memory.

1. Read `CLAUDE.md`, this file, `notes/calendar.md` (the arrows paragraph, line ~39, and the
   layout-3 paragraph, line ~104) and `notes/templates.md` for the `s.lime` / `s.pop` blocks. Read
   the memory notes `browser-tool-choice` (chrome-devtools MCP for the real-app steps;
   `scripts/digest.mjs` on the cached headless shell when it drops) and
   `verifying-the-published-tab` (the popup is about:blank; drive it from the opener).
2. `git switch -c calendar-qa-fixes main`, then commit this plan and the `plans/README.md` rows
   as `Plan: calendar QA fix (JP-152)`.
3. **Reproduce in the real app** (`npm run dev`, Retro): the editor's Booked dates ‹ then › and
   the published tab's ← then →, as filed. Read `mi` through the fiber tree. Correct the triage
   table if the cause differs.
4. Fix (below), re-run the steps, then the *Check* list.
5. Record the decision (below), tick the table's *Status*, run `npm run build` once.
6. **Stop and hand off**: say the unit is closed and print the opening prompt for the sweep,
   filled in. No `index.html` refresh before the sweep.

## The fix

- **`EncoreSection.jsx`, layout 1 (`s.v0`, every template).** `at = s.live ? clamp(mi) : 0`; one
  helper beside `step` gives `step(dir)` as `undefined` when `!s.live` **or** the end in that
  direction is reached (`at === 0` for back, `at === nMonths - 1` for forward), and
  `setMi(v => clamp(v + dir, 0, nMonths - 1))`. The two disc/nav draws (~17619, ~17882) add
  `opacity: s.live && !onClick ? 0.38 : undefined` beside their `cursor`. **Layout 1's `at` is
  the month index; layout 3's `at` is the pick's cell index in the month on show** (a different
  variable), so layout 3 takes its own name for the month index.
- **Layout 3 (`s.v2`).** The same, through its own `step` (~18787) and `month` (~18772); its two
  arrow draws (~18932 Lime-family, ~19040 Retro) get the same dim. Every template's arm reads
  the shared `step`, so no per-template change.
- **`EncoreBuilder.jsx`, `BookedField`.** `at = clamp(mi, 0, CAL_SPAN - 1)`, `setMi(v => clamp(
  v + dir, 0, CAL_SPAN - 1))`, `disabled` on the end's button with the dimmed style. Rewrite the
  comment block above it ("wraps at both ends the way the published arrows do") to "stops at both
  ends, as the published arrows do".
- **`data.js`.** Rewrite `CAL_SPAN`'s comment ("The arrows wrap at both ends of it rather than
  clamping" → "stop at both ends of it"); line ~2280's help text is unaffected (it only names
  the span).
- **No new `vm` key**: the window length is `s.calMonths.length`, and `sectionVm` is not touched,
  so `EncoreSection` still does no maths beyond indexing.

## Check

- **The ticket, as filed**: editor ‹ from Oct 2026 and › from Sep 2028 stop (button disabled);
  published ← on the first month and → on the last do nothing, and the dim says why; the picked
  date's line is unchanged by a click at an end. Controls: ‹ › in the middle still step one
  month each; a pick survives paging to the far end and back (JP-063's search through the
  window); the canvas still draws both arrows solid and does nothing on a click.
- **All five templates**, layouts 1, 3 and 5 (5 = design 0), at 1440 / 768 / 390: every arrow
  site dims at the right end and only there (Retro's `nav`, Lime's / Grunge's / Editorial's /
  Pop's discs, layout 3's two draws). Layouts 2 and 4 draw no arrows — confirm, and that
  `Package ›` still wraps (not this ticket).
- **A moving window**: a past `open` (the window counts from today, `calStart()`), and the
  harness's `&today=` at a month boundary; `open` changed in the panel while `mi` is at an end
  (the editor's picker keeps its `mi`; it must stay in range for any `start`).
- **Gates the clamp must not break**: the selected-day `blocked()` / past-day rules and the
  foot pill are untouched; the editor's past-day cells and blocked-day toggling still work from
  every month; no effect added to `EncoreSection` (it takes none).
- `npm run build` clean. `scripts/digest.mjs`: with `live` off the diff is **nothing** (the dim
  is live-only); a `live=1` digest moves only the opening month's ‹ and, at the end, › — and
  only in layout 1 and 3 of the calendar. A diff elsewhere is a finding.

## Notes to write

- **`notes/calendar.md`**: replace "The arrows **wrap** at both ends rather than clamping, the
  media player's rule — a clamped first month opens the published page on a dead-looking arrow,
  a diff from the canvas" (line ~39) with the stop-and-dim rule and its reason, the live-only
  canvas diff, and "`mi` is clamped at the write"; edit "wrapping at both ends" in the layout-3
  paragraph (line ~109) and the `BookedField` mention if it says the picker wraps.
- **`CLAUDE.md`**: nothing, unless the sweep finds its calendar sentence says the arrows wrap
  (the grep found none).

## Sweep (after the fix)

- `npm run build` and `npm run build:standalone` clean.
- Refresh `index.html` and `published.html` as the separate step `CLAUDE.md` describes.
- A last look at `notes/calendar.md` and the `data.js` comment for the word "wrap".

## Not done / out of scope

- **Every other wrapping pager is left as it is**: the media player's transport, the gallery's
  arrows, the events map's pager, the testimonials' carousel and the wizard's `Package ›` all
  wrap by the same "media player's rule". The tester raised the calendar alone, and a carousel
  with no natural ends is a different call from a dated window with real ends. If QA raises
  them, this plan's reasoning does not carry over automatically — put it again.
- Showing a "no earlier / later months" message or a month picker: the dim is the signal asked
  for; a longer window is `CAL_SPAN`'s own knob and is not touched.
