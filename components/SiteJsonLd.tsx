import { SITE_URL, SOCIAL } from "@/lib/site";

const SERVICES = [
  {
    name: "ROI Blueprint",
    description:
      "Operations diagnostic that identifies automation opportunities and quantifies the business case before any build begins.",
  },
  {
    name: "AI Automation",
    description:
      "Design and deployment of multi-agent AI systems that resolve high-volume, rule-bound workflows autonomously.",
  },
  {
    name: "Workflow Intelligence",
    description:
      "Intelligent routing, prioritization, and decision support embedded into existing operational workflows.",
  },
  {
    name: "Back-Office Operations",
    description:
      "End-to-end automation of back-office functions including finance, compliance, onboarding, and data reconciliation.",
  },
];

/**
 * The Organization and WebSite nodes, rendered once in the root layout. Case
 * studies and blog posts reference these by @id (#org, #website), so they have
 * to be present on every page those graphs appear on — which is why this lives
 * in the layout rather than on the home page as it did before.
 */
export default function SiteJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${SITE_URL}/#org`,
        name: "Arka",
        alternateName: "Arka AI Automation",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/arkaflow-newlogo.svg` },
        sameAs: [SOCIAL.linkedin.split("?")[0], SOCIAL.x],
        description:
          "Arka builds intelligent software for enterprise operations, replacing slow manual processes with AI systems that sharpen margins and compound in value.",
        areaServed: "Worldwide",
        knowsAbout: [
          "Business Process Automation",
          "AI Automation",
          "Workflow Intelligence",
          "Operations Consulting",
          "Back-Office Operations",
          "Agentic AI Systems",
          "ROI Analysis",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "AI Operations Services",
          itemListElement: SERVICES.map((service) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", ...service },
          })),
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          url: `${SITE_URL}/contact`,
          availableLanguage: "English",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Arka",
        publisher: { "@id": `${SITE_URL}/#org` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
