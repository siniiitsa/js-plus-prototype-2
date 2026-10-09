# The header's navigation — working notes

Moved word for word out of `CLAUDE.md`'s *Intentional limits — not bugs* on 2026-09-30, so it
loads only when a session works on it. "Above" and "below" may point into `CLAUDE.md` or
another `notes/` file.

- **The header's nav scrolls, and the scroll lives outside `EncoreSection` — because it is an
  `href`.** The repertoire's layout-4 A–Z rail scrolls from *inside* the file, and the two do not
  contradict: the nav's target is a fragment, which cannot be followed in the popup, so it needs
  the delegated listener below; the rail holds the node itself on a callback ref and calls
  `scrollIntoView` on it, which needs nothing outside. `sectionVm` gives
  every section `vm.anchor = cat` (categories are unique per page, so `#repertoire` is a valid
  id), the section root applies it as `id` **only when `s.live`** — the editor document renders a
  dozen header previews and they would all claim `id="header"` — and one delegated `click`
  listener in `dressPublishedWindow` turns a fragment href into a `scrollIntoView`. A fragment can
  never be *followed* in the popup: `<base href>` pins it to the opener's URL, so the tab would
  reload the builder. On the canvas the links carry **no href at all** (not `#`, which would jump
  the builder to its own top); `navHref()` in `EncoreSection` is the whole of that gate.
  `navSections` is `{ cat, label }` and `vm.navLinks` is `{ label, to }` — key the map on `label`,
  because the label is what is distinct by construction in both modes; `to` is not promised to
  be (Minimal's old Shows and Book could land on one section, and today's three preference
  lists are disjoint only by their seeds). **The label is the visitor's
  word, not the editor's** (JP-033): `CATS[].nav` through `navLabel()` in `data.js` — About, Top
  Tracks, Media, Repertoire, Shows/Coverage, Pricing, Enquiries, Reviews, the eight every frame's
  footer draws and layouts 1 and 4's navs with it, plus **Availability** for the calendar, which is on the seeded page and in
  no frame's nav (user call, 2026-09-18: a ninth link over an unreachable section). `catName()`
  keeps every editor-side use, `FOOTER_TARGETS`' select included. One `navSectionsOf(cats)`
  builds the list for the editor, `PublishedPage`, the picker's `previewNav` and the harness, and
  `FOOTER_LINKS` seeds its labels from the same `navLabel()`, so a fresh page's two lists agree;
  the footer's rows are then the artist's to reword and the nav's are not. `vm.calFlow` reads
  these labels too, so calendar layout 2's head says "Availability · Pricing · Enquiries" where
  its frame's flow says "Available dates · Packages · Enquire" (held when JP-041 reported it
  again, 2026-09-21). **Minimal's triple is the frames' own** (JP-033, second pass): layouts 2
  and 3 draw Music / Gigs / About in Retro and Lime alike (and in Grunge's, Editorial's and Pop's), so
  `NAV_MINIMAL` is those three —
  Gigs on the map or the calendar, About on the bio, Book gone because its pill already stands
  beside the links — and **`navMode`'s default follows the layout** (`navModeDefault()` in
  `data.js`, JP-039 reopened, user call, 2026-09-23): Minimal at layouts 2 and 3 of every
  template (Pop's joined with its layout-2 and layout-3 passes, each once its frame was read),
  *Follow my sections* everywhere else, and in
  `EditPanel`'s fallback chain too, so the panel names what the canvas draws. A stored value
  always wins, so the seeded header is its frame's picture at all four layouts and moves with the
  layout until the artist picks. **At 768 the links are
  fit-gated in layouts 2 and 3, and folded everywhere else** (JP-039, user call, 2026-09-21).
  The 768 masters of layouts 2 and 3 draw Music / Gigs / About in the capsule, in Retro and
  Lime alike (and in Grunge's, Editorial's and Pop's two); those of layouts 1 and 4 hide all eight link nodes beside a burger. But `navLinks`
  is the artist's page, and the seeded eleven sections give nine — 576px of type at the master's
  own 16px, 720 with the capsule's eight 18px gaps, in a 708px bar that also seats the wordmark,
  Listen and the pill. So `sectionVm` sums the bar's one row at the master's own sizes — the
  capsule, the name, Listen and the pill, against 708 in layout 2 (the root's column since JP-038) and 684 in layout 3 — and
  **`vm.navFits`** is the answer: the links draw when it is true and `NavMenu`'s burger stands
  otherwise, in the same bordered capsule, which the 390 masters draw the burger in. Minimal's
  three fit under the seeded name (the wordmark is in the sum, so a long one can fold them too); *Follow my sections* on the seeded names fits up to four links in Retro
  layout 2, five in Retro layout 3, seven in Lime's layout 2 and six in its layout 3, eight in Grunge's layout 2 and seven in its
  layout 3, four in each of Editorial's layouts 2 and 3, and three in Pop's layout 2 and four in
  its layout 3 (it is the words' width that counts, not their number), so a page switched to *Follow my
  sections* is still the burger. It is a vm boolean
  because `EncoreSection` has no effect to measure with: Lime's sum is `navEms` /
  `navNameEms` / `navCtaEms` (Bebas, `bebasEms()`), Retro's is `antonEms()` in `data.js`, its
  0.02em tracking folded in (Grunge's arm is the same table at a tracking of 0, its mode stating
  none; Editorial's `navEms` family is `gloockEms()` × `faceK`, advances and kerning pairs read
  off the rendered DOM, and its layouts 2 and 3 take Grunge's arm — the same bar, the same fixed
  18 gaps — in Gloock (five links ran 697.4 in Noto and 791.9 in Gloock), layout 3's links at
  Label/SM where Grunge's are Label/MD, against 684; Pop's layout 2 takes it too, in `titanEms` × 0.98, against **656**, the frame's bar, inset 26 inside the 708 spread, and its layout 3 against layout 3's 684, Editorial's layout-3 bar box for box). It is set at tablet only — desktop never reads it and always draws
  the links — and is undefined, so the burger, at 390, on an empty nav and in layouts 1 and 4;
  layouts 5 and 6 draw `NavLinks`, which
  keeps the (wrapping) link row at 768 and collapses only at 390 (measured in JP-033's digest).
  The harness takes `&nav=<n>` to shorten the page and walk the flip.
- **At desktop, layout 1's capsule gives the name away before the links** (JP-091, user call,
  2026-10-01, reversing "below the floor it wraps"). Under Lime, Grunge, Editorial and Pop the links
  take the room the wordmark and the pill leave, sized `100cqi / navEms` between their 12px floor
  (Grunge's row 16, faced to 12) and their cap. The name used to keep its size whatever it was,
  so a long one pushed the links below the floor and onto a second row: Editorial's nine Noto
  links needed 636px at 12, which left a name 6.75 em (Gloock's need 720, so since
  `plans/editorial/display-face.md` the seed itself takes the two-line branch below, at 16.8).
  Now the bar is a query container, and the name's room is the capsule's content box less the mark, the gaps, the pill (its label off
  `vm.navNameFit.pill`) and the links at their floor. In that room the name:
  - keeps its size while it fits on one line (`navNameFit.one`);
  - otherwise shrinks on one line;
  - once one line would put it below 20.1, the size at which two lines of 1.1 fit the pill's
    44.28, wraps between words, balanced, onto two lines at no more than that size
    (`navNameFit.two`, the best split's wider line);
  - takes whichever of those is larger, so the bar never grows;
  - never goes below the links' own floor. There its box grows past the room to the best split's
    wider line and the links wrap as before. Only a very long pill label, or one word too long
    for the room (a 34-letter word under Editorial in Noto), gets that far.

  **Under Pop the links' floor is 11 in this capsule, not 12** (JP-114 · JP-115, user call,
  2026-10-08, `plans/pop/qa-fixes.md`). It is the name's floor too. Pop's nine Titan links need
  746px at 12, which left the name 77: the seeded KAI MERCER took two lines at its own 16, and
  *Florence and the Machine*, *Maximilian Featherstonehaugh* and *Supercalifragilistic* reached the
  floor and wrapped *Reviews*. At 11 the room is 139. The seed sets on one line at 16, and every
  name in the long-name set holds the row at 1180–1920. A single word past about 12.5 Titan em
  (about 18 letters) still takes the last resort above. The lower floor is desktop's alone: the
  390 fit keeps 12. Pop's layout-4 capsule takes it too, with the name fit (below). **Editorial
  sits where Pop did**, named
  there and not changed: since the Gloock swap its nine links need 720 at 12, which leaves the
  name 70.9, and all four long names wrap *Reviews* at 1180–1920.

  At desktop this is design 0's alone (NavBar's `s.v0`), and Pop's design 3 (below). **Layout
  4's capsule** where it passes `links` (Grunge's and Editorial's) and **Retro's bar** (whose
  pill drops to a second row with a long name) keep their wrap, and are named in
  `plans/editorial/qa-fixes.md`'s JP-091 for their own tickets. Editorial's layout-4 seed wraps
  *Reviews* at 1180–1920 (Gloock, 718.8 at 12 in 680.5), named again by JP-127.

  **Pop's layout-4 capsule gives the name away too** (JP-127, user call, 2026-10-09,
  `plans/pop/layout-4-qa-fixes.md`; *reversing* JP-091's scope there and `plans/pop/layout-4.md`
  open question 10). It passes no `links`: its Label/SM 16 links a fixed 23 apart are the em
  reading (`navGapEm`'s 23/16 at `d === 3`) at the cap. Its mark, gaps and pill are layout 1's
  to the pixel, and its name is `s.labelLg` 20 under the same 18.45 cap, so NavBar's `floor` and
  `fit` take `s.v3` beside `s.v0`, behind `pop`, with the room's constants unchanged. The seeded
  nine needed 733.6 of 702.2 at 12, so *Reviews* sat alone on a second row (the bar held 60.64).
  At 11 they need 672.5: the seed holds one row at about 11.3 with KAI MERCER at 20 on one line,
  and every name in the long-name set holds the row at 1180–1920, *Florence and the Machine* at
  the 18.45 cap on two lines and *Supercalifragilistic* at 11.7 on one. On the 1088 editor canvas
  the seed's name takes two lines at about 11.5, and the long names still wrap there.
- **At 390 the name gives way to the pill, in layouts 1 and 4** (JP-101, user call, 2026-10-05,
  `plans/editorial/retest-qa-fixes.md`). The narrow capsule has no links, only the wordmark,
  the pill and the burger, and the name used to stay `nowrap` at a flat size, so a long one ran
  under the pill (the hero clips it, so nothing scrolled). Now its left half is the query
  container, and the name's room is up to the pill: the half plus the halves' gap, less the mark
  and its gap. In that room the name (a `narrow` fit in `Wordmark`):
  - keeps its size while one line fits;
  - otherwise wraps between words, balanced, onto two lines at the size the longer one fits
    (`navNameFit.two`), capped at its own size, and the bar grows by the line. The hero is a
    fixed `aspectRatio` with its content `space-between`, so the extra comes out of the empty
    middle, never the identity block;
  - below 12px (Grunge's nominal 16) takes a third line, its box being the room;
  - goes below that floor only for a word too wide for the room at the floor
    (`navNameFit.word`, the widest word), so no name reaches the pill or breaks inside a word.

  Its row is `flex: none`, because Editorial's seed already ran 2.8px past its half into the
  gap in Noto, which a shrinkable row would wrap. So `sectionVm` builds `navNameFit` for design 3
  too. Lime's, Grunge's and Pop's seeds keep their size and one line at 390 and 414. Editorial's
  layout-1 *Kai Mercer* wraps onto two lines at its 24.18 at 390 and 414, and at 21.62 at 360,
  since Gloock's needs about 143 of the 121 up to the pill (`plans/editorial/display-face.md`
  step 4, layout 1; in Noto it wrapped at 360 alone, having run 22.8px under the pill). Its
  layout-4 seed keeps one line at all three. Lime, Grunge, Editorial and Pop; 768 fits every name, and
  **Retro** (no ems table) and **Editorial's layout-3 centred name** (`HeaderV2`, its own span)
  are named in the entry, not fitted. Pop's layout-3 name is that span too (the block is shared),
  and with a long name it runs under the 390 pill the same way (`plans/pop/layout-3.md`,
  section 1), named, not fitted.
- **Layout 2's 390 bar takes the same fit, between the burger and the pill** (JP-121, user call,
  2026-10-09, `plans/pop/layout-2-qa-fixes.md`), under Lime, Grunge and Pop. Its name is centred
  between two cells (`HeaderV1`'s `s.limeTree` row), and a long one used to run over the burger's
  capsule, whose cell could collapse, and push the pill off the page. At 390 both cells now hold
  their content (`minWidth: max-content`), so the name stays centred while it fits and slides
  toward the narrower side when not. Its room is the row less the capsule, the pill and the two
  gaps, with the row the query container at 390 as at desktop. In that room the name takes the
  `narrow` fit above: one line at its size, else two balanced lines, the 12 floor (Grunge's 16),
  a third line, then `word`. A wrapped name's box is the whole room, so its lines centre between
  the capsule and the pill. The pill's box is summed in the faces' ems (`navNameFit.pill`); under
  Grunge its 390 label is Anton at an unfaced 12.07, so the term divides `faceK` back out. So
  `sectionVm` builds `navNameFit` at design 1 too. Lime's and Grunge's smaller faces fit every
  reported name at 390 and 414 anyway, so only Pop moves there. **Editorial keeps its row**: the
  user accepted its layout-2 case as a remainder of JP-101 on 2026-10-07, and that call stands. So
  with *Featherstonehaugh* its pill still runs to 407 and its page scrolls sideways. Retro's bar
  (`labelStyle` at 17 between two spacers, its pill to 426) and every layout-3 centred name are
  still named, not fitted.
