import Logo from '@/app/ui/primitives/logo'
import UserCard from '@/app/ui/composites/user-card'
import BreadcrumbsNav from '@/app/ui/platform/breadcrumbs-nav'
import UserNotifications, {
  type UserNotificationsProps,
} from './notification/user-notification'

type HeaderProps = {
  notifications: UserNotificationsProps
}

export default function Header({ notifications }: HeaderProps) {
  return (
    <header className="flex h-20 shrink-0 items-center justify-between bg-header px-4 md:px-6">
      <div className="flex min-w-0 items-center gap-4 md:gap-8">
        <Logo size="sm" className="md:hidden" />
        <Logo size="md" className="hidden md:block" />
        <BreadcrumbsNav className="hidden md:flex" />
      </div>

      <div className="flex items-center gap-4">
        <UserNotifications
          {...notifications}
          className="flex-row md:hidden"
        />
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
