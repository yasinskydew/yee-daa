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
        <div className="flex items-center gap-3 px-6 pt-6 pb-4">
          <Avatar name={name} imageSrc={imageSrc} imageAlt={imageAlt} />
          <div className="min-w-0">
            <p className="truncate text-lg font-medium leading-7 text-foreground">
              {name}
            </p>
            <p className="truncate text-sm leading-5 font-normal text-foreground/64">
              {handle}
            </p>
          </div>
        </div>
        <div className="px-6 pt-3 pb-5">
          <p className="h-16 line-clamp-3 text-sm leading-5 font-normal text-foreground">
            {description}
          </p>
        </div>
      </Link>
    </article>
  )
}
