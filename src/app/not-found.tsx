import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { SiteFrame } from "@/components";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFoundPage() {
  return (
    <SiteFrame activeHref="">
      <section className="relative isolate min-h-[calc(100vh-4.75rem)] overflow-hidden border-b border-border/70 bg-background py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,hsl(var(--primary)/0.14),transparent_28%)]" />
        <div className="industrial-container flex min-h-[560px] items-center justify-center">
          <Card className="max-w-2xl p-8 text-center md:p-12">
            <div className="mx-auto flex size-14 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
              <Compass aria-hidden />
            </div>
            <p className="section-kicker mt-8">404</p>
            <h1 className="mt-4 text-balance text-h2 font-black">We could not find that page.</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
              The link may be outdated, or the content may no longer be published. Continue with Horexa&apos;s public website or browse the latest service and blog pages.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/">
                  Return Home
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/services">Browse Services</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/blog">Browse Blog</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </SiteFrame>
  );
}
