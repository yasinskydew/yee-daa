import clsx from "clsx";
import Link from "next/link";
import Avatar from "./avatar";

type AuthorCardProps = {
  name: string;
  handle: string;
  description: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function AuthorCard({
  name,
  href,
  imageSrc,
  imageAlt,
  handle,
  description,
  className,
}: AuthorCardProps) {
  return (
    <article className={clsx(
      'w-full overflow-hidden border border-border bg-background',
      'rounded-[var(--radius-lg)]',
      className
      )}>
      <Link href={href} className="flex flex-col">
        <div className="flex items-center gap-3 px-6 pt-6 pb-4">
          <Avatar name={name} imageSrc={imageSrc} imageAlt={imageAlt} />
          <div className="min-w-0">
            <p className="text-lg font-medium leading-7 text-foreground">
              {name}
            </p>
            <p className="text-sm leading-5 text-muted">{handle}</p>
          </div>
        </div>
        <p className="line-clamp-3 px-6 pt-3 pb-5 text-sm leading-5 text-foreground">
          {description}
        </p>
      </Link>
    </article>
  );
}
