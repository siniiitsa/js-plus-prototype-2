# The header's navigation — working notes

Moved word for word out of `CLAUDE.md`'s *Intentional limits — not bugs* on 2026-09-30, so it
loads only when a session works on it. "Above" and "below" may point into `CLAUDE.md` or
another `notes/` file.

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
  because the label is what is distinct by construction in both modes; `to` is not promised to
  be (Minimal's old Shows and Book could land on one section, and today's three preference
  lists are disjoint only by their seeds). **The label is the visitor's
  word, not the editor's** (JP-033): `CATS[].nav` through `navLabel()` in `data.js` — About, Top
  Tracks, Media, Repertoire, Shows/Coverage, Pricing, Enquiries, Reviews, the eight every frame's
  footer draws and layouts 1 and 4's navs with it, plus **Availability** for the calendar, which is on the seeded page and in
  no frame's nav (user call, 2026-09-18: a ninth link over an unreachable section). `catName()`
  keeps every editor-side use, `FOOTER_TARGETS`' select included. One `navSectionsOf(cats)`
  builds the list for the editor, `PublishedPage`, the picker's `previewNav` and the harness, and
  `FOOTER_LINKS` seeds its labels from the same `navLabel()`, so a fresh page's two lists agree;
  the footer's rows are then the artist's to reword and the nav's are not. `vm.calFlow` reads
  these labels too, so calendar layout 2's head says "Availability · Pricing · Enquiries" where
  its frame's flow says "Available dates · Packages · Enquire" (held when JP-041 reported it
  again, 2026-09-21). **Minimal's triple is the frames' own** (JP-033, second pass): layouts 2
  and 3 draw Music / Gigs / About in Retro and Lime alike (and in Grunge's and Editorial's), so
  `NAV_MINIMAL` is those three —
  Gigs on the map or the calendar, About on the bio, Book gone because its pill already stands
  beside the links — and **`navMode`'s default follows the layout** (`navModeDefault()` in
  `data.js`, JP-039 reopened, user call, 2026-09-23): Minimal at layouts 2 and 3 of Retro, Lime,
  Grunge and Editorial, *Follow my sections* everywhere else, and in `EditPanel`'s fallback chain
  too, so the panel names what the canvas draws. A stored value always wins, so the seeded
  header is its frame's picture at all four layouts and moves with the layout until the artist
  picks. **Pop's header reads
  none of this**: `FlatNav` hardcodes Music / Shows / Book. **At 768 the links are
  fit-gated in layouts 2 and 3, and folded everywhere else** (JP-039, user call, 2026-09-21).
  The 768 masters of layouts 2 and 3 draw Music / Gigs / About in the capsule, in Retro and
  Lime alike (and Grunge's two, and Editorial's); those of layouts 1 and 4 hide all eight link nodes beside a burger. But `navLinks`
  is the artist's page, and the seeded eleven sections give nine — 576px of type at the master's
  own 16px, 720 with the capsule's eight 18px gaps, in a 708px bar that also seats the wordmark,
  Listen and the pill. So `sectionVm` sums the bar's one row at the master's own sizes — the
  capsule, the name, Listen and the pill, against 708 in layout 2 (the root's column since JP-038) and 684 in layout 3 — and
  **`vm.navFits`** is the answer: the links draw when it is true and `NavMenu`'s burger stands
  otherwise, in the same bordered capsule, which the 390 masters draw the burger in. Minimal's
  three fit under the seeded name (the wordmark is in the sum, so a long one can fold them too); *Follow my sections* on the seeded names fits up to four links in Retro
  layout 2, five in Retro layout 3, seven in Lime's layout 2 and six in its layout 3, eight in Grunge's layout 2 and seven in its
  layout 3, five in Editorial's layout 2 and four in its layout 3 (it is the words' width that
  counts, not their number), so a page switched to *Follow my sections* is still the burger. It is a vm boolean
  because `EncoreSection` has no effect to measure with: Lime's sum is `navEms` /
  `navNameEms` / `navCtaEms` (Bebas, `bebasEms()`), Retro's is `antonEms()` in `data.js`, its
  0.02em tracking folded in (Grunge's arm is the same table at a tracking of 0, its mode stating
  none; Editorial's `navEms` family is `notoEms()`, read off the rendered DOM, and its layouts 2
  and 3 take Grunge's arm — the same bar, the same fixed 18 gaps — in Noto, layout 3's links at
  Label/SM where Grunge's are Label/MD, against 684). It is set at tablet only — desktop never reads it and always draws
  the links — and is undefined, so the burger, at 390, on an empty nav and in layouts 1 and 4;
  layouts 5 and 6 draw `NavLinks`, which
  keeps the (wrapping) link row at 768 and collapses only at 390 (measured in JP-033's digest).
  The harness takes `&nav=<n>` to shorten the page and walk the flip.
