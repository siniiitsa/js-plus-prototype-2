# Editorial display face — a closer free stand-in for Fisterra Fora

Working checklist for **JP-085 option C** (`retest-qa-fixes.md`, entry 1): find a free,
web-licensed face closer to Fisterra Fora than Noto Serif Display, **chosen by rendering**, then
ship it in Noto's place. It works like the other plans here: **one step per session, with
context cleared between sessions**, and each session writes what it settled back into this file.

**Why this and not the face** (user call, 2026-10-05, `retest-qa-fixes.md` JP-085 · JP-098): no
Fisterra web licence has been bought or agreed. TipoType's *Fisterra Web* is $69–$5,037 one-time
by page views, under a non-sublicensable EULA, so whether one licence covers every artist's site
the builder publishes is a question the PO has not yet put to TipoType (`layout-1.md` open
question 1 holds the facts). **If a licence is ever bought, `qa-fixes.md` JP-085's option B
replaces this plan**: steps 3 onward are B's cost list with Fisterra's own `.woff2` in the
winner's place.

**Why a face and not a mask.** Grunge's JP-056 answer (`../grunge/display-face.md`) cut Stones
Crush's *texture* into Anton. Fisterra's difference from Noto is *shape*: sharp-angled wedge
serifs, swash tails on the R and the Q, ligatures (`layout-1.md` *The decisions* §1,
`:270`–`273`). The tester's "thin" is not the stem, which session 0 matched at wght 540 (.154 of
the cap, to the pixel). It is the character. A mask cannot add a serif.

Branch: **`editorial-display-face`, forked from `main` after `editorial-retest-qa-fixes`
merges**. It is kept out of that batch because it moves every Editorial digest at all four
layouts, and the batch's digests have to stay readable. One commit per step. The root
`index.html` is refreshed once, by the sweep. The retest batch's sweep adds this plan's row to
`plans/README.md`.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then
`qa-fixes.md` JP-085 (options A, B and C, and the Settled facts), [`layout-1.md`](./layout-1.md)
*The decisions* §1 (`:262`), *Settled in session 0* (`:768`–`:813`, the face table, `faceK`, the
pinned link) and open question 1 (`:2035`), then `notes/templates.md`'s Editorial paragraphs
(`:131` on), then the memory notes `verifying-the-published-tab`, `browser-tool-choice`,
`load-figma-fonts` and `figma-frame-reading`.

## What the tester will see, and what it is not

- **Not Fisterra Fora.** The computed `font-family` will name the winner, and nothing named
  Fisterra loads. The reply says so up front, as Grunge's said "the letters are Anton's".
- **The whole template.** `font/display` and `font/label` name Fisterra on every display and label
  node (`get_variable_defs`, 2026-09-30): the hero, the wordmark, the section heads, the nav links,
  the *Book Now* pill. The chips are Chakra Petch (`font/ui`), which does not change.
- **Editorial only.** Themes 0, 1, 2 and 4 must digest **zero rows** at every step.

## Facts (HEAD `e953ec9`, 2026-10-05; re-check at step 0)

- **The face.** `THEMES[3]` at `data.js:180`–`201`. The stand-in comment is `:183`–`199`, and
  `display` / `label` are `'Noto Serif Display', serif` at `:200`–`201`. There is no `faceK`, so
  `faced` / `facedLh` are the identity under Editorial.
- **The link.** One pinned entry, `family=Noto+Serif+Display:wdth,wght@62.5,540..700`, in
  `source/index.html:11` **and** `source/preview.html:10`. Google serves it as one variable face, so
  a site naming no weight is clamped to 540 and the three Bold statements get 700. CLAUDE.md:
  *"Noto Serif Display is one Google Fonts entry, never a second"* (Retro's Fraunces rule). There
  is no `@font-face` in `source/`.
- **The advance table.** `NOTO_EM` (`data.js:677`), `notoEms` (`:687`), `notoBoldEms` (`:695`, the
  540 table × 1.045). Every Editorial fit is in these ems, read at:
  - `navFace` (`EncoreBuilder.jsx:712`–`713`), which feeds `vm.navEms` (`:716`), `vm.navNameEms`
    (`:728`), `vm.cardNameEms` (`:738`), `vm.navCtaEms` (`:739`), `vm.navNameFit`
    (`:748`–`752`) and the calendar month's `ems` (`:1403`);
  - `vm.titleWordEms` (`:1195`–`1197`): `notoEms` at designs 2 and 3, `notoBoldEms` below;
  - the testimonials quote's word fit (`:1807`) and the footer statement's (`:1975`), both
    `notoBoldEms`.
- **Casing.** Editorial is `casing: 'title'` with `textTransform: 'uppercase'` per site (Grunge's
  rule), because Noto has a lowercase. A caps-only winner makes the transform harmless, not wrong.
  It stays.
- **Noto's own quirks the code already carries** (`notes/templates.md`): the J descending 0.24em,
  the glyph floor lifted 0.09em on the map, `overflowWrap` and word fits tuned to Noto's widths.
  Each is a site the new face re-measures.

## The comparison (steps 1 and 2)

The comparison ends on a **user call over the renders**, as session 0's face pick did. It is
judged on the render beside the frame, not by name.

**The target.** Header `964:58612` at 1440: *KAI MERCER* in Display/XL (179, 134 tall), the
wordmark in Display/Title (32), the nav in Label/SM (16), *Book Now* in Display/List (24). One
section head too: the bio's Display/LG (`964:58613`, its 118 head). Measured off the frame's ink
bounds (`absoluteRenderBounds`) and a pixel scan of its render, as session 0 did.

**The scores** (session 0's four columns, plus the one the tester names):

| Column | What it reads | Fisterra Fora |
|---|---|---|
| cap / em | cap height over the em | .725 |
| title width vs frame | *KAI MERCER* at matched cap height, over the frame's 4.875 em | 1 |
| stem / cap | the I's stem over the cap height | .154 |
| hairline / cap | the thinnest stroke over the cap height | .038 |
| **character** | wedge or angled serifs; a swash or tail on R and Q; whether the face is caps-only; ligatures | — |

**Carried over from session 0** (`layout-1.md:771`–`786`, already measured; re-render, do not
re-score):

| Face | cap / em | title width vs frame | stem / cap | hairline / cap |
|---|---|---|---|---|
| **Noto Serif Display, wdth 62.5, wght 540** (incumbent) | .715 | 1.108 | .154 | .014 |
| Oranienbaum | .705 | 1.049 | .121 | .028 |
| Instrument Serif | .725 | 0.907 | .097 | .041 |
| Gloock | .755 | 1.191 | .205 | .026 |
| Noto Serif (the text cut), wdth 62.5, wght 500 | .715 | 1.103 | .147 | .077 |
| Playfair Display 400 (the frames' own patch face) | .710 | 1.258 | .134 | .035 |
| DM Serif Display | .665 | 1.266 | .226 | .030 |

**New rows to measure.** Each answered `200` from `fonts.googleapis.com/css2` with the axes shown,
2026-10-05. The reason given is why it is on the list. **The character column is step 1's to
fill: none of it has been rendered yet.**

| Face (and the instance to render) | Why it is on the list |
|---|---|
| **Noto Serif Display, wdth 62.5, wght 700** | `qa-fixes.md` JP-085's option C, the "heavier" answer to the tester's "thin". Session 0 predicts it heavier than the frame (stem .189). |
| **Grenze** (`wght@100..900`) | A roman–blackletter hybrid: angled serifs and a narrow set, the nearest thing to *Fora*'s "sharp angles" on the list. |
| **Texturina** (`opsz,wght@12..72,100..900`) | Another roman–blackletter hybrid, with an optical-size axis for the 179 hero. |
| **Imbue** (`opsz,wght@10..100,100..900`) | A condensed Didone with optical sizes. The narrow, high-contrast skeleton, without the swash. |
| **Playfair** (`opsz,wdth,wght@5..1200,87.5..112.5,300..900`) | The frames' patch face's newer family, which has a width axis. Playfair Display ran 1.258 wide. Does wdth 87.5 bring it in? |
| **Cinzel** (`wght@400..900`) | Caps-only inscriptional capitals with wedge serifs, like Fisterra's caps-only design. Expected wide. |
| **Castoro Titling** | A caps-only titling cut. |
| **Elsie Swash Caps** | Swash capitals: the R and Q tails the tester points at. Expected decorative and wide. |
| **Almendra Display** | Calligraphic display capitals with an angular pen. |
| **Pirata One** | A condensed blackletter-leaning display: the far end of "sharp angles". Probably too far, but it marks the edge. |

Step 1 may drop a row that plainly fails (a cap height off by more than 10%, or a title width past
1.2 where the hero must fit 1440) without scoring it further, and may add a face it finds on the
way. Each addition gets the same `200` check and the same row.

**Licence check, per row.** Google Fonts serves OFL or Apache families, which allow web embedding
and self-hosting. Step 1 reads each family's licence on its Google Fonts page and records it in
the row. A face that is not OFL or Apache leaves the list.

**Trap: a face already in the link.** Fraunces (Retro) is pinned as
`opsz,wght,SOFT,WONK@144,900,100,1` (`data.js:37`'s comment), and its SOFT / WONK axes give
curled serifs. It is **not** on the list for that reason. Any second instance of a family the link
already carries changes the face the existing sites are served (the Fraunces rule, and Noto's).
A winner that is already loaded for another template needs its own instance check before step 3.

## How the face reaches the page

- **A Google Fonts entry, if the winner is a Google family** (every row above is). It replaces
  the Noto entry in `index.html` **and** `preview.html`, pinned to the instance the comparison
  chose (one width, and the weight range from its Regular to the Bold the three statements set).
  CLAUDE.md's *"Noto Serif Display is one Google Fonts entry, never a second"* becomes the
  winner's, with the same reason. A self-hosted `.woff2` is B's route (a bought licence), not
  this plan's.
- **The published tab clones the builder's styles** (`dressPublishedWindow`,
  `EncoreBuilder.jsx:4969`). A Google `<link>`
  already survives that, since Noto does. The check is that the new link's face renders in the
  popup, not the fallback, at first paint.
- **A new advance table in `data.js`**, the `NOTO_EM` shape: read off the rendered DOM in the
  harness, not canvas `measureText`, which sees neither a width axis nor an unloaded webfont
  (session 0's trap). Summed a character at a time it must land within ~2% of each measured
  label, and over, never under. The Bold statements get the Bold table's own ratio, measured, not
  Noto's 1.045.
- **`faceK` is re-measured, not assumed 1.** Session 0 kept Noto at 1 because its cap is the
  frame's within 1.4%. A winner whose cap is further off takes Grunge's `faceK` route
  (`vm.faceK`, the identity branch kept), and then every `faced` site under Editorial moves.

## Steps

0. **The harness.** Re-check every *Facts* line on the branch's HEAD. Re-derive the HEAD-vs-HEAD
   digest baseline (`../grunge/display-face.md` step 0's recipe: a worktree on :5174, the
   `cp -Rc` `node_modules`, themes 0–4, bare and `EXTRA='&live=1'`, the port and `?t=` normaliser):
   0 of N on each surface.
1. **Render and score.** In the headless shell, each row at matched cap height beside the frame's
   *KAI MERCER* render and the bio's 118 head. Fill the table's columns and the character column,
   and write a contact sheet into the scratchpad. Record each family's licence.
2. **The user's pick.** Show the renders (the frame, Noto 540, and the best three or four rows),
   with one `AskUserQuestion`. The answer is the face, its instance (width, weight), and whether
   Noto stays as the fallback in the `font-family` list. **Every width from step 3 on is the
   winner's.** If the user picks Noto 540 (no row is closer), this plan closes there with a reply,
   and nothing ships.
3. **The face.** `THEMES[3].display` / `label`, the link entry swapped in both HTML files, the
   stand-in comment rewritten. Then the advance table, replacing `NOTO_EM` / `notoEms` /
   `notoBoldEms` at every read (*Facts*), and `faceK` if step 1 says so. Expected after-diff:
   every Editorial file at every layout (theme 3 only); themes 0, 1, 2 and 4: 0.
4. **Re-measure, layout by layout.** Every Editorial head and fit at all four layouts and three
   widths: the hero and its JP-092 fit, the nav (`vm.navEms`, `navNameFit`), the layout-3 card
   (`cardNameEms`), `titleWordEms`, the form, testimonials and footer statements, the calendar
   month. Also the Noto quirks named in *Facts*, each on its own site. One commit per layout. Each
   Settled names the sites that moved, and why.
5. **Sweep.** The full two-build digest against `main`; `page-check.mjs Editorial 0,1,2,3`; the
   long-name set (*Kai Mercer*, *Florence and the Machine*, *Maximilian Featherstonehaugh*,
   *Supercalifragilistic*) at 360 / 390 / 414 / 768 / 1440 on cards 1–4; the build size; the root
   `index.html` refreshed in its own commit; `plans/README.md`'s row. Then the docs: CLAUDE.md's
   *Editorial's face* rule (the load-bearing list, `:467`), `notes/templates.md:131` on,
   `README.md:618`, `data.js`'s
   `sub: 'Noto Serif Display · paper & ink'` (`:182`, the picker's card subtitle), and a
   *reversed* pointer on `layout-1.md`'s *Settled in session 0* face bullet.

## For the reply and the designer

- **The reply, once step 5 is done:** the heads are now set in *the winner*, a free face chosen
  side by side against the design's Fisterra Fora for its shape (the angled serifs, the narrow
  set), because Fisterra still has no web licence. The PO still holds the licence question. If one
  is bought, the real face replaces this one.
- **For the designer:** the shipped face is a free stand-in, and the frames' patch face (Playfair
  Display) is not it either. Name the winner and its measured differences.
