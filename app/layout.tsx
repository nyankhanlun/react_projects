import localFont from 'next/font/local';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SetListProvider } from '@/context/SetListContext';

const bravura = localFont({
  src: './fonts/Bravura.otf',
  variable: '--font-bravura',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Worship Library",
  description: "Easy to Search Chord and Lyrics",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bravura`}
      >
       <SetListProvider>
          {children}
        </SetListProvider>
      </body>
    </html>
  );
}
