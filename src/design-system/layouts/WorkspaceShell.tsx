"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import type { IconType } from "@/types/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eyebrow, Heading, MutedText } from "@/design-system/primitives/Typography";
import { cn } from "@/lib/utils";

export type WorkspaceNavItem = {
  label: string;
  href: string;
  icon: IconType;
};

type WorkspaceShellProps = {
  activeHref: string;
  title: string;
  description?: string;
  label: string;
  homeHref: string;
  navItems: WorkspaceNavItem[];
  brandSuffix: string;
  sidebarTitle: string;
  sidebarDescription: string;
  searchPlaceholder: string;
  avatarLabel: string;
  children: React.ReactNode;
};

export function WorkspaceShell({
  activeHref,
  title,
  description,
  label,
  homeHref,
  navItems,
  brandSuffix,
  sidebarTitle,
  sidebarDescription,
  searchPlaceholder,
  avatarLabel,
  children,
}: WorkspaceShellProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-border bg-secondary/95 p-5 backdrop-blur-xl transition lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <Link href={homeHref} className="flex flex-col leading-none">
            <span className="text-2xl font-black uppercase tracking-[0.12em]">
              Hore<span className="text-primary">x</span>a
            </span>
            <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {brandSuffix}
            </span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <X aria-hidden />
          </Button>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-background/55 p-4">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-primary">{label}</p>
          <h2 className="mt-2 font-black">{sidebarTitle}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{sidebarDescription}</p>
        </div>

        <nav className="mt-8 flex flex-col gap-2" aria-label={`${label} navigation`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-bold text-muted-foreground transition hover:bg-primary/10 hover:text-primary",
                  activeHref === item.href && "bg-primary text-primary-foreground shadow-glow hover:bg-primary hover:text-primary-foreground",
                )}
              >
                <Icon aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {open ? <button className="fixed inset-0 z-40 bg-background/70 lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu" /> : null}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
          <div className="flex min-h-20 items-center gap-4 px-4 md:px-8">
            <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu aria-hidden />
            </Button>
            <div className="hidden max-w-lg flex-1 items-center gap-2 rounded-lg border border-border bg-input px-3 md:flex">
              <Search className="text-muted-foreground" aria-hidden />
              <Input className="border-0 bg-transparent focus-visible:ring-0" placeholder={searchPlaceholder} />
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-lg bg-primary text-sm font-black text-primary-foreground">
                {avatarLabel}
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-8 md:px-8">
          <div className="mb-8">
            <Eyebrow>{label}</Eyebrow>
            <Heading as="h1" className="mt-2">
              {title}
            </Heading>
            {description ? <MutedText className="mt-3 max-w-3xl">{description}</MutedText> : null}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
