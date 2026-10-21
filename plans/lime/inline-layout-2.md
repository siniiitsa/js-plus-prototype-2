# Lime layout 2 — inline editing pass

Pass 6 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `20a661e`. Date 2026-10-21.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Lime --layout 2 --width 1440,768 --check
```

## Baseline (before any change)

`--check` FAIL, on seven UNLEDGERED groups and nothing else: **0 WRONG, 0 NOT-RESTORED, 0 MISSING** at both widths. The
`*.1.` `INLINE_PART` / `INLINE_LINES` rows from Retro's pass 5 are keyed `*` for the template, so they applied to Lime's blocks
without a change, and every one of them hit.

| Section | 1440 hit | 768 hit | WRONG | MISSING |
|---|---|---|---|---|
| header | 12 | 12 | 0 | 0 |
| bio | 5 | 5 | 0 | 0 |
| media | 15 | 16 | 0 | 0 |
| repertoire | 21 | 21 | 0 | 0 |
| gallery | 1 | 2 | 0 | 0 |
| pricing | 22 | 21 | 0 | 0 |
| calendar | 12 | 12 | 0 | 0 |
| map | 48 | 47 | 0 | 0 |
| form | 12 | 12 | 0 | 0 |
| testimonials | 8 | 8 | 0 | 0 |
| footer | 11 | 11 | 0 | 0 |

Totals 155 hit at 1440, 156 at 768. UNLEDGERED: `header.kicker`, `header.tags` ×6, `media.tracks[].sub` ×5,
`repertoire.songs[].length` ×12, `calendar.prompt`, `form.fields[].placeholder` ×3, `testimonials.quotes[].when` ×5 — the
seven groups of `Retro.1`, one for one.

## After

`--check` **PASS**: 155 hit at 1440 and 156 at 768, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, 0 UNLEDGERED. The gallery's
`railLabel` is hit at 768 and *not drawn* at 1440 (the union rule, no row).

## Generic fixes

**None.** Nothing in the shared inline machinery moved, so no earlier page was re-run. (The plan's rule — a generic fix
means re-running Retro, Lime, Grunge, Editorial and Pop layout 1 and Retro layout 2 — did not trigger.)

## Part slots / marks

None added. **No mark.** The carried-over `*.1.` rows (`header.availability`, `media.listLabel` / `totalLabel`,
`pricing.kicker` / `reviews` / `rating`, `calendar.dateLabel`, `map.terms` / `expand`, `form.bookings`,
`testimonials.kicker`, and the `INLINE_LINES` for `calendar.availLabel`, `media.chipLabel` and the map's gig cells) are
**proved on Lime** by this pass. The exact-collision order (claims, the copy as typed, the heading on the largest type) held
on a page that did not shape it: the map's five *Manchester*s (heading, travel card, featured panel, rows) gave 0 WRONG.

## Ledger (`INLINE_OFF`, `Lime.1.…`)

Each confirmed by the probe at both widths and checked against Lime's own DOM, not copied.

| Row | Reason |
|---|---|
| `header.kicker` | not drawn: Lime's layout-2 header prints no kicker (a shared identity key; the bio's role line and the form's credit print it) |
| `header.tags` | not drawn: no tag chips in the header (the bio prints them) |
| `repertoire.songs.length` | not drawn: only layout 3 prints a song's length |
| `calendar.prompt` | not drawn: shows only while no day is cued, and the canvas opens with one cued |
| `form.fields.placeholder` | not drawn: the card's boxes print the uppercased label (checked in the card's HTML); a placeholder only once the label is emptied |
| `testimonials.quotes.when` | not drawn: only the `s.v0` branch draws it, so layout 2 has no seat for it (`EncoreSection` lines 24293 and 24506 sit before the `s.v1` branch) |
| `media.tracks.sub` | derived value: the seeded page prints the release and the running time as two nodes |

Also reported, not ledgered (`*.*` rows, the union rule or paging): `tiers.tags` / `songs.tags`; `gallery.railLabel` at 1440;
*paged* rows (the repertoire's last two songs, pricing's other two plans, the testimonials after the first).

## Learned

- **Lime's header is its own composition and needed nothing.** All ten header slots hit: title, subtitle, location, `cta1`,
  `cta2`, `heroCta`, `availability` (a part row, the bullet its own span's), and the glass card's `faceTitle` / `faceBody` and
  the lime place card's `placeBody`. Retro's header has one more hit, `badgeText`, because Lime's layout 2 draws no seal and
  `fieldShown` says so. `header.location` opens from the place card's big *Manchester, UK*.
- **The featured gig's chip (`Jul 12 · 22:00`) is reached by its words, not by its separator.** A click in the middle of the
  chip lands on the ` · ` between `12` and `22:00`, outside every word's ±4 px (`near` in `inlineFieldAt`), and opens
  nothing; the probe's centre-aimed click records it *unhit*, and its second phase aims at each word and records `month`,
  `day` and `time` as hit. It is the same shape as Retro's chip (the node is identical) but Lime's 11px chip is wider than
  Retro's 9.8px, so the dead zone is bigger: Retro's centre click happens to be near `22:00`. I left it: a click on a
  composed line's separator opening nothing is the class "a punctuation node" earlier passes recorded, and widening the
  tolerance for lined slots is a shared hit-test change that would re-run six pages. If a user finds it, the fix is a
  `near` of "within the line's own union, nearest word wins" for `lines` slots only.
- **The sticky form card** (checked with `scratchpad/sticky.mjs`, opened on the card's *Event date* label, scrolled 60 and
  120 px): the box stays within 1 px of the node at both widths, including at +60 where the card is pinned (node y constant
  at 187 and the box with it). Retro's fix 3 serves Lime unchanged.
- **Screenshots** (textarea tinted, 1440; 150 boxes measured by `boxcheck.mjs`, 18 flagged, ~14 shots viewed): the box lies on
  the glyphs for the availability pill, the hero CTA, the fan's `● Featured`, the calendar's `Availability` (arrow left out),
  the glass card's face title and the lime place card's body and *Manchester, UK*, the featured chip's month, day and time
  (each by character offset), a row's `21:00` under the uppercase `JUL`, the pricing amount, the testimonials' kicker and
  the form heading. The 18 flags are the classes passes 3–5 recorded: part slots measured against the whole line, a `·` or
  `· 21:00` node, the price lead and amount in Bebas Neue (box `line-height`, the content rect taller), and `availLabel` /
  the rows' cities, whose reference is another node of equal text. No style mismatch, no weight mismatch.
- **For pass 7 (Grunge layout 2):** expect the same: the `*.1.` rows are template-wildcarded, so the pass is mostly its seven
  `Grunge.1` ledger rows plus tape and rotation (`placeBox`) on the fan and the tiles. Run the baseline first and read each
  not-drawn row's reason off Grunge's DOM; the form and testimonials reasons (`label` in the box, `when` in `s.v0` only) are
  shared-branch facts, but `header.kicker` / `tags` and `media.tracks.sub` depend on the template's own blocks.
- **Open (carried from pass 5):** (a) a state-aware ledger for `tracks.sub`; (b) the bio→header cross-section question (the
  bio's role line and tag chips are printed from the header's keys, with no slot of their own); (c) pass 4's over-cap title
  finding. All three left as asked.
- One check run is ~9 minutes for both widths.
