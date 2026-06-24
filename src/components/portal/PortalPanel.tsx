import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PortalPanelProps = {
  title: string;
  description: string;
  action?: string;
  children?: React.ReactNode;
};

export function PortalPanel({ title, description, action, children }: PortalPanelProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-black">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        {action ? <Button>{action}</Button> : null}
      </div>
      {children ? <div className="mt-6">{children}</div> : null}
    </Card>
  );
}
