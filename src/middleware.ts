import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./lib/utils";

export async function middleware(request: NextRequest) {
  try {
    const cookie = request.headers.get("cookie") || "";
    const IsAuthenticated = await isAuthenticated(cookie);

    if (request.nextUrl.pathname === "/login" && IsAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!IsAuthenticated && request.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    if (request.nextUrl.pathname !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|register|$).*)"],
};
