"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <SessionProvider session={session}>
          <Nav />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
