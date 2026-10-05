import AppNav from '@/app/ui/platform/app-nav'
import { ThemeToggle } from '@/app/ui/theme-toggle'

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <aside className="hidden md:flex md:flex-col">
        <AppNav orientation="vertical" />
        <ThemeToggle />
      </aside>

      <div>{children}</div>

      <div className="md:hidden">
        <AppNav orientation="horizontal" />
      </div>
    </>
  )
}
