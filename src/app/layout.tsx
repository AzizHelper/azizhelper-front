import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeroNav from "@/app/components/hero-nav";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { Alexandria } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });
const alexandria = Alexandria({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AzizHelper",
  description: "A Chatbot to help King Aziz University students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={alexandria.className}>
          <HeroNav />
          {children}
        </div>
      </body>
    </html>
  );
}
