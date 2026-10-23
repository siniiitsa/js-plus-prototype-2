# Editorial layout 1 — inline editing pass

Pass 3 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `4d96a99`. Date 2026-10-21.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Editorial --layout 1 --width 1440,768 --check
```

## Baseline (before any change)

`--check` FAIL, on exactly the two UNLEDGERED groups the plan predicted; nothing else.

| Section | 1440 hit | 768 hit | WRONG / NOT-RESTORED / MISSING |
|---|---|---|---|
| header | 12 | 12 | 0 |
| bio | 3 | 3 | 0 |
| media | 15 | 15 | 0 |
| gallery | 6 | 5 | 0 |
| repertoire | 37 | 19 | 0 |
| map | 33 | 32 | 0 |
| pricing | 34 | 34 | 0 |
| calendar | 2 | 2 | 0 |
| form | 22 | 22 | 0 |
| testimonials | 4 | 4 | 0 |
| footer | 11 | 11 | 0 |

Totals 155 slots hit at 1440, 142 at 768, 0 WRONG, 0 NOT-RESTORED, 0 MISSING. UNLEDGERED: `repertoire.songs.length` ×12,
`calendar.prompt`. (Gallery's `sourceLabel` is *not drawn* at 768 and hit at 1440: the union rule, no row.)

## After

`--check` **PASS**: 155 hit at 1440, 142 at 768, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, 0 UNLEDGERED. The only change is
the two ledger rows below.

## Generic fixes

None. No hit-test or box-placement change, so no earlier page was re-run (Retro, Lime and Grunge L1 are untouched by
a two-line edit to the `INLINE_OFF` table, which keys on `Editorial.0`).

## Part slots / marks

None. Pass 1's two gallery marks (`railLabel`, `sourceLabel`) cover Editorial: both hit at 1440, the second is
desktop-only.

## Ledger (`INLINE_OFF`, `Editorial.0.…`)

| Row | Reason |
|---|---|
| `repertoire.songs.length` | not drawn: only layout 3 prints a song's length |
| `calendar.prompt` | not drawn: it shows only while no day is cued, and the canvas opens with one cued |

Also reported, not ledgered here: `tiers.tags` and `songs.tags` (`*.*`, derived chips), *paged* rows (the testimonials'
reviews after the first at both widths; the repertoire past the sixth song at 768).

## Learned

- **The three new risks all held.**
  - *`cased()` / `text-transform`.* 96 Gloock nodes and the uppercase Inter labels: the textarea's computed
    `text-transform` equals its node's on every box (`uppercase` on the heads, labels and the footer statement, `none` on
    the price amounts and the body copy), and the box wraps where the page's copy does, line for line (header title,
    bio / media / gallery / form / footer headings, the testimonials' quote, in shots).
  - *Gloock's single weight.* Every Gloock node computes weight 400 and so does its textarea (96 of 96, `400/400`), so
    nothing is synthesised: the caret's advances are the page's. `InlineEditor` copies `fontWeight` from the node and the
    Editorial frames never ask for more than 400.
  - *Per-design schemes.* The caret takes the node's own colour (`caretColor` from `startInline`), so on the ink header,
    the ink and terracotta bands, the taupe cards and the paper ground the caret and the box are where the glyphs are;
    nothing reads the section's `s.bg`.
- **Screenshots** (textarea tinted magenta, 1440, viewport clips with `captureBeyondViewport: false`, 83 shots over
  every section; a harness in the scratchpad, not committed). Every box lies on its glyphs. Measured, not only eyeballed:
  for each clicked node the textarea's rect against the rect of the slot's own text (the minimal element whose text
  equals the box's value), then `scrollTop` / `scrollLeft` after typing a sentinel (always 0, so the caret never leaves
  the glyphs). The comparison is noisy, and 27 of 178 boxes were flagged by it; each is one of these three, none is a
  fault:
  - A *part slot* (the map's city inside `City · time`, the media counter's *Featured* inside `5 / 5 Featured`): the box
    is the part's words, the reference is not (a one-line pill 26px right of the line's left edge, as designed).
  - A *punctuation node* (the `·` before an artist or after a city): the click opens the neighbouring field, as
    `inline-probe` already accepts.
  - **A display line is taller than its `line-height`**: Gloock's content height is bigger than the
    display lines' `line-height`, so the box is `lh` tall and 6px (price amounts) to 54px (the header's name) shorter than
    the text's content rect, and sits centred on it (`inlineBox`'s half-leading shift). In shots it is on the caps with no
    clipping. That is by design, and a rect-vs-rect test with a fixed tolerance will keep flagging it: compare the
    *glyph* box, or take the flags and look.
  - An `overflow` flag on the pricing price parts was `scrollWidth` read before the box grew; after typing it is 74 / 74
    and `scrollLeft` 0.
- **Nothing stacked over a slot's copy** at Editorial layout 1: the tape, sparkles and dashed rules sit beside the type
  (the probe's `unhit under an overlay` is 0 at both widths), so the stack walk and the smallest-box tie-break were not
  exercised here either. Pop's pass (4) is the first that can test them.
- **A section's notes file needed no edit**: no section's rendering, `vm` keys, fields or live behaviour changed, so no
  *Inline editing* heading was added to any `notes/` file.
- One check run is ~9 minutes for both widths; the box harness ~3 minutes alongside.
