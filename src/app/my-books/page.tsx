import type { Metadata } from "next";
import MyBooks from "@/components/books/MyBooks";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = { title: "My Books" };

export default function MyBooksPage() {
  return (
    <>
      <PageHeader title="My Books" subtitle="Books you have added. Edit or remove them any time." />
      <MyBooks />
    </>
  );
}
