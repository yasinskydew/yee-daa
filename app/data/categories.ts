import categoriesJson from '@/data/categories.json'
import type { Category } from '@/app/data/types'

const categories = categoriesJson as Category[]

export type CategoryFilter = {
  cat?: string | null
  sub?: string | null
}

export function categoryHref(cat: string, sub?: string) {
  const params = new URLSearchParams({ cat })
  if (sub) params.set('sub', sub)
  return `/home?${params.toString()}`
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

export function parseCategoryFilter(
  params: Pick<CategoryFilter, 'cat' | 'sub'>,
): CategoryFilter {
  return {
    cat: params.cat || null,
    sub: params.sub || null,
  }
}

export function findActiveParentSlug(
  filter: CategoryFilter,
  items: Category[] = categories,
): string | null {
  if (!filter.cat) return null
  return items.some((category) => category.slug === filter.cat)
    ? filter.cat
    : null
}

export function isCategoryActive(filter: CategoryFilter, category: Category) {
  return filter.cat === category.slug
}

export function isChildCategoryActive(
  filter: CategoryFilter,
  parentSlug: string,
  childSlug: string,
) {
  return filter.cat === parentSlug && filter.sub === childSlug
}
