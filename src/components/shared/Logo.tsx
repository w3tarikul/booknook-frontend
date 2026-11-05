import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 font-bold tracking-tight ${className}`} aria-label="BookNook home">
      <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <BookOpen className="size-4" />
      </span>
      <span className="text-xl">
        b<span className="text-primary">OO</span>K<span className="lowercase">n</span>
        <span className="text-primary">OO</span>K
      </span>
    </Link>
  );
}
