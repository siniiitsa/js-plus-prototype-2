# Lime layout 3 QA fixes — bug-by-bug plan

Working checklist for a batch of QA reports against the **Lime template, layout 3** (card 3 of the
setup modal). It works like [`layout-2-qa-fixes.md`](./layout-2-qa-fixes.md): **one entry per
session, with context cleared between sessions**, and each session writes what it settled back
into this file. Nothing here is a fit. Each entry is a behaviour or editor defect, and the fix has
to leave every fitted picture unchanged unless the entry says otherwise.

**Read first, every session:** [`CLAUDE.md`](../../CLAUDE.md), then this file, then *How each
session runs* and *Verification harness* in `../retro/qa-fixes.md` (the harness it built —
`&cj=`, `&today=`, `&who=` — is what these sessions drive), then the memory notes
`verifying-the-published-tab` and `browser-tool-choice`. [`layout-3.md`](./layout-3.md) holds the
Figma node ids of every layout-3 frame; read it only where an entry sends you to a frame.

Branch: **`lime-layout-3-qa-fixes`, forked from `main`** (`dd31711`). One commit per entry
(`Fix JP-049: …`).

**Report IDs are the tester's own** (JP-048 …). JP-043 … JP-047 were not handed over, so do not
renumber. The tester cites **JP-045** twice as "the canvas does not show what the visitor gets"
(its example: Tickets → drawn on every map row on the canvas, including rows whose link is empty or
refused). It is not in this batch and no entry here fixes it; but three of these four tickets are
that complaint in another section, so every entry below is held to **canvas and `live=1` agree**.
The tester's screenshots are in the hand-over message, not the repo.

**Most of this is not Lime's.** All four defects live in `sectionVm`, `data.js` or `EditPanel`,
so Retro, Grunge and the flat two move with them. The tester happened to be on Lime layout 3.

## Status

| Order | ID | Report (short) | Verdict | Size | Decision needed? | Status |
|---|---|---|---|---|---|---|
| 1 | JP-049 | Enquiry Form's Email address takes `not-an-email` and the submit mails it | **Confirmed**: every other address box validates, this one does not | S | no | **done** |
| 2 | JP-048 | Three *Add package* clicks publish three blank cards, the last one lime and FEATURED | **Confirmed**; the FEATURED seat is working as documented, the defect is that a blank row renders | M | **yes** — what counts as blank | **done** |
| 3 | JP-051 | An empty form-field row publishes an unlabelled box | **Confirmed**; JP-048's family, applied to the form | S | **yes** — the guarded email row | **done** |
| 4 | JP-050 | Emptying the header Title publishes the sample name in eight slots and nothing in the h1 | **Half documented, half defect**: the fallback is CLAUDE.md's rule; the h1 disagreeing with it is a bug | M | **yes** — what an empty name means | **done** |
| 5 | — | End-of-pass sweep | — | S | — | open |

**Why this order:** JP-049 is the only entry with no decision and one seam. JP-048 before JP-051
because it defines the blank-row rule (a helper in `data.js`) that JP-051 reuses. JP-050 last: it
cannot start without an answer from the user, and it moves the most digest files (every section
that prints the name).

**"Decision needed"** means the entry lists options with a recommendation. The session starts by
asking the user (one `AskUserQuestion`) and records the answer under **Decision** before writing
code.

## How each session runs

As `layout-2-qa-fixes.md`, with these differences:

1. Re-check the *Evidence* line numbers; they are from the triage (2026-09-23, `dd31711`) and
   will drift.
2. **Every template, not Lime first.** None of these seams is inside an `s.lime` block. Verify
   Lime, Retro and Grunge (themes 1, 0, 2) and say in the commit that all of them moved.
3. Verify at **all three widths** and on **both surfaces** (canvas and `live=1`); digest before
   and after (`scripts/digest.mjs`, themes `0,1,2`). A chrome-only change must be byte-identical.
   **The seeded harness never has a blank row or an empty title**, so a digest proves only that
   the seeded page did not move. Each entry names the `&cj=` override that reproduces the ticket,
   and that is what proves the fix.
4. **Canvas and published agree.** Whatever an entry drops or falls back, it does in `sectionVm`
   on both surfaces unless the entry says why not, and the Settled says which it chose.
5. A new or re-scoped field gets a measured `in` (`source/scripts/reach.mjs`: add a row to
   `PROBES`, do not rebuild it).
6. Update the docs the entry names. Commit, fill in **Settled** and the status row, then print
   the hand-off prompt for the next entry and stop.

**Do not refresh the root `index.html` per bug.** The sweep does it once.

---

## JP-049 — the enquiry address is never checked

> Enquiry Form → Email address = `not-an-email`, accepted with no mark. The field's own hint says
> "Enquiries are mailed here: the button opens the visitor's mail app with the form filled in." —
> so the published submit is `mailto:not-an-email`. Control: the map's Tickets link refuses
> `javascript:void(0)` and `QA not a url at all`, passes `https://…`, and prefixes `https://` to
> `example.com/…`.

**Verdict: confirmed.** Every address box in `EditPanel` is a `UrlInput` that says on blur why
`urlProblem()` refuses it, and every outbound href goes through `extUrl()`, which turns a refusal
into `''`. The one address the whole page points at is a plain text box with neither.

**Evidence.**
- `data.js:1280` — `FIELDS.form.email` has no `type`, so `EditPanel` draws a plain input.
- `EncoreBuilder.jsx:1307` — `vm.formEmail = String(cv('email', …)).trim()`, no check.
- `data.js:1477` — `enquiryMailto()` refuses only an empty address.
- `data.js:~1426` — `urlProblem()` already has an email test in its `mailto:` branch
  (`/^[^@]+@[^@]+\.[^@]+/`), and `formErrors()` (`data.js:1501`) has one for the visitor's email
  box. Two predicates for one question; read both before writing a third.
- `EncoreBuilder.jsx:~1975` — `UrlInput`: the on-blur reason under the box.

**Fix.**
- One `emailProblem(v)` in `data.js` beside `urlProblem()`: `null` for empty or valid, else the
  reason ("That email address looks incomplete."). `urlProblem`'s `mailto:` branch and
  `formErrors`' email check call it, so the editor, the link rules and the visitor's form all
  accept the same addresses.
- `sectionVm` folds a refused address to `''` (`vm.formEmail`), so the submit goes back to being a
  span: the existing empty-address path and the Soundcloud rule, nothing new downstream. The
  confirmation panel prints `vm.formEmail`, so it can never show a refused address either.
- `EditPanel`: the field gets `type: 'email'` and an `EmailInput` (or `UrlInput` taught the kind,
  whichever reads better), printing the reason on blur. The hint gains "An address that isn't
  valid also leaves the button a picture."
- **Sweep the class:** grep `FIELDS` for any other field that holds an address or number and is
  not a `UrlInput` (bookings email, phone, anything with `@` or `tel` in its default). Fix what
  it finds, list what it does not.

**Verify.** `&cj=` with `form.email` = `not-an-email`, `a@b`, `a@b.co`, `  a@b.co  `,
`mailto:a@b.co`: the submit is a span for the first two on both surfaces, an `<a>` with
`mailto:a@b.co?…` for the last three (decide whether a pasted `mailto:` prefix is stripped or
refused, and say which). Editor: the reason appears on blur and clears when fixed. Digest
byte-identical on the seeded page (the seed address is valid).

**Docs.** CLAUDE.md's enquiry-form paragraph ("An empty `email` composes to `''`" → empty or
refused), the `FIELDS.form.email` hint, `enquiryMailto`'s comment.

**Settled** (2026-09-23). Evidence lines had not drifted from the triage.

- **One predicate, built on what was there.** `emailProblem(v)` in `data.js`, beside
  `urlProblem()`: trim, drop a leading `mailto:` (any case), then one `@` with a non-empty local
  part free of whitespace, `?` and `#`, and a domain `URL_HOST` would link (which refuses `?`,
  `#`, `/`, `:` and demands a dot). `null` for empty or valid, else "That email address looks
  incomplete.". Its sibling `emailAddr(v)` is `extUrl()`'s shape: the bare address or `''`.
  `urlProblem`'s `mailto:` branch now asks it of the part before `?`, **split on commas** so a
  footer `mailto:a@b.co?subject=Hi` or a two-recipient link still passes (the old unanchored test
  passed both; an anchored one would have regressed them). `formErrors`' email rows ask it too,
  so a visitor's `a@b.co?x` or `a#b@c.co` is now refused where it passed before — harmless, and
  the three sites now agree.
- **A pasted `mailto:` prefix is stripped, not refused**: `mailto:a@b.co` composes
  `mailto:a@b.co?…`. The editor accepts it on blur for the same reason (the one predicate).
- **`sectionVm`**: `vm.formEmail = emailAddr(cv('email', …))`, so a refused address is the empty
  address's existing state on both surfaces. The nine `s.formEmail` print sites in `EncoreSection`
  are all `sent` panels, reachable only through a linked submit, so none can print a refused
  address and none needed touching.
- **Editor**: `FIELDS.form.email` is `type: 'email'`, drawn as `UrlInput` taught a `check` prop
  (default `urlProblem`) — `check={emailProblem}`. The hint gained "An address that isn't valid
  also leaves the button a picture." `in` unchanged (the key's reach did not move).
- **Class sweep**: nothing else found. Every other artist address is already a `UrlInput`
  (Soundcloud, the three social links, a track's audio, a gig's link, a footer link's url);
  `FORM_FIELDS`' `you@email.com` is the visitor's placeholder; `map.expand` ("Map link") is a
  label; no field holds a phone number.
- **Verified.** Pre-fix (stash): `live=1`, `not-an-email` → `href="mailto:not-an-email`.
  After, `cat=form` × layouts 1–4 × themes 0, 1, 2 × three widths (36 renders a value):
  `live=1` links none for `not-an-email` and `a@b`, and `mailto:a@b.co?…` for `a@b.co`,
  `  a@b.co  ` and `mailto:a@b.co`, 36/36 each. The canvas never links (it is a picture) and its
  HTML is identical for `not-an-email` and `a@b.co` in all 36, so the two surfaces agree. Editor
  (puppeteer on `:5173`): no line while typing, the reason on blur with `aria-invalid`, cleared on
  correction, none for `mailto:a@b.co`. Digest themes 0, 1, 2, canvas and `live=1`: 774 renders,
  byte-identical to before (the seed address is valid). Retro, Lime and Grunge all moved together;
  nothing is template-gated.
- Docs: CLAUDE.md's enquiry-form paragraph, README's matching sentence, the field hint,
  `enquiryMailto`'s and `FIELDS`' header comments, `UrlInput`'s comment.

---

## JP-048 — blank packages publish as cards, and the last one takes FEATURED

> Pricing → *Add package* ×3 → Publish. Under The Festival Set (which loses its FEATURED badge):
> three empty outlined rows carrying only BOOK NOW, the last filled lime with FEATURED and no text.
> The control with the three real packages is correct.

**Verdict: confirmed.** The seat is doing what CLAUDE.md says — "the last row *on show* is filled
… hiding the artist's last package promotes whatever now ends the stack" — so the FEATURED move
is a consequence, not the defect. The defect is that a row with nothing in it is a package: it
renders a card, a Book pill and a hue on both surfaces, in every pricing layout and every template.

**Evidence.**
- `EncoreBuilder.jsx:748–749` — `tierList` maps every row into `vm.tiers`; nothing drops a blank
  one. `n: i` is the row's index in the whole list and **keys the card** (the cross-fade rule).
- `EncoreSection.jsx:8498` (Lime / Grunge block) and `:8711` (Retro's) —
  `feat = shown.length > 1 && i === shown.length - 1`.
- `EncoreBuilder.jsx:2429` / `:2514` — `TiersField` adds a row of empty strings.
- Layouts 1, 2 and 4 draw the same blank row their own way (a blank deck card, a blank chip in
  layout 2's package row, a blank service row) — confirm each on the repro.

**Decision.** What is a blank package?
- **A (recommended) — a row with every field empty** (`name`, `price`, `tags`, `blurb`, `feats`,
  all trimmed). The one reading that can never discard something the artist typed. A row with
  only a price still renders; that is the artist's content.
- **B — a row with no name and no price.** Closer to "a card a visitor can use", but drops a
  row whose blurb and features the artist has filled.
- **C — drop on the published page only**, keep the blank card on the canvas as a "you added
  one" cue (the footer's missing-section rule). Not recommended: it is exactly JP-045's
  complaint.

**Decided (user, 2026-09-23): A** — a row with every field empty.

**Fix (on A).**
- `blankRow(row, keys)` in `data.js` — every named key trims to empty. JP-051 and the sweep reuse
  it.
- In `sectionVm`, drop blank rows **before** the map assigns `n`… but `n` must stay the row's index
  in the artist's list if anything else indexes by it — check what reads `t.n` besides the key
  (the hue walk is positional too: `(3 - i)`). Either filter first and let `n` / the hue follow
  the rendered list (a blank row then changes no hue), or map first and filter after keeping `n`.
  Pick the one under which three blank rows appended to the seed leave the seeded three cards
  byte-identical, and say which.
- `vm.tierChips` (`:817`) reads `tierList` directly — feed it the filtered list, or a blank row's
  (empty) tags could matter to it.
- `TiersField` keeps the row (the artist is mid-edit), and says under it "Empty packages aren't
  shown." — the `LinksField` "Section not on the page" precedent.
- With the rows gone, the FEATURED seat lands back on the last real package by construction; do
  not touch the seat rule.

**Verify.** `&cj=` = the seed + three `{}` rows (the tester's three clicks), pricing designs 0–3 ×
themes 0, 1, 2 × three widths × both surfaces: byte-identical to the seed. Then one row with only
`price`: renders. Seeded digest byte-identical.

**Docs.** CLAUDE.md's pricing paragraph (the seat) and the structured-editor bullet's `TIERS`
sentence ("an emptied array means none" gains "and a blank row is not a row"), `TiersField`'s
comment.

**Settled** (2026-09-23). Evidence lines had not drifted, except `TiersField` (its
add row was `:2440` at `90a661f`, `:2450` after this commit; `tierList` is now `:752`).

- **The helper is `blankRow(row, keys)` in `data.js`, beside `tierFeats`**: true when every
  named key trims to empty — a missing key, a `null` row and a lone newline in `feats`
  included. Not package-specific: the package's keys are a separate `TIER_KEYS` (all five, next
  to `TIERS`), so JP-051 passes its own list.
- **Filter first, then map.** `tierList` is `(c.tiers ?? TIERS).filter(!blankRow)`, so `n`, the
  `(3 - i)` hue walk and `vm.tierChips` (which reads `tierList`) all follow the rendered list. It
  is the only order under which a blank row *anywhere* — not just appended — leaves the page
  byte-identical to the page without it; map-then-filter would have kept the hues of the rows
  after a mid-list blank but shifted nothing else, while making the canvas depend on a row it
  does not draw. Nothing but the card key reads `t.n`. The seat rule is untouched: FEATURED lands
  back on the last real package by construction.
- **Both surfaces drop it** (the plan's rule 4); the canvas no longer draws the blank card, which
  is the JP-045 complaint not repeated. `tiersVal` in `EditPanel` is unchanged — the repeater
  must still list the row — and `TiersField` prints "Empty packages aren't shown." under a blank
  row (`BLANK_TIER_HINT`), gone as soon as any field has a character. The "n of max" footnote
  still counts it, since the row still spends a slot.
- **Verified.** Digest themes 0, 1, 2, all cats × layouts × widths, canvas and `live=1`: 387 +
  387 renders byte-identical before/after. With a scratch copy of `digest.mjs` that names files
  without the `&cj=` part, `cat=pricing` × layouts 1–4 × themes 0, 1, 2 × three widths (36 per
  surface), after the fix: the seed + three blank rows (`{}`, all-`''`, and `'  '` / `'\n'`) is
  byte-identical to the seed on 36/36 canvas and 36/36 live; a blank row *between* seed rows 1
  and 2 likewise 36/36 + 36/36; before the fix all 144 differed (Lime layout 3 live: 6 pills
  where the seed has 3). A row with only `price: '£99'` still renders a fourth package (differs
  from the seed, 36/36 each surface, and identical to its pre-fix rendering). End to end (one-off
  puppeteer, deleted): Lime card 3 → Pricing → *Add package* ×3 → three hints, footnote "6 of
  6" → Publish → Open: the published stack names the three seeded packages only, FEATURED on
  The Festival Set, no page errors. Retro, Lime and Grunge all moved together; nothing is
  template-gated.
- Docs: CLAUDE.md's pricing layout-3 seat sentence and the structured-editor bullet ("a blank
  row is not a row"), README's pricing paragraph, `TiersField`'s header comment.

---

## JP-051 — a blank form field publishes an unlabelled box

> Enquiry Form → add a field → leave it empty → Publish. Five boxes: NAME, EMAIL, EVENT DATE,
> GUESTS and a fifth with `placeholder=""` right above CHECK AVAILABILITY. Nothing tells the
> visitor what goes in it. Related to JP-048, filed separately (another section, another symptom).

**Verdict: confirmed**, and worse than it looks: `formErrors()` makes every box required, so the
visitor cannot send the form without typing something into a box that names nothing.

**Evidence.**
- `EncoreBuilder.jsx:1345–1350` — `vm.formFields` normalises every row and drops none;
  `vm.formRows`, `vm.formMailto` and `vm.formCheck` all read it, so filtering it keeps the three
  index-aligned.
- `data.js:1501` — `formErrors`: every box required.
- Layouts 2 and 3 print only the label (as the in-box placeholder); layouts 1 and 4 print label
  above and placeholder inside. So "blank" is **label and placeholder both empty** in 1 and 4, and
  **label empty** in 2 and 3 — or one rule for all four (decide below).
- `FormFieldsField` (`EncoreBuilder.jsx:2552`) guards the last `email` row against removal and
  retyping, not against an emptied label.

**Decision.**
1. **Which rows drop.** **A (recommended):** JP-048's `blankRow` over `label` + `placeholder` —
   one rule for every layout, so the canvas and published tab of any layout drop the same rows.
   Its cost, named: in layouts 2 and 3 a row with only a placeholder draws that placeholder,
   which those layouts otherwise never show — i.e. they fall back to it, rather than drop. **B:**
   drop per layout on the key that layout reads — more exact, but a row then exists in one layout
   and not another, which the reach tables would have to say.
2. **The guarded email row.** It is the reply address; dropping it would leave the form with none,
   which is what the guard exists to stop. **Recommended:** it never drops — an emptied label
   falls back to "Email" (the layout-2 `cta` → `button` precedent), resolved in `sectionVm` so the
   mailto body prints the same word.

**Decided (user, 2026-09-23): 1 → A**, `blankRow` over `label` + `placeholder`, one rule for
every layout; **2 → the recommendation**: the guarded email row never drops, and an emptied label
falls back to "Email" in `sectionVm`, so the box and the mailto body print the same word.

**Fix.** Filter in `sectionVm` with `blankRow`, the email exception applied first. `FormFieldsField`
says under a blank row "Empty fields aren't shown." and under an emptied email label "Shown as
Email." Then **sweep the family**: songs, tracks, gigs, quotes and links — for each, what a blank
row renders on both surfaces today (the tester's JP-045 map rows are one: a gig with no link still
draws Tickets → on the canvas). Apply `blankRow` where the row is wholly empty and renders a live
or misleading control; record the rest with the reason. The JP-045 canvas/published split for a
*non-blank* row with a refused link is **not** this entry's.

**Verify.** `&cj=` = the seed + one `{}` row: form designs 0–3 × themes 0, 1, 2 × three widths ×
both surfaces byte-identical to the seed; submit with the four real boxes filled opens the mailto.
The email row with an emptied label: a box labelled Email, a body line `Email: …`. Seeded digest
byte-identical.

**Docs.** CLAUDE.md's enquiry-form and structured-editor bullets, `FormFieldsField`'s comment.

**Settled** (2026-09-23). Evidence lines had drifted with JP-049 / JP-048: at `fe3e34c`
`vm.formFields` was `EncoreBuilder.jsx:1353`, `formErrors` `data.js:1535`, `FormFieldsField`
`:2573`.

- **The form.** `FORM_FIELD_KEYS = ['label', 'placeholder']` beside `FORM_FIELDS` — not `kind`, a
  select that always holds a value. `sectionVm` filters `formList` before the map, so `formRows`,
  `formMailto` and `formCheck` stay index-aligned. **The exception is the same test as the
  editor's guard**: `kind === 'email'` with exactly one email row in the *raw* list
  (`FormFieldsField`'s `lastEmail`), so the panel never says "Shown as Email." under a row the vm
  drops; that row is never blank, and an emptied label resolves to `FORM_EMAIL_LABEL` ("Email",
  the seed's own word, in `data.js`). With two email rows neither is guarded and a blank one drops
  like any other. `FormFieldsField` prints "Empty fields aren’t shown." under a blank unguarded row
  and "Shown as Email." under the guarded row's emptied label (beneath the guard's own hint).
- **The sweep: all five families qualified, so all five take `blankRow`, filter-first.** Measured
  pre-fix with the seed + one wholly blank row (the repeater's own *Add* shape), each layout ×
  themes 0, 1 × 1440 / 390 × both surfaces, counting nodes, `cursor: pointer` and `a[href]`:
  **songs** — an empty row in layouts 1, 3 and 4 (pointer-live in the published tab) and one more
  song in the heading's count; **tracks** — a card in all four layouts, clickable live, loading
  nothing, and a seat the fan and transport step through; **gigs** — a row in layouts 1–3 that
  lights a pin live (layout 4's ticker pages to it); **quotes** — layout 2's rail gains a numbered
  tile that pages to an empty card, layout 3's wall an empty cell counted in the stat, layouts 1
  and 4's arrows page to an empty card; **links** — an empty pointer span on both surfaces that
  also skews the halving. Keys beside each seed: `SONG_KEYS`, `TRACK_KEYS` (art and sound
  included — a track with only a sound file is a track), `GIG_KEYS`, `QUOTE_KEYS`, `LINK_KEYS`
  (`label` + `url`, not `to`, `FORM_FIELD_KEYS`' reason — so a section-aimed row with its label
  emptied drops too: it prints nothing to click). Each repeater prints its own "Empty … aren’t
  shown."; the repertoire heading's `EditPanel` fallback counts the filtered list, sectionVm's
  twin. After: all 136 sweep cells zero.
- **Not this entry's:** a *non-blank* row that still prints an invisible control (a footer `link`
  row with an address and no label; a form row with only a placeholder, which layouts 2 and 3 fall
  back to — Decision A's named cost) and JP-045's refused-link split.
- **Harness:** `digest.mjs` now strips `&cj=…` from the file name (ENAMETOOLONG otherwise); the
  override's content lives in the label. Documented in the file's usage lines.
- **Verified.** Seeded digest themes 0, 1, 2, canvas and `live=1`: 387 + 387 byte-identical
  before/after. `cat=form` × layouts 1–4 × themes 0, 1, 2 × three widths: the seed + one `{}`
  row, and the seed with the email label emptied, are each byte-identical to the seed on 36/36
  canvas and 36/36 live (pre-fix: 36 + 36 and 36 + 18 differed). Synthetic submit (every labelled
  box filled, a capture listener swallowing the mailto navigation), 4 layouts × 3 themes: pre-fix
  0/12 sent — the unlabelled fifth box blocked it; after, 12/12 sent, `href` composed as
  `…?subject=…&body=Name: …\r\nEmail: fan@example.com\r\n…`. The emptied email label drew
  `EMAIL` / `you@email.com` boxes and an `Email:` body line (pre-fix: an unlabelled box in layouts
  2 and 3 and a `Detail:` line). In the editor (one-off puppeteer, deleted): each of the six
  repeaters' *Add* shows its hint; clearing the email label shows "Shown as Email.". Retro, Lime
  and Grunge moved together; nothing is template-gated.
- Docs: CLAUDE.md's guarded-row sentence and the structured-editor bullet (all seven repeaters,
  the `*_KEYS`), README's enquiry-form paragraph, `FormFieldsField`'s header comment.

---

## JP-050 — an empty Title publishes the sample name, except in the h1

> Header → clear Title → Publish. A/B on one field: `QATITLE Jane Smith` ×12 on the page, `Kai
> Mercer` ×0; emptied, `QATITLE` ×0, `Kai Mercer` ×8 and `document.title = Kai Mercer`. Eight slots
> take the sample persona (`<title>`, header wordmark, inset card, bio strip, player credit,
> review byline, footer wordmark, `© 2026 Kai Mercer`); the h1 at y615, 107px, renders `""` at 0px
> high. Major: the artist's own name is the page's core data, silently wrong.

**Verdict: half by design, half defect.** The fallback is the documented rule (CLAUDE.md, *The
artist's name is the header's `c.title`*: "trimmed, falling back to the prop when empty"), and in
the real product the prop is the logged-in artist's profile name, not a stranger's. In this
prototype the prop is the seed `'Kai Mercer'` (`EncoreBuilder.jsx:3898`), which is why the tester
reads it as someone else's name. **The h1 disagreeing with the other eight slots is a defect under
any reading.**

**Evidence.**
- `EncoreBuilder.jsx:3982` — `artistName = String(header.c.title ?? '').trim() || profileName`.
- `EncoreBuilder.jsx:420` — `vm.heroTitle = cased(cv('title', artistName))`: `cv` returns the
  stored `''`, so the h1 is empty. `vm.brand` (`:419`), `vm.badgeText` (`:445`), the player's
  `by` (`:682`), `vm.copyright` (`:1388`), `doc.title` (`:3860`, `:4027`) all read the derived
  name.
- `EncoreBuilder.jsx:3089` — the panel's Title fallback is `artistName`, but `val` is the stored
  `''`, so the box shows empty while the page shows Kai Mercer.

**Decision.** What does an empty Title mean?
- **A — required.** The Title cannot be left empty: on blur an emptied box restores the last name
  (or keeps the empty box red with "Your name is required" and Publish says why). The h1 takes the
  same `artistName` as the other eight. No slot ever falls back. **Recommended**: the name is the
  one field the whole page is built from, and there is no honest picture of a page with none.
- **B — fallback everywhere, visibly.** Keep the documented rule, make the h1 read `artistName`
  too, and have the panel show the fallback as the box's placeholder with the hint "Empty uses
  your profile name, Kai Mercer." Consistent, and correct in production; still publishes the seed
  name in the prototype, which is what the tester rated Major.
- **C — empty means none.** `artistName` becomes `''`; every reader needs an empty path (the
  wordmark, `initialsOf`, `copyrightOf`, bylines, the badge, the seal text, `<title>` falling back
  to something generic). Largest diff, and several frames have no picture of a missing name.

**Decided (user, 2026-09-23): A** — the Title is required; the h1 reads the one resolved name.

**Fix.** Whichever is chosen: `vm.heroTitle` and every other slot read one resolved name, and the
panel shows what the page prints. Audit with `grep -n artistName` in both files (and `initials`,
`brand`), and add an empty-title row to the `&cj=` repro covering every section.

**Verify.** `&cj=` with header `title: ''` and with `title: '   '`: count the name on the page on
both surfaces at three widths, and read the popup's `document.title` after Publish (the
`verifying-the-published-tab` note). Under A, also the editor: clear the box, blur, Publish.
Seeded digest byte-identical.

**Docs.** CLAUDE.md's *artist's name* bullet (rewritten to the decision), README's matching
passage, `FIELDS.header.title`'s comment.

**Settled** (2026-09-23). Evidence lines had drifted ~+11 in `sectionVm` and ~+90 below it: at
`0b7e497` `vm.heroTitle` was `EncoreBuilder.jsx:420`, the player's `by` `:687`, `vm.copyright`
`:1418`, the panel's fallback `:3176`, `doc.title` `:3949` / `:4116`, the derivation `:4071`.

- **The slots** (the expected after-diff, audited before the code): `vm.brand` — the wordmark
  and nav brand (`Wordmark`, `FlatNav`, `NavBar`, `InsetCard`), and the name printed by the bio,
  the calendar, the gallery, the testimonials' stat card, the enquiry form and the footer;
  `vm.initials` — `Photo`'s placeholder, `LogoMark`, the bio; `vm.badgeText` — `SealBadge`;
  `NOW_PLAYING.by` — the player's credit; `vm.copyright`; `vm.heroTitle` — the h1 (`Title`,
  `FlatHeader`); and outside `EncoreSection`, the published `<title>`, the publish dialog's line
  and `siteSlug()`. Every one but the h1 already read the derived `artistName`; the h1 read the
  stored `c.title`, so an emptied Title blanked it alone. That was the whole defect.
- **The name.** `nameOf(title, fallback)` beside `initialsOf` is the one derivation: the
  builder's `artistName` is `nameOf(header.c.title, profileName)`, and `sectionVm` resolves a
  header's own `name` the same way (any other section takes `artistName`), so `vm.heroTitle` is
  `vm.brand` and a header preview or a harness `&cj=` cannot split the h1 from the wordmark,
  badge and initials. The header's `vm.badgeText` fallback reads `name` too; `badgeText`'s own
  emptiable semantics (behind `showBadge`) are untouched.
- **Required, in the editor.** `NameInput` (beside `UrlInput`) holds an emptied or all-space box
  as a local draft and never commits it: the page keeps the last name meanwhile, a grey line says
  "Your name is required. The page keeps “…” until you type another.", and blur drops the draft,
  so the box shows the name again. Nothing is stored trimmed — a space mid-typing survives. So
  `c.title` never trims to empty from the editor, the prop is read only while the key is absent
  (a fresh page), and A's "Publish says why" branch has nothing to meet: pressing Publish blurs
  the box first. Option A's "red box" variant was not needed.
- **How the harness reaches the name:** `&cj=` merges into the section under test only, so a
  header `&cj=` reaches the header alone; every other section takes `artistName` from `&name=`
  (the `artistName` prop, default Kai Mercer). The harness repro is therefore the header's; the
  other slots, which read code this entry did not change, are proved in the editor.
- **Verified.** Seeded digest themes 0, 1, 2, canvas and `live=1`: 387 + 387 byte-identical
  before/after. `cat=header` × six layouts × themes 0, 1, 2 × three widths with `&cj=` title
  `''`, `'   '` and `'  Kai Mercer '`: before, `''` and `'   '` differed from the seed on 54/54
  canvas and 54/54 live (the empty h1); after, all three are byte-identical to the seed on 54/54
  + 54/54 — under A that is the right after-diff, not a moved slot list. End to end (one-off
  puppeteer, deleted), Retro / Lime / Grunge card 3 and Lime card 1: type `QATITLE Jane Smith` →
  canvas and published tab ×12 (×11 on card 1), Kai Mercer ×0, `<title>` the name; select-all +
  Backspace → box empty with the hint, canvas unchanged (×12, h1 the name); `'   '` likewise;
  blur → the box reads the name again; clear and press Publish directly → box restored,
  republished tab ×12, Kai Mercer ×0, `<title>` `QATITLE Jane Smith`, no page errors. The same
  script on the pre-fix tree: cleared → h1 `""`, Kai Mercer ×11 (×10), `<title>` Kai Mercer —
  the ticket. Retro, Lime and Grunge moved together; nothing is template-gated. No `in` moved.
- Docs: CLAUDE.md's *artist's name* bullet, `FIELDS.header.title`'s comment, the derivation's
  comment in `EncoreBuilder`. README has no passage on the name (grep: none), so nothing there
  to rewrite.

---

## End-of-pass sweep

1. Full digest, all categories × themes 0, 1, 2 × three widths × canvas and `live=1`, against
   `main`: every diff is one a Settled above names (the seeded page should barely move — say so if
   it does).
2. The repro digest: every `&cj=` override the four entries used, re-run on the final tree, canvas
   and `live=1` agreeing for each.
3. `reach.mjs 0,1,2` if any `in` moved: 0 mismatches.
4. Walk card 3 of Lime's setup modal in the real app and the published tab at 1440 / 768 / 390,
   repeating the tester's steps: three *Add package*, `not-an-email`, a blank form field, an
   emptied Title.
5. `npm run build:standalone`, `cp source/dist-standalone/index.html index.html`, its own commit.
6. `plans/README.md`'s row, and a reply line per ticket for QA (fixed / by design / needs PO),
   headed by the retest-against-the-stamp line, and a line saying JP-045 was not in this batch.

**Settled.**
