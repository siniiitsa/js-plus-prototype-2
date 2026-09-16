// The seeded mock photography of the two designed templates, exported from their
// Figma frames — Retro's §10.2 page and Lime's layout-1 page.
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
// Retro and Lime are the designed templates (README "Scope boundaries"), so they
// are the ones that seed photography. The other three keep the initials placeholder.

import hero from './photos/hero.jpg'
import headerAvatar from './photos/header-avatar.jpg'
import stage from './photos/stage.jpg'
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
import grain from './photos/grain.jpg'
import limeHero from './photos/lime-hero.jpg'
import limeHeaderAvatar from './photos/lime-header-avatar.jpg'
import limeStage from './photos/lime-stage.jpg'
import limeCalendar from './photos/lime-calendar.jpg'
import limeAvatar from './photos/lime-avatar.jpg'
import limeGallery4 from './photos/lime-gallery-4.jpg'
import limeFormPhoto from './photos/lime-form-photo.jpg'

// Keyed by section category id, matching FIELDS: a single `image` slot takes a
// string, a multi-photo `images` slot takes an array in slot order.
export const RETRO_PHOTOS = {
  header: hero,
  // The bio polaroid and the calendar polaroid stack are one photograph in Figma —
  // the stack is the same card offset and rotated, not three different shots.
  bio: stage,
  calendar: stage,
  form: avatar,
  // The poster the video section's layout 2 stands its player on. The same
  // live-set frame the bio and the calendar use, which is the shot the
  // section's own seeded heading names ("Live at Roomtone").
  video: stage,
  // `media` is deliberately absent: the player shows the artwork of the track it
  // is on, so the section has no photo of its own to seed. Its five track
  // thumbnails belong to the tracks themselves and are seeded through
  // RETRO_TRACK_ART below. (The Figma frame's separate sleeve photograph went
  // with the field — the player was a picture then, and could name a record
  // that was not in the list.)
  // One per tile in the strip. galActive() highlights slot 4 and shows it in the
  // large viewer, so that slot carries the full-size spotlight photograph and the
  // other six are strip-sized.
  gallery: [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7],
}

// Lime's layout-1 frames (964:58588…98) are a different shoot for the artist's
// own photographs and the same images as Retro's for everything else — an
// image-hash walk of both pages settled which. New: the hero and its portrait
// card, the bio's arch (exported at the frame's own CROP, a portrait slice of a
// landscape source), the calendar's photograph — which unlike Retro's is not the
// bio's — the form's avatar and the gallery's spotlight. Shared: the six strip
// thumbnails, the five track covers and the map raster.
//
// The video poster takes the bio's photograph, Retro's rule; Lime's layout-1
// page draws none. The form's second slot is its own, below.
export const LIME_PHOTOS = {
  header: limeHero,
  bio: limeStage,
  calendar: limeCalendar,
  form: limeAvatar,
  video: limeStage,
  gallery: [gallery1, gallery2, gallery3, limeGallery4, gallery5, gallery6, gallery7],
}

// The seeded artwork for the media player's five track rows, in track order.
//
// Figma dresses the rows with real album covers (The Who, Pink Floyd, Nirvana).
// Those are not ours to ship, so these are neutral crops of the same live-set
// photography, in the square framing the design uses.
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

// Per-row artwork by category. Both lists seed only the untouched default rows:
// once the artist edits the list, the art travels in the row itself
// (`c.tracks[i].image`), so a row they add past the seed has none and falls
// back to the initials placeholder. Lime's frames dress the rows with the same
// covers, so both templates share it.
const ROW_ART = { media: RETRO_TRACK_ART, video: RETRO_VIDEO_ART }

// The artist avatar, cropped from the §10.2 hero frame's `pp` card (Figma node
// 964:58576) — a tight portrait from a different shot than the backdrop behind
// it, which is the whole reason the header's two photos are separate `image` /
// `avatar` content keys: uploading a backdrop leaves this crop in place, and
// vice versa. Kept at 384px, roughly 2× the card's 158px render. Lime's is the
// centre square of its own `pp` card's source (964:58588), at the same size.
export const RETRO_HEADER_AVATAR = headerAvatar
export const LIME_HEADER_AVATAR = limeHeaderAvatar

// Fixed decoration rather than user content, so these are not in FIELDS. The
// grain is Retro's alone; the map raster is also Lime's (sectionVm decides).
export const RETRO_TEXTURE = { grain, map: mapTile }

// Everything a template seeds, by `THEMES[].name`. A theme with no row seeds
// nothing, which is what leaves the flat three rendering exactly as they did.
//   photos — the section photographs above
//   avatar — the header's and the video section's artist portrait (`avatar` key)
//   photo  — the enquiry form's scene (`photo` key)
//
// Lime's scene is the whole source of its layout-2 frames' stage shot (Figma
// 964:64595, hash f821adc2 — the same image its form avatar is the centre square
// of), exported at 1200 × 800 with no crop: every master fills it untransformed,
// so a centred cover is the frame's own picture at 838 × 437, 334 × 437 and
// 370 × 262. Only the form's layout 2 reads `photo`.
const SEEDS = {
  Retro: { photos: RETRO_PHOTOS, avatar: RETRO_HEADER_AVATAR, photo: stage },
  Lime: { photos: LIME_PHOTOS, avatar: LIME_HEADER_AVATAR, photo: limeFormPhoto },
}

// Resolvers for the two shapes. Both return undefined for an unseeded theme.
//
// The header, the video section and the enquiry form are the three categories
// with two independent single-photo slots — a scene and the artist — so this one
// takes the field key as well as the category. Every other caller wants the
// category's own photo and can leave `key` alone.
//
// The form is the odd one of the three: its `image` is the *artist* (layout 1
// draws it as the 48px circle beside the brand), so its second slot is the
// scene rather than the portrait, and it is keyed `photo` rather than `avatar`.
// Retro's takes the same live-set frame the bio and the video section stand on —
// layout 2's frame is a stage shot, and it is the only photograph in Retro's
// seeded set that is one. Lime's frame has its own (SEEDS, above).
export const defaultImage = (cat, themeName, key = 'image') => {
  const seed = SEEDS[themeName]
  if (!seed) return undefined
  if (key === 'avatar') return cat === 'header' || cat === 'video' ? seed.avatar : undefined
  if (key === 'photo') return cat === 'form' ? seed.photo : undefined
  const v = seed.photos[cat]
  return Array.isArray(v) ? undefined : v
}

export const defaultImages = (cat, themeName) => {
  const v = SEEDS[themeName]?.photos[cat]
  return Array.isArray(v) ? v : undefined
}

// The third shape: artwork that belongs to a row of a list rather than to the
// section. The media player's tracks and the video section's list have some,
// under both seeded themes.
export const defaultTrackArt = (cat, themeName) =>
  (SEEDS[themeName] ? ROW_ART[cat] : undefined)
