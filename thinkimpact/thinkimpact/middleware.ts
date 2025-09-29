import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/dashboard", "/reset-password","/change-password"];

const adminRoutes = ["/dashboard"];

const authRoutes = ["/admin/login", "/admin/register", "/forgot-password"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { nextUrl } = req;

  const isLoggedIn = !!token;

  const role = token?.role;

  const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

  const isAdminRoutes = adminRoutes.includes(nextUrl.pathname);

  const isOnAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isOnProtectedRoute && !isLoggedIn) {
    let callbackURL = nextUrl.pathname;

    if (nextUrl.search) {
      callbackURL += nextUrl.search;
    }
    const encodedCallbackURL = encodeURIComponent(callbackURL);
    return NextResponse.redirect(
      new URL(`/?callbackURL=${encodedCallbackURL}`, req.url)
    );
  }

  if (isOnAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isAdminRoutes && isLoggedIn) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
