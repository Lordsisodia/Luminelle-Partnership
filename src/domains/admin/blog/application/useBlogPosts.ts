/**
 * useBlogPosts Hook
 *
 * Fetches blog posts from Supabase with filtering and pagination support
 */

import { useQuery } from '@tanstack/react-query'
import type { BlogPostFilters, BlogPostListResponse } from '@/types/blog'
import { supabase } from '../infrastructure/supabase'

interface UseBlogPostsOptions extends Partial<BlogPostFilters> {
  enabled?: boolean
}

export function useBlogPosts(options: UseBlogPostsOptions = {}) {
  const {
    status,
    category_id,
    author_id,
    tag_id,
    is_featured,
    is_pillar,
    search,
    limit = 50,
    offset = 0,
    order_by = 'published_at',
    order_direction = 'desc',
    enabled = true,
  } = options

  return useQuery({
    queryKey: ['blog-posts', { status, category_id, author_id, tag_id, is_featured, is_pillar, search, limit, offset, order_by, order_direction }],
    queryFn: async (): Promise<BlogPostListResponse> => {
      let query = supabase
        .from('blog_posts')
        .select('*, author:blog_authors(*), category:blog_categories(*)', { count: 'exact' })

      // Apply filters
      if (status) {
        query = query.eq('status', status)
      }
      if (category_id) {
        query = query.eq('category_id', category_id)
      }
      if (author_id) {
        query = query.eq('author_id', author_id)
      }
      if (is_featured !== undefined) {
        query = query.eq('is_featured', is_featured)
      }
      if (is_pillar !== undefined) {
        query = query.eq('is_pillar', is_pillar)
      }
      if (search) {
        query = query.or(`title.ilike.%${search}%,subtitle.ilike.%${search}%,excerpt.ilike.%${search}%`)
      }

      // Tag filtering requires a join
      if (tag_id) {
        const { data: tagPosts } = await supabase
          .from('blog_post_tags')
          .select('post_id')
          .eq('tag_id', tag_id)

        if (tagPosts) {
          const postIds = tagPosts.map((tp) => tp.post_id)
          if (postIds.length > 0) {
            query = query.in('id', postIds)
          } else {
            // No posts match this tag
            return { posts: [], total: 0, has_more: false }
          }
        }
      }

      // Apply ordering
      query = query.order(order_by, { ascending: order_direction === 'asc' })

      // Apply pagination
      query = query.range(offset, offset + limit - 1)

      const { data, error, count } = await query

      if (error) {
        throw new Error(`Failed to fetch blog posts: ${error.message}`)
      }

      return {
        posts: (data || []) as any[],
        total: count || 0,
        has_more: (count || 0) > offset + limit,
      }
    },
    enabled,
    staleTime: 30_000, // 30 seconds
    gcTime: 300_000, // 5 minutes
  })
}
