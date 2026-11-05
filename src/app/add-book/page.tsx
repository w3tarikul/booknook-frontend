import type { Metadata } from "next";
import BookForm from "@/components/books/BookForm";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = { title: "Add Book" };

export default function AddBookPage() {
  return (
    <>
      <PageHeader title="Add a Book" subtitle="Share a book with the BookNook community." />
      <BookForm />
    </>
  );
}
