import clsx from 'clsx'
import RecipeCard from '@/app/ui/composites/recipe-card'
import RecipeActionCard from '@/app/ui/composites/recipe-action-card'
import {
  VEGAN_FEATURED_RECIPES,
  VEGAN_QUICK_RECIPES,
} from '@/app/data/home-mocks'

const DESCRIPTION =
  'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.'

type VeganKitchenSectionProps = {
  className?: string
}

export default function VeganKitchenSection({
  className,
}: VeganKitchenSectionProps) {
  return (
    <section
      className={clsx(
        'flex w-full min-w-0 flex-col gap-6 border-t border-border pt-6',
        className,
      )}
    >
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
        <h2
          className={clsx(
            'shrink-0 font-medium text-foreground',
            'text-2xl leading-8',
            'lg:text-[36px] lg:leading-10',
            'xl:text-5xl xl:leading-none',
          )}
        >
          Веганская кухня
        </h2>
        <p className="text-base leading-6 font-medium text-foreground/64 xl:w-[668px] xl:shrink-0">
          {DESCRIPTION}
        </p>
      </header>

      <div
        className={clsx(
          'grid w-full min-w-0 grid-cols-1 gap-4',
          'md:h-[168px] md:grid-cols-3 md:gap-3',
          'lg:h-[180px] lg:gap-4',
          'xl:h-[192px] xl:grid-cols-[322px_322px_minmax(0,1fr)] xl:gap-6',
        )}
      >
        {VEGAN_FEATURED_RECIPES.map((recipe) => (
          <RecipeCard
            key={recipe.href}
            {...recipe}
            variant="text"
            className="min-w-0 md:h-full"
          />
        ))}

        <ul className="flex min-w-0 flex-col gap-1.5 md:h-full lg:gap-3">
          {VEGAN_QUICK_RECIPES.map((recipe) => (
            <li key={recipe.href} className="min-h-0 min-w-0 md:flex-1">
              <RecipeActionCard {...recipe} className="h-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
