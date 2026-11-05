import type { Metadata } from "next";
import MyBorrows from "@/components/books/MyBorrows";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = { title: "My Borrows" };

export default function MyBorrowsPage() {
  return (
    <>
      <PageHeader title="My Borrows" subtitle="Books you are currently reading. Return them when you are done." />
      <MyBorrows />
    </>
  );
}
