"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BookForm from "./BookForm";
import Spinner from "@/components/shared/Spinner";
import { api, type Book } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { useApiError } from "@/hooks/useApiError";

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const handleError = useApiError();
  const [book, setBook] = useState<Book | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api<Book>(`/books/${id}`, { auth: true })
      .then(setBook)
      .catch((err) => {
        setMessage(err.message);
        handleError(err);
      });
  }, [id, handleError]);

  if (message && !book) return <p className="glass rounded-2xl p-8 text-center text-destructive">{message}</p>;
  if (!book || !session) return <Spinner label="Loading your book..." />;
  if (book.ownerId !== session.user.id) return <p className="glass rounded-2xl p-8 text-center text-destructive">You can only edit books you added.</p>;
  return <BookForm book={book} />;
}
