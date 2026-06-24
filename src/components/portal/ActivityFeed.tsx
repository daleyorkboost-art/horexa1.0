import { activityFeed } from "@/lib/portal-data";
import { Card } from "@/components/ui/card";

export function ActivityFeed() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-black">Recent Activity</h2>
      <div className="mt-6 flex flex-col gap-5">
        {activityFeed.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex gap-4">
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
