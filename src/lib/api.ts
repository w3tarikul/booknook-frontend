const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  createdAt: string;
}

export interface Borrow {
  _id: string;
  bookId: string;
  title: string;
  image: string;
  borrowDate: string;
  returnDate: string;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function getToken(): Promise<string> {
  const res = await fetch("/api/token", { cache: "no-store" });
  if (!res.ok) throw new ApiError("Please log in to continue.", 401);
  return (await res.json()).token;
}

export async function api<T>(path: string, options: RequestInit & { auth?: boolean } = {}): Promise<T> {
  const { auth, headers, ...rest } = options;
  const finalHeaders: Record<string, string> = { "Content-Type": "application/json", ...(headers as Record<string, string>) };
  if (auth) finalHeaders.Authorization = `Bearer ${await getToken()}`;
  let res: Response;
  try {
    res = await fetch(`${API}${path}`, { ...rest, headers: finalHeaders, cache: "no-store" });
  } catch {
    throw new ApiError("We could not reach the BookNook server. Please try again.", 0);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(data.message || "Something went wrong.", res.status);
  return data as T;
}

export const CATEGORIES = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "Technology",
  "History",
  "Biography",
  "Fantasy",
  "Mystery",
  "Self-Help",
  "Children",
];
