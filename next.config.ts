import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // cache images, icons, fonts, etc. for 1 year
        source:
          "/:all*(png|jpg|jpeg|gif|svg|webp|ico|avif|woff|woff2|ttf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // cache the web manifest for 1 day
        source: "/site.webmanifest",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      { source: "/services", destination: "/?section=services", permanent: true },
      { source: "/offers",   destination: "/?section=offers",   permanent: true },
      { source: "/pricing",  destination: "/?section=pricing",  permanent: true },
      { source: "/faq",      destination: "/?section=faq",      permanent: true },
      { source: "/contact",  destination: "/?section=contact",  permanent: true },
    ];
  },
};

export default nextConfig;
