# Grunge display face — a distress mask over Anton

Working checklist for **JP-056 option C**: give Grunge's display type the worn texture of
Stones Crush without shipping Stones Crush. The glyph shapes stay Anton's. A mask over the
large display type punches the speckle into them. It works like the other plans here: **one
step per session, with context cleared between sessions**, and each session writes what it
settled back into this file.

**Why this and not the face** (user call, 2026-09-29, `retest-qa-fixes.md` JP-056 · JP-068):
there is no licence. Stones Crush (Ryan Creative) is free for personal use only on 1001Fonts,
and a "Stones Crush 2" on Creative Fabrica is unverified as the same face and as covering webfont
embedding (`qa-fixes.md` JP-056, *Facts gathered at triage*). **If a web licence is ever bought,
option B there replaces this plan.** The real face makes the mask redundant, and `faceK` goes to 1.

Branch: **`grunge-display-face`, forked from `main` after `grunge-retest-qa-fixes` merges**. It
is kept out of that batch because it moves every Grunge digest at all four layouts, and the
batch's digests have to stay readable. One commit per step. The root `index.html` is refreshed
once, by the sweep. `plans/README.md` lists it (the retest batch's sweep added
the row).

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then
`qa-fixes.md` JP-056 (the facts and options B, C and D), then [`layout-1.md`](./layout-1.md)
*Settled in session 0* (Anton, `faced()` at 0.75, the per-site `uppercase`), then the memory notes
`verifying-the-published-tab` and `browser-tool-choice`.

## What the tester will see, and what it is not

- **The letters are Anton's.** Anton's outlines, proportions and 0.75 scale do not change, and
  the speckle is cut into them. A tester comparing against Dev Mode will still find `Anton` in the
  computed `font-family` and no "Stones" in the build. The reply has to say so up front.
- **Display sizes only.** The nav links, the pills, the label-face chips and every `labelStyle`
  site stay clean Anton, because a mask eats thin strokes at 14–18px. Step 1 set the cut: the
  display keys and `title` take it, and so does the wordmark at its own Display/Title size. `list`
  and every label key do not.
- **Grunge only.** Themes 0, 1, 3 and 4 must digest **zero rows** at every step. That is the
  proof, as `faceK`'s identity branch was: a theme with no mask key gains no style.

## Facts (HEAD `1d93e07`, 2026-09-29)

- **The face.** `THEMES[2]` at `data.js:97`–`114`: `display` / `label` Anton, `faceK: 0.75`,
  and the stand-in comment at `:99`. `index.html` and `preview.html` load Anton from Google Fonts.
  There is no `@font-face` anywhere.
- **The scale.** `faced()` / `facedLh()` at `EncoreSection.jsx:104`–`105`. There are 68
  `faced(s, …)` call sites. `labelStyle` (`:106`), `Title` (`:898`) and `Wordmark` (`:552`) apply
  the scale centrally. There are 173 `fontFamily: s.display` sites file-wide, across every
  template. The Grunge-reaching subset is step 1's census.
- **The ramp.** `THEME_RAMP.Grunge` at `EncoreBuilder.jsx:121`–`125`. Here it is at the size
  that renders, which is the token × 0.75 (`faced`):

  | Key | Desktop (canvas px) | Tablet | Mobile |
  |---|---|---|---|
  | `dispXl` | 121.5 | 71.25 | 39 |
  | `dispLg` | 80.25 | 60.75 | 34.5 |
  | `dispMd` | 44.25 | 37.5 | 28.5 |
  | `dispSm` | 30.75 | 30 | 22.5 |
  | `title` | 22.5 | 21 | 19.5 |
  | `labelLg` | 15 | 12 | 10.5 |
  | `labelMd` / `labelSm` | 12 / 9.75 | 10.5 / 9.75 | 9.75 / 9 |

  Desktop is the canvas's 0.82. The published tab zooms it up to 1:1 at 1440 (× 1.22), so a
  published desktop head is larger than the table says. `dispXl`–`dispMd` take the mask at every
  width. **`dispSm` and `title` at 390 are the measurement.** Labels never take it.
- **The digest does not see a mask.** `scripts/digest.mjs`'s row (`:52`–`55`) and
  `build-digest.mjs`'s own copy (`:39`) read `backgroundImage`, `transform` and `boxShadow`, but
  not `maskImage`. A mask-only change
  therefore digests as **zero**, and an after-diff would prove nothing. Step 0 fixes that
  (the rows are now `digest.mjs:53`–`61` and `build-digest.mjs:39`–`44`).
- **Where assets may live.** `EncoreSection` imports `lucide-react` and nothing else, and
  `photos.js` is the only module that imports the files in `src/builder/photos/`. `data.js` is
  pure data, so a string constant can live there, but an image file cannot.

## The two candidates

The comparison is step 2, and it ends on a **user call over two renders**, as session 0's face
pick did.

- **A. An inline-SVG noise mask, no raster.** A `data:image/svg+xml` URI whose SVG is
  `feTurbulence` (`type="fractalNoise"`, a **pinned `seed`**, so the digest and every screenshot
  are deterministic) → `feColorMatrix` (luminance into alpha) → `feComponentTransfer` / `feFuncA
  type="discrete"` (a threshold that keeps most of the ink and drops speckles and scuffs). It is
  set as `mask-image` **and** `-webkit-mask-image`, `mask-repeat: repeat`, with `mask-size` in
  `em` (one tile per few ems). That way the speckle scales with the type, and a 121px head and a
  39px head wear the same texture.
  - It needs nothing in `photos.js` and adds a few hundred bytes to the single-file build.
  - The cost to measure is **paint**: an SVG filter inside an image is rasterised per element and
    per size. There are 30+ display nodes on a Grunge page, and the published tab adds a `zoom`.
    Measure a scroll and a Publish, not just one frame.
  - The risk to look at: noise reads as noise, not as the frame's worn stamp. The threshold and
    the frequency are the two knobs.
- **B. A raster cut from the frame's own glyphs.** A greyscale tile exported from a Grunge
  master's display head (the header's "STATIC YOUTH" at 1440 is the largest clean sample), with
  the outline removed so only the distress remains, then put in `src/builder/photos/` and resolved
  through `photos.js`.
  - It matches the frame's texture exactly.
  - **It has its own licence question**: the texture is derived from renders of a
    personal-use-only face. That is arguably the problem this plan exists to avoid. Name it to the
    user at the comparison, and to the PO if B wins.
  - It adds bytes to the single-file build (note the size), and it needs a tile that repeats
    without a visible seam.

**Recommended going in: A**, unless its render reads as noise where B reads as the design. The
licence point alone argues for A.

## How the mask reaches the page

- **A vm key, not a constant in `EncoreSection`.** `sectionVm` sets `vm.distress` under Grunge
  only. It is a CSS value (the `url(…)` string, and the tile size if the helper wants it) and is
  undefined on every other theme. For A the SVG string is a constant in `data.js`. For B the file
  goes through a resolver in `photos.js`. `EncoreSection` never knows which.
- **A helper beside `faced()`**, `distressed(s, style)` or similar. It spreads the mask
  properties into a style when `s.distress` is set and returns the style untouched otherwise, so
  every non-Grunge render is byte-identical. Gate by **ramp key at the call site**, not by parsing
  a px value: the sizes reach `faced` as numbers, `'28px'` strings and `u(…)` calls alike, and the
  cut is a question of which key a site sets.
- **On the element that paints the text and nothing else.** A mask cuts everything its element
  paints: background, ring, underline, rule. So it goes on the innermost element whose only
  paint is the glyphs. **On a two-tone title (STATIC in white, YOUTH in red) that is each span**,
  not the `h1`, and the two spans must read as one texture. Check that the tile's phase does not
  visibly restart at the word break, and fix it with `mask-position` if it does. A head standing
  on its own pill, band or box takes the mask on its text span, never the box.
  *Superseded by step 1's Settled:* every setter in the cut paints only glyphs, so the mask goes
  on the `h1` / `h2` itself, one tile across both tones, and no site in the cut stands on a box.
- **Casing and fits are untouched.** `textTransform`, `faced`, `facedLh`, `antonEms` × 0.75,
  `vm.navFits` and every head fit keep their values. A mask moves no geometry.

## Steps

0. **The harness, and teach the digest to see a mask.** Add `cs.maskImage` (sliced as
   `backgroundImage` is), `cs.webkitMaskImage` and `cs.maskSize` to `digest.mjs`'s row
   (`:52`–`55`) and to `build-digest.mjs`'s, which keeps its own copy (`:39`). A data URI sliced
   to 50 characters reads the same at every site, so the size column is what lets a diff tell the
   sites apart. Re-run a HEAD-vs-HEAD digest on :5174: it must come out 0 of N. After that, every
   file's rows have three more columns, so **step 0 re-bases** and all later diffs are against the
   taught digest.

   **Settled** (2026-09-29, `grunge-display-face` forked from `main` `739f060`; the Facts
   above were taken at `1d93e07`).
   - **Four columns, not three.** After `opacity` and before `src` and the text, both scripts
     now record `maskImage` and `webkitMaskImage` (each sliced to 50), `maskSize`, and
     **`maskPosition`**. The last is the plan's own fix for a tile phase restarting at a word
     break (*How the mask reaches the page*), and adding it at step 4 would have meant a second
     re-base. `mask-repeat` is not recorded. The helper sets `repeat`, which is the default,
     so that column would never move. A bare row reads `…|none|none|auto|0% 0%|<src>|<text>`.
   - **Positive control.** On a Grunge header `h1` in the headless shell (Chrome 151), a mask
     set by hand moved all four columns, and `mask-size: 3em 3em` computed to `364.5px 364.5px`
     (3 × `dispXl`'s 121.5). The size column reads the px size, so it tells a 121px head from a
     39px one.
   - **The app already carries masks, and the digest now sees them.** There are 28 rows at HEAD
     across both surfaces, all Grunge (theme 2) and all `linear-gradient` fades on grain or photo
     layers: `EncoreSection.jsx:1654`, `:3900`, `:5250` and `:5946`, reaching header arch 0 / 4,
     bio arch 0 / 3 and media arch 0 (media reads `rgba(0, 0, 0, 0.45) 0%…`, the others
     `rgba(0, 0, 0, 0) 0%…`). Chrome mirrors the unprefixed property into
     `webkitMaskImage`, so both columns carry them. Two consequences:
     - Step 4's "mask columns only" after-diff expects these 28 rows **unchanged**, and the new
       rows to be **new** `url("data:image/svg+xml…` values on text elements.
     - Step 1's census marks these four nodes, so that step 3's helper never spreads a mask
       onto an element that already has one. They are layers, not text, so no display site
       should meet them.
   - **Proof: 0 of 660 per surface, 2,640 renders compared.** Themes 0–4 × all 44 renders
     (43 layouts and the footer at `&page=2`) × three widths, canvas and `live=1`.
     - A second run on :5174 against the first, **raw with no normalising**: 0 of 660 canvas,
       0 of 660 live.
     - The tree on :5173 against :5174, normalised: 0 of 660 and 0 of 660.
   - **The normaliser, and the trap it fixes.** The 40-character `src` slice cuts a Vite HMR
     stamp to `?t` or a bare `?`, depending on the filename's length (`editorial-hero.jpg?t`,
     `editorial-stage.jpg?`). A `\?t=[0-9]*` pattern misses both and reported 44, then 23,
     phantom Editorial diffs per surface. What works is
     `sed -E 's/localhost:517[34]/localhost:PORT/g; s/(\.(jpe?g|png|svg|webp|gif))\?[t=0-9]*/\1/g'`
     on both sides. A fresh server stamps nothing: the :5174 files carry none, and the long-running
     :5173 stamps 88.
   - **Harness noise.** One run died on puppeteer's `Attempted to use detached Frame`, which
     `digest.mjs`'s retry does not match. Rerunning the label cleared it.
   - **The baseline is a recipe, not a directory**, because the session scratchpad does not
     outlive the session. Every later step re-derives it:
     1. `git worktree add --detach <scratchpad>/head 739f060`
     2. `cp -Rc source/node_modules` into it, then `rm -rf` its `node_modules/.vite`
     3. `npx vite --port 5174 --strictPort` in its `source/`
     4. This branch's `scripts/digest.mjs` with `BASE=http://localhost:5174`, themes
        `0,1,2,3,4`, bare and with `EXTRA='&live=1'`: 660 renders each
     5. Diff each against the same labels on :5173 through the normaliser above.

     A registration left behind by an earlier session's scratchpad is cleared with
     `git worktree prune`.
   - `build-digest.mjs` takes the same four columns. It passed `node --check` but has not been
     run; step 5's two-build digest is its first run. Its old-vs-new comparison is between two
     builds that both carry the columns, so it needs no re-base of its own.
1. **The census and the cut.**
   - Grep every display-face site that Grunge reaches: `Title`, the Grunge `Wordmark`, and each
     direct `fontFamily: s.display` inside an `s.grunge`, `(s.lime || s.grunge)`, `s.limeTree`,
     `(s.retro || s.grunge)` or `s.designed` path. Record each site's ramp key and the element
     that paints only its text.
   - Then render the frame's 390 `dispSm` and `title` heads with and without a trial mask, and
     set the cut. The wordmark is measured here too.
   - Write the list into this file, as the census `qa-fixes.md`'s JP-057 kept.

   **Settled** (2026-09-29, HEAD `95d109a`; every line number below is that tree's
   `EncoreSection.jsx`).
   - **The recipe (reusable).** A scratch worktree of HEAD had every non-comment `s.display` and
     `s.label` rewritten by `perl` to `(s.display + ", 'D<line>'")` / `'L<line>'`. That is a
     font-family nobody has, appended to the list, so it renders nothing and rides the cascade.
     It was served on :5175 and walked by a puppeteer probe (theme 2, all 44 renders, three widths,
     canvas and `live=1`, 264 renders): every element with its own text whose computed family is
     Anton, read off the tag at the end of its family. **Positive control: 0 untagged rows**, so no
     Grunge display text reaches Anton any other way (`sectionVm`'s `display: T.display` at
     `EncoreBuilder.jsx:338` is the only route). **71 of the 191 `s.display` lines reach Grunge.**
     Shared helpers (`disp`, `display`, `dispType`, `type`, `face`) tag their definition, so their
     call sites were read by hand.
   - **The cut: by key.** `dispXl`, `dispLg`, `dispMd`, `dispSm` and **`title`** take the mask, at
     every width. `list` and every label key do not, and neither does any `labelStyle` site. The
     title key includes the frames' literal Display/Title, `u(36)` / `28px` / `26px` (the
     `titleSize`, `title`, `nameSize`, `kicker` and `tk.title` consts). The rendered sizes split
     cleanly: every site in the cut renders at **19.5 px or more** and every site out of it at **15
     or less**, with **nothing between 15 and 19** in 2,273 rows. **The cut holds only for a mask
     no denser than the trial's light setting** (below). Under the heavy one, `title` at 390 broke
     up ("BOOK ME", "CRAZY IN LOVE"), so step 2 re-checks `title` at 390 / DPR 1 for whichever
     candidate wins, and B's raster especially.
   - **The trial (step 2 starts from these bytes).** A 240 × 240 SVG:
     `<filter id='n' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise'
     baseFrequency='0.09' numOctaves='3' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0
     0 0 1  0 0 0 0 1  0 0 0 0 1  3 0 0 0 -1'/><feComponentTransfer><feFuncA type='discrete'
     tableValues='…'/></feComponentTransfer></filter><rect width='100%' height='100%'
     filter='url(#n)'/>`, URI-encoded, set as `mask-image` and `-webkit-mask-image` with
     `mask-size: 4em 4em`. **Light** is `tableValues='0 1 1 1 1 1 1 1'`, which cuts about the
     lowest eighth. **Heavy** is `'0 0 1 1 1 1'`.
     - The shots are at 390, DPR 3 (a phone) and DPR 1 (the worst case), against Figma's
       `986:44076`. The frame's Stones Crush speckles its 30 px head and, faintly, its label-size
       "THE HOUSE PARTY".
     - **Light:** `dispSm` reads like the frame at both DPRs. `title` at 19.5 is scuffed but
       legible at DPR 1. The wordmark at 21 holds. `list` at 13.5 is blotchy, and a 9 px label
       breaks up.
     - **Heavy:** the display keys read as stamped, and `title` does not survive.
   - **The wordmark takes it at its own size, not at a label size.** The Grunge `Wordmark`
     (`:562`–`:580`) is Display/Title: it renders at 22.1 / 21 / 21 in header 1 (arch 0 and its fold, 4).
     Header 4's `NavBar` (`:3336`) passes `nameSize = s.labelLg`, which renders at 15 /
     12 / 10.5 and stays clean. **Trap for step 3:** at 390, `NavBar` (`:1473`) *also* passes an
     explicit `size`, `'28px'` (the `lime && s.mob` arm), so the gate cannot be "was `size`
     passed". Either `NavBar` passes the key (or a flag) through, or the helper cannot tell header
     1's 390 wordmark from header 4's label. The nav *links* stay clean.
   - **Decided: the mask goes on the element that sets the face, never on its spans.** This
     reverses *How the mask reaches the page*'s "on a two-tone title that is each span".
     - Every font-setting element at 19 px or more, 333 of them over theme 2's 132 canvas renders,
       was probed. None paints a background, border or shadow, and none holds an `svg`, an `img`
       or text in another face. So the `h1` / `h2` / `p` that carries the style paints only
       glyphs.
     - One mask there gives the two-tone and two-line heads **one continuous tile**, so the
       word-break phase seam never arises. Step 0's `maskPosition` column becomes a guard, not
       the fix.
     - Every display site that *does* paint a box is a `list`-size pill or a footer row (the
       form's four submit pills, calendar 4's Back / Next Step, map 2's Get Directions ring, the
       footer's `face` rows). All of them are out of the cut, so no site in the cut needs a
       text-span split.
     - The helper must not be spread onto both a setter and its child: a nested mask multiplies.
   - **One ink edge, step 4's.** A solid mask (`linear-gradient(#000,#000)`) on each of those 333
     was diffed against none. It changed pixels on **two**: map layout 4's stat values at desktop
     (`:20106`, 5 px and 2 px). Anton's text box is 46 px in their 41 px line box, and the mask
     clips to the border box. `mask-clip: no-clip` changed nothing in this Chrome (151). Padding
     plus a negative margin would move a geometry row, which step 4's after-diff forbids, so step
     4 names the fix before making it.
   - **The four existing masks** (`:1654`, `:3900`, `:5250`, `:5946`) are all `Grain` layers.
     No text element sat under any mask in the 264 renders, and no display site is one of them.
   - **Named for the user at step 2, not decided here: label-face sites at `title` size.** Five
     sites set Anton at exactly the cut's `title` sizes (22.1 / 21 / 19.5) through `labelStyle` or
     `s.label`, so by key they stay clean beside a distressed venue or track title of the same size:
     - `:5789`, media 1's track titles (`rowTitle`, "Label/LG");
     - `:10778`, repertoire 1's song titles (`bebas`);
     - `:17135`, map 1's kicker ("12 mile radius");
     - `:20568`, testimonials 1's name and role;
     - `:21913`, testimonials 3's quote, `disp(s.label, G.quote)`, the cell's main text.

     The frame's face distresses all of them, so key versus rendered size is a real choice.
   - **The census.** "In" means the mask goes on this line's element. The element is the one that
     sets the face unless the row says otherwise. Sizes are the 390 render, the faced px.

     | Line | Section · layout | Node | Key (390 px) | In |
     |---|---|---|---|---|
     | `:906` (`Title`) | header, every layout | `h1` (two spans) | the header's `size` / `s.h1` (34.5–71.25) | yes |
     | `:577` (`Wordmark`) | header 1 (arch 0, 4) | `span` | Display/Title literal (21) | yes |
     | `:577` via `:3336` | header 4 | `span` | `labelLg` (10.5) | no |
     | `:2133` | header 2 (arch 1, 5) | card title `span` | `list` (13.5) | no |
     | `:2724` | header 3 | location `span` | `list` | no |
     | `:2806` | header 3 | card name `span` (+ span) | `nameSize` title (19.5) | yes |
     | `:3237` | header 4 | kicker `span` | `kicker` title (19.5) | yes |
     | `:3254` | header 4 | location `span` | `list` | no |
     | `:3824` | bio 1 | `h2` (two spans) | `dispLg` (34.5) | yes |
     | `:4615` | bio 3 | name `p` (+ span) | `dispSm` (22.5) | yes |
     | `:4744` | bio 3 | `h2` | `dispLg` | yes |
     | `:5171` | bio 4 | `h2` | `dispXl` (39) | yes |
     | `:5265` | bio 4 | name `p` (+ span) | `dispSm` | yes |
     | `:5722` | media 1 | `h2` (two spans) | `dispLg` | yes |
     | `:6429` | media 2 | track `span`s (`titleType`) | `tk.title` (19.5) | yes |
     | `:6456` | media 2 | `h2` | `dispLg` | yes |
     | `:6494` | media 2 | list names | `list` | no |
     | `:7258` | media 3 | list names (`listName`) | `list` | no |
     | `:7265` | media 3 | track `span`s (`titleType`) | title literal | yes |
     | `:7279` | media 3 | `h2` | `dispLg` | yes |
     | `:7717` | media 4 | now-playing `span` | `tk.title` (21) | yes |
     | `:7788` | media 4 | tile names | `tk.list` (14.3) | no |
     | `:7823` | media 4 | `h2` | `dispLg` | yes |
     | `:8393` | pricing 1 | `h2` (text + span) | `dispSm` | yes |
     | `:8487` | pricing 1 | amount `span` | `dispSm` | yes |
     | `:8936` / `:9001` / `:9010` (`disp`, `:8913`) | pricing 2 | `h2` · plan name · price | `dispMd` · `dispSm` · `dispMd` | yes |
     | `:9602` | pricing 3 | row name | `list` | no |
     | `:9631` | pricing 3 | numeral | `dispMd` (28.5) | yes |
     | `:9695` | pricing 3 | `h2` | title literal | yes |
     | `:10196` / `:10251` (`disp`, `:10178`) | pricing 4 | name · price | `dispSm` | yes |
     | `:10822` | repertoire 1 | `h2` (text + span) | `dispLg` | yes |
     | `:11398` | repertoire 2 | `h2` | `dispSm` | yes |
     | `:11489` | repertoire 2 | song titles | `list` | no |
     | `:12051` | repertoire 3 | song titles | `list` | no |
     | `:12082` | repertoire 3 | `h2` | `dispLg` | yes |
     | `:12456` | repertoire 4 | song titles | `titleSize` (`:12400`) | yes |
     | `:12463` | repertoire 4 | artist | `list` | no |
     | `:12491` | repertoire 4 | `h2` | `dispLg` | yes |
     | `:12900` | gallery 1 | `h2` (two spans) | `dispLg` | yes |
     | `:12961` | gallery 1 | source rows (desktop only) | `list` | no |
     | `:13993` | gallery 3 | `h2` | `dispLg` | yes |
     | `:14396` | gallery 4 | `h2` | `dispLg` | yes |
     | `:14786` / `:14811` (`disp`, `:14718`) | calendar 1 | month · `h2` | `dispSm` · `dispMd` | yes |
     | `:15319` / `:15374` (`disp`, `:15282`) | calendar 2 | slot mark · `h2` | `dispLg` · `dispMd` | yes |
     | `:15839` · `:15852` · `:15860` | calendar 3 | `h2` · numeral · month | title literal · `dispLg` · `dispSm` | yes |
     | `:16616` · `:16635` · `:16781` · `:16794` · `:16811` (`disp`, `:16578`) | calendar 4 | card head · big value · sent title · step title · `h2` | `titleSize` ×4 · `dispLg` | yes |
     | `:16743` | calendar 4 | Back / Next Step pills (paint) | `list` | no |
     | `:17131` · `:17187` (`disp`, `:17115`) | map 1 | `h2` · base on the tile | `dispLg` · `titleSize` | yes |
     | `:17237` | map 1 | venue | `list` | no |
     | `:17821` · `:17932` · `:18050` (`display`, `:17800`) | map 2 | `h2` · row venue · panel `h3` | `titleSize` | yes |
     | `:17840` · `:17854` · `:17902` | map 2 | base · line · Get Directions pill (ring) | `list` | no |
     | `:18924` · `:19122` (`disp`, `:18912`) | map 3 | `h2` · panel `h3` | `titleSize` | yes |
     | `:18995` | map 3 | venue lines | `list` | no |
     | `:20106` | map 4 | stat values | `dispSm`, 26 px literal at 390 (19.5) | yes (ink edge) |
     | `:20128` | map 4 | `h2` | `dispLg` | yes |
     | `:20587` | testimonials 1 | quote `p` | `dispMd` | yes |
     | `:21002` · `:21081` (`dispType`, `:20982`) | testimonials 2 | `h2` · the `”` glyph | `dispLg` · `dispXl` | yes |
     | `:21055` · `:21094` | testimonials 2 | rail mark · reviewer | `list` | no |
     | `:21860` · `:21956` | testimonials 3 | rating numeral · `h2` | `dispMd` | yes |
     | `:21921` | testimonials 3 | reviewer | `list` | no |
     | `:22381` | testimonials 4 | `h2` | `dispLg` | yes |
     | `:22894` · `:22935` (`disp`, `:22750`) | form 1 | `h2` (two spans) · sent `h3` | `dispSm` | yes |
     | `:22772` · `:22822` | form 1 | box labels · submit pill (paint) | `list` | no |
     | `:23457` · `:23517` · `:23591` (`disp`, `:23401`) | form 2 | price · `h2` (two spans) · sent `h3` | title literal · `dispSm` · title | yes |
     | `:23435` · `:23559` | form 2 | submit pill (paint) · brand | `list` | no |
     | `:24300` · `:24329` · `:24342` (`disp`, `:24237`) | form 3 | `h2` · price · sent `h3` | `headSize` (`dispLg`) · title ×2 | yes |
     | `:24264` | form 3 | submit pill (paint) | `list` | no |
     | `:24758` · `:24836` · `:24841` (`disp`, `:24679`) | form 4 | sent `h3` · `h2` · `sub` | title · `dispLg` · title | yes |
     | `:24685` · `:24702` | form 4 | box labels (`caps`) · submit pill (paint) | `list` | no |
     | `:25393` | footer | statement `h2` | `dispMd` | yes |
     | `:25368` · `:25485` (`face`, `:25337`) | footer | brand · rows (border on the parent) | `list` | no |

     The sent titles (`formSentTitle`, calendar 4's `W.sentTitle`) render only after a live
     submit, so no digest sees them. Step 4 checks them by hand.
   - **Step 4's expected after-diff, named now.** On theme 2, **126 of 132 renders per surface**
     hold a site in the cut. They move, per surface, in each layout's commit:
     - **layout 1 (39):** header arch 0 and 4, bio, media, pricing, repertoire, gallery, calendar,
       map, testimonials, form, footer and footer `page=2`;
     - **layout 2 (27):** header arch 1 and 5, media, pricing, repertoire, calendar, map,
       testimonials, form;
     - **layout 3 (30):** header arch 2 and the nine sections;
     - **layout 4 (30):** header arch 3 and the nine sections.

     That is × 3 widths each. Bio and gallery at layout 2 (arch 1) carry **no** display type, so
     their 6 files per surface stay zero. The footer is one design, so it moves in layout 1's
     commit. Header arch 4 and 5 fold onto layouts 1 and 2 and move with them.
2. **The comparison.** Build candidate A and a B tile. Render one Grunge head per layout
   (1–4) at 1440 / 768 / 390, with each candidate and with Anton plain, beside the Figma frame's
   own render (`get_screenshot`). Measure paint on a published scroll. Then one `AskUserQuestion`:
   A, B, or stop here.

   **Decided** (2026-09-29, user call, over the renders below):
   - **A, the inline-SVG noise mask**, at the bytes below. B is not built.
   - **The five label-face sites at `title` px stay clean, by key.** These are `:5789`, `:10778`,
     `:17135`, `:20568` and `:21913`. Step 1's cut stands unchanged: no `labelStyle` or `s.label`
     site takes the mask at any size. The known cost is a clean 19.5 px name or track title under a
     distressed head. Each list stays consistent within its section.

   **Settled** (2026-09-29, HEAD `4edb088`; no source change, with every render and measurement
   taken in a scratch harness on :5173, masks injected by `page.evaluate`).
   - **A's bytes (step 3 copies these).** It is a 240 × 240 SVG, set as `mask-image` and
     `-webkit-mask-image` with `mask-size: 4em 4em`, `repeat`:
     `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n' x='0' y='0'
     width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='0.5'
     numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix values='1 0 0 0 0  0 1 0 0 0  0 0
     1 0 0  0 0 0 0 1' result='f'/><feTurbulence type='fractalNoise' baseFrequency='0.03'
     numOctaves='1' seed='3' stitchTiles='stitch'/><feColorMatrix values='1 0 0 0 0  0 1 0 0 0  0 0
     1 0 0  0 0 0 0 1' result='c'/><feComposite in='f' in2='c' operator='arithmetic' k1='0' k2='1'
     k3='1.2' k4='-0.6'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  20 0 0 0
     -4.5'/><feComponentTransfer><feFuncA type='discrete' tableValues='0 1'/></feComponentTransfer>
     </filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`. URI-encoded it is **1,187
     bytes**. (The harness wrote `k4='-0.600'`, which is the same value.)
     - The first turbulence is the speck (0.5, two octaves, seed 7). The second (0.03, seed 3)
       lifts or lowers it by `1.2 × (c − 0.5)`, so the cuts cluster into scuffed patches and clean
       runs, as the frame's do.
     - The matrix `20 … −4.5` puts a hard threshold at R ≈ 0.25, and `discrete '0 1'` makes it
       binary.
     - Both seeds are pinned, and `stitchTiles` makes the tile seamless.
   - **Density, and the cut.** Measured as the fraction of the tile drawn at 480 px with alpha
     below 0.5:
     - **A: 6.7%.** The light trial cuts **14.7%** and the heavy one **31.0%**, so A is well under
       half the light setting's density. **Step 1's cut holds**, since it held for anything no
       denser than light.
     - B (below): 2.9%.
     - The frame: 4.3% of the glyph *interior*, plus the worn edges no tile can reproduce.
     - Tuning path: the trial's blobs were round and three to five times the frame's weight.
       Raising the frequency made them finer, the coarse field clustered them, and the explicit
       threshold set the weight. Rejected on the way: 0.2 / 0.3 with the trial's table (15%);
       0.4 / 0.5 at 0.30–0.34 (6.6–12%, even snow); 0.5 at 0.27–0.29 with k 0.9–1.2 (8–8.7%,
       heavier than the frame inside the patches).
   - **B, as it was cut (for the record, not built).** From `964:58600` exported at 4×
     (`download_assets` at scale 4; `get_screenshot` will not go past 1×):
     - Ink is `max(R,G,B) > 128`. The histogram is bimodal, with the photo below 64 and the glyphs
       above 208.
     - That was closed 14 px, then eroded 6 px to give the interior.
     - The holes were taken as 8-way components. Kept: those under 0.25% of an em², not boxy, and
       not touching the interior's edge. Truncated edge scuffs came out as flat-topped squares, so
       239 were dropped. That left 876 whole chips.
     - These were scattered with wraparound onto a 3 em tile (60% clustered, σ 0.18 em) at the
       frame's 4.3% interior density, then Lanczos'd to 512 px with 4 alpha levels.
     - Size: 22,830 bytes PNG (30,440 inlined), and a 2-colour palette PNG would be about 10 KB.
     - Its chips have the frame's own shape, but it reads lighter than the frame and all but
       vanishes at 390. It also carries the licence point (a texture taken from renders of a
       personal-use-only face).
     - **Recorded because this is the only tile route if A is ever reopened**:
       `get_screenshot` caps at 1×, and a frame export is what gives the chip detail.
   - **The renders.** Header `h1` (the setter) at arch 0–3 × 1440 / 768 / 390, plain / A / B, at
     DPR 1 and 3. The harness ran `&cj={"title":"Static Youth"}`, so its words match the frame's.
     Each frame was cropped to the `h1`'s rect scaled by `frameW / rootW`. The frames are `964:58600` /
     `986:44057` / `986:44070`, `964:64618` / `986:13753` / `986:13772`, `964:68686` /
     `984:13900` / `984:13931` and `964:72944` / `971:7823` / `977:12044`. The sheets were
     scratchpad-only; the recipe is this paragraph.
     - **`title` at 390 / DPR 1** was checked by rendered size, with every outermost Anton setter
       at 19 px or more masked. The renders were calendar 3, repertoire 4, map 2, media 1,
       testimonials 1, repertoire 1, map 1 and testimonials 3. **A survives:** "BOOK ME", "CRAZY IN
       LOVE", "DON'T STOP ME NOW" and "HIDDEN WAREHOUSE" are scuffed but legible, and "JUNE" at
       22.5 reads like the frame. B survives by being almost clean.
     - **A two-line head needs nothing.** A mask on a block setter is one box, so the tile runs on
       across the line break. Step 0's `maskPosition` column stays a guard.
   - **The label edge's new fact, and why clean-by-key avoids it.** Testimonials 1's name and
     role spans (`:20568`) **paint their own pill**. Masked by size, A speckles the pill. So
     step 1's "every setter at 19 px or more paints only glyphs" was true of the `s.display`
     setters it probed, not of the label-face ones. Clean-by-key never reaches them.
   - **Paint** was measured on the published Grunge page (card 0), with a fresh browser per run
     and the median of 3. Masks went on every outermost Anton setter at 19 px or more that paints
     no box (35 nodes at 1440, 29 at 390). The engine is chrome-headless-shell, which rasterises
     in software, so **the ratios are the result and the ms are pessimistic**. Chrome for Testing
     (`headless: true`) stalled before the builder had even built the page, and was not chased.

     | | scroll raster 1440 (zoomed) | scroll raster 390 | masks' first paint, 1440 | republish raster, 1440 |
     |---|---|---|---|---|
     | plain | 372 ms | 167 | 3 | 116 |
     | A | 825 (×2.2) | 245 (×1.5) | 158 | 163 |
     | B | 441 (×1.2) | 208 (×1.25) | 21 | 118 |

     - The rAF frame time does not move under either candidate (p95 21 ms at 1440, 9 ms at 390,
       over 150 and 169 frames of a 60 px-a-frame scroll). The cost is on the raster threads,
       and A's grows with the rendered size, which the 1440 zoom inflates.
     - "A Publish" is measured as a proxy, two ways: the masks' first paint at the page top,
       and a *Publish* → *Open* into the open tab. The latter keeps every mask (35 / 35),
       because React leaves style properties it never set alone.
     - Step 5 re-measures on the built single file if the sweep finds a scroll that hitches.
3. **The key and the helper.** `vm.distress` in `sectionVm`, the constant (A) or the resolver
   (B), and the helper beside `faced`, with no call sites yet. After-diff: **0 of every theme**.
   Step 2 chose A, so this is a string constant in `data.js` and nothing in `photos.js`. Carry
   step 1's wordmark trap into the helper's shape: `NavBar` (`:1473`) passes an explicit `'28px'`
   at 390, so "was `size` passed" cannot tell header 1's Display/Title wordmark from header 4's
   `labelLg` one. The key, or a flag, has to travel through `NavBar`.
4. **The sites**, layout by layout (1, 2, 3, 4), one commit each. After-diff per layout: Grunge
   files at that layout's arch, **mask columns only**, no text, geometry, colour or font row
   moving. Themes 0, 1, 3 and 4: 0.
5. **The sweep.**
   - A full digest against `main` (port normalised), all categories × themes 0–4 × three widths
     × canvas and `live=1`. The only diffs allowed are Grunge mask columns.
   - Walk all four Grunge cards in the real app and the published tab at 1440 / 768 / 390.
     Check that Publish and the popup's style clone carry the mask (it is inline, so they should),
     and that the layout picker's thumbnails and the template card show it.
   - `npm run build:standalone`, then note the size against `main`'s 8,763,002 bytes. Refresh the
     root `index.html` in its own commit, with a two-build digest.
   - Docs: CLAUDE.md's Grunge paragraph ("Anton standing in for Stones Crush"), the `THEMES[2]`
     comment, `layout-1.md` open question 1, and `plans/README.md`'s row.
   - A reply line for JP-056 and a note for the designer, below.

## For the reply and the designer

- **JP-056 (reply, once shipped):** the headings now carry a worn texture like the design's.
  The letters are still Anton, standing in for Stones Crush, because Stones Crush's only free
  licence is for personal use. Small type (the nav, the buttons, the labels) stays clean, because
  the texture eats thin strokes at those sizes. The real face needs a web licence from the PO.
- **For the designer:** the texture is a mask over Anton, not the face, and it covers display
  sizes only. Open question 6 in `layout-1.md` (Anton at 0.75 of the token) is unchanged.

**Decided.** —

**Settled.** —
