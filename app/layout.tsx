"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/NavBar";
import CustomToaster from "@/components/CustomToaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Home | SEA Cinema",
  description: "Home Page SEA Cinema",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Navbar state
  const [navBarExpand, setNavBarExpand] = useState(false);
  const pathname = usePathname();

  // Reset state when change route
  useEffect(() => {
    setNavBarExpand(false);
  }, [pathname]);

  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`bg-custom-soft-black flex min-h-screen flex-col ${
          navBarExpand && "h-screen overflow-hidden"
        }`}
      >
        <SessionProvider>
          <NavBar
            navBarExpand={navBarExpand}
            setNavBarExpand={setNavBarExpand}
          />
          {children}
          <CustomToaster />
        </SessionProvider>
      </body>
    </html>
  );
}
