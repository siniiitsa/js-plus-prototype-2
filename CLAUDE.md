# Encore Builder — working notes

Read [`README.md`](./README.md) first: it is a full architecture doc and this file does not
repeat it. What follows is only what a fresh session tends to get wrong.

## Where the code is

All source lives in **`source/`**. Two files at the repo root are *not* source:

- **`index.html`** (~6.5 MB — most of it the inlined Retro and Lime photography) is the generated
  single-file build, committed so the demo is
  double-clickable. Never hand-edit it.
- **`mock-template.html`** (~12 MB, untracked) is a reference artefact.

`SPEC.md` is the normative spec that README and code comments number against (§3, §10.2, …).
It has been removed from the working tree but lives on in git history — read it with
`git show 8fa8ff4:SPEC.md`.

Design-pass plans live in **`plans/<template>/`**, one file per pass — Retro's are
`plans/retro/layout-2.md` … `layout-4.md`. Start at [`plans/README.md`](./plans/README.md).

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
| `src/builder/EncoreBuilder.jsx` | 4140 | All state, all chrome, both stages, publish |
| `src/builder/EncoreSection.jsx` | 21310 | Presentational renderer for all 11 section types |
| `src/builder/data.js` | 1290 | `THEMES`, all static data, colour helpers |
| `src/builder/photos.js` | 205 | Retro's and Lime's seeded Figma photography + the three resolvers |
| `src/index.css` | 170 | Tailwind v4 entry + design tokens |
| `src/App.jsx` | 5 | Renders `<EncoreBuilder>` |

Everything else under `src/components/ui/` is stock shadcn.

`photos.js` is the only module that imports the files in `src/builder/photos/`. Keep those
imports out of `data.js` — it is documented as pure, import-free data, and the assets are ~4.0 MB.

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
The **enquiry form is the one exception to "fully-resolved"**: `vm.formMailto` and `vm.formCheck`
are *closures*, not values, because their inputs are the visitor's keystrokes and `sectionVm` never
sees those. Everything else about them — the address, the labels, the casing — is still bound in
`sectionVm`, so `EncoreSection` hands over indexes and raw strings and composes nothing. They are
the only function-valued keys on the whole view-model.

## Navigation and state

No router, no context, no state library. One flat `useState` object `st` in `EncoreBuilder`,
mutated through a single `patch()` helper.

- **The page is rows, and nearly every row is one section.** The exception is layout 3's
  composed page: at desktop, `pageRows()` in `data.js` stands a calendar on layout 3 in a
  right column beside the bio / media sections on layout 3 directly above it, and
  `arrangeRows()` in `EncoreBuilder.jsx` draws that row as a 858fr : 405fr grid inside the
  page gutter. Both the editor canvas and `PublishedPage` go through the pair, and the
  sections in it are built with `sectionVm({ column: true })`, which drops their horizontal
  padding. Tablet and mobile never compose. `PAGE_ORDERS[2]` is the narrow frames' order —
  media, repertoire, calendar — and at desktop `pageRows` looks past that one layout-3
  repertoire, composing the columns and standing the repertoire after them; moving a section
  out of the run undoes it.

- `st.stage` is `'template' | 'editor'` — an early return dispatches to `TemplateStage`, else the
  inline editor JSX. **There is no header stage any more**: SPEC §6's full-screen picker is gone,
  and picking a template opens the editor on the built page with `st.onboard` armed. The header
  choice is then asked for by the **setup modal** — a `Dialog` over the finished page rendering
  `HeaderChoices` — see README "Choosing a header". Its cards commit on click, not on hover;
  there is no preview state. **A card lays out the whole page, not only the header**: the layout
  indices are aligned across categories by construction (layouts 1, 2, 3 and 4 of every section
  are one Figma page each), so `pickHeader` writes `arch` to *every* section, folded through
  `pageLayout()` in `data.js` — `i % designCount(cat)`, which is always a row the layout picker
  can highlight, and is the lowest `arch` rendering the design asked for. It also **reorders**
  the page into `pageOrder(i)` (`data.js`), because each Figma page stacks its sections in its
  own order — layout 2's reads repertoire before gallery and map after calendar. That is the
  setup modal alone: the sidebar's `LayoutPicker` still moves the one section it is opened on, and
  must keep doing so, or a later header swap would silently undo everything the user had tuned.
  The bulk write is only safe because the modal is a one-shot gate over a page nobody has touched
  yet. The editor opens with the header `selectedId` so the sidebar
  lands on its edit panel; the mobile edit drawer stays shut, or it would cover the page before
  it has been seen.
- `st.theme` is an **integer index** into `THEMES`, not a name or object.
- **`st.device` is the toggle, `device` is what the canvas draws.** A window at most 1180 wide
  (iPad Air landscape; `useTabletCap`) caps it at tablet and disables the Desktop tab, since
  the desktop composition squeezed beside the sidebar breaks; at most 820 the phone chrome
  forces mobile, as before. Read `device`, never `st.device`, for anything drawn.
- **`st.removed` is `{ [cat]: { arch, c } }`, the last deleted section of each category**, so
  re-adding a category restores its content (data-URI uploads and all) and the add composer
  opens on its old layout; the composer's *Start fresh* tick (`st.add.fresh`) opts out. Its keys
  are only ever categories **not** on the page — `addSection`, Undo and Start fresh all consume
  the entry, and picking a template resets it. `del` is still one click from all three call
  sites (the list row's menu, `EditPanel`'s Delete, the canvas toolbar's trash) and toasts an
  **Undo** that reinserts the very same section object at `min(oldIndex, sections.length - 1)`
  (the footer stays last) without selecting it. The toast helper takes an optional
  `{ label, run }` action; such a toast lives 6 s but is still replaced by the next toast, since
  `st.removed` holds the content either way. `del` and `addSection` read the section off the
  **rendered** `st.sections`, not from inside the `patch` updater — React may run an updater
  after the handler returns, so a flag set in there is not there yet. On a phone the toaster
  moves to the top while any drawer is open (closing the drawer remounts a live toast at the
  bottom, fade and timer restarting). The drawers also carry `keepOnToast`, a guard against a
  press on a toast counting as outside, though vaul was measured not to close on one anyway.
- **The artist's name is the header's `c.title`.** The `artistName` prop only seeds it: the
  builder derives `artistName` from the header section (trimmed, falling back to the prop when
  empty) and passes *that* everywhere — nav brand, initials placeholders, bylines, badge,
  `copyrightOf()`, the published tab's `<title>` (reset on every republish, not only when the tab
  is first opened) and the dialog's site address. Header `badgeText` and footer `copyright` have
  no static default for that reason; `EditPanel` special-cases them beside `title`. **The
  artist's role and town are the header's too** (F1): `headerIdentity()` in `data.js` reads the
  header's raw `kicker` / `location`, and `sectionVm({ identity })` gives them to every other
  section — the bio (its role lines, polaroid rail and ID card), the calendar (layout 1's polaroid
  stamp, which Lime's layout-1 block does not draw, and layout 4's summary card) and the enquiry form's credit — which have no field for either. The header
  reads its own `c`, so previews of other layouts still show theirs. Canvas, published tab and
  `LayoutPicker` all pass it; the harness takes `&who=<json>`. `vm.roleLine` is the pair
  composed with its `·`, so an emptied half drops with the separator, and an emptied value
  drops the ID card's column (the `since` rule). **The tag chips are the header's as well**
  (JP-037): `FIELDS.header.tags` is a comma list seeded with `TAG_LABELS` (five — the Tags
  component hides its sixth chip), and `identity` carries `tags` and `showTags` to the bio,
  which prints them in layouts 2 and 4 and Lime's 3 (measured, `scripts/reach.mjs`). An emptied
  list folds into `vm.showTags = 'hide'`, since every reader of that key is a chip-row gate.
  **`vm.chips` is a palette, not the chip row**: six colour seats off `TAGS`, read as
  `s.chips[3].bg` and the like across header, media, map and pricing, carrying no label and
  never changing length; the rows print `vm.tagChips`, the labels seated on it by index,
  wrapping. Layout 2's other three literals went the same way: the hero pill is
  `FIELDS.header.heroCta` (`vm.heroCta`), and the bio card's foot row is `FIELDS.bio.credit` /
  `cta` — `vm.bioCredit` is `{ lead, rest }`, the first three words taking the accent, split in
  `sectionVm`; each drops when emptied and the row with both.
- A page section is `{ id, cat, arch, c }` — category, layout index, sparse content overrides.
  Colours are not per-section: every section renders in the active theme's single `palette`.
- **`FIELDS` exposes every key any layout reads. A layout that does not consume a key simply
  ignores it, and the panel says so**: a field's `in` lists the designs that read it (0-based,
  `arch % designCount` and never the raw `arch`; an array, or an object keyed by template with
  `'*'` for the rest), and `fieldReach()` in `data.js` is what `EditPanel` asks before printing
  "Not shown in this layout" under the label ("…in this template" where `fieldNowhere()`
  finds the template's row empty). The field stays editable — switching layouts
  never discards copy. `in` is **measured, not read off the prose**: type into the field and
  see whether the section's HTML moves, canvas and `live`, at all three widths. The header's
  `in` names Retro and Lime only, so the flat three's undesigned header family carries no
  note. A field no design reads is deleted, not kept at `in: []`: `bio.statement` and
  `map.sub` went that way with the fallthroughs that read them (the other seven NVAR-4
  sections still end in one after `v3`, which `arch % designCount` never reaches).
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
  real, and **sixteen things read it**: `Repertoire` — its search field, its filter chips and
  its pager, and in layout 3 the set cards' *View full set* reveal, which is the one control
  in the file that is a **reveal rather than a toggle**: the frame draws four song rows and a
  link, so the link is what reaches the fifth song and there is no way back, and in layout 4
  the **A–Z index rail**, which is the one control in the file that **scrolls from inside
  `EncoreSection`** — a `scrollIntoView` off a callback ref, on a letter some song actually
  starts with, where the header's nav needs the published tab's own delegated listener — the
  **header's
  navigation**, the **bio's own Listen** (layout 4 alone, in the overlay card's meta row: the
  header's `ListenLink` on the same `vm.listenTo`, which is resolved for every section),
  the **media player** (below), the **gallery's arrows
  and thumbnail strip, and layout 3's fullscreen viewer** (below), the **events map's pager, its pin/row pairing, its map zoom
  (layouts 3 and 4, and Lime's layout 2) and — in layout 3 alone — its city chip row and its See all gigs reveal**
  (below),
  the **pricing section's chip row and Book pill** (below — the row filters the deck in layout 1,
  picks the single big plan in layout 2 and filters the stack in layout 3, where it also moves
  which row is featured),
  the **booking calendar's month arrows, its day picking, its foot pill and — in layout 4 — its
  enquiry wizard** (below),
  the **enquiry form's boxes, its event-type chips and its submit** (below),
  the **testimonials carousel's arrows** (below — layout 2 pages the same `cur` from a rail of
  initial tiles instead, layout 4 pages it from a pair of arrow discs in its head, and layout 3
  reads it **not at all**: it is a wall of every review, so there is nothing to page),
  the **footer's link columns and its Book pill** (below),
  **Lime's media-player Book pill** (layout 1: `vm.mediaCta` on `vm.bookTo`, below),
  and the four sets of outbound links — the **media player's
  Soundcloud button**, the **gallery's YouTube / Instagram / TikTok rows**, the
  **events map's per-gig tickets link** and the **footer's web-address rows**
  (`extLink()` in `EncoreSection`, `extUrl()` in
  `data.js`: they open in a new tab, and a schemeless address is given `https://`, or
  `<base href>` would resolve it against the builder; anything `urlProblem()` refuses — a scheme
  outside http / https / mailto / tel, whitespace inside, a schemeless host with no dot, `//host`
  — comes out `''`, which is each seam's existing no-link state, and a track's audio also refuses
  mailto / tel. Every address input in `EditPanel` is a `UrlInput`, which prints that reason under
  the box on blur). Do **not** make `EncoreSection` interactive
  without gating on it: the editor canvas is a picture of a website, and a live filter chip there
  would both filter and select the section. `EncoreSection` therefore imports `useState` and
  `useRef` as well as `useId`; that is the whole of its React surface and it stays that way —
  there is **no effect anywhere in the file**, which is why `NavMenu`'s panel has no Escape key,
  no scroll lock and no focus trap. Each of those wants one — except the Escape key and the scroll
  lock, which the gallery's layout-3 viewer gets without one: it focuses itself off a callback
  ref and reads its own `onKeyDown`, and the same ref locks the page's overflow and returns a
  React 19 ref cleanup that restores it. `NavMenu` could take the same route.
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
  contradict the list. Nor does `NOW_PLAYING`, which is only the canvas's mid-song clock: with
  **no tracks at all** the card names `vm.mediaEmpty` (the one "No tracks yet." the empty lists
  print too) and `sectionVm` stops the clock at 00:00 under an empty bar on both surfaces, since
  a mid-song clock with nothing cued is a lie. The transport stays wired but inert there —
  `goTo` returns on an empty list before its modulo. Do not mark the
  playing card by raising it out of the stack — the cards overlap by 18px at the foot and a raised
  one covers the *next* card's title; the Pause icon and the now-playing block are the whole cue.
  **Layout 2 plays through the same hooks**, and draws the one list twice: the fan and the
  numbered list beside it are both the whole of `s.tracks`, and **layout 3 is that numbered
  list under a bar-meter now-playing card** (its disc is the play/pause, its meter counts bars off
  `vm.contentW`), so `list` is `s.v0 || s.v1 || s.v2 || s.v3 ? s.tracks : s.tracks3` — every
  design plays the whole list, and `s.tracks3` (three) serves only the unreachable fallthrough,
  whose Next must not leave the page.
  **Layout 1's pill is per template, because the frames disagree** (JP-034, user call,
  2026-09-18): Retro's frame draws a Soundcloud pill, so under Retro and the flat three it is the
  `soundcloud` link and an empty address leaves it a picture; Lime's draws Book Now, so under
  Lime the seat is `FIELDS.media.cta` — `vm.mediaCta`, uncased, on `vm.bookTo` with no
  self-exclusion since `media` is not in `CTA_TARGETS.book`, and an emptied label drops it, the
  footer pill's rule — and the Soundcloud pill stands beside it **only when filled**, in a
  wrapping row no master draws. `cta`'s `in` is `{ Lime: [0], '*': [] }`: the `'*'` row is what
  prints "Not shown in this template" on the other templates (`fieldNowhere()`: an empty row
  means no layout of that template reads the key, so the note does not promise one), an
  uncovered template being left unmarked.
  Layout 2's fan is a **carousel**: the seats are fixed and symmetric about the middle, and the tracks
  rotate *through* them, wrapping, so the centre seat always holds the track the player is on.
  Do not centre the seats on `at` instead — `at` is 0 until a visitor picks, and the fan would
  open one-sided. Geometry and hue belong to the seat, not the track, or the composition would
  shuffle its colours on every pick; the centre is the accent and carries the Featured tab. On
  the canvas the seats are unrotated (the Figma frame's picture) and the bar takes the **centre
  seat's** title and artwork rather than the shared now-playing block's, which names the cued
  first track — live the two are the same track by construction.
  **Layout 4 plays through the same hooks as well**: the sleeve is the track the player is on,
  and the grid beside it is one photographic tile per track with the tile at `at` carrying the
  same rust mark the sleeve's own border is. That mark is a **seat**, the fan's rule rather than
  `chosen`'s — `at` is 0 until the visitor picks, so the canvas draws the frame's own marked
  first tile by construction — and on the tile it is an **inset ring on the scrim**, not a
  border: `inset: 0` resolves against the padding box, so a border (even a transparent one on
  the unmarked tiles) would inset every photograph and widen the frame's own gutter. Under
  Lime the mark on both the sleeve and the tile is the frame's inset **glow** (a 34px `s.ac`
  inner shadow) rather than a ring, still a shadow on the scrim for the same reason. It is also
  the one layout whose section paints the page's whole band — Retro's cream with a
  checkerboard strip at each end, Lime's olive `s.box1` with a lime arc seam at its head and a square foot (the
  frame's dark foot arc met the gallery's head arc as a lens; user call, 2026-09-18) — and the
  only one to draw those strips or arcs.
- **The gallery browses, in the published tab only, and its three social rows leave the page.**
  Thumbnails are clickable, the rail's arrows step and wrap, "Back to beginning" rewinds, and the
  tile counter and viewer follow. `pick` starts at **-1** for the same reason `cur` does: nothing
  chosen, so both sides open on `galActive()` and the published first paint is the canvas's
  picture by construction. All **seven slots** are navigable, not just the filled ones — an empty
  one shows in the viewer the placeholder it shows in the strip, so the count cannot shift under
  the visitor. Mobile draws four of the seven, and that window **slides** once the visitor walks
  past the fourth (`from = clamp(active - 3, 0, 3)`), which leaves the first four anchored at 0 so
  the canvas's mobile picture is the Figma frame's, unchanged. The three social rows read
  `youtube` / `instagram` / `tiktok`, whose keys live on `GALLERY_SOURCES` — change the field list
  in `FIELDS.gallery`, change that array. The first row has no key: it *is* the strip. An
  **unfilled social row is not rendered at all when `s.live`** — an artist with no TikTok should
  not publish a tile promising one — which is where the gallery parts company with the Soundcloud
  button, still a picture when empty (that is the "Soundcloud rule" wherever this file says it —
  though under Lime the button it is named after no longer follows it: JP-034, in the media
  player's paragraph above). The **canvas keeps all four regardless**: it is the reference
  design, the three fields start empty, and a fresh page would otherwise open on a single tile with
  no clue the others are a field away. The filter carries the index, because `srcIcons` and the
  per-source colours are positional. And the mobile source row **wraps** rather than clipping: the
  Figma frame lets it run off the right edge, which put TikTok — now a link — off the page. Four
  content-sized tiles come to ~430px against a 390 frame, so wrapping is what keeps every tile at
  its drawn size. **Everything in this paragraph from "Mobile draws four" on is layout 1's**:
  layout 2 browses through the same `pick`, but it is a hero photograph beside a masonry of six
  and it draws **no source rows at all**, so the hide-the-empty-row rule and the four-tile mobile
  window are that layout's and not the section's. Its **tiles are fixed** (user call, 2026-09-15;
  they used to rotate through the seats, the media player's fan rule, and read as the thumbnails
  shuffling under the click): the rail is the six slots other than `galActive()`'s, counting on
  from the one after it and wrapping — the old rotation's order at rest, so the canvas is
  unchanged — six tiles at 1440 and 768, and ten at 390, where they loop — and a pick moves only
  the hero.
  The picked tile carries an inset accent ring, and clicking it again resets `pick` to -1, which
  is the only way back to the `galActive()` slot, since that one has no tile. No ring on the
  canvas or the published first paint, which therefore stay the Figma picture;
  the three social addresses reach layout 1 only, which is `FIELDS.media.soundcloud`'s case three
  times over and is why their hints name a layout. **Layout 3 opens a fullscreen viewer on the
  same `pick`** (user call, 2026-09-15 — its frame draws a plain grid and nothing to open): -1 is
  closed and a slot index is open on it, so the canvas draws no overlay; only filled slots open
  and the arrows step through only those; the overlay is `position: fixed` inside the section,
  takes focus off a callback ref so Escape and ← / → reach its own `onKeyDown`, closes on any
  click that is not a control, and locks the popup's scroll while open — `overflow: hidden` on
  its `<html>` and `<body>` with the scrollbar gutter kept, set in that same ref and undone by
  the ref's React 19 cleanup (under Lime its scrim is the page ink at .94 and its controls
  pale, the only thing about the viewer that moves). **Layout 4 browses through the same `pick` for
  the fourth time** — a spotlight photograph beside a rail of all seven thumbnails, with two arrow
  discs under it that step and wrap on layout 1's own `go`. Under Retro it carries **no active
  mark**: its Figma frame rings all six of its thumbnails identically, and what names the chosen
  slot is the spotlight, which on the canvas is `galActive()`'s slot 3 — the frame's own fourth
  thumbnail. Lime's wide masters *do* mark it — the fourth thumbnail is ringed at 3px where the
  others are 1px, so under Lime the ring follows `active` on the wide rail (an inset-shadow
  overlay, not a border, so no photograph is inset) and is 4px on every 390 tile, not live-gated
  because the canvas draws the frame's own ringed fourth thumb. Its
  **390 master runs its strip off its own page** (six fixed 121px tiles in a 370 frame, so three
  and a sliver show and the one its spotlight is on does not), so there the three visible tiles are
  a **sliding window** on layout 1's formula, `from = clamp(active - 2, 0, 4)` — not live-gated, so
  the canvas and the published first paint agree on slots 1–3. It draws no source rows either: the
  Figma wrapper carries layout 1's four as a `hidden` frame.
- **The events map pages and pairs, in the published tab only.** Layout 1's gig list is the
  artist's (`FIELDS.map.gigs`, above), so nothing about it can stay a fixed five. The pager is
  **derived** from the list the way the repertoire's is, `PAGES` is gone, and it is **not
  rendered at one page** — with the seeded five gigs the reference picture therefore carries no
  pager at all, which is the intended diff, not a regression. `perPage` is `vm.gigPage`, which is
  `PINS.length`: one page of gigs is exactly one set of distinct pin positions, so the two counts
  move together and a page never lights the same dot twice. Each gig carries the `pin` it lights
  (`PINS[i % PINS.length]`, paired in `sectionVm` — `EncoreSection` does no maths), and the tile
  draws a pin per gig **on the current page**, so the map follows the pager. `sel` starts at
  **-1** for the reason `cur` and `pick` do, and it indexes the **whole** list rather than the
  page, so paging away from a lit gig and back finds it lit. Clicking a row *or* its pin toggles
  the pairing — **click on both sides, never hover**: a phone has no hover, a `<div>` is not
  focusable, and a `mouseleave` reset would wipe a pin click the moment the pointer crossed a
  row. The row's tickets link does not fight that: it is `target="_blank"`, so one click both
  opens the tab and lights the pin. An **empty link leaves the row a picture** — the Soundcloud
  rule, not the gallery's hide-the-row rule, because a gig is a show the artist is playing, not
  a tile promising somewhere to go. The hue is computed over the whole list in `sectionVm`, or a
  gig would change colour as the pager turned. **Everything in this paragraph from "Clicking a
  row *or* its pin" on is layout 1's**: layout 2 is a featured gig beside the rest of the page,
  and it shares the seam whole rather than growing one — the same `page` over the same
  `gigPage`, so its map draws the same one-pin-per-gig-on-the-page and cannot collide either;
  the same `sel` over the whole list, except that there it names the gig the **panel features**
  rather than the row that lights, so it is **picked, not toggled** (a featured panel always
  holds one, and there is nothing to toggle back to). Its list is the page **minus** that gig,
  which is where the frame's own "Other upcoming · 4" comes from, and `feat` falls back to the
  page's first gig whenever `sel` is off-page — the canvas, the -1 start and a gig deleted under
  the visitor, all in one test. Its pager takes the wide `pageWindow` except at 390; under Lime
  it takes the compact one at every width, layout 1's map recipe, and the Lime map draws the
  same screened raster on Retro's own dark plate. **Layout 3 is layout 1's lit row and layout 2's featured panel
  in one control**: its rows light *and* the panel beside them features, on the same `sel`, so
  nothing is removed from the page the way layout 2 removes the featured gig from its list — and
  the lit row is **not drawn at one row**, which is exactly the 390 canvas, where a page is one
  gig. It is also the only layout with a **filter**: a chip row derived from the gigs' own
  cities (`vm.gigChips`, one chip per distinct city with its count, behind an All and not built
  below two cities), because the frame's own Upcoming/Past chips are a status nothing here can
  know. That filter is the one thing in this section that can break the
  one-pin-per-gig-on-a-page rule: it punches holes in the indices, so a filtered page of six or
  more can seat two gigs on the same `PINS[i % 5]`. Pairing the dot with the row's place on the
  *page* would close it and pin every gig to dot 0 at 390, where a page is one gig, so the edge
  is named rather than fixed. `perPage` is `gigPage` at both wide widths and **1** at 390, where
  the master draws one row over a two-arrow pager. A gig's `link` reaches all three: layout 1's
  whole row, layout 2's ↗ and Venue Link pill (beside which its Get Directions pill takes
  `vm.gigs[].directions`, a Google Maps route composed from the venue and city), layout 3's
  Tickets → column — and layout 3 drops
  the frame's second `↗` beside the venue, the same address marked twice. **Layout 4 is the
  pager alone**: its whole gig list is one ticker (mustard under Retro, an olive `s.box1`
  capsule in a `s.stroke1` hairline under Lime) at a `perPage` of **1**, so `page` is
  the only list state it reads — `sel` reaches nothing there, the way the testimonials' `cur`
  reaches nothing in their wall; its other state is layout 3's `zoom`, on the same radial
  raster, ring labels and zoom controls (QA, 2026-09-15) — and the arrows **wrap** at both ends
  rather than clamping, the media player's rule. It is also the one layout that draws raw `vm.pins` *and* has a list to pair
  with: all five seats are on the map and the gig on show lights the one it was paired with, by
  identity (`vm.gigs[].pin` and `vm.pins` are the same five objects), so one gig to a page means
  the one-pin-per-gig rule holds by construction and the filter's edge above cannot arise. The
  dots carry no handler — five seats over any number of gigs means a dot does not name one — the
  ticker's own text block is the gig's `link` where it has one (layout 1's empty-link rule
  again), and the ticker is **not drawn at one gig** and gone at none. Its section stands on the
  page ground, so the root's `darkMap` flag stays layout 1's.
- **The header's nav scrolls, and the scroll lives outside `EncoreSection` — because it is an
  `href`.** The repertoire's layout-4 A–Z rail scrolls from *inside* the file, and the two do not
  contradict: the nav's target is a fragment, which cannot be followed in the popup, so it needs
  the delegated listener below; the rail holds the node itself on a callback ref and calls
  `scrollIntoView` on it, which needs nothing outside. `sectionVm` gives
  every section `vm.anchor = cat` (categories are unique per page, so `#repertoire` is a valid
  id), the section root applies it as `id` **only when `s.live`** — the editor document renders a
  dozen header previews and they would all claim `id="header"` — and one delegated `click`
  listener in `dressPublishedWindow` turns a fragment href into a `scrollIntoView`. A fragment can
  never be *followed* in the popup: `<base href>` pins it to the opener's URL, so the tab would
  reload the builder. On the canvas the links carry **no href at all** (not `#`, which would jump
  the builder to its own top); `navHref()` in `EncoreSection` is the whole of that gate.
  `navSections` is `{ cat, label }` and `vm.navLinks` is `{ label, to }` — key the map on `label`,
  because Minimal's Shows and Book can resolve to the same section. **The label is the visitor's
  word, not the editor's** (JP-033): `CATS[].nav` through `navLabel()` in `data.js` — About, Top
  Tracks, Media, Repertoire, Shows/Coverage, Pricing, Enquiries, Reviews, the eight every frame's
  nav and footer draw, plus **Availability** for the calendar, which is on the seeded page and in
  no frame's nav (user call, 2026-09-18: a ninth link over an unreachable section). `catName()`
  keeps every editor-side use, `FOOTER_TARGETS`' select included. One `navSectionsOf(cats)`
  builds the list for the editor, `PublishedPage`, the picker's `previewNav` and the harness, and
  `FOOTER_LINKS` seeds its labels from the same `navLabel()`, so a fresh page's two lists agree;
  the footer's rows are then the artist's to reword and the nav's are not. `vm.calFlow` reads
  these labels too, so calendar layout 2's head says "Availability · Pricing · Enquiries" where
  its frame's flow says "Available dates · Packages · Enquire". **The flat three's header reads
  none of this**: `FlatNav` hardcodes Music / Shows / Book. Below `desktop` the links
  collapse to `NavMenu`'s burger in four of the six Retro layouts; layouts 5 and 6 draw
  `NavLinks`, which keeps the (wrapping) link row at 768 and collapses only at 390 (measured in
  JP-033's digest). Layout 2's 768 master draws the
  links instead, and is **not** followed: its three are the Figma component's default, where
  `navLinks` is the artist's page and the seeded eleven sections give nine — 576px of type at the
  master's own 16px, 720 with the capsule's eight 18px gaps, in a 688px canvas that also seats the
  wordmark, Listen and the pill (re-measured on the visitor's words, JP-033). What that master does settle is the bordered capsule the burger stands in, which
  its own 390 sibling draws the same way.
- **The pricing cards filter, in the published tab only.** The Solo / Trio / Band selector was a
  constant (`TIER_MODES`, gone) over a hardcoded three cards; the packages are now the artist's
  (`FIELDS.pricing.tiers`, below) and the chip row is **derived from their tags** by the same
  `repChips()` the repertoire uses, `REP_ALL` chip and all — so the seeds' tags are what redraw
  the frame's three modes, behind an `All`. The row is **not rendered at one chip**: a page whose
  packages carry no tags has nothing to filter, which is the pager's rule, and the extra `All`
  chip on the reference picture is the intended diff. `active` is clamped against the row, the
  canvas pins chip 0 and filters nothing, and the card **keys on the package's index in the whole
  list** (`t.n`) rather than on its place in the filtered one: the card cross-fades its
  background, so a positional key would hand a filtered-out card's node to its neighbour and
  animate one card hue into another. The tilt and the mobile overlap take the *rendered* index
  instead — they are decoration, and the deck has to read as a deck at any count. The hue is
  computed over the whole list in `sectionVm`, the gigs' rule. The empty state is one message where
  the repertoire's is two — every chip but `All` exists because some package carries its tag, so a
  filter here cannot empty a list that has anything in it; there is no search box to do what the
  repertoire's does. Three columns stay three columns:
  a fourth package wraps to a second row rather than squeezing the first three. The card's Book
  pill takes `vm.tierBookTo`, which is `vm.bookTo` **minus `pricing` itself** — `CTA_TARGETS.book`
  ends there, so the pill would otherwise scroll the visitor to the section they are reading; with
  neither a form nor a calendar on the page it resolves to nothing and `BookPill` stays a span.
  **Everything in this paragraph from "The row is *not* rendered at one chip" on is the deck's**
  — layout 1's and, where it says the same thing, layout 3's: layout 2 is a single big plan, and
  its chip row names the
  **packages** rather than their tags — one chip each, the card showing the one selected, so the
  design cannot strand every package but the first. It is the same `chip` state, the same
  `s.live` gate, the same clamp and the same pinned 0 on the canvas; what it is not is a filter,
  which leaves `vm.tierChips` reaching layouts 1 and 3 (`FIELDS.media.soundcloud`'s case again —
  the field's hint says which layouts read the tags). Its card is painted from **`vm.tierHero`**,
  not from the selected package: the hue belongs to the seat, the media player's fan rule, or one
  card would recolour on every toggle. All three layouts' colours now come out of one
  `tierHues()` in `sectionVm`. Layout 2 also has no grain — its frame carries none — and it is
  what made **`BookPill`'s flat branch honour `bg`/`fg`** (defaulting to the accent pair): a pill
  standing on a card in the accent hue was invisible on Pop, in layout 1 as well as layout 2.
  The card's pill is labelled by `cta` (`vm.pricingCta`, uncased) with `note`
  (`vm.pricingNote`) beside it and stacked under it at 390, in Retro's card and Lime's alike
  (JP-036: Lime's pill took no label and printed the section's static `cta1`, "Book Now", where
  its frame reads the same "Enquire about a date"); an emptied label drops the pill, an emptied
  line its span, and both the row.
  **Layout 3 is a stack of full-width rows on the page ground**, and it filters as layout 1 does
  — the same `chip`, in the frame's segmented capsule instead of a loose chip row — but what it
  adds is a **seat that the filter moves**: the last row *on show* is filled in `vm.tierRow`'s
  hue where the others are merely outlined in it, and carries the frame's FEATURED badge, so
  hiding the artist's last package promotes whatever now ends the stack. That is the deck's own
  rule that the tilt and the mobile overlap take the **rendered** index while `t.n` keys the
  card, and it is not drawn at one row. `vm.tierRow` is `tierHero`'s shape with one extra
  constraint — it has to read against the **page** rather than on a card, so it walks `T.tags`
  from the frame's own index to the first hue that clears `tierHues`' 0.22 against `bg`, Grunge's
  `T.tags[3]` being its black background exactly. Its selector is the one thing in that branch
  not standing on the page ground, so its outline and idle labels take `paperFg` and not `tx`.
  **Lime's stack reads no `vm.tierRow`**: its frame outlines the rows in the accent and fills
  the moving seat with it, ringed and lettered in the page ink, so the walk (which reaches pale
  lime there) is Retro's and the flat three's; the seat still moves exactly as above.
  **Layout 4 filters nothing at all**: it is a stack of service rows on the page ground, the one
  pricing design with no chip row, no state and no control but the Book pill, so `chip` is
  untouched there. One row per package, divided by a 4px rule in **`vm.tierRow.card`** — layout
  3's own seat, reused because a rule has that outline's job of reading against the page (under
  Lime the rule is `s.ac` read directly, layout 3's `tierRow`-not-read rule, and an inset shadow
  rather than a border so the frame's row height holds) — and
  that rule is the one thing in the branch that **bleeds**: the row cancels the root's padding and
  puts the identical value straight back, so the border reaches the page edges and the content
  keeps the column (the events map's reading of a 1440-wide instance that paints no sheet). It is
  the first pricing layout to draw **no heading at all**, so `heading` reaches layouts 1, 2 and 3
  alone; and the only one to read a package's **tags and its features together** — the tags as the
  frame's small hairline chips, cased in `sectionVm` as `vm.tiers[].tagLabels` because `t.tags`
  stays raw for the filter matching, and the features as its coloured ones, one per feature over
  **`vm.tierFeatSeats`** (`vm.chips`' construction, a seat per index rather than a hue per
  feature; under Lime the seats are the layout-4 header's own chip pair, `s.box1` / `s.ac` by
  parity, inlined in the block). `unit` moves with it: nothing prints a suffix after the price here, so **`vm.tierKind`**
  — the unit with its leading slash dropped — stands above the numeral where the frame writes
  SET / PROJECT, which is one section-wide word against the frame's different one per row.
- **The booking calendar navigates and picks, in the published tab only.** It was the last §10.2
  section that was entirely a picture — arrows and day cells with a pointer cursor and no handler
  in either mode, over three constants and a sentence. The whole section is built from **one
  date** now: `FIELDS.calendar.open` is the month the grid opens on *and* the day it opens picked,
  and a field that is empty, half-typed or impossible (31 June) parses to null and falls back to
  `CAL_OPEN`, so the calendar can never open on a month the artist did not choose. `booked` is
  the dates they are taken on and `time` the hour the foot line names; an emptied `time` drops
  its clause rather than printing a trailing " at ", the Soundcloud rule.
  **All the date maths lives in `data.js` and `sectionVm`**, never in `EncoreSection`: every sum
  goes through `Date.UTC` (a local-time `Date` names the wrong weekday west of Greenwich), and
  `vm.calMonths` resolves the whole `CAL_SPAN` window — label, cells, booked flags and **one
  composed enquiry line per cell** — so the section looks a line up rather than working a date
  out, the way it draws the pin `sectionVm` paired with a gig. Nothing on the canvas reads the
  clock: the canvas opens on the artist's date, not on today, or its picture would drift off the
  reference frame's June overnight. **The published tab knows what day it is** (F20), and so
  does `BookedField` (below), which pages the published window and nothing else:
  `PublishedPage` reads today once, in UTC, and passes it to `sectionVm` as the ISO `today`,
  which is honoured only when `live`. With it, a day or slot before today carries **`dead`**
  beside `booked` — `EncoreSection`'s one `blocked()` test, so the two behave identically in all
  four layouts: no handler, no enquiry line, never the pick, and the booked look **without the
  strike** (except Lime's layout 2, whose past rows keep full ink and only lose the handler —
  its seeded slots have no editor and are all past; user call, 2026-09-17 — and Lime's layout
  4, whose rows do the same and whose card still features a past cue, 2×2 and all; 2026-09-18) — a cued `open` in the past cues nothing and the foot prints `vm.calPrompt`, and a
  past `open` month gives way to today's as the first month, `CAL_SPAN` counting from there
  (`max(open, today)`, `calStart()` in `data.js`, which `BookedField` shares so the artist
  can block every day a visitor can pick; it fades the days before today and takes no click on
  them unless they are already blocked). So the published first paint is the canvas's picture only while `open`
  is today or later: a named, accepted diff. The harness takes `&today=` (opt-in, so a `live=1`
  digest never moves with the date). The arrows **wrap** at both ends rather than clamping, the
  media player's rule — a clamped first month opens the published page on a dead-looking arrow,
  a diff from the canvas — and their cursor is read off the handler, `Pager`'s rule. `sel` is an
  **ISO date, not an index**, because it must survive the month turning, and the **empty string is
  this section's `-1`**: nothing chosen, so `vm.calPick` renders and the published first paint is
  the canvas's picture by construction, the clock aside. Blocking the *cued* day cues nothing (`vm.calPick` is
  `''`) and the foot prints `vm.calPrompt`, rather than sliding the pick to the day after — the
  artist blocked it. A booked day is muted, struck through and handlerless (under Lime it is
  dimmed to .38 with no strike, its frame's own state), which is a **content** state and not a
  live one, so it renders on the canvas too; the seed blocks nothing, which is
  what keeps the reference picture. Two **intended diffs from the frame**: the foot row gains the
  Book pill on `vm.calBookTo` — `bookTo` minus `calendar` itself, the tier pills' rule, since
  `CTA_TARGETS.book` ends here — which is what turned `cta` from a field that edited nothing into
  a control, and `para` went with `DEFS.calPara` because it rendered in neither layout; and a
  month needing six rows grows one where June needs five, the grid never being padded to 35.
  The unreachable fallthrough after layout 4 still draws the hardcoded `CITIES` and reads
  none of this.
  **Everything in this paragraph from "The arrows *wrap*" on is layout 1's**: layout 2 is a
  bold list of named slots — `CAL_SLOTS`, seeded in `data.js` in the row shape a repeater
  would edit and resolved by the `songs` rule onto `vm.calSlots`, with no editor beside it
  where `TIERS` has one — and it has no month, so no arrows and no `mi`. Everything else it shares whole:
  `sel` is the same ISO date, `open` cues the same day (slot one *is* `CAL_OPEN`, so the
  seeded page opens on the frame's picture), `booked` kills a row there as it strikes a cell
  here (under Lime the row is dimmed to .38 with no strike, the same state its cells take), the foot prints the slot's own short line — `vm.calSlots[].line`, "Thursday evening
  selected", composed from the weekday and the slot's `kind` — or the same `calPrompt`, and the
  pill takes the same `calBookTo` under its own label, `slotCta` ("Start Enquiry"; the frame's
  "Star Enquiry" read as a typo), chip, line and pill on one row at every width. Its head's link list is `vm.calFlow` — `CTA_TARGETS.book` resolved against
  the page, this section leading and dotted and never linking to itself, the footer's rule for
  a link column. `heading`, which once headed only the unreachable fallthrough, heads it; `image` does not
  reach it at all. And the slot list is the one list-shaped content with **no** editor, so
  `FIELDS.calendar` still names no `slots`.
  **Layout 4 is that same slot list a second time, stacked rather than tabled**, and it is the
  third design to share this section's seam whole rather than grow one: the same `want` /
  `hit` / `cur`, the same `open` cueing the same slot, the same `booked` killing a row, and
  `mi` reaching nothing again. What it adds is a **featured** card — the events map's layout-2
  rule, so the rows are the list *minus* the slot on show and `sel` is therefore **picked, not
  toggled**, a featured card always holding one. That card is the composed enquiry line taken
  apart into a 2×2 of the slot's date, its `kind`, its `price` and the section's `time` (a new
  `vm.calTime`, since this design draws no line at all), over the artist's name, `location`
  and `image` — which gives `image` a **second** seat, the polaroid stack having been its only
  one. A blocked cue features nothing and the card prints `calPrompt` instead, which is also
  the emptied-list state. Its foot is `BookPill` at layout 3's own numbers, but labelled
  `calCta`, so `cta` is a field again where layout 3 spends the pill on the picked date; and it is
  the one calendar layout that paints a **sheet** — the Figma wrapper's tan panel, which
  carries the page's own "Book Us" head (`CAL_HEADING_4`) and would otherwise leave that head on
  a ground no master draws. That panel also holds the page's **enquiry wizard** (QA,
  2026-09-15) — the frame's "C · Multi-step wizard", beside the stack at desktop and above it
  narrow, since `form` took the editorial band and the wizard has no section of its own. Its
  hooks (`wStep`, `wType`, `wVals`) are appended after `sel`; only step 1 is designed, so
  steps 2 and 3 take the summary card's own labels and a name and email, every string resolved
  onto `vm.calWizard`; its inputs exist only when `s.live`, there is no `<form>`, and the last
  step's Send Enquiry is a fragment link to `calBookTo` — the section has no address to mail.
  Its card is `s.tx`, **not `s.deep`** — the frame binds the fill to the *text*
  token, and `deep` is the page ground on two palettes and collides with the panel on the same
  two. The cost, named: on Grunge `tx` and `paper` are one value, so the card and the
  rows share a fill and only the rows' hairline parts them. Lime's own frame restores the
  three-level stack — `s.box1` rows under the `s.tx` card on a `s.box2` panel — so under Lime
  the cost does not arise.
- **The enquiry form fills in and sends, in the published tab only.** It was the last §10.2
  section whose every control was a picture, and the one the whole page points at:
  `CTA_TARGETS.book` starts at `form`, so the header's Book Now, the pricing pills and the
  calendar's foot pill all scroll the visitor to a set of `<span>`s. Four of its seven values also
  bypassed `cv()` — `FORM_PROMISES`, `FORM_FIELDS`, `FORM_TYPES`, `FORM_MESSAGE` were constants —
  and `email` was a field that edited nothing, `cta`'s and `para`'s state on the calendar. It is
  now what the form is *for*: **the submit is a `mailto:`**, composed by `enquiryMailto()` in
  `data.js` beside `extUrl()` (whose comment already said a `mailto:` is passed through untouched),
  bound in `sectionVm` over the address and labels, and rendered as an **`<a href>`, never a
  `<form>`**. That is load-bearing: a `<form>` here has no action, so submitting it — which an
  Enter key in any text box does — posts to `<base href>`, the opener's URL, and the published tab
  reloads into the builder. The `document.write` failure through a different door. There is no
  `<form>` element in the section and there must never be one; with none, Enter does nothing at
  all. The `<a>` is also what makes the whole thing testable from the opener: fill the boxes
  synthetically and read the composed address off `getAttribute('href')`. An empty `email`
  composes to `''` and the pill goes back to being a span — the Soundcloud rule, not the gallery's
  hide-the-row rule: a form the artist has not addressed is still the picture their page is built
  around. The chip starts at **0**, not the `-1` the player's `cur`, the gallery's `pick`, the
  map's `sel` and the calendar's `''` start at — the frame draws chip 0 filled, so here the
  picture *is* a choice, and pricing's `active` pins 0 on the canvas for the same reason; do not
  "fix" it to -1. It is clamped for pricing's reason too, since Publish re-renders the tab that is
  already open. `showTypes` is `s.v0 && nTypes`, and the **mailto reads it rather than the count**:
  a layout that draws no chip row sends the bare `Enquiry` rather than claiming a type
  the visitor was never offered. **No palette has a red**, so a refused box is an *inset* rule in
  `ctlInk` — inset, so the frame's stated 60 does not grow — under a prompt line (Lime's boxes
  are pills, so there its hairline thickens to a 2px inset ring of full ink, layout 2's rule); errors are
  `useState`, set on a refused submit and cleared per box as it is corrected, because there is
  still no effect in the file. A valid submit swaps the **mustard half only** for a confirmation
  that prints the address in **plain text**, since a browser that opened no mail app must still
  show one; the olive half, the shell and the one sheet of grain do not move, and *Write another*
  keeps what was typed. Two more rules: the boxes are **paired two to a row in `sectionVm`**
  (`vm.formRows`), not auto-flowed, because all three frames space the two fields *inside* a row
  by 12 (10 at 390) and the rows themselves by the panel's own 14 — one grid has a single
  `rowGap` — and an odd count trails one half-width cell, the pricing deck's rule; and a published
  placeholder draws at `::placeholder`'s `.45` where the canvas span draws it full, which is
  **Repertoire's accepted diff**, not a new one, and is why no fourth `.hv-*` class was added.
  **Everything in this paragraph from "The chip starts at 0" on is layout 1's**: layout 2 is a
  narrow sidebar card on a full-bleed mustard sheet, and it shares the seam whole rather than
  growing one — the same `vals`, the same `errs`, the same `sent`, the same `<a href="mailto:">`
  and the same *Write another*. What it does not draw is the chip row (so `showTypes` stays
  `!!s.v0 && nTypes` and its mailto sends the bare `Enquiry`), the message textarea, or the
  boxes' placeholders: its box holds the field's **label** instead, uppercased as a *string* so
  the live input can carry it as a placeholder without also shouting whatever the visitor types,
  which is what keeps the published first paint the canvas's picture. Its refused box thickens an
  inset **ring** where layout 1 draws an inset rule — a rule under a 999px pill reads as a smear
  (under Lime the ring is 2px of full ink, Lime's layout-1 rule) — and its card carries the frame's price row, `★★★★★ 42 bookings` line, "Check Availability"
  label and "No charge to enquire" line as fields seeded with the frame's copy (`price`,
  `priceUnit`, `bookings`, `cta`, `note`), each dropping when emptied except the label, which is
  the submit and falls back to `button` (Lime's card draws all five, the stars in ink, since
  Scheme 4 binds both of the line's colours to it). The stage photograph above the heading is
  `FIELDS.form.photo`, a **third single-photo slot** beside `image` and `avatar`, because this
  section's `image` **is** the artist: the header's pair is the other way up,
  and layout 1 has drawn `image` as the 48px circle since it was fitted.
  **Layout 3 is layout 2's card again, beside a display head instead of under a
  photograph**, and it shares the seam whole for the second time — the same `vals`, the
  same `errs`, the same `sent`, the same `<a href="mailto:">`, the same *Write another*,
  the same label-in-the-box and the same bare `Enquiry` subject, since `showTypes` is
  still `!!s.v0`. What it does not draw is the portrait, so **`image` now reaches layouts
  1 and 2 alone** — the frame has no credit row. Its eyebrow is `available`, seeded with
  the frame's "Available 2025 / 2026" and emptiable; `para` takes the paragraph under the
  head; and the card carries **layout 2's own card fields** — the price row, the
  `★★★★★ 42 bookings` line, the `cta` submit label and the `note` line under the pill —
  because it is the same card component (QA, 2026-09-15). So `promises` skips layout 3
  alone: layouts 1, 2 and 4 read it. Under Lime a refused box takes layout 2's 2px ring of full ink, and the desktop
  head shrinks to fit its widest word in the half column (`vm.titleWordEms`, a Lime-only key
  beside `navNameEms`) rather than breaking inside it.
  Two things in the branch are not the frame's: its `flex-[1_0_0]` halves are written as
  two `minmax(0, 1fr)` grid columns, because a zero flex-basis resolves against the
  *content* box whatever `box-sizing` says and the padded card came out 41 wider than the
  block beside it; and the card's stated `sticky` is dropped rather than written inert,
  since the frame's own `items-center` gives it nowhere to travel where layout 2's
  `alignSelf: stretch` made it real.
  **Layout 4 is the editorial band, and it shares the seam whole for the third time** —
  the same `vals`, `errs`, `sent`, `<a href="mailto:">` and *Write another*, so its whole
  live surface is four handlers and the only line outside the branch is one comment. It
  is a display head over a 4px mustard rule (1px of `s.stroke1` under Lime), the artist's
  name in small caps under it,
  and then two columns: the boxes over a mustard submit pill (pale `s.tx` under Lime), and the promises numbered
  01 / 02 / 03 beside them. Three things it does that no other layout here does. It draws
  a **label above a box *and* a placeholder inside it**, which is layout 1's pair and
  brings both `message` and the rows' `placeholder` column back after two layouts that
  spend their one slot on the label; a **trailing odd field runs the full measure** where
  layout 1 trails a half-width cell, the frame's own fifth box at all three widths
  (`vm.formRows` is unchanged — the pairing is the vm's and what a row of one does is the
  branch's); and it **reorders its two columns**, the form leading at 1440 and the
  promises leading at 768 and 390. Its promises are `vm.formSteps`, the same list layout
  3 runs together as one line, numbered in `sectionVm` because this file pads nothing —
  and with none, the column is not drawn at all and the form takes the measure (the
  footer's empty-second-column rule). It draws no chip row, so `showTypes` stays
  `!!s.v0` and the mailto sends the bare `Enquiry` for the third time; `image`, `photo`
  and `para` reach none of it. Its boxes' outline and its step rules are **`vm.formRule`,
  which is `vm.tierRow.card`** — the pricing stack's own guarded walk, aliased in the
  form block rather than read across sections, because an outline standing on the page
  ground is exactly what that walk was written for. Under Lime none of that is read: the
  step rules are 1px of `s.stroke1`, the box ring is `s.ac`, and a refused box changes
  colour rather than weight alone — 2px of `s.tx`, since the idle ring is already lime.
- **The testimonials carousel pages, in the published tab only, and the reviews are the
  artist's.** It was the last §10.2 section that was a picture on *both* sides: its two arrows
  carried a pointer cursor and no handler, and layout 1 drew `QUOTES[0]` and nothing else, so
  the other two seeded reviews were unreachable. Three flat keys reached that one review —
  `quote`, `who`, `role` — the card's own date line was editable by nothing at all, and no
  field could add a fourth review; `c.quotes` is now a `QuotesField` repeater of
  `{ quote, who, role, when }`, the pricing packages' flattened-key-set case rather than a
  textarea's. `cur` starts at **0**, the enquiry form's chip and pricing's `active`, not the
  `-1` the player's `cur`, the gallery's `pick` and the map's `sel` start at: the frame draws a
  filled card, so the picture *is* a choice. It is clamped against the list — the artist can
  delete the review the visitor is on, and Publish re-renders a tab that is already open — and
  the arrows **wrap at both ends**, the player's rule, so the published page never opens on a
  dead arrow. They are **not rendered at one review**, the pager's and the chip row's rule,
  which is derived from the list and so holds on the canvas too; the desktop row then centres
  the card, because `space-between` with one child would stand it against the gutter. The seed
  carries five — three until layout 3's QA added the bento wall's two named reviews, appended so
  the first card on show is unchanged. Every value on the card is emptiable
  now, so each is rendered or not rather than printed blank — a `col` gap is spent on an empty
  span the same as on a full one — and the attribution is **composed in `sectionVm` as
  `vm.quotes[].byline`**, the calendar's one-composed-line-per-cell rule, or an emptied role
  would print a bare separator. The two pills are still `who` and `role`, the frame's own
  reading of the card, so they repeat the attribution by design; they key **positionally**, both
  strings being the artist's. An emptied list keeps the card, the two backs, the tear and the
  grain and prints pricing's one message inside it: the section is a composition, and a hole
  where the card stands is not one of its states. `vm.quote1` is gone, so the three-up layout's
  `i === 0 ? s.quote1 : q.q` seam goes with it — **every** row is cased now, which is the
  intended diff on a casing theme. There is **no autoplay and no swipe**: both want an effect
  or touch state, and there is none in the file. **The two arrows, their wrapping and the two
  pills are layout 1's**: layout 2 is an editorial feature — a centred display head over one
  wide orange card — and it pages through a **rail of initial tiles** down the card's left,
  one per review, sharing the seam whole rather than growing one: the same `cur`, the same
  clamp, the same pinned 0 on the canvas and the same not-drawn-at-one, which there means the
  card simply takes the whole width. The picked tile is also the **wide** one in the 390 row;
  under Lime it widens in the desktop and 768 column as well, where the idle tiles hug their
  padding inside a column pinned at the frame's widest tile, while Retro's column gives every
  tile one fixed width. The tile's mark is **`vm.quotes[].mark`**, composed in
  `sectionVm` beside `byline` — the reviewer's initials, or the row's number when the name is
  empty, punctuation spaced out first so "Sarah &amp; Tom" marks the tile `ST` and not `S&`.
  The frame's `★★★★★` is a section field, `stars`, seeded with the frame's copy and printed in
  the card's corner, so `when` has no seat in layout 2; its heading falls back to the frame's
  own two-line "Honest feedback / from people who booked" (`TESTI_HEADING_2`, resolved in
  `sectionVm` and `EditPanel` alike) where the other layouts keep the shared default. It also draws the section's **head**, which no earlier layout did: `heading` had
  reached the flat tail alone, and `FIELDS.testimonials` gained `sub` and `cta` — a line of
  prose and the centred Book Now pill on `vm.bookTo`, which needs no self-exclusion because
  `testimonials` is not in `CTA_TARGETS.book` (the footer's rule); `sub` since reaches layout
  3 as well, `cta` still layout 2 alone. Layout 2 draws neither the
  grain nor the torn edge: its frame carries no texture at all and stands on the beige page,
  so the root's `cream` flag stays layout 1's, and **layout 3 draws neither either** for the
  same reason. **Layout 3 is a bento wall and the one design here that pages nothing**: it is
  the stat card and then *one card per review*, three to a row and one at 390, so `cur`
  reaches no control at all — the arrows and the rail exist because their layouts draw a
  single card, and a design that shows the whole list owes no pager. Its cards are one
  template whose disc, name and role are each rendered or not, so a review with neither `who`
  nor `role` collapses to the frame's own quote-only cell and nothing the artist typed is
  discarded; two seats are stated (275 leading the first row, 276 trailing the second when it
  is full) and every other cell is `minmax(0, 1fr)`, with rows past the second three equal
  fills. Its stat card is where the frame's claims are re-seated: the big numeral is
  **`s.quotes.length`** with a pluralised unit — arithmetic, not the frame's `4.9 /5` rating —
  the sentence under it is `sub`, the line above the disc stack is `s.brand`, and the stack is
  one `vm.quotes[].mark` per **named** review, so it never invents a face for a card the wall
  itself shows unattributed. The `★★★★★` and the `®` go with the rating. `when` and `cta` have
  no seat there, which is the only content this section's first three layouts do not between
  them read. **Layout 4 is a wall that pages**: a display head with a pair of arrow discs at
  its right over *one row* of cards — four at 1440, three at 768, one and a peek at 390 — so it
  is the third design to share `cur` whole rather than grow a seam, reading it as the review
  **leading the row** where layouts 1 and 2 read it as the single card on show. The row is one
  card per review as everywhere else; the arrows are derived from the list and **not drawn at
  one page**, which the seeded five never are. The hue is the **seat's** and not the review's, the media player's fan
  rule, and its cost is that the fourth seat (Retro's rust card, Lime's page-ink card) is
  unreachable at 768 and 390 at any
  count, and needing four reviews at 1440. It is the section's second full-bleed sheet and its
  first mustard one — `s.pillBg` with a `pillFg` head, the enquiry form's layout-2 pair on the
  identical ground; under Lime the sheet is Scheme 4's pale `s.tx` with `s.bg` ink and the head
  `s.dispLg` at every width — so the root's `cream` flag stays layout 1's for the fourth time. `when`,
  `sub` and `cta` reach none of it, which leaves `when` a layout-1 column and `cta`
  layout 2 alone.
- **The footer is the artist's sitemap, and the published one navigates.** It was the last
  §10.2 section that was a picture on *both* sides, and the only one whose links were dead by
  the **header's own rule**: `linkCol` drew `<a href="#">`, which the published tab's delegated
  listener swallows (`href.length > 1` is false) and which on the canvas jumps the *builder* to
  its own top — exactly what `navHref()` was written to remove everywhere else. The Book pill
  beside them was passed neither `to` nor `ext`, so it was a `<span>` on both surfaces, and its
  label read `s.cta1`, a key no footer field named. `FOOTER_LINKS` was two hardcoded columns of
  four strings; `c.links` is now a `LinksField` repeater of `{ label, to, url }`, the **eighth
  structured editor and the seventh repeater**, and the first whose row carries two *kinds* of
  target — `to` is a section id resolved against the page, or `link`, which takes the row's own
  address through `extUrl()`. That is `BookPill`'s own `ext ? … : to` seam moved down to a row.
  `FOOTER_TARGETS` lists **every category the page can carry, not the ones it does**: a Radix
  `Select` whose value names no item blanks its trigger, so a link to a section since deleted
  must still read as what it points at, and one can be aimed at a section not added yet.
  Resolving it against the page is `sectionVm`'s job. When a section target fails (§4.3a, F25),
  the **canvas keeps the row** and `LinksField` prints "Section not on the page" under its
  select, but the **published footer drops it** — the gallery's hide-the-empty-row rule, since a
  visitor gains nothing from a dead word. Only a missing section is dropped: a `none` row is a
  label the artist chose, and a `link` row whose address `extUrl()` refuses stays a picture (the
  Soundcloud rule, with `UrlInput` saying why). `BLANK_PAGE`'s published footer is therefore the
  Book pill alone, a span with nothing to book at, where its canvas still draws all eight labels.
  The header's **Minimal** nav follows the same rule: a Music / Shows / Book label with no
  candidate on the page is kept on the canvas, named in a hint above the Navigation links
  select, and left out of the published nav (`vm.navLinks`, filtered before `navEms` measures
  it). The two columns are **derived**, not stored, and derived from the **rendered** list, after
  that drop, or the published columns would go lopsided. The frames draw four and four, so the list is halved with the remainder in **column one** — the pricing
  deck's odd-count rule, and column one is the one the pill stands in, so it is the one that
  should run long — and an empty second column is dropped rather than rendered as a `nav` with
  no children, because `links` is a flex row and an empty child still spends its gap. The pill
  takes `vm.bookTo` with **no self-exclusion filter**, unlike the tier pills' and the
  calendar's: `footer` is not in `CTA_TARGETS.book`, so it can never point at the section it
  stands in. An emptied `cta` **drops** it, which the calendar's foot pill does not do — there
  the pill sits at the end of a row of type, here it is the block the column is built round,
  and a wordless block is not one of the section's states. `showBadge` is the header's own key,
  and `vm.showBadge` already read this section's content: the seal was hidable by nothing only
  because no field here named it. `FOOTER_CREDIT` stays a constant on purpose — it is the
  platform's byline, not the artist's. `vm.footerCta` is **uncased** where `vm.footerStatement`
  and the labels are cased, because the pill has always drawn the uncased `cta1` and casing it
  would upper-case the footer's pill on Grunge and Pop. The footer keeps **no local state**:
  every link is an `<a>` whose href is `navHref()` or `extLink()`, so nothing here needs the
  `useState` the eight sections above it take.
- **Seven list-shaped contents have a structured editor: the repertoire's songs, the media
  player's tracks, the events map's gigs, the pricing section's packages, the enquiry form's
  boxes, the testimonials' reviews and the footer's links** — and the booking
  calendar's `booked` dates are an **eighth structured field that is not a list**: `BookedField`
  is a month to click, not a repeater, because one row per blocked date is the wrong shape for a
  June with eight of them, and it obeys the same seed-resolver rule as the seven below. `c.songs` is an array of `{ title, artist, tags }`
  (tags a raw comma string),
  maintained by `SongsField`; `media`'s `c.tracks` is an array of `{ title, sub, image, audio }`,
  maintained by `TracksField`, and it is the only field whose *rows* carry a photograph
  (`RowThumb`, the 46px cousin of `ImageField`) and a sound file. `audio` is an address, not an
  upload — an image is inlined as a data URI and a track is two orders of magnitude larger —
  and `sectionVm` normalises it through `extUrl()` onto `vm.tracks[].src`. `sectionVm` falls back to
  the seeded `TRACKS` (dressed in `TRACK_AUDIO`) when the key is absent. Per-row art and audio are never
  re-seeded by index once the array exists, or a row inserted third would steal track three's
  photograph. `map`'s `c.gigs` is an array of `{ venue, city, time, month, day, link }`,
  maintained by `GigsField` and the plainest of them: one key, one shape, no assets, and
  `link` normalised through `extUrl()` onto `vm.gigs[].url`. Its `city` is read twice —
  as a fact on every row, and, in layout 3, as the **control** `vm.gigChips` derives the
  filter row from, which is why `vm.gigs[]` also carries a case-folded `cityKey`. `form`'s `c.fields` is an array of
  `{ label, placeholder, kind }`, maintained by `FormFieldsField` and the only repeater with a
  **per-row `<select>`** (a stock shadcn one, unlike §9.1's layout dropdown — Radix's `ItemText`
  only breaks a row carrying a *thumbnail*): `kind` is `text | email | number`, and it is the whole
  reason the row is not just a label and a placeholder, since it is what tells the published form
  which box holds the address a reply goes to. `number` never becomes `type="number"` — the
  spinners break the frame's 60px box, so it takes `inputMode` only — and a date stays a text box
  with the artist's placeholder, the native picker being unstylable onto mustard. Its order is
  load-bearing where the other repeaters' is merely entry order: it is the order the boxes appear
  in, two to a row. It also carries the only **guarded row**: the last `email` row can be neither
  removed nor retyped — its trash button is disabled and its select disables Text and Number
  rather than dropping them (a Radix value naming no item blanks the trigger), under the hint
  "Visitors need somewhere to leave an address." — so the editor never reaches a list without an
  email row, since the seed carries one and a new row is `text`. Nothing else is guarded: an
  emptied list renders in all four layouts, the published form still sending the bare body.
  `pricing`'s `c.tiers` is an array of
  `{ name, price, tags, blurb, feats }`, maintained by `TiersField`, and it replaced a **flattened
  key set** (`t1n`/`t1p`/…, which reached two of the five things a card prints and could not add a
  fourth card) rather than a textarea. It carries the only rows with *two* delimited strings, and
  they are delimited differently on purpose: `tags` by commas, because it is the same `repChips()`
  row the songs' is, and `feats` by newlines, because a feature is a phrase that may contain a
  comma (`tierFeats()` in `data.js` is the splitter). `testimonials`' `c.quotes` is an array of
  `{ quote, who, role, when }`, maintained by `QuotesField`, and it replaced the pricing deck's
  flattened key set again in miniature (`quote`/`who`/`role` reached one review of a hardcoded
  three, and `when` reached none): it is the gigs' shape of thing — one key, one shape, no
  assets, no delimiters — laid out like `TiersField`, whose primary field is also the short one,
  so the reviewer takes the header line and the quote the textarea. `footer`'s `c.links` is an
  array of `{ label, to, url }`, maintained by `LinksField`, and it replaced a **constant** —
  two hardcoded columns of four strings on a bare `#` — rather than a flattened key set or a
  textarea. It is the second repeater with a **per-row `<select>`** and the first whose row
  carries two *kinds* of target: `to` is a section id or the sentinel `link`, `url` is only read
  on a `link` row, and it is the only row whose third control is **conditionally rendered** — an
  address box under eight section rows is noise. Its `to` options are `FOOTER_TARGETS`, every
  category the page *can* carry rather than the ones it does, because a Radix value naming no
  item blanks the trigger; `sectionVm` is what resolves it against the page. Its order is
  load-bearing the way `FIELDS.form.fields`' is: `sectionVm` halves the list into the two
  columns. The one other repeated field is a
  delimited textarea, `FIELDS.form.promises` — whose rows the enquiry form's layout 4
  numbers 01 / 02 / 03. All seven follow
  `images`, not
  `image`: an absent key means the seeded `SONGS` / `TRACKS` / `GIGS` / `TIERS` / `FORM_FIELDS` / `QUOTES` / `FOOTER_LINKS`, an emptied array
  means none, and there is no
  `null` sentinel. The chips are derived from the tags, so nothing sets them directly, and the
  heading falls back to the song count in `sectionVm` **and** in `EditPanel` — change one, change
  both. Each seed resolver in `EditPanel` (`songsVal`, `tracksVal`, `gigsVal`, `tiersVal`, `formFieldsVal`, `quotesVal`, `linksVal`) has to
  resolve exactly what `sectionVm` resolves, or the canvas lists rows the repeater has never heard
  of — which is why `GIGS`, `TIERS`, `FORM_FIELDS`, `QUOTES` and `FOOTER_LINKS` are written in the row shape their repeater edits, tags and
  features as the strings the artist types, and only `TRACKS` needs dressing.
- **Retro and Lime seed photography; the flat three do not.** `defaultImage()` /
  `defaultImages()` / `defaultTrackArt()` in `photos.js` resolve through `SEEDS`, keyed by
  `T.name` — the same name-match as `headerFamily()` and the `retro` / `lime` flags — and a theme
  with no row seeds nothing. Lime's row is its own shoot for the artist's pictures (`lime-*.jpg`)
  and Retro's files for the gallery strip, the track covers and the map raster. **Remove** writes `null`, not `undefined` — `undefined`
  deletes the key, and an absent key is exactly what selects the seeded photo, so it would come
  straight back. For the same reason `Photo` treats `src={null}` (this slot has no picture) as
  distinct from no `src` prop at all (fall back to `s.image`): an empty gallery slot shows the
  section photo and an emptied one does not, and the media player passes `null` for an art-less
  track row so it cannot inherit anything. **`media` has no section photo at all** — no `image`
  field, no `RETRO_PHOTOS.media` — because the player shows the artwork of the track it is on. `pricing` seeds an `images`
  array of three and no single photo: layout 2's reviewer faces under its quote.
  Two categories carry **two** independent single-photo slots, and `defaultImage` takes the
  field key for them: the header's are `image` (the scene) and `avatar`
  (the artist), and the enquiry form's are the other way up — its `image` **is** the artist,
  which layout 1 draws as a 48px circle, so layout 2's stage shot is a third key, `photo`.
  `Photo` also takes `ink`, the initials placeholder's colour, defaulting to `s.muted`: `muted`
  and `soft` are rgba of the **page's** text colour, so a section standing on its own sheet has
  to pass a pair that reads there (`Pager`'s `idle` precedent — additive, every earlier caller
  untouched).
- **Reordering** is drag-by-handle *or* arrows. `SectionList` owns the drag; `dragRef` is the
  source of truth and the `drag` state only mirrors it for rendering, so pointerup commits
  what it can see rather than what the last render observed. Rows are a uniform height, so
  the drop index is the pointer delta in row-heights, not a hit test.
- **Retro and Lime are designed; Grunge, Editorial and Pop are not.** The flat three are fully
  functional but render flat. Retro's decorative language is gated on `s.retro`, and it gets six
  photographic header layouts where the flat three get three. **Lime is designed at all four of
  its layouts**: each of its Figma pages is the same components as Retro's page of that number
  in another variable mode, so its decoration (arc seams at layouts 1 and 4, glows at every
  layout, the arch portrait) lives in **`s.lime`** blocks inside the shared branches, never in
  a branch of its own — `if (s.lime)` or `if (s.v0 && s.lime)` in the `v0` code, and
  `if (s.v1 && s.lime)` / `if (s.v2 && s.lime)` / `if (s.v3 && s.lime)` ahead of an
  `if (s.v1)` / `if (s.v2)` / `if (s.v3)` whose state is hoisted or `if (s.lime)` inside it
  after the seam — and a value both designed templates draw is gated `(s.retro || s.lime)`.
  The header components are the exception: each is its own branch, so its Lime block is
  `if (s.lime) { … return }` at the head (`HeaderV1`; `HeaderV2`, whose Lime frame is a
  different composition — an upright glass card where Retro tilts a polaroid; and `HeaderV3`,
  a glass nav capsule over an identity panel with no checker floor, whose desktop photograph
  is drawn **mirrored** because its 1440 master's crop flips it — an artist's upload reads
  backwards at desktop and forwards at 768 and 390, a named product call reversible in one
  line). Its header family is `'lime'`: the first four photographic layouts, all four fitted,
  so every card in the setup modal lays out a whole Lime page and the family is closed
  (`plans/lime/`). At layouts 2, 3 and 4 the footer is layout 1's (`NVAR.footer` is 1). Two
  shared helpers grew an additive prop for layout 4: `ArcEdge` takes `TornEdge`'s `bleed`
  (`false` inside a sheet the branch has already bled), and `SealBadge`'s Lime disc takes a
  `scheme` (3 = lime disc with ink marks, 4 = pale disc with ink marks) because the layout-4
  header's seal changes colour between widths.
- **Layout folding.** Every category offers at least as many layout numbers as it has distinct
  designs, and seven of the eleven offer more — Pricing layouts 1 and 5 render identically on
  purpose. The other four are level: the header and the footer always were, and the layout-4 pass
  took `gallery` and `map` there by bumping their design counts to the four rows they offer.
  **The categories are exactly the sections on Retro layout 1's Figma page** (`964:58575`):
  `video`, `tags` and `audio` were removed from the project, every layout, because that page
  draws none of them. The 10 non-header
  categories are also the ones that stay *numbered*: only the header's layouts have names
  (`headerLayout()` in `data.js`), because it is the one a first-time user is asked to choose.
- **Accessibility is scoped to the chrome.** The rendered preview is a picture of a website,
  not a website.
