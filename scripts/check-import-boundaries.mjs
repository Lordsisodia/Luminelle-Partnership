import fs from 'node:fs/promises'
import fg from 'fast-glob'

const PROJECT_ROOT = process.cwd()

const SCAN_GLOBS = [
  'src/App.tsx',
  'src/main.tsx',
  'src/ui/**/*.{ts,tsx,js,jsx,mjs,cjs}',
  'src/lib/**/*.{ts,tsx,js,jsx,mjs,cjs}',
  'src/layouts/**/*.{ts,tsx,js,jsx,mjs,cjs}',
  'src/domains/**/ui/**/*.{ts,tsx,js,jsx,mjs,cjs}',
  'src/domains/client/**/*.{ts,tsx,js,jsx,mjs,cjs}',
  'src/domains/admin/**/*.{ts,tsx,js,jsx,mjs,cjs}',
]

const IGNORE_GLOBS = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.git/**',
  'src/domains/platform/**',
  'src/content/**',
  'functions/**',
]

const FORBIDDEN = [
  {
    id: 'ui_imports_platform_adapter',
    reason: 'UI/domain code must not import platform adapters directly (ports only).',
    test: (spec) => spec.startsWith('@platform/') && spec.includes('/adapters/'),
  },
  {
    id: 'ui_imports_internal_api_client',
    reason: 'UI/domain code must not call internal API client directly (adapters only).',
    test: (spec) => spec.startsWith('@platform/http/internal-api'),
  },
  {
    id: 'ui_relative_imports_platform_adapter',
    reason: 'UI/domain code must not reach into src/domains/platform adapters via relative paths.',
    test: (spec) => spec.includes('/domains/platform/') && spec.includes('/adapters/'),
  },
  {
    id: 'ui_imports_supabase_sdk',
    reason: 'Infrastructure SDKs (Supabase) must only be imported in the platform layer.',
    test: (spec) => spec === '@supabase/supabase-js',
  },
]

const IMPORT_FROM_RE = /\b(?:import|export)\s+(?:type\s+)?[^;]*?\sfrom\s*['"]([^'"]+)['"]/g
const DYNAMIC_IMPORT_RE = /\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g
const REQUIRE_RE = /\brequire\s*\(\s*['"]([^'"]+)['"]\s*\)/g

const FORBIDDEN_TEXT_PATTERNS = [
  {
    id: 'ui_calls_internal_api_storefront',
    reason: 'UI/domain code must not call internal storefront API routes directly; use ports (adapters handle /api/storefront/*).',
    pattern: /\/api\/storefront\//g,
  },
]

function indexToLineCol(text, idx) {
  const before = text.slice(0, idx)
  const lines = before.split('\n')
  const line = lines.length
  const col = lines[lines.length - 1].length + 1
  return { line, col }
}

function* findModuleSpecifiers(text) {
  for (const re of [IMPORT_FROM_RE, DYNAMIC_IMPORT_RE, REQUIRE_RE]) {
    re.lastIndex = 0
    let match
    while ((match = re.exec(text))) {
      const spec = match[1]
      const specIdx = match.index + match[0].lastIndexOf(spec)
      yield { spec, index: specIdx }
    }
  }
}

const files = await fg(SCAN_GLOBS, {
  cwd: PROJECT_ROOT,
  ignore: IGNORE_GLOBS,
  onlyFiles: true,
  unique: true,
})

const violations = []

for (const file of files) {
  const text = await fs.readFile(file, 'utf8')

  for (const rule of FORBIDDEN_TEXT_PATTERNS) {
    rule.pattern.lastIndex = 0
    let match
    while ((match = rule.pattern.exec(text))) {
      const { line, col } = indexToLineCol(text, match.index)
      violations.push({
        file,
        line,
        col,
        spec: match[0],
        rule: rule.id,
        reason: rule.reason,
      })
    }
  }

  for (const { spec, index } of findModuleSpecifiers(text)) {
    for (const rule of FORBIDDEN) {
      if (!rule.test(spec)) continue
      const { line, col } = indexToLineCol(text, index)
      violations.push({
        file,
        line,
        col,
        spec,
        rule: rule.id,
        reason: rule.reason,
      })
    }
  }
}

if (violations.length) {
  console.error(`Import boundary violations (${violations.length}):`)
  for (const v of violations) {
    console.error(`- ${v.file}:${v.line}:${v.col} ${v.rule}: ${v.spec}`)
  }
  console.error('\nRules:')
  for (const r of FORBIDDEN) {
    console.error(`- ${r.id}: ${r.reason}`)
  }
  process.exit(1)
}

console.log(`OK: import boundaries (${files.length} files scanned)`)
