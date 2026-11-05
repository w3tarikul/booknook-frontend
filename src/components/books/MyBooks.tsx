"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookPlus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { api, type Book } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { useSession } from "@/lib/auth-client";
import { useApiError } from "@/hooks/useApiError";

export default function MyBooks() {
  const { data: session } = useSession();
  const handleError = useApiError();
  const [books, setBooks] = useState<Book[] | null>(null);
  const [target, setTarget] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState(false);
  const userId = session?.user.id;

  useEffect(() => {
    if (!userId) return;
    let active = true;
    api<Book[]>(`/books?ownerId=${userId}`)
      .then((list) => active && setBooks(list))
      .catch((err) => active && handleError(err));
    return () => {
      active = false;
    };
  }, [userId, handleError]);

  async function confirmDelete() {
    if (!target) return;
    setDeleting(true);
    try {
      await api(`/books/${target._id}`, { method: "DELETE", auth: true });
      toast.success(`"${target.title}" was deleted.`);
      setBooks((b) => b?.filter((x) => x._id !== target._id) ?? null);
      setTarget(null);
    } catch (err) {
      handleError(err);
    } finally {
      setDeleting(false);
    }
  }

  if (!books) return <Spinner label="Loading your books..." />;

  if (books.length === 0)
    return (
      <div className="glass mx-auto max-w-md space-y-4 rounded-3xl p-10 text-center">
        <h2 className="text-xl font-semibold">You have not added any books yet</h2>
        <p className="text-sm text-muted-foreground">Share your first book and it will show up here.</p>
        <Button size="lg" render={<Link href="/add-book" />} nativeButton={false}>
          <BookPlus className="size-4" /> Add a Book
        </Button>
      </div>
    );

  return (
    <>
      <div className="grid gap-4">
        {books.map((b) => (
          <article key={b._id} className="glass flex flex-col gap-4 rounded-2xl p-4 transition hover:shadow-lg sm:flex-row sm:items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.image} alt={`Cover of ${b.title}`} className="h-36 w-full rounded-xl object-cover sm:h-24 sm:w-36" />
            <div className="min-w-0 flex-1 space-y-1">
              <Link href={`/books/${b._id}`} className="line-clamp-1 text-lg font-semibold hover:text-primary">
                {b.title}
              </Link>
              <p className="text-sm text-muted-foreground">
                {b.author} &middot; {b.category}
              </p>
              <p className="text-xs text-muted-foreground">
                {b.availableCopies}/{b.totalCopies} available &middot; Added {formatDate(b.createdAt)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="lg" render={<Link href={`/my-books/${b._id}/edit`} />} nativeButton={false}>
                <Pencil className="size-4" /> Edit
              </Button>
              <Button variant="destructive" size="lg" onClick={() => setTarget(b)}>
                <Trash2 className="size-4" /> Delete
              </Button>
            </div>
          </article>
        ))}
      </div>
      <ConfirmDialog
        open={Boolean(target)}
        onOpenChange={(o) => !o && setTarget(null)}
        title="Delete this book?"
        description={`"${target?.title ?? ""}" will be removed from BookNook, along with any active borrows. This cannot be undone.`}
        loading={deleting}
        onConfirm={confirmDelete}
      />
    </>
  );
}
