import type { Author, Category } from '@/app/data/types'
import { AUTHORS } from '@/app/data/authors'
import {
  getCategories as loadCategories,
  getCategoryBySlug,
  findCategoryByAnySlug,
} from '@/app/data/categories'

export {
  getRecipes,
  getRecipeById,
  getRecipesByCategory,
  getNewRecipes,
  getJuicyRecipes,
  getVeganFeaturedRecipes,
  getVeganQuickRecipes,
  mapRecipeResponse,
} from '@/app/data/recipes'
export type {
  RecipeResponseDto,
  RecipeCreateDto,
  RecipeUpdateDto,
  RecipeListParams,
  FileResponseDto,
} from '@/app/data/recipes'

export async function getCategories(): Promise<Category[]> {
  return loadCategories()
}

export { getCategoryBySlug, findCategoryByAnySlug }

export function getAuthors(): Author[] {
  return AUTHORS
}
