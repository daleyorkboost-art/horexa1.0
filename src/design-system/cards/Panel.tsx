import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MutedText, SectionTitle } from "@/design-system/primitives/Typography";

type PanelProps = {
  title: string;
  description?: string;
  action?: string;
  children?: ReactNode;
};

export function Panel({ title, description, action, children }: PanelProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <SectionTitle>{title}</SectionTitle>
          {description ? <MutedText className="mt-2">{description}</MutedText> : null}
        </div>
        {action ? <Button type="button">{action}</Button> : null}
      </div>
      {children ? <div className="mt-6">{children}</div> : null}
    </Card>
  );
}
