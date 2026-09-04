import type { Metadata } from "next";
import { Barlow, Nunito_Sans } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PrivacyModal from "@/components/PrivacyModal";
import CookieConsent from "@/components/CookieConsent";
import SiteJsonLd from "@/components/SiteJsonLd";
import { SITE_URL } from "@/lib/site";
import "@/styles/index.css";

// Self-hosted by next/font, so there is no render-blocking request to
// fonts.googleapis.com and no layout shift. The weights match what the old
// <link> asked for.
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

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
  icons: { icon: [{ url: "/assets/arkaflow-newlogo.svg", type: "image/svg+xml" }] },
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
    <html lang="en" className={`${barlow.variable} ${nunito.variable}`}>
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
