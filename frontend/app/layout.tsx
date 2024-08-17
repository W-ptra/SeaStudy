import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";

// Components Import
import Navbar from "@/components/Navbar";
import SnowfallComponent from '@/components/Snowfall'
import { Toaster } from "@/components/ui/sonner"

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

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
      <body className={`${poppins.className} relative w-full h-full`}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
