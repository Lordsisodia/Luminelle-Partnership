// Minimal TypeScript typing for token JSON files (ready for app use, not wired).
export interface TokenMeta {
  brand: string
  version: number
  mode?: string
  updatedAt?: string
  [key: string]: unknown
}

export type TokenLeaf = string | number | boolean
export type TokenNode = TokenLeaf | { [key: string]: TokenNode }

export interface TokensFile {
  meta: TokenMeta
  base: Record<string, TokenNode>
  semantic: Record<string, TokenNode>
  modes?: Record<string, { base?: Record<string, TokenNode>; semantic?: Record<string, TokenNode> }>
  aliases?: Record<string, TokenNode>
}

declare const tokens: TokensFile
export default tokens
