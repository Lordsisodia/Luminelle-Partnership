// Ready-to-integrate build script (place in repo root scripts/). Generates CSS vars and Tailwind color map from tokens JSON.

import fs from 'fs'
import path from 'path'

type Dict = Record<string, any>

const TOKENS_PATH = process.env.TOKENS_PATH || 'src/theme/tokens.json'
const OUT_CSS = process.env.TOKENS_OUT_CSS || 'src/theme/generated.css'
const OUT_TW = process.env.TOKENS_OUT_TW || 'src/theme/tailwind-colors.js'
const OUT_RESOLVED = process.env.TOKENS_OUT_JSON || 'src/theme/tokens.resolved.json'

function get(obj: Dict, dotted: string): any {
  return dotted.split('.').reduce((o, k) => (o ? o[k] : undefined), obj)
}

function resolveValue(val: any, root: Dict): any {
  if (typeof val !== 'string') return val
  return val.replace(/\{([^}]+)\}/g, (_, ref) => {
    const found = get(root, ref.trim())
    if (found === undefined) throw new Error(`Unresolved token reference: {${ref}}`)
    return found
  })
}

function deepResolve(obj: Dict, root: Dict): Dict {
  if (Array.isArray(obj)) return obj.map((v) => deepResolve(v, root))
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, deepResolve(v, root)]))
  }
  return resolveValue(obj, root)
}

function flatten(obj: Dict, prefix = ''): Record<string, string> {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) Object.assign(acc, flatten(v, key))
    else acc[key] = v as string
    return acc
  }, {} as Record<string, string>)
}

function dottedToNested(map: Record<string, string>): Dict {
  const root: Dict = {}
  for (const [key, value] of Object.entries(map)) {
    const parts = key.split('.')
    let node = root
    parts.forEach((p, i) => {
      if (i === parts.length - 1) node[p] = value
      else node = node[p] || (node[p] = {})
    })
  }
  return root
}

function toCssVars(flat: Record<string, string>): string {
  const lines = Object.entries(flat).map(([k, v]) => `  --${k.replace(/\./g, '-')}: ${v};`)
  return `@layer base {\n:root {\n${lines.join('\n')}\n}\n}`
}

function writeFileSafe(outPath: string, contents: string) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, contents)
  console.log(`wrote ${outPath}`)
}

function main() {
  const raw = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf8'))
  const resolved = { ...raw, base: deepResolve(raw.base, raw), semantic: deepResolve(raw.semantic, raw) }

  const flatSemantic = flatten(resolved.semantic)
  const css = toCssVars(flatSemantic)
  const nestedForTw = dottedToNested(
    Object.fromEntries(
      Object.entries(flatSemantic).map(([k]) => [k, `var(--${k.replace(/\./g, '-')})`])
    )
  )

  const twExport = `// generated from ${TOKENS_PATH}\nmodule.exports = { semanticColors: ${JSON.stringify(
    nestedForTw,
    null,
    2
  )} }\n`

  writeFileSafe(OUT_CSS, css + '\n')
  writeFileSafe(OUT_TW, twExport)
  writeFileSafe(OUT_RESOLVED, JSON.stringify(resolved, null, 2))
}

if (require.main === module) {
  main()
}

export {}
