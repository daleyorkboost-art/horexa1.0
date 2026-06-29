import type { IconType } from "@/types/components";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/design-system/feedback/EmptyState";
import { SectionTitle } from "@/design-system/primitives/Typography";

export type ActivityItem = {
  title: string;
  detail: string;
  time: string;
  icon: IconType;
};

type ActivityListProps = {
  title: string;
  items: ActivityItem[];
  emptyTitle: string;
  emptyDescription: string;
};

export function ActivityList({ title, items, emptyTitle, emptyDescription }: ActivityListProps) {
  if (!items.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <Card className="p-6">
      <SectionTitle>{title}</SectionTitle>
      <div className="mt-6 flex flex-col gap-5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={`${item.title}-${item.time}`} className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                <Icon aria-hidden />
              </div>
              <div className="border-b border-border pb-5 last:border-b-0 last:pb-0">
                <h3 className="font-black">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
