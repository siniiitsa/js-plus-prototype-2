// §10 — the section renderer. Purely presentational: every value arrives
// precomputed on `s` (§5.7) and this file does zero colour maths.
//
// Deliberately uses NO shadcn components and NO Tailwind utility classes
// (§2, §12.9–12.10): sections are painted with arbitrary hex values chosen
// at runtime, which a static utility class cannot express. The only class
// names permitted here are the three §3.3 rules that read the `--ac` /
// `--acFg` custom properties set on the section root.
//
// lucide-react is the one import: its icons inherit `currentColor`, so they
// stay theme-driven, and each takes the px size given in the spec rather
// than a `size-*` class.

import { useId } from 'react'
import {
  Play, SkipBack, SkipForward, Check, ChevronLeft, ChevronRight,
  ArrowLeft, ArrowRight, ArrowUpRight, Star, Plus, X, Search,
  Image as ImageIcon,
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

function NavLinks({ s, color, pills = false }) {
  const base = {
    fontSize: '10px', fontWeight: 600, letterSpacing: '1.2px',
    textTransform: 'uppercase', color: color || s.tx, opacity: pills ? 1 : 0.8,
    whiteSpace: 'nowrap',
  }
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: pills ? '8px' : '18px', flexWrap: 'wrap' }}>
      {s.navLinks.map((l) => (
        <a key={l} href="#" style={pills
          ? { ...base, border: '1px solid rgba(255,255,255,.35)', borderRadius: s.btnR, padding: '5px 12px' }
          : base}>{l}</a>
      ))}
    </nav>
  )
}

function BookPill({ s, label }) {
  const text = label ?? s.cta1
  if (s.retro) {
    // Accent-coloured type on a second palette hue, with the offset block.
    // One Figma pill at three scales: the 768 frame draws it at full size, the
    // 1180 canvas at × 0.82 and the 390 frame at × 0.62 — and the 390 one takes
    // its type down with it, where the other two set it at label-md.
    const tab = isTablet(s)
    return (
      <span style={{
        ...row(s.mob ? '6.2px' : tab ? '10px' : '8px'),
        background: s.pillBg, color: s.pillFg,
        padding: s.mob ? '6.2px 12.4px' : tab ? '10px 20px' : '8px 16px',
        borderRadius: s.btnR, cursor: 'pointer',
        boxShadow: s.mob ? hard(s, s.ac, 1.9, 2.5) : hard(s, s.ac, 3, 4),
        ...labelStyle(s, s.mob ? '12.4px' : undefined),
      }}>
        {text}
        <Asterisk size={s.mob ? 12.4 : tab ? 20 : 16} color={s.pillFg} />
      </span>
    )
  }
  return (
    <span style={{
      ...row('8px'), background: s.ac, color: s.acFg, fontSize: '10px', fontWeight: 700,
      letterSpacing: '1.2px', textTransform: 'uppercase', padding: '9px 18px',
      borderRadius: s.btnR, cursor: 'pointer', whiteSpace: 'nowrap',
    }}>
      {text}
      <span style={{
        width: '14px', height: '14px', borderRadius: '999px', background: s.acFg20,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none',
      }}><ArrowRight size={9} /></span>
    </span>
  )
}

function ListenLink({ s, color }) {
  return (
    <span style={{
      fontSize: '10px', fontWeight: 700, letterSpacing: '1.2px',
      textTransform: 'uppercase', color: color || s.tx, cursor: 'pointer', whiteSpace: 'nowrap',
    }}>{s.cta2}</span>
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
function Photo({ s, style, initialsSize = 44, backdrop = false, avatar = false, src }) {
  const url = avatar ? s.avatar : (src ?? s.image)
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

// §10.2 — one top bar for the hero and the footer. Below `desktop` the links
// collapse to a hamburger, as they do on both narrow reference frames.
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
          <BookPill s={s} />
          {/* 26 × 18 on both narrow frames: three 2.5px bars, 5px apart. */}
          <span style={col('5px', { width: '26px', flex: 'none', cursor: 'pointer' })}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                height: '2.5px', width: '100%', background: c, borderRadius: '2px',
              }} />
            ))}
          </span>
        </span>
      ) : (
        <nav style={row('18px', {
          flexWrap: 'wrap', justifyContent: 'flex-end', flex: '1 1 auto', minWidth: 0,
        })}>
          {s.navLinks.map((l) => (
            <a key={l} href="#" style={labelStyle(s, s.labelMd, { color: c })}>{l}</a>
          ))}
          <BookPill s={s} />
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
  const padX = s.mob ? '10px' : tab ? '30px' : s.gPad
  const padTop = s.mob ? '24px' : tab ? '30px' : '23px'
  // The checker ribbon on the floor is a fixed height at every breakpoint — the
  // reference does not scale it — so it is added to the identity block's own
  // clearance rather than eating into it. The reference band is 24px; this runs
  // it a third finer, so the squares read as texture rather than as blocks.
  const CHECKER = 16
  const padBottom = `${(s.mob ? 40 : tab ? 60 : 66) + CHECKER}px`

  return (
    <div style={{
      position: 'relative', aspectRatio: aspect, overflow: 'hidden',
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
      <SealBadge s={s} hue={s.chips[4]?.bg || s.ac} tilt={32.38} ink="#FBF6EA"
                 size={s.mob ? 85 : tab ? 125 : undefined}
                 style={{
                   top: s.mob ? '14.9%' : tab ? '12.8%' : '14%',
                   right: s.mob ? '3.3%' : tab ? '5.9%' : '3%',
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
          {!s.mob && <NavLinks s={s} color="#FFFFFF" pills />}
          <Wordmark s={s} color="#FFFFFF" />
          <span style={row('14px')}>
            <ListenLink s={s} color="#FFFFFF" />
            <BookPill s={s} />
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
            {!s.mob && <NavLinks s={s} color="#FFFFFF" />}
            <BookPill s={s} />
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
        {!s.mob && <NavLinks s={s} pills={false} />}
        <Wordmark s={s} />
        <span style={row('14px')}>
          <ListenLink s={s} />
          <BookPill s={s} />
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
          {!s.mob && <NavLinks s={s} color="#FFFFFF" pills />}
          <Wordmark s={s} color="#FFFFFF" />
          <span style={row('14px')}>
            <ListenLink s={s} color="#FFFFFF" />
            <BookPill s={s} />
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
            {!s.mob && <NavLinks s={s} color="#FFFFFF" />}
            <BookPill s={s} />
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
function Media({ s }) {
  if (s.v0) {
    const np = s.nowPlaying
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
          return (
            <div key={i} style={{
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
              }}><Play size={desk ? 10 : 12} fill="currentColor" strokeWidth={0} /></span>
              <span style={{
                width: desk ? 49 : 60, height: desk ? 49 : 60, flex: 'none',
                borderRadius: s.retro ? (desk ? '5px' : '6px') : s.radiusSm, overflow: 'hidden',
                // The frame borders only the open cards' art, hairline.
                border: s.retro ? (filled ? 'none' : `1px solid ${ink}`) : `${s.bw} solid ${fg}`,
              }}><Photo s={s} initialsSize={14} src={s.images[i]} /></span>
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
        }}><Photo s={s} initialsSize={44} src={s.images[5] ?? s.images[0]} /></div>
        <div style={col('4px', { alignItems: 'center', position: 'relative' })}>
          {/* The frame sets the now-playing block in the body face, like a real
              player UI — not the display serif. */}
          <span style={{
            fontFamily: s.retro ? s.body : s.display, fontWeight: s.retro ? 600 : undefined,
            fontSize: desk ? '16px' : '20px', letterSpacing: s.retro ? 0 : s.dls,
          }}>{np.track}</span>
          <span style={{ fontFamily: s.body, fontSize: desk ? '11px' : '13px', opacity: 0.7 }}>{np.by}</span>
        </div>
        <div style={row(desk ? '12px' : '14px', { position: 'relative' })}>
          <span style={ctl(false)}><SkipBack size={desk ? 12 : 14} fill="currentColor" strokeWidth={0} /></span>
          <span style={ctl(true)}><Play size={desk ? 13 : 16} fill="currentColor" strokeWidth={0} /></span>
          <span style={ctl(false)}><SkipForward size={desk ? 12 : 14} fill="currentColor" strokeWidth={0} /></span>
        </div>
        <div style={row('10px', { width: '100%', position: 'relative' })}>
          <span style={{ fontFamily: s.body, fontSize: '10px', opacity: 0.7 }}>{np.at}</span>
          <span style={{ flex: 1, height: '3px', background: s.retro ? 'rgba(0,0,0,0.28)' : s.deepFg25, borderRadius: '99px' }}>
            <span style={{ display: 'block', width: `${np.pct}%`, height: '100%', background: wine, borderRadius: '99px' }} />
          </span>
          <span style={{ fontFamily: s.body, fontSize: '10px', opacity: 0.7 }}>{np.of}</span>
        </div>
      </div>
    )

    // Frame 446:2265 — accent pill with beige Anton type and a mustard block,
    // the inverse of the Book Now pill.
    const pill = s.retro ? (
      <span style={{
        ...row('8px'), background: s.ac, color: s.bg, cursor: 'pointer',
        padding: desk ? '8px 16px' : '10px 20px', borderRadius: s.btnR,
        boxShadow: hard(s, s.pillBg, 3, 4),
        ...labelStyle(s, desk ? '16px' : '20px'),
      }}>Soundcloud</span>
    ) : (
      <BookPill s={s} label="Soundcloud" />
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
          <div key={i} style={{ border: `1.5px solid ${s.line}`, borderRadius: s.radius, padding: '18px', ...col('14px') }}>
            <div style={{
              background: s.soft, borderRadius: s.radiusSm, aspectRatio: '1',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: s.display, fontSize: '26px', color: s.muted, letterSpacing: s.dls }}>{t.n}</span>
            </div>
            <div style={row('12px', { justifyContent: 'space-between' })}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</div>
                <div style={{ fontSize: '12px', color: s.muted }}>{t.dur}</div>
              </div>
              <span style={{
                width: '36px', height: '36px', borderRadius: '999px', background: s.ac, color: s.acFg,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none', cursor: 'pointer',
              }}><Play size={11} /></span>
            </div>
          </div>
        ))}
      </div>
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

// v0 — Pricing layout 1 · 3-col in soft panel (§10.2 reference design): three
// cards, each in its own palette hue, each a degree or two off square and
// throwing a hard offset block in the next hue along.
function Pricing({ s }) {
  if (s.v0) {
    const TILT = [-0.6, 1.6, -1.1]
    return (
      <div style={col(s.mob ? '20px' : '30px')}>
        <div style={row('20px', { justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap' })}>
          <h2 style={{
            margin: 0, fontFamily: s.display, fontSize: s.dispSm, lineHeight: 1.1,
            letterSpacing: s.dls, color: s.ac, maxWidth: '18ch',
          }}>{s.title}</h2>
          <div style={row('8px', { flexWrap: 'wrap' })}>
            {s.tierModes.map((m, i) => (
              <span key={m} style={{
                border: `${s.bw} solid ${s.tx}`, borderRadius: s.btnR, padding: '5px 14px',
                background: i === 0 ? s.ac : 'transparent', color: i === 0 ? s.acFg : s.tx,
                boxShadow: i === 0 ? hard(s, s.pillBg, 3, 3) : 'none', cursor: 'pointer',
                ...labelStyle(s, s.eyebrow),
              }}>{m}</span>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: s.narrow ? '1fr' : '1fr 1fr 1fr',
          gap: s.mob ? '22px' : '30px', alignItems: 'stretch',
        }}>
          {s.tiers.map((t, i) => {
            const money = String(t.price)
            const symbol = /^[^\d]/.test(money) ? money[0] : ''
            const amount = symbol ? money.slice(1) : money
            return (
              <div key={i} style={{
                position: 'relative', transform: tilt(s, TILT[i]),
                background: t.card, color: t.cardFg,
                border: `${s.bw} solid ${s.tx}`, borderRadius: s.radius,
                padding: s.mob ? '20px' : '26px',
                boxShadow: hard(s, s.tiers[(i + 1) % s.tiers.length].card, 6, 6),
                display: 'flex', flexDirection: 'column', gap: s.mob ? '14px' : '18px',
                transition: 'background-color .45s ease, color .45s ease',
              }}>
                <Grain s={s} opacity={0.22} radius={s.radius} />
                <span style={row('10px', { position: 'relative' })}>
                  <span style={{
                    border: `1.5px solid ${t.cardFg}`, borderRadius: '6px', padding: '2px 6px',
                    fontFamily: s.body, fontSize: '10px', opacity: 0.85,
                  }}>ico</span>
                  <span style={labelStyle(s, s.labelXs)}>{t.name}</span>
                </span>

                <span style={row('6px', { alignItems: 'baseline', position: 'relative' })}>
                  <span style={{ fontFamily: s.body, fontSize: s.labelXs }}>{symbol}</span>
                  <span style={{ fontFamily: s.display, fontSize: s.dispSm, letterSpacing: s.dls }}>{amount}</span>
                  <span style={{ fontFamily: s.body, fontSize: s.eyebrow, color: t.cardMut }}>/event</span>
                </span>

                <p style={{
                  margin: 0, position: 'relative', fontFamily: s.body, fontSize: s.eyebrow,
                  lineHeight: 1.5, color: t.cardMut,
                }}>{t.blurb}</p>

                <div style={col('8px', { position: 'relative' })}>
                  {t.feats.map((f, j) => (
                    <span key={j} style={row('8px', {
                      alignItems: 'flex-start', fontFamily: s.body, fontSize: s.labelXs, lineHeight: 1.4,
                    })}>
                      <Check size={13} style={{ flex: 'none', marginTop: '2px' }} />
                      {f}
                    </span>
                  ))}
                </div>

                <span style={{ marginTop: 'auto', paddingTop: '6px', position: 'relative' }}>
                  <BookPill s={s} />
                </span>
              </div>
            )
          })}
        </div>

        <span style={{ fontFamily: s.body, fontSize: s.eyebrow, color: s.muted }}>{s.pricingSub}</span>
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
function Pager({ s, colour, fill }) {
  const c = colour || s.tx
  const btn = (key, child, on, ends) => (
    <span key={key} style={{
      minWidth: s.mob ? 30 : 42, height: s.mob ? 30 : 42, padding: '0 8px',
      borderRadius: s.radiusSm, border: `${s.bw} solid ${on ? s.pillBg : c}`,
      background: on ? s.pillBg : (ends ? (fill || 'transparent') : 'transparent'),
      color: on ? contrastInk(s.pillBg) : c, cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      ...labelStyle(s, s.eyebrow),
    }}>{child}</span>
  )
  return (
    <div style={row('8px', { flexWrap: 'wrap' })}>
      {btn('prev', <ArrowLeft size={14} />, false, true)}
      {s.pages.map((p, i) => btn(`p${i}`, p, i === 0))}
      {btn('next', <ArrowRight size={14} />, false, true)}
    </div>
  )
}

// v0 — Repertoire layout 1 · Two-column dense (§10.2 reference design)
function Repertoire({ s }) {
  if (s.v0) {
    const half = Math.ceil(s.songs.length / 2)
    const columns = s.narrow ? [s.songs] : [s.songs.slice(0, half), s.songs.slice(half)]
    const hue = s.repHue   // Retro: olive

    return (
      <div style={{ position: 'relative', ...col(s.mob ? '20px' : '28px') }}>
        <TornEdge s={s} side="top" height={30} />

        <div style={row('20px', { justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap' })}>
          <div style={col('10px')}>
            <span style={labelStyle(s, s.eyebrow, { color: s.ac, letterSpacing: '0.16em' })}>Repertoire</span>
            <h2 style={{
              margin: 0, fontFamily: s.display, fontSize: s.dispLg, lineHeight: 0.95,
              letterSpacing: s.dls, color: s.ac,
            }}>{s.title}</h2>
          </div>
          <div style={row('12px', {
            border: `${s.bw} solid ${s.tx}`, borderRadius: s.radiusSm, padding: '8px 14px 8px 8px',
            minWidth: s.narrow ? '100%' : '300px',
          })}>
            <span style={{
              width: 30, height: 30, flex: 'none', borderRadius: s.radiusSm,
              background: s.ac, color: s.acFg,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}><Search size={15} /></span>
            <span style={{ fontFamily: s.body, fontSize: s.labelXs, color: s.muted }}>
              Search songs or artists…
            </span>
          </div>
        </div>

        <div style={row('8px', { flexWrap: 'wrap' })}>
          {s.repFilters.map((f, i) => (
            <span key={i} style={{
              border: `${s.bw} solid ${s.tx}`, borderRadius: s.btnR, padding: '5px 14px',
              background: i === 0 ? s.ac : 'transparent', color: i === 0 ? s.acFg : s.tx,
              boxShadow: i === 0 ? hard(s, s.pillBg, 3, 3) : 'none', cursor: 'pointer',
              ...labelStyle(s, s.eyebrow),
            }}>{f}</span>
          ))}
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: s.narrow ? '1fr' : '1fr 1fr', gap: s.mob ? '12px' : '18px',
        }}>
          {columns.map((colSongs, ci) => (
            <div key={ci} style={col(s.mob ? '12px' : '18px')}>
              {colSongs.map((t) => (
                <div key={t.n} style={{
                  position: 'relative', border: `${s.bw} solid ${hue}`, borderRadius: s.radiusSm,
                  padding: s.mob ? '12px 14px 16px' : '16px 20px 20px',
                  ...row('12px', { justifyContent: 'space-between' }),
                }}>
                  <span style={row('10px', { minWidth: 0 })}>
                    <span style={{ fontFamily: s.body, fontSize: '11px', color: s.ac, flex: 'none' }}>{t.n}</span>
                    <span style={{
                      fontFamily: s.display, fontSize: s.title, letterSpacing: s.dls, color: hue,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{t.title}</span>
                  </span>
                  <span style={labelStyle(s, s.eyebrow, { color: s.ac, flex: 'none' })}>· {t.artist}</span>
                  <Checkerboard s={s} cell={6} colour={hue} style={{
                    position: 'absolute', left: 0, right: 0, bottom: 0, width: 'auto',
                    borderBottomLeftRadius: s.radiusSm, borderBottomRightRadius: s.radiusSm,
                  }} />
                </div>
              ))}
            </div>
          ))}
        </div>

        <Pager s={s} colour={hue} fill={s.soft2} />
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

// Which thumbnail the strip highlights, and therefore which photo the large
// viewer shows. §10.2 marks the fourth tile — but only once there are four
// photos to mark, so a part-filled strip never highlights an empty slot.
const galActive = (s) => (s.images.length > 3 ? 3 : 0)

function Gallery({ s }) {
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
    const active = galActive(s)
    const arrow = (icon) => (
      <span style={{
        width: 30, height: 30, borderRadius: '999px', background: s.deep, color: s.deepFg,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>{icon}</span>
    )

    const sources = (
      <div style={col(s.mob ? '12px' : '18px')}>
        {s.gallerySources.map((g, i) => (
          <div key={i} style={{
            ...row('16px'),
            background: g.on ? s.pillBg : 'transparent',
            color: g.on ? contrastInk(s.pillBg) : s.tx,
            border: `${s.bw} solid ${s.tx}`, borderRadius: s.btnR,
            padding: s.mob ? '8px 14px 8px 8px' : '10px 20px 10px 10px',
            boxShadow: g.on ? hard(s, s.ac, 4, 5) : 'none',
          }}>
            <span style={{
              width: s.mob ? 34 : 44, height: s.mob ? 34 : 44, flex: 'none',
              borderRadius: s.radiusSm, background: g.bg, color: g.fg,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}><ImageIcon size={s.mob ? 16 : 20} /></span>
            <span style={labelStyle(s, s.labelMd, {
              flex: 1, color: g.on ? s.pillFg : g.ink,
            })}>{g.label}</span>
            {g.on ? <X size={20} strokeWidth={2.4} /> : <Plus size={20} strokeWidth={2.4} />}
          </div>
        ))}
      </div>
    )

    // §10.2 — the viewer stack does not fill its half: the card is 603 of the
    // 720 column, and the thumbnail rail lines up with it.
    const viewer = (
      <div style={col('14px', { maxWidth: s.narrow ? 'none' : '84%' })}>
        <div style={row('12px', { justifyContent: 'space-between', flexWrap: 'wrap' })}>
          <span style={row('8px', labelStyle(s, s.eyebrow, { color: s.ac }))}>
            <ArrowLeft size={13} /> Back to beginning
          </span>
          <span style={col('2px', { alignItems: 'flex-end' })}>
            <span style={labelStyle(s, s.eyebrow, { color: s.tx })}>{s.brand}</span>
            <span style={labelStyle(s, s.eyebrow, { color: s.muted })}>Gallery</span>
          </span>
        </div>

        <div style={{
          position: 'relative', background: s.ac, borderRadius: s.radius,
          padding: s.mob ? '10px' : '14px', ...row('12px', { alignItems: 'stretch' }),
        }}>
          <Grain s={s} opacity={0.2} radius={s.radius} />
          <div style={{
            flex: 1, minWidth: 0, aspectRatio: '4 / 4.36', borderRadius: s.radiusSm,
            overflow: 'hidden', position: 'relative',
          }}><Photo s={s} initialsSize={52} src={s.images[active]} /></div>
          <div style={col('10px', { flex: 'none', alignItems: 'center', color: s.acFg, position: 'relative' })}>
            <GlobeMark size={18} color={s.acFg} />
            <span style={labelStyle(s, s.eyebrow, { writingMode: 'vertical-rl', letterSpacing: '0.1em' })}>
              Gallery
            </span>
          </div>
          <div style={row('8px', { position: 'absolute', right: '18px', bottom: '18px' })}>
            {arrow(<ArrowLeft size={14} />)}{arrow(<ArrowRight size={14} />)}
          </div>
        </div>

        <div style={row('10px', { overflow: 'hidden' })}>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <span key={i} style={{
              flex: 1, minWidth: 0, aspectRatio: '1', borderRadius: s.radiusSm, overflow: 'hidden',
              border: `${s.bw} solid ${i === active ? s.pillBg : s.ac}`,
            }}><Photo s={s} initialsSize={12} src={s.images[i]} /></span>
          ))}
        </div>
      </div>
    )

    return (
      <div style={{
        // §10.2 splits this section down the middle (720 / 720).
        display: 'grid', gridTemplateColumns: s.narrow ? '1fr' : '1fr 1fr',
        gap: s.gGap, alignItems: 'start',
      }}>
        <div style={col(s.mob ? '20px' : '30px')}>
          <div style={col('12px')}>
            <span style={labelStyle(s, s.eyebrow, { color: s.ac, letterSpacing: '0.16em' })}>Media</span>
            <h2 style={{
              margin: 0, fontFamily: s.display, fontSize: s.dispLg, lineHeight: 0.95,
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
  if (s.v0) {
    const nav = (icon) => (
      <span style={{
        width: s.mob ? 30 : 40, height: s.mob ? 30 : 40, flex: 'none', borderRadius: s.radiusSm,
        background: s.pillBg, color: contrastInk(s.pillBg), border: `${s.bw} solid ${s.tx}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>{icon}</span>
    )

    const grid = (
      <div style={col(s.mob ? '14px' : '20px', { padding: s.mob ? '16px' : '24px' })}>
        <div style={row('12px', { justifyContent: 'space-between' })}>
          {nav(<ArrowLeft size={15} />)}
          <span style={{ fontFamily: s.display, fontSize: s.dispSm, letterSpacing: s.dls, color: s.ac }}>
            {s.calMonth}
          </span>
          {nav(<ArrowRight size={15} />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: s.mob ? '4px' : '8px' }}>
          {s.calDays.map((d) => (
            <span key={d} style={{
              textAlign: 'center', fontFamily: s.body, fontSize: s.eyebrow, color: s.muted, paddingBottom: '4px',
            }}>{d}</span>
          ))}
          {s.sched.map((c, i) => (
            <span key={i} style={{
              aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: s.body, fontSize: s.labelXs, borderRadius: s.radiusSm,
              border: c.d === '' ? 'none' : `${c.on ? s.bw : '1px'} solid ${c.on ? s.tx : s.line2}`,
              background: c.on ? s.ac : 'transparent', color: c.on ? s.acFg : s.tx,
              boxShadow: c.on ? hard(s, s.tx, 2, 2) : 'none', cursor: c.d === '' ? 'default' : 'pointer',
            }}>{c.d}</span>
          ))}
        </div>
      </div>
    )

    const stack = (
      <div style={{
        position: 'relative', padding: s.mob ? '20px' : '34px',
        minHeight: s.mob ? '260px' : '340px', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
      }}>
        {[2, 1, 0].map((k) => (
          <div key={k} style={{
            position: k === 0 ? 'relative' : 'absolute',
            width: s.mob ? '70%' : '62%',
            transform: `${tilt(s, -6 + k * 5)} translate(${k * -10}px, ${k * 6}px)`,
            background: s.paper, borderRadius: s.radiusSm, boxShadow: soft(s),
            padding: s.mob ? '8px 8px 22px' : '12px 12px 30px', zIndex: 3 - k,
          }}>
            <div style={{ aspectRatio: '4 / 4.4', overflow: 'hidden', borderRadius: '3px' }}>
              <Photo s={s} initialsSize={34} />
            </div>
            {k === 0 && (
              <span style={row('6px', {
                position: 'absolute', right: '14px', bottom: '9px', color: s.paperFg,
              })}>
                <span style={labelStyle(s, '9px')}>{s.location}</span>
                <GlobeMark size={11} color={s.paperFg} />
              </span>
            )}
          </div>
        ))}
        <SealBadge s={s} hue={s.chips[4 % s.chips.length].bg} size={s.mob ? 66 : 94} tilt={-20}
                   style={{ right: s.mob ? '6%' : '10%', bottom: s.mob ? '6%' : '8%', zIndex: 4 }} />
      </div>
    )

    return (
      <div style={{ position: 'relative' }}>
        <TornEdge s={s} side="top" height={30} />
        <div style={{
          border: `${s.bw} solid ${s.tx}`, borderRadius: s.radius, overflow: 'hidden',
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: s.narrow ? '1fr' : '1fr 1fr',
            borderBottom: `${s.bw} solid ${s.tx}`,
          }}>
            {grid}
            <div style={{
              borderLeft: s.narrow ? 'none' : `${s.bw} solid ${s.tx}`,
              borderTop: s.narrow ? `${s.bw} solid ${s.tx}` : 'none',
            }}>{stack}</div>
          </div>
          <div style={{ padding: s.mob ? '12px 16px' : '16px 24px' }}>
            <span style={labelStyle(s, s.eyebrow, {
              color: s.ac, letterSpacing: '0.12em', whiteSpace: 'normal',
            })}>{s.calEnquiry}</span>
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
  const pins = s.pins.map((p, i) => (
    <span key={i} style={{
      position: 'absolute', left: p.x, top: p.y, width: '12px', height: '12px',
      borderRadius: '999px', background: s.ac, boxShadow: `0 0 0 5px ${s.soft2}`,
      transform: 'translate(-50%, -50%)',
    }} />
  ))

  // v0 — Events Map layout 1 · Compact tile (§10.2 reference design): the
  // coverage tile beside the upcoming-gigs list, banded top and bottom with
  // full-bleed checkerboard.
  if (s.v0) {
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
        {s.gigs.map((g, i) => (
          <div key={i} style={{
            ...row('12px', { justifyContent: 'space-between' }),
            border: `${s.bw} solid ${g.hue}`, borderRadius: s.radiusSm,
            padding: s.mob ? '10px 12px' : '12px 16px', position: 'relative',
          }}>
            <span style={col('4px', { minWidth: 0 })}>
              <span style={{
                fontFamily: s.display, fontSize: s.title, letterSpacing: s.dls, color: g.hue,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{g.venue}</span>
              <span style={{ fontFamily: s.body, fontSize: s.eyebrow, opacity: 0.8 }}>
                {g.city} · {g.time}
              </span>
            </span>
            <span style={col('0', {
              alignItems: 'center', flex: 'none', border: `${s.bw} solid ${g.hue}`,
              borderRadius: s.radiusSm, padding: '5px 10px', lineHeight: 1.1,
            })}>
              <span style={labelStyle(s, '10px')}>{g.month}</span>
              <span style={labelStyle(s, s.labelXs)}>{g.day}</span>
            </span>
          </div>
        ))}
        <Pager s={s} colour={s.ac} fill={s.soft2} />
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
      {pins}
      <div style={{ position: 'relative' }}>
        <h2 style={{ margin: 0, fontFamily: s.display, fontSize: s.h2, letterSpacing: s.dls, lineHeight: 1 }}>{s.title}</h2>
        <div style={{ fontSize: '13px', fontWeight: 600, color: s.muted, marginTop: '8px' }}>{s.mapSub}</div>
      </div>
    </div>
  )
}

// v0 — Testimonials layout 1 · Stacked tag card (§10.2 reference design): one
// quote card sitting on two rotated coloured cards, flanked by arrows.
function Testimonials({ s }) {
  if (s.v0) {
    const q = s.quotes[0]
    const arrow = (icon) => (
      <span style={{
        width: s.mob ? 32 : 42, height: s.mob ? 32 : 42, flex: 'none', borderRadius: s.radiusSm,
        background: s.pillBg, color: contrastInk(s.pillBg), border: `${s.bw} solid ${s.tx}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>{icon}</span>
    )
    const backing = (hue, deg, dx, dy) => (
      <div style={{
        position: 'absolute', inset: 0, background: hue, borderRadius: s.radius,
        transform: `${tilt(s, deg)} translate(${dx}px, ${dy}px)`,
      }} />
    )

    return (
      <div style={{ position: 'relative' }}>
        <TornEdge s={s} side="top" height={30} />
        <Grain s={s} opacity={0.18} style={{
          left: `calc(-1 * ${s.padX})`, right: `calc(-1 * ${s.padX})`,
          top: `calc(-1 * ${s.padY})`, bottom: `calc(-1 * ${s.padY})`,
        }} />

        <div style={row(s.mob ? '10px' : '24px', {
          justifyContent: 'center', position: 'relative',
          padding: s.mob ? '10px 0 8px' : '40px 0 34px',
        })}>
          {arrow(<ArrowLeft size={15} />)}
          <div style={{
            position: 'relative', flex: 1, maxWidth: '622px',
            padding: s.mob ? '4px' : '10px',
          }}>
            {backing(s.chips[3 % s.chips.length].bg, -1.6, 0, -8)}
            {backing(s.chips[1 % s.chips.length].bg, 1.8, -8, 4)}
            <div style={{
              position: 'relative', background: s.paper, color: s.paperFg,
              border: `${s.bw} solid ${s.paperFg}`, borderRadius: s.radius,
              padding: s.mob ? '22px' : '34px', minHeight: s.mob ? '220px' : '345px',
              ...col(s.mob ? '14px' : '18px'),
            }}>
              <span style={labelStyle(s, s.eyebrow, { color: s.ac, letterSpacing: '0.16em' })}>{q.when}</span>
              <p style={{
                margin: 0, fontFamily: s.display, fontSize: s.dispSm, lineHeight: 1.1, letterSpacing: s.dls,
              }}>{s.quote1}</p>
              <span style={labelStyle(s, s.labelXs)}>{q.who} · {q.role}</span>
              <div style={row('10px', { marginTop: 'auto', paddingTop: '18px', flexWrap: 'wrap' })}>
                {[[q.who, s.ac], [q.role, s.pillBg]].map(([l, hue], i) => (
                  <span key={i} style={{
                    background: hue, color: contrastInk(hue), borderRadius: s.btnR,
                    padding: '6px 14px', ...labelStyle(s, s.eyebrow),
                  }}>{l}</span>
                ))}
              </div>
            </div>
          </div>
          {arrow(<ArrowRight size={15} />)}
        </div>
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
            <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6 }}>{i === 0 ? s.quote1 : q.q}</p>
            <div style={{ marginTop: 'auto' }}>
              <div style={{ fontSize: '13px', fontWeight: 700 }}>{q.who}</div>
              <div style={{ fontSize: '12px', color: s.muted }}>{q.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EnquiryForm({ s }) {
  const submit = (
    <span style={{
      background: s.ac, color: s.acFg, textAlign: 'center', fontSize: '12px', fontWeight: 700,
      letterSpacing: '1.2px', textTransform: 'uppercase', padding: '14px', borderRadius: s.btnR,
      cursor: 'pointer',
    }}>{s.formBtn}</span>
  )

  // v0 — Enquiry Form layout 1 · Split context + form (§10.2 reference
  // design): an olive context panel welded to a mustard form panel inside one
  // rounded, clipped shell.
  if (s.v0) {
    const ctxBg = s.chips[3 % s.chips.length].bg      // Retro: olive
    const ctxFg = contrastInk(ctxBg)
    const formBg = s.pillBg
    const formFg = contrastInk(formBg)
    // The controls sit on the pill hue, so their ink is the accent only while
    // it stays legible against it — s.pillFg already encodes that fallback.
    const ctlInk = s.pillFg

    const field = (f) => (
      <div key={f.l} style={col('6px')}>
        <span style={labelStyle(s, '10px', { color: ctlInk, letterSpacing: '0.14em' })}>{f.l}</span>
        <span style={{
          border: `${s.bw} solid ${formFg}`, borderRadius: s.btnR,
          padding: s.mob ? '10px 16px' : '13px 20px',
          fontFamily: s.body, fontSize: s.labelXs, color: ctlInk,
        }}>{f.p}</span>
      </div>
    )

    return (
      <div style={{
        borderRadius: s.radius, overflow: 'hidden', display: 'grid',
        gridTemplateColumns: s.narrow ? '1fr' : '0.62fr 1.38fr',
      }}>
        <div style={{
          position: 'relative', background: ctxBg, color: ctxFg,
          padding: s.mob ? '24px' : '34px', ...col(s.mob ? '18px' : '26px'),
        }}>
          <Grain s={s} opacity={0.22} />
          <span style={row('12px', { position: 'relative' })}>
            <span style={{
              width: 42, height: 42, flex: 'none', borderRadius: '999px', overflow: 'hidden',
            }}><Photo s={s} initialsSize={15} /></span>
            <span style={col('3px')}>
              <span style={{ fontFamily: s.display, fontSize: s.labelXs, letterSpacing: s.dls }}>{s.brand}</span>
              <span style={{ fontFamily: s.body, fontSize: s.eyebrow, opacity: 0.8 }}>{s.kicker}</span>
            </span>
          </span>
          <h2 style={{
            margin: 0, position: 'relative', fontFamily: s.display, fontSize: s.dispSm,
            lineHeight: 1.06, letterSpacing: s.dls,
          }}>{s.title}</h2>
          <div style={col('10px', { position: 'relative' })}>
            {s.formPromises.map((p) => (
              <span key={p} style={row('8px', {
                alignItems: 'flex-start', fontFamily: s.body, fontSize: s.labelXs, lineHeight: 1.4,
              })}>
                <Check size={13} style={{ flex: 'none', marginTop: '2px', color: formBg }} />
                {p}
              </span>
            ))}
          </div>
        </div>

        <div style={{
          position: 'relative', background: formBg, color: formFg,
          padding: s.mob ? '24px' : '34px', ...col(s.mob ? '14px' : '18px'),
        }}>
          <Grain s={s} opacity={0.22} />
          <div style={{
            position: 'relative', display: 'grid',
            gridTemplateColumns: s.mob ? '1fr' : '1fr 1fr', gap: s.mob ? '14px' : '18px',
          }}>
            {s.formFields.map(field)}
          </div>
          <div style={col('6px', { position: 'relative' })}>
            <span style={labelStyle(s, '10px', { color: ctlInk, letterSpacing: '0.14em' })}>Event type</span>
            <div style={row('8px', { flexWrap: 'wrap' })}>
              {s.formTypes.map((t, i) => (
                <span key={t} style={{
                  border: `${s.bw} solid ${formFg}`, borderRadius: s.btnR, padding: '4px 12px',
                  background: i === 0 ? s.ac : 'transparent', color: i === 0 ? s.acFg : formFg,
                  cursor: 'pointer', ...labelStyle(s, s.eyebrow),
                }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={col('6px', { position: 'relative' })}>
            <span style={labelStyle(s, '10px', { color: ctlInk, letterSpacing: '0.14em' })}>Message</span>
            <span style={{
              display: 'block', border: `${s.bw} solid ${formFg}`, borderRadius: s.radiusSm,
              padding: s.mob ? '14px 16px' : '18px 20px', minHeight: s.mob ? '90px' : '110px',
              fontFamily: s.body, fontSize: s.labelXs, color: ctlInk,
            }}>{s.formMessage}</span>
          </div>
          <span style={{
            position: 'relative', ...row('8px', { justifyContent: 'center' }),
            background: s.ac, color: s.acFg, border: `${s.bw} solid ${formFg}`,
            borderRadius: s.btnR, padding: s.mob ? '12px' : '14px', cursor: 'pointer',
            boxShadow: hard(s, ctxBg, 3, 4), ...labelStyle(s, s.labelMd),
          }}>
            {s.formBtn}
            <Asterisk size={15} color={s.acFg} />
          </span>
        </div>
      </div>
    )
  }
  return (
    <div style={col('14px', { maxWidth: '560px', margin: '0 auto', textAlign: 'center' })}>
      <h2 style={{ margin: 0, ...h2Style(s), lineHeight: 1.04 }}>{s.title}</h2>
      <p style={{ margin: '0 0 8px', fontSize: '15px', color: s.muted, lineHeight: 1.6 }}>{s.formPara}</p>
      <input style={inputStyle(s)} placeholder="Your name" readOnly />
      <input style={inputStyle(s)} placeholder="Email" readOnly />
      <textarea rows={3} style={{ ...inputStyle(s), resize: 'none' }} placeholder="Tell me about the event…" readOnly />
      {submit}
    </div>
  )
}

// §10.2 reference design: wordmark and statement to the left of a full-height
// rule, the two link columns and the Book Now pill to its right, the seal
// straddling the divide, and the small print under a hairline.
function Footer({ s }) {
  const linkCols = (
    <div style={row(s.mob ? '30px' : '60px', { alignItems: 'flex-start', flexWrap: 'wrap' })}>
      {s.footerLinks.map((colLinks, i) => (
        <nav key={i} style={col('12px')}>
          {colLinks.map((l) => (
            <a key={l} href="#" style={labelStyle(s, s.labelMd, { color: s.ac })}>{l}</a>
          ))}
        </nav>
      ))}
    </div>
  )

  return (
    <div style={col(s.mob ? '24px' : '34px')}>
      <div style={{
        position: 'relative', display: 'grid',
        gridTemplateColumns: s.narrow ? '1fr' : '1fr 1fr',
        gap: s.mob ? '28px' : s.gGap,
      }}>
        <div style={col(s.mob ? '20px' : '34px', {
          paddingRight: s.narrow ? 0 : s.gGap,
          borderRight: s.narrow ? 'none' : `1px solid ${s.line2}`,
        })}>
          <span style={row('14px')}>
            <GlobeMark size={20} color={s.ac} />
            <span style={labelStyle(s, s.labelMd, { color: s.ac })}>{s.brand}</span>
            <span style={{ height: '1.5px', background: s.ac, flex: 1, maxWidth: '140px' }} />
          </span>
          <h2 style={{
            margin: 0, fontFamily: s.display, fontSize: s.dispSm, lineHeight: 1.06,
            letterSpacing: s.dls, color: s.ac, maxWidth: '14ch',
          }}>{s.footerStatement}</h2>
        </div>

        <div style={col(s.mob ? '20px' : '30px', {
          alignItems: 'flex-start', paddingLeft: s.narrow ? 0 : s.gGap,
        })}>
          {linkCols}
          <BookPill s={s} />
        </div>

        {!s.narrow && (
          <SealBadge s={s} hue={s.chips[0].bg} size={104} tilt={-16}
                     style={{ left: '50%', top: '6%', marginLeft: '-52px', zIndex: 2 }} />
        )}
      </div>

      <span style={{ height: '1px', background: s.line2, width: '100%' }} />

      <div style={row('16px', { justifyContent: 'space-between', flexWrap: 'wrap' })}>
        <span style={labelStyle(s, s.labelMd, { color: s.pillBg })}>{s.copyright}</span>
        <span style={labelStyle(s, s.labelMd, { color: s.pillBg })}>{s.footerCredit}</span>
      </div>
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
  // §10.2 — the media player frame (964:58578) stands on cream rather than the
  // beige page ground, so its beige checkerboard band and cream track cards
  // read against it. Retro's `paper` IS the page background, hence the literal.
  const creamMedia = s.me && s.v0 && s.retro
  return (
    <div style={{
      background: darkMap ? s.mapBg : creamMedia ? '#FBF6EA' : s.bg,
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
