import clsx from 'clsx'
import Link from 'next/link'
import { UserIdentity } from '@/app/ui/composites/user-identity'

interface UserCardProps {
  name: string
  handle: string
  href: string
  imageSrc?: string
  imageAlt?: string
  className?: string
}

export function UserCard({
  name,
  href,
  imageSrc,
  imageAlt,
  handle,
  className,
}: UserCardProps) {
  return (
    <article
      className={clsx(
        'w-auto overflow-hidden',
        'rounded-[var(--radius-lg)]',
        className,
      )}
    >
      <Link href={href} className="flex flex-col">
        <UserIdentity
          name={name}
          handle={handle}
          imageSrc={imageSrc}
          imageAlt={imageAlt}
          className="gap-3"
          nameClassName="text-lg leading-7"
          handleClassName="text-sm leading-5 text-muted"
        />
      </Link>
    </article>
  )
}
