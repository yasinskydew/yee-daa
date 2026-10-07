import clsx from "clsx";
import Image from "next/image";

interface AvatarProps {
  name: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export function Avatar({
  name,
  imageSrc,
  imageAlt,
  className,
}: AvatarProps) {
  const getInitials = (name: string) => {
    const [a = '', b = ''] = name.trim().split(/\s+/)
    return `${a[0] ?? ''}${b[0] ?? ''}`.toUpperCase()
  };
  return (
    <div className={clsx('relative size-12 shrink-0 overflow-hidden rounded-full bg-muted', className)}>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt || name}
          className="size-full object-cover"
          width={48}
          height={48}
        />
      ) : (
        <span className="flex size-full items-center justify-center text-sm font-medium text-background">
          {getInitials(name)}
        </span>
      )}
    </div>
  );
}
