import clsx from 'clsx'
import Link from 'next/link'

export type BreadcrumbItem = {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null

  return (
    <nav
      aria-label="Хлебные крошки"
      className={clsx('min-w-0 text-base leading-none text-foreground', className)}
    >
      <ol className="flex min-w-0 items-center gap-2 overflow-hidden whitespace-nowrap">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li
              key={`${item.label}-${i}`}
              className="flex min-w-0 items-center gap-2"
            >
              {i > 0 && (
                <span aria-hidden className="shrink-0 text-muted">
                  ›
                </span>
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="shrink-0 no-underline hover:text-muted"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="truncate"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
