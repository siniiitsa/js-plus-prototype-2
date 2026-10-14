// The Figma census walk (plans/char-limits.md, Measurement method A): run once
// per template and layout through the Figma MCP's use_figma, read-only, with
// SEEDS = census/seeds.json pasted in and FRAMES = that pair's three masters
// (desktop, tablet, mobile, in that order; FRAMES.md). Each frame maps to a
// string of entries, one per (seed, section): "<seed index><Sec>" for a box
// Figma draws on one auto-width line, else "<seed index><Sec>:<lines><auto
// resize><width>" — lines = round(height / line height), auto resize W / H / N /
// T for WIDTH_AND_HEIGHT / HEIGHT / NONE / TRUNCATE, the widest box when a
// seed recurs. <Sec> is the first three letters of the frame's top-level
// section ("Hea", "Bio", "Med", …). Saved as census/<Template>-<design>.json.
const SEEDS = __SEEDS__
const FRAMES = __FRAMES__
const idx = new Map(SEEDS.map((s, i) => [s, i]))
const alnum = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, '')
const out = {}
for (const fid of FRAMES) {
  const frame = await figma.getNodeByIdAsync(fid)
  let pg = frame; while (pg.type !== 'PAGE') pg = pg.parent
  if (figma.currentPage !== pg) await figma.setCurrentPageAsync(pg)
  const secOf = new Map()
  for (const kid of frame.children) {
    let name = kid.name
    if (!name.includes(' — ') && 'findOne' in kid) { const d = kid.findOne((n) => n.name.includes(' — ')); if (d) name = d.name }
    secOf.set(kid.id, name.split(' — ')[0].split(' ')[0])
  }
  const agg = new Map()
  for (const t of frame.findAllWithCriteria({ types: ['TEXT'] })) {
    const i = idx.get(alnum(t.characters))
    if (i === undefined) continue
    let vis = true, kid = t
    for (let a = t; a && a !== frame; a = a.parent) { if (a.visible === false) vis = false; kid = a }
    if (!vis) continue
    const fs = typeof t.fontSize === 'number' ? t.fontSize : t.getRangeFontSize(0, 1)
    const lhv = t.lineHeight === figma.mixed ? t.getRangeLineHeight(0, 1) : t.lineHeight
    const lh = lhv.unit === 'PIXELS' ? lhv.value : lhv.unit === 'PERCENT' ? lhv.value / 100 * fs : fs * 1.2
    const ar = { NONE: 'N', HEIGHT: 'H', WIDTH_AND_HEIGHT: 'W', TRUNCATE: 'T' }[t.textAutoResize] || '?'
    const lines = Math.max(1, Math.round(t.height / lh))
    const k = i + (secOf.get(kid.id) || '?').slice(0, 3)
    const o = agg.get(k)
    if (!o || lines > o[0]) agg.set(k, [lines, ar, Math.round(t.width)])
  }
  out[fid] = [...agg].map(([k, v]) => v[0] === 1 && v[1] === 'W' ? k : `${k}:${v[0]}${v[1]}${v[2]}`).join(' ')
}
return out
