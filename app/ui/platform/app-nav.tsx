'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import NavItem from '@/app/ui/nav-item'

export const APP_NAV_LINKS = [
  { label: 'Главная', href: '/home' },
  { label: 'Книга рецептов', href: '/cookbook' },
  { label: 'Подписки', href: '/subscriptions' },
  { label: 'Профиль', href: '/profile' },
] as const

type AppNavProps = {
  /** vertical — колонка (aside); horizontal — ряд (bottom bar) */
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

/** Основная навигация приложения. Не привязана к sidebar — только меню маршрутов. */
export default function AppNav({
  orientation = 'vertical',
  className,
}: AppNavProps) {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Основная навигация"
      className={clsx(
        orientation === 'vertical' && 'flex flex-col',
        orientation === 'horizontal' && 'flex flex-row items-center justify-around',
        className,
      )}
    >
      {APP_NAV_LINKS.map((link) => (
        <NavItem
          key={link.href}
          href={link.href}
          label={link.label}
          active={pathname === link.href}
        />
      ))}
    </nav>
  )
}
