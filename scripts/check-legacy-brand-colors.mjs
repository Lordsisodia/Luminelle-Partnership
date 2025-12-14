import fs from 'node:fs/promises'
import path from 'node:path'

const PROJECT_ROOT = process.cwd()
const SRC_ROOT = path.join(PROJECT_ROOT, 'src')

const IGNORE_DIRS = new Set([
  'archive',
  'node_modules',
  'dist',
  '.git',
])

const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css'])

const LEGACY_BRAND_COLOR_RE =
  /\b(text|bg|border|ring|decoration|divide|from|to|via|accent|fill|stroke)-brand-(cocoa|peach|blush)\b/g

const isSourceFile = (filePath) => SOURCE_EXTENSIONS.has(path.extname(filePath))

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

const findMatchesInFile = async (filePath) => {
  const relPath = path.relative(PROJECT_ROOT, filePath)
  const content = await fs.readFile(filePath, 'utf8')
  const lines = content.split('\n')

  const matches = []
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    LEGACY_BRAND_COLOR_RE.lastIndex = 0
    const found = [...line.matchAll(LEGACY_BRAND_COLOR_RE)]
    if (!found.length) continue

    matches.push({
      file: relPath,
      line: index + 1,
      snippet: line.trim(),
      tokens: found.map((m) => m[0]),
    })
  }

  return matches
}

const main = async () => {
  const files = []
  await walk(SRC_ROOT, files)

  const allMatches = []
  for (const filePath of files) {
    const matches = await findMatchesInFile(filePath)
    allMatches.push(...matches)
  }

  if (!allMatches.length) {
    console.log('✓ No legacy `brand-{cocoa,peach,blush}` Tailwind utilities found in `src/` (excluding `src/archive/`).')
    return
  }

  console.error('✗ Legacy brand color utilities still present (expected to be migrated to semantic tokens):')
  for (const match of allMatches) {
    console.error(`- ${match.file}:${match.line}  ${match.tokens.join(', ')}`)
    console.error(`  ${match.snippet}`)
  }

  console.error('\nSuggested exact-match replacements:')
  console.error('- `text-brand-cocoa(/NN)` → `text-semantic-text-primary(/NN)`')
  console.error('- `bg|border|ring-brand-peach(/NN)` → `*-semantic-accent-cta(/NN)`')
  console.error('- `bg|border|divide|ring-brand-blush(/NN)` → `*-semantic-legacy-brand-blush(/NN)`')
  console.error('- `bg|border|ring-brand-cocoa(/NN)` → `*-semantic-legacy-brand-cocoa(/NN)`')

  process.exitCode = 1
}

main().catch((err) => {
  console.error('Token lint failed:', err)
  process.exitCode = 1
})

