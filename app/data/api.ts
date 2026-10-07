import type { Author, Category, Recipe } from '@/app/data/types'
import { AUTHORS } from '@/app/data/authors'
import { RECIPES } from '@/app/data/recipes'
import {
  getCategories as loadCategories,
  getCategoryBySlug,
} from '@/app/data/categories'

export function getRecipes(): Recipe[] {
  return RECIPES
}

export function getRecipeById(id: string): Recipe | undefined {
  return RECIPES.find((recipe) => recipe.id === id)
}

export function getCategories(): Category[] {
  return loadCategories()
}

export { getCategoryBySlug }

export function getAuthors(): Author[] {
  return AUTHORS
}

export function getRecipesByCategory(
  cat: string,
  sub?: string | null,
): Recipe[] {
  return RECIPES.filter((recipe) => {
    if (recipe.categorySlug !== cat) return false
    if (sub) return recipe.subcategorySlug === sub
    return true
  })
}

export function getNewRecipes(): Recipe[] {
  return RECIPES.filter((recipe) => recipe.isNew)
}

export function getJuicyRecipes(limit?: number): Recipe[] {
  const list = RECIPES.filter((recipe) => recipe.isJuicy)
  return limit == null ? list : list.slice(0, limit)
}

export function getVeganFeaturedRecipes(): Recipe[] {
  return RECIPES.filter((recipe) => recipe.homeSection === 'vegan-featured')
}

export function getVeganQuickRecipes(): Recipe[] {
  return RECIPES.filter((recipe) => recipe.homeSection === 'vegan-quick')
}
