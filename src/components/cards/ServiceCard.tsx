import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IconType } from "@/types/components";

type ServiceCardProps = {
  icon: IconType;
  title: string;
  description: string;
  href: string;
};

export function ServiceCard({ icon: Icon, title, description, href }: ServiceCardProps) {
  return (
    <Card className="group h-full">
      <CardHeader>
        <div className="flex size-14 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon aria-hidden />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-6">
        <p className="text-sm leading-7 text-muted-foreground">{description}</p>
        <Button asChild variant="outline" className="mt-auto w-fit">
          <Link href={href}>
            Learn More
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
