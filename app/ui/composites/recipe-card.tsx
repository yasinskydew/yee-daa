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

function Stats({
  likes,
  recommends,
}: {
  likes: number
  recommends?: number
}) {
  return (
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
  )
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
  const isVertical = variant === 'vertical'

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
          'relative flex min-w-0',
          isHorizontal && 'flex-row lg:flex-row',
          isVertical && 'flex-col',
          isText && 'h-full flex-col',
        )}
      >
        {!isText ? (
          <div
            className={clsx(
              'relative shrink-0 overflow-hidden bg-muted/30',
              isHorizontal &&
                'h-[128px] w-[158px] lg:h-auto lg:min-h-[244px] lg:w-[346px] lg:self-stretch',
              isVertical && 'h-[128px] w-full lg:h-[230px]',
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
                    ? '(max-width: 1440px) 158px, 346px'
                    : '(max-width: 1440px) 158px, (max-width: 1920px) 277px, 322px'
                }
              />
            ) : null}

            {(isVertical || isHorizontal) && (
              <Badge
                leftIcon={
                  <CategoryIcon name={categoryIcon} className="size-4" />
                }
                className={clsx(
                  'absolute top-1.5 left-1.5 max-w-[calc(100%-12px)] gap-0.5 px-1',
                  'max-lg:inline-flex lg:!hidden',
                  isHorizontal ? 'bg-header' : 'bg-primary-soft',
                )}
              >
                {categoryLabel}
              </Badge>
            )}
          </div>
        ) : null}

        {isHorizontal ? (
          <>
            {/* Mobile / tablet compact row */}
            <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch px-2 pt-2 pb-1 lg:hidden">
              <Stats likes={likes} recommends={recommends} />
              <h3 className="h-12 line-clamp-2 text-base font-medium leading-6 text-foreground">
                {title}
              </h3>
              <div className="flex items-center justify-end gap-3">
                <span
                  className="inline-flex size-6 items-center justify-center rounded-[var(--radius-md)] border border-foreground/48"
                  aria-hidden
                >
                  <BookmarkHeartIcon />
                </span>
                <span className="inline-flex h-6 items-center justify-center rounded-[var(--radius-md)] bg-foreground px-2 text-xs font-semibold text-background">
                  Готовить
                </span>
              </div>
            </div>

            {/* Desktop horizontal (1440+/juicy card) */}
            <div className="hidden min-w-0 flex-1 flex-col gap-6 px-6 py-5 lg:flex">
              <div className="flex items-center justify-between gap-2">
                <Badge
                  leftIcon={
                    <CategoryIcon name={categoryIcon} className="size-4" />
                  }
                  className="bg-header"
                >
                  {categoryLabel}
                </Badge>
                <Stats likes={likes} recommends={recommends} />
              </div>

              <div className="flex flex-col gap-2 text-foreground">
                <h3 className="line-clamp-1 text-xl font-medium leading-7">
                  {title}
                </h3>
                <p className="line-clamp-3 max-h-[3.75rem] overflow-hidden text-sm leading-5 font-normal">
                  {description}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2">
                <span
                  className={clsx(
                    'inline-flex h-8 items-center justify-center gap-2 rounded-[var(--radius-md)] px-3',
                    'border border-foreground/48 text-sm font-semibold text-foreground/80',
                  )}
                >
                  <BookmarkHeartIcon className="size-3.5" />
                  Сохранить
                </span>
                <span
                  className={clsx(
                    'inline-flex h-8 items-center justify-center rounded-[var(--radius-md)] px-3',
                    'bg-foreground text-sm font-semibold text-background',
                  )}
                >
                  Готовить
                </span>
              </div>
            </div>
          </>
        ) : (
          <div
            className={clsx(
              'flex min-w-0 flex-1 flex-col',
              isText
                ? 'h-full justify-between gap-6 p-4 xl:px-6 xl:pt-6 xl:pb-5'
                : 'gap-2 px-2 pt-2 pb-1 lg:gap-6 lg:p-3 xl:px-6 xl:pt-4 xl:pb-5',
            )}
          >
            <div className="flex flex-col gap-2 text-foreground">
              <h3
                className={clsx(
                  'font-medium',
                  isText
                    ? 'line-clamp-1 text-xl leading-7'
                    : 'h-12 line-clamp-2 text-base leading-6 lg:h-auto lg:line-clamp-1 lg:text-lg lg:leading-7 xl:text-xl',
                )}
              >
                {title}
              </h3>
              <p
                className={clsx(
                  'line-clamp-3 max-h-[3.75rem] overflow-hidden text-sm leading-5 font-normal',
                  !isText && 'hidden lg:block',
                )}
              >
                {description}
              </p>
            </div>

            <div className="flex items-center justify-between gap-2">
              {isText ? (
                <Badge
                  leftIcon={
                    <CategoryIcon name={categoryIcon} className="size-4" />
                  }
                  className="bg-header"
                >
                  {categoryLabel}
                </Badge>
              ) : (
                <span className="max-lg:hidden">
                  <Badge
                    leftIcon={
                      <CategoryIcon name={categoryIcon} className="size-4" />
                    }
                  >
                    {categoryLabel}
                  </Badge>
                </span>
              )}
              <Stats likes={likes} recommends={recommends} />
            </div>
          </div>
        )}
      </Link>
    </article>
  )
}
