import { complianceBreakdown } from "@/lib/portal-data";
import { Card } from "@/components/ui/card";

type ComplianceDonutProps = {
  score?: number;
};

export function ComplianceDonut({ score = 94 }: ComplianceDonutProps) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="relative mx-auto size-44 shrink-0">
          <svg viewBox="0 0 150 150" className="-rotate-90">
            <circle cx="75" cy="75" r={radius} stroke="hsl(var(--border))" strokeWidth="14" fill="none" />
            <circle
              cx="75"
              cy="75"
              r={radius}
              stroke="hsl(var(--primary))"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${progress} ${circumference}`}
              className="drop-shadow-[0_0_12px_hsl(var(--primary)/0.55)]"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black">{score}%</span>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Excellent</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <div>
            <h2 className="text-2xl font-black">Compliance Overview</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Weighted health of kitchen hygiene, exhaust systems, fire safety, and documentation.</p>
          </div>
          {complianceBreakdown.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-border">
                <div className="h-full rounded-full bg-orange-sheen shadow-glow" style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
