import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-xs font-black uppercase tracking-[0.34em] text-primary">{eyebrow}</span>
      ) : null}
      <h2 className="text-balance text-h2 font-black text-foreground">
        {title} {highlight ? <span className="text-primary">{highlight}</span> : null}
      </h2>
      {description ? <p className="max-w-2xl text-base leading-7 text-muted-foreground">{description}</p> : null}
    </div>
  );
}
