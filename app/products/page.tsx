import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel, { SCOPING_CALL_STEP } from "@/components/CtaPanel";
import InlineSvg from "@/components/InlineSvg";
import ProcessSplit from "@/components/ProcessSplit";
import { BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products — Arka ONE",
  description:
    "Arka ONE brings Communication, Collaboration and Content together. We configure Zoho One, Google Workspace and your sales stack, then connect them so they behave like one system.",
  alternates: { canonical: "/products" },
  openGraph: {
    url: "/products",
    title: "Products — Arka ONE",
    description:
      "Make the tools your team already knows work the way you need them to — effective, proactive and accountable.",
  },
};

const PLATFORMS = [
  {
    icon: "ibm-granite.svg",
    label: "Zoho One",
    title: "Built for you, built for business & built for Bharat.",
    body: "One licence, forty-odd applications, and a price that makes sense for a growing Indian business. We configure the pieces you will actually use and leave the rest out of your way.",
  },
  {
    icon: "collaborate.svg",
    label: "Google Workspace",
    title: "Get your familiarity with similarity.",
    body: "Gmail, Drive, Meet and Calendar behave exactly the way your team expects, because they already use them. We handle the domain, the migration and the admin policies underneath.",
  },
  {
    icon: "business-metrics.svg",
    label: "CRM & Sales Tools",
    // No destination yet, so this one is a plain div with a badge rather than a link.
    badge: "Coming soon",
    title: "Ask us — we have special products on the way.",
    body: "Pipelines, quotes and follow-ups that your sales team will actually keep up to date. Tell us how you sell today and we will tell you what is coming.",
  },
];

const STEPS = [
  {
    num: "Stage 01",
    title: "We assess",
    body: "What you run today, what should move, and what it will cost — in writing, before anything changes.",
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
    <>
      <section className="page-hero page-hero--products">
        <div className="page-hero__main">
          <p className="eyebrow">
            <img className="icon-sm" src="/assets/icons-ai-ibm/ibm-granite.svg" alt="" />
            Arka ONE
          </p>
          <h1>Bring your 3 Cs at one place.</h1>

          {/* All three named and readable at once. A CSS-only sequential
              highlight walks the accent across them, so there is motion without
              the headline ever being mid-word or incomplete — which is why this
              deliberately does not use TypeCycle. The stagger keys off
              :nth-of-type(3)/(5) because the separators are spans too. */}
          <p className="threec">
            <span className="threec__word">Communication</span>
            <span className="threec__sep" aria-hidden="true">
              &middot;
            </span>
            <span className="threec__word">Collaboration</span>
            <span className="threec__sep" aria-hidden="true">
              &middot;
            </span>
            <span className="threec__word">Content</span>
          </p>

          <p className="page-hero__sub">
            Make the tools your team already knows work the way you need them to effective,
            proactive and accountable.
          </p>
          <div className="page-hero__actions">
            <Link className="btn btn--primary" href="/contact">
              Talk to us about your stack
              <span className="nav__arrow nav__arrow--right" aria-hidden="true">
                &#8594;
              </span>
            </Link>
            <a className="btn btn--ghost" href={BOOKING_URL} target="_blank" rel="noopener">
              Book a call
              <span className="nav__arrow" aria-hidden="true">
                &#8599;
              </span>
            </a>
          </div>
        </div>

        {/* The one drawing that does not follow brand colour — it is violet, in
            --viz-* variables reserved for this composition alone. */}
        <InlineSvg src="/assets/art/products-grid.svg" className="products-art" />
      </section>

      {/* Same hairline treatment as the home page pillars and .why-arka__list,
          so the whole site states its "three things" one way. */}
      <section className="section solution-pillars" aria-labelledby="what-we-deploy">
        <p className="eyebrow">What We Deploy</p>
        <h2 className="solution-pillars__title" id="what-we-deploy">
          Platforms your team already knows.
        </h2>
        <p className="solution-pillars__intro">
          No retraining, no rip-and-replace. We set up the products people are already comfortable
          with, then connect them so they behave like one system.
        </p>

        <div className="solution-pillars__grid">
          {PLATFORMS.map((p) => (
            <div className={`pillar${p.badge ? " pillar--soon" : ""}`} key={p.label}>
              <span
                className="pillar__icon"
                style={
                  { "--menu-icon": `url('/assets/icons-ai-ibm/${p.icon}')` } as React.CSSProperties
                }
                aria-hidden="true"
              />
              <span className="pillar__label">
                {p.label}
                {p.badge ? <em className="pillar__badge">{p.badge}</em> : null}
              </span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section how-we-work">
        <p className="eyebrow">How We Work</p>
        <h2 className="what-we-do__title">Three stages, and you are live.</h2>
        <div className="what-we-do__intro">
          <p>Moving goes wrong in the handover, not the setup. We stay on it throughout.</p>
        </div>
      </section>

      <ProcessSplit steps={STEPS} panels={PANELS} label="Our deployment process" />

      <CtaPanel
        heading="Tell us what your team runs on today. We will tell you what is worth changing."
        steps={[
          SCOPING_CALL_STEP,
          "We audit your current tools, licences and costs",
          "You get a costed migration plan within 5 business days",
        ]}
        primaryLabel="Schedule a call"
        primaryHref={BOOKING_URL}
        secondary={
          <Link className="btn btn--ghost" href="/software">
            See custom software
          </Link>
        }
      />
    </>
  );
}
