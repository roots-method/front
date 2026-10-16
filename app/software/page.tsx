import type { Metadata } from "next";
import Link from "next/link";
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
    images: [{ url: "/assets/arka-social-card.png", width: 1200, height: 630, alt: "Arka custom software for enterprise operations" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software: custom systems built around your operations",
    description: "Custom software shaped around how your business already works, not a template you have to bend around.",
    images: ["/assets/arka-social-card.png"],
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
    title: "We stay after deployment.",
    body: "Most firms hand you a system and move on. We own ongoing performance alongside you every upgrade, every optimization, for as long as you need it.",
  },
  {
    title: "We measure in margins, not deliverables.",
    body: "We don't track hours or features shipped. We track operational cost reduction, workflow turnaround, and recovered hours the numbers that show up in your P&L.",
  },
  {
    title: "We build to your workflow, not a template.",
    body: "There's no off-the-shelf solution here. Every system is designed around how your specific team operates your tools, your decision points and your constraints.",
  },
];

const TECH = ["Anthropic", "AWS", "Azure", "n8n", "Make"];

export default function SoftwarePage() {
  return (
    <div className="software-editorial">
      <section className="software-editorial__hero" aria-labelledby="software-title">
        <div className="software-editorial__hero-copy">
          <p className="software-editorial__eyebrow">Software / Custom AI systems</p>
          <h1 id="software-title">Custom digital solutions, shaped around your business.</h1>
          <p>
            Software that complements your existing profit-making machine—built around the work your team already does, and the outcomes it needs to reach.
          </p>
          <div className="software-editorial__actions">
            <a className="software-editorial__button" href={BOOKING_URL} target="_blank" rel="noopener">Claim your free 40-min consult <span aria-hidden="true">↗</span></a>
            <Link className="software-editorial__text-link" href="/contact">Get in touch <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="software-editorial__hero-art">
          <span className="software-editorial__art-label">01 / SOFTWARE</span>
          <img src="/assets/tools-banner-tpchg.svg" alt="AI automation platform tools" />
          <span className="software-editorial__shape software-editorial__shape--one" aria-hidden="true" />
          <span className="software-editorial__shape software-editorial__shape--two" aria-hidden="true" />
        </div>
      </section>

      <section className="software-editorial__problems" aria-labelledby="problems-title">
        <div className="software-editorial__problems-intro">
          <p className="software-editorial__eyebrow">The systems gap</p>
          <h2 id="problems-title">Most operations teams are held back by the same problems.</h2>
          <p>These aren’t effort problems. They’re systems problems—and systems can be fixed.</p>
        </div>
        <ul className="software-editorial__problem-list">
          {PROBLEMS.map((problem, index) => (
            <li key={problem.key}>
              <span>0{index + 1}</span>
              <div><h3>{problem.key}</h3><small>{problem.cost}</small></div>
              <p>&ldquo;{problem.quote}&rdquo;</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="software-editorial__process" aria-labelledby="process-title">
        <div className="software-editorial__process-heading">
          <p className="software-editorial__eyebrow">How we work</p>
          <h2 id="process-title">A four-step engagement built for lasting change.</h2>
          <p>From the first workflow map to long-term optimization, the work stays connected to measurable operational value.</p>
        </div>
        <ol>
          {PROCESS.map((step, index) => (
            <li key={step.title}>
              <span className="software-editorial__process-number">0{index + 1}</span>
              <div><h3>{step.title}</h3><small>{step.duration}</small></div>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="software-editorial__outcomes" aria-labelledby="outcomes-title">
        <div>
          <p className="software-editorial__eyebrow">Why Arka</p>
          <h2 id="outcomes-title">Built for outcomes that compound.</h2>
          <p>We measure success by margins moved, hours recovered, and systems that keep improving.</p>
        </div>
        <div className="software-editorial__outcome-list">
          {WHY.map((item, index) => (
            <article key={item.title}>
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="software-editorial__tech" aria-label="Technology partners">
        <p className="software-editorial__eyebrow">Built on</p>
        <div>{TECH.map((technology) => <span key={technology}>{technology}</span>)}</div>
      </section>

      <section className="software-editorial__closing" aria-labelledby="software-closing-title">
        <p className="software-editorial__eyebrow">Start with the right workflow</p>
        <h2 id="software-closing-title">Find the system problem that will move your operation forward.</h2>
        <p>Bring us the process that costs you most. We’ll map the opportunity and build the case for change.</p>
        <a className="software-editorial__closing-button" href={BOOKING_URL} target="_blank" rel="noopener">Schedule a call <span aria-hidden="true">↗</span></a>
      </section>
    </div>
  );
}
