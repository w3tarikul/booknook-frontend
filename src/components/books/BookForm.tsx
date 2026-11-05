"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api, CATEGORIES, type Book } from "@/lib/api";
import { uploadImage } from "@/lib/upload";
import { formatDate } from "@/lib/format";
import { useSession } from "@/lib/auth-client";
import { useApiError } from "@/hooks/useApiError";

export default function BookForm({ book }: { book?: Book }) {
  const router = useRouter();
  const { data: session } = useSession();
  const handleError = useApiError();
  const editing = Boolean(book);

  const [form, setForm] = useState({
    title: book?.title ?? "",
    author: book?.author ?? "",
    category: book?.category ?? CATEGORIES[0],
    description: book?.description ?? "",
    totalCopies: String(book?.totalCopies ?? 1),
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(book?.image ?? "");
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [key]: e.target.value });

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!file && !book) {
      toast.error("Please choose a cover image for your book.");
      return;
    }
    setLoading(true);
    try {
      const image = file ? await uploadImage(file) : book!.image;
      const payload = { ...form, totalCopies: Number(form.totalCopies), image };
      if (editing) {
        await api(`/books/${book!._id}`, { method: "PATCH", auth: true, body: JSON.stringify(payload) });
        toast.success("Your book has been updated.");
        router.push("/my-books");
      } else {
        await api("/books", { method: "POST", auth: true, body: JSON.stringify(payload) });
        toast.success("Your book is now on the shelf!");
        router.push("/my-books");
      }
      router.refresh();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="glass mx-auto grid max-w-3xl gap-5 rounded-3xl p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={form.title} onChange={set("title")} required placeholder="The Midnight Library" className="h-10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input id="author" value={form.author} onChange={set("author")} required placeholder="Matt Haig" className="h-10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={form.category}
            onChange={set("category")}
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalCopies">Total copies</Label>
          <Input id="totalCopies" type="number" min={1} step={1} value={form.totalCopies} onChange={set("totalCopies")} required className="h-10" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Cover image</Label>
        <label
          htmlFor="image"
          className="flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed bg-background/40 p-4 text-sm text-muted-foreground transition hover:border-primary hover:text-primary"
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Cover preview" className="max-h-56 rounded-xl object-contain" />
          ) : (
            <>
              <ImagePlus className="size-8" />
              <span>Click to upload a cover (max 5 MB)</span>
            </>
          )}
          {preview && <span className="text-xs">Click to change the image</span>}
        </label>
        <input id="image" type="file" accept="image/*" onChange={onFile} className="sr-only" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={form.description} onChange={set("description")} required rows={5} placeholder="What is this book about?" />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Added by</Label>
          <Input value={book?.ownerName ?? session?.user.name ?? ""} readOnly className="h-10" />
        </div>
        <div className="space-y-2">
          <Label>Owner email</Label>
          <Input value={book?.ownerEmail ?? session?.user.email ?? ""} readOnly className="h-10" />
        </div>
        <div className="space-y-2">
          <Label>Date added</Label>
          <Input value={formatDate(book?.createdAt ?? new Date())} readOnly className="h-10" />
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        <Button type="button" variant="outline" size="lg" className="h-10 px-5" onClick={() => router.push("/my-books")} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" size="lg" className="h-10 px-6" disabled={loading}>
          {loading && <Loader2 className="size-4 animate-spin" />} {editing ? "Save changes" : "Add book"}
        </Button>
      </div>
    </form>
  );
}
