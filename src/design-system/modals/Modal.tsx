"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MutedText, SectionTitle } from "@/design-system/primitives/Typography";

type ModalProps = {
  title: string;
  description?: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ title, description, open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur">
      <Card className="w-full max-w-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <SectionTitle>{title}</SectionTitle>
            {description ? <MutedText className="mt-2">{description}</MutedText> : null}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close modal">
            <X aria-hidden />
          </Button>
        </div>
        <div className="mt-6">{children}</div>
      </Card>
    </div>
  );
}
