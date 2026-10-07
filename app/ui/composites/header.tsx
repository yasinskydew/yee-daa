import { Suspense } from 'react'
import Logo from '@/app/ui/primitives/logo'
import UserCard from '@/app/ui/composites/user-card'
import BreadcrumbsNav from '@/app/ui/platform/breadcrumbs-nav'
import MobileMenu from '@/app/ui/platform/mobile-menu'
import UserNotifications, {
  type UserNotificationsProps,
} from './notification/user-notification'
import type { Category } from '@/app/data/types'

type HeaderProps = {
  notifications: Omit<UserNotificationsProps, 'orientation' | 'className'>
  categories: Category[]
}

export default function Header({ notifications, categories }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between bg-header px-2 py-2 sm:px-4 lg:h-20">
      <div className="flex min-w-0 flex-1 items-center">
        <div className="flex shrink-0 items-center lg:w-64">
          <Logo size="sm" className="md:hidden" />
          <Logo size="md" className="hidden md:block" />
        </div>
        <Suspense fallback={null}>
          <BreadcrumbsNav className="hidden min-w-0 flex-1 lg:flex lg:px-[7px]" />
        </Suspense>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 lg:gap-0">
        <UserNotifications
          {...notifications}
          orientation="horizontal"
          className="lg:hidden"
        />
        <MobileMenu categories={categories} />
        <UserCard
          name="Екатерина Константинопольская"
          handle="@bake_and_pie"
          imageSrc="/avatar-mock.jpg"
          imageAlt="User"
          href="#"
          className="hidden lg:block lg:pr-16"
        />
      </div>
    </header>
  )
}
