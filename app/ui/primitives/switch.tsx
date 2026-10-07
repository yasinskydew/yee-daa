import clsx from 'clsx'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  className?: string
}

export function Switch({
  checked,
  onChange,
  label,
  className,
}: SwitchProps) {
  return (
    <label
      className={clsx(
        'flex shrink-0 cursor-pointer items-center gap-3 py-1.5 pl-2 text-base font-medium whitespace-nowrap text-foreground',
        className,
      )}
    >
      {label}
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span
        aria-hidden
        className={clsx(
          'relative h-5 w-[34px] shrink-0 rounded-full transition-colors',
          checked ? 'bg-primary' : 'bg-foreground/16',
        )}
      >
        <span
          className={clsx(
            'absolute top-0.5 left-0.5 size-4 rounded-full bg-background transition-transform',
            checked && 'translate-x-[14px]',
          )}
        />
      </span>
    </label>
  )
}
