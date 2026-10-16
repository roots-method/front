import type { Metadata, Viewport } from "next";
import { DM_Sans, Nunito_Sans, Urbanist } from "next/font/google";
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

// DM Sans is the display face for headings, hero copy, and subheadings. Italic
// is loaded because those styles use <em> in several page headlines.
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Urbanist is introduced on the refreshed home page first. Keeping it as a
// separate token lets the remaining routes retain their current typography
// until their redesigns are ready.
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urbanist",
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
  // The small-size mark, not the full-colour one: at favicon size the full logo's
  // grey node is ~1.2:1 against a white tab and disappears. The PNGs cover
  // browsers without SVG favicons, and Apple fills a transparent touch icon with
  // black, so that one is drawn on a white tile.
  icons: {
    icon: [{ url: "/assets/arka-mark-mono.png", type: "image/png", sizes: "512x512" }],
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
  themeColor: "#A7BBC0",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below may add data-theme to
    // this element before React hydrates, and that difference is intended.
    <html
      lang="en"
      className={`${nunito.variable} ${dmSans.variable} ${urbanist.variable}`}
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
