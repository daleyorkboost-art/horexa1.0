import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  children: ReactNode;
};

export function Eyebrow({ as: Component = "p", className, children, ...props }: TextProps) {
  return (
    <Component
      className={cn("text-xs font-black uppercase tracking-[0.24em] text-primary", className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Heading({ as: Component = "h2", className, children, ...props }: TextProps) {
  return (
    <Component className={cn("text-h2 font-black text-foreground", className)} {...props}>
      {children}
    </Component>
  );
}

export function SectionTitle({ as: Component = "h2", className, children, ...props }: TextProps) {
  return (
    <Component className={cn("text-2xl font-black text-foreground", className)} {...props}>
      {children}
    </Component>
  );
}

export function MutedText({ as: Component = "p", className, children, ...props }: TextProps) {
  return (
    <Component className={cn("text-sm leading-7 text-muted-foreground", className)} {...props}>
      {children}
    </Component>
  );
}
