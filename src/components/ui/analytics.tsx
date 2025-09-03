"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function Analytics({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId) return;
    const gtag = (window as any).gtag;
    if (typeof gtag !== "function") return;

    const url =
      pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    gtag("event", "page_view", {
      page_path: url,
      page_location: window.location.href,
    });
  }, [gaId, pathname, searchParams]);

  return null;
}
