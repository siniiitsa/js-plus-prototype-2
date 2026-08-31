# Encore Builder

A single-page, client-only prototype of a website builder for musicians and DJs, built to
[`SPEC.md`](./SPEC.md).

Pick one of five visual **templates** from a spotlight-and-filmstrip picker and land straight in
the editor on a filled-in example page — a stack of **sections** you add, remove, reorder, swap
layouts on, recolour and rewrite — while seeing a live, fully re-skinned preview. The first thing
the editor asks for is a **header layout**, in one of three competing treatments the build ships
side by side; see *Choosing a header* below.

It is a demo: nothing persists, nothing is sent to a server, and **Publish** only shows a toast.
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
  `s.bg` is `#7A58A7` picked at runtime. Its only import is `lucide-react`, whose icons inherit
  `currentColor` and so stay theme-driven.

Do not try to unify them. Only three hand-written CSS classes cross the boundary —
`.hv-indent`, `.hv-acbord`, `.hv-acfill` — because each reads the `--ac` / `--acFg` custom
properties set per section at runtime.

Every section is projected through `sectionVm()` into a flat, fully-resolved view-model before
rendering, so `EncoreSection` does zero colour maths.

## Deviations from SPEC.md

Five, all deliberate:

1. **No reference images; the Figma file replaced them.** `docs/feedback-reference/` is not
   present in this repo. The Figma file
   (`figma.com/design/uFoUbPaBrDicjyuSBEbtGT`) arrived instead and a fidelity pass has now been
   done against it for **layout 1 of all eleven sections it covers** — header, bio, media player,
   gallery, repertoire, events map, pricing, booking calendar, enquiry form, testimonials and
   footer — across its desktop (1440), tablet (768) and mobile (390) frames. Every other layout
   variant is untouched and still prose-derived. Two knock-on notes: the Figma display face is
   *Soulway*, which is commercial and cannot ship, so Retro keeps Alfa Slab One (its Anton and
   Inter faces are used as drawn); and the design's five album covers are real records, which
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
4. **No stage 2.** §6's full-screen header-layout picker has been replaced by three in-editor
   treatments, chosen from a new stage 0. See *Choosing a header* below for what and why.
5. **Toast positioning.** §3.5 maps the toast to shadcn's `sonner`, and §9.2 also specifies a
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

Which way it is asked for is the open question, so the build ships **all three candidates** and a
front door to switch between them. `st.stage` is `'option' | 'template' | 'editor'`; stage 0
(`OptionStage`) sets `st.ux` and nothing else, and the template picker carries a pill showing
which treatment is armed with a **Change** link back.

| `st.ux` | Treatment | Shape |
|---|---|---|
| `'modal'` | **A · Setup modal** | A `Dialog` over the finished page: a 3-up grid, one sentence saying what a header is, *Decide later* / *Use this header*. |
| `'sidebar'` | **B · Guided sidebar** | Nothing blocks. The header is selected, its edit panel is open, and its layout picker is expanded into a two-up grid under a coach mark. The content group is knocked back to 42% until a layout is tried. |
| `'rail'` | **C · On-canvas rail** | Every section below the header is veiled, and a rail docks over the canvas with the layouts as a filmstrip. Clicking one swaps the real header at full size. |

Three things are shared by all of them:

- **One component.** `HeaderChoices` renders the cards in all three (`mode` is `'modal'`,
  `'panel'` or `'strip'`) and is what the edit panel swaps its `LayoutPicker` for, so the control
  a user meets first is the control they keep. Its frame is the *median* of the theme's measured
  layout heights, so Retro's tall Polaroid neither crops nor strands the other five.
- **Hover previews at full size.** `st.hdrHover` replaces the header's `arch` for rendering only
  (`makeVm`), so the page previews a layout without committing it. `sec.arch` is untouched.
- **Names, not numbers.** `headerLayout()` in `data.js` promotes the names the compositions
  already carried in `EncoreSection`'s §10.2 comments — Hero, Framed, Gradient stage, Polaroid,
  Overlay card, Stage wide (and Centred / Split / Rule for the flat family) — into every label,
  including the ordinary `LayoutPicker` dropdown. Every other category stays numbered: its
  layouts are variations of one idea, and the number is honest about the folding.

`st.onboard` is the flag; any of the three exits sets it false and the editor is then just the
editor. The `startTheme` prop still skips both picker stages, and skips the onboarding with them.

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
- The layout picker, the template spotlight and all three header treatments resolve through the
  same `sectionVm()`, so each shows the photography without any extra wiring.

## Scope boundaries

These are intentional limits, not oversights — see §12 for the full list. The headlines:

- **No persistence.** Reload loses everything, including uploaded images.
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
