"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { mainNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type NavbarProps = {
  activeHref?: string;
  ctaHref?: string;
};

export function Navbar({ activeHref = "/", ctaHref = "/contact" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuId = "mobile-primary-navigation";

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-[#07080b]/95 backdrop-blur-xl">
      <div className="industrial-container flex h-[4.75rem] items-center justify-between gap-6 py-3">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Horexa Solutions home">
          <BrandLogo priority />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={activeHref === item.href ? "page" : undefined}
              className={cn(
                "relative py-2 text-xs font-black uppercase tracking-[0.14em] text-zinc-400 transition hover:text-foreground",
                activeHref === item.href && "text-primary",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-primary transition",
                  activeHref === item.href && "scale-x-100",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild>
            <Link href={ctaHref}>
              Request Inspection
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls={mobileMenuId}
        >
          {isOpen ? <X aria-hidden /> : <Menu aria-hidden />}
        </Button>
      </div>

      {isOpen ? (
        <div className="overflow-hidden border-t border-border bg-secondary/95 lg:hidden">
          <nav id={mobileMenuId} className="industrial-container flex flex-col gap-2 py-5" aria-label="Mobile navigation">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={activeHref === item.href ? "page" : undefined}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground",
                  activeHref === item.href && "bg-primary/10 text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link href={ctaHref}>
                Request Inspection
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
