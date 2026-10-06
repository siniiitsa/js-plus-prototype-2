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

*Amended again (2026-10-05, step 0).* PR #49 merged this branch, steps 1 and 2 included, and the
retest batch with it, so `main` (`55e3bfa`) already held `e31ef56`. The "rebase" was a
fast-forward of `editorial-display-face` to `55e3bfa`, and steps 0 and 3 continue on top of it.

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

   **Settled** (2026-10-05, HEAD `55e3bfa`).
   - **Every Facts line holds at `55e3bfa`.** Only the `EncoreBuilder.jsx` line numbers moved,
     by the retest batch: `navFace` `:712`–`713`, `vm.navEms` `:716`, `vm.navNameEms` `:728`,
     `vm.cardNameEms` `:738`, `vm.navCtaEms` `:739`, `vm.navNameFit` `:752`–`759`, the
     calendar month's `ems` `:1414`, `vm.titleWordEms` `:1206`–`1209`, the testimonials'
     `wordEms` `:1817`–`1818`, `vm.footerWordEms` `:1985`–`1986`, and `dressPublishedWindow`
     `:4980`. `data.js` (`THEMES[3]` `:180`–`201`, `NOTO_EM` `:677`, `notoEms` `:687`,
     `notoBoldEms` `:695`) and the two links (`index.html:11`, `preview.html:10`) are where
     *Facts* puts them. There is still no `@font-face` in `source/`.
   - **Baseline: 0 of 660 on each surface**, themes 0–4 × the 44 renders × three widths. The
     worktree of `55e3bfa` ran on :5174 (`cp -Rc` `node_modules`, its `.vite` removed), and the
     tree ran on a **fresh :5175**, not the user's long-running :5173, which can carry Noto
     shaping noise. With three ports in play, the normaliser's port rule is `localhost:517[0-9]`.
     Bare 0 of 660, `live=1` 0 of 660.
   - **The Bold census at HEAD**: the theme-3 rows set in Noto at a weight other than 400 are 17
     per surface, all at 700 and all at layout 1. They are exactly the three statements: the
     footer's `h2` (three widths × both pages), the form's `h2` and its two line spans (three
     widths), and the testimonials quote's `p` at 1440 and 768. At 390 the quote is the ramp's
     Regular. No other site would take a synthetic bold under a one-weight face.
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

   **Settled** (2026-10-05, on `55e3bfa`).
   - **The face.** `THEMES[3].display` / `label` are `'Gloock', serif`, and Noto is not in the
     list. The stand-in comment (`data.js:183`–`201`) says Gloock, the step-2 call, what it lacks
     (the R / Q tails, flared stems, N–N joins), the one weight and `faceK`.
   - **The link.** `family=Gloock` replaces the Noto entry in both files, after Fraunces in each:
     alphabetical in `index.html`, and Noto's old slot in `preview.html`. The digest loads only
     `preview.html`, so `index.html`'s full href was fetched on its own. It returned `200` with
     three Gloock `@font-face` blocks (cyrillic-ext, latin-ext, latin) and no Noto. In the
     harness the face loads, and every Gloock node computes 400.
   - **Trap 5 passes.** Gloock's latin subset maps `'`, `"`, `&`, `·`, `’ ‘ “ ”`, `#` and every
     digit (fontTools on the served `.woff2`). In the DOM, no character of the table renders
     differently under two fallback stacks, so none falls back.
   - **`faceK` is 0.967, not .965.** The I, H, E, F, L and T each ink 750 of 1000 at 1000px (a
     canvas bounding box and a pixel scan of the I agree), and OS/2 `sCapHeight` is 750 / 1000.
     .725 / .750 = .9667. Step 1's .751 was pixel rounding at 179px. `faced` / `facedLh` now
     scale every Editorial site that calls them, the identity branch kept for the others.
   - **The table is `GLOOCK_EM` plus `GLOOCK_KERN`, read by `gloockEms()`** (`data.js:678`–`731`).
     Both are read off the DOM: spans at 1000px in the loaded face, untracked. This is not
     NOTO_EM's shape, because Gloock kerns hard (VA is −0.163em). Its advances alone run 0–8.1%
     over a measured label (JULY 8.1%, VALE 7.6%), and 78 of 146 seeded labels and words came
     out over 2%.
     - The kerning is pairwise: a triple leaves no residual. 555 pairs are nonzero.
     - The table keeps every pair at −0.03em or tighter, plus the nine positive ones: 182 pairs.
       Pairs and advances are both rounded toward "over" at three decimals.
     - Summed that way, all 146 land **0–2.27% over, never under**; PEOPLE is the most, where
       Noto's worst was 2.1%. A .02 cut would keep 344 pairs for a 1.9% worst case.
     - The digits are proportional (1 is .326, 0 is .657), so each is listed. An accented
       capital is read as its base letter (NFD, marks stripped). Anything still unlisted takes
       .657, the widest digit.
   - **Every read is `navFace`.** Editorial's arm is `(x) => gloockEms(x) * 0.967`, which is
     Grunge's and Pop's shape: the ems are at the set size, because the sites are `faced`.
     `vm.titleWordEms`, the testimonials' `wordEms` and `vm.footerWordEms` now `.map(navFace)`
     for every template they serve. Lime's and Pop's arms were already `navFace`'s own
     functions, so their values do not change, and themes 1 and 4 digest 0. `notoEms`,
     `notoBoldEms` and `NOTO_EM` are gone, and no Bold table replaces them. The four
     comments at the reads are rewritten.
   - **The three Bold statements are set at `fontWeight: 400`**, not with
     `font-synthesis-weight: none`. With 400 the computed weight tells the truth, and the
     digest's weight column proves it: **0 Gloock rows at a weight other than 400**, against
     HEAD's 17 Noto rows at 700. Two of the three are `<h2>`s, so the explicit weight also stops
     them depending on the heading reset.
   - **Two fit sites are now `faced`.** The testimonials quote's and the footer statement's
     Editorial arms set their size raw, outside `faced`. Their ems now carry `faceK`, so raw
     they would overrun the column by 3.4%. Both are wrapped in `faced`, with
     `facedLh(s, frame ratio)` for the line height, so the frame's line box holds at the
     ceiling. The form's already went through the faced `disp`. A Range probe of each
     statement's widest word against its `inline-size` container fits at all nine (three
     statements × three widths), with 0.4–4.3px to spare where the fit binds. The line boxes
     read 47.90 for the footer at 768 (frame 47.9) and 42.96 for the quote at 1440
     (52.42 × .82 = 42.98).
   - **After-diff: 129 of 660 on each surface, all theme 3.** Themes 0, 1, 2 and 4 are 0, bare
     and `live=1`. The after-label against the tree's own pre-edit label (same :5175) gives the
     same 129, so none of it is server noise. No `Noto Serif` row remains. Three of the 132
     theme-3 files do not move: the layout-2 gallery at each width, which sets no display or
     label face under Editorial (Inter only).
   - **Census for step 4: each Gloock text row's font size against HEAD's.** On the bare
     surface, 965 rows scale by .967 (faced), 64 move by a fit that binds, and 37 do not move
     (`live=1`: 947 / 64 / 34). The 37 are the Editorial-only arms that still set a raw size:
     - **pricing layout 4**: the plan names and prices (37 / 36 / 30, six spans per width);
     - **testimonials layout 3**: the initials tiles (9 at 1440, 11 narrow);
     - **gallery layout 1 at 1440**: the head and the social rows (16: Gallery, YouTube,
       Instagram, TikTok).

     The fit-bound moves step 4 should look at first:
     - **Layout 1's capsule, and arch 4, which folds to the same design.** The links fall to
       their 12px floor (11.6 faced). The name then gives way (JP-091's rule), from 26.2 to
       16.8, and wraps, on the 1180 canvas.
     - **Layout 4's nav** falls to its floor: 13.7 → 11.6.
     - **The hero name** fits at 88.4 at 390 and 88.0 at 768 (Noto: 107 and 106.4). At 1440 it
       is 142.1, the faced 147.
     - **The three statements** sit at .860 of their Noto size wherever the word fit binds. So
       does the quote at 390 and 768, at .939 and .893.
     - **The layout-4 testimonials head** at 390: .905.
   - **Left for later, by design.** These items have not been changed:
     - The picker subtitle `sub: 'Noto Serif Display · paper & ink'` (`data.js:182`). It shows
       on the template card until step 5.
     - CLAUDE.md's *Editorial's face* rule (`:467`), `notes/templates.md:131` on, and
       `README.md:619`: step 5.
     - About 60 per-site Noto comments in `EncoreSection.jsx`, and the Noto glyph-floor lifts
       they explain (the 0.07–0.09em nudges, the J's 0.24em descender). Step 4 re-measures
       each one on its own site.
     - The published tab's first-paint check: step 5's sweep.
4. **Re-measure, layout by layout.** Every Editorial head and fit at all four layouts and three
   widths: the hero and its JP-092 fit, the nav (`vm.navEms`, `navNameFit`), the layout-3 card
   (`cardNameEms`), `titleWordEms`, the form, testimonials and footer statements, the calendar
   month. Also the Noto quirks named in *Facts*, each on its own site. One commit per layout. Each
   Settled names the sites that moved, and why.

   **The harness for every layout.**
   - The before-digest is a worktree of the previous commit on :5174, and the tree runs on a
     fresh :5175. Both surfaces, themes 0–4, normalised `localhost:517[0-9]` and `?t=`.
   - A third worktree, of `55e3bfa` (Noto, before step 3), runs on :5176. For every display-face
     text node of the layout at three widths, a Range probe reads its size, its line count, and
     any ink past the root or a clipping ancestor (or an ellipsis), under Noto and under Gloock.
     A site whose line count changed, or that newly clips, is a site to look at.
   - **Gloock sits higher in its line box than Noto.** Gloock's ascent is .975 and its descent
     .225; Noto's are 1.069 and .293. In a box of line height L, Gloock's baseline is L/2 + .375em
     down and Noto's L/2 + .388em. Faced (× .967, the line box kept by `facedLh`), Gloock's
     baseline stands **0.025em higher** than Noto's, and its caps 0.035em higher. Gloock's J
     descends .187em (.181 faced), not Noto's .240. So every Noto lift at layouts 2–4 (0.07–0.09em)
     is expected to shrink by about 0.025em. Each one is re-measured against its frame.

   **Settled, layout 1** (2026-10-05, on `73a8b73`). Line numbers are this commit's.
   - **Four user calls**, over the Noto-vs-Gloock probe and the frames' text nodes (`use_figma`,
     `absoluteBoundingBox` / `absoluteRenderBounds`):
     1. **The 1440 capsule name wraps: accepted.** The nine seeded links need 720px at their 12px
        floor, where Noto's needed 636. That leaves the name 66.8 of room, against the 157 that
        *KAI MERCER* needs at 26.2. So JP-091's rule sets it at 16.8 on two lines (arch 0, and
        arch 4, which folds to it). One line would need 10.5px links. Pop's seed already wraps
        the same way (`plans/pop/layout-1.md:1085`). No code change.
     2. **The 390 capsule name wraps: accepted.** *KAI MERCER* needs about 143 at 24.2, and the
        room up to the pill is 121. It was 133.9 under Noto: the pill's label is wider in Gloock
        too. JP-101 takes it onto two balanced lines and the bar grows by the line, as Noto's
        did at 360. No code change. `notes/nav.md`'s "every seed keeps its size and one line at
        390 and 414" is now Lime's, Grunge's and Pop's. That note is step 5's.
     3. **Pricing's 768 Book pill fits its label.** Fisterra sets BOOK NOW 88 wide at 19
        (`986:48245`). Gloock set it 104.8 (faced), so the pill needed 186.8 in its 182.7 card,
        and the seed wrapped onto two lines (JP-070's long-label rule). Now the label is
        `min(list, max(12px, (100cqi − 82) / s.tierRowCtaEms))`, with 67.24 for the 82 on the
        canvas (`EncoreSection.jsx:9759`). The pill's wrapper is the `inline-size` container,
        stretched to the card. `vm.tierRowCtaEms` is `navFace` of the label
        (`EncoreBuilder.jsx:827`). The ems are 5.9 against a measured 5.865. The seed sets at
        17.06 on one line at 768. 1440 (19.34) and 390 (17.41, the 18 ramp) do not bind.
        Recorded in `notes/pricing.md`.
     4. **The extra lines are accepted.** Three sites gain a line, and none overflows:
        - the bio's 390 head, *Reads the room.*, goes 1 → 2 lines (the frame's is one, 344 of 350);
        - the testimonials quote goes 3 → 4 lines at 1440 (the frame's three);
        - the quote goes 4 → 5 lines at 390 (the frame's four).

        Media's 390 track titles ellipsise further (*Echo & The Floor* too), but the frame clips
        both titles itself: its 197 and 191 boxes run past a 175.5 row.
   - **Gallery layout 1's 1440 source labels are faced** (`:14590`). This is the census's unfaced
     arm. The rows set Label/MD raw under Editorial, because `faced` was the identity under Noto.
     Gloock's cap stands 3.4% over Fisterra's, so the label is now `faced(s, …)` with
     `facedLh(s, 1.1)`: 16 → 15.47, and the 17.6 line box holds.
   - **Re-measured, unchanged:**
     - **The hero.** 1440 keeps its 147 (142.1 faced, 870 wide in its 880 column). At 768 the
       column fit binds at 88.0 (538.9 of 540; Noto's was 106.4). At 390 MERCER's widest-word fit
       binds at 88.4 (369.6 of 370; Noto's was 107).
     - **The three statements**: the form's, the testimonials quote and the footer's. Each fits
       its column with no overflow and no line-count change except the quote's, above.
     - **The calendar month.** Editorial's layout-1 month is not fitted, since `month.ems` is
       Pop's arm alone. All twelve months, `&today=2025-01-02` … `12-02`, hold one line in the
       row at all three widths, under both faces.
     - **No glyph lift exists at layout 1.** Gloock stands 0.025em higher than Noto there, so
       nothing at layout 1 sits lower than it did.
   - **Comments.** The five layout-1 comments that named Noto now name Gloock:
     - `Wordmark` (`:913`), `Title` (`:1246`), the bio's head (`:4407`) and the calendar's
       `disp` (`:16513`);
     - the hero (`:2231`–`2245`), its numbers re-taken in Gloock.

     `notes/nav.md`'s Noto lines (`notoEms()`, the 636px, the 390 seed line) are left for
     step 5, with `notes/templates.md`.
   - **After-diff: 4 of 660 on each surface, all theme 3, layout 1.** Themes 0, 1, 2 and 4 are 0,
     bare and `live=1`:
     - gallery arch 0 at 1440: the four source labels, size only;
     - pricing arch 0 at 768: the three pills on one line, so the section is 1.6 shorter;
     - pricing arch 0 at 1440 and 390: the pills' wrapper alone, now stretched to its card. The
       pill does not move.

     **The fit is width-sensitive.** On the editor's 1088 Desktop canvas, which `digest.mjs` never
     renders, the cards are narrower than at 1180, so the fit may bind on the seed there. Step 5's
     two-build digest should expect pricing rows to move, and that is not a regression.
     **The long-label path**, `&cj=` with `rowCta` *Start a long enquiry about this package*: at
     all three widths the label lands on the 12px floor (11.6 faced) and wraps, onto two lines
     at 1440 and 390 and three at 768. The pill's right edge is the card's content edge, to the
     0.1. The disc stays beside the text, and the pill keeps its 44.3 / 54.

   **Settled, layout 2** (2026-10-06, on `b547d31`). Line numbers are this commit's.
   - **The harness.** It was layout 1's, with two additions:
     - **An element-level line count.** The Range probe's per-text-node count missed the hero:
       *Kai* and *Mercer* are two text nodes of one line each. So every block-level display
       element's lines are also clustered off its text rects.
     - **A row-height sweep.** Every layout-2 text row, in any face, whose height moved
       between Noto's digest (`55e3bfa`) and Gloock's. It caught three Inter / Chakra Petch
       wraps that a wider Gloock neighbour caused.

     The frames' text nodes were read with `use_figma` (`absoluteBoundingBox` /
     `absoluteRenderBounds`) on `964:64598` / `986:15657` / `986:15676`.
   - **Seven user calls**, over the Noto-vs-Gloock probe and the frames' nodes:
     1. **The 1440 hero name wraps: accepted.** *KAI MERCER* needs about 600 at 93.8 in the 521
        column, so it sets two lines. Noto set one (490 at 97), and the frame sets *SIENNA VALE*
        on one (575 ink in its 636 box). JP-092's word fit is unchanged and binds on long names
        at every width with no overflow: *Supercalifragilistic* sets at 45.3 / 28.2 / 32.2,
        *Featherstonehaugh* at 44.8 / 27.8 / 31.8. No code change.
     2. **Three display lines are accepted.** None overflows. No code change.
        - The 768 face-card title, *The face of the act*, goes 1 → 2 lines. It needs about 199,
          and the frame sets it on one line, 162 in 183.
        - The 1440 media head goes 2 → 3 lines, FIVE / WORTH / YOUR EAR. The 768 head keeps
          two lines, but breaks after *worth*, not the frame's *your*: FIVE WORTH YOUR is 658
          of 648.
        - The 390 pricing head goes 2 → 3 lines.
     3. **The new ellipses are accepted.** No code change.
        - Newly cut: the media bar's seeded SLOW BURN (146.7 in 130 at 1440, 128.8 in 114.4
          at 390), the fan's *Manchester at 3am* and *Echo & The Floor* at 768 and 390, and
          the map's 390 *The Deaf Institute*.
        - Cut further: the repertoire's 390 *Don't Stop Me Now* and the map's 768 venues.
        - The frame clips its own bar title (*Slow Burn (Edit)* in 133.9). The two SLOW BURN
          departures (1440's dropped padding, 390's 11 gap) no longer save the seed, and are
          kept as they are.
     4. **The 390 calendar stack drops its margin** (below).
     5. **The calendar's pin is re-pinned to Gloock's widest mark** (below).
     6. **Three 390 wraps from a wider neighbour are accepted.** No code change.
        - The calendar foot's *Thursday evening selected* goes 2 → 3 lines beside the
          215.2 pill (Noto's was 198). The foot is 117.5 tall, against Noto's 98 and the
          master's 84.
        - The form's promise *Covers 120 mi from Manchester* goes 1 → 2 lines. Its column
          is 181.5 beside the wider credit name, where Noto's was 190 (the frame's line is 171
          in 192).
        - The map's Venue Link / Get Directions row wraps at 390 too: about 366 of 330, where
          Noto's 329 held one row. That is the fallback it already takes at 768, and it adds
          64px.
     7. *(Noted, not asked.)* **`vm.navFits` at 768 needs no change.** Its sum is Gloock's
        already (`navFace`). The four links' ems run 2.1% over the drawn row, never under. A
        page of five section links now takes the burger: Gloock 791.9 against 708, Noto 697.4.
        Four still fit (653.8). `notes/nav.md`'s "five in Editorial's layout 2" is step 5's.
   - **The calendar's mark lift is 0.05em, not 0.09** (`EncoreSection.jsx:17263`).
     - **The frame.** Fisterra's ink stands 0.124–0.138em above the 0.89 box's foot
       (`absoluteRenderBounds` of JUN 12 / JUN 20 at all three widths).
     - **Gloock, unlifted**, stands 0.072 / 0.082 / 0.085 above it at 1440 / 768 / 390. That
       is the baseline marker plus the canvas ink of the marks without their J.
     - **Lifted 0.05em**, the marks stand 0.121 / 0.130 / 0.133. The subtraction (0.09 −
       0.025) would have given 0.065 and set the marks 0.015em high.
     - **The J.** It ends 0.047 / 0.037 / 0.034em under the box's foot: 8.6 / 13.3px above the
       row's dash at 1440 / 768. At 390 it ends 0.8px above the stacked weekday's capitals.
     - **So the 390 `marginBottom` is gone.** It was Noto's 0.09em, rows 94.1. The rows are
       now **89.8 against the master's 90**, and the named departure retires (user call 4).
   - **The calendar's pin is `OCT 06`** (`:17192`, user call 5).
     - **What broke.** Noto's widest of all 12 × 31 marks was MAR 01: 288.3 at 1440, the
       frame's own 350 column. Gloock's is OCT 06: 357.2 at 1440 and 268.8 at 768 (canvas,
       kerned). The seeded JUN 20 (294) already outran the 289 pin, and stood its weekday 5px
       right of its neighbours (4px at 768).
     - **The fix.** The pin is `u(436)` (357.5) at 1440 and 269 at 768.
     - **Checked in the DOM.** Each of the 372 marks was swapped through a rendered mark: the
       widest is 355.3 / 267.4, none outgrows the pin, and every row's weekday stands at
       411.6 / 335.
     - **What it costs.** The column head's second cell stands at x 542, where
       the frame has 458. There is still no pin at 390.
   - **The map's venue reach is 0.02em, not 0.1** (`:20171`).
     - Gloock's J descends 0.187em. In the faced 1.1 box it ends 0.042 / 0.005em inside the
       foot at 1440 / 390, and 0.002em past it at 768 (`&cj=` *Jumpin Jacks*). Noto's 0.24em J
       ran 0.05em past.
     - At 0.02em the clip clears the J by 0.018em at 768, its tightest width. No box moves.
   - **Re-measured, unchanged:**
     - the 390 header pill, still Lime's `s.labelSm`, faced to 11.6;
     - the repertoire's row pins, since the head keeps its line boxes and lines;
     - the testimonials head, which still sets three lines at desktop (1382 in 1088, Noto's
       1134) and the masters' three and four at 768 and 390.
   - **Comments.** Every layout-2 comment that measured Noto now measures Gloock. A comment
     keeps Noto's number only as the history of a call: the header's pill (`:2576`), face card
     (`:2766`) and hero (`:2692`); media's head (`:7376`, `:7467`) and SLOW BURN (`:7585`,
     `:7608`); the repertoire (`:12863`); the calendar's pin (`:17155`), lift (`:17248`) and
     foot (`:17366`); the map's MANCHESTER (167.5, `:20037`), pill row (`:20108`) and J
     (`:20163`); and the testimonials (`:23409`, `:23423`).
   - **After-diff: 6 of 660 on each surface, all theme 3, layout 2.** Themes 0, 1, 2 and 4 are
     0, bare and `live=1`, and neither label holds an empty render:
     - the calendar at 1440 and 768: the pin widens the mark column, and the weekday and
       column head follow. The root does not move;
     - the calendar at 390: the four rows are 89.8, so the root is 831 → 814.3;
     - the map at all three widths: the venue spans' 0.02em padding alone.
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
