'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from '@/app/ui/primitives/breadcrumbs'
import { getCategoryBySlug } from '@/app/data/categories'

const PAGE_LABELS: Record<string, string> = {
  home: 'Главная',
  juicy: 'Самое сочное',
  cookbook: 'Книга рецептов',
  subscriptions: 'Подписки',
  profile: 'Профиль',
  recipes: 'Рецепты',
  new: 'Записать рецепт',
  blogs: 'Блоги',
}

interface BreadcrumbsNavProps {
  className?: string
}

function homeCategoryCrumbs(cat: string | null, sub: string | null): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: 'Главная', href: '/home' }]
  if (!cat) {
    return [{ label: 'Главная' }]
  }

  const category = getCategoryBySlug(cat)
  if (!category) return items

  const child = sub
    ? category.children.find((item) => item.slug === sub)
    : undefined

  items.push({
    label: category.title,
    href: child ? `/home?cat=${category.slug}` : undefined,
  })

  if (child) {
    items.push({ label: child.title })
  }

  return items
}

export function BreadcrumbsNav({ className }: BreadcrumbsNavProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const parts = pathname.split('/').filter(Boolean)
  const root = parts[0]

  const items: BreadcrumbItem[] =
    root === 'home'
      ? homeCategoryCrumbs(searchParams.get('cat'), searchParams.get('sub'))
      : parts.map((part, i) => {
          const href = '/' + parts.slice(0, i + 1).join('/')
          const isLast = i === parts.length - 1
          return {
            label: PAGE_LABELS[part] ?? decodeURIComponent(part),
            href: isLast ? undefined : href,
          }
        })

  if (items.length > 0 && items[0].label !== 'Главная' && root !== 'home') {
    items.unshift({ label: 'Главная', href: '/home' })
  }

  return <Breadcrumbs items={items} className={className} />
}
