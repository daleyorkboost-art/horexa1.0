"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LinkAction } from "@/types/components";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description: string;
  imageSrc?: string;
  primaryAction?: LinkAction;
  secondaryAction?: LinkAction;
  align?: "left" | "center";
  className?: string;
};

export function HeroSection({
  eyebrow,
  title,
  highlight,
  description,
  imageSrc,
  primaryAction = { label: "Request Inspection", href: "/contact" },
  secondaryAction,
  align = "left",
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative isolate min-h-[min(760px,calc(100vh-72px))] overflow-hidden border-b border-border/70 bg-background",
        className,
      )}
    >
      {imageSrc ? (
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${imageSrc})` }}
          aria-hidden
        />
      ) : null}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0d0d0d_0%,rgba(13,13,13,0.92)_34%,rgba(13,13,13,0.52)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent" />

      <div
        className={cn(
          "industrial-container flex min-h-[inherit] items-center py-20",
          align === "center" && "justify-center text-center",
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={cn("flex max-w-3xl flex-col gap-7", align === "center" && "items-center")}
        >
          {eyebrow ? (
            <span className="text-xs font-black uppercase tracking-[0.34em] text-primary">{eyebrow}</span>
          ) : null}
          <h1 className="text-balance text-hero font-black text-foreground">
            {title} {highlight ? <span className="text-primary">{highlight}</span> : null}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">{description}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={primaryAction.href}>
                {primaryAction.label}
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            {secondaryAction ? (
              <Button asChild variant="outline" size="lg">
                <Link href={secondaryAction.href}>
                  {secondaryAction.label}
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
