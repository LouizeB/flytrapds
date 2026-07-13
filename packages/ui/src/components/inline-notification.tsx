import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ErrorIcon, FlytrapIcon, InfoIcon, SuccessIcon, WarningIcon } from "../icons";
import { cn } from "../lib/utils";

const inlineNotificationVariants = cva("grid grid-cols-[auto_1fr_auto] items-start gap-3 rounded-xl border p-4 text-sm", {
  variants: {
    variant: {
      info: "border-border bg-card text-card-foreground",
      success: "border-success/40 bg-success/10 text-foreground",
      warning: "border-warning/40 bg-warning/10 text-foreground",
      error: "border-destructive/40 bg-destructive/10 text-foreground",
    },
  },
  defaultVariants: { variant: "info" },
});

const icons = { info: InfoIcon, success: SuccessIcon, warning: WarningIcon, error: ErrorIcon };

export interface InlineNotificationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, VariantProps<typeof inlineNotificationVariants> {
  action?: React.ReactNode;
  title?: React.ReactNode;
}

export function InlineNotification({ action, children, className, title, variant = "info", ...props }: InlineNotificationProps) {
  const Icon = icons[variant ?? "info"];
  const role = variant === "error" ? "alert" : "status";

  return <div className={cn(inlineNotificationVariants({ variant }), className)} data-slot="inline-notification" role={role} {...props}>
    <FlytrapIcon className="mt-0.5" icon={Icon} />
    <div className="grid gap-1">
      {title ? <p className="font-medium leading-5">{title}</p> : null}
      {children ? <div className="text-sm leading-5 text-muted-foreground">{children}</div> : null}
    </div>
    {action ? <div className="shrink-0">{action}</div> : null}
  </div>;
}
