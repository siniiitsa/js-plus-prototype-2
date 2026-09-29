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
- **Display sizes only.** The nav, the pills, the label-face chips and every `labelStyle` site
  stay clean Anton, because a mask eats thin strokes at 14–18px. Where exactly the cut falls is
  step 1's measurement (below).
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
2. **The comparison.** Build candidate A and a B tile. Render one Grunge head per layout
   (1–4) at 1440 / 768 / 390, with each candidate and with Anton plain, beside the Figma frame's
   own render (`get_screenshot`). Measure paint on a published scroll. Then one `AskUserQuestion`:
   A, B, or stop here.
3. **The key and the helper.** `vm.distress` in `sectionVm`, the constant (A) or the resolver
   (B), and the helper beside `faced`, with no call sites yet. After-diff: **0 of every theme**.
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
