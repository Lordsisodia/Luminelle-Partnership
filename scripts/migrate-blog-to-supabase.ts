#!/usr/bin/env tsx
/**
 * Blog Migration Script
 *
 * Migrates existing blog posts from TypeScript files to Supabase database.
 */

import { createClient } from '@supabase/supabase-js'
import { readdirSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'
import 'dotenv/config'

const SUPABASE_URL = process.env.VITE_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing credentials')
  process.exit(1)
}

// Use service role key if available for migration (bypasses RLS)
// Otherwise fall back to anon key (requires RLS policies)
const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    db: {
      schema: 'public'
    }
  }
)
const BLOG_POSTS_DIR = join(process.cwd(), 'src/content/blog/posts')

function generateSlug(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

function parseDate(dateString: string): string {
  try { return new Date(dateString).toISOString() } catch { return new Date().toISOString() }
}

function parseReadTime(readTimeString: string): number {
  const match = readTimeString.match(/(\d+)/)
  return match ? parseInt(match[1], 10) : 5
}

// Define stripFrontmatter inline (matches the blog utils)
function stripFrontmatter(markdown: string): string {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim()
}

// Import pattern matcher for external raw imports
const RAW_IMPORT_REGEX = /import\s+raw\s+from\s+['"](.+?)['"]/
const STRIP_FRONTMATTER_IMPORT = /import\s+{\s*stripFrontmatter\s*}\s+from\s+['"].+?['"]/

// Helper to resolve the markdown file path from import
function resolveMarkdownPath(filePath: string, importPath: string): string | null {
  // Remove the ?raw suffix if present
  const cleanPath = importPath.replace(/\?raw$/, '')
  // Resolve relative to the TypeScript file's directory
  const fileDir = join(filePath, '..')
  const mdPath = join(fileDir, cleanPath)
  return existsSync(mdPath) ? mdPath : null
}

/**
 * Parse blog post file - handle both inline objects and external imports
 */
function parseBlogPostFile(filePath: string, fileContent: string): any {
  let content = fileContent

  // Check if it uses external raw import
  const rawImportMatch = fileContent.match(RAW_IMPORT_REGEX)
  if (rawImportMatch) {
    // Resolve the markdown file path
    const mdPath = resolveMarkdownPath(filePath, rawImportMatch[1])
    if (mdPath) {
      const markdown = readFileSync(mdPath, 'utf-8')
      const body = stripFrontmatter(markdown)

      // Replace the stripFrontmatter(raw) call with actual body content
      // Do this BEFORE removing imports so we don't have any leftover references
      // Need to handle whitespace variations
      content = content.replace(
        /body:\s*stripFrontmatter\s*\(\s*raw\s*\)/,
        `body: ${JSON.stringify(body)}`
      )
    }
  }

  // Remove all import statements (including type imports) - match multiline imports
  content = content.replace(/import\s+{[^}]*}\s+from\s+['"][^'"]+['"]\s*;?\s*\n?/g, '')
  content = content.replace(/import\s+type\s+{[^}]*}\s+from\s+['"][^'"]+['"]\s*;?\s*\n?/g, '')
  content = content.replace(/import\s+\w+\s+from\s+['"][^'"]+['"]\s*;?\s*\n?/g, '')
  // Remove export default statements at end of file
  content = content.replace(/\nexport\s+default\s+\w+\s*;?\s*$/gm, '')
  // Clean up any extra blank lines at the start
  content = content.replace(/^\n+/, '').trim()

  // After all processing, verify no stripFrontmatter calls remain in the object literal
  if (content.includes('stripFrontmatter')) {
    // Still has stripFrontmatter - this shouldn't happen if replacement worked
    // This means the file structure is different than expected
    // Let's check if it's referencing stripFrontmatter in a way we didn't catch
    const lineMatch = content.match(/.*stripFrontmatter.*/)
    if (lineMatch) {
      throw new Error(`Could not replace stripFrontmatter call. Found: ${lineMatch[0].substring(0, 100)}`)
    }
  }

  // Find the variable assignment - could be any name like "post", "aboutLumelle", etc
  // The object may span multiple lines and contain nested objects/arrays
  const match = content.match(/const\s+(\w+):\s*BlogPost\s*=\s*(\{[\s\S]*\})\s*;?\s*$/m)
  if (!match) {
    throw new Error('Could not find blog post object')
  }

  const varName = match[1]
  const objLiteral = match[2]

  try {
    // Create a function that returns the parsed object
    // We use a Function constructor to safely parse the object literal
    const fn = new Function(`return (${objLiteral});`)
    return fn()
  } catch (error) {
    throw new Error(`Failed to parse blog post: ${error}`)
  }
}

async function getOrCreateAuthor(authorName: string, authorRole?: string): Promise<string> {
  const slug = generateSlug(authorName)
  const { data: existing } = await supabase.from('blog_authors').select('id').eq('slug', slug).single()
  if (existing) return existing.id

  const { data, error } = await supabase.from('blog_authors').insert({
    slug, display_name: authorName, role: authorRole, is_active: true,
  }).select('id').single()

  if (error) throw new Error(`Failed to create author "${authorName}": ${error.message}`)
  return data.id
}

async function getOrCreateCategory(categoryName: string): Promise<string | null> {
  if (!categoryName) return null
  const slug = generateSlug(categoryName)
  const { data: existing } = await supabase.from('blog_categories').select('id').eq('slug', slug).single()
  if (existing) return existing.id

  const { data, error } = await supabase.from('blog_categories').insert({
    slug, name: categoryName, is_active: true, display_order: 0,
  }).select('id').single()

  if (error) throw new Error(`Failed to create category "${categoryName}": ${error.message}`)
  return data.id
}

async function getOrCreateTag(tagName: string): Promise<string> {
  const slug = generateSlug(tagName)
  const { data: existing } = await supabase.from('blog_tags').select('id').eq('slug', slug).single()
  if (existing) return existing.id

  const { data, error } = await supabase.from('blog_tags').insert({
    slug, name: tagName, is_active: true,
  }).select('id').single()

  if (error) throw new Error(`Failed to create tag "${tagName}": ${error.message}`)
  return data.id
}

async function migratePost(post: any): Promise<void> {
  // Get or create author first (may fail here)
  let authorId: string
  try {
    authorId = await getOrCreateAuthor(post.author, post.authorRole)
  } catch (error) {
    throw new Error(`Failed to get/create author "${post.author}": ${(error as Error).message}`)
  }

  const categoryId = await getOrCreateCategory(post.tag)

  const tagIds: string[] = []
  if (post.pillar) tagIds.push(await getOrCreateTag(post.pillar))
  if (post.secondaryKeywords) {
    for (const keyword of post.secondaryKeywords.slice(0, 5)) {
      tagIds.push(await getOrCreateTag(keyword))
    }
  }

  const postData = {
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle,
    excerpt: post.teaser,
    content: post.sections || [],
    body: post.body,
    category_id: categoryId,
    author_id: authorId,
    cover_image_url: post.cover,
    og_image_url: post.ogImage || post.cover,
    meta_title: post.primaryKeyword ? `${post.title} | ${post.primaryKeyword} | Lumelle` : `${post.title} | Lumelle`,
    meta_description: post.teaser?.slice(0, 160),
    primary_keyword: post.primaryKeyword,
    secondary_keywords: post.secondaryKeywords,
    intent: post.intent,
    pillar_cluster: post.pillar,
    is_pillar: !!post.pillar,
    is_featured: post.featured,
    read_time_minutes: parseReadTime(post.readTime),
    product_card: post.productCard,
    status: post.status || 'published',
    published_at: parseDate(post.date),
    reviewed_at: post.reviewed ? parseDate(post.reviewed) : undefined,
    cta_target: post.ctaTarget,
    related_post_ids: [],
    author_link: post.authorLink,
    author_role_long: post.authorRoleLong,
  }

  // Check if post already exists (upsert)
  const { data: existing } = await supabase.from('blog_posts').select('id').eq('slug', post.slug).single()

  if (existing) {
    // Update existing post
    const { error: updateError } = await supabase.from('blog_posts').update(postData).eq('id', existing.id)
    if (updateError) throw new Error(`Failed to update post "${post.slug}": ${updateError.message}`)
    return
  }

  // Insert new post
  const { data: newPost, error: postError } = await supabase.from('blog_posts').insert(postData).select('id').single()
  if (postError) throw new Error(`Failed to create post "${post.slug}": ${postError.message}`)

  // Insert FAQs
  if (post.faqs && post.faqs.length > 0) {
    const faqsData = post.faqs.map((faq: any, index: number) => ({
      post_id: newPost.id,
      question: faq.question,
      answer: faq.answer,
      order_index: index,
    }))
    const { error: faqError } = await supabase.from('blog_post_faqs').insert(faqsData)
    if (faqError) throw new Error(`Failed to create FAQs for "${post.slug}": ${faqError.message}`)
  }

  // Link tags
  if (tagIds.length > 0) {
    // Check for existing tag relationships
    for (const tag_id of tagIds) {
      const { data: existing } = await supabase.from('blog_post_tags').select('*').eq('post_id', newPost.id).eq('tag_id', tag_id).single()
      if (!existing) {
        const { error: tagError } = await supabase.from('blog_post_tags').insert({ post_id: newPost.id, tag_id })
        if (tagError) throw new Error(`Failed to link tag for "${post.slug}": ${tagError.message}`)
      }
    }
  }
}

async function main() {
  console.log('🚀 Starting blog migration to Supabase...\n')

  let postsMigrated = 0, postsUpdated = 0, authorsCreated = 0, categoriesCreated = 0, tagsCreated = 0
  const errors: string[] = []

  try {
    const { count: initialAuthors } = await supabase.from('blog_authors').select('*', { count: 'exact', head: true })
    const { count: initialCategories } = await supabase.from('blog_categories').select('*', { count: 'exact', head: true })
    const { count: initialTags } = await supabase.from('blog_tags').select('*', { count: 'exact', head: true })
    const { count: initialPosts } = await supabase.from('blog_posts').select('*', { count: 'exact', head: true })

    const files = readdirSync(BLOG_POSTS_DIR).filter(f => f.endsWith('.ts'))
    console.log(`📁 Found ${files.length} blog post files\n`)

    for (const file of files) {
      try {
        const filePath = join(BLOG_POSTS_DIR, file)
        const fileContent = readFileSync(filePath, 'utf-8')
        const post = parseBlogPostFile(filePath, fileContent)

        // Check if post already exists
        const { data: existing } = await supabase.from('blog_posts').select('id').eq('slug', post.slug).single()

        await migratePost(post)
        if (existing) {
          postsUpdated++
        } else {
          postsMigrated++
        }

        console.log(`   ✅ ${post.slug}`)
      } catch (error) {
        const errorMsg = `Failed to migrate ${file}: ${error}`
        errors.push(errorMsg)
        console.error(`   ❌ ${file}: ${error}`)
      }
    }

    const { count: finalAuthors } = await supabase.from('blog_authors').select('*', { count: 'exact', head: true })
    const { count: finalCategories } = await supabase.from('blog_categories').select('*', { count: 'exact', head: true })
    const { count: finalTags } = await supabase.from('blog_tags').select('*', { count: 'exact', head: true })
    const { count: finalPosts } = await supabase.from('blog_posts').select('*', { count: 'exact', head: true })

    authorsCreated = (finalAuthors || 0) - (initialAuthors || 0)
    categoriesCreated = (finalCategories || 0) - (initialCategories || 0)
    tagsCreated = (finalTags || 0) - (initialTags || 0)

    console.log('\n' + '='.repeat(60))
    console.log('✅ Migration complete!\n')
    console.log(`📊 Statistics:`)
    console.log(`   Posts migrated: ${postsMigrated}`)
    console.log(`   Posts updated: ${postsUpdated}`)
    console.log(`   Total posts in DB: ${finalPosts || 0}`)
    console.log(`   Authors created: ${authorsCreated}`)
    console.log(`   Categories created: ${categoriesCreated}`)
    console.log(`   Tags created: ${tagsCreated}`)
    if (errors.length > 0) {
      console.log(`\n❌ Errors: ${errors.length}`)
      errors.forEach((e) => console.log(`   - ${e}`))
    }
    console.log('='.repeat(60))
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
  }
}

main().catch(console.error)
