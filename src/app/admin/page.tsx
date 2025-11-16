import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

async function AdminPage() {
  // Wrap in try/catch so any unexpected error redirects instead of 500
  try {
    const user = await currentUser();

    // user is not logged in
    if (!user) {
      redirect("/");
    }

    // Get admin email from env (MAKE SURE THIS IS SET IN VERCEL)
    const adminEmail = process.env.ADMIN_EMAIL;

    // If no admin email configured, do not allow access to /admin
    if (!adminEmail) {
      // In dev you might want to throw, but in prod redirect is safer
      redirect("/");
    }

    // Safely get the user's primary email
    const primaryEmail =
      user.emailAddresses.find(
        (email) => email.id === user.primaryEmailAddressId
      )?.emailAddress ??
      user.emailAddresses[0]?.emailAddress ??
      null;

    // If user has no email or it doesn't match the admin email -> not admin
    if (
      !primaryEmail ||
      primaryEmail.toLowerCase() !== adminEmail.toLowerCase()
    ) {
      // IMPORTANT: redirect to a PUBLIC route to avoid loops
      redirect("/");
    }

    // If we reached here, user is authenticated AND is the admin
    return <AdminDashboardClient />;
  } catch (error) {
    // This prevents a hard 500 if something unexpected happens
    console.error("Error in AdminPage:", error);
    redirect("/");
  }
}

export default AdminPage;
