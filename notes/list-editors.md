# The structured list editors — working notes

Moved word for word out of `CLAUDE.md`'s *Intentional limits — not bugs* on 2026-09-30, so it
loads only when a session works on it. "Above" and "below" may point into `CLAUDE.md` or
another `notes/` file.

- **Ten list-shaped contents have a structured editor: the repertoire's songs, the media
  player's tracks, the events map's gigs, the pricing section's packages, the enquiry form's
  boxes, the testimonials' reviews, the footer's links, the booking calendar's layout-2
  slots** (`SlotsField`, JP-052: `{ date, kind, price }`, `SLOT_KEYS`, `slotsVal`, the gigs'
  plain shape but for a seed dated from `open` — above), **the events map's layout-4 stat
  wall** (`StatsField`, JP-077: `{ label, value, sub }`, `STAT_KEYS`, `statsVal`, seeded
  `MAP_STATS_4`, the gigs' plain shape — above) **and the enquiry form's layout-4 steps**
  (`StepsField`, JP-079: `{ title, sub }`, `STEP_KEYS`, `stepsVal`, seeded `FORM_STEPS`, the
  stats' shape — above). The booking calendar's `booked` dates are an
  **eleventh structured field that is not a list**: `BookedField`
  is a month to click, not a repeater, because one row per blocked date is the wrong shape for a
  June with eight of them, and it obeys the same seed-resolver rule as the repeaters below.
  Repertoire layout 3's set details are a **twelfth, `SetsField`** (JP-066, user call,
  2026-09-29, reversing Retro layout 3's "the mood is the card's title"): a set is one of the
  songs' tags, so it lists the sets `repChips()` derives from the resolved songs less their blank
  rows — the very list `sectionVm` groups the cards by — each with a Mood and a Length box, and
  adds and removes nothing. `c.sets` is `{ [case-folded tag]: { mood, length } }`, resolved by
  `repSetsOf()` (absent → `REP_SETS`, the frame's Mellow · 45 min / Easy listening · 60 min /
  High energy · 90 min on Weddings / Pubs / Birthdays in order), and each keystroke writes the
  whole resolved object, so the first edit keeps the other seeded lines. A card's meta is
  `repSetLine()`, the two joined on ` · ` with each dropped when empty, and the song count while
  both are (always on the `All` fallback card); an own key only, so a tag named "constructor"
  counts. Details for a tag no song carries stay stored and come back with the tag. A set's
  length is the artist's claim, not a sum: the frame's "45 MIN" heads four four-minute tracks.
  `c.songs` is an array of `{ title, artist, tags, length }`
  (tags a raw comma string; `length` free text, printed as typed by layout 3 alone, in the seat
  the artist held — no other repertoire frame draws a length, and a song with none leaves the
  seat empty, the artist not being drawn there; at 768 it stands under the title, JP-044's stack),
  maintained by `SongsField`. Every layout reads the songs, and `in` is per field, so no column
  carries a reach of its own: the Songs hint says that layout 3 shows the length in place of the
  artist and the other layouts the artist and not the length (JP-107, user call, 2026-10-06, the
  reviews' "no seat for the date" shape, not `GigsField`'s design-aware line); `media`'s `c.tracks` is an array of `{ title, sub, image, audio }`,
  maintained by `TracksField`, and it is the only field whose *rows* carry a photograph
  (`RowThumb`, the 46px cousin of `ImageField`) and a sound file. `audio` is an address, not an
  upload — an image is inlined as a data URI and a track is two orders of magnitude larger —
  and `sectionVm` normalises it through `extUrl()` onto `vm.tracks[].src`. `sectionVm` falls back to
  the seeded `TRACKS` (dressed in `TRACK_AUDIO`) when the key is absent. Per-row art and audio are never
  re-seeded by index once the array exists, or a row inserted third would steal track three's
  photograph. `map`'s `c.gigs` is an array of `{ venue, city, time, month, day, year, link }`,
  maintained by `GigsField` and the plainest of them: one key, one shape, no assets, and
  `link` normalised through `extUrl()` onto `vm.gigs[].url`. Its `city` is read twice —
  as a fact on every row, and, in layout 3, as the **control** `vm.gigChips` derives the
  filter row from, which is why `vm.gigs[]` also carries a case-folded `cityKey`. Its `year`
  is printed nowhere (JP-069, user call, 2026-09-29; `GIGS` seeds 2025, the year whose weekdays
  the frames print): `gigWeekday()` in `data.js` derives `vm.gigs[].weekday` for layout 3's disc
  through `Date.UTC` from the month's first three letters, case-folded, a four-digit year and a
  day the month has, and gives `''` otherwise, so the disc draws no third line and, at layout 3,
  `GigsField` says why under the row. `form`'s `c.fields` is an array of
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
  email row, since the seed carries one and a new row is `text`. The guard reaches `sectionVm`
  too (JP-051): that row is never dropped as blank, and an emptied label reads
  `FORM_EMAIL_LABEL` ("Email") on the box and in the mailto body alike, under the hint "Shown as
  Email.". The message box, which is no row, follows the same rule: its label is
  `FIELDS.form.messageLabel` (JP-082), and emptied it reads `FORM_MSG_LABEL` ("Message") on
  the box and over the message in the mailto. Nothing else is guarded: an
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
  delimited textarea, `FIELDS.form.promises` — the ticked list of the enquiry form's
  layouts 1 and 2. All ten follow
  `images`, not
  `image`: an absent key means the seeded `SONGS` / `TRACKS` / `GIGS` / `TIERS` (`TIERS_3` at pricing layout 3, `TIERS_1` at Lime's, Grunge's, Editorial's and Pop's layout 1 — `tiersSeed()`) / `FORM_FIELDS` (`FORM_FIELDS_CARD` at form layouts 2 and 3, `FORM_FIELDS_4` at 4) / `QUOTES` / `FOOTER_LINKS` / `slotSeed()` / `MAP_STATS_4` / `FORM_STEPS`, an emptied array
  means none, and there is no
  `null` sentinel. **A blank row is not a row** (JP-048): `blankRow(row, keys)` in `data.js`
  is true when every one of a row's keys trims to empty, and `sectionVm` drops such a package
  (over `TIER_KEYS`, all five) before the hue walk and `n`, so on both surfaces the page is the
  page without it — the canvas included, JP-045's rule. `TiersField` keeps the row, the artist
  being mid-edit, and says "Empty packages aren't shown." under it. The test is every key and
  never the ones a layout prints, so it cannot discard a word the artist typed. **All ten
  repeaters take it** (JP-051 and its sweep, `SlotsField` since JP-052, `StatsField` since JP-077 and `StepsField` since JP-079), each over a `*_KEYS` beside its seed — `SONG_KEYS`,
  `TRACK_KEYS` (art and sound included), `GIG_KEYS`, `TIER_KEYS`, `QUOTE_KEYS`, `SLOT_KEYS`, `STAT_KEYS`, `STEP_KEYS`, and two that
  leave a select out because a select always holds a value: `FORM_FIELD_KEYS` (label and
  placeholder, not `kind`) and `LINK_KEYS` (label and url, not `to`) — and `TIER_KEYS` leaves
  out a tick the same way, `featured` (JP-048), so a ticked empty package is still blank. Each list is filtered
  *before* anything indexes it (pins, hues, fan seats, marks, the stat wall's seats, the steps' numerals, the footer's halving,
  `formRows` / `formMailto` / `formCheck`), each repeater prints its own "Empty … aren't shown."
  under a blank row, and the repertoire's song-count heading counts the filtered list in both
  places. The one exception is the form's guarded email row, above. The chips are derived from the tags, so nothing sets them directly, and the
  heading falls back to the song count in `sectionVm` **and** in `EditPanel` — change one, change
  both. Layouts 3 and 4 are the exceptions: there the frames' "Curated sets" (JP-070, user call,
  2026-09-28) and "Repertoire" (JP-081, user call, 2026-09-29) win over the count. They come from
  **`HEADING_3`** and **`HEADING_4`**, the two layouts' tables of heads. `HEADING_3` also carries
  the gallery's "Gallery", pricing's "Pricing", the map's "Where I'm playing.", the testimonials'
  "Experiences." and the calendar's "Book Me" (`CAL_HEADING_3`); `HEADING_4` the calendar's, the
  gallery's, the map's, the testimonials' and the form's (`REP_HEADING_4` beside them). Both
  resolvers read both: `sectionVm` assigns them *after* the count, and `EditPanel`'s first-match
  chain puts both arms *ahead* of the count. An emptied heading stays empty at every
  layout; the count does not come back. Each seed resolver in `EditPanel` (`songsVal`, `setsVal` through `repSetsOf()`, `tracksVal`, `gigsVal`, `tiersVal`, `formFieldsVal`, `quotesVal`, `linksVal`, `slotsVal`, `statsVal`, `stepsVal`) has to
  resolve exactly what `sectionVm` resolves, or the canvas lists rows the repeater has never heard
  of — which is why `GIGS`, `TIERS`, `FORM_FIELDS`, `QUOTES`, `FOOTER_LINKS`, `MAP_STATS_4` and `FORM_STEPS` are written in the row shape their repeater edits, tags and
  features as the strings the artist types, and only `TRACKS` needs dressing.
