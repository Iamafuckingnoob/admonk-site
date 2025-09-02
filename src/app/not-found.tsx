import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true }, // keep 404s out of the index
  title: "Page not found",
  description: "This page doesn’t exist on Flow & Funnel.",
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-4xl font-bold">404 — Not found</h1>
      <p className="mt-4 text-balance text-muted-foreground">
        The page you’re looking for doesn’t exist or was moved.
      </p>
      <div className="mt-8">
        <Link className="inline-block rounded-2xl border px-4 py-2" href="/">
          Back to home
        </Link>
      </div>
    </main>
  );
}
