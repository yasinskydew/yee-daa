'use client'

import clsx from 'clsx'
import type { Category } from '@/app/data/types'
import CategoryNavItem from '@/app/ui/platform/category-nav/category-nav-item'
import { useCategoryNav } from '@/app/ui/platform/category-nav/use-category-nav'

type CategoryNavProps = {
  categories: Category[]
  className?: string
}

export default function CategoryNav({
  categories,
  className,
}: CategoryNavProps) {
  const { openSlug, filter, toggle } = useCategoryNav(categories)

  return (
    <nav
      aria-label="Категории"
      className={clsx('flex w-full flex-col', className)}
    >
      {categories.map((category) => (
        <CategoryNavItem
          key={category.slug}
          category={category}
          isOpen={openSlug === category.slug}
          filter={filter}
          onToggle={toggle}
        />
      ))}
    </nav>
  )
}
