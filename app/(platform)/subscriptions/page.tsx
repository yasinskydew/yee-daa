import { Badge } from '@/app/ui/primitives/badge'
import { Button } from '@/app/ui/primitives/button'
import { CategoryIcon } from '@/app/ui/icons'
import { RecipeCard } from '@/app/ui/composites/recipe-card'
import clsx from 'clsx'

export default function SubscriptionsPage() {
  return (
    <div className={clsx('flex flex-col items-center gap-4')}>
      <h1>subscriptions</h1>
      <Button>Button </Button>
      <Button variant="secondary">Button</Button>
      <Button variant="ghost">Button</Button>
      <Button variant="ghost" size="sm">
        Button
      </Button>
      <Badge leftIcon={<CategoryIcon name="salads" />}>Салаты</Badge>
      <Badge variant="secondary" leftIcon={<CategoryIcon name="desserts" />}>
        Десерты и выпечка
      </Badge>

      <RecipeCard
        title="Кнели со спагетти"
        description="Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку."
        categoryLabel="Вторые блюда"
        categoryIcon="main-courses"
        href="/recipes/1"
        likes={1}
        imageSrc="/dishes/spagetti.png"
      />

      <RecipeCard
        variant="horizontal"
        title="Кнели со спагетти"
        description="Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку."
        categoryLabel="Вторые блюда"
        categoryIcon="main-courses"
        href="/recipes/1"
        likes={1}
        imageSrc="/dishes/spagetti.png"
      />
    </div>
  )
}
