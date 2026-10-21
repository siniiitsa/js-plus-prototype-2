# Inline text editing on the canvas

A click on text in the editor canvas edits it there, instead of only in the sidebar. **Scope:** Retro's layout 1,
every section on the page, desktop and tablet. User calls, 2026-10-20: the header first (title, kicker, location),
then the rest of the page, then the multi-line fields and the header's Book Now button, then everything that was
left (tag chips, badge text, tilted cards, composed lines, repeaters). A click on the text of an already-selected
section starts the edit (the first click still only selects); no phones, where the Edit drawer covers the canvas.

## How it works (in chrome; `EncoreSection` carries two inert `data-inline` marks, below)
- **Slots.** Each editable piece of copy is a slot: a scalar field, one item of a list field (tags, promises, event
  types, a package's features), one cell of a repeater row, or a part (a price's lead / amount / tail, a gig's city
  or time inside `City · time`, the media counter's `Featured`, the calendar's time). `inlineSlots` enumerates them
  from the values the panel shows (`fieldValue`, `repeaterRows`), so panel and canvas resolve the same seed.
  `INLINE_KEYS` lists the fields, `INLINE_ROWS` the repeater cells.
- **Click → slot.** `inlineFieldAt` walks the click's ancestors; a node is edited when it **prints exactly the
  slot's copy** (`squash` equal), or, for a part slot, holds it inside a longer line with the click near the words.
  Repeated copy maps the *n*th such node to the *n*th slot. The same text in two different fields is ambiguous
  and is skipped, except where a mark settles it.
- **Marks.** The gallery's credit line and its source label both read "Gallery", as does the vertical wordmark, and
  text cannot tell them apart. `EncoreSection` carries `data-inline="railLabel"` and `data-inline="sourceLabel"`
  on the two (inert attributes, no behaviour); `INLINE_MARKED` names the keys that need one. Add no more where
  text can decide.
- **Where the box goes.** `inlineBox` uses the union of the node's text-line rectangles (a `Range`), not its box,
  and moves the top by half of `line-height` minus the font's content height. Under a tilt (`tiltChain`: the bio's
  polaroid, pricing's 1–3° cards) `placeBox` measures the text untilted (`untilted`), composes each ancestor's
  matrix about its origin and gives the textarea that `matrix(...)`, so the box lies on the text. Vertical writing
  is left to the panel.
- **The box.** `InlineEditor` is a `<textarea>` with the node's computed face, **its type transparent and its
  caret visible**; the page keeps drawing the copy, so nothing doubles. Selects all on open. The header seal's
  `badgeText` is the exception: the ring is one rotating `<textPath>`, so it opens a visible floating box
  (`floatBox`) beside the disc.
- **Line breaks.** Enter closes the box, a newline typed or pasted becomes a space, **unless the node's computed
  `white-space` is `pre-*`** (the footer statement): Enter inserts one and ⌘/Ctrl+Enter closes.
- **Lists and rows.** A list item replaces its place in the stored string (`listItems` / `joinItems`; a comma typed
  into a comma-list item becomes a space), a cell rewrites its row, a price part goes back through `priceWrite`.
  An item or cell emptied in the box is **held, not committed** (the Title's rule), since removing it unmounts the
  node under the box; the panel's X removes one.
- **Write path = the panel's.** Every keystroke goes through `api.setContent`. Caps are `fieldCapOf` for a field and
  `colCaps` for a cell (`maxLength`, `CharCount` under the box). A header Title that trims to empty is never
  committed.
- **Keys.** Blur closes; Escape restores the stored value it opened with (an absent key is deleted again, so a seed
  is not written out), then closes.
- **State.** `inline` is its own `useState`, not derived from `focusBox`; `inlineNode` (a ref) keeps the clicked
  node, since a list row is re-keyed on each keystroke; `focusF` is set so the blue box follows the typing. It
  closes when the selection moves or on a phone. The cursor is `text` over editable copy, probed every 120 ms.

## What is in
Probed by clicking every text node of Retro layout 1's page at desktop and tablet and typing a sentinel: each click
opens its own slot, the sentinel lands on the clicked node, and Escape restores the section. Header: `title`
`kicker` `location` `cta1` `tags` (each chip) and the seal's `badgeText`. Bio: `heading` `refLabel` `para1`. Media:
`kicker` `heading` `countLabel`, tracks `title` / `sub`. Pricing: `heading` `sub` `unit` `rowCta`, tiers `name`
`price` (lead, amount, tail) `blurb` `feats`. Repertoire: `heading`, songs `title` / `artist`. Gallery: `kicker`
`heading` `railLabel` `sourceLabel` `backLabel`. Calendar: `cta` `time`. Map: `kicker` `heading` `radius` `base`
`terms` `listLabel`, gigs `venue` / `city` / `time` / `month` / `day`. Form: `heading` `promises` `typeLabel` `types`
`messageLabel` `message` `button`, fields `label` / `placeholder`. Testimonials: quotes `quote` / `who` / `role` /
`when`. Footer: `statement` `cta` `copyright`, links `label`.

## What is still out
- Derived filter chips (`tiers.tags`, `songs.tags`) and `songs.length`, which the page does not draw: panel only.
- The calendar's `prompt`, which shows only while no day is cued and so is unreachable by default.
- Vertical-writing text (the gallery's wordmark, a literal anyway).
- An emptied label has no node to click; refill it from the panel.
- Copy over its cap (typed under another layout) is shown clamped by the page but whole in the box.
- Retro layouts 2–4, Lime, Grunge, Editorial and Pop (`inlineOn` gates on Retro and design 0), and the fields no
  repeater slot yet covers (`sets`, `slots`, `stats`, `steps`, `booked`, `images`).
- Phones.

## Expanding
Lift the `inlineOn` gate (template / design) and measure each node with the sentinel probe first; a key whose copy
several nodes hold needs a mark or a rank. Another template's frames bring their own transforms, faces and
clamps, so each layout is a probe pass, not a flag.
