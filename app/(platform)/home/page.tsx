import { Search } from '@/app/ui/primitives/search'
import { NewRecipesSection } from '@/app/ui/composites/new-recipes-section'
import { JuiciestRecipesSection } from '@/app/ui/composites/juiciest-recipes-section'
import { CulinaryBlogsSection } from '@/app/ui/composites/culinary-blogs-section'
import { VeganKitchenSection } from '@/app/ui/composites/vegan-kitchen-section'
import { RecipeCard } from '@/app/ui/composites/recipe-card'
import {
  getAuthors,
  getCategoryBySlug,
  getJuicyRecipes,
  getNewRecipes,
  getRecipesByCategory,
  getVeganFeaturedRecipes,
  getVeganQuickRecipes,
} from '@/app/data/api'
import { parseCategoryFilter } from '@/app/data/categories'
import {
  toAuthorCardProps,
  toRecipeActionCardProps,
  toRecipeCardProps,
} from '@/app/data/mappers'

interface HomePageProps {
  searchParams: Promise<{ cat?: string; sub?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const filter = parseCategoryFilter(params)
  const hasCategoryFilter = Boolean(filter.cat)

  const title = hasCategoryFilter
    ? (() => {
        const category = filter.cat ? getCategoryBySlug(filter.cat) : undefined
        if (!category) return 'Приятного аппетита!'
        if (filter.sub) {
          const child = category.children.find((item) => item.slug === filter.sub)
          return child?.title ?? category.title
        }
        return category.title
      })()
    : 'Приятного аппетита!'

  const filteredRecipes = hasCategoryFilter && filter.cat
    ? getRecipesByCategory(filter.cat, filter.sub).map(toRecipeCardProps)
    : []

  const newRecipes = getNewRecipes().map(toRecipeCardProps)
  const juicyRecipes = getJuicyRecipes(4).map(toRecipeCardProps)
  const authors = getAuthors().map(toAuthorCardProps)
  const veganFeatured = getVeganFeaturedRecipes().map(toRecipeCardProps)
  const veganQuick = getVeganQuickRecipes().map(toRecipeActionCardProps)

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
        <ul
          className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-2"
        >
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
