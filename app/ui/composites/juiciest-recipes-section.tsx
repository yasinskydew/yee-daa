import clsx from 'clsx'
import SectionHeader from '@/app/ui/composites/section-header'
import RecipeCard from '@/app/ui/composites/recipe-card'
import { JUICY_RECIPES } from '@/app/data/home-mocks'

type JuiciestRecipesSectionProps = {
  className?: string
}

export default function JuiciestRecipesSection({
  className,
}: JuiciestRecipesSectionProps) {
  return (
    <section className={clsx('flex w-full min-w-0 flex-col gap-6', className)}>
      <SectionHeader
        title="Самое сочное"
        action={{ label: 'Вся подборка', href: '/juicy' }}
        className="w-full"
      />

      <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {JUICY_RECIPES.map((recipe) => (
          <li key={recipe.href} className="min-w-0">
            <RecipeCard {...recipe} variant="horizontal" />
          </li>
        ))}
      </ul>
    </section>
  )
}
