// §5–§9 — all state, all chrome, all interaction.
// Deliberately monolithic (§12.11): only SectionRow and EditPanel are extracted.

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  GripVertical, ChevronUp, ChevronDown, ArrowUp, ArrowDown, MoreHorizontal,
  Pencil, ArrowLeftRight, Palette, X, Trash2, ChevronLeft, ChevronRight,
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
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import EncoreSection from './EncoreSection.jsx'
import {
  THEMES, CATS, NVAR, FLAG, FIELDS, TITLES, DEFS, TRACKS, TAGS, TIERS, QUOTES,
  CITIES, REP, PINS, BOOKED, HELD, EXAMPLE_PAGE, BLANK_PAGE,
  NOW_PLAYING, TIER_MODES, SONGS, REP_FILTERS, SONG_TOTAL, PAGES,
  GIGS, MAP_RADIUS, MAP_BASE, MAP_TERMS, GALLERY_SOURCES,
  FORM_PROMISES, FORM_FIELDS, FORM_TYPES, FORM_MESSAGE,
  FOOTER_LINKS, FOOTER_CREDIT,
  CAL_MONTH, CAL_DAYS, CAL_LEAD, CAL_LENGTH, CAL_PICKED, CAL_ENQUIRY,
  catById, catName, contrast, lum, mix, rgba, caseText, fieldDefault,
  headerFamily, layoutCount, designCount,
} from './data.js'

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
 * arbitrary theme so the template gallery (§6) and the swap drawer's
 * header thumbnails (§9.1) can render a theme that is not the active one.
 * ------------------------------------------------------------------ */

// The lightest colour in a set — the surface §10.2 paints its cards on, and
// the ink for type sitting over a photographic scrim. Falls back to the Retro
// off-white when a set is dark on dark.
const paperOf = (bg, tx) =>
  (lum(bg) > lum(tx) ? (lum(bg) > 0.6 ? bg : '#FBF6EA') : (lum(tx) > 0.6 ? tx : '#FBF6EA'))

export function sectionVm({ themeIdx, cat, arch, set, c = {}, artistName, Z, mob, navSections = [] }) {
  const T = THEMES[themeIdx]
  const [bg, ac, tx] = T.sets[set]
  const acFg = contrast(ac)
  const cased = (t) => caseText(t, T.casing)
  const cv = (k, fb) => (c[k] !== undefined ? c[k] : fb)

  const nDesign = designCount(cat, T.name)
  const d = ((arch % nDesign) + nDesign) % nDesign

  // §10.2 sets several labels in a palette hue rather than the text colour.
  // That reads only while the hue separates from the background — in a set
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
    // The lightest colour in the set, for type that always sits over the dark
    // scrim of a photographic hero. Falls back to the Retro off-white when the
    // set is dark on dark.
    paper: paperOf(bg, tx),
    // Type on a `paper` surface must never be `tx`: in sets where the text
    // colour IS the lightest colour (Lime set 2, say) that renders invisible.
    paperFg: contrast(paperOf(bg, tx)),
    paperLine: rgba(contrast(paperOf(bg, tx)), 0.5),
    // The palette's darkest hue, for the panels §10.2 paints near-black
    // (the media player card, the events map band).
    deep: T.tags.reduce((d, h) => (lum(h) < lum(d) ? h : d), T.tags[0]),
    deepFg: contrast(T.tags.reduce((d, h) => (lum(h) < lum(d) ? h : d), T.tags[0])),
    deepFg25: rgba(contrast(T.tags.reduce((d, h) => (lum(h) < lum(d) ? h : d), T.tags[0])), 0.25),

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
  vm.image = c.image

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
  vm.gigs = GIGS.map((g, i) => ({ ...g, hue: legible(T.tags[i % T.tags.length]) }))
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

// §5.7 colour-set swatches — always exactly five.
function buildSets(themeIdx, curIdx) {
  return THEMES[themeIdx].sets.map(([bg, ac], i) => ({
    i,
    grad: `linear-gradient(135deg, ${bg} 50%, ${ac} 50%)`,
    label: `Colour Set ${i + 1}`,
    short: `Set ${i + 1}`,
    ring: i === curIdx ? '#2B6BE4' : '#FFFFFF',
    shadow: i === curIdx ? '0 0 0 2px rgba(43,107,228,.25)' : '0 0 0 2px rgba(0,0,0,.14)',
    on: i === curIdx,
  }))
}

/* ------------------------------------------------------------------ *
 * A scaled, non-interactive render of a section — used for the template
 * gallery previews (§6) and the header thumbnails in the drawer (§9.1).
 * ------------------------------------------------------------------ */

function ScaledPreview({ vm, height, base = 1180, radius = 0, fill = true }) {
  const ref = useRef(null)
  const [w, setW] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => setW(el.clientWidth))
    ro.observe(el)
    setW(el.clientWidth)
    return () => ro.disconnect()
  }, [])
  const scale = w ? w / base : 0
  return (
    <div ref={ref} style={{
      height, overflow: 'hidden', position: 'relative', borderRadius: radius,
      // Shorter layouts leave room below the scaled render; painting the pane in
      // the section's own background keeps it reading as a real page.
      background: fill ? vm.bg : undefined,
    }}>
      <div style={{
        width: base, transform: `scale(${scale})`, transformOrigin: 'top left',
        pointerEvents: 'none', userSelect: 'none',
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

function Swatch({ set, size, onClick, tip, ringW = 2 }) {
  const dot = (
    <span
      className="hv-scale15"
      onClick={onClick}
      style={{
        width: size, height: size, borderRadius: '999px', background: set.grad,
        border: `${ringW}px solid ${set.ring}`, boxShadow: set.shadow, cursor: 'pointer',
        display: 'inline-block', flex: 'none', transition: 'transform .15s',
      }}
    />
  )
  if (!tip) return dot
  return (
    <Tooltip>
      <TooltipTrigger asChild><span style={{ display: 'inline-flex' }}>{dot}</span></TooltipTrigger>
      <TooltipContent>{tip}</TooltipContent>
    </Tooltip>
  )
}

/* ------------------------------------------------------------------ *
 * §8.4 SectionRow — reused verbatim in the sidebar and the mobile sheet
 * ------------------------------------------------------------------ */

function SectionRow({ sec, vm, sets, st, api }) {
  const cn2 = catName(sec.cat)
  const locked = vm.locked
  const openSets = st.setRowFor === sec.id

  return (
    <div>
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
            {vm.subLabel}
          </div>
        </button>

        <Swatch
          set={{ ...sets[sec.set], ring: 'rgba(0,0,0,.18)', shadow: 'none' }}
          size="16px" ringW={1}
          tip={`Colour Set ${sec.set + 1}`}
          onClick={(e) => { stopE(e); api.patch({ setRowFor: openSets ? null : sec.id, menuFor: null }) }}
        />

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
          onOpenChange={(v) => api.patch({ menuFor: v ? sec.id : null, setRowFor: null })}
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
            <DropdownMenuItem style={MENU_ITEM} onSelect={() => api.openSwap(sec.id)}>
              <ArrowLeftRight size={14} /> Swap layout
            </DropdownMenuItem>
            <DropdownMenuItem style={MENU_ITEM} onSelect={() => api.patch({ setRowFor: sec.id, menuFor: null })}>
              <Palette size={14} /> Change colour set
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

      {openSets && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '4px 8px 10px 30px' }}>
          {sets.map((s2) => (
            <span key={s2.i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <Swatch set={s2} size="20px" onClick={(e) => { stopE(e); api.setSection(sec.id, { set: s2.i }) }} />
              <span style={{ fontSize: '9px', fontWeight: 700, color: s2.on ? '#1B1A17' : '#8B887D', textAlign: 'center' }}>{s2.short}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

const MENU_ITEM = { fontSize: '13px', fontWeight: 500, padding: '8px 10px', borderRadius: '7px', gap: '10px' }

/* ------------------------------------------------------------------ *
 * §8.6 Image control — device upload and drag-and-drop only.
 * Nothing here may originate a network request.
 * ------------------------------------------------------------------ */

function ImageField({ value, onChange, onToast }) {
  const inputRef = useRef(null)
  const [over, setOver] = useState(false)

  const take = (file) => {
    if (!file) return
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      onToast('Please choose a PNG or JPG'); return
    }
    if (file.size > 4 * 1024 * 1024) {
      onToast('That image is too large — 4 MB maximum'); return
    }
    const r = new FileReader()
    r.onload = () => onChange(r.result)
    r.readAsDataURL(file)
  }

  return (
    <div onClick={stopE}>
      <input
        ref={inputRef} type="file" accept="image/png,image/jpeg"
        onChange={(e) => { take(e.target.files?.[0]); e.target.value = '' }}
        style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0 }}
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
              type="button" onClick={() => onChange(undefined)}
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

function EditPanel({ sec, vm, sets, api, artistName }) {
  const fields = FIELDS[sec.cat] ?? []
  const locked = vm.locked

  const groupLabel = { fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#8B887D', marginBottom: '8px', display: 'block' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
      <ScrollArea className="flex-1 min-h-0">
        <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* LAYOUT */}
          <div>
            <Label style={groupLabel}>Layout</Label>
            <button
              type="button"
              onClick={(e) => { stopE(e); api.openSwap(sec.id) }}
              className="hover:border-foreground"
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: '10px', border: '1px solid #E2DFD7', background: '#FFFFFF', borderRadius: '9px',
                padding: '10px 12px', cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{vm.layoutLabel}</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#8B887D', display: 'inline-flex', alignItems: 'center', gap: '5px', flex: 'none' }}>
                Swap <ArrowLeftRight size={12} />
              </span>
            </button>
          </div>

          {/* COLOUR SET */}
          <div>
            <Label style={groupLabel}>Colour set</Label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '7px' }}>
              {sets.map((s2) => (
                <button
                  key={s2.i} type="button" title={s2.label}
                  onClick={(e) => { stopE(e); api.setSection(sec.id, { set: s2.i }) }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', background: 'none', border: 0, padding: 0, cursor: 'pointer' }}
                >
                  <span className="hv-scale12" style={{
                    width: '28px', height: '28px', borderRadius: '999px', background: s2.grad,
                    border: `2px solid ${s2.ring}`, boxShadow: s2.shadow, transition: 'transform .15s',
                  }} />
                  <span style={{ fontSize: '10px', fontWeight: 700, color: s2.on ? '#1B1A17' : '#8B887D' }}>{s2.short}</span>
                </button>
              ))}
            </div>
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
                      <Label style={{ fontSize: '11px', fontWeight: 600, color: '#6B685E', display: 'block', marginBottom: '5px' }}>{f.l}</Label>
                      {f.type === 'image' ? (
                        <ImageField value={sec.c[f.k]} onChange={(v) => set(v)} onToast={api.toast} />
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
 * §9.1 Drawer bodies
 * ------------------------------------------------------------------ */

function Wireframe({ arch }) {
  const m = arch % 3
  const box = { background: '#F3F2EE', borderRadius: '8px', height: '86px', padding: '12px', display: 'flex' }
  if (m === 0) {
    return (
      <div style={{ ...box, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
        <span style={{ height: '9px', width: '70%', background: '#C9C6BB', borderRadius: '3px' }} />
        <span style={{ height: '5px', width: '50%', background: '#DDDAD1', borderRadius: '3px' }} />
        <span style={{ display: 'flex', gap: '5px', marginTop: '2px' }}>
          <span style={{ width: '26px', height: '9px', background: '#B4B1A5', borderRadius: '3px' }} />
          <span style={{ width: '26px', height: '9px', background: '#DDDAD1', borderRadius: '3px' }} />
        </span>
      </div>
    )
  }
  if (m === 1) {
    return (
      <div style={{ ...box, gap: '8px' }}>
        <span style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px' }}>
          <span style={{ height: '8px', width: '90%', background: '#C9C6BB', borderRadius: '3px' }} />
          <span style={{ height: '5px', width: '70%', background: '#DDDAD1', borderRadius: '3px' }} />
          <span style={{ height: '9px', width: '34px', background: '#B4B1A5', borderRadius: '3px' }} />
        </span>
        <span style={{ flex: 1, background: '#DDDAD1', borderRadius: '5px' }} />
      </div>
    )
  }
  return (
    <div style={{ ...box, gap: '5px', alignItems: 'center' }}>
      {[['70%', '#DDDAD1'], ['90%', '#C9C6BB'], ['70%', '#DDDAD1']].map(([h, c], i) => (
        <span key={i} style={{ flex: 1, height: h, background: c, borderRadius: '5px' }} />
      ))}
    </div>
  )
}

function LayoutGrid({ cat, current, themeIdx, setIdx, artistName, onPick }) {
  const n = layoutCount(cat, THEMES[themeIdx].name)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
      {Array.from({ length: n }, (_, i) => {
        const isCur = i === current
        return (
          <button
            key={i} type="button" onClick={(e) => { stopE(e); onPick(i) }}
            className="hover:border-foreground"
            style={{
              border: `1.5px solid ${isCur ? '#2B6BE4' : '#E8E6DF'}`,
              background: isCur ? '#F2F6FE' : '#FFFFFF', borderRadius: '12px', padding: '10px',
              transition: 'border-color .15s', cursor: 'pointer', textAlign: 'left',
              // The header thumbnail renders at 1180px before scaling, so the
              // track must not size to its intrinsic width.
              minWidth: 0,
            }}
          >
            {cat === 'header' ? (
              <ScaledPreview
                height="86px" radius={8}
                vm={sectionVm({
                  themeIdx, cat: 'header', arch: i, set: setIdx, c: {}, artistName,
                  Z: SIZES.desktop, mob: false, navSections: ['Music', 'Shows', 'Book'],
                })}
              />
            ) : <Wireframe arch={i} />}
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginTop: '9px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#8B887D', border: '1px solid #DDDAD1', borderRadius: '5px', padding: '1px 5px', flex: 'none' }}>{i + 1}</span>
              <span style={{ flex: 1, fontSize: '12px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {catName(cat)} layout {i + 1}
              </span>
              {isCur && <Check size={11} style={{ color: '#2B6BE4', flex: 'none' }} />}
            </div>
          </button>
        )
      })}
    </div>
  )
}

function CategoryList({ present, themeName, onPick }) {
  // header and footer never appear — they are mandatory and always present.
  const rows = CATS.filter((c) => c.id !== 'header' && c.id !== 'footer')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {rows.map((c) => {
        const added = present.includes(c.id)
        const n = layoutCount(c.id, themeName)
        return (
          <button
            key={c.id} type="button"
            onClick={(e) => { stopE(e); if (!added) onPick(c.id) }}
            aria-disabled={added || undefined}
            className={added ? '' : 'hv-cat hover:bg-accent'}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', borderRadius: '10px',
              opacity: added ? 0.45 : 1, cursor: added ? 'default' : 'pointer',
              background: 'none', border: 0, textAlign: 'left', width: '100%',
            }}
          >
            <span style={{ flex: 1, fontSize: '14px', fontWeight: 600 }}>{c.name}</span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#8B887D', background: '#F1EFEA', borderRadius: '99px', padding: '3px 9px', flex: 'none' }}>
              {added ? 'Added' : `${n} ${n === 1 ? 'layout' : 'layouts'}`}
            </span>
            {!added && <ChevronRight size={14} style={{ color: '#B9B6AA', flex: 'none' }} />}
          </button>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * §6 Stage 1 — Template gallery
 * ------------------------------------------------------------------ */

function TemplateStage({ artistName, onPick }) {
  return (
    <div className="dark" style={{
      minHeight: '100dvh', background: '#131311', color: '#F4F2EC', fontFamily: "'Archivo', sans-serif",
      padding: 'clamp(40px,8vw,72px) 20px 96px', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <span style={{ fontFamily: "'Alfa Slab One', serif", fontSize: '22px', letterSpacing: '.5px' }}>encore</span>
      <h1 style={{ margin: '36px 0 0', fontSize: 'clamp(30px,7vw,44px)', fontWeight: 800, letterSpacing: '-1px', textAlign: 'center' }}>
        Select a template to start
      </h1>
      <p style={{ margin: '14px 0 0', fontSize: 'clamp(14px,3.8vw,16px)', color: '#A9A69C', maxWidth: '520px', lineHeight: 1.5, textAlign: 'center' }}>
        Five complete identities. Pick one — you can change it at any time.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '48px', maxWidth: '1240px' }}>
        {THEMES.map((t, i) => (
          <button
            key={t.name} type="button" onClick={() => onPick(i)}
            className="hv-lift"
            style={{
              width: '288px', borderRadius: '16px', background: '#1D1D1A', border: '1px solid #2B2B27',
              overflow: 'hidden', padding: 0, cursor: 'pointer', textAlign: 'left', color: 'inherit',
              transition: 'transform .2s, border-color .2s, box-shadow .2s',
            }}
          >
            {/* A realistic miniature of this template's own header design (§6). */}
            <ScaledPreview
              height="216px"
              vm={sectionVm({
                themeIdx: i, cat: 'header', arch: 0, set: 0, c: {}, artistName,
                Z: SIZES.desktop, mob: false, navSections: ['About', 'Music', 'Shows', 'Book'],
              })}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 18px' }}>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: '15px', fontWeight: 700 }}>{t.name}</span>
                <span style={{ display: 'block', fontSize: '11px', color: '#8E8B81' }}>{t.sub}</span>
              </span>
              <span style={{ display: 'flex', gap: '4px', flex: 'none' }}>
                {t.sets.map(([bg], j) => (
                  <span key={j} style={{ width: '12px', height: '12px', borderRadius: '999px', background: bg, border: '1px solid rgba(255,255,255,.25)' }} />
                ))}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * §7 Stage 2 — Theme Example or Blank
 * ------------------------------------------------------------------ */

function StartStage({ themeIdx, onBack, onStart }) {
  const T = THEMES[themeIdx]
  const bar = (h, label, set) => {
    const [bg, , tx] = T.sets[set]
    return (
      <div key={label + h} style={{
        height: h, background: bg, color: tx, borderRadius: '3px', padding: '0 9px',
        display: 'flex', alignItems: 'center', fontSize: '8px', letterSpacing: '.6px',
        textTransform: 'uppercase', opacity: 0.95, flex: 'none',
      }}>{label}</div>
    )
  }

  const card = (title, desc, thumb, onClick) => (
    <button
      type="button" onClick={onClick} className="hv-lift"
      style={{
        width: '300px', borderRadius: '14px', background: '#1D1D1A', border: '1px solid #2B2B27',
        overflow: 'hidden', padding: 0, cursor: 'pointer', textAlign: 'left', color: 'inherit',
        transition: 'transform .2s, border-color .2s, box-shadow .2s',
      }}
    >
      <div style={{ height: '238px', padding: '12px 12px 0', display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {thumb}
      </div>
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ fontSize: '14px', fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: '11px', color: '#8E8B81', lineHeight: 1.45, marginTop: '4px' }}>{desc}</div>
      </div>
    </button>
  )

  return (
    <div className="dark" style={{
      minHeight: '100dvh', background: '#131311', color: '#F4F2EC', fontFamily: "'Archivo', sans-serif",
      padding: 'clamp(28px,6vw,56px) 20px 96px', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ width: '100%', maxWidth: '1240px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button
          type="button" onClick={onBack}
          className="dark:hover:text-foreground dark:hover:border-muted-foreground"
          style={{
            fontSize: '13px', fontWeight: 600, color: '#A9A69C', padding: '7px 14px',
            border: '1px solid #2B2B27', borderRadius: '99px', background: 'none', cursor: 'pointer',
          }}
        >‹ Templates</button>
        <span style={{ fontSize: '13px', color: '#8E8B81' }}>
          Template: <b style={{ color: '#F4F2EC', fontWeight: 700 }}>{T.name}</b>
        </span>
      </div>

      <h1 style={{ margin: '40px 0 0', fontSize: 'clamp(28px,6.5vw,40px)', fontWeight: 800, letterSpacing: '-1px', textAlign: 'center' }}>
        How do you want to start?
      </h1>
      <p style={{ margin: '14px 0 0', fontSize: 'clamp(14px,3.8vw,16px)', color: '#A9A69C', maxWidth: '560px', lineHeight: 1.5, textAlign: 'center' }}>
        Start from a filled-in example, or from an empty page. Either way you can add, remove and reorder sections afterwards.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '44px' }}>
        {card(
          'Theme Example',
          'A complete seven-section page with demo content, ready to edit.',
          EXAMPLE_PAGE.map(([cat, , set]) =>
            bar(cat === 'header' ? '46px' : cat === 'footer' ? '20px' : '28px', catName(cat), set)),
          () => onStart(EXAMPLE_PAGE),
        )}
        {card(
          'Blank',
          'Just a header and a footer. Build the page yourself.',
          [
            bar('46px', 'Header', 0),
            <div key="gap" style={{
              flex: 1, border: '1.5px dashed #3A3A34', borderRadius: '3px', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#6B685E',
            }}>Your sections go here</div>,
            bar('20px', 'Footer', 4),
          ],
          () => onStart(BLANK_PAGE),
        )}
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
    defs.map(([cat, arch, set]) => ({ id: ++uidRef.current, cat, arch, set, c: {} })), [])

  const [st, setSt] = useState(() => {
    const ti = THEMES.map((t) => t.name).indexOf(startTheme)
    const base = {
      device: 'desktop', drawer: null, drawerCat: null, swapFor: null, menuFor: null,
      setRowFor: null, canvasSetFor: null, hoverId: null, selectedId: null,
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

  const closeAll = useCallback(() => patch({ menuFor: null, setRowFor: null, canvasSetFor: null, selectedId: null }), [patch])

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
    setRowFor: null,
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
      const sec = { id: ++uidRef.current, cat, arch, set: (s.sections.length - 1) % 5, c: {} }
      const next = s.sections.slice()
      next.splice(next.length - 1, 0, sec)   // immediately before the footer
      return { sections: next, drawer: null, drawerCat: null }
    })
    if (added) toast(`${catName(cat)} added`)
  }, [patch, toast])

  const openEdit = useCallback((id) => patch(
    isMobile ? { selectedId: id, editSheet: true, sheet: null, menuFor: null, setRowFor: null }
             : { selectedId: id, menuFor: null, setRowFor: null },
  ), [patch, isMobile])

  const openSwap = useCallback((id) => patch((s) => {
    const sec = s.sections.find((x) => x.id === id)
    return { drawer: 'swap', swapFor: id, drawerCat: sec?.cat ?? null, menuFor: null, setRowFor: null, editSheet: false, sheet: null }
  }), [patch])

  const api = { patch, move, setContent, setSection, del, openEdit, openSwap, toast }

  /* ---- per-section view-model (§5.7) ------------------------------- */

  const makeVm = (sec, i, arr) => {
    const cat = catById(sec.cat)
    const selected = st.selectedId === sec.id
    const hovered = st.hoverId === sec.id
    const up = canMove(arr, sec.id, -1)
    const down = canMove(arr, sec.id, 1)
    const [bg, ac] = T.sets[sec.set]
    return {
      ...sectionVm({ themeIdx: st.theme, cat: sec.cat, arch: sec.arch, set: sec.set, c: sec.c, artistName, Z, mob: Z === SIZES.mobile || isMobile || st.device === 'mobile', navSections }),
      layoutLabel: `${cat.name} layout ${sec.arch + 1}`,
      subLabel: `${cat.name} layout ${sec.arch + 1} · Colour Set ${sec.set + 1}`,
      overlayLabel: cat.name + (selected ? ' · editing' : ''),
      dot: `linear-gradient(135deg, ${bg} 50%, ${ac} 50%)`,
      showOverlay: hovered || st.canvasSetFor === sec.id || selected,
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
  const swapSec = sections.find((s) => s.id === st.swapFor) ?? null

  /* ---- stages 1 & 2 ------------------------------------------------ */

  if (st.stage === 'template') {
    return (
      <TemplateStage artistName={artistName} onPick={(i) => patch({ stage: 'start', theme: i })} />
    )
  }
  if (st.stage === 'start') {
    return (
      <StartStage
        themeIdx={st.theme}
        onBack={() => patch({ stage: 'template' })}
        onStart={(defs) => patch({ stage: 'editor', sections: buildPage(defs) })}
      />
    )
  }

  /* ---- shared fragments -------------------------------------------- */

  const sets = (curIdx) => buildSets(st.theme, curIdx)

  const sectionList = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {sections.map((sec, i) => (
        <SectionRow key={sec.id} sec={sec} vm={vms[i]} sets={sets(sec.set)} st={st} api={api} />
      ))}
    </div>
  )

  const addBtn = (
    <button
      type="button"
      onClick={(e) => { stopE(e); patch({ drawer: 'add', drawerCat: null, swapFor: null, sheet: null }) }}
      className="hover:border-foreground"
      style={{
        width: '100%', border: '1.5px dashed #C9C6BB', borderRadius: '10px', padding: '11px',
        textAlign: 'center', fontSize: '13px', fontWeight: 600, color: '#5B5850',
        background: 'none', cursor: 'pointer',
      }}
    >+ Add section</button>
  )

  const drawerTitle = st.drawer === 'swap'
    ? `Swap layout — ${catName(st.drawerCat)}`
    : st.drawerCat ? `${catName(st.drawerCat)} layouts` : 'Add a section'

  const drawerBody = st.drawer === 'add' && !st.drawerCat
    ? <CategoryList present={present} themeName={T.name} onPick={(cat) => patch({ drawerCat: cat })} />
    : (
      <LayoutGrid
        cat={st.drawerCat}
        current={st.drawer === 'swap' ? swapSec?.arch ?? -1 : -1}
        themeIdx={st.theme}
        setIdx={st.drawer === 'swap' ? swapSec?.set ?? 0 : 0}
        artistName={artistName}
        onPick={(i) => {
          if (st.drawer === 'swap') { setSection(st.swapFor, { arch: i }); patch({ drawer: null, drawerCat: null, swapFor: null }) }
          else addSection(st.drawerCat, i)
        }}
      />
    )

  const drawerHeader = (close) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 18px', borderBottom: '1px solid #EEECE6', flex: 'none' }}>
      {st.drawer === 'add' && st.drawerCat && (
        <button type="button" aria-label="Back" onClick={(e) => { stopE(e); patch({ drawerCat: null }) }}
          style={{ background: 'none', border: 0, cursor: 'pointer', color: '#5B5850', lineHeight: 0 }}>
          <ChevronLeft size={16} />
        </button>
      )}
      <span style={{ flex: 1, fontSize: '15px', fontWeight: 700 }}>{drawerTitle}</span>
      <button type="button" aria-label="Close" onClick={(e) => { stopE(e); close() }}
        style={{ background: 'none', border: 0, cursor: 'pointer', color: '#5B5850', lineHeight: 0 }}>
        <X size={16} />
      </button>
    </div>
  )

  const closeDrawer = () => patch({ drawer: null, drawerCat: null, swapFor: null })

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
            <button type="button" aria-label="Back to start options"
              onClick={(e) => { stopE(e); patch({ stage: 'start', selectedId: null, menuFor: null, drawer: null, drawerCat: null }) }}
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
                <button type="button" aria-label="Back to start options"
                  onClick={(e) => { stopE(e); patch({ stage: 'start', selectedId: null, menuFor: null, drawer: null, drawerCat: null }) }}
                  className="hover:bg-muted"
                  style={{ fontSize: '16px', fontWeight: 600, color: '#5B5850', padding: '4px 11px', borderRadius: '8px', border: '1px solid #D8D5CC', background: '#FFFFFF', cursor: 'pointer' }}
                >‹</button>
              </TooltipTrigger>
              <TooltipContent>Back to start options</TooltipContent>
            </Tooltip>

            <span style={{ fontFamily: "'Alfa Slab One', serif", fontSize: '17px' }}>encore</span>
            <span style={{ width: '1px', height: '24px', background: '#E2DFD7' }} />

            {/* Theme switcher — a labelled control, not decoration. */}
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#8B887D' }}>Theme</span>
              <span style={{ display: 'flex', gap: '6px' }}>
                {THEMES.map((t, i) => {
                  const [bg, ac] = t.sets[0]
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
                  <EditPanel sec={selectedSec} vm={selectedVm} sets={sets(selectedSec.set)} api={api} artistName={artistName} />
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
                  <div style={{ padding: '12px', flex: 'none' }}>{addBtn}</div>
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
                    onClick={(e) => { stopE(e); patch({ selectedId: sec.id, menuFor: null, setRowFor: null }) }}
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
                          {st.canvasSetFor === sec.id && (
                            <>
                              {sets(sec.set).map((s2) => (
                                <Swatch key={s2.i} set={s2} size="17px" tip={s2.label}
                                  onClick={(e) => { stopE(e); setSection(sec.id, { set: s2.i }) }} />
                              ))}
                              <Separator orientation="vertical" style={{ height: '18px', background: '#E4E2DC', margin: '0 3px' }} />
                            </>
                          )}
                          <IconBtn tip="Edit content" style={TOOLBAR_BTN} className="hover:bg-muted"
                            onClick={(e) => { stopE(e); openEdit(sec.id) }}><Pencil size={13} /></IconBtn>
                          <IconBtn tip="Swap layout" style={TOOLBAR_BTN} className="hover:bg-muted"
                            onClick={(e) => { stopE(e); openSwap(sec.id) }}><ArrowLeftRight size={13} /></IconBtn>
                          <IconBtn tip="Colour set" style={TOOLBAR_BTN} className="hover:bg-muted"
                            onClick={(e) => { stopE(e); patch({ canvasSetFor: st.canvasSetFor === sec.id ? null : sec.id, selectedId: sec.id }) }}><Palette size={13} /></IconBtn>
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
              [Plus, 'Add', () => patch({ drawer: 'add', drawerCat: null, swapFor: null, sheet: null }), !!st.drawer],
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

        {/* §9.1 Add / Swap — sheet on desktop, drawer on mobile */}
        {!isMobile && (
          <Sheet open={!!st.drawer} onOpenChange={(v) => { if (!v) closeDrawer() }}>
            <SheetContent
              side="right" showCloseButton={false} onClick={stopE}
              className="p-0 gap-0 sm:max-w-none"
              style={{ width: '430px', maxWidth: '92vw', background: '#FFFFFF', boxShadow: '-16px 0 44px rgba(20,18,12,.2)', display: 'flex', flexDirection: 'column' }}
            >
              <SheetTitle className="sr-only">{drawerTitle}</SheetTitle>
              <SheetDescription className="sr-only">Choose a section layout</SheetDescription>
              {drawerHeader(closeDrawer)}
              <ScrollArea className="flex-1 min-h-0">
                <div style={{ padding: '14px 16px 24px' }}>{drawerBody}</div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        )}
        {isMobile && (
          <Drawer open={!!st.drawer} onOpenChange={(v) => { if (!v) closeDrawer() }}>
            <DrawerContent onClick={stopE} className={`${PILL} !max-h-[82vh]`} style={{ ...sheetShell, height: '82vh' }}>
              <DrawerTitle className="sr-only">{drawerTitle}</DrawerTitle>
              <DrawerDescription className="sr-only">Choose a section layout</DrawerDescription>
              {drawerHeader(closeDrawer)}
              <ScrollArea className="flex-1 min-h-0">
                <div style={{ padding: '14px 16px 24px' }}>{drawerBody}</div>
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
                  const [bg, ac] = t.sets[0]
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
              <EditPanel sec={selectedSec} vm={selectedVm} sets={sets(selectedSec.set)} api={api} artistName={artistName} />
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
