import type { Metadata } from "next";
import AllBooks from "@/components/books/AllBooks";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = { title: "All Books" };

export default function BooksPage() {
  return (
    <>
      <PageHeader title="All Books" subtitle="Browse every book on the shelves, then log in to borrow your next read." />
      <AllBooks />
    </>
  );
}
