// proxy.ts — request edge handler (Next.js “proxy” convention)
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Legacy URLs that used `/en/...` or `/ar/...` → canonical path without locale
  const legacy = pathname.match(/^\/(en|ar)(\/.*)?$/);
  if (legacy) {
    url.pathname = legacy[2] && legacy[2].length > 0 ? legacy[2] : "/";
    return NextResponse.redirect(url);
  }

  const userToken = request.cookies.has("UserToken");
  const refreshToken = request.cookies.has("UserRefreshToken");
  const adminToken = request.cookies.has("AdminToken");
  const adminRefreshToken = request.cookies.has("AdminRefreshToken");

  const isAdminPath = pathname.startsWith("/admin");
  const isAdminLogin = pathname === "/admin/login";

  if (isAdminPath && !isAdminLogin && !adminToken && !adminRefreshToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isAdminLogin && (adminToken || adminRefreshToken)) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  const publicUserRoutes = [
    "/user/login",
    "/user/register",
    "/user/change-password",
  ];

  const isUserPath = pathname.startsWith("/user");
  const isPublicUserRoute = publicUserRoutes.includes(pathname);

  if (isUserPath && !isPublicUserRoute && !userToken && !refreshToken) {
    return NextResponse.redirect(new URL("/user/login", request.url));
  }

  if (isPublicUserRoute && (userToken || refreshToken)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
