import { redirect } from 'next/navigation'
import { categoryHref } from '@/app/data/category-helpers'
import { findCategoryByAnySlug } from '@/app/data/categories'

export default async function CategoryRedirectPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const found = await findCategoryByAnySlug(slug)

  if (!found) redirect('/home')
  redirect(categoryHref(found.category.slug, found.childSlug))
}
