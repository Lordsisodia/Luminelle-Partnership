import fs from 'node:fs/promises'
import path from 'node:path'

const PROJECT_ROOT = process.cwd()
const SRC_ROOT = path.join(PROJECT_ROOT, 'src')

const IGNORE_DIRS = new Set([
  'archive',
  'node_modules',
  'dist',
  '.git',
  'theme', // token source-of-truth lives here; exclude from raw-usage audit
])

const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css'])

const TW_BG_ARBITRARY_RE = /\bbg-\[([^\]]+)\]/g
const SVG_HEX_RE = /\b(fill|stroke)\s*=\s*["'](#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}))["']/g
const HEX_RE = /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g

const isSourceFile = (filePath) => SOURCE_EXTENSIONS.has(path.extname(filePath))

const normalizeHex = (hex) => {
  const raw = hex.toUpperCase()
  if (raw.length === 4) {
    const r = raw[1]
    const g = raw[2]
    const b = raw[3]
    return `#${r}${r}${g}${g}${b}${b}`
  }
  return raw
}

const extractHexes = (text) => {
  HEX_RE.lastIndex = 0
  return [...text.matchAll(HEX_RE)].map((m) => normalizeHex(`#${m[1]}`))
}

const walk = async (dirPath, results) => {
  const entries = await fs.readdir(dirPath, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)

    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue
      await walk(fullPath, results)
      continue
    }

    if (!entry.isFile()) continue
    if (!isSourceFile(fullPath)) continue

    results.push(fullPath)
  }
}

const parseArgs = () => {
  const args = new Set(process.argv.slice(2))
  return {
    json: args.has('--json'),
    limit: (() => {
      const limitArg = process.argv.find((a) => a.startsWith('--limit='))
      if (!limitArg) return 50
      const raw = Number.parseInt(limitArg.split('=')[1] || '', 10)
      return Number.isFinite(raw) && raw > 0 ? raw : 50
    })(),
  }
}

const findContextsInFile = async (filePath) => {
  const relPath = path.relative(PROJECT_ROOT, filePath).replaceAll(path.sep, '/')
  const content = await fs.readFile(filePath, 'utf8')
  const lines = content.split('\n')

  const matches = []

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]

    // Tailwind arbitrary bg gradients: bg-[...gradient...]
    TW_BG_ARBITRARY_RE.lastIndex = 0
    for (const m of line.matchAll(TW_BG_ARBITRARY_RE)) {
      const inner = m[1] || ''
      if (!inner.toLowerCase().includes('gradient')) continue

      matches.push({
        kind: 'tailwind:bg-arbitrary-gradient',
        file: relPath,
        line: index + 1,
        value: `bg-[${inner}]`,
        hexes: extractHexes(inner),
        snippet: line.trim(),
      })
    }

    // SVG fill/stroke hex literals: fill="#..." stroke="#..."
    SVG_HEX_RE.lastIndex = 0
    for (const m of line.matchAll(SVG_HEX_RE)) {
      const attr = m[1]
      const hex = normalizeHex(m[2])

      matches.push({
        kind: `svg:${attr}-hex`,
        file: relPath,
        line: index + 1,
        value: `${attr}="${m[2]}"`,
        hexes: [hex],
        snippet: line.trim(),
      })
    }
  }

  return matches
}

const main = async () => {
  const { json, limit } = parseArgs()

  const files = []
  await walk(SRC_ROOT, files)

  const all = []
  for (const filePath of files) {
    const matches = await findContextsInFile(filePath)
    all.push(...matches)
  }

  const byFile = new Map()
  const byHex = new Map()
  const byKind = new Map()

  for (const m of all) {
    byFile.set(m.file, (byFile.get(m.file) || 0) + 1)
    byKind.set(m.kind, (byKind.get(m.kind) || 0) + 1)
    for (const hex of m.hexes) {
      byHex.set(hex, (byHex.get(hex) || 0) + 1)
    }
  }

  const summary = {
    scannedFiles: files.length,
    totalMatches: all.length,
    filesWithMatches: byFile.size,
    byKind: Object.fromEntries([...byKind.entries()].sort((a, b) => b[1] - a[1])),
    topFiles: [...byFile.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, Math.max(0, limit))
      .map(([file, count]) => ({ file, count })),
    topHexes: [...byHex.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, Math.max(0, limit))
      .map(([hex, count]) => ({ hex, count })),
  }

  if (json) {
    console.log(JSON.stringify({ summary, matches: all }, null, 2))
    return
  }

  console.log('Raw color contexts report')
  console.log('- Focus: Tailwind `bg-[...gradient...]` + SVG `fill/stroke=\"#...\"`')
  console.log(`- Scanned files: ${summary.scannedFiles}`)
  console.log(`- Matches: ${summary.totalMatches}`)
  console.log(`- Files with matches: ${summary.filesWithMatches}`)
  console.log('')

  console.log('Kinds:')
  for (const [kind, count] of Object.entries(summary.byKind)) {
    console.log(`- ${kind}: ${count}`)
  }

  console.log('')
  console.log(`Top files (up to ${limit}):`)
  for (const item of summary.topFiles) console.log(`- ${item.file}: ${item.count}`)

  console.log('')
  console.log(`Top hex colors (up to ${limit}):`)
  for (const item of summary.topHexes) console.log(`- ${item.hex}: ${item.count}`)

  if (!all.length) return

  console.log('')
  console.log('First matches (for triage):')
  for (const m of all.slice(0, 40)) {
    console.log(`- ${m.file}:${m.line}  ${m.kind}`)
    console.log(`  ${m.value}`)
    if (m.hexes.length) console.log(`  hex: ${m.hexes.join(', ')}`)
    console.log(`  ${m.snippet}`)
  }

  console.log('')
  console.log('Tip: run with `--json` for machine-readable output.')
}

main().catch((err) => {
  console.error('Color contexts report failed:', err)
  process.exitCode = 1
})

