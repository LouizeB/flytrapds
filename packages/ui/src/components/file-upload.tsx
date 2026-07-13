import * as React from "react";
import { FlytrapIcon, UploadIcon } from "../icons";
import { cn } from "../lib/utils";

export interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  onFilesChange?: (files: File[]) => void;
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(({
  className,
  description = "Arraste ou selecione arquivos.",
  label = "Selecionar arquivos",
  multiple,
  onFilesChange,
  ...props
}, ref) => {
  const [files, setFiles] = React.useState<File[]>([]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextFiles = Array.from(event.target.files ?? []);
    setFiles(nextFiles);
    onFilesChange?.(nextFiles);
  }

  return <label className={cn("grid cursor-pointer gap-3 rounded-xl border border-dashed bg-card p-5 text-card-foreground transition-colors hover:border-primary focus-within:ring-2 focus-within:ring-ring", className)} data-slot="file-upload">
    <span className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary"><FlytrapIcon icon={UploadIcon} /></span>
      <span className="grid gap-1">
        <span className="font-medium">{label}</span>
        {description ? <span className="text-sm text-muted-foreground">{description}</span> : null}
      </span>
    </span>
    <input ref={ref} className="sr-only" multiple={multiple} onChange={handleChange} type="file" {...props} />
    {files.length > 0 ? <span aria-live="polite" className="text-xs text-muted-foreground">{files.map((file) => file.name).join(", ")}</span> : null}
  </label>;
});
FileUpload.displayName = "FileUpload";
