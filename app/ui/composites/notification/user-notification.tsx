import type { ReactNode } from 'react'
import clsx from 'clsx'
import {
  BookmarkHeartIcon,
  EmojiHeartEyesIcon,
  PeopleFillIcon,
} from '@/app/ui/icons'
import NotificationCard from './notification-card'

export type UserNotificationsProps = {
  saved: number
  likes: number
  users: number
  /** horizontal — mobile header; vertical — desktop rail 208×200 */
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

type NotificationItem = {
  id: string
  count: number
  icon: ReactNode
}

export default function UserNotifications({
  saved,
  likes,
  users,
  orientation = 'vertical',
  className,
}: UserNotificationsProps) {
  const isHorizontal = orientation === 'horizontal'
  const iconSize = isHorizontal ? 'sm' : 'lg'

  const items: NotificationItem[] = [
    {
      id: 'saved',
      count: saved,
      icon: <BookmarkHeartIcon size={iconSize} />,
    },
    {
      id: 'users',
      count: users,
      icon: <PeopleFillIcon size={iconSize} />,
    },
    {
      id: 'likes',
      count: likes,
      icon: <EmojiHeartEyesIcon size={iconSize} />,
    },
  ]

  return (
    <div
      className={clsx(
        isHorizontal
          ? 'flex flex-row items-center gap-4'
          : 'flex h-[200px] w-[208px] flex-col items-center justify-center gap-6',
        className,
      )}
    >
      {items.map((card) => (
        <NotificationCard key={card.id} count={card.count} icon={card.icon} />
      ))}
    </div>
  )
}
