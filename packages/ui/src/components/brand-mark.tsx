import * as React from "react";
import { cn } from "../lib/utils";

export const flytrapLogoUrl = new URL("../assets/flytrap-logo.svg", import.meta.url).href;

export type BrandMarkSize = 32 | 48 | 60;
export interface BrandMarkProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height" | "alt"> {
  size?: BrandMarkSize;
  label?: string | null;
}

export function BrandMark({ size = 32, label = "Flytrap", className, ...props }: BrandMarkProps) {
  return <img alt={label ?? ""} className={cn("shrink-0 object-contain", className)} data-slot="brand-mark" height={size} src={flytrapLogoUrl} width={size} {...props} />;
}

export interface BrandLockupProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  descriptor?: string;
  markSize?: BrandMarkSize;
}

export function BrandLockup({ name = "Flytrap", descriptor, markSize = 32, className, ...props }: BrandLockupProps) {
  return <div className={cn("inline-flex items-center gap-3", className)} data-slot="brand-lockup" {...props}>
    <BrandMark label={null} size={markSize} />
    <span className="grid min-w-0">
      <span className="truncate font-display font-bold">{name}</span>
      {descriptor && <span className="truncate text-xs text-muted-foreground">{descriptor}</span>}
    </span>
  </div>;
}
