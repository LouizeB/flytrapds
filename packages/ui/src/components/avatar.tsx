import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../lib/utils";

export const flytrapAiAvatarUrl = new URL("../assets/flytrap-ai-avatar.png", import.meta.url).href;
export type AvatarSize = "sm" | "md" | "lg";
const avatarSizes: Record<AvatarSize, string> = { sm: "size-8", md: "size-12", lg: "size-[60px]" };

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: AvatarSize;
}
export const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(({ size = "md", className, ...props }, ref) => <AvatarPrimitive.Root ref={ref} className={cn("relative flex shrink-0 overflow-hidden rounded-full bg-muted", avatarSizes[size], className)} data-slot="avatar" {...props} />);
Avatar.displayName = AvatarPrimitive.Root.displayName;
export const AvatarImage = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Image>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>>(({ className, ...props }, ref) => <AvatarPrimitive.Image ref={ref} className={cn("aspect-square size-full object-cover", className)} data-slot="avatar-image" {...props} />);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
export const AvatarFallback = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Fallback>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>>(({ className, ...props }, ref) => <AvatarPrimitive.Fallback ref={ref} className={cn("grid size-full place-items-center bg-muted text-sm font-semibold text-muted-foreground", className)} data-slot="avatar-fallback" {...props} />);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export type AiAvatarStatus = "online" | "processing" | "offline";
export interface AiAvatarProps extends Omit<AvatarProps, "children"> {
  label?: string;
  status?: AiAvatarStatus;
}
const statusClasses: Record<AiAvatarStatus, string> = {
  online: "bg-success",
  processing: "animate-pulse bg-warning motion-reduce:animate-none",
  offline: "bg-muted-foreground",
};

export function AiAvatar({ label = "Flytrap AI", status = "online", size = "md", className, ...props }: AiAvatarProps) {
  const statusLabel = status === "online" ? "Disponível" : status === "processing" ? "Processando" : "Offline";
  return <span className="relative inline-flex" data-slot="ai-avatar">
    <Avatar aria-label={label} className={className} role="img" size={size} {...props}>
      <AvatarImage alt="" src={flytrapAiAvatarUrl} />
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
    <span aria-label={statusLabel} className={cn("absolute bottom-0 right-0 size-3 rounded-full border-2 border-background", statusClasses[status])} role="status" />
  </span>;
}
