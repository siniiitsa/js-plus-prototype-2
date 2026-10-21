# Grunge layout 1 — inline editing pass

Pass 2 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `9ad4ec6`. Date 2026-10-21.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Grunge --layout 1 --width 1440,768 --check
```

## Baseline (before any change)

`--check` FAIL, on exactly the two UNLEDGERED groups the plan predicted; nothing else.

| Section | 1440 hit | 768 hit | WRONG / NOT-RESTORED / MISSING |
|---|---|---|---|
| header | 13 | 13 | 0 |
| bio | 5 | 5 | 0 |
| media | 16 | 16 | 0 |
| gallery | 6 | 5 | 0 |
| repertoire | 38 | 20 | 0 |
| map | 31 | 32 | 0 |
| pricing | 35 | 35 | 0 |
| calendar | 2 | 2 | 0 |
| form | 22 | 22 | 0 |
| testimonials | 4 | 4 | 0 |
| footer | 11 | 11 | 0 |

Totals 157 slots hit at 1440, 144 at 768, 0 WRONG, 0 NOT-RESTORED, 0 MISSING. UNLEDGERED: `repertoire.songs.length` ×12,
`calendar.prompt`. (Gallery's `sourceLabel` is *not drawn* at 768 and hit at 1440: the union rule, no row.)

## After

`--check` **PASS**: 157 hit at 1440, 144 at 768, 0 WRONG, 0 NOT-RESTORED, 0 MISSING, 0 UNLEDGERED. The generic fix
below left the counts unchanged on all three pages re-run.

## Generic fixes

**`textRange` no longer spans a node's element children** (`EncoreBuilder.jsx`). With no `text` it was
`selectNodeContents(node)`, whose client rects include the box of an element *inside* the node. A pill that holds its
label and an arrow (measured on the footer's Book Now, Grunge and Lime; other pills of the same shape were not
measured) therefore gave `inlineBox` two line
rectangles at different tops: the textarea came out 106 × 48 over a label 58 × 23, wider than the words by the arrow, twice
as tall, and with its first line (caret, selection) 6 px above the glyphs. It is the range from the first to the last
non-blank text node now. After: 60 × 24 on the glyphs, the same on Lime's footer (it had the same 111 × 48 box; pass 1's
screenshot read "lies on the glyphs" without measuring the height). The probe could not see it: it checks the node and
that the sentinel lands *under* the box, and the over-sized box still did. An icon *between* two text nodes would still
widen the range; nothing draws one.
**Earlier pages re-run: yes**, Retro, Lime and Grunge layout 1 at `--width 1440,768 --check`, all PASS with the hit
counts they had before (Retro 156 / 143, Lime 156 / 143, Grunge 157 / 144).

## Part slots / marks

None. The Lime tree's two gallery marks from pass 1 cover Grunge (`railLabel`, `sourceLabel`: both hit at 1440).

## Ledger (`INLINE_OFF`, `Grunge.0.…`)

| Row | Reason |
|---|---|
| `repertoire.songs.length` | not drawn: only layout 3 prints a song's length |
| `calendar.prompt` | not drawn: it shows only while no day is cued, and the canvas opens with one cued |

Also reported, not ledgered here: `tiers.tags` and `songs.tags` (`*.*`, derived chips), *paged* rows (the testimonials'
reviews after the first at both widths; the repertoire past the sixth song at 768).

## Learned

- **Pass 1's reading held**: Grunge was near-free, and the stack walk and the smallest-box tie-break were not tested by
  anything here. No tape, grain or sticker sits over a slot's copy at layout 1; the probe's one "unhit under an
  overlay" is the gallery's literal `04 — 07` counter, as in Lime.
- **Tilt is nearly absent at Grunge layout 1.** Scanning every text node of every section for a transformed ancestor
  (the `tiltChain` test) finds only the media player's card; pricing and the bio are upright. Its box lies on the type
  (shot taken). So `placeBox`'s tilt path is not exercised by this page; Retro's pilot is where it was proved.
- **Screenshots** (textarea tinted, 1440, viewport clips, 24 shots over every section, plus the tilted-node set): the
  boxes lie on the glyphs over the dark header, the red form, the red map, the pricing card, testimonials and the
  grain-covered *Book Now* heading in the calendar, **except the footer's Book Now pill, which showed the generic bug
  above** (the other pills were not measured), found only by eye and measured with a range-vs-textarea comparison (use
  that, not the probe, to test box placement: the textarea's rect against the node's text rects).
- **The harness trap again**: pass the section id as a value to `page.evaluate`, never in a template string.
- A run of one theme is ~9 minutes for both widths; three themes in parallel took about the same (three headless
  browsers on one Vite server were fine).
