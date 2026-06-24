import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LinkAction } from "@/types/components";

type CTASectionProps = {
  title?: string;
  description?: string;
  primaryAction?: LinkAction;
  secondaryAction?: LinkAction;
};

export function CTASection({
  title = "Schedule Your Free Inspection Today",
  description = "Get a compliance-ready hygiene plan for your commercial kitchen with fast response and detailed reporting.",
  primaryAction = { label: "Request Inspection", href: "/contact" },
  secondaryAction = { label: "WhatsApp Support", href: "https://wa.me/919876543210" },
}: CTASectionProps) {
  return (
    <section className="bg-orange-sheen py-14 text-primary-foreground">
      <div className="industrial-container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-h2 font-black">{title}</h2>
          <p className="mt-4 text-base leading-7 text-white/85">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="secondary" size="lg" className="bg-background text-foreground hover:text-primary">
            <Link href={primaryAction.href}>
              {primaryAction.label}
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/35 text-white hover:bg-white/10 hover:text-white">
            <Link href={secondaryAction.href}>
              <MessageCircle data-icon="inline-start" />
              {secondaryAction.label}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
