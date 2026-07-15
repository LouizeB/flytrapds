import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../lib/utils";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  /** Offset between the trigger and tooltip content. */
  sideOffset?: number;
  /** Short, non-essential helper text. Do not put required information only in a tooltip. */
  children?: React.ReactNode;
}

export const TooltipContent = React.forwardRef<React.ElementRef<typeof TooltipPrimitive.Content>, TooltipContentProps>(({ className, sideOffset = 6, ...props }, ref) => <TooltipPrimitive.Portal><TooltipPrimitive.Content ref={ref} sideOffset={sideOffset} className={cn("z-50 max-w-64 rounded-md bg-foreground px-3 py-1.5 text-xs text-background shadow-md data-[state=delayed-open]:animate-in data-[state=closed]:animate-out", className)} {...props} /></TooltipPrimitive.Portal>);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
