// Throwaway harness for fitting a section to its Figma frame. Renders one
// section at one canvas width with no editor chrome, so a screenshot lines up
// with the frame. Not part of the app; not committed.
//
//   /preview.html?cat=bio&arch=1&w=desktop
import { createRoot } from 'react-dom/client'
import './index.css'
import { sectionVm } from './builder/EncoreBuilder.jsx'
import EncoreSection from './builder/EncoreSection.jsx'

const Z = {
  desktop: {
    h1: '86px', h1b: '118px', h2: '46px', pad: '80px 64px', navGap: '64px',
    split: '1.05fr 1fr', g3: '1fr 1fr 1fr', g2: '1fr 1fr', canvasW: '1180px',
    dispXl: '105px', dispLg: '79px', dispSm: '33px', title: '20px',
    labelMd: '16px', labelXs: '14px', eyebrow: '12px', gPad: '46px', gGap: '36px',
    padY: '80px', padX: '64px', narrow: false, surplus: '0px', heroH: 614,
  },
  tablet: {
    h1: '60px', h1b: '78px', h2: '36px', pad: '56px 40px', navGap: '48px',
    split: '1fr 1fr', g3: '1fr 1fr 1fr', g2: '1fr 1fr', canvasW: '768px',
    dispXl: '77px', dispLg: '64px', dispSm: '34px', title: '22px',
    labelMd: '14px', labelXs: '14px', eyebrow: '13px', gPad: '32px', gGap: '28px',
    padY: '56px', padX: '40px', narrow: true, surplus: '0px', heroH: 1024,
  },
  mobile: {
    h1: '42px', h1b: '50px', h2: '29px', pad: '44px 22px', navGap: '36px',
    split: '1fr', g3: '1fr', g2: '1fr', canvasW: '390px',
    dispXl: '77px', dispLg: '40px', dispSm: '26px', title: '18px',
    labelMd: '14px', labelXs: '14px', eyebrow: '11px', gPad: '20px', gGap: '18px',
    padY: '44px', padX: '22px', narrow: true, surplus: '0px', heroH: 844,
  },
}

const q = new URLSearchParams(location.search)
const cat = q.get('cat') || 'bio'
const arch = Number(q.get('arch') ?? 1)
const device = q.get('w') || 'desktop'
const themeIdx = Number(q.get('theme') ?? 0)

const navSections = [
  { cat: 'header', label: 'Header' }, { cat: 'bio', label: 'About' },
  { cat: 'media', label: 'Top tracks' }, { cat: 'form', label: 'Enquiries' },
]

// &n=8 fills the section's list-shaped content with n rows, to see a design
// hold at a count the seed does not reach (FIELDS.media.tracks allows 8). It
// fills the key the section under test actually reads — one entry per category
// whose layout 2 draws a list — so `&n=0` is also how an emptied list is seen.
const LIST = {
  media: (i) => ({ title: `Track ${i + 1}`, sub: 'Single' }),
  video: (i) => ({ title: `Video ${i + 1}`, sub: 'Live set', length: '03:50', when: 'April 2026' }),
}
const KEY = { media: 'tracks', video: 'videos' }
const count = q.get('n') === null ? null : Number(q.get('n'))
const c = count === null || !LIST[cat]
  ? {}
  : { [KEY[cat]]: Array.from({ length: count }, (_, i) => LIST[cat](i)) }

// &live=1 renders the section as the published page does, so the controls that
// are gated on `s.live` can be exercised with a real click here rather than by
// driving the editor and its popup.
const s = sectionVm({
  themeIdx, cat, arch, c, artistName: 'Kai Mercer',
  Z: Z[device], mob: device === 'mobile', live: q.get('live') === '1', navSections,
})

createRoot(document.getElementById('root')).render(
  <div style={{ width: Z[device].canvasW, margin: '0 auto' }}>
    <EncoreSection s={s} />
  </div>,
)
