import clsx from 'clsx'
import Link from 'next/link'

type NavItemProps = {
  href: string
  label: string
  active?: boolean
  icon?: React.ReactNode
  className?: string
}

export default function NavItem({
  href,
  label,
  active = false,
  icon,
  className,
}: NavItemProps) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex items-center gap-3 px-6 h-12 text-foreground',
        'rounded-[var(--radius-md)] transition-colors',
        active && 'bg-primary-soft font-medium',
        className,
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
