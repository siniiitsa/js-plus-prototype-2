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
  Play, Pause, SkipBack, SkipForward, Check, ChevronLeft, ChevronRight, ChevronsRight,
  ArrowLeft, ArrowRight, ArrowUpRight, Star, Plus, X, Search, MapPin,
  Image as ImageIcon, Youtube, Instagram, Music2,
  Settings, Volume2, Maximize, Bookmark, Link2, Bell,
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
// `glyph` is the §10.2 layout-2 frames' variant of the same pill: an arrow in a
// filled disc instead of the asterisk. The disc sits flush in the pill's right
// end rather than inside its padding, so that inset collapses to the disc's own
// margin and the pill keeps its height.
// `disc` overrides that disc's diameter: the layout-2 header sets the same pill
// twice, small in its nav and large as the hero's own call to action, and only
// the disc changes size between them.
// `discFg` is the arrow inside the disc. It defaults to what every caller
// written before it got — Retro's cream, the flat four's pill ground — and is
// passed only by the calendar's slot list, whose frame stands a cream disc on
// an ink pill and would otherwise draw cream on cream.
function BookPill({ s, label, bg, fg, shadow, full = false, to, ext, glyph = 'star', disc: discSize, discFg, size: sizeProp }) {
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
    const disc = glyph === 'arrow'
    const dia = discSize ?? pick(27, 22, 17)
    return (
      <Tag {...link} style={{
        ...row(pick('10px', '8px', '6.2px')),
        background: bg ?? s.pillBg, color: face,
        padding: disc
          ? pick('4px 4px 4px 18px', '3.5px 3.5px 3.5px 15px', '3px 3px 3px 12px')
          : pick('10px 20px', '8px 16px', '6.2px 12.4px'),
        borderRadius: s.btnR, cursor: 'pointer',
        boxShadow: scale === 'small' ? hard(s, block, 1.9, 2.5) : hard(s, block, 3, 4),
        // The type is one of the scaled dimensions: it was the only one left on
        // label-md, which made the tablet pill's type *smaller* than the
        // desktop one's even though every other dimension was bigger.
        //
        // `size` overrides it, and the 768 header master is why: Figma ramped
        // `size/label-sm` down for the narrow frames (20 → 16) while leaving
        // every *box* dimension at the desktop component's own numbers, so a
        // tablet pill wants the full-scale box with the desktop canvas's type.
        // Additive — `glyph`/`disc`'s precedent — so the callers written before
        // it, and the `full` scale the 390 pricing frame asks for, are
        // untouched.
        ...labelStyle(s, sizeProp ?? pick('20px', undefined, '12.4px')),
      }}>
        {text}
        {disc ? (
          <span style={{
            width: dia, height: dia, borderRadius: '999px', flex: 'none',
            background: face, color: discFg ?? (s.retro ? '#FBF6EA' : (bg ?? s.pillBg)),
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}><ArrowRight size={Math.round(dia * 0.6)} /></span>
        ) : <Asterisk size={pick(20, 16, 12.4)} color={face} />}
      </Tag>
    )
  }
  // The flat four honour `bg`/`fg` too, defaulting to the accent pair. They
  // used to ignore both, which is fine for a pill on the page ground and wrong
  // for one standing on a card: a caller passes them precisely because the
  // ground under the pill is not the page's, and on Pop — whose T.tags[1] IS
  // the accent — the pricing deck's third card already drew an accent pill on
  // an accent card with only its type showing.
  return (
    <Tag {...link} style={{
      ...row('8px'), background: bg ?? s.ac, color: fg ?? s.acFg, fontSize: '10px', fontWeight: 700,
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
// once the page is live. `style` is spread last, for the layout-2 header, whose
// frame sets this link in the label face beside a wordmark rather than in the
// flat templates' tracked-out bold.
function ListenLink({ s, color, to, style }) {
  const Tag = s.live && to ? 'a' : 'span'
  const link = s.live && to ? { href: `#${to}` } : null
  return (
    <Tag {...link} style={{
      fontSize: '10px', fontWeight: 700, letterSpacing: '1.2px',
      textTransform: 'uppercase', color: color || s.tx, cursor: 'pointer', whiteSpace: 'nowrap',
      ...style,
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

// `radius` overrides the chip's corner. The Tags component is a pill everywhere
// it had been dropped in before — hence the `s.btnR` default, which leaves every
// caller written before this untouched (`Pager`'s `idle`, `BookPill`'s `glyph`
// precedent) — but the layout-3 header's frame drops the same component in at
// `radius/chip` 8, which on a 26px chip reads as a rounded rectangle and not a
// pill. It is the component's own token; only that instance states it.
//
// `size` is the same shape of override, added for the *tags* section's layout 3,
// whose three masters ramp `size/label-xs` 20/14/12 where `s.labelXs` is a flat
// 14 at every width. It reaches the Retro branch alone: the flat templates' 9px
// tracked-out caps are a design constant, and on a flat page the header's chips
// — the same component, passed no `size` — would otherwise stand at 9 beside a
// tags row at 16.4. Every earlier caller passes nothing and keeps `s.labelXs`.
function TagChips({ s, justify = 'flex-start', radius, size }) {
  if (s.showTags !== 'show') return null
  // §10.2 sets the chips in the body face at label-xs, sentence case — not the
  // tracked-out caps the flat templates use.
  const chip = s.retro
    ? { fontFamily: s.body, fontSize: size || s.labelXs, lineHeight: 1.26, padding: '5px 11px' }
    : {
        fontSize: '9px', fontWeight: 700, letterSpacing: '1px',
        textTransform: 'uppercase', padding: '5px 11px',
      }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: justify }}>
      {s.chips.map((c, i) => (
        <span key={i} style={{
          background: c.bg, color: c.fg, borderRadius: radius ?? s.btnR, whiteSpace: 'nowrap', ...chip,
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
// `ink` is the initials' colour, defaulting to `s.muted` — additive, `Pager`'s
// `idle` precedent, so every caller written before it is untouched. A section
// standing on its own ground needs it: `muted` is rgba(tx, .64) computed
// against the PAGE (the repertoire's lesson), so on a palette whose text colour
// is also the sheet's the placeholder came back invisible.
function Photo({ s, style, initialsSize = 44, backdrop = false, avatar = false, src, ink }) {
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
      <span style={{ fontFamily: s.display, fontSize: `${initialsSize}px`, color: ink ?? s.muted, letterSpacing: s.dls }}>
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

// v1 — Header layout 2 · Feature spread (Figma 964:64637)
//
// The one header that is a spread rather than a picture: a tilted photograph in
// a cream mount on the left, its rail carrying the globe and the location the
// long way up; the identity block on the right over two bordered sub-cards. The
// nav rides above both — links in a pill, the wordmark centred, Listen and Book
// Now on the right — and a checkerboard runs off the section's floor with the
// seal caught on the mount's bottom corner.
//
// Desktop numbers are the 1440 frame × 0.82 (§5.5). The frame lays its nav out
// absolutely over a 144px top inset; here it is in flow, because the root's own
// padding already stands where that inset does. The 768 (`984:34438`) and 390
// (`984:34636`) masters lead with the photograph instead of the identity block,
// and both hand the links to NavMenu — the way every Retro header collapses
// below desktop, and for the reason the nav's own comment gives.
function HeaderV1({ s }) {
  const olive = (s.retro && s.chips[3]?.bg) || s.line2
  const mustard = s.pillBg
  // Three creams, all literal under Retro, whose `paper` IS the page ground:
  // the mount is a shade deeper than the sub-card (Figma tag/6/text vs box/1).
  const mount = s.retro ? '#F3E3C8' : s.paper
  const cream = s.retro ? '#FAECD5' : s.paper
  const ink = s.retro ? '#111111' : s.tx
  // The 768 (`984:34438`) and 390 (`984:34636`) masters are the *desktop*
  // component at its own numbers: Figma ramped the type variables down and left
  // every box dimension unscaled, so the narrow branches below read those two
  // frames verbatim where the desktop branch reads the 1440 one × 0.82. That is
  // why a padding here can be larger at 768 than at 1180 and still be right.
  const nar = s.narrow
  const tab = isTablet(s)
  // The sub-card turns on its side at both narrow widths — a photograph beside
  // its two lines rather than above them — so the whole card is a different
  // shape, not a smaller one.
  const card = {
    overflow: 'hidden',
    ...(nar
      ? {
          width: '100%', borderRadius: '30px', padding: '28px 26px',
          border: `3px solid ${olive}`, ...row('20px'),
        }
      : {
          flex: 1, minWidth: 0, borderRadius: '25px', padding: '23px 21px',
          border: `2.5px solid ${olive}`, ...col('0', { justifyContent: 'space-between' }),
        }),
  }
  const cardTitle = (t, colour) => (
    <span style={{
      fontFamily: s.display, fontSize: nar ? '24px' : '20px', lineHeight: 1.1,
      letterSpacing: s.dls, color: colour, maxWidth: nar ? '155px' : '127px',
    }}>{t}</span>
  )
  const cardBody = (t, colour) => (
    <span style={{ fontFamily: s.body, fontSize: nar ? '12px' : '10px', lineHeight: 1.4, color: colour }}>{t}</span>
  )
  // The text column is a flex child only in the narrow card, where it shares a
  // row with the photograph; stacked, it is the whole width already.
  const cardText = (a, b) => (
    <div style={col(nar ? '8px' : '7px', {
      alignItems: 'flex-start', ...(nar ? { flex: 1, minWidth: 0 } : null),
    })}>{a}{b}</div>
  )

  // The links pill and the burger stand in the same bordered capsule: the 390
  // master draws the burger inside the very pill the 768 one fills with links,
  // so one wrapper serves both and only its contents change.
  const navCapsule = (kids) => (
    <nav style={{
      background: s.bg, border: `1px solid ${olive}`, borderRadius: '999px',
      padding: nar ? '8px 18px' : '7px 15px', minWidth: 0,
      ...row(nar ? '18px' : '15px', { flexWrap: 'wrap' }),
    }}>{kids}</nav>
  )

  const nav = (
    // The frame floats its nav 30px from the frame's own top, well above the
    // 144px inset the spread starts at — and the root's padding is the only
    // thing standing there for us, so the bar rises out of it rather than
    // sitting on it. `padY` is a string, so this reads 38 − 80 = −42 on the
    // 1180 canvas. The two narrow masters float it at 20 + their own 16 / 10 of
    // padding, which is 36 at 768 — the same 38 within rounding — and 18 at
    // 390, where the whole bar sits much higher up the page.
    <div style={row(nar ? '16px' : '13px', {
      width: '100%', marginTop: `calc(${s.mob ? '18px' : '38px'} - ${s.padY})`,
    })}>
      {/* The 768 master fills the capsule with links and the 390 one with the
          burger — but its three links are the *component's* default, the bio's
          five-chip rule, and `navLinks` is the artist's page: the seeded eleven
          sections give nine, which at the master's own 16px comes to 765px of
          type inside a 688px canvas. Even the harness's six overflow it. So the
          burger holds at 768 as well, which is also what the other five Retro
          headers do below desktop; what the master settles is the capsule the
          burger stands in, and everything else in the bar. */}
      {s.narrow
        ? navCapsule(<NavMenu s={s} color={ink} />)
        : navCapsule(s.navLinks.map((l) => (
            <a key={l.label} href={navHref(s, l.to)}
               style={labelStyle(s, '13px', { color: s.ac, cursor: 'pointer' })}>{l.label}</a>
          )))}
      <span style={{ flex: 1 }} />
      {/* The masters emit `size/label-lg, 24px` here, which is the component's
          default and not either instance's: measured off the renders' own cap
          bands and set widths, 768 draws the wordmark at the desktop canvas's
          own 20 and 390 a register under it. The frames' face is ~0.80 of
          Anton's set width, so widths only compare once that is divided out —
          cap height is the invariant to size against. */}
      <span style={labelStyle(s, s.mob ? '17px' : '20px', { color: ink })}>{s.brand}</span>
      <span style={{ flex: 1 }} />
      <span style={row(nar ? '12px' : '10px', { flex: 'none' })}>
        {!s.mob && (
          <ListenLink s={s} to={s.listenTo} style={labelStyle(s, tab ? '16px' : '13px', { color: ink })} />
        )}
        {/* 768 takes BookPill's own tablet scale; 390's master draws it at
            × 0.75 of that, where the `small` scale — cut for the *layout-1*
            390 header — is × 0.62, so only the disc has to be named. */}
        <BookPill s={s} to={s.bookTo} glyph="arrow"
                  size={tab ? '16px' : undefined} disc={s.mob ? 21 : undefined} />
      </span>
    </div>
  )

  const photoCard = (
    <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
      <div style={{
        position: 'relative', height: '100%', overflow: 'hidden',
        background: mount, borderRadius: nar ? '30px' : '25px', boxShadow: soft(s),
        transform: tilt(s, 2),
        padding: tab ? '20px 0 20px 20px' : s.mob ? '10px 0 10px 10px' : '16px 0 16px 16px',
        ...row('0', { alignItems: 'stretch' }),
      }}>
        <div style={{ flex: 1, minWidth: 0, borderRadius: nar ? '11px' : '9px', overflow: 'hidden' }}>
          <Photo s={s} initialsSize={72} />
        </div>
        {/* The mount's rail: the same globe-over-vertical-location column the
            layout-1 bio's polaroid carries, in the frame's olive. 768 pins it at
            90; 390 lets it take its content's width, which is the globe's. It
            clips, because `s.location` is the artist's and the 390 card is only
            206 tall — the frame's own rail carries `overflow-clip` for the same
            reason. */}
        <div style={col('0', {
          width: tab ? '90px' : s.mob ? undefined : '74px', flex: 'none',
          padding: nar ? '6px 12px' : '5px 10px', overflow: 'hidden',
          alignItems: 'center', justifyContent: 'space-between',
        })}>
          <div style={col(nar ? '10px' : '8px', { alignItems: 'center', flex: 'none' })}>
            <span style={{ transform: 'rotate(-90deg)' }}><GlobeMark size={nar ? 27 : 22} color={olive} /></span>
            {/* vertical-rl reads top-down; the frame's label runs the other way.
                Sized off the two renders' own set widths rather than off the
                emitted `size/label-md`: the frames' face runs ~0.76 of Anton's
                width, so transcribing its 20 would set this line a third longer
                than the frame draws it — and at 390 that is a third of a rail
                only 169 tall. */}
            <span style={labelStyle(s, tab ? '17px' : '16px', {
              color: olive, writingMode: 'vertical-rl', transform: 'rotate(180deg)',
            })}>{s.location}</span>
          </div>
          {/* The rule is the one thing in the rail that is *not* the desktop
              component's number at 390: the card is 206 tall there, so the frame
              cuts 191 down to 37. It is also the only part of the rail that can
              afford to give way, so it is the one that shrinks — `s.location` is
              the artist's, and a long one would otherwise push the rule out of
              the clip and leave the rail looking unfinished. */}
          <span style={{
            width: '2px', height: tab ? '191px' : s.mob ? '37px' : '157px',
            background: olive, flex: s.mob ? '0 1 auto' : 'none', minHeight: 0,
          }} />
        </div>
        <Grain s={s} exact blend="screen" opacity={0.5} radius={nar ? '30px' : '25px'} />
      </div>
      {/* The 1440 frame hangs the seal off the mount's bottom-*left* corner; both
          narrow masters move it to the bottom-right and drop it half clear of the
          edge. It is a disc, so its rotation adds nothing to its box (the
          rotated-bounding-box rule is Figma's metadata, not the render), and at
          both widths it lands inside the root's padding. */}
      <SealBadge s={s} hue={(s.retro && s.chips[4]?.bg) || s.ac} tilt={32.38}
                 size={tab ? 125 : s.mob ? 85 : 103}
                 style={nar
                   ? { right: tab ? '0px' : '13px', bottom: tab ? '-58px' : '-42px' }
                   : { left: '-21px', bottom: '-13px' }} />
    </div>
  )

  const identity = (
    <div style={col(nar ? '18px' : '15px', { alignItems: 'flex-start' })}>
      <span style={{
        border: `1px solid ${olive}`, borderRadius: '999px',
        padding: nar ? '6px 12px' : '5px 10px',
        fontFamily: s.body, fontSize: nar ? '12px' : '10px', lineHeight: 1.4,
        color: s.ac, whiteSpace: 'nowrap',
      }}>● Available for bookings</span>
      {/* 768 sets the hero at the canvas's own `h1`, which is the frame's 59.5
          to within half a pixel; 390 sets it a register smaller than that, at
          `dispLg`. Measured off both renders' cap bands, not off the emitted
          `size/display-lg`, whose 96 is the component's default. */}
      <Title s={s} size={tab ? s.h1 : s.dispLg} lh={0.89} inline
             twoTone toneA={mustard} toneB={s.ac} />
      <p style={{
        margin: 0, fontFamily: s.body, fontSize: nar ? '16px' : '13px', lineHeight: 1.5,
        color: s.ac, width: '100%',
      }}>{s.subtitle}</p>
      {/* Both narrow masters draw this pill at the *same* full-scale box the
          768 one does — `full` is what buys that at 390, where BookPill would
          otherwise take its `small` scale and hang a 46px disc off a pill
          padded for a 17px one. */}
      <BookPill s={s} to={s.bookTo} label="Enquire about a date" glyph="arrow"
                disc={nar ? 46 : 38} full={s.mob} size={nar ? '16px' : undefined}
                bg={s.ac} fg={mustard} shadow={mustard} />
    </div>
  )

  const faceCard = (
    <div style={{ ...card, background: cream }}>
      <div style={{
        width: '88px', height: '88px', flex: 'none', borderRadius: nar ? '20px' : '16px',
        border: `${nar ? '3px' : '2.5px'} solid ${olive}`, overflow: 'hidden',
      }}>
        <Photo s={s} avatar initialsSize={34} />
      </div>
      {cardText(
        cardTitle('The face of the act', mustard),
        cardBody("Same person you'll meet on the night. Performing since 2021.", s.ac),
      )}
    </div>
  )
  const placeCard = (
    <div style={{ ...card, background: mustard }}>
      <div style={{
        width: nar ? '88px' : '72px', height: nar ? '88px' : '72px', flex: 'none',
        borderRadius: nar ? '20px' : '16px', background: s.ac,
        color: mustard, ...row('0', { justifyContent: 'center' }),
      }}><MapPin size={nar ? 46 : 38} /></div>
      {cardText(
        cardTitle(s.location, s.ac),
        cardBody('Available across the UK · 120 mi standard travel radius.', ink),
      )}
    </div>
  )
  // Side by side on the 1180 canvas, stacked on both narrow ones — where each
  // card has turned on its side, so the pair reads as two rows either way.
  const subCards = nar ? (
    <div style={col('16px', { width: '100%' })}>{faceCard}{placeCard}</div>
  ) : (
    <div style={row('13px', { flex: 1, minHeight: 0, alignItems: 'stretch', width: '100%' })}>
      {faceCard}{placeCard}
    </div>
  )

  // The root's own gap is the one between the floated nav and the spread. The
  // frames set the spread's top as page padding instead (100 at 768, 90 at
  // 390), so what lands it there for us is this gap plus the nav's height.
  return (
    <div style={{ position: 'relative', ...col(s.mob ? '36px' : tab ? '29px' : '45px') }}>
      {nav}
      {s.mob ? (
        // 390 is one column throughout, and the photograph leads it — the
        // master puts the mount above the name, where the fallback this
        // replaces had it between the name and the cards.
        <div style={col('36px')}>
          <div style={{ height: '206px', display: 'flex' }}>{photoCard}</div>
          <div style={col('30px')}>
            {identity}
            {subCards}
          </div>
        </div>
      ) : tab ? (
        // 768 runs the mount full width and sets the name beside the cards
        // under it, centred on each other — the desktop composition turned
        // through ninety degrees rather than narrowed.
        <div style={col('56px')}>
          <div style={{ height: '450px', display: 'flex' }}>{photoCard}</div>
          <div style={row('60px', { alignItems: 'center' })}>
            <div style={{ flex: 1, minWidth: 0 }}>{identity}</div>
            <div style={{ flex: 1, minWidth: 0 }}>{subCards}</div>
          </div>
        </div>
      ) : (
        <div style={row('46px', { height: '540px', alignItems: 'stretch' })}>
          {photoCard}
          <div style={col('49px', { flex: 1, minWidth: 0 })}>
            {identity}
            {subCards}
          </div>
        </div>
      )}
      {/* Two rows of the frame's 11.803px checker, run off the section's own
          edges rather than the column's. `cell` is the repeating *tile*, which
          is two squares wide — the desktop fit read it as the square and drew
          four 5px rows where all three frames draw two of 11.8 (× 0.82 = 9.7 on
          the 1180 canvas), so the height goes with it and Checkerboard's own
          default — one tile — is now what states it. */}
      <Checkerboard s={s} cell={nar ? 23.6 : 19.4} colour={ink} style={{
        position: 'absolute', width: `calc(100% + ${s.padX} + ${s.padX})`,
        ...bleedTo(s, 'bottom'), right: undefined,
      }} />
    </div>
  )
}

// v2 — Header layout 3 · Inset Hero
// (Figma 964:68622 desktop, 977:22532 tablet, 982:9583 mobile)
//
// The whole section is a mustard sheet with one rust-ruled photograph inset in
// it: the nav rides the card's own top edge, the identity block stands on its
// floor over the checker ribbon, and a tilted polaroid of the artist sits in the
// bottom-right corner. It replaces the invented "Gradient stage · Colour wash",
// the way layout 2 replaced the invented "Framed" — `NVAR.header` is 6 under
// Retro, so this is a refit of an existing slot and no bump is needed;
// `HEADER_NAMES[2]` and the README's list are renamed with it.
//
// Three things this frame settles that the two before it did not:
//
// - **The mustard is the section's own sheet, not the page ground.** Every
//   render's margin samples `#D8A227` where the layout-3 page's ground below the
//   header samples Retro's beige — so this is the repertoire's bleed, written
//   out here (`margin: calc(-1 * padY) calc(-1 * padX)`) rather than widening the
//   root's `bleed` flag, which stays layout 1's. The sheet's own inset re-adds
//   `s.surplus` so the card keeps bleeding on a window wider than the canvas
//   while its *content* stays on the page's measure — HeaderV0's rule.
// - **Figma states this card's padding including its stroke.** The 1440 card's
//   top inset is 16 and its nav pads 16, and the pill's top edge measures 52 in
//   the render against the card's outer 20 — 20 + 16 + 16, with the 5px rule
//   inside the 16 and not below it. So every inset here is `calc(frame − bw)`,
//   the repertoire's rule taken rather than left (this branch writes all three
//   widths at once, so there is no signed-off half carrying the drift).
// - **There is no seal and no grain on the sheet.** The frame draws neither
//   (a flat-patch scan of all three margins comes back stddev 0), so `showBadge`
//   reaches this layout no more than `FIELDS.media.soundcloud` reaches layout 2.
//   The one texture is over the polaroid, screen-blended, as layout 2's mount.
//
// Desktop is the 1440 frame × 0.82 and both narrow masters are verbatim, so the
// ×0.82 is one `z` inside `u()` (the media player's rule) — and tablet is the
// desktop composition at the desktop component's own numbers with only the type
// ramped, the header's own layout-2 lesson holding for a third master. **Only
// 390 reflows**: the polaroid leaves the corner for a centred row under the
// checker, Listen is dropped, and the card's radius halves.
function HeaderV2({ s }) {
  const desk = !s.narrow
  const tab = isTablet(s)
  const z = desk ? 0.82 : 1
  const u = (n) => `${+(n * z).toFixed(2)}px`
  const mustard = s.pillBg
  const olive = (s.retro && s.chips[3]?.bg) || s.line2
  // sem/text/2 — the cream every label on the photograph is set in; sem/tag/3/bg
  // is the polaroid's ink. Both literal under Retro, whose `paper` IS the page
  // ground and is what the checker ribbon takes (sem/media, #EAD7B8 exactly).
  const cream = s.retro ? '#FBF6EA' : s.paper
  const ink = s.retro ? '#111111' : s.tx
  const bw = u(5)                                     // border/heavy, 5 at all three
  // `get_variable_defs` on each master, not the emitted CSS — which prints the
  // desktop default at all three widths. `size/list` goes back *up* at 390
  // (16 → 12 → 13), the repertoire's and the pricing deck's non-monotonic case
  // for a third time, and again with no column-width explanation.
  const T = {
    labelLg: desk ? u(24) : tab ? '16px' : '14px',    // the wordmark
    labelSm: desk ? u(16) : tab ? '13px' : '12px',    // nav, Listen, Book Now
    list: desk ? u(16) : tab ? '12px' : '13px',       // location, polaroid name
    disp: desk ? u(96) : tab ? '60px' : '40px',       // the hero
    chip: desk ? u(12) : '11px',                      // the polaroid's sub
  }

  // The links pill and the burger stand in the same bordered capsule, layout 2's
  // arrangement — and here the 390 master draws it literally, putting the burger
  // inside the very pill the other two fill with links.
  //
  // The 768 master draws links too, and is not followed for layout 2's reason:
  // its three are the component's default where `navLinks` is the artist's page,
  // and the seeded nine come to more type than the capsule's share of a 684px
  // bar. The burger therefore holds at 768, as it does in all six Retro headers.
  const capsule = (
    <nav style={{
      // This rule is *not* inside its padding, where the card's 5px one is: the
      // 1440 render puts the pill's outer edge at 51.5 against a content top of
      // 52 and its height at 35.5 against a 33.6 inset box. Two nodes, two
      // stroke alignments — measure the box rather than carrying the rule down.
      background: mustard, border: `${u(1)} solid ${olive}`, borderRadius: '999px',
      padding: `${u(8)} ${u(18)}`, minWidth: 0,
      ...row(u(18), { flexWrap: 'wrap', alignItems: 'flex-start' }),
    }}>
      {desk
        ? s.navLinks.map((l) => (
            <a key={l.label} href={navHref(s, l.to)}
               style={labelStyle(s, T.labelSm, { color: s.ac, cursor: 'pointer' })}>{l.label}</a>
          ))
        : <NavMenu s={s} color={cream} />}
    </nav>
  )

  // Four flex children either side of the wordmark, exactly as the frame lays
  // the bar out. The capsule's group is `1 1 auto` rather than the frame's
  // `1 0 0`: past three links it has to be allowed to run past its quarter of
  // the bar, and the two spacers are what give — the wordmark's centring is the
  // thing that yields, not the artist's own section names.
  const nav = (
    <div style={row(u(16), {
      width: '100%', padding: `${desk || tab ? u(16) : '10px'} 0`, position: 'relative',
    })}>
      <div style={row(0, { flex: '1 1 auto', minWidth: 0 })}>{capsule}</div>
      <span style={{ flex: '1 1 0' }} />
      <span style={labelStyle(s, T.labelLg, { color: cream })}>{s.brand}</span>
      <span style={{ flex: '1 1 0' }} />
      <span style={row(u(12), { flex: 'none' })}>
        {/* The 390 master drops Listen; the other two keep it. */}
        {!s.mob && (
          <ListenLink s={s} to={s.listenTo} style={labelStyle(s, T.labelSm, { color: cream })} />
        )}
        {/* The frame's pill is BookPill's own full-scale box at all three widths
            — 4.267/17.921 padding, a 27.6 disc — which is the `full` scale to
            within a rounding, so only 390 has to opt back up to it (the pricing
            and calendar frames' case). Desktop takes `mid`, which is that box
            × 0.82. Its label is `size/label-sm`, where the automatic pick would
            draw 20px at 768 against the master's 13. */}
        <BookPill s={s} to={s.bookTo} glyph="arrow" full={s.mob} size={T.labelSm} />
      </span>
    </div>
  )

  const locationLine = (
    <span style={row(u(8))}>
      {/* radius/chip 8 on a 14px square — a rounded block, not the ring
          LocationLine draws for the flat templates. */}
      <span style={{
        width: u(14), height: u(14), borderRadius: u(8), background: s.ac, flex: 'none',
      }} />
      <span style={{
        fontFamily: s.display, fontSize: T.list, lineHeight: 1.2,
        letterSpacing: s.dls, color: cream,
      }}>{s.location}</span>
    </span>
  )

  // The identity column. `justifyContent: flex-end` is the master's own — on the
  // 390 one it stands the block on the floor of a stated 568.125 band, which is
  // the photograph showing above it. That number is a `minHeight` here rather
  // than a height: the frame clips what overruns it and a longer name or a
  // seventh chip should grow the card instead (the media player's division-target
  // rule). The 700.74 the tags carry at every width is a leaked desktop measure
  // that produces nothing — six chips run 497 inside it at 1440 and the parent
  // clips it at 768 — so it is dropped, not honoured (the bio's rule, with the
  // opposite verdict to the credit row's).
  const stack = (
    <div style={col(u(30), {
      alignItems: 'flex-start', justifyContent: 'flex-end', width: '100%', overflow: 'hidden',
      ...(s.mob ? { minHeight: '568.13px' } : null),
    })}>
      <div style={col(u(12), { alignItems: 'flex-start', width: '100%' })}>
        {locationLine}
        <Title s={s} size={T.disp} lh={0.89} color={cream} inline />
      </div>
      <TagChips s={s} radius={u(8)} />
      {/* Two rows of the frame's 11.803 square — `cell` is the repeating tile,
          which is two of them (the header's own layout-2 fix) — in `sem/media`,
          which is Retro's paper exactly. */}
      <Checkerboard s={s} cell={desk ? 19.36 : 23.61} colour={s.paper} />
    </div>
  )

  // The polaroid, and the one place `avatar` reaches this layout: the card in
  // the corner is the artist where the sheet behind it is the scene, the
  // header's own `image`/`avatar` split. Its two lines are `brand` and `kicker`
  // — `InsetCard`'s pair, with the globe in place of the thumbnail — so the
  // frame's "Performing since 2021" is the artist's own strapline rather than a
  // literal (the video section's sort-the-copy rule; nothing here is a claim).
  //
  // The wrapper is the *rotated bounding box* the frame states, with the card
  // centred in it, so the tilt overhangs into the wrapper rather than into the
  // card's padding — the one place a rotated group's inflated metadata is the
  // number to take rather than the one to divide out.
  const polW = s.mob ? 279.644 : 242.292
  const polH = s.mob ? 253.45 : 250.575
  const cardW = s.mob ? 262.463 : 225
  const polaroid = (
    <div style={{
      width: u(polW), height: u(polH), flex: 'none',
      ...row(0, { justifyContent: 'center' }),
    }}>
      <div style={{
        position: 'relative', width: u(cardW), height: u(234), flex: 'none',
        background: cream, borderRadius: u(6.25), overflow: 'hidden',
        transform: tilt(s, 4.4),
        // The frame's own card shadow at the polaroid's scale — a quarter of
        // `soft()`'s 4/4/9, which is the same effect on a full-size card.
        boxShadow: s.retro ? `${u(1.25)} ${u(1.25)} ${u(2.81)} rgba(0,0,0,.16)` : 'none',
        padding: `${u(6.25)} ${u(6.25)} 0`,
        ...col(0, { alignItems: 'center', justifyContent: 'center' }),
      }}>
        <div style={{
          flex: 1, minHeight: 0, width: '100%', borderRadius: u(3.44), overflow: 'hidden',
        }}>
          {/* An invented ramp, and only ever seen on the flat four or mid-edit:
              the frame is a photograph and Retro seeds one (the gallery's
              placeholder-ramp rule). */}
          <Photo s={s} avatar initialsSize={Math.round(cardW * z * 0.22)} ink={s.ac} />
        </div>
        <div style={col(0, {
          alignItems: 'center', width: '100%', padding: `${u(8.87)} ${u(3.75)}`,
        })}>
          <span style={row(u(3.13))}>
            <span style={{ display: 'flex', transform: 'rotate(-90deg)' }}>
              <GlobeMark size={+(8.552 * z).toFixed(2)} color={ink} strokeWidth={1.8} />
            </span>
            <span style={{
              fontFamily: s.display, fontSize: T.list, lineHeight: 1.2,
              letterSpacing: s.dls, color: ink, whiteSpace: 'nowrap',
            }}>{s.brand}</span>
          </span>
          <span style={{
            fontFamily: s.body, fontWeight: 700, fontSize: T.chip, lineHeight: 1,
            letterSpacing: '-0.06em', color: s.ac, whiteSpace: 'nowrap',
          }}>{s.kicker}</span>
        </div>
        <Grain s={s} exact blend="screen" opacity={0.5} radius={u(6.25)} />
      </div>
    </div>
  )

  // 768 keeps the desktop row; only 390 stacks — the pass's default shape by
  // now, and the metadata's own tell (two children under one another at x 0).
  const body = s.mob ? (
    <div style={col('24px', { alignItems: 'center', width: '100%' })}>
      {stack}
      {polaroid}
    </div>
  ) : (
    <div style={row(u(24), { alignItems: 'flex-end', width: '100%', overflow: 'hidden' })}>
      <div style={{ flex: 1, minWidth: 0 }}>{stack}</div>
      {polaroid}
    </div>
  )

  // The card's height is the frame's own — 860 inside a 900 instance at 1440,
  // 1004 inside 1024 at 768 — and 390 states none, its card being content-tall.
  // It is a `minHeight` for the reason the 568 band is one.
  const inset = desk ? 20 : 10
  const padX = Math.max(0, (desk || tab ? 32 : 10) - 5)
  const padTop = Math.max(0, (desk || tab ? 16 : 0) - 5)
  return (
    <div style={{
      background: mustard, padding: u(inset),
      margin: `calc(-1 * ${s.padY}) calc(-1 * ${s.padX})`,
    }}>
      <div style={{
        position: 'relative', overflow: 'hidden',
        border: `${bw} solid ${s.ac}`,
        borderRadius: desk ? u(60) : tab ? '60px' : '30px',
        minHeight: desk ? u(860) : tab ? '1004px' : undefined,
        paddingTop: u(padTop),
        paddingBottom: u(padX),
        paddingLeft: `calc(${u(padX)} + ${s.surplus})`,
        paddingRight: `calc(${u(padX)} + ${s.surplus})`,
        ...col(0, { justifyContent: 'space-between' }),
      }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0 }}>
          <Photo s={s} backdrop />
        </div>
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: SCRIM.hero }} />
        {nav}
        <div style={{ position: 'relative', width: '100%' }}>{body}</div>
      </div>
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

  // v1 — Bio layout 2 · Portrait + sub-cards
  // (Figma 964:64638 · 984:34877 at 768 · 984:34834 at 390)
  //
  // An outlined cream card — eyebrow and prose at its head, the tag chips and a
  // credit line over the Book Now pill at its foot, the frame's own daylight
  // between them — beside a fixed portrait card whose photograph carries a
  // caption in its floor. Desktop numbers are the 1440 frame × 0.82 (§5.5);
  // the section's own 56px inset is dropped, because the page root's padding
  // stands in for it. Both narrow masters stack the two cards — the text card
  // first, which is the reverse of the fallback this branch used to carry — and
  // are the desktop component at its *own* box numbers, so a padding here is
  // larger at 768 than on the 1180 canvas and still right.
  //
  // What ramps is the type, and it ramps **by face**, not by one factor. The
  // Anton labels drop hard (label-lg 24 → 16 → 14, label-sm 16 → 13 → 12) and
  // the chips of the Tags component the frame drops in here drop hardest
  // (15.4 → 11 → 9.5), while Inter's body-sm holds at 12 across all three
  // widths and body-lg gives up a single point (16 → 15). Every one of those is
  // measured off the three renders' own set widths and the caption card's
  // height, because `var(--size/label-lg, 24)` is the *component's* default and
  // both narrow masters emit it unchanged.
  if (s.v1) {
    const nar = s.narrow
    const tab = isTablet(s)
    // Figma box/1 and the portrait card's mount are two different creams, and
    // Retro's `paper` IS the page background — same literals as v0's polaroid.
    const cream = s.retro ? '#FAECD5' : s.paper
    const mount = s.retro ? '#FBF6EA' : s.paper
    const ink = s.retro ? '#111111' : s.paperFg
    // The frame's 648px portrait card. The text card stretches to it on
    // desktop; both narrow masters let it hug its content and state the
    // portrait card's height outright (648 at 768, 362 at 390).
    const cardH = '531px'
    const photoH = tab ? '648px' : '362px'
    const cardR = nar ? '26.25px' : '21px'
    const body = { fontFamily: s.body, fontSize: nar ? '15px' : '13px', lineHeight: 1.5 }

    const photoCard = (
      <div style={{
        position: 'relative', flex: 'none', overflow: 'hidden',
        width: nar ? '100%' : '355px',
        height: nar ? photoH : cardH,
        background: mount, borderRadius: cardR, padding: nar ? '10px' : '8px', boxShadow: soft(s),
        ...col('0', { alignItems: 'stretch' }),
      }}>
        <div style={{
          position: 'relative', flex: 1, minHeight: 0, overflow: 'hidden',
          borderRadius: nar ? '21.44px' : '18px',
          ...col('0', { justifyContent: 'flex-end' }),
        }}>
          <div style={{ position: 'absolute', inset: 0 }}><Photo s={s} initialsSize={54} /></div>
          <div style={{ position: 'relative', padding: nar ? '20px' : '16px' }}>
            <div style={{
              ...row(nar ? '12px' : '10px'), background: cream, color: ink,
              borderRadius: nar ? '9px' : '7px', padding: nar ? '18px 20px' : '15px 16px',
            }}>
              <div style={col(nar ? '4px' : '3px', { flex: 1, minWidth: 0 })}>
                <span style={labelStyle(s, tab ? '16px' : nar ? '14px' : '20px', { whiteSpace: 'normal' })}>{s.brand}</span>
                <span style={{ ...body, fontSize: nar ? '12px' : '10px', lineHeight: 1.4 }}>{s.kicker} · {s.location}</span>
              </div>
              {/* A 36px disc on desktop, where the frame pins its height; both
                  narrow instances let the same box hug its one 12px line, so it
                  is a 36 × 16.8 pill there rather than a smaller circle. */}
              <span style={{
                width: nar ? '36px' : '30px', height: nar ? '16.8px' : '30px',
                borderRadius: '999px', flex: 'none', color: ink,
                background: (s.retro && s.chips[0]?.bg) || s.soft2,
                ...row('0', { justifyContent: 'center' }),
              }}><ChevronsRight size={15} /></span>
            </div>
          </div>
        </div>
        <Grain s={s} exact blend="screen" opacity={0.5} radius={cardR} />
      </div>
    )

    const textCard = (
      <div style={{
        flex: nar ? 'none' : 1, minWidth: 0, background: cream, color: ink,
        border: `1px solid ${ink}`, borderRadius: nar ? '30px' : '25px',
        padding: tab ? '30px' : nar ? '20px' : '25px',
        height: nar ? undefined : cardH,
        ...col(nar ? '18px' : '0', { justifyContent: 'space-between' }),
      }}>
        <div style={col(nar ? '25.5px' : '21px', { alignItems: 'flex-start' })}>
          <span style={labelStyle(s, s.mob ? '12px' : '13px', {
            border: `${nar ? '1.417px' : '1.2px'} solid ${(s.retro && s.chips[3]?.bg) || s.line2}`,
            borderRadius: '999px', padding: nar ? '5.669px 14.174px' : '5px 12px',
          })}>/Featured</span>
          <p style={{ margin: 0, ...body }}>{s.bioP1}</p>
        </div>
        <div style={col(nar ? '10px' : '8px', { padding: s.mob ? '10px 0' : undefined })}>
          {/* The frame drops the Tags section's own chip row in here, at its
              own width — which is what wraps five chips onto two lines. The
              264.4 is the one number the narrow masters leave unchanged; only
              the chips inside it shrink, which is why 768 wraps 3 + 2 where
              390 fits 4 + 1 in the same measure. */}
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            gap: nar ? '6.149px' : '5px',
            maxWidth: nar ? '264.4px' : '217px',
            padding: nar ? '22.19px 0' : '18px 0',
          }}>
            {s.chips.map((c, i) => (
              <span key={i} style={{
                background: c.bg, color: s.retro ? '#FBF6EA' : c.fg,
                borderRadius: nar ? '6.149px' : '5px',
                fontFamily: s.body, fontSize: tab ? '11px' : nar ? '9.5px' : '13px',
                lineHeight: 1.26, padding: nar ? '3.843px 8.455px' : '3px 7px',
                whiteSpace: 'nowrap',
              }}>{c.label}</span>
            ))}
          </div>
          {/* 390 sets the pill under the credit line rather than beside it —
              a column with its own 9.6 gap, not a wrapped row: the master's
              own row still carries the desktop component's 637.5px width, so
              its wrap is a leaked default and the column is the design. */}
          <div style={s.mob
            ? col('9.6px', { alignItems: 'flex-start' })
            : row('16px', { justifyContent: 'space-between', flexWrap: 'wrap' })}>
            {/* The frame's own credit line, two-tone the way it sets it. */}
            <span style={body}>
              <span style={{ color: s.ac }}>Five years of </span>
              rooms read &amp; floors moved
            </span>
            {/* Both masters draw the pill at the *same* full-scale box — 390
                included, which is what `full` buys — and only ramp its type. */}
            <BookPill s={s} to={s.bookTo} glyph="arrow"
                      full={s.mob} size={nar ? (tab ? '13px' : '12px') : undefined} />
          </div>
        </div>
      </div>
    )

    if (nar) return <div style={col(tab ? '30px' : '10px')}>{textCard}{photoCard}</div>
    return <div style={row('25px', { alignItems: 'stretch' })}>{textCard}{photoCard}</div>
  }

  // v2 — Bio layout 3 · Stacked ID card
  // (Figma 964:68631 · 977:22717 at 768 · 982:10013 at 390. The display head
  // above the card is the composed page's own wrapper frame — 964:68626 ·
  // 977:22712 · 982:9763 — not part of the instance; see below.)
  //
  // A cream ID card standing on the beige page: one photograph inset in its
  // head, the artist's name beside a row of stats, a rust rule, the about
  // column with the seal hanging in its left margin, and a mustard rule above
  // the card's floor.
  //
  // ── The head is borrowed, and nothing in it is invented ────────────────
  // The 1440 page wraps this instance and the tags row in a Section carrying
  // one display head, and the bio takes it (LAYOUT-3-PLAN.md, "The composed
  // page"): `FIELDS.bio.heading`'s default *is* the frame's "Reads the room.",
  // and `s.initials` already spells the "KM" of its "KM BIO" eyebrow — v0
  // draws those same two strings as its own flank labels. The head's 30px gap
  // and the 30 between it and the card are the Section's own, at all three
  // widths.
  //
  // ── What the columned five do at our width ─────────────────────────────
  // The instance is drawn 858 wide because the page columns it, and there is
  // no wider master — the main component (432:607) is 858 itself. Both narrow
  // pages give it their page's whole content width (708 and 370), so the
  // design is fluid by its author's hand and the card fills our 1052. **Which
  // parts stretch is not a judgement call: the masters' own flex declarations
  // say.** `flex: 1 0 0` fills — the photograph, the stat block, the prose
  // column, both rules — and `shrink-0`/`max-width` holds at the frame's
  // number: the name's 179 cap, the 188 spacer, every stat column. The cost is
  // trailing air down the right of the head row and a prose measure past
  // anything the masters draw; capping the card at 858 × 0.82 = 704 and
  // centring it would instead put `tags`' chip row and `audio`'s player bar in
  // a 704 box on a 1052 page. Open question 1, settled here for all five.
  //
  // ── The type is read, not measured ─────────────────────────────────────
  // `get_variable_defs` on all three masters: display-lg 96/60/40 (the head,
  // at the page's usual .89 leading), display-sm 40/32/26 (the name),
  // label-lg 24/16/14 (the stat values, Anton), label-xs 20/14/12 (the
  // eyebrow — Inter at 1.26, not the label face), chip 12/11/11 (the small
  // labels) and body-md 14/13/13 (the prose). Every *box* number is the
  // desktop component's own, unscaled at 768 and 390 and × 0.82 at desktop
  // (the header's rule, holding for a fifth section), so the whole branch
  // runs through one `z`.
  //
  // ── The frame's three stats, sorted ────────────────────────────────────
  // The master draws "PERFORMING SINCE: JUNE 2021" and then "CURRENT ROLE: DJ
  // & SELECTOR" *twice* — the third column is the component duplicating the
  // second, not a third fact. "June 2021" is a date the artist never typed, so
  // it goes the way the video section's view count and the pricing deck's
  // rating went; what replaces it is `FIELDS.bio.since`, a new plain-text
  // field with **no** default, so nothing is fabricated and the seat is still
  // reachable (the video section's `image`/`avatar` rule). The duplicate seat
  // takes `location`. Both surviving values — `kicker` and `location` — are
  // the same pair v0 sets in its credit line and v1 in its caption, so layout
  // 3 reads nothing the section did not already print.
  if (s.v2) {
    const desk = !s.narrow
    const tab = isTablet(s)
    const z = desk ? 0.82 : 1
    const u = (v) => `${Math.round(v * z * 10) / 10}px`
    const T = desk
      ? { disp: 96, name: 40, label: 24, chip: 12, body: 14, eyebrow: 20 }
      : tab
        ? { disp: 60, name: 32, label: 16, chip: 11, body: 13, eyebrow: 14 }
        : { disp: 40, name: 26, label: 14, chip: 11, body: 13, eyebrow: 12 }
    // Figma box/1 again — the card is a step lighter than the page, and
    // Retro's `paper` IS the page ground, so it needs the literal v0's
    // polaroid and v1's cards already carry.
    const cream = s.retro ? '#FAECD5' : s.paper
    const ink = s.retro ? '#111111' : s.paperFg
    const pad = u(s.mob ? 10 : 32)
    // Inter Bold at `size/chip`; Figma states its tracking as -6%, so it is
    // written as an em and ramps with the token (the pricing deck's rule).
    const chipType = {
      fontFamily: s.body, fontWeight: 700, fontSize: u(T.chip), lineHeight: 1,
      letterSpacing: '-0.06em', textTransform: 'uppercase',
    }

    // The frame hand-breaks each stat label onto two lines, which is what sets
    // its column's width; the labels are ours to write, so the break is kept
    // as a literal newline rather than left to a measure nothing states.
    const stat = (label, value) => (
      // Every master states 96 on the *column*; it is carried on the row below
      // instead, as a floor. Unwrapped the two are the same picture — the
      // values sit on the 96 box's floor, which is what keeps the head band at
      // the frame's 144 — and wrapped they are not: a second line of 96-tall
      // columns holding our one-line values opens a 58px hole between the rows.
      <div key={label} style={col(u(15), {
        flex: 'none', alignItems: 'flex-start',
      })}>
        <span style={{ ...chipType, whiteSpace: 'pre-line' }}>{label}</span>
        <span style={labelStyle(s, u(T.label), { whiteSpace: 'nowrap' })}>{value}</span>
      </div>
    )
    const stats = [
      s.since ? stat('Performing\nsince:', s.since) : null,
      stat('Current\nrole:', s.kicker),
      stat('Based\nin:', s.location),
    ].filter(Boolean)

    // 390 draws this as a column — the name over the stats, at the same 10 the
    // two wider masters carry as their row gap, and the same 179 cap on the
    // name. It is written as a stack rather than left to `flexWrap`: both
    // blocks are `flex: 1 0 0` in every master, and a zero-basis item never
    // takes a slot in a CSS wrap (the testimonials' rule), so a wrapped row
    // fits them on one line at 390 and overflows the card by 60px.
    const head = (
      <div style={{
        display: 'flex', flexDirection: s.mob ? 'column' : 'row',
        alignItems: s.mob ? 'flex-start' : 'flex-end',
        gap: u(s.mob ? 10 : 40), overflow: 'hidden',
        padding: `${u(24)} ${pad}`,
      }}>
        {/* The master's name frame is `overflow-clip`, and that is *not*
            transcribed: at `leading-none` the line box is exactly 1em, so the
            clip cuts every descender off at the baseline — "Poppy Jaeggy"
            loses four of them. It is inert here anyway, `maxWidth` and
            `wordBreak` already bounding the width, and the master's own two
            names have no descender to show it. */}
        <div style={{
          flex: s.mob ? 'none' : '1 0 0', width: s.mob ? '100%' : undefined,
          minWidth: 0, maxWidth: u(179),
        }}>
          {/* The 179 is the same at all three masters and only wraps the name
              at 1440, where Soulway at 40 just misses it. Fraunces is the
              wider face, so ours may take the second line at 768 as well —
              the artist's name is theirs, and pinning a per-width measure to
              reproduce one string's break would fit the seed, not the field. */}
          <p style={{
            margin: 0, fontFamily: s.display, fontSize: u(T.name), lineHeight: 1,
            letterSpacing: s.dls, color: s.ac, wordBreak: 'break-word',
          }}>{s.brand}</p>
        </div>
        {/* The row wraps, where every master states `whitespace-nowrap` inside
            an `overflow-clip` head. The masters fit three columns because they
            hand-break their *values* to two lines — 57 and 30 wide against our
            one-line 70 and 92 — and our canvases are 20 (768) and 24 (390)
            narrower than the frames besides, so with `since` filled the third
            column ran 7px past the card and "Manchester, UK" lost its "UK".
            The media player's rule: a frame's own squeeze is an artefact once
            it destroys content the artist typed. `rowGap` is the columns' own
            15, and the height belongs to each column rather than the row, or a
            wrapped line would divide it. */}
        <div style={row(u(s.mob ? 52 : 100), {
          flex: s.mob ? 'none' : '1 0 0', width: s.mob ? '100%' : undefined,
          minWidth: 0, color: ink, flexWrap: 'wrap', rowGap: u(15),
          minHeight: u(96), alignItems: 'flex-end', alignContent: 'flex-end',
        })}>{stats}</div>
      </div>
    )

    // The seal hangs in the about band's left margin, 150.4 down and 105.6 in
    // from its top-left corner at 1440 *and* at 768 — the one number both
    // masters agree on to the pixel, which is why it is anchored to the band's
    // top rather than to the card, whose height differs. Its wrapper is the
    // rotated bounding box (173.02 = 125.37 × 1.38 at 32.38°), so the disc is
    // 125.37 and the box below is the disc's own.
    const sealBox = 125.37
    const sealTop = 87.7
    const seal = (
      <SealBadge s={s} hue={s.ac} size={(s.mob ? 62.68 : sealBox) * z} tilt={32.38}
                 ink={s.retro ? '#111111' : undefined}
                 glyph="asterisk"
                 style={s.mob
                   ? { right: u(30.76), top: u(52.51) }
                   : { left: u(42.9), top: u(sealTop) }} />
    )

    const about = (
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: u(40), overflow: 'hidden',
        padding: `${u(24)} ${pad}`, position: 'relative',
        // The band is 248/278 tall in the masters because their prose is 600
        // characters of filler; ours is two paragraphs the artist actually
        // typed, and at this measure that is two lines. The floor is the
        // seal's own bottom edge plus the band's stated 24 — every term
        // transcribed — because the card is `overflow-clip` and would
        // otherwise cut the sticker in half.
        ...(s.mob ? null : { minHeight: u(sealTop + sealBox + 24) }),
      }}>
        {/* Frame 9: an empty 188 × 64 box that reserves the left column the
            seal hangs in. Absent from the 390 sub-component, where the seal
            moves to the photograph. */}
        {!s.mob && <div style={{ width: u(188), height: u(64), flex: 'none' }} />}
        <div style={col(u(12), { flex: '1 0 0', minWidth: 0, color: ink })}>
          <span style={chipType}>[ About ]</span>
          <p style={{ margin: 0, fontFamily: s.body, fontSize: u(T.body), lineHeight: 1.5 }}>{s.bioP1}</p>
          {/* The masters set one long paragraph here; the section has two, and
              `para2` had until now drawn in no layout at all. Emptied, it is
              not rendered rather than printed blank — the testimonials' rule —
              and the column's own 12 is the gap between them. */}
          {s.bioP2 && (
            <p style={{ margin: 0, fontFamily: s.body, fontSize: u(T.body), lineHeight: 1.5 }}>{s.bioP2}</p>
          )}
        </div>
        {!s.mob && seal}
      </div>
    )

    return (
      <div style={col(u(30), { alignItems: 'stretch' })}>
        {/* The wrapper frame's head. Its eyebrow stands on the page ground, so
            it takes the page's own ink rather than the card's. */}
        <div style={col(u(30), { alignItems: 'flex-start' })}>
          <span style={{
            fontFamily: s.body, fontSize: u(T.eyebrow), lineHeight: 1.26,
            textTransform: 'uppercase', color: s.tx,
          }}>{s.initials} Bio</span>
          <h2 style={{
            margin: 0, fontFamily: s.display, fontSize: u(T.disp), lineHeight: 0.89,
            letterSpacing: s.dls, color: s.ac,
          }}>{s.title}</h2>
        </div>
        <div style={{
          background: cream, color: ink, overflow: 'hidden',
          borderRadius: u(s.mob ? 30 : 50), paddingBottom: u(40),
          // The masters outline the card at 1440 and 768 and not at 390. Only
          // Retro follows that absence: `paperOf()` can return the page ground
          // itself, and an unoutlined cream card is then a hole in the page
          // (the booking calendar's lesson), so the flat four keep the rule at
          // every width. The hairline is 1 in all three modes and does not ramp.
          border: (s.mob && s.retro) ? undefined : `1px solid ${ink}`,
          ...col('0', { alignItems: 'stretch' }),
        }}>
          <div style={{ position: 'relative', padding: u(s.mob ? 10 : 30), ...row('0') }}>
            <div style={{
              position: 'relative', flex: '1 0 0', minWidth: 0,
              height: u(s.mob ? 259 : 380), borderRadius: u(30), overflow: 'hidden',
            }}>
              {/* Placeholder sizes are invented — the masters are photographs
                  and Retro seeds them, so this is only seen on the flat four
                  and mid-edit (the gallery's rule). `ink` because the card is
                  its own sheet and `s.muted` is rgba of the *page's* text. */}
              <div style={{ position: 'absolute', inset: 0 }}>
                <Photo s={s} initialsSize={desk ? 64 : tab ? 56 : 40} ink={ink} />
              </div>
              <Grain s={s} exact blend="screen" opacity={0.5} radius={u(30)} />
            </div>
            {s.mob && seal}
          </div>
          {/* 390 sets a 20 gap between the head, the rust rule and the about
              band where the two wider masters run them flush; the mustard rule
              is outside that column in all three, so it stays flush. */}
          <div style={col(u(s.mob ? 20 : 0), { alignItems: 'stretch' })}>
            {head}
            <div style={{ height: u(5), background: s.ac, flex: 'none' }} />
            {about}
          </div>
          {/* The frame's foot rule is the mustard, which is `pillBg` under
              Retro — but `pillBg` is the palette's lightest tag and `paper`
              its lightest colour outright, so on Lime and Grunge the two are
              the same value and the rule vanished into the card (the
              repertoire's lesson). The flat four take `paperLine`, which is
              rgba(ink) and reads on a paper panel whichever way the palette
              runs; the head rule above stays the accent at all five. */}
          <div style={{ height: u(5), background: s.retro ? s.pillBg : s.paperLine, flex: 'none' }} />
        </div>
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
  // rather than start a track with no card on the page. Layouts 1, 2 and 3 all
  // draw the whole list — layout 2 draws it twice, as the fan and as the
  // numbered list beside it, and layout 3 draws that same list on its own.
  // `s.v0` is a prop, not state, so branching on it above the hooks would be
  // the error — branching on it here is not.
  const list = s.v0 || s.v1 || s.v2 ? s.tracks : s.tracks3
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

  // v1 — Media Player layout 2 · Fanned carousel + editorial list (Figma
  // 964:64639)
  //
  // One cream panel on the beige page — the section root keeps the page ground
  // here, unlike layout 1, and only the panel is cream. Left: the display
  // heading, a fanned stack of the tracks leaning out from the middle one, and
  // a pill transport bar carrying the now-playing block. Right: the same tracks
  // again as a numbered list of hue-filled rows under a small counter.
  //
  // The frame composes two instances into one Section — Media Player B ·
  // Fanned carousel (964:64643) and A · Editorial numbered list (964:64644) —
  // so this is one branch, and the *whole* Section is what gets fitted.
  //
  // Desktop numbers are the 1440 frame × 0.82 (§5.5) through `u()`. The frame's
  // own 56/86 inset is dropped, the page root's padding standing in for it, so
  // the panel is the content width (1052) and not the frame's 1089 — which is
  // why the fan is 20px wider than its column and rides into the panel's
  // padding rather than being clipped.
  //
  // The 768 (984:35122) and 390 (984:35396) masters wrap the same two instances
  // and stack them — the heading over the fan over the bar, then the list under
  // all three at the desktop grid's own 50 — and both draw the component at its
  // own unscaled numbers, so `u()` is the identity there. See `z` below.
  if (s.v1) {
    const desk = !s.narrow
    const tab = isTablet(s)
    // The 768 (`984:35122`) and 390 (`984:35396`) masters are the *desktop*
    // component at its own numbers: Figma ramped the type variables down and
    // left every box dimension unscaled. So the scale below is the identity on
    // both narrow canvases where the 1440 frame lands on the 1180 one at
    // × 0.82 — one switch, and the fan's five hand-set card states, the bar's
    // 108, the rows' 64px artwork and every padding here come straight off
    // whichever frame is being drawn.
    const z = desk ? 0.82 : 1
    const u = (v) => `${Math.round(v * z * 10) / 10}px`
    // The fan's cards are centred on the stack, so their x/y are signed
    // offsets from its middle rather than a box position.
    const off = (v) => `calc(50% ${v < 0 ? '-' : '+'} ${Math.abs(Math.round(v * z * 10) / 10)}px)`
    // The panel's own side padding, which the fan bleeds back over below.
    const pad = tab ? 30 : 20

    // The panel is the third cream again — Retro's own `paper` IS the beige
    // page, hence the literal. Under it the ink is near-black, not the
    // section's own text colour on beige.
    const panel = s.retro ? '#FBF6EA' : s.paper
    const ink = s.retro ? '#111111' : s.paperFg
    const n = s.chips.length
    const olive = s.chips[3 % n].bg
    const mustard = s.chips[2 % n].bg
    const rust = s.ac

    // The list's five rows run a three-hue cycle, and each hue carries its own
    // type and outline colour — the frame's pairings, not a contrast rule.
    // The flat templates have no such pairings, so they fall back to one.
    const ROWS = [
      { bg: olive, fg: mustard, line: mustard },
      { bg: mustard, fg: rust, line: olive },
      { bg: rust, fg: mustard, line: mustard },
    ]

    // The fan paints in a lighter register than the list — the same four hues
    // lifted about 7% towards white, which is a decision the frame makes and
    // not one the palette can express, so Retro's are literal (as v0's thrown
    // pink and violet are). The middle card is always the accent.
    const FAN = s.retro
      ? ['#E8B33B', '#6D7040', '#E8B33B', '#8B6AB8']
      : [mustard, olive, mustard, s.chips[0 % n].bg]
    const FEATURED = s.retro ? '#DF5B30' : rust

    // The frame's three card states, at |k| = 0, 1 and 2 from the middle: the
    // width, the height, the artwork's height and the opacity all step. They
    // are read off the frame rather than ramped, because Figma resized these
    // by hand and the steps are not quite even. A sixth or seventh track keeps
    // the outermost state and simply fans further out.
    const CARD = [
      { w: 220, h: 285, art: 188, y: 19.5, op: 1 },
      { w: 202.507, h: 274.792, art: 170.4, y: 27.48, op: 0.82 },
      { w: 185.187, h: 250.551, art: 152.8, y: 42.42, op: 0.64 },
    ]
    // The fan has a fixed set of seats — the middle one and its neighbours out
    // to either side — and the tracks rotate *through* them, wrapping, so that
    // the centre seat always holds the track the player is on. That is what
    // makes it a *fanned carousel* and it is the only mark the composition has
    // room for: picking any card deals the stack round to it.
    //
    // The seats cannot instead be centred on `at` directly. `at` is 0 until a
    // visitor picks, so the fan would open one-sided — every card to the right
    // of the middle — which is not the design at any count.
    //
    // How far apart the seats stand is the one thing the 390 master changes
    // about the fan: it keeps every card at the desktop component's size and
    // tightens only the spread, to ~42 where 768 and 1440 both step 101.5, so
    // the stack there is very nearly all overlap.
    const step = s.mob ? 42 : 101.5
    const seat = Math.floor((s.tracks.length - 1) / 2)
    const anchor = s.live && count ? at : seat
    // The frame pairs the centre card with the bar under it — both name the
    // same track — and live they are the same track by construction, because
    // the centre seat holds `at`. On the canvas they would part company: the
    // shared now-playing block names the track the player is *cued* to, which
    // is the first, so the bar takes the centre seat's title there instead.
    const centre = s.tracks[anchor]
    const nowTitle = s.live || !centre ? now.track : centre.name
    const nowArt = s.live || !centre ? sleeve : (centre.img ?? undefined)

    // Inter Bold at the frame's chip size, tracked in by its own −6%. Both
    // ends of the list's counter row are set in it, and so is the Featured
    // tab on the middle card — this is not the Anton label face. The counter
    // is the only one the frame sets in caps; the tab is title case.
    const chip = (extra) => ({
      fontFamily: s.body, fontWeight: 700, fontSize: u(12), lineHeight: 1,
      letterSpacing: u(-0.72), whiteSpace: 'nowrap', ...extra,
    })
    // Display face, sentence case — the frame sets every title in it.
    const titleType = (size) => ({
      fontFamily: s.display, fontSize: u(size), lineHeight: 1.1, letterSpacing: s.dls,
      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    })
    const subType = { fontFamily: s.body, fontSize: u(12), lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
    // The frame draws the transport as bare glyphs. Live they are buttons, so
    // each takes a square a little larger than its 14px icon — which also
    // brings the group's width back towards the frame's 96.
    const ctl = {
      width: u(20), height: u(20), flex: 'none', cursor: s.live ? 'pointer' : undefined,
      ...row('0', { justifyContent: 'center' }),
    }

    const fan = (
      <div style={{
        // Desktop takes the stack's height off the column; the narrow canvases
        // have no fixed column to divide, so there it is the frame's own — and
        // both masters state the same 468 where the 1440 one states 371.
        position: 'relative', flex: 1, minHeight: desk ? 0 : '468px',
        // Desktop lets the frame's own five ride into the panel's padding,
        // which is cream either way. Everything else clips: a sixth track
        // onwards fans out far enough to cross the gap and paint over the list
        // beside it. The stack is centred, so a clip always takes both sides
        // evenly.
        overflow: desk && s.tracks.length <= CARD.length + 2 ? 'visible' : 'hidden',
        // Both narrow masters run the fan to the panel's own inside edges — the
        // five span 623 of a 648 column at 768, and at 390 the outermost card
        // touches the panel's corner exactly — so the band bleeds back over the
        // padding rather than clipping at the column. Our canvases are 20px
        // (768) and 24px (390) narrower than the frames', so at 390 the outer
        // pair still gives up about twelve pixels; clipping at the column would
        // have taken forty.
        ...(desk ? null : { margin: `0 -${pad}px`, width: `calc(100% + ${pad * 2}px)` }),
      }}>
        {/* `j` is the seat in the fan, `i` the track dealt to it — the two
            part company as soon as the carousel turns. Geometry and hue belong
            to the seat, so the composition holds still and its centre stays
            the accent; only the content rotates. */}
        {s.tracks.map((_, j) => {
          const k = j - seat
          const i = (anchor + k + s.tracks.length) % s.tracks.length
          const t = s.tracks[i]
          const g = CARD[Math.min(Math.abs(k), 2)]
          const hue = k === 0 ? FEATURED : FAN[(j < seat ? j : j - 1) % FAN.length]
          const fg = s.retro ? '#FBF6EA' : contrastInk(hue)
          return (
            // The whole card is the button on the published page, as it is in
            // layout 1: the frame draws no other affordance on it.
            <div key={j} onClick={onPick(i)} style={{
              position: 'absolute',
              left: off(k * step - g.w / 2), top: off(g.y - g.h / 2),
              width: u(g.w), height: u(g.h),
              transform: tilt(s, k * 5.33), opacity: g.op, zIndex: 10 - Math.abs(k),
              background: hue, color: fg,
              border: `1px solid ${s.retro ? '#111111' : fg}`, borderRadius: u(14),
              padding: u(16), overflow: 'hidden', cursor: s.live ? 'pointer' : undefined,
              ...col(u(12), { alignItems: 'stretch' }),
            }}>
              <div style={{
                position: 'relative', height: u(g.art), flex: 'none',
                borderRadius: u(4), overflow: 'hidden',
              }}><Photo s={s} initialsSize={20} src={t.img} /></div>
              <div style={col(u(4), { minWidth: 0 })}>
                <span style={{ ...titleType(16), lineHeight: 1.2 }}>{t.name}</span>
                <span style={subType}>{t.rel || t.sub}</span>
              </div>
              {k === 0 && (
                <span style={chip({
                  position: 'absolute', left: u(25.5), top: u(25),
                  background: s.chips[4 % n].bg, color: s.retro ? '#FBF6EA' : s.chips[4 % n].fg,
                  borderRadius: '999px', padding: `${u(4)} ${u(8)}`,
                })}>● Featured</span>
              )}
            </div>
          )
        })}
      </div>
    )

    const bar = (
      <div style={{
        // The frame's bar is a shade lighter than the panel it sits on and is
        // held by an olive outline in accent-coloured type. The flat templates
        // have only the one paper, so there the outline is the one that has to
        // carry it — and `paperLine` / `paperFg` are the two that read on it,
        // where `line2` and the accent need not.
        flex: 'none', height: u(108), background: s.retro ? '#FFFEFB' : s.paper,
        color: s.retro ? rust : ink,
        border: `${s.bw} solid ${s.retro ? olive : s.paperLine}`, borderRadius: '999px',
        // 768 takes the frame's 40 and 24 verbatim. 390 does not: its master
        // emits the very same pair into a 330px bar and squeezes the track it
        // is playing down to a sliver of its sleeve, which is the frame's own
        // render being the artefact rather than the design.
        padding: `0 ${s.mob ? '20px' : u(40)}`,
        ...row(s.mob ? '14px' : u(24)),
      }}>
        {/* Filled *and* stroked, unlike layout 1's player: the frame's skip
            glyphs carry the bar beside the triangle, which is the stroke. The
            group closes up at 390 for the same reason the bar's own padding
            does: having decided the master swallowed the track it is playing,
            the transport's spacing is what pays for naming it. */}
        <span style={row(s.mob ? '14px' : u(24), { flex: 'none' })}>
          <span style={ctl} onClick={s.live ? () => goTo(at - 1) : undefined}>
            <SkipBack size={14} fill="currentColor" />
          </span>
          {/* The frame draws a player caught mid-song — the same picture its
              clock draws — so the canvas keeps Pause however this renders
              live. */}
          <span style={ctl} onClick={s.live ? toggle : undefined}>
            {s.live && !playing ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
          </span>
          <span style={ctl} onClick={s.live ? () => goTo(at + 1) : undefined}>
            <SkipForward size={14} fill="currentColor" />
          </span>
        </span>
        {/* The now-playing block is the player's own state, not the section's:
            the sleeve is the current track's artwork and the clock runs. */}
        {/* The frame's inner pill carries a 30px right padding before the
            glyphs. Our bar is ~18px narrower than the frame's — the panel is
            the page's content width — and that padding is the one gap here
            that costs nothing to give back, where a truncated track title
            costs the most. 768 has the room for the frame's own 30; 390, which
            has already dropped the clock and the glyphs below, has none. */}
        <span style={row(u(12), { flex: 1, minWidth: 0, paddingRight: desk ? u(12) : tab ? '30px' : 0 })}>
          <span style={{
            width: u(60), height: u(60), flex: 'none',
            borderRadius: '999px', overflow: 'hidden', position: 'relative',
          }}><Photo s={s} initialsSize={16} src={nowArt} /></span>
          <span style={col(u(2), { flex: 1, minWidth: 0 })}>
            <span style={titleType(24)}>{nowTitle}</span>
            <span style={subType}>{now.by}</span>
          </span>
          {/* The 390 canvas has no frame of its own and cannot seat the whole
              bar: the running time and the glyphs below go, rather than
              squeeze the track off it. */}
          {!s.mob && <span style={{ ...subType, flex: 'none' }}>{now.at} / {now.of}</span>}
        </span>
        {/* Text glyphs in the frame, not icons. */}
        {!s.mob && (
          <span style={row(u(12), {
            flex: 'none', fontFamily: s.body, fontSize: u(14), lineHeight: 1.5,
          })}><span>♡</span><span>↓</span><span>⋯</span></span>
        )}
        {audio}
      </div>
    )

    // `minHeight`, not `height`: a list longer than the frame's five grows the
    // grid row past 673, and the stack should take that height rather than
    // leave the bar floating half way up a taller panel.
    const left = (
      <div style={col('0', { minWidth: 0, minHeight: desk ? u(673) : undefined })}>
        <h2 style={{
          // 768 sets the head at the canvas's own `h1`, which is its master's
          // measured 59.5 to within half a pixel; 1180 and 390 both land on
          // `dispLg`. Measured off the two renders' line boxes — 53 on one line
          // and 72 on two, at leading .89 — and not off the emitted
          // `size/display-lg`, whose 96 is the component's default at all three
          // widths.
          margin: 0, fontFamily: s.display, fontSize: tab ? s.h1 : s.dispLg, lineHeight: 0.89,
          // Accent on the frame's near-white panel; on a flat template the
          // panel is `paper`, where only `paperFg` is guaranteed to read.
          letterSpacing: s.dls, color: s.retro ? rust : ink, flex: 'none',
          // Layout 1's measure, for the frame's same break after "worth". Both
          // narrow masters break where the column runs out instead — one line
          // at 768, two at 390 — so the measure would only force a break
          // neither frame draws.
          maxWidth: desk ? '5.8em' : undefined,
        }}>{s.title}</h2>
        <div style={col(u(24), {
          flex: 1, minHeight: 0,
          // 768 sets the heading ten above the carousel. 390 runs the two
          // *into* each other: the fan band's top 111px are empty, and the
          // master takes 49 of them back rather than stack two blocks, which
          // is what puts its bar 514 down a 622-tall column. The heading's box
          // then ends 49 into the band with 62 still clear of the first card,
          // so a third line of title spends 36 of that and a fourth would
          // collide — the frame's own composition, at the frame's own risk.
          marginTop: desk ? undefined : tab ? '10px' : '-49px',
        })}>{fan}{bar}</div>
      </div>
    )

    const list = (
      <div style={col(u(10), {
        minWidth: 0,
        // Both narrow masters state this column at 596 and let its five rows
        // divide what the counter row and the gaps leave: 44 + 5 × 96 + 5 × 10
        // is 574, so each row takes a fifth of the 22 over and stands at the
        // 100.4 both renders measure. `minHeight` rather than a height, and the
        // rows' `1 1 auto` rather than desktop's `1 1 0`: past five tracks the
        // column grows and every row keeps its own 96 instead of being squeezed
        // into a twelfth of a fixed one. An emptied list drops it rather than
        // standing 596px of nothing under the player: the number is a division
        // target, and with no rows there is nothing to divide. Desktop reserves
        // the space either way — there the height is the grid stretching this
        // column against the fan's, not a number this branch states.
        minHeight: desk || !s.tracks.length ? undefined : '596px',
      })}>
        <div style={row('0', {
          flex: 'none', justifyContent: 'space-between', padding: `${u(16)} 0`, color: ink,
        })}>
          <span style={chip({ textTransform: 'uppercase' })}>● Popular</span>
          {/* Layout 1 derives its counter from the track count the same way. */}
          <span style={chip({ textTransform: 'uppercase' })}>
            {s.tracks.length} Featured / {s.tracks.length} Max
          </span>
        </div>
        {s.tracks.map((t, i) => {
          const r = ROWS[i % ROWS.length]
          const fg = s.retro ? r.fg : contrastInk(r.bg)
          // TracksField has no duration of its own — its rows carry the
          // subtitle in both keys — so the running time only sets where the
          // two differ.
          const dur = t.dur && t.dur !== t.rel ? t.dur : ''
          // The row is the same button the fan card is — the two columns are
          // one list — and the playing row swaps its number for the transport
          // glyph, the way layout 1's card swaps its circle. The slot keeps
          // its width in both states so nothing shifts under the pointer.
          const on = chosen && i === at
          return (
            <div key={i} onClick={onPick(i)} style={{
              flex: desk ? 1 : '1 1 auto', minHeight: 0, overflow: 'hidden',
              background: r.bg, color: fg, border: `${s.bw} solid ${s.retro ? r.line : fg}`,
              // 768 takes the frame's 30 and 20 verbatim, which leaves its
              // title 396px. 390 does not: the same pair in a 306px row leaves
              // 74 for a 24px display title, and the master's own render duly
              // hard-clips "Manchester at 3am" mid-word. The tighter set is
              // this branch's own, kept from the placeholder it replaces as the
              // least-invented number available; the title still ellipsises,
              // which is the honest form of what the frame does.
              borderRadius: u(30), padding: `${u(14)} ${s.mob ? '18px' : u(30)}`,
              cursor: s.live ? 'pointer' : undefined,
              ...row(s.mob ? '14px' : u(20)),
            }}>
              <span style={{
                fontFamily: s.body, fontSize: u(16), lineHeight: 1.5,
                width: u(24), flex: 'none', ...row('0', { justifyContent: 'center' }),
              }}>{on
                ? (playing ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />)
                : t.n}</span>
              <span style={{
                width: u(64), height: u(64), flex: 'none', display: 'block',
                borderRadius: u(4), overflow: 'hidden', position: 'relative',
              }}><Photo s={s} initialsSize={16} src={t.img} /></span>
              <span style={col(u(4), { flex: 1, minWidth: 0 })}>
                <span style={titleType(24)}>{t.name}</span>
                <span style={subType}>{t.rel}</span>
              </span>
              {dur && <span style={{ fontFamily: s.body, fontSize: u(14), lineHeight: 1.5, flex: 'none' }}>{dur}</span>}
            </div>
          )
        })}
      </div>
    )

    return (
      <div style={{
        background: panel, color: ink,
        // The panel is the one box the narrow masters draw *larger* than the
        // 1440 one relative to its canvas: a 30px corner against the desktop
        // frame's 22, and a side padding that halves while the vertical one
        // stays the desktop component's 60 at 768. The 50 between the carousel
        // and the list is the same at all three widths — it is the desktop
        // grid's own gap, stood on end.
        borderRadius: desk ? u(22) : '30px',
        padding: desk ? u(60) : tab ? '60px 30px' : '40px 20px',
        ...(desk ? {
          display: 'grid', alignItems: 'stretch',
          gridTemplateColumns: 'minmax(0, 629fr) minmax(0, 529fr)', gap: u(50),
        } : col('50px')),
      }}>
        {left}{list}
      </div>
    )
  }

  // v2 — Media layout 3 · Editorial numbered list
  // (Figma 964:68642 · 977:22728 at 708 · 982:9779 at 370.)
  //
  // A counter row over five numbered rows on the beige page: number, 64px
  // sleeve, title over release, running time, each row a 30px pill in one of
  // three hues. No panel, no carousel, no head.
  //
  // ── The same Figma component as layout 2's right column ────────────────
  // `432:2092` is the component layout 2 draws *inside* its cream panel beside
  // the fan, so LAYOUT-3-PLAN.md asked whether to lift a shared inner
  // component or write it again. **Written again**, and the tags row's
  // grep-before-you-copy rule is what settles it rather than overrides it:
  // what would be shared is a whole branch, not a leaf, and the two branches
  // disagree about four things at once. The type ramps here — `size/title`
  // 24/**19**/**18**, chip 12/11/11, body-lg 16/15/15, body-md 14/13/13 —
  // where layout 2's masters measured every one of them flat at the desktop
  // number; the ground is the beige page rather than a cream panel, so the
  // counter row's ink is the page's own; the rows are content-tall here and
  // divide a stated column height there; and 390 is a hand-set deviation on
  // both sides. A `TagChips`-shaped parameterisation would have to take a type
  // table, a ground and a height mechanism — which is the component rewritten
  // with a signed-off branch hanging off it.
  //
  // ── The rows are content-tall, and 647 is the page's number ────────────
  // All three masters state the instance at 647 and divide it: the head hugs
  // (44 desktop, 43 narrow, the chip's own ramp), a 10 gap, then five rows at
  // `flex-[1_0_0]`. The residue is 110.6 at 858 and 110.**8** at 708 and 370 —
  // a stated height does not differ by two tenths, a division does (the events
  // map's rule). And the same component is 673 tall in layout 2's desktop
  // panel and 596 in its narrow ones, so 647 is this page's allocation and not
  // the component's. So the row is its own content: 64 sleeve + 2 × 14 padding
  // + the 2px rule = 96, and the section stands 574 unscaled where the frame
  // draws 647. The cost is named rather than engineered away — at the seeded
  // five our rows are 96 against the frame's 110.6 — and it is the height
  // layout 2's own narrow rows fall back to past five tracks.
  //
  // ── Filling 1052 ───────────────────────────────────────────────────────
  // Open question 1's settled answer, read off the master's own declarations:
  // the row is `w-full` and the title column is `flex-[1_0_0]`, so the row
  // fills the content column and the title takes the slack. At desktop that is
  // ~854px of measure where the widest master draws 626 × 0.82 = 513. No cap
  // (the bio's rule) — the title is one line and ellipsises.
  //
  // ── 390, where the frame destroys its own content ──────────────────────
  // The 370 master keeps the desktop component's 30 padding and 20 gaps, which
  // leaves its title column 141px and a 234px title node inside it under
  // `overflow-clip`: "Manchester at 3am" is hard-clipped mid-word in the
  // master's own render. Our canvas is 346, where the same set leaves 117. So
  // 390 takes layout 2's own override — 18 and 14 — for layout 2's reason, and
  // the title ellipsises rather than clipping. Same section, same call.
  //
  // ── What is shared, and what is not drawn ──────────────────────────────
  // The live seam is layout 2's row verbatim: the whole row is the button, the
  // playing row swaps its number for the transport glyph in a slot that keeps
  // its width, and the `<audio>` element rides at the foot of the column —
  // there is no transport bar here to tuck it into. Nothing new: no state, no
  // vm key, no field. What the frame does not draw, this does not either — the
  // head (the wrapper's display head is audio's, LAYOUT-3-PLAN.md) and the
  // Soundcloud button (layout 2's absence, for the same reason). `heading` and
  // `kicker` therefore edit nothing while layout 3 is selected, which is open
  // question 7's shape and named there.
  //
  // The composed page puts this list under the audio player's now-playing bar,
  // and audio's own layout 3 now draws one card per track — so a page carrying
  // both at layout 3 prints the same tracks twice. That is the Figma page's
  // pairing surviving a section that had to stop stranding its list; it is not
  // this branch's to fix by drawing fewer than the artist typed.
  if (s.v2) {
    const desk = !s.narrow
    const tab = isTablet(s)
    const z = desk ? 0.82 : 1
    const u = (v) => `${Math.round(v * z * 10) / 10}px`
    // `get_variable_defs` on all three masters. Every *box* number is the
    // desktop component's own — 30 radius, 2 rule, 30/14 padding, 20 gap, 64
    // sleeve, 4 sleeve corner, 16 head padding, 10 column gap — unscaled at 768
    // and 390 and × 0.82 at desktop, so the whole branch runs through one `z`.
    const T = desk
      ? { title: 24, num: 16, sub: 12, dur: 14, chip: 12 }
      : tab
        ? { title: 19, num: 15, sub: 12, dur: 13, chip: 11 }
        : { title: 18, num: 15, sub: 12, dur: 13, chip: 11 }

    const n = s.chips.length
    const olive = s.chips[3 % n].bg
    const mustard = s.chips[2 % n].bg
    const rust = s.ac
    // The frame's three-hue cycle, each hue carrying its own type and outline
    // colour — layout 2's list draws the identical pairings, because it is the
    // identical component. The flat templates have no such pairings and fall
    // back to one contrast rule.
    const ROWS = [
      { bg: olive, fg: mustard, line: mustard },
      { bg: mustard, fg: rust, line: olive },
      { bg: rust, fg: mustard, line: mustard },
    ]

    // The counter row stands on the page, not on a card, so its ink is the
    // page's own text colour — Retro's `tx` **is** the frame's `sem/text/2`
    // #111111, so no literal is needed and the flat four are right by
    // construction. (A pixel scan of the 858 render: the ground is #EAD7B8
    // exactly, the three fills are the palette's own, and the masters carry no
    // grain — stddev 0 over every flat patch.)
    const chip = {
      fontFamily: s.body, fontWeight: 700, fontSize: u(T.chip), lineHeight: 1,
      // Figma states −6%, which the emitted CSS freezes at the desktop
      // −0.72px. The tracking ramps with its token (the pricing lesson).
      letterSpacing: u(-0.06 * T.chip),
      textTransform: 'uppercase', whiteSpace: 'nowrap',
    }
    const titleType = {
      fontFamily: s.display, fontSize: u(T.title), lineHeight: 1.1, letterSpacing: s.dls,
      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    }
    const subType = {
      fontFamily: s.body, fontSize: u(T.sub), lineHeight: 1.4,
      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    }

    return (
      <div style={col(u(10), { alignItems: 'stretch' })}>
        {/* The frame's own top line, and the whole of this section's head. Its
            two labels are separated by an unfilled `flex-[1_0_0]` spacer — a
            gap, not a rule, and the render draws nothing there — so this is a
            space-between row, which is what layout 2's counter row already is.
            The count is derived, as it is in layouts 1 and 2. */}
        <div style={row('0', {
          flex: 'none', justifyContent: 'space-between',
          padding: `${u(16)} 0`, color: s.tx,
        })}>
          <span style={chip}>● Popular</span>
          <span style={chip}>{s.tracks.length} Featured / {s.tracks.length} Max</span>
        </div>

        {/* An emptied list is a real state — the tracks are the artist's — and
            the counter row above already names the count honestly, so this is
            the audio player's one line rather than a hole. The pricing deck's
            rule: any minimum height here would be an invented number, and it
            is only ever seen mid-edit. */}
        {s.tracks.length === 0 && (
          <span style={{ fontFamily: s.body, fontSize: u(T.dur), color: s.muted }}>
            No tracks yet.
          </span>
        )}

        {s.tracks.map((t, i) => {
          const r = ROWS[i % ROWS.length]
          const fg = s.retro ? r.fg : contrastInk(r.bg)
          // TracksField has no duration of its own — its rows carry the
          // subtitle in both keys — so the running time only sets where the
          // two differ, which is layout 2's reading of the same two columns.
          const dur = t.dur && t.dur !== t.rel ? t.dur : ''
          const on = chosen && i === at
          return (
            <div key={i} onClick={onPick(i)} style={{
              flex: 'none', overflow: 'hidden',
              background: r.bg, color: fg,
              // `s.bw` rather than `u(2)`: the frame's rule is 2 and ours is 2
              // unscaled at desktop, where × 0.82 would be 1.64. That is the
              // drift layout 2's own rows already carry, and consistency
              // inside one section beats accuracy in half of it.
              border: `${s.bw} solid ${s.retro ? r.line : fg}`,
              borderRadius: u(30), padding: `${u(14)} ${s.mob ? '18px' : u(30)}`,
              cursor: s.live ? 'pointer' : undefined,
              ...row(s.mob ? '14px' : u(20)),
            }}>
              {/* The slot keeps its width in both states so nothing shifts
                  under the pointer as a row starts playing. The frame lets the
                  numeral flow — its sleeves sit at x 68, 70 and 71 for the same
                  reason "10" would shunt a repertoire row — and pinning it at
                  the widest is the repertoire's rule. */}
              <span style={{
                fontFamily: s.body, fontSize: u(T.num), lineHeight: 1.5,
                width: u(24), flex: 'none', ...row('0', { justifyContent: 'center' }),
              }}>{on
                ? (playing ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />)
                : t.n}</span>
              <span style={{
                width: u(64), height: u(64), flex: 'none', display: 'block',
                borderRadius: u(4), overflow: 'hidden', position: 'relative',
              }}><Photo s={s} initialsSize={16} src={t.img} /></span>
              <span style={col(u(4), { flex: 1, minWidth: 0 })}>
                <span style={titleType}>{t.name}</span>
                {/* Rendered or not, rather than printed blank: a typed
                    textarea row has no release line at all, and an empty span
                    spends the column's gap and its own line box either way —
                    which would push the title off the row's middle. */}
                {t.rel && <span style={subType}>{t.rel}</span>}
              </span>
              {dur && (
                <span style={{
                  fontFamily: s.body, fontSize: u(T.dur), lineHeight: 1.5, flex: 'none',
                }}>{dur}</span>
              )}
            </div>
          )
        })}
        {/* This layout has no transport bar of its own — the rows are the whole
            of it — so the element rides at the foot of the column. Without it
            `el.current` is null and every row click is dead. */}
        {audio}
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

  // v2 — Tags layout 3 · Genres row
  // (Figma 964:68632 · 977:22718 at 708 · 982:9769 at 370.)
  //
  // A rust label over a wrapping row of six coloured chips, left-aligned on the
  // page ground. The section's first Figma design ever — its v0 and v1 are
  // invented flat ones and stay that way (LAYOUT-3-PLAN.md, open question 3) —
  // and by some distance the smallest master in the pass: three text styles,
  // one gap and one radius, with no decoration, no rule and no sheet of its own.
  //
  // ── The chips are already written ──────────────────────────────────────
  // `TagChips` *is* this frame's chip, fitted when the layout-3 header dropped
  // the same Figma component into its identity column: the body face at 1.26,
  // sentence case, 5/11 padding, an 8px gap and `radius/chip` 8. So the branch
  // reuses it rather than drawing a second copy, and the only thing it has to
  // add is the type ramp — `size/label-xs` is 20/14/12 across these three
  // masters where `s.labelXs` is a flat 14.
  //
  // Two diffs from the frame follow from that reuse, both named rather than
  // engineered away. The chip's ink is `contrast(bg)` and the masters' is a
  // cream at every chip, so **two** of the six invert — the mustard (lum .64)
  // and the pink (lum .61) take dark type where Figma sets #FBF6EA on both;
  // that is the header's own settled reading of this component, and a fixed
  // cream would vanish on Lime's pale tag and Editorial's sand besides. And
  // the 5/11 padding and 8 gap are the component's literals at desktop, not
  // the pass's × 0.82 — about 2px on a 30px chip, and the price of one chip
  // everywhere over two that disagree.
  //
  // ── The head is the section's, and it is new ───────────────────────────
  // "Genres" is inside the instance (`;516:1405`), not in the composed page's
  // wrapper the way the bio's display head was, so it is this section's copy —
  // but nothing could reach it: `FIELDS.tags` named one field, the tag string
  // itself. `heading` is added here with the frame's own label as its default,
  // which is the bio's `since` case with the one difference that a default is
  // honest — "Genres" is a word the design chose, not a fact about the artist.
  // Open question 7's objection does not apply: no signed-off layout newly
  // honours the edit, v0 hard-writing "Browse by tag" and v1 drawing no head at
  // all. It is `size/body-lg` in the body face at 1.5, in the accent — the one
  // place this section prints anything but a chip.
  if (s.v2) {
    const desk = !s.narrow
    const tab = isTablet(s)
    const z = desk ? 0.82 : 1
    const u = (v) => `${Math.round(v * z * 10) / 10}px`
    // body-lg 16/15/15 (the head) and label-xs 20/14/12 (the chips), read off
    // `get_variable_defs` on all three masters. `RAMP` has neither pair.
    const T = desk ? { head: 16, chip: 20 } : tab ? { head: 15, chip: 14 } : { head: 15, chip: 12 }
    // Both children are `w-full` in every master, which is what lets the chip
    // row wrap: `col`'s default `stretch` gives it the column's width, where a
    // `flex-start` would size it to max-content and run it off the page. The
    // 6px gap inside the head frame is between "Genres" and a hidden leftover
    // node, so it is inert and not transcribed; so is that frame's clip.
    return (
      <div style={col(u(16))}>
        <span style={{
          fontFamily: s.body, fontSize: u(T.head), lineHeight: 1.5, color: s.ac,
        }}>{s.title}</span>
        <TagChips s={s} radius={u(8)} size={u(T.chip)} />
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

// The bar-meter's own waveform, read off the Figma component's 57 bars
// (`964:68641;761:8374…8430`) in order. A module-level decoration constant, the
// way GRAIN_URL and TORN_D are: it belongs to one branch of one section and
// EncoreSection imports nothing from data.js. The first 17 are the ones the
// frame paints in the accent — the playhead — and everything from the 18th on
// is drawn in identical pairs, which is the designer's hand, not a pattern to
// preserve. Heights are the frame's, against its stated 96px band.
const WAVE = [
  60, 64, 70, 80, 90, 88, 74, 62, 55, 50, 48, 50, 60, 75, 88, 96, 92,
  78, 78, 62, 62, 52, 52, 46, 46, 48, 48, 54, 54, 62, 62, 74, 74, 80, 80,
  78, 78, 68, 68, 56, 56, 48, 48, 44, 44, 48, 48, 56, 56, 64, 64, 56, 56,
  48, 48, 44, 44,
]
// The share of that row the frame paints played: 17 bars of 57. A fraction and
// not a count, because our meter's bar count is derived from the width below —
// see "The meter fills" in the branch.
const WAVE_PLAYED = 17 / WAVE.length

function Audio({ s }) {
  // v2 — Audio layout 3 · Bar-meter player
  // (Figma 964:68641 · 977:22727 at 708 · 982:9778 at 370.)
  //
  // A cream card standing on the beige page: a row of times over a bar meter
  // with a played head, and under it the track's name, a mustard play disc on
  // the page's hard offset shadow, and the artist. This is the section's first
  // Figma design ever — its v0 and v1 are invented flat ones and stay that way
  // (LAYOUT-3-PLAN.md, open question 3) — and it *replaces* an invented flat
  // v2 rather than taking a new slot, so `NVAR.audio` stays 3 (the header's
  // Inset Hero, the same refit-in-place).
  //
  // ── One card per track ─────────────────────────────────────────────────
  // The frame draws a single now-playing bar and the composed page puts the
  // rest of the list in the *media* section below it. Our sections are
  // independent, so a single card would strand every track but the first —
  // the defect `c.tiers` and `c.quotes` were each written to fix, and a
  // visible one here, because `FIELDS.audio.tracks` is a textarea the artist
  // types five lines into. So the card is the row and the section is the
  // stack, at the Section's own 30 between them. Card 0 carries the frame's
  // played head and every card below it is unplayed: that is the media
  // player's cue rule (`cur` starts at -1, and the card still names and shows
  // the track the player is cued to), and it is what keeps the reference
  // picture the frame's at the top of the stack. The costs are named, not
  // engineered away — five discs where the frame draws one, and ~1070px at
  // the seeded five against v0's ~250.
  //
  // ── The meter fills, and the count is what the width buys ──────────────
  // Every bar is `shrink-0 w-[10px]` under a `gap-[4px]`, and 57 of them fill
  // the frame's own 810 box: **the pitch is the design and the count is
  // derived** — the gallery rail's rule the other way up. Honouring the
  // frame's fixed 57 instead would centre a 651px meter in our 1013px card at
  // desktop, and at the two narrow widths it is the master itself that breaks:
  // both keep the desktop component's bar positions under `justify-center` +
  // `overflow-clip`, so 708 clips half the played head off and **390 renders
  // no accent bar at all** (a pixel scan of the 370 master finds none). That
  // is the media player's "a frame's own render can be the artefact, and the
  // tell is that it destroys its own content". So the row is `flex-start` with
  // its clip kept, and the count comes off the content column.
  //
  // ── The frame's copy, sorted ───────────────────────────────────────────
  // What it draws and this does not: "1:30" (the elapsed half of "1:30 /
  // 3:24") and "Mix 028" are a playhead time and a mix number the artist never
  // typed, so they go the way the video section's view count and the pricing
  // deck's rating went. What survives takes a real value: the two times
  // bounding the meter become the track's own scale, `0:00` to `t.dur`, which
  // is the one place a duration genuinely labels something; the title is
  // `t.name` and the name beside the disc is `s.brand`. `t.rel` was the
  // obvious candidate for the freed "Mix 028" seat and is declined — it is
  // seeded-only for this section (`FIELDS.audio.tracks` has no release
  // column), so the reference canvas would print a line the artist's own page
  // can never have.
  //
  // ── The head is borrowed, and the eyebrow is derived ───────────────────
  // The 1440 page wraps this instance and the media list in a Section carrying
  // one display head, and audio takes it (LAYOUT-3-PLAN.md, "The composed
  // page"): `s.title` is `FIELDS.audio.heading`, whose default stays "Selected
  // Tracks" against the frame's "Five worth your ear" — re-pointing it would
  // make v0 and v1 newly honour a different word (open question 7's
  // objection). The eyebrow reads "KM BIO" in the frame, over a *track* head,
  // and that same frame still carries the bio head's hidden `the` / `room.`
  // nodes: it is the bio's Section duplicated. So the eyebrow is the bio's
  // pattern rather than its string — the initials and the category's own name,
  // written out because EncoreSection imports nothing from data.js.
  //
  // ── The type is read, not measured ─────────────────────────────────────
  // `get_variable_defs` on all three masters: display-lg 96/60/40 (the head,
  // at the page's .89), label-xs 20/14/12 (the eyebrow, Inter at 1.26),
  // list 16/**12**/13 (the two Soulway names — the repertoire's non-monotonic
  // case again, and again with no column-width reason), body-sm 12 flat (the
  // times) and body-md 14/13/13 (which reaches the empty state alone — the
  // play glyph is sized off its ink, below). Every box number is the desktop
  // component's own — 24 padding, 16 gap, 30 radius, the 96 band, the 44 disc
  // — unscaled at 768 and 390 and × 0.82 at desktop, so the whole branch runs
  // through one `z`. The 30 radius is a corner walk of all three renders, not
  // the emitted code. The masters carry no grain and no stroke (stddev 0 over
  // the card).
  if (s.v2) {
    const desk = !s.narrow
    const tab = isTablet(s)
    const z = desk ? 0.82 : 1
    const u = (v) => `${Math.round(v * z * 10) / 10}px`
    const T = desk
      ? { disp: 96, eyebrow: 20, list: 16, sm: 12, md: 14 }
      : tab
        ? { disp: 60, eyebrow: 14, list: 12, sm: 12, md: 13 }
        : { disp: 40, eyebrow: 12, list: 13, sm: 12, md: 13 }
    // Figma box/1, which resolves to the off-white here rather than the bio's
    // #FAECD5 (the media player's "the emitted fallback is the component's
    // default, not the instance's" — this one is sampled off the render).
    // Retro's own `paper` IS the beige page, so the card needs the literal;
    // the flat four have a real second paper and take it, with `paperFg` for
    // the ink and an outline, or a palette whose lightest colour is its
    // background draws the card as a hole (the calendar's lesson). The master
    // strokes nothing at any width, so only Retro follows that absence.
    const cream = s.retro ? '#FFFEFB' : s.paper
    const ink = s.retro ? '#111111' : s.paperFg
    // The frame sets both names in the accent. `s.ac` is chosen against the
    // *page*, not against a cream card — Lime's is acid green on pale lime —
    // so the flat four take the card's own ink, which is media layout 2's
    // spelling for the same problem. The played bars follow the names.
    const hot = s.retro ? s.ac : ink
    // box/2, a shade under the card. `line2` is rgba of the page's text, which
    // on a palette whose paper is white (Grunge) vanishes into it — the
    // repertoire's lesson — so the unplayed bar takes the pair that is
    // computed against paper.
    const cold = s.retro ? '#F7EED7' : s.paperLine
    const pad = 24 * z
    const barW = 10 * z
    const barGap = 4 * z
    // Our content column is `canvasW − 2·padX` — 1052 / 688 / 346 — in the
    // editor *and* in the published tab, where the surplus past the canvas
    // folds into `padX` and cancels (EncoreBuilder's PublishedPage). Less the
    // card's own padding either side, that is what the meter has to fill; at
    // the frame's pitch it seats 88 / 46 / 21. A published window under 390
    // is the one case this overshoots, and the row's own clip absorbs it.
    const colW = desk ? 1052 : tab ? 688 : 346
    const nBars = Math.max(1, Math.floor((colW - 2 * pad + barGap) / (barW + barGap)))
    const nHot = Math.round(nBars * WAVE_PLAYED)

    const card = (key, body) => (
      <div key={key} style={{
        background: cream, color: ink, borderRadius: u(30), padding: u(pad / z),
        overflow: 'hidden', border: s.retro ? undefined : `1px solid ${ink}`,
        ...col(u(16), { alignItems: 'stretch' }),
      }}>{body}</div>
    )

    const small = {
      fontFamily: s.body, fontSize: u(T.sm), lineHeight: 1.4, color: ink,
      whiteSpace: 'nowrap',
    }
    const name = {
      fontFamily: s.display, fontSize: u(T.list), lineHeight: 1.2,
      letterSpacing: s.dls, color: hot,
      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
    }

    return (
      <div style={col(u(30), { alignItems: 'stretch' })}>
        {/* The wrapper frame's head, the bio's at every number: the same 30
            between the two lines and between the head and what it heads, the
            same eyebrow on the page's own ink because it stands on the page
            rather than on the card. */}
        <div style={col(u(30), { alignItems: 'flex-start' })}>
          <span style={{
            fontFamily: s.body, fontSize: u(T.eyebrow), lineHeight: 1.26,
            textTransform: 'uppercase', color: s.tx,
          }}>{s.initials} Audio Player</span>
          <h2 style={{
            margin: 0, fontFamily: s.display, fontSize: u(T.disp), lineHeight: 0.89,
            letterSpacing: s.dls, color: s.ac,
          }}>{s.title}</h2>
        </div>

        {/* An empty list is a real state — the tracks are the artist's — and
            it keeps one card rather than leaving a hole under the head. The
            card is then very short, which is the pricing deck's accepted
            answer: any minimum here would be a made-up number, and it is only
            ever seen mid-edit. */}
        {s.tracks.length === 0 && card('empty',
          <span style={{ fontFamily: s.body, fontSize: u(T.md), color: s.muted }}>No tracks yet.</span>,
        )}

        {s.tracks.map((t, i) => card(i,
          <>
            {/* The meter's scale. The frame's "1:00" / "2:00" are the two ends
                of the bar, so they become the two ends of the track. */}
            <div style={row('0', { justifyContent: 'space-between' })}>
              <span style={small}>0:00</span>
              {t.dur && <span style={small}>{t.dur}</span>}
            </div>
            <div style={{
              height: u(96), gap: u(4), overflow: 'hidden',
              display: 'flex', alignItems: 'flex-end',
            }}>
              {Array.from({ length: nBars }, (_, j) => (
                <span key={j} style={{
                  flex: 'none', width: u(10), borderRadius: u(1),
                  // The waveform rotates by a fixed step per card, so a stack
                  // of five does not draw one shape five times. The step is
                  // decoration and invented — the gallery's placeholder-ramp
                  // rule — and 0 is deliberately unrotated, so the top card is
                  // the frame's own bar for bar.
                  height: u(WAVE[(j + i * 13) % WAVE.length]),
                  background: i === 0 && j < nHot ? hot : cold,
                }} />
              ))}
            </div>
            <div style={row('0', { justifyContent: 'space-between' })}>
              <span style={{ ...name, flex: '0 1 auto', minWidth: 0 }}>{t.name}</span>
              {/* The one place the page's hard offset shadow lands in this
                  section, so it is Retro's alone. `pillBg`/`pillFg` are the
                  frame's own pair by construction — Retro's lightest tag is
                  the mustard and the accent clears it, which is the rust ▶ —
                  but only on the page they were chosen against. `pillBg` is
                  the palette's lightest tag and `paper` its lightest colour
                  outright (the repertoire's lesson), so on this cream card
                  Lime, Grunge and Pop all draw the disc in the card's own
                  colour and it disappears; `s.ac` is no better, being acid
                  lime on pale lime. The flat four therefore take the one pair
                  that is legible on paper by construction. */}
              <span style={{
                flex: 'none', width: u(44), height: u(44), borderRadius: '999px',
                background: s.retro ? s.pillBg : ink, color: s.retro ? s.pillFg : cream,
                boxShadow: s.retro ? `${u(5)} ${u(5)} 0 0 ${s.ac}` : undefined,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {/* The frame sets a "▶" text node; a filled lucide glyph is
                    the file's own way of drawing one (media layout 2's
                    transport), and it does not fall to a system font. Sized
                    off the *ink*, not the em: the text node is body-md in a
                    21px line box, but a pixel scan of all three renders puts
                    its triangle at 9 × 10 inside the 44 disc — a fifth of it.
                    Lucide's fills 14/24 of its `size`, so 15.5 is the size
                    that draws the frame's 9. The header's divide-the-face-out
                    rule, for an icon rather than a face. */}
                <Play size={Math.round(15.5 * z)} fill="currentColor" />
              </span>
              <span style={{ ...name, flex: '0 1 auto', minWidth: 0, textAlign: 'right' }}>{s.brand}</span>
            </div>
          </>,
        ))}
      </div>
    )
  }

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

  // v1 — Video layout 2 · Dashboard player (Figma 964:64645)
  //
  // A stage on the left — the poster in a deep-rounded card with a transport
  // bar floating in its foot — and under it the video's name, its description
  // and the artist's own row. Beside it, a rust-outlined cream panel listing
  // the other videos: a thumbnail carrying its running time, then the title,
  // where it came from and when.
  //
  // Still a picture, on both surfaces. Video is one of the two categories with
  // no `s.live` seam at all (CLAUDE.md, "Intentional limits") — there is no
  // <video> element and no handler in here, so nothing carries a pointer
  // cursor either: the calendar's rule that a cursor is read off the handler.
  //
  // What the frame draws and this does not: the view counts ("8,175M views",
  // "25,284M View"), the follower count ("22.7M followers"), the like/dislike
  // pair ("👍 509,325 · 👎 245", which the frame's own 158px title box clips
  // away in any case) and the verified tick beside the name. Not one of them
  // has a field or can be derived, and a published page that prints a number
  // the artist never typed is making a claim — the gallery's rule about a tile
  // promising a TikTok that does not exist, read one step on. Every line that
  // does have a field takes it: the heading, the description, the running
  // time, the artist's name and both photographs.
  //
  // Desktop numbers are the 1440 frame × 0.82 (§5.5) through `u()`. The frame's
  // 56 inset is dropped for the page root's own padding, so the pair is the
  // content width (1052) and not the frame's 1328 × 0.82. The 37px goes out of
  // the *player*, which is an aspect-ratio box and simply gets shorter: the
  // panel's row is a thumbnail beside two lines of nowrap type and is the one
  // of the two that cannot give anything back.
  //
  // The 768 (984:35259) and 390 (984:35737) masters change the composition
  // rather than narrowing it: the panel leaves the stage's side for a
  // full-width block under it, and its list becomes two columns — a thumbnail
  // beside its lines at 768 and above them at 390. Everything else is the
  // desktop component at its own unscaled numbers, so `u()` is the identity
  // there; only the type ramps, and the transport bar shrinks its discs at 390.
  // See `z` below. Both masters' player is a *flattened raster* in Figma, so
  // the bar's own geometry was measured off the two renders rather than read.
  if (s.v1) {
    const desk = !s.narrow
    const tab = isTablet(s)
    const nar = s.narrow
    // The narrow-master scale, the media player's rule: both frames draw the
    // desktop component's box dimensions verbatim, so nothing is ramped below
    // 1180 except the type and the transport's discs.
    const z = desk ? 0.82 : 1
    const u = (v) => `${Math.round(v * z * 10) / 10}px`
    // The type, measured off all three renders rather than read off the emitted
    // `var(--size/…)`, whose values are the component's defaults at every width.
    // Two readings agree on each: the text node's height over its own leading,
    // and the six row titles' set widths as a ratio of the 1440 frame's.
    //   label   20 → 14 → 13     display/list 16 → 12 → 13
    //   body-md 14 → 13 → 13     body-sm      12 → 12 → 12  (Inter's does not move)
    // The row title is the odd one — *larger* at 390 than at 768 — because the
    // 390 grid's columns are the wider pair (163.5 against 150.5). It is not a
    // slip; do not "correct" it.
    const labelSz = tab ? '14px' : s.mob ? '13px' : u(20)
    const rowSz = tab ? '12px' : s.mob ? '13px' : u(16)
    const bodySz = nar ? '13px' : u(14)
    const n = s.chips.length
    const mustard = s.chips[2 % n].bg
    const rust = s.ac
    // Figma box/1 — the bio's cream. Retro's own `paper` IS the beige page, so
    // the panel, the badges and the progress track need the literal; the flat
    // four have a real second paper and take it, with `paperFg` for the ink,
    // because `s.tx` is chosen against the page and need not read on it.
    const cream = s.retro ? '#FAECD5' : s.paper
    const creamInk = s.retro ? '#111111' : s.paperFg
    // Figma box/2, the ground under a photograph that has not loaded — one
    // step down from the cream, and never seen with the seeds in place.
    const shade = s.retro ? '#E1CAA5' : s.soft

    const metaType = (extra) => ({
      fontFamily: s.body, fontSize: u(12), lineHeight: 1.4,
      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', ...extra,
    })
    // The frame's two disc sizes. The transport's are rust filled and held by a
    // mustard hairline in mustard glyphs; the action row's below the rule
    // invert that and throw a hard block with it. Retro's pairing is the
    // frame's own two hues; the flat four have no such pairing and take the
    // two the palette guarantees — the accent on its own foreground, and the
    // Book pill's lightest-hue-and-accent-type pair (§10.2) — because
    // `chips[2]` is an arbitrary tag colour that can land on the page ground.
    // The transport disc is the one box either master shrinks: measured 28 at
    // 768 as at 1440, and 22 at 390, where the bar has to seat six of them, two
    // clocks and a progress track inside the player's 330. Its glyph goes with
    // it, and so do the two gaps below.
    const cd = s.mob ? 22 : 28
    const cg = s.mob ? 9 : 11
    const ctl = {
      width: u(cd), height: u(cd), flex: 'none', borderRadius: '999px',
      background: s.retro ? rust : s.ac, color: s.retro ? mustard : s.acFg,
      border: `1px solid ${s.retro ? mustard : s.acFg}`,
      ...row('0', { justifyContent: 'center' }),
    }
    const act = {
      width: u(36), height: u(36), flex: 'none', borderRadius: '999px',
      background: s.retro ? mustard : s.pillBg, color: s.retro ? rust : s.pillFg,
      boxShadow: hard(s, rust, 4.1, 4.1),
      ...row('0', { justifyContent: 'center' }),
    }
    // ⋮ and ⋯ stay text: lucide has both, but they are the two glyphs in this
    // frame that are typography rather than iconography, and the media
    // player's bar sets its own the same way.
    const dots = (g) => <span style={{ fontFamily: s.body, fontSize: u(14), lineHeight: 1 }}>{g}</span>

    const player = (
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '819 / 478',
        background: cream, borderRadius: u(40), overflow: 'hidden',
        padding: u(20),
        ...col('0', { alignItems: 'center', justifyContent: 'space-between' }),
      }}>
        <span style={{ position: 'absolute', inset: 0 }}><Photo s={s} initialsSize={44} /></span>
        {/* Two hairline discs in the top corner, cream on the photograph. */}
        <span style={row(u(8), { alignSelf: 'flex-end', position: 'relative' })}>
          {[<Settings key="s" size={13} />, dots('⋯')].map((g, i) => (
            <span key={i} style={{
              width: u(34), height: u(34), flex: 'none', borderRadius: '999px',
              background: cream, color: creamInk, border: `1px solid ${creamInk}`,
              ...row('0', { justifyContent: 'center' }),
            }}>{g}</span>
          ))}
        </span>
        {/* The bar is the page's own beige on the photograph, not a cream —
            the one place in the frame where the section ground reappears
            inside a card. `maxWidth` because the 390 canvas cannot seat it. */}
        <span style={{
          position: 'relative', maxWidth: '100%',
          background: s.bg, color: s.tx, borderRadius: '999px',
          padding: `${u(s.mob ? 7 : 8)} ${u(12)}`, ...row(u(s.mob ? 6 : 10)),
        }}>
          <span style={row(u(s.mob ? 4 : 5), { flex: 'none' })}>
            <span style={ctl}><SkipBack size={cg} fill="currentColor" /></span>
            {/* A player caught mid-song, which is the picture the frame
                draws — and the picture is all this section is. */}
            <span style={ctl}><Pause size={cg} fill="currentColor" /></span>
            <span style={ctl}><SkipForward size={cg} fill="currentColor" /></span>
          </span>
          {s.videoAt && <span style={metaType({ flex: 'none' })}>{s.videoAt}</span>}
          <span style={{
            // The frame's 215 wherever there is room for it; on the 390 canvas
            // the track is what gives way, so the clocks and the glyphs do not.
            width: u(215), maxWidth: '100%', flex: s.mob ? 1 : 'none', minWidth: u(40),
            height: u(4), borderRadius: u(2), overflow: 'hidden',
            // Retro's box/1 against the beige bar. A flat template's `paper`
            // is a near-white on a near-white bar and the unfilled half would
            // vanish, so there the track is a rule instead.
            background: s.retro ? cream : s.line2,
          }}>
            <span style={{
              display: 'block', width: `${s.videoPct}%`, height: '100%',
              background: rust, borderRadius: u(2),
            }} />
          </span>
          <span style={metaType({ flex: 'none' })}>{s.videoDur}</span>
          <span style={ctl}><Volume2 size={cg} /></span>
          {/* The 390 master keeps all six discs and pays for them out of their
              own size and spacing rather than by dropping the last two — which
              is what the fallback this replaces did, on the media player's
              rule at the same width. Its own bar fills the player's content
              width exactly; ours is 24px narrower, and the track is what
              absorbs that, down to its stated floor. */}
          <span style={ctl}><Maximize size={cg} /></span>
          <span style={ctl}>{dots('⋮')}</span>
        </span>
      </div>
    )

    // The two halves of the artist row, named because the 390 master puts them
    // on separate lines and the other two do not.
    const artist = (
      <>
        <span style={{
          width: u(40), height: u(40), flex: 'none', borderRadius: '999px',
          overflow: 'hidden', background: shade,
        }}><Photo s={s} avatar initialsSize={14} /></span>
        <span style={{
          fontFamily: s.body, fontSize: bodySz, lineHeight: 1.5,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{s.brand}</span>
      </>
    )
    const actions = (
      <>
        <span style={act}><Bookmark size={13} /></span>
        <span style={act}><Link2 size={13} /></span>
        <span style={act}><Bell size={13} /></span>
        {/* A label with nowhere to go, like the frame's "View All ›" and
            layout 1's own play disc: this section is a picture, and the
            pill is drawn rather than wired. */}
        <span style={{
          ...act, width: 'auto', height: 'auto', padding: `${u(8)} ${u(16)}`,
          fontFamily: s.body, fontSize: u(12), lineHeight: 1.4, whiteSpace: 'nowrap',
        }}>Follow</span>
      </>
    )

    const stage = (
      <div style={col(u(14), { flex: 1, minWidth: 0 })}>
        {player}
        {/* The frame's name-and-metric block. Ours is the heading in the label
            face over the description — the field layout 1 already prints —
            and it takes the whole column rather than the frame's clipped 158,
            because a sentence is not a two-word metric. */}
        <div style={col(u(4), { padding: `${u(4)} 0`, minWidth: 0 })}>
          <span style={labelStyle(s, labelSz, { overflow: 'hidden', textOverflow: 'ellipsis' })}>{s.title}</span>
          {s.videoDesc && <span style={metaType()}>{s.videoDesc}</span>}
        </div>
        {/* The artist row. All three frames rule it off above and pad it 15/20;
            what the 390 master changes is that the four controls drop to a line
            of their own 25 under the name, at their own tighter 5px gap, rather
            than sharing the row. That is transcribed rather than left to
            `flexWrap`, which wraps wherever the artist's name happens to run
            out and puts the spacer in an unpredictable place. */}
        <div style={{
          borderTop: `1px solid ${s.retro ? '#111111' : s.line2}`,
          paddingTop: u(15), paddingBottom: u(20),
          ...(s.mob ? col('25px') : row(u(12), { flexWrap: 'wrap' })),
        }}>
          {s.mob ? <span style={row(u(12), { minWidth: 0 })}>{artist}</span> : artist}
          {!s.mob && <span style={{ flex: 1, minWidth: 0 }} />}
          {s.mob ? <span style={row('5px', { flex: 'none' })}>{actions}</span> : actions}
        </div>
      </div>
    )

    // The panel holds its frame width and the player gives the 37 back, so this
    // is a fixed column on desktop and the full width below it.
    const panel = (
      <div style={{
        width: desk ? u(392) : '100%', flex: 'none',
        background: cream, color: creamInk,
        border: `${u(3)} solid ${rust}`, borderRadius: u(14),
        // The frames' inset, which Figma states *including* the 3px stroke it
        // draws inside the box — so all three of these run 3px wide, the
        // repertoire's `calc(padding − border)` case. Left as it is because the
        // desktop half of this very property already carries the same drift and
        // moving it is a signed-off change; consistency inside one branch, the
        // bio's rule.
        padding: desk ? u(14) : tab ? '30px' : '10px',
        ...col(u(10), { minWidth: 0 }),
      }}>
        <div style={row('0', {
          flex: 'none', justifyContent: 'space-between', paddingBottom: u(6), gap: u(10),
        })}>
          <span style={{ fontFamily: s.body, fontSize: bodySz, lineHeight: 1.5, whiteSpace: 'nowrap' }}>
            Top music video
          </span>
          <span style={metaType({ flex: 'none' })}>View All ›</span>
        </div>
        {/* The frame's panel is a picture of a section with something in it.
            An emptied list keeps the panel and prints the pricing deck's one
            message inside it, rather than leaving a rust outline round
            nothing. */}
        {!s.videos.length && (
          <span style={{ fontFamily: s.body, fontSize: bodySz, lineHeight: 1.5 }}>No videos yet.</span>
        )}
        {/* The frame sizes these rows by dividing the panel's height and lets
            the thumbnail take its width from that — which only works while the
            panel has a height to divide, and ours does not: the list is what
            makes the panel tall, not the other way round. So the thumbnail is
            sized by *width* instead, at the 142.9 the frame's own division
            lands on, and the row's height follows the aspect. The two agree at
            the seeded six; a longer list simply makes the panel taller, which
            is what `items-start` on the pair is for.

            Both narrow masters lay the same rows out **two to a line** instead,
            at the same 23 in both directions — so the grid is what states it
            there, and an odd count trails one half-width cell, the pricing
            deck's rule. The thumbnail then stops being a fraction of a row and
            becomes the frame's own 150: it is 48% of the 768 column and sits
            *above* its lines at 390, where 150 is very nearly the whole of a
            148.5px column. */}
        <div style={desk ? col(u(23)) : {
          display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: '23px', alignItems: 'start',
        }}>
          {s.videos.map((v, i) => (
            <div key={i} style={s.mob
              ? col('12px', { minWidth: 0 })
              : row(u(12), { flex: 'none', alignItems: 'flex-start' })}>
              <span style={{
                position: 'relative', flex: 'none',
                width: desk ? u(142.9) : '150px', maxWidth: desk ? '42%' : '100%',
                aspectRatio: '140 / 80', background: s.bg,
                borderRadius: u(8), overflow: 'hidden',
              }}>
                <Photo s={s} initialsSize={16} src={v.img} />
                {v.length && (
                  <span style={{
                    position: 'absolute', left: u(5), top: u(5),
                    background: cream, color: creamInk, borderRadius: u(4),
                    padding: `${u(2)} ${u(6)}`,
                    fontFamily: s.body, fontSize: u(12), lineHeight: 1.4, whiteSpace: 'nowrap',
                  }}>{v.length}</span>
                )}
                <span style={{
                  position: 'absolute', right: u(4.67), bottom: u(4.67),
                  width: u(24), height: u(24), borderRadius: '999px',
                  background: cream, color: creamInk,
                  ...row('0', { justifyContent: 'center' }),
                }}><Play size={9} fill="currentColor" strokeWidth={0} /></span>
              </span>
              <span style={col(u(7.4), s.mob ? { minWidth: 0, width: '100%' } : { flex: 1, minWidth: 0 })}>
                <span style={{
                  fontFamily: s.display, fontSize: rowSz, lineHeight: 1.2,
                  letterSpacing: s.dls,
                  // The accent is not guaranteed to read on `paper` (Lime's is
                  // acid green on pale lime), so only Retro's frame-literal
                  // rust goes here; the flat four take the paper's own ink.
                  color: s.retro ? rust : creamInk,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{v.title}</span>
                {v.sub && (
                  <span style={row(u(7.4), { minWidth: 0 })}>
                    <span style={{
                      width: u(19.8), height: u(19.8), flex: 'none', borderRadius: '999px',
                      overflow: 'hidden', background: shade,
                    }}><Photo s={s} avatar initialsSize={8} /></span>
                    <span style={metaType()}>{v.sub}</span>
                  </span>
                )}
                {v.when && <span style={metaType()}>{v.when}</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    )

    // The frame's own `items-start`, and it has to stay that: the frame draws
    // the two columns exactly as tall as each other because both are fixed, and
    // ours are not — the panel's height is whatever its list makes it. Stretched
    // instead, the taller column would have to hand its slack to something, and
    // there is nothing in either that should take 250px of it at twelve videos.
    // So the two simply end where they end; at the seeded six the panel runs
    // about 20px past the stage's rule.
    //
    // Below 1180 the two are one column, which is what both masters draw. The
    // 390 one sets the gap at nothing at all: the artist row's own 20px of
    // bottom padding is the whole of the space between its Follow pill and the
    // panel's outline, and that is the frame's picture rather than an oversight
    // — it is the same 20 the 768 master stands 32 further off.
    return (
      <div style={desk
        ? row(u(40), { alignItems: 'flex-start' })
        : col(tab ? '32px' : '0', { alignItems: 'stretch' })}>
        {stage}
        {panel}
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

  // Layout 2 — "Pricing — D · Single big plan" (Figma 964:64648, 1440 × 707).
  // A two-column grid on the page's own beige: left, a kicker over the display
  // heading and a line of praise; right, one large rounded card tilted 3° off
  // square, carrying the plan's name, its blurb, its price, the Book pill, a
  // rule and its features in two columns. Under it, the small print.
  //
  // The frame's chip row is *inside* the card and reads "↻ Per event" /
  // "⚡ Custom brief" — a pricing-model toggle this section has no notion of.
  // It is the packages instead: one chip per package, the card showing the one
  // selected, which is what stops a single-card layout stranding every package
  // but the first (the testimonials' own defect, and the reason `c.quotes`
  // exists). That reuses `chip` whole — the same state layout 1 filters with,
  // the same `s.live` gate, the same clamp against a list the artist can
  // shorten, and the same pinned 0 on the canvas, where the frame draws chip 0
  // filled and so the picture *is* a choice. It leaves `s.tierChips` — the tags
  // — reaching layout 1 only, which is FIELDS.media.soundcloud's case again;
  // the field's hint says so. Not drawn at one package: nothing to select is
  // the row's own rule in layout 1 too.
  //
  // Dropped from the frame, verbatim, so the call can be reversed: the two
  // chips' glyphs `↻` and `⚡`; the three reviewer avatars; the `★ ★ ★ ★ ★`
  // row; `32 reviews · 4.9 ★`; and `3 dates open for Sept '26` beside the pill.
  // All but the glyphs are claims about the artist that no field backs — the
  // video section's rule — and with the count gone the faces and the stars
  // substantiate nothing. The frame's second price (`— £2,200/event`) becomes
  // `s.tierUnit`, which is the one the section already owns. What is kept as a
  // literal is the two frame labels, `[ PRICING ]` and `WHAT'S INCLUDED`.
  //
  // Desktop numbers are the 1440 frame × 0.82 (§5.5) through `u()`. The frame's
  // own 56/32 inset is dropped for the page root's padding, so the pair spans
  // the content width (1052) and not the frame's 1328. The frame carries no
  // grain at all (stddev 0 over both the ground and the card), unlike layout
  // 1's cards, so this branch draws none.
  //
  // The narrow masters are 986:10425 (768 × 915.4) and 986:10492 (390 × 849.4).
  // Both are the desktop composition **stacked**: the same `left` block, then
  // the same card at `w-full`, at the same 32 gap. Every box either master
  // states is the desktop component's own number unscaled — the card's 30
  // radius, its 30 gap, the 14/8/6/16/12/10/24/8 gaps, the chip's 8/14 on a
  // hairline — so the whole branch flows through one `z` switch (the media
  // player's rule) and only four things genuinely differ: the type (below),
  // the card's padding (32 at 768, 30/20 at 390), its tilt (-3° at 768, -1° at
  // 390) and the pill's scale. The includes grid stays **two columns at 390**,
  // which the repertoire's masters did too — it is the master's answer, not the
  // phone's.
  if (s.v1) {
    const desk = !s.narrow
    const z = desk ? 0.82 : 1
    const u = (v) => `${Math.round(v * z * 10) / 10}px`
    // The three masters' type, off `get_variable_defs` — the only source that
    // resolves a master's mode, the emitted CSS printing the desktop default at
    // all three widths. 1440 → 768 → 390, and note `label-xs` (the feature
    // lines) drops hardest of the seven, 20 → 14 → 12.
    const T = desk
      ? { chip: 12, dispMd: 48, dispSm: 40, bodyLg: 16, bodyMd: 14, labelXs: 20, eyebrow: 15, list: 16 }
      : s.mob
        ? { chip: 11, dispMd: 30, dispSm: 26, bodyLg: 15, bodyMd: 13, labelXs: 12, eyebrow: 11, list: 13 }
        : { chip: 11, dispMd: 38, dispSm: 32, bodyLg: 15, bodyMd: 13, labelXs: 14, eyebrow: 12, list: 12 }
    // The card's own four colours, pinned in the view-model rather than taken
    // from the selected package: the hue belongs to the seat, so toggling
    // changes the plan and not the composition.
    const h = s.tierHero
    // The selector's index, clamped — the artist can delete the package the
    // visitor is on, and Publish re-renders a tab that is already open.
    const sel = s.live ? Math.max(0, Math.min(chip, s.tiers.length - 1)) : 0
    const t = s.tiers[sel]

    // Figma strokes an auto-layout frame without growing it, so the frame's
    // 8/14 padding on a 1px border is 1px less each side here (the
    // repertoire's rule) and the chip keeps the height it is drawn at — 28 at
    // 1440's chip 12, 27 at both narrow masters' 11.
    const chipType = {
      fontFamily: s.body, fontWeight: 700, fontSize: u(T.chip), lineHeight: 1,
      // Figma's -6% of the size, so it ramps with the token rather than staying
      // the desktop -0.72.
      letterSpacing: u(-0.06 * T.chip), whiteSpace: 'nowrap',
    }

    const left = (
      <div style={col(u(20), {
        ...(desk ? { flex: '1 1 0', minWidth: 0 } : { width: '100%' }),
        alignItems: 'flex-start',
      })}>
        <span style={chipType}>[ PRICING ]</span>
        <h2 style={{
          margin: 0, fontFamily: s.display, fontSize: u(T.dispMd), lineHeight: 1,
          letterSpacing: s.dls, color: s.ac,
        }}>{s.title}</h2>
        {/* An emptied quote drops the block rather than spending its gap. */}
        {!!s.pricingQuote && (
          <p style={{
            margin: 0, paddingTop: u(12), width: '100%',
            fontFamily: s.body, fontSize: u(T.bodyLg), lineHeight: 1.5, color: s.tx,
          }}>{s.pricingQuote}</p>
        )}
      </div>
    )

    const money = String(t ? t.price : '')
    const symbol = /^[^\d]/.test(money) ? money[0] : ''
    const amount = symbol ? money.slice(1) : money

    const card = (
      <div style={{
        // The wrapper takes the column so the rotation has something square to
        // turn inside; the card itself is content-sized, as the frame's is.
        ...(desk ? { flex: '1 1 0', minWidth: 0 } : { width: '100%' }),
        // The 390 master turns the card a third as far as the other two do.
        transform: tilt(s, s.mob ? -1 : -3),
      }}>
        <div style={{
          background: h.card, color: h.cardFg,
          border: `${s.bw} solid ${h.acc}`, borderRadius: u(30),
          // 32 all round at 1440 and 768; the 390 master pays for its narrower
          // measure out of the sides alone.
          padding: s.mob ? `${u(30)} ${u(20)}` : u(32), overflow: 'hidden',
          ...col(u(30), { alignItems: 'flex-start' }),
        }}>
          {t ? (
            <>
              <div style={col(u(14), { width: '100%', alignItems: 'flex-start' })}>
                {/* Not drawn at one package: there is nothing to select. The
                    seeded three make it three chips where the frame draws two,
                    which is the intended diff. */}
                {s.tiers.length > 1 && (
                  <div style={row(u(8), { flexWrap: 'wrap', width: '100%' })}>
                    {s.tiers.map((p, i) => (
                      <span
                        key={p.n}
                        onClick={s.live ? () => setChip(i) : undefined}
                        style={{
                          ...chipType,
                          border: `1px solid ${h.acc}`, borderRadius: u(8),
                          padding: `calc(${u(8)} - 1px) calc(${u(14)} - 1px)`,
                          background: i === sel ? h.acc : 'transparent',
                          color: i === sel ? h.card : h.acc,
                          cursor: s.live ? 'pointer' : undefined,
                        }}
                      >{p.name}</span>
                    ))}
                  </div>
                )}
                <span style={{
                  fontFamily: s.display, fontSize: u(T.dispSm), lineHeight: 1, letterSpacing: s.dls,
                }}>{t.name}</span>
                <p style={{
                  margin: 0, width: '100%',
                  fontFamily: s.body, fontSize: u(T.bodyMd), lineHeight: 1.5, color: h.cardMut,
                }}>{t.blurb}</p>
                {/* The frame sets a second price where the section has a unit,
                    so `— £2,200/event` is `s.tierUnit` — layout 1's own three
                    spans, in the frame's sizes. */}
                <span style={row(u(6), { alignItems: 'baseline', width: '100%' })}>
                  <span style={{ fontFamily: s.body, fontSize: u(T.bodyLg), lineHeight: 1.5 }}>{symbol}</span>
                  <span style={{
                    fontFamily: s.display, fontSize: u(T.dispMd), lineHeight: 1,
                    letterSpacing: s.dls, color: h.acc,
                  }}>{amount}</span>
                  <span style={{
                    fontFamily: s.body, fontSize: u(T.bodyMd), lineHeight: 1.5, color: h.cardMut,
                  }}>{s.tierUnit}</span>
                </span>
                <span style={row(u(16), { flexWrap: 'wrap' })}>
                  {/* The frame's pill is the cream one with the arrow disc: the
                      card's ink filled, its ground as the type, its second hue
                      as the offset block. Both narrow masters draw the pill at
                      the desktop component's own size — the 46 × 44 disc, the
                      21/5 padding, the 10 gap — so `full` opts the 390 canvas
                      back up out of BookPill's `small` scale, which is the case
                      that prop was added for. The label is the one part that
                      ramps: `size/list` 16 → 12 → 13, where BookPill's own
                      full-scale default (20px) is the *header's* 768 number. */}
                  <BookPill s={s} to={s.tierBookTo} glyph="arrow"
                            full={!desk} disc={desk ? 36 : 44}
                            size={desk ? undefined : u(T.list)}
                            bg={h.cardFg} fg={h.card} shadow={h.acc} />
                </span>
              </div>

              {/* The frame rules the card in ink. That vanishes on the palette's
                  own near-black card, which six packages reach, so the rule is
                  the card's second hue — the one colour computed to separate
                  from the ground it sits on. */}
              <span style={{ width: '100%', height: '1px', background: h.acc, flex: 'none' }} />

              <div style={col(u(12), { width: '100%', alignItems: 'flex-start' })}>
                <span style={chipType}>WHAT&rsquo;S INCLUDED</span>
                {/* One grid rather than the enquiry form's paired rows: the
                    frame spaces the two columns by 24 and the rows by 10, and a
                    grid carries two different gaps on its own. An odd count
                    trails one half-width cell, the pricing deck's rule.
                    The frame's own last four features are set a register
                    smaller than its first four — a Figma artefact, not a
                    design — so every feature takes the label face.
                    Two columns at every width: the 390 master keeps them at
                    153px apiece, which is the repertoire's "the masters can
                    keep a grid a phone has no business with". */}
                <div style={{
                  display: 'grid', width: '100%', alignItems: 'start',
                  gridTemplateColumns: '1fr 1fr',
                  columnGap: u(24), rowGap: u(10),
                }}>
                  {t.feats.map((f, i) => (
                    <span key={i} style={row(u(8), { minWidth: 0 })}>
                      <span style={{ ...chipType, color: h.acc, flex: 'none' }}>+</span>
                      <span style={{
                        fontFamily: s.body, fontSize: u(T.labelXs), lineHeight: 1.26, minWidth: 0,
                      }}>{f}</span>
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // The card is the composition, so an emptied list keeps it and
            // prints layout 1's one message inside — the testimonials' rule.
            <span style={{
              fontFamily: s.body, fontSize: u(T.bodyMd), lineHeight: 1.5, color: h.cardMut,
            }}>No packages yet.</span>
          )}
        </div>
      </div>
    )

    return (
      <div style={col(u(24))}>
        <div style={{
          ...(desk ? row(u(48), { alignItems: 'flex-start' }) : col(u(32))),
          width: '100%',
        }}>{left}{card}</div>
        {/* The frame sets the small print in the text colour at body-bold,
            where layout 1 has it in `pricingSubFg`'s warm grey. */}
        <span style={{
          fontFamily: s.body, fontWeight: 700, fontSize: u(T.eyebrow), lineHeight: 1.3, color: s.tx,
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
      // `fill` is the ends' own colour, `idle` every other unselected button's.
      // Both default to transparent, so the sheet or the page shows through and
      // every caller written before `idle` existed is untouched — the
      // repertoire's layout 2 is the first frame to step its idle buttons off
      // the ground they stand on.
      background: on ? s.pillBg : (ends ? (fill || 'transparent') : (frame.idle || 'transparent')),
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

  // v1 — Repertoire layout 2 · Mobile list
  // (Figma 964:64646 at 1440, 984:35876 at 768, 984:35961 at 390)
  //
  // A phone's song list blown out to the page: a sheet running the full width
  // of the section, an ink rule under its head, then the songs as plain rows
  // — number, title, artist — each closed by its own rule, in two columns
  // parted by a vertical one. Under them a row of seven wide olive-outlined
  // buttons is the pager. No card, no checkerboard, no tear, no grain: a scan
  // of the frame's ground and of a row gives a standard deviation of 0, so
  // this is the second layout-2 frame with no texture at all.
  //
  // This is the second **full-bleed** composition after the header (§10.2) —
  // the rules and the sheet run to the section's own edges, past the root's
  // padding. It gets there without touching the root's `bleed` flag: the sheet
  // is a block with `bleedTo`'s own negative margins, so the diff stays inside
  // this section and the root goes on painting the page ground behind it. The
  // frame's cream is box/1 `#FAECD5`, a shade deeper than the `#FBF6EA` that
  // layout 1 stands on, so widening the root's `cream` flag would have been
  // the wrong cream anyway.
  //
  // The desktop inset is `s.gPad` all round (+ `s.surplus` horizontally),
  // which is HeaderV0's rule for the same reason: past the canvas the frame was
  // drawn at, the sheet keeps bleeding while its content stays on the page's
  // measure. At desktop `gPad` is 46, which is exactly the frame's own 56 ×
  // 0.82 — the two agree there, unlike `padX`'s 64, and they stop agreeing at
  // both narrow widths (see `padH` below).
  //
  // Everything else is the frame being drawn × `z` through `u()` — 0.82 on the
  // 1180 canvas and the identity on the two narrow ones. Three readings that
  // are not transcriptions:
  //
  //  - The heading is `s.title`, not the frame's literal "Repertoire". Layout 1
  //    sets that word as an eyebrow *over* the heading; layout 2 has one
  //    display line, and giving it to the literal would leave the section's
  //    heading field editing nothing here — the calendar's `cta` and the form's
  //    `email` before this pass got to them. On the seed it reads "12 Songs".
  //  - Each frame's row height is what its own `flex-1` division of a fixed
  //    list landed on — 84.2 of 421 at 1440, 82.6 of 413 at 768, 58 of 290 at
  //    390 — and our list has no height to divide (the video panel's lesson).
  //    Each is pinned at its master's number instead, so the picture holds at
  //    any count and a short last page simply makes the sheet shorter.
  //  - The 1440 frame's right-hand column is the phone component instanced a
  //    second time, so it carries the phone's own 20px insets on *both* sides —
  //    which would leave the right column's type 20px off the window edge where
  //    everything else on the page is 46. The 20 is kept as the *interior*
  //    inset, either side of the divider, and both outer edges take `gPad`.
  //    Nothing moves in the picture: the info block is `flex: 1` and its text
  //    is left-aligned, so the right padding only decides where a long title
  //    is clipped. The narrow masters need none of this — they repeat their
  //    own page inset on all four sides of both columns, and it is small
  //    enough that the seam is not worth reading past.
  if (s.v1) {
    const desk = !s.narrow
    const tab = isTablet(s)
    // The 768 (`984:35876`) and 390 (`984:35961`) masters are the *desktop*
    // composition at its own numbers — the same head, the same two columns of
    // five and the same seven-slot pager — so the scale below is the identity
    // on both narrow canvases where the 1440 frame lands on the 1180 one at
    // × 0.82. One switch then carries nearly every box in the branch.
    //
    // What the masters do move is the type, and `get_variable_defs` resolves
    // each mode's tokens outright rather than leaving them to be measured off
    // a render: `size/display-sm` 40 → 32 → 26, `size/list` 16 → 12 → **13**
    // (up again at 390, where the column is 195 wide against 768's 384),
    // `size/body-md` 14 → 13 → 13, and `size/body-sm` 12 at all three.
    // `border/default` is 3 at both narrow widths, which is the desktop 2.5
    // unscaled — so the rule below goes through the switch as well.
    const z = desk ? 0.82 : 1
    const u = (v) => `${Math.round(v * z * 10) / 10}px`
    const bw = s.retro ? u(3) : s.bw
    // The sheet and its ink. Retro's own `paper` IS the beige page ground, so
    // the cream is the literal box/1 again; the flat four have a real second
    // paper and take it, with `paperFg` for the ink, because `s.tx` is chosen
    // against the page and need not read on the sheet.
    const sheet = s.retro ? '#FAECD5' : s.paper
    const ink = s.retro ? '#111111' : s.paperFg
    // Olive: the pager's outline and the type in its unselected buttons. The
    // media player's rule decides the flat four — `repHue` is `legible()` and
    // every soft tint in the palette (`soft2`, `muted`, `line2`) is computed
    // against the PAGE, so on Grunge's white sheet over a black page the whole
    // pager came back white on white. `paperFg` and `paperLine` are the two
    // that read on a `paper` surface, so those are what the sheet takes.
    const hue = s.retro ? s.repHue : s.paperFg
    // The frame steps the pager's idle buttons one register brighter than the
    // sheet they stand on — `#FBF6EA` on `#FAECD5` — and washes its two arrows
    // in the accent at 27% over that cream, a different blush from the one
    // layout 1 reserves. Neither has an equivalent away from Retro: the sheet
    // already IS `paper`, and there is no tint of it in the palette, so the
    // flat four keep Pager's transparent default on both and read as an
    // outlined row with only the current page filled.
    const idle = s.retro ? '#FBF6EA' : undefined
    const blush = s.retro ? '#ECBFA3' : undefined
    const pageFg = s.retro ? '#FBF6EA' : undefined
    // The selected chip's type is the page's own beige, sampled off the render
    // and confirmed by the frame's `sem/bg` token. It is deliberately NOT the
    // cream the bio's note says Retro's chips take on every hue: that held for
    // the bio's and the header's frames, and this one contradicts it.
    const chipFg = s.retro ? s.bg : s.acFg
    // The page inset. The three frames' own is 56 → 30 → 10, and only the
    // desktop one has a ramp token that matches it (`gPad` 46 = 56 × 0.82):
    // at 768 `gPad` is 32 against the master's 30 and at 390 it is 20 against
    // 10, so the two narrow numbers are the masters' verbatim and are
    // deliberately NOT `s.gPad`. The 10 is what leaves the 390 row's info block
    // its 155px, and Fraunces runs ~1.3× the frame's Soulway at this size, so
    // it is the width the titles can least afford to give back.
    // Horizontally it also carries `surplus`, so a window wider than the canvas
    // widens the sheet and not the measure.
    const padH = `calc(${s.surplus} + ${desk ? s.gPad : u(tab ? 30 : 10)})`
    // The two vertical insets, which the masters part company over where the
    // 1440 frame draws one 56 all round: 60 above the head and 60 around the
    // pager at 768, but 40 and 20 at 390.
    const headPadY = desk ? s.gPad : u(tab ? 60 : 40)
    const footPadY = desk ? s.gPad : u(tab ? 60 : 20)
    // The row's own height. Every master divides a stated list height between
    // rows that are `flex: 1 0 0`, so these three are division results rather
    // than numbers the frames state — 5 × 82.6 = the 768 list's 413, 5 × 58 =
    // the 390 list's 290. We have no height to divide (the list is what makes
    // the section tall), so each is pinned at what its own master landed on.
    const rowH = u(desk ? 84.2 : tab ? 82.6 : 58)
    // Ten to a page — five rows in each of two columns. **Both narrow masters
    // keep the two columns**, at 384 and 195, rather than collapsing to one:
    // the unfitted fallback this replaces dropped to a single column of six,
    // which is what layout 1's narrow masters do and not what either of these
    // draws — 195 is a tight column, and it is the one they chose. The seeded
    // twelve songs
    // therefore make two pages at every width, so the reference picture gains a
    // working pager where the frames draw a fictional twenty; that is the
    // events map's rule, the row being derived from the list.
    const perPage = 10

    const active = s.live ? Math.min(chip, s.repChips.length - 1) : 0
    const needle = q.trim().toLowerCase()
    const eq = (a, b) => a.toLowerCase() === b.toLowerCase()
    const hit = (t) => (
      (active === 0 || t.tags.some((g) => eq(g, s.repChips[active].tag)))
      && (!needle || t.title.toLowerCase().includes(needle) || t.artist.toLowerCase().includes(needle))
    )
    const filtered = s.live ? s.songs.filter(hit) : s.songs
    const pages = Math.max(1, Math.ceil(filtered.length / perPage))
    const pg = Math.min(page, pages - 1)
    const shown = filtered.slice(pg * perPage, (pg + 1) * perPage)
    // Layout 1's split: the page runs DOWN each column, the remainder falling
    // to the left one, so a part-filled page keeps both columns standing and
    // the divider between them keeps its full height.
    const half = Math.ceil(shown.length / 2)
    const columns = [shown.slice(0, half), shown.slice(half)]
      .map((cs, ci) => cs.map((t, i) => ({ ...t, n: pg * perPage + ci * half + i + 1 })))
    // `false`, not `s.mob`: `pageWindow`'s narrow mode keeps three numbered
    // buttons, which is what layout 1's own 390 master draws. This composition
    // draws the *desktop* row at both narrow widths — the 390 master's seven
    // buttons are the 768 one's seven — and it fits, because they divide the
    // measure and simply land at 46 where 768 lands at 94.
    const { labels, at } = pageWindow(pages, pg, false)

    const chipRow = (
      <div style={row('0', {
        // The frame's own padding less the border it draws inside it, layout
        // 1's rule: Figma strokes an auto-layout frame without growing it, so
        // a border-box 6 + 3 would stand the pill 5px taller than its 41.
        border: `${bw} solid ${ink}`, borderRadius: '999px',
        padding: `calc(${u(6)} - ${bw})`,
        flexWrap: 'wrap', rowGap: u(6), minWidth: 0,
      })}>
        {/* The artist's tags, behind the `All` that clears them — so the frame's
            three modes are four here, the pricing deck's intended diff. */}
        {s.repChips.map((f, i) => (
          <span
            key={i}
            onClick={s.live ? () => { setChip(i); setPage(0) } : undefined}
            style={{
              padding: `${u(6)} ${u(14)}`, borderRadius: '999px',
              background: i === active ? s.ac : 'transparent',
              color: i === active ? chipFg : ink,
              // The calendar's rule: the cursor is read off the handler, so the
              // canvas's picture of a chip does not claim to be a control.
              cursor: s.live ? 'pointer' : undefined,
              fontFamily: s.body, fontSize: u(12), lineHeight: 1.4, whiteSpace: 'nowrap',
            }}
          >{f.label}</span>
        ))}
      </div>
    )

    const searchType = {
      fontFamily: s.body, fontSize: u(desk ? 14 : 13), lineHeight: 1.5, color: ink,
    }
    const searchBox = (
      <div style={row(u(8), {
        border: `${bw} solid ${ink}`, borderRadius: '999px',
        // The frame's own 10px vertical padding is dropped: its 41px height
        // already leaves the 21px line less room than it needs, and the frame
        // clips the difference. Centring in the stated height draws the same
        // pill without asking the box to overflow.
        padding: `0 ${u(20)}`, height: u(41),
        // 380 at 1440 and at 768 alike — the 768 master leaves it beside the
        // toggle in a `space-between` row and pays for it out of the gap. Only
        // 390, where the two stack, gives it the whole measure.
        width: s.mob ? '100%' : u(380),
        flex: s.mob ? undefined : `0 1 ${u(380)}`,
        minWidth: 0, overflow: 'hidden',
      })}>
        <Search size={desk ? 13 : 15} style={{ flex: 'none' }} />
        {/* Layout 1's seam, unchanged: a real field on the published page and
            the same span it has always been on the canvas, both carrying the
            frame's type so the head does not move when the page is published. */}
        {s.live ? (
          <input
            value={q} placeholder="Search songs or artists…"
            onChange={(e) => { setQ(e.target.value); setPage(0) }}
            style={{
              ...searchType, flex: 1, minWidth: 0,
              border: 'none', outline: 'none', background: 'transparent', padding: 0,
            }}
          />
        ) : (
          <span style={{ ...searchType, whiteSpace: 'nowrap' }}>Search songs or artists…</span>
        )}
      </div>
    )

    return (
      <div style={{
        // The sheet: out to the section's own edges, past the root's padding,
        // which is what makes the rules below run the full width of the page.
        margin: `calc(-1 * ${s.padY}) calc(-1 * ${s.padX})`,
        background: sheet, color: ink,
        // The frame closes the whole composition on a hairline rather than on
        // the 3px the rows carry.
        borderBottom: `1px solid ${ink}`,
      }}>
        <div style={col(u(12), {
          // The rule each frame paints at the head's foot sits *inside* its own
          // inset, so the padding gives the border back — the toggle's rule
          // again, and the reason the two narrow heads measure their masters'
          // 205 and 210 to within the chip's own line-box rounding.
          padding: `${headPadY} ${padH} calc(${headPadY} - ${bw})`,
          borderBottom: `${bw} solid ${ink}`,
        })}>
          <h2 style={{
            margin: 0, fontFamily: s.display, fontSize: u(desk ? 40 : tab ? 32 : 26),
            lineHeight: 1, letterSpacing: s.dls, color: s.ac,
          }}>{s.title}</h2>
          <div style={row(u(16), {
            // Stacked at 390, the column direction IS the row gap, so the
            // master's own 10 has to be set here and not in the 16 above —
            // which reaches the wrapped second line of chips at the other two
            // widths and nothing at this one.
            justifyContent: 'space-between', flexWrap: 'wrap', rowGap: u(s.mob ? 10 : 12),
            flexDirection: s.mob ? 'column' : 'row',
            // Stacked, the toggle keeps its content width — the 390 master
            // draws it at 217 in a 370 row and gives the whole measure to the
            // search box under it, which carries its own `width: 100%`.
            alignItems: s.mob ? 'flex-start' : 'center',
          })}>
            {chipRow}
            {searchBox}
          </div>
        </div>

        {shown.length === 0 ? (
          <div style={{
            height: rowH, padding: `0 ${padH}`, borderBottom: `${bw} solid ${ink}`,
            display: 'flex', alignItems: 'center',
            // `muted` is 64% of the page's own text colour, so it is the same
            // wrong token as `repHue` above on a sheet the page did not choose.
            fontFamily: s.body, fontSize: u(12),
            color: s.retro ? s.muted : s.paperLine,
          }}>{s.songs.length === 0 ? 'No songs yet.' : 'No songs match that.'}</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {columns.map((colSongs, ci) => (
              <div key={ci} style={{
                minWidth: 0,
                // Dropped when the second column is empty — a one-song page
                // should not part the sheet down the middle. The columns
                // stretch to the taller of the two, so an odd count leaves the
                // divider full height, the way the frame draws it.
                borderRight: ci === 0 && columns.length > 1 && columns[1].length
                  ? `${bw} solid ${ink}` : undefined,
              }}>
                {colSongs.map((t) => (
                  <div key={t.n} style={row('0', {
                    height: rowH, overflow: 'hidden',
                    borderBottom: `${bw} solid ${ink}`,
                    // The 1440 frame insets the pair of columns by its own 56
                    // and parts them by 20 either side of the divider; both
                    // narrow masters simply repeat their page inset on all four
                    // sides of both columns, so at 768 and 390 the inner
                    // padding is the outer one.
                    paddingLeft: ci === 0 || !desk ? padH : u(20),
                    paddingRight: ci === 0 && desk ? u(20) : padH,
                  })}>
                    {/* The frame lets the number size itself and spends a 14px
                        gap after it — 20px in all for a single digit. Pinned at
                        that 20 instead, with the gap folded in: the title lands
                        exactly where the frame puts it, and a two-digit number
                        no longer shunts its own row's title to the right. */}
                    <span style={{
                      width: u(20), flex: 'none',
                      fontFamily: s.body, fontSize: u(12), lineHeight: 1.4,
                    }}>{t.n}</span>
                    <span style={col(u(2), { flex: 1, minWidth: 0 })}>
                      {/* Literal sizes, not `s.title`: the view-model's content
                          `title` shadows the RAMP size of that name. */}
                      <span style={{
                        // `size/list`, the one token here that does not run
                        // down the widths: 16 → 12 → **13**. The 390 mode sets
                        // it a point larger than the 768 one even though its
                        // column is 195 against 384 — a phone's floor, not a
                        // measure — so do not "fix" it into a ramp. The
                        // rendered set widths say the same thing as the token
                        // (43 → 47 for "Valerie", a ratio of 13/12).
                        fontFamily: s.display, fontSize: u(desk ? 16 : tab ? 12 : 13),
                        lineHeight: 1.2, letterSpacing: s.dls,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>{t.title}</span>
                      <span style={{
                        fontFamily: s.body, fontSize: u(12), lineHeight: 1.4,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>{t.artist}</span>
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* The frames' seven buttons divide the whole measure, so the row is
            `grow` and the count is the pager's own — 94.3 wide at 768 and 46 at
            390, both of them that master's measure less six 8px gaps. At one
            page `pageWindow` returns nothing and the row goes with it — the
            pager's rule — but the foot inset stays, or the sheet would end
            flush on the last row's rule; it drops to the band's own inset
            rather than keeping the band a vanished row of buttons was sitting
            in. */}
        <div style={{ padding: labels.length > 0 ? `${footPadY} ${padH}` : `0 0 ${footPadY}` }}>
          {labels.length > 0 && (
            <Pager s={s} colour={hue} fill={blush} frame={{
              size: desk ? 44.3 : 54, radius: u(20), bw,
              idle, activeFg: pageFg,
              // The frame outlines the current page in the same olive as the
              // rest. The flat four cannot: `pillBg` is the palette's lightest
              // tag hue and `paper` is its lightest colour outright, so on
              // Grunge they are the same white and the filled button vanishes
              // into the row. The accent on the edge is what marks it there —
              // Pager's own `activeFg` still contrasts against the fill.
              activeEdge: s.retro ? hue : s.ac,
              font: labelStyle(s, u(12), { letterSpacing: 0 }),
              grow: true, justify: 'center', pages: labels, active: at,
              onPage: s.live ? (label) => setPage(Number(label) - 1) : undefined,
              onStep: s.live
                ? (dir) => setPage(Math.max(0, Math.min(pages - 1, pg + dir)))
                : undefined,
            }} />
          )}
        </div>
      </div>
    )
  }

  // Layouts 3+ — the generic flat design. `NVAR.repertoire` is 2, so nothing
  // reaches this today; it is what a third layout would render until it is
  // fitted, which is why the two-column list below is no longer gated on `v1`.
  return (
    <div>
      <h2 style={{ margin: '0 0 30px', ...h2Style(s) }}>{s.title}</h2>
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

  // v1 — Gallery layout 2 · Split showcase (Figma 964:64647, 1440 × 675;
  // 984:36046, 768 × 468; 984:36070, 390 × 364): one hero photograph with a
  // caption pill in its bottom-left corner, and beside it a two-column masonry
  // of six more. The strip reads as if it ran on past the section band — the
  // first tile in each column drops its top border and top rounding, the last
  // drops its bottom pair — so the six are a crop of a longer wall rather than
  // a closed block.
  //
  // Seven photographs for the section's seven slots, which is what makes this
  // frame fit the gallery without inventing anything: the hero is a **seat**,
  // not slot 0. The slots rotate through the seven seats, wrapping, so the
  // hero seat always holds the one the visitor is on and the other six follow
  // it in order — the media player's fanned carousel rule verbatim (CLAUDE.md,
  // "Layout 2 plays through the same hooks"). Geometry belongs to the seat,
  // so the composition never reshuffles its shapes; only which photograph
  // stands in each. On the canvas that puts `galActive()` — slot 3 — in the
  // hero, which is deliberately the same photograph layout 1's viewer opens on.
  //
  // Clicking a tile is `pick`, the state layout 1 already owns, so the two
  // layouts share one seam and the published tab's first paint is the canvas's
  // picture by construction (`pick` starts at -1: nothing chosen).
  //
  // What the frame draws and this does not: nothing. What the *section* has and
  // the frame has no room for: the heading is the caption pill's first line
  // (its own row at 768 — below) and the four media-source rows are gone, three
  // of them outbound links. That is the media player's Soundcloud call three
  // times over — see LAYOUT-2-PLAN's open questions. The frame's own two lines,
  // `MTV "MOOD SWING"` and `FEATURED REEL`, are named here so the call can be
  // reversed: both are claims about the artist (an MTV feature, a reel) that no
  // field backs, the video section's rule, so the pill takes `s.title` over
  // `s.brand` instead — two strings the artist owns, reading as a caption
  // credit on a photograph.
  //
  // Desktop numbers are the 1440 frame × 0.82 (§5.5) through `u()`; the two
  // narrow masters are used verbatim, which is the `z` switch inside it (the
  // media player's rule). The frame's own inset — 56/46 at 1440, 30 at 768,
  // 20/40 at 390 — is dropped for the page root's own padding, so the pair
  // spans the content width (1052 / 688 / 346) and not the frame's. The 37px
  // goes out of the *hero*, because that is the frame's own mechanism — its
  // right block is `shrink-0 w-[520px]` and its hero `flex-1` — and a hero is a
  // photograph, which simply crops. The row's height is pinned at the frame's
  // 583 / 392 / 284 (the repertoire's rule: pin what the frame lets flow when
  // the frame's own `h-full` has nothing here to divide), and each tile takes
  // its share of it as a `flex-grow`, so the six heights divide exactly as the
  // frame's do at any canvas.
  //
  // Neither narrow master stacks — both are the same hero-beside-strip row — so
  // `z` carries nearly all of it and only four things genuinely differ:
  //
  //  · **768 unhides the component's head row**, which the desktop master
  //    carries `hidden` (Figma 436:863) and the 390 sub-component does not have
  //    at all. It is the only slot this design has for the section's heading,
  //    so `s.title` moves up into it there and the caption pill keeps the
  //    artist's name alone — each field allocated exactly once, the events
  //    map's rule. The row's own "View list" and "✕" are dead controls and are
  //    dropped, named here so the call can be reversed; what is left is the
  //    label, in the frame's own 20px row so the band below stays 358.
  //  · **The 390 rail rounds its tiles at 10** where every other tile on the
  //    page rounds at 30. They still drop the first tile's top border and the
  //    last tile's bottom one, so the "runs on" reading survives the radius —
  //    only the corners it is drawn with change.
  //  · **The 768 master hides two of the six photographs, and that is an
  //    artefact.** Its third tile in each column is `flex: 1 0 0` under two
  //    tiles still carrying the desktop component's own heights (123/215,
  //    194/242 against a 358 band), so the fill has nothing left and Figma
  //    squeezes it to `min-h-px`. That is `figma-frame-reading`'s leaked-number
  //    case, and honouring it would leave two seats of the rotation invisible
  //    and unclickable. The band is divided in the frame's proportions instead
  //    — which is what this branch already does at every width.
  //  · **The 390 rail seats ten tiles at 48.8**, all of them `flex: 1 0 0`: the
  //    count is what divides the height there, so the section's six stand at
  //    (284 − 20) / 3 = 88 by the master's own mechanism rather than by a ramp.
  if (s.v1) {
    const desk = !s.narrow
    const tab = isTablet(s)
    const z = desk ? 0.82 : 1
    const u = (v) => `${Math.round(v * z * 10) / 10}px`
    // The frame draws hairlines, not the theme's own stroke: 1px in ink round
    // the hero (`scheme/1/stroke/1`) and 1px in the accent round every tile
    // (`sem/text/1`). Both tokens are palette values on Retro — #111 is `s.tx`
    // and #C8461C is `s.ac` — so this branch needs no literal hex at all, and
    // the flat four take their own two colours without a fallback pair.
    const bw = s.retro ? '1px' : s.bw
    const r = u(s.mob ? 10 : 30)
    const seats = 7
    const active = s.live && pick >= 0 ? pick : galActive(s)
    const slot = (k) => (active + k) % seats

    // The masonry, column by column, in the heights the frame draws. Their
    // sums are equal by construction (563 + two 10px gaps = 583), which is what
    // lets both columns be pure `flex-grow` against one pinned height. The 390
    // master's are equal instead — its ten tiles are all `flex: 1 0 0` — so the
    // six divide the 284 band three to a column.
    const COLUMNS = s.mob ? [[88, 88, 88], [88, 88, 88]] : [[123, 215, 225], [194, 242, 127]]
    const edge = `${bw} solid ${s.ac}`
    const grid = (
      <div style={{
        ...(desk ? { width: u(520), flex: 'none', height: '100%' }
          : tab ? { flex: '1 1 auto', minHeight: 0, width: '100%' }
          : { width: u(83), flex: 'none', height: '100%' }),
        ...row(u(10), { alignItems: 'stretch' }),
      }}>
        {COLUMNS.map((hs, ci) => (
          <div key={ci} style={col(u(10), { flex: '1 1 0', minWidth: 0, height: '100%' })}>
            {hs.map((h, i) => {
              const seat = 1 + ci * hs.length + i
              const first = i === 0
              const last = i === hs.length - 1
              return (
                <div
                  key={i}
                  onClick={s.live ? () => setPick(slot(seat)) : undefined}
                  style={{
                    // The frame's own height is the basis, so on the canvas the
                    // three are exactly it and the column's free space is nil;
                    // grow and shrink then divide any surplus in the frame's
                    // own proportions, which is what carries the composition to
                    // a canvas whose grid is taller or shorter. A `0` basis
                    // would not: `border-box` floors such an item at its own
                    // border, which is not proportional and lands each tile up
                    // to 0.6px off the frame — Figma strokes inside the 123 it
                    // states (the repertoire's rule), so the height already
                    // carries the hairline.
                    //
                    // `minHeight: 0` with `overflow: hidden`, or the <img>
                    // inside would floor the item at its intrinsic height and
                    // blow the column open (the video panel's thumbnail bug).
                    flex: `${h} 1 auto`, height: u(h), minHeight: 0, overflow: 'hidden',
                    position: 'relative',
                    borderLeft: edge, borderRight: edge,
                    borderTop: first ? 'none' : edge,
                    borderBottom: last ? 'none' : edge,
                    // The 390 rail rounds every tile whole; the two wider
                    // masters square off the corners the dropped border would
                    // have run through.
                    borderRadius: s.mob ? r : first ? `0 0 ${r} ${r}` : last ? `${r} ${r} 0 0` : r,
                    cursor: s.live ? 'pointer' : undefined,
                  }}
                >
                  <span style={{ position: 'absolute', inset: 0 }}>
                    {/* Placeholder initials only — the frames are photographs
                        throughout, and Retro seeds them. The three sizes are
                        the tile's own width read off each master. */}
                    <Photo s={s} initialsSize={desk ? 26 : tab ? 20 : 10} src={s.images[slot(seat)]} />
                  </span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )

    // The head row, 768's alone: the frame's own label slot, holding the
    // heading the two other masters put in the caption pill's first line. The
    // 20 is the frame's — its own row is that tall because of the ✕ we drop —
    // and keeping it is what leaves the band below at the master's 358.
    const head = tab && s.title ? (
      <div style={{ flex: 'none', height: u(20), display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <span style={{
          fontFamily: s.body, fontWeight: 700, fontSize: u(11), lineHeight: 1,
          letterSpacing: u(-0.66), color: s.tx,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{s.title}</span>
      </div>
    ) : null

    // The caption. Each line is rendered or not rather than printed blank (the
    // testimonials' rule), and with neither string the pill goes with them: a
    // wordless block over a photograph is not one of the design's states. At
    // 768 the heading has the head row above, so only the artist's name is
    // left here — the pill is one line there by allocation, not by truncation.
    const lines = (tab ? [s.brand] : [s.title, s.brand]).filter(Boolean)
    const caption = lines.length > 0 && (
      <div style={{
        position: 'absolute', left: u(40), bottom: u(40),
        // The frame sets the two lines `nowrap`; bounded here and clipped per
        // line, so a long heading ends in an ellipsis inside the hero rather
        // than running out under its own clip.
        maxWidth: `calc(100% - ${u(80)})`,
        background: s.chips[0].bg,
        // Ink on the purple, which is what the frame sets and what the bio's
        // "Retro's chips are cream on every hue" note does not cover — the
        // repertoire's frame already contradicted it once. The flat four take
        // the chip's own computed foreground, which is guaranteed against it.
        color: s.retro ? s.tx : s.chips[0].fg,
        borderRadius: u(4), padding: `${u(10)} ${u(14)}`,
        ...col(u(4), { alignItems: 'flex-start' }),
      }}>
        {lines.map((t, i) => (
          <span key={i} style={{
            maxWidth: '100%',
            // The frame's own body face at chip size, not the label face: this
            // pill is set in Inter Bold where layout 1's corner block is Anton.
            // `size/chip` is 12 on the 1440 master and 11 on both narrow ones —
            // the one token here that is not the desktop number verbatim, so it
            // is read off `get_variable_defs` rather than left to `z`.
            fontFamily: s.body, fontWeight: 700, fontSize: u(desk ? 12 : 11), lineHeight: 1,
            textTransform: 'uppercase', letterSpacing: u(desk ? -0.72 : -0.66),
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{t}</span>
        ))}
      </div>
    )

    return (
      <div style={row(u(s.mob ? 14 : 24), {
        alignItems: 'stretch', height: u(desk ? 583 : tab ? 392 : 284),
      })}>
        <div style={{
          position: 'relative', overflow: 'hidden', minWidth: 0,
          // The hero rounds at 30 on all three masters; only the 390 rail's
          // tiles drop to 10, so this is not `r`.
          border: `${bw} solid ${s.tx}`, borderRadius: u(30),
          flex: '1 1 0', height: '100%',
        }}>
          <span style={{ position: 'absolute', inset: 0 }}>
            <Photo s={s} initialsSize={desk ? 52 : tab ? 34 : 26} src={s.images[active]} />
          </span>
          {caption}
          {/* Last, the way the frame paints it: the sheet crosses the caption
              too, and lifts its ink off #111 by a few points. */}
          <Grain s={s} exact blend="lighten" opacity={0.29} />
        </div>
        {/* Only 768 wraps: the head row is its alone, and an extra element in
            the desktop tree would move every row of the geometry digest. */}
        {tab ? <div style={col(u(14), { flex: '1 1 0', minWidth: 0, height: '100%' })}>{head}{grid}</div> : grid}
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

  // v1 — Booking Calendar layout 2 · Bold slot list, one composition across
  // three frames: the 768 (986:10607) and 390 (986:10800) masters verbatim, the
  // 1440 one (964:64650, 1328 × 896 on the page) on the 1180 canvas at × 0.82,
  // which is the whole of `z` below. A rust head carrying the artist's mark,
  // the booking flow's own links and the section heading, over a cream table of
  // named slots, over a foot that names the one the visitor is on.
  //
  // Where layout 1 offers a month and lets the visitor find a free day in it,
  // this offers the four the artist is selling. The rows are `s.calSlots`, but
  // the two designs share the whole of the section's live seam: `sel` is the
  // same ISO date — it names a day, not a row, so a slot deleted under it does
  // not slide the pick sideways — `s.calPick` cues the same opening date, and
  // `booked` strikes a slot through here as it does a cell there. `mi` reaches
  // nothing: this design has no month to turn.
  //
  // The 768 master is the desktop composition at its own unscaled numbers —
  // every box in it (the 40/28/36 head, the 18 column head, the 16 rows, the
  // 30 corner, the 100 foot, the pill's 54) is the 1440 frame's own value, and
  // only the type ramps. The 390 one re-sets three things and only three: it
  // pads by 10 rather than 40, it stacks each row's mark over its weekday, and
  // its column head becomes the two ends of one row.
  if (s.v1) {
    const desk = !s.narrow
    const z = desk ? 0.82 : 1
    const u = (v) => `${Math.round(v * z * 10) / 10}px`
    // The type ramp, off `get_variable_defs` on all three masters rather than
    // measured — every one of these comes back in the emitted CSS as the
    // desktop default. `list` is the pill's label and goes 16 → 12 → **13**:
    // non-monotonic, like the repertoire's, and with no column-width reason
    // behind it either, so the values are recorded and the cause left alone.
    const T = desk
      ? { bodyLg: 16, bodySm: 12, bodyMd: 14, labelXs: 20, dispMd: 48, dispLg: 96, chip: 12, list: 16 }
      : s.mob
        ? { bodyLg: 15, bodySm: 12, bodyMd: 13, labelXs: 12, dispMd: 30, dispLg: 40, chip: 11, list: 13 }
        : { bodyLg: 15, bodySm: 12, bodyMd: 13, labelXs: 14, dispMd: 38, dispLg: 60, chip: 11, list: 12 }
    // The width the date column is pinned at, and it is measured rather than
    // transcribed: the frames' own head states 330 at 1440 and again at 768,
    // which is what Soulway needs for "JUN 12", where Fraunces is wider — so
    // the pin is the widest mark this design can draw at each master's display
    // size (`MAR 09`, 304.6 rendered at 1440's 96 and 232.3 at 768's 60, and
    // wider than any of the flat four's display faces at both). Under it the
    // weekdays go ragged again. The 390 master stacks the two, so there is no
    // second column to line up and no pin.
    const dateCol = s.mob ? undefined : u(desk ? 372 : 233)
    const padX = u(s.mob ? 10 : 40)
    // The rows' gap is the 66 all three frames put between a mark and its
    // weekday. At 390 the only row left holding two ends is the column head,
    // which the master spaces apart rather than gapping, so the number is a
    // minimum there and nothing more.
    const gap = u(s.mob ? 12 : 66)

    // The frame's panel is the literal cream, which under Retro is *not*
    // `paper`: this palette's lightest colour is the page ground itself, so
    // paperOf() returns the beige the panel stands on (the repertoire's rule,
    // where widening the root's `cream` flag would also have been the wrong
    // cream). The flat four take their own `paper` — and an outline with it,
    // because a palette whose lightest colour IS its background would otherwise
    // draw this card as a hole in the page.
    const panel = s.retro ? '#FBF6EA' : s.paper
    const ink = s.retro ? s.tx : s.paperFg
    const rule = s.retro ? s.tx : s.paperLine
    // Muted, not struck alone: a blocked slot has to read as unavailable before
    // it is read at all. `muted` is rgba(tx) and vanishes on a panel whose ink
    // is not tx, so the flat four take the panel's own half-tone.
    const gone = s.retro ? s.muted : s.paperLine
    // Retro's chips are cream on every hue (the bio's note), and the head is
    // the accent.
    const headFg = s.retro ? '#FBF6EA' : s.acFg
    // The frame rules the head in olive — a tag colour, which on the flat four
    // is an arbitrary hue that can be the accent itself. They take a wash of
    // the head's own type instead.
    const headRule = s.retro ? s.chips[3].bg : s.acFg25
    // The column heads are the accent on the panel, which is not guaranteed to
    // separate from it (Lime's is acid green on pale lime), so the flat four
    // keep the panel's ink.
    const hue = s.retro ? s.ac : s.paperFg

    // The pick, exactly as layout 1 resolves it: the visitor's date once the
    // page is live, else the one the artist cued. A booked slot is never
    // picked — publishing again re-renders the open tab, so the artist can
    // block the date a visitor had lit.
    const want = (s.live && sel) || s.calPick
    const hit = want ? s.calSlots.find((sl) => sl.iso && sl.iso === want) : null
    const cur = hit && !hit.booked ? hit.iso : ''
    const line = cur ? hit.line : s.calPrompt

    // The head's link list. `s.calFlow` is CTA_TARGETS.book resolved against
    // the page, this section first and dotted; a link is keyed on its label,
    // the header's rule, and the current one is a span because it would only
    // scroll the visitor to what they are reading.
    const flow = (
      <div style={col(u(4), { alignItems: 'flex-start', flex: 'none' })}>
        {s.calFlow.map((n) => {
          const href = navHref(s, n.to)
          const Tag = href ? 'a' : 'span'
          return (
            <Tag key={n.label} {...(href ? { href } : null)} style={{
              fontFamily: s.body, fontSize: u(T.bodySm), lineHeight: 1.4,
              color: headFg, textDecoration: 'none', cursor: href ? 'pointer' : undefined,
            }}>{n.on ? `● ${n.label}` : n.label}</Tag>
          )
        })}
      </div>
    )

    const head = (
      <div style={col(u(28), {
        background: s.ac, padding: `${u(28)} ${padX} ${u(36)}`, alignItems: 'flex-start',
      })}>
        <div style={row(u(24), { width: '100%', justifyContent: 'space-between', alignItems: 'flex-start' })}>
          <span style={{
            fontFamily: s.body, fontSize: u(T.bodyLg), lineHeight: 1.5, color: headFg,
          }}>{s.brand}</span>
          {flow}
        </div>
        <div style={{ width: '100%', paddingBottom: u(20), borderBottom: `1px solid ${headRule}` }}>
          {/* The one thing the section already had that this frame left room
              for: `heading` headed the flat layout alone, the scheduler frame
              drawing no title at all. The frame's own sentence goes with it —
              which is also why the head is shorter than the master's here: two
              lines of "Find a date that works for your event" against our one
              word. The 1440 and 768 masters both fix this text node at 571.1,
              the desktop component's own measure, and it still binds inside the
              768 one's 628 column; the 390 master states the full width
              instead, so the measure stops there rather than being carried down
              into a 326px column it could only fight. */}
          <h2 style={{
            margin: 0, fontFamily: s.display, fontSize: u(T.dispMd), lineHeight: 1,
            letterSpacing: s.dls, color: headFg, maxWidth: s.mob ? undefined : u(571),
          }}>{s.title}</h2>
        </div>
      </div>
    )

    // The 1440 and 768 frames' own column head sits 66 to the left of the
    // column it heads — it pins "Date ↓" at 330 where the rows put the weekday
    // at the date's own width plus the row gap. Ours takes the rows' gap so the
    // two agree; the arrows are the frame's label, not a sort control, and
    // nothing here reads a click. The 390 master has no column to head, its
    // rows being stacked, so it hangs the two labels off the panel's two edges.
    const colHead = (
      <div style={row(gap, {
        padding: `${u(18)} ${padX}`, borderBottom: `1px solid ${rule}`,
        fontFamily: s.body, fontSize: u(T.labelXs), lineHeight: 1.26, color: hue,
        justifyContent: s.mob ? 'space-between' : undefined,
      })}>
        <span style={{ flex: 'none', minWidth: dateCol }}>Date ↓</span>
        <span style={{ whiteSpace: 'nowrap' }}>Availability ↓</span>
      </div>
    )

    // A row is a date, the weekday it falls on and what the artist plays that
    // night. The frame lets the display numerals set the second column's start,
    // so its four weekdays land on four different x — an artefact of hand-set
    // type, not a design, so the date column is pinned and the weekdays line
    // up. The frame draws no state for the row the visitor is on: the foot's
    // chip and line are the whole cue, the media player's now-playing rule.
    const slotRow = (sl, i) => {
      const onClick = s.live && sl.iso && !sl.booked
        ? () => setSel((v) => (v === sl.iso ? '' : sl.iso))
        : undefined
      const mark = (
        <span style={{
          fontFamily: s.display, fontSize: u(T.dispLg), lineHeight: 0.89,
          letterSpacing: s.dls, whiteSpace: 'nowrap', flex: 'none',
          minWidth: dateCol,
          textDecoration: sl.booked ? 'line-through' : undefined,
        }}>{sl.mark}</span>
      )
      const day = (
        <span style={{
          flex: s.mob ? 'none' : '1 1 0', minWidth: 0,
          fontFamily: s.body, fontSize: u(T.labelXs), lineHeight: 1.26,
        }}>{sl.day}</span>
      )
      return (
        <div key={i} onClick={onClick} style={row(gap, {
          padding: `${u(16)} ${padX}`, borderBottom: `1px solid ${rule}`,
          color: sl.booked ? gone : ink, cursor: onClick ? 'pointer' : undefined,
        })}>
          {/* The 390 master stacks the mark over the weekday, tight against it
              at no gap at all, and leaves the availability block where it is.
              The column goes in at that width alone, the gallery's rule: at the
              other two the two spans are the row's own children and the desktop
              tree is untouched.
              The row lands 1.4px over each master's stated height (86.4 against
              768's 85, 83.7 against 390's 83), because Figma strokes a padded
              frame inside the height it states — the repertoire's
              `calc(padding − border)` case, carried here for the reason the
              bio's pill carries it: the desktop half of this very property has
              the same drift, and consistency inside one branch beats accuracy
              in half of it. */}
          {s.mob
            ? <div style={col('0', { flex: '1 1 0', minWidth: 0 })}>{mark}{day}</div>
            : <>{mark}{day}</>}
          {/* Each line is rendered or not rather than printed blank — a column
              gap is spent on an empty span the same as on a full one. */}
          <div style={col(u(2), { flex: 'none', alignItems: 'flex-end', textAlign: 'right' })}>
            {!!sl.kind && (
              <span style={{ fontFamily: s.body, fontSize: u(T.bodyMd), lineHeight: 1.5, whiteSpace: 'nowrap' }}>
                {sl.kind}
              </span>
            )}
            {!!sl.price && (
              <span style={{ fontFamily: s.body, fontSize: u(T.bodySm), lineHeight: 1.4, whiteSpace: 'nowrap' }}>
                {sl.price}
              </span>
            )}
          </div>
        </div>
      )
    }

    return (
      <div style={{
        background: panel, color: ink, borderRadius: u(30), overflow: 'hidden',
        border: s.retro ? undefined : `${s.bw} solid ${rule}`,
      }}>
        {head}
        {colHead}
        {/* The pricing deck's one-message empty state: the table is a
            composition, and a hole where its rows stand is not one of its
            states. */}
        {s.calSlots.length === 0 ? (
          <div style={{
            padding: `${u(16)} ${padX}`, borderBottom: `1px solid ${rule}`,
            fontFamily: s.body, fontSize: u(T.bodyMd), lineHeight: 1.5, color: gone,
          }}>No dates yet.</div>
        ) : s.calSlots.map(slotRow)}
        {/* The foot pads by 20 at 390 where its own rows pad by 10 — the
            master's own number on both sides of it, the repertoire's 390 pager
            band taking 20 against a 10 page inset.
            It is also the one place the 390 master is not followed. It keeps
            the pill beside the line and pays for it out of the line, which gets
            78px and wraps its "Thursday evening selected" to three; our line is
            `enquiryLine`'s composed sentence, and on a canvas 24px narrower
            than the frame the same division leaves it 54 — not a wrap but a
            break inside "Thursday,". So the pill takes its own row under the
            line, at the column's own left edge, which is where the fallback
            this replaced already put it. The media player's rule: honouring a
            master that destroys its own content publishes the damage. The 12
            between the two is therefore the one number here with no master
            behind it — the frame never stacks this foot — and it is the foot's
            own 12, the padding it opens and closes on and the gap between the
            chip and the line, rather than a value invented for the occasion. */}
        <div style={(s.mob ? col : row)(u(s.mob ? 12 : 24), {
          minHeight: u(s.mob ? 84 : 100),
          padding: `${u(12)} ${u(s.mob ? 20 : 40)}`,
          ...(s.mob ? { alignItems: 'flex-start' } : { flexWrap: 'wrap' }),
        })}>
          <div style={row(u(12), s.mob
            ? { width: '100%' }
            : { flex: '1 1 0', minWidth: u(200) })}>
            {/* No pick, no chip — the foot then prints the prompt, which is
                what an emptied or fully booked list leaves it on. */}
            {!!cur && (
              <span style={{
                flex: 'none', background: s.ac, color: headFg, borderRadius: '999px',
                padding: `${u(6)} ${u(12)}`, fontFamily: s.body, fontWeight: 700,
                fontSize: u(T.chip), lineHeight: 1,
                // Figma states this as -6%, so it ramps with the token rather
                // than being frozen at the desktop pixel it happens to make.
                letterSpacing: u(-0.06 * T.chip), whiteSpace: 'nowrap',
              }}>{hit.mark}</span>
            )}
            <span style={{ fontFamily: s.body, fontSize: u(T.bodyMd), lineHeight: 1.5 }}>{line}</span>
          </div>
          {/* The frame's pill is the ink one, with a cream disc and the arrow
              in the accent — which is what `discFg` was added for. Its box does
              not ramp at all: 54 tall on a 46 disc in all three masters, so the
              46 is passed at both narrow widths and `full` opts the 390 canvas
              back up to it (the 390 pricing frame's case). Only the label
              moves, on `size/list` — and at 768 that is a 12 against the
              desktop branch's `labelMd` 16, which is the existing diff between
              that branch and its own frame's 16 × 0.82, not a new one. */}
          <BookPill s={s} to={s.calBookTo} label={s.calCta} glyph="arrow"
                    disc={desk ? 38 : 46}
                    {...(desk ? null : { size: u(T.list) })}
                    {...(s.mob ? { full: true } : null)}
                    {...(s.retro
                      ? { bg: s.tx, fg: '#FBF6EA', shadow: s.ac, discFg: s.ac }
                      : null)} />
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

  // v1 — Events Map layout 2 · Featured gig + route (964:64651, 1440 × 780, so
  // every number below is the frame's × 0.82 on the 1180 canvas and verbatim on
  // the two narrow ones): an olive travel card over the rest of the page's gigs
  // on the left, and the one gig the panel features — its venue, its city and
  // the route to it — on the right.
  //
  // **768 keeps the two columns; only 390 stacks them.** That is the one thing
  // in this section that `get_metadata` settles before any render is fetched:
  // the 768 master's two children sit at x 30 and x 396, the 390 master's at
  // x 10 under one another. The unfitted fallback this replaces stacked at both.
  //
  // The two designs share the whole of the section's live seam. `page` pages
  // the same list `gigPage` at a time, so the map still draws one pin per gig
  // on the current page and never lights a position twice; `sel` still indexes
  // the whole list, and here it names the gig the panel features rather than
  // the row that lights. That is the pricing deck's rule — a layout that draws
  // one of something has to reach all of it — and it is why the list beside it
  // is the page *minus* the featured gig, which is exactly the frame's own
  // "Other upcoming · 4" beside its five seeded shows.
  if (s.v1) {
    const desk = !s.narrow
    const tab = isTablet(s)
    // The narrow masters are 986:10974 (768 × 823) and 986:11467 (390 × 1286),
    // and they are the desktop component at its own numbers — every box in the
    // card, the rows and the panel is the 1440 frame's value unscaled — so the
    // whole branch flows through one scale rather than a search-and-replace.
    const z = desk ? 0.82 : 1
    const u = (v) => `${Math.round(v * z * 10) / 10}px`
    // The type ramp, resolved by `get_variable_defs` on all three masters
    // rather than measured: the emitted CSS prints the desktop default at every
    // width. `size/list` goes back *up* at 390 (16 → 12 → 13) with no
    // column-width reason — the repertoire's non-monotonic case — so the values
    // are written down and the cause left alone. `body-sm` is the one token
    // that does not move at all.
    const T = desk
      ? { title: 24, list: 16, bodyLg: 16, bodyMd: 14, bodySm: 12, labelXs: 20, chip: 12 }
      : s.mob
        ? { title: 18, list: 13, bodyLg: 15, bodyMd: 13, bodySm: 12, labelXs: 12, chip: 11 }
        : { title: 19, list: 12, bodyLg: 15, bodyMd: 13, bodySm: 12, labelXs: 14, chip: 11 }
    // The panel's own inset, and the one box in this design that does not carry
    // the desktop number down: 32 at 1440, 12 at both narrow masters.
    const pad = u(desk ? 32 : 12)

    // The frame's olive card and its two creams are literals under Retro, whose
    // `paper` IS the page ground (the calendar's rule). The flat four take the
    // palette's darkest hue for the card and `paper` for the two panels — and
    // an outline with it, because a palette whose lightest colour is its
    // background draws an un-outlined card as a hole in the page. Grunge's
    // `deep` is the page ground itself, so the dark card needs one too.
    const card = s.retro ? '#6D7040' : s.deep
    const cardFg = s.retro ? '#FBF6EA' : s.deepFg
    const panel = s.retro ? '#FFFEFB' : s.paper
    const panelFg = s.retro ? s.tx : s.paperFg
    const rowBg = s.retro ? '#FAECD5' : s.paper
    // The frame's hairline is ink on every surface it draws. `line2` is
    // rgba(tx), which reads against the page ground whichever way the palette
    // runs; inside the olive card the rules take a wash of the card's own type.
    const hair = s.retro ? s.tx : s.line2
    const cardLine = s.retro ? s.tx : s.deepFg25
    // The map viewport is a dark olive plate. `mapBg` is the lifted charcoal
    // layout 1 stands its whole section on, which is the same idea one level in.
    const plate = s.retro ? '#292A1C' : s.mapBg
    const plateFg = s.retro ? '#FBF6EA' : s.mapFg
    // The panel's own tab. Rust on cream under Retro; the accent is not
    // guaranteed against `paper` elsewhere (Lime's is acid green on pale lime),
    // so the flat four keep the panel's ink.
    const tabFg = s.retro ? s.ac : s.paperFg
    const tabBg = s.retro ? '#FBF6EA' : s.soft

    // The page of gigs, exactly as layout 1 pages it: `gigPage` is PINS.length,
    // so a page's worth of gigs is one set of distinct pin positions.
    const perPage = s.gigPage
    const pages = Math.max(1, Math.ceil(s.gigs.length / perPage))
    const pg = s.live ? Math.min(page, pages - 1) : 0
    const shown = s.gigs.slice(pg * perPage, (pg + 1) * perPage)
    const { labels, at } = pageWindow(pages, pg, s.mob)
    const first = pg * perPage
    // Which gig the panel features. `sel` indexes the whole list and starts at
    // -1, so a page the visitor has not picked on — and the canvas, where
    // nothing is live — features that page's first gig. The picture is a
    // choice here, the pricing chips' and the testimonials' `cur` rule, not the
    // map's own -1: the frame draws a featured card and there is always one.
    const feat = s.live && sel >= first && sel < first + shown.length ? sel : first
    const g = s.gigs[feat]
    // Picking features a gig rather than toggling one lit, layout 1's other
    // half of the same seam: the panel always holds one, so there is nothing to
    // toggle back to. The index is the gig's place in the whole list.
    const onPick = (j) => (s.live ? () => setSel(j) : undefined)
    // The page minus the gig the panel is on, each row keeping the index it has
    // in the whole list so a click features the right show.
    const rest = shown.map((gg, i) => ({ gg, i: first + i })).filter((r) => r.i !== feat)

    // Body/SM and Body/Chip. The tracking is stated as a percentage (-6) and
    // ramps with its own token, so it is written as the product rather than
    // frozen at the desktop -0.72 (the pricing deck's rule).
    const label12 = { fontFamily: s.body, fontSize: u(T.bodySm), lineHeight: 1.4 }
    const chip12 = {
      fontFamily: s.body, fontWeight: 700, fontSize: u(T.chip), lineHeight: 1,
      letterSpacing: u(-0.06 * T.chip), textTransform: 'uppercase', whiteSpace: 'nowrap',
    }

    // The travel card. Its head is the section's own heading under the frame's
    // label, with the coverage badge in the chip — which is where layout 1
    // prints it too, at the head of the section rather than of a card. Its two
    // locations are the artist's base and the city the featured gig is in, so
    // the card is the route to whatever the panel beside it is showing.
    //
    // The frame's own "Travel time · ~2 hrs" and "Booking fee · £1,200" are
    // dropped: a published page printing a number the artist never typed is
    // making a claim (the video section's rule), and the third cell's "Max
    // travel · 100 mi" is the coverage badge, which is already the chip. What
    // is left in that row is the featured gig's date and set time — the two
    // facts the section holds that the panel has nowhere to print.
    const stats = [
      g && { l: 'Date', v: `${g.month} ${g.day}` },
      g && g.time && { l: 'Set time', v: g.time },
    ].filter(Boolean)

    const travel = (
      <div style={col(u(18), {
        background: card, color: cardFg, border: `1px solid ${hair}`,
        // Figma strokes an auto-layout frame inside the size it states, so every
        // outlined box in this design gives its hairline back out of its own
        // padding — the repertoire's rule, and the card, the two chips and the
        // gig rows all inherit the drift otherwise.
        borderRadius: u(30), padding: `calc(${u(18)} - 1px) calc(${u(20)} - 1px)`,
        // Left-aligned rather than stretched, so the one pill at the foot keeps
        // the width of its own label; every row above it asks for 100%.
        alignItems: 'flex-start',
      })}>
        <div style={row(u(12), { width: '100%', justifyContent: 'space-between', alignItems: 'flex-start' })}>
          <div style={col(u(4), { minWidth: 0 })}>
            <span style={label12}>Travel radius</span>
            <h2 style={{
              margin: 0, fontFamily: s.display, fontSize: u(T.title), lineHeight: 1.1,
              letterSpacing: s.dls,
            }}>{s.title}</h2>
          </div>
          <span style={{
            ...label12, flex: 'none', border: `1px solid ${cardLine}`, borderRadius: '999px',
            padding: `calc(${u(5)} - 1px) calc(${u(12)} - 1px)`, whiteSpace: 'nowrap',
          }}>● {s.mapRadius}</span>
        </div>

        <div style={row(u(18), { width: '100%', padding: `${u(8)} 0`, flexWrap: 'wrap' })}>
          {/* Two lines a column, not the frame's three: its "Based in" label
              over "Manchester, UK" is what our `base` field's own copy already
              says ("Based in Manchester"), so printing both would stutter. The
              captions carry the meaning the labels did.

              Both names are Display/List here. All three masters set the home
              location's in Display/List and the venue location's in Body/MD,
              which is hand-set type rather than a design (the pricing deck's
              normalise-and-say-so rule) — the desktop fit already normalised
              them and the narrow pass keeps that.

              The desktop measure wraps the two columns under a narrow card;
              both narrow masters draw them on one row beside the connector, and
              at 390 that is 306px of inner card for two columns and a 92px
              connector, so the minimum goes and the basis divides it. */}
          <div style={col(u(3), { flex: '1 1 0', minWidth: desk ? u(160) : 0 })}>
            <span style={{
              fontFamily: s.display, fontSize: u(T.list), lineHeight: 1.2, letterSpacing: s.dls,
            }}>{s.mapBase}</span>
            <span style={label12}>Home location</span>
          </div>
          {!!g && (
            <>
              {/* The frame's ──●── connector, drawn rather than typed. It joins
                  two columns, so it goes with them once the row wraps — which
                  on the desktop canvas is the only way the row ever loses it;
                  both narrow masters draw it. */}
              <span aria-hidden style={row(0, { flex: 'none' })}>
                <span style={{ width: u(24), height: '1px', background: cardFg, opacity: 0.5 }} />
                <span style={{ width: u(8), height: u(8), borderRadius: '999px', background: cardFg }} />
                <span style={{ width: u(24), height: '1px', background: cardFg, opacity: 0.5 }} />
              </span>
              <div style={col(u(3), { flex: '1 1 0', minWidth: desk ? u(160) : 0 })}>
                <span style={{
                  fontFamily: s.display, fontSize: u(T.list), lineHeight: 1.2, letterSpacing: s.dls,
                }}>{g.city}</span>
                <span style={label12}>Venue location</span>
              </div>
            </>
          )}
        </div>

        {stats.length > 0 && (
          <div style={row(u(18), {
            width: '100%', padding: `${u(12)} 0`, alignItems: 'flex-start',
            borderTop: `1px solid ${cardLine}`, borderBottom: `1px solid ${cardLine}`,
          })}>
            {stats.map((st) => (
              <div key={st.l} style={col(u(4), { flex: '1 1 0', minWidth: 0 })}>
                <span style={label12}>{st.l}</span>
                {/* Body/LG, where the two location names above are Display/List
                    — the frame's two 16s are different tokens and only the
                    line-height tells them apart. */}
                <span style={{ fontFamily: s.body, fontSize: u(T.bodyLg), lineHeight: 1.5 }}>{st.v}</span>
              </div>
            ))}
          </div>
        )}

        {/* The frame's pair of buttons, minus "Get Directions" — nothing in the
            section addresses a venue, and a second pill that went nowhere would
            be the footer's dead `href="#"` again. This one is the featured
            gig's own tickets link: an empty one leaves it the picture it is on
            the seeded page, the Soundcloud rule that layout 1's rows follow.
            The frame draws no offset block under it, hence the clear shadow,
            and sets its type in the card's own olive rather than the pill's
            usual accent — a Retro literal, so the flat four keep the accent
            pair BookPill defaults to, which is legible on the dark card by
            construction where `pillFg` is not (Editorial's all but vanished).

            The pill's *box* does not ramp: 54 tall on a 46 disc at all three
            masters, which is the booking calendar's case exactly — so `disc` is
            the frame's own 46 at narrow (38 being 46 × 0.82) and `full` opts
            the 390 canvas back up to the full-size box. Its label does ramp,
            with `size/list`, and BookPill's automatic pick would draw 20px at
            768 against the master's 12. Desktop keeps its `undefined`, which
            resolves to `labelMd` 16 where the frame's own is 13.1 — an existing
            drift in a signed-off half, the bio's `/featured` pill case. */}
        {!!g && (
          <BookPill s={s} ext={g.url} label="Venue Link" glyph="arrow"
                    disc={desk ? 38 : 46} full={!desk} size={desk ? undefined : u(T.list)}
                    shadow="transparent"
                    {...(s.retro ? { fg: '#5B5E2E' } : null)} />
        )}
      </div>
    )

    const gigRow = ({ gg, i }) => {
      // The ↗ is a link affordance, so live it is drawn only where there is
      // somewhere to go — the gallery's hide-the-empty-row rule — while the
      // canvas keeps it on every row, that being the reference design. The rest
      // of the row features the gig; the anchor's own click does both, which is
      // layout 1's rule for a row with a tickets address.
      const tix = extLink(s, gg.url)
      // The tag is picked from the link, BookPill's and layout 1's rule:
      // spreading an href onto a span sets an inert attribute and navigates
      // nowhere.
      const Tix = tix ? 'a' : 'span'
      return (
        // The row keeps its content height at every width, where both narrow
        // masters draw it at 76.5 / 76.75. That is not a stated row height: the
        // masters state the *left column* at 703 — the same number at 768 and
        // at 390 — and every row is `flex: 1 0 0` under it, so the 62 (768) and
        // 67 (390) the column has over its content divide four ways into the
        // 15.5 and 16.75 each row runs over 10 + text + 10. At 768 that squares
        // the two columns; at 390 there is no second column and the 703 does
        // nothing at all. Honouring it would pin a number that only divides at
        // four gigs, and the desktop half of this very branch already declines
        // to stretch this column (the video dashboard's rule) — so the radius
        // ends up drawing a 61px row as a full pill, which is the diff.
        <div key={i} onClick={onPick(i)} style={row(u(12), {
          width: '100%', background: rowBg, color: s.retro ? s.tx : s.paperFg,
          border: `1px solid ${hair}`, borderRadius: u(30),
          padding: `calc(${u(10)} - 1px) calc(${u(14)} - 1px)`,
          cursor: s.live ? 'pointer' : undefined,
        })}>
          {/* Label/XS. The masters set row one's mark in it and rows two to
              four in Body/MD, hand-set type again — normalised, as the desktop
              master's own 25/21/21/21 marks already were. */}
          <span style={labelStyle(s, u(T.labelXs), {
            width: u(36), height: u(36), flex: 'none', display: 'inline-flex',
            alignItems: 'center', justifyContent: 'center',
          })}>{gg.day}</span>
          <div style={col(u(3), { flex: '1 1 0', minWidth: 0 })}>
            <div style={row(u(5), { minWidth: 0 })}>
              <span style={{
                fontFamily: s.display, fontSize: u(T.title), lineHeight: 1.1, letterSpacing: s.dls,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{gg.venue}</span>
              {(tix || !s.live) && (
                <Tix {...tix} style={{
                  ...label12, flex: 'none', color: 'inherit', textDecoration: 'none',
                  cursor: tix ? 'pointer' : undefined,
                }}>↗</Tix>
              )}
            </div>
            <span style={label12}>
              {gg.city} · <span style={{ textTransform: 'uppercase' }}>{gg.month}</span>
            </span>
          </div>
          {/* The frame's "In transit" is a status the section cannot know. The
              row's own hour is what belongs in that chip, and an emptied one
              drops it rather than printing an empty pill. */}
          {!!gg.time && (
            <span style={{
              ...label12, flex: 'none', border: `1px solid ${hair}`, borderRadius: '999px',
              padding: `calc(${u(4)} - 1px) calc(${u(10)} - 1px)`, whiteSpace: 'nowrap',
            }}>{gg.time}</span>
          )}
        </div>
      )
    }

    const list = (
      <div style={col(u(8), { width: '100%' })}>
        {/* Dropped with the rows: the last page can hold the featured gig
            alone, and a count of nothing over nothing is not a state. */}
        {rest.length > 0 && (
          <span style={{ ...label12, color: s.tx }}>Other upcoming · {rest.length}</span>
        )}
        {rest.map(gigRow)}
        {/* Derived from the list and not drawn at one page, the repertoire's
            rule — so the seeded five gigs are one page and carry no pager, the
            same intended diff from the frame that layout 1 has. */}
        {labels.length > 0 && (
          <Pager s={s} colour={s.ac} fill={s.soft2} frame={{
            pages: labels, active: at,
            onPage: s.live ? (n) => setPage(Number(n) - 1) : undefined,
            onStep: s.live ? (dir) => setPage(Math.max(0, Math.min(pages - 1, pg + dir))) : undefined,
          }} />
        )}
      </div>
    )

    // The route. Its pins are the page's gigs at the positions sectionVm paired
    // them with, the featured one lit; the marker at the middle is the artist's
    // base, which is what the frame's rings are drawn around. The frame's
    // 30/60/120mi ring labels and its zoom controls are gone with the fabricated
    // metrics — the first are numbers the artist never typed and contradict the
    // coverage badge, the second a control this file has nothing to do.
    const pins = shown.map((gg, i) => {
      const on = first + i === feat
      const d = on ? u(16) : u(8)
      return (
        <span key={i} onClick={onPick(first + i)} style={{
          position: 'absolute', left: gg.pin.x, top: gg.pin.y, width: d, height: d,
          borderRadius: '999px', background: on ? s.ac : plateFg,
          // The lit pin is ringed rather than haloed: a halo wants a wash of
          // the plate's cream, and this file is handed colours rather than
          // computing them.
          border: on ? `2px solid ${plateFg}` : undefined,
          boxSizing: 'content-box',
          transform: 'translate(-50%, -50%)',
          cursor: s.live ? 'pointer' : undefined,
        }} />
      )
    })

    const featured = (
      <div style={col(u(24), {
        background: panel, color: panelFg, borderRadius: u(30), padding: pad,
        border: s.retro ? undefined : `${s.bw} solid ${hair}`,
      })}>
        <div style={col(u(12), { width: '100%', alignItems: 'flex-start' })}>
          {/* The frame's "● IN TRANSIT" is a claim about a booking; what the
              tab can honestly say is what the panel is. The media player's
              centre seat already carries a Featured tab. */}
          <span style={row(u(8), {
            background: tabBg, color: tabFg, borderRadius: '999px',
            padding: `${u(6)} ${u(12)}`, ...chip12,
          })}>
            <span style={{ width: u(6), height: u(6), borderRadius: '999px', background: tabFg }} />
            Featured
          </span>
          {g ? (
            <div style={col(u(4), { width: '100%', minWidth: 0 })}>
              <h3 style={{
                margin: 0, fontFamily: s.display, fontSize: u(T.title), lineHeight: 1.1,
                letterSpacing: s.dls,
              }}>{g.venue}</h3>
              <span style={{
                fontFamily: s.body, fontSize: u(T.bodyMd), lineHeight: 1.5, opacity: 0.7,
              }}>{g.city}</span>
            </div>
          ) : (
            // The pricing deck's one-message empty state: the panel is a
            // composition, and a hole where the gig stands is not one of its
            // states — the route below it still draws, with nothing on it.
            <span style={{
              fontFamily: s.body, fontSize: u(T.bodyMd), lineHeight: 1.5, opacity: 0.7,
            }}>No dates yet.</span>
          )}
        </div>

        {/* The one radius in this design that ramps: `radius/control` 14 at
            1440, a raw 20 at both narrow masters. Every other corner here — the
            card's, the rows', the panel's own 30 — is the desktop component's
            value verbatim, which a corner-walk of the three renders confirms
            (identical profiles at all three widths). */}
        <div style={col(0, {
          width: '100%', border: `1px solid ${hair}`, borderRadius: u(desk ? 14 : 20),
          overflow: 'hidden',
        })}>
          {/* The viewport is `flex: 1 0 0` inside a panel whose height the
              masters state, so its shape is derived rather than designed: 588 ×
              448 at 1440, a portrait 318 × 530 at 768 and a landscape 346 × 307
              at 390. Our panel is content-tall, so the aspect is what carries
              each master's picture across. */}
          <div style={{
            position: 'relative', width: '100%', background: plate,
            aspectRatio: desk ? '588 / 448' : tab ? '318 / 530' : '346 / 307',
          }}>
            {/* §10.2's street raster, inverted onto the dark plate so the roads
                read as light lines; the flat four keep layout 1's crossed grid,
                there being no raster outside Retro. */}
            <span aria-hidden style={{
              position: 'absolute', inset: 0,
              ...(s.mapSrc
                ? {
                  backgroundImage: `url(${s.mapSrc})`, backgroundSize: 'cover',
                  backgroundPosition: 'center', filter: 'invert(1) grayscale(1) contrast(1.6)',
                  opacity: 0.26, mixBlendMode: 'screen',
                }
                : {
                  backgroundImage:
                    `linear-gradient(${s.ac55} 1px, transparent 1px), `
                    + `linear-gradient(90deg, ${s.ac55} 1px, transparent 1px)`,
                  backgroundSize: '38px 38px',
                }),
            }} />
            {/* The three coverage rings. All three masters draw them at the
                same absolute 480 / 300 / 140, so what changes is only how much
                of the viewport they cover — and expressed as a share of its
                width they carry to a canvas the frame's width is not. The outer
                one already runs past the frame's own viewport at every width
                (and the middle one too at 390), so the clip is the picture. */}
            {(desk ? [81.6, 51, 23.8] : tab ? [150.9, 94.3, 44] : [138.7, 86.7, 40.5]).map((w, i) => (
              <span key={w} aria-hidden style={{
                position: 'absolute', left: '50%', top: '50%', width: `${w}%`,
                aspectRatio: '1', borderRadius: '999px',
                border: `1px solid ${plateFg}`, opacity: i === 0 ? 0.28 : 0.45,
                transform: 'translate(-50%, -50%)',
              }} />
            ))}
            {pins}
            <span aria-hidden style={row(0, {
              position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
              background: s.retro ? '#5B5E2E' : s.ac, color: plateFg,
              border: `2px solid ${plateFg}`, borderRadius: '999px', padding: u(4),
            })}>
              <GlobeMark size={Math.round(16 * z)} color={plateFg} />
            </span>
          </div>
          <div style={row(u(12), {
            justifyContent: 'space-between', padding: `${u(14)} ${u(20)}`,
            borderTop: `1px solid ${hair}`,
          })}>
            {/* The frame's data line and its "EXPAND VIEW ›" — a control with
                nowhere to expand to — become the artist's travel terms and the
                count the frame's own line carries. */}
            <span style={label12}>{s.mapTerms}</span>
            <span style={{ ...chip12, flex: 'none' }}>{s.gigs.length} pins</span>
          </div>
        </div>
      </div>
    )

    return (
      <div style={{
        display: 'grid',
        // 768 keeps the desktop's two columns at 342 + 342; only 390 stacks.
        // The 24 gap is the frames' own at all three widths.
        gridTemplateColumns: s.mob ? '1fr' : '1fr 1fr',
        gap: u(24), alignItems: 'start',
      }}>
        {/* Not stretched to the panel beside it, the video dashboard's rule: at
            twelve gigs the left column is the taller by 250px, and the map
            would have to take that slack. The 768 master does square the two
            (both 703) — by dividing the slack into its four gig rows, which is
            the row comment's case and does not survive a fifth gig. */}
        <div style={col(u(18))}>{travel}{list}</div>
        {featured}
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

  // v1 — Testimonials layout 2 · Editorial feature (964:64653, 1440 × 782 at
  // × 0.82): a centred display head over one wide coloured card, with a rail of
  // initial tiles down its left picking the review it shows, and the section's
  // Book Now pill centred under both. It draws neither grain nor a torn edge —
  // the frame carries no texture at all (stddev 0 over both the page ground and
  // the card) and stands on the beige page, so the root's `cream` flag stays
  // layout 1's and nothing shared moves.
  if (s.v1) {
    // §5.5 — three masters: 1440 (964:64653) on the 1180 canvas at × 0.82, 768
    // (986:11675) and 390 (986:11701) verbatim, hence the one `z` switch inside
    // `u()` rather than a hand-scaled number per box. Every box here is the
    // desktop component's own value at all three widths — the card's 40 padding
    // and 40 gaps, the 30 radii, the grid's 32, the head's 12, the pill's 54 on
    // a 46 disc — so what the narrow masters actually settle is the type table
    // below and two structural facts: **768 keeps the desktop's two columns**
    // (rail left, card right) and only 390 stacks, and there it *reorders*, the
    // card over a rail laid out as a row.
    const desk = !s.narrow
    const tab = isTablet(s)
    const z = desk ? 0.82 : 1
    const u = (v) => `${Math.round(v * z * 10) / 10}px`
    // 768 and desktop share the composition; only 390 parts from it.
    const wide = !s.mob
    // `get_variable_defs` on each master, which resolves that master's own mode
    // — every one of these comes back in the emitted CSS as the desktop default.
    // `list` going 16 → 12 → **13** is the repertoire's and the pricing deck's
    // non-monotonic case a third time, and again with no column-width reason.
    const T = desk
      ? { list: 16, bodyLg: 16, bodyMd: 14, bodySm: 12 }
      : { list: tab ? 12 : 13, bodyLg: 15, bodyMd: 13, bodySm: 12 }
    const gap = u(32)
    const n = s.quotes.length
    // Clamped as layout 1 clamps it, and for the same two reasons: the artist
    // can delete the review the visitor is on, and Publish re-renders a tab
    // that is already open.
    const at = s.live && n ? Math.min(cur, n - 1) : 0
    const q = n ? s.quotes[at] : null
    // The rail is a picker, so it is not drawn at one review — layout 1's arrow
    // rule and the pricing chips', derived from the list so it holds on the
    // canvas too. At one review the card simply takes the whole width.
    const rail = n > 1

    // The frame's orange card, its purple selected tile and its two creams are
    // literals under Retro, whose `paper` IS the page ground (the calendar's
    // rule). The purple is a register lighter than the palette's own #7A58A7,
    // the media player's fanned cards again, so it is sampled rather than
    // taken from `chips`. The flat four paint the card in the accent and mark
    // the picked tile with the same fill against the others' outline, which is
    // what carries the selection whatever hue the card lands on.
    const card = s.retro ? '#DF5B30' : s.ac
    const cardFg = s.retro ? '#FBF6EA' : s.acFg
    // The frame rules the card in ink. That is invisible on a palette whose
    // darkest colour is the card, so the flat four take a wash of the card's
    // own type — the events map's rule for its dark panel.
    const cardLine = s.retro ? s.tx : s.acFg20
    const tile = s.retro ? '#FAECD5' : s.paper
    const tileFg = s.retro ? s.tx : s.paperFg
    const onTile = s.retro ? '#8B6AB8' : s.ac
    const onTileFg = s.retro ? '#FBF6EA' : s.acFg

    const body12 = { fontFamily: s.body, fontSize: u(T.bodySm), lineHeight: 1.4 }

    // The head. Its eyebrow is the frame's own label, a literal the way the
    // media player's "● Popular" is; the display line is the section's
    // `heading`, which layout 1 draws nowhere; and the sentence under it is the
    // new `sub`. Each of the two fields is rendered or not rather than printed
    // blank, since a `col` gap is spent on an empty span the same as a full one.
    const head = (
      <div style={col(u(12), { width: '100%', alignItems: 'center', textAlign: 'center' })}>
        <span style={body12}>&#9998; What clients say</span>
        {!!s.title && (
          // `display-lg` 96 → 60 → 40, which is the page's own ramp read off
          // two different keys — the media player's `tab ? s.h1 : s.dispLg`,
          // since `dispLg` is 64 at tablet where the master states 60.
          <h2 style={{
            margin: 0, fontFamily: s.display, fontSize: tab ? s.h1 : s.dispLg, lineHeight: 0.89,
            letterSpacing: s.dls, color: s.ac,
          }}>{s.title}</h2>
        )}
        {/* The 390 master sets this line `whitespace-nowrap` at the desktop
            component's own measure — 431px of type in a 350 column, overflowing
            40 either side of a head that clips. Ours wraps, the bio's rule for a
            leak that produces nothing the frame's layout depends on. */}
        {!!s.testiSub && (
          <p style={{
            margin: 0, fontFamily: s.body, fontSize: u(T.bodyMd), lineHeight: 1.5,
          }}>{s.testiSub}</p>
        )}
      </div>
    )

    // One tile a review, marked with the reviewer's initials — `mark` is
    // composed in sectionVm, which is also where its empty-name fallback lives,
    // so nothing here works a name out. Live it picks the review the card
    // shows; on the canvas tile 0 is lit where the frame lights the middle one,
    // which is `cur`'s pinned 0 and the pricing deck's intended diff.
    const tiles = (
      <div style={{
        display: 'flex', flexDirection: wide ? 'column' : 'row', flexWrap: 'wrap',
        gap: u(12), alignSelf: wide ? 'stretch' : 'auto', flex: 'none',
        // The 390 master's row is `justify-center`; the column never had a
        // spare axis to justify on, so this is spread in rather than branched,
        // and the desktop object stays byte-identical.
        ...(s.mob ? { justifyContent: 'center' } : null),
      }}>
        {s.quotes.map((r, i) => {
          const on = i === at
          return (
            <div key={i} onClick={s.live ? () => setCur(i) : undefined} style={{
              // The column pins its width where the masters let it hug: 88 at
              // 1440, and 84 at 768 because the widest of the frame's three
              // hand-padded tiles comes to 84 there. The 390 row has no fixed
              // width at all — see the height/padding block below.
              width: wide ? u(desk ? 88 : 84) : undefined,
              flex: wide ? '1 1 0' : (on ? '1 0 auto' : 'none'),
              background: on ? onTile : tile, color: on ? onTileFg : tileFg,
              // The frame draws the picked tile's outline at 2 where the others
              // are at 1. The second px is an inset ring rather than a thicker
              // border — the enquiry form's refused-box rule, and here it is
              // load-bearing: a `flex-basis: 0` item's border is added *after*
              // its share of the rail is worked out, so a 2px tile comes out
              // 2px taller than its neighbours and the column stops dividing
              // evenly.
              border: `1px solid ${on ? s.tx : s.ac}`, borderRadius: u(30),
              boxShadow: on ? `inset 0 0 0 1px ${s.tx}` : undefined,
              // The frame's 36px vertical padding is inert in the column: its
              // three tiles measure 98.63 at 1440 and 104.67 at 768, which is
              // each rail's height divided three ways and not 36 + line + 36.
              // Transcribing it would floor the tile and stand the rail past
              // the card the moment the artist adds a fifth review, so the
              // column takes the division — `min-h-px` on the frame's own
              // tiles, which is Figma for "this may shrink past its contents".
              //
              // The 390 row is the mechanism turned on its side, and the master
              // states it outright: the picked tile is `flex-[1_0_0] min-w-px`
              // and the other two are `shrink-0` on their own horizontal
              // padding, over a stated 107.303 height that makes the 36 inert
              // there too. So the picked review's tile is the wide one — which
              // is the 390 master's whole way of marking it beyond the fill.
              // Two things fall out. On the canvas `at` is 0, so tile *one*
              // widens where the frame widens the middle: `cur`'s pinned 0
              // again, and it moves more of the picture here than it does in
              // the column. And the row **wraps**, which the master does not:
              // its own three tiles fill the 350 exactly, but eight hug tiles at
              // ~80 would run 400 past a row the frame merely clips. Wrapped,
              // the picked tile fills what is left of *its* line — the whole
              // measure alone, ~85 beside three others. Its basis is `auto`
              // where the master states 0: with a 0 basis the tile takes no slot
              // in the wrap, so the line can pack tight enough to leave it less
              // than its own mark and clip it, and the two are the same width
              // wherever the row has any free space at all — which is every
              // count the master itself draws.
              ...(wide
                ? { minHeight: 0 }
                : { height: u(107.3), padding: `0 ${u(30)}`, minWidth: 0 }),
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: s.live ? 'pointer' : undefined,
            }}>
              {/* Both narrow masters pad these two tiles 30 and 35 — the same
                  pair at both widths, and the reason the 768 column measures 84
                  — which is a hand, not a design: normalised to the 30, which
                  is also what leaves the 390 row its width. */}
              <span style={{
                fontFamily: s.display, fontSize: u(T.list), lineHeight: 1.2, letterSpacing: s.dls,
              }}>{r.mark}</span>
            </div>
          )
        })}
      </div>
    )

    // The card. Its foot pairs the reviewer over their role, and where the
    // frame prints ★★★★★ it prints the review's own date: a rating the artist
    // never typed is a claim (the video section's rule, and the enquiry form
    // dropped this very row of stars), and dropping it frees the one slot
    // `when` has in this design — the events map's rule that each dropped claim
    // hands its place to a real field. `byline` is layout 1's composed pair and
    // is deliberately not used here: the line above it is already `who`.
    const big = (
      <div style={col(u(40), {
        ...(wide ? { flex: '1 1 0', minWidth: 0 } : { width: '100%' }),
        background: card, color: cardFg,
        border: `1px solid ${cardLine}`, borderRadius: u(30),
        padding: `calc(${u(40)} - 1px)`, alignItems: 'flex-start',
      })}>
        {q ? (
          <>
            {/* The 1440 master hand-sets this box shorter than its own line —
                the glyph has no descender, so 56 is what the 40px gap under it
                measures from. Both narrow masters drop that and let the 0.75
                leading be the box (58 at 768, 36 at 390), so the height is
                desktop's alone. `display-xl` is 128 → 77 → 48, and `s.dispXl`
                is the ramp's own step at the first two; at 390 it is still 77,
                so that one width states its size. */}
            <span aria-hidden style={{
              fontFamily: s.display, fontSize: s.mob ? u(48) : s.dispXl, lineHeight: 0.75,
              flex: 'none', ...(desk ? { height: u(56) } : null),
            }}>&rdquo;</span>
            <p style={{
              margin: 0, width: '100%', fontFamily: s.body, fontSize: u(T.bodyLg), lineHeight: 1.5,
            }}>{q.quote}</p>
            {/* Rendered or not, each of them: every value on the card is
                emptiable, and an emptied pair drops the row with its padding. */}
            {(!!q.byline || !!q.when) && (
              <div style={row(u(12), {
                width: '100%', paddingTop: u(16), flexWrap: 'wrap',
                justifyContent: 'space-between', alignItems: 'flex-end',
              })}>
                <div style={col(u(4), { minWidth: 0 })}>
                  {!!q.who && (
                    <span style={{
                      fontFamily: s.display, fontSize: u(T.list), lineHeight: 1.2,
                      letterSpacing: s.dls,
                    }}>{q.who}</span>
                  )}
                  {!!q.role && <span style={body12}>{q.role}</span>}
                </div>
                {!!q.when && (
                  <span style={{
                    fontFamily: s.body, fontSize: u(T.bodyMd), lineHeight: 1.5, flex: 'none',
                  }}>{q.when}</span>
                )}
              </div>
            )}
          </>
        ) : (
          // Pricing's one message, layout 1's rule here too: the card is the
          // composition, and a hole where it stands is not one of the
          // section's states.
          <span style={{ fontFamily: s.body, fontSize: u(T.bodyLg), lineHeight: 1.5 }}>
            No reviews yet.
          </span>
        )}
      </div>
    )

    return (
      <div style={col(gap)}>
        {head}
        <div style={{
          display: 'flex', flexDirection: wide ? 'row' : 'column', gap,
          // The two-column widths top their columns rather than stretching
          // them: the card is the taller of the pair by construction, and
          // stretching it would hand a card with one short review the rail's
          // slack. Stacked, the same property is the cross axis and has to
          // stretch, or both blocks would shrink to their own content and stand
          // off the left gutter.
          alignItems: wide ? 'flex-start' : 'stretch', width: '100%',
        }}>
          {/* 390 puts the card first and the rail under it; the two wider
              masters put the rail beside it, on the left. Written as two
              guarded children rather than a reordered pair, so the desktop DOM
              is byte-identical — the gallery's rule. */}
          {!s.mob && rail && tiles}
          {big}
          {s.mob && rail && tiles}
        </div>
        {/* The frame draws no offset block under the pill, hence the clear
            shadow, and fills it in the accent with cream type where BookPill's
            own default is the mustard — so the arrow disc takes the cream and
            its glyph the accent back. `bookTo` needs no self-exclusion, the
            footer's rule: `testimonials` is not in CTA_TARGETS.book, so the
            pill can never point at the section it stands in. An emptied label
            drops it and the row it stands in, or the column would spend this
            gap on nothing. */}
        {!!s.testiCta && (
          <div style={row('0px', { width: '100%', justifyContent: 'center' })}>
            {/* The pill's box does not ramp — 54 tall on a 46 disc at all three
                masters, the booking calendar's and the events map's case a
                third time — while its label follows `size/list`. So `full` opts
                the 390 canvas back up to the full-size box, and `size` is
                passed at narrow because BookPill's own pick would draw 20px
                there against the masters' 12 and 13. Desktop keeps its
                `undefined`: an existing drift in a signed-off half. */}
            <BookPill s={s} to={s.bookTo} label={s.testiCta} glyph="arrow"
                      disc={desk ? 38 : 46} full={!desk}
                      size={desk ? undefined : u(T.list)} shadow="transparent"
                      bg={s.ac} discFg={s.ac}
                      {...(s.retro ? { fg: '#FBF6EA' } : null)} />
          </div>
        )}
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
  // Only the split layout draws the chip row — the sidebar card's frame draws
  // none, and the flat fallback never has — so this is what decides whether a
  // type is offered at all, and the mailto reads it rather than `nTypes`. A
  // page whose artist emptied the list and a layout that never asks are the
  // same case: no type was chosen, so the subject is the bare "Enquiry" rather
  // than a claim the visitor never made.
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
  // v1 — Enquiry Form layout 2 · Sticky sidebar card (Figma 964:64652,
  // 1440 × 792). A mustard page: a big rounded stage photograph over the
  // display heading and the ticked promises, the artist's own credit row set
  // against them, and beside it a narrow outlined card holding the boxes, a
  // near-black submit pill with an accent arrow disc, and one line of prose.
  // No grain, no tear, no checkerboard, no tilt — a scan of the ground and of
  // the card gives a standard deviation of 0, so this is the third layout-2
  // frame with no texture at all.
  //
  // Full-bleed, the repertoire's rule: the frame's ground is `#D8A227`, which
  // is the page's mustard and not its beige, so the sheet writes its own
  // negative margins over the root's padding and the root goes on painting the
  // page behind it. Nothing shared moves. Its inset is `s.gPad` (+ `s.surplus`
  // horizontally) for HeaderV0's reason — past the canvas the frame was drawn
  // at, the sheet keeps bleeding while its content stays on the measure. That
  // is 46 where the frame's vertical inset is 60 × 0.82 = 49.2; the 3px is the
  // page's own rhythm winning, not a transcription slip.
  //
  // Four readings of the frame that are not transcriptions:
  //
  //  - The price (`£1,200 from / event`) and the credit line (`★★★★★ 42
  //    bookings`) are gone. Both are numbers the artist never typed, which is
  //    the video section's rule and the pricing deck's — and dropping the
  //    number takes its stars with it. The card's one remaining line of prose
  //    is `s.formPara`, a field NO §10.2 layout has drawn until now: it sits
  //    where the frame sets "No charge to enquire", which is the same centred
  //    12px line and is itself a claim about the artist's terms.
  //  - The boxes carry the field's **label**, not its placeholder, because that
  //    is what the frame draws in them and because a form with no separate
  //    label row has nowhere else to put it. Live, the label is the input's
  //    placeholder, so the published first paint is the canvas's picture. The
  //    row's `placeholder` column therefore reaches layout 1 alone, as do the
  //    event types (the frame draws no chip row — `showTypes` is already
  //    `s.v0`, so the mailto sends the bare "Enquiry") and the message
  //    placeholder (it draws no textarea, and pinning a height for one would be
  //    inventing a number).
  //  - The heading is one line where the frame hand-breaks two, so everything
  //    under it stands ~33px higher than the frame's own y. Measure the
  //    promises and the credit row against the heading's foot, not the frame.
  //  - The stage photograph is `s.formPhoto`, a new slot: this section's
  //    `image` is the artist, which layout 1 draws as the credit row's circle
  //    and layout 2 draws as the same circle in the same block.
  //
  // §5.5 — the narrow masters are `986:11591` (768 × 865) and `986:11633`
  // (390 × 912), used verbatim, so every number below runs through `u()`'s
  // `z` switch rather than a second set of literals. Two structural facts,
  // both read off `get_metadata` before any render:
  //
  //  - **768 keeps the two columns and only 390 stacks** — the events map's
  //    case, the second in this pass. At 768 the sheet's 708 of measure is
  //    split 334 + 40 + 334, so the card stops being a fixed 450 beside a
  //    flexible column and the two become equal halves. Every `desk` in the
  //    branch therefore had to be re-asked as `desk`, `tab` or `s.mob`.
  //  - **The promises/credit block is a row at 1440 and at 390, and a column
  //    at 768** — the one width where it is not the frame's own space-between
  //    row. At 390 its two halves come to exactly the 370 measure, so they sit
  //    flush rather than spaced.
  if (s.v1) {
    // The 1440 frame lands on the 1180 canvas at × 0.82; the 768 and 390
    // masters are their own canvases' width, so they are used unscaled. One
    // switch inside `u()` carries the whole branch — the boxes, the paddings,
    // the pill, the disc and the offset block all flow through it.
    const desk = !s.narrow
    const tab = isTablet(s)
    const z = desk ? 0.82 : 1
    const u = (v) => `${Math.round(v * z * 10) / 10}px`

    // The type ramp, `get_variable_defs` on all three masters rather than
    // measured: the emitted CSS prints the desktop default at every width.
    //
    //   size/display-sm  40 → 32 → 26      size/label-sm  16 → 13 → 12
    //   size/title       24 → 19 → 18      size/label-xs  20 → 14 → 12
    //   size/list        16 → 12 → 13      size/body-sm   12 → 12 → 12
    //
    // `size/list` goes back **up** at 390, the repertoire's and the pricing
    // section's non-monotonic case a third time. There is no column-width
    // explanation here either — the card is 402 of measure at 1440, 286 at 768
    // and 322 at 390 — so the token is written down and the cause left alone.
    // `email` is the odd one out: it is the sent card's plain-text address,
    // a state no frame draws, so its ramp is invented rather than read.
    const T = desk
      ? { disp: 40, title: 24, list: 16, labelSm: 16, labelXs: 20, bodySm: 12, email: 14 }
      : s.mob
        ? { disp: 26, title: 18, list: 13, labelSm: 12, labelXs: 12, bodySm: 12, email: 13 }
        : { disp: 32, title: 19, list: 12, labelSm: 13, labelXs: 14, bodySm: 12, email: 13 }

    // The page inset. Horizontally it also carries `surplus`, so a window wider
    // than the canvas widens the sheet and not the measure. A bleed design
    // supplies its own inset (the repertoire's rule), and below desktop the
    // frames' own stop being one number: 30/60 at 768 and 10/40 at 390, against
    // `s.gPad`'s 32 and 20. Taking the frames' gives the sheet exactly their
    // measure — 708 in a 768 canvas and 370 in a 390 one.
    const padV = desk ? s.gPad : s.mob ? '40px' : '60px'
    const padH = `calc(${s.surplus} + ${desk ? s.gPad : s.mob ? '10px' : '30px'})`

    // The ground is the pill hue for all five: Retro's IS the frame's `#D8A227`,
    // and it is by construction the palette's lightest tag, so a section-wide
    // sheet of it separates from the page on every theme. Its ink is Retro's
    // fixed cream; elsewhere whatever reads on the hue the palette supplied.
    const ground = s.pillBg
    const groundFg = s.retro ? '#FBF6EA' : contrastInk(ground)
    // Rust on the mustard — `pillFg` already encodes "the accent while it stays
    // legible against the pill hue, else its own contrast", which is exactly
    // the question the frame's heading and its submit label ask.
    const mark = s.pillFg

    // The card is a register lighter than the ground it stands on. That step
    // has no equivalent in the other four palettes, so they take their real
    // second paper — and on Lime and Grunge `paper` IS `pillBg`, which is why
    // the hairline below cannot be `line2`: every soft tint is computed against
    // the PAGE (the repertoire's lesson), and the card would be a hole.
    // `contrastInk(ground)` reads on all five; Retro takes its own `tx`, which
    // IS the frame's `sem/stroke/1` #111 where contrastInk would round it to
    // its own near-black.
    const card = s.retro ? '#E8B33B' : s.paper
    const cardInk = s.retro ? '#FBF6EA' : s.paperFg
    const cardLine = s.retro ? s.tx : contrastInk(ground)
    // The accent as it reads ON the card rather than on the page: the media
    // player's rule, since the palette's accent is not guaranteed against a
    // `paper` surface.
    const cardAc = s.retro ? s.ac : s.paperFg

    // The frame's boxes are set in the label face, uppercase. The label is
    // uppercased as a *string* rather than by `textTransform`, so the live
    // input can carry it as a placeholder without also shouting whatever the
    // visitor types into it — the canvas span and the placeholder are then the
    // same glyphs by construction.
    const up = (t) => String(t).toUpperCase()
    const boxType = labelStyle(s, u(T.labelSm), { textTransform: 'none' })
    const boxShell = (bad) => ({
      border: `1px solid ${cardLine}`, borderRadius: '999px', background: 'transparent',
      // Stated height, not padding: Figma strokes inside its 41.6, so a
      // border-box box of that height draws the frame's pill exactly. The
      // narrow masters state 38 and 37 — their own numbers, and the only box
      // inside the card that moves at all: its padding, its radius, its gaps
      // and its pill are the desktop component's at both narrow widths.
      height: desk ? u(41.6) : s.mob ? '37px' : '38px', padding: `0 ${u(14)}`, width: '100%', margin: 0,
      // No palette has a red, so a refused box thickens its own ring in the
      // card's accent — inset, so the stated height does not grow and nothing
      // below it moves. Layout 1's rule, in the shape a 999px pill can wear.
      boxShadow: bad ? `inset 0 0 0 ${u(2)} ${cardAc}` : undefined,
      ...boxType, color: cardInk,
    })

    // The submit, and the "Write another" that replaces it once an enquiry has
    // been composed. A near-black pill with the label in the accent and the
    // arrow disc in it, thrown onto the accent's own offset block.
    const pill = (extra) => ({
      ...row(u(10), { justifyContent: 'space-between' }),
      background: s.deep, color: s.retro ? s.ac : s.deepFg,
      borderRadius: '999px', width: '100%', boxSizing: 'border-box',
      padding: `${u(5)} ${u(5)} ${u(5)} ${u(21)}`,
      // Figma's "Retro/Poster" — a 5,5 offset in `sem/text/1` — at each
      // master's own scale, which is 4.1 on the 1180 canvas.
      textDecoration: 'none', boxShadow: hard(s, s.ac, 5 * z, 5 * z),
      fontFamily: s.display, fontSize: u(T.list), lineHeight: 1.2, letterSpacing: s.dls,
      ...extra,
    })
    // The frame draws a 46 × 44 oval; the desktop half of this branch already
    // rounds it to a 36px circle off the height, so the narrow one takes the
    // same reading at 44 — consistency inside one branch over accuracy in half
    // of it (the bio's `/featured` pill rule). 5 + 44 + 5 is the pill's 54.
    const discDia = Math.round(44 * z)
    const arrowDisc = (
      <span style={{
        width: discDia, height: discDia, borderRadius: '999px', flex: 'none',
        background: s.ac, color: s.deep,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}><ArrowRight size={Math.round(discDia * 0.5)} /></span>
    )

    const foot = (
      <p style={{
        margin: 0, fontFamily: s.body, fontSize: u(T.bodySm), lineHeight: 1.4,
        textAlign: 'center', color: cardInk,
      }}>{s.formPara}</p>
    )

    return (
      <div style={{
        // The sheet: out to the section's own edges, past the root's padding.
        margin: `calc(-1 * ${s.padY}) calc(-1 * ${s.padX})`,
        background: ground, color: groundFg,
        padding: `${padV} ${padH}`,
        display: 'flex', gap: u(40), alignItems: 'flex-start',
        // Only 390 stacks. The 768 master keeps the frame's two columns, at
        // 334 + 40 + 334 in its 708 of measure — so they stop being "a
        // flexible block beside a 450 card" and become equal halves.
        flexDirection: s.mob ? 'column' : 'row',
      }}>
        <div style={col(u(30), {
          flex: desk ? 1 : tab ? '1 1 0' : 'none',
          minWidth: 0, width: s.mob ? '100%' : undefined,
        })}>
          <div style={{
            // 437 at 1440 *and* at 768 — the desktop component's own number,
            // unscaled, which is the narrow pass's usual finding. Only 390
            // states its own, 262.
            height: u(s.mob ? 262 : 437),
            // A corner-walk of both narrow renders gives the same profile as
            // the desktop one, so the 30 is verbatim at all three widths.
            borderRadius: u(30), border: `1px solid ${mark}`,
            // The empty slot takes the card's pair, not `s.soft`/`s.muted`:
            // both are rgba of the page's text colour, and this sheet is not
            // the page — on Lime and Grunge the initials came back invisible.
            overflow: 'hidden', background: card,
          }}>
            {/* `null`, not undefined: an emptied stage photo must show the
                placeholder rather than fall through to `s.image`, which here is
                the portrait in the credit row below (photos.js's Remove rule).
                Both `initialsSize`s in this block are invented — the frames are
                photographs throughout and Retro seeds them, so they are only
                ever seen on the flat four and mid-edit. */}
            <Photo s={s} src={s.formPhoto ?? null} ink={cardInk} initialsSize={desk ? 56 : 40} />
          </div>
          <h2 style={{
            margin: 0, fontFamily: s.display,
            // `size/display-sm`, which is the one token here that ramps at both
            // narrow widths. Its 26 at 390 is what `s.dispSm` happened to be,
            // so only the 768 line moves (34 → 32).
            fontSize: u(T.disp),
            lineHeight: 1, letterSpacing: s.dls, color: mark,
            overflowWrap: 'break-word',
          }}>{s.title}</h2>
          {/* Frame 284. A space-between row at 1440 and at 390 — where its two
              halves come to the master's 370 exactly, so they sit flush — and
              a **column** at 768, the one width that stacks them. Transcribed
              rather than left to `flexWrap` (the video section's rule), and
              `alignItems` flips with the axis (the testimonials'): `flex-end`
              bottom-aligns the credit against the last tick in a row, and
              `flex-start` stops the stacked credit stretching to the measure. */}
          <div style={tab
            ? col(u(30), { alignItems: 'flex-start' })
            : row(u(20), {
              justifyContent: 'space-between', alignItems: 'flex-end',
              ...(desk ? { flexWrap: 'wrap', rowGap: u(20) } : null),
            })}>
            <div style={col(u(10), { minWidth: 0 })}>
              {s.formPromises.map((p) => (
                <span key={p} style={row(u(10), {
                  fontFamily: s.body, fontSize: u(T.labelXs), lineHeight: 1.26,
                })}>
                  <Check size={Math.round(12 * z)} style={{ flex: 'none' }} />
                  {p}
                </span>
              ))}
            </div>
            <span style={row(u(14), { flex: 'none' })}>
              <span style={{
                width: Math.round(48 * z), height: Math.round(48 * z),
                flex: 'none', borderRadius: '999px', overflow: 'hidden', background: card,
              }}><Photo s={s} ink={cardInk} initialsSize={desk ? 15 : 18} /></span>
              <span style={col(u(2))}>
                <span style={{
                  fontFamily: s.display, fontSize: u(T.list), lineHeight: 1.2, letterSpacing: s.dls,
                }}>{s.brand}</span>
                <span style={{ fontFamily: s.body, fontSize: u(T.labelXs), lineHeight: 1.26 }}>{s.kicker}</span>
              </span>
            </span>
          </div>
        </div>

        {/* `alignSelf: stretch` is the frame's own `self-stretch`, and it is
            what makes the card below actually sticky: a sticky element in a
            column exactly its own height has nowhere to travel. */}
        <div style={{
          // 450 beside a flexible column at 1440; an equal half at 768, where
          // the master splits its 708 as 334 + 40 + 334; the whole measure at
          // 390. `stretch` is what gives the sticky card somewhere to travel,
          // so it holds wherever the two columns stand side by side.
          width: s.mob ? '100%' : desk ? u(450) : undefined,
          flex: tab ? '1 1 0' : 'none', minWidth: 0,
          alignSelf: s.mob ? undefined : 'stretch',
        }}>
          <div style={col(u(14), {
            background: card, color: cardInk,
            border: `1px solid ${cardLine}`, borderRadius: u(30),
            padding: `${u(28)} ${u(24)}`, boxSizing: 'border-box',
            // The frame's own name for this option. Nothing between here and
            // the sheet clips, so it engages on a page whose left column runs
            // longer than the card — which is what a long field list does.
            position: 'sticky', top: 0,
          })}>
            {sent ? (
              // The card alone changes, the way layout 1 swaps its mustard half
              // and leaves the shell standing. `sent` is only ever set under
              // s.live, so the canvas never draws this.
              <>
                <h3 style={{
                  margin: 0, fontFamily: s.display, fontSize: u(T.title),
                  lineHeight: 1.1, letterSpacing: s.dls, color: cardAc,
                  overflowWrap: 'break-word',
                }}>{s.formSentTitle}</h3>
                <p style={{
                  margin: 0, fontFamily: s.body, fontSize: u(T.bodySm), lineHeight: 1.4,
                }}>{s.formSentBody}</p>
                {/* Plain text, not a second mailto: this line is the fallback
                    for a visitor whose browser opened nothing. */}
                <span style={{
                  fontFamily: s.body, fontWeight: 700, fontSize: u(T.email),
                  overflowWrap: 'break-word',
                }}>{s.formEmail}</span>
                <span onClick={() => setSent(false)} style={pill({ cursor: 'pointer' })}>
                  {s.formAgain}
                  {arrowDisc}
                </span>
              </>
            ) : (
              <>
                <div style={col(u(10))}>
                  {s.formFields.map((f, i) => {
                    const bad = !!(errs && errs.f[i])
                    return s.live ? (
                      <input
                        key={i} value={at(i)} placeholder={up(f.label)}
                        onChange={(e) => setAt(i, e.target.value)}
                        // Layout 1's rule: type="email" is free semantics and a
                        // phone keyboard, `number` gets inputMode only because
                        // the spinners break the stated height, and a date is a
                        // text box — the native picker cannot be styled onto
                        // this card.
                        type={f.kind === 'email' ? 'email' : 'text'}
                        inputMode={f.kind === 'number' ? 'numeric' : undefined}
                        style={{ ...boxShell(bad), outline: 'none' }}
                      />
                    ) : (
                      <span key={i} style={{
                        ...boxShell(bad), display: 'flex', alignItems: 'center',
                      }}>{up(f.label)}</span>
                    )
                  })}
                  <Pill {...pillLink} onClick={onSubmit} style={pill({
                    cursor: onSubmit ? 'pointer' : undefined,
                  })}>
                    {s.formBtn}
                    {arrowDisc}
                  </Pill>
                </div>
                {/* Immediately under the pill, where layout 1 puts it, so the
                    paragraph stays the card's last line in both states. */}
                {errs && (
                  <span style={{
                    fontFamily: s.body, fontSize: u(T.bodySm), textAlign: 'center',
                  }}>{s.formPrompt}</span>
                )}
                {foot}
              </>
            )}
          </div>
        </div>
      </div>
    )
  }
  // Layouts 3+ — the generic flat design. `NVAR.form` is 2, so nothing reaches
  // this today; it is what a third layout would render until it is fitted.
  // Its three boxes were hardcoded literals unrelated to the field list; they
  // are the artist's now, off the same state and the same hooks as v0 and v1 —
  // there is no second state model.
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
