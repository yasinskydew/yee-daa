import 'server-only'

import { apiFetch } from '@/app/lib/api/client'
import type { FileResponse } from '@/app/lib/api/file-types'
import type { HomeSection, Recipe } from '@/app/data/types'

/** Matches RecipeCategoryBrief */
export interface RecipeCategoryBriefDto {
  id: string
  slug: string
  title: string
}

/** Matches RecipeSubCategoryBrief */
export interface RecipeSubCategoryBriefDto {
  id: string
  slug: string
  title: string
}

/** Wire DTO matching FileResponse nested as cover_file */
export type FileResponseDto = FileResponse

/** Wire DTO matching RecipeResponse */
export interface RecipeResponseDto {
  id: string
  title: string
  description: string
  category: RecipeCategoryBriefDto
  subcategory: RecipeSubCategoryBriefDto | null
  cover_file: FileResponseDto | null
  likes: number
  recommends: number | null
  is_new: boolean
  is_juicy: boolean
  home_section: HomeSection | null
  display_category_slug: string | null
  created_at: string
  updated_at: string
}

/** Wire DTO matching RecipeCreate */
export interface RecipeCreateDto {
  title: string
  description?: string
  category_id: string
  subcategory_id?: string | null
  cover_file_id?: string | null
  likes?: number
  recommends?: number | null
  is_new?: boolean
  is_juicy?: boolean
  home_section?: HomeSection | null
  display_category_slug?: string | null
}

/** Wire DTO matching RecipeUpdate — only sent fields applied; null clears nullable FKs */
export interface RecipeUpdateDto {
  title?: string
  description?: string
  category_id?: string
  subcategory_id?: string | null
  cover_file_id?: string | null
  likes?: number
  recommends?: number | null
  is_new?: boolean
  is_juicy?: boolean
  home_section?: HomeSection | null
  display_category_slug?: string | null
}

export interface RecipeListParams {
  category_slug?: string
  subcategory_slug?: string
  is_new?: boolean
  is_juicy?: boolean
  home_section?: HomeSection
  limit?: number
  offset?: number
}

export function mapRecipeResponse(dto: RecipeResponseDto): Recipe {
  return {
    id: String(dto.id),
    title: dto.title,
    description: dto.description,
    imageSrc: dto.cover_file?.url,
    imageAlt: dto.title,
    categorySlug: dto.category.slug,
    subcategorySlug: dto.subcategory?.slug,
    displayCategorySlug: dto.display_category_slug ?? undefined,
    likes: dto.likes,
    recommends: dto.recommends ?? undefined,
    isNew: dto.is_new,
    isJuicy: dto.is_juicy,
    homeSection: dto.home_section ?? undefined,
    createdAt: dto.created_at,
  }
}

const RECIPE_TAGS = ['recipes']

export async function getRecipes(
  params: RecipeListParams = {},
): Promise<Recipe[]> {
  const limit = params.limit ?? 20

  const data = await apiFetch<RecipeResponseDto[]>('/recipes', {
    tags: RECIPE_TAGS,
    searchParams: {
      category_slug: params.category_slug,
      subcategory_slug: params.subcategory_slug,
      is_new: params.is_new,
      is_juicy: params.is_juicy,
      home_section: params.home_section,
      limit,
      offset: params.offset,
    },
  })

  if (!data) return []
  return data.map(mapRecipeResponse)
}

export async function getRecipeById(id: string): Promise<Recipe | undefined> {
  const data = await apiFetch<RecipeResponseDto>(
    `/recipes/${encodeURIComponent(id)}`,
    { tags: RECIPE_TAGS },
  )
  if (!data) return undefined
  return mapRecipeResponse(data)
}

export async function getRecipesByCategory(
  cat: string,
  sub?: string | null,
): Promise<Recipe[]> {
  return getRecipes({
    category_slug: cat,
    subcategory_slug: sub ?? undefined,
    limit: 100,
  })
}

export async function getNewRecipes(): Promise<Recipe[]> {
  return getRecipes({ is_new: true, limit: 20 })
}

export async function getJuicyRecipes(limit?: number): Promise<Recipe[]> {
  return getRecipes({ is_juicy: true, limit: limit ?? 100 })
}

export async function getVeganFeaturedRecipes(): Promise<Recipe[]> {
  return getRecipes({ home_section: 'vegan-featured', limit: 20 })
}

export async function getVeganQuickRecipes(): Promise<Recipe[]> {
  return getRecipes({ home_section: 'vegan-quick', limit: 20 })
}
