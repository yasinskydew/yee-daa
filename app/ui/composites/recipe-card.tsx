import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import Badge from '@/app/ui/primitives/badge'
import { BookmarkHeartIcon } from '@/app/ui/icons/bookmark-heart'
import { CategoryIcon, type CategoryIconName } from '@/app/ui/icons'

export type RecipeCardProps = {
  variant?: 'vertical' | 'horizontal'
  title: string
  description: string
  href: string
  categoryLabel: string
  categoryIcon: CategoryIconName
  likes?: number
  imageSrc?: string
  imageAlt?: string
  className?: string
}

export default function RecipeCard({
  variant = 'vertical',
  title,
  description,
  href,
  categoryLabel,
  categoryIcon,
  likes = 0,
  imageSrc,
  imageAlt,
  className,
}: RecipeCardProps) {
  const isHorizontal = variant === 'horizontal'

  return (
    <article
      className={clsx(
        'w-full overflow-hidden border border-border bg-background',
        'rounded-[var(--radius-lg)]',
        className,
      )}
    >
      <Link
        href={href}
        className={clsx(
          'flex min-w-0',
          isHorizontal ? 'flex-col md:flex-row' : 'flex-col',
        )}
      >
        <div
          className={clsx(
            'relative shrink-0 overflow-hidden bg-muted/30',
            isHorizontal
              ? 'h-[180px] w-full md:min-h-[244px] md:w-[280px] md:self-stretch'
              : 'h-[230px] w-full',
          )}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              fill
              className="object-cover"
              sizes={
                isHorizontal
                  ? '(max-width: 768px) 100vw, 280px'
                  : '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 322px'
              }
            />
          ) : null}
        </div>

        <div
          className={clsx(
            'flex min-w-0 flex-1 flex-col gap-6 px-6 pt-4 pb-5',
            isHorizontal && 'md:justify-center',
          )}
        >
          <div className="flex flex-col gap-2 text-foreground">
            <h3 className="text-xl font-medium leading-7">{title}</h3>
            <p className="line-clamp-3 text-sm leading-5">{description}</p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Badge
              leftIcon={<CategoryIcon name={categoryIcon} className="size-4" />}
            >
              {categoryLabel}
            </Badge>

            <span
              className={clsx(
                'inline-flex h-6 items-center justify-center gap-1.5 rounded-[var(--radius-md)] px-1',
                'text-xs font-semibold leading-4 text-primary-strong',
              )}
              aria-label={`Сохранений: ${likes}`}
            >
              <BookmarkHeartIcon />
              {likes}
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
