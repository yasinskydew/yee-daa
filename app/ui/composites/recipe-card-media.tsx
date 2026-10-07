import clsx from 'clsx'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { Badge } from '@/app/ui/primitives/badge'
import { CategoryIcon, type CategoryIconName } from '@/app/ui/icons'

interface RecipeCardMediaProps {
  variant: 'vertical' | 'horizontal'
  title: string
  categoryLabel: string
  categoryIcon: CategoryIconName
  imageSrc?: string
  imageAlt?: string
}

export function RecipeCardMedia({
  variant,
  title,
  categoryLabel,
  categoryIcon,
  imageSrc,
  imageAlt,
}: RecipeCardMediaProps) {
  const isHorizontal = variant === 'horizontal'

  return (
    <div
      className={clsx(
        'relative shrink-0 overflow-hidden bg-muted/30',
        isHorizontal &&
          'h-[128px] w-[158px] lg:h-auto lg:min-h-[244px] lg:w-[346px] lg:self-stretch',
        !isHorizontal && 'h-[128px] w-full lg:h-[230px]',
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

      <Badge
        leftIcon={<CategoryIcon name={categoryIcon} className="size-4" />}
        className={clsx(
          'absolute top-1.5 left-1.5 max-w-[calc(100%-12px)] gap-0.5 px-1',
          'max-lg:inline-flex lg:!hidden',
          isHorizontal ? 'bg-header' : 'bg-primary-soft',
        )}
      >
        {categoryLabel}
      </Badge>
    </div>
  )
}

export function RecipeCardShell({
  className,
  fullHeight,
  children,
}: {
  className?: string
  fullHeight?: boolean
  children: ReactNode
}) {
  return (
    <article
      className={clsx(
        'w-full overflow-hidden border border-border bg-background',
        'rounded-[var(--radius-lg)]',
        fullHeight && 'h-full',
        className,
      )}
    >
      {children}
    </article>
  )
}
