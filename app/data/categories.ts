import 'server-only'

import { apiFetch } from '@/app/lib/api/client'
import type { Category, CategoryChild } from '@/app/data/types'
import { CATEGORY_ICONS, type CategoryIconName } from '@/app/ui/icons'

export {
  categoryHref,
  parseCategoryFilter,
  findActiveParentSlug,
  isCategoryActive,
  isChildCategoryActive,
  findCategoryInList,
  type CategoryFilter,
} from '@/app/data/category-helpers'

/** Wire DTO matching SubCategoryResponse (UUID serialized as string) */
interface CategoryChildDto {
  id: string
  slug: string
  title: string
  sort_order: number
}

/** Wire DTO matching CategoryResponse */
interface CategoryDto {
  id: string
  slug: string
  title: string
  icon: string
  sort_order: number
  children: CategoryChildDto[]
}

function toCategoryIconName(icon: string): CategoryIconName {
  if (icon in CATEGORY_ICONS) {
    return icon as CategoryIconName
  }
  return 'salads'
}

function mapChild(dto: CategoryChildDto): CategoryChild {
  return {
    id: dto.id,
    slug: dto.slug,
    title: dto.title,
    sort_order: dto.sort_order,
  }
}

function mapCategory(dto: CategoryDto): Category {
  return {
    id: dto.id,
    slug: dto.slug,
    title: dto.title,
    icon: toCategoryIconName(dto.icon),
    sort_order: dto.sort_order,
    children: (dto.children ?? []).map(mapChild),
  }
}

export async function getCategories(): Promise<Category[]> {
  const data = await apiFetch<CategoryDto[]>('/categories', {
    tags: ['categories'],
  })
  if (!data) return []
  return data.map(mapCategory)
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | undefined> {
  // 404 → apiFetch returns null ({ detail: string } from NotFoundError)
  const data = await apiFetch<CategoryDto>(
    `/categories/${encodeURIComponent(slug)}`,
    { tags: ['categories'] },
  )
  if (!data) return undefined
  return mapCategory(data)
}

export async function findCategoryByAnySlug(slug: string): Promise<
  | {
      category: Category
      childSlug?: string
    }
  | undefined
> {
  const categories = await getCategories()
  const parent = categories.find((category) => category.slug === slug)
  if (parent) return { category: parent }

  for (const category of categories) {
    const child = category.children.find((item) => item.slug === slug)
    if (child) return { category, childSlug: child.slug }
  }

  return undefined
}
