import clsx from 'clsx'
import Link from 'next/link'
import { Button } from '@/app/ui/primitives/button'
import { CategoryIcon, type CategoryIconName } from '@/app/ui/icons'
import { RecipeCardShell } from '@/app/ui/composites/recipe-card-media'

export interface RecipeActionCardProps {
  title: string
  href: string
  categoryIcon: CategoryIconName
  actionLabel?: string
  className?: string
}

export function RecipeActionCard({
  title,
  href,
  categoryIcon,
  actionLabel = 'Готовить',
  className,
}: RecipeActionCardProps) {
  return (
    <RecipeCardShell className={className}>
      <div
        className={clsx(
          'flex h-full min-w-0 items-center',
          'gap-2 p-3',
          'lg:px-3 lg:py-4',
          'xl:gap-3 xl:p-6',
        )}
      >
        <CategoryIcon name={categoryIcon} className="size-6 shrink-0" />
        <Link href={href} className="min-w-0 flex-1">
          <h3
            className={clsx(
              'truncate font-medium text-foreground',
              'text-base leading-6',
              'xl:text-xl xl:leading-7',
            )}
          >
            {title}
          </h3>
        </Link>
        <Button
          href={href}
          variant="outlined"
          size="none"
          className={clsx(
            'h-8 shrink-0 border border-primary-strong text-primary-strong',
            'px-2 text-xs',
            'xl:px-3 xl:text-sm',
            'rounded-[var(--radius-md)]',
          )}
        >
          {actionLabel}
        </Button>
      </div>
    </RecipeCardShell>
  )
}
