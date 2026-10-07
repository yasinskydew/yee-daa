import type { Author } from '@/app/data/types'

const BLOG_SNIPPET =
  'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'

export const AUTHORS: Author[] = [
  {
    id: '1',
    name: 'Елена Высоцкая',
    handle: '@elenapovar',
    description: BLOG_SNIPPET,
    imageSrc: '/avatars/elena.jpg',
  },
  {
    id: '2',
    name: 'Alex Cook',
    handle: '@funtasticooking',
    description: BLOG_SNIPPET,
    imageSrc: '/avatars/alex.jpg',
  },
  {
    id: '3',
    name: 'Екатерина Константинопольская',
    handle: '@bake_and_pie',
    description: BLOG_SNIPPET,
    imageSrc: '/avatars/ekaterina.jpg',
  },
]
