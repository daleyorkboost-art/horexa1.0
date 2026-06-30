import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/images/brand/horexa-logo.jpeg"
      alt="Horexa Solutions"
      width={240}
      height={60}
      priority={priority}
      className={cn("h-auto w-40 object-contain sm:w-44", className)}
      sizes="(min-width: 640px) 176px, 160px"
    />
  );
}
