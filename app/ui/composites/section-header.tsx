import clsx from 'clsx'
import { Button } from '@/app/ui/primitives/button'
import { ArrowRightIcon } from '@/app/ui/icons/arrow-right'

interface SectionAction {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'outlined'
  className?: string
}

interface SectionHeaderProps {
  title: string
  description?: string
  action?: SectionAction
  className?: string
}

/**
 * Section title row from home frames:
 * - 360/768: 24/32 medium
 * - 1440 (lg): 36/40 medium
 * - 1920 (xl): 48/48 medium
 * Action CTA matches Figma Button size=lg (h-12, text-lg/semibold).
 */
export function SectionHeader({
  title,
  description,
  action,
  className,
}: SectionHeaderProps) {
  const titleClassName = clsx(
    'font-medium text-foreground',
    'text-2xl leading-8',
    'lg:text-[36px] lg:leading-10',
    'xl:text-5xl xl:leading-none',
  )

  if (description) {
    return (
      <header
        className={clsx(
          'flex min-w-0 flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-6',
          className,
        )}
      >
        <h2 className={clsx('min-w-0 shrink-0', titleClassName)}>{title}</h2>
        <p className="min-w-0 text-sm leading-5 font-medium break-words text-foreground/64 lg:text-base lg:leading-6 xl:max-w-[668px] xl:shrink-0">
          {description}
        </p>
      </header>
    )
  }

  return (
    <header
      className={clsx(
        'flex items-end justify-between gap-6',
        className,
      )}
    >
      <h2 className={titleClassName}>{title}</h2>
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

interface SectionMobileActionProps extends SectionAction {
  size?: 'sm' | 'md'
}

export function SectionMobileAction({
  label,
  href,
  variant = 'primary',
  className,
  size = 'sm',
}: SectionMobileActionProps) {
  return (
    <Button
      href={href}
      variant={variant}
      size={size === 'sm' ? 'none' : size}
      rightIcon={<ArrowRightIcon className="size-4" />}
      className={clsx(
        'mx-auto shrink-0 lg:hidden',
        size === 'sm' &&
          'h-10 rounded-[var(--radius-md)] px-4 text-base font-semibold',
        className,
      )}
    >
      {label}
    </Button>
  )
}
