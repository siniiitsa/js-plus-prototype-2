# The booking calendar — working notes

Moved word for word out of `CLAUDE.md`'s *Intentional limits — not bugs* on 2026-09-30, so it
loads only when a session works on it. "Above" and "below" may point into `CLAUDE.md` or
another `notes/` file.

- **The booking calendar navigates and picks, in the published tab only.** It was the last §10.2
  section that was entirely a picture — arrows and day cells with a pointer cursor and no handler
  in either mode, over three constants and a sentence. The whole section is built from **one
  date** now: `FIELDS.calendar.open` is the month the grid opens on *and* the day it opens picked,
  and a field that is empty, half-typed or impossible (31 June) parses to null and falls back to
  `CAL_OPEN`, so the calendar can never open on a month the artist did not choose. `booked` is
  the dates they are taken on and `time` the hour the foot line names; an emptied `time` drops
  its clause rather than printing a trailing " at ", the Soundcloud rule.
  **All the date maths lives in `data.js` and `sectionVm`**, never in `EncoreSection`: every sum
  goes through `Date.UTC` (a local-time `Date` names the wrong weekday west of Greenwich), and
  `vm.calMonths` resolves the whole `CAL_SPAN` window — label, cells, booked flags and **one
  composed enquiry line per cell** — so the section looks a line up rather than working a date
  out, the way it draws the pin `sectionVm` paired with a gig. Nothing on the canvas reads the
  clock: the canvas opens on the artist's date, not on today, or its picture would drift off the
  reference frame's June overnight. **The published tab knows what day it is** (F20), and so
  does `BookedField` (below), which pages the published window and nothing else:
  `PublishedPage` reads today once, in UTC, and passes it to `sectionVm` as the ISO `today`,
  which is honoured only when `live`. With it, a day or slot before today carries **`dead`**
  beside `booked` — `EncoreSection`'s one `blocked()` test, so the two behave identically in all
  four layouts: no handler, no enquiry line, never the pick, and the booked look **without the
  strike** (except Lime's layout 2 — and Grunge's, Editorial's and Pop's, which widen its block — whose past rows keep full ink and only lose the handler —
  user call, 2026-09-17, made while its seeded slots had no editor and were all past; Lime's
  layout-4 exception went with JP-052; and layout 3 on every template, whose legend names the
  booked fill *Booked*, so a past day there is the *free* dot at .38, booked or not, lest the
  month before today read as taken — JP-064, user call, 2026-09-28) — a cued `open` in the past cues nothing and the foot prints `vm.calPrompt`, and a
  past `open` month gives way to today's as the first month, `CAL_SPAN` counting from there
  (`max(open, today)`, `calStart()` in `data.js`, which `BookedField` shares so the artist
  can block every day a visitor can pick; it fades the days before today and takes no click on
  them unless they are already blocked). So the published first paint is the canvas's picture only while `open`
  is today or later: a named, accepted diff. The harness takes `&today=` (opt-in, so a `live=1`
  digest never moves with the date). The arrows **wrap** at both ends rather than clamping, the
  media player's rule — a clamped first month opens the published page on a dead-looking arrow,
  a diff from the canvas — and their cursor is read off the handler, `Pager`'s rule. `sel` is an
  **ISO date, not an index**, because it must survive the month turning, and the **empty string is
  this section's `-1`**: nothing chosen, so `vm.calPick` renders and the published first paint is
  the canvas's picture by construction, the clock aside. Blocking the *cued* day cues nothing (`vm.calPick` is
  `''`) and the foot prints `vm.calPrompt`, rather than sliding the pick to the day after — the
  artist blocked it. A booked day is muted, struck through and handlerless (under Lime it is
  dimmed to .38 with no strike, its frame's own state, and Grunge's, Editorial's and Pop's layout 1
  share it), which is a **content** state and not a
  live one, so it renders on the canvas too; the seed blocks nothing, which is
  what keeps the reference picture. Two **intended diffs from the frame**: under Retro the
  foot row gains the Book pill on `vm.calBookTo` — `bookTo` minus `calendar` itself, the tier
  pills' rule, since `CTA_TARGETS.book` ends here — which is what turned `cta` from a field that
  edited nothing into a control (under Lime, Grunge, Editorial and Pop the line is the link
  instead, below, JP-088), and `para` went with `DEFS.calPara` because it rendered in neither layout; and a
  month needing six rows grows one where June needs five, the grid never being padded to 35.
  The unreachable fallthrough after layout 4 still draws the hardcoded `CITIES` and reads
  none of this.
  **Everything in this paragraph from "The arrows *wrap*" on is layout 1's**, except that its
  arrows, its `sel` and its blocked cue are layout 3's as well (below). Layout 2 is a
  bold list of named slots — `c.slots`, maintained by `SlotsField` (JP-052) and resolved by
  the `songs` rule onto `vm.calSlots`. Its seed is **not four dates**: `CAL_SLOTS` is four day
  offsets (`slotSeed()` in `data.js`) from `open` on the canvas and in the editor — which
  reproduces the frame's Jun 12 / 14 / 20 / Jul 05 from `CAL_OPEN` — and from
  `max(open, today)` by day on the published page, layout 1's F20 diff, so a published page is
  never all past; `slotsVal` writes the canvas's dates out on the first edit. It has no month,
  so no arrows and no `mi`. Everything else it shares whole:
  `sel` is the same ISO date, `open` cues the same day (slot one *is* `CAL_OPEN`, so the
  seeded page opens on the frame's picture), `booked` kills a row there as it strikes a cell
  here (under Lime, Grunge, Editorial and Pop the row is dimmed to .38 with no strike, the same state their cells take), the foot prints the slot's own short line — `vm.calSlots[].line`, "Thursday evening
  selected", composed from the weekday and the slot's `kind` — or the same `calPrompt`, and the
  pill takes the same `calBookTo` under its own label, `slotCta` ("Start Enquiry"; the frame's
  "Star Enquiry" read as a typo), chip, line and pill on one row at every width. Under Lime, Grunge,
  Editorial and Pop that is true again since JP-100 (user call, 2026-10-01): their `s.limeTree` foot
  stacked the pill at 390, a fit slip off Retro's pre-QA foot. At 390 their chip and line are a
  group that wraps, and the line's minimum is its widest word (`break-word`, not `anywhere`, which
  would make it one glyph). So the line stands beside the chip wherever that word fits, and drops
  under it otherwise. That is Lime's and Grunge's seed beside it (80 / 89 of room for *Thursday*'s
  58), and Editorial's and Pop's under it (Editorial's Noto pill is 198 to the frame's 184, leaving 47;
  Pop's Titan pill is 201 to the frame's 190, leaving 44, so its 390 foot is 98 on a picked day
  against the master's 104, whose line is squeezed to 54 and breaks inside *Thursday*). A
  `maxWidth: 100%` clamps that minimum, so a long word in the prompt still breaks inside the cell.
  The foot wraps by the same rule: the group's minimum is its own min-content, so a typed `slotCta`
  long enough to leave the line less than its widest word drops the pill under the group.
  Retro's foot never wraps: at 360 it breaks *Thursday* inside itself, as it always has. (Pop's
  layout 2 drew Retro's body until its layout-2 pass widened the Lime block to it, 2026-10-05.)
  Its head's link list is `vm.calFlow` — `CTA_TARGETS.book` resolved against
  the page, this section leading and dotted and never linking to itself, the footer's rule for
  a link column. `heading`, which once headed only the unreachable fallthrough, heads it; `image` does not
  reach it at all.
  **Layout 3 pages the same window** (JP-063, user call, 2026-09-28). Its frames draw no month
  arrows, and the fit's month 0 left a visitor on 28 September three pickable days. So a pair
  of arrows follows the month name on its own line, on both surfaces. Each is the template's own
  free dot a size down (24, so the pair does not read as two more days and fits inside the
  month's line box) round layout 1's arrow glyph. They step layout 1's `mi`: live only, with no
  cursor on the canvas, wrapping at both ends, and the canvas pinned to month 0. The pick is
  searched through the whole window, layout 1's `reduce`, so the foot pill names a July pick
  from June. The head's numeral and weekday are the pick's only while it is in the month on
  show; otherwise the head reads the month alone, since "15" over "JUNE" names the wrong date.
  **Layout 4's right-hand column is the enquiry wizard's summary** (JP-052, user call,
  2026-09-23; it was fitted as layout 2's slot list stacked, which printed dates and prices no
  field edited — Retro L4 section 10's reading, now reversed). The frame's dark card is step 1's
  type over step 2's four answers — GUESTS / SET LENGTH / BUDGET / SOUND, the very boxes step 2
  asks — then a date card, a package card and Send Enquiry. So the card's head line is the
  picked type (the artist's name when the types are emptied) over `location`, beside `image`,
  and its cells are `vm.calWizard.steps[1].boxes`: the **canvas prints each box's bare `eg`**
  (the frame's picture of a filled-in wizard), and live an unanswered cell prints its `ph`,
  "e.g." and all, at .45 — a named canvas/live diff, so nothing published reads as a quote the
  artist never gave. The date card is `vm.calWizard.dateOf(typed)`, a closure (above): nothing
  typed shows the section's cue (`vm.calPick`, so *Opens on* moves it and a past or booked
  `open` shows `calPrompt`), a typed date is parsed day-first (`parseDayFirst()`), and a booked
  or past one is **refused** there with the date dimmed; `vm.calTime` stands at its end. The
  package card is the **Pricing section's** packages, read across sections through
  `sectionVm({ tiers })` (`pageTiers(sections)` in `data.js`, the `identity` precedent; the
  harness takes `&tiers=<json>` or `&tiers=none`) onto `vm.calPackages`: name over price, and
  *Package ›* (`wPkg`, appended after `wVals`) steps and wraps, live only; at one package the
  chevron and the handler go, and with no pricing section the card is not drawn. `sel` and
  `mi` reach nothing in this design, `booked` reaches it only through a typed date, and `cta`
  only as the submit's label: `vm.calWizard.send` is `cta`, seeded `CAL_SEND_4` "Send Enquiry"
  at this layout where `d` is layout 1's "Check a date" (JP-082, user call, 2026-09-29,
  `FORM_BTN_4`'s shape, in `sectionVm` and `EditPanel`'s chain), and an emptied label reads the
  seed again, since the wizard has no other way to send. Its foot is `BookPill` at layout 3's
  own numbers labelled `vm.calWizard.send`, on
  the same mailto as the wizard's last step (below); and it is
  the one calendar layout that paints a **sheet** — the Figma wrapper's tan panel, which
  carries the page's own "Book Us" head (`CAL_HEADING_4`) and would otherwise leave that head on
  a ground no master draws. That panel also holds the page's **enquiry wizard** (QA,
  2026-09-15) — the frame's "C · Multi-step wizard", beside the stack at desktop and above it
  narrow, since `form` took the editorial band and the wizard has no section of its own. Its
  hooks (`wStep`, `wType`, `wVals`, `wPkg`) are appended after `sel`; only step 1 is designed, so
  steps 2 and 3 take the summary card's own labels and a name and email, every string resolved
  onto `vm.calWizard`; its inputs exist only when `s.live`, and there is no `<form>`. The pill
  row is SPACE_BETWEEN with no column gap under Editorial and wraps, the forward pill keeping the
  right edge on its own line: at 390 in Gloock that happens from step 1 (Back 129 + Next Step
  174.4 in the 290; the frame fits 121 + 161), where Noto's held one row until step 3's Send
  Enquiry (accepted, `plans/editorial/display-face.md` step 4, layout 4, user call,
  2026-10-06). **Send
  Enquiry mails, like the form** (JP-053, user call, 2026-09-23 — it was a fragment link to
  `calBookTo`, which lost every answer): both pills are an `<a href="mailto:">` composed by
  `vm.calMailto` over the type, the date as typed, step 2's four answers, the package and the
  contact boxes, with the body's labels raw. The address is the **calendar's own `email`, which
  follows the enquiry form section's until the artist types one** (JP-076, user call,
  2026-09-29, taking JP-053's option C in part; `copyrightOf()`'s chain shape):
  `FIELDS.calendar.email` has no `d`, `sectionVm` resolves `emailAddr(cv('email', email))` once
  for `vm.calEmail`, which `calMailto` and the confirmation both read, and `EditPanel`'s chain
  shows the form's address in the box while the key is absent. So a page that never types one
  keeps one address, and a page with no form can still send. The form's is read across sections
  through `sectionVm({ email })` (`pageEmail(sections)` in `data.js`, `tiers`' precedent,
  threaded through the same five call sites; the harness takes `&email=<address>`, `&email=` or
  `&email=none`, and `&cj={"email":…}` the calendar's own). With neither — no form section and
  nothing typed, an emptied box, or an address `emailProblem()` refuses — both pills stay spans,
  the form's no-address state, and at layout 4 the calendar's panel says so above the box
  (`calNoMailHint`, the `navGoneHint` precedent), naming whether the form is gone or holds no
  address; a typed address that is refused is left to `UrlInput`'s own line. The click asks
  `vm.calCheck` — step 3's name and email by `formErrors()`' rules — and a refusal marks the boxes
  (`wErrs`, appended, cleared per box: Retro's hairline doubled inside, Lime's 2px of `s.tx`,
  Editorial's 2px of solid `s.stroke2` terracotta with the idle ink dash gone),
  prints `vm.calWizard.prompt` and, from the foot pill, walks to step 3. A valid send (`wSent`)
  swaps the wizard card's parts for a confirmation printing the address in plain text, with
  *Start again*, which keeps every answer and opens step 1; the pills are spans until then. The
  summary column does not change — though at 768 and 390, where it stacks under the card, the
  shorter card lets it ride up. `extLink()` gives a `mailto:` / `tel:` no `target`, so the foot
  pill takes `BookPill`'s `ext` (and an additive `onClick`), and a footer row or a gig's tickets
  link holding a mailto no longer leaves an empty tab behind.
  Its summary card is `s.tx`, **not `s.deep`** — the frame binds the fill to the *text*
  token, and `deep` is the page ground on two palettes and collides with the panel on the same
  two. The cost it would carry — on Grunge `tx` and `paper` are one value, so a card and rows
  in the flat body's `paper` would share a fill — is no template's: Lime's own frame restores
  the three-level stack — `s.box1` rows under the `s.tx` card on a `s.box2` panel — and
  Grunge's, which widens that block, is the same stack one binding over: `#1A1A1A` `s.box1`
  rows under the white card (ringed 1px in `s.stroke2`) on a `#0E0E0E` `s.box3` panel.
  Editorial's is Lime's stack on Lime's keys: `#FFF9F2` `s.box1` rows dashed in terracotta under
  the ink card on the `#EDE6DC` `s.box2` panel, every one square.
- **Layout 1's head is the frame's under Lime, Grunge, Editorial and Pop** (JP-089, user call,
  2026-09-30, reversing Lime layout 1's "AVAILABILITY where the frame types BOOK NOW"; Pop's
  frame 964:58631 reads the same since its layout-1 pass, 2026-10-02). Their `s.limeTree` block,
  which Pop widens, prints `s.title` over the month. With `heading` absent at `d === 0`,
  `sectionVm` sets it to `CAL_HEADING_1`, "Book Now", beside the `HEADING_3` / `HEADING_4`
  arms, and `EditPanel`'s chain has the same arm; both gates name Pop beside the group
  (`vm.limeTree || vm.pop`, `limeTreeTheme(…) || themeName === 'Pop'`), `tiersSeed()`'s way.
  Retro's layout 1 prints no head, so it keeps `TITLES.calendar`, "Availability", which also
  stays the seed at layout 2. An emptied heading behaves as before.
- **Layout 1's foot is the frame's under Lime, Grunge, Editorial and Pop: the line alone, and the
  line is the link** (JP-088, user call, 2026-09-30, reversing Lime layout 1's "the foot keeps
  Retro's BookPill"; Pop joined it in its layout-1 pass, user call, 2026-10-02, its frame
  `964:58631` drawing no pill either). No frame draws the pill, Retro's included (`964:58583`); it
  was Retro's one deliberate addition, so a picked date leads somewhere. Their `s.limeTree` block
  drops it, and the
  foot's enquiry line takes its job: on the published page, while the line names a picked day
  (`cur`), it is an `<a>` to `navHref(s, s.calBookTo)`, in the line's own type, with a pointer and
  no underline. The prompt (`vm.calPrompt`) never links, since "Pick a date" is not a way on, and a
  page with no `calBookTo` keeps a span. On the canvas it is always a span with no cursor. So the
  foot is the frames' 101 / 100 / 100. `FIELDS.calendar.cta` reaches only layout 4 there
  (`{ Lime: [3], Grunge: [3], Editorial: [3], Pop: [3], '*': [0, 3] }`, measured). Retro keeps
  the pill.
- **Layout 2's column labels and every layout's prompt are the artist's** (JP-095 (a), user call,
  2026-10-01). `dateLabel` and `availLabel` (`in: [1]`, both bodies) are the `Date ↓` and
  `Availability ↓` over the slot list, the `↓` the markup's. An emptied Date keeps its pinned
  seat, so Availability stays over its column; with both emptied the head row and its rule go.
  `prompt` (`CAL_PROMPT`, no `in`) is `vm.calPrompt`, which every layout prints while no day is
  cued: layout 1's and 2's foot line, layout 3's pill and layout 4's date card. It stays
  `cased()`, as the slot line beside it is, and reads its seed again when emptied
  (`messageLabel`'s rule), since an empty foot reads as broken. The canvas never reads the clock,
  so no harness render prints it unless the cued day is blocked: its `reach.mjs` row and any sweep
  stand on `booked: [CAL_OPEN]`. A long word in it breaks at every site, except in Retro's
  layout-2 foot at 1440 and 768, which ellipsises the line as it always has the slot line.
  The slot line's " selected" and the legend stay literals, unreported siblings.
- **Pop's layout-2 marks are four colours, seated by row** (Pop layout 2, section 7, 2026-10-05).
  Pop widens the `s.limeTree` block, seated on Scheme 2 as Editorial's is. Its four slot marks bind
  `sem/media` (teal), `text/2` (violet), `text/1` and `stroke/2` (both pink) at all three widths,
  where the twins' all bind `text/2`. Because the last three are not one colour, this is a row
  palette, not a pick state: `G.marks[i % 4]` by rendered row, so `&n=8` cycles it and a booked
  row dims its mark with the rest. The pick's cue is still the foot's chip alone.
