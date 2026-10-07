import { Search } from '@/app/ui/primitives/search'
import { NewRecipesSection } from '@/app/ui/composites/new-recipes-section'
import { JuiciestRecipesSection } from '@/app/ui/composites/juiciest-recipes-section'
import { CulinaryBlogsSection } from '@/app/ui/composites/culinary-blogs-section'
import { VeganKitchenSection } from '@/app/ui/composites/vegan-kitchen-section'
import {
  RecipeCard,
  type RecipeCardProps,
} from '@/app/ui/composites/recipe-card'
import type { RecipeActionCardProps } from '@/app/ui/composites/recipe-action-card'
import {
  getAuthors,
  getCategories,
  getCategoryBySlug,
  getJuicyRecipes,
  getNewRecipes,
  getRecipesByCategory,
  getVeganFeaturedRecipes,
  getVeganQuickRecipes,
} from '@/app/data/api'
import { parseCategoryFilter } from '@/app/data/category-helpers'
import type { Category } from '@/app/data/types'
import {
  toAuthorCardProps,
  toRecipeActionCardProps,
  toRecipeCardProps,
} from '@/app/data/mappers'

interface HomePageProps {
  searchParams: Promise<{ cat?: string; sub?: string }>
}

type CardProps = Omit<RecipeCardProps, 'variant' | 'className'>

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const filter = parseCategoryFilter(params)
  const hasCategoryFilter = Boolean(filter.cat)

  let title = 'Приятного аппетита!'
  let categories: Category[] = []
  let filteredRecipes: CardProps[] = []
  let newRecipes: CardProps[] = []
  let juicyRecipes: CardProps[] = []
  let veganFeatured: CardProps[] = []
  let veganQuick: RecipeActionCardProps[] = []

  if (hasCategoryFilter && filter.cat) {
    const [cats, category, filtered] = await Promise.all([
      getCategories(),
      getCategoryBySlug(filter.cat),
      getRecipesByCategory(filter.cat, filter.sub),
    ])
    categories = cats

    if (category) {
      if (filter.sub) {
        const child = category.children.find(
          (item) => item.slug === filter.sub,
        )
        title = child?.title ?? category.title
      } else {
        title = category.title
      }
    }

    filteredRecipes = filtered.map((recipe) =>
      toRecipeCardProps(recipe, categories),
    )
  } else {
    const [cats, newList, juicyList, veganFeaturedList, veganQuickList] =
      await Promise.all([
        getCategories(),
        getNewRecipes(),
        getJuicyRecipes(4),
        getVeganFeaturedRecipes(),
        getVeganQuickRecipes(),
      ])
    categories = cats
    newRecipes = newList.map((recipe) => toRecipeCardProps(recipe, categories))
    juicyRecipes = juicyList.map((recipe) =>
      toRecipeCardProps(recipe, categories),
    )
    veganFeatured = veganFeaturedList.map((recipe) =>
      toRecipeCardProps(recipe, categories),
    )
    veganQuick = veganQuickList.map((recipe) =>
      toRecipeActionCardProps(recipe, categories),
    )
  }

  const authors = getAuthors().map(toAuthorCardProps)

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-[1360px] flex-col items-stretch gap-8 pt-4 lg:pt-8">
      <div className="mx-auto flex w-full max-w-[898px] flex-col items-center gap-4 lg:gap-8">
        <h1 className="w-full text-center text-2xl leading-8 font-bold text-foreground md:whitespace-nowrap md:text-[40px] xl:text-5xl xl:leading-12">
          {title}
        </h1>
        <div id="search" className="w-full">
          <Search placeholder="Название или ингредиент..." />
        </div>
      </div>

      {hasCategoryFilter ? (
        <ul className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-2">
          {filteredRecipes.map((recipe) => (
            <li key={recipe.href} className="min-w-0">
              <RecipeCard {...recipe} variant="horizontal" />
            </li>
          ))}
        </ul>
      ) : (
        <>
          <NewRecipesSection recipes={newRecipes} />
          <JuiciestRecipesSection recipes={juicyRecipes} />
          <CulinaryBlogsSection authors={authors} />
          <VeganKitchenSection featured={veganFeatured} quick={veganQuick} />
        </>
      )}
    </div>
  )
}
