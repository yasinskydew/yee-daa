import clsx from 'clsx'
import type { IconProps } from '@/app/ui/icons/types'

/** Square + pencil from Figma CTA «Записать рецепт». */
export function PencilSquareIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('size-6 shrink-0', className)}
      aria-hidden
    >
      <path
        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.147 4.002l-2.148-2.148 1.353-1.354a.5.5 0 0 1 .707 0l1.443 1.44ZM13.439 4.71 6.854 11.294a.5.5 0 0 1-.233.131l-2.64.66a.25.25 0 0 1-.303-.304l.66-2.64a.5.5 0 0 1 .131-.232L11.854 2.325l2.148 2.148.437.237Z"
        fill="currentColor"
      />
      <path
        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11Z"
        fill="currentColor"
      />
    </svg>
  )
}
