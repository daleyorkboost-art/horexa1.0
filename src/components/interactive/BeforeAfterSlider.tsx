"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  before: {
    src: string;
    alt: string;
    label?: string;
  };
  after: {
    src: string;
    alt: string;
    label?: string;
  };
  className?: string;
};

export function BeforeAfterSlider({ before, after, className }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const id = useId();
  const safePosition = Math.max(position, 1);

  return (
    <div className={cn("surface-card relative overflow-hidden p-0", className)}>
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src={after.src} alt={after.alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <div className="relative h-full" style={{ width: `${10000 / safePosition}%` }}>
            <Image src={before.src} alt={before.alt} fill sizes="100vw" className="object-cover" />
          </div>
        </div>

        <div className="absolute inset-x-4 top-4 flex justify-between text-xs font-black uppercase tracking-[0.14em]">
          <span className="rounded-full bg-background/80 px-3 py-2 text-foreground backdrop-blur">
            {before.label ?? "Before"}
          </span>
          <span className="rounded-full bg-primary px-3 py-2 text-primary-foreground">
            {after.label ?? "After"}
          </span>
        </div>

        <div className="absolute inset-y-0" style={{ left: `${position}%` }}>
          <div className="h-full w-px bg-primary shadow-glow" />
          <div className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-background text-primary shadow-glow">
            <ArrowLeftRight aria-hidden />
          </div>
        </div>

        <label className="sr-only" htmlFor={id}>
          Compare before and after images
        </label>
        <input
          id={id}
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          aria-valuetext={`${position}% before image visible`}
        />
      </div>
    </div>
  );
}
