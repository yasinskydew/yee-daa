'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  categoryHref,
  findActiveParentSlug,
} from '@/app/data/categories'
import type { Category } from '@/app/data/types'

export function useCategoryNav(categories: Category[]) {
  const pathname = usePathname()
  const router = useRouter()
  const [openSlug, setOpenSlug] = useState<string | null>(() =>
    findActiveParentSlug(pathname, categories),
  )

  useEffect(() => {
    setOpenSlug(findActiveParentSlug(pathname, categories))
  }, [pathname, categories])

  function toggle(category: Category) {
    if (openSlug === category.slug) {
      setOpenSlug(null)
      return
    }

    setOpenSlug(category.slug)
    router.push(categoryHref(category.slug))
  }

  return { openSlug, pathname, toggle }
}
