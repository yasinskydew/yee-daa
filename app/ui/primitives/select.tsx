import clsx from 'clsx'
import { ArrowDownSLineIcon } from '@/app/ui/icons/arrow-down-s-line'

type SelectOption = {
  value: string
  label: string
}

type SelectProps = {
  options: readonly SelectOption[]
  placeholder?: string
  className?: string
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'>

export default function Select({
  options,
  placeholder = 'Выберите из списка...',
  className,
  defaultValue = '',
  'aria-label': ariaLabel = placeholder,
  ...props
}: SelectProps) {
  return (
    <div className={clsx('relative min-w-[200px] flex-1', className)}>
      <select
        defaultValue={defaultValue}
        aria-label={ariaLabel}
        className={clsx(
          'h-10 w-full appearance-none rounded-[var(--radius-md)] border border-foreground/8 bg-background',
          'py-2 pr-[43px] pl-[15px] text-base font-normal text-foreground/64',
        )}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute top-1/2 right-[11px] flex size-5 -translate-y-1/2 items-center justify-center overflow-hidden text-foreground">
        <ArrowDownSLineIcon />
      </span>
    </div>
  )
}
