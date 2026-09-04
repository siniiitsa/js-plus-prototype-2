# Encore Builder

A single-page, client-only prototype of a website builder for musicians and DJs, built to
[`SPEC.md`](./SPEC.md).

Pick one of five visual **templates** from a spotlight-and-filmstrip picker and land straight in
the editor on a filled-in example page — a stack of **sections** you add, remove, reorder, swap
layouts on, recolour and rewrite — while seeing a live, fully re-skinned preview. The first thing
the editor asks for is a **header layout**, in a setup modal over the finished page; see
*Choosing a header* below.

It is a demo: nothing persists and nothing is sent to a server. **Publish** opens the finished
page in a second browser tab, with the builder chrome gone — see *Publishing* below.
All content is demo content for a fictional DJ, "Kai Mercer".

## Running it

The double-clickable build is committed at the repo root — open **`index.html`** directly from
`file://`, no server needed. Everything except the Google Fonts stylesheet is inlined.

To work on it:

```bash
cd source
npm install
npm run dev              # dev server with HMR
npm run build            # → source/dist/
npm run build:standalone # → source/dist-standalone/index.html
```

After a standalone build, copy the result to the repo root to refresh the double-clickable app:

```bash
cp dist-standalone/index.html ../index.html
```

## Layout

```
index.html                   ← generated single-file build, committed at root
README.md
SPEC.md
source/
  index.html                 ← Vite dev entry (+ Google Fonts)
  vite.config.js
  vite.standalone.config.js  ← vite-plugin-singlefile target
  jsconfig.json              ← @/* alias, required by the shadcn CLI
  components.json            ← shadcn config
  src/
    main.jsx
    App.jsx
    index.css                ← Tailwind v4 entry + design tokens (§3)
    lib/utils.js
    components/ui/           ← shadcn components
    builder/
      data.js                ← all static data + colour helpers (§4)
      EncoreSection.jsx      ← presentational renderer for every section type (§10)
      EncoreBuilder.jsx      ← all state, all chrome, all interaction (§5–§9)
```

## Two styling systems, deliberately

This is the one architectural rule worth knowing before editing anything (§12.9):

- **The builder chrome** (top bar, sidebar, edit panel, dropdowns, drawers, toast) uses **Tailwind
  utilities and shadcn/ui** on the design tokens in `src/index.css`.
- **`EncoreSection.jsx`** uses **neither** — every value is an inline `style={{}}`. Sections are
  painted with arbitrary hex values taken at runtime from the active theme's palette, plus six
  derived `rgba()` values, and a static utility class cannot express `background: s.bg` where
  `s.bg` is `#7A58A7` picked at runtime. Its only library import is `lucide-react`, whose icons
  inherit `currentColor` and so stay theme-driven; from React it takes `useId` and — for the one
  section that has live controls, Repertoire — `useState`, and nothing else.

Do not try to unify them. Only three hand-written CSS classes cross the boundary —
`.hv-indent`, `.hv-acbord`, `.hv-acfill` — because each reads the `--ac` / `--acFg` custom
properties set per section at runtime.

Every section is projected through `sectionVm()` into a flat, fully-resolved view-model before
rendering, so `EncoreSection` does zero colour maths.

## Deviations from SPEC.md

Six, all deliberate:

1. **No reference images; the Figma file replaced them.** `docs/feedback-reference/` is not
   present in this repo. The Figma file
   (`figma.com/design/uFoUbPaBrDicjyuSBEbtGT`) arrived instead and a fidelity pass has now been
   done against it for **layout 1 of all eleven sections it covers** — header, bio, media player,
   gallery, repertoire, events map, pricing, booking calendar, enquiry form, testimonials and
   footer — across its desktop (1440), tablet (768) and mobile (390) frames. Every other layout
   variant is untouched and still prose-derived. Two knock-on notes: the Figma display face is
   *Soulway*, which is commercial and cannot ship, so Retro sets its display type in **Fraunces**
   at `wght 900 / SOFT 100 / WONK 1 / opsz 144` — the nearest free match for Soulway's soft 70s
   slab, and much closer than the Alfa Slab One it replaced (its Anton and Inter faces are used
   as drawn); and the design's five album covers are real records, which
   are not ours to redistribute, so the media player's artwork is neutral crops of the same
   live-set photography in the framing the design uses. Everything else — the photography, the
   paper-grain texture and the Manchester map tile — now ships as committed assets; see
   *Seeded photography* below.
2. **React 19 / Vite 8** instead of §2.2's React 18.3 / Vite 6 pins, at the repo owner's
   request. All other dependencies are as specified. The React Compiler and ESLint from the
   original scaffold were dropped — §2.3's `vite.config.js` is normative and declares exactly
   `react()` + `tailwindcss()`.
3. **Radix packages.** §2.2 expects the shadcn CLI to add individual `@radix-ui/react-*`
   packages; the current CLI installs the unified `radix-ui` package instead. Same primitives.
4. **No stage 2.** §6's full-screen header-layout picker has been replaced by an in-editor
   setup modal. See *Choosing a header* below for what and why.
5. **Publish opens the page, rather than only toasting.** SPEC.md has no publish flow beyond
   §8.1's button, and §12.1 rules out persistence. The button now opens the finished page in a
   second tab — see *Publishing* below. Nothing is persisted or sent anywhere, so §12.1 stands;
   the tab is simply a second React root in the same session.
6. **Toast positioning.** §3.5 maps the toast to shadcn's `sonner`, and §9.2 also specifies a
   hand-positioned `toastUp` entry animation. Sonner owns the positioning and the mount
   transition (bottom-centre, 28px desktop / `calc(72px + env(safe-area-inset-bottom))` mobile),
   which produces the same slide-up; the pill itself is styled to §9.2's exact values. The
   `toastUp` keyframe is still defined in `index.css` per §3.2.

## Choosing a header

SPEC.md's stage 2 was a full-screen *Choose a header* page between the template picker and the
editor. It tested badly: it asks for a decision about a part of a page the user has not seen yet,
and "Header layout 4" names nothing. It has been removed. Picking a template now builds the page
and opens the editor on it directly, with the header on layout 1, and the header choice is asked
for **inside** the editor.

`st.stage` is `'template' | 'editor'`. The template picker is the app's first screen; picking one
opens the editor with `st.onboard` armed, and the **setup modal** goes up over the finished page:
a `Dialog` carrying a 3-up grid of the template's header layouts, one sentence saying what a
header is, and *Decide later* / *Use this header*. It is a gate, so both exits are real ones —
either clears `st.onboard` and the editor is then just the editor.

Three things about it are load-bearing:

- **One component.** `HeaderChoices` renders the grid — the same layouts the header's edit panel
  offers afterwards in its `LayoutPicker` dropdown, under the same names. Its frame is the
  *median* of the theme's measured layout heights, so Retro's tall Polaroid neither crops nor
  strands the other five.
- **Hover previews at full size.** `st.hdrHover` replaces the header's `arch` for rendering only
  (`makeVm`), so the page behind the modal previews a layout without committing it. `sec.arch` is
  untouched, and clicking is a try rather than a verdict — the modal stays open.
- **Names, not numbers.** `headerLayout()` in `data.js` promotes the names the compositions
  already carried in `EncoreSection`'s §10.2 comments — Hero, Framed, Gradient stage, Polaroid,
  Overlay card, Stage wide (and Centred / Split / Rule for the flat family) — into every label,
  including the ordinary `LayoutPicker` dropdown. Every other category stays numbered: its
  layouts are variations of one idea, and the number is honest about the folding.

The `startTheme` prop skips the template picker, and skips the onboarding with it.

## Seeded photography

Retro — the only designed template — opens with the Figma mock photography already in place.
The assets live in `src/builder/photos/` and are wired up by `src/builder/photos.js`, which is
the only module that imports them.

- **Retro only.** `defaultImage()` / `defaultImages()` return `undefined` for Lime, Grunge,
  Editorial and Pop, so those four render the initials placeholder exactly as before. The
  photography is Retro's art direction, not the user's content, so switching template drops it.
- **Imports, never fetches.** §8.6 forbids a network request in the render path.
  `vite-plugin-singlefile` forces `assetsInlineLimit = () => true`, so all nineteen files are
  base64-inlined and the committed `index.html` still opens from `file://`. It is ~2.9 MB.
  (The plain `npm run build` path has no such override and would emit them to `dist/assets/`
  instead; only the standalone build feeds the committed demo.)
- **`null` is the explicit-clear sentinel.** A fresh section carries no `image` key at all, and
  that absence is what selects the seeded photo — so **Remove** writes `null` rather than
  deleting the key, which would silently restore it. Absent → the mock photo, `null` → the
  initials placeholder, a string → an upload. `images` needs no sentinel: an emptied array is
  already distinguishable from an absent one.
- The layout picker, the template spotlight and the header setup modal all resolve through the
  same `sectionVm()`, so each shows the photography without any extra wiring.

## Publishing

**Publish** shows a success dialog naming the site, and **Open** puts the page in a new browser
tab with none of the builder around it. There is no backend and there never will be, so
"published" means a second tab rather than a URL — but it is a *live React root*, not a snapshot
of the canvas DOM.

That distinction is the whole design, and it buys two things:

- **The published page is responsive.** `EncoreSection` carries no media queries — its
  breakpoints are the `narrow` / `mob` booleans and the fixed px of `SIZES`, resolved into the
  view-model. Serialised HTML would be frozen at whatever width the editor happened to show.
  `PublishedPage` picks its own `Z` from its own window's width, at 390 / 768 / 1180+.
- **…and it holds its measure.** Past the canvas its frame was drawn at, the design does not get
  wider: `PublishedPage` puts the surplus into `padX`, so the content column stays the width the
  type ramp was tuned for and the window keeps the rest. It does that through the gutter rather
  than with a centred wrapper because `padX` is also what `bleedTo()` and `TornEdge` offset
  against — so each section's background, its torn edges and its checker ribbons still run to both
  window edges, and the page reads as full-bleed bands with the content centred in them. The Retro
  hero is the one composition outside that padding, so it applies the gutter itself and clamps its
  height to `heroH`; a `width: 100%` there is load-bearing, because an `aspect-ratio` box with a
  biting `max-height` otherwise shrinks its own width to keep the ratio.
- **It is interactive, where a control has been made real.** `sectionVm` carries a **`live`**
  flag, true only in the published tab, as the seam a control branches on: the same component
  renders the editor canvas, and that is deliberately a picture of a website, so anything
  interactive has to be off there. **Repertoire reads it.** Its search box filters on title and
  artist, its filter chips filter on the tags the artist typed, and its pager is derived from the
  result — all three inert on the canvas, which still draws the picture the Figma frames show.
  What unblocked it was putting the songs in the content model (`FIELDS.repertoire.songs`).
  Everything else the page draws — the gallery filmstrip, the players, the testimonials carousel,
  the events map's pager — is still a static span, and none of them needs new data to change that.
  The enquiry form's *submit* is the one thing that cannot be front-end-only.

Two limits worth naming before demoing it: the tab's address bar reads `about:blank` — the fake
domain is in the dialog copy, and the alternative (`document.write`) would make the tab claim the
builder's own URL and reload into the builder — and the tab is a child of the editor, so
reloading or closing the editor freezes it. Publishing again re-renders the tab that is already
open rather than piling up tabs.

## Scope boundaries

These are intentional limits, not oversights — see §12 for the full list. The headlines:

- **No persistence.** Reload loses everything, including uploaded images — and, because the
  published tab is a live root owned by the editor tab, reloading or closing the editor leaves
  the published tab frozen on its last render.
- **Reordering** is by dragging a row's `GripVertical` handle in the page list, or by the
  arrow buttons on each row. The handle uses pointer events, so the mobile Sections sheet
  reorders by touch too, and it mirrors the arrows on ArrowUp / ArrowDown when focused.
  The header and footer are locked: they show a padlock instead of a handle, and a drag
  clamps to the slots between them.
- **Only Retro is designed.** It ships six photographic header layouts. Lime, Grunge, Editorial
  and Pop are fully selectable and functional but render flat-colour sections and a three-layout
  flat header family. The §10.2 *layouts* are shared by all five templates; its decorative
  treatment — paper grain, torn edges, checkerboard, hard offset shadows, rotated cards — is
  gated on `s.retro`, the same split as `headerFamily()`. One piece of that treatment is placed
  rather than copied: the checker ribbon on header layout 1's floor is not in the Figma hero
  frame at all. It is lifted from the stacked header, which shares the same full-bleed
  photograph — a fixed band, unscaled at every breakpoint, run a third finer than the reference's
  24px so the squares read as texture: 16px tall, 8px squares.
- **Layout folding.** For the 13 non-header categories, more layout numbers are offered than
  there are distinct designs, so e.g. `Audio layout 1`, `4` and `7` render identically while
  keeping their own labels. The header is exempt.
- **Accessibility is scoped to the chrome.** Radix supplies focus management, keyboard
  navigation and ARIA there. The rendered preview is deliberately not accessible: it is a
  picture of a website, not a website. The seal badge honours `prefers-reduced-motion`.
