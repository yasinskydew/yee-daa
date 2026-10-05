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
        'inline-flex items-center justify-center gap-2 transition-opacity',
        'py-0.5 px-2 text-sm rounded-[var(--radius-sm)]',
        variant === 'primary'   && 'bg-primary-soft text-primary-foreground',
        variant === 'secondary' && 'bg-primary text-primary-foreground',
        className,
      )}
      {...props}
    >
      {leftIcon}
      {children}
    </span>
  )
}