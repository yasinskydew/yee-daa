import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  size?: "sm" | "md";
};

export default function Logo({ className, size = "md" }: LogoProps) {
  if (size === "sm") {
    return (
      <Link href="/home">
        <Image
          src="/icons/logo/logo-shirt.svg"
          alt="Logo"
          width={32}
          height={32}
          priority
          className={clsx("h-8 w-8", className)}
        />
      </Link>
    );
  }

  return (
    <Link href="/home">
      <Image
        src="/icons/logo/logo.svg"
        alt="Logo"
        width={136}
        height={32}
        priority
        className={clsx("h-8 w-auto", className)}
      />
    </Link>
  );
}
