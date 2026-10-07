import clsx from 'clsx'
import Link from 'next/link'
import Avatar from '@/app/ui/primitives/avatar'

export type AuthorCardProps = {
  name: string
  handle: string
  description: string
  href: string
  imageSrc?: string
  imageAlt?: string
  className?: string
}

export default function AuthorCard({
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
        <div className="flex items-center gap-2 px-4 pt-4 pb-2 lg:gap-3 lg:px-6 lg:pt-6 lg:pb-4">
          <Avatar
            name={name}
            imageSrc={imageSrc}
            imageAlt={imageAlt}
            className="size-8 lg:size-12"
          />
          <div className="min-w-0">
            <p className="truncate text-base font-medium leading-6 text-foreground lg:text-lg lg:leading-7">
              {name}
            </p>
            <p className="truncate text-xs leading-4 font-normal text-foreground/64 lg:text-sm lg:leading-5">
              {handle}
            </p>
          </div>
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
