import categoriesJson from '@/data/categories.json'
import type { Category } from '@/app/data/types'

const categories = categoriesJson as Category[]

export function getCategories(): Category[] {
  return categories
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

export function findCategoryByAnySlug(slug: string): {
  category: Category
  childSlug?: string
} | undefined {
  const parent = getCategoryBySlug(slug)
  if (parent) return { category: parent }

  for (const category of categories) {
    const child = category.children.find((item) => item.slug === slug)
    if (child) return { category, childSlug: child.slug }
  }

  return undefined
}
