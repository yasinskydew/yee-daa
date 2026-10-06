import clsx from "clsx";
import Link from "next/link";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "outlined";
  size?: "sm" | "md" | "none";
  href?: string
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  const classes = clsx(
    'inline-flex items-center justify-center gap-2 font-semibold transition-opacity',
    size === 'sm' && 'h-10 px-4 text-sm rounded-[var(--radius-md)]',
    size === 'md' && 'h-12 px-6 text-lg rounded-[var(--radius-md)]',
    size === 'none' && 'p-0',
    variant === 'primary' && 'bg-primary text-primary-foreground',
    variant === 'secondary' && 'bg-foreground text-background',
    variant === 'ghost' && 'bg-transparent text-foreground border border-border',
    variant === 'outlined' && 'bg-transparent text-foreground',
    className,
  )

  if(href) {
    return (
      <Link href={href} className={classes} {...(props as object)}>
        {leftIcon}
        {children}
        {rightIcon}
      </Link>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      {...props as React.ButtonHTMLAttributes<HTMLButtonElement>}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
