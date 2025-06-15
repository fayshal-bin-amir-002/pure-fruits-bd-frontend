import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/auth";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  ADMIN: [/^\/dashboard/],
  USER: [/^\/my-orders/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `${process.env.NEXT_PUBLIC_WEB_URL}/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }
  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(`/`, request.url));
    }
  }
};

export const config = {
  matcher: [
    "/login",
    "/register",
    "/my-orders",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
