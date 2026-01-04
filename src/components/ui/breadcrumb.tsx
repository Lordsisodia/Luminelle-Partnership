'use client'

import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

const Breadcrumb = forwardRef<HTMLElement, ComponentPropsWithoutRef<'nav'>>(({ className, ...props }, ref) => (
  <nav ref={ref} aria-label="breadcrumb" className={className} {...props} />
))
Breadcrumb.displayName = 'Breadcrumb'

const BreadcrumbList = forwardRef<HTMLOListElement, ComponentPropsWithoutRef<'ol'>>(({ className, ...props }, ref) => (
  <ol ref={ref} className={cn('flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5', className)} {...props} />
))
BreadcrumbList.displayName = 'BreadcrumbList'

const BreadcrumbItem = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
))
BreadcrumbItem.displayName = 'BreadcrumbItem'

type BreadcrumbLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & { href: string }

const BreadcrumbLink = forwardRef<ElementRef<'a'>, BreadcrumbLinkProps>(({ className, href, ...props }, ref) => (
  <Link ref={ref as any} to={href} className={cn('inline-flex items-center gap-1 transition-colors hover:text-foreground', className)} {...(props as any)} />
))
BreadcrumbLink.displayName = 'BreadcrumbLink'

const BreadcrumbPage = forwardRef<ElementRef<'span'>, ComponentPropsWithoutRef<'span'>>(({ className, ...props }, ref) => (
  <span ref={ref} role="link" aria-disabled="true" aria-current="page" className={cn('text-foreground', className)} {...props} />
))
BreadcrumbPage.displayName = 'BreadcrumbPage'

const BreadcrumbSeparator = ({ className, children, ...props }: ComponentPropsWithoutRef<'li'>) => (
  <li role="presentation" aria-hidden="true" className={cn('text-white/60', className)} {...props}>
    {children ?? <span className="select-none">/</span>}
  </li>
)
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator }

