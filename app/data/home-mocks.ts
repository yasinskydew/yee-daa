import type { RecipeCardProps } from '@/app/ui/composites/recipe-card'

export const NEW_RECIPES: Omit<RecipeCardProps, 'variant' | 'className'>[] = [
  {
    title: 'Солянка с грибами',
    description:
      'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    href: '/recipes/1',
    categoryLabel: 'Первые блюда',
    categoryIcon: 'first-courses',
    likes: 1,
    imageSrc: '/dishes/solyanka.png',
  },
  {
    title: 'Капустные котлеты',
    description:
      'Капустные котлеты по этому рецепту получаются необычайно пышными и невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных блюд.',
    href: '/recipes/2',
    categoryLabel: 'Веганские блюда',
    categoryIcon: 'vegan',
    likes: 2,
    imageSrc: '/dishes/cabbage-cutlets.png',
  },
  {
    title: 'Оладьи на кефире «Пышные»',
    description:
      'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
    href: '/recipes/3',
    categoryLabel: 'Десерты, выпечка',
    categoryIcon: 'desserts',
    likes: 1,
    imageSrc: '/dishes/oladi.png',
  },
  {
    title: 'Салат «Здоровье»',
    description:
      'Сельдерей очень полезен для здоровья, пора набираться витаминов. Не салат, а сплошное удовольствие:) Вкусный, необычный, а главное быстрый.',
    href: '/recipes/4',
    categoryLabel: 'Салаты',
    categoryIcon: 'salads',
    likes: 0,
    imageSrc: '/dishes/salad-health.png',
  },
  {
    title: 'Кнели со спагетти',
    description:
      'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    href: '/recipes/5',
    categoryLabel: 'Вторые блюда',
    categoryIcon: 'main-courses',
    likes: 4,
    imageSrc: '/dishes/spagetti.png',
  },
  {
    title: 'Томатный суп с базиликом',
    description:
      'Лёгкий суп на овощном бульоне: спелые томаты, свежий базилик и капля оливкового масла. Идеально на ужин.',
    href: '/recipes/6',
    categoryLabel: 'Первые блюда',
    categoryIcon: 'first-courses',
    likes: 3,
    imageSrc: '/dishes/solyanka.png',
  },
  {
    title: 'Греческий салат',
    description:
      'Классика средиземноморской кухни: огурцы, помидоры, фета, маслины и орегано. Быстро, сытно и очень свежо.',
    href: '/recipes/7',
    categoryLabel: 'Салаты',
    categoryIcon: 'salads',
    likes: 5,
    imageSrc: '/dishes/salad-health.png',
  },
  {
    title: 'Банановые панкейки',
    description:
      'Пышные панкейки на молоке с бананом — простой завтрак за 15 минут. Подавайте с ягодами или мёдом.',
    href: '/recipes/8',
    categoryLabel: 'Десерты, выпечка',
    categoryIcon: 'desserts',
    likes: 2,
    imageSrc: '/dishes/oladi.png',
  },
]

export const JUICY_RECIPES: Omit<RecipeCardProps, 'variant' | 'className'>[] = [
  {
    title: 'Кнели со спагетти',
    description:
      'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    href: '/recipes/9',
    categoryLabel: 'Вторые блюда',
    categoryIcon: 'main-courses',
    likes: 85,
    imageSrc: '/dishes/kneli.jpg',
  },
  {
    title: 'Пряная ветчина по итальянски',
    description:
      'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    href: '/recipes/10',
    categoryLabel: 'Вторые блюда',
    categoryIcon: 'main-courses',
    likes: 159,
    imageSrc: '/dishes/ham.jpg',
  },
  {
    title: 'Лапша с курицей и шафраном',
    description:
      'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    href: '/recipes/11',
    categoryLabel: 'Вторые блюда',
    categoryIcon: 'main-courses',
    likes: 258,
    imageSrc: '/dishes/noodles.jpg',
  },
  {
    title: 'Том-ям с капустой кимчи',
    description:
      'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    href: '/recipes/12',
    categoryLabel: 'Национальные',
    categoryIcon: 'national',
    likes: 124,
    imageSrc: '/dishes/tomyum.jpg',
  },
  {
    title: 'Кнели со спагетти',
    description:
      'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    href: '/recipes/13',
    categoryLabel: 'Вторые блюда',
    categoryIcon: 'main-courses',
    likes: 85,
    imageSrc: '/dishes/kneli.jpg',
  },
  {
    title: 'Пряная ветчина по итальянски',
    description:
      'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    href: '/recipes/14',
    categoryLabel: 'Вторые блюда',
    categoryIcon: 'main-courses',
    likes: 159,
    imageSrc: '/dishes/ham.jpg',
  },
  {
    title: 'Лапша с курицей и шафраном',
    description:
      'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    href: '/recipes/15',
    categoryLabel: 'Вторые блюда',
    categoryIcon: 'main-courses',
    likes: 258,
    imageSrc: '/dishes/noodles.jpg',
  },
  {
    title: 'Том-ям с капустой кимчи',
    description:
      'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    href: '/recipes/16',
    categoryLabel: 'Национальные',
    categoryIcon: 'national',
    likes: 124,
    imageSrc: '/dishes/tomyum.jpg',
  },
]
