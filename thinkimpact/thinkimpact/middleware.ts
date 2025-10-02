import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const protectedRoutes = ["/dashboard", "/reset-password", "/change-password"];
const adminRoutes = ["/dashboard"];
const authRoutes = ["/admin/login", "/admin/register", "/forgot-password"];

export async function middleware(req: NextRequest) {
  // 1) ميدلوير الترجمة
  const i18nResponse = handleI18nRouting(req);
  if (i18nResponse) {
    // إذا الترجمة بدها تعمل redirect أو rewrite
    if (i18nResponse.redirected || i18nResponse.headers.get("location")) {
      return i18nResponse;
    }
  }

  // 2) ميدلوير الحماية (Auth)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { nextUrl } = req;

  const isLoggedIn = !!token;
  const role = token?.role;

  const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isAdminRoutes = adminRoutes.includes(nextUrl.pathname);
  const isOnAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isOnProtectedRoute && !isLoggedIn) {
    let callbackURL = nextUrl.pathname;
    if (nextUrl.search) callbackURL += nextUrl.search;
    const encodedCallbackURL = encodeURIComponent(callbackURL);

    return NextResponse.redirect(
      new URL(`/?callbackURL=${encodedCallbackURL}`, req.url)
    );
  }

  if (isOnAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isAdminRoutes && isLoggedIn && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // إذا ما في أي شرط تحقق → خلي الطلب يمر عادي
  return i18nResponse ?? NextResponse.next();
}

// config مشترك بين الاثنين
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|trpc|.*\\..*).*)",
  ],
};
