// The seeded mock photography of the designed templates, exported from their
// Figma frames — Retro's §10.2 page, Lime's four layout pages and Grunge's and
// Editorial's layout-1 pages. Grunge's layout-2, layout-3 and layout-4 frames drew nothing
// new: every photograph they carry is already seeded here, the layout-3 bio's
// crop taken as an objectPosition on grungeStage rather than as a second
// export, and the layout-4 bio's a centred cover of the same file.
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
// Retro, Lime, Grunge and Editorial are the templates with Figma frames of
// their own, so they are the ones that seed photography. Pop keeps the
// initials placeholder.

import hero from './photos/hero.jpg'
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
import editorialHeader from './photos/editorial-header.jpg'
import popHeader from './photos/pop-header.jpg'

const REVIEWERS = [review1, review2, review3]

// Keyed by section category id, matching FIELDS: a single `image` slot takes a
// string, a multi-photo `images` slot takes an array in slot order.
export const RETRO_PHOTOS = {
  header: hero,
  // The bio polaroid and the calendar polaroid stack are one photograph in Figma —
  // the stack is the same card offset and rotated, not three different shots.
  bio: stage,
  calendar: stage,
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
  calendar: editorialCalendar,
  form: editorialHeaderAvatar,
  gallery: [editorialStage, editorialHeaderAvatar, editorialCalendar, editorialGallery4, editorialHero, editorialGallery6, editorialGallery7],
  pricing: REVIEWERS,
}

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

// Per-row artwork by category. The list seeds only the untouched default rows:
// once the artist edits the list, the art travels in the row itself
// (`c.tracks[i].image`), so a row they add past the seed has none and falls
// back to the initials placeholder. Lime's frames dress the rows with the same
// covers (identical hashes), so both templates share it.
const ROW_ART = { media: RETRO_TRACK_ART }

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

// Fixed decoration rather than user content, so these are not in FIELDS. The
// grain is Retro's, Grunge's and Editorial's (its tape); the map raster is every designed template's
// (sectionVm decides).
// `mapRadial` is the events map's layout-3 plate, the frame's own radial street
// raster (964:68649's Map Texture), re-encoded at 900px; it is drawn as it is,
// where `map` is inverted onto a dark plate.
export const RETRO_TEXTURE = { grain, map: mapTile, mapRadial }

// The template picker's picture of each flat template: a flattened render of its
// Figma header instance (Editorial 964:58612, Pop 964:58624; Grunge's went when
// its hero was fitted, and its card is a live HeaderV0 like Retro's and Lime's),
// shown in place of the flat header until the template is designed. A still
// because the frames set their type in demo faces this app cannot load, so it
// carries Figma's mock copy rather than the artist's name. 1440×750 is the
// picker frame's own 1180×614 aspect to within a pixel. Picker only — nothing
// the editor renders reads this.
export const TEMPLATE_STILLS = { Editorial: editorialHeader, Pop: popHeader }

// Everything a template seeds, by `THEMES[].name`. A theme with no row seeds
// nothing, which is what leaves Pop rendering exactly as it did.
//   photos — the section photographs above
//   avatar — the header's artist portrait (`avatar` key)
//   photo  — the enquiry form's scene (`photo` key)
//   layouts — a section photograph that one layout's frame draws differently,
//             by design index, then category; it wins over `photos` there
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
}

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
  if (key === 'avatar') return cat === 'header' ? seed.avatar : undefined
  if (key === 'photo') return cat === 'form' ? seed.photo : undefined
  const v = seed.layouts?.[design]?.[cat] ?? seed.photos[cat]
  return Array.isArray(v) ? undefined : v
}

export const defaultImages = (cat, themeName) => {
  const v = SEEDS[themeName]?.photos[cat]
  return Array.isArray(v) ? v : undefined
}

// The third shape: artwork that belongs to a row of a list rather than to the
// section. The media player's tracks have some, under every seeded theme.
export const defaultTrackArt = (cat, themeName) =>
  (SEEDS[themeName] ? ROW_ART[cat] : undefined)
