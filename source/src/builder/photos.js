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
import heroPortrait from './photos/hero-portrait.jpg'
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
  // Figma dresses the track rows with real album covers (The Who, Pink Floyd,
  // Nirvana). Those are not ours to ship, so these are neutral crops of the same
  // live-set photography, in the square framing the design uses.
  // Slots 1–5 are the track thumbnails; slot 6 is the now-playing sleeve.
  media: [track1, track2, track3, track4, track5, sleeve],
  // One per tile in the strip. galActive() highlights slot 4 and shows it in the
  // large viewer, so that slot carries the full-size spotlight photograph and the
  // other six are strip-sized.
  gallery: [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7],
}

// The hero portrait card is a tight crop of the hero photograph in Figma rather
// than a second shot. It is only a *default*: once someone uploads their own photo
// it fills both slots, which is the behaviour the upload control has always had.
export const RETRO_HERO_PORTRAIT = heroPortrait

// Fixed decoration rather than user content, so these are not in FIELDS and are
// gated on `s.retro` like every other decorative element.
export const RETRO_TEXTURE = { grain, map: mapTile }

const isRetro = (themeName) => themeName === 'Retro'

// Resolvers for the two shapes. Both return undefined for the other four themes,
// which is what leaves them rendering exactly as they did before.
export const defaultImage = (cat, themeName) => {
  const v = isRetro(themeName) ? RETRO_PHOTOS[cat] : undefined
  return Array.isArray(v) ? undefined : v
}

export const defaultImages = (cat, themeName) => {
  const v = isRetro(themeName) ? RETRO_PHOTOS[cat] : undefined
  return Array.isArray(v) ? v : undefined
}
