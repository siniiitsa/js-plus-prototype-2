// The events map's real map (user call, 2026-11-09): MapLibre GL over OpenFreeMap's
// keyless vector tiles, fixed on a town and framed so a radius in miles reaches the
// outer ring.
//
// A leaf module, and EncoreSection's one exception to "its only library import is
// lucide-react": the section stays free of effects and of the library; this file
// owns them. Everything it draws is an inline style, apart from MapLibre's own
// stylesheet, which only sizes the canvas it creates.
//
//   geo       { lat, lon, miles } — sectionVm's `vm.mapGeo` (null never reaches here)
//   fit       'width' (default) or 'min': what ringFrac is a share of — the viewport's
//             width, or its shorter side (layout 1, whose one ring is a circle)
//   ringFrac  the outer ring's diameter as a share of the viewport's width, which is
//             what the section already draws its rings from (`ringW[0] / 100`, or
//             `rings[0].d / vw`), so radius `miles` lands exactly on that ring
//   style     the layer's dress — the tint, blend and filter the raster used to wear
//   fallback  the seeded raster's url, drawn instead if the map cannot load: no
//             WebGL, a blocked tile host, no network (nothing in `idle` within 12 s)
//   live      the published page: the attribution's links take clicks. On the canvas
//             the map is a picture, so nothing in here takes a pointer.
//
// The view is fixed (`interactive: false`), so it is framed once and again only when
// the box resizes. The ResizeObserver is the element's own window's, since the
// published tab is another window and the opener's observer does not see its nodes.
import { useEffect, useRef, useState } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { mapZoomFor } from './data.js'

const STYLE_URL = 'https://tiles.openfreemap.org/styles/positron'
const GIVE_UP_MS = 12000

let libPromise = null
function loadMapLibre() {
  libPromise ||= Promise.all([
    import('maplibre-gl'),
    import('maplibre-gl/dist/maplibre-gl-worker.mjs?raw'),
  ]).then(([ml, worker]) => {
    // The worker is inlined as a Blob, so the single-file build (and a
    // double-clicked file://) needs no second file beside it.
    const lib = ml.default ?? ml
    lib.setWorkerUrl(URL.createObjectURL(new Blob([worker.default], { type: 'text/javascript' })))
    return lib
  })
  return libPromise
}

const ATTR = { fontFamily: 'system-ui, sans-serif', fontSize: '9px', lineHeight: 1.3, color: '#3a3a3a' }

export default function RealMap({ geo, ringFrac = 1, fit = 'width', style, fallback, live = false }) {
  const box = useRef(null)
  const [failed, setFailed] = useState(false)
  const { lat, lon, miles } = geo

  useEffect(() => {
    const el = box.current
    if (!el) return undefined
    let map = null
    let ro = null
    let dead = false
    let timer = 0
    const win = el.ownerDocument.defaultView || window
    // Out of the way for good: drop the canvas so the raster underneath shows.
    const fail = () => {
      if (dead) return
      if (ro) ro.disconnect()
      if (map) { map.remove(); map = null }
      setFailed(true)
    }
    // What `ringFrac` is a share of: the viewport's width (layouts 2-4, whose
    // rings are drawn from it) or its shorter side (layout 1's single ring).
    const base = () => (fit === 'min' ? Math.min(el.clientWidth, el.clientHeight) : el.clientWidth)
    const frame = () => {
      if (!map) return
      const w = el.clientWidth
      if (!w || !el.clientHeight) return
      map.resize()
      map.jumpTo({ center: [lon, lat], zoom: mapZoomFor(lat, miles, (ringFrac * base()) / 2) })
    }
    loadMapLibre().then((lib) => {
      if (dead) return
      try {
        map = new lib.Map({
          container: el, style: STYLE_URL, center: [lon, lat],
          zoom: mapZoomFor(lat, miles, (ringFrac * (base() || 600)) / 2),
          interactive: false, attributionControl: false, fadeDuration: 0, renderWorldCopies: false,
        })
      } catch {
        fail()
        return
      }
      timer = win.setTimeout(fail, GIVE_UP_MS)
      map.once('idle', () => win.clearTimeout(timer))
      map.on('error', (e) => { if (e?.error && /style/i.test(String(e.error.message))) fail() })
      if (win.ResizeObserver) {
        ro = new win.ResizeObserver(frame)
        ro.observe(el)
      }
    }).catch(fail)
    return () => {
      dead = true
      win.clearTimeout(timer)
      if (ro) ro.disconnect()
      if (map) map.remove()
    }
  }, [lat, lon, miles, ringFrac, fit])

  const link = (href, text) => (
    <a href={href} target="_blank" rel="noopener noreferrer" tabIndex={live ? 0 : -1}
       style={{ color: 'inherit', textDecoration: 'underline', pointerEvents: live ? 'auto' : 'none' }}>{text}</a>
  )
  return (
    <>
      <span ref={box} aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
        ...style,
        ...(failed && fallback
          ? { backgroundImage: `url(${fallback})`, backgroundSize: 'cover', backgroundPosition: 'center' } : null),
      }} />
      {!failed && (
        <span style={{
          ...ATTR, position: 'absolute', right: 0, bottom: 0, zIndex: 1, padding: '1px 4px',
          background: 'rgba(255,255,255,.7)', pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>
          {link('https://openfreemap.org', 'OpenFreeMap')}{' '}
          {link('https://www.openmaptiles.org/', '© OpenMapTiles')}{' '}
          Data from {link('https://www.openstreetmap.org/copyright', 'OpenStreetMap')}
        </span>
      )}
    </>
  )
}
