// The seeded mock photography of the designed templates, exported from their
// Figma frames — Retro's §10.2 page, Lime's four layout pages, Grunge's and
// Editorial's layout-1 pages, and Pop's, Lattice's and Paperback's. Grunge's layout-2, layout-3 and layout-4 frames drew nothing
// new: every photograph they carry is already seeded here, the layout-3 bio's
// crop taken as an objectPosition on grungeStage rather than as a second
// export, and the layout-4 bio's a centred cover of the same file. Nor did
// Editorial's layout-2, layout-3 and layout-4 frames: every photograph they
// carry is seeded already, the layout-2 header's and gallery's crops and the
// layout-3 bio's taken as objectPositions (the last on editorialStage,
// Grunge's route), and the layout-4 bio's and gallery spotlight's centred
// covers of editorialStage and editorialGallery4.
//
// These are *imports*, never fetched: §8.6 forbids a network request anywhere in
// the render path, and vite-plugin-singlefile forces `assetsInlineLimit = () => true`,
// so every file here is base64-inlined into the standalone build and the committed
// double-clickable index.html keeps working from file://.
//
// Kept out of data.js on purpose — that module is documented as "pure data plus four
// helpers; no React" and is import-free, and ~2 MB of base64 has no business in the
// file people open to read the palettes.
//
// All seven templates have Figma frames of their own, so all seven seed
// photography: Retro's, Lime's, Grunge's, Editorial's, Pop's, Lattice's and Paperback's shoots.

import hero from './photos/hero.jpg'
import latticeDisc from './photos/lattice-disc.webp'
import latticeMapDesktop from './photos/lattice-map-desktop.webp'
import latticeMapTablet from './photos/lattice-map-tablet.webp'
import latticeMapMobile from './photos/lattice-map-mobile.webp'
import latticeCalDesktop from './photos/lattice-calendar-desktop.webp'
import latticeCalTablet from './photos/lattice-calendar-tablet.webp'
import latticeCalMobile from './photos/lattice-calendar-mobile.webp'
import retroVideoPoster from './photos/retro-video-poster.jpg'
import headerAvatar from './photos/header-avatar.jpg'
import stage from './photos/stage.jpg'
import bioStage from './photos/bio-stage.jpg'
import formStage from './photos/form-stage.jpg'
import gallery1 from './photos/gallery-1.jpg'
import gallery2 from './photos/gallery-2.jpg'
import gallery3 from './photos/gallery-3.jpg'
import gallery4 from './photos/gallery-4.jpg'
import gallery5 from './photos/gallery-5.jpg'
import gallery6 from './photos/gallery-6.jpg'
import gallery7 from './photos/gallery-7.jpg'
import avatar from './photos/avatar.jpg'
import track1 from './photos/track-1.jpg'
import track2 from './photos/track-2.jpg'
import track3 from './photos/track-3.jpg'
import track4 from './photos/track-4.jpg'
import track5 from './photos/track-5.jpg'
import mapTile from './photos/map.jpg'
import mapRadial from './photos/map-radial.jpg'
import review1 from './photos/review-1.jpg'
import review2 from './photos/review-2.jpg'
import review3 from './photos/review-3.jpg'
import grain from './photos/grain.jpg'
import limeHero from './photos/lime-hero.jpg'
import limeHeaderAvatar from './photos/lime-header-avatar.jpg'
import limeStage from './photos/lime-stage.jpg'
import limeBioStage from './photos/lime-bio-stage.jpg'
import limeCalendar from './photos/lime-calendar.jpg'
import limeAvatar from './photos/lime-avatar.jpg'
import limeGallery4 from './photos/lime-gallery-4.jpg'
import limeFormPhoto from './photos/lime-form-photo.jpg'
import grungeHero from './photos/grunge-hero.jpg'
import grungeHeaderAvatar from './photos/grunge-header-avatar.jpg'
import grungeStage from './photos/grunge-stage.jpg'
import grungeSinger from './photos/grunge-singer.jpg'
import grungeCalendar from './photos/grunge-calendar.jpg'
import grungeAvatar from './photos/grunge-avatar.jpg'
import grungeGallery4 from './photos/grunge-gallery-4.jpg'
import grungeGallery7 from './photos/grunge-gallery-7.jpg'
import grungeFormPhoto from './photos/grunge-form-photo.jpg'
import editorialHero from './photos/editorial-hero.jpg'
import editorialHeaderAvatar from './photos/editorial-header-avatar.jpg'
import editorialStage from './photos/editorial-stage.jpg'
import editorialCalendar from './photos/editorial-calendar.jpg'
import editorialGallery4 from './photos/editorial-gallery-4.jpg'
import editorialGallery6 from './photos/editorial-gallery-6.jpg'
import editorialGallery7 from './photos/editorial-gallery-7.jpg'
import popHero from './photos/pop-hero.jpg'
import popHeaderAvatar from './photos/pop-header-avatar.jpg'
import popStackedAvatar from './photos/pop-stacked-avatar.jpg'
import popStage from './photos/pop-stage.jpg'
import popCalendar from './photos/pop-calendar.jpg'
import popAvatar from './photos/pop-avatar.jpg'
import popGallery1 from './photos/pop-gallery-1.jpg'
import popGallery2 from './photos/pop-gallery-2.jpg'
import popGallery4 from './photos/pop-gallery-4.jpg'
import latticeHero from './photos/lattice-hero.jpg'
import latticePortrait from './photos/lattice-portrait.jpg'
import latticeBio from './photos/lattice-bio.jpg'
import latticeAlt from './photos/lattice-alt.jpg'
import paperbackHero from './photos/paperback-hero.jpg'
import paperbackAvatar from './photos/paperback-avatar.jpg'
import paperbackBio from './photos/paperback-bio.jpg'
import paperbackShot1 from './photos/paperback-shot-1.jpg'
import paperbackShot2 from './photos/paperback-shot-2.jpg'
import paperbackShot3 from './photos/paperback-shot-3.jpg'
import paperbackShot4 from './photos/paperback-shot-4.jpg'
import paperbackShot5 from './photos/paperback-shot-5.jpg'
import paperbackShot6 from './photos/paperback-shot-6.jpg'
import paperbackShot7 from './photos/paperback-shot-7.jpg'
import paperbackViewer from './photos/paperback-viewer.jpg'
import headlinerHero from './photos/headliner-hero.jpg'
import headlinerAvatar from './photos/headliner-avatar.jpg'
import headlinerBio from './photos/headliner-bio.jpg'
import headlinerCover from './photos/headliner-cover.jpg'
import headlinerShot1 from './photos/headliner-shot-1.jpg'
import headlinerShot2 from './photos/headliner-shot-2.jpg'
import headlinerShot3 from './photos/headliner-shot-3.jpg'
import headlinerShot4 from './photos/headliner-shot-4.jpg'
import headlinerShot5 from './photos/headliner-shot-5.jpg'
import headlinerShot6 from './photos/headliner-shot-6.jpg'
import headlinerShot7 from './photos/headliner-shot-7.jpg'
import headlinerViewer from './photos/headliner-viewer.jpg'

const REVIEWERS = [review1, review2, review3]

// Keyed by section category id, matching FIELDS: a single `image` slot takes a
// string, a multi-photo `images` slot takes an array in slot order.
export const RETRO_PHOTOS = {
  header: hero,
  // The bio polaroid and the calendar polaroid stack are one photograph in Figma —
  // the stack is the same card offset and rotated, not three different shots.
  bio: stage,
  calendar: stage,
  // The poster the video section's layouts 2 and 4 stand their player on: the
  // Velvet Note club shot (the singer in a red velvet suit, tables, trumpet and
  // saxophone, the neon sign), one file in Retro's Dashboard player (964:64645)
  // and Cinematic minimal (964:72773 / 964:72777): both fill it with hash
  // 000ea835, 1672 x 941, drawn as a plain centred cover. It is *not* the
  // header's backdrop, the yellow-suit stage shot `hero` (JP-164; session 1
  // misread the two as one). No FOCUS row: the frame centres it.
  video: retroVideoPoster,
  form: avatar,
  // `media` is deliberately absent: the player shows the artwork of the track it
  // is on, so the section has no photo of its own to seed. Its five track
  // thumbnails belong to the tracks themselves and are seeded through
  // RETRO_TRACK_ART below. (The Figma frame's separate sleeve photograph went
  // with the field — the player was a picture then, and could name a record
  // that was not in the list.)
  // One per tile in the strip. galActive() highlights slot 4 and shows it in the
  // large viewer, so that slot carries the full-size spotlight photograph. The
  // other six are ~1024px squares cut from the frames' own 1536 × 1024 sources
  // (964:64647) at the framing the old 320px strip exports had: a visitor can
  // pick any of them into the viewer, where a strip-sized file read as soft.
  gallery: [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7],
  // Pricing layout 2's reviewer faces under the quote — the frame's own three
  // `av` fills (964:64648), square-cropped to 112px, 4× the 28px avatar.
  pricing: REVIEWERS,
}

// Lime's layout-1 frames (964:58588…98) are a different shoot for the artist's
// own photographs and the same images as Retro's for everything else — an
// image-hash walk of both pages settled which. New: the hero and its portrait
// card, the bio's arch (exported at the frame's own CROP, a portrait slice of a
// landscape source), the calendar's photograph — which unlike Retro's is not the
// bio's — the form's avatar and the gallery's spotlight. Shared: the six strip
// thumbnails, the five track covers and the map raster.
//
// The form's second slot is Lime's own, from its layout-2 frames (SEEDS, below);
// Lime's layout-1 page does not draw it.
export const LIME_PHOTOS = {
  header: limeHero,
  bio: limeStage,
  // The video's poster is the hero, whole (hash 51d68654 in the Dashboard
  // player, 964:64588 and its two masters), where the stand-in was the bio's
  // portrait slice. The 768 and 390 masters fill it as a plain centred cover,
  // and the 1440 one's CROP is centred on it too (y .109 to .891 of the source),
  // so the player's own centred cover is the frame and the poster needs no
  // FOCUS row of its own: the video reads none, and `limeHero`'s '30% 50%' is
  // an x the 819 : 478 box would never read. The 1440 fill is also mirrored,
  // which is declined (notes/video.md). Layout 4's poster is this one.
  video: limeHero,
  calendar: limeCalendar,
  form: limeAvatar,
  gallery: [gallery1, gallery2, gallery3, limeGallery4, gallery5, gallery6, gallery7],
  pricing: REVIEWERS,
}

// Grunge's layout-1 frames (964:58600…10, the mode "Static Youth") are a third
// shoot, black-and-white in the assets themselves — no fill filter and no node
// effect desaturates them, so an artist's colour upload stays in colour. Own:
// the hero (hash 221f121f, a 2632 × 1402 stage shot) and its portrait card
// (3ef9ee55, the singer), the bio's portrait (8031d0f3, the drummer), the
// calendar's crowd (019c80fd), the form's avatar (81e1c9a9, the centre square
// of a pub shot, whose whole frame seeds `photo` on Lime's rule) and the
// gallery's spotlight (a746e7e4, the band). Shared: the five track covers and
// the map raster. Its layout-2 frames (964:64617…) draw the same pictures in
// other boxes, so that pass owed no export; the two colour pictures they
// carry in the header's portrait tile and the form's credit avatar are Lime's
// component defaults leaking through, and the seeds stand.
//
// The gallery strip is the one place this departs from the frame, which draws
// the bio's drummer six times round Retro's colour spotlight in the ringed
// fourth seat — a placeholder, not a strip. The seven slots are the shoot's
// own six photographs and a second crop of the hero, with the frame's
// spotlight in galActive()'s slot, so every thumbnail is a different picture
// and none is in colour.
export const GRUNGE_PHOTOS = {
  header: grungeHero,
  bio: grungeStage,
  // Session 1's stand-in: the bio's shot, until this template's video session
  // reads its frames' own poster (plans/video.md; Lime's is the open verdict).
  video: grungeStage,
  calendar: grungeCalendar,
  form: grungeAvatar,
  gallery: [grungeStage, grungeSinger, grungeCalendar, grungeGallery4, grungeFormPhoto, grungeHero, grungeGallery7],
  pricing: REVIEWERS,
}

// Editorial's layout-1 frames (964:58612…22, the mode "Sienna Vale") are a
// fourth shoot, in colour — no fill filter, no node effect. Own: the hero
// (hash ae069c14, the garden wedding), the portrait card (488cc3d7, the
// singer), which the frame's form also draws as its avatar — one image in two
// slots — the bio's arch (9d20fe0d), the gallery's spotlight (90514a32) and
// the calendar's photograph (47176057), the one CROP on the page, exported at
// that crop: the full width over 8.9–70.0% of a portrait source, the frame's
// own 1.309. The rest are FILL and exported whole. Shared: the five track
// covers and the map raster. Its layout-2 form fills its stage slot with the
// hero, so that is `photo` too.
//
// The gallery strip departs from the frame, Grunge's call again: the frame's
// thumbnails are Retro's shoot (the Basement singer, Retro's spotlight in the
// ringed fourth seat, one of them three times). The seven slots are this
// shoot's five pictures and two square crops of the hero — the singer at the
// mic and the dancing couples — with the frame's spotlight in galActive()'s
// slot, so every thumbnail is a different picture of the one wedding.
export const EDITORIAL_PHOTOS = {
  header: editorialHero,
  bio: editorialStage,
  // Session 1's stand-in: the bio's shot, until this template's video session
  // reads its frames' own poster (plans/video.md; Lime's is the open verdict).
  video: editorialStage,
  calendar: editorialCalendar,
  form: editorialHeaderAvatar,
  gallery: [editorialStage, editorialHeaderAvatar, editorialCalendar, editorialGallery4, editorialHero, editorialGallery6, editorialGallery7],
  pricing: REVIEWERS,
}

// Pop's layout-1 frames (964:58624…34, the mode "Pop") are a fifth shoot, in
// colour — no fill filter, and the only effects are the bio's and the
// gallery's drop shadows. Own: the hero (hash f70d25d3, 3066 × 2390, exported
// whole at 1536), the portrait circle (0b079033, a CROP over the full width and
// the top 80% of a 1122 × 1402 source — a top square, at 384), the bio's arch
// (51d06990), the gallery's spotlight (b3a33296, a centred cover), two of the
// strip's thumbnails (a548367c, 3cba54cf), the calendar's photograph (bd34152d,
// a CROP over the full width and 8.4–65.6% of the height, exported at that
// crop) and the form's avatar (59099150, which is not the portrait circle's
// source, so it is a slot of its own). Shared: the five track covers and the
// map raster. Its layout-2 form fills its stage slot with the hero, so that
// is `photo` too.
//
// The gallery strip departs from the frame, Grunge's call again: the frame's
// first two thumbnails are this shoot's and the other five Retro's Basement
// shoot (Retro's own spotlight in the ringed fourth seat, b35b6507 twice). The
// seven slots are the frame's two, the bio's, the spotlight in galActive()'s
// slot, the calendar's, the hero and the form avatar's source — every
// thumbnail a different picture of the one comedy-club night.
export const POP_PHOTOS = {
  header: popHero,
  bio: popStage,
  // The frame's own poster, not a stand-in: layout 2's Player fills `51d06990`,
  // the bio's arch, a CROP at y .086 to .524 at 1440 and a centred FILL at 768
  // and 390 (plans/video.md, session 8). The video's `Photo` reads `popStage`'s
  // '50% 0%' (below), which keeps the face where the narrow fills drop it.
  video: popStage,
  calendar: popCalendar,
  form: popAvatar,
  gallery: [popGallery1, popGallery2, popStage, popGallery4, popCalendar, popHero, popAvatar],
  pricing: REVIEWERS,
}

// Lattice's layout-1 frames (1:306 · 1:8953 · 1:9934, JustPay — Batch 2) are a
// sixth shoot, and a small one: the whole page is four photographs, a teal and
// orange portrait session with a projected kanji. In the frames' own names
// (plans/lattice/layout-1.md, *Settled in session 0*): the hero (hash a55a2e2d,
// FILL, 1536 × 1024, also a track cover and a thumbnail), the portrait
// (40a976f3, the header's avatar card, the gallery's spotlight and two track
// covers), the bio's (04a8339f) and a fourth (0cb3f486, the form's avatar and the
// first track's cover, three thumbnails), every one a `FILL`, so a centred
// cover. The frames' own 1536-wide JPEGs, unmodified (a re-encode at 74 came out larger). The
// frames' other rasters (the dot fields, the dotted disc, the map card and the
// calendar's torus) are art, not photography, and are the sections' own.
//
// The gallery strip is the frame's seven in the frame's order; the track covers
// are the frame's five (RETRO_TRACK_ART's shape, Lattice's own pictures).
export const LATTICE_PHOTOS = {
  header: latticeHero,
  bio: latticeBio,
  // No frame draws the video; the hero stands in, as Retro's poster does.
  video: latticeHero,
  form: latticeAlt,
  gallery: [latticeAlt, latticeBio, latticePortrait, latticeHero, latticePortrait, latticeAlt, latticeAlt],
  pricing: REVIEWERS,
}
// The dotted disc (header, and later the footer, the map card and the calendar's
// torus): a 256 x 162 lossless WebP of the frame's 400 x 400 raster cropped to its
// ink, light on transparent, used as a mask so a section inks it (plans/lattice/
// layout-1.md, *Settled in section 1*). 14.5 KB. At 2x: it draws 128 x 81 css px.
// …and the events map's dotted bowl (section 6): the frames' own raster per width (657 x 470, 714 x 470 and
// 340 x 470 css px at 2x), ink on transparent, lossless WebP of 16 KB each, used as a mask so the card inks it.
// …and the calendar's dotted torus (section 8): the frames' own raster per width (670 x 378, 357 x 199 and
// 340 x 252 css px at 2x), ink on transparent, lossless WebP (39 / 25 / 31 KB), used as a mask so the card inks it.
export const LATTICE_ART = {
  disc: latticeDisc, discW: 128, discH: 81,
  map: { desktop: latticeMapDesktop, tablet: latticeMapTablet, mobile: latticeMapMobile },
  calendar: { desktop: latticeCalDesktop, tablet: latticeCalTablet, mobile: latticeCalMobile },
}
export const LATTICE_TRACK_ART = [latticeAlt, latticePortrait, latticeAlt, latticePortrait, latticeHero]

// Paperback's layout-1 frames (1:2316 · 1:10903 · 1:12137, JustPay — Batch 2) are a seventh
// shoot: a performer with silver-pink hair in a holographic jacket on a pink and teal stage,
// eleven photographs in all (plans/paperback/layout-1.md, *Settled in session 0*), none of them
// in Retro's, Pop's or Lattice's. In the frames' hash order of use: the hero card (10b684, FILL,
// 1536 x 1024), the avatar card (43c4de, 1448 x 1086), the bio's portrait (ffa597), the five
// track covers (fa9b7e, b0e98d, 1d452b, ef42b0, 8e64c0), which are also the gallery strip's
// first five thumbnails, the strip's sixth and seventh (533958, 69e1ae) and the gallery
// viewer's own (dbf7d7, which is none of the seven). The form's avatar is the third cover and
// the footer's photograph the fourth, as the frames re-crop them. Every one a `FILL`, so a
// centred cover. Re-encoded: the frames' JPEGs at about 200 KB each came to 1152 px at quality
// 50 (the avatar 512 px at 60), 960 KB in all, because most draw at 56-660 px.
//
// The gallery strip is the frame's seven in the frame's order, except its second slot: the viewer can only show a
// slot, the frame rings the second tile, and the viewer's own picture (none of the seven) is therefore that slot's
// seed (plans/paperback/layout-1.md, section 4). `paperbackShot2` stays the media's second cover.
export const PAPERBACK_PHOTOS = {
  header: paperbackHero,
  bio: paperbackBio,
  // No frame draws the video; the hero stands in, as Retro's poster does.
  video: paperbackHero,
  form: paperbackShot3,
  // The footer's keyline card is the fourth cover (ef42b0), as the frames re-crop it.
  footer: paperbackShot4,
  gallery: [paperbackShot1, paperbackViewer, paperbackShot3, paperbackShot4, paperbackShot5, paperbackShot6, paperbackShot7],
  pricing: REVIEWERS,
}
export const PAPERBACK_TRACK_ART = [paperbackShot1, paperbackShot2, paperbackShot3, paperbackShot4, paperbackShot5]
export const PAPERBACK_VIEWER = paperbackViewer

// Headliner's layout-1 frames (1:4478 · 1:15259 · 1:16314, JustPay — Batch 2, "Headliner Structured — Claude
// Design") are an eighth shoot: a performer with orange-red hair, tinted sunglasses and a navy-orange-cream
// jacket on an orange and maroon set, twelve photographs here (plans/headliner/layout-1.md, *Settled in
// session 0*), none of them in Retro's, Pop's, Lattice's or Paperback's. The hero (1536 wide in the frame; it
// is clipped to a slanted parallelogram in markup, so the picture is imported whole), the avatar, the bio's
// portrait on its orange ground, the media player's large cover (`headlinerCover`), the gallery's
// seven thumbnails (`headlinerShot1`..`7`, which are also the media list's five row covers, in order: the
// frames re-crop them at 56 px) and the gallery viewer's own (`headlinerViewer`, the singing shot, none of the
// seven). The form's avatar is the avatar. The footer draws no photograph. Re-encoded with `sips`: the hero
// 1440 px q55, the rest at their frames' sizes (146-656 px), 485 KB in all.
//
// The gallery strip stands the viewer's picture in its second slot, as Paperback's does: the viewer can only show a
// slot (plans/headliner/layout-1.md, section 4 settles whether it is the second or the first). `headlinerShot2`
// stays the media's second row cover.
export const HEADLINER_PHOTOS = {
  header: headlinerHero,
  bio: headlinerBio,
  // No frame draws the video; the hero stands in, as Retro's poster does.
  video: headlinerHero,
  form: headlinerAvatar,
  gallery: [headlinerShot1, headlinerViewer, headlinerShot3, headlinerShot4, headlinerShot5, headlinerShot6, headlinerShot7],
  pricing: REVIEWERS,
}
// The media player's large cover (the frame's `Night Rain` picture, none of the five rows'). The player has no cover field of
// its own (it shows the cued track's art, and the canvas cues track one), and the 176 px row crops would be a soft 378 px
// sleeve, so section 3 seeds the cover as **track one's art**: the player draws the frame's picture at full size and row one's
// 56 px thumbnail is its centre crop (the frame's is shot 1, a different frame of the same session; the gallery's first
// thumbnail keeps shot 1). Rows 2-5 are shots 2-5 in order, as the frame's.
export const HEADLINER_COVER = headlinerCover
export const HEADLINER_TRACK_ART = [HEADLINER_COVER, headlinerShot2, headlinerShot3, headlinerShot4, headlinerShot5]
export const HEADLINER_VIEWER = headlinerViewer

// The seeded artwork for the media player's five track rows, in track order.
//
// These are the frames' own fills (964:58578 and Lime's 964:58590 share the five
// hashes 8c7fa7d8 4e7cc529 b737c3e0 40041573 21e9622c, in row order). They are
// real album covers, which are not ours to redistribute: seeding them in the demo
// was a user call (2026-09-17), and they must be replaced before anything public.
// Each keeps its source's aspect — track 1's is a 752 × 360 letterbox — because
// every seat draws them `cover`, which is the frames' own FILL.
//
// Track art is per-track content, not a section-level photo array: it travels in
// `c.tracks[i].image` once the artist edits the list, so this seeds only the
// untouched default list. A sixth track the artist adds has no seed and falls
// back to the initials placeholder.
export const RETRO_TRACK_ART = [track1, track2, track3, track4, track5]

// The same shape one category along: the thumbnails for the video section's
// seeded VIDEOS, in list order. Figma dresses these rows with stock stills we
// have no more right to ship than it had album covers, so they are the gallery
// photography re-used in the 140×80 crop the panel draws — everything but
// gallery slot 4, which is the gallery's own spotlight shot and should not be
// the first thing two sections of one page both open with.
export const RETRO_VIDEO_ART = [gallery1, gallery2, gallery3, gallery5, gallery6, gallery7]

// Per-row artwork by category. The list seeds only the untouched default rows:
// once the artist edits the list, the art travels in the row itself
// (`c.tracks[i].image`), so a row they add past the seed has none and falls
// back to the initials placeholder. Lime's frames dress the rows with the same
// covers (identical hashes), so both templates share it.
const ROW_ART = { media: RETRO_TRACK_ART, video: RETRO_VIDEO_ART }

// The artist avatar, cropped from the §10.2 hero frame's `pp` card (Figma node
// 964:58576) — a tight portrait from a different shot than the backdrop behind
// it, which is the whole reason the header's two photos are separate `image` /
// `avatar` content keys: uploading a backdrop leaves this crop in place, and
// vice versa. Kept at 384px, roughly 2× the card's 158px render. Lime's is the
// centre square of its own `pp` card's source (964:58588), at the same size.
export const RETRO_HEADER_AVATAR = headerAvatar
export const LIME_HEADER_AVATAR = limeHeaderAvatar
export const GRUNGE_HEADER_AVATAR = grungeHeaderAvatar
// Editorial's card is an arch (213 × 262) over a portrait source of nearly its
// own aspect, so it is the whole source at 480 × 600, not a centre square.
export const EDITORIAL_HEADER_AVATAR = editorialHeaderAvatar
// Pop's is a circle, the top square of its source (the frame's own CROP).
export const POP_HEADER_AVATAR = popHeaderAvatar
// Its Stacked card (964:73128) fills a 113 × 180 stadium with the same source
// (0b079033) whole, at FILL, so the top square crops a different window: a
// centred cover of it diffs 58 in 255 from the render, where a cover of the
// whole source diffs 2. So design 3 seeds the whole source, at 480 × 600
// (Editorial's arch's size), and the circle keeps its square.
export const POP_STACKED_AVATAR = popStackedAvatar

// Fixed decoration rather than user content, so these are not in FIELDS. The
// grain is Retro's, Grunge's and Editorial's (its tape); the map raster is every designed template's
// (sectionVm decides).
// `mapRadial` is the events map's layout-3 plate, the frame's own radial street
// raster (964:68649's Map Texture), re-encoded at 900px; it is drawn as it is,
// where `map` is inverted onto a dark plate.
export const RETRO_TEXTURE = { grain, map: mapTile, mapRadial }

// Everything a template seeds, by `THEMES[].name`. A theme with no row seeds
// nothing; every template has one now.
//   photos — the section photographs above
//   avatar — the header's artist portrait (`avatar` key)
//   photo  — the enquiry form's scene (`photo` key)
//   layouts — a section photograph that one layout's frame draws differently,
//             by design index, then category; it wins over `photos` there
//   avatars — the header's portrait, where one header design's frame draws
//             it from a different crop, by design index; it wins over `avatar`
//
// Retro's bio at layout 3 is the ID card's 798 × 380 landscape slot, and its
// frame (964:68631) fills it with the whole Velvet Note stage shot — the
// scene `stage.jpg` is a portrait slice of, re-encoded at 1200px as
// `bio-stage.jpg`. The portrait stays layout 1's polaroid.
//
// Lime's scene is the whole source of its layout-2 frames' stage shot (Figma
// 964:64595, hash f821adc2 — the same image its form avatar is the centre square
// of), exported at 1200 × 800 with no crop: every master fills it untransformed,
// so a centred cover is the frame's own picture at 838 × 437, 334 × 437 and
// 370 × 262. Only the form's layout 2 reads `photo`.
//
// Lime's bio at layout 3 is Retro's case again (964:68663): the ID card's
// landscape slot fills with the whole source `limeStage` is the portrait slice
// of (hash fa453f7d). Its fill carries that slice's transform, but its scale
// mode is FILL, which ignores it, so the render is the whole shot — exported
// at 1200 × 800 as `lime-bio-stage.jpg`. Its layout-4 card (964:72857) fills
// the same source the same way into a 664 × 720 portrait box, so it takes the
// same file: a centred cover of it diffs 2.7 in 255 from the render over the
// card's top, where `limeStage`'s slice diffs 27.
const SEEDS = {
  Retro: { photos: RETRO_PHOTOS, avatar: RETRO_HEADER_AVATAR, photo: formStage, layouts: { 2: { bio: bioStage } } },
  Lime: { photos: LIME_PHOTOS, avatar: LIME_HEADER_AVATAR, photo: limeFormPhoto, layouts: { 2: { bio: limeBioStage }, 3: { bio: limeBioStage } } },
  Grunge: { photos: GRUNGE_PHOTOS, avatar: GRUNGE_HEADER_AVATAR, photo: grungeFormPhoto },
  Editorial: { photos: EDITORIAL_PHOTOS, avatar: EDITORIAL_HEADER_AVATAR, photo: editorialHero },
  Pop: { photos: POP_PHOTOS, avatar: POP_HEADER_AVATAR, avatars: { 3: POP_STACKED_AVATAR }, photo: popHero },
  // The header's avatar card is the portrait (40a976f3, a FILL), the form's
  // layout-2 stage the hero. `rowArt` is the track covers, which are Lattice's
  // own pictures (defaultTrackArt).
  Lattice: { photos: LATTICE_PHOTOS, avatar: latticePortrait, photo: latticeHero, rowArt: { media: LATTICE_TRACK_ART } },
  // The header's avatar card is its own picture (43c4de), the form's layout-2 stage the hero; the
  // footer's photograph (ef42b0) is the fourth cover, read by the footer's section.
  Paperback: { photos: PAPERBACK_PHOTOS, avatar: paperbackAvatar, photo: paperbackHero, rowArt: { media: PAPERBACK_TRACK_ART } },
  // The header's avatar card is its own picture, the form's layout-2 stage the hero.
  Headliner: { photos: HEADLINER_PHOTOS, avatar: headlinerAvatar, photo: headlinerHero, rowArt: { media: HEADLINER_TRACK_ART } },
}

// Where each seeded photograph keeps its performer, as the `object-position`
// a cover crop of it takes (JP-129 … JP-133, user call, 2026-10-12). The
// frames' fills are centred covers, and in the gallery's layout-3 tiles and
// layout-1 spotlight, the layout-3 bio's 390 box and the layout-1 and layout-4
// heroes narrow, a centred cover of these files cuts the head off. One string
// per file is enough, because a cover only ever crops one axis: a box wider
// than the file reads the y, a narrower one the x. Keyed by the imported URL,
// so an upload — a data URI of its own — never matches and keeps the site's
// crop, and a seed left in an edited gallery array keeps its entry. A file
// with no entry is centred. Each value is read off a render of every box the
// file stands in, not computed. sectionVm resolves it (`vm.imagePos`,
// `vm.imagesPos`); a site whose crop was fitted to its frame keeps its own.
const FOCUS = new Map([
  [gallery1, '50% 0%'],
  [gallery2, '50% 0%'],
  [gallery3, '50% 0%'],
  [gallery4, '50% 0%'],
  [gallery5, '50% 0%'],
  [gallery6, '50% 0%'],
  [gallery7, '50% 0%'],
  [limeHero, '30% 50%'],
  [grungeStage, '50% 25%'],
  [grungeSinger, '50% 0%'],
  [grungeGallery4, '50% 0%'],
  [grungeGallery7, '50% 0%'],
  [editorialHero, '68% 50%'],
  [editorialStage, '50% 0%'],
  [editorialHeaderAvatar, '50% 0%'],
  [editorialGallery4, '50% 0%'],
  [editorialGallery6, '50% 0%'],
  [editorialGallery7, '50% 0%'],
  [popGallery1, '50% 0%'],
  [popGallery2, '50% 0%'],
  [popStage, '50% 0%'],
  [popGallery4, '50% 0%'],
  [popCalendar, '50% 0%'],
  [popAvatar, '50% 0%'],
])

export const seedFocus = (url) => (url ? FOCUS.get(url) : undefined)

// Resolvers for the two shapes. Both return undefined for an unseeded theme.
//
// The header and the enquiry form are the two categories with two independent
// single-photo slots — a scene and the artist — so this one takes the field key
// as well as the category. Every other caller wants the category's own photo
// and can leave `key` alone.
//
// The form is the odd one of the two: its `image` is the *artist* (layout 1
// draws it as the 48px circle beside the brand), so its second slot is the
// scene rather than the portrait, and it is keyed `photo` rather than `avatar`.
// Retro's is its layout-2 frame's own stage shot (964:64652), the close-up
// singer in a dark jacket, re-encoded at 1200px as `form-stage.jpg`; Lime's
// frame has its own (SEEDS, above).
export const defaultImage = (cat, themeName, key = 'image', design) => {
  const seed = SEEDS[themeName]
  if (!seed) return undefined
  if (key === 'avatar') return cat === 'header' ? (seed.avatars?.[design] ?? seed.avatar) : undefined
  if (key === 'photo') return cat === 'form' ? seed.photo : undefined
  const v = seed.layouts?.[design]?.[cat] ?? seed.photos[cat]
  return Array.isArray(v) ? undefined : v
}

export const defaultImages = (cat, themeName) => {
  const v = SEEDS[themeName]?.photos[cat]
  return Array.isArray(v) ? v : undefined
}

// The third shape: artwork that belongs to a row of a list rather than to the
// section. The media player's tracks and the video section's list have some,
// under every seeded theme.
export const defaultTrackArt = (cat, themeName) =>
  (SEEDS[themeName] ? (SEEDS[themeName].rowArt?.[cat] ?? ROW_ART[cat]) : undefined)
