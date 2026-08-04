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
  ArrowRight, ArrowUpRight, Star,
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

/* ------------------------------------------------------------------ *
 * §10.2 Shared header primitives
 * ------------------------------------------------------------------ */

function LogoMark({ s, size = 18 }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: '999px', background: s.ac,
      color: s.acFg, fontSize: '8px', fontWeight: 800, flex: 'none',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    }}>{s.initials}</span>
  )
}

function Wordmark({ s, logo = false, color }) {
  return (
    <span style={row('8px')}>
      {logo && <LogoMark s={s} />}
      <span style={{
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

function BookPill({ s }) {
  return (
    <span style={{
      ...row('8px'), background: s.ac, color: s.acFg, fontSize: '10px', fontWeight: 700,
      letterSpacing: '1.2px', textTransform: 'uppercase', padding: '9px 18px',
      borderRadius: s.btnR, cursor: 'pointer', whiteSpace: 'nowrap',
    }}>
      {s.cta1}
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
function Title({ s, size, color, twoTone = false, align = 'left' }) {
  const t = s.heroTitle || ''
  const i = t.indexOf(' ')
  const a = i === -1 ? t : t.slice(0, i)
  const b = i === -1 ? '' : t.slice(i + 1)
  return (
    <h1 style={{
      margin: 0, fontFamily: s.display, fontSize: size || s.h1, lineHeight: 0.92,
      letterSpacing: s.dls, color: color || s.tx, textAlign: align,
    }}>
      <span style={{ display: 'block', color: twoTone ? s.tx : undefined }}>{a}</span>
      {b && <span style={{ display: 'block', color: twoTone ? s.ac : undefined }}>{b}</span>}
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
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', justifyContent: justify }}>
      {s.chips.map((c, i) => (
        <span key={i} style={{
          background: c.bg, color: c.fg, fontSize: '9px', fontWeight: 700,
          letterSpacing: '1px', textTransform: 'uppercase', padding: '5px 11px',
          borderRadius: s.btnR, whiteSpace: 'nowrap',
        }}>{c.label}</span>
      ))}
    </div>
  )
}

function SealBadge({ s, style }) {
  const id = useId().replace(/:/g, '')
  if (s.showBadge !== 'show') return null
  const size = s.mob ? 52 : 76

  // ~24-point radial starburst
  const spikes = 24
  const pts = []
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? 50 : 43
    const a = (Math.PI * i) / spikes - Math.PI / 2
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`)
  }

  return (
    <div style={{ position: 'absolute', width: size, height: size, ...style }}>
      <svg viewBox="0 0 100 100" width={size} height={size} className="seal-spin"
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

function Checkerboard({ s, style }) {
  return (
    <div style={{
      height: '14px', width: '100%',
      background: `repeating-conic-gradient(${s.tx} 0% 25%, transparent 0% 50%) 0 0 / 14px 14px`,
      ...style,
    }} />
  )
}

function Photo({ s, style, initialsSize = 44 }) {
  if (s.image) {
    return <img src={s.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }} />
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

function InsetCard({ s, thumb = 34, style }) {
  if (s.mob) return null
  return (
    <div style={{
      ...row('10px'), background: s.bg, borderRadius: s.radiusSm, padding: '10px',
      boxShadow: '0 8px 24px rgba(0,0,0,.28)', color: s.tx, ...style,
    }}>
      <div style={{ width: thumb, height: thumb, borderRadius: s.radiusSm, overflow: 'hidden', flex: 'none' }}>
        <Photo s={s} initialsSize={Math.round(thumb / 2.4)} />
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
}

/* ------------------------------------------------------------------ *
 * §10.2 The six photographic header compositions (Retro)
 * ------------------------------------------------------------------ */

// v0 — Header layout 1 · Split portrait
function HeaderV0({ s }) {
  const items = s.align === 'centre' ? 'center' : 'flex-start'
  return (
    <div style={{ position: 'relative' }}>
      {/* The seal sits at top:-18px right:24px, so the bar keeps clear of it. */}
      <div style={{ ...row('20px', {
        justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: s.navGap,
        // This seal sits at right:24px, so it needs more room than sealGap().
        paddingRight: s.showBadge !== 'show' ? 0 : s.mob ? '76px' : '108px',
      }) }}>
        <Wordmark s={s} logo />
        {!s.mob && <NavLinks s={s} />}
        <BookPill s={s} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: s.split, gap: '48px', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: '-10px auto auto -10px', width: '100%', paddingBottom: '120%',
            border: `1.5px solid ${s.ac}`, borderRadius: s.radius, background: 'transparent',
          }} />
          <div style={{
            position: 'relative', aspectRatio: '4 / 4.8', borderRadius: s.radius, overflow: 'hidden',
          }}><Photo s={s} initialsSize={56} /></div>
        </div>
        <div style={col('16px', { alignItems: items, textAlign: s.align === 'centre' ? 'center' : 'left' })}>
          <Kicker s={s} />
          <Title s={s} align={s.align === 'centre' ? 'center' : 'left'} />
          <LocationLine s={s} />
          <TagChips s={s} justify={s.align === 'centre' ? 'center' : 'flex-start'} />
        </div>
      </div>
      <SealBadge s={s} style={{ top: '-18px', right: '24px' }} />
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
            <Photo s={s} initialsSize={14} />
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

function Bio({ s }) {
  if (s.v0) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: s.split, gap: '48px', alignItems: 'center' }}>
        <div style={{
          background: s.soft, aspectRatio: '4 / 4.6', borderRadius: s.radius,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: s.display, fontSize: '56px', color: s.muted, letterSpacing: s.dls }}>{s.initials}</span>
        </div>
        <div style={col('16px')}>
          <span style={kickerStyle(s)}>About</span>
          <h2 style={{ margin: 0, ...h2Style(s), lineHeight: 1.04 }}>{s.title}</h2>
          <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.65, color: s.muted }}>{s.bioP1}</p>
          <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.65, color: s.muted }}>{s.bioP2}</p>
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

function Media({ s }) {
  if (s.v0) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: s.split, gap: '44px', alignItems: 'center' }}>
        <div style={{
          background: s.ac, color: s.acFg, aspectRatio: '1', maxWidth: '420px', width: '100%',
          borderRadius: s.radius, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: s.display, fontSize: '52px', letterSpacing: s.dls }}>{s.initials}</span>
        </div>
        <div style={col('16px')}>
          <span style={kickerStyle(s)}>{s.mediaKicker}</span>
          <h2 style={{ margin: 0, fontFamily: s.display, fontSize: s.h2, letterSpacing: s.dls, lineHeight: 1.02 }}>{s.mediaTrack}</h2>
          <div style={{ height: '4px', background: s.line, borderRadius: '99px', marginTop: '8px' }}>
            <div style={{ width: '42%', height: '100%', background: s.ac, borderRadius: '99px' }} />
          </div>
          <div style={row('0', { justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: s.muted })}>
            <span>1:34</span><span>3:42</span>
          </div>
          <div style={row('12px', { marginTop: '4px' })}>
            <span style={{
              width: '40px', height: '40px', borderRadius: '999px', border: `1.5px solid ${s.line2}`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}><SkipBack size={12} /></span>
            <span style={{
              width: '54px', height: '54px', borderRadius: '999px', background: s.ac, color: s.acFg,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}><Play size={16} /></span>
            <span style={{
              width: '40px', height: '40px', borderRadius: '999px', border: `1.5px solid ${s.line2}`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}><SkipForward size={12} /></span>
          </div>
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

function Pricing({ s }) {
  if (s.v0) {
    return (
      <div>
        <div style={col('12px', { alignItems: 'center', textAlign: 'center', marginBottom: '36px' })}>
          <h2 style={{ margin: 0, ...h2Style(s) }}>{s.title}</h2>
          <p style={{ margin: 0, fontSize: '15px', color: s.muted }}>{s.pricingSub}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: s.g3, gap: '18px', alignItems: 'stretch' }}>
          {s.tiers.map((t, i) => (
            <div key={i} style={{
              background: t.bg, color: t.tx, border: `1.5px solid ${t.border}`, borderRadius: s.radius,
              padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: '14px',
              transition: 'background-color .45s ease, color .45s ease',
            }}>
              <span style={{
                fontSize: '12px', fontWeight: 700, letterSpacing: '1.6px',
                textTransform: 'uppercase', color: t.nameC,
              }}>{t.name}</span>
              <div style={row('8px', { alignItems: 'baseline' })}>
                <span style={{ fontFamily: s.display, fontSize: '38px', letterSpacing: s.dls }}>{t.price}</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: t.mut }}>/ night</span>
              </div>
              <div style={col('9px')}>
                {t.feats.map((f, j) => (
                  <span key={j} style={row('8px', { alignItems: 'flex-start', fontSize: '13px', lineHeight: 1.4 })}>
                    <Check size={13} style={{ color: t.tick, flex: 'none', marginTop: '2px' }} />
                    {f}
                  </span>
                ))}
              </div>
              <span style={{
                marginTop: 'auto', paddingTop: '10px',
              }}>
                <span style={{
                  display: 'block', background: t.btnBg, color: t.btnFg, fontSize: '12px', fontWeight: 700,
                  letterSpacing: '1.2px', textTransform: 'uppercase', padding: '12px', borderRadius: s.btnR,
                  textAlign: 'center', width: '100%', cursor: 'pointer',
                }}>Enquire</span>
              </span>
            </div>
          ))}
        </div>
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

function Repertoire({ s }) {
  return (
    <div>
      <h2 style={{ margin: '0 0 30px', ...h2Style(s) }}>{s.title}</h2>
      {s.v0 && (
        <div style={{ display: 'grid', gridTemplateColumns: s.g3, gap: '32px' }}>
          {s.rep.map((g, i) => (
            <div key={i} style={col('12px')}>
              <span style={{
                ...kickerStyle(s), borderBottom: `1.5px solid ${s.line}`, paddingBottom: '10px',
              }}>{g.genre}</span>
              {g.items.map((it, j) => (
                <span key={j} style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.4 }}>{it}</span>
              ))}
            </div>
          ))}
        </div>
      )}
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
  return (
    <div>
      <h2 style={{ margin: '0 0 28px', ...h2Style(s) }}>{s.title}</h2>
      {s.v0 && (
        <div style={{ display: 'grid', gridTemplateColumns: s.g3, gap: '14px' }}>
          {s.gal.map((l) => tile(l, '4 / 3'))}
        </div>
      )}
      {s.v1 && (
        <div style={row('14px', { overflow: 'hidden', alignItems: 'stretch' })}>
          {s.gal4.map((l) => tile(l, '3 / 4', { flex: 1, minWidth: '120px' }))}
        </div>
      )}
    </div>
  )
}

function Calendar({ s }) {
  if (s.v0) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: s.split, gap: '48px', alignItems: 'center' }}>
        <div style={col('16px', { alignItems: 'flex-start' })}>
          <span style={kickerStyle(s)}>Booking calendar</span>
          <h2 style={{ margin: 0, ...h2Style(s), lineHeight: 1.04 }}>{s.title}</h2>
          <p style={{ margin: 0, fontSize: '15px', color: s.muted, lineHeight: 1.6 }}>{s.calPara}</p>
          <span style={ctaPrimary(s)}>{s.calCta}</span>
        </div>
        <div style={{ border: `1.5px solid ${s.line}`, borderRadius: s.radius, padding: '20px' }}>
          <div style={row('12px', { justifyContent: 'space-between', marginBottom: '14px' })}>
            <span style={{ fontFamily: s.display, fontSize: '18px', letterSpacing: s.dls }}>{s.monthLabel}</span>
            <span style={row('8px', { color: s.muted })}>
              <ChevronLeft size={12} style={{ cursor: 'pointer' }} />
              <ChevronRight size={12} style={{ cursor: 'pointer' }} />
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {s.cal.map((c, i) => (
              <span key={i} style={{
                aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 600, borderRadius: s.radiusSm,
                background: c.bg, color: c.fg,
              }}>{c.d}</span>
            ))}
          </div>
          <div style={row('16px', { marginTop: '14px', fontSize: '11px', fontWeight: 600, color: s.muted })}>
            <span style={row('6px')}>
              <span style={{ width: '9px', height: '9px', borderRadius: '999px', background: s.ac }} />Booked
            </span>
            <span style={row('6px')}>
              <span style={{ width: '9px', height: '9px', borderRadius: '999px', background: s.soft2 }} />Held
            </span>
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

  if (s.v0) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: s.split, gap: '44px', alignItems: 'center' }}>
        <div style={col('14px')}>
          <span style={kickerStyle(s)}>Events map</span>
          <h2 style={{ margin: '0 0 8px', ...h2Style(s), lineHeight: 1.04 }}>{s.title}</h2>
          {s.cities.map((c, i) => (
            <div key={i} style={row('12px', {
              alignItems: 'baseline', padding: '10px 0', borderBottom: `1.5px solid ${s.line}`,
            })}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: s.ac, width: '56px', flex: 'none' }}>{c.date}</span>
              <span style={{ fontSize: '14px', fontWeight: 700, flex: 1, minWidth: 0 }}>{c.city}</span>
              <span style={{ fontSize: '12px', color: s.muted }}>{c.venue}</span>
            </div>
          ))}
        </div>
        <div style={{
          background: s.soft, aspectRatio: '4 / 3.2', borderRadius: s.radius,
          position: 'relative', overflow: 'hidden',
        }}>
          {pins}
          <span style={{
            position: 'absolute', right: '14px', bottom: '12px', fontSize: '10px', fontWeight: 700,
            letterSpacing: '1.4px', textTransform: 'uppercase', color: s.muted,
          }}>UK &amp; Ireland</span>
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

function Testimonials({ s }) {
  if (s.v0) {
    const q = s.quotes[0]
    return (
      <div style={col('22px', { alignItems: 'center', textAlign: 'center', maxWidth: '780px', margin: '0 auto' })}>
        {/* Typographic quote mark with a deliberate optical trim (§3.6) */}
        <span style={{ fontFamily: s.display, fontSize: '52px', color: s.ac, lineHeight: 0, height: '22px' }}>“</span>
        <p style={{ margin: 0, fontFamily: s.display, fontSize: s.h2, letterSpacing: s.dls, lineHeight: 1.14 }}>{s.quote1}</p>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700 }}>{q.who}</div>
          <div style={{ fontSize: '12px', color: s.muted }}>{q.role}</div>
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

  if (s.v0) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: s.split, gap: '48px', alignItems: 'start' }}>
        <div style={col('16px')}>
          <span style={kickerStyle(s)}>Enquiries</span>
          <h2 style={{ margin: 0, ...h2Style(s), lineHeight: 1.04 }}>{s.title}</h2>
          <p style={{ margin: 0, fontSize: '15px', color: s.muted, lineHeight: 1.6 }}>{s.formPara}</p>
          <span style={{ fontSize: '13px', fontWeight: 600 }}>{s.formEmail}</span>
        </div>
        <div style={col('12px')}>
          <div style={{ display: 'grid', gridTemplateColumns: s.g2, gap: '12px' }}>
            <input style={inputStyle(s)} placeholder="Your name" readOnly />
            <input style={inputStyle(s)} placeholder="Email" readOnly />
          </div>
          <input style={inputStyle(s)} placeholder="Event date &amp; venue" readOnly />
          <textarea rows={4} style={{ ...inputStyle(s), resize: 'none' }} placeholder="Tell me about the event…" readOnly />
          {submit}
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

function Footer({ s }) {
  return (
    <div style={col('22px', { alignItems: 'center', textAlign: 'center' })}>
      <span style={{ fontFamily: s.display, fontSize: '26px', letterSpacing: s.dls }}>{s.brand}</span>
      <div style={row('26px', { flexWrap: 'wrap', justifyContent: 'center' })}>
        {['Music', 'Shows', 'Rates', 'Book'].map((l) => (
          <a key={l} href="#" style={{
            fontSize: '12px', fontWeight: 700, letterSpacing: '1.4px', textTransform: 'uppercase',
          }}>{l}</a>
        ))}
      </div>
      <div style={row('10px')}>
        {['IG', 'SC', 'YT'].map((l) => (
          <span key={l} className="hv-acfill" style={{
            width: '34px', height: '34px', borderRadius: '999px', border: `1.5px solid ${s.line2}`,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '10px', fontWeight: 800, cursor: 'pointer',
            transition: 'background-color .15s ease, color .15s ease, border-color .15s ease',
          }}>{l}</span>
        ))}
      </div>
      <div style={{
        fontSize: '12px', color: s.muted, borderTop: `1.5px solid ${s.line}`,
        paddingTop: '18px', width: '100%',
      }}>{s.copyright}</div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Root
 * ------------------------------------------------------------------ */

export default function EncoreSection({ s }) {
  return (
    <div style={{
      background: s.bg, color: s.tx, fontFamily: s.body, padding: s.pad,
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
