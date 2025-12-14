import fs from 'node:fs/promises'
import path from 'node:path'

const PROJECT_ROOT = process.cwd()
const TOKENS_PATH = process.env.TOKENS_PATH || 'src/theme/tokens.json'

const isHexColor = (value) =>
  typeof value === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)

const get = (obj, dotted) =>
  dotted.split('.').reduce((acc, key) => (acc && typeof acc === 'object' ? acc[key] : undefined), obj)

// Supports both nested token objects (e.g. `base.neutral.0`) and dotted semantic keys stored as literal strings
// (e.g. `semantic: { "text.primary": "..." }` referenced via `{semantic.text.primary}`).
const getToken = (root, dotted) => {
  const nested = get(root, dotted)
  if (nested !== undefined) return nested

  const [topKey, ...rest] = dotted.split('.')
  if (!topKey || rest.length < 2) return undefined

  const parent = root?.[topKey]
  if (!parent || typeof parent !== 'object') return undefined

  const dottedKey = rest.join('.')
  return Object.prototype.hasOwnProperty.call(parent, dottedKey) ? parent[dottedKey] : undefined
}

const resolveValue = (val, root) => {
  if (typeof val !== 'string') return val
  return val.replace(/\{([^}]+)\}/g, (_, ref) => {
    const found = getToken(root, ref.trim())
    if (found === undefined) throw new Error(`Unresolved token reference: {${ref}}`)
    return found
  })
}

const deepResolve = (obj, root) => {
  if (Array.isArray(obj)) return obj.map((v) => deepResolve(v, root))
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, deepResolve(v, root)]))
  }
  return resolveValue(obj, root)
}

const collectNonStringLeaves = (obj, prefix = '') => {
  if (Array.isArray(obj)) return [{ path: prefix, value: obj }]
  if (!obj || typeof obj !== 'object') return []

  const results = []
  for (const [key, value] of Object.entries(obj)) {
    const nextPrefix = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      results.push(...collectNonStringLeaves(value, nextPrefix))
      continue
    }
    if (typeof value !== 'string') results.push({ path: nextPrefix, value })
  }
  return results
}

const main = async () => {
  const tokensAbsolutePath = path.join(PROJECT_ROOT, TOKENS_PATH)

  let rawText
  try {
    rawText = await fs.readFile(tokensAbsolutePath, 'utf8')
  } catch (err) {
    console.error(`✗ Missing tokens file: ${TOKENS_PATH}`)
    console.error(String(err))
    process.exitCode = 1
    return
  }

  let raw
  try {
    raw = JSON.parse(rawText)
  } catch (err) {
    console.error(`✗ Invalid JSON in ${TOKENS_PATH}`)
    console.error(String(err))
    process.exitCode = 1
    return
  }

  const errors = []

  if (!raw || typeof raw !== 'object') {
    errors.push('Top-level tokens must be a JSON object.')
  }

  if (!raw?.base || typeof raw.base !== 'object') errors.push('Missing required object: `base`.')
  if (!raw?.semantic || typeof raw.semantic !== 'object') errors.push('Missing required object: `semantic`.')

  const requiredPaths = [
    'base.brandPrimary',
    'base.brandSecondary',
    'base.brandTertiary',
    'base.neutral.0',
    'semantic.text.primary',
  ]
  for (const required of requiredPaths) {
    if (getToken(raw, required) === undefined) errors.push(`Missing required token: \`${required}\`.`)
  }

  const baseHexPaths = ['base.brandPrimary', 'base.brandSecondary', 'base.brandTertiary', 'base.neutral.0']
  for (const p of baseHexPaths) {
    const value = getToken(raw, p)
    if (value !== undefined && !isHexColor(value)) {
      errors.push(`Token \`${p}\` must be a hex color (e.g. "#FBC7B2"). Got: ${JSON.stringify(value)}`)
    }
  }

  const baseLeafIssues = collectNonStringLeaves(raw.base).filter((x) => x.path !== 'radius')
  if (baseLeafIssues.length) {
    // allow meta.version or other future numbers, but base should be CSS-ready strings
    const examples = baseLeafIssues
      .slice(0, 5)
      .map((i) => `- base.${i.path}: ${JSON.stringify(i.value)}`)
      .join('\n')
    errors.push(`All \`base\` leaf values should be strings.\n${examples}${baseLeafIssues.length > 5 ? '\n- …' : ''}`)
  }

  const semanticLeafIssues = collectNonStringLeaves(raw.semantic)
  if (semanticLeafIssues.length) {
    const examples = semanticLeafIssues
      .slice(0, 5)
      .map((i) => `- semantic.${i.path}: ${JSON.stringify(i.value)}`)
      .join('\n')
    errors.push(
      `All \`semantic\` leaf values should be strings.\n${examples}${semanticLeafIssues.length > 5 ? '\n- …' : ''}`
    )
  }

  try {
    const resolvedBase = deepResolve(raw.base || {}, raw)
    void deepResolve(raw.semantic || {}, { ...raw, base: resolvedBase })
  } catch (err) {
    errors.push(String(err?.message || err))
  }

  if (errors.length) {
    console.error(`✗ Token validation failed for ${TOKENS_PATH}`)
    for (const e of errors) console.error(`- ${e}`)
    process.exitCode = 1
    return
  }

  console.log(`✓ Tokens valid: ${TOKENS_PATH} (JSON ok, required keys present, refs resolved)`)
}

main().catch((err) => {
  console.error('Token validation script failed:', err)
  process.exitCode = 1
})
