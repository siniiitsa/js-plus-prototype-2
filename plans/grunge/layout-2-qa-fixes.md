# Grunge layout 2 QA fixes — bug-by-bug plan

Working checklist for the tester's batch against the **Grunge template, layout 2** (card 2 of the
setup modal, *Feature spread*): JP-059 and JP-060. It works like [`qa-fixes.md`](./qa-fixes.md):
**one entry per session, with context cleared between sessions**, and each session writes what it
settled back into this file.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then *How each
session runs* and *Verification harness* in `../retro/qa-fixes.md` (the `&cj=` / `&who=` harness),
then the memory notes `verifying-the-published-tab` and `browser-tool-choice`.
[`layout-2.md`](./layout-2.md) holds the Figma node ids of every Grunge layout-2 frame (its
*Sections* table, with Lime's and Retro's twins beside them). The shape both entries copy is in
[`../lime/layout-2-qa-fixes.md`](../lime/layout-2-qa-fixes.md): JP-037 (a frame literal becomes a
seeded, emptiable field) and JP-040 (the map's frame claims re-seated as fields).

Branch: **`grunge-layout-2-qa-fixes`, forked from `main`** (`435f7c9`, after PR #38). One commit
per entry (`Fix JP-060: …`).

**Both reports reproduce on HEAD, whichever build they were filed against.** At triage
(2026-09-28) the Pages build's `last-modified` was `Mon, 28 Sep 2026 10:09:10 GMT`, 8,748,860
bytes, which is byte-identical in size to `main`'s root `index.html` (`5bed233`, the Grunge QA
refresh). The build before it (`08:20:45`) differs only in the seals and pricing, and neither
reported site was touched between the two, so it makes no difference which one the tester had.

**Neither is Grunge's alone.**
- **JP-060** is the `s.limeTree` block of the map's layout 2, so it is **Lime's, Grunge's and
  Editorial's**. Retro and Pop print the field once.
- **JP-059** is `HeaderV1` in both halves (the `s.limeTree` block and Retro's body), so it is
  **every designed template's** header layout 2. Its bio half is the shared layout-2 body as well,
  which **Pop** draws too.

## The report (translated)

> **JP-059 — Medium — Header and Bio show text that no field can change.** Grunge → *Feature
> spread*, change every Header and Bio text field, Publish → Open. Expected: every text a visitor
> sees is editable, as in the rest of the product ("on Lime this was fixed in JP-037"). Actual:
> after changing all 197 text fields on the page, four things remain: the *Available for
> bookings* pill; the card *THE FACE OF THE ACT* with "Same person you'll meet on the night.
> Performing since 2021."; the sentence "Available across the UK · 120 mi standard travel
> radius."; and the */FEATURED* pill in the Bio. A contradiction on the page: with Bio →
> *Performing since* = 2019, the header still says "since 2021". These are factual claims about
> the artist (a year, a radius, availability) on their own page. Checked on the published page at
> 1440 by a marker sweep over every field. The Header and Bio help texts say nothing about these
> elements. No AC.
>
> **JP-060 — Medium — Events Map: the *Coverage badge* field also prints as "Max travel".**
> Events Map → Coverage badge = `Confirmed` (as in the design), Publish → Open. Expected, as in
> the design: a *Confirmed* badge and, separately, *Max travel: 100 mi*. Actual: *Max travel:
> Confirmed*. The field has no help text and fills both places, so the design's state cannot be
> reproduced. *Travel terms* goes only to the line under the map. Checked on the published page
> at 1440; none of the 197 fields is a separate Max travel. No AC.

## Status

| Order | ID | Report (short) | Verdict | Size | Decision needed? | Status |
|---|---|---|---|---|---|---|
| 1 | JP-060 | *Coverage badge* also prints as *Max travel* | **Confirmed, a fit slip**: Lime's layout-2 fit drew Retro's *pre*-QA chip over Retro's *post*-QA stat row, so `radius` fills both, on the seeded page too. Grunge and Editorial inherited it. Retro and Pop print it once | S | **yes** — A (the chip takes Retro's `g.when`), B (a seeded *Confirmed* field), C | **done** (A; `radius` is *Coverage*) |
| 2 | JP-059 | Header and Bio print five texts no field reaches | **Confirmed, and shared**: literals in `HeaderV1`'s two halves (Retro, Lime, Grunge, Editorial) and in both bio layout-2 bodies (every template, Pop included). Lime's fit kept them on purpose | M | **yes** — fields or drop, the *since* sentence, `/Featured` | **done** (A, (a), A; Retro L5's claims named) |
| 3 | — | End-of-pass sweep | — | S | — | **done** |

**Why this order:** JP-060 is one block plus a label and a hint, with a countable after-diff.
JP-059 adds five fields and should prove a zero seeded diff, which wants a base the other entry
has already settled.

**"Decision needed"** means the entry lists options with a recommendation. The session starts by
asking the user (one `AskUserQuestion`) and records the answer under **Decided** before writing
code.

## How each session runs

As [`qa-fixes.md`](./qa-fixes.md), with these differences:

1. Re-check the *Evidence* line numbers. They are from the triage (2026-09-28, `435f7c9`).
2. **Themes per entry, and always explicit.** `digest.mjs`'s default list is `0,2,3,4`, which
   **skips Lime**. JP-060's code is the `s.limeTree` block (themes 1–3), but option B moves Retro
   and Pop too, so it digests **0–4**. JP-059's header half is themes 0–3 (Pop's header family is
   flat and never draws `HeaderV1`; digest it anyway as the control), its bio half 0–4.
3. Verify at **all three widths** and on **both surfaces** (canvas and `live=1`). Digest against a
   **HEAD worktree** on :5174 (`node_modules` an APFS clone, `cp -Rc`, with its `.vite`
   removed: a symlink shares `.vite` with the live server, the Retro sweep's convention; JP-060
   ran it that way). Normalise the port in
   `background-image` URLs, and `\.jpg\?[^|]*` in `src` if :5173 has been running long enough to
   stamp photo URLs with `?t=` (the Grunge QA sweep met both). **Name the expected after-diff
   before writing code.**
4. **The digest's text column is short.** Each row carries the element's own text nodes, cut at
   40 characters. A string longer than that, or a change of one glyph at the same width, needs a
   `textContent` read off the DOM beside the digest.
5. **A new or re-scoped field gets a measured `in`**: add a row to `source/scripts/reach.mjs`'s
   `PROBES` (do not rebuild it) and write the `in` and the hint from what it prints. Under Lime,
   Grunge and Editorial (four header cards each) the header's arch 5 folds onto 1, so a layout-2
   header hit there is arch 1 and 5 (`heroCta`'s precedent). Retro's six do not fold.
6. Drive anything live-only in the popup from the opener, per `verifying-the-published-tab`.
7. Update the docs the entry names. Commit, fill in **Settled** and the status row, then print
   the hand-off prompt for the next entry and stop.

**Do not refresh the root `index.html` per bug.** The sweep does it once.

---

## JP-060 — the *Coverage badge* field also prints as *Max travel*

**Verdict: confirmed, and a fit slip rather than a design call.** Layout 2's travel card has a
chip in its head and a three-cell stat row under it.
- The stat row (`stats`) is shared by every template. It prints `radius` as *Max travel*.
- **Retro's chip** (and Pop's, the same body) prints the featured gig's date and time, `g.when`.
  So under Retro and Pop, `radius` prints once.
- **The `s.limeTree` block's chip** prints `radius` too (`● {s.mapRadius}`). So under Lime, Grunge
  and Editorial the one field fills both seats, **on the seeded page as well**: "● 12 mile
  radius" in the chip over "Max travel · 12 mile radius". Typing a status into it, as the tester
  did, puts the status into Max travel.

**How it happened** (`git log -S`):
- Retro's fit (`22e5ea1`, 2026-09-08) put `radius` in the chip.
- Retro's QA (`cd8c114`, 2026-09-15) moved the chip to `g.when` and gave Max travel `radius`:
  "one coverage on the page, not two" (`../retro/layout-2.md`, the 2026-09-15 addendum). It left
  the fit's shared comment above the card saying "with the coverage badge in the chip".
- Lime's fit (`be2e675`, 2026-09-16) drew the **pre**-QA chip in its own block and inherited the
  **post**-QA `stats` ("the field allocation in `stats` [is] shared whole").
- Grunge and Editorial widened that block and inherited the allocation. `../editorial/layout-2.md`
  says so outright: "Lime's field allocation (the chip prints `mapRadius` where the frame says
  '● Confirmed')".

**A consequence nobody reported:** under Lime, Grunge and Editorial the featured gig's **date and
time are printed nowhere** in layout 2. The panel prints the featured gig's venue and city, and
the rows print the other gigs' dates. Retro's chip is the only seat that date has.

**The field itself** has no hint, and its label names a badge. `radius` is read at every design:
beside the heading in layout 1, as Max travel in layout 2, inside the line under the map in
layout 3, and as the Coverage card's value in layout 4. Only layout 1's reading is a badge.

**Evidence.**
- `EncoreSection.jsx`, `EventsMap` (`:16732`), its `if (s.v1)` at `:17350`:
  - `:17432`–`17436`: the stale shared comment ("with the coverage badge in the chip");
  - `:17444`–`17448`: `stats`, shared, with Max travel on `s.mapRadius`;
  - `:17510`: the `s.limeTree` block; its chip at `:17575`–`17578`;
  - `:17949`–`17956`: Retro's and Pop's chip, `!!g?.when && ● {g.when}`, under the comment "The
    frame's '● Confirmed' is a booking status nothing here knows".
- The other `radius` reads: layout 1 `:16893` (`s.limeTree`) and `:17313` (shared); layout 3
  `:18967` and `:19387`; layout 4 `:19626` (the Coverage card, with `terms` as its sub).
- `data.js:1472`: `FIELDS.map.radius`, `l: 'Coverage badge'`, no `in`, no hint. `:800`:
  `MAP_RADIUS` = `'12 mile radius'`. `:808`–`810`: "Max travel, the third cell, is MAP_RADIUS
  rather than a field of its own, so a seeded page cannot claim two different coverages" (true of
  Retro, and of every template after option A). It sits among the pricing constants, above
  `MAP_TRAVEL_TIME` at `:821`.
- `EncoreBuilder.jsx:1424`–`1425`: `vm.gigs[].when` (`"Jul 12 · 22:00"` for the seeded first
  gig, 14 characters, the same count as `"12 mile radius"`). `:1483`: `vm.mapRadius`.
- Frames: Grunge `964:64632` / `986:13767` / `986:13786`; Lime `964:64594` / `986:11862` /
  `986:11881`; Editorial `964:64613` / `986:15672` / `986:15691`; Retro `964:64651` /
  `986:10974` / `986:11467`. The tester's design shot reads "● Confirmed" in the chip and
  "Max travel 100 mi" in the row.

**Before asking:** read the chip's own text node off the three `s.limeTree` desktop frames (and
Retro's), so the question quotes the frames rather than the tester's shot (JP-036's lesson).

**Decision.** What goes in the travel card's chip?
- **A (recommended). The chip takes Retro's allocation**: `!!g?.when && ● {g.when}` in the
  `s.limeTree` block. `radius` then prints once, as Max travel, on every template, and the
  featured gig's date comes back to Lime, Grunge and Editorial. The frame's "Confirmed" stays
  Retro's named drop (a booking status nothing here knows), and the reply says so. The tester
  gets the design's Max travel by typing `100 mi` into the field.
- **B. A new field for the chip**, seeded with the frame's "Confirmed", emptiable, `in: [1]`,
  read by every template's chip. This is JP-040's and JP-046's precedent (a frame claim re-seated
  as a seeded field), and it reproduces the design exactly. Its cost: Retro's and Pop's chip
  trade the gig's date for one word typed once for every gig (the `status` precedent), and the
  featured gig's date is then printed nowhere on any template.
- **C. A Max travel field of its own**, with the chip keeping `radius`. That leaves two coverages
  on the seeded page ("12 mile radius" in the chip beside Max travel). Not recommended.

**Decided: A** (user, 2026-09-28). The chip in the `s.limeTree` block takes Retro's `g.when`, and
`radius` prints once, as Max travel. Asked over the frames' own text, read before asking: all four
desktop masters (Grunge `964:64632`, Lime `964:64594`, Editorial `964:64613`, Retro `964:64651`)
render "● Confirmed" in the chip (layer `…;731:3435` on Grunge, `…;731:3312` on Lime) and "Max
travel" over "100 mi" in the stat row. Retro's QA already dropped "Confirmed" as a claim.

**Either way:**
- The `radius` label and a hint. For example `l: 'Coverage'` and "How far you travel. Layout 1
  prints it beside the heading, layout 2 as the travel card's Max travel, layout 3 in the line
  under the map, and layout 4 on the Coverage card." Measure it first (a `map.radius` row in
  `reach.mjs`) and word the hint from the table.
- Rewrite the shared comment at `:17432`, and the `s.limeTree` block's own chip comment.
- The reply names the relabel, since the ticket calls the field *Coverage badge*.

**Fix (A).** In the `s.limeTree` block the chip reads `g.when`, gated as Retro's is. Its dress
(the ring, `bodySm`, `nowrap`, `flex: none`) does not change. **(B)**: a constant beside
`MAP_TRAVEL_TIME` (for example `MAP_TRAVEL_TAG = 'Confirmed'`), a `FIELDS.map` row after `fee`,
`vm.mapTravelTag` by `cv()`, and both chips read it, dropping when emptied.

**Expected after-diff (named before the code).**
- **A:** exactly **map `arch 1` × themes 1, 2, 3 × three widths × canvas and `live=1` = 18
  files**. In each, the chip's row changes (its text from "● 12 mile radius" to "● Jul 12 ·
  22:00", and its width by the glyphs), and at most the heading column beside it. Themes 0 and 4
  are byte-identical, and so is every other category. The label and hint are chrome only.
- **B:** map `arch 1` × themes 0–4 = 30 files, every chip reading "● Confirmed".

**Verify.**
- **The seed.** Digest `map` × themes 0–4 × three widths × both surfaces against the HEAD
  worktree: exactly the named files. Read the chip's text off the DOM in each.
- **Live.** Under Grunge, Lime and Editorial at `live=1`, click a gig row: the chip follows the
  featured gig (`onPick`), and the Max travel cell does not move.
- **Edges** (`&cj=` over `gigs`, `live=1`, three widths): a long `when` (month `September`, time
  `23:00–04:00`) in the `nowrap` chip, with `scrollWidth` equal to the width at 390 and the
  heading not squeezed out; a gig with no month, day or time (the chip drops); no gigs at all
  (the chip is gone where today it prints the radius, a named diff).
- **Reach.** The `map.radius` row: every design, every template.
- **The tester's steps**, in the real app on Grunge card 2: Events Map → the field = `100 mi` →
  Publish → Open, at 1440 and 390. The chip reads the featured gig's date (on A) and Max travel
  reads `100 mi`. Then Lime and Editorial card 2 once, and Retro's to see it unchanged.

**Docs.**
- The two `EncoreSection` comments above. `data.js:808`–`810`: still true on A; move it down
  beside `MAP_TRAVEL_TIME`, where it belongs.
- `../lime/layout-2.md`'s map Settled and `../editorial/layout-2.md` (the "Inherited whole" line):
  a pointer to this entry. `./layout-2.md`'s map Settled, if it names the chip.
- CLAUDE.md's events-map paragraph does not describe the travel card's chip; check, and the README.

**Settled.**
- **The fix is the chip alone.** In the `s.limeTree` block it is Retro's `!!g?.when && ● {g.when}`.
  Its dress (the ring, `bodySm`, `nowrap`, `flex: none`, the padding) is unchanged. Nothing else
  in the block read `radius` or `when`. `g`, `feat` and `onPick` are the shared hooks above the
  seam, so the published featuring needed nothing.
- **`radius` is relabelled *Coverage*, with a hint** ("How far you travel. Layout 1 prints it
  beside the heading, layout 2 as Max travel on the travel card, layout 3 in the line under the
  map, and layout 4 on the Coverage card."). The label is also layout 4's card label, which
  that branch's comment already called "the field's own name". Measured, not read:
  - `reach.mjs`'s new `map.radius` row reports layouts 1–4 on themes 0–4, 6/6 renders each, so
    the field takes no `in`.
  - A one-off count of the sentinel's text nodes found it **exactly once** per design, on every
    template, width and surface. Before the fix, layout 2 under themes 1–3 printed it twice.
- **Harness first.** The HEAD worktree on :5174 (`node_modules` an APFS clone, not a symlink,
  per the Retro sweep's convention) against the tree before the edit: map × themes 0–4 × three
  widths × both surfaces, 0 of 120.
- **Digest: 18 of 1,320**, all categories × themes 0–4 × three widths × canvas and `live=1`.
  They are exactly map arch 1 × themes 1, 2, 3 × three widths × both surfaces. Each has **one
  row**: the chip's span, its text "● 12 mile radius" → "● Jul 12 · 22:00" (read whole: 15
  characters, under the column's 40), 1.1 to 1.5px narrower and moved right by the same. The
  heading column does not move. Themes 0 and 4 and every other category are byte-identical.
- **Live** (`live=1`, `radius` = `100 mi`, themes 0–3, 1440 and 390): picking *The Deaf
  Institute* and then *Gorilla* moves the chip Jul 12 · 22:00 → Jul 25 · 21:00 → Aug 30 ·
  23:00, and Max travel stays `100 mi`.
- **Edges** (`&cj=` over `gigs`, `live=1`, three widths, themes 0–3):
  - A long `when` ("September 12 · 23:00–04:00") stays inside the card (right edge 360 in the
    380 card at 390, 352 in 372 at 768), with no overlap with the heading and `scrollWidth` equal
    to the width at every size.
  - A gig with no month, day or time drops the chip, and the heading stands alone.
  - With no gigs the chip is gone. That is the named diff: under Lime, Grunge and Editorial it
    printed the radius there before.
- **The tester's steps**, in the real app, card 2 of Grunge, then Lime, Editorial and Retro.
  Events Map's panel shows *Coverage* with the hint (no *Coverage badge* anywhere). The field
  was set to `100 mi`, then Publish and Open, at 1440 and 390.
  - On the canvas and the published tab alike, the chip reads "● Jul 12 · 22:00" and Max
    travel "100 mi". The section prints "100 mi" once and "12 mile radius" nowhere.
  - A pick moves the chip and not Max travel, with `scrollWidth` equal to the width and no page
    errors.
  - Retro is unchanged (its chip was already the date).
- **Named, not fixed.**
  - The frame's "Confirmed" stays dropped, Retro's 2026-09-15 call, now on every template.
  - Seen in passing, not this ticket's: resizing the published tab from 1440 to 390 re-features
    the first gig (`sel` does not survive the device change). Retro, whose code is untouched,
    does the same.
- **Docs.**
  - `EncoreSection`: the shared travel card comment (the chip holds the date, and Max travel
    is `radius`, printed once in every template's body), a comment on the block's chip, and
    layout 3's data-line comment ("the coverage badge" → "the coverage").
  - `data.js`: a comment on `FIELDS.map.radius`, and the stat-row comment moved from among
    the pricing constants to above `MAP_TRAVEL_TIME`.
  - Pointers in `../lime/layout-2.md`'s map Settled ("Corrected by JP-060"),
    `../editorial/layout-2.md`'s "Inherited whole" line and `./layout-2.md`'s map Settled.
  - CLAUDE.md and the README describe neither the chip nor the label (grep), so both are
    unchanged.
  - `../retro/layout-4.md:986` quotes the old label as history, and it stays: the tie it broke
    is only more exact now.

Reply: **fixed.** The field was called *Coverage badge*, but it holds the artist's travel
coverage, and every Events Map layout prints it once; on this layout it is *Max travel*. It is now
called **Coverage**, with a help text that says where each layout prints it. On Grunge, Lime and
Editorial the travel card's chip printed the same field a second time, which is the bug. The chip
now shows the date and set time of the gig the panel features, as Retro's always has, and it
follows the visitor's pick. The design's *Confirmed* is a booking status the page cannot know,
so it stays out by design (the same call as Retro's layout 2). To get the design's Max travel,
type `100 mi` into Coverage.

---

## JP-059 — Header and Bio print five texts that no field reaches

**Verdict: confirmed, all five, and none is Grunge's alone.**
- **The header's layout 2** (`HeaderV1`, card 2, *Feature spread*) draws three things no field
  reaches:
  - the "● Available for bookings" pill over the name;
  - the face card's title "The face of the act" and its body "Same person you'll meet on the
    night. Performing since 2021.";
  - the place card's body "Available across the UK · 120 mi standard travel radius." (its title is
    already the header's `location`).

  They are literals in **both halves**: the `s.limeTree` block (Lime, Grunge, Editorial) and
  Retro's body. Pop's header family is flat and never draws `HeaderV1`.
- **The bio's layout 2** draws a "/Featured" pill over the paragraph, a literal in the
  `s.limeTree` block and in the shared body, which Retro **and Pop** draw.
- **This was a call, not an oversight.** JP-037 made the hero button, the bio's credit line, its
  button and the chips fields, and Lime layout 2's header Settled kept the rest on purpose: "The
  card copy ('The face of the act', 'Same person you'll meet…', 'Available across the UK…') stays
  Retro's literals, as in the frame" (`../lime/layout-2.md:521`). That is the call this entry
  reverses.
- **Two of the five are claims, not labels**, by Retro's own sort (`../retro/layout-2.md`, "A
  frame's own copy can be a claim"): "Performing since 2021" and "120 mi". The tester's
  contradiction is real. The bio's *Performing since* (`FIELDS.bio.since`, seeded "June 2021") is
  printed in bio layouts 3 and 4 and has nothing to do with the header's "since 2021". Header
  layout 3's kicker is seeded "Performing since 2021" too (`KICKER_3`), but that one is a field:
  the artist's own copy, which is the precedent for option (a) below.
- **The seeded page contradicts itself on coverage as well**: the header's "120 mi" against the
  map's "12 mile radius" (`radius`) and "120 mi standard" (`terms`). Name it and leave it; once
  every one of them is a field, the words are the artist's.

**Evidence.**
- Header: `HeaderV1` at `EncoreSection.jsx:1833`.
  - The `s.limeTree` block: the pill `:2064`–`2067`; `cardText()` `:2121`–`2129` (its title is
    `faced` and uppercased under Grunge and Editorial); the face card `:2139`; the place card
    `:2154`.
  - Retro's half: the pill `:2366`–`2371`; the face card `:2404`–`2405`; the place card `:2418`.
- Bio: `s.v1 && s.limeTree` at `:4070`, the pill `:4153`–`4156`; the shared `if (s.v1)` at
  `:4255`, the pill `:4332`–`4335` (`labelStyle`, which cases it per theme).
- `data.js`: `HERO_CTA` / `BIO_CREDIT` / `BIO_CTA` at `:674`–`676` (JP-037's constants, where the
  new ones go); `FIELDS.header` `:1221`, with `heroCta` at `:1249`; `FIELDS.bio` `:1280`, with
  `since` at `:1297` (`in: [2, 3]`); `DEFS.since` `:948`; `KICKER_3` `:1043`.
- `EncoreBuilder.jsx:545`: `vm.heroCta`, uncased (the footer pill's rule). `:734`–`739`:
  `vm.bioCredit`, `vm.bioCta`, `vm.since`.
- `source/scripts/reach.mjs:21`: `PROBES` (`header.heroCta` at `:37`, `bio.credit` / `bio.cta` at
  `:38`–`39`).
- Frames: Grunge header `964:64618` / `986:13753` / `986:13772`, bio `964:64619` / `986:13754` /
  `986:13773`. Lime, Retro and Editorial are in `./layout-2.md`'s *Sections* table.

**Before asking: the census.** A one-off puppeteer script in the scratchpad, which is the tester's
marker sweep run over every design rather than one:
- every header and bio text field set to a marker through `&cj=`, and the bio's identity keys
  (`kicker`, `location`, `tags`) through `&who=`;
- every header design (arch 0–5) and bio design (arch 0–3) × themes 0–4 × three widths at
  `live=1`;
- print every text node under `#root` that holds no marker, grouped by design and template.

At layout 2 it must find the five above, plus frame labels that belong to controls (list them;
they are not this ticket). If it finds **claims at other designs**, the question gains item 4.

**Decision** (one `AskUserQuestion`):
1. **The header's three** (the pill, the face card, the place card's body).
   - **A (recommended). Four header fields**, each seeded with the frame's exact copy, emptiable,
     `in: { Retro: [1], Lime: [1], Grunge: [1], Editorial: [1] }`: JP-037's shape. Keys, for
     example, `availability` (the pill), `faceTitle`, `faceBody` and `placeBody`. The seeded page
     does not move. Emptied: the pill drops; the face card's title and body each drop and the
     photo tile stays; the place card's body drops under the town.
   - **B. Drop the claims** (Retro's claim rule): the pill, "Performing since 2021." and the
     "120 mi" sentence go. That moves the fitted picture on four templates, and it leaves "The
     face of the act" a literal, which the tester reports as well.
   - **C. Compose them from other fields** (the place body from the map's `terms`, say). Not
     recommended: the sentences are prose, not facts, and a header reading the map is a new
     dependency for one line.
2. **The *since* sentence.**
   - **(a) (recommended). Plain copy.** `faceBody` is one field. Its hint says the bio's
     *Performing since* is a separate field, so the artist keeps them in step. The seeded diff is
     zero, and it is `KICKER_3`'s precedent.
   - **(b) Composed from the bio's `since`**, read across sections the way the calendar reads the
     pricing packages (`pageTiers()` → `sectionVm({ tiers })`): a `pageSince(sections)` threaded
     through the same five call sites, plus a harness parameter. Its costs: a seeded diff on every
     header layout 2 ("since June 2021" against the frame's "since 2021"); a new bio-to-header
     direction; the bio panel's "Not shown in this layout" under *Performing since* at bio layout
     2 becomes misleading, since the header now prints it; and the face card's body splits into a
     field plus a composed sentence.
3. **The bio's `/Featured`.**
   - **A (recommended). A bio field**, seeded `/Featured`, emptiable, `in: [1]`, every template
     (Pop included).
   - **B. Keep it a frame label** (the media player's "● Popular" rule), with a reply only.
4. *(Only if the census found more.)* The other designs' literals: fix them here in the same
   shape, or name them for a later batch. Recommend naming them, unless they are few and the same
   shape.

**Decided: A, (a), A, and name the rest** (user, 2026-09-28).
1. **Four header fields**, each seeded with the frame's text and emptiable.
2. **The *since* sentence is plain copy** inside `faceBody`, whose hint names the bio's
   *Performing since* as a separate field.
3. **A bio field for `/Featured`**, on every template.
4. **Retro header layout 5's claims are named for a later batch**, not fixed here.

Asked over the frames' own text, read before asking (`use_figma`, every text node of the 24
masters). All twelve header masters (Retro `964:64637` / `984:34438` / `984:34636`, Lime
`964:64580` / `986:11848` / `986:11867`, Grunge `964:64618` / `986:13753` / `986:13772`, Editorial
`964:64599` / `986:15658` / `986:15677`) type the four strings **byte for byte as our literals**:
`●` U+25CF, a straight apostrophe, `·` U+00B7, `textCase` ORIGINAL. All twelve bio masters type
`/featured` with `textCase` UPPER. Our literal is `/Featured` under `labelStyle`, which always
uppercases, so both render `/FEATURED`, and the seed keeps the literal. The bio masters also carry
"Manchester · Performing since 2021" under the photograph. The fit already prints `vm.roleLine`
there (the header's kicker and town), so that claim was re-seated before this ticket.

**The census** (`live=1`, all 150 renders, every header and bio text field and the bio's
identity keys set to markers, the artist's name `&name=` a marker too):
- **Layout 2 finds the five and nothing else but control labels.** Header arch 1 (and arch 5
  under Lime, Grunge and Editorial) prints the four header strings on Retro, Lime, Grunge and
  Editorial. Bio arch 1 prints `/Featured` on all five templates. Besides those it prints:
  - the Minimal nav's Music / Gigs / About (768 and 1440; JP-033's labels);
  - the bio's `⏵⏵` glyph;
  - under Pop, the initials placeholder `Z` (the marker name's initial, so derived, not a
    literal). Pop's header arch 1 prints none of the five, which confirms Pop never draws
    `HeaderV1`.
- **Claims at another design: Retro's header layout 5 alone** (`HeaderV4`, arch 4; the other
  templates fold arch 4 onto 0). It prints "4.9 ★" over "Experience" and "5 pcs" over
  "Line-up" (1440 and 768), and a "Tell me your date" pill that is a `<span>` on both surfaces.
  **Named, not fixed** (item 4): it is not this ticket's shape. The rating sits under an
  *Experience* label and the pill is a dead control, so both want a call on an undesigned layout.
- **Labels, not claims** (not this ticket):
  - the nav links, and Pop's `FlatNav` Music / Shows / Book;
  - bio layout 1's `[ 001 ] Structure · Bio_01`, `Bio` and `About`;
  - bio layouts 3 and 4's `Bio`, `Performing since:`, `Current role:`, `Based in:`,
    `[ About ]` and `Genres` *(fields since: [`retest-qa-fixes.md`](./retest-qa-fixes.md) JP-071,
    all but `Bio`)*;
  - the glyphs `↗` and `●` (Retro header layout 6).
- **One control label no field reaches: bio layout 4's `Listen`.** `ListenLink` prints `s.cta2`,
  which for the bio is `cv('cta2', 'Listen')` on the bio's *own* content. `FIELDS.bio` has no
  `cta2`, and the header's *Secondary button* does not reach it. So `FIELDS.header.cta2`'s comment
  ("Bio layout 4's Listen reads this key too") is wrong. The comment is corrected here, and the
  label is named for the later batch.

**Fix (on A, (a), A).**
- `data.js`: five constants beside `HERO_CTA`, **copied byte for byte from the literals** (the
  straight apostrophe in "you'll", the middle dot in the place line). Names such as `HERO_AVAIL`,
  `FACE_TITLE`, `FACE_BODY`, `PLACE_BODY` and `BIO_TAG`. The header's four rows go after
  `heroCta`, the bio's before `para1`. Each has a hint that says where it prints (JP-042's rule),
  and `faceBody`'s names the bio's *Performing since*.
- `sectionVm`: one `cv()` key each, **uncased**. Every site keeps the casing it applies today in
  its own style (`textTransform` under Grunge and Editorial, `labelStyle` for the bio's pill), so
  the seeded text cannot move. None of them has a per-layout seed, so `EditPanel`'s fallback
  chain needs nothing.
- `EncoreSection`: the ten sites (five per half) read the vm keys, and each drops when empty. The
  pill's `● ` stays in the markup. Both header pills are `nowrap` today (`:2066`, `:2370`), so the
  pill takes JP-036's `whiteSpace: 'normal'` and `maxWidth: '100%'` if a long value widens the
  390 page. Check first, and keep the seeded box.
- `reach.mjs`: five rows.

**Expected after-diff (named before the code): zero**, on both surfaces, themes 0–4, every header
and bio design, because each seed is the literal. The digest's text column stops at 40
characters, and the face card's body (60) and the place card's (57) run past it. So the proof is
the digest **and** a `textContent` comparison of the five nodes against HEAD: header arch 1 (and
the folded arch 5 under Lime, Grunge and Editorial) and bio arch 1, themes 0–4, three widths, both
surfaces.

**Verify.**
- **The seed.** Digest `header,bio` × themes 0–4 against the HEAD worktree: 0 files. The
  `textContent` check: identical.
- **Reach.** Each new key moves design 1 alone: the header's under Retro (arch 1) and Lime,
  Grunge and Editorial (arch 1 and 5); the bio's under all five templates.
- **States** (`live=1`, three widths, `scrollWidth` equal to the width in every one): each of the
  five emptied alone, and all together; each at 120 characters.
- **The census, re-run.** At layout 2, themes 0–4: no marker-less text node that is not a
  control's label.
- **The tester's steps**, in the real app on Grunge card 2: every Header and Bio text field
  changed, Publish, Open, at 1440 and 390. None of the five remains, and the bio's *Performing
  since* = `2019` leaves the header printing whatever `faceBody` says. Then Retro, Lime and
  Editorial card 2 once.

**Docs.**
- CLAUDE.md's *role and town* paragraph. Its "Layout 2's other three literals went the same
  way" sentence grows by the five.
- The `FIELDS.header` and `FIELDS.bio` comments, and the comment above `HERO_CTA`.
- `../lime/layout-2.md:521`: a "Reversed by JP-059" pointer, the way `../retro/layout-2.md`
  marks JP-037's reversal.
- The README, if its field list names the header's or the bio's fields.

**Settled.**
- **Five fields, each seeded with the literal it replaces.** The constants sit beside `HERO_CTA`:
  `HERO_AVAIL` ("Available for bookings"; the `● ` stays in the markup, rendered as one text node
  with the value), `FACE_TITLE`, `FACE_BODY`, `PLACE_BODY` and `BIO_TAG` ("/Featured").
  - **Header rows** (after `heroCta`): `availability` *Availability*, `faceTitle` *Face card
    title*, `faceBody` *Face card text* and `placeBody` *Place card text*. The two bodies are
    `area`s. Each has `in: { Retro: [1], Lime: [1], Grunge: [1], Editorial: [1] }` and a hint
    that says where it prints and that it drops when empty.
  - **`faceBody`'s hint names the bio's *Performing since*** as a separate field ("so change
    both if you name a year here").
  - **Bio row** (before `para1`): `tag` *Pill*, `in: [1]`.
  - **The view-model keys are uncased:** `vm.heroAvail`, `vm.faceTitle`, `vm.faceBody`,
    `vm.placeBody` and `vm.bioTag`. Every site keeps its own casing (the card title's
    `textTransform` under Grunge and Editorial, and `labelStyle` for the bio pill, which always
    uppercases). No key has a per-layout seed, so `EditPanel`'s fallback chain needed nothing:
    `fieldDefault` reads `d`.
- **The ten sites** (five per half) read the keys, and each drops when empty:
  - Both halves' `cardText` now drop an empty title or body, and the whole text column when
    both are empty. The card keeps its tile.
  - Side effect, named: **an emptied *Location* no longer spends the place card's gap.** Before,
    the title span was drawn empty.
- **Both pills wrap.** Measured before reaching for the fix: a 120-character value in the
  `nowrap` pills widened the page.
  - The header pill: 1216 / 1180 and 734 / 390 under Retro, 1214 and 732 under Grunge and
    Editorial, and at 768 as well under Lime (810).
  - The bio pill: at 768 and 390 on every template (Pop 1047 / 768).
  - Both took JP-036's `whiteSpace: 'normal'`, `maxWidth: '100%'` and
    `boxSizing: 'border-box'`, as `heroCta` has.
  - The seeded digest after the change is still zero.
- **Harness first.** The HEAD worktree on :5174 (an APFS clone of `node_modules`, its `.vite`
  removed) against the tree before the edit: 0 of 1,320. That is every category × themes 0–4
  × three widths × canvas and `live=1`.
- **Digest after: 0 of 1,320**, as named.
- **Text compare** (whole text nodes, which the digest cuts at 40 characters): header arch 1
  and 5 and bio arch 1, themes 0–4, three widths, both surfaces. **90 of 90 identical**, text
  nodes and their split alike. The tree prints the five as "● Available for bookings" (24),
  "The face of the act" (19), the face body (60) and the place body (56 characters; the triage's
  57 miscounted it), and "/Featured" (9).
- **Reach** (`reach.mjs`'s five new rows, themes 0–4, 6/6 renders each):
  - the four header keys: layout 2 under Retro, and layouts 2 and 6 (6 folding onto 2) under
    Lime, Grunge and Editorial. Nothing under Pop;
  - `bio.tag`: layout 2 on all five templates.

  The `in` values stand as written.
- **States** (594 renders; header themes 0–3 at arch 1, plus arch 5 under 1–3; bio themes 0–4;
  three widths; both surfaces):
  - Each of the five emptied alone, all four header fields emptied together, an emptied
    Location with and without the place body, and each field at 120 characters.
  - `scrollWidth` equals the width in every render, and no long value runs past its own box.
  - Each emptied field drops exactly its own line. The shots show the emptied cards as a tile
    alone, and the long pills wrapping inside their column and card.
- **The census, re-run** at layout 2 with the new keys as markers: header arch 1 and 5, and
  bio arch 1, on all five templates. It finds no bare text except these, all expected:
  - the nav's Music / Gigs / About (and Pop's `FlatNav`);
  - the bio's `⏵⏵` glyph;
  - Pop's derived initial.

  No bare `●`.
- **The tester's steps**, in the real app, on card 2 of Grunge, then Retro, Lime and Editorial.
  Every Header and Bio text field was typed over, the bio's *Performing since* set to `2019`, then
  Publish and Open.
  - The panel lists the five with their hints. None carries "Not shown in this layout" at
    card 2.
  - The canvas and the published tab at 1440 and 390 print no text but the markers, apart from:
    - the nav labels;
    - `⏵⏵`;
    - "Title", the second word of the marker name "ZQh2 Title", split by the two-tone title.
  - "2021" appears in neither section. `scrollWidth` equals the width, with no page errors.
- **Named, not fixed** (item 4 and the census):
  - Retro header layout 5's "4.9 ★ / Experience", "5 pcs / Line-up" and its dead "Tell me your
    date" pill.
  - Bio layout 4's `Listen`, which no field reaches.
  - The seeded coverage contradiction (the header's "120 mi" against the map's "12 mile radius"
    and "120 mi standard"): every one of those is now the artist's field.
- **Docs.**
  - CLAUDE.md's *role and town* paragraph: the five, uncased, dropping, the wrap, and "since"
    not the bio's.
  - `data.js`:
    - the comment under `HERO_CTA`;
    - the `FIELDS.header` head comment, naming Retro layout 5's exception;
    - the new rows' comments;
    - `cta2`'s comment, corrected: bio layout 4's Listen reads the bio's own `cta2`, not this.
  - `sectionVm` and `EncoreSection` comments at each site.
  - "Reversed by JP-059" at `../lime/layout-2.md`'s header Settled.
  - The README lists neither the header's fields nor the bio's (grep), so it is unchanged.

Reply: **fixed.** On layout 2 (*Feature spread*) the Header's *Available for bookings* pill, the
face card's title and text, and the place card's text are now Header fields: **Availability**,
**Face card title**, **Face card text** and **Place card text**. The Bio's */FEATURED* pill is a
Bio field, **Pill**. Each starts with the design's own words, each can be changed, and each
disappears when emptied.
- This is on every template that draws this layout (Retro, Lime, Grunge and Editorial). The Bio's
  pill is on Pop too.
- The header's "Performing since 2021" is part of *Face card text*, the artist's own words. It is
  not linked to the Bio's *Performing since*, and the field's help text says to change both.
- Two things found while checking, left for a later batch:
  - Retro's header layout 5 still prints two stats ("4.9 ★ Experience", "5 pcs Line-up") and a
    "Tell me your date" pill that no field reaches.
  - Bio layout 4's *Listen* label is not editable.

---

## End-of-pass sweep

1. Full digest against a `main` worktree on :5174 (port and `?t=` stamps normalised), all
   categories × themes 0–4 × three widths × canvas and `live=1`. Prove the harness first: the
   worktree at HEAD against the tree diffs to 0. Every diff must be one a Settled names (on A for
   JP-060, the 18 map files; on A for JP-059, none).
2. The census over every header and bio design on the final tree. List what remains, and carry
   anything named, not fixed, into the replies.
3. `reach.mjs` for the new keys and `map.radius`.
4. Walk Grunge card 2 in the real app and the published tab at 1440 / 768 / 390: every Header and
   Bio field changed, the map's field set to `100 mi`, and a gig picked. Then Retro, Lime and
   Editorial card 2 once.
5. `npm run build:standalone`, then `cp source/dist-standalone/index.html index.html`, in its own
   commit. Then a two-build digest (`build-digest.mjs`, reduced motion), whose diff should be only
   the named rows.
6. `plans/README.md`'s row, and one reply line per ticket for QA, headed by the
   retest-against-the-stamp line: retest against the Pages build whose `last-modified` is later
   than `Mon, 28 Sep 2026 10:09:10 GMT` (`curl -sI https://siniiitsa.github.io/js-plus-prototype-2/`).

**Settled** (2026-09-28, all six steps; the push, the PR, the merge and the build stamp are the
user's).
- **The harness.** Two worktrees in the scratchpad, HEAD (`ba7f0e2`) and `main` (`435f7c9`), each
  with an APFS clone of `node_modules` and its `.vite` removed, served on :5174 one at a time. The
  tree on :5173 (running since 2026-09-22) against the HEAD worktree: **0 of 1,320** (660 + 660:
  every category × themes 0–4 × three widths × canvas and `live=1`). Unnormalised, 191 files
  differed, every one the port in a `background-image` URL; no `?t=` stamps this time.
- **1. Full digest against `main`: 18 of 1,320 (9 + 9)**, exactly map `arch 1` × themes 1, 2, 3
  × three widths × canvas and `live=1`, as JP-060 named. Each file is one row, the travel card's
  chip: "● 12 mile radius" → "● Jul 12 · 22:00", 1.1 to 1.5px narrower and moved right by the
  same (Lime at 1440: x 523.6 → 524.9, w 100.1 → 98.9). Themes 0 and 4 and every other category
  are byte-identical, so JP-059 moves nothing.
- **2. The census** (a one-off `source/scripts/census.mjs`, deleted on the user's call). 150
  renders at `live=1`: header arch 0–5 and bio arch 0–3 × themes 0–4 × three widths. The markers
  are single `ZQ` words, so the two-tone title has nothing to split: all 13 header text fields,
  all 7 bio text fields (the credit as four words, since `vm.bioCredit` splits after the third),
  the bio's `&who=` kicker, location and tags, and `&name=`. Every marker-less text node is on
  JP-059's list, and nothing else is left. No placeholder or aria-label is marker-less, and no
  leftover is undrawn.
  - The nav labels. *Follow my sections*' nine (About … Reviews) at arch 0, 3 and 4 at 1440, and
    at 768 too under Retro's arch 4 and 5. Minimal's Music / Gigs / About at arch 1 and 2 (and 5
    under Lime, Grunge and Editorial, folding onto 1) at 1440 and 768. Pop's `FlatNav` Music /
    Shows / Book at every arch and width.
  - The glyphs: `⏵⏵` (bio arch 1), `↗` (bio arch 3), and `●` (Retro header arch 5).
  - `Z`, the marker name's initial, so derived: Pop's header arch 1 and 4 and bio arch 1, and bio
    arch 0, 2 and 3 on every template.
  - Bio layout 1's `[ 001 ] Structure · Bio_01`, `Bio` and `About`. Bio layouts 3 and 4's `Bio`,
    `Performing since:`, `Current role:`, `Based in:`, `[ About ]`, `Genres` and `Performing
    since`. Bio layout 4's `Listen`.
  - Retro header arch 4 (layout 5): `4.9`, `Experience`, `5 pcs` and `Line-up` at 1440 and 768,
    and `Tell me your date` at every width.
- **3. Reach.** `reach.mjs` on a scratch copy filtered to the six rows, themes 0–4, 1,920 renders.
  `map.radius` moves layouts 1–4 on all five templates. The four header keys move layout 2 under
  Retro, layouts 2 and 6 under Lime, Grunge and Editorial, and nothing under Pop. `bio.tag` moves
  layout 2 on all five. Each is 6/6, so the `in` values stand.
- **4. The real app** (a one-off puppeteer script, deleted). Card 2 of Grunge, then Retro, Lime
  and Editorial. Every Header and Bio text field was typed over with a marker (the name one
  word), the bio's *Performing since* set to `2019`, and Events Map → Coverage set to `100 mi`
  (its hint reads as JP-060 wrote it). Then the canvas at Desktop / Tablet / Mobile, Publish,
  Open, and the tab at 1440 / 768 / 390.
  - **The panel.** On Grunge, Lime and Editorial, "Not shown in this layout" sits under Kicker,
    Tags and Badge text, and the bio's Heading, Paragraph 2 and Performing since. Under Retro it
    is the same less Badge text, which its layout 2 reads. None of the five new fields carries it.
  - **Both surfaces, every width, all four templates.** The header prints no bare text but
    Minimal's Music / Gigs / About (nothing at 390, where the burger stands), and the bio prints
    only `⏵⏵`. "2021" appears in neither. The map prints `100 mi` once and "12 mile radius"
    nowhere, and the chip reads "● Jul 12 · 22:00".
  - **The pick.** At 1440 and 768, *The Deaf Institute* moves the chip to "● Jul 25 · 21:00";
    at 390, *Gorilla* moves it to "● Aug 30 · 23:00". Max travel reads `100 mi` before and after
    each. `scrollWidth` equals the width, with no page errors in either window.
  - **Shots.** Grunge's header and bio at the three widths show every marker in its seat, the
    bio carrying the header's tag chips as identity.
  - Seen in passing: the 768 pick survived the resize to 390, where JP-060 saw 1440 → 390
    re-feature the first gig. Not this batch's.
- **5. `index.html`** refreshed in `7f281a7` (8,750,312 bytes, up from 8,748,860), from
  `npm run build:standalone`. The two-build digest (`build-digest.mjs`, both files from
  `127.0.0.1:8931`, reduced motion) was proved first: the old build walked twice diffs to 0 of 16
  on card 1's page and on card 2's (`CARD=1`). Old against new:
  - card 1's page: 0 of 16;
  - card 2's page: 9 of 16, the chip row alone under Lime, Grunge and Editorial at each tab,
    with the harness digest's deltas. Retro and Pop, and the modal's card counts, are unchanged.
- **6.** `plans/README.md`'s row, and the replies below. At the sweep the deployed build still
  read `Mon, 28 Sep 2026 10:09:10 GMT`, 8,748,860 bytes, which is the tester's.

**Replies to QA, one line per ticket.** **Retest against the Pages build whose `last-modified`
is later than `Mon, 28 Sep 2026 10:09:10 GMT`** (the build these reports were filed against,
8,748,860 bytes; `curl -sI https://siniiitsa.github.io/js-plus-prototype-2/`). An older tab or
cached build will still show both.
- **JP-060 — fixed.** The field is now called **Coverage** (it was *Coverage badge*), with a help
  text that says where each Events Map layout prints it; on layout 2 that is *Max travel*. On
  Grunge, Lime and Editorial the travel card's chip printed the same field a second time. The
  chip now shows the date and set time of the gig the panel features, as Retro's always has, and
  it follows the visitor's pick. The design's *Confirmed* is a booking status the page cannot
  know, so it stays out by design. For the design's Max travel, type `100 mi` into Coverage.
- **JP-059 — fixed.** On layout 2 (*Feature spread*), the header's *Available for bookings* pill,
  the face card's title and text, and the place card's text are now Header fields
  (**Availability**, **Face card title**, **Face card text**, **Place card text**). The bio's
  */FEATURED* pill is a Bio field, **Pill**. Each starts with the design's words and disappears
  when emptied, on every template that draws the layout (the Bio's on Pop too). "Performing since
  2021" is part of *Face card text* and is not linked to the Bio's *Performing since*; the help
  text says to change both. Left for a later batch: Retro's header layout 5 still prints "4.9 ★
  Experience", "5 pcs Line-up" and a "Tell me your date" pill that no field reaches, and Bio
  layout 4's *Listen* label is not editable.
