import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ErrorIcon, FlytrapIcon, InfoIcon, SuccessIcon, WarningIcon } from "../icons";
import { cn } from "../lib/utils";

const alertVariants = cva("relative grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 rounded-xl border p-4 text-sm", { variants: { variant: {
  info: "border-border bg-card text-card-foreground",
  success: "border-success/40 bg-success/10 text-foreground",
  warning: "border-warning/40 bg-warning/10 text-foreground",
  error: "border-destructive/40 bg-destructive/10 text-foreground",
} }, defaultVariants: { variant: "info" } });
const icons = { info: InfoIcon, success: SuccessIcon, warning: WarningIcon, error: ErrorIcon };
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}
export function Alert({ variant = "info", className, children, ...props }: AlertProps) {
  const Icon = icons[variant ?? "info"];
  return <div className={cn(alertVariants({ variant }), className)} role={variant === "error" ? "alert" : "status"} {...props}><FlytrapIcon className="mt-0.5" icon={Icon} />{children}</div>;
}
export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) { return <h5 className={cn("font-semibold leading-5", className)} {...props} />; }
export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("col-start-2 text-sm leading-5 text-muted-foreground", className)} {...props} />; }
