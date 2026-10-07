import clsx from 'clsx'
import {
  SectionHeader,
  SectionMobileAction,
} from '@/app/ui/composites/section-header'
import { AuthorCard } from '@/app/ui/composites/author-card'
import { CULINARY_BLOGS } from '@/app/data/home-mocks'

interface CulinaryBlogsSectionProps {
  className?: string
}

export function CulinaryBlogsSection({
  className,
}: CulinaryBlogsSectionProps) {
  return (
    <section
      className={clsx(
        'flex w-full min-w-0 flex-col gap-3 rounded-2xl bg-primary p-3 lg:gap-6 lg:p-6',
        className,
      )}
    >
      <SectionHeader
        title="Кулинарные блоги"
        action={{
          label: 'Все авторы',
          href: '/blogs',
          variant: 'outlined',
          className: 'max-lg:hidden',
        }}
        className="w-full"
      />

      <ul className="grid w-full grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        {CULINARY_BLOGS.map((blog) => (
          <li key={blog.href} className="min-w-0">
            <AuthorCard {...blog} className="h-full" />
          </li>
        ))}
      </ul>

      <SectionMobileAction
        label="Все авторы"
        href="/blogs"
        variant="outlined"
      />
    </section>
  )
}
