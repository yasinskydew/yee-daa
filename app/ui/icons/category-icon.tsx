import clsx from 'clsx'

export const CATEGORY_ICONS = {
  salads: '/icons/category/salads.svg',
  sauces: '/icons/category/sauces.svg',
  'first-courses': '/icons/category/first-courses.svg',
  national: '/icons/category/national.svg',
  drinks: '/icons/category/drinks.svg',
  appetizers: '/icons/category/appetizers.svg',
  preserves: '/icons/category/preserves.svg',
  kids: '/icons/category/kids.svg',
  desserts: '/icons/category/desserts.svg',
  'main-courses': '/icons/category/main-courses.svg',
  vegan: '/icons/category/vegan.svg',
  grill: '/icons/category/grill.svg',
  healthy: '/icons/category/healthy.svg',
} as const

export type CategoryIconName = keyof typeof CATEGORY_ICONS

type CategoryIconProps = {
  name: CategoryIconName
  /** auto = follows html.dark; dark = stronger contrast on dark surfaces */
  appearance?: 'auto' | 'light' | 'dark'
  className?: string
  title?: string
}

/**
 * Category icons are raster (PNG-in-SVG) from Figma — not currentColor.
 * Dark appearance uses CSS filter so they stay readable on dark UI
 * without a separate Figma export. Re-export real dark art later if needed.
 */
export function CategoryIcon({
  name,
  className,
  title,
}: CategoryIconProps) {
  return (
    <img
      src={CATEGORY_ICONS[name]}
      alt={title ?? ''}
      width={24}
      height={24}
      draggable={false}
      aria-hidden={title ? undefined : true}
      className={clsx(
        'size-4 shrink-0 object-contain',
        className,
      )}
    />
  )
}
