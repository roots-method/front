import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PrivacyModal from "@/components/PrivacyModal";
import CookieConsent from "@/components/CookieConsent";
import SiteJsonLd from "@/components/SiteJsonLd";
import { SITE_URL } from "@/lib/site";
import "@/styles/index.css";
import "@/styles/case-ledger.css";
import "@/styles/warm-intelligence.css";

// Newsreader gives the marketing pages an editorial display voice. Inter stays
// in place for body copy, navigation, controls, and the CPQ platform.
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Arka — Your AI digital partner",
    template: "%s | Arka",
  },
  description:
    "Arka turns complex, manual enterprise work into connected systems that move with your business.",
  applicationName: "Arka",
  authors: [{ name: "Arka", url: SITE_URL }],
  creator: "Arka",
  publisher: "Arka",
  category: "Enterprise software and AI operations",
  keywords: [
    "enterprise operations",
    "AI automation",
    "workflow intelligence",
    "custom software",
    "systems design",
    "business process automation",
  ],
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  icons: {
    icon: [{ url: "/assets/arka-flow-mark.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    siteName: "Arka",
    locale: "en_US",
    url: "/",
    title: "Arka — Your AI digital partner",
    description: "Connected systems for enterprise operations that need to move with confidence.",
    images: [{ url: "/assets/arka-social-card.png", width: 1200, height: 630, alt: "Arka — Systems that move" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@_jazoo",
    creator: "@_jazoo",
    title: "Arka — Your AI digital partner",
    description: "Connected systems for enterprise operations that need to move with confidence.",
    images: ["/assets/arka-social-card.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#F6F3ED",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below may add data-theme to
    // this element before React hydrates, and that difference is intended.
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="light" />
        {/* Runs before first paint, so a returning dark-mode visitor never sees
            the light site flash first. Opt-in only: without a stored "dark" the
            page stays light, whatever the device prefers. The key must match
            THEME_KEY in components/ThemeToggle.tsx. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(localStorage.getItem("arka-theme")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}',
          }}
        />
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
