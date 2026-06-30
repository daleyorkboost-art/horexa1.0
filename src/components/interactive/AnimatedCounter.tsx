"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  label: string;
  description?: string;
};

export function AnimatedCounter({ value, suffix = "", label, description }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        const startedAt = performance.now();
        const duration = 1200;
        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -80px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="surface-card orange-glow p-6 text-center">
      <span className="text-5xl font-black text-primary">
        {displayValue.toLocaleString()}
        {suffix}
      </span>
      <h3 className="mt-3 text-lg font-black text-foreground">{label}</h3>
      {description ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p> : null}
    </div>
  );
}
