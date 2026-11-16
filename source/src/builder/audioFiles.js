/* ------------------------------------------------------------------ *
 * A track's uploaded recording — the sound-file sibling of imageFiles.js.
 * Device upload and drag-and-drop only: nothing here may originate a network
 * request. Builder chrome; used by TracksField's RowAudio (EncoreBuilder.jsx).
 *
 * A recording is inlined as a data: URI on the track row (`file`), the way an
 * image is, so it travels with the section through Undo, layout changes,
 * Preview and Publish with no lifecycle to manage. There is no persistence
 * beyond the session (CLAUDE.md, Intentional limits).
 * ------------------------------------------------------------------ */

// Decimal megabytes, the unit macOS's Finder prints (imageFiles.js's rule).
export const AUDIO_MAX = 10_000_000

// The one line the panel prints before a pick, and the picker's `accept`.
export const AUDIO_FORMATS_TEXT = 'MP3, M4A or WAV · up to 10 MB'
export const AUDIO_ACCEPT = 'audio/mpeg,audio/mp4,audio/x-m4a,audio/wav,audio/x-wav,.mp3,.m4a,.wav'

// The canonical MIME per extension. Some systems hand a file over with an empty
// `type` (or `application/octet-stream`), so the extension is the fallback, and
// the data URI is always rewritten to the canonical one so the <audio> element
// is never given a source the browser has to sniff.
const BY_EXT = { mp3: 'audio/mpeg', m4a: 'audio/mp4', wav: 'audio/wav' }
const BY_MIME = {
  'audio/mpeg': 'audio/mpeg', 'audio/mp3': 'audio/mpeg',
  'audio/mp4': 'audio/mp4', 'audio/x-m4a': 'audio/mp4', 'audio/m4a': 'audio/mp4', 'audio/aac': 'audio/mp4',
  'audio/wav': 'audio/wav', 'audio/x-wav': 'audio/wav', 'audio/wave': 'audio/wav', 'audio/vnd.wave': 'audio/wav',
}
const mimeOf = (file) => {
  const ext = /\.([a-z0-9]+)$/i.exec(file.name || '')?.[1].toLowerCase()
  return BY_MIME[(file.type || '').toLowerCase()] || BY_EXT[ext] || null
}

const mb = (bytes) => (Math.ceil(bytes / 1e5) / 10).toFixed(1)

// A size for the panel: "3.2 MB", "840 KB".
export const audioSizeText = (bytes) => (bytes >= 1e6 ? `${mb(bytes)} MB` : `${Math.max(1, Math.round(bytes / 1e3))} KB`)

// Why a picked file cannot be a recording here: null, or one sentence.
export function audioProblem(file) {
  if (!mimeOf(file)) return 'Please choose an MP3, M4A or WAV file'
  if (file.size > AUDIO_MAX) return `That recording is ${mb(file.size)} MB — the limit is 10 MB`
  if (!file.size) return 'That file is empty'
  return null
}

export const AUDIO_READ_FAIL = 'That file couldn’t be read — please try again'
export const AUDIO_DECODE_FAIL = 'That file couldn’t be played as audio — try exporting it again as an MP3'

// Hands back a file that audioProblem() passed as a data URL with its
// canonical MIME — never a network request. `onFail` takes a read error.
export function readAudio(file, onOk, onFail) {
  const mime = mimeOf(file)
  const r = new FileReader()
  r.onload = () => {
    const out = String(r.result || '')
    const comma = out.indexOf(',')
    if (comma < 0) return onFail()
    onOk(`data:${mime};base64,${out.slice(comma + 1)}`)
  }
  r.onerror = () => onFail()
  r.onabort = () => onFail()
  r.readAsDataURL(file)
}

// Resolves true when a detached <audio> can read the recording's metadata, false
// when it errors or never does. It catches a renamed or corrupt file before it
// becomes a track that looks fine and plays nothing. Panel code: EncoreSection
// has no effect and none is wanted here.
export function verifyAudio(src, ms = 8000) {
  return new Promise((resolve) => {
    const a = new Audio()
    let done = false
    const end = (ok) => {
      if (done) return
      done = true
      clearTimeout(t)
      a.removeAttribute('src')
      a.load()
      resolve(ok)
    }
    const t = setTimeout(() => end(false), ms)
    a.preload = 'metadata'
    a.onloadedmetadata = () => end(true)
    a.onerror = () => end(false)
    a.src = src
  })
}
