// node plans/char-limits/table.mjs <jsonl...> — markdown: field | template | layout | 1440 / 768 / 390 (/ column) | probe cap
import fs from 'node:fs'
const rows = process.argv.slice(2).flatMap((f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)))
const TH = ['Retro', 'Lime', 'Grunge', 'Editorial', 'Pop']
const cell = (s) => (!s || s.why === 'unseen' ? '–' : `${s.why === 'open' ? '400+' : s.n}${s.why && !['samples', 'ok', 'open'].includes(s.why) ? ` ${s.why.split(' ')[0]}` : ''}${s.grow ? ` ×${s.grow}` : ''}`)
console.log('| field | template | layout | seed | 1440 | 768 | 390 | 1440 column | probe |')
console.log('|---|---|---|---|---|---|---|---|---|')
const keys = [...new Set(rows.map((r) => r.key))].sort()
for (const key of keys) for (const t of TH) {
  for (const r of rows.filter((x) => x.key === key && x.theme === t).sort((a, b) => a.design - b.design)) {
    const S = r.surfaces
    if (Object.values(S).every((s) => s.why === 'unseen')) continue
    const colK = Object.keys(S).find((k) => k.includes('/'))
    console.log(`| ${key} | ${t} | ${r.design + 1} | ${r.seedLen} | ${cell(S.desktop)} | ${cell(S.tablet)} | ${cell(S.mobile)} | ${colK ? cell(S[colK]) : ''} | ${r.cap ?? '–'} |`)
  }
}
