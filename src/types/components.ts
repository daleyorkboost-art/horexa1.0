import type { LucideIcon } from "lucide-react";

export type IconType = LucideIcon;

export type LinkAction = {
  label: string;
  href: string;
};

export type MediaAsset = {
  src: string;
  alt: string;
};

export type StatItem = {
  value: number;
  suffix?: string;
  label: string;
  description?: string;
};
