/**
 * useBlogPost Hook
 *
 * Fetches a single blog post by ID or slug
 */

import { useQuery } from '@tanstack/react-query'
import type { BlogPost } from '@/types/blog'
import { supabase } from '../infrastructure/supabase'

export function useBlogPost(id?: string, slug?: string, enabled = true) {
  return useQuery({
    queryKey: ['blog-post', id, slug],
    queryFn: async (): Promise<BlogPost | null> => {
      if (!id && !slug) {
        throw new Error('Either id or slug must be provided')
      }

      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          author:blog_authors(*),
          category:blog_categories(*),
          tags:blog_post_tags(tag:blog_tags(*)),
          faqs:blog_post_faqs(*)
        `)

      if (id) {
        query = query.eq('id', id)
      } else if (slug) {
        query = query.eq('slug', slug)
      }

      const { data, error } = await query.single()

      if (error) {
        throw new Error(`Failed to fetch blog post: ${error.message}`)
      }

      return data as BlogPost | null
    },
    enabled: enabled && (!!id || !!slug),
    staleTime: 60_000, // 1 minute
  })
}

/**
 * useBlogAuthors Hook
 *
 * Fetches all blog authors
 */
export function useBlogAuthors(enabled = true) {
  return useQuery({
    queryKey: ['blog-authors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_authors')
        .select('*')
        .order('display_name')

      if (error) {
        throw new Error(`Failed to fetch authors: ${error.message}`)
      }

      return data
    },
    enabled,
    staleTime: 300_000, // 5 minutes
  })
}

/**
 * useBlogCategories Hook
 *
 * Fetches all blog categories
 */
export function useBlogCategories(enabled = true) {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name')

      if (error) {
        throw new Error(`Failed to fetch categories: ${error.message}`)
      }

      return data
    },
    enabled,
    staleTime: 300_000, // 5 minutes
  })
}

/**
 * useBlogTags Hook
 *
 * Fetches all blog tags
 */
export function useBlogTags(enabled = true) {
  return useQuery({
    queryKey: ['blog-tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_tags')
        .select('*')
        .order('name')

      if (error) {
        throw new Error(`Failed to fetch tags: ${error.message}`)
      }

      return data
    },
    enabled,
    staleTime: 300_000, // 5 minutes
  })
}
