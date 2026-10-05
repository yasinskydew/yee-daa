'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { Category } from '@/app/data/types'
import { CategoryIcon, ChevronDownIcon } from '@/app/ui/icons'

type CategoryNavProps = {
  categories: Category[]
  className?: string
}

function categoryHref(slug: string) {
  return `/category/${slug}`
}

function findActiveSlug(pathname: string, categories: Category[]) {
  for (const category of categories) {
    if (pathname === categoryHref(category.slug)) return category.slug
    if (
      category.children.some((child) => pathname === categoryHref(child.slug))
    ) {
      return category.slug
    }
  }
  return null
}

export default function CategoryNav({ categories, className }: CategoryNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [openSlug, setOpenSlug] = useState<string | null>(() =>
    findActiveSlug(pathname, categories),
  )

  useEffect(() => {
    setOpenSlug(findActiveSlug(pathname, categories))
  }, [pathname, categories])

  function toggleCategory(category: Category) {
    setOpenSlug((current) => {
      if (current === category.slug) return null

      router.push(categoryHref(category.slug))
      return category.slug
    })
  }

  return (
    <nav
      aria-label="Категории"
      className={clsx('flex w-full flex-col', className)}
    >
      {categories.map((category) => {
        const isOpen = openSlug === category.slug
        const isParentActive = pathname === categoryHref(category.slug)
        const hasActiveChild = category.children.some(
          (child) => pathname === categoryHref(child.slug),
        )

        return (
          <div key={category.slug}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={
                category.children.length > 0
                  ? `category-${category.slug}-children`
                  : undefined
              }
              onClick={() => toggleCategory(category)}
              className={clsx(
                'flex h-12 w-full items-center gap-3 rounded-[var(--radius-md)] px-4 text-left text-foreground transition-colors',
                isOpen && 'bg-primary-soft font-medium',
                !isOpen && (isParentActive || hasActiveChild) && 'font-medium',
              )}
            >
              <CategoryIcon name={category.icon} className="size-6" />
              <span className="min-w-0 flex-1 truncate">{category.title}</span>
              {category.children.length > 0 && (
                <ChevronDownIcon
                  className={clsx(
                    'text-foreground transition-transform',
                    isOpen && 'rotate-180',
                  )}
                />
              )}
            </button>

            {isOpen && category.children.length > 0 && (
              <ul
                id={`category-${category.slug}-children`}
                className="ml-10 flex flex-col border-l-2 border-primary-soft py-1"
              >
                {category.children.map((child) => {
                  const href = categoryHref(child.slug)
                  const isActive = pathname === href

                  return (
                    <li key={child.slug}>
                      <Link
                        href={href}
                        aria-current={isActive ? 'page' : undefined}
                        className={clsx(
                          '-ml-[2px] block border-l-2 py-2 pl-4 pr-4 text-sm transition-colors',
                          isActive
                            ? 'border-primary-strong font-medium text-foreground'
                            : 'border-transparent text-foreground/80 hover:text-foreground',
                        )}
                      >
                        {child.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )
}
