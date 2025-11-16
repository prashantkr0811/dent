// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import UserSync from "@/components/UserSync";
import TanStackProvider from "@/components/Providers/TanStackProviders";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DentWise - AI Powered Dental Assistant",
  description:
    "Get instant dental advice through voice calls with our AI assistant. Avaiable 24/7.",
};

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={publishableKey}
      appearance={{
        variables: {
          colorPrimary: "#e78a53",
          colorBackground: "#f3f4f6",
          colorText: "#111827",
          colorTextSecondary: "#6b7280",
          colorInputBackground: "#f3f4f6",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        >
          <TanStackProvider>
            <UserSync />
            <Toaster />
            {children}
          </TanStackProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
