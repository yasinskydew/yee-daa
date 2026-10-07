import clsx from 'clsx'
import SectionHeader from '@/app/ui/composites/section-header'
import RecipeCard from '@/app/ui/composites/recipe-card'
import RecipeCarousel from '@/app/ui/composites/recipe-carousel'
import { NEW_RECIPES } from '@/app/data/home-mocks'

type NewRecipesSectionProps = {
  className?: string
}

export default function NewRecipesSection({ className }: NewRecipesSectionProps) {
  return (
    <section className={clsx('flex w-full min-w-0 flex-col gap-6', className)}>
      <SectionHeader title="Новые рецепты" className="w-full" />

      <RecipeCarousel label="Новые рецепты">
        {NEW_RECIPES.map((recipe) => (
          <li
            key={recipe.href}
            data-carousel-item
            className="w-[min(100%,322px)] shrink-0 snap-start"
          >
            <RecipeCard {...recipe} variant="vertical" />
          </li>
        ))}
      </RecipeCarousel>
    </section>
  )
}
