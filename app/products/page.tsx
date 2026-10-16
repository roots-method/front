import type { Metadata } from "next";
import Link from "next/link";
import { BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products: Arka ONE",
  description:
    "Arka ONE brings Communication, Collaboration and Content together. We configure Zoho One, Google Workspace and your sales stack, then connect them so they behave like one system.",
  alternates: { canonical: "/products" },
  openGraph: {
    url: "/products",
    title: "Products: Arka ONE",
    description:
      "Make the tools your team already knows work the way you need them to be effective, proactive and accountable.",
    images: [{ url: "/assets/arka-social-card.png", width: 1200, height: 630, alt: "Arka ONE connected business tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products: Arka ONE",
    description: "Make the tools your team already knows work the way you need them to be effective, proactive and accountable.",
    images: ["/assets/arka-social-card.png"],
  },
};

const PLATFORMS = [
  {
    label: "Zoho One",
    title: "Built for you, built for business & built for Bharat.",
    body: "One licence, forty-odd applications, and a price that makes sense for a growing Indian business. We configure the pieces you will actually use and leave the rest out of your way.",
  },
  {
    label: "Google Workspace",
    title: "Get your familiarity with similarity.",
    body: "Gmail, Drive, Meet and Calendar behave exactly the way your team expects, because they already use them. We handle the domain, the migration and the admin policies underneath.",
  },
  {
    label: "CRM & Sales Tools",
    // No destination yet, so this one is a plain div with a badge rather than a link.
    badge: "Coming soon",
    title: "Ask us. We have special products on the way.",
    body: "Pipelines, quotes and follow-ups that your sales team will actually keep up to date. Tell us how you sell today and we will tell you what is coming.",
  },
];

const STEPS = [
  {
    num: "Stage 01",
    title: "We assess",
    body: "What you run today, what should move, and what it will cost in writing, before anything changes.",
  },
  {
    num: "Stage 02",
    title: "Migrate",
    body: "Mail, files and calendars move with their history, running alongside your old setup until it is proven.",
  },
  {
    num: "Stage 03",
    title: "Go live",
    body: "We cut over, walk your team through what changed, and stay reachable while everyone settles in.",
  },
];

const PANELS = [
  {
    icon: "read-me.svg",
    tag: "Stage 01",
    heading: "We read your whole setup first.",
    points: [
      "Every mailbox, drive and licence you pay for",
      "Which tools overlap, and what you can stop renewing",
      "A costed plan and a migration window",
    ],
  },
  {
    icon: "migrate.svg",
    tag: "Stage 02",
    heading: "Nobody loses a working day.",
    points: [
      "Mail, files, calendars and contacts keep their history",
      "Old and new run side by side until the new one is proven",
      "A tested way back, for as long as you want it",
    ],
  },
  {
    icon: "delivery.svg",
    tag: "Stage 03",
    heading: "Live, and looked after.",
    points: [
      "Cutover scheduled around your quiet hours",
      "Policies, security and backups set before the switch",
      "Someone reachable while the team settles in",
    ],
  },
];

export default function ProductsPage() {
  return (
    <div className="products-editorial">
      <section className="products-editorial__hero" aria-labelledby="products-title">
        <div className="products-editorial__hero-copy">
          <p className="products-editorial__eyebrow">Arka ONE / Product deployment</p>
          <h1 id="products-title">Bring your three Cs into one place.</h1>
          <div className="products-editorial__three-cs" aria-label="Communication, collaboration and content">
            <span>Communication</span><span>Collaboration</span><span>Content</span>
          </div>
          <p>Install the tools your team already knows, configured to make work more effective, proactive and accountable.</p>
          <div className="products-editorial__actions">
            <Link className="products-editorial__button" href="/contact">Talk to us about your stack <span aria-hidden="true">↗</span></Link>
            <a className="products-editorial__text-link" href={BOOKING_URL} target="_blank" rel="noopener">Book a 40-min call <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="products-editorial__hero-art" aria-hidden="true">
          <span className="products-editorial__hero-art-index">02 / PRODUCTS</span>
          <span className="products-editorial__hero-orb products-editorial__hero-orb--one" />
          <span className="products-editorial__hero-orb products-editorial__hero-orb--two" />
          <span className="products-editorial__hero-orb products-editorial__hero-orb--three" />
          <span className="products-editorial__hero-line products-editorial__hero-line--one" />
          <span className="products-editorial__hero-line products-editorial__hero-line--two" />
          <span className="products-editorial__hero-caption">TOOLS YOUR TEAM<br />ALREADY TRUSTS</span>
        </div>
      </section>

      <section className="products-editorial__platforms" aria-labelledby="what-we-deploy">
        <div className="products-editorial__section-heading">
          <p className="products-editorial__eyebrow">What we deploy</p>
          <h2 id="what-we-deploy">Platforms your team already knows.</h2>
          <p>We set up the products your teams are already comfortable with, then connect them so they behave like one system.</p>
        </div>
        <div className="products-editorial__platform-grid">
          {PLATFORMS.map((platform, index) => (
            <article key={platform.label}>
              <span>0{index + 1}</span>
              <p className="products-editorial__platform-label">{platform.label}{platform.badge ? <em>{platform.badge}</em> : null}</p>
              <h3>{platform.title}</h3>
              <p>{platform.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="products-editorial__process" aria-labelledby="products-process-title">
        <div className="products-editorial__process-heading">
          <p className="products-editorial__eyebrow">How we work</p>
          <h2 id="products-process-title">Three stages, and you are live.</h2>
          <p>Moving goes wrong in the handover, not the setup. We stay on it throughout.</p>
        </div>
        <ol>
          {STEPS.map((step, index) => (
            <li key={step.num}>
              <span className="products-editorial__stage-number">0{index + 1}</span>
              <div><small>{step.num}</small><h3>{step.title}</h3><p>{step.body}</p></div>
              <ul>{PANELS[index].points.map((point) => <li key={point}>{point}</li>)}</ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="products-editorial__closing" aria-labelledby="products-closing-title">
        <p className="products-editorial__eyebrow">Make the stack work harder</p>
        <h2 id="products-closing-title">Tell us what your team runs on today. We will tell you what is worth changing.</h2>
        <ol>
          <li><span>01</span>Book a 40-min scoping call. No commitment required.</li>
          <li><span>02</span>We audit your current tools, licences and costs.</li>
          <li><span>03</span>You get a costed migration plan within 5 business days.</li>
        </ol>
        <div><a className="products-editorial__closing-button" href={BOOKING_URL} target="_blank" rel="noopener">Schedule a call <span aria-hidden="true">↗</span></a><Link className="products-editorial__secondary-link" href="/software">See custom software <span aria-hidden="true">→</span></Link></div>
      </section>
    </div>
  );
}
