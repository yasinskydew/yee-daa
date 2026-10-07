import type { ReactNode } from 'react'
import clsx from 'clsx'

export interface NotificationCardProps {
  count: number
  icon: ReactNode
  size?: 'sm' | 'md'
  className?: string
}

export function NotificationCard({
  count,
  icon,
  size = 'md',
  className,
}: NotificationCardProps) {
  return (
    <div
      className={clsx(
        'flex items-center',
        size === 'sm' ? 'gap-1.5' : 'gap-2',
        className,
      )}
    >
      {icon}
      <span
        className={clsx(
          'font-semibold text-primary-strong',
          size === 'sm'
            ? 'text-xs leading-4'
            : 'text-base font-medium leading-none',
        )}
      >
        {count}
      </span>
    </div>
  )
}
