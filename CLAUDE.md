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
| `src/builder/EncoreBuilder.jsx` | 2630 | All state, all chrome, both stages, publish |
| `src/builder/EncoreSection.jsx` | 3520 | Presentational renderer for all 14 section types |
| `src/builder/data.js` | 635 | `THEMES`, all static data, colour helpers |
| `src/builder/photos.js` | 100 | Retro's seeded Figma photography + the three resolvers |
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
  Its only library import is `lucide-react`; from React it takes `useId`, `useState` and `useRef`
  — and no effect.

Do not try to unify them. Only `.hv-indent`, `.hv-acbord` and `.hv-acfill` cross the boundary,
because each reads the per-section `--ac` / `--acFg` custom properties.

Every section is projected through **`sectionVm()`** into a flat, fully-resolved view-model
before rendering, so `EncoreSection` does zero colour maths. `sectionVm` takes `themeIdx` as an
argument rather than reading state, so previews can render a theme that is not the active one.

## Navigation and state

No router, no context, no state library. One flat `useState` object `st` in `EncoreBuilder`,
mutated through a single `patch()` helper.

- `st.stage` is `'template' | 'editor'` — an early return dispatches to `TemplateStage`, else the
  inline editor JSX. **There is no header stage any more**: SPEC §6's full-screen picker is gone,
  and picking a template opens the editor on the built page with `st.onboard` armed. The header
  choice is then asked for by the **setup modal** — a `Dialog` over the finished page rendering
  `HeaderChoices` — see README "Choosing a header". Its cards commit on click, not on hover;
  there is no preview state. The editor opens with the header `selectedId` so the sidebar
  lands on its edit panel; the mobile edit drawer stays shut, or it would cover the page before
  it has been seen.
- `st.theme` is an **integer index** into `THEMES`, not a name or object.
- A page section is `{ id, cat, arch, c }` — category, layout index, sparse content overrides.
  Colours are not per-section: every section renders in the active theme's single `palette`.
- The `startTheme` prop in `App.jsx` skips the template picker (and the onboarding with it) when
  it names a real theme (`"Picker"` deliberately matches nothing, giving the full flow).

## Intentional limits — not bugs

- **No persistence.** Reload loses everything, including uploaded images. No URL sync.
- **Publish opens a second tab, and that tab is a live React root** (the *Publish* block in
  `EncoreBuilder.jsx`; it is post-SPEC, so it carries no § number),
  not a serialised snapshot — it has to be, because `EncoreSection` has no media queries and
  would otherwise be frozen at the editor's width. `PublishedPage` calls `sectionVm` directly,
  never `makeVm`. Two rules there are load-bearing: build the popup's document by DOM mutation,
  **never `document.write`** (it implies `document.open()`, which rewrites the popup's URL to the
  opener's, so the tab would claim to be the builder and reload into it); and set the page
  background on `documentElement`, not `body`, because the cloned reset already paints `html`.
  The tab is a child of the editor and freezes if the editor reloads. Accepted.
- **`s.live` is false everywhere except the published tab.** It is the seam for making a control
  real, and **four things read it**: `Repertoire` — its search field, its filter chips and
  its pager — the **header's navigation**, the **media player** (below), and the **media player's
  Soundcloud button**, the one outbound link (`extLink()` in `EncoreSection`, `extUrl()` in
  `data.js`: it opens in a new tab, and a schemeless address is given `https://`, or
  `<base href>` would resolve it against the builder). Everything else — the gallery filmstrip,
  the events map's pager, the audio and video sections — is
  still a picture. Do **not** make `EncoreSection` interactive
  without gating on it: the editor canvas is a picture of a website, and a live filter chip there
  would both filter and select the section. `EncoreSection` therefore imports `useState` and
  `useRef` as well as `useId`; that is the whole of its React surface and it stays that way —
  there is **no effect anywhere in the file**, which is why `NavMenu`'s panel has no Escape key,
  no scroll lock and no focus trap. Each of those wants one.
- **The media player plays, in the published tab only.** One `<audio>` element per section,
  rendered only when `s.live`; a click anywhere on a track card loads that track, and the
  transport is a real play/pause, previous and next, wrapping at both ends, with `ended`
  advancing. Three rules there: the source is assigned **imperatively** (`a.src = url; a.play()`),
  never as a `src` prop, or a re-render from `onTimeUpdate` would reload the file under the
  playhead — and Safari refuses to autoplay a freshly mounted element; `playing` mirrors the
  element's own `play`/`pause` events, not the click handlers, so a refused `play()` cannot leave
  the icon lying; and `cur` starts at **-1**, meaning nothing has been chosen, so nothing is
  marked as playing and the clock does not start — the card still names and shows track one,
  which is what the player is cued to. `FIELDS.media` therefore has **no now-playing track or
  sleeve field**: a second, separately editable copy of what the card shows could only
  contradict the list. Do not mark the
  playing card by raising it out of the stack — the cards overlap by 18px at the foot and a raised
  one covers the *next* card's title; the Pause icon and the now-playing block are the whole cue.
- **The header's nav scrolls, and the scroll lives outside `EncoreSection`.** `sectionVm` gives
  every section `vm.anchor = cat` (categories are unique per page, so `#repertoire` is a valid
  id), the section root applies it as `id` **only when `s.live`** — the editor document renders a
  dozen header previews and they would all claim `id="header"` — and one delegated `click`
  listener in `dressPublishedWindow` turns a fragment href into a `scrollIntoView`. A fragment can
  never be *followed* in the popup: `<base href>` pins it to the opener's URL, so the tab would
  reload the builder. On the canvas the links carry **no href at all** (not `#`, which would jump
  the builder to its own top); `navHref()` in `EncoreSection` is the whole of that gate.
  `navSections` is `{ cat, label }` and `vm.navLinks` is `{ label, to }` — key the map on `label`,
  because Minimal's Shows and Book can resolve to the same section. Below `desktop` the links
  collapse to `NavMenu`'s burger, in all six Retro layouts.
- **Two list-shaped contents have a structured editor: the repertoire's songs and the media
  player's tracks.** `c.songs` is an array of `{ title, artist, tags }` (tags a raw comma string),
  maintained by `SongsField`; `media`'s `c.tracks` is an array of `{ title, sub, image, audio }`,
  maintained by `TracksField`, and it is the only field whose *rows* carry a photograph
  (`RowThumb`, the 46px cousin of `ImageField`) and a sound file. `audio` is an address, not an
  upload — an image is inlined as a data URI and a track is two orders of magnitude larger —
  and `sectionVm` normalises it through `extUrl()` onto `vm.tracks[].src`. `c.tracks` is
  deliberately one key with two
  shapes — `audio` keeps the delimited *string* of its textarea, `media` owns the *array* — and
  `sectionVm` reads both, plus the seeded `TRACKS` (dressed in `TRACK_AUDIO`) when the key is
  absent. Per-row art and audio are never
  re-seeded by index once the array exists, or a row inserted third would steal track three's
  photograph. Every other repeated field is a delimited textarea (`FIELDS.audio.tracks`,
  `FIELDS.tags.tags`) or a flattened key set (`pricing`'s `t1n`/`t1p`/…). It follows `images`, not
  `image`: an absent key means the seeded `SONGS`, an emptied array means no songs, and there is no
  `null` sentinel. The chips are derived from the tags, so nothing sets them directly, and the
  heading falls back to the song count in `sectionVm` **and** in `EditPanel` — change one, change
  both.
- **Retro seeds photography; the other four do not.** `defaultImage()` / `defaultImages()` /
  `defaultTrackArt()` in `photos.js` gate on `T.name === 'Retro'`, the same name-match as
  `headerFamily()` and the `retro` flag. **Remove** writes `null`, not `undefined` — `undefined`
  deletes the key, and an absent key is exactly what selects the seeded photo, so it would come
  straight back. For the same reason `Photo` treats `src={null}` (this slot has no picture) as
  distinct from no `src` prop at all (fall back to `s.image`): an empty gallery slot shows the
  section photo and an emptied one does not, and the media player passes `null` for an art-less
  track row so it cannot inherit anything. **`media` has no section photo at all** — no `image`
  field, no `RETRO_PHOTOS.media` — because the player shows the artwork of the track it is on.
- **Reordering** is drag-by-handle *or* arrows. `SectionList` owns the drag; `dragRef` is the
  source of truth and the `drag` state only mirrors it for rendering, so pointerup commits
  what it can see rather than what the last render observed. Rows are a uniform height, so
  the drop index is the pointer delta in row-heights, not a hit test.
- **Only Retro is designed.** Lime, Grunge, Editorial and Pop are fully functional but render
  flat. Retro's decorative language is gated on `s.retro`; it also gets six photographic header
  layouts where the others get three flat ones.
- **Layout folding.** For the 13 non-header categories, more layout numbers are offered than
  there are distinct designs — Audio layouts 1, 4 and 7 render identically on purpose. Those
  categories are also the ones that stay *numbered*: only the header's layouts have names
  (`headerLayout()` in `data.js`), because it is the one a first-time user is asked to choose.
- **Accessibility is scoped to the chrome.** The rendered preview is a picture of a website,
  not a website.
