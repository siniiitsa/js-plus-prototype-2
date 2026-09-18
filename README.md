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
  inherit `currentColor` and so stay theme-driven; from React it takes `useId`, `useState` — for
  the things that have live controls: Repertoire, the header's burger menu, the media player, the
  gallery, the events map, the pricing cards, the booking calendar and the enquiry form — and
  `useRef`, for the media player's one
  `<audio>` element, which is commanded rather than described. There is no effect anywhere in the file, and nothing else is imported.

Do not try to unify them. Only three hand-written CSS classes cross the boundary —
`.hv-indent`, `.hv-acbord`, `.hv-acfill` — because each reads the `--ac` / `--acFg` custom
properties set per section at runtime.

Every section is projected through `sectionVm()` into a flat, fully-resolved view-model before
rendering, so `EncoreSection` does zero colour maths. The enquiry form is the one exception to
"fully-resolved": `vm.formMailto` and `vm.formCheck` are closures rather than values, because
their inputs are the visitor's keystrokes and `sectionVm` never sees those. Every address, label
and case decision is still bound in `sectionVm`, so the renderer composes nothing.

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
   as drawn). The media player's track artwork is the frame's own five album covers, which are
   real records: shipping them in the demo was a user call (2026-09-17), and they would have to be
   replaced before anything public. Everything else — the photography, the
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
   transition (bottom-centre, 28px desktop / `calc(72px + env(safe-area-inset-bottom))` mobile,
   passed as both `offset` and `mobileOffset` because sonner reads the latter below 600px),
   which produces the same slide-up; the pill itself is styled to §9.2's exact values. The
   `toastUp` keyframe is still defined in `index.css` per §3.2. Two additions: while a mobile
   drawer is open the toast drops from the **top** instead, since the drawer covers the bottom
   nav and its own foot would sit under the pill; and the delete toast carries an **Undo**
   button and lives 6 s instead of 2.4 (see *Scope boundaries*).

## Choosing a header

SPEC.md's stage 2 was a full-screen *Choose a header* page between the template picker and the
editor. It tested badly: it asks for a decision about a part of a page the user has not seen yet,
and "Header layout 4" names nothing. It has been removed. Picking a template now builds the page
and opens the editor on it directly, with the whole page on layout 1, and the header choice is
asked for **inside** the editor — where it moves all of it, not just the masthead.

`st.stage` is `'template' | 'editor'`. The template picker is the app's first screen; picking one
opens the editor with `st.onboard` armed, and the **setup modal** goes up over the finished page:
a `Dialog` carrying a 3-up grid of the template's header layouts, one sentence saying what a
header is, and *Decide later* / *Use this header*. It is a gate, so both exits are real ones —
either clears `st.onboard` and the editor is then just the editor.

Four things about it are load-bearing:

- **One component.** `HeaderChoices` renders the grid — the first `setupHeaderCount()` layouts
  (at most four) of the ones the header's edit panel offers in its `LayoutPicker` dropdown, under
  the same names. Only layouts 1–4 are a whole Figma page, so Retro's *Overlay card* and *Stage
  wide* are left out of the modal and reached from the sidebar alone. Its frame is the *median*
  of the measured layout heights, so the tallest layouts neither crop nor strand the rest.
- **Click to try, at full size.** Hovering a card lights the card and nothing else; clicking one
  sets the real page behind the modal, which stays open. A click is a try rather than a
  verdict — the layout can be swapped as often as the user likes, and *Use this header* is what
  ends it. There is deliberately no hover preview: the page behind changed under the cursor
  faster than it could be read, and a layout that reverted on mouse-out read as a bug.
- **The whole page follows, not only the header.** The layout indices are aligned across
  categories by construction: layouts 1, 2, 3 and 4 of every section are one Figma page each, so
  *Feature spread* stands over the bio's split card and the testimonials' editorial feature,
  *Inset Hero* over the bento wall, and *Stacked* over the bio's portrait-with-overlays and the
  testimonials' video story wall. A card therefore writes `arch` to every section, folded by
  `pageLayout()` into that category's own design count. The cards are named rather than
  numbered because the header is the one category whose layouts carry names (§4.4b). This is the setup modal only. The
  ordinary `LayoutPicker` in the sidebar still moves one section, so nothing the user has tuned
  by hand is ever overwritten; the modal can write the whole page because it is a one-shot gate
  over a page that has just been built and not yet touched.
- **Names, not numbers.** `headerLayout()` in `data.js` promotes the names the compositions
  already carried in `EncoreSection`'s §10.2 comments — Hero, Feature spread, Inset Hero, Stacked,
  Overlay card, Stage wide (Lime's family is the first four, and Grunge, Editorial and Pop's is
  Centred / Split / Rule) — into every label,
  including the ordinary `LayoutPicker` dropdown. Every other category stays numbered: its
  layouts are variations of one idea, and the number is honest about the folding.

The `startTheme` prop skips the template picker, and skips the onboarding with it.

## Seeded photography

Retro and Lime — the two designed templates — open with their Figma mock photography already in
place.
The assets live in `src/builder/photos/` and are wired up by `src/builder/photos.js`, which is
the only module that imports them.

- **Retro and Lime only.** `defaultImage()` / `defaultImages()` / `defaultTrackArt()` resolve
  through `SEEDS` in `photos.js`, one row per seeded theme, and return `undefined` for Grunge,
  Editorial and Pop, so those three render the initials placeholder exactly as before. Lime's row
  is a different shoot for the artist's own pictures (the hero, its portrait card, the bio and
  its layout-3 landscape shot, the calendar, the form avatar, the form's layout-2 stage photograph and the gallery spotlight) and
  Retro's files for the rest. The photography is Retro's art direction, not the user's content, so switching template
  drops it — with one exception: the media player's track art is materialised into `c.tracks` the
  moment the artist edits the list (it has to be, or renaming track one would delete five
  photographs), so from then on it is theirs and survives a template switch.
- **Imports, never fetches.** §8.6 forbids a network request in the render path.
  `vite-plugin-singlefile` forces `assetsInlineLimit = () => true`, so all thirty-five files are
  base64-inlined and the committed `index.html` still opens from `file://`. It is ~6.5 MB.
  (The plain `npm run build` path has no such override and would emit them to `dist/assets/`
  instead; only the standalone build feeds the committed demo.)
- **`null` is the explicit-clear sentinel.** A fresh section carries no `image` key at all, and
  that absence is what selects the seeded photo — so **Remove** writes `null` rather than
  deleting the key, which would silently restore it. Absent → the mock photo, `null` → the
  initials placeholder, a string → an upload. `images` needs no sentinel: an emptied array is
  already distinguishable from an absent one.
- **Three shapes, not two.** A section's single `image`, a section's ordered `images`, and — since
  the media player — a photograph belonging to one *row of a list*. Its track artwork travels in
  `c.tracks[i].image` rather than in a section-level array, so the picture moves with the track
  instead of slot 3 silently meaning track 3; `defaultTrackArt()` seeds the untouched list and a
  sixth track the artist adds simply has none. `Photo` distinguishes `src` left off (fall back to
  the section's own photo) from `src={null}` (this slot has no picture), which is what stops an
  art-less track row inheriting one. The media player is also the one section with **no photo of
  its own**: the player shows the artwork of the track it is on, so the sleeve is track one's
  until a visitor picks another.
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
  interactive has to be off there. **Ten sections read it**, plus the four sets of outbound
  links below.

  **Repertoire.** Its search box filters on title and artist, its filter chips filter on the tags
  the artist typed, and its pager is derived from the result — all three inert on the canvas,
  which still draws the picture the Figma frames show. What unblocked it was putting the songs in
  the content model (`FIELDS.repertoire.songs`).

  **The header's navigation.** Every section is given a DOM id — its category, which is unique per
  page — so the nav links, *Book Now* and *Listen* all scroll to the section they name, and the
  *Minimal* triple resolves Music / Shows / Book to the nearest section the page actually carries.
  A label with no such section stays on the canvas, is named in a hint above the Navigation links select,
  and is left out of the published nav, the footer's rule.
  Below the desktop frame the links collapse to a hamburger, which now opens a full-screen menu:
  before, layout 1's glyph opened nothing and layouts 2–6 dropped their links outright, so a
  published phone had no navigation at all. The panel is deliberately thin — no Escape key, no
  scroll lock, no focus trap — because each of those wants an effect, and `EncoreSection` has no
  effects.

  **The media player, which plays.** The section owns one `<audio>` element, rendered only when
  `live`. A click anywhere on a track card loads that track and starts it; the transport under the
  sleeve is a real play/pause, previous and next, wrapping at both ends; the now-playing title,
  sleeve, clock and progress bar are the element's own state, and `ended` moves to the next track.
  Each row carries its own address (`FIELDS.media.tracks` grew an `audio` field beside `image`),
  normalised through `extUrl()` like the Soundcloud button below, and the five seeded demo tracks
  carry `TRACK_AUDIO` — remote files, so the double-clickable build is audible only online. Two
  details are load-bearing: the source is assigned to the element imperatively, never rendered as
  a `src` prop, because a re-render four times a second must not reload the file under the
  playhead and Safari will not autoplay a freshly mounted element; and `playing` mirrors the
  element's own `play`/`pause` events rather than the click handlers, so a browser that refuses
  the first `play()` cannot leave the button lying. The card names and shows the track the player
  is on — track one until a visitor picks another — so `FIELDS.media` no longer offers a
  now-playing track or sleeve of its own: a separately editable copy of what the card shows could
  only contradict the list it sits beside, and the section is now the one with no photo slot at
  all. Nothing is *marked* as playing, and the clock stays at 00:00, until the first pick; the
  canvas keeps `NOW_PLAYING`'s decorative clock, because the Figma frame draws a player caught
  mid-song — unless the list is empty, where the card says "No tracks yet." and the clock reads
  00:00 on both surfaces.

  **The gallery, which browses.** The seven-tile strip is a real filmstrip on the published page:
  every thumbnail is clickable, the rail's two arrows step through the slots and wrap at both
  ends, and "Back to beginning" rewinds. The tile counter and the large viewer follow. State is a
  single `pick`, starting at `-1` — nothing chosen — so both sides open on `galActive()` and the
  published tab's first paint is the canvas's picture by construction. Every slot is navigable,
  not just the filled ones, so the count never shifts under the visitor as photos are added or
  removed. The mobile frame draws four of the seven tiles; rather than stranding photos 5–7 where
  no phone can reach them, that window of four slides once the visitor walks past the fourth — and
  it is anchored at 0 for the first four, so the canvas's mobile picture is unchanged.

  **The gallery's three social rows, and the media player's Soundcloud button.** The page's
  *outbound* links. `FIELDS.gallery` grew `youtube`, `instagram` and `tiktok` beside
  `FIELDS.media`'s `soundcloud`; `GALLERY_SOURCES` names the key each row reads, so the first
  row — the page's own strip, which the arrows already drive — has none. `extUrl()` normalises
  each to an absolute URL, since a schemeless one would resolve against `<base href>`, i.e. the
  builder, and `extLink()` turns the row or the pill into an `<a>` with `target="_blank"`, since
  the delegated listener below swallows fragments and nothing else. An address that is not one
  — "not a url", `javascript:`, `//cdn.x`, a bare `localhost` — normalises to `''`, the same as an
  empty field, and the editor says why under the input once the artist leaves it
  (`urlProblem()`, shared with every other address field: a track's audio, a gig's tickets link,
  a footer link's url). An empty field leaves the
  Soundcloud pill the picture it always was (under Lime, whose layout-1 frame draws Book Now in
  that seat, the seat is the `cta` Book pill and the Soundcloud pill is drawn only when filled)
  — but an empty *gallery* row is not published at all.
  A tile that promises a destination it cannot go to is worse than no tile, and unlike the pill,
  which sits alone, these sit in a row that reads as a list of where to follow the artist. The
  canvas still draws all four: it is the reference design, the three fields start empty, and an
  untouched page would otherwise open on a single tile with no hint that the rest are a field away.
  One layout consequence: the mobile source row now **wraps**
  onto a second line instead of letting the frame clip its right edge. Four content-sized tiles
  come to ~430px against a 390 frame, and the clipped one was TikTok — fine while the rows were
  decoration, not once the fourth carries an address. Wrapping keeps every tile at the size Figma
  draws it, and the row's 20px gap is the row gap too, so the open tile's offset shadow clears.

  **The events map, which pages and pairs.** Its gig list became the artist's
  (`FIELDS.map.gigs`, a `GigsField` repeater of `{ venue, city, time, month, day, link }`), and a
  list the artist owns cannot keep a pager that hardcodes twenty pages over five rows. So the
  pager is derived the way the repertoire's is, `PAGES` is deleted, and — again like the
  repertoire's — it is not drawn at one page: the five seeded gigs are one page, so the reference
  picture simply no longer shows a pager. Five to a page is `PINS.length`, not a literal: one page
  of gigs is one set of distinct pin positions, so the map redraws with the pager and never lights
  the same dot twice. Each gig carries the pin it lights, paired by index in `sectionVm`, and
  clicking either side lights both — a click, never a hover, because a phone has none and a
  `mouseleave` reset would fight the pin. `sel` starts at `-1` and indexes the whole list, so
  paging away from a lit gig and back finds it lit. A gig with a tickets link is an `<a
  target="_blank">`, so the one click both opens the tab and lights the pin; a gig without one
  stays the picture it was, the Soundcloud rule rather than the gallery's — a gig is a show, not
  a tile promising somewhere to go. `Pager`'s buttons also stopped showing a pointer when they
  carry no handler, which is what a pager on the canvas is.

  **The pricing cards, which filter.** The Solo / Trio / Band selector above the cards was a
  constant — `TIER_MODES`, three labels nothing could edit, over three cards hardcoded to the
  seed. The packages are the artist's list now (`FIELDS.pricing.tiers`, a `TiersField` repeater of
  `{ name, price, tags, blurb, feats }`), and the selector is **derived from the tags they type**,
  by the same `repChips()` the repertoire's chips come from: the three seeds carry Solo, Solo /
  Trio / Band and Trio / Band, so the reference row is redrawn out of content, behind the `All`
  chip that clears the filter. That extra chip is the intended diff from the Figma frame, the way
  the events map losing its pager was; the row is not drawn at all when the packages carry no
  tags, since a filter with nothing to filter is the pager's case again. The cards key on the
  package's index in the *whole* list, not its place in the filtered one — they cross-fade their
  background, and a positional key would animate one card's hue into another's on every chip
  click — while the tilt and the mobile deck's 18px overlap keep the rendered index, so the deck
  reads as a deck at any count. Three columns stay three: a fourth package wraps to a second row
  rather than squeezing the first three. Blurbs, feature lists and the `/event` suffix became
  content on the way through (the suffix is a section field, the rest per row), and each card's
  Book Now pill now scrolls to the booking section — `vm.tierBookTo`, which is the header's
  `bookTo` minus `pricing` itself, since `CTA_TARGETS.book` ends there and the pill must not
  scroll the visitor to the section they are already reading.

  **The booking calendar, which navigates and picks.** It was the last §10.2 section that was
  entirely a picture: its month arrows and its thirty day cells carried a pointer cursor and no
  handler at all, in both modes, and the month itself was three constants and a sentence
  (`CAL_MONTH`, `CAL_LEAD`/`CAL_LENGTH`, `CAL_PICKED`, `CAL_ENQUIRY`). The whole section is built
  from **one date** now — `FIELDS.calendar.open`, the month the grid opens on and the day it opens
  picked — plus the dates the artist is already taken on (`booked`) and the hour the foot line
  names (`time`). A visitor turns the month, picks a free day, and the line along the foot follows
  it; the pill beside that line takes them to the enquiry form.

  Every sum over a date goes through `Date.UTC` in `data.js`, and `sectionVm` resolves the whole
  twelve-month window — labels, cells, booked flags and one composed enquiry line per cell — so
  `EncoreSection` looks a line up rather than working a date out, the way it draws the pin
  `sectionVm` paired with a gig. The arrows **wrap** at both ends of that window rather than
  clamping, the media player's rule: a clamped first month would open the published page on a
  dead-looking arrow, which is a diff from the canvas. `sel` is an ISO date rather than a cell
  index, because it has to survive the month turning — it names a day, not a square of whatever
  month is on screen — and the empty string is this section's `-1`, so `vm.calPick` renders until
  a visitor picks something and the published first paint is the canvas's picture by construction
  — up to the clock. The canvas never reads it, so it stays the frame's June; the published tab
  reads today once (in UTC) and, from it, kills every day and slot before today exactly as a
  booked one is killed but without the strike, drops a cued date that has passed, and opens on
  today's month when `open` is earlier.
  Blocking the *cued* day cues nothing rather than sliding the pick to the day after: the artist
  blocked it. Booked days are muted and struck through and take no handler (Lime dims them to .38
  with no strike, its own frames' state, in the layout-2 slot list as in the layout-1 grid), which is a **content** state rather than a
  live one — it renders on the canvas too, and since the seed blocks nothing
  the reference picture does not move. Two intended diffs from the Figma frame: the foot row gains
  the Book pill (`vm.calBookTo`, `bookTo` minus `calendar` itself, the tier pills' rule), which is
  what turns `cta` from a field that edited nothing into a real control; and a month that needs
  six rows simply grows one, where June needs five.

  Its editor is the fifth structured field and the first that is not a repeater: `BookedField` is
  a month of the artist's own to click, because one row per blocked date is the wrong shape for a
  June with eight of them. It pages the same twelve-month window the *published* section does —
  from today's month once `open` has passed, with the days before today faded and unclickable
  unless already blocked — which makes it the editor's one reader of the clock. `para` went
  with `DEFS.calPara` — it rendered in neither calendar layout.

  **The enquiry form, which fills in and sends.** It was the last §10.2 section whose every
  control was a picture — and the one the rest of the page points at, since `CTA_TARGETS.book`
  starts at `form`, so the header's *Book Now*, the pricing pills and the calendar's foot pill all
  scrolled the visitor to a set of `<span>`s they could not type into. Four of its seven values
  also bypassed the content model outright (`FORM_PROMISES`, `FORM_FIELDS`, `FORM_TYPES`,
  `FORM_MESSAGE` were constants), and `email` was a field that edited nothing. All of it is the
  artist's now: the promises are a newline textarea, the event types a comma one, the message
  placeholder a text field, and the boxes are `FIELDS.form.fields` — a `FormFieldsField` repeater
  of `{ label, placeholder, kind }`, the fifth repeater and the sixth structured editor, and the
  only one with a per-row select. `kind` is `text | email | number`, and it is what makes
  validation derivable rather than guessed: with a label and a placeholder alone there is no way
  to know which box holds the address a reply goes to. For the same reason the last `email` row
  cannot be removed or retyped in the editor: its trash button and its other kinds are disabled,
  with a hint that says why.

  **The submit is a `mailto:`**, and `email` is what it is addressed to. There is no backend and
  never will be, so handing the enquiry to the visitor's own mail app is the one delivery that is
  genuinely front-end-only — and it is honest, where an inline "Sent!" over nothing is not.
  `enquiryMailto()` composes it in `data.js`, beside `extUrl()`, whose comment already said a
  `mailto:` is passed through untouched; `sectionVm` binds that over the address and the labels
  and hands the closure down, so `EncoreSection` — which imports nothing but React and lucide —
  still composes nothing of its own. The pill is an **`<a href>`, and never a `<form>`**: a form
  here has no action, so submitting it, which an Enter key in any text box does, would post to
  `<base href>` — the opener's URL — and the published tab would reload into the builder. That is
  the `document.write` failure through a second door, and with no form element there is no
  implicit submission either. Rendering the address on the anchor rather than calling
  `location.assign` in a handler is also what makes the whole thing verifiable: fill the boxes and
  read `getAttribute('href')`. An empty address composes to `''` and the pill goes back to being
  the span it always was — the Soundcloud button's rule rather than the gallery's, because a form
  the artist has not addressed is still the picture their page is built around.

  Three details are worth naming. The event chip starts at **0**, where the player's `cur`, the
  gallery's `pick`, the map's `sel` and the calendar's `''` all start at "nothing chosen": here
  the reference picture *is* chip 0 filled, and a form that defaults its first choice is what a
  form does — pricing's `active` pins 0 on the canvas for the same reason. The flat fallback draws
  no chip row and never has, so it sends the bare `Enquiry` rather than claiming a type the
  visitor was never offered. And **no palette in `THEMES` has a red**, so a refused box is drawn
  out of what exists: an inset rule in the accent's own ink — inset, so the frame's stated 60px
  box does not grow — under one prompt line. (Lime's boxes are pills, and a rule under a pill
  smears, so there the hairline thickens to a 2px inset ring of full ink.) Errors are `useState`, set on a refused submit and
  cleared per box as it is corrected; nothing needed an effect, and the file still has none. A
  valid submit swaps the mustard half alone for a confirmation that prints the address in plain
  text, since a browser that opened no mail app must still show one, and *Write another* comes
  back with what was typed.

  One layout consequence, measured off the frames rather than assumed: the boxes are paired two
  to a row in `sectionVm` (`vm.formRows`) rather than auto-flowed through one grid. All three
  frames space the two fields *inside* a row by 12 (10 at 390) and the rows themselves by the
  panel's own 14, and a single grid has one `rowGap`; an odd count trails one half-width cell,
  which is the pricing deck's rule again. A published placeholder draws at `::placeholder`'s .45
  where the canvas span draws it at full — Repertoire's box has always done that, so it is an
  accepted diff rather than a new one, and no fourth `.hv-*` class was added for it.

  **The testimonials carousel, which pages.** It was the last §10.2 section that was a picture
  on *both* sides rather than only on the canvas: the two arrows flanking the quote card carried
  a pointer cursor and no handler in either mode, and layout 1 drew `QUOTES[0]` and nothing else,
  so the other two seeded reviews could not be reached at all. Three flat keys reached that one
  review — `quote`, `who`, `role` — the small date line above the quote was editable by nothing,
  and no field could add a fourth review or drop one. The reviews are now the artist's list
  (`FIELDS.testimonials.quotes`, a `QuotesField` repeater of `{ quote, who, role, when }` — the
  sixth repeater and the seventh structured editor), and
  on the published page the arrows walk them, wrapping at both ends the way the calendar's
  months and the player's tracks do.

  `cur` starts at **0** rather than the "nothing chosen" `-1` the player, the gallery and the map
  start at: the frame draws a filled card, so here the picture already *is* a choice — the
  enquiry form's event chip again. It is clamped against the list, because the artist can delete
  the review the visitor happens to be on and Publish re-renders a tab that is already open. The
  arrows are **not drawn at one review**, which is the pager's rule and the pricing chips'; that
  is derived from the list rather than from `s.live`, so it holds on the canvas too, and the
  desktop row then centres the card instead of standing it against the gutter. The seeded three
  keep the reference picture, so the only diff to the Figma frames is the cursor the canvas
  arrows no longer carry over nothing.

  Every value on the card is emptiable now, so each is rendered or not rather than printed blank,
  and the attribution is composed in `sectionVm` as `vm.quotes[].byline` — the calendar's
  one-composed-line-per-cell rule, and what keeps a bare separator off a card whose role has been
  cleared. The two pills below it are still the reviewer and the role, which is the frame's own
  reading of the card, so they repeat the attribution deliberately. An emptied list keeps the
  card, its two rotated backs, the torn edge and the grain and prints one message inside it, the
  pricing deck's empty state: the section is a composition, and a hole where the card stands is
  not one of its states. `vm.quote1` is gone with the flat keys, which also closes the three-up
  layout's old `i === 0` seam — every card there is the artist's now, and every quote is cased,
  where only the first used to be. There is no autoplay and no swipe: both want an effect or
  touch state, and `EncoreSection` still has neither.

  **The footer, which navigates.** It was the last §10.2 section that was a picture on both
  sides, and the only one whose links were dead by the *header's own* rule: `linkCol` drew
  `<a href="#">`, which is precisely what `navHref()` had removed everywhere else — the published
  tab's delegated listener swallows a bare `#`, and on the canvas it jumps the builder to its own
  top. The Book pill beside them was passed no target, so it was a `<span>` on both surfaces, and
  its label read the header's `cta1`, a key no footer field named. `FOOTER_LINKS` was two
  hardcoded columns of four strings; the sitemap is the artist's now
  (`FIELDS.footer.links`, a `LinksField` repeater of `{ label, to, url }` — the seventh repeater
  and the eighth structured editor), and on the published page every link either scrolls to its
  section or opens an address in a new tab.

  It is the first repeater whose row carries two *kinds* of target, which is `BookPill`'s own
  `ext ? … : to` seam moved down to a row: `to` is a section id, or the sentinel `link`, and only
  a `link` row reads `url` — and only a `link` row renders the box for it, because an address
  field standing empty under eight section rows is noise rather than an affordance. Its options
  are `FOOTER_TARGETS`, every category a page *can* carry rather than the ones this one does: a
  Radix `Select` whose value names no item blanks its trigger, so a link to a section since
  deleted must still read as what it points at, and a link can be aimed at a section not yet
  added. Resolving the target against the actual page is `sectionVm`'s job. When a row's section
  is not on the page, the canvas keeps the label and the editor marks the row "Section not on the
  page", while the published footer leaves the row out, because a visitor gains nothing from a
  word that goes nowhere. A plain-label row (target *Nothing*) and a web-address row with a
  refused address still render. On a blank page the published footer is the Book pill alone,
  just as the header's nav is empty there. The columns are halved from the list that actually
  renders.

  The two columns are derived rather than stored. The frames draw four and four, so the list is
  halved with the remainder in column one — the pricing deck's odd-count rule, and column one is
  the one the pill stands in, so it is the one that should run long — and an empty second column
  is dropped rather than rendered as a `nav` with no children, `links` being a flex row where an
  empty child still spends its gap. The pill takes `vm.bookTo` with no self-exclusion filter,
  unlike the tier pills' and the calendar's: `footer` is not in `CTA_TARGETS.book`, so it can
  never point at the section it stands in. An emptied `cta` drops it, which the calendar's foot
  pill does not do — there the pill sits at the end of a row of type, here it is the block the
  column is built round, and a wordless block is not one of the section's states. Two smaller
  gaps close with it: `showBadge` is the header's own key and `vm.showBadge` already read this
  section's content, so the seal was hidable by nothing only because no field here named it; and
  `vm.footerCta` is deliberately **uncased** where the statement and the labels are cased,
  because the pill has always drawn the uncased `cta1` and casing it would upper-case the
  footer's pill on Grunge and Pop. `FOOTER_CREDIT` stays a constant on purpose — it is the
  platform's byline, not the artist's. The footer keeps no local state: every link is an anchor
  whose href is `navHref()` or `extLink()`, so it needs none of the `useState` the sections above
  it take.

Two limits worth naming before demoing it: the tab's address bar reads `about:blank` — the fake
domain is in the dialog copy, and the alternative (`document.write`) would make the tab claim the
builder's own URL and reload into the builder. That is also why a nav link is never *followed*:
`<base href>` pins the popup's fragment hrefs to the opener's URL, so one delegated click listener
swallows every `#…` and does the scroll itself. And the tab is a child of the editor, so
reloading or closing the editor freezes it. Publishing again re-renders the tab that is already
open rather than piling up tabs. One consequence has a sound now: the `<audio>` element lives in
the popup's own document, so a frozen tab keeps *playing* while its controls are dead. Close the
tab to stop it.

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
- **Delete is one click, with Undo instead of a confirm.** Every delete — the page list's
  menu, the edit panel's button and the canvas toolbar's trash — toasts "*Section* removed ·
  Undo", which puts the same section back where it was (clamped so the footer stays last) and
  opens no editor. The next toast replaces it as any toast does. Separately, `st.removed` keeps
  each category's last deleted `{ arch, c }`, uploads included, so adding that category again
  brings its content back and the add composer opens on its old layout; a *Start fresh* tick
  in the composer opts out. It lives only as long as the session, like everything else.
- **Retro and Lime are designed; Grunge, Editorial and Pop are not.** Retro ships six
  photographic header layouts. Grunge, Editorial and Pop are fully selectable and functional but
  render flat-colour sections and a three-layout flat header family — whose nav is still the
  hardcoded `Music · Shows · Book` triple in `FlatNav`, ignoring the artist's sections and never
  collapsing to a burger. Deliberate: the live navigation was scoped to the designed templates.
  The §10.2 *layouts* are shared by all five templates; Retro's decorative treatment — paper
  grain, torn edges, checkerboard, hard offset shadows, rotated cards — is gated on `s.retro`,
  the same split as `headerFamily()`. **Lime is designed at all four of its layouts**: each of its
  Figma pages is Retro's page of the same number in another variable mode, so its own treatment —
  arc seams between bands at layouts 1 and 4, glows at every layout, the arch portrait, the
  reticle — is gated on `s.lime` inside the same shared branches. Its header family is the first
  four photographic layouts, all four fitted (Lime's Inset Hero and its Stacked header are
  different compositions from Retro's: an upright glass card where Retro tilts a polaroid, and a
  glass nav capsule over an identity panel where Retro stands on a checker floor), so every card
  in the setup modal lays out a whole Lime page and the Lime family is closed. At layouts 2, 3
  and 4 the footer is layout 1's. One piece of Retro's treatment is placed
  rather than copied: the checker ribbon on header layout 1's floor is not in the Figma hero
  frame at all. It is lifted from the stacked header, which shares the same full-bleed
  photograph — a fixed band, unscaled at every breakpoint, run a third finer than the reference's
  24px so the squares read as texture: 16px tall, 8px squares.
- **Layout folding.** Seven of the 10 non-header categories offer more layout numbers than
  there are distinct designs, so e.g. `Pricing layout 1` and `5` render identically while
  keeping their own labels. The header, the footer, the gallery and the map are level.
- **Fields a layout does not read stay editable.** Each section's panel lists every field any
  of its layouts reads, so switching layouts never discards copy. A field the current layout
  ignores says "Not shown in this layout" under its label, off the field's `in` list and
  `fieldReach()` in `data.js`. The flat three's header carries no such note: its family is not
  designed, and `in` names Retro's and Lime's header layouts only.
- **Accessibility is scoped to the chrome.** Radix supplies focus management, keyboard
  navigation and ARIA there. The rendered preview is deliberately not accessible: it is a
  picture of a website, not a website. The seal badge honours `prefers-reduced-motion`.
