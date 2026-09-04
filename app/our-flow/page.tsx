import type { Metadata } from "next";
import CtaPanel from "@/components/CtaPanel";
import InlineSvg from "@/components/InlineSvg";

export const metadata: Metadata = {
  title: "Our Flow — four stages, one continuous engagement",
  description:
    "Most transformation efforts fail at the handoff. Arka's four-stage engagement runs from the first workflow audit through long-term performance ownership: ROI Blueprint, AI Automation, Workflow Intelligence, Back-Office Operations.",
  alternates: { canonical: "/our-flow" },
  openGraph: {
    url: "/our-flow",
    title: "Our Flow — Arka",
    description: "Four stages. One continuous engagement. We close every handoff gap.",
  },
};

// These four names must stay identical to the ones on /software.
const STAGES = [
  {
    icon: "blueprint",
    num: "01",
    duration: "Weeks 1–2",
    title: "ROI Blueprint",
    desc: "Before we build anything, we map your workflows, tools, costs, handoffs, and decision points to find exactly where intelligent automation creates the strongest return. You leave this phase with a prioritised plan — not a vague proposal or a generic audit.",
    list: [
      "Workflow and cost-structure review",
      "Automation opportunity scoring",
      "Prioritized implementation roadmap",
    ],
    deliverableLabel: "You leave with",
    deliverable:
      "A ranked list of automation opportunities with expected ROI for each — ready to act on immediately.",
  },
  {
    icon: "automation",
    num: "02",
    duration: "Weeks 3–8",
    title: "AI Automation",
    desc: "We design and deploy automation around repeatable decisions, documents, customer operations, internal coordination, and data movement — built specifically to your workflows, not adapted from a generic template.",
    list: [
      "Agentic workflow design",
      "Human-in-the-loop controls",
      "Structured reporting and visibility",
    ],
    deliverableLabel: "You leave with",
    deliverable:
      "Deployed automation handling your highest-value workflow — running in production, not in a sandbox.",
  },
  {
    icon: "intelligence",
    num: "03",
    duration: "Weeks 6–12",
    title: "Workflow Intelligence",
    desc: "We connect your systems into a clear operating layer — so your team moves faster without losing judgment, context, or quality in the handoff. Scattered tools become a coherent, observable process.",
    list: [
      "Process redesign and decision logic",
      "Data models and systems integration",
      "Team-facing dashboards and controls",
    ],
    deliverableLabel: "You leave with",
    deliverable:
      "A connected operating layer your team actually uses — with full visibility into what's running and why.",
  },
  {
    icon: "operations",
    num: "04",
    duration: "Ongoing",
    title: "Back-Office Operations",
    desc: "We don't launch and leave. We take ownership of ongoing performance, maintenance, and optimisation — so value compounds without adding to your operational burden. Most firms measure success at go-live. We measure it at month twelve.",
    list: [
      "Continuous performance monitoring",
      "System refinement and evolution",
      "Long-term operational partnership",
    ],
    deliverableLabel: "You get",
    deliverable:
      "A partner who owns system performance alongside you — indefinitely, not just at launch.",
  },
];

export default function OurFlowPage() {
  return (
    <>
      <section className="page-hero page-hero--flow">
        <div className="page-hero__main">
          <p className="eyebrow">
            <img className="icon-sm" src="/assets/icons-ai-ibm/pipelines.svg" alt="" />
            Our Flow
          </p>
          <h1>Four stages. One continuous engagement.</h1>
          <p className="page-hero__sub">
            Most transformation efforts fail at the handoff — between diagnosis and build, between
            launch and ownership. We close every gap. From the first workflow audit through
            long-term performance, we stay in the room.
          </p>
        </div>

        <InlineSvg src="/assets/art/flow-art.svg" className="flow-art" />
      </section>

      <section className="flow-stack" aria-label="Our engagement process">
        {STAGES.map((stage, i) => (
          <article
            className={`flow-step reveal${i === STAGES.length - 1 ? " flow-step--last" : ""}`}
            key={stage.num}
          >
            <div className="flow-step__spine">
              <div className="flow-step__node" />
              <div className="flow-step__line" />
            </div>

            <div className="flow-step__marker">
              <span className={`flow-step__icon flow-step__icon--${stage.icon}`} aria-hidden="true" />
              <span className="flow-step__num">{stage.num}</span>
              <span className="flow-step__duration">{stage.duration}</span>
            </div>

            <div className="flow-step__main">
              <h2 className="flow-step__title">{stage.title}</h2>
              <p className="flow-step__desc">{stage.desc}</p>
            </div>

            <div className="flow-step__aside">
              <ul className="flow-step__list">
                {stage.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="flow-step__deliverable">
                <span className="flow-step__deliverable-label">{stage.deliverableLabel}</span>
                {stage.deliverable}
              </div>
            </div>
          </article>
        ))}
      </section>

      <CtaPanel
        eyebrow="First Step"
        heading="Find the highest-value workflow before building anything."
        primaryLabel="Request an ROI blueprint"
        watermark={false}
      />
    </>
  );
}
