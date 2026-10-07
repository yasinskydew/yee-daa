import clsx from 'clsx'
import SectionHeader from '@/app/ui/composites/section-header'
import AuthorCard from '@/app/ui/composites/author-card'
import Button from '@/app/ui/primitives/button'
import { ArrowRightIcon } from '@/app/ui/icons/arrow-right'
import { CULINARY_BLOGS } from '@/app/data/home-mocks'

type CulinaryBlogsSectionProps = {
  className?: string
}

export default function CulinaryBlogsSection({
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

      <Button
        href="/blogs"
        variant="outlined"
        size="sm"
        rightIcon={<ArrowRightIcon className="size-4" />}
        className="mx-auto shrink-0 lg:hidden"
      >
        Все авторы
      </Button>
    </section>
  )
}
