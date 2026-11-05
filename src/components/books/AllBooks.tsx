"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import BookCard from "@/components/shared/BookCard";
import BookGridSkeleton from "@/components/shared/BookCardSkeleton";
import Reveal from "@/components/shared/Reveal";
import { Input } from "@/components/ui/input";
import { api, CATEGORIES, type Book } from "@/lib/api";

export default function AllBooks() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    api<Book[]>("/books")
      .then(setBooks)
      .catch((e) => setError(e.message));
  }, []);

  const filtered = useMemo(() => {
    if (!books) return [];
    const q = query.trim().toLowerCase();
    return books.filter(
      (b) =>
        (category === "all" || b.category === category) &&
        (!q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
    );
  }, [books, query, category]);

  return (
    <div className="space-y-8">
      <div className="glass flex flex-col gap-3 rounded-2xl p-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or author"
            aria-label="Search books"
            className="h-10 pl-9"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
          className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <p className="glass rounded-2xl p-8 text-center text-destructive">{error}</p>
      ) : !books ? (
        <BookGridSkeleton />
      ) : filtered.length === 0 ? (
        <p className="glass rounded-2xl p-10 text-center text-muted-foreground">
          No books match your search. Try a different title, author or category.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b, i) => (
            <Reveal key={b._id} delay={(i % 3) * 0.06}>
              <BookCard book={b} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
