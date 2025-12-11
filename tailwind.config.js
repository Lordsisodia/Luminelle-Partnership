import fs from 'fs'
import path from 'path'
import plugin from 'tailwindcss/plugin'

const tokensPath = path.resolve('./src/theme/tokens.json')

const loadTokens = () => {
  try {
    return JSON.parse(fs.readFileSync(tokensPath, 'utf8'))
  } catch (err) {
    console.warn('[tailwind] design tokens missing; using defaults', err?.message)
    return null
  }
}

const resolveRef = (val, root) =>
  typeof val === 'string'
    ? val.replace(/\{([^}]+)\}/g, (_, ref) => {
        const value = ref.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), root)
        if (value === undefined) throw new Error(`Unresolved token: {${ref}}`)
        return value
      })
    : val

const deepResolve = (obj, root) => {
  if (Array.isArray(obj)) return obj.map((v) => deepResolve(v, root))
  if (obj && typeof obj === 'object') return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, deepResolve(v, root)]))
  return resolveRef(obj, root)
}

const flatten = (obj, prefix = '') =>
  Object.entries(obj).reduce((acc, [k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) Object.assign(acc, flatten(v, key))
    else acc[key] = v
    return acc
  }, {})

const dottedToNested = (flat) => {
  const nested = {}
  Object.entries(flat).forEach(([dotKey, value]) => {
    const parts = dotKey.split('.').map((p) => p.replace(/\./g, '-'))
    let node = nested
    parts.forEach((p, idx) => {
      if (idx === parts.length - 1) node[p] = value
      else node[p] = node[p] || {}
      node = node[p]
    })
  })
  return nested
}

const tokens = loadTokens()
const resolvedBase = tokens ? deepResolve(tokens.base || {}, tokens) : {}
const resolvedSemantic = tokens ? deepResolve(tokens.semantic || {}, { ...tokens, base: resolvedBase }) : {}
const semanticFlat = flatten(resolvedSemantic)
const cssVarMap = Object.fromEntries(Object.entries(semanticFlat).map(([k, v]) => [`--${k.replace(/\./g, '-')}`, v]))
const semanticColors = dottedToNested(
  Object.fromEntries(Object.keys(semanticFlat).map((k) => [k, `var(--${k.replace(/\./g, '-')})`]))
)

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
    '../components-library/packages/ui/src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          peach: '#FBC7B2',
          cocoa: '#55362A',
          blush: '#FDD4DC',
        },
        semantic: semanticColors,
      },
      fontFamily: {
        heading: ['"The Seasons"', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 60px rgba(251, 199, 178, 0.35)',
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      if (!tokens) return
      addBase({ ':root': cssVarMap })
    }),
  ],
}
