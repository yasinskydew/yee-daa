import type { Category } from '@/app/data/types'

export type CategoryFilter = {
  cat?: string | null
  sub?: string | null
}

export function categoryHref(cat: string, sub?: string) {
  const params = new URLSearchParams({ cat })
  if (sub) params.set('sub', sub)
  return `/home?${params.toString()}`
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
  items: Category[],
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

export function findCategoryInList(
  categories: Category[],
  slug: string,
): Category | undefined {
  return categories.find((category) => category.slug === slug)
}
