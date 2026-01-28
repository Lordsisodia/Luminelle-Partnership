/**
 * Blog Infrastructure Layer
 *
 * Supabase client and services for blog data access
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
})

// Blog-specific table accessors
export const blogTables = {
  posts: () => supabase.from('blog_posts'),
  authors: () => supabase.from('blog_authors'),
  categories: () => supabase.from('blog_categories'),
  tags: () => supabase.from('blog_tags'),
  postTags: () => supabase.from('blog_post_tags'),
  faqs: () => supabase.from('blog_post_faqs'),
} as const
