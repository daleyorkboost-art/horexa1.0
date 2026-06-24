import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";

type PageHeroProps = {
  activeLabel: string;
  eyebrow?: string;
  title: string;
  highlight?: string;
  description: string;
  imageSrc?: string;
  centered?: boolean;
};

export function PageHero({
  activeLabel,
  eyebrow,
  title,
  highlight,
  description,
  imageSrc,
  centered = false,
}: PageHeroProps) {
  return (
    <>
      <div className="border-b border-border/70 bg-secondary/35">
        <div className="industrial-container flex min-h-16 items-center gap-2 text-xs font-black uppercase tracking-[0.13em] text-muted-foreground">
          <Link href="/" className="transition hover:text-primary">
            Home
          </Link>
          <ChevronRight aria-hidden className="text-border" />
          <span className="text-primary">{activeLabel}</span>
        </div>
      </div>
      <HeroSection
        eyebrow={eyebrow}
        title={title}
        highlight={highlight}
        description={description}
        imageSrc={imageSrc}
        align={centered ? "center" : "left"}
        className="min-h-[520px]"
        primaryAction={{ label: "Request Inspection", href: "/contact" }}
        secondaryAction={{ label: "Explore Services", href: "/services" }}
      />
    </>
  );
}
