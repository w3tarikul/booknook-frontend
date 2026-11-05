"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarClock, CalendarPlus, Undo2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";
import { api, type Borrow } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { useApiError } from "@/hooks/useApiError";

export default function MyBorrows() {
  const handleError = useApiError();
  const [borrows, setBorrows] = useState<Borrow[] | null>(null);
  const [returning, setReturning] = useState<string | null>(null);
  const [now] = useState(() => Date.now());

  useEffect(() => {
    api<Borrow[]>("/borrows", { auth: true }).then(setBorrows).catch(handleError);
  }, [handleError]);

  async function giveBack(b: Borrow) {
    setReturning(b._id);
    try {
      await api(`/borrows/${b._id}`, { method: "DELETE", auth: true });
      toast.success(`"${b.title}" has been returned. Thank you!`);
      setBorrows((list) => list?.filter((x) => x._id !== b._id) ?? null);
    } catch (err) {
      handleError(err);
    } finally {
      setReturning(null);
    }
  }

  if (!borrows) return <Spinner label="Loading your borrows..." />;

  if (borrows.length === 0)
    return (
      <div className="glass mx-auto max-w-md space-y-4 rounded-3xl p-10 text-center">
        <h2 className="text-xl font-semibold">Nothing borrowed right now</h2>
        <p className="text-sm text-muted-foreground">Find a book you like and it will appear here.</p>
        <Button size="lg" render={<Link href="/books" />} nativeButton={false}>
          Browse Books
        </Button>
      </div>
    );

  return (
    <div className="grid gap-4">
      {borrows.map((b) => {
        const overdue = new Date(b.returnDate).getTime() < now;
        return (
          <article key={b._id} className="glass flex flex-col gap-4 rounded-2xl p-4 transition hover:shadow-lg sm:flex-row sm:items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.image} alt={`Cover of ${b.title}`} className="h-36 w-full rounded-xl object-cover sm:h-24 sm:w-36" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <Link href={`/books/${b.bookId}`} className="line-clamp-1 text-lg font-semibold hover:text-primary">
                {b.title}
              </Link>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarPlus className="size-4" /> Borrowed {formatDate(b.borrowDate)}
              </p>
              <p className={`flex items-center gap-1.5 text-sm ${overdue ? "text-destructive" : "text-muted-foreground"}`}>
                <CalendarClock className="size-4" /> Return by {formatDate(b.returnDate)}
                {overdue && " (overdue)"}
              </p>
            </div>
            <Button size="lg" onClick={() => giveBack(b)} disabled={returning === b._id}>
              <Undo2 className="size-4" /> {returning === b._id ? "Returning..." : "Return"}
            </Button>
          </article>
        );
      })}
    </div>
  );
}
