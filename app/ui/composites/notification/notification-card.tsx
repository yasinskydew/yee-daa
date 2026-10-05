import type { ReactNode } from 'react'

export type NotificationCardProps = {
  count: number
  icon: ReactNode
}

export default function NotificationCard({
  count,
  icon,
}: NotificationCardProps) {
  return (
    <div className="flex items-center justify-center gap-1 px-2 py-1 md:px-1 md:py-2">
      {icon}
      <span className="text-sm font-bold text-primary-strong">{count}</span>
    </div>
  )
}
