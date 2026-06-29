import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { SiteFrame } from "@/components";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFoundPage() {
  return (
    <SiteFrame activeHref="/">
      <section className="relative isolate min-h-[calc(100vh-4.75rem)] overflow-hidden border-b border-border/70 bg-background py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,hsl(var(--primary)/0.14),transparent_28%)]" />
        <div className="industrial-container flex min-h-[560px] items-center justify-center">
          <Card className="max-w-2xl p-8 text-center md:p-12">
            <div className="mx-auto flex size-14 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
              <Home aria-hidden />
            </div>
            <p className="section-kicker mt-8">404</p>
            <h1 className="mt-4 text-balance text-h2 font-black">This page is not on the service route.</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
              The page may have moved, or the link may be incorrect. Return to Horexa&apos;s public website to continue exploring services, AMC plans, projects and inspection requests.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/">
                  Back Home
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Request Inspection</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </SiteFrame>
  );
}
