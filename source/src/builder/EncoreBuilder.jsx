// §5–§9 — all state, all chrome, all interaction.
// Deliberately monolithic (§12.11): only SectionRow and EditPanel are extracted.

import { useCallback, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  GripVertical, ChevronUp, ChevronDown, ArrowUp, ArrowDown, MoreHorizontal,
  Pencil, Palette, X, Trash2, ChevronLeft, ArrowRight,
  Layers, Plus, Check, Upload, Lock, ExternalLink,
} from 'lucide-react'
import { toast as sonnerToast, Toaster } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog, DialogContent, DialogDescription, DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer, DrawerContent, DrawerDescription, DrawerTitle,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import EncoreSection from './EncoreSection.jsx'
import {
  THEMES, CATS, NVAR, FLAG, FIELDS, TITLES, DEFS, TRACKS, TAGS, TIERS, QUOTES,
  CITIES, PINS, BOOKED, HELD, EXAMPLE_PAGE,
  NOW_PLAYING, TIER_MODES, SONGS, PAGES,
  GIGS, MAP_RADIUS, MAP_BASE, MAP_TERMS, GALLERY_SOURCES,
  FORM_PROMISES, FORM_FIELDS, FORM_TYPES, FORM_MESSAGE,
  FOOTER_LINKS, FOOTER_CREDIT, FOOTER_STATEMENT,
  CAL_MONTH, CAL_DAYS, CAL_LEAD, CAL_LENGTH, CAL_PICKED, CAL_ENQUIRY,
  CTA_TARGETS, firstPresent, minimalNav,
  catById, catName, contrast, lum, mix, rgba, caseText, fieldDefault, songTags, repChips,
  headerFamily, layoutCount, designCount,
  headerLayout, headerLayoutLabel,
} from './data.js'
import { defaultImage, defaultImages, RETRO_TEXTURE } from './photos.js'

/* ------------------------------------------------------------------ *
 * §5.5 Axis B — canvas device preview sizing
 * ------------------------------------------------------------------ */

const SIZES = {
  mobile:  { h1: '42px', h1b: '50px',  h2: '29px', pad: '44px 22px', navGap: '36px', split: '1fr',         g3: '1fr',           g2: '1fr',       canvasW: '390px'  },
  tablet:  { h1: '60px', h1b: '78px',  h2: '36px', pad: '56px 40px', navGap: '48px', split: '1fr 1fr',     g3: '1fr 1fr 1fr',   g2: '1fr 1fr',   canvasW: '768px'  },
  desktop: { h1: '86px', h1b: '118px', h2: '46px', pad: '80px 64px', navGap: '64px', split: '1.05fr 1fr',  g3: '1fr 1fr 1fr',   g2: '1fr 1fr',   canvasW: '1180px' },
}

// §10.2 — the Figma type ramp, layered on top of SIZES rather than replacing it:
// the layout variants this pass does not touch still read h1/h1b/h2.
//
// Figma's tablet (768) and mobile (390) frames are exactly canvasW, so those
// numbers are used verbatim. Its desktop frame is 1440 against a 1180 canvas,
// so desktop values are the Figma value × 1180/1440 ≈ 0.82, rounded.
// `narrow` is the second responsive switch the Figma layouts need: the nav
// collapses to a hamburger on tablet as well as mobile, while `mob` (mobile
// only) still drives the single-column collapses.
const RAMP = {
  mobile:  { dispXl: '77px',  dispLg: '40px', dispSm: '26px', title: '18px', labelMd: '14px', labelXs: '14px', eyebrow: '11px', gPad: '20px', gGap: '18px', padY: '44px', padX: '22px', narrow: true },
  tablet:  { dispXl: '77px',  dispLg: '64px', dispSm: '34px', title: '22px', labelMd: '14px', labelXs: '14px', eyebrow: '13px', gPad: '32px', gGap: '28px', padY: '56px', padX: '40px', narrow: true },
  desktop: { dispXl: '105px', dispLg: '79px', dispSm: '33px', title: '20px', labelMd: '16px', labelXs: '14px', eyebrow: '12px', gPad: '46px', gGap: '36px', padY: '80px', padX: '64px', narrow: false },
}

// The two keys that only matter once a window is wider than the canvas its
// frame was drawn at — see PublishedPage, the one place that sets a surplus.
//
// `surplus` is half the width past `canvasW`, and it is zero everywhere else:
// the editor caps its canvas at canvasW and the preview thumbnails render at a
// hard 1180, so both are already exactly at their frame.
// `heroH` is the height HeaderV0's aspectRatio yields *at* canvasW — 390×844/390,
// 768×4/3, 1180×8.33/16. It is the one section outside the root's padding, so a
// wider window would otherwise make it proportionally taller: 1333px at 2560.
// Clamping to this number is inert at the canvas and holds the band past it.
const WIDE = {
  mobile:  { surplus: '0px', heroH: 844 },
  tablet:  { surplus: '0px', heroH: 1024 },
  desktop: { surplus: '0px', heroH: 614 },
}
for (const k of Object.keys(SIZES)) Object.assign(SIZES[k], RAMP[k], WIDE[k])

/* ------------------------------------------------------------------ *
 * §5.5 Axis A — builder chrome breakpoint
 * ------------------------------------------------------------------ */

function useIsMobile() {
  const [m, setM] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 820px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 820px)')
    const on = (e) => setM(e.matches)
    mq.addEventListener('change', on)
    setM(mq.matches)
    return () => mq.removeEventListener('change', on)
  }, [])
  return m
}

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

// The editor root closes menus on any bubbled click, so virtually every
// interactive handler and every modal panel isolates its events (§5.6).
const stopE = (e) => e.stopPropagation()

const initialsOf = (name) =>
  String(name).trim().split(/\s+/).map((w) => w[0] || '').join('').slice(0, 2).toUpperCase()

// §5.4 — header stays at index 0, footer stays last, and optional sections
// may only move between them.
function canMove(sections, id, dir) {
  const i = sections.findIndex((s) => s.id === id)
  const sec = sections[i]
  if (!sec) return false
  if (sec.cat === 'header' || sec.cat === 'footer') return false
  const j = i + dir
  return j >= 1 && j <= sections.length - 2
}

/* ------------------------------------------------------------------ *
 * §5.7 View-model construction
 * Everything EncoreSection needs, fully resolved. Callable for an
 * arbitrary theme so the template gallery (§6) and the layout dropdown's
 * thumbnails (§9.1) can render a theme that is not the active one.
 * ------------------------------------------------------------------ */

// The lightest colour in the palette — the surface §10.2 paints its cards on,
// and the ink for type sitting over a photographic scrim. Falls back to the
// Retro off-white when the palette is dark on dark.
const paperOf = (bg, tx) =>
  (lum(bg) > lum(tx) ? (lum(bg) > 0.6 ? bg : '#FBF6EA') : (lum(tx) > 0.6 ? tx : '#FBF6EA'))

export function sectionVm({ themeIdx, cat, arch, c = {}, artistName, Z, mob, live = false, navSections = [] }) {
  const T = THEMES[themeIdx]
  const [bg, ac, tx] = T.palette
  const acFg = contrast(ac)
  const cased = (t) => caseText(t, T.casing)
  const cv = (k, fb) => (c[k] !== undefined ? c[k] : fb)

  const nDesign = designCount(cat, T.name)
  const d = ((arch % nDesign) + nDesign) % nDesign

  // §10.2 sets several labels in a palette hue rather than the text colour.
  // That reads only while the hue separates from the background — in a palette
  // whose background IS that hue's neighbour it must fall back to the text.
  const legible = (h) => (Math.abs(lum(h) - lum(bg)) > 0.22 ? h : tx)

  const vm = {
    // colours
    bg, ac, tx, acFg,
    muted: rgba(tx, 0.64),
    line: rgba(tx, 0.16),
    line2: rgba(tx, 0.40),
    soft: rgba(tx, 0.08),
    soft2: rgba(tx, 0.18),
    ac55: rgba(ac, 0.55),
    acFg12: rgba(acFg, 0.12),
    acFg20: rgba(acFg, 0.20),
    acFg25: rgba(acFg, 0.25),
    acFg80: rgba(acFg, 0.80),
    // Opaque tonal shift of the background — the torn paper edges sit across a
    // section boundary, so they cannot be a translucent overlay.
    edge: mix(bg, tx, 0.13),
    // The lightest colour in the palette, for type that always sits over the
    // dark scrim of a photographic hero. Falls back to the Retro off-white when
    // the palette is dark on dark.
    paper: paperOf(bg, tx),
    // Type on a `paper` surface must never be `tx`: in a palette where the text
    // colour IS the lightest colour that renders invisible.
    paperFg: contrast(paperOf(bg, tx)),
    paperLine: rgba(contrast(paperOf(bg, tx)), 0.5),
    // The palette's darkest hue, for the panels §10.2 paints near-black
    // (the media player card, the events map band).
    deep: T.tags.reduce((d, h) => (lum(h) < lum(d) ? h : d), T.tags[0]),
    deepFg: contrast(T.tags.reduce((d, h) => (lum(h) < lum(d) ? h : d), T.tags[0])),
    deepFg25: rgba(contrast(T.tags.reduce((d, h) => (lum(h) < lum(d) ? h : d), T.tags[0])), 0.25),
    // §10.2 stands the events map on a lifted charcoal rather than the page
    // background, so its full-bleed checkerboard bands and cream type read.
    // Not `deep` itself — Retro's darkest hue is #111 and the reference ground
    // sits a little above black.
    mapBg: mix(T.tags.reduce((d, h) => (lum(h) < lum(d) ? h : d), T.tags[0]), paperOf(bg, tx), 0.11),
    mapFg: paperOf(bg, tx),

    // theme typography
    display: T.display, label: T.label, body: T.body, dls: T.dls,
    radius: T.radius, radiusSm: T.radiusSm, btnR: T.btnR, bw: T.bw,

    // device sizing
    ...Z, mob: !!mob,

    // True only in the published tab. The editor canvas is a picture of a
    // website, not a website (§12.7), so every control EncoreSection draws is
    // a static span there. This is the one flag a control may branch on to
    // become real. Two read it: Repertoire's search, chips and pager, and the
    // header's navigation — its links, its Book Now and Listen, and the burger
    // menu the narrow frames collapse to.
    live: !!live,

    // The section's own id on the published page, so a nav link can scroll to
    // it. Live-gated where it is applied, not here: the editor document renders
    // a dozen header previews at once through LayoutPicker and HeaderChoices,
    // and they would all claim id="header".
    anchor: cat,

    // design selector
    v0: d === 0, v1: d === 1, v2: d === 2, v3: d === 3, v4: d === 4, v5: d === 5,
    flatHeader: cat === 'header' && headerFamily(T.name) === 'flat',

    // §10.2 — the layouts are shared by every template, but the Figma page's
    // decorative treatment (grain, torn edges, checkerboard, hard offset
    // shadows, rotated cards) is Retro's alone. Same split as headerFamily():
    // the other four render the identical structure, flat.
    retro: T.name === 'Retro',
  }

  // ---- content -----------------------------------------------------
  const initials = initialsOf(artistName)
  vm.initials = initials
  vm.brand = cased(artistName)
  vm.heroTitle = cased(cv('title', artistName))
  vm.title = cased(cv('heading', cat === 'header' ? artistName : (TITLES[cat] ?? '')))

  // header
  vm.kicker = cv('kicker', 'DJ · Live Act')
  vm.subtitle = cv('subtitle', DEFS.heroSub)
  vm.location = cv('location', 'Manchester, UK')
  vm.cta1 = cv('cta1', 'Book Now')
  vm.cta2 = cv('cta2', 'Listen')
  vm.showTags = cv('showTags', 'show')
  vm.showBadge = cv('showBadge', 'show')
  vm.badgeText = cv('badgeText', artistName)
  vm.navMode = cv('navMode', 'sections')
  vm.align = cv('align', 'left')
  // Retro seeds the §10.2 mock photography; the other four themes resolve to
  // undefined and keep the initials placeholder. `undefined` already means "key
  // absent", which is what a fresh section carries, so Remove writes `null` as an
  // explicit-clear sentinel: absent → the mock photo, null → the placeholder,
  // string → an upload.
  vm.image = c.image !== undefined ? (c.image ?? undefined) : defaultImage(cat, T.name)
  // The artist avatar is a slot of its own — the hero portrait card, the
  // inset-card thumb and the overlay-card circle — on the same three states as
  // vm.image, keyed on `avatar`. Retro seeds it with the §10.2 portrait, which
  // is a different photograph from the backdrop; elsewhere an empty avatar is
  // the initials placeholder. A backdrop upload no longer fills it.
  vm.avatar = c.avatar !== undefined ? (c.avatar ?? undefined)
    : defaultImage(cat, T.name, 'avatar')
  // Multi-photo sections (gallery strip, media artwork). Slot n fills tile n;
  // an empty slot falls through to the section's initials placeholder. An
  // explicitly emptied array is already distinguishable, so no sentinel is needed.
  vm.images = Array.isArray(c.images) ? c.images : (defaultImages(cat, T.name) ?? [])
  // Fixed Retro decoration — paper grain and the events-map raster (§10.2).
  vm.grainSrc = T.name === 'Retro' ? RETRO_TEXTURE.grain : undefined
  vm.mapSrc = T.name === 'Retro' ? RETRO_TEXTURE.map : undefined

  // §4.8 — `navSections` is `{ cat, label }`, and a nav link keeps the target
  // as `to` so the published page can scroll to it (§4.3a).
  //
  // §10.2 also collapsed mobile to the fixed triple regardless of navMode. That
  // rule was about a horizontal bar, which cannot carry "Booking Calendar" and
  // "Enquiry Form" at 390px — the burger panel is a column and has the room, so
  // mobile now shows the artist's own sections like every other width.
  vm.navLinks = vm.navMode === 'minimal'
    ? minimalNav(navSections)
    : navSections.map((n) => ({ label: n.label, to: n.cat }))

  // The header's two CTAs point at a section as well: Book Now at wherever the
  // page takes a booking, Listen at wherever it plays something (§4.3a).
  vm.bookTo = firstPresent(CTA_TARGETS.book, navSections)
  vm.listenTo = firstPresent(CTA_TARGETS.listen, navSections)

  // chips — from TAGS, or from the tags field for a tags section
  const tagSource = cat === 'tags'
    ? String(cv('tags', TAGS.join(', '))).split(',').map((t) => t.trim()).filter(Boolean)
    : TAGS
  vm.chips = tagSource.map((t, i) => {
    const cbg = T.tags[i % T.tags.length]
    return { label: cased(t), bg: cbg, fg: contrast(cbg) }
  })

  // §10.2 — the Book Now pill is accent-coloured type on a second palette hue,
  // not on the accent itself. The reference uses the palette's lightest hue
  // (Retro's mustard) so the pill reads as a highlight; the accent is kept as
  // the type only while it stays legible against it.
  const pillBg = T.tags
    .filter((h) => h !== bg && h !== ac)
    .reduce((best, h) => (lum(h) > lum(best) ? h : best), T.tags.find((h) => h !== bg && h !== ac) || T.tags[0])
  vm.pillBg = pillBg
  vm.pillFg = Math.abs(lum(pillBg) - lum(ac)) > 0.22 ? ac : contrast(pillBg)

  // bio
  vm.bioP1 = cv('para1', DEFS.bioP1)
  vm.bioP2 = cv('para2', DEFS.bioP2)
  vm.bioQuote = cased(cv('statement', DEFS.statement))

  // media
  vm.mediaKicker = cv('kicker', 'Top tracks')
  vm.mediaTrack = cased(cv('track', 'Late Lights'))
  vm.nowPlaying = { ...NOW_PLAYING, track: cased(NOW_PLAYING.track), by: cased(artistName) }

  // audio — parsed from the textarea, else from TRACKS. `n` is naively '0'+index.
  if (c.tracks !== undefined) {
    vm.tracks = String(c.tracks).split('\n').map((l) => l.trim()).filter(Boolean).map((l, i) => {
      const parts = l.includes('—') ? l.split('—') : l.split('|')
      const dur = (parts[1] || '').trim()
      return { n: '0' + (i + 1), name: cased((parts[0] || '').trim()), dur, sub: dur }
    })
  } else {
    vm.tracks = TRACKS.map(([name, dur, rel], i) => ({
      n: '0' + (i + 1), name: cased(name), dur, sub: `${rel} · ${dur}`,
    }))
  }
  vm.tracks3 = vm.tracks.slice(0, 3)

  // video
  vm.videoDesc = cv('description', DEFS.videoDesc)
  vm.videoDur = cv('duration', '04:18')

  // pricing
  vm.pricingSub = cv('sub', DEFS.pricingSub)
  // §10.2 sets the small print in a warm grey well above `muted`'s 64%.
  vm.pricingSubFg = rgba(tx, 0.46)
  vm.tierModes = TIER_MODES
  vm.tiers = TIERS.map((t, i) => {
    // §10.2 paints the three cards in three different palette hues rather than
    // one accent. Walking T.tags backwards from index 3 lands on olive, gold,
    // orange under Retro — the reference order — and stays in-palette elsewhere.
    const card = T.tags[((3 - i) % T.tags.length + T.tags.length) % T.tags.length]
    // Each card also carries a *second* hue. The price numeral, the tick, the
    // [ico] chip and the Book Now pill are all painted in it, and it is the
    // colour of the offset block behind the card too. The reference uses the
    // palette's gold for the olive and orange cards and the accent for the gold
    // one — which is exactly `pillBg`, unless the card already IS `pillBg`.
    const accHue = card === pillBg ? ac : pillBg
    // The reference inks the cards in the palette's cream and near-black, not
    // in pure white/black: contrast() picks the side, the palette the tone.
    const lightCard = contrast(card) === '#141414'
    const ink = lightCard ? vm.deep : vm.paper
    // Same caveat as `legible()` above: the second hue only reads while it
    // separates from the card it sits on. Retro's three clear it; a mid-tone
    // card in a pale palette (Editorial's warm grey) does not, and there the
    // card's own ink stands in.
    const acc = Math.abs(lum(accHue) - lum(card)) > 0.22 ? accHue : ink
    const base = {
      name: cv(`t${i + 1}n`, t.name), price: cv(`t${i + 1}p`, t.price),
      blurb: t.blurb, feats: t.feats,
      card, acc, cardFg: ink,
      // Only the light card drops its blurb and /event off full strength in the
      // reference; on the two dark ones they sit at the feats' cream.
      cardMut: lightCard ? rgba(ink, 0.72) : ink,
    }
    return t.featured
      ? {
          ...base, bg: ac, tx: acFg, border: ac, nameC: acFg,
          mut: rgba(acFg, 0.7), tick: acFg, btnBg: acFg, btnFg: ac,
        }
      : {
          ...base, bg: 'transparent', tx, border: rgba(tx, 0.18), nameC: ac,
          mut: rgba(tx, 0.6), tick: ac, btnBg: ac, btnFg: acFg,
        }
  })

  // repertoire — the artist's own list, else the seeded one. The semantics are
  // `images`, not `image`: an emptied array is already distinguishable from an
  // absent key, so only an absent key falls back and no null sentinel is needed.
  const songList = Array.isArray(c.songs) ? c.songs : SONGS
  vm.songs = songList.map((t, i) => ({
    n: i + 1,
    title: String((t && t.title) ?? '').trim(),
    artist: cased(String((t && t.artist) ?? '').trim()),
    // Raw casing, deliberately: a lower-case theme must not stop a chip from
    // matching the tag it was derived from.
    tags: songTags(t && t.tags),
  }))
  // `label` is cased for the chip, `tag` is what the filter compares.
  vm.repChips = repChips(songList).map((ch) => ({ ...ch, label: cased(ch.label) }))
  // Layout 2 has no chip row, so its right-hand column takes the artist rather
  // than a tag — but it takes the artist's *songs*, so swapping layouts never
  // silently discards what they typed.
  vm.repFlat = vm.songs.map((t) => ({ t: t.title, g: t.artist }))
  vm.repHue = legible(T.tags[3 % T.tags.length])
  // Still static, and still only for the events map's picture of a pager.
  vm.pages = PAGES
  // The heading counts the list unless the artist has written their own, so it
  // cannot go on claiming 240 songs over a list of twelve. EditPanel resolves
  // the same fallback, or the panel and the canvas would disagree.
  if (cat === 'repertoire' && c.heading === undefined) vm.title = cased(`${vm.songs.length} Songs`)

  // gallery
  vm.gal = ['01', '02', '03', '04', '05', '06']
  vm.gal4 = vm.gal.slice(0, 4)
  // Tag order per the Figma gallery frame: Gallery/YouTube/Instagram/TikTok
  // tiles read accent-red, olive, purple, yellow — tags 1, 3, 0, 2 in Retro.
  vm.gallerySources = GALLERY_SOURCES.map((l, i) => {
    const cbg = T.tags[[1, 3, 0, 2][i] % T.tags.length]
    return { label: cased(l), bg: cbg, fg: contrast(cbg), ink: legible(cbg), on: i === 0 }
  })

  // calendar — 2 leading blanks, days 1..31, padded to 35 cells
  if (cat === 'calendar') {
    const cells = [{ d: '' }, { d: '' }]
    for (let day = 1; day <= 31; day++) {
      if (BOOKED.includes(day)) cells.push({ d: day, bg: ac, fg: acFg })
      else if (HELD.includes(day)) cells.push({ d: day, bg: rgba(tx, 0.14), fg: tx })
      else cells.push({ d: day, bg: 'transparent', fg: tx })
    }
    while (cells.length < 35) cells.push({ d: '' })
    vm.cal = cells.map((c2) => ({ d: c2.d, bg: c2.bg ?? 'transparent', fg: c2.fg ?? tx }))

    // §10.2 scheduler — a plain month grid with one picked day, no legend.
    const grid = Array.from({ length: CAL_LEAD }, () => ({ d: '' }))
    for (let day = 1; day <= CAL_LENGTH; day++) grid.push({ d: day, on: day === CAL_PICKED })
    vm.sched = grid
  }
  vm.calPara = cv('para', DEFS.calPara)
  vm.calCta = cv('cta', 'Check a date')
  vm.monthLabel = cased('August 2026')
  vm.calMonth = CAL_MONTH
  vm.calDays = CAL_DAYS
  vm.calEnquiry = CAL_ENQUIRY

  // map
  vm.cities = CITIES
  vm.pins = PINS
  vm.mapSub = cv('sub', DEFS.mapSub)
  // The events map renders on `mapBg` for Retro rather than the page background,
  // so a row hue has to separate from that charcoal — Retro's near-black tag reads
  // fine on sand and disappears on the dark. Fall back to the cream, as §10.2 does.
  const gigDark = cat === 'map' && T.name === 'Retro'
  const gigGround = gigDark ? vm.mapBg : bg
  const gigFallback = gigDark ? vm.mapFg : tx
  vm.gigs = GIGS.map((g, i) => {
    const h = T.tags[i % T.tags.length]
    return { ...g, hue: Math.abs(lum(h) - lum(gigGround)) > 0.22 ? h : gigFallback }
  })
  vm.mapRadius = MAP_RADIUS
  vm.mapBase = MAP_BASE
  vm.mapTerms = MAP_TERMS

  // testimonials
  vm.quotes = QUOTES.map((q, i) => (i === 0
    ? { ...q, q: cv('quote', q.q), who: cv('who', q.who), role: cv('role', q.role) }
    : q))
  vm.quote1 = cased(cv('quote', QUOTES[0].q))

  // form
  vm.formPara = cv('para', DEFS.formPara)
  vm.formEmail = cv('email', 'bookings@kaimercer.co.uk')
  vm.formBtn = cv('button', 'Book Now')
  vm.formPromises = FORM_PROMISES
  vm.formFields = FORM_FIELDS
  vm.formTypes = FORM_TYPES.map((l) => cased(l))
  vm.formMessage = FORM_MESSAGE

  // footer
  vm.copyright = cv('copyright', DEFS.copyright)
  // The §10.2 footer frames break this line by hand after "make" and let the
  // measure fold the rest — that is what sets the three-line block the left
  // column is built round, and it does not fall out of the measure alone in a
  // display face narrower than the frame's. Kept in step with FIELDS.footer's
  // own default, and rendered `pre-wrap` so an edited statement can break too.
  vm.footerStatement = cased(cv('statement', FOOTER_STATEMENT))
  vm.footerLinks = FOOTER_LINKS.map((col) => col.map((l) => cased(l)))
  vm.footerCredit = FOOTER_CREDIT

  vm[FLAG[cat]] = true
  return vm
}

/* ------------------------------------------------------------------ *
 * A scaled, non-interactive render of a section — used for the template
 * gallery previews (§6) and the layout-dropdown thumbnails (§9.1).
 * ------------------------------------------------------------------ */

function ScaledPreview({ vm, height, autoMax = 0, base = 1180, radius = 0, fill = true, center = false, fit = false, onNatural }) {
  const ref = useRef(null)
  const inRef = useRef(null)
  // §6 — stage 2 frames every layout alike, which means knowing how tall each
  // one renders before it can size that frame. Held in a ref so the measuring
  // effect stays mount-only: it reads the latest callback, never re-subscribes.
  const natRef = useRef(onNatural)
  natRef.current = onNatural
  // w/h are the pane, ch the unscaled height of the render inside it. A
  // transform does not affect layout, so measuring ch cannot feed back.
  const [box, setBox] = useState({ w: 0, h: 0, ch: 0 })
  useEffect(() => {
    const el = ref.current
    const ie = inRef.current
    if (!el) return
    const read = () => {
      const ch = ie ? ie.scrollHeight : 0
      setBox({ w: el.clientWidth, h: el.clientHeight, ch })
      if (ch) natRef.current?.(ch)
    }
    const ro = new ResizeObserver(read)
    ro.observe(el)
    if (ie) ro.observe(ie)
    read()
    return () => ro.disconnect()
  }, [])
  // §6 — `fit` scales to whichever axis binds first, so a render taller than its
  // frame shrinks to fit rather than being cropped by it. Everything else scales
  // on width alone, which is what keeps a column of previews at one zoom.
  const fitting = fit && box.ch && box.h
  const scale = fitting ? Math.min(box.w / base, box.h / box.ch) : (box.w ? box.w / base : 0)
  // §6 — the template picker frames every theme identically, so a header that
  // renders shorter than the frame is centred in it rather than dropped to the
  // top with all the slack below. A fitted render is centred on both axes.
  const top = (center || fit) && box.ch ? Math.round((box.h - box.ch * scale) / 2) : 0
  const left = fitting ? Math.round((box.w - base * scale) / 2) : 0
  // §9.1 — `autoMax` sizes the pane to the render's own height instead of a fixed
  // one, so a short section shows end to end and a tall one clips at the cap. No
  // feedback loop: `scale` reads clientWidth only, and a transform does not lay out,
  // so the pane's height can never change `ch`. Before `ch` is measured the pane
  // opens at the cap rather than collapsed, so there is no pop-in on first paint.
  const paneH = autoMax
    ? (box.ch ? Math.min(Math.round(box.ch * scale), autoMax) : autoMax)
    : height
  return (
    <div ref={ref} style={{
      height: paneH, overflow: 'hidden', position: 'relative', borderRadius: radius,
      // Shorter layouts leave room below the scaled render; painting the pane in
      // the section's own background keeps it reading as a real page.
      background: fill ? vm.bg : undefined,
    }}>
      {/* The render is a picture of a page, not a page: `inert` keeps its links
          out of the tab order and the a11y tree, so the pane reads as the one
          control it sits inside. */}
      <div ref={inRef} inert aria-hidden="true" style={{
        width: base, transform: `scale(${scale})`, transformOrigin: 'top left',
        pointerEvents: 'none', userSelect: 'none',
        ...(center || fit ? { position: 'absolute', top, left } : null),
      }}>
        <EncoreSection s={vm} />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Small chrome atoms
 * ------------------------------------------------------------------ */

function IconBtn({ tip, onClick, disabled, style, className = '', children }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={disabled ? stopE : onClick}
          aria-label={tip}
          aria-disabled={disabled || undefined}
          className={className}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: disabled ? 'default' : 'pointer', ...style }}
        >{children}</button>
      </TooltipTrigger>
      <TooltipContent>{tip}</TooltipContent>
    </Tooltip>
  )
}

/* ------------------------------------------------------------------ *
 * §8.4 SectionList — the sidebar / mobile-sheet page list, reorderable
 * by dragging a row's grip.
 *
 * Pointer events rather than HTML5 drag-and-drop, so the same code covers
 * mouse, touch and pen — the mobile sheet shows this list too. The arrow
 * buttons on each row stay as the keyboard and pointer-free path, and the
 * grip mirrors them on ArrowUp / ArrowDown.
 *
 * Rows are a uniform height (one title line, one label line, both clipped
 * with `nowrap`), so the drop index is just the pointer delta in row-heights
 * rather than a hit test against every row.
 * ------------------------------------------------------------------ */

function SectionList({ sections, vms, st, api }) {
  // `dragRef` is the source of truth and `drag` only mirrors it for rendering:
  // pointerup must commit the move it can see right now, not whatever the last
  // render happened to observe.
  const dragRef = useRef(null)
  const [drag, setDrag] = useState(null)
  const boxRef = useRef(null)
  // Lowest and highest index an optional section may occupy: the header holds 0
  // and the footer holds the last slot (§5.4).
  const lo = 1
  const hi = sections.length - 2

  const grab = (e, idx) => {
    if (e.button > 0 || sections.length < 4) return
    stopE(e)
    const rows = [...boxRef.current.children]
    const h = rows[idx].getBoundingClientRect().height
    // Capture so the drag survives the pointer leaving the narrow grip; it
    // throws if the pointer is no longer active, which is not worth failing on.
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* not captured */ }
    dragRef.current = { idx, to: idx, startY: e.clientY, dy: 0, h }
    setDrag(dragRef.current)
  }

  const move = (e) => {
    const d = dragRef.current
    if (!d) return
    const dy = e.clientY - d.startY
    const to = Math.max(lo, Math.min(hi, d.idx + Math.round(dy / d.h)))
    if (d.dy === dy && d.to === to) return
    dragRef.current = { ...d, dy, to }
    setDrag(dragRef.current)
  }

  const drop = () => {
    const d = dragRef.current
    dragRef.current = null
    setDrag(null)
    if (d && d.to !== d.idx) api.reorder(d.idx, d.to)
  }

  // How far a row slides to open the gap the dragged row will land in.
  const shift = (i) => {
    if (!drag || i === drag.idx) return 0
    if (drag.to > drag.idx && i > drag.idx && i <= drag.to) return -drag.h
    if (drag.to < drag.idx && i >= drag.to && i < drag.idx) return drag.h
    return 0
  }

  return (
    <div ref={boxRef} style={{ display: 'flex', flexDirection: 'column' }}>
      {sections.map((sec, i) => (
        <SectionRow
          key={sec.id} sec={sec} vm={vms[i]} st={st} api={api}
          dragging={drag?.idx === i}
          anyDrag={!!drag}
          offset={drag?.idx === i ? drag.dy : shift(i)}
          onGrab={(e) => grab(e, i)}
          onDragMove={move}
          onDrop={drop}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * §8.4 SectionRow — reused verbatim in the sidebar and the mobile sheet
 * ------------------------------------------------------------------ */

function SectionRow({ sec, vm, st, api, dragging, anyDrag, offset = 0, onGrab, onDragMove, onDrop }) {
  const cn2 = catName(sec.cat)
  const locked = vm.locked

  return (
    <div
      className={anyDrag ? 'hv-row' : 'hv-row hover:bg-accent'}
      style={{
        display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 8px', borderRadius: '9px',
        transform: offset ? `translateY(${offset}px)` : undefined,
        // The dragged row tracks the pointer with no easing; the rows opening a
        // gap for it animate. Raising it also lifts it clear of its neighbours.
        transition: dragging ? 'none' : 'transform .16s ease',
        // Only the lifted row is positioned. Positioning every row would paint
        // the list above the static chrome below it — the sheet's Add section
        // button sits right under the last row.
        position: dragging ? 'relative' : undefined,
        zIndex: dragging ? 2 : undefined,
        background: dragging ? '#FFFFFF' : undefined,
        boxShadow: dragging ? '0 10px 24px rgba(20,18,12,.18)' : undefined,
        cursor: dragging ? 'grabbing' : undefined,
      }}
    >
      {locked
        ? <Lock size={12} style={{ color: '#DDDAD1', cursor: 'default', flex: 'none' }} />
        : (
          <span
            role="button" tabIndex={0}
            aria-label={`Reorder ${cn2}`}
            onPointerDown={onGrab}
            onPointerMove={onDragMove}
            onPointerUp={onDrop}
            onPointerCancel={onDrop}
            onKeyDown={(e) => {
              const dir = e.key === 'ArrowUp' ? -1 : e.key === 'ArrowDown' ? 1 : 0
              if (!dir) return
              e.preventDefault(); stopE(e)
              if (dir < 0 ? vm.canUp : vm.canDown) api.move(sec.id, dir)
            }}
            className="hover:text-foreground"
            style={{
              color: '#B9B6AA', cursor: dragging ? 'grabbing' : 'grab', flex: 'none',
              lineHeight: 0, touchAction: 'none',
            }}
          ><GripVertical size={14} /></span>
        )}

      <button
        type="button"
        onClick={(e) => { stopE(e); api.openEdit(sec.id) }}
        style={{ flex: 1, minWidth: 0, textAlign: 'left', cursor: 'pointer', background: 'none', border: 0, padding: 0 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
          <span style={{ fontSize: '13px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cn2}</span>
          {locked && (
            <Badge
              variant="secondary"
              className="rounded-full border-0"
              style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '.6px', textTransform: 'uppercase',
                color: '#8B887D', background: '#F1EFEA', padding: '2px 6px', flex: 'none',
              }}
            >Required</Badge>
          )}
        </div>
        <div style={{ fontSize: '11px', color: '#98958A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {vm.layoutLabel}
        </div>
      </button>

      <span style={{ display: 'flex', flexDirection: 'column', flex: 'none' }}>
        <button
          type="button" aria-label="Move up" aria-disabled={!vm.canUp || undefined}
          onClick={(e) => { stopE(e); if (vm.canUp) api.move(sec.id, -1) }}
          style={{ color: vm.upC, cursor: vm.canUp ? 'pointer' : 'default', lineHeight: 0, background: 'none', border: 0, padding: 0 }}
          className={vm.canUp ? 'hover:text-foreground' : ''}
        ><ChevronUp size={10} /></button>
        <button
          type="button" aria-label="Move down" aria-disabled={!vm.canDown || undefined}
          onClick={(e) => { stopE(e); if (vm.canDown) api.move(sec.id, 1) }}
          style={{ color: vm.downC, cursor: vm.canDown ? 'pointer' : 'default', lineHeight: 0, background: 'none', border: 0, padding: 0 }}
          className={vm.canDown ? 'hover:text-foreground' : ''}
        ><ChevronDown size={10} /></button>
      </span>

      <DropdownMenu
        open={st.menuFor === sec.id}
        onOpenChange={(v) => api.patch({ menuFor: v ? sec.id : null })}
      >
        <DropdownMenuTrigger asChild>
          <button
            type="button" aria-label="Section menu" onClick={stopE}
            className="hover:bg-border"
            style={{ color: '#8B887D', padding: '2px 5px', borderRadius: '6px', background: 'none', border: 0, cursor: 'pointer', lineHeight: 0, flex: 'none' }}
          ><MoreHorizontal size={15} /></button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end" sideOffset={4} onClick={stopE}
          className="p-[5px]"
          style={{ width: '186px', borderRadius: '10px', border: '1px solid #E2DFD7', boxShadow: '0 12px 28px rgba(20,18,12,.16)' }}
        >
          <DropdownMenuItem style={MENU_ITEM} onSelect={() => api.openEdit(sec.id)}>
            <Pencil size={14} /> Edit content
          </DropdownMenuItem>
          {!locked && <DropdownMenuSeparator style={{ margin: '4px 6px' }} />}
          {!locked && (
            <DropdownMenuItem variant="destructive" style={MENU_ITEM} onSelect={() => api.del(sec.id)}>
              <Trash2 size={14} /> Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const MENU_ITEM = { fontSize: '13px', fontWeight: 500, padding: '8px 10px', borderRadius: '7px', gap: '10px' }

/* ------------------------------------------------------------------ *
 * §8.6 Image control — device upload and drag-and-drop only.
 * Nothing here may originate a network request.
 * ------------------------------------------------------------------ */

// Shared by the single- and multi-photo controls. Rejects anything that is not
// a PNG/JPG under 4 MB and hands back a data URL — never a network request.
function readImage(file, onOk, onToast) {
  if (!file) return
  if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
    onToast('Please choose a PNG or JPG'); return
  }
  if (file.size > 4 * 1024 * 1024) {
    onToast('That image is too large — 4 MB maximum'); return
  }
  const r = new FileReader()
  r.onload = () => onOk(r.result)
  r.readAsDataURL(file)
}

const FILE_INPUT = {
  position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
  overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0,
}

function ImageField({ value, onChange, onToast }) {
  const inputRef = useRef(null)
  const [over, setOver] = useState(false)

  const take = (file) => readImage(file, onChange, onToast)

  return (
    <div onClick={stopE}>
      <input
        ref={inputRef} type="file" accept="image/png,image/jpeg"
        onChange={(e) => { take(e.target.files?.[0]); e.target.value = '' }}
        style={FILE_INPUT}
      />
      {value ? (
        <div>
          <img src={value} alt="" style={{ height: '108px', width: '100%', objectFit: 'cover', borderRadius: '10px', border: '1px solid #E2DFD7', display: 'block' }} />
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button
              type="button" onClick={() => inputRef.current?.click()}
              className="hover:bg-muted"
              style={{ ...IMG_BTN, color: '#5B5850' }}
            >Replace</button>
            <button
              type="button" onClick={() => onChange(null)}
              className="hover:bg-destructive/10"
              style={{ ...IMG_BTN, color: '#B3261E' }}
            >Remove</button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setOver(true) }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => { e.preventDefault(); setOver(false); take(e.dataTransfer.files?.[0]) }}
          className="hover:border-foreground"
          style={{
            border: `1.5px dashed ${over ? '#1B1A17' : '#C9C6BB'}`, borderRadius: '10px', height: '108px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '4px', cursor: 'pointer',
          }}
        >
          <Upload size={18} style={{ color: '#B9B6AA' }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#5B5850' }}>Upload a photo</span>
          <span style={{ fontSize: '10px', color: '#98958A' }}>PNG or JPG · from your device</span>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * §8.6 — the multi-photo variant, for the sections whose design shows
 * several images at once (the gallery strip, the media artwork column).
 * Order is meaningful: slot n fills the nth tile of the layout.
 * ------------------------------------------------------------------ */

function ImagesField({ value, max, onChange, onToast }) {
  const inputRef = useRef(null)
  const [over, setOver] = useState(false)
  const list = Array.isArray(value) ? value : []
  const room = max - list.length

  const take = (files) => {
    const chosen = [...(files || [])].slice(0, room)
    if (!chosen.length) return
    if ([...(files || [])].length > room) onToast(`Room for ${max} photos here`)
    // Each read is async, so accumulate against the latest list rather than a
    // stale copy — otherwise a multi-select drops all but the last file.
    let next = list
    chosen.forEach((f) => readImage(f, (url) => { next = [...next, url]; onChange(next) }, onToast))
  }

  const removeAt = (i) => onChange(list.filter((_, j) => j !== i))

  return (
    <div onClick={stopE}>
      <input
        ref={inputRef} type="file" accept="image/png,image/jpeg" multiple
        onChange={(e) => { take(e.target.files); e.target.value = '' }}
        style={FILE_INPUT}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        {list.map((src, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <img src={src} alt="" style={{
              height: '62px', width: '100%', objectFit: 'cover', borderRadius: '9px',
              border: '1px solid #E2DFD7', display: 'block',
            }} />
            <span style={{
              position: 'absolute', left: '4px', bottom: '4px', background: 'rgba(27,26,23,.72)',
              color: '#FFFFFF', fontSize: '9px', fontWeight: 700, borderRadius: '5px', padding: '1px 5px',
            }}>{i + 1}</span>
            <button
              type="button" aria-label={`Remove photo ${i + 1}`}
              onClick={(e) => { stopE(e); removeAt(i) }}
              className="hover:bg-destructive/10"
              style={{
                position: 'absolute', top: '4px', right: '4px', width: '20px', height: '20px',
                borderRadius: '999px', border: '1px solid #E2DFD7', background: '#FFFFFF',
                color: '#B3261E', cursor: 'pointer', display: 'inline-flex',
                alignItems: 'center', justifyContent: 'center', padding: 0,
              }}
            ><X size={11} /></button>
          </div>
        ))}

        {room > 0 && (
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setOver(true) }}
            onDragLeave={() => setOver(false)}
            onDrop={(e) => { e.preventDefault(); setOver(false); take(e.dataTransfer.files) }}
            className="hover:border-foreground"
            style={{
              border: `1.5px dashed ${over ? '#1B1A17' : '#C9C6BB'}`, borderRadius: '9px', height: '62px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '2px', cursor: 'pointer',
            }}
          >
            <Upload size={14} style={{ color: '#B9B6AA' }} />
            <span style={{ fontSize: '10px', fontWeight: 600, color: '#5B5850' }}>Add</span>
          </div>
        )}
      </div>
      <p style={{ margin: '6px 0 0', fontSize: '10px', color: '#98958A' }}>
        {list.length} of {max} · PNG or JPG · from your device
      </p>
    </div>
  )
}

const IMG_BTN = {
  fontSize: '11px', fontWeight: 600, padding: '6px 10px', borderRadius: '7px',
  border: '1px solid #D8D5CC', background: '#FFFFFF', cursor: 'pointer',
}

const FIELD_BOX = {
  width: '100%', border: '1px solid #D8D5CC', borderRadius: '8px', padding: '9px 10px',
  fontSize: '13px', fontFamily: "'Archivo', sans-serif", color: '#1B1A17',
  background: '#FFFFFF', outline: 'none',
}

/* ------------------------------------------------------------------ *
 * §8.6b SongsField — the repertoire's song list. The one list-shaped
 * field with a structured editor rather than a delimited textarea: the
 * artist types a title, an artist and any tags, and the tags are what
 * the section's filter chips are built from.
 *
 * Modelled on ImagesField above — numbered rows, a round X per row, an
 * add affordance, an "n of max" footnote — and, like it, deliberately
 * not reorderable: order is entry order.
 * ------------------------------------------------------------------- */

const SONG_ROW_INPUT = { ...FIELD_BOX, padding: '6px 8px', fontSize: '12px' }

function SongsField({ value, max, onChange }) {
  const list = Array.isArray(value) ? value : []

  // Every keystroke rewrites the whole array — the list is short, and it keeps
  // the sparse `c.songs` a plain value rather than something patched in place.
  const setAt = (i, k, v) => onChange(list.map((sg, j) => (j === i ? { ...sg, [k]: v } : sg)))
  const removeAt = (i) => onChange(list.filter((_, j) => j !== i))
  const add = () => onChange([...list, { title: '', artist: '', tags: '' }])

  const row = (i, sg) => (
    <div key={i} style={{
      border: '1px solid #E9E7E0', borderRadius: '10px', padding: '8px',
      display: 'flex', flexDirection: 'column', gap: '6px', background: '#FCFBF8',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <span style={{
          width: '18px', flex: 'none', fontSize: '10px', fontWeight: 700,
          color: '#98958A', textAlign: 'center',
        }}>{i + 1}</span>
        {/* shadcn Input rather than a bare one, for its focus ring: FIELD_BOX
            sets `outline: none`, so a raw input would tab through twelve rows
            showing nothing. `h-auto` lets the compact padding win over h-9. */}
        <Input
          value={sg.title ?? ''} placeholder="Song title" onClick={stopE}
          onChange={(e) => setAt(i, 'title', e.target.value)}
          className="h-auto" style={{ ...SONG_ROW_INPUT, fontWeight: 600 }}
        />
        <button
          type="button" aria-label={`Remove song ${i + 1}`}
          onClick={(e) => { stopE(e); removeAt(i) }}
          className="hover:bg-destructive/10"
          style={{
            width: '22px', height: '22px', flex: 'none', borderRadius: '999px',
            border: '1px solid #E2DFD7', background: '#FFFFFF', color: '#B3261E',
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center',
            justifyContent: 'center', padding: 0,
          }}
        ><X size={11} /></button>
      </div>
      {/* Stacked, not three across: this panel is also the mobile edit sheet
          and three inputs do not fit side by side at its width. The 25px
          gutter keeps both lower fields aligned under the title. */}
      <div style={{ paddingLeft: '25px', paddingRight: '29px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Input
          value={sg.artist ?? ''} placeholder="Artist" onClick={stopE}
          onChange={(e) => setAt(i, 'artist', e.target.value)}
          className="h-auto" style={SONG_ROW_INPUT}
        />
        <Input
          value={sg.tags ?? ''} placeholder="Tags — weddings, pubs" onClick={stopE}
          onChange={(e) => setAt(i, 'tags', e.target.value)}
          className="h-auto" style={SONG_ROW_INPUT}
        />
      </div>
    </div>
  )

  return (
    <div onClick={stopE} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {list.map((sg, i) => row(i, sg || {}))}
      {list.length < max && (
        <button
          type="button" onClick={(e) => { stopE(e); add() }}
          className="hover:border-foreground"
          style={{
            border: '1.5px dashed #C9C6BB', borderRadius: '10px', padding: '9px',
            background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '5px', fontFamily: 'inherit',
          }}
        >
          <Plus size={13} style={{ color: '#B9B6AA' }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#5B5850' }}>Add song</span>
        </button>
      )}
      <p style={{ margin: 0, fontSize: '10px', color: '#98958A' }}>
        {list.length} of {max}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * §8.5 EditPanel — shared by the sidebar and the mobile edit sheet
 * ------------------------------------------------------------------ */

function EditPanel({ sec, vm, api, artistName, themeIdx, navSections }) {
  const fields = FIELDS[sec.cat] ?? []
  const locked = vm.locked

  // The panel has to resolve the seeded photos exactly as sectionVm does, or a
  // Retro section would show a photo on the canvas and an empty dropzone here.
  const themeName = THEMES[themeIdx].name
  const imgVal = (k) => (sec.c[k] !== undefined ? (sec.c[k] ?? undefined) : defaultImage(sec.cat, themeName, k))
  const imgsVal = (k) => (Array.isArray(sec.c[k]) ? sec.c[k] : defaultImages(sec.cat, themeName))
  // Same trap as the photos above: the panel has to resolve the seeded songs
  // exactly as sectionVm does, or the canvas would list twelve songs while the
  // repeater showed none.
  const songsVal = (k) => (Array.isArray(sec.c[k]) ? sec.c[k] : SONGS)

  const groupLabel = { fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#8B887D', marginBottom: '8px', display: 'block' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
      <ScrollArea className="flex-1 min-h-0">
        <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <Label style={groupLabel}>Layout</Label>
            <LayoutPicker
              cat={sec.cat} arch={sec.arch} content={sec.c}
              themeIdx={themeIdx} artistName={artistName} navSections={navSections}
              onPick={(i) => api.setSection(sec.id, { arch: i })}
            />
          </div>

          <div>
            <Label style={groupLabel}>Content</Label>
            {fields.length === 0 ? (
              <p style={{ margin: 0, fontSize: '12px', color: '#98958A', lineHeight: 1.5 }}>
                This section has no editable content — its copy comes from the artist profile.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {fields.map((f) => {
                  // The two fields whose default is computed rather than written
                  // down: the header's title is the artist's name, and the
                  // repertoire's heading counts the songs — both mirroring what
                  // sectionVm resolves, so panel and canvas never disagree.
                  const fallback = f.k === 'title' && sec.cat === 'header' ? artistName
                    : f.k === 'heading' && sec.cat === 'repertoire' ? `${songsVal('songs').length} Songs`
                    : fieldDefault(f)
                  const val = sec.c[f.k] !== undefined ? sec.c[f.k] : fallback
                  const set = (v) => api.setContent(sec.id, f.k, v)
                  return (
                    <div key={f.k}>
                      <Label style={{ fontSize: '11px', fontWeight: 600, color: '#6B685E', display: 'block', marginBottom: f.hint ? '2px' : '5px' }}>{f.l}</Label>
                      {f.hint && (
                        <p style={{ margin: '0 0 6px', fontSize: '10px', color: '#98958A', lineHeight: 1.45 }}>{f.hint}</p>
                      )}
                      {f.type === 'image' ? (
                        <ImageField value={imgVal(f.k)} onChange={(v) => set(v)} onToast={api.toast} />
                      ) : f.type === 'images' ? (
                        <ImagesField value={imgsVal(f.k)} max={f.max} onChange={(v) => set(v)} onToast={api.toast} />
                      ) : f.type === 'songs' ? (
                        <SongsField value={songsVal(f.k)} max={f.max} onChange={(v) => set(v)} />
                      ) : f.type === 'select' ? (
                        <Select value={val} onValueChange={set}>
                          <SelectTrigger onClick={stopE} className="w-full h-auto" style={{ ...FIELD_BOX, paddingRight: '28px' }}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent onClick={stopE}>
                            {f.opts.map((o) => <SelectItem key={o.v} value={o.v}>{o.l}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      ) : f.type === 'area' ? (
                        <Textarea
                          rows={3} value={val} onClick={stopE}
                          onChange={(e) => set(e.target.value)}
                          style={{ ...FIELD_BOX, resize: 'vertical', lineHeight: 1.45 }}
                        />
                      ) : (
                        <Input
                          value={val} onClick={stopE}
                          onChange={(e) => set(e.target.value)}
                          style={FIELD_BOX}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      <div style={{ padding: '12px', borderTop: '1px solid #E9E7E0', flex: 'none' }}>
        {locked ? (
          <p style={{ margin: 0, fontSize: '11px', color: '#98958A', lineHeight: 1.45, textAlign: 'center' }}>
            This section is required and can&rsquo;t be removed or reordered.
          </p>
        ) : (
          <button
            type="button"
            onClick={(e) => { stopE(e); api.del(sec.id) }}
            className="hover:bg-destructive/10"
            style={{
              width: '100%', border: '1px solid #EBC7C4', background: '#FFFFFF', color: '#B3261E',
              borderRadius: '9px', padding: '9px', fontSize: '12px', fontWeight: 600,
              textAlign: 'center', cursor: 'pointer',
            }}
          >Delete</button>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * §9.1 LayoutPicker — the layout chooser, inline in the sidebar
 *
 * A dropdown rather than a stock <Select>: shadcn's SelectItem wraps every
 * child in Radix's ItemText, so a thumbnail inside an item would be mirrored
 * into the closed trigger. DropdownMenu leaves item content alone.
 *
 * Each row is a live, scaled render of the section as that layout would draw
 * it — the section's own content included, so the previews show the user's
 * copy and uploads rather than the demo defaults. The render is the row: it
 * runs the full width of the panel with the label underneath, because at
 * thumbnail size the layouts were indistinguishable from one another.
 *
 * For the 13 non-header categories more layouts are offered than there are
 * designs (§4.4), so some rows render identically. That is on purpose.
 * ------------------------------------------------------------------ */

function LayoutPicker({ cat, arch, themeIdx, artistName, navSections, content = {}, onPick }) {
  const [open, setOpen] = useState(false)
  const themeName = THEMES[themeIdx].name
  const n = layoutCount(cat, themeName)
  // §4.4b — the header's layouts have names; every other category is numbered.
  const label = (i) => (cat === 'header'
    ? headerLayoutLabel(themeName, i)
    : `${catName(cat)} layout ${i + 1}`)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button" onClick={stopE}
          className="hover:border-foreground"
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '10px', border: '1px solid #E2DFD7', background: '#FFFFFF', borderRadius: '9px',
            padding: '10px 12px', cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {label(arch)}
          </span>
          <ChevronDown size={14} style={{ color: '#8B887D', flex: 'none' }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start" sideOffset={6} onClick={stopE}
        className="p-[5px]"
        style={{
          // Wider than the 296px sidebar it drops out of — the content is portaled,
          // so it is free to overhang the canvas. The clamp is for the mobile edit
          // drawer, where the same picker sits in a full-width sheet.
          width: 'min(400px, calc(100vw - 24px))', maxHeight: 'min(560px, 70vh)', overflowY: 'auto',
          borderRadius: '10px', border: '1px solid #E2DFD7', boxShadow: '0 12px 28px rgba(20,18,12,.16)',
        }}
      >
        {Array.from({ length: n }, (_, i) => {
          const isCur = i === arch
          return (
            <DropdownMenuItem
              key={i} onSelect={() => onPick(i)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '7px',
                padding: '6px', borderRadius: '8px', cursor: 'pointer',
                background: isCur ? '#F2F6FE' : undefined,
              }}
            >
              {/* ScaledPreview scales by clientWidth / 1180, so the preview track must
                  never size to its content. A 100%-width block inside a stretched
                  column item takes its width from the panel, which satisfies that.
                  The current row is marked with an inset outline rather than a border,
                  so the pane's width — and therefore the scale — is unchanged. */}
              <span style={{
                display: 'block', width: '100%', borderRadius: '6px', overflow: 'hidden',
                border: '1px solid #E2DFD7',
                outline: isCur ? '2px solid #2B6BE4' : undefined, outlineOffset: '-2px',
              }}>
                <ScaledPreview
                  autoMax={210} radius={6}
                  vm={sectionVm({
                    themeIdx, cat, arch: i, c: content,
                    artistName, Z: SIZES.desktop, mob: false, navSections,
                  })}
                />
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ flex: 1, minWidth: 0, fontSize: '12px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {label(i)}
                </span>
                {isCur && <Check size={12} style={{ color: '#2B6BE4', flex: 'none' }} />}
              </span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ------------------------------------------------------------------ *
 * §9.1 AddComposer — add a section without leaving the sidebar
 *
 * Category is a plain text Select; the layout below it is the same
 * LayoutPicker the edit panel uses.
 * ------------------------------------------------------------------ */

// header and footer never appear — they are mandatory and always present.
const ADDABLE = CATS.filter((c) => c.id !== 'header' && c.id !== 'footer')

const firstFreeCat = (present) =>
  (ADDABLE.find((c) => !present.includes(c.id)) ?? ADDABLE[0]).id

function AddComposer({ add, present, themeIdx, artistName, navSections, onChange, onAdd, onCancel }) {
  const groupLabel = { fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#8B887D', marginBottom: '8px', display: 'block' }
  const taken = present.includes(add.cat)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div>
        <Label style={groupLabel}>Section</Label>
        <Select value={add.cat} onValueChange={(cat) => onChange({ cat, arch: 0 })}>
          <SelectTrigger onClick={stopE} className="w-full h-auto" style={{ ...FIELD_BOX, paddingRight: '28px' }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent onClick={stopE}>
            {ADDABLE.map((c) => {
              const added = present.includes(c.id)
              return (
                <SelectItem key={c.id} value={c.id} disabled={added}>
                  {added ? `${c.name} — added` : c.name}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label style={groupLabel}>Layout</Label>
        <LayoutPicker
          cat={add.cat} arch={add.arch}
          themeIdx={themeIdx} artistName={artistName} navSections={navSections}
          onPick={(i) => onChange({ cat: add.cat, arch: i })}
        />
      </div>

      {taken && (
        <p style={{ margin: 0, fontSize: '11px', color: '#98958A', lineHeight: 1.45 }}>
          This section is already on the page. Pick another to add.
        </p>
      )}

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          type="button" onClick={(e) => { stopE(e); onCancel() }}
          className="hover:bg-accent"
          style={{
            flex: 'none', border: '1px solid #E2DFD7', background: '#FFFFFF', color: '#5B5850',
            borderRadius: '9px', padding: '9px 14px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
          }}
        >Cancel</button>
        <button
          type="button" aria-disabled={taken || undefined}
          onClick={(e) => { stopE(e); if (!taken) onAdd(add.cat, add.arch) }}
          className={taken ? '' : 'hover:bg-primary/90'}
          style={{
            flex: 1, border: 0, background: '#1B1A17', color: '#FFFFFF', opacity: taken ? 0.45 : 1,
            borderRadius: '9px', padding: '9px', fontSize: '12px', fontWeight: 700,
            cursor: taken ? 'default' : 'pointer',
          }}
        >Add section</button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * §6 Stage 1 — Template picker
 *
 * The app's first screen. One spotlight preview of the highlighted template,
 * its name above it and a filmstrip of all five below. Clicking the spotlight
 * builds the page and opens the editor on it — there is no longer a stage
 * between the two.
 * ------------------------------------------------------------------ */

// The nav links a header preview shows: the same derivation the editor uses,
// applied to the page the picker is about to build (§4.8).
const PREVIEW_NAV = EXAMPLE_PAGE
  .filter(([cat]) => cat !== 'header' && cat !== 'footer')
  .map(([cat]) => ({ cat, label: catName(cat) }))

// Every frame in the picker uses one aspect: the desktop canvas against the
// tallest header render (Retro's photographic layout 1). The four flat themes
// come out shorter and are centred in it.
const SPOT_ASPECT = `${parseInt(SIZES.desktop.canvasW, 10)} / ${SIZES.desktop.heroH}`

// …and what HeaderChoices frames its cards with until it has measured them.
const SPOT_MIN_H = SIZES.desktop.heroH

function TemplatePreview({ themeIdx, artistName }) {
  return (
    <ScaledPreview
      height="100%" center
      vm={sectionVm({
        themeIdx, cat: 'header', arch: 0, c: {}, artistName,
        Z: SIZES.desktop, mob: false, navSections: PREVIEW_NAV,
      })}
    />
  )
}

function TemplateStage({ artistName, spotIdx, onPick }) {
  // Coming back from the editor re-spotlights the theme it was using.
  const [spot, setSpot] = useState(spotIdx)

  return (
    <div className="dark" style={{
      minHeight: '100dvh', background: '#131311', color: '#F4F2EC', fontFamily: "'Archivo', sans-serif",
      padding: 'clamp(24px,5vw,40px) 20px', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ width: '100%', maxWidth: '1100px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h1 style={{ margin: 0, fontWeight: 800, fontSize: 'clamp(19px,4vw,24px)', textAlign: 'center' }}>
          {THEMES[spot].name}
        </h1>

        {/* The spotlight. */}
        <div style={{
          position: 'relative', borderRadius: '16px', overflow: 'hidden',
          border: '1px solid #2B2B27', aspectRatio: SPOT_ASPECT,
        }}>
          <TemplatePreview themeIdx={spot} artistName={artistName} />

          {/* The whole frame is the target. It carries no visible affordance of
              its own, so the caption below the frame says what it does. */}
          <button
            type="button"
            onClick={() => onPick(spot)}
            aria-label={`Open the editor with the ${THEMES[spot].name} template`}
            style={{
              position: 'absolute', inset: 0, background: 'none', border: 0,
              padding: 0, cursor: 'pointer',
            }}
          />
        </div>

        <p style={{ margin: 0, textAlign: 'center', fontSize: '13px', color: '#8E8B81' }}>
          Pick a template to open it in the editor.
        </p>

        {/* Filmstrip — picking one re-spotlights it. */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
          {THEMES.map((t, i) => (
            <button
              key={t.name} type="button"
              onClick={() => setSpot(i)}
              aria-label={t.name} aria-pressed={i === spot}
              style={{
                flex: '0 0 auto', width: '140px', borderRadius: '10px', overflow: 'hidden',
                padding: 0, cursor: 'pointer', background: 'none', aspectRatio: SPOT_ASPECT,
                border: `2px solid ${i === spot ? '#F4F2EC' : 'transparent'}`,
                opacity: i === spot ? 1 : 0.5,
                transition: 'opacity .2s, border-color .2s',
              }}
            >
              <TemplatePreview themeIdx={i} artistName={artistName} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * §6 The header layout picker
 *
 * The grid the setup modal (§6.2) is built around: the template's header
 * designs, all of them — six for Retro, three for the four flat
 * templates (§4.4). Three up on a desktop, two around 720px, one below
 * ~560.
 *
 * The cards share one frame so the set reads as a set and the labels sit
 * on one line. The frame has to be measured: Retro's Polaroid runs half
 * again as tall as its full-bleed hero, and a frame guessed from either
 * one would crop the tall layouts or strand the short ones. It takes the
 * *median* height rather than the tallest — sizing to the tallest would
 * leave the other five in a third of a card's worth of empty background —
 * and `fit` shrinks whatever overruns it instead of cropping.
 * ------------------------------------------------------------------ */

function HeaderChoices({ themeIdx, artistName, sel, onSelect }) {
  const T = THEMES[themeIdx]
  const n = layoutCount('header', T.name)

  // Hover and keyboard focus share one index, so a focused card is lit the
  // same way a hovered one is.
  const [hot, setHot] = useState(-1)

  const [nat, setNat] = useState({})
  const noteNat = useCallback((i, h) => setNat((m) => (m[i] === h ? m : { ...m, [i]: h })), [])
  const heights = Object.values(nat).sort((a, b) => a - b)
  const frame = `1180 / ${heights.length ? heights[heights.length >> 1] : SPOT_MIN_H}`

  const idle = '#E2DFD7'
  const live = '#2B6BE4'

  const enter = (i) => setHot(i)
  const leave = () => setHot(-1)

  return (
    <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))' }}>
      {Array.from({ length: n }, (_, i) => {
        const on = i === sel
        const [name, what] = headerLayout(T.name, i)
        return (
          <button
            key={i} type="button"
            onClick={(e) => { stopE(e); onSelect(i) }}
            aria-pressed={on}
            onMouseEnter={() => enter(i)} onMouseLeave={leave}
            onFocus={() => enter(i)} onBlur={leave}
            style={{
              display: 'flex', flexDirection: 'column', gap: '9px',
              padding: 0, background: 'none', border: 0, cursor: 'pointer', textAlign: 'left',
              fontFamily: 'inherit', color: 'inherit',
            }}
          >
            {/* ScaledPreview scales by clientWidth / 1180, so the pane takes its
                width from the track and the border stays 2px in every state —
                only its colour changes, and the ring is an inset outline. */}
            <span style={{
              display: 'block', width: '100%', aspectRatio: frame,
              borderRadius: '10px', overflow: 'hidden',
              border: `2px solid ${on || i === hot ? live : idle}`,
              outline: on ? `2px solid ${live}` : undefined, outlineOffset: '-5px',
              boxShadow: on ? '0 0 0 3px rgba(43,107,228,.16)' : undefined,
              transition: 'border-color .2s, box-shadow .2s',
            }}>
              <ScaledPreview
                height="100%" fit radius={8}
                onNatural={(h) => noteNat(i, h)}
                vm={sectionVm({
                  themeIdx, cat: 'header', arch: i, c: {}, artistName,
                  Z: SIZES.desktop, mob: false, navSections: PREVIEW_NAV,
                })}
              />
            </span>
            {/* The label is the button's accessible name: ScaledPreview's render
                is inert and aria-hidden, so nothing else in here has one. */}
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{
                  display: 'block', fontSize: '12px', fontWeight: on ? 800 : 700,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{name}</span>
                <span style={{ display: 'block', fontSize: '11px', color: '#98958A' }}>{what}</span>
              </span>
              {on && <Check size={13} style={{ flex: 'none', color: '#2B6BE4' }} />}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Publish — not in SPEC.md; see README "Deviations from SPEC.md" item 6.
 *
 * The demo has no backend and never will, so "published" is a second
 * browser tab rather than a URL. Two things about that tab matter:
 *
 * 1. It is a *live React root*, not a snapshot of the canvas DOM. It has
 *    to be. EncoreSection carries no media queries — its breakpoints are
 *    the `narrow`/`mob` booleans and the fixed px of SIZES, baked into
 *    the view-model — so serialised HTML would be frozen at whatever
 *    width the editor happened to be showing. Rendering live means the
 *    published page picks its own Z from its own window width — and,
 *    past the canvas that frame was drawn at, folds the surplus into the
 *    gutters so the content column holds its measure while the sections
 *    still paint the full window. It also leaves the door open for the
 *    sections to become interactive (see `live` in sectionVm, which
 *    Repertoire and the header's navigation now read).
 * 2. Its document is built by DOM mutation, never document.write().
 *    write() implies document.open(), which rewrites the popup's URL to
 *    the opener's — the tab would then claim to be the builder, and
 *    reloading it would load the builder. about:blank is the honest URL.
 *
 * The cost is that the tab is a child of the editor: reload or close the
 * editor and it stops updating. That is §12.1's "no persistence" reaching
 * one tab further, not a new limit.
 * ------------------------------------------------------------------ */

// Everything the page needs and nothing the editor adds. Deliberately not
// makeVm(), which layers on selection, hover, dim and the header's hover
// preview — none of which a published site has.
function PublishedPage({ themeIdx, sections, artistName, win }) {
  // documentElement.clientWidth, not innerWidth: on a classic-scrollbar OS the
  // latter counts the scrollbar, which would overshoot the surplus below and
  // leave the column a scrollbar's width narrower than the editor's.
  const measure = () => win.document.documentElement.clientWidth
  const [w, setW] = useState(measure)

  useEffect(() => {
    // Re-measure once: the first read happens before there is any content, so
    // before the vertical scrollbar exists, and would otherwise leave the
    // column a scrollbar's width narrow until the window was next resized.
    setW(measure())
    const onResize = () => setW(measure())
    win.addEventListener('resize', onResize)
    return () => win.removeEventListener('resize', onResize)
  }, [win])

  // The Figma frames are 390 / 768 / 1440, and the page picks its own.
  const key = w < 768 ? 'mobile' : w < 1180 ? 'tablet' : 'desktop'
  const base = SIZES[key]

  // Past the canvas its frame was drawn at, the design does not get wider: the
  // surplus is split into the gutters, so the content column keeps the measure
  // the type ramp was tuned for and each section's own background carries the
  // page out to the window edges as a full-bleed band.
  //
  // Doing it through `padX` rather than with a centred wrapper element is what
  // makes this three lines: `padX` is also what bleedTo() and TornEdge offset
  // against, so the torn edges, the checker ribbons and the form's grain follow
  // the gutter out to the true section edge for free. A wrapper would have left
  // them bleeding to the old 64px and stopping short of the window.
  //
  // `surplus` is carried separately for HeaderV0, the one composition that sits
  // outside the root's padding and has to apply the gutter itself.
  const surplus = Math.max(0, Math.round((w - parseInt(base.canvasW, 10)) / 2))
  const padX = `${parseInt(base.padX, 10) + surplus}px`
  const Z = {
    ...base, surplus: `${surplus}px`,
    padX, pad: `${base.padY} ${padX}`,
    // canvasW is still dropped for '100%': the section fills the window and the
    // gutter, not a cap, is what holds the column.
    canvasW: '100%',
  }

  // §4.8, as the editor derives it at the same names.
  const navSections = sections
    .filter((s) => s.cat !== 'header' && s.cat !== 'footer')
    .map((s) => ({ cat: s.cat, label: catName(s.cat) }))

  return sections.map((sec) => (
    <EncoreSection key={sec.id} s={sectionVm({
      themeIdx, cat: sec.cat, arch: sec.arch, c: sec.c,
      artistName, Z, mob: key === 'mobile', live: true, navSections,
    })} />
  ))
}

// Turns a fresh popup into a page that can host a React root. Returns the
// mount node. Called once per window; re-publishing into an open tab skips it.
function dressPublishedWindow(win, artistName, pageBg) {
  const doc = win.document
  const el = (tag, attrs) => Object.assign(doc.createElement(tag), attrs)

  doc.head.appendChild(el('base', { href: location.href }))
  doc.head.appendChild(el('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }))

  // One clone covers every build mode: the Google Fonts <link>s from
  // index.html (nothing is bundled), Vite's dev-injected <style> tags, and
  // the single inlined <style> that vite-plugin-singlefile emits. It also
  // carries the three .hv-* classes and the base resets the sections assume.
  document
    .querySelectorAll('head style, head link[rel="stylesheet"], head link[rel="preconnect"]')
    .forEach((n) => doc.head.appendChild(doc.importNode(n, true)))

  doc.title = artistName
  // On <html>, not <body>: the cloned reset is `html, body { background }`,
  // and a background on the root element stops body's from propagating — so
  // setting body alone would leave the editor's stone under a short page.
  doc.documentElement.style.background = pageBg

  // The nav's scroll, in one delegated listener rather than a handler per link.
  //
  // A fragment href can never be followed here: in a popup it resolves against
  // the *opener's* URL — about:blank inherits it, and <base> above pins it — so
  // the click would be a cross-document navigation and the published tab would
  // load the builder. Every fragment is therefore swallowed, exactly as before,
  // and the scroll is done by hand against this document's own ids. Sections
  // carry theirs from `vm.anchor` (§4.3a), gated on `live`, so a link that names
  // nothing on the page — the footer's columns, or a Minimal label whose
  // sections were all deleted — simply does nothing.
  doc.addEventListener('click', (e) => {
    const a = e.target.closest?.('a')
    const href = a ? a.getAttribute('href') || '' : ''
    if (!href.startsWith('#')) return
    e.preventDefault()
    const target = href.length > 1 && doc.getElementById(href.slice(1))
    if (!target) return
    // Read at click time, not once: the OS setting can change under an open tab.
    const still = win.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' })
  })

  const mount = el('div', { id: 'root' })
  doc.body.appendChild(mount)
  return mount
}

/* ------------------------------------------------------------------ *
 * §5–§9 The builder
 * ------------------------------------------------------------------ */

export default function EncoreBuilder({ artistName = 'Kai Mercer', startTheme = 'Picker' }) {
  const uidRef = useRef(100)
  const isMobile = useIsMobile()

  const buildPage = useCallback((defs) =>
    defs.map(([cat, arch]) => ({ id: ++uidRef.current, cat, arch, c: {} })), [])

  const [st, setSt] = useState(() => {
    const ti = THEMES.map((t) => t.name).indexOf(startTheme)
    const base = {
      device: 'desktop', add: null, menuFor: null,
      hoverId: null, selectedId: null,
      sheet: null, editSheet: false,
      // §6.2 — whether the header setup modal is still running.
      onboard: false,
      // The publish success dialog. The tab it opens is held in a ref, not
      // in state: nothing renders from it.
      published: false,
    }
    return ti >= 0
      ? { ...base, stage: 'editor', theme: ti, sections: buildPage(EXAMPLE_PAGE) }
      : { ...base, stage: 'template', theme: 0, sections: [] }
  })

  const patch = useCallback((p) => setSt((s) => ({ ...s, ...(typeof p === 'function' ? p(s) : p) })), [])

  // §9.2 — one toast at a time; the timer resets on each new one.
  const toastRef = useRef(null)
  const toast = useCallback((msg) => {
    if (toastRef.current !== null) sonnerToast.dismiss(toastRef.current)
    toastRef.current = sonnerToast.custom(() => (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <span style={{
          background: '#1B1A17', color: '#FFFFFF', fontSize: '13px', fontWeight: 700,
          padding: '12px 22px', borderRadius: '99px', boxShadow: '0 12px 30px rgba(20,18,12,.3)',
          maxWidth: '92vw', textAlign: 'center', animation: 'fadeIn .25s ease',
        }}>{msg}</span>
      </div>
    ), { duration: 2400, unstyled: true })
  }, [])

  const T = THEMES[st.theme]
  const sections = st.sections
  const present = sections.map((s) => s.cat)

  // §5.5 — a real phone forces mobile canvas sizing at full width.
  const Z = isMobile ? { ...SIZES.mobile, canvasW: '100%' } : SIZES[st.device]

  // §4.8 — nav links follow the optional sections currently on the page, and
  // carry the category as the anchor the published page scrolls to (§4.3a).
  const navSections = sections
    .filter((s) => s.cat !== 'header' && s.cat !== 'footer')
    .map((s) => ({ cat: s.cat, label: catName(s.cat) }))

  /* ---- publish ----------------------------------------------------- */

  const pubWin = useRef(null)
  const pubRoot = useRef(null)

  const closePublished = useCallback(() => {
    // Unmount before the window goes: a root left mounted in a closed
    // document throws on the next state update from a resize listener.
    if (pubRoot.current) pubRoot.current.unmount()
    pubRoot.current = null
    pubWin.current = null
  }, [])

  useEffect(() => closePublished, [closePublished])

  const openPublished = useCallback(() => {
    const open = pubWin.current && !pubWin.current.closed

    // window.open has to happen inside the click or the popup blocker eats
    // it, so it cannot wait behind anything asynchronous.
    const win = open ? pubWin.current : window.open('', '_blank')
    if (!win) { toast('Allow pop-ups to open your published site'); return }

    if (!open) {
      pubWin.current = win
      pubRoot.current = createRoot(dressPublishedWindow(win, artistName, THEMES[st.theme].palette[0]))
      win.addEventListener('pagehide', closePublished)
    } else {
      win.document.documentElement.style.background = THEMES[st.theme].palette[0]
    }

    // Publishing again re-renders the tab that is already open rather than
    // piling up tabs — the edit-and-republish loop is the demo.
    pubRoot.current.render(
      <PublishedPage
        themeIdx={st.theme} sections={st.sections} artistName={artistName} win={win}
      />,
    )
    win.focus()
    patch({ published: false })
  }, [artistName, closePublished, patch, st.sections, st.theme, toast])

  /* ---- mutations (§5.6) ------------------------------------------- */

  const closeAll = useCallback(() => patch({ menuFor: null, selectedId: null }), [patch])

  const move = useCallback((id, dir) => patch((s) => {
    if (!canMove(s.sections, id, dir)) return {}
    const i = s.sections.findIndex((x) => x.id === id)
    const next = s.sections.slice()
    const [x] = next.splice(i, 1)
    next.splice(i + dir, 0, x)
    return { sections: next }
  }), [patch])

  // §5.4 — the drag equivalent of move(): drop `from` at `to`, with the same
  // rule that the header keeps index 0 and the footer stays last.
  const reorder = useCallback((from, to) => patch((s) => {
    const sec = s.sections[from]
    if (!sec || from === to) return {}
    if (sec.cat === 'header' || sec.cat === 'footer') return {}
    if (to < 1 || to > s.sections.length - 2) return {}
    const next = s.sections.slice()
    const [x] = next.splice(from, 1)
    next.splice(to, 0, x)
    return { sections: next }
  }), [patch])

  const setContent = useCallback((id, k, v) => patch((s) => ({
    sections: s.sections.map((x) => {
      if (x.id !== id) return x
      const c = { ...x.c }
      if (v === undefined) delete c[k]; else c[k] = v
      return { ...x, c }
    }),
  })), [patch])

  const setSection = useCallback((id, p) => patch((s) => ({
    sections: s.sections.map((x) => (x.id === id ? { ...x, ...p } : x)),
  })), [patch])

  const del = useCallback((id) => patch((s) => {
    const sec = s.sections.find((x) => x.id === id)
    if (!sec || sec.cat === 'header' || sec.cat === 'footer') return {}
    return {
      sections: s.sections.filter((x) => x.id !== id),
      menuFor: null,
      ...(s.selectedId === id ? { selectedId: null, editSheet: false } : {}),
    }
  }), [patch])

  const addSection = useCallback((cat, arch) => {
    let added = false
    patch((s) => {
      if (s.sections.some((x) => x.cat === cat)) return {}
      added = true
      const sec = { id: ++uidRef.current, cat, arch, c: {} }
      const next = s.sections.slice()
      next.splice(next.length - 1, 0, sec)   // immediately before the footer
      return { sections: next, add: null }
    })
    if (added) toast(`${catName(cat)} added`)
  }, [patch, toast])

  const openEdit = useCallback((id) => patch(
    isMobile ? { selectedId: id, editSheet: true, sheet: null, menuFor: null }
             : { selectedId: id, menuFor: null },
  ), [patch, isMobile])

  // §9.1 — the add composer opens on the first category not already used.
  const openAdd = useCallback(() => patch((s) => ({
    add: { cat: firstFreeCat(s.sections.map((x) => x.cat)), arch: 0 },
    sheet: null, menuFor: null,
  })), [patch])

  const closeAdd = useCallback(() => patch({ add: null, sheet: null }), [patch])

  const api = { patch, move, reorder, setContent, setSection, del, openEdit, toast }

  /* ---- per-section view-model (§5.7) ------------------------------- */

  const makeVm = (sec, i, arr) => {
    const cat = catById(sec.cat)
    const selected = st.selectedId === sec.id
    const hovered = st.hoverId === sec.id
    const up = canMove(arr, sec.id, -1)
    const down = canMove(arr, sec.id, 1)
    const isHeader = sec.cat === 'header'
    return {
      ...sectionVm({ themeIdx: st.theme, cat: sec.cat, arch: sec.arch, c: sec.c, artistName, Z, mob: Z === SIZES.mobile || isMobile || st.device === 'mobile', navSections }),
      layoutLabel: isHeader
        ? headerLayoutLabel(T.name, sec.arch)
        : `${cat.name} layout ${sec.arch + 1}`,
      // §6.2 — while the setup modal is up the header's own badge names the
      // layout, so the click that swapped it is legible on the page itself.
      overlayLabel: isHeader && st.onboard
        ? `${cat.name} · ${headerLayout(T.name, sec.arch)[0]}`
        : cat.name + (selected ? ' · editing' : ''),
      showOverlay: hovered || selected,
      locked: sec.cat === 'header' || sec.cat === 'footer',
      canUp: up, canDown: down,
      upC: up ? '#8B887D' : '#DDDAD1',
      downC: down ? '#8B887D' : '#DDDAD1',
      upC2: up ? '#3A382F' : '#D5D2C9',
      downC2: down ? '#3A382F' : '#D5D2C9',
      selected,
    }
  }

  const vms = sections.map(makeVm)
  const selectedIdx = sections.findIndex((s) => s.id === st.selectedId)
  const selectedSec = selectedIdx >= 0 ? sections[selectedIdx] : null
  const selectedVm = selectedIdx >= 0 ? vms[selectedIdx] : null

  /* ---- §6.2 the header setup modal --------------------------------- */

  const headerSec = sections.find((x) => x.cat === 'header')
  const onboarding = st.onboard && !!headerSec
  const nHeader = layoutCount('header', T.name)
  const headerArch = headerSec ? headerSec.arch : 0

  // Clicking a card swaps the real header behind the modal, at full size. The
  // modal stays open afterwards — a click is a try, not a verdict, and
  // "Use this header" is what ends it.
  const pickHeader = useCallback((i) => {
    if (!headerSec) return
    setSection(headerSec.id, { arch: i })
  }, [headerSec, setSection])

  const endOnboard = useCallback(() => patch({ onboard: false }), [patch])

  /* ---- stage 1 ------------------------------------------------------ */

  // The chosen theme commits to st.theme here rather than to a key of its own:
  // nothing reads it until the editor opens, and going back re-spotlights it.
  //
  // §6 — the old stage 2 is gone. Picking a template builds the page and opens
  // the editor on it directly; the header choice is asked for *inside* the
  // editor, by the setup modal (§6.2). The header starts on layout 1, so the
  // page is complete and legible before anything is asked of the user.
  if (st.stage === 'template') {
    return (
      <TemplateStage
        artistName={artistName}
        spotIdx={st.theme}
        onPick={(i) => patch(() => {
          const next = buildPage(EXAMPLE_PAGE)
          const header = next.find((x) => x.cat === 'header')
          return {
            stage: 'editor', theme: i, sections: next, onboard: true,
            // The editor opens on the header's edit panel: the modal does not
            // need it, but it is where the user goes next and it leaves the
            // right state behind once the modal is dismissed. The mobile edit
            // drawer stays shut — it would cover the page at the one moment
            // the user has not seen it yet.
            selectedId: header ? header.id : null,
          }
        })}
      />
    )
  }

  /* ---- shared fragments -------------------------------------------- */

  const sectionList = <SectionList sections={sections} vms={vms} st={st} api={api} />

  const addBtn = (
    <button
      type="button"
      onClick={(e) => { stopE(e); openAdd() }}
      className="hover:border-foreground"
      style={{
        width: '100%', border: '1.5px dashed #C9C6BB', borderRadius: '10px', padding: '11px',
        textAlign: 'center', fontSize: '13px', fontWeight: 600, color: '#5B5850',
        background: 'none', cursor: 'pointer',
      }}
    >+ Add section</button>
  )

  const addComposer = st.add && (
    <AddComposer
      add={st.add} present={present}
      themeIdx={st.theme} artistName={artistName} navSections={navSections}
      onChange={(next) => patch({ add: next })}
      onAdd={addSection}
      onCancel={closeAdd}
    />
  )

  const addHeader = (close) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 18px', borderBottom: '1px solid #EEECE6', flex: 'none' }}>
      <span style={{ flex: 1, fontSize: '15px', fontWeight: 700 }}>Add a section</span>
      <button type="button" aria-label="Close" onClick={(e) => { stopE(e); close() }}
        style={{ background: 'none', border: 0, cursor: 'pointer', color: '#5B5850', lineHeight: 0 }}>
        <X size={16} />
      </button>
    </div>
  )


  /* ---- §6.2 the setup modal ---------------------------------------- */

  const headerModal = (
    <Dialog open={onboarding} onOpenChange={(v) => { if (!v) endOnboard() }}>
      <DialogContent
        onClick={stopE} showCloseButton={false}
        className="p-0 gap-0 rounded-[16px] border-0"
        style={{
          width: 'min(920px, calc(100vw - 28px))', maxWidth: 'none', maxHeight: '88dvh',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          background: '#FFFFFF', boxShadow: '0 28px 70px rgba(20,18,12,.34)',
          fontFamily: "'Archivo', sans-serif", color: '#1B1A17',
          // Radix focuses the content on open; the browser's ring around a
          // 920px panel reads as a selection, not as focus.
          outline: 'none',
        }}
      >
        <div style={{ padding: isMobile ? '18px 18px 14px' : '24px 26px 18px', flex: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <DialogTitle style={{ margin: 0, fontSize: isMobile ? '18px' : '21px', fontWeight: 800, letterSpacing: '-.2px' }}>
                Start with your header
              </DialogTitle>
              <DialogDescription style={{ margin: '7px 0 0', fontSize: '13px', lineHeight: 1.55, color: '#6B685E', maxWidth: '600px' }}>
                The header is the first thing visitors see — your name, photo and menu. Choose how it is
                arranged. Everything else on the page is already set up, and you can change this later from
                the Header section.
              </DialogDescription>
            </div>
            {!isMobile && (
              <span style={{
                fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase',
                color: '#8B887D', background: '#F1EFEA', padding: '6px 10px', borderRadius: '99px',
                whiteSpace: 'nowrap', flex: 'none',
              }}>{T.name} template</span>
            )}
          </div>
        </div>

        {/* A plain scroller, not ScrollArea: the dialog is sized by max-height
            with height:auto, and Radix's viewport resolves its `height: 100%`
            against that auto height — so it grows to its content and the cards
            paint straight over the footer. */}
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: isMobile ? '0 18px 18px' : '0 26px 22px' }}>
          <HeaderChoices
            themeIdx={st.theme} artistName={artistName} sel={headerArch}
            onSelect={pickHeader}
          />
        </div>

        <div style={{
          flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '14px', flexWrap: 'wrap', padding: isMobile ? '13px 18px' : '15px 26px',
          borderTop: '1px solid #EEECE6', background: '#FCFBF9',
        }}>
          <span style={{ fontSize: '12px', color: '#98958A' }}>
            {`${headerLayout(T.name, headerArch)[0]} selected · ${nHeader} layouts for ${T.name}`}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '14px', marginLeft: 'auto' }}>
            <button type="button" onClick={(e) => { stopE(e); endOnboard() }}
              className="hover:text-foreground"
              style={{ fontSize: '13px', fontWeight: 600, color: '#5B5850', background: 'none', border: 0, cursor: 'pointer', fontFamily: 'inherit' }}
            >Decide later</button>
            <button type="button" onClick={(e) => { stopE(e); endOnboard() }}
              className="hover:bg-primary/90"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700,
                padding: '10px 20px', borderRadius: '9px', background: '#1B1A17', color: '#FFFFFF',
                border: 0, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >Use this header <ArrowRight size={14} /></button>
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )

  /* ---- the publish success dialog ---------------------------------- */

  const publishModal = (
    <Dialog open={st.published} onOpenChange={(v) => { if (!v) patch({ published: false }) }}>
      <DialogContent
        onClick={stopE} showCloseButton={false}
        className="p-0 gap-0 rounded-[16px] border-0"
        style={{
          width: 'min(430px, calc(100vw - 28px))', maxWidth: 'none',
          background: '#FFFFFF', boxShadow: '0 28px 70px rgba(20,18,12,.34)',
          fontFamily: "'Archivo', sans-serif", color: '#1B1A17', outline: 'none',
        }}
      >
        <div style={{ padding: isMobile ? '20px 18px 16px' : '24px 26px 18px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '34px', height: '34px', borderRadius: '99px', marginBottom: '13px',
            background: '#1B1A17', color: '#FFFFFF',
          }}><Check size={18} strokeWidth={2.6} /></span>

          <DialogTitle style={{ margin: 0, fontSize: isMobile ? '18px' : '20px', fontWeight: 800, letterSpacing: '-.2px' }}>
            Your site is live
          </DialogTitle>
          <DialogDescription style={{ margin: '7px 0 0', fontSize: '13px', lineHeight: 1.55, color: '#6B685E' }}>
            {artistName}&rsquo;s page is published. Open it to see exactly what a visitor sees.
          </DialogDescription>

          {/* Shown, not linked: there is no server behind it. */}
          <div style={{
            marginTop: '15px', padding: '10px 13px', borderRadius: '9px',
            background: '#F4F2ED', border: '1px solid #E7E4DC',
            fontSize: '13px', fontWeight: 600, color: '#3A382F',
            fontFamily: "'Courier Prime', monospace", overflowWrap: 'anywhere',
          }}>kaimercer.encore.site</div>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '14px',
          padding: isMobile ? '13px 18px' : '14px 26px',
          borderTop: '1px solid #EEECE6', background: '#FCFBF9',
        }}>
          <button type="button" onClick={(e) => { stopE(e); patch({ published: false }) }}
            className="hover:text-foreground"
            style={{ fontSize: '13px', fontWeight: 600, color: '#5B5850', background: 'none', border: 0, cursor: 'pointer', fontFamily: 'inherit' }}
          >Close</button>
          <button type="button" onClick={(e) => { stopE(e); openPublished() }}
            className="hover:bg-primary/90"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700,
              padding: '10px 20px', borderRadius: '9px', background: '#1B1A17', color: '#FFFFFF',
              border: 0, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >Open <ExternalLink size={14} /></button>
        </div>
      </DialogContent>
    </Dialog>
  )

  const PILL = '[&>div:first-child]:!h-[4px] [&>div:first-child]:!w-[40px] [&>div:first-child]:!mt-2 [&>div:first-child]:!bg-[#DDDAD1] [&>div:first-child]:!mb-0'

  const sheetShell = {
    background: '#FFFFFF', borderRadius: '16px 16px 0 0',
    boxShadow: '0 -18px 44px rgba(20,18,12,.22)', paddingBottom: 'env(safe-area-inset-bottom)',
  }

  const sheetHead = (title, close) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', borderBottom: '1px solid #EEECE6', flex: 'none' }}>
      <DrawerTitle style={{ flex: 1, fontSize: '15px', fontWeight: 700 }}>{title}</DrawerTitle>
      <button type="button" aria-label="Close" onClick={(e) => { stopE(e); close() }}
        style={{ background: 'none', border: 0, cursor: 'pointer', color: '#5B5850', lineHeight: 0 }}>
        <X size={16} />
      </button>
    </div>
  )

  /* ---- editor ------------------------------------------------------ */

  return (
    <TooltipProvider delayDuration={200}>
      <div
        onClick={closeAll}
        style={{
          height: '100dvh', display: 'flex', flexDirection: 'column',
          fontFamily: "'Archivo', sans-serif", background: '#E9E7E1', color: '#1B1A17', overflow: 'hidden',
        }}
      >
        {/* §8.1 / §8.2 top bar */}
        {isMobile ? (
          <div style={{ height: '52px', flex: 'none', background: '#FFFFFF', borderBottom: '1px solid #E2DFD7', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 12px', zIndex: 40 }}>
            <button type="button" aria-label="Back to templates"
              onClick={(e) => { stopE(e); patch({ stage: 'template', selectedId: null, menuFor: null, add: null, onboard: false }) }}
              className="hover:bg-muted"
              style={{ fontSize: '16px', fontWeight: 600, color: '#5B5850', padding: '3px 9px', borderRadius: '8px', border: '1px solid #D8D5CC', background: '#FFFFFF', cursor: 'pointer' }}
            >‹</button>
            <span style={{ fontFamily: "'Alfa Slab One', serif", fontSize: '16px' }}>encore</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#6B685E' }}>{T.name}</span>
            <span style={{ flex: 1 }} />
            <button type="button" onClick={(e) => { stopE(e); patch({ published: true }) }}
              className="hover:bg-primary/90"
              style={{ fontSize: '12px', fontWeight: 700, padding: '7px 14px', borderRadius: '9px', background: '#1B1A17', color: '#FFFFFF', border: 0, cursor: 'pointer' }}
            >Publish</button>
          </div>
        ) : (
          <div style={{ height: '56px', flex: 'none', background: '#FFFFFF', borderBottom: '1px solid #E2DFD7', display: 'flex', alignItems: 'center', gap: '16px', padding: '0 16px', zIndex: 40 }}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" aria-label="Back to templates"
                  onClick={(e) => { stopE(e); patch({ stage: 'template', selectedId: null, menuFor: null, add: null, onboard: false }) }}
                  className="hover:bg-muted"
                  style={{ fontSize: '16px', fontWeight: 600, color: '#5B5850', padding: '4px 11px', borderRadius: '8px', border: '1px solid #D8D5CC', background: '#FFFFFF', cursor: 'pointer' }}
                >‹</button>
              </TooltipTrigger>
              <TooltipContent>Back to templates</TooltipContent>
            </Tooltip>

            <span style={{ fontFamily: "'Alfa Slab One', serif", fontSize: '17px' }}>encore</span>
            <span style={{ width: '1px', height: '24px', background: '#E2DFD7' }} />

            {/* Theme switcher — a labelled control, not decoration. */}
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#8B887D' }}>Theme</span>
              <span style={{ display: 'flex', gap: '6px' }}>
                {THEMES.map((t, i) => {
                  const [bg, ac] = t.palette
                  const on = i === st.theme
                  return (
                    <Tooltip key={t.name}>
                      <TooltipTrigger asChild>
                        <button
                          type="button" aria-label={t.name} onClick={(e) => { stopE(e); patch({ theme: i }) }}
                          className="hv-scale12"
                          style={{
                            width: '26px', height: '26px', borderRadius: '999px', padding: 0, cursor: 'pointer',
                            background: `linear-gradient(135deg, ${bg} 50%, ${ac} 50%)`,
                            border: `2px solid ${on ? '#1B1A17' : '#FFFFFF'}`,
                            boxShadow: on ? '0 0 0 2px rgba(27,26,23,.2)' : '0 0 0 2px rgba(0,0,0,.12)',
                            transition: 'transform .15s',
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>{t.name}</TooltipContent>
                    </Tooltip>
                  )
                })}
              </span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#6B685E' }}>{T.name}</span>
            </span>

            <span style={{ flex: 1 }} />

            <Tabs value={st.device} onValueChange={(v) => patch({ device: v })}>
              <TabsList
                className="h-auto p-[3px] gap-[2px] rounded-[9px]"
                style={{ background: '#F1EFEA' }}
                onClick={stopE}
              >
                {[['desktop', 'Desktop'], ['tablet', 'Tablet'], ['mobile', 'Mobile']].map(([v, l]) => (
                  <TabsTrigger
                    key={v} value={v}
                    className="rounded-[7px] border-0 data-[state=active]:bg-[#1B1A17] data-[state=active]:text-white data-[state=active]:shadow-none"
                    style={{ fontSize: '12px', fontWeight: 600, padding: '5px 12px', color: st.device === v ? '#FFFFFF' : '#5B5850', transition: 'background .15s' }}
                  >{l}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <span style={{ flex: 1 }} />

            <button type="button" onClick={(e) => { stopE(e); patch({ published: true }) }}
              className="hover:bg-primary/90"
              style={{ fontSize: '13px', fontWeight: 700, padding: '8px 18px', borderRadius: '9px', background: '#1B1A17', color: '#FFFFFF', border: 0, cursor: 'pointer' }}
            >Publish</button>
          </div>
        )}

        <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
          {/* §8.3 sidebar */}
          {!isMobile && (
            <div
              onClick={stopE}
              style={{ width: '296px', flex: 'none', background: '#F8F7F4', borderRight: '1px solid #E2DFD7', display: 'flex', flexDirection: 'column', minHeight: 0 }}
            >
              {selectedSec ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', borderBottom: '1px solid #E9E7E0', flex: 'none' }}>
                    <button type="button" aria-label="Back to page list" onClick={(e) => { stopE(e); patch({ selectedId: null }) }}
                      style={{ background: 'none', border: 0, cursor: 'pointer', color: '#5B5850', lineHeight: 0 }}>
                      <ChevronLeft size={16} />
                    </button>
                    <span style={{ minWidth: 0 }}>
                      <span style={{ display: 'block', fontSize: '13px', fontWeight: 700 }}>{catName(selectedSec.cat)}</span>
                      <span style={{ display: 'block', fontSize: '11px', color: '#98958A' }}>{selectedVm.layoutLabel}</span>
                    </span>
                  </div>
                  <EditPanel
                    sec={selectedSec} vm={selectedVm} api={api}
                    artistName={artistName} themeIdx={st.theme} navSections={navSections}
                  />
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 14px 8px', flex: 'none' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.4px', textTransform: 'uppercase', color: '#8B887D' }}>Page</span>
                    <span style={{ fontSize: '11px', color: '#A5A297' }}>{sections.length} sections</span>
                  </div>
                  <ScrollArea className="flex-1 min-h-0">
                    <div style={{ padding: '0 8px 8px' }}>{sectionList}</div>
                  </ScrollArea>
                  <div style={{ padding: '12px', flex: 'none', borderTop: st.add ? '1px solid #E9E7E0' : 0 }}>
                    {st.add ? addComposer : addBtn}
                  </div>
                </>
              )}
            </div>
          )}

          {/* §8.7 canvas */}
          <div style={{
            flex: 1, minWidth: 0, overflowY: 'auto', background: '#E4E1DA',
            padding: isMobile ? '14px 10px 40px' : '28px 28px 64px',
            display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
          }}>
            <div style={{
              maxWidth: Z.canvasW, width: '100%', boxShadow: '0 8px 40px rgba(30,26,18,.16)',
              borderRadius: '10px', overflow: 'hidden', transition: 'max-width .35s ease',
            }}>
              {sections.map((sec, i) => {
                const vm = vms[i]
                return (
                  <div
                    key={sec.id}
                    style={{ position: 'relative' }}
                    onMouseEnter={isMobile ? undefined : () => patch({ hoverId: sec.id })}
                    onMouseLeave={isMobile ? undefined : () => patch((s) => (s.hoverId === sec.id ? { hoverId: null } : {}))}
                    onClick={(e) => { stopE(e); patch({ selectedId: sec.id, menuFor: null }) }}
                  >
                    <EncoreSection s={vm} />

                    {vm.showOverlay && (
                      <div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none', outline: '2px solid #2B6BE4',
                        outlineOffset: '-2px', zIndex: 20, animation: 'fadeIn .1s ease',
                      }}>
                        <span style={{
                          position: 'absolute', left: 0, top: 0, background: '#2B6BE4', color: '#FFFFFF',
                          fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '0 0 8px 0',
                        }}>{vm.overlayLabel}</span>

                        <div style={{
                          position: 'absolute', right: '8px', top: '8px', pointerEvents: 'auto',
                          background: '#FFFFFF', borderRadius: '9px', boxShadow: '0 6px 18px rgba(20,18,12,.22)',
                          padding: '4px', display: 'flex', alignItems: 'center', gap: '2px', flexWrap: 'wrap',
                          maxWidth: 'calc(100% - 16px)',
                        }}>
                          <IconBtn tip="Edit content" style={TOOLBAR_BTN} className="hover:bg-muted"
                            onClick={(e) => { stopE(e); openEdit(sec.id) }}><Pencil size={13} /></IconBtn>
                          <IconBtn tip="Move up" disabled={!vm.canUp} style={{ ...TOOLBAR_BTN, color: vm.upC2 }} className={vm.canUp ? 'hover:bg-muted' : ''}
                            onClick={(e) => { stopE(e); move(sec.id, -1) }}><ArrowUp size={13} /></IconBtn>
                          <IconBtn tip="Move down" disabled={!vm.canDown} style={{ ...TOOLBAR_BTN, color: vm.downC2 }} className={vm.canDown ? 'hover:bg-muted' : ''}
                            onClick={(e) => { stopE(e); move(sec.id, 1) }}><ArrowDown size={13} /></IconBtn>
                          {!vm.locked && (
                            <IconBtn tip="Delete" style={{ ...TOOLBAR_BTN, color: '#B3261E' }} className="hover:bg-destructive/10"
                              onClick={(e) => { stopE(e); del(sec.id) }}><Trash2 size={13} /></IconBtn>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* §8.8 mobile bottom nav */}
        {isMobile && (
          <div style={{
            height: 'calc(56px + env(safe-area-inset-bottom))', paddingBottom: 'env(safe-area-inset-bottom)',
            flex: 'none', background: '#FFFFFF', borderTop: '1px solid #E2DFD7', display: 'flex', zIndex: 40,
          }}>
            {[
              [Layers, 'Sections', () => patch({ sheet: 'sections' }), st.sheet === 'sections'],
              [Plus, 'Add', openAdd, !!st.add],
              [Palette, 'Theme', () => patch({ sheet: 'theme' }), st.sheet === 'theme'],
            ].map(([Icon, label, onClick, active]) => (
              <button key={label} type="button" onClick={(e) => { stopE(e); onClick() }}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: '3px', background: 'none', border: 0, cursor: 'pointer',
                  color: active ? '#1B1A17' : '#6B685E',
                }}>
                <Icon size={17} />
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.4px' }}>{label}</span>
              </button>
            ))}
          </div>
        )}

        {/* §9.1 Add a section — inline in the sidebar on desktop (see §8.3),
            a bottom drawer on mobile. There is no right-hand panel. */}
        {isMobile && (
          <Drawer open={!!st.add} onOpenChange={(v) => { if (!v) closeAdd() }}>
            <DrawerContent onClick={stopE} className={`${PILL} !max-h-[82vh]`} style={{ ...sheetShell, maxHeight: '82vh' }}>
              <DrawerTitle className="sr-only">Add a section</DrawerTitle>
              <DrawerDescription className="sr-only">Choose a section and its layout</DrawerDescription>
              {addHeader(closeAdd)}
              <ScrollArea className="flex-1 min-h-0">
                <div style={{ padding: '14px 16px 24px' }}>{addComposer}</div>
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        )}

        {/* §8.9 Sections sheet */}
        <Drawer open={isMobile && st.sheet === 'sections'} onOpenChange={(v) => { if (!v) patch({ sheet: null }) }}>
          <DrawerContent onClick={stopE} className={`${PILL} !max-h-[78vh]`} style={{ ...sheetShell, maxHeight: '78vh' }}>
            <DrawerDescription className="sr-only">The sections on this page</DrawerDescription>
            {sheetHead(`Page · ${sections.length} sections`, () => patch({ sheet: null }))}
            <ScrollArea className="flex-1 min-h-0">
              <div style={{ padding: '8px' }}>{sectionList}</div>
            </ScrollArea>
            <div style={{ padding: '12px', flex: 'none' }}>{addBtn}</div>
          </DrawerContent>
        </Drawer>

        {/* §8.9 Theme sheet */}
        <Drawer open={isMobile && st.sheet === 'theme'} onOpenChange={(v) => { if (!v) patch({ sheet: null }) }}>
          <DrawerContent onClick={stopE} className={`${PILL} !max-h-[60vh]`} style={{ ...sheetShell, height: '60vh' }}>
            <DrawerDescription className="sr-only">Choose a template</DrawerDescription>
            {sheetHead('Theme', () => patch({ sheet: null }))}
            <ScrollArea className="flex-1 min-h-0">
              <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {THEMES.map((t, i) => {
                  const [bg, ac] = t.palette
                  const on = i === st.theme
                  return (
                    <button key={t.name} type="button" onClick={(e) => { stopE(e); patch({ theme: i }) }}
                      className="hv-cat hover:bg-accent"
                      style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '10px',
                        border: on ? '1px solid #1B1A17' : '1px solid transparent',
                        background: on ? '#F8F7F4' : 'none', cursor: 'pointer', textAlign: 'left', width: '100%',
                      }}>
                      <span style={{ width: '30px', height: '30px', borderRadius: '999px', background: `linear-gradient(135deg, ${bg} 50%, ${ac} 50%)`, flex: 'none' }} />
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: 'block', fontSize: '14px', fontWeight: 700 }}>{t.name}</span>
                        <span style={{ display: 'block', fontSize: '11px', color: '#98958A' }}>{t.sub}</span>
                      </span>
                      {on && <Check size={13} style={{ color: '#2B6BE4', flex: 'none' }} />}
                    </button>
                  )
                })}
              </div>
            </ScrollArea>
          </DrawerContent>
        </Drawer>

        {/* §8.9 Edit sheet */}
        <Drawer
          open={isMobile && st.editSheet && !!selectedSec}
          onOpenChange={(v) => { if (!v) patch({ editSheet: false, selectedId: null }) }}
        >
          <DrawerContent onClick={stopE} className={`${PILL} !max-h-[84vh]`} style={{ ...sheetShell, height: '84vh' }}>
            <DrawerDescription className="sr-only">Edit this section</DrawerDescription>
            {selectedSec && sheetHead(
              `${catName(selectedSec.cat)} — ${selectedVm.layoutLabel}`,
              () => patch({ editSheet: false, selectedId: null }),
            )}
            {selectedSec && (
              <EditPanel
                sec={selectedSec} vm={selectedVm} api={api}
                artistName={artistName} themeIdx={st.theme} navSections={navSections}
              />
            )}
          </DrawerContent>
        </Drawer>

        {headerModal}
        {publishModal}

        <Toaster
          position="bottom-center"
          offset={isMobile ? 'calc(72px + env(safe-area-inset-bottom))' : '28px'}
          toastOptions={{ unstyled: true, style: { zIndex: 100 } }}
        />
      </div>
    </TooltipProvider>
  )
}

const TOOLBAR_BTN = { padding: '5px 8px', borderRadius: '6px', background: 'none', border: 0, lineHeight: 0 }
