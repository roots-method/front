import type { Metadata } from "next";
import Link from "next/link";
import InlineSvg from "@/components/InlineSvg";
import { BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Your AI digital partner for enterprise operations",
  description:
    "Turn complex, manual work into connected systems that move with your business. Arka designs AI software, workflow intelligence, and operations infrastructure for enterprise teams.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Arka — Your AI digital partner",
    description:
      "Turn complex, manual work into connected systems that move with your business.",
    images: [{ url: "/assets/arka-social-card.png", width: 1200, height: 630, alt: "Arka — Systems that move" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arka — Your AI digital partner",
    description: "Turn complex, manual work into connected systems that move with your business.",
    images: ["/assets/arka-social-card.png"],
  },
};

const PILLARS = [
  {
    href: "/software",
    label: "Software",
    title: "Build Custom AI Solutions",
    body: "Software that complements your existing profit-making machine. Not because of AI, but because real humans make it happen.",
    cta: "Explore software",
  },
  {
    href: "/products",
    label: "Products",
    title: "Deploy World-Class Products",
    body: "Google Workspace, Zoho, CRM, sales platforms the everyday tools your team already trusts. We can help you deploy and configure so your team can start using from day one.",
    cta: "Explore products",
  },
  {
    href: "/contact",
    label: "Support",
    title: "Back-office and Operations",
    body: "Continuity of back-office operations and monthly maintenance across your digital ecosystem. And yes, that includes the cloud infrastructure supporting it.",
    cta: "Explore support",
  },
];

// What the reader is actually agreeing to, sat under the button rather than
// above it — this is where the hesitation is, so this is where it is answered.
const CONSULT_REASSURANCE = [
  "Free, and free of a pitch",
  "40 minutes, one call",
  "No commitment either way",
];

const INDUSTRIES = [
  "Logistics",
  "Healthcare",
  "Finance",
  "B2B Technology",
  "Distribution",
  "Professional Services",
];

const TESTIMONIALS = [
  {
    quote:
      "Arka eliminated 40 hours of manual reporting from our week in under two months. The system keeps improving, we haven't touched it since deployment.",
    name: "VP Operations",
    role: "At Global Logistics Enterprise Firm.",
  },
  {
    quote:
      "We went from email chains and spreadsheets to a fully automated back-office in six weeks. Our team now focuses on decisions, not data entry.",
    name: "COO",
    role: "At Healthcare Distribution Warehouse Center",
  },
  {
    quote:
      "The ROI Blueprint alone changed how we think about operations. They found inefficiencies we'd been ignoring for years and had a fix deployed within a month.",
    name: "Director of Operations",
    role: "At B2B Technology Wholesale / Reseller",
  },
];

const CLIENTS = [
  { src: "IBM-logo.svg", alt: "IBM", modifier: "" },
  { src: "JP-Morgan-Chase-Logo.svg", alt: "JPMorgan Chase & Co.", modifier: "client-bar__logo--jpm" },
  { src: "kroger-logo.svg", alt: "Kroger", modifier: "client-bar__logo--kroger" },
  { src: "capital-one-logo.svg", alt: "Capital One", modifier: "client-bar__logo--capone" },
];


export default function HomePage() {
  return (
    <div className="home-editorial">
      <section className="home-editorial__hero" aria-labelledby="home-title">
        <div className="home-editorial__hero-copy">
          <p className="home-editorial__eyebrow">For enterprise operations teams</p>
          <h1 id="home-title">Your only AI digital partner.</h1>
          <p className="home-editorial__lede">
            A partner for your enterprise operations—turning complex, manual work into systems that move with you.
          </p>
          <div className="home-editorial__actions">
            <Link className="home-editorial__button" href="/contact">
              Start a conversation <span aria-hidden="true">↗</span>
            </Link>
            <a className="home-editorial__text-link" href="#what-arka-does">
              Explore capabilities <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="home-editorial__art" aria-hidden="true">
          <InlineSvg src="/assets/art/hero-cubes.svg" className="home-editorial__art-grid" />
          <span className="home-editorial__orb home-editorial__orb--large" />
          <span className="home-editorial__orb home-editorial__orb--dark" />
          <span className="home-editorial__orb home-editorial__orb--small" />
          <span className="home-editorial__art-label">Connected systems.<br />Decisive outcomes.</span>
          <span className="home-editorial__art-index">01 / FLOW</span>
        </div>
      </section>

      <section className="home-editorial__services" aria-labelledby="what-arka-does">
        <div className="home-editorial__section-heading">
          <p className="home-editorial__eyebrow">What Arka does</p>
          <h2 id="what-arka-does">Bring AI to your digital ecosystem.</h2>
          <p>We develop AI software, connect the systems you already run, and make the work between them flow.</p>
        </div>
        <div className="home-editorial__service-grid">
          {PILLARS.map((pillar, index) => (
            <Link className="home-editorial__service" href={pillar.href} key={pillar.href}>
              <span className="home-editorial__service-index">0{index + 1}</span>
              <span className="home-editorial__service-label">{pillar.label}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
              <span className="home-editorial__service-link">{pillar.cta} <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-editorial__consult" aria-labelledby="free-consult">
        <p className="home-editorial__eyebrow">Free consultation</p>
        <h2 id="free-consult">Bring the process that costs you most.</h2>
        <p>We’ll find the workflow worth fixing first, then outline the route to a measurable return.</p>
        <a className="home-editorial__button" href={BOOKING_URL} target="_blank" rel="noopener">
          Claim a free 40-min call <span aria-hidden="true">↗</span>
        </a>
        <ul>
          {CONSULT_REASSURANCE.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="home-editorial__industries" aria-label="Industries served">
        <p className="home-editorial__eyebrow">Industries served</p>
        <ul>{INDUSTRIES.map((industry) => <li key={industry}>{industry}</li>)}</ul>
      </section>

      <section className="home-editorial__perspectives" aria-labelledby="client-perspectives">
        <div className="home-editorial__perspectives-heading">
          <p className="home-editorial__eyebrow">Client perspectives</p>
          <h2 id="client-perspectives">The work feels lighter when the system does its share.</h2>
        </div>
        <div className="home-editorial__testimonial-grid">
          {TESTIMONIALS.map((t, index) => (
            <blockquote className="home-editorial__testimonial" key={t.name}>
              <span>0{index + 1}</span>
              <p>&ldquo;{t.quote}&rdquo;</p>
              <footer><strong>{t.name}</strong><small>{t.role}</small></footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="home-editorial__clients" aria-label="Our clients">
        <p className="home-editorial__eyebrow">Trusted by employees at</p>
        <div>
          {CLIENTS.map((c) => (
            <img key={c.src} className={`home-editorial__client-logo ${c.modifier}`.trim()} src={`/assets/clients/${c.src}`} alt={c.alt} loading="lazy" />
          ))}
        </div>
      </section>

      <section className="home-editorial__closing" aria-labelledby="closing-title">
        <p className="home-editorial__eyebrow">Ready when you are</p>
        <h2 id="closing-title">The gap between where you are and where you want to be is a systems problem. Let’s close it.</h2>
        <ol>
          <li><span>01</span>Book a 40-min scoping call. No commitment required.</li>
          <li><span>02</span>We map your highest-value workflow opportunity.</li>
          <li><span>03</span>You receive a tailored ROI Blueprint within 5 business days.</li>
        </ol>
        <a className="home-editorial__closing-button" href={BOOKING_URL} target="_blank" rel="noopener">Schedule a call <span aria-hidden="true">↗</span></a>
      </section>
    </div>
  );
}
