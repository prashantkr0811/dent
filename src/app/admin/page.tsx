import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

async function AdminPage() {
  const user = await currentUser();

  // User is not logged in -> send to home (or /sign-in if you prefer)
  if (!user) {
    redirect("/");
  }

  // Get admin email from env (make sure this is set in Vercel!)
  const adminEmail = process.env.ADMIN_EMAIL;

  // If admin email is not configured, don't allow access
  if (!adminEmail) {
    // You could also throw an error here in dev, but in prod a redirect is safer
    redirect("/");
  }

  // Get the user's primary email (safer than just [0])
  const primaryEmail =
    user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress ?? user.emailAddresses[0]?.emailAddress ?? null;

  // If no email or mismatch -> NOT admin
  if (
    !primaryEmail ||
    primaryEmail.toLowerCase() !== adminEmail.toLowerCase()
  ) {
    // IMPORTANT: avoid redirecting to /dashboard to prevent loops
    // if /dashboard also has logic that can redirect back to /admin.
    redirect("/");
  }

  // At this point, user is authenticated AND matches admin email
  return <AdminDashboardClient />;
}

export default AdminPage;
