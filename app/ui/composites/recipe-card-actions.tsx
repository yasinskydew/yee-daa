import clsx from 'clsx'
import { BookmarkHeartIcon } from '@/app/ui/icons/bookmark-heart'

interface RecipeCardActionsProps {
  layout: 'compact' | 'desktop'
  cookLabel?: string
  saveLabel?: string
  className?: string
}

export function RecipeCardActions({
  layout,
  cookLabel = 'Готовить',
  saveLabel = 'Сохранить',
  className,
}: RecipeCardActionsProps) {
  if (layout === 'compact') {
    return (
      <div className={clsx('flex items-center justify-end gap-3', className)}>
        <span
          className="inline-flex size-6 items-center justify-center rounded-[var(--radius-md)] border border-foreground/48"
          aria-hidden
        >
          <BookmarkHeartIcon />
        </span>
        <span className="inline-flex h-6 items-center justify-center rounded-[var(--radius-md)] bg-foreground px-2 text-xs font-semibold text-background">
          {cookLabel}
        </span>
      </div>
    )
  }

  return (
    <div className={clsx('flex items-center justify-end gap-2', className)}>
      <span
        className={clsx(
          'inline-flex h-8 items-center justify-center gap-2 rounded-[var(--radius-md)] px-3',
          'border border-foreground/48 text-sm font-semibold text-foreground/80',
        )}
      >
        <BookmarkHeartIcon className="size-3.5" />
        {saveLabel}
      </span>
      <span
        className={clsx(
          'inline-flex h-8 items-center justify-center rounded-[var(--radius-md)] px-3',
          'bg-foreground text-sm font-semibold text-background',
        )}
      >
        {cookLabel}
      </span>
    </div>
  )
}
