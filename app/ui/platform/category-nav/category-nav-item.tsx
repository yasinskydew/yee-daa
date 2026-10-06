'use client'

import clsx from 'clsx'
import Link from 'next/link'
import {
  categoryHref,
  isCategoryActive,
} from '@/app/data/categories'
import type { Category } from '@/app/data/types'
import { CategoryIcon, ChevronDownIcon } from '@/app/ui/icons'

type CategoryNavItemProps = {
  category: Category
  isOpen: boolean
  pathname: string
  onToggle: (category: Category) => void
}

export default function CategoryNavItem({
  category,
  isOpen,
  pathname,
  onToggle,
}: CategoryNavItemProps) {
  const hasChildren = category.children.length > 0
  const active = isCategoryActive(pathname, category)
  const childrenId = `category-${category.slug}-children`

  return (
    <div>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={hasChildren ? childrenId : undefined}
        onClick={() => onToggle(category)}
        className={clsx(
          'flex h-12 w-full items-center gap-3 px-2 text-left text-foreground transition-colors font-normal',
          isOpen && 'bg-primary-soft font-bold',
          !isOpen && active && 'font-medium',
        )}
      >
        <CategoryIcon name={category.icon} className="size-6" />
        <span className="min-w-0 flex-1 truncate">{category.title}</span>
        {hasChildren && (
          <ChevronDownIcon
            className={clsx(
              'text-foreground transition-transform',
              isOpen && 'rotate-180',
            )}
          />
        )}
      </button>

      {isOpen && hasChildren && (
        <ul
          id={childrenId}
          className="ml-10 flex flex-col py-1"
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
                    'block border-l-primary-soft py-2 pl-4 pr-4 text-sm transition-colors my-1',
                    isActive
                      ? '-ml-2 border-l-8 font-bold'
                      : '-ml-[2px] border-l-2',
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
}
