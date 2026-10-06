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

   **Settled, layout 3** (2026-10-06, on `724cb1c`). Line numbers are this commit's.
   - **The harness.** It was layout 2's. The probe list adds `&column=left` and `&column=right`
     at desktop for the bio, the media and the calendar. The bio and media stand in the 709
     column and the calendar in the 335 one. The frames' text nodes were read with `use_figma`
     on `964:68717` / `984:16811` / `984:16842`, and on the bio and calendar instances
     (`964:68728`, `964:68742`, `984:16820`, `984:16835`, `984:16851`, `984:16866`) by id. A walk
     of the page frames' children missed both instances. Two traps:
     - **Gloock's gain over Noto is not a flat 0.025em.** Blink rounds a face's ascent and
       descent to whole pixels, so per site the gain came to 0–0.037em. The 1440 map title rose
       0.037em, but the 768 and 390 titles measured as Noto's did, and so did the form's
       narrow price row. Every lift below is the single value that brings all three widths
       closest to the frame. None is a subtraction.
     - **The preview root is 1300 wide at every width.** A probe that reads "desktop" off the
       root's width scales the narrow renders by 1 / 0.82. Read the width off the query.
   - **Four user calls**, over the Noto-vs-Gloock probe and the frames' nodes:
     1. **The six lifts are re-measured** (below).
     2. **The bio's ID-card name is fitted to its widest word** (`EncoreSection.jsx:5346`). At
        1440 the name sets at 35.78 in the 146.8 cap (the frame's 179 × 0.82). Gloock's MERCER
        is 149.5 there (Noto's 126.1), so the name broke KAI / MERCE / R, in the 709 column too.
        Under Editorial the cap is now an `inline-size` container, and the name is
        `faced(min(Display/SM, 100cqi / s.cardNameEms))`. That is HeaderV2's card rule (JP-062),
        and it reads the vm key the card already reads, `navFace`'s widest word, which every
        section carries. The seed sets at 35.08, KAI / MERCER, as the frame sets SIENNA / VALE
        at 45. 768 (two lines) and 390 (one) do not bind. Lime and Grunge are untouched.
     3. **The 1440 portrait-card name wraps: accepted.** *KAI MERCER* needs about 158 at 25.37
        in the 147.6 measure, so JP-062 wraps it between words. Noto's 133 held one line, and
        the frame sets SIENNA VALE on one, 156 in its 157 box. The card does not grow. 768 and
        390 hold one line. No code change; the comment says so (`:3437`).
     4. **The extra display lines and ellipses are accepted.** None overflows. No code change.
        - The bio's 390 head, *Reads the room.*, goes 1 → 2 lines. The frame's is one, 344 of 346.
        - The media's 1440 head goes 2 → 3 lines, in the 709 column too. The frame's is two
          (`:8312`).
        - The form's head goes 3 → 4 lines at 1440 and 2 → 3 at 390. The section grows 86 and 43.
        - The testimonials quotes (Label/LG) go 3 → 4, 4 → 5 and 3 → 4 lines at 768, so the
          section is 35 taller. At 390 the quote goes 1 → 2 lines, 15 taller.
        - New ellipses: the media's 390 list titles *Manchester at 3am* and *Echo & The Floor*.
          The frame fits them, 194 in 201 and 178 in 202.
        - The repertoire's 768 *Don't Stop Me Now* is cut too: 194.7 of the stacked 174.6, where
          the frame sets it 172 in 174.7 (`:13573`). It is stacked since JP-044, so this is
          not a new layout. *(Reversed by JP-104, 2026-10-06: the 768 row is one row again,
          and the title wraps to two lines, so it is whole, 139.3 wide on two lines.
          `./layout-3-qa-fixes.md`, entry 5.)*
        - The row-height sweep found no Inter or Chakra Petch row that a wider Gloock
          neighbour wraps at layout 3.
   - **The lifts.** Each was re-measured against the frame's `absoluteRenderBounds` in the
     frame's em (the unfaced size). It is the ink floor over the box's foot unless noted. Every
     residual is under 1.3px.

     | Site | Frame 1440 / 768 / 390 | Gloock unlifted | Lift (Noto's) | Lifted |
     |---|---|---|---|---|
     | Calendar numeral (`:17811`) | .144 / .151 / .146 | .086 / .095 / .098 | **0.055em** (0.09) | .139 / .149 / .151 |
     | Calendar month (same `lift`) | .189 / .183 / .187 | .122 / .125 / .153 | 0.055em | .175 / .179 / .206 |
     | Pricing numeral over the `£`, frame px (`:11002`) | 7 / 2.1 / 0.3 | 0.9 / −0.1 / −2.0 | **0.08em** (0.09) | 5.9 / 3.3 / 0.8 |
     | Map panel title (`:21412`) | .238 / .228 / .248 | .207 / .165 / .172 | **0.055em** (0.07) | .260 / .218 / .225 |
     | Form head, last line (`:26985`) | .132 / .138 / .133 | .071 / .081 / .084 | **0.06em** (0.08) | .129 / .139 / .142 |
     | Form price row, baseline below the row top (`:27012`) | .828 / .860 / .804 | .878 / .920 / .913 | **0.08 × price** (0.09) | .798 / .840 / .833 |
     | Testimonials numeral row, baseline floor (`:24333`) | ≈.20 / .20 / .19 | .135 / .156 / .139 | **0.055 × numeral** (0.08) | .190 / .211 / .194 |

     - **The J of JUNE** (Gloock's 0.187em descender) clears "2025" by 6.5 / 7.5 / 8.3, where
       Noto at 0.09em cleared it by 4.6 / 6.7 / 6.6. The frames' gap is 14.8 / 15 / 14.
     - **The pricing call moved after the question.** The question put the 390 numeral at 0.7
       → 0.3, read through the root-width trap. Corrected it is 1.1 → 0.8. That is still
       nearer the frame's 0.3, so 0.08 stands.
     - **The map's row venues** (lh 1.2) measure 0.250 / 0.252 / 0.255em under both faces. They
       stay unlifted.
     - **The testimonials names** (lh 1.2) measure the same in both faces. **The quote** (lh
       1.1, last line) measures the same at 1440 and 768. At 390 it stands 0.071em higher than
       Noto's, where Noto read 0.05em low, so it now reads about 0.02em high (0.3px). Neither
       is lifted.
   - **The census's layout-3 arm stays raw, by its block's own rule.** The 9 / 11px initials it
     names are testimonials' stack faces (`face()`, `:24287`). The frame puts photographs in
     that seat, not a glyph. The block's comment keeps them unfaced because `faced` exists to
     land the frame's stated glyph in the frame's box, and no glyph is stated there. That holds
     for Gloock as it did for Anton. Layout 1's gallery labels were faced because their frame
     states Label/MD. The frame's IK / OB at 24 are the cells' 56 discs, which are already
     `faced` (19.34 at 1440).
   - **Re-measured, unchanged:**
     - **`vm.navFits` against the 684 bar.** Its sum is Gloock's already (`navFace`). As at
       layout 2, four section links fit (653.8, drawn on one row) and five take the burger
       (791.9; Noto's 697.4 took it too). With four links the capsule takes `max-content`, so
       the name stands at 705 against the row's centre of 650 (Noto's: 659).
     - **The header.** The card name holds one line at 768 and 390. The 1440 links stay on one
       row.
     - **The form's desktop word fit** (`titleWordEms`) does not bind: 93.8, the faced 97.
     - **The calendar** in the 335 column measures as at full width.
     - **No pin or `min-width` at layout 3 is sized to a display string.** The media's number
       slots are Inter.
   - **Comments.** Every layout-3 comment that measured Noto now measures Gloock. A comment
     keeps Noto's number only as the history of a call: the bio's head (`:5285`) and name
     (`:5346`); the header card (`:3437`); media (`:8312`); pricing's `disp` (`:10936`) and
     numeral; the repertoire's card (`:13534`) and stack (`:13573`); the calendar (`:17801`);
     the map title (`:21402`); the testimonials row; the form's block, `disp`, head and price
     row.
   - **`notes/form.md`** names Gloock's one table for the design-2 head and the layout-1
     statement, where it still named `notoEms` and `notoBoldEms`.
   - **After-diff: 16 of 660 on each surface, all theme 3, layout 3.** Themes 0, 1, 2 and 4 are
     0, bare and `live=1`, and neither label holds an empty render:
     - the bio at 1440: the name at 35.08 on two lines, so the root is 1107.3 → 1074.9,
       Noto's height again;
     - the calendar, pricing, map, form and testimonials at all three widths: the lifted
       spans and rows alone. No root moves.

   **Settled, layout 4** (2026-10-06, on `e8377c6`). Line numbers are this commit's.
   - **The harness.** It was layout 3's, with two changes:
     - **The probe list is arch=3** for the ten sections, three widths, bare and `live=1`.
       Layout 3's `&column=` renders were dropped, since layout 4 composes nothing.
     - **A root-height sweep.** It compares every layout-4 root between Noto's digest and
       Gloock's. It caught the 390 calendar wizard's pill row wrapping, which the three text
       checks cannot see: no text node changes its lines or its height when a whole pill
       drops to a row of its own.

     The frames' text nodes were read with `use_figma` on `964:73037` / `971:9537` /
     `977:13155`. Two more reads were needed:
     - the testimonials masters `971:9624` / `977:13491`, whose names a filter on the footer's
       *Component 2* had dropped;
     - the form's main component `725:3049`, since the 1440 page has no form instance.

     **Trap: Fisterra's R and Q tails run under the box.** KAI MERCER, ENQUIRE, YOUR NAME and
     the repertoire head ink 8–18px past their boxes' foot. So every frame floor is read off an
     untailed node of the same token:
     - Display/LG .89: the media, gallery and testimonials heads, .132 / .138 / .133;
     - Display/Title 1.1: GUESTS and *What's the occasion?*, .238 / .228 / .248;
     - Display/List 1.2: EMAIL, EVENT DATE and LOCATION, .279 / .303 / .320.
   - **Four user calls**, over the Noto-vs-Gloock probe and the frames' nodes. Every answer was
     the recommended option:
     1. **The lifts and J pads are re-measured** (below).
     2. **Pricing's plan names and numerals are faced** (`EncoreSection.jsx:11586`). This is the
        census's layout-4 arm: Editorial's `disp` set Display/SM raw (37 / 36 / 30), because
        `faced` was the identity under Noto.
        - The frame states Fisterra there, so the arm is now Grunge's: `faced` / `facedLh(s, 1)`,
          35.78 / 34.81 / 29.01. That is layout 1's gallery-label rule.
        - Raw, THE HOUSE PARTY (337.4) and THE WEDDING SET (345.0) took two lines in the 1440
          name's 335.4. Faced they are 326.3 and 333.7 on one line (1.7 spare), and THE
          FESTIVAL SET is 312.8.
        - The frame's own BESPOKE PRODUCTION wraps in its 409 too.
        - Recorded in `notes/pricing.md`.
     3. **The header: both wraps accepted.** No code change.
        - The 1440 capsule's nine links need 731 at their 12px floor (11.6 faced) and have 680,
          so they wrap onto two rows: `NavBar`'s documented layout-4 fallback (`:1945`).
        - Noto's 9 links needed 647 of 719 and held one row at 13.7. The frame sets eight links
          at 20 on one row.
        - The 390 name breaks KAI / MERCER, which needs 378.8 of the 350 column. The frame sets
          it on one line (302 in 350), and so did Noto (324.4). The root's height is fixed, so
          nothing below moves (`:3930`).
        - The 1440 name (870 in 806, KAI and MERCER on the frame's two lines) and the 768 name
          (633 in 708, one line) do not bind. **Answered by JP-109**
          ([`layout-4-qa-fixes.md`](./layout-4-qa-fixes.md) entry 2, 2026-10-06): the 768 line
          did not bind on the column, but it ran 72 under the seal's disc (E R), which this
          reading did not weigh. The 768 h1 is now boxed beside the disc and its line fitted 16
          short of it: the seed sets 88.93 on one line, ending 17 clear.
     4. **The other changes are accepted.** None overflows, and there is no code change but
        comments.
        - **The 390 wizard's pill row wraps at step 1.** Back 129 + Next Step 174.4 is 303.4 in
          the 290, where the frame fits 121 + 161. So Next Step takes its own line, 66 taller
          (root 1182.8 → 1248.7). Noto's 121.8 + 160.4 held one row until step 3's Send
          Enquiry (`:18847`, `notes/calendar.md`).
        - **The bio head** goes 2 → 3 lines at 1440 and 768. READS THE is 521 in the 469.8
          measure, and 574.7 in 572.9 at 768, so the 768 section is 80 taller. The frames set
          two lines (`:5929`).
        - **The media head** goes 1 → 2 lines: 1092 in the 1088 head at 1440, 822 in the 708 at
          768. The bands are 86 and 65 taller. The frame's own SIX WORTH YOUR EARS would wrap at
          768 too (802). The 1440 sleeve's LATE LIGHTS takes its second line, which `clamp2`
          allows (`:8770`).
        - **The map's 768 MANCHESTER, UK** goes 1 → 2 lines: 306 in its 276, 12 taller. The 1440
          and 390 frames wrap it themselves (`:22486`). *JP-110 (2026-10-06,
          [`layout-4-qa-fixes.md`](./layout-4-qa-fixes.md) entry 3): the 768 wrap is unchanged,
          since MANCHESTER, fits the 276 at the ramp. At 1440 and 390 Gloock broke it inside the
          word, and the value is now fitted to its widest word, MANCHESTER, / UK at 28.91 and
          16.52.*
        - **The testimonials head** goes 2 → 3 lines at 768, where SUCCESS STORIES is 605, 65
          taller. At 390 the word fit binds on SUCCESS at 43.44 (the faced 46.42; Noto's kept
          48), 8 shorter (`:24950`).
        - **New ellipses.**
          - At 390 the repertoire's DON'T STOP ME NOW, SEPTEMBER and SUPERSTITION lose a few px
            beside their artists, and I WANNA DANCE is cut further. The frame fits them.
          - At 768 the media list's *Manchester at 3am* and *Echo & The Floor* are cut further.
            The frame clips its own titles there at about 96 in 112.
        - The row-height sweep found no Inter or Chakra Petch row that a wider Gloock neighbour
          wraps at layout 4.
   - **The lifts.** Each was re-measured against the frame's `absoluteRenderBounds` in the
     frame's em: the ink floor over the box's foot. Each lift is the single value that brings all
     three widths closest to the frame in px, and every residual is under 0.85px. The unlifted
     floors come from a copy of `lift3.mjs` that reads the width off the query.

     | Site | Frame 1440 / 768 / 390 | Gloock unlifted | Lift (Noto's) | Lifted |
     |---|---|---|---|---|
     | Calendar's stacked Display/Title (`:18656`) | .238 / .228 / .248 | .208 / .166 / .173 | **0.055em** (0.09) | .261 / .219 / .226 |
     | Map numerals, the three numerals' mean (`:22486`) | .190 / .183 / .262 | .122 / .125 / .173 | **0.07em** (0.09) | .190 / .193 / .241 |
     | Pricing numeral, faced (`:11670`) | .180 / .175 / .180 | .122 / .125 / .153 | **0.045em** (0.07) | .166 / .169 / .197 |
     | Form head (`:27449`, shared with ENQUIRE) | .132 / .138 / .133 | .072 / .082 / .085 | **0.055em** (0.08) | .125 / .135 / .138 |
     | Form's ENQUIRE (same `lift`) | .238 / .228 / .248 | .208 / .166 / .173 | 0.055em | .261 / .219 / .226 |
     | Form labels (`:27456`) | .279 / .303 / .320 | .236 / .238 / .241 | **0.06em** (0.07) | .294 / .296 / .299 |
     | Testimonials head (`:24925`) | .132 / .138 / .133 | .072 / .082 / .097 | **0.055em** (0.08) | .125 / .135 / .150 |

   - **The repertoire's J pads** (`:14067`, `:14082`). They were measured with `&cj=` songs
     *Jumpin Jack* by *Jackson Jive*:
     - **The title's pad is 0.02em, not 0.1.** In its faced 1.1 box, Gloock's J ends 0.040 /
       −0.002 / 0.005em inside the foot at 1440 / 768 / 390, so the ellipsis clip would shave
       its hook at 768. This is the layout-2 map's venue reach: at 0.02em the clip clears the
       J by 0.017em at 768. No box moves, but the span's own height drops 2.1 (31.4 → 29.3 at
       1440), and the row's does not.
     - **The artist takes no pad.** In its 1.2 box the J ends 0.069em or more inside the clip.
       Noto's ended 0.010em inside, and took 0.1em.
     - The artist's 60% cap stands: the seed's widest, EARTH, WIND & FIRE, is 56% of the 390
       row in Gloock (Noto's was 51%).
   - **Re-measured, unchanged:**
     - **The titleWordEms heads.** The bio's (the 572.9 measure), the gallery's (the 454
       column), the repertoire's, the calendar's and the form's all set at the faced
       Display/LG at every width, so no fit binds. The one that binds is the 390 testimonials
       head (above).
     - **No pin or `min-width` at layout 4 is sized to a display string.** Pricing's 218
       price column is Fisterra's *Star Enquiry* pill, read off the frame.
     - **The seal's per-glyph spans** (KAI MERCER at 13.59) report a changed line count in
       both probes. They are the badge's ring, not a wrap.
   - **Comments.** Every layout-4 comment that measured Noto now measures Gloock. A comment
     keeps Noto's number only as the history of a call:
     - HeaderV3's name (`:3930`), the bio's head (`:5929`) and the media block (`:8770`);
     - pricing's block and numeral (`:11573`, `:11660`);
     - the repertoire's title, artist and head (`:14059`, `:14074`, `:14109`) and the gallery's
       head (`:16032`, `:16226`);
     - the calendar's block, pills and head (`:18641`, `:18844`, `:18918`);
     - the map's block and numerals (`:22307`, `:22480`);
     - the testimonials' block, lift and head (`:24744`, `:24920`, `:24950`);
     - the form's `disp`, `lift`, labels and head (`:27440`–`27456`, `:27618`);
     - the shared bio leading note (`:6150`).
   - **After-diff: 18 of 660 on each surface, all theme 3, layout 4.** Themes 0, 1, 2 and 4 are
     0, bare and `live=1`, and neither label holds an empty render:
     - pricing at all three widths: the faced names and numerals. At 1440 two names go back
       to one line, but the root holds 644.4, since the rows' height is the middle column's.
       768's root re-rounds 1276.1 → 1276;
     - the repertoire at all three widths: the 24 title and artist pads;
     - the calendar, map, form and testimonials at all three widths: the lifted spans alone.
       No root moves.
5. **Sweep.** The full two-build digest against `main`; `page-check.mjs Editorial 0,1,2,3`; the
   long-name set (*Kai Mercer*, *Florence and the Machine*, *Maximilian Featherstonehaugh*,
   *Supercalifragilistic*) at 360 / 390 / 414 / 768 / 1440 on cards 1–4; the build size; the root
   `index.html` refreshed in its own commit; `plans/README.md`'s row. Then the docs: CLAUDE.md's
   *Editorial's face* rule (the load-bearing list, `:467`), `notes/templates.md:131` on,
   `README.md:618`, `data.js`'s
   `sub: 'Noto Serif Display · paper & ink'` (`:182`, the picker's card subtitle), and a
   *reversed* pointer on `layout-1.md`'s *Settled in session 0* face bullet.

   **Settled** (2026-10-06, on `21e60fe`). Line numbers are this step's commit's.
   - **The harness digest, `main` (`55e3bfa`, :5176) against the tree (:5175): 129 of 660 on each
     surface, all theme 3.** Themes 0, 1, 2 and 4 are 0, bare and `live=1`, and neither label holds
     an empty render. The three unmoved theme-3 files are layout 2's gallery, which sets no Gloock.
     - **The root-height sweep** (row 2, column 5): every theme-3 root that moves past a ±0.1
       re-rounding is a call above. They are layout 1's four (the bio's 390 head; the form and the
       footer at 390 and the quote at 768 shorter by the statements' fit; the quote at 390), layout
       2's four (the 390 pricing head, calendar foot, promise and map pill row), layout 3's (bio,
       media, form, testimonials) and layout 4's (bio, media, calendar wizard, map, testimonials),
       but one.
     - **One move is step 3's, unnamed until now:** the layout-4 repertoire is 2.4 shorter at
       1440 (1323.2 → 1320.8). Each of its twelve rows is 0.2 shorter, because the titles' and
       artists' faced line boxes are (31.4 → 29.3 and 26 → 24). That is `faceK`, not a wrap.
     - **The row-height sweep** (`rowh.sh`, layouts 1–4) lists only rows the four Settleds name.
   - **The long-name set** on the published tab, `main` against the tree: the four names, cards
     1–4, 360 / 390 / 414 / 768 / 1440, 80 renders a build. For every name word, a `Range` reads
     whether it broke inside itself, ran past the page, or ran past a clipping ancestor. The page's
     `scrollWidth` and what scrolls it are read too, and so is the line count of each element whose
     whole text is the name.
     - **Found: the seeded page scrolled at 360.** The footer's 390 link columns are sized by the
       Book Now pill (194.1; Noto's 175) and SHOWS/COVERAGE (163; Noto's 136.7), so column 2
       ended at 383. A 360 page scrolled 23px sideways and a 375 one 8px, on every card and every
       name. At 390 the column ran 3px into the frame's 10 inset.
     - **User call 1: Pop's wrap arm** (`EncoreSection.jsx:28324`). At 390 the second column fills
       the row (`flex: 1 1 0`, `minWidth: 0`) and breaks after its slash (`<wbr>`), as Pop's
       frame draws it. At 360 / 375 / 390 / 414 the page no longer scrolls, and the column ends at
       350 / 365 / 380 / 392. The seed breaks SHOWS/ over COVERAGE at 390 too (159.9 wide; each
       text node is one rect, so the break is the `<wbr>`'s; the frame sets one line), and the
       footer's root holds 637.5. A footer-only digest moves theme 3's two 390 footer files on
       each surface, and Pop's does not move. Those two files were already among the 129 above,
       which were taken before this call, so the count holds. Recorded in
       `notes/footer.md`.
     - **User call 2: four long-name sites are named, not fixed.** Gloock takes each of them to
       more widths than Noto did:
       - **Card 2** (layout 2), *Maximilian Featherstonehaugh*: the form's credit runs past the page
         at 390 and 414 too (404.7 / 416.7), not only at 360, and so does the 390 header's Book
         pill arrow (397.2; 416.0 at 414). Noto's was 360 alone (`layout-2-qa-fixes.md`'s
         sweep).
       - **Card 3** (layout 3): the form head breaks FEATHERSTONEHAUGH and SUPERCALIFRAGILISTIC
         inside the word at 768 too. Noto broke them at 360–414.
       - **Card 3** (layout 3): the hero title (`HeaderV2`'s h1, which has no word fit) runs
         its long word past the well's clip at 768 too, by 100.5 (FEATHERSTONEHAUGH at 70.59) and
         88.1 (SUPERCALIFRAGILISTIC), where Noto's fitted. At 360–414 it runs 157–207 past, where
         Noto's ran 84–134. **Answered by JP-102**
         ([`layout-3-qa-fixes.md`](./layout-3-qa-fixes.md) entry 3, 2026-10-06): the h1 is fitted
         to its column's widest word, `min(ramp, 100cqi / cardNameEms)`, JP-092's shape, so the
         word ends inside the column and short of the card at every width, under Lime and Grunge
         too.
       - **Card 4** (layout 4): the bio's name breaks the long word at 390 and 414 too. Noto broke
         it at 360.
     - **Better than Noto:** on card 3 at 1440 and 768, the bio's ID-card name no longer breaks
       FLORENCE, MAXIMILIAN, FEATHERSTONEHAUGH or SUPERCALIFRAGILISTIC (step 4's `cardNameEms`
       fit).
     - *Kai Mercer* and *Florence and the Machine* break no word and scroll no page anywhere.
       Layout 1's capsule *Kai Mercer* is two lines at 390 and 414 (24.18) and at 360 (21.62),
       which is layout 1's call 2. Noto's wrapped at 360 alone.
   - **The published tab's first paint is Gloock.** CDP `CSS.getPlatformFontsForNode` on the
     header's h1 reads `Gloock (web)` from the first probe, +15ms after the popup opens, through
     `fonts.ready`. That holds on the dev server and on the built standalone (+84ms), on all four
     cards. `main` reads `Noto Serif Display ExtraCondensed (web)` as the positive control. The
     popup's link asks for `family=Gloock`, its loaded face is `Gloock 400` (latin), and no Noto
     file is fetched.
   - **The two-build digest** (`build-digest.mjs`, the root `index.html`, which is `main`'s build,
     `71bfc93` with no source change after it, against the new `dist-standalone`; one origin,
     `CARD=0`–`3`). Themes 0, 1, 2 and 4 are **0 rows** on all four cards at all three tabs, and
     every theme-3 file moves. The Tablet and Mobile roots move as the harness's do. The Desktop
     tab is the 1088 canvas, and its states are not regressions:
     - card 1: the header's and pricing's rows move with the face, and their roots hold
       (JP-091's name fit and layout 1's pill fit are among them, as expected). The gallery
       head's IN ACTION takes a second line there (+86). It holds one line at 1180.
     - card 2: no root moves.
     - card 3: the form head takes another line (+86) and the testimonials grow 15.
     - card 4: the two-row capsule, as expected; the media head (+86) and the 2.4 repertoire as
       at 1180. The pricing plans' middle column narrows 399.1 → 380 beside the wider *Start
       Enquiry* pill (215.3; Noto's 196.1), so the Chakra Petch feature chips of two plans take
       another row (+35 each). At 1180 they do not.
   - **`page-check.mjs Editorial 0,1,2,3`** on the built standalone: every card publishes, with no
     console error or warning. Card 1's full walk passes: every nav, anchor and footer link
     scrolls to its section, the audio plays, the form refuses and then fills its mailto, the
     390 overflow is 0, and the burger opens. Its control list is `main`'s build's, entry for
     entry.
   - **The build.** `npm run build` is clean. `dist-standalone/index.html` is 9,822,351 bytes
     against the root's 9,820,306 (+2,045). The face loads from Google, so the gain is code: the
     Gloock advance and kerning tables in place of Noto's, and step 4's fits.
   - **Docs.**
     - CLAUDE.md's *Editorial's face* rule names Gloock: one entry, one weight, never Bold.
       Noto's reason (a second entry lets 400 find a face of its own) does not hold for a
       one-weight family.
     - `notes/templates.md` covers the face, `faceK`, `gloockEms()`, the J at 0.187em, and every
       per-layout lift in Gloock's values, with Noto's beside them.
     - `notes/nav.md`: `gloockEms()`, four links at layouts 2 and 3, the 720px and the 390 seed
       lines.
     - `notes/calendar.md`: the 215.2 pill, leaving 30.
     - `notes/footer.md`: call 1.
     - `README.md`'s Editorial line.
     - `data.js:182`'s `sub: 'Gloock · paper & ink'`, the picker card's subtitle.
     - *Reversed* pointers on `layout-1.md`'s §1 heading and its *Settled in session 0* face
       bullet.
     - `plans/README.md`'s row.
   - **The root `index.html`** is refreshed from `dist-standalone/` in its own commit.
   - **Servers.** :5174's `wt724` worktree is removed. `wt55e` (`main`) remains for the PR's
     review.

## For the reply and the designer

*Written by step 5 (2026-10-06).* The plan's brief for each text is kept above them.

- **The reply, once step 5 is done:** the heads are now set in *the winner*, a free face chosen
  side by side against the design's Fisterra Fora for its shape (the angled serifs, the narrow
  set), because Fisterra still has no web licence. The PO still holds the licence question. If one
  is bought, the real face replaces this one.
- **For the designer:** the shipped face is a free stand-in, and the frames' patch face (Playfair
  Display) is not it either. Name the winner and its measured differences.

**The reply (JP-085).**

> Editorial's display and label type is now set in **Gloock**, in place of Noto Serif Display. It
> is still not Fisterra Fora: the computed font is Gloock, and nothing named Fisterra loads,
> because Fisterra still has no web licence. Gloock is a free face (SIL Open Font License, served
> by Google Fonts). We chose it by rendering over thirty free faces beside the design's *SIENNA
> VALE* and *READS THE ROOM.* and comparing them side by side. It came out closest in colour, contrast and
> tight fit, and its serifs are wedge-bracketed. No free face has Fisterra's tails on the R and
> Q, its flared stems or its joined N–N, and Gloock has none of them either. The change reaches
> every Editorial head, the wordmark, the nav links and the *Book Now* pills, on all four
> layouts. The PO still holds the licence question. If one is bought, Fisterra replaces Gloock.

**For the designer.**

> The Editorial frames name Fisterra Fora (a Fontspring demo, no web licence). The shipped face
> is **Gloock 400** (Google Fonts, OFL), a free stand-in chosen over the renders. The frames'
> patch face, Playfair Display, is not it either: it sets 22% wider than Fisterra. Measured against
> the frames:
> - **Cap height** .750 of the em against Fisterra's .725. Every Editorial size is set at 0.967
>   of its token, so the caps land on the frame's and the stated line boxes hold.
> - **Width.** At matched cap height Gloock sets *SIENNA VALE* 1.153 of the frame's width (Noto
>   1.066). Some heads take a line more than the frame:
>   - layout 1: the bio's 390 head, the testimonials quote at 1440 and 390, and the 1440 and
>     390 capsule names;
>   - layout 2: the 1440 hero name, the 768 face-card title, the 1440 media head and the 390
>     pricing head;
>   - layout 3: the bio's 390 head, the 1440 media head, the form head at 1440 and 390, the
>     testimonials quotes at 768 and 390, and the 1440 portrait-card name;
>   - layout 4: the bio head at 1440 and 768, the media head, the 768 MANCHESTER, UK, the 768
>     testimonials head and the 390 hero name.
>
>   Some seeded titles in narrow rows ellipsise further (SLOW BURN, *Manchester at 3am*, *Echo &
>   The Floor*, *Don't Stop Me Now*). At 390 the footer's second link column now breaks SHOWS/
>   over COVERAGE, where the frame sets one line.
> - **Colour.** Gloock's stem is .204 of its cap against Fisterra's .156, so it is darker. Its
>   thinnest stroke is .019 against .040, so it has more contrast.
> - **Character.** Gloock has no R or Q tails, no flared stems pinched at mid-height, and no N–N
>   joins. It has a lowercase where Fisterra is caps-only, so every Editorial string is
>   uppercased per site.
> - **One weight.** Gloock has only a Regular, so the three statements the frames set Bold (the
>   form's, the testimonials quote and the footer's) are set at 400, not a synthetic bold.
> - **The J** descends .187em, where Fisterra's sits on the line, so every glyph-floor nudge was
>   re-measured against the frames, per site and per width.
