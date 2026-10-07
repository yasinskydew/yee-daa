import clsx from 'clsx'
import Link from 'next/link'
import type { ReactNode } from 'react'

interface NavItemProps {
  href: string
  label: string
  active?: boolean
  icon?: ReactNode
  variant?: 'sidebar' | 'tab'
  className?: string
}

export function NavItem({
  href,
  label,
  active = false,
  icon,
  variant = 'sidebar',
  className,
}: NavItemProps) {
  if (variant === 'tab') {
    return (
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        className={clsx(
          'flex min-w-0 flex-1 flex-col items-center justify-end gap-1 px-1 py-2.5',
          active &&
            'bg-[radial-gradient(circle_at_50%_30%,var(--primary)_0%,transparent_70%)]',
          className,
        )}
      >
        {icon}
        <span
          className={clsx(
            'w-full truncate text-center text-xs leading-4',
            active
              ? 'font-medium text-foreground'
              : 'font-normal text-foreground/64',
          )}
        >
          {label}
        </span>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex items-center gap-3 px-6 h-12 text-foreground',
        'rounded-[var(--radius-md)] transition-colors',
        active && 'bg-primary-soft font-medium',
        className,
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
