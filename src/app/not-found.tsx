import type { Metadata } from "next";
import Link from "next/link";
import { BookX } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <div className="glass mx-auto mt-10 flex max-w-lg flex-col items-center gap-4 rounded-3xl px-6 py-14 text-center">
      <span className="grid size-16 place-items-center rounded-2xl bg-accent text-primary">
        <BookX className="size-8" />
      </span>
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-lg font-medium">This page wandered off the shelf.</p>
      <p className="text-sm text-muted-foreground">The page you are looking for does not exist or has moved.</p>
      <Button size="lg" render={<Link href="/" />} nativeButton={false}>
        Back to Home
      </Button>
    </div>
  );
}
