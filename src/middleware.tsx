// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Routes that REQUIRE authentication
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/admin(.*)",
  "/appointments(.*)",
  "/voice(.*)",
  "/pro(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Only protect the routes we explicitly marked as protected
  if (isProtectedRoute(req)) {
    await auth.protect(); // redirects to Clerk sign-in if not authenticated
  }

  // All other routes remain public
});

export const config = {
  matcher: [
    // Run middleware on all non-static routes (excluding _next and static assets)
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // And on all API/TRPC routes
    "/(api|trpc)(.*)",
  ],
};
