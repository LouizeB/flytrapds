import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../lib/utils";

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => <SwitchPrimitive.Root ref={ref} className={cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-input outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/30", className)} data-slot="switch" {...props}><SwitchPrimitive.Thumb className="pointer-events-none block size-5 rounded-full bg-background shadow-sm transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" /></SwitchPrimitive.Root>);
Switch.displayName = SwitchPrimitive.Root.displayName;

export interface SwitchFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  description?: React.ReactNode;
  switchProps?: React.ComponentPropsWithoutRef<typeof Switch>;
}

export function SwitchField({ label, description, switchProps, className, ...props }: SwitchFieldProps) {
  const generatedId = React.useId();
  const id = switchProps?.id ?? generatedId;
  const descriptionId = description ? `${id}-description` : undefined;
  const disabled = switchProps?.disabled;
  return <div className={cn("flex min-h-11 items-start justify-between gap-4", disabled && "cursor-not-allowed opacity-70", className)} {...props}>
    <div className="grid gap-1 py-0.5"><label className={cn("text-sm font-medium", disabled && "cursor-not-allowed")} htmlFor={id}>{label}</label>{description && <p className="text-xs leading-5 text-muted-foreground" id={descriptionId}>{description}</p>}</div>
    <div className="grid min-h-11 place-items-start pt-0.5">
      <Switch aria-describedby={descriptionId} {...switchProps} id={id} />
    </div>
  </div>;
}
