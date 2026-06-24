import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IconType } from "@/types/components";

type FeatureCardProps = {
  icon: IconType;
  title: string;
  description: string;
};

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex size-12 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
          <Icon aria-hidden />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-sm leading-7 text-muted-foreground">{description}</p>
        <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-primary">
          Explore
          <ArrowUpRight aria-hidden />
        </span>
      </CardContent>
    </Card>
  );
}
