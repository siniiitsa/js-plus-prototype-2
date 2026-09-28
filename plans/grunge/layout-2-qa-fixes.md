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
| 2 | JP-059 | Header and Bio print five texts no field reaches | **Confirmed, and shared**: literals in `HeaderV1`'s two halves (Retro, Lime, Grunge, Editorial) and in both bio layout-2 bodies (every template, Pop included). Lime's fit kept them on purpose | M | **yes** — fields or drop, the *since* sentence, `/Featured` | open |
| 3 | — | End-of-pass sweep | — | S | — | open |

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

**Settled.** *(open)*

Reply: *(written once decided)*.

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

**Settled.** *(open)*
