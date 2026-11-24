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

## Lattice — layout 1 (2026-11-20; `plans/lattice/layout-1.md`, *Settled in section 11*)

- **The block is `LatticeFooter`, standing at the head of `Footer` on `s.limeTree && s.lattice`, ahead of Lime's block.** `Footer` owns no hook (the grep over the whole function for
  `useState | useRef | useId | useEffect | useMemo | useCallback | useReducer` finds none), so, unlike every section since the bio, no early return can change a hook count; **if `Footer` ever gains a
  hook, this dispatch must move below it.** The seam is restated in the block: `extLink` / `navHref` per link row, `BracketButton` on `bookTo` (no self-exclusion filter, as the pill's note says), the pill dropped
  with its label. Frames `1:1251` · `1:9880` · `1:10850` (1440 x 480, 768 x 612.19, 390 x 586.19); desktop x 0.82 through `u`, 768 and 390 verbatim, raw sizes (40 / 32 / 26 statement, 12 / 11 mono), not the ramp.
- **The links are read ROW BY ROW, from `vm.footerLinks`, not halved from `vm.footerCols`.** The frame's DOM order is `About, Top Tracks / Media, Repertoire / Shows, Pricing / Enquiries, Reviews`, which is
  `FOOTER_LINKS`' own order, laid in a 2-column grid. The halved columns every other template draws would put *About, Top Tracks, Media, Repertoire* down the left, where the frame draws *About, Media, Shows,
  Enquiries*. An odd count leaves the last row one link (the first column long, as the notes' rule wants); an empty list drops the grid and the pill stands alone. The panel's hint says so for Lattice
  (`FIELDS.footer.links.hint` is `{ '*': …, Lattice: … }`, `EditPanel` reads the template's).
- **The 12-column grid** (89.84, gap 24) puts the left block on columns 1-7 and the links on 9-12 at 1440. 768 and 390 stack them, **36 and 28 apart**, the frames' own numbers. The left block carries a
  **1px right border at every width**: at 768 and 390 it stands at the stacked block's right edge, which looks like an import leftover and is drawn as the frame renders (a call to confirm).
- **The statement** is `Archivo Lattice` 500, line 1, +0.004em, uppercase, in a wrapper of **11em of its own size** (a container, `inline-size`): the seed's one typed break plus that measure fold the frame's three hand-broken
  lines at all three widths (UNFORGETTABLE. is 10.4em; *YOUR NIGHT UNFORGETTABLE.* 16em). The fit to the widest word (`vm.footerWordEms`, Lattice's own line in `sectionVm`, the alias's table plus 0.004em a glyph) reads that same box,
  so a long word shrinks instead of running on towards the disc. The 11em is chosen, not read (a call to confirm).
- **The disc is the header's raster** (the 400 x 400 ink box of the frame's footer is the file `LATTICE_ART.disc` was cut from: crop (74, 95), 256 x 162, ink 250 x 156), a mask inked `s.tx`, 128 x 81, **70 off the block's
  right and 10.5 off its top**, at 1440 and 768; the 390 master draws none, so the footer's `showBadge` (Show / Hide, the footer's own field) changes nothing at 390 (the bio's 390 is the same). It is no ring and does not
  spin. The wordmark group's measure stops 20 short of the disc's left edge while it is drawn (`discRoom`, JP-122's rule in the other direction): the measured name cap (39) never reaches it, but a typed one past the cap
  stored in the content would.
- **The small print** is `s.text3` (orange) mono 11 on a 1px full-ink rule inside the content insets, 20 under it; the copyright takes the room the credit leaves and wraps, the credit never does (`A JustPay Product` is `FOOTER_CREDIT`,
  a literal). An emptied copyright leaves the credit at the right.
- **Ground and glow.** Scheme 8 (`#111`, `SCHEMES_OF.Lattice` row 0; `footerBand` is undefined for Lattice, so `page === 2` reads the same ground). The glow is the root's own `radial-gradient(ellipse 60% 55% at 85% 40%, glow 14%, 0
  at 70%)`, which all three masters' `gradientTransform`s reduce to. **No dot field** (the frames draw none), so the root holds no `url()`. `vm.pad` is 96 / 80 at 1440 (x 0.82: 78.72 / 65.6) with the block's `minHeight` flooring the section at
  480 x 0.82 and centring the content in it (the frame's 96.91 / 80.9); 56 / 40 narrow, where the section is its natural height.
- **Caps** (`limits.mjs footer --themes=5`, then `--check`: 0 fail; `--seeds`: 0 over): statement **37**, link label **19**, button **36**, copyright **25**, the name (`IDENTITY_CHARS.footer.title`) **39**. The ring is not drawn,
  so `who.seal` reads *unseen* and `IDENTITY_CHARS.footer.seal` keeps Pop's number, unread.
- **The seed's `Shows/Coverage`** (`navLabel('map')`, shared with the header's nav) prints where the frame draws *Shows*; the label is the artist's copy, so it is not forked.

## Paperback — layout 1 (2026-11-21; `plans/paperback/layout-1.md`, *Settled in section 11*)

- **The block is `PaperbackFooter`, standing at the head of `Footer` on `s.limeTree && s.paperback`, ahead of Lattice's line.** `Footer` owns no hook, so the dispatch is an early return at the head; **if `Footer` ever gains a hook, it must move below it** (Lattice's rule). Frames `1:3395` · `1:12081` · `1:13263` (486.59 / 798.47 / 876.27 tall). `PAPER_FOOTER` holds the per-width numbers; `u(v)` is the frame px in `cqw` of a `containerType: inline-size` stage, `vm.pad = '0px <surplus>'` (`footer` joins the Paperback pad condition in `EncoreBuilder.jsx`), the padding in a child (a container's own lengths do not resolve against it).
- **The picture:** an indigo band (Scheme 3, the section's own ground; `SCHEMES_OF.Paperback[page].footer` is 3 on every page, so `&page=2` moves nothing). **Scheme 3 flips the tokens** (`s.tx` white, `s.ac` orange), so the frame's pink, yellow and ink are read off their own schemes as `PaperbackMap` does: pink `onScheme[5].bg`, yellow `onScheme[1].box2`, ink `onScheme[8].bg`, the card's keyline and the disc's ring `PAPER_WHITE`.
  The name is Bricolage 800 at 44 / 35 / 29 (lh .9, -0.035em), fitted to its widest word by `vm.footerWordEms` (the table less the tracking times **1.18**, `EncoreBuilder.jsx`, Paperback alone) on a container, so a 27-letter word shrinks to about 24 / 23px at 1440 and 390 and a long name wraps between words. The 1.18 is measured, not borrowed (the form's and the testimonials' 1.12 broke a 37-character run of `W`, `M` or `m` inside the word at 1440 and 390: `M` needs 1.05 beyond 1.12, `W` 1.02, `m` 1.01); with it every single word at the cap, `W` `m` `i` `M` runs, a letters-and-digits mix and a 33-letter word, stands on one line at all three widths, and a typed name wider than its column never overflows. **The sitemap is a wrapping row of pills read ROW BY ROW from `vm.footerLinks`**, not the halved `footerCols`: 44 tall, radius 999, white at 12%, Figtree Bold 14, 16 aside, 6 apart, so the wrap is the flow's (the frame's own rows at 1440 and 390 come out of the container width; the seeded `Shows/Coverage` is wider than the frame's `Shows` and pushes `Reviews` onto a second row at 768).
  The Book pill (`PaperbackPill`, pink under white, 24 under the pills) is the shared link to `vm.bookTo` with no self-exclusion filter, dropped with its label. The photograph is a 351 x 280 keyline card (4px white, radius 24; 262 wide at 390) turned -8 degrees in a 300-tall box with the initials disc (98, 3px white ring, Bricolage 35 / 32 / 29) 10 in from the box's right edge, three sparkles at (6, 242) (48, 220) (58, 268). The small print is a 1px white-30% rule that bleeds past the root's surplus, 48 under the content, over the copyright and the credit (`FOOTER_CREDIT`, one line, never wrapping).
- **No newsletter** (call 2: A). The freed seat is the photo's: at 1440 the photo is centred in the two columns the frame gives the photo and the form; at 768 and 390 it is the last block, centred. The band's foot is 32 under the small print at every width. The section is 486.59 x 0.82 tall at 1440 (the 300 box, not the left block, sets it), 718 at 768 and 748 at 390 (the frames' 798 and 876 less the newsletter's seat, plus the Book pill's 72).
- **Not drawn:** the statement (`FIELDS.footer.statement` takes `in: { Paperback: [], '*': [0] }`, so the panel does not offer it), the newsletter, and the frame's lower-case `A JustPay product` (the constant is `A JustPay Product`, a literal on purpose).
- **Fields it reads:** the header's name (`vm.brand`), `links`, `cta`, `showBadge` (Show / Hide on the initials disc, which has no ring to turn), `copyright`, and **`image`**, new: `FIELDS.footer.image`, `in: { Paperback: [0], '*': [] }`, `aspect: [5, 4]`, seeded `PAPERBACK_PHOTOS.footer` (shot 4, the same file as the gallery's fourth tile and the media's fourth cover). No other template's footer draws a photograph and none offers the box. An emptied photo (`null`) draws the initials placeholder on the pink card.
- **Caps** (`limits.mjs footer --themes=6 --designs=0 --upright`, then `--check --upright`: 0 failing; `--seeds`: 0 over): link label **47** (390 binds; 61 at 1440, 108 at 768), button **36**, copyright **34** (one line beside the credit at 390), the name (`IDENTITY_CHARS.footer.title`) **37** (1440 binds; 84 at 768, where the line count passes two; 47 at 390). The ring is not drawn, so `who.seal` reads *unseen* and `IDENTITY_CHARS.footer.seal` keeps Pop's number, unread.
- **Proofs:** `inline-probe` footer at layouts 1-4, 1440 and 768: PASS (10 slots hit: eight link labels, the button, the copyright; the name, the disc's initials and the credit are not footer slots), no `INLINE_OFF` row. `photo-probe` PASS at layouts 1-4, layout 1 also `--blank` and `--drop` (the disc covers 6 of 112 points of the photo), no `PHOTO_OFF`. `focus-probe --prime` layouts 1-4: PASS (19 controls). **The rule's bleed is proved with a non-zero surplus** (a temporary `&sur=100px` in the harness, reverted: the root pads 100, the rule spans the root's 1600 and the copyright and credit stand 47.6 in from the stage, the frame's 48.96 x 1400 / 1440).

## Headliner — layout 1 (2026-11-24; `plans/headliner/layout-1.md`, *Settled in section 11*)

- **The block is `HeadlinerFooter`, standing at the head of `Footer` on `s.limeTree && s.headliner`, ahead of Paperback's line.** `Footer` owns no hook, so the dispatch is an early return (**if `Footer` ever gains a hook, it must move below it**: Lattice's and Paperback's rule). Frames `1:5480` · `1:16253` · `1:17302` (395.31 / 491.94 / 655.02 tall). `HEADLINER_FOOT` holds the per-width numbers; `u(v)` is the frame px in `cqw` of a `containerType: inline-size` stage, `vm.pad = '0px <surplus>'` (`footer` joins the Headliner pad condition in `EncoreBuilder.jsx`), the vertical insets in a child. **Nothing is centred in a taller box**: 64 / 51 / 38 round the content, 48 to the rule, 18 under it, 13.625 of small print.
- **The picture:** a bare `#1E1E1E` band (Scheme 7, the section's own ground). Every ink is the frame's sand `#EEE3D1`, read as `s.onScheme[1].bg` (not `s.tx`, which is the seat's cream), the Book pill's type `s.onScheme[1].text1`, the rule `HL_HAIR`. The monogram's `#CE1F1A` (`HL_FOOT_RED`) is the one literal no scheme holds. Desktop is a grid on a 32 gap (540.516 | 426.016 | 311.516), **768 two rows** (the left block, then the links 341.89 beside the pill's column), **390 three** (left, links, pill, 32 apart).
- **The links are the two derived columns** (`vm.footerCols`), which are the frame's first two columns exactly (the seed's first four and last four links; the frame's third, `SOCIAL`, is four services no field holds). Anton 20, 31-tall boxes 43 apart, the first 26.69 down (where the frame's `EXPLORE` / `MORE` / `SOCIAL` eyebrows stood: no field, so **their seat stays as padding**). A column is `min(colW, 100%)` wide at the least and **grows into the dropped third column's seat** (the seed's `Shows/Coverage` sets 140 where the frame's `Shows` is 55 in 128.67), wrapping between words only past that.
- **The tagline is drawn: `FIELDS.footer.statement` is its seat** (an `area`, seeded, uncased on a `title` template, dropped when emptied), re-seeded for Headliner as the frame's `House, disco, soul and 80s — chosen by the room.` (`FOOTER_STATEMENT_HEADLINER`, in `sectionVm` and `fieldSeed`; the shared seed is the form's head, which this frame prints one section up). Fraunces Headliner 300 at 30 / 27 / 25 (lh 1.06, -0.015em), `pre-wrap`, so it breaks at `chosen by` at 1440 and sets one line at 768 as the frame does. Not fitted (no head).
- **The newsletter is not drawn** (call 1). Its sand `SUBSCRIBE →` is `HeadlinerPill`'s own box, so **the Book pill (`cta`, the shared link to `vm.bookTo`, no self-exclusion filter, dropped with its label) takes its seat in the pill's sand and `#1E1E1E`**: level with the first link at 1440 and 768 (the same 26.69), under the links on the 32 gap at 390. The seeded section is therefore 395.49 / 491.92 / 568.24 tall (the frame's 395.31 / 491.94, and 655.02 less the newsletter's column, since the 390 stack has no seat for it).
- **The monogram is `vm.footerMono`**, composed in `sectionVm`: the first three letters of the name's first and last word, upper-case (`Kai Mercer` is the frame's `KAI` / `MER`); a one-word name stands alone (`ANA`), a clamp's `…` or any mark that is not a letter or digit is not a letter of it; `aria-hidden`; hidden by the footer's own `showBadge` (Show / Hide, with a Headliner hint). The hero's numeral and the calendar's disc are `vm.initials`; this square is the frame's own text.
- **Fields it reads:** the header's name (`vm.brand`, `IDENTITY_CHARS.footer.title`), `statement`, `links`, `cta`, `showBadge`, `copyright`. **No photograph** (`HEADLINER_PHOTOS` has no `footer` key, no `FIELDS.footer.image`).
- **Caps** (`limits.mjs footer --themes=7 --designs=0`, then `--check` and `--seeds`: 0 failing, 0 over): `statement` **59** (the seed's 48 fits; 80 at 1440), link label **18** (a 19th wraps at 768 and 390), button **41** (the 1440 pill column's box), copyright **39** (390 binds; 216 at 1440), the name (`IDENTITY_CHARS.footer.title`) **31** (390 binds; 48 / 66 at the wider two). The ring is not drawn, so `who.seal` reads *unseen* and `IDENTITY_CHARS.footer.seal` keeps its fallback, unread. `reach.mjs 7` finds no footer-owned or identity read, so no `in` row moved.
- **Proofs:** `inline-probe --cat footer` at 1440 and 768: PASS (11 slots hit: eight link labels, the button, the copyright and the statement; 4 unhit, the monogram's two words, the name and the credit, which are not footer slots), no `INLINE_OFF` row. `photo-probe` PASS (the section reads no photograph). `focus-probe --prime --check`: 20 controls, 0 failing, both widths. Live: eight links carry `#bio` … `#testimonials`, the Book pill `#form`; the canvas carries no href. The two-server digest (HEAD `693ff56`, confirmed by `grep -c HeadlinerFooter` = 0 on the old tree): themes 0-5 and 7, 6 of 1008 differ, all theme 7's footer; theme 6's 66 of 144 are 0.1 px Figtree noise (a comment line added to `EncoreBuilder.jsx` brought the diff to 0 against the old tree; see the plan). States: statement, button, links emptied and the seal hidden (the section is the name and the small print, 196.64 at 390), a 31-letter name at 390 (wraps in the word, no overflow), a one-word name.

