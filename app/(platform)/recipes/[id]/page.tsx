import { getCategories, getRecipeById } from '@/app/data/api'

interface RecipePageProps {
  params: Promise<{ id: string }>
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params
  const [recipe] = await Promise.all([
    getRecipeById(id),
    getCategories(),
  ])

  return (
    <main className="pt-4 lg:pt-8">
      <h1 className="text-2xl font-bold text-foreground lg:text-[36px]">
        {recipe ? recipe.title : `Рецепт ${id}`}
      </h1>
      {recipe ? (
        <p className="mt-4 max-w-2xl text-base leading-6 text-foreground/64">
          {recipe.description}
        </p>
      ) : (
        <p className="mt-4 text-foreground/64">Рецепт не найден (notFound — step 9).</p>
      )}
    </main>
  )
}
