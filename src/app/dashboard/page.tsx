import { Skeleton } from "@/components/ui/skeleton";
import ActivityOverview from "@/components/dashboard/ActivityOverview";
import MainActions from "@/components/dashboard/MainActions";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import NavbarWrapper from "@/components/NavbarWrapper";
import { currentUser } from "@clerk/nextjs/server";

async function DashboardPage() {
  const user = await currentUser();

  // Redirect to home if not signed in
  if (!user) {
    return (
      <>
        <NavbarWrapper />
        <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground">Please sign in to access the dashboard.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarWrapper />

      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <WelcomeSection />
        <MainActions />
        <ActivityOverview />
      </div>
    </>
  );
}
export default DashboardPage;