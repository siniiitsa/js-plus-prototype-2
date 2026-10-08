# The pricing section — working notes

Moved word for word out of `CLAUDE.md`'s *Intentional limits — not bugs* on 2026-09-30, so it
loads only when a session works on it. "Above" and "below" may point into `CLAUDE.md` or
another `notes/` file.

- **The pricing cards filter, in the published tab only.** The Solo / Trio / Band selector was a
  constant (`TIER_MODES`, gone) over a hardcoded three cards; the packages are now the artist's
  (`FIELDS.pricing.tiers`, below) and the chip row is **derived from their tags** by the same
  `repChips()` the repertoire uses — so the seeds' tags are what redraw the frame's three modes.
  **The row carries no `All`** (JP-089, user call, 2026-10-05, reversing "the extra `All` chip …
  is the intended diff" and `../plans/editorial/qa-fixes.md` JP-089 decision 2A): no pricing
  frame on any template draws one, so `vm.tierChips` is `repChips()` with its `REP_ALL` head
  sliced off, at layouts 1 and 3 alike, where the repertoire's row keeps it (its frames draw it).
  At rest **no chip is lit and every package is on show** (`chip` starts at **-1**, not the form
  chip's 0: "every package" is the useful rest here, where the form's chip is a choice the
  visitor must make). A press lights a chip and filters to its packages, and a press on the lit
  chip clears it, the gallery tile's *second click resets*. The canvas pins -1. The frames' lit
  chip (*Club Night* at layout 1, *Duo* at layout 3) over every card is the one named diff left:
  a lit chip that filters nothing would mislead on the published page. **Layout 3 seeds its own tags** (JP-070, user call,
  2026-09-29, reversing the "one tag list for every layout" reply): its frames' capsule reads Duo /
  Trio / Band where Retro's layout 1 reads Solo / Trio / Band, so with `tiers` absent, `sectionVm`
  and `tiersVal` both read `TIERS_3` at `d === 2`. That is `TIERS` with *Solo* → *Duo* and nothing
  else, so `pageTiers()` (name and price alone) keeps `TIERS`. **Lime's, Grunge's and Editorial's
  layout 1 seeds its own tags too** (JP-089, user call, 2026-09-30, reversing Lime layout 1's inherited seed):
  their frames' row reads *Private Event / Club Night / Festival* and their cards print no tags, so
  at `d === 0` under those three templates an absent key is `TIERS_1`, one occasion per package in
  the frame's order. **Pop's layout 1 joined them** (its layout-1 pass,
  section 7, 2026-10-02): its frame's row reads the same three, so `tiersSeed` named `'Pop'` beside
  `limeTreeTheme()` until Pop's layout-4 sweep widened `limeTreeTheme()` itself and the seed
  became the group alone. Retro's
  layout 1 keeps `TIERS`. Both callers go
  through **`tiersSeed(themeName, d)`** in `data.js`, so `sectionVm` and `tiersVal` resolve one
  expression rather than two mirrored ones. The frame's lit *Club Night* is not reproduced (above).
  The gate is `FORM_FIELDS_4`'s, the
  absent key alone: once the artist edits the list it is theirs at every layout, Duo and all. The row is **not rendered at one chip**: a page whose
  packages carry no tags, or one tag between them, has little or nothing to filter, which is the
  pager's rule (JP-089 chose it over a lone toggling chip; before it, one tag drew *All · tag*).
  `active` is clamped against the row, and is -1 whenever the row is not drawn, so a republish
  down to one tag cannot leave a filter on that nothing on the page clears; the card **keys on the package's index in the whole
  list** (`t.n`) rather than on its place in the filtered one: the card cross-fades its
  background, so a positional key would hand a filtered-out card's node to its neighbour and
  animate one card hue into another. The tilt and the mobile overlap take the *rendered* index
  instead — they are decoration, and the deck has to read as a deck at any count. The hue is
  computed over the whole list in `sectionVm`, the gigs' rule. The empty state is one message where
  the repertoire's is two — every chip exists because some package carries its tag, so a
  filter here cannot empty a list that has anything in it; there is no search box to do what the
  repertoire's does. Three columns stay three columns:
  a fourth package wraps to a second row rather than squeezing the first three. The card's Book
  pill takes `vm.tierBookTo`, which is `vm.bookTo` **minus `pricing` itself** — `CTA_TARGETS.book`
  ends there, so the pill would otherwise scroll the visitor to the section they are reading; with
  neither a form nor a calendar on the page it resolves to nothing and `BookPill` stays a span.
  Its label is **`rowCta`**, the *Package button*, at layouts 1, 3 and 4 (JP-070, user call,
  2026-09-28; it had been layout 4's alone, and the other two printed the unfielded `cta1`). Like
  `FORM_BTN_4`, it seeds per layout: `vm.tierRowCta` is "Book Now", "Book" or "Start Enquiry"
  (`PRICING_ROW_CTA_3`, `PRICING_ROW_CTA`), resolved in `sectionVm` and `EditPanel`'s chain. An
  emptied label drops the pill at all three layouts. A long one wraps rather than widening the
  page, as layout 2's plan card pill (its own `cta`) does. **Editorial's layout-1 deck fits the
  label first** (user call, 2026-10-05, `plans/editorial/display-face.md` step 4): Gloock set the
  seeded BOOK NOW 104.8 wide at 768, where the frame's Fisterra is 88, so the pill needed 186.8
  in a 182.7 card and the seed wrapped. The label is now `min(list, max(12px, room / ems))`.
  The room is the card's content box, the pill's wrapper being the `inline-size` container, less
  BookPill's 82 of padding, gap and disc (× 0.82 on the canvas). The ems are
  `vm.tierRowCtaEms`, `navFace` of the label. It wraps only below 12px. The seed sets at 17.06
  at 768, and 1440 and 390 keep the ramp.
  **Everything in this paragraph from "The row is *not* rendered at one chip" on is the deck's**
  — layout 1's and, where it says the same thing, layout 3's: layout 2 is a single big plan, and
  its chip row names the
  **packages** rather than their tags — one chip each, the card showing the one selected, so the
  design cannot strand every package but the first. It is the same `chip` state, the same `s.live` gate and the same clamp,
  floored at 0 (layout 1's rest is -1), and the canvas pins 0, where the frame draws chip 0 filled;
  what it is not is a filter,
  which leaves `vm.tierChips` reaching layouts 1 and 3 (`FIELDS.media.soundcloud`'s case again —
  the field's hint says which layouts read the tags). Its card is painted from **`vm.tierHero`**,
  not from the selected package: the hue belongs to the seat, the media player's fan rule, or one
  card would recolour on every toggle. All three layouts' colours now come out of one
  `tierHues()` in `sectionVm`. Layout 2 also has no grain — its frame carries none — and it is
  what made **`BookPill`'s flat branch honour `bg`/`fg`** (defaulting to the accent pair): a pill
  standing on a card in the accent hue was invisible on Pop, in layout 1 as well as layout 2.
  That branch went with the flat family in Pop's layout-1 sweep, once Pop took the Lime pill at
  every layout.
  The card's pill is labelled by `cta` (`vm.pricingCta`, uncased) with `note`
  (`vm.pricingNote`) beside it and stacked under it at 390, in Retro's card, Lime's, Grunge's,
  Editorial's and Pop's alike
  (JP-036: Lime's pill took no label and printed the section's static `cta1`, "Book Now", where
  its frame reads the same "Enquire about a date"); an emptied label drops the pill, an emptied
  line its span, and both the row. The picked chip is redrawn in `sem/active` under Lime and
  Grunge, whose frames' pick is the card's own colour; Editorial's frame draws its pick visibly,
  a `tag/1/bg` fill in the idle chips' ring, so it is followed rather than redrawn. Pop's frame
  draws it the same way, but its label stays the idle chips' lime on the yellow fill (1.15 : 1),
  so Pop follows the fill and ring and re-inks the picked label to the tag's own ink, black
  (user call, 2026-10-05).
  **Layout 3 is a stack of full-width rows on the page ground**, and it filters as layout 1 does
  — the same `chip`, in the frame's segmented capsule instead of a loose chip row — but what it
  adds is a **seat that the filter moves**: one row *on show* is filled in `vm.tierRow`'s
  hue where the others are merely outlined in it, and carries the frame's FEATURED badge. It is
  the package the artist **ticked Featured** (JP-048, user call, 2026-09-24: a raw checkbox per
  `TiersField` row, the *Start fresh* precedent, acting as a radio that can be emptied —
  `vm.tiers[].featured`, not in `TIER_KEYS`, so `blankRow` ignores it) while the filter leaves
  it on show, and otherwise the last row on show — so the seed, which ticks nothing, keeps its
  picture, and hiding the ticked or the last package promotes whatever now ends the stack,
  though never onto a package the artist added and left empty, since `sectionVm` drops those
  first (JP-048, below). Layout 1's glow reads no tick and stays positional. That is the deck's own
  rule that the tilt and the mobile overlap take the **rendered** index while `t.n` keys the
  card, and it is not drawn at one row. `vm.tierRow` is `tierHero`'s shape with one extra
  constraint — it has to read against the **page** rather than on a card, so it walks `T.tags`
  from the frame's own index to the first hue that clears `tierHues`' 0.22 against `bg`, since a tag
  can be the page ground itself (Grunge's fourth was its black, before Static Youth left it two tags). Its selector is the one thing in that branch
  not standing on the page ground, so its outline and idle labels take `paperFg` and not `tx`.
  Its head's line is **`FIELDS.pricing.intro`**, `in: [2]`, seeded **`PRICING_INTRO_3`**, the
  frame's paragraph without its first sentence (JP-070, user call, 2026-09-29): "Four ways to book
  this act." counts packages the artist never typed, and the frame itself draws three.
  Beside it stands the frame's "Save 15% on bundles", **`FIELDS.pricing.offer`** (JP-046, user
  call, 2026-09-24; the fit had dropped it as a discount no field states): seeded with the
  frame's copy, emptiable, `in: [2]`, in every template's block, and the capsule's row stands
  on either half — an offer is not a filter, so it outlives a page whose packages carry no tags.
  **Lime's, Grunge's, Editorial's and Pop's stacks read no `vm.tierRow`**: Lime's frame outlines
  the rows in the accent and fills the moving seat with it, ringed and lettered in the page ink,
  Grunge's names Scheme 3's own three literals, Editorial's dashes its square paper rows 10,
  10 in the seat's terracotta and paints the moving seat off `s.onScheme[3]` — ink dashed blush,
  a terracotta numeral — and Pop's rings its white rows in lime and paints the seat off
  `s.onScheme[2]` (below), so the walk (which reaches pale lime under Lime and the page's own
  black under Grunge) is Retro's alone; the seat still moves exactly as above, every leaf of
  it read off the nested scheme wherever the filter stands it. The four templates' capsule
  draws the frame's own pick (`sem/text/1` under `sem/bg`), not layout 2's redraw.
  **Layout 4 filters nothing at all**: it is a stack of service rows on the page ground, the one
  pricing design with no chip row, no state and no control but the Book pill, so `chip` is
  untouched there. One row per package, divided by a 4px rule in **`vm.tierRow.card`** — layout
  3's own seat, reused because a rule has that outline's job of reading against the page (under
  Lime the rule is `s.ac` read directly, layout 3's `tierRow`-not-read rule, and under Grunge
  `s.stroke2`, `#FF0000`, in the same widened block; an inset shadow
  rather than a border so the frame's row height holds; under Editorial it is 1px of
  `s.stroke2` terracotta dashed 10, 10, a `DashRule` on the row, and the tag chips' leaked
  hairline is dropped, invisible on paper; under Pop it is Grunge's 4px `s.stroke2`, lime, and the
  hairline is dropped as Editorial's, invisible on white) — and
  that rule is the one thing in the branch that **bleeds**: the row cancels the root's padding and
  puts the identical value straight back, so the border reaches the page edges and the content
  keeps the section's column, which is the frame's 56 / 30 / 10 inset because `padX` is now that
  inset on every section and layout (JP-038, user call, 2026-09-24; the layout-4-only arm it
  replaced is gone), the footer included. It is
  the first pricing layout to draw **no heading at all**, so `heading` reaches layouts 1, 2 and 3
  alone; and the only one to read a package's **tags and its features together** — the tags as the
  frame's small hairline chips, cased in `sectionVm` as `vm.tiers[].tagLabels` because `t.tags`
  stays raw for the filter matching, and the features as its coloured ones, one per feature over
  **`vm.tierFeatSeats`** (`vm.chips`' construction, a seat per index rather than a hue per
  feature; under Lime the seats are the layout-4 header's own chip pair, `s.box1` / `s.ac` by
  parity, inlined in the block, and under Editorial `s.onScheme[1].chips` by parity, blush and
  terracotta, the pair the frame names outright, and under Pop its first four seats **by index**,
  lime / pink / blue / teal, since the frame binds `scheme/1/tag1–4` and re-seats a row's pills by
  each label's place in its chip row). `unit` moves with it: nothing prints a suffix after the price here, so **`vm.tierKind`**
  — the unit with its leading slash dropped — stands above the numeral where the frame writes
  SET / PROJECT, which is one section-wide word against the frame's different one per row.
  **Under Editorial the name and the numeral are `faced`** (Display/SM through `faced` /
  `facedLh`, Grunge's arm; `plans/editorial/display-face.md` step 4, layout 4, user call,
  2026-10-06): the frame states Fisterra there, and raw, Gloock's taller cap set THE HOUSE PARTY
  and THE WEDDING SET on two lines in the 1440 name's 335.4. Faced they are 326.3 and 333.7 on
  one. The numeral is lifted 0.045em (Noto took 0.07). **Under Pop** they are Titan, `faced`
  and upper, the name and the numeral lifted 0.14em and the kind 0.1em, the price column's floor
  225 (`plans/pop/layout-4.md`, section 7).
- **Layout 2's two labels are the artist's** (JP-095 (a), user call, 2026-10-01, the label shape of
  JP-071 and JP-090): `kicker`, the `[ PRICING ]` over the heading, and `featsLabel`, the
  `WHAT’S INCLUDED` over the plan card's features, both `in: [1]` and read by both bodies. They are
  seeded `PRICING_KICKER` and `PRICING_FEATS_LABEL` in the capitals the frame types (`964:64610`'s
  text layers are named so), and printed as typed: the sites carry no casing, so none was added, and the seed is
  the rendered bytes, curly apostrophe included. The brackets are the markup's. Emptied, each is
  not drawn; the features label still stands only while the package has features. A long one
  wraps.
- **Pop's layout-1 deck is three seats** (its layout-1 pass, section 7, 2026-10-02): by rendered
  index, Retro's tilt rule and Retro's angles (`TILT`, CSS +1 / −3 / +2), each seat a card ground
  off `s.onScheme[6]` / `[2]` / `[3]` with its own inks and Book pill pair, and the middle seat
  (`i % 3 === 1`, Lime's glow seat) carrying the starburst — so a filter moves colour, lean and
  burst onto whatever stands in each column, and one card on show is violet and unburst. The
  small print is the frame's one bound paint, `sem/text/1`, resolved in Pop's mode (`s.ac`). The
  rings and the 10px blue rule stand in a root-size layer that clips, and the root itself clips
  sideways (`popClip`, `overflow-x: clip`): a leant card's scrollable overflow is its whole
  overflow rectangle turned, burst included, which ran 21 past the published 390 page.
- **Pop's layout-2 plan card is a nested Scheme 7 and leans** (its layout-2 pass, section 6,
  2026-10-05): Lime's block, widened, reads the card's coral ground, lime ring, lime amount and
  `+`s and the pill's pair off `s.onScheme[7]`, while the head stays on the section's Scheme 1.
  The card turns CSS +3° at 1440 and 768 and +1° at 390 inside a slot-sized flex-column wrapper,
  with `w·sin θ / 2` of margin above and below (a percentage, which reads the wrapper's width):
  every master spaces it by its rotated box, so the row is that box's height. The published page
  needs no clip for it — the turned corners stay inside 768 and 390. The root's own 1px pink ring
  is drawn at 768 and 390 only, as the masters draw it.
- **Pop's layout-3 stack is Lime's geometry in Editorial's bindings** (its layout-3 pass, section
  7, 2026-10-07): the widened block's fourth `G` arm keeps Lime's 50 corner, 38 padding and 240
  tablet includes panel, outlines a plain row in `s.stroke2` (lime) on the white page, and reads
  every leaf of the moving FEATURED seat off `s.onScheme[2]` wherever the filter stands it — the
  row's `sem/bg` lime (not the Scheme 2 card's `box/1`), a pink ring, violet inks, a pink numeral,
  a `#D7FF23` badge lettered violet and a pink pill round a lime label and disc. The plain row's
  pill passes `s.ac` (`G.pillBg`), since `BookPill`'s default `pillBg` is black on Pop's Scheme 1.
  The root's 1px pink ring is drawn at every width (layout 2's was narrow only). The heading is
  lifted 0.1em and the numeral 0.14em; the names, at lh 1.2, are left.
