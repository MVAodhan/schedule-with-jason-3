"use client";

import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { Inter } from "next/font/google";

import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <Nav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
