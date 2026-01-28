/**
 * Blog Module Types
 *
 * Types matching Supabase blog schema tables:
 * - blog_authors
 * - blog_categories
 * - blog_tags
 * - blog_posts
 * - blog_post_tags (junction)
 * - blog_post_faqs
 */

// ============================================================================
// Database Row Types (from Supabase)
// ============================================================================

export interface DatabaseBlogAuthor {
  id: string
  slug: string
  display_name: string
  bio: string | null
  avatar_url: string | null
  role: string | null
  expertise: string[] | null
  social_twitter_url: string | null
  social_instagram_url: string | null
  social_tiktok_url: string | null
  social_youtube_url: string | null
  website_url: string | null
  user_id: string | null
  meta_title: string | null
  meta_description: string | null
  is_active: boolean
  featured_index: number | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface DatabaseBlogCategory {
  id: string
  slug: string
  name: string
  description: string | null
  parent_id: string | null
  color: string | null
  icon: string | null
  meta_title: string | null
  meta_description: string | null
  og_image_url: string | null
  is_pillar: boolean
  pillar_content_url: string | null
  is_active: boolean
  display_order: number | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface DatabaseBlogTag {
  id: string
  slug: string
  name: string
  description: string | null
  color: string | null
  is_featured: boolean
  is_active: boolean
  usage_count: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface DatabaseBlogPost {
  id: string
  slug: string
  title: string
  subtitle: string | null
  excerpt: string | null
  content: JsonbContentSection[]
  body: string | null
  category_id: string | null
  author_id: string | null
  cover_image_url: string | null
  og_image_url: string | null
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string[] | null
  schema_markup: SchemaMarkup | null
  primary_keyword: string | null
  secondary_keywords: string[] | null
  intent: BlogIntent | null
  pillar_cluster: string | null
  is_pillar: boolean
  is_featured: boolean
  featured_index: number | null
  read_time_minutes: number | null
  difficulty: BlogDifficulty | null
  related_product_id: string | null
  product_card: ProductCard | null
  status: BlogStatus
  published_at: string | null
  scheduled_for: string | null
  reviewed_at: string | null
  updated_review_at: string | null
  cta_target: string | null
  cta_text: string | null
  view_count: number
  like_count: number
  comment_count: number
  related_post_ids: string[] | null
  internal_links: InternalLinkData | null
  author_link: string | null
  author_role_long: string | null
  created_at: string
  updated_at: string
  first_published_at: string | null
  deleted_at: string | null
}

export interface DatabaseBlogPostTag {
  post_id: string
  tag_id: string
  created_at: string
}

export interface DatabaseBlogPostFaq {
  id: string
  post_id: string
  question: string
  answer: string
  order_index: number
  related_post_id: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

// ============================================================================
// Shared Enums & Unions
// ============================================================================

export type BlogIntent = 'informational' | 'how-to' | 'comparison' | 'commercial' | 'navigational'
export type BlogStatus = 'draft' | 'published' | 'scheduled' | 'archived'
export type BlogDifficulty = 'beginner' | 'intermediate' | 'advanced'

// ============================================================================
// Content Structure Types
// ============================================================================

/**
 * Content sections stored in blog_posts.content as JSONB
 * Matches the existing file-based blog structure
 */
export interface JsonbContentSection {
  heading: string
  paragraphs: string[]
  image?: string
  imageAlt?: string
  embedUrl?: string
  productCard?: ProductCard
  relatedLinks?: RelatedLink[]
}

export interface ProductCard {
  title: string
  price?: string
  badge?: string
  href: string
  image: string
  caption?: string
}

export interface RelatedLink {
  label: string
  href: string
}

export interface InternalLinkData {
  [key: string]: {
    title: string
    href: string
    context?: string
  }
}

/**
 * Schema markup for SEO (Article, BlogPosting, FAQPage, BreadcrumbList)
 */
export interface SchemaMarkup {
  '@context'?: string
  '@type'?: string
  headline?: string
  description?: string
  image?: string[]
  author?: {
    '@type': string
    name: string
    url?: string
  }
  publisher?: {
    '@type': string
    name: string
    logo?: {
      '@type': string
      url: string
    }
  }
  datePublished?: string
  dateModified?: string
  mainEntityOfPage?: {
    '@type': string
    '@id': string
  }
  // FAQPage schema
  mainEntity?: Array<{
    '@type': string
    name: string
    acceptedAnswer: {
      '@type': string
      text: string
    }
  }>
  // BreadcrumbList schema
  itemListElement?: Array<{
    '@type': string
    position: number
    name: string
    item?: string
  }>
}

// ============================================================================
// Application Types (with relations)
// ============================================================================

export interface BlogAuthor extends DatabaseBlogAuthor {
  post_count?: number
}

export interface BlogCategory extends DatabaseBlogCategory {
  post_count?: number
  children?: BlogCategory[]
  parent?: BlogCategory
}

export interface BlogTag extends DatabaseBlogTag {
  // Usage_count is already on the base type
}

export interface BlogPost extends DatabaseBlogPost {
  author?: BlogAuthor
  category?: BlogCategory
  tags?: BlogTag[]
  faqs?: BlogPostFaq[]
}

export interface BlogPostFaq extends DatabaseBlogPostFaq {
  related_post?: BlogPost
}

// ============================================================================
// Create/Update Types (for mutations)
// ============================================================================

export interface BlogAuthorCreate {
  slug: string
  display_name: string
  bio?: string
  avatar_url?: string
  role?: string
  expertise?: string[]
  social_twitter_url?: string
  social_instagram_url?: string
  social_tiktok_url?: string
  social_youtube_url?: string
  website_url?: string
  meta_title?: string
  meta_description?: string
  is_active?: boolean
  featured_index?: number
}

export interface BlogAuthorUpdate extends Partial<BlogAuthorCreate> {}

export interface BlogCategoryCreate {
  slug: string
  name: string
  description?: string
  parent_id?: string
  color?: string
  icon?: string
  meta_title?: string
  meta_description?: string
  og_image_url?: string
  is_pillar?: boolean
  pillar_content_url?: string
  is_active?: boolean
  display_order?: number
}

export interface BlogCategoryUpdate extends Partial<BlogCategoryCreate> {}

export interface BlogTagCreate {
  slug: string
  name: string
  description?: string
  color?: string
  is_featured?: boolean
  is_active?: boolean
}

export interface BlogTagUpdate extends Partial<BlogTagCreate> {}

export interface BlogPostCreate {
  slug: string
  title: string
  subtitle?: string
  excerpt?: string
  content: JsonbContentSection[]
  body?: string
  category_id?: string
  author_id?: string
  cover_image_url?: string
  og_image_url?: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string[]
  schema_markup?: SchemaMarkup
  primary_keyword?: string
  secondary_keywords?: string[]
  intent?: BlogIntent
  pillar_cluster?: string
  is_pillar?: boolean
  is_featured?: boolean
  featured_index?: number
  read_time_minutes?: number
  difficulty?: BlogDifficulty
  related_product_id?: string
  product_card?: ProductCard
  status?: BlogStatus
  published_at?: string
  scheduled_for?: string
  reviewed_at?: string
  cta_target?: string
  cta_text?: string
  related_post_ids?: string[]
  internal_links?: InternalLinkData
  author_link?: string
  author_role_long?: string
  faqs?: Array<{ question: string; answer: string }>
}

export interface BlogPostUpdate extends Partial<BlogPostCreate> {}

export interface BlogPostFaqCreate {
  post_id: string
  question: string
  answer: string
  order_index?: number
  related_post_id?: string
}

export interface BlogPostFaqUpdate extends Partial<Omit<BlogPostFaqCreate, 'post_id'>> {}

// ============================================================================
// Query & Filter Types
// ============================================================================

export interface BlogPostFilters {
  status?: BlogStatus
  category_id?: string
  author_id?: string
  tag_id?: string
  is_featured?: boolean
  is_pillar?: boolean
  pillar_cluster?: string
  search?: string
  limit?: number
  offset?: number
  order_by?: 'published_at' | 'created_at' | 'view_count' | 'title'
  order_direction?: 'asc' | 'desc'
}

export interface BlogPostListResponse {
  posts: BlogPost[]
  total: number
  has_more: boolean
}

// ============================================================================
// Migration Types (for file-to-Supabase migration)
// ============================================================================

/**
 * Legacy file-based blog post type
 * Used for migration from TypeScript files to Supabase
 */
export interface LegacyBlogPost {
  slug: string
  title: string
  subtitle: string
  tag: string
  pillar?: string
  primaryKeyword?: string
  secondaryKeywords?: string[]
  intent?: BlogIntent
  status?: BlogStatus
  ctaTarget?: string
  author: string
  authorRole?: string
  authorAvatar?: string
  date: string
  reviewed?: string
  readTime: string
  cover: string
  ogImage?: string
  teaser: string
  body?: string
  sections?: {
    heading: string
    paragraphs: string[]
    image?: string
    imageAlt?: string
    embedUrl?: string
    productCard?: ProductCard
    relatedLinks?: RelatedLink[]
  }[]
  featured?: boolean
  faqs?: { question: string; answer: string }[]
  productCard?: ProductCard
  authorLink?: string
  authorRoleLong?: string
}

export interface MigrationResult {
  success: boolean
  posts_migrated: number
  authors_created: number
  categories_created: number
  tags_created: number
  errors: string[]
  warnings: string[]
}
