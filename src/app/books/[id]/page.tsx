import type { Metadata } from "next";
import BookDetails from "@/components/books/BookDetails";

export const metadata: Metadata = { title: "Book Details" };

export default function BookDetailsPage() {
  return <BookDetails />;
}
