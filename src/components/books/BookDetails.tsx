"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, BookCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/shared/Spinner";
import BorrowDialog from "./BorrowDialog";
import { api, ApiError, type Book, type Borrow } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { useSession } from "@/lib/auth-client";
import { useApiError } from "@/hooks/useApiError";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const handleError = useApiError();
  const [book, setBook] = useState<Book | null>(null);
  const [borrow, setBorrow] = useState<Borrow | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const [b, borrows] = await Promise.all([api<Book>(`/books/${id}`, { auth: true }), api<Borrow[]>("/borrows", { auth: true })]);
      setBook(b);
      setBorrow(borrows.find((x) => x.bookId === id) ?? null);
    } catch (err) {
      if (err instanceof ApiError && (err.status === 404 || err.status === 400)) setNotFound(true);
      else handleError(err);
    }
  }, [id, handleError]);

  useEffect(() => {
    load();
  }, [load]);

  if (notFound)
    return (
      <div className="glass mx-auto max-w-md space-y-4 rounded-3xl p-10 text-center">
        <h1 className="text-2xl font-bold">Book not found</h1>
        <p className="text-muted-foreground">This book may have been removed by its owner.</p>
        <Button size="lg" render={<Link href="/books" />} nativeButton={false}>
          Back to All Books
        </Button>
      </div>
    );
  if (!book || !session) return <Spinner label="Opening the book..." />;

  const available = book.availableCopies > 0;
  const isOwner = book.ownerId === session.user.id;

  return (
    <div className="space-y-6">
      <Link href="/books" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="size-4" /> Back to all books
      </Link>
      <div className="glass grid gap-8 overflow-hidden rounded-3xl p-5 md:grid-cols-[1fr_1.2fr] md:p-8">
        <div className="overflow-hidden rounded-2xl bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={book.image} alt={`Cover of ${book.title}`} className="size-full max-h-[32rem] object-cover" />
        </div>
        <div className="flex flex-col gap-5">
          <div className="space-y-2">
            <Badge>{book.category}</Badge>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{book.title}</h1>
            <p className="text-lg text-muted-foreground">by {book.author}</p>
          </div>
          <p className="leading-relaxed text-muted-foreground">{book.description}</p>
          <dl className="grid grid-cols-2 gap-4 rounded-2xl border bg-background/40 p-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Total copies</dt>
              <dd className="text-lg font-semibold">{book.totalCopies}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Available now</dt>
              <dd className={`text-lg font-semibold ${available ? "" : "text-destructive"}`}>{available ? book.availableCopies : "Not Available"}</dd>
            </div>
            <div className="col-span-2 flex items-center gap-2 text-muted-foreground">
              <User className="size-4" /> Added by <span className="font-medium text-foreground">{book.ownerName}</span> on {formatDate(book.createdAt)}
            </div>
          </dl>
          {borrow ? (
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" className="h-11 px-6" disabled>
                <BookCheck className="size-4" /> Already borrowed
              </Button>
              <span className="text-sm text-muted-foreground">Return by {formatDate(borrow.returnDate)}.</span>
              <Button variant="outline" size="lg" render={<Link href="/my-borrows" />} nativeButton={false}>
                Go to My Borrows
              </Button>
            </div>
          ) : (
            <div>
              <Button size="lg" className="h-11 px-8 text-base" disabled={!available} onClick={() => setOpen(true)}>
                {available ? "Borrow this book" : "Not Available"}
              </Button>
              {isOwner && <p className="mt-2 text-xs text-muted-foreground">This is your own book.</p>}
            </div>
          )}
        </div>
      </div>
      <BorrowDialog open={open} onOpenChange={setOpen} book={book} user={session.user} onBorrowed={load} />
    </div>
  );
}
