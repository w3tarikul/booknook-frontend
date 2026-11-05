// Uploads an image through our own API route (which forwards it to imgbb) and returns its public URL
export async function uploadImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");
  if (file.size > 4 * 1024 * 1024) throw new Error("Please choose an image smaller than 4 MB.");
  const body = new FormData();
  body.append("image", file);
  const res = await fetch("/api/upload", { method: "POST", body });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.url) throw new Error(data?.message || "The image upload did not work. Please try again.");
  return data.url as string;
}
