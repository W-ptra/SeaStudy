import type { Metadata } from "next";
import "./globals.css";

// Components Import
import Navbar from "@/components/Navbar";
import SnowfallComponent from '@/components/Snowfall'
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "SeaStudy",
  description: "Compfest 16 SEA Academy - Team Sigma Rizz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='font-satoshi relative w-full h-full'>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
