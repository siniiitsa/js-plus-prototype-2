// §5–§9 — all state, all chrome, all interaction.
// Deliberately monolithic (§12.11): only SectionRow and EditPanel are extracted.

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  GripVertical, ChevronUp, ChevronDown, ArrowUp, ArrowDown, MoreHorizontal,
  Pencil, Palette, X, Trash2, ChevronLeft,
  Layers, Plus, Check, Upload, Lock,
} from 'lucide-react'
import { toast as sonnerToast, Toaster } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
  CITIES, REP, PINS, BOOKED, HELD, EXAMPLE_PAGE,
  NOW_PLAYING, TIER_MODES, SONGS, REP_FILTERS, SONG_TOTAL, PAGES,
  GIGS, MAP_RADIUS, MAP_BASE, MAP_TERMS, GALLERY_SOURCES,
  FORM_PROMISES, FORM_FIELDS, FORM_TYPES, FORM_MESSAGE,
  FOOTER_LINKS, FOOTER_CREDIT,
  CAL_MONTH, CAL_DAYS, CAL_LEAD, CAL_LENGTH, CAL_PICKED, CAL_ENQUIRY,
  catById, catName, contrast, lum, mix, rgba, caseText, fieldDefault,
  headerFamily, layoutCount, designCount,
} from './data.js'
import { defaultImage, defaultImages, RETRO_HERO_PORTRAIT, RETRO_TEXTURE } from './photos.js'

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
  mobile:  { dispXl: '46px',  dispLg: '40px', dispSm: '26px', title: '18px', labelMd: '13px', labelXs: '12px', eyebrow: '11px', gPad: '20px', gGap: '18px', padY: '44px', padX: '22px', narrow: true },
  tablet:  { dispXl: '72px',  dispLg: '64px', dispSm: '34px', title: '22px', labelMd: '16px', labelXs: '14px', eyebrow: '13px', gPad: '32px', gGap: '28px', padY: '56px', padX: '40px', narrow: true },
  desktop: { dispXl: '105px', dispLg: '79px', dispSm: '33px', title: '20px', labelMd: '16px', labelXs: '14px', eyebrow: '12px', gPad: '46px', gGap: '36px', padY: '80px', padX: '64px', narrow: false },
}
for (const k of Object.keys(SIZES)) Object.assign(SIZES[k], RAMP[k])

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

export function sectionVm({ themeIdx, cat, arch, c = {}, artistName, Z, mob, navSections = [] }) {
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
  // The hero portrait card is its own crop in Figma, but only until the user
  // uploads: once c.image is set it fills the card too, as it always has.
  vm.portrait = c.image !== undefined ? (c.image ?? undefined)
    : (cat === 'header' && T.name === 'Retro' ? RETRO_HERO_PORTRAIT : undefined)
  // Multi-photo sections (gallery strip, media artwork). Slot n fills tile n;
  // an empty slot falls through to the section's initials placeholder. An
  // explicitly emptied array is already distinguishable, so no sentinel is needed.
  vm.images = Array.isArray(c.images) ? c.images : (defaultImages(cat, T.name) ?? [])
  // Fixed Retro decoration — paper grain and the events-map raster (§10.2).
  vm.grainSrc = T.name === 'Retro' ? RETRO_TEXTURE.grain : undefined
  vm.mapSrc = T.name === 'Retro' ? RETRO_TEXTURE.map : undefined

  // Nav collapses to the fixed triple on mobile regardless of navMode (§10.2).
  const MINIMAL = ['Music', 'Shows', 'Book']
  vm.navLinks = mob || vm.navMode === 'minimal' ? MINIMAL : navSections

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
  vm.tierModes = TIER_MODES
  vm.tiers = TIERS.map((t, i) => {
    // §10.2 paints the three cards in three different palette hues rather than
    // one accent. Walking T.tags backwards from index 3 lands on olive, gold,
    // orange under Retro — the reference order — and stays in-palette elsewhere.
    const card = T.tags[((3 - i) % T.tags.length + T.tags.length) % T.tags.length]
    const base = {
      name: cv(`t${i + 1}n`, t.name), price: cv(`t${i + 1}p`, t.price),
      blurb: t.blurb, feats: t.feats,
      card, cardFg: contrast(card), cardMut: rgba(contrast(card), 0.72),
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

  // repertoire
  vm.rep = REP.map((g) => ({ genre: cased(g.genre), items: g.items }))
  vm.repFlat = REP.flatMap((g) => g.items.map((t) => ({ t, g: g.genre })))
  vm.songs = SONGS.map(([title, artist], i) => ({ n: i + 1, title, artist: cased(artist) }))
  vm.repFilters = REP_FILTERS.map((l) => cased(l))
  vm.repHue = legible(T.tags[3 % T.tags.length])
  vm.songTotal = SONG_TOTAL
  vm.pages = PAGES

  // gallery
  vm.gal = ['01', '02', '03', '04', '05', '06']
  vm.gal4 = vm.gal.slice(0, 4)
  vm.gallerySources = GALLERY_SOURCES.map((l, i) => {
    const cbg = T.tags[i % T.tags.length]
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
  vm.footerStatement = cased(cv('statement', "Let's make your night unforgettable."))
  vm.footerLinks = FOOTER_LINKS.map((col) => col.map((l) => cased(l)))
  vm.footerCredit = FOOTER_CREDIT

  vm[FLAG[cat]] = true
  return vm
}

/* ------------------------------------------------------------------ *
 * A scaled, non-interactive render of a section — used for the template
 * gallery previews (§6) and the layout-dropdown thumbnails (§9.1).
 * ------------------------------------------------------------------ */

function ScaledPreview({ vm, height, autoMax = 0, base = 1180, radius = 0, fill = true, center = false }) {
  const ref = useRef(null)
  const inRef = useRef(null)
  // w/h are the pane, ch the unscaled height of the render inside it. A
  // transform does not affect layout, so measuring ch cannot feed back.
  const [box, setBox] = useState({ w: 0, h: 0, ch: 0 })
  useEffect(() => {
    const el = ref.current
    const ie = inRef.current
    if (!el) return
    const read = () => setBox({ w: el.clientWidth, h: el.clientHeight, ch: ie ? ie.scrollHeight : 0 })
    const ro = new ResizeObserver(read)
    ro.observe(el)
    if (ie) ro.observe(ie)
    read()
    return () => ro.disconnect()
  }, [])
  const scale = box.w ? box.w / base : 0
  // §6 — the template picker frames every theme identically, so a header that
  // renders shorter than the frame is centred in it rather than dropped to the
  // top with all the slack below.
  const top = center && box.ch ? Math.round((box.h - box.ch * scale) / 2) : 0
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
        ...(center ? { position: 'absolute', top, left: 0 } : null),
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
 * §8.4 SectionRow — reused verbatim in the sidebar and the mobile sheet
 * ------------------------------------------------------------------ */

function SectionRow({ sec, vm, st, api }) {
  const cn2 = catName(sec.cat)
  const locked = vm.locked

  return (
    <div
      className="hv-row hover:bg-accent"
      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 8px', borderRadius: '9px' }}
    >
      {locked
        ? <Lock size={12} style={{ color: '#DDDAD1', cursor: 'default', flex: 'none' }} />
        : <GripVertical size={14} style={{ color: '#B9B6AA', cursor: 'grab', flex: 'none' }} />}

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
 * §8.5 EditPanel — shared by the sidebar and the mobile edit sheet
 * ------------------------------------------------------------------ */

function EditPanel({ sec, vm, api, artistName, themeIdx, navSections }) {
  const fields = FIELDS[sec.cat] ?? []
  const locked = vm.locked

  // The panel has to resolve the seeded photos exactly as sectionVm does, or a
  // Retro section would show a photo on the canvas and an empty dropzone here.
  const themeName = THEMES[themeIdx].name
  const imgVal = (k) => (sec.c[k] !== undefined ? (sec.c[k] ?? undefined) : defaultImage(sec.cat, themeName))
  const imgsVal = (k) => (Array.isArray(sec.c[k]) ? sec.c[k] : defaultImages(sec.cat, themeName))

  const groupLabel = { fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#8B887D', marginBottom: '8px', display: 'block' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
      <ScrollArea className="flex-1 min-h-0">
        <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* LAYOUT */}
          <div>
            <Label style={groupLabel}>Layout</Label>
            <LayoutPicker
              cat={sec.cat} arch={sec.arch} content={sec.c}
              themeIdx={themeIdx} artistName={artistName} navSections={navSections}
              onPick={(i) => api.setSection(sec.id, { arch: i })}
            />
          </div>

          {/* CONTENT */}
          <div>
            <Label style={groupLabel}>Content</Label>
            {fields.length === 0 ? (
              <p style={{ margin: 0, fontSize: '12px', color: '#98958A', lineHeight: 1.5 }}>
                This section has no editable content — its copy comes from the artist profile.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {fields.map((f) => {
                  const fallback = f.k === 'title' && sec.cat === 'header' ? artistName : fieldDefault(f)
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
  const n = layoutCount(cat, THEMES[themeIdx].name)

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
            {`${catName(cat)} layout ${arch + 1}`}
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
                  {`${catName(cat)} layout ${i + 1}`}
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
 * One spotlight preview of the highlighted template, its name above it and
 * a filmstrip of all five below. Clicking the spotlight asks to confirm;
 * confirming drops straight into the editor on the Theme Example page.
 * ------------------------------------------------------------------ */

// The nav links a header preview shows: the same derivation the editor uses,
// applied to the page the picker is about to build (§4.8).
const PREVIEW_NAV = EXAMPLE_PAGE
  .filter(([cat]) => cat !== 'header' && cat !== 'footer')
  .map(([cat]) => catName(cat))

// Every frame in the picker uses one aspect: the desktop canvas against the
// tallest header render (Retro's photographic layout 1). The four flat themes
// come out shorter and are centred in it.
const SPOT_ASPECT = '1180 / 614'

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
  const [confirming, setConfirming] = useState(false)

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

          {/* The whole frame is the "use it" target, but as a sibling of the
              confirm overlay rather than its parent — no control inside a control. */}
          {!confirming ? (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              aria-label={`Use the ${THEMES[spot].name} template`}
              style={{
                position: 'absolute', inset: 0, background: 'none', border: 0,
                padding: 0, cursor: 'pointer',
              }}
            />
          ) : (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
              justifyContent: 'center', flexDirection: 'column', gap: '18px',
              background: 'rgba(19,19,17,.78)',
            }}>
              <span style={{ fontWeight: 800, fontSize: 'clamp(18px,3vw,26px)' }}>Use this template?</span>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => onPick(spot)}
                  style={{
                    background: '#F4F2EC', color: '#131311', border: 0, borderRadius: '99px',
                    padding: '12px 28px', fontSize: '15px', fontWeight: 800, cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >Yes, use it</button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  style={{
                    background: 'transparent', color: '#F4F2EC', border: '1px solid #F4F2EC',
                    borderRadius: '99px', padding: '12px 28px', fontSize: '15px', fontWeight: 800,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >Keep browsing</button>
              </div>
            </div>
          )}
        </div>

        {/* Filmstrip — picking one re-spotlights it and drops any open confirm. */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
          {THEMES.map((t, i) => (
            <button
              key={t.name} type="button"
              onClick={() => { setSpot(i); setConfirming(false) }}
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

  // §4.8 — nav links follow the optional sections currently on the page.
  const navSections = sections
    .filter((s) => s.cat !== 'header' && s.cat !== 'footer')
    .map((s) => catName(s.cat))

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

  const api = { patch, move, setContent, setSection, del, openEdit, toast }

  /* ---- per-section view-model (§5.7) ------------------------------- */

  const makeVm = (sec, i, arr) => {
    const cat = catById(sec.cat)
    const selected = st.selectedId === sec.id
    const hovered = st.hoverId === sec.id
    const up = canMove(arr, sec.id, -1)
    const down = canMove(arr, sec.id, 1)
    return {
      ...sectionVm({ themeIdx: st.theme, cat: sec.cat, arch: sec.arch, c: sec.c, artistName, Z, mob: Z === SIZES.mobile || isMobile || st.device === 'mobile', navSections }),
      layoutLabel: `${cat.name} layout ${sec.arch + 1}`,
      overlayLabel: cat.name + (selected ? ' · editing' : ''),
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

  /* ---- stage 1 ------------------------------------------------------ */

  if (st.stage === 'template') {
    return (
      <TemplateStage
        artistName={artistName}
        spotIdx={st.theme}
        onPick={(i) => patch({ stage: 'editor', theme: i, sections: buildPage(EXAMPLE_PAGE) })}
      />
    )
  }

  /* ---- shared fragments -------------------------------------------- */

  const sectionList = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {sections.map((sec, i) => (
        <SectionRow key={sec.id} sec={sec} vm={vms[i]} st={st} api={api} />
      ))}
    </div>
  )

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
              onClick={(e) => { stopE(e); patch({ stage: 'template', selectedId: null, menuFor: null, add: null }) }}
              className="hover:bg-muted"
              style={{ fontSize: '16px', fontWeight: 600, color: '#5B5850', padding: '3px 9px', borderRadius: '8px', border: '1px solid #D8D5CC', background: '#FFFFFF', cursor: 'pointer' }}
            >‹</button>
            <span style={{ fontFamily: "'Alfa Slab One', serif", fontSize: '16px' }}>encore</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#6B685E' }}>{T.name}</span>
            <span style={{ flex: 1 }} />
            <button type="button" onClick={(e) => { stopE(e); toast('Published to kaimercer.encore.site (demo)') }}
              className="hover:bg-primary/90"
              style={{ fontSize: '12px', fontWeight: 700, padding: '7px 14px', borderRadius: '9px', background: '#1B1A17', color: '#FFFFFF', border: 0, cursor: 'pointer' }}
            >Publish</button>
          </div>
        ) : (
          <div style={{ height: '56px', flex: 'none', background: '#FFFFFF', borderBottom: '1px solid #E2DFD7', display: 'flex', alignItems: 'center', gap: '16px', padding: '0 16px', zIndex: 40 }}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" aria-label="Back to templates"
                  onClick={(e) => { stopE(e); patch({ stage: 'template', selectedId: null, menuFor: null, add: null }) }}
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

            <button type="button" onClick={(e) => { stopE(e); toast('Published to kaimercer.encore.site (demo)') }}
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
            flex: 1, overflowY: 'auto', background: '#E4E1DA',
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
