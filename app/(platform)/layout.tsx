import AppNav from '@/app/ui/platform/app-nav'
import BreadcrumbsNav from '@/app/ui/platform/breadcrumbs-nav'
import CategoryNav from '@/app/ui/platform/category-nav'
import Logo from '@/app/ui/primitives/logo'
import UserCard from '@/app/ui/composites/user-card'
import { getCategories } from '@/app/data/categories'

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = getCategories()

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex h-20 shrink-0 items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo size="sm" className="md:hidden" />
          <Logo size="md" className="hidden md:block" />
          <BreadcrumbsNav className="hidden md:flex" />
        </div>
        <UserCard
          name="Екатерина Константинопольская"
          handle="@bake_and_pie"
          imageSrc="/avatar-mock.jpg"
          imageAlt="User"
          href="#"
          className="hidden md:block"
        />
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-64 shrink-0 flex-col overflow-y-auto md:flex">
          <CategoryNav categories={categories} />
        </aside>

        <main className="min-w-0 flex-1 pb-20 md:pb-0">{children}</main>
      </div>

      <div className="fixed inset-x-0 bottom-0 md:hidden">
        <AppNav orientation="horizontal" />
      </div>
    </div>
  )
}
