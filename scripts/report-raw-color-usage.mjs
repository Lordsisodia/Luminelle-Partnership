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

const IGNORE_FILES = new Set([
  'src/theme/tokens.json',
])

const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css'])

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

    const rel = path.relative(PROJECT_ROOT, fullPath).replaceAll(path.sep, '/')
    if (IGNORE_FILES.has(rel)) continue

    results.push(fullPath)
  }
}

const findHexesInFile = async (filePath) => {
  const relPath = path.relative(PROJECT_ROOT, filePath).replaceAll(path.sep, '/')
  const content = await fs.readFile(filePath, 'utf8')
  const lines = content.split('\n')

  const matches = []
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    HEX_RE.lastIndex = 0
    const found = [...line.matchAll(HEX_RE)]
    if (!found.length) continue

    for (const m of found) {
      const hex = `#${m[1]}`
      matches.push({
        file: relPath,
        line: index + 1,
        hex,
        normalized: normalizeHex(hex),
        snippet: line.trim(),
      })
    }
  }

  return matches
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

const main = async () => {
  const { json, limit } = parseArgs()

  const files = []
  await walk(SRC_ROOT, files)

  const all = []
  for (const filePath of files) {
    const matches = await findHexesInFile(filePath)
    all.push(...matches)
  }

  const byColor = new Map()
  for (const m of all) {
    const key = m.normalized
    const existing = byColor.get(key)
    if (existing) {
      existing.count += 1
      continue
    }
    byColor.set(key, { count: 1 })
  }

  const summary = {
    scannedFiles: files.length,
    totalOccurrences: all.length,
    uniqueColors: byColor.size,
    topColors: [...byColor.entries()]
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, Math.max(0, limit))
      .map(([hex, meta]) => ({ hex, count: meta.count })),
  }

  if (json) {
    console.log(JSON.stringify({ summary, matches: all }, null, 2))
    return
  }

  console.log('Raw color usage report (hex literals)')
  console.log(`- Scanned files: ${summary.scannedFiles}`)
  console.log(`- Total occurrences: ${summary.totalOccurrences}`)
  console.log(`- Unique colors: ${summary.uniqueColors}`)
  console.log('')

  console.log(`Top colors (by occurrences, up to ${limit}):`)
  for (const item of summary.topColors) {
    console.log(`- ${item.hex}: ${item.count}`)
  }

  if (!all.length) return

  console.log('')
  console.log('First occurrences (for triage):')
  for (const m of all.slice(0, 40)) {
    console.log(`- ${m.file}:${m.line}  ${m.hex}`)
    console.log(`  ${m.snippet}`)
  }

  console.log('')
  console.log('Tip: run with `--json` to get machine-readable output, or `--limit=200` for a longer top list.')
}

main().catch((err) => {
  console.error('Raw color report failed:', err)
  process.exitCode = 1
})

