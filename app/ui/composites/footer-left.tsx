import Button from '@/app/ui/primitives/button'
import { LeftIcon } from '@/app/ui/icons/left-icon'
import clsx from 'clsx'

type FooterLeftProps = {
  className?: string
}

export default function FooterLeft({
  className
}: FooterLeftProps) {
  return (
    <footer className={clsx(
      "mt-auto flex flex-col items-start gap-4 px-2 pt-8",
      className,
    )}>
      <p className="text-sm leading-5 text-muted">Версия программы 03.25</p>
      <p className="text-sm leading-5 text-foreground">
        Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
      </p>
      <Button variant="outlined" size="none" leftIcon={<LeftIcon />}>
        Выйти
      </Button>
    </footer>
  )
}
