import type { Metadata } from "next";
import HomeClient from "../components/ui/home-client";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Performance marketing, funnels, and conversion-led growth. We design flows that convert and funnels that scale.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomeClient />;
}
