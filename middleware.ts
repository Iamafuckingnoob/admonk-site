// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
];

export function middleware(req: NextRequest) {
  // Make a copy we can edit
  const url = req.nextUrl.clone();
  const src = url.searchParams.get("utm_source");

  // If the visitor came via ChatGPT, strip common UTM params
  if (src && /chatgpt/i.test(src)) {
    UTM_KEYS.forEach((k) => url.searchParams.delete(k));
    // Redirect to the clean URL (keeps any non-UTM params intact)
    return NextResponse.redirect(url, 307);
  }

  return NextResponse.next();
}

// Run this middleware on all routes
export const config = { matcher: ["/:path*"] };
