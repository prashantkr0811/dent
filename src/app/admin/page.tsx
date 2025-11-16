import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminPage() {
  try {
    const user = await currentUser();

    // Not logged in — send to home
    if (!user) {
      return redirect("/");
    }

    // Must exist in Vercel → Settings → Environment Variables
    const adminEmail = process.env.ADMIN_EMAIL;

    // If not configured → deny access safely
    if (!adminEmail) {
      console.warn("ADMIN_EMAIL is missing from env.");
      return redirect("/");
    }

    // Always get the primary email first
    const primaryEmail =
      user.emailAddresses.find(
        (email) => email.id === user.primaryEmailAddressId
      )?.emailAddress ||
      user.emailAddresses[0]?.emailAddress ||
      null;

    // No email? Or mismatch? => Not admin
    if (
      !primaryEmail ||
      primaryEmail.toLowerCase() !== adminEmail.toLowerCase()
    ) {
      return redirect("/");
    }

    // Fully authenticated & authorized
    return <AdminDashboardClient />;
  } catch (err) {
    console.error("AdminPage error:", err);
    return redirect("/");
  }
}
