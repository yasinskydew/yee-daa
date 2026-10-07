import { RecipeCard } from '@/app/ui/composites/recipe-card'
import { getCategories, getJuicyRecipes } from '@/app/data/api'
import { toRecipeCardProps } from '@/app/data/mappers'

export default async function JuicyPage() {
  const [categories, recipesList] = await Promise.all([
    getCategories(),
    getJuicyRecipes(),
  ])
  const recipes = recipesList.map((recipe) =>
    toRecipeCardProps(recipe, categories),
  )

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-[1360px] flex-col gap-6 pt-4 lg:gap-8 lg:pt-8">
      <h1 className="text-2xl leading-8 font-bold text-foreground lg:text-[36px] lg:leading-10 xl:text-5xl">
        Самое сочное
      </h1>

      <ul className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-1 lg:gap-6 xl:grid-cols-2">
        {recipes.map((recipe) => (
          <li key={recipe.href} className="min-w-0">
            <RecipeCard {...recipe} variant="horizontal" />
          </li>
        ))}
      </ul>
    </div>
  )
}
