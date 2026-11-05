import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const MAX_BYTES = 4 * 1024 * 1024;

// Signed-in users upload a cover here; the imgbb key stays on the server
export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return Response.json({ message: "Please log in to upload an image." }, { status: 401 });

  const key = process.env.IMGBB_KEY;
  if (!key) return Response.json({ message: "Image upload is not set up yet." }, { status: 500 });

  const form = await request.formData().catch(() => null);
  const file = form?.get("image");
  if (!(file instanceof File)) return Response.json({ message: "Please choose an image file." }, { status: 400 });
  if (!file.type.startsWith("image/")) return Response.json({ message: "Please choose an image file." }, { status: 400 });
  if (file.size > MAX_BYTES) return Response.json({ message: "Please choose an image smaller than 4 MB." }, { status: 400 });

  const body = new FormData();
  body.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.data?.url) {
    return Response.json({ message: "The image upload did not work. Please try again." }, { status: 502 });
  }
  return Response.json({ url: data.data.url as string });
}
