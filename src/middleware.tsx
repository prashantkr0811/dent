// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",              // landing page
  "/sign-in(.*)",   // Clerk sign-in
  "/sign-up(.*)",   // Clerk sign-up
  "/api/webhook(.*)",
]);

export default clerkMiddleware((auth, req) => {
  // Allow public routes without auth
  if (isPublicRoute(req)) return;

  // Protect everything else (e.g. /dashboard, /admin, etc.)
  auth().protect();
});

export const config = {
  matcher: [
    // Run middleware on all routes except static files and _next
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
