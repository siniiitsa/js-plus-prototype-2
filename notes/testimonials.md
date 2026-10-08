# The testimonials — working notes

Moved word for word out of `CLAUDE.md`'s *Intentional limits — not bugs* on 2026-09-30, so it
loads only when a session works on it. "Above" and "below" may point into `CLAUDE.md` or
another `notes/` file.

- **The testimonials carousel pages, in the published tab only, and the reviews are the
  artist's.** It was the last §10.2 section that was a picture on *both* sides: its two arrows
  carried a pointer cursor and no handler, and layout 1 drew `QUOTES[0]` and nothing else, so
  the other two seeded reviews were unreachable. Three flat keys reached that one review —
  `quote`, `who`, `role` — the card's own date line was editable by nothing at all, and no
  field could add a fourth review; `c.quotes` is now a `QuotesField` repeater of
  `{ quote, who, role, when }`, the pricing packages' flattened-key-set case rather than a
  textarea's. `cur` starts at **0**, the enquiry form's chip and pricing's `active`, not the
  `-1` the player's `cur`, the gallery's `pick` and the map's `sel` start at: the frame draws a
  filled card, so the picture *is* a choice. It is clamped against the list — the artist can
  delete the review the visitor is on, and Publish re-renders a tab that is already open — and
  the arrows **wrap at both ends**, the player's rule, so the published page never opens on a
  dead arrow. They are **not rendered at one review**, the pager's and the chip row's rule,
  which is derived from the list and so holds on the canvas too; the desktop row then centres
  the card, because `space-between` with one child would stand it against the gutter. The seed
  carries five — three until layout 3's QA added the bento wall's two named reviews, appended so
  the first card on show is unchanged. Every value on the card is emptiable
  now, so each is rendered or not rather than printed blank — a `col` gap is spent on an empty
  span the same as on a full one — and the attribution is **composed in `sectionVm` as
  `vm.quotes[].byline`**, the calendar's one-composed-line-per-cell rule, or an emptied role
  would print a bare separator. The two pills are still `who` and `role`, the frame's own
  reading of the card, so they repeat the attribution by design; they key **positionally**, both
  strings being the artist's. An emptied list keeps the card, the two backs, the tear and the
  grain and prints pricing's one message inside it: the section is a composition, and a hole
  where the card stands is not one of its states. `vm.quote1` is gone, so the three-up layout's
  `i === 0 ? s.quote1 : q.q` seam goes with it — **every** row is cased now, which is the
  intended diff on a casing theme. There is **no autoplay and no swipe**: both want an effect
  or touch state, and there is none in the file. **The two arrows, their wrapping and the two
  pills are layout 1's**: layout 2 is an editorial feature — a centred display head over one
  wide orange card — and it pages through a **rail of initial tiles** down the card's left,
  one per review, sharing the seam whole rather than growing one: the same `cur`, the same
  clamp, the same pinned 0 on the canvas and the same not-drawn-at-one, which there means the
  card simply takes the whole width. The picked tile is also the **wide** one in the 390 row;
  under Lime and Grunge it widens in the desktop and 768 column as well, where the idle tiles hug their
  padding inside a column pinned at the frame's widest tile, while Retro's column gives every
  tile one fixed width. Under Editorial and Pop no tile is wide: every one fills both axes in
  its frame, so the 390 row divides into equal parts (`flex: 1 1 0`, `minWidth: 'min-content'` so
  it can still wrap) and the column is one width, and the pick is its Scheme 3 fill and a paper
  dash alone under Editorial, and its Scheme 3 pink and 3px violet ring under Pop, whose picked
  tile is not the card (the card is Scheme 2's lime `box/1`). The tile's mark is **`vm.quotes[].mark`**, composed in
  `sectionVm` beside `byline` — the reviewer's initials, or the row's number when the name is
  empty, punctuation spaced out first so "Sarah &amp; Tom" marks the tile `ST` and not `S&`.
  The frame's `★★★★★` is a section field, `stars`, seeded with the frame's copy and printed in
  the card's corner, so `when` has no seat in layout 2; its heading falls back to the frame's
  own two-line "Honest feedback / from people who booked" (`TESTI_HEADING_2`, resolved in
  `sectionVm` and `EditPanel` alike) where the other layouts keep the shared default — under Grunge,
  Editorial and Pop set `pre-wrap`, so the typed break holds, and a long second line wraps at the
  ramp size rather than shrinking to fit (Editorial's three lines at desktop and Pop's at 768,
  where each frame sets two).
  It also draws the section's **head**, which no earlier layout did: `heading` had
  reached the flat tail alone, and `FIELDS.testimonials` gained `sub` and `cta` — a line of
  prose and the centred Book Now pill on `vm.bookTo`, which needs no self-exclusion because
  `testimonials` is not in `CTA_TARGETS.book` (the footer's rule); `sub` since reaches layout
  3 as well, `cta` still layout 2 alone. Layout 2 draws neither the
  grain nor the torn edge: its frame carries no texture at all and stands on the beige page,
  so the root's `cream` flag stays layout 1's, and **layout 3 draws neither either** for the
  same reason. **Layout 3 is a bento wall and the one design here that pages nothing**: it is
  the stat card and then *one card per review*, three to a row and one at 390, so `cur`
  reaches no control at all — the arrows and the rail exist because their layouts draw a
  single card, and a design that shows the whole list owes no pager. Its cards are one
  template whose disc, name and role are each rendered or not, so a review with neither `who`
  nor `role` collapses to the frame's own quote-only cell and nothing the artist typed is
  discarded; two seats are stated (275 leading the first row, 276 trailing the second when it
  is full) and every other cell is `minmax(0, 1fr)`, with rows past the second three equal
  fills. Its stat card is where the frame's claims are re-seated as fields (JP-065, user call,
  2026-09-28, reversing the fit's review count): the big numeral is **`rating`**
  (`vm.testiRating`, seeded `TESTI_RATING` '4.9', uncased, `in: [2]`) beside a literal `/5`, 4
  apart as the frame sets them, and an emptied rating gives the seat back to
  **`s.quotes.length`** with a pluralised unit, 8 apart. `stars` (layout 2's field, now
  `in: [1, 2]`) is printed 12 right of the disc stack, in the frame's `avs` row, while it is
  filled, whatever the rating; each drops alone. The stars take the numeral's ink and `/5` the
  card's, on every frame. The sentence under it is `sub`, the line above the disc stack is
  `s.brand`, and the stack is one `vm.quotes[].mark` per **named** review, so it never invents a
  face for a card the wall itself shows unattributed; the frame's photographs are a named diff,
  and the `®` stays out, a claim no field states. `when` and `cta` have no seat there, which is
  the only content this section's first three layouts do not between them read. **Layout 4 is a wall that pages**: a display head with a pair of arrow discs at
  its right over *one row* of cards — four at 1440, three at 768, one and a peek at 390 — so it
  is the third design to share `cur` whole rather than grow a seam, reading it as the review
  **leading the row** where layouts 1 and 2 read it as the single card on show. The row is one
  card per review as everywhere else; the arrows are derived from the list and **not drawn at
  one page**, which the seeded five never are. The hue is the **seat's** and not the review's, the media player's fan
  rule, and its cost is that the fourth seat (Retro's rust card, Lime's page-ink card,
  Grunge's red one, Editorial's bare paper one, Pop's bare teal one) is
  unreachable at 768 and 390 at any
  count, and needing four reviews at 1440. It is the section's second full-bleed sheet and its
  first mustard one — `s.pillBg` with a `pillFg` head, the enquiry form's layout-2 pair on the
  identical ground; under Lime the sheet is Scheme 4's pale `s.tx` with `s.bg` ink and the head
  `s.dispLg` at every width, and under Grunge there is no sheet at all — Scheme 4 is the page,
  so the widened block paints the page's own black under a red head, and its red fourth cell is
  drawn **without** the outline its neighbours carry, as the frame draws it (a white-15% ring
  on red would be a pink hairline; reversible in one line); and under Editorial the sheet is
  real but the seat's — Scheme 4's terracotta, painted by the root — so the block takes
  Grunge's no-sheet route for the opposite reason, with the head and the discs paper, the
  register written fresh (`box/1` in paper 56%, an ink cell off `s.onScheme[1]` in a terracotta
  ring, `box/1` again, and a bare paper fourth cell, as the frame draws it), every cell square,
  and the head fitted to its widest word at every width — and under Pop the same no-sheet route
  stands on Scheme 4's blue, painted by the root, with the head and the discs teal, a 10px teal
  rule at the sheet's foot at 1440 and 768, the head fitted as Editorial's, the desktop cell 430
  under its two-line head, and the register **four seats, one each** (`SEATS = [0, 1, 2, 3]`):
  Scheme 4's `box/1` lettered yellow, a black cell off `s.onScheme[1]` lettered pink, a pink one
  off `s.onScheme[3]` lettered violet, and a bare teal fourth cell lettered blue, as the frame
  draws it — so the root's `cream` flag stays layout 1's for the fifth time. `when`,
  `sub` and `cta` reach none of it, which leaves `when` a layout-1 column and `cta`
  layout 2 alone.
- **Layout 2's eyebrow is `kicker`** (JP-095 (a), user call, 2026-10-01). It had been the frame's
  literal `✎ What clients say`, an unreported sibling JP-071 kept. Now `kicker` (JP-071's,
  layout 3's `● Testimonials`) reaches layout 2 through a per-layout seed, `testiKickerSeed(d)`:
  `TESTI_KICKER_2` "What clients say" at `d === 1` and `TESTI_KICKER` otherwise. That is
  `mapKickerSeed`'s shape, called by `sectionVm` and by an arm of `EditPanel`'s chain of its own,
  since the map's arm is gated on `map`. The field is `in: [1, 2]`, both bodies. The `✎` is the
  markup's and goes with an emptied word, as layout 3's `●` does. A long one wraps.
