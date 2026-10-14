# The footer — working notes

Moved word for word out of `CLAUDE.md`'s *Intentional limits — not bugs* on 2026-09-30, so it
loads only when a session works on it. "Above" and "below" may point into `CLAUDE.md` or
another `notes/` file.

- **The footer is the artist's sitemap, and the published one navigates.** It was the last
  §10.2 section that was a picture on *both* sides, and the only one whose links were dead by
  the **header's own rule**: `linkCol` drew `<a href="#">`, which the published tab's delegated
  listener swallows (`href.length > 1` is false) and which on the canvas jumps the *builder* to
  its own top — exactly what `navHref()` was written to remove everywhere else. The Book pill
  beside them was passed neither `to` nor `ext`, so it was a `<span>` on both surfaces, and its
  label read `s.cta1`, a key no footer field named. `FOOTER_LINKS` was two hardcoded columns of
  four strings; `c.links` is now a `LinksField` repeater of `{ label, to, url }`, the **eighth
  structured editor and the seventh repeater**, and the first whose row carries two *kinds* of
  target — `to` is a section id resolved against the page, or `link`, which takes the row's own
  address through `extUrl()`. That is `BookPill`'s own `ext ? … : to` seam moved down to a row.
  `FOOTER_TARGETS` lists **every category the page can carry, not the ones it does**: a Radix
  `Select` whose value names no item blanks its trigger, so a link to a section since deleted
  must still read as what it points at, and one can be aimed at a section not added yet.
  Resolving it against the page is `sectionVm`'s job. When a section target fails (§4.3a, F25),
  the **canvas keeps the row** and `LinksField` prints "Section not on the page" under its
  select, but the **published footer drops it** — the gallery's hide-the-empty-row rule, since a
  visitor gains nothing from a dead word. Only a missing section is dropped: a `none` row is a
  label the artist chose, and a `link` row whose address `extUrl()` refuses stays a picture (the
  Soundcloud rule, with `UrlInput` saying why). `BLANK_PAGE`'s published footer is therefore the
  Book pill alone, a span with nothing to book at, where its canvas still draws all eight labels.
  The header's **Minimal** nav follows the same rule: a Music / Gigs / About label with no
  candidate on the page is kept on the canvas, named in a hint above the Navigation links
  select, and left out of the published nav (`vm.navLinks`, filtered before `navEms` measures
  it). The two columns are **derived**, not stored, and derived from the **rendered** list, after
  that drop, or the published columns would go lopsided. The frames draw four and four, so the list is halved with the remainder in **column one** — the pricing
  deck's odd-count rule, and column one is the one the pill stands in, so it is the one that
  should run long — and an empty second column is dropped rather than rendered as a `nav` with
  no children, because `links` is a flex row and an empty child still spends its gap. The pill
  takes `vm.bookTo` with **no self-exclusion filter**, unlike the tier pills' and the
  calendar's: `footer` is not in `CTA_TARGETS.book`, so it can never point at the section it
  stands in. An emptied `cta` **drops** it, which the calendar's foot pill does not do — there
  the pill sits at the end of a row of type, here it is the block the column is built round,
  and a wordless block is not one of the section's states. `showBadge` is the header's own key,
  and `vm.showBadge` already read this section's content: the seal was hidable by nothing only
  because no field here named it. `FOOTER_CREDIT` stays a constant on purpose — it is the
  platform's byline, not the artist's. `vm.footerCta` is **uncased** where `vm.footerStatement`
  and the labels are cased, because the pill has always drawn the uncased `cta1` and casing it
  would recase the artist's own words on the templates that case (Grunge and Pop case `'title'`
  since their session 0s; a template's pill that wants capitals takes `textTransform`, as
  `BookPill`'s branch does). The footer keeps **no local state**:
  every link is an `<a>` whose href is `navHref()` or `extLink()`, so nothing here needs the
  `useState` the eight sections above it take.
- **The rule beside the name yields, and the name wraps past its floor** (JP-092, 2026-10-05,
  `plans/editorial/retest-qa-fixes.md`). Both trees draw the wordmark row as
  `[mark + name]`, a 20 gap, then the frames' 150 × 2 rule. The rule was `flex: 'none'` beside a
  `nowrap` name, so a long name (*Maximilian Featherstonehaugh*) pushed it past a 390 page and
  the page scrolled sideways (Retro, Lime, Editorial; Pop's root clips, so there the rule was cut
  at the page's edge instead; Grunge's narrower label fits). It is now NavBar's §10.2 rule
  (`flex: 0 1 …`, a 30 floor at narrow widths), with one change: its basis is **0**, grown to a
  `maxWidth` of 150, not shrunk from a 150 basis. Flex shares a deficit by basis, so a 150 basis
  beside a wrapping name would wrap the name while the rule still had room to give; at basis 0
  the rule stands at its floor before the name gives a pixel. Past the floor the name wraps
  between words, never inside one (CLAUDE.md JP-062's rule for a display name), so Retro's row
  is a `minHeight` of 31, not a `height`. The seeded name never fills the row, so the rule keeps
  its 150 (123 on the desktop canvas) everywhere.
- **At 390 the name's measure stops short of the seal, and Pop's small print keeps the sun's
  corner** (JP-122, user call, 2026-10-09, `plans/pop/layout-2-qa-fixes.md`). Every 390 frame
  stands its seal absolute over the wordmark row's right end, with the disc's equator level with
  the name. So with JP-092's measure alone, a long name ran under the disc: Pop's, Editorial's
  and Retro's *Featherstonehaugh*, and Retro's *Florence*.
  - **The seal.** In both trees the mark-and-name group is capped at the row less the disc's left
    edge and the row's own 20. That edge is `inX` plus the radius in from the column's right in
    Lime's tree, and `sealPos.right` plus `sealSize` in Retro's. The rule still runs on under the
    seal, as the frames draw it, and still yields first; then the name wraps between words.
  - **The group keeps its `min-content`**, so a single word wider than the room pushes the rule
    as before rather than running over it. It still reaches the seal: JP-113's named one-word
    footer item.
  - **The cap's reach.** A hidden seal frees the room. 768 and 1440 are uncapped: no disc reaches
    its row there.
  - **Pop's small print.** Pop's 390 row packed both strings right, so a long copyright wrapped
    from the column's edge, under the corner sun. The row now starts the row's own 10 past the
    sun's ink at the type's height (54.25 past the column's edge, mapped row by row; the foot ray
    reaches 59). The two strings stand side by side while they fit. Past that the row wraps as a
    whole: the credit drops under the copyright, both right-aligned, and the copyright wraps
    between words. The row is a `minHeight` there, so a long typed Small print grows it rather
    than spill.
  - **The seed.** It keeps the frame's one line at 390 and 414. At 360 its credit drops, where
    the © used to sit on a ray.
- **At 390 the second link column fills the row and breaks after its slash, under Pop and
  Editorial** (Pop's frame, FILL 173, SHOWS/ over COVERAGE; Editorial's on a user call,
  2026-10-06, `plans/editorial/display-face.md` step 5). The column is `flex: 1 1 0` with
  `minWidth: 0`, the label `normal` with a `<wbr>` after each `/`, the first column hugging. In
  Gloock the Book pill (194.1) and SHOWS/COVERAGE (163) set the two columns 383 wide, so a 360
  page scrolled 23px sideways and a 390 one ran 3 into the frame's 10 inset; Noto's ended at
  337.7. So Editorial's seed breaks at 390 too, where its frame sets one line. Lime, Grunge and
  Retro keep their `nowrap` columns.
- **Character caps** (`plans/char-limits.md`, session 11, 2026-10-14; the per-width readout is
  `plans/char-limits/session-11-probe.md`). The footer has one design, so each cap is one number a
  template, and a template switch is the only move to a tighter one.
  - **The statement is a display head**, held to its frame's three lines, not a block: 36, the
    seed's own length (*Let's make\nyour night unforgettable.*), and 45 under Grunge. Two things
    under 36 are not caps. At 390 the seal's disc stands over the right end of the first line,
    which the seed's typed break keeps short; a statement typed without a break runs under the disc
    from 10–19 characters (Retro, Lime, Pop). That wants the first line to keep the disc's room,
    JP-122's `sealRoom` for the wordmark row, and is the user's call. Editorial's fitted head sets
    prose larger than the seed (whose *UNFORGETTABLE.* pulls it to 41px), so prose takes a line
    more there.
  - **A link label is read in every row at once**, since the rows are halved into two columns side
    by side and each pushes the other. Sized at 28 (Lime, Grunge); Retro 19, Editorial 20, Pop 14,
    its floor. Pop's corner sun stands under the second column's last row at 1440, clear of the
    seeded *Shows/Coverage* in row 5 but met by a last-row label of 11 characters or more.
  - **The Book pill and the labels share column 1's width**: 16, but Editorial 12 (beside labels of
    20; 16 would need labels of 14) and Pop 11, where a 12th character squeezes the seeded second
    column so *Shows/Coverage* takes three lines.
  - **The copyright** is read beside the credit, a literal: Retro 31, Lime 28, Grunge 32, Editorial
    24, Pop 35. Pop's 390 row may drop the credit under it (JP-122). `vm.copyright` is composed after
    `sectionVm`'s clamp, so it prints the name at `IDENTITY_CHARS.footer.title` (Pop 10:
    `© 2026 Kestrel…`), while the panel's box shows the composed seed with the full name, and its
    counter knows nothing of that clamp.
  - **The page's seat moves no text**: every text rect and ring `textPath` reads the same at
    `&page=` 0–3, so the harness's page-less render measures every page.
