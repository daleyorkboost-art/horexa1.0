import type { IconType } from "@/types/components";
import { Card } from "@/components/ui/card";
import { MutedText, SectionTitle } from "@/design-system/primitives/Typography";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: IconType;
};

export function EmptyState({ title, description, icon: Icon }: EmptyStateProps) {
  return (
    <Card className="flex min-h-52 flex-col items-center justify-center p-8 text-center">
      {Icon ? (
        <div className="mb-5 flex size-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
          <Icon aria-hidden />
        </div>
      ) : null}
      <SectionTitle>{title}</SectionTitle>
      <MutedText className="mt-2 max-w-xl">{description}</MutedText>
    </Card>
  );
}
