import clsx from 'clsx'
import { SectionHeader } from '@/app/ui/composites/section-header'
import { RecipeCard } from '@/app/ui/composites/recipe-card'
import { RecipeCarousel } from '@/app/ui/composites/recipe-carousel'
import { NEW_RECIPES } from '@/app/data/home-mocks'

interface NewRecipesSectionProps {
  className?: string
}

export function NewRecipesSection({ className }: NewRecipesSectionProps) {
  return (
    <section className={clsx('flex w-full min-w-0 flex-col gap-3 lg:gap-6', className)}>
      <SectionHeader title="Новые рецепты" className="w-full" />

      <RecipeCarousel label="Новые рецепты">
        {NEW_RECIPES.map((recipe) => (
          <li
            key={recipe.href}
            data-carousel-item
            className="w-[158px] shrink-0 snap-start lg:w-[277px] xl:w-[322px]"
          >
            <RecipeCard {...recipe} variant="vertical" />
          </li>
        ))}
      </RecipeCarousel>
    </section>
  )
}
