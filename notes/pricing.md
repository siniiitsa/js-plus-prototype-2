# The pricing section — working notes

Moved word for word out of `CLAUDE.md`'s *Intentional limits — not bugs* on 2026-09-30, so it
loads only when a session works on it. "Above" and "below" may point into `CLAUDE.md` or
another `notes/` file.

- **The pricing cards filter, in the published tab only.** The Solo / Trio / Band selector was a
  constant (`TIER_MODES`, gone) over a hardcoded three cards; the packages are now the artist's
  (`FIELDS.pricing.tiers`, below) and the chip row is **derived from their tags** by the same
  `repChips()` the repertoire uses, `REP_ALL` chip and all — so the seeds' tags are what redraw
  the frame's three modes, behind an `All`. **Layout 3 seeds its own tags** (JP-070, user call,
  2026-09-29, reversing the "one tag list for every layout" reply): its frames' capsule reads Duo /
  Trio / Band where Retro's layout 1 reads Solo / Trio / Band, so with `tiers` absent, `sectionVm`
  and `tiersVal` both read `TIERS_3` at `d === 2`. That is `TIERS` with *Solo* → *Duo* and nothing
  else, so `pageTiers()` (name and price alone) keeps `TIERS`. The gate is `FORM_FIELDS_4`'s, the
  absent key alone: once the artist edits the list it is theirs at every layout, Duo and all. The row is **not rendered at one chip**: a page whose
  packages carry no tags has nothing to filter, which is the pager's rule, and the extra `All`
  chip on the reference picture is the intended diff. `active` is clamped against the row, the
  canvas pins chip 0 and filters nothing, and the card **keys on the package's index in the whole
  list** (`t.n`) rather than on its place in the filtered one: the card cross-fades its
  background, so a positional key would hand a filtered-out card's node to its neighbour and
  animate one card hue into another. The tilt and the mobile overlap take the *rendered* index
  instead — they are decoration, and the deck has to read as a deck at any count. The hue is
  computed over the whole list in `sectionVm`, the gigs' rule. The empty state is one message where
  the repertoire's is two — every chip but `All` exists because some package carries its tag, so a
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
  page, as layout 2's plan card pill (its own `cta`) does.
  **Everything in this paragraph from "The row is *not* rendered at one chip" on is the deck's**
  — layout 1's and, where it says the same thing, layout 3's: layout 2 is a single big plan, and
  its chip row names the
  **packages** rather than their tags — one chip each, the card showing the one selected, so the
  design cannot strand every package but the first. It is the same `chip` state, the same
  `s.live` gate, the same clamp and the same pinned 0 on the canvas; what it is not is a filter,
  which leaves `vm.tierChips` reaching layouts 1 and 3 (`FIELDS.media.soundcloud`'s case again —
  the field's hint says which layouts read the tags). Its card is painted from **`vm.tierHero`**,
  not from the selected package: the hue belongs to the seat, the media player's fan rule, or one
  card would recolour on every toggle. All three layouts' colours now come out of one
  `tierHues()` in `sectionVm`. Layout 2 also has no grain — its frame carries none — and it is
  what made **`BookPill`'s flat branch honour `bg`/`fg`** (defaulting to the accent pair): a pill
  standing on a card in the accent hue was invisible on Pop, in layout 1 as well as layout 2.
  The card's pill is labelled by `cta` (`vm.pricingCta`, uncased) with `note`
  (`vm.pricingNote`) beside it and stacked under it at 390, in Retro's card, Lime's, Grunge's and
  Editorial's alike
  (JP-036: Lime's pill took no label and printed the section's static `cta1`, "Book Now", where
  its frame reads the same "Enquire about a date"); an emptied label drops the pill, an emptied
  line its span, and both the row. The picked chip is redrawn in `sem/active` under Lime and
  Grunge, whose frames' pick is the card's own colour; Editorial's frame draws its pick visibly,
  a `tag/1/bg` fill in the idle chips' ring, so it is followed rather than redrawn.
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
  **Lime's, Grunge's and Editorial's stacks read no `vm.tierRow`**: Lime's frame outlines the
  rows in the accent and fills the moving seat with it, ringed and lettered in the page ink,
  Grunge's names Scheme 3's own three literals, and Editorial's dashes its square paper rows 10,
  10 in the seat's terracotta and paints the moving seat off `s.onScheme[3]` — ink dashed blush,
  a terracotta numeral — so the walk (which reaches pale lime under Lime and the page's own
  black under Grunge) is Retro's and Pop's; the seat still moves exactly as above, every leaf of
  it read off the nested scheme wherever the filter stands it. The three templates' capsule
  draws the frame's own pick (`sem/text/1` under `sem/bg`), not layout 2's redraw.
  **Layout 4 filters nothing at all**: it is a stack of service rows on the page ground, the one
  pricing design with no chip row, no state and no control but the Book pill, so `chip` is
  untouched there. One row per package, divided by a 4px rule in **`vm.tierRow.card`** — layout
  3's own seat, reused because a rule has that outline's job of reading against the page (under
  Lime the rule is `s.ac` read directly, layout 3's `tierRow`-not-read rule, and under Grunge
  `s.stroke2`, `#FF0000`, in the same widened block; an inset shadow
  rather than a border so the frame's row height holds; under Editorial it is 1px of
  `s.stroke2` terracotta dashed 10, 10, a `DashRule` on the row, and the tag chips' leaked
  hairline is dropped, invisible on paper) — and
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
  terracotta, the pair the frame names outright). `unit` moves with it: nothing prints a suffix after the price here, so **`vm.tierKind`**
  — the unit with its leading slash dropped — stands above the numeral where the frame writes
  SET / PROJECT, which is one section-wide word against the frame's different one per row.
