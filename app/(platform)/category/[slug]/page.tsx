import { redirect } from 'next/navigation'
import {
  categoryHref,
  findCategoryByAnySlug,
} from '@/app/data/categories'

export default async function CategoryRedirectPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const found = findCategoryByAnySlug(slug)

  if (!found) redirect('/home')
  redirect(categoryHref(found.category.slug, found.childSlug))
}
