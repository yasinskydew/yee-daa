import clsx from 'clsx'
import { Avatar } from '@/app/ui/primitives/avatar'

export interface UserIdentityProps {
  name: string
  handle: string
  imageSrc?: string
  imageAlt?: string
  avatarClassName?: string
  nameClassName?: string
  handleClassName?: string
  className?: string
}

export function UserIdentity({
  name,
  handle,
  imageSrc,
  imageAlt,
  avatarClassName,
  nameClassName,
  handleClassName,
  className,
}: UserIdentityProps) {
  return (
    <div className={clsx('flex items-center gap-2 lg:gap-3', className)}>
      <Avatar
        name={name}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        className={avatarClassName}
      />
      <div className="min-w-0">
        <p className={clsx('truncate font-medium text-foreground', nameClassName)}>
          {name}
        </p>
        <p className={clsx('truncate', handleClassName)}>{handle}</p>
      </div>
    </div>
  )
}
