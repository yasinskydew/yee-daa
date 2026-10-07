import { Suspense } from 'react'
import { AppNav } from '@/app/ui/platform/app-nav'
import { CategoryNav } from '@/app/ui/platform/category-nav'
import { Header } from '@/app/ui/composites/header'
import { UserNotifications } from '@/app/ui/composites/notification/user-notification'
import { getCategories } from '@/app/data/categories'
import { FooterLeft } from '@/app/ui/composites/footer-left'
import { WriteRecipeCta } from '@/app/ui/composites/write-recipe-cta'

const USER_NOTIFICATIONS = {
  saved: 185,
  users: 589,
  likes: 587,
} as const

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = getCategories()

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Header notifications={USER_NOTIFICATIONS} categories={categories} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="hidden min-h-0 w-64 shrink-0 flex-col overflow-hidden border-r border-border py-6 lg:flex">
          <div className="min-h-0 flex-1 overflow-y-auto">
            <Suspense fallback={null}>
              <CategoryNav
                categories={categories}
                className="py-[10px] pl-[10px] pr-4"
              />
            </Suspense>
          </div>
          <FooterLeft className="px-6" />
        </aside>

        <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-4 pb-6 lg:pb-0 lg:pl-6 lg:pr-[72px]">
          {children}
        </main>

        <aside className="hidden w-[208px] shrink-0 flex-col items-center lg:flex">
          <UserNotifications
            {...USER_NOTIFICATIONS}
            orientation="vertical"
            className="lg:py-4 lg:pl-2"
          />
          <WriteRecipeCta className="mt-auto pb-10" />
        </aside>
      </div>

      <div className="bg-header lg:hidden">
        <AppNav orientation="horizontal" />
      </div>
    </div>
  )
}
