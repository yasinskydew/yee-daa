import type { ReactNode } from 'react'
import clsx from 'clsx'

export type NotificationCardProps = {
  count: number
  icon: ReactNode
  className?: string
}

export default function NotificationCard({
  count,
  icon,
  className,
}: NotificationCardProps) {
  return (
    <div
      className={clsx(
        'flex items-center gap-2',
        className,
      )}
    >
      {icon}
      <span className="text-base font-medium leading-none text-primary-strong">
        {count}
      </span>
    </div>
  )
}
