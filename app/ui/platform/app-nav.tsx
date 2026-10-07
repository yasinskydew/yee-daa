'use client'

import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { MagnifyingGlassIcon } from '@/app/ui/icons/magnifying-glass'
import { PencilSquareIcon } from '@/app/ui/icons/pencil-square'
import NavItem from '@/app/ui/primitives/nav-item'

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('size-6 shrink-0', className)}
      aria-hidden
    >
      <path
        d="M2.25 12 12 2.25 21.75 12M4.5 9.75V19.5A1.5 1.5 0 0 0 6 21h3.75v-4.5a1.5 1.5 0 0 1 1.5-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5V21H18a1.5 1.5 0 0 0 1.5-1.5V9.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const APP_NAV_LINKS = [
  { label: 'Главная', href: '/home', id: 'home' },
  { label: 'Поиск', href: '/home#search', id: 'search' },
  { label: 'Записать', href: '/recipes/new', id: 'write' },
  { label: 'Мой профиль', href: '/profile', id: 'profile' },
] as const

type AppNavProps = {
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

export default function AppNav({
  orientation = 'vertical',
  className,
}: AppNavProps) {
  const pathname = usePathname()
  const isHorizontal = orientation === 'horizontal'

  if (!isHorizontal) {
    return (
      <nav
        aria-label="Основная навигация"
        className={clsx('flex flex-col', className)}
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

  return (
    <nav
      aria-label="Основная навигация"
      className={clsx(
        'flex w-full items-stretch bg-header shadow-[0_-4px_20px_rgba(0,0,0,0.08)]',
        className,
      )}
    >
      {APP_NAV_LINKS.map((link) => {
        const active =
          link.id === 'home'
            ? pathname === '/home' || pathname === '/'
            : pathname === link.href || pathname.startsWith(`${link.href}/`)

        return (
          <Link
            key={link.id}
            href={link.href}
            aria-current={active ? 'page' : undefined}
            className={clsx(
              'flex min-w-0 flex-1 flex-col items-center justify-end gap-1 px-1 py-2.5',
              active &&
                'bg-[radial-gradient(circle_at_50%_30%,var(--primary)_0%,transparent_70%)]',
            )}
          >
            {link.id === 'home' ? (
              <span
                className={clsx(
                  'flex items-center justify-center rounded-full',
                  active
                    ? 'size-10 bg-foreground text-header'
                    : 'size-12 text-foreground',
                )}
              >
                <HomeIcon className={active ? 'size-4' : 'size-6'} />
              </span>
            ) : null}
            {link.id === 'search' ? (
              <span className="flex size-12 items-center justify-center text-foreground">
                <MagnifyingGlassIcon className="size-6" />
              </span>
            ) : null}
            {link.id === 'write' ? (
              <span className="flex size-12 items-center justify-center text-foreground">
                <PencilSquareIcon className="size-6" />
              </span>
            ) : null}
            {link.id === 'profile' ? (
              <span className="relative size-10 overflow-hidden rounded-full bg-muted">
                <Image
                  src="/avatar-mock.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </span>
            ) : null}
            <span
              className={clsx(
                'w-full truncate text-center text-xs leading-4',
                active
                  ? 'font-medium text-foreground'
                  : 'font-normal text-foreground/64',
              )}
            >
              {link.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
