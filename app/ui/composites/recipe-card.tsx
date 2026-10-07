import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import Badge from '@/app/ui/primitives/badge'
import { BookmarkHeartIcon } from '@/app/ui/icons/bookmark-heart'
import { EmojiHeartEyesIcon } from '@/app/ui/icons/emoji-heart-eyes'
import { CategoryIcon, type CategoryIconName } from '@/app/ui/icons'

export type RecipeCardProps = {
  variant?: 'vertical' | 'horizontal' | 'text'
  title: string
  description: string
  href: string
  categoryLabel: string
  categoryIcon: CategoryIconName
  likes?: number
  recommends?: number
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
  recommends,
  imageSrc,
  imageAlt,
  className,
}: RecipeCardProps) {
  const isHorizontal = variant === 'horizontal'
  const isText = variant === 'text'

  return (
    <article
      className={clsx(
        'w-full overflow-hidden border border-border bg-background',
        'rounded-[var(--radius-lg)]',
        isText && 'h-full',
        className,
      )}
    >
      <Link
        href={href}
        className={clsx(
          'flex min-w-0',
          isHorizontal ? 'flex-col md:flex-row' : 'flex-col',
          isText && 'h-full',
        )}
      >
        {!isText ? (
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
        ) : null}

        <div
          className={clsx(
            'flex min-w-0 flex-1 flex-col gap-6',
            isText
              ? 'h-full justify-between p-4 xl:px-6 xl:pt-6 xl:pb-5'
              : 'px-6 pt-4 pb-5',
            isHorizontal && 'md:justify-center',
          )}
        >
          <div className="flex flex-col gap-2 text-foreground">
            <h3 className="line-clamp-1 text-xl font-medium leading-7">
              {title}
            </h3>
            <p
              className={clsx(
                'line-clamp-3 text-sm leading-5 font-normal',
                isText && 'h-16',
              )}
            >
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Badge
              leftIcon={<CategoryIcon name={categoryIcon} className="size-4" />}
              className={isText ? 'bg-header' : undefined}
            >
              {categoryLabel}
            </Badge>

            <div className="flex items-center gap-2">
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
              {recommends != null ? (
                <span
                  className={clsx(
                    'inline-flex h-6 items-center justify-center gap-1.5 rounded-[var(--radius-md)] px-1',
                    'text-xs font-semibold leading-4 text-primary-strong',
                  )}
                  aria-label={`Рекомендаций: ${recommends}`}
                >
                  <EmojiHeartEyesIcon />
                  {recommends}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
