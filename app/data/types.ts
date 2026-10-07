import type { CategoryIconName } from '@/app/ui/icons'

/** Matches SubCategoryResponse from GET /api/v1/categories */
export interface CategoryChild {
  id: string
  slug: string
  title: string
  sort_order: number
}

/** Matches CategoryResponse; icon narrowed to known UI icons */
export interface Category {
  id: string
  slug: string
  title: string
  icon: CategoryIconName
  sort_order: number
  children: CategoryChild[]
}

export interface Recipe {
  id: string
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
  categorySlug: string
  subcategorySlug?: string
  /** Badge category when it differs from filter slug (e.g. vegan section cards) */
  displayCategorySlug?: string
  likes: number
  recommends?: number
  authorId?: string
  isNew: boolean
  isJuicy: boolean
  homeSection?: 'vegan-featured' | 'vegan-quick'
  /** ISO date — reserved for future sort */
  createdAt: string
}

export interface Author {
  id: string
  name: string
  handle: string
  description: string
  imageSrc?: string
  imageAlt?: string
}

export interface User {
  id: string
  name: string
  handle: string
  imageSrc?: string
  imageAlt?: string
  savedCount?: number
  subscribersCount?: number
  likesCount?: number
}
