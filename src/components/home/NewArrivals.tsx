import Link from "next/link";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/shared/BookCard";
import Reveal from "@/components/shared/Reveal";
import type { Book } from "@/lib/api";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

async function getLatest(): Promise<Book[] | null> {
  try {
    const res = await fetch(`${API}/books?limit=6`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function NewArrivals() {
  const books = await getLatest();
  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">New Arrivals</h2>
          <p className="text-muted-foreground">The latest books added by our community.</p>
        </div>
        <Button variant="outline" size="lg" render={<Link href="/books" />} nativeButton={false}>
          See All Books
        </Button>
      </div>
      {books === null ? (
        <p className="glass rounded-2xl p-8 text-center text-muted-foreground">
          We could not load the latest books right now. Please refresh in a moment.
        </p>
      ) : books.length === 0 ? (
        <p className="glass rounded-2xl p-8 text-center text-muted-foreground">
          No books yet. Be the first to add one!
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((b, i) => (
            <Reveal key={b._id} delay={(i % 3) * 0.08}>
              <BookCard book={b} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
