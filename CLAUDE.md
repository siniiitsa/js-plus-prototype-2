# Encore Builder — working notes

Read [`README.md`](./README.md) first: it is a full architecture doc and this file does not
repeat it. What follows is only what a fresh session tends to get wrong.

## Where the code is

All source lives in **`source/`**. Two files at the repo root are *not* source:

- **`index.html`** (~8.8 MB — most of it the inlined Retro, Lime, Grunge and Editorial photography) is the generated
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

## Source files

The hand-written code is `src/builder/` (`EncoreBuilder.jsx`, `EncoreSection.jsx`, `data.js`,
`photos.js`), `src/index.css` and `src/App.jsx`. Everything under `src/components/ui/` is stock
shadcn.

`photos.js` is the only module that imports the files in `src/builder/photos/`. Keep those
imports out of `data.js` — it is documented as pure, import-free data, and the assets are ~5.8 MB.

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
The **enquiry form and the calendar's layout-4 wizard are the exceptions to "fully-resolved"**:
the form's `vm.formMailto` and `vm.formCheck`, and the wizard's `vm.calWizard.dateOf` (JP-052),
`vm.calMailto` and `vm.calCheck` (JP-053), are *closures*, not values, because their inputs are
the visitor's keystrokes and `sectionVm` never sees those. Everything else about them — the
address, the labels, the casing, the date parse and the booked and past tests — is still bound in
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
  padding. **The right cell is sticky** (JP-043, user call, 2026-09-24; no Frame 300 declares
  it): `position: sticky; top: 0; alignSelf: start` on the cell div, not the calendar's root,
  so the calendar stays in view while the left column scrolls and the one-row grid area
  releases it at the row's end. **The canvas sticks too** (JP-072, user call, 2026-09-28,
  reopening JP-043's "inert on the canvas"): the card round the page clips with
  `overflow: clip`, not `hidden`, which would make the card, which never scrolls, every sticky
  box's scroll container. So the canvas's scroller is what they stick to, 28px down, since a
  sticky box stops at its scroller's padding edge, where the published tab's pins at 0. That
  holds for every sticky box the page carries, not the cell alone: repertoire layout 4's A–Z
  rail at desktop and the form's layout-2 card at desktop and 768 stick on the canvas as well.
  Do not put `hidden` back on the card. A window shorter than the cell (~680 at 1440) pins it
  with its foot below the fold until the row ends. Tablet and mobile never compose. `PAGE_ORDERS[2]` is the narrow frames' order —
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
- **`st.removed` is `{ [cat]: { arch, c, at, before } }`, the last deleted section of each
  category**, so re-adding a category restores its content (data-URI uploads and all) and the
  add composer opens on its old layout; the composer's *Start fresh* tick (`st.add.fresh`) opts
  out. **It keeps the seat too** (JP-073, user call, 2026-09-28): `before` is the *category* the
  section stood before — always one, the footer being last — and `at` its index, so `addSection`
  reinserts before `before` while that is on the page, else at `min(at, sections.length - 1)`,
  *Start fresh* or not; SPEC §9.1's "immediately before the footer" is left to a category with
  no entry, which the UI never reaches (a template pick builds every category and `del` always
  writes one). A category rather than an id, because re-adding the follower mints a new id. Its keys
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
- **The artist's name is the header's `c.title`, and it is required** (JP-050, user call,
  2026-09-23). The `artistName` prop only seeds it: the builder derives `artistName` from the
  header section (`nameOf()`: trimmed, the prop only while the key is absent — a fresh page) and
  passes *that* everywhere — the h1 included (`vm.heroTitle` is `vm.brand`; the header resolves
  its own `c.title` the same way, so a header preview or a harness `&cj=` cannot split them),
  nav brand, initials placeholders, bylines, badge,
  `copyrightOf()`, the enquiry form's layout-3 head (`formHeading3()`, JP-070), the published
  tab's `<title>` (reset on every republish, not only when the tab
  is first opened) and the dialog's site address. `NameInput` never commits a Title that trims
  to empty: the box may sit empty (with a "Your name is required" line) while the page keeps the
  last name, and leaving it puts that name back — so no slot ever falls back to the prop once
  the artist has typed one, and Publish never meets an empty name. Header `badgeText` and footer `copyright` have
  no static default for that reason; `EditPanel` special-cases them beside `title`, and the
  form's `heading` at layout 3 beside them. **The
  artist's role and town are the header's too** (F1): `headerIdentity()` in `data.js` reads the
  header's raw `kicker` / `location`, and `sectionVm({ identity })` gives them to every other
  section — the bio (its role lines, polaroid rail and ID card), the calendar (layout 1's polaroid
  stamp, which Lime's layout-1 block — Grunge's and Editorial's too, since they share it — does not draw, and layout 4's summary card) and the enquiry form's credit — which have no field for either. The header
  reads its own `c`, so previews of other layouts still show theirs. Canvas, published tab and
  `LayoutPicker` all pass it; the harness takes `&who=<json>`. `vm.roleLine` is the pair
  composed with its `·`, so an emptied half drops with the separator, and an emptied value
  drops the ID card's column (the `since` rule). **The layout-3 card's second line is not the
  kicker** (JP-061, user call, 2026-09-28). Lime's, Grunge's and Editorial's *Inset Hero*
  portrait card prints `FIELDS.header.cardLine` (`vm.cardLine`) under the name. It is seeded
  `CARD_LINE_3`, "Performing since 2021", uncased, and dropped when emptied. Retro's polaroid
  prints the kicker in that seat. So the kicker has one seed, `'DJ · Live Act'`, at every layout,
  and the bio's *Current role* always prints what the Kicker field shows. At layout 3 the panel
  therefore marks Kicker "Not shown in this layout" while the bio prints it, as at layout 2.
  **That card's name and line wrap** (JP-062, user call, 2026-09-28). They wrap at the content box
  plus half the padding on each side. That is `100cqi` of the card, which is the container, plus
  one padding when the card is upright, and the room beside the portrait plus 10 at 390. The
  measure is not the content box, because Editorial's frame sets its own name 8.5 into the
  padding and Lime's seeded line already runs past it. It is not the whole padding either,
  because that let the tester's 768 name run to the ring. The name wraps between words and
  shrinks only when its widest word would outrun the measure (`vm.cardNameEms`, `titleWordEms`'
  rule, taken in `navFace`, so `faced()` stays outside the fit). The line breaks inside such a
  word instead (`overflowWrap: 'anywhere'`), since no body face has an ems table. Retro's
  `nowrap` polaroid is unchanged.
  **The tag chips are the header's as well**
  (JP-037): `FIELDS.header.tags` is a comma list seeded with `TAG_LABELS` (six, as the header
  frames at layouts 1, 3 and 4 and Lime's, Grunge's and Editorial's Genres rows draw them — JP-081, user
  call, 2026-09-29, reopening JP-037's five; Retro's layout-4 header and Lime's layout-2 bio draw
  five and seed the sixth anyway), and `identity` carries `tags` and `showTags` to the bio,
  which prints them in layouts 2 and 4 and Lime's, Grunge's and Editorial's 3 (measured, `scripts/reach.mjs`). An emptied
  list folds into `vm.showTags = 'hide'`, since every reader of that key is a chip-row gate.
  **`vm.chips` is a palette, not the chip row**: six colour seats off `TAGS`, read as
  `s.chips[3].bg` and the like across header, media, map and pricing, carrying no label and
  never changing length; the rows print `vm.tagChips`, the labels seated on it by index,
  wrapping. Layout 2's other three literals went the same way: the hero pill is
  `FIELDS.header.heroCta` (`vm.heroCta`), and the bio card's foot row is `FIELDS.bio.credit` /
  `cta` — `vm.bioCredit` is `{ lead, rest }`, the first three words taking the accent, split in
  `sectionVm`; each drops when emptied and the row with both (under Editorial, whose frame
  rules a dashed divider over the foot, the divider goes too once the chips are hidden as well).
  **So did the rest of layout 2's copy** (JP-059, user call, 2026-09-28, reversing Lime's fit):
  the header's "● Available for bookings" pill is `availability`, and its two cards' copy under
  the photograph is `faceTitle` / `faceBody` and `placeBody` (the place card's title was already
  `location`), `vm.heroAvail` / `vm.faceTitle` / `vm.faceBody` / `vm.placeBody`; the bio card's
  "/Featured" pill is `FIELDS.bio.tag` (`vm.bioTag`), on every template, Pop included. Each is
  seeded with the frames' own bytes and uncased (every site keeps its own casing), and each drops
  when emptied; a card keeps its tile, and both pills wrap rather than widen a 390 page. The face
  card's "Performing since 2021" is the artist's copy inside `faceBody`, **not** the bio's `since`,
  which it does not read (`cardLine`'s precedent, above); the hint says to change both.
  **And eight frame labels went the same way** (JP-071, user call, 2026-09-29, reversing Retro
  layout 2's "a frame label stays a literal" for the eight the tester reported): the bio's ID-card
  labels `sinceLabel` / `roleLabel` / `baseLabel` (one line each; `sectionVm` breaks them before
  the last word, as the frames do) and `aboutLabel`, its Genres line `tagsLabel` (bio layout 4's
  too), media's `listLabel` ("● Popular", layouts 2 and 3) and layout 3's `kicker` on the map and
  the testimonials. JP-059's shape: seeded with the literal, uncased, dropped when emptied. The
  `●` and `[ ]` are the markup's and go with an emptied word; a stat's label also goes with its
  value, as before. **Four more at layout 1, every template** (JP-090, user call, 2026-09-30):
  the bio's `refLabel` (the whole `[ 001 ] Structure · Bio_01` line, since the `001` is no
  count), the map's `listLabel` over the gig list (its `· N` the markup's), the form's
  `typeLabel` over the chip row, which reads its seed again when emptied (`messageLabel`'s
  rule; it never reaches the mailto, whose subject carries the chip), and the map's
  "Shows/coverage", which is `kicker`'s layout-1 seed — `mapKickerSeed(d)`, called by
  `sectionVm` and `EditPanel`'s chain alike, so `kicker` now reaches layouts 1 and 3. A typed
  label wraps rather than outrun a 390 page. The unreported siblings stay literals: the bio's
  `Bio` eyebrow, media layout 2's `● Featured`, the calendar legend and testimonials layout 2's
  `✎ What clients say`.
- A page section is `{ id, cat, arch, c }` — category, layout index, sparse content overrides.
  Colours are per-section only where a template's frames make them so: every section renders in
  the active theme's single `palette`, **unless its frames stand it on another colour scheme** —
  Editorial's do (plans/editorial/layout-1.md, decision 3, user call, 2026-09-24). `THEMES[3]`
  carries Sienna Vale's Schemes 2 (taupe), 3 (ink), 4 (terracotta) and 5 (blush — no section's
  seat, read only through `s.onScheme[5]`, below) as `schemes`, and
  `SCHEMES_OF.Editorial` in `data.js` seats a section by its *design* — at layout 1 media and
  pricing on 2 and header, repertoire, form and footer on 3; at layout 2 media and the calendar on
  2 and the form on 4; at layout 3 the gallery on 2, the map on 4 and the header on 3, its frame's
  Scheme 8 differing from 3 only in tag seats the two-seat system never reads
  (plans/editorial/layout-3.md, decision 1, user call, 2026-09-25); at layout 4 the header,
  bio, gallery and repertoire on 3, the media on 2 and the testimonials on 4 — so a design with
  no row stands on Scheme 1. **The footer's seat is read off the page**, since it has one design: at
  `sectionVm`'s head a footer takes `SCHEMES_OF[theme][page].footer` ahead of its own design's
  row, `page` being the header's design, so layout 3's page stands it on 2 (taupe) where layouts
  1 and 2 keep row 0's 3; a caller that passes no `page` — the layout picker's thumbnail, the
  harness without `&page=` — sees row 0's ink, and `digest.mjs` renders the footer once more at
  `page=2`. `sectionVm` spreads that
  scheme over the theme at its head, so every `T.palette` / `T.sem` / `T.tags` read below it,
  and every key derived from them, is the section's own ground's. The root needs no flag for it;
  only a theme carrying `schemes` moves. **An entry can be a `[desktop, tablet, mobile]` triple**
  where the frames move a section between widths (plans/editorial/layout-2.md, decision 1, user
  call, 2026-09-25): layout 2's repertoire is `[4, 1, 1]` and its pricing `[3, 1, 1]`, read off
  `Z.dev` through `DEV_SEAT` (a 1 needs no entry in `schemes`; it falls through to the theme),
  and every caller's `Z` names its width, so the published desktop, the picker's thumbnails and
  the modal's cards take the desktop seat. Two consequences: under Editorial `s.bg` is the
  section's own ground, not the page behind it (inert, since no Editorial page draws a seam — a
  Lime or Grunge seam reads `s.bg` as a neighbour's colour, which a seat would change), and the reads outside
  `sectionVm` — the page gutter, the published `documentElement`, the picker's dots — stay the
  theme's, Scheme 1. **A card on another scheme seats its section on the card's**: layout 2's
  media panel and calendar card are Scheme 2 cards on the page's paper, so `s.bg` there is the
  card's taupe, the block paints the card, and the root paints **`vm.pageBg`** round it —
  `theme.palette[0]`, the page's own ground whatever the seat — through its `editorialCard` flag.
  **A nested node on another scheme reads `s.onScheme[n]`**: every scheme of a theme carrying
  `schemes`, flat (`flatScheme()`: `bg` / `ac` / `tx` / `acFg`, the `sem` keys, `pillBg` /
  `pillFg`, and the scheme's own two `chips`), keyed by number with 1 the theme's own, and
  undefined under every other theme, so a reader sits behind `s.editorial`. Layout 2's header
  and bio Book pills read `[4]`, the calendar's head band `[1]` at desktop and `[3]` narrow, the
  map's travel card and viewport `[3]` and its map card `[2]`, the testimonials' card and picked
  tile `[3]`. Layout 3's header reads `[5]` for its blush nav capsule, links and Book pill and
  `[1]` for its chips and three rings — nodes that name Scheme 1's variables outright under the
  Scheme 3 seat, so a binding's *collection* is read as well as its token — and so do the
  gallery's tile rings under the taupe seat; the audio card reads `[2]`, the repertoire's three
  sets `[4]` / `[2]` / `[3]`, pricing's featured row and the map's panel `[3]`, and the
  testimonials' three registers `[1]` / `[3]` / `[4]`. Layout 4's header reads `[1]` for its
  paper capsule, links, pill and chips and `[4]` for its seal, the bio's and pricing's chips
  `[1]`, the gallery's arrow discs `[4]`, the map's viewport and the calendar's Back pill `[3]`,
  and the testimonials' second cell `[1]`. Layout 1's one such site (pricing's Book
  pills, Scheme 1 inside Scheme 2) predates the key and stays named literals.
- **`FIELDS` exposes every key any layout reads. A layout that does not consume a key simply
  ignores it, and the panel says so**: a field's `in` lists the designs that read it (0-based,
  `arch % designCount` and never the raw `arch`; an array, or an object keyed by template with
  `'*'` for the rest), and `fieldReach()` in `data.js` is what `EditPanel` asks before printing
  "Not shown in this layout" under the label ("…in this template" where `fieldNowhere()`
  finds the template's row empty). The field stays editable — switching layouts
  never discards copy. `in` is **measured, not read off the prose**: type into the field and
  see whether the section's HTML moves, canvas and `live`, at all three widths. The header's
  `in` names Retro, Lime, Grunge and Editorial only (Grunge's row measured over its four fitted
  cards, 2026-09-24 — the first measurement with no placeholder card; Editorial's over its four
  fitted cards, 2026-09-30, card 2 having lost the placeholder's `showBadge` and `badgeText`
  since its frame draws no seal, and cards 3 and 4 re-measured unchanged), so
  Pop's undesigned header family carries no note. The one exception is `cardLine` (JP-061):
  its `'*': []` row marks Retro and Pop "Not shown in this template", as `FIELDS.media.cta`'s
  row does, because only the three `s.limeTree` blocks read it. A field no design reads is deleted, not kept at `in: []`: `bio.statement` and
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
  The tab is a child of the editor and freezes if the editor reloads. Accepted. **Its desktop
  page zooms** (JP-038 reopened, user call, 2026-09-23): the canvas is the 1440 frame at 0.82,
  so between 1180 and 1440 `PublishedPage` wraps the rows in a CSS `zoom` of
  `min(w, 1440) / 1180` and lays them out at `w / k` — a 1440 window is the frame at 1:1 — and
  only width past 1440 goes into the gutters (`padX`, as before). Tablet and mobile never zoom,
  and nothing in `EncoreSection` knows; it has no vw / vh unit for the zoom to disagree with.
- **`s.live` is false everywhere except the published tab.** It is the seam for making a control
  real, and **sixteen things read it**: `Repertoire` — its search field, its filter chips and
  its pager, and in layout 3 the set cards' *View full set* reveal, which is the one control
  in the file that is a **reveal rather than a toggle**: the frame draws four song rows and a
  link, so the link is what reaches the fifth song and there is no way back, and in layout 4
  the **A–Z index rail**, which is the one control in the file that **scrolls from inside
  `EncoreSection`** — a `scrollIntoView` off a callback ref, on a letter some song actually
  starts with (a title whose first letter or digit is not A–Z files under `#`, and
  `vm.repRail` then leads the rail with a `#` cell, JP-083), where the header's nav needs the
  published tab's own delegated listener — the
  **header's
  navigation**, the **bio's own Listen** (layout 4 alone, in the overlay card's meta row: the
  header's `ListenLink` on the same `vm.listenTo`, which is resolved for every section, worded
  by the bio's own `cta2`, *Listen link* — JP-082 — and not drawn when that is emptied),
  the **media player** (below), the **gallery's arrows
  and thumbnail strip, and layout 3's fullscreen viewer** (below), the **events map's pager, its pin/row pairing, its map zoom
  (layouts 3 and 4, and Lime's, Grunge's and Editorial's layout 2) and — in layout 3 alone — its city chip row and its See all gigs reveal**
  (below),
  the **pricing section's chip row and Book pill** (below — the row filters the deck in layout 1,
  picks the single big plan in layout 2 and filters the stack in layout 3, where it also moves
  which row is featured),
  the **booking calendar's month arrows, its day picking, its foot pill (at layout 1 under Lime,
  Grunge and Editorial, the foot's line, JP-088) and — in layout 4 — its
  enquiry wizard and the summary column that follows it, *Package ›* included** (below),
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
  the box whenever it is not being typed in — derived from the stored value, so a remount shows
  a bad address at once (JP-049, retest)). Do **not** make `EncoreSection` interactive
  without gating on it: the editor canvas is a picture of a website, and a live filter chip there
  would both filter and select the section. `EncoreSection` therefore imports `useState` and
  `useRef` as well as `useId`; that is the whole of its React surface and it stays that way —
  there is **no effect anywhere in the file**, which is why `NavMenu`'s panel has no Escape key,
  no scroll lock and no focus trap. Each of those wants one — except the Escape key and the scroll
  lock, which the gallery's layout-3 viewer gets without one: it focuses itself off a callback
  ref and reads its own `onKeyDown`, and the same ref locks the page's overflow and returns a
  React 19 ref cleanup that restores it. `NavMenu` could take the same route.
- **Reordering** is drag-by-handle *or* arrows. `SectionList` owns the drag; `dragRef` is the
  source of truth and the `drag` state only mirrors it for rendering, so pointerup commits
  what it can see rather than what the last render observed. Rows are a uniform height, so
  the drop index is the pointer delta in row-heights, not a hit test.
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

## Per-section notes — read before touching the section

The per-section decisions live in `notes/`, one file per section, and load only when read.
**Before changing a section's rendering, its `vm` keys, its fields or its live behaviour, read its
file.** A design pass under `plans/` reads `notes/templates.md` and the notes of every section it
touches. **Record new section-level decisions in the section's `notes/` file, not here**: this
file is loaded into every session and holds only what is cross-cutting.

| Notes file | Covers |
|---|---|
| [`notes/media.md`](./notes/media.md) | The media player: `<audio>`, `cur`, the layout-2 fan, layout 4's sleeve and grid |
| [`notes/gallery.md`](./notes/gallery.md) | The gallery: `pick`, the strip and its mobile window, social rows, the layout-3 viewer |
| [`notes/map.md`](./notes/map.md) | The events map: pager, pin/row pairing, city chips, zoom, the ticker, the stat wall |
| [`notes/nav.md`](./notes/nav.md) | The header's nav: anchors, `navHref()`, nav labels, Minimal, `navFits` at 768 |
| [`notes/pricing.md`](./notes/pricing.md) | Pricing: chip filter, `tierHero` / `tierRow`, Featured, the Book pills |
| [`notes/calendar.md`](./notes/calendar.md) | The booking calendar: `open` / `booked` / `today`, slots, the layout-4 wizard and its mailto |
| [`notes/form.md`](./notes/form.md) | The enquiry form: the mailto submit, `formRows`, errors, every layout's card and seeds |
| [`notes/testimonials.md`](./notes/testimonials.md) | Testimonials: `cur`, the tile rail, the bento wall, the paging wall |
| [`notes/footer.md`](./notes/footer.md) | The footer: `LinksField`, the two derived columns, the Book pill |
| [`notes/list-editors.md`](./notes/list-editors.md) | The ten repeaters, `BookedField`, `SetsField`, `blankRow`, the seed resolvers |
| [`notes/photography.md`](./notes/photography.md) | Seeded photography: `SEEDS`, `null` vs absent, the two-slot categories |
| [`notes/templates.md`](./notes/templates.md) | Retro, Lime, Grunge and Editorial: the `s.lime` / `s.limeTree` blocks, faces, decoration, header families |

## Load-bearing rules from the notes

Copied from the notes files so they are never missed. Each is explained where it came from.

- **Media:** the audio source is assigned **imperatively** (`a.src = url; a.play()`), never as a
  `src` prop. Do not mark the playing card by raising it out of the stack. Do not centre the
  layout-2 fan's seats on `at`. (`notes/media.md`)
- **Nav:** on the canvas the links carry **no href at all** (not `#`, which would jump the builder
  to its own top); `navHref()` is the whole of that gate. (`notes/nav.md`)
- **Form:** the submit is an **`<a href="mailto:">`, never a `<form>`**. There is no `<form>`
  element in the section and there must never be one: submitting it posts to `<base href>` and
  the published tab reloads into the builder. The chip starts at **0**; do not "fix" it to -1.
  (`notes/form.md`)
- **Calendar:** all the date maths lives in `data.js` and `sectionVm`, never in `EncoreSection`,
  and every sum goes through `Date.UTC`. (`notes/calendar.md`)
- **Photography:** **Remove** writes `null`, not `undefined`: an absent key selects the seeded
  photo, so it would come straight back. (`notes/photography.md`)
- **Repeaters:** each seed resolver in `EditPanel` has to resolve exactly what `sectionVm`
  resolves. The heading's fallbacks live in `sectionVm` **and** in `EditPanel`'s chain: change
  one, change both. (`notes/list-editors.md`)
- **Editorial's face:** Noto Serif Display is one Google Fonts entry, never a second.
  (`notes/templates.md`)
