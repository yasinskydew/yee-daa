import clsx from 'clsx'
import Button from '@/app/ui/primitives/button'
import { ArrowRightIcon } from '@/app/ui/icons/arrow-right'

type SectionHeaderProps = {
  title: string
  action?: {
    label: string
    href: string
    variant?: 'primary' | 'secondary' | 'ghost' | 'outlined'
    className?: string
  }
  className?: string
}

/**
 * Section title row from home frames:
 * - 360/768: 24/32 medium
 * - 1440 (lg): 36/40 medium
 * - 1920 (xl): 48/48 medium
 * Action CTA matches Figma Button size=lg (h-12, text-lg/semibold).
 */
export default function SectionHeader({
  title,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={clsx(
        'flex items-end justify-between gap-6',
        className,
      )}
    >
      <h2
        className={clsx(
          'font-medium text-foreground',
          'text-2xl leading-8',
          'lg:text-[36px] lg:leading-10',
          'xl:text-5xl xl:leading-none',
        )}
      >
        {title}
      </h2>
      {action ? (
        <Button
          size="md"
          variant={action.variant ?? 'primary'}
          rightIcon={<ArrowRightIcon className="size-6" />}
          href={action.href}
          className={clsx('shrink-0', action.className)}
        >
          {action.label}
        </Button>
      ) : null}
    </header>
  )
}
