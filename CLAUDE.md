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
The **enquiry form is the one exception to "fully-resolved"**: `vm.formMailto` and `vm.formCheck`
are *closures*, not values, because their inputs are the visitor's keystrokes and `sectionVm` never
sees those. Everything else about them — the address, the labels, the casing — is still bound in
`sectionVm`, so `EncoreSection` hands over indexes and raw strings and composes nothing. They are
the only function-valued keys on the whole view-model.

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
  real, and **twelve things read it**: `Repertoire` — its search field, its filter chips and
  its pager — the **header's navigation**, the **media player** (below), the **gallery's arrows
  and thumbnail strip** (below), the **events map's pager and its pin/row pairing** (below),
  the **pricing section's filter chips and Book pill** (below),
  the **booking calendar's month arrows, its day picking and its foot pill** (below),
  the **enquiry form's boxes, its event-type chips and its submit** (below),
  the **testimonials carousel's arrows** (below),
  and the three sets of outbound links — the **media player's
  Soundcloud button**, the **gallery's YouTube / Instagram / TikTok rows** and the
  **events map's per-gig tickets link**
  (`extLink()` in `EncoreSection`, `extUrl()` in
  `data.js`: they open in a new tab, and a schemeless address is given `https://`, or
  `<base href>` would resolve it against the builder). Everything else —
  the audio and video sections — is
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
  button, still a picture when empty. The **canvas keeps all four regardless**: it is the reference
  design, the three fields start empty, and a fresh page would otherwise open on a single tile with
  no clue the others are a field away. The filter carries the index, because `srcIcons` and the
  per-source colours are positional. And the mobile source row **wraps** rather than clipping: the
  Figma frame lets it run off the right edge, which put TikTok — now a link — off the page. Four
  content-sized tiles come to ~430px against a 390 frame, so wrapping is what keeps every tile at
  its drawn size.
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
  gig would change colour as the pager turned. The flat map layout keeps raw `vm.pins`: it has
  no list to pair with, and twelve gigs would stack twelve dots on five spots.
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
  out, the way it draws the pin `sectionVm` paired with a gig. Nothing reads the clock: the
  calendar opens on the artist's date, not on today, or the canvas's picture would drift off the
  reference frame's June overnight. The arrows **wrap** at both ends rather than clamping, the
  media player's rule — a clamped first month opens the published page on a dead-looking arrow,
  a diff from the canvas — and their cursor is read off the handler, `Pager`'s rule. `sel` is an
  **ISO date, not an index**, because it must survive the month turning, and the **empty string is
  this section's `-1`**: nothing chosen, so `vm.calPick` renders and the published first paint is
  the canvas's picture by construction. Blocking the *cued* day cues nothing (`vm.calPick` is
  `''`) and the foot prints `vm.calPrompt`, rather than sliding the pick to the day after — the
  artist blocked it. A booked day is muted, struck through and handlerless, which is a **content**
  state and not a live one, so it renders on the canvas too; the seed blocks nothing, which is
  what keeps the reference picture. Two **intended diffs from the frame**: the foot row gains the
  Book pill on `vm.calBookTo` — `bookTo` minus `calendar` itself, the tier pills' rule, since
  `CTA_TARGETS.book` ends here — which is what turned `cta` from a field that edited nothing into
  a control, and `para` went with `DEFS.calPara` because it rendered in neither layout; and a
  month needing six rows grows one where June needs five, the grid never being padded to 35.
  The flat layout (arch 1, 3) still draws the hardcoded `CITIES` and reads none of this.
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
  the flat layout draws no chip row, so it sends the bare `Enquiry` rather than claiming a type
  the visitor was never offered. **No palette has a red**, so a refused box is an *inset* rule in
  `ctlInk` — inset, so the frame's stated 60 does not grow — under a prompt line; errors are
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
  carries three, so the reference picture does not move. Every value on the card is emptiable
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
  or touch state, and there is none in the file.
- **Six list-shaped contents have a structured editor: the repertoire's songs, the media
  player's tracks, the events map's gigs, the pricing section's packages, the enquiry form's
  boxes and the testimonials' reviews** — and the booking
  calendar's `booked` dates are a **seventh structured field that is not a list**: `BookedField`
  is a month to click, not a repeater, because one row per blocked date is the wrong shape for a
  June with eight of them, and it obeys the same seed-resolver rule as the six below. `c.songs` is an array of `{ title, artist, tags }`
  (tags a raw comma string),
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
  photograph. `map`'s `c.gigs` is an array of `{ venue, city, time, month, day, link }`,
  maintained by `GigsField` and the plainest of them: one key, one shape, no assets, and
  `link` normalised through `extUrl()` onto `vm.gigs[].url`. `form`'s `c.fields` is an array of
  `{ label, placeholder, kind }`, maintained by `FormFieldsField` and the only repeater with a
  **per-row `<select>`** (a stock shadcn one, unlike §9.1's layout dropdown — Radix's `ItemText`
  only breaks a row carrying a *thumbnail*): `kind` is `text | email | number`, and it is the whole
  reason the row is not just a label and a placeholder, since it is what tells the published form
  which box holds the address a reply goes to. `number` never becomes `type="number"` — the
  spinners break the frame's 60px box, so it takes `inputMode` only — and a date stays a text box
  with the artist's placeholder, the native picker being unstylable onto mustard. Its order is
  load-bearing where the other repeaters' is merely entry order: it is the order the boxes appear
  in, two to a row. `pricing`'s `c.tiers` is an array of
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
  so the reviewer takes the header line and the quote the textarea. Every other repeated field
  is a
  delimited textarea (`FIELDS.audio.tracks`,
  `FIELDS.tags.tags`). All five follow
  `images`, not
  `image`: an absent key means the seeded `SONGS` / `TRACKS` / `GIGS` / `TIERS` / `FORM_FIELDS` / `QUOTES`, an emptied array
  means none, and there is no
  `null` sentinel. The chips are derived from the tags, so nothing sets them directly, and the
  heading falls back to the song count in `sectionVm` **and** in `EditPanel` — change one, change
  both. Each seed resolver in `EditPanel` (`songsVal`, `tracksVal`, `gigsVal`, `tiersVal`, `formFieldsVal`, `quotesVal`) has to
  resolve exactly what `sectionVm` resolves, or the canvas lists rows the repeater has never heard
  of — which is why `GIGS`, `TIERS`, `FORM_FIELDS` and `QUOTES` are written in the row shape their repeater edits, tags and
  features as the strings the artist types, and only `TRACKS` needs dressing.
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
