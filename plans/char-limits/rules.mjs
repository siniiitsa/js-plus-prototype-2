// node plans/char-limits/rules.mjs <jsonl...> — the session-1 rules applied to probe rows, printed as `chars` specs.
//   metadata: the measured cap (min over surfaces), never under the seed (the frame's floor)
//   sized   (c): min(measured, max(2×seed, seed+8)), never under the seed
//   block   (b): min(measured break, floor10(3×seed)); an 'open' surface is no break
//   count      : measured
import fs from 'node:fs'
const rows = process.argv.slice(2).flatMap((f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)))
const TH = ['Retro', 'Lime', 'Grunge', 'Editorial', 'Pop']
const ND = { Retro: { header: 6 }, '*': {} }
const SIZED = new Set(['header.cta1', 'header.cta2', 'header.heroCta', 'header.availability', 'header.badgeText', 'header.tags[]', 'bio.who.tags[]',
  'bio.tag', 'bio.cta', 'bio.cta2', 'media.cta', 'media.chipLabel',
  'pricing.cta', 'pricing.rowCta', 'pricing.badgeLabel', 'pricing.tiers.tags[]', 'repertoire.songs.tags[]',
  'gallery.backLabel', 'calendar.cta', 'calendar.slotCta', 'calendar.types[]',
  'map.venueCta', 'map.routeCta', 'map.cta', 'map.status', 'map.expand', 'map.rings[]'])
const BLOCK = new Set(['header.subtitle', 'header.faceBody', 'header.placeBody', 'bio.para1', 'bio.para2',
  'pricing.intro', 'pricing.quote', 'pricing.tiers.blurb'])
const ruleOf = (k) => (k.endsWith('#') ? 'count' : SIZED.has(k) ? 'sized' : BLOCK.has(k) ? 'block' : 'meta')
function capOf(r) {
  const rule = ruleOf(r.key)
  const surf = Object.values(r.surfaces).filter((s) => s.why !== 'unseen' && s.n != null)
  if (!surf.length) return null
  const breaks = surf.filter((s) => s.why !== 'open').map((s) => s.n)
  const measured = breaks.length ? Math.min(...breaks) : null
  const seed = r.seedLen
  if (rule === 'count') return measured
  if (rule === 'block') return Math.max(seed, Math.min(measured ?? Infinity, Math.floor((3 * seed) / 10) * 10))
  if (measured == null) return null // open everywhere: no cap
  if (rule === 'sized') return Math.max(seed, Math.min(measured, Math.max(2 * seed, seed + 8)))
  return Math.max(seed, measured)
}
const keys = [...new Set(rows.map((r) => r.key))].sort()
for (const key of keys) {
  const per = {}
  for (const t of TH) {
    const rs = rows.filter((r) => r.key === key && r.theme === t)
    if (!rs.length) continue
    const n = Math.max(...rs.map((r) => r.design)) + 1
    const arr = Array.from({ length: n }, (_, d) => { const r = rs.find((x) => x.design === d); return r ? capOf(r) : null })
    while (arr.length && arr[arr.length - 1] == null) arr.pop()
    per[t] = arr
  }
  const strs = Object.fromEntries(Object.entries(per).map(([t, a]) => [t, `[${a.map((x) => x ?? 'null').join(', ')}]`]))
  const vals = Object.values(strs)
  const spec = vals.length && vals.every((v) => v === vals[0]) && Object.keys(strs).length === 5 ? vals[0]
    : `{ ${Object.entries(strs).filter(([, v]) => v !== '[]').map(([t, v]) => `${t}: ${v}`).join(', ')} }`
  console.log(`${key.padEnd(26)} ${ruleOf(key).padEnd(6)} ${spec}`)
}
