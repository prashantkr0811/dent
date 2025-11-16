// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes should be PROTECTED (require login)
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",  // protect /dashboard and anything under it
  "/admin(.*)",      // protect /admin (optional, remove if you don't have this)
]);

export default clerkMiddleware(async (auth, req) => {
  // Only protect specific routes
  if (isProtectedRoute(req)) {
    await auth.protect();   // ✅ correct usage
  }
  // All other routes stay public
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
