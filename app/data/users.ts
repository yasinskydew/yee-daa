import type { User } from '@/app/data/types'

export const USERS: User[] = [
  {
    id: 'current',
    name: 'Екатерина Константинопольская',
    handle: '@bake_and_pie',
    imageSrc: '/avatar-mock.jpg',
    imageAlt: 'User',
    savedCount: 185,
    subscribersCount: 589,
    likesCount: 587,
  },
]

export function getCurrentUser(): User {
  return USERS[0]
}
