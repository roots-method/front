import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel, { BLUEPRINT_CTA_STEPS } from "@/components/CtaPanel";
import { BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Software: custom systems built around your operations",
  description:
    "Arka builds custom software shaped around how your business already works. Start with a free hour of consulting to find the real gaps, and only build once the business case is clear.",
  alternates: { canonical: "/software" },
  openGraph: {
    url: "/software",
    title: "Software: custom systems built around your operations",
    description:
      "Custom software shaped around how your business already works, not a template you have to bend around.",
  },
};

const PROBLEMS = [
  {
    key: "Reporting",
    cost: "12 hrs/wk, already stale",
    quote:
      "By the time the report lands, it's already three days old and the decisions were made based on it.",
  },
  {
    key: "Decisions",
    cost: "3 systems, 0 single source",
    quote:
      "The answer is in the data. The challenge is that it’s fragmented across three different systems, with no clear source of truth for what’s current and accurate.",
  },
  {
    key: "Handoffs",
    cost: "every transfer is a risk",
    quote:
      "Every time work moves between teams, we lose an hour and introduce a new version of the truth.",
  },
  {
    key: "Your people",
    cost: "best talent on lowest-value work",
    quote:
      "Our most capable people spend their day copy-pasting data and chasing approvals work a well-built system would handle automatically.",
  },
];

// These four names must stay identical to the ones on Our Flow.
const PROCESS = [
  {
    title: "ROI Blueprint",
    duration: "Weeks 1–2",
    body: "We map your workflows, tools, costs, and decision points to identify exactly where intelligent automation creates the strongest return. You leave with a prioritized plan.",
  },
  {
    title: "AI Automation",
    duration: "Weeks 3–8",
    body: "We are AI first company but we thoughtfully add where it's only necessary. We design and deploy automation around repeatable decisions, documents, customer operations, and data movement, built to your workflows rather than generic templates.",
  },
  {
    title: "Workflow Intelligence",
    duration: "Weeks 6–12",
    body: "We connect your systems into a clear operating layer so your team moves faster without losing judgment, context, or quality in the handoff.",
  },
  {
    title: "Back-Office Operations",
    duration: "Ongoing",
    body: "We don't just launch and hand off. We own ongoing performance, maintenance, and optimization so value compounds without adding to your operational burden.",
  },
];

const WHY = [
  {
    icon: "ownership",
    title: "We stay after deployment.",
    body: "Most firms hand you a system and move on. We own ongoing performance alongside you every upgrade, every optimization, for as long as you need it.",
  },
  {
    icon: "margins",
    title: "We measure in margins, not deliverables.",
    body: "We don't track hours or features shipped. We track operational cost reduction, workflow turnaround, and recovered hours the numbers that show up in your P&L.",
  },
  {
    icon: "workflow",
    title: "We build to your workflow, not a template.",
    body: "There's no off-the-shelf solution here. Every system is designed around how your specific team operates your tools, your decision points and your constraints.",
  },
];

const TECH = ["Anthropic", "AWS", "Azure", "n8n", "Make"];

export default function SoftwarePage() {
  return (
    <>
      <section className="page-hero page-hero--software">
        <div className="page-hero__main">
          <p className="eyebrow">
            <img
              className="icon-sm"
              src="/assets/icons-ai-ibm/ibm-watsonx--code-assistant.svg"
              alt=""
            />
            Software
          </p>
          <h1>Custom digital solutions, shaped around your business.</h1>
          <p className="page-hero__sub">
            Software that complements your existing profit-making machine. Not because of AI, but because Arka's team makes it happen.
          </p>
          <div className="page-hero__actions">
            <a className="btn btn--primary" href={BOOKING_URL} target="_blank" rel="noopener">
              Claim your free 40 mins consult
              <span className="nav__arrow" aria-hidden="true">
                &#8599;
              </span>
            </a>
            <Link className="btn btn--ghost" href="/contact">
              Get in touch
            </Link>
          </div>
        </div>

        <div className="hero__visual">
          <img
            src="/assets/tools-banner-tpchg.svg"
            alt="AI automation platform tools"
            className="hero__illustration"
          />
        </div>
      </section>

      <section className="problem-frame">
        <p className="eyebrow">The Problems</p>
        <h2 className="problem-frame__title">
          Most operations teams are held back by the same problems.
        </h2>
        <ul className="problem-frame__list">
          {PROBLEMS.map((p) => (
            <li className="problem-frame__item" key={p.key}>
              <div className="problem-frame__item-head">
                <span className="problem-frame__key">{p.key}</span>
                <span className="problem-frame__cost">{p.cost}</span>
              </div>
              <p className="problem-frame__quote">&ldquo;{p.quote}&rdquo;</p>
            </li>
          ))}
        </ul>
        <p className="problem-frame__bridge">
          These aren&rsquo;t effort problems. They&rsquo;re systems problems, and systems can
          be fixed.
        </p>
      </section>

      <section className="section what-we-do">
        <p className="eyebrow">How We Work</p>
        <h2 className="what-we-do__title">A four-step engagement built for lasting change.</h2>
        <div className="what-we-do__intro">
          <p>
            Every engagement follows the same proven sequence, from diagnosing where the value is,
            through building and deploying the system, to owning it with you long after launch.
          </p>
        </div>
      </section>

      <section className="process-editorial" aria-label="Our engagement process">
        {PROCESS.map((step, i) => (
          <div className="process-editorial__step" key={step.title}>
            <span className="process-editorial__num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="process-editorial__body">
              <div className="process-editorial__head">
                <h3>{step.title}</h3>
                <span className="process-editorial__duration">{step.duration}</span>
              </div>
              <p>{step.body}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="why-arka">
        <header className="why-arka__header">
          <p className="eyebrow">Why Arka</p>
          <h2>Built for outcomes that compound.</h2>
          <p className="why-arka__sub">
            We measure success by margins moved, hours recovered, and systems that keep improving
            without us holding your hand.
          </p>
        </header>
        <div className="why-arka__list">
          {WHY.map((item) => (
            <div className="why-arka__item reveal" key={item.icon}>
              <span className={`why-arka__icon why-arka__icon--${item.icon}`} aria-hidden="true" />
              <div className="why-arka__content">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="tech-bar" aria-label="Technology partners">
        <span className="tech-bar__label">Built on</span>
        <div className="tech-bar__logos">
          {TECH.map((t) => (
            <span className="tech-bar__logo" key={t}>
              {t}
            </span>
          ))}
        </div>
      </section>

      <CtaPanel
        steps={BLUEPRINT_CTA_STEPS}
        primaryLabel="Schedule a call"
        primaryHref={BOOKING_URL}
      />
    </>
  );
}
