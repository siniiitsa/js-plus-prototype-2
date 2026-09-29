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
     4 names the fix before making it. *Superseded by step 4's "Settled, layout 4":* the line
     box was not what clipped. A glyph's side bearing overhangs the box horizontally, and that
     is true of the whole face.
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
   - **A, the inline-SVG noise mask**, at the bytes below. B was cut as a scratch tile and is not taken forward.
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
   - **B, as it was cut (for the record; not taken forward).** From `964:58600` exported at 4×
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

   **Settled** (2026-09-29, on `3d12ca2`). Line numbers are this commit's. **Every
   `EncoreSection.jsx` line past `:105` sits 13 lower than in step 1's census**, since the helper
   added 13 lines. So `:1473` → `:1486`, `:3336` → `:3349`, `:20106` → `:20119`, and the four Grain
   masks are now `:1667` / `:3913` / `:5263` / `:5959`.
   - **The constant.** `DISTRESS_SVG`, `data.js:16`. It is not exported, and it sits *above*
     `THEMES`, because `THEMES` reads it (a `const` below would hit the TDZ at module eval). It holds
     step 2's bytes, readable and single-quoted. `THEMES[2]` builds the CSS value once, with
     `` `url("data:image/svg+xml,${encodeURIComponent(DISTRESS_SVG)}")` ``. That is **1,185**
     characters. Step 2's 1,187 was its harness's `k4='-0.600'`: the same value, two bytes longer.
     `encodeURIComponent` also turns the `#` in `url(#n)` into `%23`, so it cannot be read as a
     fragment. `photos.js` is untouched.
   - **The key: one object, image and tile size together.** It is `THEMES[2].distress =
     { image, size: '4em 4em' }` at `data.js:138`. `sectionVm` copies it as `distress: T.distress`
     beside `faceK`, at `EncoreBuilder.jsx:344`, so it is undefined on every other theme. The size
     rides with the image because it was tuned with A's density. If B is ever reopened, it has a
     3 em tile and only `data.js` would change. `EncoreSection` never knows which tile it has.
     Editorial's per-section `schemes` spread cannot reach it, because no scheme carries the key.
   - **The helper.** `distressed(s, style)` is at `EncoreSection.jsx:114`, beside `faced` /
     `facedLh`. With the key set, it returns `{ ...style }` plus `maskImage`, `WebkitMaskImage`,
     `maskSize` and `WebkitMaskSize`. Otherwise it returns **the same object**, not a copy, so no
     other theme's render can move. It sets no repeat or position, because both are the defaults.
     - The prefixed keys are **capital-W** `WebkitMask*`. React warns "Unsupported
       vendor-prefixed style property" for a lowercase `webkit…` in a style object.
       `webkitMaskImage` is the CSSOM name, which is what the digest reads, and Chrome mirrors the
       unprefixed value into it anyway.
     - The mask keys spread *after* the style, so a caller cannot shadow them by accident.
     - It has no call sites.
   - **Positive control.** On a Grunge header `h1` on :5173 (desktop), `THEMES[2].distress` was set
     by hand. `maskImage` and `webkitMaskImage` both computed to the `url("data:image/svg+xml,%3Csvg…`
     value, 1,185 long, and `maskSize` computed to `486px 486px` (4 × 121.5). Drawn to a 480 px
     canvas, the tile cuts **6.70%** at alpha < 0.5, which is step 2's 6.7%. The bytes are A's.
   - **Decided: the wordmark's gate is an opt-out flag on `Wordmark`, which `NavBar` forwards.**
     - `Wordmark`'s Grunge arm (`:589`) is Display/Title by its own default, so by key it is *in*.
       `NavBar`'s 390 `'28px'` (`:1486`) is the same Display/Title.
     - The one Grunge caller that overrides it with a label key is header 4's `NavBar` at `:3349`,
       with `nameSize={… s.labelLg}`. That call site says so by passing **`clean`** beside the size
       it chose. `NavBar` takes `clean` and hands it to `Wordmark`, and `Wordmark` spreads
       `distressed` on its name `span` unless `clean` is set.
     - Deriving the flag inside `NavBar` from `nameSize == null` was rejected, because it is step
       1's trap one level up: a future caller passing a title-size `nameSize` would silently come
       out clean. The flag has to be named where the key is chosen, which is the rule every other
       site follows.
     - The plumbing is **step 4's layout-1 commit**, not this one. A `Wordmark` that reads the flag
       is a call site.
     - The other `Wordmark` / `NavBar` callers: `:3531` is `HeaderV3`'s Retro / Pop / Editorial
       path (Grunge returns at `:3302`, inside its `(s.lime || s.grunge)` block), and `:3590` /
       `:3650` are `HeaderV4` / `HeaderV5`, the photographic family. None reaches Grunge.
   - **A census miss, found here for step 4.** `NavMenu`'s open panel, `:694`, renders
     `<Wordmark s={s} logo glyph={27} …/>` with no `size`, so under Grunge it is the Display/Title
     default (28 px narrow) and *in* by key. It needs no flag. The panel draws only live, with the
     burger open, so no digest sees it: step 4 checks it by hand, with the sent titles. Its links are
     `labelStyle(s, s.dispSm, …)`, a label site, so they stay clean by the cut.
   - **Proof: 0 of 660 per surface, on every theme, Grunge included.** This used step 0's recipe:
     a worktree of `739f060` on :5174 (its source equals `95d109a`'s, since steps 0–2 touched only
     `plans/` and `scripts/`), this branch's `digest.mjs`, themes 0–4. The tree ran on the
     long-running :5173, normalised by step 0's `sed` on both sides.
     - Bare: **0 of 660**.
     - `EXTRA='&live=1'`: **0 of 660**.
     - That is 132 files per theme per surface, and no row in either label carries `svg+xml`.
4. **The sites**, layout by layout (1, 2, 3, 4), one commit each. After-diff per layout: Grunge
   files at that layout's arch, **mask columns only**, no text, geometry, colour or font row
   moving. Themes 0, 1, 3 and 4: 0.

   **Settled, layout 1** (2026-09-29, on `d366866`). Line numbers are this commit's
   `EncoreSection.jsx`. **A census line past `NavBar` (`:1474`) sits 22 lower than step 1's
   number**: 13 from step 3's helper and 9 from this commit. So layout 2's `:2133` is `:2155`, the
   five label-face sites are `:5811` / `:10800` / `:17157` / `:20590` / `:21935`, the four Grain
   masks are `:1676` / `:3922` / `:5272` / `:5968`, and map 4's ink edge is `:20128`.
   - **The sites, fifteen spreads.** Each is `distressed(s, …)` wrapped round the setter's whole
     style object, never round a span inside it:
     - header 1's `Title` (`:1770`, below) and the Grunge `Wordmark`'s name (`:596`);
     - bio 1's `h2` (`:3845`), media 1's (`:5743`), pricing 1's `h2` (`:8414`) and amount
       (`:8508`), repertoire 1's `h2` (`:10843`) and gallery 1's (`:12921`);
     - calendar 1's month (`:14808`) and `h2` (`:14833`), map 1's `h2` (`:17153`) and base on the
       tile (`:17209`), testimonials 1's quote `p` (`:20608`), form 1's `h2` (`:22913`) and sent
       `h3` (`:22957`), and the footer's statement `h2` (`:25414`).
   - **The section-local helpers stay unmasked.** Calendar 1's `disp` (`:14740`), map 1's (`:17137`)
     and form 1's (`:22772`) are wrapped at the call site, as `distressed(s, disp(…))`. The helper
     is not a key. Map 1's venue (`:17259`, `disp(s.list …)` via `G.venue`) and form 1's box
     labels and submit pill (`:22794`, `:22844`, both `disp(s.list …)`) go through the same
     helpers, so a spread inside them would have masked three `list` sites and a painted pill.
   - **Decided: `Title` takes an opt-in `worn`, where `Wordmark` takes an opt-out `clean`.**
     - `Title` (`:917`) is shared by every header. Its Grunge callers are the calls inside each
       header's `s.limeTree` block: HeaderV0 (`:1767`), HeaderV1 (`:2100`; its block runs
       `:1859`–`:2224`), HeaderV2 (`:2737`) and HeaderV3 (`:3267`). The other calls (`:2411`,
       `:3016`, `:3481`, and HeaderV4 / V5's) are the Retro and Pop arms. A spread inside `Title`
       would have moved header arch 1, 2, 3 and 5 in this commit.
     - So the call that chooses the size names the flag, as step 3 settled for the wordmark.
       Here only HeaderV0's call passes `worn` (`:1770`). `Title` builds its `h1` style once as
       `face` and spreads the mask when `worn` is set: one tile across both tones, since the
       mask sits on the `h1`.
     - **The end state is layout 4's commit, which collapses the prop.** Every `Title` is a
       display head, and every Grunge caller is in the cut. So once layouts 2–4 have each opted
       in at their own commit, `worn` has nothing left to tell apart. Layout 4's commit deletes
       it and spreads unconditionally; the Retro, Pop and Editorial callers are the helper's
       no-op. Until then, a Grunge `Title` without `worn` is a layout not yet done.
   - **The wordmark gate, as step 3 decided.**
     - `NavBar` (`:1474`) takes `clean` and forwards it to `Wordmark` (`:1496`).
     - `Wordmark`'s Grunge / Editorial arm builds `name` and spreads the mask unless `clean` is
       set (`:596`).
     - Header 4's call (`:3358`) passes `clean={s.mob || grunge}`. That is the very expression
       its `nameSize` uses to pick `s.labelLg`, so the flag and the key cannot drift apart. A bare
       `clean` would render the same today: the call sits in the `(s.lime || s.grunge)` block,
       Lime's `Wordmark` arm is `labelStyle` and ignores the flag, and Editorial's card 4 is
       Retro's `HeaderV3`. The predicate is chosen for the drift, not for any render.
     - `NavMenu`'s panel wordmark (`:697`) passes no flag and takes the mask.
   - **Proof, per step 0's recipe.** The baseline was a worktree of `d366866` on :5174, and the
     tree ran on the long-running :5173. Both went through step 0's `sed` normaliser. Themes 0–4
     were rendered, 132 files each per surface.

     | Theme | Bare | `&live=1` |
     |---|---|---|
     | 0, 1, 3, 4 | 0 of 132 each | 0 of 132 each |
     | 2 | **39 of 132** | **39 of 132** |

     - **The 39 are exactly step 1's layout-1 list** × 3 widths: header arch 0 and 4, and bio,
       media, pricing, repertoire, gallery, calendar, map, testimonials and form at arch 0. The
       footer is there too, at arch 0 and at `page=2`. (The prompt's "39 renders × 3 widths" was
       loose: 13 renders × 3 widths is 39 files.)
     - **The column check was scripted, not read by eye**, and the script is committed as
       `source/scripts/mask-cols.mjs <before> <after>` for layouts 2–4 and the sweep. It exits 1
       on any failure. Every differing row was compared field by field against its baseline
       row. Each surface shows the same thing:
       - 60 rows moved, with the row count unchanged in every file.
       - Every moved row differs **only in the four mask columns**.
       - In each of them the baseline read `none|none|auto|0% 0%`. The new `maskImage` is the
         `url("data:image/svg+xml…` value, and `webkitMaskImage` equals it.
       - `maskPosition` stays `0% 0%`.
       - `maskSize` is **4 × `fontSize`** in every row.
       - Every moved tag is an `H1`, `H2`, `H3`, `P` or `SPAN`.
       - The existing `linear-gradient` mask rows are 14 per surface on both sides, the 28, and
         none of them moved.
     - **The sizes that moved**, as faced px:
       - `H1` 121.5 / 71.25 (the header's 390 is also 71.25, since `tk.dispXl` is the frame's
         Tablet-mode 95);
       - the wordmark `SPAN` at 22.125 / 21;
       - `dispLg` `H2`s at 80.25 / 60.75 / 34.5, `dispMd` at 44.25 / 37.5 / 28.5, and `dispSm` at
         30.75 / 30 / 22.5;
       - map 1's base at 22.125 / 21 / **19.5**, the smallest site in the commit.

       Nothing under 19.5 took the mask.
   - **By hand, the two sites no digest sees.** Grunge card 0 was published through a puppeteer
     script (Publish → *Open*, `page.once('popup')`, trusted clicks, `mailto:` clicks
     `preventDefault`ed), deleted after.
     - **`NavMenu`'s panel wordmark**, with the burger open at 390 and at 768: "Kai Mercer" at
       21 px carries the mask, 1,185 characters long, with `maskSize` `84px 84px`. The panel's
       links (`labelStyle(s, s.dispSm …)`, 22.5 / 30 px) read `none`, a label site staying clean
       by the cut.
     - **Form 1's sent `h3`**, "Check your mail app", after a filled submit: 30.75 px with
       `123px 123px` at 1440, and 22.5 px with `90px 90px` at 390. The mask is the same value.
     - No page errors. In the shots, the 21 px panel name is scuffed but reads, as step 1 found
       for the wordmark.

   **Settled, layout 2** (2026-09-29, on `7dea933`). This commit adds and removes no line (28
   lines changed in place), so **the +22 offset from step 1's census still holds for layout 3**:
   `:2133` → `:2155`, and so on, exactly as layout 1's Settled lists them.
   - **The sites, twenty spreads.** Each is `distressed(s, …)` round the setter's whole style:
     - header 2's `Title` passes `worn` (`:2101`, HeaderV1's `s.limeTree` call). The Retro arm's
       call (`:2411`) is untouched, as are HeaderV2's and HeaderV3's Grunge calls (`:2737`,
       `:3267`), layouts 3 and 4's;
     - media 2's two `titleType` spans (`:6579`, the now-playing title, and `:6667`, the list's
       track titles) and its `h2` (`:6477`). `titleType` is a const, not a function, so each span
       wraps it as `distressed(s, titleType)`. The fan card names (`:6516`) are `list` and stay
       clean;
     - pricing 2's `h2` (`:8958`), plan name (`:9023`) and price (`:9031`). Its `disp` (`:8935`)
       has exactly those three callers;
     - repertoire 2's `h2` (`:11419`);
     - calendar 2's slot mark (`:15341`) and `h2` (`:15396`), both `distressed(s, disp(…))`. The
       mark's `dim()` opacity on a booked row sits beside the mask and moves no column;
     - map 2's `h2` (`:17843`), row venue (`:17953`) and panel `h3` (`:18072`). Its `display`
       (`:17822`) also feeds the base, the line and the Get Directions pill (`:17862`, `:17876`,
       `:17924`), all `s.list`, so it is wrapped at these three call sites alone;
     - testimonials 2's `h2` (`:21023`) and the `”` glyph (`:21102`). The rail mark and reviewer
       (`:21077`, `:21116`) are `dispType(s.list …)` and stay clean;
     - form 2's price (`:23479`), `h2` (`:23539`) and sent `h3` (`:23613`). The submit pill
       (`:23457`) and the brand (`:23581`) are `disp(s.display, s.list …)` and stay clean.
   - **The `”` glyph's box.** At desktop the span is hand-set to a 56 px box under a 91 px line,
     so a mask clipping to the border box could have cut the glyph, map 4's ink-edge case. Step
     1's solid-mask probe covered this node (every setter at 19 px or more on the canvas) and
     found pixels move only at map 4, so the glyph sits inside its box. Nothing was done.
   - **Proof, per step 0's recipe.** The baseline was a worktree of `7dea933` on :5174, and the
     tree ran on the long-running :5173, both through step 0's `sed`. Themes 0–4, 132 files each
     per surface.

     | Theme | Bare | `&live=1` |
     |---|---|---|
     | 0, 1, 3, 4 | 0 of 132 each | 0 of 132 each |
     | 2 | **27 of 132** | **27 of 132** |

     - **The 27 are exactly step 1's layout-2 list** × 3 widths: header arch 1 and 5, and media,
       pricing, repertoire, calendar, map, testimonials and form at arch 1. Bio and gallery at
       arch 1 stay 0.
     - **`mask-cols.mjs`: 0 failures on both surfaces.** 84 rows moved per surface, all 84 new
       masks, each differing only in the four mask columns with `maskSize` 4 × `fontSize`, and
       all text tags. The `linear-gradient` rows are 14 per surface on both sides.
     - **The sizes that moved**, as faced px: the `H1` at 80.25 / 60.75 / 34.5 (`dispLg`, header
       arch 1 and 5 alike); `dispLg` `H2`s and calendar's `SPAN` marks at 80.25 / 60.75 / 34.5;
       `dispMd` at 44.25 / 37.5 / 28.5; `dispSm` at 30.75 / 30 / 22.5; the `”` at 121.5 / 71.25
       / 39 (`dispXl`); and the title-size sites (media's track spans, map's three, form's price)
       at 22.125 / 21 / **19.5**. Nothing under 19.5 took the mask.
   - **By hand, form 2's sent `h3`.** Grunge card 1 was published through a one-off puppeteer
     script (Publish → *Open*, `page.once('popup')`, trusted clicks, `mailto:` clicks
     `preventDefault`ed), deleted after. After a filled submit, "Check your mail app" carries the
     mask, 1,185 characters, at 22.125 px with `88.5px 88.5px` at 1440 and 19.5 px with `78px
     78px` at 390. The card's price carries the same. The brand ("Kai Mercer", 15 / 13.5 px)
     and *Write another* (a `list`-size span) read `none`. No page errors. In the 390 shot the head is scuffed
     but reads.

   **Settled, layout 3** (2026-09-30, on `9190ebb`). This commit adds and removes no line either
   (37 lines changed in place), so **the +22 offset from step 1's census still holds for layout
   4**. Layout 4's commit also collapses `Title`'s `worn` (layout 1's Settled). A line it adds or
   removes at `Title` (`:914`–`:933`) shifts every census number below it, so the offset holds
   only until that edit.
   - **The sites, twenty spreads.** Each is `distressed(s, …)` round the setter's whole style:
     - header 3's `Title` passes `worn` (`:2738`, HeaderV2's `s.limeTree` call). Its Retro / Pop
       arm (`:3016`) is untouched, as is HeaderV3's Grunge call (`:3267`), layout 4's. The card
       name (`:2827`, `nameSize`) wraps its whole style, the `cardNameEms` fit included. The
       location (`:2746`) is `list` and stays clean;
     - bio 3's name `p` (`:4636`) and `h2` (`:4765`);
     - media 3's `h2` (`:7300`) and both spans that read `titleType` (`:7286`): `:7397` and
       `:7544`, each `distressed(s, titleType)`. `:7544` is the same design's Retro arm, where
       the helper is a no-op. `listName` (`:7280`) stays clean;
     - pricing 3's numeral (`:9652`) and `h2` (`:9716`). The row name (`:9624`) is `list`;
     - repertoire 3's `h2` (`:12103`) and gallery 3's (`:14014`). Repertoire's song titles
       (`:12073`) are `list`;
     - calendar 3's `h2` (`:15860`), numeral (`:15873`) and month (`:15881`);
     - map 3's `h2` (`:18946`) and panel `h3` (`:19143`), wrapped at the call site round
       `disp(titleSize …)`. Its `disp` (`:18934`) also feeds the venue lines (`:19017`,
       `s.list`), which stay clean;
     - testimonials 3's rating numeral (`:21881`) and `h2` (`:21977`). The reviewer (`:21943`)
       and the quote (`:21935`, `disp(s.label …)`, a label-face site) stay clean;
     - form 3's `h2` (`:24322`), price (`:24351`) and sent `h3` (`:24364`), each
       `distressed(s, disp(…))`. The submit pill (`:24286`, `pill` → `disp(s.list …)`) stays
       clean.
   - **Proof, per step 0's recipe, with one port moved.** A vite this session did not start was
     already on :5174, serving this tree. So the baseline, a worktree of `9190ebb`, ran on
     **:5175**, and the normaliser's port class widened to `517[345]`. The tree ran on the
     long-running :5173. Themes 0–4, 132 files each per surface.

     | Theme | Bare | `&live=1` |
     |---|---|---|
     | 0, 1, 3, 4 | 0 of 132 each | 0 of 132 each |
     | 2 | **30 of 132** | **30 of 132** |

     - **The 30 are exactly step 1's layout-3 list** × 3 widths: header arch 2 and the nine
       sections at arch 2. It is the same 30 files on both surfaces.
     - **`mask-cols.mjs`: 0 failures on both surfaces.** 75 rows moved per surface, all 75 new
       masks, each differing only in the four mask columns with `maskSize` 4 × `fontSize`, and
       all text tags. The `linear-gradient` rows are 14 per surface on both sides.
     - **The sizes that moved**, as faced px: the `H1` at 80.25 / 60.75 / 34.5 (`dispLg`) and the
       card name at 22.14 / 21 / 19.5; `dispLg` `H2`s and calendar's numeral at 80.25 / 60.75 /
       34.5; `dispMd` (pricing's numeral, testimonials' numeral and `h2`) at 44.25 / 37.5 / 28.5;
       `dispSm` (bio's name, calendar's month) at 30.75 / 30 / 22.5; and the title-size sites
       (media's track spans, pricing's, calendar's, map's and form's heads, the map panel's `h3`,
       form's price) at 22.125 / 21 / **19.5**. Nothing under 19.5 took the mask.
   - **The composed column, by digest.** Bio 3 and media 3 at `&column=left` and calendar 3 at
     `&column=right` (desktop, theme 2) were digested on both servers. Only arch 2 moved: bio's
     `h2` and name, media's `h2` and track spans, calendar's `h2`, numeral and month, 11 rows,
     every one mask columns only, 0 failures. A mask moves no geometry, so the column's fit is
     untouched.
   - **By hand, form 3's sent `h3`.** Grunge card 2 was published through a one-off puppeteer
     script (Publish → *Open*, `page.once('popup')`, trusted clicks, `mailto:` clicks
     `preventDefault`ed), deleted after. After a filled submit, "Check your mail app" carries the
     mask, 1,185 characters, at 22.125 px with `88.5px 88.5px` at 1440 and 19.5 px with `78px
     78px` at 390. The price carries the same, and the `h2` carries it at 80.25 / 34.5. The
     eyebrow, the paragraph, the price unit, the bookings line, the address and *Write another*
     read `none`. The sent state did not survive the resize to 390, so the submit was repeated
     there. No page errors. In the 390 shot the head is scuffed but reads.

   **Settled, layout 4** (2026-09-30, on `a6c7d7e`). Step 4 is finished. This commit also adds
   and removes no line (44 lines changed in place, the `worn` collapse included), so **the +22
   offset from step 1's census still holds for the sweep**.
   - **The sites, twenty-one spreads.** Each is `distressed(s, …)` round the setter's whole
     style:
     - header 4's kicker `span` (`:3258`). Its `Title` (`:3267`) passes nothing and takes the
       mask through the collapse (below). The location (`:3275`) is `list` and stays clean, as
       does the `NavBar` wordmark (`:3358`, `clean`, layout 1's plumbing);
     - bio 4's `h2` (`:5192`, `dispXl`) and name `p` (`:5286`). `brand()`'s inner span is left
       alone, because the `p` is the setter;
     - media 4's now-playing `span` (`:7738`, `tk.title`) and `h2` (`:7844`). The tile names
       (`:7810`, `tk.list`) stay clean;
     - pricing 4's name (`:10217`) and price (`:10272`). Its `disp` (`:10200`) is an object
       spread inside each literal, so each literal is wrapped whole;
     - repertoire 4's song titles (`:12477`, `titleSize`) and `h2` (`:12512`). The artist
       (`:12484`) is `list`;
     - gallery 4's `h2` (`:14417`);
     - calendar 4's card head (`:16638`, the `st.big` arm alone, so `smallCaps` stays clean),
       big value (`:16657`), sent title (`:16803`), step title (`:16816`) and `h2` (`:16833`),
       each `distressed(s, …)` round `disp(…)` or round the `{ margin: 0, ...disp(…) }` literal.
       The Back / Next Step pills (`:16765`, `pill` → `disp(s.list …)`) stay clean;
     - map 4's stat values (`:20127`, the ink edge below) and `h2` (`:20149`);
     - testimonials 4's `h2` (`:22401`);
     - form 4's sent `h3` (`:24780`), `h2` (`:24858`) and `sub` (`:24863`), each
       `distressed(s, disp(…))`. The `caps` box labels (`:24707`) and the submit `pill`
       (`:24724`) stay clean.
   - **`worn` is gone.** `Title` (`:917`) lost the prop and spreads `distressed(s, face)`
     unconditionally (`:933`). The comment above it (`:914`–`:916`) was rewritten in its three
     lines, and the three callers that passed it (`:1770`, `:2101`, `:2738`) no longer do. Every
     `Title` call site is now the same shape. On Retro, Pop and Editorial (card 4's Retro
     `HeaderV3` included), the helper returns the style object itself. Header arch 0, 1, 2, 4
     and 5 digest 0, which proves the collapse moved no header that `worn` had already masked.
   - **Decided (user call, 2026-09-30): map 4's ink edge is accepted as a named diff.** The
     stat values take the mask like every other site, and nothing moves geometry.
     - **The mechanism, corrected.** Step 1 put it down to Anton's 46 px text box in a 41 px line
       box. That is wrong: the vertical overflow clips nothing. A glyph's side bearing overhangs
       its box **horizontally**, and the mask clips to the border box.
     - **Measured** with a solid mask (`linear-gradient(#000,#000)`) diffed against none on map
       arch 3, in a one-off puppeteer probe that was deleted after. At desktop, "48" loses one
       column at x −1 (−0.5 at DPR 2) over rows 24–28 of 41, where the 4's crossbar tip runs
       past the left edge. "Manchester, UK" loses one column at x 193 of 193 over rows 31–32,
       from the K's leg. That comes to 5 and 2 px at DPR 1, and 8 and 4 at DPR 2. Tablet and
       mobile lose nothing.
     - **It is face-wide.** The seeded copy hits it only here, but map 4's own `h2`, set to
       "4 BLOCK" / "48 TRACK", clips 1–2 px at its right edge at desktop and 768. So any masked
       head whose last glyph overhangs clips the same way.
     - **Why accept.** The sliver is at most 1 CSS px, one column, and it sits inside the
       texture's own noise, since the tile already cuts 6.7% of every glyph. Neither the digest
       nor mask-cols can see it.
     - **The options not taken.** A local `paddingInline` / `marginInline` bleed at `:20127` would
       move x and w on four rows and patch one seeded instance of a face-wide edge. The same
       bleed in `distressed()` would move every masked row in layouts 1–3 and break "a mask
       moves no geometry". Leaving the values clean by key would put clean numerals under a
       distressed `h2`.
   - **Proof, per step 0's recipe, with layout 3's port.** Both :5173 and :5174 served this tree,
     so the baseline, a worktree of `a6c7d7e`, ran on **:5175**, through the `517[345]`
     normaliser. The tree ran on :5173. Themes 0–4, 132 files each per surface.

     | Theme | Bare | `&live=1` |
     |---|---|---|
     | 0, 1, 3, 4 | 0 of 132 each | 0 of 132 each |
     | 2 | **30 of 132** | **30 of 132** |

     - **The 30 are exactly step 1's layout-4 list** × 3 widths: header arch 3 and the nine
       sections at arch 3. It is the same 30 files on both surfaces.
     - **`mask-cols.mjs`: 0 failures on both surfaces.** 117 rows moved per surface, all 117 new
       masks, each differing only in the four mask columns with `maskSize` 4 × `fontSize`, and
       all text tags. The two surfaces moved the same `TAG@size` sets. The `linear-gradient` rows
       are 14 per surface on both sides.
     - **The sizes that moved**, as faced px:
       - the `H1` at 121.5 / 71.25 / 39 (`dispXl`) and the kicker at 22.14 / 21 / 19.5;
       - bio's `h2` at 121.5 / 71.25 / 39 (`dispXl`) and its name at 30.75 / 30 / 22.5;
       - `dispLg` `H2`s at 80.25 / 60.75 / 34.5;
       - `dispSm` (pricing's name and price, map's stat values at desktop and 768) at 30.75 / 30
         / 22.5;
       - the title-size sites (repertoire's song titles, calendar's card head, big value and
         step title, map's 390 stat values, form's `sub`) at 22.1 / 21 / **19.5**. Media's
         now-playing is 22.1 / 21 / 21, because `tk.title` is 21 at 390.

       Nothing under 19.5 took the mask.
   - **By hand, the titles no digest sees.** Grunge card 3 was published fresh at each width
     through a one-off puppeteer script, deleted after: Publish → *Open*, `page.once('popup')`,
     trusted clicks, and `mailto:` clicks `preventDefault`ed.
     - **Calendar 4's wizard.** It was walked through step 1 → 3 with trusted clicks on Next
       Step, with step 3's boxes filled and Send Enquiry clicked. All three step titles ("What's
       the occasion?", "Tell us the details", "How do we reach you?") and the sent title
       (`W.sentTitle`, "Check your mail app") carry the mask, 1,185 characters, at 22.125 px with
       `88.5px 88.5px` at 1440, 21 / `84px` at 768 and 19.5 / `78px` at 390.
     - **Form 4.** After a filled submit, the sent `h3` carries the same at the same sizes.
     - **Beside them.** Calendar 4's `h2` and form 4's `h2` and `sub` carry the mask as well.
       *Start again*, Send Enquiry, *Write another* and "What happens next" (15 / 14.25 / 13.5 px)
       read `none`.
     - No page errors. In the 390 shots both sent heads are scuffed but read.
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

   **Settled** (2026-09-30, on `a0b0408`; the root `index.html` is `a3789d7`, the docs the
   commit after it). Step 5 is finished, and with it the plan.
   - **1. The full digest against `main`, per step 0's recipe.** The baseline was a worktree of
     `739f060` on **:5175** (:5173 and :5174 both served this tree), through the `517[345]`
     normaliser. The tree ran on the long-running :5173. Themes 0–4, 132 files each per surface.
     One wrinkle: this session's `data.js` comment edits (item 4) landed while the `live=1` run
     was about 260 of 660 in, so the harness took an HMR reload mid-run. The edits are comments
     only (`git diff` showed no other line in `source/`), and the result is the expected one to
     the row, so it was not rerun.

     | Theme | Bare | `&live=1` |
     |---|---|---|
     | 0, 1, 3, 4 | 0 of 132 each | 0 of 132 each |
     | 2 | **126 of 132** | **126 of 132** |

     - The six unmoved Grunge files are bio and gallery at arch 1, × 3 widths, on both surfaces.
     - **`mask-cols.mjs`: 0 failures on both surfaces.** 336 rows moved per surface, which is
       step 4's 60 + 84 + 75 + 117, and all 336 are new masks. Each moved row differs only in the
       four mask columns, with `maskSize` 4 × `fontSize`, and every tag is a text tag. The
       `linear-gradient` rows are 14 per surface on both sides. The two surfaces moved the same
       `TAG@size` set in every render.
     - **The sizes that moved**, over the whole page, as faced px: 19.5, 21, 22.1–22.14, 22.5,
       28.5, 30, 30.75, 34.5, 37.5, 39, 44.25, 60.75, 71.25, 80.25 and 121.5. Nothing under 19.5
       took the mask.
   - **2. The four cards, walked** in the real app and the published tab by a one-off puppeteer
     script, deleted after: Publish → *Open*, `page.once('popup')`, trusted clicks, and `mailto:`
     clicks `preventDefault`ed. Each masked node was checked for a 1,185-character image equal in
     both columns, `maskSize` 4 × `fontSize`, a size of 19 px or more, and no masked ancestor.
     **No failure anywhere, and no page error on any card.**

     | Card | Canvas, each of D / T / M | Published, each of 1440 / 768 / 390 | Largest clean Anton text |
     |---|---|---|---|
     | 1 (Hero spread) | 17 | 17 | 22.125 / 21 / 19.5, media 1's track title |
     | 2 (Feature spread) | 28 | 28 | 15 / 14.25 / 13.5 |
     | 3 (Inset Hero) | 26 | 25 | 22.125 / 21 / 19.5, testimonials 3's quote |
     | 4 (Stacked) | 40 | 39 | 15 / 14.3 / 14.3 |

     - The clean ones at title size are two of step 2's five label-face sites, clean by key, as
       decided. Card 4's 15 at 1440 is header 4's `clean` wordmark.
     - **The canvas-only node is the calendar's, and it is F20's diff, not a mask.** The
       published tab knows today is 30 September, so the seeded June `open` is past. On card 3,
       calendar 3's head drops the numeral "12" and reads SEPTEMBER, not JUNE: one span fewer,
       both months masked. On card 4, calendar 4's date card shows the prompt in place of "Thu,
       June 12". CLAUDE.md names this ("the published first paint is the canvas's picture only
       while `open` is today or later").
     - **Republish.** The header's title was set to "Static Youth" through `st`, then *Publish* →
       *Open* again. The same tab took it, since no new page opened. The `h1` read "Static Youth"
       with the mask, and the census equalled the first publish's on all four cards.
     - **The sent heads.** After a filled submit, the form's "Check your mail app" carries the
       mask on every card: 30.75 px with `123px` at card 1, and 22.125 px with `88.5px` at cards
       2–4.
     - **The setup modal's four cards** carry 2 / 1 / 2 / 2 masked nodes: the `Title`, plus card 1's
       wordmark, card 3's card name and card 4's kicker. **The template stage's Grunge card**
       carries 2, the `h1` at 121.5 and the wordmark at 22.125, and the shot shows the speckle.
     - **The layout picker's thumbnails** (`browser-tool-choice`'s recipe) carry the mask in
       every item except bio's and gallery's layout 2 and bio's layout 6, which folds onto 2.
       Those have no display type. By item: bio 1 0 2 2 1 0, media 1 7 6 2 1 7 6, pricing 4 3 4 6
       4 3 4 6, repertoire 1 1 1 13 1 1 1, gallery 1 0 1 1, calendar 2 5 3 5 2, map 2 6 2 5,
       testimonials 1 2 2 1 1 2 2 1, form 1 2 2 2 1 2. The script did not match the header's
       sidebar row, so the header's own picker was not walked. The modal's four cards stand in
       for it: they are the same header previews through `sectionVm`, and all four carry the
       mask. The footer has one layout.
   - **3. The build.** `npm run build:standalone` gives **8,771,039 bytes**. That is **+1,876** on
     `main`'s committed `index.html` (8,769,163, from the retest sweep's `aff0f52`). The
     8,763,002 this plan quoted was the build before that refresh, and is +8,037 from here. It was
     refreshed in `a3789d7`, alone.
     - **The two-build digest** was `build-digest.mjs`'s first real run, with reduced motion on
       and `.seal-spin` skipped. It walked `…:8931/index.html` before the `cp` and
       `…/source/dist-standalone/index.html` after.
     - The committed build against a second walk of itself: 0 of 16 files, so the script is
       quiet.
     - New against old: `modal.txt` and themes 0, 1, 3 and 4 are identical. Only `theme_2_*`
       moved, three files and 51 rows, 17 per width, which is the walk's card-1 canvas count.
     - `mask-cols.mjs` runs unchanged on the two directories once the `N roots` line is dropped:
       0 failures, every row a new mask in the four columns, and the gradient rows 8 / 8.
     - **Paint was not re-measured.** The headless shell rasterises in software and cannot show a
       hitch, and the walk found none to chase. Step 2's numbers stand: the rAF p95 does not
       move, and the raster cost is ×2.2 at a zoomed 1440 and ×1.5 at 390.
   - **4. Docs.**
     - CLAUDE.md's Grunge paragraph now says the display sizes carry the mask. It names
       `THEMES[2].distress` → `vm.distress` → `distressed()`, the cut by key, the `clean`
       wordmark, and the ≤1 px side-bearing clip as a named diff.
     - `THEMES[2]`'s comment in `data.js` says the distress is put back at display sizes, and
       which keys take it.
     - `layout-1.md` open question 1 gained a *Shipped* paragraph.
     - `plans/README.md`'s row says what shipped.
   - **5. The reply and the note**, below. They are written as final.

## For the reply and the designer

- **JP-056 (reply):** The letters are still Anton, standing in for Stones Crush, so Dev Mode will
  still show `Anton`. Stones Crush's only free licence is for personal use. The headings, names,
  prices and other large type now carry a worn, speckled texture like the design's. It is cut into
  Anton by a mask, so the letters keep Anton's shapes. Small type (the nav, the buttons, the chips
  and the labels) stays clean, because the texture eats thin strokes at those sizes. Using the real
  face needs a web licence from the PO, and would replace the texture.
- **For the designer:** The texture is a mask over Anton, not the face. It is a noise pattern with
  a fixed seed, one tile per 4 em, so a 121 px head and a 19.5 px title wear the same speckle. It
  cuts about 7% of each glyph, where the frame's face cuts about 4% inside the letters plus its
  worn edges, which no tile can copy. It covers the display sizes and Display/Title (19.5 px and
  up). Five label-face sites set at title size stay clean beside distressed text of the same
  size: media 1's track titles, repertoire 1's song titles, map 1's kicker, testimonials 1's name
  and role, and testimonials 3's quote. A mask clips to the element's box, so where a glyph's side
  bearing overhangs the box it loses up to 1 px at that edge. Map layout 4's stat values at
  desktop are the seeded case ("48", "Manchester, UK"), and any head ending in an overhanging
  glyph does the same. Open question 6 in `layout-1.md` (Anton at 0.75 of the token) is
  unchanged.

**Decided.** A, the inline-SVG noise mask (step 2, user call). The cut is by ramp key, with the
five label-face sites clean (step 2). `Wordmark` opts out through `clean` (step 3), and `Title`
spreads unconditionally since `worn` collapsed (step 4). Map 4's ≤1 px edge is a named diff
(step 4, user call).

**Settled.** Steps 0–5. Swept against `main`, with every Grunge render moving in exactly the
named files, mask columns only, and every other theme at zero. The root `index.html` is refreshed.
Push, PR, merge and the deployed build stamp are still open.
