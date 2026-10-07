import clsx from 'clsx'
import Link from 'next/link'
import { Badge } from '@/app/ui/primitives/badge'
import { CategoryIcon, type CategoryIconName } from '@/app/ui/icons'
import { RecipeCardActions } from '@/app/ui/composites/recipe-card-actions'
import {
  RecipeCardMedia,
  RecipeCardShell,
} from '@/app/ui/composites/recipe-card-media'
import { RecipeCardStats } from '@/app/ui/composites/recipe-card-stats'

export interface RecipeCardProps {
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

export function RecipeCard({
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
    <RecipeCardShell className={className} fullHeight={isText}>
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
          <RecipeCardMedia
            variant={isHorizontal ? 'horizontal' : 'vertical'}
            title={title}
            categoryLabel={categoryLabel}
            categoryIcon={categoryIcon}
            imageSrc={imageSrc}
            imageAlt={imageAlt}
          />
        ) : null}

        {isHorizontal ? (
          <>
            <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch px-2 pt-2 pb-1 lg:hidden">
              <RecipeCardStats likes={likes} recommends={recommends} />
              <h3 className="h-12 line-clamp-2 text-base font-medium leading-6 text-foreground">
                {title}
              </h3>
              <RecipeCardActions layout="compact" />
            </div>

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
                <RecipeCardStats likes={likes} recommends={recommends} />
              </div>

              <div className="flex flex-col gap-2 text-foreground">
                <h3 className="line-clamp-1 text-xl font-medium leading-7">
                  {title}
                </h3>
                <p className="line-clamp-3 max-h-[3.75rem] overflow-hidden text-sm leading-5 font-normal">
                  {description}
                </p>
              </div>

              <RecipeCardActions layout="desktop" />
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
              <RecipeCardStats likes={likes} recommends={recommends} />
            </div>
          </div>
        )}
      </Link>
    </RecipeCardShell>
  )
}
