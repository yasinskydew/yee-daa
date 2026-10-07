import clsx from 'clsx'
import { RecipeCard } from '@/app/ui/composites/recipe-card'
import { RecipeActionCard } from '@/app/ui/composites/recipe-action-card'
import { SectionHeader } from '@/app/ui/composites/section-header'
import {
  VEGAN_FEATURED_RECIPES,
  VEGAN_QUICK_RECIPES,
} from '@/app/data/home-mocks'

const DESCRIPTION =
  'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.'

interface VeganKitchenSectionProps {
  className?: string
}

export function VeganKitchenSection({
  className,
}: VeganKitchenSectionProps) {
  return (
    <section
      className={clsx(
        'flex w-full min-w-0 flex-col gap-6 overflow-hidden border-t border-border pt-6',
        className,
      )}
    >
      <SectionHeader title="Веганская кухня" description={DESCRIPTION} />

      <div
        className={clsx(
          'grid w-full min-w-0 items-stretch gap-4',
          'grid-cols-1',
          'md:grid-cols-3 md:gap-3',
          'lg:gap-4',
          'xl:gap-6',
        )}
      >
        {VEGAN_FEATURED_RECIPES.map((recipe) => (
          <RecipeCard
            key={recipe.href}
            {...recipe}
            variant="text"
            className="min-w-0"
          />
        ))}

        <ul className="flex min-w-0 flex-col gap-3 md:gap-1.5 lg:gap-3">
          {VEGAN_QUICK_RECIPES.map((recipe) => (
            <li key={recipe.href} className="min-w-0">
              <RecipeActionCard {...recipe} className="min-w-0" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
