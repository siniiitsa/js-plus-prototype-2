// §5–§9 — all state, all chrome, all interaction.
// Deliberately monolithic (§12.11): only SectionRow and EditPanel are extracted.

import { useCallback, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  GripVertical, ChevronUp, ChevronDown, ArrowUp, ArrowDown, MoreHorizontal,
  Pencil, Palette, X, Trash2, ChevronLeft, ChevronRight, ArrowRight,
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
  THEMES, CATS, NVAR, FLAG, FIELDS, TITLES, DEFS, TRACKS, TAGS, TAG_LABELS, HERO_CTA, BIO_CREDIT, BIO_CTA, TIERS, TIER_KEYS, PRICE_UNIT, QUOTES,
  CITIES, PINS, EXAMPLE_PAGE,
  NOW_PLAYING, TRACK_AUDIO, SONGS, REP_ALL,
  GIGS, MAP_RADIUS, MAP_BASE, MAP_TERMS, MAP_TRAVEL_TIME, MAP_FEE, directionsUrl, GALLERY_SOURCES,
  MAP_STATUS, MAP_UPDATED, MAP_RINGS, MAP_EXPAND,
  PRICING_REVIEWS, PRICING_RATING, PRICING_CTA, PRICING_NOTE,
  FORM_PROMISES, FORM_FIELDS, FORM_FIELD_KEYS, FORM_EMAIL_LABEL, FORM_KINDS, FORM_TYPES, FORM_MESSAGE,
  FOOTER_LINKS, FOOTER_TARGETS, FOOTER_CREDIT, FOOTER_STATEMENT,
  CAL_OPEN, CAL_TIME, CAL_DAYS, CAL_BOOKED, CAL_SPAN, SLOT_KEYS, slotSeed, parseDayFirst, pageTiers, CAL_SLOT_CTA, FORM_EMAIL, pageEmail, MONTHS, DAY_FULL,
  TESTI_HEADING_2, CAL_HEADING_3, KICKER_3, TESTI_STARS,
  CAL_HEADING_4, GALLERY_HEADING_4, MAP_HEADING_4, TESTI_HEADING_4, FORM_HEADING_4, FORM_BTN_4, FORM_SUB_4, CAL_TYPES, PRICING_ROW_CTA, MAP_SPAN, FORM_PRICE, FORM_PRICE_UNIT, FORM_BOOKINGS, FORM_CTA, FORM_NOTE, FORM_AVAILABLE,
  parseDate, isoDate, calStart, headerIdentity, monthSpan, monthLabel, enquiryLine, weekdayOf,
  CTA_TARGETS, firstPresent, minimalNav, navModeDefault,
  catById, catName, navSectionsOf, contrast, lum, mix, rgba, caseText, fieldDefault, fieldReach, fieldNowhere, copyrightOf, extUrl, urlProblem, emailProblem, emailAddr, songTags, repChips,
  tierFeats, blankRow, SONG_KEYS, TRACK_KEYS, GIG_KEYS, QUOTE_KEYS, LINK_KEYS, enquiryMailto, formErrors,
  headerFamily, layoutCount, designCount, pageLayout, pageOrder, pageRows, COLUMN_SPLIT, bebasEms, antonEms,
  headerLayout, headerLayoutLabel, setupHeaderCount,
} from './data.js'
import { defaultImage, defaultImages, defaultTrackArt, RETRO_TEXTURE, TEMPLATE_STILLS } from './photos.js'

/* ------------------------------------------------------------------ *
 * §5.5 Axis B — canvas device preview sizing
 * ------------------------------------------------------------------ */

// `dev` names the row, so sectionVm can pick a theme's ramp for it: `canvasW` is
// no key for that, since PublishedPage overwrites it with '100%' on a phone.
const SIZES = {
  mobile:  { dev: 'mobile',  h1: '42px', h1b: '50px',  h2: '29px', pad: '44px 22px', navGap: '36px', split: '1fr',         g3: '1fr',           g2: '1fr',       canvasW: '390px'  },
  tablet:  { dev: 'tablet',  h1: '60px', h1b: '78px',  h2: '36px', pad: '56px 40px', navGap: '48px', split: '1fr 1fr',     g3: '1fr 1fr 1fr',   g2: '1fr 1fr',   canvasW: '768px'  },
  desktop: { dev: 'desktop', h1: '86px', h1b: '118px', h2: '46px', pad: '80px 64px', navGap: '64px', split: '1.05fr 1fr',  g3: '1fr 1fr 1fr',   g2: '1fr 1fr',   canvasW: '1180px' },
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

// The rest of the Figma file's size tokens, which RAMP never carried because
// the branches fitted before them wrote per-width literal tables instead. Retro's
// mode on the same rule (tablet and mobile verbatim from `size-tablet/*` and
// `size-mobile/*`, desktop × 0.82, rounded), so a shared branch that reads one
// gets a number under every theme. Nothing read these when they were added.
//
// RAMP's own seven keys are NOT Retro's tokens everywhere — mobile dispXl is 77
// against a token of 48, tablet title 22 against 19 — because they were fitted
// to renders before the variable file existed. They stay as they are.
const RAMP_REST = {
  mobile:  { dispMd: '30px', list: '13px', labelLg: '14px', labelSm: '12px', bodyLg: '15px', bodyMd: '13px', bodySm: '12px', chip: '11px' },
  tablet:  { dispMd: '38px', list: '12px', labelLg: '16px', labelSm: '13px', bodyLg: '15px', bodyMd: '13px', bodySm: '12px', chip: '11px' },
  desktop: { dispMd: '39px', list: '13px', labelLg: '20px', labelSm: '13px', bodyLg: '13px', bodyMd: '11px', bodySm: '10px', chip: '10px' },
}

// A designed template's own ramp, laid over the Z spread in sectionVm, keyed by
// `THEMES[].name` and then by `SIZES[].dev`. Lime's is its Figma mode on
// RAMP_REST's rule — every key, no fitted exceptions — so `s.dispXl` under Lime
// is `size/display-xl` at that width. A theme with no row keeps RAMP's numbers.
const THEME_RAMP = {
  Lime: {
    mobile:  { dispXl: '72px',  dispLg: '54px',  dispMd: '40px', dispSm: '32px', title: '26px', list: '18px', labelLg: '14px', labelMd: '13px', labelSm: '12px', labelXs: '12px', bodyLg: '15px', bodyMd: '13px', bodySm: '12px', chip: '11px', eyebrow: '11px' },
    tablet:  { dispXl: '120px', dispLg: '81px',  dispMd: '50px', dispSm: '40px', title: '28px', list: '19px', labelLg: '21px', labelMd: '17px', labelSm: '14px', labelXs: '14px', bodyLg: '15px', bodyMd: '13px', bodySm: '13px', chip: '12px', eyebrow: '12px' },
    desktop: { dispXl: '164px', dispLg: '107px', dispMd: '59px', dispSm: '41px', title: '30px', list: '20px', labelLg: '26px', labelMd: '20px', labelSm: '15px', labelXs: '16px', bodyLg: '13px', bodyMd: '11px', bodySm: '11px', chip: '11px', eyebrow: '12px' },
  },
  // Static Youth, Grunge's mode: Lime's ramp but for display-xl, the three
  // larger labels, body-sm and chip.
  Grunge: {
    mobile:  { dispXl: '52px',  dispLg: '46px',  dispMd: '38px', dispSm: '30px', title: '26px', list: '18px', labelLg: '14px', labelMd: '13px', labelSm: '12px', labelXs: '12px', bodyLg: '15px', bodyMd: '13px', bodySm: '12px', chip: '11px', eyebrow: '11px' },
    tablet:  { dispXl: '95px',  dispLg: '81px',  dispMd: '50px', dispSm: '40px', title: '28px', list: '19px', labelLg: '16px', labelMd: '14px', labelSm: '13px', labelXs: '14px', bodyLg: '15px', bodyMd: '13px', bodySm: '12px', chip: '11px', eyebrow: '12px' },
    desktop: { dispXl: '162px', dispLg: '107px', dispMd: '59px', dispSm: '41px', title: '30px', list: '20px', labelLg: '20px', labelMd: '16px', labelSm: '13px', labelXs: '16px', bodyLg: '13px', bodyMd: '11px', bodySm: '10px', chip: '10px', eyebrow: '12px' },
  },
}

// The two keys that only matter once a window is wider than the canvas its
// frame was drawn at — see PublishedPage, the one place that sets a surplus.
//
// `surplus` is half the width past `canvasW`, and it is zero everywhere else:
// the editor caps its canvas at canvasW (and draws tablet in a window no wider
// than 1180 — see useTabletCap) and the preview thumbnails render at a
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
for (const k of Object.keys(SIZES)) Object.assign(SIZES[k], RAMP[k], RAMP_REST[k], WIDE[k])

/* ------------------------------------------------------------------ *
 * §5.5 Axis A — builder chrome breakpoint
 * ------------------------------------------------------------------ */

function useMedia(query) {
  const [m, setM] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = (e) => setM(e.matches)
    mq.addEventListener('change', on)
    setM(mq.matches)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return m
}

const useIsMobile = () => useMedia('(max-width: 820px)')
// A window no wider than iPad Air landscape leaves the canvas well short of the
// desktop frame's 1180 once the sidebar takes its share, and the desktop
// composition squeezed that far breaks. Such a window previews tablet at most,
// as the published tab already does below 1180 (user call, 2026-09-17).
const useTabletCap = () => useMedia('(max-width: 1180px)')

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

// The editor root closes menus on any bubbled click, so virtually every
// interactive handler and every modal panel isolates its events (§5.6).
const stopE = (e) => e.stopPropagation()

// A tap on a toast (the delete toast's Undo) is not a tap outside a drawer.
// A guard: vaul was measured not to close on one without it, but the mobile
// sheets pass this as `onPointerDownOutside` so that stays true.
const keepOnToast = (e) => {
  if (e.target?.closest?.('[data-sonner-toaster]')) e.preventDefault()
}

// The site address the publish dialog shows, off the artist's name. Letters in
// any script survive (an IDN host is legal); an unnamed page gets a stand-in.
const siteSlug = (name) =>
  String(name).normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '') || 'my-page'

// The artist's name off the header's Title (JP-050): trimmed, and the prop
// only where the Title resolves to nothing — which the editor never stores
// (NameInput), so in the app that is a fresh page's absent key alone.
const nameOf = (title, fallback) => String(title ?? '').trim() || fallback

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

// Layout 4's heading fallbacks, per category — the composed page's own heads
// (QA, 2026-09-15; the form's, JP-054). sectionVm and EditPanel both read this.
const HEADING_4 = {
  calendar: CAL_HEADING_4, gallery: GALLERY_HEADING_4, map: MAP_HEADING_4, testimonials: TESTI_HEADING_4,
  form: FORM_HEADING_4,
}

// The page's layout, for the one section that cannot say it itself: the footer
// has a single design, so its own `arch` is always 0. The header is the
// section the setup modal lays the whole page out from, so its design stands
// for the page's. -1 when there is no header (it is locked, so never in the
// editor; only a preview that renders a lone section).
export const pageDesignOf = (sections, themeName) => {
  const h = sections.find((x) => x.cat === 'header')
  if (!h) return -1
  const n = designCount('header', themeName) || 1
  return ((h.arch % n) + n) % n
}

export function sectionVm({ themeIdx, cat, arch, c = {}, artistName, identity = {}, tiers = [], email = '', Z, mob, live = false, navSections = [], column = false, today, page = -1 }) {
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
    // Figma's `font/ui`, the face `Label/XS` names. Only the designed templates
    // carry one; the flat two fall back to their body face.
    ui: T.ui ?? T.body,
    // Space Mono, the frames' typewriter face; only Retro names it so far.
    mono: T.mono ?? T.body,
    radius: T.radius, radiusSm: T.radiusSm, btnR: T.btnR, bw: T.bw,
    // `radius/chip`. Retro's token is 8, which its branches write as a literal.
    radiusChip: T.radiusChip ?? '8px',

    // A designed template's semantic colours beyond its three-colour palette
    // (THEMES[].sem, Lime's Scheme 1). They are undefined under every theme
    // with no `sem` — Retro writes its equivalents as literals — so read them
    // behind `s.lime`, never as a shared value.
    box1: T.sem?.box1, box2: T.sem?.box2, box3: T.sem?.box3, glow: T.sem?.glow,
    activeBg: T.sem?.activeBg, activeFg: T.sem?.activeFg,
    inactiveBg: T.sem?.inactiveBg, inactiveFg: T.sem?.inactiveFg, inactiveLine: T.sem?.inactiveLine,
    stroke1: T.sem?.stroke1, stroke2: T.sem?.stroke2, hl: T.sem?.hl,

    // device sizing — and over it a designed template's own ramp, if it has one
    ...Z, ...THEME_RAMP[T.name]?.[Z.dev], mob: !!mob,
    // A section standing in one of layout 3's page columns (`pageRows`). The
    // row around it carries the page gutter, so the section keeps its vertical
    // padding and drops its horizontal one — and with it the surplus, which the
    // row's gutter already holds in the published tab.
    ...(column ? { padX: '0px', surplus: '0px', pad: `${Z.padY} 0px` } : null),
    contentW: contentWidth(Z.dev, column),

    // True only in the published tab. The editor canvas is a picture of a
    // website, not a website (§12.7), so every control EncoreSection draws is
    // a static span there. This is the one flag a control may branch on to
    // become real. Fifteen things read it: Repertoire's search, chips and
    // pager, and in layout 4 the A–Z rail that jumps the page to a letter's
    // group; the header's navigation — its links, its Book Now and Listen, and
    // the burger menu the narrow frames collapse to; the bio's own Listen,
    // which its layout 4 sets in the overlay card's meta row; the media player's
    // transport; the gallery's strip and arrows; the events map's pager and
    // pin/row pairing; the pricing cards' filter chips and their Book pill; the
    // booking calendar's month arrows, its day picking and its foot pill; the
    // enquiry form's boxes, its event-type chips and its submit; the
    // testimonials carousel's arrows, layout 2's rail of tiles and layout 4's
    // pair of arrow discs, which all page the same review; the footer's link
    // columns and its Book
    // pill; and the four sets of outbound links (Soundcloud, the gallery's
    // socials, the gigs' tickets, the footer's web-address rows).
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
    // Editorial and Pop render the identical structure, flat, and Lime and
    // Grunge each draw a decoration of their own behind `lime` and `grunge`
    // below.
    retro: T.name === 'Retro',
    // Lime's four layout pages are Retro's components in its own variable
    // mode, so its decoration — arc seams, glows, the arch portrait — goes
    // inside the same shared branches, behind this flag. It composes with
    // `retro` rather than replacing it: what Retro and Lime both draw is
    // gated `(s.retro || s.lime)`, what Lime alone draws is `s.lime`.
    lime: T.name === 'Lime',
    // What every designed template's frame draws alike — the full-bleed hero,
    // TagChips' sentence-case chips — is gated on this rather than on a list of
    // names. A site only some of them share stays a named pair, widened per
    // site from the frame.
    designed: T.name === 'Retro' || T.name === 'Lime' || T.name === 'Grunge',
    // Grunge's four layout pages are the same components in a third mode,
    // Static Youth, so its decoration — at layout 1 torn black seams round its
    // textured bands, grain and the red seal, at layouts 2, 3 and 4 rings where
    // Lime glows, and at layout 4 torn seams again where Lime draws arcs — goes
    // behind this flag in the shared branches, the way Lime's does. A value two templates share is written as
    // the pair: `(s.retro || s.grunge)` for grain and torn edges,
    // `(s.lime || s.grunge)` for the `sem` reads and the capsule nav.
    grunge: T.name === 'Grunge',
    // Lime layout 3's footer (964:68684 · 984:10769 · 984:10800) stands on
    // Scheme 2's `sem/bg`, the olive `box1`, where layout 1's is the page
    // ground; its seal's disc follows. `page` is the header's design.
    footerBand: T.name === 'Lime' && cat === 'footer' && page === 2 ? T.sem?.box1 : undefined,
  }
  // Lime layout 3's column heads — the bio's "KM BIO", the player's and the
  // calendar's "Book Me" — stand 50 below their row in all three frames
  // (964:68655 · 984:10741 · 984:10772), where `padY` gave 80 / 56 and left a
  // wide gap under the header. All three at once, or the two heads of the
  // desktop row would part. 390 keeps its 44: under the 50 already, and the
  // header's own inset is the frame's 10. The frames stand the player's
  // Section 80 below the bio's, so the bio pads 30 underneath where `padY`
  // doubled up with the player's own top. The player's list ends 122 / 90 / 70
  // above the repertoire's head (100 on the 0.82 canvas); the repertoire's own
  // top inset is its fitted one, so the player's foot takes the difference —
  // 37 / 47 / 35, measured against the seeded page. Grunge's composed region
  // is Lime's to the pixel (plans/grunge/layout-3.md), so each of its three
  // sections joined the arm in its own session — the bio, then media, then the
  // calendar, which closes the row: its `Frame 300` pads 50 / 50 / 40 above
  // "Book Me" and 56 / 56 / 40 under the card, Lime's own numbers.
  if (d === 2 && ((T.name === 'Lime' || T.name === 'Grunge')
    && (cat === 'bio' || cat === 'calendar' || cat === 'media'))) {
    const z = (v) => `${Z.dev === 'desktop' ? Math.round(v * 0.82) : v}px`
    const top = Z.dev === 'mobile' ? vm.padY : z(50)
    const foot = cat === 'bio' ? z(30)
      : cat === 'media' ? ({ desktop: '37px', tablet: '47px', mobile: '35px' })[Z.dev]
      : vm.padY
    vm.pad = `${top} ${vm.padX} ${foot}`
  }
  // The pricing stack's footnote stands 32 above the section's foot at 1440
  // and 768 (964:68680 · 984:10765). 390 keeps its 44, under the master's 60.
  // Grunge's three masters state the same 32 / 32 / 60 (964:68712 · 984:13925
  // · 984:13956), so the arm is both templates'.
  if ((T.name === 'Lime' || T.name === 'Grunge') && d === 2 && cat === 'pricing' && Z.dev !== 'mobile') {
    vm.pad = `${vm.padY} ${vm.padX} ${Z.dev === 'desktop' ? Math.round(32 * 0.82) : 32}px`
  }
  // The form's card ends 90 / 60 above its foot and the testimonials' head
  // stands 56 / 30 below their top (964:68682 + 964:68683 · 984:10767 +
  // 984:10768), where `padY` doubled up to 160 / 112. The wall's own foot is
  // 56 at both widths — the 768 `padY` already. 390 is under the frames.
  //
  // Grunge's form and testimonials masters state the same insets to the pixel
  // (964:68714 + 964:68715 · 984:13927 + 984:13928 — the wall's own root pads
  // 56 / 56 at 1440 and 30 / 56 at 768, Lime's numbers), so both templates are
  // one condition again; the pair was two halves for one session, the composed
  // row's rule (plans/grunge/layout-3.md).
  if ((T.name === 'Lime' || T.name === 'Grunge')
    && (cat === 'form' || cat === 'testimonials') && d === 2 && Z.dev !== 'mobile') {
    const desk = Z.dev === 'desktop'
    const px = (v) => `${desk ? Math.round(v * 0.82) : v}px`
    vm.pad = cat === 'form'
      ? `${vm.padY} ${vm.padX} ${px(desk ? 90 : 60)}`
      : `${px(desk ? 56 : 30)} ${vm.padX} ${px(56)}`
  }
  // Layout 4's page-ground sections take the frame's side inset, not `padX`
  // (JP-038, layout 4; user call, 2026-09-23). Every layout-4 master stands
  // its content 56 / 30 / 10 in from the page edge, and the sheets beside
  // these four (media, gallery, repertoire, testimonials, the header, the bio)
  // already bleed and put that inset back as `u(56)`, so a root at `padX`'s
  // 64 / 40 / 22 read 22 / 10 / 12 in from its neighbours. `padX` is what
  // pricing's `bleedX` and the root both read, so the rule still reaches the
  // page edges and the calendar's panel lands at the frame's 56 / 30 / 10.
  // Every theme: the sheets' `u(56)` is not theme-gated either. The footer is
  // layout 1's on every page and keeps `padX`.
  if (d === 3 && !column && (cat === 'map' || cat === 'pricing' || cat === 'calendar' || cat === 'form')) {
    const inset = { desktop: Math.round(56 * 0.82 * 100) / 100, tablet: 30, mobile: 10 }[Z.dev]
    vm.padX = `${inset + parseInt(vm.surplus, 10)}px`
    vm.pad = `${vm.padY} ${vm.padX}`
    vm.contentW = parseInt(SIZES[Z.dev].canvasW, 10) - 2 * inset
  }

  // ---- content -----------------------------------------------------
  // One resolved name for every slot that prints it (JP-050). The header
  // resolves its own Title the way the builder derives `artistName` from it,
  // so the h1, the wordmark, the badge and the initials of a header preview
  // (or a harness `&cj=`) can never disagree; every other section takes the
  // builder's. An emptied Title used to blank the h1 alone.
  const name = cat === 'header' ? nameOf(c.title, artistName) : artistName
  const initials = initialsOf(name)
  vm.initials = initials
  vm.brand = cased(name)
  vm.heroTitle = vm.brand
  vm.title = cased(cv('heading', cat === 'header' ? name : (TITLES[cat] ?? '')))

  // header
  // The kicker and the location are the artist's, typed once on the header
  // (F1), the way the name is its Title: every other section that prints them
  // — the bio's role lines and ID card, the calendar's polaroid and summary
  // card, the enquiry form's credit — reads the header's through `identity`
  // (`headerIdentity()` in data.js), since only the header has the fields.
  // The header reads its own content, so a preview of a layout the page is not
  // on still shows what that layout would. Lime's and Grunge's layout-3 card
  // types its own strapline; EditPanel mirrors it.
  const own = cat === 'header' ? c : identity
  vm.kicker = own.kicker !== undefined ? own.kicker
    : cat === 'header' && d === 2 && (T.name === 'Lime' || T.name === 'Grunge') ? KICKER_3 : 'DJ · Live Act'
  vm.subtitle = cv('subtitle', DEFS.heroSub)
  vm.location = own.location !== undefined ? own.location : 'Manchester, UK'
  // "DJ · Live Act · Manchester, UK", composed here so an emptied half drops
  // with its separator rather than leaving a bare " · ".
  vm.roleLine = [vm.kicker, vm.location].filter(Boolean).join(' · ')
  vm.cta1 = cv('cta1', 'Book Now')
  vm.cta2 = cv('cta2', 'Listen')
  // JP-037 — layout 2's hero pill. Uncased, the footer pill's rule.
  vm.heroCta = cv('heroCta', HERO_CTA)
  vm.showBadge = cv('showBadge', 'show')
  vm.badgeText = cv('badgeText', name)
  vm.navMode = cv('navMode', cat === 'header' ? navModeDefault(T.name, d) : 'sections')
  vm.align = cv('align', 'left')
  // Retro, Lime and Grunge seed their Figma pages' mock photography (photos.js); the
  // flat two resolve to undefined and keep the initials placeholder. `undefined` already means "key
  // absent", which is what a fresh section carries, so Remove writes `null` as an
  // explicit-clear sentinel: absent → the mock photo, null → the placeholder,
  // string → an upload.
  vm.image = c.image !== undefined ? (c.image ?? undefined) : defaultImage(cat, T.name, 'image', d)
  // The artist avatar is a slot of its own — the hero portrait card, the
  // inset-card thumb and the overlay-card circle — on the same three states as
  // vm.image, keyed on `avatar`. Retro seeds it with the §10.2 portrait, which
  // is a different photograph from the backdrop; elsewhere an empty avatar is
  // the initials placeholder. A backdrop upload no longer fills it.
  vm.avatar = c.avatar !== undefined ? (c.avatar ?? undefined)
    : defaultImage(cat, T.name, 'avatar')
  // Multi-photo sections — the gallery strip is the only one left, now that the
  // media player's track artwork travels per track. Slot n fills tile n;
  // an empty slot falls through to the section's initials placeholder. An
  // explicitly emptied array is already distinguishable, so no sentinel is needed.
  vm.images = Array.isArray(c.images) ? c.images : (defaultImages(cat, T.name) ?? [])
  // Fixed decoration — paper grain and the events-map raster (§10.2). The grain
  // is Retro's and Grunge's (Lime's frames carry no texture); the raster is the
  // same image in Lime's map frame, so every designed template takes it.
  // Grunge's frames lay the very raster grain.jpg was cut from (image hash
  // b74be8bc, a 3/255 re-encode apart) over their bands and photographs, as a
  // LIGHTEN layer where Retro's is a multiply; the sections pass the blend.
  vm.grainSrc = T.name === 'Retro' || T.name === 'Grunge' ? RETRO_TEXTURE.grain : undefined
  vm.mapSrc = vm.designed ? RETRO_TEXTURE.map : undefined
  vm.mapRadialSrc = vm.designed ? RETRO_TEXTURE.mapRadial : undefined

  // §4.8 — `navSections` is `{ cat, label }`, the label being the visitor's
  // word for the section (`navLabel()`, §4.3a) and never the sidebar's, and a
  // nav link keeps the target as `to` so the published page can scroll to it.
  //
  // §10.2 also collapsed mobile to the fixed triple regardless of navMode. That
  // rule was about a horizontal bar, which cannot carry nine section links at
  // 390px — the burger panel is a column and has the room, so mobile now shows
  // the artist's own sections like every other width.
  //
  // Minimal's Music / Gigs / About name no category, so one can resolve to
  // nothing. The footer's rule applies (§4.3a): the canvas keeps the label and
  // the published page leaves it out, before navEms below measures the row.
  vm.navLinks = vm.navMode === 'minimal'
    ? minimalNav(navSections).filter((l) => !live || l.to)
    : navSections.map((n) => ({ label: n.label, to: n.cat }))
  // How wide Lime's one row of nav links wants to be, in ems of its own type:
  // every label in Bebas Neue plus the frame's 23/24 gap between each, with 1%
  // spare. NavBar divides the room it has by this, so the links drop below
  // `s.list` only when the artist's section names would otherwise wrap the
  // capsule onto a second row. Floored at 1 so an empty nav divides by nothing
  // worse than itself. Grunge draws the same capsule over the same links in
  // Anton, untracked (its mode states 0), so it takes the same sum off that
  // face's table. Undefined on the rest, which draw no capsule.
  // Its labels are set at 0.75 of the row's size (`faced` in EncoreSection —
  // Anton standing in for Stones Crush), while the gaps stay the row's ems.
  // Grunge's layout-2 capsule (964:64618) gaps its links a fixed 18 at 16px
  // type and again at 13, and its layout-3 one (964:68686) at 20 and 14, so
  // there the sum is the labels alone and HeaderV1 / HeaderV2 add the gaps as
  // a fixed box beside the capsule's padding. Its layout-4 capsule (964:72944)
  // gaps them a fixed 23 at 20px type, and NavBar's `links` takes them off the
  // row the same way.
  const navFace = T.name === 'Lime' ? bebasEms : T.name === 'Grunge' ? (x) => antonEms(x, 0) * 0.75 : null
  const navGapEm = T.name === 'Grunge' && d >= 1 ? 0 : 23 / 24
  vm.navEms = navFace
    ? Math.max(1, +((vm.navLinks.reduce((w, l) => w + navFace(l.label), 0)
      + Math.max(0, vm.navLinks.length - 1) * navGapEm) * 1.01).toFixed(3))
    : undefined
  // What the rest of Lime's layout-2 nav spends beside those links, in the same
  // Bebas ems: the name at Label/LG, and Listen plus the pill's label at
  // Label/SM. That bar centres the name between two cells, so HeaderV1 sizes
  // its links against the whole row less these rather than against one cell,
  // which the seeded nine could only fill on two rows. Grunge's layout 2 is
  // that bar in Anton at 0.75, so it takes the same two off `navFace`.
  vm.navNameEms = navFace ? +navFace(vm.brand).toFixed(3) : undefined
  vm.navCtaEms = navFace ? +(navFace(vm.cta1) + navFace(vm.cta2)).toFixed(3) : undefined
  // Whether the tablet header draws its links (JP-039). The 768 masters of
  // layouts 2 and 3 draw Music / Gigs / About in the capsule, in Retro and Lime
  // alike, where layouts 1 and 4 hide the links behind a burger — but
  // `navLinks` is the artist's page, and the seeded nine come to more type
  // than the bar is wide. So the links draw when the bar's one row holds them
  // and the burger stands otherwise: the capsule, the wordmark, Listen and the
  // pill, summed at the master's own sizes against the bar (688 in layout 2;
  // 684 in layout 3, whose card insets it 10 + 32 a side). `other` is every
  // fixed box beside the type — Lime's is HeaderV1's desktop `reserve` unscaled
  // (138.32, the capsule's 36 in it), Retro's the capsule's 36 + 2 of border,
  // four 16 gaps, Listen's 12 and the pill's 59 of padding, gap and disc. An
  // empty nav keeps the burger, and 390 always does: its master draws one.
  // Grunge's layout 2 (986:13753) is Lime's bar box for box — the same 138.32
  // — at its own 13 / 16 in Anton at 0.75 (`navFace`), plus the capsule's
  // fixed 18 gaps, which its `navEms` leaves out (above). Its layout 3
  // (984:13900) is Lime's layout-3 bar box for box, the same 138.32 against
  // the same 684, with the links at Label/MD (14 at 768) where Lime's are
  // Label/SM, and the same fixed 18 gaps.
  if (cat === 'header' && Z.dev === 'tablet' && vm.navLinks.length && (d === 1 || d === 2)) {
    const px = (v) => parseFloat(v)
    const row = d === 1 ? 688 : 684
    if (T.name === 'Lime') {
      vm.navFits = vm.navEms * px(vm.labelSm) + vm.navNameEms * px(vm.labelLg)
        + vm.navCtaEms * px(vm.labelSm) + 138.32 <= row
    } else if (T.name === 'Grunge') {
      vm.navFits = vm.navEms * px(d === 1 ? vm.labelSm : vm.labelMd) + (vm.navLinks.length - 1) * 18
        + vm.navNameEms * px(vm.labelLg) + vm.navCtaEms * px(vm.labelSm) + 138.32 <= row
    } else if (T.name === 'Retro') {
      const [link, name] = d === 1 ? [16, 20] : [13, 16]
      vm.navFits = vm.navLinks.reduce((w, l) => w + antonEms(l.label), 0) * link
        + (vm.navLinks.length - 1) * 18 + antonEms(vm.brand) * name
        + (antonEms(vm.cta1) + antonEms(vm.cta2)) * link + 38 + 64 + 12 + 59 <= row
    }
  }

  // The header's two CTAs point at a section as well: Book Now at wherever the
  // page takes a booking, Listen at wherever it plays something (§4.3a).
  vm.bookTo = firstPresent(CTA_TARGETS.book, navSections)
  vm.listenTo = firstPresent(CTA_TARGETS.listen, navSections)
  // The pricing cards' own pills book too, but they cannot book at themselves:
  // `pricing` is the last resort in CTA_TARGETS.book, so on a page with neither
  // a form nor a calendar the pill would scroll the visitor to the section they
  // are already reading. Dropping it leaves `undefined`, and BookPill's own rule
  // — no target, no link — keeps the pill the picture it is today.
  vm.tierBookTo = firstPresent(CTA_TARGETS.book.filter((x) => x !== 'pricing'), navSections)
  // Layout 4's row pill label (its frame's "Star Enquiry", read as "Start").
  // Uncased, the footer's rule: the pill sets it in the display face with no
  // text transform, and casing it would shout on Pop.
  vm.tierRowCta = cv('rowCta', PRICING_ROW_CTA)

  // chips — TAGS, one per palette tag hue. A template whose Figma mode names
  // each tag's ink (`sem.tagFg`, parallel to `tags`) takes it; contrast()'s
  // black-or-white is the fallback, and is wrong on both of Lime's seats.
  // These are colour seats and nothing else (JP-037): `s.chips[3].bg` and
  // friends are read across the header, media, map and pricing, so the list
  // keeps TAGS' length and order and carries no label.
  vm.chips = TAGS.map((_, i) => {
    const cbg = T.tags[i % T.tags.length]
    return { bg: cbg, fg: T.sem?.tagFg?.[i % T.tags.length] ?? contrast(cbg) }
  })
  // The chip rows print the artist's tags — the header's, which the bio reads
  // through `identity` as it reads the kicker — each seated on `vm.chips` by
  // index, wrapping. `showTags` travels with them, and an emptied list hides
  // the row as Hide does: every reader of it is a chip-row gate, and a row of
  // none would still spend its gap and padding.
  const tagList = songTags(own.tags !== undefined ? own.tags : TAG_LABELS)
  vm.tagChips = tagList.map((t, i) => ({ label: cased(t), ...vm.chips[i % vm.chips.length] }))
  vm.showTags = tagList.length && own.showTags !== 'hide' ? 'show' : 'hide'

  // §10.2 — the Book Now pill is accent-coloured type on a second palette hue,
  // not on the accent itself. The reference uses the palette's lightest hue
  // (Retro's mustard) so the pill reads as a highlight; the accent is kept as
  // the type only while it stays legible against it.
  const pillBg = T.tags
    .filter((h) => h !== bg && h !== ac)
    .reduce((best, h) => (lum(h) > lum(best) ? h : best), T.tags.find((h) => h !== bg && h !== ac) || T.tags[0])
  vm.pillBg = pillBg
  vm.pillFg = Math.abs(lum(pillBg) - lum(ac)) > 0.22 ? ac : contrast(pillBg)
  // A template whose Figma mode names its button pair takes it instead. Lime's
  // two tag seats leave the walk above only its box1 olive, dark on the dark
  // page — and its frames draw every pill in active/bg with active/text anyway.
  if (T.sem?.activeBg) {
    vm.pillBg = T.sem.activeBg
    vm.pillFg = T.sem.activeFg
  }

  // bio
  vm.bioP1 = cv('para1', DEFS.bioP1)
  // JP-037 — layout 2's foot row. The frame sets the line two-tone, its first
  // three words in the accent; split here, since EncoreSection composes
  // nothing. A line of three words or fewer is all lead. The pill is uncased.
  const credit = String(cv('credit', BIO_CREDIT) ?? '').trim().split(/\s+/).filter(Boolean)
  vm.bioCredit = { lead: credit.slice(0, 3).join(' '), rest: credit.slice(3).join(' ') }
  vm.bioCta = cv('cta', BIO_CTA)
  vm.bioP2 = cv('para2', DEFS.bioP2)
  // Layout 3's first stat, seeded with the frame's "June 2021"; an emptied
  // string is what tells the ID card not to draw the column.
  vm.since = cv('since', DEFS.since)

  // media
  vm.mediaKicker = cv('kicker', 'Top tracks')
  // vm.nowPlaying is resolved under `tracks` below, because it reads them.
  // The Soundcloud button's destination, and the whole of its `live` seam.
  // Normalised to an absolute URL: the published tab carries a <base href> to
  // the opener, so a schemeless "soundcloud.com/kai" would resolve against the
  // builder and open it instead. An empty field leaves the pill a picture —
  // except under Lime, whose layout 1 draws the pill only when this is filled.
  vm.soundcloud = extUrl(cv('soundcloud', ''))
  // Lime layout 1's pill, which is its frame's Book Now on vm.bookTo rather
  // than the Soundcloud button (JP-034). `media` is not in CTA_TARGETS.book, so
  // bookTo needs no self-exclusion here. Uncased, vm.footerCta's rule — it is
  // the same pill — and an emptied label drops it, the footer's rule again.
  vm.mediaCta = cv('cta', 'Book Now')

  // tracks — the media player's *array* of { title, sub, image, audio } on
  // `c.tracks` (TracksField); an absent key means the seeded TRACKS, dressed
  // under Retro in RETRO_TRACK_ART. `n` is naively '0'+index in both.
  //
  // Per-row artwork is never re-seeded by index once the array exists: a row
  // inserted third would otherwise steal track three's photograph. `img` is
  // `null` — not undefined — wherever a row has no art of its own, because
  // Photo falls back to the section photo on undefined alone, and the row must
  // not inherit one. (The media player has no section photo left to inherit;
  // the sentinel stays because the rule is Photo's, not this section's.)
  //
  // `src` is the row's sound file, and the whole of the media player's audio
  // seam (§10.2a): the published player loads it into its one <audio> element,
  // and a row without one is unplayable rather than silent-but-selected. A
  // typed address is normalised through extUrl for the same <base href> reason
  // as the Soundcloud button, in its web-only mode — a mailto: or tel: cannot
  // play, and an address extUrl refuses is the no-audio row, not a broken one;
  // the seeds are already absolute. It follows the
  // artwork's rule about re-seeding by index, for the same reason.
  //
  // A row with nothing in it — no title, subline, art or sound — is dropped
  // before anything indexes the list (`blankRow()`, the JP-051 sweep, JP-048's
  // filter-first order), or it would be a card the published player loads
  // nothing into and a seat the fan and the transport step through.
  //
  // `sub` is the one subline the fitted layout 1 sets; `rel` is the same line
  // with the duration taken off it, for a design that columns the release and
  // the running time apart (media layout 2). The seeded shape is the only one
  // that knows both: TracksField has no duration field at all, so there `rel`
  // is just the row's own subtitle and equals `dur`.
  const seedArt = defaultTrackArt(cat, T.name) ?? []
  if (Array.isArray(c.tracks)) {
    vm.tracks = c.tracks.filter((t) => !blankRow(t, TRACK_KEYS)).map((t, i) => {
      const sub = (t?.sub ?? '').trim()
      return { n: '0' + (i + 1), name: cased(t?.title ?? ''), dur: sub, sub, rel: sub,
               img: t?.image ?? null, src: extUrl(t?.audio ?? '', true) || null }
    })
  } else {
    vm.tracks = TRACKS.map(([name, dur, rel], i) => ({
      n: '0' + (i + 1), name: cased(name), dur, sub: `${rel} · ${dur}`, rel,
      img: seedArt[i] ?? null, src: TRACK_AUDIO[i] ?? null,
    }))
  }
  vm.tracks3 = vm.tracks.slice(0, 3)

  // The now-playing card is no longer content of its own: it names and shows
  // the track the player is on, which `Media` resolves from `vm.tracks`. What
  // is left here is the canvas's decorative clock — the frame draws a player
  // mid-song — and only while there is a song to be in the middle of. With no
  // tracks the clock stands at 00:00 under an empty bar on both surfaces, and
  // the card names `mediaEmpty`, the one message the empty list prints too.
  // `tracks3` is a prefix of `tracks`, so one test covers every design.
  vm.mediaEmpty = 'No tracks yet.'
  vm.nowPlaying = vm.tracks.length
    ? { ...NOW_PLAYING, by: cased(artistName) }
    : { at: '00:00', of: '00:00', pct: 0, by: cased(artistName) }

  // pricing — the artist's own packages, else the seeded ones. The `songs`
  // rule again: an absent key means TIERS, an emptied array means no packages,
  // and there is no null sentinel. Everything the card prints comes off the row
  // now, where only the name and the price used to (t1n/t1p/…, gone).
  vm.pricingSub = cv('sub', DEFS.pricingSub)
  // §10.2 sets the small print in a warm grey well above `muted`'s 64%.
  vm.pricingSubFg = rgba(tx, 0.46)
  vm.tierUnit = cv('unit', PRICE_UNIT)
  // §10.2 layout 4 is the one design that prints no unit *after* its price: its
  // frame heads the price column with the kind of thing being sold instead
  // (SET / PROJECT), which is what the unit already names. So the same field is
  // read there, with its leading slash dropped — "/EVENT" over a numeral is a
  // suffix that has lost its number — and the label face upper-cases the rest.
  // One value for the whole section where the frame types a different word per
  // row; the field's hint says so.
  vm.tierKind = String(vm.tierUnit).replace(/^\s*\/\s*/, '')
  // §10.2 layout 3 stands a line under the title, where layout 1 heads the chip
  // row with the title alone and layout 2 puts its kicker above it. Layout 3
  // only, so an emptied field drops the line — the Soundcloud rule.
  vm.pricingIntro = cv('intro', DEFS.pricingIntro)
  // §10.2 layout 2 stands a line of praise beside the plan. Layout 1 draws no
  // such line, so an emptied field simply drops it — the Soundcloud rule.
  vm.pricingQuote = cv('quote', DEFS.pricingQuote)
  // Layout 2's credit row and the pill beside the plan. Uncased, the footer's
  // rule: the pill has always drawn an uncased label.
  vm.pricingReviews = cv('reviews', PRICING_REVIEWS)
  vm.pricingRating = cv('rating', PRICING_RATING)
  vm.pricingCta = cv('cta', PRICING_CTA)
  vm.pricingNote = cv('note', PRICING_NOTE)
  // A card's four colours, given the ground it stands on. Layout 1 walks that
  // ground round T.tags, one hue per card; layout 2 has a single card and pins
  // it, so both go through here and the pairing rule is written once.
  const tierHues = (card) => {
    // Each card carries a *second* hue. The price numeral, the tick, the
    // [ico] chip and the Book Now pill are all painted in it, and it is the
    // colour of the offset block behind the card too. The reference uses the
    // palette's gold for the olive and orange cards and the accent for the gold
    // one — which is exactly `pillBg`, unless the card already IS `pillBg`.
    const accHue = card === pillBg ? ac : pillBg
    // The reference inks the cards in the palette's cream and near-black, not
    // in pure white/black: contrast() picks the side, the palette the tone.
    const lightCard = contrast(card) === '#141414'
    const ink = lightCard ? vm.deep : vm.paper
    return {
      card,
      // Same caveat as `legible()` above: the second hue only reads while it
      // separates from the card it sits on. Retro's three clear it; a mid-tone
      // card in a pale palette (Editorial's warm grey) does not, and there the
      // card's own ink stands in.
      acc: Math.abs(lum(accHue) - lum(card)) > 0.22 ? accHue : ink,
      cardFg: ink,
      // Only the light card drops its blurb and the price unit off full strength
      // in the reference; on the two dark ones they sit at the feats' cream.
      cardMut: lightCard ? rgba(ink, 0.72) : ink,
      // §10.2 layout 3 stands a FEATURED badge on the card, and the frame
      // paints it `sem/box/1` — which resolves to the card's own hue lifted a
      // ninth of the way towards its ink (#6D7040 on the olive row, which is
      // exactly #5B5E2E at 11% of #FBF6EA). An alpha rather than a mix, because
      // it composites to the same colour and is the shape every other lifted
      // token here already has (`soft`, `acFg12`, `deepFg25`).
      badge: rgba(ink, 0.11),
    }
  }
  // A package the artist added and left empty is not a package (JP-048): it is
  // dropped here, before the hue walk and `n`, on both surfaces, so the page is
  // exactly the page without it — the cards keep their hues, the chip row its
  // chips, and layout 3's FEATURED seat lands on the last real package.
  const tierList = (Array.isArray(c.tiers) ? c.tiers : TIERS).filter((t) => !blankRow(t, TIER_KEYS))
  vm.tiers = tierList.map((t, i) => {
    // §10.2 paints the three cards in three different palette hues rather than
    // one accent. Walking T.tags backwards from index 3 lands on olive, gold,
    // orange under Retro — the reference order — and stays in-palette elsewhere.
    const card = T.tags[((3 - i) % T.tags.length + T.tags.length) % T.tags.length]
    const tags = songTags(t?.tags)
    return {
      // `n` is the row's place in the WHOLE list, not on the filtered page. The
      // cards animate their background, so the renderer keys on it: a positional
      // key would let a filtered-out card's DOM node become its neighbour's and
      // cross-fade one card hue into another.
      n: i,
      name: String(t?.name ?? '').trim(), price: String(t?.price ?? '').trim(),
      blurb: String(t?.blurb ?? '').trim(),
      feats: tierFeats(t?.feats),
      // Raw casing, deliberately — the repertoire's rule: a lower-case theme
      // must not stop a chip from matching the tag it was derived from.
      tags,
      // The same tags, cased for printing. §10.2 layout 4 is the one design
      // that prints them *on* the package rather than deriving a filter row
      // from them, and `vm.tierChips` — the only other place they are ever
      // shown — is cased too. Composed here, since the renderer does no casing.
      tagLabels: tags.map(cased),
      ...tierHues(card),
    }
  })
  // §10.2 layout 4 draws a package's features as a wrapped row of coloured
  // chips rather than a ticked list, walking the palette's tags the way
  // `vm.chips` does — its construction exactly, except that a
  // seat is indexed by the feature's position rather than built per feature:
  // the hue belongs to the seat (the media player's fan rule), so editing one
  // line cannot reshuffle a package's colours. Retro's first four are the
  // frame's own four, in its own order. Two known collapses, both TagChips'
  // and neither worth fixing: Retro's gold takes the dark ink where the frame
  // sets cream, and on Lime, Grunge and Pop one tag IS the page ground, so a
  // chip in that seat draws its box invisible and only its label shows.
  vm.tierFeatSeats = T.tags.map((h) => ({ bg: h, fg: contrast(h) }))
  // §10.2 layout 2's single big plan. Its card is a fixed composition, not the
  // selected package's: the hue belongs to the seat, the media player's fan
  // rule, or the one card would recolour on every toggle — and it opens on
  // whichever hue package 0 happened to draw. T.tags[1] is Retro's burnt orange,
  // the frame's own card, and it is a *tag* hue rather than the accent so that
  // the Book pill standing on it still reads on the four undesigned templates,
  // whose BookPill branch paints `ac` on `acFg` and honours neither `bg` nor
  // `fg`. It is also what the card falls back to with no packages at all, so
  // the empty state and the filled one are the same composition.
  vm.tierHero = tierHues(T.tags[1 % T.tags.length])
  // §10.2 layout 3's rows are one hue doing two jobs: it outlines the plain
  // rows and fills the featured one, whose border is then that hue's own
  // second colour. Like `tierHero` it belongs to the seat and not to a
  // package — the frame paints its whole stack from `sem/stroke/2`, which
  // under Retro is T.tags[3], the olive.
  //
  // Unlike `tierHero` it has to read against the *page*, on both jobs: an
  // outline the ground swallows leaves the plain rows as loose type, and
  // a tag can BE the page ground (Grunge's fourth was its black, before its
  // Static Youth tokens left it two). So the walk starts at 3 and
  // takes the first tag that clears `tierHues`' own 0.22 — olive on Retro and
  // pale lime on Lime (both index 3), the stamp red on Grunge and the
  // terracotta on Editorial, whose index 3 is a wash only a shade off its
  // paper. `ac` is the last resort and no palette reaches it.
  const rowSeat = T.tags
    .map((_, i) => T.tags[(3 + i) % T.tags.length])
    .find((h) => Math.abs(lum(h) - lum(bg)) > 0.22) ?? ac
  vm.tierRow = tierHues(rowSeat)
  // The filter row above the cards, derived from the tags the artist typed the
  // way the repertoire's is — `label` cased for printing, `tag` raw for
  // comparing. It replaces TIER_MODES, which was a constant nothing could edit.
  vm.tierChips = repChips(tierList).map((ch) => ({ ...ch, label: cased(ch.label) }))

  // repertoire — the artist's own list, else the seeded one. The semantics are
  // `images`, not `image`: an emptied array is already distinguishable from an
  // absent key, so only an absent key falls back and no null sentinel is needed.
  // A row with nothing in it is dropped first (`blankRow()`, the JP-051 sweep),
  // or it would be an empty clickable row the heading's count claims as a song.
  const songList = (Array.isArray(c.songs) ? c.songs : SONGS).filter((t) => !blankRow(t, SONG_KEYS))
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
  // The generic flat list, for a layout past the two that are fitted. It has no
  // chip row, so its right-hand column takes the artist rather than a tag — but
  // it takes the artist's *songs*, so swapping layouts never silently discards
  // what they typed.
  vm.repFlat = vm.songs.map((t) => ({ t: t.title, g: t.artist }))
  vm.repHue = legible(T.tags[3 % T.tags.length])
  // The heading counts the list unless the artist has written their own, so it
  // cannot go on claiming 240 songs over a list of twelve. EditPanel resolves
  // the same fallback, or the panel and the canvas would disagree.
  if (cat === 'repertoire' && c.heading === undefined) vm.title = cased(`${vm.songs.length} Songs`)
  // Testimonials layout 2 heads the section with its frame's own two-line
  // display head; the other layouts keep the shared default. EditPanel mirrors
  // it. The stars sit in its card's corner.
  if (cat === 'testimonials' && d === 1 && c.heading === undefined) vm.title = cased(TESTI_HEADING_2)
  if (cat === 'calendar' && d === 2 && c.heading === undefined) vm.title = cased(CAL_HEADING_3)
  // Layout 4's heads, the composed page's own (QA, 2026-09-15). EditPanel
  // mirrors all four.
  if (d === 3 && c.heading === undefined && HEADING_4[cat]) vm.title = cased(HEADING_4[cat])
  // The widest word of the heading, in Bebas ems, after every fallback above.
  // Lime's layout-3 form sets Display/LG in a half column its longest word can
  // outrun at desktop, so it shrinks the head until that word fits rather than
  // break it (the nav's `navEms` rule). Undefined off Lime.
  vm.titleWordEms = T.name === 'Lime'
    ? +Math.max(0, ...vm.title.split(/\s+/).map(bebasEms)).toFixed(3)
    : undefined
  vm.testiStars = cv('stars', TESTI_STARS)
  // §10.2 layout 3 reads the same tags as a *grouping* rather than as a filter:
  // one card per tag, holding the songs that carry it. `repChips` leads with the
  // All chip, which is a filter reset and not a set, so the cards are the chips
  // behind it — the seeded three tags are the frame's own three cards.
  //
  // A song the artist tagged with nothing would then appear in no card at all,
  // and `repFlat`'s note above is this section's standing promise that swapping
  // layouts never silently discards what they typed. So the All card is
  // appended — holding the whole list, so its label stays honest — exactly when
  // the tag cards do not already reach every song. On a fully-tagged page it is
  // not drawn and nothing is duplicated; that is why it is the remainder at the
  // end rather than the reset at the front.
  const setHue = (i) => {
    // The frame paints its three cards near-black, olive and rust and sets cream
    // type on all three — so the pool is the tag hues dark enough to carry that
    // cream, and walking it backwards lands on exactly those three under Retro
    // (#111111, #5B5E2E, #C8461C). Derived rather than listed: a palette with
    // two dark tags gets two and cycles, and one with none falls back to the
    // whole row, where `tierHues` picks each card's ink for itself.
    const dark = T.tags.filter((h) => contrast(h) !== '#141414')
    const pool = dark.length ? dark : T.tags
    return pool[((pool.length - 1 - i) % pool.length + pool.length) % pool.length]
  }
  const repSet = (tag, songs, i) => {
    // `tierHues` is the pricing deck's, and it is exactly this card's pairing:
    // `cardFg` is the cream the frame sets on all three, and `acc` is the
    // mustard of the meta line, already guarded for a palette where the two
    // hues do not separate.
    const hues = tierHues(setHue(i))
    return {
      label: cased(tag),
      songs,
      // "6 SONGS", where the frame's meta reads "MELLOW · 45 MIN": the mood IS
      // the card's own title here, and a running time is a number the artist
      // never typed (the video section's rule). Composed here because
      // EncoreSection composes nothing; the caps are a style, not casing.
      meta: `${songs.length} ${songs.length === 1 ? 'song' : 'songs'}`,
      // The card's outline and the rule under every row. The frame draws #111
      // on the olive and rust cards and the cream on the near-black one, which
      // is `tierHues`' own accHue shape: the palette's darkest tag, unless the
      // card already IS it. It is what keeps the card visible on Lime and
      // Grunge, whose darkest tag is the page ground itself.
      edge: hues.card === vm.deep ? vm.paper : vm.deep,
      ...hues,
    }
  }
  const tagSets = vm.repChips.slice(1).map((ch, i) => repSet(
    ch.tag,
    vm.songs.filter((sg) => sg.tags.some((t) => t.toLowerCase() === ch.tag.toLowerCase())),
    i,
  ))
  const reached = new Set()
  tagSets.forEach((st) => st.songs.forEach((sg) => reached.add(sg.n)))
  vm.repSets = reached.size >= vm.songs.length
    ? tagSets
    : [...tagSets, repSet(REP_ALL, vm.songs, tagSets.length)]
  // §10.2 layout 4 reads the same songs as an *index* rather than as a filter or
  // a grouping: one group per distinct first letter of a title, the songs sorted
  // inside it and the groups in the order those sorted songs first appear — so
  // the section looks a list up rather than sorting one, the calendar's
  // one-composed-line-per-cell rule. The letter is upper-cased because the rail
  // it lights is; a title starting with a digit or a symbol takes `#`, which
  // heads its own group in the list and lights nothing, the frames' rail being a
  // fixed A–Z that no content can extend. An accent is decomposed first so that
  // "Édith Piaf" files under E rather than heading a group of its own beside it
  // — the sort already folds the two at `sensitivity: 'base'`, and the grouping
  // has to agree with the sort or the list reads as two Es.
  const byLetter = new Map()
  ;[...vm.songs]
    .sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }))
    .forEach((sg) => {
      const l = (sg.title.normalize('NFD').charAt(0) || '#').toUpperCase()
      if (!byLetter.has(l)) byLetter.set(l, [])
      byLetter.get(l).push(sg)
    })
  vm.repGroups = [...byLetter].map(([letter, songs]) => ({ letter, songs }))
  // The rounded panel layout 4 stands its list on — the olive band lifted a
  // register, which is exactly `mapBg`'s own relationship to `deep` and lands
  // within a point of Retro's own #6D7040-on-#5B5E2E (contrast 1.31 against
  // 1.20–1.41 across the flat four). The Figma panel's fill is bound to no
  // token at all, so there was nothing to resolve: it is read off the node.
  vm.repPanel = mix(vm.mapBg, vm.mapFg, 0.11)

  // gallery
  vm.gal = ['01', '02', '03', '04', '05', '06']
  vm.gal4 = vm.gal.slice(0, 4)
  // Tag order per the Figma gallery frame: Gallery/YouTube/Instagram/TikTok
  // tiles read accent-red, olive, purple, yellow — tags 1, 3, 0, 2 in Retro.
  //
  // `url` is the row's outbound address, and only the three social rows have a
  // key to read: the first row is the page's own strip, which the arrows and
  // the thumbnails already navigate. Normalised through extUrl for the same
  // <base href> reason as the Soundcloud button, and an empty field leaves the
  // row a picture rather than a dead link.
  vm.gallerySources = GALLERY_SOURCES.map((g, i) => {
    const cbg = T.tags[[1, 3, 0, 2][i] % T.tags.length]
    return {
      label: cased(g.l), bg: cbg, fg: contrast(cbg), ink: legible(cbg), on: i === 0,
      url: g.k ? extUrl(cv(g.k, '')) : '',
    }
  })

  // §10.2 scheduler — CAL_SPAN months of grid, resolved here so that
  // EncoreSection does no date arithmetic: it turns a page of this window and
  // prints the line it finds on a cell, the way it draws the pin sectionVm
  // paired with a gig rather than working one out.
  //
  // The whole section is built from one date. `open` names the month the grid
  // opens on *and* the day it opens picked; a field that is empty, half-typed
  // or impossible (31 June) parses to null and falls back to the seed, so the
  // calendar can never open on a month the artist did not choose.
  //
  // The published tab also knows what day it is (F20), and so does BookedField,
  // which pages the window this computes. `today` is an ISO
  // date PublishedPage reads off the clock once, and it is honoured only when
  // `live`, so the canvas never reads the clock and stays the reference frame's
  // June. With it, every day before today is **dead** — a flag beside `booked`
  // that the section tests as the same `hit`, drawn as a booked day without the
  // strike — a cued `open` in the past cues nothing, and a past `open` month
  // gives way to today's as the first month of the window.
  if (cat === 'calendar') {
    const open = parseDate(cv('open', CAL_OPEN)) ?? parseDate(CAL_OPEN)
    // Absent and emptied both mean none: there is no seeded booking to lose, so
    // this follows the gallery's social addresses rather than the songs' rule.
    const booked = new Set(Array.isArray(c.booked) ? c.booked : CAL_BOOKED)
    const time = cv('time', CAL_TIME)
    const now = live ? parseDate(today) : null
    // ISO dates compare as strings, so "before today" needs no Date.
    const nowIso = now ? isoDate(now.y, now.m, now.d) : ''
    const dead = (iso) => !!nowIso && !!iso && iso < nowIso
    const openIso = isoDate(open.y, open.m, open.d)
    // max(open, today), by month: CAL_SPAN counts from whichever is later.
    const start = calStart(open, live ? today : null)

    vm.calMonths = Array.from({ length: CAL_SPAN }, (_, i) => {
      const m = start.m + i
      const y = start.y + Math.floor(m / 12)
      const mo = ((m % 12) + 12) % 12
      const { lead, length } = monthSpan(y, mo)
      // Lead blanks are `{ d: '' }` — the cell renderer's own test for the
      // borderless, inert cell it has always drawn. The grid is not padded out
      // to five rows: a month that needs six simply grows one, and the
      // polaroids beside it take their height from the row (see `stack`).
      const cells = Array.from({ length: lead }, () => ({ d: '' }))
      for (let d = 1; d <= length; d++) {
        const iso = isoDate(y, mo, d)
        const gone = dead(iso)
        cells.push({
          d, iso, booked: booked.has(iso), dead: gone,
          // Composed per cell rather than on the pick, because the line is what
          // the foot prints and EncoreSection composes nothing. A dead day has
          // none: nobody can enquire about a date that has passed.
          line: gone ? '' : enquiryLine(y, mo, d, time),
          // Layout 3's pill, which its frame labels with the date alone
          // ("Enquiry About June 11") where the other layouts print the line.
          short: gone ? '' : `Enquiry About ${MONTHS[mo]} ${d}`,
        })
      }
      // `label` is the one line layouts 1 draws; layout 3's head columns the
      // same month apart — "JUNE" in the display face over "2025" in the body
      // one — so the two halves are resolved here rather than split out of the
      // label in EncoreSection. A date format, not artist copy, so the name is
      // upper-cased here rather than through cased() (vm.calSlots[].mark's
      // rule).
      return { label: cased(monthLabel(y, mo)), name: MONTHS[mo].toUpperCase(), year: String(y), cells }
    })
    vm.calDays = CAL_DAYS
    // The day the calendar is cued to, which is what the foot prints and the
    // grid lights until the visitor picks something — the media player's card
    // naming track one while `cur` is still -1. A booked opening day cues
    // nothing: the artist blocked it, and the section does not quietly slide
    // the pick sideways to the day after.
    // Off the *parsed* date, not the raw field: an unparseable `open` falls back
    // to CAL_OPEN above, and testing the field would then cue a June 12 the
    // artist has blocked — lit and struck through at once. A cue that has
    // passed cues nothing either, and the foot prints the prompt.
    vm.calPick = booked.has(openIso) || dead(openIso) ? '' : openIso
    vm.calPrompt = cased('Pick a date to enquire')
    // Layout 1's pill. Layout 4's foot is the wizard's own Send Enquiry since
    // JP-052, so this reaches one layout.
    vm.calCta = cased(cv('cta', 'Check a date'))
    // Layout 2's pill, which its frame labels differently from the other two
    // calendar pills (its "Star Enquiry" read as the intended "Start").
    vm.calSlotCta = cased(cv('slotCta', CAL_SLOT_CTA))
    // Layout 4's enquiry wizard (QA, 2026-09-15). Step 1 is the frame's
    // (964:72843); the frame draws no step 2 or 3, so their boxes are what the
    // summary card beside it labels (Details) and a way to answer (Contact).
    // Every string is resolved here, cased, so EncoreSection composes nothing.
    //
    // JP-052: the column beside the wizard is the wizard's **summary** — the
    // frame's card is step 1's type over step 2's four answers (964:72939,
    // Retro's 964:72844), then a date card, then a package card. Each step-2
    // box therefore carries `eg` beside `ph`: the frame's own bare example,
    // which the canvas's summary prints where a visitor's answer would stand
    // (the frame is a picture of a filled-in wizard). Live, an unanswered cell
    // prints `ph`, "e.g." and all, at the placeholder's strength — so nothing
    // on the published page can be read as a quote the artist never gave.
    vm.calTypes = songTags(cv('types', CAL_TYPES.join(', '))).map((l) => cased(l))
    const wizSteps = [
      ['Event', "What's the occasion?", []],
      ['Details', 'Tell us the details', [
        ['guests', 'Guests', 'e.g. 120', '120'], ['length', 'Set length', 'e.g. 4 hrs', '4 hrs'],
        ['budget', 'Budget', 'e.g. £1,200', '£1,200'], ['sound', 'Sound', 'Provided or needed', 'Provided'],
      ]],
      ['Contact', 'How do we reach you?', [
        ['name', 'Name', 'Your name'], ['email', 'Email', 'you@example.com'],
      ]],
    ]
    // The date card's one input is the visitor's typed date, so it is a
    // closure, the enquiry form's `formMailto` rule: its argument is the
    // keystrokes and everything else — the parse, the booked and past tests,
    // the format and every string — is bound here. With nothing typed the card
    // shows the section's cue (`calPick`: `open`, or nothing when that day is
    // booked or past), which is what keeps the canvas the frame's picture and
    // lets *Opens on* move it. `refused` is a date the visitor cannot have.
    const dateCard = (at) => ({
      mark: cased(`${CAL_DAYS[weekdayOf(at.y, at.m, at.d)]}, ${MONTHS[at.m]} ${at.d}`),
      sub: String(at.y), time: String(time ?? '').trim(), refused: false,
    })
    const cue = parseDate(vm.calPick)
    const taken = cased('Not available. Pick another date')
    const badDate = cased('Type the date as dd / mm / yyyy')
    vm.calWizard = {
      steps: wizSteps.map(([name, title, boxes], i) => ({
        name: cased(name), title: cased(title), line: cased(`Step ${i + 1} of ${wizSteps.length}`),
        boxes: boxes.map(([key, label, ph, eg]) => ({ key, label: cased(label), ph, eg: eg ?? ph })),
      })),
      typesLabel: cased('Type of event'),
      date: { key: 'date', label: cased('Approx. date'), ph: 'dd / mm / yyyy' },
      back: cased('Back'), next: cased('Next Step'), send: cased('Send Enquiry'),
      // The package card's control, the frame's "Package ›" — the chevron is
      // the frame's glyph, not a composed separator.
      pkg: `${cased('Package')} ›`,
      dateOf: (raw) => {
        if (!String(raw ?? '').trim()) {
          return cue ? dateCard(cue) : { mark: '', sub: vm.calPrompt, time: '', refused: false }
        }
        const at = parseDayFirst(raw)
        if (!at) return { mark: '', sub: badDate, time: '', refused: true }
        const iso = isoDate(at.y, at.m, at.d)
        return booked.has(iso) || dead(iso)
          ? { ...dateCard(at), sub: taken, time: '', refused: true }
          : dateCard(at)
      },
    }
    // The package card's list: the Pricing section's packages, read across
    // sections through sectionVm's `tiers` argument (pageTiers, the
    // `identity` precedent), so the price is always the artist's own. Empty
    // with no pricing section on the page, and the card is then not drawn.
    vm.calPackages = tiers.map((t) => ({
      name: cased(String(t?.name ?? '').trim()), price: String(t?.price ?? '').trim(),
    }))
    // JP-053 — Send Enquiry mails the wizard's answers, as the enquiry form's
    // submit does, to the form's own address: read across sections through
    // sectionVm's `email` argument (pageEmail(), `tiers`' precedent), '' with
    // no form section or an address emailAddr() refuses, which leaves both
    // Send pills spans — the form's no-address state. The confirmation that
    // replaces the wizard card prints it in plain text, the form's rule.
    vm.calEmail = email
    Object.assign(vm.calWizard, {
      sentTitle: cased('Check your mail app'),
      sentBody: 'Your enquiry should be open in it, ready to send. If nothing happened, write to:',
      again: 'Start again',
      prompt: 'Add your name and a valid email, then send again.',
    })
    // The wizard's two closures beside `dateOf`, and the form's formMailto /
    // formCheck rule: their inputs are the visitor's keystrokes, so
    // EncoreSection hands over the type's and the package's indexes and the
    // raw box values, and gets an href and a verdict back. The body's labels
    // are the raw ones (`wizSteps`' own), not the cased ones the wizard
    // prints — the form's labels stay raw for the same reason, the body wants
    // them as written — and so is the package, read off `tiers` rather than
    // the cased card. The date goes as typed: it is the visitor's own words,
    // and the date card has already said whether the artist can take it.
    const wizBoxes = wizSteps.flatMap(([, , boxes]) => boxes)
    const rawPkg = (pi) => {
      const t = tiers.length ? tiers[((pi % tiers.length) + tiers.length) % tiers.length] : null
      return t ? [t.name, t.price].map((x) => String(x ?? '').trim()).filter(Boolean).join(' · ') : ''
    }
    vm.calMailto = ({ ti, vals, pi }) => enquiryMailto(email, {
      type: vm.calTypes[ti] ?? '',
      fields: [
        { label: 'Approx. date', value: (vals || {}).date },
        ...wizBoxes.slice(0, 4).map(([key, label]) => ({ label, value: (vals || {})[key] })),
        { label: 'Package', value: rawPkg(pi) },
        ...wizBoxes.slice(4).map(([key, label]) => ({ label, value: (vals || {})[key] })),
      ],
    })
    // Step 3's two boxes, by formErrors()' rules — the name required, the
    // email required and checked by emailProblem() — keyed by box so the
    // section can mark them without working anything out.
    vm.calCheck = ({ vals }) => {
      const { f, any } = formErrors([{ kind: 'text' }, { kind: 'email' }], [(vals || {}).name, (vals || {}).email])
      return { f: { name: f[0], email: f[1] }, any }
    }
    // The bare hour, beside the composed lines that already carry it: layout
    // 4's date card prints it on its own. Raw rather than cased: it is a clock
    // format, vm.calSlots[].mark's rule.
    vm.calTime = time

    // §10.2 layout 2 — the named slots, which it tables (layout 4 stacked them
    // too until JP-052). The rows are the artist's named slots (SlotsField),
    // resolved by the `songs` rule: absent means the seed, an emptied array
    // means none, and there is no null sentinel. The seed is dated from `open`,
    // or live from max(open, today) by day — slotSeed(), layout 1's F20 rule —
    // and a blank row is not a row (JP-051's pattern). Everything
    // the row prints is composed here, the way every cell above carries its own
    // enquiry line — EncoreSection looks a row up rather than working a date
    // out. `booked` reaches the list too: a slot the artist has blocked is a
    // dead row, which is the one field that ties the two layouts together —
    // and live, so does a slot that has passed (`dead`, above).
    //
    // A row whose date does not parse keeps its place and simply does not pick,
    // §4.3a's rule for a link whose target is missing; it cannot happen from
    // the seed.
    const slotBase = nowIso && openIso < nowIso ? now : open
    const slots = (Array.isArray(c.slots) ? c.slots : slotSeed(slotBase)).filter((sl) => !blankRow(sl, SLOT_KEYS))
    vm.calSlots = slots.map((sl) => {
      const at = parseDate(sl.date)
      const iso = at ? isoDate(at.y, at.m, at.d) : ''
      return {
        iso,
        // A date format, not artist copy, so it is upper-cased here rather than
        // through cased(): "JUN 12", "JUL 05".
        mark: at ? `${MONTHS[at.m].slice(0, 3).toUpperCase()} ${String(at.d).padStart(2, '0')}` : '',
        day: at ? DAY_FULL[weekdayOf(at.y, at.m, at.d)] : '',
        kind: cased(sl.kind ?? ''),
        price: sl.price ?? '',
        booked: iso ? booked.has(iso) : false,
        // A slot that has passed, live only — the cells' `dead`.
        dead: dead(iso),
        // Layout 2's foot line when this slot is picked — the frame's own
        // "Thursday evening selected", the weekday and the slot's kind. The raw
        // kind, since `kind` above is already cased and cased() runs once here.
        line: at && !dead(iso)
          ? cased(`${[DAY_FULL[weekdayOf(at.y, at.m, at.d)], String(sl.kind ?? '').trim().toLowerCase()]
            .filter(Boolean).join(' ')} selected`)
          : '',
      }
    })
    // The head's link list. The frame draws three — the section itself, marked
    // with a dot, then packages and enquiries — which is CTA_TARGETS.book
    // resolved against the page, the footer's rule for a link column rather
    // than an invented nav. The current section leads and does not link to
    // itself; a page carrying neither of the other two is left with one entry,
    // which still reads as the head's own label.
    // The words are the header nav's (`navLabel()`, JP-033) — "Availability ·
    // Pricing · Enquiries" on the seed — where the frame's flow has a vocabulary
    // of its own, "Available dates · Packages · Enquire": one word per section
    // across the page outranks a second set nothing else prints.
    const flow = navSections.filter((n) => CTA_TARGETS.book.includes(n.cat))
    vm.calFlow = [
      ...flow.filter((n) => n.cat === 'calendar'),
      ...flow.filter((n) => n.cat !== 'calendar'),
    ].map((n) => ({
      label: cased(n.label), to: n.cat === 'calendar' ? undefined : n.cat,
      on: n.cat === 'calendar',
    }))
    // `bookTo` minus `calendar` itself — the tier pills' rule, and for the same
    // reason: CTA_TARGETS.book ends at this section, so the pill would otherwise
    // scroll the visitor to the panel they are already reading. With neither a
    // form nor a pricing section on the page it resolves to nothing and BookPill
    // stays a span.
    vm.calBookTo = firstPresent(CTA_TARGETS.book.filter((x) => x !== 'calendar'), navSections)
  }
  // The tour-date rows of the calendar's unreachable fallthrough after layout 4. It sat under `map` for
  // years on the strength of its name; nothing in the events map reads it.
  vm.cities = CITIES

  // map
  //
  // `pins` is the raw five positions, which layout 4 draws whole — five seats
  // over any number of gigs, the one on show lit by identity. The other
  // layouts pair instead: every gig below carries the pin it lights.
  vm.pins = PINS
  // The events map renders on `mapBg` for Retro rather than the page background,
  // so a row hue has to separate from that charcoal — Retro's near-black tag reads
  // fine on sand and disappears on the dark. Fall back to the cream, as §10.2 does.
  // `v0` too, matching the section root's own `darkMap`: the gig rows only render
  // in that layout, and the flat one keeps the page's ground. Retro's alone: Lime's
  // map frame stands on a *light* band (Scheme 4), not a lifted charcoal.
  const gigDark = cat === 'map' && vm.v0 && T.name === 'Retro'
  const gigGround = gigDark ? vm.mapBg : bg
  const gigFallback = gigDark ? vm.mapFg : tx
  // The gig list follows `songs`, not `tracks`: one key, one shape. An absent
  // key means the seeded GIGS, an emptied array means no gigs, and there is no
  // null sentinel. Venue and city are *not* put through cased() — the seeds are
  // deliberately mixed-case ("Private wedding", "Lake District") and the
  // renderer sets the venue in the display face without a transform.
  //
  // Two things are resolved here rather than in EncoreSection, which does no
  // maths of its own: `url`, the row's tickets link, normalised through extUrl
  // for the same <base href> reason as the Soundcloud button — a schemeless
  // address would resolve against the builder; and `pin`, the position this gig
  // lights on the map, paired by index because PINS is a fixed five over a fixed
  // raster. The hue is computed over the *whole* list, never a page of it, or a
  // gig would change colour as the pager turned.
  //
  // A gig with nothing in it is dropped first (`blankRow()`, the JP-051 sweep),
  // so the pins, the hues, the pager and the chips all follow the rendered
  // list: otherwise it is a blank row that lights a pin.
  const gigList = (Array.isArray(c.gigs) ? c.gigs : GIGS).filter((g) => !blankRow(g, GIG_KEYS))
  vm.gigs = gigList.map((g, i) => {
    const h = T.tags[i % T.tags.length]
    return {
      venue: g?.venue ?? '', city: g?.city ?? '', time: g?.time ?? '',
      month: g?.month ?? '', day: g?.day ?? '',
      url: extUrl(g?.link ?? ''),
      // Layout 2's Get Directions pill, a route to the venue.
      directions: directionsUrl(g?.venue, g?.city),
      // Layout 2's card chip: when the featured gig is, which the frame's stat
      // row printed until it took the frame's own three cells back.
      when: [`${g?.month ?? ''} ${g?.day ?? ''}`.trim(), String(g?.time ?? '').trim()]
        .filter(Boolean).join(' · '),
      pin: PINS[i % PINS.length],
      // Layout 4's ticker prints the gig on one line — "Manchester · Jul 12 ·
      // 22:00", the frame's own second line — and every one of those three is
      // emptiable, so it is composed here rather than joined in the section:
      // the testimonials' `byline` rule, or an artist who leaves the time off
      // (which `LIST.map` does every fourth row) would publish a trailing
      // separator. The month and day stay as they were typed, like the venue
      // and the city above them; the frame's own "JUL 12" is its styling.
      meta: [String(g?.city ?? '').trim(),
             `${g?.month ?? ''} ${g?.day ?? ''}`.trim(),
             String(g?.time ?? '').trim()].filter(Boolean).join(' · '),
      // What layout 3's chip row matches a row against. Case-folded here rather
      // than in EncoreSection, and beside the label it was folded from, so a
      // theme that upper-cases the chip cannot stop it matching its own gigs —
      // `vm.songs.tags`' rule exactly.
      cityKey: String(g?.city ?? '').trim().toLowerCase(),
      hue: Math.abs(lum(h) - lum(gigGround)) > 0.22 ? h : gigFallback,
    }
  })
  // §10.2 layout 3's filter row, derived from the gigs' own cities the way
  // `repChips` derives the repertoire's from the songs' tags — one chip per
  // distinct city with the number of shows in it, behind the same All reset.
  // The frame's own row is All / Upcoming · 5 / Past · 3 / Filter ↓, and every
  // one of those is a status the section cannot know (nothing here reads the
  // clock) or a control with nothing to open; the city is what the heading
  // "Where I'm playing." is actually about, and it is the artist's own typing.
  //
  // Deduped case-insensitively, keeping the casing it was first typed in, and
  // **not built at one city**: a row of All plus one chip filters to the same
  // list twice, which is the pager's and the pricing chip row's rule — a
  // distinction that distinguishes nothing is not a design. A gig with no city
  // joins no chip and is reachable under All alone, `repFlat`'s promise.
  const gigCities = new Map()
  gigList.forEach((g) => {
    const label = String(g?.city ?? '').trim()
    if (!label) return
    const k = label.toLowerCase()
    if (!gigCities.has(k)) gigCities.set(k, { label, city: k, n: 0 })
    gigCities.get(k).n += 1
  })
  vm.gigChips = gigCities.size > 1
    ? [{ label: cased(REP_ALL), city: null, n: vm.gigs.length },
       ...[...gigCities.values()].map((ch) => ({ ...ch, label: cased(ch.label) }))]
    : []
  // Layout 4's CITIES stat: the same distinct cities the chip row above is
  // built from, counted rather than listed, and read straight off the map that
  // already deduped them case-insensitively. It is here and not in the section
  // because a Set is maths — `s.gigs.length` beside it is not, which is why
  // only one of the dashboard's two derived numerals needed a key. Unlike
  // `gigChips` it is *not* suppressed below two cities: a stat that reads "1 /
  // CITIES" is a fact, where a filter row of All plus one chip is a
  // distinction that distinguishes nothing.
  vm.gigCityCount = gigCities.size
  // Gigs to a page in the compact tile. It is PINS.length rather than a literal
  // five: a page's worth of gigs is what one set of distinct pin positions can
  // light, so the two counts have to move together.
  vm.gigPage = PINS.length
  vm.mapRadius = cv('radius', MAP_RADIUS)
  vm.mapBase = cv('base', MAP_BASE)
  vm.mapTerms = cv('terms', MAP_TERMS)
  vm.mapTravelTime = cv('travelTime', MAP_TRAVEL_TIME)
  vm.mapFee = cv('fee', MAP_FEE)
  // Layout 3's map panel copy — the frame's own, seeded and emptiable (QA,
  // 2026-09-15). The ring labels run inner ring first.
  vm.mapStatus = cv('status', MAP_STATUS)
  vm.mapUpdated = cv('updated', MAP_UPDATED)
  vm.mapRings = String(cv('rings', MAP_RINGS) ?? '').split(',').map((x) => x.trim()).filter(Boolean)
  vm.mapExpand = cv('expand', MAP_EXPAND)
  // Layout 4's panel note beside "Travel & reach", the frame's own copy (QA,
  // 2026-09-15). Emptiable.
  vm.mapSpan = cv('span', MAP_SPAN)
  // Layout 3's foot pill. Uncased, the footer's rule: the pill has always drawn
  // an uncased label and casing it would shout on Pop.
  vm.mapCta = cv('cta', 'See all gigs')

  // testimonials — the songs rule, the gigs' and the packages': an absent key
  // means the seeded QUOTES, an emptied array means no reviews at all, and
  // there is no null sentinel. It was three flat keys over a fixed three rows,
  // which reached one review and could not add a fourth.
  // A review with nothing in it is dropped first (`blankRow()`, the JP-051
  // sweep): it would page to an empty card, add a numbered tile to layout 2's
  // rail and an empty cell — counted in the stat — to layout 3's wall.
  const quoteList = (Array.isArray(c.quotes) ? c.quotes : QUOTES).filter((r) => !blankRow(r, QUOTE_KEYS))
  vm.quotes = quoteList.map((r, i) => {
    const who = String(r?.who ?? '').trim()
    const role = String(r?.role ?? '').trim()
    return {
      // Cased, as the featured quote always was — but now every row rather than
      // only the first, which is what closes the three-up layout's old seam.
      quote: cased(String(r?.quote ?? '').trim()),
      who,
      role,
      when: String(r?.when ?? '').trim(),
      // The attribution is composed here and never in EncoreSection: with both
      // halves editable, joining them there prints a bare separator the moment
      // one is emptied. The calendar's one-composed-line-per-cell rule.
      byline: [who, role].filter(Boolean).join(' · '),
      // Layout 2's selector tile, composed here for the same reason: the
      // reviewer's initials, or the row's own number when the name is empty,
      // since a rail of blank tiles cannot be picked from. Punctuation is
      // spaced out first — `initialsOf` splits on whitespace alone, and the
      // frame's own "Sarah & Tom" would otherwise mark the tile "S&".
      mark: initialsOf(who.replace(/[^\p{L}\p{N}\s]/gu, ' ')) || String(i + 1),
    }
  })
  // Layout 2 is the first design to head this section — layout 1 is the card
  // alone — so both of these reach it and nothing else, the way FIELDS.form's
  // stage photo reaches one layout. The line is prose and stays uncased; the pill
  // keeps the uncased label every other Book Now on the page draws.
  vm.testiSub = cv('sub', DEFS.testiSub)
  vm.testiCta = cv('cta', 'Book Now')

  // form
  vm.formPara = cv('para', DEFS.formPara)
  // Layout 2's stage photograph, and the third single-photo slot in the file
  // after `image` and `avatar`. It is a slot of its own for the reason the
  // header's two are: this section's `image` is
  // *already* the artist — RETRO_PHOTOS.form is the portrait crop, and layout 1
  // draws it as the 48px circle beside the brand — so the scene above the
  // heading cannot share the key without changing what layout 1 renders. Same
  // three states as vm.image: absent → the seed, null → the placeholder,
  // string → an upload.
  vm.formPhoto = c.photo !== undefined ? (c.photo ?? undefined) : defaultImage(cat, T.name, 'photo')
  // The address every enquiry is mailed to, and the whole of this section's
  // live seam. It was a field that edited nothing until the submit was made
  // real — cta's and para's state on the booking calendar before it. One
  // emailAddr() refuses folds to '' (JP-049), the empty address's own state, so
  // the submit stays a span on both surfaces and the confirmation panel can
  // never print it; a pasted mailto: is taken off.
  vm.formEmail = emailAddr(cv('email', FORM_EMAIL))
  // Layout 4's frame types "Check Availability" (JP-054); EditPanel mirrors it.
  vm.formBtn = cv('button', d === 3 ? FORM_BTN_4 : 'Book Now')
  // Layout 4's small-caps line under the head, the frame's "Enquire". Emptied,
  // the line drops.
  vm.formSub = cv('sub', FORM_SUB_4)
  // Layout 2's card: its price row, bookings line, submit label and the line
  // under it, each seeded with the frame's copy. The label is the submit, so an
  // emptied one falls back to `button` rather than leaving a wordless pill.
  vm.formPrice = cv('price', FORM_PRICE)
  vm.formPriceUnit = cv('priceUnit', FORM_PRICE_UNIT)
  vm.formBookings = cv('bookings', FORM_BOOKINGS)
  vm.formCta = cv('cta', FORM_CTA) || vm.formBtn
  vm.formNote = cv('note', FORM_NOTE)
  // Layout 3's eyebrow, the frame's own copy, seeded and emptiable (QA, 2026-09-15).
  vm.formAvailable = cv('available', FORM_AVAILABLE)
  vm.formPromises = tierFeats(cv('promises', FORM_PROMISES.join('\n')))
  // The same promises again, numbered, which is §10.2 layout 4's right-hand
  // column: its frame draws 01 / 02 / 03 discs beside three lines whose second
  // row reads "Reply within 24 hrs" — FORM_PROMISES[0] almost verbatim, so the
  // column is already in the promises' own register. The numeral is composed
  // here for `vm.tracks[].n`'s reason: the renderer prints strings and pads
  // nothing. The frame's second line per row has no seat — a promise is one
  // string, and a gloss for it would be a claim the artist never typed.
  vm.formSteps = vm.formPromises.map((p, i) => ({
    n: String(i + 1).padStart(2, '0'), label: p,
  }))
  // That column's own head. A literal the view-model owns, `formTypeLabel`'s
  // rule, upper-cased by the renderer's display face rather than here.
  vm.formStepsLabel = 'What happens next'
  // §10.2 layout 4 outlines every box and rules every step row in one hue, and
  // the frame's `sem/stroke/2` #5B5E2E is `vm.tierRow.card` exactly — the
  // pricing stack's own seat, the first palette tag that clears `tierHues`'
  // 0.22 against the page ground. Taken rather than derived a second time
  // because the job is the same one that walk was written for: a line or an
  // outline that has to read against the *page*, where a tag can be the page
  // ground itself and Retro's is the olive the frame binds.
  vm.formRule = vm.tierRow.card
  // The boxes are the artist's now, on the `songs` rule — absent key means the
  // seed, emptied array means none, no null sentinel. Every row is normalised
  // here so EncoreSection can switch on `kind` without a default of its own;
  // anything unrecognised is a text box.
  //
  // A box with neither a label nor a placeholder names nothing and would still
  // be required, so it is dropped here, on both surfaces, before anything
  // indexes the list (JP-051, `blankRow()` — JP-048's filter-first order), which
  // keeps formRows, formMailto and formCheck index-aligned. The exception comes
  // first: the guarded email row — FormFieldsField's `lastEmail`, the same test
  // over the same raw list — never drops, and an emptied label reads Email.
  const formList = Array.isArray(c.fields) ? c.fields : FORM_FIELDS
  const formEmails = formList.filter((f) => f?.kind === 'email').length
  const formGuarded = (f) => f?.kind === 'email' && formEmails === 1
  vm.formFields = formList.filter((f) => formGuarded(f) || !blankRow(f, FORM_FIELD_KEYS)).map((f) => ({
    label: String((f && f.label) ?? '').trim() || (formGuarded(f) ? FORM_EMAIL_LABEL : ''),
    placeholder: String((f && f.placeholder) ?? '').trim(),
    kind: (f && (f.kind === 'email' || f.kind === 'number')) ? f.kind : 'text',
  }))
  // Two to a row, paired HERE rather than in EncoreSection, which does no
  // maths — the gigs' pin rule. It is not decoration: all three §10.2 frames
  // space the two fields *inside* a row by 12 (10 on the 390 one) and the rows
  // themselves by the panel's own 14, which one auto-flowing grid cannot
  // express, having a single rowGap. An odd count trails one half-width cell,
  // the pricing deck's rule — three columns stay three columns.
  vm.formRows = vm.formFields.reduce(
    (rows, f, i) => (i % 2 ? rows[rows.length - 1].push(f) : rows.push([f]), rows), [])
  vm.formTypes = songTags(cv('types', FORM_TYPES.join(', '))).map((l) => cased(l))
  vm.formMessage = cv('message', FORM_MESSAGE)
  // The two labels the frame prints over its controls, and the four lines the
  // live form needs. Literals the view-model owns, vm.calPrompt's rule, so the
  // section looks them up rather than writing copy of its own. The two control
  // labels stay raw — the render uppercases them in CSS, and the mailto body
  // wants them as written.
  vm.formTypeLabel = 'Event type'
  vm.formMsgLabel = 'Message'
  vm.formPrompt = 'Add the missing details and try again.'
  vm.formSentTitle = cased('Check your mail app')
  vm.formSentBody = 'Your enquiry should be open in it, ready to send. If nothing happened, write to:'
  vm.formAgain = 'Write another'
  // Two of the view-model's five function-valued keys — the calendar's
  // layout-4 wizard carries the other three (`calWizard.dateOf`, `calMailto`,
  // `calCheck`) — and they are here for the reason enquiryLine() is not: their inputs are the visitor's
  // keystrokes, which sectionVm never sees, so neither can be resolved to a
  // string ahead of time. EncoreSection hands over indexes and raw strings and
  // gets an href and a verdict back — every label, address and case decision
  // is still bound in here, so the renderer composes nothing. Nothing
  // stringifies or clones a vm, so a function on it is safe.
  vm.formMailto = ({ vals, ti, msg }) => enquiryMailto(vm.formEmail, {
    type: vm.formTypes[ti] ?? '',
    fields: vm.formFields.map((f, i) => ({ label: f.label, value: (vals || [])[i] })),
    message: msg,
    msgLabel: vm.formMsgLabel,
  })
  vm.formCheck = ({ vals }) => formErrors(vm.formFields, vals)

  // footer
  vm.copyright = cv('copyright', copyrightOf(artistName))
  // The §10.2 footer frames break this line by hand after "make" and let the
  // measure fold the rest — that is what sets the three-line block the left
  // column is built round, and it does not fall out of the measure alone in a
  // display face narrower than the frame's. Kept in step with FIELDS.footer's
  // own default, and rendered `pre-wrap` so an edited statement can break too.
  vm.footerStatement = cased(cv('statement', FOOTER_STATEMENT))
  // The sitemap is the artist's now, so a row carries where it goes as well as
  // what it says — and it goes to one of two kinds of place, which is BookPill's
  // own `ext ? … : to` seam moved down to the row. 'link' takes the row's own
  // address through extUrl(), the normalisation living here and never in the
  // renderer (the gigs' rule); anything else is a section id, resolved against
  // the page the way firstPresent resolves the header's. A target the page does
  // not carry — a section deleted after the link was written, or the whole of
  // BLANK_PAGE — resolves to undefined rather than to a dead fragment.
  //
  // What happens then depends on the surface (§4.3a). The canvas keeps the row,
  // so the artist still sees the label they wrote and LinksField can say why it
  // goes nowhere. The published page leaves it out: a visitor gains nothing
  // from a word that does not link, which is the gallery's hide-the-empty-row
  // rule. Only a *missing section* is dropped. A 'none' row is a plain label the
  // artist chose, and a 'link' row whose address extUrl refuses stays a
  // picture, the Soundcloud rule, with UrlInput already saying why.
  //
  // A row with neither a label nor an address prints nothing to click, so it is
  // dropped on both surfaces, before the halving below (`blankRow()`, the
  // JP-051 sweep) — unlike a missing section, which the canvas keeps.
  const linkRows = (Array.isArray(c.links) ? c.links : FOOTER_LINKS).filter((r) => !blankRow(r, LINK_KEYS))
  vm.footerLinks = linkRows.flatMap((r) => {
    // No target reads as 'none', which is what LinksField's select shows for it.
    const to = String(r?.to ?? '').trim() || 'none'
    const onPage = navSections.some((n) => n.cat === to)
    if (live && !onPage && to !== 'link' && to !== 'none') return []
    return [{
      label: cased(String(r?.label ?? '').trim()),
      to: to !== 'link' && onPage ? to : undefined,
      url: to === 'link' ? extUrl(r?.url) : '',
    }]
  })
  // The frames draw four and four, so the columns are the rendered list halved
  // with the remainder in the first. It runs after the drop above, or a deleted
  // section would leave the published columns lopsided. That is the pricing
  // deck's odd-count rule, and the first is the column the Book pill stands in,
  // so it is the one that should run long.
  // An empty second column is dropped rather than rendered as a nav with no
  // children: `links` is a flex row and an empty child still spends its gap. The
  // first is kept at any count, the pill being what it is there for.
  const footHalf = Math.ceil(vm.footerLinks.length / 2)
  vm.footerCols = [vm.footerLinks.slice(0, footHalf), vm.footerLinks.slice(footHalf)]
    .filter((colLinks, i) => i === 0 || colLinks.length)
  // Uncased, unlike vm.calCta and unlike every other string in this block: the
  // pill has always drawn `cta1`, which is uncased too, and caseText is only a
  // passthrough on the `title` themes. Casing it here would upper-case the
  // footer's pill on Pop — a picture that moved, on a change that was
  // only meant to hand the artist a field for a default they already had.
  vm.footerCta = cv('cta', 'Book Now')
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

// The upload limit, in decimal megabytes — the unit macOS's Finder prints, so
// a file Finder calls "4.1 MB" is refused by a message that says 4 MB, and one
// it calls "3.9 MB" is not. The message prints the size in the same unit.
const IMAGE_MAX = 4_000_000

// Why a picked file cannot be a photo here: null, or one sentence. Every
// upload control (ImageField, ImagesField, RowThumb) asks this at pick time
// and prints the answer twice — as a toast, and under the control itself
// until the next pick that refuses nothing, since a toast is far from the
// field, short-lived and replaced by the next one.
function imageProblem(file) {
  if (file.type !== 'image/png' && file.type !== 'image/jpeg') return 'Please choose a PNG or JPG'
  // Rounded up, so a file a byte over the limit never prints as "4.0 MB".
  if (file.size > IMAGE_MAX) return `That image is ${(Math.ceil(file.size / 1e5) / 10).toFixed(1)} MB — the limit is 4 MB`
  return null
}

// Hands back a file that imageProblem() passed as a data URL — never a
// network request.
function readImage(file, onOk) {
  const r = new FileReader()
  r.onload = () => onOk(r.result)
  r.readAsDataURL(file)
}

// Vets one pick (a file input's change or a drop): returns the files that
// pass and the line to print, toasting that line too. A pick that carries no
// file at all returns null, and leaves whatever line is up where it is.
function vetImages(files, onToast) {
  const list = [...(files || [])]
  if (!list.length) return null
  const bad = list.map(imageProblem).filter(Boolean)
  const msg = bad.length > 1
    ? `${bad.length} photos were not added — each must be a PNG or JPG of 4 MB or less`
    : bad[0] || null
  if (msg) onToast(msg)
  return { ok: list.filter((f) => !imageProblem(f)), msg }
}

// The refusal line under an upload control, in UrlInput's type.
const ERR_LINE = { margin: 0, fontSize: '10px', color: '#B3261E', lineHeight: 1.45 }
const ERR_RED = '#B3261E'

const FILE_INPUT = {
  position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
  overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0,
}

function ImageField({ value, onChange, onToast }) {
  const inputRef = useRef(null)
  const [over, setOver] = useState(false)
  const [err, setErr] = useState(null)

  // One file per pick: a multi-file drop takes the first, as it always has.
  const take = (files) => {
    const v = vetImages(files ? [...files].slice(0, 1) : [], onToast)
    if (!v) return
    setErr(v.msg)
    v.ok.forEach((f) => readImage(f, onChange))
  }
  // The filled photo is a dropzone too, and a drop there replaces it — without
  // these the browser takes the drop itself and opens the file in the tab.
  const dropZone = {
    onDragOver: (e) => { e.preventDefault(); setOver(true) },
    onDragLeave: () => setOver(false),
    onDrop: (e) => { e.preventDefault(); setOver(false); take(e.dataTransfer.files) },
  }

  return (
    <div onClick={stopE} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <input
        ref={inputRef} type="file" accept="image/png,image/jpeg"
        onChange={(e) => { take(e.target.files); e.target.value = '' }}
        style={FILE_INPUT}
      />
      {value ? (
        <div {...dropZone}>
          <img src={value} alt="" style={{
            height: '108px', width: '100%', objectFit: 'cover', borderRadius: '10px', display: 'block',
            border: `1px solid ${over ? '#1B1A17' : err ? ERR_RED : '#E2DFD7'}`,
          }} />
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
          {...dropZone}
          className="hover:border-foreground"
          style={{
            border: `1.5px dashed ${over ? '#1B1A17' : err ? ERR_RED : '#C9C6BB'}`, borderRadius: '10px', height: '108px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '4px', cursor: 'pointer',
          }}
        >
          <Upload size={18} style={{ color: '#B9B6AA' }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#5B5850' }}>Upload a photo</span>
          <span style={{ fontSize: '10px', color: '#98958A' }}>PNG or JPG up to 4 MB · from your device</span>
        </div>
      )}
      {err && <p role="alert" style={ERR_LINE}>{err}</p>}
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
  const [err, setErr] = useState(null)

  const take = (files) => {
    const all = [...(files || [])]
    if (!all.length || room <= 0) return
    // The room is counted in files that pass, so a refused one takes no slot.
    if (all.filter((f) => !imageProblem(f)).length > room) onToast(`Room for ${max} photos here`)
    // Vetted after the room toast, so a refusal is the toast left standing.
    // The line is decided here, at pick time, not as the reads land: in a
    // batch with one refused file the good reads must not wipe it.
    const v = vetImages(all, onToast)
    setErr(v.msg)
    // Each read is async, so accumulate against the latest list rather than a
    // stale copy — otherwise a multi-select drops all but the last file.
    let next = list
    v.ok.slice(0, room).forEach((f) => readImage(f, (url) => { next = [...next, url]; onChange(next) }))
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
              border: `1.5px dashed ${over ? '#1B1A17' : err ? ERR_RED : '#C9C6BB'}`, borderRadius: '9px', height: '62px',
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
        {list.length} of {max} · PNG or JPG up to 4 MB · from your device
      </p>
      {/* Kept while the grid is full as well: a refused file is still news
          when the good ones in its batch filled the last slot. */}
      {err && <p role="alert" style={{ ...ERR_LINE, marginTop: '3px' }}>{err}</p>}
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

// Every input that takes an outbound address: the Soundcloud link, the
// gallery's three social links, a track's audio, a gig's tickets and a footer
// link's url — and, with `check={emailProblem}`, the enquiry form's own
// address, which is the same question asked of an email. The value is stored
// as typed — extUrl() (or emailAddr()) in sectionVm is what refuses it — and
// this only says why, under the box, once the artist leaves
// it: on blur, never per keystroke, since every address is invalid until it is
// finished. Correcting it clears the line at once. The message remembers the
// value it was worked out for, so a repeater row deleted above this one (rows
// key on index) cannot hand its line to the row that moves up.
function UrlInput({ value, onChange, style, className, placeholder, web = false, check = urlProblem }) {
  const [err, setErr] = useState(null)
  const msg = err && err.v === value ? err.msg : null
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
      <Input
        value={value} placeholder={placeholder} onClick={stopE}
        aria-invalid={msg ? true : undefined}
        onChange={(e) => {
          const v = e.target.value
          if (msg && !check(v, web)) setErr(null)
          onChange(v)
        }}
        onBlur={() => {
          const p = check(value, web)
          setErr(p ? { v: value, msg: p } : null)
        }}
        className={className}
        style={{ ...style, ...(msg ? { borderColor: '#B3261E' } : null) }}
      />
      {msg && (
        <p role="alert" style={ERR_LINE}>{msg}</p>
      )}
    </div>
  )
}

// The header's Title, which is the artist's name and is required (JP-050).
// An emptied or all-space box is held here and never committed, so the page
// keeps the last name while the box is empty — every slot that prints it
// agrees with the h1 — and leaving the box puts that name back. There is
// therefore no empty state for Publish to meet, and no fallback to the
// profile name once the artist has typed one.
function NameInput({ value, onChange, style }) {
  const [draft, setDraft] = useState(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
      <Input
        value={draft ?? value} onClick={stopE}
        onChange={(e) => {
          const v = e.target.value
          if (v.trim()) { setDraft(null); onChange(v) } else setDraft(v)
        }}
        onBlur={() => setDraft(null)}
        style={style}
      />
      {draft !== null && (
        <p style={{ margin: 0, fontSize: '10px', color: '#98958A', lineHeight: 1.45 }}>
          Your name is required. The page keeps &ldquo;{String(value).trim()}&rdquo; until you type another.
        </p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * §8.6b SongsField — the repertoire's song list. The first of the five
 * list-shaped fields with a structured editor rather than a delimited
 * textarea (TracksField, GigsField, TiersField and FormFieldsField below
 * are the others, and BookedField after them is a structured editor of a
 * sixth shape that is not a list at all): the artist
 * types a title, an artist and any tags, and the tags are what the
 * section's filter chips are built from.
 *
 * Modelled on ImagesField above — numbered rows, a round X per row, an
 * add affordance, an "n of max" footnote — and, like it, deliberately
 * not reorderable: order is entry order.
 * ------------------------------------------------------------------- */

const SONG_ROW_INPUT = { ...FIELD_BOX, padding: '6px 8px', fontSize: '12px' }

const BLANK_SONG_HINT = 'Empty songs aren’t shown.'

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
        {blankRow(sg, SONG_KEYS) && (
          <p style={{ margin: 0, fontSize: '10px', color: '#98958A', lineHeight: 1.45 }}>{BLANK_SONG_HINT}</p>
        )}
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
 * §8.6c TracksField — the media player's track list.
 *
 * The second structured repeater, after SongsField above, and the first
 * whose rows carry a photograph: the media player dresses every card
 * with its own artwork, so the picture belongs to the track and travels
 * with it rather than sitting in a section-level photo grid where slot 3
 * silently meant track 3.
 *
 * Row shape is { title, sub, image, audio }. `sub` is the free line under
 * the title — the reference sets it "Hidden Sessions Vol. 2 · 6:18" — and
 * `image` follows the same three states as every other photo slot:
 * absent or null is the initials placeholder, a string is an upload.
 * There is no per-index re-seeding once the array exists, so a row added
 * in the middle cannot inherit the photograph of the track it displaced.
 *
 * `audio` is an address rather than an upload: a sound file is two orders
 * of magnitude larger than the artwork, and every image here is inlined
 * as a data URI into a page that has no persistence to spill it into.
 * The published player is what plays it (§10.2a); the canvas never does.
 * ------------------------------------------------------------------- */

// The compact artwork control: a 46px square that is the dropzone, the
// preview and the file trigger at once. ImageField's 108px panel is the
// right size for a section photo and far too tall for a repeater row.
//
// It has no room for a sentence, so it holds no refusal line of its own:
// `onFail` hands the line (or null, on a clean pick) to the repeater, which
// prints it under the whole row and says whether it is up, via `failed`.
function RowThumb({ value, label, onChange, onToast, onFail, failed }) {
  const inputRef = useRef(null)
  const [over, setOver] = useState(false)

  const take = (files) => {
    const v = vetImages(files ? [...files].slice(0, 1) : [], onToast)
    if (!v) return
    onFail(v.msg)
    v.ok.forEach((f) => readImage(f, onChange))
  }

  return (
    <div style={{ position: 'relative', flex: 'none' }}>
      <input
        ref={inputRef} type="file" accept="image/png,image/jpeg"
        onChange={(e) => { take(e.target.files); e.target.value = '' }}
        style={FILE_INPUT}
      />
      <button
        type="button" aria-label={value ? `Replace ${label}` : `Add ${label}`}
        onClick={(e) => { stopE(e); inputRef.current?.click() }}
        onDragOver={(e) => { e.preventDefault(); setOver(true) }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); take(e.dataTransfer.files) }}
        className="hover:border-foreground"
        style={{
          width: '46px', height: '46px', padding: 0, borderRadius: '9px', overflow: 'hidden',
          border: value
            ? `1px solid ${failed ? ERR_RED : '#E2DFD7'}`
            : `1.5px dashed ${over ? '#1B1A17' : failed ? ERR_RED : '#C9C6BB'}`,
          background: '#FFFFFF', cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}
      >
        {value
          ? <img src={value} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <Upload size={14} style={{ color: '#B9B6AA' }} />}
      </button>
      {/* Remove writes null, not undefined — an absent key is what selects the
          seeded photo, so undefined would bring it straight back. */}
      {value && (
        <button
          type="button" aria-label={`Remove ${label}`}
          onClick={(e) => { stopE(e); onChange(null) }}
          className="hover:bg-destructive/10"
          style={{
            position: 'absolute', top: '-5px', right: '-5px', width: '18px', height: '18px',
            borderRadius: '999px', border: '1px solid #E2DFD7', background: '#FFFFFF',
            color: '#B3261E', cursor: 'pointer', display: 'inline-flex',
            alignItems: 'center', justifyContent: 'center', padding: 0,
          }}
        ><X size={10} /></button>
      )}
    </div>
  )
}

const BLANK_TRACK_HINT = 'Empty tracks aren’t shown.'

function TracksField({ value, max, onChange, onToast }) {
  const list = Array.isArray(value) ? value : []

  // Same shape as SongsField: every keystroke rewrites the whole array, which
  // keeps `c.tracks` a plain value rather than something patched in place.
  const setAt = (i, k, v) => onChange(list.map((t, j) => (j === i ? { ...t, [k]: v } : t)))
  // The artwork refusal line, held here rather than in RowThumb (see there).
  // Rows key on index, so a line held by the row would pass to the row that
  // moves up when one above it is deleted; this one moves with its track.
  const [refused, setRefused] = useState(null) // { i, msg } | null
  const removeAt = (i) => {
    if (refused) setRefused(refused.i === i ? null : refused.i > i ? { ...refused, i: refused.i - 1 } : refused)
    onChange(list.filter((_, j) => j !== i))
  }
  const add = () => onChange([...list, { title: '', sub: '', image: null, audio: '' }])

  const row = (i, t) => (
    <div key={i} style={{
      border: '1px solid #E9E7E0', borderRadius: '10px', padding: '8px',
      display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '8px', background: '#FCFBF8',
    }}>
      <span style={{
        width: '12px', flex: 'none', fontSize: '10px', fontWeight: 700,
        color: '#98958A', textAlign: 'center', paddingTop: '15px',
      }}>{i + 1}</span>
      <RowThumb
        value={t.image ?? null} label={`artwork for track ${i + 1}`}
        onChange={(v) => setAt(i, 'image', v)} onToast={onToast}
        onFail={(msg) => setRefused(msg ? { i, msg } : refused?.i === i ? null : refused)}
        failed={refused?.i === i}
      />
      {/* Stacked rather than side by side: this panel is also the mobile edit
          sheet, and a thumbnail plus two inputs across does not fit at its width. */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* shadcn Input for its focus ring — see SongsField above. */}
          <Input
            value={t.title ?? ''} placeholder="Track title" onClick={stopE}
            onChange={(e) => setAt(i, 'title', e.target.value)}
            className="h-auto" style={{ ...SONG_ROW_INPUT, fontWeight: 600 }}
          />
          <button
            type="button" aria-label={`Remove track ${i + 1}`}
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
        <Input
          value={t.sub ?? ''} placeholder="Release · 5:42" onClick={stopE}
          onChange={(e) => setAt(i, 'sub', e.target.value)}
          className="h-auto" style={{ ...SONG_ROW_INPUT, marginRight: '28px', width: 'auto' }}
        />
        <div style={{ marginRight: '28px' }}>
          <UrlInput
            value={t.audio ?? ''} placeholder="Audio file URL (MP3)" web
            onChange={(v) => setAt(i, 'audio', v)}
            className="h-auto" style={SONG_ROW_INPUT}
          />
        </div>
      </div>
      {/* The row wraps, so this takes a line of its own, indented to the thumb. */}
      {refused?.i === i && (
        <p role="alert" style={{ ...ERR_LINE, flexBasis: '100%', paddingLeft: '20px', marginTop: '-2px' }}>{refused.msg}</p>
      )}
      {blankRow(t, TRACK_KEYS) && (
        <p style={{ margin: '-2px 0 0', flexBasis: '100%', paddingLeft: '20px', fontSize: '10px', color: '#98958A', lineHeight: 1.45 }}>{BLANK_TRACK_HINT}</p>
      )}
    </div>
  )

  return (
    <div onClick={stopE} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {list.map((t, i) => row(i, t || {}))}
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
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#5B5850' }}>Add track</span>
        </button>
      )}
      <p style={{ margin: 0, fontSize: '10px', color: '#98958A' }}>
        {list.length} of {max} · artwork PNG or JPG, from your device · audio by link
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * §8.6d GigsField — the events map's list of shows.
 *
 * The third structured repeater. Row shape is
 * { venue, city, time, month, day, link }: the first five are what the
 * gig card prints, and `link` is where its tickets go on the published
 * page — an address rather than anything uploaded, normalised through
 * extUrl() in sectionVm like the media player's Soundcloud button. A row
 * without one stays the picture it has always been.
 *
 * `month` and `day` are two fields rather than one date because the card
 * draws them as two lines of a boxed stamp, and because an artist writing
 * "Jul"/"12" is not committing to a year, a format or a calendar the
 * section does not have. Nothing here parses them.
 *
 * Same house rules as the two above: whole-array rewrite per keystroke,
 * numbered rows, a round X, a dashed add, an "n of max" footnote, no
 * reordering — order is entry order, and it is the order the map pins
 * pair against.
 *
 * The footnote's page size is the open design's (JP-042), and measured:
 * a whole set of pins in layouts 1–3, except layout 3 on a phone, and one
 * gig in layout 4's ticker. Change a layout's `perPage`, change it here.
 * ------------------------------------------------------------------- */

const BLANK_GIG_HINT = 'Empty gigs aren’t shown.'

function GigsField({ value, max, design, onChange }) {
  const list = Array.isArray(value) ? value : []

  const setAt = (i, k, v) => onChange(list.map((g, j) => (j === i ? { ...g, [k]: v } : g)))
  const removeAt = (i) => onChange(list.filter((_, j) => j !== i))
  const add = () => onChange([...list, { venue: '', city: '', time: '', month: '', day: '', link: '' }])

  // The two short fields that share a line. Wider than half at this panel's
  // width would push the pair to wrap, which reads as two rows rather than one.
  const pair = (a, b) => (
    <div style={{ display: 'flex', gap: '6px' }}>{a}{b}</div>
  )

  const row = (i, g) => (
    <div key={i} style={{
      border: '1px solid #E9E7E0', borderRadius: '10px', padding: '8px',
      display: 'flex', flexDirection: 'column', gap: '6px', background: '#FCFBF8',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <span style={{
          width: '18px', flex: 'none', fontSize: '10px', fontWeight: 700,
          color: '#98958A', textAlign: 'center',
        }}>{i + 1}</span>
        {/* shadcn Input for its focus ring — see SongsField above. */}
        <Input
          value={g.venue ?? ''} placeholder="Venue" onClick={stopE}
          onChange={(e) => setAt(i, 'venue', e.target.value)}
          className="h-auto" style={{ ...SONG_ROW_INPUT, fontWeight: 600 }}
        />
        <button
          type="button" aria-label={`Remove gig ${i + 1}`}
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
      {/* Same 25px gutter and 29px right inset as SongsField, so the lower
          fields line up under the venue and clear the remove button. */}
      <div style={{ paddingLeft: '25px', paddingRight: '29px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {pair(
          <Input
            key="city" value={g.city ?? ''} placeholder="City" onClick={stopE}
            onChange={(e) => setAt(i, 'city', e.target.value)}
            className="h-auto" style={SONG_ROW_INPUT}
          />,
          <Input
            key="time" value={g.time ?? ''} placeholder="22:00" onClick={stopE}
            onChange={(e) => setAt(i, 'time', e.target.value)}
            className="h-auto" style={SONG_ROW_INPUT}
          />,
        )}
        {pair(
          <Input
            key="month" value={g.month ?? ''} placeholder="Jul" onClick={stopE}
            onChange={(e) => setAt(i, 'month', e.target.value)}
            className="h-auto" style={SONG_ROW_INPUT}
          />,
          <Input
            key="day" value={g.day ?? ''} placeholder="12" onClick={stopE}
            onChange={(e) => setAt(i, 'day', e.target.value)}
            className="h-auto" style={SONG_ROW_INPUT}
          />,
        )}
        <UrlInput
          value={g.link ?? ''} placeholder="Tickets link"
          onChange={(v) => setAt(i, 'link', v)}
          className="h-auto" style={SONG_ROW_INPUT}
        />
        {blankRow(g, GIG_KEYS) && (
          <p style={{ margin: 0, fontSize: '10px', color: '#98958A', lineHeight: 1.45 }}>{BLANK_GIG_HINT}</p>
        )}
      </div>
    </div>
  )

  return (
    <div onClick={stopE} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {list.map((g, i) => row(i, g || {}))}
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
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#5B5850' }}>Add gig</span>
        </button>
      )}
      <p style={{ margin: 0, fontSize: '10px', color: '#98958A' }}>
        {list.length} of {max} · {design === 3 ? 'one at a time'
          : `${PINS.length} to a page`} on the published site{design === 2 ? ', one on a phone' : ''}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * SlotsField — the booking calendar's named slots (JP-052).
 *
 * The eighth repeater, and the last list-shaped content to get one: layout
 * 2 tables these rows, and until JP-052 they were a seed no field edited,
 * dated 2025 and so dead on every published page. Row shape is
 * { date, kind, price }, CAL_SLOTS' own comment: a date, what the artist
 * plays that night, and what it starts from. `date` is a native date input
 * because sectionVm parses it as ISO (parseDate) — a row it cannot parse
 * keeps its place and does not pick.
 *
 * GigsField's house rules: whole-array rewrite per keystroke, numbered
 * rows, a round X, a dashed add, an "n of max" footnote, no reordering —
 * order is entry order, and it is the order the table lists.
 * ------------------------------------------------------------------- */

const BLANK_SLOT_HINT = 'Empty slots aren’t shown.'

function SlotsField({ value, max, onChange }) {
  const list = Array.isArray(value) ? value : []

  const setAt = (i, k, v) => onChange(list.map((g, j) => (j === i ? { ...g, [k]: v } : g)))
  const removeAt = (i) => onChange(list.filter((_, j) => j !== i))
  const add = () => onChange([...list, { date: '', kind: '', price: '' }])

  const row = (i, g) => (
    <div key={i} style={{
      border: '1px solid #E9E7E0', borderRadius: '10px', padding: '8px',
      display: 'flex', flexDirection: 'column', gap: '6px', background: '#FCFBF8',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <span style={{
          width: '18px', flex: 'none', fontSize: '10px', fontWeight: 700,
          color: '#98958A', textAlign: 'center',
        }}>{i + 1}</span>
        <Input
          type="date" value={g.date ?? ''} aria-label={`Slot ${i + 1} date`} onClick={stopE}
          onChange={(e) => setAt(i, 'date', e.target.value)}
          className="h-auto" style={{ ...SONG_ROW_INPUT, fontWeight: 600 }}
        />
        <button
          type="button" aria-label={`Remove slot ${i + 1}`}
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
      <div style={{ paddingLeft: '25px', paddingRight: '29px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <Input
            value={g.kind ?? ''} placeholder="Evening" onClick={stopE}
            onChange={(e) => setAt(i, 'kind', e.target.value)}
            className="h-auto" style={SONG_ROW_INPUT}
          />
          <Input
            value={g.price ?? ''} placeholder="From £1,200" onClick={stopE}
            onChange={(e) => setAt(i, 'price', e.target.value)}
            className="h-auto" style={SONG_ROW_INPUT}
          />
        </div>
        {blankRow(g, SLOT_KEYS) && (
          <p style={{ margin: 0, fontSize: '10px', color: '#98958A', lineHeight: 1.45 }}>{BLANK_SLOT_HINT}</p>
        )}
      </div>
    </div>
  )

  return (
    <div onClick={stopE} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {list.map((g, i) => row(i, g || {}))}
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
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#5B5850' }}>Add slot</span>
        </button>
      )}
      <p style={{ margin: 0, fontSize: '10px', color: '#98958A' }}>{list.length} of {max}</p>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * §8.6e TiersField — the pricing section's packages.
 *
 * The fourth structured repeater, and the first to replace a flattened
 * key set rather than a textarea: t1n/t1p/… reached two of the five
 * things a card prints, and nothing at all could add a fourth package.
 * Row shape is { name, price, tags, blurb, feats }.
 *
 * Two of those are delimited strings rather than arrays, and they are
 * delimited differently on purpose: `tags` is comma-separated, exactly
 * as SongsField's is — it is the same repChips() row on the other side
 * — and `feats` is one feature a line, because a feature is a phrase
 * that may itself contain a comma. Both stay strings all the way to
 * sectionVm, which is the only place they are split.
 *
 * Same house rules as the three above: whole-array rewrite per
 * keystroke, numbered rows, a round X, a dashed add, an "n of max"
 * footnote, no reordering — order is entry order, and it is the order
 * the cards take their palette hues in.
 *
 * A row left wholly empty stays here — the artist is mid-edit — but is
 * no package: `sectionVm` drops it on both surfaces (`blankRow()`,
 * JP-048), and the line under it says so, LinksField's gone-section
 * precedent. Any one filled field makes it a package again.
 * ------------------------------------------------------------------- */

// The two multi-line fields. A card's blurb is a sentence and its features are
// a list, so neither fits the single-line Input the other repeaters use.
const TIER_AREA = { ...SONG_ROW_INPUT, resize: 'vertical', lineHeight: 1.45 }

const BLANK_TIER_HINT = 'Empty packages aren’t shown.'

function TiersField({ value, max, onChange }) {
  const list = Array.isArray(value) ? value : []

  const setAt = (i, k, v) => onChange(list.map((t, j) => (j === i ? { ...t, [k]: v } : t)))
  const removeAt = (i) => onChange(list.filter((_, j) => j !== i))
  const add = () => onChange([...list, { name: '', price: '', tags: '', blurb: '', feats: '' }])

  // The price and the tags share a line, as the gigs' city and time do: both
  // are short, and stacking them would push the two textareas below the fold of
  // the mobile edit sheet.
  const pair = (a, b) => (
    <div style={{ display: 'flex', gap: '6px' }}>{a}{b}</div>
  )

  const row = (i, t) => (
    <div key={i} style={{
      border: '1px solid #E9E7E0', borderRadius: '10px', padding: '8px',
      display: 'flex', flexDirection: 'column', gap: '6px', background: '#FCFBF8',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <span style={{
          width: '18px', flex: 'none', fontSize: '10px', fontWeight: 700,
          color: '#98958A', textAlign: 'center',
        }}>{i + 1}</span>
        {/* shadcn Input for its focus ring — see SongsField above. */}
        <Input
          value={t.name ?? ''} placeholder="Package name" onClick={stopE}
          onChange={(e) => setAt(i, 'name', e.target.value)}
          className="h-auto" style={{ ...SONG_ROW_INPUT, fontWeight: 600 }}
        />
        <button
          type="button" aria-label={`Remove package ${i + 1}`}
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
      {/* Same 25px gutter and 29px right inset as the three above. */}
      <div style={{ paddingLeft: '25px', paddingRight: '29px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {pair(
          <Input
            key="price" value={t.price ?? ''} placeholder="£450" onClick={stopE}
            onChange={(e) => setAt(i, 'price', e.target.value)}
            className="h-auto" style={SONG_ROW_INPUT}
          />,
          <Input
            key="tags" value={t.tags ?? ''} placeholder="Tags — solo, trio" onClick={stopE}
            onChange={(e) => setAt(i, 'tags', e.target.value)}
            className="h-auto" style={SONG_ROW_INPUT}
          />,
        )}
        <Textarea
          rows={2} value={t.blurb ?? ''} placeholder="What the package is for" onClick={stopE}
          onChange={(e) => setAt(i, 'blurb', e.target.value)}
          style={TIER_AREA}
        />
        <Textarea
          rows={4} value={t.feats ?? ''} placeholder={'What it includes\nOne feature a line'}
          onClick={stopE}
          onChange={(e) => setAt(i, 'feats', e.target.value)}
          style={TIER_AREA}
        />
        {blankRow(t, TIER_KEYS) && (
          <p style={{ margin: 0, fontSize: '10px', color: '#98958A', lineHeight: 1.45 }}>
            {BLANK_TIER_HINT}
          </p>
        )}
      </div>
    </div>
  )

  return (
    <div onClick={stopE} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {list.map((t, i) => row(i, t || {}))}
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
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#5B5850' }}>Add package</span>
        </button>
      )}
      <p style={{ margin: 0, fontSize: '10px', color: '#98958A' }}>
        {list.length} of {max}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * §8.6f FormFieldsField — the enquiry form's boxes.
 *
 * The fifth repeater, after SongsField, TracksField, GigsField and TiersField,
 * and the sixth structured editor counting BookedField below. One key, one
 * shape, no assets: `{ label, placeholder, kind }`, where `kind` is the whole
 * reason the row is not just a label and a placeholder — it is what lets the
 * published form know which box holds the address a reply goes to, and so what
 * makes validation derivable rather than guessed.
 *
 * Modelled on GigsField above, the plainest of them. Deliberately not
 * reorderable, like the rest — but order matters more here than anywhere else,
 * because it is the order the boxes appear in — two to a row in layouts 1
 * and 4, one to a row in layouts 2 and 3 and in layout 1 on a phone, which
 * is what the footnote says of the open design (JP-042, measured: it used
 * to say "two to a row" whatever the layout).
 *
 * One row is guarded: the **last `email` row** can be neither removed nor
 * retyped, since it is the only box a reply can be addressed to. Its trash
 * button is disabled and its select disables the other kinds rather than
 * dropping them (a Radix value naming no item blanks the trigger), and a hint
 * under the row says why. Nothing else is guarded — an emptied list renders in
 * every layout — but the seed carries an email row and a new row is `text`, so
 * the editor never reaches a list without one.
 *
 * A row with neither a label nor a placeholder stays here — the artist is
 * mid-edit — but is no box: `sectionVm` drops it on both surfaces (`blankRow()`,
 * JP-051, TiersField's rule) and the line under it says so. The guarded row is
 * the exception, since dropping it would leave nowhere to reply to: it always
 * shows, and an emptied label is shown as Email, which the line under it says.
 * ------------------------------------------------------------------- */

const FORM_EMAIL_HINT = 'Visitors need somewhere to leave an address.'
const BLANK_FIELD_HINT = 'Empty fields aren’t shown.'
const EMAIL_LABEL_HINT = `Shown as ${FORM_EMAIL_LABEL}.`

function FormFieldsField({ value, max, design, onChange }) {
  const list = Array.isArray(value) ? value : []
  const emails = list.filter((f) => f?.kind === 'email').length
  const lastEmail = (f) => f.kind === 'email' && emails === 1

  const setAt = (i, k, v) => onChange(list.map((f, j) => (j === i ? { ...f, [k]: v } : f)))
  const removeAt = (i) => onChange(list.filter((_, j) => j !== i))
  const add = () => onChange([...list, { label: '', placeholder: '', kind: 'text' }])

  const row = (i, f) => (
    <div key={i} style={{
      border: '1px solid #E9E7E0', borderRadius: '10px', padding: '8px',
      display: 'flex', flexDirection: 'column', gap: '6px', background: '#FCFBF8',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <span style={{
          width: '18px', flex: 'none', fontSize: '10px', fontWeight: 700,
          color: '#98958A', textAlign: 'center',
        }}>{i + 1}</span>
        <Input
          value={f.label ?? ''} placeholder="Label — Name" onClick={stopE}
          onChange={(e) => setAt(i, 'label', e.target.value)}
          className="h-auto" style={{ ...SONG_ROW_INPUT, fontWeight: 600 }}
        />
        <button
          type="button" aria-label={`Remove field ${i + 1}`}
          disabled={lastEmail(f)} title={lastEmail(f) ? FORM_EMAIL_HINT : undefined}
          onClick={(e) => { stopE(e); removeAt(i) }}
          className="hover:bg-destructive/10 disabled:bg-transparent"
          style={{
            width: '22px', height: '22px', flex: 'none', borderRadius: '999px',
            border: '1px solid #E2DFD7', background: '#FFFFFF', color: '#B3261E',
            cursor: lastEmail(f) ? 'not-allowed' : 'pointer', opacity: lastEmail(f) ? 0.35 : 1,
            display: 'inline-flex', alignItems: 'center',
            justifyContent: 'center', padding: 0,
          }}
        ><X size={11} /></button>
      </div>
      <div style={{ paddingLeft: '25px', paddingRight: '29px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Input
          value={f.placeholder ?? ''} placeholder="Placeholder — Full name" onClick={stopE}
          onChange={(e) => setAt(i, 'placeholder', e.target.value)}
          className="h-auto" style={SONG_ROW_INPUT}
        />
        {/* A stock <Select>, unlike §9.1's layout dropdown: the objection there
            is that Radix's SelectItem wraps its children in ItemText, which
            would mirror a thumbnail into the closed trigger. Three words are
            exactly what it is for, and it keeps one select look in the panel. */}
        <Select value={f.kind ?? 'text'} onValueChange={(v) => setAt(i, 'kind', v)}>
          <SelectTrigger
            onClick={stopE} className="w-full h-auto"
            style={{ ...SONG_ROW_INPUT, paddingRight: '28px' }}
          ><SelectValue /></SelectTrigger>
          <SelectContent onClick={stopE}>
            {FORM_KINDS.map((o) => (
              <SelectItem key={o.v} value={o.v} disabled={lastEmail(f) && o.v !== 'email'}>{o.l}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {lastEmail(f) && (
          <p style={{ margin: 0, fontSize: '10px', color: '#98958A', lineHeight: 1.45 }}>{FORM_EMAIL_HINT}</p>
        )}
        {lastEmail(f) && !String(f.label ?? '').trim() && (
          <p style={{ margin: 0, fontSize: '10px', color: '#98958A', lineHeight: 1.45 }}>{EMAIL_LABEL_HINT}</p>
        )}
        {!lastEmail(f) && blankRow(f, FORM_FIELD_KEYS) && (
          <p style={{ margin: 0, fontSize: '10px', color: '#98958A', lineHeight: 1.45 }}>{BLANK_FIELD_HINT}</p>
        )}
      </div>
    </div>
  )

  return (
    <div onClick={stopE} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {list.map((f, i) => row(i, f || {}))}
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
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#5B5850' }}>Add field</span>
        </button>
      )}
      <p style={{ margin: 0, fontSize: '10px', color: '#98958A' }}>
        {list.length} of {max} · {design === 0 || design === 3 ? 'two' : 'one'} to a row
        {' '}on the published page{design === 0 ? ', one on a phone' : ''}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * §8.6g BookedField — the booking calendar's blocked dates.
 *
 * The sixth structured editor, and the only one that is not a repeater: a
 * month of the artist's own to click. One row per blocked date is the
 * wrong shape for a June with eight of them, and a date typed into a row
 * cannot be read against the month it falls in — which is the whole
 * question being asked here.
 *
 * It pages the same CAL_SPAN window the *published* section does —
 * calStart(), so from today's month once `open` has passed (F20) — and
 * wraps at both ends the way the published arrows do, so every date a
 * visitor can pick is one it can block. That makes it the editor's one
 * reader of the clock, once per mount, as PublishedPage reads it; the
 * canvas still never does, so with a past `open` the panel pages months
 * the canvas's picture does not show. A day before today is drawn faded
 * and takes no click unless it is already blocked, which stays undoable.
 *
 * `value` is the array of ISO dates, rewritten whole and sorted — the
 * repeaters' rule — and an empty array is a real answer: absent and
 * emptied both mean nothing is blocked, because there is no seeded
 * booking to lose. Hence no max, no add affordance and no remove button:
 * every one of them is the same click again.
 * ------------------------------------------------------------------- */

const CAL_NAV_BTN = {
  width: '24px', height: '24px', flex: 'none', borderRadius: '7px',
  border: '1px solid #D8D5CC', background: '#FFFFFF', color: '#5B5850',
  cursor: 'pointer', display: 'inline-flex', alignItems: 'center',
  justifyContent: 'center', padding: 0,
}

function BookedField({ value, open, onChange }) {
  const [mi, setMi] = useState(0)
  const [today] = useState(() => new Date().toISOString().slice(0, 10))
  const list = Array.isArray(value) ? value : []
  const start = calStart(open, today)

  const at = ((mi % CAL_SPAN) + CAL_SPAN) % CAL_SPAN
  const abs = start.m + at
  const y = start.y + Math.floor(abs / 12)
  const mo = ((abs % 12) + 12) % 12
  const { lead, length } = monthSpan(y, mo)

  const toggle = (iso) => onChange(
    list.includes(iso) ? list.filter((d) => d !== iso) : [...list, iso].sort(),
  )

  const arrow = (icon, dir) => (
    <button
      type="button" aria-label={dir < 0 ? 'Previous month' : 'Next month'}
      onClick={(e) => { stopE(e); setMi((v) => v + dir) }}
      className="hover:border-foreground" style={CAL_NAV_BTN}
    >{icon}</button>
  )

  const cells = [
    ...Array.from({ length: lead }, (_, i) => <span key={`b${i}`} />),
    ...Array.from({ length }, (_, i) => {
      const d = i + 1
      const iso = isoDate(y, mo, d)
      const off = list.includes(iso)
      // ISO dates compare as strings, sectionVm's `dead` test.
      const past = iso < today && !off
      return (
        <button
          key={iso} type="button" disabled={past}
          aria-pressed={off} aria-label={`${d} ${monthLabel(y, mo)}`}
          onClick={(e) => { stopE(e); toggle(iso) }}
          className={off || past ? undefined : 'hover:border-foreground'}
          style={{
            height: '25px', borderRadius: '7px', padding: 0,
            cursor: past ? 'default' : 'pointer', opacity: past ? 0.4 : 1,
            fontFamily: 'inherit', fontSize: '11px',
            fontWeight: off ? 700 : 500,
            border: `1px solid ${off ? '#1B1A17' : '#E9E7E0'}`,
            background: off ? '#1B1A17' : '#FFFFFF',
            color: off ? '#FFFFFF' : '#5B5850',
          }}
        >{d}</button>
      )
    }),
  ]

  // The month's own blocked count, not the list's: the artist is looking at one
  // month, and a total would not tell them whether this one is the eight.
  const here = list.filter((iso) => iso.startsWith(`${y}-${String(mo + 1).padStart(2, '0')}-`)).length

  return (
    <div onClick={stopE} style={{
      border: '1px solid #E9E7E0', borderRadius: '10px', padding: '9px',
      background: '#FCFBF8', display: 'flex', flexDirection: 'column', gap: '7px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
        {arrow(<ChevronLeft size={13} />, -1)}
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#1B1A17' }}>{monthLabel(y, mo)}</span>
        {arrow(<ChevronRight size={13} />, 1)}
      </div>
      {/* The section's own short day names, so the panel's week starts where
          the published one does. */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px' }}>
        {CAL_DAYS.map((d) => (
          <span key={d} style={{
            fontSize: '9px', fontWeight: 700, color: '#98958A',
            textAlign: 'center', letterSpacing: '0.04em',
          }}>{d.slice(0, 1)}</span>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px' }}>{cells}</div>
      <p style={{ margin: 0, fontSize: '10px', color: '#98958A' }}>
        {list.length} blocked · {here} in {monthLabel(y, mo)}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * §8.6h QuotesField — the testimonials' reviews.
 *
 * The sixth repeater, after SongsField, TracksField, GigsField,
 * TiersField and FormFieldsField, and the seventh structured editor
 * counting BookedField above. Row shape is
 * { quote, who, role, when }.
 *
 * The second to replace a flattened key set rather than a textarea,
 * TiersField being the first: quote/who/role reached exactly one review
 * of a hardcoded three, the card's own date line was editable by
 * nothing at all, and no field could add a fourth review or drop one.
 *
 * Laid out like TiersField, whose primary field is also the short one:
 * the reviewer goes on the header line beside the ordinal, and the
 * quote — a sentence, not a label — takes the same TIER_AREA textarea a
 * package's blurb takes. Same house rules as the five above:
 * whole-array rewrite per keystroke, numbered rows, a round X, a dashed
 * add, an "n of max" footnote, no reordering — order is entry order,
 * and it is the order the published card pages through.
 * ------------------------------------------------------------------- */

const BLANK_QUOTE_HINT = 'Empty reviews aren’t shown.'

function QuotesField({ value, max, onChange }) {
  const list = Array.isArray(value) ? value : []

  const setAt = (i, k, v) => onChange(list.map((r, j) => (j === i ? { ...r, [k]: v } : r)))
  const removeAt = (i) => onChange(list.filter((_, j) => j !== i))
  const add = () => onChange([...list, { quote: '', who: '', role: '', when: '' }])

  // The role and the date line share a line, as the gigs' city and time do:
  // both are short, and stacking them would push the add button below the fold
  // of the mobile edit sheet once there are three reviews.
  const pair = (a, b) => (
    <div style={{ display: 'flex', gap: '6px' }}>{a}{b}</div>
  )

  const row = (i, r) => (
    <div key={i} style={{
      border: '1px solid #E9E7E0', borderRadius: '10px', padding: '8px',
      display: 'flex', flexDirection: 'column', gap: '6px', background: '#FCFBF8',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <span style={{
          width: '18px', flex: 'none', fontSize: '10px', fontWeight: 700,
          color: '#98958A', textAlign: 'center',
        }}>{i + 1}</span>
        {/* shadcn Input for its focus ring — see SongsField above. */}
        <Input
          value={r.who ?? ''} placeholder="Reviewer" onClick={stopE}
          onChange={(e) => setAt(i, 'who', e.target.value)}
          className="h-auto" style={{ ...SONG_ROW_INPUT, fontWeight: 600 }}
        />
        <button
          type="button" aria-label={`Remove review ${i + 1}`}
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
      {/* Same 25px gutter and 29px right inset as SongsField, so the lower
          fields line up under the reviewer and clear the remove button. */}
      <div style={{ paddingLeft: '25px', paddingRight: '29px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Textarea
          rows={3} value={r.quote ?? ''} placeholder="What they said" onClick={stopE}
          onChange={(e) => setAt(i, 'quote', e.target.value)}
          style={TIER_AREA}
        />
        {pair(
          <Input
            key="role" value={r.role ?? ''} placeholder="Private host" onClick={stopE}
            onChange={(e) => setAt(i, 'role', e.target.value)}
            className="h-auto" style={SONG_ROW_INPUT}
          />,
          <Input
            key="when" value={r.when ?? ''} placeholder="Reviewed 6 days ago" onClick={stopE}
            onChange={(e) => setAt(i, 'when', e.target.value)}
            className="h-auto" style={SONG_ROW_INPUT}
          />,
        )}
        {blankRow(r, QUOTE_KEYS) && (
          <p style={{ margin: 0, fontSize: '10px', color: '#98958A', lineHeight: 1.45 }}>{BLANK_QUOTE_HINT}</p>
        )}
      </div>
    </div>
  )

  return (
    <div onClick={stopE} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {list.map((r, i) => row(i, r || {}))}
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
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#5B5850' }}>Add review</span>
        </button>
      )}
      <p style={{ margin: 0, fontSize: '10px', color: '#98958A' }}>
        {list.length} of {max} · one to a card on the published page
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------- *
 * §8.6i LinksField — the footer's sitemap.
 *
 * The seventh repeater, after SongsField, TracksField, GigsField,
 * TiersField, FormFieldsField and QuotesField, and the eighth
 * structured editor counting BookedField above. Row shape is
 * { label, to, url }.
 *
 * It replaces a constant rather than a flattened key set: FOOTER_LINKS
 * was two hardcoded columns of four strings, rendered as anchors on a
 * bare `#`, so nothing about the footer's navigation was the artist's
 * and none of it went anywhere on either surface.
 *
 * Laid out like FormFieldsField, the only other repeater with a per-row
 * <select>, and for the same reason: the target is what makes the row
 * more than a label. One thing here that no other repeater does — the
 * address box renders only on a row whose target is `link`. It is the
 * first row with two *kinds* of target, and an empty web-address box
 * standing under eight section rows is noise, not an affordance.
 *
 * Same house rules as the six above: whole-array rewrite per keystroke,
 * numbered rows, a round X, a dashed add, an "n of max" footnote, no
 * reordering — and here the order is load-bearing the way the enquiry
 * form's is, because sectionVm halves this list into the two columns.
 * ------------------------------------------------------------------- */

// Under a footer row's select, and above the header's nav select in Minimal,
// when the target is not on the page. The canvas still draws the label; the published page does not.
const LINK_GONE_HINT = 'Section not on the page — left off the published footer.'
const navGoneHint = (labels) =>
  `${labels.join(', ')}: section not on the page — left off the published nav.`

const BLANK_LINK_HINT = 'Empty links aren’t shown.'

function LinksField({ value, max, navSections = [], onChange }) {
  const list = Array.isArray(value) ? value : []
  // A section target the page does not carry. sectionVm resolves the same test,
  // and the published footer leaves the row out, so the editor says so here.
  const gone = (to) => !!to && to !== 'none' && to !== 'link' && !navSections.some((n) => n.cat === to)

  const setAt = (i, k, v) => onChange(list.map((r, j) => (j === i ? { ...r, [k]: v } : r)))
  const removeAt = (i) => onChange(list.filter((_, j) => j !== i))
  // A new row points at nothing: the label is the artist's to write first, and
  // 'none' is a real value rather than the empty string Radix refuses.
  const add = () => onChange([...list, { label: '', to: 'none', url: '' }])

  const row = (i, r) => (
    <div key={i} style={{
      border: '1px solid #E9E7E0', borderRadius: '10px', padding: '8px',
      display: 'flex', flexDirection: 'column', gap: '6px', background: '#FCFBF8',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <span style={{
          width: '18px', flex: 'none', fontSize: '10px', fontWeight: 700,
          color: '#98958A', textAlign: 'center',
        }}>{i + 1}</span>
        <Input
          value={r.label ?? ''} placeholder="Link — About" onClick={stopE}
          onChange={(e) => setAt(i, 'label', e.target.value)}
          className="h-auto" style={{ ...SONG_ROW_INPUT, fontWeight: 600 }}
        />
        <button
          type="button" aria-label={`Remove link ${i + 1}`}
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
      <div style={{ paddingLeft: '25px', paddingRight: '29px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* FOOTER_TARGETS is every category the page *can* carry, not the ones
            it does: a value naming no item blanks a Radix trigger, so a link to
            a section since deleted must still read as what it points at. The
            view-model resolves it against the page instead (§4.3a): the canvas
            keeps such a row, the published footer drops it, and the line under
            the select is how the artist finds out. */}
        <Select value={r.to ?? 'none'} onValueChange={(v) => setAt(i, 'to', v)}>
          <SelectTrigger
            onClick={stopE} className="w-full h-auto"
            style={{ ...SONG_ROW_INPUT, paddingRight: '28px' }}
          ><SelectValue /></SelectTrigger>
          <SelectContent onClick={stopE}>
            {FOOTER_TARGETS.map((o) => <SelectItem key={o.v} value={o.v}>{o.l}</SelectItem>)}
          </SelectContent>
        </Select>
        {gone(r.to) && (
          <p style={{ margin: 0, fontSize: '10px', color: '#98958A', lineHeight: 1.45 }}>
            {LINK_GONE_HINT}
          </p>
        )}
        {r.to === 'link' && (
          <UrlInput
            value={r.url ?? ''} placeholder="instagram.com/kaimercer"
            onChange={(v) => setAt(i, 'url', v)}
            className="h-auto" style={SONG_ROW_INPUT}
          />
        )}
        {blankRow(r, LINK_KEYS) && (
          <p style={{ margin: 0, fontSize: '10px', color: '#98958A', lineHeight: 1.45 }}>{BLANK_LINK_HINT}</p>
        )}
      </div>
    </div>
  )

  return (
    <div onClick={stopE} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {list.map((r, i) => row(i, r || {}))}
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
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#5B5850' }}>Add link</span>
        </button>
      )}
      <p style={{ margin: 0, fontSize: '10px', color: '#98958A' }}>
        {list.length} of {max} · two columns on the published page
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * §8.5 EditPanel — shared by the sidebar and the mobile edit sheet
 * ------------------------------------------------------------------ */

function EditPanel({ sec, vm, api, artistName, identity, tiers, email, themeIdx, navSections }) {
  const fields = FIELDS[sec.cat] ?? []
  const locked = vm.locked

  // The panel has to resolve the seeded photos exactly as sectionVm does, or a
  // Retro section would show a photo on the canvas and an empty dropzone here.
  const themeName = THEMES[themeIdx].name
  const design = sec.arch % (designCount(sec.cat, themeName) || 1)
  const imgVal = (k) => (sec.c[k] !== undefined ? (sec.c[k] ?? undefined) : defaultImage(sec.cat, themeName, k, design))
  const imgsVal = (k) => (Array.isArray(sec.c[k]) ? sec.c[k] : defaultImages(sec.cat, themeName))
  // Same trap as the photos above: the panel has to resolve the seeded songs
  // exactly as sectionVm does, or the canvas would list twelve songs while the
  // repeater showed none.
  const songsVal = (k) => (Array.isArray(sec.c[k]) ? sec.c[k] : SONGS)
  // And the same again for the media player's tracks, whose seed is TRACKS
  // dressed in the Retro artwork and the demo audio. The first keystroke
  // materialises this whole array into `c.tracks`, photographs and sound files
  // included, so nothing the user could see — or hear — disappears the moment
  // they rename track one.
  const tracksVal = (k) => {
    if (Array.isArray(sec.c[k])) return sec.c[k]
    const art = defaultTrackArt(sec.cat, themeName) ?? []
    return TRACKS.map(([name, dur, rel], i) => ({
      title: name, sub: `${rel} · ${dur}`, image: art[i] ?? null, audio: TRACK_AUDIO[i] ?? '',
    }))
  }
  // And once more for the events map's gigs, whose seed needs no dressing —
  // GIGS is already the row shape GigsField writes.
  const gigsVal = (k) => (Array.isArray(sec.c[k]) ? sec.c[k] : GIGS)
  // And for the pricing packages, whose seed needs none either: TIERS carries
  // its tags as the comma string and its features as the newline one, which is
  // exactly what TiersField edits and what sectionVm splits.
  const tiersVal = (k) => (Array.isArray(sec.c[k]) ? sec.c[k] : TIERS)
  // And for the enquiry form's boxes, whose seed needs no dressing either:
  // FORM_FIELDS is written as the { label, placeholder, kind } row that
  // FormFieldsField edits and sectionVm reads.
  const formFieldsVal = (k) => (Array.isArray(sec.c[k]) ? sec.c[k] : FORM_FIELDS)
  // And for the testimonials' reviews: QUOTES is written as the
  // { quote, who, role, when } row QuotesField edits, so this is the gigs' and
  // the packages' one-liner rather than the tracks' dressing.
  const quotesVal = (k) => (Array.isArray(sec.c[k]) ? sec.c[k] : QUOTES)
  // And for the footer's sitemap: FOOTER_LINKS is written as the
  // { label, to } row LinksField edits — a `url` only appears on a row the
  // artist points at a web address — so this is the gigs' one-liner again.
  const linksVal = (k) => (Array.isArray(sec.c[k]) ? sec.c[k] : FOOTER_LINKS)
  // The booking calendar's two. `bookedVal` is the songs' rule with an empty
  // seed; `openVal` has to run sectionVm's whole expression rather than just
  // its default, because clearing a date input stores '' — which the canvas
  // parses to null and resolves back to CAL_OPEN. A panel that read the raw ''
  // would page BookedField from a month the calendar is not on.
  const bookedVal = (k) => (Array.isArray(sec.c[k]) ? sec.c[k] : CAL_BOOKED)
  const openVal = (k) => parseDate(sec.c[k] ?? CAL_OPEN) ?? parseDate(CAL_OPEN)
  // Layout 2's slots (JP-052): the seed dated from the canvas's `open`, which
  // is exactly what sectionVm resolves off the clock, so the first edit writes
  // out the dates the canvas shows.
  const slotsVal = (k) => (Array.isArray(sec.c[k]) ? sec.c[k] : slotSeed(openVal('open')))

  // Minimal's labels that resolve to nothing on this page (§4.3a), for the hint
  // above the header's navigation select. Only a header reads it.
  const deadNav = sec.cat === 'header'
    ? minimalNav(navSections).filter((l) => !l.to).map((l) => l.label)
    : []

  const groupLabel = { fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#8B887D', marginBottom: '8px', display: 'block' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
      <ScrollArea className="flex-1 min-h-0">
        <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <Label style={groupLabel}>Layout</Label>
            <LayoutPicker
              cat={sec.cat} arch={sec.arch} content={sec.c}
              themeIdx={themeIdx} artistName={artistName} identity={identity} tiers={tiers} email={email} navSections={navSections}
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
                  const fallback = (f.k === 'title' || f.k === 'badgeText') && sec.cat === 'header' ? artistName
                    : f.k === 'copyright' && sec.cat === 'footer' ? copyrightOf(artistName)
                    : f.k === 'heading' && sec.cat === 'repertoire' ? `${songsVal('songs').filter((t) => !blankRow(t, SONG_KEYS)).length} Songs`
                    : f.k === 'heading' && sec.cat === 'testimonials'
                      && sec.arch % (designCount(sec.cat, themeName) || 1) === 1 ? TESTI_HEADING_2
                    : f.k === 'navMode' && sec.cat === 'header' ? navModeDefault(themeName, design)
                    : f.k === 'kicker' && sec.cat === 'header'
                      && (themeName === 'Lime' || themeName === 'Grunge') && design === 2 ? KICKER_3
                    : f.k === 'heading' && sec.cat === 'calendar'
                      && sec.arch % (designCount(sec.cat, themeName) || 1) === 2 ? CAL_HEADING_3
                    : f.k === 'heading' && sec.arch % (designCount(sec.cat, themeName) || 1) === 3
                      && HEADING_4[sec.cat] ? HEADING_4[sec.cat]
                    : f.k === 'button' && sec.cat === 'form'
                      && sec.arch % (designCount(sec.cat, themeName) || 1) === 3 ? FORM_BTN_4
                    : fieldDefault(f)
                  const val = sec.c[f.k] !== undefined ? sec.c[f.k] : fallback
                  const set = (v) => api.setContent(sec.id, f.k, v)
                  // A field this design does not read stays editable — the copy
                  // is kept for the next layout — but says so, and says
                  // "template" where no layout of this one reads it.
                  const unread = !fieldReach(f, themeName, design)
                  const nowhere = unread && fieldNowhere(f, themeName)
                  return (
                    <div key={f.k}>
                      <Label style={{ fontSize: '11px', fontWeight: 600, color: '#6B685E', display: 'block', marginBottom: f.hint || unread ? '2px' : '5px' }}>{f.l}</Label>
                      {unread && (
                        <p style={{ margin: '0 0 6px', fontSize: '10px', color: '#98958A', lineHeight: 1.45, fontStyle: 'italic' }}>{nowhere ? 'Not shown in this template' : 'Not shown in this layout'}</p>
                      )}
                      {f.hint && (
                        <p style={{ margin: '0 0 6px', fontSize: '10px', color: '#98958A', lineHeight: 1.45 }}>{f.hint}</p>
                      )}
                      {deadNav.length > 0 && f.k === 'navMode' && val === 'minimal' && (
                        <p style={{ margin: '0 0 6px', fontSize: '10px', color: '#98958A', lineHeight: 1.45 }}>{navGoneHint(deadNav)}</p>
                      )}
                      {f.type === 'image' ? (
                        <ImageField value={imgVal(f.k)} onChange={(v) => set(v)} onToast={api.toast} />
                      ) : f.type === 'images' ? (
                        <ImagesField value={imgsVal(f.k)} max={f.max} onChange={(v) => set(v)} onToast={api.toast} />
                      ) : f.type === 'songs' ? (
                        <SongsField value={songsVal(f.k)} max={f.max} onChange={(v) => set(v)} />
                      ) : f.type === 'tracks' ? (
                        <TracksField value={tracksVal(f.k)} max={f.max} onChange={(v) => set(v)} onToast={api.toast} />
                      ) : f.type === 'gigs' ? (
                        <GigsField value={gigsVal(f.k)} max={f.max} design={design} onChange={(v) => set(v)} />
                      ) : f.type === 'tiers' ? (
                        <TiersField value={tiersVal(f.k)} max={f.max} onChange={(v) => set(v)} />
                      ) : f.type === 'formFields' ? (
                        <FormFieldsField value={formFieldsVal(f.k)} max={f.max} design={design} onChange={(v) => set(v)} />
                      ) : f.type === 'quotes' ? (
                        <QuotesField value={quotesVal(f.k)} max={f.max} onChange={(v) => set(v)} />
                      ) : f.type === 'links' ? (
                        <LinksField value={linksVal(f.k)} max={f.max} navSections={navSections} onChange={(v) => set(v)} />
                      ) : f.type === 'slots' ? (
                        <SlotsField value={slotsVal(f.k)} max={f.max} onChange={(v) => set(v)} />
                      ) : f.type === 'booked' ? (
                        // The one rung that takes a second value, the way
                        // TracksField is the one that takes a toast: the month
                        // it opens on is the calendar's own opening date.
                        <BookedField value={bookedVal(f.k)} open={openVal('open')} onChange={(v) => set(v)} />
                      ) : f.type === 'date' ? (
                        // The platform picker, and its value is already the ISO
                        // string parseDate reads.
                        <Input
                          type="date" value={val} onClick={stopE}
                          onChange={(e) => set(e.target.value)}
                          style={FIELD_BOX}
                        />
                      ) : f.type === 'select' ? (
                        <Select value={val} onValueChange={set}>
                          <SelectTrigger onClick={stopE} className="w-full h-auto" style={{ ...FIELD_BOX, paddingRight: '28px' }}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent onClick={stopE}>
                            {f.opts.map((o) => <SelectItem key={o.v} value={o.v}>{o.l}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      ) : f.k === 'title' && sec.cat === 'header' ? (
                        // Stored as typed, so a space mid-name survives the
                        // render; a stored blank (none the editor can make)
                        // shows the name the page prints.
                        <NameInput value={String(val).trim() ? val : artistName} onChange={set} style={FIELD_BOX} />
                      ) : f.type === 'url' ? (
                        <UrlInput value={val} onChange={set} style={FIELD_BOX} />
                      ) : f.type === 'email' ? (
                        <UrlInput value={val} onChange={set} style={FIELD_BOX} check={emailProblem} />
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
 * For the 10 non-header categories more layouts are offered than there are
 * designs (§4.4), so some rows render identically. That is on purpose.
 * ------------------------------------------------------------------ */

function LayoutPicker({ cat, arch, themeIdx, artistName, identity, tiers, email, navSections, content = {}, onPick }) {
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
                    artistName, identity, tiers, email, Z: SIZES.desktop, mob: false, navSections,
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

function AddComposer({ add, present, removed, themeIdx, artistName, identity, tiers, email, navSections, onChange, onAdd, onCancel }) {
  const groupLabel = { fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#8B887D', marginBottom: '8px', display: 'block' }
  const taken = present.includes(add.cat)
  // A category deleted earlier restores its content on add; Start fresh opts
  // out. A flag rather than a button that discards, so nothing is lost until
  // Add section is pressed.
  const restorable = !taken && !!removed[add.cat]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div>
        <Label style={groupLabel}>Section</Label>
        <Select value={add.cat} onValueChange={(cat) => onChange({ cat, arch: removed[cat]?.arch ?? 0, fresh: false })}>
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
          themeIdx={themeIdx} artistName={artistName} identity={identity} tiers={tiers} email={email} navSections={navSections}
          onPick={(i) => onChange({ ...add, arch: i })}
        />
      </div>

      {taken && (
        <p style={{ margin: 0, fontSize: '11px', color: '#98958A', lineHeight: 1.45 }}>
          This section is already on the page. Pick another to add.
        </p>
      )}

      {restorable && (
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '11px', color: '#5B5850', lineHeight: 1.45, cursor: 'pointer' }}>
          <input
            type="checkbox" checked={!!add.fresh} onClick={stopE}
            onChange={(e) => onChange({ ...add, fresh: e.target.checked })}
            style={{ margin: '2px 0 0', accentColor: '#1B1A17', cursor: 'pointer' }}
          />
          <span>
            <span style={{ fontWeight: 700 }}>Start fresh</span>
            <span style={{ display: 'block', color: '#98958A' }}>
              {add.fresh
                ? 'The content you removed is discarded when you add.'
                : 'Unticked, this section comes back with the content you removed.'}
            </span>
          </span>
        </label>
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
          onClick={(e) => { stopE(e); if (!taken) onAdd(add.cat, add.arch, add.fresh) }}
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
// applied to the page the picker is about to build (§4.8), in the order that
// page takes when its header takes layout `i`.
const previewNav = (i) => navSectionsOf(pageOrder(i))

// Every frame in the picker uses one aspect: the desktop canvas against the
// tallest header render (Retro's photographic layout 1). A render that comes
// out shorter is centred in it.
const SPOT_ASPECT = `${parseInt(SIZES.desktop.canvasW, 10)} / ${SIZES.desktop.heroH}`

// …and what HeaderChoices frames its cards with until it has measured them.
const SPOT_MIN_H = SIZES.desktop.heroH

function TemplatePreview({ themeIdx, artistName }) {
  // The flat two show their Figma header as a still (photos.js). It is
  // SPOT_ASPECT already, so `cover` crops nothing — not `contain`.
  const { name } = THEMES[themeIdx]
  const still = TEMPLATE_STILLS[name]
  if (still) {
    return (
      <img
        src={still} alt={`${name} template`}
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
      />
    )
  }
  return (
    <ScaledPreview
      height="100%" center
      vm={sectionVm({
        themeIdx, cat: 'header', arch: 0, c: {}, artistName,
        Z: SIZES.desktop, mob: false, navSections: previewNav(0),
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
              its own, so the caption under the filmstrip says what it does. */}
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

        {/* Filmstrip — picking one re-spotlights it. */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
          {THEMES.map((t, i) => (
            <button
              key={t.name} type="button"
              onClick={() => setSpot(i)}
              aria-label={t.name} aria-pressed={i === spot}
              style={{
                flex: '0 0 auto', width: '168px', borderRadius: '10px', overflow: 'hidden',
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

        <p style={{ margin: 0, textAlign: 'center', fontSize: '13px', color: '#8E8B81' }}>
          Pick a template to open it in the editor.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * ThemePicker — the top bar's theme switcher
 *
 * LayoutPicker's construction, and a DropdownMenu for LayoutPicker's reason:
 * a stock <Select> would mirror the thumbnail into the closed trigger. The
 * thumbnails are the template stage's own (`TemplatePreview`), so a theme
 * looks here the way it did where it was first picked — its default header,
 * not the user's page.
 * ------------------------------------------------------------------ */

function ThemePicker({ themeIdx, artistName, onPick }) {
  const [open, setOpen] = useState(false)
  const cur = THEMES[themeIdx]
  const [bg, ac] = cur.palette

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button" onClick={stopE} aria-label={`Theme: ${cur.name}`}
          className="hover:border-foreground"
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            border: '1px solid #E2DFD7', background: '#FFFFFF', borderRadius: '9px',
            padding: '6px 10px', cursor: 'pointer',
          }}
        >
          <span style={{
            width: '18px', height: '18px', borderRadius: '999px', flex: 'none',
            background: `linear-gradient(135deg, ${bg} 50%, ${ac} 50%)`,
            boxShadow: '0 0 0 1px rgba(0,0,0,.12)',
          }} />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>{cur.name}</span>
          <ChevronDown size={14} style={{ color: '#8B887D', flex: 'none' }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start" sideOffset={6} onClick={stopE}
        className="p-[5px]"
        style={{
          width: 'min(560px, calc(100vw - 24px))', maxHeight: 'min(640px, 80vh)', overflowY: 'auto',
          display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '4px',
          borderRadius: '10px', border: '1px solid #E2DFD7', boxShadow: '0 12px 28px rgba(20,18,12,.16)',
        }}
      >
        {THEMES.map((t, i) => {
          const isCur = i === themeIdx
          return (
            <DropdownMenuItem
              key={t.name} textValue={t.name} onSelect={() => onPick(i)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '7px',
                padding: '6px', borderRadius: '8px', cursor: 'pointer', minWidth: 0,
                background: isCur ? '#F2F6FE' : undefined,
              }}
            >
              {/* LayoutPicker's rule: the current one is an inset outline, not a
                  border, so the frame's width — and ScaledPreview's scale — holds. */}
              <span style={{
                display: 'block', width: '100%', aspectRatio: SPOT_ASPECT,
                borderRadius: '6px', overflow: 'hidden', border: '1px solid #E2DFD7',
                outline: isCur ? '2px solid #2B6BE4' : undefined, outlineOffset: '-2px',
              }}>
                <TemplatePreview themeIdx={i} artistName={artistName} />
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600 }}>{t.name}</span>
                  <span style={{ fontSize: '11px', color: '#8B887D', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {t.sub}
                  </span>
                </span>
                {isCur && <Check size={12} style={{ color: '#2B6BE4', flex: 'none' }} />}
              </span>
            </DropdownMenuItem>
          )
        })}
        {/* `arch` lives on the section, not the theme, so a switch loses nothing.
            A plain paragraph, not an item: it is nothing to pick. */}
        <p style={{
          gridColumn: '1 / -1', margin: '2px 0 0', padding: '6px 6px 4px',
          borderTop: '1px solid #E2DFD7', fontSize: '11px', color: '#8B887D',
        }}>
          Your layouts and content are kept when you switch.
        </p>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ------------------------------------------------------------------ *
 * §6 The header layout picker
 *
 * The grid the setup modal (§6.2) is built around: the template's header
 * designs, up to four — `setupHeaderCount()`, since only layouts 1–4 are
 * a whole page — so four for Retro, Lime and Grunge and three for the flat
 * templates (§4.4). Three up on a desktop, two around 720px, one below
 * ~560.
 *
 * The cards share one frame so the set reads as a set and the labels sit
 * on one line. The frame has to be measured: Retro's tallest layouts run
 * well past its full-bleed hero, and a frame guessed from either end
 * would crop the tall layouts or strand the short ones. It takes the
 * *median* height rather than the tallest — sizing to the tallest would
 * leave the others in a third of a card's worth of empty background —
 * and `fit` shrinks whatever overruns it instead of cropping.
 * ------------------------------------------------------------------ */

function HeaderChoices({ themeIdx, artistName, sel, onSelect }) {
  const T = THEMES[themeIdx]
  const n = setupHeaderCount(T.name)

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
                  Z: SIZES.desktop, mob: false, navSections: previewNav(i),
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
  // Today, in UTC like every other date sum here, read once when the tab's
  // root mounts — one of the builder's two clock reads, BookedField's being the
  // other; the canvas makes none. A republish re-renders
  // the same root, so a tab left open past midnight keeps the day it opened on.
  const [today] = useState(() => new Date().toISOString().slice(0, 10))

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

  // Past the canvas its frame was drawn at, the desktop page scales up to the
  // frame it was drawn from (JP-038, reopened; user call, 2026-09-23): the
  // canvas is the 1440 frame at 0.82, so between 1180 and 1440 the whole page
  // is zoomed by `k` — type, gutter and column alike — and a 1440 window shows
  // the frame at 1:1. Only past 1440 does the design stop growing: that
  // surplus is split into the gutters, so the content column keeps the frame's
  // measure and each section's own background carries the page out to the
  // window edges as a full-bleed band. Tablet and mobile never zoom.
  //
  // The page is laid out at `w / k` and drawn `k` times larger, so every
  // section keeps the 1180 geometry the canvas has. Doing the surplus through
  // `padX` rather than with a centred wrapper element is what keeps it short:
  // `padX` is also what bleedTo() and TornEdge offset against, so the torn
  // edges, the checker ribbons and the form's grain follow the gutter out to
  // the true section edge for free.
  //
  // `surplus` is carried separately for HeaderV0, the one composition that sits
  // outside the root's padding and has to apply the gutter itself.
  const canvasW = parseInt(base.canvasW, 10)
  const k = key === 'desktop' ? Math.min(w, 1440) / canvasW : 1
  const surplus = Math.max(0, Math.round((w / k - canvasW) / 2))
  const padX = `${parseInt(base.padX, 10) + surplus}px`
  const Z = {
    ...base, surplus: `${surplus}px`,
    padX, pad: `${base.padY} ${padX}`,
    // canvasW is still dropped for '100%': the section fills the window and the
    // gutter, not a cap, is what holds the column.
    canvasW: '100%',
  }

  // §4.8, as the editor derives it at the same names.
  const navSections = navSectionsOf(sections.map((s) => s.cat))
  const identity = headerIdentity(sections)
  const tiers = pageTiers(sections)
  const email = pageEmail(sections)

  const T = THEMES[themeIdx]
  const rows = pageRows(sections, T.name, key === 'desktop')
  const inColumns = columnSides(rows)

  const page = arrangeRows(rows, { gutter: Z.padX, bg: T.palette[0] }, sections.map((sec, i) => (
    <EncoreSection key={sec.id} s={sectionVm({
      themeIdx, cat: sec.cat, arch: sec.arch, c: sec.c,
      artistName, identity, tiers, email, Z, mob: key === 'mobile', live: true, navSections,
      column: inColumns.get(i), today, page: pageDesignOf(sections, T.name),
    })} />
  )))
  return k === 1 ? page : <div style={{ zoom: k }}>{page}</div>
}

// Lays out `pageRows` (data.js): a plain row is its section's own element, and
// a composed row is layout 3's Frame 299 — a grid of the two columns at the
// frame's 858 : 405, 55 apart × 0.82, on the page ground, inside the page's own
// gutter. Its sections were built with `column`, so they bring their vertical
// padding and no horizontal one, and a right column shorter than the left
// leaves the ground showing under it, as the frame does. Shared by the editor
// canvas and the published tab, which is what keeps the two one page.
// Which column each composed section stands in, by page index — 'left' or
// 'right' — so `sectionVm({ column })` can say how wide it is.
function columnSides(rows) {
  return new Map(rows.flatMap((r) => (r.left
    ? [...r.left.map((i) => [i, 'left']), [r.right, 'right']]
    : [])))
}

// The content column a section's children get, in CSS px: `canvasW − 2·padX`
// at the device's own frame — 1052 / 688 / 346, which the published tab keeps
// too, its surplus folding into `padX` — or one of the two columns
// `arrangeRows` cuts from it (684 / 323 at desktop). EncoreSection cannot
// measure, so a design whose count comes off a width reads this.
function contentWidth(dev, column) {
  const base = SIZES[dev]
  const full = parseInt(base.canvasW, 10) - 2 * parseInt(base.padX, 10)
  if (!column) return full
  const { left, right, gap } = COLUMN_SPLIT
  return Math.round((full - Math.round(gap * 0.82)) * (column === 'left' ? left : right) / (left + right))
}

function arrangeRows(rows, { gutter, bg }, els) {
  return rows.map((row) => (row.left ? (
    <div key={`columns-${els[row.right].key}`} style={{
      display: 'grid', alignItems: 'start', background: bg, padding: `0 ${gutter}`,
      gridTemplateColumns: `minmax(0, ${COLUMN_SPLIT.left}fr) minmax(0, ${COLUMN_SPLIT.right}fr)`,
      columnGap: `${Math.round(COLUMN_SPLIT.gap * 0.82)}px`,
      transition: 'background-color .45s ease',
    }}>
      <div style={{ minWidth: 0 }}>{row.left.map((i) => els[i])}</div>
      <div style={{ minWidth: 0 }}>{els[row.right]}</div>
    </div>
  ) : els[row.i]))
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
  // carry theirs from `vm.anchor` (§4.3a), gated on `live`. A footer link or a
  // Minimal label whose target section has been deleted is not rendered here at
  // all, sectionVm having dropped it, and a pill with no target carries no href,
  // so neither reaches this listener; the swallow is what catches the rest.
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

export default function EncoreBuilder({ artistName: profileName = 'Kai Mercer', startTheme = 'Picker' }) {
  const uidRef = useRef(100)
  const isMobile = useIsMobile()
  const tabletCap = useTabletCap()

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
      // The last deleted section of each category, as `{ arch, c }`, so adding
      // that category again brings its content back (uploads included, as the
      // data URIs they are). Keys are only ever categories *not* on the page:
      // re-adding, Undo and Start fresh all consume the entry.
      removed: {},
    }
    return ti >= 0
      ? { ...base, stage: 'editor', theme: ti, sections: buildPage(EXAMPLE_PAGE) }
      : { ...base, stage: 'template', theme: 0, sections: [] }
  })

  const patch = useCallback((p) => setSt((s) => ({ ...s, ...(typeof p === 'function' ? p(s) : p) })), [])

  // §9.2 — one toast at a time; the timer resets on each new one.
  //
  // `action` ({ label, run }) adds a button to the pill — the delete toast's
  // Undo. Such a toast lives longer, since it asks for a decision rather than
  // reporting one, but it is still replaced by the next toast like any other:
  // what it would undo is kept in `st.removed` either way, so a toast bumped
  // early costs the shortcut, not the content.
  const toastRef = useRef(null)
  const toast = useCallback((msg, action) => {
    if (toastRef.current !== null) sonnerToast.dismiss(toastRef.current)
    toastRef.current = sonnerToast.custom((id) => (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <span style={{
          background: '#1B1A17', color: '#FFFFFF', fontSize: '13px', fontWeight: 700,
          padding: action ? '6px 6px 6px 22px' : '12px 22px', borderRadius: '99px', boxShadow: '0 12px 30px rgba(20,18,12,.3)',
          maxWidth: '92vw', textAlign: 'center', animation: 'fadeIn .25s ease',
          display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'auto',
        }}>
          {msg}
          {action && (
            <button
              type="button"
              onClick={(e) => {
                stopE(e)
                action.run()
                sonnerToast.dismiss(id)
                if (toastRef.current === id) toastRef.current = null
              }}
              className="hover:bg-white/25"
              style={{
                flex: 'none', border: 0, borderRadius: '99px', background: 'rgba(255,255,255,.14)',
                color: '#FFFFFF', fontSize: '13px', fontWeight: 700, padding: '6px 14px', cursor: 'pointer',
              }}
            >{action.label}</button>
          )}
        </span>
      </div>
    ), { duration: action ? 6000 : 2400, unstyled: true })
  }, [])

  const T = THEMES[st.theme]
  const sections = st.sections
  const toastTop = isMobile && !!(st.add || st.sheet || st.editSheet)
  const toastOffset = !isMobile ? '28px'
    : toastTop ? 'calc(12px + env(safe-area-inset-top))'
    : 'calc(72px + env(safe-area-inset-bottom))'

  // The artist's name is the header's Title: the prop only seeds it. Every
  // other reading — the nav brand, the initials placeholders, the bio and
  // player bylines, the badge, the small print, the published tab's <title>
  // and the site address — follows what the artist typed there. The Title is
  // required (JP-050): NameInput never commits an empty one, so the prop is
  // read only while the key is absent, which is a fresh page.
  const artistName = nameOf(sections.find((s) => s.cat === 'header')?.c.title, profileName)
  // And the header's Kicker and Location are the artist's too (F1): sectionVm
  // hands them to every other section that prints a role or a home town.
  const identity = headerIdentity(sections)
  const tiers = pageTiers(sections)
  const email = pageEmail(sections)
  const present = sections.map((s) => s.cat)

  // §5.5 — a real phone forces mobile canvas sizing at full width.
  // The device the canvas actually draws: the toggle, capped at tablet in a
  // window too narrow for the desktop frame.
  const device = tabletCap && st.device === 'desktop' ? 'tablet' : st.device
  const Z = isMobile ? { ...SIZES.mobile, canvasW: '100%' } : SIZES[device]

  // §4.8 — nav links follow the optional sections currently on the page, and
  // carry the category as the anchor the published page scrolls to (§4.3a).
  const navSections = navSectionsOf(sections.map((s) => s.cat))

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
      win.document.title = artistName
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

  // Delete stays one click; what makes it safe is the toast's Undo and
  // `st.removed`. Undo puts the very same section object back where it was,
  // clamped so the footer stays last (canMove's invariant), and leaves the
  // selection alone — it restores the page, it does not open an editor.
  //
  // The section and its index are read off the rendered page, not captured
  // from inside the updater: React may run an updater lazily, after this
  // handler has returned, so a flag set in there is not there to read yet.
  const del = useCallback((id) => {
    const i = st.sections.findIndex((x) => x.id === id)
    const sec = st.sections[i]
    if (!sec || sec.cat === 'header' || sec.cat === 'footer') return
    patch((s) => ({
      sections: s.sections.filter((x) => x.id !== id),
      removed: { ...s.removed, [sec.cat]: { arch: sec.arch, c: sec.c } },
      menuFor: null,
      ...(s.selectedId === id ? { selectedId: null, editSheet: false } : {}),
    }))
    toast(`${catName(sec.cat)} removed`, {
      label: 'Undo',
      run: () => patch((s) => {
        // Already back — re-added from the composer while the toast was up.
        if (s.sections.some((x) => x.cat === sec.cat)) return {}
        const next = s.sections.slice()
        next.splice(Math.min(i, next.length - 1), 0, sec)
        const { [sec.cat]: _, ...removed } = s.removed
        return { sections: next, removed }
      }),
    })
  }, [patch, toast, st.sections])

  // A category deleted earlier comes back with its content unless the
  // composer's Start fresh is on; either way its `removed` entry is spent.
  // The layout is the composer's pick, which opens on the remembered one.
  const addSection = useCallback((cat, arch, fresh) => {
    if (st.sections.some((x) => x.cat === cat)) return
    patch((s) => {
      if (s.sections.some((x) => x.cat === cat)) return {}
      const { [cat]: kept, ...removed } = s.removed
      const sec = { id: ++uidRef.current, cat, arch, c: kept && !fresh ? kept.c : {} }
      const next = s.sections.slice()
      next.splice(next.length - 1, 0, sec)   // immediately before the footer
      return { sections: next, add: null, removed }
    })
    toast(`${catName(cat)} added`)
  }, [patch, toast, st.sections])

  const openEdit = useCallback((id) => patch(
    isMobile ? { selectedId: id, editSheet: true, sheet: null, menuFor: null }
             : { selectedId: id, menuFor: null },
  ), [patch, isMobile])

  // §9.1 — the add composer opens on the first category not already used,
  // at the layout that category had when it was deleted, if it was.
  const openAdd = useCallback(() => patch((s) => {
    const cat = firstFreeCat(s.sections.map((x) => x.cat))
    return { add: { cat, arch: s.removed[cat]?.arch ?? 0, fresh: false }, sheet: null, menuFor: null }
  }), [patch])

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
      ...sectionVm({ themeIdx: st.theme, cat: sec.cat, arch: sec.arch, c: sec.c, artistName, identity, tiers, email, Z, mob: Z === SIZES.mobile || isMobile || device === 'mobile', navSections, column: inColumns.get(i), page: pageDesignOf(arr, T.name) }),
      layoutLabel: isHeader
        ? headerLayoutLabel(T.name, sec.arch)
        : `${cat.name} layout ${sec.arch + 1}`,
      // §6.2 — while the setup modal is up the header's own badge names the
      // layout, so the click that just re-laid the whole page is legible on the
      // page itself. It is the only badge showing, which is why the other ten
      // sections were not given one: the dialog's overlay rules out hover, so
      // `showOverlay` is true for the selected header alone.
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

  const rows = pageRows(sections, T.name, !Z.narrow)
  const inColumns = columnSides(rows)
  const vms = sections.map(makeVm)
  const selectedIdx = sections.findIndex((s) => s.id === st.selectedId)
  const selectedSec = selectedIdx >= 0 ? sections[selectedIdx] : null
  const selectedVm = selectedIdx >= 0 ? vms[selectedIdx] : null

  /* ---- §6.2 the header setup modal --------------------------------- */

  const headerSec = sections.find((x) => x.cat === 'header')
  const onboarding = st.onboard && !!headerSec
  const nHeader = setupHeaderCount(T.name)
  const headerArch = headerSec ? headerSec.arch : 0

  // Clicking a card swaps the real header behind the modal, at full size, and
  // takes the rest of the page with it: the page is one design, so a header on
  // layout 3 stands over a body on layout 3. `pageLayout` folds the index into
  // each category's own design count (§4.4), so every section lands on a layout
  // it actually has. The cards cannot be given a page number, though, because
  // the counts differ per category. With the layout-4 pass closed the seeded
  // page's nine body sections have four designs each, so that page alone would
  // now repeat from the fifth card on; but `audio` — the one category the
  // layout-4 Figma page omitted — still has three, so a page carrying an audio
  // section has no single index at which the whole body repeats, and the card
  // cannot promise one it would keep only sometimes. The modal
  // stays open afterwards — a click is a try, not a
  // verdict, and "Use this header" is what ends it.
  //
  // Safe as a page-wide write only because the modal is a one-shot gate over a
  // page nobody has touched: `st.onboard` is armed once, by the template
  // picker, on a page `buildPage` has just built at layout 1 throughout, and
  // the dialog's overlay blocks the sidebar behind it. Nothing hand-picked can
  // be clobbered — which is exactly why the sidebar's own LayoutPicker still
  // moves the one section it is opened on, and must keep doing so.
  //
  // The theme comes off `s` rather than off `T`, so the updater is
  // self-contained and the callback never has to be rebuilt; `headerSec` goes
  // with the guard it fed, which was protecting a call that cannot happen
  // (`onboarding` is false without a header).
  //
  // The page is reordered as well as re-laid-out, into `pageOrder(i)`: each
  // Figma page stacks its sections differently, and picking card 1 again
  // restores layout 1's order. The sort is stable and a category the order does
  // not name sinks to the end, though the page built here carries none.
  const pickHeader = useCallback((i) => patch((s) => {
    const order = pageOrder(i)
    const rank = (cat) => { const r = order.indexOf(cat); return r < 0 ? order.length : r }
    return {
      sections: s.sections
        .map((x) => ({ ...x, arch: pageLayout(x.cat, i, THEMES[s.theme].name) }))
        .sort((a, b) => rank(a.cat) - rank(b.cat)),
    }
  }), [patch])

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
            stage: 'editor', theme: i, sections: next, onboard: true, removed: {},
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
      add={st.add} present={present} removed={st.removed}
      themeIdx={st.theme} artistName={artistName} identity={identity} tiers={tiers} email={email} navSections={navSections}
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
                arranged, and the rest of the page follows it: every section is laid out to match. You can
                change any of them later, section by section.
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
          }}>{siteSlug(artistName)}.encore.site</div>
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
            <span style={{ fontFamily: "'Alfa Slab One', serif", fontSize: '16px' }}>JustPay+</span>
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

            <span style={{ fontFamily: "'Alfa Slab One', serif", fontSize: '17px' }}>JustPay+</span>
            <span style={{ width: '1px', height: '24px', background: '#E2DFD7' }} />

            {/* Theme switcher — a labelled control, not decoration. */}
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#8B887D' }}>Theme</span>
              <ThemePicker themeIdx={st.theme} artistName={artistName} onPick={(i) => patch({ theme: i })} />
            </span>

            <span style={{ flex: 1 }} />

            <Tabs value={device} onValueChange={(v) => patch({ device: v })}>
              <TabsList
                className="h-auto p-[3px] gap-[2px] rounded-[9px]"
                style={{ background: '#F1EFEA' }}
                onClick={stopE}
              >
                {[['desktop', 'Desktop'], ['tablet', 'Tablet'], ['mobile', 'Mobile']].map(([v, l]) => (
                  <TabsTrigger
                    key={v} value={v} disabled={tabletCap && v === 'desktop'}
                    title={tabletCap && v === 'desktop' ? 'Widen the window past 1180px to preview desktop' : undefined}
                    className="rounded-[7px] border-0 data-[state=active]:bg-[#1B1A17] data-[state=active]:text-white data-[state=active]:shadow-none"
                    style={{ fontSize: '12px', fontWeight: 600, padding: '5px 12px', color: device === v ? '#FFFFFF' : '#5B5850', transition: 'background .15s' }}
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
                  {/* Keyed on the section, here and in the edit drawer, so a
                      field's own line (a refused photo or address) is not
                      inherited by the same field of the next section opened. */}
                  <EditPanel
                    key={selectedSec.id} sec={selectedSec} vm={selectedVm} api={api}
                    artistName={artistName} identity={identity} tiers={tiers} email={email} themeIdx={st.theme} navSections={navSections}
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
              {arrangeRows(rows, { gutter: Z.padX, bg: T.palette[0] }, sections.map((sec, i) => {
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
              }))}
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
            <DrawerContent onClick={stopE} onPointerDownOutside={keepOnToast} className={`${PILL} !max-h-[82vh]`} style={{ ...sheetShell, maxHeight: '82vh' }}>
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
          <DrawerContent onClick={stopE} onPointerDownOutside={keepOnToast} className={`${PILL} !max-h-[78vh]`} style={{ ...sheetShell, maxHeight: '78vh' }}>
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
          <DrawerContent onClick={stopE} onPointerDownOutside={keepOnToast} className={`${PILL} !max-h-[60vh]`} style={{ ...sheetShell, height: '60vh' }}>
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
          <DrawerContent onClick={stopE} onPointerDownOutside={keepOnToast} className={`${PILL} !max-h-[84vh]`} style={{ ...sheetShell, height: '84vh' }}>
            <DrawerDescription className="sr-only">Edit this section</DrawerDescription>
            {selectedSec && sheetHead(
              `${catName(selectedSec.cat)} — ${selectedVm.layoutLabel}`,
              () => patch({ editSheet: false, selectedId: null }),
            )}
            {selectedSec && (
              <EditPanel
                key={selectedSec.id} sec={selectedSec} vm={selectedVm} api={api}
                artistName={artistName} identity={identity} tiers={tiers} email={email} themeIdx={st.theme} navSections={navSections}
              />
            )}
          </DrawerContent>
        </Drawer>

        {headerModal}
        {publishModal}

        {/* On a phone the toast clears the bottom nav — but a drawer covers
            that nav and would lose its own foot (the composer's Add section)
            under the toast, so while one is up the toast drops from the top,
            which every drawer leaves free. Sonner reads `mobileOffset`, not
            `offset`, below 600px, so the phone value goes to both. */}
        <Toaster
          position={toastTop ? 'top-center' : 'bottom-center'}
          offset={toastOffset}
          mobileOffset={toastOffset}
          toastOptions={{ unstyled: true, style: { zIndex: 100 } }}
        />
      </div>
    </TooltipProvider>
  )
}

const TOOLBAR_BTN = { padding: '5px 8px', borderRadius: '6px', background: 'none', border: 0, lineHeight: 0 }
