import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PrivacyModal from "@/components/PrivacyModal";
import CookieConsent from "@/components/CookieConsent";
import SiteJsonLd from "@/components/SiteJsonLd";
import { SITE_URL } from "@/lib/site";
import "@/styles/index.css";

// Self-hosted by next/font, so there is no render-blocking request to
// fonts.googleapis.com and no layout shift. One family for body and headings;
// headings use every weight from 300 (the large process numerals) to 700.
const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Arka — AI for Enterprise Operations",
    template: "%s | Arka",
  },
  description:
    "Arka builds intelligent software for enterprise operations — replacing manual workflows with AI systems that cut costs, recover hours, and compound in value.",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  // The small-size mark, not the full-colour one: at favicon size the full logo's
  // grey node is ~1.2:1 against a white tab and disappears. The PNGs cover
  // browsers without SVG favicons, and Apple fills a transparent touch icon with
  // black, so that one is drawn on a white tile.
  icons: {
    icon: [
      { url: "/assets/arka-mark-small.svg", type: "image/svg+xml" },
      { url: "/assets/arka-icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/assets/arka-apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: "Arka",
    images: [{ url: "/assets/social-card.svg", width: 1200, height: 627 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@_jazoo",
    images: ["/assets/social-card.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body>
        <SiteJsonLd />
        <div className="site-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
        <PrivacyModal />
        <CookieConsent />
      </body>
    </html>
  );
}
