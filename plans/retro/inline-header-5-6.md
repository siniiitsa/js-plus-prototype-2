# Retro headers 5 and 6 — inline editing pass

Pass 20 of [`../inline-edit-all.md`](../inline-edit-all.md). Branch **`inline-edit-all`**, from `a845801`. Date 2026-10-22.

```bash
cd source && npx vite --port 5175 --strictPort        # background
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Retro --layout 5 --width 1440,768 --check
BASE=http://localhost:5175 node scripts/inline-probe.mjs --theme Retro --layout 6 --width 1440,768 --check
```

## What layouts 5 and 6 are

Header-only designs (`HeaderV4` *Overlay card*, `HeaderV5` *Stage wide*; no Figma page). `setupHeaderCount` stops the modal at four cards, so the
probe's `openEditor` threw on `--layout 5` / `6` ("the modal offers 4 cards"), although its header said they were supported. It now reaches them as a user
does: card 1's page, then the header's `arch` set through the fiber setter (`--layout` 5 / 6, Retro only; the same for the scratchpad harnesses' `lib.mjs`).
That is exactly what `pickHeader(4)` / `pickHeader(5)` would write: `pageLayout(cat, i)` is `i % designCount(cat)`, which is **0 for every body category** (all
`NVAR` are 4, the footer's 1), and `pageOrder(4)` / `pageOrder(5)` fall to `PAGE_ORDERS[0]`. **So the body under either header is Retro layout 1's, and its
ledger is the existing `Retro.0.…` set** (four rows and the `*.*` pair); nothing new there. Only the header's own designs 4 and 5 (0-based) are new ground.

`FIELDS.header` `in` for Retro, read at design 4 and design 5:

| Key | Design 4 (layout 5) | Design 5 (layout 6) |
|---|---|---|
| `title`, `cta1`, `navMode` | read | read |
| `subtitle` | read | — |
| `cta2` | read | — |
| `kicker`, `location` | — (`shared`: listed in the panel) | read |
| `tags` (six chips), `showTags` | read | read |
| `showBadge`, `badgeText` | read | read |
| `heroCta`, `availability`, `faceTitle`, `faceBody`, `placeBody`, `cardLine`, `align` | — | — |

Seal: both draw the Retro `SealBadge` arm (the terracotta disc and asterisk, one svg, viewBox 100 × 100, the ring in `textPath`s under a `matrix` rotation), at the
hero's bottom-right (layout 5) and top-right (layout 6). Not the Pop arm, not Lime's disc.

## Baseline (before any change)

`--layout 6`: **PASS** outright (156 slots hit at 1440, 143 at 768, 0 of everything, no new ledger row). `--layout 5`: **FAIL**, on two UNLEDGERED
groups, `header.kicker` and `header.location`, drawn at no width (the Overlay card prints neither). Both pages: 0 WRONG, 0 NOT-RESTORED, 0 MISSING. The body's
counts are Retro layout 1's (156 / 143) since the body is that page.

| Header | 1440 clicks hit | 768 | unhit |
|---|---|---|---|
| layout 5 | 13 | 13 | the nav ×9 (derived labels), `4.9`, `Experience`, `5 pcs`, `Line-up`, `Tell me your date` (the frame's literals) |
| layout 6 | 14 → 15 | 14 → 15 | the nav ×9, the kicker's `●`, and **the `● DJ · LIVE ACT` line** (below) |

Layout 5's hits: the nav brand, the card's title (two spans, `Kai` and `Mercer`), `Listen`, `Book Now`, the subtitle, six chips, the seal's badge text.

## What `--check` could not see, and the fix

**Layout 6's `● DJ · LIVE ACT` kicker, the one above the title, opened nothing** — while the probe was green, because the same field is also printed bare in the inset card
under the name (`DJ · Live Act`, a hit), so `header.kicker` counted as reached. The `Kicker` component sets a `●` span and the words as a bare text node, so its element's
text is `●DJ · Live Act`, which is not the slot's copy, and the rows' exact-copy rule did not match it (`kick.mjs`: click each node printing the copy; node 0 opened
`header.kicker`, node 1 opened nothing; the box is not drawn, the user sees a dead click on the more prominent of the two).

Fix, **table only**: `INLINE_LINES['*.5.header.kicker'] = ['{}', '● {}']`, `chipLabel`'s shape (pass 5). Both forms are listed on purpose: a slot with a line is *spoken for* by
it (`claimed`), so a lone `'● {}'` would have taken the bare copy out of the exact map and killed the card's click. Re-measured: both nodes open `header.kicker` at both widths,
the box on the words and not the `●`, the carets and faces equal the nodes' (`seats.mjs`), the sentinel lands and Escape restores (`--check` hit 15 on layout 6's header).
`Kicker` is used by `HeaderV5` alone, so no other page can read the row; nothing in `EncoreSection` changed.

**A blind spot worth carrying to pass 21:** a slot with two nodes is *hit* when either opens. The probe's per-node `unhit` rows are what showed this one. An audit of this
session's JSONL (every `unhit` node whose squashed text equals a hit node's) finds, on both pages and both widths, only the known literal `Gallery` (the rail wordmark and
the source row) and the repertoire's `·` separators — nothing else on layout 1's body. Pass 21's `--check` of all 20 pages is the place to run the same audit over each
page's JSONL, or to make the probe say it (an `unhit` node whose copy a slot owns and another node opens).

## Generic fixes

**One, in the probe, not the app:** `openEditor` reaches `--layout 5` / `6` (above). `EncoreBuilder.jsx` and `EncoreSection.jsx` are untouched, so **no earlier page was re-run**;
the branch only runs when `layout > cards.length` (Retro), and Retro layout 4's header at 1440 was run again as a sanity check (13 hits, as in pass 15).

## Part slots / marks

**No mark and no part slot.** One `INLINE_LINES` row (above).

## Ledger (`INLINE_OFF`)

`Retro.4.header.…` (design 4 is layout 5), each read off the page (`texts.mjs`: no `DJ · Live Act` or `Manchester, UK` in the header; the bio, form and calendar below
print them from the header's keys):

| Row | Reason |
|---|---|
| `header.kicker` | not drawn: the layout-5 Overlay card prints no kicker (a shared identity key; the bio's role line and the form print it) |
| `header.location` | not drawn: the layout-5 Overlay card prints no location (a shared identity key; the bio and the calendar print it) |

Layout 6 adds none. The body's rows are `Retro.0.…`, unchanged (`songs.length`, `calendar.prompt`, and the `*.*` pair).

## Learned

- **Layouts 5 and 6 are Retro layout 1's page with another header**, so a pass for them is the header alone: 11 and 13 slots, plus the body already proved.
- **The title has four nodes on layout 6** (nav brand, the inset card's name, the h1's two spans) and **three on layout 5** (the brand, the card's two spans); all open `header.title`
  and the largest-type rule is not needed (the title is the only field whose copy they print).
- **The seal** (`seal.mjs`, both layouts, both widths): the header's seal is one svg under a `matrix` rotation of about −32°, `pointer-events: auto`; a click at its centre opens `header.badgeText`
  in the floating box (160 × 30 under the disc) with the field box on the disc (screenshots: layout 5's seal at the hero's bottom-right, layout 6's at the top-right, the ring spinning inside the
  square, no dead zone). The footer's and bio's seals draw the name but no field owns it: a click opens nothing, as on every template.
- **Seats** (`seats.mjs`, header): 12 boxes on layout 5 and 14 on layout 6, **0 mismatches** between the node's computed colour, face, size, weight and `text-transform` and the textarea's, at both widths.
  Fraunces 400 on the title (`text-transform: none`), Inter 700 `uppercase` on the kicker, Anton 400 `uppercase` on the Book pill; the caret colours are the nodes' own (white on the card's accent and on the photograph, the accent on the kicker).
- **Rotation** (`tilt.mjs`): the header's only rotated text is the seal ring (no slot); neither layout has a polaroid or a tilted card, so `placeBox`'s tilt path did not arise.
- **Every visible character** (`charsweep.mjs`, header, both widths): layout 5, 191 clicks, 85 opened, 0 nodes flagged; layout 6, 181 clicks, 108 opened, 0 flagged.
- **Screenshots** (`boxcheck.mjs`, header; the textarea tinted): the box lies on the glyphs for the title (two lines in the card, the h1's two blocks), `Listen` and `Book Now`, the kicker and the location.
  The one flag (layout 6's second kicker, `d = [-55, 43, 41, 4]`) is the checker's reference, not the box: the node's element text is `●DJ · Live Act`, so the only element it
  can compare with is the inset card's span, which is somewhere else; the screenshot shows the box on `DJ · LIVE ACT`.
- **Sticky:** none in `HeaderV4` / `HeaderV5`'s code (read, not measured: `sticky4.mjs` was not run); the body's are layout 1's (none).
- **Literals no field owns** (not slots): layout 5's `4.9 ★ Experience`, `5 pcs Line-up` and *Tell me your date* (`FIELDS.header`'s own comment names them; a later pass may give them fields);
  the nav labels (derived: `navLabel()`).
- **Open (carried):** (a) a state-aware ledger for `tracks.sub` and `pricing.unit`; (b) the bio→header cross-section question (the bio's role line, the form's credit and the calendar's stamp print the
  header's kicker and location with no field of their own, so on layout 5, where the header draws neither, the panel is the only way in); (c) pass 4's over-cap title finding; (d) two different rows with the same
  title both drawn at layout 3 open nothing; (e) Pop L3's testimonials kicker `●` strip: deferred to the end-of-plan sweep (pass 21) by the user, not fixed here.
- **For pass 21 (the end-of-plan sweep):** all 20 pages `--check` once more (Retro, Lime, Grunge, Editorial, Pop × layouts 1–4, `--width 1440,768`, four at a time, ~15 minutes a batch) **and Retro layouts 5 and 6**
  (22 runs); the audit above (unhit nodes whose copy a slot owns); open item (e); the docs (CLAUDE.md's inline bullet says "every template and layout" and names the probe, which now also takes `--layout 5,6` for
  Retro); and the root `index.html` / `published.html` refresh, which is a deliberate step of its own.
