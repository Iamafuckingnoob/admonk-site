import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
// FIX: Geist fonts come from the geist/font package, not next/font/google
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Suspense } from "react";
import { Analytics } from "../components/ui/analytics";





// ---- Site constants from env (edit .env.local) ----


const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://flowandfunnel.com"
    : "http://localhost:3000");


const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Flow & Funnel";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://admonk-digital-2025.vercel.app";

const titleDefault = `${siteName} — Lean marketing. Real outcomes.`;
const description =
  "We build fast websites, Shopify/Wix stores, Meta ads, and WhatsApp funnels with clean tracking and clear weekly updates.";

// ---- Fonts ----
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
// Keep your existing variable names so className below stays the same
const geistSans = GeistSans;
const geistMono = GeistMono;

// ---- SEO (Next.js Metadata API) ----
// MERGE: You had two `export const metadata`. This is the single, merged one.

export const metadata = {
  title: "Flow & Funnel",
  description: "Solo-first growth studio",
  openGraph: {
    title: "Flow & Funnel",
    description: "Solo-first growth studio",
    url: "https://admonk-digital-2025.vercel.app",
    siteName: "Flow & Funnel",
    images: ["/og.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flow & Funnel",
    description: "Solo-first growth studio",
    images: ["/og.png"],
  },
} as const;


// Viewport (you already referenced this type)
export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "light dark",
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Flow & Funnel",
      "url": "https://admonk-digital-2025.vercel.app",
      "logo": "https://admonk-digital-2025.vercel.app/og.png",
      "sameAs": []
    }),
  }}
/>


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
        <Suspense fallback={null}>
          {children}
        </Suspense>

        {/* JSON-LD: Organization */}
        <Script
          id="ld-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteName,
              url: siteUrl,
              logo: `${siteUrl}/favicon.ico`,
              sameAs: [],
            }),
          }}
        />

        {/* JSON-LD: WebSite */}
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteName,
              url: siteUrl,
            }),
          }}
        />
{GA_ID && (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      strategy="afterInteractive"
    />
    <Script id="ga-init" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        // TEMP: auto-send first page_view so we can verify in Network
        gtag('config', '${GA_ID}', { anonymize_ip: true, send_page_view: false });

      `}
    </Script>

    {/* keeps route-change tracking ready for later */}
    {GA_ID && <Analytics gaId={GA_ID} />}
  </>
)}

        
              </body>
    </html>
  );
}
