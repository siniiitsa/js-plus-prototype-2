// Headliner's art (plans/headliner/layout-1.md, *Settled in session 0*): the frames' vector layers,
// transcribed once and read by every section from here, as `paperbackArt.jsx` and `LATTICE_ART` are.
// Art, not photography, so it lives in no `photos/` file: pure SVG functions, no effect, no library.
// The page draws five shapes only (the plan's *Headliner's visual language*): the wavy-line field,
// concentric rings, a ringed numeral, an arrow glyph and an eye. Measured here, from the desktop
// master (1:4478), the ones whose geometry is one frame's own and the same everywhere they stand:
//
//   HeadlinerWaves     the hero's orange panel and the calendar's maroon panel (1:4512): 70 vertical
//                      six-point polylines, one set for the three widths (below)
//   HeadlinerArrow     the 14 x 11 line arrow (stroke 2.4) of every Book now, link, pager and transport
//                      button: nine sections draw it, left and right
//   HeadlinerBlockArrow  the filled block arrow, 150 x 105 (hero 1:4607) and the same shape scaled
//                      (gallery 54 x 37.8, 1:4779; calendar 132 x 92.4, 1:5376, drawn pointing left)
//   HeadlinerEye       the eye (gallery 96 x 51, 1:4802; calendar 120 x 64, 1:5370): the same drawing at
//                      1.2545 x, a lens, a pupil and a highlight arc
//   HeadlinerPlay      the media rows' 10 x 12 triangle
//
//   HeadlinerRings     the map card's concentric rings (section 6, 1:4970 · 1:15741 · 1:16791): four rings and a dot
//                      about the picture box's centre, every size a fraction of the box's *width* (below)
//
// NOT here, because the numbers belong to the section that draws them and are read there: the ringed
// numeral (section 1, the header's `26`, and the calendar's `KM` disc, section 8). Each section's session
// adds its piece to this file.

// The wavy-line field. The frames hold it as 70 lines in 768-wide coordinates (the tablet frame, 1:15285):
// each is six points at y 0, 180, 330, 480, 640 and 820, drawn in #760000 at 32 % opacity. The desktop frame
// is the same set stretched in x to 1440 (x 1.875: 1:4512's lines sit at 0, 21, 41 … 1419 where the tablet's
// sit at 0, 11.2, 21.9 …) and the mobile frame the same set squeezed to 390 (x 0.5078, measured at 0.06 max
// error over the 420 points), so there is one dataset and three scales. Stroke 1 / 0.73 / 0.52 is the frames' own.
const WAVE_Y = [0, 180, 330, 480, 640, 820]
const WAVE_X768 = '0,4.3,0,0,-2.1,3.2;11.2,15.5,10.7,11.2,9.1,14.4;21.9,26.1,21.3,22.4,19.7,25.1;33.1,37.3,32,33.6,30.9,36.3;43.7,48,42.7,45.3,41.6,46.9;54.9,59.2,53.3,56.5,52.8,58.1;65.6,69.9,64,67.7,63.5,68.8;76.8,81.1,74.7,78.9,74.7,80;88,92.3,85.3,90.1,85.9,91.2;98.7,102.9,96,101.3,96.5,101.9;109.9,114.1,106.7,112.5,107.7,113.1;120.5,124.8,117.3,124.3,118.4,123.7;131.7,136,128,135.5,129.6,134.9;142.4,146.7,138.7,146.7,140.3,145.6;153.6,157.9,149.3,157.9,151.5,156.8;164.8,169.1,160,169.1,162.7,168;175.5,179.7,170.7,180.3,173.3,178.7;186.7,190.9,181.3,191.5,184.5,189.9;197.3,201.6,192,203.2,195.2,200.5;208.5,212.8,202.7,214.4,206.4,211.7;219.2,223.5,213.3,225.6,217.1,222.4;230.4,234.7,224,236.8,228.3,233.6;241.6,245.9,234.7,248,239.5,244.8;252.3,256.5,245.3,259.2,250.1,255.5;263.5,267.7,256,270.4,261.3,266.7;274.1,278.4,266.7,282.1,272,277.3;285.3,289.6,277.3,293.3,283.2,288.5;296,300.3,288,304.5,293.9,299.2;307.2,311.5,298.7,315.7,305.1,310.4;318.4,322.7,309.3,326.9,316.3,321.6;329.1,333.3,320,338.1,326.9,332.3;340.3,344.5,330.7,349.3,338.1,343.5;350.9,355.2,341.3,361.1,348.8,354.1;362.1,366.4,352,372.3,360,365.3;372.8,377.1,362.7,383.5,370.7,376;384,388.3,373.3,394.7,381.9,387.2;395.2,399.5,384,405.9,393.1,398.4;405.9,410.1,394.7,417.1,403.7,409.1;417.1,421.3,405.3,428.3,414.9,420.3;427.7,432,416.5,439.5,425.6,430.9;438.9,443.2,427.7,450.1,436.8,442.1;449.6,453.9,438.9,460.8,447.5,452.8;460.8,465.1,450.1,471.5,458.7,464;472,476.3,461.3,482.1,469.9,475.2;482.7,486.9,472.5,492.8,480.5,485.9;493.9,498.1,483.7,503.5,491.7,497.1;504.5,508.8,495.5,514.1,502.4,507.7;515.7,520,506.7,524.8,513.6,518.9;526.4,530.7,517.9,535.5,524.3,529.6;537.6,541.9,529.1,546.1,535.5,540.8;548.8,553.1,540.3,556.8,546.7,552;559.5,563.7,551.5,567.5,557.3,562.7;570.7,574.9,562.7,578.1,568.5,573.9;581.3,585.6,574.4,588.8,579.2,584.5;592.5,596.8,585.6,599.5,590.4,595.7;603.2,607.5,596.8,610.1,601.1,606.4;614.4,618.7,608,620.8,612.3,617.6;625.6,629.9,619.2,631.5,623.5,628.8;636.3,640.5,630.4,642.1,634.1,639.5;647.5,651.7,641.6,652.8,645.3,650.7;658.1,662.4,653.3,663.5,656,661.3;669.3,673.6,664.5,674.1,667.2,672.5;680,684.3,675.7,684.8,677.9,683.2;691.2,695.5,686.9,695.5,689.1,694.4;702.4,706.7,698.1,706.1,700.3,705.6;713.1,717.3,709.3,716.8,710.9,716.3;724.3,728.5,720.5,727.5,722.1,727.5;734.9,739.2,732.3,738.1,732.8,738.1;746.1,750.4,743.5,748.8,744,749.3;756.8,761.1,754.7,759.5,754.7,760'
const WAVE_SET = { desktop: { w: 1440, k: 1440 / 768, sw: 1 }, tablet: { w: 768, k: 1, sw: 0.73 }, mobile: { w: 390, k: 390 / 768, sw: 0.52 } }
const WAVE_PATHS = Object.fromEntries(Object.entries(WAVE_SET).map(([dev, { k }]) => [dev,
  WAVE_X768.split(';').map((row) => 'M' + row.split(',').map((x, i) => `${+(x * k).toFixed(1)} ${WAVE_Y[i]}`).join('L')).join('')]))

/** The field at `dev` ('desktop' | 'tablet' | 'mobile'), in the hero's 820-tall stage: x is the frame's own at
 *  every width (the panel's wedge clips it), `ink` the line colour (the frames' #760000), `opacity` .32. */
export function HeadlinerWaves({ dev = 'desktop', ink = '#760000', opacity = 0.32, style, ...rest }) {
  const { w, sw } = WAVE_SET[dev]
  return (
    <svg viewBox={`0 0 ${w} 820`} width="100%" height="100%" preserveAspectRatio="none" fill="none" aria-hidden="true"
      style={{ display: 'block', ...style }} {...rest}>
      <path d={WAVE_PATHS[dev]} stroke={ink} strokeWidth={sw} opacity={opacity} />
    </svg>
  )
}

/** The line arrow, 14 x 11 in the frames (stroke 2.4). `dir` 'right' (default) or 'left'. */
export function HeadlinerArrow({ dir = 'right', size = 14, stroke = 'currentColor', sw = 2.4, style, ...rest }) {
  return (
    <svg viewBox="0 0 14 11" width={size} height={size * 11 / 14} fill="none" aria-hidden="true"
      style={{ display: 'block', overflow: 'visible', ...style }} {...rest}>
      <path d={dir === 'left' ? 'M14 5.5H1M6 0L0 5.5L6 11' : 'M0 5.5H13M8 0L14 5.5L8 11'}
        stroke={stroke} strokeWidth={sw} />
    </svg>
  )
}

/** The block arrow, 150 x 105 at 1 (the hero's), filled; `dir` 'right' or 'left' (the calendar's). */
export function HeadlinerBlockArrow({ dir = 'right', width = 150, fill = '#020202', style, ...rest }) {
  return (
    <svg viewBox="0 0 150 105" width={width} height={width * 105 / 150} fill="none" aria-hidden="true"
      style={{ display: 'block', overflow: 'visible', transform: dir === 'left' ? 'scaleX(-1)' : undefined, ...style }} {...rest}>
      <path d="M0 37.5H87.5V0L150 52.5L87.5 105V67.5H0V37.5Z" fill={fill} />
    </svg>
  )
}

/** The eye: a lens (stroke 4.4625), a pupil and a highlight arc (stroke 2.55), drawn in an 88 x 28.7 box
 *  at 1 (gallery 96 x 51 frame: the glyph at x 4, y 11.2). `ink` the lens and pupil, `glint` the arc. */
export function HeadlinerEye({ width = 88, ink = '#3B758B', glint = '#F8F2E7', style, ...rest }) {
  return (
    <svg viewBox="-2.23 -2.23 92.46 33.16" width={width * 92.46 / 88} height={width * 33.16 / 88} fill="none" aria-hidden="true"
      style={{ display: 'block', overflow: 'visible', ...style }} {...rest}>
      <path d="M0 14.34C15.3 -4.78 72.67 -4.78 87.97 14.34C72.67 33.47 15.3 33.47 0 14.34Z" stroke={ink} strokeWidth="4.4625" />
      <circle cx="44.04" cy="14.34" r="10.84" fill={ink} />
      <path d="M44.05 7.9C40.65 12.15 40.65 16.4 44.05 20.65" stroke={glint} strokeWidth="2.55" />
    </svg>
  )
}

/** The media rows' play triangle, 10 x 12 in a 12 x 14 button seat. */
export function HeadlinerPlay({ size = 10, fill = '#020202', style, ...rest }) {
  return (
    <svg viewBox="0 0 10 12" width={size} height={size * 1.2} fill="none" aria-hidden="true"
      style={{ display: 'block', ...style }} {...rest}>
      <path d="M0 0L10 6L0 12V0Z" fill={fill} />
    </svg>
  )
}

/** The map card's rings, read off the three frames' vector exports (607.047 x 505.844 at 1440, 667.766 x 556.469 at 768,
 *  294 x 360 at 390). Every size is a fraction of the box's *width* `w` at all three: four rings of diameter .2, .4, .6 and
 *  .8 w about the centre, the .2 and .6 rings solid (stroke .005 w and .0025 w), the .4 and .8 rings dashed (52 and 108
 *  dashes, each .43 of its pitch, one centred on three o'clock, stroke .0025 w), and an orange dot of radius .02667 w. The
 *  box is `w` x `h` as the frame draws it; the svg fits it into whatever box it is given (a shorter one scales the rings
 *  down, a taller one leaves them centred), so a card the list stretches never crops them. */
export function HeadlinerRings({ w = 607.047, h = 505.844, ink = '#EEE3D1', dot = '#F85E34', style, ...rest }) {
  const cx = w / 2
  const cy = h / 2
  const dashed = (k, n) => {
    const r = (k * w) / 2
    const pitch = (2 * Math.PI * r) / n
    const dash = pitch * 0.43
    return { r, strokeDasharray: `${dash.toFixed(3)} ${(pitch - dash).toFixed(3)}`, strokeDashoffset: +(dash / 2).toFixed(3) }
  }
  const a = dashed(0.4, 52)
  const b = dashed(0.8, 108)
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" fill="none" aria-hidden="true"
      style={{ display: 'block', ...style }} {...rest}>
      <circle cx={cx} cy={cy} r={0.1 * w} stroke={ink} strokeWidth={0.005 * w} />
      <circle cx={cx} cy={cy} r={a.r} stroke={ink} strokeWidth={0.0025 * w} strokeDasharray={a.strokeDasharray} strokeDashoffset={a.strokeDashoffset} />
      <circle cx={cx} cy={cy} r={0.3 * w} stroke={ink} strokeWidth={0.0025 * w} />
      <circle cx={cx} cy={cy} r={b.r} stroke={ink} strokeWidth={0.0025 * w} strokeDasharray={b.strokeDasharray} strokeDashoffset={b.strokeDashoffset} />
      <circle cx={cx} cy={cy} r={0.02667 * w} fill={dot} />
    </svg>
  )
}
