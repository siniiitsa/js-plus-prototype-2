# Header: hamburger-only nav, fewer lines of copy, a three-state badge

User calls, 2026-11-11 (ticket "Header — Simplify navigation, remove layout-specific text and add badge
controls"; the full plan was agreed in session):

1. **Bar.** Layouts 1–4 of all five templates: hamburger top-left, Book Now top-right, at every width.
   No globe, no small act name, no inline links, no centred name, no standalone Listen.
2. **Menu opens in flow and pushes the hero down** (photo never covered). `HeaderRoot` holds the state;
   `MenuPanel` is the panel; the hero's bar is hidden while open. The ticket's open-menu, tablet and
   mobile designs are pending; this is our reading of it.
3. **Scope is layouts 1–4**; Retro's layouts 5 and 6 are untouched.
4. **Removals.** L1: location + marker + act type. L2: availability pill (field deleted, old drafts keep
   the stored value unread), subtitle ("act description"), place card (`placeBody` deleted), Retro's photo
   rail. L3: location line. L4: act type above and location below. Kept: tags, `faceTitle`/`faceBody`,
   `heroCta`, `cardLine`, Retro's layout-3 polaroid kicker.
5. **Badge.** `badgeMode` rotating / static / hidden, per artwork (Lime and Editorial layout 1 offer
   Visible / Hidden). Feature spread's control shows on Retro only, the one template that draws a badge there.
6. **Minimal nav** stays pickable; its default is gone (Follow my sections everywhere).

Bookkeeping done: `FIELDS.header` `in`/`chars`, `INLINE_OFF` rows, `reach.mjs` probes, docs. Not done /
open: the Hero closed-menu images in the ticket were not seen; Stacked's 768 seal anchor
(`bottom: 185.46px`) was calibrated against the old name block — check it.
