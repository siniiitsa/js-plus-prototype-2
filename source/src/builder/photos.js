// Retro's seeded mock photography, exported from the §10.2 Figma frames.
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
// Retro is the only designed template (README "Scope boundaries"), so it is the only
// one that seeds photography. The other four keep the initials placeholder.

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
import sleeve from './photos/sleeve.jpg'
import mapTile from './photos/map.jpg'
import grain from './photos/grain.jpg'

// Keyed by section category id, matching FIELDS: a single `image` slot takes a
// string, a multi-photo `images` slot takes an array in slot order.
export const RETRO_PHOTOS = {
  header: hero,
  // The bio polaroid and the calendar polaroid stack are one photograph in Figma —
  // the stack is the same card offset and rotated, not three different shots.
  bio: stage,
  calendar: stage,
  form: avatar,
  // The media player's single photo slot is the big now-playing sleeve. The five
  // track thumbnails are not here: they belong to the tracks themselves, and are
  // seeded through RETRO_TRACK_ART below.
  media: sleeve,
  // One per tile in the strip. galActive() highlights slot 4 and shows it in the
  // large viewer, so that slot carries the full-size spotlight photograph and the
  // other six are strip-sized.
  gallery: [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7],
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

// The artist avatar, cropped from the §10.2 hero frame's `pp` card (Figma node
// 964:58576) — a tight portrait from a different shot than the backdrop behind
// it, which is the whole reason the header's two photos are separate `image` /
// `avatar` content keys: uploading a backdrop leaves this crop in place, and
// vice versa. Kept at 384px, roughly 2× the card's 158px render.
export const RETRO_HEADER_AVATAR = headerAvatar

// Fixed decoration rather than user content, so these are not in FIELDS and are
// gated on `s.retro` like every other decorative element.
export const RETRO_TEXTURE = { grain, map: mapTile }

const isRetro = (themeName) => themeName === 'Retro'

// Resolvers for the two shapes. Both return undefined for the other four themes,
// which is what leaves them rendering exactly as they did before.
//
// The header is the one category with two independent single-photo slots, so
// this one takes the field key as well as the category. Every other caller wants
// the category's own photo and can leave `key` alone.
export const defaultImage = (cat, themeName, key = 'image') => {
  if (!isRetro(themeName)) return undefined
  if (key === 'avatar') return cat === 'header' ? RETRO_HEADER_AVATAR : undefined
  const v = RETRO_PHOTOS[cat]
  return Array.isArray(v) ? undefined : v
}

export const defaultImages = (cat, themeName) => {
  const v = isRetro(themeName) ? RETRO_PHOTOS[cat] : undefined
  return Array.isArray(v) ? v : undefined
}

// The third shape: artwork that belongs to a row of a list rather than to the
// section. Only the media player's tracks have any, and only under Retro.
export const defaultTrackArt = (cat, themeName) =>
  (isRetro(themeName) && cat === 'media' ? RETRO_TRACK_ART : undefined)
