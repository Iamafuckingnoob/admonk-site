import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://flowandfunnel.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        // block internals if you have them:
        disallow: ["/api/", "/draft/", "/private/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
