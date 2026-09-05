import type { Metadata } from "next";
import Link from "next/link";
import InlineSvg from "@/components/InlineSvg";
import TypeCycle from "@/components/TypeCycle";
import CtaPanel from "@/components/CtaPanel";

export const metadata: Metadata = {
  title: "Arka — AI for Enterprise Operations",
  description:
    "Arka builds intelligent software for enterprise operations — replacing manual workflows with AI systems that cut costs, recover hours, and compound in value. Services: ROI Blueprint, AI Automation, Workflow Intelligence, Back-Office Operations.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Arka — AI for Enterprise Operations",
    description:
      "Arka builds intelligent software for enterprise operations — replacing manual workflows with AI systems that cut costs, recover hours, and compound in value.",
  },
};

// Module scope, not inline: a fresh array literal on every render would restart
// the typing effect each time the page re-renders.
const HERO_WORDS = ["AI", "Arka"];

const PILLARS = [
  {
    href: "/software",
    icon: "ibm-watsonx--code-assistant.svg",
    label: "Software",
    title: "Build Custom Digital Solutions",
    body: "Software shaped around the way your business already works — not a template you have to bend around. Start with a free hour to find where the real gaps are.",
    cta: "Explore software",
  },
  {
    href: "/products",
    icon: "ibm-granite.svg",
    label: "Products",
    title: "Deploy World-Class Products",
    body: "Google Workspace, Zoho, CRM, sales platforms — the everyday tools your team already trusts, configured and connected so they work together from day one.",
    cta: "Explore products",
  },
  {
    href: "/contact",
    icon: "operations--field.svg",
    label: "Support",
    title: "Support and Operations",
    body: "Continuous back-office operations and day-to-day care for your whole digital ecosystem — and yes, that includes the infrastructure underneath it all.",
    cta: "Explore support",
  },
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
    name: "James K.",
    role: "VP Operations · Global Logistics",
  },
  {
    quote:
      "We went from email chains and spreadsheets to a fully automated back-office in six weeks. Our team now focuses on decisions, not data entry.",
    name: "Maria L.",
    role: "COO · Healthcare Distribution",
  },
  {
    quote:
      "The ROI Blueprint alone changed how we think about operations. They found inefficiencies we'd been ignoring for years and had a fix deployed within a month.",
    name: "David R.",
    role: "Director of Operations · B2B Technology",
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
    <>
      <section className="hero hero--home hero--centered">
        {/* Ambient cell grid. Decorative only. Cells sit toward the edges and
            corners; the middle is left clear, in the artwork as well as the
            mask, so nothing competes with the centred headline. */}
        <InlineSvg src="/assets/art/hero-cubes.svg" className="hero-cells" />

        <div className="hero__content">
          <p className="eyebrow">For enterprise operations teams</p>
          <h1 className="hero__title">
            Your Only{" "}
            {/* Only the first word types — "AI" and "Arka" swap, "flow" is
                static. They share a leading "A", so the rewind stops there and
                grows into the other rather than emptying the braces.

                reserve={false}, unlike the "defacto"/"default" pair this
                replaced. Those were near-identical in width, so holding the
                field at the widest cost nothing. "Arka" is 79px against "AI" at
                35px, and reserving parks all 44px of that difference between
                the word and "flow" — it reads as a spacing bug for the whole
                time "AI" is up. Letting the line re-centre costs 27px of
                movement across the entire cycle instead, which is small enough
                to pass as part of the typing, and the phrase is tight at every
                frame. Centring the word inside a reserved slot was tried and is
                worse: it strands the caret away from the text it is typing.

                aria-hidden because a screen reader should not have the headline
                rewritten under it letter by letter; the .sr-only span carries
                the phrase instead. */}
            <span className="type-cycle" aria-hidden="true">
              {"{"}
              <TypeCycle className="type-cycle__word" words={HERO_WORDS} reserve={false} />
              <span className="type-cycle__caret" />
              {" flow}"}
            </span>
            <span className="sr-only">AI flow</span>
            <br />
            Digital Partner.
          </h1>
          <p className="hero__lede hero__tagline">Build with us. Grow with us.</p>
          <div className="hero__actions">
            <Link className="btn btn--primary" href="/contact">
              Contact Us
              <span className="nav__arrow nav__arrow--right" aria-hidden="true">
                &#8594;
              </span>
            </Link>
            {/* The three pillars sit directly below; no need to leave the page
                to see what the solutions are. */}
            <a className="btn btn--ghost" href="#what-arka-does">
              Explore our Solution
            </a>
          </div>
        </div>
      </section>

      {/* Static markup, not rendered from a shared data layer, because since the
          Solution mega-menu was removed this is the only place the three
          solutions are described. The nav labels in lib/site.ts need to keep
          agreeing with them; nothing enforces it. */}
      <section className="section solution-pillars" aria-labelledby="what-arka-does">
        <p className="eyebrow">
          <img className="icon-sm" src="/assets/icons-ai-ibm/arrange.svg" alt="" />
          What Arka Does
        </p>
        <h2 className="solution-pillars__title" id="what-arka-does">
          Three ways we take work off your plate.
        </h2>
        <p className="solution-pillars__intro">
          We build what doesn&rsquo;t exist yet, set up what already does, and keep all of it
          running. Most clients start with one and grow into the others.
        </p>

        <div className="solution-pillars__grid">
          {PILLARS.map((pillar) => (
            <Link className="pillar" href={pillar.href} key={pillar.href}>
              <span
                className="pillar__icon"
                style={
                  {
                    "--menu-icon": `url('/assets/icons-ai-ibm/${pillar.icon}')`,
                  } as React.CSSProperties
                }
                aria-hidden="true"
              />
              <span className="pillar__label">{pillar.label}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
              <span className="pillar__cta">
                {pillar.cta}
                <span className="nav__arrow nav__arrow--right" aria-hidden="true">
                  &#8594;
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="industry-strip" aria-label="Industries served">
        <span className="industry-strip__label">Industries served</span>
        <ul className="industry-strip__list">
          {INDUSTRIES.map((industry) => (
            <li key={industry}>{industry}</li>
          ))}
        </ul>
      </section>

      <section className="social-proof" aria-label="Client testimonials">
        <div className="testimonial-strip">
          {TESTIMONIALS.map((t) => (
            <blockquote className="testimonial" key={t.name}>
              <p className="testimonial__quote">&ldquo;{t.quote}&rdquo;</p>
              <footer className="testimonial__footer">
                <span className="testimonial__name">{t.name}</span>
                <span className="testimonial__role">{t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="client-bar" aria-label="Our clients">
        <span className="client-bar__label">Trusted by</span>
        <div className="client-bar__logos">
          {CLIENTS.map((c) => (
            <img
              key={c.src}
              className={`client-bar__logo ${c.modifier}`.trim()}
              src={`/assets/clients/${c.src}`}
              alt={c.alt}
              loading="lazy"
            />
          ))}
        </div>
      </section>

      <CtaPanel />
    </>
  );
}
