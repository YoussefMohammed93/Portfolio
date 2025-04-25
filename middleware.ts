import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if user is authenticated
  const adminSession = request.cookies.get("adminSession");
  const isAuthenticated = adminSession ? true : false;
  const { pathname } = request.nextUrl;

  // If user is on admin page and is authenticated, redirect to dashboard
  if (pathname === "/admin" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is on dashboard and is not authenticated, redirect to admin login
  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/dashboard/:path*"],
};
