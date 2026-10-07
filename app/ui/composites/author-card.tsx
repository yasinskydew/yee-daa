import clsx from 'clsx'
import Link from 'next/link'
import { UserIdentity } from '@/app/ui/composites/user-identity'

export interface AuthorCardProps {
  name: string
  handle: string
  description: string
  href: string
  imageSrc?: string
  imageAlt?: string
  className?: string
}

export function AuthorCard({
  name,
  href,
  imageSrc,
  imageAlt,
  handle,
  description,
  className,
}: AuthorCardProps) {
  return (
    <article
      className={clsx(
        'w-full overflow-hidden border border-border bg-background',
        'rounded-[var(--radius-lg)]',
        className,
      )}
    >
      <Link href={href} className="flex h-full flex-col">
        <div className="px-4 pt-4 pb-2 lg:px-6 lg:pt-6 lg:pb-4">
          <UserIdentity
            name={name}
            handle={handle}
            imageSrc={imageSrc}
            imageAlt={imageAlt}
            avatarClassName="size-8 lg:size-12"
            nameClassName="text-base leading-6 lg:text-lg lg:leading-7"
            handleClassName="text-xs leading-4 font-normal text-foreground/64 lg:text-sm lg:leading-5"
          />
        </div>
        <div className="px-4 pt-2 pb-4 lg:px-6 lg:pt-3 lg:pb-5">
          <p className="line-clamp-3 max-h-[3.75rem] overflow-hidden text-sm leading-5 font-normal text-foreground">
            {description}
          </p>
        </div>
      </Link>
    </article>
  )
}
