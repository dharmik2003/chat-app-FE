import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PRIVATE_ROUTER, PUBLIC_ROUTER, USER_ID_COOKIE } from "./constant";

export async function middleware(request: NextRequest) {
  const userId = request.cookies.get(USER_ID_COOKIE)?.value;
  const currentPathname = request.nextUrl.pathname;

  console.log("userId:", userId, "Path:", currentPathname);

  if (currentPathname === "/") {
    return userId
      ? NextResponse.redirect(new URL(PRIVATE_ROUTER.DASHBOARD, request.url))
      : NextResponse.redirect(new URL(PUBLIC_ROUTER.LOGIN, request.url));
  }

  if (
    userId &&
    (currentPathname === PUBLIC_ROUTER.LOGIN ||
      currentPathname === PUBLIC_ROUTER.REGISTER)
  ) {
    return NextResponse.redirect(
      new URL(PRIVATE_ROUTER.DASHBOARD, request.url)
    );
  }

  if (!userId && isProtectedRoute(PRIVATE_ROUTER, currentPathname)) {
    return NextResponse.redirect(new URL(PUBLIC_ROUTER.LOGIN, request.url));
  }

  return NextResponse.next();
}

function isProtectedRoute(privateRoutes: any, pathname: string): boolean {
  return Object.values(privateRoutes).includes(pathname);
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard"],
};
