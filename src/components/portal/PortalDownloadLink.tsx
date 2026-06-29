import { Download } from "lucide-react";
import { Button } from "@/design-system";

type PortalDownloadLinkProps = {
  href?: string | null;
  label?: string;
};

export function PortalDownloadLink({ href, label = "Download" }: PortalDownloadLinkProps) {
  if (!href) {
    return <span className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">Unavailable</span>;
  }

  return (
    <Button asChild size="sm" variant="outline">
      <a href={href} target="_blank" rel="noreferrer" download>
        <Download className="mr-2 size-4" aria-hidden />
        {label}
      </a>
    </Button>
  );
}
