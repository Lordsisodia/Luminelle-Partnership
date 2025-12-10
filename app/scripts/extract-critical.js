#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import penthouse from 'penthouse'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const [url, outFile, viewport] = process.argv.slice(2)

if (!url || !outFile) {
  console.error('Usage: node scripts/extract-critical.js <url> <outFile> [viewport WxH]')
  process.exit(1)
}

const [width, height] = (viewport || '412x732').split('x').map(Number)

async function main() {
  console.log(`Extracting critical CSS for ${url} -> ${outFile} (${width}x${height})`)
  const cssString = await penthouse({
    url,
    width,
    height,
    forceInclude: ['#root', 'body', 'html'],
    timeout: 60000,
    pageLoadSkipTimeout: 30000,
    blockJSRequests: false,
  })
  const outPath = path.resolve(__dirname, '..', outFile)
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, cssString, 'utf8')
  console.log('Saved', outPath, 'size', (cssString.length / 1024).toFixed(1), 'KB')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
