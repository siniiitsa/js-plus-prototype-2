/* ------------------------------------------------------------------ *
 * §8.6 Image control — device upload and drag-and-drop only.
 * Nothing here may originate a network request. Builder chrome; shared by
 * the panel's upload controls (EncoreBuilder.jsx) and the image editor's
 * "Upload another" (ImageEditor.jsx), which it keeps free of an import cycle.
 * ------------------------------------------------------------------ */

// The upload limit, in decimal megabytes — the unit macOS's Finder prints, so
// a file Finder calls "4.1 MB" is refused by a message that says 4 MB, and one
// it calls "3.9 MB" is not. The message prints the size in the same unit.
export const IMAGE_MAX = 4_000_000

// Why a picked file cannot be a photo here: null, or one sentence. Every
// upload control (ImageField, ImagesField, RowThumb) asks this at pick time
// and prints the answer twice — as a toast, and under the control itself
// until the next pick that refuses nothing, since a toast is far from the
// field, short-lived and replaced by the next one.
export function imageProblem(file) {
  if (file.type !== 'image/png' && file.type !== 'image/jpeg') return 'Please choose a PNG or JPG'
  // Rounded up, so a file a byte over the limit never prints as "4.0 MB".
  if (file.size > IMAGE_MAX) return `That image is ${(Math.ceil(file.size / 1e5) / 10).toFixed(1)} MB — the limit is 4 MB`
  return null
}

// Hands back a file that imageProblem() passed as a data URL — never a
// network request.
export function readImage(file, onOk) {
  const r = new FileReader()
  r.onload = () => onOk(r.result)
  r.readAsDataURL(file)
}

// Vets one pick (a file input's change or a drop): returns the files that
// pass and the line to print, toasting that line too. A pick that carries no
// file at all returns null, and leaves whatever line is up where it is.
export function vetImages(files, onToast) {
  const list = [...(files || [])]
  if (!list.length) return null
  const bad = list.map(imageProblem).filter(Boolean)
  const msg = bad.length > 1
    ? `${bad.length} photos were not added — each must be a PNG or JPG of 4 MB or less`
    : bad[0] || null
  if (msg) onToast(msg)
  return { ok: list.filter((f) => !imageProblem(f)), msg }
}
