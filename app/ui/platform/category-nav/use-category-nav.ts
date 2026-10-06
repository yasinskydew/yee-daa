'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  categoryHref,
  findActiveParentSlug,
  type CategoryFilter,
} from '@/app/data/categories'
import type { Category } from '@/app/data/types'

export function useCategoryNav(categories: Category[]) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const filter: CategoryFilter = {
    cat: searchParams.get('cat'),
    sub: searchParams.get('sub'),
  }
  const [openSlug, setOpenSlug] = useState<string | null>(() =>
    findActiveParentSlug(filter, categories),
  )

  useEffect(() => {
    setOpenSlug(findActiveParentSlug(filter, categories))
  }, [filter.cat, filter.sub, categories])

  function toggle(category: Category) {
    if (openSlug === category.slug) {
      setOpenSlug(null)
      return
    }

    setOpenSlug(category.slug)
    router.push(categoryHref(category.slug))
  }

  return { openSlug, filter, toggle }
}
