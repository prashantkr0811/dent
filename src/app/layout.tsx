import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dental Assistant - AI Powered Dental Assistant",
  description: "Get assistant by the AI powered tool Available for 24X7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      variables:{
        colorPrimary:"#e78a53",
        colorBackground:"#f3f4f6",
        colorText:"#111827",
        colorTextSecondary:"#6b7280",
        colorInputForeground:"#f3f4f6"
      }
    }}
    >
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
