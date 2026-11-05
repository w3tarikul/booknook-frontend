import { headers } from "next/headers";
import { SignJWT } from "jose";
import { auth } from "@/lib/auth";

// Issues a short-lived JWT for the Express API, only for signed-in users
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return Response.json({ message: "Please log in to continue." }, { status: 401 });
  }
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ name: session.user.name, email: session.user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.user.id)
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
  return Response.json({ token });
}
