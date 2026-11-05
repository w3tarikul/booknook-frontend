import type { Metadata } from "next";
import EditBook from "@/components/books/EditBook";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = { title: "Edit Book" };

export default function EditBookPage() {
  return (
    <>
      <PageHeader title="Edit Book" subtitle="Update the details of your book." />
      <EditBook />
    </>
  );
}
