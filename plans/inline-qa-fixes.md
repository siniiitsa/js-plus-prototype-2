# Inline editing — QA fixes (JP-154 … JP-159)

The tester's batch against canvas inline editing (`plans/inline-edit.md`, `plans/inline-edit-all.md`):
the click-to-edit path, its caret, the price part slots, and three places a click on copy opens nothing.
Retro is the tester's template for everything except JP-156 (Retro L1 by hand, Lime L1 scripted); the code
is template-blind apart from the two ledger rows (JP-157, JP-158) and one `EncoreSection` span (JP-159).

Branch `inline-qa-fixes`, from `main` (`18a79cc`). Four fix sessions, then a sweep. Triage is **read off the
code, not yet reproduced**: each session starts by reproducing its tickets (procedure step 3) and corrects
the table where the cause differs.

## The batch, as filed

(Translated from the tester's Ukrainian.)

> **JP-154** — Medium (proposed). The first click on text in an unselected section only selects the
> section: no cursor, a second click is needed to edit. All templates and layouts, Desktop, Tablet and
> Mobile. Real mouse, Retro L1: Bio selected, click on the Kicker → Header selected with no box; second
> click → box with a cursor. Expected: "When the user clicks directly on an editable text element → Then
> the text field becomes focused…". Cause: by design (`EncoreBuilder.jsx`, "A click on the selected
> section's own copy edits it there"), so a call for the BA: change the AC or the behaviour. May be Major,
> since the AC is violated outright.
> **JP-155** — Low (proposed). The box opens with all the text selected, so the first key replaces
> everything. Click mid-way in a 55-character review, type "W": the field and the sidebar hold "W".
> Escape restores. Every field (`focusIn` → `select()`). Real keyboard, Retro L1. The AC does not
> describe it ("inline editable text cursor").
> **JP-156** — Medium (proposed). Pricing: a non-number typed into the amount silently drops the
> currency sign on the next edit. Click the amount 450 (box on the amount alone) → TBC → Enter: the card
> shows £TBC. Click again: the box now holds the whole price £TBC, all selected. Type 450 → "450" with no
> £, though the neighbours show £650 and £1,200. Control: typing a number straight away (475) keeps the £.
> Retro L1 by hand, Lime L1 scripted; the other templates not checked (they started with the £ already
> lost). No AC covers this.
> **JP-157** — Low. Retro L1 Testimonials: the line "HANNAH L. · PRIVATE HOST" under the quote opens
> nothing, on the name or the role. The chips below open `who` and `role`. 1440, 768, 390, real mouse. No
> such line on the other templates. Why the developer missed it: the line is not in his ledger of
> deliberately-off fields, and his script counts a field as working if any one copy of it opens.
> **JP-158** — Low. Events Map L3: in the big card on the right, the city under the venue name
> ("Manchester") does not open. The venue, the status and "Updated" in the same card do. All five
> templates, 1440 / 768 / 390, real mouse on Retro.
> **JP-159** — Low. Retro L2, Mobile tab: a transparent decorative map circle covers the text under the
> map. "120 mi standard · further on request" and "EXPAND VIEW" open nothing, since an invisible
> `aria-hidden` span 477×477 px with `pointer-events: auto` lies on top. At 1440 and 768 the text opens;
> on the other templates at 390 too.

## Triage

| Ticket | Site | Verdict (from the code) | Size | Status |
|---|---|---|---|---|
| JP-154 | `EncoreBuilder.jsx` section `onClick` (~7741) and `probeInline` (~6903): `targetAt` is only asked when `st.selectedId === sec.id`; `onMouseMove` has the same gate, so the text cursor is not drawn either | **As documented, a product call** (see Call 1). `targetAt` reads only the DOM and `sectionVm`, never selection, so the same click can select *and* open | M | open |
| JP-155 | `InlineEditor`'s `focusIn`: `el.focus(); el.select()` | Confirmed by reading. The caret has to come from the click point, which `startInline` has (`e.clientX/Y`) and `InlineEditor` has not | S | open |
| JP-156 | `priceParts` (`data.js` ~3517) and `priceWrite` (`EncoreBuilder.jsx` ~6246): a price with no digit has **no lead**, so `£TBC` is one `amount` slot, the box covers the £, and `priceWrite`'s no-digit branch returns the typed text whole | **Cause confirmed on paper**: `priceWrite('£TBC','amount','450')` → `'450'`. The write is right for the box it is given; the *split* is wrong. Control (475 straight away) goes through the digit branch and keeps `head` | M | open |
| JP-157 | The Retro L1 testimonial prints `q.byline` as **one node** (`EncoreSection.jsx` ~24541), a composed `vm` key. `who` and `role` are exact-text slots, so only the chips (bare nodes) match them; the composed line is neither exact nor in `INLINE_PART`/`INLINE_LINES` | Same cause as the gig rows' `Manchester · 22:00`, which `INLINE_LINES` already solves for the map. A ledger row, not an `EncoreSection` change | S | open |
| JP-158 | The feature card's `{feature.city}` is a bare span (~22640). The list rows print the pair `Manchester · 22:00`, so `inlineSlots` makes `city` a `line` slot, and `part` slots are excluded from the exact-text map: the bare node matches nothing | Needs more than a ledger row: a `{}` line next to `{city} · {time}` pairs **four rows named Manchester with one drawn node**, and `inlineFieldAt`'s lined branch refuses that (`same.length !== peers.length` → `mine = null`). See Session 3 | M | open |
| JP-159 | The 390 map viewport of the shared Retro / flat-four block (`EncoreSection.jsx` ~21933): the ring `<span>`s are `aspectRatio: 1`, 138.7% of the viewport (≈477px at 390) in a viewport `<div>` with **no `overflow: hidden`** (only the card clips), and carry no `pointer-events`. At 390 the viewport is 307px tall, so the ring spills ≈85px into the foot bar and covers its text. At 1440 it spills 16px, at 768 not at all | **Inferred, not yet measured**: the tester's numbers (477×477, `aria-hidden`, `auto`) fit this block, but the ticket says "Retro L2" and this block's own comment says layout 3. Confirm with `elementsFromPoint` on the foot's text before touching it | S | open |

## Calls

Put to the user (2026-10-26). **Decided: calls 1, 2 and 3 as recommended.** Call 4 needs no decision.

1. **JP-154: select-and-edit on the first click** (**decided**; session 1), or keep two clicks and amend the AC.
   *Recommended:* a click on the copy of an *unselected* section selects it and opens the box in the same
   click, as the AC reads. Selection is state, but nothing the box needs depends on it: `targetAt` reads
   the DOM, and the two effects that close a box when `inline.sid !== st.selectedId` see both in one
   batch. The text cursor shows on every section's copy, not only the selected one's. Photos keep their
   rule (an already-selected section, user call 2026-10-23): the ticket is about text. *Cost:* a click
   meant to select a section that happens to land on its text now opens a box, which blur or Escape
   closes with no write. *Alternative:* keep the 2026-10-20 rule and rewrite the AC to say the first click
   selects. It is the one call the tester cannot settle, and the one that overrides `CLAUDE.md`'s "user
   call, 2026-10-20", so it goes to the user, not the code.
   *Mobile:* the ticket lists it, but the user call there is "never a phone" (a drawer covers the canvas).
   Do not build an inline box on a phone. Recommended answer to the tester: out of scope for the box;
   if the BA wants the AC met there, a tap on copy opens the Edit drawer with that field focused (the
   field → canvas walk run backwards, a separate piece of work). Say so in the reply; do not silently skip.
2. **JP-155: the caret goes where the click was** (**decided**; session 1), no select-all. The box opens with a caret
   at the clicked character, like any text field. A double-click then selects a word natively. *Alternative:*
   keep select-all and call it intended; the AC does not say, so it is the BA's. The tester's own example
   ("type W, all the text is gone") is what the recommendation removes. Escape still restores.
3. **JP-156: a currency sign leads a symbol-only price** (**decided**; session 2). `priceParts` gets a second rule for
   a price with no digit: the leading run of characters that are neither letters nor digits is the `lead`
   (`£TBC` → `£` + `TBC`; `$ POA` → `$` + `POA`; `TBC`, `POA` and `Contact me…` stay whole). The page then
   draws `£TBC` the way it draws `£650`, small £ and big numeral, which is also what makes the box
   cover `TBC` alone. *Alternative:* leave the split and make `priceWrite` re-attach a lead the box
   covered; it cannot know the box's selection was a replacement and not an edit, so a typed `450` over
   `£TBC` keeps the £ only by guessing. *Taken as the default, no call needed:* a price with prose after the
   first symbol (`From £POA`) is left whole.
4. **Taken as the default, no call needed.** JP-157, JP-158 and JP-159 have one answer each (a ledger row, a
   pairing rule, a style), and the probe is hardened in Session 4 so the next one of these is caught by the
   script, not by the tester.

## Per-session procedure

One session per group, clear context between them; git and this file are the memory.

1. Read `CLAUDE.md`, this file, `plans/inline-edit-all.md`'s status lines and the notes the session names.
   Read the memory notes `browser-tool-choice` (chrome-devtools MCP for the real-app steps; `scripts/digest.mjs`
   on the cached headless shell when it drops) and `verifying-the-published-tab` if the session publishes.
2. **Session 1 only, first:** `git switch -c inline-qa-fixes main`, then commit this plan and the
   `plans/README.md` row as `Plan: inline editing QA fixes (JP-154 … JP-159)`.
3. **Reproduce each ticket in the real app** (`npm run dev`, Retro, the ticket's own steps and width) and
   check its *falsifying control*. Where the cause differs from the triage table, correct the table before
   writing code. Use a real mouse and keyboard (chrome-devtools `click` / `type_text`), as the tester did:
   the probe's scripted clicks are what missed three of these.
4. Fix, then re-run the steps and the controls, then the session's own *Check* list.
5. Record the decisions in the notes file the session names (and `CLAUDE.md` only where a cross-cutting
   sentence changes), tick the table's *Status*, run `npm run build` once.
6. **Stop and hand off:** say the unit is closed and print the next session's opening prompt, filled in.
   No `index.html` refresh before the sweep.

## Session 1 — The click path (JP-154, JP-155) · `EncoreBuilder.jsx` only

Both live in "a click on copy opens a box", so they share `startInline` and the click point.

**JP-154.** In the section's `onClick`: ask `targetAt` for every section on a non-phone, not only the
selected one; on a text hit, `patch({ selectedId: sec.id, menuFor: null })` and `startInline(...)` in the
same handler. A photo hit stays gated on `st.selectedId === sec.id`. In `onMouseMove`, run `probeInline`
on every section (the 120 ms throttle already bounds the cost; `targetAt` reads one section's slots), but
keep the photo hover box to the selected section, since photo clicks are still gated.
- Watch: selecting swaps the sidebar to the edit panel in the same event. If anything in `EditPanel`
  takes focus on mount, the box's `onBlur={onClose}` closes it at once: measure with a real click before
  trusting the batch. `onFocusField` also fires on panel focus, so check the box walk does not move it.
- Watch: the section's toolbar and overlay mount on select; they must not sit over the text just clicked
  (the toolbar is top-right, the label top-left). A click on the text under the toolbar's footprint should
  still reach the section, which it does today for a selected one.
- Watch: the composed layout-3 row (`arrangeRows`) and sticky cells: `placeBox` runs on current geometry,
  and `refit` re-places on the canvas's scroll, as now.
- Phone: no change (`isMobile` keeps the gate). Record the call in the reply to the tester.

**JP-155.** `InlineEditor` takes a caret offset, `ed.at`, and `focusIn` does `el.focus();
el.setSelectionRange(at, at)` instead of `select()`. `startInline` computes it from the page text *before*
the box mounts: `document.caretPositionFromPoint` (or `caretRangeFromPoint` in WebKit) at the click gives
a text node and offset in `hit.node`; count the non-whitespace characters before it (the same `squash`
the matcher uses, since the page collapses runs of space and cases with CSS), step to the same count in
the slot's own text, and for a `part` slot subtract where its words start inside the node (`textRange`).
If the point is not in a text node of `hit.node`, or the copy was clamped (`…`), fall back to the end
of the text, never to select-all. The box's `onChange`/`typed` machinery is untouched.
- A float box (the seal's badge text) has no page text under it: caret at the end.
- `scripts/inline-probe.mjs` types its sentinel after the open (lines ~355–370) and relies on select-all
  to *replace*; make it select all itself (`Meta+A` / `Control+A`) before typing, or every page reports
  WRONG. Do this in the same commit.

**Check.** Real mouse, Retro L1 at 1440 and 768: (a) Bio selected, click the header Kicker → the header is
selected and the box is open with a caret under the click; (b) click mid-word in the 55-character review,
type `W` → the word gains a `W` and the rest stays; Escape restores; (c) double-click selects a word;
(d) click on a photo of an unselected section still only selects; (e) the hover cursor is `text` over copy
of an unselected section; (f) a phone: first tap selects and opens the drawer, no inline box.
`inline-probe.mjs --theme Retro --layout 1 --width 1440,768 --check` PASS, then the other four templates'
layout 1 (one each), since this is the code every page goes through.

Notes: `plans/inline-edit.md`, the two sentences in `CLAUDE.md`'s "Clicking text on the canvas edits it
there" that say "of an already-selected section", and `plans/inline-edit-all.md`'s status line.

## Session 2 — A price with no digit (JP-156) · `data.js`, `EncoreBuilder.jsx`

Read `notes/pricing.md` ("The price is measured as a price") and `notes/calendar.md` (it names
`priceParts` too) first.

- `priceParts`: where there is no digit, `lead` is `s.match(/^[^\p{L}\p{N}]+/u)`, trimmed, and `amount`
  the rest; `prose` is judged on that rest (`> PRICE_PROSE_MIN`), so `£Contact me for a custom quote` is
  still prose. `TBC`, `POA`, `Contact me…` have no leading symbol and are unchanged. Update the comment
  block above it.
- `priceWrite`: its no-digit branch (`return sub === 'amount' ? text : raw`) is replaced by the same split,
  so `lead` and `amount` writes keep the other part, as the digit branch does. Prefer one helper that
  returns the three offsets and have `priceParts` and `priceWrite` both read it: they have now drifted
  once, and `slotText` and `inlineSlots` read `priceParts` as well, so the box, the page and the write all
  agree by construction. Do not hand-copy the regex into the three.
- `slotText`/`inlineSlots` need no change: with a lead, the `lead` and `amount` slots exist for `£TBC`
  and the `amount` box covers `TBC` alone.
- This changes what the page **draws** for any no-digit price that starts with a symbol (small £, big
  numeral), at every template and layout that prints a price (pricing, the calendar's slot price).
  Take the two-build digest before and after and read the diff: it should move only pages whose seeded
  price has a symbol and no digit, which should be none. A diff elsewhere is a finding.
- `scripts/limits.mjs` imports `priceParts`; re-run `node scripts/limits.mjs pricing --check` and
  `--seeds` (no browser) since a cap is measured on the split.

**Check.** The ticket's steps on Retro L1 with a real keyboard, then the control: 450 → `TBC` → Enter shows
`£TBC` with the £ small; click `TBC` → the box covers `TBC` alone; type `450` → `£450`. Lime L1, Grunge,
Editorial and Pop L1 the same (Pop and Editorial seed the symbol differently: look at each seeded
price before trusting one). A range (`£450 — £1,400`), `£450 + VAT`, `POA` and `Contact me…` unchanged on
the page and in the box. Layout 4 (`'*.3.pricing.tiers.price'` prints `£` and numeral in one node) still
opens. `inline-probe.mjs --layout 1 --check` on pricing's pages (all five templates, 1440 and 768) PASS.

Notes: `notes/pricing.md` (the rule), the comment above `priceParts`.

## Session 3 — Two ledger gaps (JP-157, JP-158) · `data.js`, `inlineFieldAt`

Read `plans/retro/inline-layout-2.md` (the `INLINE_LINES` build) and `notes/testimonials.md`, `notes/map.md`.

**JP-157.** The Retro L1 line is `vm.byline`, `who · role` as one node. Add to `INLINE_LINES`:
`'Retro.0.testimonials.quotes.who': ['{}', '{who} · {role}']` and the same for `role`. The bare `{}` is
the Retro layout-6 kicker's precedent (`'*.5.header.kicker': ['{}', '● {}']`) and keeps the chips opening:
a slot with a line is "spoken for" by it, so the chips need the bare form too or they stop opening. First
check which templates and designs print `byline` (the tester says Retro L1 alone, `EncoreSection.jsx`
~24541 and ~24888 are candidates): scope the row to the ones the probe shows, not `*`. A blank `who` or
`role` drops its separator, which `inlineSlots`' template fill already does.

**JP-158.** First reproduce on one template and print what the card's nodes are. The expected shape: the
list rows print `{city} · {time}`, so under the pair rule `city` and `time` are `line` slots and **bare
`Manchester` matches nothing**. The fix wants `'*.2.map.gigs.city': ['{city} · {time}', '{}']`, but the
bare form is drawn once (the card) while four rows have the same city, and the lined branch of
`inlineFieldAt` demands `same.length === peers.length`. Two ways, in order of preference:
1. Let the lined branch use `prefixSlot` the way the unlined one does (`peers.length < same.length` →
   the nth node is the nth slot where what is drawn reads as the head of the slots). The card shows the
   feature, the first row. Probe the rest of the lined pages (layout 2's gigs, layout 4's ticker, Retro's
   layout 6) after, since every lined slot goes through that branch.
2. If that disturbs another page, give the card's city a dedicated ledger form instead (`INLINE_HEAD`'s
   shape: the row the canvas draws is the feature's) and leave the lined branch alone.
Check whether the card prints `time` or the date bare too (the ticket says only venue, status and
"Updated" open, and city does not); if `time` is not drawn in the card, only `city` needs the bare form.
The feature card changes under the live pager, but the canvas is never live, so the first row is right
there; say so in the comment.

**Check.** Retro: the tester's two lines open the right slots (name → `who`, role → `role`, chips as
before; the card's city → the featured row's `city`, and typing there changes the list's first row too)
at 1440, 768, 390. Then the other four templates' L3 for the city. `inline-probe.mjs --layout 4 --check`
on Retro (testimonials is layout 1's, so layout 1 for JP-157; map is layout 3's, so layout 3 for
JP-158), both widths, then layouts 2 and 4 of the same templates for the regression of the lined branch.

## Session 4 — The covered text and the probe's blind spots (JP-159) · `EncoreSection.jsx`, `scripts/`

**JP-159.** Start by confirming the block (Triage). In the 390 viewport `<div>`, either (preferred) give it
`overflow: 'hidden'`, which is what the block's own comment says the picture is ("the clip is the picture"),
or `pointerEvents: 'none'` on every decorative `aria-hidden` span in it: the rings, the ring labels, the
pins, the centre marker. `overflow: hidden` also removes the faint arc that the screenshot shows crossing
the foot bar, but it moves pixels at 1440 (16px spill) and 768: compare against the 390, 768 and 1440
masters (the `figma-frame-reading` memory) and the two-build digest. If the masters draw the arc,
or the digest moves, take `pointer-events: none` alone. `EncoreSection` stays free of effects, props and
unit classes: it is a one-line style. The zoom buttons must stay `auto` (live, they are clicked).

**The probe's three blind spots** (the reason these reached QA; `scripts/inline-probe.mjs`, header and
flags):
1. **Partial copy.** A node that *contains* an active slot's copy inside a longer line, and opens nothing,
   is reported as `UNREACHED` and fails `--check` (JP-157's line; today only a node that prints the copy
   *exactly* counts, as a *dead click*). Ledgered slots and the probe's existing skips (vertical type,
   a node under another element, `·`, row numbers) stay out.
2. **Covered text.** A text node whose centre has an `aria-hidden` element on top, with
   `pointer-events` not `none`, is reported (JP-159's span). The probe already lists *unhit under an
   overlay*; make a decorative span the cause that fails, not merely counts.
3. **Dead click on a ledgered pair.** The pair `Manchester · 22:00` opens, and the bare `Manchester` in
   another node does not (JP-158). Part of 1 once the node counts as "prints a slot's copy".
Run each against the pre-fix tree first (`git stash` the fix is not safe: a file landing in `scripts/`
reloads Vite; use a worktree) to show the new checks fail on JP-157, JP-158 and JP-159, then pass after.

**Check.** The ticket's steps on Retro L2 at 390 with a real mouse; at 768 and 1440 the same text opens
(the controls); the zoom buttons still step the map live (the published tab: `verifying-the-published-tab`).
The new probe checks over all 22 pages at both widths: a new finding on a page this batch did not touch is
**not** to be fixed here unless it is one line, but to be filed (each is the same kind of bug the tester
found). Update the probe's header comment.

## Sweep (after the four)

- `npm run build` and `npm run build:standalone` clean; the two-build digest moves only what Sessions 2
  and 4 say it may (a price with a symbol and no digit; the 390 map viewport if `overflow` was chosen).
- `inline-probe.mjs --check` and `photo-probe.mjs --check` over all 22 pages at 1440 and 768
  (`photo-probe` because Session 1 touches the section's `onClick`, which the photo path shares); `--drop`
  too, since the drag handlers sit on the same wrapper.
- Reply to the tester per ticket: fixed, or the call made (JP-154 on Mobile, JP-155). Tell them JP-157's
  and JP-158's fix is also a script check now.
- Refresh `index.html` and `published.html` as the separate step `CLAUDE.md` describes.

## Not done / out of scope

- An inline box on a phone (JP-154's Mobile): the drawer rule stands; the alternative, a tap that opens the
  Edit drawer on that field, is a separate piece of work if the BA wants the AC met there.
- Photos on an unselected section opening on the first click: the ticket asks about text, and
  `plans/photo-edit.md` made the opposite call on purpose.
- Fixing what the new probe checks find on other pages beyond the one-liners; they are filed.
- The root `index.html` refresh, the commit, push and PR are the user's.
