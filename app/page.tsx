import type { Metadata } from "next";
import Link from "next/link";
import InlineSvg from "@/components/InlineSvg";
import TypeCycle from "@/components/TypeCycle";
import CtaPanel from "@/components/CtaPanel";
import { BOOKING_URL } from "@/lib/site";

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
    title: "Build Custom AI Solutions",
    body: "Software that compliments your existing profit making machine. Not because of AI but the real humans make it happen. ",
    cta: "Explore software",
  },
  {
    href: "/products",
    icon: "ibm-granite.svg",
    label: "Products",
    title: "Deploy World-Class Products",
    body: "Google Workspace, Zoho, CRM, sales platforms the everyday tools your team already trusts. We can help you deploy and configure so your team can start using from day one.",
    cta: "Explore products",
  },
  {
    href: "/contact",
    icon: "operations--field.svg",
    label: "Support",
    title: "Back-office and Operations",
    body: "Continuity of back-office operations, monthly maintainence across your digital ecosystem and yes, that includes the cloud infrastructure supporting that.",
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

/* Index-only. The shared default in CtaPanel still says 30-min, and so do
   /products and /contact — see the note in that component before changing it
   globally. */
const HOME_CTA_STEPS = [
  "Book a 40-mins scoping call. No commitment required.",
  "We map your highest-value workflow opportunity",
  "You receive a tailored ROI Blueprint within 5 business days",
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
          <p className="hero__lede hero__tagline">A Partner for Your Enterprise Operations.</p>
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
          Bring AI to your digital ecosystem.
        </h2>
        <p className="solution-pillars__intro">
          We develop AI softwares, integrate with existing systems and create a seemless workflow experience.  
          
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

      {/* Placed here on purpose: straight after the pillars, where the reader
          has just learned what we do and is most likely to act. The page still
          closes with the full CTA panel — this is the earlier of two chances,
          not a duplicate of it. */}
      <section className="consult-band" aria-labelledby="free-consult">
        <div className="consult-band__copy">
          <p className="eyebrow">Free consultation</p>
          <h2 className="consult-band__title" id="free-consult">
            Bring us the workflow that costs you the most.
          </h2>
          <p className="consult-band__sub">
            Forty minutes, no charge. We&rsquo;ll tell you what we would automate first, roughly
            what it would take, and whether it is worth doing at all &mdash; even if the answer is
            not yet.
          </p>
        </div>

        <div className="consult-band__action">
          <a
            className="btn btn--primary consult-band__cta"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener"
          >
            Claim free 40-mins call
            <span className="nav__arrow" aria-hidden="true">
              &#8599;
            </span>
          </a>
          <ul className="consult-band__reassure">
            {CONSULT_REASSURANCE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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
        <span className="client-bar__label">Trusted by Employees At</span>
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

      <CtaPanel
        steps={HOME_CTA_STEPS}
        primaryLabel="Schedule a call"
        primaryHref={BOOKING_URL}
      />
    </>
  );
}
