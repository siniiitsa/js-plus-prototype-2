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

*Amended (user call, 2026-10-05).* Step 1 ran before the merge, at the user's word. The branch was
forked from `editorial-retest-qa-fixes` (`b20b969`), since this file exists only there. Step 1
touches no source. **Rebase it onto `main` once `editorial-retest-qa-fixes` merges, before step
0's baseline**, so the digests still carry no retest rows.

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

**The target.** Header `964:58612` at 1440: *SIENNA VALE* (not *KAI MERCER*; step 1 read the
node) in Display/XL (179, 134 tall), the
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

### Measured in step 1 (2026-10-05)

**The frame's title is *SIENNA VALE*, not *KAI MERCER*.** `964:58612`'s Display/XL node
(`I964:58612;446:372`, 877 × 134) sets the theme's own name. The bio's head (`I964:58613;446:1498`)
is *READS THE ROOM.* over three lines. Both were exported at 2× (`download_assets`, `defaultScale`
2) and scanned.

**The method, recalibrated on the frame.** Every candidate was rendered in the headless shell at
the frame's sizes (179 and 118, dpr 2, `font-optical-sizing: auto`). The scores are:
- **cap / em**: the I's ink height over the em.
- **stem / cap**: the I's narrowest run between 35% and 65% of its height. Fisterra's I flares,
  so its narrowest point is near the middle.
- **hair / cap**: the E's middle arm, the thinnest horizontal.
- **width**: *SIENNA VALE*'s ink width over its cap height, divided by the frame's (6.976).

The frame reads stem .156 and hair .040 by this method (session 0: .154 / .038), and Noto 540
reads stem .152. **The width column runs about 3.5% under session 0's** on every carried row: Noto
540 1.066 against 1.108, Oranienbaum 1.017 against 1.049, Gloock 1.153 against 1.191, Playfair
Display 1.217 against 1.258. The offset is uniform, so the order holds. Only the rows below were
taken by this method, so compare them with each other.

**Variable faces are scored at the weight whose stem matches the frame's** (interpolated off a
100-step sweep). All 36 families answered `200` from `css2` with the axes shown, except Bagnard,
which answered `400` and is not on Google Fonts. **Every one is OFL** (its `ofl/` directory in
`google/fonts`); none is Apache. The OpenType features were read off each family's TTF with
fontTools. **No candidate has capital ligatures, swash capitals on R or Q, or is caps-only.** Every
`liga` / `dlig` set is f-ligatures alone, which the uppercase transform never reaches. So the
frame's R tail (*READS*, and every R in the nav: TRACKS, REPERTOIRE, PRICING …), its Q tail and its
N–N joins have no free match on this list.

| Face, instance | cap / em | stem / cap | hair / cap | width | Character | Outcome |
|---|---|---|---|---|---|---|
| **Fisterra Fora** (the frame) | .725 | .156 | .040 | 1 | Condensed, high contrast, very tight fit; stems flared and pinched at mid-height; sharp wedge serifs; R and Q tails; joined N–N; caps-only | — |
| **Noto Serif Display, wdth 62.5, wght 540** (today) | .715 | .152 | .016 | 1.066 | Condensed, high contrast, open fit; straight stems, thin bracketed serifs; no swash; lowercase | **shortlist A** |
| **Noto Serif Display, wdth 62.5, wght 700** | .715 | .188 | .012 | 1.114 | 540's skeleton, darker, hairlines thinner still; stem 21% over the frame's | **shortlist B** |
| **Gloock** | .751 | .204 | .019 | 1.153 | High-contrast display, closest to the frame's dark colour and tight fit; wedge-bracketed serifs; no flare, no swash; one weight, stem 31% over | **shortlist C** |
| **Imbue, opsz 40, wght 630** | .701 | .155 | .040 | 0.724 | Condensed Didone, flat hairline serifs, tight; stem **and** hairline the frame's; sets 28% narrow; no flare, no swash | **shortlist D** |
| **Amarante** | .749 | .146 | .075 | 1.036 | Art-nouveau capitals: curved, flared strokes (the V and A), dark, tight; the frame's width; low contrast (hair ×1.9); one weight, no Bold | **shortlist E** |
| Imbue, opsz 10, wght 630 | .701 | .155 | .052 | 0.737 | D at a coarser optical size | D's twin |
| Imbue, opsz auto (100 at 179), wght 630 | .701 | .155 | .012 | 0.699 | D with hairlines as thin as Noto's | dropped for D |
| Grenze, wght 400 | .603 | .153 | .083 | 1.210 | Roman–blackletter hybrid, low contrast | dropped: cap −17%, width |
| Texturina, wght 580 | .704 | .151 | .087 | 1.340 | Hybrid, low contrast, wide | dropped: width |
| Playfair, wdth 87.5, wght 460 | .570 | .157 | .020 | 1.321 | wdth 87.5 does not bring it in | dropped: cap −21%, width |
| Cinzel, wght 560 | .701 | .155 | .052 | 1.345 | Inscriptional wedge serifs; caps-only (small caps for lowercase) | dropped: width |
| Castoro Titling | .701 | .116 | .048 | 1.324 | Caps-only titling, light | dropped: width |
| Elsie Swash Caps 400 | .802 | .129 | .035 | 1.029 | Ball-terminal swashes on S, I, E, A, L; not the R or Q | dropped: cap +11% |
| Almendra Display | .835 | — | — | 1.046 | An outline (hollow) face, so its stem reads the contour | dropped: cap, outline |
| Pirata One | .771 | .156 | .065 | 0.765 | Blackletter: the angular edge, as expected | dropped: character |
| Kalnia, wdth 100, wght 390 *(added)* | .709 | .154 | .020 | 1.401 | Flared Didone, wide at its narrowest | dropped: width |
| Limelight *(added)* | .690 | .360 | .053 | 1.301 | Art deco, heavy | dropped: width, stem |
| Lancelot *(added)* | .628 | .107 | .049 | 1.161 | Art nouveau, light | dropped: cap −13% |
| Yeseva One *(added)* | .701 | .235 | .036 | 1.316 | Heavy, curved | dropped: width |
| Rozha One *(added)* | .561 | .269 | .040 | 1.462 | Heavy Didone | dropped: cap, width |
| Marcellus *(added)* | .701 | .127 | .060 | 1.186 | Flared Trajan, light, low contrast | not shortlisted: light, wide |
| Bodoni Moda, wght 520 *(added)* | .751 | .152 | .004 | 1.236 | Hairlines vanish at 179 | dropped: width |
| Gilda Display *(added)* | .701 | .100 | .036 | 1.322 | Light Didone | dropped: width |
| Federant *(added)* | .726 | .165 | .073 | 1.193 | Art nouveau, near-sans N and V | not shortlisted: low contrast, wide |
| Abril Fatface *(added)* | .701 | .275 | .036 | 1.250 | Fat face | dropped: width |
| Smythe *(added)* | .648 | .103 | .060 | 0.813 | Condensed art nouveau, light; E / N / L / H / A alternates | dropped: cap −11%, light |
| Bigelow Rules *(added)* | .684 | .069 | .024 | 0.630 | Very condensed art nouveau, very light | dropped: light |
| Glass Antiqua *(added)* | .640 | .087 | .100 | 1.085 | Art nouveau, light, monoline | dropped: cap −12% |
| Prata *(added)* | .802 | .139 | .031 | 1.237 | Didone | dropped: cap, width |
| Federo *(added)* | .726 | .146 | .065 | 1.183 | Art deco sans | not shortlisted: no serifs |
| Gupter, wght 500 *(added)* | .628 | .142 | .071 | 1.279 | Text serif | dropped: cap, width |
| Young Serif *(added)* | .751 | .216 | .108 | 1.415 | Heavy, low contrast | dropped: width |
| Chonburi *(added)* | .701 | .291 | .044 | 1.457 | Heavy, wide | dropped: width |
| Rakkas *(added)* | .670 | .250 | .058 | 1.287 | Heavy | dropped: width |

Re-rendered from session 0, not re-scored: Oranienbaum (1.017), Instrument Serif (0.878), Noto Serif
text cut 500 (1.063), Playfair Display 400 (1.217) and DM Serif Display (1.230). None beat the
shortlist on the sheet.

**What each shortlisted face would cost from step 3 on**:
- **Gloock (C)**: one weight. The three Bold statements would get synthetic bold, or stay at 400.
  It sets 8% wider than Noto 540, so every head fit shrinks further. Its cap is 3.6% over the
  frame's, past Grunge's 2%, so `faceK` comes into play.
- **Imbue (D)**: the link has to pin `opsz` (40) and a weight range from 630 to the Bolds'. That
  top is about 800: stem .191, where Noto 700 is .188, the same 1.24× over the Regular. With `opsz` left on auto, the 179 hero clamps to 100 and
  the hairlines go back to .012. It sets 32% narrower than Noto 540, so the fits loosen. Its cap is
  3.3% under the frame's (`faceK`).
- **Amarante (E)**: one weight, no Bold, and its cap is 3.3% over the frame's (`faceK`).
- **Noto 700 (B)**: no new link. Every fit moves to `notoBoldEms`.

The contact sheets were written to step 1's session scratchpad, which did not outlive the session.
Seven sheets held every row. `shortlist.png` held the frame and A–E, each with the hero, the
bio's head and the nav row at 32 / 16 / 24. The scripts went with them. To redo it:
- puppeteer-core on the headless shell renders each face from its `css2` link at 179 and 118, dpr
  2, and the nav string at 32 / 16 / 24;
- PIL scans the ink against the frame's 2× export;
- fontTools reads the GSUB of each family's TTF from `google/fonts`.

**Trap: a face already in the link.** Fraunces (Retro) is pinned as
`opsz,wght,SOFT,WONK@144,900,100,1` (`data.js:37`'s comment), and its SOFT / WONK axes give
curled serifs. It is **not** on the list for that reason. Any second instance of a family the link
already carries changes the face the existing sites are served (the Fraunces rule, and Noto's).
A winner that is already loaded for another template needs its own instance check before step 3.

### Decided (step 2, user call over `shortlist.png`, 2026-10-05)

1. **The face is Gloock (C)**, chosen over Imbue (D), Amarante (E) and keeping Noto 540 (A). It was
   chosen knowing that no candidate has Fisterra's R / Q tails, flared stems or N–N joins. Gloock
   is the closest on the sheet in colour, contrast and tight fit. **Every width from step 3 on is
   Gloock's.**
2. **Instance: Gloock 400**, its only weight. The link entry is `family=Gloock`, replacing the Noto
   entry in `index.html` and `preview.html`. Gloock is in neither link today, so the Fraunces trap
   does not apply.
3. **Noto is dropped as the fallback.** `display` / `label` become `'Gloock', serif`, and the Noto
   Serif Display link entry is retired. CLAUDE.md's *Editorial's face* rule moves to Gloock.
4. **The three Bold statements are set at the Regular** (the form's, the testimonials' quote and
   the footer's). There is no synthetic bold, so step 3 sets their `fontWeight` to 400 under
   Editorial (or `font-synthesis-weight: none`; step 3 picks one and says why). `notoBoldEms`
   retires with no Bold table in its place: every fit reads the one Gloock table.

**What step 3 inherits from the pick**:
- Gloock's cap is .751 against the frame's .725 (+3.6%, past Grunge's 2%), so `faceK` is
  re-measured with ≈ .965 as the starting estimate.
- Its title is 1.153 of the frame at matched cap, against Noto 540's 1.066 (step 1's method), so
  every head fit shrinks further. JP-092's 390 hero fit and the long-name set at step 5 are the
  sites to watch.
- Trap 5: check that Gloock carries `'`, `"` and `&` before the advance table is measured.

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
