"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { api, type Book } from "@/lib/api";
import { defaultReturnDate, minReturnDate } from "@/lib/format";
import { useApiError } from "@/hooks/useApiError";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: Book;
  user: { name: string; email: string };
  onBorrowed: () => void;
}

export default function BorrowDialog({ open, onOpenChange, book, user, onBorrowed }: Props) {
  const [returnDate, setReturnDate] = useState(defaultReturnDate());
  const [loading, setLoading] = useState(false);
  const handleError = useApiError();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await api("/borrows", { method: "POST", auth: true, body: JSON.stringify({ bookId: book._id, returnDate }) });
      toast.success(`Enjoy reading "${book.title}"!`);
      onOpenChange(false);
      onBorrowed();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={submit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Borrow this book</DialogTitle>
            <DialogDescription>Confirm your details and choose when you will bring it back.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Book</Label>
            <Input value={book.title} readOnly className="h-10" />
          </div>
          <div className="space-y-2">
            <Label>Your name</Label>
            <Input value={user.name} readOnly className="h-10" />
          </div>
          <div className="space-y-2">
            <Label>Your email</Label>
            <Input value={user.email} readOnly className="h-10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="returnDate">Return date</Label>
            <Input
              id="returnDate"
              type="date"
              min={minReturnDate()}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
              className="h-10"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" size="lg" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" size="lg" disabled={loading || !returnDate}>
              {loading && <Loader2 className="size-4 animate-spin" />} Confirm borrow
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
