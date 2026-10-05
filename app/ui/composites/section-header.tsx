import clsx from "clsx";
import Button from "@/app/ui/primitives/button";
import { ArrowRightIcon } from "@/app/ui/icons/arrow-right";

type SectionHeaderProps = {
  title: string;
  action?: {
    label: string;
    href: string;
  };
  className?: string;
};

export default function SectionHeader({ title, action, className }: SectionHeaderProps) {
  return (
    <header className={clsx('flex justify-between items-end gap-4', className)}>
      <h2 
        className={clsx(
          'text-foreground font-medium',
          'text-[32px] leading-8 md:text-[40px] xl:text-5xl xl:leading-none'
        )}
      >
          {title}
      </h2>
      {action ? <Button rightIcon={<ArrowRightIcon />} href={action.href}>{action.label}</Button> : null}
    </header>
  );
}
