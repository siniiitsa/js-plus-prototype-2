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
  replaced is gone), the footer included. The one exception is layout 3's 390 stack under the
  Lime tree, below. It is
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
- **The `[ PRICING ]` eyebrow is gone** (user call, 2026-11-12). The small bracketed line over layout 2's
  heading (design 1, so layouts 2 and 6 of the picker) was `FIELDS.pricing.kicker` (JP-095 (a)). It is
  deleted with `vm.pricingKicker`, `PRICING_KICKER`, its `INLINE_PART` row and its `reach.mjs` probe,
  as the testimonials' and the bio's labels were. The head is the heading, the quote and the credit
  row. A stored `kicker` on an old page is never read.
- **Layout 2's features label is the artist's** (JP-095 (a), user call, 2026-10-01, the label shape of
  JP-071 and JP-090): `featsLabel`, the `WHAT’S INCLUDED` over the plan card's features, `in: [1]` and
  read by both bodies. It is seeded `PRICING_FEATS_LABEL` in the capitals the frame types (`964:64610`'s
  text layers are named so), and printed as typed: the sites carry no casing, so none was added, and the seed is
  the rendered bytes, curly apostrophe included. Emptied, it is
  not drawn; the features label still stands only while the package has features. A long one
  wraps. **`featsLabel` reaches layout 3 too** (JP-125, user call, 2026-10-09): both bodies print
  it over every package's features, so it is `in: [1, 2]`. Layout 3's FEATURED badge is
  **`FIELDS.pricing.badgeLabel`** (`vm.tierBadge`, seeded `PRICING_BADGE`, `in: [2]`), the same
  shape: printed as typed, and emptied it is not drawn while the featured row keeps its fill,
  ring and inks.
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
- **Layout 3's 390 stack pads 60 / 20 / 60 / 20 under Lime, Grunge, Editorial and Pop** (JP-126,
  user call, 2026-10-09, reversing the layout-3 passes' named diff "390 keeps its 44" and JP-038's
  `padX` 10 for this one section). All four 390 masters stand the head, the capsule, the 350 rows
  and the small print 20 in, 60 from the top and 60 above the foot. `sectionVm`'s layout-3 pricing
  arm sets `vm.padX` to `20px` at mobile, the only section outside `column` to move it, and no
  node in the block reads `padX`. 768 keeps `padY` 56 over its head (JP-103: reported as
  matching), and Retro's own body keeps `padY` / `padX`.
- **Character caps** (session 4 of the character-limits pass, 2026-10-13;
  `plans/char-limits.md`, *Session 4*, and the per-width readout in
  `plans/char-limits/session-4-probe.md`). Every own text key has a `chars` row, and `tiers` has
  `cols` for `name`, `price`, `tags` (item and count), `blurb` and `feats` (item and count). The
  calls to keep:
  - **The price is measured as a price.** `priceParts()` splits it at its first digit, so a long
    price grows in its small tail (*£475 — £1,450 per evening*), and the probe reads it with
    digit-led samples. Prose has no digit and sets whole in the big numeral; that reading (a long
    *Price on application*) is lower. **JP-135 overruled it**: a digit-less price over 8
    characters is `prose` (from `priceParts()`) and wraps in its numeral's seat, a size smaller at
    layouts 2 and 3, instead of running past the card; *POA* and *TBC* stay a numeral. The caps
    did not move. Layout
    1's narrow deck holds 8–14, so the range form the layout-3 frames draw (13) does not fit every
    deck card; layouts 2–4 take 20–35.
  - **A column's floor is the longest seed of any design**, not this design's: the first edit
    stores the seed that was showing, and it then stands at every layout. Under the Lime-tree
    templates a tag chip is therefore 26 at every design (twice *Private Event*, layout 1's), and
    Retro's 12 (its seeds are *Solo*, *Trio*, *Band* and *Duo*). Layout 2 prints no tags and has no
    tag cap.
  - **The features' count is 15 at layouts 1–3 and 5 at layout 4.** One a line, the list grows
    down a hugging card and never broke up to the probe's 16, so it takes the block ceiling of
    three times the seed's five. Layout 4 draws them as a wrapping chip row, and a sixth wraps it.
  - **Floors.** The heading holds its seed's 42 at layouts 1 and 2 where line packing read 39–41.
    The names hold 16 (*The Festival Set*) at Pop's layouts 1 and 2 and at layout 4 under Retro
    and Editorial. The features hold 24 (*Drinks + dinner ambience*) at layout 3 on every template
    and at Retro's layouts 1–2 and Pop's layout 2. Grunge's small print holds 53 at layout 1,
    where the seed already takes two lines at 390.
  - **Editorial's layout-1 Book pill caps at 9**, one past *Book Now*: the deck fits the label by
    its ems (above), so a longer one shrinks at once. A shrink floor for it, as the name has, is
    the user's call.
  - **The leant cards' lines are counted upright** (`scripts/limits.mjs`): Retro's and Pop's
    layout-1 decks and Pop's layout-2 plan card turn, and the probe sets every turned ancestor
    upright while it counts a seat's lines.

- **Long words break and the numeral is capped** (user call, 2026-11-06; `plans/char-limits.md`,
  *Session 4*'s follow-up). Two inputs got past the caps above, which were read with prose and
  digit-led prices: one word with no space (a 160-letter blurb) and a price of digits alone.
  - `WRAP_LONG` in `EncoreSection.jsx` (`overflowWrap: 'anywhere'`) is on the root of each pricing
    layout, Lime tree and Retro both, and inherits to every name, blurb, feature and chip. **Put a
    new pricing layout's root on it too**, or a long word runs past its card again. It is not on
    the numeral (`white-space: nowrap`; the digit-less prose path has its own, JP-135).
  - `cols.price.num` caps the price's first number run (`priceCuts`), the big numeral, apart from
    `chars`, the whole price: **one number per template, the tightest layout's** (JP-168, user call,
    2026-11-11, was per layout: 5 6 12 12 Retro, 10 12 12 12 Lime, …): Retro 5, Lime 10, Grunge 11,
    Editorial 8, Pop 7, so a price typed at layout 2, 3 or 4 is not one the layout-1 deck then cuts.
    `clampNumeral` cuts the run on the page to `num − 1` characters and an **`…`**, which sets in the
    small tail (`priceParts` splits at the first non-number character): it was cut with no mark until
    JP-168, and `£450000000000` read as `£4500000000`, a price 100x smaller. A price stored over it
    (a layout swap, a legacy value) still renders cut, now marked;
    `capExcess` counts it, so `CappedText` refuses an edit past it and the counter reads
    `numeral n / cap`; the inline box reads it on the amount part only (`slotCap`). Not applied to a
    price with no digit. `limits.mjs pricing --keys=tiers.price.num` measures it.

- **A price with no digit is cut where its words start** (JP-156, user call, 2026-10-26;
  `plans/inline-qa-fixes.md`, Session 2). `priceParts()` cuts at the first digit; with none, the
  leading run of characters that are neither letters nor digits is the `lead` (trimmed) and the
  words are the `amount`: `£TBC` is `£` + `TBC`, `$ POA` is `$` + `POA`, drawn as `£650` is (small
  sign, big numeral), and the inline box on the numeral covers `TBC` alone. `TBC`, `POA` and
  `Contact me…` start with a letter, so they have no lead and stand whole, and so does `From £POA`,
  whose sign is not leading (prose after a symbol is left alone, the default taken in the plan).
  `prose` is judged on the amount, so `£Contact me for a custom quote` is still prose, now with a
  small `£` before it. `tail` is empty without a digit. **A price of symbols alone** (`£`, what is
  left when the words are deleted) is all lead with an empty amount, so the next word typed keeps the
  sign: without it, delete-then-type lost the `£` by the same route as the ticket. A lone `—` is cut
  the same way (a small dash, empty numeral).
  **One helper cuts the price: `priceCuts(raw)` in `data.js`**, returning `{ at, end, prose }`
  offsets into the string as given (`[0, at)` the lead's seat, `[at, end)` the amount, `[end, …)` the
  tail's). `priceParts()` reads the three parts off it and `priceWrite()` in `EncoreBuilder.jsx`
  splices a typed part back at the same offsets, keeping the other two as stored; `slotText` and
  `inlineSlots` read `priceParts()`. They drifted once (the write kept a regex of its own and had
  no lead for a no-digit price, so a typed `450` over `£TBC` came back as `450`); do not copy the
  regex into a third place. Not covered, named: a leading bracket or quote (`(TBC)`) is a lead like
  any other symbol run, since the rule assumes no currency.
  Measured at the change: the two-build digest of all five templates' seeded pages moved 0 of 16 files
  (no seed is a symbol without a digit); `limits.mjs pricing --seeds` 0 over their caps and `--check` 0
  failing; `inline-probe --cat pricing --check` PASS on layouts 1 and 4 of all five templates at 1440 and 768.
  A side effect: `£Contact me…` clamped on the page (`£Contac…`) opened nothing on the old cut, since the
  clamp stem was `£`-led; with the `£` in its own node the numeral opens.

## Lattice · layout 1 (plans/lattice/layout-1.md, section 7, 2026-11-19)

Frames `1:915` · `1:9547` · `1:10518`. **A block of its own, `LatticePricing`**, not Lime's: it stands in `Pricing`'s `if (s.limeTree)` **after the seam**, so `chip`,
`active`, `shown` and `pressChip` (the published filter, the Book pills' `tierBookTo`, the `s.live` gate) are the shared ones and come over in `g = { shown, active, pressChip }`.

- **Seats are by the package's place in the WHOLE list** (`t.n`), not by the rendered index (Pop's and Lime's rule): package *n* is on Scheme `[3, 5, 4][n % 3]` (dark `#262626`, orange
  `#ED6D40`, teal `#5C939F`) and prints `[ 0(n+1) ]`, so a filter never recolours a package or renumbers it. The card reads its seat's own pair (`S.bg` ground, `S.tx` ink); the bar is
  the reverse (`S.tx` ground, `S.bg` label), which is what all three frames draw (the dark card's `#F2F2F2` bar under `#262626`, the other two's `#111` bar under the card's colour). The
  dark card's feature rules are `S.tx` at 28%, the other two's solid. The halo is `boxShadow: 0 0 36 S.bg @ 30%`. The section stands on Scheme 8 (`SCHEMES_OF.Lattice` already seats
  pricing there: no row added) and `s.onScheme[n]` supplies the card schemes.
- **Grid**: three columns at 1440 (a fourth wraps), **two at 768 with the last card of an odd count spanning both**, one at 390, 24 apart everywhere; every card `min-height` 520 (x 0.82
  at desktop, where the content is taller), the bar pinned to its foot by `margin-top: auto` over the frame's 22 flow gap. Padding 28 / `24px 21px` / `20px 16px`.
- **The chip row** is a boxed segmented control (1px `s.tx` ring, 3px, 4 in, 40-tall tabs, the lit one `s.activeBg` under `s.activeFg`), at the right of the head at 1440 and under the heading narrow.
  Not drawn at one tag or fewer, wraps inside 342 at 390. **At rest none is lit** (JP-089 stands; the frame lights *Solo*).
- **The price is one run in the display face**, as the frame sets `£450`: the lead, the numeral and a range's tail are inline spans of one size, and a tail wraps at its spaces
  (`£475 — £1,450` reads `£475 —…` at its cap). `limits.mjs` read the earlier small-tail build (a body-face tail on the baseline) as two lines at every width.
- **The unit prints as stored**, `/EVENT` (mono, right of `[ 0N ]`), where the frame prints `/ EVENT`. Printing `/ ` + `vm.tierKind` would take layout 4's `Lattice.0.pricing.unit` ledger row;
  the stored text keeps the slot editable. A call for the user to confirm.
- **Removed / not drawn**: the `[ 006 ] — PRICING` eyebrow (call 1; no field), the frames' lit chip. The frames draw no `Most popular` or `Sold out`: nothing to gate.
- **Glow** is the root's own `radial-gradient(ellipse 60% 55% at 50% 75%, glow 14%, 0 at 70%)` (`s.pr && s.v0 && s.lattice`), which all three frames' `gradientTransform`s reduce to. No `url()`.
- **Caps** (`FIELDS.pricing`, measured with `limits.mjs pricing --themes=5 --designs=0`): `heading` 42 (floor: measured 32, the seed's four lines at 390 are the frame's), `tiers.name` 16 (floor, measured
  15), `tiers.price` 9, `tiers.price.num` **7** (measured 9 / 10 / 12; held to Pop's provisional 7 because the scalar is one number per template, the tightest layout's, and layouts 2-4 are unmeasured),
  `tiers.tags` item 26 and count 3, `tiers.feats` item 24 / count 15, `unit` 29, `rowCta` 34, `sub` 85. Layouts 2-4 stay Pop's rows, copied into explicit `Lattice` rows so no spec reaches Lattice through `specAt`'s fallback.
- `titleWordEms` fits the heading to its measure (`cat === 'pricing'` joins the Lattice list); `vm.pad` 78.72 / 77 / 58 top and foot with the bio's content insets.

## Inline editing (Lattice layout 1, 2026-11-19)

Every field the layout reads is printed, so `INLINE_OFF` has no Lattice pricing row. `inline-probe --theme Lattice --layout 1 --cat pricing --width 1440,768 --check`: PASS, 30 slots hit, 0 UNLEDGERED
(the 6 `off` are the derived `tiers[].tags`, as every template). The price is lead, numeral and tail spans, the `*.0.` slots Lime's block already settled; the unit is a slot on its stored `/event`.

## Inline editing (plans/inline-edit-all.md, Retro layout 2, 2026-10-21)

Layout 2 draws the first plan only: the other tiers' price, blurb and features are *paged* (the chip row is live-only), the
probe's `paged` reading. `reviews` and `rating` (`32 reviews · 4.9 ★`) are `INLINE_PART` rows: the
brackets, the dot and the star are the markup's, the words unique on the page.

## Inline editing (plans/inline-edit-all.md, Retro layout 4, 2026-10-22)

Layout 4 prints a plan's price as one node (`£450`): `price.lead` and `price.amount` are one `*.3.` part row (`pricing.tiers.price`), two slots in a node settled on the click (the tail is empty, so never a slot). **`unit` is ledgered** (`Retro.3.pricing.unit`): the layout drops the leading slash, so the page prints `event` where the field holds `/event`; the box could not lie on the stored text. All three plans are drawn (no paging at this layout).

## Inline editing (plans/inline-edit-all.md, Lime layout 4, 2026-10-22)

The `*.3.` price part row carries over: a price is one node (`£450`), two slots settled on the click, in Bebas Neue (box `line-height` against the content rect flags it in `boxcheck`, harmless). `unit` is ledgered (`Lime.3.pricing.unit`: the page prints `event`, the field holds `/event`).

## Inline editing (plans/inline-edit-all.md, Grunge layout 4, 2026-10-22)

The `*.3.` price part row carries over: a price is one node (`£450`), two slots settled on the click, in Anton (box `line-height` against the content rect flags it in `boxcheck`, harmless). `unit` is ledgered (`Grunge.3.pricing.unit`: the page prints `event`, the field holds `/event`).

## Inline editing (plans/inline-edit-all.md, Editorial layout 4, 2026-10-22)

The `*.3.` price part row carries over: a price is one node (`£450`), two slots settled on the click, in Gloock (400, uppercase; the box `line-height` against the content rect flags it in `boxcheck`, harmless). `unit` is ledgered (`Editorial.3.pricing.unit`: the page prints `event`, the field holds `/event`).

## Inline editing (plans/inline-edit-all.md, Pop layout 4, 2026-10-22)

The `*.3.` price part row carries over: a price is one node (`£450`), two slots settled on the click, in Titan One (400, uppercase; the box `line-height` against the content rect flags it in `boxcheck`, harmless). `unit` is ledgered (`Pop.3.pricing.unit`: the page prints `event`, the field holds `/event`).

## Paperback · layout 1 (plans/paperback/layout-1.md, section 7, 2026-11-21)

Frames `1:2968` · `1:11610` · `1:12793`. An **own tree**, `PaperbackPricing` (`EncoreSection.jsx`, before `Pricing`), dispatched in `Pricing()` **after the seam** (`chip`, `active`, `shown`, `pressChip`, `tierBookTo`, the `s.live` gate) and ahead of nothing else Paperback's: the block gets `g = { shown, active, pressChip }`, so the chip filter and the Book pills are the shared seam's and only the picture is Paperback's. Stage pattern as the map's: `containerType: 'inline-size'`, `u(v) = v/fw*100 cqw` with the frame's px verbatim at all three widths (`PAPER_PRICING`), vertical insets in a child, `vm.pad = '0px <surplus>'` (`EncoreBuilder.jsx`, `cat === 'pricing'`).

- **The page**: a head (the `heading` in Bricolage, fitted to its box by `titleWordEms` × a per-width `fit`, three `PaperbackSparkle`s beside it), a pale-yellow tab pill, a deck of cards (3 columns at desktop, 2 at tablet with an odd last card spanning, 1 at mobile) and the small print in Caveat. Desktop numbers are the frame's at ×.82 (the h2's 63.72 is 77.76 × .82).
- **The cards** are turned by `PAPER_PRICE_TURN[t.n % 3]` (-3, 2, -2 degrees) and seated on lilac / pink (white ink) / cyan by `t.n % 3`: **by position in the stored list, not by tier**, so a filter that hides one card leaves the others their colours. The cyan is the frame's `#1CE8ED` (`PAPER_CYAN`), not the theme's `#A4F6F8`.
- **The price is one run** in the display face (`t.lead`, `t.amount`, `t.tail` as spans of one size, 800, line-height .8). The numeral is `nowrap`; a range's second half wraps at its spaces; a price with no digit (`t.prose`) sets 0.6× the size and wraps anywhere.
- **The badge** (a yellow disc with a white ring and a star, 12 degrees) is drawn on the package at `t.n === 1` only, positional like the card colours. The frame's ring text is not drawn (an open call in the plan).
- **The tabs** draw only while `s.tierChips.length > 1`, and **no tab is lit at rest** (the seam's `chip` starts at -1): the lit tab is ink with white text, and pressing it again clears it.
- **The button** is `PaperbackPill` seeded *Book this set* (`PRICING_ROW_CTA_PAPERBACK`, `fieldSeed` and `vm.tierRowCta`), pinned to the foot of the card.
- **Empty list**: a pale-yellow "No packages yet." row; an emptied `sub` drops the small print; a package with only a name keeps its card and its button.
- **Caps** (`limits.mjs pricing --themes=6 --designs=0 --upright`, `--check`, `--seeds`: 0 failing, 0 seeds over): `heading` 46, `tiers.name` 29, `price` 10, `price.num` 7 (the box measures 9 / 11 / 14, held to Pop's 7 as Lattice's is), `tags` count 3, `feats` item 35 / count 15, `unit` 11, `rowCta` 34, `sub` 80. **`--upright` is new**: a deck turned up to 3 degrees has bounding boxes wider than its lines, and a wide numeral then crossed the name row's box. The flag sets every turned HTML box upright before measuring; without it the price cap read 4, below its seed. Layouts 2–4 stay on Pop's caps.
- **Inline editing**: layout 1 passes whole (30 slots hit, 0 WRONG, 0 UNREACHED, 6 derived `tiers[].tags` ledgered off, at 1440 and 768); layout 4 prints `unit` without its slash, so `Paperback.3.pricing.unit` is ledgered (*derived value*). Pricing has no photo slot: `photo-probe` passes with 0 slots and no `PHOTO_OFF` row.

## Paperback layouts 2–4: the caps (session 12, 2026-11-21, plans/paperback/layout-1.md)

- Layouts 2–4 are still Lime's / Pop's tree in Paperback's tokens. Every cap now has a `Paperback` row (none reads Pop's through `specAt`), measured by `limits.mjs pricing --themes=6 --designs=1,2,3 --upright`, then `--check` (0 failing) and `--seeds` (0 over). **The rule is lower-only and never under the seed:** a number the placeholder card cannot bear came down to what it bears, and one that bore more was left, so no cap rose. Lowered (layouts 2, 3, 4, an index per layout; `–` not read): `tiers.price` [34,25,23] → [25,21,17]; `tiers.name` [16,30,18] → [16,26,18]; `tiers.feats` [24,24,62] → [24,24,57]; `unit` [39,27,51] → [31,23,39]; `reviews` [55,–,–] → [53,–,–]; `rating` [47,–,–] → [44,–,–]; `cta` [27,–,–] → [23,–,–]; `note` [55,–,–] → [54,–,–]; `featsLabel` [68,55,–] → [61,51,–]; `sub` [67,63,67] → [53,53,53].
- **Rough edges (the seed is wider than the card holds a prose line of its length):** `sub` L2-4 (53, 51), `tiers.feats` L2 and L3 (24 against 22 / 19), `tiers.tags` L2 (the card draws one chip). The cap holds at the seed, `--check` reads it as `(floor)`, and the card draws the seed as it does at the other templates. A layout-2–4 pass with frames replaces all of these.

## Headliner · layout 1 (plans/headliner/layout-1.md, section 7, 2026-11-23)

Frames `1:5067` · `1:15838` · `1:16888` (1152 / 1556 / 2112 tall). An **own tree**, `HeadlinerPricing` (`EncoreSection.jsx`, before `Pricing`), dispatched in `Pricing()`'s `if (s.limeTree)` **after the seam**, ahead of Lattice's and Paperback's, handed `g = { shown, active, pressChip }`, so the chip filter, `tierBookTo` and the `s.live` gate are the shared seam's and only the picture is Headliner's. The stage pattern as the map's: `containerType: 'inline-size'`, `u(v)` in cqw with the frame's px verbatim at all three widths (`HEADLINER_PRICING`), vertical insets (96 / 77 / 58) in a child, `vm.pad = '0px <surplus>'` and `vm.titleWordEms` (`antonEms(w, -0.005)`, against `free`, the room the tabs leave: 1078.28 / 451.97 / 342) both extended to `pricing` in `EncoreBuilder.jsx`.

- **The page**: a sand band (Scheme 1, the root's own ground, no card margin) holding a head, three flat square cards and the small print on a 40 gap. **Nothing is centred in a taller box** (96 + 960.016 + 96; 77 + 1401.969 + 77; 58 + 1996.109 + 58). Measured against the frames with the seeds (desktop divided by the stage's 1180 / 1440 scale): the section 1555.94 / 2112.1 against 1556 / 2112, the head, tabs, grid, cards, lists, buttons and small print within a tenth at 768 and 390, and at 1440 within 1.25 (six 1 px rules a card list, unscaled on the canvas, the repertoire's reading).
- **The head** is the gallery's rule: two lines at the middle word (`ceil(n / 2)`, the space kept before the `<br>`), Anton 123.84 / 77 / 50, lh .98, -0.005em, `s.activeFg`. The frame's two `<p>`s are also a measure's break (the left column hugs `Night's set`), but only at that exact width, so the forced break is the robust one. **The head's siblings are the left column and the tab list, no empty box**: the tabs stand at the head box's foot (`flex-end`) at the right edge at 1440 and 768, under the heading on a 24 gap at 390. The eyebrow's 31.75 stays as padding (the pricing has no `kicker`). An emptied or whitespace-only heading draws no `<h2>` and the tabs keep their seat.
- **The tabs** (draw only while `s.tierChips.length > 1`, and **no tab is lit at rest**, JP-089: the frame lights `Solo`, which would filter nothing here): 44-tall outlined pills on a 6 gap, Anton 16, padding 22, the lit one `#1E1E1E` (`s.text1`) with sand type; a second press clears it (`pressChip(i, active)`). Widths 76.6 / 72.6 / 78.6 are the frame's.
- **The cards**: `min-height: 540` at every width (what fixes the narrow frames: 540 x 3 + 28 x 2 = 1676; 1116 = 540 + 36 + 540), the 1440 frame being its natural 582.219 (28 + 18.875 + 20 + 109.75 + 20 + 50.594 + 20 + a 221 list + 20 + 46 + 28). **The list is `flex: 1`** closed by its own foot rule, so a four-row card stands the five-row one's 221 and, at 768 / 390, takes what 540 leaves (228.891 / 265.016; 254.188 on the spanning card); a package with no features keeps the rule alone. Padding 28 / `24 21` / `20 16`; the deck is three columns on a 16 gap at 1440, two on a 16 / 36 gap at 768 **with the odd last card spanning both** (the frame's third card), one on a 28 gap at 390.
- **The fills are by the package's place in the stored list (`t.n % 3`)**, not by state: orange `#F85E34` (`O[1].activeBg`) with ink `#020202`, maroon `#760000` (`O[3].bg`) with sand `#EEE3D1` (rows `HL_MEDIA_LIT` `#f4f4f4`), teal `#3B758B` (`O[6].bg`) with sand. A filter that hides one card leaves the others their fills (walked: Band shows maroon and teal). **The frame draws no Featured mark on the middle card**, so none is drawn and `Featured` is read by nothing here.
- **A card**: the name Anton 18 (lh 1.05, .02em) beside `s.tierUnit` Anton 14 at .75 (non-shrinking and `nowrap`, so a long name wraps before the unit does); the price one run in the display face at 112 / 69 / 45 (lh .98, -0.005em; `t.lead` / `t.amount` / `t.tail` spans of one size, the numeral `nowrap`, a digit-less price 0.6x and wrapping anywhere); the blurb Fraunces Headliner 300 at 22 / 22 / 20 (lh 1.15, -0.015em); rows 44 tall (a 1 px rule, 11 padding, an Inter Tight 16 feature at lh 21 and an Anton 14 `01..` numeral flush right; a long feature wraps and the row grows); the Book button `HeadlinerPill` with `bg` / `ink` overridden per seat (black on orange with sand type, orange on maroon with `#020202`, sand on teal with `#1E1E1E`), pinned after a 20 gap. **`HeadlinerPill` gained optional `bg` and `ink` props** (defaults the orange it always was; the header, the menu and the media's Soundcloud button read it unchanged).
- **Seeds**: the frame's head (`PRICING_HEADING_HEADLINER`, `Pick your night's set`, where the shared seed is the Retro / Lime sentence) and button (`PRICING_ROW_CTA_PAPERBACK`, `Book this set`, now read by Headliner too) are seeded per template at layout 1, in `sectionVm` and `fieldSeed` alike; the unit (`/event`, the frame `/ event`) and the small print (the seed's Oxford comma) are the shared seeds'. `tiersSeed` returns `TIERS` for Headliner (Solo / Trio / Band: the frame's tabs; the frame's three cards are the seeded three).
- **Empty list** draws an orange "No packages yet." bar; an emptied `sub` drops the small print.
- **Caps** (`limits.mjs pricing --themes=7 --designs=0`, then `--check` and `--seeds`: 0 failing, 0 seeds over): `heading` **24** (42 / 36 / 24), `tiers.name` **32** (41 / 32 / 32), `price` **6** (6 / 10 / 16), `price.num` **6** (held at the 1440 box, under Pop's 7), `tags` count **3** (the seed's floor: the probe reads 13 / 7 / 1, a long prose chip wrapping the row, and the row is the union of every package's), `feats` item **40** (51 / 40 / 41) with count 15, `unit` **16** (16 / 50 / 50), `rowCta` **39** (50 / 40 / 39), `sub` 67 (the shared `'*'` row), `tags` item and `blurb` the shared rows (26 and 160). Layouts 2-4 are Grunge's rows, written out.
- **Ledgers**: none written. `inline-probe --theme Headliner --layout 1 --cat pricing --width 1440,768 --check` passes with 30 slots hit and the 6 derived `tiers[].tags` slots ledgered off by the shared `*.*.` row; `photo-probe` has no slot to hit (the layout-1 pricing reads no photograph).

## Backline · layout 1 (the ninth template; plans/backline/layout-1.md, section 7, 2026-11-25)

`BacklinePricing` (`EncoreSection.jsx`; 1:6322 · 1:18100 · 1:19431) is a block of its own, dispatched in `Pricing()` after the seam, ahead of
Headliner's line. It is handed `g = { shown, active, pressChip }`, so the chip filter, `tierBookTo` and the `s.live` gate are the shared
seam's. The stage pattern: `BACKLINE_PRICING`, an `inline-size` container, the frame's px in `cqw` at all three widths. Rendered heights:
1135.3 / 1595 / 2196.4 against 1135.38 / 1595 / 2196.50.

- **The band** is Scheme 1's paper (the pricing has no `SCHEMES_OF.Backline` row) with paper grain, under a **moss torn head** (the map's
  ground) drawn 1 above the band. It takes `tone="paper"` although it is not paper: the master's fibres read about 230 against the body's
  130, which is the .8 fringe, where the dark tone's .27 would read about 162. The narrow widths draw the 1440 contour cropped from the left.
- **The head** is TT2020 at 77.76 / 48 / 38 on an `8.205em` measure, which reproduces all three masters' breaks, with the **last two
  words olive** (the media's rule: three or more words). It is fitted by `vm.titleWordEms` (`ttEms`). The seed is the frame's, with its
  full stop (`PRICING_HEADING_BACKLINE`, in `sectionVm` and `fieldSeed`).
- **The tabs** are 44-tall 1 px ink boxes (padding 19.75, overlapping by 1.5), at the head's foot-right at 1440 and 768 and under the head
  at 390. **At rest none is lit** (JP-089), though the frame lights Solo. A lit one is ink with cream type. **The list wraps, and where it
  cannot stand beside the head it drops under it whole.** The first build was one `nowrap` line like the frame's: with six tags it squeezed
  the head to 13 px (36 lines) at 768 and clipped tabs off the 390 page, and even the three occasions other templates seed gave the 768
  head a fourth line. Every box is pulled 1.5 up and left inside a 1.5 pad, so wrapped rows share a hairline as neighbours do. Walked at three
  widths with 2, 3, 6 and 9 tags up to the cap: every tab inside the page and clickable, the head three lines.
- **The cards**: three columns at 1440, two at 768 with an odd last card spanning both, one at 390, on a 24 gap. A card is **560 tall as a
  minimum** at every width, with four **14 px bites** (`blNotchMask`; the other tickets use 12) and the frame's two shadows on the turned
  wrapper (`drop-shadow` 12 / 16 and 1 / 1 at .2, at every width; its third value is the SVG filter's standard deviation, checked on a
  blank page: `drop-shadow(0 12px 16px)` and the filter at `stdDeviation` 16 read the same alpha at seven points under a box, and 32px does
  not).
- **The ground, turn and tape go by the package's place in the whole stored list (`t.n % 3`)**, so a filter moves nothing: dark olive
  (`BL_PRICE_DARK` `#38391C`, sampled; the nearest seat, Scheme 2's tag 3, is `#363719`) turned -1.2, mustard (`O[4].bg`) +0.8, moss
  (`O[3].bg`) -0.6. **The tape is on the middle seat.** It follows the seat, not the Featured tick: layout 1 reads no tick (JP-048).
- **Grain**: mustard and moss take the kit's own `GRAIN_OPACITY`, the dark card .29. **Compare crops, not the sd.** Raising the opacities
  until the sd matched the frame's 4.6 drew separate dark speckles the frame does not have, because the kit's tile is spottier than the
  frame's fine mottle.
- **Inside**: the package's name alone in the 14 px top row (the frame's `ADMIT ONE ·` and `NO. 00N` are not drawn, call 1 A; the row is
  kept when the name is empty). Then the price as one run in TT2020 at 96 / 60 / 38 (lead, numeral and tail; a price with no digit sets at
  .6), the blurb, and the features each led by a **drawn cross** (11 px, the text at 19; TT2020 has none) between dashed rules. The list takes the card's spare
  height and closes with its own rule. The foot holds the Book pill (166 × 46; `Book this set`, Paperback's and Headliner's seed; the
  button's ground is cream on the dark card and ink on the others), the frame's 1.3 px centre dot and the 90 × 30 barcode
  (`BacklinePriceBars`, 23 bars; ornament).
- **The price unit is not drawn at layout 1.** No master prints one, and its only seat would be `NO. 00N`'s. `FIELDS.pricing.unit` gained
  `in: { Backline: [1, 2, 3], '*': [0, 1, 2, 3] }`; layouts 2-4, the placeholders, still print it.
- **The small print** is `sub`, with the frame's `* ` in an `aria-hidden` span of its own, so the slot's node prints exactly the field. It
  drops with the field.
- **Caps** (`limits.mjs pricing --themes=8 --designs=0 --upright`; `--check` 0 failing, `--seeds` 0 over): `heading` 45, `tiers.name` 43,
  `price` 7 (`num` 7), `feats` 34, `rowCta` 40, `sub` 81, three tags a package (`count` needed a Backline row, or `'*'`'s 4 wins over the
  Pop fallback). The blurb (160) and the feature count (15) hold. Layouts 2-4 are Pop's numbers.
- **Data**: `reach.mjs 8` over pricing (the scratch copy, `ONLY=pricing`, 2,160 renders) held `rowCta` (layouts 1, 3, 4) and moved no
  pricing row; it has no `unit`, `heading` or `sub` probe. `INLINE_OFF` gains nothing (the generic `tiers[].tags` row covers the six tag
  slots). There is no photo slot.
- **Proofs** (layout 1, `--width 1440,768`): `inline-probe --cat pricing --check` PASS (29 slots hit, 0 WRONG / NOT-RESTORED / MISSING /
  UNREACHED, 0 dead click); `focus-probe --cat pricing --prime --check` PASS (35 controls, 0 failing); a live walk at all three widths (a
  tab filters and a second press resets, each card keeps its ground and turn, the pills link to `#form`; the canvas has no link and
  ignores a press; one tag draws no tabs; an empty list says `No packages yet.`; prose and over-long values clamp or wrap with no sideways
  scroll).
