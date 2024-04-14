import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { jwtVerify } from "jose";
const JWT_SECRET_ADMIN: string = process.env.JWT_SECRET_ADMIN as string;

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.includes(`login`)) {
    return;
  }
  if (!request.cookies.has("admin-token")) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }
  let tokenCookie = request.cookies.get("admin-token");
  console.log(tokenCookie);
  if (typeof tokenCookie?.value == `string`) {
    const { payload } = await jwtVerify(
      tokenCookie.value,
      new TextEncoder().encode(JWT_SECRET_ADMIN)
    );
    if (!payload) {
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};
