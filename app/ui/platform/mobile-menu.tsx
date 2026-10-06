'use client'

import { Suspense, useEffect, useState } from 'react'
import clsx from 'clsx'
import type { Category } from '@/app/data/types'
import { BurgerIcon } from '@/app/ui/icons'
import Logo from '@/app/ui/primitives/logo'
import CategoryNav from '@/app/ui/platform/category-nav'
import FooterLeft from '@/app/ui/composites/footer-left'

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
            className="absolute inset-y-0 left-0 flex w-[min(100%,20rem)] flex-col overflow-hidden rounded-r-lg bg-background shadow-elevation-1"
          >
            <header className="flex h-20 shrink-0 items-center bg-header px-4">
              <Logo size="md" />
            </header>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <Suspense fallback={null}>
                <CategoryNav
                  categories={categories}
                  className="px-3 py-2"
                />
              </Suspense>
            </div>
            <FooterLeft className="px-6 pb-6" />
          </div>
        </div>
      )}
    </div>
  )
}
