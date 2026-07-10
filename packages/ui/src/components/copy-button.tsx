import * as React from "react";
import { ConfirmIcon, CopyIcon, FlytrapIcon } from "../icons";
import { Button, type ButtonProps } from "./button";

export interface CopyButtonProps extends Omit<ButtonProps, "children" | "onClick"> {
  value: string;
  copy?: (value: string) => Promise<void>;
}

export function CopyButton({ value, copy = valueToCopy => navigator.clipboard.writeText(valueToCopy), ...props }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const handleClick = async () => {
    await copy(value);
    setCopied(true);
  };
  return <Button aria-live="polite" onClick={handleClick} variant="outline" {...props}>
    <FlytrapIcon icon={copied ? ConfirmIcon : CopyIcon} />{copied ? "Copiado" : "Copiar"}
  </Button>;
}
