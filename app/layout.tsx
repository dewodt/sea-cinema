"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { useState, useEffect, createContext } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/NavBar";
import CustomToaster from "@/components/CustomToaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const PopUpContext = createContext({});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Navbar state
  const [navBarExpand, setNavBarExpand] = useState(false);
  const pathname = usePathname();

  // Popup state
  const [popUp, setPopUp] = useState<undefined | React.ReactNode>(undefined);

  // Reset state when change route
  useEffect(() => {
    setNavBarExpand(false);
    setPopUp(undefined);
  }, [pathname]);

  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`flex min-h-screen flex-col bg-custom-soft-black ${
          (navBarExpand || popUp) && "h-screen overflow-hidden"
        }`}
      >
        <SessionProvider>
          <PopUpContext.Provider value={setPopUp}>
            <NavBar
              navBarExpand={navBarExpand}
              setNavBarExpand={setNavBarExpand}
            />
            {children}
            {popUp && <>{popUp}</>}
            <CustomToaster />
          </PopUpContext.Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
