import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <h1>Home Page</h1>

      <SignedOut>
        <SignUpButton mode="modal">Sign Up</SignUpButton>
        <SignInButton mode="modal">
          <Button variant="outline">Sign In</Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton>
          <Button variant="destructive">Logout</Button>
        </SignOutButton>
      </SignedIn>
    </div>
  );
}
