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
  className,
}: UserNotificationsProps) {
  // Порядок как в Figma: bookmark → people → heart-eyes
  const items: NotificationItem[] = [
    {
      id: 'saved',
      count: saved,
      icon: <BookmarkHeartIcon />,
    },
    {
      id: 'users',
      count: users,
      icon: <PeopleFillIcon />,
    },
    {
      id: 'likes',
      count: likes,
      icon: <EmojiHeartEyesIcon />,
    },
  ]

  return (
    <div className={clsx('flex md:flex-col', className)}>
      {items.map((card) => (
        <NotificationCard key={card.id} count={card.count} icon={card.icon} />
      ))}
    </div>
  )
}
