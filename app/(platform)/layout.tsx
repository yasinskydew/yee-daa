import { Suspense } from 'react'
import AppNav from '@/app/ui/platform/app-nav'
import CategoryNav from '@/app/ui/platform/category-nav'
import Header from '@/app/ui/composites/header'
import UserNotifications from '@/app/ui/composites/notification/user-notification'
import { getCategories } from '@/app/data/categories'
import FooterLeft from '../ui/composites/footer-left'

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
    <div className="flex min-h-dvh flex-col">
      <Header notifications={USER_NOTIFICATIONS} categories={categories} />

      <div className="flex min-h-0 flex-1">
        <aside className="hidden h-full min-h-0 w-64 shrink-0 flex-col overflow-y-auto py-6 md:flex">
          <Suspense fallback={null}>
            <CategoryNav
              categories={categories}
              className="py-[10px] pl-[10px] pr-4"
            />
          </Suspense>
          <FooterLeft className='px-6'/>
        </aside>

        <main className="min-w-0 flex-1 overflow-x-visible px-4 pb-20 md:pb-0 md:pl-6 md:pr-[72px]">
          {children}
        </main>

        <aside className="hidden w-[208px] shrink-0 md:block">
          <UserNotifications
            {...USER_NOTIFICATIONS}
            orientation="vertical"
            className='md:py-4 md:pl-2'
          />
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 md:hidden">
        <AppNav orientation="horizontal" />
      </div>
    </div>
  )
}
