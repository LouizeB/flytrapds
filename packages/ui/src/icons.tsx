import * as React from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Check,
  CircleCheck,
  CircleHelp,
  CirclePause,
  CircleX,
  Clipboard,
  ExternalLink,
  LayoutDashboard,
  Lightbulb,
  LoaderCircle,
  Minus,
  Moon,
  Send,
  ShieldCheck,
  Sparkles,
  Sprout,
  Sun,
  TriangleAlert,
  Wrench,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import { cn } from "./lib/utils";

export const AgentIcon = Bot;
export const AgentRunningIcon = LoaderCircle;
export const AgentIdleIcon = CirclePause;
export const SuccessIcon = CircleCheck;
export const ErrorIcon = CircleX;
export const WarningIcon = TriangleAlert;
export const InfoIcon = CircleHelp;
export const InsightIcon = Lightbulb;
export const ToolIcon = Wrench;
export const ApprovalIcon = ShieldCheck;
export const DashboardIcon = LayoutDashboard;
export const PlaygroundIcon = Activity;
export const SendIcon = Send;
export const CopyIcon = Clipboard;
export const ConfirmIcon = Check;
export const ExternalLinkIcon = ExternalLink;
export const TrendUpIcon = ArrowUpRight;
export const TrendDownIcon = ArrowDownRight;
export const TrendNeutralIcon = Minus;
export const ThemeLightIcon = Sun;
export const ThemeDarkIcon = Moon;
export const BrandIcon = Sprout;
export const AiAccentIcon = Sparkles;

export type FlytrapIconComponent = LucideIcon;
export type FlytrapIconSize = "sm" | "md" | "lg";

const iconSizes: Record<FlytrapIconSize, string> = {
  sm: "size-[var(--icon-size-sm)]",
  md: "size-[var(--icon-size-md)]",
  lg: "size-[var(--icon-size-lg)]",
};

export interface FlytrapIconProps extends Omit<LucideProps, "size"> {
  icon: FlytrapIconComponent;
  size?: FlytrapIconSize;
  label?: string;
}

export function FlytrapIcon({ icon: Icon, size = "md", label, className, ...props }: FlytrapIconProps) {
  return <Icon
    aria-hidden={label ? undefined : true}
    aria-label={label}
    className={cn("shrink-0", iconSizes[size], className)}
    focusable="false"
    role={label ? "img" : undefined}
    strokeWidth="var(--icon-stroke)"
    {...props}
  />;
}
