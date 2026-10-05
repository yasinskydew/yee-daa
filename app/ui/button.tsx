import clsx from "clsx";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  size = "md",
  className,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-semibold transition-opacity",
        "disabled:opacity-50 disabled:pointer-events-none",
        size === "sm" && "h-10 px-4 text-sm rounded-[var(--radius-md)]",
        size === "md" && "h-12 px-6 text-lg rounded-[var(--radius-md)]",
        // variant — только токены
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "secondary" && "bg-foreground text-background",
        variant === "ghost" &&
          "bg-transparent text-foreground border border-border",
        className,
      )}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
