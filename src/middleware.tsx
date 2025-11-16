// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Routes that should NOT require auth:
  publicRoutes: [
    "/",              // landing
    "/sign-in(.*)",   // Clerk sign-in
    "/sign-up(.*)",   // Clerk sign-up
    "/api/webhook(.*)"
  ],
});

export const config = {
  // Match everything except static files and _next
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
