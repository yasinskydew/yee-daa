'use client'

import { usePathname } from 'next/navigation'
import Breadcrumbs from '@/app/ui/primitives/breadcrumbs'

const LABELS: Record<string, string> = {
  home: 'Главная',
  cookbook: 'Книга рецептов',
  subscriptions: 'Подписки',
  profile: 'Профиль',
  category: 'Категория',
  recipes: 'Рецепты',
  blogs: 'Блоги',
}

type BreadcrumbsNavProps = {
  className?: string
}

export default function BreadcrumbsNav({ className }: BreadcrumbsNavProps) {
  const pathname = usePathname()
  const parts = pathname.split('/').filter(Boolean)

  const items = parts.map((part, i) => {
    const href = '/' + parts.slice(0, i + 1).join('/')
    const isLast = i === parts.length - 1
    return {
      label: LABELS[part] ?? decodeURIComponent(part),
      href: isLast ? undefined : href,
    }
  })

  return <Breadcrumbs items={items} className={className} />
}
