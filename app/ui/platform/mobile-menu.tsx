'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import type { Category } from '@/app/data/types'
import { BurgerIcon } from '@/app/ui/icons'
import CategoryNav from '@/app/ui/platform/category-nav'

type MobileMenuProps = {
  categories: Category[]
  className?: string
}

export default function MobileMenu({ categories, className }: MobileMenuProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className={clsx('md:hidden', className)}>
      <button
        type="button"
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={open}
        aria-controls="mobile-category-menu"
        onClick={() => setOpen((value) => !value)}
        className="flex size-10 items-center justify-center text-foreground"
      >
        <BurgerIcon />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Закрыть меню"
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-category-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Категории"
            className="absolute inset-y-0 right-0 flex w-[min(100%,20rem)] flex-col overflow-y-auto bg-background shadow-elevation-1"
          >
            <div className="flex h-20 items-center justify-end px-4">
              <button
                type="button"
                aria-label="Закрыть меню"
                onClick={() => setOpen(false)}
                className="flex size-10 items-center justify-center text-foreground"
              >
                <BurgerIcon />
              </button>
            </div>
            <CategoryNav categories={categories} />
          </div>
        </div>
      )}
    </div>
  )
}
