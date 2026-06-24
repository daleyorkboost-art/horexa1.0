"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, Menu, Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminNav } from "@/lib/admin-data";
import { cn } from "@/lib/utils";

type AdminShellProps = {
  activeHref: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function AdminShell({ activeHref, title, description, children }: AdminShellProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-border bg-secondary/95 p-5 backdrop-blur-xl transition lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-start justify-between">
          <Link href="/admin" className="flex flex-col leading-none">
            <span className="text-2xl font-black uppercase tracking-[0.12em]">
              Hore<span className="text-primary">x</span>a
            </span>
            <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Admin Control
            </span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close admin menu">
            <X aria-hidden />
          </Button>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-background/55 p-4">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-primary">Live Workspace</p>
          <h2 className="mt-2 font-black">Horexa CMS</h2>
          <p className="mt-1 text-xs text-muted-foreground">Public site, AMC portal, and operations data.</p>
        </div>

        <nav className="mt-8 flex flex-col gap-2" aria-label="Admin navigation">
          {adminNav.map((item) => {
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
            <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open admin menu">
              <Menu aria-hidden />
            </Button>
            <div className="hidden max-w-lg flex-1 items-center gap-2 rounded-lg border border-border bg-input px-3 md:flex">
              <Search className="text-muted-foreground" aria-hidden />
              <Input className="border-0 bg-transparent focus-visible:ring-0" placeholder="Search CMS records, leads, projects..." />
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Button className="hidden sm:inline-flex">
                <Plus data-icon="inline-start" />
                Quick Add
              </Button>
              <Button variant="outline" size="icon" aria-label="Notifications">
                <Bell aria-hidden />
              </Button>
              <div className="flex size-11 items-center justify-center rounded-lg bg-primary text-sm font-black text-primary-foreground">
                HX
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-8 md:px-8">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Admin Panel</p>
            <h1 className="mt-2 text-h2 font-black">{title}</h1>
            {description ? <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{description}</p> : null}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
