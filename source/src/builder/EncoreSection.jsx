// §10 — the section renderer. Purely presentational: every value arrives
// precomputed on `s` (§5.7) and this file does zero colour maths.
//
// Deliberately uses NO shadcn components and NO Tailwind utility classes
// (§2, §12.9–12.10): sections are painted with arbitrary hex values chosen
// at runtime, which a static utility class cannot express. The only class
// names permitted here are the three §3.3 rules that read the `--ac` /
// `--acFg` custom properties set on the section root.
//
// lucide-react is the one component/style import: its icons inherit
// `currentColor`, so they stay theme-driven, and each takes the px size given
// in the spec rather than a `size-*` class. React itself is imported for
// `useId` and — since Repertoire's search and chips, then the header's burger
// menu, then the media player's transport, then the gallery's arrows and
// thumbnail strip, then the events map's pager and its pin/row pairing, then
// the pricing section's filter chips, then the booking calendar's month
// arrows and its day picking, and now the enquiry form's boxes, its
// event-type chips and its submit
// became real controls on the published page — for `useState`,
// which is gated on `s.live` throughout (§12.7: the editor canvas stays a
// picture of a website). `useRef` joined them for the media player's one
// <audio> element, which has to be commanded rather than described: its
// source is assigned imperatively so a re-render cannot reload it, and
// Safari will not honour autoplay on a freshly mounted element. That is the
// whole of this file's React surface; there is still no effect anywhere in
// it, because every clock the player reads arrives as an event prop.

import { useId, useRef, useState } from 'react'
import {
  Play, Pause, SkipBack, SkipForward, Check, ChevronLeft, ChevronRight,
  ArrowLeft, ArrowRight, ArrowUpRight, Star, Plus, X, Search,
  Image as ImageIcon, Youtube, Instagram, Music2,
} from 'lucide-react'

/* ------------------------------------------------------------------ *
 * §10.1 Shared style factories
 * ------------------------------------------------------------------ */

const kickerStyle = (s) => ({
  fontSize: '12px', fontWeight: 700, letterSpacing: '2px',
  textTransform: 'uppercase', color: s.ac,
})

const h2Style = (s) => ({
  fontFamily: s.display, fontSize: s.h2, letterSpacing: s.dls, lineHeight: 1.02,
})

const ctaType = {
  fontSize: '12px', fontWeight: 700, letterSpacing: '1.2px',
  textTransform: 'uppercase', padding: '13px 26px', cursor: 'pointer',
}

const ctaPrimary = (s) => ({
  ...ctaType, background: s.ac, color: s.acFg, borderRadius: s.btnR,
})

const ctaGhost = (s) => ({
  ...ctaType, border: `1.5px solid ${s.line2}`, borderRadius: s.btnR,
})

const inputStyle = (s) => ({
  background: 'transparent', border: `1.5px solid ${s.line}`,
  borderRadius: s.radiusSm, padding: '13px 14px', color: s.tx,
  fontFamily: s.body, fontSize: '14px', outline: 'none', width: '100%',
})

const row = (gap, extra) => ({ display: 'flex', alignItems: 'center', gap, ...extra })
const col = (gap, extra) => ({ display: 'flex', flexDirection: 'column', gap, ...extra })

// §5.5 — `narrow` covers both reference frames below desktop, and each has its
// own numbers: the Figma 768 and 390 frames are exactly the tablet and mobile
// canvases, so their values are used verbatim, where the 1180 canvas takes the
// Figma desktop frame × 0.82. `s.mob` is the 390 one; this is the 768 one.
const isTablet = (s) => !!s.narrow && !s.mob

/* ------------------------------------------------------------------ *
 * §10.2 Retro design language
 *
 * The Figma page's decoration — grain, torn paper, checkerboard, hard
 * offset shadows, rotated cards — belongs to Retro alone. Every helper
 * below no-ops when `s.retro` is false, so the other four templates get
 * the identical structure rendered flat. Same split as headerFamily().
 * ------------------------------------------------------------------ */

// Anton (or the theme's label face): uppercase, tight, used for nav, eyebrows,
// buttons and every small caps-y label in the reference page.
const labelStyle = (s, size, extra) => ({
  fontFamily: s.label, fontSize: size || s.labelMd, lineHeight: 1.1,
  textTransform: 'uppercase', letterSpacing: '0.02em', whiteSpace: 'nowrap', ...extra,
})

// The offset colour block behind almost every card, pill and panel.
const hard = (s, colour, x = 4, y = 4) => (s.retro ? `${x}px ${y}px 0 0 ${colour}` : 'none')
// Figma's "Retro - Card Shadow" effect.
const soft = (s) => (s.retro ? '4px 4px 9px rgba(0,0,0,.16)' : 'none')
// Cards in the reference page sit a degree or two off square.
const tilt = (s, deg) => (s.retro ? `rotate(${deg}deg)` : 'none')

// Paper grain. Retro now ships the Figma paper/scratch texture (`s.grainSrc`);
// this fractal-noise SVG stays as the fallback for any section rendered without
// it, and recolours with whatever it sits over.
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E" +
  "%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E" +
  "%3C/filter%3E%3Crect width='160' height='160' filter='url(%23g)'/%3E%3C/svg%3E\")"

// `exact` applies `blend`/`opacity` to the raster verbatim — the hero composites
// the sheet the way the Figma frame does (lighten at .5) instead of the softened
// treatment every other section gets.
function Grain({ s, opacity = 0.16, blend = 'overlay', radius, style, exact = false }) {
  if (!s.retro) return null
  // The Figma texture is a single scratched sheet stretched over the element,
  // not a repeating tile — cover it rather than tiling, or the seams show.
  const raster = !!s.grainSrc
  return (
    <div aria-hidden style={{
      position: 'absolute', inset: 0,
      backgroundImage: raster ? `url(${s.grainSrc})` : GRAIN_URL,
      backgroundSize: raster ? 'cover' : '160px 160px',
      backgroundPosition: 'center',
      mixBlendMode: raster && !exact ? 'soft-light' : blend,
      opacity: raster && !exact ? opacity * 1.6 : opacity,
      pointerEvents: 'none', borderRadius: radius, ...style,
    }} />
  )
}

// Torn paper strip across a section boundary. Painted in the page ground
// (`s.bg`) — the Figma vector's own fill — so it reads as the neighbouring
// sheet of the page torn over this section, not a third tone: visible where
// the sections differ (the cream media player against the beige page) and
// merging silently where they share the ground. The ragged line is the §10.2
// tear itself: the contour of the Figma torn-paper vector (node 446:2390, the
// media player's bottom edge), sampled at its anchor points and normalised
// into this 1000×40 box, so the seam reads as ripped fibre, not a smooth wave.
const TORN_D =
  'M0,0 L1000,0 L998.1,27.5 L1000,17.9 L996.1,15.5 L971.6,11.6 L961.2,6.7 ' +
  'L952.1,8.6 L939.1,18.8 L923,19.3 L921.3,17.5 L906.2,10.3 L894.5,9.3 ' +
  'L866.7,7.1 L856.9,2.3 L847.4,2.2 L845.8,4.3 L840.5,4.5 L838.4,6.6 L828,0.7 ' +
  'L826.5,2.2 L798.6,3.7 L795.5,5.5 L768.4,9.6 L756,9.9 L748.4,12.4 ' +
  'L730.7,11.7 L716.7,15.2 L703.2,20.5 L698.3,19.9 L693.2,23 L677.3,23.2 ' +
  'L670.9,21.1 L665.6,22.5 L661.1,19.8 L645.5,17.5 L634.5,15.3 L606.2,12.6 ' +
  'L602.8,9.6 L597.5,9.5 L594,8 L586.3,12.2 L581.2,11.8 L575.4,14.5 ' +
  'L556.4,13.9 L552.8,12.5 L546.9,16.3 L524.8,18 L514.9,19.6 L507.6,19.7 ' +
  'L499.3,15.6 L497.4,16.6 L483.4,10.4 L477.6,10.6 L473.2,8.4 L455.6,8.6 ' +
  'L447.8,5.3 L443,7.9 L439.6,6.6 L433,9.1 L423.3,9.5 L420,13.5 L416.7,13.5 ' +
  'L411.3,18.1 L395.9,21 L390.9,19 L384.9,22.1 L371,22.6 L364.8,23.4 ' +
  'L352.6,22 L344.1,26.1 L333.9,25.8 L330.5,27 L318.8,22.6 L315.9,24.6 ' +
  'L306.5,24.8 L303.2,26.9 L298.9,24.8 L283.2,23.2 L281.9,21.4 L271.3,16.1 ' +
  'L268.5,15.2 L267.6,11 L264.9,10.6 L258.5,6.1 L249.5,0.5 L247.6,2 ' +
  'L233.9,4.2 L229.7,2.3 L223.5,5 L221.2,3.1 L213.7,2.4 L210.8,5.6 L203,3.8 ' +
  'L185.7,8.8 L176.1,7.3 L170,8 L168.8,5.9 L166.4,6.5 L163.7,5.1 L154.5,4 ' +
  'L152,1.5 L146.2,3.7 L146.2,5.8 L120.1,5.1 L122.9,5.9 L116.7,5.5 L115,3.8 ' +
  'L110.7,6.5 L106.9,6 L91.7,13.6 L75.4,15.3 L48.6,27.9 L37.1,28.4 ' +
  'L37.8,29.9 L29.2,31.4 L17,30 L8.8,35.9 L0,38.2 Z'

// `bleed` pulls the strip out to the section's own edges, past the root
// padding, so a decoration sits on the seam rather than inside the column.
const bleedTo = (s, side) => ({
  left: `calc(-1 * ${s.padX})`, right: `calc(-1 * ${s.padX})`,
  [side]: `calc(-1 * ${s.padY})`,
})

function TornEdge({ s, side = 'top', height = 26, colour, bleed = true }) {
  if (!s.retro) return null
  return (
    <svg viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden style={{
      // An <svg> has an intrinsic ratio, so left+right alone will not stretch
      // it the way it does a <div> — the width has to be stated.
      position: 'absolute', height, display: 'block', pointerEvents: 'none', zIndex: 3,
      ...(bleed
        ? { left: `calc(-1 * ${s.padX})`, width: `calc(100% + ${s.padX} + ${s.padX})`, [side]: `calc(-1 * ${s.padY})` }
        : { left: 0, width: '100%', [side]: 0 }),
      transform: side === 'bottom' ? 'scaleY(-1)' : undefined,
    }}>
      <path d={TORN_D} fill={colour || s.bg} />
    </svg>
  )
}

// The eight-point star that marks every Book Now pill and the seal centre.
function Asterisk({ size = 16, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden
         style={{ display: 'block', flex: 'none' }}>
      <g stroke={color} strokeWidth="1.7" strokeLinecap="round">
        <line x1="12" y1="1.5" x2="12" y2="22.5" />
        <line x1="1.5" y1="12" x2="22.5" y2="12" />
        <line x1="4.6" y1="4.6" x2="19.4" y2="19.4" />
        <line x1="19.4" y1="4.6" x2="4.6" y2="19.4" />
      </g>
    </svg>
  )
}

// Wireframe globe — the reference page's mark, in place of the initials disc.
function GlobeMark({ size = 22, color = 'currentColor', strokeWidth = 1.4 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden
         style={{ display: 'block', flex: 'none' }}>
      <g fill="none" stroke={color} strokeWidth={strokeWidth}>
        <circle cx="12" cy="12" r="10.4" />
        <ellipse cx="12" cy="12" rx="4.6" ry="10.4" />
        <line x1="1.6" y1="12" x2="22.4" y2="12" />
        <path d="M3.3 6.2 A13.5 13.5 0 0 0 20.7 6.2" />
        <path d="M3.3 17.8 A13.5 13.5 0 0 1 20.7 17.8" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * §10.2 Shared header primitives
 * ------------------------------------------------------------------ */

function LogoMark({ s, size = 18, color, glyph }) {
  // §10.2 replaces the initials disc with a wireframe globe under Retro.
  // `glyph` sizes that globe outright: both narrow hero frames draw it at 27px,
  // where the initials disc it stands in for stays at 18.
  if (s.retro) return <GlobeMark size={glyph ?? size + 6} color={color || s.tx} />
  return (
    <span style={{
      width: size, height: size, borderRadius: '999px', background: s.ac,
      color: s.acFg, fontSize: '8px', fontWeight: 800, flex: 'none',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    }}>{s.initials}</span>
  )
}

function Wordmark({ s, logo = false, color, glyph }) {
  return (
    <span style={row('10px')}>
      {logo && <LogoMark s={s} color={color} glyph={glyph} />}
      <span style={s.retro
        ? labelStyle(s, s.labelMd, { color: color || s.tx })
        : {
            fontFamily: s.display, fontSize: '14px', letterSpacing: s.dls,
            textTransform: 'uppercase', color: color || s.tx, whiteSpace: 'nowrap',
          }}>{s.brand}</span>
    </span>
  )
}

// A nav link's href, and the whole of the `live` seam for the navigation.
//
// On the canvas the link carries no href at all — not `#`, which is what it
// used to carry. The editor has no handler swallowing fragment clicks, so a
// bare `#` jumps the builder to its own top and leaves a fragment on its URL;
// the published tab has one (dressPublishedWindow), and turns the fragment
// into a scroll. An <a> without an href takes the text cursor, so every link
// style below states `cursor: 'pointer'` for itself.
const navHref = (s, to) => (s.live && to ? `#${to}` : undefined)

// navHref's outbound counterpart: an address the artist typed, which leaves the
// page rather than scrolling it. Same `live` gate — on the canvas a click would
// navigate the *builder* away from itself — and always a new tab, because
// dressPublishedWindow's delegated listener swallows fragments and nothing
// else, so a same-tab click would take the published page with it. Returns the
// props to spread, or null, so the caller picks its tag the way BookPill does.
const extLink = (s, url) => (s.live && url
  ? { href: url, target: '_blank', rel: 'noopener noreferrer' }
  : null)

// Seconds → mm:ss, for the media player's two clock labels. A track over an
// hour long still counts in minutes; nothing here draws a third field. NaN is
// what `duration` reads before the metadata arrives, hence the guard.
const clock = (sec) => {
  const v = Number.isFinite(sec) && sec > 0 ? Math.floor(sec) : 0
  return `${String(Math.floor(v / 60)).padStart(2, '0')}:${String(v % 60).padStart(2, '0')}`
}

// The hamburger, and the panel behind it on the published page.
//
// Both narrow reference frames draw the glyph at 26 × 18 — three 2.5px bars,
// 5px apart — and neither draws what it opens, so the panel is placed rather
// than transcribed. It is deliberately thin: no Escape key, no scroll lock, no
// focus trap and no outside-click listener, because every one of those wants an
// effect and this file's whole React surface is `useId` and `useState`
// (§12.9). The scrim is the entire viewport and closes on click, which covers
// most of the same ground.
//
// `open` is declared unconditionally — hooks cannot be conditional — and only
// read under `s.live`, the same shape Repertoire's search and chips take: on
// the canvas the glyph is the picture it has always been, because a menu that
// opened there would cover the page it is meant to navigate and select the
// header on the way.
function NavMenu({ s, color }) {
  const [open, setOpen] = useState(false)
  const c = color || s.tx
  return (
    <>
      <span
        onClick={s.live ? () => setOpen(true) : undefined}
        style={col('5px', { width: '26px', flex: 'none', cursor: 'pointer' })}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} style={{
            height: '2.5px', width: '100%', background: c, borderRadius: '2px',
          }} />
        ))}
      </span>

      {s.live && open && (
        // The events map's lifted charcoal and its cream: a near-black ground
        // is what reads under a photographic header, and both are already
        // resolved on the view-model, so the panel does no colour maths of its
        // own. `overflowY` is not optional — a phone in landscape cannot fit
        // thirteen section names and the pill, and with no scroll lock there is
        // nothing else to reach them by.
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 100, overflowY: 'auto',
            background: s.mapBg, color: s.mapFg,
            ...col('30px', { alignItems: 'flex-start', padding: '24px' }),
          }}
        >
          <div style={row('16px', { justifyContent: 'space-between', width: '100%' })}>
            <Wordmark s={s} logo glyph={27} color={s.mapFg} />
            <X size={26} style={{ flex: 'none', cursor: 'pointer' }} />
          </div>
          <nav style={col('18px', { alignItems: 'flex-start' })}>
            {s.navLinks.map((l) => (
              <a key={l.label} href={navHref(s, l.to)}
                 style={labelStyle(s, s.dispSm, { color: s.mapFg, cursor: 'pointer' })}>{l.label}</a>
            ))}
          </nav>
          <BookPill s={s} to={s.bookTo} full />
        </div>
      )}
    </>
  )
}

function NavLinks({ s, color, pills = false }) {
  // The 390 frames drop the link row; it becomes the burger instead of nothing,
  // which is what left a published phone with no navigation at all.
  if (s.mob) return <NavMenu s={s} color={color} />
  const base = {
    fontSize: '10px', fontWeight: 600, letterSpacing: '1.2px',
    textTransform: 'uppercase', color: color || s.tx, opacity: pills ? 1 : 0.8,
    whiteSpace: 'nowrap', cursor: 'pointer',
  }
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: pills ? '8px' : '18px', flexWrap: 'wrap' }}>
      {s.navLinks.map((l) => (
        <a key={l.label} href={navHref(s, l.to)} style={pills
          ? { ...base, border: '1px solid rgba(255,255,255,.35)', borderRadius: s.btnR, padding: '5px 12px' }
          : base}>{l.label}</a>
      ))}
    </nav>
  )
}

// `bg` / `fg` / `shadow` are the pricing cards' override: §10.2 gives each tier
// card its own pill in that card's second hue, on its own colour, over a cream
// block. Everywhere else the palette-wide pill applies, so they default to it.
// `full` is the other pricing override — see `scale` below.
// `to` is the section this pill books at, resolved in the view-model; `ext` is
// an outbound address instead, for the pills that leave the page. Either way it
// only becomes a link on the published page: `Tag` is a span everywhere else,
// and the style object is the same either way, so the picture never moves. The
// pricing tiers' pills pass no target and stay spans.
function BookPill({ s, label, bg, fg, shadow, full = false, to, ext }) {
  const text = label ?? s.cta1
  const link = ext ? extLink(s, ext) : (s.live && to ? { href: `#${to}` } : null)
  const Tag = link ? 'a' : 'span'
  if (s.retro) {
    // Accent-coloured type on a second palette hue, with the offset block.
    //
    // One Figma pill at three scales: the 768 frame draws it at full size and
    // the 1180 canvas at × 0.82. The 390 *header* takes it down to × 0.62,
    // where the 390 pricing frame keeps it at full size — hence `full`, which
    // opts a caller on the mobile canvas back up to the 768 numbers.
    const tab = isTablet(s)
    const scale = tab || full ? 'full' : s.mob ? 'small' : 'mid'
    const pick = (fullV, midV, smallV) => (
      scale === 'full' ? fullV : scale === 'mid' ? midV : smallV
    )
    const face = fg ?? s.pillFg
    const block = shadow ?? s.ac
    return (
      <Tag {...link} style={{
        ...row(pick('10px', '8px', '6.2px')),
        background: bg ?? s.pillBg, color: face,
        padding: pick('10px 20px', '8px 16px', '6.2px 12.4px'),
        borderRadius: s.btnR, cursor: 'pointer',
        boxShadow: scale === 'small' ? hard(s, block, 1.9, 2.5) : hard(s, block, 3, 4),
        // The type is one of the scaled dimensions: it was the only one left on
        // label-md, which made the tablet pill's type *smaller* than the
        // desktop one's even though every other dimension was bigger.
        ...labelStyle(s, pick('20px', undefined, '12.4px')),
      }}>
        {text}
        <Asterisk size={pick(20, 16, 12.4)} color={face} />
      </Tag>
    )
  }
  return (
    <Tag {...link} style={{
      ...row('8px'), background: s.ac, color: s.acFg, fontSize: '10px', fontWeight: 700,
      letterSpacing: '1.2px', textTransform: 'uppercase', padding: '9px 18px',
      borderRadius: s.btnR, cursor: 'pointer', whiteSpace: 'nowrap',
    }}>
      {text}
      <span style={{
        width: '14px', height: '14px', borderRadius: '999px', background: s.acFg20,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none',
      }}><ArrowRight size={9} /></span>
    </Tag>
  )
}

// Same seam as BookPill: a link to wherever the page plays something, but only
// once the page is live.
function ListenLink({ s, color, to }) {
  const Tag = s.live && to ? 'a' : 'span'
  const link = s.live && to ? { href: `#${to}` } : null
  return (
    <Tag {...link} style={{
      fontSize: '10px', fontWeight: 700, letterSpacing: '1.2px',
      textTransform: 'uppercase', color: color || s.tx, cursor: 'pointer', whiteSpace: 'nowrap',
    }}>{s.cta2}</Tag>
  )
}

function Kicker({ s, color }) {
  return (
    <span style={{
      ...row('7px'), fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
      textTransform: 'uppercase', color: color || s.ac,
    }}>
      {/* Typographic bullet — deliberately not an icon (§3.6) */}
      <span style={{ fontSize: '6px', lineHeight: 1 }}>●</span>
      {s.kicker}
    </span>
  )
}

// Splits on the first space into two lines. Two-tone mode (layouts 3, 4)
// paints the first word s.tx and the second s.ac.
// `inline` keeps the two words on one line until the container forces a wrap —
// the §10.2 hero sets "Kai Mercer" as a single line on desktop and tablet and
// lets it break naturally on mobile.
function Title({ s, size, color, twoTone = false, align = 'left', toneA, toneB, lh, inline = false }) {
  const t = s.heroTitle || ''
  const i = t.indexOf(' ')
  const a = i === -1 ? t : t.slice(0, i)
  const b = i === -1 ? '' : t.slice(i + 1)
  const part = { display: inline ? 'inline' : 'block' }
  return (
    <h1 style={{
      margin: 0, fontFamily: s.display, fontSize: size || s.h1, lineHeight: lh ?? 0.92,
      letterSpacing: s.dls, color: color || s.tx, textAlign: align,
    }}>
      <span style={{ ...part, color: twoTone ? (toneA || s.tx) : undefined }}>{a}</span>
      {b && <span style={{ ...part, color: twoTone ? (toneB || s.ac) : undefined }}>
        {inline ? ' ' : ''}{b}
      </span>}
    </h1>
  )
}

function LocationLine({ s, color }) {
  return (
    <span style={{
      ...row('7px'), fontSize: '10px', fontWeight: 600, letterSpacing: '1.4px',
      textTransform: 'uppercase', color: color || s.muted,
    }}>
      <span style={{
        width: '6px', height: '6px', borderRadius: '999px', flex: 'none',
        border: '1.5px solid currentColor', background: 'transparent',
      }} />
      {s.location}
    </span>
  )
}

function TagChips({ s, justify = 'flex-start' }) {
  if (s.showTags !== 'show') return null
  // §10.2 sets the chips in the body face at label-xs, sentence case — not the
  // tracked-out caps the flat templates use.
  const chip = s.retro
    ? { fontFamily: s.body, fontSize: s.labelXs, lineHeight: 1.26, padding: '5px 11px' }
    : {
        fontSize: '9px', fontWeight: 700, letterSpacing: '1px',
        textTransform: 'uppercase', padding: '5px 11px',
      }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: justify }}>
      {s.chips.map((c, i) => (
        <span key={i} style={{
          background: c.bg, color: c.fg, borderRadius: s.btnR, whiteSpace: 'nowrap', ...chip,
        }}>{c.label}</span>
      ))}
    </div>
  )
}

function SealBadge({ s, style, hue, size: sizeProp, tilt: tiltDeg = -32, ink: inkProp, mark, nameInk, glyph = 'asterisk' }) {
  const id = useId().replace(/:/g, '')
  if (s.showBadge !== 'show') return null
  const size = sizeProp ?? (s.mob ? 62 : 108)

  if (!s.retro) {
    // The pre-§10.2 starburst seal, still used by the flat templates.
    const spikes = 24
    const pts = []
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? 50 : 43
      const a = (Math.PI * i) / spikes - Math.PI / 2
      pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`)
    }
    const flat = s.mob ? 52 : 76
    return (
      <div style={{ position: 'absolute', width: flat, height: flat, ...style }}>
        <svg viewBox="0 0 100 100" width={flat} height={flat} className="seal-spin"
             style={{ display: 'block', overflow: 'visible' }} aria-hidden="true">
          <defs>
            <path id={`seal-${id}`} d="M 50,50 m -33,0 a 33,33 0 1,1 66,0 a 33,33 0 1,1 -66,0" />
          </defs>
          <polygon points={pts.join(' ')} fill={s.ac} />
          <text fill={s.acFg} style={{
            fontSize: '7px', fontWeight: 700, letterSpacing: '0.5px',
            textTransform: 'uppercase', fontFamily: s.body,
          }}>
            <textPath href={`#seal-${id}`} startOffset="0%">{s.badgeText}</textPath>
          </text>
        </svg>
        <span style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: s.acFg, pointerEvents: 'none',
        }}><ArrowUpRight size={s.mob ? 13 : 18} /></span>
      </div>
    )
  }

  // §10.2 — a solid disc, an inset ring, the artist name set twice around the
  // circle, a large centre asterisk and two small ones on the equator. The
  // whole seal sits a third of a turn off square; only the type ring spins.
  const disc = hue || s.ac
  // `ink` override: the Figma hero sets cream on the pink disc, which the
  // luminance threshold alone would call dark-on-light.
  const ink = inkProp ?? contrastInk(disc)
  const name = String(s.badgeText || '').toUpperCase()
  return (
    <div style={{
      position: 'absolute', width: size, height: size,
      transform: `rotate(${tiltDeg}deg)`, ...style,
    }}>
      <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true"
           style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <path id={`seal-${id}`} d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
        </defs>
        <circle cx="50" cy="50" r="50" fill={disc} />
        <circle cx="50" cy="50" r="45" fill="none" stroke={ink} strokeWidth="1.6" />
        <g className="seal-spin" style={{ transformOrigin: '50% 50%' }}>
          <text fill={nameInk || ink} style={{
            fontSize: '9px', letterSpacing: '1.4px', fontFamily: s.label,
          }}>
            <textPath href={`#seal-${id}`} startOffset="2%">{name}</textPath>
            <textPath href={`#seal-${id}`} startOffset="52%">{name}</textPath>
          </text>
        </g>
        <g stroke={ink} strokeLinecap="round">
          {glyph === 'globe' ? (
            // The bio sticker sets the wireframe globe in the centre where the
            // hero seal carries the fat asterisk.
            <g fill="none" strokeWidth="2.2">
              <circle cx="50" cy="50" r="26" />
              <ellipse cx="50" cy="50" rx="11.5" ry="26" />
              <line x1="24" y1="50" x2="76" y2="50" />
              <path d="M28.3 35.5 A33.75 33.75 0 0 0 71.7 35.5" />
              <path d="M28.3 64.5 A33.75 33.75 0 0 1 71.7 64.5" />
            </g>
          ) : (
            <g strokeWidth="3.6">
              <line x1="50" y1="25" x2="50" y2="75" />
              <line x1="25" y1="50" x2="75" y2="50" />
              <line x1="32.3" y1="32.3" x2="67.7" y2="67.7" />
              <line x1="67.7" y1="32.3" x2="32.3" y2="67.7" />
            </g>
          )}
          <g strokeWidth="1.1" stroke={mark || ink}>
            <line x1="11" y1="44.5" x2="11" y2="55.5" />
            <line x1="5.5" y1="50" x2="16.5" y2="50" />
            <line x1="7.1" y1="46.1" x2="14.9" y2="53.9" />
            <line x1="14.9" y1="46.1" x2="7.1" y2="53.9" />
            <line x1="89" y1="44.5" x2="89" y2="55.5" />
            <line x1="83.5" y1="50" x2="94.5" y2="50" />
            <line x1="85.1" y1="46.1" x2="92.9" y2="53.9" />
            <line x1="92.9" y1="46.1" x2="85.1" y2="53.9" />
          </g>
        </g>
      </svg>
    </div>
  )
}

// Local copy of data.js's threshold — EncoreSection does no colour maths on
// runtime values (§10), but the seal ink is a fixed black/white decision the
// view-model has no slot for.
const contrastInk = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.58 ? '#141414' : '#FBF6EA'
}

function Checkerboard({ s, style, cell = 14, colour }) {
  const c = colour || s.tx
  return (
    <div style={{
      height: cell, width: '100%',
      background: `repeating-conic-gradient(${c} 0% 25%, transparent 0% 50%) 0 0 / ${cell}px ${cell}px`,
      ...style,
    }} />
  )
}

// `backdrop` is the empty state for a full-bleed photographic slot: a dark
// panel rather than a giant set of initials, so the overlaid type still reads
// the way it does over a real photograph.
// `src` lets a layout address one slot of a multi-photo section; it falls back
// to the section's single photo, then to the initials placeholder.
// `avatar` reads the header's second photo slot, and reads it strictly: an empty
// avatar is the initials placeholder, never the background photo. That is the
// whole point of giving it its own upload.
// `src === undefined` — the prop left off entirely — is what falls back to the
// section's own photo; `src={null}` is a caller saying "this slot has no
// picture", and must not inherit it. The gallery strip depends on the
// difference: an empty slot there shows the section photo, an emptied one does
// not. The media player passes `null` for an art-less track row so the row
// cannot inherit anything, and `undefined` for the sleeve, which is allowed to.
function Photo({ s, style, initialsSize = 44, backdrop = false, avatar = false, src }) {
  const url = avatar ? s.avatar : (src === undefined ? s.image : src)
  if (url) {
    return <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }} />
  }
  if (backdrop) {
    return (
      <div style={{
        width: '100%', height: '100%',
        background: `linear-gradient(150deg, ${s.edge}, #2A2622 55%, #14110E)`,
        ...style,
      }} />
    )
  }
  return (
    <div style={{
      width: '100%', height: '100%', background: s.soft, display: 'flex',
      alignItems: 'center', justifyContent: 'center', ...style,
    }}>
      <span style={{ fontFamily: s.display, fontSize: `${initialsSize}px`, color: s.muted, letterSpacing: s.dls }}>
        {s.initials}
      </span>
    </div>
  )
}

// Only the header layouts use this, and its thumb is the artist, not the scene.
function InsetCard({ s, thumb = 34, style }) {
  if (s.mob) return null
  return (
    <div style={{
      ...row('10px'), background: s.bg, borderRadius: s.radiusSm, padding: '10px',
      boxShadow: '0 8px 24px rgba(0,0,0,.28)', color: s.tx, ...style,
    }}>
      <div style={{ width: thumb, height: thumb, borderRadius: s.radiusSm, overflow: 'hidden', flex: 'none' }}>
        <Photo s={s} avatar initialsSize={Math.round(thumb / 2.4)} />
      </div>
      <div style={col('2px')}>
        <span style={{ fontSize: '10px', fontWeight: 700, whiteSpace: 'nowrap' }}>{s.brand}</span>
        <span style={{ fontSize: '9px', color: s.muted, whiteSpace: 'nowrap' }}>{s.kicker}</span>
      </div>
    </div>
  )
}

// Horizontal room a top bar must leave for a seal badge floating in its corner.
// The badge drops from 76px to 52px on mobile (§10.2), so the gap follows.
const sealGap = (s) => (s.showBadge !== 'show' ? 0 : s.mob ? '62px' : '84px')

const SCRIM = {
  v1: 'linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.15) 40%, rgba(0,0,0,.6))',
  v5: 'linear-gradient(180deg, rgba(0,0,0,.5), rgba(0,0,0,.3) 45%, rgba(0,0,0,.55))',
  // §10.2 hero — one full-height fade off the floor, exactly the Figma gradient.
  hero: 'linear-gradient(0deg, #111111 0%, rgba(17,17,17,0) 100%)',
}

// §10.2 — the hero's top bar. (The footer builds its own columns.) Below
// `desktop` the links collapse to a hamburger, as they do on both narrow
// reference frames — and the hamburger now opens; see NavMenu.
function NavBar({ s, colour, rule }) {
  const c = colour || s.tx
  const bar = rule || c
  const tab = isTablet(s)
  const ruleW = s.mob ? '70px' : tab ? '150px' : '123px'
  return (
    <div style={row(s.mob ? '10px' : tab ? '30px' : '24px', { justifyContent: 'space-between', width: '100%' })}>
      <div style={row(s.narrow ? '20px' : '16px', { flex: s.narrow ? 1 : '0 1 auto', minWidth: 0 })}>
        <Wordmark s={s} logo glyph={s.narrow ? 27 : undefined} color={c} />
        {/* §10.2 draws a 150px rule after the wordmark — 70px on the 390 frame,
            123px on the 1180 canvas. It has to yield rather than push the Book
            Now pill onto a second line: the nav carries the page's own section
            names, which run longer than the reference's. */}
        <span style={{
          height: '2px', background: bar, flex: `0 1 ${ruleW}`,
          maxWidth: ruleW, minWidth: s.narrow ? '30px' : '0px',
        }} />
      </div>
      {s.narrow ? (
        <span style={row(tab ? '23px' : '10px')}>
          <BookPill s={s} to={s.bookTo} />
          <NavMenu s={s} color={c} />
        </span>
      ) : (
        <nav style={row('18px', {
          flexWrap: 'wrap', justifyContent: 'flex-end', flex: '1 1 auto', minWidth: 0,
        })}>
          {s.navLinks.map((l) => (
            <a key={l.label} href={navHref(s, l.to)}
               style={labelStyle(s, s.labelMd, { color: c, cursor: 'pointer' })}>{l.label}</a>
          ))}
          <BookPill s={s} to={s.bookTo} />
        </nav>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * §10.2 The six photographic header compositions (Retro)
 * ------------------------------------------------------------------ */

// v0 — Header layout 1 · Hero (§10.2 reference design)
//
// Full-bleed photograph under a bottom-weighted scrim: the nav rides the top
// edge, the identity block sits on the floor of the frame, and the seal floats
// in the upper right. This is the one section that breaks the root padding —
// see the `bleed` flag on the root.
function HeaderV0({ s }) {
  const centred = s.align === 'centre'
  // Both reference frames are transcribed verbatim (§5.5). 768: 30px gutters,
  // a 144px portrait card, identity stacked 40/24/36/30. 390: 10px gutters, a
  // 96px card the text sits under rather than beside, same 40/24/36/30 stack.
  const tab = isTablet(s)
  const pp = s.mob ? 96 : tab ? 144 : 158               // portrait card edge
  // The Figma hero inks its labels in the fixed cream (`sem/text/2`), one step
  // brighter than `paper` — which stays the display title's first-word tone.
  const ink = s.retro ? '#FBF6EA' : s.paper
  const aspect = s.mob ? '390 / 844' : s.narrow ? '3 / 4' : '16 / 8.33'
  // This is the one composition outside the root's padding — the root hands it
  // `padding: 0` so the photograph can reach the section edges — so it is also
  // the one that has to apply the wide-window gutter itself. Past the canvas
  // the frame was drawn at, `s.surplus` centres the nav, the identity block and
  // the chips on the same measure as every section below, while the photograph,
  // the scrim, the grain and the floor checkerboard keep bleeding.
  const padX = `calc(${s.surplus} + ${s.mob ? '10px' : tab ? '30px' : s.gPad})`
  const padTop = s.mob ? '24px' : tab ? '30px' : '23px'
  // The checker ribbon on the floor is a fixed height at every breakpoint — the
  // reference does not scale it — so it is added to the identity block's own
  // clearance rather than eating into it. The reference band is 24px; this runs
  // it a third finer, so the squares read as texture rather than as blocks.
  const CHECKER = 16
  const padBottom = `${(s.mob ? 40 : tab ? 60 : 66) + CHECKER}px`

  return (
    <div style={{
      // The aspect ratio is the frame's, but on a window wider than the canvas
      // it would go on scaling the height with the width — 1333px at 2560. The
      // clamp is the height this ratio yields *at* the canvas, so it is inert
      // in the editor and in every thumbnail, and past them the hero stays a
      // band rather than a wall. Photo is objectFit:cover, so the wider box
      // crops the photograph instead of stretching it.
      //
      // `width: 100%` is load-bearing, not decoration: with an auto width, a
      // max-height that actually clamps makes the box shrink its *width* to
      // keep the ratio — the hero would sit at 1180 on a 2560 window with the
      // page's background either side of it, and its gutters would be computed
      // against a width it no longer had. Stating the width leaves the ratio
      // driving the height only.
      position: 'relative', width: '100%', aspectRatio: aspect, maxHeight: s.heroH, overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      padding: `${padTop} ${padX} ${padBottom}`, color: ink,
    }}>
      <div style={{ position: 'absolute', inset: 0 }}><Photo s={s} backdrop /></div>
      <div style={{ position: 'absolute', inset: 0, background: SCRIM.hero }} />
      <Grain s={s} exact blend="lighten" opacity={0.5} />

      <div style={{ position: 'relative' }}>
        <NavBar s={s} colour={ink} rule={s.chips[3]?.bg || s.ac} />
      </div>

      <div style={{ position: 'relative', ...col(s.mob || tab ? '40px' : '33px') }}>
        {/* The 390 frame stands the portrait card on its own line above the
            text rather than beside it. */}
        <div style={s.mob
          ? col('24px', { alignItems: centred ? 'center' : 'flex-start', width: '100%' })
          : row(tab ? '24px' : '33px', {
              justifyContent: centred ? 'center' : 'flex-start', flexWrap: 'wrap',
            })}>
          <div style={{
            position: 'relative', width: pp, height: pp, flex: 'none',
            borderRadius: s.mob || tab ? 30 : 25,
            border: `${s.mob || tab ? 6 : 5}px solid ${s.pillBg}`, overflow: 'hidden', background: s.soft2,
          }}>
            <Photo s={s} avatar initialsSize={Math.round(pp / 3)} />
            <Grain s={s} exact blend="lighten" opacity={0.5} />
          </div>

          <div style={col(s.mob || tab ? '36px' : '30px', {
            alignItems: centred ? 'center' : 'flex-start', minWidth: 0,
            width: s.mob ? '100%' : undefined,
          })}>
            <div style={row(s.mob || tab ? '30px' : '25px', { flexWrap: 'wrap' })}>
              <span style={row('8px')}>
                <span style={{
                  width: '14px', height: '14px', borderRadius: '7px',
                  background: s.pillBg, flex: 'none',
                }} />
                <span style={labelStyle(s, s.labelMd, { color: ink })}>{s.location}</span>
              </span>
              <span style={labelStyle(s, s.labelMd, { color: ink })}>{s.kicker}</span>
            </div>
            <Title s={s} size={s.dispXl} twoTone toneA={s.paper} toneB={s.ac} inline={!s.mob}
                   lh={0.75} align={centred ? 'center' : 'left'} />
          </div>
        </div>

        <TagChips s={s} justify={centred ? 'center' : 'flex-start'} />
      </div>

      {/* The reference seals: 125px centred on (660, 194) of the 768 frame,
          85px centred on (335, 169) of the 390 one. */}
      {/* `right` takes the gutter too, or a wide window would strand the seal
          out by the window edge instead of over the identity block. `top` needs
          nothing: the height is clamped to the frame's, so its percentage
          resolves against the same number it always did. */}
      <SealBadge s={s} hue={s.chips[4]?.bg || s.ac} tilt={32.38} ink="#FBF6EA"
                 size={s.mob ? 85 : tab ? 125 : undefined}
                 style={{
                   top: s.mob ? '14.9%' : tab ? '12.8%' : '14%',
                   right: `calc(${s.surplus} + ${s.mob ? '3.3%' : tab ? '5.9%' : '3%'})`,
                 }} />

      {/* The §10.2 hero frame itself has no floor trim; this is the checker
          ribbon off the stacked header, which shares this composition's
          full-bleed photograph. Two rows of 8px squares in `paper` — the
          Figma fill is sem/media, which is Retro's paper exactly — over the
          scrim's black floor, where the default `tx` would vanish. */}
      <Checkerboard s={s} cell={CHECKER} colour={s.paper}
                    style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }} />
    </div>
  )
}

// v1 — Header layout 2 · Framed full-bleed
function HeaderV1({ s }) {
  return (
    <div style={{
      position: 'relative', aspectRatio: s.mob ? '4 / 5' : '16 / 8.5',
      borderRadius: s.radius, overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0 }}><Photo s={s} initialsSize={72} /></div>
      <div style={{ position: 'absolute', inset: 0, background: SCRIM.v1 }} />
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: s.mob ? '18px' : '24px', color: '#FFFFFF',
      }}>
        <div style={row('16px', { justifyContent: 'space-between', flexWrap: 'wrap' })}>
          <NavLinks s={s} color="#FFFFFF" pills />
          <Wordmark s={s} color="#FFFFFF" />
          <span style={row('14px')}>
            <ListenLink s={s} color="#FFFFFF" to={s.listenTo} />
            <BookPill s={s} to={s.bookTo} />
          </span>
        </div>
        <div style={row('20px', { justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap' })}>
          <div style={col('12px', { alignItems: 'flex-start' })}>
            <LocationLine s={s} color="rgba(255,255,255,.75)" />
            <Title s={s} size={s.mob ? s.h2 : s.h1} color="#FFFFFF" />
            <TagChips s={s} />
          </div>
          <InsetCard s={s} />
        </div>
      </div>
      <Checkerboard s={s} style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }} />
    </div>
  )
}

// v2 — Header layout 3 · Gradient stage
function HeaderV2({ s }) {
  return (
    <div style={{
      position: 'relative', aspectRatio: s.mob ? '4 / 5' : '16 / 8',
      borderRadius: s.radius, overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0 }}><Photo s={s} initialsSize={72} /></div>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(0,0,0,.55), ${s.ac55})` }} />
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: s.mob ? '18px' : '24px', color: '#FFFFFF',
      }}>
        {/* Keep the bar clear of the seal, which floats over this corner. */}
        <div style={row('16px', { justifyContent: 'space-between', flexWrap: 'wrap', paddingRight: sealGap(s) })}>
          <Wordmark s={s} logo color="#FFFFFF" />
          <span style={row('18px')}>
            <NavLinks s={s} color="#FFFFFF" />
            <BookPill s={s} to={s.bookTo} />
          </span>
        </div>
        <div style={col('14px', { alignItems: 'flex-end', padding: s.mob ? '0' : '32px' })}>
          <div style={{ alignSelf: 'flex-start', width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <InsetCard s={s} thumb={56} style={{ alignSelf: 'flex-start' }} />
            <div style={row('18px', { flexWrap: 'wrap' })}>
              <LocationLine s={s} color="rgba(255,255,255,.75)" />
              <Kicker s={s} />
            </div>
            <Title s={s} twoTone size={s.mob ? s.h2 : s.h1} />
            <TagChips s={s} />
          </div>
        </div>
      </div>
      <SealBadge s={s} style={{ top: '18px', right: '18px', zIndex: 2 }} />
    </div>
  )
}

// v3 — Header layout 4 · Polaroid
function HeaderV3({ s }) {
  return (
    <div style={{ position: 'relative' }}>
      <Checkerboard s={s} style={{ marginBottom: '20px' }} />
      <div style={row('20px', { justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: s.navGap })}>
        <NavLinks s={s} pills={false} />
        <Wordmark s={s} />
        <span style={row('14px')}>
          <ListenLink s={s} to={s.listenTo} />
          <BookPill s={s} to={s.bookTo} />
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: s.split, gap: '44px', alignItems: 'center' }}>
        <div style={{
          background: s.bg, padding: '12px 12px 44px', boxShadow: '0 14px 34px rgba(0,0,0,.22)',
          transform: 'rotate(-2.5deg)', position: 'relative',
        }}>
          <div style={{ aspectRatio: '4 / 4.4', overflow: 'hidden' }}>
            <Photo s={s} initialsSize={52} />
          </div>
          {/* Right-aligned so the seal badge at bottom-left cannot cover it. */}
          <span style={{
            position: 'absolute', right: '14px', bottom: '16px',
            fontSize: '10px', fontWeight: 600, color: s.muted,
          }}>{s.location}</span>
        </div>
        <div style={col('14px', { alignItems: s.align === 'centre' ? 'center' : 'flex-start' })}>
          <span style={{
            border: `1px solid ${s.line2}`, borderRadius: s.btnR, padding: '4px 10px',
            fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
            textTransform: 'uppercase', color: s.ac,
          }}>{s.kicker}</span>
          <Title s={s} twoTone align={s.align === 'centre' ? 'center' : 'left'} />
          <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: s.muted }}>{s.subtitle}</p>
          <span style={ctaPrimary(s)}>{s.cta1}</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%' }}>
            <div style={{ background: s.soft, borderRadius: s.radiusSm, padding: '12px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>The face of the act</div>
              <div style={{ fontSize: '9px', color: s.muted, marginTop: '4px' }}>{s.kicker}</div>
            </div>
            <div style={{ background: s.ac, color: s.acFg, borderRadius: s.radiusSm, padding: '12px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{s.location}</div>
              <div style={{ fontSize: '9px', opacity: 0.8, marginTop: '4px' }}>{s.badgeText}</div>
            </div>
          </div>
        </div>
      </div>
      <Checkerboard s={s} style={{ marginTop: '20px' }} />
      <SealBadge s={s} style={{ bottom: '20px', left: '20px' }} />
    </div>
  )
}

// v4 — Header layout 5 · Overlay card
function HeaderV4({ s }) {
  return (
    <div style={{
      position: 'relative', aspectRatio: s.mob ? '4 / 5.4' : '16 / 8.5',
      borderRadius: s.radius, overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0 }}><Photo s={s} initialsSize={72} /></div>
      <div style={{ position: 'absolute', inset: 0, background: SCRIM.v1 }} />
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        padding: s.mob ? '18px' : '24px', color: '#FFFFFF',
      }}>
        <div style={row('16px', { justifyContent: 'space-between', flexWrap: 'wrap' })}>
          <NavLinks s={s} color="#FFFFFF" pills />
          <Wordmark s={s} color="#FFFFFF" />
          <span style={row('14px')}>
            <ListenLink s={s} color="#FFFFFF" to={s.listenTo} />
            <BookPill s={s} to={s.bookTo} />
          </span>
        </div>
      </div>
      <div style={{
        position: 'absolute', left: s.mob ? '18px' : '36px', right: s.mob ? '18px' : 'auto',
        top: '50%', transform: 'translateY(-50%)', maxWidth: '380px',
        background: s.ac, color: s.acFg, borderRadius: s.radius, padding: '24px',
        ...col('14px'),
      }}>
        <div style={row('12px')}>
          <div style={{ width: '36px', height: '36px', borderRadius: '999px', overflow: 'hidden', flex: 'none' }}>
            <Photo s={s} avatar initialsSize={14} />
          </div>
          <Title s={s} size={s.h2} color={s.acFg} />
        </div>
        <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.55, opacity: 0.8 }}>{s.subtitle}</p>
        <TagChips s={s} />
        {!s.mob && (
          <div style={row('20px', { borderTop: `1px solid ${s.acFg25}`, paddingTop: '12px' })}>
            <div style={col('2px')}>
              <span style={{ ...row('4px'), fontSize: '16px', fontWeight: 800 }}>4.9 <Star size={13} /></span>
              <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.75 }}>Experience</span>
            </div>
            <div style={col('2px')}>
              <span style={{ fontSize: '16px', fontWeight: 800 }}>5 pcs</span>
              <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.75 }}>Line-up</span>
            </div>
          </div>
        )}
        <div style={row('10px', {
          background: s.acFg12, borderRadius: s.btnR, padding: '10px 14px',
          justifyContent: 'space-between',
        })}>
          <span style={{ fontSize: '12px', opacity: 0.7 }}>Tell me your date</span>
          <ArrowRight size={13} />
        </div>
      </div>
      <SealBadge s={s} style={{ bottom: '20px', right: '20px' }} />
    </div>
  )
}

// v5 — Header layout 6 · Stage wide
function HeaderV5({ s }) {
  return (
    <div style={{
      position: 'relative', aspectRatio: s.mob ? '4 / 5' : '16 / 7.5',
      borderRadius: s.radius, overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0 }}><Photo s={s} initialsSize={72} /></div>
      <div style={{ position: 'absolute', inset: 0, background: SCRIM.v5 }} />
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: s.mob ? '18px' : '24px', color: '#FFFFFF',
      }}>
        <div style={row('16px', { justifyContent: 'space-between', flexWrap: 'wrap', paddingRight: sealGap(s) })}>
          <Wordmark s={s} logo color="#FFFFFF" />
          <span style={row('18px')}>
            <NavLinks s={s} color="#FFFFFF" />
            <BookPill s={s} to={s.bookTo} />
          </span>
        </div>
        <div style={row('20px', { justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap' })}>
          <div style={col('12px', { alignItems: 'flex-start' })}>
            <InsetCard s={s} thumb={48} />
            <Kicker s={s} />
            <Title s={s} size={s.mob ? s.h2 : s.h1} color="#FFFFFF" />
            <LocationLine s={s} color="rgba(255,255,255,.75)" />
          </div>
          <div style={{ maxWidth: '46%', minWidth: '160px' }}>
            <TagChips s={s} justify="flex-end" />
          </div>
        </div>
      </div>
      <SealBadge s={s} style={{ top: '14px', right: '14px', zIndex: 2 }} />
      <Checkerboard s={s} style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }} />
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * §10.3 Header, flat family (Lime, Grunge, Editorial, Pop — 3 layouts)
 * ------------------------------------------------------------------ */

function FlatNav({ s }) {
  return (
    <div style={row('20px', { justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: s.navGap })}>
      <span style={{ fontFamily: s.display, fontSize: '19px', letterSpacing: s.dls }}>{s.brand}</span>
      <nav style={row('26px', { flexWrap: 'wrap' })}>
        {[['Music', '#music'], ['Shows', '#shows'], ['Book', '#book']].map(([l, href]) => (
          <a key={l} href={href} style={{
            fontSize: '12px', fontWeight: 600, letterSpacing: '1.4px', textTransform: 'uppercase',
          }}>{l}</a>
        ))}
      </nav>
    </div>
  )
}

function FlatHeader({ s }) {
  const chipRow = (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
      {s.chips.map((c, i) => (
        <span key={i} style={{
          background: c.bg, color: c.fg, fontSize: '11px', fontWeight: 700,
          letterSpacing: '1.2px', textTransform: 'uppercase', padding: '6px 13px', borderRadius: s.btnR,
        }}>{c.label}</span>
      ))}
    </div>
  )

  return (
    <div>
      <FlatNav s={s} />

      {s.v0 && (
        <div style={col('22px', { alignItems: 'center', textAlign: 'center' })}>
          <h1 style={{ margin: 0, fontFamily: s.display, fontSize: s.h1, lineHeight: 0.98, letterSpacing: s.dls, maxWidth: '900px' }}>
            {s.heroTitle}
          </h1>
          <p style={{ margin: 0, fontSize: '16px', color: s.muted, maxWidth: '540px', lineHeight: 1.55 }}>{s.subtitle}</p>
          {s.showTags === 'show' && chipRow}
          <div style={row('12px', { marginTop: '6px', flexWrap: 'wrap', justifyContent: 'center' })}>
            <span style={ctaPrimary(s)}>{s.cta1}</span>
            <span style={ctaGhost(s)}>{s.cta2}</span>
          </div>
        </div>
      )}

      {s.v1 && (
        <div style={{ display: 'grid', gridTemplateColumns: s.split, gap: '44px', alignItems: 'center' }}>
          <div style={col('20px', { alignItems: 'flex-start' })}>
            <h1 style={{ margin: 0, fontFamily: s.display, fontSize: s.h1, lineHeight: 0.98, letterSpacing: s.dls }}>
              {s.heroTitle}
            </h1>
            <p style={{ margin: 0, fontSize: '16px', color: s.muted, maxWidth: '440px', lineHeight: 1.55 }}>{s.subtitle}</p>
            <div style={row('12px', { flexWrap: 'wrap' })}>
              <span style={ctaPrimary(s)}>{s.cta1}</span>
              <span style={ctaGhost(s)}>{s.cta2}</span>
            </div>
          </div>
          <div style={{
            background: s.soft, borderRadius: s.radius, aspectRatio: '4 / 3.4',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: s.display, fontSize: '64px', color: s.muted, letterSpacing: s.dls }}>{s.initials}</span>
          </div>
        </div>
      )}

      {s.v2 && (
        <div style={col('26px')}>
          <h1 style={{ margin: 0, fontFamily: s.display, fontSize: s.h1b, lineHeight: 0.92, letterSpacing: s.dls }}>
            {s.heroTitle}
          </h1>
          <div style={row('20px', {
            borderTop: `1.5px solid ${s.line}`, paddingTop: '22px',
            justifyContent: 'space-between', flexWrap: 'wrap',
          })}>
            <p style={{ margin: 0, fontSize: '15px', color: s.muted, maxWidth: '420px', lineHeight: 1.55 }}>{s.subtitle}</p>
            <span style={{ ...ctaPrimary(s), flex: 'none' }}>{s.cta1}</span>
          </div>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * §10.4 All other categories
 * ------------------------------------------------------------------ */

// v0 — Bio layout 1 · Flanked portrait (§10.2 reference design)
//
// A tilted photo card held between two columns of small orange labels: the
// section index and headline on the left, the prose and credit on the right.
// Both flanks collapse under the card on tablet and mobile.
function Bio({ s }) {
  if (s.v0) {
    // Figma sets the flank eyebrows in the body face, bold — not Anton.
    const label = (t, extra) => (
      <span style={{
        fontFamily: s.body, fontWeight: 700, fontSize: s.eyebrow, lineHeight: 1.3,
        textTransform: 'uppercase', color: s.ac, whiteSpace: 'nowrap', ...extra,
      }}>{t}</span>
    )
    const card = (
      <div style={{ position: 'relative', padding: s.mob ? '0 26px 26px 0' : '0 12px 12px 0' }}>
        <div style={{
          position: 'relative', transform: tilt(s, -6), transformOrigin: 'center',
          // Figma box/1 — the polaroid sits a step lighter than the page, and
          // Retro's `paper` IS the page background, so it needs its own cream.
          background: s.retro ? '#FAECD5' : s.paper, borderRadius: s.radius, boxShadow: soft(s),
          padding: s.mob ? '12px' : '16px 0 16px 16px', ...row(s.mob ? '12px' : '0', { alignItems: 'stretch' }),
        }}>
          <div style={{
            flex: 1, minWidth: 0, aspectRatio: '4 / 5.2', borderRadius: s.radiusSm, overflow: 'hidden',
          }}>
            <Photo s={s} initialsSize={54} />
          </div>
          <div style={col('14px', {
            flex: 'none', width: s.mob ? undefined : '74px', alignItems: 'center',
            justifyContent: 'space-between', color: s.paperFg,
            padding: s.mob ? 0 : '0 10px',
          })}>
            <div style={col('14px', { alignItems: 'center' })}>
              <span style={{ transform: 'rotate(-90deg)' }}>
                <GlobeMark size={s.mob ? 18 : 22} color={s.ac} />
              </span>
              {/* vertical-rl reads top-down; the Figma label runs the other
                  way, so flip it to read bottom-to-top. */}
              <span style={labelStyle(s, s.labelMd, {
                writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.08em',
              })}>{s.location}</span>
            </div>
            <span style={{ width: '2px', height: s.mob ? '110px' : '157px', background: s.ac, flex: 'none' }} />
          </div>
          <Grain s={s} exact blend="screen" opacity={0.5} radius={s.radius} />
        </div>
        <SealBadge s={s} hue={s.retro ? '#CEB081' : s.pillBg} ink={s.chips[3]?.bg}
                   mark={s.ac} nameInk={s.ac} glyph="globe" size={s.mob ? 68 : 103} tilt={32}
                   style={{ left: s.mob ? '-20px' : '-50px', bottom: s.mob ? '30px' : '20px' }} />
      </div>
    )

    const heading = (
      <div style={col(s.mob ? '16px' : '0', {
        justifyContent: 'space-between', height: '100%', alignItems: 'flex-start',
      })}>
        <div style={col('6px')}>{label(s.initials)}{label('Bio')}</div>
        <h2 style={{
          margin: s.narrow ? '14px 0' : 0, fontFamily: s.display, fontSize: s.dispLg,
          lineHeight: 0.89, letterSpacing: s.dls, color: s.ac,
        }}>{s.title}</h2>
        {label('[ 001 ] Structure · Bio_01')}
      </div>
    )

    const prose = (
      <div style={col(s.mob ? '16px' : '0', {
        justifyContent: 'space-between', height: '100%', alignItems: 'stretch',
      })}>
        <div style={col('10px')}>
          <span style={{ fontFamily: s.body, fontWeight: 700, fontSize: s.labelXs, color: s.ac }}>About</span>
          <p style={{ margin: 0, fontFamily: s.body, fontSize: s.labelXs, lineHeight: 1.5, color: s.ac }}>{s.bioP1}</p>
        </div>
        <div style={col('10px')}>
          <span style={{ height: '1px', background: (s.retro && s.chips[0]?.bg) || s.line2, width: '100%' }} />
          {label(`${s.kicker} · ${s.location}`)}
        </div>
      </div>
    )

    if (s.narrow) return <div style={col(s.gGap)}>{heading}{card}{prose}</div>
    return (
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1.9fr 1fr',
        gap: s.gGap, alignItems: 'stretch',
      }}>
        {heading}{card}{prose}
      </div>
    )
  }
  return (
    <div style={col('20px', { alignItems: 'center', textAlign: 'center', maxWidth: '760px', margin: '0 auto' })}>
      <span style={kickerStyle(s)}>About</span>
      <h2 style={{ margin: 0, ...h2Style(s), lineHeight: 1.1 }}>{s.bioQuote}</h2>
      <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.65, color: s.muted, maxWidth: '560px' }}>{s.bioP1}</p>
    </div>
  )
}

// v0 — Media Player layout 1 · Floating cards stack (§10.2 reference design)
//
// Five track cards that overlap, alternate indent and lean ±1° (±2.25° on
// mobile), every other one filled with a palette hue, each throwing a hard
// offset block down-left; the "now playing" card sits on the dark alongside,
// centred against the stack. Checkerboard above, torn paper below. Desktop
// numbers are the 1440 frame (964:58578) × 0.82, per the RAMP rule; the 768
// and 390 frames (986:37146, 986:35593) are exactly the tablet and mobile
// canvases, so their numbers — shared, bar the lean — are used verbatim.
//
// §10.2a — and it plays. On the published page the section owns one <audio>
// element: a click on a card loads that track, the transport under the sleeve
// works, and the now-playing block — title, sleeve, clock, progress bar — is
// the element's own state rather than NOW_PLAYING's picture. All of it is
// gated on `s.live` (§12.7), like Repertoire's filters and the header's nav:
// the editor canvas renders no <audio> at all and keeps the still picture,
// because a card there would both start a track and select the section.
function Media({ s }) {
  // Hooks before the layout branch — the older three-card design plays too.
  // `playing` mirrors the element's own play/pause events rather than being
  // set by the click handlers, so a rejected autoplay or a pause from the OS
  // media keys cannot leave the button lying.
  //
  // `cur` starts at -1, meaning nothing has been chosen yet. The card still
  // shows track one either way — it is the track the player is cued to — but
  // nothing is *marked as playing* until the visitor picks, and the clock does
  // not start until then.
  const el = useRef(null)
  const [cur, setCur] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [pos, setPos] = useState(0)
  const [len, setLen] = useState(0)

  // What the transport can reach is what the layout draws: the older design
  // shows three cards, and Next off the third has to return to the first
  // rather than start a track with no card on the page. `s.v0` is a prop, not
  // state, so branching on it above the hooks would be the error — branching
  // on it here is not.
  const list = s.v0 ? s.tracks : s.tracks3
  const count = list.length
  // Clamped the way Repertoire clamps its chip: the list is the artist's, and
  // a track deleted under the player would otherwise strand it past the end.
  const at = s.live && count ? Math.min(Math.max(cur, 0), count - 1) : 0
  const track = list[at]
  // Has the visitor chosen anything yet? Only the cards' own marks hang off
  // this — the now-playing block shows track one from the start — and it is
  // false on the canvas by construction.
  const chosen = s.live && cur >= 0 && !!track

  // Load track `j` and play it, wrapping at both ends so Next off the last
  // track returns to the first. The source is assigned to the element rather
  // than rendered as a `src` prop: a re-render from onTimeUpdate must never
  // reload the file under the playhead, and Safari refuses to autoplay an
  // element that has only just mounted. A track with no address of its own
  // still becomes the now-playing one — it simply has nothing to play.
  const goTo = (i) => {
    const a = el.current
    if (!a || !count) return
    const j = ((i % count) + count) % count
    setCur(j); setPos(0); setLen(0)
    const url = list[j].src
    if (!url) { a.pause(); a.removeAttribute('src'); a.load(); return }
    a.src = url
    a.play().catch(() => {})   // an autoplay refusal is not an error here
  }
  const toggle = () => {
    const a = el.current
    if (!a) return
    if (!a.src) { goTo(at); return }
    if (a.paused) a.play().catch(() => {})
    else a.pause()
  }
  // Clicking the card that is already loaded is a pause, not a restart.
  const pick = (i) => (i === at && el.current?.src ? toggle() : goTo(i))
  const onPick = (i) => (s.live ? () => pick(i) : undefined)

  const audio = s.live ? (
    <audio
      ref={el} preload="none" style={{ display: 'none' }}
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onLoadedMetadata={(e) => setLen(e.currentTarget.duration || 0)}
      onTimeUpdate={(e) => setPos(e.currentTarget.currentTime || 0)}
      onEnded={() => goTo(at + 1)}
    />
  ) : null

  // The now-playing block. The card always names the track the player is on —
  // track one until the visitor picks another — because the section no longer
  // carries a now-playing track or sleeve of its own to name instead.
  //
  // The clock is the one thing that still differs by side. Live it is the
  // element's, from 00:00: before the metadata lands both ends read 00:00, and
  // a track's `sub` is a release line, not a duration, so it cannot stand in.
  // On the canvas it stays NOW_PLAYING's, because the frame draws a player
  // caught mid-song and a dead 00:00 under an empty bar is not that picture.
  const np = s.nowPlaying
  const title = track ? track.name : np.track
  const now = s.live
    ? {
        track: title, by: np.by, at: clock(pos), of: clock(len),
        pct: len ? Math.min(100, (pos / len) * 100) : 0,
      }
    : { ...np, track: title }
  // And the sleeve is that track's artwork. `?? undefined` rather than the raw
  // `null`: a track with no art of its own falls through to the section photo,
  // which for the media player is now nothing, so it lands on the initials
  // placeholder — the card rows keep their `null` and must not do this.
  const sleeve = track?.img ?? undefined

  if (s.v0) {
    const desk = !s.narrow
    // The frame paints this section on cream with near-black ink, not the
    // beige page palette — EncoreSection swaps the section ground to match,
    // so the beige checkerboard band and cards read against it.
    const ink = s.retro ? '#1B1714' : s.paperFg
    const cream = s.retro ? '#FBF6EA' : s.paper
    // The wine red the frame reserves for the player's thrown block and the
    // progress fill — not a palette hue.
    const wine = s.retro ? '#9E1F17' : s.ac
    const cardR = s.retro ? (desk ? '16px' : '20px') : s.btnR
    const playerR = s.retro ? (desk ? '33px' : '40px') : s.radius
    const playBtn = desk ? 39 : 48
    const ctl = (fill) => ({
      width: fill ? playBtn : 30, height: fill ? playBtn : 30,
      borderRadius: '999px', flex: 'none',
      background: fill ? s.deepFg : 'transparent', color: fill ? s.deep : s.deepFg,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
    })
    // Figma sets the kicker and the counter in a small tracked mono, not Anton.
    const label = (t) => (
      <span style={{
        fontFamily: s.body, fontSize: '11px', letterSpacing: '1.2px',
        textTransform: 'uppercase', color: s.ac, whiteSpace: 'nowrap',
      }}>{t}</span>
    )

    // Full-width header: on desktop the track counter bottom-aligns with the
    // display heading at the right edge; the narrow frames drop it under the
    // heading instead, left-aligned.
    const featured = label(`${s.tracks.length} / ${s.tracks.length} Featured`)
    const titleBlock = (
      <div style={col(desk ? '30px' : '36px', desk ? { flex: 1, minWidth: 0 } : undefined)}>
        {label(s.mediaKicker)}
        {/* The frame breaks the heading after "worth"; an em measure between
            width("Five worth") and width("Five worth your") forces the same
            break at every size. */}
        <h2 style={{
          margin: 0, fontFamily: s.display, fontSize: s.dispLg, lineHeight: 0.89,
          letterSpacing: s.dls, color: s.ac, maxWidth: '5.8em',
        }}>{s.title}</h2>
      </div>
    )
    const heading = desk
      ? <div style={row('16px', { alignItems: 'flex-end' })}>{titleBlock}{featured}</div>
      : <div style={col('32px', { alignItems: 'flex-start' })}>{titleBlock}{featured}</div>

    const stack = (
      <div style={col('0')}>
        {s.tracks.map((t, i) => {
          const n = s.chips.length
          const filled = i % 2 === 1
          // Filled rows step through the palette from its third hue (Retro:
          // mustard, then olive) and throw the accent; the open rows throw the
          // frame's off-palette pink and violet blocks, alternating.
          const hue = s.chips[(2 + Math.floor(i / 2)) % n].bg
          const fg = filled ? (s.retro ? cream : contrastInk(hue)) : ink
          const thrown = filled ? s.ac
            : s.retro ? (Math.floor(i / 2) % 2 ? '#8464AD' : '#FD638E')
            : s.chips[(4 + i) % n].bg
          // The whole card is the button on the published page, not just the
          // circle: the frame draws no other affordance, and a 29px target is
          // not one on a phone. The playing card is marked by its circle
          // turning to Pause and by the now-playing block beside the stack —
          // deliberately nothing structural. Lifting it out of the stack, by
          // z-index or by a deeper thrown block, covers the *next* card's
          // title: the cards overlap by 18px at the foot, and the design
          // depends on each one sitting above the one before it.
          const on = chosen && i === at
          return (
            <div key={i} onClick={onPick(i)} style={{
              ...row(desk ? '16px' : '20px'),
              marginLeft: filled ? (desk ? '49px' : '61px') : 0,
              marginRight: !filled ? (desk ? '49px' : '61px') : 0,
              marginTop: i === 0 ? 0 : (desk ? '-18px' : '-22px'),
              position: 'relative', zIndex: i + 1, overflow: 'hidden',
              // The 390 frame leans its cards harder than the wide ones.
              transform: tilt(s, (filled ? -1 : 1) * (s.mob ? 2.25 : 1)),
              background: filled ? hue : cream, color: fg,
              border: `${s.bw} solid ${s.retro ? ink : fg}`, borderRadius: cardR,
              padding: desk ? '13px 13px 13px 20px' : '16px 16px 16px 24px',
              boxShadow: hard(s, thrown, -3, desk ? 8 : 9),
              cursor: s.live ? 'pointer' : undefined,
            }}>
              <span style={{ fontFamily: s.body, fontSize: desk ? '15px' : '18px', flex: 'none' }}>{t.n}</span>
              <span style={col('3px', { flex: 1, minWidth: 0 })}>
                {/* The 390 frame wraps long titles at label-md; the wider
                    frames truncate at their own sizes. */}
                <span style={labelStyle(s, desk ? '18px' : s.mob ? s.labelMd : s.title,
                  s.mob ? { whiteSpace: 'normal' } : { overflow: 'hidden', textOverflow: 'ellipsis' })}>{t.name}</span>
                <span style={{
                  fontFamily: s.body, fontSize: desk ? '10px' : '12px', opacity: 0.75,
                  maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{t.sub}</span>
              </span>
              <span style={{
                width: desk ? 29 : 35, height: desk ? 29 : 35,
                borderRadius: '999px', flex: 'none',
                background: filled ? (s.retro ? '#EDE0C4' : fg) : ink,
                color: filled ? hue : cream,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>{on && playing
                ? <Pause size={desk ? 10 : 12} fill="currentColor" strokeWidth={0} />
                : <Play size={desk ? 10 : 12} fill="currentColor" strokeWidth={0} />}</span>
              <span style={{
                width: desk ? 49 : 60, height: desk ? 49 : 60, flex: 'none',
                borderRadius: s.retro ? (desk ? '5px' : '6px') : s.radiusSm, overflow: 'hidden',
                // The frame borders only the open cards' art, hairline.
                border: s.retro ? (filled ? 'none' : `1px solid ${ink}`) : `${s.bw} solid ${fg}`,
              }}><Photo s={s} initialsSize={14} src={t.img} /></span>
              {filled && <Grain s={s} exact blend="screen" opacity={0.4} />}
            </div>
          )
        })}
      </div>
    )

    const player = (
      <div style={{
        position: 'relative', width: '100%',
        background: s.deep, color: s.deepFg, borderRadius: playerR,
        padding: desk ? '26px' : '32px',
        boxShadow: desk ? hard(s, wine, 8, 11) : hard(s, wine, 10, 14),
        // Both fixed-height frames: the 390 one squashes the disc into the
        // leftover space rather than keeping it square.
        height: desk ? '443px' : s.mob ? '393px' : undefined,
        ...col(desk ? '15px' : '18px', { alignItems: 'center', justifyContent: desk ? 'space-between' : undefined }),
      }}>
        <Grain s={s} exact blend="lighten" opacity={0.3} radius={playerR} />
        <ChevronLeft size={16} style={{ alignSelf: 'center', opacity: 0.8 }} />
        <div style={{
          width: desk ? '207px' : '252px', maxWidth: '100%',
          aspectRatio: s.mob ? undefined : '1', flex: s.mob ? 1 : 'none', minHeight: s.mob ? 0 : undefined,
          borderRadius: s.retro ? (desk ? '41px' : '50px') : s.radiusSm, overflow: 'hidden', position: 'relative',
        }}><Photo s={s} initialsSize={44} src={sleeve} /></div>
        <div style={col('4px', { alignItems: 'center', position: 'relative' })}>
          {/* The frame sets the now-playing block in the body face, like a real
              player UI — not the display serif. */}
          <span style={{
            fontFamily: s.retro ? s.body : s.display, fontWeight: s.retro ? 600 : undefined,
            fontSize: desk ? '16px' : '20px', letterSpacing: s.retro ? 0 : s.dls,
            textAlign: 'center',
          }}>{now.track}</span>
          <span style={{ fontFamily: s.body, fontSize: desk ? '11px' : '13px', opacity: 0.7 }}>{now.by}</span>
        </div>
        <div style={row(desk ? '12px' : '14px', { position: 'relative' })}>
          <span style={ctl(false)} onClick={s.live ? () => goTo(at - 1) : undefined}>
            <SkipBack size={desk ? 12 : 14} fill="currentColor" strokeWidth={0} />
          </span>
          <span style={ctl(true)} onClick={s.live ? toggle : undefined}>
            {playing
              ? <Pause size={desk ? 13 : 16} fill="currentColor" strokeWidth={0} />
              : <Play size={desk ? 13 : 16} fill="currentColor" strokeWidth={0} />}
          </span>
          <span style={ctl(false)} onClick={s.live ? () => goTo(at + 1) : undefined}>
            <SkipForward size={desk ? 12 : 14} fill="currentColor" strokeWidth={0} />
          </span>
        </div>
        <div style={row('10px', { width: '100%', position: 'relative' })}>
          <span style={{ fontFamily: s.body, fontSize: '10px', opacity: 0.7 }}>{now.at}</span>
          <span style={{ flex: 1, height: '3px', background: s.retro ? 'rgba(0,0,0,0.28)' : s.deepFg25, borderRadius: '99px' }}>
            <span style={{ display: 'block', width: `${now.pct}%`, height: '100%', background: wine, borderRadius: '99px' }} />
          </span>
          <span style={{ fontFamily: s.body, fontSize: '10px', opacity: 0.7 }}>{now.of}</span>
        </div>
        {audio}
      </div>
    )

    // Frame 446:2265 — accent pill with beige Anton type and a mustard block,
    // the inverse of the Book Now pill. It is the section's one outbound link:
    // with a Soundcloud address typed in, the published page opens it in a new
    // tab; with the field empty, or on the canvas, it stays the picture it was.
    const sc = extLink(s, s.soundcloud)
    const Pill = sc ? 'a' : 'span'
    const pill = s.retro ? (
      <Pill {...sc} style={{
        ...row('8px'), background: s.ac, color: s.bg, cursor: 'pointer',
        padding: desk ? '8px 16px' : '10px 20px', borderRadius: s.btnR,
        boxShadow: hard(s, s.pillBg, 3, 4),
        ...labelStyle(s, desk ? '16px' : '20px'),
      }}>Soundcloud</Pill>
    ) : (
      <BookPill s={s} label="Soundcloud" ext={s.soundcloud} />
    )

    return (
      <div style={{ position: 'relative' }}>
        <Checkerboard s={s} cell={desk ? 19 : 24} colour={s.retro ? s.bg : s.pillBg}
                      style={{ position: 'absolute', width: 'auto', ...bleedTo(s, 'top') }} />
        <TornEdge s={s} side="bottom" height={30} />
        <div style={col(desk ? '16px' : '40px')}>
          {heading}
          <div style={{
            // minmax(0,…): a long nowrap subline must truncate, not size the
            // track to its min-content and push the cards past the canvas.
            display: 'grid',
            gridTemplateColumns: desk ? 'minmax(0, 1.27fr) minmax(0, 1fr)' : 'minmax(0, 1fr)',
            gap: desk ? '49px' : '32px', alignItems: 'center',
          }}>
            {stack}
            {player}
          </div>
          <span style={{ alignSelf: 'flex-start' }}>{pill}</span>
        </div>
      </div>
    )
  }
  return (
    <div style={col('28px')}>
      <h2 style={{ margin: 0, ...h2Style(s) }}>{s.title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: s.g3, gap: '20px' }}>
        {s.tracks3.map((t, i) => (
          <div key={i} onClick={onPick(i)} style={{
            border: `1.5px solid ${chosen && i === at ? s.ac : s.line}`,
            borderRadius: s.radius, padding: '18px',
            cursor: s.live ? 'pointer' : undefined, ...col('14px'),
          }}>
            {/* The track's own artwork where it has some, the big numeral where
                it does not — this layout has no other picture to fall back on. */}
            <div style={{
              background: s.soft, borderRadius: s.radiusSm, aspectRatio: '1', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {t.img
                ? <img src={t.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                : <span style={{ fontFamily: s.display, fontSize: '26px', color: s.muted, letterSpacing: s.dls }}>{t.n}</span>}
            </div>
            <div style={row('12px', { justifyContent: 'space-between' })}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</div>
                <div style={{ fontSize: '12px', color: s.muted }}>{t.sub}</div>
              </div>
              <span style={{
                width: '36px', height: '36px', borderRadius: '999px', background: s.ac, color: s.acFg,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none', cursor: 'pointer',
              }}>{chosen && i === at && playing ? <Pause size={11} /> : <Play size={11} />}</span>
            </div>
          </div>
        ))}
      </div>
      {/* This layout has no transport of its own — the cards are the whole of
          it — but it plays through the same element as the reference design. */}
      {audio}
      {/* This layout draws no Soundcloud pill of its own — unlike the reference
          design above, where it is part of the frame. It appears only once the
          artist has an address for it, so a layout switch never grows a button
          that leads nowhere. */}
      {s.soundcloud && (
        <span style={{ alignSelf: 'flex-start' }}>
          <BookPill s={s} label="Soundcloud" ext={s.soundcloud} />
        </span>
      )}
    </div>
  )
}

function Tags({ s }) {
  if (s.v0) {
    return (
      <div style={col('18px', { alignItems: 'center', textAlign: 'center' })}>
        <span style={kickerStyle(s)}>Browse by tag</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', maxWidth: '640px' }}>
          {s.chips.map((c, i) => (
            <span key={i} style={{
              background: c.bg, color: c.fg, fontSize: '12px', fontWeight: 700,
              letterSpacing: '1.2px', textTransform: 'uppercase', padding: '9px 18px', borderRadius: s.btnR,
            }}>{c.label}</span>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div style={row('14px', {
      borderTop: `1.5px solid ${s.line}`, borderBottom: `1.5px solid ${s.line}`,
      padding: '18px 0', overflow: 'hidden', flexWrap: 'nowrap',
    })}>
      {s.chips.map((c, i) => (
        <span key={i} style={row('10px', { flex: 'none' })}>
          <span style={{ color: s.ac, fontSize: '12px', lineHeight: 1 }}>●</span>
          <span style={{ fontFamily: s.display, fontSize: '20px', letterSpacing: s.dls, whiteSpace: 'nowrap' }}>{c.label}</span>
        </span>
      ))}
    </div>
  )
}

function Audio({ s }) {
  return (
    <div>
      <h2 style={{ margin: '0 0 28px', ...h2Style(s) }}>{s.title}</h2>

      {s.v0 && (
        <div>
          {s.tracks.map((t, i) => (
            <div key={i} className="hv-indent" style={row('18px', {
              padding: '15px 4px', borderBottom: `1.5px solid ${s.line}`, transition: 'padding-left .15s ease',
            })}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: s.muted, width: '22px', flex: 'none' }}>{t.n}</span>
              <span style={{ flex: 1, fontSize: '15px', fontWeight: 700, minWidth: 0 }}>{t.name}</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: s.muted }}>{t.dur}</span>
              <span style={{
                width: '32px', height: '32px', borderRadius: '999px', border: `1.5px solid ${s.line2}`,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none', cursor: 'pointer',
              }}><Play size={10} /></span>
            </div>
          ))}
        </div>
      )}

      {s.v1 && (
        <div style={{ display: 'grid', gridTemplateColumns: s.g2, gap: '14px' }}>
          {s.tracks.map((t, i) => (
            <div key={i} className="hv-acbord" style={row('14px', {
              border: `1.5px solid ${s.line}`, borderRadius: s.radius, padding: '14px 16px',
              transition: 'border-color .15s ease',
            })}>
              <span style={{
                width: '40px', height: '40px', background: s.soft, borderRadius: s.radiusSm, flex: 'none',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: s.display, fontSize: '14px', letterSpacing: s.dls,
              }}>{t.n}</span>
              <span style={{ flex: 1, fontSize: '14px', fontWeight: 700, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</span>
              <span style={{ fontSize: '12px', color: s.muted }}>{t.dur}</span>
            </div>
          ))}
        </div>
      )}

      {s.v2 && (
        <div>
          {s.tracks.map((t, i) => (
            <div key={i} style={row('22px', {
              alignItems: 'baseline', padding: '12px 0', borderBottom: `1.5px solid ${s.line}`,
            })}>
              <span style={{ fontFamily: s.display, fontSize: '30px', color: s.ac, width: '52px', flex: 'none', letterSpacing: s.dls }}>{t.n}</span>
              <span style={{ flex: 1, fontFamily: s.display, fontSize: '24px', letterSpacing: s.dls, minWidth: 0 }}>{t.name}</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: s.muted }}>{t.dur}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Video({ s }) {
  if (s.v0) {
    return (
      <div style={col('16px')}>
        <div style={{
          background: s.soft, aspectRatio: '16 / 9', borderRadius: s.radius,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            width: '76px', height: '76px', borderRadius: '999px', background: s.ac, color: s.acFg,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,.25)', cursor: 'pointer',
          }}><Play size={22} /></span>
        </div>
        <div style={row('16px', { justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, color: s.muted })}>
          <span>{s.title}</span><span>{s.videoDur}</span>
        </div>
      </div>
    )
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: s.split, gap: '44px', alignItems: 'center' }}>
      <div style={col('14px')}>
        <span style={kickerStyle(s)}>Watch</span>
        <h2 style={{ margin: 0, ...h2Style(s), lineHeight: 1.04 }}>{s.title}</h2>
        <p style={{ margin: 0, fontSize: '15px', color: s.muted, lineHeight: 1.6 }}>{s.videoDesc}</p>
      </div>
      <div style={{
        background: s.soft, aspectRatio: '16 / 10', borderRadius: s.radius,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          width: '64px', height: '64px', borderRadius: '999px', background: s.ac, color: s.acFg,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}><Play size={18} /></span>
      </div>
    </div>
  )
}

// v0 — Pricing layout 1 · 3-col in soft panel (§10.2 reference design): cards,
// each in its own palette hue, each a degree or two off square. Every accent
// inside a card — the price numeral, the tick, the [ico] chip, the Book Now
// pill and the hard offset block it throws — is that card's *second* hue,
// `t.acc` (see the pricing branch of sectionVm).
//
// Three cards is only what the seed carries: the packages are the artist's list
// now, and the chip row above them filters it on the published page.
function Pricing({ s }) {
  // The selected filter chip, gated on `s.live` below like Repertoire's: it is
  // a real control in the published tab and inert on the editor canvas, which
  // is a picture of a website (§12.7) — a live chip there would both filter the
  // cards and select the section. Above the layout branch, because hooks are.
  const [chip, setChip] = useState(0)

  if (s.v0) {
    const TILT = [1, -3, 2]
    // §5.5 — the 768 and 390 frames are exactly the tablet and mobile canvases,
    // so their numbers are verbatim where the desktop ones are the 1440 frame
    // × 0.82. Most of what the two narrow frames set they set identically, so
    // those read `s.narrow`; only the four places they genuinely diverge —
    // the column count, the card padding, the tier head's axis and the tier
    // name — split on `tab` / `s.mob`.
    //
    // Neither narrow frame is a squeezed desktop: both stack the head into a
    // column, tablet keeps three columns while mobile overlaps one, and mobile
    // is the only frame that draws its cards' pills at the header's full size.
    //
    // NB both narrow frames render with another template's type tokens resolved
    // in (Bebas Neue for display, Chakra Petch for ui) where the desktop one
    // resolves Retro's — the pill and the tier name, hard-coded to Anton in the
    // mobile frame, are the tell. Only the layout and the sizes are taken from
    // them; the faces stay the theme's, as everywhere else.
    const tab = isTablet(s)
    // The chip index, clamped: the row is derived from the artist's tags, so a
    // tag they delete can leave `chip` past the end of it. The canvas pins the
    // first chip and filters nothing, which is the picture the frames show.
    const active = s.live ? Math.min(chip, s.tierChips.length - 1) : 0
    const eq = (a, b) => a.toLowerCase() === b.toLowerCase()
    const shown = s.live
      ? s.tiers.filter((t) => active === 0 || t.tags.some((g) => eq(g, s.tierChips[active].tag)))
      : s.tiers
    return (
      <div style={col(s.narrow ? '32px' : '26px')}>
        <div style={s.narrow
          ? col('24px', { alignItems: 'flex-start' })
          : row('20px', { justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' })}>
          <h2 style={{
            margin: 0, fontFamily: s.display, fontSize: s.dispSm, lineHeight: 1.1,
            letterSpacing: s.dls, color: s.ac,
            maxWidth: s.mob ? '100%' : tab ? '640px' : '44%',
          }}>{s.title}</h2>
          {/* The one row in §10.2 whose chips are body-bold sentence case rather
              than Anton caps, and whose selected chip drops its rule. Built from
              the tags the artist typed — the frame's Solo / Trio / Band is now
              the seeds' tags, behind an All — so it is not drawn at one chip:
              a filter with nothing to filter is the pager's case. */}
          {s.tierChips.length > 1 && (
            <div style={row('8px', { flexWrap: 'wrap' })}>
              {s.tierChips.map((f, i) => (
                <span
                  key={i}
                  onClick={s.live ? () => setChip(i) : undefined}
                  style={{
                    border: i === active ? 'none' : `${s.bw} solid ${s.tx}`,
                    borderRadius: s.btnR, padding: s.narrow ? '5px 11px' : '4px 9px',
                    background: i === active ? s.ac : 'transparent',
                    color: i === active ? s.acFg : s.tx,
                    boxShadow: i === active ? hard(s, s.pillBg, 3, 4) : 'none', cursor: 'pointer',
                    fontFamily: s.body, fontSize: s.narrow ? '12.5px' : '10px',
                    fontWeight: 700, whiteSpace: 'nowrap',
                  }}
                >{f.label}</span>
              ))}
            </div>
          )}
        </div>

        <div style={{
          // Three columns everywhere but the 390 frame, which stacks them — and
          // under Retro stacks them *overlapping*: each card but the last is
          // pulled 18px into the next, so the deck reads as thrown down rather
          // than laid out. Later cards paint over earlier ones by document
          // order, which is the way round the reference has it. The overlap is
          // §10.2 decoration in the same class as tilt() and hard() — it only
          // reads because the cards are rotated and throw an offset block — so
          // the four flat templates keep a plain gap instead of butting their
          // borders together.
          // Three columns everywhere but the 390 frame whatever the package
          // count is: a card holds the width it was drawn at, and a fourth
          // wraps onto a second row rather than squeezing the first three.
          display: 'grid', gridTemplateColumns: s.mob ? '1fr' : '1fr 1fr 1fr',
          gap: s.mob ? (s.retro ? '0' : '22px') : tab ? '20px' : '36px',
          alignItems: 'stretch',
        }}>
          {shown.map((t, i) => {
            const money = String(t.price)
            const symbol = /^[^\d]/.test(money) ? money[0] : ''
            const amount = symbol ? money.slice(1) : money
            return (
              // Keyed on the package's place in the WHOLE list, not on this
              // page of it: the card cross-fades its background, so a
              // positional key would hand a filtered-out card's node to its
              // neighbour and animate one card hue into another. The tilt and
              // the overlap below take the *rendered* index instead — they are
              // decoration, and the deck has to read as a deck at any count.
              <div key={t.n} style={{
                position: 'relative', transform: tilt(s, TILT[i % TILT.length]),
                background: t.card, color: t.cardFg,
                border: `${s.bw} solid ${s.tx}`, borderRadius: s.radius,
                padding: s.mob ? '24px' : tab ? '30px 20px' : '20px',
                marginBottom: s.mob && s.retro && i < shown.length - 1 ? '-18px' : undefined,
                // The block behind the card is the card's own second hue, so the
                // gold card throws orange and the other two throw gold.
                boxShadow: s.narrow ? hard(s, t.acc, 8, 8) : hard(s, t.acc, 6.6, 6.6),
                display: 'flex', flexDirection: 'column', gap: s.narrow ? '14px' : '12px',
                transition: 'background-color .45s ease, color .45s ease',
              }}>
                {/* Figma composites the texture sheet at mix-blend-screen, and
                    `exact` is what keeps that rather than the softened treatment
                    every other section gets. .18 is where the three card hues
                    land on the reference's measured surface; .4 (the sheet's own
                    opacity in Figma, over a sheet cropped differently) washes
                    them out, and the soft-light default darkens them. */}
                <Grain s={s} opacity={0.18} blend="screen" exact radius={s.radius} />
                {/* The chip sits beside the name on desktop and above it on the
                    narrower tablet card, where the name also steps up to the
                    theme's label-md. */}
                {/* The chip sits beside the name on the 1440 and 390 frames and
                    above it on the narrower tablet card, where the name also
                    steps up. */}
                <span style={tab
                  ? col('10px', { position: 'relative', alignItems: 'flex-start' })
                  : row(s.mob ? '10px' : '8px', { position: 'relative' })}>
                  <span style={{
                    background: t.acc, color: t.card, borderRadius: '4px',
                    padding: s.narrow ? '4px 6px' : '3px 5px',
                    fontFamily: s.body, fontSize: s.narrow ? '10px' : '9px',
                  }}>ico</span>
                  <span style={labelStyle(s, s.mob ? '16px' : tab ? '20px' : '13px',
                    // Anton is wider than the face the tablet frame rendered, so
                    // matching its cap height overshoots its measure — and the
                    // four other templates' label faces are wider again. Letting
                    // the name wrap is what keeps 20px safe off Retro. The 390
                    // card is wide enough not to need it.
                    tab ? { whiteSpace: 'normal' } : undefined)}>{t.name}</span>
                </span>

                <span style={row(s.narrow ? '4px' : '3px', {
                  alignItems: 'baseline', position: 'relative',
                })}>
                  <span style={{
                    fontFamily: s.body, fontSize: s.narrow ? '18px' : '15px', fontWeight: 700,
                  }}>{symbol}</span>
                  <span style={{
                    fontFamily: s.display, fontSize: s.narrow ? '40px' : s.dispSm,
                    lineHeight: s.narrow ? 0.825 : 0.85,
                    letterSpacing: s.dls, color: t.acc,
                  }}>{amount}</span>
                  <span style={{
                    fontFamily: s.body, fontSize: s.narrow ? '12px' : '10px', color: t.cardMut,
                  }}>{s.tierUnit}</span>
                </span>

                <p style={{
                  margin: 0, position: 'relative', fontFamily: s.body,
                  fontSize: s.narrow ? '13px' : s.eyebrow,
                  lineHeight: s.narrow ? '20px' : 1.5, color: t.cardMut,
                }}>{t.blurb}</p>

                <div style={col(s.narrow ? '8px' : '7px', {
                  position: 'relative', paddingTop: s.narrow ? '4px' : '3px',
                })}>
                  {t.feats.map((f, j) => (
                    <span key={j} style={row(s.narrow ? '8px' : '7px', {
                      fontFamily: s.body, fontSize: s.narrow ? s.labelXs : '16px', lineHeight: 1.26,
                    })}>
                      <Check size={s.narrow ? 12 : 11} color={t.acc} style={{ flex: 'none' }} />
                      {f}
                    </span>
                  ))}
                </div>

                {/* The pill hugs its label — without this the wrapper stretches
                    to the column and the pill inside fills it. */}
                <span style={{
                  // The 390 card hugs its content rather than stretching, so
                  // marginTop:auto does nothing there and the 30px the frame
                  // puts between the feats and the pill has to come from the
                  // padding on top of the card's own 14px gap.
                  marginTop: 'auto', paddingTop: s.mob ? '16px' : '6px',
                  position: 'relative', alignSelf: 'flex-start',
                }}>
                  <BookPill s={s} to={s.tierBookTo} bg={t.acc} fg={t.card} shadow={s.paper} full={s.mob} />
                </span>
              </div>
            )
          })}
        </div>

        {/* An empty grid is a real state now that the packages are the
            artist's. One message, not the repertoire's two: every chip but All
            exists because some package carries its tag, so a live filter can
            never empty a list that has anything in it — there is no search box
            here to do what the repertoire's does. */}
        {s.tiers.length === 0 && (
          <span style={{
            fontFamily: s.body, fontSize: s.narrow ? '14px' : '13px', color: s.muted,
          }}>No packages yet.</span>
        )}

        <span style={{
          fontFamily: s.body, fontSize: s.narrow ? '11px' : '10px', color: s.pricingSubFg,
        }}>{s.pricingSub}</span>
      </div>
    )
  }
  return (
    <div>
      <h2 style={{ margin: '0 0 28px', ...h2Style(s) }}>{s.title}</h2>
      {s.tiers.map((t, i) => (
        <div key={i} style={row('20px', {
          padding: '20px 4px', borderBottom: `1.5px solid ${s.line}`, flexWrap: 'wrap',
        })}>
          <div style={{ minWidth: '180px', flex: 1 }}>
            <div style={{ fontSize: '16px', fontWeight: 700 }}>{t.name}</div>
            <div style={{ fontSize: '13px', color: s.muted }}>{t.blurb}</div>
          </div>
          <span style={{ fontFamily: s.display, fontSize: '26px', letterSpacing: s.dls }}>{t.price}</span>
          <span className="hv-acfill" style={{
            border: `1.5px solid ${s.line2}`, fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px',
            textTransform: 'uppercase', padding: '10px 20px', borderRadius: s.btnR, cursor: 'pointer',
            transition: 'background-color .15s ease, color .15s ease, border-color .15s ease',
          }}>Enquire</span>
        </div>
      ))}
    </div>
  )
}

// A row of numbered page buttons, shared by Repertoire and Events Map.
// `frame` carries the Repertoire frames' chunkier square buttons — a bigger
// box on a heavier border, an active page that keeps the same border rather
// than dissolving into its own fill, the centred row its tablet uses and the
// full-measure one its mobile does, on a shorter page list. The map passes
// none of that and keeps the flatter default, but both now pass the page list
// and the handlers.
// The pager's button row for `n` pages, windowed around the active one and
// elided with '…' where it skips — the shape the static PAGES constant used to
// hardcode. Lives here rather than in data.js because the page count depends on
// the search and chip state, which only this file holds. Returns the labels and
// the index of the active one *within them*, which is what Pager highlights.
function pageWindow(n, active, narrow) {
  if (n <= 1) return { labels: [], at: 0 }
  const keep = narrow ? 3 : 5          // numbered buttons at most
  const page = active + 1              // the row is 1-based
  // The first, the last and the current page are never dropped; the rest fills
  // outwards from the current one until the row is as long as it may be.
  const nums = new Set([1, n, page])
  for (let d = 1; nums.size < keep && d < n; d++) {
    if (page - d >= 1) nums.add(page - d)
    if (nums.size < keep && page + d <= n) nums.add(page + d)
  }
  const sorted = [...nums].sort((a, b) => a - b)
  const labels = []
  sorted.forEach((v, i) => {
    if (i && v !== sorted[i - 1] + 1) labels.push('…')
    labels.push(String(v))
  })
  return { labels, at: labels.indexOf(String(page)) }
}

// `frame.active` is an index into the *rendered* button row, which stops
// matching the page number as soon as pageWindow() elides it with '…' — hence
// pageWindow returning both. `active`, `onPage` and `onStep` are all optional,
// and both callers omit the handlers on the editor canvas: a pager with none is
// the picture of a pager, and the cursor below follows.
function Pager({ s, colour, fill, frame = {} }) {
  const c = colour || s.tx
  const w = frame.size || (s.mob ? 30 : 42)
  const btn = (key, child, on, ends, onClick) => (
    <span key={key} onClick={onClick} style={{
      minWidth: w, height: w, padding: '0 8px',
      borderRadius: frame.radius || s.radiusSm,
      border: `${frame.bw || s.bw} solid ${on ? (frame.activeEdge || s.pillBg) : c}`,
      background: on ? s.pillBg : (ends ? (fill || 'transparent') : 'transparent'),
      color: on ? (frame.activeFg || contrastInk(s.pillBg)) : c,
      // Off the published page there is no handler, and a pointer over a button
      // that does nothing is the gallery's rule broken (it gates its own on
      // `s.live`). Reading the handler says the same thing without Pager having
      // to know about `live`.
      cursor: onClick ? 'pointer' : undefined,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      ...(frame.font || labelStyle(s, s.eyebrow)),
      // `grow` spreads the row across the whole measure, so it comes after the
      // box metrics it overrides.
      ...(frame.grow ? { flex: 1, minWidth: 0 } : null),
    }}>{child}</span>
  )
  return (
    <div style={row('8px', {
      flexWrap: frame.grow ? 'nowrap' : 'wrap', justifyContent: frame.justify,
    })}>
      {btn('prev', <ArrowLeft size={14} />, false, true, frame.onStep && (() => frame.onStep(-1)))}
      {(frame.pages || []).map((p, i) => btn(
        `p${i}`, p, i === (frame.active || 0), false,
        // '…' is a gap in the row, not a page.
        frame.onPage && p !== '…' ? () => frame.onPage(p) : undefined,
      ))}
      {btn('next', <ArrowRight size={14} />, false, true, frame.onStep && (() => frame.onStep(1)))}
    </div>
  )
}

// v0 — Repertoire layout 1 · Two-column dense (§10.2 reference design)
//
// The reference frames stand the section on cream under a torn beige edge: a
// display heading by a boxed search field, a row of Inter chips, then the songs
// in olive-outlined cards each closed by a two-row checkerboard, over a row of
// square pager buttons. Desktop (964:58580) is the 1440 frame × 0.82; tablet
// (986:35799) and mobile (880:15524) are their own 768 and 390 frames verbatim,
// and are a different design rather than the desktop shrunk — one column of six
// songs at nearly the desktop's type sizes. Almost every box below is therefore
// `narrow ? <frame> : <frame × 0.82>`, and the three differ only in the head
// (bottom-aligned on tablet, stacked on mobile), the two display sizes, and the
// pager: left on desktop, centred on tablet, full-measure on mobile.
function Repertoire({ s }) {
  // The search term, the selected chip and the page. All three are gated on
  // `s.live` below: they drive real controls in the published tab and are inert
  // on the editor canvas, which is deliberately a picture of a website (§12.7)
  // — a live chip there would both filter the list and select the section.
  const [q, setQ] = useState('')
  const [chip, setChip] = useState(0)
  const [page, setPage] = useState(0)

  if (s.v0) {
    const tab = isTablet(s)
    const hue = s.repHue   // Retro: olive
    const ink = s.retro ? '#1B1714' : s.tx
    // Cream type on the frame's wine chip and mustard page button. Neither fill
    // is a palette hue, so away from Retro the contrast has to be computed
    // against whatever the palette does put there — `undefined` leaves the page
    // button to Pager's own default.
    const chipFg = s.retro ? '#FBF6EA' : s.acFg
    const pageFg = s.retro ? '#FBF6EA' : undefined
    // Two off-palette hues the frame reserves for this section: the wine of the
    // selected chip (the media player's) and the blush behind the pager arrows.
    const wine = s.retro ? '#9E1F17' : s.ac
    const blush = s.retro ? '#EDC6B3' : s.soft2
    // Twelve to a page on desktop, six on both narrow frames — the counts the
    // reference frames show.
    const perPage = s.narrow ? 6 : 12
    // The chip index, clamped: the row is derived from the artist's tags, so a
    // tag they delete can leave `chip` past the end of it.
    const active = s.live ? Math.min(chip, s.repChips.length - 1) : 0
    const needle = q.trim().toLowerCase()
    const eq = (a, b) => a.toLowerCase() === b.toLowerCase()
    const hit = (t) => (
      (active === 0 || t.tags.some((g) => eq(g, s.repChips[active].tag)))
      && (!needle || t.title.toLowerCase().includes(needle) || t.artist.toLowerCase().includes(needle))
    )
    const filtered = s.live ? s.songs.filter(hit) : s.songs
    const pages = Math.max(1, Math.ceil(filtered.length / perPage))
    // Clamped rather than reset through an effect: a filter that shortens the
    // list must not strand the pager on a page that no longer exists.
    const pg = Math.min(page, pages - 1)
    const shown = filtered.slice(pg * perPage, (pg + 1) * perPage)
    // The desktop frame reads its list DOWN each column, so the page splits in
    // half and each half runs down its own column: 1–6 on the left, 7–12 on the
    // right. The number is the song's place in the artist's list — hence the
    // page offset — not its place on the screen. Both narrow frames run the
    // whole six-song page down one column.
    const half = Math.ceil(shown.length / 2)
    const columns = (s.narrow ? [shown] : [shown.slice(0, half), shown.slice(half)])
      .map((cs, ci) => cs.map((t, i) => ({ ...t, n: pg * perPage + ci * half + i + 1 })))
    const { labels, at } = pageWindow(pages, pg, s.mob)

    return (
      <div style={{ position: 'relative', ...col(s.narrow ? '32px' : '26px') }}>
        <TornEdge s={s} side="top" height={tab ? 30 : 26} />

        {/* Mobile stacks the field under the heading full-width; tablet hangs
            it off the heading's baseline; desktop centres it against the block. */}
        <div style={row(tab ? '32px' : '20px', {
          justifyContent: 'space-between',
          flexDirection: s.mob ? 'column' : 'row',
          // Above mobile the field shrinks rather than wrapping, which would
          // break the frames' one-line head.
          flexWrap: 'nowrap',
          alignItems: s.mob ? 'stretch' : tab ? 'flex-end' : 'center',
        })}>
          {/* The heading is the fixed half of the head row: it holds its
              measure and the field yields to it, but it is capped at the row
              so an over-long one wraps inside rather than running off. */}
          <div style={col(s.narrow ? '16px' : '13px', {
            flex: 'none', maxWidth: '100%',
          })}>
            {/* The frames set the eyebrow in tracked Inter bold, not Anton. */}
            <span style={{
              fontFamily: s.body, fontWeight: 700, fontSize: '11px',
              letterSpacing: s.narrow ? '1.5px' : '1.2px',
              textTransform: 'uppercase', color: s.ac, whiteSpace: 'nowrap',
            }}>Repertoire</span>
            {/* Both narrow frames carry their own display-lg — 81px and 54px —
                rather than the RAMP's sizes for those widths. */}
            <h2 style={{
              margin: 0, fontFamily: s.display,
              fontSize: s.mob ? '54px' : tab ? '81px' : s.dispLg,
              lineHeight: 0.89, letterSpacing: s.dls, color: s.ac,
            }}>{s.title}</h2>
          </div>
          {/* Fraunces sets the heading a good deal wider than the frame's
              Soulway, so the field takes its width as a shrinkable basis: it
              gives way to the heading instead of wrapping below it. */}
          <div style={row(s.narrow ? '10px' : '8px', {
            border: `${s.bw} solid ${ink}`, borderRadius: s.narrow ? '8px' : '7px',
            padding: s.narrow ? '10px' : '8px',
            width: s.mob ? '100%' : tab ? 338 : 230,
            flex: s.mob ? undefined : `0 1 ${tab ? 338 : 230}px`,
            minWidth: 0, overflow: 'hidden', height: 50,
          })}>
            {/* Orange tile, mustard glyph — the one place the frames pair them. */}
            <span style={{
              width: s.narrow ? 31 : 36, height: '100%', flex: 'none',
              borderRadius: s.narrow ? '3px' : '2.5px',
              background: s.ac, color: s.retro ? s.pillBg : s.acFg,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}><Search size={s.narrow ? 20 : 17} /></span>
            {/* The one place the picture becomes a control: on the published
                page this is a real field, on the canvas the same span it has
                always been. Both carry the frame's type, so they measure the
                same and the field does not jump when the page is published. */}
            {s.live ? (
              <input
                value={q} placeholder="Search songs or artists…"
                onChange={(e) => { setQ(e.target.value); setPage(0) }}
                style={{
                  fontFamily: s.display, fontSize: s.narrow ? '13px' : '11px', letterSpacing: s.dls,
                  color: s.retro ? '#4A4136' : s.tx,
                  flex: 1, minWidth: 0, border: 'none', outline: 'none',
                  background: 'transparent', padding: 0,
                }}
              />
            ) : (
              <span style={{
                fontFamily: s.display, fontSize: s.narrow ? '13px' : '11px', letterSpacing: s.dls,
                color: s.retro ? '#4A4136' : s.muted, whiteSpace: 'nowrap',
              }}>
                Search songs or artists…
              </span>
            )}
          </div>
        </div>

        <div style={row(s.narrow ? '8px' : '7px', { flexWrap: 'wrap' })}>
          {/* Built from the tags the artist typed, so the row is theirs. On the
              canvas the first chip is selected and nothing else can be, which
              is exactly the picture the frames show. */}
          {s.repChips.map((f, i) => (
            <span
              key={i}
              onClick={s.live ? () => { setChip(i); setPage(0) } : undefined}
              style={{
                // The selected chip carries no outline of its own, so it takes a
                // transparent one to stand the same height as the rest.
                border: `${s.bw} solid ${i === active ? 'transparent' : s.tx}`,
                borderRadius: s.btnR, padding: s.narrow ? '3px 9px' : '2px 9px',
                background: i === active ? wine : 'transparent', color: i === active ? chipFg : s.tx,
                boxShadow: i === active ? hard(s, s.pillBg, s.narrow ? 3 : 2, s.narrow ? 4 : 3) : 'none',
                cursor: 'pointer',
                fontFamily: s.body, fontWeight: 700, fontSize: s.narrow ? '12.5px' : '10px',
                lineHeight: 1.2, whiteSpace: 'nowrap',
              }}
            >{f.label}</span>
          ))}
        </div>

        {/* An empty list is a real state now that the songs are the artist's:
            either they have listed none at all, or a live filter has cleared
            the page. Only the published page can reach the second. */}
        {shown.length === 0 ? (
          <span style={{
            fontFamily: s.body, fontSize: s.narrow ? '14px' : '13px',
            color: s.muted, padding: '4px 0',
          }}>{s.songs.length === 0 ? 'No songs yet.' : 'No songs match that.'}</span>
        ) : (
        <div style={{
          display: 'grid', gridTemplateColumns: s.narrow ? '1fr' : '1fr 1fr', gap: '26px',
        }}>
          {/* minWidth 0 on the track itself: a `1fr` column will not go below
              its content's minimum, so a wide display face would otherwise push
              the whole grid past the canvas. */}
          {columns.map((colSongs, ci) => (
            <div key={ci} style={col(s.narrow ? '10px' : '8px', { minWidth: 0 })}>
              {colSongs.map((t) => (
                <div key={t.n} style={{
                  position: 'relative', overflow: 'hidden',
                  border: `${s.retro ? (s.narrow ? '3px' : '2.5px') : s.bw} solid ${hue}`,
                  borderRadius: s.narrow ? '20px' : '16px',
                  // The frames' own padding less the border they draw inside:
                  // 27/20/35 on both narrow frames, the same × 0.82 on desktop,
                  // each edge short by the outline.
                  padding: s.narrow ? '24px 17px 32px' : '19px 14px 26px',
                  ...row('0'),
                }}>
                  <span style={{
                    fontFamily: s.display, fontSize: '11px', letterSpacing: s.dls,
                    color: s.ac, width: s.narrow ? 24 : 20, flex: 'none',
                  }}>{t.n}</span>
                  <span style={row('12px', {
                    flex: 1, minWidth: 0, alignItems: 'baseline', justifyContent: 'space-between',
                  })}>
                    {/* Literal, not `s.title`: the view-model's content `title`
                        shadows the RAMP size of the same name, so that key does
                        not carry a length here. The frames' size/title is 26px
                        on mobile, 28 on tablet, 24 × 0.82 on desktop. */}
                    {/* minWidth 0 as well as the ellipsis: without it the
                        title's own min-content sets the grid track, and a wide
                        display face pushes the whole column past the canvas. */}
                    <span style={{
                      fontFamily: s.display, fontSize: s.mob ? '26px' : tab ? '28px' : '20px',
                      lineHeight: 1.1, letterSpacing: s.dls, color: hue, minWidth: 0,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{t.title}</span>
                    <span style={labelStyle(s, s.narrow ? '15px' : s.eyebrow, {
                      color: s.ac, flex: 'none',
                    })}>· {t.artist}</span>
                  </span>
                  {/* Two rows of squares closing the card, over its bottom edge. */}
                  <Checkerboard s={s} cell={s.narrow ? 12 : 10} colour={hue} style={{
                    position: 'absolute', left: 0, right: 0, bottom: 0, width: 'auto',
                  }} />
                </div>
              ))}
            </div>
          ))}
        </div>
        )}

        {/* Derived from the list, so it cannot claim pages that are not there —
            and gone entirely at one page. Mobile spreads its buttons across the
            measure and drops the middle pages to make room, where tablet
            centres the full set and desktop sits it at the left edge. */}
        {labels.length > 0 && (
          <Pager s={s} colour={hue} fill={blush} frame={{
            size: s.narrow ? 54 : 45,
            radius: s.narrow ? '20px' : '16px',
            bw: s.retro ? (s.narrow ? '3px' : '2.5px') : s.bw,
            activeEdge: hue, activeFg: pageFg,
            font: labelStyle(s, s.narrow ? '12px' : '10px'),
            justify: tab ? 'center' : undefined,
            grow: s.mob, pages: labels, active: at,
            // Static on the canvas, like the search field and the chips.
            onPage: s.live ? (label) => setPage(Number(label) - 1) : undefined,
            onStep: s.live
              ? (dir) => setPage(Math.max(0, Math.min(pages - 1, pg + dir)))
              : undefined,
          }} />
        )}
      </div>
    )
  }

  return (
    <div>
      <h2 style={{ margin: '0 0 30px', ...h2Style(s) }}>{s.title}</h2>
      {s.v1 && (
        <div style={{ display: 'grid', gridTemplateColumns: s.g2, gap: '0 44px' }}>
          {s.repFlat.map((it, i) => (
            <div key={i} style={row('12px', {
              justifyContent: 'space-between', padding: '13px 2px',
              borderBottom: `1.5px solid ${s.line}`, fontSize: '14px',
            })}>
              <span style={{ fontWeight: 600 }}>{it.t}</span>
              <span style={{
                color: s.ac, fontSize: '11px', fontWeight: 700, letterSpacing: '1.4px', textTransform: 'uppercase',
              }}>{it.g}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Which thumbnail the strip opens on, and therefore which photo the large
// viewer shows first. §10.2 marks the fourth tile — but only once there are
// four photos to mark, so a part-filled strip never highlights an empty slot.
// On the published page this is only the starting tile; `pick` takes over from
// the first click.
const galActive = (s) => (s.images.length > 3 ? 3 : 0)

function Gallery({ s }) {
  // Hooks before the layout branch, the way Media takes them: `s.v0` is a prop
  // and not a hook's business, so the branch below cannot be the thing that
  // decides whether state exists.
  //
  // `pick` starts at -1, meaning the visitor has not chosen a tile yet, so both
  // sides open on galActive() and the published tab's first paint is exactly
  // the canvas's picture. Live-gated (§12.7) like Repertoire's chips: a
  // thumbnail on the canvas would both change the viewer and select the
  // section.
  const [pick, setPick] = useState(-1)

  const tile = (label, aspect, extra) => (
    <div key={label} style={{
      background: s.soft, borderRadius: s.radiusSm, aspectRatio: aspect, position: 'relative', ...extra,
    }}>
      <span style={{
        position: 'absolute', left: '10px', bottom: '8px', fontSize: '11px', fontWeight: 700,
        letterSpacing: '1.4px', color: s.muted,
      }}>{label}</span>
    </div>
  )
  // v0 — Gallery layout 1 (§10.2 reference design): a stack of media-source
  // rows on the left, the active source's viewer and its thumbnail strip on
  // the right. Only the first row is open; the rest offer a "+".
  if (s.v0) {
    const desk = !s.narrow
    const tab = isTablet(s)
    const strip = [0, 1, 2, 3, 4, 5, 6]
    // The seven slots are always navigable — an empty one shows the same
    // placeholder in the viewer that it shows in the strip, so the count never
    // shifts under the visitor as photos are added or removed, and nothing here
    // has to be clamped against the artist's list the way Media clamps `cur`.
    // Everything that writes `pick` walks the same fixed seven.
    const active = s.live && pick >= 0 ? pick : galActive(s)
    const go = (i) => setPick(((i % strip.length) + strip.length) % strip.length)
    // Mobile draws four of the seven tiles. Rather than stranding photos 5–7
    // where no phone can reach them, the four slide once the visitor walks past
    // the fourth — and the window is anchored at 0 for the first four, so the
    // canvas's mobile picture is the frame's, unchanged.
    const shown = s.mob ? 4 : strip.length
    const from = Math.min(Math.max(active - (shown - 1), 0), strip.length - shown)
    const cardR = s.retro ? (desk ? '25px' : '30px') : s.radius
    const rowR = s.retro ? (desk ? '16px' : '20px') : s.btnR
    // The Figma frame gives each media source its brand glyph; lucide has no
    // TikTok mark, so the closest note glyph stands in.
    const srcIcons = [ImageIcon, Youtube, Instagram, Music2]
    const arrow = (icon, onClick) => (
      <span onClick={onClick} style={{
        width: desk ? 29 : 35, height: desk ? 29 : 35, flex: 'none',
        borderRadius: '999px', background: s.deep, color: s.deepFg,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>{icon}</span>
    )

    // The source's colour square. The Figma frames border the open one in ink
    // and the closed ones in the accent.
    const iconSq = (g, Glyph, size, glyph) => (
      <span style={{
        width: size, height: size, flex: 'none',
        borderRadius: s.retro ? (desk ? '5px' : '6px') : s.radiusSm,
        background: g.bg, color: g.fg,
        border: s.retro ? (g.on ? `2px solid ${s.tx}` : `1px solid ${s.ac}`) : 'none',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
      }}><Glyph size={glyph} /></span>
    )

    // The Figma tablet and mobile frames fold the source list into a row of
    // icon-only tiles: no labels, and only the open tile carries a dismiss
    // glyph. Tablet spreads four equal tiles across the page; mobile keeps them
    // content-sized, and **wraps** rather than clipping.
    //
    // The frame itself lets the row run off the right edge, which cost nothing
    // while the tiles were decoration — but three of them now carry an address
    // the artist typed, and the fourth, TikTok, was the one off the page. Four
    // content-sized tiles come to ~430px against a 390 frame, so nothing short
    // of shrinking them fits on one line; wrapping keeps every Figma dimension
    // exactly as drawn and spends a second row instead. The 20px gap is the
    // row gap too, which clears the open tile's offset shadow.
    // A row with an address the artist typed is an outbound link on the
    // published page, the same seam BookPill takes: `extLink` returns the props
    // or null, the tag follows, and the style object is the same either way so
    // the picture never moves. The first row has no address — it is the strip
    // the arrows and thumbnails already drive.
    //
    // A social row with no address does not appear on the published page at
    // all: an artist who left TikTok blank has no TikTok, and the tile would
    // promise a destination it cannot go to. This is where the gallery parts
    // company with the Soundcloud button, which stays a picture when empty —
    // that pill sits alone, where these sit in a row that reads as a list of
    // the places you can follow them.
    //
    // The canvas keeps all four regardless. It is the reference design, the
    // three fields start empty, and a fresh page would otherwise open on a
    // single tile where Figma draws a row of them — with no clue that the other
    // three are a field away. The index is carried through the filter because
    // `srcIcons` is positional.
    const srcRows = s.gallerySources
      .map((g, i) => ({ g, i }))
      .filter(({ g, i }) => !s.live || i === 0 || !!g.url)
    const sources = !desk ? (
      <div style={row('20px', {
        alignItems: 'stretch', ...(s.mob ? { flexWrap: 'wrap' } : {}),
      })}>
        {srcRows.map(({ g, i }) => {
          const link = extLink(s, g.url)
          const Tag = link ? 'a' : 'div'
          return (
            <Tag key={i} {...link} style={{
              ...(tab ? { flex: 1, minWidth: 0, height: '92px' } : { flex: 'none' }),
              ...row(tab ? '16px' : '5px', { justifyContent: g.on ? 'space-between' : 'center' }),
              position: 'relative', overflow: 'hidden', textDecoration: 'none',
              background: g.on ? s.pillBg : 'transparent',
              color: g.on ? s.pillFg : (s.retro ? g.bg : g.ink),
              border: `${s.bw} solid ${s.tx}`, borderRadius: rowR,
              padding: tab ? '16px 24px 16px 16px' : '10px',
              boxShadow: g.on ? hard(s, s.ac, 7, 9) : 'none',
              transform: g.on ? tilt(s, -1) : 'none',
              cursor: link ? 'pointer' : undefined,
            }}>
              {g.on && <Grain s={s} radius={rowR} />}
              {iconSq(g, srcIcons[i] || ImageIcon, 60, 28)}
              {g.on && <X size={30} strokeWidth={2.4} style={{ position: 'relative' }} />}
            </Tag>
          )
        })}
      </div>
    ) : (
      <div style={col('16px')}>
        {srcRows.map(({ g, i }) => {
          // The Figma frame letters each closed row in its source colour even
          // when that is low-contrast (TikTok's yellow); the legible() fallback
          // stays on for the flat themes.
          const ink = s.retro ? g.bg : g.ink
          const link = extLink(s, g.url)
          const Tag = link ? 'a' : 'div'
          return (
            <Tag key={i} {...link} style={{
              ...row('16px'),
              position: 'relative', overflow: 'hidden', textDecoration: 'none',
              background: g.on ? s.pillBg : 'transparent',
              color: g.on ? s.pillFg : ink,
              border: `${s.bw} solid ${s.tx}`, borderRadius: rowR,
              padding: '13px 20px 13px 13px',
              boxShadow: g.on ? hard(s, s.ac, 6, 7) : 'none',
              transform: g.on ? tilt(s, -1) : 'none',
              cursor: link ? 'pointer' : undefined,
            }}>
              {g.on && <Grain s={s} radius={rowR} />}
              {iconSq(g, srcIcons[i] || ImageIcon, 49, 24)}
              <span style={labelStyle(s, '18px', {
                flex: 1, position: 'relative', color: g.on ? s.pillFg : ink,
              })}>{g.label}</span>
              {g.on
                ? <X size={25} strokeWidth={2.4} style={{ position: 'relative' }} />
                : <Plus size={25} strokeWidth={2.4} style={{ position: 'relative' }} />}
            </Tag>
          )
        })}
      </div>
    )

    // The rail's own furniture: the globe seal, the Anton wordmark and the
    // pager. Desktop and tablet stack them down the card's right edge with the
    // wordmark turned -90°; the Figma mobile frame lays the same three out in
    // a footer row under the photo instead.
    const railArrows = (
      <div style={row(desk ? '4px' : '5px')}>
        {arrow(<ArrowLeft size={desk ? 14 : 16} />, s.live ? () => go(active - 1) : undefined)}
        {arrow(<ArrowRight size={desk ? 14 : 16} />, s.live ? () => go(active + 1) : undefined)}
      </div>
    )
    const rail = s.mob ? (
      <div style={row('10px', { justifyContent: 'space-between', color: s.acFg, position: 'relative' })}>
        <div style={row('10px')}>
          <GlobeMark size={27} color={s.acFg} />
          <span style={labelStyle(s, '21px', { letterSpacing: '0.1em' })}>Gallery</span>
        </div>
        {railArrows}
      </div>
    ) : (
      <div style={col('10px', {
        flex: 'none', alignItems: 'center', color: s.acFg, position: 'relative',
        justifyContent: 'space-between',
      })}>
        <div style={col('10px', { alignItems: 'center' })}>
          <GlobeMark size={desk ? 22 : 27} color={s.acFg} />
          <span style={labelStyle(s, desk ? '18px' : '21px', {
            writingMode: 'vertical-rl', letterSpacing: '0.1em',
            display: 'inline-block', transform: 'rotate(180deg)',
          })}>
            Gallery
          </span>
        </div>
        {railArrows}
      </div>
    )

    const viewer = (
      // minWidth 0 so nothing inside can widen the grid column past the canvas
      // — a flex item's default `min-width: auto` floors it at its content.
      <div style={col(desk ? '20px' : '24px', { minWidth: 0 })}>
        <div style={row('12px', { justifyContent: 'space-between', flexWrap: 'wrap' })}>
          {/* A dead reset beside two live arrows would read as a bug, so it
              rewinds the strip on the published page and stays lettering on
              the canvas. */}
          <span
            onClick={s.live ? () => setPick(0) : undefined}
            style={row('8px', labelStyle(s, s.eyebrow, {
              color: s.ac, cursor: s.live ? 'pointer' : undefined,
            }))}
          >
            <ArrowLeft size={13} color={s.tx} /> Back to beginning
          </span>
          <span style={col('2px', { alignItems: 'flex-end' })}>
            <span style={labelStyle(s, s.eyebrow, { color: s.ac })}>{s.brand}</span>
            <span style={labelStyle(s, '10px', { color: s.ac })}>Gallery</span>
          </span>
        </div>

        <div style={{
          position: 'relative', background: s.ac, borderRadius: cardR,
          padding: desk ? '16px' : tab ? '20px' : '10px',
          boxShadow: soft(s), transform: tilt(s, -2),
          ...(s.mob
            ? col('20px')
            : row(desk ? '16px' : '20px', { alignItems: 'stretch' })),
        }}>
          <Grain s={s} exact blend="screen" opacity={0.52} radius={cardR} />
          <div style={{
            ...(s.mob
              // The Figma mobile frame turns the viewer landscape: full card
              // width at the frame's fixed height, corner brackets clipped out.
              ? { width: '100%', height: '299px' }
              : { flex: 1, minWidth: 0, aspectRatio: '4 / 4.36' }),
            borderRadius: s.retro ? '4px' : s.radiusSm,
            overflow: 'hidden', position: 'relative',
          }}>
            <Photo s={s} initialsSize={52} src={s.images[active]} />
            {s.retro && !s.mob && (
              <>
                <span style={{
                  position: 'absolute', left: desk ? '11px' : '14px', bottom: desk ? '11px' : '14px',
                  width: desk ? '15px' : '18px', height: desk ? '15px' : '18px',
                  borderLeft: `2px solid ${s.tx}`, borderBottom: `2px solid ${s.tx}`,
                }} />
                <span style={{
                  position: 'absolute', right: desk ? '12px' : '15px', bottom: desk ? '11px' : '14px',
                  width: desk ? '15px' : '18px', height: desk ? '15px' : '18px',
                  borderRight: `2px solid ${s.tx}`, borderBottom: `2px solid ${s.tx}`,
                }} />
              </>
            )}
            {s.retro && desk && (
              <span style={labelStyle(s, '9px', {
                position: 'absolute', right: '12px', bottom: '12px', letterSpacing: '1px',
                background: 'rgba(17,17,17,0.55)', color: s.ac, borderRadius: '4px', padding: '3px 8px',
              })}>{`0${active + 1} — 0${strip.length}`}</span>
            )}
          </div>
          {rail}
        </div>

        <div style={row(desk ? '10px' : '12px', { overflow: 'hidden', marginTop: desk ? '13px' : '16px' })}>
          {strip.slice(from, from + shown).map((i) => (
            <span key={i} onClick={s.live ? () => setPick(i) : undefined} style={{
              flex: 1, minWidth: 0, aspectRatio: '1', overflow: 'hidden',
              borderRadius: s.retro ? (desk ? '16px' : '20px') : s.radiusSm,
              border: `${desk ? '4px' : '5px'} solid ${i === active ? s.pillBg : s.ac}`,
              cursor: s.live ? 'pointer' : undefined,
            }}><Photo s={s} initialsSize={12} src={s.images[i]} /></span>
          ))}
        </div>
      </div>
    )

    return (
      <div style={{
        // §10.2 splits this section down the middle (720 / 720); the Figma
        // frame indents the viewer half further, so the gutter is wide.
        display: 'grid', gridTemplateColumns: s.narrow ? '1fr' : '1fr 1fr',
        gap: desk ? '110px' : tab ? '60px' : '20px', alignItems: 'start',
      }}>
        <div style={col(desk ? '33px' : tab ? '40px' : '20px', { minWidth: 0 })}>
          <div style={col(desk ? '30px' : tab ? '36px' : '10px')}>
            <span style={labelStyle(s, s.eyebrow, { color: s.ac, letterSpacing: '0.16em' })}>Media</span>
            <h2 style={{
              margin: 0, fontFamily: s.display, fontSize: s.dispLg, lineHeight: 0.89,
              letterSpacing: s.dls, color: s.ac,
            }}>{s.title}</h2>
          </div>
          {sources}
        </div>
        {viewer}
      </div>
    )
  }

  return (
    <div>
      <h2 style={{ margin: '0 0 28px', ...h2Style(s) }}>{s.title}</h2>
      <div style={row('14px', { overflow: 'hidden', alignItems: 'stretch' })}>
        {s.gal4.map((l) => tile(l, '3 / 4', { flex: 1, minWidth: '120px' }))}
      </div>
    </div>
  )
}

// v0 — Booking Calendar layout 1 · Scheduler (§10.2 reference design): a
// bordered panel split between the month grid and a stack of polaroids, with
// the resulting enquiry line along the foot.
function Calendar({ s }) {
  // The month on show, as an offset into `s.calMonths`, and the day the visitor
  // has picked. Both inert on the editor canvas, where the section is a picture
  // of a website (§12.7): a live day there would both pick a date and select the
  // section, and the month arrows would walk the canvas off the frame it is
  // drawn to match.
  //
  // `sel` is an ISO date rather than a cell index because, like the map's, it
  // has to survive the page turning — it names a day, not a square of whatever
  // month is on screen. The empty string is this section's -1: nothing chosen,
  // so `s.calPick` renders and the published page's first paint is the canvas's
  // picture by construction. Hooks sit above the layout branch because
  // LayoutPicker mounts every layout.
  const [mi, setMi] = useState(0)
  const [sel, setSel] = useState('')

  if (s.v0) {
    // §5.5 — one scheduler across three frames: the 768 (986:39251) and 390
    // (986:39417) ones verbatim, the 1440 one (964:58583) on the 1180 canvas at
    // × 0.82. The two narrow frames only turn the panel's halves from columns
    // into rows, which it already does on `s.narrow`, so every dimension below
    // is the frame's own number through `u()` — the type and the month head at
    // `scale`, the prints at `pscale`, which the 390 frame alone takes further
    // down. What the 390 frame genuinely re-sets is listed as it comes: the
    // column padding, the gaps between cells, the row height, the height of the
    // prints' half — and the seal, which it drops.
    const scale = s.narrow || s.mob ? 1 : 0.82
    const pscale = s.mob ? 0.613 : scale
    const u = (v) => `${Math.round(v * scale)}px`
    const pu = (v) => `${Math.round(v * pscale)}px`

    // The month on show, and the day that is lit. The canvas pins both to what
    // the view-model resolved, which is the frame's June with its 12th picked.
    const nMonths = s.calMonths.length
    const at = s.live ? ((mi % nMonths) + nMonths) % nMonths : 0
    const month = s.calMonths[at]
    // The cell the pick names, looked up rather than composed — sectionVm wrote a
    // line onto every one of them. The whole window is searched, not just the
    // month on screen, so a day picked in August still names itself from
    // September. A **booked** cell is never picked: publishing again re-renders
    // the open tab, so the artist can block the day a visitor had lit, and `on`
    // would otherwise beat the strike-through.
    const want = (s.live && sel) || s.calPick
    const hit = want
      ? s.calMonths.reduce((f, mo) => f || mo.cells.find((c) => c.iso === want), null)
      : null
    const cur = hit && !hit.booked ? hit.iso : ''
    const line = cur ? hit.line : s.calPrompt

    // The month arrows. They *wrap* at both ends of the window rather than
    // clamping: a clamped first month would open the published page on a
    // dead-looking left arrow, which is a diff from the canvas — the media
    // player's transport takes the same view. The cursor is read off the
    // handler, Pager's rule, so the canvas no longer offers a pointer over a
    // button that does nothing.
    const step = (dir) => (s.live ? () => setMi((v) => v + dir) : undefined)
    const nav = (icon, dir) => {
      const onClick = step(dir)
      return (
        <span onClick={onClick} style={{
          width: u(55), height: u(54), flex: 'none', borderRadius: s.radiusSm,
          background: s.pillBg, color: s.pillFg, border: `${s.bw} solid ${s.tx}`,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          cursor: onClick ? 'pointer' : undefined,
        }}>{icon}</span>
      )
    }

    // The 1440 and 768 frames space the seven columns by half a cell (30 on a
    // 60.5 one) and the five weeks by a third; the 390 one closes both to 2 and
    // takes the row height down with them.
    const cols = {
      display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
      columnGap: s.mob ? '2px' : u(30),
      rowGap: s.mob ? '2px' : u(20),
    }

    // The frames' own day-name row keeps the desktop's fixed 57.4px cells at
    // every width, so on the 390 canvas it overruns the panel and the last name
    // is clipped off. Ours stays on the grid's columns instead: the labels are
    // only legible over the days they head.
    const dayName = (d) => (
      <span key={d} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: s.body, fontSize: u(15.11), color: s.muted,
      }}>{d}</span>
    )

    // The frame's cell is wider than it is tall, edged in a 0.15 hairline, and
    // the picked day is the accent block lettered in the mustard — no offset
    // shadow under it.
    //
    // Three states where the frame draws two, because a visitor who cannot see
    // which days are taken would click one and watch nothing happen: a booked
    // day is muted ink on the section's own soft tone, and takes no handler.
    // That is a *content* state, not a live one, so it renders on the canvas
    // too — and since CAL_BOOKED is empty, the seeded picture does not move.
    // Clicking the lit day again unlights it, the map's pin/row toggle.
    const cell = (c, i) => {
      const on = c.iso !== undefined && c.iso === cur
      const onClick = s.live && c.iso !== undefined && !c.booked
        ? () => setSel((v) => (v === c.iso ? '' : c.iso))
        : undefined
      return (
        <span key={i} onClick={onClick} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: u(s.mob ? 55.1 : 57.286),
          fontFamily: s.body, fontSize: u(18.132),
          borderRadius: u(12.088),
          border: c.d === '' ? 'none' : `${s.bw} solid ${on ? s.tx : s.line}`,
          background: on ? s.ac : c.booked ? s.soft : 'transparent',
          color: on ? (s.retro ? s.pillBg : s.acFg) : c.booked ? s.muted : s.tx,
          textDecoration: c.booked ? 'line-through' : undefined,
          cursor: onClick ? 'pointer' : undefined,
        }}>{c.d}</span>
      )
    }

    const grid = (
      <div style={col(u(21.154), { padding: s.mob ? '20px 10px' : u(30.219) })}>
        <div style={row(s.mob ? '8px' : '12px', { justifyContent: 'space-between' })}>
          {nav(<ArrowLeft size={Math.round(16 * scale)} />, -1)}
          <span style={{
            fontFamily: s.display,
            // The 390 frame heads the month at the same 48 as the wider two,
            // and it only just clears its two nav buttons: 227px of type in the
            // 240 its 10px gutter leaves. The 390 *canvas* keeps the page's own
            // 22px gutter, which is 24px it does not have — so the line comes
            // down instead of wrapping under the buttons. Fraunces measures
            // within 2px of Soulway here, so this is the canvas, not the face.
            //
            // And it only just clears them for `June 2025`. Now that the arrows
            // turn, `September 2026` follows it into the same row, so past the
            // seed's nine characters the mobile line comes down in proportion —
            // which leaves June itself at the frame's own 40. The two wider
            // canvases have the room and keep 48.
            fontSize: u(s.mob ? Math.round(40 * Math.min(1, 9 / month.label.length)) : 48),
            // Fraunces at its natural leading stands half again as tall as its
            // type size and pushes the header row past the frame's nav; the
            // frame's own line box is the type size and change.
            lineHeight: 1.1, letterSpacing: s.dls, color: s.ac,
          }}>
            {month.label}
          </span>
          {nav(<ArrowRight size={Math.round(16 * scale)} />, 1)}
        </div>
        <div style={{ ...cols, height: u(30.219) }}>{s.calDays.map(dayName)}</div>
        <div style={cols}>{month.cells.map(cell)}</div>
      </div>
    )

    // The frame fans three prints of the same photograph out of the centre of
    // the half — 366 x 407 at the two wider canvases and 0.613 of that on the
    // 390 one — leaning 28.7, 3.2 and 15 degrees back to front, each stamped
    // along its foot with a rule and the location.
    const LEAN = [28.7, 3.2, 15]
    const SHIFT = [0, -47.3, -12.1]
    const stampInk = (s.retro && s.chips[3]?.bg) || s.paperFg
    const print = (i) => (
      <div key={i} style={{
        position: 'absolute', left: '50%', top: '50%', zIndex: i + 1, width: pu(366.382),
        transform: `translate(calc(-50% + ${pu(SHIFT[i])}), -50%)`
          + (s.retro ? ` rotate(${LEAN[i]}deg)` : ''),
        background: s.paper, borderRadius: pu(11.308), boxShadow: soft(s),
        padding: `${pu(11.308)} ${pu(11.308)} 0`,
      }}>
        <div style={{ aspectRatio: '1', overflow: 'hidden', borderRadius: pu(6.219) }}>
          <Photo s={s} initialsSize={34} />
        </div>
        <span style={row(pu(12), { height: pu(52), justifyContent: 'space-between' })}>
          <span style={{ height: '1px', width: pu(107.992), background: stampInk, flex: 'none' }} />
          <span style={row(pu(5.654), { color: stampInk })}>
            <span style={labelStyle(s, pu(12.1))}>{s.location}</span>
            <GlobeMark size={Math.round(15.47 * pscale)} color={stampInk} />
          </span>
        </span>
        {/* The frame lays its scratch sheet over the whole print, paper and
            all, not just the photograph. At the .5 the photographic cards take
            it would bleach the paper; .2 is where the print's board still reads
            as the panel's own tone, as it does in the frame. */}
        <Grain s={s} exact blend="screen" opacity={0.2} radius={pu(11.308)} />
      </div>
    )

    const stack = (
      <div style={{
        position: 'relative',
        // Stacked, the prints' half has no sibling column to take its height
        // from and every print in it is absolute, so it states the frame's. On
        // desktop the grid row is that height already.
        height: s.narrow ? u(s.mob ? 324 : 553.398) : undefined,
      }}>
        {[0, 1, 2].map(print)}
        {/* Pinned to the half's corner, and gone on the 390 frame — which
            scaled its prints to .613 but left the seal at the left and the size
            the wider frames give it, so it lands off the end of a half half the
            width and the panel clips it away. Taken as the absence it renders
            as; the same leak in that frame's day-name row is not, because there
            it costs a column its label (see `dayName`). The two frames that do
            keep the seal do not share an inset: same left, wider half. */}
        {!s.mob && (
          <SealBadge s={s} hue={s.chips[4 % s.chips.length].bg}
                     size={Math.round(125.37 * scale)} tilt={32.38}
                     style={{
                       right: u(s.narrow ? 79.8 : 35.8),
                       bottom: u(s.narrow ? 33.2 : 30.2), zIndex: 4,
                     }} />
        )}
      </div>
    )

    return (
      <div style={{ position: 'relative' }}>
        <TornEdge s={s} side="top" height={30} />
        <div style={{
          // The frame stands the panel a tone off the sheet it sits on, which
          // for Retro is `paper` over the cream. The flat templates keep the
          // page ground: their `paper` is the lightest palette colour, which is
          // also `tx` in a dark palette — the month would be pale on pale.
          background: s.retro ? s.paper : undefined,
          border: `${s.bw} solid ${s.tx}`,
          borderRadius: u(20), overflow: 'hidden',
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: s.narrow ? '1fr' : '1fr 1fr',
            borderBottom: `${s.bw} solid ${s.tx}`,
          }}>
            {grid}
            {/* A grid item stretches to the row, and so does its own single
                child once it is a grid too — which is what gives the stack of
                absolutely placed prints the month's height to centre in. */}
            <div style={{
              display: 'grid',
              borderLeft: s.narrow ? 'none' : `${s.bw} solid ${s.tx}`,
              borderTop: s.narrow ? `${s.bw} solid ${s.tx}` : 'none',
            }}>{stack}</div>
          </div>
          <div style={{
            padding: u(30.22),
            // Flexed so the strut of the block's own inherited leading does not
            // stand the line off the frame's foot.
            display: 'flex', alignItems: 'center',
            // The pill sits at the other end of the frame's own foot rule, and
            // wraps under the line rather than squeezing it on the 390 canvas,
            // where the line already takes two of its own.
            justifyContent: 'space-between', flexWrap: 'wrap', gap: u(16),
          }}>
            {/* The frame sets this line in Space Mono Bold — the body face in
                this project's mapping of the reference's three, not the Anton
                every other small label takes. It wraps on the 390 canvas, as
                the frame has it. */}
            <span style={{
              fontFamily: s.body, fontWeight: 700, fontSize: u(13.371), lineHeight: 1.3,
              letterSpacing: '0.08em', textTransform: 'uppercase', color: s.ac,
            }}>{line}</span>
            {/* The one deliberate addition to the frame, which draws this row as
                a line of type and nothing else: a date the visitor has picked
                has to lead somewhere, and `cta` was a field that edited nothing
                until it labelled this. `calBookTo` is the enquiry form (or the
                pricing section), never this panel — and where the page carries
                neither, BookPill stays the span it is on the canvas. */}
            <BookPill s={s} to={s.calBookTo} label={s.calCta} />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <h2 style={{ margin: '0 0 26px', ...h2Style(s) }}>{s.title}</h2>
      {s.cities.map((c, i) => (
        <div key={i} style={row('18px', {
          padding: '16px 4px', borderBottom: `1.5px solid ${s.line}`, flexWrap: 'wrap',
        })}>
          <span style={{ fontFamily: s.display, fontSize: '18px', color: s.ac, width: '76px', flex: 'none', letterSpacing: s.dls }}>{c.date}</span>
          <span style={{ fontSize: '15px', fontWeight: 700, flex: 1, minWidth: '140px' }}>{c.city} — {c.venue}</span>
          <span className="hv-acfill" style={{
            border: `1.5px solid ${s.line2}`, fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px',
            textTransform: 'uppercase', padding: '7px 14px', borderRadius: s.btnR, cursor: 'pointer',
            transition: 'background-color .15s ease, color .15s ease, border-color .15s ease',
          }}>{c.status}</span>
        </div>
      ))}
    </div>
  )
}

function EventsMap({ s }) {
  // The page of gigs, and the gig the visitor has picked out on the map. Both
  // are inert on the editor canvas, where the section is a picture of a website
  // (§12.7): a live pin there would both light a row and select the section.
  // `sel` starts at -1 — nothing picked — so the published page's first paint is
  // the canvas's picture by construction, the same start `cur` and `pick` take.
  // Hooks sit above the layout branch because LayoutPicker mounts every layout.
  const [page, setPage] = useState(0)
  const [sel, setSel] = useState(-1)

  // v0 — Events Map layout 1 · Compact tile (§10.2 reference design): the
  // coverage tile beside the upcoming-gigs list, banded top and bottom with
  // full-bleed checkerboard.
  if (s.v0) {
    // Five to a page, which is both the row count the reference frame draws and
    // the number of pin positions there are: one page of gigs is exactly one
    // set of distinct pins, so a page never lights the same dot twice. It comes
    // off `s` rather than being counted here — this file does no maths.
    const perPage = s.gigPage
    const pages = Math.max(1, Math.ceil(s.gigs.length / perPage))
    // Clamped rather than reset through an effect, as the repertoire's is: a
    // republish re-renders the open tab, so the list can shrink under the pager.
    const pg = s.live ? Math.min(page, pages - 1) : 0
    const shown = s.gigs.slice(pg * perPage, (pg + 1) * perPage)
    const { labels, at } = pageWindow(pages, pg, s.mob)
    // `sel` indexes the whole list, not the page, so turning the pager away from
    // a lit gig and back finds it still lit.
    const lit = (i) => s.live && sel === pg * perPage + i
    const onPick = (i) => (s.live ? () => {
      const j = pg * perPage + i
      setSel((v) => (v === j ? -1 : j))
    } : undefined)

    // One pin per gig on this page, at the position sectionVm paired it with.
    // The lit one grows and takes a heavier halo; that and the row's fill are
    // the whole of the pairing's vocabulary.
    const pins = shown.map((g, i) => {
      const on = lit(i)
      const d = on ? 16 : 12
      return (
        <span key={i} onClick={onPick(i)} style={{
          position: 'absolute', left: g.pin.x, top: g.pin.y, width: `${d}px`, height: `${d}px`,
          borderRadius: '999px', background: on ? s.pillBg : s.ac,
          boxShadow: `0 0 0 ${on ? 7 : 5}px ${on ? s.ac : s.soft2}`,
          transform: 'translate(-50%, -50%)',
          cursor: s.live ? 'pointer' : undefined,
        }} />
      )
    })

    const tile = (
      <div style={{
        border: `${s.bw} solid ${s.ac}`, borderRadius: s.radiusSm, overflow: 'hidden',
        boxShadow: hard(s, s.ac, 5, 5), ...col('0'),
      }}>
        <div style={{
          position: 'relative', aspectRatio: '4 / 3.1', background: s.paper,
          // §10.2 ships a real street-map raster for Retro; the crossed 1px grid
          // is the stand-in every other template still gets.
          ...(s.mapSrc
            ? { backgroundImage: `url(${s.mapSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : {
              backgroundImage:
                `linear-gradient(${s.ac55} 1px, transparent 1px), linear-gradient(90deg, ${s.ac55} 1px, transparent 1px)`,
              backgroundSize: '38px 38px',
            }),
        }}>
          {/* §10.2 tints the street map to the accent rather than showing it raw. */}
          {s.mapSrc && (
            <span aria-hidden style={{
              position: 'absolute', inset: 0, background: s.ac,
              mixBlendMode: 'color', opacity: 1, pointerEvents: 'none',
            }} />
          )}
          {s.mapSrc && (
            <span aria-hidden style={{
              position: 'absolute', inset: 0, background: s.ac,
              mixBlendMode: 'multiply', opacity: 0.22, pointerEvents: 'none',
            }} />
          )}
          {pins}
          <Grain s={s} opacity={0.25} />
        </div>
        <div style={col('6px', { background: s.deep, color: s.deepFg, padding: s.mob ? '14px' : '18px' })}>
          <span style={row('10px')}>
            <GlobeMark size={16} color={s.ac} />
            <span style={{ fontFamily: s.display, fontSize: s.title, letterSpacing: s.dls }}>{s.mapBase}</span>
          </span>
          <span style={labelStyle(s, s.eyebrow, { color: s.pillBg, whiteSpace: 'normal' })}>{s.mapTerms}</span>
        </div>
      </div>
    )

    const onDark = s.retro
    const list = (
      <div style={{
        position: 'relative',
        border: `${s.bw} solid ${onDark ? s.pillBg : s.ac}`, borderRadius: s.radiusSm,
        boxShadow: hard(s, s.pillBg, 5, 5),
        padding: s.mob ? '14px' : '20px', ...col(s.mob ? '10px' : '14px'),
      }}>
        <Grain s={s} opacity={0.18} radius={s.radiusSm} />
        <span style={labelStyle(s, s.eyebrow, {
          color: onDark ? s.pillBg : s.muted, letterSpacing: '0.14em', position: 'relative',
        })}>
          Upcoming gigs · {s.gigs.length}
        </span>
        {shown.map((g, i) => {
          // A row with a tickets address becomes an anchor, the gallery's seam:
          // `target="_blank"`, so the click both opens the tab and lights the
          // pin, and the published page is still behind it. A row without one
          // stays the picture it has always been — the Soundcloud rule rather
          // than the gallery's, because a gig is a show the artist is playing,
          // not a tile promising somewhere to go.
          const link = extLink(s, g.url)
          const Tag = link ? 'a' : 'div'
          const on = lit(i)
          return (
            <Tag key={i} {...link} onClick={onPick(i)} style={{
              ...row('12px', { justifyContent: 'space-between' }),
              border: `${s.bw} solid ${g.hue}`, borderRadius: s.radiusSm,
              padding: s.mob ? '10px 12px' : '12px 16px', position: 'relative',
              // The lit row fills rather than lifting: these sit in a column
              // with no room to raise one, and the fill is what the pin echoes.
              background: on ? g.hue : 'transparent',
              // Anchors inherit the card's colour instead of the UA's blue.
              textDecoration: 'none', color: 'inherit',
              cursor: s.live ? 'pointer' : undefined,
            }}>
              <span style={col('4px', { minWidth: 0 })}>
                <span style={{
                  fontFamily: s.display, fontSize: s.title, letterSpacing: s.dls,
                  color: on ? contrastInk(g.hue) : g.hue,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{g.venue}</span>
                <span style={{
                  fontFamily: s.body, fontSize: s.eyebrow, opacity: 0.8,
                  color: on ? contrastInk(g.hue) : undefined,
                }}>
                  {g.city} · {g.time}
                </span>
              </span>
              <span style={col('0', {
                alignItems: 'center', flex: 'none', border: `${s.bw} solid ${on ? contrastInk(g.hue) : g.hue}`,
                borderRadius: s.radiusSm, padding: '5px 10px', lineHeight: 1.1,
                color: on ? contrastInk(g.hue) : undefined,
              })}>
                <span style={labelStyle(s, '10px')}>{g.month}</span>
                <span style={labelStyle(s, s.labelXs)}>{g.day}</span>
              </span>
            </Tag>
          )
        })}
        {/* Derived from the list, so it cannot claim pages that are not there,
            and gone entirely at one page — the repertoire's rule. The five
            seeded gigs are one page, so the reference picture no longer carries
            the old static 1 2 3 … 20 row. */}
        {labels.length > 0 && (
          <Pager s={s} colour={s.ac} fill={s.soft2} frame={{
            pages: labels, active: at,
            // Static on the canvas, like the repertoire's.
            onPage: s.live ? (label) => setPage(Number(label) - 1) : undefined,
            onStep: s.live
              ? (dir) => setPage(Math.max(0, Math.min(pages - 1, pg + dir)))
              : undefined,
          }} />
        )}
      </div>
    )

    return (
      <div style={{ position: 'relative', ...col(s.mob ? '20px' : '28px') }}>
        <Checkerboard s={s} cell={12} colour={s.paper}
                      style={{ position: 'absolute', width: 'auto', ...bleedTo(s, 'top') }} />
        <Checkerboard s={s} cell={12} colour={s.paper}
                      style={{ position: 'absolute', width: 'auto', ...bleedTo(s, 'bottom') }} />

        <div style={row('20px', { justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap' })}>
          <div style={col('10px')}>
            <span style={labelStyle(s, s.eyebrow, {
              color: s.retro ? s.mapFg : s.tx, letterSpacing: '0.16em',
            })}>Shows/coverage</span>
            <h2 style={{
              margin: 0, fontFamily: s.display, fontSize: s.dispLg, lineHeight: 0.95,
              letterSpacing: s.dls, color: s.retro ? s.pillBg : s.ac,
            }}>{s.title}</h2>
          </div>
          <span style={labelStyle(s, s.labelMd, { color: s.ac })}>{s.mapRadius}</span>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: s.narrow ? '1fr' : '1fr 1.15fr',
          gap: s.gGap, alignItems: 'start',
        }}>
          {tile}{list}
        </div>
      </div>
    )
  }
  return (
    <div style={{
      background: s.soft, aspectRatio: '16 / 7', borderRadius: s.radius, position: 'relative',
      overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: '26px',
    }}>
      {/* The flat layout has no gig list to pair with, so its dots stay the raw
          five positions rather than one per gig — twelve gigs would otherwise
          stack twelve dots on five spots. */}
      {s.pins.map((p, i) => (
        <span key={i} style={{
          position: 'absolute', left: p.x, top: p.y, width: '12px', height: '12px',
          borderRadius: '999px', background: s.ac, boxShadow: `0 0 0 5px ${s.soft2}`,
          transform: 'translate(-50%, -50%)',
        }} />
      ))}
      <div style={{ position: 'relative' }}>
        <h2 style={{ margin: 0, fontFamily: s.display, fontSize: s.h2, letterSpacing: s.dls, lineHeight: 1 }}>{s.title}</h2>
        <div style={{ fontSize: '13px', fontWeight: 600, color: s.muted, marginTop: '8px' }}>{s.mapSub}</div>
      </div>
    </div>
  )
}

// v0 — Testimonials layout 1 · Stacked tag card (§10.2 reference design): one
// cream quote card standing on two rotated, ink-outlined coloured cards, with
// the pager arrows thrown out to the page's own gutters.
function Testimonials({ s }) {
  // Which review the card is on. It starts at 0, not the -1 the player's `cur`,
  // the gallery's `pick` and the map's `sel` start at and not the calendar's
  // '': the frame draws a filled card, so here the picture *is* a choice — the
  // enquiry form's event chip and pricing's `active` pin 0 for the same reason.
  // Live-gated (§12.7) like every other control in this file: an arrow on the
  // editor canvas would both page the card and select the section. Above the
  // layout branch, because hooks are — LayoutPicker mounts every layout at once.
  const [cur, setCur] = useState(0)

  if (s.v0) {
    // §5.5 — three frames: 1440 (964:58585) on the 1180 canvas at × 0.82, 768
    // (986:39711) and 390 (986:39733) verbatim. The narrow two are not the
    // desktop squeezed. All three stand the same 730 band, but the desktop lays
    // the card out landscape at a stated 420, while both narrow frames set it
    // portrait on its own content, at the desktop's own type sizes — so their
    // quote runs long and their stops open from 14 to 37. Mobile goes further
    // and takes the arrows off the card's flanks, setting them in a 270 row
    // under it. Almost every box below is therefore `narrow ? <frame> :
    // <frame × 0.82>`, and the two narrow frames differ from each other in the
    // card's width, the backs behind it and that arrow row.
    const tab = isTablet(s)
    const scale = s.narrow ? 1 : 0.82
    const u = (v) => `${Math.round(v * scale)}px`
    const n = s.quotes.length
    // Clamped the way pricing clamps its chip: the list is the artist's now, so
    // a review they delete can leave `cur` past the end of it — and Publish
    // re-renders a tab that is already open. `n` of 0 has to be caught before
    // the index, or Math.min(cur, -1) reads off the front of the list.
    const at = s.live && n ? Math.min(cur, n - 1) : 0
    const q = n ? s.quotes[at] : null
    // Wrapping at both ends, the media player's transport rule and the
    // calendar's: a clamped first arrow opens the published page looking dead.
    // The empty guard is `goTo`'s: nothing wires this up at one review, but a
    // modulo by zero is NaN rather than an error, so it would strand `cur`.
    const go = (i) => { if (n) setCur(((i % n) + n) % n) }
    // Not drawn at one review — the pager's rule and the chip row's — and
    // derived from the list, so it holds on the canvas too. The seed carries
    // three, so the reference picture does not move.
    const paging = n > 1
    const ink = s.paperFg
    // The frames' 3px stroke, verbatim on both narrow ones; u(3) rounds to 2 on
    // desktop and reads visibly lighter, so it takes the literal the
    // repertoire's song cards take, for the same reason.
    const bw = s.retro ? (s.narrow ? '3px' : '2.5px') : s.bw
    // The frames' arrow is a 10.23 × 8.91 vector; lucide draws its own inside
    // 14/24 of the size it is given, so the frame's width backs out to 17.5.
    const glyph = Math.round(17.5 * scale)

    // The handler is the second argument, Gallery's signature, and the cursor is
    // read off it rather than off `s.live` — Pager's rule, and the reason the
    // canvas arrows lose the pointer they used to carry over nothing.
    const arrow = (icon, onClick) => (
      <span onClick={onClick} style={{
        width: u(55), height: u(54), flex: 'none', borderRadius: u(18.5),
        background: s.pillBg, color: s.pillFg, border: `${bw} solid ${ink}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        cursor: onClick ? 'pointer' : undefined,
      }}>{icon}</span>
    )
    const step = (d) => (s.live && paging ? () => go(at + d) : undefined)
    const prev = arrow(<ArrowLeft size={glyph} />, step(-1))
    const next = arrow(<ArrowRight size={glyph} />, step(1))

    // Each back as its frame draws it: the chip it is painted in, its rotation,
    // the offset of its centre from the card's, and the inset of its box off the
    // card's own — positive pulls it in, negative pushes it out. Desktop stands
    // 700 × 440 behind a 720 × 420 card, so both backs read as bands above and
    // below it; the tablet's are 440 behind a 490 card and read as a band across
    // the top and a strip down the left; the mobile's are narrower than the card
    // again and read as a top band and one corner. Stating them as insets rather
    // than boxes keeps that relationship when a long quote grows the card. The
    // centres are each group's emitted CSS left/top less the card's own:
    // `get_metadata` gives a rotated group's x/y in its rotated parent's space,
    // and that does not agree with what the frames render.
    const backs = s.mob
      ? [[1, 3, -4.4, -6.3, 16, -5], [3, -3.71, -2, -16.2, 24.9, -5]]
      : tab
        ? [[1, 3, -4.4, -36.6, 0.3, 25], [3, -3.71, -2, -46.5, 7.1, 25]]
        : [[1, 3, -12, -2, 10, -10], [3, -3.71, -2, -11.5, 10, -10]]

    const backing = ([chip, deg, dx, dy, ix, iy], i) => (
      <div key={i} style={{
        position: 'absolute', top: u(iy), bottom: u(iy), left: u(ix), right: u(ix),
        background: s.chips[chip % s.chips.length].bg,
        border: `${bw} solid ${ink}`, borderRadius: u(18),
        // Not `tilt()`: it returns the string 'none' off Retro, and a transform
        // list carrying that is invalid CSS which the browser drops whole.
        transform: `translate(${u(dx)}, ${u(dy)}) rotate(${deg}deg)`,
      }} />
    )

    // The frames pair the two pills against each other — orange lettered in the
    // mustard, mustard lettered in the orange — which is a Retro reading rather
    // than a legibility rule, so the flat themes keep contrastInk.
    // Keyed positionally, not on the label: both strings are the artist's now,
    // and two reviews' worth of identical pills would otherwise collide.
    const tag = (label, i, bg, fg) => (
      <span key={i} style={{
        background: bg, color: fg, borderRadius: s.btnR,
        padding: `${u(6)} ${u(12)}`, ...labelStyle(s, u(20)),
        // labelStyle sets Anton's tight 1.1; the frames' pill is a 41px box
        // round a 29px text box, which is the face's own leading.
        lineHeight: 29 / 20,
      }}>{label}</span>
    )

    // The card's contents. An empty list is a real state now that the reviews
    // are the artist's, and it draws pricing's one message rather than the
    // repertoire's two: there is no filter here that could empty a list which
    // has something in it. The card, the two backs, the torn edge and the grain
    // all stay — the section is a composition, and a hole where the card stands
    // is not one of its states.
    const body = q ? (
      <>
        {/* One gap reproduces the frames' three absolute stops: a 16px
            eyebrow, the quote's 45px lines, then a 29px attribution. Each of
            the three is the artist's now and each can be empty, so each is
            rendered or not rather than printed blank: a `col` gap is spent on
            an empty span the same as on a full one. */}
        <div style={col(u(s.narrow ? 37 : 14))}>
          {/* Space Mono in the frames — the body face in this project's
              mapping of the reference's three, not the Anton label. */}
          {!!q.when && (
            <span style={{
              fontFamily: s.body, fontSize: u(11), letterSpacing: u(1.5),
              textTransform: 'uppercase', color: s.ac,
            }}>{q.when}</span>
          )}
          <p style={{
            margin: 0, fontFamily: s.display,
            // The 390 frame is the one place the quote is not Soulway 40/45:
            // it renders through a Display/MD token that resolves to another
            // template's Bebas Neue at leading 1 — the §5.5 leak, not a
            // decision. Its 40 is that condensed face's measure, and none of
            // the five display faces holds it inside the 246 this page's own
            // padX leaves: Fraunces breaks "Professional" mid-word. Mobile
            // therefore takes the ramp's own display step, the same fallback
            // the enquiry form makes for its 390 heading, which puts the quote
            // on four lines and the card within a few px of the frame's 430.
            // The leading stays the 45 the other two frames state.
            fontSize: s.mob ? s.dispSm : u(40),
            lineHeight: 45 / 40, letterSpacing: s.dls, overflowWrap: 'break-word',
          }}>{q.quote}</p>
          {/* labelStyle keeps its labels on one line; this one is content,
              and at the frames' 20 it clears the 240 the mobile card leaves in
              Anton but not in Grunge's wider label face — so it wraps rather
              than running off the card. The two halves are joined in
              sectionVm, which is what keeps a separator off a card whose
              reviewer or role is blank. */}
          {!!q.byline && (
            <span style={labelStyle(s, u(20), { whiteSpace: 'normal' })}>{q.byline}</span>
          )}
        </div>
        {/* The pills are the same two strings again, so an emptied one drops
            its pill and an emptied pair drops the row with its padding. */}
        {!!q.byline && (
          <div style={row(u(8), { flexWrap: 'wrap', paddingTop: s.narrow ? 0 : u(20) })}>
            {!!q.who && tag(q.who, 0, s.ac, s.retro ? s.pillBg : contrastInk(s.ac))}
            {!!q.role && tag(q.role, 1, s.pillBg, s.retro ? s.ac : contrastInk(s.pillBg))}
          </div>
        )}
      </>
    ) : (
      <span style={{
        fontFamily: s.body, fontSize: s.narrow ? '14px' : '13px', color: s.muted,
      }}>No reviews yet.</span>
    )

    // The mobile frame's card is 364 wide in a 390 canvas — wider than the 346
    // this page's own padX leaves — so there it takes the column instead.
    const card = (
      <div style={{
        position: 'relative', flex: 'none', minWidth: 0,
        width: s.mob ? 'auto' : u(tab ? 464 : 720),
      }}>
        {/* Orange, then olive, then the card: that order is what puts the
            orange under the olive where the two overlap. */}
        {s.retro && backs.map(backing)}
        <div style={{
          position: 'relative', background: s.retro ? '#FBF6EA' : s.paper,
          color: ink, border: `${bw} solid ${ink}`, borderRadius: u(18),
          padding: u(50),
          // The desktop card is a stated 420 box with its tag row parked on the
          // floor; both narrow ones are their content's height, so there it is
          // the gap that holds them apart. minHeight either way, never height:
          // the quote is an editable field, so a longer one has to grow the card
          // rather than be clipped by it.
          ...(s.narrow ? { gap: u(50) } : { minHeight: u(420) }),
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          {body}
        </div>
      </div>
    )

    // Each frame centres its wrap but not the card inside it: the clearance
    // above and below the card is 165/145 on desktop, 137.5/102.5 on tablet and
    // 137/78 on mobile, where the 78 is measured to the foot of the arrow row.
    // What the root's own padY does not already give is what is left here, so
    // each lands on the frames' shared 730.
    const shell = s.mob ? (
      <div style={col(u(31), { position: 'relative', padding: `${u(93)} 0 ${u(34)}` })}>
        {card}
        {/* Mobile takes the arrows off the card's flanks and sets them in a 270
            row centred under it. */}
        {paging && (
          <div style={row('0px', {
            width: u(270), maxWidth: '100%', margin: '0 auto', justifyContent: 'space-between',
          })}>
            {prev}
            {next}
          </div>
        )}
      </div>
    ) : (
      // With the arrows gone the row has one child, and space-between would
      // stand the card against the left gutter rather than in the middle of the
      // band the frames measure.
      <div style={row('0px', {
        justifyContent: paging ? 'space-between' : 'center', position: 'relative',
        padding: `${u(tab ? 82 : 67)} 0 ${u(tab ? 47 : 48)}`,
      })}>
        {paging && prev}
        {card}
        {paging && next}
      </div>
    )

    return (
      <div style={{ position: 'relative' }}>
        {/* The one torn edge that is not the section above showing through.
            TornEdge defaults to the beige page ground because that is what the
            repertoire's and the calendar's tears reveal — both follow a beige
            section. The testimonials follow the enquiry form, which stands on
            the same cream this section does, so the frame fills its tear with
            that cream and the tear reads as the torn top of the *grain* rather
            than of a coloured band: the sheet below is grained and the strip
            above it is not, because the edge paints over it at zIndex 3. A
            beige strip here would be a stripe belonging to no section. The
            literal is the root render's `cream` — change one, change both. */}
        <TornEdge s={s} side="top" height={Math.round(43 * scale)}
                  colour={s.retro ? '#FBF6EA' : undefined} />
        {shell}
        {/* The frames lay their scratched sheet over the composition rather than
            under it: the card's interior and the ground either side of it
            measure the same mean and the same variance. Still under the torn
            edge, whose own zIndex is 3. */}
        <Grain s={s} opacity={0.1} blend="hard-light" exact style={{
          left: `calc(-1 * ${s.padX})`, right: `calc(-1 * ${s.padX})`,
          top: `calc(-1 * ${s.padY})`, bottom: `calc(-1 * ${s.padY})`,
          zIndex: 2,
        }} />
      </div>
    )
  }
  return (
    <div>
      <h2 style={{ margin: '0 0 28px', ...h2Style(s) }}>{s.title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: s.g3, gap: '18px' }}>
        {s.quotes.map((q, i) => (
          <div key={i} style={{
            border: `1.5px solid ${s.line}`, borderRadius: s.radius, padding: '24px',
            display: 'flex', flexDirection: 'column', gap: '16px',
          }}>
            <span style={{ fontFamily: s.display, fontSize: '34px', color: s.ac, lineHeight: 0.4 }}>“</span>
            {/* Every card reads its own row now: this used to be
                `i === 0 ? s.quote1 : q.q`, because only the first was editable
                and only the first was cased. */}
            <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6 }}>{q.quote}</p>
            <div style={{ marginTop: 'auto' }}>
              <div style={{ fontSize: '13px', fontWeight: 700 }}>{q.who}</div>
              <div style={{ fontSize: '12px', color: s.muted }}>{q.role}</div>
            </div>
          </div>
        ))}
      </div>
      {/* The card layout's empty state, in the layout that has no card. */}
      {s.quotes.length === 0 && (
        <span style={{
          fontFamily: s.body, fontSize: s.narrow ? '14px' : '13px', color: s.muted,
        }}>No reviews yet.</span>
      )}
    </div>
  )
}

function EnquiryForm({ s }) {
  // What the visitor has typed, gated on `s.live` throughout: on the canvas
  // every box is the span it has always been (§12.7), because a live field
  // there would take the keystroke and select the section with it. Hooks sit
  // above the layout branch, because hooks are — LayoutPicker mounts every
  // layout of this section at once.
  //
  // `vals` is indexed by the field's place in s.formFields, which is also how
  // `errs.f` is indexed and how the mailto composer zips labels onto values.
  // It is sparse, so nothing ever maps over it — the field list is what is
  // mapped, and `at(i)` reads through it.
  const [vals, setVals] = useState([])
  const [msg, setMsg] = useState('')
  // The picked event type starts at 0, not the -1 the player's `cur`, the
  // gallery's `pick`, the map's `sel` and the calendar's `''` start at. Those
  // open on "nothing chosen" so the published first paint is the canvas's
  // picture; here the picture *is* chip 0 picked — the §10.2 frame draws it
  // filled, with the olive block under it — and a form that defaults its first
  // choice is what a form does. The pricing chips pin 0 on the canvas for the
  // same reason. Do not "fix" this to -1.
  const [type, setType] = useState(0)
  // null until a submit is refused, then { f: bool[], any }. Cleared per field
  // as each is corrected, so the form stops marking a box the visitor has just
  // filled. No effect anywhere: set on the click, read on the render.
  const [errs, setErrs] = useState(null)
  const [sent, setSent] = useState(false)

  const nTypes = s.formTypes.length
  // Clamped like the pricing chips': the row is the artist's list now, so a
  // type they delete between publishes can leave `type` past the end of it —
  // and Publish re-renders the tab that is already open.
  const ti = s.live && nTypes ? Math.min(type, nTypes - 1) : 0
  // Only the split layout draws the chip row — the flat fallback never has —
  // so this is what decides whether a type is offered at all, and the mailto
  // reads it rather than `nTypes`. A page whose artist emptied the list and a
  // layout that never asks are the same case: no type was chosen, so the
  // subject is the bare "Enquiry" rather than a claim the visitor never made.
  const showTypes = !!s.v0 && nTypes > 0
  const at = (i) => vals[i] ?? ''
  const setAt = (i, v) => {
    setVals((prev) => { const next = prev.slice(); next[i] = v; return next })
    setErrs((e) => (e ? { ...e, f: e.f.map((x, j) => (j === i ? false : x)) } : e))
  }

  // The submit is an <a href="mailto:…">, never a <form>. A <form> here has no
  // action, so submitting it — which an Enter key in any text field does — would
  // post to <base href>, i.e. the opener's URL, and the published tab would
  // reload into the builder. That is the document.write failure through a
  // different door (see the Publish block in EncoreBuilder). With no <form>
  // there is no implicit submission either, so Enter does nothing at all.
  //
  // The href is composed on every render, so the address always carries what is
  // in the boxes and the click only decides whether to let it through. An empty
  // `email` composes to '' and the pill goes back to being a span — the
  // Soundcloud button's rule, not the gallery's hide-the-row rule: a form the
  // artist has not addressed is still the picture their page is drawn around.
  // No target and no rel: a mailto in a new tab leaves an empty tab behind, and
  // the published document's delegated listener only ever swallows '#'.
  const href = s.live && !sent ? s.formMailto({ vals, ti: showTypes ? ti : -1, msg }) : ''
  const onSubmit = href ? (e) => {
    const bad = s.formCheck({ vals })
    if (bad.any) { e.preventDefault(); setErrs(bad) } else { setErrs(null); setSent(true) }
  } : undefined
  const Pill = href ? 'a' : 'span'
  const pillLink = href ? { href } : null

  // v0 — Enquiry Form layout 1 · Split context + form (§10.2 reference
  // design): an olive context panel welded to a mustard form panel inside one
  // rounded, clipped shell.
  if (s.v0) {
    // §5.5 — one form across three frames: the 768 (986:39583) and 390
    // (986:39647) ones verbatim, the 1440 one (964:58584) on the 1180 canvas at
    // × 0.82. The two narrow frames only stack the halves, which the shell
    // already does on `s.narrow`, so every dimension below is the frame's own
    // number through `u()`. Three things the frames genuinely re-set, listed as
    // they come: the inset round each panel, the fields' columns and the gap
    // between them, and the height of the message box.
    const scale = s.narrow ? 1 : 0.82
    const u = (v) => `${Math.round(v * scale)}px`
    // 44/40 on the 1440 frame, 30 on the 768 one, 30/20 on the 390 one.
    const inset = s.mob ? `${u(30)} ${u(20)}` : s.narrow ? u(30) : `${u(44)} ${u(40)}`

    const ctxBg = s.chips[3 % s.chips.length].bg      // Retro: olive
    const ctxFg = contrastInk(ctxBg)
    const formBg = s.pillBg
    const formFg = contrastInk(formBg)
    // The controls sit on the pill hue, so their ink is the accent only while
    // it stays legible against it — s.pillFg already encodes that fallback.
    const ctlInk = s.pillFg
    // The frame fills every control a step off the panel it sits on (#EFB42C on
    // the mustard). That lift is not derivable from the palette, so it is taken
    // as what it reads as: a thin veil of the accent's own ink.
    const ctlBg = s.acFg12
    // Every frame throws the picked chip and the submit pill onto the olive of
    // the panel beside them, the way every §10.2 card throws its block.
    const block = hard(s, ctxBg, 3 * scale, 4 * scale)

    const label = (t) => (
      <span style={{
        fontFamily: s.body, fontSize: u(10), letterSpacing: '0.03em',
        textTransform: 'uppercase', color: ctlInk,
      }}>{t}</span>
    )

    // One box, drawn once for both modes. There is no red in any THEMES
    // palette and this file invents no hex, so a refused field is marked
    // structurally: a rule under it in the accent's own ink, drawn *inset* so
    // the stated 60 does not grow and nothing in the frame moves.
    const ctl = (bad) => ({
      border: `${s.bw} solid ${formFg}`, borderRadius: s.btnR, background: ctlBg,
      // Stated heights, not padding: the reset boxes these border-box, so
      // the frame's stroke sits inside its 60 the way Figma draws it.
      height: u(60), padding: `0 ${u(24)}`,
      fontFamily: s.body, fontSize: u(13.5), color: ctlInk,
      margin: 0, width: '100%',
      boxShadow: bad ? `inset 0 ${u(-3)} 0 ${ctlInk}` : undefined,
    })

    // Repertoire's search box is the precedent: on the published page a real
    // field, on the canvas the same span it has always been, both carrying the
    // frame's own type so the box does not jump when the page is published.
    // Keyed by index rather than by label — two boxes may be called the same
    // thing, and an artist mid-rename has two called nothing.
    const field = (f, i) => {
      const bad = !!(errs && errs.f[i])
      return (
        <div key={i} style={col(u(6))}>
          {label(f.label)}
          {s.live ? (
            <input
              value={at(i)} placeholder={f.placeholder}
              onChange={(e) => setAt(i, e.target.value)}
              // type="email" is free semantics and a phone keyboard; `number`
              // gets inputMode only, because type="number" draws spinners
              // inside the frame's 60px box. A date is a text box carrying the
              // artist's placeholder: the native picker cannot be styled onto
              // mustard, and the frame draws a written date.
              type={f.kind === 'email' ? 'email' : 'text'}
              inputMode={f.kind === 'number' ? 'numeric' : undefined}
              style={{ ...ctl(bad), outline: 'none' }}
            />
          ) : (
            <span style={{ ...ctl(bad), display: 'flex', alignItems: 'center' }}>{f.placeholder}</span>
          )}
        </div>
      )
    }

    // Two to a row on the 1440 and 768 frames, one to a row on the 390 one,
    // which also closes the gap between them from 12 to 10. The pairing is
    // sectionVm's (`vm.formRows`), not a grid's: the frames space the fields
    // inside a row by that 12/10 and the rows themselves by the panel's own
    // 14, and one auto-flowing grid has a single rowGap.
    const fieldRow = (fs, r) => (
      <div key={r} style={{
        display: 'grid', gridTemplateColumns: s.mob ? '1fr' : '1fr 1fr',
        gap: u(s.mob ? 10 : 12),
      // r * 2 + j, not the row-local index: `at()` and `errs.f` are indexed
      // against the whole field list, and a row is always a chunk of two.
      }}>{fs.map((f, j) => field(f, r * 2 + j))}</div>
    )

    return (
      <div style={{
        position: 'relative',
        // The frame rings the whole shell in a tan hairline — it stands on the
        // cream sheet (see `cream` in EncoreSection), not on the page ground,
        // and without the ring the mustard half would float off it.
        border: `1px solid ${s.edge}`,
        borderRadius: u(16), overflow: 'hidden', display: 'grid',
        gridTemplateColumns: s.narrow ? '1fr' : '0.62fr 1.38fr',
      }}>
        <div style={{ background: ctxBg, color: ctxFg, padding: inset, ...col(u(20)) }}>
          <span style={row(u(14))}>
            <span style={{
              width: Math.round(48 * scale), height: Math.round(48 * scale),
              flex: 'none', borderRadius: '999px', overflow: 'hidden', background: s.bg,
            }}><Photo s={s} initialsSize={15} /></span>
            <span style={col('2px')}>
              <span style={{
                fontFamily: s.display, fontSize: u(15), letterSpacing: s.dls,
              }}>{s.brand}</span>
              <span style={{ fontFamily: s.body, fontSize: u(12) }}>{s.kicker}</span>
            </span>
          </span>
          <h2 style={{
            margin: 0, fontFamily: s.display,
            // The frames' 40 is Soulway's measure. It clears the 1440 and 768
            // panels in any of the five display faces, but on the 390 one the
            // line is 306px wide and "unforgettable." is a single unbreakable
            // word — Titan One and Special Elite run off the end of it. Those
            // four keep the theme's own display step there; Retro, whose frame
            // this is, keeps the 40.
            fontSize: s.mob && !s.retro ? s.dispSm : u(40),
            // The heading is a content field, so a long enough word overflows
            // whatever the face: break it rather than let the shell clip it.
            overflowWrap: 'break-word',
            lineHeight: 0.98, letterSpacing: s.dls,
          }}>{s.title}</h2>
          <div style={col(u(10))}>
            {s.formPromises.map((p) => (
              <span key={p} style={row(u(10), {
                fontFamily: s.body, fontSize: u(13),
                // The frame sets each promise on a 16px line at 13px type.
                lineHeight: 1.2,
              })}>
                <Check size={Math.round(13 * scale)} style={{ flex: 'none', color: formBg }} />
                {p}
              </span>
            ))}
          </div>
        </div>

        <div style={{ background: formBg, color: formFg, padding: inset, ...col(u(14)) }}>
          {sent ? (
            // The mustard half alone — the shell, the olive panel and the one
            // sheet of grain below are untouched, so the composition does not
            // move. `sent` can only be set under s.live, so the canvas never
            // draws this.
            <div style={col(u(14))}>
              <h3 style={{
                margin: 0, fontFamily: s.display, fontSize: u(28),
                letterSpacing: s.dls, lineHeight: 1, overflowWrap: 'break-word',
              }}>{s.formSentTitle}</h3>
              <p style={{
                margin: 0, fontFamily: s.body, fontSize: u(13.5), lineHeight: 1.5,
              }}>{s.formSentBody}</p>
              {/* Plain text, deliberately, and not a second mailto: this line
                  is the fallback for a visitor whose browser opened nothing,
                  and a link they cannot follow is no fallback at all. */}
              <span style={{
                fontFamily: s.body, fontWeight: 700, fontSize: u(15),
                overflowWrap: 'break-word',
              }}>{s.formEmail}</span>
              <span
                onClick={() => setSent(false)}
                style={{
                  ...row(u(10), { justifyContent: 'center' }),
                  background: s.ac, color: s.acFg, borderRadius: s.btnR,
                  padding: `${u(14)} ${u(20)}`,
                  cursor: 'pointer', boxShadow: block, ...labelStyle(s, u(20)),
                }}
              >{s.formAgain}</span>
            </div>
          ) : (
            <>
              {s.formRows.map(fieldRow)}
              {/* Not drawn at no chips: a picker with nothing to pick is the
                  pager's case and the pricing chips'. */}
              {showTypes && (
                <div style={col(u(8))}>
                  {label(s.formTypeLabel)}
                  <div style={row(u(8), { flexWrap: 'wrap' })}>
                    {s.formTypes.map((t, i) => {
                      const onClick = s.live ? () => setType(i) : undefined
                      return (
                        <span key={i} onClick={onClick} style={{
                          // Figma strokes inside the box, so its picked chip stands as
                          // tall as the four outlined ones with no stroke at all. A CSS
                          // border adds to the box, so the picked one keeps its border
                          // and paints it its own fill, and the height is stated rather
                          // than left to the padding and the line box.
                          border: `${s.bw} solid ${i === ti ? s.ac : formFg}`, borderRadius: s.btnR,
                          display: 'inline-flex', alignItems: 'center',
                          height: u(25), padding: `0 ${u(11)}`,
                          background: i === ti ? s.ac : 'transparent', color: i === ti ? s.acFg : formFg,
                          boxShadow: i === ti ? block : 'none',
                          // Read off the handler, Pager's rule: a chip on the
                          // canvas is a picture of a chip.
                          cursor: onClick ? 'pointer' : undefined,
                          fontFamily: s.body, fontWeight: 700, fontSize: u(12.5), whiteSpace: 'nowrap',
                        }}>{t}</span>
                      )
                    })}
                  </div>
                </div>
              )}
              <div style={col(u(6))}>
                {label(s.formMsgLabel)}
                {s.live ? (
                  <textarea
                    value={msg} placeholder={s.formMessage}
                    onChange={(e) => setMsg(e.target.value)}
                    style={{
                      ...ctl(false), display: 'block',
                      borderRadius: u(20), height: u(s.mob ? 100 : 134),
                      padding: `${u(20)} ${u(24)}`,
                      // The box is the frame's; it cannot be dragged out of it.
                      resize: 'none', outline: 'none',
                    }}
                  />
                ) : (
                  <span style={{
                    ...ctl(false), display: 'block',
                    borderRadius: u(20), height: u(s.mob ? 100 : 134),
                    padding: `${u(20)} ${u(24)}`,
                  }}>{s.formMessage}</span>
                )}
              </div>
              <Pill {...pillLink} onClick={onSubmit} style={{
                ...row(u(10), { justifyContent: 'center' }),
                background: s.ac, color: s.acFg, borderRadius: s.btnR,
                // The frame's 49px pill is its 10px padding plus the line box
                // Anton's own leading gives 20px type. labelStyle sets the tighter
                // 1.1 every other label in the page wants, so the padding carries
                // the difference and the pill still stands the frame's height.
                padding: `${u(14)} ${u(20)}`,
                textDecoration: 'none',
                cursor: onSubmit ? 'pointer' : undefined,
                boxShadow: block, ...labelStyle(s, u(20)),
              }}>
                {s.formBtn}
                <Asterisk size={Math.round(20 * scale)} color={s.acFg} />
              </Pill>
              {errs && (
                <span style={{
                  fontFamily: s.body, fontSize: u(12), color: formFg, textAlign: 'center',
                }}>{s.formPrompt}</span>
              )}
            </>
          )}
        </div>
        {/* One sheet of grain over both halves, screened at the frame's .4 —
            not a sheet per panel, which seams down the weld between them. */}
        <Grain s={s} exact blend="screen" opacity={0.4} />
      </div>
    )
  }
  // The flat fallback (arch 1, 3, 5). Its three boxes were hardcoded literals
  // unrelated to the field list; they are the artist's now, off the same state
  // and the same hooks as v0 — there is no second state model.
  //
  // It draws no chip row, and never has: this is the plain layout, and the
  // artist's types are not lost, merely not offered here. `showTypes` above is
  // false for the whole layout, so the mailto goes with no type at all.
  const flatCtl = (bad) => ({
    ...inputStyle(s),
    // The inset rule again — no palette has a red, and inset costs no layout.
    boxShadow: bad ? `inset 0 -3px 0 ${s.ac}` : undefined,
  })
  const flatPill = {
    background: s.ac, color: s.acFg, textAlign: 'center', fontSize: '12px', fontWeight: 700,
    letterSpacing: '1.2px', textTransform: 'uppercase', padding: '14px', borderRadius: s.btnR,
    textDecoration: 'none', display: 'block',
  }
  if (sent) {
    return (
      <div style={col('14px', { maxWidth: '560px', margin: '0 auto', textAlign: 'center' })}>
        <h2 style={{ margin: 0, ...h2Style(s), lineHeight: 1.04 }}>{s.formSentTitle}</h2>
        <p style={{ margin: 0, fontSize: '15px', color: s.muted, lineHeight: 1.6 }}>{s.formSentBody}</p>
        <span style={{ fontSize: '16px', fontWeight: 700, wordBreak: 'break-word' }}>{s.formEmail}</span>
        <span onClick={() => setSent(false)} style={{ ...flatPill, cursor: 'pointer' }}>{s.formAgain}</span>
      </div>
    )
  }
  return (
    <div style={col('14px', { maxWidth: '560px', margin: '0 auto', textAlign: 'center' })}>
      <h2 style={{ margin: 0, ...h2Style(s), lineHeight: 1.04 }}>{s.title}</h2>
      <p style={{ margin: '0 0 8px', fontSize: '15px', color: s.muted, lineHeight: 1.6 }}>{s.formPara}</p>
      {s.formFields.map((f, i) => (s.live ? (
        <input
          key={i} value={at(i)} placeholder={f.placeholder}
          onChange={(e) => setAt(i, e.target.value)}
          type={f.kind === 'email' ? 'email' : 'text'}
          inputMode={f.kind === 'number' ? 'numeric' : undefined}
          style={flatCtl(!!(errs && errs.f[i]))}
        />
      ) : (
        // The one place a canvas control stays an <input readOnly> rather than
        // becoming a span: this layout has always drawn inputs, and a span here
        // would change the placeholder's own colour.
        <input key={i} style={flatCtl(false)} placeholder={f.placeholder} readOnly />
      )))}
      {s.live ? (
        <textarea
          rows={3} value={msg} placeholder={s.formMessage}
          onChange={(e) => setMsg(e.target.value)}
          style={{ ...flatCtl(false), resize: 'none' }}
        />
      ) : (
        <textarea rows={3} style={{ ...flatCtl(false), resize: 'none' }} placeholder={s.formMessage} readOnly />
      )}
      <Pill {...pillLink} onClick={onSubmit} style={{ ...flatPill, cursor: onSubmit ? 'pointer' : undefined }}>
        {s.formBtn}
      </Pill>
      {errs && (
        <span style={{ fontSize: '13px', color: s.muted }}>{s.formPrompt}</span>
      )}
    </div>
  )
}

// §10.2 reference design: the wordmark over the statement to the left of a
// full-height rule, the two link columns and the Book Now pill to its right,
// the seal hung off the left column's outer edge, and the small print under a
// hairline.
//
// §5.5 — three frames: 1440 (964:58586) on the 1180 canvas at × 0.82, 768
// (907:12201) and 390 (986:39755) verbatim. The narrow two are not the desktop
// squeezed: they stack it, the vertical rule turning into a hairline between
// the statement and the links, so the composition splits on `s.narrow` and
// every number below is its own frame's through `u()`.
//
// The frames carry 56 of their own padding above the wordmark, which the
// section root's `padY` already stands in for; it is dropped here, and the 56
// *below* the statement and around the link block — the breathing room that
// holds each hairline off its content — is kept.
function Footer({ s }) {
  const scale = s.narrow ? 1 : 0.82
  const u = (v) => `${Math.round(v * scale)}px`
  // Line 17 and Line 19 are a 1px #1B1714 stroke — the page ink at full
  // strength, not the tint every pre-§10.2 divider takes.
  const rule = `1px solid ${s.tx}`
  // The frames set 52 between link baselines, which is Anton's own 29px line
  // box plus 23. labelStyle draws the label at the tighter 1.1 the rest of the
  // page wants, so the gap carries the difference: 52 less the 22 box a 20px
  // label makes. Same distance again before the pill.
  const linkGap = u(30)
  // The rotated seal's Figma frame is its *bounding* box — 237.56 is a 172.13
  // disc turned 32.38° (× cos + sin). `size` is the disc.
  const sealSize = s.mob ? 85 : Math.round(172.13 * scale)
  // Measured off the renders, not the metadata: `get_metadata` gives a rotated
  // group's x/y in its rotated parent's space. Desktop hangs the disc 20 past
  // the left column's edge, into the gutter before the rule; both narrow frames
  // stand it against the content's right edge instead.
  const sealPos = s.mob ? { right: '29px', top: '-22px' }
    : s.narrow ? { right: '4px', top: '-3px' }
      : { right: u(-20.5), top: u(-8.6) }

  // The stated 31, not the row's own content: the frame's height is the line
  // box Anton's leading gives 21.4px type, and labelStyle sets the tighter 1.1
  // the rest of the page wants, which would otherwise leave the globe to set a
  // 27 row and pull everything under it up by four.
  const wordmark = (
    <span style={row(u(20), { height: u(31) })}>
      <span style={row(u(10))}>
        <GlobeMark size={Math.round(27.37 * scale)} color={s.ac} />
        <span style={labelStyle(s, u(21.4), { color: s.ac })}>{s.brand}</span>
      </span>
      <span style={{ width: u(150), height: u(2), background: s.ac, flex: 'none' }} />
    </span>
  )

  const statement = (
    <h2 style={{
      margin: 0, fontFamily: s.display, fontSize: u(40), lineHeight: 39 / 40,
      // The frame breaks the line by hand after "make" and folds the rest in a
      // 439.6 measure. Mobile drops the measure and takes the content column.
      whiteSpace: 'pre-wrap',
      letterSpacing: s.dls, color: s.ac, maxWidth: s.mob ? 'none' : u(440),
    }}>{s.footerStatement}</h2>
  )

  const seal = (
    <SealBadge s={s} hue={s.chips[0].bg} ink={s.tx} glyph="globe"
               size={sealSize} tilt={32.38} style={{ ...sealPos, zIndex: 2 }} />
  )

  const linkCol = (colLinks, i) => (
    <nav key={i} style={col(linkGap, {
      alignItems: 'flex-start',
      // Column 2 stands at a stated offset the pill's own width sets, so
      // column 1 holds it whether or not the label face fills it.
      minWidth: i === 0 ? u(148) : undefined,
    })}>
      {colLinks.map((l, j) => {
        // The gigs' seam, at a link: an address the artist typed leaves the page
        // in a new tab, a section id scrolls, and on the canvas both resolve to
        // an <a> with no href at all — never `#`, which is what this column used
        // to carry and which jumps the *builder* to its own top. navHref's rule,
        // and its other half too: an href-less anchor takes the text cursor, so
        // the style states the pointer for itself. Keyed positionally, because
        // the labels are the artist's now and two of them can read the same.
        const ext = extLink(s, l.url)
        return (
          <a key={j} {...(ext || { href: navHref(s, l.to) })}
             style={labelStyle(s, u(20), {
               color: s.ac, cursor: 'pointer', textDecoration: 'none',
             })}>{l.label}</a>
        )
      })}
      {/* The frames set the footer pill the other way up from every other one:
          the accent is the ground, the page background is the type, and the
          mustard the rest of the page puts *under* the type is its block. The
          390 frame keeps the 768 pill at full size, hence `full`.

          It books at `bookTo` with no self-exclusion filter, unlike the pricing
          cards' pills and the calendar's: `footer` is not in CTA_TARGETS.book,
          so the pill can never point at the section it stands in. With none of
          the three on the page it resolves to nothing and BookPill stays the
          span it has always been here.

          An emptied label drops it, which the calendar's foot pill does not do:
          there the pill sits at the end of a row of type, here it is the block
          the whole column is built round, and a wordless block is not one of
          this section's states. */}
      {i === 0 && s.footerCta && (
        <BookPill s={s} to={s.bookTo} label={s.footerCta}
                  bg={s.ac} fg={s.bg} shadow={s.pillBg} full={s.mob} />
      )}
    </nav>
  )

  const links = (
    <div style={{ display: 'flex', gap: s.mob ? u(26) : u(76) }}>
      {s.footerCols.map(linkCol)}
    </div>
  )

  const smallPrint = (
    <div style={{
      // The 390 frame halves the row exactly — two 185 boxes filling its 370,
      // each carrying its side over two lines — so there is no gap to give.
      display: 'flex', justifyContent: 'space-between', gap: s.mob ? 0 : u(16),
      // 24 under the hairline on the two wide frames; the mobile one sets both
      // halves over two lines and takes 14.
      paddingTop: s.mob ? u(14) : u(24),
      fontFamily: s.display, fontSize: u(23), lineHeight: 0.86,
      letterSpacing: '-0.038em', color: s.pillBg,
    }}>
      <span style={{ width: s.mob ? '50%' : 'auto' }}>{s.copyright}</span>
      <span style={{ width: s.mob ? '50%' : 'auto', textAlign: 'right' }}>{s.footerCredit}</span>
    </div>
  )

  if (s.narrow) {
    // The narrow frames sit the first rule flush on the boundary between the
    // two blocks — it is the 56 either side of it that holds it off the type —
    // and give only the second one the 2 above and below that the desktop
    // frame gives both.
    return (
      <div style={col(0)}>
        <div style={col(u(20), { position: 'relative', paddingBottom: u(56) })}>
          {wordmark}
          {statement}
          {seal}
        </div>
        <span style={{ height: 0, borderTop: rule }} />
        <div style={{ padding: `${u(56)} 0` }}>{links}</div>
        <span style={{ height: 0, borderTop: rule, margin: `${u(2)} 0` }} />
        {smallPrint}
      </div>
    )
  }

  return (
    <div style={col(u(2))}>
      <div style={{ display: 'flex', alignItems: 'stretch', gap: u(79) }}>
        {/* The row's height is the left column's: the wordmark and the
            statement are pushed to its ends over the frame's own 351.7, and
            the links run short of it. */}
        <div style={{
          position: 'relative', width: u(743), flex: '0 1 auto',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          minHeight: u(351.7), paddingBottom: u(56),
        }}>
          {wordmark}
          {statement}
          {seal}
        </div>
        {/* The frame's rule is 411.4 against a 407.7 row: it starts level with
            the top of the 56 dropped above the wordmark and runs on to meet
            the hairline, so it reclaims both out of the section's own padding
            rather than stopping at the type. */}
        <span style={{
          width: 0, borderLeft: rule, flex: 'none',
          marginTop: u(-56), marginBottom: u(-4),
        }} />
        {/* Sized off its own content, not off a zero basis: the editor draws
            the desktop canvas into whatever width the window leaves it, and a
            zero-basis column would let the links overflow the page rather than
            take the width out of the statement's. */}
        <div style={{ flex: '1 1 auto' }}>{links}</div>
      </div>
      <span style={{ height: 0, borderTop: rule }} />
      {smallPrint}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Root
 * ------------------------------------------------------------------ */

export default function EncoreSection({ s }) {
  // §10.2 — the hero is the one full-bleed composition: the photograph runs to
  // the section edges and the layout supplies its own insets.
  const bleed = s.hd && s.v0 && !s.flatHeader && s.retro
  // §10.2 — the events map is the one section painted on a dark ground rather
  // than the page background, so its checkerboard bands and cream type read.
  const darkMap = s.mp && s.v0 && s.retro
  // §10.2 — the media player (964:58578), repertoire (964:58580), booking
  // calendar (964:58583), enquiry form (964:58584) and testimonials
  // (964:58585) and footer (964:58586) frames stand on cream rather than the
  // beige page ground: the player so its beige checkerboard band and cream
  // track cards read against it, the repertoire so its torn beige edge and
  // olive song cards do, the calendar so its beige panel and the prints on it
  // do, the form so the tan hairline round its shell does, the testimonials so
  // its torn beige edge and the ink outlines round its stacked cards do —
  // there the quote card's own body is that same cream, and only its outline
  // parts it from the sheet — and the footer so its ink hairlines and the
  // beige type on its Book Now pill do. Retro's `paper` IS the page
  // background, hence the literal — which `Testimonials` takes a second copy
  // of for its torn edge, because that tear reveals the form's cream and not
  // the page's beige. Change one, change both.
  const cream = (s.me || s.re || s.ca || s.fo || s.te || s.ft) && s.v0 && s.retro
  return (
    // The id is the nav's scroll target, and it is live-gated: the editor
    // document renders a dozen header previews at once through LayoutPicker
    // and HeaderChoices, which would all claim id="header".
    <div id={s.live ? s.anchor : undefined} style={{
      background: darkMap ? s.mapBg : cream ? '#FBF6EA' : s.bg,
      color: darkMap ? s.mapFg : s.tx,
      fontFamily: s.body, padding: bleed ? 0 : s.pad,
      position: 'relative',
      transition: 'background-color .45s ease, color .45s ease',
      '--ac': s.ac, '--acFg': s.acFg,
    }}>
      {s.hd && (s.flatHeader ? <FlatHeader s={s} /> : (
        s.v0 ? <HeaderV0 s={s} />
          : s.v1 ? <HeaderV1 s={s} />
          : s.v2 ? <HeaderV2 s={s} />
          : s.v3 ? <HeaderV3 s={s} />
          : s.v4 ? <HeaderV4 s={s} />
          : <HeaderV5 s={s} />
      ))}
      {s.bi && <Bio s={s} />}
      {s.me && <Media s={s} />}
      {s.tg && <Tags s={s} />}
      {s.au && <Audio s={s} />}
      {s.vi && <Video s={s} />}
      {s.pr && <Pricing s={s} />}
      {s.re && <Repertoire s={s} />}
      {s.ga && <Gallery s={s} />}
      {s.ca && <Calendar s={s} />}
      {s.mp && <EventsMap s={s} />}
      {s.te && <Testimonials s={s} />}
      {s.fo && <EnquiryForm s={s} />}
      {s.ft && <Footer s={s} />}
    </div>
  )
}
