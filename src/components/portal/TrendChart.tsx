import { trendData } from "@/lib/portal-data";
import { Card } from "@/components/ui/card";

export function TrendChart() {
  const max = Math.max(...trendData.map((item) => item.inspections));
  const points = trendData
    .map((item, index) => {
      const x = 20 + index * 52;
      const y = 110 - (item.inspections / max) * 74;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black">Inspection Trends</h2>
          <p className="mt-2 text-sm text-muted-foreground">Last six months of AMC activity.</p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-primary">Live UI</span>
      </div>
      <div className="mt-6 overflow-hidden rounded-lg border border-border bg-background/45 p-4">
        <svg viewBox="0 0 300 140" className="h-56 w-full">
          {[30, 55, 80, 105].map((y) => (
            <line key={y} x1="12" x2="288" y1={y} y2={y} stroke="hsl(var(--border))" strokeDasharray="4 6" />
          ))}
          <polyline points={points} fill="none" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {trendData.map((item, index) => {
            const x = 20 + index * 52;
            const y = 110 - (item.inspections / max) * 74;
            return (
              <g key={item.month}>
                <circle cx={x} cy={y} r="5" fill="hsl(var(--primary))" />
                <text x={x} y="132" textAnchor="middle" className="fill-muted-foreground text-[10px] font-bold">
                  {item.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
}
