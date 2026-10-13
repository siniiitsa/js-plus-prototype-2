# Master frames

File `uFoUbPaBrDicjyuSBEbtGT`. Each row is desktop / tablet / mobile, the order a census file's
keys follow. Layout N is design N − 1 of every section (`arch % designCount`); Retro's header
designs 5 and 6 have no page, so the probe falls back to the seed's own line count there.

| | Layout 1 | Layout 2 | Layout 3 | Layout 4 |
|---|---|---|---|---|
| Retro | 964:58575 · 986:31571 · 986:34443 | 964:64636 · 984:33491 · 984:34437 | 964:68621 · 977:21117 · 982:8748 | 964:72510 · 964:76437 · 971:12206 |
| Lime | 964:58587 · 986:39875 · 986:39888 | 964:64579 · 986:11847 · 986:11866 | 964:68653 · 984:10739 · 984:10770 | 964:72848 · 971:5298 · 977:8866 |
| Grunge | 964:58599 · 986:44056 · 986:44069 | 964:64617 · 986:13752 · 986:13771 | 964:68685 · 984:13899 · 984:13930 | 964:72943 · 971:7822 · 977:12043 |
| Editorial | 964:58611 · 986:48237 · 986:48250 | 964:64598 · 986:15657 · 986:15676 | 964:68717 · 984:16811 · 984:16842 | 964:73037 · 971:9537 · 977:13155 |
| Pop | 964:58623 · 986:52418 · 986:52431 | 964:64560 · 986:17562 · 986:17581 | 964:68750 · 984:15355 · 984:15386 | 964:73127 · 971:10835 · 977:14267 |

Section labels: `Hea` header, `Bio` bio, `Med` / `Vid` media, `Gal` gallery, `Rep` repertoire,
`Eve` map, `Pri` pricing, `Boo` calendar, `Enq` form, `Tes` testimonials, `Foo` / `Com` footer,
`Tag` the layout-4 bio. Layout 3's narrow frames nest the composed media and repertoire under
`Bio`, so the probe falls back to any section's entry for a seed its own section lacks.
`seeds.json` is `node scripts/limits.mjs --seed-list` at the time of the census (2026-10-13);
the indexes in the census files point into it, so regenerate both together.
