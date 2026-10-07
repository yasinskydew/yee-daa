import clsx from 'clsx'
import SectionHeader from '@/app/ui/composites/section-header'
import RecipeCard from '@/app/ui/composites/recipe-card'
import Button from '@/app/ui/primitives/button'
import { ArrowRightIcon } from '@/app/ui/icons/arrow-right'
import { JUICY_RECIPES } from '@/app/data/home-mocks'

type JuiciestRecipesSectionProps = {
  className?: string
}

export default function JuiciestRecipesSection({
  className,
}: JuiciestRecipesSectionProps) {
  return (
    <section className={clsx('flex w-full min-w-0 flex-col gap-3 lg:gap-6', className)}>
      <SectionHeader
        title="Самое сочное"
        action={{
          label: 'Вся подборка',
          href: '/juicy',
          className: 'max-lg:hidden',
        }}
        className="w-full"
      />

      <ul
        className={clsx(
          'grid w-full gap-3',
          'grid-cols-1',
          'md:grid-cols-2 md:gap-4',
          'lg:grid-cols-1 lg:gap-6',
          'xl:grid-cols-2',
        )}
      >
        {JUICY_RECIPES.slice(0, 4).map((recipe) => (
          <li key={recipe.href} className="min-w-0">
            <RecipeCard {...recipe} variant="horizontal" />
          </li>
        ))}
      </ul>

      <Button
        href="/juicy"
        size="sm"
        rightIcon={<ArrowRightIcon className="size-4" />}
        className="mx-auto shrink-0 lg:hidden"
      >
        Вся подборка
      </Button>
    </section>
  )
}
