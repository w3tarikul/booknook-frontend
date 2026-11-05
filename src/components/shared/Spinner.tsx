import { Loader2 } from "lucide-react";

export default function Spinner({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-muted-foreground" role="status">
      <Loader2 className="size-8 animate-spin text-primary" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
