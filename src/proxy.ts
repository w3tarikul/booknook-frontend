import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const privatePrefixes = ["/add-book", "/my-books", "/my-borrows", "/profile"];

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isPrivate =
    privatePrefixes.some((p) => pathname === p || pathname.startsWith(p + "/")) ||
    /^\/books\/[^/]+/.test(pathname);

  if (isPrivate && !getSessionCookie(request)) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/add-book/:path*", "/my-books/:path*", "/my-borrows/:path*", "/profile/:path*", "/books/:id+"],
};
