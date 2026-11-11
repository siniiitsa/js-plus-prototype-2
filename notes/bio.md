# The bio — working notes

Created on 2026-10-13 for the character-limit pass (`plans/char-limits.md`, session 2). The
JP-090 bullet came over word for word from `notes/templates.md`. "Above" and "below" may point
into `CLAUDE.md` or another `notes/` file.

- **The layout-1 reference line (`refLabel`) is gone** (2026-11-11, see the section at the foot). Its JP-090 notes were retired with it.
- **Every bio text field has a character cap** (`plans/char-limits.md`, session 2, the user's
  rules of 2026-10-13). The caps are `chars` on `FIELDS.bio`, per template and design, measured
  by `scripts/limits.mjs bio`. The readout is `plans/char-limits/session-2-probe.md`.
  - **Labels and headings** take the measured cap, usually set by 390 or by layout 3's composed
    1440 column.
  - **Pills and buttons** take `min(measured, max(2 × seed, seed + 8))`: the pill `tag` 18, the
    button `cta` 16 and layout 4's Listen `cta2` 14. That matches the header's Listen.
  - **The two paragraphs** came back open at 400 at every width, so they take 3 × the seed,
    rounded down to 10: `para1` 390 and `para2` 340.
  - The header's keys as the bio prints them (`kicker`, `location`, the tags, the name and the
    seal) are `IDENTITY_CHARS.bio`, from session 1.
- **The heading is fitted to its widest word where 1440 stacks it a word a line**
  (`plans/char-limits.md`, session 12; the user's call of 2026-10-13 left it to the sweep).
  These are Lime's, Editorial's and Pop's layout 1 and Pop's layout 4. At the token a
  seven-letter word ran past the flank (Lime, Pop layout 1), under Editorial's arch, or into Pop's
  layout-4 dot grid, and no length cap could hold that. Now:
  - **Layout 1** sets the h2 at `min(dispLg, 100cqi / vm.titleWordEms)` on the flank, an
    `inline-size` container (the header name's JP-092 rule, `navFace`'s ems, `faced()` outside
    the fit). Grunge has no ems table and no fit; its seeded room holds.
  - **Editorial's seed binds.** Its Gloock *ROOM.* at the token, 93.8px, ran 59px past the flank
    and about 19px into the seal's disc on the seeded 1440 page. The fit sets it at 77.3px, 0.82
    of the token, 7px clear of the seal. That is the one seeded change, desktop only.
  - **Pop's layout 4** was already fitted, to the frame's 572.9 measure, which lays over the dot
    grid: *KESTREL* ran 16px into the dots. At 1440 the fit's measure is now the room left of the
    grid, 533.97 (437.9px). The seed's widest word takes 348 of it, so it does not bind.
  - **The caps**: the head may shrink to 75% of the seed's size there (the name's floor,
    `FLOOR_AT` in `limits.mjs`), and 768 and 390 now bind: Lime 19, Editorial 15, Pop 17 at
    layout 1 and 19 at layout 4. Editorial's 1440 reads 14 under the floor, so it reports
    `floor`; with no floor it reads 21.
- **Retro's Performing since is 9 at layout 3**, the seed's own "June 2021". In the composed
  1440 column the ID card's stat cell is 80px wide, so a tenth character wraps the value out of
  its cell. So "March 2019" is refused, and typing "September 2021" stops at "September". Lime
  takes 22 there, and Grunge, Editorial and Pop take 20. Layout 4's overlay line takes 31 on
  every template.
- **The ID card's labels draw two lines by design.** `sectionVm` breaks each one before its
  last word (`breakLast`), so the first line is the one that binds. *Performing since:* measured
  14 at 768 (and in the column on Retro and Lime, at 390 on Retro, Grunge and Pop), under its own
  17. So its cap is the seed's 17, and `--check` reports `floor`. *Current role:* takes 14 and
  *Based in:* takes 16–19. With caps this close to the seeds, the 80% counter is already showing
  at the seed (`17 / 17`, `13 / 14`). That is the mechanism working, not a bug.
- **`aboutLabel` (*About*)** takes its measured number (48–59); its seat is a stretched block, so the probe's `×grow` reads 1. (*Genres*, `tagsLabel`, was removed 2026-11-11.)

## Inline editing (plans/inline-edit-all.md, Retro layout 3, 2026-10-22)

Layout 3's `aboutLabel` is printed `[ About ]` (three text nodes of one span): a `*.2.` part row, box on the word, brackets left out.

## Inline editing (plans/inline-edit-all.md, Retro layout 4, 2026-10-22)

Layout 4's meta line (the overlay card until 2026-11-11, now the left column) prints `Performing since <date>` in one span and the Listen link beside its arrow (`Listen ↗`), so `since` and `cta2` are `*.3.` part rows (`INLINE_PART`, design index 3), box on the date and on `Listen`; the literal *Performing since* and the `↗` open nothing. The name, role line and six tag chips are the header's identity keys with no bio field: unhit, as at every layout (the open cross-section question).

## Line breaks in the paragraphs (2026-11-06)

`para1` and `para2` keep the artist's line breaks: every `<p>` that prints `s.bioP1` / `s.bioP2` sets `whiteSpace: 'pre-line'`, so `Hello⏎⏎World!` draws an empty line between the words (the same holds for the header's `subtitle`, pricing's `intro` and `quote` and the form's `para`). Runs of spaces still collapse and lines still wrap. Caps count characters, so blank lines add height beyond what `scripts/limits.mjs` measured; the cap is not tightened for it. On the canvas Enter now inserts a line break in these fields too (`pre-*` is what the inline editor looks for).

## The header's identity keys are edited here too (2026-11-09)

The bio's panel lists the header's `kicker` (every layout), `location` (layouts 1–3) and `tags` / `showTags` (layouts 2–4; Retro 2 and 4) as boxes of its own, since it prints them: `IDENTITY_READS` in `data.js`. They read and write the header section, so the value is one; the header's panel drops a key its layout does not draw (Lime's layout-3 header has no Kicker box, the bio does). The form (kicker, layouts 1–2) and the calendar (location, layout 4; Retro's layout 1 too) host the same way. Measured 2026-11-09: the map's layout-2 travel card no longer moves with the location (it reads its own `base` / place), so the map hosts none.

## Decorative labels removed, layout 4 recomposed, bio badge (2026-11-11)

QA ticket, all five templates. User calls in the session that built it.

- **Gone**: the `<initials> BIO` eyebrow at layouts 1, 3 and 4 (Retro's layout-1 flank held two label rows), the layout-1 reference line (`refLabel`, field deleted) and the *Genres* line over the chips at layouts 3 and 4 (`tagsLabel`, field deleted). Stored `c.refLabel` / `c.tagsLabel` in old drafts are simply never read. The chips, their order and `showTags` are untouched; `aboutLabel` stays. Layout 1's heading column is now the heading alone, centred in the column at desktop (where its `space-between` over three rows seated it).
- **Layout 4 (every template, `s.v3`)**: the portrait card is bare at every width. The left column is heading → both paragraphs → artist name + meta line (kicker · Performing since · Listen ↗) → chips, top-aligned, printed on the band in the band's own inks (Lime `s.bg`, Grunge `s.tx` with the name's second word `s.bg`, Editorial `s.tx`, Pop `s.text3` white, since its violet `s.tx` is 2.1 : 1 on the pink band, Retro cream). Narrow, the stack comes first and the portrait follows (4 : 5 at 390, 720 tall at 768). The frosted panel, its `dusk` box, the phone's clear-stage (`stageH` / `stageOver`) and the photograph wrapper's `{top,height}` ↔ `{inset:0}` flip are gone, which closes the Safari card report that used to stand here. Pop's dot grid is the sheet's at desktop and peeks over the portrait's top-right corner narrow (a wrapper round the portrait), since the full-width copy would otherwise sit on it.
- **Badge**: `FIELDS.bio.badgeMode` (rotating default / static / hidden, `in: { Editorial: [0], '*': [0, 2] }`) at layouts 1, 3 and 5 (5 folds to design 0). `sectionVm` folds it for `cat === 'bio'` as for the header (`showBadge`, `badgeSpin`), so an absent key is today's rotating seal. `badgeOptsFor(theme, design, cat)` offers all three for the bio at every theme (its layout-1 artwork is the real ring; the Lime / Editorial reticle and star rule is the header's). **Pop's layout-1 sun (`PopSun`) is gated and turns** (`spin` prop, `seal-spin` on its paths inside the tilt). **Hidden frees the seat**: layout 3's Lime / Grunge / Retro about band drops its 188 px left spacer and the seal's floor height; the other seals are absolutely placed. Editorial's layout 3 draws a sparkle, not a badge, so the field is not offered there.
- Measured: `scripts/reach.mjs` (bio rows), the badge states in all five themes × layouts 1, 3 × three widths (`seal-spin` present / absent, hidden → no svg), and layout 4 by eye at 1440 / 768 / 390.
