import clsx from 'clsx'
import { RecipeCard } from '@/app/ui/composites/recipe-card'
import { RecipeActionCard } from '@/app/ui/composites/recipe-action-card'
import { SectionHeader } from '@/app/ui/composites/section-header'
import type { RecipeCardProps } from '@/app/ui/composites/recipe-card'
import type { RecipeActionCardProps } from '@/app/ui/composites/recipe-action-card'

const DESCRIPTION =
  'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.'

interface VeganKitchenSectionProps {
  featured: Omit<RecipeCardProps, 'variant' | 'className'>[]
  quick: RecipeActionCardProps[]
  className?: string
}

export function VeganKitchenSection({
  featured,
  quick,
  className,
}: VeganKitchenSectionProps) {
  return (
    <section
      className={clsx(
        'flex w-full min-w-0 flex-col gap-4 overflow-hidden border-t border-border pt-2',
        'lg:gap-6 lg:pt-6',
        className,
      )}
    >
      <SectionHeader title="Веганская кухня" description={DESCRIPTION} />

      <div
        className={clsx(
          'grid w-full min-w-0 items-stretch gap-3',
          'grid-cols-1',
          'md:grid-cols-3',
          'lg:gap-4',
          'xl:gap-6',
        )}
      >
        {featured.map((recipe) => (
          <RecipeCard
            key={recipe.href}
            {...recipe}
            variant="text"
            className="min-w-0"
          />
        ))}

        <ul className="flex min-w-0 flex-col gap-3 md:gap-1.5 lg:gap-3">
          {quick.map((recipe) => (
            <li key={recipe.href} className="min-w-0">
              <RecipeActionCard {...recipe} className="min-w-0" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
