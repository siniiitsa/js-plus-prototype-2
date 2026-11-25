# The booking calendar — working notes

> **Layout 3 was removed 2026-11-13** (user call, every template). The picker offers layouts 1, 2 and 4
> (`layoutChoices`; `CATS.calendar.n` 4, the layout-5 duplicate of layout 1 gone). `designOf()` in
> `data.js` folds a stored `arch` 2 onto layout 1, so setup card 3 and any stored draft render
> layout 1, and the picker highlights it. Everything below that describes layout 3 (the arrows, the
> `mAt` / `at` rule, the composed sticky column, its inline-edit sections, `HEADING_3`, `heading` /
> `prompt` `chars` slots) is **unreachable history**, left in the code as Video's holes are.

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
  do `BookedField` (below), which pages the published window and nothing else, and
  `SlotsField`'s past-date line (JP-123, below):
  `PublishedPage` reads today once, in UTC, and passes it to `sectionVm` as the ISO `today`,
  which is honoured only when `live`. With it, a day or slot before today carries **`dead`**
  beside `booked` — `EncoreSection`'s one `blocked()` test, so the two behave identically in all
  four layouts: no handler, no enquiry line, never the pick, and the booked look **without the
  strike** (Lime's layout 2 — and Grunge's, Editorial's and Pop's, which widen its block — dims a
  past row to .38 like a booked one since JP-123, user call, 2026-10-09, reversing 2026-09-17's
  full ink, made while its seeded slots had no editor and were all past; Lime's
  layout-4 exception went with JP-052; except layout 3 on every template, whose legend names the
  booked fill *Booked*, so a past day there is the *free* dot at .38, booked or not, lest the
  month before today read as taken — JP-064, user call, 2026-09-28) — a cued `open` in the past cues nothing and the foot prints `vm.calPrompt`, and a
  past `open` month gives way to today's as the first month, `CAL_SPAN` counting from there
  (`max(open, today)`, `calStart()` in `data.js`, which `BookedField` shares so the artist
  can block every day a visitor can pick; it fades the days before today and takes no click on
  them unless they are already blocked). So the published first paint is the canvas's picture only while `open`
  is today or later: a named, accepted diff. The harness takes `&today=` (opt-in, so a `live=1`
  digest never moves with the date). The arrows **stop** at both ends of the window, **dimmed** (JP-152,
  user call, 2026-10-19, reversing the media player's wrap, whose reason was a first month
  opening on a dead-looking arrow: the dim is now the end being signalled, which is what the
  tester asked for). The arrow that cannot go further has **no handler** — `step(dir)` is
  `undefined` at the end in its direction — and each draw (Retro's `nav`, the Lime-family disc,
  layout 3's two) adds `opacity: s.live && !onClick ? 0.38 : undefined`, so the cursor, read off
  the handler as `Pager`'s rule has it, drops for free. **Live only: a named canvas/live diff.**
  The canvas is pinned to month 0 and keeps both arrows solid, while the published opening
  month's ‹ is dimmed (the same kind of diff as the foot's Book pill and the empty prompt).
  **`mi` is clamped at the write** (`setMi(v => clampMo(v + dir))`), not only on the read, so it
  can never run past an end and need two clicks back; the read clamp stays as a guard. A
  one-month window would dim both arrows, with no special case. The pick is an ISO date
  searched through the whole window, so it survives the far end and back. Every other pager
  still wraps (the media player, gallery, map, testimonials and the wizard's *Package ›*): a
  dated window has real ends, a carousel does not, and that call was not put again. **The
  editor's `BookedField` picker follows**: the end's button is `disabled` (opacity .4,
  `cursor: default`, as its own past-day cells) and `mi` clamps at the write there too, to
  `CAL_SPAN - 1` whatever `start` is, so changing `open` while at an end cannot leave it out of
  range. `sel` is an
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
  **Only the grid grows: the photo half is pinned to the five-row height** (2026-11-16, tester report: the
  photo went 486 → 552 → 486 px paging Dec 2026 → Jan → Feb 2027). At desktop it is `u(525.97)`, which is
  what a five-row grid stands (the 768 master's `526px`), `alignSelf: start`; Retro's stack of prints takes `551.22` (its measured five-row grid; the 768 master's 553.398 stays narrow), so the photograph and its crop
  are one size in a four-, five- or six-row month; a six-row month leaves 66px of panel ground under it, a
  four-row one leaves the panel at the photo's height. The panel as a whole still grows, and the foot with it.
  The unreachable fallthrough after layout 4 still draws the hardcoded `CITIES` and reads
  none of this.
  **Everything in this paragraph from "The arrows **stop**" on is layout 1's**, except that its
  arrows, its `sel` and its blocked cue are layout 3's as well (below). Layout 2 is a
  bold list of named slots — `c.slots`, maintained by `SlotsField` (JP-052) and resolved by
  the `songs` rule onto `vm.calSlots`. Its seed is **not four dates**: `CAL_SLOTS` is four day
  offsets (`CAL_SLOTS`, dated by `slotDate()` in `data.js`) from `open` on the canvas and in the editor — which
  reproduces the frame's Jun 12 / 14 / 20 / Jul 05 from `CAL_OPEN` — and from
  `max(open, today)` by day on the published page, layout 1's F20 diff, so a published page is
  never all past. **A seeded row keeps its offset when it is edited** (JP-123, user call,
  2026-10-09, reversing JP-052's "`slotsVal` writes the canvas's dates out on the first edit",
  which froze a published list in 2025 on the first keystroke of a kind or a price): `slotsVal`
  hands `SlotsField` `CAL_SLOTS` itself, so the rewrite stores `{ after, kind, price }`, and
  `slotDate()` dates a row for `sectionVm` and the panel alike — a typed `date` wins, else
  `after` days from the base, else none. An emptied date box gives the count back; a row the
  artist adds has no `after` and is dated by hand. `after` is in `SLOT_KEYS`, so a seeded row
  whose kind and price are emptied keeps its date. The panel's box shows an offset row's
  canvas date with a line saying it counts from today on the published page once `open` has
  passed (while the box has focus it shows its own value, so a cleared or half-typed segment,
  which a native date box reports as `''`, is not refilled under the artist's typing), and a
  typed date before today warns under its row ("This date has passed, so
  visitors can't pick it."), derived from the stored value and held while the box has focus
  (`UrlInput`'s rule) — `SlotsField` reads the clock once per mount, `BookedField`'s rule. It has no month,
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
  58), and Editorial's and Pop's under it (Editorial's Gloock pill is 215.2 to the frame's 184,
  leaving 30, so its line takes three lines and the foot is 117.5 against the master's 84; Noto's
  pill was 198, leaving 47; Pop's Titan pill is 201 to the frame's 190, leaving 44, so its 390 foot is 98 on a picked day
  against the master's 104, whose line is squeezed to 54 and breaks inside *Thursday*). A
  `maxWidth: 100%` clamps that minimum, so a long word in the prompt still breaks inside the cell.
  The foot wraps by the same rule: the group's minimum is its own min-content, so a typed `slotCta`
  long enough to leave the line less than its widest word drops the pill under the group.
  Retro's foot never wraps: at 360 it breaks *Thursday* inside itself, as it always has. (Pop's
  layout 2 drew Retro's body until its layout-2 pass widened the Lime block to it, 2026-10-05.)
  **Its head is the heading alone** (user call, 2026-11-12, every template): the artist's name
  (`s.brand`) at the top left and the stacked *● Availability / Pricing / Enquiries* link list
  (`vm.calFlow`, deleted) at the top right were removed, and with them the row that held them and
  the 28px gap under it, so the heading is the head's first child. `IDENTITY_CHARS.calendar.title`
  went too: the layout prints no name. `heading`, which once headed only the unreachable fallthrough,
  heads it; `image` does not reach it at all.
  **Layout 3 pages the same window** (JP-063, user call, 2026-09-28). Its frames draw no month
  arrows, and the fit's month 0 left a visitor on 28 September three pickable days. So a pair
  of arrows follows the month name on its own line, on both surfaces. Each is the template's own
  free dot a size down (24, so the pair does not read as two more days and fits inside the
  month's line box) round layout 1's arrow glyph. They step layout 1's `mi`: live only, with no
  cursor on the canvas, stopping at both ends with the end's arrow dimmed (JP-152, above), and
  the canvas pinned to month 0. **Layout 3's `at` is the pick's cell index in the month on
  show, not the month index** (layout 1's `at` is the month), so its month index is `mAt`,
  and `step` reads that. The pick is
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
  or past one is **refused** there with the date dimmed (the box itself is masked to `dd/mm/yyyy` by `EncoreSection`'s `maskDate`, digits only, so only the day's existence, booking and age are left to refuse; send is not gated on it); `vm.calTime` stands at its end. The
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
  2026-10-06). Pop's widens the same block and takes the same row: its Titan pills (Back 122.5 +
  Next Step 163.8 at 390, the frame's 124 + 162) hold one row at step 1, and step 3's Send Enquiry
  takes its own line there, as Noto's did (Pop layout 4, section 8). **Send
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
  Editorial's 2px of solid `s.stroke2` terracotta with the idle ink dash gone, Pop's 4px of
  violet `s.tx` against its 4px pink idle ring — the idle ring's own weight, a colour change),
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
  the ink card on the `#EDE6DC` `s.box2` panel, every one square. Pop's is Lime's stack again:
  `#F5F5F5` `s.box1` rows ringed 1px pink under the violet card (ringed 1px pink too, its GUESTS
  `text/1` pink) on the `#EBEBEB` `s.box2` panel, the wizard card, its idle chips and the date
  box ringed 4px pink, every card Lime's rounded shape (the wizard 50 at every width); Back is
  Scheme 3's lime lettered pink and the foot's Send Enquiry Scheme 2's pink lettered and disced
  lime.
- **Layout 1's head is the frame's under Lime, Grunge, Editorial and Pop** (JP-089, user call,
  2026-09-30, reversing Lime layout 1's "AVAILABILITY where the frame types BOOK NOW"; Pop's
  frame 964:58631 reads the same since its layout-1 pass, 2026-10-02). Their `s.limeTree` block
  prints `s.title` over the month. With `heading` absent at `d === 0`, `sectionVm` sets it to
  `CAL_HEADING_1`, "Book Now", beside the `HEADING_3` / `HEADING_4` arms, and `EditPanel`'s
  chain has the same arm; both gates are the group (`vm.limeTree`, `limeTreeTheme(…)`), which
  names Pop since its layout-4 sweep folded the pair in, `tiersSeed()`'s way.
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
- **Character caps** (`plans/char-limits.md`, session 7, 2026-10-13; the readout is
  `plans/char-limits/session-7-probe.md`). Every own text key has a `chars` cap per template and
  layout, the slots' `kind` and `price` have `cols`, and `types` is a ',' list (`list`, `chars`
  per chip, `count`). The calls a later change to this section has to keep in mind:
  - **The slot price is set whole** (no `priceParts()` split), so it is measured with prose, not
    pricing's digit-led samples. A change that splits it like a package price needs re-measuring.
  - **A slot's kind is capped by its row, not by the foot line** (33–40). The foot's *Thursday …
    selected* prints the cued slot's kind too, and its wrap (the Lime tree) or ellipsis (Retro)
    is the fallback. Read with the foot, the kind would be 12–20 at 390. That is the user's to
    overrule.
  - **`dateLabel` and `availLabel` share the head row, so their caps are a joint split**: Date
    16, Availability 33 under Retro and 38 under the rest. Each alone reads 41–52, and both at
    those take two lines each at 768 and 390.
  - **`kind` and `price` are stacked** in one `flex: none` column, so their caps are already
    joint: the column is the wider of the two. A change that sets them side by side needs a
    joint split.
  - **The event types are 13 a chip and 4 in all**: the 390 grid's fixed half-width cells hold
    13, and a fifth type starts a third row of chips. With a third row allowed the count would
    be 6, the user's to overrule.
  - **Layout 1's `time` is 13 under Lime, Grunge and Editorial**, because the foot's enquiry
    line is one line in their frames (JP-088's link).
  - **`IDENTITY_CHARS.calendar.location` at Retro's layout 1 is 19**, lowered from session 1's
    22 by `--check`. Its overlap is with the photographs of the polaroids behind the front card,
    which the card covers; the probe does not yet tell covered ink from shown ink.
  - The probe stages `prompt` (and `slots.kind`) on `booked: [CAL_OPEN]` (`KEY_CJ` in
    `limits.mjs`), because the prompt prints only while no day is cued.

## Inline editing (plans/inline-edit-all.md, Grunge layout 1, 2026-10-21)

`prompt` (*Pick a date to enquire*) prints only while no day is cued and the canvas opens with one cued, so it is
*not drawn*: ledgered as `<Template>.0.calendar.prompt` in `INLINE_OFF`, per template, as Retro's, Lime's, Grunge's,
Editorial's and Pop's are. Its `heading` and the slot's `time` are hit at both widths; no other calendar field is drawn at layout 1.

## Inline editing (plans/inline-edit-all.md, Retro layout 2, 2026-10-21)

Layout 2's slot list is the first page whose `slots` repeater is proved: `kind` and `price` ×4 are hit and restored (the
`after` offsets survive a rewrite). `heading` and `availLabel` both read *Availability*, and a third literal, the top bar's
`● Availability`, prints it too: `availLabel` declares its line in `INLINE_LINES` (`'{} ↓'`, the arrow is the markup's),
which leaves the heading the one bare node of its words. `dateLabel` (`Date ↓`) is an `INLINE_PART` row. `prompt` is
ledgered as `Retro.1.calendar.prompt`, as at layout 1.

## Inline editing (plans/inline-edit-all.md, Lime layout 2, 2026-10-21)

Retro layout 2's rows carry over (`availLabel`'s `'{} ↓'` line, `dateLabel` a part row); `slots` `kind` / `price` ×4 hit. `prompt` is
ledgered as `Lime.1.calendar.prompt`.

## Inline editing (plans/inline-edit-all.md, Grunge layout 2, 2026-10-22)

The Retro/Lime rows carry over unchanged (`availLabel`'s `'{} ↓'` line, `dateLabel` a part row); `slots` `kind` / `price` ×4 hit.
`prompt` is ledgered as `Grunge.1.calendar.prompt`.

## Inline editing (plans/inline-edit-all.md, Retro layout 3, 2026-10-22)

`prompt` is ledgered (`Retro.2.calendar.prompt`: it shows only while no day is cued). `heading` (*Book Me*) is the one slot layout 3 draws. At 1440 the calendar stands in
`pageRows`' sticky right column: a box opened on *Book Me* stays 1.1 px under the node while the cell is stuck (y 162 from scrollTop 806 to the row's end) and through
its release, and at 768, where nothing composes, it follows the in-flow section (1.5 px). `sticky3.mjs`'s shape; no code change.

## Inline editing (plans/inline-edit-all.md, Lime layout 3, 2026-10-22)

`prompt` is ledgered (`Lime.2.calendar.prompt`). `heading` (*Book Me*) is the one slot drawn; in the sticky right column the box stays 1.8 px under the node while the cell is stuck and through its release, and 1.1 px at 768. No code change.

## Inline editing (plans/inline-edit-all.md, Retro layout 4, 2026-10-22)

The wizard is live-only; the canvas draws its first step. Slots that hit: `heading`, the four event types, `time` and `cta`; `prompt` is ledgered (`Retro.3.calendar.prompt`). The summary column echoes the chosen type, so *Wedding* is drawn twice (the chip and the summary): both open `types#0`, the two-*Valerie* shape, and the summary mirrors the chip by construction. Every other node (step titles, *Guests*, *Budget*, the date card) is literal or derived.

## Inline editing (plans/inline-edit-all.md, Lime layout 4, 2026-10-22)

The wizard is live-only; the canvas draws its first step and `prompt` is ledgered (`Lime.3.calendar.prompt`: the page prints the cued day, no *Pick a date*). Everything else hits, as on Retro.

## Inline editing (plans/inline-edit-all.md, Grunge layout 4, 2026-10-22)

As on Retro and Lime: the wizard is live-only, the canvas draws its first step, and `prompt` is ledgered (`Grunge.3.calendar.prompt`: the page prints the cued day, no *Pick a date*). Everything else hits.

## Inline editing (plans/inline-edit-all.md, Editorial layout 4, 2026-10-22)

As on Retro, Lime and Grunge: the wizard is live-only, the canvas draws its first step, and `prompt` is ledgered (`Editorial.3.calendar.prompt`: the page prints the cued day, no *Pick a date*). Everything else hits.

## Inline editing (plans/inline-edit-all.md, Pop layout 4, 2026-10-22)

As on the other four templates: the wizard is live-only, the canvas draws its first step, and `prompt` is ledgered (`Pop.3.calendar.prompt`: the page prints the cued day, no *Pick a date*). Everything else hits.

## Lattice · layout 1 (plans/lattice/layout-1.md, section 8, 2026-11-19)

Frames `1:1039` · `1:9670` · `1:10640` (1440 x 781 / 768 x 564 / 390 x 894). **A block of its own, `LatticeCalendar`**, not Lime's *Scheduler* (nor Grunge's / Editorial's / Pop's widenings of it): it stands in `Calendar`'s
`if (s.v0)` **after the seam**, dispatched on `s.limeTree && s.lattice` ahead of the Lime block. `Calendar` owns eight `useState` hooks, so an early return above them would change the hook count on a theme switch;
`month`, `cur`, `line`, `step` (the arrows, which stop at both ends and dim there live) and a `pick(c)` handler (a blocked day has none; the lit day unlights on a second click) come over in `g`, so the published arrows, day
picking and the foot are the one seam in a new picture. All date maths stays in `data.js` / `sectionVm`; the block composes nothing but the zero-padded numeral (`01`).

- **The picture** is one 1px, 20-radius card on Scheme 2 (`#F2F2F2`, ink `#111`, `s.text3` the teal ink; no other scheme): a grid of two halves (1fr : 1fr side by side at 1440 and 768, stacked at 390 with **no divider**:
  the 390 master's right border on the grid half is the desktop divider leaking, a transparent border keeps its 1px so the cells are the frame's 38.71) over a foot. Every number is the frame's (desktop x 0.82 through `u`, 768
  and 390 verbatim; raw sizes 40 / 32 / 26 month at lh 1, 12 mono numerals and foot, 11 mono weekday names and town, Arial 13.333 arrows, not the ramp). Left: padding 28 / 21 / 16 (top 28 / 24 / 20), a 44-square head row (two
  3px boxes round an Arial `←` / `→`, the month between them in `Archivo Lattice`), 16 down a 30-tall weekday row (text 6 down), 6 down the grid (seven columns, gap 6, cells 65.94 / 31.75 / 30.97 tall, 1px ring, 3px
  radius, a two-digit mono numeral; the lit day is filled ink under paper). Right: the `[ 007 ] --- AVAILABILITY` eyebrow centred 28 / 24 / 20 down (16 apart, the rule 40 x 1), the art 64 down at a fixed 377.69 / 198.75 / 252
  tall, and the town (`s.location`, the header's) with an 80 x 1 rule at the half's foot, inset 95.55 / 55.65 / 49.89. The foot is a 1px rule, 18 / 18 padding, the enquiry line (mono, wraps to three lines at 390) and a
  `Continue →` bar (44 tall, 22 in, ink ground under a paper label, 129.97 wide).
- **The art is a mask**: the frames' own raster per width (`lattice-calendar-{desktop,tablet,mobile}.webp`, 1340 x 755 / 714 x 398 / 680 x 504 at 2x, ink on transparent, lossless, 39 / 25 / 31 KB; `photos.js`
  `LATTICE_ART.calendar`), painted in `s.tx` through a CSS mask on an `aria-hidden` span inside the art box. The **glow is the art box's own `radial-gradient(ellipse 50% 50% at 50% 50%, <Scheme 4 teal> 18% -> 0 at 70%)`**
  (the frames' `gradientTransform` reduces to that at all three widths). Neither is a `url()` background on a node `limits.mjs` would count as a picture. **The art box and the right half are pinned to the five-row month's
  height** (the frames' June 2025), so paging into a six-row month grows the grid alone and the torus never rescales (the 2026-11-16 tester report's rule): a six-row month leaves 72 of empty ground under the torus, a
  four-row one leaves the grid half at the right half's height.
- **The month fits the room between its arrows** by its own width (`month.ems` plus the 0.004em tracking per glyph, Pop's recipe) and keeps the frame's size wherever it fits: June at every width, SEPTEMBER 2025 a
  little smaller at 390.
- **`heading` is the eyebrow's word** (the section's seeded, uncased, drop-when-emptied field; call 1's rule): `FIELDS.calendar.heading` reaches Lattice's layout 1, and the `CAL_HEADING_1` ("Book Now") seed that
  `vm.limeTree` gives the family's layout 1 is **not** Lattice's (`sectionVm` `&& !vm.lattice`; `fieldSeed` already read `limeTreeTheme`, which excludes Lattice), so the seed is TITLES.calendar, "Availability". The
  `[ 007 ]` and the rule are the markup's, drawn with a word and dropped with it; the seat is kept (the art keeps its 64). The numeral is a literal: it does not follow the section's place on the page (a call to confirm).
- **`cta` is the Continue bar's label** (the frame draws a button where JP-088 removed the family's pill, so *no frame draws it* no longer holds): seeded `CAL_CTA_LATTICE` "Continue" for Lattice's layout 1 in `vm.calCta` and
  `fieldSeed`, so layout 4's wizard still seeds `CAL_SEND_4` and a label typed at layout 1 still follows it there. **Live it is an `<a href="#form">`** (`navHref(s, s.calBookTo)`: the form, or the pricing, or nothing) **whether or
  not a day is cued**, Retro's pill rule, and a picture on the canvas; an emptied `cta` drops the bar; the foot's line is plain text, never the link. A call to confirm: a Continue that is dimmed until a day is picked
  would be the other reading.
- **A booked or past day** is the family's: opacity .38, no strike, no handler (the frames draw none, so the look is the Lime block's, not Lattice's own).
- **`image` does not reach Lattice's layout 1** (`in: { Lattice: [3], '*': [0, 3] }`): the polaroid's seat holds art, not a photograph, so the panel offers no Photo and the section holds no photo slot (`photo-probe`:
  0 slots, PASS filled, `--blank`, `--drop`).
- **Caps** (`limits.mjs calendar --themes=5 --designs=0`): `heading` **25** (65 / 27 / 25: the 390 eyebrow row), `time` **16** (104 / 30 / 16: the foot's line is three lines at 390), `prompt` **33** (137 / 63 / 33),
  `IDENTITY_CHARS.calendar.location` **19** (50 / 19 / 19), `cta` measured 29 (box) and **held to 12** so the bar stays under a third of the 390 foot and the line keeps its room: a judgement call, the user's to
  overrule. Layouts 2-4 of those rows are Pop's, copied into explicit `Lattice` rows. `slotCta`, `availLabel` (`'*'` rows) and `slots` `kind` / `price`, `types`, `dateLabel` are layout 2's and 4's and unmeasured for Lattice.
  `--check`: 0 fail; `--seeds`: 0 over. `IDENTITY_READS.location.calendar` names Lattice's layout 1 (`reach.mjs 5` agrees: `who.location` reaches calendar layouts 1, 3 and 4).
- **Inline editing**: `heading`, `time` (a part of the line) and `cta` are hit at 1440 and 768; `prompt` is ledgered as `Lattice.0.calendar.prompt`, as every template's. `inline-probe --theme Lattice --layout 1 --cat
  calendar --width 1440,768 --check`: PASS, 3 slots hit, 0 UNLEDGERED.

## Paperback · layout 1 (plans/paperback/layout-1.md, section 8, 2026-11-21)

Frames `1:3131` · `1:11793` · `1:12975` (835 / 676 / 910 tall). **A block of its own, `PaperbackCalendar`** (`EncoreSection.jsx`, ahead of `Calendar`), dispatched in `Calendar`'s `if (s.v0)` **after the seam**, in the same `if (s.limeTree && (s.lattice || s.paperback))` as Lattice's, handed the same `g = { month, cur, line, step, pick }`: the month, the pick, the arrows (which stop at both ends and dim there live) and the Continue link are `Calendar`'s, so only the picture is Paperback's. Stage pattern as the pricing's: `containerType: 'inline-size'`, `u(v) = v/fw*100 cqw` with the frame's px verbatim at all three widths (`PAPER_CAL`), vertical insets in a child, `vm.pad = '0px <surplus>'` (`EncoreBuilder.jsx`, `cat === 'calendar'`).

- **The page**: a 40-radius blush card (`s.box2`, Scheme 2) on the white page, 141.1 / 70 / 24 down (the 1440 frame is an 835 min-height with the card centred; held as padding), two halves 40 apart (stacked at 390). Left: two 44 black discs round the month (Bricolage ExtraBold 52 / 42 / 34, lh .9, -0.035em), a weekday row, a seven-column grid of 48-tall white 14-radius cells 6 apart; the picked cell is `s.ac` under white with the **indigo circle** (`ART.circle`, and a narrower loop at 768 and 390: `circleTablet`, `circleMobile`) centred on it by the frame's offset. Right: `ART.blobMagenta`, a yellow tile (`s.onScheme[1].box2`) turned -4 degrees with the speaker, the confetti set per width (`confettiCalendar`, `…Tablet`, `…Mobile`) and a white disc turned -10 degrees with the headphones. Foot: a white pill (a 128-tall 24-radius card at 390) with the enquiry line and `PaperbackPill`.
- **The right half is pinned to the five-row month's height** (`alignSelf: start`, 360.8 / 358 / 240), so a six-row month grows the grid alone and the picture never rescales (the 2026-11-16 tester report's rule). At 390 it is a full-width block under the grid (`alignSelf` would collapse an all-absolute box there).
- **The month is fitted** to the room between its discs: `month.ems` for Paperback is Bricolage's table less the tracking (`calMonths`, `EncoreBuilder.jsx`), times a per-width `fit` (1.09 / 1.115 / 1.125; the table is read at 1000px). Walked over every month of the window (June 2025 to May 2027, 24) at `&live=1`: none overflows its box at 768 (tightest 1.1 px, *November 2026*) or at 390 (tightest 2.4 px, the same month). The first values (1.07–1.08, then 1.09 / 1.105 / 1.105, set from *September 2025* alone) overflowed by up to 0.8 px on *November 2026*, *February 2026* and *September 2026*, whose digits are wider. At 1440 the box is 200+ px wider than any label, so `fit` is inert there. The box is a container whose own `font-size` is the frame's, the span `min(1em, 100cqi / ems)`: June keeps the frame's 34 at 390 and shrinks to 41.3 at 768 (frame 42; the table over-reads June there); the longest months shrink to about 25 at 768 and 24 at 390.
- **Draws what the standing rules leave:** no script `pick your night!` and no script `Your night, your playlist` (no field; call 1). `heading` and `image` are not read at layout 1 (`in` rows name Paperback `[1, 2, 3]` and `[3]`). **`cta` is the Continue label**, seeded `Continue` through `CAL_CTA_LATTICE` (widened from Lattice to Paperback in `vm.calCta` and `fieldSeed`), a link to `calBookTo` live whether or not a day is cued and a picture on the canvas; an emptied `cta` drops the pill (and the 390 foot's 128 minimum with it). The foot's line is plain text, never the link (Lattice's rule, not Lime's JP-088).
- **A booked or past day** is the family's: dimmed to .38, no strike, no handler. A pick is the lit day; a second click unlights it.
- **Caps** (`limits.mjs calendar --themes=6 --designs=0 --upright`, then `--check` and `--seeds`: 0 failing, 0 over): `time` **24** (binds at 768, where the line is one line), `prompt` **36**, `cta` measured 34 (the 390 foot) and **held to 12** as Lattice's, so the 768 foot's line keeps its room: a judgement call, the user's to overrule. Layouts 2–4 of the `time` / `prompt` rows are Pop's and Lattice's numbers; `cta` layout 4 is `'*'`'s.
- **Inline editing**: `time` and `cta` are hit at 1440 and 768; `prompt` is ledgered as `Paperback.0` / `.1` / `.3.calendar.prompt`, as every template's. `inline-probe --theme Paperback --layout 1,2,3,4 --cat calendar --width 1440,768 --check`: PASS. `photo-probe` (layouts 1–4, and layout 1 `--blank` and `--drop`) and `focus-probe --prime` PASS; layout 1 has no photo slot.

## Paperback layouts 2–4: the caps (session 12, 2026-11-21, plans/paperback/layout-1.md)

- Layouts 2–4 are still Lime's / Pop's tree in Paperback's tokens. Every cap now has a `Paperback` row (none reads Pop's through `specAt`), measured by `limits.mjs calendar --themes=6 --designs=1,2,3 --upright`, then `--check` (0 failing) and `--seeds` (0 over). **The rule is lower-only and never under the seed:** a number the placeholder card cannot bear came down to what it bears, and one that bore more was left, so no cap rose. Lowered (layouts 2, 3, 4, an index per layout; `–` not read): `heading` [20,24,15] → [14,24,15]; `time` [–,–,33] → [–,–,26]; `prompt` [32,24,50] → [22,24,44]; `slots.kind` [36,–,–] → [31,–,–]; `slots.price` [40,–,–] → [37,–,–]; `types` [–,–,13] → [–,–,11]; `slotCta` [26,–,–] → [25,–,–]; `location` [–,–,67] → [–,–,29].
- **Rough edges (the seed is wider than the card holds a prose line of its length):** `prompt` L2 (22, 19). The cap holds at the seed, `--check` reads it as `(floor)`, and the card draws the seed as it does at the other templates. A layout-2–4 pass with frames replaces all of these.

## Headliner · layout 1 (plans/headliner/layout-1.md, section 8, 2026-11-24)

Frames `1:5205` · `1:15976` · `1:17026` (858.52 / 1044.33 / 1026.9 tall; the harness reads 858.64 / 1044.22 / 1026.8 with the seeded June). **A block of its own, `HeadlinerCalendar`** (`EncoreSection.jsx`, ahead of `Calendar`), dispatched in `Calendar`'s `if (s.limeTree && (s.lattice || s.paperback || s.headliner))` **after the seam**, handed the same `g = { month, cur, line, step, pick }` as Lattice's and Paperback's, so the arrows, the pick and the foot are the one seam in a fourth picture.

- **The picture**: a flat square cream card (`s.onScheme[2].bg`) on the amber band, **which is the section's own seat** (Scheme 4 in `SCHEMES_OF`), so the root paints the band and **no `cardOnPage` / `vm.pageBg` is wanted** (unlike Paperback's). The table `HEADLINER_CAL` carries each width's numbers (`top` 96 / 76.99 / 58.01, `side` 48.96 / 26.11 / 24); the stage is `containerType: inline-size`, `u(v)` in cqw, the frame's px verbatim at all three widths, `vm.pad` = the surplus alone (the Headliner line in `EncoreBuilder.jsx` now names `calendar`). **Nothing is centred in a taller box**: the 96 / 77 / 58 are padding round the card.
- **Desktop is two columns and a foot, narrow frames stack**: the month half (two 44 outlined squares in `#1E1E1E` round the Anton month, a 34-tall weekday row in `s.onScheme[2].text3` 18 down, a grid of **54-tall cells with a top rule only**: `HL_GAL_HAIR`; an absent cell draws no rule, so a short last row carries a rule under its two cells) beside the maroon panel; at 768 the panel stands beside the foot (a column, the line at the top and Continue at the foot), at 390 the panel is a full-width block over a one-row foot. **The panel's height is its own content's at every width**: 32 / 27 / 22 round a 120 ring-and-eye row, the in-flow head, and a 110 arrow row. The picked day is a `s.activeFg` square under an orange Anton numeral; a booked or past day is the family's (dimmed to .38, no strike, no handler); a second click unlights.
- **The head is two lines at the middle word** (the gallery's and pricing's rule: `Pick a` / `date.`, the space kept before the `<br>`), because no measure makes the frame's break at 390. **The narrow frames draw it 109.25 / 115.59 below its flow box, over the arrow row** (`position: relative; top`), where the block arrow is turned -90 to point up (a 110 x 132 box at +38 / +34 right and -22 / -19 up). It is fitted (`vm.titleWordEms` = the widest *line*, `antonEms(l, -0.005)`, in `sectionVm`'s calendar block) against `free` 607.047 at 1440 and 224 / 220 at 768 and 390, the room left of the up arrow. An emptied head keeps its two-line seat as an empty box.
- **The wave field is the hero's dataset**: `HeadlinerWaveField` (`headlinerArt.jsx`) draws `WAVE_X768` / `WAVE_Y` (70 six-point lines; proved identical to the calendar's field to 0.03 px over 420 points) as orange at .22 in a box of the panel's own width and height at the frames' stroke (.578 / .376 / .337), `preserveAspectRatio: none`. The hero's `HeadlinerWaves` is untouched (the digest's themes 0-6 are exact and theme 7's header is unchanged).
- **The `KM` disc prints `vm.initials`** (the hero's numeral rule) and ignores `badgeMode`; its Anton is nudged `top: .04em` to centre the cap height in the ring. The eye is the gallery's glyph in sand.
- **The month is fitted** to the room between its squares: `month.ems` for Headliner is `antonEms(label, -0.005)` (`calMonths`), the span `min(1em, 100cqi / ems)` in a container whose own font-size is the frame's 56 / 45 / 37. June 2025 sets the frame's 224.8 / 180.7 / 148.6; the widest month (SEPTEMBER 2025, 6.407 ems) shrinks to 30.8 px at 390. Walked over the 24 months of the window at all three widths: no month meets a square, no sideways scroll. **The row keeps the frame's height** (58.875 / 48.094 / 44) so a shrunk month does not move the grid.
- **Seeds and fields**: `heading` is the template's own seed `Pick a date.` (`CAL_HEADING_HEADLINER`, in `sectionVm` and `fieldSeed`; the "Book Now" line excludes Headliner), `cta` is `Continue` (`CAL_CTA_LATTICE`, widened to Headliner), `prompt` is the line while no day is cued, `time` the line's tail. **`image` is not read** at layout 1 (`in: { Headliner: [3] }`); `heading` reads `[0, 1, 2, 3]`, `cta` `[0, 3]` (hints updated).
- **Caps** (`limits.mjs calendar --themes=7 --designs=0`, then `--check` and `--seeds`: 0 failing, 0 over): `heading` **14** (seed 12; the probe read 5 at 768 until `FLOOR_AT['calendar.heading'].Headliner = [0]` let the fitted head shrink to 75 % before it counts), `time` **10** (binds at 390, where the line is three lines), `prompt` **29** (390), `cta` measured **37** and **held to 12** as Lattice's and Paperback's, so the foot's line keeps its room. Layouts 2-4 are Grunge's rows, written out (`prompt` `[29, 24, 36, 50]`, `time` `[10, null, null, 37]`).
- **The 768 foot's line stands in the frame's 175.891 measure** (three lines, `Enquiry for` / `Thursday, June 12 at` / `9:00pm`); 176 or a pixel wider fits `at` on the second line and the frame's break goes, so the number is a measured floor, not a round one.
- **Inline editing**: `heading`, `time` and `cta` are hit at 1440 and 768 (3 slots, 0 WRONG, 0 UNLEDGERED, 0 dead click); `prompt` is ledgered `Headliner.0.calendar.prompt` (shows only while no day is cued; the canvas opens with one cued). `photo-probe --check`: PASS (no photograph). `focus-probe --prime --check`: PASS, 5 controls per width, 0 failing; **`prompt`'s box falls on the head** (its first words, `Pick a date`, are the head's, and the prompt is not drawn), so `focus-probe.mjs` gained an `ACCEPTED` table (theme, section, label, reason), reported as `accepted` and not failing; it holds this one row.
- **Live** (`&live=1`): the arrows step June 2025 to July and back, dimmed and handler-less at the window's ends (June 2025 and May 2027); a day picks and the line follows (`Friday, June 20`), a second click returns to the cued default; Continue links `#form`; no console error. States walked: emptied `cta` (the foot keeps the line), emptied head (two-line seat kept), a three-word head, a one-word head (one line, no break), six-row months (+54 tall on the narrow frames; desktop stays 704 because the panel is the taller half).

## Backline · layout 1 (plans/backline/layout-1.md, section 8, 2026-11-25)

Frames `1:6558` · `1:18328` · `1:19659` (835 / 1108.30 / 1103.50 tall; the harness reads 835.11 / 1108.19 / 1103.41 with the seeded June). **A block of its own, `BacklineCalendar`** (`EncoreSection.jsx`, ahead of `Calendar`), dispatched in `Calendar`'s own-tree line **after the seam**, handed `g = { month, cur, hit, line, step, pick }`: Headliner's five plus **`hit`**, the picked cell itself, whose `stub` the ticket prints. All date maths stays in `sectionVm`: `stub` (`Thu 12 June 9:00pm`, lower-cased by the block) is composed per cell beside `line` and `short`, for Backline's layout 1 alone.

- **The picture**: dark olive (the section's own seat, Scheme 2) under a torn paper head. A paper month card (`BL_TICKET`, grain at .5) turned **-0.8deg** with the repertoire card's two shadows and two `BacklineTape`s centred 34 in and 42 down at both top corners, turned -50 / +50; two 43 outlined squares round the TT2020 month (`june ` ink, `2025` olive); Archivo Condensed weekdays in olive; rows of 52 (52.61 at 390) with the frame's **2-on-1-off** rule as a repeating gradient. The picked day is an olive number inside **a hand-drawn circle**: the master's one path in a 112 × 71 box, 14 left and 9 above its cell and 28 wider than it, `preserveAspectRatio: none` with `vector-effect: non-scaling-stroke` and the width in cqw, `pointer-events: none`. A booked or past day is the family's (.38, no strike, no handler). `BACKLINE_CALENDAR` holds each width's numbers; the frame's px at all three widths; **nothing is centred in a taller box** (the 151.6 / 90 / 67 are padding), and the right column is top-aligned, so a six-week month grows only the card.
- **The head** is the heading field, lower-cased, TT2020 72 / 48 / 38: **cream up to the first comma, mustard after it** (no comma: all cream). The 1440 master paints that run in the band's own olive, so it vanishes (the "cut second line" seen at planning); the 768 and 390 masters paint it mustard, and every width does. It is fitted to its widest word (`vm.titleWordEms`, `ttEms`). The `07 ┈┈ BOOKING` line keeps its 14.94 as padding. Seed `CAL_HEADING_BACKLINE` (`Pick a date, we’ll do the rest.`), in `sectionVm` and `fieldSeed`.
- **The ticket** is turned +2.5deg, 210 tall at least, with 12 px bites (`blNotchMask`), the frame's two shadows as `drop-shadow()` on the turned wrapper (deviations 14 and 1, the SVG filter's own), and the **media's barcode** (its bar list is identical; `BacklineBarcode` gained `dotR`, 2 here against the media's 3.4). It prints `hit.stub` and **the town** (the header's `location`; `IDENTITY_READS.location.calendar.Backline = [0, 3]`). **The date is never shrunk**: a long one wraps, as the 390 master's seeded one does. **With no day picked** (the published page whenever the opening date is past or booked, which with the seeded June 2025 is any visit today) the date's seat is a **blank dashed rule to be written on**; the prompt stands once, in the terminal line.
- **Not drawn** (call 1 A): `BOOKING REQUEST · ADMIT 120` (its 22 kept as padding), the event kind `Private party ·` (no field is its seat), the `PENCILLED IN` stamp, `GIG`, `NO. 0612`.
- **The foot**: a 2-on-1-off cream rule (`BL_RULE`) 48 under the content, the terminal line (`> ` and `_` are `aria-hidden` markup round the line) in TT2020 18, and the mustard `BacklinePill` to `calBookTo`. At 390 the line is held to **188** while there is a button (with none it takes the row): the master's 189.766 box breaks before `at`, which TT2020 here sets a hair narrower.
- **The month is fitted** between its squares (`month.ems` = `ttEms(label)`, `min(1em, 100cqi / ems)`, with 4 of air each side). Walked over all 24 months live at three widths: the least gap to a square is 3.47 px, at 390.
- **The picked number on the narrow masters is 14 px**, bound to the file's body-small token, among 24 / 22 numbers: read as a leak, and the block keeps the row's size.
- **Seeds and fields**: `heading` reads `[0, 1, 2, 3]`, `cta` `[0, 3]` (`Continue`, `CAL_CTA_LATTICE` widened to Backline in both places), `time` is the tail of both the line and the stub, `prompt` is the line while no day is cued, **`image` is not read** at layout 1 (`in: { Backline: [3] }`). `reach.mjs` (calendar, theme 8, 768 renders) agrees with every row.
- **Caps** (`limits.mjs calendar --themes=8 --designs=0 --upright --extra-lines=calendar.time,time,prompt,who.location`, then `--check` and `--seeds`: 0 failing, 0 over): `heading` **32** (1440: a longer one makes a third line), `time` **25** (390), `prompt` **47** (390), the town **48** (390, two lines allowed). `cta` measured **40** and is **held to 12** as Lattice's, Paperback's and Headliner's, so the 390 foot's line keeps its room. Layouts 2–4 are Pop's rows, provisional.
- **Inline editing**: `heading`, `time` and `cta` are hit at 1440 and 768; `prompt` is ledgered `Backline.0.calendar.prompt`. **`time` is drawn twice** (the ticket and the terminal line) and one slot printed by two nodes used to open from neither, so `INLINE_PART` gained the value **`'every'`** (this one key): any node that prints the part is the slot's. `photo-probe`: no slot. `focus-probe --prime --check`: 6 controls per width, 0 failing, 1 accepted (`prompt`'s box falls on the head, whose first words are its own; the Headliner case).
- **Live** (`&live=1`, a real mouse at three widths): 23 controls each take a click inside the page; a pick moves the circle, the stub and the line, a second click returns to the cued day, a past day takes none; the arrows walk June 2025 to May 2027 and back, dimmed and handler-less at the ends; Continue links `#form`. Walked: a long time and town, `September`, a six-week month, booked and past days with no cue, an emptied heading, town, time and button, a 28-letter one-word heading.
