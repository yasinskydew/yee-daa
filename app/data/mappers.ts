import type { Author, Category, Recipe } from '@/app/data/types'
import type { CategoryIconName } from '@/app/ui/icons'
import type { RecipeCardProps } from '@/app/ui/composites/recipe-card'
import type { RecipeActionCardProps } from '@/app/ui/composites/recipe-action-card'
import type { AuthorCardProps } from '@/app/ui/composites/author-card'
import { findCategoryInList } from '@/app/data/category-helpers'

function resolveCategory(
  recipe: Recipe,
  categories: Category[],
): Category | undefined {
  const slug = recipe.displayCategorySlug ?? recipe.categorySlug
  return findCategoryInList(categories, slug)
}

export function toRecipeCardProps(
  recipe: Recipe,
  categories: Category[] = [],
): Omit<RecipeCardProps, 'variant' | 'className'> {
  const category = resolveCategory(recipe, categories)

  return {
    title: recipe.title,
    description: recipe.description,
    href: `/recipes/${recipe.id}`,
    categoryLabel: category?.title ?? recipe.categorySlug,
    categoryIcon: (category?.icon ?? recipe.categorySlug) as CategoryIconName,
    likes: recipe.likes,
    recommends: recipe.recommends,
    imageSrc: recipe.imageSrc,
    imageAlt: recipe.imageAlt ?? recipe.title,
  }
}

export function toRecipeActionCardProps(
  recipe: Recipe,
  categories: Category[] = [],
): RecipeActionCardProps {
  const category = resolveCategory(recipe, categories)

  return {
    title: recipe.title,
    href: `/recipes/${recipe.id}`,
    categoryIcon: (category?.icon ?? recipe.categorySlug) as CategoryIconName,
  }
}

export function toAuthorCardProps(
  author: Author,
): Omit<AuthorCardProps, 'className'> {
  return {
    name: author.name,
    handle: author.handle,
    description: author.description,
    href: `/blogs/${author.id}`,
    imageSrc: author.imageSrc,
    imageAlt: author.imageAlt ?? author.name,
  }
}
