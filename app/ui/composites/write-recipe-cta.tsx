import Link from 'next/link'
import clsx from 'clsx'
import { PencilSquareIcon } from '@/app/ui/icons'

type WriteRecipeCtaProps = {
  href?: string
  className?: string
}

export default function WriteRecipeCta({
  href = '/recipes/new',
  className,
}: WriteRecipeCtaProps) {
  return (
    <Link
      href={href}
      className={clsx(
        'flex w-full flex-col items-center gap-3 no-underline',
        className,
      )}
    >
      <span className="relative flex size-28 items-center justify-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] opacity-50"
        />
        <span className="relative flex size-16 items-center justify-center rounded-full bg-primary-foreground">
          <PencilSquareIcon className="size-6 text-header" />
        </span>
      </span>
      <span className="text-center text-sm leading-5 text-muted">
        Записать рецепт
      </span>
    </Link>
  )
}
