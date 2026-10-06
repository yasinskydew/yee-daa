import clsx from "clsx";
import Link from "next/link";
import Avatar from "@/app/ui/primitives/avatar";

type UserCardProps = {
  name: string;
  handle: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function UserCard({
  name,
  href,
  imageSrc,
  imageAlt,
  handle,
  className,
}: UserCardProps) {
  return (
    <article className={clsx(
      'w-auto overflow-hidden',
      'rounded-[var(--radius-lg)]',
      className
      )}>
      <Link href={href} className="flex flex-col">
        <div className="flex items-center gap-3">
          <Avatar name={name} imageSrc={imageSrc} imageAlt={imageAlt}/>
          <div className="min-w-0">
            <p className="text-lg font-medium leading-7 text-foreground">
              {name}
            </p>
            <p className="text-sm leading-5 text-muted">{handle}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}
