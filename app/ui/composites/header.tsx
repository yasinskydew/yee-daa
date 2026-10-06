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
    <header className="flex h-20 shrink-0 items-center justify-between bg-header px-2 md:px-4">
      <div className="flex min-w-0 items-center gap-4 md:gap-8">
        <Logo size="sm" className="md:hidden" />
        <Logo size="md" className="hidden md:block" />
        <BreadcrumbsNav className="hidden md:flex" />
      </div>

      <div className="flex items-center gap-4 md:gap-0">
        <UserNotifications
          {...notifications}
          orientation="horizontal"
          className="md:hidden"
        />
        <MobileMenu categories={categories} />
        <UserCard
          name="Екатерина Константинопольская"
          handle="@bake_and_pie"
          imageSrc="/avatar-mock.jpg"
          imageAlt="User"
          href="#"
          className="hidden md:block"
        />
      </div>
    </header>
  )
}
