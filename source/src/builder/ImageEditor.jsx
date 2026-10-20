import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { RotateCcw, RotateCw, ZoomIn, ZoomOut } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

/* ------------------------------------------------------------------ *
 * The image editor — move, zoom, rotate and crop an upload before it is
 * placed. Builder chrome (Tailwind + shadcn), not EncoreSection.
 *
 * The edit is BAKED: Apply renders the framed region to a canvas and hands
 * back a new data-URI string, so `c.image` stays a plain string and nothing
 * downstream (Photo, seedFocus, the published tab) knows an editor exists.
 * What a baked string cost is its source, so ORIGINALS keeps it: Edit on a
 * baked photo reopens the original at its last transform instead of cropping
 * already-cropped pixels. In memory only, like every upload (no persistence).
 *
 * Callers never mount a dialog: editImages() pushes onto a queue and the one
 * <ImageEditorHost> at the builder's root shows its head. That keeps the dialog
 * outside the mobile Edit drawer it is opened from.
 * ------------------------------------------------------------------ */

const MAX_EDGE = 1600
const ORIGINALS_MAX = 40
// bakedUrl → { original, tf }; insertion-ordered, oldest dropped past the cap.
const ORIGINALS = new Map()

const ZOOM_MAX = 4

let queue = []
let nextId = 1
const subs = new Set()
const emit = () => subs.forEach((f) => f())
const subscribe = (f) => { subs.add(f); return () => subs.delete(f) }
const getQueue = () => queue
let closedAt = 0
const shift = () => { queue = queue.slice(1); closedAt = Date.now(); emit() }

// True while the editor is up and for a beat after it closes: closing it hands
// focus back to the page, which a drawer underneath reads as a focus outside
// itself and dismisses. The mobile sheets guard on this (EncoreBuilder).
export const editorBusy = () => queue.length > 0 || Date.now() - closedAt < 500

// items: [{ src, aspect?: [w, h], onApply(url) }] — one batch, edited in order.
export function editImages(items) {
  if (!items.length) return
  queue = [...queue, ...items.map((it, i) => ({ ...it, id: nextId++, pos: i + 1, total: items.length }))]
  emit()
}

export function ImageEditorHost() {
  const head = useSyncExternalStore(subscribe, getQueue)[0]
  return head ? <Editor key={head.id} item={head} /> : null
}

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

function startTf() {
  return { cx: 0, cy: 0, zoom: 1, quarter: 0, fine: 0 }
}

// Everything the view and the bake share: the frame (fw × fh screen px), the
// scale s (screen px per natural px) that just covers it at this angle × zoom,
// and the crop centre c clamped so the frame never leaves the image.
function geometry(tf, iw, ih, fw, fh) {
  const th = ((tf.quarter * 90 + tf.fine) * Math.PI) / 180
  const cs = Math.abs(Math.cos(th))
  const sn = Math.abs(Math.sin(th))
  const smin = Math.max((cs * fw + sn * fh) / iw, (sn * fw + cs * fh) / ih)
  const s = smin * tf.zoom
  const mx = Math.max(0, iw / 2 - (cs * fw + sn * fh) / (2 * s))
  const my = Math.max(0, ih / 2 - (sn * fw + cs * fh) / (2 * s))
  return { th, s, cx: clamp(tf.cx, -mx, mx), cy: clamp(tf.cy, -my, my) }
}

// The frame is the field's own aspect; with none, the photo's shape at this quarter turn.
function frameRatio(aspect, tf, iw, ih) {
  if (aspect) return aspect[0] / aspect[1]
  return tf.quarter % 2 ? ih / iw : iw / ih
}

function mimeOf(src) {
  return /^data:image\/png|\.png(\?|$)/i.test(src) ? 'image/png' : 'image/jpeg'
}

function bake(img, iw, ih, tf, src, aspect) {
  const R = frameRatio(aspect, tf, iw, ih)
  const g = geometry(tf, iw, ih, R, 1) // frame of height 1: only its shape matters
  // The cropped region in natural px, then capped to MAX_EDGE on its long edge.
  const rw = R / g.s
  const rh = 1 / g.s
  const m = Math.min(1, MAX_EDGE / Math.max(rw, rh))
  const ow = Math.max(1, Math.round(rw * m))
  const oh = Math.max(1, Math.round(rh * m))
  const canvas = document.createElement('canvas')
  canvas.width = ow
  canvas.height = oh
  const ctx = canvas.getContext('2d')
  const mime = mimeOf(src)
  if (mime === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, ow, oh) }
  ctx.imageSmoothingQuality = 'high'
  ctx.translate(ow / 2, oh / 2)
  ctx.rotate(g.th)
  ctx.scale(m, m)
  ctx.translate(-g.cx, -g.cy)
  ctx.drawImage(img, -iw / 2, -ih / 2)
  return canvas.toDataURL(mime, 0.9)
}

function Editor({ item }) {
  const saved = ORIGINALS.get(item.src)
  const original = saved?.original ?? item.src
  const [dim, setDim] = useState(null) // { img, w, h }
  const [failed, setFailed] = useState(false)
  const [tf, setTf] = useState(() => saved?.tf ?? startTf())
  const [stage, setStage] = useState({ w: 0, h: 300 })
  const stageRef = useRef(null)
  const pointers = useRef(new Map())
  const pinch = useRef(null)
  const geo = useRef(null)

  useEffect(() => {
    const el = new Image()
    el.onload = () => setDim({ img: el, w: el.naturalWidth, h: el.naturalHeight })
    el.onerror = () => setFailed(true)
    el.src = original
  }, [original])

  // Measured after the dialog mounts; the stage is as wide as its column.
  useEffect(() => {
    const el = stageRef.current
    if (!el) return undefined
    const read = () => setStage({ w: el.clientWidth, h: clamp(Math.round(window.innerHeight * 0.4), 220, 320) })
    read()
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => ro.disconnect()
  }, [dim])

  const iw = dim?.w ?? 1
  const ih = dim?.h ?? 1
  const R = frameRatio(item.aspect, tf, iw, ih)
  const room = { w: Math.max(40, stage.w - 32), h: Math.max(40, stage.h - 32) }
  const fw = Math.min(room.w, room.h * R)
  const fh = fw / R
  const g = geometry(tf, iw, ih, fw, fh)
  geo.current = { g, iw, ih, fw, fh }

  const upd = (p) => setTf((t) => ({ ...t, cx: g.cx, cy: g.cy, ...p }))

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      pinch.current = { d: Math.hypot(a.x - b.x, a.y - b.y), zoom: tf.zoom }
    }
  }
  const onPointerMove = (e) => {
    const p = pointers.current.get(e.pointerId)
    if (!p) return
    const { g: gg } = geo.current
    if (pointers.current.size === 2 && pinch.current) {
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
      const [a, b] = [...pointers.current.values()]
      const d = Math.hypot(a.x - b.x, a.y - b.y)
      const zoom = clamp(pinch.current.zoom * (d / pinch.current.d), 1, ZOOM_MAX)
      setTf((t) => ({ ...t, cx: gg.cx, cy: gg.cy, zoom }))
      return
    }
    const dx = e.clientX - p.x
    const dy = e.clientY - p.y
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    // A drag moves the image on screen; the crop centre moves the other way,
    // in the image's own (rotated) axes.
    const c = Math.cos(gg.th)
    const s = Math.sin(gg.th)
    setTf((t) => ({
      ...t,
      cx: gg.cx - (dx * c + dy * s) / gg.s,
      cy: gg.cy - (-dx * s + dy * c) / gg.s,
    }))
  }
  const onPointerEnd = (e) => {
    pointers.current.delete(e.pointerId)
    pinch.current = null
  }
  const onWheel = (e) => upd({ zoom: clamp(tf.zoom * Math.exp(-e.deltaY * 0.0015), 1, ZOOM_MAX) })

  const finish = (url) => {
    item.onApply(url)
    shift()
  }
  const apply = () => {
    try {
      const url = bake(dim.img, iw, ih, { ...tf, cx: g.cx, cy: g.cy }, original, item.aspect)
      ORIGINALS.set(url, { original, tf: { ...tf, cx: g.cx, cy: g.cy } })
      if (ORIGINALS.size > ORIGINALS_MAX) ORIGINALS.delete(ORIGINALS.keys().next().value)
      finish(url)
    } catch {
      finish(original)
    }
  }
  const cancel = () => shift()

  const batch = item.total > 1

  return (
    <Dialog open onOpenChange={(o) => { if (!o) cancel() }}>
      <DialogContent
        className="gap-3 p-4 sm:max-w-xl"
        onClick={(e) => e.stopPropagation()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-base">
            {item.edit ? 'Edit photo' : 'Frame your photo'}{batch ? ` · ${item.pos} of ${item.total}` : ''}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Drag to move, pinch or use the slider to zoom. Only what is inside the frame is kept.
          </DialogDescription>
        </DialogHeader>

        <div
          ref={stageRef}
          onPointerDown={onPointerDown} onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd} onWheel={onWheel}
          className="relative w-full cursor-grab touch-none overflow-hidden rounded-lg bg-neutral-900 select-none active:cursor-grabbing"
          style={{ height: stage.h }}
        >
          {failed && <p className="absolute inset-0 grid place-items-center text-xs text-white/70">That image could not be opened.</p>}
          {dim && stage.w > 0 && (
            <>
              <img
                src={original} alt="" draggable={false}
                style={{
                  position: 'absolute', maxWidth: 'none', pointerEvents: 'none',
                  width: iw, height: ih,
                  left: stage.w / 2 - iw / 2, top: stage.h / 2 - ih / 2,
                  transform: `rotate(${g.th}rad) scale(${g.s}) translate(${-g.cx}px, ${-g.cy}px)`,
                }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute', pointerEvents: 'none', width: fw, height: fh,
                  left: (stage.w - fw) / 2, top: (stage.h - fh) / 2,
                  boxShadow: '0 0 0 9999px rgba(0,0,0,.58)', outline: '1.5px solid #fff',
                  backgroundImage:
                    'linear-gradient(to right, transparent 33.2%, rgba(255,255,255,.35) 33.3%, transparent 33.5%, transparent 66.5%, rgba(255,255,255,.35) 66.6%, transparent 66.8%),'
                    + 'linear-gradient(to bottom, transparent 33.2%, rgba(255,255,255,.35) 33.3%, transparent 33.5%, transparent 66.5%, rgba(255,255,255,.35) 66.6%, transparent 66.8%)',
                }}
              />
            </>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <ZoomOut size={14} className="shrink-0" />
            <Slider
              aria-label="Zoom" min={1} max={ZOOM_MAX} step={0.01} value={[tf.zoom]}
              onValueChange={([v]) => upd({ zoom: v })}
            />
            <ZoomIn size={14} className="shrink-0" />
          </label>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Button type="button" size="sm" variant="outline" className="h-7 px-2" aria-label="Rotate left 90°"
              onClick={() => upd({ quarter: (tf.quarter + 3) % 4 })}><RotateCcw size={14} /></Button>
            <Slider
              aria-label="Straighten" min={-45} max={45} step={0.5} value={[tf.fine]}
              onValueChange={([v]) => upd({ fine: v })}
            />
            <Button type="button" size="sm" variant="outline" className="h-7 px-2" aria-label="Rotate right 90°"
              onClick={() => upd({ quarter: (tf.quarter + 1) % 4 })}><RotateCw size={14} /></Button>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:justify-between">
          <Button type="button" variant="ghost" size="sm" onClick={() => setTf(startTf())}>Reset</Button>
          <div className="flex flex-wrap justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={cancel}>{batch ? 'Skip photo' : 'Cancel'}</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => finish(original)}>Use original</Button>
            <Button type="button" size="sm" disabled={!dim} onClick={apply}>Apply</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
