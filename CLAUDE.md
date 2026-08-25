# Encore Builder — working notes

Read [`README.md`](./README.md) first: it is a full architecture doc and this file does not
repeat it. What follows is only what a fresh session tends to get wrong.

## Where the code is

All source lives in **`source/`**. Two files at the repo root are *not* source:

- **`index.html`** (~600 KB) is the generated single-file build, committed so the demo is
  double-clickable. Never hand-edit it.
- **`mock-template.html`** (~12 MB, untracked) is a reference artefact.

`SPEC.md` is the normative spec that README and code comments number against (§3, §10.2, …).
It has been removed from the working tree but lives on in git history — read it with
`git show 8fa8ff4:SPEC.md`.

## Commands

```bash
cd source
npm install
npm run dev              # Vite dev server with HMR
npm run build            # → source/dist/
npm run build:standalone # → source/dist-standalone/index.html
```

Refreshing the committed double-clickable app is a deliberate, separate step — no build script
does it for you:

```bash
cp source/dist-standalone/index.html index.html
```

## The five hand-written files

| File | ~Lines | Role |
|---|---|---|
| `src/builder/EncoreBuilder.jsx` | 1700 | All state, all chrome, all three stages |
| `src/builder/EncoreSection.jsx` | 2160 | Presentational renderer for all 14 section types |
| `src/builder/data.js` | 500 | `THEMES`, all static data, colour helpers |
| `src/builder/photos.js` | 76 | Retro's seeded Figma photography + the two resolvers |
| `src/index.css` | 170 | Tailwind v4 entry + design tokens |
| `src/App.jsx` | 5 | Renders `<EncoreBuilder>` |

Everything else under `src/components/ui/` is stock shadcn.

`photos.js` is the only module that imports the files in `src/builder/photos/`. Keep those
imports out of `data.js` — it is documented as pure, import-free data, and the assets are ~1.7 MB.

## The one architectural rule

Two styling systems, deliberately (README §"Two styling systems, deliberately"):

- **Builder chrome** — top bar, sidebar, edit panel, drawers, sheets, toast — uses Tailwind v4
  utilities and shadcn/ui on the tokens in `src/index.css`.
- **`EncoreSection.jsx`** uses **neither**. Every value is an inline `style={{}}`, because
  section colours are arbitrary runtime hexes (`background: s.bg` where `s.bg` is `#7A58A7`).
  Its only import is `lucide-react`.

Do not try to unify them. Only `.hv-indent`, `.hv-acbord` and `.hv-acfill` cross the boundary,
because each reads the per-section `--ac` / `--acFg` custom properties.

Every section is projected through **`sectionVm()`** into a flat, fully-resolved view-model
before rendering, so `EncoreSection` does zero colour maths. `sectionVm` takes `themeIdx` as an
argument rather than reading state, so previews can render a theme that is not the active one.

## Navigation and state

No router, no context, no state library. One flat `useState` object `st` in `EncoreBuilder`,
mutated through a single `patch()` helper.

- `st.stage` is `'template' | 'start' | 'editor'` — early returns dispatch to `TemplateStage`,
  `StartStage`, or the inline editor JSX.
- `st.theme` is an **integer index** into `THEMES`, not a name or object.
- A page section is `{ id, cat, arch, c }` — category, layout index, sparse content overrides.
  Colours are not per-section: every section renders in the active theme's single `palette`.
- The `startTheme` prop in `App.jsx` skips both picker stages when it names a real theme
  (`"Picker"` deliberately matches nothing, giving the full flow).

## Intentional limits — not bugs

- **No persistence.** Reload loses everything, including uploaded images. No URL sync.
- **Retro seeds photography; the other four do not.** `defaultImage()` / `defaultImages()` in
  `photos.js` gate on `T.name === 'Retro'`, the same name-match as `headerFamily()` and the
  `retro` flag. **Remove** writes `null`, not `undefined` — `undefined` deletes the key, and an
  absent key is exactly what selects the seeded photo, so it would come straight back.
- **No drag-and-drop reordering**, despite the `GripVertical` handle. Arrows only.
- **Only Retro is designed.** Lime, Grunge, Editorial and Pop are fully functional but render
  flat. Retro's decorative language is gated on `s.retro`; it also gets six photographic header
  layouts where the others get three flat ones.
- **Layout folding.** For the 13 non-header categories, more layout numbers are offered than
  there are distinct designs — Audio layouts 1, 4 and 7 render identically on purpose.
- **Accessibility is scoped to the chrome.** The rendered preview is a picture of a website,
  not a website.
