import type { CategoryIconName } from '@/app/ui/icons'

export type CategoryChild = {
  slug: string
  title: string
}

export type Category = {
  slug: string
  title: string
  icon: CategoryIconName
  children: CategoryChild[]
}
