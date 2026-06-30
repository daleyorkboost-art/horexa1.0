import { Card } from "@/components/ui/card";
import { Database, ShieldCheck } from "lucide-react";

export function DatabaseEmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="mx-auto max-w-3xl p-8 text-center md:p-10">
      <div className="mx-auto flex size-14 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
        <Database aria-hidden />
      </div>
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p>
      <div className="mx-auto mt-6 flex max-w-xl items-start gap-3 rounded-lg border border-border bg-background/45 p-4 text-left">
        <ShieldCheck className="mt-0.5 shrink-0 text-primary" aria-hidden />
        <p className="text-sm leading-6 text-muted-foreground">
          Add and publish records from the admin panel. The page layout will automatically populate once content is available.
        </p>
      </div>
    </Card>
  );
}
