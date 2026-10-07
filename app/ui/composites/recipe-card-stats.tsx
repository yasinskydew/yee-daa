import clsx from 'clsx'
import { BookmarkHeartIcon } from '@/app/ui/icons/bookmark-heart'
import { EmojiHeartEyesIcon } from '@/app/ui/icons/emoji-heart-eyes'

interface RecipeCardStatsProps {
  likes: number
  recommends?: number
}

export function RecipeCardStats({ likes, recommends }: RecipeCardStatsProps) {
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
