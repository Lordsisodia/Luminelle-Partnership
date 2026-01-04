import fs from 'node:fs'
import path from 'node:path'

const repoRoot = process.cwd()
const postsDir = path.join(repoRoot, 'src', 'content', 'blog', 'posts')

/**
 * Validates that blog post modules reference markdown files that exist.
 * This prevents Vite dev-server 500s like:
 *   "Failed to load resource: the server responded with a status of 500"
 * which can cascade into lazy-import failures in the admin UI.
 */
function main() {
  if (!fs.existsSync(postsDir)) {
    console.error(`Blog posts directory not found: ${postsDir}`)
    process.exit(1)
  }

  const postFiles = fs.readdirSync(postsDir).filter((f) => f.endsWith('.ts'))
  const errors = []

  for (const file of postFiles) {
    const abs = path.join(postsDir, file)
    const content = fs.readFileSync(abs, 'utf8')

    for (const match of content.matchAll(/import\s+raw\s+from\s+['"]([^'"]+\.md\?raw)['"]/g)) {
      const spec = match[1]
      const [mdRel] = spec.split('?raw')

      if (mdRel.includes('docs/blogs/')) {
        errors.push(`${path.relative(repoRoot, abs)}: uses deprecated path segment "docs/blogs" -> ${spec}`)
        continue
      }

      const mdAbs = path.resolve(path.dirname(abs), mdRel)
      if (!fs.existsSync(mdAbs)) {
        errors.push(`${path.relative(repoRoot, abs)}: markdown not found -> ${spec} (resolved to ${path.relative(repoRoot, mdAbs)})`)
      }
    }
  }

  if (errors.length) {
    console.error('Blog content validation failed:\n')
    for (const e of errors) console.error(`- ${e}`)
    console.error('\nFix the file path(s) and re-run.')
    process.exit(1)
  }

  console.log(`Blog content validation OK (${postFiles.length} post modules checked).`)
}

main()

