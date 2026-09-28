# Grunge layout 3 QA fixes — bug-by-bug plan

Working checklist for the tester's batch against the **Grunge template, layout 3** (card 3 of the
setup modal, *Inset Hero*): JP-061 … JP-075. It works like
[`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md): **one entry per session, with context cleared
between sessions**, and each session writes what it settled back into this file.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then *How each
session runs* and *Verification harness* in `../retro/qa-fixes.md` (the `&cj=` / `&who=` harness),
then the memory notes `verifying-the-published-tab` and `browser-tool-choice`.
[`layout-3.md`](./layout-3.md) holds the Figma node ids of every Grunge layout-3 frame (its
*Sections* table, with Lime's and Retro's twins beside them); Editorial's are in
[`../editorial/layout-3.md`](../editorial/layout-3.md). The shapes the entries copy:
- JP-059 in [`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md): a frame literal becomes a seeded,
  emptiable field;
- JP-043 and JP-046 in [`../lime/retest-qa-fixes.md`](../lime/retest-qa-fixes.md): the composed
  page's sticky column, and a frame claim re-seated as a field;
- JP-054 in [`../lime/layout-4-qa-fixes.md`](../lime/layout-4-qa-fixes.md) and its retest: a
  per-layout seed for heads and boxes;
- JP-058 in [`qa-fixes.md`](./qa-fixes.md): `priceParts()`.

Branch: **`grunge-layout-3-qa-fixes`, forked from `main`** (`109c293`, after PR #39). One commit
per entry (`Fix JP-061: …`); the replies entry commits the plan alone.

**Every report reproduces on HEAD.** At triage (2026-09-28) the Pages build's `last-modified` was
`Mon, 28 Sep 2026 11:47:52 GMT`, 8,750,312 bytes, which is byte-identical in size to `main`'s root
`index.html` (`7f281a7`, the Grunge layout-2 QA refresh). None is a stale-build echo.

**Only one of the fifteen is Grunge's alone.**
- **Grunge only: JP-067.** Lime's layout-3 footer stands on its Scheme 2 through `footerBand` and
  Editorial's through `SCHEMES_OF`; Grunge's layout-3 pass took neither.
- **The `s.limeTree` blocks (Lime, Grunge, Editorial): JP-061 and JP-062**, both in `HeaderV2`.
  Retro's polaroid reads the kicker with the plain seed, and clips a long name rather than
  spilling it.
- **Every template: JP-063, JP-064, JP-065, JP-069, JP-070, JP-074 and JP-075.** Each is either
  above the seam or in both halves (the `s.limeTree` block and Retro's and Pop's body). JP-074
  reaches pricing layouts 1–3, not layout 3 alone.
- **Chrome, every template and layout: JP-072 and JP-073.** Neither moves a digest.
- **By design, a reply each: JP-066, JP-068 and JP-071**, plus JP-069's weekday and JP-070's
  chips. Each is a call already made and named in an earlier plan.

## The report (translated)

> **JP-061 — Medium — Bio's *Current role* shows text that no field holds.** Grunge → *Inset
> Hero* → Use this header → Publish → Open → the Bio's CURRENT ROLE line. Expected: *Current
> role* takes the Kicker field's value (its hint: "Your role. The bio prints it too"). In the
> design these are separate texts: the header card says "Performing since 2021", the Bio "DJ &
> Selector". Actual: the Kicker field holds "Performing since 2021", but the Bio shows "DJ · LIVE
> ACT", which is in none of the 221 fields. It is left over from *Hero*, where Kicker is "DJ ·
> Live Act". Once Kicker is edited, both places print the same value: either the header card
> shows a role, or the Bio says "Current role: Performing since 2021". The design's state cannot
> be reached. The card's "Performing since 2021" does not follow the Bio's *Performing since*.
> Lime → *Inset Hero* behaves the same, so the renderer is shared.
>
> **JP-062 — Medium — The name in the *Inset Hero* card does not wrap and runs out of its
> frame.** Title = "Florence and the Machine" (24 characters) → Publish → Open. At 1440 the name
> is 230px wide in a 152px text area (`nowrap`) and runs past the frame on both sides. At 768 it
> touches both borders, at 390 the right one. "Kai Mercer" (98px) fits; "The Rolling Stones"
> (165px) already reaches the card's inner padding. A real band name, not an extreme.
>
> **JP-063 — Medium — Booking Calendar layout 3 shows one month and cannot move to the next.**
> On the published page on 28.09 only September shows, with no arrows, so a visitor can pick the
> 28th, 29th or 30th alone. The *Opens on* hint says "It reaches 12 months from there". Layout 1
> on the same build has ‹ ›. Caveat: the layout-3 design has no arrows either; if the BA means one
> month, this is a question, not a bug.
>
> **JP-064 — Medium — Past days are drawn in the *Booked* colour.** *Booked dates* says "0
> blocked", yet days 1–27 are the colour of the legend's *Booked* dot (rgb(56,56,56)), so the
> visitor sees nearly the whole month as taken. Layout 1 only dims past days.
>
> **JP-065 — Medium — The Testimonials stat card counts reviews instead of a rating.** Design:
> "4.9 /5", ★★★★★ and the authors' photographs. Build: "5 reviews", no stars, initials in discs.
> No field holds a rating; *Stars (layout 2)* says "Not shown in this layout". The JP-046 case.
>
> **JP-066 — Medium — Repertoire set cards lack mood, set length and track lengths.** Design:
> "Cocktail hour · MELLOW · 45 MIN", 3:54 beside each track. Build: "Weddings · 6 SONGS", the
> artist beside each track. No field for any of them. Perhaps a data-model question for the BA.
>
> **JP-067 — Low — The Footer is black where the design is dark grey.** Grunge → *Inset Hero* →
> Publish → Open → Footer. Expected: a dark-grey panel, the Gallery's tone (frame `964-68685`).
> Actual: `#000`, merging with the page. Desktop, 768 and 390.
>
> **JP-068 — Low — The Media Player's kicker reads TOP TRACKS where the design reads KM BIO.**
> The design also puts "KM BIO" over the Bio, so it may be a copy slip in the design; ask the
> designer.
>
> **JP-069 — Low — Events Map: the date disc has no weekday, and the hour stands apart.**
> Expected: the disc reads month, day and weekday ("JUL / 12 / SAT"); under the venue,
> "Manchester · 22:00". Actual: "JUL / 12" alone; the city alone under the venue, and the hour in
> its own pill on the right. Not included: Upcoming / Past, "Tickets →" and "↗" (JP-047, closed by
> decision).
>
> **JP-070 — Low — Default texts differ from the design** (frame `964-68685`). Repertoire "12
> SONGS" for "CURATED SETS"; Gallery "SEE US IN ACTION" for "GALLERY"; Pricing "CHOOSE THE SET
> THAT'S RIGHT FOR YOUR NIGHT" and "The quote covers the whole booking." for "PRICING" and "Four
> ways to book this act…"; its chips "All / Solo / Trio / Band" for "Duo / Trio / Band"; its
> button "BOOK NOW" for "BOOK"; Events Map "MANCHESTER" for "WHERE I'M PLAYING."; Enquiry Form
> head "LET'S MAKE YOUR NIGHT UNFORGETTABLE." for "BOOK KAI FOR YOUR EVENT", its boxes "NAME /
> EMAIL / EVENT DATE / GUESTS" for "EVENT DATE / EVENT TYPE / YOUR EMAIL"; Testimonials "WORD OF
> MOUTH" for "EXPERIENCES.". All editable, so only the starting look.
>
> **JP-071 — Low — Section labels cannot be edited.** With every one of the 221 fields set to a
> test value, these did not change: the Bio card's "PERFORMING SINCE:", "CURRENT ROLE:", "BASED
> IN:", "[ ABOUT ]" and "Genres"; the Events Map's "Gigs & travel"; the Testimonials' "●
> Testimonials"; the Media Player's "● POPULAR". They match the design; they are only not
> editable.
>
> **JP-072 — Low — On the editor's canvas the BOOK ME card does not stay beside the column.**
> Desktop, scroll the canvas to Top Tracks / Popular. Expected, as in the design and on the
> published page: the calendar card stays on the right until the Popular list ends. Actual: it
> scrolls away with the Bio, and the right is empty. The published page is right (JP-043 holds).
>
> **JP-073 — Low — A section re-added through *+ Add section* lands before the Footer.**
> Gallery ⋯ → Delete → *+ Add section* → Gallery → Add section. Expected: back in its place,
> after the Booking Calendar. Actual: between Testimonials and the Footer. The toast's Undo
> restores it in place; only *+ Add section* does this, and layout 2 did the same.
>
> **JP-074 — Low — A price range is set wholly at display size.** Pricing → package 1 → Price =
> "£450 — £1,400" → Publish → Open. Expected, as in the design: a big "450" with a small "—
> £1,400" beside it. Actual: all of "450 — £1,400" at display size. The price is the artist's
> content (the 16.09 decision); only the look is at issue. Related to JP-058.
>
> **JP-075 — Low — Mobile 390: the Repertoire carousel opens on the first set.** Editor → Mobile
> → Repertoire. Expected, as frame `984-13930`: the second set centred and red, the first
> peeking on the left. Actual: the first set (Weddings) centred and red, the last (Birthdays) on
> the left. Perhaps the frame was captured mid-scroll; ask the designer.

## Status

| Order | ID | Report (short) | Verdict | Size | Decision needed? | Status |
|---|---|---|---|---|---|---|
| 1 | JP-066 · JP-068 · JP-071 | Set cards lack mood and lengths · media kicker · labels no field reaches | **By design, all three**: sets *are* tags (Retro L3's call); the frame's "KM BIO" is the bio's head duplicated (Retro L3 named it); the labels are JP-059's census's "labels, not claims" | — (replies) | **yes** — reply, or the fix each lists | **done** (A, A, A; three replies, no fix) |
| 2 | JP-073 | A re-added section lands before the footer | **By spec** (SPEC §9.1, "immediately before the footer"); `st.removed` keeps no position | S | **yes** — A (the old seat), B (page order), C (reply) | **done** (A, keyed by the follower's category; real app, 7 runs) |
| 3 | JP-072 | The canvas's calendar column does not stick | **A named, accepted diff** (JP-043): the canvas card's `overflow: hidden` is the cell's scroll container | S | **yes** — A (`overflow: clip`), B (reply) | **done** (A; the canvas sticks 28px down, and so do the layout-4 rail and the form's layout-2 card) |
| 4 | JP-061 | *Current role* prints a kicker no field shows | **Confirmed, `s.limeTree`**: `KICKER_3` seeds the header's own kicker at layout 3, but the bio reads the raw key | S | **yes** — A (a card-line field), B, C | **done** (A, Retro kept; `cardLine` seeded `CARD_LINE_3`; after-diff zero) |
| 5 | JP-062 | The *Inset Hero* card's name spills | **Confirmed, `s.limeTree`**: the card's column is `nowrap`; Editorial's seeded name already runs into the padding | S–M | **yes** — A (wrap, fit the widest word), B, C | **done** (A, at the content box plus half the padding, re-asked mid-session; `overflowWrap` on the line; after-diff zero) |
| 6 | JP-074 | A price range is all display size | **Confirmed, shared**: `priceParts()` has two parts; every layout-3 frame draws three (`£ \| 450 \| — £1,400`) | S–M | no (a named oddity) | **done** (a `tail`; layout 3's narrow numeral fills from `auto`; JP-058's 768 overflow closed; after-diff zero) |
| 7 | JP-064 | Past days drawn as *Booked* | **Confirmed, shared, Retro too**: `blocked()` paints `dead` in the legend's *Booked* fill | S | **yes** — A (a dimmed free dot), B, C | open |
| 8 | JP-067 | The footer is black, not `#171716` | **Confirmed, Grunge only**: every layout-3 footer frame stands on Scheme 2; `footerBand` is Lime's alone | S | no | open |
| 9 | JP-075 | The 390 carousel opens on set 1 | **Confirmed, shared**: every 390 master centres the *second* set; ours centres `page` 0 | S | no | open |
| 10 | JP-069 | No weekday; the hour in its own pill | **Weekday by design** (JP-047: no year). **The hour is a fit choice**: it took the dropped status pill's seat; 390 already prints `city · time` | S | **yes** — A (`city · time` at every width), B (reply) | open |
| 11 | JP-063 | Calendar layout 3 shows one month | **Confirmed, the fit's reading**: month 0 only, no arrows; with F20 a late-month visit leaves 2–3 pickable days; `open`'s hint promises 12 months | S–M | **yes** — A (arrows, both surfaces), A′ (published only), B (reply and hint) | open |
| 12 | JP-065 | Stat card counts reviews, not a rating | **By design so far** (the fit's call), but its reasoning leans on two precedents since reversed | S | **yes** — A (a rating field), A+, B | open |
| 13 | JP-070 (heads) | Layout-3 heads and the pricing pill | **Named fit diffs**: all four templates' layout-3 frames agree, so a shared `HEADING_3` table; the chips are by design | M | **yes** — the heads, the pricing intro, the pill label | open |
| 14 | JP-070 (form) | The form's head and boxes | **Named fit diffs**: the head names the mock artist; the boxes are layout 2's card frame's too | S–M | **yes** — the head, the boxes | open |
| 15 | — | End-of-pass sweep | — | S | — | open |

**Why this order:**
- The replies first, so a reply the user turns into a fix can be appended before the digests
  start.
- Then the two chrome entries, which cannot move a digest.
- Then the entries whose seeded after-diff is zero (JP-061 before JP-062, whose column holds
  JP-061's new line).
- Then the named diffs, smallest first: 6, 10, 24, 30 and 30 files.
- JP-070 last, because it moves six sections at layout 3 on every template, and every earlier
  entry should digest against a clean base.

**"Decision needed"** means the entry lists options with a recommendation. The session starts by
asking the user (one `AskUserQuestion`, up to four questions) and records the answer under
**Decided** before writing code.

## How each session runs

As [`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md), with these differences:

1. Re-check the *Evidence* line numbers. They are from the triage (2026-09-28, `109c293`), and
   every entry that lands moves them.
2. **Themes per entry, always explicit.** `digest.mjs`'s default list is `0,2,3,4`, which
   **skips Lime**. Most entries here are shared, so they digest **0–4**; the Grunge-only and
   `s.limeTree` entries digest 0–4 as well, the others being the controls.
3. Verify at **all three widths** and on **both surfaces** (canvas and `live=1`). Digest against a
   **HEAD worktree** on :5174 (`node_modules` an APFS clone, `cp -Rc`, with its `.vite`
   removed). Normalise the port in `background-image` URLs, and `\.jpg\?[^|]*` in `src` if :5173
   has been running long enough to stamp photo URLs with `?t=`. **Prove the harness first** (the
   worktree against the tree before the edit diffs to 0), and **name the expected after-diff
   before writing code.**
4. **The digest's text column is short** (40 characters). A longer string, or a one-glyph change
   at the same width, needs a `textContent` read beside the digest.
5. **Harness parameters these entries lean on:** `&today=` (opt-in, for the calendar's `dead`
   days; a `live=1` digest without it never moves with the date), `&page=2` (the footer's seat on
   layout 3's page), `&name=` (the header's name), `&cj=` (contents) and `&who=` (the header's
   identity as the other sections read it).
6. **A new or re-scoped field gets a measured `in`**: add a row to `source/scripts/reach.mjs`'s
   `PROBES` (do not rebuild it) and write the `in` and the hint from what it prints. Under Lime,
   Grunge and Editorial (four header cards each) only arch 4 and 5 fold (onto 0 and 1), so a
   layout-3 header hit is arch 2 alone on every template.
7. **The real app is Grunge card 3** (*Inset Hero*), then Lime's and Editorial's card 3, then
   Retro's where the entry is shared. Drive anything live-only in the popup from the opener, per
   `verifying-the-published-tab`.
8. Update the docs the entry names. Commit, fill in **Settled** and the status row, then print
   the hand-off prompt for the next entry and stop.

**Do not refresh the root `index.html` per bug.** The sweep does it once.

---

## JP-066 · JP-068 · JP-071 — the three replies

One session, no code: one `AskUserQuestion` with three questions, then the reply lines written
here. A reply the user turns into a fix becomes its own entry, appended before the sweep with its
own Evidence, after-diff and Verify.

### JP-066 — set cards lack mood, set length and track lengths

**Verdict: by design, and a data-model question.** A song is `{ title, artist, tags }`, and a
set **is** a tag: the cards are derived, so no field can hold a set's mood or running time.
- `SONG_KEYS` `data.js:788`, the seed `:773`–`786`. `repSet` / `repSets` at
  `EncoreBuilder.jsx:1044`–`1076`; the meta line is `"${n} songs"` at `:1057`, whose comment
  (`:1053`–`1056`) says "a running time is a number the artist never typed".
- The row's right column is the artist: `EncoreSection.jsx:11656`–`11661` (shared body) and
  `:11914` (the `s.limeTree` block). Every template.
- The call is Retro layout 3's (`../retro/layout-3.md:674`–`683`, "Look for the derivation before
  reaching for the seeded constant"), named again in `../lime/layout-3.md:774`,
  `./layout-3.md:918`–`919` and `../editorial/layout-3.md:1335`.
- Frames: all four desktop masters (`964:68646` / `68678` / `68710` / `68743`) read "Curated sets
  | Cocktail hour | MELLOW · 45 MIN | Valerie | 3:54 …". Grunge's 390 master (`984:13951`) gives
  a length for all twelve seeded songs (Valerie 3:54, Superstition 4:26, Uptown Funk 4:30,
  Dancing Queen 3:51, Sex on Fire 3:23, Crazy in Love 3:56, Mr. Brightside 3:42, I Wanna Dance
  4:52, September 3:35, Don't Stop Me Now 3:29, Get Lucky 4:08, Rather Be 3:48).

**Decision.**
- **A (recommended). Reply: by design**, and name it for the BA as a data-model question.
- **B. A per-song `length` column** in `SongsField`, in `SONG_KEYS` (a blank-row consequence the
  entry must state), seeded from the frame's lengths. Layout 3's row prints it, and the card's
  meta composes "{n} songs · {Σ} min" when every song in the set has one. Mood stays the card's
  title. M–L: the repeater, the seeds, `reach.mjs` and a decision on which layouts read it;
  repertoire `arch 2` × themes 0–4 × 3 × 2 = 30 files at least.
- **C. A per-tag "set details" editor.** Not recommended: a ninth structured editor for three
  strings.

### JP-068 — the media kicker reads TOP TRACKS, the frame KM BIO

**Verdict: by design; the frame's copy is a slip.** The eyebrow is a field, `FIELDS.media.kicker`
(`data.js:1357`, `d: 'Top tracks'`, `in: [0, 2]`), as `vm.mediaKicker`
(`EncoreBuilder.jsx:751`), printed at `EncoreSection.jsx:7232` (the `s.limeTree` block) and
`:7103` (Retro's body). Every layout-3 media head (`964:68698`, `964:68666`, `964:68731`) reads
"KM BIO" over "Five worth your ear", the same string as the bio's own head (`964:68690` /
`964:68658` / `964:68722`). Retro's fit named it at `EncoreSection.jsx:6986`–`6988`: "the frame's
'KM BIO' is the bio Section's head duplicated, hidden `the` / `room.` nodes and all."

**Decision.** **A (recommended): reply**, pointing at Media Player → *Kicker*, and a line in the
sweep's designer note. **B**: seed the media kicker "KM BIO". Not recommended: it is the bio's
eyebrow on another section.

### JP-071 — section labels no field reaches

**Verdict: by design.** These are frame labels (vocabulary), not claims. The rule is Retro layout
2's ("A frame **label** … stays a literal, the media player's '● Popular' precedent",
`../retro/layout-2.md:348`–`350`, again at `../retro/layout-3.md:654`), and JP-059's census listed
exactly these as "Labels, not claims (not this ticket)" (`./layout-2-qa-fixes.md:407`–`411`).

| Label | `s.limeTree` block | Retro / Pop body | Also printed at |
|---|---|---|---|
| Bio `Performing since:` / `Current role:` / `Based in:` | `:4568`–`4570` | `:4794`–`4796` | bio layout 4 |
| Bio `[ About ]` | `:4635` | `:4881` | bio layout 4 |
| Bio `Genres` | `:4743` | — | bio layout 4, `:5332` |
| Media `● Popular` | `:7296`, `:7424` | — | layout 2 `:6577`, `:6893`, beside `● Featured` |
| Map `Gigs & travel` | `:18688` | `:19056` | — |
| Testimonials `● Testimonials` | `:21671` | `:21723` | — |

**Decision.**
- **A (recommended). Reply: by design**, the product's rule for labels.
- **B. A field for each**: eight keys (five bio, media, map, testimonials), several reaching bio
  layout 4 and the Retro / Pop bodies too. The same rule then reaches siblings nobody reported:
  the bio's `Bio` eyebrow, the calendar legend's three labels (`:15809`), media layout 2's
  `● Featured`, testimonials layout 2's `✎ What clients say`. That is a whole-product label sweep
  and its own plan, not this ticket.
- JP-070's pricing pill ("Book Now" for "Book") is a **button**, not a label, and is decided
  there.

**Decided: A, A, A** (user, 2026-09-28). All three are replies, and none becomes a fix, so no entry
is appended.
1. **JP-066: by design**, and named for the BA as a data-model question. A per-song length (B) is
   offered as separate work, not taken here.
2. **JP-068: the frame's copy is a slip.** The reply points at Media Player → *Kicker*; the seed
   stays "Top tracks".
3. **JP-071: by design**, the product's rule for labels. A field per label (B) is a whole-product
   label sweep and its own plan.

Asked over the evidence, re-checked on HEAD (`485526b`; no source has changed since `109c293`):
`FIELDS.media.kicker` at `data.js:1357` (`d: 'Top tracks'`, `in: [0, 2]`), `SONG_KEYS` at `:788`,
the set card's meta at `EncoreBuilder.jsx:1057` (the Evidence line above corrected from `:1052`),
Retro's "KM BIO" comment at `EncoreSection.jsx:6986`–`6988`, and every label site in the table at
the line it names. The rule reads as quoted at `../retro/layout-2.md:348`–`350`. The three bio
stats are each drawn only when their value is non-empty (`:4568`–`4570` and `:4794`–`4796`), and
`Genres` only while `vm.showTags` is `'show'` (`:4741`: the header's *Tag chips* on Show, over a
non-empty *Tags*), so each label goes with its value.

**Settled** (2026-09-28, no code).
- **No entry appended**: every answer is a reply.
- **JP-068's designer line is already in the sweep** (step 5, "the media head's 'KM BIO'"), so the
  sweep adds nothing for it.
- **JP-066's BA question** travels in the reply below. JP-069's weekday reply names the other
  data-model gap (no year on a gig), so the two can go to the BA together.
- **The reply lines**, in the sweep's shape so step 6 can lift them as they stand:
  - **JP-066 — by design; a data-model question for the BA.** A set card is not stored anywhere.
    Each card is one of the tags on the Repertoire's songs, so its title is the tag ("Weddings")
    and its line under the title counts the songs that carry it ("6 songs"). A song has a title,
    an artist and tags, nothing more, so there is nowhere to keep a set's mood, its running time
    or a track's length, and each row shows the song's artist where the design shows a length.
    Printing the design's "MELLOW · 45 MIN" or "3:54" would put numbers on the page that the
    artist never typed. This holds on every template. For a card like the design's, tag songs
    `Cocktail hour`. Lengths would need a change to the song editor (a length per song, the
    set's total added up from them), which we can offer separately.
  - **JP-068 — by design; the design's text is a slip.** The Media Player's small heading is the
    **Kicker** field (Media Player → Kicker), which starts as "Top tracks". The design's "KM BIO"
    there is the Bio's own heading copied onto the Media Player (and "KM" is the mock artist's
    initials, so it would be wrong for any real name). We keep "Top tracks" and have passed the
    slip to the designer. To match the design anyway, type `KM BIO` into Kicker.
  - **JP-071 — by design.** These are the design's labels, not the artist's content: the Bio's
    *Performing since:*, *Current role:*, *Based in:*, *[ About ]* and *Genres*, the Events Map's
    *Gigs & travel*, the Testimonials' *● Testimonials* and the Media Player's *● Popular* name
    what stands beside them, so they stay as the design draws them. What they label is editable,
    and each label goes with its value: *Performing since:* shows only while the Bio's
    *Performing since* is filled, *Current role:* only while the Header's *Kicker* is (see
    JP-061), *Based in:* only while the Header's *Location* is, and *Genres* only while the
    Header's *Tag chips* is set to Show and its *Tags* are not empty. Making labels editable would be a product-wide change, since other
    labels (the calendar's legend, for one) work the same way; we can plan it as its own piece of
    work.

---

## JP-073 — a re-added section lands before the footer

**Verdict: by spec, and a real gap.** SPEC §9.1 says an added section is "inserted immediately
before the footer" (`git show 8fa8ff4:SPEC.md`, lines 933, 1351 and 1755). `st.removed` was later
taught to keep a deleted section's content so that re-adding restores it, but not its **seat**, so
a re-add restores the content and loses the place. Undo does not have the gap, because its closure
holds the index. Every template, every layout.

**Evidence.**
- `EncoreBuilder.jsx`: `del` at `:4604`–`4626` stores `removed[cat] = { arch, c }` (`:4610`), no
  index; Undo reinserts at `min(i, len - 1)` from its closure (`:4618`–`4623`).
- `addSection` at `:4630`–`4640`, splicing at `next.length - 1` (`:4637`, "immediately before
  the footer"); `c: kept && !fresh ? kept.c : {}` at `:4635`. The composer's *Start fresh* at
  `:3866`–`3875` decides only the content.
- `pageOrder(i)` at `data.js:1147`, over `PAGE_ORDERS` at `:1139`–`1145`.

**Decision.**
- **A (recommended). The removed entry keeps its seat**: `{ arch, c, at }`, and `addSection`
  reinserts at `min(at, len - 1)` whenever an entry exists, *Start fresh* or not (*Start fresh*
  discards the content, not the place). A category never removed keeps the spec's "before the
  footer". A more robust variant stores the id of the section that followed it: reinsert before
  that section if it is still on the page, else at the clamped index. That survives a reorder
  between the delete and the re-add; recommend it if it stays a few lines.
- **B. Insert by `pageOrder(header design)`**, after the nearest preceding category on the page.
  It moves brand-new adds too and ignores the artist's own reorders.
- **C. Reply: by spec.**

**Fix (A).** `del` records the seat beside `arch` and `c`; `addSection` reads it. `st.removed`'s
other consumers (Undo, *Start fresh*, picking a template) are unchanged.

**Expected after-diff: zero.** Chrome only; the section harness never renders the list.

**Verify.** The real app on Grunge card 3: delete Gallery, add it back, with and without *Start
fresh*: it returns after the Booking Calendar. Then: delete Gallery, move Pricing above the
calendar, add Gallery back (the variant's case). Delete the section just before the footer and
re-add it (the clamp). Add a category that was never on the page (before the footer). Undo still
restores in place.

**Docs.** CLAUDE.md's `st.removed` bullet ("`{ [cat]: { arch, c } }`"). The comment at `:4637`.

**Decided: A, the follower variant** (user, 2026-09-28). The entry becomes
`{ arch, c, at, before }`: `before` is the **category** of the section that followed the deleted
one, `at` its index. `addSection` reinserts before `before` if that category is on the page, else
at `min(at, len - 1)`; a category with no entry keeps §9.1's "immediately before the footer".
*Start fresh* discards the content, not the seat. Undo keeps its closure index, unchanged.
- **Keyed by category, not id**, because categories are unique per page (`addSection` refuses a
  present one) and an id does not survive the follower's own re-add: `addSection` mints a new one
  (`++uidRef.current`), so an id-keyed seat would fall to the index in exactly the multi-delete
  case the variant exists for.
- **There is always a follower**, the footer being last and undeletable, so deleting the section
  just before the footer stores `before: 'footer'`: that run is the follower-is-footer case, not
  the clamp. The index fallback fires only when the follower has since been deleted too, so the
  Verify list gains that run.
- Asked over the evidence, re-checked on HEAD (`3a887c0`): `del` at `:4604`–`4626` (the entry at
  `:4610`, Undo's splice at `:4620`), `addSection` at `:4630`–`4641` (the splice and its comment at
  `:4637`), *Start fresh* at `:3863`–`3878`, `pageOrder` at `data.js:1147` over `:1139`–`1145`.
  `{ arch, c }` is also spelled in README.md (`:565`) and the state's own comment (`:4430`), so
  both take the seat too.

**Expected positions** (Grunge card 3 opens on `pageOrder(2)`: header, bio, media, repertoire,
calendar, gallery, pricing, map, form, testimonials, footer). Read off the sidebar's list, not the
canvas, whose desktop layout-3 row stands the calendar in a right column.
1. Delete Gallery (`before: 'pricing'`, `at: 5`), re-add, *Start fresh* off: back between the
   calendar and Pricing, with its content. The same with *Start fresh* on, content `{}`.
2. Delete Gallery, move Pricing above the calendar, re-add: **before Pricing**, so between the
   repertoire and Pricing. That is the variant's contract; the tester's "after the Booking
   Calendar" is the unmoved page's reading of the same seat.
3. Delete Testimonials (`before: 'footer'`), re-add: before the footer, where it was.
4. The fallback: delete Gallery (`before: 'pricing'`), then Pricing (`before: 'map'`). Re-add
   Gallery: Pricing is gone, so `min(5, len - 1)` = 5, before the map. Re-add Pricing: before the
   map, so after Gallery. The page is back as it was.
5. A category never on the page: before the footer. **Not reachable from the UI**: picking a
   template builds the whole `EXAMPLE_PAGE` and clears `removed`, and `del` always writes an
   entry, so every category missing from the page has one. Exercised by clearing `st.removed`
   through the builder's own state dispatcher.
6. Undo after a delete: back at its old index.
7. Grunge card 2 (`pageOrder(1)`: … repertoire, gallery, pricing, calendar …): delete Gallery,
   re-add: between the repertoire and Pricing.

**Settled** (2026-09-28).
- **The fix**: `del` (`EncoreBuilder.jsx:4611`) reads `before = st.sections[i + 1].cat` off the
  rendered page beside `i` and writes `{ arch, c, at: i, before }`; `addSection` (`:4643`) starts
  from `next.length - 1` and, when an entry exists, takes the index of `before` or else
  `min(at, len - 1)`. Six lines of code; Undo, *Start fresh*, the composer's `arch` and the
  template pick are untouched. No `EncoreSection` or `data.js` line moved, so the after-diff is
  zero by construction, and no digest was run.
- **Verified in the real app** with a one-off puppeteer script (trusted clicks through the row's
  ⋯ menu, the composer's Radix `Select`, *Start fresh* and the arrows; deleted after). Each run
  read the order twice, off the sidebar's rows and off the builder's `st.sections` through the
  fiber tree, and the two agreed every time. All seven expected positions above held:
  1. Gallery back between the calendar and Pricing, its typed heading restored; with *Start
     fresh* the same seat and `c: {}`. The entry read `{ arch: 2, c: { heading }, at: 5, before:
     'pricing' }`.
  2. After Pricing moved above the calendar: `… repertoire, gallery, pricing, calendar …`.
  3. Testimonials' entry read `at: 9, before: 'footer'`; back before the footer.
  4. Gallery then Pricing deleted: Gallery back at index 5, before the map (the fallback), then
     Pricing before the map, and the page is `pageOrder(2)` again.
  5. With `st.removed` cleared through the state's own dispatcher, Gallery lands between
     Testimonials and the footer: §9.1's line, and the control showing the script can see the
     old placement.
  6. Undo puts Gallery back at index 5.
  7. Grunge card 2: back between the repertoire and Pricing.

  No console errors on any page.
- **Docs**: CLAUDE.md's `st.removed` bullet, README's *Delete is one click* paragraph, the state's
  own comment (`:4430`), and the comments over `del` and `addSection`.

Reply: **JP-073 — fixed.** A section added back through *+ Add section* now returns to where it
was deleted from: before the section that followed it, or, if that one has been deleted as
well, at its old position. That holds with *Start fresh* ticked too, which now clears only the
content. So on *Inset Hero*, Gallery comes back after the Booking Calendar, and on *Feature
spread* after the Repertoire. If you reorder the page in between, Gallery comes back in front
of the section that followed it: move Pricing above the calendar and Gallery returns just above
Pricing. A section that was never on the page still goes in just before the Footer. Undo is
unchanged.

---

## JP-072 — the canvas's calendar column does not stick

**Verdict: a named, accepted diff (JP-043), and cheap to close.** The composed row's right cell is
sticky, but on the canvas the card round the page has `overflow: hidden`, which makes the card
(which never scrolls) the cell's scroll container. `arrangeRows`' own comment says "take that
overflow away and the canvas would stick too". CLAUDE.md records the canvas case as "a named,
accepted diff".

**Evidence.**
- `EncoreBuilder.jsx`: `arrangeRows` at `:4342`–`4354`, the sticky at `:4351`, the comment at
  `:4315`–`4318`.
- The ancestor chain on the canvas (`:5087`–`5100`), from the cell up:
  - the grid row div (no overflow, no transform);
  - **the card**, `borderRadius: '10px'`, `overflow: 'hidden'` (`:5096`–`5099`), the only
    blocker;
  - the canvas scroller, `overflowY: 'auto'`, padding 28 (`:5088`–`5092`).
- There is no `transform`, `zoom` or scale wrapper: the 0.82 is in `u()`'s sizes.

**Decision.**
- **A (recommended). `overflow: 'clip'` on the card.** `clip` makes no scroll container, so the
  cell sticks to the canvas scroller, and the one-row grid still releases it at the row's end.
  It still clips to the 10px radius. Chrome 90+, Firefox 81+, Safari 16+; an older Safari falls
  back to `visible` and only the corners show. This reopens JP-043's canvas clause.
- **B. Reply**: the canvas is a picture, and the published page sticks.

**Fix (A).** One property. Then check that the calendar's hover toolbar and selection ring ride
with the cell, and that no other `overflow: hidden` sits between the card and the cell.

**Expected after-diff: zero** by construction: `preview.jsx` renders sections without the card.

**Verify.** The real app at Desktop (a window over 1180), Grunge card 3, then Lime's and
Editorial's: scroll the canvas and read the cell's `getBoundingClientRect().top` against the
scroller's at ¼, ½ and ¾ of the row; the card's corners stay round; selecting the calendar and
the bio works mid-scroll. A window shorter than the cell pins it with its foot below the fold, as
published. Tablet and Mobile do not compose, so nothing changes there.

**Docs.** CLAUDE.md's composed-page paragraph ("On the canvas it is inert…"), the comment at
`:4315`, and a *reopened* pointer on JP-043's Settled in `../lime/retest-qa-fixes.md`.

**Decided: A, `overflow: 'clip'` on the canvas card** (user, 2026-09-28). This reopens JP-043's
canvas clause: the canvas sticks as the published page does.
- Asked over the evidence, re-checked on HEAD (`c6915ef`). `arrangeRows` at `:4342`–`4354`, the
  sticky cell at `:4351`, and its comment at `:4315`–`4318` are as triaged. The canvas chain moved
  +18 with JP-073: the scroller (`overflowY: 'auto'`, padding 28) is at `:5109`–`5113` and the card
  (`borderRadius: '10px'`, `overflow: 'hidden'`) at `:5114`–`5117`. Between the card and the cell
  there is only `arrangeRows`' grid row div (grid, `alignItems: start`, background, padding,
  columns, gap, a `background-color` transition), which sets no overflow, transform or zoom. The
  card's other keys are `maxWidth`, `boxShadow` and a `max-width` transition. The canvas's
  `arrangeRows` call (`:5118`) is the only one inside the card; `PublishedPage`'s (`:4295`) is not.
- The card is a flex item of the scroller, so it establishes its own formatting context whatever
  its `overflow` is. Losing `hidden`'s BFC therefore changes no margin collapsing.

**Expected cell positions** (the real app at 1440×900, Desktop; the canvas composes the calendar
beside the bio and media at card 3). Let `R` be the row's top and `H` its height, the cell's
height `h`, and the scroller's top `S`, all as client rects.
1. Before the row reaches the scroller's top (`R ≥ S`), the cell rides its row: `cell.top = R`.
2. With the row scrolled `f·(H − h)` past `S`, for f = ¼, ½ and ¾: **`cell.top = S`** (±0.5).
   Before the fix it is `R`, which is `S − f·(H − h)`: the control, taken first, shows that the
   script can see the failure.
3. At f ≥ 1 it is released: `cell.bottom = R + H`, so it overlaps nothing below.
4. That holds only while the scroller is taller than the cell (`S`'s height > `h`). Read both
   first. A shorter scroller pins the cell with its foot below the fold, as published, and that
   is not a failed stick.
5. The card's four corners stay round (computed `overflow: clip`, radius 10, and a picture of a
   corner). Selecting the bio and the calendar mid-scroll, with the row's hover toolbar and
   selection ring, rides with the cell.
6. Tablet and Mobile do not compose: no row grid, nothing sticky.

**Found after the decision: the cell is not the only sticky box the card was holding inert.**
Two section designs carry their own `position: sticky; top: 0`, and they stick on the canvas from
now on too. That follows from A, not from a new decision: gating them inert would recreate the
canvas/published split the user chose to remove.
- Repertoire layout 4's A–Z rail at desktop: `EncoreSection.jsx:12282` (`s.limeTree`) and `:12404`
  (Retro, Pop), the desktop frame's own sticky. Its comment at `:12401` ("Nothing moves on the
  canvas either way") was stale and is rewritten.
- The form's layout-2 card at desktop **and 768**: `:23294` (`s.limeTree`) and `:23676` (Retro,
  Pop), made real by its column's `alignSelf: stretch`. So point 6 above is wrong for the form
  card at Tablet: Tablet composes nothing, but that card now sticks on the Tablet canvas.

**Settled** (2026-09-28).
- **The fix**: the canvas card (`EncoreBuilder.jsx:5123`) is `overflow: 'clip'`, with a comment
  over it naming the four sticky boxes it lets through. The `arrangeRows` comment (`:4310`–`4322`)
  now says the cell sticks on both surfaces. One property changed; every other line in the two
  source files is a comment (`EncoreSection.jsx:12401`–`12402` included), so the harness's
  after-diff is zero by construction. `preview.jsx` renders sections without the card, so no
  digest was run.
- **The control** (Grunge card 3, unchanged tree, 1440×900, one-off puppeteer, deleted): the cell
  computes `sticky` and never leaves its row. `cell.top − R` is 0 at every step, so at f = ½ it is
  665px above the scroller. The scroller is 844 tall and the cell 650, so a stick was possible.
- **After**, Grunge, Lime and Editorial card 3. Canvas composed at Desktop (`st.device` desktop, the
  Desktop tab active, the calendar alone in the cell, bio and media in the left column); the card
  computes `overflow: clip`, radius 10px; the row has no overflow, transform or zoom.
  | | Grunge | Lime | Editorial |
  |---|---|---|---|
  | scroller / cell / row | 844 / 650.4 / 1979.7 | 844 / 651.8 / 1997.6 | 844 / 633.9 / 2100.4 |
  | before the row (`R = S + 120`) | `cell = R` | `cell = R` | `cell = R` |
  | f = 0, ¼, ½, ¾: `cell.top − S` | 28, 28, 28, 28 | 28, 28, 28, 28 | 28, 28, 28, 28 |
  | f = 1, 1.1: `cell.bottom − row.bottom` | 0, 0 | 0, 0 | 0, 0 |
- **One miss against the expectation**, recorded here rather than by rewriting point 2: the cell
  pins at **`S + 28`**, not at `S`. 28 is the scroller's `padding-top`. Chrome stops a sticky box
  at its scroll container's padding edge, so on the canvas the cell sits where the card's top rests
  at scroll 0, level with the canvas's own margin. The published tab's scroller is the window,
  with no padding, and pins at 0, as JP-043 measured. Because of those 28px it also starts
  releasing 28px before f = 1: `cell.top − S` reads 0.3 / −0.2 / −0.5 there, and the bottom is
  flush with the row.
- **Selection mid-scroll**, at f = ¼ on all three templates. `elementFromPoint` at the cell hits the
  calendar. Hovering it draws the ring and the four-button toolbar (Edit, up, down, delete) exactly
  over the cell, at `S + 28`; clicking selects it (`st.selectedId` → the calendar, and the panel
  opens on *Booking Calendar layout 3*). Scrolled on to ¾, the ring is still at `S + 28`. The bio,
  hovered and clicked beside it, is selected too, with its ring on its own box. No console errors.
- **Corners**: 60px crops of the top-left and top-right corners at scroll 0 and the bottom-left at
  the end. All three are round on every template, and pixel-identical to the control's at the
  top. The bottom crop differs by 17 pixels, which is the seal spinning beside the corner, not the
  corner. Editorial's top crop shows the clip at work: the header's blue overlay label is cut to
  the 10px radius.
- **Tablet and Mobile** at card 3: `st.device` tablet / mobile, no sticky box on the page (the
  form is layout 3 there, whose sticky is dropped).
- **The two section stickies** (second one-off, deleted; Grunge and Retro card 3, `arch` set
  through the builder's state: repertoire 3, form 1). Each box's `top − S` over its parent's travel:
  | | Grunge | Retro |
  |---|---|---|
  | rail, desktop (travel) | 704 | 631 |
  | f = ¼, ½, ¾ | 28, 28, 28 | 28, 28, 28 |
  | form card, desktop (travel) | 211 | 207 |
  | f = ¼, ½, ¾ | 28, 28, 28 | 28, 28, 28 |
  | form card, 768 (travel) | 320 | 343 |
  | f = ¼, ½, ¾ | 28, 28, 28 | 28, 28, 28 |

  At f = 1.2 each box's bottom is flush with its parent's content bottom (0 on all six), so each
  is released. Nothing smears: the rail stands in its own column beside the list, and the card is
  opaque (`#1A1A1A`, Retro's mustard).
- **Seen, not touched**: the comment at `EncoreSection.jsx:12110` says the layout-4 rail's
  `sticky` is "declined", but `:12282` and `:12404` carry it (the later decision, `:12392`). It
  predates this entry and says nothing about the canvas.
- **Docs**: CLAUDE.md's composed-page paragraph (which now names all four sticky boxes and the
  28px), the `arrangeRows` comment, the card's own comment and the rail's, and a *reopened*
  pointer on JP-043's **Decided** and **Settled** in `../lime/retest-qa-fixes.md`. README says
  nothing about the composed row's stickiness.

Reply: **JP-072 — fixed.** On the editor's canvas at Desktop, the Booking Calendar beside the Bio
and Top Tracks now stays in view while that column scrolls, and moves on with the page once the
column ends, as it does on the published page. On the canvas it stops just under the top of the
grey canvas area, where the page's top edge rests, not at the very top. The same change means two
other elements that stick on the published page now stick on the canvas too: Repertoire layout 4's
A–Z letters at Desktop, and Enquiry Form layout 2's price card at Desktop and Tablet.

---

## JP-061 — *Current role* prints a kicker no field shows

**Verdict: confirmed.** At layout 3 one field does two jobs. The header's layout-3 card prints a
*since* line in the kicker's seat, so the fit seeded the kicker there with `KICKER_3`
("Performing since 2021"), but only for the header's own view-model. The bio reads the header's
**raw** key through `headerIdentity()`, finds it absent and prints `'DJ · Live Act'`, a value the
panel never shows. Typing into Kicker then puts the same words in both seats. **Lime, Grunge and
Editorial**: Retro's polaroid reads the kicker with the plain seed, so Retro's two seats agree.

**Evidence.**
- `EncoreBuilder.jsx:535`–`537`: `vm.kicker` seeds `KICKER_3` when `cat === 'header' && d === 2`
  under Lime / Grunge / Editorial. `EditPanel` mirrors it at `:3585`–`3586`, which is why the panel
  shows it.
- `data.js:1692`: `headerIdentity()` returns raw `c.kicker`. `:1052`–`1055`: `KICKER_3` and its
  comment. `:1251`–`1253`: `FIELDS.header.kicker`, `d: 'DJ · Live Act'`, `in: { Retro: [0, 2, 3,
  5], Lime / Grunge / Editorial: [0, 2, 3] }`, hint "Your role. The bio prints it too, and the
  enquiry form in layouts 1 and 2."
- `EncoreSection.jsx`: `HeaderV2`'s `s.limeTree` block at `:2535` reads `s.kicker` **only** in the
  card's second line (`:2789`–`2791`). The bio's `if (s.v2 && s.limeTree)` at `:4522` prints
  `stat('Current\nrole:', s.kicker)` at `:4569`, and the shared body at `:4795`. Retro's
  polaroid: `:3028`–`3031`. Nothing else at layout 3 reads the kicker (the form's credit reads it
  at layouts 1 and 2 only).
- Frames: all four layout-3 header cards read "Performing since 2021" (Grunge `964:68686`, Lime
  `964:68654`, Editorial `964:68718`, Retro `964:68622`); all four bios read "CURRENT ROLE: DJ &
  SELECTOR" (`964:68695` / `964:68663` / `964:68728` / `964:68631`). The bio frames print that
  cell twice where ours prints *Based in*, a frame slip for the designer's note.

**Decision.**
1. **The card's second line.**
   - **A (recommended). A header field for it**, JP-059 (a)'s shape. For example `k: 'cardLine'`
     (label to taste), seeded `KICKER_3`, emptiable, `in: { Lime: [2], Grunge: [2], Editorial:
     [2], '*': [] }` (the `'*'` row prints "Not shown in this template" under Retro, whose header
     is designed; the `cta` precedent), with a hint that says the bio's *Performing since* is a
     separate field. `KICKER_3` leaves **both** kicker fallbacks, so the kicker's `in` loses 2
     for those three templates and its hint stays true.
   - **Named, not a defect:** the Kicker field at layout 3 will then read "Not shown in this
     layout" while the bio prints it. That is layout 2's behaviour already (the layout-2 sweep saw
     it under Kicker on card 2), and `data.js:1243`'s comment says the note speaks for the header.
     The hint can say the bio prints it at every layout.
   - **B. Resolve `KICKER_3` into `identity` as well.** The bio would print "Current role:
     Performing since 2021", the contradiction the tester names. Not recommended.
   - **C. Compose the line from the bio's `since`**, across sections. JP-059 (b)'s costs: the
     seeded card becomes "since June 2021", a bio-to-header dependency, and a misleading "Not
     shown" under the bio's *Performing since*. Not recommended.
2. **Retro's polaroid**, which prints the kicker where its frame prints the same "Performing since
   2021".
   - **Keep it (recommended).** Retro's fit chose the kicker there on purpose, no report names
     Retro, and its seats agree.
   - **Move it to the new field too.** A seeded Retro diff: header `arch 2` × theme 0 × 3 widths
     × 2 surfaces = 6 files, "DJ · Live Act" → "Performing since 2021".

**Fix (A, keep Retro).** A constant is already there (`KICKER_3`; rename it if the key's name
asks). A `FIELDS.header` row after `kicker`, `vm.cardLine` by `cv()` uncased, and the block's
second line reads it and drops when empty. Both kicker fallbacks lose their `KICKER_3` arm.

**Expected after-diff (named before the code): zero.** The card still prints "Performing since
2021" and the bio "DJ · Live Act". What changes is the panel: at layout 3, Kicker shows "DJ · Live
Act" and the new field shows the card line.

**Verify.**
- **The seed.** Digest header `arch 2` and bio `arch 2` × themes 0–4 × 3 widths × both surfaces:
  0 files.
- **Reach.** A row for the new key (layout 3 under Lime, Grunge and Editorial; nothing under
  Retro or Pop), and re-measure `header.kicker`.
- **States** (`live=1`, three widths): the new field emptied (the card's column is the name
  alone), at 120 characters (JP-062 decides the wrap; record what it does here), and Kicker set
  to a marker (the bio moves, the card does not).
- **The tester's steps**, in the real app on Grunge card 3, then Lime's and Editorial's: the
  panel's Kicker reads "DJ · Live Act" and the bio agrees; Kicker = `DJ & Selector` changes the
  bio alone; the new field changes the card alone. Then Retro's card 3 once, unchanged.

**Docs.** CLAUDE.md's *role and town* paragraph (the header's layout-3 card line is its own
field, not the kicker). The `KICKER_3` comment, `FIELDS.header.kicker`'s `in`, the comments at
`EncoreBuilder.jsx:533` and the EditPanel chain. A pointer in `./layout-3.md`'s header Settled.

**Decided: A, and Retro keeps its kicker** (user, 2026-09-28).
- **The card's second line is its own header field.** `k: 'cardLine'`, labelled *Portrait card
  line*, placed after `kicker` in `FIELDS.header`. It is seeded with `CARD_LINE_3` ("Performing
  since 2021"): `KICKER_3` is renamed, since it no longer seeds the kicker. It is emptiable and
  uncased, and its `in` is `{ Lime: [2], Grunge: [2], Editorial: [2], '*': [] }`, pending
  `reach.mjs`. Its hint is JP-059's `faceBody` hint: the bio's *Performing since* is a separate
  field.
  - `vm.cardLine = cv('cardLine', CARD_LINE_3)` sits beside JP-059's four keys.
  - `HeaderV2`'s `s.limeTree` card reads `s.cardLine` where it read `s.kicker`, and drops the
    line when it is empty.
  - Both kicker fallbacks (`sectionVm` `:535`–`537`, `EditPanel` `:3585`–`3586`) lose their
    `KICKER_3` arm. The kicker is then `'DJ · Live Act'` at every layout of every template, so
    the panel and the bio agree.
  - The kicker's `in` loses 2 under Lime, Grunge and Editorial, again pending the re-measure.
    Its hint says the bio prints it at every layout, because at layout 3 the panel will say
    "Not shown in this layout" while the bio prints the kicker (layout 2's state already).
- **Retro's polaroid** (`EncoreSection.jsx:3028`–`3031`) stays on the kicker. Retro's two seats
  already agree.
- **The `'*'` row reaches Pop as well**: Pop's header prints "Not shown in this template" under
  this one field, which is true, since only the `s.limeTree` block reads it. The header's other
  rows leave Pop unmarked. This is `FIELDS.media.cta`'s precedent.
- **Re-checked on HEAD** (`4a2ad0b`). Every line holds as triaged:
  - `EncoreBuilder.jsx:535`–`537` and `:3585`–`3586`;
  - `data.js:1052`–`1055`, `:1251`–`1253` and `:1692`;
  - `EncoreSection.jsx:2535` (the second line at `:2789`–`2791`), `:4569`, `:4795`, and `:3028`–`3031`
    inside `HeaderV2` (which runs to `:3133`).

  The rename also reaches three places the triage did not list: `data.js:683` and `CLAUDE.md:191`
  (JP-059's "`KICKER_3`'s precedent"), and the block's own comment at `EncoreSection.jsx:2746`
  ("Its two lines are `brand` and `kicker`, Retro's reading of this slot"). Older plans keep the
  name as history.

**Expected after-diff (named before the code): zero.** Header `arch 2` and bio `arch 2` × themes
0–4 × 3 widths × canvas and `live=1`: 0 files. The card prints the field's seed, the same
"Performing since 2021". The bio prints "DJ · Live Act" as before: with no identity it falls back
to the kicker's seed, which was never `KICKER_3` outside the header. The change shows only in the
panel. At layout 3, under Lime, Grunge and Editorial, Kicker reads "DJ · Live Act" and the new
field reads "Performing since 2021".

**Expected reach.** `header.cardLine` hits layout 3 under themes 1, 2 and 3, and nothing under 0
or 4. `header.kicker` loses layout 3 under themes 1, 2 and 3; Retro keeps it.

**Settled** (2026-09-28).
- **The fix, for JP-062 to build on.**
  - **The field**: key **`cardLine`**, labelled *Portrait card line*. It is `data.js:1269`,
    right after `kicker`, with `in: { Lime: [2], Grunge: [2], Editorial: [2], '*': [] }`.
  - **The seed**: **`CARD_LINE_3`** at `data.js:1059` (`KICKER_3`, renamed).
  - **The vm key**: **`vm.cardLine`** at `EncoreBuilder.jsx:555`, `cv()` and uncased.
  - **The seat**: `HeaderV2`'s `s.limeTree` card reads `s.cardLine` at
    **`EncoreSection.jsx:2791`–`2793`**, the text column's second child. It is dropped when empty.
  - **Untouched**: the column (`:2782`–`2784`) is still `whiteSpace: 'nowrap'`, which is
    JP-062's. The name span is `:2785`–`2790`. Everything in the file after `:2746` moved +2,
    where the block's comment grew.
  - Both kicker fallbacks lost their layout-3 arm. `vm.kicker` (`:537`) is the header's own
    `c.kicker` or `'DJ · Live Act'`, and `EditPanel`'s chain has no kicker arm. The kicker's
    `in` is `[0, 3]` under Lime, Grunge and Editorial (`data.js:1259`), and its hint reads "Every
    bio layout prints it too, and so do the enquiry form’s layouts 1 and 2."
  - Retro's polaroid (`:3030`–`3033`) still reads `s.kicker`.
- **The harness proof, before the edit.** A HEAD worktree on :5174 against the tree on :5173
  (header, all six arches, and bio, all four) × themes 0–4 × three widths gave **0 of 150** files
  on the canvas and **0 of 150** with `live=1` (port and `?t=` normalised). The baseline shows the
  bug in the harness itself: under themes 1–3 the header at arch 2 prints "Performing since 2021"
  and the bio "DJ · Live Act". Pop's layout-3 header prints neither.
- **After the edit: 0 of 150 and 0 of 150**, as named. The server was serving the edit: the
  reach run below went through :5173 and found `cardLine`.
- **Reach.** The scratch copy of `reach.mjs` was filtered to three rows, over themes 0–4 (2,940
  renders, 6/6 on every hit), and deleted after. Every result is as expected:
  - `header.cardLine`: layout 3 under themes 1, 2 and 3; nothing under 0 or 4.
  - `header.kicker`: Retro layouts 1, 3, 4 and 6, unchanged (`[0, 2, 3, 5]`). Lime, Grunge and
    Editorial layouts 1, 4 and 5, where arch 4 folds onto 0, so `[0, 3]`. Pop reads it at no
    layout.
  - `who.kicker`: bio layouts 1–4 and form layouts 1–2 on every theme. That is the new hint's
    "every bio layout", measured.
- **States** (the harness, `live=1`, three widths, themes 1–3, with Retro as the control).
  - **Emptied**: the column is the name alone. At 1440 and 768 the card sheds the line and its gap:
    | | 1440 | 768 |
    |---|---|---|
    | Lime | 205.3 → 186.6 | 241 → 218.8 |
    | Grunge | 203.9 → 186.6 | 239.6 → 218.8 |
    | Editorial | 233.9 → 216.6 | 284.3 → 263.5 |

    At 390 the side-on card keeps its height (127, 136 under Editorial), which the portrait sets.
  - **120 characters**, recorded for JP-062, which decides the wrap: the `nowrap` column holds
    one line, and it spills out of the card. Each cell is the line's width, the column's width,
    and how far the line runs past the card's edge:
    | | 1440 | 768 | 390 |
    |---|---|---|---|
    | Lime | 637.4 in 114.8, 228.5 past each side | 753.3 in 140, 266.6 each side | 695.3; column 202; 473.3 past the right |
    | Grunge | 579.4 in 114.8, 199.5 each side | 695.3 in 140, 237.7 each side | the same as Lime |
    | Editorial | as Grunge | as Grunge | 695.3; column 193; 482.3 past the right |

    At 1440 and 768 the column centres the line, so it spills both ways. At 390 it is
    left-aligned beside the portrait.
  - **Kicker set to a marker** in the header's content: the card still prints the seed line, and
    the marker appears nowhere in the header. The bio with `&who=` set to the marker prints it,
    and no seed. Retro's polaroid does print the marker, and ignores `cardLine`, emptied or long.
- **The tester's steps in the real app.** A one-off puppeteer script (deleted) used trusted clicks
  through the setup modal's card 3, *Use this header*, *Publish* and *Open*, with the editor at
  1600 × 1000 and the published tab at 1440. The canvas and the published tab read the same at
  every step.
  - **Grunge, Lime and Editorial alike:**
    1. Kicker reads "DJ · Live Act", under "Not shown in this layout" and the new hint.
       *Portrait card line* reads "Performing since 2021" with its hint and no note. The header
       prints the seed line, and the bio's cell reads "Current role: DJ · Live Act".
    2. Kicker = `DJ & Selector`: the bio reads "Current role: DJ & Selector", and the card is
       unchanged.
    3. Card line = `ZZ card line`: the card moves, and the bio is unchanged. The published tab shows
       the same at 1440, 768 and 390.
    4. Card line emptied: neither string is in the header, on either surface.
  - **Retro's card 3, the control**: Kicker has no note. *Portrait card line* reads "Not shown in
    this template". Kicker = `DJ & Selector` moves the polaroid and the bio together, and the card
    line moves nothing.
  - No page or console errors on any template.
  - Pop's "Not shown in this template" follows from the `'*'` row through `fieldNowhere()`; it
    was not driven in the app.
- **Docs**:
  - CLAUDE.md: the *role and town* paragraph, JP-059's "`KICKER_3`'s precedent" (now `cardLine`'s),
    and an exception to the FIELDS paragraph's "Pop's undesigned header family carries no note".
  - The comments over `CARD_LINE_3`, over the kicker's and `cardLine`'s rows and at `data.js:683`.
  - The comments at `EncoreBuilder.jsx:528`–`535` and over `vm.cardLine`. `EditPanel`'s chain
    comment, which also said "the two fields" over a chain of eight.
  - The card block's comment at `EncoreSection.jsx:2746`, and a `reach.mjs` row.
  - A *Reopened by JP-061* pointer in `./layout-3.md`'s header Settled.

Reply: **JP-061 — fixed.** The line under the name on the *Inset Hero* header card is now its own
field, *Portrait card line*, pre-filled with "Performing since 2021". Kicker starts as "DJ · Live
Act" on every layout, and that is what the Bio's *Current role* prints, so the panel and the Bio
agree. On *Inset Hero* the Kicker field now says "Not shown in this layout", because the header
card no longer prints it; the Bio still does.
- Editing Kicker changes the Bio only.
- Editing *Portrait card line* changes the card only; left empty, the card shows the name alone.
- The design's state can now be reached: set Kicker to "DJ & Selector".
- The card line stays separate from the Bio's *Performing since*; its hint says to change both if
  you name a year.

Lime and Editorial behave the same way. Retro's *Inset Hero* is unchanged: its card prints the
Kicker, as its Bio does.

---

## JP-062 — the *Inset Hero* card's name does not wrap

**Verdict: confirmed.** In `HeaderV2`'s `s.limeTree` block the card's text column is
`whiteSpace: 'nowrap'`, so a long name runs straight out of the card. **Lime, Grunge and
Editorial.** Retro's polaroid is `nowrap` too, but it sits in an `overflow: hidden` card and fits
24 characters (148 of ~168px): a longer name is clipped rather than spilled. Name it; do not fix
it without a report.

**Evidence.**
- `EncoreSection.jsx:2781`–`2783`: the column, `whiteSpace: 'nowrap'`. `:2784`–`2788`: the name
  span, the display face at 36 / 28 / 26 (32 / 25 / 23 under Editorial) through `faced`. The
  desktop card is `u(220)` wide with `u(40)` padding, so its content box is 114.4px on the canvas.
- Retro's polaroid: `:3022`–`3025` (`T.list`, 13px).
- Measured at triage (`&name=`, canvas px, name width / column width):

  | | 1440 | 768 | 390 |
  |---|---|---|---|
  | Grunge, Kai Mercer | 97.8 / 114.4 | 92.7 / 140 | 86.1 / 127.2 |
  | Grunge, The Rolling Stones | 165.1 / 114.4 | 156.6 / 140 | 145.4 / 145.4 |
  | Grunge, Florence and the Machine | 229.9 / 114.4 | 218 / 140 | 202.5 / 202 |
  | Lime, Florence and the Machine | 254.1 / 114.4 | 241 / 140 | 223.8 / 202 |
  | Editorial, Kai Mercer (seeded) | 133 / 114.4 | fits | fits |

  The tester's 98 / 165 / 230 are Grunge's desktop column. **Editorial's seeded name already runs
  18.6px into the card's padding**, inside the card's edge.
- Precedents: `vm.titleWordEms` (`EncoreBuilder.jsx:1017`: fit the widest word, never break inside
  it), `vm.footerWordEms` (`:1681`), `navNameEms` (`:641`); the tables `bebasEms` / `antonEms` /
  `notoEms` / `notoBoldEms` (`data.js:447` / `466` / `486` / `494`); the display pattern
  `min(size, calc(100cqi / ems))` on an `inline-size` container.

**Decision.**
- **A (recommended). Wrap between words, and shrink only the widest word** to the column (the
  `titleWordEms` rule, keyed by face). The column's `nowrap` goes, so JP-061's card line wraps
  as well.
- **B. One line, shrunk to fit.** "Florence and the Machine" falls to ~11px at 1440. Not
  recommended.
- **C. Plain wrap.** A single long word still spills.
- **Editorial's seeded name** (a sub-question): under A, is the measure the content box (seeded
  "KAI / MERCER" breaks onto two lines at 1440, 2 files) or the card's inner width including
  the padding the frame's own name already uses (0 files)? Read the frame's name node against its
  card first (`964:68718`'s card) and recommend whichever the frame shows.

**Fix (A).** A `vm.cardNameEms` (or the existing key's arm) in `sectionVm` from the name's widest
word in the template's face; the span takes `min(size, calc(100cqi / ems))` in an `inline-size`
container, with the name's own box `minWidth: min-content`. The column drops `nowrap`.

**Expected after-diff (named before the code):** header `arch 2` under Lime and Grunge: 0 files. Under Editorial: 0 or 2 (desktop, both surfaces), by the sub-question. Retro and Pop: 0.

**Verify.**
- **The seed.** Digest header × themes 0–4 × 3 widths × both surfaces: exactly the named files.
- **States** (`&name=`, `live=1`, three widths, themes 1–3): Kai Mercer, The Rolling Stones,
  Florence and the Machine, a single 20-letter word, a 60-character name. The name stays inside
  the card's content box (`getBoundingClientRect` against the card's padding edge), and
  `scrollWidth` equals the width. With JP-061's line at 120 characters too.
- **The tester's steps**, in the real app on Grunge card 3: Title = "Florence and the Machine",
  Publish, Open, at 1440 / 768 / 390. Then Lime's and Editorial's card 3.

**Docs.** CLAUDE.md, beside `vm.titleWordEms` if the key is new. The block's comment.

**Decided: A, the card's inner width, and the line breaks inside an over-long word** (user,
2026-09-28).
- **Re-checked on HEAD** (`462611d`). Every line holds as the hand-off named it:
  - `EncoreSection.jsx`: the column is `:2782`–`2784` (`nowrap` at `:2783`), the name span
    `:2785`–`2790`, and the `s.cardLine` line `:2791`–`2793`. Retro's polaroid name span is
    `:3025`–`3028` (the triage's `:3022`–`3025` was one short).
  - `EncoreBuilder.jsx`: `vm.cardLine` is at `:555`, `navNameEms` at `:644`, `vm.titleWordEms` at
    `:1020` and `vm.footerWordEms` at `:1684`.
  - `data.js`: `bebasEms` `:447`, `antonEms` `:466`, `notoEms` `:486` and `notoBoldEms` `:494`.
- **The frame read** (`use_figma` on `964:68718`, `984:16812` and `984:16843`, with Lime's
  `964:68654` beside them):
  - **Editorial at 1440.** The card is 220 wide with 40 of padding, so its content box is 140. Its
    name column, `Frame 1`, is **157** wide: "Sienna vALE" at 32, with render bounds 156 wide. It is
    centred, and runs **8.5 into the padding on each side**, 31.5 clear of the card's edge. The
    card clips its content rather than wrapping it. So the frame's own picture is one line that
    uses the padding. A content-box measure would break the frame's own name.
  - **Editorial at 768 and 390.** The name is 123 in 140, and 113 in the 193 beside the portrait.
    Both fit.
  - **Lime at 1440.** The name is 131 in a 138 column inside the 140. It fits.
- **The plan had missed Lime's line.** On HEAD at 1440, Lime's seeded line "Performing since 2021"
  is already **116.6** in the **114.8** content box, 0.9 into the padding on each side. A
  content-box measure would therefore wrap it too.
- **The name (A).** It wraps between words at the measure below, and never inside a word. Its size
  is `min(frame size, calc(measure / ems))`, where the ems are the widest word of the name in the
  template's display face. That is `titleWordEms`' rule, in a new **`vm.cardNameEms`**:
  - `bebasEms` under Lime;
  - `antonEms(word, 0)` under Grunge (no tracking in its mode), taken inside the existing
    `faced()` size rather than faced twice;
  - `notoEms` under Editorial;
  - undefined on every other template.
  Only a word wider than the measure shrinks. The widest word comes off `vm.brand`, since Grunge's
  two-tone `brand()` is JSX.
- **The measure: the card's inner width**, the padding included. The card's ring is an inset
  shadow, so the inner width is the whole card.
  - Upright, at 1440 and 768, it is `100cqi + 2 × padding`: 180.4 on the desktop canvas and 220
    at 768.
  - At 390 the card is a row, so it is the space beside the portrait plus the right padding:
    `100cqi − portrait − 21 gap + 20`.
  - The container is the **card** (`containerType: 'inline-size'`). The card has an explicit width
    at every width (`u(220)` upright, `100%` at 390), so containment moves nothing. The column
    cannot be the container: it is content-sized at 390.
  - The column's `nowrap` goes, and its box does not change: no negative margin, so no digest row
    moves. Instead, each of the two spans takes `width: max-content` and `maxWidth: <measure>`.
  - The column sets `textAlign` to centre when upright and left at 390, so a wrapped name's lines
    centre under the portrait, as the column centres a single line.
  - **The named cost** is that a single word fitted to this measure lands a hair inside the 1px
    ring. The ems tables run "over, never under", so the word is a little short of the measure,
    not clear of the ring.
- **The line** (`cardLine`) wraps at the same measure and takes `overflowWrap: 'anywhere'`. Only a
  word longer than the measure breaks inside itself. There is no ems table for the body faces, and
  shrinking 13px body copy would make it unreadable.
- **Retro's polaroid** (`:3025`–`3028`) is unchanged. It still clips a long name, which is named
  here and not fixed.

**Expected after-diff (named before the code): zero.** Header, every arch × themes 0–4 × three
widths × canvas and `live=1`: **0 of 90 and 0 of 90**.
- The seeded name, 133 at the most (Editorial at 1440), and Lime's line at 116.6 both sit inside
  the 180.4 inner width, so neither wraps.
- An unbinding `min()` computes to today's font size, and `max-content` to today's width.
- Under the content-box measure, 4 files would have moved, all at 1440 on both surfaces: Editorial's
  "KAI / MERCER" and Lime's "Performing since / 2021".
- **The harness proof** (before the edit): the HEAD worktree on :5174 against the tree on :5173,
  header × themes `0,1,2,3,4` × three widths, gave **0 of 90** files on the canvas and **0 of 90**
  with `live=1` (port and `?t=` normalised).

**The verify criterion moves with the measure.** The name and the line must stay inside the card's
**inner edge**, not its content box, and the incursion into the padding is recorded. The pass test
is `card.scrollWidth === card.clientWidth` and the document's width unchanged. The column's own
`scrollWidth` may exceed its `clientWidth` when a line uses the padding: that is by design.

**Revised mid-session: half the padding stays clear** (user, 2026-09-28, asked again with the
real app's numbers).
- **Why it was asked again.** The full inner width was built and passed every check above. But in
  the real app the tester's own case did not change at 768: Grunge's "FLORENCE AND THE MACHINE" is
  218 wide, so it still fits the 220 measure on one line, **1px from the ring**. That is exactly
  the state reported ("at 768 it touches both borders"). Other ordinary names came within 0–8 of
  the ring too: Lime's "Florence…" at 1440 by 5.7, and the 60-character name by 2. The first
  question had named this cost only for a single fitted word.
- **The measure** is now the content box plus **half** the padding on each side:
  - upright, `100cqi + padding`: 147.6 on the 1440 canvas and 180 at 768;
  - at 390, `100cqi − portrait − 21 + 10`.
  Everything else above stands: the card as the container, the two spans' `max-content`, the
  widest-word fit, `overflowWrap` on the line, and Retro untouched.
- **Measured before asking** (a trial edit, themes 1–3, `live=1`). Every test name stays at least
  16.4 from the ring at 1440 (20 at 768) and 10.8 at 390. The tester's 768 case wraps onto two lines,
  38.5 clear. The cost is that a fitted 20-letter word shrinks further: Editorial's
  "SUPERCALIFRAGILISTIC" at 1440 goes from 18.6 to 15.2px.
- **Expected after-diff: still zero.** The widest seed is Editorial's name, 133 against 147.6, and
  Lime's line is 116.6. So 0 of 90 and 0 of 90.

**Settled** (2026-09-28).
- **The fix, for JP-074 onwards.** In `EncoreSection.jsx`, lines after `:2762` moved +17: the
  block's comment grew by 14 lines, `measure` and `nameSize` add two, and `containerType` one.
  The line span grew by 3, so everything after `:2813` moved +20.
  - **The vm key** is **`vm.cardNameEms`** at `EncoreBuilder.jsx:651`, beside `navNameEms`. It is
    the widest word of `vm.brand` in `navFace`: Bebas for Lime, Anton × 0.75 at tracking 0 for
    Grunge, and Noto for Editorial. It is undefined wherever `navFace` is null. `navFace` measures
    in nominal ems, so the fit sits inside `faced()`: `faced(s, min(size, calc(measure / ems)))`.
    That is the Decided `antonEms(word, 0)` without facing twice. `EncoreBuilder.jsx` after
    `:644` moved +7.
  - **The measure** is `measure` at `EncoreSection.jsx:2779`: `(100cqi + u(40))` upright, and
    `(100cqi − pw − 21px + 10px)` at 390. The card is the container (`:2783`).
  - **The column** (`:2799`–`2801`) lost `whiteSpace: 'nowrap'` and gained
    `textAlign: centre | left`.
  - **The name span** is `:2802`–`2807`, and the `s.cardLine` span `:2808`–`2813`. Each takes
    `width: 'max-content'` and `maxWidth: calc(measure)`. The line also takes
    `overflowWrap: 'anywhere'`.
  - **Retro's polaroid name span** is `:3045`–`3048`, untouched.
- **The harness proof** (before the edit): **0 of 90 and 0 of 90**, as recorded under Decided.
- **After the edit: 0 of 90 on the canvas and 0 of 90 with `live=1`**, for the full inner width
  and again for the revised half padding. That is header × every arch × themes `0,1,2,3,4` ×
  three widths, against the HEAD worktree. Two things show the server served the edit: the
  :5173 source carries `21px + 10px`, and every probe below wraps where HEAD spills.
- **States** (the harness, `live=1`, themes 1–3, three widths). The tables give the distance from
  the name's ink to the card's edge.
  - **The seeded name is unchanged at every cell.** Under Editorial it is 133 at 1440, 23.7 clear.
  - **Names**:

    | | 1440 (canvas) | 768 | 390 (right edge) |
    |---|---|---|---|
    | Lime, Rolling Stones / Florence / 20-letter / 60-char | 2 lines 34 / 2 lines 25 / 21.6px 16.4 / 6 lines 17.2 | 1 line 22.3 / 2 lines 29.9 / 26.4px 20 / 5 lines 22.4 | 59.1 / 2 lines 73.2 / 44.6 / 3 lines 26.9 |
    | Grunge | 2 lines 40.3 / 2 lines 31.9 / 18.1px 16.4 / 6 lines 25.5 | 1 line 31.7 / **2 lines 38.5** / 24.6 / 4 lines 26.3 | 76.6 / 1 line 19.5 / 63.4 / 3 lines 44.7 |
    | Editorial | 2 lines 17.1 / 3 lines 33.2 / 15.2px 16.7 / 20.7px 6 lines 16.9 | 2 lines 40.3 / 2 lines 30.9 / 18.6px 20.3 / 6 lines 21.7 | 2 lines 84.8 / 2 lines 24.9 / 20.9px 10.8 / 6 lines 50.5 |

    A size is named only where the widest-word fit shrank the name. Every render passed:
    `card.scrollWidth === clientWidth`, and the document stayed at its width.
  - **With the 120-character line.** It wraps at the measure on every template: 6 lines at 1440
    under Lime and 4 under Grunge and Editorial; 6 / 4 / 4 at 768; 4 at 390. Its box is the
    measure itself, 147.6 / 180 / 203–212. All 45 renders pass the same two tests.
  - **With a 62-character line that has no break opportunity.** It breaks inside the word: 3
    lines upright and 2 at 390. All 9 renders pass.
- **The tester's steps in the real app.** A one-off puppeteer script (deleted) ran with the editor
  at 1600 × 1000. It clicked card 3, *Use this header*, set Title = "Florence and the Machine"
  with trusted keystrokes, then clicked *Publish* and *Open*. It measured the published tab at
  1440, 768 and 390 (lines, and ink-to-edge on the left / right):

  | | canvas | 1440 | 768 | 390 |
  |---|---|---|---|---|
  | Grunge | 2 lines, 31.9 / 31.9 | 2 lines, 38.9 / 39 | 2 lines, 38.5 / 38.5 | 1 line, 19.5 on the right |
  | Lime | 2 lines, 25 / 25 | 2 lines, 30.5 / 30.5 | 2 lines, 29.9 / 29.9 | 2 lines, 73.2 on the right |
  | Editorial | 3 lines, 33.2 / 33.2 | 3 lines, 40.5 / 40.5 | 2 lines, 30.9 / 30.9 | 2 lines, 24.9 on the right |

  The same script on the HEAD worktree reproduces the report: Grunge is 280.4 in a 220 card at
  1440, and 218 at 768, 1 from each edge; Lime and Editorial spill at every width. The published
  tab's title is "Florence and the Machine", and neither tab logged a page or console error.
  Screenshots of the three cards at every width were read and look as the numbers say.
- **Retro's card 3, the control.** Every probe is identical on the tree and on HEAD. The polaroid
  name is 13.12px and clips nothing at 24 characters (181.1 wide at 1440 in its 242.4 clip).
  Its clip on a longer name stays named and not fixed.
- **Found in passing, not this entry's.** At 390 Retro's published document is **445 wide in a
  390 window**, identical on HEAD. The overflow is not the header: the repertoire's layout-3 390
  carousel runs its cards to x 625 ("Pubs · 5 songs", "Valerie", "Amy Winehouse"). Grunge's,
  Lime's and Editorial's pages hold 390. For JP-075's session, the 390 carousel, to look at.
- **Docs.**
  - CLAUDE.md: a *That card's name and line wrap* passage after JP-061's in the header-identity
    paragraph, and `vm.cardNameEms` beside `vm.titleWordEms` in the form's paragraph.
  - The card block's comment at `EncoreSection.jsx:2763`–`2776`, and the comment over
    `vm.cardNameEms`.

Reply: **JP-062 — fixed.** On the *Inset Hero* header card, the name now wraps between words
instead of running out of the card, and it stays clear of the card's border.
- "Florence and the Machine" sets on two lines at 1440 and 768 (three under Editorial at 1440),
  about 30–40px inside the border. At 390 it is one line under Grunge and two under Lime and Editorial.
- A single word too long for the card, such as a 20-letter name, is shrunk just enough to fit. A
  name is never broken inside a word.
- The *Portrait card line* under the name wraps the same way. A word too long for the card breaks
  inside itself.
- The seeded page looks exactly as before. The card allows a little of its padding, as the design
  does: Editorial's own name runs into it.

Lime and Editorial behave the same way. Retro's *Inset Hero* polaroid is unchanged: it fits 24
characters, and clips a longer name rather than spilling it.

---

## JP-074 — a price range is set wholly at display size

**Verdict: confirmed, and shared.** JP-058 gave `priceParts()` two parts: `lead` (everything
before the first digit) and `amount` (everything after it). A range therefore puts "450 — £1,400"
in the display seat. **Every layout-3 frame draws exactly this range as three nodes**: `£ | 450 |
— £1,400`, `£ | 650 | — £2,200`, `£ | 1,200 | — £4,500` (`964:68648` / `68680` / `68712` /
`68745`). Every template, pricing layouts 1–3; layout 4 prints the price whole.

**Evidence.**
- `data.js:1921`–`1925`: `priceParts()`, and its comment naming "Up to 120 guests: £900".
- `EncoreBuilder.jsx:911`: `vm.tiers[]` spreads it.
- Six sites, every display seat `nowrap`:

  | Layout | `s.limeTree` block | Shared body (Retro, Pop) |
  |---|---|---|
  | 1 | `:8422`–`8431` | `:8610`–`8620` |
  | 2 | `:8838`–`8839` (numeral `:8922`) | `:9107`–`9108` |
  | 3 | `:9520`–`9538` | `:9760`–`9774` |

  Our third seat is `s.tierUnit` (`/event`), `EncoreSection.jsx:9310`–`9316`.
- Already named in JP-058's Settled (`./qa-fixes.md:593`–`600`): a range overflows layout 1's 768
  card under Lime, Grunge and Editorial by 22 / 3 / 30px (27 / 7 / 35 with `/event`), while Retro
  and Pop wrap the numeral onto two lines there.

**Fix (no decision: the frame draws it).** A third part, `tail`:
- `amount` becomes the first numeric run (`/\d[\d,.]*/`, a trailing `.` or `,` trimmed);
- `tail` is the rest, trimmed, set small in the lead's style between the amount and the unit, and
  rendered only when non-empty;
- the six sites read it. This also closes the named 768 overflow.

Named oddities, left: `Up to 120 guests: £900` → `Up to` + `120` + `guests: £900`; `£1.2k` → a
small `k`. `FIELDS.pricing.tiers`' hint (`data.js:1391`) says a range sets its second half small.

**Expected after-diff (named before the code): zero.** No seeded price has a tail.

**Verify.**
- **The seed.** Digest pricing × themes 0–4 × 3 widths × both surfaces: 0 files.
- **States** (`&cj=` over `tiers`, `live=1`, pricing `arch 0`–`2` × themes 0–4 × three widths):
  `£450 — £1,400`, `£1,200–£2,000`, `From £1,200` (JP-058's split, unchanged), `£450 + VAT`,
  `POA`, `450`. Read the three spans' text off the DOM, and `scrollWidth` equals the width. JP-058's
  768 overflow is gone or re-measured and named.
- **The tester's steps**, in the real app on Grunge card 3: package 1's price = `£450 — £1,400`,
  Publish, Open, at 1440 / 768 / 390. Then Retro's card 1 once (layout 1, the shared body).

**Docs.** The `priceParts()` comment, CLAUDE.md if it names the split (grep), and a pointer in
JP-058's Settled.

**Three calls inside the fix** (no user decision; each is named here and in the reply):
- **A separator ending the run goes to the tail.** The amount is trimmed of it, and the tail
  starts after the trimmed amount, so `£450.` prints a small `.`. Nothing the artist typed is
  dropped.
- **At 768 and 390 the tail stands at the right with the unit, not against the numeral.** Every
  narrow master fills the numeral, which pushes whatever follows it to the column's edge. That
  is where the frames stand their own third node, "— £1,400". At 1440 the row hugs, so the tail
  sits beside the numeral, as the tester expected.
- **The tail may wrap at all six seats.** It takes each lead's face, size and colour, but not
  its `nowrap` or `flex: none`. A price is free text, so a long tail breaks between words
  instead of passing the card.

**Settled** (2026-09-28).
- **Re-checked on HEAD** (`c937508`). Every line holds as the hand-off named it:
  - `data.js`: `priceParts()` at `:1940`–`1944`, its comment at `:1932`–`1939`; `TIERS` at
    `:700`–`713` (£450 / £650 / £1,200); the tiers hint at `:1405`–`1411`;
  - `EncoreBuilder.jsx`: the spread at `:921`, `vm.tierUnit` at `:839`;
  - `EncoreSection.jsx`: layout 1's block `:8444`–`8453` and body `:8632`–`8646`; layout 2's
    block `:8860`–`8861` (unit `:8947`) and body `:9129`–`9130` (unit `:9193`); layout 3's block
    `:9542`–`9560` and body `:9782`–`9797`; the layout-3 comment `:9332`–`9334`.
- **Code.**
  - **`priceParts()`** (`data.js:1948`) returns `{ lead, amount, tail }`. The amount is the first
    match of `/\d[\d,.]*/` with trailing `.` and `,` trimmed; the lead is what comes before it,
    trimmed; the tail is what comes after it, trimmed. With no digit, the whole price is the
    amount, and the lead and tail are empty. Its comment names the new oddities: `Up to` + `120` +
    `guests: £900`, `£1.2k` with a small `k`, and a thousands space (`£1 200` → `1` + `200`).
  - **`vm.tiers[]`** spreads the three keys (`EncoreBuilder.jsx:922`, comment rewritten).
  - **The six seats** render `t.tail` (or `tail`) between the numeral and the unit when it is not
    empty. Each takes its lead's face, size, weight, line height and colour, but not its
    `nowrap` or `flex: none`.
- **One change beyond the entry, found by the States.** A long tail at layout 3, 390, shrank the
  numeral's box to 0 and ran "450" under the tail. Every theme did it, by 22 to 55px. The narrow
  numeral there was `flex: 1 0 0; minWidth: 0` (the frame's `flex-[1_0_0]` and `min-w-px`). It is
  now **`flex: 1 0 auto`** at both layout-3 seats (`:9583`, and `:9828` in the body). Only one
  item grows, so wherever the row fits the numeral fills to the same width as before. The digest
  below proves the seed does not move. A tail too long to fit now wraps instead.
- **The harness proof** (before the edit): the HEAD worktree on :5174 against the tree on
  :5173, pricing × every arch × themes `0,1,2,3,4` × three widths: **0 of 60** on the canvas and
  **0 of 60** with `live=1` (port and `?t=` normalised).
- **After the edit: 0 of 60 and 0 of 60**, as named. The digest ran twice, once after the tail
  and again after the layout-3 flex change. Both times :5173 served the edit: its `data.js`
  carries `tail: s.slice`, and its `EncoreSection.jsx` carries `t.tail` and `'1 0 auto'`.
- **States** (a one-off puppeteer probe, deleted). It used `&cj=` with three packages at one
  price, `live=1`, pricing arch 0–2 × themes 0–4 × three widths: 45 renders and 105 price rows a
  price. It reads the row's spans in order off the DOM, then checks four things: no span passes
  its card, neighbours on one line do not overlap, the numeral's ink does not run under its
  neighbour, and the card, the section and the document do not overflow.

  | Price | Every one of 105 rows reads | Clean |
  |---|---|---|
  | `£450 — £1,400` | `£` \| `450` \| `— £1,400` \| `/event` | 105 |
  | `£1,200–£2,000` | `£` \| `1,200` \| `–£2,000` \| `/event` | 105 |
  | `From £1,200` | `From £` \| `1,200` \| `/event` (JP-058's split, unchanged) | 105 |
  | `£450 + VAT` | `£` \| `450` \| `+ VAT` \| `/event` | 105 |
  | `POA` | `POA` \| `/event` | 105 |
  | `450` | `450` \| `/event` | 105 |

  The one flag in the table's 630 rows is Retro's layout-1 768 card with `£450 + VAT`. Its deck
  cards are tilted, so the bounding box of the wrapped `/event` grazed the tail's by 1px.
  Re-measured with every transform removed, Retro and Pop's layout 1 is clean for all nine
  prices here and below.
- **Edge probes**, the same 45 renders each, all clean: `£450.` (small `.`), `£1.2k` (small `k`),
  `Up to 120 guests: £900`, `£450—£1,400/night`, `£450 for up to three hours of music, travel
  included` and `£1,200 – £2,000 per night, travel extra`. The last two are the long tails that
  found the layout-3 390 collapse above. An all-spaces price keeps JP-058's state: an empty
  numeral before the unit at layouts 1 and 2, and no row at layout 3.
- **JP-058's 768 overflow is gone.** This is the range at layout 1's 768 card under Lime, Grunge
  and Editorial. This session's probe first re-measured it on HEAD: **22.2 / 2.6 / 30.4px** past
  the card with `/UNIT`, and **26.6 / 6.9 / 34.8** with `/event`, with Editorial's section 5 over.
  Those are JP-058's 22 / 3 / 30 and 27 / 7 / 35. On the tree the range ends **20 / 20 / 20px
  inside** the card with `/UNIT` and **18.3 / 20 / 17.2** with `/event`, and no section overflows.
  JP-058's other named item closes with it: Retro's and Pop's numeral at that card, which HEAD
  broke over two lines (66–75px tall), is one line again (33px).
- **The tester's steps in the real app.** A one-off puppeteer script (deleted) ran with the
  editor at 1600 × 1000. It clicked the card, *Use this header*, then *Back to page list* and
  Pricing. It typed package 1's Price as `£450 — £1,400` with trusted keys, then clicked
  *Publish* and *Open*, and read the tab at 1440, 768 and 390:

  | | canvas | 1440 | 768 | 390 |
  |---|---|---|---|---|
  | Grunge card 3 | `£` 13 \| `450` 44.25 \| `— £1,400` 13 \| `/event` 11 | same | `£` 15 \| `450` 37.5 \| `— £1,400` 15 \| 13 | `£` 15 \| `450` 28.5 \| `— £1,400` 15 \| 13 |
  | Lime card 3 | numeral 59 | 59 | 50 | 40 |
  | Editorial card 3 | numeral 52 | 52 | 45 | 36 |
  | Retro card 1 (layout 1, the body) | `£` 15 \| `450` 33 \| `— £1,400` 15 \| `/event` 10 | same | `£` 18 \| `450` 40 \| `— £1,400` 18 \| 12 | same as 768 |

  Every panel held the typed string, and every render read the four spans in order. No card, and
  no document, overflowed. Neither window logged a page or console error. The screenshots look as
  the numbers say: at 1440 a big 450 with a small "— £1,400" beside it on all four templates. At
  768 and 390 the tail stands at the right with `/event` under Grunge, Lime and Editorial. On
  Retro's 768 card the tail and unit take a second line, JP-058's wrap rule for that card.
- **Named, not fixed.**
  - The narrow seat, above. It is the frame's own, but it is not literally "beside" the numeral.
  - `Up to 120 guests: £900`, `£1.2k`, and a thousands space (`£1 200` sets `1` big and `200`
    small), as the comment names them.
  - The all-spaces price, as JP-058 left it.
- **Docs.**
  - The `priceParts()` comment.
  - `FIELDS.pricing.tiers`' hint gained a clause: whatever follows the price's first number,
    such as a range's second half, prints small too.
  - The comments at the six seats, layout 2's head comment (`:8744`–`8748`), and the layout-3
    comment (`:9358`–`9364`), which now names `t.tail`.
  - A note beside the frame's "— £1,400" named diff in [`layout-3.md`](./layout-3.md).
  - Two *Closed by JP-074* pointers in [`qa-fixes.md`](./qa-fixes.md): in JP-058's *Named, not
    fixed* and in the sweep's.
  - CLAUDE.md and the README name neither the split nor the seat, so neither changed.
- **For JP-064 onwards.** `EncoreSection.jsx` grew by 42, all inside `Pricing`, so everything
  after the old `:9798` moved +42. With JP-061's and JP-062's +22, a triage number past the
  pricing section is now **+64**: `blocked` is at `:14529`, the block's cell fill at `:15702`, and
  Retro's at `:15847`. `EncoreBuilder.jsx` after `:918` moved +1. `data.js` after `:1411` moved +1,
  and after `:1934` +8.

Reply: **JP-074 — fixed.** A range typed into a package's price now prints as the design draws
it: a big "450" with a small "— £1,400" after it.
- The big numeral is the price's first number alone. Whatever follows it prints small in the
  same style as the "£" before it, such as a range's second half or "+ VAT".
- At 1440 the small part sits right beside the numeral. At 768 and 390 it stands at the right
  edge of the row with the unit, where the design puts its own "— £1,400".
- This also fixes the tablet overflow of JP-058: a range no longer pushes past the pricing card
  at 768.
- Seeded prices ("£450", "£650", "£1,200"), "From £1,200", "POA" and "450" look exactly as
  before.

It covers every template at pricing layouts 1–3. Layout 4 still prints the price whole, as
typed.

---

## JP-064 — past days drawn in the *Booked* colour

**Verdict: confirmed, and shared, Retro included.** CLAUDE.md's rule is that a `dead` day takes the
booked look without the strike. At layout 1 that reads as "muted", because layout 1 has no legend.
Layout 3 draws a legend whose *Booked* mark is exactly that fill, so the rule turns into a false
claim: on the published page on 28.09, days 1–27 all read as booked.

**Evidence.**
- `EncoreSection.jsx:14465`: `blocked(c) = c.booked || c.dead`.
- The `s.limeTree` block (Lime, Grunge, Editorial): `:15638`, `background: on ? s.ac :
  blocked(c) ? s.box2 : s.box1`, with no ring for blocked (`:15639`). The legend's *Booked* mark is
  `s.box2` (`:15695`). Grunge's `box2` is `#383838` = rgb(56,56,56) (`data.js:136`).
- Retro's and Pop's body: `:15783`, `blocked(c) ? taken`; the legend's *Booked* is `taken`
  (`:15819`: `#E1CAA5` under Retro, `s.paperLine` otherwise).
- Layout 1 for comparison: the block dims both to .38 (`:14614`); Retro's body uses `s.soft` /
  `s.muted` with a strike on booked alone (`:14801`–`14803`).
- The canvas never has a `dead` day (`today` is honoured only when `live`,
  `EncoreBuilder.jsx:1143`).

**Decision.**
- **A (recommended). A dead day draws the free dot, dimmed** (Lime's .38) with no handler: in the
  block, `s.box1` and its ring at .38; in Retro's body, the free style at .38. The legend's three
  states stay true. One test at two sites.
- **B. A fourth legend entry, "Past".** Not recommended: a label no frame draws.
- **C. Blank past cells.** Not recommended: the first rows read as missing.

**Expected after-diff (named before the code): zero** on the seeded digest, canvas and `live=1`
alike (no `&today=`).

**Verify.**
- **The seed.** Digest calendar × themes 0–4 × 3 widths × both surfaces: 0 files.
- **States** (`live=1&today=2025-06-18`, calendar `arch 2` × themes 0–4 × three widths, with
  `booked` covering one past and one future day): past days read at .38 in the free style; a
  booked future day reads as the legend's *Booked*; a booked past day reads as past (or as
  booked: decide and name it); neither takes a click. Shots of each template.
- **The tester's steps**, in the real app on Grunge card 3: Publish, Open (today is past `open`):
  days before today read dimmed, not booked. Then Retro's card 3 once.

**Docs.** CLAUDE.md's calendar paragraph ("the booked look **without the strike**"): layout 3
dims instead, and why (its legend).

**Decided.** —

**Settled.** —

Reply: —

---

## JP-067 — the footer is black, not dark grey

**Verdict: confirmed, and Grunge's alone.** On the layout-3 page, every template's footer stands on
its **Scheme 2**; on layouts 1, 2 and 4 it stands on Scheme 1. Lime and Editorial were fitted for
it; Grunge's layout-3 pass was not. Its grounds table even says "`#171716`, layout 1's"
(`./layout-3.md`, *Grounds*), which contradicts itself.

**Evidence.**
- Frames: Grunge's layout-3 footer `964:68716` / `984:13929` / `984:13960` binds `sem/bg`
  `#171716`; Lime's `964:68684` / `984:10769` / `984:10800` `#2E3928`; Editorial's `#AA958A`.
  Grunge's footers on layouts 1, 2 and 4 (`964:58610`, `964:64635`, `964:73036`) are `#000000`.
  Grunge's layout-1 and layout-3 footers differ in `get_variable_defs` **only** in `sem/bg`.
- In the Grunge layout-3 frame `sem/bg` is also bound on the pill's "Book Now" text and its
  `Frame 174` disc, on `Frame 178` in `Frame 175` (probably the seal), and on `Group 6`'s ellipses
  (check their visibility).
- `EncoreBuilder.jsx:436`: `footerBand: T.name === 'Lime' && cat === 'footer' && page === 2 ?
  T.sem?.box1 : undefined`. The root paints it (`EncoreSection.jsx:25488`), and the seal takes
  `scheme={s.footerBand ? 2 : 1}` (`:25128`).
- Editorial: `SCHEMES_OF.Editorial[2].footer = 2` (`data.js:334`), read at `sectionVm`'s head
  (`EncoreBuilder.jsx:277`).
- The Grunge seal's `line` arm reads `s.bg` outright (`EncoreSection.jsx:1099`, `line ? [s.bg,
  s.stroke2]`) and ignores `scheme`. The footer pill's label and disc need the same check.

**Fix (no decision: the frames agree).** Widen `footerBand` to Grunge with the named literal
`'#171716'` (Grunge's `T.sem.box1` is `#1A1A1A`, so Lime's read would be wrong; CLAUDE.md already
names `#171716` as Grunge's Scheme 2 literal). Then thread `s.footerBand || s.bg` into every leaf
the frame binds to `sem/bg`: the seal's `line` arm, the pill's label and disc, and whatever `Group
6` is. Option B, a Grunge `schemes` entry and `SCHEMES_OF.Grunge`, is heavier (it would also
define `s.onScheme` for Grunge) and not recommended.

**Expected after-diff (named before the code):** footer at `page=2` × theme 2 × 3 widths × both
surfaces = **6 files**: the root's background, and the seal's and the pill's rows where they read
`sem/bg`. Lime and Editorial, and every footer at `page` 0, 1 and 3, do not move.

**Verify.**
- **The seed.** Digest footer × themes 0–4 × 3 widths × both surfaces, at `page` 0–3: exactly the
  6. Read the leaves' colours off the DOM against the frame's bindings.
- **Shots** of Grunge's layout-3 footer at the three widths beside the frame's render, with the
  seal's spin stopped (CONVENTIONS' *Measure anything under `.seal-spin` with the animation
  stopped*).
- **The tester's steps**, in the real app on Grunge card 3: Publish, Open, the footer at 1440 /
  768 / 390 reads `#171716`, and the gallery's sheet above it matches. Grunge card 1 once: still
  black.

**Docs.** `./layout-3.md`'s *Grounds* row (a correction pointer). CLAUDE.md, where it says Grunge's
footer "is layout 1's" at layouts 2, 3 and 4: at layout 3 it stands on Scheme 2, as Lime's and
Editorial's do. The `footerBand` comment.

**Settled.** —

Reply: —

---

## JP-075 — the 390 carousel opens on the first set

**Verdict: confirmed, and shared.** Not a mid-scroll capture: **every 390 master draws the sets in
order with the second centred** — Retro `982:10193`, Lime `984:10791`, Grunge `984:13951` and
Editorial `984:16863` all read Cocktail hour at x −260 | **Dinner at x 50** | Party peak at x 360.
Desktop's middle column is the second set on every template too. Ours centres `page` 0, which
seats the last set on the left.

**Evidence.**
- `EncoreSection.jsx:11784`–`11786`: `seats = [pg - 1, pg, pg + 1]`, wrapping, at 390 alone;
  `pg` from `page = useState(0)` (`:10539`).
- Colour: under Lime, Grunge and Editorial it is the **seat's** (`limeCard(sets[i], seats.length
  === 3 ? at : 1)`, `:11950`, comment `:11805`–`11813`), so there the diff is content only. Under
  Retro and Pop it is the **set's** (`card()`, `setHue(i)`), and Retro's master has set 1's
  `#6d7040` in the centre, so opening on set 1 fixes the colour too.

**Fix (no decision: the frames agree).** At 390 with three or more sets, the centre is `(pg + 1) %
n`: page 0 centres set 1, with set 0 on the left and set 2 on the right. The pager still walks
every set and wraps. Both `pointerEvents` tests (`:11949`, `:12024`, `i !== pg`) compare with the
centre. Two sets (`seats = [pg]`) and the wide widths (which never read `seats`) are untouched.
The canvas and the published first paint move together.

**Expected after-diff (named before the code):** repertoire `arch 2` × themes 0–4 × 390 × both
surfaces = **10 files**: the three seats' content rotates, and under Retro and Pop their colours
with it.

**Verify.**
- **The seed.** Digest repertoire × themes 0–4 × 3 widths × both surfaces: exactly the 10.
- **Live** (`live=1`, 390, themes 0–3): the pager walks all three sets forward and back and wraps;
  the centre card is the one the pager names; only the centre takes a click.
- **Edges** (`&cj=` over `songs`): two sets (unchanged), four sets, one set.
- **The tester's steps**, in the real app on Grunge card 3 at Mobile: the second set centred and
  red, the first on the left. Then the published tab at 390, and Retro's card 3 once.

**Docs.** The comment at `:11805`; CLAUDE.md does not describe the 390 carousel (grep, and add
nothing if so). `./layout-3.md`'s repertoire Settled, a pointer.

**Settled.** —

Reply: —

---

## JP-069 — the map row: no weekday, the hour in its own pill

**Verdict: two halves.**
- **The weekday is by design** (JP-047's fact). A gig is `{ venue, city, time, month, day, link }`
  with no year, so "SAT" cannot be derived from "Jul 12". The branch says so at
  `EncoreSection.jsx:18430`–`18431`.
- **The hour's seat is a fit choice, and cheap to change.** The frame's right-hand pill is the
  *status* ("Upcoming"), which JP-047 dropped; the fit put the hour in that seat. At 390 the
  `s.limeTree` block already prints `city · time` under the venue (a user call, 2026-09-18).

**Evidence.**
- Frames: Grunge, Lime, Retro and Editorial rows at 1440 and 768 read "JUL / 12 / SAT", "Hidden
  Warehouse", "↗", "Manchester · 22:00", "Upcoming", "Tickets →"; the 390 master reads
  "Manchester · 22:00", then "Tickets →", then "Upcoming".
- The `s.limeTree` block (`:18628`): the row `gigRowL` at `:18724`; 390's `city · time` at
  `:18732`–`18735`; the wide rows' city alone and the `when` chip at `:18762`–`18768`.
- The shared body (Retro, Pop): the city alone at `:19128`–`19137`, whose comment says a sub line
  with both "is what makes the 768 master clip its own sub line at 107px of column"; the chip at
  `:19141`–`19151`; at 390 the chip beside Tickets (`:19187`–`19194`).

**Decision.**
- **A (recommended). `city · time` under the venue at every width**, in both halves, and no hour
  chip. Check the 768 sub line in Retro's body: it is not `nowrap`, so it wraps rather than
  clips; name what it does.
- **B. Reply only.**
- Either way the weekday half is a reply, and a year on gigs is a data-model question for the BA
  (it would also unlock Upcoming / Past).

**Expected after-diff (A, named before the code):** map `arch 2` × themes 0–4 × 1440 and 768 ×
both surfaces (20), plus themes 0 and 4 at 390 × both surfaces (4) = **24 files**. Lime, Grunge
and Editorial at 390 do not move.

**Verify.**
- **The seed.** Digest map × themes 0–4 × 3 widths × both surfaces: exactly the 24.
- **Edges** (`&cj=` over `gigs`, `live=1`): a gig with no time (the city alone, no separator); no
  city (the time alone); a long venue and city at 768.
- **Live**: the city chip filter and the pager still work; the lit row still reads.
- **The tester's steps**, in the real app on Grunge card 3, at 1440 / 768 / 390, then Retro's card
  3 once.

**Docs.** The two branch comments; `./layout-3.md`'s map Settled, a pointer.

**Decided.** —

**Settled.** —

Reply: —

---

## JP-063 — calendar layout 3 shows one month

**Verdict: confirmed, and it is the fit's reading.** The layout-3 design draws no month arrows, so
the fit drew month 0 alone and left `mi` unread. F20 is what makes that bite: the published page
starts its window at `max(open, today)`, so on 28 September with `open` in June, month 0 is
September, days 1–27 are past, and a visitor can pick three days. The *Opens on* hint promises 12
months, true of layout 1 alone. **Every template**: `month`, `hit` and `line` are computed above the
seam.

**Evidence.**
- `EncoreSection.jsx:15504`–`15507`: "This design has **no arrows**, so `mi` reaches nothing … The
  grid is month 0". `:15544`: `const month = s.calMonths[0]`. `mi` (`:14443`) is read by layout 1
  alone (`:14484`–`14506`; its `hit` searches the window with a `reduce` at `:14495`). The
  shared computation at `:15538`–`15548`; the `s.limeTree` block at `:15608`.
- `EncoreBuilder.jsx:1155`: `vm.calMonths` from `calStart(open, today)` (`data.js:2008`); `dead` at
  `:1172`.
- `data.js:1474`–`1477`: `FIELDS.calendar.open`'s hint, "It reaches ${CAL_SPAN} months from
  there", no `in`.
- The call's origin: `../retro/layout-3.md:631`.
- Frames: every master (Retro `964:68645` / `984:10605` / `984:10673`, Lime `964:68677`, Grunge
  `964:68709` / `984:13923` / `984:13954`, Editorial `964:68742`) carries one vector, the pill's
  `←`, and no month arrows. The head reads `11 | JUNE | 2025 | Tue`.

**Decision.**
- **A (recommended). Month arrows, drawn on both surfaces, live only in the published tab**:
  layout 1's rule (no cursor on the canvas; they wrap), Lime's rule for a control the frame does
  not draw (redrawn in the template's language). `month = s.calMonths[at(mi)]`, and `hit` searches
  the whole window as layout 1's does. The session decides where they sit (beside the month in
  the head, or flanking the grid) from the frame's own head, and what the head's numeral and
  weekday name when the pick is in a month other than the one on show (recommend: the pick,
  wherever it is; the month label follows the arrows).
- **A′. The arrows on the published page only.** The canvas stays the frame's picture: 15 live
  files and 0 canvas, a named canvas / live diff.
- **B. Reply: by design, and fix the hint** ("Layout 3 shows one month"). Not recommended: the
  F20 case leaves a visitor two or three pickable days, which is the ticket.
- Either way `open`'s hint says what each layout reaches.

**Expected after-diff (A, named before the code):** calendar `arch 2` × themes 0–4 × 3 widths ×
both surfaces = **30 files**, the head row gaining two arrows. A′: 15.

**Verify.**
- **The seed.** Digest calendar × themes 0–4 × 3 widths × both surfaces: exactly the named files.
- **Live** (`live=1&today=2025-06-28`, themes 0–4, three widths): the arrows step and wrap through
  `CAL_SPAN`; a pick in July survives paging back to June; JP-064's dimmed past days hold; the
  foot line names the pick.
- **The tester's steps**, in the real app on Grunge card 3: Publish, Open, page to October and pick
  a day; the foot line names it. Then Retro's card 3 once.

**Docs.** CLAUDE.md's calendar paragraph ("**Everything in this paragraph from 'The arrows
*wrap*' on is layout 1's**" now reaches layout 3 as well). The branch comment at `:15504`, and
`open`'s hint.

**Decided.** —

**Settled.** —

Reply: —

---

## JP-065 — the stat card counts reviews instead of a rating

**Verdict: by design so far, on reasoning that has since moved.** The fit dropped the rating on
purpose: its comment says "`4.9 /5`, the four photographed faces and the `★★★★★` are a rating and a
following the artist never typed", and the numeral became `s.quotes.length`. But it leans on two
precedents that were reversed later: "this section's layout 2 and the enquiry form's dropped this
very row of stars". Layout 2 now has the `stars` field, and the form's card has `bookings` "★★★★★
42 bookings". Pricing's layout 2 already carries a `rating` field with stars drawn while it is
filled. **Every template**.

**Evidence.**
- `EncoreSection.jsx:21157`–`21171`: the comment. The shared body's `if (s.v2)` at `:21180`: the
  card at `:21262`, the numeral `n` at `:21245`, the unit at `:21287`, the initials stack from
  `marked` at `:21246`. The `s.limeTree` block at `:21435`: the card at `:21568`, the unit at
  `:21591`, the faces at `:21603`.
- `data.js:1565`: `FIELDS.testimonials.stars`, `in: [1]`. `:1617`: the form's `bookings`.
  `:1416`: pricing's `rating` (`PRICING_RATING` '4.9', "The five stars beside it are drawn while
  this is filled"), with `reviews` and `images` (*Reviewer photos*, max 3, `:1412`).
- Frames: Retro `964:68651`, Lime `964:68683`, Grunge `964:68715` (and its 768 and 390) read "●
  Testimonials" / "Experiences." / "4.9" "/5" / "From 56+ events that kept the floor full all
  night." / "kai mercer®" / "★★★★★". Editorial `964:68748` reads "**5.9**", a designer's typo
  for the note. The sentence is already `sub`, and "kai mercer" is `s.brand`.

**Decision.**
- **A (recommended). A `rating` field**, the JP-046 and pricing shape: seeded `'4.9'`, emptiable,
  `in: [2]`. It prints in the numeral seat with "/5", and `stars` widens to `in: [1, 2]` (drawn
  while filled, as the frame's row). Emptied, the card falls back to today's count and unit. The
  faces stay initials, a named diff.
- **A+. Also a face-stack `images` field**, pricing's *Reviewer photos* shape, with seeds in
  `photos.js` (pricing's three reused). Recommend naming it rather than doing it.
- **B. Reply**: the rating is a claim.

**Expected after-diff (A, named before the code):** testimonials `arch 2` × themes 0–4 × 3 widths ×
both surfaces = **30 files**: the numeral and unit row, and a new stars node.

**Verify.**
- **The seed.** Digest testimonials × themes 0–4 × 3 × 2: exactly the 30; read the numeral row's
  text whole.
- **Reach.** Rows for `rating` and the widened `stars`.
- **States** (`live=1`, three widths): `rating` emptied (the count comes back), `stars` emptied
  (the row drops), a long rating string, no reviews at all.
- **The tester's steps**, in the real app on Grunge card 3: the panel lists *Rating* and *Stars*
  with no "Not shown" at layout 3; Publish, Open. Then Retro's card 3 once.

**Docs.** The comment at `:21157` (rewritten, and its two stale precedents). CLAUDE.md's
testimonials paragraph ("the big numeral is **`s.quotes.length`** … arithmetic, not the frame's
`4.9 /5` rating"). `./layout-3.md`'s testimonials Settled, a pointer.

**Decided.** —

**Settled.** —

Reply: —

---

## JP-070 (heads) — the layout-3 heads, the pricing intro and its pill

**Verdict: named fit diffs, and one table closes most of them.** All four templates' layout-3
frames print the **same** copy (Grunge's 768 and 390 too), so the fix is shared, `HEADING_4`'s
shape, not `KICKER_3`'s.

| Section | Ours | Frame | Where ours comes from |
|---|---|---|---|
| Repertoire | "12 Songs" | "Curated sets" | no `d`; the song count in `sectionVm` (`EncoreBuilder.jsx:999`) **and** `EditPanel` (`:3581`, *before* the `CAL_HEADING_3` / `HEADING_4` arms at `:3588`–`3590`) |
| Gallery | "See us in action" | "Gallery" | `TITLES.gallery` / `FIELDS.gallery.heading` (`data.js:953`, `:1452`) |
| Pricing | "Choose the set that's right for your night" | "Pricing" | `FIELDS.pricing.heading` `d` (`data.js:1383`), layout 1's own frame head |
| Map | "Manchester" | "Where I'm playing." | `TITLES.map` (`data.js:954`, `:1511`), the `<h2>` at `EncoreSection.jsx:18689` under "Gigs & travel" |
| Testimonials | "Word of mouth" | "Experiences." | `TITLES.testimonials` (`data.js:1544`) |

- **The pricing intro.** `DEFS.pricingIntro` (`data.js:961`–`972`) dropped the frame's "Four ways
  to book this act." (a count, false even in the frame, which draws three packages) and "Choose by
  the kind of night you're throwing" (a stutter against the old head). With the head "Pricing" the
  stutter falls away.
- **The chips: by design.** `All` is layout 1's named intended diff (`EncoreSection.jsx:9300`–
  `9304`, CLAUDE.md), and the chips derive from `TIERS`' tags (`data.js:700`–`712`), one list for
  every layout. The frames disagree between layouts (Retro's layout 1 draws Solo / Trio / Band,
  Grunge's layout 1 Private Event / Club Night / Festival), so no per-layout tag seed can exist.
- **The pill: a button no field reaches.** Pricing layouts 1 and 3 pass `BookPill` no `label`, so
  it prints `s.cta1` (`EncoreSection.jsx:748`), `cv('cta1', 'Book Now')` (`EncoreBuilder.jsx:543`),
  and `FIELDS.pricing` has no `cta1`. Layout 2 reads `cta`, layout 4 `rowCta` ("Button (layout
  4)", `PRICING_ROW_CTA` 'Start Enquiry', `data.js:1424`). Layout 1's frame says "Book Now",
  layout 3's "Book".
- `HEADING_4` at `EncoreBuilder.jsx:244`–`247`, resolved at `:1007` (sectionVm) and `:3589`–`3590`
  (EditPanel), beside `CAL_HEADING_3` (`:1004` / `:3588`).

**Decision** (one `AskUserQuestion`):
1. **The five heads.** **A (recommended): a `HEADING_3` table** at `d === 2`, resolved in
   `sectionVm` and `EditPanel` alike, its repertoire arm *ahead of* the song count in both (the
   heading is not a count, so the count rule is not at risk). It may absorb `CAL_HEADING_3`.
   **B**: keep the shared defaults, a reply.
2. **The pricing intro.** **Keep it (recommended)**: the frame's first sentence is a count claim.
   Or seed layout 3 with "Choose by the kind of night you're throwing — the quote covers the whole
   booking.", which the new head no longer stutters against.
3. **The pill.** **A (recommended): widen `rowCta`** to layouts 1, 3 and 4 with a per-layout
   fallback (`FORM_BTN_4`'s shape): "Book Now" at 1, "Book" at 3, "Start Enquiry" at 4; relabel
   it (*Package button*), measure `in`. **B**: keep it a literal, JP-071's reply. Layout 2's `cta`
   stays its own.
4. The chips are a reply, with no question.

**Expected after-diff (named before the code):** each section at `arch 2` × themes 0–4 × 3 widths ×
both surfaces is 30 files: the heads move repertoire, gallery, pricing, map and testimonials
(**150**, the head row and the reflow under it); the pill moves pricing `arch 2` (already counted)
and nothing at `arch 0` or `arch 3`, whose fallbacks are today's words; the intro, if taken, is
inside pricing's 30.

**Verify.**
- **The seed.** Digest those five categories × themes 0–4 × 3 × 2: exactly the named files, and
  every other category and design 0.
- **Reach.** The widened `rowCta` row.
- **The panel.** At layout 3 each heading field shows the frame's head as its value; at layouts 1,
  2 and 4 the old one. The repertoire's heading typed over, then emptied: the count does not come
  back at layout 3 (decide: an emptied heading drops, as today).
- **The tester's steps**, in the real app on Grunge card 3, then Lime's, Editorial's and Retro's.

**Docs.** CLAUDE.md where it names `HEADING_4` / `CAL_HEADING_3` and the repertoire's count
fallback ("change one, change both"). The `HEADING_4` comment. `rowCta`'s row.

**Decided.** —

**Settled.** —

Reply: —

---

## JP-070 (form) — the form's head and boxes

**Verdict: named fit diffs.** The layout-3 card frames (and layout 2's, `964:64633`) stack three
full-width boxes, EVENT DATE / EVENT TYPE / YOUR EMAIL, where we seed `FORM_FIELDS`' four. The
layout-3 head is "Book Kai for / your event", which **names the frames' mock artist** (Editorial's
too, whose mock artist is Sienna Vale); layout 2's card frame reads our seed, "Let's make your
night unforgettable.".

**Evidence.**
- `TITLES.form` at `data.js:1583`. `FORM_FIELDS` at `:855`–`863`; `FORM_FIELDS_4` at `:871`, gated
  on the absent key in `formList` (`EncoreBuilder.jsx:1624`) and `formFieldsVal` (`:3524`), with
  one `email` row for the guard.
- Layouts 2 and 3 already stack one box per row (`s.formFields.map`, e.g. `EncoreSection.jsx:24071`,
  `:24255`), so the geometry fits three.
- The head is fitted to its widest word under Lime and Editorial (`vm.titleWordEms`), so a new
  head moves their desktop size.

**Decision** (one `AskUserQuestion`):
1. **The head.**
   - **A (recommended). Compose it from the name**: "Book {name} for\nyour event", a name-derived
     default (the `copyrightOf()` / `badgeText` precedent), which needs `EditPanel`'s special case
     beside `title`, at layout 3 alone.
   - **B.** Neutral copy ("Book us for\nyour event").
   - **C.** Keep today's seed, a reply.
2. **The boxes.**
   - **A (recommended). A card seed** (`FORM_FIELDS_CARD`: Event date, Event type, Your email, one
     `email` row) at layouts 2 and 3, gated on the absent key as `FORM_FIELDS_4` is. JP-054's
     history is two user reversals, and the latest went to seeding the frame's boxes.
   - **B.** Layout 3 alone.
   - **C.** Keep `FORM_FIELDS`, a reply.

**Expected after-diff (named before the code):** the head: form `arch 2` × themes 0–4 × 3 × 2 =
**30** (and Lime's and Editorial's desktop size). The boxes: form `arch 1` and `arch 2` × 0–4 × 3 ×
2 = **60** on A, 30 on B; the mailto body's labels move with them.

**Verify.**
- **The seed.** Digest form × themes 0–4 × 3 × 2: exactly the named files.
- **Live**: fill the three boxes and read the composed `mailto:` off `getAttribute('href')`; a
  refused email box still marks; the guard still holds on the one `email` row.
- **The name**: `&name=` long and short; the head's `titleWordEms` fit holds.
- **The tester's steps**, in the real app on Grunge card 3 (and card 2 on A), then Lime's,
  Editorial's and Retro's.

**Docs.** CLAUDE.md's form paragraph (the `FORM_FIELDS_4` sentence, "The gate is on the absent key
alone"). The `FORM_FIELDS` comments. `../lime/retest-qa-fixes.md`'s JP-054, a pointer.

**Decided.** —

**Settled.** —

Reply: —

---

## End-of-pass sweep

1. Full digest against a `main` worktree on :5174 (port and `?t=` stamps normalised), all
   categories × themes 0–4 × three widths × canvas and `live=1`, plus the footer at `page=2`. Prove
   the harness first: the worktree at HEAD against the tree diffs to 0. Every diff must be one a
   Settled names.
2. `reach.mjs` for every new or widened key.
3. Walk Grunge card 3 in the real app and the published tab at 1440 / 768 / 390, with every
   entry's tester steps; then Lime's, Editorial's and Retro's card 3 once; then Grunge card 2 for
   JP-073 off layout 3 (JP-072 has nothing to check there: only layout 3 composes).
4. `npm run build:standalone`, then `cp source/dist-standalone/index.html index.html`, in its own
   commit. Then a two-build digest (`build-digest.mjs`, reduced motion, `CARD=2`: the card is
   0-based), whose diff should be only the named rows.
5. **A note for the designer**, at this plan's foot: the media head's "KM BIO" (JP-068), the bio's
   *Current role* printed twice where *Based in* belongs (JP-061), Editorial's "5.9" (JP-065), the
   pricing intro's "Four ways" over three packages (JP-070), the form head's mock name (JP-070),
   and that the 390 repertoire is the track's picture, not a mid-scroll (JP-075).
6. `plans/README.md`'s row, and one reply line per ticket for QA, headed by the
   retest-against-the-stamp line: retest against the Pages build whose `last-modified` is later
   than `Mon, 28 Sep 2026 11:47:52 GMT` (`curl -sI https://siniiitsa.github.io/js-plus-prototype-2/`).

**Settled.** —

**Replies to QA, one line per ticket.** —
