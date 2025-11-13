import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

// middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const ADMIN_PATH = "/admin";

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // If request is not under /admin, do nothing
//   if (!pathname.startsWith(ADMIN_PATH)) return NextResponse.next();

//   // Example check: cookie or header indicating admin role
//   const isAdmin = req.cookies.get("isAdmin")?.value === "true";

//   if (!isAdmin) {
//     // redirect to dashboard if user is not admin
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

//   return NextResponse.next();
// }

// // apply to routes (next.config or export matcher)
// export const config = {
//   matcher: ["/admin/:path*"],
// };
