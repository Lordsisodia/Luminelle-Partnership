// Runtime theme applier (ready to drop into src/theme/runtime-theme.ts)
// Applies semantic tokens as CSS variables on documentElement or a given scope.

export type TokenJSON = {
  meta?: Record<string, any>
  base: Record<string, any>
  semantic: Record<string, any>
}

function flatten(obj: Record<string, any>, prefix = ''): Record<string, string> {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) Object.assign(acc, flatten(v, key))
    else acc[key] = String(v)
    return acc
  }, {} as Record<string, string>)
}

export function applyBrandTheme(tokens: TokenJSON, scope: HTMLElement = document.documentElement) {
  const flat = flatten(tokens.semantic)
  const styleId = 'brand-theme-style'
  let style = document.getElementById(styleId) as HTMLStyleElement | null
  if (!style) {
    style = document.createElement('style')
    style.id = styleId
    document.head.appendChild(style)
  }

  const lines = Object.entries(flat).map(([k, v]) => `  --${k.replace(/\./g, '-')}: ${v};`)
  style.innerHTML = `:root {\n${lines.join('\n')}\n}`
  scope.setAttribute('data-brand', tokens.meta?.brand || 'default')
}

// Optional: load tokens from URL or localStorage for per-tenant theming.
export async function loadAndApply(url: string, scope?: HTMLElement) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to load tokens from ${url}`)
  const json = (await res.json()) as TokenJSON
  applyBrandTheme(json, scope)
  return json
}
