import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("auth_token")?.value;
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  const user = token ? { role: "admin" } : null;

  if (!user && request.nextUrl.pathname !== "/home") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (isAdminRoute) {
    if (user?.role !== "admin") {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
  else
  {
    if (user?.role === "admin" && request.nextUrl.pathname !== "/admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
    matcher: [ "/((?!api|_next/static|_next/image|favicon.ico).*)" ],
};