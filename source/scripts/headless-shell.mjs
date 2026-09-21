// The chrome-headless-shell binary chrome-devtools-mcp caches, newest version
// first, so the harness scripts need no browser download of their own.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

export function headlessShell() {
  const root = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell')
  const ver = fs.readdirSync(root).filter((d) => !d.startsWith('.')).sort().pop()
  const sub = fs.readdirSync(path.join(root, ver)).find((d) => d.startsWith('chrome-headless-shell'))
  return path.join(root, ver, sub, 'chrome-headless-shell')
}

// The full Chrome for Testing beside it, for the one thing the shell cannot do:
// a real window whose tabs can be resized while hidden (scripts/gutter.mjs).
export function chromeForTesting() {
  const root = path.join(os.homedir(), '.cache/puppeteer/chrome')
  const ver = fs.readdirSync(root).filter((d) => !d.startsWith('.')).sort().pop()
  const sub = fs.readdirSync(path.join(root, ver)).find((d) => d.startsWith('chrome-'))
  return path.join(root, ver, sub, 'Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing')
}
