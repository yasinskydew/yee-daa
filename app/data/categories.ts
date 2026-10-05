import categoriesJson from '@/data/categories.json'
import type { Category } from '@/app/data/types'

const categories = categoriesJson as Category[]

export function categoryHref(slug: string) {
  return `/category/${slug}`
}

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

export function findActiveParentSlug(
  pathname: string,
  items: Category[] = categories,
): string | null {
  for (const category of items) {
    if (pathname === categoryHref(category.slug)) return category.slug
    if (
      category.children.some((child) => pathname === categoryHref(child.slug))
    ) {
      return category.slug
    }
  }
  return null
}

export function isCategoryActive(pathname: string, category: Category) {
  if (pathname === categoryHref(category.slug)) return true
  return category.children.some(
    (child) => pathname === categoryHref(child.slug),
  )
}
