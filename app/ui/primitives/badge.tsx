import clsx from 'clsx';

type BadgeProps = {
  variant?: "primary" | "secondary";
  leftIcon?: React.ReactNode 
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

export default function Badge({
  variant = 'primary',
  className,
  leftIcon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex max-w-full items-center justify-center gap-2 transition-opacity',
        'truncate whitespace-nowrap py-0.5 px-2 text-sm rounded-[var(--radius-sm)]',
        variant === 'primary' && 'bg-primary-soft text-primary-foreground',
        variant === 'secondary' && 'bg-primary text-primary-foreground',
        className,
      )}
      {...props}
    >
      {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
      <span className="min-w-0 truncate">{children}</span>
    </span>
  )
}