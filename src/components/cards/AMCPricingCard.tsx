import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AMCPricingCardProps = {
  name: string;
  audience: string;
  frequency: string;
  description: string;
  features: string[];
  href: string;
  recommended?: boolean;
};

export function AMCPricingCard({
  name,
  audience,
  frequency,
  description,
  features,
  href,
  recommended = false,
}: AMCPricingCardProps) {
  return (
    <Card
      className={cn(
        "relative flex h-full flex-col p-7",
        recommended && "border-primary/80 shadow-glow-lg",
      )}
    >
      {recommended ? (
        <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
          Most Recommended
        </Badge>
      ) : null}
      <div className="flex flex-col gap-2">
        <ShieldCheck className="text-primary" aria-hidden />
        <h3 className="text-2xl font-black">{name}</h3>
        <p className="text-xs font-black uppercase tracking-[0.14em] text-muted-foreground">{audience}</p>
      </div>
      <div className="my-7 h-px bg-border" />
      <p className="text-h3 font-black text-primary">{frequency}</p>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p>
      <ul className="mt-7 flex flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm text-muted-foreground">
            <Check className="mt-0.5 shrink-0 text-primary" aria-hidden />
            {feature}
          </li>
        ))}
      </ul>
      <Button asChild className="mt-8">
        <Link href={href}>Choose Plan</Link>
      </Button>
    </Card>
  );
}
