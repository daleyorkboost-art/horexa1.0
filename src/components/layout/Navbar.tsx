"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { mainNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type NavbarProps = {
  activeHref?: string;
  ctaHref?: string;
};

export function Navbar({ activeHref = "/", ctaHref = "/contact" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="industrial-container flex h-[4.5rem] items-center justify-between gap-6 py-3">
        <Link href="/" className="group flex flex-col leading-none" aria-label="Horexa Solutions home">
          <span className="text-2xl font-black uppercase tracking-[0.12em] text-foreground">
            Hore<span className="text-primary">x</span>a
          </span>
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.34em] text-muted-foreground">Solutions</span>
          <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-muted-foreground">
            Clean Air. <span className="text-primary">Safe Kitchens.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative py-2 text-xs font-black uppercase tracking-[0.14em] text-muted-foreground transition hover:text-foreground",
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
        >
          {isOpen ? <X aria-hidden /> : <Menu aria-hidden />}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-secondary/95 lg:hidden"
          >
            <nav className="industrial-container flex flex-col gap-2 py-5" aria-label="Mobile navigation">
              {mainNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
