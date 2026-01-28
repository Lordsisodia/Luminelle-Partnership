/**
 * useBlogMutations Hook
 *
 * Mutations for creating, updating, and deleting blog posts
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { BlogPostCreate, BlogPostUpdate } from '@/types/blog'
import { supabase } from '../infrastructure/supabase'

export function useCreateBlogPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (post: BlogPostCreate) => {
      // First, insert the post
      const { data: postData, error: postError } = await supabase
        .from('blog_posts')
        .insert(post)
        .select('id')
        .single()

      if (postError) {
        throw new Error(`Failed to create blog post: ${postError.message}`)
      }

      // Handle FAQs if provided
      if (post.faqs && post.faqs.length > 0) {
        const faqsData = post.faqs.map((faq, index) => ({
          post_id: postData.id,
          question: faq.question,
          answer: faq.answer,
          order_index: index,
        }))

        const { error: faqError } = await supabase
          .from('blog_post_faqs')
          .insert(faqsData)

        if (faqError) {
          throw new Error(`Failed to create FAQs: ${faqError.message}`)
        }
      }

      return postData
    },
    onSuccess: () => {
      // Invalidate blog posts queries
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] })
      queryClient.invalidateQueries({ queryKey: ['blog-post'] })
    },
  })
}

export function useUpdateBlogPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...updates }: BlogPostUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw new Error(`Failed to update blog post: ${error.message}`)
      }

      return data
    },
    onSuccess: (data) => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] })
      queryClient.invalidateQueries({ queryKey: ['blog-post', data.id] })
      queryClient.invalidateQueries({ queryKey: ['blog-post', data.slug] })
    },
  })
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blog_posts')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id)

      if (error) {
        throw new Error(`Failed to delete blog post: ${error.message}`)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] })
    },
  })
}

export function useUpdateBlogPostStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'draft' | 'published' | 'scheduled' | 'archived' }) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          status,
          ...(status === 'published' && { published_at: new Date().toISOString() }),
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw new Error(`Failed to update post status: ${error.message}`)
      }

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] })
      queryClient.invalidateQueries({ queryKey: ['blog-post'] })
    },
  })
}
