import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Book } from "@/lib/api";

export default function BookCard({ book }: { book: Book }) {
  const available = book.availableCopies > 0;
  return (
    <article className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.image}
          alt={`Cover of ${book.title}`}
          className="size-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <Badge className="absolute left-3 top-3 bg-background/80 text-foreground backdrop-blur">{book.category}</Badge>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="space-y-1">
          <h3 className="line-clamp-1 text-lg font-semibold">{book.title}</h3>
          <p className="line-clamp-1 text-sm text-muted-foreground">by {book.author}</p>
        </div>
        <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">{book.description}</p>
        <div className="flex items-center justify-between gap-3">
          <span className={`text-xs font-medium ${available ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
            {available ? `${book.availableCopies} of ${book.totalCopies} available` : "Not Available"}
          </span>
          <Button size="lg" render={<Link href={`/books/${book._id}`} />} nativeButton={false}>
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
