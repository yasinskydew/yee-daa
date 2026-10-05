import clsx from 'clsx'

type IconProps = {
  className?: string
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('size-4 shrink-0', className)}
      aria-hidden
    >
      <path
        d="M4.147 5.646a.5.5 0 0 1 .708 0L8 8.793l3.146-3.147a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 0 1 0-.708Z"
        fill="currentColor"
      />
    </svg>
  )
}
