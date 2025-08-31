import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from 'react'


// ---- Site constants from env (edit .env.local) ----
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ---- SEO (Next.js Metadata API) ----
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: titleDefault,
    template: `%s — ${siteName}`,
  },
  description,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: titleDefault,
    siteName,
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: siteName }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

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

        {/* GA4 — single block, NO event handlers */}
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
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true, send_page_view: true });

                // test event so you can see 'collect' in Network
                setTimeout(() => {
                  if (typeof gtag === 'function') {
                    gtag('event', 'debug_test_ping', { debug_mode: true });
                  }
                }, 800);
              `}
            </Script>
          </>
        )}
        {/* DEBUG: print GA ID at runtime (so you can see it on Vercel) */}


{/* GA4 (loader in <head>, init after hydration) */}
{process.env.NEXT_PUBLIC_GA_ID && (
  <>
    {/* goes to <head> */}
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      strategy="beforeInteractive"
    />
    {/* runs after the app is interactive */}
    <Script id="ga-init" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
          anonymize_ip: true,
          send_page_view: true
        });
      `}
    </Script>
  </>
)}

      </body>
    </html>
  );
}
