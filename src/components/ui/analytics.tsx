"use client";

import { useEffect } from "react";

type GTagParams = Record<string, unknown>;

export const track = (action: string, params?: GTagParams) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", action, {
    event_category: "engagement",
    event_label: typeof params?.label === "string" ? params.label : "",
    ...params,
  });
};

export function Analytics({ gaId }: { gaId: string }) {
  useEffect(() => {
    if (gaId) {
      track("page_view", { gaId });
    }
  }, [gaId]);

  return null;
}
