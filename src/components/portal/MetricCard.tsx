import type { IconType } from "@/types/components";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  label: string;
  value: string;
  helper: string;
  icon: IconType;
  tone?: string;
};

export function MetricCard({ label, value, helper, icon: Icon, tone = "primary" }: MetricCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
          <p className="mt-3 text-4xl font-black">{value}</p>
          <p className="mt-2 text-sm text-muted-foreground">{helper}</p>
        </div>
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-lg border bg-primary/10 text-primary",
            tone === "success" && "border-success/30 bg-success/10 text-success",
            tone === "warning" && "border-warning/30 bg-warning/10 text-warning",
            tone === "primary" && "border-primary/30",
          )}
        >
          <Icon aria-hidden />
        </div>
      </div>
    </Card>
  );
}
