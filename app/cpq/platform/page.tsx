import type { Metadata } from "next";
import { Suspense } from "react";
import PlatformApp from "@/components/platform/PlatformApp";

export const metadata: Metadata = {
  title: "Manufacturing Intake Platform",
  description: "A private Arka prototype for capacity-aware manufacturing inquiries, quotes, and orders.",
  robots: { index: false, follow: false },
};

export default function PlatformPage() {
  return <Suspense fallback={<div className="platform-loading">Loading manufacturing platform...</div>}><PlatformApp /></Suspense>;
}
