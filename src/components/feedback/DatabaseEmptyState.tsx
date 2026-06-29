import { Card } from "@/components/ui/card";

export function DatabaseEmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="p-8 text-center">
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p>
    </Card>
  );
}
