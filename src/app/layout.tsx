import "./globals.css";
import type { Metadata } from "next";

// 1) Fonts
import { Poppins } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";

// 2) Configure fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 3) SEO / metadata (optional: update to your site info)
export const metadata: Metadata = {
  title: "Admonk Digital — Lean marketing. Real outcomes.",
  description: "Websites, ads, and WhatsApp funnels built fast with an earthy, high-contrast palette.",
};

// 4) Apply Poppins to <body>, keep Geist variables available
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
