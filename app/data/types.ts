import type { CategoryIconName } from '@/app/ui/icons'

export interface CategoryChild {
  slug: string
  title: string
}

export interface Category {
  slug: string
  title: string
  icon: CategoryIconName
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
