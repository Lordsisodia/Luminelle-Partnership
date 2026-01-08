// Alias -> canonical public handle.
//
// Purpose:
// - Avoid duplicated SEO/analytics signals across multiple PDP URLs.
// - Keep admin + client consistent about which handle is "real".
//
// NOTE: This is intentionally *not* derived from `productConfigs` because aliases
// should not require duplicating full config entries.
export const CANONICAL_PRODUCT_HANDLES: Record<string, string> = {
  'satin-overnight-curler-set': 'satin-overnight-curler',
  'satin-overnight-curler-sets': 'satin-overnight-curler',
}

export function canonicalizeProductHandle(handle: string): string {
  const trimmed = String(handle ?? '').trim()
  if (!trimmed) return ''
  return CANONICAL_PRODUCT_HANDLES[trimmed] ?? trimmed
}
