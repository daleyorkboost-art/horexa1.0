import type { IconType } from "@/types/components";

type TimelineStep = {
  title: string;
  description: string;
  icon: IconType;
};

type TimelineProps = {
  steps: TimelineStep[];
};

export function Timeline({ steps }: TimelineProps) {
  return (
    <div className="relative grid gap-5 lg:grid-cols-6">
      <div className="absolute left-8 top-8 hidden h-px w-[calc(100%-4rem)] border-t border-dashed border-primary/35 lg:block" />
      {steps.map((step, index) => {
        const Icon = step.icon;

        return (
          <article
            key={step.title}
            className="surface-card orange-glow relative p-5"
          >
            <div className="flex items-center gap-4 lg:flex-col lg:items-start">
              <div className="relative flex size-14 items-center justify-center rounded-lg border border-primary/35 bg-primary text-primary-foreground shadow-glow">
                <Icon aria-hidden />
                <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-background text-xs font-black text-primary">
                  {index + 1}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-black">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
